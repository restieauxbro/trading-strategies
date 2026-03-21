#!/usr/bin/env python3
"""
Lightweight Yahoo Finance helpers via yfinance (unofficial; may rate-limit).

Examples:
  python scripts/yfinance_tools.py summary AAPL
  python scripts/yfinance_tools.py technicals AAPL --days 260
  python scripts/yfinance_tools.py option-expiries AAPL
  python scripts/yfinance_tools.py option-calls AAPL --max-rows 40
  python scripts/yfinance_tools.py option-calls AAPL --expiration 2025-04-17 --strike-min 180 --strike-max 220
"""

from __future__ import annotations

import argparse
import json
import sys
from typing import Any


def _json_print(obj: Any) -> None:
    print(json.dumps(obj, indent=2, default=str))


def cmd_summary(ticker: str) -> int:
    import yfinance as yf

    t = yf.Ticker(ticker.upper())
    # fast_info is lighter than .info (which can be slow / flaky)
    fast = dict(t.fast_info.items()) if hasattr(t.fast_info, "items") else {}
    out = {
        "ticker": ticker.upper(),
        "fast_info": fast,
    }
    # Optional: try a small subset of info keys without pulling the whole blob
    try:
        info = t.info
        if isinstance(info, dict):
            keys = (
                "longName",
                "sector",
                "industry",
                "trailingPE",
                "forwardPE",
                "beta",
                "fiftyDayAverage",
                "twoHundredDayAverage",
            )
            out["info_subset"] = {k: info.get(k) for k in keys if k in info}
    except Exception as e:
        out["info_subset_error"] = str(e)
    _json_print(out)
    return 0


def cmd_technicals(ticker: str, days: int) -> int:
    import yfinance as yf

    t = yf.Ticker(ticker.upper())
    hist = t.history(period=f"{max(days, 5)}d", auto_adjust=True)
    if hist.empty:
        print(json.dumps({"error": "no history", "ticker": ticker.upper()}))
        return 1
    closes = hist["Close"].dropna()
    last = float(closes.iloc[-1])
    sma50 = float(closes.tail(50).mean()) if len(closes) >= 50 else None
    sma200 = float(closes.tail(200).mean()) if len(closes) >= 200 else None
    out = {
        "ticker": ticker.upper(),
        "last": round(last, 4),
        "sma50": round(sma50, 4) if sma50 is not None else None,
        "sma200": round(sma200, 4) if sma200 is not None else None,
        "pct_vs_sma50_pct": round(100 * (last / sma50 - 1), 2) if sma50 else None,
        "pct_vs_sma200_pct": round(100 * (last / sma200 - 1), 2) if sma200 else None,
        "history_rows": int(len(closes)),
    }
    _json_print(out)
    return 0


def cmd_option_expiries(ticker: str) -> int:
    import yfinance as yf

    t = yf.Ticker(ticker.upper())
    exps = list(getattr(t, "options", ()) or ())
    _json_print({"ticker": ticker.upper(), "expirations": exps, "count": len(exps)})
    return 0


def cmd_option_calls(
    ticker: str,
    expiration: str | None,
    strike_min: float | None,
    strike_max: float | None,
    max_rows: int,
) -> int:
    import yfinance as yf

    t = yf.Ticker(ticker.upper())
    exps = list(getattr(t, "options", ()) or ())
    if not exps:
        print(json.dumps({"error": "no option expirations returned", "ticker": ticker.upper()}))
        return 1
    exp = expiration or exps[0]
    if exp not in exps:
        print(
            json.dumps(
                {
                    "error": "expiration not in chain",
                    "requested": exp,
                    "available": exps[:12],
                }
            )
        )
        return 1
    chain = t.option_chain(exp)
    calls = chain.calls
    if calls is None or calls.empty:
        print(json.dumps({"error": "empty calls table", "ticker": ticker.upper(), "expiration": exp}))
        return 1
    df = calls.copy()
    if strike_min is not None:
        df = df[df["strike"] >= strike_min]
    if strike_max is not None:
        df = df[df["strike"] <= strike_max]
    df = df.sort_values("strike").head(max_rows)
    # Normalize for JSON (timestamps etc.)
    records = json.loads(df.to_json(orient="records", date_format="iso"))
    _json_print(
        {
            "ticker": ticker.upper(),
            "expiration": exp,
            "rows": len(records),
            "calls": records,
        }
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="yfinance helpers for strategy research")
    sub = p.add_subparsers(dest="cmd", required=True)

    sp = sub.add_parser("summary", help="fast_info + small info subset")
    sp.add_argument("ticker")
    sp.set_defaults(func=lambda a: cmd_summary(a.ticker))

    tp = sub.add_parser("technicals", help="last close vs SMA50/SMA200 from daily history")
    tp.add_argument("ticker")
    tp.add_argument("--days", type=int, default=260, help="history lookback (default 260)")
    tp.set_defaults(func=lambda a: cmd_technicals(a.ticker, a.days))

    oe = sub.add_parser("option-expiries", help="list option expiration strings")
    oe.add_argument("ticker")
    oe.set_defaults(func=lambda a: cmd_option_expiries(a.ticker))

    oc = sub.add_parser("option-calls", help="call chain slice (default: nearest expiry)")
    oc.add_argument("ticker")
    oc.add_argument("--expiration", default=None, help="YYYY-MM-DD (default: first available)")
    oc.add_argument("--strike-min", type=float, default=None)
    oc.add_argument("--strike-max", type=float, default=None)
    oc.add_argument("--max-rows", type=int, default=50)
    oc.set_defaults(
        func=lambda a: cmd_option_calls(
            a.ticker, a.expiration, a.strike_min, a.strike_max, a.max_rows
        )
    )

    args = p.parse_args(argv)
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
