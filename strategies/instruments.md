# Instruments

This file is the shared instrument catalog for the strategy suite. Strategy-specific `config.md` files can tighten or override these rules, but this is the default source of truth for instrument definitions and preference order.

## Preferred Instrument — Paired Debit Spread

The preferred instrument for both directional strategies is a **paired debit spread**:

- Buy a **tight ATM vertical** in the trade direction, targeting roughly **1.0x reward to 1.0x risk**
- Buy **half-size** of the **opposite-direction vertical**, structured for roughly **2.0x reward to 1.0x risk**
- Use the same expiry for both legs unless liquidity or event risk clearly argues otherwise

This creates a **directionally biased, long-movement structure**:

- If price moves as expected, the primary spread should deliver the gain
- If price moves sharply the wrong way, the smaller opposite spread is designed to offset most or all of the loss
- The main failure mode is **drift / chop / time decay without expansion in realized movement**

It is not a pure long-vega trade. Treat it as a **defined-risk long-movement instrument** with a directional lean.

### Sizing Template

- Primary spread risk = `R`
- Hedge spread risk = `0.5R`
- Primary spread max profit target = about `+1.0R`
- Hedge spread max profit target = about `+1.0R` total contribution at full payout

That implies the hedge spread itself should return about **2x its own risk**, because it is traded at **half the size** of the primary spread.

### Bullish Version

- Primary: **bull call spread** at or near the money
- Hedge: **bear put spread** at half-size
- Best when you want upside participation but still want a defined-risk payoff if the move breaks sharply lower instead

### Bearish Version

- Primary: **bear put spread** at or near the money
- Hedge: **bull call spread** at half-size
- Best when you want downside participation but still want a defined-risk payoff if the move snaps sharply higher instead

### Construction Rules

- Target expiry: **21-45 DTE**
- Primary long strike: **ATM** or closest liquid strike
- Primary short strike: choose width so **max profit is roughly equal to max loss**
- Hedge spread: choose strikes and width so the **half-sized hedge** can make about **the same dollars** as the primary loses at max loss
- Prefer liquid underlyings and liquid strikes; avoid names with wide options markets
- Avoid forcing the structure when one side of the chain is illiquid enough to break the sizing math

### Output Block

```text
Instrument: Paired Debit Spread (preferred)
Bias: [Bullish / Bearish]
Expiry: [Month DD YYYY] (~[DTE] DTE)

Primary Spread:
  Structure: [Bull Call Spread / Bear Put Spread]
  Size: [N]
  Strikes: [long] / [short]
  Net Debit: ~$[amount] per spread
  Max Profit: ~$[amount]
  Max Loss: ~$[amount]

Opposite Hedge:
  Structure: [Bear Put Spread / Bull Call Spread]
  Size: [N/2]
  Strikes: [long] / [short]
  Net Debit: ~$[amount] per spread
  Max Profit: ~$[amount]
  Max Loss: ~$[amount]

Combined Position:
  Total Debit / Max Loss: ~$[amount]
  Expected Payout if thesis is right: ~$[amount]
  Expected Payout on violent move against thesis: ~$[amount]
  Main Risk: drift / compression / pinning between spreads
```

## Secondary Instruments

These remain valid but are now secondary to the paired debit spread unless strategy-specific rules say otherwise:

- `stock`
- `bull_call_spread`
- `bear_put_spread`
- `put_credit_spread`
- `bear_call_spread`
