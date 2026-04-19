# Momentum After Pullback — Current Report
_Last updated: 2026-04-19_

---

## Market Context

The S&P 500 (SPY) closed at $710.14 on April 19, 2026 — 7.1% above its 200-day SMA ($663.21) and 5.4% above its 50-day SMA ($673.88). The broad market is in a confirmed uptrend with both moving averages rising and price comfortably above both. VIX has fallen sharply from a recent spike, closing at 17.48 on April 17 — well below the 25 threshold — indicating normalising volatility and a risk-on environment. Overall conditions are constructive for momentum continuation plays: uptrend intact, volatility receding, and the recent pullback in many large-cap names appearing to have ended with a recovery off 50 EMA support zones.

---

## Scan Notes

_Browser-use unavailable in this cloud environment. The TrendSpider scanner was replicated programmatically using yfinance against the S&P 500 universe, applying all four scan condition groups from `config.md` (trend alignment, rising EMAs, ±3% pullback to daily 50 EMA, timing triggers). 13 tickers passed initial filters. After applying the 3-week earnings hard filter and full scoring, 2 tickers qualify for trade entry._

**Scan ran:** 2026-04-19 19:00 UTC (yfinance scan, browser-use unavailable)  
**Tickers passing initial scan (13):** MRK, CB, FDX, BMY, WMT, DE, JPM, HON, T, DD, NEE, COST, EA  
**Eliminated — earnings within 3 weeks:** MRK (Apr 30), CB (Apr 21), BMY (Apr 30), HON (Apr 23), T (Apr 22), NEE (Apr 23)  
**Eliminated — RR or score below threshold:** DE (49/115), WMT (RR <1.5:1), DD (insufficient data), EA (earnings May 5 — 16d, borderline), FDX (not a pullback — extended 10% above 50 EMA)  
**Qualifying picks:** COST (89/115), JPM (85/115)

---

## Today's Suggested Trades

### 1. COST — Costco Wholesale — Pullback to 50 EMA Zone, Recovery Underway

```
Ticker: COST
Current Price: $999.89
Sector: Consumer Defensive
Score: 89/115 (A:36 B:18 C:20 D:15 Ded:0)

Setup Summary:
Costco bounced sharply off its daily 50 EMA zone (~$986) after a measured pullback from
the $1,062 high, with RSI recovering to 52 and multiple timing triggers firing (crossed
back above 20 EMA, closed above prior day's high). The pullback was contained and orderly
while the weekly structure remains excellent — EMA50 well above EMA200 weekly, price above
both. Earnings are not until May 28, giving the position ~5.5 weeks of clean runway.

Entry Zone: $995–$1,005 (near 50 EMA / current price)
Stop Loss: $966 – below 10-day swing low and through 50 EMA support
Target 1: $1,062 – prior 52-week high / nearest resistance
Target 2: $1,100 – Mizuho analyst target / measured move
Risk/Reward: 1.82:1 (vs T1); 2.94:1 (vs T2)

Key Risks:
- Volume on pullback was NOT declining (above 50d average) — slight distribution concern
- Extended valuation: ~52x trailing P/E, $1,000 psychological level as resistance
- Consumer spending softness risk from tariff environment / macro uncertainty

Fundamental Note:
Costco reported Q2 FY2026 EPS of $4.58 (beat), with revenue +9.2% YoY to $69.6B, comps
+7.4%, and digital sales +23.3%. Membership fees grew 14%. Mizuho raised target to $1,100
and Telsey to $1,135. Earnings May 28 — outside 3-week window.

Note (TradingView unavailable): B-Xtrender background bar colour and signal line dot
cannot be confirmed without browser-use. RSI proxy used for histogram direction (recovering).
If bars are red or red dot present, add −8 or −6 pts → score drops to 75–81/115 (still qualifies).
```

