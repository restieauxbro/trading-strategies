# Momentum After Pullback — Current Report
_Last updated: 2026-05-10_

---

## Market Context

The S&P 500 (SPY) is trading at **$737.62**, sitting **10.9% above** its 200-day EMA ($665.40) and well above its 50-day EMA ($694.69). The 200-day EMA trend is **rising**. VIX is calm at **17.19**, indicating a low-fear, risk-on environment. Q1 2026 earnings season was exceptionally strong: 84% of S&P 500 companies beat EPS estimates, blended EPS growth reached 15.1%, and net profit margins hit a record 13.4%. The S&P 500 surged over 10% in April to all-time highs near 7,200. The primary macro headwind is oil above $120/barrel (Brent) following collapsed Iran peace talks, which adds inflation uncertainty. Overall: **confirmed uptrend, normal filters apply** — this is a favourable environment for momentum-pullback entries.

---

## Scan Results

**Scan method:** yfinance fallback (TrendSpider `browser-use` unavailable in scheduled environment)  
**Scan timestamp:** 2026-05-10 19:05 UTC  
**Universe scanned:** 320 S&P 500 representative tickers  
**Tickers passing all conditions:** 35  

Passing tickers: NVDA, JPM, BAC, GS, USB, PNC, TFC, SYF, AFL, MAR, GM, COST, MNST, VLO, PSX, EPD, DE, BA, EXPD, EMR, ROK, AME, DOV, GWW, LIN, APD, NEM, FCX, CF, PLD, PSA, D, AEP, EVRG, FOXA

_Note: B-Xtrender visual confirmation via TradingView was not possible in this unattended run. Scores reflect technical and fundamental data only; BX points are estimated from MACD/momentum proxies. All three top picks should be visually confirmed before live entry._

---

## Outcomes Tracked Today

**No rows due.** The April 16 CSV entry was an empty-scan placeholder (no ticker). No 14-day outcome tracking was required.

---

## Today's Suggested Trades

### 1. MAR — Marriott International — Post-Earnings Pullback to 50 EMA

```
Ticker: MAR
Current Price: $353.18
Sector: Consumer Discretionary (Hospitality)
Score: 104/115 (A:44 B:25 C:20 D:15 Ded:0)

Setup Summary:
MAR reported Q1 2026 on May 6 (EPS $2.72 vs est $2.55; revenue $6.65B vs est $6.59B — beat on
both), yet shares have pulled back 1.85% to test the 50-day EMA ($346.78). Both the daily and
weekly trends are intact (higher-highs / higher-lows structure), with MACD histogram recovering
from its most recent low. The 52-week-high at $380 is the natural first target with ample room
for a 3R+ move to T2. Earnings Aug 4, 2026 — well outside the 3-week exclusion window.

Entry Zone: $350–$356
Stop Loss: $340 — below 20-day swing low and 50-day EMA
Target 1: $378 — near 52-week high resistance
Target 2: $398 — measured move from base
Risk/Reward: 2.2:1 (T1) | 3.6:1 (T2)

Key Risks:
- Middle East conflict dragging on RevPAR (-30% in affected markets); mgmt guided 100-125bps
  full-year drag
- Oil at $120/bbl pressures travel demand at the margin
- Thin daily options OI in near-dated strikes; use June 18 expiry for liquidity

Fundamental Note:
Marriott grew fee revenue +12% YoY to $1.43B in Q1 2026, reached a record development pipeline
(618,000 rooms), and raised 2026 EPS guidance to $11.38–$11.63 (+14-16%). Revenue +6% YoY.
Business travel and APEC RevPAR (+7%) provide diversification from Middle East headwinds.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Expiry: June 18, 2026 (~39 DTE)

Primary Spread (Bull Call):
  Strikes: Long $350 Call / Short $365 Call
  Size: 2 contracts
  Net Debit: ~$9.20 per spread ($920 per lot pair)  [mid: $15.15 - $5.95 = $9.20]
  Max Profit: ~$5.80 per share × 100 = $580 × 2 = $1,160
  Max Loss: $920

Opposite Hedge (Bear Put):
  Strikes: Long $340 Put / Short $330 Put
  Size: 1 contract
  Net Debit: ~$2.70 per spread ($270)  [mid: $7.55 - $4.85 = $2.70]
  Max Profit: ~$7.30 per share × 100 = $730
  Max Loss: $270

Combined Position:
  Total Debit / Max Loss: ~$1,190
  Expected Payout if thesis is right: +$1,160 − $270 = +$890
  Expected Payout on violent move against: +$730 − $920 = −$190 (partial rescue)
  Main Risk: drift / time decay without expansion in realized movement
```

---

### 2. JPM — JPMorgan Chase — Oversold at 50 EMA After Strong Q1

