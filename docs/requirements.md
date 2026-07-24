# Trading Strategy — Product Requirements

Canonical description of this repo’s shape and features for development agents. Feature detail lives in the linked docs below.

## Docs index

| Doc | Covers |
| --- | --- |
| [feature-webhooks.md](./feature-webhooks.md) | Webhook → Tiger orders: behaviour, portfolio sizing/trim-to-fund, payload schema |
| [feature-dashboard.md](./feature-dashboard.md) | Dashboard + provisional P&L |
| [feature-trade-prompts.md](./feature-trade-prompts.md) | Scheduled natural-language trade prompts |
| [feature-strategies.md](./feature-strategies.md) | `strategies/` research/subagent workspace |
| [feature-trading-cli.md](./feature-trading-cli.md) | `trading/` execution-only agent workspace |
| [environment.md](./environment.md) | Full env var reference + manual setup checklist |
| [tiger-accounts.md](./tiger-accounts.md) | Paper vs live Tiger account ids, how to switch |
| [webhooks.md](./webhooks.md) | Operational webhook setup: TrendSpider bot templates, TradingView Pine Script template, curl smoke test |

Legacy Cursor agent strategy workflows live under [`strategies/`](../strategies/) — see [feature-strategies.md](./feature-strategies.md).

---

## Purpose

Build and maintain a **Next.js (Vercel) app** that:

1. Accepts webhook trade signals from any source (**TrendSpider Strategy Bots**, **TradingView Pine Script**, manual curl)
2. Places **Tiger Brokers paper** US share **limit** orders
3. Exposes a **password-gated dashboard** for account, positions, and webhook event history
4. Lets Tim lodge a **scheduled natural-language trade prompt** (stocks, single-leg options, or vertical spreads) that a Claude tool-calling agent executes unattended at the resolved run time

Legacy Cursor agent strategy workflows remain in `strategies/` for research and future subagent use; they are not required for the live webhook → Tiger path.

---

## System shape

```text
TrendSpider Strategy Bot / TradingView Pine alert() / curl
        │  POST JSON + ?token=
        ▼
app/api/webhooks/signal          ← auth, validate, persist PENDING
        │  after()
        ▼
lib/execute-signal.ts            ← Tiger preview + place
        │
        ▼
Supabase Postgres (WebhookEvent) + Tiger OpenAPI (paper)

Dashboard (session cookie) ──► /api/account, /api/events, /api/trade-prompts

Dashboard "Schedule trade" ──► POST /api/trade-prompts
        │  lib/parse-schedule.ts resolves scheduledFor
        ▼
Supabase Postgres (TradePrompt, PENDING_SCHEDULE → SCHEDULED)
        │  lib/qstash.ts publishJSON(notBefore = scheduledFor)
        ▼
Upstash QStash ──► POST /api/trade-prompts/execute  (at the resolved time)
        │  signature-verified, EXECUTING
        ▼
lib/trade-agent/ (Claude tool-calling loop) ──► lib/tiger.ts (Tiger OpenAPI)
        │
        ▼
TradePrompt updated (PLACED | PARTIALLY_PLACED | SKIPPED | FAILED) + lib/notify.ts (WhatsApp)
```

### Key directories

| Path | Role |
| --- | --- |
| `app/` | App Router: login, dashboard page, API route handlers |
| `components/` | shadcn UI + dashboard client |
| `lib/` | Auth, Prisma, Zod webhook schema, Tiger client, signal execution, scheduled-prompt parsing/scheduling/notification |
| `lib/trade-agent/` | Claude tool-calling agent that executes a scheduled trade prompt at run time |
| `prisma/` | Postgres schema (`WebhookEvent`, `TradePrompt`) |
| `docs/` | Product requirements + feature docs + TrendSpider setup |
| `strategies/` | Cursor/agent strategy workflows (research; future subagents) |
| `trading/` | Execution-only agent home — places a literal instruction via `tiger-brokers`, independent of the web app |
| `.agents/skills/` | Canonical agent skills (symlinked into `.cursor` / `.claude`) |
| `scripts/` | Python helpers (TrendSpider scan, yfinance, Tiger CLI) |

