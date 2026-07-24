import { z } from "zod";

const actionSchema = z
  .string()
  .transform((value) => value.trim().toLowerCase())
  .pipe(z.enum(["buy", "sell"]));

/**
 * Shared payload shape for every signal source that can hit
 * `/api/webhooks/signal` (and the back-compat `/api/webhooks/trendspider`
 * alias) — TrendSpider Strategy Bots, a TradingView Pine `alert()` call, or a
 * manual curl test. Only `symbol`/`ticker` + `action` are required; everything
 * else is optional metadata carried through for the dashboard/logs. An
 * explicit `source` field lets a sender label itself (e.g. `"tradingview"`)
 * — otherwise the route it hit supplies a default (see lib/webhook-ingest.ts).
 */
export const webhookSignalSchema = z
  .object({
    symbol: z.string().optional(),
    ticker: z.string().optional(),
    action: actionSchema,
    source: z.string().optional(),
    bot_name: z.string().optional(),
    timeframe: z.string().optional(),
    bot_timeframe: z.string().optional(),
    bot_status: z.string().optional(),
    comment: z.string().optional(),
  })
  .passthrough()
  .transform((raw) => {
    const symbol = (raw.symbol ?? raw.ticker ?? "").trim().toUpperCase();

    return {
      symbol,
      action: raw.action as "buy" | "sell",
      source: raw.source?.trim().toLowerCase() || undefined,
      botName: raw.bot_name?.trim() || undefined,
      timeframe: (raw.timeframe ?? raw.bot_timeframe)?.trim() || undefined,
      botStatus: raw.bot_status?.trim() || undefined,
      comment: raw.comment?.trim() || undefined,
    };
  })
  .superRefine((data, ctx) => {
    if (!data.symbol) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "symbol (or ticker) is required",
        path: ["symbol"],
      });
    }
  });

export type ParsedWebhookSignal = z.infer<typeof webhookSignalSchema>;

export function parseWebhookSignal(body: unknown) {
  return webhookSignalSchema.safeParse(body);
}
