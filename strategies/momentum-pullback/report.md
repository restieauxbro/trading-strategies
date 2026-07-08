# Momentum After Pullback — Current Report
_Last updated: 2026-07-08_

---

## Market Context

S&P 500 closed at 7,466.78 on July 8 (−0.49%), extending a two-day losing streak from the July 6 all-time-high zone near 7,537. VIX spiked to a high of 18.91 intraday before settling around 18.6 at close — up +15.4% from yesterday's 16.13 close. The spike was driven by renewed AI scepticism that crushed semi and megacap-tech names (Nasdaq −1.2%). Despite the surface turbulence, the S&P 500 remains ~20% above its 200-day MA — the bull uptrend is structurally intact. Sector rotation continues: Industrials, Consumer Discretionary (off-price), and Healthcare holding up; Semis and Megacap Tech underperforming. FOMC minutes released today (July 8) reinforced a "higher-for-longer" tone but no new surprises. Q2 2026 earnings season officially begins July 10 (Delta Air Lines).

---

## Scan Results — July 8, 2026

**Universe:** S&P 500 (Wikipedia — 503 tickers; used full list)  
**Scan timestamp:** 2026-07-08 19:11 UTC  
**Scan passed:** 29 tickers  
**After earnings hard filter (21-day cutoff = July 29):** 14 remaining  
**After known Cat-B fails (MO, AFL) + below-threshold (OKE, MCHP):** 10 fully scored

### Tickers removed by earnings filter

| Ticker | Earnings Date | Days Away |
|--------|--------------|-----------|
| FAST | Jul 13 | 5 |
| GS | Jul 14 | 6 |
| C | Jul 14 | 6 |
| PLD | Jul 16 | 8 |
| TFC | Jul 17 | 9 |
| TXN | Jul 22 | 14 |
| PM | Jul 22 | 14 |
| NSC | Jul 23 | 15 |
| PCG | Jul 23 | 15 |
| AXP | Jul 24 | 16 |
| NUE | Jul 27 | 19 |
| NXPI | Jul 28 | 20 (confirmed) |
| KO | Jul 28 | 20 (borderline — excluded) |
| HLT | Jul 28 | 20 (borderline — excluded) |
| PCAR | Jul 28 | 20 (borderline — excluded) |

### Early eliminations (post-filter)

| Ticker | Reason |
|--------|--------|
| MO | Cat B FAIL — analyst avg PT $70–71 ≤ current $73.07 |
| AFL | Cat B FAIL — analyst avg PT $112–114 < current $121.43 |
| OKE | Score ~45/115 — below 55-pt threshold |
| MCHP | Cat B FAIL — near-term price targets don't support ≥1.5:1 R:R from current $85.75 |

---

## Today's Suggested Trades

### 1. TJX — The TJX Companies (Score: 85/115)

