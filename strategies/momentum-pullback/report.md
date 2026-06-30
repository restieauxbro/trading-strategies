# Momentum After Pullback — Current Report
_Last updated: 2026-06-30_

---

## Market Context

The S&P 500 closed at approximately 7,482 (+0.6%) on June 30, 2026 — well above its 200-day SMA (~$690.95 on SPY, ~8% premium). VIX settled at 17.57, down from 18.95 yesterday and well below the 25 danger threshold. Quarter-end is supporting broad buying with institutional rebalancing flows. Markets are in a confirmed uptrend: SPY is +9.3% YTD and +13.6% above its 200-day MA. Sector rotation remains constructive for this strategy: industrials, defense, and AI/software continue to outperform; semiconductor hardware faces macro headwinds from rate/valuation concerns. PCE inflation remains sticky but is not triggering fresh selling pressure today.

---

## Scan Results

**Scanner:** Momentum after pullback (yfinance replication of TrendSpider conditions)  
**Timestamp:** 2026-06-30 19:03 UTC  
**Universe:** 150-stock S&P 500 sample  
**Symbols found (24):** V, KO, QCOM, LIN, TXN, PM, ADI, UNP, SO, CL, NSC, GD, ETN, CDNS, MCHP, FDX, EMR, NXPI, TFC, FAST, NUE, PCAR, OKE, PCG

**Pre-filter eliminations (before full scoring):**
- V, FAST, ETN: >5% above 50d EMA — too extended
- KO, QCOM, TXN, ADI, UNP, MCHP, FDX, EMR: volume NOT declining
- SO, CL, PCG: volume declining but only single trigger; defensive/low-conviction setup
- NUE: -4.5% below 50d EMA, RSI 35.7 — broken structure
- NXPI: -1.4% from 50d EMA, RSI 43.9, single trigger — weak momentum
- TFC: only single trigger; financial sector setup less compelling in current environment
- PM: earnings July 22 (22 days) — same instrument constraint as GD but lower conviction score
- PCAR: conflicting earnings signals (July 21–28), creating execution risk
- ETN: recurring non-qualifier (volume not declining, +6.4% extended)

---

## Today's Suggested Trades

### 1. LIN — Linde plc (Industrial Gases)

**Score: 80/115** (A:35 B:10 C:20 D:15)

**Setup Summary:**
Linde pulled back from its June 12 high ($523) to the 50d EMA zone ($507 area) over the past three weeks, with volume declining on the pullback — a textbook orderly consolidation. Price has now recrossed above the 20d EMA, the RSI crossed back above 50, and today's close is above the prior day's high: all three momentum triggers fired simultaneously. The stock is re-approaching the 52-week high at $527.94, and with analyst consensus targets of $543–$600 and a near-certain earnings beat trajectory (Q2 guide: $4.40–$4.50 EPS, +8–10% YoY), there is an asymmetric continuation setup into the August earnings window.

**Current Price:** $520.36  
**Sector:** Materials (Industrial Gases)  
**Entry Zone:** $516–$522  
**Stop Loss:** $503 — below the 50d EMA pullback swing low ($506.92 EMA)  
**Target 1:** $542 — breakout above 52W high ($527.94), next analyst resistance zone  
**Target 2:** $558 — mid-range analyst consensus (BMO/RBC/BofA revised targets)  
**Risk/Reward:** 1.6:1 to T1 (risk $15, reward $24 using $518 mid-entry)

**Key Risks:**
- Near 52-week high — upside breakout required, not just a mean-reversion play
- Earnings ~July 31–August 7 (estimated; not confirmed). Position should be pre-earnings or accept risk with defined-loss spread
- High valuation at ~28–30x forward earnings; any industrial slowdown re-rates quickly

**Fundamental Note:**  
Q1 2026: EPS $4.33 vs $4.27 est (+1.4% beat), revenue +8% YoY to $8.78B. FY2026 EPS guidance raised to $17.60–$17.90 (+7–9%). Sale-of-gas project backlog: $7.1B (take-or-pay, 15–20 year contracts). Multiple analyst PT raises in June toward $545–$600 (UBS maintains $600, BMO, RBC, BofA raised). 33 consecutive annual dividend hikes, 30% operating margin. Structural growth driver: hydrogen infrastructure + semiconductor gas demand.

