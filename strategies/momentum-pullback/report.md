# Momentum After Pullback — Current Report
_Last updated: 2026-06-23_

---

## Market Context

The S&P 500 closed at approximately 7,389–7,473 on June 22–23, sitting roughly 8% above its 200-day moving average (~6,858) and about 2% above its 50-day MA. The broad uptrend is intact — the 50-day MA has remained above the 200-day MA since July 2025 — but today's session (June 23) introduced a significant rotation risk. The Nasdaq fell ~1.5–2.0% and the Philadelphia Semiconductor Index collapsed 7.6%, driven by investor skepticism over debt-funded AI spending and hawkish commentary from new Fed Chair Kevin Warsh, who has raised the probability of a rate hike by year-end. The VIX spiked to 20.54 (+18% intraday), hitting an over-one-week high. Importantly, the Dow Jones Industrial Average finished slightly positive today, reflecting a clear rotation from high-multiple technology names toward defensive and value-oriented sectors. Only ~58% of S&P 500 stocks are trading above their 50-day MA (healthy markets typically run 70–80%), signalling narrowing breadth beneath the surface. The uptrend remains intact, but the environment calls for selectivity — defensive, non-tech setups are favoured this run.

> **Note — Step 4b TradingView visual check:** This was a scheduled/unattended run. Browser-use and the TradingView B-Xtrender visual check (chart z25AhAlV) could not be executed. All B-Xtrender scores below are estimates inferred from RSI, price-vs-EMA structure, and trigger data. **Before executing any of these trades, perform the mandatory visual check** at `https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER` for each pick to confirm green B-Xtrender background bars and a green dot on the signal line.

---

## Today's Suggested Trades

> **Scheduled run — trades are suggested only. No rows have been appended to trades-log.csv. If any of these are opened, manually log them using the `log-trade-csv` skill.**

### 1. DE — Deere & Company (97/115)

```
Ticker: DE
Current Price: $591.26
Sector: Industrials
Score: 97/115 (A:53 B:18 C:11 D:15 Ded:0)

Setup Summary:
DE pulled back from post-earnings highs to test its 50-day SMA ($573.79 SMA / $573.30 EMA)
and is now bouncing cleanly. Today's volume of ~540K is 57% below the 3-month average
(1.27M), confirming the pullback is a healthy consolidation rather than distribution.
The trigger fired via close above prior day's high. The Dow Jones was positive today while
the S&P sold off — confirming DE's defensive-industrial resilience. Q2 2026 earnings beat
by 15% vs estimates and the IEEPA tariff recovery ($272M from Feb 2026 Supreme Court ruling)
provide strong fundamental support.

Entry Zone: $583–$598 (within 3% of 50-day SMA)
Stop Loss: $562 — below 50-day SMA with $12 buffer
Target 1: $635 — post-earnings high / prior resistance zone
Target 2: $670 — approaching 52-week high ($674)
Risk/Reward: 1.9:1 (T1), 3.6:1 (T2)

Key Risks:
- Broader market selloff risk if Fed hike materialises (hawkish pivot weighing on all sectors)
- Farm equipment cycle remains depressed; Q2 EPS was slightly below prior year ($6.55 vs $6.64)
- Earnings August 20, 2026 (58 days — safe window)

Fundamental Note:
Q2 2026: EPS $6.55 vs $5.70 estimate (+15% beat); revenue +5.4% YoY to $13.37B. FY2026 net
income guided to $4.5–5.0B. IEEPA tariff recovery of $272M added in Q2. Earnings growth
catalyst from recovering farm cycle expected in FY2027 (+25.8% EPS growth per analysts).
```

**Instrument: Bullish Paired Debit Spread**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: July 17, 2026 (~24 DTE) — before earnings Aug 20

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 spreads
  Strikes: $590 long / $640 short  (50-pt width, ATM)
  Net Debit: ~$23–26 per spread (~$2,300–2,600 for 2x)
  Max Profit: ~$24–27 per spread
  Max Loss: ~$23–26 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 spread (half size)
  Strikes: $580 long / $530 short  (50-pt width)
  Net Debit: ~$15–18 per spread
  Max Profit: ~$32–35 per spread at full payout

Combined Position:
  Total Debit / Max Loss: ~$61–70 per pair (~$6,100–7,000)
  Expected Payout if thesis is right: ~$48–54 (primary max profit × 2)
  Expected Payout on violent move against: ~$32–35 (hedge payout)
  Main Risk: drift / time decay / index stuck between $540–$640 range
