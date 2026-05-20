# Momentum After Pullback — Current Report
_Last updated: 2026-05-20_

---

## Market Context

The S&P 500 (SPY) closed at $740.32 on May 20, 2026, sitting **+9.7% above its 200-day MA** ($675.05) and well above its 50-day MA ($693.48). The index gained +5.1% over the past month, reflecting a strong recovery. VIX stands at **17.5** — moderate, not elevated. The overall market regime is a **confirmed uptrend**; standard (not stricter) filters apply. The **Utilities sector** was the third-best S&P 500 performer in Q1 2026 (+8.3%), benefiting from rising data center electricity demand and steady rate-base expansion. Financials (particularly insurance) have outperformed on the back of low catastrophe losses and robust underwriting income. No downtrend warning applies.

---

## Scan Notes

- **Scan method:** yfinance (browser-use unavailable in cloud environment — TrendSpider live UI could not be accessed)
- **Scan timestamp:** 2026-05-20 19:00 UTC
- **Candidates found:** 33 tickers passed all yfinance scan conditions (trend alignment, rising EMAs, proximity to daily 50 EMA ± 3%, timing trigger)
- **B-Xtrender visual confirmation:** Not available — browser-use profile Tim required; no BX bonus/deduction points applied to any ticker
- **Earnings filter:** No upcoming earnings within 3 weeks for any recommended pick (next earnings: TRV Jul 16, XEL late July, CNP Jul 23)

---

## Today's Suggested Trades

### 1. TRV — Travelers Companies (Score: 90/115)

```
Ticker: TRV
Current Price: $305.90
Sector: Financials — Property & Casualty Insurance
Score: 90/115 (A:37 B:18 C:20 D:15 Ded:0)

Setup Summary:
TRV pulled back from its 52-week high of $310.90 to and through its 50-day EMA,
then recovered above it this week with a clean RSI crossover above 50 (Trigger B)
and an EMA-20 re-cross (Trigger A). The recovery follows an exceptional Q1 2026
beat: EPS $7.71 vs est. $6.95 (+10.9% surprise), core income +283% YoY, and a
14% quarterly dividend increase. The pattern is a textbook momentum-pullback
re-entry: uptrend intact on daily and weekly, pullback orderly, now resuming.

Entry Zone: $298–$306 (near EMA50 $299.63; current price $305.90)
Stop Loss: $284.00 — below EMA200 ($285.84) and recent consolidation low
Target 1: $315.00 — decisively above 52-week high ($310.90)
Target 2: $335.00 — measured move extension (prior leg ~$62 range from lows)
Risk/Reward: 1.83:1 (using T2, entry $302 mid-range)

Key Risks:
- Near 52-week high; potential resistance at $310–$312 before T1 clears
- Q2 2026 earnings: July 16, 2026 — WITHIN the 21–45 DTE options window;
  avoid holding options through that date or exit before July 11
- Insurance sector volatility from unexpected catastrophe events

Fundamental Note:
Q1 2026 core income was $1.70B (+283% YoY) on lower catastrophe losses ($761M
vs $2.27B prior year) and strong underwriting income — sixth consecutive quarter
above $1.5B. Trailing 12-month core ROE of 22.7%. Board raised quarterly dividend
14% to $1.25/share. Financials sector in uptrend.
```

**Instrument: Paired Debit Spread — Jul 17, 2026 (~28 DTE)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: July 17, 2026 (~28 DTE)
NOTE: Exit or roll before Jul 11 to avoid Q2 earnings Jul 16

Primary Spread:
  Structure: Bull Call Spread
  Size: 1x
  Strikes: Buy $305C / Sell $320C  (15-point spread)
  Net Debit: ~$7.88 per spread (~$788 per contract)
  Max Profit: ~$7.12 per contract ($712)
  Max Loss: ~$7.88 per contract ($788)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5x (half the primary)
  Strikes: Buy $300P / Sell $280P  (20-point spread)
  Net Debit: ~$4.80 per spread (~$480 per contract)
  Max Profit: ~$15.20 per contract ($1,520 at 0.5x = $760 contribution)
  Max Loss: ~$4.80 per contract ($240 at 0.5x)

