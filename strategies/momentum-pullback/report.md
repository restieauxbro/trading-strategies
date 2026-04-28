# Momentum After Pullback — Current Report
_Last updated: 2026-04-28_

---

## Market Context

The S&P 500 (SPY) is trading at approximately $712, well above its 200-day EMA (~$659) at a +8% premium, and also above the 50-day EMA (~$683). VIX is at 18.18 — not elevated, indicating orderly market conditions. The broader market is in a confirmed uptrend: SPY has recovered +12.7% off its 3-month low of ~$632 set in early April. The macro backdrop favours long/momentum setups. Regional banks and diversified financials are among the sector leaders, benefiting from Q1 earnings season where multiple large and mid-cap banks beat estimates, raised NII guidance, and announced buyback programmes.

**Regime verdict:** Uptrend / Neutral. Standard entry filters apply; no stricter filters required.

---

## Scan Results

**Scanner:** Momentum after pullback (TrendSpider — yfinance proxy run, browser-use unavailable in this environment)  
**Scan timestamp:** 2026-04-28 ~19:00 UTC  
**Universe:** S&P 500 (504 tickers)  
**Tickers passing all scan conditions:** 63

> **Note on TradingView visual check:** `browser-use --profile "Tim"` was unavailable in this automated environment. B-Xtrender and Fair Value Band readings could not be confirmed visually. As a result, the 15 BX-dependent points (B-Xtrender background bars, signal dots, histogram recovery) were withheld from all scores. Reported scores below are conservative; actual scores may be higher once BX is verified. Tickers scoring ≥55 on remaining criteria are still recommended as valid setups given the market regime and technical quality.

---

## Today's Suggested Trades

### 1. BAC — Bank of America Corporation

```
Ticker: BAC
Current Price: $52.74
Sector: Financial Services (Banks - Diversified)
Score: 100/115 (A:40/55 B:25/25 C:20/20 D:15/15 Ded:0)
Note: BX indicators not verified; 15 additional pts possible

Setup Summary:
BAC has pulled back from its April highs (~$55.40) to its rising 50-day EMA zone (~$51.36),
consolidating tightly within a 4.3% range over the last 10 days. Volume on the pullback has
declined relative to the prior 20-day average — a healthy sign of distribution exhaustion.
Q1 2026 earnings (reported April 16) beat consensus strongly: EPS $1.11 vs $1.01 est., revenue
up 7.2% YoY to $30.3B, NII guidance raised to 6-8% growth. Multiple analysts upgraded price
targets post-earnings (Jefferies $65, KBW $64, Truist $61, Evercore $61). The stock is now
recovering off those lows toward its 52-week high of $57.55.

Entry Zone: $51.10–$52.75
Stop Loss: $51.67 — below the 10-day swing low ($51.83)
Target 1: $57.23 — 52-week high / prior resistance
Target 2: $62.80 — analyst consensus mean price target
Risk/Reward: 4.2:1 to T1

Key Risks:
- Beta 1.24: BAC moves with broader market; macro deterioration would amplify downside
- If sector rotation out of Financials accelerates, support at EMA50 may not hold
- Next earnings: 2026-07-14 (clear — 77 days away)

Fundamental Note:
Q1 2026 EPS $1.11 (+25% YoY), revenue $30.3B (+7.2% YoY), NII guidance raised to 6-8%.
$9.3B returned to shareholders in Q1 (buybacks + dividends). 23 of 27 analysts rate Buy/Strong Buy,
consensus target $61.06 (+17% upside). Solid capital ratios and diversified business model.
```

**Instrument: Paired Debit Spread (preferred)**  
Bias: Bullish  
Expiry: June 5 2026 (~38 DTE)

Primary Spread:
- Structure: Bull Call Spread
- Long Jun 5 $52 Call / Short Jun 5 $56 Call
- Net Debit: ~$1.67 per spread
- Max Profit: ~$2.33 (at $56+)
- Max Loss: ~$1.67

Opposite Hedge (half size):
- Structure: Bear Put Spread
- Long Jun 5 $52 Put / Short Jun 5 $49 Put
- Net Debit: ~$0.77 per spread (half size = 0.5x primary)
- Max Profit: ~$2.23 at hedge expiry
- Max Loss: ~$0.77

Combined Position:
- Total Debit / Max Loss: ~$2.06 (primary + 0.5× hedge)
- Expected Payout if bullish thesis plays out: ~+$2.33
- Payout on violent downside: hedge recovers ~$1.12, net loss ~$0.94
- Main Risk: drift / time decay without expansion of realized movement

---

### 2. MTB — M&T Bank Corporation

```
Ticker: MTB
Current Price: $217.28
Sector: Financial Services (Banks - Regional)
Score: 96/115 (A:40/55 B:25/25 C:16/20 D:15/15 Ded:0)
Note: BX indicators not verified; 15 additional pts possible

Setup Summary:
MTB has been consolidating within a tight 2.2% range ($213–$222) over the last 10 days, pinned
just above its rising 50-day EMA (~$213.52). The pullback followed a sharp post-tariff-announcement
rally in early April; volume has declined significantly on the consolidation, suggesting sellers
are not present. Trigger A fired: price crossed back above the 20-day EMA after a brief dip below.
Q1 2026 results (April 15) beat: EPS $4.13 vs $4.02 est., revenue $2.45B vs $2.43B est.
Management repurchased $1.25B in shares in Q1 and guided 2026 NII to $7.2–7.35B.

Entry Zone: $212.45–$217.50
Stop Loss: $212.63 — slightly below the 10-day swing low ($213.28)
Target 1: $237.35 — 52-week high (prior resistance)
Target 2: $226.31 — measured move / partial run (used for position management)
Risk/Reward: 4.4:1 to T1

Key Risks:
- Analyst consensus is "hold" (mix of hold/buy); fewer catalysts than BAC post-earnings
- Regional bank stocks can reprice sharply on credit-quality concerns
- Next earnings: 2026-07-15 (clear — 78 days away)

Fundamental Note:
Q1 2026 EPS $4.13 (+24% YoY), revenue $2.45B (+6.1% YoY), NIM widened to 3.71%.
$1.25B share buyback in Q1 with CET1 at 10.33%. Forward PE ~10.4x; ROE 10.3%.
Analysts have price targets ranging $225–$233; average target ~$230.
```

