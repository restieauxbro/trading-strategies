#!/usr/bin/env python3
"""
Tiger OpenAPI paper share limit-order helper.

Examples:
  python .cursor/skills/tiger-brokers/scripts/tiger_limit_order.py --symbol NVDA --action BUY --quantity 100 --limit-price 200 --env-file .env
  python .cursor/skills/tiger-brokers/scripts/tiger_limit_order.py --symbol NVDA --action BUY --quantity 100 --limit-price 200 --dry-run
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


def cmd_place_limit_order(args: argparse.Namespace) -> int:
    from tigeropen.common.exceptions import ApiException
    from tigeropen.common.util.contract_utils import stock_contract
    from tigeropen.common.util.order_utils import limit_order
    from tigeropen.trade.trade_client import TradeClient

    _load_env_file(args.env_file)
    config = _build_config(args.props_path)
    trade_client = TradeClient(config)

    accounts = trade_client.get_managed_accounts() or []
    configured = next((account for account in accounts if str(account.account) == str(config.account)), None)
    if configured is None:
        _json_print({"ok": False, "stage": "verify_account", "error": "configured account not found"})
        return 1
    if str(getattr(configured, "account_type", "")).upper() != "PAPER":
        _json_print(
            {
                "ok": False,
                "stage": "verify_account",
                "error": "configured account is not PAPER",
                "account_type": getattr(configured, "account_type", None),
            }
        )
        return 1

    contract = stock_contract(symbol=args.symbol.upper(), currency=args.currency.upper())
    order = limit_order(
        account=config.account,
        contract=contract,
        action=args.action.upper(),
        quantity=args.quantity,
        limit_price=args.limit_price,
        time_in_force=args.time_in_force.upper(),
    )

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
        "action": args.action.upper(),
        "quantity": args.quantity,
        "order_type": "LMT",
        "limit_price": args.limit_price,
        "max_notional": round(args.quantity * args.limit_price, 2),
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
    parser = argparse.ArgumentParser(description="Place Tiger paper share limit orders")
    parser.add_argument("--symbol", required=True, help="US stock symbol, e.g. NVDA")
    parser.add_argument("--action", choices=("BUY", "SELL"), required=True)
    parser.add_argument("--quantity", type=int, required=True)
    parser.add_argument("--limit-price", type=float, required=True)
    parser.add_argument("--time-in-force", default="DAY")
    parser.add_argument("--currency", default="USD")
    parser.add_argument("--props-path", default=None, help="directory containing tiger_openapi_config.properties")
    parser.add_argument("--env-file", default=None, help="optional .env file containing Tiger config")
    parser.add_argument("--dry-run", action="store_true", help="preview only; do not place the order")
    return cmd_place_limit_order(parser.parse_args(argv))


if __name__ == "__main__":
    raise SystemExit(main())
