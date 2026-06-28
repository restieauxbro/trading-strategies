# Momentum After Pullback — Current Report
_Last updated: 2026-06-28_

---

## Market Context

The S&P 500 (SPY) closed at $728.99 on June 27, 2026, sitting approximately 0.5% below its 50-day MA ($732.69) while remaining 6.1% above the 200-day MA ($686.84) — a confirmed uptrend with mild near-term consolidation. VIX is at 18.4, well below the 25 caution threshold. The primary headwinds this week were: (1) Federal Reserve Chair Kevin Warsh's removal of forward-guidance language on rate cuts, signalling a more hawkish policy stance; (2) a sector-wide semiconductor sell-off triggered by SK Hynix slowing its high-bandwidth memory expansion — this dragged analog and mixed-signal names like ADI down despite no change in their fundamentals; and (3) lingering geopolitical uncertainty (US-Iran tensions, elevated defence budgets). Overall trend: **uptrend intact, moderate caution warranted on high-multiple tech/semi names**.

---

## Scan

**Method:** yfinance momentum-pullback replica scan (TrendSpider unavailable — browser-use not present in cloud environment). Scanned 160-stock S&P 500 sample for: price above 200d EMA, weekly golden cross, price above weekly 50 EMA, rising EMAs, price within ±3.5% of 50d EMA in last 5 bars, at least one timing trigger (20 EMA cross, RSI >50 cross, or close above prior high).

**Result:** 28 tickers passed all conditions. Top candidates by proximity to 50d EMA and RSI quality: ADI, TJX, AAPL, MDB, TXN, GD, ETN, EMR.

**Exclusions before deep research:**
- **TXN**: Earnings July 22 (24d) — borderline proximity; excluded to avoid gamma risk
- **AAPL**: Earnings July 30 (32d) technically passes but conservative given high IV and proximity
- **JNJ, MRK, EXPE**: Extended >8% above 50d EMA — pullback not orderly enough
- **AEP, WEC, ES**: Utilities/defensive sector; limited upside in current regime

---

## Today's Suggested Trades

### 1. MDB — MongoDB (AI Database, Post-Earnings Pullback)

```
Ticker: MDB
Current Price: $314.01
Sector: Technology — Cloud Database / Software
Score: 85/115  (A:40 B:18 C:20 D:12 Ded:-5)
Note: Score out of 115; B-Xtrender unavailable (cloud env) — 15 pts withheld, -5 applied.

Setup Summary:
MongoDB reported a blowout Q1 FY2027 on May 28: revenue $687.6M (+25% YoY), Atlas +29.4% YoY
(now 75% of revenue), non-GAAP EPS $1.32 vs $0.89 consensus (+48%). The stock gapped +18.5%
to $397.53 on June 1. Since then it has pulled back to $314, retesting the 50-day EMA ($317.86)
with declining volume — a textbook healthy consolidation after an earnings gap. RSI recovered from
extreme oversold (23 on June 22) to 46, indicating the flush is largely complete. The AI database
acceleration thesis is intact; Atlas is the de-facto operational layer for AI-application backends.

Entry Zone: $310–$320 (50d EMA zone; $317.86)
Stop Loss: $290 — below the June 22 intraday low support shelf; ~7.3% risk from midpoint
Target 1: $360 — 20d EMA recovery / post-earnings consolidation zone
Target 2: $395 — retest of June 1 post-earnings high
Risk/Reward: ~2.0:1 to T1 | ~3.6:1 to T2

Key Risks:
- High-beta name (ATR ~$23/day); pullback could extend to $280–290 if market deteriorates
- Premium valuation (no GAAP P/E; growth-priced); multiple contraction risk in high-rate env
- Next earnings Aug 24-25 (57 days away — clear runway)

Fundamental Note:
Q1 FY2027 revenue +25% YoY, Atlas NRR re-accelerating. 15+ analyst PT raises post-earnings
(targets $380–$439). GAAP barely profitable ($4.4M net income). FY2027 guidance raised to
$2.92–$2.96B revenue. Management flagged AI workloads as primary demand driver.

Instrument: Paired Debit Spread — Bullish Bias
Expiry: Aug 1, 2026 (~34 DTE)

  Primary Spread (Bull Call):
    Strikes: Buy $315C / Sell $340C (Aug 1)
    Size: 2 spreads
    Est. Net Debit: ~$8 per spread ($160 total primary risk)
    Max Profit: ~$17 per spread (~2.1x primary risk)

  Opposite Hedge (Bear Put, half size):
    Strikes: Buy $305P / Sell $285P (Aug 1)
    Size: 1 spread
    Est. Net Debit: ~$7 per spread ($70 hedge risk)
    Max Profit: ~$13 on violent move to $285 (~1.9x hedge risk)

  Combined Position:
    Total Max Risk: ~$230
    Expected payout if thesis correct (MDB reclaims $340): ~$340 net gain
    Expected payout on violent drop to $285: ~$130 net gain from hedge, offset ~$90 primary loss
    Main Risk: Drift and time decay if MDB chops between $300–$330
```

