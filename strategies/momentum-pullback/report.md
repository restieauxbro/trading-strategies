# Momentum After Pullback — Current Report
_Last updated: 2026-05-28_

---

## Scan Metadata

| Field | Value |
|---|---|
| Scanner | `Momentum after pullback` (yfinance fallback — TrendSpider browser-use unavailable) |
| Scan timestamp | 2026-05-28 19:00 UTC |
| Tickers found | 4 — GD, BA, VLO, PSX |
| Tickers researched | All 4 |
| B-Xtrender visual confirmation | ⚠️ **Not performed** — `browser-use` not available in environment. All B-Xtrender scoring items are 0 (maximum 15 additional points unverifiable). Verify in TradingView before execution. |

---

## Market Context

The S&P 500 (SPY) closed at **$754.35**, sitting **+11.5% above its 200-day EMA** ($676.59) — a firmly established bull market. The 50-day EMA ($714.69) is trending well above the 200-day. VIX printed **15.68**, comfortably below 20, indicating a low-fear risk environment. The index gained +1.57% over the past week. **Regime: BULLISH.** Favorable conditions for long momentum setups; no regime penalty applied to any pick.

A notable macro driver this cycle is the Iran crisis, which has elevated oil prices and refining margins significantly — acting as a tailwind for energy sector names VLO and PSX.

---

## Today's Suggested Trades

### 1. PSX — Phillips 66 (Downstream Energy)

```
Ticker: PSX
Current Price: $176.90
Sector: Energy — Oil & Gas Refining & Marketing
Score: 100/115 (A:40 B:25 C:20 D:15 Ded:0)
  Note: B-Xtrender unverified; 0/15 BX pts included; potential max 115/115 if BX confirms green.

Setup Summary:
PSX pulled back to test its 50-day EMA (~$169) in a clean uptrend (daily and weekly both
bullish with golden-cross structure). The RSI reset below 50 and has now crossed back above
(trigger B), a classic momentum re-entry signal. Volume is sharply below average (-56%
over last 5 days vs prior 15), confirming orderly consolidation rather than distribution.
A fresh Mizuho upgrade to Outperform with a $212 target (May 27) and multiple other
upgrades throughout May provide a strong fundamental catalyst aligned with the technical
entry timing.

Entry Zone: $174–$178 (near 20-day EMA consolidation, confirmed RSI > 50 crossover)
Stop Loss: $167.50 — below 50-day EMA ($169.46); breach here invalidates the setup
Target 1: $189.25 — 52-week high / prior resistance
Target 2: $212.00 — Mizuho upgrade price target (May 27)
Risk/Reward: 1.6:1 to T1 | 4.4:1 to T2 (position trade target)

Key Risks:
- Earnings: July 24, 2026 (~57 days out — safely outside 3-week hard filter)
- Oil price reversal / Iran conflict resolution could compress refining margins
- Revenue growth uncertain (Q1 2026 slightly below analyst forecast; EPS massively beat)
- Low options open interest on near-term expiries; use July 17 for better liquidity

Fundamental Note:
Q1 2026 EPS of $0.49 crushed the consensus estimate of -$0.58 — an exceptional beat.
Company raised dividend for 14 consecutive years (3.08% yield). Mizuho (May 27),
Jefferies (May 26), Goldman Sachs (May 19), BMO (May 13), and Argus (May 14) all raised
price targets in May, with Mizuho also upgrading to Outperform. Multiple upgrades in a
single month is a very strong signal.
```

**Instrument: Paired Debit Spread (Preferred)**

- IV ~38–40% (moderate) → debit spreads are cost-effective
- High conviction (score 100) + RSI trigger + fresh analyst upgrade
- Bullish bias with upside to $212; paired hedge protects against pullback to 52W low

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~50 DTE)

Primary Spread (Bull Call Spread):
  Size: 2 contracts
  Strikes: Long 175 call / Short 185 call
  Net Debit: ~$4.50/share (~$450/contract)
  Max Profit: ~$5.50/share (~$550/contract)
  Max Loss: ~$4.50/share (~$450/contract)
  Breakeven: ~$179.50

Opposite Hedge (Bear Put Spread):
  Size: 1 contract (half-size)
  Strikes: Long 175 put / Short 160 put
  Net Debit: ~$4.78/share (~$478/contract)
  Max Profit: ~$10.22/share (~$1,022/contract)  [~2.1× its own risk ✓]
  Max Loss: ~$4.78/share (~$478/contract)

Combined Position:
  Total Debit / Max Loss: ~$1,378
  Payout if bullish thesis right (PSX > $185): ~+$622 net (~+45%)
  Payout on violent move down (PSX < $160): ~+$122 net (roughly breakeven)
  Main Risk: PSX stays in $160–$185 range at expiry; both spreads decay
  ⚠️ Liquidity note: PSX options have low OI on most strikes. Confirm fills are
     achievable before legging in; consider using a limit order at the mid.
```

---

### 2. VLO — Valero Energy (Refining)

```
Ticker: VLO
Current Price: $244.10
Sector: Energy — Oil & Gas Refining & Marketing
Score: 95/115 (A:40 B:25 C:20 D:15 Ded:-5)
  Deduction: -5 insider selling ($3.9M in last 3 months)

