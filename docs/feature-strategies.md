← [Requirements overview](./requirements.md)

# Feature: Strategies folder (agent / subagent workspace)

`strategies/` holds **Cursor agent strategy workflows** — scan configs, agent steps, trade/watchlist CSVs, and reports. These are the intended workspace for **future subagents** that research or propose trades independently of the live webhook executor.

## Layout convention

```text
strategies/
├── overview/                 ← orchestrator across active strategies
├── <strategy-name>/
│   ├── AGENT.md              ← workflow steps for that strategy’s agent
│   ├── config.md             ← universe, style, entry filters, scan notes
│   ├── trades-log.csv        ← or watchlist.csv for watchlist-only strategies
│   ├── report.md             ← overwritten each run
│   └── assets/               ← optional screenshots / artifacts
├── instruments.md            ← shared instrument notes (if present)
└── archived/                 ← retired strategies
```

## Active strategy examples

- `strategies/overview` — market regime + unified position set
- `strategies/positive-bx-entry`
- `strategies/bearish-call-spread`
- `strategies/negative-but-strengthening-bx-watchlist`
- `strategies/momentum-pullback`

## Rules for agents using `strategies/`

- Load skills from `.agents/skills/` (via `.cursor/skills` symlinks) as required by each `AGENT.md` — typically `analyse-tickers`, and for trade-entry strategies also `log-trade-csv` / `track-outcomes`; TradingView confirmation uses `indicators` + browser-use profile `Tim`
- Each strategy writes **only** to its own CSV; never overwrite existing rows — append only
- Do not fabricate market data; note gaps and downrank
- Check upcoming earnings before recommending entry

## Relationship to the web app

| Concern | Owner |
| --- | --- |
| Live TrendSpider bot → Tiger paper orders | Next.js webhook + `lib/execute-signal` |
| Research scans, ranking, CSV logs, reports | `strategies/<name>/` agents (and future subagents) |
| Literal, already-decided order execution (local CLI, no research) | `trading/` agent (see [feature-trading-cli.md](./feature-trading-cli.md)) |
| Shared Tiger helpers | `.agents/skills/tiger-brokers`, `lib/tiger.ts`, Python scripts |

Subagents scoped to a strategy should treat that strategy’s folder as their working directory and follow its `AGENT.md` + `config.md`. They should not place live orders unless explicitly instructed to use the Tiger skills/app path.
