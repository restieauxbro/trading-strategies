# Momentum After Pullback — Current Report
_Last updated: 2026-05-17_

---

## Market Context

The S&P 500 (SPY) closed at $739.17 on Friday May 15, 2026 — +10.1% above its 200-day EMA ($671.44) and +5.1% above its 50-day EMA ($703.18). The index has returned +5.3% over the past month and +8.5% over three months, confirming a strong, sustained recovery rally from the February–April 2026 tariff-driven selloff. VIX sits at 18.43 (calm, normalising from a 3-month high of 35.30 reached during the April volatility spike). Overall regime: **confirmed uptrend** — bullish conditions are favourable for momentum pullback setups. No downtrend filters apply. Insurance and Industrials sectors are in strong favour.

---

## Scan Notes

TrendSpider browser-use unavailable in this environment (scheduled cloud run). Scan replicated via yfinance against 465 S&P 500 constituents, applying all five filter groups from `config.md`:
1. Daily price above 200-day EMA
2. Weekly golden cross (50 EMA > 200 EMA) and weekly price above 50 EMA
3. Rising 200-day EMA (vs 40 bars ago) and rising 50-day EMA (vs 20 bars ago)
4. Price within ±3% of daily 50 EMA in last 5 bars
5. At least one timing trigger: 20 EMA recross, RSI cross above 50, or close above prior day's high

**18 of 465 S&P 500 stocks passed all criteria today:** ALL, APA, CINF, COP, COST, DVN, EOG, HAS, JBHT, JCI, KMI, MO, NSC, ODFL, OKE, PSX, TRV, WMT

TradingView visual confirmation (B-Xtrender, Fair Value Bands) was unavailable in this environment. B-Xtrender scoring categories are excluded from totals below; maximum achievable score is 100/115.

---

## Today's Suggested Trades

### 1. TRV — The Travelers Companies (Property & Casualty Insurance)

```
Ticker: TRV
Current Price: $299.76 (as of May 15, 2026)
Sector: Financial Services — Property & Casualty Insurance
Score: 92/115 (A:37 B:25 C:20 D:15 Ded:-5) [B-Xtrender categories excluded — unavailable]

Setup Summary:
TRV has pulled back precisely to its 50-day EMA ($298.91) after rallying to a 52-week
high of $311.98 in early May. The pullback is orderly — volume is essentially flat at
1.03x the 20-day average (not distribution). RSI dipped to 35 at the April lows and
has now crossed back above 50 (Trigger B firing), while price sits just above both the
50-day EMA ($298.91) and 20-day EMA ($299.89). Q1 2026 EPS of $7.71 crushed the $7.08
consensus (+8.9%); six firms raised price targets in April–May (KBW $340, Evercore
$321, Roth, BMO, Cantor, UBS). Deduction: one insider sale (Vice Chairman $484K on
Apr 28); noted but not considered a material negative signal for a $35B company.

Entry Zone: $297–$303 (50 EMA / 20 EMA confluence zone)
Stop Loss: $288 — below May 13 swing low ($291.83) with ~$3 buffer
Target 1: $312 — prior 52-week high resistance zone
Target 2: $335 — KBW analyst target $340 / measured move
Risk/Reward: 3.3:1 (to T2, stop at $288)

Key Risks:
- Q2 2026 earnings July 16 (well beyond the 3-week filter, Jun 18 expiry exits before)
- Vice Chairman insider sale Apr 28 (routine-sized: $484K; deducted -5 pts)
- Combined ratio improvement may mean difficult comps; BofA trimmed target by $2
- Reserve adequacy debate ongoing per KBW analyst note

Fundamental Note:
Q1 2026 core income surged 283% to $1.70B; combined ratio improved 13.9 pts to 88.6%.
Company repurchased 6M shares for $1.8B and raised quarterly dividend 14%. Revenue
+1% YoY to $11.92B, beating estimates of $10.63B. Six analysts raised price targets
post earnings.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Jun 18 2026 (32 DTE; expires before Jul 16 earnings)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 300 / Short 310
  Net Debit: ~$4.45 per spread (Mid: $7.80 – $3.35)
  Max Profit: ~$5.55 per spread ($11.10 total on 2 contracts)
  Max Loss: ~$4.45 per spread ($8.90 total on 2 contracts)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long 290 / Short 280
  Net Debit: ~$2.85 per spread (Long 290P mid $4.15 – Short 280P est. $1.30)
  Max Profit: ~$7.15 per spread ($7.15 on 1 contract)
  Max Loss: ~$2.85 per spread ($2.85 on 1 contract)

Combined Position:
  Total Debit / Max Loss: ~$11.75
  Expected Payout if thesis right (TRV above 310 at expiry): ~+$8.25
  Expected Payout on violent drop (TRV below 280 at expiry): ~-$1.75 (near breakeven)
  Main Risk: drift / chop / TRV pinned between 300–310 into Jun 18 expiry
  Note: Short 280P pricing is estimated; verify at order entry.
```

---

### 2. JCI — Johnson Controls International (HVAC / Building Systems / Data Center)