---

### 2. ETN — Eaton Corporation (AI Power Infrastructure, Bounce off 50d EMA)

```
Ticker: ETN
Current Price: $402.68
Sector: Industrials — Intelligent Power Management
Score: 79/115  (A:31 B:18 C:20 D:15 Ded:-5)

Setup Summary:
Eaton has re-rated from a cyclical industrial into a "grid-to-chip" AI infrastructure play. Q1 2026
was a record: $7.5B revenue (+10% organic), raised FY2026 organic growth guidance to 9–11%, data
center orders +240% YoY, backlog $22.8B. Price just tested and bounced off the 50d EMA ($400.44)
after a 32% YTD run. Multiple analyst upgrades (JPMorgan $445, RBC $484, BMO $477, Jefferies $430).
The June 11 announcement to separate the Mobility Group (combine with Dana for $1.1B cash) focuses
Eaton entirely on its high-growth electrical and aerospace segments. RSI at 48.9 — neutral, not
extended. Electrical Americas margins expected to expand 150bp QoQ in Q2, de-risking the next print.

Entry Zone: $400–$410 (50d EMA support zone)
Stop Loss: $382 — below 50d EMA and recent consolidation low; ~5.2% risk
Target 1: $450 — analyst consensus midpoint (average PT ~$455)
Target 2: $480 — high-end analyst target (RBC $484)
Risk/Reward: ~2.3:1 to T1 | ~3.8:1 to T2

Key Risks:
- Next earnings Aug 4, 2026 (37 days away — within trading window; size for event risk)
- Premium multiple (~40x P/E); vulnerable to any AI capex sentiment shift
- Electrical Americas margin miss in Q2 would disappoint

Fundamental Note:
FY2026 adj EPS guidance $13.05–$13.50 (midpoint ~+10% YoY). Liquid-cooling business (Boyd
Thermal acquisition) on track for $1.7B revenue in 2026 (>2x YoY). Raising 24 manufacturing
facilities to meet demand. 10.5% organic growth confirmed in Q1. Dividend yield ~0.9%.

Instrument: Paired Debit Spread — Bullish Bias
Expiry: Aug 15, 2026 (~48 DTE — captures Q2 earnings catalyst Aug 4)

  Primary Spread (Bull Call):
    Strikes: Buy $405C / Sell $435C (Aug 15)
    Size: 2 spreads
    Est. Net Debit: ~$10 per spread ($200 total primary risk)
    Max Profit: ~$20 per spread (~2.0x primary risk)

  Opposite Hedge (Bear Put, half size):
    Strikes: Buy $395P / Sell $375P (Aug 15)
    Size: 1 spread
    Est. Net Debit: ~$6 per spread ($60 hedge risk)
    Max Profit: ~$14 on violent break lower (~2.3x hedge risk)

  Combined Position:
    Total Max Risk: ~$260
    Expected payout if thesis correct (ETN reaches $435): ~$400 net gain
    Expected payout on violent drop to $375: ~$140 net gain from hedge, offset ~$120 primary loss
    Main Risk: Earnings Aug 4 miss + compression between spread strikes
```

---

### 3. ADI — Analog Devices (Sector Panic Pullback, Fundamentals Intact)

