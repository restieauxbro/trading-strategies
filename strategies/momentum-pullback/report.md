# Momentum After Pullback — Current Report
_Last updated: 2026-06-25_

---

## Market Context

The S&P 500 (SPY: $733.06) is trading **+6.8% above its 200-day moving average** and virtually flat to its 50-day MA (+0.1%), confirming a continued **uptrend with a brief period of consolidation**. The index is down approximately 2.1% over the past month, suggesting a mild pullback within the larger bull trend — exactly the backdrop this strategy is designed to exploit. VIX stands at **18.86**, well below the 25 threshold, indicating normal/low fear with no elevated hedging pressure. Overall conditions are constructive for momentum-pullback entries: uptrend intact, VIX benign, sector rotation providing opportunity in Energy, Industrials, and select Defensives.

> **Note:** TradingView visual confirmation (browser-use profile Tim) was unavailable in this environment. B-Xtrender scores are estimated based on EMA relationships and trend structure. Tickers with strong uptrends above rising 50/200 EMAs are assumed to show green background bars; green dot and histogram signals are left unscored pending visual verification.

---

## Scan Results

- **Method:** yfinance-based scan applying TrendSpider Momentum After Pullback logic (Group 1–4 conditions from `config.md`)
- **Universe:** ~290 S&P 500 constituents screened
- **Date/Time:** 2026-06-25 ~19:00 UTC
- **Symbols passing all conditions (33):**

  V, JNJ, MRK, ABBV, KO, LIN, AMGN, PM, HON, UNP, QCOM, ADI, MO, CB, ETN, EMR, CL, FDX, MPC, VLO, PSX, AFL, WAT, EQR, EXR, RF, ETR, LNT, OGE, WEC, EVRG, CNP, TRGP

---

## Outcomes Recorded Today

**0 outcomes recorded.** The only prior entry in `trades-log.csv` is a 2026-04-16 empty-scan marker row (no tickers found that run). No trades are pending review.

---

## Today's Suggested Trades

> **Scheduled run — no trades logged.** The three picks below are recommendations for user review. Per `AGENT.md` Step 6, trades are only appended to `trades-log.csv` after user confirmation.

---

### 1. MPC — Marathon Petroleum Corp.

```
Ticker: MPC
Current Price: $252.46
Sector: Energy (Integrated Downstream & Midstream)
Score: 98/115 (A:45 B:18 C:20 D:15 Ded:0)
```

**Setup Summary:**
Marathon Petroleum is consolidating near its 50-day EMA ($246.65) after a powerful 2026 run driven by elevated refining crack spreads from the Iran conflict. All three timing triggers are active (above 20 EMA, RSI recrossing 50, close above prior high) and volume is declining on the pullback — a hallmark of healthy continuation vs distribution. The 52-week range ($154.97–$272.46) shows MPC has room to re-test the high. Fwd P/E of 10.5x is compelling for the current earnings trajectory.

```
Entry Zone:    $247–$253 (around 50-day EMA)
Stop Loss:     $242 — below 50 EMA with buffer; trend invalidation
Target 1:      $272 — prior 52-week high / range top
Target 2:      $295 — measured move; Goldman $291 / TD Cowen $320 target range
Risk/Reward:   ~2.75:1 (entry $250, stop $242, T1 $272)
```

**Key Risks:**
- Up ~60% YTD — extended; street consensus mean target of ~$259 limits near-term upside to ~3% from current price (high targets are $291–$335)
- Iran conflict resolution would sharply compress crack spreads and earnings trajectory
- California class action lawsuit (price manipulation allegation) — minor; no financial impact confirmed yet
- Earnings August 4 — well outside 3-week hard filter; options expiring July 17 avoid earnings risk

**Fundamental Note:**
Q1 2026 EPS of $1.65 massively beat $0.75 estimate as Iran-driven refining margins surged; revenue grew +8.8% YoY. Post-Q1, Goldman raised target to $291, Wells Fargo to $335, TD Cowen to $320, Morgan Stanley to $265 (June 12). Q2 2026 EPS consensus is ~$11–12, implying ~184% YoY jump as elevated crack spreads flow through a full quarter.

**Instrument (Bullish — Paired Debit Spread):**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~22 DTE) — expires before Aug 4 earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long 250 / Short 260
  Net Debit: ~$4.60 per spread (indicative mid)
  Max Profit: ~$5.40 per spread
  Max Loss:   ~$4.60 per spread

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts (half-size)
  Strikes: Long 250 / Short 240 (indicative — verify 240 put liquidity)
  Net Debit: ~$4.00–$4.50 per spread (indicative)
  Max Profit: ~$5.50–$6.00 per spread
  Max Loss:   ~$4.00–$4.50 per spread

