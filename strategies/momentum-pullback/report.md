# Momentum After Pullback — Current Report
_Last updated: 2026-05-13_

---

## Market Context

The S&P 500 is in a confirmed uptrend, with SPY at **$743.03** — approximately **11.2% above** its 200-day EMA ($668) and well above its 50-day EMA ($700). The 200-day EMA continues to rise. VIX sits at **17.81**, comfortably below the danger threshold of 25, and the CNN Fear & Greed Index reads 66 ("Greed"), indicating a risk-on environment. Futures rose on May 13 and Morgan Stanley raised its 2026 year-end S&P 500 target to 8,000, citing resilient earnings and AI adoption.

A notable macro headwind surfaced this week: April CPI printed at **3.8% YoY** — the hottest reading since March 2023 — driven by elevated gasoline prices as the U.S.-Iran conflict (now in its 11th week) keeps WTI crude above $102/barrel. Markets have largely priced out Fed rate cuts for 2026, with some probability now assigned to a December hike. Despite these inflation concerns, the bull market's technical structure remains fully intact. **Overall: confirmed uptrend, elevated inflation/rate uncertainty — normal filters apply; position size conservatively given CPI surprise.**

---

## Scan Results

**Scan method:** yfinance fallback (TrendSpider `browser-use` unavailable in scheduled environment)
**Scan timestamp:** 2026-05-13 19:05 UTC
**Universe scanned:** 173 S&P 500 representative tickers
**Tickers passing core conditions (price > EMA200, rising EMAs, within 5% of EMA50):** 61

Tickers passing with active timing triggers (best candidates): DE, VZ, D, EVRG, AME, AFL, NEE, DLR, OKE, PSX, EPD, COST, LIN, WMT, BKR, VLO, KO, APD, WMB, EXPD, EQIX, CF, GS, SLB, WELL, MO, HAL, BA, FCX, MNST

**DE excluded from trade picks:** Q2 earnings due May 21, 2026 — within the 3-week hard filter. Flagged for watchlist (post-earnings re-entry).

_Note: B-Xtrender visual confirmation via TradingView was not possible in this unattended run. Scores reflect technical and fundamental data only; BX points are not awarded. All picks should be visually confirmed before live entry._

---

## Outcomes Tracked Today

**No rows due.** Only existing CSV row is the April 16 empty-scan placeholder (no ticker). No 14-day outcome tracking required.

_Prior run (2026-05-10) suggested MAR, JPM, and EMR as scheduled-run recommendations — none user-confirmed, no CSV rows. As of May 13: MAR -0.9%, JPM -0.1%, EMR -2.4% from suggestion prices; all remain above their respective stops._

---

## Today's Suggested Trades

### 1. AME — AMETEK, Inc. — Record Orders + RSI Recovery at 50-Day EMA

```
Ticker: AME
Current Price: $231.51
Sector: Industrials (Electronic Instruments / Precision Automation)
Score: 93/115 (A:40 B:18 C:20 D:15 Ded:0)

Setup Summary:
AMETEK reported record Q1 2026 results on April 30 (13 days ago): EPS $1.97 beat by 3.7%,
revenue +11% YoY to $1.93B, record orders of $2.2B (+23% with 22% organic growth), and record
backlog of $3.87B. Despite this, the stock has pulled back 4.8% from its recent high to test
the 50-day EMA ($227.91). RSI recovered from 44 to 51 — crossing back above 50 — confirming
early momentum reversal. Volume over the past 5 days (1.30M) is running marginally below the
20-day average (1.32M), signalling healthy consolidation rather than distribution. Weekly trend
structure is fully intact. Analyst consensus target is $252.33 (10 out of 14 analysts: Buy),
representing ~9% upside. Next earnings: ~late July 2026. Safe.

Entry Zone: $229–$234 (near 50-day EMA)
Stop Loss: $222 — below 50-day EMA ($227.91) and key swing low, ~1 ATR buffer
Target 1: $243 — near 52-week high resistance ($243.18)
Target 2: $258 — analyst consensus cluster / measured move from base
Risk/Reward: 2.5:1 (T2 basis with $222 stop)

Key Risks:
- AME options markets are less liquid than large-caps; expect wider bid-ask spreads
- Q2 2026 earnings (~late July) may create volatility before T2 is reached
- Hot CPI reading increases risk of rates staying higher, compressing growth multiples
  (AME trades at 35x TTM PE — elevated vs peers)

Fundamental Note:
Record orders (+23%) and record backlog ($3.87B) provide exceptional multi-quarter visibility.
EMG segment margin expanded +380 bps in Q1. FY2026 EPS guidance raised to $7.94–$8.14 (+7–10%
YoY). Revenue growing 11% YoY with 26.8% operating margins. Largest growth driver: AI/data-center
power infrastructure, aerospace/defense electronics, and precision process instrumentation.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 20, 2026 (~38 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long $230 Call / Short $240 Call
  Net Debit: ~$5.20 per spread (~$10.40 mid: long ~$9.20, short ~$4.00)
  Max Profit: ~$4.80 per share × 100 = $480 × 2 = $960
  Max Loss: $5.20 × 100 × 2 = $1,040

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long $225 Put / Short $215 Put
  Net Debit: ~$4.00 per spread (~$6.50 – $2.50)
  Max Profit: ~$6.00 per share × 100 = $600
  Max Loss: $4.00 × 100 = $400

Combined Position:
  Total Debit / Max Loss: ~$1,440
  Expected Payout if thesis is right: +$960 − $400 = +$560
  Expected Payout on violent move against thesis: +$600 − $1,040 = −$440 (partial rescue)
  Main Risk: drift / compression / time decay without directional expansion; wider bid-ask in AME options
```

