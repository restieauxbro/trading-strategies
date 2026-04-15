# Strategy Config — Bearish Selector

## Identity


| Field             | Value                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------- |
| Strategy name     | Bearish Selector                                                                       |
| Scan source       | TrendSpider Market Scanner via live UI                                                 |
| Saved scanner     | `Bearish Case Market Scanner`                                                          |
| Scan runner       | `python3 scripts/trendspider_scan.py --scanner-name "Bearish Case Market Scanner"`    |
| Universe          | S&P 500 / Large Cap (Market Cap > $10B, Price > $50)                                   |
| Trading style     | Monthly options — preferred: `paired_debit_spread` (bear put spread + half-size bull call hedge); legacy fallback: bear call spread |
| Max picks per run | 3                                                                                      |
| Log file          | `strategies/bearish-call-spread/trades-log.csv`                                        |
| Chart layout (TradingView) | `https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER` — plain ticker; **Step 7** visual confirmation with browser-use profile **Tim** (see `.cursor/skills/indicators/SKILL.md`). |


---

## Strategy Thesis

This scan identifies large-cap stocks in a confirmed downtrend with lower highs structure, where momentum is falling but not yet oversold. The preferred expression is a **paired debit spread** from `strategies/instruments.md`: a near-ATM **bear put spread** as the main position, plus a **half-size bull call spread** as a wrong-way tail hedge. The legacy fallback is a **bear call spread** when IV is rich enough that selling premium is clearly superior to buying movement.

Ideal setups have one or both of:

- **Momentum falling with strong resistance above**: price is trending lower with no clean reversal signal
- **Hard overhead resistance**: prior breakdown level, key moving average, or supply zone that acts as a ceiling
- **Movement likely soon**: the setup should favour realized movement over slow drift, because drift is the main enemy of the paired debit structure

For the preferred paired structure, the primary bear put spread should target roughly **1:1 reward:risk**, while the half-size opposite bull call hedge should target roughly **2:1 reward:risk** so a violent rally can offset much of the downside spread loss. For the fallback bear call spread, the short call strike should still sit at or above a strong resistance level with short-strike delta ideally **≤ 0.20**.

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
- Preferred instrument: use a **bear put spread + half-size bull call spread hedge** when options are liquid and the move thesis is about **movement**, not passive theta harvest
- Primary bear put spread should be near ATM and structured for about **1:1 reward:risk**
- Opposite bull call hedge should be about **half the size** and structured for about **2:1 reward:risk**
- If using the legacy bear call spread fallback, the short call strike should be placed **at or above the nearest hard resistance** level
- Implied volatility should be sufficient to support the chosen instrument; for the bear call fallback, use IV-derived delta as a proxy and prefer short strike delta **≤ 0.20**
- Earnings within 17 days are pre-filtered by the scan — do not re-check for this
- Prefer monthly expirations 30–45 DTE (standard cycle)

---

## Spread Construction Notes

For each pick, note:

- **Preferred structure**: near-ATM **bear put spread** plus **half-size bull call spread** hedge; see `strategies/instruments.md`
- **Primary spread**: size and width should target about **1:1 reward:risk**
- **Opposite hedge**: half-size; width and debit should target about **2:1 reward:risk**
- **Combined position goal**: make money if the bearish thesis plays out, approach breakeven if the move violently breaks the other way, lose mainly if price stalls or drifts
- **Fallback bear call spread**: short call at or above key resistance, long call 5–10% higher, net credit target at least 20–25% of spread width, short-strike delta ideally ≤ 0.20

When presenting the setup, state explicitly whether the instrument is:

- `paired_debit_spread` (preferred)
- `bear_call_spread` (fallback)

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


| Check                                                                              | Points |
| ---------------------------------------------------------------------------------- | ------ |
| Preferred paired debit spread can be built cleanly with liquid strikes and sane width | 15     |
| Only fallback bear call spread looks clean                                         | 8      |
| No clean options structure                                                         | 0      |
| IV rank or IV percentile supports the chosen structure                             | 10     |


*For Category B, award only the highest applicable structure band (not cumulative).*

### Category C — Bearish Conviction (20 pts max)

*Does the fundamental and narrative picture make a recovery unlikely?*


| Check                                                                       | Points |
| --------------------------------------------------------------------------- | ------ |
| Revenue or EPS declining year-over-year (deteriorating business)            | 6      |
| Analyst downgrade or price target cut in the last 30 days                   | 6      |
| Recent earnings miss (most recent report came in below estimates)           | 5      |
| Sector rotation out of this stock's sector (institutional selling pressure) | 3      |


### Category D — Bearish Narrative & Macro (15 pts max)

*Is the broader context reinforcing the downside case?*


| Check                                                                             | Points |
| --------------------------------------------------------------------------------- | ------ |
| Negative news catalyst in the last 2 weeks (guidance cut, regulatory issue, etc.) | 8      |
| Sector in confirmed downtrend / currently out of favour                           | 7      |


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
- For Category B, award only the highest applicable structure band
- If a data point cannot be verified, do not award the points for it — note this in the output
- Show the score breakdown in the per-ticker output: e.g. `Score: 68/100 (A:28 B:25 C:10 D:8 Ded:-3)`

---

## Optional: yfinance CLI (local)

For **quotes, SMAs, expirations, and call-chain slices** (bid/ask, implied vol as reported by Yahoo), run the repo script from a venv — see root **`README.md`** (`scripts/yfinance_tools.py`). Data is unofficial; confirm strikes and greeks in your platform when possible.

---

## Output Summary Header

Use this header in the final session output:

```
=== BEARISH SELECTOR SCAN — [DATE] ===
Universe: Large Cap (S&P 500) | Style: Monthly Bearish Options Structures
```
