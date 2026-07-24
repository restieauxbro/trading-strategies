import { ingestWebhookSignal } from "@/lib/webhook-ingest";

export const runtime = "nodejs";

/**
 * Canonical entry point for ANY webhook-style trade signal — TrendSpider
 * Strategy Bots, a TradingView Pine `alert()` call, a manual curl test, etc.
 * See docs/webhooks.md for the JSON schema and per-source setup templates.
 * `/api/webhooks/trendspider` is kept as a thin back-compat alias for
 * TrendSpider bots already configured with that URL — new integrations
 * should point here.
 */
export async function POST(request: Request) {
  return ingestWebhookSignal(request, "signal");
}
