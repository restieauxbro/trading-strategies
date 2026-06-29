# Momentum After Pullback — Current Report
_Last updated: 2026-06-29_

---

## Market Context

The S&P 500 (SPY ~$740) is snapping a five-session losing streak with a +1.3–1.6% session today, bouncing cleanly from last week's low of $728.99 (which tested the 21-week EMA — an inflection point that has held the long-term uptrend intact). The index remains above its 200-day MA (~$690) in a confirmed uptrend; the 50-day MA (~$732) has crossed back below the current price after last week's pullback. The VIX opened at 18.95 (+2.93% today), elevated versus the 16–17 baseline from earlier in June but well below the 25 danger threshold. Today's rally is driven by dip-buying across "Magnificent Seven" megacaps following their 4–7% selloff last week, easing Strait of Hormuz tensions (US-Iran fragile truce agreed), and ongoing capital rotation from pure semiconductor hardware into industrials, defense, and EDA software. PCE inflation came in hotter than expected last week (3-year high), pushing rate-hike odds higher for 2026 — moderately risk-negative for the broader market but a partial tailwind for defensive and cash-flow-rich names. The broad uptrend remains intact; this is a selective environment where the best entries are stocks pulling back to their 50-day EMA in strong fundamental sectors rather than chasing the bounce in extended names.

> **Note — Step 4b TradingView visual check:** This was a scheduled/unattended run. Browser-use and the TradingView B-Xtrender visual check (chart z25AhAlV) could not be executed. All B-Xtrender scores below are estimates inferred from RSI, price-vs-EMA structure, and trigger data. The 15 B-Xtrender points (Categories A6/A7/A8) have been withheld and a −5 deduction applied per established environment policy. **Before executing any of these trades, perform the mandatory visual check** at `https://www.tradingview.com/chart/z25AhAlV/?symbol=TICKER` for each pick to confirm green B-Xtrender background bars and a green dot on the signal line.

---

## Today's Suggested Trades

> **Scheduled run — trades are suggested only. No rows have been appended to trades-log.csv. If any of these are opened, manually log them using the `log-trade-csv` skill.**

### 1. GD — General Dynamics (88/115) ⚠️ Earnings July 22 (23 days — borderline)

```
Ticker: GD
Current Price: $348.50
Sector: Industrials (Aerospace & Defense)
Score: 88/115 (A:40 B:18 C:20 D:15 Ded:-5)

Setup Summary:
GD has pulled back from its January ATH ($369.70) through a constructive multi-month
consolidation and is now right at its 50-day EMA ($345.76), with all three scan triggers
firing simultaneously (20d EMA recross, RSI above 50, close above prior day high). Volume
on the pullback has been declining vs. the 20-day average, confirming orderly consolidation
rather than distribution. The defense sector is displaying classic flight-to-quality strength
during the broader rotation away from semiconductor names. Q1 2026 was a standout quarter,
and the stock is now setting up a potential ATH retest.

Entry Zone: $344–$352 (within 2% of 50-day EMA)
Stop Loss: $340 — below 50-day EMA ($345.76) with $6 buffer
Target 1: $370 — 52-week high / ATH retest
Target 2: $395 — analyst consensus zone
Risk/Reward: 2.3:1 (T1), 5.4:1 (T2) based on $349 entry vs $340 stop

Key Risks:
- Earnings July 22, 2026 (23 days — technically outside the 21-day hard filter but borderline;
  use defined-risk options only and plan to close or roll before July 22)
- GD typically has weaker Q2/Q3 seasonality vs Q4 (management guided this explicitly)
- Consensus PT $388 assumes ~11% upside from $349 — reasonable but not extreme

Fundamental Note:
Q1 2026: EPS $4.10 vs $3.67 consensus (+11.7% beat); revenue +10.3% YoY to $13.48B.
Company raised FY2026 EPS guidance to $16.45–$16.55 (from $16.10–$16.20). Mission Systems
margin expanded 50 bps. Morgan Stanley boosted PT to $435 (Overweight, April 30); consensus
$388. Defense sector remains a geopolitical safe haven with F-35 and Virginia-class submarine
programs as long-duration revenue anchors.
```

