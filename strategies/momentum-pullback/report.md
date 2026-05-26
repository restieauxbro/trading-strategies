# Momentum After Pullback — Current Report
_Last updated: 2026-05-26_

---

## Market Context

The S&P 500 (SPY) closed at $749.35 on May 26, hitting a new 52-week high and extending its longest winning streak since December 2023 (eight consecutive weekly gains). Price sits 11.3% above its 200-day EMA ($673.50) and well above the 50-day EMA ($711.50) — the primary trend is unambiguously bullish. VIX is at 17.1, below the 20 danger threshold, indicating low fear. However, market breadth is narrow — only ~55% of S&P 500 stocks trade above their 200-day MAs, and the rally is heavily concentrated in AI/mega-cap tech. The key macro risk is shifting Fed policy: rate-hike probability for year-end has climbed to ~82%, with the Fed on hold at 3.50–3.75%. For the momentum-pullback strategy, the higher-for-longer rate environment is actually a direct tailwind for the Financial sector stocks that dominate today's scan. The regime is confirmed uptrend; standard filters apply.

> **Scanner note:** `browser-use` is unavailable in this environment. The TrendSpider scanner was replaced with a yfinance-based implementation of the same scan conditions (5-year daily data; Groups 1–4 replicated in Python). TradingView visual confirmation (B-Xtrender / BX indicators) could not be performed; BX-dependent scoring components (15 pts in Category A + BX deduction flags) are marked UNVERIFIED and excluded from scores. Reported scores are conservative floor estimates.

---

## Today's Suggested Trades

### 1. TFC — Truist Financial Corporation
**Score: 100/115** _(A:40 B:25 C:20 D:15 Ded:0 — BX unverified, conservatively excluded)_

```
Ticker: TFC
Current Price: $48.44
Sector: Financial Services — Banks (Regional)
Score: 100/115 (A:40 B:25 C:20 D:15 Ded:0)

Setup Summary:
TFC pulled back sharply from its early-May high of $50.48 to a low of $46.24 on
May 15, forming a clean 8.4% correction to test the EMA50 zone ($48.32). The
recovery since May 20 has been orderly — higher lows each session — with price
crossing back above EMA20, RSI recovering above 50, and today's close ($48.44)
clearing the prior day high. Volume has declined throughout the pullback (0.85×
20-day average), consistent with a healthy consolidation rather than distribution.
The stop is tight at $47.00, offering an excellent R:R.

Entry Zone: $47.80–$48.80
Stop Loss: $47.00 — below the May 20–22 consolidation base and near EMA200 ($46.51)
Target 1: $52.00 — prior May resistance zone; R:R 2.5:1
Target 2: $55.50 — 52-week high area ($56.20); R:R 4.9:1
Risk/Reward: 4.9:1 (to T2)

Instrument — Paired Debit Spread (Preferred):
  Bias: Bullish
  Expiry: June 18 2026 (~23 DTE) — use June 18 for liquid options; OR stock for
  position traders willing to hold longer

  Primary Spread:
    Structure: Bull Call Spread
    Size: 1×
    Strikes: Long $48 / Short $52
    Net Debit: ~$1.80 per spread (~$180/contract)
    Max Profit: ~$220/contract
    Max Loss: ~$180/contract

  Opposite Hedge:
    Structure: Bear Put Spread
    Size: 0.5×
    Strikes: Long $48 / Short $45
    Net Debit: ~$0.58 per spread (~$29 for 0.5 contract)
    Max Profit: ~$121 (0.5×)
    Max Loss: ~$29 (0.5×)

  Combined Position:
    Total Debit / Max Loss: ~$209
    Expected Payout if thesis right (TFC > $52): ~+$191
    Expected Payout on violent move against thesis (TFC < $45): ~–$59
    Main Risk: Time decay / chop between $48–$52 in 23 days

Key Risks:
- Full-year NII guidance trimmed to 2–3% growth (vs prior 3–4%); rate cuts delayed further
- Regional banks more credit-sensitive than money-center banks; any NII miss would hurt
- 23-DTE expiry demands a prompt move; stock alternative gives more time

Fundamental Note:
Q1 2026 net income $1.4B (+25% YoY), EPS $1.09 beating estimates, operating leverage
+250 bps. Management raised 2026 share buyback target to $5B ($1.2B in Q2 alone). ROTCE
trajectory targeting 14% in 2026 → 16–18% over 3–5 years. Analyst consensus: Moderate Buy,
avg. price target $55.59.
```

