import {
  createClientConfig,
  HttpClient,
  TigerError,
  TradeClient,
  QuoteClient,
  limitOrder,
  type AssetsRequest,
  type ClientConfig,
  type ManagedAccount,
  type OptionChainRow,
  type PlaceOrderResult,
  type Position,
  type PreviewResult,
} from "@tigeropenapi/tigeropen";

export type TigerClients = {
  config: ClientConfig;
  trade: TradeClient;
  quote: QuoteClient;
};

/**
 * Tiger enforces its own 60s-rolling-window rate limits per account (see
 * .agents/skills/tigeropen/references/quickstart.md "请求频率限制" — 120/min
 * for orders+quotes, 60/min for assets/positions, 10/min for low-frequency
 * endpoints), independent of anything on our side. The webhook queue
 * (lib/qstash.ts) already spaces out *new* signals to stay under these, but
 * a single signal's own handful of sequential calls — or the fixed-window
 * boundary — can still occasionally land on a `code=5` (rate_limit)
 * response. Retry those with exponential backoff rather than failing the
 * whole webhook event outright; anything else (bad params, rejected
 * preview, etc.) is not retryable and rethrows immediately.
 */
async function withTigerRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isRateLimited = error instanceof TigerError && error.category === "rate_limit";
      if (!isRateLimited || attempt >= maxRetries) throw error;
      const waitMs = 2 ** attempt * 1000;
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
}

