import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const events = await prisma.webhookEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ ok: true, events });
}
