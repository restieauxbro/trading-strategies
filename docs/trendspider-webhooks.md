# TrendSpider → Tiger webhook setup

This app accepts HTTP POSTs from TrendSpider Strategy Bots and places **paper** US share **limit** orders via Tiger Brokers.

## Endpoint

```text
POST https://<your-vercel-domain>/api/webhooks/trendspider?token=<WEBHOOK_TOKEN>
```

- Auth is the shared `WEBHOOK_TOKEN` query param (TrendSpider can customize URL + body, not reliable custom headers).
- Body must be valid JSON.
- TrendSpider times out after ~5 seconds; the route acknowledges quickly (always — it accepts an effectively unlimited number of simultaneous POSTs, e.g. a whole watchlist rotating at market close) and finishes Tiger placement afterward, off the request path.

## Concurrency / rate limiting

There's no limit on how many signals the endpoint itself can accept at once. But Tiger's own account-level API has a hard 60-second rolling window (120/min for orders + quotes, 60/min for assets/positions — see `.agents/skills/tigeropen/references/quickstart.md`), and the portfolio manager (`lib/portfolio.ts`) reads a shared account snapshot (cash, positions) that two signals executing at the same instant would race on — e.g. both trimming the same weakest position, or collectively overspending past total equity.

To avoid both problems, every accepted signal is queued through **Upstash QStash** (`lib/qstash.ts`) with `flowControl: { parallelism: 1, rate: WEBHOOK_QUEUE_RATE_PER_MINUTE }` — signals execute strictly one-at-a-time, draining at a controlled rate (default 20/min) instead of all firing concurrently. Each queued signal is delivered to `POST /api/webhooks/trendspider/execute` (QStash-signature-verified), which atomically claims the `WebhookEvent` row (`PENDING` → `PROCESSING`) before running it, so a QStash retry/duplicate delivery can't double-execute the same signal.

This requires `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, and `PUBLIC_BASE_URL` to be set (see `.env.example`). **Without them**, the webhook falls back to firing signals immediately/concurrently via `after()` — fine for a single manual curl test, not safe for a real multi-symbol burst.

Individual Tiger calls also retry with exponential backoff on a `code=5` (rate-limit) response (`lib/tiger.ts`'s `withTigerRetry`) as a second line of defense, e.g. if a signal happens to land right on a rolling-window boundary.

## Canonical JSON schema

TrendSpider sends only the symbol and direction — **quantity and price are resolved server-side**, not read from the payload.

| Field | Required | Notes |
| --- | --- | --- |
| `symbol` or `ticker` | Yes | Use `%bot_symbol%` |
| `action` | Yes | `buy` or `sell` |
| `bot_name` | No | `%bot_name%` |
| `timeframe` | No | `%bot_timeframe%` |
| `bot_status` | No | `%bot_status%` (`in_position` / `not_in_position`) |
| `comment` | No | Free text for logs |

- `buy` — sized by the portfolio manager (`lib/portfolio.ts`), not a fixed dollar amount:
  - **Skipped** if a position is already held in that symbol (no averaging up via webhooks in v1).
  - Otherwise targets an **even split of total account equity**: `totalEquity / PORTFOLIO_TARGET_POSITIONS` (default 10 concurrent positions), rounded to the nearest **whole share** (minimum 1 share — many symbols/accounts reject fractional-share orders outright).
  - If available cash can't cover that target size, the worst-performing open position(s) (ranked by unrealized P&L %, most negative first) are **partially** sold down first to raise the shortfall, each capped at a fixed dollar amount (`totalEquity * PORTFOLIO_MAX_TRIM_PCT_OF_EQUITY / 100` — the same dollar figure regardless of the trimmed position's own size, so an at-target position loses at most half its value by default, while an already-shrunken one can be fully liquidated). See `docs/feature-webhooks.md` → "Portfolio management" for the full writeup and env knobs.
  - Every trim is guardrailed the same as any order (`MAX_ORDER_SPEND_USD`/`MAX_SHARES`); a trim that gets blocked or rejected is skipped and the buy is simply sized down to whatever cash ends up available instead of failing outright.
- `sell` — closes the **entire existing Tiger position** for that symbol (there is no partial-size sell from a webhook exit signal; `SKIPPED` if no position is open). Cash recovered from an exit just sits until the next `buy` signal — there's no separate scheduled top-up job.
- The limit price is the Tiger quote nudged by `WEBHOOK_LIMIT_BUFFER_PCT` (default `0.15`%) — above quote for buys, below quote for sells (including trims) — to improve fill odds on a limit order. Market orders are not supported.
- Any `quantity`/`limit_price`/`price`/`qty` fields in the payload are ignored if present.

## Strategy Bot templates

### Long entry

```json
{
  "symbol": "%bot_symbol%",
  "action": "buy",
  "bot_name": "%bot_name%",
  "timeframe": "%bot_timeframe%",
  "bot_status": "%bot_status%",
  "comment": "entry"
}
```

### Long exit

```json
{
  "symbol": "%bot_symbol%",
  "action": "sell",
  "bot_name": "%bot_name%",
  "bot_status": "%bot_status%",
  "comment": "exit"
}
```

Paste the entry JSON into the bot **Entry** webhook body and the exit JSON into the **Exit** webhook body. Point both URLs at the endpoint above (same token).

## Supported TrendSpider placeholders

Strategy bots:

- `%bot_name%`
- `%bot_symbol%`
- `%bot_timeframe%`
- `%bot_status%`
- `%last_price%`

Standard alerts (optional alternate source) use `%alert_symbol%`, `%alert_name%`, `%last_price%`, etc. Prefer Strategy Bots for separate entry/exit bodies.

## Safety

- Default: only Tiger accounts with type `PAPER` can trade.
- Live trading requires `TIGER_ALLOW_LIVE=true`.
- Orders are DAY limit orders on US stocks (`STK` / `USD`).
- Preview must pass (`isPass`) before place — enforced on the buy order and every trim order it may trigger.
- `MAX_ORDER_SPEND_USD`/`MAX_SHARES` apply per order, including trims.
- A `buy` event with status `PARTIALLY_PLACED` means one or more other positions were trimmed to fund it but the buy itself then failed — check `error` and the dashboard's "Trimmed to fund" column (`trimsJson`) before assuming nothing happened.

## Smoke test

```bash
curl -X POST "http://localhost:3000/api/webhooks/trendspider?token=$WEBHOOK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "AAPL",
    "action": "buy",
    "bot_name": "manual-test",
    "comment": "curl"
  }'
```

Then check the dashboard event table for `PLACED` / `FAILED` / `PREVIEW_FAILED`.