function env(name: string, aliases: string[] = []) {
  for (const key of [name, ...aliases]) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

function normalizePrivateKey(raw: string) {
  return raw.replace(/\\n/g, "\n").trim();
}

export function isLiveTradingEnabled() {
  const value = env("TIGER_ALLOW_LIVE", ["tiger_allow_live"])?.toLowerCase();
  return value === "1" || value === "true" || value === "yes" || value === "on";
}

export function createTigerClients(): TigerClients {
  const tigerId = env("TIGEROPEN_TIGER_ID", ["tiger_id"]);
  const account = env("TIGEROPEN_ACCOUNT", ["account"]);
  const license = env("TIGEROPEN_LICENSE", ["license"]);
  const privateKeyRaw = env("TIGEROPEN_PRIVATE_KEY", [
    "private_key_pk1",
    "private_key_pk8",
    "private_key",
  ]);

  if (!tigerId || !account || !privateKeyRaw) {
    throw new Error(
      "Missing Tiger credentials (need TIGEROPEN_TIGER_ID/tiger_id, TIGEROPEN_ACCOUNT/account, TIGEROPEN_PRIVATE_KEY/private_key_pk1)",
    );
  }

  const config = createClientConfig({
    tigerId,
    account,
    license,
    privateKey: normalizePrivateKey(privateKeyRaw),
    language: "en_US",
  });

  const httpClient = new HttpClient(config);
  return {
    config,
    trade: new TradeClient(httpClient, config.account),
    quote: new QuoteClient(httpClient),
  };
}

export async function assertPaperOrAllowed(trade: TradeClient, account: string) {
  const accounts = (await withTigerRetry(() => trade.getManagedAccounts())) ?? [];
  const configured = accounts.find((item) => String(item.account) === String(account));

  if (!configured) {
    throw new Error(`Configured Tiger account not found in getManagedAccounts(): ${account}`);
  }

  const accountType = String(configured.accountType ?? "").toUpperCase();
  if (accountType !== "PAPER" && !isLiveTradingEnabled()) {
    throw new Error(
      `Account type is ${configured.accountType ?? "unknown"}; set TIGER_ALLOW_LIVE=true to trade non-PAPER accounts`,
    );
  }

  return configured;
}

/**
 * Open positions with the same rate-limit retry as everything else here.
 * Prefer this over calling `trade.getPositions` directly (execute-signal.ts
 * used to) so a transient Tiger `code=5` doesn't fail the whole webhook
 * event when the queue's own throttling still lets one slip through.
 */
export async function getOpenPositions(
  trade: TradeClient,
  params: Parameters<TradeClient["getPositions"]>[0],
): Promise<Position[]> {
  return withTigerRetry(() => trade.getPositions(params));
}

/** Full position row for a symbol (case-insensitive), or undefined if not held. */
export function findPosition(positions: Position[], symbol: string): Position | undefined {
  return positions.find(
    (position) => String(position.symbol ?? "").toUpperCase() === symbol.toUpperCase(),
  );
}

export function findPositionQuantity(positions: Position[], symbol: string) {
  const match = findPosition(positions, symbol);
  if (!match) return undefined;
  const qty = match.positionQty ?? match.salableQty ?? match.position;
  if (qty === undefined || qty === null) return undefined;
  return Math.abs(Number(qty));
}

export type AccountCash = {
  /** Total account value (cash + market value of all positions) — a.k.a. "net liquidation". */
  totalEquity: number;
  /** Cash sitting uninvested and available to spend, before any new order. */
  availableCash: number;
  /** Dollar value currently tied up in open positions. */
  investedValue: number;
  source: "prime" | "standard";
};

/**
 * Account-level cash/equity snapshot used to size new buys and decide whether
 * a trim is needed to fund one (see lib/portfolio.ts). Prefers `getPrimeAssets`
 * (fields live on `segments`, keyed 'S'=securities/'G'=global — pick whichever
 * is present) and falls back to `getAssets` for non-Prime (e.g. plain PAPER/
 * STANDARD) accounts, mirroring the realtime→delayed quote fallback above.
 * `baseCurrency` isn't in the JS SDK's typed `AssetsRequest` but is honored by
 * the server the same way as the untyped fractional-quantity fields on orders
 * — the request serializer is a generic camelCase→snake_case pass-through.
 */
export async function getAccountCash(trade: TradeClient): Promise<AccountCash> {
  try {
    const primeAssets = await withTigerRetry(() =>
      trade.getPrimeAssets({ baseCurrency: "USD" } as AssetsRequest),
    );
    const segments = primeAssets?.segments ?? [];
    const segment =
      segments.find((seg) => seg.category === "S") ??
      segments.find((seg) => seg.category === "G") ??
      segments[0];

    if (segment && typeof segment.netLiquidation === "number") {
      return {
        totalEquity: segment.netLiquidation,
        availableCash: segment.cashAvailableForTrade ?? segment.cashBalance ?? 0,
        investedValue: segment.grossPositionValue ?? 0,
        source: "prime",
      };
    }
  } catch {
    // fall through to the non-Prime assets endpoint
  }

  const assets = await withTigerRetry(() => trade.getAssets());
  const asset = assets?.[0];
  if (!asset || typeof asset.netLiquidation !== "number") {
    throw new Error("No account asset data available from Tiger (getPrimeAssets/getAssets both empty)");
  }
  const cashValue = asset.cashValue ?? 0;
  return {
    totalEquity: asset.netLiquidation,
    availableCash: cashValue || asset.buyingPower || 0,
    investedValue: Math.max(0, asset.netLiquidation - cashValue),
    source: "standard",
  };
}

/**
 * Fractional-share orders need an integer `totalQuantity` plus a
 * `totalQuantityScale` (actual quantity = totalQuantity * 10^-scale) — mirrors
 * the `totalQuantityScale`/`filledQuantityScale` fields already present on the
 * `Order` response model. Not in the JS SDK's typed `OrderRequest`, but
 * confirmed via a live `previewOrder` (isPass: true) that the server honors
 * it — the request serializer is a generic camelCase→snake_case pass-through,
 * not a field whitelist. Requires a Prime-tier account; paper/non-Prime
 * accounts may reject fractional quantities.
 */
function withFractionalQuantity(
  order: ReturnType<typeof limitOrder>,
  quantity: number,
  maxScale = 4,
): ReturnType<typeof limitOrder> {
  if (Number.isInteger(quantity)) return order;
  const scaled = order as unknown as Record<string, unknown>;
  scaled.totalQuantity = Math.round(quantity * 10 ** maxScale);
  scaled.totalQuantityScale = maxScale;
  return order;
}

export async function placeShareLimitOrder(options: {
  trade: TradeClient;
  account: string;
  symbol: string;
  action: "BUY" | "SELL";
  quantity: number;
  limitPrice: number;
}): Promise<{ preview: PreviewResult | undefined; placed: PlaceOrderResult | undefined }> {
  const order = limitOrder(
    options.account,
    options.symbol.toUpperCase(),
    "STK",
    options.action,
    options.quantity,
    options.limitPrice,
  );
  order.market = "US";
  order.currency = "USD";
  order.timeInForce = "DAY";
  withFractionalQuantity(order, options.quantity);

  const preview = await withTigerRetry(() => options.trade.previewOrder(order));
  if (preview && preview.isPass === false) {
    const message = preview.message ?? "Tiger preview rejected the order";
    throw Object.assign(new Error(message), { stage: "preview", preview });
  }

  const placed = await withTigerRetry(() => options.trade.placeOrder(order));
  return { preview, placed };
}

export async function placeOptionLegOrder(options: {
  trade: TradeClient;
  account: string;
  symbol: string;
  expiry: string;
  strike: number | string;
  right: "CALL" | "PUT";
  action: "BUY" | "SELL";
  quantity: number;
  limitPrice: number;
}): Promise<{ preview: PreviewResult | undefined; placed: PlaceOrderResult | undefined }> {
  const order = limitOrder(
    options.account,
    options.symbol.toUpperCase(),
    "OPT",
    options.action,
    options.quantity,
    options.limitPrice,
  );
  order.market = "US";
  order.currency = "USD";
  order.timeInForce = "DAY";
  order.expiry = options.expiry;
  order.strike = String(options.strike);
  order.right = options.right;

  const preview = await withTigerRetry(() => options.trade.previewOrder(order));
  if (preview && preview.isPass === false) {
    const message = preview.message ?? "Tiger preview rejected the option order";
    throw Object.assign(new Error(message), { stage: "preview", preview });
  }

  const placed = await withTigerRetry(() => options.trade.placeOrder(order));
  return { preview, placed };
}

/**
 * Approximate current price for a symbol, preferring real-time quotes and
 * falling back to delayed quotes when real-time quote permission is
 * unavailable on the configured dev account (common on non-quote-subscribed
 * accounts). Field name varies by endpoint: real-time uses `latestPrice`,
 * delayed quotes have been observed to only populate `close`/`preClose`.
 */
export async function getStockQuote(
  quote: QuoteClient,
  symbol: string,
): Promise<{ symbol: string; price: number; source: "realtime" | "delayed" }> {
  const upper = symbol.toUpperCase();

  try {
    const briefs = await withTigerRetry(() => quote.getRealTimeQuote({ symbols: [upper] }));
    const price = briefs[0]?.latestPrice ?? briefs[0]?.close ?? briefs[0]?.preClose;
    if (typeof price === "number") {
      return { symbol: upper, price, source: "realtime" };
    }
  } catch {
    // fall through to delayed quote
  }

  const delayed = await withTigerRetry(() => quote.getDelayedQuote({ symbols: [upper] }));
  const price = delayed[0]?.latestPrice ?? delayed[0]?.close ?? delayed[0]?.preClose;
  if (typeof price !== "number") {
    throw new Error(`No quote price available for ${upper}`);
  }
  return { symbol: upper, price, source: "delayed" };
}

/** Available option expiries (YYYY-MM-DD) for a US symbol, ascending. */
export async function getOptionExpirations(quote: QuoteClient, symbol: string): Promise<string[]> {
  const expirations = await quote.getOptionExpiration([symbol.toUpperCase()], "US");
  const dates = expirations.flatMap((entry) => entry.dates ?? []);
  return [...new Set(dates)].sort();
}

/**
 * Option chain rows for a symbol/expiry. Requires quote permissions the
 * configured dev account may not have — returns `undefined` (rather than
 * throwing) on failure so callers can fall back to an underlying-price-based
 * ATM strike estimate instead of a real chain.
 */
export async function getOptionChainSafe(
  quote: QuoteClient,
  symbol: string,
  expiry: string,
): Promise<OptionChainRow[] | undefined> {
  try {
    const chain = await quote.getOptionChain([[symbol.toUpperCase(), expiry]]);
    return chain[0]?.items;
  } catch {
    return undefined;
  }
}

export type { ManagedAccount, Position, PreviewResult, PlaceOrderResult, OptionChainRow };
