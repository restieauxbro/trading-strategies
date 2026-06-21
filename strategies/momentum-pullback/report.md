# Momentum After Pullback — Current Report
_Last updated: 2026-06-21_

---

## Market Context

The S&P 500 (SPY) is trading at $746.74, sitting 9.1% above its 200-day SMA ($684.49) and 2.6% above its 50-day SMA ($727.82) — a clean, confirmed uptrend. VIX closed at ~16.8 on Friday (June 19), well below the 25 elevated threshold. The macro backdrop remains risk-on: large-cap tech and semiconductors are leading, AI infrastructure spending remains a dominant theme, and there is no sign of broad market deterioration. Stricter filters are NOT required. This is a favourable environment for momentum-pullback entries.

> **⚠️ Scan method note:** TrendSpider live scan via `browser-use` is unavailable in this environment. The scan was replicated using yfinance against a 276-ticker S&P 500 universe, applying all four condition groups from `config.md` (trend alignment, rising EMAs, ±3% proximity to daily 50 EMA in last 5 bars, and at least one timing trigger). Nine tickers qualified; the top five were researched in full.

> **⚠️ TradingView visual check (Step 4b):** Could NOT be completed — `browser-use` unavailable. B-Xtrender scores (up to ±15 pts) are excluded from all scoring below. Actual scores may be higher (if trend-following) or lower (if deteriorating). Treat stated scores as conservative baselines.

---

## Today's Suggested Trades

### 1. NVDA — NVIDIA (Semiconductors / Technology)

```
Ticker: NVDA
Current Price: $210.69
Sector: Technology — Semiconductors
Score: 86/115 (A:33 B:18 C:20 D:15 Ded:0) [B-Xtrender not scored — see note]

Setup Summary:
NVDA has been consolidating in a tight range at the daily 50 EMA ($206.76–$211) for three
weeks (June 3–18), after pulling back from its 52-week high of $236. The stock is now
back above all short-term EMAs, with the 50 EMA and 200 EMA both clearly rising. On June
18, NVIDIA completed a $25 billion bond offering that was oversubscribed 3.4× ($85B in
orders), signalling exceptional institutional confidence in the long-term AI hardware cycle.
RSI recovered to 51.8 — just reclaiming the 50 line. Weekly chart shows a strong golden
cross with price 15% above the weekly EMA50, confirming the broader uptrend.

Entry Zone: $208–$213
Stop Loss: $199.00 — below 20-day swing low (June 9–10 base)
Target 1: $232 — prior swing high (June 2 candle high)
Target 2: $250 — measured move / consensus analyst target zone (PT $265)
Risk/Reward: 2.0:1 (to T1) | 3.7:1 (to T2)

Key Risks:
- NVDA has a pattern of selling off on great earnings (happened May 20). Next earnings
  Aug 26, 2026 (66 days — comfortably outside filter).
- China revenue excluded from guidance (export control overhang).
- Down-day average volume (180M) slightly exceeds up-day volume (166M) in recent range —
  mild distribution concern.
- $25B debt offering volume spike (241M on June 18) may distort recent averages.

Fundamental Note:
Q1 FY2027 (May 20, 2026): Revenue $81.6B (+85% YoY), Data Center $75.2B (+92% YoY),
EPS $1.87 vs $1.76 est (+6.25% beat). FY2026 full-year revenue $215.9B (+65% YoY). Board
added $80B to buyback authorisation in May 2026. Vera Rubin (next data center platform) in
full production for Q3. Business trajectory is exceptional.
```

