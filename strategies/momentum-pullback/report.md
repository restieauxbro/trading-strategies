# Momentum After Pullback — Current Report
_Last updated: 2026-06-04_

---

## Market Context

The S&P 500 (SPY) is trading at $757.84, approximately 11.3% above its 200-day SMA ($681.05) and 6.5% above its 50-day SMA ($711.91) — a clear bull-market condition. VIX is ~15.7, well below the 25 caution threshold. The broader trend is an uptrend with record index levels following a sharp V-recovery from the March 2026 correction lows (~6,320). However, market breadth has narrowed since mid-April: only ~46–59% of S&P 500 constituents are above their respective 200-day MAs, and JPMorgan analysts note RSI divergence at the index level. Overall assessment: **constructive uptrend with selective risk** — position-trade entries in strong individual setups remain favourable; avoid over-exposure to momentum-stretched names lacking pullback.

**Scan note — browser-use unavailable:** The TrendSpider live UI scan was unavailable (browser-use CLI not installed). The yfinance-based fallback scanner (`scripts/momentum_pullback_scan.py`) was used instead; it implements the identical scan conditions from `config.md`. Universe fetched from Wikipedia S&P 500 list (150 large-caps processed due to fallback limit). Timestamp: 2026-06-04 19:02 UTC.

**TradingView visual check note — Step 4b:** The `browser-use --profile "Tim" --headed` session required for B-Xtrender / Fair Value Band reading was unavailable in this automated environment. B-Xtrender scoring points (Categories A.6–A.8, up to 15 pts) could **not** be awarded. All scores below reflect technical + fundamental analysis only; B-Xtrender visual confirmation should be performed before opening any trade.

---

## Today's Suggested Trades

### 1. XOM — Exxon Mobil: Momentum Pullback to 50 EMA with Energy Catalyst

```
Ticker: XOM
Current Price: $152.53
Sector: Energy (Oil & Gas Integrated)
Score: 93/115 (A:40 B:18 C:20 D:15 Ded:0)
Note: B-Xtrender visual check not performed (+15 pts possible if confirmed bullish)

Setup Summary:
XOM has pulled back precisely to its daily 50 EMA ($151.12), a near-textbook momentum
pullback in a clean uptrend. Volume declined on the pullback and all three Group 4 timing
triggers fired simultaneously (EMA20 recross, RSI cross above 50, close above prior day
high). The stock sits 0.93% above the 50 EMA with the weekly 50/200 golden cross intact
and the 200-day EMA rising steadily (40-bar lookback confirms). Multiple analyst upgrades
from Barclays ($182 target), Mizuho ($175 target), and JPMorgan in the last two weeks
reflect a re-rating of energy equities linked to tighter Middle East supply conditions.

Entry Zone: $150–$154 (50 EMA pullback zone)
Stop Loss: $147.50 — below recent swing low and EMA50 support cushion
Target 1: $165 — prior resistance / measured move (~8.2% upside)
Target 2: $175 — Mizuho analyst target, Barclays $182; 14.7% upside
Risk/Reward: 2.5:1 to T1

Key Risks:
- Oil price reversal if Middle East tensions de-escalate faster than expected
- Next earnings July 31–Aug 7, 2026 (~57 days — CLEAR of 3-week filter)
- Energy sector crowding risk if multiple upgrades lead to extended valuation

Fundamental Note:
Q1 2026 beat: adj EPS $1.16 vs $1.02 est (+13.7%); revenue +2.4% YoY to $83.2B.
Adj EPS ex-timing effects $2.09 vs $1.73 in Q1 2025 (+20.8%). Golden Pass LNG
delivered its first cargo; Guyana production >900,000 bbl/day record. Q2 2026 consensus
EPS estimate revised to $3.73, up dramatically from $1.64 ninety days ago.
```

**Instrument: Paired Debit Spread (Bullish) — July 17, 2026 expiry (43 DTE)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~43 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $150C / Sell $155C
  Net Debit: ~$2.40 per spread (~$240 per contract)
  Max Profit: ~$2.60 per spread (~$260 per contract, $520 total)
  Max Loss: ~$2.40 per spread ($480 total for 2 contracts)
  Note: Strikes nearest ATM; good OI ($150C: 7044, $155C: 5922)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy $150P / Sell $140P
  Net Debit: ~$3.10 per spread (~$310 total)
  Max Profit: ~$6.90 per spread (~$690 total)
  Max Loss: ~$3.10 per spread ($310 total)
  Note: $150P OI 7703, $140P OI 4800 — liquid

