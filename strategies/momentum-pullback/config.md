# Strategy Config — Momentum After Pullback

## Identity

| Field | Value |
|---|---|
| Strategy name | Momentum After Pullback |
| Scan source | TrendSpider Scheduled Scan |
| Scan URL | `https://charts.trendspider.com/scheduled_scans/view/sub-294213843b440f9793b6b7bb0432e5/json` |
| Universe | S&P 500 Index |
| Trading style | Position trading (weeks to months) |
| Max picks per run | 3 |
| Log file | `strategies/momentum-pullback/trades-log.csv` |

## Strategy Thesis

This scan identifies S&P 500 stocks that are in a momentum uptrend but have recently pulled back — creating a potential re-entry or continuation opportunity. The pullback should be orderly (not a breakdown), with the broader uptrend still intact.

## Entry Criteria

- Stock must be in a clear uptrend on the daily and/or weekly chart
- Price is pulling back toward a logical support zone (moving average, prior breakout level, trendline)
- Volume should be declining on the pullback (healthy consolidation)
- No earnings within 3 weeks of the planned entry (hard filter — exclude or flag prominently)

## Scoring System

Scores are out of **100 points**. A ticker must reach the **minimum threshold** to qualify as a pick. Apply every applicable check and sum the points, then apply deductions.

**Minimum score to qualify: 50 pts**

---

### Category A — Technical Setup (40 pts max)

| Check | Points |
|---|---|
| Stock in uptrend on weekly chart (higher highs / higher lows) | 10 |
| Stock in uptrend on daily chart | 8 |
| Pulling back to a logical support zone (MA, breakout level, trendline) | 10 |
| Volume declining on pullback (healthy consolidation, not breakdown) | 7 |
| Recognisable continuation pattern (bull flag, flat base, wedge, etc.) | 5 |

### Category B — Risk / Reward (25 pts max)

| R:R Ratio | Points |
|---|---|
| ≥ 3:1 | 25 |
| ≥ 2:1 | 18 |
| ≥ 1.5:1 | 10 |
| < 1.5:1 | 0 |

### Category C — Fundamentals (20 pts max)

| Check | Points |
|---|---|
| Beat earnings estimates in most recent report | 6 |
| Revenue growth positive year-over-year | 5 |
| EPS growth positive year-over-year | 5 |
| Analyst upgrade in the last 30 days | 4 |

### Category D — Catalyst & Momentum (15 pts max)

| Check | Points |
|---|---|
| Positive news catalyst in the last 2 weeks | 8 |
| Sector in uptrend / currently in favour | 7 |

---

### Deductions

| Condition | Deduction |
|---|---|
| Earnings within 3 weeks of entry | −20 pts |
| Stock below its 200-day MA | −8 pts |
| Sector in confirmed downtrend | −10 pts |
| Recent insider selling (last 30 days) | −5 pts |

---

### Scoring Notes

- Award points for each check independently — a ticker can score in multiple categories
- For Category B, award only the highest applicable R:R band (not cumulative)
- If a data point cannot be verified, do not award the points for it — note this in the output
- Show the score breakdown in the per-ticker output: e.g. `Score: 72/100 (A:32 B:18 C:16 D:15 Ded:-9)`

## Output Summary Header

Use this header in the final session output:

```
=== MOMENTUM PULLBACK SCAN — [DATE] ===
Universe: S&P 500 | Style: Position Trade
```
