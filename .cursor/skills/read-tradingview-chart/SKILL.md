---
name: read-tradingview-chart
description: Optional supplement — same saved TradingView chart as strategies use. Canonical indicator docs live in `.cursor/skills/indicators/SKILL.md`; load that skill for fair value bands, weekly BX, and daily B-Xtrender rules.
allowed-tools: Bash(browser-use:*)
---

# Read TradingView Chart — optional supplement

**Primary:** `.cursor/skills/indicators/SKILL.md` — defines **Fair Value Bands**, **weekly BX row**, **daily B-Xtrender**, URL pattern, screenshots, and bullish/bearish checklists.

This file adds **browser-use** mechanics if you need extra detail. The layout is **`chart/z25AhAlV`** with indicators already saved; the agent does not add studies.

## Prerequisites

- `browser-use` installed (`browser-use doctor`). See `.cursor/skills/browser-use/SKILL.md` for CLI details.
- A **Chrome profile named `Tim`** available to browser-use (`browser-use profile list` if connection fails).
- **Headed** mode is required so you can visually confirm dots, colours, and histogram state.

## Base URL and symbol

**Layout (fixed):**

```text
https://www.tradingview.com/chart/z25AhAlV/?symbol=
```

**Default (repo convention):** plain ticker — `https://www.tradingview.com/chart/z25AhAlV/?symbol=AMD`

If TradingView resolves the wrong listing, switch to an exchange-qualified id (URL-encoded), e.g. `NYSE%3AORCL` or `NASDAQ%3AMU`.

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
browser-use --profile "Tim" --headed open "https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER"
```

4. Wait for the layout to finish loading (charts + indicator panes visible). Use `browser-use wait` / `browser-use state` / a short pause as needed; TradingView can be slow.
5. Capture evidence for the report: `browser-use screenshot` to a path under the repo (e.g. `strategies/<strategy>/assets/tradingview-SYMBOL.png`) **or** describe clearly what you see on the **current** rightmost candle / latest bar.

Use `browser-use state` to see structure; **indicator interpretation is visual** — rely on headed browser + screenshot + honest description.

## What to read (bearish / bullish)

Use the checklists in **`.cursor/skills/indicators/SKILL.md`** (Fair Value Bands, weekly BX row, daily B-Xtrender). This file does not duplicate them.

**Optional:** If your layout still includes **VTO**, you may note sell/buy dots the same way as before; current **bearish-call-spread** `AGENT.md` keys off **indicators** skill criteria, not VTO.

Never fabricate indicator states. If a pane is missing or the UI is ambiguous, say **unconfirmed**.

## Cleanup

When finished with all symbols:

```bash
browser-use close
```

## Output snippet (paste into strategy report / ticker notes)

For each symbol checked:

```text
TradingView (TICKER): Fair value [green/red structure — brief]. Weekly BX row [green/red — brief]. Daily B-Xtrender [histogram / buy-sell — brief]. Screenshot: [path or "none"]. Chart confirm: [full / partial / none / unable].
```
