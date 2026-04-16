# Strategy Config — Momentum After Pullback (Live)

## Identity

| Field             | Value                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Strategy name     | Momentum After Pullback                                                                       |
| Scan source       | TrendSpider Market Scanner via live UI                                                        |
| Saved scanner     | `Momentum after pullback`                                                                     |
| Scan runner       | `python3 scripts/trendspider_scan.py --scanner-name "Momentum after pullback"`               |
| Universe          | S&P 500 Index                                                                                 |
| Trading style     | Position trading (weeks to months)                                                            |
| Max picks per run | 3                                                                                             |
| Log file          | `strategies/momentum-pullback/trades-log.csv`                                                 |
| **Instrument**    | Preferred: `paired_debit_spread` per `strategies/instruments.md`; secondary: `stock` · `bull_call_spread` · `put_credit_spread` |

---

## Strategy Thesis

This scan identifies S&P 500 stocks in a momentum uptrend that have recently pulled back — creating a potential re-entry or continuation opportunity. The pullback should be orderly (not a breakdown), with the broader uptrend still intact.

---

## Scan Logic (TrendSpider Conditions)

### Group 1 — Trend alignment (enhanced weekly structure)

All of the following:
- **Daily**: `Price.Close` (last) **>** `EMA(200, 0, close)` (last) — price above 200 EMA
- **Weekly**: `EMA(50, 0, close)` (last) **>** `EMA(200, 0, close)` (last) — weekly golden cross
- **Weekly**: `Price.Close` (last) **>** `EMA(50, 0, close)` (last) — price above weekly 50 EMA

### Group 2 — Rising trend confirmation

All of the following:
- **Daily**: `EMA(200, 0, close)` (last) **>** `EMA(200, 0, close)` 40 candles ago
- **Daily**: `EMA(50, 0, close)` (last) **>** `EMA(50, 0, close)` 20 candles ago

### Group 3 — Asymmetric pullback: price within ±3% of daily 50 EMA

Price has pulled back to and tested the 50 EMA zone in the last 5 bars.

### Group 4 — Timing triggers (at least one)

- **Trigger A**: Close back above 20 EMA after being below
- **Trigger B**: RSI crossing back above 50
- **Trigger C**: Close above prior day's high after pullback

---

## Entry Criteria

- Stock in a clear uptrend on daily and/or weekly chart
- Price pulling back toward logical support zone (moving average, prior breakout, trendline)
- Volume declining on pullback (healthy consolidation, not distribution)
- **No earnings within 3 weeks** of planned entry (hard filter)

---

## Scoring System

Scores out of **115 points**. **Minimum threshold: 55 pts**

### Category A — Technical Setup (55 pts max)

| Check | Points |
|---|---|
| Stock in uptrend on weekly chart | 10 |
| Stock in uptrend on daily chart | 8 |
| Pulling back to logical support zone | 10 |
| Volume declining on pullback | 7 |
| Recognisable continuation pattern | 5 |
| B-Xtrender background bars green | 5 |
| B-Xtrender green dot on signal line | 7 |
| B-Xtrender histogram recovering | 3 |

### Category B — Risk / Reward (25 pts max)

| R:R | Points |
|---|---|
| ≥ 3:1 | 25 |
| ≥ 2:1 | 18 |
| ≥ 1.5:1 | 10 |
| < 1.5:1 | 0 |

### Category C — Fundamentals (20 pts max)

| Check | Points |
|---|---|
| Beat earnings in most recent report | 6 |
| Revenue growth positive YoY | 5 |
| EPS growth positive YoY | 5 |
| Analyst upgrade in last 30 days | 4 |

### Category D — Catalyst & Momentum (15 pts max)

| Check | Points |
|---|---|
| Positive news catalyst last 2 weeks | 8 |
| Sector in uptrend / currently in favour | 7 |

### Deductions

| Condition | Deduction |
|---|---|
| Earnings within 3 weeks | −20 pts |
| Stock below 200-day MA | −8 pts |
| Sector in confirmed downtrend | −10 pts |
| Recent insider selling (30d) | −5 pts |
| B-Xtrender background bars red | −8 pts |
| B-Xtrender red dot on signal line | −6 pts |

---

## Instrument & Spread Construction

Preferred instrument is `paired_debit_spread` per `strategies/instruments.md`. For spread construction rules, see `strategies/archived/momentum-pullback/config.md` (sections **Instrument decision framework** through **Spread output block**).

---

## Output Summary Header

```
=== MOMENTUM PULLBACK SCAN — [DATE] ===
Universe: S&P 500 | Style: Position Trade
```
