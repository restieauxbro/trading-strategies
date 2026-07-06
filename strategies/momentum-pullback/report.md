# Momentum After Pullback — Current Report
_Last updated: 2026-07-06_

---

## Market Context

The S&P 500 closed at 7,483.24 on July 2 (the last trading day before the July 4 holiday), up +1.8% for the shortened week. The index remains firmly in a bull uptrend, well above its 200-day moving average. VIX stands at 15.81 — a low-volatility bull regime. However, sector rotation is the dominant story: AI/semiconductor stocks corrected sharply (-6.7% for the PHLX SOX), while Financials, Healthcare, Industrials, and Utilities led. Q2 2026 earnings season opens this week (Delta Air Lines reports Friday July 10), and FOMC minutes release Wednesday are the near-term macro catalyst. Rate-cut expectations moved out to December 2026 after the weak June payroll print (57k jobs), which paradoxically supports rate-sensitive sectors (Utilities, REITs).

---

## Scan Results

**Scan run:** 2026-07-06 19:01 UTC | 150-stock universe (S&P 500 representative subset)

**29 tickers passed all 4 scan groups.**

**Earnings hard filter applied (no earnings within 21 days of July 7 entry):**

| Ticker | Earnings Date | Days Out | Status |
|--------|--------------|----------|--------|
| GS | Jul 14 | 8 | ❌ FAIL |
| MS | Jul 15 | 9 | ❌ FAIL |
| PLD | Jul 16 | 10 | ❌ FAIL |
| TFC | Jul 17 | 11 | ❌ FAIL |
| GD | Jul 21–22 | 15 | ❌ FAIL |
| TXN | Jul 22 | 16 | ❌ FAIL |
| PM | Jul 22 | 16 | ❌ FAIL |
| GM | Jul 21 | 14 | ❌ FAIL |
| RTX | Jul 23 | 17 | ❌ FAIL |
| NSC | Jul 23 | 17 | ❌ FAIL |
| PCG | Jul 23 | 17 | ❌ FAIL |
| NUE | Jul 27 | 20 | ❌ FAIL |
| CDNS | Jul 27 | 20 | ❌ FAIL |
| HLT | Jul 28 | 21 | ❌ Conservative FAIL |
| KO | Jul 28 | 21 | ❌ Conservative FAIL |
| NXPI | Jul 28 | 21 | ❌ Conservative FAIL |
| PCAR | Jul 28 | 21 | ❌ Conservative FAIL |

**10 tickers remaining after filter:** AAPL, BRK-B, LIN, MO, SO, DUK, ETN, AFL, O, OKE

---

## Today's Suggested Trades

_B-Xtrender unavailable (browser-use not installed in cloud environment). 15 pts withheld from Category A; −5 deduction applied. Max effective score: 95/115._

---

### 1. ETN — Eaton Corporation (Industrial/Electrical)

**Ticker:** ETN  
**Current Price:** $413.93 (July 2 close)  
**Sector:** Industrials (Electrical Equipment)  
**Score:** 83/115 (A:40 B:18 C:20 D:15 Ded:−10)

**Setup Summary:**  
ETN pulled back cleanly to its 50-day EMA zone ($402.48) and has since recrossed above both the 20 EMA and 50 EMA, with RSI recovering through 50 and a close above the prior day's high — all three timing triggers firing simultaneously. This is the clearest momentum-pullback signal in the scan. Volume declined on the pullback (confirming healthy consolidation, not distribution). The stock is +2.84% from the 50 EMA, which is the ideal re-entry zone.

**Entry Zone:** $412–420  
**Stop Loss:** $395 — just below the 50-day EMA; invalidates the re-entry thesis  
**Target 1:** $460 — Street consensus price target (~$463 average, $450–$454 from Evercore/BMO)  
**Target 2:** $510 — Bernstein $534 price target area; TIKR model mid-case $563  
**Risk/Reward:** 2.37:1 to T1 (using entry $415, stop $395)

**Key Risks:**
- Earnings August 4 (28 days) — must close spreads by August 1 or accept earnings risk
- Insider selling: $8.6M in last 90 days (mostly large executive May 6 sale — note 10b5-1 plan likely)
- IV extremely high (~49%) on July 31 options — spreads are expensive; liquidity thin