Combined Position:
  Total Debit / Max Loss: ~$6.60–$7.10 (1× primary + 0.5× hedge)
  Expected Payout if MPC ≥ $260 at expiry: ~$5.40 (primary) + hedge ~breakeven
  Expected Payout on sharp drop to ≤ $240: primary loses $4.60, hedge nets ~$2.75–$3.00
  Main Risk: drift / MPC pinned between $240–$260 at expiry; time decay erodes both spreads
```

---

### 2. UNP — Union Pacific Corporation

```
Ticker: UNP
Current Price: $266.38
Sector: Industrials (Railroads)
Score: 97/115 (A:45 B:25 C:20 D:7 Ded:0)
```

**Setup Summary:**
Union Pacific is pulling back cleanly to its 50-day EMA ($261.91) in a confirmed daily and weekly uptrend. All three timing triggers fired simultaneously (above 20 EMA after being below, RSI recrossed 50, close above prior day high) and volume is declining on the pullback, indicating healthy consolidation. The company is advancing the regulatory approval process for America's first transcontinental railroad (UP/BNSF merger), which adds a structural long-term catalyst beyond the quarterly earnings cycle.

```
Entry Zone:    $261–$266 (at/near 50-day EMA)
Stop Loss:     $257 — below 50 EMA with buffer; below recent swing support
Target 1:      $282 — consensus analyst target; mid-range resistance
Target 2:      $305 — Susquehanna price target; upper extension
Risk/Reward:   ~4.0:1 (entry $262, stop $257, T1 $282)
```

**Key Risks:**
- Earnings July 23, 2026 (28 days) — passes the 3-week hard filter, but position traders will hold through earnings; July 17 options expire 6 days before earnings (lower IV crush risk, but less time to capture move)
- Carload volume softness — 1% fewer carloads in Q1 2026 vs Q1 2025
- Intermodal competition and regulatory uncertainty around the transcontinental merger
- No strong positive catalyst in the immediate 2-week window

**Fundamental Note:**
Q1 2026: EPS $2.87 (beat est. $2.84); adjusted EPS $2.93 (+8.5% YoY). Revenue +3%, freight revenue +4%. Operating ratio improved to 59.9% (record). Susquehanna reiterated Positive with $305 target June 5. Consensus: 21 analysts, Moderate Buy, target $282.21. Weiss Ratings upgraded April 21.

**Instrument (Bullish — Paired Debit Spread):**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~22 DTE) — expires 6 days before July 23 earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long 265 / Short 275
  Net Debit: ~$4.60 per spread (265C mid ~$8.05, 275C mid ~$3.45)
  Max Profit: ~$5.40 per spread
  Max Loss:   ~$4.60 per spread

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts (half-size)
  Strikes: Long 265 / Short 255
  Net Debit: ~$3.23 per spread (265P mid ~$5.35, 255P mid ~$2.13)
  Max Profit: ~$6.77 per spread (≈2.1× its own risk — target 2× met ✓)
  Max Loss:   ~$3.23 per spread

Combined Position:
  Total Debit / Max Loss: ~$6.22 (1× primary + 0.5× hedge)
  Expected Payout if UNP ≥ $275 at expiry: ~$5.40 primary + hedge breakeven
  Expected Payout on sharp drop to ≤ $255: primary loses $4.60, hedge nets ~$3.39
  Main Risk: drift between $255–$275 at expiry; earnings overhang limits conviction on longer-dated structures
```

> **Alternative instrument for UNP:** Given the July 23 earnings proximity and position-trade style, **stock** (vs. options) may be preferred. Stop at $257, scaling in near $262–$265.

---

### 3. ETN — Eaton Corporation plc

```
Ticker: ETN
Current Price: $417.59
Sector: Industrials (Power Management / Electrification)
Score: 86/115 (A:38 B:18 C:20 D:15 Ded:-5)
```

**Setup Summary:**
Eaton is recovering from a brief pullback to its 20 EMA after a powerful AI/data-center-driven run (stock up +14% in the prior 30 days). All three timing triggers are active (above 20 EMA, RSI recovering through 50, close above prior high). The structural thesis is strong: surging demand for grid-to-chip power infrastructure, record $20B backlog, Boyd Thermal acquisition (liquid-cooling for high-density AI workloads) completed, and 2026 organic growth guidance raised to 9–11%. Volume is elevated on the pullback (a mild concern vs the declining-volume ideal), and $22M in insider selling was noted.

```
Entry Zone:    $410–$420 (at 20 EMA recovery; 50 EMA at $400 is deeper support)
Stop Loss:     $405 — below recent pullback swing low; clear technical invalidation
Target 1:      $437 — prior 52-week high; near-term resistance
Target 2:      $470 — measured move / new ATH expansion
Risk/Reward:   ~2.2:1 (entry $415, stop $405, T1 $437)
```