Setup Summary:
VLO is in a powerful 52-week uptrend (+80.9% YTD vs S&P +8.1%), having recently pulled
back to its 50-day EMA (~$237.67) before snapping back with trigger C (close above prior
day's high). Volume is dramatically below average on the consolidation (-52%), confirming
healthy absorption with no distribution. The Iran crisis has materially improved US
refining margins — analysts across the board have lifted price targets, with Mizuho raising
to $289 (May 27) and JPMorgan maintaining Buy with $299 target. VLO's Q1 2026 EPS of
$4.22 smashed the $3.07 consensus by 37%.

Entry Zone: $240–$248 (around recent 50 EMA test zone)
Stop Loss: $230.00 — below 50-day EMA ($237.67); a close below this level invalidates
Target 1: $262.50 — 52-week high / all-time high area
Target 2: $289.00 — Mizuho price target (May 27); Raymond James $290 target
Risk/Reward: 1.3:1 to T1 | 3.2:1 to T2 (position trade target)

Key Risks:
- Earnings: July 23, 2026 (~56 days out — safely outside 3-week hard filter)
- Insider selling noted ($3.9M over 3 months) — minor concern; deducted -5 pts
- Approaching 52-week high: breakout to new all-time highs required for full thesis
- Iran crisis de-escalation could reduce refining margin tailwind
- Sector concentration risk if combined with PSX (both oil & gas refining)

Fundamental Note:
VLO posted Q1 2026 EPS of $4.22 vs $3.07 consensus (37% beat). Full-year EPS expected
to grow 164% YoY to $28.02. Revenue up 7% YoY to $32.4B. 11 Buy / 2 Strong Buy / 7 Hold
from 20 analysts; consensus target $258.33. The Iran crisis driving global refining
cracks higher is a direct margin tailwind for US refiners.
```

**Instrument: Paired Debit Spread (Preferred)**

- IV ~42% (moderate-elevated from energy volatility) → still favor debit spreads
- High conviction + sector tailwind; paired hedge appropriate given Iran geopolitical risk

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~50 DTE)

Primary Spread (Bull Call Spread):
  Size: 2 contracts
  Strikes: Long 240 call / Short 260 call
  Net Debit: ~$8.45/share (~$845/contract)
  Max Profit: ~$11.55/share (~$1,155/contract)
  Max Loss: ~$8.45/share (~$845/contract)
  Breakeven: ~$248.45

Opposite Hedge (Bear Put Spread):
  Size: 1 contract (half-size)
  Strikes: Long 230 put / Short 210 put
  Net Debit: ~$5.12/share (~$512/contract)
  Max Profit: ~$14.88/share (~$1,488/contract)  [~2.9× its own risk ✓]
  Max Loss: ~$5.12/share (~$512/contract)

Combined Position:
  Total Debit / Max Loss: ~$2,202
  Payout if bullish thesis right (VLO > $260): ~+$1,798 net (~+82%)
  Payout on violent move down (VLO < $210): ~-$202 net (roughly breakeven)
  Main Risk: VLO stays in $210–$240 range at expiry; both spreads decay
```

---

### 3. BA — Boeing (Aerospace & Defense)

```
Ticker: BA
Current Price: $228.69
Sector: Industrials — Aerospace & Defense
Score: 95/115 (A:40 B:25 C:15 D:15 Ded:0)
  Cat C reduced: EPS still negative (no EPS growth pts); all other checks met

Setup Summary:
Boeing is in a recovery uptrend — the stock has rebuilt from $176.77 (52W low) to $228.69,
with the daily and weekly EMAs in bullish alignment. The recent pullback to the 50-day EMA
zone (~$223) was orderly (volume -31% below average) and the stock has snapped back through
the 20-day EMA with trigger C (close above prior day's high). Citi raised its price target to
$260 (May 18) calling the aerospace selloff a "gift," and JPMorgan raised to $270 (Overweight).
The 737 MAX 7/10 certification is approaching its final stages per CEO Kelly Ortberg (May 2026
conference), and the backlog hit a record $695B in Q1 2026. This is a recovery story with
improving operational metrics and a specific near-term catalyst.

Entry Zone: $224–$232 (above 50-day EMA $223.38, confirmed volume contraction on pullback)
Stop Loss: $218.00 — below 50-day EMA ($223.38); a sustained close below here breaks setup
Target 1: $244.00 — recent 60-day high resistance zone
Target 2: $260.00 — Citi price target; consensus analyst target $259.80
Risk/Reward: 1.5:1 to T1 | 2.9:1 to T2 (position trade target, using $229 entry)

Key Risks:
- Earnings: July 28, 2026 (~61 days out — safely outside 3-week hard filter)
- Still reporting adjusted losses; execution risk on 737/787 ramp-up
- Recovery thesis depends on certification timeline; delays would disappoint
- Forward P/E 54.7, trailing P/E 90.4 — premium valuation requiring ongoing improvement
- Broad market selloff could interrupt the recovery narrative

Fundamental Note:
Q1 2026: Revenue $22.22B (+14% YoY), 143 deliveries with a 70% beat vs consensus.
Record backlog $695B; consolidated debt reduced to $47.2B from $54.1B. The 737 program
runs at 42/month, 787 stabilizing at 8/month. EPS remains negative but trajectory is
improving. 15 Buy + 2 Strong Buy, 5 Hold, 2 Sell from 23 analysts; consensus PT $259.80.
Wells Fargo initiated Overweight ($250) in April; multiple firms raised targets in May.
```

**Instrument: Paired Debit Spread (Preferred)**

- IV ~35–36% (moderate-low, highly liquid options) → ideal for debit spreads
- BA has the most liquid options of the three; excellent for paired structure execution
- Recovery thesis = directional move; paired hedge protects against execution disappointment

```
Instrument: Paired Debit Spread
Bias: Bullish
Expiry: July 17, 2026 (~50 DTE)

Primary Spread (Bull Call Spread):
  Size: 1 contract
  Strikes: Long 230 call / Short 250 call
  Net Debit: ~$6.83/share (~$683/contract)
  Max Profit: ~$13.17/share (~$1,317/contract)
  Max Loss: ~$6.83/share (~$683/contract)
  Breakeven: ~$236.83

Opposite Hedge (Bear Put Spread):
  Size: 1 contract (note: sized 0.73R due to chain structure; monitor combined risk)
  Strikes: Long 220 put / Short 200 put
  Net Debit: ~$5.00/share (~$500/contract)
  Max Profit: ~$15.00/share (~$1,500/contract)  [3.0× its own risk ✓]
  Max Loss: ~$5.00/share (~$500/contract)

Combined Position:
  Total Debit / Max Loss: ~$1,183
  Payout if bullish thesis right (BA > $250): ~+$817 net (~+69%)
  Payout on violent move down (BA < $200): ~+$817 net (~+69%, symmetric!)
  Main Risk: BA stays in $200–$230 range at expiry; both spreads decay
  ✅ Best liquidity of the three: OI 4,375 at 230 call, 3,211 at 250 call, 1,596 at 200 put
```

---

## Watchlist
_Names with constructive scan/research but no immediate entry (timing / extension)._

| Ticker | Why watching | Trigger to revisit |
|--------|--------------|-------------------|
| GD | Score 83/115 (A:39 B:18 C:20 D:11 Ded:-5). Setup is technically valid — weekly golden cross, 50 EMA rising, orderly pullback. Earnings beat Q1 2026 ($4.10 vs $3.67) with $131B backlog. However: Citigroup lowered PT to $364 (Neutral), Deutsche Bank downgraded to Hold — mixed analyst signals. **Significant insider selling: ~$43M over last 3 months.** Morgan Stanley raised PT to $435 (April 30, Overweight). | Wait for insider selling to subside and/or price to retrace closer to the 50 EMA ($341.95) for a better R:R entry. Monitor analyst actions — a re-rating toward Buy from a major firm would improve conviction. |

---

## Open Trades
_User-confirmed trades from the last 14 days, outcome not yet recorded._

| Date | Ticker | Entry Zone | Stop | Target 1 | Target 2 | R:R |
|------|--------|------------|------|----------|----------|-----|
| — | — | — | — | — | — | — |

_No confirmed trades on file. Previous run (2026-04-16) was an empty scan; this is a scheduled/unattended run — no trade rows appended per Step 6 (unattended mode)._

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

## Scoring Detail

| Ticker | Cat A | Cat B | Cat C | Cat D | Deductions | **Total** |
|--------|-------|-------|-------|-------|------------|-----------|
| PSX    | 40    | 25    | 20    | 15    | 0          | **100/115** |
| VLO    | 40    | 25    | 20    | 15    | -5         | **95/115**  |
| BA     | 40    | 25    | 15    | 15    | 0          | **95/115**  |
| GD     | 39    | 18    | 20    | 11    | -5         | **83/115**  |

_Cat B uses T2 (position trade target) for R:R scoring, consistent with the strategy's weeks-to-months holding period._
_All B-Xtrender items (max 15 pts in Cat A) are 0 — unverifiable without browser-use/TradingView. Actual scores may be higher if visual check confirms green signals._

---

## Notes — Scheduled Run Limitations

1. **TrendSpider browser-use unavailable**: Scan was executed using a yfinance-based equivalent applying the same 4-group condition logic from `config.md`. All 4 tickers pass the same pre-filters as the TrendSpider scanner.
2. **B-Xtrender not verified**: Requires `browser-use --profile "Tim" --headed` to open TradingView chart `z25AhAlV`. Scores could be higher by up to 15 pts per ticker. **Verify before execution.**
3. **No trade rows appended**: Scheduled/unattended run — per AGENT.md Step 6, rows are only added when a user confirms trades were opened.
4. **Sector concentration**: PSX and VLO are both in "Oil & Gas Refining & Marketing." Combined allocation would concentrate in a single sub-industry. Consider sizing accordingly or choosing one of the two.
