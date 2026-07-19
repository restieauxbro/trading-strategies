import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cancelScheduledTradePrompt } from "@/lib/qstash";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const prompt = await prisma.tradePrompt.findUnique({ where: { id } });
  if (!prompt) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }
  if (prompt.status !== "SCHEDULED") {
    return NextResponse.json(
      { ok: false, error: `Cannot cancel a prompt with status ${prompt.status}` },
      { status: 400 },
    );
  }

  if (prompt.qstashMessageId) {
    try {
      await cancelScheduledTradePrompt(prompt.qstashMessageId);
    } catch (error) {
      return NextResponse.json(
        { ok: false, error: `Failed to cancel QStash message: ${error instanceof Error ? error.message : String(error)}` },
        { status: 500 },
      );
    }
  }

  const cancelled = await prisma.tradePrompt.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({ ok: true, prompt: cancelled });
}
