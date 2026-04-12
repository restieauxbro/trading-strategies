#!/usr/bin/env python3
"""
Run a saved TrendSpider Market Scanner through the live UI via browser-use.

This avoids the stale JSON returned by scheduled scan URLs by using the same
scanner flow visible in the TrendSpider workspace:
  1. Open charts.trendspider.com with Chrome profile "Tim"
  2. Select a saved scanner in the bottom-left scanner list
  3. Trigger the scan from the UI/controller
  4. Read the fresh result set from the scanner watchlist model

Examples:
  python3 scripts/trendspider_scan.py momentum
  python3 scripts/trendspider_scan.py bearish --headed
  python3 scripts/trendspider_scan.py --scanner-name "Strong upward momentum"
"""

from __future__ import annotations

import argparse
import ast
import json
import subprocess
import sys
import time
from typing import Any


DEFAULT_PROFILE = "Tim"
DEFAULT_URL = "https://charts.trendspider.com/"
DEFAULT_TIMEOUT_SECS = 90.0
DEFAULT_SETTLE_SECS = 2.5
DEFAULT_LIBRARY_TIMEOUT_SECS = 30.0
DEFAULT_STARTUP_TIMEOUT_SECS = 45.0

ALIASES = {
    "momentum": "Strong upward momentum",
    "momentum-pullback": "Strong upward momentum",
    "positive-bx": "Strong upward momentum",
    "positive-bx-entry": "Strong upward momentum",
    "bullish": "Strong upward momentum",
    "bearish": "Bearish Case Market Scanner",
    "bearish-call-spread": "Bearish Case Market Scanner",
}


SELECT_SCANNER_JS = r"""
(() => {
  const wanted = %s;
  const norm = (s) => (s || "").trim().toLowerCase();
  const items = [...document.querySelectorAll(".scripts-list__item")];
  const exact = items.find((el) => {
    const name = el.querySelector(".scripts-list__name");
    return norm(name?.textContent) === norm(wanted);
  });
  const partial = exact || items.find((el) => {
    const text = norm(el.innerText);
    return text.includes(norm(wanted));
  });
  if (!partial) {
    return {
      ok: false,
      error: "scanner_not_found",
      wanted,
      available: items
        .map((el) => (el.querySelector(".scripts-list__name")?.textContent || "").trim())
        .filter(Boolean),
    };
  }
  partial.click();
  const name = (partial.querySelector(".scripts-list__name")?.textContent || "").trim();
  return {
    ok: true,
    selected: name,
    classes: partial.className,
  };
})()
"""


RUN_SCAN_JS = r"""
(() => {
  const resultGrid = [...document.querySelectorAll("[role=grid]")]
    .find((el) => {
      const r = el.getBoundingClientRect();
      return r.x > 1100 && r.y > 520;
    });
  const scope = resultGrid && window.angular
    ? (window.angular.element(resultGrid).scope?.() || window.angular.element(resultGrid).isolateScope?.())
    : null;

  const button = [...document.querySelectorAll("button")]
    .find((el) => (el.innerText || "").trim() === "SCAN");

  let methodCalled = false;
  if (scope?.doScan) {
    try {
      scope.doScan();
      methodCalled = true;
    } catch (e) {}
  }

  if (button && !methodCalled) {
    button.click();
  }

  return {
    ok: Boolean(methodCalled || button),
    usedScopeMethod: methodCalled,
    buttonFound: Boolean(button),
    selected: [...document.querySelectorAll(".scripts-list__item--selected .scripts-list__name")]
      .map((el) => (el.textContent || "").trim())[0] || null,
  };
})()
"""


