import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { prisma } from "@/lib/db";
import { executeWebhookSignal } from "@/lib/execute-signal";
import type { ParsedTrendspiderSignal } from "@/lib/webhook-schema";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * QStash-invoked worker for a single queued TrendSpider signal (enqueued by
 * app/api/webhooks/trendspider/route.ts via lib/qstash.ts's
 * scheduleWebhookSignalExecution, with `flowControl: { parallelism: 1 }` so
 * these run strictly one-at-a-time account-wide — see the comment there for
 * why). Reconstructs the parsed signal from the already-persisted
 * WebhookEvent row rather than round-tripping it through the queue message,
 * since every field it needs was already written by the POST handler.
 */
async function handler(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  const eventId = (body as { eventId?: unknown })?.eventId;
  if (typeof eventId !== "string" || !eventId) {
    return NextResponse.json({ ok: false, error: "eventId is required" }, { status: 400 });
  }

  const event = await prisma.webhookEvent.findUnique({ where: { id: eventId } });
  if (!event) {
    return NextResponse.json({ ok: false, error: "event not found" }, { status: 404 });
  }

  // Defensive against QStash retries / overlapping duplicate delivery: claim
  // the event atomically so only one concurrent request can move it out of
  // PENDING, same pattern as app/api/trade-prompts/execute/route.ts.
  const claim = await prisma.webhookEvent.updateMany({
    where: { id: eventId, status: "PENDING" },
    data: { status: "PROCESSING" },
  });
  if (claim.count === 0) {
    return NextResponse.json({ ok: true, skipped: true, reason: `already in status ${event.status}` });
  }

  if (!event.symbol || !event.action) {
    await prisma.webhookEvent.update({
      where: { id: eventId },
      data: { status: "FAILED", error: "Queued event is missing symbol/action" },
    });
    return NextResponse.json({ ok: false, error: "queued event is missing symbol/action" }, { status: 500 });
  }

  const signal: ParsedTrendspiderSignal = {
    symbol: event.symbol,
    action: event.action as "buy" | "sell",
    botName: event.botName ?? undefined,
    timeframe: event.timeframe ?? undefined,
    botStatus: event.botStatus ?? undefined,
    comment: event.comment ?? undefined,
  };

  const updated = await executeWebhookSignal(eventId, signal);
  return NextResponse.json({ ok: true, event: updated });
}

// Wrapped lazily (not at module scope) so a missing QSTASH_CURRENT_SIGNING_KEY /
// QSTASH_NEXT_SIGNING_KEY only fails requests to this route, not the whole build —
// verifySignatureAppRouter() throws immediately if those env vars are unset.
export async function POST(request: NextRequest) {
  return verifySignatureAppRouter(handler)(request);
}
