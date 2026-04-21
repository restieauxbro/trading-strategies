# Trading Strategy — Codex Instructions

@.cursor/rules/trading-agent.mdc

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
