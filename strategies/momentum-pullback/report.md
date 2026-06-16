# Momentum After Pullback — Current Report
_Last updated: 2026-06-16_

---

## Market Context

The S&P 500 (via SPY) closed at **$751.53** on June 16, 2026 — **9.4% above its 200-day moving average** ($686.84) and **3.7% above its 50-day moving average** ($724.78). The index remains in a confirmed primary uptrend with higher highs and higher lows on the weekly chart. **VIX is at 15.84** — well below the 25 caution threshold — indicating low implied volatility and benign fear conditions. Overall market backdrop is strongly favourable for continuation momentum setups. No macro downtrend warning applies; standard strategy filters in effect.

_Scan note: browser-use / TrendSpider UI unavailable in this environment. Scan was executed via the yfinance fallback script (`scripts/momentum_pullback_scan.py`), which applies all scan logic conditions (200 EMA, 50 EMA trend alignment, 5-bar proximity to EMA50, timing triggers). TradingView B-Xtrender visual check (Step 4b) was also unavailable; B-Xtrender scoring categories awarded 0 pts in both directions (no positive credit, no red-bar deductions) for all tickers._

---

## Scan Results

**Scan timestamp:** 2026-06-16 19:02 UTC  
**Tickers passing all conditions (30):** AAPL, NVDA, AMZN, GOOGL, TSLA, AVGO, JPM, ABBV, MRK, ORCL, QCOM, LIN, AMGN, PM, CAT, PLD, ADI, UNP, MO, CI, CL, NSC, GD, ETN, MCHP, FDX, EMR, NXPI, TFC, GM

Top candidates researched in depth (criteria: within ±3% EMA50, volume declining on pullback, multiple triggers firing): **NVDA, GOOGL, AAPL, NSC, ETN**.

---

## Today's Suggested Trades

> **Scheduled/unattended run — no CSV rows appended. These are suggestions only.**  
> B-Xtrender visual confirmation unavailable (browser-use not available in environment); B-Xtrender points set to 0 across all tickers.

---

### 1. NVDA — AI Semiconductor Leader Retesting 50 EMA

```
Ticker: NVDA
Current Price: $209.05
Sector: Technology — Semiconductors / AI Infrastructure
Earnings: August 26, 2026 (71 days — CLEAR)
Score: 93/115 (A:40 B:18 C:20 D:15 Ded:0)

Setup Summary:
NVDA is 1.12% above its daily 50 EMA ($206.74) after a healthy pullback from
the ~$225 area. Volume has been declining during the consolidation — classic
orderly pause in a strong uptrend. All three scan triggers fired (recrossed
20 EMA, RSI crossed above 50, close above prior day high). Weekly structure
is pristine: price well above weekly EMA50 ($182.76) and EMA200 ($112.70).
The setup is a textbook momentum continuation — buy the dip to the 50 EMA
as AI infrastructure spending accelerates into H2 2026.

Entry Zone: $205–$212 (prefer entries near EMA50 $207; current market price $209 is acceptable)
Stop Loss: $197.00 — below recent consolidation low (~5.7% below midpoint entry)
Target 1: $240.00 — prior resistance cluster / near-term measured move (+14.8%)
Target 2: $268.00 — approaching Goldman Sachs $285 target zone (+28.2%)
Risk/Reward: 2.6:1 (T1 at entry $209, stop $197)

Key Risks:
- Earnings Aug 26 (71 days away) — position should be sized to not be held
  through earnings, or sized for implied-vol expansion pre-earnings
- AI capex cycle slowdown or hyperscaler capex revision lower
- Broader tech multiple compression if rates move up unexpectedly

Fundamental Note:
Q1 FY2027 (May 20): record revenue $81.6B (+85% YoY), EPS $1.87 beat $1.76 estimate.
Q2 FY2027 guidance: $91B revenue. Goldman Sachs reiterated Buy/$285 (June 3);
Loop Capital initiated Strong Buy/$350 (June 2026). Company authorized $80B additional
buyback and raised quarterly dividend to $0.25. Vera Rubin platform ramping H2 2026.
```

