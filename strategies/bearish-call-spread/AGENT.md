# Bearish Selector — Agent Instructions

## Setup

Before starting, load the following files:

1. **Skill: `analyse-tickers`** — located at `.cursor/skills/analyse-tickers/SKILL.md` — research checklist, scoring criteria, market context check, and per-ticker output format
2. **Skill: `log-trade-csv`** — located at `.cursor/skills/log-trade-csv/SKILL.md` — CSV schema and writing rules
3. **Skill: `track-outcomes`** — located at `.cursor/skills/track-outcomes/SKILL.md` — 14-day outcome lookback and CSV update rules
4. **Skill: `indicators`** — `.cursor/skills/indicators/SKILL.md` — TradingView saved layout (`chart/z25AhAlV`): Fair Value Bands, weekly BX row, daily B-Xtrender; bearish confirmation rules. Uses **Skill: `browser-use`** (`.cursor/skills/browser-use/SKILL.md`) with **`--profile "Tim" --headed`**. _Historical TrendSpider flow:_ `.cursor/skills/archived/read-trendspider-chart/SKILL.md` (do not use for live runs)._
5. `strategies/bearish-call-spread/config.md` — this strategy's saved scanner name, filters, scoring system, and spread construction notes

All behaviour rules, scoring weights, output formats, and CSV conventions are defined in those files. This `AGENT.md` defines only the workflow steps specific to this strategy.

---

## Workflow

### Step 1 — Fetch the Scan

Run the saved TrendSpider scanner from `config.md` via the live UI:

```bash
python3 scripts/trendspider_scan.py --scanner-name "Bearish Case Market Scanner"
```

This uses `browser-use`, Chrome profile `Tim`, and `Default Workspace`, then runs the scan from the Market Scanner pane and returns fresh JSON.

Extract `symbolsFound` (the ticker list) and `timestamp` (convert from Unix ms to a human-readable datetime) from the script output.

If `symbolsFound` is empty, write the empty-scan row per the `log-trade-csv` skill, complete Steps 2–3 (outcomes + market context), skip Steps 4–9, then continue at Step 10.

---

### Step 2 — Track 14-Day Outcomes

Before analysing new tickers, check `strategies/bearish-call-spread/trades-log.csv` for any rows where `outcome_date` is empty and `date` is approximately 14 days ago (±2 days).

**Skip** rows where `ticker` is **`ABSTAIN`** or `short_strike` is empty — those are audit rows, not trades; **do not** fill outcome columns for them.

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

Select the **top 3 scoring tickers** as the initial shortlist.

> ⛔ **HARD STOP — DO NOT WRITE TO CSV YET.**
> These are candidates only. Nothing is logged until Step 7 (TradingView visual confirmation) is complete. Any ticker that fails Step 7 is dropped regardless of its research score. If all candidates fail, the run abstains — see Step 8a.

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

After Step 6, **confirm each shortlist ticker** on your **saved TradingView layout** using the **`indicators`** skill (`.cursor/skills/indicators/SKILL.md`).

**`browser-use --profile "Tim" --headed` is mandatory** for every chart open in this step. **Do not** use Puppeteer, Playwright without profile Tim, or `browser-use` without **`--profile "Tim"`** — you will not be logged into TradingView and saved indicators will not load (see `.cursor/skills/indicators/SKILL.md`).

**Goal:** For bearish call spreads, **only** names with **full bearish alignment** on the **latest** bar (per `indicators` skill) may be **recommended and saved** to the CSV:

- **Daily B-Xtrender:** **bearish territory** — histogram **below** zero, **and** **no fresh green buy signal** on the latest bar for a new bear call.
- **Weekly BX row:** **not** a strong green tailwind (red or weak / conflicting higher-TF pressure preferred).
- **Fair Value Bands:** **red** structural bias **supports** the thesis; **green** structural bias with strong recovery is a **caution** — use judgment; if daily shows **bounce risk** (buy signal + green histogram), **disqualify**.

**Hard disqualifiers (ticker is out for this run):**

- **Daily B-Xtrender:** green histogram **above** zero on the latest bar, **or** a **green buy** signal on the latest bar — **bounce / mean-reversion risk** vs a new bear call.
- If the scan universe mostly shows this pattern, **few or zero** qualified names is **correct**.

**Procedure:**

1. **Clear prior chart snapshots** (fresh scan): `rm -f strategies/bearish-call-spread/assets/tradingview-*.png` — see **Fresh screenshots** in `indicators` skill. `mkdir -p strategies/bearish-call-spread/assets` if missing.
2. For each shortlist **TICKER**, open (headed, profile **`Tim`**):

   `https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER`

   Use **plain** ticker (e.g. `ORCL`). Wait for indicators to load.

3. Capture **screenshot** per confirmed symbol: `strategies/bearish-call-spread/assets/tradingview-<TICKER>.png`
4. **Interpret screenshots** with the **multimodal handoff** + JSON schema in `.cursor/skills/indicators/SKILL.md` (vision-capable model on the PNG — not lossy file-read captions alone).
5. Record for each ticker: fair value band color (structural), weekly BX row state, daily B-Xtrender histogram side + buy/sell on latest bar; **chart confirm:** full / partial / none / unable.

**Substitution and abstention:**

- If a shortlist ticker **fails** full confirmation, try the **next-highest** scoring ticker from Step 6 (still ≥ 55 pts) and repeat Step 7.
- **Do not** append a pick that lacks **full** bearish alignment per above. **Partial** or **not confirmed** names may appear in the report as **watched / not recommended**, not in Step 8 CSV pick rows.
- If **zero** tickers pass → **abstain** (Step 8a).