---

### 2. JPM — JPMorgan Chase & Co.
**Score: 95/115** _(A:40 B:25 C:20 D:15 Ded:−5 — insider selling reported)_

```
Ticker: JPM
Current Price: $305.62
Sector: Financial Services — Banks (Diversified)
Score: 95/115 (A:40 B:25 C:20 D:15 Ded:-5)

Setup Summary:
JPM pulled back from a May 6 intraday high of $316.26 to a low of $293.67 on
May 20 — a clean 7.2% correction that tested the EMA50/200 confluence zone
($296–$304). Price has recovered sharply over four sessions, reclaiming both
EMA20 and EMA50, with RSI rising from below 50 back to 52. Volume on the
pullback was 10% below its 20-day average — a health sign. All three scan
triggers fired (EMA20 recross, RSI above 50, close > prior day high). Stop is
placed at the EMA200 ($296), below which trend structure is invalidated.

Entry Zone: $303–$308
Stop Loss: $296.00 — EMA200 level; trend invalidation
Target 1: $320 — first resistance zone; R:R 1.5:1
Target 2: $337 — 52-week high retest (analyst consensus ~$338–$342); R:R 3.3:1
Risk/Reward: 3.3:1 (to T2)

Instrument — Paired Debit Spread (Preferred):
  Bias: Bullish
  Expiry: June 26 2026 (~31 DTE)

  Primary Spread:
    Structure: Bull Call Spread
    Size: 1×
    Strikes: Long $305 / Short $315
    Net Debit: ~$4.80 per spread (~$480/contract)
    Max Profit: ~$520/contract
    Max Loss: ~$480/contract

  Opposite Hedge:
    Structure: Bear Put Spread
    Size: 0.5×
    Strikes: Long $305 / Short $295
    Net Debit: ~$3.60 per spread (~$180 for 0.5 contract)
    Max Profit: ~$320 (0.5×)
    Max Loss: ~$180 (0.5×)

  Combined Position:
    Total Debit / Max Loss: ~$660
    Expected Payout if thesis right (JPM > $315): ~+$340
    Expected Payout on violent move against thesis (JPM < $295): ~–$160
    Main Risk: Drift / chop without follow-through above $315 in 31 days

Key Risks:
- Insiders recently reduced positions — worth monitoring for magnitude
- FY26 NII guidance trimmed to $103B from $104.5B; higher rate hike odds complicate NII outlook
- Heavy-volume reversal in tech/AI could cause rapid rotation away from financials

Fundamental Note:
Q1 2026 EPS $5.94 (+8% vs consensus $5.50), revenue $50.54B (+10% YoY), net income $16.49B
(+13% YoY). ROE 17.5%. Evercore raised PT to $340 (Outperform, Apr 17); Phillip Securities
upgraded to Accumulate, PT $335 (Apr 28). Consensus: Moderate Buy, avg. PT $338–$342.
```

---

### 3. BLK — BlackRock, Inc.
**Score: 86/115** _(A:33 B:18 C:20 D:15 Ded:0 — volume not declining on pullback)_