### Runtime constraints

- **Stack:** Next.js App Router, React, TypeScript, Prisma, Zod, shadcn, Tiger OpenAPI JS SDK
- **Hosting:** Vercel; Node.js runtime for webhook/Tiger routes (`runtime = "nodejs"`)
- **DB:** Supabase Postgres via `DATABASE_URL`. The connected project (`jzkobrxiuflwbfcatllm`, "Restio Dev") is a **shared, multi-tenant Supabase project** used by several unrelated apps (org/profile tables, `amala_*`, `cvg_cv`, `cbt_threads`, `ot_enquiries`, etc.) — **every table this app owns must be prefixed `trading_`** (currently `trading_webhook_events`, `trading_trade_prompts`, plus enum types `trading_webhook_event_status` / `trading_trade_prompt_status`) to stay identifiable in `list_tables` output and avoid clobbering another app's naming. Set the Postgres-level name via Prisma's `@@map(...)` on the model/enum — the TypeScript-facing model names stay unprefixed (`WebhookEvent`, `TradePrompt`).
  - **Security:** Row Level Security is enabled on both `trading_*` tables with **no policies** — this app only ever connects with a direct `DATABASE_URL`/Prisma using the `postgres` role, which has `BYPASSRLS` and is unaffected; RLS-with-no-policy just default-denies the `anon`/`authenticated` roles used by `supabase-js` elsewhere in this shared project (same pattern as `public.agent_snapshots`). Add explicit `to authenticated`/`to service_role` policies only if another service in this project ever needs client-side access to these tables.
- **Auth (dashboard):** Shared `DASHBOARD_PASSWORD` + signed cookie (`AUTH_SECRET`) — not Supabase Auth
- **Gatekeeping:** `proxy.ts` (not deprecated `middleware.ts`); webhook + login routes are public; everything else requires session

---

## Non-goals (current v1)

- Market orders, options orders from webhooks (webhooks remain stock-only; options/spreads are only reachable via the scheduled trade prompt flow), multi-broker routing
- Supabase Auth / multi-user accounts
- Automatic bridging of `strategies/` CSV picks into webhook execution (manual / future work)
- No shared code/guardrails between `trading/` (local CLI, Python `tigeropen`) and `lib/trade-agent/` (web app, TypeScript/Anthropic SDK) — two independent execution paths by design, each self-enforcing its own caps from the same `.env` values
- Full NYSE holiday calendar for `market_open`/`market_close` schedule resolution (weekends only, see [feature-trade-prompts.md](./feature-trade-prompts.md))
- Native multi-leg combo orders (spreads are two sequential single-leg orders, not an atomic ticket)
- A scheduled/periodic portfolio rebalance job — the portfolio manager only sizes/trims reactively inside the `buy` webhook path (see [feature-webhooks.md](./feature-webhooks.md) "Portfolio management"); idle cash sitting above the `PORTFOLIO_MIN_INVESTED_PCT` gap with no new signal is not proactively deployed
- Averaging up — a `buy` signal for a symbol already held is skipped rather than adding to the position
- Trim-fill reconciliation — trim proceeds used to size the following buy are assumed at the trim's own limit price, not polled/confirmed against actual fills (same class of limitation as `lib/pnl.ts`'s provisional P&L)

---

## Development guidance

When implementing or changing product behaviour:

1. Read **this file** and the relevant feature doc above for intended shape and features
2. Use the **nextjs** skill and version-matched docs under `node_modules/next/dist/docs/`
3. Prefer existing patterns in `app/api/`, `lib/`, and `proxy.ts`
4. Keep webhook contract and dashboard event statuses consistent with the linked feature docs
5. For strategy/subagent work, start from `strategies/<name>/AGENT.md` — do not invent a parallel strategy layout
6. When changing a feature, update its doc (and [webhooks.md](./webhooks.md) too, for webhook changes) in the same change
