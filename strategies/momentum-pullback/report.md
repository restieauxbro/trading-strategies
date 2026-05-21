# Momentum After Pullback — Current Report
_Last updated: 2026-05-21_

---

## Market Context

The S&P 500 (SPY) is trading at **$741.64**, decisively above both its 50-day MA ($694.84, +6.7%) and 200-day MA ($675.65, +9.8%), confirming a strong uptrend. VIX is at **17.0** — well below the danger threshold of 25, indicating subdued volatility and a risk-on environment. The overall trend is **confirmed uptrend**; no downtrend filters apply. Financials, Industrials (particularly power/AI infrastructure), and Consumer Cyclical (travel/hospitality) subsectors are leading. Energy is mixed. This is a favourable backdrop for momentum continuation setups.

_Note: browser-use / TradingView visual confirmation is unavailable in this environment. B-Xtrender points (15 pts) are withheld from Category A scores and a -5 deduction applied to each ticker. Actual entry should include a visual TradingView check before order placement._

---

## Scan Results

**Scan method:** yfinance replication of TrendSpider "Momentum after pullback" conditions  
**Universe:** ~139-stock S&P 500 sample  
**Tickers passing all 4 scan groups:** 11 (PNC, CVX, ETN, HLT, NSC, TRV, PLD, EQIX, MAR, GS, KLAC)

**Earnings filter (≤ 21 days):** None triggered — all 11 tickers next report in July/August 2026.

**Outcome tracking:** Only one prior row in `trades-log.csv` (2026-04-16 empty scan). No outcomes due.

---

## Today's Suggested Trades

### 1. PNC Financial Services — 50-Day EMA Retest in Confirmed Uptrend

```
Ticker: PNC
Current Price: $217.87
Sector: Financial Services
Score: 88/115 (A:40 B:18 C:20 D:15 Ded:-5)

Setup Summary:
PNC is testing its 50-day EMA ($216.02) following a tidy consolidation — the
classic momentum-pullback re-entry pattern. Volume has been essentially flat
to declining on the pullback (vol ratio 0.99), showing no distribution. The
stock is 10.1% below its 52-week high ($242.08), leaving substantial room to
run. The Citigroup price-target raise to $255 (May 9) provides a near-term
catalyst confirming institutional interest.

Entry Zone: $215–$220
Stop Loss: $209.50 — below recent swing low and 50d EMA band
Target 1: $235 — prior resistance / next consolidation zone
Target 2: $242 — 52-week high / analyst mean consensus ($243)
Risk/Reward: 2.1:1 (to T1), 2.8:1 (to T2)

Key Risks:
- Office real estate loan book: 30.1% "high criticism" — a credit risk if CRE
  conditions deteriorate
- Potential macro headwinds if rate expectations shift hawkishly
- Next earnings: July 15, 2026 (55 days away — well clear of 3-week filter)

Fundamental Note:
PNC reported strong Q1 2026 results (Apr 15): EPS $4.13 GAAP / $4.32 adjusted,
NII up 6%, average loans +7% driven by FirstBank acquisition. Revenue growth
13.8% YoY; earnings growth 17.7% YoY. Analyst consensus: Moderate Buy,
mean PT $243; Citigroup PT $255.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: June 26, 2026 (~36 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1 contract
  Strikes: Long $215C / Short $225C
  Net Debit: ~$5.10 per spread (~$510 total)
  Max Profit: ~$4.90 per spread (~$490 total)
  Max Loss: ~$510

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 2 contracts (half the dollar risk of primary)
  Strikes: Long $210P / Short $205P
  Net Debit: ~$1.23 per spread (~$246 total for 2)
  Max Profit: ~$3.77 per spread (~$754 total for 2)
  Max Loss: ~$246

Combined Position:
  Total Debit / Max Loss: ~$756 (if both expire at-the-money / worthless)
  Expected Payout if thesis is right (PNC > $225): ~$244 net (+$490 primary − $246 hedge)
  Expected Payout on violent move against thesis (PNC < $205): ~$508 net (+$754 hedge − $510 primary loss × partial)
  Main Risk: stock drifts sideways through June expiry — both spreads decay
```

