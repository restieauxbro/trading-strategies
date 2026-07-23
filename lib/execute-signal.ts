import type { Prisma, WebhookEvent } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { ParsedTrendspiderSignal } from "@/lib/webhook-schema";
import {
  assertPaperOrAllowed,
  createTigerClients,
  findPosition,
  findPositionQuantity,
  getAccountCash,
  getOpenPositions,
  getStockQuote,
  placeShareLimitOrder,
  type Position,
  type TigerClients,
} from "@/lib/tiger";
import { orderGuardrailViolation } from "@/lib/order-guardrails";
import {
  computeInvestedPct,
  computeTargetPositionSize,
  planTrims,
  rankWeakestPositions,
  resolvePortfolioConfig,
} from "@/lib/portfolio";

const DEFAULT_LIMIT_BUFFER_PCT = 0.15;

/**
 * TrendSpider now only sends symbol + buy/sell, so the limit price is derived
 * from Tiger's own quote rather than the payload. A limit order pegged
 * exactly at the last quote can miss if the price ticks before it's booked,
 * so buy orders add a small buffer above quote and sell orders subtract one
 * below quote to improve fill odds while still capping slippage.
 */
function resolveLimitBufferPct(): number {
  const raw = Number(process.env.WEBHOOK_LIMIT_BUFFER_PCT);
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_LIMIT_BUFFER_PCT;
}

function roundToCent(value: number): number {
  return Math.round(value * 100) / 100;
}

function toJsonValue(value: unknown): Prisma.InputJsonValue | undefined {
  if (value === undefined) return undefined;
  try {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  } catch {
    return { raw: String(value) };
  }
}

type TrimRecord = {
  symbol: string;
  quantity: number;
  limitPrice: number;
  tigerOrderId: string | null;
  pnlPct: number;
};

export async function executeWebhookSignal(
  eventId: string,
  signal: ParsedTrendspiderSignal,
): Promise<WebhookEvent> {
  try {
    const { config, trade, quote } = createTigerClients();
    await assertPaperOrAllowed(trade, config.account);

    const { price: quotePrice } = await getStockQuote(quote, signal.symbol);
    const bufferPct = resolveLimitBufferPct();

    if (signal.action === "buy") {
      return await executeBuySignal({
        eventId,
        signal,
        trade,
        quote,
        account: config.account,
        quotePrice,
        bufferPct,
      });
    }

    return await executeSellSignal({
      eventId,
      signal,
      trade,
      account: config.account,
      quotePrice,
      bufferPct,
    });
  } catch (error) {
    const err = error as Error & { stage?: string; preview?: unknown };
    const failedStatus = err.stage === "preview" ? "PREVIEW_FAILED" : "FAILED";

    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        status: failedStatus,
        previewJson: toJsonValue(err.preview),
        error: err.message || String(error),
      },
    });
  }
}

/**
 * "sell" closes the full existing position — TrendSpider's exit webhook
 * sends no size, so there's nothing to size a partial sell to. Recovered
 * cash simply sits until the next buy signal (reactive-only rebalancing —
 * see lib/portfolio.ts); there is no separate scheduled top-up job.
 */
async function executeSellSignal(options: {
  eventId: string;
  signal: ParsedTrendspiderSignal;
  trade: TigerClients["trade"];
  account: string;
  quotePrice: number;
  bufferPct: number;
}): Promise<WebhookEvent> {
  const { eventId, signal, trade, account, quotePrice, bufferPct } = options;
  const limitPrice = roundToCent(quotePrice * (1 - bufferPct / 100));

  const positions = await getOpenPositions(trade, { market: "US", secType: "STK" });
  const quantity = findPositionQuantity(positions, signal.symbol);
  if (!quantity || quantity <= 0) {
    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        status: "SKIPPED",
        limitPrice,
        error: `No open position found for ${signal.symbol} to sell`,
      },
    });
  }

  // Same hard caps enforced on the trade-agent tool paths — the webhook is a
  // second unauthenticated-by-anyone-with-the-token entry point into live orders.
  const violation = orderGuardrailViolation("stock", quantity, limitPrice);
  if (violation) {
    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: { status: "FAILED", quantity, limitPrice, error: violation },
    });
  }

  const { preview, placed } = await placeShareLimitOrder({
    trade,
    account,
    symbol: signal.symbol,
    action: "SELL",
    quantity,
    limitPrice,
  });

  return prisma.webhookEvent.update({
    where: { id: eventId },
    data: {
      status: "PLACED",
      quantity,
      limitPrice,
      tigerOrderId: placed?.id != null ? String(placed.id) : null,
      tigerOrderId2: placed?.order_id != null ? String(placed.order_id) : null,
      tigerStatus: "submitted",
      previewJson: toJsonValue(preview),
      error: null,
    },
  });
}

/**
 * "buy" sizes a NEW position with even-split sizing (total equity / target
 * position count, see lib/portfolio.ts) rather than a fixed dollar amount.
 * If available cash can't cover the target size, it trims the worst
 * (most-underwater) existing position(s) to fund the shortfall before
 * placing the buy. See docs/feature-webhooks.md for the full behaviour
 * writeup.
 */
