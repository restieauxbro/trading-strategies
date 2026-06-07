# Momentum After Pullback — Current Report
_Last updated: 2026-06-07_

---

## Market Context

The S&P 500 (SPY) closed at **$737.55**, sitting **8.21% above its 200-day MA ($681.56)** and **3.4% above its 50-day MA ($713.51)**, just 2.9% off the 52-week high of $759.57. The market is in a **confirmed uptrend** — this is a constructive backdrop for momentum continuation trades. VIX printed **21.51** (5-day average 16.96), modestly elevated but well below the 25 threshold that would trigger stricter filters. The primary near-term macro risk is the June 10–11 CPI/PPI data and a Fed meeting on June 16–17. No confirmed market downtrend; standard filters apply.

---

## Scan Results

**Scanner:** Momentum after pullback (yfinance implementation of TrendSpider scan conditions)
**Timestamp:** 2026-06-07 19:02 UTC
**Symbols found (24):** NVDA, GOOGL, XOM, COST, MRK, CVX, KO, LIN, PM, PLD, UNP, EOG, MO, CI, CL, NSC, GD, ETN, PNC, MCHP, WELL, AFL, FANG, OKE

> ⚠️ **TradingView visual check (Step 4b):** `browser-use` is unavailable in this cloud environment. B-Xtrender indicators could not be confirmed from chart captures. B-Xtrender scoring is estimated from price action, scan conditions (all passes include rising EMA(200) and EMA(50), and weekly golden cross), and recent news. Scores in Category A for B-Xtrender items are conservative. Recommend visual confirmation before opening positions.

---

## Today's Suggested Trades

### 1. ETN — Eaton Corporation (Industrials / Power Management)

```
Ticker: ETN
Current Price: $395.94
Sector: Industrials — Specialty Industrial Machinery
Score: 95/115 (A:49 B:18 C:18 D:15 Ded:-5)

Setup Summary:
ETN has pulled back cleanly to its 50-day EMA ($395.67), with volume declining over the
past 5 days vs the 20-day average (2.20M vs 2.59M avg) — a hallmark of healthy consolidation.
One trigger fired: close above prior day high. Q1 2026 results were a record: revenue +17% YoY
to $7.5B, organic growth +10% (above the top of prior guidance), and backlog growth of 48% in
the Electrical sector driven by AI data center demand. Management raised full-year organic
growth guidance to 9–11%. Multiple analysts upgraded targets in May 2026 (Citi $471, Evercore
$453, JPMorgan $445). This is the strategy's highest-conviction setup this run.

Entry Zone: $390–$400 (EMA50 area)
Stop Loss: $375.00 — below 10-bar swing low ($380.56) with buffer
Target 1: $434.00 — prior 60-day high / prior resistance
Target 2: $460.00 — within analyst target range ($445–$471)
Risk/Reward: 2.1:1 to T1 (entry $396, stop $375, T1 $434) | 3.0:1 to T2

Key Risks:
- Insider selling has picked up (noted in analyst commentary) — apply -5 pt deduction
- Heavy dependence on U.S. AI data center and mega-project spending
- High valuation (38.7x trailing PE; forward PE 25.2x)
- Earnings already reported (Q1 May 5) — no near-term earnings risk

Fundamental Note:
Record Q1 2026 beat with revenue of $7.45B vs $7.14B consensus (+4.3% beat). Adjusted EPS
$2.81, a quarterly record. Closed $11B in strategic acquisitions in Q1 including Boyd Thermal
(liquid cooling for AI data centers). Revenue growth +16.8% YoY; adjusted EPS growing +10%
despite reported EPS decline due to acquisition charges.
```

