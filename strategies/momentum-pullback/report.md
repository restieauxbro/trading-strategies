# Momentum After Pullback — Current Report
_Last updated: 2026-04-20_

---

## Market Context

The S&P 500 (SPY) is trading at **$708.54**, sitting comfortably **above its 200-day EMA ($653) and 50-day EMA ($676)** — a broadly constructive macro backdrop. VIX has retreated to **18.98**, well below the elevated-risk threshold of 25, suggesting fear has eased meaningfully after the volatility spike earlier in April. The index is up +3.3% over the past 5 days, reflecting a broad risk-on move. The overall regime is **uptrend / recovery**, with conditions supportive of position trades on strong individual names. No confirmed downtrend filters are applied.

---

## Scan Results

**Method:** yfinance fallback (browser-use/TrendSpider unavailable in this environment). Applied the full momentum-pullback scan logic: daily price above 200 EMA, weekly golden cross, weekly price above weekly 50 EMA, rising 200 and 50 EMAs, price within ±3% of 50 EMA in last 5 bars, and at least one timing trigger (recross of 20 EMA, RSI >50, or close above prior day's high).

**Universe scanned:** 282 S&P 500 tickers  
**Tickers passing all scan conditions:** 16

Full passing list: JPM, XOM, WMT, NEE, DUK, AEP, PCG, FDX, COP, OXY, DVN, RS, LIN, APD, CF, DOV

**Earnings hard filter (no earnings within 21 days from April 20):**

| Ticker | Earnings Date | Days Out | Status |
|--------|---------------|----------|--------|
| RS | Apr 22 | 2 | ❌ Blocked |
| NEE | Apr 23 | 3 | ❌ Blocked |
| PCG | Apr 23 | 3 | ❌ Blocked |
| DOV | Apr 23 | 3 | ❌ Blocked |
| APD | Apr 30 | 10 | ❌ Blocked |
| COP | Apr 30 | 10 | ❌ Blocked |
| LIN | May 1 | 11 | ❌ Blocked |
| DUK | May 5 | 15 | ❌ Blocked |
| AEP | May 5 | 15 | ❌ Blocked |
| OXY | May 5 | 15 | ❌ Blocked |
| DVN | May 5 | 15 | ❌ Blocked |
| CF | May 6 | 16 | ❌ Blocked |
| **WMT** | May 21 | 31 | ✅ Clear |
| **FDX** | Jun 23 | 64 | ✅ Clear |
| **JPM** | Jul 14 | 85 | ✅ Clear |

Three tickers clear the earnings filter. FDX scored **48/115** (below 55 threshold — too extended from 50 EMA at +10.2%), leaving two tradable picks: **WMT** and **JPM**.

**TradingView visual check:** browser-use/profile Tim unavailable in this environment. B-Xtrender and Fair Value Band points are not awarded; this reduces maximum attainable scores and is noted in each breakdown.

---

## Today's Suggested Trades

### 1. WMT — Walmart Inc. (Preferred Pick)

```
Ticker: WMT
Current Price: $127.88
Sector: Consumer Defensive
Score: 75/115 (A:40 B:0 C:20 D:15 Ded:0)
  Note: B category 0 pts because R:R on stock is <1.5:1; R:R on options spread is far better (see spread block).
  B-Xtrender points not awarded (visual unavailable); max possible was 75+15=90.

Setup Summary:
Walmart is in a clean multi-year uptrend (daily and weekly) and has recently re-tested its 50-day EMA zone
after a pullback from the $134 highs. The stock closed above its 20-day EMA on April 17 (+2.1%), triggering
the re-entry condition. Volume was declining on down days and volume expanded on the recovery day.
The consumer defensive sector is holding up well with a backdrop of macro uncertainty, and Walmart's AI
and store-remodel narrative provides a strong fundamental tailwind.

Entry Zone: $126–$129 (current zone, at/near 50 EMA)
Stop Loss: $119.05 — below 20-day swing low (Apr 7 low; ATR-adjusted would be ~$120)
Target 1: $134.41 — 52-week high / prior resistance
Target 2: $139.82 — analyst consensus target
Risk/Reward (stock): (134-128) / (128-119) = 6/9 = 0.67:1 (poor — use options spread instead)

Key Risks:
- Earnings May 21 (31 days) — position must be closed or structured to expire before May 21
- Valuation premium: Fwd P/E 39x is elevated vs peers; little margin of safety
- Tariff/macro impact on consumer spending could weigh on forward guidance
```

**Instrument: Paired Debit Spread (Bullish Bias)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: May 15, 2026 (~25 DTE) — expires before May 21 earnings

Primary Spread (Bull Call Spread):
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $125 Call / Sell $130 Call
  Pricing: Buy $125C ~$5.15 mid / Sell $130C ~$2.50 mid
  Net Debit: ~$2.65 per spread ($530 total for 2 contracts)
  Max Profit: ~$2.35 per spread ($470 total) if WMT ≥ $130 at expiry
  Max Loss: ~$2.65 per spread ($530 total)
  Approximate R:R: ~0.9:1 on primary alone

Opposite Hedge (Bear Put Spread):
  Structure: Bear Put Spread (half-size)
  Size: 1 contract
  Strikes: Buy $125 Put / Sell $120 Put
  Pricing: Buy $125P ~$2.18 mid / Sell $120P ~$0.93 mid
  Net Debit: ~$1.25 per spread ($125 for 1 contract)
  Max Profit: ~$3.75 per spread ($375) if WMT ≤ $120 at expiry
  Max Loss: ~$1.25 ($125)

Combined Position:
  Total Debit / Max Loss: ~$655
  Expected Payout if WMT rallies to $130+: ~$470 on primary (+$0 on hedge) ≈ +$470 net (71% return on risk)
  Expected Payout on sharp drop to $120 or below: −$530 primary + $375 hedge = −$155 net (much better than −$655)
  Main Risk: WMT chops between $120 and $130 — both spreads expire worthless; time decay is the enemy
  Close before: May 19 at the latest (2 days before May 21 earnings)
```

---

### 2. JPM — JPMorgan Chase & Co.

```
Ticker: JPM
Current Price: $316.07
Sector: Financial Services
Score: 62/115 (A:32 B:0 C:20 D:15 Ded:-5)
  Note: B=0 because stock R:R <1.5:1 from current extended level; use options spread.
  Deduction: -5 for insider selling (~86,776 shares in prior 90 days; multiple executives Apr 14-17).
  B-Xtrender not awarded (visual unavailable).

Setup Summary:
JPM broke back above its 200-day MA in early April and has continued higher following a strong Q1 2026
earnings beat ($5.94 EPS vs $5.50 consensus, +12.7% revenue growth). The stock is in a confirmed
uptrend on both daily and weekly charts, and the 50-day EMA served as the base for the recent breakout.
Analyst upgrades followed earnings (Phillip Securities Buy/$335, Truist raised to $332). The position
is relatively more extended at +5.2% above the 50 EMA but the fundamental momentum is fresh.

Entry Zone: $313–$318 (current zone)
Stop Loss: $293 — below 200-day MA / prior range resistance-turned-support (April pre-earnings low ~$295,
          but use $293 to allow for noise; ATR $6.81)
Target 1: $334.16 — 52-week high
Target 2: $345 — analyst high-target zone
Risk/Reward (stock): (334-316) / (316-293) = 18/23 = 0.78:1 (poor — use options spread)

Key Risks:
- Insider selling: Multiple executives sold ~48,000+ shares worth ~$17.6M in mid-April
- Net interest income guidance trimmed; buybacks potentially limited
- Extended from 50 EMA (+5.2%); needs to not reverse while position is open
- If macro deteriorates, financials are correlated to economic sentiment
```

**Instrument: Paired Debit Spread (Bullish Bias)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: May 15, 2026 (~25 DTE) — well before July 14 earnings

Primary Spread (Bull Call Spread):
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Buy $315 Call / Sell $320 Call
  Pricing: Buy $315C ~$8.68 mid / Sell $320C ~$6.13 mid
  Net Debit: ~$2.55 per spread ($510 total for 2 contracts)
  Max Profit: ~$2.45 per spread ($490 total) if JPM ≥ $320 at expiry
  Max Loss: ~$2.55 per spread ($510 total)
  Approximate R:R: ~0.96:1 on primary alone

Opposite Hedge (Bear Put Spread):
  Structure: Bear Put Spread (half-size)
  Size: 1 contract
  Strikes: Buy $315 Put / Sell $310 Put
  Pricing: Buy $315P ~$7.00 mid / Sell $310P ~$5.09 mid
  Net Debit: ~$1.91 per spread ($191 for 1 contract)
  Max Profit: ~$3.09 per spread ($309) if JPM ≤ $310 at expiry
  Max Loss: ~$1.91 ($191)

Combined Position:
  Total Debit / Max Loss: ~$701
  Expected Payout if JPM rallies to $320+: ~$490 on primary (+$0 on hedge) ≈ +$490 net (70% return on risk)
  Expected Payout on sharp drop to $310 or below: −$510 primary + $309 hedge = −$201 net
  Main Risk: JPM consolidates between $310 and $320 — time decay kills both spreads
```

---

### Eliminated Tickers

| Ticker | Score | Reason Excluded |
|--------|-------|-----------------|
| FDX | 48/115 | Below 55 threshold: +10.2% extended from 50 EMA, not in pullback zone; significant insider selling |
| RS, NEE, PCG, DOV | N/A | Earnings within 21 days (hard filter) |
| APD, COP, LIN, DUK, AEP, OXY, DVN, CF | N/A | Earnings within 21 days (hard filter) |
| XOM | N/A | Not researched further — RSI 20.9 suggests potential breakdown/distribution, not a healthy pullback |

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / earnings too close)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| NEE | In a solid multi-year uptrend, +44.9% off 52W low, near 50 EMA. Utility sector tailwind. | After Apr 23 earnings; re-entry if stock holds $90–$92 zone |
| LIN | World-class industrial gas compounder, EMA structure intact, slight premium to 50 EMA. | After May 1 earnings; re-entry on any dip to $480–$490 zone |
| DUK | Regulated utility with 8% revenue growth, near 50 EMA, low RSI (36) — very orderly. | After May 5 earnings; ideal setup if it holds $126–$128 post-earnings |
| APD | Air Products near 50 EMA, analyst rec 2.04, target $311. Good R:R setup. | After Apr 30 earnings; entry on hold at $280–$285 |
| COP | Energy name at 50 EMA, RSI 25.8 — deep pullback. May be too much sector headwind. | After Apr 30 earnings + oil stabilization above $60 |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| _(none)_ | | | | | | |

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| _(no completed trades yet)_ | | | | | |

### Aggregate Stats
- **Total closed trades:** 0
- **Win rate (HIT_T1 or HIT_T2):** N/A
- **Average % gain on wins:** N/A
- **Average % loss on stops:** N/A
- **Expired (inconclusive):** 0
- **Best trade:** N/A
- **Worst trade:** N/A

---

## Notes on This Run
- TrendSpider browser-use was unavailable; scan performed via yfinance with equivalent conditions
- TradingView visual check (browser-use profile Tim) was unavailable; B-Xtrender and Fair Value Band points (max 15 pts) were not awarded for any ticker — scores are conservative as a result
- The 2026-04-16 row in the log was an empty-scan row and had no outcomes to track (only 4 days old)
- This is an **unattended/scheduled run** — no trades logged to CSV per Step 6 rules (user confirmation required)
