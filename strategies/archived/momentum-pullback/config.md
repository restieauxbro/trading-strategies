# Strategy Config — Momentum After Pullback

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
| Log file          | `strategies/archived/momentum-pullback/trades-log.csv`                                        |
| **Instrument**    | Agent's discretion per pick — `stock` · `bull_call_spread` · `put_credit_spread`             |


## Strategy Thesis

This scan identifies S&P 500 stocks that are in a momentum uptrend but have recently pulled back — creating a potential re-entry or continuation opportunity. The pullback should be orderly (not a breakdown), with the broader uptrend still intact.

---

## Scan Logic (TrendSpider Conditions)

The TrendSpider scan applies the following conditions. A ticker only appears in `symbolsFound` if **all** of these are true. Understanding this helps the agent know what has already been pre-filtered before any manual analysis begins.

### Group 1 — Trend alignment (enhanced weekly structure)

All of the following, on the **current symbol**:

- **Daily**: `Price.Close` (last) **greater than** `EMA(200, 0, close)` (last) — price is above the daily 200 EMA
- **Weekly**: `EMA(50, 0, close)` (last) **greater than** `EMA(200, 0, close)` (last) — weekly 50 EMA is above weekly 200 EMA (golden cross structure)
- **Weekly**: `Price.Close` (last) **greater than** `EMA(50, 0, close)` (last) — price is above the weekly 50 EMA

### Group 2 — Rising trend confirmation (EMAs trending up)

All of the following, on the **current symbol**:

- **Daily**: `EMA(200, 0, close)` (last) **greater than** `EMA(200, 0, close)` **40 candles ago** — 200 EMA is rising
- **Daily**: `EMA(50, 0, close)` (last) **greater than** `EMA(50, 0, close)` **20 candles ago** — 50 EMA is rising

### Group 3 — Asymmetric pullback: price within ±3% of daily 50 EMA

All of the following, on the **current symbol**:

- **Daily**: `Price.Close` (last) **is within range of** `EMA(50, 0, close)` (last) **by ±3%** — price has pulled back to the 50 EMA zone
  AND any of the following (actual test of 50 EMA in last 5 bars):
  - **Daily**: `Price.Low` (last) **less than or equal to** `EMA(50, 0, close)` (last) — within the last 5 candles, price has actually touched or dipped below the 50 EMA

### Group 4 — Timing triggers (at least one must be true)

Any of the following, on the **current symbol**:

- **Trigger A — Close back above 20 EMA after being below:**
  - **Daily**: `Price.Close` (last) **greater than** `EMA(20, 0, close)` (last)
  - **Daily**: `Price.Close` 1 candle ago **less than** `EMA(20, 0, close)` 1 candle ago
- **Trigger B — RSI crossing back above 50:**
  - **Daily**: `RSI(14, 70, 30, close)` (last) **greater than** constant `50`
  - **Daily**: `RSI(14, 70, 30, close)` 1 candle ago **less than or equal to** constant `50`
- **Trigger C — Close above prior day's high after pullback:**
  - **Daily**: `Price.Close` (last) **greater than** `Price.High` 1 candle ago

---

## What the Scan Guarantees

Every ticker that appears has already passed these pre-filters.

The agent's job is **not** to re-verify these scan conditions — it can take them as given. The agent's job is to assess quality (how clean the setup is, how strong the fundamentals are, is R:R compelling) and apply the scoring system to select the best 3.

---

## Entry Criteria

- Stock must be in a clear uptrend on the daily and/or weekly chart
- Price is pulling back toward a logical support zone (moving average, prior breakout level, trendline)
- Volume should be declining on the pullback (healthy consolidation)
- No earnings within 3 weeks of the planned entry (hard filter — exclude or flag prominently)

## Scoring System

Scores are out of **115 points**. A ticker must reach the **minimum threshold** to qualify as a pick. Apply every applicable check and sum the points, then apply deductions.

**Minimum score to qualify: 55 pts**

---

### Category A — Technical Setup (55 pts max)


| Check                                                                  | Points |
| ---------------------------------------------------------------------- | ------ |
| Stock in uptrend on weekly chart (higher highs / higher lows)          | 10     |
| Stock in uptrend on daily chart                                        | 8      |
| Pulling back to a logical support zone (MA, breakout level, trendline) | 10     |
| Volume declining on pullback (healthy consolidation, not breakdown)    | 7      |
| Recognisable continuation pattern (bull flag, flat base, wedge, etc.)  | 5      |
| B-Xtrender background bars green during pullback (long-term trend intact) | 5  |
| B-Xtrender green dot printed on signal line (momentum of pullback reversing) | 7 |
| B-Xtrender foreground histogram recovering toward zero or crossed back above | 3 |


### Category B — Risk / Reward (25 pts max)


