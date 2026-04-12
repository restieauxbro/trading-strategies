#!/usr/bin/env python3
"""
TrendSpider: switch the active chart symbol via the top-left symbol search box.

Tested against charts.trendspider.com (MUI + legacy Angular wrapper). Uses the
input that carries **MuiInputBase-inputAdornedEnd** (the visible field on top of
the symbol stack).

Prerequisites:
  - browser-use session already on an **open chart workspace** (not the hub).
  - Same Chrome profile as the rest of the flow (default **Tim**).

Usage:
  browser-use --profile "Tim" --headed open "<workspace URL>"
  # … open Default Workspace / chart …
  python3 .cursor/skills/archived/read-trendspider-chart/set_symbol.py ORCL
  python3 .cursor/skills/archived/read-trendspider-chart/set_symbol.py AMZN --settle-ms 4000

Ticker rules (TrendSpider):
  - Stocks/ETFs: plain symbol, e.g. ORCL, BRK.B (if your feed accepts it)
  - Indices: leading $, e.g. $SPX
  - Crypto: leading ^, e.g. ^BTCUSD
  See: https://help.trendspider.com/kb/charting/symbol-search-and-lookup

Reference:
  - Symbol search lives in the **top-left** search field (official docs).
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
import time

DEFAULT_PROFILE = "Tim"

# Allowed characters for a single “token” symbol (extend if needed).
_TICKER_RE = re.compile(r"^[\w\^$=\.\!\:\-]+$")

FOCUS_SELECT_JS = r"""
(() => {
  const el = document.querySelector("input.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd")
    || document.querySelector("input.MuiInputBase-inputAdornedEnd")
    || document.querySelector("symbol-search-box-new input.MuiInputBase-input")
    || document.querySelector("input.MuiInputBase-input.MuiInput-input");
  if (!el) return { ok: false, error: "symbol_input_not_found" };
  el.focus();
  if (typeof el.select === "function") el.select();
  return { ok: true, previous: el.value };
})()
"""


def _run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, capture_output=True, text=True)


def set_symbol(
    ticker: str,
    *,
    settle_ms: int = 3500,
    select_all: str = "Control+a",
) -> int:
    """Focus symbol box, replace text, Enter, wait for title to update."""
    t = ticker.strip()
    if not t:
        print("error: empty ticker", file=sys.stderr)
        return 2
    if not _TICKER_RE.match(t):
        print(f"error: ticker contains disallowed characters: {t!r}", file=sys.stderr)
        return 2

    r = _run(["browser-use", "eval", FOCUS_SELECT_JS])
    sys.stdout.write(r.stdout)
    sys.stderr.write(r.stderr)
    if r.returncode != 0:
        return r.returncode
    if "symbol_input_not_found" in r.stdout:
        print(
            "error: could not find symbol input — open a chart workspace first",
            file=sys.stderr,
        )
        return 1

    for step in (
        ["browser-use", "keys", select_all],
        ["browser-use", "type", t],
        ["browser-use", "keys", "Enter"],
    ):
        r = _run(step)
        sys.stdout.write(r.stdout)
        sys.stderr.write(r.stderr)
        if r.returncode != 0:
            return r.returncode

    time.sleep(max(0, settle_ms) / 1000.0)
    r = _run(["browser-use", "get", "title"])
    sys.stdout.write(r.stdout)
    return r.returncode


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Set TrendSpider chart symbol via browser-use")
    p.add_argument("ticker", help="Symbol to load (e.g. ORCL, $SPX, ^BTCUSD)")
    p.add_argument(
        "--settle-ms",
        type=int,
        default=3500,
        help="Ms to wait after Enter for chart load (default: 3500)",
    )
    p.add_argument(
        "--select-all",
        default="Control+a",
        help='Keys to select all in the symbol field (default: Control+a). On some Mac setups try "Meta+a".',
    )
    p.add_argument(
        "--print-focus-js",
        action="store_true",
        help="Print focus/select JS and exit",
    )
    args = p.parse_args(argv)

    if args.print_focus_js:
        print(FOCUS_SELECT_JS.strip())
        return 0

    return set_symbol(
        args.ticker,
        settle_ms=args.settle_ms,
        select_all=args.select_all,
    )


if __name__ == "__main__":
    raise SystemExit(main())
