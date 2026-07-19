import {
  createClientConfig,
  HttpClient,
  TradeClient,
  QuoteClient,
  limitOrder,
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
  const accounts = (await trade.getManagedAccounts()) ?? [];
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

export function findPositionQuantity(positions: Position[], symbol: string) {
  const match = positions.find(
    (position) => String(position.symbol ?? "").toUpperCase() === symbol.toUpperCase(),
  );
  if (!match) return undefined;
  const qty = match.positionQty ?? match.salableQty ?? match.position;
  if (qty === undefined || qty === null) return undefined;
  return Math.abs(Number(qty));
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

  const preview = await options.trade.previewOrder(order);
  if (preview && preview.isPass === false) {
    const message = preview.message ?? "Tiger preview rejected the order";
    throw Object.assign(new Error(message), { stage: "preview", preview });
  }

  const placed = await options.trade.placeOrder(order);
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

  const preview = await options.trade.previewOrder(order);
  if (preview && preview.isPass === false) {
    const message = preview.message ?? "Tiger preview rejected the option order";
    throw Object.assign(new Error(message), { stage: "preview", preview });
  }

  const placed = await options.trade.placeOrder(order);
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
    const briefs = await quote.getRealTimeQuote({ symbols: [upper] });
    const price = briefs[0]?.latestPrice ?? briefs[0]?.close ?? briefs[0]?.preClose;
    if (typeof price === "number") {
      return { symbol: upper, price, source: "realtime" };
    }
  } catch {
    // fall through to delayed quote
  }

  const delayed = await quote.getDelayedQuote({ symbols: [upper] });
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
