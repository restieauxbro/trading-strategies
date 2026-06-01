# Momentum After Pullback — Current Report
_Last updated: 2026-06-01_

---

## Market Context

The S&P 500 (SPY) closed at **$759.59**, comfortably above its 200-day MA of $681.17 and its 50-day MA of $703.65 — a strong bullish structure. The index is near its 52-week high of $758.08, up approximately +27.6% over the past year. VIX is at **15.74**, below the caution threshold of 25, indicating low fear and a calm options market. The environment is firmly in **bull market / uptrend** territory. No downtrend filter applies. Conditions are favorable for long-bias pullback re-entries.

---

## Scan Results

**Scanner:** Momentum after pullback (yfinance implementation — browser-use unavailable in this environment)
**Timestamp:** 2026-06-01 19:02 UTC
**Universe:** S&P 500 (150 tickers screened)
**Symbols found (13):** TSLA, XOM, KO, C, UNP, EOG, CL, NSC, GD, SNPS, CARR, HLT, FANG

---

## 14-Day Outcome Tracking

No rows due for the 13–16 day lookback window (May 16–19, 2026). The only prior entry in `trades-log.csv` is from 2026-04-16 (empty scan row). Nothing to update.

---

## Step 4b — TradingView Visual Check

> ⚠️ **browser-use is unavailable in this cloud environment.** TradingView chart screenshots (Fair Value Bands, Weekly BX, Daily B-Xtrender) could not be captured for this run.

**Impact on scoring:** B-Xtrender-dependent points (15 pts max: background bars +5, signal dot +7, histogram +3) are scored **0/15** for all tickers. Deductions for red B-Xtrender are not applied either. All picks below are **conditioned on visual confirmation before live entry.** Verify `https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER` before executing any trade. If B-Xtrender shows red bars or a sell dot on the latest daily candle, treat as **Watchlist** only.

---

## Ticker Scoring Summary

Scoring out of **115 pts** (minimum threshold: **55 pts**). B-Xtrender points (15 pts) not awarded — TradingView visual unavailable.

| Ticker | A (Tech) | B (R:R) | C (Fund) | D (Cat) | Deductions | **Total** |
|--------|----------|---------|---------|---------|------------|-----------|
| TSLA | 37 | 25 | 20 | 15 | 0 | **97** |
| GD | 38 | 25 | 20 | 15 | −5 | **93** |
| C | 36 | 25 | 20 | 15 | −5 | **91** |
| EOG | 30 | 25 | 20 | 15 | 0 | **90** |
| UNP | 30 | 25 | 16 | 9 | 0 | **80** |
| XOM | 37 | 25 | 7 | 11 | 0 | **80** |
| HLT | 24 | 18 | 18 | 15 | 0 | **75** |
| FANG | 38 | 18 | 8 | 11 | 0 | **75** |
| KO | 30 | 10 | 18 | 13 | 0 | **71** |
| CL | 37 | 10 | 7 | 11 | 0 | **65** |
| CARR | 27 | 18 | 5 | 8 | 0 | **58** |
| NSC | 26 | 18 | 5 | 8 | 0 | **57** |
| SNPS | 28 | 18 | 10 | 9 | 0 | **65** |

All 13 tickers cleared the 55-point minimum. **Top 3 selected: TSLA, GD, C.** EOG scores 90 and is a near-miss; it goes to **Watchlist** because volume is not declining on its pullback.

---

## Today's Suggested Trades

### 1. TSLA — Tesla, Inc.
_Momentum pullback bounce at EMA50 zone; Optimus Annual Meeting catalyst_

