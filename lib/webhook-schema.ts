import { z } from "zod";

const actionSchema = z
  .string()
  .transform((value) => value.trim().toLowerCase())
  .pipe(z.enum(["buy", "sell"]));

export const trendspiderPayloadSchema = z
  .object({
    symbol: z.string().optional(),
    ticker: z.string().optional(),
    action: actionSchema,
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

export type ParsedTrendspiderSignal = z.infer<typeof trendspiderPayloadSchema>;

export function parseTrendspiderPayload(body: unknown) {
  return trendspiderPayloadSchema.safeParse(body);
}