READ_RESULTS_JS = r"""
(() => {
  const resultGrid = [...document.querySelectorAll("[role=grid]")]
    .find((el) => {
      const r = el.getBoundingClientRect();
      return r.x > 1100 && r.y > 520;
    });
  const scope = resultGrid && window.angular
    ? (window.angular.element(resultGrid).scope?.() || window.angular.element(resultGrid).isolateScope?.())
    : null;
  const model = scope?.scanResultsWatchList?._selectedWatchList?.model || null;
  const selected = [...document.querySelectorAll(".scripts-list__item--selected .scripts-list__name")]
    .map((el) => (el.textContent || "").trim())[0] || null;

  const quotes = (model?.quotes || []).map((q) => ({
    ticker: q.ticker || q.symbol || q.shortName || null,
    description: q.description || null,
    last_price: q.lastPrice_float ?? q.lastPrice ?? null,
    net_change: q.netChange_float ?? q.netChange ?? null,
    percent_change: q.percentChange_float ?? q.percentChange ?? null,
    ytd_change_percent: q.yearToDateChangePercentage ?? null,
    year_change_percent: q.yearChangePercentage ?? null,
    is_new_to_scan: q.isNewToThisScan ?? null,
  }));

  return {
    selected,
    scan_title: model?.title || null,
    scan_id: model?.id || null,
    source: model?.source || null,
    symbols_count: model?.symbols?.length ?? 0,
    symbols: model?.symbols || [],
    quotes_count: quotes.length,
    quotes,
    in_progress: scope?.scanIsInProgress ? Boolean(scope.scanIsInProgress()) : null,
    pending: scope?.scannerIsPending ? Boolean(scope.scannerIsPending()) : null,
    has_model: Boolean(model),
  };
})()
"""


OPEN_MARKET_SCANNER_JS = r"""
(() => {
  const tab = [...document.querySelectorAll("button")]
    .find((el) => (el.innerText || "").trim() === "Market Scanner");
  if (tab) {
    tab.click();
  }
  const items = [...document.querySelectorAll(".scripts-list__item .scripts-list__name")]
    .map((el) => (el.textContent || "").trim())
    .filter(Boolean);
  return {
    clickedTab: Boolean(tab),
    count: items.length,
    items: items.slice(0, 20),
  };
})()
"""


OPEN_DEFAULT_WORKSPACE_JS = r"""
(() => {
  const chooserTitle = [...document.querySelectorAll("*")]
    .find((el) => (el.innerText || "").trim() === "Open a workspace of yours");
  if (!chooserTitle) {
    return { chooserVisible: false, clicked: false };
  }

  const cards = [...document.querySelectorAll('[role="button"], button, .workspace-thumb')];
  const card = cards.find((el) => {
    const text = (el.innerText || "").trim();
    return /Default Workspace/i.test(text) && /Main view\. Analyze, scan, backtest and more/i.test(text);
  });
  if (!card) {
    return { chooserVisible: true, clicked: false, error: "default_workspace_card_not_found" };
  }

  card.click();
  return {
    chooserVisible: true,
    clicked: true,
    text: (card.innerText || "").trim().slice(0, 200),
  };
})()
"""


TRENDSPIDER_READY_JS = r"""
(() => {
  const text = (document.body?.innerText || "").trim();
  const title = document.title || "";
  const hasChooser = text.includes("Open a workspace of yours");
  const hasMarketScanner = [...document.querySelectorAll("button")]
    .some((el) => (el.innerText || "").trim() === "Market Scanner");
  const scannerItems = document.querySelectorAll(".scripts-list__item .scripts-list__name").length;
  const looksReady = hasChooser || hasMarketScanner || scannerItems > 0 || /TrendSpider|Johnson & Johnson|Short plays|Default Workspace/i.test(text);
  return {
    title,
    hasChooser,
    hasMarketScanner,
    scannerItems,
    looksReady,
  };
})()
"""


def _run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, capture_output=True, text=True)


def _emit(proc: subprocess.CompletedProcess[str]) -> None:
    if proc.stdout:
        sys.stdout.write(proc.stdout)
    if proc.stderr:
        sys.stderr.write(proc.stderr)


def _parse_eval(stdout: str) -> Any:
    marker = "result:"
    if marker not in stdout:
        return stdout.strip()
    raw = stdout.split(marker, 1)[1].strip()
    if not raw:
        return None
    try:
        return ast.literal_eval(raw)
    except Exception:
        return raw


def browser_eval(js: str) -> Any:
    proc = _run(["browser-use", "eval", js])
    if proc.returncode != 0:
        _emit(proc)
        raise RuntimeError(f"browser-use eval failed with code {proc.returncode}")
    return _parse_eval(proc.stdout)