| R:R Ratio | Points |
| --------- | ------ |
| ≥ 3:1     | 25     |
| ≥ 2:1     | 18     |
| ≥ 1.5:1   | 10     |
| < 1.5:1   | 0      |


### Category C — Fundamentals (20 pts max)


| Check                                         | Points |
| --------------------------------------------- | ------ |
| Beat earnings estimates in most recent report | 6      |
| Revenue growth positive year-over-year        | 5      |
| EPS growth positive year-over-year            | 5      |
| Analyst upgrade in the last 30 days           | 4      |


### Category D — Catalyst & Momentum (15 pts max)


| Check                                      | Points |
| ------------------------------------------ | ------ |
| Positive news catalyst in the last 2 weeks | 8      |
| Sector in uptrend / currently in favour    | 7      |


---

### Deductions


| Condition                                                               | Deduction |
| ----------------------------------------------------------------------- | --------- |
| Earnings within 3 weeks of entry                                        | −20 pts   |
| Stock below its 200-day MA                                              | −8 pts    |
| Sector in confirmed downtrend                                           | −10 pts   |
| Recent insider selling (last 30 days)                                   | −5 pts    |
| B-Xtrender background bars red (long-term trend bearish during pullback) | −8 pts   |
| B-Xtrender red dot printed on signal line (momentum still falling)      | −6 pts    |


---

### Scoring Notes

- Award points for each check independently — a ticker can score in multiple categories
- For Category B, award only the highest applicable R:R band (not cumulative)
- If a data point cannot be verified, do not award the points for it — note this in the output
- Show the score breakdown in the per-ticker output: e.g. `Score: 72/100 (A:32 B:18 C:16 D:15 Ded:-9)`

---

## Instrument & Spread Construction

The stock-selection logic (scan, B-Xtrender check, scoring) is identical regardless of instrument. After scoring, the agent selects the instrument for each pick based on the decision framework below. Different picks in the same run can use different instruments.

### Instrument decision framework

**Preferred instrument:** `paired_debit_spread` per `strategies/instruments.md`.

For each pick, work through these factors in order:

**1. Move profile (primary driver)**
- Expect a **clean directional move with risk of a sharp reversal the other way**: favour `paired_debit_spread`
- Expect a **grinding move** or a simple hold-above-support outcome: `put_credit_spread` can still be better
- Expect an unusually strong trend with room well beyond T1: consider `stock` only when conviction is exceptional

**2. IV environment**
- IV rank < 45%: favour `paired_debit_spread` or `bull_call_spread` — buying spreads is cost-effective
- IV rank 45–60%: neutral — let move profile and conviction decide
- IV rank > 60%: favour `put_credit_spread` unless realized-move expectations are unusually high

**3. Setup conviction and R:R**
- High conviction (score ≥ 80, B-Xtrender green dot, clean pattern, strong fundamentals) + R:R ≥ 3:1: consider `stock` — don't cap a high-quality setup
- Moderate conviction (score 55–79) or R:R 2:1–2.9:1: `paired_debit_spread` is preferred when movement is the thesis; otherwise `bull_call_spread` or `put_credit_spread` depending on IV
- Low R:R (< 2:1) but setup is otherwise clean: `put_credit_spread` is often better — the stock only needs to stay above support rather than advance to T1

**4. Market regime (from orchestrator or Step 3 market context)**
- Risk-On: `paired_debit_spread`, `stock`, or `bull_call_spread`
- Mixed or Sector-Divergent: `paired_debit_spread` preferred — defined risk with a built-in wrong-way tail hedge
- Risk-Off (restricted run): `put_credit_spread` preferred — theta decay and defined risk suit a cautious posture

**5. Override rules**
- If IV rank is very high (>70%) and setup is only moderate conviction: strongly prefer `put_credit_spread` over any debit structure
- If IV rank is very low (<25%) and the move to T1 is well-defined: `paired_debit_spread` is preferred if you want wrong-way crash protection; `bull_call_spread` is acceptable if the hedge side is too illiquid
- Never force the paired structure when the opposite-side hedge cannot be built with reasonable liquidity or spread width
- Never use `bull_call_spread` when IV rank > 60% unless there is a specific reason to own movement rather than sell premium

State the chosen instrument and a one-line rationale for each pick before presenting the spread construction (or confirming stock entry).

---

### Paired Debit Spread Construction

This is the preferred instrument when the thesis is: "direction likely, realized movement more likely than drift, and a violent wrong-way move should not be catastrophic."