Combined Position (1x primary + 0.5x hedge):
  Total Debit / Max Loss: ~$1,028 per unit
  Expected Payout if thesis right (above $320): ~+$472 net (+46%)
  Expected Payout on violent reversal (below $280): ~−$28 (near breakeven)
  Main Risk: drift / chop / time decay without directional expansion
```

---

### 2. XEL — Xcel Energy (Score: 86/115)

```
Ticker: XEL
Current Price: $80.22
Sector: Utilities — Electric Utilities
Score: 86/115 (A:33 B:18 C:20 D:15 Ded:0)

Setup Summary:
XEL triggered all three scan timing triggers (EMA-20 cross, RSI>50, close above
prior high) while sitting just +0.5% above its 50-day EMA ($79.78) after an
orderly pullback from the $83 range. The stock received dual analyst upgrades in
2026: UBS upgraded to Buy with $89 target (Feb) and Goldman Sachs to Buy (Apr).
Data center demand is doubling XEL's contracted capacity target to 6 GW by 2027,
driving 11% annual rate-base growth through 2030. The technical setup is clean
with all trend conditions aligned; the pullback volume was slightly elevated
vs. up-days (minor negative), but the breadth of triggers and catalyst quality
outweigh this.

Entry Zone: $79.00–$81.00 (at/just above EMA50 $79.78)
Stop Loss: $75.50 — below EMA200 ($76.54) and prior support zone
Target 1: $83.30 — 52-week high breakout
Target 2: $89.00 — UBS analyst price target / measured-move extension
Risk/Reward: 2.25:1 (using T2, entry $80 vs stop $75.50)

Key Risks:
- Down-day volume exceeded up-day volume in recent 10-day window (minor flag)
- Q2 2026 earnings: estimated late July / August (outside 45-DTE window)
- Regulatory risk in Colorado rate proceedings for data center load tariffs
- Options market is thin — put side especially illiquid

Fundamental Note:
Q1 2026 ongoing EPS $0.91 vs $0.84 (+8.3% YoY). 2026 full-year guidance
reaffirmed at $4.04–$4.16. Google data center agreement signed in Upper Midwest
Q1 2026. UBS and Goldman both upgraded on data center demand and rate-base
growth. Utilities sector third-best S&P 500 performer Q1 2026 (+8.3%).
```

**Instrument: Stock Entry (primary recommendation) or Jun18 Bull Call Spread**

_XEL put options are very illiquid (OI=1 at Jun18 nearest strike), preventing a clean paired debit spread. Stock entry recommended as primary; a single-leg bull call spread is viable as a defined-risk alternative._

```
Instrument: Stock (primary) or Bull Call Spread (secondary)
Bias: Bullish
Entry: $79.00–$81.00

Option Alternative — Jun 18, 2026 (~29 DTE):
  Structure: Bull Call Spread only (no viable put hedge due to illiquidity)
  Strikes: Buy $80C / Sell $85C  (5-point spread)
  Net Debit: ~$1.50 per spread (~$150 per contract)
  Max Profit: ~$3.50 per contract ($350)  [2.3:1 reward]
  Max Loss: ~$1.50 per contract ($150)
  NOTE: Cannot build bear-put hedge leg — OI < 5 on all Jun18 put strikes near ATM
```

---

### 3. CNP — CenterPoint Energy (Score: 80/115)

```
Ticker: CNP
Current Price: $42.54
Sector: Utilities — Multi-Utilities
Score: 80/115 (A:40 B:10 C:15 D:15 Ded:0)

Setup Summary:
CNP is almost exactly at its 50-day EMA ($42.46, within 0.2%) after a healthy
pullback from the $44 area. Down-day volume during the pullback was LOWER than
up-day volume — the cleanest pullback volume profile of any candidate today.
EMA triggers A (EMA-20 re-cross) and C (close above prior day high) both fired.
The fundamental catalyst is significant: on April 23, 2026, CenterPoint announced
12.2 GW of firmly committed industrial load at Houston Electric and 8 GW of data
center load expected online by 2029 (3.5 GW already under construction), two full
years ahead of prior forecasts. R:R is limited by the proximity of the 52-week
high ($44.14), but a measured-move extension to $47+ is reasonable.

