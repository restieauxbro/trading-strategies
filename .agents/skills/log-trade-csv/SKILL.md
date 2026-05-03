---
name: log-trade-csv
description: Appends trade recommendations to a strategy's trades-log.csv file following the standard schema. Use when saving trade picks to a CSV log, writing analysis results to a file, or appending rows to a trade log after completing a strategy scan.
---

# Log Trade to CSV

## File Location

Each strategy writes to its **own** log file only:

```
strategies/<strategy-name>/trades-log.csv
```

Never write to another strategy's log file.

---

## Column Schema

Standard header row (create this if the file does not exist):

```
date,scan_timestamp,ticker,score,current_price,sector,entry_zone,stop_loss,target_1,target_2,risk_reward,setup_summary,key_risks,fundamental_note,outcome_date,outcome_price,outcome_pct,outcome_result
```

| Column | Format | Description |
|---|---|---|
| `date` | `YYYY-MM-DD` | Date the analysis was run |
| `scan_timestamp` | Human-readable datetime | Converted from scan's Unix ms timestamp |
| `ticker` | String | Stock symbol e.g. `AAPL` |
| `score` | Number | Total score out of 100 e.g. `72` |
| `current_price` | Number | Price at time of analysis e.g. `142.50` |
| `sector` | String | e.g. `Technology` |
| `entry_zone` | String | e.g. `$141–$143` |
| `stop_loss` | String | Level + reason e.g. `$136.20 – below swing low` |
| `target_1` | String | e.g. `$158 – prior resistance` |
| `target_2` | String | e.g. `$170 – measured move` |
| `risk_reward` | String | e.g. `2.8:1` |
| `setup_summary` | String | 1–3 sentence setup description |
| `key_risks` | String | Pipe-separated e.g. `Earnings Mar 18 \| Extended sector` |
| `fundamental_note` | String | 1–2 sentence fundamental context |
| `outcome_date` | `YYYY-MM-DD` or empty | Date the 14-day outcome was recorded |
| `outcome_price` | Number or empty | Actual price on `outcome_date` |
| `outcome_pct` | Number or empty | % change from `current_price` to `outcome_price`, e.g. `4.20` (positive = up) |
| `outcome_result` | Enum or empty | One of: `HIT_T1`, `HIT_T2`, `STOPPED_OUT`, `EXPIRED` |

### `outcome_result` definitions

| Value | Meaning |
|---|---|
| `HIT_T1` | Price reached or exceeded Target 1 within 14 days |
| `HIT_T2` | Price reached or exceeded Target 2 within 14 days |
| `STOPPED_OUT` | Price hit or breached the stop loss level within 14 days |
| `EXPIRED` | 14 days elapsed without hitting target or stop — inconclusive |

---

## Writing Rules

- **Always append** — never overwrite or delete existing rows
- **Create if missing** — create the file with the header row first, then append
- **Wrap in double quotes** any field containing commas, pipes, or line breaks
- **One row per pick** — if 3 picks, write 3 rows all with the same `date`
- **Leave outcome columns empty** on initial write — they are filled later by the `track-outcomes` skill
- **Empty scan** — write a single row with today's `date`, the `scan_timestamp`, all ticker fields empty, and `setup_summary` set to `No tickers found in scan — skipping run`

---

## Example Row (at recommendation time)

```csv
2026-03-07,2026-03-07 08:00 UTC,AFL,72,94.20,Financials,$93–$95,$89.50 – below swing low,$103 – prior resistance,$112 – measured move,2.6:1,"Pulling back to 50-day MA in a clean uptrend. Volume declining on down days.","Earnings Apr 30 | Sector rotation risk","Beat EPS estimates in Feb. Revenue growing 8% YoY.",,,,
```

## Example Row (after outcome is recorded)

```csv
2026-03-07,2026-03-07 08:00 UTC,AFL,72,94.20,Financials,$93–$95,$89.50 – below swing low,$103 – prior resistance,$112 – measured move,2.6:1,"Pulling back to 50-day MA in a clean uptrend. Volume declining on down days.","Earnings Apr 30 | Sector rotation risk","Beat EPS estimates in Feb. Revenue growing 8% YoY.",2026-03-21,103.50,9.87,HIT_T1
```
