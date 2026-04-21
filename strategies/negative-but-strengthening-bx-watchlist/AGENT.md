# Negative but Strengthening BX Watchlist — Agent Instructions

## Setup

Before starting, load the following files:

1. **Skill: `analyse-tickers`** — `.cursor/skills/analyse-tickers/SKILL.md`
2. **Skill: `log-trade-csv`** — `.cursor/skills/log-trade-csv/SKILL.md`
3. **Skill: `track-outcomes`** — `.cursor/skills/track-outcomes/SKILL.md`
4. `strategies/negative-but-strengthening-bx-watchlist/config.md`

This workflow is for **watchlist generation**, not automatic trade entry.

---

## Workflow

### Step 1 — Fetch the scan

Run the saved TrendSpider scanner from `config.md` via the live UI:

```bash
python3 scripts/trendspider_scan.py --scanner-name "Negative but strengthening BX"
```

Uses `browser-use`, Chrome profile `Tim`, `Default Workspace`. Extract `symbolsFound` and `timestamp`.

If `symbolsFound` is empty, write the empty-scan row per `log-trade-csv`, skip research, generate the report, and finish.

---

### Step 2 — Outcome tracking status

Check whether any rows in `strategies/negative-but-strengthening-bx-watchlist/trades-log.csv` are due for 14-day review.

Do **not** run the heavyweight `track-outcomes` workflow automatically unless the user explicitly asks for outcome tracking in the same session. If rows are due, mention the count in the summary.

---

### Step 3 — Market context

Use the quick market check from `analyse-tickers`:

- S&P 500 vs 200-day MA
- VIX level
- Overall trend / regime

This strategy can still produce good watchlist names in a mixed tape, but a hostile market should reduce conviction.

---

### Step 4 — Research each ticker

For every ticker in `symbolsFound`, perform **deep research** with emphasis on:

- sector and industry backdrop
- company narrative and recovery / re-acceleration case
- most recent earnings and guidance
- upcoming earnings date
- recent news and analyst changes
- whether there is a clear trigger that would confirm further strengthening

Do **not** spend time on detailed TradingView chart reading. Basic price context is enough to frame the trigger.

---

### Step 5 — Score and rank

Score each ticker using `config.md`. Discard names below **60** unless the narrative is unusually strong and the risk is clearly disclosed.

Rank the survivors and select up to **5** watchlist names.

---

### Step 6 — Suggested actionability

For each surviving name, state:

- why it belongs on the watchlist now
- what must strengthen next before it becomes actionable
- the key risk that would invalidate the watch

These are **watchlist** ideas, not logged trade recommendations.

---

### Step 7 — User confirmation gate for actual entries

If the user says they actually opened a trade based on one of these names, ask which one and then append only the confirmed entry to the CSV.

If no trade was opened, do **not** append any ticker recommendation row.

---

### Step 8 — Generate report

Overwrite `strategies/negative-but-strengthening-bx-watchlist/report.md` using the format below.

---

### Step 9 — Final summary

```text
=== NEGATIVE BUT STRENGTHENING BX WATCHLIST — [DATE] ===
Universe: TrendSpider saved scan | Style: Watchlist / early bullish stalking

Tickers in scan ([count]): [list]
Market context: [one line]

TOP WATCHLIST NAMES:
1. [SYMBOL] — [one-line reason]
…

Names to avoid for now:
- [SYMBOL] — [one-line reason]

Trades logged: none unless user explicitly confirmed an opened trade
Report: strategies/negative-but-strengthening-bx-watchlist/report.md
```

---

## Report Format

```markdown
# Negative but Strengthening BX Watchlist — Current Report
_Last updated: [YYYY-MM-DD]_

---

## Market Context
[One short paragraph]

---

## Top Watchlist Names

### 1. [SYMBOL] — [one-line summary]
[Detailed block from config output format]

### 2. …

---

## Avoid / Too Early

| Ticker | Why passed over | What would need to change |
| --- | --- | --- |
| … | … | … |

---

## Open Trades
_User-confirmed trades only._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
| --- | --- | --- | --- | --- | --- | --- |
| … | … | … | … | … | … | … |
```