---

### 2. VZ — Verizon Communications — Volume Collapse at 50-Day EMA + Raised Guidance

```
Ticker: VZ
Current Price: $47.67
Sector: Communication Services (Wireless Telecommunications)
Score: 89/115 (A:40 B:18 C:16 D:15 Ded:0)

Setup Summary:
Verizon's pullback to its 50-day EMA ($47.17) is accompanied by one of the cleanest volume
signatures in the current scan: average daily volume over the past 5 days is 16.58M vs the
20-day average of 22.39M — a 26% decline — indicating institutional distribution has abated and
the pullback is healthy consolidation. VZ reported Q1 2026 results on April 27: EPS $1.28 beat
consensus by $0.07 and revenue of $34.44B grew 2.9% YoY. Most importantly, VZ achieved its
first positive Q1 postpaid phone net additions since 2013 — a notable inflection signal. The
company subsequently raised full-year 2026 adjusted EPS guidance by 5–6%. RSI at 52.5 has
crossed back above 50, triggering the strategy's Trigger B criterion. Stock is recovering from
its May 8 pullback low. Next earnings: July 21, 2026. Safe.

Entry Zone: $47.00–$48.00 (within 50-day EMA band)
Stop Loss: $45.20 — below key EMA50 support and prior swing low structure; ~1-ATR buffer
Target 1: $51.50 — above 52-week high ($50.91); breakout continuation target
Target 2: $55.00 — measured move from multi-month base (approx. 16% from 52-week low recovery)
Risk/Reward: 2.1:1 (T1) | 3.1:1 (T2)

Key Risks:
- 10 analysts revised Q2 estimates lower post-Q1, muting near-term analyst momentum
- Revenue slightly missed consensus ($34.44B vs $34.82B est) — suggests pricing/ARPU pressure
- Rate hike probability rising (hot CPI) could pressure utility-like high-yield names like VZ
  (VZ yield ~6.1% may face headwinds if rates stay higher for longer)

Fundamental Note:
VZ EPS TTM $4.10, forward EPS $5.27 — forward P/E of 9.0x is compelling relative to its peer
group. The first positive postpaid phone net add quarter since 2013 reflects the Tracfone
integration and pricing strategy beginning to bear fruit. Guidance raised suggests management
confidence. However, Verizon remains a slow-growth name; the opportunity is a technical bounce
off the 50 EMA rather than a transformational rerating.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 20, 2026 (~38 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long $47 Call / Short $50 Call
  Net Debit: ~$1.50 per spread (~$2.45 – $0.95)
  Max Profit: ~$1.50 per share × 100 = $150 × 2 = $300
  Max Loss: $1.50 × 100 × 2 = $300

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long $46 Put / Short $43 Put
  Net Debit: ~$1.20 per spread (~$2.20 – $1.00)
  Max Profit: ~$1.80 per share × 100 = $180
  Max Loss: $1.20 × 100 = $120

Combined Position:
  Total Debit / Max Loss: ~$420
  Expected Payout if thesis is right: +$300 − $120 = +$180
  Expected Payout on violent move against thesis: +$180 − $300 = −$120 (partial rescue)
  Main Risk: drift / time decay; VZ may chop around $47–$48 without a clear directional move
  Note: VZ has high options liquidity (OI > 50K on near-dated strikes); spreads should be tight
```

---

### 3. AFL — Aflac Incorporated — Heavy Volume Decline + Buyback-Fueled EPS Growth at 50-Day EMA

