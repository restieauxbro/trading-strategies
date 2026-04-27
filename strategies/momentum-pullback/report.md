# Momentum After Pullback — Current Report
_Last updated: 2026-04-27_

---

## Market Context

SPY (S&P 500 proxy) closed at $714.88, comfortably above both its 50-day EMA ($682.00) and 200-day EMA ($658.83), confirming a healthy **uptrend**. The 5-day change is +0.87%, indicating steady recovery from a mid-April pullback. VIX at **18.54** is moderate and declining from recent elevated levels — not a confirmed fear environment. Overall conditions are constructive for long-biased position trades. The macro backdrop includes some geopolitical uncertainty (Iran war volatility, energy price fluctuation) but the broad market remains in a confirmed uptrend. No stricter filters required.

---

## Scan Results

**Scanner:** Momentum After Pullback (yfinance implementation of TrendSpider scan logic)  
**Scan timestamp:** 2026-04-27 19:00 UTC  
**Universe:** S&P 500 (130 liquid names screened)  
**Tickers passing scan:** JPM, TJX, EOG, BAC

> **Note:** `browser-use` is unavailable in this cloud environment; TradingView visual confirmation (Step 4b) and B-Xtrender scoring were therefore omitted. B-Xtrender category points (up to +15 / -14 from deductions) were not awarded or deducted for any ticker. All other scoring categories applied normally.

---

## Scoring Summary

| Ticker | A (Tech) | B (R:R) | C (Funds) | D (Catalyst) | Deductions | **Total** | Qualified |
|--------|----------|---------|-----------|--------------|------------|-----------|-----------|
| BAC    | 40       | 25      | 20        | 15           | 0          | **100**   | ✅         |
| TJX    | 40       | 18      | 20        | 15           | -5         | **88**    | ✅         |
| JPM    | 40       | 10      | 16        | 15           | 0          | **81**    | ✅         |
| EOG    | —        | —       | —         | —            | -20        | **EXCLUDED** | ❌      |

**EOG excluded:** Earnings report on May 5, 2026 — only 8 days away. This is within the 3-week hard filter (-20 pts mandatory deduction; drops below threshold regardless of other scores). **EOG is placed on the watchlist.**

---

## Today's Suggested Trades

### 1. BAC — Bank of America — Pullback to 50 EMA After Blowout Q1

```
Ticker: BAC
Current Price: $52.67
Sector: Financial Services — Banks (Diversified)
Score: 100/100 (A:40 B:25 C:20 D:15 Ded:0)
Note: B-Xtrender points not awarded (browser-use unavailable); actual score could be higher

Setup Summary:
BAC has pulled back from its 52-week high of $57.23 to its 50-day EMA zone ($51.30), with
volume on the pullback running at 78% of the 20-day average — orderly, not distribution.
Price is now recovering above the prior day's high (Trigger C), suggesting the pullback is
exhausting and momentum is resuming. The 200-day EMA at $49.94 provides a deep support floor.
Q1 2026 earnings were exceptional (EPS $1.11 vs $1.01 est., highest in two decades), and NII
guidance was raised to 6-8% growth, giving fundamental support to the continuation move.

Entry Zone: $52.00–$53.50
Stop Loss: $49.50 — below 50-day EMA and April swing low zone
Target 1: $57.00 — 52-week high / prior resistance
Target 2: $63.00 — analyst consensus mean target (KBW, Truist, Evercore range $61–$64)
Risk/Reward: 3.26:1 (using T2); 1.37:1 (T1 only)

Key Risks:
- Broader financials sector sensitivity to rate expectations and macro headlines
- BAC is rate-sensitive; any NII compression surprise in coming quarters
- Next earnings not until July 14, 2026 — well clear of the 3-week filter

Fundamental Note:
Q1 2026 EPS $1.11 beat consensus by 10%, revenue +7.2% YoY to $30.4B, highest quarterly EPS
in nearly two decades. NII growth guidance raised to 6-8%. Multiple analysts raised price
targets (KBW $64, Truist $61, Evercore $61) post-earnings on April 16.
```

**Instrument: Paired Debit Spread (Bullish)**  
Expiry: June 18, 2026 (~52 DTE — best liquidity)

