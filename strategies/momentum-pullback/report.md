# Momentum After Pullback — Current Report
_Last updated: 2026-04-30_

---

## Market Context

The S&P 500 (SPY) closed at **$718.78**, sitting **+5.9% above its 50-day MA** ($678.72) and **+7.7% above its 200-day MA** ($669.97) — a healthy uptrend with no signs of breakdown. VIX is **~17.3**, well below the 25 danger threshold, indicating subdued fear and supportive conditions for momentum trades. The broad environment is bullish: the market is in a confirmed uptrend on both daily and weekly timeframes, making long-side pullback setups the highest-probability orientation. No downtrend filter applied.

---

## Scan Summary

**Scanner**: Momentum After Pullback (yfinance-based replication; TrendSpider/browser-use unavailable in environment)  
**Scan date**: 2026-04-30  
**Universe screened**: ~208 S&P 500 stocks  
**Candidates passing all 4 groups**: 36 tickers  

All 4 groups required:
- Group 1: Price > 200EMA (daily); Weekly EMA50 > EMA200; Price > Weekly EMA50
- Group 2: Rising 200EMA (40-bar lookback); Rising 50EMA (20-bar lookback)
- Group 3: Price within ±3% of daily 50 EMA in last 5 bars
- Group 4: At least one timing trigger (A: cross above 20EMA / B: RSI back above 50 / C: close above prior high)

---

## Earnings Filter Results

Tickers disqualified by earnings within 3 weeks (before May 21):
- **BMY** (April 30 today), **COP** (April 30), **AME** (April 30)
- **XOM**, **CVX** (May 1), **EMR**, **DUK**, **ROK**, **LYV**, **EOG** (May 5)
- **SRE**, **MAR** (May 6/7)
- **WMT**, **DE** (May 21 — borderline, -20 pt deduction applied)

---

## Today's Suggested Trades

### 1. NEM (Newmont Mining) — Pullback to 50 EMA post-massive earnings beat

```
Ticker: NEM
Current Price: $111.26
Sector: Basic Materials (Gold Mining)
Score: 89/115 (A:41 B:18 C:20 D:15 Ded:-5)

Score Breakdown:
  Category A — Technical (41/55):
    Weekly uptrend (EMA50 > EMA200, price > W_EMA50): 10 pts
    Daily uptrend (price > 200EMA, rising EMAs): 8 pts
    Pulling back to 50EMA support zone (-1%): 10 pts
    Volume declining on pullback: 7 pts
    Continuation pattern (high-tight flag post-earnings gap): 3 pts
    B-Xtrender background bars green (gold sector on fire): 3 pts [estimated; no TV access]
  Category B — Risk/Reward (18/25):
    R:R ~2.4:1 at T1 → 18 pts
  Category C — Fundamentals (20/20):
    Beat Q1 2026 EPS: $2.90 vs $2.07 est (+40% beat): 6 pts
    Revenue growth +45.8% YoY: 5 pts
    EPS growth +78.6% YoY: 5 pts
    Analyst upgrade (Wall Street Zen April 25, Canaccord PT to $150 April 17, multiple raises): 4 pts
  Category D — Catalyst & Momentum (15/15):
    Post-earnings beat catalyst + $6B buyback authorization + record free cash flow: 8 pts
    Gold sector in strong uptrend (record gold prices, safe-haven demand): 7 pts
  Deductions (-5):
    Insider selling March 16 (CFO sold ~18K shares at $111.45): -5 pts

Setup Summary:
NEM pulled back cleanly to the daily 50 EMA ($112.59) after a massive Q1 earnings beat
on April 23 (EPS $2.90 vs $2.07 est, revenue $7.31B vs $6.83B est). The 14-year low RSI
reading (48) with price hugging the 50 EMA creates a textbook momentum-pullback entry.
Gold remains in a structural uptrend driven by geopolitical uncertainty and central bank
buying. Multiple analyst price target upgrades post-earnings confirm fundamental strength.

Entry Zone: $109–$113 (50 EMA band; current price $111.26)
Stop Loss: $103.00 — below recent swing low and ~1.5x ATR below entry
Target 1: $130.00 — approaching prior 6-month resistance zone
Target 2: $134.00 — 52-week high / prior cycle peak
Risk/Reward: ~2.4:1 at T1 (entry $111 – stop $103 = $8 risk; T1 $130 – entry = $19 reward)

Key Risks:
- Insider selling in March may signal near-term caution from management
- Ghana regulatory risk: local contractor mandate by Dec 2026 could increase costs
- Gold price reversal if risk-on sentiment surges (gold is a safe-haven; risk rally = headwind)
- Next earnings: July 23, 2026 (clear — no earnings risk for position hold)

Fundamental Note:
Q1 2026 was a landmark quarter: EPS $2.90 vs $2.07 est, revenue up 45.8% YoY, driven by
record realized gold prices. The board authorized an additional $6B share buyback and record
quarterly free cash flow of ~$3.1B. Consensus: Moderate Buy with avg PT $140.

Instrument: Paired Debit Spread (Bullish)
Expiry: June 18, 2026 (~49 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy 110 / Sell 120
  Net Debit: ~$3.95/spread (~$790 total)
  Max Profit: ~$6.05/spread (~$1,210 total)
  Max Loss: ~$790

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy 110 / Sell 100
  Net Debit: ~$3.92/spread (~$392 total)
  Max Profit: ~$6.08/spread (~$608 total)
  Max Loss: ~$392

Combined Position:
  Total Debit / Max Loss: ~$1,182
  Expected Payout if thesis is right (NEM >$120): ~+$818 net
  Expected Payout on violent move against thesis (NEM <$100): ~+$216 net (hedge offsets)
  Main Risk: drift/time decay if NEM stays pinned $100–$120 through expiry
```

