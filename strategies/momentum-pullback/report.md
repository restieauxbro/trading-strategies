# Momentum After Pullback — Current Report
_Last updated: 2026-05-24_

---

## Market Context

The S&P 500 closed at 7,473.47 on Friday May 22, sitting 0.6% below its May 14 all-time high of 7,517.12 and comfortably above all key moving averages: 20-day at 7,336 (1.8% below price), 50-day at 6,987 (6.5% below), and 200-day at 6,807 (8.9% below). The bull trend is intact, momentum is positive, and breadth has improved modestly: approximately 55% of S&P 500 members now trade above their 200-day average, with notable recent rotation into Health Care and broad support from Energy, Materials, and Industrials. VIX closed at 16.78 — below 17, consistent with an orderly tape and no elevated fear. The Dow Jones crossed 50,000 for the first time on May 21. The primary macro headwind is the 10-year Treasury yield at 4.55–4.61%, which remains elevated and has created intermittent pressure on growth-sensitive names. Conclusion: market is in confirmed uptrend; no stricter filters required.

**Leading sectors (YTD):** Energy +21.5% · Materials +17.6% · Industrials +12.3% · Consumer Staples +15%  
**Lagging:** Technology −3%

---

## Scan

> TrendSpider browser-use unavailable in this environment. Scan replicated via yfinance using the same four-group logic (trend alignment, rising EMAs, ±3% EMA50 pullback in last 5 bars, timing trigger). Scan run against ~250 S&P 500 representative names.

**Symbols found (9):** VLO · LIN · AA · ETN · ROK · NSC · JPM · BAC · MSCI  
**Scan timestamp:** 2026-05-24 19:00 UTC

---

## Today's Suggested Trades

_Unattended/scheduled run — no CSV rows logged. Present to user for confirmation before opening any position._

---

### 1. JPM — JPMorgan Chase (Clean Bounce Off EMA50; Dow 50,000 Tailwind)

```
Ticker: JPM
Current Price: $306.38
Sector: Financials
Score: 113/115 (A:55 B:25 C:20 D:15 Ded:0)

Setup Summary:
JPM pulled back from a 30-day high of $316 to briefly trade 2.5% below its rising daily
50 EMA ($303.45), then snapped back through both the 20 EMA and prior day's high — triggers A
and C confirmed simultaneously. The weekly structure is fully bullish (EMA50 > EMA200 weekly,
price > weekly EMA50), both daily EMAs are rising, and the RSI has re-crossed above 50 with
strength at 57.0. Q1 2026 EPS was $5.94 (beat $5.50), revenue +10% YoY; next Q2 earnings are
mid-July (~7 weeks away — well outside the 3-week exclusion). Volume was orderly on down days
(below 20-day average), consistent with healthy consolidation rather than distribution.

Entry Zone: $303–$310
Stop Loss: $293 — below recent swing low / 3.4% below EMA50; structure invalid on close below
Target 1: $328 — prior resistance / 52-wk high zone retest (~+7%)
Target 2: $345 — analyst mean target ($338) stretched to $345 on momentum (~+13%)
Risk/Reward: 3.0:1 (T2)

Key Risks:
- Rising 10-year yield pressure on bank valuations if Treasury auctions disappoint
- Basel III G-SIB capital requirement revision (~$20B extra by 2028) overhang
- Near top of 52-week range ($251–$334); breakout confirmation needed above $316

Fundamental Note:
Record Q1 2026: EPS $5.94 vs $5.50 consensus (+8%), revenue $50.54B (+10% YoY). IB fee momentum
and Markets franchise running at historically elevated volumes. Excess capital ~$40B. Consensus:
15 Buy / 15 Hold; mean target $338.
```

**Instrument — Paired Debit Spread (Bullish):**
```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 20, 2026 (~27 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Strikes: Long 305 call / Short 320 call  (~$15 wide)
  Approximate Net Debit: ~$5.50–$6.50 per spread
  Max Profit: ~$8.50–$9.50 per spread

Opposite Hedge:
  Structure: Bear Put Spread (half-size)
  Strikes: Long 300 put / Short 288 put  (~$12 wide)
  Approximate Net Debit: ~$3.50–$4.50 per spread (at half-size)
  Max Profit (hedge): ~$7.50–$8.50 per spread (full payout if sharp drop)

Combined Position:
  Total Max Loss: Primary debit + 0.5× hedge debit  (~$7.25–$9.75 per pair unit)
  Expected Payout if bullish thesis plays out: Primary spread max profit
  Expected Payout on violent reversal below $288: Hedge partial offset
  Main Risk: Time decay without expansion; price pins between $305–$320
```

