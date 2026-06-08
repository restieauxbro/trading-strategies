# Momentum After Pullback — Current Report
_Last updated: 2026-06-08_

---

## Scan Source

**Fallback scan used:** TrendSpider browser scan unavailable (Chrome profile "Tim" not authenticated in this cloud environment). Scan executed via `scripts/momentum_pullback_scan.py` (yfinance-based implementation of the same Group 1–4 conditions from `config.md`).

**Scan timestamp:** 2026-06-08 19:05 UTC  
**Tickers found (24):** NVDA, GOOGL, XOM, COST, BAC, MRK, CVX, KO, LIN, PM, PLD, UNP, EOG, MO, CI, CL, NSC, GD, ETN, PNC, WELL, AFL, FANG, OKE

> **TradingView visual check (Step 4b):** Mandatory per workflow but unavailable in this cloud run — `browser-use --profile "Tim"` requires the user's Chrome session. **B-Xtrender scoring items are not awarded in this report.** User should verify `chart/z25AhAlV/?symbol=GD`, `?symbol=XOM`, `?symbol=ETN` before entering positions. Confirmed-green B-Xtrender would add up to +15 pts per ticker; confirmed-red would deduct up to −14 pts.

---

## Market Context

The S&P 500 (SPY) closed at $740.88, firmly above its 50-day MA ($713.51) and 200-day MA ($683.93), representing a +8.4% premium to the 200-day — a clear bullish regime. The index is up approximately +23% over the past year. VIX printed at 18.47 (down 14% from yesterday's close of 21.51), with the sharp VIX compression on June 8 signalling a risk-on pivot — possibly triggered by diplomatic progress in the Middle East or easing of Strait of Hormuz concerns. The 52-week VIX range is 13.38–35.30; at ~18.47 we are in the lower-middle band, consistent with a constructive environment for long equity setups. VIX below 20 is broadly supportive of new position entries.

The dominant macro theme is the U.S.–Iran conflict driving oil supply disruptions (Strait of Hormuz). This has been a strong tailwind for Energy stocks (XOM, CVX) and Defense names (GD, RTX). Separately, AI infrastructure spending continues at record pace, benefiting industrial power-management companies (ETN). Conditions are favourable for momentum continuation trades in these sectors.

---

## Today's Suggested Trades

_Unattended/scheduled run — no trades logged to CSV. User confirmation required before entry. See Step 6 in AGENT.md._

---

### 1. GD — General Dynamics (Score: 99/115)

```
Ticker: GD
Current Price: $340.75
Sector: Industrials — Aerospace & Defense
Score: 99/115 (A:43 B:25 C:16 D:15 Ded:0)

Setup Summary:
GD has pulled back almost precisely to its daily 50 EMA ($341.79), closing at $340.75 — 
just 0.35% below it. Volume has been declining during the pullback from the $369.70 
52-week high (~8% drawdown), and all three scan triggers fired simultaneously: recross 
above 20 EMA, RSI above 50, and close above prior day's high. The weekly chart shows 
EMA50 well above EMA200 (golden cross intact) and price above weekly EMA50 — structural 
uptrend fully in place. RSI at 49.2 is resting at the midpoint, consistent with a healthy 
reset that has not become oversold.

Entry Zone: $337–$343 (50 EMA zone)
Stop Loss: $328.00 — below recent swing low and consolidation base
Target 1: $370.00 — 52-week high / prior resistance  (R:R 2.2:1)
Target 2: $392.00 — analyst mean consensus target     (R:R 4.1:1)
Risk/Reward: 4.1:1 to Target 2 (using $341 entry, $328 stop)

Key Risks:
- Earnings July 22, 2026 (~44 days) — CLEAR of 3-week rule
- Analysts mixed since Q1: Citi lowered target to $364 (May 18), several others trimmed;
  only Overweight raised to $400. Consensus drift to hold/neutral is a headwind
- GD is trading near its 200-day SMA ($342 SMA vs $334 EMA); a break below both would 
  be bearish and is the key stop trigger

Fundamental Note:
Q1 2026: EPS $4.10 vs est. $3.69 (+11.1%); revenue +10.3% YoY; raised FY 2026 EPS 
guidance to $16.45–$16.55. Record backlog of $131B (up 48% YoY), book-to-bill 2:1. 
June 5 catalyst: GDOTS awarded U.S. Army contract for next-gen 155mm extended-range 
artillery projectile. Total estimated contract value of $188B underpins multi-year 
revenue visibility.
```

**Instrument — Paired Debit Spread (Preferred)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~39 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long $340 call / Short $350 call
  Mid prices (Jun 8): $340C ~$10.50 / $350C ~$6.10
  Net Debit: ~$4.40 per spread (R)
  Max Profit: ~$5.60 (if GD ≥ $350 at expiry)
  Max Loss: ~$4.40

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts
  Strikes: Long $330 put / Short $320 put
  Mid prices (Jun 8): $330P ~$5.45 / $320P ~$3.08
  Net Debit: ~$2.37 per spread
  Max Profit: ~$7.63 (if GD ≤ $320 at expiry)
  Max Loss: ~$2.37

Combined Position (N primary / N/2 hedge):
  Total Debit / Max Loss: ~$5.59 × N
  Expected Payout if bullish thesis right: ~$5.60 × N
  Expected Payout on violent break lower: ~$3.82 × N (hedge at half-size)
  Main Risk: drift / time decay without break above $345+
  ⚠ Note: GD options show wide bid-ask spreads (low open interest). Use limit orders 
    at mid-price. Consider stock + protective put instead if fills are poor.
```

---

### 2. XOM — Exxon Mobil (Score: 98/115)

```
Ticker: XOM
Current Price: $151.78
Sector: Energy — Oil & Gas Integrated
Score: 98/115 (A:43 B:25 C:15 D:15 Ded:0)

Setup Summary:
XOM has pulled back to its daily 50 EMA ($151.09) with volume declining to well below 
its 20-day average — a textbook healthy consolidation in an uptrend. All three triggers 
fired: recross above 20 EMA, RSI crossed above 50 (currently 50.6), and close above 
prior day's high. The weekly golden cross (EMA50 > EMA200) is firmly intact, price is 
above the weekly EMA50. The backdrop is exceptional: Barclays, Mizuho, Citi, and Piper 
Sandler all raised their XOM price targets in May–June 2026, driven by tightening global 
oil inventory and Middle East supply disruptions. Beta of only 0.15 keeps this a 
lower-volatility vehicle.

Entry Zone: $149–$153 (50 EMA zone)
Stop Loss: $145.00 — below recent swing low / below prior consolidation
Target 1: $163.00 — prior resistance zone             (R:R 2.0:1)
Target 2: $170.00 — analyst mean consensus (~$170)    (R:R 3.2:1)
Risk/Reward: 3.2:1 to Target 2 (using $151 entry, $145 stop)

Key Risks:
- Earnings July 31, 2026 (~53 days) — CLEAR of 3-week rule
- EPS declined YoY in Q1 2026 ($1.16 adj. vs $1.76 in Q1 2025) due to lower realized 
  oil prices in the quarter; recovery depends on sustained elevated crude prices
- Stock pulled back from 52-week high of $176.41; if Middle East tensions ease, oil 
  could give back recent gains quickly — high event/headline risk

Fundamental Note:
Q1 2026: EPS $1.16 (adj.) vs est. $1.02 (+13.7% beat); Golden Pass Train 1 LNG 
production online. Multiple analyst target raises in June (Barclays to $182, Mizuho to 
$175, Citi to $175, Piper Sandler to $186). Reported to be in advanced talks to re-enter 
Venezuelan production (~6 fields). Shareholder distributions of $9.2B in Q1 ($4.3B 
dividends + $4.9B buybacks). Forward P/E ~14.3x vs trailing 25.6x — earnings recovery 
expected in H2 2026 if oil stays elevated.
```

**Instrument — Paired Debit Spread (Preferred)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~39 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long $150 call / Short $155 call
  Mid prices (Jun 8): $150C ~$7.60 / $155C ~$5.15
  Net Debit: ~$2.45 per spread (R)
  Max Profit: ~$2.55 (if XOM ≥ $155 at expiry)
  Max Loss: ~$2.45

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts
  Strikes: Long $145 put / Short $140 put
  Mid prices (Jun 8): $145P ~$3.12 / $140P ~$1.85
  Net Debit: ~$1.27 per spread
  Max Profit: ~$3.73 (if XOM ≤ $140 at expiry)
  Max Loss: ~$1.27

Combined Position (N primary / N/2 hedge):
  Total Debit / Max Loss: ~$3.09 × N
  Expected Payout if bullish thesis right: ~$2.55 × N
  Expected Payout on violent break lower: ~$1.87 × N (hedge at half-size)
  Main Risk: drift / chop between $150–$155; headline risk if Strait of Hormuz reopens
  ✓ Good liquidity on XOM chains — mid fills realistic
```

---

### 3. ETN — Eaton Corporation (Score: 96/115)

```
Ticker: ETN
Current Price: $406.40
Sector: Industrials — Specialty Industrial Machinery / AI Power Infrastructure
Score: 96/115 (A:36 B:25 C:20 D:15 Ded:0)

Setup Summary:
ETN pulled back to its 50 EMA zone (~$396) over the past 2 weeks and is now recovering, 
currently 2.61% above the EMA50. Volume has been declining on the pullback from the 
$435.43 52-week high (~7.5% pullback). All three triggers fired on the bounce. The 
technical setup is slightly less clean than GD/XOM (further above EMA50) but the 
fundamental story is arguably the strongest of the three: Eaton is emerging as the 
dominant grid-to-chip infrastructure supplier for AI data centers. The stock has the 
best R:R to analyst targets ($430–$435 Jefferies/Bernstein) and the most convincing 
multi-year growth narrative.

Entry Zone: $396–$407 (prefer closer to EMA50 at $396 for better R:R)
Stop Loss: $385.00 — below recent swing low / below EMA support cluster
Target 1: $435.00 — 52-week high / near Jefferies $430 target   (R:R 2.3:1 from $400 entry)
Target 2: $460.00 — measured move / extended analyst range       (R:R 4.0:1 from $400 entry)
Risk/Reward: 4.0:1 to Target 2 (using $400 entry, $385 stop)

Key Risks:
- Earnings ~August 4, 2026 (~57 days) — CLEAR of 3-week rule
- Premium valuation: trailing P/E ~39.7x, forward ~25.8x; multiple compression risk if 
  AI spending momentum slows
- High implied volatility (40%+) on options — spreads are expensive; the paired debit 
  spread debit is disproportionately large relative to spread width

Fundamental Note:
Q1 2026: Net sales +17% YoY (record); data center orders +240% YoY; raised FY 2026 
organic growth guidance to 10%. Boyd Thermal acquisition closed — adding liquid-cooling 
capability to complete grid-to-chip stack. NVIDIA collaboration: Eaton Beam Rubin DSX 
platform launched at GTC 2026 (March 16). 228 GW data center backlog. Analyst upgrades: 
Jefferies Buy $430 (reinstated), Bernstein Buy $428. Mobility segment spin-off planned 
Q1 2027 to create a pure-play power management company.
```

**Instrument — Paired Debit Spread (Preferred)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~39 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long $410 call / Short $420 call
  Mid prices (Jun 8): $410C ~$19.95 / $420C ~$16.00
  Net Debit: ~$4.00 per spread (R)
  Max Profit: ~$6.00 (if ETN ≥ $420 at expiry)
  Max Loss: ~$4.00

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts
  Strikes: Long $390 put / Short $380 put
  Mid prices (Jun 8): $390P ~$14.75 / $380P ~$10.85
  Net Debit: ~$3.90 per spread
  Max Profit: ~$6.10 (if ETN ≤ $380 at expiry)
  Max Loss: ~$3.90

Combined Position (N primary / N/2 hedge):
  Total Debit / Max Loss: ~$5.95 × N
  Expected Payout if bullish thesis right: ~$6.00 × N
  Expected Payout on violent break lower: ~$3.05 × N (hedge at half-size)
  Main Risk: drift / expensive theta burn; ETN IV ~40% inflates costs
  ⚠ Consider August 21 expiry for more time buffer given elevated IV.
    Verify liquidity (OI on $410/$420 strikes is better than $400/$430).
```

---

## Watchlist

_Names with constructive scan/research but no immediate entry._

| Ticker | Score | Why watching | Trigger to revisit |
|--------|-------|--------------|-------------------|
| AFL | 67/115 | Volume declining on pullback, all 3 triggers, EMA50 intact. But Q1 EPS slight miss (-2.78%), limited upside to 52-week high ($119.81 vs current $115.47) constrains R:R. | Break and close above $120 on volume — opens measured move to $130+ and improves R:R to ≥2:1 |
| CVX | ~78/115 | Same energy setup as XOM (1.09% above EMA50, volume declining, all 3 triggers), strong Middle East tailwind. Excluded from top-3 to avoid double Energy concentration. Q1 adjusted EPS declined YoY. | XOM position closed / rotated, or CVX sets up independently with cleaner pullback to $185 |
| COST | ~65/115 | Classic quality compounder at EMA50 zone (-2.48% below), volume declining. Only "close above prior high" trigger. No material news catalyst. | RSI recross above 50 + recross above 20 EMA on increasing volume; ideally with a market-wide catalyst |
| KO | ~62/115 | At 1.38% above EMA50 with RSI just crossed above 50. Defensive/safe but limited upside in current risk-on environment. | Consumer staples sector rotation or portfolio defensive hedge requirement |

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

_Previous run (2026-04-16): Empty scan — no tickers found (market was in April sell-off; yfinance scan returned 0 results). No trades to track._

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

**Full universe scanned (fallback list — 150 tickers; Wikipedia S&P 500 fetch returned 403):**  
All 24 passing tickers sorted by technical quality (closest to EMA50, declining volume, most triggers):

| Rank | Ticker | Price | % from EMA50 | Vol Declining | Triggers | RSI |
|------|--------|-------|--------------|---------------|----------|-----|
| 1 | GD | $340.75 | -0.35% | ✓ | All 3 | 49.2 |
| 2 | XOM | $151.78 | +0.47% | ✓ | All 3 | 50.6 |
| 3 | OKE | $88.21 | +0.78% | ✓ | All 3 | 49.5 |
| 4 | PM | $175.44 | +0.48% | ✓ | RSI+PH | 47.3 |
| 5 | NVDA | $208.66 | +0.94% | ✓ | 20EMA | 46.9 |
| 6 | CVX | $189.24 | +1.09% | ✓ | All 3 | 52.8 |
| 7 | NSC | $311.25 | +1.19% | ✓ | All 3 | 50.9 |
| 8 | AFL | $115.47 | +1.45% | ✓ | All 3 | 52.3 |
| 9 | PLD | $142.70 | +1.35% | ✗ | All 3 | 50.5 |
| 10 | KO | $79.53 | +1.38% | ✗ | 20EMA+RSI | 51.7 |
| 11 | ETN | $406.40 | +2.61% | ✓ | All 3 | 51.9 |
| 12 | LIN | $504.11 | +1.03% | ✗ | All 3 | 50.9 |
| — | GOOGL | $363.57 | +0.63% | ✗ | PH only | 43.5 |
| — | BAC | $53.83 | +4.47% | ✗ | PH only | 64.8 |
| — | EOG | $140.49 | +3.49% | ✓ | 20EMA+PH | 55.0 |
| — | MO | $71.48 | +3.01% | ✓ | All 3 | 53.3 |
| — | others | — | — | — | — | — |

_NSC excluded: R:R < 1.5:1 (stock at analyst median target $298-313; 52-week high $326 only $15 above current $311 with $13 stop → sub-1.2:1). Final score 49/115 — below 55 threshold._
