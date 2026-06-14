# Momentum After Pullback — Current Report
_Last updated: 2026-06-14_

---

## Market Context

The S&P 500 (SPY) closed at $741.75 on June 12, comfortably above its 200-day MA ($686.30) and its 50-day MA ($722.80) — a clear bullish trend with no regime concerns. VIX closed at 17.68 on June 12, well below the 25 danger threshold, indicating low-to-moderate fear. The broad market context is constructive for pullback entries: the uptrend is intact, volatility is contained, and the risk-on tone supports re-entries after orderly corrections to moving-average support.

Backdrop risks include Middle East geopolitical tensions (Iran conflict, Strait of Hormuz concerns) elevating oil prices above $100, which selectively benefits energy stocks while introducing inflationary risk for rate-sensitive sectors. The AI capital-investment cycle continues to drive growth in technology and industrial automation. Position trade entries remain appropriate in this environment.

---

## Scan Summary

- **Scanner:** Momentum After Pullback (yfinance implementation)
- **Scan timestamp:** 2026-06-14 19:03 UTC
- **Universe:** 150 S&P 500 tickers (fallback list — Wikipedia blocked; full universe unavailable)
- **Tickers passing scan:** 31 — AAPL, GOOGL, TSLA, JPM, JNJ, MRK, CVX, KO, QCOM, LIN, PM, CAT, PLD, ADI, TJX, UNP, EOG, MO, CL, NSC, GD, USB, MCHP, FDX, EMR, NXPI, WELL, AFL, TFC, OKE, GM
- **TradingView visual confirmation (Step 4b):** _Not completed — `browser-use` unavailable in cloud environment. B-Xtrender and Fair Value Band scores set to 0 (unverified). Actual scores may be higher if visual confirms green BX signals. All top picks treated as watchlist-verified based on technical data only._

> **Unattended/scheduled run** — no trade rows appended to CSV. Suggested trades are presented for review only.

---

## Today's Suggested Trades

### 1. EMR — Emerson Electric (Industrials / Automation)

```
Ticker: EMR
Current Price: $143.07
Sector: Industrials (Industrial Automation & Software)
Score: 90/115 (A:37 B:18 C:20 D:15 Ded:0)

Setup Summary:
EMR pulled back from the $165 area to test its rising daily 50 EMA ($139.25) over several
weeks, printing declining volume throughout the correction. All three scan triggers fired:
price recrossed above the 20 EMA, RSI crossed back above 50, and the most recent close broke
above the prior day high. Bernstein initiated at Outperform / $175 target on June 10 — a fresh
catalyst with 22%+ implied upside. The $11.2B project funnel (Ovation platform orders +41% YoY)
provides fundamental support for a position trade.

Entry Zone: $140–$145 (at or near daily 50 EMA; ideal on any intraday dip to the $140–$141 area)
Stop Loss: $133.00 — below the 50 EMA and prior consolidation lows
Target 1: $158.00 — near-term resistance / prior high zone
Target 2: $165.00 — Bernstein price target; analyst consensus mean

Risk/Reward: (158-143)/(143-133) = 1.5:1 to T1 | (165-143)/(143-133) = 2.2:1 to T2

Key Risks:
- Middle East conflict created 1-pt revenue drag in Q2; ongoing field-service disruption
- China chemical market weakness (down mid-single digits in FY26)
- EMR has been in TradeSmith "Red Health Zone" for 2+ months (elevated caution)
- Earnings: August 5, 2026 (52 days away — outside 3-week hard filter)

Fundamental Note:
Q2 FY26 EPS $1.54 beat consensus by $0.01; underlying orders +5% YoY with Software & Systems
+18% and Ovation +41%. Company raised lower end of full-year EPS guidance to $6.45–$6.55.
Bernstein initiated Outperform at $175 on June 10; RBC maintains Outperform at $169 (May 7).
```

**Instrument — Paired Debit Spread (preferred):**