```
Ticker: JPM
Current Price: $302.10
Sector: Financial Services (Diversified Banking)
Score: 102/115 (A:43 B:25 C:19 D:15 Ded:0)

Setup Summary:
JPM pulled back to the 50-day EMA ($304.58) with RSI at 36.7 — the most oversold reading since
the October 2025 correction. Volume on down-days is running below the 20-day average (healthy,
non-distribution pullback). The bank beat Q1 2026 estimates by 7.8% on April 14 (EPS $5.94 vs
est $5.51; revenue $50.54B). With a risk of only ~$4.56/share and a natural target near $320-325
(prior consolidation base), the R:R ratio is attractive at 4+:1. Weekly trend structure is
intact with the weekly golden cross (50 EMA > 200 EMA) in place. Earnings next July 14 — safe.

Entry Zone: $300–$305
Stop Loss: $296 — below recent swing low and 1-ATR buffer
Target 1: $322 — prior base consolidation resistance
Target 2: $337 — near 52-week high ($337.25)
Risk/Reward: 3.0:1 (T1) | 6.0:1 (T2)

Key Risks:
- Morningstar calls shares "fully valued" at $311 — limited upside if market de-rates
- MACD histogram still declining (momentum hasn't fully reversed)
- Fed rate path uncertainty; NIMs could contract if cuts are delayed

Fundamental Note:
JPM delivered record trading revenue ($11.6B) in Q1 2026, with Investment Banking fees up 28%
YoY and AUM reaching $4.8T (+16% YoY). Revenue growth of 12.7% and EPS growth of 17.2% are
well above long-term averages. Analyst consensus target $342.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Expiry: June 18, 2026 (~39 DTE)

Primary Spread (Bull Call):
  Strikes: Long $300 Call / Short $310 Call
  Size: 2 contracts
  Net Debit: ~$4.98 per spread ($996 total)  [mid: $11.70 - $6.72 = $4.98]
  Max Profit: ~$5.02 per share × 100 = $502 × 2 = $1,004
  Max Loss: $996

Opposite Hedge (Bear Put):
  Strikes: Long $295 Put / Short $285 Put
  Size: 1 contract
  Net Debit: ~$2.72 per spread ($272)  [mid: $6.55 - $3.83 = $2.72]
  Max Profit: ~$7.28 per share × 100 = $728
  Max Loss: $272

Combined Position:
  Total Debit / Max Loss: ~$1,268
  Expected Payout if thesis is right: +$1,004 − $272 = +$732
  Expected Payout on violent move against: +$728 − $996 = −$268 (partial rescue)
  Main Risk: drift / compression / slow grind below $310 without expansion
```

---

### 3. EMR — Emerson Electric — Multiple Analyst Upgrades + 50-EMA Bounce

```
Ticker: EMR
Current Price: $141.31
Sector: Industrials (Specialty Industrial Machinery / Automation)
Score: 97/115 (A:44 B:18 C:20 D:15 Ded:0)

Setup Summary:
EMR pulled back 14% from its 52-week high of $165 to test the 50-day EMA ($139.97). The MACD
histogram crossed from negative to nearly flat on May 9, confirming momentum recovery. Most
importantly, EMR just reported Q2 2026 results (May 5) with an EPS beat and strong margin
expansion (+320 bps), and three analysts raised price targets within days: RBC to $169, BMO to
$157, Barclays to $144. Underlying orders grew 5%. RSI at 51.5 just crossed back above 50.
Earnings Aug 5 — safe. Volume on pullback days ran marginally below the 20-day average.

Entry Zone: $140–$143
Stop Loss: $133 — below 20-day swing low ($135.43) with ATR buffer
Target 1: $158 — BMO analyst target / cluster of price targets
Target 2: $165 — near 52-week high / RBC target $169
Risk/Reward: 2.0:1 (T1) | 2.9:1 (T2)

Key Risks:
- Revenue slightly missed Q2 estimates; organic growth guidance trimmed to ~3% from ~4%
- Middle East conflict remains a ~$50M per quarter headwind (~1 ppt impact)
- EMR options are less liquid than JPM/MAR; wider bid/ask spreads expected

Fundamental Note:
EMR reported Q2 2026 EPS of $1.54 (beat vs est ~$1.50). Revenue grew 2.9%, EPS grew 27.9% YoY
with operating margins expanding 320 bps. The $11.2 billion project funnel in power, LNG, and
aerospace/defense supports multi-quarter backlog visibility. Analyst consensus target $164.
```

**Instrument — Paired Debit Spread (Bullish)**

```
Expiry: June 18, 2026 (~39 DTE)

Primary Spread (Bull Call):
  Strikes: Long $140 Call / Short $145 Call
  Size: 2 contracts
  Net Debit: ~$2.15 per spread ($430 total)  [mid: $5.95 - $3.80 = $2.15]
  Max Profit: ~$2.85 per share × 100 = $285 × 2 = $570
  Max Loss: $430

Opposite Hedge (Bear Put):
  Strikes: Long $140 Put / Short $135 Put
  Size: 1 contract
  Net Debit: ~$1.90 per spread ($190)  [mid: $4.90 - $3.00 = $1.90]
  Max Profit: ~$3.10 per share × 100 = $310
  Max Loss: $190

Combined Position:
  Total Debit / Max Loss: ~$620
  Expected Payout if thesis is right: +$570 − $190 = +$380
  Expected Payout on violent move against: +$310 − $430 = −$120 (partial rescue)
  Main Risk: thin option liquidity; drift without directional move; lower OI than large-caps
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| LIN | Exactly at 50 EMA after Q1 beat (May 1); multiple analyst target raises (RBC $570, BMO $560, DB $575); strong guidance increase. Volume on pullback days slightly elevated — suggests some institutional rotation, not yet a clean, declining-volume pullback | Volume on down-days drops below 20-day average; wait for 2–3 sessions of quiet low-volume consolidation near $490–$495 |
| PNC | At 50-day EMA ($216.77), volume declining on pullback, beat Q1 (Apr results), analyst target $255. R:R at current entry is compressed due to tight stop vs. distance to resistance. | Pullback to $210–$212 support zone to improve R:R to ≥2.5:1; next catalyst: Q2 earnings July 15 |
| GWW | Extended +8.8% above 50 EMA, RSI 76.5 — overbought, not a pullback setup. | Pullback to $1,130–$1,150 (near 50 EMA); RSI back below 60 |
| ROK | Extended +13.3% above 50 EMA, RSI 73.0 — overextended. | Pullback to $415–$430 (near 50 EMA) |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

_No confirmed trades in the log._

---

## Performance Summary
_All closed trades (outcome recorded)._

_No completed trades recorded yet. The April 16 scan returned no tickers (empty run)._

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A
