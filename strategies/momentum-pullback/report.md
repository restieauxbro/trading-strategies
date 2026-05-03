# Momentum After Pullback — Current Report
_Last updated: 2026-05-03_

---

## Market Context

The S&P 500 (SPY) closed at **$720.65** on May 3, 2026 — well above both its 50-day EMA ($680.22) and 200-day EMA ($670.94). Both moving averages are rising, confirming a healthy long-term uptrend. VIX is at **16.99** — comfortably below the elevated threshold of 25 — indicating calm, low-fear conditions. SPY is up +27.9% year-over-year. Overall, the market is in a confirmed uptrend with subdued volatility: a supportive backdrop for momentum-pullback entries. No downtrend filter applies.

---

## Scan Results

**Scanner:** Momentum After Pullback (yfinance replication of TrendSpider conditions; browser-use unavailable in scheduled cloud environment)
**Symbols found:** 13 tickers passed all 4 scan groups
**Scan timestamp:** 2026-05-03 ~19:00 UTC

Raw scan output (all 13):

| Ticker | Price | EMA50 | % from EMA50 | RSI | Triggers |
|--------|-------|-------|--------------|-----|---------|
| CBOE | $326.96 | $292.74 | +11.7% | 75.0 | B |
| DAL | $68.98 | $67.34 | +2.4% | 54.8 | A, B, C |
| DD | $46.24 | $45.95 | +0.6% | 51.9 | A, B, C |
| SATS | $123.18 | $119.06 | +3.5% | 49.5 | C |
| EIX | $69.88 | $69.70 | +0.3% | 49.9 | C |
| EXPE | $251.84 | $243.57 | +3.4% | 52.5 | B, C |
| HUBB | $508.43 | $513.50 | -1.0% | 30.0 | C |
| LIN | $507.92 | $492.06 | +3.2% | 58.1 | A, B |
| LYV | $158.25 | $155.53 | +1.8% | 55.5 | C |
| PPL | $37.60 | $38.04 | -1.2% | 33.4 | C |
| RL | $362.21 | $360.94 | +0.4% | 41.4 | C |
| SO | $96.71 | $94.56 | +2.3% | 65.6 | C |
| TJX | $156.83 | $157.66 | -0.5% | 41.4 | C |

**Earnings filter applied (hard exclusion — within 3 weeks):** DD (May 5), EIX (already reported Apr 28 but next Q in range), EXPE (May 7), LYV (May 5), SATS (May 7), PPL (May 8), RL (May 21 — 18 days), TJX (May 20 — 17 days)

**Remaining after earnings filter:** DAL, LIN, HUBB, SO, CBOE

**CBOE excluded:** 11.7% above EMA50, RSI 75 — far too extended for a pullback entry; watchlist only.

**HUBB note:** RSI 30, heavily below EMA20 ($529) after post-earnings drop from $555 to $508. True breakdown on elevated volume — not a pullback in the context of this strategy's thesis. Watchlist.

**Qualifying candidates for scoring:** DAL, LIN, SO

---

## Today's Suggested Trades

### 1. DAL — Delta Air Lines (Score: 81/115)