_Verify live bid/ask before executing. Adjust strikes to nearest liquid level._

---

### 2. ETN — Eaton Corporation (AI/Data Center Infrastructure; Right at EMA50)

```
Ticker: ETN
Current Price: $391.35
Sector: Industrials (Power Management / Data Centre Infrastructure)
Score: 108/115 (A:48 B:25 C:20 D:15 Ded:0)

Setup Summary:
Eaton pulled back 9.9% from its 52-week high of $434.23 to test the rising daily 50 EMA
($390.51), briefly undercutting it by 5% before recovering to sit almost exactly on the EMA50.
The weekly structure is fully bullish. RSI is at 47.1 (recovering; not yet through 50) and the
stock closed above prior day's high (trigger C). The pullback is textbook: orderly deceleration
on declining relative volume, touching structural support, and now attempting to re-ignite.
Q1 2026 was a record quarter — data center orders up 240%, backlog up 48%, organic growth raised
to 10% midpoint. Next Q2 earnings are late July (~9 weeks away — outside the 3-week exclusion).

Entry Zone: $388–$396  (within ±3% of EMA50 at $390.51)
Stop Loss: $378 — below the recent pullback trough (~3.1% below EMA50); close below invalidates
Target 1: $415 — prior resistance zone, ~6% above entry
Target 2: $430 — retest of 52-wk high; well-supported by raised guidance and AI capex cycle
Risk/Reward: 3.5:1 (T2; entry $391, stop $378, T2 $430)

Key Risks:
- Electrical Americas margins came in at 25.6% in Q1 (below expectations); Q2 recovery must
  confirm the 150 bps sequential improvement management guided
- $11B of recent acquisitions (Boyd Thermal, Ultra PCS) introduce integration execution risk
- Elevated 10-year yield compresses industrial multiples

Fundamental Note:
Record Q1 2026: Sales $7.5B (+17% YoY), adjusted EPS $2.81 (beat guidance by $0.06), free cash
flow +245%. Full-year adjusted EPS guidance raised to $13.05–$13.50 (midpoint +10%). Backlog at
228 GW (12 years at 2025 build rates). Analyst consensus: 16 Buy / 7 Outperform / 6 Hold;
mean target $450.
```

**Instrument — Paired Debit Spread (Bullish):**
```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 20, 2026 (~27 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Strikes: Long 390 call / Short 410 call  (~$20 wide)
  Approximate Net Debit: ~$8–$10 per spread
  Max Profit: ~$10–$12 per spread

Opposite Hedge:
  Structure: Bear Put Spread (half-size)
  Strikes: Long 385 put / Short 370 put  (~$15 wide)
  Approximate Net Debit: ~$5–$7 per spread (at half-size)
  Max Profit (hedge): ~$8–$10 per spread (full payout)

Combined Position:
  Total Max Loss: ~$10.50–$13.50 per pair unit
  Expected Payout if bullish thesis plays out to T1 ($415): primary spread near max
  Expected Payout on sharp reversal below $370: hedge partial offset
  Main Risk: Chop near EMA50 while RSI stays below 50; Q2 margin miss would accelerate downside
```

_Adjust to nearest liquid strikes. Consider July 18 expiry (~55 DTE) if Q2 earnings timing
is a concern — that still clears the late-July earnings date by ~7+ weeks for a well-timed entry._

---

### 3. VLO — Valero Energy (Energy Sector Leader; Massive Q1 Beat)

```
Ticker: VLO
Current Price: $246.96
Sector: Energy (Downstream Refining)
Score: 108/115 (A:48 B:25 C:20 D:15 Ded:0)

Setup Summary:
Valero pulled back from its 52-week high of $262.50 to within 1.85% of its rising 50 EMA
($237.12), then triggered a clean cross back above the 20 EMA (trigger A). RSI is 49.8 — sitting
just below the critical 50 level and primed for a crossover that would fire trigger B as well.
The weekly structure is fully bullish (EMA50 > EMA200 weekly, price > weekly EMA50). Volume was
declining on down days (pullback was orderly, not a distribution event). Q1 2026 was a
transformational quarter: net income swung from a $595M loss to a $1.3B profit, EPS $4.22 vs
consensus of $2.70 (56% beat). The company raised its quarterly dividend 6%. Energy is the
leading S&P 500 sector YTD (+21.5%). Next Q2 earnings are late July (~9 weeks away).

Entry Zone: $243–$252  (post-pullback bounce zone, within 3–6% of EMA50)
Stop Loss: $231 — below EMA50 ($237.12) by ~2.5%; close below would negate thesis
Target 1: $262 — retest of 52-wk high; initial target for a 6-week position
Target 2: $285 — measured move / extended target on continued refining margin strength
Risk/Reward: 2.5:1 (T1) | 3.5:1 (T2) from mid-range entry $243

Key Risks:
- Port Arthur refinery fire (March 2026) reduces Q2 throughput; diesel hydrotreater under
  extended repair — management has flagged reduced Q2 capacity
- Refining margins are cyclical; a sharp decline in crude differentials would compress earnings
- Iran/Venezuela supply disruption (positive catalyst in Q1) may partially normalize

Fundamental Note:
Q1 2026: Revenue $32.38B (+7% YoY), EPS $4.22 (vs. $2.70 consensus — massive beat). Net income
swung from −$595M loss to +$1.3B profit. Renewable Diesel and Ethanol also expanded. Balance
sheet strengthened; dividend increased 6% to $1.20/share quarterly. Energy sector: +21.5% YTD,
best performing sector.
```