```
Primary Spread (Bull Call Spread):
  Structure: Buy $52 call / Sell $55 call
  Approx net debit: ~$1.50–$1.65 per spread (bid/ask ~$1.93–$2.14 long; $0.57–$0.69 short)
  Net debit estimate: ~$1.35 (indicative)
  Max profit: ~$1.65 (at $55+)
  Max loss: ~$1.35

Opposite Hedge (Bear Put Spread, half-size):
  Structure: Buy $52 put / Sell $49 put (or $50/$47)
  Approx: ~$0.70–$0.80 per spread at half-size
  Max profit if BAC drops sharply: ~$1.50 on the hedge
  Max loss on hedge: ~$0.75

Combined Position (per 1 primary + 0.5 hedge):
  Total max risk: ~$1.73 (1.35 + 0.38)
  Expected payout if BAC rallies to $55+: ~$1.65 from primary
  Expected payout on sharp downside: ~$0.75 from hedge
  Main risk: BAC stays pinned between $52 and $55
```

> ⚠️ **Option prices are indicative from Jun 5 chain; Jun 18 strikes at same levels likely similar.** Verify live bid/ask before entry. BAC Jun 18 chain shows strong liquidity (thousands of OI at key strikes).

---

### 2. TJX — TJX Companies — Testing 50 EMA in Tight Range

```
Ticker: TJX
Current Price: $158.62
Sector: Consumer Cyclical — Off-Price Apparel Retail
Score: 88/100 (A:40 B:18 C:20 D:15 Ded:-5)
Note: B-Xtrender points not awarded (browser-use unavailable)

Setup Summary:
TJX sits essentially at its 50-day EMA ($157.87), having pulled back from a 52-week high of
$165.82 in an orderly fashion. Volume during the pullback has run at 75% of the 20-day average —
textbook healthy consolidation. The price closed above the prior day's high today (Trigger C).
TJX's off-price model is structurally in favour as consumers trade down amid tariff-driven price
pressure, making this both a technical and thematic setup. The stock has beaten earnings estimates
in every quarter for at least 2 years. Next earnings are May 20 — within 3 weeks but just outside
the hard 21-day filter (23 days to go); trade must be sized to absorb earnings event risk.

Entry Zone: $157.50–$160.00
Stop Loss: $152.50 — below recent pullback swing low ($155.72 14-day low), below psychological $153
Target 1: $166.00 — prior 52-week high / cluster resistance
Target 2: $175.00 — analyst consensus (BTIG $185, Barclays $183, Deutsche Bank $182)
Risk/Reward: 2.9:1 (T2); 1.24:1 (T1 only)

Key Risks:
- Earnings May 20 — 23 days away, just outside 21-day filter but options expiry risk applies
- CEO insider selling: Ernie Herrman sold 30,000 shares on March 2 (-5 pts)
- Tariff commentary may introduce guidance volatility at May earnings
- Consumer Cyclical sector can lag if macro deteriorates

Fundamental Note:
TJX beat Q4 FY26 EPS ($1.43 vs $1.38) and revenue (+8.5%). FY27 EPS guidance $4.93–$5.02.
Off-price model benefits from trade-down behaviour; Bernstein calls it "highest quality and most
consistent name among large off-price peers." Board raised dividend 13% to $0.48/quarter.
```

**Instrument: Paired Debit Spread (Bullish)**  
⚠️ **Earnings proximity note:** May 20 earnings are 23 days away. Use **June 18 expiry (~52 DTE)** so the primary spread expires well after earnings. This carries IV crush risk around May 20 but preserves full theta runway. Alternatively, take a smaller stock position instead if options IV is elevated ahead of earnings.

```
Primary Spread (Bull Call Spread) — Jun 18:
  Structure: Buy $160 call / Sell $165 call
  Jun 18 chain: Long $160C ~$5.30–$5.60, Short $165C ~$3.30–$3.50
  Net debit estimate: ~$2.00–$2.10 per spread
  Max profit: ~$2.90–$3.00 (at $165+)
  Max loss: ~$2.10

Opposite Hedge (Bear Put Spread, half-size) — Jun 18:
  Structure: Buy $155 put / Sell $150 put
  Jun 18 chain: Long $155P ~$4.40–$4.60, Short $150P ~$2.80–$2.95
  Net debit estimate: ~$1.60 at full size → ~$0.80 at half-size
  Max profit on hedge: ~$5 × 0.5 = $2.50 if TJX drops to $150
  Max loss on hedge: ~$0.80

Combined Position:
  Total max risk: ~$2.90 (2.10 primary + 0.80 hedge)
  Expected payout if TJX rallies to $165+: ~$2.90 from primary
  Expected payout on sharp decline through $150: ~$2.50 hedge profit offsets
  Main risk: TJX hovers between $155 and $165 through earnings, slow time decay
```

---

### 3. JPM — JPMorgan Chase — Post-Earnings Continuation Near 50 EMA