---

### 2. Eaton Corporation (ETN) — Oversold Test of 50-Day EMA in AI Infrastructure Leader

```
Ticker: ETN
Current Price: $383.37
Sector: Industrials (Electrical Power Management)
Score: 76/115 (A:40 B:10 C:16 D:15 Ded:-5)

Setup Summary:
ETN has pulled back 11.7% from its 52-week high ($434.23) and is currently
trading -1.8% below its 50-day EMA ($390.55) with RSI at a oversold 35.4.
Volume on the pullback has declined (vol ratio 0.88), suggesting orderly
consolidation rather than distribution. With record Q1 2026 results just
reported (17% revenue growth, guidance raised, data center orders +240%),
the fundamental thesis remains intact. Trigger C fired: close above prior
day's high after pullback.

Entry Zone: $380–$392 (around 50d EMA; enter on recovery signal above $385)
Stop Loss: $364 — below 200-day EMA ($363.83) and key structural support
Target 1: $415 — prior swing high / resistance zone
Target 2: $450 — analyst consensus mean price target
Risk/Reward: 1.5:1 (to T1, entry $385), 2.8:1 (to T2)

Key Risks:
- Elevated IV (39%) makes options spreads wider; verify spreads at entry
- AI/data center spending could slow if macro conditions tighten
- Next earnings: August 4, 2026 (75 days away — clear)

Fundamental Note:
Eaton reported record Q1 2026 (May 6): revenue $7.5B (+17% YoY), adjusted EPS
$2.81 (beat), raised FY2026 organic growth guidance to 10% midpoint. Data
center backlog 228 GW (12 years at 2025 build rates); Boyd Thermal acquisition
adds liquid-cooling capability. Analyst mean target: $450, high target $514.
Revenue growth 16.8% YoY; free cash flow +245% YoY.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: June 26, 2026 (~36 DTE)

Note: ETN IV is elevated (~38-39%). Spreads are wide — verify mid-prices
before placing orders.

Primary Spread:
  Structure: Bull Call Spread
  Size: 1 contract
  Strikes: Long $385C (est.) / Short $400C
  Net Debit: ~$6.00 per spread (~$600 total, indicative)
  Max Profit: ~$9.00 per spread (~$900 total)
  Max Loss: ~$600

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (approx. half the dollar risk)
  Strikes: Long $380P / Short $365P
  Net Debit: ~$5.60 per spread (mid of $14.95 long − $9.20 short)
  Max Profit: ~$9.40 per spread (~$940 total)
  Max Loss: ~$560

  [Note: $380P mid ≈ $14.95, $365P mid ≈ $9.70 — verify at execution]

Combined Position:
  Total Debit / Max Loss: ~$1,160 (both spreads expire worthless)
  Expected Payout if thesis is right (ETN > $400): ~$340 net (+$900 primary − $560 hedge)
  Expected Payout on violent move against (ETN < $365): ~$380 net (+$940 hedge − $600 primary)
  Main Risk: drift / chop at $383–$400 through June — both spreads decay
```

---

### 3. Hilton Worldwide (HLT) — Post-Earnings Pullback to 50-Day Support in Travel Uptrend

