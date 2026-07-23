# Tiger Accounts (Paper vs Live)

One Tiger developer credential (`TIGEROPEN_TIGER_ID` / `TIGEROPEN_LICENSE` / `TIGEROPEN_PRIVATE_KEY`) manages two accounts. Only `TIGEROPEN_ACCOUNT` (and `TIGER_ALLOW_LIVE`) change between them.

| Account | Type | Notes |
|---|---|---|
| `55392977` | `STANDARD` (live, real money) | requires `TIGER_ALLOW_LIVE=true` |
| `21197857027015726` | `PAPER` | safe default, no real funds |

Confirm anytime with `TradeClient.get_managed_accounts()` (see `.agents/skills/tigeropen`).

## Switching the Vercel production app

1. In Vercel → Project → Settings → Environment Variables (Production), set:
   - `TIGEROPEN_ACCOUNT` = the target account id above
   - `TIGER_ALLOW_LIVE` = `true` only for the live account, otherwise `false`
2. Redeploy — env var changes don't apply to already-running deployments.
3. Verify in the dashboard's account panel that `account.type` matches what you expect before trusting it.

`lib/tiger.ts`'s `assertPaperOrAllowed` blocks any non-`PAPER` account unless `TIGER_ALLOW_LIVE=true`, so a misconfigured live account fails closed rather than trading silently.
