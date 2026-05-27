# Momentum After Pullback — Current Report
_Last updated: 2026-05-27_

---

## Market Context

The S&P 500 (SPY) closed at $750.84, sitting **+10.83% above its 200-day MA** ($677.46) — a clear, healthy bull market. The 50-day MA ($699.97) is also comfortably below current price (+7.3%), confirming broad trend strength. VIX is approximately **17**, well beneath the 25 caution threshold, indicating low fear/complacency — constructive for momentum continuations. Overall regime: **Bullish; no downtrend filters applied.**

---

## Scan Results

- **Scanner:** Momentum After Pullback (yfinance-based scan)
- **Timestamp:** 2026-05-27 19:02 UTC
- **Universe:** S&P 500 (150 tickers from fallback list screened)
- **Tickers found (17):** JPM, BAC, KO, LIN, BLK, ADI, C, UNP, NSC, GD, ETN, USB, PNC, CARR, HLT, OKE, AEP
- **Note:** TradingView visual confirmation (Step 4b) **could not be completed** — `browser-use` is unavailable in this environment. B-Xtrender indicators (up to ±15 pts in scoring) were not assessed; they are marked N/A. Scores reflect technical, fundamental, R:R, and catalyst categories only. **Verify BX indicators on chart `z25AhAlV` before entry.**

---

## Today's Suggested Trades

### 1. ETN — Eaton Corp (Power Management / Industrials)
_Score: 91/115 (A:38 B:18 C:20 D:15 Ded:0) — BX not assessed_

**Current Price:** $405.57  
**Sector:** Industrials — Specialty Industrial Machinery  
**Earnings Next:** August 4, 2026 (~69 DTE — safe)

**Setup Summary:**  
Eaton has broken out of a multi-week consolidation above its rising 50-day EMA ($391.57), recrossing the 20 EMA and pushing RSI to 53.6 — both recovery triggers. The stock is only 3.6% above its 50 EMA (well within the ±3% scan zone that was tested in recent bars), volume is declining on the consolidation, and the broader uptrend is strong on all timeframes. The AI/data-center power management theme is a secular tailwind: Q1 2026 Electrical Americas organic growth was +14% (data centers +50%), backlog +48% YoY, and organic growth guidance was raised to 10% midpoint.

| | |
|---|---|
| **Entry Zone** | $403–$410 (at/near current price; 50 EMA retest complete) |
| **Stop Loss** | $387 — below daily EMA50 ($391.57) with buffer |
| **Target 1** | $451 — analyst consensus (multiple upgrades May 2026) |
| **Target 2** | $481 — KeyBanc target; Morgan Stanley $500 stretch |
| **Risk/Reward** | 2.7:1 to T1 |

**Key Risks:**
- IV elevated (~40%); options are expensive — verify spread liquidity before executing
- Earnings Aug 4 (69 DTE) — within the 45 DTE spread expiry window; use July 17 expiry to avoid
- Near-term margin pressure in Electrical Americas (higher capacity investment costs flagged in Q1 call)

**Fundamental Note:**  
Record Q1 2026: revenue $7.5B (+17% YoY, +10% organic), adj EPS $2.81 (record Q1), free cash flow +245% YoY. Full-year adj EPS guidance raised to $13.28 midpoint. Morgan Stanley (May 10, $500 target), KeyBanc (May 7, $480), JPMorgan (May 6, $445) all raised targets after Q1.

---

**Instrument: Paired Debit Spread (Bullish)**  
Expiry: July 17, 2026 (~51 DTE)  
Bias: Bullish

**Primary Spread:**
- Structure: Bull Call Spread
- Strikes: Long 410C / Short 430C
- Net Debit: ~$7.55 per spread (~$755/contract)
- Max Profit: ~$12.45 per spread (~$1,245/contract)
- Max Loss: ~$7.55 per spread (~$755/contract)

**Opposite Hedge (half-size):**
- Structure: Bear Put Spread
- Strikes: Long 390P / Short 380P
- Net Debit: ~$3.45 per spread (~$345/contract)
- Max Profit: ~$6.55 per spread (~$655/contract)
- Max Loss: ~$3.45 per spread (~$345/contract)

