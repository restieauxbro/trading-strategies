#!/usr/bin/env python3
"""
Momentum After Pullback — yfinance-based scanner.

Implements the TrendSpider scan conditions from strategies/momentum-pullback/config.md:
  Group 1: Daily price > EMA(200), Weekly EMA(50) > EMA(200), Weekly price > EMA(50)
  Group 2: Daily EMA(200) rising (now > 40 bars ago), Daily EMA(50) rising (now > 20 bars ago)
  Group 3: Price within ±3% of daily EMA(50) (tested in last 5 bars)
  Group 4: At least one trigger — recross above 20 EMA, RSI cross above 50, or close above prior day high
"""

from __future__ import annotations

import json
import sys
import time
import warnings
from datetime import datetime, timedelta

import numpy as np
import yfinance as yf

warnings.filterwarnings("ignore")


def get_sp500_tickers() -> list[str]:
    """Fetch current S&P 500 constituent list from Wikipedia."""
    import urllib.request
    import html.parser

    url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    try:
        with urllib.request.urlopen(url, timeout=30) as resp:
            html = resp.read().decode("utf-8")

        tickers = []
        in_table = False
        in_td = False
        td_count = 0
        current_ticker = ""

        class Parser(html.parser.HTMLParser):
            def __init__(self):
                super().__init__()
                self.tickers = []
                self.in_first_td = False
                self.row_count = 0

            def handle_starttag(self, tag, attrs):
                attrs_dict = dict(attrs)
                if tag == "tr":
                    self.row_count += 1
                    self.td_idx = 0
                if tag == "td":
                    self.td_idx = getattr(self, "td_idx", 0) + 1
                    self.in_first_td = self.td_idx == 1
                if tag == "a" and self.in_first_td:
                    pass

            def handle_endtag(self, tag):
                if tag == "td":
                    self.in_first_td = False

            def handle_data(self, data):
                if self.in_first_td:
                    cleaned = data.strip().replace(".", "-")
                    if cleaned and 1 <= len(cleaned) <= 5 and cleaned[0].isalpha():
                        self.tickers.append(cleaned)

        parser = Parser()
        parser.feed(html)
        tickers = list(dict.fromkeys(parser.tickers))  # deduplicate preserving order
        if len(tickers) > 450:
            return tickers[:505]
        return tickers
    except Exception as e:
        print(f"Warning: could not fetch from Wikipedia ({e}), using fallback list", file=sys.stderr)
        return FALLBACK_TICKERS


# Fallback S&P 500 subset for major large caps if Wikipedia fails
FALLBACK_TICKERS = [
    "AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "BRK-B", "LLY", "AVGO",
    "JPM", "UNH", "XOM", "V", "MA", "COST", "HD", "PG", "NFLX", "JNJ",
    "ABBV", "WMT", "BAC", "CRM", "MRK", "CVX", "ORCL", "ACN", "AMD", "PEP",
    "TMO", "ADBE", "KO", "MCD", "QCOM", "LIN", "DHR", "TXN", "ABT", "AMGN",
    "PM", "INTU", "GE", "CAT", "SPGI", "ISRG", "RTX", "BLK", "AXP", "GS",
    "NOW", "BKNG", "SYK", "VRTX", "PLD", "DE", "AMAT", "ADI", "MDLZ", "TJX",
    "GILD", "MS", "C", "REGN", "MMC", "UNP", "ZTS", "EOG", "BSX", "ADP",
    "MO", "SO", "DUK", "SHW", "LRCX", "CME", "CI", "KLAC", "CL", "PH",
    "PYPL", "WFC", "ITW", "MCO", "NSC", "GD", "ETN", "ELV", "HCA", "TGT",
    "APH", "PANW", "SNPS", "USB", "PNC", "CDNS", "MCHP", "CTAS", "HUM", "ECL",
    "FDX", "EMR", "ORLY", "NXPI", "PAYX", "COF", "WELL", "MCK", "AFL", "AON",
    "AIG", "TFC", "STZ", "DG", "FICO", "FAST", "CARR", "VRSK", "O", "ODFL",
    "FTNT", "RMD", "WM", "EW", "OTIS", "CPRT", "KMB", "NUE", "PCAR", "HLT",
    "MNST", "GEHC", "GWW", "IDXX", "DXCM", "MSTR", "FANG", "OKE", "PCG", "AEP",
    "F", "GM", "UBER", "ABNB", "DASH", "LYFT", "SQ", "SOFI", "HOOD", "COIN",
]


