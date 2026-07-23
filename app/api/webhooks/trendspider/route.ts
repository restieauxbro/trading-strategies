import { after } from "next/server";
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { executeWebhookSignal } from "@/lib/execute-signal";
import { isQstashConfigured, scheduleWebhookSignalExecution } from "@/lib/qstash";
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
      botName: signal.botName,
      timeframe: signal.timeframe,
      botStatus: signal.botStatus,
      comment: signal.comment,
      status: "PENDING",
    },
  });

  // Route through QStash so a burst of many simultaneous signals (e.g. a
  // whole watchlist rotating at market close) drains one-at-a-time at a
  // controlled rate instead of all executing concurrently — see the big
  // comment on scheduleWebhookSignalExecution for why that matters. Falls
  // back to firing directly via `after()` when QStash isn't configured
  // (e.g. local dev without QSTASH_TOKEN/PUBLIC_BASE_URL set) so the curl
  // smoke test in docs/trendspider-webhooks.md keeps working without it.
  if (isQstashConfigured()) {
    try {
      await scheduleWebhookSignalExecution(event.id);
    } catch (error) {
      // Don't leave the event stuck PENDING forever if QStash itself is
      // unreachable/misconfigured — surface it as a failed event same as
      // any other execution failure, but still ack the webhook so
      // TrendSpider doesn't retry-storm us on top of the outage.
      await prisma.webhookEvent.update({
        where: { id: event.id },
        data: {
          status: "FAILED",
          error: `Failed to enqueue for execution: ${(error as Error).message || String(error)}`,
        },
      });
    }
  } else {
    after(async () => {
      await executeWebhookSignal(event.id, signal);
    });
  }

  return NextResponse.json({
    ok: true,
    accepted: true,
    eventId: event.id,
    symbol: signal.symbol,
    action: signal.action,
  });
}
