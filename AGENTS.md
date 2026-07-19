# Trading Strategy

Primary product: Next.js app that receives TrendSpider Strategy Bot webhooks and executes Tiger Brokers paper limit orders. See [README.md](README.md) and [docs/trendspider-webhooks.md](docs/trendspider-webhooks.md).

Legacy Cursor agent workflows below still apply under `strategies/`.

@.cursor/rules/trading-agent.mdc

Skills are maintained in `.agents/skills`. `.cursor/skills` and `.claude/skills` are compatibility symlinks to the same canonical skill folders.

## Adding Skills

Write new skills in `.agents/skills/<skill-name>/`. Do not create independent skill copies under `.cursor/skills` or `.claude/skills`; add compatibility symlinks only when needed.

## Running a Strategy

The repo now runs TrendSpider scans through the live UI with `scripts/trendspider_scan.py` using Chrome profile `Tim` and `Default Workspace`, not the stale scheduled-scan JSON URLs.

**All strategies (recommended)** — runs both strategies, assesses market regime, and produces a unified position set:

```
Read strategies/overview/AGENT.md and run the market overview.
```

**Individual strategies:**

```
Read strategies/positive-bx-entry/AGENT.md and run the strategy.
Read strategies/bearish-call-spread/AGENT.md and run the strategy.
Read strategies/negative-but-strengthening-bx-watchlist/AGENT.md and run the strategy.
```

## Executing a Trade (manual or scheduled)

`trading/` is a separate, execution-only agent home — distinct from the research/recommendation workflows above. It loads only the `tiger-brokers` and `tigeropen` skills and follows a literal instruction (no scanning, scoring, or recommending). See `trading/AGENTS.md`. Typical invocation, with `trading/` as the working directory:

```
claude -p "Buy 100 NVDA, DAY limit $200, paper account"
```

Every run — placed, aborted, or failed — is logged to `trading/orders-log.csv`.

## Optional: yfinance Tools

For quotes, moving averages, and option chains without scraping:

```bash
source .venv/bin/activate
python scripts/yfinance_tools.py summary AAPL
python scripts/yfinance_tools.py technicals AAPL --days 260
python scripts/yfinance_tools.py option-expiries AAPL
python scripts/yfinance_tools.py option-calls AAPL --expiration 2026-04-17 --strike-min 150 --strike-max 200
```

Data from yfinance is unofficial — verify anything material in your broker platform.