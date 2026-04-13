# Bearish Call Spread — Current Report

*Last updated: 2026-04-14*

---

## Market Context

**SPY** ~~$679 vs **200-day SMA ~$661** (~~+2.7%) — index back above long-term trend. **VIX** ~**19.9** (moderate). Tape has **rebounded** from early-April stress; bear call spreads need **hard resistance** and **chart-confirmed** bearish timing. **Orchestrator regime:** **Mixed** — for this strategy, routing limited new ideas to **↓ Bearish sectors (XLF, XLY)** only; today’s TrendSpider list did not contain names in that subset.

---

## Outcomes Recorded Today

**6 trades** at the ~14-day mark (rows dated **2026-03-31** and **2026-04-01**) — all **WIN** (spot still **below** short-call reference strike at check date **2026-04-14**; yfinance snapshot prices).


| Date       | Ticker | Entry   | Short ref | Price at check | % Move  | Result |
| ---------- | ------ | ------- | --------- | -------------- | ------- | ------ |
| 2026-03-31 | ORCL   | $137.78 | $170      | $150.35        | +9.11%  | WIN    |
| 2026-03-31 | ADBE   | $240.04 | $285      | $234.71        | −2.22%  | WIN    |
| 2026-03-31 | CRM    | $183.68 | $220      | $171.88        | −6.42%  | WIN    |
| 2026-04-01 | UNH    | $274.22 | $330      | $307.01        | +11.96% | WIN    |
| 2026-04-01 | ORCL   | $145.73 | $175      | $150.35        | +3.17%  | WIN    |
| 2026-04-01 | META   | $580.59 | $700      | $626.86        | +7.97%  | WIN    |


*Unofficial prices via yfinance; confirm in your broker.*

---

## Today's Top Picks

### Abstention — no new bear call spreads

**TrendSpider** `Bearish Case Market Scanner` (`2026-04-13 15:37 UTC`) returned **CEG, ACN, VRTX, CRM**. Under **Mixed** regime routing for this orchestrator run, the bearish strategy was restricted to **Financials (XLF)** and **Consumer Discretionary (XLY)** only — **none** of the scan names fall in those sectors (CEG ≈ Utilities; ACN/CRM/VRTX = Tech / Healthcare). **No Step 7 TradingView confirmation** was performed on ineligible names.

One `**ABSTAIN`** audit row was appended to `trades-log.csv`.

---

## Open Trades

*Exclude `ABSTAIN` and `VOID` rows.*


| Date       | Ticker | Entry Price | Short Strike | Setup Summary                    |
| ---------- | ------ | ----------- | ------------ | -------------------------------- |
| 2026-03-27 | UNH    | $268.05     | $330 – …     | Short $330/$350 … May 15 ~49 DTE |
| 2026-03-27 | ORCL   | $142.81     | $175 – …     | Short $175/$190 … May 15 ~49 DTE |
| 2026-03-27 | META   | $547.54     | $700 – …     | Short $700/$730 … May 15 ~49 DTE |
| 2026-04-03 | ORCL   | $146.03     | $170 – …     | Short $170/$185 … May 15 ~42 DTE |
| 2026-04-03 | ADBE   | $242.14     | $275 – …     | Short $275/$290 … May 15 ~42 DTE |
| 2026-04-03 | META   | $573.76     | $680 – …     | Short $680/$700 … May 15 ~42 DTE |


---

## Performance Summary

*Closed rows (`outcome_result` WIN/LOSS) — bear call breach rule at ~14 days.*

Aggregate from log: **30** closed checks recorded as **WIN**, **0** as **LOSS** (verify by re-reading CSV as new rows are appended).

*Full history: `strategies/bearish-call-spread/trades-log.csv`.*