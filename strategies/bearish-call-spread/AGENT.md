# Bearish Call Spread — Agent Instructions

## Setup

Before starting, load the following files:

1. **Skill: `analyse-tickers`** — located at `.cursor/skills/analyse-tickers/SKILL.md` — research checklist, scoring criteria, market context check, and per-ticker output format
2. **Skill: `log-trade-csv`** — located at `.cursor/skills/log-trade-csv/SKILL.md` — CSV schema and writing rules
3. **Skill: `track-outcomes`** — located at `.cursor/skills/track-outcomes/SKILL.md` — 14-day outcome lookback and CSV update rules
4. **Skill: `read-tradingview-chart`** — located at `.cursor/skills/read-tradingview-chart/SKILL.md` — headed Chrome (profile **Tim**), saved TradingView layout URL, VTO + B-Xtrender bearish confirmation rules (uses **Skill: `browser-use`** at `.cursor/skills/browser-use/SKILL.md` for CLI commands)
5. `strategies/bearish-call-spread/config.md` — this strategy's scan URL, filters, scoring system, and spread construction notes

All behaviour rules, scoring weights, output formats, and CSV conventions are defined in those files. This `AGENT.md` defines only the workflow steps specific to this strategy.

---

## Workflow

### Step 1 — Fetch the Scan

Fetch the scan URL from `config.md`.

> **Note:** If the scan URL is not yet configured (shown as a placeholder), ask the user to provide the TrendSpider scan URL before continuing. Do not proceed with Step 4 without a ticker list.

Extract `symbolsFound` (the ticker list) and `timestamp` (convert from Unix ms to a human-readable datetime).

If `symbolsFound` is empty, write the empty-scan row per the `log-trade-csv` skill, complete Steps 2–3 (outcomes + market context), skip Steps 4–8, then continue at Step 9.

---

### Step 2 — Track 14-Day Outcomes

Before analysing new tickers, check `strategies/bearish-call-spread/trades-log.csv` for any rows where `outcome_date` is empty and `date` is approximately 14 days ago (±2 days).

**Do not use the `track-outcomes` skill logic for this strategy — the outcome check here is simpler:**

For each matching row:
1. Look up the ticker's **current price**
2. Extract the numeric level from the `short_strike` column (the level the stock must stay below)
3. Compare: **if current price ≥ short_strike level → `LOSS`; if current price < short_strike level → `WIN`**
4. Set `outcome_date` to today, `outcome_price` to the current price, `outcome_pct` to the % change from `current_price` to `outcome_price`, and `outcome_result` to `WIN` or `LOSS`
5. Write the four outcome columns back to the row

There are no targets to check and no early-exit logic — the only question is whether the stock has breached the short call strike at the 14-day mark.

Note how many rows were updated (if any) — include this in the final summary.

---

### Step 3 — Market Context Check

Run the quick market check from the `analyse-tickers` skill:

- Is the S&P 500 above or below its 200-day MA?
- Is VIX elevated (above ~25)?
- Overall trend: uptrend, downtrend, or consolidation?

**Important for this strategy:** If the market is in a confirmed uptrend (S&P 500 well above 200-day MA, VIX low), note that bear call spreads face elevated risk — apply stricter filters and flag this in the output. Bearish strategies perform best in downtrending or range-bound markets.

Note this briefly in the final output.

---

### Step 4 — Triage: Quick Screen All Tickers

Before doing any deep research, run a fast pass over every ticker in `symbolsFound` to identify the most promising candidates. The goal is to cut the list down to **5 or fewer** before spending effort on full research.

For each ticker, spend ~1 minute looking up only three things:

1. **Overhead resistance** — is there a clear, hard resistance level within ~10–15% above current price? (key MA, prior breakdown zone, supply area) — if there is no obvious resistance level, skip this ticker
2. **Reversal risk** — is the chart showing a potential reversal pattern (hammer, engulfing, double bottom, strong recent bounce)? — if yes, skip
3. **Sector** — is the sector in a clear downtrend or under pressure, or is it in favour right now? — note briefly

After the quick pass, rank the remaining tickers by how clean the resistance level looks and how weak the sector/fundamental picture is. Select the **top 5** (or fewer if many fail the triage) to carry forward to full research.

