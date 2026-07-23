/**
 * Read-only dry run of the webhook `buy` path (lib/execute-signal.ts +
 * lib/portfolio.ts) for a single symbol, using REAL live Tiger data (quotes,
 * positions, cash) but never calling `previewOrder`/`placeOrder` — nothing is
 * placed against the connected Tiger account.
 *
 * Usage:
 *   npx tsx --conditions=react-server scripts/simulate-buy-signal.ts SYMBOL [--cash=AMOUNT]
 *
 * `--cash=AMOUNT` overrides the real available-cash figure with a
 * hypothetical one (everything else \u2014 total equity, positions, quotes \u2014
 * stays real) so you can exercise the trim-to-fund branch on demand without
 * waiting for the real account to actually get that tight on cash.
 *
 * The `--conditions=react-server` flag is required so Node resolves the
 * `server-only` package (imported by lib/portfolio.ts / lib/order-guardrails.ts)
 * to its no-op build instead of the throwing one Next.js's own bundler
 * normally swaps in for server components.
 */
import "dotenv/config";
import {
  assertPaperOrAllowed,
  createTigerClients,
  findPosition,
  findPositionQuantity,
  getAccountCash,
  getOpenPositions,
  getStockQuote,
} from "@/lib/tiger";
import {
  computeInvestedPct,
  computeTargetPositionSize,
  planTrims,
  rankWeakestPositions,
  resolvePortfolioConfig,
} from "@/lib/portfolio";
import { orderGuardrailViolation } from "@/lib/order-guardrails";

const DEFAULT_LIMIT_BUFFER_PCT = 0.15;

function resolveLimitBufferPct(): number {
  const raw = Number(process.env.WEBHOOK_LIMIT_BUFFER_PCT);
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_LIMIT_BUFFER_PCT;
}

function roundToCent(value: number): number {
  return Math.round(value * 100) / 100;
}

function parseCashOverride(args: string[]): number | undefined {
  const flag = args.find((arg) => arg.startsWith("--cash="));
  if (!flag) return undefined;
  const value = Number(flag.slice("--cash=".length));
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`Invalid --cash value: ${flag}`);
  }
  return value;
}

