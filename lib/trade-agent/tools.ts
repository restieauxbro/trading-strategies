import "server-only";
import type Anthropic from "@anthropic-ai/sdk";
import type { TradeClient, QuoteClient, PreviewResult } from "@tigeropenapi/tigeropen";
import {
  getOptionChainSafe,
  getOptionExpirations,
  getStockQuote,
  placeOptionLegOrder,
  placeShareLimitOrder,
} from "@/lib/tiger";
import { orderGuardrailViolation } from "@/lib/order-guardrails";

export type LegRecord = {
  kind: "stock" | "option";
  action: "BUY" | "SELL";
  symbol: string;
  quantity: number;
  limitPrice: number;
  expiry?: string;
  strike?: string;
  right?: "CALL" | "PUT";
  outcome: "placed" | "rejected";
  tigerOrderId?: string;
  tigerOrderId2?: string;
  error?: string;
};

export type ToolContext = {
  trade: TradeClient;
  quote: QuoteClient;
  account: string;
  legs: LegRecord[];
};

type ToolResult = { ok: boolean; [key: string]: unknown };

export const TOOL_DEFINITIONS: Anthropic.Tool[] = [
  {
    name: "get_stock_quote",
    description: "Get the current (real-time or delayed) price of a US stock, used to estimate an at-the-money strike.",
    input_schema: {
      type: "object",
      properties: { symbol: { type: "string" } },
      required: ["symbol"],
    },
  },
  {
    name: "get_option_expirations",
    description: "List available option expiry dates (YYYY-MM-DD) for a US symbol.",
    input_schema: {
      type: "object",
      properties: { symbol: { type: "string" } },
      required: ["symbol"],
    },
  },
  {
    name: "get_option_chain",
    description:
      "Look up the option chain (strikes, bid/ask) for a symbol/expiry. May report available:false if the account " +
      "lacks quote permission — in that case fall back to get_stock_quote to estimate an at-the-money strike.",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string" },
        expiry: { type: "string", description: "YYYY-MM-DD, must be one of get_option_expirations' results" },
      },
      required: ["symbol", "expiry"],
    },
  },
  {
    name: "get_positions",
    description: "List current US positions (stocks and options) on the trading account.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "place_stock_order",
    description: "Preview and place a US stock DAY limit order.",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string" },
        action: { type: "string", enum: ["BUY", "SELL"] },
        quantity: { type: "integer", minimum: 1 },
        limitPrice: { type: "number", exclusiveMinimum: 0 },
      },
      required: ["symbol", "action", "quantity", "limitPrice"],
    },
  },
  {
    name: "place_option_leg",
    description:
      "Preview and place a single-leg US option DAY limit order. This SDK has no native multi-leg combo order — " +
      "build a spread by calling this twice (long leg first, then short leg).",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Underlying symbol, e.g. GOOGL" },
        expiry: { type: "string", description: "YYYY-MM-DD" },
        strike: { type: "number" },
        right: { type: "string", enum: ["CALL", "PUT"] },
        action: { type: "string", enum: ["BUY", "SELL"] },
        quantity: { type: "integer", minimum: 1, description: "Number of contracts" },
        limitPrice: { type: "number", exclusiveMinimum: 0, description: "Per-contract premium" },
      },
      required: ["symbol", "expiry", "strike", "right", "action", "quantity", "limitPrice"],
    },
  },
  {
    name: "report_result",
    description:
      "Call this exactly once to conclude, after you've placed (or deliberately declined) the trade. " +
      "Use status=skipped when the prompt is missing information you must not guess (e.g. no spread width given). " +
      "Use status=failed for errors. Ending the conversation without calling this is treated as a failure.",
    input_schema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["placed", "partially_placed", "skipped", "failed"] },
        symbol: { type: "string" },
        orderSummary: { type: "string", description: "Human-readable summary of what was (or wasn't) done." },
        error: { type: "string", description: "Reason, required for skipped/failed." },
      },
      required: ["status", "orderSummary"],
    },
  },
];

function summarizePreview(preview: PreviewResult | undefined) {
  if (!preview) return undefined;
  return { isPass: preview.isPass, commission: preview.commission, message: preview.message };
}

