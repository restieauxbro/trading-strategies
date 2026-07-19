import "server-only";
import { Client } from "@upstash/qstash";

function qstashClient() {
  const token = process.env.QSTASH_TOKEN;
  if (!token) throw new Error("Missing QSTASH_TOKEN");
  return new Client({ token });
}

function executeCallbackUrl() {
  const base = process.env.PUBLIC_BASE_URL;
  if (!base) throw new Error("Missing PUBLIC_BASE_URL");
  return `${base.replace(/\/$/, "")}/api/trade-prompts/execute`;
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
