---
name: nextjs
description: >-
  Next.js App Router development using version-matched docs bundled with the
  installed `next` package. Use when writing or editing Next.js code, App Router
  routes, Server Components, Client Components, Route Handlers, Server Actions,
  proxy.ts, next.config, or any app/ / pages/ Next.js work.
---

# Next.js

Before any Next.js work in this repo:

1. Read **[docs/requirements.md](../../../docs/requirements.md)** — product shape, webhook behaviour, dashboard, and `strategies/` for future subagents.
2. Find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

Webhook setup templates: [docs/trendspider-webhooks.md](../../../docs/trendspider-webhooks.md).

## Docs location

Version-matched docs ship with the installed `next` package:

```txt
node_modules/next/dist/docs/
├── 01-app/
│   ├── 01-getting-started/
│   ├── 02-guides/
│   └── 03-api-reference/
├── 02-pages/
├── 03-architecture/
└── index.md
```

If that path is missing (older Next.js), check `.next-docs/` at the project root.

## Workflow

1. Confirm the change against `docs/requirements.md` and the relevant feature doc it links to (especially `docs/feature-webhooks.md` for webhook contract and safety rules).
2. Identify the feature (routing, data fetching, Route Handlers, Server Actions, proxy, caching, etc.).
3. Open the matching guide or API reference under `node_modules/next/dist/docs/`.
4. Follow those docs for APIs and file conventions — do not invent patterns from memory.
5. Prefer App Router conventions used in this repo (`app/`, Route Handlers under `app/api/`).
6. Use `proxy.ts` (not deprecated `middleware.ts`) for request gatekeeping. Keep `/api/webhooks/` public.

## References

- Product requirements: [docs/requirements.md](../../../docs/requirements.md)
- TrendSpider webhooks: [docs/trendspider-webhooks.md](../../../docs/trendspider-webhooks.md)
- Next.js agent setup: https://nextjs.org/docs/app/guides/ai-agents
- Full docs index (online): https://nextjs.org/docs/llms.txt