**Fundamental Note:**  
Q1 2026: Revenue $7.45B (+17% YoY, record), EPS $2.81 vs $2.73 est. Full-year organic growth guidance raised to 9–11%. Data center backlog at 228 GW (12 years of 2025 build rates). Bernstein maintained Buy $534 today (July 6); BMO Buy July 2; Citi $471, JPMorgan $445, Evercore $453. Strong Buy consensus (15 Buy, 4 Hold, 0 Sell effectively). Mobility Group spinoff → Dana deal adds ~$1.1B cash proceeds.

**Scoring Detail:**
| Category | Check | Pts |
|---|---|---|
| A | Weekly uptrend (EMA50 > EMA200, price > EMA50) | 10 |
| A | Daily uptrend (price > EMA200) | 8 |
| A | Pullback to EMA50 zone (+2.84%) | 10 |
| A | Volume declining on pullback | 7 |
| A | Recognisable pattern (clean EMA recross) | 5 |
| A | B-Xtrender (withheld) | — |
| B | R:R 2.37:1 | 18 |
| C | Beat Q1 earnings ($2.81 vs $2.73) | 6 |
| C | Revenue growth +17% YoY | 5 |
| C | EPS growth +3.3% YoY | 5 |
| C | Analyst upgrade last 30 days (Bernstein, BMO, Erste Group Bank) | 4 |
| D | Positive catalyst (data center demand, Mobility spinoff, PT raises) | 8 |
| D | Sector in uptrend (Industrials leading vs Tech) | 7 |
| Ded | B-Xtrender unavailable | −5 |
| Ded | Insider selling $8.6M / 90 days | −5 |
| **Total** | | **83/115** |

**Instrument — Paired Debit Spread (Bullish):**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 31, 2026 (~25 DTE) — expires BEFORE Aug 4 earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: $415 / $430
  Net Debit: ~$6.45 per spread (~$12.90 total for 2)
  Max Profit: ~$8.55 per spread (~$17.10 total)
  Max Loss: ~$12.90 total

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half size)
  Strikes: $415 / $395
  Net Debit: ~$7.80 per spread
  Max Profit: ~$12.20 per spread (if ETN drops to $395)
  Max Loss: ~$7.80

Combined Position:
  Total Debit / Max Loss: ~$20.70
  Expected Payout if thesis is right (ETN ≥ $430): ~$17.10 − $7.80 = +$9.30
  Expected Payout on violent move down (ETN ≤ $395): ~$12.20 − $12.90 = −$0.70 (near breakeven)
  Main Risk: time decay / no movement / ETN pins near $415 between strikes

⚠️ Liquidity Warning: ETN July 31 options have thin OI (1–52 per strike) and wide bid-ask spreads (~$3–4).
  Use limit orders at midpoint; expect some slippage. If unable to fill, consider buying 2 contracts of
  the $415/$430 bull call spread only (simpler), or trade 100 shares with stop at $395.
