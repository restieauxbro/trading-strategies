import { ingestWebhookSignal } from "@/lib/webhook-ingest";

export const runtime = "nodejs";

/**
 * Back-compat alias for TrendSpider Strategy Bots already configured with
 * this URL. Identical behaviour to the canonical `/api/webhooks/signal`
 * (same handler, same schema) — only the default `source` label differs.
 * Point any NEW integration (e.g. a TradingView Pine `alert()` call) at
 * `/api/webhooks/signal` instead; see docs/webhooks.md.
 */
export async function POST(request: Request) {
  return ingestWebhookSignal(request, "trendspider");
}
