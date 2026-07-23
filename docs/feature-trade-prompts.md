← [Requirements overview](./requirements.md)

# Feature: Scheduled natural-language trade prompts

Lets Tim lodge a prompt like *"at market open buy a $10-wide call spread on GOOGL at the money expiring in 3 months"* while asleep in Australia; it runs unattended at the resolved US-market-relevant time.

## Behaviour

1. **Lodge:** Tim types a free-text prompt in the dashboard's "Scheduled trade prompts" panel (`components/trade-prompts.tsx`) and submits it to `POST /api/trade-prompts` (session-protected).
2. **Resolve run time:** `lib/parse-schedule.ts` sends the prompt + current time to Claude, which *classifies* the timing intent (`market_open` | `market_close` | `relative_offset` | `explicit_datetime`) via a forced tool call — it does not compute the timestamp itself. Deterministic code then resolves the exact UTC `scheduledFor`:
   - `market_open` / `market_close` → next trading day at 9:30 / 16:00 `America/New_York`, skipping weekends only (**known gap:** no full NYSE holiday calendar in v1 — a prompt lodged right before a market holiday resolves to that holiday's date).
   - `relative_offset` / `explicit_datetime` → straightforward date math off the model-extracted fields, converted from the stated (or inferred) IANA timezone.
3. **Persist + schedule:** A `TradePrompt` row is created (`PENDING_SCHEDULE`), then `lib/qstash.ts` calls Upstash QStash `publishJSON` with `notBefore = scheduledFor` and callback `POST /api/trade-prompts/execute`. On success the row moves to `SCHEDULED` with `qstashMessageId` stored; on failure it's marked `FAILED` with the error, and returned to the UI either way.
4. **Cancel:** While `SCHEDULED`, `POST /api/trade-prompts/[id]/cancel` deletes the QStash message and sets `CANCELLED`.
5. **Execute (at the scheduled time):** QStash calls `POST /api/trade-prompts/execute` with `{ promptId }`. The route is public at the proxy layer (like `/api/webhooks/`) but signature-verified via `@upstash/qstash/nextjs`'s `verifySignatureAppRouter` — wrapped lazily per-request (not at module scope) so a missing signing key fails that request, not the whole build. Duplicate/retried QStash deliveries are no-ops once the row has left `SCHEDULED`/`PENDING_SCHEDULE`.
6. **Agent run:** `lib/trade-agent/` re-reads the *raw prompt* fresh (not the resolved time) and runs a bounded (max 8 iterations) Claude tool-calling loop with tools backed by `lib/tiger.ts`: `get_stock_quote`, `get_option_expirations`, `get_option_chain`, `get_positions`, `place_stock_order`, `place_option_leg`, and a terminal `report_result` the agent must call exactly once to conclude.
7. **Persist + notify:** The final `status`/`symbol`/`orderSummary`/`legs`/`agentTranscript`/`error` are written back to the `TradePrompt` row, then `lib/notify.ts` sends a plain-text WhatsApp summary via Twilio's REST API and records `notifiedAt`.

## Order scope and the multi-leg constraint

- Supports stock buy/sell, single-leg option buy/sell, and vertical option spreads (calls or puts, debit or credit) — all via the same NL flow. Spread width **must be explicit in the prompt** (e.g. "$10 wide"); if the agent can't identify two distinct legs from a prompt that describes a spread, it must call `report_result` with `status=skipped` rather than guess.
- **`@tigeropenapi/tigeropen` has no native multi-leg combo order** (confirmed by spiking `previewOrder`/`placeOrder` against the live paper/standard account — `OrderRequest` takes one `secType`/`expiry`/`strike`/`right` per order). A spread is placed as **two sequential single-leg orders**, long (BUY) leg first — if only one leg fills, ending up long a capped-risk option is safer than naked-short. The system prompt in `lib/trade-agent/system-prompt.ts` enforces this ordering and forbids attempting the short leg if the long leg failed.
- `get_option_chain` requires quote permissions the configured dev account may not have (observed: `4000 permission denied` on the live sandbox account used during development) — it reports `available:false` and the agent falls back to `get_stock_quote` plus the option order's own preview step to validate a strike.

## Safety and guardrails

- Reuses the existing paper-account guard (`assertPaperOrAllowed` / `TIGER_ALLOW_LIVE`) from the webhook path — see [tiger-accounts.md](./tiger-accounts.md) for which account production is currently pointed at.
- Hard caps enforced **in the tool implementation** (`lib/trade-agent/tools.ts`), independent of what the agent requests: `MAX_ORDER_SPEND_USD` (estimated spend = `limitPrice × quantity × multiplier`, multiplier 100 for options), `MAX_CONTRACTS` (options), `MAX_SHARES` (stock). A guardrail rejection is recorded as a rejected leg and is final for that run — the agent is instructed not to retry with a smaller/different size to route around it.
- Every order call previews before placing (`previewOrder` → `isPass` check) before ever calling `placeOrder`.

## Statuses

`PENDING_SCHEDULE` → `SCHEDULED` → `EXECUTING` → one of `PLACED` | `PARTIALLY_PLACED` | `SKIPPED` | `FAILED`, or `CANCELLED` if cancelled before execution. `PARTIALLY_PLACED` (one spread leg filled, the other didn't) should be treated as urgent — the WhatsApp notification is sent regardless of outcome.

## Implementation touchpoints

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
