# Momentum After Pullback — Current Report
_Last updated: 2026-06-09_

---

## Market Context

The S&P 500 (SPY) closed at $735.76, sitting comfortably above its 200-day EMA ($683) and 50-day EMA ($724). The market remains in a confirmed medium-term uptrend despite a modest -0.5% session today. VIX is at 19.51 — elevated but not alarming; no extreme fear present. The one-month SPY change is approximately flat (-0.1%), indicating a pause/consolidation after prior gains rather than a rollover. Regime assessment: **constructive uptrend with mild near-term choppiness**. Standard entry filters apply; no stricter regime overlay required.

> **Scanner note:** The TrendSpider browser-use scan runner (`scripts/trendspider_scan.py`) was unavailable in this scheduled environment. Qualifying tickers were identified via a programmatic yfinance screen applying the same conditions: daily price > 200 EMA, weekly 50 EMA > weekly 200 EMA, price > weekly 50 EMA, daily 200 EMA rising (vs 40 bars ago), daily 50 EMA rising (vs 20 bars ago), price within ±3% of daily 50 EMA in last 5 bars, and at least one timing trigger. Five tickers passed all conditions: **GD, PM, SBUX, LIN, NSC**.

> **TradingView visual note:** Step 4b (B-Xtrender visual check via browser-use/TradingView) was unavailable in this environment. B-Xtrender scores are estimated from technical proxies (price vs EMAs, RSI direction). Scores flagged with `(est.)` should be confirmed before live entry.

---

## Today's Suggested Trades

### 1. GD — General Dynamics Corporation (Defense/Industrials)

```
Ticker: GD
Current Price: $345.46
Sector: Industrials / Aerospace & Defense
Score: 104/115 (A:55 B:18 C:16 D:15 Ded:0)

Setup Summary:
GD pulled back from a post-Q1 high of $368 (Q1 was a massive +11% beat on April 29) to a
swing low of $333 in late May, then stalled for consolidation along the 50-day EMA
cluster ($342–$345). All moving averages are rising and aligned (Price > EMA20 > EMA50 >
EMA200). Volume contracted sharply during the pullback (20d avg 0.95M vs 50d avg 1.29M),
a textbook healthy consolidation. Today GD gained +1.4% against a soft market (-0.5% SPY),
demonstrating relative strength. A new 155mm artillery contract was announced June 5, and a
$200M Texas munitions facility investment adds near-term earnings optionality.

Entry Zone: $340–$347 (current 50 EMA at $341.93; EMA20 at $341.88)
Stop Loss: $332.00 — below the 20-day swing low at $333.29
Target 1: $365.00 — below the 52-week high ($367.99); prior resistance cluster
Target 2: $390.00 — analyst consensus target ($387–$392); measured move
Risk/Reward: 2.3:1 (at entry $342: risk $10 / reward $23 to T1)

Key Risks:
- Earnings July 22, 2026 (43 days): plenty of runway, but position must be sized for the
  event or rolled/closed before then
- Several analysts lowered targets after Q1 (Citi to $364, Deutsche Bank to $377) despite
  the strong earnings beat — some concern about margin compression or capital intensity
  ($200M Texas facility investment)
- Goldman Sachs maintains Sell with $313 target — minority view but notable

Fundamental Note:
Q1 2026: EPS $4.10 beat $3.67 est (+11.6%); revenue $13.48B beat $12.70B est (+10.3% YoY).
Record backlog of $188.4B; 2:1 book-to-bill ratio; FY2026 EPS guidance raised to
$16.45–$16.55. Morgan Stanley raised to Overweight/$435 on April 30. Analyst consensus
"Moderate Buy" with avg PT $387.40 (12% upside from current levels).
```

**Instrument: Paired Debit Spread (Bullish)**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: Jul 18, 2026 (~39 DTE — pre-earnings)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $345 Call / Sell $355 Call (10-pt wide)
  Est. Net Debit: ~$5.00 per spread ($10.00 total for 2 contracts)
  Est. Max Profit: ~$5.00 per spread ($10.00 total)
  Est. Max Loss: $10.00

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy $345 Put / Sell $330 Put (15-pt wide)
  Est. Net Debit: ~$5.00 per spread
  Est. Max Profit: ~$10.00
  Est. Max Loss: $5.00

Combined Position:
  Total Debit / Max Loss: ~$15.00
  Expected Payout if thesis is right (GD → $355+): ~$10.00
  Expected Payout on sharp drop (GD → $330–): ~$10.00
  Main Risk: GD stays flat and drifts between $330–$355 into expiry (decay / pinning)

