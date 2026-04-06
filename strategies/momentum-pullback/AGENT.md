# Momentum After Pullback — Agent Instructions

## Setup

Before starting, load the following files:

1. **Skill: `analyse-tickers`** — located at `.cursor/skills/analyse-tickers/SKILL.md` — research checklist, scoring criteria, market context check, and per-ticker output format
2. **Skill: `log-trade-csv`** — located at `.cursor/skills/log-trade-csv/SKILL.md` — CSV schema and writing rules
3. **Skill: `track-outcomes`** — located at `.cursor/skills/track-outcomes/SKILL.md` — 14-day outcome lookback and CSV update rules
4. **Skill: `read-trendspider-chart`** — located at `.cursor/skills/read-trendspider-chart/SKILL.md` — how to open TrendSpider, read the B-Xtrender layers, and score the indicator state
5. `strategies/momentum-pullback/config.md` — this strategy's scan URL, filters, and settings

All behaviour rules, scoring weights, output formats, and CSV conventions are defined in those files. This `AGENT.md` defines only the workflow steps specific to this strategy.

---

## Workflow

### Step 1 — Fetch the Scan

Fetch the scan URL from `config.md`:

```
https://charts.trendspider.com/scheduled_scans/view/sub-294213843b440f9793b6b7bb0432e5/json
```

Extract `symbolsFound` (the ticker list) and `timestamp` (convert from Unix ms to a human-readable datetime).

If `symbolsFound` is empty, write the empty-scan row per the `log-trade-csv` skill and skip to Step 6.

---

### Step 2 — Track 14-Day Outcomes

Before analysing new tickers, run the `track-outcomes` skill against:

```
strategies/momentum-pullback/trades-log.csv
```

This will find any rows recommended ~14 days ago that have not yet had their outcome recorded, look up current prices, and write the result back to the CSV. Note how many rows were updated (if any) — include this in the final summary.

---

### Step 3 — Market Context Check

Run the quick market check from the `analyse-tickers` skill:

- Is the S&P 500 above its 200-day MA?
- Is VIX elevated?
- Overall trend: uptrend, downtrend, or consolidation?

Note this briefly in the final output. If the market is in a confirmed downtrend, apply stricter filters and warn the user.

---

### Step 4 — Research Each Ticker

For every ticker in `symbolsFound`, follow the full research checklist in the `analyse-tickers` skill:

- Technical analysis
- Fundamental context
- News & catalysts
- Risk assessment (stop, targets, R:R)

Apply the strategy-specific entry criteria from `config.md` — in particular, the earnings filter (exclude or heavily penalise any ticker with earnings within 3 weeks).

---

### Step 4b — B-Xtrender Chart Check (TrendSpider)

> ⛔ **This step is mandatory before scoring. Do not skip it and do not proceed to Step 5 until it is complete.**
> Tickers where B-Xtrender state is unverified must have their B-Xtrender scoring categories left at zero — do not assume or estimate the indicator state.

For each ticker researched in Step 4, open TrendSpider using the `read-trendspider-chart` skill and check the B-Xtrender indicator state. Record the following for each ticker:

- **Background bars**: green (bullish) or red (bearish) during the pullback period?
- **Green dot**: has one printed on the signal line recently (last 1–3 bars)?
- **Foreground histogram**: recovering toward zero / crossed back above zero, or still falling?
- **Signal line**: rising (green) or falling (red)?

Use `.cursor/skills/read-trendspider-chart/set_symbol.py` to switch between tickers in the same browser session — do not re-open the browser for each ticker.

This data feeds directly into the Category A B-Xtrender scoring checks and deductions in `config.md`.

---

### Step 5 — Score and Select Top 3

Score each ticker using the points table in `config.md`. Discard any ticker that scores below the minimum threshold (55 pts). Rank the remainder by total score.

Select the top 3 scoring tickers. Present each using the output format defined in the `analyse-tickers` skill, including the full score breakdown.

If fewer than 3 tickers reach the minimum threshold, only present those that do and briefly explain why the others were excluded (including their score).

---

### Step 6 — Save New Picks to CSV

Append one row per pick to:

```
strategies/momentum-pullback/trades-log.csv
```

Follow all rules in the `log-trade-csv` skill. Leave all four outcome columns empty.

---

### Step 7 — Generate Report

Overwrite `strategies/momentum-pullback/report.md` with the full current report. See the **Report Format** section below.

---

### Step 8 — Final Summary

Output a session summary in the browser:

```
=== MOMENTUM PULLBACK SCAN — [DATE] ===
Universe: S&P 500 | Style: Position Trade

Outcomes recorded today: [N rows updated, or "none due"]
Tickers in scan ([count]): [list]
Market context: [one line]

TOP 3 PICKS:
1. [SYMBOL] — [one-line summary]
2. [SYMBOL] — [one-line summary]
3. [SYMBOL] — [one-line summary]

Full details above. Results saved to strategies/momentum-pullback/trades-log.csv.
Report written to strategies/momentum-pullback/report.md.
```

---

## Report Format

`report.md` is overwritten every run. Use this structure:

```markdown
# Momentum After Pullback — Current Report
_Last updated: [YYYY-MM-DD]_

---

## Market Context
[One paragraph: S&P 500 trend, VIX, overall conditions]

---

## Today's Top Picks

### 1. [SYMBOL] — [one-line summary]
[Full trade plan block from analyse-tickers output format]

### 2. [SYMBOL] — [one-line summary]
[Full trade plan block]

### 3. [SYMBOL] — [one-line summary]
[Full trade plan block]

---

## Open Trades
_Recommendations from the last 14 days with no outcome recorded yet._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|---|---|---|---|---|---|---|
| [date] | [ticker] | [entry_zone] | [stop_loss] | [target_1] | [target_2] | [risk_reward] |

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|---|---|---|---|---|---|
| [date] | [ticker] | [current_price] | [outcome_price] | [outcome_pct]% | [outcome_result] |

### Aggregate Stats
- **Total closed trades:** [N]
- **Win rate (HIT_T1 or HIT_T2):** [X%]
- **Average % gain on wins:** [X%]
- **Average % loss on stops:** [X%]
- **Expired (inconclusive):** [N]
- **Best trade:** [SYMBOL] ([outcome_pct]%, [outcome_result])
- **Worst trade:** [SYMBOL] ([outcome_pct]%, [outcome_result])
```

Build the Performance Summary table and stats by reading all rows in `trades-log.csv` where `outcome_result` is not empty. Calculate stats from the `outcome_pct` and `outcome_result` columns. If there are no closed trades yet, write `_No closed trades yet._` in place of the table and stats.
