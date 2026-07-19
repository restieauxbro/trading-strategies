# TrendSpider → Tiger webhook setup

This app accepts HTTP POSTs from TrendSpider Strategy Bots and places **paper** US share **limit** orders via Tiger Brokers.

## Endpoint

```text
POST https://<your-vercel-domain>/api/webhooks/trendspider?token=<WEBHOOK_TOKEN>
```

- Auth is the shared `WEBHOOK_TOKEN` query param (TrendSpider can customize URL + body, not reliable custom headers).
- Body must be valid JSON.
- TrendSpider times out after ~5 seconds; the route acknowledges quickly and finishes Tiger placement afterward.

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

- `buy` — fetches a live Tiger quote for the symbol and places a limit order sized to a **fixed $100** notional, rounded to the nearest **whole share** (minimum 1 share, even if that overshoots $100 — many symbols/accounts reject fractional-share orders outright). This is a placeholder until an AI portfolio-management skill takes over sizing — see `lib/execute-signal.ts`.
- `sell` — closes the **entire existing Tiger position** for that symbol (there is no partial-size sell from a webhook; `SKIPPED` if no position is open).
- The limit price is the Tiger quote nudged by `WEBHOOK_LIMIT_BUFFER_PCT` (default `0.15`%) — above quote for buys, below quote for sells — to improve fill odds on a limit order. Market orders are not supported.
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
- Preview must pass (`isPass`) before place.

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