```

---

### 2. AMGN — Amgen Inc. (95/115)

```
Ticker: AMGN
Current Price: $347.27
Sector: Healthcare (Biotechnology)
Score: 95/115 (A:46 B:18 C:16 D:15 Ded:0)

Setup Summary:
AMGN pulled back from its 52-week high ($391.29) to test the 50-day SMA ($340.04) and
has bounced cleanly (+1.6% above SMA). The stock gained +0.78% today while the Nasdaq
dropped 1.7%, confirming its defensive healthcare positioning. Multiple scan triggers fired
(EMA recross, RSI above 50, close above prior day high). The distance from current price to
the 52-week high provides a clear, measurable upside path with attractive R:R. Amgen beat
Q1 2026 EPS estimates by 8.9% and grows EPS at 5%+ YoY.

Entry Zone: $342–$351
Stop Loss: $333 — below 50-day SMA with $7 buffer
Target 1: $375 — measured move / prior consolidation resistance
Target 2: $391 — 52-week high re-test
Risk/Reward: 2.1:1 (T1), 3.0:1 (T2)

Key Risks:
- MariTide (obesity/GLP-1 candidate) clinical readouts are binary event risk
- Earnings August 4, 2026 (42 days — safe window, plan exits or roll before)
- Biotech sector can move sharply on pipeline news

Fundamental Note:
Q1 2026 EPS $5.15 vs $4.73 consensus (+8.9% beat). EPS grew +5.1% YoY ($5.15 vs $4.90).
FY2026 revenue guidance: $37.1–38.5B. Multiple pipeline assets with late-stage readouts
expected in H2 2026. Consistent earnings beat track record (beat 8 of last 8 quarters).
```

**Instrument: Bullish Paired Debit Spread**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: July 17, 2026 (~24 DTE) — before earnings Aug 4

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 spreads
  Strikes: $345 long / $380 short  (35-pt width, ATM)
  Net Debit: ~$17–19 per spread (~$1,700–1,900 for 2x)
  Max Profit: ~$16–18 per spread
  Max Loss: ~$17–19 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 spread (half size)
  Strikes: $345 long / $310 short  (35-pt width)
  Net Debit: ~$12–14 per spread
  Max Profit: ~$21–23 per spread at full payout

Combined Position:
  Total Debit / Max Loss: ~$46–52 per pair (~$4,600–5,200)
  Expected Payout if thesis is right: ~$32–36 (primary max profit × 2)
  Expected Payout on violent move against: ~$21–23 (hedge payout)
  Main Risk: drift / time decay / index stuck between $310–$380 range
```

---

### 3. JNJ — Johnson & Johnson (90/115) ⚠️ Earnings July 15 — Use Defined Risk Only

```
Ticker: JNJ
Current Price: $238.41
Sector: Healthcare (Pharmaceuticals)
Score: 90/115 (A:46 B:18 C:11 D:15 Ded:0)

Setup Summary:
JNJ is the standout relative-strength name today, gaining +3.1% while the S&P 500 fell
1.1%, as investors rotated defensively into healthcare. The stock reclaimed its 50-day SMA
($230.17) with three simultaneous triggers and displays an extremely low beta (0.256). The
Icotyde launch (oral IL-23 therapy for psoriasis, April 2026) is a potentially blockbuster
catalyst — Leerink projects $10.5B in peak sales by 2032. Recommend entering on any mild
intraday pullback to the $234–237 zone to improve R:R rather than chasing today's +3.1% gap.

Entry Zone: $234–$239 (prefer entry on modest pullback from today's +3.1% gap)
Stop Loss: $226 — below 50-day SMA ($230.17) with $4 buffer
Target 1: $252 — just above 52-week high ($251.71), new all-time high territory
Target 2: $265 — Leerink Partners price target (Outperform, May 13, 2026)
Risk/Reward: ~1.9:1 (T1 at entry $234), 3.3:1 (T2 at entry $234)

⚠️ EARNINGS WARNING: JNJ reports Q2 on July 15, 2026 — exactly 22 days from today.
This is 1 day outside the 21-day hard filter. No scoring deduction applied per the rules,
but this is extremely borderline. Use ONLY defined-risk option spreads (no stock). Plan to
manage or exit the spread before July 15 if the position has not reached Target 1.

Key Risks:
- Earnings July 15, 2026 (22 days — critically close, 1 day outside the hard filter)
- EPS slightly declined YoY (Q1 2026 $2.70 vs Q1 2025 $2.77)
- Today's +3.1% gap moves entry above the 50-day SMA by 3.5% — wider than ideal
- Volume today (5.66M) below 3-month average (7.78M) — move partly breadth-driven

Fundamental Note:
Q1 2026 EPS $2.70 vs $2.67 consensus (beat, +1.1%). Icotyde launched April 2026;
Leerink projects $10.5B peak sales. Rybrevant (lung cancer) US sales +22% sequentially.
Leerink upgraded to Outperform with $265 PT on May 13, 2026. Revenue CAGR forecast of
7.2% for 2026–2031. Innovative Medicine + MedTech divisions growing.
```