```
Bias: Bullish
Expiry: July 17, 2026 (~33 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 140C / Short 150C
  Net Debit: ~$4.45 per spread (~$7.25 long, ~$2.80 short at mid)
  Max Profit: ~$5.55 per spread
  Max Loss: ~$4.45 per spread
  Combined: $890 debit / $1,110 max profit

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half-size)
  Strikes: Long 145P / Short 135P (estimated)
  Net Debit: ~$2.60 per spread (estimated; verify at entry)
  Max Profit: ~$7.40 per spread
  Max Loss: ~$2.60

Combined Position:
  Total Debit / Max Loss: ~$1,150
  Expected Payout if bull thesis right (stock above 150): ~+$850
  Expected Payout on violent move against thesis (stock below 135): ~+$480
  Main Risk: drift / compression / EMR pinning between 140–150
```

---

### 2. WELL — Welltower Inc. (Real Estate / Healthcare Infrastructure)

```
Ticker: WELL
Current Price: $214.23
Sector: Real Estate (Senior Housing / Healthcare)
Score: 79/115 (A:38 B:10 C:16 D:15 Ded:0)

Setup Summary:
WELL dipped below its daily 50 EMA ($208.28) and 20 EMA ($208.69) in the first week of June
(touching ~$200), then recovered sharply with all three scan triggers firing: recrossed above
20 EMA, RSI crossed above 50, and closed above prior day high. Volume has been declining during
the consolidation (78% of 20-day average). The $221.68 52-week high is only 3.4% above current
price, making a retest of that high the natural near-term target. Q1 2026 revenue grew 38% YoY
and normalized FFO guidance was raised, providing strong fundamental support.

Entry Zone: $210–$216 (near the 20/50 EMA cluster; prefer entry on any pullback to $210–$212)
Stop Loss: $200.00 — below the recent swing low that undercut the 50 EMA
Target 1: $222.00 — prior 52-week high ($221.68)
Target 2: $237.00 — analyst consensus price target mean

Risk/Reward: (222-213)/(213-200) = 0.7:1 to T1 | (237-213)/(213-200) = 1.85:1 to T2

Key Risks:
- R:R to T1 only 0.7:1 — position requires patience for T2 to justify entry
- Options market is thinly traded — stock-only recommended (no spread)
- REIT structure makes WELL sensitive to rising long-term interest rates / Fed policy
- Earnings: July 27, 2026 (43 days away — outside 3-week hard filter)

Fundamental Note:
Q1 2026: EPS $1.47 beat $1.46 estimate. Revenue +38% YoY; Adjusted EBITDA +36% YoY.
Management raised full-year normalized FFO guidance by $0.11 at midpoint. Senior Housing
Operating occupancy growth +350 bps YoY. Strong demographic tailwind (aging U.S. population).
```

**Instrument — Stock (preferred; options illiquid):**

```
Bias: Bullish
Instrument: Common Stock (WELL)
Entry: $210–$216
Stop: $200.00 (hard stop — below 50 EMA and swing low)
Target 1: $222.00 (~3.6% upside from $214)
Target 2: $237.00 (~10.6% upside from $214)
Sizing note: Use normal position size; R:R is modest to T1 so keep size appropriate.
```

---

### 3. EOG — EOG Resources (Energy / Oil & Gas E&P)

