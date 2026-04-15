# Market Overview — 2026-04-14

---

## Market Regime: Mixed

**SPY** last **~$689.76** vs **200-day SMA ~$661.80** (**~+4.2%** above) and above the **50-day** — broad index **constructive**. **VIX ~18.26** is **low–moderate** (borderline vs a strict **&lt;18** “low” label). **Trend:** **uptilt** / recovery tone at the index; **sector dispersion** remains (e.g. **financials** under the 200-day, **tech** and **cyclicals** strong), so the orchestrator label stays **Mixed** rather than pure **Risk-On** (which would want VIX comfortably **&lt;18** and unanimous sector risk appetite).

_Unofficial: `scripts/yfinance_tools.py technicals` / `summary`; verify in your platform._

### Sector Map

| Sector | ETF | Bias | Notes |
|--------|-----|------|-------|
| Technology | XLK | ↑ Bullish | ~+5.7% vs 200d; above 50d |
| Financials | XLF | ↓ Bearish | ~−1.2% vs 200d |
| Energy | XLE | → Neutral | Strong vs 200d (~+19%); **below** 50d (~−0.8%) — chop |
| Healthcare | XLV | → Neutral | Above 200d (~+2%); **below** 50d (~−2%) |
| Industrials | XLI | ↑ Bullish | ~+10% vs 200d |
| Consumer Discretionary | XLY | ↓ Bearish | Slightly **below** 200d (~−0.3%) |
| Consumer Staples | XLP | → Neutral | Above 200d; **below** 50d |
| Materials | XLB | ↑ Bullish | ~+12.7% vs 200d |
| Utilities | XLU | ↑ Bullish | ~+6.5% vs 200d |
| Real Estate | XLRE | ↑ Bullish | ~+4.9% vs 200d |
| Communications | XLC | ↑ Bullish | ~+2.1% vs 200d; modest vs 50d |

---

## Strategy Activation

- **Positive BX entry:** **Active** (Mixed routing: **↑ Bullish sectors only** — redundant when scan is empty). **TrendSpider** `Strong upward momentum` returned **0 symbols** at **2026-04-14 13:47 UTC** → empty-scan CSV append; **no** new longs.
- **Bearish Selector:** **Restricted** (Mixed: **↓ Bearish sectors only** — **XLF**, **XLY**). Fresh scan (**2026-04-14 13:48 UTC**) returned **ACN**, **VRTX** — **not** in allowed sectors → **`ABSTAIN`** audit row only (**no** TradingView Step 7 on out-of-routing names).

---

## All Positions

| # | Strategy | Ticker | Direction | Sector | Score | Setup |
|---|----------|--------|-----------|--------|-------|-------|
| — | — | — | — | — | — | **No new unified picks this run** (empty momentum scan + bearish routing abstain). |

### Portfolio Balance

- **Sector concentration:** N/A (no new positions).
- **Directional skew:** No new longs or bear spreads added **today**; **legacy** open longs (**AMD**, **ANET**, **STZ**) and **legacy** open bear spreads (**ORCL**, **ADBE**, **META** from **2026-04-03**) remain in logs.
- **Strategy imbalance:** **Regime-appropriate** — Mixed sector split + empty / ineligible scan output explains asymmetry.

**Net portfolio bias (this run):** **No new directional adds** — context **Mixed** with **strong index** vs **weak/discretionary and financials**.

---

## Positive BX entry picks

**None** — TrendSpider **Strong upward momentum** returned **0** symbols (`2026-04-14 13:47 UTC`). Empty-scan row appended to CSV.

_Full report: `strategies/positive-bx-entry/report.md`_

---

## Bearish Selector Picks

**None — abstained.** Scan returned **ACN** (Technology) and **VRTX** (Healthcare); **Mixed** routing allows **only XLF / XLY** bearish-sector names → **no eligible tickers**. One **`ABSTAIN`** row appended.

_Full report: `strategies/bearish-call-spread/report.md`_

---

## Open Trades (All Strategies)

### Positive BX entry

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| 2026-04-12 | AMD | $243–$247 | $234 – below recent swing / support | $267 – year-high approach | $285 – measured extension | 2.1:1 |
| 2026-04-12 | ANET | $145–$149 | $134 – below 50d MA / swing cluster | $164 – prior highs | $175 – extension | 2.0:1 |
| 2026-04-12 | STZ | $164–$168 | $152 – below breakout base / MA support | $178 – upper fair value / resistance | $190 – broader resistance | 1.9:1 |

### Bearish Selector

| Date | Ticker | Entry Price | Short Strike | Setup Summary |
|------|--------|-------------|----------------|---------------|
| 2026-04-03 | ORCL | $146.03 | $170 – … | Short $170/$185 … May 15 ~42 DTE |
| 2026-04-03 | ADBE | $242.14 | $275 – … | Short $275/$290 … May 15 ~42 DTE |
| 2026-04-03 | META | $573.76 | $680 – … | Short $680/$700 … May 15 ~42 DTE |

_(Excludes `ABSTAIN` / `VOID` rows.)_