Merge **TradingView** notes into each final pick before Step 8 — or document abstention instead of pick blocks.

---

### Step 8a — Abstain (no recommendations)

If **no** ticker passes Step 7 **full** confirmation:

1. **Do not** append normal recommendation rows (no ORCL/ADBE/etc. pick lines).
2. Append **exactly one** row to `trategies/bearish-call-spread/trades-log.csv`:
   - `date` → today (`YYYY-MM-DD`)
   - `scan_timestamp` → same convention as other runs
   - `ticker` → `ABSTAIN`
   - `score`, `current_price`, `sector`, `entry_zone`, `short_strike`, `key_risks`, `fundamental_note` → leave **empty**
   - `setup_summary` → short explicit reason, e.g. `ABSTAIN — no chart-confirmed bear call candidates (daily B-Xtrender buy/green or above zero on latest bar; weekly BX / fair value bands not aligned) — mean-reversion risk across scan`
   - Outcome columns → empty
3. In `report.md`, replace **Today’s Suggested Trades** with an **## Abstention** section explaining what was seen on B-Xtrender/VTO across checked names (and optionally embed 1–2 screenshots if you captured any for documentation). Still include **Market Context**, **Open Trades**, and **Performance Summary**.
4. Session summary (Step 11): state **SUGGESTED TRADES: none (abstained)** and that one `ABSTAIN` row was logged.

---

### Step 8 — User confirmation gate

Before writing any new trade rows, present the suggested trades and ask the user which ones they actually opened.

- Default question: "Which of these suggested trades did you open?"
- Only append rows for trades the user explicitly confirms they opened
- If the user opened none, do **not** append any new trade rows
- If Step 8a abstention applied, skip this confirmation step for trade rows; the audit `ABSTAIN` row is still appended
- In unattended / scheduled runs where no user confirmation is possible, **do not append** new recommendation rows; generate the report with suggestions only

---

### Step 9 — Save Confirmed Trades to CSV

**Skip this step if Step 8a (abstain) applied** — the abstention row is already the only append for that run.

Otherwise append **one row per user-confirmed trade** to:

```
strategies/bearish-call-spread/trades-log.csv
```

Follow all rules in the `log-trade-csv` skill. Leave all four outcome columns empty. Do **not** append unconfirmed suggestions.

**Field mapping for this strategy** (note: this CSV has a custom header — see `trades-log.csv`):
- `entry_zone` → current price at time of analysis
- `short_strike` → the short call strike price — this is the breach level used for outcome tracking (e.g. `$185 – prior breakdown / 50-day MA`)
- `setup_summary` → spread details: short strike, long strike, expiry, estimated PoP
- `key_risks` → pipe-separated risk bullets
- `fundamental_note` → 1–2 sentences on fundamentals and recent news

---

### Step 10 — Generate Report

Overwrite `strategies/bearish-call-spread/report.md` with the full current report. See the **Report Format** section below. The **Suggested Trades** section may include ideas not opened; the **Open Trades** section must come only from `trades-log.csv`, which now contains user-confirmed trades only.

---

### Step 11 — Final Summary

Output a session summary:

```
=== BEARISH SELECTOR SCAN — [DATE] ===
Universe: Large Cap (S&P 500) | Style: Monthly Bearish Options Structures

Outcomes recorded today: [N rows updated, or "none due"]
Tickers in scan ([count]): [list]
Market context: [one line]

SUGGESTED TRADES (after TradingView check — **full** bearish alignment only; browser profile **Tim**):
[If picks:] 
1. [SYMBOL] — Short $[strike]/$[strike] call spread, ~[X]% PoP, exp [Month] — Chart: confirmed
2. …
3. …
[If abstain:]
**None — abstained.** (Daily B-Xtrender green buy / above zero and/or weekly BX + fair value bands not confirming bearish setup on all qualified candidates.) One `ABSTAIN` row appended to CSV for audit trail.

Trades logged: [list of confirmed trades, or "none confirmed"]
Full details above. Results saved to strategies/bearish-call-spread/trades-log.csv.
Report written to strategies/bearish-call-spread/report.md.
```

---

## Report Format

`report.md` is overwritten every run. Use this structure:

**TradingView images:** Step 7 deletes `assets/tradingview-*.png` at the start of a fresh scan; embed only `assets/tradingview-<TICKER>.png` from that Step 7. All chart opens use **`browser-use --profile "Tim" --headed`**.

```markdown
# Bearish Selector — Current Report
_Last updated: [YYYY-MM-DD]_

---

## Market Context
[One paragraph: S&P 500 trend, VIX, overall conditions and implication for bearish spreads]

---

## Today's Suggested Trades

[If no qualified picks after Step 7, use this instead of numbered picks:]

### Abstention — no new bear call spreads
_Reason (e.g. daily B-Xtrender green buy / above zero on latest bar; weekly BX green; fair value bands bullish). Optional screenshots from Step 7._

[If picks exist:]

### 1. [SYMBOL] — [one-line summary]
[Full trade plan block from Step 6 output format, including **TradingView** line from Step 7]

### 2. [SYMBOL] — [one-line summary]
[Full trade plan block including TradingView line]

### 3. [SYMBOL] — [one-line summary]
[Full trade plan block including TradingView line]

---

## Open Trades
_User-confirmed trades from the last 14 days with no outcome recorded yet. **Exclude** rows where `ticker` is `ABSTAIN`._

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
