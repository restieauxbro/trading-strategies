#!/usr/bin/env python3
"""
Tiger OpenAPI option chain helper.

Examples:
  python .cursor/skills/tiger-brokers/scripts/tiger_options.py weekly NVDA --target-strike 210
  python .cursor/skills/tiger-brokers/scripts/tiger_options.py weekly NVDA --target-strike 210 --width 20
  python .cursor/skills/tiger-brokers/scripts/tiger_options.py weekly NVDA --target-strike 210 --props-path /path/to/config/
"""

from __future__ import annotations

import argparse
import os
import sys
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any


DISPLAY_COLUMNS = (
    "put_call",
    "strike",
    "bid_price",
    "ask_price",
    "mid_price",
    "latest_price",
    "mark_price",
    "volume",
    "open_interest",
    "implied_vol",
    "delta",
    "theta",
    "identifier",
)


def _build_config(props_path: str | None) -> Any:
    from tigeropen.tiger_open_config import TigerOpenClientConfig

    if props_path:
        return TigerOpenClientConfig(props_path=props_path)
    env_props_path = os.environ.get("TIGEROPEN_PROPS_PATH")
    if env_props_path:
        return TigerOpenClientConfig(props_path=env_props_path)
    return TigerOpenClientConfig()


def _load_env_file(path: str | None) -> None:
    if not path:
        return
    env_path = Path(path).expanduser()
    if not env_path.exists():
        raise FileNotFoundError(f"Env file not found: {env_path}")

    for raw_line in env_path.read_text().splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("\"'")
        os.environ.setdefault(key, value)

    aliases = {
        "tiger_id": "TIGEROPEN_TIGER_ID",
        "account": "TIGEROPEN_ACCOUNT",
        "license": "TIGEROPEN_LICENSE",
        "private_key_pk1": "TIGEROPEN_PRIVATE_KEY",
        "private_key_pk8": "TIGEROPEN_PRIVATE_KEY",
    }
    for source, target in aliases.items():
        if source in os.environ and target not in os.environ:
            os.environ[target] = os.environ[source]


def _expiry_to_date(value: Any) -> date:
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    if isinstance(value, (int, float)):
        timestamp = float(value)
        if timestamp > 10_000_000_000:
            timestamp = timestamp / 1000
        return datetime.fromtimestamp(timestamp).date()
    return datetime.strptime(str(value)[:10], "%Y-%m-%d").date()


def _select_expiry(expirations: Any, within_days: int, requested: str | None) -> str:
    today = date.today()
    exp_df = expirations.copy()
    exp_df["expiry_date"] = exp_df["date"].map(_expiry_to_date)

    if requested:
        requested_date = datetime.strptime(requested, "%Y-%m-%d").date()
        matches = exp_df[exp_df["expiry_date"] == requested_date]
        if matches.empty:
            available = ", ".join(str(d) for d in exp_df["expiry_date"].head(12))
            raise ValueError(f"Requested expiry {requested} not found. Available: {available}")
        return requested_date.isoformat()

    window_end = today + timedelta(days=within_days)
    candidates = exp_df[(exp_df["expiry_date"] >= today) & (exp_df["expiry_date"] <= window_end)]
    if candidates.empty:
        candidates = exp_df[exp_df["expiry_date"] >= today]
    if candidates.empty:
        raise ValueError("No future option expirations returned")
    return candidates.sort_values("expiry_date").iloc[0]["expiry_date"].isoformat()


def _format_chain(chain: Any, target_strike: float, width: float, max_rows: int) -> Any:
    df = chain.copy()
    df = df[(df["strike"] >= target_strike - width) & (df["strike"] <= target_strike + width)]
    if df.empty:
        df = chain.copy()
        df["distance"] = (df["strike"] - target_strike).abs()
        df = df.sort_values(["distance", "put_call", "strike"]).head(max_rows)
    else:
        df = df.sort_values(["strike", "put_call"]).head(max_rows)

    if "mid_price" not in df.columns and {"bid_price", "ask_price"}.issubset(df.columns):
        df["mid_price"] = (df["bid_price"] + df["ask_price"]) / 2

    cols = [col for col in DISPLAY_COLUMNS if col in df.columns]
    return df[cols]


def cmd_weekly(
    symbol: str,
    target_strike: float,
    width: float,
    within_days: int,
    expiry: str | None,
    max_rows: int,
    props_path: str | None,
    env_file: str | None,
) -> int:
    from tigeropen.common.exceptions import ApiException
    from tigeropen.quote.quote_client import QuoteClient

    _load_env_file(env_file)
    config = _build_config(props_path)
    quote_client = QuoteClient(client_config=config)

    try:
        expirations = quote_client.get_option_expirations(symbols=[symbol.upper()], market="US")
    except ApiException as exc:
        print(f"Tiger API rejected the expiration request: {exc}", file=sys.stderr)
        return 1

    if expirations is None or expirations.empty:
        print(f"No option expirations returned for {symbol.upper()}", file=sys.stderr)
        return 1

    selected_expiry = _select_expiry(expirations, within_days=within_days, requested=expiry)
    try:
        chain = quote_client.get_option_chain(
            symbol=symbol.upper(),
            expiry=selected_expiry,
            market="US",
            return_greek_value=True,
        )
    except ApiException as exc:
        print(f"Tiger API rejected the option chain request: {exc}", file=sys.stderr)
        print(
            "Check that your Tiger account has US options quote permissions enabled for this device/account.",
            file=sys.stderr,
        )
        return 1
    if chain is None or chain.empty:
        print(f"No option chain returned for {symbol.upper()} {selected_expiry}", file=sys.stderr)
        return 1

    view = _format_chain(chain, target_strike=target_strike, width=width, max_rows=max_rows)
    print(f"{symbol.upper()} options expiring {selected_expiry}, strikes {target_strike - width:g}-{target_strike + width:g}")
    print(view.to_string(index=False, na_rep=""))
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Tiger OpenAPI option chain helpers")
    sub = parser.add_subparsers(dest="cmd", required=True)

    weekly = sub.add_parser("weekly", help="show the nearest coming-week option prices around a strike")
    weekly.add_argument("symbol", help="US underlying symbol, e.g. NVDA")
    weekly.add_argument("--target-strike", type=float, default=210.0)
    weekly.add_argument("--width", type=float, default=10.0, help="strike range around target (default: 10)")
    weekly.add_argument("--within-days", type=int, default=7, help="coming-week expiry window (default: 7)")
    weekly.add_argument("--expiry", default=None, help="override expiry as YYYY-MM-DD")
    weekly.add_argument("--max-rows", type=int, default=60)
    weekly.add_argument("--props-path", default=None, help="directory containing tiger_openapi_config.properties")
    weekly.add_argument("--env-file", default=None, help="optional .env file containing TIGEROPEN_* values")
    weekly.set_defaults(
        func=lambda args: cmd_weekly(
            args.symbol,
            args.target_strike,
            args.width,
            args.within_days,
            args.expiry,
            args.max_rows,
            args.props_path,
            args.env_file,
        )
    )

    args = parser.parse_args(argv)
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
