# Positive BX entry — Agent Instructions

## Setup

Before starting, load the following files:

1. **Skill: `analyse-tickers`** — `.cursor/skills/analyse-tickers/SKILL.md` — research checklist, scoring, market context, output format
2. **Skill: `log-trade-csv`** — `.cursor/skills/log-trade-csv/SKILL.md` — CSV schema and writing rules
3. **Skill: `track-outcomes`** — `.cursor/skills/track-outcomes/SKILL.md` — 14-day outcome lookback
4. **Skill: `indicators`** — `.cursor/skills/indicators/SKILL.md` — TradingView layout, fair value bands, weekly BX, daily B-Xtrender, monthly BX backdrop
5. `strategies/positive-bx-entry/config.md` — scanner name, scan logic, scoring, instruments

This `AGENT.md` defines workflow steps only.

---

## Workflow

### Step 1 — Fetch the scan

Run the saved TrendSpider scanner from `config.md` via the live UI:

```bash
python3 scripts/trendspider_scan.py --scanner-name "Strong upward momentum"
```

Uses `browser-use`, Chrome profile `Tim`, `Default Workspace`. Extract `symbolsFound` and `timestamp` (ms → human-readable datetime).

If `symbolsFound` is empty: still run **Steps 2–3** (outcomes + market context), append the **empty-scan** row per `log-trade-csv`, skip **Steps 4–7**, then run **Steps 8–9**.

---

### Step 2 — Track 14-day outcomes

Run the `track-outcomes` skill against:

`strategies/positive-bx-entry/trades-log.csv`

**Spread rows** (`setup_summary` contains `Bull Call Spread` or `Put Credit Spread`): use spread-specific WIN/LOSS rules from `config.md` (see archived momentum config sections referenced there).

---

### Step 3 — Market context

Use the quick check from `analyse-tickers` (S&P 500 vs 200 MA, VIX, trend). In a **confirmed downtrend**, apply stricter filters and warn.

---

### Step 4 — Research each ticker

For every ticker in `symbolsFound`, full `analyse-tickers` checklist: technicals, fundamentals, news, risk (stop, targets, R:R). Apply the **earnings handling** from `config.md`: always check and report the date, but do **not** auto-exclude names just because earnings are near if the selected instrument is the preferred move-benefiting structure.

---

### Step 4b — TradingView visual check (**mandatory before scoring**)

> ⛔ **Complete this for every ticker before Step 5.** Unverified chart state → leave Category A timing/structure points at **0** for unverified items; do **not** guess.

> **Tooling:** Use `**browser-use --profile "Tim" --headed`** only — per `.cursor/skills/indicators/SKILL.md`. **Do not** use Puppeteer, headless default `browser-use`, or any browser without profile **Tim**; you will not be logged into TradingView and indicator reads would be invalid.

For **each** ticker, open with `**browser-use`** (headed, profile `**Tim**`):

`https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER`

Use plain **TICKER** (e.g. `AMD`). Follow `.cursor/skills/indicators/SKILL.md` and record:

- **Fair value bands:** green vs red structure; vs **three lines** — **lower = fair value**, **middle = premium**, **upper = stress** (see `indicators` skill).
- **Weekly BX row:** green vs red on latest bar
- **Monthly BX backdrop:** green vs light pink / dark red, and whether the latest monthly bars are **shrinking** or **growing**
- **Daily B-Xtrender:** histogram side of zero; **buy/sell** signals on latest bars

**Immediate-entry rule:** A bullish entry is valid only when **weekly BX is green** and **monthly BX is either green or light pink and shrinking**. If scan + research are attractive but visuals say **no immediate entry** (overextension, daily sell signal, monthly pink growing / dark red, etc.), flag for **Watchlist** (see `config.md`) — **no** CSV row for that symbol.

Optional: clear stale screenshots first (`rm -f strategies/positive-bx-entry/assets/tradingview-*.png`), then save `strategies/positive-bx-entry/assets/tradingview-<TICKER>.png` for shortlisted names.

**Reading charts:** After each screenshot, use the **multimodal handoff** in `.cursor/skills/indicators/SKILL.md` (vision model + **JSON schema**) so **latest-bar** daily / weekly / monthly BX state is not inferred from lossy image descriptions alone.

---

### Step 5 — Score and select top 3

Score with `config.md`. Discard below **55**. Rank the rest.

Select up to **3** tradable picks (must pass **Step 4b** for immediate entry — not watchlist-only).

If fewer than 3 qualify, explain. List **watchlist** names separately (still in `report.md`, not CSV).

Output format per `analyse-tickers`, including score breakdown.

---

### Step 5b — Instrument selection & spreads

Per `config.md` / referenced spread sections: choose instrument per pick; if spread, build strikes, PoP, breakeven per rules.

---

### Step 6 — User confirmation gate

Before writing any new trade rows, present the suggested trades and ask the user which ones they actually opened.

- Default question: "Which of these suggested trades did you open?"
- Only treat trades as confirmed if the user explicitly says they opened them
- If the user opened none, do **not** append any new trade rows
- Watchlist names are never eligible for CSV append
- In unattended / scheduled runs where no user confirmation is possible, **do not append** new recommendation rows; generate the report with suggestions only

---

### Step 7 — Save confirmed trades to CSV

Append **one row per user-confirmed trade** to `strategies/positive-bx-entry/trades-log.csv`. **Never** append watchlist-only names or unconfirmed suggestions. Follow `log-trade-csv`; leave outcome columns empty.

---

### Step 8 — Generate report

Overwrite `strategies/positive-bx-entry/report.md` (format below). The **Suggested Trades** section may include ideas not opened; the **Open Trades** section must come only from `trades-log.csv`, which now contains user-confirmed trades only.

---

### Step 9 — Final summary

```
=== POSITIVE BX ENTRY — [DATE] ===
Universe: S&P 500 | Style: Position Trade | Scan: Strong upward momentum

Outcomes recorded today: [N or none]
Tickers in scan ([count]): [list]
Market context: [one line]

SUGGESTED TRADES (immediate entry if opened):
1. [SYMBOL] — [summary]
…

WATCHLIST (no entry this run):
- [SYMBOL] — [trigger / what we are waiting for]
…

Trades logged: [list of confirmed trades, or "none confirmed"]
Saved: strategies/positive-bx-entry/trades-log.csv
Report: strategies/positive-bx-entry/report.md
```

---

## Report format

```markdown
# Positive BX entry — Current Report
_Last updated: [YYYY-MM-DD]_

---

## Market Context
[Paragraph]

---

## Today's Suggested Trades

### 1. [SYMBOL] — [summary]
[Full trade plan from analyse-tickers + TradingView notes]

### 2. …
### 3. …

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|----------------|-------------------|
| … | … | … |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| … | … | … | … | … | … | … |

---

## Performance Summary
[Same table/stats rules as archived momentum: read trades-log.csv rows with outcome_result set]
```