def ema(prices: np.ndarray, period: int) -> np.ndarray:
    """Compute EMA array."""
    result = np.full_like(prices, np.nan)
    if len(prices) < period:
        return result
    k = 2.0 / (period + 1)
    # Seed with SMA
    result[period - 1] = np.mean(prices[:period])
    for i in range(period, len(prices)):
        result[i] = prices[i] * k + result[i - 1] * (1 - k)
    return result


def rsi(prices: np.ndarray, period: int = 14) -> np.ndarray:
    """Compute RSI array."""
    result = np.full_like(prices, np.nan)
    if len(prices) < period + 1:
        return result
    deltas = np.diff(prices)
    gains = np.where(deltas > 0, deltas, 0.0)
    losses = np.where(deltas < 0, -deltas, 0.0)

    avg_gain = np.mean(gains[:period])
    avg_loss = np.mean(losses[:period])

    for i in range(period, len(deltas)):
        avg_gain = (avg_gain * (period - 1) + gains[i]) / period
        avg_loss = (avg_loss * (period - 1) + losses[i]) / period
        if avg_loss == 0:
            result[i + 1] = 100.0
        else:
            rs = avg_gain / avg_loss
            result[i + 1] = 100 - 100 / (1 + rs)
    return result


def resample_to_weekly(dates, closes, opens, highs, lows, volumes):
    """Resample daily OHLCV to weekly (week ending Friday)."""
    from collections import defaultdict
    weekly = defaultdict(lambda: {"open": None, "high": -np.inf, "low": np.inf, "close": None, "volume": 0})

    for i, d in enumerate(dates):
        # ISO week key
        week_key = d.isocalendar()[:2]  # (year, week)
        wk = weekly[week_key]
        if wk["open"] is None:
            wk["open"] = opens[i]
        wk["high"] = max(wk["high"], highs[i])
        wk["low"] = min(wk["low"], lows[i])
        wk["close"] = closes[i]
        wk["volume"] += volumes[i]

    sorted_keys = sorted(weekly.keys())
    w_closes = np.array([weekly[k]["close"] for k in sorted_keys])
    return w_closes


