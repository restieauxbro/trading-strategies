import type { Prisma, WebhookEvent } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { ParsedTrendspiderSignal } from "@/lib/webhook-schema";
import {
  assertPaperOrAllowed,
  createTigerClients,
  findPositionQuantity,
  getStockQuote,
  placeShareLimitOrder,
} from "@/lib/tiger";
import { orderGuardrailViolation } from "@/lib/order-guardrails";

// TODO(portfolio-sizing): fixed-dollar sizing is a placeholder until an AI
// portfolio management skill decides position size. Revisit before relying on
// this for anything beyond small paper-trade testing.
const FIXED_ORDER_USD = 100;

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

function serializePreview(preview: unknown): Prisma.InputJsonValue | undefined {
  if (preview === undefined) return undefined;
  try {
    return JSON.parse(JSON.stringify(preview)) as Prisma.InputJsonValue;
  } catch {
    return { raw: String(preview) };
  }
}

export async function executeWebhookSignal(
  eventId: string,
  signal: ParsedTrendspiderSignal,
): Promise<WebhookEvent> {
  try {
    const { config, trade, quote } = createTigerClients();
    await assertPaperOrAllowed(trade, config.account);

    const { price: quotePrice } = await getStockQuote(quote, signal.symbol);
    const bufferPct = resolveLimitBufferPct();

    let action: "BUY" | "SELL";
    let quantity: number | undefined;
    let limitPrice: number;

    if (signal.action === "buy") {
      action = "BUY";
      limitPrice = roundToCent(quotePrice * (1 + bufferPct / 100));
      // Whole shares only — many symbols/accounts reject fractional-share
      // orders outright (Tiger accepts the preview but the order comes back
      // "Invalid" post-submission), so round to the nearest whole share
      // rather than risk a silent no-fill. Never round down to 0; a single
      // share is the minimum viable buy even if it overshoots the $100
      // target notional (orderGuardrailViolation below still caps spend).
      quantity = Math.max(1, Math.round(FIXED_ORDER_USD / limitPrice));
    } else {
      // "sell" closes the full existing position — TrendSpider's exit
      // webhook sends no size, so there's nothing to size a partial sell to.
      action = "SELL";
      limitPrice = roundToCent(quotePrice * (1 - bufferPct / 100));

      const positions = await trade.getPositions({ market: "US", secType: "STK" });
      quantity = findPositionQuantity(positions, signal.symbol);
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
      account: config.account,
      symbol: signal.symbol,
      action,
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
        previewJson: serializePreview(preview),
        error: null,
      },
    });
  } catch (error) {
    const err = error as Error & { stage?: string; preview?: unknown };
    const failedStatus = err.stage === "preview" ? "PREVIEW_FAILED" : "FAILED";

    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        status: failedStatus,
        previewJson: serializePreview(err.preview),
        error: err.message || String(error),
      },
    });
  }
}
