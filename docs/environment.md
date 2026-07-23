← [Requirements overview](./requirements.md)

# Environment variables

See [`.env.example`](../.env.example) for the full file with defaults/comments.

- `DATABASE_URL` — Supabase Postgres
- `DASHBOARD_PASSWORD`, `AUTH_SECRET`
- `WEBHOOK_TOKEN`
- `WEBHOOK_QUEUE_RATE_PER_MINUTE` — webhook signal queue throttle (default `20`/min), see [feature-webhooks.md](./feature-webhooks.md) and `lib/qstash.ts`
- `TIGEROPEN_*` (or lowercase Python-helper aliases) — see [tiger-accounts.md](./tiger-accounts.md) for paper vs live account ids
- `TIGER_ALLOW_LIVE` — default `false`
- `PORTFOLIO_TARGET_POSITIONS`, `PORTFOLIO_MAX_TRIM_PCT_OF_EQUITY`, `PORTFOLIO_MIN_TRIM_USD`, `PORTFOLIO_MAX_POSITIONS_TO_TRIM`, `PORTFOLIO_MIN_INVESTED_PCT` — webhook `buy` sizing/trim-to-fund knobs, see [feature-webhooks.md](./feature-webhooks.md) "Portfolio management" and `lib/portfolio.ts`
- `ANTHROPIC_API_KEY`, `TRADE_AGENT_MODEL` — schedule parsing + run-time trade agent
- `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, `PUBLIC_BASE_URL` — Upstash QStash: trade-prompt scheduling/callback **and** the TrendSpider webhook queue above (shared credentials, two features)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM`, `TWILIO_WHATSAPP_TO` — WhatsApp notification
- `MAX_ORDER_SPEND_USD`, `MAX_CONTRACTS`, `MAX_SHARES` — hard guardrails, enforced independently in both `lib/trade-agent/tools.ts` (web app) and `trading/AGENTS.md` (local CLI, self-enforced by the agent, not by code); also enforced on the webhook path's buy and every trim order (`lib/order-guardrails.ts`)

## Manual setup required before the trade-prompt feature can run for real

None of these can be done from code — confirm each before relying on scheduled trade prompts:

1. **`DATABASE_URL` password.** `.env`'s `DATABASE_URL` still has a `PASSWORD` placeholder for the "Restio Dev" project (`db.jzkobrxiuflwbfcatllm.supabase.co`) — fill in the real value from Supabase → Settings → Database → Connection string.
2. **`ANTHROPIC_API_KEY`** for both schedule-time classification (`lib/parse-schedule.ts`) and the run-time trade agent (`lib/trade-agent/`).
3. **QStash** — create a QStash project/token, set `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, and `PUBLIC_BASE_URL` (the deployed Vercel URL QStash calls back into). **Also required for the TrendSpider webhook's queue/throttle** (see [feature-webhooks.md](./feature-webhooks.md)) — without it, that webhook falls back to immediate/concurrent execution, which is not safe for a real multi-signal burst.
4. **Twilio WhatsApp** — set `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_WHATSAPP_FROM` / `TWILIO_WHATSAPP_TO`, and get the destination number opted in (join the sandbox, or be a contact of an approved WhatsApp Business sender) — Twilio will silently fail to deliver otherwise.
5. **Confirm paper vs. live intentionally.** See [tiger-accounts.md](./tiger-accounts.md) for the current production account and how to switch it.
6. **Guardrail caps.** `MAX_ORDER_SPEND_USD` / `MAX_CONTRACTS` / `MAX_SHARES` default to placeholder values in `.env.example` — set them deliberately for your risk tolerance before scheduling real prompts.
