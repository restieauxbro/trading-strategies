---
name: tiger-brokers
description: Trades and queries Tiger Brokers accounts via tigeropen. Use when the user mentions Tiger Brokers, Tiger OpenAPI, tigeropen, paper or live trading, share limit orders, order preview/place/cancel, account positions, or Tiger option chains.
---

# Tiger Brokers Trading

Use Tiger OpenAPI through the `tigeropen` Python SDK. Read account type from config before trading. Prefer dry-run / explicit confirmation for live orders.

## Safety Rules

- Treat all Tiger config and `.env` values as secrets. Never print private keys, account IDs in full unless needed, or commit `.env`/config files.
- Before placing any order, call `get_managed_accounts()` and confirm the configured account type (`PAPER` vs live/`STANDARD`).
- Live trading requires `tiger_allow_live=true` in `.env` and/or `--allow-live` on the limit-order helper.
- This repo's default order workflow is share limit orders, not market orders or cash-amount orders.
- For live accounts, stop and ask for explicit confirmation of symbol, action, quantity, limit price, time in force, and account type before placing.
- Do not place options orders from this skill unless the user explicitly asks and gives full contract details.

## Environment

Install dependencies:

```bash
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Tiger config can come from either Tiger's standard environment variables or a local `.env` using exported config-file style keys:

```text
tiger_id=...
account=...
license=...
private_key_pk1=...
tiger_allow_live=true
```

The helper scripts map these to `TIGEROPEN_TIGER_ID`, `TIGEROPEN_ACCOUNT`, `TIGEROPEN_LICENSE`, and `TIGEROPEN_PRIVATE_KEY`.

## Share Limit Orders

Use the bundled limit-order helper:

```bash
python .cursor/skills/tiger-brokers/scripts/tiger_limit_order.py \
  --symbol NVDA \
  --action BUY \
  --quantity 100 \
  --limit-price 200 \
  --env-file .env
```

Default behavior:

- Verifies the configured account exists.
- Blocks non-`PAPER` accounts unless `tiger_allow_live=true` or `--allow-live` is set.
- Builds a stock contract for the symbol in USD.
- Previews the order.
- Stops if Tiger returns a preview warning.
- Places a `DAY` limit order.
- Prints order status, filled quantity, remaining quantity, and IDs.

Use `--dry-run` to preview without placing.

## Option Chain Lookup

Use the bundled options helper to inspect option chains when the account has the required quote permissions:

```bash
python .cursor/skills/tiger-brokers/scripts/tiger_options.py weekly NVDA \
  --target-strike 210 \
  --env-file .env
```

The helper selects the nearest expiry within the coming week by default and prints calls/puts around the target strike.

## Useful Read-Only Checks

- `TradeClient.get_managed_accounts()` to confirm paper vs live account type.
- `TradeClient.get_positions()` to inspect holdings.
- `TradeClient.get_orders()` or `get_open_orders()` to inspect order state.
- `QuoteClient.get_stock_delay_briefs(["NVDA"])` for delayed US quote data when real-time quote permission is unavailable.
- `QuoteClient.get_option_expirations(symbols=["NVDA"], market="US")` for available option expiries.
