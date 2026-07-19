import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { runTradeAgent } from "@/lib/trade-agent";
import { formatTradePromptNotification, sendWhatsAppNotification } from "@/lib/notify";

export const runtime = "nodejs";
export const maxDuration = 60;

function toJsonValue(value: unknown): Prisma.InputJsonValue {
  try {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  } catch {
    return { raw: String(value) };
  }
}

async function handler(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  const promptId = (body as { promptId?: unknown })?.promptId;
  if (typeof promptId !== "string" || !promptId) {
    return NextResponse.json({ ok: false, error: "promptId is required" }, { status: 400 });
  }

  const prompt = await prisma.tradePrompt.findUnique({ where: { id: promptId } });
  if (!prompt) {
    return NextResponse.json({ ok: false, error: "prompt not found" }, { status: 404 });
  }

  // Defensive against QStash retries / overlapping duplicate delivery: claim the
  // prompt atomically so only one concurrent request can move it to EXECUTING.
  const claim = await prisma.tradePrompt.updateMany({
    where: { id: promptId, status: { in: ["SCHEDULED", "PENDING_SCHEDULE"] } },
    data: { status: "EXECUTING" },
  });
  if (claim.count === 0) {
    return NextResponse.json({ ok: true, skipped: true, reason: `already in status ${prompt.status}` });
  }

  const result = await runTradeAgent(prompt.rawPrompt);

  const updated = await prisma.tradePrompt.update({
    where: { id: promptId },
    data: {
      status: result.status,
      symbol: result.symbol,
      orderSummary: result.orderSummary,
      legs: toJsonValue(result.legs),
      agentTranscript: toJsonValue(result.transcript),
      error: result.error,
    },
  });

  const notificationBody = formatTradePromptNotification({
    rawPrompt: updated.rawPrompt,
    status: updated.status,
    symbol: updated.symbol ?? undefined,
    orderSummary: updated.orderSummary ?? undefined,
    error: updated.error ?? undefined,
  });
  const notifyResult = await sendWhatsAppNotification(notificationBody);

  await prisma.tradePrompt.update({
    where: { id: promptId },
    data: notifyResult.ok
      ? { notifiedAt: new Date() }
      : {
          error: [updated.error, `Notify failed: ${notifyResult.error}`].filter(Boolean).join(" | "),
        },
  });

  return NextResponse.json({ ok: true, prompt: updated });
}

// Wrapped lazily (not at module scope) so a missing QSTASH_CURRENT_SIGNING_KEY /
// QSTASH_NEXT_SIGNING_KEY only fails requests to this route, not the whole build —
// verifySignatureAppRouter() throws immediately if those env vars are unset.
export async function POST(request: NextRequest) {
  return verifySignatureAppRouter(handler)(request);
}