---

### 2. COST (Costco Wholesale) — Orderly consolidation above 50 EMA after dividend raise

```
Ticker: COST
Current Price: $1,016.04
Sector: Consumer Defensive (Discount Retail)
Score: 84/115 (A:39 B:10 C:20 D:15 Ded:0)

Score Breakdown:
  Category A — Technical (39/55):
    Weekly uptrend: 10 pts
    Daily uptrend: 8 pts
    Pulling back to 50 EMA zone (+2.3% above EMA; tested zone in last 5 bars): 10 pts
    Volume declining on pullback: 7 pts
    Continuation pattern (consolidation above $1,000 after break): 4 pts
    B-Xtrender: unconfirmed (no TV access) → 0 pts
  Category B — Risk/Reward (10/25):
    R:R ~1.5:1 using extended analyst PT targets → 10 pts
    [Note: upside is constrained by proximity to 52W high at $1,062; spread R:R is narrow]
  Category C — Fundamentals (20/20):
    Beat Q1 2026 EPS ($4.58 vs $4.55 est): 6 pts
    Revenue growth +9.2% YoY: 5 pts
    EPS growth +13.9% YoY: 5 pts
    Multiple analyst upgrades (Mizuho PT raised to $1,100, BMO $1,315, Bank of America Buy): 4 pts
  Category D — Catalyst & Momentum (15/15):
    13% dividend increase to $1.47/quarter (April 15, 2026) + March comps +11.3%: 8 pts
    Consumer Defensive sector bid as defensive rotation accelerates: 7 pts
  Deductions: 0

Setup Summary:
Costco consolidated above the $1,000 breakout zone and pulled back to within 2.3% of its
daily 50 EMA ($991.63) on declining volume — classic orderly continuation setup. The
April 15 dividend increase (13%, to $1.47/quarter) was a fresh positive catalyst, and
March comparable sales of +11.3% YoY showed momentum. Mizuho raised its PT to $1,100
and maintained Outperform on April 16.

Entry Zone: $995–$1,020 (50 EMA band to current range)
Stop Loss: $955.00 — below 200-day MA support band and prior consolidation base
Target 1: $1,062 — 52-week high and prior resistance
Target 2: $1,100 — Mizuho analyst price target / extension zone
Risk/Reward: ~1.5:1 at T1, ~2.0:1 at T2 (entry $1,010, stop $955 = $55 risk; T1 $1,062 = $52)

Key Risks:
- Next earnings: May 28, 2026 (~28 days, just outside 3-week filter; caution if holding)
- Valuation stretched: P/E ~52x; richly priced relative to the market
- Tariff/supply chain pressure could squeeze already thin membership-model margins
- Limited immediate upside to 52W high ($1,062); spread construction difficult at these levels

Fundamental Note:
Q1 FY2026: EPS $4.58 (beat), revenue $69.6B (+9.2% YoY). Membership income grew 13.6%
to $1.36B with 89.7% renewal rate globally (82.1M paid members). Digital comparable sales
surged 22.6%. Strong dividend growth: 12% over past 12 months; 23 consecutive years.

Instrument Note:
Paired debit spread is structurally difficult for COST given the proximity of the 52W high
and the high absolute spread cost. Stock position or bull call spread with May 28 expiry
(before earnings) is the cleaner instrument. See spread sizing guidance in instruments.md.

Instrument: Bull Call Spread (primary only; hedge omitted due to spread pricing constraints)
Expiry: May 23, 2026 (~23 DTE, before earnings May 28)

Primary Spread:
  Structure: Bull Call Spread
  Strikes: Buy 1010 / Sell 1040
  Net Debit: ~$13.90 per spread (~$1,390 per contract)
  Max Profit: ~$16.10 per spread (~$1,610 per contract)
  Max Loss: ~$1,390

Alternative: Stock (100 shares): Entry ~$1,000–$1,020 | Stop $955 | Target $1,062
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| EMR | Score 79/115 — exceptional technical setup (all 3 triggers, tightest to 50 EMA in scan, +0.2%). But earnings May 5 (5 days away). R:R is the best in the scan at 3.4:1. Strong Q1 beat, AI/LNG data center order growth, raised FY guidance. | After Q2 earnings on May 5 — if results beat and stock holds the 50 EMA or retests it, this becomes the highest-conviction pick next run |
| BAC | Score 65/115 — strong Q1 beat (EPS +23% YoY), earnings clear until July 14, financials sector momentum. Technical setup weaker: only 1 trigger, volume rising on pullback, needs to consolidate further. | Pullback to 50 EMA ($51.50–$52.00) on declining volume with RSI reset below 55 |
| DE | Score 49/115 after -20 pt deduction for earnings May 21. Technically constructive (multiple triggers, declining volume, rising trend) but fundamental headwinds: large ag volume down 15-20%, tariff costs $1.2B. | After May 21 earnings; re-score without earnings deduction if results surprise to upside |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

_No open trades. This is an unattended/scheduled run — no trades confirmed._

---

## 14-Day Outcome Tracking

Reviewed `trades-log.csv`. Only existing row is the April 16, 2026 empty-scan entry (`No tickers found in scan — skipping run`). No outcome tracking required.

---

## Performance Summary
_All closed trades (outcome recorded)._

No closed trades on record yet.

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate:** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Notes — Scheduled Run
This was an **unattended/scheduled run** (cron trigger). Per Step 6 of AGENT.md, no trade rows have been appended to the CSV. The suggested trades (NEM and COST) are recommendations for the trader to review and open if they agree. Trade rows should be logged manually or via the next attended session once positions are confirmed.
