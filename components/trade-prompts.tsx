"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TradePromptRow = {
  id: string;
  createdAt: string;
  rawPrompt: string;
  scheduledFor: string;
  scheduleKind: string | null;
  status: string;
  symbol: string | null;
  orderSummary: string | null;
  error: string | null;
};

type ListResponse = { ok: boolean; error?: string; prompts?: TradePromptRow[] };
type LodgeResponse = { ok: boolean; error?: string; prompt?: TradePromptRow };

function statusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "PLACED") return "default";
  if (status === "SCHEDULED" || status === "PENDING_SCHEDULE" || status === "EXECUTING") return "secondary";
  if (status === "CANCELLED" || status === "SKIPPED") return "outline";
  return "destructive";
}

function formatScheduledFor(iso: string) {
  const date = new Date(iso);
  const sydney = date.toLocaleString("en-AU", { timeZone: "Australia/Sydney", dateStyle: "medium", timeStyle: "short" });
  const newYork = date.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" });
  return `${sydney} AEST · ${newYork} ET`;
}

export function TradePrompts() {
  const [prompts, setPrompts] = useState<TradePromptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [lastScheduled, setLastScheduled] = useState<TradePromptRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/trade-prompts").then((r) => r.json() as Promise<ListResponse>);
    setPrompts(res.prompts ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Deferred to a microtask so the initial fetch's setState doesn't run
    // synchronously within the effect body (react-hooks/set-state-in-effect).
    queueMicrotask(() => void load());
    const timer = window.setInterval(() => void load(), 15000);
    return () => window.clearInterval(timer);
  }, [load]);

  async function submit() {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setSubmitting(true);
    setFormError(null);
    setLastScheduled(null);
    try {
      const res = await fetch("/api/trade-prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      }).then((r) => r.json() as Promise<LodgeResponse>);

      if (!res.ok) {
        setFormError(res.error ?? "Failed to schedule prompt");
      } else {
        setPrompt("");
        if (res.prompt) setLastScheduled(res.prompt);
        await load();
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function cancel(id: string) {
    await fetch(`/api/trade-prompts/${id}/cancel`, { method: "POST" });
    await load();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled trade prompts</CardTitle>
        <CardDescription>
          Lodge a natural-language trade for the agent to execute at the resolved time (e.g. &ldquo;at market open buy a
          $10-wide call spread on GOOGL at the money expiring in 3 months&rdquo;).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="At market open, buy a $10-wide call spread on GOOGL at the money, expiring in 3 months."
            rows={3}
            disabled={submitting}
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              State any spread width explicitly — the agent will decline rather than guess it.
            </p>
            <Button onClick={() => void submit()} disabled={submitting || !prompt.trim()}>
              {submitting ? "Scheduling…" : "Schedule trade"}
            </Button>
          </div>
          {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
          {lastScheduled ? (
            <p className="text-sm text-muted-foreground">
              Scheduled for {formatScheduledFor(lastScheduled.scheduledFor)}.
            </p>
          ) : null}
        </div>

        {prompts.length === 0 ? (
          <p className="text-sm text-muted-foreground">{loading ? "Loading…" : "No scheduled trade prompts yet."}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prompt</TableHead>
                <TableHead>Scheduled for</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {prompts.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="max-w-[280px] truncate text-xs" title={row.rawPrompt}>
                    {row.rawPrompt}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs">{formatScheduledFor(row.scheduledFor)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[240px] truncate text-xs" title={row.orderSummary ?? row.error ?? ""}>
                    {row.orderSummary ?? row.error ?? "—"}
                  </TableCell>
                  <TableCell>
                    {row.status === "SCHEDULED" ? (
                      <Button variant="outline" size="sm" onClick={() => void cancel(row.id)}>
                        Cancel
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