export async function runTool(
  name: string,
  input: unknown,
  ctx: ToolContext,
): Promise<ToolResult> {
  try {
    switch (name) {
      case "get_stock_quote": {
        const { symbol } = input as { symbol: string };
        const result = await getStockQuote(ctx.quote, symbol);
        return { ok: true, ...result };
      }

      case "get_option_expirations": {
        const { symbol } = input as { symbol: string };
        const expirations = await getOptionExpirations(ctx.quote, symbol);
        return { ok: true, symbol: symbol.toUpperCase(), expirations };
      }

      case "get_option_chain": {
        const { symbol, expiry } = input as { symbol: string; expiry: string };
        const rows = await getOptionChainSafe(ctx.quote, symbol, expiry);
        if (!rows) {
          return {
            ok: true,
            available: false,
            note: "Chain unavailable (likely missing quote permission). Fall back to get_stock_quote for an ATM strike estimate; place_option_leg's preview step will reject an invalid contract.",
          };
        }
        return {
          ok: true,
          available: true,
          rows: rows.map((row) => ({
            strike: row.call?.strike ?? row.put?.strike,
            call: row.call
              ? { bid: row.call.bidPrice, ask: row.call.askPrice, last: row.call.latestPrice }
              : undefined,
            put: row.put ? { bid: row.put.bidPrice, ask: row.put.askPrice, last: row.put.latestPrice } : undefined,
          })),
        };
      }

      case "get_positions": {
        const positions = await ctx.trade.getPositions({ market: "US" });
        return {
          ok: true,
          positions: positions.map((position) => ({
            symbol: position.symbol,
            quantity: position.positionQty ?? position.position,
            averageCost: position.averageCost,
          })),
        };
      }

      case "place_stock_order": {
        const parsed = input as { symbol: string; action: "BUY" | "SELL"; quantity: number; limitPrice: number };
        const violation = orderGuardrailViolation("stock", parsed.quantity, parsed.limitPrice);
        if (violation) {
          ctx.legs.push({
            kind: "stock",
            action: parsed.action,
            symbol: parsed.symbol.toUpperCase(),
            quantity: parsed.quantity,
            limitPrice: parsed.limitPrice,
            outcome: "rejected",
            error: violation,
          });
          return { ok: false, error: violation };
        }
        try {
          const { preview, placed } = await placeShareLimitOrder({
            trade: ctx.trade,
            account: ctx.account,
            symbol: parsed.symbol,
            action: parsed.action,
            quantity: parsed.quantity,
            limitPrice: parsed.limitPrice,
          });
          ctx.legs.push({
            kind: "stock",
            action: parsed.action,
            symbol: parsed.symbol.toUpperCase(),
            quantity: parsed.quantity,
            limitPrice: parsed.limitPrice,
            outcome: "placed",
            tigerOrderId: placed?.id != null ? String(placed.id) : undefined,
            tigerOrderId2: placed?.order_id != null ? String(placed.order_id) : undefined,
          });
          return { ok: true, tigerOrderId: placed?.id, preview: summarizePreview(preview) };
        } catch (err) {
          const message = (err as Error).message;
          ctx.legs.push({
            kind: "stock",
            action: parsed.action,
            symbol: parsed.symbol.toUpperCase(),
            quantity: parsed.quantity,
            limitPrice: parsed.limitPrice,
            outcome: "rejected",
            error: message,
          });
          return { ok: false, error: message };
        }
      }

      case "place_option_leg": {
        const parsed = input as {
          symbol: string;
          expiry: string;
          strike: number;
          right: "CALL" | "PUT";
          action: "BUY" | "SELL";
          quantity: number;
          limitPrice: number;
        };
        const violation = orderGuardrailViolation("option", parsed.quantity, parsed.limitPrice);
        if (violation) {
          ctx.legs.push({
            kind: "option",
            action: parsed.action,
            symbol: parsed.symbol.toUpperCase(),
            quantity: parsed.quantity,
            limitPrice: parsed.limitPrice,
            expiry: parsed.expiry,
            strike: String(parsed.strike),
            right: parsed.right,
            outcome: "rejected",
            error: violation,
          });
          return { ok: false, error: violation };
        }
        try {
          const { preview, placed } = await placeOptionLegOrder({
            trade: ctx.trade,
            account: ctx.account,
            symbol: parsed.symbol,
            expiry: parsed.expiry,
            strike: parsed.strike,
            right: parsed.right,
            action: parsed.action,
            quantity: parsed.quantity,
            limitPrice: parsed.limitPrice,
          });
          ctx.legs.push({
            kind: "option",
            action: parsed.action,
            symbol: parsed.symbol.toUpperCase(),
            quantity: parsed.quantity,
            limitPrice: parsed.limitPrice,
            expiry: parsed.expiry,
            strike: String(parsed.strike),
            right: parsed.right,
            outcome: "placed",
            tigerOrderId: placed?.id != null ? String(placed.id) : undefined,
            tigerOrderId2: placed?.order_id != null ? String(placed.order_id) : undefined,
          });
          return { ok: true, tigerOrderId: placed?.id, preview: summarizePreview(preview) };
        } catch (err) {
          const message = (err as Error).message;
          ctx.legs.push({
            kind: "option",
            action: parsed.action,
            symbol: parsed.symbol.toUpperCase(),
            quantity: parsed.quantity,
            limitPrice: parsed.limitPrice,
            expiry: parsed.expiry,
            strike: String(parsed.strike),
            right: parsed.right,
            outcome: "rejected",
            error: message,
          });
          return { ok: false, error: message };
        }
      }

      default:
        return { ok: false, error: `Unknown tool: ${name}` };
    }
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