async function main() {
  const args = process.argv.slice(2);
  const symbolArg = args.find((arg) => !arg.startsWith("--"));
  if (!symbolArg) {
    console.error(
      "Usage: npx tsx --conditions=react-server scripts/simulate-buy-signal.ts SYMBOL [--cash=AMOUNT]",
    );
    process.exit(1);
  }
  const symbol = symbolArg.toUpperCase();
  const cashOverride = parseCashOverride(args);

  console.log(`\n=== DRY RUN: 'buy' webhook signal for ${symbol} ===`);
  console.log("(read-only \u2014 no previewOrder/placeOrder calls are made)\n");

  const { config, trade, quote } = createTigerClients();

  try {
    const account = await assertPaperOrAllowed(trade, config.account);
    console.log(`Account: ${config.account} (${account.accountType ?? "unknown"})`);
  } catch (err) {
    console.log(`Account safety check: ${(err as Error).message}`);
  }

  const bufferPct = resolveLimitBufferPct();
  const { price: quotePrice, source } = await getStockQuote(quote, symbol);
  const limitPrice = roundToCent(quotePrice * (1 + bufferPct / 100));
  console.log(`Quote: $${quotePrice} (${source}) -> buy limit $${limitPrice} (+${bufferPct}%)`);

  const positions = await getOpenPositions(trade, { market: "US", secType: "STK" });
  const existing = findPosition(positions, symbol);
  if (existing) {
    const heldQty = existing.positionQty ?? existing.position;
    console.log(
      `\nRESULT: SKIPPED \u2014 already holding ${heldQty} shares of ${symbol}; the portfolio manager does not average up via webhook signals.`,
    );
    return;
  }

  const portfolioConfig = resolvePortfolioConfig();
  console.log(
    `\nPortfolio config: targetPositions=${portfolioConfig.targetPositions}, ` +
      `maxTrimPctOfEquity=${portfolioConfig.maxTrimPctOfEquity.toFixed(2)}%, ` +
      `minTrimUsd=$${portfolioConfig.minTrimUsd}, maxPositionsToTrim=${portfolioConfig.maxPositionsToTrim}, ` +
      `minInvestedPct=${portfolioConfig.minInvestedPct}%`,
  );

  const realCash = await getAccountCash(trade);
  const cash =
    cashOverride === undefined ? realCash : { ...realCash, availableCash: cashOverride };
  const targetPositionSizeUsd = computeTargetPositionSize(cash.totalEquity, portfolioConfig.targetPositions);
  const investedPctBefore = computeInvestedPct(cash.investedValue, cash.totalEquity);

  console.log(`\nAccount snapshot (source: ${cash.source}):`);
  console.log(`  Total equity:    $${cash.totalEquity.toFixed(2)}`);
  console.log(
    `  Available cash:  $${cash.availableCash.toFixed(2)}` +
      (cashOverride === undefined ? "" : ` (OVERRIDDEN \u2014 real value is $${realCash.availableCash.toFixed(2)})`),
  );
  console.log(`  Invested value:  $${cash.investedValue.toFixed(2)} (${investedPctBefore.toFixed(1)}%)`);
  console.log(
    `  Target position: $${targetPositionSizeUsd.toFixed(2)} (equity / ${portfolioConfig.targetPositions})`,
  );

  const cashNeeded = Math.max(0, targetPositionSizeUsd - cash.availableCash);
  const trimsPlanned: Array<{
    symbol: string;
    quantity: number;
    limitPrice: number;
    estProceeds: number;
    pnlPct: number;
  }> = [];
  let cashFreedUsd = 0;

  if (cashNeeded > 0) {
    console.log(`\nShortfall: need $${cashNeeded.toFixed(2)} more than available cash \u2014 planning trims...`);
    const ranked = rankWeakestPositions(positions);

    if (ranked.length > 0) {
      console.log("Ranked open positions (worst P&L% first):");
      for (const r of ranked) {
        console.log(`  ${r.symbol}: mkt value $${r.marketValue.toFixed(2)}, P&L ${r.pnlPct.toFixed(1)}%`);
      }
    } else {
      console.log("  (no open positions with resolvable market value to rank)");
    }

    const plannedTrims = planTrims({
      cashNeeded,
      rankedPositions: ranked,
      totalEquity: cash.totalEquity,
      config: portfolioConfig,
      excludeSymbol: symbol,
    });

    for (const planned of plannedTrims) {
      const trimQuote = await getStockQuote(quote, planned.symbol);
      const trimLimitPrice = roundToCent(trimQuote.price * (1 - bufferPct / 100));
      const heldQuantity = findPositionQuantity(positions, planned.symbol) ?? 0;
      const trimQuantity = Math.min(
        heldQuantity,
        Math.max(1, Math.floor(planned.trimAmountUsd / trimLimitPrice)),
      );
      if (trimQuantity <= 0) continue;

      const violation = orderGuardrailViolation("stock", trimQuantity, trimLimitPrice);
      if (violation) {
        console.log(`  SKIP trim ${planned.symbol}: ${violation}`);
        continue;
      }

      const estProceeds = trimQuantity * trimLimitPrice;
      cashFreedUsd += estProceeds;
      trimsPlanned.push({
        symbol: planned.symbol,
        quantity: trimQuantity,
        limitPrice: trimLimitPrice,
        estProceeds,
        pnlPct: planned.pnlPct,
      });
    }

    console.log("\nPlanned trims (NOT placed):");
    if (trimsPlanned.length === 0) {
      console.log("  (none \u2014 no eligible position cleared the min-trim-$ / guardrail bar)");
    }
    for (const t of trimsPlanned) {
      console.log(
        `  SELL ${t.quantity} ${t.symbol} @ $${t.limitPrice} (~$${t.estProceeds.toFixed(2)}, P&L ${t.pnlPct.toFixed(1)}%)`,
      );
    }
  } else {
    console.log("\nNo shortfall \u2014 available cash already covers the target position size. No trims needed.");
  }

  const availableForBuy = cash.availableCash + cashFreedUsd;
  const buyNotionalUsd = Math.min(targetPositionSizeUsd, availableForBuy);
  const quantity = Math.max(1, Math.round(buyNotionalUsd / limitPrice));
  const investedPctAfter = computeInvestedPct(
    cash.investedValue - cashFreedUsd + quantity * limitPrice,
    cash.totalEquity,
  );

  console.log(`\nPlanned BUY (NOT placed): ${quantity} ${symbol} @ $${limitPrice} (~$${(quantity * limitPrice).toFixed(2)})`);
  console.log(`Invested % after (provisional): ${investedPctAfter.toFixed(1)}% (before: ${investedPctBefore.toFixed(1)}%)`);

  const violation = orderGuardrailViolation("stock", quantity, limitPrice);
  if (violation) {
    console.log(
      `\nRESULT: would end as ${trimsPlanned.length > 0 ? "PARTIALLY_PLACED" : "FAILED"} \u2014 buy guardrail violation: ${violation}`,
    );
  } else {
    console.log(
      `\nRESULT: would be PLACED \u2014 BUY ${quantity} ${symbol} @ $${limitPrice}` +
        (trimsPlanned.length > 0
          ? `, funded partly by trimming ${trimsPlanned.map((t) => t.symbol).join(", ")}`
          : ""),
    );
  }
}

main().catch((err) => {
  console.error("Dry run failed:", err);
  process.exit(1);
});
