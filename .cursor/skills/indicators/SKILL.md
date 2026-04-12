---
name: indicators
description: Tim's TradingView layout (chart/z25AhAlV) — Fair Value Bands, weekly BX, daily B-Xtrender. Capture with browser-use profile Tim (headed). Prefer a multimodal vision handoff + JSON schema to read screenshots; do not rely on lossy image-to-text summaries alone.
---

# Tim's TradingView indicators (`chart/z25AhAlV`)

## Mandatory: `browser-use` + Chrome profile **`Tim`** (headed)

Your **TradingView session**, **saved chart** `z25AhAlV`, and **custom indicators** (Fair Value Bands, THT Multi Timeframe BX, B-Xtrender) live under your **real Chrome user data**. Agents **must** drive that session — otherwise the page is logged out, the wrong layout loads, or paid/scripts do not appear.

| Required | Details |
| -------- | ------- |
| **Tooling** | **`browser-use` CLI** only for TradingView chart verification in strategy runs. See `.cursor/skills/browser-use/SKILL.md`. |
| **Profile** | **`--profile "Tim"`** — same as TrendSpider scans. |
| **Mode** | **`--headed`** — visible window so you can confirm dots, histograms, and band colors. |

**Do not use** MCP Puppeteer, raw Playwright without your profile, `browser-use open` **without** `--profile "Tim"`, or default **headless** Chromium for **Step 4b / bearish Step 7** chart confirmation. Those paths will **not** have your login or saved layout; indicator state read from them is **invalid** for logging picks.

**Typical flow (one symbol):**

```bash
browser-use --profile "Tim" --headed open "https://www.tradingview.com/chart/z25AhAlV/?symbol=AMD"
# Wait for chart + panes to load, then e.g.:
browser-use screenshot strategies/positive-bx-entry/assets/tradingview-AMD.png
```

Switch symbol by opening the next URL in the **same** session, or use your usual TradingView symbol flow after the first load. Close when done: `browser-use close`.

---

## Chart URL (plain ticker)

Open one symbol at a time (no exchange prefix unless TradingView fails to resolve):

```
https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER
```

Example: `https://www.tradingview.com/chart/z25AhAlV/?symbol=AMD`

Allow the page to finish loading indicators before judging state.

---

## Reading screenshots — multimodal handoff (recommended)

### Why not rely on “image description” alone?

When an agent uses a **file read** tool on a PNG, the pipeline often supplies a **text summary** of the image, not true pixel-level reasoning in the same step. Those summaries are **lossy** and have misread **latest-bar** color on B-Xtrender (e.g. ROST). **Do not** treat that prose as authoritative for bar-accurate decisions.

### Better approach: explicit **visual** pass

**Yes — hand off to a vision-capable step** whenever chart state affects scoring or CSV picks:

1. **Capture** the screenshot with `browser-use` (profile **Tim**) as today.
2. **Second step:** Send the **image file** to a **multimodal** model (or a dedicated “visual” sub-agent) that accepts **images as input**, not a pre-digested caption. In Cursor, that often means: **attach the PNG in a follow-up** to a **vision-enabled** model, or run a small script that calls a **Vision API** (OpenAI / Anthropic / Gemini) with the file bytes.
3. Force **structured output** (JSON), not free-form prose — see schema below.
4. The **strategy agent** merges that JSON into scoring. If any field is **`unclear`**, do **not** award chart-dependent points; say so in the report.

### JSON schema (paste into the vision prompt)

Ask the vision model to output **only** valid JSON:

```json
{
  "ticker": "ROST",
  "image_path": "strategies/<strategy>/assets/tradingview-ROST.png",
  "fair_value_structure": "green|red|unclear",
  "price_vs_lower_band_fair_value": "below|near|above|unclear",
  "price_vs_middle_band_premium": "below|near|above|unclear",
  "price_vs_upper_band_stress": "below|near|above|unclear",
  "weekly_bx_row_latest": "green|red|unclear",
  "weekly_bx_numeric_if_visible": null,
  "daily_bxtrender_histogram_latest_bar": "green_above_zero|red_below_zero|unclear",
  "daily_bxtrender_buy_sell_latest_bar": "buy_dot|sell_dot|none_visible|unclear",
  "notes": "one short sentence if something blocks reading (scale, UI, glare)"
}
```

**Instructions to give the vision model:** “**THT Fair Value Bands:** the **lowest** band line is **fair value**; the **middle** line is **slight extension / premium** (not core fair value); the **upper** line is **stress / strong extension**. Compare the last candle to each. Look at the **rightmost** daily candle and the **rightmost** segment of each indicator pane. If you cannot see the last bar clearly, set fields to `unclear`.”

### Optional: local automation

For repeatable runs, a **`scripts/chart_read_vision.py`** (or similar) that POSTs each `tradingview-*.png` to your chosen Vision API + writes `assets/chart-read-<TICKER>.json` keeps the main agent text-only and avoids caption drift. (Add such a script only when you are ready to store API keys in env — not required for the handoff pattern above.)

## 1. THT Fair Value Bands (Simplified)

**Role:** Structural trend + **where “value” lives on the bands**.

- The band **colors with structure**: **green** = bullish structural regime; **red** = bearish structural regime.
- **Three lines — correct interpretation (Tim’s layout):**
  - **Lower band** = **fair value** (the core value anchor). Mean reversion after a thrust often **pulls back toward this zone**, not toward the middle.
  - **Middle band** = **slight extension into premium** (price has already left “pure” fair value; still often tradable but not the same as “at value”).
  - **Upper band** = **strong extension / stress** (chase risk if entering long without a plan).

**Bullish discipline (Positive BX entry):**

- Prefer **green** structural bands for long-bias entries aligned with the strategy.
- **Ideal value context:** price **near or returning toward the lower (fair value) band** — or a clear path to get there on a pullback — rather than buying **into** the upper band or extended spikes without a dip.
- If price is **stretched into the upper band** (or hugging it) **without** a pullback toward **fair value (lower band)**, treat as **no immediate entry** — **watchlist** only (note trigger: e.g. dip toward **lower** band / support).
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

- Favour entries when daily momentum supports continuation **or** a **fresh buy-side signal** aligns with **price pulling back toward the lower fair value band** (not chasing vertical extensions into the upper band).
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
| **Bullish entry** | Green structure; prefer pullback toward **lower band (fair value)**; middle = premium, upper = stress | Green / supportive | Align with long timing; beware sell signal + extension |
| **Bearish spread** | Red structure helpful | Red or weak green | Red / below zero; no fresh buy on latest bar |

---

## Archived TrendSpider equivalent

Historical docs and scripts for TrendSpider fullscreen / symbol helpers live under **`.cursor/skills/archived/read-trendspider-chart/`**. Do **not** use them for current strategy workflows unless reproducing an old process.
