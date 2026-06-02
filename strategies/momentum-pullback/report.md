# Momentum After Pullback — Current Report
_Last updated: 2026-06-02_

---

## Market Context

The S&P 500 (SPY at $759.40) is in a confirmed uptrend, sitting **+11.7% above its 200-day MA** and **+7.3% above its 50-day MA**, while VIX at 15.81 signals a low-fear, risk-on environment. The Nasdaq (QQQ) is even stronger at +20.5% vs its 200-day MA, and small-caps (IWM) are participating (+14.8% vs 200-day MA). This is one of the healthiest market backdrops the strategy has seen — a rising tide across all caps with no macro stress signals. The primary risk for pullback entries is that many S&P 500 constituents are extended well above their 50-day EMAs, meaning clean pullback setups are selective. This run identified **33 tickers** passing all scan criteria via a yfinance-based screen (the TrendSpider browser-based scanner was unavailable in this environment; the yfinance scan applied equivalent EMA, golden-cross, rising-trend, and ±3%-of-50-EMA conditions and returned substantially the same logic). The top three qualifiers — MRK, EOG, and C — are positioned for unattended-run suggestions.

> **Note on TradingView visual check (Step 4b):** `browser-use` is unavailable in this scheduled run environment. B-Xtrender readings (background bars, signal-line dots, histogram) are estimated from RSI dynamics and EMA momentum as proxies. Confirm visuals at `tradingview.com/chart/z25AhAlV` before any live entry.

---

## Today's Suggested Trades

### 1. MRK — Merck & Co. | Healthcare

```
Ticker: MRK
Current Price: $116.56
Sector: Healthcare | Drug Manufacturers – General
Score: 101/115 (A:48 B:18 C:20 D:15 Ded:0)

Setup Summary:
MRK pulled back from its ASCO-catalyst spike ($107 → $122 over 3 weeks) and is now
resting precisely on the daily 50-day EMA ($115.37, only 0.1% away), in a confirmed
weekly and daily uptrend. RSI at 58 shows positive momentum without being overbought.
A hard FDA PDUFA catalyst (KEYTRUDA + WELIREG) is scheduled June 19 — inside the
next two weeks — providing a near-term binary event with recent positive ASCO data as
the tailwind. The pullback looks healthy: orderly consolidation below the ASCO spike
high, not a breakdown.

Entry Zone: $114–$117 (at/near 50-day EMA)
Stop Loss: $112.00 — below swing-low support and >1 ATR below 50-day EMA
Target 1: $124.00 — prior ASCO spike high / 52-week high
Target 2: $132.00 — analyst consensus zone (Goldman $137 target; street mean $127)
Risk/Reward: 2.2:1 (T1)  |  4.4:1 (T2)

Key Risks:
- FDA PDUFA June 19 for KEYTRUDA+WELIREG: positive = catalyst; negative = gap down
- GARDASIL/China headwinds remain; Q2 earnings Aug 4 (well beyond 3-week window)
- Volume on pullback slightly elevated (1.10x 20-day avg) — not fully confirming

Fundamental Note:
Merck beat Q1 2026 estimates and raised full-year revenue guidance to $65.8–$67B.
Forward PE of 12.2x is cheap for a pharma of this calibre; Goldman Sachs raised its
target to $137 and the ASCO 2026 data broadly confirmed the oncology pipeline thesis.
No insider selling in the last 30 days (February sells were at higher prices and are
now outside the 30-day window).
```

**Instrument — Paired Debit Spread (Bullish)**
```
Expiry: June 26, 2026 (~24 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 116 / Short 121
  Net Debit: ~$2.35 per spread (~$4.70 total)
  Max Profit: ~$2.65 per spread (~$5.30 total)
  Max Loss: ~$2.35 per spread (~$4.70 total)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half)
  Strikes: Long 114 / Short 109
  Net Debit: ~$2.25 per spread (~$2.25 total)
  Max Profit: ~$2.75 per spread (~$2.75 total)
  Max Loss: ~$2.25

Combined Position:
  Total Debit / Max Loss: ~$6.95 (×100 = $695 per unit)
  Expected Payout if thesis is right (MRK > $121): ~+$3.05 (+44%)
  Expected Payout on violent move against thesis (MRK < $109): ~-$1.95 (-28%)
  Main Risk: MRK drifts sideways between $109–$121; both spreads expire worthless
```

---

### 2. EOG — EOG Resources | Energy (E&P)

```
Ticker: EOG
Current Price: $139.05
Sector: Energy | Oil & Gas E&P
Score: 93/115 (A:48 B:18 C:20 D:12 Ded:-5)

Setup Summary:
EOG pulled back sharply from its recent high of $144 to a low of $133 (-7.5%), tagging
the daily 50-day EMA to within 0.2% before bouncing cleanly back to $139. The daily
and weekly uptrend structures are fully intact (weekly EMA50 well above EMA200, 200-day
EMA rising). RSI at 58 is neutral-positive. EOG beat Q1 2026 EPS by +$0.18 on revenue
+12% above estimates, raised full-year oil production guidance, and is tracking a record
$8.5B FCF year at current strip pricing with a sub-$50 WTI breakeven.

Entry Zone: $136–$140 (near/at 50-day EMA bounce zone)
Stop Loss: $132.00 — below recent swing low ($133.38) and well below 50-day EMA
Target 1: $150.00 — prior 52-week high / resistance
Target 2: $158.00 — measured move (prior base width added above breakout)
Risk/Reward: 2.2:1 (T1)  |  3.6:1 (T2)

Key Risks:
- Director sold 1,887 shares on May 28 at $136.17 (within 30 days) — applied -5 deduction
- Energy sector subject to WTI oil price volatility; EOG stock dipped post-earnings "sell the news"
- Roth MKM (Hold) and Morgan Stanley (Hold) counterbalance the Wells Fargo Buy
- Q2 2026 earnings projected Aug 6 — well beyond 3-week restriction

Fundamental Note:
EOG is one of the highest-quality E&P operators: 37 consecutive years of dividends
(yield 3.04%), $1.5B Q1 free cash flow, and a three-year scenario delivering 15–25%
ROCE at conservative $60–80 WTI. Forward PE of 9.5x and EPS growth +39.6% YoY make
this undervalued for its operational quality. The director insider sale is modest
(1,887 shares out of 63,160 held = ~3%) and likely routine.
```

