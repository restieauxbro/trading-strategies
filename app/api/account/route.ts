import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  assertPaperOrAllowed,
  createTigerClients,
  isLiveTradingEnabled,
} from "@/lib/tiger";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const { config, trade } = createTigerClients();
    const account = await assertPaperOrAllowed(trade, config.account);
    const positions = await trade.getPositions({ market: "US", secType: "STK" });

    return NextResponse.json({
      ok: true,
      account: {
        id: config.account,
        type: account.accountType ?? null,
        capability: account.capability ?? null,
        status: account.status ?? null,
        liveTradingEnabled: isLiveTradingEnabled(),
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
