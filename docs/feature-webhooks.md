← [Requirements overview](./requirements.md)

# Feature: Webhook → Tiger orders

Operational setup (TrendSpider bot templates, TradingView Pine Script template, curl smoke test) lives in [webhooks.md](./webhooks.md); this doc covers behaviour and implementation.

## Behaviour

1. **Endpoint:** `POST /api/webhooks/signal?token=<WEBHOOK_TOKEN>` (canonical; `/api/webhooks/trendspider` is a back-compat alias, identical handler, for TrendSpider bots already configured with that URL).
2. **Auth:** Query param `token` (preferred; most alerting platforms cannot set reliable custom headers). Header `x-webhook-token` also accepted.
3. **Body:** JSON matching the Zod schema in `lib/webhook-schema.ts` (see [webhooks.md](./webhooks.md)).
4. **Ack fast:** Persist a `WebhookEvent` with status `PENDING`, return `{ ok, accepted, eventId, … }` immediately. Accepts any number of simultaneous POSTs, from any source — there is no rate limit on the endpoint itself.
5. **Queue + throttle:** rather than running Tiger placement inline, the event is enqueued to QStash (`lib/qstash.ts`'s `scheduleWebhookSignalExecution`, `flowControl: { parallelism: 1, rate: WEBHOOK_QUEUE_RATE_PER_MINUTE }`) so many simultaneous signals (e.g. a whole watchlist rotating at market close) drain **one-at-a-time** at a controlled rate instead of executing concurrently, regardless of which source they came from. This avoids both blowing through Tiger's own account-level API rate limits (60s rolling window; see `.agents/skills/tigeropen/references/quickstart.md`) and racing on the shared account snapshot the portfolio manager reads (see below). QStash delivers to `POST /api/webhooks/signal/execute` (signature-verified), which atomically claims the row (`PENDING` → `PROCESSING`) before running it. **Falls back to firing immediately/concurrently via `after()`** when `QSTASH_TOKEN`/`PUBLIC_BASE_URL` aren't configured — fine for manual testing, not for a real burst. See [webhooks.md](./webhooks.md) "Concurrency / rate limiting".
6. **Sources:** currently TrendSpider Strategy Bots and a TradingView Pine `alert()` template (`pinescript/ema-cross-webhook-alert.pine`) both send the same JSON shape to the same handler; an optional `source` field on the payload labels the `WebhookEvent` row for the dashboard (defaults to whichever route the signal hit if omitted).
7. **Actions:** every source sends only `symbol` + `action` — quantity and price are resolved server-side from a live Tiger quote, not read from the payload.
   - `buy` — sized by the portfolio manager (even-split + trim-to-fund, see below) rather than a fixed dollar amount; skipped if a position is already held in that symbol.
   - `sell` — resolves the full open position quantity for the symbol and sells it to close (flatten); `SKIPPED` if no position
   - Limit price = Tiger quote ± `WEBHOOK_LIMIT_BUFFER_PCT` (default `0.15`%; above quote for buys, below for sells) to improve fill odds
8. **Order type:** US stock (`STK` / `USD`) DAY **limit** only — no market orders in v1
9. **Safety:** Non-`PAPER` Tiger accounts blocked unless `TIGER_ALLOW_LIVE=true`; preview must pass before place; same `MAX_ORDER_SPEND_USD`/`MAX_SHARES` guardrails as the trade agent, enforced on every trim order as well as the buy itself. Individual Tiger calls (`lib/tiger.ts`'s `withTigerRetry`) retry with exponential backoff on a `code=5` rate-limit response, as a second line of defense on top of the queue throttling.
10. **Statuses:** `PENDING` → `PROCESSING` → `PLACED` | `PARTIALLY_PLACED` | `PREVIEW_FAILED` | `SKIPPED` | `FAILED`. `PROCESSING` means claimed off the queue and actively running (should be transient). `PARTIALLY_PLACED` means one or more positions were trimmed to raise cash but the new buy itself then failed/was rejected — check `error` and `trimsJson` on the event.

## Portfolio management (sizing + trim-to-fund)

Replaces the earlier fixed-$100-per-buy placeholder. Implemented in [lib/portfolio.ts](../lib/portfolio.ts) (pure sizing/ranking/trim-plan logic) and wired into the `buy` branch of [lib/execute-signal.ts](../lib/execute-signal.ts).

- **Sizing — even split:** each new buy targets `totalEquity / PORTFOLIO_TARGET_POSITIONS` (an even split of total account equity — cash plus the market value of everything held — across a target number of concurrent positions). This scales automatically as the account grows or shrinks, rather than staying pegged to a fixed dollar figure.
- **Skip if already held:** a `buy` signal for a symbol with an existing open position is `SKIPPED` (`"Already holding a position in <symbol> — portfolio manager does not average up via webhook signals"`) — no top-up/averaging-up via the webhook path in v1.
- **Funding a shortfall — trim to fund:** if available cash can't cover the target size, the worst-performing open positions (ranked by unrealized P&L %, most negative first — purely mechanical from live Tiger data, no LLM step and no dependency on `strategies/*/watchlist.csv` scores) are partially sold down to raise the difference, before the new buy is placed.
- **Trim cap is a fixed dollar amount, not a % of the position being trimmed:** the cap per position is `totalEquity * PORTFOLIO_MAX_TRIM_PCT_OF_EQUITY / 100` — the same dollar figure regardless of that position's own size. With the defaults (`PORTFOLIO_TARGET_POSITIONS=10`, trim cap defaulting to half a default position's worth), a position still sitting at its target size can lose at most half its value to a single trim; a position that's already fallen well below the cap in market value can be fully liquidated by it. Full closes are otherwise reserved for real exit (`sell`) signals.
- **Reactive only:** all of this runs inside the `buy` webhook path — there is no separate scheduled job that trims or tops up positions purely because invested % has drifted below the `PORTFOLIO_MIN_INVESTED_PCT` target with no new signal. It self-corrects the next time a buy signal arrives (see the invested-% dashboard indicator for visibility in the meantime).
- **Provisional fill assumption:** trim proceeds used to size the following buy assume each trim sell fills at its own limit price — no fill polling/reconciliation, same caveat already documented for `lib/pnl.ts`'s realized-P&L TODO. If actual fills differ, the buy may be somewhat over- or under-sized relative to the true post-trim cash position.
- **Audit trail:** each `buy` `WebhookEvent` stores `targetPositionSizeUsd`, `investedPctBefore`/`investedPctAfter`, and `trimsJson` (array of `{symbol, quantity, limitPrice, tigerOrderId, pnlPct}` for every position trimmed to fund it) — visible in the dashboard's webhook events table.
- **Env knobs** (see `.env.example`): `PORTFOLIO_TARGET_POSITIONS` (default `10`), `PORTFOLIO_MAX_TRIM_PCT_OF_EQUITY` (default `50 / PORTFOLIO_TARGET_POSITIONS`, i.e. half a default position, unless overridden), `PORTFOLIO_MIN_TRIM_USD` (default `20`, skip dust trims), `PORTFOLIO_MAX_POSITIONS_TO_TRIM` (default `5`, safety cap on how many positions one buy signal can touch), `PORTFOLIO_MIN_INVESTED_PCT` (default `80`, dashboard/reporting target only).

## Payload fields (required vs optional)

| Field | Required | Notes |
| --- | --- | --- |
| `symbol` or `ticker` | Yes | Uppercased |
| `action` | Yes | `buy` \| `sell` |
| `source` | No | Labels the `WebhookEvent` row (e.g. `"tradingview"`); defaults to whichever route received it |
| `bot_name`, `timeframe`, `bot_status`, `comment` | No | Stored for dashboard/logs |

Any `quantity`/`qty`/`order_contracts`/`limit_price`/`price` fields sent in the payload are accepted (passthrough) but ignored — sizing and pricing always come from `lib/execute-signal.ts` + `lib/portfolio.ts` + a live Tiger quote.

## Implementation touchpoints

- Routes: `app/api/webhooks/signal/route.ts` (canonical, accepts + enqueues), `app/api/webhooks/trendspider/route.ts` (back-compat alias, same handler), `app/api/webhooks/signal/execute/route.ts` (QStash-invoked worker, one-at-a-time)
- Shared ingest logic: `lib/webhook-ingest.ts`
- Queue/throttle: `lib/qstash.ts`'s `scheduleWebhookSignalExecution`
- Schema: `lib/webhook-schema.ts`
- Execution: `lib/execute-signal.ts`
- Pine Script template: `pinescript/ema-cross-webhook-alert.pine`
- Portfolio sizing/trim logic: `lib/portfolio.ts`
- Broker: `lib/tiger.ts` (`getAccountCash`, `findPosition`, `findPositionQuantity`, `placeShareLimitOrder`, `getOpenPositions`, `withTigerRetry`)
- Persistence: `prisma/schema.prisma` → `WebhookEvent`
- Dashboard: `app/api/account/route.ts` (invested % + cash), `components/dashboard.tsx` (invested % indicator, per-buy trims column)

When changing webhook behaviour, update this file and [webhooks.md](./webhooks.md) together.
