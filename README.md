# Trading Strategy — Agent-Driven Analysis

An AI-powered trading workflow for Cursor. A Cursor agent runs a live TrendSpider Market Scanner from the UI, researches each ticker with real-time web data, scores and ranks setups, logs picks to a CSV, and overwrites a markdown report — all from a single prompt.

---

## Quick Start (Cursor Cloud Agents)

### Prerequisites

- [Cursor](https://cursor.com) with a Pro or Business plan (required for background agents and cloud runs)
- A [TrendSpider](https://trendspider.com) account with saved Market Scanners in `Default Workspace`
- `browser-use` installed and able to open Chrome profile `Tim`

### Optional: Python + yfinance (quotes, MAs, option chains)

For local runs, agents can call **`scripts/yfinance_tools.py`** instead of scraping Yahoo by hand. [yfinance](https://github.com/ranaroussi/yfinance) is **unofficial**; data can lag, omit fields, or rate-limit — verify anything material in your broker platform.

```bash
cd trading-strategy
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

python scripts/yfinance_tools.py summary ORCL
python scripts/yfinance_tools.py technicals ORCL --days 260
python scripts/yfinance_tools.py option-expiries ORCL
python scripts/yfinance_tools.py option-calls ORCL --expiration 2026-04-17 --strike-min 160 --strike-max 200 --max-rows 30
```

Use **`.venv/bin/python`** in commands if you skip activating the venv.

### 1. Clone the repo

```bash
git clone <your-fork-url>
cd trading-strategy
```

Open the folder in Cursor: **File → Open Folder**.

### 2. Configure your saved TrendSpider scanners

Edit each strategy `config.md` so the `Saved scanner` entry matches the scanner name visible in TrendSpider’s Market Scanner list inside `Default Workspace`.

The repo now uses:

```bash
python3 scripts/trendspider_scan.py --scanner-name "Strong upward momentum"
python3 scripts/trendspider_scan.py --scanner-name "Bearish Case Market Scanner"
python3 scripts/trendspider_scan.py --scanner-name "Negative but strengthening BX"
```

This opens TrendSpider with `browser-use`, selects `Default Workspace`, runs the saved scanner from the UI, and returns fresh JSON with `timestamp` and `symbolsFound`.

### 3. Run the agent manually

In Cursor, open the chat panel and type:

```
Run the positive-bx-entry strategy. Follow strategies/positive-bx-entry/AGENT.md
```

The agent will work through all 8 steps autonomously — running the scanner, researching tickers, scoring, logging picks, and writing the report. Expect it to take 3–5 minutes.

### 4. Schedule recurring runs (Cursor Cloud Agents)

> Cursor Cloud Agents let you run an agent on a cron schedule without having Cursor open.

1. Go to **Cursor Settings → Cloud Agents → New Agent**
2. Set the prompt to:
  ```
   Run the positive-bx-entry strategy. Follow strategies/positive-bx-entry/AGENT.md
  ```
3. Set the schedule (e.g. every weekday at 08:00 ET after market open)
4. Point it at this repository
5. The agent will commit `trades-log.csv` and `report.md` updates on each run

---

## How It Works

Bullish (**positive-bx-entry**) and bearish (**Bearish Selector**, path: `bearish-call-spread`) workflows run the TrendSpider scan in the browser, research tickers, open **TradingView** (`chart/z25AhAlV` with plain ticker) for visuals per `.cursor/skills/indicators/SKILL.md`, score, present suggested trades, then append only **user-confirmed opened trades** to each strategy’s `trades-log.csv` before overwriting `report.md`. See each strategy’s `AGENT.md` for step order (including watchlist handling and the confirmation gate).

The repo also includes a narrative-first watchlist workflow: **Negative but Strengthening BX Watchlist** (`negative-but-strengthening-bx-watchlist`). It runs the TrendSpider scan, then ranks names by sector backdrop, company narrative, and what would need to strengthen next before entry. It does **not** require TradingView chart confirmation unless you explicitly want to add it later.

The shared instrument catalog lives at [strategies/instruments.md](/Users/tim/Documents/code/trading-strategies/strategies/instruments.md). The current preferred structure is a **paired debit spread**: a tight ATM directional vertical plus a half-size opposite vertical as a wrong-way tail hedge.

| Step (typical) | What happens |
| ---- | ---------------------------------------------------------------------------------------- |
| 1    | Run the live TrendSpider Market Scanner UI → ticker list + timestamp |
| 2    | 14-day outcome pass on this strategy’s `trades-log.csv` |
| 3    | Market context (S&P 500, VIX, trend) |
| 4    | Research each ticker; **TradingView** visual check on a shortlist |
| 5    | Score, select picks, optional spreads |
| 6    | Append CSV rows; overwrite `report.md`; session summary |


All research is done live via web search — the agent uses Yahoo Finance, Finviz, MarketWatch, and similar sources. No API keys required.

---

## Repo Structure

```
trading-strategy/
│
├── .cursor/
│   ├── rules/
│   │   └── trading-agent.mdc              ← always-on conventions for all agents
│   └── skills/
│       ├── analyse-tickers/
│       │   └── SKILL.md                   ← research checklist, scoring, output format
│       ├── log-trade-csv/
│       │   └── SKILL.md                   ← CSV schema and writing rules
│       ├── track-outcomes/
│       │   └── SKILL.md                   ← 14-day outcome lookback logic
│       └── indicators/
│           └── SKILL.md                   ← TradingView: fair value, weekly BX, daily B-Xtrender
│
├── strategies/
│   ├── positive-bx-entry/
│   ├── bearish-call-spread/
│   ├── overview/
│   └── archived/
│       └── momentum-pullback/
│
├── scripts/
│   ├── trendspider_scan.py              ← live TrendSpider scanner runner via browser-use + profile Tim
│   └── yfinance_tools.py                ← optional CLI: summary / technicals / option chains
├── requirements.txt                     ← optional: yfinance (see README)
└── README.md
```

### Key files explained


| File                | Purpose                                                                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENT.md`          | Step-by-step workflow the agent follows for a strategy. Load this in your prompt.                                                                                          |
| `config.md`         | Saved scanner name, universe, trading style, entry criteria, and the full scoring system (points table, deductions, minimum threshold). Customise this to change strategy behaviour. |
| `trades-log.csv`    | Append-only trade log of **user-confirmed opened trades**. The agent adds new rows only after user confirmation, then fills in outcome columns 14 days later. Never manually edit this file. |
| `report.md`         | Full markdown report overwritten on every run. Human-readable summary of market context, top picks, open trades, and performance stats.                                    |
| `SKILL.md` files    | Reusable logic loaded by every strategy agent. Defines how to research tickers, how to write to the CSV, and how to score outcomes.                                        |
| `trading-agent.mdc` | Always-on Cursor rule enforcing repo-wide conventions (e.g. never overwrite CSV rows, never fabricate data).                                                               |


---

## Strategies


| Strategy | Universe | Style | Scan source |
| -------- | -------- | ----- | ----------- |
| [Positive BX entry](strategies/positive-bx-entry/AGENT.md) | S&P 500 | Position (weeks–months) | TrendSpider: **Strong upward momentum** |
| [Bearish Selector](strategies/bearish-call-spread/AGENT.md) | Large cap (see config) | Monthly bearish options structures | TrendSpider: **Bearish Case Market Scanner** |
| [Negative but Strengthening BX Watchlist](strategies/negative-but-strengthening-bx-watchlist/AGENT.md) | TrendSpider saved scan universe | Watchlist / early bullish stalking | TrendSpider: **Negative but strengthening BX** |
| [Market overview](strategies/overview/AGENT.md) | — | Combined book | Runs both strategies above |
| [Momentum after pullback (archived)](strategies/archived/momentum-pullback/AGENT.md) | — | — | Historical only |


---

## Adding a New Strategy

1. Create `strategies/<name>/config.md` — saved scanner name, universe, trading style, entry filters, and a scoring system (copy from `strategies/positive-bx-entry/config.md` and adapt)
2. Create `strategies/<name>/AGENT.md` — load the required skills + `indicators` if using TradingView, define workflow (copy from an existing `AGENT.md` and adapt)
3. Create the strategy CSV file — use `trades-log.csv` for trade-entry strategies or define a strategy-local `watchlist.csv` schema for watchlist-only workflows
4. Create `strategies/<name>/report.md` — any placeholder text; overwritten on first run
5. Add a row to the Strategies table above
6. Run it with: `Run the <name> strategy. Follow strategies/<name>/AGENT.md`

---

## Skills Reference

Reusable logic: every strategy loads **`analyse-tickers`**. Trade-entry strategies also load **`log-trade-csv`** and **`track-outcomes`**. TradingView chart steps also load **`indicators`**.


| Skill             | Path                                      | What it defines                                                                              |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `analyse-tickers` | `.cursor/skills/analyse-tickers/SKILL.md` | Per-ticker research checklist, market context check, scoring instructions, output format     |
| `log-trade-csv`   | `.cursor/skills/log-trade-csv/SKILL.md`   | CSV column schema, field formats, writing rules, example rows                                |
| `track-outcomes`  | `.cursor/skills/track-outcomes/SKILL.md`  | How to find due rows, look up prices, classify HIT_T1/HIT_T2/STOPPED_OUT/EXPIRED, write back |
| `indicators`      | `.cursor/skills/indicators/SKILL.md`      | TradingView layout `z25AhAlV`: fair value bands, weekly BX, daily B-Xtrender, screenshots   |


---

## Outcome Tracking

Picks are automatically reviewed ~14 days after they are logged. On each run the agent:

1. Finds rows in `trades-log.csv` where `outcome_date` is empty and `date` is 13–16 days ago
2. Looks up the current price and 14-day high/low for each ticker
3. Classifies the result: `HIT_T2` → `HIT_T1` → `STOPPED_OUT` → `EXPIRED` (priority order)
4. Writes `outcome_date`, `outcome_price`, `outcome_pct`, and `outcome_result` back to the CSV

The `report.md` Performance Summary section is built from these completed rows.

---

## Notes

- **No data fabrication** — if the agent cannot find a data point, it notes the gap and does not award points for it
- **Live scanner runs** — the repo uses `scripts/trendspider_scan.py` instead of TrendSpider scheduled-scan JSON URLs because the URL data can be stale
- **Earnings filter** — any ticker with earnings within 3 weeks is penalised −20 pts or excluded
- **One log per strategy** — each strategy writes only to its own `trades-log.csv`
- **Confirmation gate** — suggested trades do not enter `trades-log.csv` until the user confirms they were actually opened
- **Append-only CSV** — existing rows are never modified except when filling in outcome columns