**Score Breakdown:**
- A (Technical): Weekly uptrend ✓(10) + Daily uptrend ✓(8) + Pullback to support ✓(10) + Volume declining ✓(7) + Continuation pattern ✓(5) − BX unavailable (−5) = **35/55**
- B (R:R 1.6:1): **10/25**
- C (Fundamentals): Beat earnings ✓(6) + Revenue growth ✓(5) + EPS growth ✓(5) + Analyst PT raises in last 30 days ✓(4) = **20/20**
- D (Catalyst/Sector): Q1 beat + guidance raise + analyst PT raises toward $600 ✓(8) + Industrial gases sector in favour ✓(7) = **15/15**

**Instrument:** Paired Debit Spread — Bullish  
**Expiry:** August 15, 2026 (~46 DTE) — pre-earnings window  

```
Primary Spread (Bull Call Spread):
  Long:  LIN Aug 15 $520 call
  Short: LIN Aug 15 $535 call
  Width: $15 | Estimated net debit: ~$7–$8 per spread
  Max Profit: ~$7–$8 | Max Loss: ~$7–$8

Opposite Hedge (Bear Put Spread — half size):
  Long:  LIN Aug 15 $518 put
  Short: LIN Aug 15 $503 put
  Width: $15 | Estimated net debit: ~$5–$6 per spread
  Max Profit: ~$9–$10 | Max Loss: ~$5–$6

Combined Position (1 primary + 0.5 hedge):
  Total Debit / Max Loss: ~$10–$11
  Expected Payout if thesis hits T1: ~$10–$11
  Expected Payout on violent move against thesis: ~$4–$5
  Main Risk: drift and time decay if stock pins between $510–$530
```
_Verify exact premiums at broker before entry. Wide bid/ask on LIN options — use limit orders._

---

### 2. GD — General Dynamics Corp. (Aerospace & Defense)

**Score: 80/115** (A:35 B:10 C:20 D:15)

**Setup Summary:**
GD pulled back from its Jefferies/UBS double-upgrade high ($359, June 11) to the 50d EMA zone ($346–$350), volume declining, and is now recrossing above the 20d EMA ($348.65) with all three momentum triggers firing. The June 11 Jefferies upgrade (Hold → Buy, PT $400) and simultaneous UBS upgrade (Neutral → Buy) — both within the last 19 days — reconfirmed institutional conviction in the submarine/Marine Systems thesis. With a $130.8B total backlog, book-to-bill of 2:1 in Q1, and $125B of U.S. Navy submarine procurement earmarked for FY2027–2031, the fundamental story is among the clearest in the S&P 500.

**Current Price:** $353.66  
**Sector:** Industrials (Aerospace & Defense)  
**Entry Zone:** $351–$357  
**Stop Loss:** $343 — below 50d EMA pullback swing low ($346.05 EMA); below the June post-pullback base  
**Target 1:** $370 — prior 52-week high area  
**Target 2:** $388 — analyst consensus price target (Jefferies, Morgan Stanley, JPM, Wells Fargo all ~$388–$435)  
**Risk/Reward:** 1.7:1 to T1 (risk $10, reward $17 using $353 mid-entry)

**Key Risks:**
- Earnings July 22, 2026 (estimated, not confirmed) — 22 days from entry; technically passes the 21-day hard filter but instrument DTE is constrained (see below)
- Defense budget uncertainty; any cuts to Pentagon submarine spending would re-rate the thesis
- Citi has a Neutral/$364 target — some near-term caution on A&D recovery timing

**Fundamental Note:**  
Q1 2026: EPS $4.10 vs $3.67 est (+11.7% beat), revenue $13.5B (+10.3% YoY, beating est by >6%). Marine Systems grew 21% in Q1 (11 of last 13 quarters positive). FY2026 EPS guidance raised to $16.45–$16.55. Jefferies upgraded June 11, UBS upgraded June 11 — both citing submarine backlog and shipyard productivity. Morgan Stanley PT $435 (Overweight, April 30). Analyst consensus: $388 (21 analysts).

