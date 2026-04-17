# Strategy Config — Positive BX entry

## Identity

| Field             | Value                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Strategy name     | Positive BX entry (TrendSpider: **Strong upward momentum**)                                   |
| Scan source       | TrendSpider Market Scanner via live UI                                                        |
| Saved scanner     | `Strong upward momentum`                                                                      |
| Scan runner       | `python3 scripts/trendspider_scan.py --scanner-name "Strong upward momentum"`                 |
| Universe          | S&P 500 Index                                                                                 |
| Trading style     | Position trading (weeks to months)                                                            |
| Max picks per run | 3                                                                                             |
| Log file          | `strategies/positive-bx-entry/trades-log.csv`                                                 |
| **Instrument**    | Preferred: `paired_debit_spread`; secondary: `stock` · `bull_call_spread` · `put_credit_spread` |
| **Chart layout**  | `https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER` (plain ticker; profile **Tim**)     |

---

## Strategy Thesis

The scan surfaces S&P 500 names with **strong bullish momentum** and **positive weekly B-Xtrender histogram**, pre-filtered in TrendSpider. The agent adds **fundamental and news context**, then uses **TradingView** (Fair Value Bands + weekly BX + daily B-Xtrender) to judge **structure**, **extension vs fair value**, and **entry timing**. On **THT Fair Value Bands**, the **lower** line is **fair value**; the **middle** line is **slight premium** (not core fair value); the **upper** line is **stress**. Prefer entries with price **near or returning toward the lower band**; if the setup is valid but price is **too extended** (e.g. into upper band without a pullback plan), recommend a **watchlist** instead of an immediate trade.

---

## Scan Logic (TrendSpider — all must be true)

A symbol appears in `symbolsFound` only if **all** of the following hold (daily **D** / weekly **W**):

1. **Price above short MA:** `D Price.Close` (last) **>** `D SMA(20, close)` (last)
2. **RSI strong:** `D RSI(14, …, close)` (last) **>** constant `60`
3. **5-day positive change:** `D Price.Close` (last) **>** `D Price.Close` **5 candles ago**
4. **Volume above average:** `D Volume` (last) **>** `D Volume` **20-period SMA** (last)
5. **Daily B-Xtrender turn:** `D B-Xtrender @Puppytherapy - Final Fix (5, 20, 5, 20, 5)`, **Turn Up** (last) **>** constant `-100`
6. **Weekly B-Xtrender:** `W` same B-Xtrender, **Oscillator histogram** (last) **>** constant `0`

---

## What the scan guarantees

The list is already momentum- and weekly-BX-filtered. The agent **does not** re-prove those math conditions tick-for-tick; it **confirms** weekly/daily BX and fair-value context on **TradingView** per `.cursor/skills/indicators/SKILL.md`, then scores quality and timing.

---

## Entry criteria

- **TradingView:** Fair value bands show **bullish (green) structure** for a long-bias entry; prefer **pullback toward the lower band (fair value)**. The **middle** band = **premium** (already extended vs core value); the **upper** band = **stress** — avoid chasing longs there without a plan.
- **Weekly BX row** green on the chart (should align with scan; if not, investigate or exclude).
- **Daily B-Xtrender** timing must **not** strongly conflict with an immediate new long (e.g. fresh **sell** signal + extended price → **watchlist**, not CSV pick).
- Volume and trend context consistent with continuation (scan already biased this way).
- **Earnings:** always check and report the next earnings date. For the preferred **`paired_debit_spread`**, earnings are **not** an automatic exclusion because the structure benefits from realized movement. For secondary **stock** or **premium-selling** choices (`put_credit_spread`), treat earnings as a major risk and either size down, switch back to the preferred move-benefiting structure, or exclude the trade if the setup depends on avoiding event volatility.

---

## Watchlist (no immediate entry)

If research + scan quality are **good** but TradingView shows **overextension** or **bad timing** (see `indicators` skill), add the symbol to the **Watchlist** section of `report.md` with:

- **Trigger** (e.g. pullback toward **lower fair value** band, reclaim after test of X)
- **What would change the view** (e.g. bands flip red → drop)

**Do not** append `trades-log.csv` rows for watchlist-only names.

---

## Scoring system

Scores out of **100** points. Minimum **55** to qualify as a tradable pick.

### Category A — Structure & timing (50 pts max)

| Check | Pts |
| ----- | --- |
| Fair value bands **green** (bullish structure) on daily | 12 |
| Price **not overextended** vs bands — near **lower (fair value)** band or constructive pullback toward it; **middle = premium** (partial credit only if rest of setup is strong) | 15 |
| Weekly BX row **green** on chart (confirms higher-TF pressure) | 8 |
| Daily B-Xtrender **compatible** with a new long (no hard conflict on latest bar) | 10 |
| Daily price structure coherent with continuation (higher lows / trend intact) | 5 |

### Category B — Risk / reward (25 pts max)

| R:R | Pts |
| --- | --- |
| ≥ 3:1 | 25 |
| ≥ 2:1 | 18 |
| ≥ 1.5:1 | 10 |
| < 1.5:1 | 0 |

### Category C — Fundamentals (15 pts max)

| Check | Pts |
| ----- | --- |
| Beat earnings in most recent report | 5 |
| Revenue YoY growth positive | 4 |
| EPS YoY growth positive | 4 |
| Analyst upgrade in last 30 days | 2 |

### Category D — Catalyst & momentum (10 pts max)

| Check | Pts |
| ----- | --- |
| Positive news / catalyst in last 2 weeks | 5 |
| Sector tailwind or relative strength | 5 |

### Deductions

| Condition | Pts |
| --------- | --- |
| Earnings within 3 weeks **when using an earnings-sensitive secondary instrument** (e.g. stock / put credit spread) | −20 |
| Fair value bands **red** (bearish structure) | −15 |
| **Chasing** — at or pressing **upper** stress band, or extended above **middle premium** without pullback toward **lower** fair value | −12 |
| Daily B-Xtrender **sell** or strong bearish histogram on latest bar **for immediate entry** | −10 |
| Weekly BX row **red** on chart (conflicts scan) | −15 |
| Stock below 200-day MA | −8 |
| Sector in confirmed downtrend | −10 |
| Recent insider selling (30d) | −5 |

### Scoring notes

- Award Category B as **single highest** R:R band only.
- Upcoming earnings should always be shown in the output, but they are **not** an automatic penalty when the selected instrument is the preferred **`paired_debit_spread`**.
- If a fact cannot be verified, do **not** award those points — say so in output.
- Show breakdown, e.g. `Score: 72/100 (A:35 B:18 C:11 D:5 Ded:3)`.

---

## Instrument & spread construction

Same framework as archived momentum-pullback: after scoring, choose instrument per IV, conviction, regime, and expected move profile. The preferred default is `paired_debit_spread` from `strategies/instruments.md`; use `stock`, `bull_call_spread`, or `put_credit_spread` only when the framework says the paired hedge is unnecessary or inefficient. Reuse the spread tables and output block from `strategies/archived/momentum-pullback/config.md` (sections **Instrument decision framework** through **Spread output block**).

**CSV / outcome note:** spread rows use the same WIN/LOSS rules described there (`target_1` / `stop_loss` mapping per spread type).

---

## Output summary header

```
=== POSITIVE BX ENTRY — [DATE] ===
Universe: S&P 500 | Style: Position Trade | Scan: Strong upward momentum
```