```
Ticker: TSLA
Current Price: $418.17
Sector: Consumer Cyclical / Robotics & AI
Score: 97/115 (A:37 B:25 C:20 D:15 Ded:0)

Setup Summary:
TSLA pulled back from its YTD highs to within 3% of the daily EMA50 ($407)
over the past 5 sessions and has now bounced above it — confirmed by "Close above
prior day's high" trigger and RSI recovering to 51.6. Volume has been declining on
the pullback (last 5d avg below 20d avg), suggesting healthy consolidation rather
than distribution. Both the 50-day and 200-day daily EMAs are rising, and the weekly
golden cross (weekly EMA50 > EMA200) is in place. Price is above both. The annual
shareholder meeting (est. June 2026) is expected to include a full Optimus Gen 3
reveal and live demonstration — a near-term binary catalyst. First steel is already
in the ground at the dedicated Optimus factory at Giga Texas (May 31, 2026).

Entry Zone: $414–$422 (at and just above daily EMA50 of $407; current close $418)
Stop Loss: $393 — below the 200-day EMA ($395.84 per scan) + buffer
Target 1: $460 — prior resistance / measured move
Target 2: $498 — near 52-week high ($498.83)
Risk/Reward: 3.2:1 (to Target 2)

Key Risks:
- Extremely elevated PE ratio (384x trailing). Valuation fully priced for Optimus success.
- If Gen 3 shareholder meeting reveal disappoints, significant gap-down risk.
- Stop at $393 leaves $25 of risk below current price; requires wide tolerance.
- ⚠️ TradingView visual check not completed — verify B-Xtrender before entry.

Fundamental Note:
Q1 2026: EPS growth +8.3% YoY, revenue growth +15.8% YoY. Cortex 2.0 AI training
cluster online April 2026. Wedbush maintains $2T market cap thesis conditional on
first commercial Optimus customer (expected Q3 2026). No earnings within 3 weeks
(next: ~July 22, 2026).
```

**Instrument — Paired Debit Spread (Bullish):**
```
Bias: Bullish
Expiry: July 17, 2026 (~46 DTE)
30d IV: ~41.9% | 46-DTE IV: ~43%

Primary Spread (Bull Call Spread):
  Long:  TSLA Jul 17 $415 Call
  Short: TSLA Jul 17 $430 Call
  Width: $15
  Est. Net Debit: ~$7.00 per spread
  Max Profit:     ~$8.00 per spread (if TSLA ≥ $430 at expiry)
  Max Loss:       ~$7.00 per spread

Opposite Hedge (Bear Put Spread, half size):
  Long:  TSLA Jul 17 $415 Put
  Short: TSLA Jul 17 $405 Put
  Width: $10
  Est. Net Debit: ~$3.50 per spread (half-size position)
  Max Profit:     ~$6.50 per spread if TSLA ≤ $405

Combined Position (2 bull call spreads + 1 bear put spread):
  Total Debit / Max Risk:          ~$1,750
  Expected Payout if thesis right: ~$1,600 (2× primary profit)
  Expected Payout on sharp drop:   ~$650  (bear put hedge contribution)
  Main Risk: TSLA pins between $415–$430 at expiry; time decay erodes both legs.

⚠️ Verify actual mid-prices on your broker before entry. TSLA has elevated IV;
   spreads may be wider than estimates. Confirm B-Xtrender green on TradingView
   chart before executing.
```

---

### 2. GD — General Dynamics Corporation
_Defense sector pullback to EMA50; Q1 beat, guidance raise, Morgan Stanley $435 target_

```
Ticker: GD
Current Price: $340.69
Sector: Industrials — Aerospace & Defense
Score: 93/115 (A:38 B:25 C:20 D:15 Ded:−5)

Setup Summary:
GD has pulled back from post-Q1 highs to test its daily EMA50 ($342.08); price is
−0.41% below that level, effectively at the 50-day MA. This is a classic momentum
pullback to logical support after the stock surged +8% on April 29 Q1 results. Volume
has been declining on the pullback (last 5d avg below 20d avg). The weekly golden cross
is intact (weekly EMA50 $272 > weekly EMA200 ~$261). Daily EMA200 ($333.60) acts as
a lower backstop. The trigger is "Close above prior day's high," indicating first signs
of resuming the uptrend. The broader defense sector is in structural uptrend with
increased global defense budgets.

Entry Zone: $338–$344 (at/near EMA50 zone)
Stop Loss: $327 — below recent pullback swing low / below EMA50 buffer zone
Target 1: $369 — near 52-week high ($369.70)
Target 2: $390 — measured move target / Morgan Stanley target zone
Risk/Reward: 3.5:1 (to Target 2, entry $341, stop $327)

Key Risks:
- Insider selling: On May 13, 2026 an insider sold $25M of GD shares (SEC filing).
  Applied −5 pt deduction. Monitor for continuation.
- Goldman Sachs maintains Sell rating with $313 target (9.3% below current price).
- Defense spending remains strong but any geopolitical de-escalation could weigh.
- ⚠️ TradingView visual check not completed — verify B-Xtrender before entry.

Fundamental Note:
Q1 2026 beat: revenue +10.3% YoY ($13.5B), adjusted EPS $4.10 vs $3.90 estimate.
Raised FY26 EPS guidance. Analyst consensus Moderate Buy; avg target $393.55.
Morgan Stanley: Overweight, target $435. JPMorgan: Overweight, target $400.
No earnings within 3 weeks (next: ~July 22, 2026).
```