**Score Breakdown:**
- A (Technical): Weekly uptrend ✓(10) + Daily uptrend ✓(8) + Pullback to support ✓(10) + Volume declining ✓(7) + Continuation pattern ✓(5) − BX unavailable (−5) = **35/55**
- B (R:R 1.7:1): **10/25**
- C (Fundamentals): Beat earnings ✓(6) + Revenue growth ✓(5) + EPS growth ✓(5) + Jefferies/UBS upgrade Jun 11 ✓(4) = **20/20**
- D (Catalyst/Sector): Jefferies/UBS double upgrade + $125B submarine procurement plan ✓(8) + Defense sector in favour ✓(7) = **15/15**

**Instrument:** Paired Debit Spread — Bullish  
**⚠️ Earnings Timing Note:** GD earnings estimated July 22 (22 days). Two instrument options:

**Option A — Pre-earnings (recommended for risk management):**  
Expiry: July 17, 2026 (~17 DTE — slightly below 21-DTE target range, acceptable for a short-term momentum play)

```
Primary Spread (Bull Call Spread):
  Long:  GD Jul 17 $353 call
  Short: GD Jul 17 $365 call
  Width: $12 | Estimated net debit: ~$5–$6 per spread

Opposite Hedge (Bear Put Spread — half size):
  Long:  GD Jul 17 $352 put
  Short: GD Jul 17 $340 put
  Width: $12 | Estimated net debit: ~$4–$5 per spread

Combined Position:
  Total Debit / Max Loss: ~$7–$8
  Expected Payout if T1 hit before Jul 17: ~$8–$10
  Main Risk: insufficient time for the move; pins around $352–$360
```

**Option B — Span earnings with defined risk:**  
Expiry: August 15, 2026 (~46 DTE) — accepts earnings gap risk but with max loss = premium paid.

---

### 3. CDNS — Cadence Design Systems (EDA Software)

**Score: 75/115** (A:35 B:10 C:20 D:15 Ded:−5)

**Setup Summary:**
CDNS pulled back from its June 9 Intel Foundry partnership high ($403) to the 50d EMA zone ($363–$368), volume declining, with the RSI crossing back above 50 as the first momentum trigger fires. The Intel 14A DTCO partnership (June 9) and Computex debut of the "ChipStack AI Super Agent" (June 1) remain recent catalysts. BNP Paribas raised its PT to $450 in June; Stifel raised to $432 on June 9. The stock is consolidating between the 50d ($363.71) and 20d EMA ($379.27), building a base for a potential recrossion of the 20d.

**Current Price:** $375.20  
**Sector:** Technology (EDA Software/Semiconductors)  
**Entry Zone:** $371–$378  
**Stop Loss:** $357 — below 50d EMA pullback swing low ($363.71 EMA); invalidates the base  
**Target 1:** $402 — prior June 9 high (the Intel-announcement high)  
**Target 2:** $420 — analyst consensus range (Stifel $432, Wells Fargo $425, BNP $450)  
**Risk/Reward:** 1.65:1 to T1 (risk $17, reward $28 using $374 mid-entry)

**Key Risks:**
- Earnings July 27, 2026 (estimated, not confirmed) — 27 days; creates instrument DTE constraint
- Still below the 20d EMA at $379.27 — only RSI trigger has fired; confirmation of 20d EMA recrossion would strengthen entry
- Insider selling by CEO (Anirudh Devgan) and VP (Paul Scannell) under 10b5-1 plans; routine but adds caution
- Q1 stock fell 3.34% the day after earnings despite a beat — execution risk at next report

**Fundamental Note:**  
Q1 2026: EPS $1.96 vs $1.91 est (+2.6% beat), revenue +18.6% YoY to $1.47B. Record backlog $8.0B. Intel Foundry DTCO partnership for Intel 14A (June 9) → Stifel PT raised to $432 (Buy). First autonomous AI chip design engineer (Level-5 virtual engineer) launched at Computex on NVIDIA infrastructure. BNP Paribas PT $450 (Outperform, June). FY2026 EPS guidance raised to $2.02–$2.08 range; consensus $2.08.

