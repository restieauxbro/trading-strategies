# Momentum After Pullback — Current Report
_Last updated: 2026-06-15_

---

## Market Context

The S&P 500 (SPY) closed at $754.94 on June 15, 2026, sitting 4.2% above its 50-day SMA ($724.78) and 10.3% above its 200-day SMA ($684.64) — the broad uptrend is firmly intact and strengthening. VIX is at 16.16, declining below its 50-day average of 18.25 and well off its year high of 35.3 from earlier in 2026. The low-fear, risk-on backdrop is favourable for momentum continuation setups. No downtrend or elevated volatility warnings apply.

The yfinance-based scan (`momentum_pullback_scan.py`) ran successfully and identified **34 tickers** from the S&P 500 fallback universe passing all scan conditions (Groups 1–4). This run used the yfinance scanner fallback — `browser-use` / TrendSpider live UI was unavailable in this environment. **TradingView visual confirmation (Step 4b) could not be performed** — B-Xtrender and Fair Value Band readings are therefore unconfirmed, and the 15 BX-related points are not awarded in any score. Scores are expressed against the 115-point maximum; the effective ceiling without BX confirmation is 100 points.

---

## Today's Suggested Trades

> ⚠️ **Scheduled/unattended run — no CSV rows appended.** Trades are suggestions only. Confirm entry and log manually if opened.

---

### 1. NVDA — AI momentum pullback resuming at EMA50

```
Ticker: NVDA
Current Price: $212.00
Sector: Technology (Semiconductors)
Score: 85/115 (A:40 B:10 C:20 D:15 Ded:0 | BX unconfirmed: 0 of 15 pts awarded)

Setup Summary:
NVDA pulled back from the $220s to test its 50-day EMA (~$207), now recrossing above it with
all three scan triggers firing simultaneously (20 EMA recross, RSI above 50, close above prior
day high). Volume declining on the pullback confirms healthy consolidation, not distribution.
The stock is still 12% above its 200-day SMA, with weekly structure fully intact. AI demand
remains off-the-charts per Jensen Huang's most recent commentary, and S&P just upgraded NVIDIA's
credit rating, citing "insatiable demand."

Entry Zone: $209–$215
Stop Loss: $198.50 — below recent swing low and well below EMA50
Target 1: $238 — above 52-week high ($236.54); near-term resistance and prior ATH zone
Target 2: $265 — measured move from consolidation base (~25% extension)
Risk/Reward: ~1.9:1 to T1 (→ 10 pts); ~3.9:1 to T2

Key Risks:
- Next earnings Aug 26, 2026 (72 days away — well clear of 3-week filter)
- High beta (2.20): volatile on macro news, tariff headlines, China export restrictions
- Already up ~49% YTD; some mean-reversion risk if AI spending narrative softens

Fundamental Note:
Q1 FY2027 (reported May 20, 2026): EPS $1.87 vs $1.76 est (+6.25% beat). Revenue up 62% YoY
to $57B. Consensus PT $303–$311 (42–54% upside from $212). Strong Buy from 97% of 39 covering
analysts. S&P credit upgrade to AA in June 2026 on "insatiable AI demand."
```

**Instrument: Paired Debit Spread (Preferred)**
Bias: Bullish
Expiry: Jul 17, 2026 (~32 DTE)

```
Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long $210 / Short $215
  Net Debit: ~$2.48/share (~$496 total for 2 contracts)
  Max Profit: ~$2.52/share (~$504 total) if NVDA ≥ $215 at expiry
  Max Loss: ~$496

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half-size)
  Strikes: Long $205 / Short $195  (estimated; confirm live chain)
  Net Debit: ~$3.50/share (~$350 estimated)
  Max Profit: ~$6.50/share (~$650 if NVDA ≤ $195)
  Max Loss: ~$350

Combined Position:
  Total Debit / Max Loss: ~$846
  Expected Payout if NVDA ≥ $215 (thesis correct): +$504 primary − $350 hedge = net ~+$154
  Expected Payout if NVDA ≤ $195 (violent drop): +$650 hedge − $496 primary = net ~+$154
  Main Risk: NVDA drifts sideways or pins between $195–$215 at Jul 17 expiry — full $846 at risk
  Note: Put prices are estimated; verify live bid/ask before order entry
```