NOTE: Verify strikes and prices against live options chain before entry.
Stock equivalent alternative: long shares at $340–$347, stop $332.
```

---

### 2. PM — Philip Morris International (Consumer Staples)

```
Ticker: PM
Current Price: $177.42
Sector: Consumer Staples (Tobacco / Reduced-Risk Products)
Score: 84/115 (A:45 B:10 C:20 D:9 Ded:0)

Setup Summary:
PM surged from $142 in early 2026 to a high of $193 on strong IQOS momentum (IQOS is now
the #1 nicotine brand globally, surpassing Marlboro). A June 2 profit forecast cut (FY2026
adj. EPS guidance lowered to $8.31–$8.46 from $8.36–$8.51, citing energy costs and
currency) triggered a pullback from $193 to $170 — landing exactly on the 10-day swing
low support. The stock is now recovering, trading at $177.42 — above the 50-day EMA
($174.72) but still below the 20-day EMA ($178.02). Morgan Stanley immediately raised its
PT from $190 to $200 on June 3 (Overweight), supporting the thesis that the selloff is
overdone. Volume declined during the pullback (20d avg 4.48M vs 50d avg 4.69M). RSI is
right at 50, a neutral-to-recovering signal. Weekly structure is strongly bullish: W50
($164) > W200 ($133), price well above both.

Entry Zone: $173–$178 (near 50-day EMA; bullish if PM holds above $174)
Stop Loss: $168.00 — below the 10-day swing low at $170.00
Target 1: $190.00 — prior resistance level / pre-cut range
Target 2: $197.00 — analyst average PT $192.88; measured move from pattern base
Risk/Reward: 1.75:1 (at entry $176: risk $8 / reward $14 to T1)

Key Risks:
- The June 2 profit forecast CUT is a real fundamental negative (not just noise).
  If energy/FX headwinds persist, further downward guidance revisions are possible.
- RSI is only recovering to 50 — not yet confirmed momentum reversal
- Tobacco sector faces ongoing regulatory and ESG headwinds
- PM has cut guidance twice in 2026 (April and June) — credibility risk