**Instrument: Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: Jul 17, 2026 (~40 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $400C / Sell $420C
  Net Debit: ~$9.10 per spread (~$910 per contract)
  Max Profit: ~$10.90 per spread (~$2,180 combined)
  Max Loss: ~$9.10 per spread (~$1,820 combined)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy $390P / Sell $370P
  Net Debit: ~$9.70 per spread (~$970)
  Max Profit: ~$10.30 per spread (~$1,030)
  Max Loss: ~$9.70 per spread (~$970)

Combined Position:
  Total Debit / Max Loss: ~$2,790
  Expected Payout if ETN > $420: +$2,180 − $970 = +$1,210
  Expected Payout if ETN < $370: +$1,030 − $1,820 = −$790 (hedge absorbs ~43% of primary loss)
  Main Risk: ETN drifts between $370–$400 — both spreads decay to zero
```

---

### 2. GD — General Dynamics (Industrials / Aerospace & Defense)

```
Ticker: GD
Current Price: $346.44
Sector: Industrials — Aerospace & Defense
Score: 88/115 (A:42 B:18 C:20 D:13 Ded:-5)

Setup Summary:
GD has pulled back to its 50-day EMA (+1.35% above, near-EMA zone) and fired all three
momentum triggers: recrossed above 20 EMA, RSI crossed back above 50, and closed above prior
day high. RSI is at 55.5 — modestly constructive without being overbought. The defense sector
is in strong favor with geopolitical tailwinds driving budget increases globally. Analyst mean
target of $392 represents 13% upside. Solid EPS and revenue growth (+12% and +10.3% YoY).
Volume is neutral — slightly above the 20-day average, which is the main technical caution.

Entry Zone: $344–$350 (at / near EMA50 area)
Stop Loss: $330.00 — below 20-bar swing low ($333.29) with buffer
Target 1: $375.00 — above prior 60-day high ($358.16), measured move target
Target 2: $395.00 — analyst target mean
Risk/Reward: 2.1:1 to T1 (entry $346, stop $330, T1 $375) | 3.1:1 to T2

Key Risks:
- Recent insider selling: CEO Novakovic sold $11.7M in March; EVP Burns sold $25M in May.
  These are exercise-and-sell transactions, but the frequency is notable. Apply -5 pt deduction.
- Ajax armored vehicle program remains a background risk for cost overruns
- No near-term earnings catalyst (reported ~40 days ago)
- Volume not declining on pullback — preferred entry would be on a down-volume day

Fundamental Note:
EPS +12% YoY, revenue +10.3% YoY. Defense contracts remain robust. Analyst mean target $392
vs current $346. Strong backlog driven by Gulfstream jet deliveries and defense orders.
Earnings already reported; next expected in late July 2026.
```

**Instrument: Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: Jul 17, 2026 (~40 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $340C / Sell $360C
  Net Debit: ~$8.40 per spread (~$840 per contract)
  Max Profit: ~$11.60 per spread (~$2,320 combined)
  Max Loss: ~$8.40 per spread (~$1,680 combined)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy $350P / Sell $330P
  Net Debit: ~$10.00 per spread (~$1,000)
  Max Profit: ~$10.00 per spread (~$1,000)
  Max Loss: ~$10.00 per spread (~$1,000)

Combined Position:
  Total Debit / Max Loss: ~$2,680
  Expected Payout if GD > $360: +$2,320 − $1,000 = +$1,320
  Expected Payout if GD < $330: +$1,000 − $1,680 = −$680 (hedge absorbs ~40% of primary loss)
  Main Risk: GD drifts between $330–$340 — both spreads decay to zero
```

---

### 3. OKE — ONEOK, Inc. (Energy / Midstream Natural Gas)

```
Ticker: OKE
Current Price: $88.25
Sector: Energy — Oil & Gas Midstream
Score: 79/115 (A:46 B:10 C:18 D:8 Ded:-3)

Setup Summary:
OKE is a midstream fee-based natural gas pipeline company — meaningfully less exposed to oil
price fluctuations than E&P names like XOM or CVX. The stock has pulled back to its 50-day
EMA (+0.86% above), volume is declining (3.03M vs 3.82M 20-day avg), and all three momentum
triggers fired. RSI 49.6 is neutral to slightly oversold. Q1 2026 beat expectations: net
income +12% YoY, adjusted EBITDA +13%, NGL volumes +15%. Management raised 2026 guidance
midpoints across all metrics. Prior 60-day high of $96.07 is the natural T1.

Entry Zone: $87.00–$90.00 (EMA50 zone)
Stop Loss: $83.50 — below 10/20-bar swing low ($83.57)
Target 1: $96.00 — prior 60-day high (prior resistance)
Target 2: $103.00 — measured move from base ($88 + ($96 - $80.29))
Risk/Reward: 1.6:1 to T1 (entry $88.25, stop $83.50, T1 $96) | 3.1:1 to T2

Key Risks:
- Broader energy sector sentiment remains cautious due to Iran ceasefire hopes and
  potential oil price decline (OKE less affected as fee-based, but sentiment risk remains)
- Revenue: Q1 2026 $9.62B vs $9.68B consensus — slight miss on top line
- Net debt/EBITDA 4.2x — elevated leverage for midstream
- Earnings reported ~40 days ago; next in early August 2026

Fundamental Note:
Q1 2026 net income +12% to $776M, adjusted EBITDA +13% to $2.0B. Raised 2026 guidance: net
income midpoint $3.5B, adjusted EBITDA midpoint $8.25B. NGL throughput +15%, refined products
+12%. EnLink and Medallion integrations on track. Fwd PE 14.3x is attractive for quality
midstream with fee-based cash flows. Analyst mean target $95.48 (analyst rating 2.13).
```

**Instrument: Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: Jul 17, 2026 (~40 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 5 contracts (scaled for comparable dollar risk to ETN/GD)
  Strikes: Buy $90C / Sell $95C
  Net Debit: ~$1.95 per spread (~$975 combined for 5)
  Max Profit: ~$3.05 per spread (~$1,525 combined for 5)
  Max Loss: ~$1.95 per spread (~$975 combined)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 3 contracts
  Strikes: Buy $85P / Sell $80P
  Net Debit: ~$1.45 per spread (~$435 combined for 3)
  Max Profit: ~$3.55 per spread (~$1,065 combined for 3)
  Max Loss: ~$1.45 per spread (~$435 combined)

Combined Position:
  Total Debit / Max Loss: ~$1,410
  Expected Payout if OKE > $95: +$1,525 − $435 = +$1,090
  Expected Payout if OKE < $80: +$1,065 − $975 = +$90 (hedge nearly offsets all loss!)
  Main Risk: OKE stays between $80–$90 — both spreads decay, net loss ≈ full debit
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing/extension)._

| Ticker | Why Watching | Trigger to Revisit |
|--------|-------------|-------------------|
| NVDA | Near EMA50 (−0.74%), strong AI/GPU fundamentals (EPS +214%, Rev +85%), oversold RSI 44. All 3 triggers. But Senate hearing June 11 on China chip exports creates near-term regulatory uncertainty. Volume was NOT declining (institutional accumulation or panic selling?). | Wait for Senate hearing resolution (June 11). Entry on confirmed close above $210 with declining volume. |
| GOOGL | Strong fundamentals (EPS +82%, Rev +21.8%), near EMA50 (+2.03%), 80+ days to earnings. Only 1 trigger fired; volume not declining (increased volume on bounce). Target $431 = 17% upside. | Re-entry on RSI cross above 50 + recross above 20 EMA + declining volume on subsequent consolidation. |
| FANG | Q1 beat by 13%, raised dividend +5%, EPS $4.23 vs $3.74 expected. Near EMA50 (−0.80%). Strong analyst consensus ($223 target vs $192). But volume NOT declining and broader E&P sector faces oil price headwind from Iran ceasefire progress. | Watch oil prices; enter if WTI stabilizes above $90 and FANG volume normalizes on pullback days. |
| WELL | Near EMA50 (−0.59%), declining volume, healthcare REIT with rev +38.3% and EPS +157.9%. Only 1 trigger. Very high trailing PE (100x) limits scoring. | Enter if close recrosses 20 EMA with declining volume + healthcare/REIT sector confirmation. |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| _None — scheduled run, no user-confirmed trades logged_ | | | | | | |

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| _No closed trades — strategy has no outcome-recorded rows_ | | | | | |

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A (no closed trades)
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Notes on This Run

- **Scan method:** yfinance-based scanner (TrendSpider conditions replicated); browser-use unavailable.
- **TradingView visual check:** Could not be performed (browser-use not available). B-Xtrender scores are estimated from price action, EMA structure, and scan conditions. Recommend visual confirmation via TradingView chart `z25AhAlV` before opening positions.
- **Step 6 gate:** This is a scheduled/unattended run. No trades appended to CSV. Suggested trades require user confirmation to log.
- **Excluded names:** XOM (score ~45, below threshold — poor R:R + oil price headwind); CVX (score ~54, marginally below threshold — "fully valued" after 24% YTD rally, Iran deal risk); NSC (weak fundamentals: EPS −26.6%, Rev +0.2%); AFL (analyst rating 3.07, target $112 below current $118 — negative upside); MO/KO (defensive names with limited upside catalysts).
