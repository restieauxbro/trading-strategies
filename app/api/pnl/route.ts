import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { computeProvisionalPnl } from "@/lib/pnl";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const pnl = await computeProvisionalPnl();
  return NextResponse.json({ ok: true, ...pnl });
}
