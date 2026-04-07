# Bearish Call Spread — Current Report
_Last updated: 2026-04-07_

---

## Market Context

The S&P 500 is trading at ~$6,575, just below its 200-day MA ($6,641) — a marginally bearish signal. VIX at 24, recently spiked to 35.3 during the early April selloff driven by renewed tariff uncertainty. The market is in a **Sector-Divergent** regime: Utilities, Energy, Materials and Consumer Staples leading defensively; Technology, Consumer Discretionary and Communications under sustained institutional pressure. This environment is favourable for selective bearish call spreads on stocks in the lagging sectors.

---

## Outcomes Recorded Today

**6 trades from March 23–24 recorded — all WIN:**

| Date | Ticker | Entry | Short Strike | Price at 14d | % Move | Result |
|------|--------|-------|-------------|--------------|--------|--------|
| 2026-03-23 | ORCL | $149.68 | $175 | $144.76 | -3.29% | WIN |
| 2026-03-23 | ADBE | $248.15 | $285 | $242.00 | -2.48% | WIN |
| 2026-03-23 | NOW  | $110.38 | $128 | $111.00 | +0.56% | WIN |
| 2026-03-24 | META | $606.49 | $700 | $578.19 | -4.66% | WIN |
| 2026-03-24 | ADBE | $247.81 | $285 | $242.00 | -2.34% | WIN |
| 2026-03-24 | NOW  | $111.21 | $128 | $111.00 | -0.19% | WIN |

---

## Today's Top Picks

### Abstention — no new bear call spreads

TrendSpider B-Xtrender check completed via browser-use (profile Tim). Both research-qualified candidates were **disqualified** by a green dot on the signal line — the hard disqualifier per strategy rules.

**NVDA:** Background red ✓, histogram below zero ✓ — but **green dot just printed** on signal line. Momentum of the selloff is stalling. Do not open new bear calls.

**MSFT:** Background red ✓, histogram below zero ✓ — but **green dot just printed** on signal line. Same bounce signal. Do not open new bear calls.

This is consistent with the April 6 tech-led 3.4% surge (S&P 500 snapped a five-week slump). The B-Xtrender is correctly detecting mean-reversion risk across the tech sector. Opening bear calls into a green dot is precisely the scenario this confirmation step exists to prevent.

_One ABSTAIN row should be appended — see CSV note below._

> **CSV note:** NVDA and MSFT rows were logged pre-confirmation and have been marked VOID in the setup_summary field. They should not be treated as open trades.

---

### ~~1. NVDA~~ — DISQUALIFIED (green dot)
### ~~2. MSFT~~ — DISQUALIFIED (green dot)

```
Ticker: NVDA
Current Price: $177.00
Sector: Technology / Semiconductors
Score: 76/100 (A:40 B:18 C:3 D:15 Ded:0)

Setup Summary:
NVDA below both 50-day MA ($182.64) and 200-day MA ($179.80) — the MAs form a
tight overhead resistance cluster at $179–$183. 50-day has crossed below 200-day
(bearish cross). RSI 49, MACD below signal line. Semiconductor sector under
sustained tariff and rotation headwinds.

Resistance Level: $179–$183 — converging 50/200-day MA cluster

Suggested Spread:
  Short Call Strike: $185 (~0.25–0.30 delta) — above MA cluster
  Long Call Strike:  $200
  Target Expiry:     May 16 2026 (~39 DTE)
  Est. Probability of Profit: ~75%

Key Risks:
- MA cluster only $2–6 above current price — small bounce breaches it
- Fundamental story exceptional (revenue +65% YoY) — strong dip-buyers
- Earnings May 20 (43 days, outside filter) but GPU demand can reignite
- TrendSpider B-Xtrender confirmation required

Fundamental Note:
Exceptional fundamentals — purely technical trade on broken trend + MA cross +
sector rotation. High IV environment supports spread premium.
```

### 2. MSFT — Down 22% YTD, 50-day MA ceiling

```
Ticker: MSFT
Current Price: $373.00
Sector: Technology / Software
Score: 72/100 (A:38 B:22 C:5 D:7 Ded:0)

Setup Summary:
Down 22% YTD despite Q2 beat (EPS $4.14, revenue +17% YoY). Below 50-day MA
($391.70) and far below 200-day MA ($463.10). RSI 38.8 approaching oversold —
this is the primary risk. 50-day MA acts as first ceiling.

Resistance Level: $391–$395 — 50-day MA + prior breakdown zone

Suggested Spread:
  Short Call Strike: $395 (~0.20 delta) — above 50-day MA
  Long Call Strike:  $415
  Target Expiry:     May 16 2026 (~39 DTE)
  Est. Probability of Profit: ~78%

Key Risks:
- Earnings April 29 (22 days — outside 17-day filter but binary risk)
- RSI 38.8 approaching oversold — bounce risk elevated
- Revenue +17% YoY; strong institutional floor
- TrendSpider B-Xtrender confirmation required

Fundamental Note:
Business is strong — de-rating is sentiment/valuation driven. Limited fundamental
bearish conviction; trade is primarily technical on 50-day MA ceiling.
```