**Key Risks:**
- $22M insider selling noted — reduces conviction; watch for further insider activity
- Premium valuation at 41× trailing PE (fwd PE ~26×); priced for perfection
- Elevated volume on pullback (could be distribution, not just normal consolidation)
- Stock is near its all-time high ($436.74) — limited headroom to T1
- Earnings August 4 — outside hard filter; options at July 17 safe from earnings
- U.S. AI data-center concentration risk: capex slowdown would hit ETN disproportionately

**Fundamental Note:**
Q1 2026: EPS $2.81 (beat $2.73 est, adjusted), revenue $7.45B (beat $7.15B est, +16.8% YoY). Raised 2026 organic growth guidance to 9–11% (from 8%). Record Q1 results with accelerating backlog from AI data-center and electrification demand. Boyd Thermal acquisition adds liquid-cooling expertise. Upcoming Q1 2027 spin-off of vehicle/e-mobility segments will create a pure-play power management company with 26%+ margins.

**Instrument (Bullish — Paired Debit Spread):**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~22 DTE) — expires before Aug 4 earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long 410 / Short 430
  Net Debit: ~$10.45 per spread (410C mid ~$22.95, 430C mid ~$12.50)
  Max Profit: ~$9.55 per spread (≈0.91× risk — close to 1:1 ✓)
  Max Loss:   ~$10.45 per spread

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts (half-size)
  Strikes: Long 410 / Short 390
  Net Debit: ~$6.75 per spread (410P mid ~$12.90, 390P mid ~$6.15)
  Max Profit: ~$13.25 per spread (≈1.96× its own risk — target 2× met ✓)
  Max Loss:   ~$6.75 per spread

Combined Position:
  Total Debit / Max Loss: ~$13.83 (1× primary + 0.5× hedge)
  Expected Payout if ETN ≥ $430 at expiry: ~$9.55 primary + hedge breakeven
  Expected Payout on sharp drop to ≤ $390: primary loses $10.45, hedge nets ~$6.63
  Main Risk: drift/chop between $390–$430 erodes both spreads via theta decay
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| KO | Clean uptrend; +1.9% from 50 EMA; strong EPS/revenue (+18%/+12% YoY); Trigger A active. Passed scan but lacks near-term catalyst. | Pull back closer to $78 (50 EMA); or a positive analyst upgrade. Earnings: est. July 29. |
| HON | All technicals positive (Triggers A+C, declining volume, +3.5% from 50 EMA). EPS growth severely distorted (-42%) by spin-off restructuring charges — not reflective of true business. | Confirm clean earnings print once restructuring normalises; or set alert at 50 EMA retest ~$218. |
| VLO | Similar refiner setup to MPC (all 3 triggers, +4.2%); Energy sector in favour. Avoid doubling up in same sector with MPC. | Watch if MPC entry is skipped; VLO stop at $235, T1 $265. Earnings: est. late July. |
| AMGN | Triggers A+C, +3.8% from 50 EMA; Healthcare/Biotech in favour. Requires deeper fundamental review. | Monitor chart for RSI trigger (B) to join; or pull back closer to 50 EMA $340. |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades — this is a scheduled run with no prior confirmed entries._

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

## Scan Detail — All 33 Passing Tickers

| Ticker | % from 50 EMA | Triggers Active | Declining Volume |
|--------|---------------|-----------------|-----------------|
| PM | +1.6% | A, B | No |
| UNP | +1.7% | A, B, C | Yes ✓ |
| KO | +1.9% | A | No |
| MPC | +2.4% | A, B, C | Yes ✓ |
| CB | +2.5% | A | — |
| EXR | +2.5% | A | — |
| FDX | +2.9% | A, C | No |
| OGE | +3.0% | A, C | — |
| CL | +3.1% | A | — |
| AFL | +3.2% | A | — |
| EQR | +3.2% | A, C | — |
| HON | +3.5% | A, C | Yes ✓ |
| LIN | +3.6% | C | — |
| WEC | +3.6% | A, C | — |
| V | +3.7% | C | — |
| AMGN | +3.8% | A, C | — |
| QCOM | +4.1% | C | No |
| VLO | +4.2% | A, B, C | No |
| ADI | +4.5% | A, C | No |
| ETN | +4.3% | A, B, C | No |
| EMR | +1.5% | A | — |
| PSX | −0.5% | C | — |
| LNT | +5.0% | C | — |
| EVRG | +5.3% | A, C | — |
| TRGP | +6.4% | A, C | — |
| MO | +6.0% | A, C | — |
| JNJ | +6.0% | A, C | — |
| RF | +6.9% | C | — |
| WAT | +7.6% | A | — |
| MRK | +8.1% | A, C | — |
| ABBV | +11.3% | A, C | — |
| ETR | +4.1% | C | — |
| CNP | +3.6% | C | — |
