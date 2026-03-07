---
name: analyse-tickers
description: Researches and scores a list of stock tickers for trade entry. Performs technical analysis, fundamental context, news research, and risk/reward assessment per ticker, then ranks and selects the best setups. Use when given a list of stock tickers to analyse, when running a trading strategy scan, or when asked to evaluate stocks for entry.
---

# Analyse Tickers

## Research Checklist (per ticker)

Use any reliable financial website (Yahoo Finance, Finviz, StockAnalysis.com, MarketWatch, Seeking Alpha, etc.):

**Technical**
- Current price and recent price action
- Trend structure: higher highs / higher lows on daily/weekly?
- Key support and resistance levels
- Proximity to 50-day and 200-day MAs
- Volume: confirming up moves? Above or below average?
- Notable chart patterns (bull flag, base breakout, ascending triangle, etc.)

**Fundamental**
- Sector and industry
- Most recent earnings: beat or miss? Date?
- **Upcoming earnings date** — flag clearly, this is a key risk
- Revenue and earnings growth trend (2–3 data points)
- Recent analyst upgrades/downgrades

**News & Catalysts**
- Significant news in the last 2–4 weeks
- Upcoming catalysts (earnings, product launches, regulatory decisions, etc.)

**Risk Assessment**
- Logical stop loss: swing low, key support, or ATR-adjusted level
- 1–2 price targets: resistance levels or measured moves
- Risk/reward ratio: `(Target 1 - Entry) / (Entry - Stop)`
- Red flags: earnings within 3 weeks, extended valuation, weak sector, insider selling

---

## Market Context Check

Before ranking tickers, briefly assess:
- Is the S&P 500 above or below its 200-day MA?
- Is VIX elevated (above ~25)?
- Overall trend: uptrend, downtrend, or consolidation?

If the market is in a confirmed downtrend, apply stricter filters and note this prominently.

---

## Scoring

Load the **Scoring System** section from the strategy's `config.md` before scoring any tickers. Each strategy defines its own points table, deductions, and minimum qualifying threshold.

Apply the scoring to each researched ticker:
1. Work through each category check and award the specified points
2. Apply all applicable deductions
3. Sum to a total score out of 100
4. Discard any ticker that falls below the **minimum threshold** defined in `config.md` — explain the exclusion briefly

Include the score breakdown in the per-ticker output (e.g. `Score: 72/100 (A:32 B:18 C:16 D:15 Ded:-9)`).

Rank qualifying tickers by total score, highest first.

---

## Output Format (per recommended ticker)

```
Ticker: [SYMBOL]
Current Price: $[price]
Sector: [sector]
Score: [total]/100 (A:[pts] B:[pts] C:[pts] D:[pts] Ded:[pts])

Setup Summary:
[2–3 sentences on the technical setup and why it is compelling]

Entry Zone: $[price or range]
Stop Loss: $[level] — [reason]
Target 1: $[level] — [reason]
Target 2: $[level] — [reason]
Risk/Reward: [X:1]

Key Risks:
- [2–3 bullets, include earnings date if applicable]

Fundamental Note:
[1–2 sentences on fundamentals and recent news]
```

---

## Behaviour Rules

- The scan is a filter, not a signal — do not recommend a ticker purely because it appeared
- If fewer tickers than required pass quality filters, only recommend those that do; explain exclusions
- Do not fabricate data — if information cannot be found, note it and downrank the ticker
- Always check upcoming earnings; exclude or prominently flag any ticker with earnings within 3 weeks