**Score Breakdown:**
- A (Technical): Weekly uptrend ✓(10) + Daily uptrend ✓(8) + Pullback to support ✓(10) + Volume declining ✓(7) + Pattern ✓(5) − BX unavailable (−5) = **35/55**
- B (R:R 1.65:1): **10/25**
- C (Fundamentals): Beat earnings ✓(6) + Revenue growth ✓(5) + EPS growth ✓(5) + Stifel upgrade Jun 9 ✓(4) = **20/20**
- D (Catalyst/Sector): Intel 14A + AI chip design agent ✓(8) + AI/EDA sector in favour ✓(7) = **15/15**
- Deductions: Insider selling (−5)
- **Total: 75/115**

**Instrument:** Paired Debit Spread — Bullish  
**⚠️ Earnings Timing Note:** CDNS earnings estimated July 27 (27 days). Two options:

**Option A — Pre-earnings:**  
Expiry: July 18, 2026 (~18 DTE — slightly below 21-DTE target range; acceptable for short-term momentum capture pre-Intel catalyst recurrence)

```
Primary Spread (Bull Call Spread):
  Long:  CDNS Jul 18 $375 call
  Short: CDNS Jul 18 $390 call
  Width: $15 | Estimated net debit: ~$6–$7 per spread

Opposite Hedge (Bear Put Spread — half size):
  Long:  CDNS Jul 18 $373 put
  Short: CDNS Jul 18 $358 put
  Width: $15 | Estimated net debit: ~$5–$6 per spread
```

**Option B — Span earnings with defined risk:**  
Expiry: August 1, 2026 (~32 DTE) — accepts gap risk on July 27 earnings; max loss = premium paid.

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing, extension, earnings constraint, or incomplete triggers)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| OKE | At 50d EMA with multiple triggers + volume declining; but closed slightly below 50d/20d EMA cluster at $87.38. Solid fundamentals (Q1 EBITDA +13%, guidance raised). Safe earnings window (Aug 3–7). | Confirmed close above $88.50 (above both 20d $88.02 and 50d $87.70 EMAs) |
| NSC | All 3 triggers, volume declining, +2.3% from 50d. But earnings July 23 (23 days) — tight instrument window. Merger with Union Pacific adds event risk. | Post-earnings re-entry if Q2 beats; or entry on confirmed date >21 DTE |
| ETN | Recurring scan appearance (June 24, 28, 29, 30). +6.38% above 50d EMA — too extended. Volume not declining. | Pullback to $408–$412 (50d EMA zone); ideally with volume declining |
| PCAR | Good pullback setup (+3.2% from 50d, volume declining) but conflicting earnings signals (July 21–28). July 21 = exactly 21 days. | Confirmed earnings date; if July 28, entry becomes viable |
| PM | Volume declining, 2 triggers, +3.6% from 50d. But earnings July 22 (22 days, same constraint as GD) and RBH impairment charge expected in Q2. | Post-earnings; or if Q2 confirmed post-July 22 |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No user-confirmed trades from this or prior scheduled runs. All scheduled runs suggest-only mode per Step 6._

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
- **Expired (inconclusive):** N/A
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Notes on Untracked Historical Runs
The following scheduled runs generated suggestions but no user-confirmed trades were logged (per Step 6 unattended-mode rules):

| Run Date | Top Picks | Scan Count |
|----------|-----------|------------|
| 2026-06-29 | GD (88/115), CDNS (88/115), ETN (81/115) | 23 |
| 2026-06-28 | MDB (85/115), ETN (79/115), ADI (78/115) | N/A |
| 2026-06-24 | HON (95/115), AMGN (69/115), TFC (62/115) | N/A |
| 2026-05-21 | PNC (88/115), ETN (76/115), HLT (72/115) | N/A |
| 2026-04-22 | TJX (95/115), CB (91/115), TRV (83/115) | N/A |
| 2026-04-21 | DE (72/115), COST (65/115) | N/A |
| 2026-04-16 | Empty scan (0 symbols) | 0 |