**Instrument: Paired Debit Spread (Bullish) — May 15, 2026 (~26 DTE)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: May 15 2026 (~26 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1 contract (scale to position sizing)
  Strikes: Long 1000 / Short 1040
  Net Debit: ~$15.22 per spread (~$1,522 per contract)
  Max Profit: ~$24.78 per spread (~$2,478 per contract)
  Max Loss: ~$15.22 per spread (~$1,522 per contract)
  Reward/Risk: ~1.63:1

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5 contracts (half size)
  Strikes: Long 1000 / Short 960
  Net Debit: ~$13.62 per spread (~$681 per 0.5 contract)
  Max Profit: ~$26.38 per spread (~$1,319 per 0.5 contract)
  Max Loss: ~$13.62 per spread (~$681 per 0.5 contract)

Combined Position (1x Bull Call + 0.5x Bear Put):
  Total Debit / Max Loss: ~$2,203
  Expected Payout if thesis is right (price to $1,062+): ~$2,478 (primary) + hedge losses minimal
  Expected Payout on violent move against thesis (sharp sell to $960 or below): ~$1,319 - $681 = +$638 net on hedge
  Main Risk: drift / time decay / price pinning between $1,000 and $1,040
```

---

### 2. JPM — JPMorgan Chase — Q1 Beat Recovery, Pullback to 50 EMA Complete

```
Ticker: JPM
Current Price: $310.29
Sector: Financial Services
Score: 85/115 (A:43 B:10 C:20 D:12 Ded:0)

Setup Summary:
JPMorgan pulled back to test the 50 EMA zone (~$299–$305) in the week following its
April 14 Q1 earnings release (beat EPS by 9%, record markets revenue). The stock
has begun recovering — closing back above 20 EMA, triggering Trigger A and C. Volume
on the pullback was declining (below 50d average), consistent with healthy
consolidation rather than distribution. Weekly structure remains intact with EMA50
well above EMA200. No further earnings event until July.

Entry Zone: $308–$313 (above 20 EMA, near current price)
Stop Loss: $292 – below 10-day swing low / below key support zone
Target 1: $338 – analyst consensus mean price target / prior resistance area
Target 2: $365 – Goldman Sachs 12-month target / measured move
Risk/Reward: 1.56:1 (vs T1); 3.06:1 (vs T2)

Key Risks:
- Financial sector volatility tied to macro/credit conditions and tariff-driven growth fears
- NII guidance was lowered (to $103B from $104.5B) — potential overhang
- Morningstar called shares "fully valued" at current levels

Fundamental Note:
JPM Q1 2026: EPS $5.94 vs $5.45 expected, revenue $49.8B. Markets revenue record $11.6B
(+20%), IB fees +28%. ROTCE 23%. Revenue growth +12.7% YoY, EPS growth +17.2%.
Analyst consensus: "Moderate Buy," mean target $338 (GS raised to $365).

Note (TradingView unavailable): B-Xtrender indicators not visually confirmed. RSI at 62
suggests a recovering histogram; signal dot direction unknown. Score conservatively excludes
B-Xtrender points beyond histogram proxy.
```

**Instrument: Paired Debit Spread (Bullish) — May 15, 2026 (~26 DTE)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: May 15 2026 (~26 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts (scale to position sizing)
  Strikes: Long 310 / Short 330
  Net Debit: ~$7.10 per spread (~$1,420 for 2 contracts)
  Max Profit: ~$12.90 per spread (~$2,580 for 2 contracts)
  Max Loss: ~$7.10 per spread (~$1,420 for 2 contracts)
  Reward/Risk: ~1.82:1

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half size relative to 2x primary)
  Strikes: Long 310 / Short 285
  Net Debit: ~$5.84 per spread (~$584 per contract)
  Max Profit: ~$19.16 per spread (~$1,916 per contract)
  Max Loss: ~$5.84 per spread (~$584 per contract)

Combined Position (2x Bull Call + 1x Bear Put):
  Total Debit / Max Loss: ~$2,004
  Expected Payout if thesis is right (price to $338+): ~$2,580 (primary)
  Expected Payout on violent move against thesis (sharp sell to $285 or below): ~$1,916 - $584 = +$1,332 net on hedge
  Main Risk: drift / time decay / price pinning between $310 and $330
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| WMT | Weekly/daily uptrend intact; bouncing off 50 EMA; defensive sector. Excluded due to poor RR (1:1) and tariff-driven margin uncertainty. | Price above $130 with stop viable below $121 improves RR to >2:1; next earnings May 21 — wait for post-earnings reaction |
| FDX | Strong uptrend, excellent fundamentals (+17% EPS growth, guidance raised). Currently extended 10% above 50 EMA — not a pullback setup. | Pullback to 50 EMA (~$357–$362) on declining volume with RSI near 50; earnings June 23 gives clean window |
| DE | Textbook pullback to 50 EMA, volume declining, all trend conditions met. Excluded due to score below threshold: negative revenue/EPS growth, poor RR at entry. | Improved RR on wider measured move target OR fundamentals turn positive; earnings May 21 |
| HON | Strong setup but earnings April 23 (4 days away) — hard filter triggered. | Re-evaluate post-earnings reaction if setup remains constructive |
| MRK | Triggered multiple signals including RSI crossover. Excluded: earnings April 30 (11 days). | Re-evaluate after April 30 earnings |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed open trades. This is a scheduled unattended run — new trade rows will not be appended per Step 6 protocol._

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

_Log history: One prior run (2026-04-16) returned an empty scan. This is the first run with qualifying tickers._
