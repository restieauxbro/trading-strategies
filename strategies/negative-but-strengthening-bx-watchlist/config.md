# Strategy Config — Negative but Strengthening BX Watchlist

## Identity

| Field | Value |
| --- | --- |
| Strategy name | Negative but Strengthening BX Watchlist |
| Scan source | TrendSpider Market Scanner via live UI |
| Saved scanner | `Negative but strengthening BX` |
| Scan runner | `python3 scripts/trendspider_scan.py --scanner-name "Negative but strengthening BX"` |
| Universe | TrendSpider scanner universe as configured in the saved scan |
| Trading style | Watchlist / early-bullish stalking list |
| Track all scan names | Yes — active names plus too-early names stay in the CSV |
| Watchlist file | `strategies/negative-but-strengthening-bx-watchlist/watchlist.csv` |
| Report file | `strategies/negative-but-strengthening-bx-watchlist/report.md` |

---

## Strategy Thesis

This scan is for stocks that are still **net negative on the weekly timeframe**, but whose **selling pressure is easing** while the **monthly backdrop remains in a broader bull cycle**. These are not automatic entries. The goal is to find names where the **narrative, sector backdrop, and company-specific catalysts** make them worth stalking for a higher-quality turn.

The scan already handles the BX structure. This strategy focuses on:

- whether the sector is turning supportive or at least no longer deteriorating
- whether the company narrative suggests a plausible re-acceleration
- whether there are catalysts that could confirm strengthening rather than produce another failed bounce
- whether near-term risks make the name unsuitable to stalk

TradingView chart reading is **not required** for this workflow. Use broader price context only as needed for entry triggers.

---

## What a Good Candidate Looks Like

- Sector is improving, stabilising, or receiving fresh capital rotation
- Company has a credible positive narrative: demand recovery, product cycle, backlog, pricing, restructuring, margin expansion, regulatory relief, or estimate stabilisation
- Recent news flow is constructive or at least no longer getting worse
- Earnings date is known and clearly stated
- There is a clear **next confirmation trigger** that would indicate strengthening is continuing

---

## Hard Risks / Downgrades

- Earnings within 10 calendar days unless there is a specific reason to stalk it through the event
- Sector remains decisively weak with no evidence of stabilisation
- Negative company narrative is still worsening
- Recent guidance cut, severe analyst downgrades, balance-sheet stress, or idiosyncratic litigation/regulatory risk

---

## Scoring System

Scores are out of **100**. Minimum **60** to remain on the active watchlist.

### Category A — Sector & Macro Context (25 pts max)

| Check | Points |
| --- | --- |
| Sector is in a confirmed uptrend or clear relative-strength improvement | 12 |
| Industry group is improving or no longer under active distribution | 8 |
| Broad market regime is supportive of higher-beta long setups | 5 |

### Category B — Company Narrative Quality (30 pts max)

| Check | Points |
| --- | --- |
| Clear recovery or re-acceleration narrative | 12 |
| Most recent earnings / guidance showed stabilisation or improvement | 8 |
| Analyst sentiment improving, or estimates no longer being cut | 5 |
| Positive company-specific catalyst in the next 4–8 weeks | 5 |

### Category C — Fundamental Support (20 pts max)

| Check | Points |
| --- | --- |
| Revenue trend improving or returning to growth | 7 |
| EPS / margin trend improving | 7 |
| Balance sheet / cash generation supports patience through a base-building phase | 6 |

### Category D — Watchlist Practicality (25 pts max)

| Check | Points |
| --- | --- |
| Strengthening trigger is clear and observable | 10 |
| Risk can be defined cleanly if the name confirms | 8 |
| No immediate event landmine beyond the stated earnings date | 7 |

### Deductions

| Condition | Deduction |
| --- | --- |
| Earnings within 10 calendar days | −12 |
| Sector still in confirmed deterioration | −10 |
| Fresh negative catalyst in last 2 weeks | −10 |
| Recent guidance cut / material analyst target cuts | −8 |
| Balance-sheet or liquidity stress | −8 |
| Strengthening case depends on hope rather than evidence | −10 |

---

## Output Format

For each shortlisted name, include:

```text
Ticker: [SYMBOL]
Current Price: $[price]
Sector: [sector]
Score: [total]/100 (A:[pts] B:[pts] C:[pts] D:[pts] Ded:[pts])

Why It Is On Watch:
[2–4 sentences on the narrative, sector, and why the weakening of selling pressure matters]

What Needs To Strengthen Next:
- [specific confirmation trigger]
- [second confirmation trigger if relevant]

Key Risks:
- [2–3 bullets, always include the next earnings date]

Entry Bias If Confirmed:
[what would make it actionable]
```

---

## Output Summary Header

```text
=== NEGATIVE BUT STRENGTHENING BX WATCHLIST — [DATE] ===
Universe: TrendSpider saved scan | Style: Watchlist / early bullish stalking
```

---

## Watchlist CSV Schema

Append one row per scanned ticker to:

```text
strategies/negative-but-strengthening-bx-watchlist/watchlist.csv
```

Header:

```csv
date,scan_label,ticker,current_price,day_change_pct,score,priority,status,sector,notes,next_trigger,key_risks
```

Column meanings:

- `date` — run date in `YYYY-MM-DD`
- `scan_label` — short label for the saved scan run
- `ticker` — stock symbol
- `current_price` — price captured from the scan
- `day_change_pct` — daily % move from the scan snapshot
- `score` — watchlist score out of 100
- `priority` — `high`, `medium`, or `low`
- `status` — e.g. `active`, `secondary`, `wait_for_earnings`, `avoid_for_now`
- `sector` — broad sector or sector / industry
- `notes` — concise reason the name belongs in the file
- `next_trigger` — what would upgrade the setup
- `key_risks` — concise invalidation or event risk note