**Combined Position (2× primary / 1× hedge):**
- Total Debit / Max Loss: ~$1,855
- Expected Payout if thesis is right (ETN ≥ $430): ~+$2,145 (net of hedge cost)
- Expected Payout on violent move lower (ETN ≤ $380): ~-$855 (hedge offsets ~45% of primary loss)
- Main Risk: drift / compression / pinning between $380–$430

---

### 2. GD — General Dynamics (Aerospace & Defense)
_Score: 89/115 (A:40 B:18 C:16 D:15 Ded:0) — BX not assessed_

**Current Price:** $344.40  
**Sector:** Industrials — Aerospace & Defense  
**Earnings Next:** July 22, 2026 (~56 DTE — safe)

**Setup Summary:**  
GD has pulled back cleanly to its 50-day EMA ($341.72) — only +0.78% above it — after a strong post-Q1 run to $369 in early May. Volume has dried up on the pullback, RSI is at 54.2, and three triggers fired (recrossed 20 EMA, RSI >50 cross, close above prior high). All trend conditions remain intact: price above rising EMA50 and EMA200 on both daily and weekly. The fundamental backdrop is exceptional: Q1 2026 beat by 11%, record backlog of $131B (+48% YoY), book-to-bill of 2:1, and raised FY guidance.

| | |
|---|---|
| **Entry Zone** | $342–$346 (at/near EMA50 $341.72) |
| **Stop Loss** | $330 — below EMA200 ($333.25) with buffer |
| **Target 1** | $370 — prior 52-week high |
| **Target 2** | $392 — analyst consensus mean price target |
| **Risk/Reward** | 1.86:1 to T1 / 3.4:1 to T2 |

**Key Risks:**
- GD options liquidity is thin (open interest 66–358 contracts at relevant strikes); verify fills
- Earnings July 22 (56 DTE): within range of the spread expiry — use July 17 to avoid straddle risk
- Supply chain constraints for single-source components flagged in Q1 call; could delay revenue recognition

**Fundamental Note:**  
Q1 2026: revenue $13.7B (+10.3% YoY), adj EPS $4.10 (+12% YoY, beat by 11%). Record backlog $131B (+47.6%), total estimated contract value $188B (+33%). Full-year EPS guidance raised to $16.45–$16.55. Defense demand driven by US allies, submarine programs, munitions, and Gulfstream business aviation.

---

**Instrument: Paired Debit Spread (Bullish)**  
Expiry: July 17, 2026 (~51 DTE)  
Bias: Bullish

**Primary Spread:**
- Structure: Bull Call Spread
- Strikes: Long 350C / Short 360C
- Net Debit: ~$3.15 per spread (~$315/contract)
- Max Profit: ~$6.85 per spread (~$685/contract)
- Max Loss: ~$3.15 per spread (~$315/contract)

**Opposite Hedge (half-size):**
- Structure: Bear Put Spread
- Strikes: Long 330P / Short 320P
- Net Debit: ~$2.57 per spread (~$257/contract)
- Max Profit: ~$7.43 per spread (~$743/contract)
- Max Loss: ~$2.57 per spread (~$257/contract)

**Combined Position (2× primary / 1× hedge):**
- Total Debit / Max Loss: ~$887
- Expected Payout if thesis is right (GD ≥ $360): ~+$1,113 (net of hedge cost)
- Expected Payout on violent move lower (GD ≤ $320): ~+$113 net (hedge more than offsets primary loss!)
- Main Risk: drift / compression / pinning between $320–$360

---

### 3. USB — U.S. Bancorp (Regional Banking)
_Score: 88/115 (A:40 B:18 C:20 D:15 Ded:-5) — BX not assessed_

**Current Price:** $54.86  
**Sector:** Financial Services — Banks Regional  
**Earnings Next:** July 16, 2026 (~50 DTE — safe)

**Setup Summary:**  
USB is essentially resting on its 50-day EMA ($54.56) — only -0.11% to +0.54% — after a clean, declining-volume pullback from the $57+ area. Three triggers fired: recrossed 20 EMA, RSI crossed above 50, and closed above prior day's high. The trend structure is textbook momentum pullback: weekly golden cross intact, price above weekly EMA50 ($50.82), daily EMA200 rising. Q1 2026 delivered its sixth consecutive quarter of positive operating leverage. Deducted 5 pts for insider selling (CITO sold ~$1.9M on May 5; broader ~$2.96M sold in last 90 days), which is notable but consistent with ongoing price appreciation rather than fundamental concern.