---

### 2. WELL — Healthcare REIT EMA50 recross with fresh catalysts

```
Ticker: WELL
Current Price: $213.68
Sector: Real Estate (REIT — Healthcare Facilities)
Score: 85/115 (A:40 B:10 C:20 D:15 Ded:0 | BX unconfirmed: 0 of 15 pts awarded)

Setup Summary:
Welltower pulled back to its 50-day EMA (~$210) and is now recovering, triggering all three scan
conditions. Volume declined throughout the pullback, and on Jun 9 the stock jumped 3.36% on
strong Q1 2026 results and a dividend increase signal. Multiple analysts moved to Buy/Overweight
with raised price targets in the same session. The senior-housing demographic tailwind
(ageing population) remains structurally intact and is accelerating NOI growth.

Entry Zone: $210–$216
Stop Loss: $200.00 — below recent pullback low and clear of EMA50 support
Target 1: $240 — analyst consensus average price target ($239.61)
Target 2: $265 — toward analyst high-end target ($277)
Risk/Reward: ~1.9:1 to T1 (→ 10 pts); ~3.7:1 to T2

Key Risks:
- Next earnings Jul 27, 2026 (42 days — clear of 3-week filter)
- Interest-rate sensitivity: "higher-for-longer" environment pressures REIT valuations
- Wide bid/ask on options chain (see instrument note below)

Fundamental Note:
Q1 2026 beat on both EPS and revenue; same-store NOI growth strong in the Seniors Housing
Operating (SHO) portfolio. Revenue $10.84B in 2025 (+38% YoY). 15% anticipated dividend
increase for Q2 2026 announced. Analyst average PT $239.61; multiple Buy/Overweight upgrades
in late May/early June 2026.
```

**Instrument: Stock preferred (options illiquidity)**
Welltower's option chain has only 5 monthly expiries and $10-wide strikes with wide bid/ask
spreads (≥$1.50 on near-ATM calls). The paired debit spread math breaks down at these spreads.

```
Recommended: Buy shares
Entry: $210–$216 zone
Stop: $200.00
Target 1: $240 | Target 2: $265
Position size: risk-managed per standard stop-loss sizing

Alternative (if options preferred):
  Bull Call Spread only — Long Jul 17 $210 call / Short Jul 17 $220 call
  Estimated debit at mid: ~$5.35/share ($535/contract)
  Max profit if WELL ≥ $220: ~$4.65/share ($465/contract) — 0.87:1 R:R (below ideal)
  Note: Favorable fills possible near bid-side, which improves effective R:R to ~1.3:1
```

---

### 3. ETN — Eaton data-center electrification breakout resumption

```
Ticker: ETN
Current Price: $411.00
Sector: Industrials (Specialty Industrial Machinery)
Score: 85/115 (A:40 B:10 C:20 D:15 Ded:0 | BX unconfirmed: 0 of 15 pts awarded)

Setup Summary:
Eaton pulled back approximately 8–10% from recent highs to its 50-day EMA (~$396), then
recrossed with all three triggers firing. Volume was below average during the pullback.
The company is a direct beneficiary of AI data-center buildout (power management, switchgear,
liquid cooling) and has raised FY2026 guidance. JPMorgan raised its price target from $406 to
$445 on May 8, 2026. ETN is up 32% YTD. The pullback to EMA50 offers an improved entry vs
chasing the prior breakout.

Entry Zone: $408–$415
Stop Loss: $391.00 — below EMA50 support and recent swing low of the pullback
Target 1: $445 — JPMorgan price target (post-upgrade), ~8.3% upside
Target 2: $480 — measured move from consolidation base
Risk/Reward: ~1.7:1 to T1 (→ 10 pts); ~3.4:1 to T2

Key Risks:
- Next earnings Aug 4, 2026 (50 days — clear of 3-week filter)
- Premium valuation (fwd P/E ~26x) leaves limited margin of error
- Tariff exposure on global supply chain for electrical components

Fundamental Note:
Q1 2026: EPS $2.81 vs $2.73 est (beat by $0.08). Revenue $7.5B (+16.8% YoY). Raised FY2026 EPS
guidance to $13.05–$13.50 midpoint $13.28. Liquid cooling backlog doubled over 6 months. Long-
term earnings growth rate pegged at 11.7%. JPMorgan Overweight, raised PT $406→$445 May 8.
```

