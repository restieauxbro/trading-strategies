# Momentum After Pullback — Agent Instructions

## Setup

Before starting, load the following files:

1. **Skill: `analyse-tickers`** — `.cursor/skills/analyse-tickers/SKILL.md`
2. **Skill: `log-trade-csv`** — `.cursor/skills/log-trade-csv/SKILL.md`
3. **Skill: `track-outcomes`** — `.cursor/skills/track-outcomes/SKILL.md`
4. **Skill: `indicators`** — `.cursor/skills/indicators/SKILL.md` (TradingView layout; use for visual confirmation)
5. `strategies/momentum-pullback/config.md` — scanner name, scan logic, scoring, instruments

---

## Workflow

### Step 1 — Fetch the Scan

Run the saved TrendSpider scanner via the live UI:

```bash
python3 scripts/trendspider_scan.py --scanner-name "Momentum after pullback"
```

Uses `browser-use`, Chrome profile `Tim`, `Default Workspace`. Extract `symbolsFound` and `timestamp`.

If `symbolsFound` is empty: still run **Steps 2–3** (outcomes + market context), append the **empty-scan** row per `log-trade-csv`, skip **Steps 4–7**, then run **Steps 8–9**.

---

### Step 2 — Track 14-Day Outcomes

Run the `track-outcomes` skill against:

`strategies/momentum-pullback/trades-log.csv`

**Spread rows** (`setup_summary` contains `Bull Call Spread`, `Put Credit Spread`, or `Paired Debit Spread`): apply the spread-specific WIN/LOSS rules from `config.md`.

---

### Step 3 — Market Context

Use the quick check from `analyse-tickers` (S&P 500 vs 200 MA, VIX, trend). In a **confirmed downtrend**, apply stricter filters and warn.

---

### Step 4 — Research Each Ticker

For every ticker in `symbolsFound`, full `analyse-tickers` checklist: technicals, fundamentals, news, risk (stop, targets, R:R). Apply **earnings** rule from `config.md`.

---

### Step 4b — TradingView Visual Check (**mandatory before scoring**)

> ⛔ **Complete for every ticker before Step 5.** Use `browser-use --profile "Tim" --headed` only.

For each ticker, open:

`https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER`

Follow `.cursor/skills/indicators/SKILL.md` and record:
- **Fair value bands**: green vs red structure; price vs lower/middle/upper bands
- **Weekly BX row**: green vs red on latest bar
- **Daily B-Xtrender**: histogram side of zero; buy/sell signals on latest bars

**Watchlist rule**: If scan + research are attractive but visuals say **no immediate entry**, flag for **Watchlist** — no CSV row.

---

### Step 5 — Score and Select Top 3

Score with `config.md`. Discard below **55**. Rank the rest.

Select up to **3** tradable picks. If fewer than 3 qualify, explain. List **watchlist** names separately.

---

### Step 5b — Instrument Selection & Spread Construction

Per `config.md` and `strategies/instruments.md`: choose instrument per IV, conviction, regime, and expected move profile.

---

### Step 6 — User Confirmation Gate

Before writing new trade rows, present suggested trades and ask which ones were actually opened. In **unattended/scheduled runs**, do **not** append new rows — generate report with suggestions only.

---

### Step 7 — Save Confirmed Trades to CSV

Append **one row per user-confirmed trade** to `strategies/momentum-pullback/trades-log.csv`. Leave outcome columns empty.

---

### Step 8 — Generate Report

Overwrite `strategies/momentum-pullback/report.md` with the full current report.

---

### Step 9 — Final Summary

```
=== MOMENTUM PULLBACK SCAN — [DATE] ===
Universe: S&P 500 | Style: Position Trade

Outcomes recorded today: [N or none]
Tickers in scan ([count]): [list]
Market context: [one line]

SUGGESTED TRADES (immediate entry if opened):
1. [SYMBOL] — [summary]
…

WATCHLIST (no entry this run):
- [SYMBOL] — [trigger / what we are waiting for]
…

Trades logged: [list of confirmed trades, or "none confirmed (scheduled run)"]
Saved: strategies/momentum-pullback/trades-log.csv
Report: strategies/momentum-pullback/report.md
```

---

## Report Format

```markdown
# Momentum After Pullback — Current Report
_Last updated: [YYYY-MM-DD]_

---

## Market Context
[One paragraph: S&P 500 trend, VIX, overall conditions]

---

## Today's Suggested Trades

### 1. [SYMBOL] — [one-line summary]
[Full trade plan block from analyse-tickers output format]

### 2. …
### 3. …

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| … | … | … |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| … | … | … | … | … | … | … |

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| … | … | … | … | … | … |

### Aggregate Stats
- **Total closed trades:** [N]
- **Win rate (HIT_T1 or HIT_T2):** [X%]
- **Average % gain on wins:** [X%]
- **Average % loss on stops:** [X%]
- **Expired (inconclusive):** [N]
- **Best trade:** [SYMBOL] ([outcome_pct]%, [outcome_result])
- **Worst trade:** [SYMBOL] ([outcome_pct]%, [outcome_result])
```
