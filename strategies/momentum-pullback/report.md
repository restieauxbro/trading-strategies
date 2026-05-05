# Momentum After Pullback — Current Report
_Last updated: 2026-05-05_

---

## Market Context

The S&P 500 (SPY) closed at $724.51 on May 5, 2026 — **9.1% above its 200-day EMA ($664.32)** and **5.1% above its 50-day EMA ($689.65)**. The market posted a strong +10.9% gain over the past 30 trading days, recovering sharply from the April tariff-related volatility. VIX stands at **17.28**, well below the 25 danger zone, signalling a return to a low-fear, risk-on environment. The overall trend is a confirmed uptrend; no stricter filters are required. Conditions are broadly supportive for momentum continuation entries.

---

## Scan Notes

TrendSpider browser-use was unavailable in this environment. The scan logic from `config.md` was replicated in Python using yfinance — checking all 503 S&P 500 constituents for: (1) daily price > 200 EMA, (2) weekly golden cross (50 EMA > 200 EMA), (3) weekly price > weekly 50 EMA, (4) rising 200 EMA (vs 40 bars ago), (5) rising 50 EMA (vs 20 bars ago), (6) price within ±3% of daily 50 EMA in the last 5 bars, and (7) at least one timing trigger (20 EMA recross, RSI crossing back above 50, or close above prior high).

**50 tickers passed the scan.** The scan timestamp is 2026-05-05 19:00 UTC.

**TradingView visual confirmation (B-Xtrender)** was unavailable this session due to browser-use not being accessible. B-Xtrender scoring points (Cat A: green bars, green dot, histogram) are excluded from scores below. This is noted as a data limitation — live operator should visually confirm BX before entry.

---

## Excluded by Hard Filter (Earnings within 3 Weeks)

- **NRG** — Earnings May 6, 2026 → −20 pt deduction, disqualified (also CEO change risk)
- **EMR** — Earnings May 5, 2026 (today, after close) → −20 pt deduction, disqualified
- **MAR** — Earnings May 6, 2026 → −20 pt deduction, disqualified

---

## Today's Suggested Trades

### 1. BAC — Bank of America Corporation

```
Ticker: BAC
Current Price: $53.26
Sector: Financial Services (Banks - Diversified)
Score: 95/115 (A:35 B:25 C:20 D:15 Ded:0)
Note: B-Xtrender not confirmed (browser unavailable); score excludes BX points

Setup Summary:
Bank of America has pulled back from a $57.55 52-week high to test its daily
50 EMA (~$51.65), with volume declining sharply to 0.61x the 20-day average —
a healthy consolidation fingerprint. Price is now 3.1% above the 50 EMA and
recrossing the 20 EMA, with RSI at 58 (neutral-to-recovering). The weekly
chart shows a clean golden cross and price above the weekly 50 EMA. The 200
EMA ($50.31) sits just below the 50 EMA, providing a tight, well-defined
stop zone.

Entry Zone: $52.00–$54.00 (50 EMA region; add on dips toward $52)
Stop Loss: $50.25 — below 50 EMA and 200 EMA cluster (confluence stop)
Target 1: $57.20 — prior 52-week high
Target 2: $62.00 — analyst consensus mean target
Risk/Reward: 1.7:1 at T1 / 3.6:1 at T2

Key Risks:
- Very tight stop zone (200 EMA at $50.31 is close); a gap-down could stop out quickly
- Financials sector broadly — macro rate sensitivity
- Next earnings Q2: July 14, 2026 ✓ (well clear of 3-week rule)

Fundamental Note:
Beat Q1 2026 estimates: EPS $1.11 vs $1.00 est., revenue $30.3B (up 10% YoY).
Net interest income guidance raised to +6–8% for 2026. Multiple analyst upgrades
including Jefferies (Buy, $65 target) and Daiwa (Overweight, $61 target). 24.4%
YoY EPS growth. Strong_buy consensus. Analyst mean target: $62.93.
```