**Instrument: Bullish Paired Debit Spread**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: July 17, 2026 (~18 DTE) — exits 5 days before July 22 earnings
Note: 18 DTE is below the 21-45 DTE target; July 17 is the only practical expiry
      that keeps the position entirely pre-earnings.

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 spreads
  Strikes: $345 long / $365 short  (20-pt width, ATM)
  Net Debit: ~$8–10 per spread (~$1,600–2,000 for 2x)
  Max Profit: ~$10–12 per spread
  Max Loss: ~$8–10 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 spread (half size)
  Strikes: $345 long / $320 short  (25-pt width)
  Net Debit: ~$6–8 per spread
  Max Profit: ~$17–19 per spread at full payout

Combined Position:
  Total Debit / Max Loss: ~$22–28 per pair (~$2,200–2,800)
  Expected Payout if thesis is right: ~$20–24 (primary max profit × 2)
  Expected Payout on violent move against: ~$17–19 (hedge payout)
  Main Risk: drift / time decay / range-bound action between $320–$365
```

---

### 2. CDNS — Cadence Design Systems (88/115)

```
Ticker: CDNS
Current Price: $371.98
Sector: Technology (Electronic Design Automation)
Score: 88/115 (A:40 B:18 C:20 D:15 Ded:-5)

Setup Summary:
CDNS has pulled back ~8% from its June 9 intraday level (~$404) to test its 50-day EMA
($363.21), where it sits just +2.4% above the EMA with declining volume. RSI crossed back
above 50 today, triggering the scan. The pullback is entirely explained by broader tech
rotation pressure (semiconductor hardware selloff) rather than any CDNS-specific fundamental
deterioration. EDA software is structurally insulated from semiconductor commodity cycles
— Cadence is the picks-and-shovels play on every AI chip design cycle, regardless of which
fab or customer wins. Intel Foundry partnership (June 9) and Samsung 2nm deal are significant
long-term catalysts. Stock is forming a clean pullback-to-EMA continuation pattern after a
26% YTD run.

Entry Zone: $368–$376 (within 2% of 50-day EMA)
Stop Loss: $355 — below 50-day EMA ($363.21) with $8 buffer
Target 1: $415 — prior June resistance zone / just below 52-week high ($416.69)
Target 2: $440 — Berenberg PT (May 27); Stifel PT $432 (June 9)
Risk/Reward: 2.5:1 (T1), 4.1:1 (T2) based on $372 entry vs $355 stop

Key Risks:
- Earnings July 27, 2026 (28 days — safe window; plan to close/manage before this date)
- Premium valuation (P/E ~87x); any guidance miss or macro deterioration hits hard
- Semi sector sentiment contagion risk — although EDA is differentiated, sentiment matters

Fundamental Note:
Q1 2026: EPS $1.96 vs $1.93 consensus (+1.6%; or vs $1.81 street = +8.3% beat); revenue
+18.6% YoY to $1.47B. Record backlog of $8.0 billion. FY guidance raised ~$65M. Q2 guidance:
rev $1.555–1.595B, EPS $2.02–2.08. Intel Foundry multi-year DTCO partnership (Intel 14A)
announced June 9 — confirms Cadence's strategic importance to next-gen process nodes.
Launched fully autonomous virtual engineer at Computex 2026 (NVIDIA OpenShell). Stifel PT
$432 (June 9, Buy); KeyBanc PT $425 (Overweight); Berenberg PT $440; BofA PT $400 (Buy).
```

**Instrument: Bullish Paired Debit Spread**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: July 17, 2026 (~18 DTE) — exits 10 days before July 27 earnings
Note: 18 DTE is below the 21-45 DTE target; July 17 is the most practical pre-earnings expiry.

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 spreads
  Strikes: $370 long / $400 short  (30-pt width, ATM)
  Net Debit: ~$11–14 per spread (~$2,200–2,800 for 2x)
  Max Profit: ~$16–19 per spread
  Max Loss: ~$11–14 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 spread (half size)
  Strikes: $370 long / $340 short  (30-pt width)
  Net Debit: ~$8–11 per spread
  Max Profit: ~$19–22 per spread at full payout

Combined Position:
  Total Debit / Max Loss: ~$30–39 per pair (~$3,000–3,900)
  Expected Payout if thesis is right: ~$32–38 (primary max profit × 2)
  Expected Payout on violent move against: ~$19–22 (hedge payout)
  Main Risk: drift / time decay without price movement toward T1
```