**Instrument — Paired Debit Spread (Preferred)**
```
Bias: Bullish
Expiry: July 18, 2026 (~32 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1x
  Strikes: Long 210C / Short 225C
  Net Debit: ~$7.00–$8.00 per spread (verify live mid)
  Max Profit: ~$7–8 per spread
  Max Loss: ~$7–8 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5x (half primary)
  Strikes: Long 205P / Short 190P
  Net Debit: ~$4.00–$5.00 per spread (verify live mid)
  Max Profit: ~$10–11 per spread
  Max Loss: ~$4.00–$5.00 per spread (debit paid)

Combined Position (1 primary + 0.5 hedge):
  Total Debit / Max Loss: ~$9.50–$10.50
  Expected Payout if thesis works: ~$5–6 net (primary max − hedge debit)
  Expected Payout on violent move against: ~$0 to −$2 (hedge offsets most)
  Main Risk: time decay / stock stays pinned between strike wings
```

---

### 2. GOOGL — Cloud AI Powerhouse Near 50 EMA After Consolidation

```
Ticker: GOOGL
Current Price: $373.06
Sector: Technology — Internet / Cloud Computing
Earnings: ~July 22–23, 2026 (36 days — CLEAR, >21 days)
Score: 86/115 (A:40 B:18 C:16 D:12 Ded:0)

Setup Summary:
GOOGL pulled back from ~$400+ to retest the daily 50 EMA zone ($361–$365)
and has bounced back with all three scan triggers firing. Volume declined
during the consolidation. Weekly structure remains strongly bullish (price
$373 vs weekly EMA50 $301, EMA200 $203). The April 29 Q1 2026 earnings
report was one of the biggest beats in years (+800% YoY in gen AI model
revenue), and Google Cloud backlog almost doubled to $462B. The setup is
a consolidation/continuation off a fundamental catalyst that has fully
"digested" into price.

Entry Zone: $368–$378 (current zone; pullback to $362–$365 50 EMA ideal)
Stop Loss: $354.00 — below daily 50 EMA ($361.63) with buffer (~5.1% from entry)
Target 1: $415.00 — next measured-move resistance / 11.2% gain from $373
Target 2: $445.00 — extension toward yearly highs; +19.3%
Risk/Reward: 2.8:1 (T1 at $370 entry, stop $354)

Key Risks:
- Earnings ~July 22–23 (36 days): close enough to require position sizing
  discipline; prefer to exit or roll before earnings
- DOJ antitrust proceedings (ongoing risk to Google Search business model)
- Revenue growth deceleration risk if ad market softens

Fundamental Note:
Q1 2026: Revenue $109.9B (+22% YoY, fastest in 16 quarters). Google Cloud
revenue $20.2B (+63% YoY), backlog $462B. Net income surged to $62.58B
(+81% YoY). CAPEX guidance raised to $180–190B for 2026. No specific
analyst upgrade in last 30 days confirmed; D.A. Davidson and others maintained
positive ratings post-Q1. Sector leadership in cloud AI with Gemini Enterprise
growing 40% QoQ.
```

**Instrument — Paired Debit Spread (Preferred)**
```
Bias: Bullish
Expiry: July 18, 2026 (~32 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1x
  Strikes: Long 375C / Short 395C
  Net Debit: ~$9.00–$10.00 per spread (verify live mid)
  Max Profit: ~$10–11 per spread
  Max Loss: ~$9–10 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5x (half primary)
  Strikes: Long 370P / Short 350P
  Net Debit: ~$5.00–$6.00 per spread (verify live mid)
  Max Profit: ~$14–15 per spread
  Max Loss: ~$5.00–$6.00 per spread (debit paid)

Combined Position:
  Total Debit / Max Loss: ~$11.50–$13.00
  Expected Payout if thesis works: ~$5–6 net
  Expected Payout on violent move against: ~$1–2 net (hedge offsets most)
  Main Risk: time decay if stock drifts sideways pre-earnings
```

---

### 3. AAPL — WWDC AI Catalyst + 50 EMA Retest After Post-Announcement Pullback

