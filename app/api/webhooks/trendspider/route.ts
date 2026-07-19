import { after } from "next/server";
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { executeWebhookSignal } from "@/lib/execute-signal";
import { parseTrendspiderPayload } from "@/lib/webhook-schema";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const expected = process.env.WEBHOOK_TOKEN?.trim();
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "WEBHOOK_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? request.headers.get("x-webhook-token");
  if (!token || token !== expected) {
    return unauthorized();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  const parsed = parseTrendspiderPayload(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid payload",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const signal = parsed.data;
  const event = await prisma.webhookEvent.create({
    data: {
      source: "trendspider",
      rawPayload: body as Prisma.InputJsonValue,
      symbol: signal.symbol,
      action: signal.action,
      quantity: signal.quantity,
      limitPrice: signal.limitPrice,
      botName: signal.botName,
      timeframe: signal.timeframe,
      botStatus: signal.botStatus,
      comment: signal.comment,
      status: "PENDING",
    },
  });

  after(async () => {
    await executeWebhookSignal(event.id, signal);
  });

  return NextResponse.json({
    ok: true,
    accepted: true,
    eventId: event.id,
    symbol: signal.symbol,
    action: signal.action,
  });
}