**Instrument — Paired Debit Spread (Bullish)**
```
Expiry: June 26, 2026 (~24 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 140 / Short 145
  Net Debit: ~$2.30 per spread (~$4.60 total)
  Max Profit: ~$2.70 per spread (~$5.40 total)
  Max Loss: ~$2.30 per spread (~$4.60 total)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half)
  Strikes: Long 137 / Short 132
  Net Debit: ~$2.45 per spread
  Max Profit: ~$2.55 per spread

Combined Position:
  Total Debit / Max Loss: ~$7.05 (×100 = $705 per unit)
  Expected Payout if thesis is right (EOG > $145): ~+$2.95 (+42%)
  Expected Payout on violent move against thesis (EOG < $132): ~-$2.05 (-29%)
  Main Risk: EOG pinned between $132–$145 at expiry; oil price chop
```

---

### 3. C — Citigroup | Financial Services

```
Ticker: C
Current Price: $131.22
Sector: Financial Services | Banks – Diversified
Score: 91/115 (A:48 B:10 C:20 D:13 Ded:0)

Setup Summary:
Citigroup completed Project Bora Bora and reported a landmark Q1 2026: EPS $3.06 vs
$2.65 estimate (+16%), revenue +14% YoY, and ROTCE of 13.1% — finally exceeding the
long-stated 11–12% target. The stock hit a 20-year high after earnings and has since
consolidated just below it, forming a tight base. In the last 5 days, C touched to
within 1.7% of its 50-day EMA ($123.33) before bouncing back to $131, demonstrating
strong support at the EMA zone. RSI of 60 is positive without being overbought.

Entry Zone: $129–$132 (momentum entry, above 50-day EMA)
Stop Loss: $121.50 — below 50-day EMA with buffer
Target 1: $145.00 — analyst mean target (GS $151, Oppenheimer $145, KBW $150)
Target 2: $151.00 — Goldman Sachs price target
Risk/Reward: 1.6:1 (T1)  |  2.0:1 (T2)

Key Risks:
- Price already 6.4% above 50-day EMA — entered pullback but bounced hard (less ideal entry)
- Q2 2026 earnings July 14 (~42 days) — well beyond 3-week restriction but check positioning
- Regional banking macro sensitivity; tariff/rate environment uncertainty
- R:R to T1 is 1.6:1 (lowest of the three picks)

Fundamental Note:
C has the strongest EPS growth of the three picks (+56.1% YoY, Q1 GAAP $3.06 vs $1.96).
Revenue growth of +15.9%, a $30B buyback program, and Wall Street finally re-rating the
stock (Moderate Buy consensus with multiple targets at $140–$151) make this a genuine
turnaround-momentum play. Forward PE of 10.5x is still cheap vs. peers even at 20-year
high price levels.
```

**Instrument — Paired Debit Spread (Bullish)**
```
Expiry: June 26, 2026 (~24 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 131 / Short 136
  Net Debit: ~$2.25 per spread (~$4.50 total)
  Max Profit: ~$2.75 per spread (~$5.50 total)
  Max Loss: ~$2.25 per spread (~$4.50 total)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half)
  Strikes: Long 129 / Short 124
  Net Debit: ~$2.20 per spread
  Max Profit: ~$2.80 per spread

Combined Position:
  Total Debit / Max Loss: ~$6.70 (×100 = $670 per unit)
  Expected Payout if thesis is right (C > $136): ~+$3.30 (+49%)
  Expected Payout on violent move against thesis (C < $124): ~-$1.70 (-25%)
  Main Risk: C drifts sideways; time decay erodes both spreads
```

---

## Watchlist
_Constructive scan/research but no immediate entry this run._

| Ticker | Why Watching | Trigger to Revisit |
|--------|-------------|-------------------|
| BKR | Baker Hughes: Right at 50-day EMA (0.4% dist), RSI=46, energy services with LNG & AI data-center cooling exposure. Earnings growth 132% YoY. Full scan pass. | Entry on bounce back above 50-day EMA with volume and RSI crossing above 50 |
| PNC | PNC Financial: 1.8% above 50-day EMA, RSI=59, solid regional bank (rev growth +14%, EPS +18%). Near-pass — 50-day EMA declining slightly over 20 days but already bending up. | Wait for 50-day EMA to turn higher; entry on next pullback to EMA zone |
| EQIX | Equinix: Data-center REIT at 3.0% above 50-day EMA, RSI=48, declining pullback volume (0.88x) — healthy consolidation. AI/colocation tailwind. No timing trigger this session. | Entry on volume expansion + close above recent high ($1,080+) |
| ETN | Eaton Corp: Industrial/electrification play, 5.9% above 50-day EMA, RSI=58, declining volume on pullback (0.79x = healthy). Full scan pass but price extended from 50-day EMA. | Wait for a deeper pullback to the $400–$405 / 50-day EMA zone |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

_No open trades. Previous run (2026-04-16) returned an empty scan (browser-use unavailable); no positions were confirmed._

---

## Performance Summary
_All closed trades (outcome recorded)._

_No closed trades on record. Strategy log only contains the April 16 empty-scan placeholder row._

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A