---

### 3. ETN — Eaton Corporation (81/115)

```
Ticker: ETN
Current Price: $410.14
Sector: Industrials (Electrical Equipment / Power Management)
Score: 81/115 (A:33 B:18 C:20 D:15 Ded:-5)

Setup Summary:
ETN has bounced from its recent pullback low (~$394–400 range from the June 23 semi-led
selloff) and is now reclaiming the 50-day EMA ($400.82) and 20-day EMA ($407.33) together.
RSI crossed above 50. The stock appeared in the scan last week (June 28 run, scored 79/115)
and the setup has improved this week as price regains both EMAs with trigger confirmation.
The slight caution: volume is not declining on this week's bounce (above 20-day average),
suggesting some ongoing distribution — this costs 7 points in Category A and is worth
monitoring. Fundamentals remain exceptional: data center backlog of 228 GW (12-year supply
at 2025 build rates), 32 GW of US AI data center construction underway, and Mobility Group
separation announced June 11, 2026 to sharpen focus on Electrical & Aerospace segments.

Entry Zone: $406–$415 (within 2% of 50-day EMA)
Stop Loss: $393 — below 50-day EMA ($400.82) with $8 buffer
Target 1: $454 — analyst consensus (StockAnalysis average of 28 analysts)
Target 2: $490 — BofA PT ($490, Buy, May 6); KeyBanc $480 (Overweight, May 7)
Risk/Reward: 2.6:1 (T1), 4.7:1 (T2) based on $410 entry vs $393 stop

Key Risks:
- Volume not declining on pullback (mild distribution signal) — monitor closely
- Electrical Americas Q1 margin declined 440 bps YoY (25.6%); Q2 recovery guidance
  (+150 bps QoQ improvement) needs to materialize — key catalyst for next report
- Earnings August 4, 2026 (36 days — safe window)
- Premium P/E ~40x; multiple compression risk if growth rate expectations moderate

Fundamental Note:
Q1 2026: EPS $2.81 vs $2.73 est (+2.9% beat), record revenue $7.45B (+16.8% YoY). Raised
FY2026 organic revenue growth guidance to 9–11% (midpoint 10%). Adjusted EPS guidance:
$13.05–$13.50. Q1 free cash flow up 245% YoY. Data center backlog 228 GW (12-year supply
at 2025 build rates); 70% AI-driven. Bernstein PT $534 (Buy, June 17); BofA $490 (Buy);
KeyBanc $480 (Overweight). 28-analyst consensus: $454 (+12.8% from current).
```

**Instrument: Bullish Paired Debit Spread**

