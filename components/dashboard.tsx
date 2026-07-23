"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TradePrompts } from "@/components/trade-prompts";

type AccountResponse = {
  ok: boolean;
  error?: string;
  account?: {
    id: string;
    type: string | null;
    capability: string | null;
    status: string | null;
    liveTradingEnabled: boolean;
  };
  cash?: {
    totalEquity: number;
    availableCash: number;
    investedValue: number;
    investedPct: number;
    minInvestedPct: number;
  };
  positions?: Array<{
    symbol?: string;
    quantity?: number;
    salableQty?: number;
    averageCost?: number;
    marketValue?: number;
    unrealizedPnl?: number;
    latestPrice?: number;
  }>;
};

type TrimRow = {
  symbol: string;
  quantity: number;
  limitPrice: number;
  tigerOrderId: string | null;
  pnlPct: number;
};

type EventRow = {
  id: string;
  createdAt: string;
  botName: string | null;
  symbol: string | null;
  action: string | null;
  quantity: number | null;
  limitPrice: number | null;
  status: string;
  tigerOrderId: string | null;
  error: string | null;
  targetPositionSizeUsd: number | null;
  trimsJson: TrimRow[] | null;
};

type EventsResponse = {
  ok: boolean;
  error?: string;
  events?: EventRow[];
};

type SymbolPnl = {
  symbol: string;
  realizedPnl: number;
  openQuantity: number;
  openCostBasis: number | null;
};

type PnlResponse = {
  ok: boolean;
  error?: string;
  bySymbol?: SymbolPnl[];
  totalRealizedPnl?: number;
};

function statusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "PLACED") return "default";
  if (status === "PENDING" || status === "PROCESSING") return "secondary";
  if (status === "SKIPPED") return "outline";
  if (status === "PARTIALLY_PLACED") return "secondary";
  return "destructive";
}

export function Dashboard() {
  const router = useRouter();
  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [pnl, setPnl] = useState<PnlResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [accountRes, eventsRes, pnlRes] = await Promise.all([
      fetch("/api/account").then((res) => res.json() as Promise<AccountResponse>),
      fetch("/api/events").then((res) => res.json() as Promise<EventsResponse>),
      fetch("/api/pnl").then((res) => res.json() as Promise<PnlResponse>),
    ]);
    setAccount(accountRes);
    setEvents(eventsRes.events ?? []);
    setPnl(pnlRes);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => {
      void load();
    }, 15000);
    return () => window.clearInterval(timer);
  }, [load]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">TrendSpider → Tiger</h1>
          <p className="text-sm text-muted-foreground">
            Paper share limit orders from Strategy Bot webhooks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => void load()} disabled={loading}>
            Refresh
          </Button>
          <Button variant="ghost" onClick={() => void logout()}>
            Log out
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Tiger account used for webhook execution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {account?.ok && account.account ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-muted-foreground">Account</span>
                  <code>{account.account.id}</code>
                  <Badge variant={account.account.type === "PAPER" ? "secondary" : "destructive"}>
                    {account.account.type ?? "unknown"}
                  </Badge>
                  {account.account.liveTradingEnabled ? (
                    <Badge variant="destructive">live allowed</Badge>
                  ) : null}
                </div>
                <div>
                  <span className="text-muted-foreground">Capability / status: </span>
                  {account.account.capability ?? "—"} / {account.account.status ?? "—"}
                </div>
                {account.cash ? (
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-muted-foreground">Invested:</span>
                      <Badge
                        variant={
                          account.cash.investedPct >= account.cash.minInvestedPct
                            ? "default"
                            : "outline"
                        }
                      >
                        {account.cash.investedPct.toFixed(1)}% (target ≥{" "}
                        {account.cash.minInvestedPct.toFixed(0)}%)
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total equity ${account.cash.totalEquity.toFixed(2)} · Available cash $
                      {account.cash.availableCash.toFixed(2)}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-destructive">{account?.error ?? (loading ? "Loading…" : "Unavailable")}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open positions</CardTitle>
            <CardDescription>US stock positions from Tiger.</CardDescription>
          </CardHeader>
          <CardContent>
            {account?.ok && account.positions && account.positions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Avg cost</TableHead>
                    <TableHead>uPnL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {account.positions.map((position) => (
                    <TableRow key={position.symbol ?? Math.random().toString()}>
                      <TableCell className="font-medium">{position.symbol}</TableCell>
                      <TableCell>{position.quantity ?? "—"}</TableCell>
                      <TableCell>{position.averageCost?.toFixed?.(2) ?? "—"}</TableCell>
                      <TableCell>{position.unrealizedPnl?.toFixed?.(2) ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                {account?.ok ? "No open US stock positions." : loading ? "Loading…" : "—"}
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>P&amp;L (provisional)</CardTitle>
          <CardDescription>
            Realized P&amp;L from placed webhook trades, FIFO-matched per symbol. Provisional:
            uses each order&apos;s intended limit price/quantity, not a real reconciled fill —
            see TODO in <code>lib/pnl.ts</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pnl?.ok && pnl.bySymbol && pnl.bySymbol.length > 0 ? (
            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-muted-foreground">Total realized: </span>
                <span
                  className={
                    (pnl.totalRealizedPnl ?? 0) >= 0 ? "text-emerald-600" : "text-destructive"
                  }
                >
                  {pnl.totalRealizedPnl?.toFixed(2) ?? "—"}
                </span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Realized P&amp;L</TableHead>
                    <TableHead>Open qty</TableHead>
                    <TableHead>Open cost basis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pnl.bySymbol.map((row) => (
                    <TableRow key={row.symbol}>
                      <TableCell className="font-medium">{row.symbol}</TableCell>
                      <TableCell
                        className={row.realizedPnl >= 0 ? "text-emerald-600" : "text-destructive"}
                      >
                        {row.realizedPnl.toFixed(2)}
                      </TableCell>
                      <TableCell>{row.openQuantity || "—"}</TableCell>
                      <TableCell>{row.openCostBasis?.toFixed(2) ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {pnl?.ok ? "No placed buy/sell trades yet." : loading ? "Loading…" : "—"}
            </p>
          )}
        </CardContent>
      </Card>

      <TradePrompts />

      <Card>
        <CardHeader>
          <CardTitle>Recent webhook events</CardTitle>
          <CardDescription>Last 50 TrendSpider signals and Tiger outcomes.</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading…" : "No webhook events yet."}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Bot</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Limit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tiger order</TableHead>
                  <TableHead>Trimmed to fund</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="whitespace-nowrap text-xs">
                      {new Date(event.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{event.botName ?? "—"}</TableCell>
                    <TableCell className="font-medium">{event.symbol ?? "—"}</TableCell>
                    <TableCell>{event.action ?? "—"}</TableCell>
                    <TableCell>{event.quantity ?? "—"}</TableCell>
                    <TableCell>{event.limitPrice ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(event.status)}>{event.status}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{event.tigerOrderId ?? "—"}</TableCell>
                    <TableCell className="max-w-[200px] text-xs">
                      {event.trimsJson && event.trimsJson.length > 0
                        ? event.trimsJson
                            .map(
                              (trim) =>
                                `${trim.symbol} -${trim.quantity} (${trim.pnlPct.toFixed(1)}%)`,
                            )
                            .join(", ")
                        : "—"}
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate text-xs text-destructive">
                      {event.error ?? ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
