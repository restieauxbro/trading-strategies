---
name: indicators
description: Tim's TradingView layout (saved chart) — THT Fair Value Bands, multi-timeframe BX (weekly pressure), and daily B-Xtrender with buy/sell signals. Use for bullish entry timing, extension vs value, and bearish spread confirmation whenever strategies open TradingView visuals.
---

# Tim's TradingView indicators (`chart/z25AhAlV`)

All **live** strategy chart review uses this **saved layout** in **headed Chrome** with profile **`Tim`** (login, saved indicators, and colors).

## Chart URL (plain ticker)

Open one symbol at a time (no exchange prefix unless TradingView fails to resolve):

```
https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER
```

Example: `https://www.tradingview.com/chart/z25AhAlV/?symbol=AMD`

Use **`browser-use`** per `.cursor/skills/browser-use/SKILL.md` with `--profile "Tim" --headed`. Allow the page to finish loading indicators before judging state.

## 1. THT Fair Value Bands (Simplified)

**Role:** Structural trend + **value anchor**.

- The band **colors with structure**: **green** = bullish structural regime; **red** = bearish structural regime.
- The layout also shows band levels (e.g. lower / middle / upper). Treat the **middle / fair-value zone** as the **magnet** for price over time: after a thrust, price often **mean-reverts toward fair value** rather than staying stretched.

**Bullish discipline (Positive BX entry):**

- Prefer **green** structural bands for long-bias entries aligned with the strategy.
- If price is **extended** (e.g. pressed against or beyond the upper stress side of the band) **without** a pullback toward fair value, treat as **no immediate entry** — **watchlist** only (note the trigger you are waiting for, e.g. dip into middle band / prior support).
- If bands are **red** (bearish structure) while a scanner still lists the name, **do not** treat as a clean bullish chart — downrank heavily or exclude for long entries.

**Bearish discipline (bear call spreads):**

- **Red** fair-value structure supports the bearish thesis; **green** structure with strong recovery into the bands is a warning.

## 2. THT Multi Timeframe BX (`1W` row — weekly buying/selling pressure)

**Role:** **Higher-timeframe pressure** (weekly row in the multi-timeframe strip).

- **Green** blocks → net **buying / bullish pressure** on that timeframe.
- **Red** blocks → net **selling / bearish pressure**.

The **Strong upward momentum** TrendSpider scan already requires **weekly B-Xtrender oscillator histogram > 0**, so the **weekly row will often already be green** when the symbol hits the scan. On the chart, **confirm** it still matches what you expect **on the latest bar** before scoring or logging.

For **bearish** trades, you want **weekly pressure red** or at least **not** a strong green tailwind; **green weekly + bullish fair value** is a major caution flag for new bear call spreads.

## 3. Daily B-Xtrender (@Puppytherapy)

**Role:** **Timing** — momentum histogram plus **buy / sell** signal dots.

- **Histogram above zero** (green) vs **below zero** (red) describes **short-term momentum direction**.
- **Buy / sell dots** mark **exhaustion / reversal-style signals** on the rhythm you have configured.

**Bullish (long / call structures):**

- Favour entries when daily momentum supports continuation **or** a **fresh buy-side signal** aligns with **price pulling back toward fair value** (not chasing vertical extensions).
- A **sell** signal or **heavy red histogram** on the **latest bar** while you are considering a **new** long is a **timing warning** — usually **watchlist**, not an immediate entry.

**Bearish (bear call spreads):**

- Favour **red histogram below zero** and **no fresh buy signal on the latest bar** (bounce / mean-reversion risk).
- **Green histogram above zero** and/or a **new buy dot** on the latest bar → **hard disqualifier** for **new** bear call recommendations (names may still appear on a bearish scan during bounces).

## Fresh screenshots (per strategy run)

Before capturing charts for a new run:

```bash
rm -f strategies/<strategy-name>/assets/tradingview-*.png
mkdir -p strategies/<strategy-name>/assets
```

Save screenshots as `strategies/<strategy-name>/assets/tradingview-<TICKER>.png` and embed only captures from **this** run in `report.md`.

## One-line checklist

| Context | Fair value bands | Weekly BX row | Daily B-Xtrender |
|--------|------------------|---------------|------------------|
| **Bullish entry** | Green structure; prefer pullback toward fair value, not chase | Green / supportive | Align with long timing; beware sell signal + extension |
| **Bearish spread** | Red structure helpful | Red or weak green | Red / below zero; no fresh buy on latest bar |

---

## Archived TrendSpider equivalent

Historical docs and scripts for TrendSpider fullscreen / symbol helpers live under **`.cursor/skills/archived/read-trendspider-chart/`**. Do **not** use them for current strategy workflows unless reproducing an old process.