```
Ticker: AAPL
Current Price: $298.97
Sector: Technology — Consumer Electronics / Services / AI
Earnings: July 30, 2026 (44 days — CLEAR)
Score: 85/115 (A:40 B:10 C:20 D:15 Ded:0)

Setup Summary:
AAPL pulled back from ~$305+ to retest the daily 50 EMA zone ($289–$292)
following the WWDC 2026 keynote on June 9, where the company unveiled
Siri AI and Apple Intelligence improvements. The "sell the news" reaction
off WWDC (some features lacked immediate launch dates) created a healthy
retracement. The stock recovered and is now 3.2% above EMA50, with all
three triggers firing. Volume was declining during the pullback. Multiple
analysts raised price targets on June 9 (Morgan Stanley to $360, TD Cowen
to $350, Maxim Group to $350, Wedbush reiterated $400). Prefer a limit
entry at $292–$295 (EMA50 zone) for the best R:R; current $299 is
acceptable but tighter R:R.

Entry Zone: $291–$302 (prefer $292–$296 limit near EMA50 for best R:R)
Stop Loss: $280.00 — below EMA50 zone with buffer (~5.0–6.3% below entry)
Target 1: $332.00 — midpoint of analyst consensus ($320 avg, $350 bull targets)
Target 2: $358.00 — upper analyst cluster (Morgan Stanley $360, TD Cowen $350 range)
Risk/Reward: 2.6:1 at preferred entry $292, stop $280 (T1 $332 = 40/12)
             1.5:1 at current market entry $299, stop $280 (T1 $332 = 33/19)
             → Prefer limit entry near EMA50 for qualifying R:R

Key Risks:
- Earnings July 30 (44 days): some AI features delayed to fall, reducing near-term
  upgrade cycle urgency
- Tim Cook CEO transition to John Ternus creates leadership uncertainty
- Stock near 52-week high area; upside to consensus targets is modest (~7%)
  unless bull targets ($360–$400) are used

Fundamental Note:
Q2 2026 (Apr 30): EPS $2.01 beat $1.95 estimate (+6%); prior year Q2 was $1.65
(+22% YoY). Revenue growth driven by Services segment. WWDC 2026 (June 9)
unveiled Siri AI / Apple Intelligence, triggering multiple PT raises. Morgan
Stanley (Buy/$360), Wedbush (Outperform/$400), TD Cowen (Buy/$350), Maxim
(Buy/$350) — all raised or reiterated within last 7 days.
```

**Instrument — Paired Debit Spread (Preferred)**
```
Bias: Bullish
Expiry: July 18, 2026 (~32 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1x
  Strikes: Long 300C / Short 320C
  Net Debit: ~$8.00–$9.00 per spread (verify live mid)
  Max Profit: ~$11–12 per spread
  Max Loss: ~$8–9 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 0.5x (half primary)
  Strikes: Long 295P / Short 278P
  Net Debit: ~$4.00–$5.00 per spread (verify live mid)
  Max Profit: ~$12–13 per spread
  Max Loss: ~$4.00–$5.00 per spread (debit paid)

Combined Position:
  Total Debit / Max Loss: ~$10.00–$11.50
  Expected Payout if thesis works: ~$6–7 net
  Expected Payout on violent move against: ~$2–3 net
  Main Risk: time decay; limit entry at $292–$296 strongly preferred
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why Watching | Trigger to Revisit |
|--------|--------------|-------------------|
| ETN | Strong AI data center demand story (Eaton electrical/power); Q1 2026 record results, raised FY2026 guidance to $13.05–$13.50 EPS, revenue +17% YoY. All 3 triggers fired. Score 78/115. | Too extended from 50 EMA (3.86% above EMA50 $396). Insider selling flagged June 10. Wait for pullback to $396–$400 EMA50 zone. |
| NSC | Cleanest technical setup in scan: only 0.43% above EMA50, all 3 triggers, volume declining. Possible catalyst from Union Pacific-NSC merger STB proceedings. Score 77/115. | Weak earnings growth (adjusted EPS -1% YoY, flat revenue). Mixed sector. Wait for Q2 2026 earnings beat (expected July 24–27) or positive STB merger ruling to confirm catalyst. |
| AMGN | Strong biotech with 1.62% above EMA50, all 3 triggers fired. Score 71/115. | Volume was NOT declining on pullback (caution). Wait for volume to confirm healthy consolidation before entry. |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades — this is the first active-scan run. Previous run (2026-04-16) was an empty-scan placeholder._

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

## Scoring Reference (from config.md)

| Category | Max | NVDA | GOOGL | AAPL |
|----------|-----|------|-------|------|
| A — Technical Setup | 55 | 40 | 40 | 40 |
| B — Risk/Reward | 25 | 18 | 18 | 10 |
| C — Fundamentals | 20 | 20 | 16 | 20 |
| D — Catalyst & Momentum | 15 | 15 | 12 | 15 |
| Deductions | — | 0 | 0 | 0 |
| **Total** | **115** | **93** | **86** | **85** |

_Note: B-Xtrender categories (15 pts max within Category A) set to 0 for all — TradingView visual check unavailable (browser-use not installed in this environment). All other category A checks confirmed via yfinance and price data._