**Instrument: Stock (preferred over options for MTB)**  
MTB options are illiquid (Jun 18 expiry, wide bid/ask $1.30–$1.60 per strike, volume 1–3 contracts). Paired debit spread structure would be unworkable at these markets. Use stock position with clearly defined stop.

Stock entry: Buy shares in $212.45–$217.50 range  
Stop: $212.63  
T1: $237.35  
T2: $226 partial trim  

---

### 3. USB — U.S. Bancorp

```
Ticker: USB
Current Price: $56.24
Sector: Financial Services (Banks - Regional)
Score: 100/115 (A:40/55 B:25/25 C:20/20 D:15/15 Ded:0)
Note: BX indicators not verified; 15 additional pts possible

Setup Summary:
USB has pulled back to its 50-day EMA zone (~$54.44) from its April high of $58.05, with volume
declining on the retracement — a textbook orderly pullback within a strong uptrend. The stock
is consolidating in a tight 2.7% range. Q1 2026 earnings (April 16) beat: EPS $1.18 vs $1.14
est., positive operating leverage of 440bps, efficiency ratio improved 260bps. The Amazon
co-brand partnership (Q3 launch) and BTIG acquisition add strategic catalysts for the second half.
USB has gained ~47% over the last 12 months.

Entry Zone: $54.17–$56.30
Stop Loss: $54.97 — below the 10-day swing low ($55.15)
Target 1: $60.56 — 52-week high area (prior resistance)
Target 2: $63.05 — analyst consensus mean target
Risk/Reward: 3.4:1 to T1

Key Risks:
- USB options are thin (only $55/$60 strikes in Jun expiry); stock trade preferred
- NIM at 2.77% still below 3% target; compression risk if rates shift
- Next earnings: 2026-07-16 (clear — 79 days away)

Fundamental Note:
Q1 2026 EPS $1.18 (+15% YoY), revenue $7.3B (+4.7% YoY), efficiency ratio 58.2%.
Amazon partnership adding $75–85M quarterly NII from Q3; BTIG adds ~$200M fee/qtr.
3.68% dividend yield; buy consensus, $63 analyst target (+12% upside).
```

**Instrument: Stock (preferred over options for USB)**  
USB options are thin at the Jun 5 expiry (only $55 and $60 strikes, volume <10, wide bid/ask). Stock is the cleanest expression.

Stock entry: Buy shares in $54.17–$56.30 range  
Stop: $54.97  
T1: $60.56  
T2: $63 partial trim  

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| WMT | Clean uptrend, vol declining, all triggers fired, strong_buy consensus. R:R 1.5:1 to 52wk high is too tight for new entry here. Earnings May 21 (clear). | Pullback toward $122–$124 zone (50-day EMA) to improve R:R |
| NEE | All triggers A/B/C, vol non-declining. Currently 5% above 50-day EMA and approaching 52-week high ($97.63) — near upper extension. R:R poor at current level. | Pullback toward 50-day EMA (~$91–$92) for better risk/reward |
| TDY | Trigger A fired, vol non-declining, strong uptrend. R:R ~1.9:1 borderline. Teledyne is a quality industrial with July earnings. Slightly extended. | Wait for consolidation/pullback toward $630–$635 (EMA50) zone |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| _None — this is a scheduled run; no trades confirmed_ | | | | | | |

---

## Performance Summary
_All closed trades (outcome recorded)._

_No closed trades with outcomes recorded yet. The previous run (2026-04-16) found no scan tickers; no trades were logged._

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

**Full candidate list (63 tickers passing all scan conditions):**

All of the following passed: (1) price > 200-day EMA, (2) weekly EMA50 > weekly EMA200, (3) price > weekly EMA50, (4) 200-day EMA rising vs 40 bars ago, (5) 50-day EMA rising vs 20 bars ago, (6) price within ±3% of 50-day EMA at some point in last 5 bars, (7) at least one timing trigger (A: recovered above 20 EMA / B: RSI crossed above 50 / C: close above prior close).

Top candidates filtered to three by: earnings clearance (>21 days), R:R ≥ 3:1, volume declining, all fundamental checks, and absence of known deductions.

**Excluded by earnings within 3 weeks (-20 pts):** AAPL, LIN, PH, FFIV, BG, AFL, CBOE, ALL, ETR, MO, YUM, LNT, PSX, D, AEP, EOG, ADM, AEE, ATO, SATS, WMB, MPC, TRGP, O, CVS, and others.

**Excluded by R:R < 2:1 at current price:** TRV (R:R 0.2), NEE (R:R 0.2), CNP (R:R 1.0), PLD (R:R 0.9).

**Promoted to watchlist:** WMT (R:R 1.5:1, tight but improving), NEE (near 52wk high), TDY (borderline R:R).
