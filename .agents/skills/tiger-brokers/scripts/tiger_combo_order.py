#!/usr/bin/env python3
"""
Tiger OpenAPI vertical option spread (combo order) helper.

Supports 2-leg vertical spreads only (bull/bear call spread, bull/bear put spread) —
same symbol, same expiry, same put/call type, two strikes, one leg BUY and one leg SELL.

Examples:
  # Bear call credit spread: sell 165 call, buy 175 call, collect $2.00 net credit
  python .cursor/skills/tiger-brokers/scripts/tiger_combo_order.py \
    --symbol AAPL --expiry 20250829 --put-call CALL \
    --sell-strike 165 --buy-strike 175 \
    --action SELL --quantity 1 --limit-price 2.00 --env-file .env

  python .cursor/skills/tiger-brokers/scripts/tiger_combo_order.py \
    --symbol AAPL --expiry 20250829 --put-call CALL \
    --sell-strike 165 --buy-strike 175 \
    --action SELL --quantity 1 --limit-price 2.00 --dry-run
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any


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
        os.environ.setdefault(key.strip(), value.strip().strip("\"'"))

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


def _build_config(props_path: str | None) -> Any:
    from tigeropen.tiger_open_config import TigerOpenClientConfig

    if props_path:
        return TigerOpenClientConfig(props_path=props_path)
    env_props_path = os.environ.get("TIGEROPEN_PROPS_PATH")
    if env_props_path:
        return TigerOpenClientConfig(props_path=env_props_path)
    return TigerOpenClientConfig()


def _json_print(payload: dict[str, Any]) -> None:
    print(json.dumps(payload, indent=2, default=str))


def _live_trading_enabled(args: argparse.Namespace) -> bool:
    if getattr(args, "allow_live", False):
        return True
    for key in ("tiger_allow_live", "TIGER_ALLOW_LIVE"):
        value = os.environ.get(key, "").strip().lower()
        if value in {"1", "true", "yes", "on"}:
            return True
    return False


def cmd_place_combo_order(args: argparse.Namespace) -> int:
    from tigeropen.common.exceptions import ApiException
    from tigeropen.common.util.order_utils import combo_order, contract_leg
    from tigeropen.trade.trade_client import TradeClient

    _load_env_file(args.env_file)
    config = _build_config(args.props_path)
    trade_client = TradeClient(config)

    accounts = trade_client.get_managed_accounts() or []
    configured = next((account for account in accounts if str(account.account) == str(config.account)), None)
    if configured is None:
        _json_print({"ok": False, "stage": "verify_account", "error": "configured account not found"})
        return 1
    account_type = str(getattr(configured, "account_type", "")).upper()
    if account_type != "PAPER" and not _live_trading_enabled(args):
        _json_print(
            {
                "ok": False,
                "stage": "verify_account",
                "error": "configured account is not PAPER; pass --allow-live or set tiger_allow_live=true",
                "account_type": getattr(configured, "account_type", None),
            }
        )
        return 1

    if args.sell_strike == args.buy_strike:
        _json_print({"ok": False, "stage": "build_legs", "error": "sell-strike and buy-strike must differ"})
        return 1

    put_call = args.put_call.upper()
    legs = [
        contract_leg(
            symbol=args.symbol.upper(),
            sec_type="OPT",
            expiry=args.expiry,
            strike=args.sell_strike,
            put_call=put_call,
            action="SELL",
            ratio=1,
        ),
        contract_leg(
            symbol=args.symbol.upper(),
            sec_type="OPT",
            expiry=args.expiry,
            strike=args.buy_strike,
            put_call=put_call,
            action="BUY",
            ratio=1,
        ),
    ]

    order = combo_order(
        account=config.account,
        contract_legs=legs,
        combo_type="VERTICAL",
        action=args.action.upper(),
        quantity=args.quantity,
        order_type="LMT",
        limit_price=args.limit_price,
    )
    order.time_in_force = args.time_in_force.upper()

    try:
        preview = trade_client.preview_order(order)
    except ApiException as exc:
        _json_print({"ok": False, "stage": "preview", "error": str(exc)})
        return 1

    preview_text = str(preview)
    if "warning_text" in preview_text.lower():
        _json_print({"ok": False, "stage": "preview", "preview": preview_text})
        return 1

    summary = {
        "account_type": configured.account_type,
        "symbol": args.symbol.upper(),
        "put_call": put_call,
        "expiry": args.expiry,
        "sell_strike": args.sell_strike,
        "buy_strike": args.buy_strike,
        "action": args.action.upper(),
        "quantity": args.quantity,
        "order_type": "LMT",
        "limit_price": args.limit_price,
        "max_notional": round(args.quantity * args.limit_price * 100, 2),
        "time_in_force": args.time_in_force.upper(),
    }
    if args.dry_run:
        _json_print({"ok": True, "dry_run": True, **summary, "preview": preview_text})
        return 0

    try:
        returned_order_id = trade_client.place_order(order)
    except ApiException as exc:
        _json_print({"ok": False, "stage": "place_order", **summary, "error": str(exc)})
        return 1

    placed = trade_client.get_order(id=order.id) if getattr(order, "id", None) else None
    _json_print(
        {
            "ok": True,
            **summary,
            "returned_order_id": returned_order_id,
            "order_global_id": getattr(order, "id", None),
            "order_account_id": getattr(order, "order_id", None),
            "status": getattr(placed, "status", None) if placed else None,
            "filled": getattr(placed, "filled", None) if placed else None,
            "remaining": getattr(placed, "remaining", None) if placed else None,
        }
    )
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Place a Tiger 2-leg vertical option spread (paper or live)")
    parser.add_argument("--symbol", required=True, help="US underlying symbol, e.g. AAPL")
    parser.add_argument("--expiry", required=True, help="option expiry, YYYYMMDD, same for both legs")
    parser.add_argument("--put-call", choices=("CALL", "PUT"), required=True)
    parser.add_argument("--sell-strike", type=float, required=True, help="strike of the leg to SELL")
    parser.add_argument("--buy-strike", type=float, required=True, help="strike of the leg to BUY")
    parser.add_argument(
        "--action",
        choices=("BUY", "SELL"),
        required=True,
        help="net combo action: SELL for a credit spread (net premium received), BUY for a debit spread (net premium paid)",
    )
    parser.add_argument("--quantity", type=int, required=True, help="number of spreads (contracts per leg)")
    parser.add_argument("--limit-price", type=float, required=True, help="net price per spread, always positive")
    parser.add_argument("--time-in-force", default="DAY")
    parser.add_argument("--props-path", default=None, help="directory containing tiger_openapi_config.properties")
    parser.add_argument("--env-file", default=None, help="optional .env file containing Tiger config")
    parser.add_argument("--dry-run", action="store_true", help="preview only; do not place the order")
    parser.add_argument(
        "--allow-live",
        action="store_true",
        help="allow non-PAPER accounts (also enabled by tiger_allow_live=true in .env)",
    )
    return cmd_place_combo_order(parser.parse_args(argv))


if __name__ == "__main__":
    raise SystemExit(main())
