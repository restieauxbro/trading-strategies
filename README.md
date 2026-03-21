# Trading Strategy — Agent-Driven Analysis

An AI-powered trading workflow for Cursor. A Cursor agent fetches a live market scan, researches each ticker with real-time web data, scores and ranks setups, logs picks to a CSV, and overwrites a markdown report — all from a single prompt.

---

## Quick Start (Cursor Cloud Agents)

### Prerequisites

- [Cursor](https://cursor.com) with a Pro or Business plan (required for background agents and cloud runs)
- A [TrendSpider](https://trendspider.com) account with a scheduled scan — or swap in any scan URL that returns JSON

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

### 2. Point the scan at your TrendSpider scan (or any JSON scan URL)

Edit `strategies/momentum-pullback/config.md` and replace the `Scan URL` with your own TrendSpider scheduled scan URL. The URL must return JSON in this shape:

```json
{
  "timestamp": 1234567890000,
  "symbolsFound": ["AAPL", "MSFT", "..."]
}
```

If you want to use a different scan source, update the URL and adjust the extraction step in `strategies/momentum-pullback/AGENT.md` accordingly.

### 3. Run the agent manually

In Cursor, open the chat panel and type:

```
Run the momentum-pullback strategy. Follow strategies/momentum-pullback/AGENT.md
```

The agent will work through all 8 steps autonomously — fetching the scan, researching tickers, scoring, logging picks, and writing the report. Expect it to take 3–5 minutes.

### 4. Schedule recurring runs (Cursor Cloud Agents)

> Cursor Cloud Agents let you run an agent on a cron schedule without having Cursor open.

1. Go to **Cursor Settings → Cloud Agents → New Agent**
2. Set the prompt to:
  ```
   Run the momentum-pullback strategy. Follow strategies/momentum-pullback/AGENT.md
  ```
3. Set the schedule (e.g. every weekday at 08:00 ET after market open)
4. Point it at this repository
5. The agent will commit `trades-log.csv` and `report.md` updates on each run

---

## How It Works

Each agent run follows 8 steps defined in `strategies/momentum-pullback/AGENT.md`:


| Step | What happens                                                                             |
| ---- | ---------------------------------------------------------------------------------------- |
| 1    | Fetch the live scan JSON → extract ticker list and timestamp                             |
| 2    | Check `trades-log.csv` for picks ~14 days old → look up current prices → record outcomes |
| 3    | Market context check (S&P 500 vs 200-day MA, VIX level, overall trend)                   |
| 4    | Research each ticker: technicals, fundamentals, news, earnings dates                     |
| 5    | Score every ticker (out of 100) and select the top 3 above the minimum threshold         |
| 6    | Append one row per pick to `strategies/momentum-pullback/trades-log.csv`                 |
| 7    | Overwrite `strategies/momentum-pullback/report.md` with the full current report          |
| 8    | Print a clean session summary                                                            |


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
│       └── track-outcomes/
│           └── SKILL.md                   ← 14-day outcome lookback logic
│
├── strategies/
│   └── momentum-pullback/
│       ├── AGENT.md                       ← agent workflow (load this in the prompt)
│       ├── config.md                      ← scan URL, universe, scoring system
│       ├── trades-log.csv                 ← persistent trade log for this strategy
│       └── report.md                      ← current report, overwritten each run
│
├── scripts/
│   └── yfinance_tools.py                ← optional CLI: summary / technicals / option chains
├── requirements.txt                     ← optional: yfinance (see README)
└── README.md
```

### Key files explained


| File                | Purpose                                                                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENT.md`          | Step-by-step workflow the agent follows for a strategy. Load this in your prompt.                                                                                          |
| `config.md`         | Scan URL, universe, trading style, entry criteria, and the full scoring system (points table, deductions, minimum threshold). Customise this to change strategy behaviour. |
| `trades-log.csv`    | Append-only trade log. The agent adds new rows and fills in outcome columns 14 days later. Never manually edit this file.                                                    |
| `report.md`         | Full markdown report overwritten on every run. Human-readable summary of market context, top picks, open trades, and performance stats.                                    |
| `SKILL.md` files    | Reusable logic loaded by every strategy agent. Defines how to research tickers, how to write to the CSV, and how to score outcomes.                                        |
| `trading-agent.mdc` | Always-on Cursor rule enforcing repo-wide conventions (e.g. never overwrite CSV rows, never fabricate data).                                                               |


---

## Strategies


| Strategy                                                         | Universe | Style                   | Scan source                |
| ---------------------------------------------------------------- | -------- | ----------------------- | -------------------------- |
| [Momentum After Pullback](strategies/momentum-pullback/AGENT.md) | S&P 500  | Position (weeks–months) | TrendSpider scheduled scan |


---

## Adding a New Strategy

1. Create `strategies/<name>/config.md` — scan URL, universe, trading style, entry filters, and a scoring system (copy from `momentum-pullback/config.md` and adapt)
2. Create `strategies/<name>/AGENT.md` — load the three skills, define the 8-step workflow (copy from `momentum-pullback/AGENT.md` and adapt)
3. Create `strategies/<name>/trades-log.csv` — paste the header row from `.cursor/skills/log-trade-csv/SKILL.md`
4. Create `strategies/<name>/report.md` — any placeholder text; overwritten on first run
5. Add a row to the Strategies table above
6. Run it with: `Run the <name> strategy. Follow strategies/<name>/AGENT.md`

---

## Skills Reference

Reusable logic shared across all strategies. Every agent loads all three.


| Skill             | Path                                      | What it defines                                                                              |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `analyse-tickers` | `.cursor/skills/analyse-tickers/SKILL.md` | Per-ticker research checklist, market context check, scoring instructions, output format     |
| `log-trade-csv`   | `.cursor/skills/log-trade-csv/SKILL.md`   | CSV column schema, field formats, writing rules, example rows                                |
| `track-outcomes`  | `.cursor/skills/track-outcomes/SKILL.md`  | How to find due rows, look up prices, classify HIT_T1/HIT_T2/STOPPED_OUT/EXPIRED, write back |


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
- **Earnings filter** — any ticker with earnings within 3 weeks is penalised −20 pts or excluded
- **One log per strategy** — each strategy writes only to its own `trades-log.csv`
- **Append-only CSV** — existing rows are never modified except when filling in outcome columns