**Setup:** Off-price retailer testing EMA50 after an orderly pullback from recent highs. Price $153.16, EMA50 $157.39 (−2.69% below). Volume declining on pullback. RSI 41.9 — pullback still in progress, but trigger fired (close above prior day's high). Strong Buy analyst consensus with avg 12-month PT $175–$178 (+14.5% upside from current).

**Scoring:**
- Category A — Technical Setup: **37/55** (weekly uptrend 10, daily uptrend 8, at EMA50 zone 10, volume declining 7, 1 trigger 2, BX unavailable 0)
- Category B — Risk/Reward: **25/25** (entry $152, stop $146, T1 $168 = 2.1:1; T2 $175 = 3.1:1 → ≥3:1 bracket)
- Category C — Fundamentals: **20/20** (Q1 FY2027 EPS beat May 20; revenue +YoY; EPS growth; multiple analyst upgrades)
- Category D — Catalyst: **13/15** (Q1 beat + multi-firm PT raises in May–June; consumer-defensive off-price sector outperforming)
- Deductions: **−10** (BX visual unavailable −5; insider selling $27.7M last 3 months −5)

**Fundamentals:** Q1 FY2027 (reported May 20, 2026): beat estimates; multiple PT upgrades (BTIG $190, Barclays $190, UBS $197, JPM $176, Truist $190, BofA $185). Off-price retail benefits from consumer trade-down; high store-traffic data. Strong Buy consensus; avg PT $175–$178.

**Earnings:** ~Aug 18–20, 2026 (41+ days, SAFE) — close position by Aug 15.

**Trade Plan:**
```
Entry zone:  $150–$155 (EMA50 area; ideal entry on further intraday dip)
Stop:        $146 (below recent swing support)
Target 1:    $168 (near-term resistance)  — 2.1:1 R:R
Target 2:    $175 (analyst avg PT)        — 3.1:1 R:R
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Aug 21, 2026 (~44 DTE) — close by Aug 15 before earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: 1x
  Strikes: $152.50 / $157.50 (5-wide, near ATM)
  Net Debit: ~$2.00–2.50 per spread (verify at execution)
  Max Profit: ~$2.50–3.00
  Max Loss:   ~$2.00–2.50

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5x (half)
  Strikes: $152.50 / $147.50 (5-wide)
  Net Debit: ~$2.50–3.00 per spread
  Max Profit: ~$2.00
  Max Loss:   ~$2.50–3.00

Combined Position:
  Total Debit / Max Loss: ~$3.25–4.00 per primary unit
  Expected Payout if thesis right: ~$2.50–3.00
  Expected Payout on violent drop: ~$1.00–1.50 (hedge)
  Main Risk: RSI 41.9 — pullback may have further to go; chop between $147–$158 with theta decay
```

**Key risks:** RSI still in low-40s — may pullback further before trigger completes; insider selling ($27.7M last 3 months); consumer spending headwinds; B-Xtrender confirmation unavailable. VIX spike today at 18.6 — consider waiting for VIX to settle back below 17 before entry.

---

### 2. ETN — Eaton Corporation (Score: 83/115)

**Setup:** Power-management industrial leader at its daily EMA50. Price $398.35, EMA50 $402.04 (−0.92% below). RSI 47.4. Two triggers fired: recrossed above 20 EMA + RSI previously crossed above 50. Record Q1 2026 results with raised guidance; FTSE Russell Growth index addition on July 6 generates passive inflows. Data-center electrification mega-theme intact.

**Scoring:**
- Category A — Technical Setup: **40/55** (weekly uptrend 10, daily uptrend 8, at EMA50 zone 10, volume declining 7, 2-trigger continuation 5, BX unavailable 0)
- Category B — Risk/Reward: **18/25** (entry $398, stop $375, T1 $425 = 1.8:1; T2 $450 = 2.9:1 → ≥2:1 bracket)
- Category C — Fundamentals: **20/20** (Q1 EPS $2.81 beat $2.74 est; revenue +17% YoY; EPS +15% YoY; multiple analyst upgrades July 6)
- Category D — Catalyst: **15/15** (FTSE Russell index addition July 6; Q1 record results; VoltServer partnership; data-center electrification theme)
- Deductions: **−10** (BX visual unavailable −5; insider selling $8.6M May EVP −5)

**Fundamentals:** Record Q1 2026: Revenue $7.45B (+17% YoY), adj. EPS $2.81 vs $2.74 est. Backlog +48% Electrical, +28% Aerospace. Organic growth guided 9–11% full year. Analyst avg PT ~$426–445; top targets: Citigroup $471, RBC $484, Keybanc $480, JPM $445.

**Earnings:** Aug 4, 2026 (27 days, SAFE) — **MUST close position by July 31.**

**Trade Plan:**
```
Entry zone:  $392–405 (EMA50 zone)
Stop:        $375 (prior support area)
Target 1:    $425 (near-term analyst avg midpoint) — 1.8:1 R:R
Target 2:    $450 (upper analyst range)            — 2.9:1 R:R
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Aug 21, 2026 (~44 DTE) — MUST close by Jul 31 before Aug 4 earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: 1x
  Strikes: $395 / $405 (10-wide, near ATM)
  Net Debit: ~$4.50–5.50 per spread (verify at execution)
  Max Profit: ~$4.50–5.50
  Max Loss:   ~$4.50–5.50

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5x (half)
  Strikes: $395 / $385 (10-wide)
  Net Debit: ~$5.00–6.00 per spread
  Max Profit: ~$5.00
  Max Loss:   ~$5.00–6.00

Combined Position:
  Total Debit / Max Loss: ~$7.00–8.50 per primary unit
  Expected Payout if thesis right: ~$4.50–5.50
  Expected Payout on violent drop: ~$2.50 (hedge contribution)
  Main Risk: ETN options liquidity — verify OI on $395/$405 strikes before entry
```

**Liquidity note:** Check bid/ask spreads and open interest on ETN near-month options; switch to plain bull call spread if paired structure is illiquid.

**Key risks:** Corrective phase since April ($433 → $398, −8.0%); Barclays has an equal-weight $392 PT (floor near current); heavy Q1 acquisition activity adds integration risk; insider selling ($8.6M May); B-Xtrender unavailable; hard close deadline July 31.

---

### 3. CI — The Cigna Group (Score: 81/115)

**Setup:** Managed-care company with all 3 triggers active and price right at the 50-day EMA. Price $289.59, EMA50 $283.34 (+2.21% above). RSI 55.2. All 3 triggers fired (20 EMA recross, RSI cross above 50, close above prior high). Consecutive EPS beats; FY2026 guidance raised; Goldman maintains Buy $340.

**Scoring:**
- Category A — Technical Setup: **40/55** (weekly uptrend 10, daily uptrend 8, at EMA50 zone 10, volume declining 7, all-3-trigger pattern 5, BX unavailable 0)
- Category B — Risk/Reward: **18/25** (entry $285–290, stop $268, T1 $318 = 1.9:1; T2 $340 = 2.3:1 → ≥2:1 bracket at $290 entry)
- Category C — Fundamentals: **20/20** (Q1 EPS $7.79 beat $7.60; revenue +4.6% YoY; EPS +15.6% YoY; Goldman Buy $340 Jul 2)
- Category D — Catalyst: **13/15** (Q1 beat + raised FY2026 guidance; Goldman PT raise July 2; managed-care sector recovering from 2025 headwinds)
- Deductions: **−10** (BX visual unavailable −5; insider selling June 12 CAO sale −5)

**Fundamentals:** Q1 2026: adj. EPS $7.79 beat $7.60 est; revenue $68.5B (+4.6% YoY); FY2026 guidance raised to ≥$30.35. Four consecutive quarterly beats. Analyst consensus Buy; avg 12-month PT $340 (+17.4% from $289.59). Top targets: BofA $378, UBS $400, Bernstein $371, Goldman $340.

**Earnings:** July 30, 2026 (22 days, SAFE) — **⚠️ MUST close position by July 28.**

**Trade Plan:**
```
Entry zone:  $283–290 (EMA50 area; CI already slightly above entry zone)
Stop:        $268 (below EMA50 support zone)
Target 1:    $318 (prior resistance / measured move) — 2.1:1 R:R
Target 2:    $340 (analyst consensus avg PT)         — 3.0:1 R:R
```

**Instrument: Paired Debit Spread (Bullish)**
```
Bias: Bullish
Expiry: Aug 21, 2026 (~44 DTE) — MUST close by Jul 28 before Jul 30 earnings

Primary Spread:
  Structure: Bull Call Spread
  Size: 1x
  Strikes: $287.50 / $297.50 (10-wide, ATM)
  Net Debit: ~$4.50–5.50 per spread (verify at execution)
  Max Profit: ~$4.50–5.50
  Max Loss:   ~$4.50–5.50

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5x (half)
  Strikes: $287.50 / $277.50 (10-wide)
  Net Debit: ~$5.00–6.00 per spread
  Max Profit: ~$5.00
  Max Loss:   ~$5.00–6.00

Combined Position:
  Total Debit / Max Loss: ~$7.25–8.50 per primary unit
  Expected Payout if thesis right: ~$4.50–5.50
  Expected Payout on violent drop: ~$2.50 (hedge contribution)
  Main Risk: Hard deadline July 28 — only 20 calendar days to work with
```

**Key risks:** Extremely tight timeline (22 days to earnings); CEO sold ~$53M in shares May 12 (outside 30-day window but notable); MCO sector still recovering from 2024–2025 headwinds; stock is already slightly above the ideal entry zone at $289.59; B-Xtrender unavailable.

---

## Watchlist
_Constructive setups not entering today — revisit when conditions improve._

| Ticker | Price | EMA50 Gap | RSI | Score | Earnings | Why Watching | Trigger to Revisit |
|--------|-------|-----------|-----|-------|----------|--------------|-------------------|
| ADI | $386.88 | −2.44% | 45.0 | 77/115 | Aug 19–26 | Analog Devices at EMA50 with multiple analyst upgrades (Cantor $550, Stifel $498, JPMorgan $450, BofA $460). Strong Q2 beat (EPS $3.09 vs $2.89 est, +67% YoY). Excellent R:R and plenty of time. Weakened by today's AI/chip sector selloff. | Wait for sector to stabilise after today's VIX spike; confirm 20 EMA recross trigger |
| LRCX | $333.92 | +0.72% | 45.6 | ~74/115 | Aug 5 | Lam Research at EMA50; Morgan Stanley raised PT to $404 (July 6), BofA $480 (June 23), Cantor $500. Strong Q3 beat. But chip sector was hit today on AI concerns. | Confirm sector stabilises; wait for day of lower-volume green close before entry |
| BRK-B | $496.90 | +1.69% | 54.1 | ~62/115 | Aug 3 | Previously watchlist at RSI 64 — now RSI cooled to 54. Volume declining. Berkshire's $300B+ cash position is a buffer. No analyst PT consensus limits R:R assessment. | RSI to pull back toward 50; clearer pullback to EMA50 zone ($488–490) |
| DUK | $126.96 | +1.16% | 52.9 | ~63/115 | Aug 11 | Utilities in favor (power demand theme). Good uptrend. BUT volume NOT declining on pullback — fails Cat A volume check. | Wait for volume to dry up; confirm volume declines below 20-day avg on next down day |
| AAPL | $313.96 | +7.15% | 62.6 | Extended | Jul 30 | All 3 triggers, strong uptrend, but 7.1% extended above EMA50. Earnings July 30 (22 days). | Wait for pullback to EMA50 zone (~$290–295) before new entry |
| O | $63.38 | +2.51% | 57.8 | ~57/115 | Aug 5 | Realty Income passes scan. But at $63.38, R:R drops to borderline (T1 ~$67, stop ~$59 = 0.9:1 T1; T2 ~$71 = 2.0:1). Earnings Aug 5 (28 days). | Wait for pullback to $61–62.50 to restore R:R |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

_No open trades on record (all runs to date have been scheduled/unattended — no trades confirmed by user)._

---

## Performance Summary
_All closed trades (outcome recorded)._

_No closed trades yet — strategy has been running in report-only mode since April 16, 2026._

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Full Scan Detail — July 8, 2026

_29 tickers passed all yfinance scan conditions. Below are the 10 that reached full scoring._

| Rank | Ticker | Score | Price | EMA50 Gap | RSI | Triggers | Earnings | Notes |
|------|--------|-------|-------|-----------|-----|----------|----------|-------|
| 1 | TJX | 85/115 | $153.16 | −2.69% | 41.9 | C | ~Aug 18–20 | Top pick; R:R 3.1:1; Strong Buy PT $175–178 |
| 2 | ETN | 83/115 | $398.35 | −0.92% | 47.4 | A+B | Aug 4 | FTSE index add; close by Jul 31; R:R 2.9:1 |
| 3 | CI | 81/115 | $289.59 | +2.21% | 55.2 | A+B+C | Jul 30 | All 3 triggers; close by Jul 28; 22 days |
| 4 | ADI | 77/115 | $386.88 | −2.44% | 45.0 | C | Aug 19–26 | Watchlist — chip sector headwind today |
| 5 | LRCX | ~74/115 | $333.92 | +0.72% | 45.6 | C | Aug 5 | Watchlist — semis under pressure today |
| 6 | DUK | ~63/115 | $126.96 | +1.16% | 52.9 | C | Aug 11 | Watchlist — volume not declining |
| 7 | BRK-B | ~62/115 | $496.90 | +1.69% | 54.1 | C | Aug 3 | Watchlist — no analyst PT consensus |
| 8 | O | ~57/115 | $63.38 | +2.51% | 57.8 | C | Aug 5 | Borderline R:R; entry zone $61–62.50 |
| 9 | SO | ~56/115 | $96.43 | +2.31% | 55.6 | C | Jul 30 | Borderline; poor R:R (tight analyst PT band) |
| — | MO | — | $73.07 | +4.07% | 57.4 | C | Jul 30 | Fails Cat B: analyst PT ≤ current price |
| — | AFL | — | $121.43 | +4.28% | 61.9 | C | Aug 6 | Fails Cat B: analyst PT < current price |
| — | OKE | — | $91.39 | +4.01% | 58.6 | A+B+C | Aug 3 | Score ~45/115 (below threshold) |
| — | MCHP | — | $85.75 | −4.32% | 43.5 | C | Aug 4 | Fails Cat B — near-term PT doesn't support R:R |
| — | AAPL | — | $313.96 | +7.15% | 62.6 | C | Jul 30 | Extended; watchlist |
| — | 15 others | — | — | — | — | — | — | Removed by earnings filter (<21 days) |

_Trigger codes: A = Recross above 20 EMA, B = RSI cross above 50, C = Close above prior day high_