| Parameter | Rule |
|---|---|
| Primary structure | `bull_call_spread` at or near the money |
| Hedge structure | `bear_put_spread` at **half-size** |
| Primary long strike | ATM or 1 strike OTM (~0.45-0.55 delta) |
| Primary short strike | Choose width so max profit is roughly equal to max loss |
| Hedge long strike | Start near ATM or slightly OTM on the put side |
| Hedge short strike | Choose width so the hedge makes about **2x its own risk** |
| Size ratio | Primary `1.0x`, hedge `0.5x` |
| Target DTE | 21-45 days |
| Use case | Prefer when you expect movement and want to lose mainly on drift, not on a large wrong-way move |

**CSV field mapping:**
- `entry_zone` → current stock price at analysis time
- `stop_loss` → primary spread max-loss anchor / note combined max-loss debit in `setup_summary`
- `target_1` → primary short strike
- `risk_reward` → primary expected payout ÷ total combined debit
- `setup_summary` → both spreads, expiry, size ratio, combined debit, estimated payout if right vs violent wrong-way move

**Outcome at 14 days:** Use the combined position.
- `WIN` → price moved through or close to the primary spread max-profit zone
- `PARTIAL` → price made a meaningful move but neither spread reached efficient payout
- `LOSS` → price drifted / pinned such that both spreads decayed materially

---

### Bull Call Spread Construction

| Parameter | Rule |
|---|---|
| Long call strike | ATM or 1 strike OTM (~0.40–0.50 delta) — this is your directional exposure |
| Short call strike | At or just above T1 target (~0.20–0.25 delta) — caps upside, funds the long |
| Spread width | Difference between strikes; typically $5–$10 wide on large-caps |
| Target DTE | 30–45 days — enough time for the move, not so much that you overpay |
| Max profit | (Short strike − Long strike) − Net debit paid |
| Max loss | Net debit paid |
| Breakeven | Long strike + Net debit |
| IV filter | Prefer low IV rank (<40%) — avoid buying spreads into inflated premium |

**CSV field mapping:**
- `entry_zone` → current stock price at analysis time
- `stop_loss` → long call strike (your max-loss anchor)
- `target_1` → short call strike (max profit level)
- `risk_reward` → max profit ÷ net debit
- `setup_summary` → spread details: strikes, expiry, net debit, PoP estimate

**Outcome at 14 days:** Did the stock close at or above the short call strike?
- `WIN` → stock ≥ short call strike (spread at or near max profit)
- `LOSS` → stock below long call strike (spread near worthless)
- `PARTIAL` → stock between strikes (partial profit — log as WIN with note)

---

### Put Credit Spread Construction

| Parameter | Rule |
|---|---|
| Short put strike | At or just below entry zone (~0.25–0.30 delta) — stock must stay above this |
| Long put strike | At the stock's stop level (~0.10–0.15 delta) — limits max loss |
| Spread width | Difference between strikes; typically $5–$10 wide on large-caps |
| Target DTE | 21–35 days — shorter than call spreads; theta decay accelerates near expiry |
| Max profit | Net credit received (kept if stock stays above short put at expiry) |
| Max loss | Spread width − Net credit |
| Breakeven | Short put strike − Net credit |
| IV filter | Prefer elevated IV rank (>50%) — sell premium when it's expensive |

**CSV field mapping:**
- `entry_zone` → current stock price at analysis time
- `stop_loss` → short put strike (the breach level — same as bearish-call-spread logic)
- `target_1` → long put strike (max-loss anchor)
- `risk_reward` → net credit ÷ max loss
- `setup_summary` → spread details: strikes, expiry, net credit, PoP estimate

**Outcome at 14 days:** Did the stock close above the short put strike?
- `WIN` → stock > short put strike (spread retains premium)
- `LOSS` → stock ≤ short put strike (spread breached — max loss risk)

---

### Spread output block (add after standard trade plan if instrument ≠ stock)

```
Instrument: [Paired Debit Spread / Bull Call Spread / Put Credit Spread]
IV Rank: ~[X]% ([low/moderate/elevated])

Suggested Structure:
  Preferred when applicable: Paired Debit Spread per `strategies/instruments.md`
  If using a single spread, explain why the paired hedge was not used

Suggested Spread:
  [Long / Short] Call/Put Strike: $[strike] (~[delta] delta)
  [Short / Long] Call/Put Strike: $[strike] (~[delta] delta)
  Spread Width: $[width]
  Target Expiry: [Month YYYY] (~[DTE] DTE)
  Net [Debit / Credit]: ~$[amount] per share ($[amount] per contract)
  Max Profit: $[amount] per contract
  Max Loss:   $[amount] per contract
  Breakeven:  $[price]
  Est. Probability of Profit: ~[X]%

Short Strike Level (Breach Reference): $[strike] — [reason this is hard support: e.g. 50-day MA, prior breakout zone]
```

---

## Output Summary Header

Use this header in the final session output:

```
=== MOMENTUM PULLBACK SCAN — [DATE] ===
Universe: S&P 500 | Style: Position Trade
```