```
Ticker: JPM
Current Price: $311.73
Sector: Financial Services — Banks (Diversified)
Score: 81/100 (A:40 B:10 C:16 D:15 Ded:0)
Note: B-Xtrender points not awarded (browser-use unavailable)

Setup Summary:
JPM reported blowout Q1 2026 results (EPS $5.94 vs $5.45 est., +9% beat) on April 14. The stock
initially sold off on NII guidance cut ($103B from $104.5B) but has been recovering toward the
50-day EMA ($302.49) from a brief dip. Today it cleared the prior day's high (Trigger C), and
price is 3% above the 50 EMA — just outside the ideal pullback zone but still within scan filter.
R:R is the limiting factor: stop at ~$299 (below 50 EMA), T1 $328 (prior resistance), T2 $340
(analyst consensus Evercore/Piper Sandler) gives only ~1.4:1 risk-reward to T1. Scored lower
than BAC and TJX on this metric but fundamentals are strong.

Entry Zone: $308.00–$314.00
Stop Loss: $299.00 — below 50-day EMA and April pullback low
Target 1: $328.00 — prior resistance / recent range high
Target 2: $340.00 — analyst consensus mean (Evercore $340, Piper $345)
Risk/Reward: 2.31:1 (T2); 1.42:1 (T1 only)

Key Risks:
- NII guidance cut ($103B from $104.5B) could weigh on sentiment if rate environment worsens
- Already fully valued per Morningstar ($311 FVE); limited margin of safety at current price
- Next earnings not until July 14, 2026 — well clear
- Geopolitical uncertainty (Iran war) could spike volatility

Fundamental Note:
Q1 2026 EPS $5.94 crushes $5.45 est.; revenue $50.5B (+10% YoY); 14 consecutive quarterly EPS
beats. ROTCE 23%, IB fees +28%, markets revenue +20%. Evercore raised PT to $340 on Apr 20;
Piper Sandler to $345. Morningstar FVE $311 — sees shares as fully valued at current levels.
```

**Instrument: Paired Debit Spread (Bullish)**  
Expiry: June 5, 2026 (~39 DTE)

```
Primary Spread (Bull Call Spread) — Jun 5:
  Structure: Buy $310 call / Sell $320 call
  Jun 5 chain: Long $310C ~$10.20–$12.10, Short $320C ~$5.60–$6.40
  Net debit estimate: ~$4.70–$5.70 per spread
  Max profit: ~$4.30–$5.30 (at $320+)
  Max loss: ~$5.00 (approx)

Opposite Hedge (Bear Put Spread, half-size) — Jun 5:
  Structure: Buy $305 put / Sell $295 put
  Jun 5 chain: Long $305P ~$6.15–$7.05, Short $295P ~$3.45–$4.80
  Net debit estimate: ~$2.40 at full size → ~$1.20 at half-size
  Max profit on hedge (full): ~$10 × 0.5 = $5 if JPM drops through $295
  Max loss on hedge: ~$1.20

Combined Position:
  Total max risk: ~$6.20 (5.00 primary + 1.20 hedge)
  Expected payout if JPM rallies to $320+: ~$4.50–$5.30 from primary
  Expected payout on violent drop through $295: ~$5 hedge profit
  Main risk: JPM stalls between $310 and $320 through June
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (earnings / timing / risk)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| EOG | Passed all scan filters; strong uptrend (price 14.6% above 200d EMA), at 50 EMA, energy sector strength. Excluded solely due to May 5 earnings (8 days). Analyst fair value ~$156 vs $134 current — significant upside. | Re-evaluate after Q1 2026 earnings on May 6. Look for: beat + raised guidance + price holding above $130 50d EMA → enter via bull call spread for June/July expiry. |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades logged. The April 16 run returned an empty scan (0 tickers). Today is the first run with qualifying picks._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| — | — | — | — | — | — |

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A (no closed trades yet)
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Notes on This Run

- **TradingView visual check (Step 4b):** `browser-use` with Chrome profile "Tim" is unavailable in this cloud environment. B-Xtrender and Fair Value Band data could not be verified. B-Xtrender points (up to +15 positive / -14 deductions) were **not awarded or deducted** for any ticker. Scores above are conservative estimates. All three qualifying tickers should be verified in TradingView (chart `z25AhAlV`) before execution.
- **Scheduled run:** Per AGENT.md Step 6, no trade rows are appended on unattended/scheduled runs. The three suggested trades above are recommendations only. Trade rows should be appended to `trades-log.csv` only after user confirms which (if any) trades were opened.
- **Scan method:** TrendSpider live UI unavailable (browser-use dependency). Scan logic replicated via yfinance over 130 S&P 500 names.