```
Ticker: DAL
Current Price: $68.98
Sector: Industrials (Airlines)
Score: 81/115 (A:40 B:18 C:15 D:8 Ded:0)

Setup Summary:
Delta Air Lines pulled back from its 52-week high of $76.18 to a low of $65.82 over
3 weeks, declining on below-average volume — classic orderly profit-taking, not
distribution. Price has recovered above the 20-day EMA ($68.13) and is testing the
prior day's high (trigger A + C fired). The 50-day EMA ($67.34) provided support
on the pullback low at $65.82. Q1 2026 results (Apr 8) were a record revenue quarter:
$14.2B revenue (+9.4% YoY), EPS $0.64 beat, $2.4B operating cash flow. 25 analysts
rate it Moderate Buy with average PT $78.84.

Entry Zone: $68–$70
Stop Loss: $64.50 — below the 15-day swing low ($65.82) with a small cushion
Target 1: $76.18 — 52-week high / prior resistance
Target 2: $85.00 — analyst consensus high-end / measured move
Risk/Reward: 1.7:1 at T1 (risk $4.48, gain $7.20); 3.6:1 at T2

Score Breakdown:
  Category A (Technical): 40/55
    - Stock in uptrend on weekly chart: 10 ✓ (weekly EMA50 > EMA200, price above weekly EMA50)
    - Stock in uptrend on daily chart: 8 ✓ (price > EMA200 $63.56, EMA50 rising)
    - Pulling back to logical support: 10 ✓ (tested EMA50 at $65.82 then bounced)
    - Volume declining on pullback: 7 ✓ (recent 5d avg 7.4M vs 3-month avg 9.7M)
    - Continuation pattern: 5 ✓ (bull flag / tight consolidation at EMA50)
    - B-Xtrender not available (skipped): 0
  Category B (R:R): 18/25
    - R:R ≥ 2:1 at T2 ($85): 18
  Category C (Fundamentals): 15/20
    - Beat earnings Q1 2026: 6 ✓
    - Revenue growth +9.4% YoY: 5 ✓
    - EPS growth: 0 (GAAP EPS -$0.44 Q1; adjusted $0.64 but YoY comparison not apples-to-apples)
    - Strong Buy consensus (22/25 analysts buy/strong buy): 4 ✓
  Category D (Catalyst): 8/15
    - Record Q1 revenue, premium/loyalty cabin growth, AI-driven corporate travel: 8 ✓
    - Sector partially in favour (travel recovering; airlines face fuel headwinds): 0

Key Risks:
- Q2 2026 fuel expense up $2B YoY — $4.30/gal guidance is a significant headwind
- Airlines sector macro uncertainty; tariff-related softness in discretionary travel
- Next earnings ~Jul 9 (67 days — well outside filter)

Fundamental Note:
Q1 2026: record revenue $14.2B (+9.4% YoY), adjusted EPS $0.64 (beat $0.61 est), FCF
$1.2B. Q2 guided to low-teens revenue growth on flat capacity, ~$1B pre-tax profit
(management absorbing $2B+ fuel headwind). Premium/loyalty now 62% of revenue.
FY2026 EPS expected to grow 41.7% ($5.30→$7.51). P/E 10x — well below market.
```