def open_trendspider(profile: str, headed: bool, url: str, wait_secs: float) -> None:
    cmd = ["browser-use", "--profile", profile]
    if headed:
        cmd.append("--headed")
    cmd.extend(["open", url])
    proc = _run(cmd)
    if proc.returncode != 0:
        combined = f"{proc.stdout}\n{proc.stderr}"
        if "already running with different config" not in combined:
            _emit(proc)
            raise RuntimeError(f"failed to open TrendSpider with code {proc.returncode}")

        # Reuse the existing browser-use session rather than failing when the
        # only difference is headed/profile flags from an already-open run.
        fallback = _run(["browser-use", "open", url])
        if fallback.returncode != 0:
            _emit(proc)
            _emit(fallback)
            raise RuntimeError(f"failed to reuse existing browser-use session for {url}")
    if wait_secs > 0:
        time.sleep(wait_secs)


def normalize_scanner_name(alias_or_name: str) -> str:
    key = alias_or_name.strip().lower()
    return ALIASES.get(key, alias_or_name.strip())


def wait_for(predicate, *, timeout_secs: float, interval_secs: float = 1.0) -> Any:
    deadline = time.time() + timeout_secs
    last_value = None
    while time.time() < deadline:
        last_value = predicate()
        if last_value:
            return last_value
        time.sleep(interval_secs)
    return last_value


def wait_for_results(scanner_name: str, timeout_secs: float) -> dict[str, Any]:
    wanted = scanner_name.strip().lower()

    def _poll() -> dict[str, Any] | None:
        data = browser_eval(READ_RESULTS_JS)
        if not isinstance(data, dict):
            return None
        selected = (data.get("selected") or "").strip().lower()
        title = (data.get("scan_title") or "").strip().lower()
        if selected != wanted and title not in {"", wanted}:
            return None
        if not data.get("has_model"):
            return None
        if data.get("in_progress") or data.get("pending"):
            return None
        return data

    result = wait_for(_poll, timeout_secs=timeout_secs)
    if not isinstance(result, dict):
        raise TimeoutError(f"timed out waiting for scanner results for {scanner_name!r}")
    return result


def wait_for_scanner_library(timeout_secs: float) -> dict[str, Any]:
    def _poll() -> dict[str, Any] | None:
        data = browser_eval(OPEN_MARKET_SCANNER_JS)
        if not isinstance(data, dict):
            return None
        if data.get("count", 0) > 0:
            return data
        return None

    result = wait_for(_poll, timeout_secs=timeout_secs)
    if not isinstance(result, dict):
        raise TimeoutError("timed out waiting for TrendSpider scanner library to load")
    return result


def wait_for_trendspider_ready(timeout_secs: float) -> dict[str, Any]:
    def _poll() -> dict[str, Any] | None:
        data = browser_eval(TRENDSPIDER_READY_JS)
        if isinstance(data, dict) and data.get("looksReady"):
            return data
        return None

    result = wait_for(_poll, timeout_secs=timeout_secs)
    if not isinstance(result, dict):
        raise TimeoutError("timed out waiting for TrendSpider to finish loading")
    return result


def open_default_workspace_if_needed(timeout_secs: float) -> None:
    state = browser_eval(OPEN_DEFAULT_WORKSPACE_JS)
    if not isinstance(state, dict):
        return
    if not state.get("chooserVisible"):
        return
    if not state.get("clicked"):
        raise RuntimeError(f"TrendSpider workspace chooser visible but Default Workspace could not be opened: {state}")

    def _poll() -> bool:
        current = browser_eval(OPEN_DEFAULT_WORKSPACE_JS)
        return isinstance(current, dict) and not current.get("chooserVisible")

    opened = wait_for(_poll, timeout_secs=timeout_secs)
    if not opened:
        raise TimeoutError("timed out waiting for Default Workspace to open")


