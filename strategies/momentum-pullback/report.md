# Momentum After Pullback — Current Report
_Last updated: 2026-06-11_

---

## Scan Source

**Fallback scan used:** TrendSpider browser scan unavailable (Chrome profile "Tim" not authenticated in this cloud environment). Scan executed via `scripts/momentum_pullback_scan.py` (yfinance-based implementation of the same Group 1–4 conditions from `config.md`).

**Scan timestamp:** 2026-06-11 19:03 UTC  
**Tickers found (28):** AAPL, XOM, JNJ, MRK, CVX, KO, LIN, PM, CAT, PLD, ADI, TJX, EOG, MO, CL, NSC, GD, ETN, APH, USB, MCHP, FDX, NXPI, WELL, AFL, FANG, OKE, GM

> **TradingView visual check (Step 4b):** Mandatory per workflow but unavailable in this cloud run — `browser-use --profile "Tim"` requires the user's Chrome session. **B-Xtrender scoring items are not awarded in this report.** User should verify `chart/z25AhAlV/?symbol=ETN`, `?symbol=CVX`, `?symbol=XOM` before entering positions. Confirmed-green B-Xtrender would add up to +15 pts per ticker; confirmed-red would deduct up to −14 pts.

---

## Market Context

The S&P 500 (SPY) closed at $736.13 on June 11, +2.1% above its 50-day MA ($721.04) and +7.7% above its 200-day MA ($683.55). The index sits roughly 3.2% below its 52-week high of $760.40, consolidating after a sharp recovery from the April sell-off (when this strategy found zero qualifying setups). VIX printed at 19.59 — slightly elevated relative to June 8's 18.47 but still below 20, which remains broadly constructive for new long equity entries.

The dominant macro theme continues to be the U.S.–Iran conflict and Strait of Hormuz closure, which has supported a sustained premium in crude oil (WTI ~$92, Brent ~$95 after retreating from a $138 April peak). A 60-day ceasefire memorandum is being discussed, creating binary headline risk for energy stocks specifically: if talks succeed, crude could normalise toward $80; if they stall, a re-acceleration toward $105+ is plausible. AI infrastructure spending continues at record pace, with Eaton reporting data-center order growth of +42% YoY in Q1. This is not a confirmed downtrend environment — standard filters apply.

---

## Outcomes Tracking

No trades are due for 14-day outcome review today. The trades-log.csv contains only one historical row (2026-04-16, empty scan during the April market sell-off) and all subsequent reports have been unattended runs with no user-confirmed trades logged.

---

## Today's Suggested Trades

_Unattended/scheduled run — no trades logged to CSV. User confirmation required before entry. See Step 6 in AGENT.md._

---

### 1. ETN — Eaton Corporation (Score: 100/115)

```
Ticker: ETN
Current Price: $393.90
Sector: Industrials — Power Management / AI Infrastructure
Score: 100/115 (A:40 B:25 C:20 D:15 Ded:0)

Setup Summary:
ETN has pulled back from its $434 52-week high and is now testing its daily 50 EMA
($395.31), trading at −0.36% below it. Volume has been declining on the pullback (last
5d avg is 0.98× the 20d avg — marginal but qualifying). The RSI crossed above 50 within
the last 5 bars (current 47.7, recently crossed). The weekly structure is strongly intact:
weekly EMA50 ($363.47) well above weekly EMA200 ($277.49), and price well above both.
This is Eaton's third pullback to the 50 EMA zone since the AI data center re-rating began
in 2024 — each prior test was a buyable entry.

Entry Zone: $385–$397 (EMA50 zone; prefer closer to $390)
Stop Loss: $375.00 — below the recent swing low of the pullback
Target 1: $430.00 — prior 52-week high / near-term resistance   (R:R 1.8:1 from $394 entry)
Target 2: $453.00 — Evercore ISI fair value / upper analyst cluster  (R:R 3.1:1 from $394)
Risk/Reward: 3.1:1 to Target 2 (using $394 entry, $375 stop)

Key Risks:
- Earnings August 4, 2026 (~54 days) — CLEAR of 3-week rule
- Premium valuation: trailing P/E ~39×, forward ~25× at $13.05–$13.50 FY EPS guidance;
  multiple compression risk if AI spending cools or macro deteriorates
- Expensive options (IV elevated on ETN); theta burn is real; consider Aug 21 expiry for
  more buffer if entering via spreads

Fundamental Note:
Q1 2026 (reported May 5): Record quarter — revenue +17% YoY to $7.45B, adj. EPS $2.81 vs
est. $2.73 (+2.9% beat), EPS grew YoY ($2.81 vs $2.72). Data center orders +42% YoY;
total backlog +48% in Electrical segment; Boyd Thermal acquisition closed (liquid cooling).
FY 2026 adj. EPS guidance raised to $13.05–$13.50, organic growth guidance raised to 9–11%.
Analyst upgrades: Morgan Stanley $500 (May 10), RBC $484 (May 6), JPMorgan $445 (May 6),
Citi $471 (May 6), KeyCorp $480 (May 6), Evercore $453 (May 11). Avg analyst PT ~$421.
```

