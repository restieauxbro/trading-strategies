← [Requirements overview](./requirements.md)

# Feature: Dashboard

- Login at `/login` with `DASHBOARD_PASSWORD`
- Home dashboard shows Tiger account metadata, open positions, provisional P&L, recent webhook events, and the scheduled trade prompts panel
- APIs (session-protected): `GET /api/account`, `GET /api/events`, `GET /api/pnl`, `GET /api/trade-prompts`, `POST /api/trade-prompts`, `POST /api/trade-prompts/[id]/cancel`
- Auth routes: `POST /api/auth/login`, `POST /api/auth/logout`

## Provisional P&L (`lib/pnl.ts`, `GET /api/pnl`)

- **No fill reconciliation exists yet.** `computeProvisionalPnl()` treats each `PLACED` webhook event's *intended* `limitPrice`/`quantity` as a stand-in for the real Tiger fill price/quantity, purely to give a rough realized-P&L signal today. `TODO(fill-reconciliation)` in `lib/pnl.ts` flags this — revisit once a job polls `trade.getOrder()` / `getFilledOrders()` for actual `avgFillPrice`/`filledQuantity` and swap the computation over to that.
- FIFO-matches `sell` events against prior `buy` events **per symbol, using only this app's own webhook event log**. A sell quantity that exceeds what this log ever recorded buying (pre-existing position, or a trade placed outside this webhook path, e.g. via `trading/`) can't be attributed a cost basis and is silently dropped from realized P&L rather than guessed at.
- Reports realized P&L (closed round-trips) plus each symbol's remaining open quantity/cost-basis. Unrealized P&L for open positions is *not* duplicated here — it's already shown accurately from live Tiger data via `/api/account`'s `positions[].unrealizedPnl`.
- Deliberately deferred for now (see chat history): a full reconciliation job (recurring QStash schedule polling non-terminal orders, handling DAY orders that don't fill until the next session) was scoped but not built — provisional limit-price-based P&L was chosen instead to get a rough number without that infrastructure.
