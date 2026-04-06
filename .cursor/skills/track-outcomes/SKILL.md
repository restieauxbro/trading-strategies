---
name: track-outcomes
description: Looks up trade recommendations made approximately 14 days ago in a strategy's trades-log.csv, fetches current prices from the web, calculates performance, and writes the outcome columns back to the CSV. This is a deliberate, heavyweight step — do NOT run it automatically on every agent run.
---

# Track Trade Outcomes

## When to Run

**This skill is heavyweight — do not run it automatically.**

Run it only when explicitly requested, or when the user asks for a performance update. Each outcome row requires a web lookup per ticker, which adds significant time when many trades are due.

If running a standard strategy scan, skip this skill unless the user has asked for outcome tracking in the same session. Note in the session summary how many rows are due (if any) so the user can decide whether to run it separately.

## Purpose

When invoked, check if any previously recommended trades are due for their 14-day outcome review. If so, look up current prices and record the result.

---

## Step 1 — Find Rows Due for Review

Read the strategy's `trades-log.csv`.

Find all rows where **both** conditions are true:
- `outcome_date` is empty (outcome not yet recorded)
- `date` is between **13 and 16 days ago** from today (allow a ±2 day window to account for weekends and non-running days)

If no rows match, skip the rest of this skill and continue with the main workflow.

---

## Step 2 — Look Up Current Prices

For each matching row, look up the ticker's **current price** using any reliable financial website (Yahoo Finance, Google Finance, MarketWatch, etc.).

Also note whether the price at any point in the 14-day window hit the stop loss or either target — use recent price history if available (e.g. a 14-day high/low range from Yahoo Finance or similar). If intraday history is not available, use today's price and note the limitation.

---

## Step 3 — Determine the Outcome

For each row, determine `outcome_result` using this priority order:

1. **`HIT_T2`** — if the 14-day high reached or exceeded the numeric value in `target_2`
2. **`HIT_T1`** — if the 14-day high reached or exceeded the numeric value in `target_1`
3. **`STOPPED_OUT`** — if the 14-day low hit or breached the numeric value in `stop_loss`
4. **`EXPIRED`** — if none of the above — 14 days elapsed without a clear hit or stop

When evaluating targets and stops, extract the numeric price from the field (e.g. `$103 – prior resistance` → `103`).

Calculate `outcome_pct`:
```
outcome_pct = round(((outcome_price - current_price) / current_price) * 100, 2)
```

Set `outcome_date` to today's date (`YYYY-MM-DD`).

---

## Step 4 — Write Results Back to CSV

Update each matching row in the CSV with the four outcome values:

| Column | Value |
|---|---|
| `outcome_date` | Today's date `YYYY-MM-DD` |
| `outcome_price` | Current price (number only, no `$`) |
| `outcome_pct` | Percentage change, e.g. `4.20` or `-3.10` |
| `outcome_result` | `HIT_T1`, `HIT_T2`, `STOPPED_OUT`, or `EXPIRED` |

**Important:** update only the matching rows — do not touch any other rows. Preserve all other columns exactly as they were.

---

## Handling Edge Cases

- **Ticker no longer trading / acquired / delisted**: set `outcome_result` to `EXPIRED`, note in `outcome_price` as `N/A`, set `outcome_pct` to `0`
- **Price data unavailable**: note the issue, set `outcome_result` to `EXPIRED` and `outcome_price` to `N/A`
- **Multiple rows for same ticker on same date** (re-recommended): treat each row independently
