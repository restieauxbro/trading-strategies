#!/usr/bin/env python3
"""
TrendSpider: toggle chart fullscreen via browser-use `eval`.

Prerequisites:
  - A browser-use session already opened with YOUR Chrome profile (default: Tim).
  - Chart page loaded (not the login page) so `button.chart-fullscreen-button` exists.

Usage:
  # After: browser-use --profile "Tim" --headed open "<your chart URL>"
  python .cursor/skills/archived/read-trendspider-chart/maximize_chart.py

  # Or pass JS-only to stdout for manual eval:
  python .cursor/skills/archived/read-trendspider-chart/maximize_chart.py --print-js

  # Chain open + wait + eval (headed, profile Tim):
  python .cursor/skills/archived/read-trendspider-chart/maximize_chart.py --open-url "https://charts.trendspider.com/..." --headed

Profile:
  Default Chrome profile name is **Tim** (override with --profile).
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time

# TrendSpider chart toolbar (Angular): same as ng-click="ui.toggleFullscreen()"
SELECTORS = [
    "button.chart-fullscreen-button",
    'button[title="Toggle maximize this chart"]',
    "button.md-icon-button.chart-fullscreen-button",
]

DEFAULT_PROFILE = "Tim"

CLICK_JS = """
(() => {
  const sels = %s;
  for (const sel of sels) {
    const el = document.querySelector(sel);
    if (el) {
      el.click();
      return { ok: true, selector: sel };
    }
  }
  return { ok: false, error: "fullscreen_button_not_found" };
})()
""" % (
    json.dumps(SELECTORS),
)


def run_browser_use_eval(js: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["browser-use", "eval", js],
        capture_output=True,
        text=True,
    )


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Click TrendSpider chart fullscreen via browser-use")
    p.add_argument(
        "--profile",
        default=DEFAULT_PROFILE,
        help=f'Chrome profile for browser-use (default: "{DEFAULT_PROFILE}")',
    )
    p.add_argument(
        "--headed",
        action="store_true",
        help="Use headed browser when used with --open-url",
    )
    p.add_argument(
        "--open-url",
        metavar="URL",
        help="Open this URL first with browser-use (uses --profile and optional --headed)",
    )
    p.add_argument(
        "--wait-after-open",
        type=float,
        default=8.0,
        help="Seconds to sleep after --open-url before eval (default: 8)",
    )
    p.add_argument(
        "--print-js",
        action="store_true",
        help="Print the eval JS to stdout and exit (no browser-use calls)",
    )
    args = p.parse_args(argv)

    if args.print_js:
        print(CLICK_JS.strip())
        return 0

    if args.open_url:
        cmd = ["browser-use", "--profile", args.profile]
        if args.headed:
            cmd.append("--headed")
        cmd.extend(["open", args.open_url])
        r = subprocess.run(cmd, capture_output=True, text=True)
        sys.stdout.write(r.stdout)
        sys.stderr.write(r.stderr)
        if r.returncode != 0:
            return r.returncode
        time.sleep(args.wait_after_open)

    r = run_browser_use_eval(CLICK_JS)
    sys.stdout.write(r.stdout)
    sys.stderr.write(r.stderr)
    return r.returncode


if __name__ == "__main__":
    raise SystemExit(main())
