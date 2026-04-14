# Bearish Call Spread — Current Report

_Last updated: 2026-04-14_

---

## Market Context

**SPY** last **~$689.76** vs **200-day SMA ~$661.80** (**~+4.2%**) — index **above** long-term trend. **VIX ~18.26** is **low–moderate** (borderline vs a strict &lt;18 “complacent” read). Tape is **risk-on leaning** at the index level; **bear call spreads** still need **hard resistance** and **chart-confirmed** bearish timing. **Orchestrator regime:** **Mixed** — routing limits **new** bearish ideas to **↓ Bearish sectors** (**XLF** Financials, **XLY** Consumer Discretionary) only.

_Unofficial: `scripts/yfinance_tools.py`; confirm in your broker._

---

## Outcomes Recorded Today

**3 overdue rows** (dated **2026-03-27**, previously missing outcomes) were closed at **2026-04-14** using the strategy breach rule (spot vs numeric short reference **$330 / $175 / $700**). All **WIN** (price still **below** short strike at check).

| Date | Ticker | Entry | Short ref | Price at check | % Move | Result |
|------|--------|-------|-----------|----------------|--------|--------|
| 2026-03-27 | UNH | $268.05 | $330 | $317.61 | +18.49% | WIN |
| 2026-03-27 | ORCL | $142.81 | $175 | $167.33 | +17.17% | WIN |
| 2026-03-27 | META | $547.54 | $700 | $650.02 | +18.71% | WIN |

---

## Today's Top Picks

### Abstention — no new bear call spreads

**TrendSpider** `Bearish Case Market Scanner` — **`2026-04-14 13:48 UTC`** — returned **ACN**, **VRTX** (2 symbols). Under **Mixed** orchestrator routing, only names in **↓ Bearish** sectors (**XLF**, **XLY**) are eligible: **ACN** maps to **Technology** (XLK **bullish** this run) and **VRTX** to **Healthcare** (XLV **neutral**). **No eligible universe** → **no Step 7 TradingView** on these tickers for a logged pick.

One **`ABSTAIN`** audit row appended to `trades-log.csv` for this session.

---

## Open Trades

_Exclude `ABSTAIN` and `VOID` rows._

| Date | Ticker | Entry Price | Short Strike | Setup Summary |
|------|--------|-------------|--------------|---------------|
| 2026-04-03 | ORCL | $146.03 | $170 – … | Short $170/$185 … May 15 ~42 DTE |
| 2026-04-03 | ADBE | $242.14 | $275 – … | Short $275/$290 … May 15 ~42 DTE |
| 2026-04-03 | META | $573.76 | $680 – … | Short $680/$700 … May 15 ~42 DTE |

---

## Performance Summary

_Closed rows (`outcome_result` **WIN** / **LOSS**) — bear call breach rule at check date._

Aggregate from log: **33** closed checks recorded as **WIN**, **0** as **LOSS** (re-count after new closes; unofficial).

_Full history: `strategies/bearish-call-spread/trades-log.csv`._