```
Ticker: HLT
Current Price: $322.67
Sector: Consumer Cyclical (Hotels & Lodging)
Score: 72/115 (A:40 B:10 C:16 D:11 Ded:-5)

Setup Summary:
Hilton pulled back after its April 28 Q1 2026 earnings release (stock fell
1.2% to $328.55 despite a beat), and has since settled near its 50-day EMA
($316.12). Volume has declined sharply (vol ratio 0.71) — a classic healthy
pullback signature. Trigger A fired: close back above the 20-day EMA. The
pipeline hit a record 527,000 rooms and full-year 2026 guidance was raised,
supporting renewed upside momentum.

Entry Zone: $319–$325 (current 50d EMA zone; enter at or below current price)
Stop Loss: $309.50 — below recent post-earnings swing low
Target 1: $345 — 52-week high area ($344.75)
Target 2: $360 — measured move / extension above 52wk high
Risk/Reward: 1.7:1 (to T1), 2.9:1 (to T2)

Key Risks:
- Near 52-week high: significant supply zone at $344–$345
- Travel demand slowdown if consumer confidence weakens
- Next earnings: July 29, 2026 (69 days away — clear)

Fundamental Note:
HLT Q1 2026 (Apr 28): adj. EPS $2.01 vs. $1.94 consensus (beat), revenue
+9% YoY, EBITDA +13%, guidance raised. RevPAR +3.6% currency-neutral,
record development pipeline of 527K rooms. EPS growth 35% YoY, revenue
growth 11% YoY.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: June 26, 2026 (~36 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1 contract
  Strikes: Long $320C / Short $330C
  Net Debit: ~$5.00 per spread (mid: $14.00 long − $8.85 short ≈ $5.15)
  Max Profit: ~$4.85 per spread (~$485 total)
  Max Loss: ~$515

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long $315P (est. ~$10.50) / Short $305P (est. ~$6.50)
  Net Debit: ~$4.00 per spread (~$400 total, indicative)
  Max Profit: ~$6.00 per spread (~$600 total)
  Max Loss: ~$400

  [Note: $315P and $305P not in today's chain snapshot — verify bid-ask at entry]

Combined Position:
  Total Debit / Max Loss: ~$915 (both spreads expire worthless)
  Expected Payout if thesis is right (HLT > $330): ~$85 net (+$485 primary − $400 hedge)
  Expected Payout on violent move against (HLT < $305): ~$85 net (+$600 hedge − $515 primary)
  Main Risk: drift / pinning at $320–$330 through June — decay with no payout
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Score | Why Watching | Trigger to Revisit |
|--------|-------|--------------|--------------------|
| PLD | 74/115 | Industrial REIT near 52-wk high ($145 vs $145.44 52wk H). Strong data center expansion (5.6 GW pipeline), Q1 beat. BUT: current price is at resistance, not yet a clean pullback entry. | Confirmed breakout above $145.50 on volume, or next pullback to $138–140 (50d EMA retest) |
| TRV | 54/115 | Travelers had extraordinary Q1 (EPS growth 357% YoY vs low prior-year base). Financial Services uptrend. BUT: price at $307 vs 52wk high $312 — only $5 of near-term upside, R:R < 1.5:1 to any meaningful target. | Pull back to $292–$296 (50d EMA $299 zone after a deeper correction) to reset R:R above 2:1 |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades (all prior runs were scheduled/unattended; no trades confirmed)._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| — | — | — | — | — | — |

_No closed trades yet. Only prior logged row is the 2026-04-16 empty scan._

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Discarded Tickers (Below 55-point Threshold)

| Ticker | Score | Reason |
|--------|-------|--------|
| CVX | ~36 | Energy sector earnings down 44.5% YoY; volume not declining on pullback; poor R:R to T1 |
| NSC | ~30 | Only 3% below 52-week high → tiny upside; revenue growth 0.2%; earnings down 26.6% |
| MAR | ~50 | $370 current vs $380 52wk high — only $10 upside; earnings growth barely positive |
| GS | ~40 | 7.8% above 50d EMA (too extended); trading within $15 of 52wk high $999; R:R < 0.5:1 to T1 |
| KLAC | ~25 | 8.4% above 50d EMA; $1,846 vs 52wk high $1,937 → $91 upside vs $143 risk; R:R 0.64:1 |
| TRV | 54 | Just below threshold; near 52wk high limits immediate R:R; added to watchlist |
