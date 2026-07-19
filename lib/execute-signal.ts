import type { Prisma, WebhookEvent } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { ParsedTrendspiderSignal } from "@/lib/webhook-schema";
import {
  assertPaperOrAllowed,
  createTigerClients,
  findPositionQuantity,
  placeShareLimitOrder,
} from "@/lib/tiger";
import { orderGuardrailViolation } from "@/lib/order-guardrails";

function serializePreview(preview: unknown): Prisma.InputJsonValue | undefined {
  if (preview === undefined) return undefined;
  try {
    return JSON.parse(JSON.stringify(preview)) as Prisma.InputJsonValue;
  } catch {
    return { raw: String(preview) };
  }
}

export async function executeWebhookSignal(
  eventId: string,
  signal: ParsedTrendspiderSignal,
): Promise<WebhookEvent> {
  try {
    const { config, trade } = createTigerClients();
    await assertPaperOrAllowed(trade, config.account);

    let action: "BUY" | "SELL";
    let quantity = signal.quantity;

    if (signal.action === "buy") {
      action = "BUY";
    } else if (signal.action === "sell") {
      action = "SELL";
    } else {
      const positions = await trade.getPositions({ market: "US", secType: "STK" });
      quantity = findPositionQuantity(positions, signal.symbol);
      if (!quantity || quantity <= 0) {
        return prisma.webhookEvent.update({
          where: { id: eventId },
          data: {
            status: "SKIPPED",
            error: `No open position found for ${signal.symbol} to flatten`,
          },
        });
      }
      action = "SELL";
    }

    if (!quantity || quantity <= 0 || !signal.limitPrice) {
      return prisma.webhookEvent.update({
        where: { id: eventId },
        data: {
          status: "FAILED",
          error: "Resolved quantity/limit price invalid",
        },
      });
    }

    // Same hard caps enforced on the trade-agent tool paths — the webhook is a
    // second unauthenticated-by-anyone-with-the-token entry point into live orders.
    const violation = orderGuardrailViolation("stock", quantity, signal.limitPrice);
    if (violation) {
      return prisma.webhookEvent.update({
        where: { id: eventId },
        data: { status: "FAILED", error: violation },
      });
    }

    const { preview, placed } = await placeShareLimitOrder({
      trade,
      account: config.account,
      symbol: signal.symbol,
      action,
      quantity,
      limitPrice: signal.limitPrice,
    });

    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        status: "PLACED",
        quantity,
        limitPrice: signal.limitPrice,
        tigerOrderId: placed?.id != null ? String(placed.id) : null,
        tigerOrderId2: placed?.order_id != null ? String(placed.order_id) : null,
        tigerStatus: "submitted",
        previewJson: serializePreview(preview),
        error: null,
      },
    });
  } catch (error) {
    const err = error as Error & { stage?: string; preview?: unknown };
    const failedStatus = err.stage === "preview" ? "PREVIEW_FAILED" : "FAILED";

    return prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        status: failedStatus,
        previewJson: serializePreview(err.preview),
        error: err.message || String(error),
      },
    });
  }
}
