import "server-only";
import Anthropic from "@anthropic-ai/sdk";

const MARKET_TIMEZONE = "America/New_York";
const USER_TIMEZONE = "Australia/Sydney";

export type ScheduleKind = "market_open" | "market_close" | "relative_offset" | "explicit_datetime";

export type ScheduleResolution = {
  scheduledFor: Date;
  scheduleKind: ScheduleKind;
  notes?: string;
};

type ScheduleClassification = {
  kind: ScheduleKind;
  offsetMinutes?: number;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  timezone?: string;
  notes?: string;
};

const CLASSIFY_TOOL_NAME = "classify_schedule";

function anthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");
  return new Anthropic({ apiKey });
}

/**
 * Converts a wall-clock date/time in a given IANA timezone to a UTC Date,
 * without pulling in a timezone library. Standard "format back and diff"
 * trick: guess UTC = the wall clock, render that guess in the target zone,
 * then correct by the observed offset (handles DST automatically).
 */
function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const asUtcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const rendered = new Date(asUtcGuess.toLocaleString("en-US", { timeZone }));
  const diff = asUtcGuess.getTime() - rendered.getTime();
  return new Date(asUtcGuess.getTime() + diff);
}

function getDatePartsInTimeZone(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour === "24" ? "0" : parts.hour),
    minute: Number(parts.minute),
  };
}

function isWeekend(year: number, month: number, day: number) {
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return weekday === 0 || weekday === 6;
}

function addCalendarDays(year: number, month: number, day: number, days: number) {
  const next = new Date(Date.UTC(year, month - 1, day + days));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
}

/**
 * Resolves "market open" / "market close" to the next NYSE trading day at
 * 9:30 / 16:00 America/New_York, relative to `now`.
 *
 * v1 simplification: skips weekends only, no full NYSE holiday calendar.
 * A prompt lodged right before a market holiday will resolve to that
 * holiday's date rather than the next real trading day — known gap.
 */
function resolveMarketTime(now: Date, targetHour: number, targetMinute: number): Date {
  let { year, month, day } = getDatePartsInTimeZone(now, MARKET_TIMEZONE);

  for (let i = 0; i < 10; i += 1) {
    const candidate = zonedTimeToUtc(year, month, day, targetHour, targetMinute, MARKET_TIMEZONE);
    if (!isWeekend(year, month, day) && candidate.getTime() > now.getTime()) {
      return candidate;
    }
    ({ year, month, day } = addCalendarDays(year, month, day, 1));
  }

  throw new Error("Could not resolve next trading day within 10 days");
}

async function classifySchedule(promptText: string, now: Date): Promise<ScheduleClassification> {
  const nowUtc = now.toISOString();
  const nowSydney = now.toLocaleString("en-AU", { timeZone: USER_TIMEZONE, dateStyle: "full", timeStyle: "short" });
  const nowNewYork = now.toLocaleString("en-US", { timeZone: MARKET_TIMEZONE, dateStyle: "full", timeStyle: "short" });

  const client = anthropicClient();
  const response = await client.messages.create({
    model: process.env.TRADE_AGENT_MODEL || "claude-sonnet-4-5",
    max_tokens: 512,
    system:
      "You classify the timing intent of a scheduled-trade prompt. You do NOT compute the final timestamp yourself " +
      "for market_open/market_close (that's done deterministically in code) — you only decide WHICH kind of timing " +
      "the user meant, and for explicit_datetime/relative_offset you extract the literal fields the user stated. " +
      "Default to market_open if no timing is mentioned at all, since this is a trading prompt. " +
      "If the phrase clearly refers to market hours (e.g. 'at open', 'at close', 'at market open'), use market_open/market_close. " +
      "If the phrase gives a relative duration ('in 2 hours', 'in 30 minutes'), use relative_offset with whole-minute offsetMinutes. " +
      "If the phrase gives a specific calendar date/time, use explicit_datetime and extract year/month/day/hour(0-23)/minute. " +
      "For explicit_datetime, infer timezone: if the phrasing references the market/ET/NYSE, use 'America/New_York'; " +
      "otherwise assume the user's own timezone, 'Australia/Sydney', unless another timezone is explicitly named.",
    messages: [
      {
        role: "user",
        content:
          `Current time: ${nowUtc} UTC (${nowSydney} in Australia/Sydney; ${nowNewYork} in America/New_York).\n\n` +
          `Trade prompt:\n"""\n${promptText}\n"""\n\nClassify its timing intent.`,
      },
    ],
    tools: [
      {
        name: CLASSIFY_TOOL_NAME,
        description: "Classify the timing intent expressed in a trade prompt.",
        input_schema: {
          type: "object",
          properties: {
            kind: {
              type: "string",
              enum: ["market_open", "market_close", "relative_offset", "explicit_datetime"],
            },
            offsetMinutes: {
              type: "integer",
              description: "Only for relative_offset: whole minutes from now until execution.",
            },
            year: { type: "integer" },
            month: { type: "integer", description: "1-12" },
            day: { type: "integer" },
            hour: { type: "integer", description: "0-23" },
            minute: { type: "integer" },
            timezone: {
              type: "string",
              description: "IANA timezone name, only for explicit_datetime, e.g. America/New_York or Australia/Sydney.",
            },
            notes: {
              type: "string",
              description: "Brief note on how you interpreted the timing, for audit logging.",
            },
          },
          required: ["kind", "notes"],
        },
      },
    ],
    tool_choice: { type: "tool", name: CLASSIFY_TOOL_NAME },
  });

  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use" && block.name === CLASSIFY_TOOL_NAME,
  );
  if (!toolUse) {
    throw new Error("Claude did not return a schedule classification");
  }
  return toolUse.input as ScheduleClassification;
}

export async function resolveScheduledTime(
  promptText: string,
  now: Date = new Date(),
): Promise<ScheduleResolution> {
  const classification = await classifySchedule(promptText, now);

  switch (classification.kind) {
    case "market_open":
      return { scheduledFor: resolveMarketTime(now, 9, 30), scheduleKind: "market_open", notes: classification.notes };
    case "market_close":
      return { scheduledFor: resolveMarketTime(now, 16, 0), scheduleKind: "market_close", notes: classification.notes };
    case "relative_offset": {
      const minutes = classification.offsetMinutes;
      if (typeof minutes !== "number" || !Number.isFinite(minutes) || minutes < 0) {
        throw new Error("Model returned relative_offset without a valid offsetMinutes");
      }
      return {
        scheduledFor: new Date(now.getTime() + minutes * 60_000),
        scheduleKind: "relative_offset",
        notes: classification.notes,
      };
    }
    case "explicit_datetime": {
      const { year, month, day, hour, minute, timezone } = classification;
      if (
        typeof year !== "number" ||
        typeof month !== "number" ||
        typeof day !== "number" ||
        typeof hour !== "number" ||
        typeof minute !== "number"
      ) {
        throw new Error("Model returned explicit_datetime without complete date/time fields");
      }
      const scheduledFor = zonedTimeToUtc(year, month, day, hour, minute, timezone || USER_TIMEZONE);
      return { scheduledFor, scheduleKind: "explicit_datetime", notes: classification.notes };
    }
    default:
      throw new Error(`Unknown schedule kind: ${String((classification as ScheduleClassification).kind)}`);
  }
}
