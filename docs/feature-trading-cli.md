← [Requirements overview](./requirements.md)

# Feature: `trading/` folder (execution-only agent workspace)

A dedicated home for local Claude Code / Cursor CLI sessions (interactive or OS-cron/launchd-scheduled) that need to place a specific, already-decided order — the opposite job from `strategies/`, which researches and recommends (see [feature-strategies.md](./feature-strategies.md)). No scanning, scoring, or recommending happens here; the instruction (symbol, action, quantity, limit price) is supplied entirely by the caller as the prompt text.

This is a **separate execution path from `lib/trade-agent/`** — it does not go through the Next.js app, Prisma, QStash, or WhatsApp notification at all. It calls the `tiger-brokers` skill's Python helper (`tiger_limit_order.py`, using the `tigeropen` SDK directly) instead of `lib/tiger.ts`. The two paths are intentionally independent, with their own separately-enforced guardrails, rather than sharing code across the Python/TypeScript boundary.

## Layout

```text
trading/
├── AGENTS.md            ← standing contract (skills to load, guardrails, workflow steps)
├── CLAUDE.md             ← @AGENTS.md (Claude Code auto-load)
├── orders-log.csv         ← append-only; one row per run — placed, aborted, or failed
├── .claude/skills/         ← symlinks: tiger-brokers, tigeropen only
├── .claude/settings.local.json ← headless permission allow-list scoped to this folder
└── .cursor/skills/         ← same two symlinks, for Cursor CLI
```

## Behaviour (full detail in `trading/AGENTS.md`)

1. Parse the instruction strictly from the prompt text (symbol, action, quantity, limit price, time in force, paper vs. live intent). Missing/ambiguous fields → abort, never guess.
2. Self-enforce `MAX_ORDER_SPEND_USD` / `MAX_SHARES` / `MAX_CONTRACTS` from the root `.env` before calling into Tiger — this mirrors, but is a separate implementation from, `lib/order-guardrails.ts`.
3. Default to the `PAPER` account; a live order requires **both** explicit instruction wording **and** `TIGER_ALLOW_LIVE=true` in `.env`.
4. Options orders always abort — the bundled helper is stock-only; no bundled options-order script exists yet.
5. Place via `tiger_limit_order.py`, which independently verifies account type and previews before placing.
6. Append exactly one row to `orders-log.csv` every run, regardless of outcome.

## Implementation touchpoints

- Contract: `trading/AGENTS.md`, `trading/CLAUDE.md`
- Execution: `.agents/skills/tiger-brokers/scripts/tiger_limit_order.py` (symlinked into `trading/.claude/skills/` and `trading/.cursor/skills/`)
- Log: `trading/orders-log.csv`
- Permissions: `trading/.claude/settings.local.json`
