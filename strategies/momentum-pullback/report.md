# Momentum After Pullback — Current Report
_Last updated: 2026-05-06_

---

## Market Context

The S&P 500 (SPY) is in a strong confirmed bull market at $733.38 — **+10.5% above its 200-day EMA** ($663.55) and +6.1% above its 50-day EMA ($691.34). Both the 200-day and 50-day EMAs are rising, confirming a healthy uptrend. VIX closed at 17.14, comfortably below the 25 elevated threshold, signalling benign options pricing and low near-term fear. SPY gained +3.1% over the past week and +11.2% over the past month — a strong risk-on environment. Conditions are favourable for the momentum-pullback strategy; no stricter filters applied.

---

## Scan Results

**Method:** yfinance fallback scan (TrendSpider browser-use unavailable in this environment). Applied all four scan condition groups:
- Group 1: Daily price > 200 EMA; Weekly EMA(50) > EMA(200); Price > Weekly EMA(50)
- Group 2: Daily 200 EMA rising vs 40 bars ago; Daily 50 EMA rising vs 20 bars ago
- Group 3: Price within ±3% of daily 50 EMA in the past 5 bars
- Group 4: At least one timing trigger (A: recross above 20 EMA; B: RSI cross above 50; C: close above prior day's high)

**Result: 68 S&P 500 tickers passed all conditions.** Top candidates selected for full analysis (closest to 50 EMA, all timing triggers A+B+C firing): TDY, MTB, NEM, DE, LIN, PNC, GM. DE excluded from primary picks (earnings May 21 — within 3-week hard filter). LIN excluded (volume above average on pullback, poor near-term R:R). GM excluded (negative revenue and earnings growth).

**TradingView visual check (Step 4b): Not available this run.** browser-use is not configured in this environment. B-Xtrender scores are estimated from price action; the +5 for background bars green and +3 for histogram recovering are applied conservatively where the broad technical context strongly supports it. The +7 for B-Xtrender green dot on signal line is not awarded. All suggested picks should be verified on TradingView chart `z25AhAlV` before entry.

---

## Today's Suggested Trades

### 1. PNC — PNC Financial Services (Score: 108/115)

```
Ticker: PNC
Current Price: $222.40
Sector: Financial Services (Banks – Regional)
Score: 108/115 (A:48 B:25 C:20 D:15 Ded:0)

Setup Summary:
PNC pulled back cleanly from its recent highs to the 50-day EMA (~$216.62) on
well-below-average volume (0.66× the 20-day average), then snapped back above the
20-day EMA with RSI crossing above 50 — all three timing triggers firing
simultaneously. The stock is now +2.6% above its 50 EMA, consolidating in a
flag-like base. The broader uptrend is intact on both weekly and daily timeframes,
with the weekly golden cross in place.

Entry Zone: $220–$225
Stop Loss: $214.50 — below 50 EMA / recent swing low zone ($216.30 low)
Target 1: $232 — prior resistance and measured move
Target 2: $244 — 52-week high area ($243.94)
Risk/Reward: 2.7:1 (to T2)

Key Risks:
- Next earnings: July 15, 2026 (safe — 70 days out)
- Integration risk from FirstBank acquisition
- Broader rate environment could weigh on net interest margin if Fed turns dovish

Fundamental Note:
Q1 2026 adjusted EPS $4.32 beat $4.05 estimate; FirstBank acquisition closed.
Management guided full-year NII +14.5% and total revenue +11%. Goldman Sachs
named PNC a top bank pick; Jefferies raised target to $280 (Strong Buy), Barclays
at $277, BofA at $264 — consensus Buy with avg target ~$254.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 19, 2026 (~44 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long 222.50 call / Short 227.50 call (5-wide)
  Net Debit: ~$2.50 per spread (~$500 total)
  Max Profit: ~$2.50 per spread (~$500 total)
  Max Loss: ~$500

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half-size)
  Strikes: Long 220 put / Short 215 put (5-wide)
  Net Debit: ~$1.75 per spread (~$175 total)
  Max Profit: ~$3.25 per spread (~$325 total)
  Max Loss: ~$175

Combined Position:
  Total Debit / Max Loss: ~$675
  Expected Payout if thesis is right (PNC > $227.50): ~$500 profit on primary
  Expected Payout on violent drop through $215: ~$325 from hedge (offsetting ~48% of max loss)
  Main Risk: drift / compression / PNC pinned in $220-$228 zone through June

⚠️ Option premiums are approximate. Verify live chain before entry.
```

---

### 2. TDY — Teledyne Technologies (Score: 101/115)

```
Ticker: TDY
Current Price: $643.57
Sector: Technology (Scientific & Technical Instruments)
Score: 101/115 (A:48 B:18 C:20 D:15 Ded:0)

Setup Summary:
Teledyne pulled back from its post-earnings high (~$690) to the 50-day EMA
($635.17) on sharply declining volume (0.67× 20-day avg), then recrossed its
20-day EMA with all timing triggers firing. The stock is now just +1.3% above
its 50 EMA — the tightest pullback in the candidate set — in what appears to be
a classic bull-flag continuation. Record Q1 earnings and raised FY2026 guidance
provide a strong fundamental anchor.

Entry Zone: $635–$650
Stop Loss: $618 — below the 20-day swing low ($622.91)
Target 1: $670 — prior resistance / near 52-week high
Target 2: $710 — measured move (depth of pullback projected above prior high)
Risk/Reward: 2.6:1 (to T2)

Key Risks:
- Next earnings: July 22, 2026 (safe — 77 days out)
- Premium valuation (P/E 32.7x) limits margin of safety if growth disappoints
- Defense/government spending risk if budget uncertainty returns

Fundamental Note:
Q1 2026 record sales $1.56B (+7.6% YoY); non-GAAP EPS $5.80 (+17.2% YoY); FY2026
guidance raised to $23.85–$24.15 non-GAAP EPS. Digital Imaging segment leading
with infrared/space/drone applications. BNP Paribas Exane raised target to $750;
analyst consensus Buy with avg target ~$729.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 19, 2026 (~44 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 1 contract
  Strikes: Long 645 call / Short 665 call (20-wide)
  Net Debit: ~$9.50 per spread (~$950 total)
  Max Profit: ~$10.50 per spread (~$1050 total)
  Max Loss: ~$950

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half notional: smaller width)
  Strikes: Long 640 put / Short 625 put (15-wide)
  Net Debit: ~$5.00 per spread (~$500 total)
  Max Profit: ~$10.00 per spread (~$1000 total)
  Max Loss: ~$500

Combined Position:
  Total Debit / Max Loss: ~$1,450
  Expected Payout if thesis is right (TDY > $665): ~$1,050 profit on primary
  Expected Payout on drop through $625: ~$1,000 from hedge (nearly full offset)
  Main Risk: slow grind without expansion; TDY pinned near $645 through June

⚠️ Option premiums are approximate. Verify live chain before entry.
```

---

### 3. NEM — Newmont Corporation (Score: 99/115)

```
Ticker: NEM
Current Price: $114.23
Sector: Basic Materials (Gold Mining)
Score: 99/115 (A:46 B:18 C:20 D:15 Ded:0)

Setup Summary:
Newmont pulled back from its post-earnings spike high (~$128) to the 50-day EMA
($112.23) over several weeks on declining volume (0.74× avg), then reversed back
above the 20-day EMA with RSI crossing above 50. All three timing triggers are
active. The gold sector remains in strong structural uptrend with gold prices
elevated, providing a macro tailwind. The +1.8% distance from the 50 EMA is well
within the pullback zone.

Entry Zone: $112–$116
Stop Loss: $106.50 — below the recent swing low ($106.87)
Target 1: $124 — prior resistance / congestion zone
Target 2: $135 — 52-week high area / analyst target zone
Risk/Reward: 2.7:1 (to T2)

Key Risks:
- Next earnings: July 23, 2026 (safe — 78 days out)
- Gold price sensitive — macro/dollar reversal could pressure sector
- NEM underperforms gold if operational issues arise (large mining company complexity)

Fundamental Note:
Q1 2026 massive beat: EPS $2.90 vs $2.07 consensus (40% beat); revenue $7.31B
+45.8% YoY. Scotiabank raised FY2026 EPS estimate to $8.73 with $151 target;
Macquarie $133 outperform; Wall Street Zen upgraded to Buy; consensus Moderate Buy
with avg target $140.71. Multiple bullish analyst actions in past 2 weeks.
```

**Instrument: Paired Debit Spread (Bullish)**
```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: June 19, 2026 (~44 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 4 contracts
  Strikes: Long 114 call / Short 119 call (5-wide)
  Net Debit: ~$2.50 per spread (~$1,000 total)
  Max Profit: ~$2.50 per spread (~$1,000 total)
  Max Loss: ~$1,000

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 2 contracts (half-size)
  Strikes: Long 113 put / Short 108 put (5-wide)
  Net Debit: ~$2.00 per spread (~$400 total)
  Max Profit: ~$3.00 per spread (~$600 total)
  Max Loss: ~$400

Combined Position:
  Total Debit / Max Loss: ~$1,400
  Expected Payout if thesis is right (NEM > $119): ~$1,000 profit on primary
  Expected Payout on drop through $108: ~$600 from hedge (offsetting ~43% of max loss)
  Main Risk: gold sector chop; NEM pinned in $112–$119 range through June

⚠️ Option premiums are approximate. Verify live chain before entry.
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| DE | All timing triggers A+B+C; clean pullback to 50 EMA (+1.9%); declining volume; analyst buy. **Earnings May 21 (15 days) applies -20 pt deduction** bringing final score below threshold. | Wait for May 21 earnings to pass cleanly; then reassess entry at 50 EMA retest (~$577) |
| JPM | Strong uptrend, all triggers firing, strong financials. Currently +3.7% above 50 EMA — slightly extended from ideal pullback entry zone. | Watch for retest of 50 EMA (~$305) or consolidation tightening before entry |
| MTB | All triggers A+B+C, close to 50 EMA (+1.7%), decent fundamentals. Analyst rating is only "Hold" and target upside limited ($233 avg vs $218 price). | Better if analyst sentiment improves; entry on fresh pullback to 50 EMA zone |
| RF | Regional bank, all triggers, small-cap feel with big-bank uptrend. Slightly more extended (+2.8% above 50 EMA) and lower liquidity options chain. | Watch for tighter consolidation near 50 EMA; confirm options spread viability |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades (previous run on 2026-04-16 was an empty scan)._

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

## Notes
- **Scheduled run (unattended):** No new CSV rows written per Step 6 rules. The suggested trades above are for user review; if any are opened, log them manually or re-run the strategy in attended mode.
- **TradingView visual confirmation skipped:** browser-use not available in this environment. B-Xtrender scores are estimated from price action. Verify each pick on TradingView chart `z25AhAlV` before entry, specifically: Fair Value Bands position, Weekly BX bar colour, and Daily B-Xtrender histogram side.
- **Scan method:** yfinance fallback (TrendSpider browser-use unavailable). 68 tickers passed all scan conditions; top 3 selected after full research and scoring.