Combined Position:
  Total Debit / Max Loss: ~$790
  Expected Payout if thesis (XOM ≥ $155): ~+$210 (~+27%)
  Expected Payout on violent move against thesis (XOM ≤ $140): ~+$210 (~+27%)
  Main Risk: XOM stays pinned between $140–$155 near expiry (full loss of $790 debit)
```

---

### 2. UNP — Union Pacific: Merger Catalyst + EMA50 Pullback

```
Ticker: UNP
Current Price: $262.07
Sector: Industrials (Railroads)
Score: 81/115 (A:33 B:18 C:15 D:15 Ded:0)
Note: B-Xtrender visual check not performed; volume NOT declining on pullback (no vol pts)

Setup Summary:
Union Pacific has pulled back to 0.90% above its daily 50 EMA ($259.72) with RSI crossing
above 50 and closing above prior day's high. The primary catalyst is the UP-NS merger:
the STB accepted the revised UP/Norfolk Southern merger application on May 28, 2026
and the transaction is on track for mid-2027 completion. CEO Jim Vena clarified on June 4
(today) that UNP does not need government equity participation, reinforcing financial
strength. Raymond James reiterated Strong Buy after Q1 2026 beat; 13 analysts revised
EPS upward for the upcoming period.

Entry Zone: $260–$265 (50 EMA pullback zone)
Stop Loss: $255 — below 50 EMA + buffer (below post-pullback low)
Target 1: $278 — just below year high $279.70 (~6.1% upside)
Target 2: $290+ — post-year-high breakout / merger premium pricing
Risk/Reward: 2.25:1 to T1

Key Risks:
- Merger regulatory risk: STB process held in abeyance pending supplemental info (due Jul 27)
- Volume NOT declining on pullback — reduced conviction signal vs ideal setup
- Q1 2026 EPS $2.93 was slightly below Q1 2025 $3.03 (-3.3% YoY); monitoring
- Next earnings July 23, 2026 (~49 days — CLEAR of 3-week filter)

Fundamental Note:
Q1 2026: Revenue +3.2% YoY to $6.22B (beat $6.12B estimate); EPS $2.93 beat $2.86
est. Management reaffirmed mid-single-digit EPS growth 2026 outlook. UP-NS merger
adds strategic optionality; combined network would be ~50,000 route miles across 43 states.
```

**Instrument: Paired Debit Spread (Bullish) — July 17, 2026 expiry (43 DTE)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~43 DTE)
Caution: UNP options have wider bid-ask spreads than XOM; monitor fill quality.

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $265C / Sell $270C
  Net Debit: ~$2.00 per spread (~$200 per contract, $400 total)
  Max Profit: ~$3.00 per spread (~$300 per contract, $600 total)
  Max Loss: ~$400 total
  Note: $265C bid/ask $8.30/$8.90; $270C bid/ask $6.30/$6.90

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy $260P / Sell $250P
  Net Debit: ~$3.55 per spread (~$355 total)
  Max Profit: ~$6.45 per spread (~$645 total)
  Max Loss: ~$355 total
  Note: $260P bid/ask $7.30/$7.80; $250P bid/ask $3.80/$4.20

Combined Position:
  Total Debit / Max Loss: ~$755
  Expected Payout if thesis (UNP ≥ $270): ~+$245 (~+32%)
  Expected Payout on violent move against thesis (UNP ≤ $250): ~+$245 (~+32%)
  Main Risk: UNP drifts between $250–$270 near expiry (full loss of $755 debit)
  Secondary note: If option liquidity is poor at execution, consider buying 5–10 shares
  of UNP stock as an alternative primary instrument (same stop/target logic applies).
```

---

### 3. PM — Philip Morris International: Smoke-Free Transformation Pullback