**Instrument — Paired Debit Spread (Bullish), July 17 2026 (~26 DTE)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: July 17, 2026 (~26 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Strikes: Long $210 / Short $215
  Net Debit: ~$2.43 per spread
  Max Profit: ~$2.57 (at or above $215)
  Max Loss: ~$2.43

Opposite Hedge:
  Structure: Bear Put Spread
  Size: Half the primary (e.g., 1 bear put per 2 bull calls)
  Strikes: Long $205 / Short $195
  Net Debit: ~$2.87 per spread (~$1.44 allocated per primary unit)
  Max Profit: ~$7.13 per spread
  Max Loss: ~$2.87

Combined Position (per 2 bull calls + 1 bear put):
  Total Debit / Max Loss: ~$7.73
  Expected Payout if NVDA > $215: ~$5.14 (+67%)
  Expected Payout if NVDA drops hard to ~$195: ~$2.28 (+29% — hedge offsets primary loss)
  Main Risk: NVDA drifts sideways / stays pinned in the $205–$215 range through July 17
```

---

### 2. GOOG — Alphabet Class C (Communication Services / Internet)

```
Ticker: GOOG
Current Price: $367.46
Sector: Communication Services — Internet Content & Information
Score: 80/115 (A:37 B:10 C:19 D:14 Ded:0) [B-Xtrender not scored]

Setup Summary:
GOOG has spent three weeks oscillating within ±2.5% of its 50 EMA ($359–$365 zone),
making it one of the cleanest pullback-to-support setups in the current market. The stock
pulled back from its 3-month high of $404 to $343 (June 11 intraday), then rebounded
sharply back through the 50 EMA, with RSI recovering to 52.0. Both daily and weekly
uptrends are intact: weekly golden cross, price well above weekly EMA50. Volume on down
days is only marginally higher than up days, consistent with rotation rather than
aggressive distribution. Earnings are 31+ days away (July 22–28), and the July 17 options
expiry sits 5 days before earnings — no earnings risk in the suggested spread.

Entry Zone: $362–$370 (at/near 50 EMA)
Stop Loss: $354.00 — below June 10 daily close and June 11 intraday low
Target 1: $390 — prior swing high (June 1 candle)
Target 2: $404 — 52-week high
Risk/Reward: 1.8:1 (to T1) | 2.8:1 (to T2)

Key Risks:
- Earnings July 22–28 (31–37 days). A stock position held past that point carries
  full earnings risk; the July 17 spread sidesteps this entirely.
- Q1 2026 EPS beat was inflated by a $37.7B non-recurring net gain — underlying beat
  is real but magnitude should be discounted.
- GOOG trades at 28× trailing P/E — any disappointment on AI/search commentary could
  pressure the stock ahead of earnings.

Fundamental Note:
Q1 2026 (April 29): Revenue $109.9B (+22% YoY, beat $107.2B est). EPS $5.11 vs $2.63
est (+94% beat, includes $37.7B non-recurring gain in other income). Cloud revenue growing
strongly. Google is integrating Gemini AI deeply into Search and workspace products.
Analyst consensus remains constructive.
```

**Instrument — Paired Debit Spread (Bullish), July 17 2026 (~26 DTE, expires before earnings)**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: July 17, 2026 (~26 DTE — expires 5 days before earliest earnings date)

Primary Spread:
  Structure: Bull Call Spread
  Strikes: Long $365 / Short $375
  Net Debit: ~$4.73 per spread
  Max Profit: ~$5.27 (at or above $375)
  Max Loss: ~$4.73

Opposite Hedge:
  Structure: Bear Put Spread
  Size: Half the primary
  Strikes: Long $360 / Short $350
  Net Debit: ~$3.20 per spread (~$1.60 allocated per primary unit)
  Max Profit: ~$6.80 per spread
  Max Loss: ~$3.20

Combined Position (per 2 bull calls + 1 bear put):
  Total Debit / Max Loss: ~$12.66
  Expected Payout if GOOG > $375: ~$10.54 (+83%)
  Expected Payout if GOOG drops to ~$350: ~$2.82 (partial hedge, ~+22% on hedge side)
  Main Risk: Stock range-bound between $355–$375 at expiry (pinned between spreads)
```

---

### 3. AVGO — Broadcom (Semiconductors / Technology) ⚠️ Elevated Risk

```
Ticker: AVGO
Current Price: $411.35
Sector: Technology — Semiconductors
Score: 73/115 (A:24 B:18 C:20 D:11 Ded:0) [B-Xtrender not scored]

Setup Summary:
AVGO reported a record quarter on June 3 (AI revenue +143% YoY, total revenue $22.19B
+48% YoY) but sold off sharply (-25% in 5 days, from $479 to $370) because Q3 AI guidance
of $16B trailed the "whisper number" of $17.2B, and CEO Hock Tan reiterated rather than
raised the $100B FY2027 AI target. This is an "expectations reset" selloff, not a
business deterioration. The stock has since bounced +10.8% from the $370 low, closing
exactly at the 50 EMA on June 18 ($411.35 vs EMA50 $410.55). The weekly uptrend remains
strongly intact (price 20% above weekly EMA50). Multiple analysts hold price targets of
$545–$550 (Jefferies, Wells Fargo).

⚠️ This is NOT an orderly pullback — the post-earnings gap down was sharp and
volume-heavy. Treat as a starter/small position. Full conviction entry requires a
sustained close above $420 on increased volume. Consider this a watchlist candidate
until that close is confirmed.

Entry Zone: $405–$415 (at 50 EMA zone)
Stop Loss: $395.00 — below 50 EMA support ($410 EMA − 3.6%)
Target 1: $450 — pre-earnings trading range (late May levels)
Target 2: $480 — near pre-earnings all-time high area
Risk/Reward: 2.4:1 (to T1) | 4.3:1 (to T2)

Key Risks:
- Sharp post-earnings selloff driven by guidance gap and CEO "chips only" pivot. If Q3
  AI revenue guidance of $16B doesn't beat on the Sep 3 print, a second leg down is
  possible.
- Gross margin guided lower (74% vs 77.1%) — AI chip mix is lower margin than software.
- Google confirmed it will use more than one chip supplier, potentially reducing AVGO's
  concentration advantage.
- Elevated IV (~50%) makes options expensive on both sides.
- Down-day volume (38.7M) materially exceeds up-day volume (34.1M).

Fundamental Note:
Q2 FY2026 (June 3): Revenue $22.19B (+48% YoY, beat $22.04B est). AI revenue $10.8B
(+143% YoY). EPS $2.44 vs $2.32 est (+5.2% beat). Q3 guidance: revenue ~$29.4B. Next
earnings: Sep 3, 2026 (74 days — clear of 3-week filter). Analysts Jefferies ($550 PT),
Wells Fargo ($545 PT) maintain constructive stance post-selloff.
```

**Instrument — Paired Debit Spread (Bullish), July 17 2026 (~26 DTE)**

```
Instrument: Paired Debit Spread (preferred) — reduce size vs standard due to elevated IV
Bias: Bullish
Expiry: July 17, 2026 (~26 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Strikes: Long $410 / Short $420
  Net Debit: ~$4.68 per spread
  Max Profit: ~$5.32 (at or above $420)
  Max Loss: ~$4.68

Opposite Hedge:
  Structure: Bear Put Spread
  Size: Half the primary
  Strikes: Long $410 / Short $390
  Net Debit: ~$8.40 per spread (~$4.20 allocated per primary unit)
  Max Profit: ~$11.60 per spread
  Max Loss: ~$8.40

Combined Position (per 2 bull calls + 1 bear put):
  Total Debit / Max Loss: ~$17.76
  Expected Payout if AVGO > $420: ~$10.64 (+60%)
  Expected Payout if AVGO drops to ~$390: ~$5.76 (partial recovery via hedge)
  Main Risk: Drift / time decay without directional conviction given elevated IV; consider
  smaller position size relative to NVDA and GOOG
```

---

## Watchlist

_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| DECK | Deckers (HOKA/UGG) pulled back cleanly to 50 EMA but RSI still 48.3, not yet back above 50. Uptrend intact. Score ~58/115. | RSI closing back above 50; sustained close above $110 on volume |
| AVGO | Included above as pick #3 with caveats. Full conviction entry if stock clears $420 on volume. | Sustained daily close above $420 on >35M volume; confirms post-earnings base |

---

## Open Trades

_User-confirmed trades from the last 14 days, outcome not yet recorded._

No open trades — this is a scheduled/unattended run. No trade rows have been confirmed or appended to the CSV.

---

## Performance Summary

_All closed trades (outcome recorded)._

No closed trades recorded in `trades-log.csv`. Only row in the log is an empty-scan placeholder from 2026-04-16 (browser-use unavailable that session as well).

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

| Field | Value |
|---|---|
| Scan method | yfinance (browser-use unavailable) — 276 S&P 500 tickers screened |
| Scan conditions | All 4 condition groups from config.md applied |
| Tickers qualifying scan | 9 (MTCH, NVDA, GOOG, DECK, AVGO, TGT, ETN, COLM, GLW) |
| Tickers excluded after research | TGT (weaker technicals), ETN (too extended), COLM (too extended), GLW (too extended), MTCH (business deterioration, score ~40/115) |
| Market regime | Bull market — no stricter filters needed |
| B-Xtrender check | NOT completed (browser-use/TradingView unavailable) |