**Instrument — Paired Debit Spread (Preferred) — July 17, 2026 (~36 DTE)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~36 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long $390 call / Short $400 call
  Mid prices (Jun 11): $390C ~$22.70 / $400C ~$17.60
  Net Debit: ~$5.10 per spread (R)
  Max Profit: ~$4.90 (if ETN ≥ $400 at expiry) — ~1:1 R:R on primary ✓
  Max Loss: ~$5.10

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts
  Strikes: Long $380 put / Short $370 put
  Mid prices (Jun 11): $380P ~$14.55 / $370P ~$10.90
  Net Debit: ~$3.65 per spread
  Max Profit: ~$6.35 (if ETN ≤ $370 at expiry) — ~1.74:1 on hedge
  Max Loss: ~$3.65

Combined Position (N primary / N/2 hedge):
  Total Debit / Max Loss: ~$6.93 × N
  Expected Payout if bullish thesis right (ETN ≥ $400): ~$4.90 × N
  Expected Payout on violent break lower (ETN ≤ $370): ~$3.18 × N
  Main Risk: drift / time decay without price expansion above $400
  ✓ Decent liquidity on $390/$400 strikes (OI 393/489) — use limit orders at mid-price
  ⚠ Consider August 21 expiry for more time buffer given elevated IV (~38%)
```

---

### 2. CVX — Chevron Corporation (Score: 95/115)

```
Ticker: CVX
Current Price: $188.04
Sector: Energy — Oil & Gas Integrated
Score: 95/115 (A:40 B:25 C:15 D:15 Ded:0)

Setup Summary:
CVX has pulled back precisely to its daily 50 EMA ($187.30), currently trading only +0.32%
above it — the cleanest EMA50 test in the current scan universe. All three trigger conditions
fired simultaneously: recross above 20 EMA, RSI crossed above 50 (current 50.3), and close
above prior day's high. Volume on the 5-day pullback is 0.77× the 20-day average — a
well-behaved, low-volume consolidation. The weekly golden cross (EMA50 > EMA200) is intact
and price is well above the weekly EMA50. Chevron's Q1 2026 beat (EPS +41% vs est.) and
multiple May analyst target raises support the fundamental backdrop.

Entry Zone: $185–$190 (50 EMA zone)
Stop Loss: $181.00 — below recent swing low and prior consolidation base
Target 1: $202.00 — prior resistance / breakout area                  (R:R 2.0:1)
Target 2: $218.00 — analyst consensus median (Mizuho $230, Morgan Stanley $214)  (R:R 5.0:1)
Risk/Reward: 5.0:1 to Target 2 (using $188 entry, $181 stop)

Key Risks:
- Earnings ~August 7, 2026 (~57 days) — CLEAR of 3-week rule
- Ceasefire/Iran deal risk: a signed U.S.–Iran ceasefire could push crude from $92 toward
  $80 quickly, compressing CVX's upstream margins and causing a sharp reversal
- EPS declined YoY (Q1 2026 $1.41 vs Q1 2025 $2.18); revenue growth was only +2.1% YoY;
  Q2 and H2 rebound depends on sustained elevated oil prices
- Zacks downgraded to Hold on June 8, 2026 (slight near-term caution signal)

