# Momentum After Pullback — Current Report
_Last updated: 2026-04-29_

---

## Market Context

The S&P 500 (SPY) is trading at $710.47, well above both its 50-day average (~$678) and 200-day average (~$669.54), representing approximately +5% and +6% above each respectively. The broader market is in a confirmed uptrend. VIX closed at 18.90, declining from recent highs around 30+ (mid-April) and normalising — below the elevated-caution threshold of 25. Overall conditions are constructive for bullish momentum trades: market trend is up, volatility is stabilising, and breadth has been improving. A note of caution: many sectors and individual names pulled back sharply in early April (VIX spiked into the 30s), and most of today's scan candidates recovered on the back of Q1 2026 earnings beats, rather than pure technical chart action. This creates compressed entry R:R ratios but strong fundamental support.

---

## Scan Notes

**Scanner**: Momentum After Pullback (yfinance-based scan, S&P 500 subset — browser-use / TrendSpider unavailable in scheduled environment)  
**Scan timestamp**: 2026-04-29 19:00 UTC  
**Symbols found**: 12 — XOM, CVX, EOG, APH, SBUX, OXY, COP, PSX, MPC, ET, LNG, CBOE

**Earnings filter (hard -20pt deduction for earnings within 3 weeks):**
- COP: earnings 4/30 → DISQUALIFIED (-20pts, below threshold)
- XOM: earnings 5/1 → DISQUALIFIED
- CVX: earnings 5/1 → DISQUALIFIED
- CBOE: earnings 5/1 → DISQUALIFIED
- EOG: earnings 5/5 → DISQUALIFIED
- OXY: earnings 5/5 → DISQUALIFIED
- ET: earnings 5/5 → DISQUALIFIED
- MPC: earnings 5/5 → DISQUALIFIED
- LNG: earnings 5/7 → DISQUALIFIED

**Remaining after earnings filter**: APH, SBUX, PSX (all reported Q1/Q2 2026 within the last 24 hours — post-earnings entry).

**TradingView visual check (Step 4b)**: `browser-use` is unavailable in this scheduled environment. The B-Xtrender and Fair Value Band indicator readings cannot be confirmed this run. All B-Xtrender points have been **withheld** from scores, and chart-dependent deductions have not been applied. Scores are conservative and should be validated visually before acting.

---

## Today's Suggested Trades

### 1. APH — Amphenol (Technology / Electronic Components)

```
Ticker: APH
Current Price: $147.39
Sector: Technology — Electronic Components
Score: 72/100 (A:37 B:0 C:20 D:15 Ded:0 — B-Xtrender unconfirmed)

Setup Summary:
Amphenol reported record Q1 2026 earnings this morning: EPS $1.06 vs. $0.95 estimated
(+11.3% surprise), revenue $7.62B (+58.4% YoY), book-to-bill 1.24:1. The stock had
pulled back from $166 high to $123 (Apr 2) then recovered to $143 close before gapping
to $154 on open today. Price has settled at ~$147, now +5% above the 50-day EMA — a
healthy retest of the breakout zone. The AI/data-center and CommScope integration thesis
is intact and confirmed by the print. Q2 guidance of $1.14–$1.16 EPS beats Street
estimates by ~9%.

Entry Zone: $145–$148 (current zone; ideal buy on any intraday dip toward $144–$145)
Stop Loss: $135.00 — below the April-rally swing low and earnings gap support
Target 1: $155.50 — prior week high / recent resistance
Target 2: $166.00 — prior all-time high; analyst consensus targets $157–$183
Risk/Reward: T1 = 0.79:1 | T2 = 1.48:1

Key Risks:
- R:R below 1.5:1 on both targets — compressed due to post-earnings gap; ideal entry is
  a pullback toward $140–$143 (50 EMA) for a better risk structure
- High valuation: forward PE ~28x; market is paying a premium for AI connectivity demand
- COO sold ~5,700 shares on March 31 at $150 (minor insider selling flag)
- TradingView visual indicators unavailable — B-Xtrender confirmation missing

Fundamental Note:
Revenue +58.4% YoY driven by CommScope acquisition and organic AI/data-center demand.
Adjusted EPS growing +68% YoY. Net margin 18.49%, ROE 35.57%. Analyst consensus:
12 Buy, 3 Hold; avg target $156–$183. Barclays reiterated Overweight with $175 target
today. No earnings within 3 weeks (next: July 29, 2026).
```