**Instrument — Paired Debit Spread (Bullish):**
```
Bias: Bullish
Expiry: July 17, 2026 (~46 DTE)
IV: ~22–25% (typical defense-sector name)

Primary Spread (Bull Call Spread):
  Long:  GD Jul 17 $340 Call
  Short: GD Jul 17 $360 Call
  Width: $20
  Est. Net Debit: ~$9.00 per spread
  Max Profit:     ~$11.00 per spread (if GD ≥ $360 at expiry)
  Max Loss:       ~$9.00 per spread

Opposite Hedge (Bear Put Spread, half size):
  Long:  GD Jul 17 $340 Put
  Short: GD Jul 17 $320 Put
  Width: $20
  Est. Net Debit: ~$8.00 per spread (half-size position)
  Max Profit:     ~$12.00 per spread if GD ≤ $320

Combined Position (2 bull call spreads + 1 bear put spread):
  Total Debit / Max Risk:          ~$2,600
  Expected Payout if thesis right: ~$2,200 (2× primary profit)
  Expected Payout on sharp drop:   ~$1,200 (bear put hedge contribution)
  Main Risk: GD stays flat near $340–$360; time decay on both legs.

⚠️ Verify actual mid-prices on your broker before entry. Confirm B-Xtrender green
   on TradingView chart before executing.
```

---

### 3. C — Citigroup Inc.
_All three momentum triggers fired; EPS +56%, $30B buyback, Jefferies target $160_

```
Ticker: C
Current Price: $128.39
Sector: Financial Services — Banks (Diversified)
Score: 91/115 (A:36 B:25 C:20 D:15 Ded:−5)

Setup Summary:
Citigroup is the strongest trigger ticker in the scan — all three momentum triggers
fired simultaneously: recrossed above the 20 EMA, RSI crossed back above 50 (now
at 58.3), and closed above the prior day's high. The stock had been consolidating
near its 20/50-day EMAs after a massive +70.9% run over the past year (from ~$74
lows). Volume is declining on the near-term pullback. The weekly golden cross is
intact, and price is well above the 200-day EMA ($109.58). This is a textbook
momentum continuation setup with the catalyst-rich backdrop of an Investor Day
$30B buyback and OpenAI IPO role. Analyst targets cluster at $147–$160.

Entry Zone: $126–$130 (at and just above 20 EMA/50 EMA recross zone)
Stop Loss: $118 — below recent swing low and below prior support zone
Target 1: $135 — 52-week high ($135.29); resistance
Target 2: $160 — Jefferies 12-month price target / breakout measured move
Risk/Reward: 3.2:1 (to Target 2, entry $128, stop $118)

Key Risks:
- Insider selling reported as "significant" in the past 3 months (Simply Wall St).
  Applied −5 pt deduction. Monitor for specific SEC filings.
- Price is 4.37% above 52-day EMA — moderate extension above immediate support.
- Approaching 52-week high ($135.29) which may act as near-term resistance for T1.
- ISS flagged executive pay concerns at the May 2026 shareholder meeting.
- ⚠️ TradingView visual check not completed — verify B-Xtrender before entry.

Fundamental Note:
Q1 2026: EPS growth +56.1% YoY (FY25→FY26 trajectory), revenue growth +15.9% YoY.
PE 15.8x (cheap for diversified banks). Forward PE ~10.2x. Announced $30B share buyback
at May 2026 Investor Day. Reported role in OpenAI IPO. Living will cleared by
regulators. Jefferies raised target to $160 on May 8; Goldman Sachs Buy at $149;
Barclays Overweight at $154. Consensus average target ~$147. No earnings within 3
weeks (next: ~July 14, 2026).
```