**Instrument: Bullish Paired Debit Spread**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: September 18, 2026 (~87 DTE) — spans earnings; use defined risk

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 spreads
  Strikes: $235 long / $270 short  (35-pt width, slight ITM on pullback entry)
  Net Debit: ~$18–21 per spread (~$1,800–2,100 for 2x)
  Max Profit: ~$14–17 per spread
  Max Loss: ~$18–21 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 spread (half size)
  Strikes: $230 long / $195 short  (35-pt width)
  Net Debit: ~$10–13 per spread
  Max Profit: ~$22–25 per spread at full payout

Combined Position:
  Total Debit / Max Loss: ~$46–55 per pair (~$4,600–5,500)
  Expected Payout if thesis is right: ~$28–34 (primary max profit × 2)
  Expected Payout on violent move against: ~$22–25 (hedge payout)
  Main Risk: earnings reaction + drift; time decay is lower with 87 DTE
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension / requires confirmation)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| AFL | Defensive insurance, up +1.57% today, clean EMA50 pullback. But current price ($118.38) is above most analyst consensus targets ($99–$125 range), and insider selling in May. R:R to T1 ($125) is marginal (<1.5:1). | Pullback to $113–116 (50-day SMA) for better R:R; watch for new analyst upgrades lifting consensus above $120 |
| ETN | Dropped 6.6% today from $435.78 to $406.88 — right at the 50-day SMA ($405.81). Powerful AI/data center infrastructure thesis; record backlog; 10% organic growth guidance. Too early — selling pressure still active. | Daily close above $415 on declining volume, RSI recovery above 50, confirming reversal at SMA support |
| NVDA | Semiconductor index (SOX) down 7.6% today; NVDA likely down 5–8% from recent levels. Scan triggered but B-Xtrender almost certainly red given today's severity. | Stabilisation above 50-day EMA/SMA for 3+ sessions; RSI recovery above 50; semiconductor sector calming |
| AAPL | Holding up today (roughly flat, $297) while sector sold off. Clean EMA50 pullback setup (+2.3% above SMA50). Volume declining. Earnings July 30 (37 days — safe). | Sustained close above $300 on recovering volume; confirm B-Xtrender green dot before entry |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed open trades (scheduled run — trades were not confirmed by user)._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| 2026-04-16 | _(empty scan)_ | — | — | — | — |

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Scan Details
_Run: 2026-06-23 19:02 UTC via yfinance-based scanner (fallback — browser-use/TrendSpider unavailable in scheduled environment)_

**23 tickers passed all scan conditions:**
AAPL, NVDA, AVGO, JNJ, ABBV, MRK, KO, QCOM, AMGN, PLD, DE, ADI, EOG, MO, CL, GD, ETN, FDX, AFL, TFC, FAST, FANG, GM

**Eliminated after research/scoring (below 55 pts or clear disqualifier):**
- NVDA / AVGO / QCOM / ADI: Semiconductor sector in sharp selloff today (-7.6% SOX); B-Xtrender likely red
- MRK: Q1 2026 EPS negative (-$1.28, massive YoY swing from +$2.22); large acquisition write-down
- ABBV: RSI 65 (overbought), +7.7% above EMA50 (too extended)
- KO / CL / MO: Consumer staples; stable but limited R:R given already extended from EMA50
- PLD / GD / TFC / FAST / FANG / GM: Insufficient R:R or weaker fundamental case vs top picks
- FDX: Only single trigger (20 EMA recross), volume declining but weaker fundamental context