**Instrument — Paired Debit Spread (Bullish):**
```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 20, 2026 (~27 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Strikes: Long 245 call / Short 260 call  (~$15 wide; targets the 52-wk high)
  Approximate Net Debit: ~$6–$8 per spread
  Max Profit: ~$7–$9 per spread

Opposite Hedge:
  Structure: Bear Put Spread (half-size)
  Strikes: Long 240 put / Short 228 put  (~$12 wide)
  Approximate Net Debit: ~$3.50–$4.50 per spread (at half-size)
  Max Profit (hedge): ~$7–$9 per spread (full payout if collapses)

Combined Position:
  Total Max Loss: ~$8–$10.25 per pair unit
  Expected Payout if VLO retests 52-wk high ($262): primary spread at/near max
  Expected Payout on sharp reversal below $228: hedge partial offset
  Main Risk: Port Arthur throughput cuts weigh on Q2 earnings; RSI fails to cross 50
```

---

## Watchlist

_Names with constructive scan/research but no immediate entry this run (timing, R:R, or missing trigger)._

| Ticker | Why Watching | Trigger to Revisit |
|--------|-------------|-------------------|
| NSC | Triggers A+B both fired (RSI crossed 50 + crossed 20 EMA); clean pullback to EMA50 in uptrend; industrials/rail sector benefiting from Dow 50,000 | R:R is compressed by proximity to 52-wk high ($322). Wait for price to consolidate above $316, establishing a new higher base before the next breakout attempt. Target on watch: pull back toward $305–$308 for a lower-risk entry. |
| LIN | Materials sector #2 YTD (+17.6%); pulled back within 1.91% of EMA50 then bounced; RSI 65.7 (strong momentum); solid Q1 beat ($4.33 EPS vs $4.27 est) | Stock is 0.7% below 52-wk high ($521.28) at $517.58. T1 target is very close, compressing R:R. Revisit on pullback to $498–$505 (EMA50 area) for better entry. |
| BAC | At EMA50; RSI 58.6; uptrend intact; financials in favour | Volume elevated on down days (38M vs 32.5M 20-day avg) suggests some distribution pressure. Wait for a session with clearly declining volume on any further consolidation to confirm healthy pullback before entry. |
| DVN | Exactly at 50 EMA (pct −0.01%); energy sector; uptrend intact | No timing trigger fired yet (RSI 42.1, no 20 EMA cross). Wait for RSI to cross above 50 or a close above prior day's high. Monitor daily for trigger B or C. |
| COP | 0.72% above EMA50; RSI 48.3 (just below 50) | RSI approaching 50 from below. Watch for trigger B (RSI ≥ 50) on the next 1–2 sessions. Clean pullback to EMA50 zone; entry becomes valid once trigger fires. |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed trades currently open. Previous run (2026-04-16) was an empty-scan placeholder._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| — | — | — | — | — | — |

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** n/a
- **Average % gain on wins:** n/a
- **Average % loss on stops:** n/a
- **Expired (inconclusive):** 0
- **Best trade:** n/a
- **Worst trade:** n/a

---

## Notes

- **TrendSpider browser-use unavailable** in this environment. Scan logic replicated via yfinance (EMA-based conditions, RSI, trigger checks) against ~250 S&P 500 names. 9 tickers passed all four condition groups.
- **TradingView visual check (Step 4b) not performed** — browser-use required. B-Xtrender scores are estimated from RSI, MA alignment, and momentum indicators; actual green/red dots should be verified before entry.
- **Scheduled run — no trades logged.** This report is for review only. Confirm trades via user action and then append rows to trades-log.csv.