def wait_and_select_scanner(scanner_name: str, timeout_secs: float) -> dict[str, Any]:
    js = SELECT_SCANNER_JS % json.dumps(scanner_name)

    def _poll() -> dict[str, Any] | None:
        # Keep nudging the Market Scanner tab open while the bottom panel settles.
        browser_eval(OPEN_MARKET_SCANNER_JS)
        result = browser_eval(js)
        if not isinstance(result, dict):
            return None
        if result.get("ok"):
            return result
        if result.get("available"):
            return result
        return None

    result = wait_for(_poll, timeout_secs=timeout_secs)
    if not isinstance(result, dict) or not result.get("ok"):
        raise RuntimeError(f"scanner_not_found: {result}")
    return result


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Run a saved TrendSpider Market Scanner through the live UI via browser-use"
    )
    parser.add_argument(
        "scanner",
        nargs="?",
        help='Scanner alias or exact name. Aliases: "momentum", "bearish".',
    )
    parser.add_argument(
        "--scanner-name",
        help="Exact scanner name to select from the TrendSpider UI.",
    )
    parser.add_argument(
        "--profile",
        default=DEFAULT_PROFILE,
        help=f'Chrome profile for browser-use (default: "{DEFAULT_PROFILE}")',
    )
    parser.add_argument(
        "--url",
        default=DEFAULT_URL,
        help=f"TrendSpider URL to open first (default: {DEFAULT_URL})",
    )
    parser.add_argument(
        "--headed",
        action="store_true",
        help="Open a visible browser window.",
    )
    parser.add_argument(
        "--open-wait-secs",
        type=float,
        default=DEFAULT_SETTLE_SECS,
        help=f"Seconds to wait after opening TrendSpider (default: {DEFAULT_SETTLE_SECS})",
    )
    parser.add_argument(
        "--timeout-secs",
        type=float,
        default=DEFAULT_TIMEOUT_SECS,
        help=f"Seconds to wait for scan results (default: {DEFAULT_TIMEOUT_SECS})",
    )
    parser.add_argument(
        "--library-timeout-secs",
        type=float,
        default=DEFAULT_LIBRARY_TIMEOUT_SECS,
        help=f"Seconds to wait for the scanner library to load (default: {DEFAULT_LIBRARY_TIMEOUT_SECS})",
    )
    parser.add_argument(
        "--startup-timeout-secs",
        type=float,
        default=DEFAULT_STARTUP_TIMEOUT_SECS,
        help=f"Seconds to wait for the TrendSpider app shell to load (default: {DEFAULT_STARTUP_TIMEOUT_SECS})",
    )
    parser.add_argument(
        "--screenshot",
        help="Optional path to save a screenshot after results load.",
    )
    parser.add_argument(
        "--close",
        action="store_true",
        help="Close the browser-use session after reading results.",
    )
    args = parser.parse_args(argv)

    requested = args.scanner_name or args.scanner
    if not requested:
        parser.error("provide either a scanner alias/name argument or --scanner-name")
    scanner_name = normalize_scanner_name(requested)

    try:
        open_trendspider(args.profile, args.headed, args.url, args.open_wait_secs)
        wait_for_trendspider_ready(args.startup_timeout_secs)
        open_default_workspace_if_needed(args.library_timeout_secs)
        wait_for_scanner_library(args.library_timeout_secs)

        selected = wait_and_select_scanner(scanner_name, args.library_timeout_secs)

        triggered = browser_eval(RUN_SCAN_JS)
        if not isinstance(triggered, dict) or not triggered.get("ok"):
            print(json.dumps({"error": "scan_trigger_failed", "requested": scanner_name, "details": triggered}, indent=2))
            return 1

        results = wait_for_results(scanner_name, args.timeout_secs)
        payload = {
            "timestamp": int(time.time() * 1000),
            "scanner": scanner_name,
            "selected": results.get("selected"),
            "scan_title": results.get("scan_title"),
            "scan_id": results.get("scan_id"),
            "source": results.get("source"),
            "symbolsFound": results.get("symbols", []),
            "quotes": results.get("quotes", []),
            "count": results.get("symbols_count", 0),
        }

        if args.screenshot:
            shot = _run(["browser-use", "screenshot", args.screenshot])
            if shot.returncode != 0:
                _emit(shot)
                return shot.returncode

        print(json.dumps(payload, indent=2))
    except Exception as exc:
        print(json.dumps({"error": str(exc), "scanner": scanner_name}, indent=2), file=sys.stderr)
        return 1
    finally:
        if args.close:
            _run(["browser-use", "close"])

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