Fundamental Note:
Q1 2026: EPS $1.96 beat $1.83 est (+7.1%); revenue $10.15B +9.1% YoY. IQOS smoke-free
business = 43% of total revenue. Full-year guidance: adj. EPS $8.31–$8.46 (10–12% growth).
Morgan Stanley Overweight, PT $200 (June 3, 2026). Moderate Buy consensus, avg PT
$192.88. Dividend yield 3.34%.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: Jul 18, 2026 (~39 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $177 Call / Sell $187 Call (10-pt wide)
  Est. Net Debit: ~$4.50 per spread ($9.00 total)
  Est. Max Profit: ~$5.50 per spread ($11.00 total)
  Est. Max Loss: $9.00

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy $177 Put / Sell $163 Put (14-pt wide)
  Est. Net Debit: ~$4.50 per spread
  Est. Max Profit: ~$9.50
  Est. Max Loss: $4.50

Combined Position:
  Total Debit / Max Loss: ~$13.50
  Expected Payout if PM rallies to $187+: ~$11.00
  Expected Payout if PM drops to $163–: ~$9.50
  Main Risk: PM stays flat / continues grinding between $163–$187

NOTE: Verify strikes and premiums against live options chain before entry.
Stock equivalent: Long PM at $173–$178, stop $168.
```

---

### 3. SBUX — Starbucks Corporation (Consumer Discretionary)

```
Ticker: SBUX
Current Price: $97.68 (+3.0% today)
Sector: Consumer Discretionary (QSR / Coffee)
Score: 73/115 (A:36 B:10 C:20 D:13 Ded:-6)

Setup Summary:
SBUX suffered a significant pullback from its post-Q2 surge high of $108 (after the
April 28 earnings beat that sent shares up 7.77% after-hours) to a 10-day swing low of
$93.64. The stock is now recovering — today gaining +3.0% on CEO Brian Niccol's comments
at the Evercore Consumer Conference (June 9) about doubling the international store count
to ~44,000 outlets and adding 5,000 more US stores. This provides a fresh positive
catalyst. Weekly structure is clean: W50 ($92.75) > W200 ($85.28); price above both.
The "Back to Starbucks" turnaround is showing genuine results: Q2 was the first quarter
in two years with simultaneous top- and bottom-line growth (comps +6.2%, EPS +22% YoY).
EBITDA growth accelerated to +10.5% after three years of contraction. Today's move
toward the 50-day EMA ($99.25) could be the reclaim trigger.

LOWER CONVICTION than GD and PM: SBUX is still below the daily 50 EMA;
B-Xtrender daily likely showing mixed/recovering signals. This is an entry-on-approach
setup — the 50 EMA reclaim is the confirmation. Prefer to enter on pullback from today's
move, ideally $96–$99.

Entry Zone: $95–$100 (near daily 50-day EMA at $99.25; wait for a reclaim or brief
             intraday pullback to the $96–$99 zone)
Stop Loss: $91.00 — below the 10-day swing low at $93.64
Target 1: $108.00 — near the 52-week high; prior resistance post-Q2 earnings gap
Target 2: $117.00 — analyst consensus targets (TD Cowen $120, Baird $117, Stifel $117)
Risk/Reward: 1.83:1 (at entry $97: risk $6 / reward $11 to T1)

Key Risks:
- Still below the daily 50 EMA — not a confirmed reclaim yet. Wait for close above $99.25
  or enter in the $95–$99 zone only
- High P/E (>70x trailing) and negative shareholders' equity ($8.5B) leave the valuation
  stretched; execution risk is elevated
- Next earnings: estimated July 28 – August 4, 2026 (~49–56 days out, acceptable)
- CEO expansion comments on June 9 are bullish but "talking the stock up" carries
  execution risk — investors will scrutinize Q3 2026 comps closely

Fundamental Note:
Q2 FY2026 (April 28): EPS $0.50 beat $0.44 est (+13.6%); revenue $9.53B +8.8% YoY.
Global comps +6.2%, North America +7.1%. First simultaneous top and bottom line growth
in 2+ years. FY2026 guidance raised: 5%+ comps, $2.25–$2.45 non-GAAP EPS. China stake
sold to Boyu Capital ($3.1B gross proceeds). TD Cowen recently upgraded to Buy, PT $120.
Institutional ownership 87%.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: Aug 15, 2026 (~67 DTE — gives more time for 50 EMA reclaim to play out)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $98 Call / Sell $108 Call (10-pt wide)
  Est. Net Debit: ~$4.00 per spread ($8.00 total)
  Est. Max Profit: ~$6.00 per spread ($12.00 total)
  Est. Max Loss: $8.00

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy $97 Put / Sell $83 Put (14-pt wide)
  Est. Net Debit: ~$4.00 per spread
  Est. Max Profit: ~$10.00
  Est. Max Loss: $4.00

Combined Position:
  Total Debit / Max Loss: ~$12.00
  Expected Payout if SBUX breaks above $108: ~$12.00
  Expected Payout if SBUX falls to $83–: ~$10.00
  Main Risk: drift / consolidation below $108 into expiry

NOTE: Verify strikes and premiums against live options chain before entry.
Stock equivalent: Long SBUX at $95–$100, stop $91.
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension or complications)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| LIN | Linde: strong weekly uptrend, all EMAs aligned, Strong Buy consensus (PT $542–$585). Touched 50 EMA briefly ($487 low) but has already bounced back to $514 — too close to 52-week high ($519); R:R < 1:1 at current levels. | Wait for next pullback to the 50 EMA zone ($499–$505); enter if RSI recovers from < 45 back above 50 |
| NVDA | Nvidia: sitting right at 50 EMA ($206.71 vs price $206.04). Weekly golden cross intact (W50 $182 > W200 $152). Vera Rubin Q3 delivery confirmed, Jensen Huang called the selloff "a buying opportunity." RSI 45.4 and falling; no trigger signals yet. | Watch for RSI cross above 50 or close back above 20 EMA ($213.46); high-conviction entry if that occurs |
| NSC | Norfolk Southern: near 50 EMA ($307.73) with multiple triggers. BUT this is primarily a merger arbitrage position — UP/NSC $320/share deal with STB paused for supplemental info (due July 27). Upside is capped at the deal price; downside on deal failure is ~$280–300. Not a clean momentum continuation setup. | Clear regulatory news (STB resumes formal review timeline); if deal is blessed and stock re-rates above $320, reevaluate as breakout candidate |
| CVX | Chevron: at its 50 EMA ($187.18), weekly uptrend intact, declining volume. Energy sector in favor but RSI falling (48.7→ declining). No trigger signals fired. | Trigger A (close back above 20 EMA $187.43) or Trigger B (RSI cross above 50) with energy sector catalyst |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades. Previous entry: April 16, 2026 (empty scan — no tickers found). That row has passed the 14-day outcome window without a trade to track._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| — | — | — | — | — | — |

_No closed trades recorded yet. The strategy CSV contains only one row (April 16, 2026 empty scan). No 14-day outcomes were due today._

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A
