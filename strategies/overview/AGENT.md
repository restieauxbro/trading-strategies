# Market Overview — Orchestrator Agent

Runs all active strategies in one session and synthesises the results into a unified position set. Individual strategy agents remain callable standalone — this orchestrator sits on top of them.

## Setup

Before starting, load the following files:

1. **Skill: `analyse-tickers`** — `.cursor/skills/analyse-tickers/SKILL.md`
2. **Skill: `log-trade-csv`** — `.cursor/skills/log-trade-csv/SKILL.md`
3. **Skill: `track-outcomes`** — `.cursor/skills/track-outcomes/SKILL.md`
4. **Skill: `indicators`** — `.cursor/skills/indicators/SKILL.md` (TradingView layout; loaded by strategy workflows as needed)
5. **Strategy config: positive-bx-entry** — `strategies/positive-bx-entry/config.md`
6. **Strategy config: bearish-call-spread** — `strategies/bearish-call-spread/config.md`
7. **Strategy workflow: positive-bx-entry** — `strategies/positive-bx-entry/AGENT.md`
8. **Strategy workflow: bearish-call-spread** — `strategies/bearish-call-spread/AGENT.md`

---

## Workflow

### Step 1 — Market Regime Assessment

Assess the broad market and each major sector. This step determines which strategies are activated and with what filters.

#### 1a — Broad market

- Is the S&P 500 above or below its 200-day MA? How far?
- VIX level: low (<18), moderate (18–25), elevated (25–35), extreme (>35)
- Trend: uptrend / downtrend / consolidation / whipsaw
- Assign a **broad market bias**: **Bullish / Neutral / Bearish**

#### 1b — Sector map

For each major S&P 500 sector, assess whether it is in an uptrend, downtrend, or neutral by checking the sector ETF vs its 200-day MA and recent price action. Note any sectors showing strong relative strength or weakness vs the index.

| Sector | ETF | Bias | Notes |
|--------|-----|------|-------|
| Technology | XLK | | |
| Financials | XLF | | |
| Energy | XLE | | |
| Healthcare | XLV | | |
| Industrials | XLI | | |
| Consumer Discretionary | XLY | | |
| Consumer Staples | XLP | | |
| Materials | XLB | | |
| Utilities | XLU | | |
| Real Estate | XLRE | | |
| Communications | XLC | | |

Fill the Bias column: **↑ Bullish / → Neutral / ↓ Bearish**

#### 1c — Regime label

Assign one of the following based on 1a and 1b:

| Label | Conditions |
|-------|-----------|
| **Risk-On** | S&P 500 well above 200 MA, VIX < 18, majority of sectors bullish |
| **Risk-Off** | S&P 500 below 200 MA, VIX > 25, majority of sectors bearish |
| **Mixed** | S&P 500 near 200 MA or choppy, sectors split roughly evenly |
| **Sector-Divergent** | S&P 500 neutral or mildly trending, but clear winning and losing sectors |

In most real market conditions the regime will be **Mixed** or **Sector-Divergent** — both strategies can run simultaneously on different sectors.

---

### Step 2 — Strategy Routing

Based on the regime label and sector map, determine which strategies are active this run and what constraints apply:

| Regime | Positive BX entry | Bearish Call Spread |
|--------|-------------------|---------------------|
| Risk-On | Full run, all sectors | Selective only — stocks in ↓ Bearish sectors only; apply stricter minimum score (+10 pts) |
| Risk-Off | Restricted — ↑ Bullish sectors only; stricter minimum score (+10 pts) | Full run |
| Mixed | ↑ Bullish sectors only | ↓ Bearish sectors only |
| Sector-Divergent | ↑ Bullish sectors only | ↓ Bearish sectors only |

Note the routing decision in the output. If a strategy is fully paused (e.g. positive-bx-entry in a confirmed Risk-Off regime with no bullish sectors), skip that strategy entirely and explain why.

---

### Step 3 — Run Positive BX entry strategy

> ⛔ **CSV append must not happen until Step 4b (TradingView visual check) is complete for all candidates.**

Follow **all steps** in `strategies/positive-bx-entry/AGENT.md` with the following additions from Step 1:

