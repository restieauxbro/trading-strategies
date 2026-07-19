import "server-only";

/**
 * Hard spend/size caps enforced around every order placement path (trade agent
 * tools and the TrendSpider webhook), independent of what the caller requests.
 */
export function orderGuardrailViolation(
  kind: "stock" | "option",
  quantity: number,
  limitPrice: number,
): string | undefined {
  const multiplier = kind === "option" ? 100 : 1;
  const estimatedSpend = quantity * limitPrice * multiplier;

  const maxSpend = Number(process.env.MAX_ORDER_SPEND_USD);
  if (Number.isFinite(maxSpend) && maxSpend > 0 && estimatedSpend > maxSpend) {
    return `Estimated spend $${estimatedSpend.toFixed(2)} exceeds MAX_ORDER_SPEND_USD ($${maxSpend})`;
  }

  if (kind === "option") {
    const maxContracts = Number(process.env.MAX_CONTRACTS);
    if (Number.isFinite(maxContracts) && maxContracts > 0 && quantity > maxContracts) {
      return `Quantity ${quantity} exceeds MAX_CONTRACTS (${maxContracts})`;
    }
  } else {
    const maxShares = Number(process.env.MAX_SHARES);
    if (Number.isFinite(maxShares) && maxShares > 0 && quantity > maxShares) {
      return `Quantity ${quantity} exceeds MAX_SHARES (${maxShares})`;
    }
  }
  return undefined;
}