**Instrument: Paired Debit Spread (preferred)**
```
Bias: Bullish
Expiry: June 18 2026 (~44 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long $52.5 / Short $55
  Net Debit: ~$1.22/share (~$244 for 2 contracts)
  Max Profit: ~$256 (if BAC ≥ $55 at expiry)
  Max Loss: ~$244

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half-size)
  Strikes: Long $52 / Short $50
  Net Debit: ~$0.75/share (~$75)
  Max Profit: ~$125 (if BAC ≤ $50 at expiry)
  Max Loss: ~$75

Combined Position:
  Total Debit / Max Loss: ~$319
  Expected Payout if thesis is right (BAC ≥ $55): ~$256 − $75 = ~$181
  Expected Payout on violent move against thesis (BAC ≤ $50): ~$125 − $244 = ~−$119
  Main Risk: drift / compression / BAC pinning between $50–$55
```

---

### 2. PNC — PNC Financial Services Group

```
Ticker: PNC
Current Price: $222.76
Sector: Financial Services (Banks - Regional)
Score: 95/115 (A:35 B:25 C:20 D:15 Ded:0)
Note: B-Xtrender not confirmed (browser unavailable); score excludes BX points

Setup Summary:
PNC pulled back from a $242 high to the 50 EMA zone (low ~$212 in late April),
volume dried up sharply (0.51x average — strong "healthy consolidation" signal),
and is now recrossing the 20 EMA and re-accelerating. RSI recovered from ~42 to
56, crossing back above 50 in the process. The weekly structure is clean: golden
cross, price above weekly 50 EMA, rising 200 EMA. This is a textbook 50 EMA
pullback entry with multiple timing triggers.

Entry Zone: $218–$225 (50 EMA cluster; current price is in-zone)
Stop Loss: $211.50 — below the April swing low and 50 EMA
Target 1: $242 — prior 52-week high / strong resistance
Target 2: $254 — analyst consensus mean target (multiple upgrades post-Q1)
Risk/Reward: 2.1:1 at T1 / 3.7:1 at T2

Key Risks:
- PNC options have wider spreads than BAC — expect slippage on spread execution
- Regional bank sector sensitivity to deposit/credit quality macro data
- FirstBank integration costs may weigh on near-term EPS headlines
- Next earnings Q2: ~mid-July 2026 ✓

Fundamental Note:
Beat Q1 2026 estimates: adj. EPS $4.32 vs $4.05 est. Revenue growth 13.8% YoY,
EPS growth 17.8% YoY. Completed FirstBank acquisition (Jan 2026), adding $26B
assets. Full-year guidance raised: loans +11%, NII +14.5%, total revenue +11%.
Multiple analyst upgrades: Oppenheimer raised target to $268, BofA raised to $264.
```

**Instrument: Paired Debit Spread (preferred)**
```
Bias: Bullish
Expiry: June 18 2026 (~44 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long $220 / Short $230
  Net Debit: ~$4.70/share (~$940 for 2 contracts)
  Max Profit: ~$1,060 (if PNC ≥ $230 at expiry)
  Max Loss: ~$940

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half-size)
  Strikes: Long $220 / Short $210
  Net Debit: ~$3.27/share (~$327)
  Max Profit: ~$673 (if PNC ≤ $210 at expiry)
  Max Loss: ~$327

Combined Position:
  Total Debit / Max Loss: ~$1,267
  Expected Payout if thesis is right (PNC ≥ $230): ~$1,060 − $327 = ~$733
  Expected Payout on violent move against thesis (PNC ≤ $210): ~$673 − $940 = ~−$267
  Main Risk: drift / compression / PNC pinning between $210–$230
  ⚠️ Option liquidity note: PNC spreads are wider than BAC — use limit orders at mid.
```

---

### 3. LIN — Linde PLC