**Instrument: Paired Debit Spread (Bullish)**  
_Expiry: June 18, 2026 (~50 DTE)_

Primary Spread:
- Structure: Bull Call Spread
- Strikes: Long $145 / Short $155 call
- Net Debit: ~$7.50 per spread ($12.10 long – $4.60 short ≈ $7.50, to be refined at execution)
- Max Profit: ~$2.50 per spread ($10 spread width – $7.50 debit)
- Max Loss: ~$7.50 per spread

Hedge (half-size):
- Structure: Bear Put Spread
- Strikes: Long $140 / Short $130 put (or ATM bear put at current levels)
- Net Debit: ~$4–5 per spread (indicative; ATM put $140 ~$7.10, short $130 put ~$3)
- Half-size (0.5 contracts per 1 primary)
- Max Profit at full payout: ~$7.00 (hedge)

_Note: IV is elevated post-earnings. Wait for IV crush to stabilise (1-2 sessions) before entering. A dip toward $143–$145 over the next 2-3 days would improve the entry significantly and make R:R > 1.5:1._

---

### 2. SBUX — Starbucks (Consumer Cyclical / Restaurants)

```
Ticker: SBUX
Current Price: $106.32
Sector: Consumer Cyclical — Restaurants
Score: 67/100 (A:40 B:0 C:15 D:12 Ded:0 — B-Xtrender unconfirmed)

Setup Summary:
Starbucks reported Q2 FY2026 results yesterday (April 28): comp sales +6.2% globally,
revenue +9% YoY to $9.5B, non-GAAP EPS $0.50. Company raised FY2026 guidance to
≥5% same-store sales growth (from ≥3%) and EPS $2.25–$2.45. CEO Brian Niccol's
turnaround continues to gain traction. Stock gapped from $97–98 pre-earnings to $107.27
(touching its 52-week high) before settling at $106.32. The prior pullback to the 50 EMA
zone ($88–$97) over March-April has now been reversed with a strong earnings-driven
breakout above prior resistance.

Entry Zone: $103–$106 (wait for settling of gap; any intraday dip is a better entry)
Stop Loss: $97.00 — below gap fill / pre-earnings support
Target 1: $114.00 — analyst consensus (Stifel $115, BMO $120, Deutsche Bank $113)
Target 2: $120.00 — BMO target / measured move from base
Risk/Reward: T1 = 0.89:1 | T2 = 1.56:1 (T2 meets 1.5:1 threshold)

Key Risks:
- R:R to T1 is poor (< 1:1); only T2 provides adequate risk reward (≥1.5:1)
- Stock is essentially AT its 52-week high — limited breakout confirmation yet
- EPS YoY still declining (Q2 EPS $0.50 vs. $0.69 prior year = -28%), driven by turnaround
  costs; profitability has not fully recovered
- High forward PE (~35x) demands continued comp sales growth execution
- TradingView visual indicators unavailable — B-Xtrender confirmation missing

Fundamental Note:
Revenue growing +9% YoY with comp sales momentum accelerating; CEO Niccol's "Back
to Starbucks" strategy showing measurable results (35.6M Rewards members record).
Strong cash generation: declared $0.62/share dividend (64 consecutive quarters). 16 Buy,
13 Hold, 1 Sell; avg target ~$105 (current price is above consensus, suggesting limited
upside vs. targets). New Nashville expansion adds operational capacity.
```

**Instrument: Paired Debit Spread (Bullish)**  
_Expiry: May 22, 2026 (~23 DTE — short cycle, use if confident in momentum; June 18 preferred for safer hold)_

Primary Spread (June 18 preferred):
- Structure: Bull Call Spread
- Strikes: Long $105 / Short $115 call
- Net Debit: ~$5–$6 (indicative — verify chain; $3.50 for $105 call + width)
- Max Profit at T2: ~$4–$5 per spread
- Max Loss: ~$5–$6

Hedge (half-size):
- Structure: Bear Put Spread
- Strikes: Long $100 / Short $93 put
- Half-size; triggers if SBUX breaks below gap ($97 stop)

_⚠️ SBUX is at the 52-week high. T2 ($120) requires a genuine breakout to new highs. This is a higher-conviction entry only after the stock confirms above $107.27 on meaningful volume._