Fundamental Note:
Q1 2026 (reported May 1): adj. EPS $1.41 vs est. $1.00 (beat +41%); revenue $47.56B, up
+2.1% YoY. Worldwide production +15%, U.S. production +24% YoY. Raised full-year capital
guidance to $18–$19B. CEO Mike Wirth warned of potential 1970s-style oil crisis from
Hormuz closure and near-record-low inventories. 39th consecutive dividend increase; 3.8%
yield provides income support. Analyst upgrades: Mizuho $230 (May 27), Barclays $213
(May 26), Morgan Stanley $214 (May 22). Average analyst PT ~$205.
```

**Instrument — Paired Debit Spread (Preferred) — July 17, 2026 (~36 DTE)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~36 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long $185 call / Short $195 call
  Mid prices (Jun 11): $185C ~$9.22 / $195C ~$4.40
  Net Debit: ~$4.82 per spread (R)
  Max Profit: ~$5.18 (if CVX ≥ $195 at expiry) — ~1.07:1 R:R on primary ✓
  Max Loss: ~$4.82

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts
  Strikes: Long $185 put / Short $180 put
  Mid prices (Jun 11): $185P ~$4.92 / $180P ~$3.20
  Net Debit: ~$1.72 per spread
  Max Profit: ~$3.28 (if CVX ≤ $180 at expiry) — ~1.91:1 on hedge
  Max Loss: ~$1.72

Combined Position (N primary / N/2 hedge):
  Total Debit / Max Loss: ~$5.68 × N
  Expected Payout if bullish thesis right (CVX ≥ $195): ~$5.18 × N
  Expected Payout on violent break lower (CVX ≤ $180): ~$1.64 × N
  Main Risk: Iran ceasefire headline; drift/chop between $185–$195 with time decay
  ✓ Excellent liquidity on CVX chains — $190C OI 2157, $185P OI 2845; mid fills realistic
```

---

### 3. XOM — Exxon Mobil (Score: 90/115)

```
Ticker: XOM
Current Price: $148.31
Sector: Energy — Oil & Gas Integrated
Score: 90/115 (A:40 B:25 C:10 D:15 Ded:0)

Setup Summary:
XOM has pulled back below its daily 50 EMA ($150.88), currently −1.76% below it — a slightly
deeper pullback than CVX but still well within the ±3% threshold. Volume on the recent
5-day period is 0.89× the 20-day average (declining). The 20 EMA recross and RSI cross above
50 triggers both fired within the last 5 bars. The weekly golden cross and weekly price above
EMA50 are intact. The stock has retreated from its $175.22 52-week high (~16% drawdown),
offering more upside room to the prior high than CVX. This is the same setup highlighted in
the June 8 report (which suggested entry at $149–$153); the stock has dipped slightly,
offering a marginally better entry point now.

Note: XOM and CVX are both Energy sector plays. Position sizing should reflect sector
concentration risk — consider treating them as a combined energy allocation rather than two
independent full-size positions.

Entry Zone: $146–$151 (EMA50 zone; prefer closer to $148–$149)
Stop Loss: $142.00 — below recent swing low and prior support
Target 1: $163.00 — prior resistance zone                         (R:R 2.2:1)
Target 2: $171.00 — analyst consensus median / Barclays $182 lower bound  (R:R 3.8:1)
Risk/Reward: 3.8:1 to Target 2 (using $148 entry, $142 stop)

Key Risks:
- Earnings July 31, 2026 (~50 days) — CLEAR of 3-week rule
- Same Iran ceasefire headline risk as CVX — binary oil price event
- EPS declined YoY (Q1 2026 $1.16 vs Q1 2025 $1.76); H2 recovery depends on elevated crude
- $150 50 EMA resistance zone may cap recovery if market loses confidence in oil premium

Fundamental Note:
Q1 2026 (reported May 1): adj. EPS $1.16 vs est. $1.02 (+13.7% beat); worldwide production
+15% YoY, U.S. production +24% YoY. Golden Pass LNG Train 1 online. Shareholder distributions
$9.2B in Q1 ($4.3B dividends + $4.9B buybacks). Analyst upgrades: Barclays raised to $182
(May 26), Mizuho raised to $175 (May 27). Average analyst PT ~$165–$171.
```

**Instrument — Paired Debit Spread (Preferred) — July 17, 2026 (~36 DTE)**

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~36 DTE)

Primary Spread:
  Structure: Bull Call Spread
  Size: N contracts
  Strikes: Long $145 call / Short $155 call
  Mid prices (Jun 11): $145C ~$8.10 / $155C ~$3.45
  Net Debit: ~$4.65 per spread (R)
  Max Profit: ~$5.35 (if XOM ≥ $155 at expiry) — ~1.15:1 R:R on primary ✓
  Max Loss: ~$4.65

Opposite Hedge:
  Structure: Bear Put Spread
  Size: N/2 contracts
  Strikes: Long $145 put / Short $140 put
  Mid prices (Jun 11): $145P ~$4.03 / $140P ~$2.34
  Net Debit: ~$1.69 per spread
  Max Profit: ~$3.31 (if XOM ≤ $140 at expiry) — ~1.96:1 on hedge
  Max Loss: ~$1.69