```
Ticker: BLK
Current Price: $1,077.34
Sector: Financial Services — Asset Management
Score: 86/115 (A:33 B:18 C:20 D:15 Ded:0)

Setup Summary:
BLK broke sharply from $1,104 (May 14) to $1,030 (May 19–20) — a 6.7%
correction — before recovering above the EMA50 ($1,048) over the last four
sessions. The pullback was accompanied by slightly elevated volume (1.14×
20-day average), which is a mild concern (volume should ideally decline on
pullback). However, the recovery is also on decent volume, and all three
triggers fired on the bounce. BLK remains in a strong uptrend with the EMA50
well above EMA200 on weekly and daily timeframes. The AI / Aladdin platform
story and $28B pivot to private markets provide a durable fundamental
backdrop. Stop is placed below the swing low.

Entry Zone: $1,065–$1,085
Stop Loss: $1,025 — below May 19–20 swing low ($1,030)
Target 1: $1,150 — first resistance zone (~7% above entry); R:R ~1.4:1
Target 2: $1,207 — 52-week high retest; R:R 2.5:1
Risk/Reward: 2.5:1 (to T2)

Instrument — Paired Debit Spread (Preferred):
  Bias: Bullish
  Expiry: June 26 2026 (~31 DTE)

  Primary Spread:
    Structure: Bull Call Spread
    Size: 1×
    Strikes: Long $1,070 / Short $1,110
    Net Debit: ~$18.05 per spread (~$1,805/contract)
    Max Profit: ~$2,195/contract
    Max Loss: ~$1,805/contract

  Opposite Hedge:
    Structure: Bear Put Spread
    Size: 0.5×
    Strikes: Long $1,050 / Short $1,030
    Net Debit: ~$6.15 per spread (~$308 for 0.5 contract)
    Max Profit: ~$693 (0.5×)
    Max Loss: ~$308 (0.5×)

  Combined Position:
    Total Debit / Max Loss: ~$2,113
    Expected Payout if thesis right (BLK > $1,110): ~+$1,887
    Expected Payout on violent move against thesis (BLK < $1,030): ~–$1,112
    Main Risk: Drift / time decay without sustained follow-through above $1,110

Key Risks:
- Volume was not declining on the pullback (1.14× avg) — slightly less clean setup
- High absolute cost per contract (~$2,100 total debit) — size accordingly
- BLK has underperformed the S&P 500 YTD (+10.6% vs S&P +26%); catch-up trade is the thesis

Fundamental Note:
Q1 2026 revenue $6.7B (beat), EPS $12.53 (beat). AUM at record highs. $28B in GIP/HPS/Preqin
acquisitions pivoting the firm to high-margin private markets (10–20× fee revenue vs index ETFs).
UBS raised PT to $1,270 (Buy, Apr 15). Consensus: Moderate-to-Strong Buy, avg. PT $1,262–$1,269.
```

---

## Watchlist
_Passed scan and some research criteria but no immediate entry recommended._

| Ticker | Why Watching | Trigger to Revisit |
|--------|--------------|-------------------|
| BAC | Same financial sector tailwind as JPM; 1.18% from EMA50, all triggers firing. R:R to near-term targets is limited ($57 52-wk high from $52.03 entry = 1.6:1 with stop at $49). Volume flat (1.01×). | Wait for consolidation above $52.50 or pullback to $50.50–$51.00 for better entry and R:R ≥ 2:1 |
| ETN | Strong industrials uptrend; all scan conditions pass. Currently 3.36% above EMA50 — slightly extended. R:R to T1 too compressed at current price. | Watch for a 2–3% pullback toward EMA50 ($391); re-run scoring if RSI tests 50 again |
| PNC | Regional bank in confirmed uptrend (EMA50 at $216, 1.94% below current $220.54). Volume declining. R:R to 52-wk high ($243) = 1.1:1 from current entry — too thin. | Entry improves if PNC pulls back to $215–$217 zone; target remains $242–$243 |
| GD | Defense/aerospace sector; 0.87% from EMA50, very tight setup. R:R to 52-wk high ($370) = 1.3:1 with stop at $326 — marginal. | Watch for earnings catch-up trade post Q2 results (next earnings ~July 2026); or entry below $341 to widen R:R |

---

## Open Trades
_User-confirmed trades from the last 14 days (outcome not yet recorded)._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No open trades — previous run (2026-04-16) returned empty scan._

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

## Scan Details
_Scan run: 2026-05-26 19:06 UTC | Scanner: Momentum after pullback (yfinance implementation) | Universe: S&P 500 (150-ticker fallback subset; Wikipedia scrape unavailable)_

**All 21 tickers passing scan conditions:**
JPM, BAC, LIN, BLK, GS, PLD, ADI, C, UNP, KLAC, NSC, GD, ETN, USB, PNC, FDX, TFC, CARR, ODFL, HLT, AEP

**Tickers eliminated during scoring (below 55-point threshold or structural issues):**
- LIN, GS, PLD, ADI, C, UNP, KLAC, NSC, FDX, CARR, ODFL, HLT, AEP, USB — disqualified primarily on R:R grounds (extended above EMA50, limited upside to near-term resistance, or negative EPS growth)
- BAC, ETN, PNC, GD — marginal R:R; added to watchlist

**Selected (top 3 by score):**
1. TFC: 100/115
2. JPM: 95/115
3. BLK: 86/115