```

---

### 2. DUK — Duke Energy Corporation (Utility)

**Ticker:** DUK  
**Current Price:** ~$128 (July 3 close; scan shows $126.68 from July 2)  
**Sector:** Utilities  
**Score:** 82/115 (A:39 B:18 C:20 D:15 Ded:−10)

**Setup Summary:**  
Duke Energy is the tightest pullback in the qualifying set: only +1.06% above its daily EMA50 ($125.35) on July 2, with the price consolidating near the EMA. Volume was below average on the pullback (healthy), and the single trigger (close above prior day's high) has fired. RSI sits at 53 — freshly recovered above 50 but not overbought. With earnings confirmed for August 11 (35 days out), there's a clean window for a pre-earnings position.

**Entry Zone:** $126–130  
**Stop Loss:** $122 — below recent swing low; well under the EMA50  
**Target 1:** $138 — consensus analyst price target average (17 analysts)  
**Target 2:** $146 — high analyst price target (Barclays/BTIG high)  
**Risk/Reward:** 2.0:1 to T1 (entry $128, stop $122)

**Key Risks:**
- Earnings August 11 (35 days) — close or roll spreads by August 7
- Insider selling: $2.9M in last 3 months (TipRanks data) → conservative deduction applied
- Morgan Stanley carries Underweight $89 — outlier but notable regulatory/financing risk view
- Rising O&M costs and unresolved nuclear build financing risks flagged on Q1 call

**Fundamental Note:**  
Q1 2026: EPS $1.93 vs $1.87 est; Revenue $9.18B vs $8.44B est (+11.3% YoY). FY2026 guidance: $6.55–$6.80 EPS; long-term EPS growth 5–7% through 2030. AI data center electricity demand is a multi-year demand driver (Duke's Southeast coverage includes major hyperscaler hubs). Goldman Sachs Buy (July 2); Morgan Stanley raised PT $132→$136 (June 24); Mizuho Outperform $135. Moderate Buy consensus: 9 Buy, 8 Hold, 0 Sell.

**Scoring Detail:**
| Category | Check | Pts |
|---|---|---|
| A | Weekly uptrend | 10 |
| A | Daily uptrend | 8 |
| A | Pullback to EMA50 (+1.06% — excellent) | 10 |
| A | Volume declining | 7 |
| A | Pattern (consolidation at EMA50) | 4 |
| A | B-Xtrender (withheld) | — |
| B | R:R 2.0:1 | 18 |
| C | Beat Q1 earnings | 6 |
| C | Revenue growth +11.3% YoY | 5 |
| C | EPS growth +9.7% YoY | 5 |
| C | Analyst upgrades last 30 days (GS July 2, MS June 24) | 4 |
| D | Positive catalyst (AI data center demand, regulatory approvals, $103B capex plan) | 8 |
| D | Sector in uptrend (Utilities benefiting from rate-cut narrative) | 7 |
| Ded | B-Xtrender unavailable | −5 |
| Ded | Insider selling $2.9M | −5 |
| **Total** | | **82/115** |

**Instrument — Paired Debit Spread (Bullish):**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: August 21, 2026 (~45 DTE) — close by August 7 before Aug 11 earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: $125 / $130
  Net Debit: ~$2.32 per spread (~$4.64 total for 2)
    (Long $125 call ~$4.35 mid / Short $130 call ~$2.03 mid)
  Max Profit: ~$2.68 per spread (~$5.36 total)
  Max Loss: ~$4.64 total

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half size)
  Strikes: $125 / $120
  Net Debit: ~$1.53 per spread
    (Long $125 put ~$2.93 mid / Short $120 put ~$1.40 mid)
  Max Profit: ~$3.47 per spread (if DUK drops to $120)
  Max Loss: ~$1.53

Combined Position:
  Total Debit / Max Loss: ~$6.17
  Expected Payout if thesis is right (DUK ≥ $130 by Aug 7): ~$5.36 − $1.53 = +$3.83
  Expected Payout on violent move down (DUK ≤ $120): ~$3.47 − $4.64 = −$1.17 (small net loss)
  Main Risk: DUK drifts sideways between $125–$130 without resolution

Note: Good liquidity on DUK (OI 123–1005 per strike; volume active). Use limit orders at mid.
Note: Must CLOSE the position by August 7 before August 11 earnings.
```

---

### 3. O — Realty Income Corporation (REIT)

**Ticker:** O  
**Current Price:** $63.37 (July 2 close)  
**Sector:** Real Estate (Net Lease REIT)  
**Score:** 72/115 (A:37 B:10 C:20 D:10 Ded:−5)