async function executeBuySignal(options: {
  eventId: string;
  signal: ParsedTrendspiderSignal;
  trade: TigerClients["trade"];
  quote: TigerClients["quote"];
  account: string;
  quotePrice: number;
  bufferPct: number;
}): Promise<WebhookEvent> {
  const { eventId, signal, trade, quote, account, quotePrice, bufferPct } = options;
  const limitPrice = roundToCent(quotePrice * (1 + bufferPct / 100));

  const positions: Position[] = await getOpenPositions(trade, { market: "US", secType: "STK" });

  // No averaging up via webhook signals in v1 — a buy signal for a symbol
  // already held is a no-op rather than stacking size onto it.
  if (findPosition(positions, signal.symbol)) {
    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        status: "SKIPPED",
        limitPrice,
        error: `Already holding a position in ${signal.symbol} — portfolio manager does not average up via webhook signals`,
      },
    });
  }

  const portfolioConfig = resolvePortfolioConfig();
  const cash = await getAccountCash(trade);
  const targetPositionSizeUsd = computeTargetPositionSize(
    cash.totalEquity,
    portfolioConfig.targetPositions,
  );
  const investedPctBefore = computeInvestedPct(cash.investedValue, cash.totalEquity);

  const cashNeeded = Math.max(0, targetPositionSizeUsd - cash.availableCash);
  const trimRecords: TrimRecord[] = [];
  let cashFreedUsd = 0;

  if (cashNeeded > 0) {
    const ranked = rankWeakestPositions(positions);
    const plannedTrims = planTrims({
      cashNeeded,
      rankedPositions: ranked,
      totalEquity: cash.totalEquity,
      config: portfolioConfig,
      excludeSymbol: signal.symbol,
    });

    for (const planned of plannedTrims) {
      try {
        const trimQuote = await getStockQuote(quote, planned.symbol);
        const trimLimitPrice = roundToCent(trimQuote.price * (1 - bufferPct / 100));
        const heldQuantity = findPositionQuantity(positions, planned.symbol) ?? 0;
        const trimQuantity = Math.min(
          heldQuantity,
          Math.max(1, Math.floor(planned.trimAmountUsd / trimLimitPrice)),
        );
        if (trimQuantity <= 0) continue;

        // A single trim getting guardrail-blocked or preview-rejected
        // shouldn't abort the whole buy — just fund with whatever trims did
        // succeed and size the buy down accordingly (see below).
        if (orderGuardrailViolation("stock", trimQuantity, trimLimitPrice)) continue;

        const { placed } = await placeShareLimitOrder({
          trade,
          account,
          symbol: planned.symbol,
          action: "SELL",
          quantity: trimQuantity,
          limitPrice: trimLimitPrice,
        });

        cashFreedUsd += trimQuantity * trimLimitPrice;
        trimRecords.push({
          symbol: planned.symbol,
          quantity: trimQuantity,
          limitPrice: trimLimitPrice,
          tigerOrderId: placed?.id != null ? String(placed.id) : null,
          pnlPct: planned.pnlPct,
        });
      } catch {
        // Same tolerance as the guardrail-skip above — try the next candidate.
      }
    }
  }

  // Provisional: assumes each trim fills at its own limit price rather than
  // polling for confirmed fills — same caveat already documented for
  // lib/pnl.ts's fill reconciliation TODO.
  const availableForBuy = cash.availableCash + cashFreedUsd;
  const buyNotionalUsd = Math.min(targetPositionSizeUsd, availableForBuy);
  // Whole shares only — many symbols/accounts reject fractional-share orders
  // outright. Never round down to 0; a single share is the minimum viable
  // buy even if it overshoots the target notional (orderGuardrailViolation
  // below still caps spend).
  const quantity = Math.max(1, Math.round(buyNotionalUsd / limitPrice));
  const investedPctAfter = computeInvestedPct(
    cash.investedValue - cashFreedUsd + quantity * limitPrice,
    cash.totalEquity,
  );

  const sharedFields = {
    quantity,
    limitPrice,
    targetPositionSizeUsd,
    investedPctBefore,
    investedPctAfter,
    trimsJson: trimRecords.length > 0 ? toJsonValue(trimRecords) : undefined,
  };

  const violation = orderGuardrailViolation("stock", quantity, limitPrice);
  if (violation) {
    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        ...sharedFields,
        // Trims (if any) still went through even though the buy itself was
        // blocked — flag it as partial rather than a clean failure so it's
        // obvious on the dashboard that other positions were touched.
        status: trimRecords.length > 0 ? "PARTIALLY_PLACED" : "FAILED",
        error: violation,
      },
    });
  }

  try {
    const { preview, placed } = await placeShareLimitOrder({
      trade,
      account,
      symbol: signal.symbol,
      action: "BUY",
      quantity,
      limitPrice,
    });

    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        ...sharedFields,
        status: "PLACED",
        tigerOrderId: placed?.id != null ? String(placed.id) : null,
        tigerOrderId2: placed?.order_id != null ? String(placed.order_id) : null,
        tigerStatus: "submitted",
        previewJson: toJsonValue(preview),
        error: null,
      },
    });
  } catch (error) {
    const err = error as Error & { stage?: string; preview?: unknown };
    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        ...sharedFields,
        status: trimRecords.length > 0 ? "PARTIALLY_PLACED" : err.stage === "preview" ? "PREVIEW_FAILED" : "FAILED",
        previewJson: toJsonValue(err.preview),
        error: err.message || String(error),
      },
    });
  }
}
