# Trading Strategy — TrendSpider → Tiger Brokers

Next.js app (Vercel) that accepts TrendSpider Strategy Bot webhooks and places Tiger Brokers **paper** share limit orders. Includes a password-gated shadcn dashboard for account, positions, and recent webhook events.

Legacy Cursor agent strategy workflows still live under `strategies/` and `.agents/skills/` (see [AGENTS.md](AGENTS.md)).

---

## Quick start (web app)

### 1. Install

```bash
npm install
```

### 2. Environment

Copy [`.env.example`](.env.example) into `.env` (or Vercel project env) and fill in:

- **Supabase** `DATABASE_URL` (Postgres connection / pooler URI)
- `DASHBOARD_PASSWORD`, `AUTH_SECRET`
- `WEBHOOK_TOKEN`
- Tiger OpenAPI credentials (`TIGEROPEN_*` or lowercase aliases from the Python helpers)

### 3. Database

```bash
npm run db:push
# or: npm run db:migrate
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), sign in with `DASHBOARD_PASSWORD`.

### 5. TrendSpider

Point the Strategy Bot Entry/Exit webhook URLs at:

```text
https://<your-domain>/api/webhooks/trendspider?token=<WEBHOOK_TOKEN>
```

JSON body templates: [docs/trendspider-webhooks.md](docs/trendspider-webhooks.md).

---

## Deploy (Vercel)

1. Import this repo into Vercel
2. Set the same env vars as `.env.example`
3. Build command uses `prisma generate && next build` (see `package.json`)
4. Run `prisma db push` or migrate once against Supabase (local CLI is fine)

---

## Safety

- Non-`PAPER` Tiger accounts are blocked unless `TIGER_ALLOW_LIVE=true`
- Orders are US stock DAY limit orders only (no market orders in v1)
- Dashboard auth is a shared password + signed cookie (not Supabase Auth)
- Webhook auth is `WEBHOOK_TOKEN` on the query string

---

## Repo layout

```text
app/                  Next.js App Router (dashboard + API)
components/           shadcn UI + dashboard
lib/                  Tiger client, webhook schema, auth, Prisma
prisma/               Supabase Postgres schema
docs/                 TrendSpider webhook templates
strategies/           Legacy Cursor agent strategies (research/recommend)
trading/              Execution-only agent home (place a literal instruction)
.agents/skills/       Agent skills (incl. Python Tiger helpers)
scripts/              Legacy Python scan / yfinance tools
```

---

## Legacy agent workflows

For the older Cursor-driven TrendSpider scan + research flow:

```
Read strategies/overview/AGENT.md and run the market overview.
```

See [AGENTS.md](AGENTS.md) for details.

## Execution-only agent (`trading/`)

A separate agent home for scheduled/local-CLI runs that place a specific, already-decided order — no scanning or recommending. Loads only the `tiger-brokers`/`tigeropen` skills, self-enforces the same `MAX_ORDER_SPEND_USD`/`MAX_SHARES`/`MAX_CONTRACTS` caps from `.env`, and logs every run (placed, aborted, or failed) to `trading/orders-log.csv`. See `trading/AGENTS.md`.