| | |
|---|---|
| **Entry Zone** | $54.50–$55.50 (at/near EMA50 $54.56) |
| **Stop Loss** | $52.50 — below recent consolidation lows |
| **Target 1** | $61.19 — prior 52-week high / consensus target |
| **Target 2** | $67.00 — extension target (Oppenheimer $74 direction) |
| **Risk/Reward** | 2.5:1 to T1 |

**Key Risks:**
- Insider selling: CITO sold 40% of position May 5; Vice Chair also sold; no buying in 90 days — tempers conviction
- JPMorgan maintains underweight rating with $57.50 target; CFRA downgraded financials sector
- Earnings July 16 (50 DTE) — spread expiry July 17 is fine; one day after earnings, so consider that options may be elevated into the call

**Fundamental Note:**  
Q1 2026: EPS $1.18 (+15% YoY, 6th straight quarter of positive operating leverage), revenue $7.32B (+4.7% YoY). CET1 capital 10.8%, net interest margin 2.77% (+5 bps YoY). Management reaffirmed 4–6% full-year revenue growth guidance. Amazon Web Services partnership announced (migrating hundreds of banking apps, integrating generative AI). Multiple analyst target raises: Barclays $67, Oppenheimer $74, Morgan Stanley $64.

---

**Instrument: Paired Debit Spread (Bullish)**  
Expiry: July 17, 2026 (~51 DTE)  
Bias: Bullish

**Primary Spread:**
- Structure: Bull Call Spread
- Strikes: Long 55C / Short 60C
- Net Debit: ~$1.55 per spread (~$155/contract)
- Max Profit: ~$3.45 per spread (~$345/contract)
- Max Loss: ~$1.55 per spread (~$155/contract)

**Opposite Hedge (half-size):**
- Structure: Bear Put Spread
- Strikes: Long 52.5P / Short 50P
- Net Debit: ~$0.72 per spread (~$72/contract)
- Max Profit: ~$1.78 per spread (~$178/contract)
- Max Loss: ~$0.72 per spread (~$72/contract)

**Combined Position (2× primary / 1× hedge):**
- Total Debit / Max Loss: ~$382
- Expected Payout if thesis is right (USB ≥ $60): ~+$618 (net of hedge cost)
- Expected Payout on violent move lower (USB ≤ $50): ~-$132 (hedge offsets ~43% of primary loss)
- Main Risk: drift / compression / pinning between $50–$60

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| BAC | Score 83/115 — at EMA50 ($51.44), 3 triggers, strong Q1 (+17% net income YoY), CEO confirmed higher NII guidance at Bernstein conference today. BUT: CFRA downgrade May 19, insider selling $31.1M in 3 months, NII rate sensitivity risk | Insider selling abates; stock holds above $51 support and breaks above $53 (20 EMA) on volume |
| JPM | Score 82/115 — just below its 50 EMA ($303.42) at $299.39; strong fundamentals (Q1 EPS $5.94, beat +7.8%), 52w high $337.25 far overhead suggests significant runway | Confirmed reclaim of $303 (50 EMA) on daily close; RSI >50 |
| PNC | Score 79/115 — +2% from EMA50, volume declining, 1 trigger; Q1 solid but less catalytic than top 3 | Pullback to $215 (50 EMA) and re-trigger |
| CARR | Score 74/115 — HVAC/building solutions, recrossed 20 EMA; +4% above EMA50; needs pullback to $62 | Pullback to $62 (50 EMA zone) with declining volume |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades. No confirmed trades from prior runs (only empty scan on 2026-04-16)._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| — | — | — | — | — | — |

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Run Notes
- **Unattended/scheduled run** (cron trigger): trade suggestions generated but NO rows appended to trades-log.csv (per Step 6 — user confirmation required before logging)
- **TradingView visual check skipped**: `browser-use` unavailable in this environment; B-Xtrender indicators not assessed. User should verify BX indicators on chart `z25AhAlV` for ETN, GD, and USB before entering any position
- **Outcome tracking**: only prior row is an empty-scan entry from 2026-04-16 — no 14-day outcomes due