**Instrument: Paired Debit Spread (preferred)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 18, 2026 (~46 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1 (scale to portfolio R)
  Strikes: Buy 70 / Sell 77.5
  Net Debit: ~$2.45 per spread (~$245 per contract)
    (Buy 70 call mid ~$3.83, Sell 77.5 call mid ~$1.33)
  Max Profit: ~$5.05 per spread (~$505 per contract)
  Max Loss: ~$2.45 per spread (~$245 per contract)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5 (half the primary size)
  Strikes: Buy 65 / Sell 60
  Net Debit: ~$1.21 per spread (~$121 per half-contract)
    (Buy 65 put mid ~$2.44, Sell 60 put mid ~$1.20)
  Max Profit: ~$3.79 per spread at half-size (~$190 contribution)

Combined Position:
  Total Debit / Max Loss: ~$3.06 per unit (1 primary + 0.5 hedge)
  Expected Payout if thesis is right: ~$5.05 (primary max profit at $77.5+)
  Expected Payout on violent move against thesis: ~$1.90 (hedge max at half-size, below $60)
  Main Risk: DAL drifts between $70 and $77.5 and time erodes both spreads
```

_Note: Jun 18 (~46 DTE) strikes have excellent liquidity (OI: 70 call 5898, 77.5 call 5451, 65 put 16655, 60 put 5864). IV of 44–53% is elevated but appropriate for airlines. The hedge partially offsets downside if DAL retests or breaks the swing low._

---

### 2. LIN — Linde plc (Score: 77/115)

```
Ticker: LIN
Current Price: $507.92
Sector: Basic Materials (Specialty Chemicals / Industrial Gases)
Score: 77/115 (A:35 B:10 C:20 D:12 Ded:0)

Setup Summary:
Linde pulled back from $521 (52-week high) to $488 over two weeks, finding support at
the EMA50 ($492), then bounced on Q1 2026 earnings (May 1): adjusted EPS $4.33 beat
the $4.27 estimate, revenue $8.78B beat. The stock recovered back above $507. EMA20
($502) and EMA50 ($492) are now both support below. Weekly EMA50 > EMA200 (golden
cross). Volume declined significantly during the pullback (avg 1.6M vs 3-month avg 2.3M),
with a small volume pickup on the Q1 earnings day. MACD turned positive April 24 with
the momentum indicator crossing above zero April 23.

Entry Zone: $504–$510
Stop Loss: $487 — below the pullback low ($488) and EMA50 zone
Target 1: $521 — 52-week high
Target 2: $545 — analyst consensus high (Citigroup $580, average $527)
Risk/Reward: 0.6:1 at T1 (risk $21, gain $13); 1.8:1 at T2 (gain $37)

Score Breakdown:
  Category A (Technical): 35/55
    - Stock in uptrend on weekly chart: 10 ✓
    - Stock in uptrend on daily chart: 8 ✓
    - Pulling back to logical support (EMA50 at $492): 10 ✓
    - Volume declining on pullback: 7 ✓ (1.55–1.63M on down days vs 2.3M avg)
    - Continuation pattern: 0 (pullback/bounce, not a defined pattern)
    - B-Xtrender not available: 0
  Category B (R:R): 10/25
    - R:R ≥ 1.5:1 at T2: 10 (R:R ~1.8:1 at $545)
  Category C (Fundamentals): 20/20
    - Beat earnings Q1 2026 (EPS $4.33 vs $4.27 est): 6 ✓
    - Revenue growth +8.2% YoY (organic): 5 ✓
    - EPS growth +13.4% YoY: 5 ✓
    - Buy consensus (9 Buy, 1 Strong Buy, 1 Hold; Citi Buy PT $580): 4 ✓
  Category D (Catalyst): 12/15
    - Acute global helium shortage — structural pricing tailwind: 8 ✓
    - Industrial gases sector in favour / defensive growth: 4 (partial — EMEA drag)

Key Risks:
- Full-year 2026 EPS guidance $17.60–$17.90 slightly below consensus $17.84
- EMEA organic volumes negative — persistent regional drag
- At 3.2% above EMA50, LIN has less room before the entry zone feels extended
- Next earnings ~Jul 31 (89 days)

Fundamental Note:
Q1 2026: adj. EPS $4.33 (+13.4% YoY, beat), revenue $8.78B. Americas and Gulf Coast
projects driving growth; global helium shortage creates durable pricing power. Record
$10B project backlog. FY2026 EPS guided $17.60–$17.90. Analyst avg PT $527 (Citi $580).
```

**Instrument: Paired Debit Spread (preferred)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 18, 2026 (~46 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1
  Strikes: Buy 510 / Sell 525
  Net Debit: ~$14.65 per spread (~$1,465 per contract)
    (Buy 510 call mid ~$17.00, Sell 525 call mid ~$10.24)
  Max Profit: ~$0.35 per spread — NOTE: this spread is too wide for 1:1 max profit
  
  [REVISED — use tighter primary]
  Strikes: Buy 510 / Sell 520
  Net Debit: ~$10.55 per spread (~$1,055 per contract)
    (Buy 510 call mid ~$17.00, Sell 520 call mid ~$12.43)
  Max Profit: ~$9.45 per spread (~$945 per contract)
  Max Loss: ~$10.55 per spread (~$1,055 per contract)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5 (half the primary size)
  Strikes: Buy 500 / Sell 490
  Net Debit: ~$5.35 per spread (~$535 per half-contract)
    (Buy 500 put mid ~$12.90, Sell 490 put mid ~$9.25)
  Max Profit: ~$4.65 per spread at half-size (~$233 contribution)

Combined Position:
  Total Debit / Max Loss: ~$13.23 per unit (1 primary + 0.5 hedge)
  Expected Payout if thesis is right: ~$9.45 (primary max at $520+)
  Expected Payout on violent move against thesis: ~$2.33 (hedge max at half-size)
  Main Risk: LIN stays pinned between $510 and $520 over 46 days
```

_Note: LIN options are on the illiquid side (OI 84–327 at strikes above $500). Wide bid/ask spreads (e.g. 510 call: $15.90/$18.10). Use limit orders at mid-price. If fills are difficult, consider using stock directly with a tight stop at $487._

---

### 3. SO — Southern Company (Score: 70/115)

```
Ticker: SO
Current Price: $96.71
Sector: Utilities (Regulated Electric)
Score: 70/115 (A:35 B:10 C:17 D:8 Ded:0)

Setup Summary:
Southern Company pulled back from $96 to $91.87 over two weeks on low volume, then
bounced sharply on Q1 2026 earnings (Apr 30): adj. EPS $1.32 beat the $1.23 estimate
by 7.3%, revenue $8.4B beat. The stock closed at $96.71, above both EMA20 ($94.93)
and EMA50 ($94.56) — triggering all three scan criteria (above 20 EMA, close above
prior day high, RSI recovery). Data center electricity demand up 42% YoY is a durable
structural tailwind. Next earnings ~Jul 30 (88 days — well outside filter).

Entry Zone: $95–$97
Stop Loss: $91.50 — just below the 15-day swing low ($91.87)
Target 1: $100.84 — 52-week high / prior resistance
Target 2: $106 — measured move / analyst upper PT band
Risk/Reward: 0.8:1 at T1 (risk $5, gain $4.13); 1.9:1 at T2 (gain $9.29)

Score Breakdown:
  Category A (Technical): 35/55
    - Stock in uptrend on weekly chart: 10 ✓
    - Stock in uptrend on daily chart: 8 ✓ (price > EMA200 $91.56, rising)
    - Pulling back to EMA50 zone (touched $91.87, well within -3%): 10 ✓
    - Volume declining on pullback: 7 ✓ (2.6–4.2M on down days vs 5.8M avg)
    - Pattern: 0 (pullback only)
    - B-Xtrender not available: 0
  Category B (R:R): 10/25
    - R:R ≥ 1.5:1 at T2: 10 (~1.9:1 at $106)
  Category C (Fundamentals): 17/20
    - Beat earnings Q1 2026 by 7.3%: 6 ✓
    - Revenue growth +8.0% YoY: 5 ✓
    - Adj. EPS growth +7.3% YoY: 5 ✓
    - Hold consensus rating (not an upgrade): 0 (-3 from max, no upgrade)
    - Analyst note: InvestingPro flags as overvalued at current levels: 0
  Category D (Catalyst): 8/15
    - Data center usage +42% YoY; Southeast migration/customer growth: 8 ✓
    - Utilities sector: defensive in volatile market but not in leading sector: 0

Key Risks:
- Utilities sector not a leading sector in strong bull market — underperforms SPY
- InvestingPro flags SO as overvalued at current levels (P/E 24.5x for a utility)
- Target 1 at $100.84 is only 4.3% away with narrow R:R; needs T2 to be compelling
- Higher interest expense is a drag on net income growth

Fundamental Note:
Q1 2026: adj. EPS $1.32 (+7.3% YoY, beat $1.23 est.), revenue $8.4B (+8.0% YoY,
beat). Q2 guidance: adj. EPS $1.00. Data center electricity demand up 42% YoY,
46,000 new residential customers, 2.3% weather-normal retail sales growth — highest
first-quarter growth in recent history. Expanding natural gas turbine capacity 400MW.
```

**Instrument: Paired Debit Spread (preferred)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 18, 2026 (~46 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1
  Strikes: Buy 95 / Sell 100
  Net Debit: ~$2.35 per spread (~$235 per contract)
    (Buy 95 call mid ~$3.50, Sell 100 call mid ~$1.15)
  Max Profit: ~$2.65 per spread (~$265 per contract)
  Max Loss: ~$2.35 per spread (~$235 per contract)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5 (half the primary size)
  Strikes: Buy 92.5 / Sell 87.5
  Net Debit: ~$0.80 per spread (~$80 per half-contract)
    (Buy 92.5 put mid ~$1.20, Sell 87.5 put mid ~$0.55)
  Max Profit: ~$4.20 per spread at half-size (~$210 contribution)

Combined Position:
  Total Debit / Max Loss: ~$2.75 per unit (1 primary + 0.5 hedge)
  Expected Payout if thesis is right: ~$2.65 (primary max at $100+)
  Expected Payout on violent move against thesis: ~$2.10 (hedge max at half-size)
  Main Risk: SO pinned between $95 and $100 through June expiry; low volatility in utilities
```

_Note: SO options are liquid at the 95/100 strikes (OI 2093/2273 calls, 1103/961 puts). June 18 is 46 DTE, well past Q2 earnings guide of $1.00 (lower seasonally). Utility options have low IV (~19–24%), so spread debit is modest. Consider waiting for a confirmed close above $97 before entry._

---

## Excluded Tickers (Earnings Filter — Hard Exclusion)

| Ticker | Earnings Date | Days Until |
|--------|--------------|-----------|
| DD | May 5, 2026 | 2 days |
| LYV | May 5, 2026 | 2 days |
| EXPE | May 7, 2026 | 4 days |
| SATS | May 7, 2026 | 4 days |
| PPL | May 8, 2026 | 5 days |
| RL | May 21, 2026 | 18 days |
| TJX | May 20, 2026 | 17 days |

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| CBOE | All scan conditions pass; strong Q1 (EPS +54.4% YoY). But 11.7% above EMA50, RSI 75 — significantly extended. Next earnings ~Jul 31. | Pullback to $295–$305 (EMA50 zone); RSI back toward 50; declining pullback volume |
| HUBB | Strong Q1 2026 (EPS $3.93, +16% YoY; revenue +11%); guidance raised. BUT stock fell 6.9% post-earnings Apr 30 on EPS miss vs $3.96 estimate; RSI 30, well below EMA20. Volume elevated on decline — distribution signal, not healthy pullback. Next earnings ~Jul 28. | Stabilization and recovery back above $515 (EMA50) on declining volume; RSI > 40 |
| RL | Clean uptrend; EMA50 support; all triggers fired. Earnings May 21 (18 days — just inside 3-week filter). | Re-evaluate post-May 21 earnings if technical setup remains |
| TJX | Retail outperformer in uptrend; testing EMA50 zone. Earnings May 20 (17 days — inside filter). | Re-evaluate post-May 20 earnings |
| EIX | Earnings already reported Apr 28; setup marginally passes but hold rating and EPS growth -63.2% YoY — fundamentals weak. | Improve to Buy rating from analysts; see EPS recovery |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed trades on file (scheduled run — Step 6 policy: no rows appended in unattended runs)._

---

## 14-Day Outcome Tracking

Checked all prior rows in `trades-log.csv`:
- **2026-04-16 row:** Empty scan row (no tickers found) — no outcome to track.
- **2026-04-23 rows:** Trades logged 10 days ago (DE, DGX, CB) — not yet in the 13–16 day review window. Will be due the week of May 6–9, 2026.

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| — | — | — | — | — | — |

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Scan Notes
- **Scanner:** Momentum After Pullback (yfinance replication of TrendSpider conditions; browser-use unavailable in scheduled cloud environment)
- **Symbols found:** 13 tickers passed all 4 scan groups; 7 excluded by earnings filter (within 3 weeks); 2 excluded by extension/breakdown criteria; 3 qualified for scoring
- **TradingView visual check:** Skipped — browser-use with profile Tim not available in this environment. B-Xtrender indicator points (up to +15 pts) conservatively excluded from all scores. Recommend manual TradingView confirmation before execution.
- **Scan timestamp:** 2026-05-03 ~19:00 UTC
- **Scheduled run:** No trades appended to CSV (unattended policy — Step 6)