def check_ticker(ticker: str, daily_data) -> dict | None:
    """
    Apply all scan conditions. Returns dict with ticker + metadata if passes, else None.
    """
    try:
        closes = daily_data["Close"].values.astype(float)
        opens = daily_data["Open"].values.astype(float)
        highs = daily_data["High"].values.astype(float)
        lows = daily_data["Low"].values.astype(float)
        volumes = daily_data["Volume"].values.astype(float)
        dates = [d.date() if hasattr(d, "date") else d for d in daily_data.index]

        if len(closes) < 210:
            return None

        # Daily EMAs
        d_ema20 = ema(closes, 20)
        d_ema50 = ema(closes, 50)
        d_ema200 = ema(closes, 200)

        # Need valid EMAs
        last = -1
        if np.isnan(d_ema200[last]) or np.isnan(d_ema50[last]) or np.isnan(d_ema20[last]):
            return None

        # --- Group 1: Trend alignment ---
        # Daily: price > EMA(200)
        if closes[last] <= d_ema200[last]:
            return None

        # Weekly EMAs
        w_closes = resample_to_weekly(dates, closes, opens, highs, lows, volumes)
        if len(w_closes) < 55:
            return None
        w_ema50 = ema(w_closes, 50)
        w_ema200 = ema(w_closes, 200)
        if np.isnan(w_ema200[-1]) or np.isnan(w_ema50[-1]):
            return None

        # Weekly: EMA50 > EMA200 (golden cross)
        if w_ema50[-1] <= w_ema200[-1]:
            return None

        # Weekly: price > weekly EMA50
        if w_closes[-1] <= w_ema50[-1]:
            return None

        # --- Group 2: Rising trend ---
        # Daily EMA200 now > EMA200 40 bars ago
        if len(d_ema200) < 41 or np.isnan(d_ema200[-41]):
            return None
        if d_ema200[last] <= d_ema200[-41]:
            return None

        # Daily EMA50 now > EMA50 20 bars ago
        if len(d_ema50) < 21 or np.isnan(d_ema50[-21]):
            return None
        if d_ema50[last] <= d_ema50[-21]:
            return None

        # --- Group 3: Price within ±3% of EMA50 in last 5 bars ---
        # Check if ANY of last 5 closes were within ±3% of daily EMA50 at that time
        pullback_test = False
        for i in range(-5, 0):
            if np.isnan(d_ema50[i]):
                continue
            pct_diff = abs(closes[i] - d_ema50[i]) / d_ema50[i]
            if pct_diff <= 0.03:
                pullback_test = True
                break
        if not pullback_test:
            return None

        # --- Group 4: At least one trigger ---
        trigger_hit = False
        trigger_desc = []

        # Trigger A: Close back above 20 EMA after being below (last 5 bars, look for cross)
        for i in range(-5, -1):
            if np.isnan(d_ema20[i]) or np.isnan(d_ema20[i + 1]):
                continue
            if closes[i] < d_ema20[i] and closes[i + 1] > d_ema20[i + 1]:
                trigger_hit = True
                trigger_desc.append("Recrossed above 20 EMA")
                break

        # Trigger B: RSI crossing above 50 in last 5 bars
        d_rsi = rsi(closes, 14)
        for i in range(-5, -1):
            if np.isnan(d_rsi[i]) or np.isnan(d_rsi[i + 1]):
                continue
            if d_rsi[i] < 50 and d_rsi[i + 1] >= 50:
                trigger_hit = True
                trigger_desc.append("RSI crossed above 50")
                break

        # Trigger C: Close above prior day's high after pullback
        # (within last 5 bars AND current close > prior high)
        for i in range(-4, 0):
            if closes[i] > highs[i - 1]:
                trigger_hit = True
                trigger_desc.append("Close above prior day high")
                break

        if not trigger_hit:
            return None

        # --- Compute additional metrics for scoring ---
        # Volume trend on pullback (last 5 bars vs 20-bar avg)
        vol_20avg = np.mean(volumes[-20:]) if len(volumes) >= 20 else np.nan
        vol_last5avg = np.mean(volumes[-5:]) if len(volumes) >= 5 else np.nan
        volume_declining = (not np.isnan(vol_20avg)) and (not np.isnan(vol_last5avg)) and vol_last5avg < vol_20avg

        # RSI current
        current_rsi = d_rsi[last] if not np.isnan(d_rsi[last]) else None

        pct_from_ema50 = (closes[last] - d_ema50[last]) / d_ema50[last] * 100

        return {
            "ticker": ticker,
            "current_price": round(float(closes[last]), 2),
            "ema20": round(float(d_ema20[last]), 2),
            "ema50": round(float(d_ema50[last]), 2),
            "ema200": round(float(d_ema200[last]), 2),
            "pct_from_ema50": round(pct_from_ema50, 2),
            "volume_declining": bool(volume_declining),
            "current_rsi": round(float(current_rsi), 1) if current_rsi is not None else None,
            "trigger": " | ".join(trigger_desc),
            "w_ema50": round(float(w_ema50[-1]), 2),
            "w_ema200": round(float(w_ema200[-1]), 2),
        }
    except Exception as e:
        return None


def run_scan(tickers: list[str], batch_size: int = 50) -> list[dict]:
    """Download data and screen each ticker."""
    results = []
    total = len(tickers)
    print(f"Scanning {total} S&P 500 tickers...", file=sys.stderr)

    for i in range(0, total, batch_size):
        batch = tickers[i : i + batch_size]
        try:
            raw = yf.download(
                batch,
                period="5y",
                interval="1d",
                auto_adjust=True,
                progress=False,
                threads=True,
            )
        except Exception as e:
            print(f"  Batch {i//batch_size + 1} download error: {e}", file=sys.stderr)
            continue

        for ticker in batch:
            try:
                if len(batch) == 1:
                    df = raw
                else:
                    df = raw.xs(ticker, axis=1, level=1) if ticker in raw.columns.get_level_values(1) else None

                if df is None or df.empty or len(df) < 300:
                    continue

                df = df.dropna(subset=["Close"])
                match = check_ticker(ticker, df)
                if match:
                    results.append(match)
                    print(f"  PASS: {ticker} ({match['trigger']})", file=sys.stderr)
            except Exception:
                continue

        print(f"  Processed {min(i + batch_size, total)}/{total}...", file=sys.stderr)
        time.sleep(0.3)

    return results


def main():
    tickers = get_sp500_tickers()
    print(f"Universe size: {len(tickers)}", file=sys.stderr)

    results = run_scan(tickers)

    output = {
        "scanner": "Momentum after pullback",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC"),
        "symbolsFound": [r["ticker"] for r in results],
        "details": results,
    }
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