---

## Open Trades

| Date | Ticker | Entry | Short Strike | Setup |
|------|--------|-------|-------------|-------|
| 2026-03-27 | UNH | $268.05 | $330 | Short $330/$350 May 15 |
| 2026-03-27 | ORCL | $142.81 | $175 | Short $175/$190 May 15 |
| 2026-03-27 | META | $547.54 | $700 | Short $700/$730 May 15 |
| 2026-03-31 | ORCL | $137.78 | $170 | Short $170/$185 May 15 |
| 2026-03-31 | ADBE | $240.04 | $285 | Short $285/$300 May 15 |
| 2026-03-31 | CRM  | $183.68 | $220 | Short $220/$235 May 15 |
| 2026-04-01 | UNH  | $274.22 | $330 | Short $330/$350 May 15 |
| 2026-04-01 | ORCL | $145.73 | $175 | Short $175/$190 May 15 |
| 2026-04-01 | META | $580.59 | $700 | Short $700/$730 May 15 |
| 2026-04-03 | ORCL | $146.03 | $170 | Short $170/$185 May 15 |
| 2026-04-03 | ADBE | $242.14 | $275 | Short $275/$290 May 15 |
| 2026-04-03 | META | $573.76 | $680 | Short $680/$700 May 15 |
| 2026-04-07 | NVDA | $177.00 | $185 | Short $185/$200 May 16 — pending chart confirm |
| 2026-04-07 | MSFT | $373.00 | $395 | Short $395/$415 May 16 — pending chart confirm |

---

## Performance Summary

| Date | Ticker | Entry | Price at 14d | % Move | Short Strike | Result |
|------|--------|-------|-------------|--------|-------------|--------|
| 2026-03-07 | ABT  | $108.66 | $105.46 | -2.95% | $120 | WIN |
| 2026-03-07 | TSLA | $394.68 | $367.96 | -6.77% | $480 | WIN |
| 2026-03-07 | KKR  | $90.99  | $90.00  | -1.09% | $105 | WIN |
| 2026-03-07 | UNH  | $284.75 | $275.59 | -3.22% | $315 | WIN |
| 2026-03-07 | MS   | $160.47 | $161.47 | +0.62% | $180 | WIN |
| 2026-03-07 | DIS  | $101.66 | $99.51  | -2.12% | $115 | WIN |
| 2026-03-11 | QCOM | $134.55 | $129.90 | -3.46% | $155 | WIN |
| 2026-03-11 | JPM  | $286.65 | $286.56 | -0.03% | $310 | WIN |
| 2026-03-11 | CVS  | $76.46  | $71.48  | -6.51% | $83  | WIN |
| 2026-03-17 | UNH  | $285.78 | $260.19 | -8.96% | $300 | WIN |
| 2026-03-17 | JPM  | $286.26 | $282.52 | -1.30% | $310 | WIN |
| 2026-03-17 | BA   | $213.88 | $188.08 | -12.06% | $240 | WIN |
| 2026-03-19 | UNH  | $283.70 | $260.19 | -8.29% | $330 | WIN |
| 2026-03-19 | TSLA | $393.22 | $352.40 | -10.38% | $450 | WIN |
| 2026-03-19 | CVS  | $73.07  | $69.55  | -4.82% | $83  | WIN |
| 2026-03-21 | ADBE | $248.15 | $242.12 | -2.43% | $285 | WIN |
| 2026-03-21 | ORCL | $149.68 | $145.86 | -2.55% | $175 | WIN |
| 2026-03-21 | NOW  | $110.38 | $101.75 | -7.82% | $125 | WIN |
| 2026-03-23 | ORCL | $149.68 | $144.76 | -3.29% | $175 | WIN |
| 2026-03-23 | ADBE | $248.15 | $242.00 | -2.48% | $285 | WIN |
| 2026-03-23 | NOW  | $110.38 | $111.00 | +0.56% | $128 | WIN |
| 2026-03-24 | META | $606.49 | $578.19 | -4.66% | $700 | WIN |
| 2026-03-24 | ADBE | $247.81 | $242.00 | -2.34% | $285 | WIN |
| 2026-03-24 | NOW  | $111.21 | $111.00 | -0.19% | $128 | WIN |

### Aggregate Stats
- **Total closed trades:** 24
- **Win rate:** 24/24 = **100%**
- **Average stock % move on wins:** -4.1% (stock declined, spreads profitable)
- **Closest call:** MS +0.62% — stayed well below $180 strike
- **Best performing:** BA -12.06%, UNH -8.96%
