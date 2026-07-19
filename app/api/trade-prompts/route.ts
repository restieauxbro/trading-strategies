import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { resolveScheduledTime } from "@/lib/parse-schedule";
import { scheduleTradePromptExecution } from "@/lib/qstash";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAuthenticated())) return unauthorized();

  const prompts = await prisma.tradePrompt.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ ok: true, prompts });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  const rawPrompt = (body as { prompt?: unknown })?.prompt;
  if (typeof rawPrompt !== "string" || rawPrompt.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "prompt is required" }, { status: 400 });
  }

  const trimmedPrompt = rawPrompt.trim();

  let scheduledFor: Date;
  let scheduleKind: string;
  try {
    const resolution = await resolveScheduledTime(trimmedPrompt);
    scheduledFor = resolution.scheduledFor;
    scheduleKind = resolution.scheduleKind;
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: `Could not resolve a run time: ${error instanceof Error ? error.message : String(error)}` },
      { status: 400 },
    );
  }

  const prompt = await prisma.tradePrompt.create({
    data: {
      rawPrompt: trimmedPrompt,
      scheduledFor,
      scheduleKind,
      status: "PENDING_SCHEDULE",
    },
  });

  try {
    const messageId = await scheduleTradePromptExecution(prompt.id, scheduledFor);
    const scheduled = await prisma.tradePrompt.update({
      where: { id: prompt.id },
      data: { qstashMessageId: messageId, status: "SCHEDULED" },
    });
    return NextResponse.json({ ok: true, prompt: scheduled });
  } catch (error) {
    const failed = await prisma.tradePrompt.update({
      where: { id: prompt.id },
      data: {
        status: "FAILED",
        error: `Failed to schedule with QStash: ${error instanceof Error ? error.message : String(error)}`,
      },
    });
    return NextResponse.json({ ok: false, error: failed.error, prompt: failed }, { status: 500 });
  }
}
