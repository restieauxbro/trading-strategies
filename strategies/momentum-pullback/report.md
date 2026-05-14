# Momentum After Pullback — Current Report
_Last updated: 2026-05-14_

---

## Market Context

The S&P 500 is at 7,507 — well above its 200-day EMA (6,746) by +11.3% and at a new 52-week high. The index has returned +6.9% in the past month and +8.1% over three months, indicating a strong, broad-based recovery rally. VIX is at 17.26 (calm; peaked at 31 in the past 3 months but has since compressed sharply), confirming the fear environment has normalised. Overall market regime: **confirmed uptrend** — bullish conditions are favourable for momentum pullback setups. No downtrend filters apply.

---

## Scan Notes

TrendSpider browser-use unavailable in this environment (scheduled cloud run). Scan was replicated using yfinance against the full S&P 500 (503 tickers), applying all five groups from `config.md`: daily 200 EMA trend alignment, weekly golden cross structure, rising EMAs, price within ±3% of daily 50 EMA in last 5 bars, and at least one timing trigger (20 EMA recross, RSI cross above 50, or close above prior day's high). **39 of 503 S&P 500 stocks passed all criteria today.** TradingView visual confirmation (B-Xtrender, Fair Value Bands) was unavailable; B-Xtrender scoring categories are excluded from totals below.

---

## Today's Suggested Trades

### 1. HLT — Hilton Worldwide Holdings (Hospitality)

```
Ticker: HLT
Current Price: $315.88
Sector: Consumer Cyclical — Lodging / Hospitality
Score: 93/115 (A:40 B:18 C:20 D:15 Ded:0) [B-Xtrender categories excluded — unavailable]

Setup Summary:
HLT pulled back precisely to its 50-day EMA ($315.37) over the past week and is now
recovering, with declining volume on the down days (healthy consolidation, not distribution).
The weekly golden cross structure is intact, the 200-day EMA is rising, and RSI has
re-crossed above 50. Multiple analysts raised price targets to $347–$390 in the two weeks
following Q1 earnings, adding a fresh catalyst layer to an already clean technical setup.

Entry Zone: $314–$318 (near daily 50 EMA)
Stop Loss: $304 — below recent swing low and ~3.5% below entry
Target 1: $342 — 52-week high resistance zone
Target 2: $370 — UBS analyst target / measured move extension
Risk/Reward: 2.4:1 (to T1)

Key Risks:
- Q2 2026 earnings scheduled July 22 (well beyond the 3-week filter)
- HLT missed Q1 revenue estimates slightly (beat EPS but not top line)
- High-beta consumer cyclical — could underperform in any macro risk-off move

Fundamental Note:
Q1 2026 adjusted EPS of $2.01 beat consensus (~$1.97); revenue +9% YoY to $2.94B;
full-year 2026 EPS guidance raised to $8.79–$8.91. Five analysts (Morgan Stanley,
UBS, Bank of America, HSBC, TD Cowen) raised price targets in April–May 2026,
with targets ranging $319–$390.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Jun 18 2026 (~35 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 310 / Short 320
  Net Debit: ~$5.50 per spread (~$11.00 mid: $14.80 – $9.30)
  Max Profit: ~$4.50 per spread ($900 total on 2 contracts)
  Max Loss: ~$5.50 per spread ($1,100 total on 2 contracts)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long 300 / Short 290
  Net Debit: ~$1.82 per spread ($182 on 1 contract)
  Max Profit: ~$8.18 per spread ($818 on 1 contract)
  Max Loss: ~$1.82 per spread ($182 on 1 contract)

Combined Position:
  Total Debit / Max Loss: ~$1,282
  Expected Payout if thesis is right (HLT above 320 at expiry): ~$718
  Expected Payout on violent drop (HLT below 290 at expiry): ~−$282
  Main Risk: drift / chop / HLT pinned between 310 and 320 into expiry
```

---

### 2. EOG — EOG Resources (Energy E&P)

```
Ticker: EOG
Current Price: $136.22
Sector: Energy — Oil & Gas E&P
Score: 86/115 (A:33 B:18 C:20 D:15 Ded:0) [B-Xtrender excluded — unavailable]

Setup Summary:
EOG pulled back to its 50-day EMA ($132.94) — touching within 0.49% at the low —
and has since recovered with all three timing triggers firing (RSI crossed above 50,
closed above 20 EMA, closed above prior day's high). The weekly golden cross and
rising 50/200 EMAs confirm an intact long-term uptrend. The company just posted
a blowout Q1 2026 report (revenue +22% YoY, EPS beat by $0.20) and raised
production guidance, with four analysts upgrading or lifting price targets in the
week following results.

Entry Zone: $134–$137 (near 50-day EMA retest zone)
Stop Loss: $129 — below the 50-day EMA with a buffer ($3 cushion)
Target 1: $149 — 52-week high / analyst target cluster (Mizuho $149, Truist $149)
Target 2: $162 — measured move extension / Morgan Stanley target $155 area
Risk/Reward: 2.1:1 (to T1, with stop at $129)

Key Risks:
- Q2 2026 earnings August 6 (well beyond the 3-week filter)
- Oil price volatility remains a macro risk for E&P names
- Volume elevated on pullback down-days (less orderly than HLT's pullback)

Fundamental Note:
Q1 2026 adjusted EPS $3.41 vs $3.21 consensus (beat +6.2%); total revenue $6.92B
vs $6.18B expected (beat by 12%); oil production up 9% YoY. EOG returned $950M
to shareholders via dividends + buybacks and raised full-year production guidance.
Energy sector broadly bullish (COP, FANG, DVN, EOG all passing the scan today).
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Jun 18 2026 (~35 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 135 / Short 140
  Net Debit: ~$2.40 per spread (~$4.80 mid: $6.35 – $3.95)
  Max Profit: ~$2.60 per spread ($520 total on 2 contracts)
  Max Loss: ~$2.40 per spread ($480 total on 2 contracts)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long 130 / Short 125
  Net Debit: ~$1.17 per spread ($117 on 1 contract; $2.45 – $1.28)
  Max Profit: ~$3.83 per spread ($383 on 1 contract)
  Max Loss: ~$1.17 per spread ($117 on 1 contract)

Combined Position:
  Total Debit / Max Loss: ~$597
  Expected Payout if thesis is right (EOG above 140 at expiry): ~$403
  Expected Payout on violent drop (EOG below 125 at expiry): ~−$97 (near breakeven)
  Main Risk: drift or stagnation near entry price over 35 days
```

---

### 3. FDX — FedEx Corporation (Freight & Logistics)

```
Ticker: FDX
Current Price: $378.20
Sector: Industrials — Integrated Freight & Logistics
Score: 78/115 (A:33 B:10 C:20 D:15 Ded:0) [B-Xtrender excluded — unavailable]

Setup Summary:
FDX touched its 50-day EMA ($369.92) within 0.03% at the low — the cleanest 50 EMA
retest in the scan — and has recovered with triggers A and B both firing. The company
posted a massive Q3 FY2026 earnings beat (EPS $5.25 vs $4.09 expected, +27%) and
raised full-year guidance significantly. Analyst consensus has moved materially higher
with targets in the $412–$450 range. Note: Q4 FY2026 earnings are June 23; the
Jun 18 expiry on the proposed spread exits before that catalyst.

Entry Zone: $374–$380 (50 EMA bounce zone)
Stop Loss: $362 — below 50 EMA with a 2% buffer
Target 1: $403 — 52-week high resistance
Target 2: $435 — analyst consensus / measured move (Stifel $442, Wells $450)
Risk/Reward: 1.6:1 (to T1, stop at $362); 3.6:1 (to T2)

Key Risks:
- Q4 FY2026 earnings June 23 (6 weeks out; within stated expiry window — spreads
  should expire Jun 18 to avoid earnings risk)
- Macro sensitivity: FedEx is a global macro barometer; any trade-flow concerns
  (tariffs, global slowdown) could pressure the stock
- Volume elevated on recent pullback days

Fundamental Note:
Q3 FY2026 adjusted EPS $5.25 vs $4.09 estimated (beat 27%); revenue $24.0B vs
$23.4B estimated; YoY EPS growth +16.4%, revenue +8.3%. Full-year guidance raised
to $19.30–$20.10 adjusted EPS. Network 2.0 restructuring targeting $1B+ in cost
savings driving margin expansion narrative.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Jun 18 2026 (~35 DTE, expires before Jun 23 earnings)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 370 / Short 380
  Net Debit: ~$5.87 per spread (~$11.74 mid: $19.80 – $13.93)
  Max Profit: ~$4.13 per spread ($826 total on 2 contracts)
  Max Loss: ~$5.87 per spread ($1,174 total on 2 contracts)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long 360 / Short 350
  Net Debit: ~$2.83 per spread ($283 on 1 contract; $7.23 – $4.40)
  Max Profit: ~$7.17 per spread ($717 on 1 contract)
  Max Loss: ~$2.83 per spread ($283 on 1 contract)

Combined Position:
  Total Debit / Max Loss: ~$1,457
  Expected Payout if thesis is right (FDX above 380 at expiry): ~$543
  Expected Payout on violent drop (FDX below 350 at expiry): ~−$457
  Main Risk: FDX stays between 370 and 380 into Jun 18 expiry (spread pinning)
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| ETN | Record Q1 2026 (+17% revenue, data center orders +240%); strong uptrend. Price has already bounced 4% from 50 EMA — missed the ideal pullback entry. | Next pullback to 50 EMA (~$392); watch for trigger A or B to re-fire |
| LIN | Q1 2026 beat (EPS +10% YoY, revenue +8%); excellent business. Currently at 52-week high ($513) — very limited R:R to any near-term resistance. | Pullback to $490–$500 zone (50 EMA); R:R improves materially from there |
| ALL | Massive Q1 EPS beat ($10.65 vs $7.43 expected); fundamentally strong. Price at $216 vs 52-week high $219 — minimal upside room without a breakout. | Clean break above $220 on volume + hold; or pullback to 50 EMA ($212) for better R:R |
| NDAQ | Clean multi-trigger setup, near 52-week high area; financial sector in favor. | Confirmed hold above $91 on volume; or pullback to $88 50 EMA |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed trades on record (prior run on 2026-04-16 was an empty scan)._

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

## Scan Details (2026-05-14)
_Scan run via yfinance (browser-use unavailable in scheduled cloud environment)_

- **Universe:** S&P 500 (503 tickers)
- **Tickers passing all scan criteria:** 39
- **Full list:** AFL, LNT, ALL, MO, ANET, CF, CINF, C, COP, CTVA, COST, DVN, FANG, D, DTE, ETN, EOG, EVRG, FDX, FCX, GM, HAS, HLT, JBHT, JCI, KMI, LIN, NDAQ, NEE, NI, NSC, ODFL, OKE, PSX, SLB, SPG, TT, WMT, WMB
