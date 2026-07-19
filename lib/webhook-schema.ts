import { z } from "zod";

const actionSchema = z
  .string()
  .transform((value) => value.trim().toLowerCase())
  .pipe(z.enum(["buy", "sell", "flat"]));

function coerceNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed || trimmed.includes("%")) return undefined;
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

export const trendspiderPayloadSchema = z
  .object({
    symbol: z.string().optional(),
    ticker: z.string().optional(),
    action: actionSchema,
    quantity: z.unknown().optional(),
    qty: z.unknown().optional(),
    order_contracts: z.unknown().optional(),
    limit_price: z.unknown().optional(),
    price: z.unknown().optional(),
    bot_name: z.string().optional(),
    timeframe: z.string().optional(),
    bot_timeframe: z.string().optional(),
    bot_status: z.string().optional(),
    comment: z.string().optional(),
  })
  .passthrough()
  .transform((raw) => {
    const symbol = (raw.symbol ?? raw.ticker ?? "").trim().toUpperCase();
    const quantity = coerceNumber(raw.quantity ?? raw.qty ?? raw.order_contracts);
    const limitPrice = coerceNumber(raw.limit_price ?? raw.price);

    return {
      symbol,
      action: raw.action as "buy" | "sell" | "flat",
      quantity,
      limitPrice,
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
    if (data.action !== "flat" && (data.quantity === undefined || data.quantity <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "quantity is required for buy/sell and must be > 0",
        path: ["quantity"],
      });
    }
    if (data.limitPrice === undefined || data.limitPrice <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "limit_price (or price) is required and must be > 0",
        path: ["limit_price"],
      });
    }
  });

export type ParsedTrendspiderSignal = z.infer<typeof trendspiderPayloadSchema>;

export function parseTrendspiderPayload(body: unknown) {
  return trendspiderPayloadSchema.safeParse(body);
}