**Instrument — Paired Debit Spread (Bullish):**
```
Bias: Bullish
Expiry: July 17, 2026 (~46 DTE)
IV: ~25–30% (typical bank sector)

Primary Spread (Bull Call Spread):
  Long:  C Jul 17 $128 Call
  Short: C Jul 17 $140 Call
  Width: $12
  Est. Net Debit: ~$5.50 per spread
  Max Profit:     ~$6.50 per spread (if C ≥ $140 at expiry)
  Max Loss:       ~$5.50 per spread

Opposite Hedge (Bear Put Spread, half size):
  Long:  C Jul 17 $128 Put
  Short: C Jul 17 $116 Put
  Width: $12
  Est. Net Debit: ~$4.50 per spread (half-size position)
  Max Profit:     ~$7.50 per spread if C ≤ $116

Combined Position (2 bull call spreads + 1 bear put spread):
  Total Debit / Max Risk:          ~$1,550
  Expected Payout if thesis right: ~$1,300 (2× primary profit)
  Expected Payout on sharp drop:   ~$750  (bear put hedge contribution)
  Main Risk: C stays pinned between $128–$140 at expiry; theta decay on both legs.

⚠️ Verify actual mid-prices on your broker before entry. Confirm B-Xtrender green
   on TradingView chart before executing.
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry this run (timing / extension / volume concern)._

| Ticker | Score | Why watching | Trigger to revisit |
|--------|-------|--------------|-------------------|
| EOG | 90/115 | Strong at EMA50 (+1.01%), Q1 beat, EPS +39.6%, $20B buyback, Wells Fargo $196 target. Excellent fundamentals. | Volume NOT declining on pullback — wait for volume to dry up on next consolidation day; revisit if RSI holds above 50 with declining volume. |
| UNP | 80/115 | At EMA50 (+1.07%), good R:R to T2, clean weekly uptrend. | Volume NOT declining. Wait for 2–3 lower-volume consolidation days near EMA50 before entry. |
| XOM | 80/115 | −1.57% below EMA50 (clean pullback zone), declining volume, energy sector uptrend, good R:R. | EPS growth −43.4% YoY (oil price headwinds in prior year). Wait for Q2 2026 report catalyst or confirmed energy sector acceleration before upgrading to trade. |
| HLT | 75/115 | Strong EPS/Rev growth, sector tailwind. | Price extended +3.89% above EMA50, volume not declining, approaching 52-week high. Wait for pullback to EMA50 (~$319) zone. |
| FANG | 75/115 | All 3 triggers fired, declining volume, cheap fwd PE 11.4x. | R:R to T1 only 1.07:1. Wait for price to reset to $190–$195 (nearer EMA50 at $192) for better entry. |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

_None confirmed (scheduled run — no new CSV rows written per Step 6 unattended policy)._

---

## Performance Summary
_All closed trades (outcome recorded)._

_No closed trade rows in trades-log.csv yet. Only prior entry is 2026-04-16 empty scan row._

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Notes for Next Run

1. **TradingView visual check** is mandatory before any live trade execution. Load `https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER` for each pick with Chrome profile Tim (headed). Verify fair value band structure is green, weekly BX is green, and daily B-Xtrender histogram is not showing a fresh sell signal.
2. **User confirmation gate**: This is a scheduled/unattended run. Trades above are **suggestions only** — no CSV rows were appended. If any of these trades were manually opened, add rows to `strategies/momentum-pullback/trades-log.csv` before the next run.
3. **EOG** is the strongest watchlist name. If it pulls back slightly with declining volume in the next 1–3 sessions, it could upgrade to an immediate entry pick.
4. **TSLA Annual Shareholder Meeting** is expected in June 2026 — the Optimus Gen 3 reveal is a near-term binary event. Size appropriately given the event risk embedded in the options pricing.