```
Ticker: JCI
Current Price: $143.08 (as of May 15, 2026)
Sector: Industrials — HVAC & Building Management Systems
Score: 91/115 (A:36 B:25 C:20 D:15 Ded:-5) [B-Xtrender categories excluded — unavailable]

Setup Summary:
JCI hit a 52-week high of $147.32 on May 5 (the day before its Q2 2026 earnings), then
pulled back 7% to $137.40 intraday on May 7-11 — precisely testing the 50-day EMA
($138.66). The stock has since recovered above the 20-day EMA ($141.89) with RSI
recovering to 53. Q2 2026 EPS of $1.19 beat consensus of $1.12 (+6.3%); orders surged
30% organically to a record backlog of $20B, driven by data-center and AI-infrastructure
demand. Management raised full-year EPS guidance to $4.85 (~30% growth). Volume is
slightly elevated at 1.09x the 20-day average on the pullback, suggesting some profit-
taking after the earnings catalyst, but the price has stabilised above the 50 EMA.
Deduction: 7 insiders sold $20.7M in last 12 months (-5 pts); monitored but common for
corporate-transformation stories.

Entry Zone: $141–$145 (between 20 EMA and 2% above 50 EMA)
Stop Loss: $135 — below May 7-11 swing low ($137.40) with ~$2.40 buffer
Target 1: $150 — breakout above 52-week high ($147.32)
Target 2: $168 — measured move / analyst consensus target cluster
Risk/Reward: 3.1:1 (to T2, stop at $135)

Key Risks:
- Q3 FY2026 earnings expected late July/August 2026 (well beyond Jun 18 expiry)
- Elevated valuation: P/E ~44x on trailing earnings (justified by 30% guidance growth)
- Volume elevated on pullback (less orderly than ideal; 1.09x vs 20d avg)
- Significant insider selling in last 12 months ($20.7M across 7 insiders)
- Geopolitical risk: EMEA and APAC segments (~40% of revenue)

Fundamental Note:
Q2 FY2026 adjusted EPS $1.19 vs $1.12 consensus; organic sales +6% to $6.1B; EBIT
margin expanded 310 bps to 15.5%. Record backlog $20B (+26% organic), Americas
segment orders +40% YoY. Raised FY2026 EPS guidance to ~$4.85 (+30% growth YoY).
AI data-center HVAC demand is a sustained multi-year tailwind.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Jun 18 2026 (32 DTE; exits well before Q3 FY2026 earnings)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 140 / Short 150
  Net Debit: ~$4.75 per spread (Mid: $7.05 – $2.30)
  Max Profit: ~$5.25 per spread ($10.50 total on 2 contracts)
  Max Loss: ~$4.75 per spread ($9.50 total on 2 contracts)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long 135 / Short 125
  Net Debit: ~$1.20 per spread (Long 135P est. $1.75 – Short 125P est. $0.55)
  Max Profit: ~$8.80 per spread ($8.80 on 1 contract)
  Max Loss: ~$1.20 per spread ($1.20 on 1 contract)

Combined Position:
  Total Debit / Max Loss: ~$10.70
  Expected Payout if thesis right (JCI above 150 at expiry): ~+$9.30
  Expected Payout on violent drop (JCI below 125 at expiry): ~-$0.70 (near breakeven)
  Main Risk: JCI stays range-bound between 140–150 into Jun 18 expiry
  Note: Hedge spread pricing is estimated; verify at order entry. Higher IV (~35%)
  makes option premium more expensive than insurance names.
```

---

### 3. ALL — The Allstate Corporation (Property & Casualty Insurance)

