import "server-only";
import { Client } from "@upstash/qstash";

function qstashClient() {
  const token = process.env.QSTASH_TOKEN;
  if (!token) throw new Error("Missing QSTASH_TOKEN");
  return new Client({ token });
}

function publicBaseUrl() {
  const base = process.env.PUBLIC_BASE_URL;
  if (!base) throw new Error("Missing PUBLIC_BASE_URL");
  return base.replace(/\/$/, "");
}

function executeCallbackUrl() {
  return `${publicBaseUrl()}/api/trade-prompts/execute`;
}

function webhookExecuteCallbackUrl() {
  return `${publicBaseUrl()}/api/webhooks/signal/execute`;
}

/** True when both env vars this module needs are configured. */
export function isQstashConfigured(): boolean {
  return Boolean(process.env.QSTASH_TOKEN?.trim() && process.env.PUBLIC_BASE_URL?.trim());
}

/**
 * Schedules a one-off QStash message that hits our execute webhook at
 * `scheduledFor`. Returns the QStash message id so it can be cancelled later.
 */
export async function scheduleTradePromptExecution(
  promptId: string,
  scheduledFor: Date,
): Promise<string> {
  const client = qstashClient();
  const notBefore = Math.floor(scheduledFor.getTime() / 1000);

  const result = await client.publishJSON({
    url: executeCallbackUrl(),
    body: { promptId },
    notBefore,
  });

  if (!result.messageId) {
    throw new Error("QStash did not return a messageId for the scheduled trade prompt");
  }
  return result.messageId;
}

/**
 * Cancels a previously scheduled message. Safe to call on an already-fired
 * or already-cancelled message; QStash returns cleanly either way.
 */
export async function cancelScheduledTradePrompt(messageId: string): Promise<void> {
  const client = qstashClient();
  await client.messages.cancel(messageId);
}

/**
 * Any signal source (TrendSpider, a TradingView Pine `alert()` call, ...) can
 * fire many symbols' worth of buy/sell signals within the same second (e.g. a
 * whole watchlist rotating at market close). Executing all of them
 * concurrently would (a) blow straight through Tiger's own account-level
 * rate limits — a 60s rolling window of 120/min for orders+quotes and 60/min
 * for assets/positions, see .agents/skills/tigeropen/references/quickstart.md
 * — and (b) race on the shared account snapshot the portfolio manager
 * (lib/portfolio.ts) reads to decide sizing/trims, since two signals
 * processed at the same instant would each see the same pre-trade
 * cash/positions and could double-trim the same position or collectively
 * overspend past total equity.
 *
 * Routing every signal — regardless of source — through a single shared
 * QStash flow-control key with `parallelism: 1` fixes both: it forces
 * buy/sell signals to execute one at a time account-wide (no races) at a
 * rate capped well under Tiger's limits, while still accepting all incoming
 * webhook POSTs immediately (see lib/webhook-ingest.ts) — they just drain
 * from the queue instead of firing all at once. `parallelism` is
 * intentionally not configurable via env — raising it above 1 would
 * reintroduce the race.
 */
export async function scheduleWebhookSignalExecution(eventId: string): Promise<string> {
  const client = qstashClient();
  const rate = Number(process.env.WEBHOOK_QUEUE_RATE_PER_MINUTE);

  const result = await client.publishJSON({
    url: webhookExecuteCallbackUrl(),
    body: { eventId },
    flowControl: {
      key: "webhook-signal",
      parallelism: 1,
      rate: Number.isFinite(rate) && rate > 0 ? rate : 20,
      period: "1m",
    },
  });

  if (!result.messageId) {
    throw new Error("QStash did not return a messageId for the webhook signal execution");
  }
  return result.messageId;
}