```
Instrument: Paired Debit Spread (preferred)
Bias: Bullish
Expiry: August 15, 2026 (~47 DTE) — spans earnings August 4; defined risk accepted
Note: No clean 21-45 DTE expiry avoids the August 4 earnings date. July 24 (~25 DTE,
      expires 11 days before earnings) is also viable if preferring pre-earnings position.

Primary Spread:
  Structure: Bull Call Spread
  Size: 2 spreads
  Strikes: $410 long / $450 short  (40-pt width, ATM)
  Net Debit: ~$15–19 per spread (~$3,000–3,800 for 2x)
  Max Profit: ~$21–25 per spread
  Max Loss: ~$15–19 per spread (debit paid)

Opposite Hedge:
  Structure: Bear Put Spread
  Size: 1 spread (half size)
  Strikes: $410 long / $370 short  (40-pt width)
  Net Debit: ~$12–15 per spread
  Max Profit: ~$25–28 per spread at full payout

Combined Position:
  Total Debit / Max Loss: ~$42–53 per pair (~$4,200–5,300)
  Expected Payout if thesis is right: ~$42–50 (primary max profit × 2)
  Expected Payout on violent move against: ~$25–28 (hedge payout)
  Main Risk: drift / time decay / Q2 margin miss compressing the move
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extended / requires confirmation)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| NSC | Norfolk Southern scanned cleanly (+2.4% from EMA50, RSI 57, 3 triggers, volume declining). Strong R:R (PT $334 only 6% above $315 — marginal). Earnings July 23 (24 days, borderline). Proposed Union Pacific merger faces regulatory scrutiny. | Pullback to $308–312 (50d EMA $307.94) for better R:R; clarity on UNP merger timeline |
| OKE | Extremely clean EMA50 test (+1.11%, volume declining, RSI 51.7, multiple triggers). Q1 EPS missed ($1.23 vs $1.31 est); raised guidance to $5.53 diluted EPS midpoint. R:R to T1 ($95.48 consensus) from $88.68 is only 1.35:1 — too low for Category B. | Breakout above $92 on volume with improving R:R; wait for guidance upgrade to lift consensus PT |
| PM | Philip Morris +2.89% from EMA50 ($175.62), RSI 54.6, volume declining — clean setup. But: Q2 earnings July 22 (23 days, same as GD — borderline), lowered FY guidance (currency + RBH impairment), and category competition from cheaper Zyn Ultra variant. | Price action after July 22 earnings; if EPS beats and guidance holds, re-enter on any subsequent pullback |
| TXN | Texas Instruments +0.52% from EMA50, RSI 45.3, triggers fired. Earnings July 22 (23 days, borderline). Semi sector under pressure from SK Hynix / MU profitability concerns. | Post-earnings stabilization and RSI recovery; confirm semi sector stabilization first |
| AMGN | $360.41, too extended now (+4.9% above 50d EMA, RSI 63.5) after last week's run. Was #2 pick on June 23 at $347. | Pullback to $340–345 (50d EMA zone) on declining volume |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed open trades (all runs since April 2026 have been scheduled/unattended — trades were not confirmed by user)._

---

## Performance Summary
_All closed trades (outcome recorded)._

| Date | Ticker | Entry Price | Outcome Price | % Change | Result |
|------|--------|-------------|---------------|----------|--------|
| 2026-04-16 | _(empty scan)_ | — | — | — | — |

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
_Run: 2026-06-29 19:04 UTC via yfinance-based scanner (scheduled environment — browser-use/TrendSpider unavailable)_

**23 tickers passed all scan conditions (out of 150-stock universe):**
V, KO, QCOM, TXN, AMGN, PM, ADI, UNP, SO, CL, NSC, GD, ETN, CDNS, MCHP, FDX, EMR, TFC, FAST, NUE, PCAR, OKE, PCG

**Eliminated after research/scoring:**
- **V**: RSI 65.8, +5.6% above EMA50 — overbought / too extended for new entry
- **KO**: RSI 62.1, +4.2% above EMA50, volume not declining — too extended
- **QCOM**: -4.4% below EMA50, semi sector under pressure, volume not declining — sector risk
- **TXN**: +0.52% from EMA50 (clean) but earnings July 22 (23d), semi sector headwinds — Watchlist
- **AMGN**: +4.9% above EMA50, RSI 63.5 — too extended from recent June 23 pick
- **ADI**: RSI 45.3, semi sector still recovering from SK Hynix/MU panic; volume not declining
- **UNP**: +3.5% above EMA50, volume not declining, NSC/UNP merger regulatory uncertainty
- **SO / CL / PCG**: Defensive utilities/staples; limited upside R:R given extension above EMA50
- **MCHP**: Semi sector, volume not declining, RSI 43.8 (not confirmed recovery)
- **FDX**: +2.6% above EMA50, volume not declining; weaker fundamental case vs top picks
- **EMR**: +0.94% from EMA50 (attractive) but volume not declining; weakened by lower IV and R:R
- **TFC**: +3.3% above EMA50, regional bank; rate-hike risk from hawkish Fed (Warsh)
- **FAST**: +3.9% above EMA50, volume not declining — too extended
- **NUE**: RSI 39.9 (not recovered), steel cycle uncertainty, volume not declining
- **PCAR**: Fundamentally weaker commercial trucking demand outlook; limited analyst upside
