---
name: read-tradingview-chart
description: Opens a saved TradingView layout in a headed Chrome session and interprets the VTO and B-Xtrender indicators for bearish confirmation. Use when confirming chart signals after shortlisting tickers (e.g. bearish call spread top picks), or when the user asks to verify TradingView indicators on the shared layout.
allowed-tools: Bash(browser-use:*)
---

# Read TradingView Chart (VTO + B-Xtrender)

This skill assumes the workspace uses a **fixed saved chart layout** on TradingView with **VTO** and **B-Xtrender** (@Puppytherapy) already on the chart. The agent does not add indicators; it opens the layout and reads what is on screen.

## Prerequisites

- `browser-use` installed (`browser-use doctor`). See `.cursor/skills/browser-use/SKILL.md` for CLI details.
- A **Chrome profile named `Tim`** available to browser-use (`browser-use profile list` if connection fails).
- **Headed** mode is required so you can visually confirm dots, colours, and histogram state.

## Base URL and symbol

**Layout (fixed):**

```text
https://www.tradingview.com/chart/z25AhAlV/?symbol=
```

Append the **TradingView symbol id** after `symbol=` (URL-encoded if needed). Examples:

- `NYSE:ORCL` → `https://www.tradingview.com/chart/z25AhAlV/?symbol=NYSE%3AORCL`
- `NASDAQ:MU` → `https://www.tradingview.com/chart/z25AhAlV/?symbol=NASDAQ%3AMU`

Use the correct exchange prefix for each ticker (US large caps: typically `NYSE:` or `NASDAQ:`). If the page loads the wrong instrument, fix the prefix and reopen.

## Fresh scan — remove stale screenshots first

On each **new** strategy run (fresh scan), **before** capturing any new TradingView screenshots, delete existing captures for that strategy so reports and disk state never mix images from a prior run.

- **Files to remove:** `strategies/<strategy-name>/assets/tradingview-*.png`
- **Example (bearish call spread):**

```bash
rm -f strategies/bearish-call-spread/assets/tradingview-*.png
```

If `assets/` is empty afterward, that is fine; run `mkdir -p strategies/<strategy-name>/assets` before the first `browser-use screenshot` if the directory no longer exists.

When overwriting `report.md`, embed only paths to screenshots created **in this run** after the cleanup.

## Session setup (every run)

1. Close any stale session if needed: `browser-use close` (optional).
2. **Before the first chart `open` in a new scan run:** complete **Fresh scan — remove stale screenshots first** (delete old `tradingview-*.png` for that strategy). Do not skip when you will save new screenshots this session.
3. Open the chart in **headed** Chrome with profile **Tim**:

```bash
browser-use --profile "Tim" --headed open "https://www.tradingview.com/chart/z25AhAlV/?symbol=EXCHANGE%3ATICKER"
```

4. Wait for the layout to finish loading (charts + indicator panes visible). Use `browser-use wait` / `browser-use state` / a short pause as needed; TradingView can be slow.
5. Capture evidence for the report: `browser-use screenshot` to a path under the repo (e.g. `strategies/<strategy>/assets/tradingview-SYMBOL.png`) **or** describe clearly what you see on the **current** rightmost candle / latest bar.

Use `browser-use state` to see structure; **indicator interpretation is visual** — rely on headed browser + screenshot + honest description.

## What to read (bearish confirmation)

### VTO

- Locate the **VTO** pane (label typically includes `VTO` and parameter numbers).
- **Bearish confirmation:** a **red dot** on the VTO line/signal associated with a **sell** signal (the “sell” dot on VTO). Treat this as: *VTO is showing a sell / bearish flip on the latest bar or immediately prior bar* — match what you see to that convention on **this** layout.
- If the latest bar shows only green/neutral dots or no sell dot, record **VTO: not confirming sell** (do not invent a red dot).

### B-Xtrender (@Puppytherapy)

- Locate the **B-Xtrender** pane (often titled `B-Xtrender` / `@Puppytherapy`).
- **Bearish confirmation:** histogram in **bearish territory** — i.e. **red** bars **below** the zero line (momentum flipped negative). A **small red bar** on the far right after a green run is the typical “just flipped bearish” pattern.
- If the last bar is still green above zero, record **B-Xtrender: still bullish territory** (not confirming).

## Interpreting results

| VTO sell (red dot) | B-Xtrender bearish (red below zero) | Summary |
| ------------------ | ----------------------------------- | ------- |
| Yes                | Yes                                 | **Chart confirms** bearish alignment for this layout. |
| No                 | Yes                                 | **Partial** — note VTO missing sell. |
| Yes                | No                                  | **Partial** — note B-Xtrender not in bearish territory. |
| No                 | No                                  | **Does not confirm** — flag strongly for bearish structures. |

Never fabricate indicator states. If the pane is hidden, the symbol failed to load, or the UI is ambiguous, say so and treat as **unconfirmed**.

## Cleanup

When finished with all symbols:

```bash
browser-use close
```

## Output snippet (paste into strategy report / ticker notes)

For each symbol checked:

```text
TradingView ([EXCHANGE:TICKER]): VTO [sell dot yes/no — brief]. B-Xtrender [bearish red below zero yes/no — brief]. Screenshot: [path or "none"]. Chart confirm: [full / partial / none / unable to assess].
```
