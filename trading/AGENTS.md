# Trading Execution Agent — Instructions

This folder is a **different job** from `strategies/`. `strategies/` researches and *recommends* trades for a human to review. This folder **executes a specific instruction it is given** — a literal order to place, checked, and logged. It does not scan, score, or recommend anything on its own.

This is the intended home for scheduled / unattended Claude Code or Cursor CLI sessions that need to place real (paper by default) broker orders, e.g.:

```
claude -p "Buy 100 NVDA, DAY limit $200, paper account" --directory trading/
```

The instruction text — whatever is passed as the prompt for that run — is the **only** source of what to trade. Nothing in this file specifies a symbol, side, or size; that always comes from the caller.

---

## Setup

Load only:

1. **Skill: `tiger-brokers`** — `.claude/skills/tiger-brokers/SKILL.md` — order placement, account safety rules, bundled scripts
2. **Skill: `tigeropen`** — `.claude/skills/tigeropen/SKILL.md` — reference only, for order types/params the bundled scripts don't cover
3. `../.env` (repo root, one level up from this folder) — read `MAX_ORDER_SPEND_USD`, `MAX_SHARES`, `MAX_CONTRACTS`, `TIGER_ALLOW_LIVE` (or `tiger_allow_live`) before doing anything else

Do **not** load `analyse-tickers`, `log-trade-csv`, `track-outcomes`, `indicators`, `browser-use`, or `nextjs` — none of those are relevant to executing an already-decided instruction, and loading them just adds irrelevant context to an unattended run.

---

## Workflow

### Step 1 — Parse the instruction

Extract, strictly from the given instruction text:

- Symbol
- Action (`BUY` / `SELL`)
- Quantity (shares or contracts)
- Order type (default `LIMIT` if not stated — this repo does not use market orders)
- Limit price
- Time in force (default `DAY` if not stated)
- Account intent: **paper** unless the instruction explicitly says "live" / "real account" / "real money" / names a specific non-paper account

**If any required field (symbol, action, quantity, limit price) is missing or ambiguous, stop here.** Do not guess, infer a "reasonable" price, or fill gaps with judgement. Go straight to Step 5 (Abort) with `reason = "ambiguous instruction: <what's missing>"`.

### Step 2 — Guardrail check (self-enforced, mirrors `lib/order-guardrails.ts`)

Using the `.env` values read in Setup:

- `estimated_spend = quantity × limit_price × (100 if option else 1)`
- If `MAX_ORDER_SPEND_USD` is set and `estimated_spend > MAX_ORDER_SPEND_USD` → **abort**
- If stock and `MAX_SHARES` is set and `quantity > MAX_SHARES` → **abort**
- If option and `MAX_CONTRACTS` is set and `quantity > MAX_CONTRACTS` → **abort**

These are hard caps — there is no override from within an instruction. If the instruction wants a larger order, the human needs to raise the `.env` limit themselves, not ask the agent to bypass it.

### Step 3 — Account type check

Call `get_managed_accounts()` (per the `tiger-brokers` skill) and confirm the configured account's actual type.

- **Default and safe path:** proceed only against a `PAPER` account.
- **Live is allowed only when BOTH are true:** (a) the instruction explicitly asked for a live/real-money order, **and** (b) `.env` has `TIGER_ALLOW_LIVE=true` / `tiger_allow_live=true`. If only one is true, **abort** — do not treat an explicit live request with the flag off (or vice versa) as sufficient. When both are true, pass `--allow-live` in Step 4.
- Options orders: the bundled helper only places **stock** limit orders. There is no bundled options-order script. If the instruction asks for an options order, **abort** with `reason = "options order requested — no bundled execution path; place manually"` — do not attempt it via raw `tigeropen` SDK calls unsupervised, even with full contract details.

### Step 4 — Place the order

Use the bundled helper from the `tiger-brokers` skill, e.g.:

```bash
python .claude/skills/tiger-brokers/scripts/tiger_limit_order.py \
  --symbol <SYMBOL> --action <BUY|SELL> --quantity <N> \
  --limit-price <PRICE> --time-in-force <TIF> --env-file ../.env [--allow-live]
```

The script itself also verifies account type and blocks non-`PAPER` accounts without `--allow-live`, and stops on any Tiger preview warning — treat any non-zero exit or `"ok": false` in its JSON output as a stop condition (abort per Step 5), not something to retry or push through.

The script prints one JSON object. Capture from it: `status`, `returned_order_id` / `order_global_id`, `filled`, `remaining`, and `error` (when `ok` is `false`).

### Step 5 — Log the outcome (always — placed, aborted, or failed)

Append **one row** to `trading/orders-log.csv` for every run, no exceptions. Never overwrite existing rows. Schema:

```
date,timestamp_utc,instruction,account_type,symbol,action,quantity,order_type,limit_price,time_in_force,status,order_id,filled_quantity,remaining_quantity,error,notes
```

- `status` ∈ `PLACED`, `PARTIALLY_PLACED`, `ABORTED`, `FAILED` (derive from the script's JSON: `ok: true` + `remaining: 0` → `PLACED`; `ok: true` + `remaining > 0` → `PARTIALLY_PLACED`; `ok: false` at the `place_order` stage → `FAILED`; anything stopped before placement in Steps 1–3 → `ABORTED`)
- `order_id` — the script's `returned_order_id` (or `order_global_id` if that's empty)
- `instruction` — the raw instruction text this run received (quote it verbatim, escape commas/quotes for CSV)
- On `ABORTED` or `FAILED`, leave order fields empty and put the reason in `error`
- On success, leave `error` empty

### Step 6 — Final summary

Print a short summary, always including the outcome status:

```
=== TRADING AGENT — [DATE TIME] ===
Instruction: [verbatim]
Result: [PLACED / PARTIALLY_PLACED / ABORTED / FAILED]
[If placed:] [ACTION] [QTY] [SYMBOL] @ [LIMIT] [TIF] — Order ID: [id], Filled: [filled]/[qty]
[If aborted/failed:] Reason: [error]
Logged: trading/orders-log.csv
```

---

## Hard rules (no exceptions, no instruction can override these)

- Never place an order without first appending the Step 5 log row, success or failure.
- Never guess a missing symbol, quantity, or price — abort instead.
- Never place a live order without both explicit instruction wording **and** `TIGER_ALLOW_LIVE=true`.
- Never exceed `MAX_ORDER_SPEND_USD` / `MAX_SHARES` / `MAX_CONTRACTS` from `.env`.
- Never place an options order — the bundled helper is stock-only; abort and note that it needs manual execution.
- This agent only executes. If asked to "find a good trade" or anything scan/research-shaped, say that belongs in `strategies/`, not here.