Entry Zone: $41.50–$43.00 (at EMA50 $42.46)
Stop Loss: $39.50 — below EMA200 ($40.07) and recent swing lows
Target 1: $44.50 — above 52-week high ($44.14)
Target 2: $47.00 — measured move extension (prior leg from $35 low)
Risk/Reward: 1.5:1 (using T2, entry $42.50 vs stop $39.50)

Key Risks:
- R:R is marginal (1.5:1 to T2); requires conviction on utility uptrend extension
- Q2 2026 earnings: July 23, 2026 — manage expiry accordingly
- Q1 EPS slightly missed estimates ($0.56 vs $0.57–0.58 expected)
- Utility sector rotation risk if rates rise unexpectedly

Fundamental Note:
Q1 2026 non-GAAP EPS $0.56 (missed by $0.01), revenue $2.98B (beat est. $2.97B).
Full-year 2026 guidance reiterated at $1.89–$1.91 (+8% YoY). Zacks #2 Buy rating.
Major near-term catalyst: 12.2 GW committed industrial load at Houston Electric
with 8 GW data center load energized by 2029 (3.5 GW already under construction).
"One of the most tangible and executable growth plans in the industry" — CEO Wells.
```

**Instrument: Paired Debit Spread — Jul 17, 2026 (~28 DTE)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: July 17, 2026 (~28 DTE)
NOTE: Exit before Jul 18 to avoid Q2 earnings Jul 23

Primary Spread:
  Structure: Bull Call Spread
  Size: 1x
  Strikes: Buy $42C / Sell $44C  (2-point spread)
  Net Debit: ~$0.80 per spread (~$80 per contract)
  Max Profit: ~$1.20 per contract ($120)
  Max Loss: ~$0.80 per contract ($80)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5x (half the primary)
  Strikes: Buy $42P / Sell $40P  (2-point spread)
  Net Debit: ~$0.68 per spread (~$68 per contract; ~$34 at 0.5x)
  Max Profit: ~$1.32 per contract ($132; ~$66 at 0.5x)
  Max Loss: ~$0.68 per contract ($34 at 0.5x)

Combined Position (1x primary + 0.5x hedge):
  Total Debit / Max Loss: ~$114 per unit
  Expected Payout if thesis right (above $44): ~+$86 net (+75%)
  Expected Payout on violent reversal (below $40): ~−$14 (near breakeven)
  Main Risk: drift / compression / stock staying pinned between $40–$44
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry this run._

| Ticker | Score | Why watching | Trigger to revisit |
|--------|-------|--------------|-------------------|
| NI | 82/115 | NiSource: strong fundamentals (9–10% EPS CAGR, Alphabet energy contract, raised guidance), near EMA50 at $46.82, healthy pullback volume. RSI>50 and EMA-20 cross both triggered. Narrowly edged out of top 3 due to Q1 revenue miss and limited option strikes ($45/$50 only). | Pullback to $46.00–$46.50 for improved R:R; or use stock entry if options illiquidity is a concern; earnings Aug 4, 2026 |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades. Previous scan (2026-04-16) returned no tickers._

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

## Run Notes

- **Scan method:** yfinance (browser-use with Chrome profile Tim unavailable in cloud/cron environment). TrendSpider live UI scanner was not accessible. The yfinance scan applied all Group 1–4 conditions from `config.md` programmatically across ~260 S&P 500 representative tickers.
- **TradingView / B-Xtrender:** Not accessible (requires browser-use + profile Tim). BX bonus/deduction points (±8–15 pts) were not applied to any ticker. Scores may shift materially once visual confirmation is run manually.
- **Scheduled run:** No trade rows appended per Step 6 protocol. Suggested trades require manual confirmation before logging.
- **Outcomes tracked:** 0 (no prior trades due; April 16 entry was an empty-scan row, not a ticker trade)
