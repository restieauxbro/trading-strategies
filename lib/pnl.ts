import "server-only";
import { prisma } from "@/lib/db";

export type RealizedTrade = {
  symbol: string;
  buyEventId: string;
  sellEventId: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  realizedPnl: number;
  closedAt: string;
};

export type SymbolPnl = {
  symbol: string;
  realizedPnl: number;
  openQuantity: number;
  openCostBasis: number | null;
  trades: RealizedTrade[];
};

export type ProvisionalPnl = {
  bySymbol: SymbolPnl[];
  totalRealizedPnl: number;
};

type Lot = { eventId: string; quantity: number; price: number };

const EPSILON = 1e-9;

/**
 * TODO(fill-reconciliation): there is no reconciliation with Tiger's actual
 * order fills yet — this treats each PLACED event's *intended* limitPrice and
 * quantity as a provisional stand-in for the real fill price/quantity, purely
 * to get a rough P&L signal now. Revisit once a job polls
 * `trade.getOrder()` / `getFilledOrders()` for real `avgFillPrice` /
 * `filledQuantity` and swap this over to use that instead.
 *
 * FIFO-matches `sell` events against prior `buy` events per symbol, using
 * only this app's own webhook event log. Any sell quantity that exceeds what
 * this log ever recorded buying (e.g. a pre-existing position, or a trade
 * placed outside this webhook path) can't be attributed to a cost basis and
 * is silently dropped from realized P&L rather than guessed at.
 */
export async function computeProvisionalPnl(): Promise<ProvisionalPnl> {
  const events = await prisma.webhookEvent.findMany({
    where: { status: "PLACED", action: { in: ["buy", "sell"] } },
    orderBy: { createdAt: "asc" },
  });

  const openLots = new Map<string, Lot[]>();
  const realizedBySymbol = new Map<string, RealizedTrade[]>();

  for (const event of events) {
    const symbol = event.symbol;
    if (!symbol || event.quantity == null || event.limitPrice == null) continue;

    const lots = openLots.get(symbol) ?? [];
    openLots.set(symbol, lots);

    if (event.action === "buy") {
      lots.push({ eventId: event.id, quantity: event.quantity, price: event.limitPrice });
      continue;
    }

    let remaining = event.quantity;
    const trades = realizedBySymbol.get(symbol) ?? [];
    realizedBySymbol.set(symbol, trades);

    while (remaining > EPSILON && lots.length > 0) {
      const lot = lots[0];
      const matchedQty = Math.min(remaining, lot.quantity);
      trades.push({
        symbol,
        buyEventId: lot.eventId,
        sellEventId: event.id,
        quantity: matchedQty,
        buyPrice: lot.price,
        sellPrice: event.limitPrice,
        realizedPnl: matchedQty * (event.limitPrice - lot.price),
        closedAt: event.createdAt.toISOString(),
      });
      lot.quantity -= matchedQty;
      remaining -= matchedQty;
      if (lot.quantity <= EPSILON) lots.shift();
    }
  }

  const symbols = new Set([...openLots.keys(), ...realizedBySymbol.keys()]);
  const bySymbol: SymbolPnl[] = [];
  let totalRealizedPnl = 0;

  for (const symbol of symbols) {
    const trades = realizedBySymbol.get(symbol) ?? [];
    const realizedPnl = trades.reduce((sum, t) => sum + t.realizedPnl, 0);
    totalRealizedPnl += realizedPnl;

    const lots = (openLots.get(symbol) ?? []).filter((lot) => lot.quantity > EPSILON);
    const openQuantity = lots.reduce((sum, lot) => sum + lot.quantity, 0);
    const openCostBasis =
      openQuantity > EPSILON
        ? lots.reduce((sum, lot) => sum + lot.quantity * lot.price, 0) / openQuantity
        : null;

    bySymbol.push({ symbol, realizedPnl, openQuantity, openCostBasis, trades });
  }

  bySymbol.sort((a, b) => a.symbol.localeCompare(b.symbol));

  return { bySymbol, totalRealizedPnl };
}