---

### 3. PSX — Phillips 66 (Energy / Oil & Gas Refining)

```
Ticker: PSX
Current Price: $172.90
Sector: Energy — Oil & Gas Refining & Marketing
Score: 61/100 (A:35 B:0 C:15 D:11 Ded:0 — B-Xtrender unconfirmed)

Setup Summary:
Phillips 66 reported Q1 2026 earnings today, significantly beating estimates: adjusted EPS
$0.49 vs. -$0.55 expected, revenue $33B vs. $29.5B expected. The stock surged ~6.7% in
pre-market and closed at $172.90. The company completed full ownership of the Borger and
Wood River refineries (+45,000 bbl/day capacity) and laid out a credible debt reduction
plan from $27B → $17B by end-2027. JMP upgraded to Market Outperform. The prior
pullback from $190.61 (52W high) to $153.58 (Apr 17 low) set up a classic momentum
pullback, and today's gap recovery on strong earnings validates the bull thesis.

Entry Zone: $170–$174 (current zone; earnings reaction now defines new support)
Stop Loss: $153.00 — below prior swing low at Apr 17 bottom
Target 1: $190.61 — prior 52-week high
Target 2: $200.00 — measured move / round-number extension
Risk/Reward: T1 = 0.88:1 | T2 = 1.35:1

Key Risks:
- R:R below 1.5:1 on both targets — best entry would have been the $153–$160 zone
  before earnings; current entry has compressed upside
- High debt load ($27B); debt-to-capital at 48%; management has plan to reduce but
  execution risk exists
- Refining margins volatile with crude price and crack spread movements
- TradingView visual indicators unavailable — B-Xtrender confirmation missing
- Score of 61 is the lowest of the three; watchlist candidate if entry improves on pullback

Fundamental Note:
Revenue growing modestly (+1.3% TTM) with low forward PE of ~11x — cheap valuation
in the sector. Q1 2026 EPS beat driven by refinery expansion and 138% worldwide market
capture. Refining utilization 95% at $10.11/BBL margin. $778M returned to shareholders
in Q1. JMP upgraded to Market Outperform. Next earnings: ~July 2026.
```

**Instrument: Paired Debit Spread (Bullish)**  
_Expiry: June 18, 2026 (~50 DTE preferred for better theta)_

Primary Spread:
- Structure: Bull Call Spread
- Strikes: Long $170 / Short $185 call (or $175/$190)
- Net Debit: ~$7–$9 (indicative; verify at execution for June chain)
- Max Profit: ~$6–$8 per spread
- Max Loss: ~$7–$9 per spread

Hedge (half-size):
- Structure: Bear Put Spread
- Strikes: Long $165 / Short $155 put
- Half-size
- Triggers if PSX reverses below $165

_⚠️ PSX has the lowest score (61) and poorest R:R of the three. Consider watchlisting until a pullback to $163–$168 (near the 50 EMA, improving R:R to ~1.5:1 or better)._

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| XOM | Strong uptrend, near 50 EMA; earnings May 1 create event risk | Entry after earnings confirmed, below $150 near 50 EMA |
| CVX | Same profile as XOM; near 50 EMA, solid fundamentals | Post-earnings entry if pullback to $185–$188 zone |
| EOG | Clean E&P uptrend, low PE; earnings May 5 | Post-earnings entry at or below 50 EMA (~$131) |
| OXY | High-beta energy uptrend; earnings May 5 | Wait for earnings clearance; entry around $54–$56 |
| MPC | Refining pure-play, near 50 EMA; earnings May 5 | Post-earnings entry at $220–$225 |
| LNG | Strong LNG demand thesis; earnings May 7 | Entry after earnings at ~$255–$260 (50 EMA zone) |
| CBOE | Financial exchanges uptrend, near ATH; earnings May 1 | Post-earnings entry if pullback to $285–$295 |
| COP | E&P leader, earnings TOMORROW (April 30) | Post-earnings entry if pull to $118–$120 (50 EMA) |
| PSX | Score 61; R:R improves on pullback | Re-entry if pullback to $163–$168 improves R:R to ≥1.5:1 |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

_No open trades — no trades were confirmed in the previous scheduled run (April 16 was an empty scan)._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

---

## Performance Summary
_All closed trades (outcome recorded)._

_No closed trades on record yet._

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
