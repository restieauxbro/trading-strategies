# Trading Strategy — Product Requirements

Canonical description of this repo’s shape and features for development agents.  
Operational webhook templates live in [trendspider-webhooks.md](./trendspider-webhooks.md). Agent workflows for research strategies live under [`strategies/`](../strategies/).

---

## Purpose

Build and maintain a **Next.js (Vercel) app** that:

1. Accepts **TrendSpider Strategy Bot** webhook signals
2. Places **Tiger Brokers paper** US share **limit** orders
3. Exposes a **password-gated dashboard** for account, positions, and webhook event history
4. Lets Tim lodge a **scheduled natural-language trade prompt** (stocks, single-leg options, or vertical spreads) that a Claude tool-calling agent executes unattended at the resolved run time

Legacy Cursor agent strategy workflows remain in `strategies/` for research and future subagent use; they are not required for the live webhook → Tiger path.

---

## System shape

```text
TrendSpider Strategy Bot
        │  POST JSON + ?token=
        ▼
app/api/webhooks/trendspider     ← auth, validate, persist PENDING
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
| `docs/` | Product requirements + TrendSpider setup |
| `strategies/` | Cursor/agent strategy workflows (research; future subagents) |
| `trading/` | Execution-only agent home — places a literal instruction via `tiger-brokers`, independent of the web app |
| `.agents/skills/` | Canonical agent skills (symlinked into `.cursor` / `.claude`) |
| `scripts/` | Python helpers (TrendSpider scan, yfinance, Tiger CLI) |

### Runtime constraints

- **Stack:** Next.js App Router, React, TypeScript, Prisma, Zod, shadcn, Tiger OpenAPI JS SDK
- **Hosting:** Vercel; Node.js runtime for webhook/Tiger routes (`runtime = "nodejs"`)
- **DB:** Supabase Postgres via `DATABASE_URL`. The connected project (`jzkobrxiuflwbfcatllm`, "Restio Dev") is a **shared, multi-tenant Supabase project** used by several unrelated apps (org/profile tables, `amala_*`, `cvg_cv`, `cbt_threads`, `ot_enquiries`, etc.) — **every table this app owns must be prefixed `trading_`** (currently `trading_webhook_events`, `trading_trade_prompts`, plus enum types `trading_webhook_event_status` / `trading_trade_prompt_status`) to stay identifiable in `list_tables` output and avoid clobbering another app's naming. Set the Postgres-level name via Prisma's `@@map(...)` on the model/enum — the TypeScript-facing model names stay unprefixed (`WebhookEvent`, `TradePrompt`).
  - **Security:** Row Level Security is disabled on both `trading_*` tables (flagged by Supabase's own advisor on creation). Not exploitable via this app, which only ever connects with a direct `DATABASE_URL`/Prisma (never `supabase-js`/anon key), but the tables are still exposed if this shared project's anon key is used client-side elsewhere. Enable + add policies before relying on RLS:
    ```sql
    ALTER TABLE public.trading_webhook_events ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.trading_trade_prompts ENABLE ROW LEVEL SECURITY;
    -- add policies (e.g. service-role-only) before enabling, or all access breaks
    ```
- **Auth (dashboard):** Shared `DASHBOARD_PASSWORD` + signed cookie (`AUTH_SECRET`) — not Supabase Auth
- **Gatekeeping:** `proxy.ts` (not deprecated `middleware.ts`); webhook + login routes are public; everything else requires session

---

## Feature: TrendSpider → Tiger webhooks

### Behaviour

1. **Endpoint:** `POST /api/webhooks/trendspider?token=<WEBHOOK_TOKEN>`
2. **Auth:** Query param `token` (preferred; TrendSpider cannot set reliable custom headers). Header `x-webhook-token` also accepted.
3. **Body:** JSON matching the Zod schema in `lib/webhook-schema.ts` (see [trendspider-webhooks.md](./trendspider-webhooks.md)).
4. **Ack fast:** Persist a `WebhookEvent` with status `PENDING`, return `{ ok, accepted, eventId, … }` immediately, then run Tiger placement in `after()` so TrendSpider’s ~5s timeout is respected.
5. **Actions:**
   - `buy` / `sell` — place DAY limit order for given quantity at `limit_price`
   - `flat` — resolve open long quantity for symbol and sell to flatten; `SKIPPED` if no position
6. **Order type:** US stock (`STK` / `USD`) DAY **limit** only — no market orders in v1
7. **Safety:** Non-`PAPER` Tiger accounts blocked unless `TIGER_ALLOW_LIVE=true`; preview must pass before place
8. **Statuses:** `PENDING` → `PLACED` | `PREVIEW_FAILED` | `SKIPPED` | `FAILED`

### Payload fields (required vs optional)

| Field | Required | Notes |
| --- | --- | --- |
| `symbol` or `ticker` | Yes | Uppercased |
| `action` | Yes | `buy` \| `sell` \| `flat` |
| `quantity` (or `qty` / `order_contracts`) | Yes for buy/sell | Not required for `flat` |
| `limit_price` or `price` | Yes | Must be a resolved number (not an unresolved `%placeholder%`) |
| `bot_name`, `timeframe`, `bot_status`, `comment` | No | Stored for dashboard/logs |

### Implementation touchpoints

- Route: `app/api/webhooks/trendspider/route.ts`
- Schema: `lib/webhook-schema.ts`
- Execution: `lib/execute-signal.ts`
- Broker: `lib/tiger.ts`
- Persistence: `prisma/schema.prisma` → `WebhookEvent`

When changing webhook behaviour, update this file and [trendspider-webhooks.md](./trendspider-webhooks.md) together.

---

## Feature: Dashboard

- Login at `/login` with `DASHBOARD_PASSWORD`
- Home dashboard shows Tiger account metadata, open positions, recent webhook events, and the scheduled trade prompts panel
- APIs (session-protected): `GET /api/account`, `GET /api/events`, `GET /api/trade-prompts`, `POST /api/trade-prompts`, `POST /api/trade-prompts/[id]/cancel`
- Auth routes: `POST /api/auth/login`, `POST /api/auth/logout`

---

## Feature: Scheduled natural-language trade prompts

Lets Tim lodge a prompt like *"at market open buy a $10-wide call spread on GOOGL at the money expiring in 3 months"* while asleep in Australia; it runs unattended at the resolved US-market-relevant time.

### Behaviour

1. **Lodge:** Tim types a free-text prompt in the dashboard's "Scheduled trade prompts" panel (`components/trade-prompts.tsx`) and submits it to `POST /api/trade-prompts` (session-protected).
2. **Resolve run time:** `lib/parse-schedule.ts` sends the prompt + current time to Claude, which *classifies* the timing intent (`market_open` | `market_close` | `relative_offset` | `explicit_datetime`) via a forced tool call — it does not compute the timestamp itself. Deterministic code then resolves the exact UTC `scheduledFor`:
   - `market_open` / `market_close` → next trading day at 9:30 / 16:00 `America/New_York`, skipping weekends only (**known gap:** no full NYSE holiday calendar in v1 — a prompt lodged right before a market holiday resolves to that holiday's date).
   - `relative_offset` / `explicit_datetime` → straightforward date math off the model-extracted fields, converted from the stated (or inferred) IANA timezone.
3. **Persist + schedule:** A `TradePrompt` row is created (`PENDING_SCHEDULE`), then `lib/qstash.ts` calls Upstash QStash `publishJSON` with `notBefore = scheduledFor` and callback `POST /api/trade-prompts/execute`. On success the row moves to `SCHEDULED` with `qstashMessageId` stored; on failure it's marked `FAILED` with the error, and returned to the UI either way.
4. **Cancel:** While `SCHEDULED`, `POST /api/trade-prompts/[id]/cancel` deletes the QStash message and sets `CANCELLED`.
5. **Execute (at the scheduled time):** QStash calls `POST /api/trade-prompts/execute` with `{ promptId }`. The route is public at the proxy layer (like `/api/webhooks/`) but signature-verified via `@upstash/qstash/nextjs`'s `verifySignatureAppRouter` — wrapped lazily per-request (not at module scope) so a missing signing key fails that request, not the whole build. Duplicate/retried QStash deliveries are no-ops once the row has left `SCHEDULED`/`PENDING_SCHEDULE`.
6. **Agent run:** `lib/trade-agent/` re-reads the *raw prompt* fresh (not the resolved time) and runs a bounded (max 8 iterations) Claude tool-calling loop with tools backed by `lib/tiger.ts`: `get_stock_quote`, `get_option_expirations`, `get_option_chain`, `get_positions`, `place_stock_order`, `place_option_leg`, and a terminal `report_result` the agent must call exactly once to conclude.
7. **Persist + notify:** The final `status`/`symbol`/`orderSummary`/`legs`/`agentTranscript`/`error` are written back to the `TradePrompt` row, then `lib/notify.ts` sends a plain-text WhatsApp summary via Twilio's REST API and records `notifiedAt`.

### Order scope and the multi-leg constraint

- Supports stock buy/sell, single-leg option buy/sell, and vertical option spreads (calls or puts, debit or credit) — all via the same NL flow. Spread width **must be explicit in the prompt** (e.g. "$10 wide"); if the agent can't identify two distinct legs from a prompt that describes a spread, it must call `report_result` with `status=skipped` rather than guess.
- **`@tigeropenapi/tigeropen` has no native multi-leg combo order** (confirmed by spiking `previewOrder`/`placeOrder` against the live paper/standard account — `OrderRequest` takes one `secType`/`expiry`/`strike`/`right` per order). A spread is placed as **two sequential single-leg orders**, long (BUY) leg first — if only one leg fills, ending up long a capped-risk option is safer than naked-short. The system prompt in `lib/trade-agent/system-prompt.ts` enforces this ordering and forbids attempting the short leg if the long leg failed.
- `get_option_chain` requires quote permissions the configured dev account may not have (observed: `4000 permission denied` on the live sandbox account used during development) — it reports `available:false` and the agent falls back to `get_stock_quote` plus the option order's own preview step to validate a strike.

### Safety and guardrails

- Reuses the existing paper-account guard (`assertPaperOrAllowed` / `TIGER_ALLOW_LIVE`) from the webhook path — **note:** as configured during development, the connected Tiger account is a `STANDARD` (live, not paper) account with `TIGER_ALLOW_LIVE=true`, so this guard is currently a no-op; verify your own `.env` before relying on "paper by default."
- Hard caps enforced **in the tool implementation** (`lib/trade-agent/tools.ts`), independent of what the agent requests: `MAX_ORDER_SPEND_USD` (estimated spend = `limitPrice × quantity × multiplier`, multiplier 100 for options), `MAX_CONTRACTS` (options), `MAX_SHARES` (stock). A guardrail rejection is recorded as a rejected leg and is final for that run — the agent is instructed not to retry with a smaller/different size to route around it.
- Every order call previews before placing (`previewOrder` → `isPass` check) before ever calling `placeOrder`.

### Statuses

`PENDING_SCHEDULE` → `SCHEDULED` → `EXECUTING` → one of `PLACED` | `PARTIALLY_PLACED` | `SKIPPED` | `FAILED`, or `CANCELLED` if cancelled before execution. `PARTIALLY_PLACED` (one spread leg filled, the other didn't) should be treated as urgent — the WhatsApp notification is sent regardless of outcome.

### Implementation touchpoints

- UI: `components/trade-prompts.tsx` (+ `components/ui/textarea.tsx`), wired into `components/dashboard.tsx`
- Lodge/list/cancel API: `app/api/trade-prompts/route.ts`, `app/api/trade-prompts/[id]/cancel/route.ts`
- Schedule-time parsing: `lib/parse-schedule.ts`
- Scheduling infra: `lib/qstash.ts` (Upstash QStash `publishJSON` / `messages.cancel`)
- Execution webhook: `app/api/trade-prompts/execute/route.ts`
- Agent: `lib/trade-agent/index.ts` (loop), `lib/trade-agent/tools.ts` (tool schemas + guardrails), `lib/trade-agent/system-prompt.ts`
- Broker helpers: `lib/tiger.ts` — `placeOptionLegOrder`, `getStockQuote`, `getOptionExpirations`, `getOptionChainSafe`
- Notification: `lib/notify.ts` (Twilio WhatsApp REST call)
- Persistence: `prisma/schema.prisma` → `TradePrompt` / `TradePromptStatus`
- Gatekeeping: `proxy.ts` treats `/api/trade-prompts/execute` as public (signature-verified inside the route), same pattern as `/api/webhooks/`

---

## Feature: Strategies folder (agent / subagent workspace)

`strategies/` holds **Cursor agent strategy workflows** — scan configs, agent steps, trade/watchlist CSVs, and reports. These are the intended workspace for **future subagents** that research or propose trades independently of the live webhook executor.

### Layout convention

```text
strategies/
├── overview/                 ← orchestrator across active strategies
├── <strategy-name>/
│   ├── AGENT.md              ← workflow steps for that strategy’s agent
│   ├── config.md             ← universe, style, entry filters, scan notes
│   ├── trades-log.csv        ← or watchlist.csv for watchlist-only strategies
│   ├── report.md             ← overwritten each run
│   └── assets/               ← optional screenshots / artifacts
├── instruments.md            ← shared instrument notes (if present)
└── archived/                 ← retired strategies
```

### Active strategy examples

- `strategies/overview` — market regime + unified position set
- `strategies/positive-bx-entry`
- `strategies/bearish-call-spread`
- `strategies/negative-but-strengthening-bx-watchlist`
- `strategies/momentum-pullback`

### Rules for agents using `strategies/`

- Load skills from `.agents/skills/` (via `.cursor/skills` symlinks) as required by each `AGENT.md` — typically `analyse-tickers`, and for trade-entry strategies also `log-trade-csv` / `track-outcomes`; TradingView confirmation uses `indicators` + browser-use profile `Tim`
- Each strategy writes **only** to its own CSV; never overwrite existing rows — append only
- Do not fabricate market data; note gaps and downrank
- Check upcoming earnings before recommending entry

### Relationship to the web app

| Concern | Owner |
| --- | --- |
| Live TrendSpider bot → Tiger paper orders | Next.js webhook + `lib/execute-signal` |
| Research scans, ranking, CSV logs, reports | `strategies/<name>/` agents (and future subagents) |
| Literal, already-decided order execution (local CLI, no research) | `trading/` agent (see below) |
| Shared Tiger helpers | `.agents/skills/tiger-brokers`, `lib/tiger.ts`, Python scripts |

Subagents scoped to a strategy should treat that strategy’s folder as their working directory and follow its `AGENT.md` + `config.md`. They should not place live orders unless explicitly instructed to use the Tiger skills/app path.

---

## Feature: `trading/` folder (execution-only agent workspace)

A dedicated home for local Claude Code / Cursor CLI sessions (interactive or OS-cron/launchd-scheduled) that need to place a specific, already-decided order — the opposite job from `strategies/`, which researches and recommends. No scanning, scoring, or recommending happens here; the instruction (symbol, action, quantity, limit price) is supplied entirely by the caller as the prompt text.

This is a **separate execution path from `lib/trade-agent/`** — it does not go through the Next.js app, Prisma, QStash, or WhatsApp notification at all. It calls the `tiger-brokers` skill's Python helper (`tiger_limit_order.py`, using the `tigeropen` SDK directly) instead of `lib/tiger.ts`. The two paths are intentionally independent, with their own separately-enforced guardrails, rather than sharing code across the Python/TypeScript boundary.

### Layout

```text
trading/
├── AGENTS.md            ← standing contract (skills to load, guardrails, workflow steps)
├── CLAUDE.md             ← @AGENTS.md (Claude Code auto-load)
├── orders-log.csv         ← append-only; one row per run — placed, aborted, or failed
├── .claude/skills/         ← symlinks: tiger-brokers, tigeropen only
├── .claude/settings.local.json ← headless permission allow-list scoped to this folder
└── .cursor/skills/         ← same two symlinks, for Cursor CLI
```

### Behaviour (full detail in `trading/AGENTS.md`)

1. Parse the instruction strictly from the prompt text (symbol, action, quantity, limit price, time in force, paper vs. live intent). Missing/ambiguous fields → abort, never guess.
2. Self-enforce `MAX_ORDER_SPEND_USD` / `MAX_SHARES` / `MAX_CONTRACTS` from the root `.env` before calling into Tiger — this mirrors, but is a separate implementation from, `lib/order-guardrails.ts`.
3. Default to the `PAPER` account; a live order requires **both** explicit instruction wording **and** `TIGER_ALLOW_LIVE=true` in `.env`.
4. Options orders always abort — the bundled helper is stock-only; no bundled options-order script exists yet.
5. Place via `tiger_limit_order.py`, which independently verifies account type and previews before placing.
6. Append exactly one row to `orders-log.csv` every run, regardless of outcome.

### Implementation touchpoints

- Contract: `trading/AGENTS.md`, `trading/CLAUDE.md`
- Execution: `.agents/skills/tiger-brokers/scripts/tiger_limit_order.py` (symlinked into `trading/.claude/skills/` and `trading/.cursor/skills/`)
- Log: `trading/orders-log.csv`
- Permissions: `trading/.claude/settings.local.json`

---

## Non-goals (current v1)

- Market orders, options orders from webhooks (webhooks remain stock-only; options/spreads are only reachable via the scheduled trade prompt flow), multi-broker routing
- Supabase Auth / multi-user accounts
- Automatic bridging of `strategies/` CSV picks into webhook execution (manual / future work)
- No shared code/guardrails between `trading/` (local CLI, Python `tigeropen`) and `lib/trade-agent/` (web app, TypeScript/Anthropic SDK) — two independent execution paths by design, each self-enforcing its own caps from the same `.env` values
- Full NYSE holiday calendar for `market_open`/`market_close` schedule resolution (weekends only, see scheduled-prompt feature above)
- Native multi-leg combo orders (spreads are two sequential single-leg orders, not an atomic ticket)

---

## Environment (summary)

See [`.env.example`](../.env.example):

- `DATABASE_URL` — Supabase Postgres
- `DASHBOARD_PASSWORD`, `AUTH_SECRET`
- `WEBHOOK_TOKEN`
- `TIGEROPEN_*` (or lowercase Python-helper aliases)
- `TIGER_ALLOW_LIVE` — default `false`
- `ANTHROPIC_API_KEY`, `TRADE_AGENT_MODEL` — schedule parsing + run-time trade agent
- `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, `PUBLIC_BASE_URL` — Upstash QStash scheduling/callback
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM`, `TWILIO_WHATSAPP_TO` — WhatsApp notification
- `MAX_ORDER_SPEND_USD`, `MAX_CONTRACTS`, `MAX_SHARES` — hard guardrails, enforced independently in both `lib/trade-agent/tools.ts` (web app) and `trading/AGENTS.md` (local CLI, self-enforced by the agent, not by code)

### Manual setup required before the trade-prompt feature can run for real

None of these can be done from code — confirm each before relying on scheduled trade prompts:

1. **`DATABASE_URL` password.** `.env`'s `DATABASE_URL` still has a `PASSWORD` placeholder for the "Restio Dev" project (`db.jzkobrxiuflwbfcatllm.supabase.co`) — fill in the real value from Supabase → Settings → Database → Connection string.
2. **`ANTHROPIC_API_KEY`** for both schedule-time classification (`lib/parse-schedule.ts`) and the run-time trade agent (`lib/trade-agent/`).
3. **QStash** — create a QStash project/token, set `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, and `PUBLIC_BASE_URL` (the deployed Vercel URL QStash calls back into).
4. **Twilio WhatsApp** — set `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_WHATSAPP_FROM` / `TWILIO_WHATSAPP_TO`, and get the destination number opted in (join the sandbox, or be a contact of an approved WhatsApp Business sender) — Twilio will silently fail to deliver otherwise.
5. **Confirm paper vs. live intentionally.** As configured during development, the connected Tiger account is `STANDARD` (live) with `TIGER_ALLOW_LIVE=true` — the `assertPaperOrAllowed` guard is currently a no-op. Set `TIGER_ALLOW_LIVE=false` and use a genuine paper account if you want the stated "paper-only by default" safety net to actually apply.
6. **Guardrail caps.** `MAX_ORDER_SPEND_USD` / `MAX_CONTRACTS` / `MAX_SHARES` default to placeholder values in `.env.example` — set them deliberately for your risk tolerance before scheduling real prompts.

---

## Development guidance

When implementing or changing product behaviour:

1. Read **this file** for intended shape and features
2. Use the **nextjs** skill and version-matched docs under `node_modules/next/dist/docs/`
3. Prefer existing patterns in `app/api/`, `lib/`, and `proxy.ts`
4. Keep webhook contract and dashboard event statuses consistent with the schema above
5. For strategy/subagent work, start from `strategies/<name>/AGENT.md` — do not invent a parallel strategy layout