```
Ticker: EOG
Current Price: $136.65
Sector: Energy (Oil & Gas Exploration & Production)
Score: 75/115 (A:31 B:18 C:16 D:10 Ded:0)

Setup Summary:
EOG pulled back to its daily 50 EMA ($136.02 — price is just 0.46% above) after a post-Q1
earnings dip in early May, recovering with all three scan triggers firing. Despite the initial
negative reaction to Q2 production guidance (sequential flat), the stock has held support and
momentum is recovering. At a forward PE of 9.2, EOG is one of the cheapest large-cap operators
in the S&P 500 on an earnings basis; crude oil above $100 provides a powerful earnings backdrop.

Entry Zone: $134–$139 (tight zone around the daily 50 EMA at $136.02)
Stop Loss: $126.00 — prior support / lower trendline (per Investtech rising channel)
Target 1: $150.00 — key overhead resistance (per multiple technical sources)
Target 2: $160.00 — analyst consensus price target mean (32 analysts)

Risk/Reward: (150-136.65)/(136.65-126) = 1.25:1 to T1 | (160-136.65)/(136.65-126) = 2.19:1 to T2

Key Risks:
- Volume NOT declining on pullback (100% of 20-day average) — some distribution pressure
- Q2 guidance: flat sequential production and NGL price realization weakness (~27% of WTI)
- Energy sector subject to oil price volatility; geopolitical risk is a double-edged sword
- No specific positive news catalyst in the last 2 weeks

Fundamental Note:
Q1 2026: EPS $3.41 beat estimates; revenue $6.92B beat expectations. Revenue +15.6% YoY,
EPS +39.6% YoY. TTM PE 13.4, Fwd PE 9.2 — material discount to S&P 500 multiple.
"Moderate Buy" consensus from 32 analysts; mean target $160.18.
```

**Instrument — Paired Debit Spread (preferred):**

```
Bias: Bullish
Expiry: July 17, 2026 (~33 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 135C / Short 145C
  Net Debit: ~$3.92 per spread (~$6.30 long, ~$2.38 short at mid)
  Max Profit: ~$6.08 per spread
  Max Loss: ~$3.92 per spread
  Combined: $784 debit / $1,216 max profit

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half-size)
  Strikes: Long 135P / Short 125P (estimated; verify at entry)
  Net Debit: ~$2.20 per spread (estimated)
  Max Profit: ~$7.80 per spread
  Max Loss: ~$2.20

Combined Position:
  Total Debit / Max Loss: ~$1,004
  Expected Payout if bull thesis right (stock above 145): ~+$1,000
  Expected Payout on violent move against thesis (stock below 125): ~+$560
  Main Risk: EOG drifting between 135–145 without directional resolution
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension / other concern)._

| Ticker | Why Watching | Trigger to Revisit |
|--------|--------------|-------------------|
| NSC | All 3 triggers, volume declining sharply (70% of 20-day avg), strong R:R to T2 ($345). Prior surge on thin volume raised bull trap concerns. Earnings -26.6% YoY, revenue nearly flat. | Earnings recovery evidence; fundamental improvement; or hold of $308 EMA50 support on any pullback |
| CVX | Exactly at daily 50 EMA ($187.22), all 3 triggers, oil above $100, BNP Paribas upgrade. Insider selling by Director Hess ($73M May 20) and CEO/CFO (March) triggers -5pt deduction; multiple planned sales in last 30 days. | Insider selling pressure clears (no new Form 4 sales for 30+ days); confirmed hold above $185 support |
| GOOGL | At 50 EMA support ($360.83), revenue +21.8%, EPS +82%. $84.75B equity offering (dilution) creating near-term headwind; RSI 42.5 approaching oversold. | Hold / bounce above $360 on volume; dilution overhang priced in; or RSI recovery above 50 on next attempt |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed open trades in log._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| — | — | — | — | — | — |

_No closed trades with recorded outcomes._

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Scoring Detail (all 31 tickers screened)

| Ticker | Score | Verdict |
|--------|-------|---------|
| EMR | 90/115 | **Pick #1** |
| WELL | 79/115 | **Pick #2** |
| EOG | 75/115 | **Pick #3** |
| NSC | 70/115 | Watchlist — fundamental weakness |
| GOOGL | 70/115 | Watchlist — dilution headwind |
| CVX | 66/115 | Watchlist — insider selling |
| AAPL | ~58/115 | Below threshold consideration — volume not declining, single trigger |
| TSLA | ~55/115 | At threshold — single trigger, extended PE (369x trailing) |
| Remaining 23 | <55 | Not scored in depth — failed on R:R, fundamentals, or combined |

_Note: B-Xtrender / Fair Value Band visual scores set to 0 for all tickers (TradingView confirmation unavailable in this run). Actual scores may be higher._
