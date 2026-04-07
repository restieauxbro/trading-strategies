---
name: read-trendspider-chart
description: Opens TrendSpider charts in headed Chrome (profile Tim) with VTO and B-Xtrender buy/sell signals, toggles chart fullscreen for screenshots, and documents bearish confirmation rules. Use for bearish call spread visual confirmation or when verifying B-Xtrender on TrendSpider instead of TradingView.
allowed-tools: Bash(browser-use:*)
---

# Read TrendSpider Chart (VTO + B-Xtrender)

Use **[TrendSpider](https://charts.trendspider.com/)** for visual confirmation when you need **B-Xtrender buy/sell signals** as shown on that platform. The agent does not rebuild the layout; it uses your **saved workspace** (login + chart) in Chrome.

## Prerequisites

- `browser-use` installed (`browser-use doctor`). See `.cursor/skills/browser-use/SKILL.md`.
- **Mandatory — Chrome profile `Tim`:** Every chart session for this skill must use **`browser-use --profile "Tim"`** so your **TrendSpider login**, saved charts, and indicators load. Do **not** use default headless Chromium without `Tim` — you will hit the public login page and miss your layout.
- **Headed** mode is required (`--headed`) so you can verify buy/sell dots, histogram state, and screenshots.
- **`Chart workspace URL`** in `strategies/bearish-call-spread/config.md` (or the URL you open after navigating inside TrendSpider) must point at a chart that already includes **VTO** and **B-Xtrender** with the signals you rely on.

## Fullscreen helper (Python)

After the chart is visible, **maximize the chart** so indicators are easier to read in screenshots. The script clicks TrendSpider’s **“Toggle maximize this chart”** control (`button.chart-fullscreen-button`).

**Path:** `.cursor/skills/read-trendspider-chart/maximize_chart.py`

**Typical flow (profile Tim is default inside the script’s `--open-url` path):**

```bash
# 1) Open your workspace (replace URL with value from config.md or your saved chart)
browser-use --profile "Tim" --headed open "https://charts.trendspider.com/YOUR_WORKSPACE_OR_CHART_PATH"

# 2) Wait for chart + indicators to load, then toggle fullscreen
browser-use wait selector "button.chart-fullscreen-button" --timeout 60000

python3 .cursor/skills/read-trendspider-chart/maximize_chart.py
```

**One-shot (open + sleep + click) — still uses profile `Tim` by default:**

```bash
python3 .cursor/skills/read-trendspider-chart/maximize_chart.py --headed --open-url "https://charts.trendspider.com/YOUR_CHART_URL"
```

Override profile only if needed:

```bash
python3 .cursor/skills/read-trendspider-chart/maximize_chart.py --profile "Tim" --headed --open-url "https://charts.trendspider.com/..."
```

**Equivalent raw eval** (same session as step 1 — must already be on the chart page):

```bash
browser-use eval '(() => { const b = document.querySelector("button.chart-fullscreen-button"); return b ? (b.click(), "clicked") : "not_found"; })()'
```

If the result is `not_found`, you are **not on an active chart workspace** yet. Common cases:

1. **Login page** — ensure you used `--profile "Tim"` so cookies apply; sign in if needed.
2. **Workspace hub** (“Open a workspace of yours”, list of Main View / Dashboard tiles) — the fullscreen button exists **only after** a workspace is open. Open **Default Workspace** or your chart from the hub (click the workspace card), **or** navigate directly to your **Chart workspace URL** from `config.md`. Wait for a chart title like `SYMBOL: … — TrendSpider […]`.
3. **DOM changed** — use `browser-use state` or re-inspect `button.chart-fullscreen-button` in DevTools.

**Verified flow:** `browser-use --profile "Tim" --headed open "https://charts.trendspider.com/"` → open a workspace → `python3 .cursor/skills/read-trendspider-chart/maximize_chart.py` → expect `result: {'ok': True, 'selector': 'button.chart-fullscreen-button'}`.

## Symbol search helper (Python)

Switch the active chart to another ticker using the **top-left symbol field** (see [Symbol search and lookup](https://help.trendspider.com/kb/charting/symbol-search-and-lookup)). The script focuses the MUI input that carries **`MuiInputBase-inputAdornedEnd`**, selects all, types the symbol, presses **Enter**, then waits briefly and prints `browser-use get title` so you can confirm the window title shows `TICKER: …`.

**Path:** `.cursor/skills/read-trendspider-chart/set_symbol.py`

**Typical flow** (same headed session as above; must already be on a chart, not the workspace hub):

```bash
python3 .cursor/skills/read-trendspider-chart/set_symbol.py ORCL
python3 .cursor/skills/read-trendspider-chart/set_symbol.py AMZN --settle-ms 5000
```

If **select-all** does not clear the field on your Mac, try:

```bash
python3 .cursor/skills/read-trendspider-chart/set_symbol.py ORCL --select-all "Meta+a"
```

**Raw eval** (focus only — then `browser-use keys` / `type` yourself):

```bash
browser-use eval '(() => { const el = document.querySelector("input.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd"); if (!el) return "not_found"; el.focus(); el.select(); return el.value; })()'
```

If you see `not_found`, you are not on a live chart workspace yet (same cases as fullscreen `not_found` above).

## Fresh scan — remove stale screenshots first

Before new captures for a strategy run:

```bash
rm -f strategies/<strategy-name>/assets/trendspider-*.png
mkdir -p strategies/<strategy-name>/assets
```

Embed only `assets/trendspider-<TICKER>.png` from **this** run in `report.md`.

## Session setup (every run)

1. Optional: `browser-use close` if a stale session causes wrong profile.
2. Delete old `trendspider-*.png` for that strategy (above).
3. **Open chart with profile Tim (required):**

```bash
browser-use --profile "Tim" --headed open "CHART_OR_WORKSPACE_URL_FROM_CONFIG"
```

4. Load the **correct symbol** in TrendSpider: **`set_symbol.py TICKER`** (recommended after workspace is open), or watchlist / manual symbol search / deep link.
5. Run **maximize_chart.py** (or `browser-use eval` above) once the chart toolbar is present.
6. `browser-use screenshot strategies/<strategy>/assets/trendspider-SYMBOL.png`

## Reading the B-Xtrender

The indicator has four painted layers. Read them together.

### Layer 1 — Background trend (thin "shadow" bars, 15% opacity)

This is the **long-term trend**: RSI of EMA(close, 20) minus 50. It forms faint, thin bars behind everything else — the "barcode" shadow.

| Color | Meaning |
|-------|---------|
| Bright green (`#00ff00`) | Long-term trend bullish **and accelerating** |
| Dark green (`#228B22`) | Long-term trend bullish but **weakening** |
| Bright red (`#ff0000`) | Long-term trend bearish but **recovering** (momentum fading) |
| Dark red (`#8B0000`) | Long-term trend bearish **and accelerating** |

### Layer 2 — Foreground oscillator (thick columns, 60% opacity)

This is the **short-term oscillator**: RSI of (EMA(close,5) − EMA(close,20)) minus 50. The main histogram you read bar-to-bar.

Same colour logic as the background:

| Color | Meaning |
|-------|---------|
| Bright green | Short-term bullish and **accelerating** |
| Dark green | Short-term bullish but **decelerating** |
| Bright red | Short-term bearish but **recovering** |
| Dark red | Short-term bearish and **accelerating** |

Above zero = net bullish momentum. Below zero = net bearish momentum.

### Layer 3 — Signal line (T3-smoothed, with black shadow outline)

A T3-smoothed version of the short-term oscillator. Painted as a **thick black line** (the "shadow") with a **thinner coloured line** on top:

- **Green signal line** — signal line is rising (bullish pressure)
- **Red signal line** — signal line is falling (bearish pressure)

The black shadow outline is purely cosmetic (makes the line visible against histogram bars).

### Layer 4 — Turning point dots

Dots appear when the **signal line reverses direction** (local minimum or maximum):

- **Green dot** — signal line has turned up (bullish reversal of the smoothed line)
- **Red dot** — signal line has turned down (bearish reversal of the smoothed line)

These are the most actionable signals — a dot marks the moment momentum flips.

### How to identify the last dot correctly

**Always identify the rightmost dot explicitly before drawing any conclusion.**

Step-by-step dot check:
1. Scan the B-Xtrender panel from right to left — the first dot you hit is the most recent one
2. State its color explicitly: "Last dot is GREEN" or "Last dot is RED" — never assume
3. Cross-check with signal line direction on the current bar:
   - Signal line currently FALLING → consistent with red dot (peaked and turned down)
   - Signal line currently RISING → consistent with green dot (troughed and turned up)
   - If the dot and signal line direction conflict, the dot may be from an earlier bar — look more carefully

**Common misread:** a chart zoomed out can make green and red dots look similar in color, especially at low resolution. If unsure, note it as "dot color unclear" and do not award or deduct points — treat as unverified.

**Context matters — WHERE the dot printed relative to zero:**
- A green dot that prints while the histogram is ABOVE zero (signal line declining from a bullish peak) is a **weakening bullish** signal, not a fresh entry trigger. This is equivalent to a setup that has peaked.
- A green dot that prints while the histogram is BELOW zero (signal line rising from a bearish trough) is a **recovery signal** — this is the momentum-pullback entry trigger.
- A red dot that prints while the histogram is ABOVE zero indicates the bullish momentum has peaked and selling is starting — the stock has likely just topped.
- A red dot that prints while the histogram is BELOW zero indicates the bearish momentum is re-accelerating after a brief pause — continued downside likely.

**For momentum-pullback entries specifically:** you need a green dot printed at the BOTTOM of a below-zero histogram cycle, not at a declining phase from above zero. Always note where the histogram was when the dot printed.

---

## Reading all layers together

**Strongest bearish setup:**
- Background bars: dark red (long-term trend bearish and accelerating)
- Foreground histogram: below zero, dark red or turning dark
- Signal line: red and falling
- Red dot just printed (signal line turned down)

**Bearish but weakening (potential reversal risk):**
- Histogram below zero but turning bright red (momentum of the downtrend slowing)
- Signal line red but flattening
- Green dot printed → **high risk for new bear positions**

**Strongest bullish setup (disqualifies bearish trades):**
- Background bars: bright or dark green
- Histogram: above zero and green
- Signal line: green and rising
- Green dot just printed

**Zero-line crossovers** on the histogram or signal line are significant — a cross from below to above zero is a bullish shift, above to below is bearish.

---

## What to read (bullish confirmation — momentum-pullback)

For momentum-pullback entries, confirm ALL of the following before awarding B-Xtrender points or approving an entry:

- [ ] **Last dot color:** explicitly identify — must be **GREEN** (signal line turned UP from a trough)
- [ ] **Histogram level when dot printed:** must be **below zero** or crossing back above — confirms the green dot is a recovery signal, not a fading-bullish-peak signal
- [ ] **Current histogram direction:** recovering toward zero (bright red brightening, or crossing back above) — dark red and falling means the pullback is still accelerating
- [ ] **Signal line direction now:** rising or flat — falling signal line contradicts a recent green dot
- [ ] **Background bars:** green — long-term trend still bullish despite the pullback

**Fail any of these → do not confirm bullish entry. State which check failed.**

If the last dot is RED (signal line turned down from a peak), apply the −6 deduction and note the setup as "watching — green dot not yet printed." Do not award the +7 green dot bonus.

---

## What to read (bearish confirmation)

Align with `strategies/bearish-call-spread/AGENT.md`. On TrendSpider, **use the platform’s B-Xtrender layers** to confirm:

### VTO

- **Bearish confirmation:** **sell** (red) signal on the latest bar.
- If only **buy** / neutral shows, **VTO is not confirming sell**.

### B-Xtrender bearish checklist

- [ ] Background shadow bars: red (long-term trend bearish)
- [ ] Foreground histogram: below zero, dark red preferred (accelerating)
- [ ] Signal line: red and falling
- [ ] No green dot on latest bars (if green dot just printed → bounce risk, disqualify or wait)

**Hard disqualifier:** green dot printed, histogram crossing above zero, or signal line turning green → do not open new bear call positions.

## Interpreting results

| VTO sell | B-Xtrender bearish (no green dot, histogram below zero) | Summary |
| -------- | ------------------------------------------------------- | ------- |
| Yes      | Yes                                                     | **Chart confirms** |
| No       | Yes                                                     | **Partial** |
| Yes      | No                                                      | **Partial** |
| No       | No                                                      | **Does not confirm** |

Never fabricate indicator states.

## Cleanup

```bash
browser-use close
```

## Output snippet (paste into report)

```text
TrendSpider ([SYMBOL]): VTO [sell yes/no]. B-Xtrender [bearish / green buy yes/no — brief]. Fullscreen: [used maximize_chart.py / eval / n/a]. Screenshot: [path]. Chart confirm: [full / partial / none / unable].
```

## TradingView (legacy)

If you must use the old TradingView layout instead, use `.cursor/skills/read-tradingview-chart/SKILL.md` — still with **`--profile "Tim"`** for consistency.
