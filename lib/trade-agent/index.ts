import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { assertPaperOrAllowed, createTigerClients } from "@/lib/tiger";
import { buildSystemPrompt } from "./system-prompt";
import { TOOL_DEFINITIONS, runTool, type LegRecord } from "./tools";

export type TradeAgentStatus = "PLACED" | "PARTIALLY_PLACED" | "FAILED" | "SKIPPED";

export type TradeAgentResult = {
  status: TradeAgentStatus;
  symbol?: string;
  orderSummary?: string;
  legs: LegRecord[];
  transcript: unknown[];
  error?: string;
};

type FinalReport = {
  status: "placed" | "partially_placed" | "skipped" | "failed";
  symbol?: string;
  orderSummary: string;
  error?: string;
};

const MAX_ITERATIONS = 8;

export async function runTradeAgent(rawPrompt: string): Promise<TradeAgentResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { status: "FAILED", legs: [], transcript: [], error: "Missing ANTHROPIC_API_KEY" };
  }

  let clients: ReturnType<typeof createTigerClients>;
  try {
    clients = createTigerClients();
  } catch (err) {
    return { status: "FAILED", legs: [], transcript: [], error: (err as Error).message };
  }
  const { config, trade, quote } = clients;

  try {
    await assertPaperOrAllowed(trade, config.account);
  } catch (err) {
    return { status: "FAILED", legs: [], transcript: [], error: (err as Error).message };
  }

  const legs: LegRecord[] = [];
  const client = new Anthropic({ apiKey });
  const model = process.env.TRADE_AGENT_MODEL || "claude-sonnet-4-5";
  const system = buildSystemPrompt();

  const messages: Anthropic.MessageParam[] = [{ role: "user", content: rawPrompt }];
  const transcript: unknown[] = [];
  let finalReport: FinalReport | undefined;

  for (let i = 0; i < MAX_ITERATIONS && !finalReport; i += 1) {
    const response = await client.messages.create({
      model,
      max_tokens: 2048,
      system,
      messages,
      tools: TOOL_DEFINITIONS,
    });

    transcript.push({ role: "assistant", content: response.content, stopReason: response.stop_reason });
    messages.push({ role: "assistant", content: response.content });

    const toolUses = response.content.filter(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
    );

    if (toolUses.length === 0) break;

    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const toolUse of toolUses) {
      if (toolUse.name === "report_result") {
        finalReport = toolUse.input as FinalReport;
        transcript.push({ role: "tool", name: toolUse.name, input: toolUse.input });
        break;
      }

      const result = await runTool(toolUse.name, toolUse.input, { trade, quote, account: config.account, legs });
      transcript.push({ role: "tool", name: toolUse.name, input: toolUse.input, result });
      toolResults.push({
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: JSON.stringify(result),
        is_error: result.ok === false,
      });
    }

    if (finalReport) break;
    if (toolResults.length > 0) {
      messages.push({ role: "user", content: toolResults });
    }
  }

  return deriveResult(finalReport, legs, transcript);
}

function deriveResult(
  finalReport: FinalReport | undefined,
  legs: LegRecord[],
  transcript: unknown[],
): TradeAgentResult {
  const placedLegs = legs.filter((leg) => leg.outcome === "placed");
  const rejectedLegs = legs.filter((leg) => leg.outcome === "rejected");

  let status: TradeAgentStatus;
  let error: string | undefined;

  if (placedLegs.length > 0 && rejectedLegs.length === 0) {
    status = "PLACED";
  } else if (placedLegs.length > 0 && rejectedLegs.length > 0) {
    status = "PARTIALLY_PLACED";
    error =
      `Only ${placedLegs.length}/${legs.length} legs placed — review immediately. ` +
      rejectedLegs.map((leg) => leg.error).filter(Boolean).join("; ");
  } else if (finalReport?.status === "skipped") {
    status = "SKIPPED";
    error = finalReport.error;
  } else {
    status = "FAILED";
    error =
      finalReport?.error ??
      (rejectedLegs.map((leg) => leg.error).filter(Boolean).join("; ") || undefined) ??
      "Agent did not place any order and did not report a clear reason (possibly exceeded max tool iterations)";
  }

  return {
    status,
    symbol: finalReport?.symbol ?? legs[0]?.symbol,
    orderSummary: finalReport?.orderSummary ?? summarizeLegs(legs),
    legs,
    transcript,
    error,
  };
}

function summarizeLegs(legs: LegRecord[]): string | undefined {
  if (legs.length === 0) return undefined;
  return legs
    .map((leg) =>
      leg.kind === "option"
        ? `${leg.action} ${leg.quantity}x ${leg.symbol} ${leg.expiry} ${leg.strike}${leg.right?.[0] ?? ""} @ ${leg.limitPrice} (${leg.outcome})`
        : `${leg.action} ${leg.quantity} ${leg.symbol} @ ${leg.limitPrice} (${leg.outcome})`,
    )
    .join("; ");
}
