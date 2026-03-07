# Strategy Config — Bearish Call Spread

## Identity


| Field             | Value                                                |
| ----------------- | ---------------------------------------------------- |
| Strategy name     | Bearish Call Spread                                  |
| Scan source       | TrendSpider Scheduled Scan                           |
| Scan URL          | *(not yet configured — add URL here when available)* |
| Universe          | S&P 500 / Large Cap (Market Cap > $10B, Price > $50) |
| Trading style     | Monthly options — bear call spreads (credit spreads) |
| Max picks per run | 3                                                    |
| Log file          | `strategies/bearish-call-spread/trades-log.csv`      |


---

## Strategy Thesis

This scan identifies large-cap stocks in a confirmed downtrend with lower highs structure, where momentum is falling but not yet oversold. The goal is to sell a bear call spread (out-of-the-money call + higher-strike long call) with a breakeven probability below 20% based on implied volatility — collecting premium on stocks unlikely to recover to resistance within the trade window.

Ideal setups have one or both of:

- **Momentum falling with strong resistance above**: price is trending lower with no clean reversal signal
- **Hard overhead resistance**: prior breakdown level, key moving average, or supply zone that acts as a ceiling

The spread is typically structured so the short call strike sits at or above a strong resistance level. The breakeven (short strike + net premium received) should imply less than 20% probability of being breached according to IV-derived probabilities.

---

## Scan Logic (TrendSpider Conditions)

The TrendSpider scan applies the following conditions. A ticker only appears in `symbolsFound` if **all** of these are true. Understanding this helps the agent know what has already been pre-filtered before any manual analysis begins.

### Group 1 — Trend & Resistance Filters

All of the following, on the **current symbol** (daily chart):

- `Price.Close` (last) **less than** `SMA(20, 0, close)` (last) — price below 20-day SMA (short-term downtrend)
- `Price.Close` (last) **less than** `SMA(50, 0, close)` (last) — price below 50-day SMA (medium-term downtrend)
- `5-Day Range High` (last) **less than** `5-Day Range High` (5 candles ago) — lower highs structure confirmed

### Group 2 — Momentum Filters

All of the following, on the **current symbol** (daily chart):

- `RSI(14)` (last) **greater than** constant `35` — not oversold (avoid bounce risk)
- `RSI(14)` (last) **less than** constant `55` — not bullish

### Group 3 — Liquidity & Quality Filters

All of the following, on the **current symbol**:

- `20-Day SMA Volume` **greater than** `500,000` — sufficient liquidity for options
- `Price.Close` (last) **greater than** constant `50` — minimum price threshold
- `Market Cap` **greater than** `10,000,000,000` — large cap only (reduces gap risk)

---

## What the Scan Guarantees

Every ticker that appears has already passed these pre-filters:

- Price is below both the 20 and 50-day SMAs (downtrend confirmed)
- Lower highs structure is in place (trend not reversing)
- RSI is in the 35–55 zone (falling but not at a bounce extreme)
- Stock has adequate liquidity and size for a spread trade

The agent's job is **not** to re-verify these scan conditions. The agent's job is to identify the best spreads by assessing resistance quality, narrative/news, IV environment, and options structure — and to apply the scoring system to select the top 3.

---

## Entry Criteria

- Stock must show a clear downtrend with overhead resistance (moving averages, prior breakdown zone, supply area)
- The short call strike should be placed **at or above the nearest hard resistance** level
- Implied volatility should be sufficient to price a spread where **breakeven is ≤20% probability** (use IV-derived delta as a proxy — short strike delta ≤ 0.20 preferred)
- Earnings within 17 days are pre-filtered by the scan — do not re-check for this
- Prefer monthly expirations 30–45 DTE (standard cycle)

---

## Spread Construction Notes

For each pick, note:

- **Short call strike**: at or above key resistance
- **Long call strike**: typically 5–10% wide above the short strike (adjust based on liquidity)
- **Net credit target**: aim for at least 20–25% of spread width
- **Max risk**: spread width minus net credit
- **Breakeven**: short strike + net credit
- **Probability check**: short call delta should ideally be ≤ 0.20 (≤20% probability ITM at expiry)

These are guidance notes. Actual strike selection depends on the live options chain — the agent should look up approximate IV and typical delta levels for the short strike zone.

---

## Scoring System

Scores are out of **100 points**. A ticker must reach the **minimum threshold** to qualify as a pick. Apply every applicable check and sum the points, then apply deductions.

**Minimum score to qualify: 55 pts**

---

### Category A — Downtrend & Resistance Quality (40 pts max)


| Check                                                                      | Points |
| -------------------------------------------------------------------------- | ------ |
| Price below 200-day MA (broader downtrend context)                         | 8      |
| Clear lower highs / lower lows structure on daily chart                    | 8      |
| Hard overhead resistance identified (prior breakdown, key MA, supply zone) | 10     |
| Resistance is recent and untested (within last 30 days)                    | 7      |
| Volume declining on rallies / confirming bearish pressure                  | 7      |


### Category B — Options Setup (25 pts max)


| Check                                                         | Points |
| ------------------------------------------------------------- | ------ |
| Short call strike delta ≤ 0.20 (≤20% probability ITM)         | 15     |
| Short call strike delta 0.21–0.30 (20–30% probability ITM)    | 8      |
| Short call strike delta > 0.30                                | 0      |
| IV rank or IV percentile ≥ 30% (elevated IV improves premium) | 10     |


*For Category B, award only the highest applicable delta band (not cumulative).*

### Category C — Bearish Conviction (20 pts max)

_Does the fundamental and narrative picture make a recovery unlikely?_

| Check                                                                          | Points |
| ------------------------------------------------------------------------------ | ------ |
| Revenue or EPS declining year-over-year (deteriorating business)               | 6      |
| Analyst downgrade or price target cut in the last 30 days                      | 6      |
| Recent earnings miss (most recent report came in below estimates)               | 5      |
| Sector rotation out of this stock's sector (institutional selling pressure)     | 3      |


### Category D — Bearish Narrative & Macro (15 pts max)

_Is the broader context reinforcing the downside case?_

| Check                                                                          | Points |
| ------------------------------------------------------------------------------ | ------ |
| Negative news catalyst in the last 2 weeks (guidance cut, regulatory issue, etc.) | 8  |
| Sector in confirmed downtrend / currently out of favour                        | 7      |


---

### Deductions

| Condition                                                                   | Deduction |
| --------------------------------------------------------------------------- | --------- |
| Stock showing a reversal pattern (hammer, bullish engulfing, double bottom) | −10 pts   |
| RSI showing a bullish divergence (price lower, RSI higher)                  | −8 pts    |
| Recent positive catalyst (upgrade, earnings beat, buyback announcement)     | −8 pts    |
| Price is within 3% of a key support level (high bounce risk zone)           | −5 pts    |


---

### Scoring Notes

- Award points for each check independently
- For Category B, award only the highest applicable delta band
- If a data point cannot be verified, do not award the points for it — note this in the output
- Show the score breakdown in the per-ticker output: e.g. `Score: 68/100 (A:28 B:25 C:10 D:8 Ded:-3)`

---

## Output Summary Header

Use this header in the final session output:

```
=== BEARISH CALL SPREAD SCAN — [DATE] ===
Universe: Large Cap (S&P 500) | Style: Monthly Bear Call Spreads
```