```
Ticker: PM
Current Price: $175.85
Sector: Consumer Defensive (Tobacco)
Score: 77/115 (A:38 B:10 C:16 D:13 Ded:0)
Note: B-Xtrender visual check not performed

Setup Summary:
Philip Morris has pulled back to 0.80% above its daily 50 EMA ($174.45) with declining
volume confirming a healthy consolidation rather than distribution. The IQOS smoke-free
transformation thesis remains very much in play: smoke-free products hit 43% of Q1 2026
revenues, IQOS international volume up ~11%, and ZYN/VEEV contributing multicategory
upside. Q1 2026 adjusted EPS $1.96 vs $1.83 expected (+7.1%); Q2 guidance set at
$2.02–$2.07. The stock has pulled back from recent highs near $180 and is testing
support at the 50 EMA zone.

Entry Zone: $173–$177 (50 EMA pullback zone)
Stop Loss: $170 — below 50 EMA ($174.45) with cushion
Target 1: $186 — prior resistance / post-earnings high zone (~5.8% upside)
Target 2: $193 — 52-week high ($193.05; ~9.7% upside)
Risk/Reward: 1.74:1 to T1

Key Risks:
- RSI at 47.6 (below 50) — weaker momentum signal than ideal; only single trigger fired
- Japan yen weakness a recurring headwind on reported earnings
- Tobacco sector regulatory risk (FDA/international restrictions on smokeless products)
- Next earnings July 22, 2026 (~48 days — CLEAR of 3-week filter)

Fundamental Note:
Q1 2026: adj EPS $1.96 vs $1.60 Q1 2025 (+22.5% YoY); revenue +9% to $10.1B.
Smoke-free products now 43% of revenues — structural shift de-risking tobacco dependence.
18 consecutive years of dividend increases; current yield ~3.8%. 2026 FY EPS guidance
$8.36–$8.51 adj (+10.9–12.9% currency-neutral growth).
```

**Instrument: Paired Debit Spread (Bullish) — July 17, 2026 expiry (43 DTE)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~43 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $175C / Sell $180C
  Net Debit: ~$2.30 per spread (~$230 per contract, $460 total)
  Max Profit: ~$2.70 per spread (~$270 per contract, $540 total)
  Max Loss: ~$460 total
  Note: $175C bid/ask $7.00/$7.40 (168 vol today); $180C bid/ask $4.70/$5.10

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract
  Strikes: Buy $175P / Sell $165P
  Net Debit: ~$3.58 per spread (~$358 total)
  Max Profit: ~$6.43 per spread (~$643 total)
  Max Loss: ~$358 total
  Note: $175P bid/ask $6.30/$7.00; $165P bid/ask $2.95/$3.20

Combined Position:
  Total Debit / Max Loss: ~$818
  Expected Payout if thesis (PM ≥ $180): ~+$182 (~+22%)
  Expected Payout on violent move against thesis (PM ≤ $165): ~+$183 (~+22%)
  Main Risk: PM stays pinned between $165–$180 near expiry (full loss of $818 debit)
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension / R:R)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| LIN | Linde: excellent fundamentals (8–10% EPS growth, consensus $540+ target, UBS $600), beat Q1, strong buy consensus — but no volume declining on pullback and T1 at year high $521 gives poor R:R (1.3:1). Score 68/115 with 0 for R:R. | Deeper pullback to $495–$500 (closer to 50 EMA) OR confirmed close above $521 year high with volume expansion |
| NSC | Norfolk Southern: clean pullback to EMA50 (-0.82%), volume declining, trigger fired. UP is acquiring NSC (merger announced, STB review ongoing). Interesting momentum setup but correlated with UNP pick above. | STB supplemental filing progress (due Jul 27) or independent technical breakout above $310 |
| OKE | ONEOK: very clean pullback with all 3 triggers and declining volume (score 60/115), but R:R to any realistic T1 < 1.5:1 and missed Q1 2026 earnings by 6.1%. | Confirmed breakout and hold above $92 resistance, or deeper test of $85 creating better R:R entry |
| ETN | Eaton: 6.15% above EMA50 (too extended from pullback zone), volume declining and RSI 59.4. Not a clean pullback. | Pullback toward EMA50 (~$395 area) with volume contraction |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| _none_ | | | | | | |

_No confirmed trades. This is a scheduled/unattended run — suggested trades above are for review only. Per Step 6, no CSV rows appended in scheduled runs._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| _no closed trades yet_ | | | | | |

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Scan Details
_Run: 2026-06-04 19:02 UTC — yfinance fallback scanner (browser-use/TrendSpider unavailable)_
_All 22 scan passers (raw list):_ GOOGL, TSLA, XOM, COST, MRK, LIN, PM, PLD, C, UNP, EOG, MO, NSC, ETN, SNPS, PNC, WELL, AFL, CARR, HLT, FANG, OKE

_Tickers researched in detail (top 6 by pullback quality):_ XOM, PM, UNP, LIN, AFL, OKE

_Tickers not individually researched (below priority threshold or duplicated):_ GOOGL, TSLA, COST, MRK, PLD, C, EOG, MO, NSC, ETN, SNPS, PNC, WELL, CARR, HLT, FANG