Combined Position (N primary / N/2 hedge):
  Total Debit / Max Loss: ~$5.50 × N
  Expected Payout if bullish thesis right (XOM ≥ $155): ~$5.35 × N
  Expected Payout on violent break lower (XOM ≤ $140): ~$1.66 × N
  Main Risk: Iran ceasefire / oil price reversal; XOM needs to clear $150.88 EMA50 resistance
  ✓ High liquidity — $150C OI 8269, $145P OI 5902; excellent fills expected
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry._

| Ticker | Score | Why watching | Trigger to revisit |
|--------|-------|--------------|-------------------|
| GD | 82/115 | Previously top-ranked (Jun 8 report at $340.75); now at $361.73, +5.55% above EMA50, volume NOT declining — rally has already started. Fundamentals remain outstanding (Army contracts, record $131B backlog). | Pullback to $345–$350 (EMA50 zone) on declining volume — then re-apply all 3 triggers |
| WELL | ~85/115 | All 3 triggers fired, volume declining sharply (0.74× ratio). Welltower Q1 2026: EPS $1.47 beat (+0.7%), revenue +32% YoY. Strong senior housing demographics theme. Earnings Jul 27 — clear. | R:R improves if WELL breaks above $222 (52-week high) opening a measured-move target to $235+; currently too close to resistance for ideal R:R |
| NSC | ~72/115 | At 1.07% above EMA50, volume declining, 20 EMA recross + RSI above 50 triggered. Clean uptrend. | Break above $320 on volume (clearing prior resistance opens road to $340+, improving R:R to ≥ 2:1) |
| GM | ~68/115 | All 3 triggers at EMA50, volume declining (0.98×). Auto recovery + tariff resolution theme. | RSI needs to confirm above 55 with higher volume on up days; tariff headlines remain binary risk |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed open trades in log. All prior runs have been unattended scheduled runs — no trades were confirmed and logged._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| — | — | — | — | — | — |

_Strategy has no closed trade history yet. Since launch, the April 16 scan returned zero qualifying tickers (market was in the April sell-off) and subsequent runs (Jun 8, Jun 11) have been unattended with no user-confirmed entries._

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

**Fallback list (150 tickers; Wikipedia S&P 500 returned 403).**  
28 tickers passed all four condition groups. Ranked by proximity to EMA50 (ascending |% from EMA50|):

| Rank | Ticker | Price | % from EMA50 | Vol Declining | Triggers | RSI |
|------|--------|-------|--------------|---------------|----------|-----|
| 1 | CVX | $187.91 | +0.32% | ✓ | All 3 | 50.3 |
| 2 | ETN | $393.90 | −0.36% | ✓ | RSI | 47.7 |
| 3 | FANG | $192.64 | −0.88% | ✗ | RSI | 45.7 |
| 4 | NSC | $311.18 | +1.07% | ✓ | 20EMA+RSI | 50.9 |
| 5 | EOG | $137.90 | +1.36% | ✓ | All 3 | 50.1 |
| 6 | WELL | $212.74 | +2.22% | ✓ | All 3 | 54.3 |
| 7 | AAPL | $295.28 | +2.19% | ✗ | PH | 47.8 |
| 8 | GM | $80.63 | +2.20% | ✓ | All 3 | 51.8 |
| 9 | CL | $90.30 | +3.01% | ✓ | All 3 | 56.4 |
| 10 | AFL | $117.70 | +3.10% | ✓ | PH | 58.6 |
| 11 | OKE | $90.56 | +3.18% | ✓ | All 3 | 55.5 |
| 12 | MO | $72.41 | +3.85% | ✓ | PH | 55.9 |
| — | XOM | $148.22 | −1.76% | ✓ | 20EMA+RSI | 45.2 |
| — | GD | $361.73 | +5.55% | ✗ | All 3 | 64.3 |
| — | LIN | $516.13 | +3.12% | ✓ | All 3 | 58.0 |
| — | others | — | >4% | varied | varied | — |

_Notes:_  
- _XOM ranked 13th by |%EMA50| but scores 3rd highest overall due to fundamentals/R:R._  
- _GD passes scan (tested EMA50 in last 5 bars) but is now too extended for a fresh entry._  
- _FANG excluded from top-3: volume NOT declining, RSI trigger only, less clean fundamental story._  
- _NSC: R:R < 2:1 to 52-week high ($326); full score ~72/115 — watchlist._