```
Ticker: ADI
Current Price: $386.91
Sector: Technology — Semiconductors (Analog/Mixed-Signal)
Score: 78/115  (A:33 B:18 C:20 D:12 Ded:-5)

Setup Summary:
ADI reached an all-time high of $445.91 on June 22. Then on June 23 and 26, sector-wide panic
selling dragged ADI down -9.23% and -7.56% respectively — NOT driven by ADI's own fundamentals,
but by SK Hynix HBM memory news triggering AI infrastructure concern across the entire chip sector.
ADI does not make HBM chips; its data center exposure is power delivery and optical interconnects.
Q2 2026 results (May 20) were strong: EPS $3.09 (+6.5% beat), revenue $3.62B (+3.1% beat),
strong guidance for Q3. Stifel raised PT to $498 the day after the crash (Jun 24) reaffirming Buy.
The stock is now -13% from ATH, testing the 50d EMA zone ($399). RSI at 42.7 = oversold. This
is a momentum pullback setup with a compelling asymmetric R:R vs the 52-week range.

Entry Zone: $383–$393 (near/below 50d EMA)
Stop Loss: $368 — below recent panic lows; ~5% risk from midpoint entry
Target 1: $425 — 50d EMA recovery + gap fill (pre-panic trading zone)
Target 2: $448 — ATH retest
Risk/Reward: ~1.9:1 to T1 | ~3.2:1 to T2

Key Risks:
- Semiconductor sector remains vulnerable to further AI capex narrative shifts
- Federal Reserve hawkish pivot increases discount rate pressure on growth multiples
- Automotive segment (largest segment, below prior peak) must confirm recovery in Q3
- Earnings Aug 19-26 (52+ days) — clear runway

Fundamental Note:
EPS growing +67% YoY (Q2 2026 $3.09 vs Q2 2025 $1.85). Revenue recovering from trough
(+25.7% YoY). Industrial automation + AI data center power are primary growth drivers.
Q3 2026 guidance raised by management. Analyst consensus: Buy, avg target $452 (82% of analysts
rate Buy); Stifel $498, Wells Fargo $515 (Overweight).

Instrument: Paired Debit Spread — Bullish Bias
Expiry: Aug 15, 2026 (~48 DTE — before Aug 19 earnings)

  Primary Spread (Bull Call):
    Strikes: Buy $390C / Sell $420C (Aug 15)
    Size: 2 spreads
    Est. Net Debit: ~$10 per spread ($200 total primary risk)
    Max Profit: ~$20 per spread (~2.0x primary risk)

  Opposite Hedge (Bear Put, half size):
    Strikes: Buy $380P / Sell $360P (Aug 15)
    Size: 1 spread
    Est. Net Debit: ~$6 per spread ($60 hedge risk)
    Max Profit: ~$14 on violent drop to $360 (~2.3x hedge risk)

  Combined Position:
    Total Max Risk: ~$260
    Expected payout if thesis correct (ADI recovers to $420): ~$400 net gain
    Expected payout on continued sell-off to $360: ~$140 net gain from hedge, offset ~$120 primary loss
    Main Risk: Continued semiconductor sector de-rating; time decay without price recovery
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| TJX | Strong fundamentals (Q1 FY27 beat, off-price retail in demand), score 76/115 — but limited upside from $155 to ATH $170; 30x+ P/E is rich | Pull back below $150 for better R:R entry; or post-August earnings dip |
| GD | Strong defense fundamentals (Q1 beat, record $130.8B backlog), score 72/115 — but earnings July 22 (24 days) is borderline proximity | After July 22 earnings report; buy any dip below $340 with fresh runway |
| EMR | +1.5% from 50d EMA, RSI 51, industrials automation play | Needs confirmation pull back closer to 50d EMA |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed trades on file. All prior scan runs were unattended (scheduled) — suggestions only, no user confirmation received._

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

## Scan Details (June 28, 2026)
_Full list of 28 tickers passing yfinance momentum-pullback conditions_

| Ticker | Price | 50d EMA | % from 50d | RSI | Decl Vol |
|--------|-------|---------|------------|-----|----------|
| ADI | $386.91 | $399.20 | -3.1% | 42.7 | No |
| TJX | $155.43 | $158.98 | -2.2% | 39.7 | No |
| AAPL | $283.78 | $289.93 | -2.1% | 41.3 | No |
| MDB | $314.01 | $317.86 | -1.2% | 46.2 | Yes |
| TXN | $285.43 | $285.30 | +0.0% | 44.7 | No |
| GD | $346.71 | $345.65 | +0.3% | 49.5 | No |
| ETN | $402.68 | $400.44 | +0.6% | 48.9 | No |
| EMR | $143.49 | $141.38 | +1.5% | 51.1 | No |
| F | $14.13 | $13.92 | +1.5% | 47.9 | Yes |
| LIN | $519.62 | $506.18 | +2.7% | 56.6 | Yes |
| RTX | $187.99 | $183.03 | +2.7% | 57.2 | Yes |
| PM | $180.77 | $175.42 | +3.0% | 54.7 | Yes |
| TFC | $50.49 | $48.85 | +3.4% | 57.4 | Yes |
| EXC | $47.40 | $45.82 | +3.4% | 63.3 | No |
| AME | $237.52 | $229.44 | +3.5% | 57.2 | No |
| V | $336.23 | $323.29 | +4.0% | 61.4 | No |
| AFL | $120.15 | $115.27 | +4.2% | 62.3 | Yes |
| KO | $82.63 | $79.13 | +4.4% | 62.2 | No |
| AMGN | $358.33 | $343.04 | +4.5% | 62.2 | Yes |
| MET | $85.95 | $82.07 | +4.7% | 55.6 | Yes |
| WEC | $118.85 | $113.22 | +5.0% | 67.3 | Yes |
| CB | $341.44 | $324.87 | +5.1% | 65.2 | Yes |
| ES | $73.48 | $69.28 | +6.1% | 67.8 | Yes |
| DE | $613.24 | $578.04 | +6.1% | 61.5 | Yes |
| AEP | $138.69 | $130.24 | +6.5% | 70.3 | No |
| JNJ | $254.66 | $233.01 | +9.3% | 72.4 | No |
| MRK | $128.66 | $116.69 | +10.2% | 70.8 | Yes |
| EXPE | $262.80 | $235.88 | +11.4% | 65.7 | No |
