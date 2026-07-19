import "server-only";

/**
 * Sends a plain-text WhatsApp message via Twilio's REST API. Uses a raw
 * `fetch` call rather than the `twilio` SDK to avoid pulling in a large
 * dependency for a single endpoint.
 *
 * Requires the destination number to have opted in (joined the sandbox, or
 * be a contact of an approved WhatsApp Business sender) — Twilio setup, not
 * something this code can do for you.
 */
export async function sendWhatsAppNotification(body: string): Promise<{ ok: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.TWILIO_WHATSAPP_TO;

  if (!accountSid || !authToken || !from || !to) {
    return { ok: false, error: "Missing Twilio WhatsApp env vars (TWILIO_ACCOUNT_SID/AUTH_TOKEN/WHATSAPP_FROM/WHATSAPP_TO)" };
  }

  const params = new URLSearchParams({ From: from, To: to, Body: body });
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return { ok: false, error: `Twilio ${response.status}: ${text.slice(0, 500)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export function formatTradePromptNotification(input: {
  rawPrompt: string;
  status: string;
  symbol?: string;
  orderSummary?: string;
  error?: string;
}): string {
  const lines = [
    `Trade prompt ${input.status}`,
    `Prompt: ${truncate(input.rawPrompt, 200)}`,
  ];
  if (input.symbol) lines.push(`Symbol: ${input.symbol}`);
  if (input.orderSummary) lines.push(`Summary: ${truncate(input.orderSummary, 400)}`);
  if (input.error) lines.push(`Error: ${truncate(input.error, 400)}`);
  return lines.join("\n");
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
