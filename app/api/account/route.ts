import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  assertPaperOrAllowed,
  createTigerClients,
  getAccountCash,
  isLiveTradingEnabled,
} from "@/lib/tiger";
import { computeInvestedPct, resolvePortfolioConfig } from "@/lib/portfolio";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const { config, trade } = createTigerClients();
    const account = await assertPaperOrAllowed(trade, config.account);
    const positions = await trade.getPositions({ market: "US", secType: "STK" });
    const cash = await getAccountCash(trade);
    const { minInvestedPct } = resolvePortfolioConfig();

    return NextResponse.json({
      ok: true,
      account: {
        id: config.account,
        type: account.accountType ?? null,
        capability: account.capability ?? null,
        status: account.status ?? null,
        liveTradingEnabled: isLiveTradingEnabled(),
      },
      cash: {
        totalEquity: cash.totalEquity,
        availableCash: cash.availableCash,
        investedValue: cash.investedValue,
        investedPct: computeInvestedPct(cash.investedValue, cash.totalEquity),
        minInvestedPct,
      },
      positions: (positions ?? []).map((position) => ({
        symbol: position.symbol,
        quantity: position.positionQty ?? position.position,
        salableQty: position.salableQty,
        averageCost: position.averageCost,
        marketValue: position.marketValue,
        unrealizedPnl: position.unrealizedPnl,
        latestPrice: position.latestPrice,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
