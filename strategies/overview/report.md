# Market Overview — 2026-04-14

---

## Market Regime: Mixed

**S&P 500 (SPY)** last ~**$679** vs **200-day SMA ~$661** (~**+2.7%** above) — broad index constructive vs long-term trend. **VIX** ~**19.9** — **moderate** (18–25 band): neither complacent nor stressed. Price is also above the **50-day SMA** (~$673). **Trend:** recovery / **uptilt** after early-April volatility; **sector leadership is split** (energy/industrial strength; financials/discretionary lagging), so the orchestrator label is **Mixed** rather than clean Risk-On or Risk-Off.

### Sector Map

| Sector | ETF | Bias | Notes |
|--------|-----|------|-------|
| Technology | XLK | ↑ Bullish | Above 50d & 200d (~+3.7% vs 200d) |
| Financials | XLF | ↓ Bearish | Below 200d (~−2.7%) |
| Energy | XLE | ↑ Bullish | Strong vs 200d (~+22%) |
| Healthcare | XLV | → Neutral | Below 50d, ~flat vs 200d |
| Industrials | XLI | ↑ Bullish | Above both MAs |
| Consumer Discretionary | XLY | ↓ Bearish | Below 50d & 200d |
| Consumer Staples | XLP | → Neutral | Below 50d, modestly above 200d |
| Materials | XLB | ↑ Bullish | Above both MAs |
| Utilities | XLU | ↑ Bullish | Above both MAs |
| Real Estate | XLRE | ↑ Bullish | Above both MAs |
| Communications | XLC | → Neutral | Slightly below 50d, ~flat vs 200d |

_Data: `scripts/yfinance_tools.py technicals` snapshots; unofficial._

---

## Strategy Activation

- **Positive BX entry:** **Active** — routing allowed full scan, but TrendSpider returned **zero** symbols; run completed with empty-scan CSV row and no new picks.
- **Bearish Call Spread:** **Restricted** — under **Mixed** rules, only **↓ Bearish** sectors (**XLF**, **XLY**); scan produced **CEG, ACN, VRTX, CRM** (Utilities / Tech / Healthcare) — **no eligible names** → **ABSTAIN** audit row only (no chart step on out-of-universe names).

---

## All Positions

| # | Strategy | Ticker | Direction | Sector | Score | Setup |
|---|----------|--------|-----------|--------|-------|-------|
| — | — | — | — | — | — | **No new unified picks this run** (empty momentum scan + bearish routing abstain). |

### Portfolio Balance

- **Sector concentration:** N/A (no new positions).
- **Directional skew:** No new longs or new bear spreads added today; **prior** open longs (AMD, ANET, STZ) and **prior** open bear-spread ideas remain in logs — book is **not** all one direction from *this* run alone.
- **Strategy imbalance:** **Regime-appropriate** — Mixed routing + empty/eligible-universe mismatch explains asymmetry; not treated as a data gap.

**Net portfolio bias (this run):** **No change** — no additions. Context remains **Mixed** with **bullish broad index** vs **select weak sectors** (financials, discretionary).

---

## Positive BX entry picks

**None** — TrendSpider **Strong upward momentum** returned **0** symbols (`2026-04-13 15:36 UTC`). Empty-scan row logged.

_Full report: `strategies/positive-bx-entry/report.md`_

---

## Bearish Call Spread Picks

**None — abstained** — scan had **CEG, ACN, VRTX, CRM**; **Mixed** regime requires **XLF / XLY** names only for new bear calls this session. One **`ABSTAIN`** row appended for audit.

_Full report: `strategies/bearish-call-spread/report.md`_

---

## Open Trades (All Strategies)

### Positive BX entry

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| 2026-04-12 | AMD | $243–$247 | $234 | $267 | $285 | 2.1:1 |
| 2026-04-12 | ANET | $145–$149 | $134 | $164 | $175 | 2.0:1 |
| 2026-04-12 | STZ | $164–$168 | $152 | $178 | $190 | 1.9:1 |

### Bearish Call Spread

_(Exclude `ABSTAIN`.)_

| Date | Ticker | Entry Price | Short Strike | Notes |
|------|--------|-------------|--------------|-------|
| 2026-03-27 | UNH | $268.05 | $330 … | Outcome not yet logged |
| 2026-03-27 | ORCL | $142.81 | $175 … | Outcome not yet logged |
| 2026-03-27 | META | $547.54 | $700 … | Outcome not yet logged |
| 2026-04-03 | ORCL | $146.03 | $170 … | Outcome not yet logged |
| 2026-04-03 | ADBE | $242.14 | $275 … | Outcome not yet logged |
| 2026-04-03 | META | $573.76 | $680 … | Outcome not yet logged |