```
Ticker: ALL
Current Price: $217.37 (as of May 15, 2026)
Sector: Financial Services — Property & Casualty Insurance
Score: 92/115 (A:37 B:25 C:20 D:15 Ded:-5) [B-Xtrender categories excluded — unavailable]

Setup Summary:
ALL set a 52-week high of $222.23 on May 5 following a blockbuster Q1 2026 earnings
beat (EPS $10.65 vs $7.43 consensus — a 43% upside surprise). The stock pulled back
sharply to $209.51 intraday (briefly below the 50-day EMA at $212.53) before recovering
above the 20-day EMA ($215.21). RSI sits at 58.6 — healthy and not overbought. Volume is
neutral at 1.00x the 20-day average. The pullback is a classic post-52wk-high digestion;
the uptrend structure is fully intact. Piper Sandler raised target to $268 post earnings.
Deduction: COO sold 18,578 shares on May 1 via exercise-and-sell of options originally
granted in 2018 at $92.80 (exercise price); overall insider flows are net-positive (43
purchases vs 17 sales YTD per Yahoo Finance).

Entry Zone: $214–$219 (20 EMA support area; recovering from pullback)
Stop Loss: $207 — below May 7 swing low ($209.51) with ~$2.50 buffer
Target 1: $235 — 52-week-high breakout measured move target
Target 2: $265 — Piper Sandler analyst target ($268); conservative measure
Risk/Reward: 4.6:1 (to T2, stop at $207)

Key Risks:
- Q2 2026 earnings August 6 (tentative; well beyond Jun 18 expiry)
- Revenue slightly missed Q1 consensus ($16.9B vs $17.29B est.) despite massive EPS beat
- Sector concentration risk: combined TRV + ALL = two P&C insurance names in same run
- COO exercise-and-sell May 1 (routine option exercise; overall insider buying is net positive)
- Market-to-market losses on investment portfolio if credit markets weaken

Fundamental Note:
Q1 2026 adjusted EPS $10.65 beat $7.43 consensus by 43%; property-liability combined
ratio improved 15.4 pts to 82.0; investment income +9.8% YoY; 212M policies in force
(+2.5% YoY). Piper Sandler raised to $268 (Overweight); Citi raised to $226 (Neutral).
Net income $2.4B. Business fundamentally re-rated after years of underperformance.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Jun 18 2026 (32 DTE; exits before Aug 6 earnings)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 220 / Short 230
  Net Debit: ~$2.80 per spread (Long 220C mid $4.55 – Short 230C est. $1.75)
  Max Profit: ~$7.20 per spread ($14.40 total on 2 contracts)
  Max Loss: ~$2.80 per spread ($5.60 total on 2 contracts)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Long 210 / Short 200
  Net Debit: ~$2.40 per spread (Long 210P mid $3.60 – Short 200P est. $1.20)
  Max Profit: ~$7.60 per spread ($7.60 on 1 contract)
  Max Loss: ~$2.40 per spread ($2.40 on 1 contract)

Combined Position:
  Total Debit / Max Loss: ~$8.00
  Expected Payout if thesis right (ALL above 230 at expiry): ~+$12.00
  Expected Payout on violent drop (ALL below 200 at expiry): ~+$2.00 (profitable)
  Main Risk: ALL stays between 220–230 at Jun 18 expiry (spread pinning)
  Note: Short 230C and Short 200P pricing estimated; verify at order entry.
  Sector overlap with TRV — consider sizing one position smaller if running both.
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension / fundamentals)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| ODFL | Textbook 50 EMA test with declining volume (ratio 0.83x) — cleanest technical setup in the scan. Revenue -2.9% and EPS -4.2% YoY exclude from trade picks. Multiple analyst upgrades (MS $235, BMO $230, Stifel $228). | Next pullback to 50 EMA (~$200); or confirmed revenue/EPS inflection in Q2 2026 earnings (Jul 29) |
| COST | Excellent fundamentals (rev +21.5%, EPS +45.5%). At all-time highs with RSI=73 — overbought. | RSI cooling to ≤65; next 50 EMA pullback (~$1,000) with declining volume |
| NSC | Q1 2026 EPS beat ($2.65 vs $2.51 est.); multiple analyst target raises (RBC $360, Barclays $360, TD Cowen $337). Near 52wk high (-2.3%). EPS declining YoY due to prior-year items, limiting conviction. | Confirmed close above 52wk high $323 on volume; or next 50 EMA test |
| JBHT | Already +12.6% above 50 EMA — missed the pullback entry. Strong freight recovery theme. | Pullback to 50 EMA (~$235) with declining volume; RSI reset to 45–50 zone |
| CINF | Insurance sector in favour; tight pullback to 50 EMA (+2.2%); good revenue growth (+11.6%). RSI=68.4 slightly elevated. | RSI dip to 55–60 on any consolidation; then re-entry near 50 EMA |

_Excluded this run (earnings within 3 weeks):_
- **HAS**: Q1 2026 earnings May 20 (3 days away) — hard filter −20 pts; revisit post-earnings

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed trades on record (this is a scheduled unattended run; trade confirmation requires user action)._

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

## Outcomes Review (2026-05-17)

No rows were due for the 14-day outcome review today. The only prior entry in the log was the 2026-04-16 empty-scan row (no ticker). The 2026-05-14 run suggested trades (HLT, EOG, FDX) but no user-confirmed trades were logged to the CSV (scheduled run). Those suggestions are now stale (new prices and setups have changed materially).

---

## Scan Details (2026-05-17)
_Scan run via yfinance (browser-use unavailable in scheduled cloud environment)_

- **Timestamp:** 2026-05-17 19:06 UTC
- **Universe:** 465 S&P 500 tickers (19 stale/delisted removed)
- **Tickers passing all scan criteria (18):** ALL, APA, CINF, COP, COST, DVN, EOG, HAS, JBHT, JCI, KMI, MO, NSC, ODFL, OKE, PSX, TRV, WMT
- **Tickers researched in detail:** ALL, CINF, COST, HAS, JBHT, JCI, NSC, ODFL, TRV, WMT (+ market context for APA, COP, DVN, EOG, KMI, MO, OKE, PSX)
- **Top 3 selected:** TRV (92/115), ALL (92/115), JCI (91/115)
- **HAS excluded:** Earnings within 3 weeks (May 20) — hard filter
- **ODFL, COST, NSC, JBHT, CINF:** Watchlist only (see above)
