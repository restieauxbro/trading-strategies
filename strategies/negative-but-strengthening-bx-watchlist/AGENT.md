# Negative but Strengthening BX Watchlist — Agent Instructions

## Setup

Before starting, load the following files:

1. **Skill: `analyse-tickers`** — `.cursor/skills/analyse-tickers/SKILL.md`
2. `strategies/negative-but-strengthening-bx-watchlist/config.md`

This workflow is for **watchlist generation**, not automatic trade entry.

---

## Workflow

### Step 1 — Fetch the scan

Run the saved TrendSpider scanner from `config.md` via the live UI:

```bash
python3 scripts/trendspider_scan.py --scanner-name "Negative but strengthening BX"
```

Uses `browser-use`, Chrome profile `Tim`, `Default Workspace`. Extract `symbolsFound` and `timestamp`.

If `symbolsFound` is empty, keep `watchlist.csv` header-only or append no rows, skip research, generate the report, and finish.

---

### Step 2 — Market context

Use the quick market check from `analyse-tickers`:

- S&P 500 vs 200-day MA
- VIX level
- Overall trend / regime

This strategy can still produce good watchlist names in a mixed tape, but a hostile market should reduce conviction.

---

### Step 3 — Research each ticker

For every ticker in `symbolsFound`, perform **deep research** with emphasis on:

- sector and industry backdrop
- company narrative and recovery / re-acceleration case
- most recent earnings and guidance
- upcoming earnings date
- recent news and analyst changes
- whether there is a clear trigger that would confirm further strengthening

Do **not** spend time on detailed TradingView chart reading. Basic price context is enough to frame the trigger.

---

### Step 4 — Score and rank

Score each ticker using `config.md`.

Rank the names, but keep **all scanned tickers** in `watchlist.csv` with an appropriate `priority` and `status`.

---

### Step 5 — Suggested actionability

For each surviving name, state:

- why it belongs on the watchlist now
- what must strengthen next before it becomes actionable
- the key risk that would invalidate the watch

These are **watchlist** ideas, not logged trade recommendations.

---

### Step 6 — Write the watchlist CSV

Write one row per scanned ticker to `strategies/negative-but-strengthening-bx-watchlist/watchlist.csv` using the schema from `config.md`.

Include concise notes, a score, a `priority`, a `status`, the next confirmation trigger, and the main risk.

---

### Step 7 — Generate report

Overwrite `strategies/negative-but-strengthening-bx-watchlist/report.md` using the format below.

---

### Step 8 — Final summary

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

Watchlist CSV: strategies/negative-but-strengthening-bx-watchlist/watchlist.csv
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

## Watchlist Tracking

Active rows are tracked in `watchlist.csv`.
```
