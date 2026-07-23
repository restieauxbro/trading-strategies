import "server-only";
import type { Position } from "@/lib/tiger";

/**
 * Portfolio-management sizing/ranking logic for the TrendSpider webhook `buy`
 * path (see lib/execute-signal.ts). Pure functions only — no Tiger/DB calls
 * here, so the sizing and trim-selection math can be reasoned about (and
 * tested) independently of the broker plumbing.
 *
 * Design (confirmed with Tim):
 * - Sizing: even-split across a target number of concurrent positions — each
 *   new buy targets `totalEquity / PORTFOLIO_TARGET_POSITIONS`.
 * - Funding a new buy: if available cash can't cover the target size, trim
 *   existing positions ranked by worst unrealized P&L % first. Purely
 *   mechanical from live Tiger data — no LLM step, no dependency on
 *   strategies/*\/watchlist.csv scores.
 * - Trim cap is a FIXED DOLLAR AMOUNT expressed as a percent of total
 *   equity (`PORTFOLIO_MAX_TRIM_PCT_OF_EQUITY`), not a percent of the
 *   position being trimmed. E.g. with 30 target positions (~3.33% of equity
 *   each) and a 1.67% trim cap, trimming a still-at-target position removes
 *   at most half of it, but a position that has already fallen in value
 *   below that fixed dollar cap can be fully liquidated by it. Full closes
 *   are otherwise reserved for real exit signals.
 * - Trigger model: reactive only, inside the `buy` webhook path — no
 *   separate scheduled/periodic top-up job.
 */

export type PortfolioConfig = {
  /** How many concurrent positions the equal-split sizing targets. */
  targetPositions: number;
  /** Percentage points of total equity (e.g. 5 means 5%) trimmable from any one position per rebalance. */
  maxTrimPctOfEquity: number;
  /** Skip a trim smaller than this many dollars rather than generate a dust order. */
  minTrimUsd: number;
  /** Safety cap on how many different positions one incoming buy signal can touch. */
  maxPositionsToTrim: number;
  /** Target % of total equity kept invested — surfaced for the dashboard/audit trail, not itself a trigger (see note in lib/execute-signal.ts). */
  minInvestedPct: number;
};

function envNumber(name: string, fallback: number): number {
  const raw = Number(process.env[name]);
  return Number.isFinite(raw) && raw > 0 ? raw : fallback;
}

export function resolvePortfolioConfig(): PortfolioConfig {
  const targetPositions = envNumber("PORTFOLIO_TARGET_POSITIONS", 10);
  // Default trim cap: half a default-sized position's worth of total equity,
  // unless explicitly overridden (targetPositions=30 -> ~3.33%/position ->
  // ~1.67% default trim cap).
  const defaultMaxTrimPct = 50 / targetPositions;

  return {
    targetPositions,
    maxTrimPctOfEquity: envNumber("PORTFOLIO_MAX_TRIM_PCT_OF_EQUITY", defaultMaxTrimPct),
    minTrimUsd: envNumber("PORTFOLIO_MIN_TRIM_USD", 20),
    maxPositionsToTrim: envNumber("PORTFOLIO_MAX_POSITIONS_TO_TRIM", 5),
    minInvestedPct: envNumber("PORTFOLIO_MIN_INVESTED_PCT", 80),
  };
}

/** Even-split target size for one new position: total equity / target position count. */
export function computeTargetPositionSize(totalEquity: number, targetPositions: number): number {
  if (targetPositions <= 0) return 0;
  return totalEquity / targetPositions;
}

/** % of total equity currently tied up in positions. */
export function computeInvestedPct(investedValue: number, totalEquity: number): number {
  if (totalEquity <= 0) return 0;
  return (investedValue / totalEquity) * 100;
}

export type RankedPosition = {
  symbol: string;
  marketValue: number;
  /** Unrealized P&L as a % of cost basis (unrealizedPnl / (averageCost * quantity) * 100) — computed here rather than trusting the SDK's own `unrealizedPnlPercent` field, whose scale convention (fraction vs. percentage points) isn't documented. */
  pnlPct: number;
};

/**
 * Open positions sorted worst-first by unrealized P&L % — the trim funding
 * source of last resort for a new buy. Positions without enough data to
 * price (no resolvable market value) are excluded rather than guessed at.
 */
export function rankWeakestPositions(positions: Position[]): RankedPosition[] {
  return positions
    .map((position) => {
      const symbol = String(position.symbol ?? "").toUpperCase();
      const quantity = Math.abs(Number(position.positionQty ?? position.position ?? 0));
      const marketValue = Number(position.marketValue ?? (position.latestPrice ?? 0) * quantity);
      const costBasis = Number(position.averageCost ?? 0) * quantity;
      const unrealizedPnl = Number(position.unrealizedPnl ?? 0);
      const pnlPct = costBasis > 0 ? (unrealizedPnl / costBasis) * 100 : 0;
      return { symbol, marketValue, pnlPct };
    })
    .filter((row) => row.symbol && row.marketValue > 0)
    .sort((a, b) => a.pnlPct - b.pnlPct);
}

export type PlannedTrim = {
  symbol: string;
  trimAmountUsd: number;
  pnlPct: number;
};

/**
 * Walks the worst-first ranked list, trimming a fixed dollar amount
 * (`totalEquity * maxTrimPctOfEquity / 100`, capped at that position's own
 * market value) from each until `cashNeeded` is covered or the position/trim
 * limits are exhausted. May return a plan that doesn't fully cover
 * `cashNeeded` — the caller sizes the buy down to whatever cash actually
 * ends up available rather than failing the signal outright.
 */
export function planTrims(options: {
  cashNeeded: number;
  rankedPositions: RankedPosition[];
  totalEquity: number;
  config: PortfolioConfig;
  /** Never trim the symbol that's about to be bought (relevant if a buy signal fires for a symbol already held at a small size). */
  excludeSymbol?: string;
}): PlannedTrim[] {
  const { cashNeeded, rankedPositions, totalEquity, config, excludeSymbol } = options;
  if (cashNeeded <= 0) return [];

  const capPerPositionUsd = totalEquity * (config.maxTrimPctOfEquity / 100);
  const excluded = excludeSymbol?.toUpperCase();
  const trims: PlannedTrim[] = [];
  let remaining = cashNeeded;

  for (const candidate of rankedPositions) {
    if (remaining <= 0 || trims.length >= config.maxPositionsToTrim) break;
    if (excluded && candidate.symbol === excluded) continue;

    const trimAmountUsd = Math.min(remaining, capPerPositionUsd, candidate.marketValue);
    if (trimAmountUsd < config.minTrimUsd) continue;

    trims.push({ symbol: candidate.symbol, trimAmountUsd, pnlPct: candidate.pnlPct });
    remaining -= trimAmountUsd;
  }

  return trims;
}
