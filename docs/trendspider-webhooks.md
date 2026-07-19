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

| Field | Required | Notes |
| --- | --- | --- |
| `symbol` or `ticker` | Yes | Use `%bot_symbol%` |
| `action` | Yes | `buy`, `sell`, or `flat` |
| `quantity` | Yes for buy/sell | Also accepts `qty` / `order_contracts` |
| `limit_price` or `price` | Yes | Use `%last_price%` (must resolve to a number) |
| `bot_name` | No | `%bot_name%` |
| `timeframe` | No | `%bot_timeframe%` |
| `bot_status` | No | `%bot_status%` (`in_position` / `not_in_position`) |
| `comment` | No | Free text for logs |

`flat` sells the open Tiger position size for that symbol (long exit). Market orders are not supported.

## Strategy Bot templates

### Long entry

```json
{
  "symbol": "%bot_symbol%",
  "action": "buy",
  "quantity": 10,
  "limit_price": "%last_price%",
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
  "action": "flat",
  "limit_price": "%last_price%",
  "bot_name": "%bot_name%",
  "bot_status": "%bot_status%",
  "comment": "exit"
}
```

### Short entry (sell shares / open short if your account allows)

```json
{
  "symbol": "%bot_symbol%",
  "action": "sell",
  "quantity": 10,
  "limit_price": "%last_price%",
  "bot_name": "%bot_name%",
  "comment": "short-entry"
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
    "quantity": 1,
    "limit_price": 100,
    "bot_name": "manual-test",
    "comment": "curl"
  }'
```

Then check the dashboard event table for `PLACED` / `FAILED` / `PREVIEW_FAILED`.