```
Ticker: AFL
Current Price: $115.31
Sector: Financial Services (Life & Health Insurance)
Score: 81/115 (A:40 B:18 C:12 D:12 Ded:0)

Setup Summary:
Aflac has pulled back to test its 50-day EMA ($112.73) with a significant volume contraction:
5-day average volume of 1.68M is 25% below the 20-day average of 2.24M — the largest
proportional volume decline among the top scan candidates. RSI sits at 56.9, comfortably in
momentum territory. AFL closed above its 20-day EMA ($114.06) after briefly dipping below
(Trigger A confirmed). The stock is in a multi-month uptrend from $95 to the recent high of
$118.69 (52-week high). Q1 2026 results (April 29): revenue beat ($4.35B vs $4.20B est),
adjusted EPS per share grew 5.4% YoY on strong buyback execution. Next earnings: August 6, 2026.
Safe. Important caveat: analyst consensus target ($112.21) is currently below the market price;
multiple analysts lowered targets following mixed Japan segment results. Entry should be
sized conservatively. If the 52-week high breaks, the technical path clears substantially.

Entry Zone: $114.50–$116.00 (above 20-day EMA, near 50-day EMA)
Stop Loss: $113.00 — tight stop just below 20-day EMA ($114.06); avoids giving up the
            EMA reclaim if reversed
Target 1: $119.50 — above 52-week high ($118.69); momentum breakout
Target 2: $125.00 — measured move extension; still below highest analyst target ($130)
Risk/Reward: 1.8:1 (T1 from mid-entry) | 4.2:1 (T2 from $113 stop)

Key Risks:
- Analyst consensus target ($112.21) is BELOW current price — limited near-term analyst support
- Japan segment weakness: yen impact + Q1 Japan profitability declined YoY (main risk)
- Piper Sandler cut to $125 (from $130), Barclays to $99, Evercore to $109 post-Q1; sentiment
  cut-heavy
- Rate hike risk: higher U.S. rates benefit AFL's investment portfolio but hurt mark-to-market
  in near term

Fundamental Note:
AFL P/E of 13.2x TTM earnings is inexpensive relative to peers. EPS per share growing due to
aggressive buybacks ($1.0B Q1 alone); the company returned $1.3B to shareholders in Q1 2026
alone. Revenue grew 27.9% YoY (partly from investment portfolio mark-to-market gains). The
core U.S. business showed 2.9% sales growth. Capital return program and growing dividend
(consecutive increases since 1983) provide strong fundamental floor. The main risk is the Japan
segment: yen weakness and claims normalization are pressuring Japan profitability.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 20, 2026 (~38 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long $115 Call / Short $120 Call
  Net Debit: ~$2.50 per spread (~$4.50 – $2.00)
  Max Profit: ~$2.50 per share × 100 = $250 × 2 = $500
  Max Loss: $2.50 × 100 × 2 = $500

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long $112 Put / Short $107 Put
  Net Debit: ~$2.00 per spread (~$4.00 – $2.00)
  Max Profit: ~$3.00 per share × 100 = $300
  Max Loss: $2.00 × 100 = $200

Combined Position:
  Total Debit / Max Loss: ~$700
  Expected Payout if thesis is right: +$500 − $200 = +$300
  Expected Payout on violent move against thesis: +$300 − $500 = −$200 (partial rescue)
  Main Risk: stock fails to break 52-week high ($118.69) and drifts back; Japan sentiment
  weighing on shares without a clear near-term catalyst to push past the prior high
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| DE | Best technical setup in the scan: 0.67% above 50-day EMA, RSI 50.2, triggers A+B, volume declining. EXCLUDED from picks due to Q2 earnings on May 21 (8 days — within 3-week hard filter). Deere beat Q1 2026 by 27% and guided strongly; expect to revisit after earnings if stock holds EMA50 | Post-May 21 earnings: entry only if stock holds above 50-day EMA on any post-earnings dip; ideal re-entry zone $570–$582 |
| NEE | NextEra Energy — utilities sector leader, 2.55% above 50-day EMA, RSI 53.8, volume declining 22%. Strong regulatory tailwind from AI data center electricity demand. Near 52-week high ($98.75); limited room to T1 before breakout. Utilities exposed to rate-hike risk given hot CPI print | Pullback to $92–$94 (EMA50 zone); improved R:R on any corrective dip; confirm RSI holds above 50 |
| OKE | ONEOK midstream — 3.15% above 50-day EMA, RSI 54.5, volume flat. Strong dividend yield, benefiting from oil elevated at $102+. Distance from EMA50 slightly exceeds ideal entry range; setup would improve on a 1–2% pullback | Entry zone $86–$87 (closer to EMA50); stop below $84; natural gas and NGL volumes as catalyst |
| D | Dominion Energy — 1.12% above EMA50, RSI 53.4. Good technical setup but analysts revised estimates 5.1% lower in past 30 days and the stock has underwhelming fundamental momentum (GAAP EPS $0.69 vs $0.77 prior year). The Virginia offshore wind regulatory timeline is the key catalyst to monitor | Confirmed analyst estimate revisions stabilising; positive regulatory update on CVOW offshore wind project; earnings ~Aug 1 |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

_No confirmed trades in the log. This is a scheduled/unattended run — no user confirmation possible._

_Prior scheduled run (2026-05-10) suggested MAR ($353.18), JPM ($302.10), and EMR ($141.31). None were logged to CSV (scheduled run). As of 2026-05-13 close: MAR $350.08 (–0.9%), JPM $301.71 (–0.1%), EMR $137.99 (–2.4%) — all above their respective stops. Those suggestions remain valid but are superseded by this run's new picks._

---

## Performance Summary
_All closed trades (outcome recorded)._

_No completed trades recorded yet. April 16 scan returned no tickers (empty run); May 10 and May 13 scans are scheduled/unattended runs with no user-confirmed entries._

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A