**Setup Summary:**  
Realty Income is pulling back into its 50-day EMA ($61.68), currently +2.74% above, with RSI at 59.6 (healthy, not overbought). Volume was below average on the recent consolidation. The single trigger (close above prior day's high) has fired. The falling-rate environment and rotation toward yield assets is a structural tailwind. Robert W. Baird raised its price target from $64 to $65 today (July 6), a modest but same-day confirmation. The R:R is 1.5:1 using the conservative consensus PT of $67 — weaker than ETN and DUK, but still qualifying.

**Entry Zone:** $62.50–$64  
**Stop Loss:** $61.00 — just below the 50-day EMA; invalidates the pullback support thesis  
**Target 1:** $67 — consensus analyst price target  
**Target 2:** $71 — high analyst price target (Royal Bank of Canada)  
**Risk/Reward:** 1.53:1 to T1 (entry $63.37, stop $61.00)

**Key Risks:**
- Earnings August 5 (29 days) — close spreads by August 1
- Lower-conviction scan: single trigger only (not the strongest entry signal)
- Consensus PT $67 offers limited upside (~6%) from current price
- REIT sector performance still dependent on Fed rate-cut timeline; any hawkish pivot is negative

**Fundamental Note:**  
Q1 2026: EPS $1.13 vs $1.10 est (beat); Revenue $1.55B vs $1.39B est (+12.2% YoY). FY2026 guidance: $4.41–$4.44 EPS. 8.25% dividend yield ($3.17/share annualized) adds return cushion. 16 analysts: Hold consensus, but 7 are Buy/Strong Buy (Freedom Capital upgraded to Strong Buy in May). In a falling-rate environment this name re-rates well. Baird PT raise $64→$65 today (Neutral) confirms modest improving sentiment.

**Scoring Detail:**
| Category | Check | Pts |
|---|---|---|
| A | Weekly uptrend | 10 |
| A | Daily uptrend | 8 |
| A | Pullback to EMA50 zone (+2.74%) | 9 |
| A | Volume declining | 7 |
| A | Pattern | 3 |
| A | B-Xtrender (withheld) | — |
| B | R:R 1.53:1 | 10 |
| C | Beat Q1 earnings | 6 |
| C | Revenue growth +12.2% YoY | 5 |
| C | EPS growth +6.6% YoY | 5 |
| C | Analyst upgrade (Baird PT raise today) | 4 |
| D | Positive catalyst (rate-cut narrative, REIT re-rating) | 5 |
| D | Sector mild uptrend | 5 |
| Ded | B-Xtrender unavailable | −5 |
| **Total** | | **72/115** |

**Instrument — Paired Debit Spread (Bullish):**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: August 21, 2026 (~45 DTE) — close by August 1 before Aug 5 earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: $62.50 / $65.00
  Net Debit: ~$1.20 per spread (~$2.40 total for 2)
    (Long $62.50 call ~$2.03 mid / Short $65.00 call ~$0.83 mid)
  Max Profit: ~$1.30 per spread (~$2.60 total)
  Max Loss: ~$2.40 total

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half size)
  Strikes: $62.50 / $60.00
  Net Debit: ~$0.72 per spread
    (Long $62.50 put ~$1.30 mid / Short $60.00 put ~$0.58 mid)
  Max Profit: ~$1.78 per spread (if O drops to $60)
  Max Loss: ~$0.72

Combined Position:
  Total Debit / Max Loss: ~$3.12
  Expected Payout if thesis is right (O ≥ $65 by Aug 1): ~$2.60 − $0.72 = +$1.88
  Expected Payout on violent move down (O ≤ $60): ~$1.78 − $2.40 = −$0.62 (small net loss)
  Main Risk: Drift sideways between $62.50–$65 without clear direction

Note: Good liquidity on O options (OI 371–3269 per strike; active volume).
```

---

## Watchlist

_Names with constructive scan/research but no immediate entry (timing / extension / R:R)._

| Ticker | Why Watching | Trigger to Revisit |
|--------|-------------|-------------------|
| AAPL | All 3 triggers; strong trend. But currently +7.44% above EMA50 (extended). Earnings Jul 30 (23d safe). | Pullback to $295–300 (EMA50 zone); wait for re-entry signal near EMA50 |
| LIN | All 3 triggers; strong industrial gas trend. But +5.55% above EMA50 (extended). Earnings Jul 31. | Pullback to $510–515 (EMA50 zone); volume should decline on pullback |
| SO | Passed scan, scores 56/115 but R:R is poor (<1.5:1 to consensus PT $99). Earnings Jul 30 (23d). | Hold off — consolidation + PT expansion or upside breakout above $100 needed |
| BRK-B | Passed scan; Aug 3 earnings (safe). But single trigger, +3.77% above EMA50, RSI 64.9 (elevated). | Pullback to $490–495; wait for RSI to reset toward 50 |

---

## Open Trades

_No confirmed trades open. This is an unattended scheduled run — no trades are logged._

---

## Performance Summary

_All closed trades (outcome recorded)._

No closed trades on record. Only entry in the CSV is the April 16 empty-scan placeholder.

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Run Notes

- **B-Xtrender**: Unavailable (browser-use not installed in cloud environment). 15 pts withheld from Category A; −5 deduction applied to all scores. Visual chart confirmation cannot be performed. Scores above would be 10–15 pts higher for names with confirmed green BXT conditions.
- **Scheduled run**: No trades confirmed. No CSV rows appended. Suggest reviewing ETN and DUK as priority entries on Monday July 7 open.
- **Outcomes tracked**: 0 (no open trades from prior runs in the log).