**Instrument: Paired Debit Spread (Preferred)**
Bias: Bullish
Expiry: Jul 17, 2026 (~32 DTE)

```
Primary Spread:
  Structure: Bull Call Spread
  Size: 2 contracts
  Strikes: Long $410 / Short $420
  Net Debit: ~$4.80/share (~$960 total for 2 contracts)
  Max Profit: ~$5.20/share (~$1,040 total) if ETN ≥ $420 at expiry
  Max Loss: ~$960

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 contract (half-size)
  Strikes: Long $400 / Short $390  (estimated; confirm live chain)
  Net Debit: ~$4.50/share (~$450 estimated)
  Max Profit: ~$5.50/share (~$550 if ETN ≤ $390)
  Max Loss: ~$450

Combined Position:
  Total Debit / Max Loss: ~$1,410
  Expected Payout if ETN ≥ $420 (thesis correct): +$1,040 primary − $450 hedge = net ~+$590
  Expected Payout if ETN ≤ $390 (violent drop): +$550 hedge − $960 primary = net ~−$410
  Main Risk: ETN drifts sideways or pins between $390–$420 at Jul 17 expiry — ~$1,410 at risk
  Note: Put prices are estimated; verify live bid/ask before order entry
```

---

## Watchlist
_Constructive scan/research but no immediate entry this run._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| GOOGL | All 3 triggers, vol declining, strong Cloud/AI fundamentals. Trading near 52-week high ($404). Q1 adjusted EPS missed slightly ($2.62 vs $2.63 est); massive GAAP beat included equity gains. Strong buy consensus, PT $409. | Pullback toward $355–$360 (EMA50 zone); also watch Q2 2026 earnings Jul 22 — strong Cloud print above 55% growth would confirm momentum |
| OKE | All 3 triggers, vol declining, right at EMA50. Q1 2026: net income +12%, EBITDA +13%, guidance raised. Clean setup. | R:R to nearest resistance (~$96) is approximately 1.7:1 with stop at $83.50 — borderline. Watch for a confirmed pull back toward $85 for a better entry; or wait for price to break above $92 to confirm new uptrend leg |
| NSC | All 3 triggers, vol declining, tightest EMA50 proximity (+0.6%). Q1 2026 EPS beat. UP/NS merger under STB review; supplemental info due Jul 27, 2026. | Hold-heavy analyst consensus (16 holds vs 6 buys). R:R to $330 (~1.3:1) is weak. Revisit if STB accepts merger timeline or if price breaks through $320 with volume |

---

## Open Trades
_No open trades — no confirmed entries in the prior 14-day window._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

---

## Performance Summary
_No closed trades yet — log is new, prior run was an empty scan._

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

## Scan Metadata
- **Scanner:** Momentum after pullback (yfinance fallback — browser-use unavailable)
- **Scan timestamp:** 2026-06-15 19:02 UTC
- **Universe:** S&P 500 (150-ticker fallback list; Wikipedia fetch returned 403)
- **Symbols found:** 34
- **Full ticker list:** AAPL, NVDA, AMZN, GOOGL, TSLA, AVGO, JPM, JNJ, MRK, CVX, ORCL, KO, QCOM, LIN, PM, CAT, ADI, UNP, EOG, MO, CL, NSC, GD, ETN, USB, MCHP, FDX, EMR, NXPI, WELL, AFL, TFC, OKE, GM
- **TradingView visual check:** Not performed (browser-use unavailable); B-Xtrender/Fair Value Band points not awarded (0 of 15 BX pts in all scores)
- **Trades logged:** None (scheduled/unattended run — no confirmed entries to log)