```
Ticker: LIN
Current Price: $501.33
Sector: Basic Materials (Specialty Chemicals — Industrial Gas)
Score: 95/115 (A:35 B:25 C:20 D:15 Ded:0)
Note: B-Xtrender not confirmed (browser unavailable); score excludes BX points

Setup Summary:
Linde pulled back from a $521 high to tag the 50 EMA zone (~$492 area) following
a brief consolidation. Volume contracted to 0.75x average on the decline — healthy
pullback profile. Linde reported strong Q1 earnings on May 1 (beat EPS $4.33 vs
est. $4.27, revenue +8.2% YoY), raised full-year guidance, and triggered a wave
of analyst upgrades with new targets of $530–$585. The stock recrossed its 20 EMA
and RSI is recovering from below 50 back above 50. This is a high-conviction
post-earnings-reset pullback in a world-class industrial compounder.

Entry Zone: $496–$505 (near 50 EMA / post-earnings support)
Stop Loss: $482 — below the post-earnings gap fill and 50 EMA −2% zone
Target 1: $521 — prior 52-week high (resistance; now potential breakout level)
Target 2: $548 — midpoint between analyst consensus $533 and Goldman/Citi target $585
Risk/Reward: 1.6:1 at T1 / 2.3:1 at T2

Key Risks:
- LIN options have wider bid-ask spreads — paired debit spread has meaningful slippage risk
- If using spreads, consider stock position with a hard stop instead
- Price already up ~9% from the April lows — less upside to T1 vs T2 for R:R
- Next earnings Q2 2026 expected ~August 2026 ✓ (well clear)

Fundamental Note:
Q1 2026: EPS $4.33 (beat), revenue $8.78B (+8.2% YoY). Full-year 2026 adj. EPS
guidance raised to $17.60–$17.90 (7–9% growth). Quarterly dividend $1.60. LIN is
the largest global industrial gas company, benefiting from long-term contracts and
data center / clean energy demand. 12 out of 12 recent analyst ratings are Buy or
Strong Buy; Goldman Sachs target $585 (+16% upside). Revenue growth 8.2% YoY,
EPS growth 13.4% YoY, analyst consensus target ~$533.
```

**Instrument: Paired Debit Spread (preferred) — or Stock with Hard Stop**
```
Bias: Bullish
Expiry: June 18 2026 (~44 DTE)

⚠️ LIN options have wider spreads (e.g. $500 call: bid $16.6 / ask $19.3). 
Slippage on both legs is significant. Consider stock with hard stop at $482
as primary instrument if option spreads are unattractive at execution.

Primary Spread (if using options):
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long $500 / Short $515
  Net Debit: ~$7.60/share (~$1,520 for 2 contracts)
  Max Profit: ~$1,480 (if LIN ≥ $515 at expiry)
  Max Loss: ~$1,520

Opposite Hedge (if using options):
  Structure: Bear Put Spread
  Size: 1 contract (half-size)
  Strikes: Long $495 / Short $480
  Net Debit: ~$5.75/share (~$575)
  Max Profit: ~$925 (if LIN ≤ $480 at expiry)
  Max Loss: ~$575

Combined Position (options):
  Total Debit / Max Loss: ~$2,095
  Expected Payout if thesis is right (LIN ≥ $515): ~$1,480 − $575 = ~$905
  Expected Payout on violent move against thesis (LIN ≤ $480): ~$925 − $1,520 = ~−$595
  Main Risk: option illiquidity and spread slippage

Stock Alternative:
  Entry: $496–$505
  Stop: $482 (hard stop)
  Target 1: $521
  Target 2: $548
  R:R: 2.3:1 at T2 with defined stop
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing or extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| JPM | Clean pullback to 50 EMA, beat Q1, strong analyst support ($337 target). Score 84. Watchlist due to sector concentration (already have BAC + PNC in same run). | On a fresh pullback to 50 EMA (~$295–$305) with volume contraction |
| INCY | FDA Jakafi XR approval, strong Q1 beat (+21% revenue), pipeline catalysts. Score 74. Volume on pullback not declining (1.09x) and option spreads too wide for neat spread construction. | Volume clearly declining on next pullback (< 0.85x avg); option spreads tightening |
| DAL | Triple trigger, strong recovery from April lows. Score 46 (failed R:R threshold — too extended above 50 EMA). | Pullback to $65–$67 range (50 EMA zone) on declining volume |
| NRG | Strong technical setup, strong analyst target $201+, DataCenter/AI tailwind. EXCLUDED this run: earnings May 6. | Post-earnings reaction settles; entry on pullback to $148–$152 zone |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

_(No confirmed open trades — this is a scheduled/unattended run. See Step 6 note.)_

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| 2026-04-16 | _(empty scan)_ | — | — | — | — |

### Aggregate Stats
- **Total closed trades:** 0 (one empty-scan row, no ticker)
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A