Briefly note which tickers were cut at triage and why (one phrase each).

---

### Step 5 — Research Top Candidates

For the triage survivors only, follow the full research checklist in the `analyse-tickers` skill with the following bearish-specific adjustments:

**Technical focus areas:**
- Identify all meaningful overhead resistance levels (prior breakdown zones, key MAs, supply areas)
- Note the nearest resistance level that the short call strike could sit at or above
- Check for any potential reversal patterns (hammer, bullish engulfing, double bottom) — these are red flags for a bear call spread
- Confirm volume is not surging on up days (which would suggest accumulation)

**Options context (approximate):**
- Note current IV environment: is IV rank/percentile elevated or low?
- Estimate approximate delta for strikes at the identified resistance level (use 0.20 delta as the target — this corresponds roughly to 1 standard deviation OTM for a monthly expiry)

**Fundamental & narrative context (focus on recovery conviction):**
- Is the business deteriorating? Look for declining revenue/EPS, earnings misses, analyst downgrades — these all reduce the likelihood of a price recovery
- Any positive catalysts (buybacks, upgrades, beats, strong guidance) are red flags that could fuel a bounce — note and penalise these
- What is the sector doing? Rotation out of this sector supports the case; rotation into it is a risk

> **Earnings are pre-filtered by the scan** — the TrendSpider scan already excludes any stock with earnings within 17 days. Do not check for or mention earnings as a risk factor.

---

### Step 6 — Score and Select Top 3 (pre–chart shortlist)

Score each ticker using the points table in `config.md`. Discard any ticker that scores below the minimum threshold (55 pts). Rank the remainder by total score.

Select the **top 3 scoring tickers** as the initial shortlist. **Do not** append to CSV or treat these as final until **Step 7 (TradingView)** is complete.

For each shortlist ticker, present the standard output format from the `analyse-tickers` skill **plus** the spread construction details:

```
Ticker: [SYMBOL]
Current Price: $[price]
Sector: [sector]
Score: [total]/100 (A:[pts] B:[pts] C:[pts] D:[pts] Ded:[pts])

Setup Summary:
[2–3 sentences on why this is a good bear call spread candidate — downtrend strength, resistance quality]

Resistance Level: $[level] — [reason this is hard resistance]

Suggested Spread:
  Short Call Strike: $[strike] (~[delta] delta) — at/above resistance
  Long Call Strike:  $[strike] — [X]% wide
  Target Expiry:     [Month YYYY] (~[DTE] DTE)
  Est. Probability of Profit: ~[X]% (based on short strike delta)

Short Strike Level (Stop Reference): $[strike] — [reason this is hard resistance: e.g. prior breakdown, 50-day MA]

Key Risks:
- [2–3 bullets — reversal signals, proximity to support, macro/sector tailwinds, positive catalysts that could lift the stock]

Fundamental Note:
[1–2 sentences on fundamentals and recent news]
```

If fewer than 3 tickers reach the minimum threshold, only present those that do and briefly explain why the others were excluded (including their score).

---

### Step 7 — TradingView visual confirmation (top 3)

After Step 6, **confirm each shortlist ticker on the shared TradingView layout** using the **`read-tradingview-chart`** skill end to end.

**Goal:** For bearish call spreads, prefer names where **both** are true on the **latest** bar (per that skill):

- **VTO:** red dot **sell** signal visible.
- **B-Xtrender:** **bearish territory** — red histogram **below** the zero line (not still green / bullish above zero).

**Procedure:**

1. **Clear prior chart snapshots** (fresh scan): delete `strategies/bearish-call-spread/assets/tradingview-*.png` before any new screenshots — see **Fresh scan** in `read-tradingview-chart` so this run’s report cannot reuse stale images. `mkdir -p strategies/bearish-call-spread/assets` if the folder is missing.
2. Follow the skill exactly: **headed** browser, Chrome profile **`Tim`**, base URL `https://www.tradingview.com/chart/z25AhAlV/?symbol=` + correct `EXCHANGE%3ATICKER`.
3. Check each of the three symbols in turn; capture a **screenshot** per symbol when possible (path noted in output).
4. Record the skill’s **output snippet** for each ticker (VTO yes/no, B-Xtrender yes/no, chart confirm: full / partial / none / unable).