- **Sector filter**: when scoring tickers, apply an additional −10 pt deduction to any ticker in a → Neutral or ↓ Bearish sector (on top of the existing sector deduction in config.md). Award an additional +5 pts bonus to any ticker in a sector showing strong relative strength vs the S&P 500.
- **Market context (Step 3 of that workflow)**: skip the broad market research — use the assessment from Step 1a of this orchestrator instead.
- Complete all remaining steps of that workflow including CSV append and report generation.

Capture the results: list of picks (or "none"), watchlist names, scores, and sectors.

---

### Step 4 — Run Bearish Call Spread Strategy

Follow **all steps** in `strategies/bearish-call-spread/AGENT.md` with the following additions:

- **Sector filter**: apply an additional −10 pt deduction to any ticker in a → Neutral or ↑ Bullish sector. Award an additional +5 pts bonus to any ticker in a sector showing accelerating institutional outflows or confirmed downside rotation.
- **Market context (Step 3 of that workflow)**: use the assessment from Step 1a of this orchestrator.
- Complete all remaining steps including TradingView confirmation, CSV append, and report generation.

Capture the results: list of picks (or abstention), scores, and sectors.

---

### Step 5 — Portfolio Synthesis

Combine the picks from both strategies and assess the resulting position set as a whole.

#### 5a — Unified position list

| # | Strategy | Ticker | Direction | Sector | Score | Setup |
|---|----------|--------|-----------|--------|-------|-------|
| 1 | Positive BX entry | | Long | | | |
| 2 | Bearish Call Spread | | Bear spread | | | |
| … | | | | | | |

#### 5b — Concentration check

Flag any of the following:

- **Sector concentration**: more than 2 positions (across both strategies) in the same sector
- **Directional skew**: if all positions are the same direction (all long or all bear spread), note this and flag whether it matches the regime
- **Strategy imbalance**: if one strategy returned 3 picks and the other returned 0, note whether this is regime-appropriate or a data gap

#### 5c — Net portfolio bias

State the net directional bias of the combined book:
- e.g. "3 longs + 2 bear spreads — net bullish bias, appropriate for Sector-Divergent regime with more bullish sectors than bearish"
- If bias conflicts with the regime label (e.g. net long in Risk-Off), flag it explicitly

---

### Step 6 — Generate Overview Report

Write `strategies/overview/report.md` with the following structure:

```markdown
# Market Overview — [YYYY-MM-DD]

---

## Market Regime: [Label]

[2–3 sentences: broad market state, VIX, overall direction]

### Sector Map

| Sector | ETF | Bias | Notes |
|--------|-----|------|-------|
[filled table from Step 1b]

---

## Strategy Activation

- **Positive BX entry:** [Active / Restricted / Paused] — [one-line reason]
- **Bearish Call Spread:** [Active / Restricted / Paused] — [one-line reason]

---

## All Positions

[Unified position table from Step 5a]

### Portfolio Balance
[Concentration flags and net bias from Steps 5b–5c]

---

## Positive BX entry picks

[Copy the top picks block from the positive-bx-entry report, or "None — [reason]"]

_Full report: `strategies/positive-bx-entry/report.md`_

---

## Bearish Call Spread Picks

[Copy the top picks block from the bearish-call-spread report, or "None — abstained"]

_Full report: `strategies/bearish-call-spread/report.md`_

---

## Open Trades (All Strategies)

### Positive BX entry
[Open trades table from positive-bx-entry trades-log.csv]

### Bearish Call Spread
[Open trades table from bearish-call-spread trades-log.csv — exclude ABSTAIN rows]
```

---

### Step 7 — Final Summary

```
=== MARKET OVERVIEW — [DATE] ===
Regime: [Label] | VIX: [level] | S&P 500: [above/below 200 MA]

Bullish sectors: [list]
Bearish sectors: [list]

STRATEGIES RUN:
  Positive BX entry: [Active / Restricted / Paused]
  Bearish Call Spread: [Active / Restricted / Paused]

POSITIONS:
  Longs ([N]): [TICKER, TICKER, …]
  Bear Spreads ([N]): [TICKER, TICKER, …]
  Net bias: [Bullish / Balanced / Bearish]

Portfolio flags: [concentration / skew warnings, or "none"]

Individual reports written to:
  strategies/positive-bx-entry/report.md
  strategies/bearish-call-spread/report.md
  strategies/overview/report.md
```