**If a shortlist ticker fails full confirmation:**

- First try to **substitute** the next-highest scoring ticker from Step 6 (that still meets the 55 pt threshold) and run the same TradingView check, until you have **up to 3** picks that are **fully chart-confirmed**, **or** you run out of qualified alternates.
- Any pick kept without full confirmation must be labelled **not chart-confirmed** in the report and in the session summary, with a one-line reason.

Merge the TradingView lines into each final pick’s write-up before Step 8.

---

### Step 8 — Save New Picks to CSV

Append one row per pick to:

```
strategies/bearish-call-spread/trades-log.csv
```

Follow all rules in the `log-trade-csv` skill. Leave all four outcome columns empty.

**Field mapping for this strategy** (note: this CSV has a custom header — see `trades-log.csv`):
- `entry_zone` → current price at time of analysis
- `short_strike` → the short call strike price — this is the breach level used for outcome tracking (e.g. `$185 – prior breakdown / 50-day MA`)
- `setup_summary` → spread details: short strike, long strike, expiry, estimated PoP
- `key_risks` → pipe-separated risk bullets
- `fundamental_note` → 1–2 sentences on fundamentals and recent news

---

### Step 9 — Generate Report

Overwrite `strategies/bearish-call-spread/report.md` with the full current report. See the **Report Format** section below.

---

### Step 10 — Final Summary

Output a session summary:

```
=== BEARISH CALL SPREAD SCAN — [DATE] ===
Universe: Large Cap (S&P 500) | Style: Monthly Bear Call Spreads

Outcomes recorded today: [N rows updated, or "none due"]
Tickers in scan ([count]): [list]
Market context: [one line]

TOP 3 PICKS (after TradingView VTO + B-Xtrender check):
1. [SYMBOL] — Short $[strike]/$[strike] call spread, ~[X]% PoP, exp [Month] — Chart: [confirmed / partial / not confirmed]
2. [SYMBOL] — … — Chart: […]
3. [SYMBOL] — … — Chart: […]

Full details above. Results saved to strategies/bearish-call-spread/trades-log.csv.
Report written to strategies/bearish-call-spread/report.md.
```

---

## Report Format

`report.md` is overwritten every run. Use this structure:

**TradingView images:** Step 7 deletes `assets/tradingview-*.png` at the start of a fresh scan; embed only `assets/tradingview-<TICKER>.png` files created in that same Step 7 (so Markdown image links always match the current run).

```markdown
# Bearish Call Spread — Current Report
_Last updated: [YYYY-MM-DD]_

---

## Market Context
[One paragraph: S&P 500 trend, VIX, overall conditions and implication for bearish spreads]

---

## Today's Top Picks

### 1. [SYMBOL] — [one-line summary]
[Full trade plan block from Step 6 output format, including **TradingView** line from Step 7]

### 2. [SYMBOL] — [one-line summary]
[Full trade plan block including TradingView line]

### 3. [SYMBOL] — [one-line summary]
[Full trade plan block including TradingView line]

---

## Open Trades
_Recommendations from the last 14 days with no outcome recorded yet._

| Date | Ticker | Entry Price | Short Strike | Setup Summary |
|---|---|---|---|---|
| [date] | [ticker] | $[entry] | $[stop_loss] | [setup_summary] |

---

## Performance Summary
_All checked trades (outcome recorded at 14-day mark)._

| Date | Ticker | Entry Price | Price at 14 Days | % Move | Short Strike | Result |
|---|---|---|---|---|---|---|
| [date] | [ticker] | [current_price] | [outcome_price] | [outcome_pct]% | [stop_loss] | [WIN / LOSS] |

### Aggregate Stats
- **Total checked:** [N]
- **Win rate (stock below short strike at 14 days):** [X%]
- **Average stock % move on wins:** [X%]
- **Average stock % move on losses:** [X%]
```

Build the Performance Summary table and stats by reading all rows in `trades-log.csv` where `outcome_result` is not empty. Calculate stats from the `outcome_pct` and `outcome_result` columns. If there are no closed trades yet, write `_No closed trades yet._` in place of the table and stats.
