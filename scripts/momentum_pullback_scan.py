#!/usr/bin/env python3
"""
Momentum After Pullback scanner using yfinance.
Implements the TrendSpider scan logic from strategies/momentum-pullback/config.md
"""

import yfinance as yf
import pandas as pd
import numpy as np
import json
import datetime
import sys
import warnings
warnings.filterwarnings('ignore')

SP500_TICKERS = [
    "AAPL","MSFT","AMZN","NVDA","META","GOOGL","GOOG","BRK-B","LLY","JPM",
    "V","UNH","XOM","TSLA","MA","AVGO","PG","JNJ","HD","COST",
    "MRK","ABBV","CVX","BAC","KO","PEP","NFLX","TMO","ORCL","WMT",
    "CRM","MCD","ACN","CSCO","ABT","LIN","DHR","ADBE","AMD","AMGN",
    "TXN","PM","NEE","HON","UNP","RTX","QCOM","LOW","UPS","SPGI",
    "GS","IBM","INTU","CAT","ISRG","T","SYK","ELV","BLK","GE",
    "AMAT","ADP","MDT","BKNG","MDLZ","DE","SCHW","TJX","PLD","GILD",
    "ADI","MMC","LRCX","REGN","MO","AXP","SBUX","CVS","CB","CI",
    "ETN","BSX","PANW","NOW","PGR","SHW","ZTS","VRTX","ICE","SO",
    "AON","ITW","DUK","CME","NOC","HUM","EMR","CL","APH","MCO",
    "KLAC","SNPS","WM","MSI","FDX","GD","PSA","ORLY","MNST","ECL",
    "CDNS","F","GM","INTC","WELL","TGT","APD","GEV","PH","SLB",
    "CTAS","PNC","NSC","USB","HCA","EOG","MPC","VLO","PSX","OXY",
    "FCX","NUE","AIG","AFL","MET","PRU","TRV","ALL","WFC","AJG",
    "PYPL","EBAY","UBER","DASH","CRWD","DDOG","ZS","NET","SNOW","PLTR",
    "TTD","VEEV","WDAY","HUBS","BILL","OKTA","ZM","DOCU","ROKU","SQ",
    "SHOP","MELI","LVS","WYNN","MGM","CZR","RCL","CCL","NCLH","MAR",
    "HLT","BA","LMT","LHX","HII","TDG","HWM","CARR","OTIS","PNR",
    "ROK","XYL","ROP","A","WAT","ZBH","IDXX","GEHC","RMD","EW",
    "BDX","DXCM","SPG","O","VICI","AMT","CCI","EQIX","DLR","AVB",
    "EQR","MAA","EXR","WBA","MCK","ABC","PFE","BMY","MOH","CNC",
    "THC","UHS","DIS","PARA","WBD","BK","STT","NTRS","RF","KEY",
    "CFG","FITB","HBAN","ZION","CMA","MTB","WAL","CINF","GL","WRB",
    "ACGL","HIG","ATO","AWK","ETR","EXC","PCG","PPL","XEL","AEE",
    "CMS","LNT","NI","OGE","WEC","EVRG","SR","UGI","SRE","CNP",
    "NRG","VST","DVN","COP","HES","MRO","APA","NOV","HAL","BKR",
    "TRGP","KMI","OKE","WMB","LNG","CTRA","EQT","AR","RRC","SM",
    "DLTR","DG","FIVE","BJ","COST","KR","SFM","GO","CHEF","USFD",
    "SYY","PFGC","POST","GIS","CAG","CPB","HRL","MKC","SJM","K",
    "MDLZ","HSY","TR","KHC","TSN","HRL","JBSS","SAFM","PPC","CALM",
]

SP500_TICKERS = list(dict.fromkeys(SP500_TICKERS))


def ema(series, period):
    return series.ewm(span=period, adjust=False).mean()


def rsi(series, period=14):
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.ewm(span=period, adjust=False).mean()
    avg_loss = loss.ewm(span=period, adjust=False).mean()
    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))


def check_ticker(ticker, daily_data, weekly_data):
    """Apply all momentum-pullback scan conditions."""
    try:
        if daily_data is None or len(daily_data) < 210:
            return False, "insufficient daily data"
        if weekly_data is None or len(weekly_data) < 210:
            return False, "insufficient weekly data"

        d = daily_data.copy()
        w = weekly_data.copy()

        # Compute EMAs
        d['ema200'] = ema(d['Close'], 200)
        d['ema50'] = ema(d['Close'], 50)
        d['ema20'] = ema(d['Close'], 20)
        d['rsi'] = rsi(d['Close'])

        w['ema50'] = ema(w['Close'], 50)
        w['ema200'] = ema(w['Close'], 200)

        # Latest values
        close_d = d['Close'].iloc[-1]
        ema200_d = d['ema200'].iloc[-1]
        ema50_d = d['ema50'].iloc[-1]
        ema20_d = d['ema20'].iloc[-1]

        close_w = w['Close'].iloc[-1]
        ema50_w = w['ema50'].iloc[-1]
        ema200_w = w['ema200'].iloc[-1]

        # GROUP 1 — Trend alignment
        # Daily: price > 200 EMA
        if close_d <= ema200_d:
            return False, f"daily close {close_d:.2f} <= 200EMA {ema200_d:.2f}"

        # Weekly: EMA50 > EMA200 (golden cross)
        if ema50_w <= ema200_w:
            return False, "weekly no golden cross"

        # Weekly: price > weekly 50 EMA
        if close_w <= ema50_w:
            return False, f"weekly close {close_w:.2f} <= weekly 50EMA {ema50_w:.2f}"

        # GROUP 2 — Rising trend confirmation
        # Daily EMA200 rising: now vs 40 candles ago
        if len(d) < 41:
            return False, "not enough data for EMA200 check"
        ema200_40ago = d['ema200'].iloc[-41]
        if ema200_d <= ema200_40ago:
            return False, "daily 200 EMA not rising"

        # Daily EMA50 rising: now vs 20 candles ago
        if len(d) < 21:
            return False, "not enough data for EMA50 check"
        ema50_20ago = d['ema50'].iloc[-21]
        if ema50_d <= ema50_20ago:
            return False, "daily 50 EMA not rising"

        # GROUP 3 — Price within ±3% of daily 50 EMA in last 5 bars
        last5_close = d['Close'].iloc[-5:]
        last5_ema50 = d['ema50'].iloc[-5:]
        pct_diff = ((last5_close - last5_ema50) / last5_ema50).abs()
        if not (pct_diff <= 0.03).any():
            return False, f"price not within 3% of 50EMA in last 5 bars (min diff: {pct_diff.min()*100:.1f}%)"

        # GROUP 4 — Timing triggers (at least one)
        # Trigger A: Close back above 20 EMA after being below
        trigger_a = False
        if len(d) >= 2:
            prev_below_20 = d['Close'].iloc[-6:-1] < d['ema20'].iloc[-6:-1]
            curr_above_20 = close_d > ema20_d
            trigger_a = prev_below_20.any() and curr_above_20

        # Trigger B: RSI crossing back above 50
        trigger_b = False
        if len(d) >= 2:
            rsi_curr = d['rsi'].iloc[-1]
            rsi_prev = d['rsi'].iloc[-2]
            trigger_b = rsi_curr >= 50 and rsi_prev < 50

        # Trigger C: Close above prior day's high after pullback
        trigger_c = False
        if len(d) >= 2:
            prev_high = d['High'].iloc[-2]
            trigger_c = close_d > prev_high

        if not (trigger_a or trigger_b or trigger_c):
            return False, "no timing trigger met"

        trigger_names = []
        if trigger_a: trigger_names.append("A(above20EMA)")
        if trigger_b: trigger_names.append("B(RSI>50)")
        if trigger_c: trigger_names.append("C(above_prev_high)")

        pct_from_50ema = ((close_d - ema50_d) / ema50_d) * 100
        return True, f"PASS triggers={trigger_names} close={close_d:.2f} 50EMA={ema50_d:.2f} ({pct_from_50ema:+.1f}%)"

    except Exception as e:
        return False, f"error: {e}"


def main():
    print(f"=== Momentum After Pullback Scanner (yfinance) ===")
    print(f"Date: {datetime.date.today()}")
    print(f"Scanning {len(SP500_TICKERS)} tickers...")
    print()

    # Download data in batches
    passing = []
    BATCH = 30
    total = len(SP500_TICKERS)

    for i in range(0, total, BATCH):
        batch = SP500_TICKERS[i:i+BATCH]
        batch_str = " ".join(batch)
        try:
            # Download daily data (1 year)
            daily = yf.download(batch_str, period="2y", interval="1d",
                               progress=False, auto_adjust=True, group_by='ticker',
                               threads=True)
            # Download weekly data
            weekly = yf.download(batch_str, period="5y", interval="1wk",
                                progress=False, auto_adjust=True, group_by='ticker',
                                threads=True)
        except Exception as e:
            print(f"Batch {i//BATCH+1} download error: {e}")
            continue

        for ticker in batch:
            try:
                if len(batch) == 1:
                    d_data = daily
                    w_data = weekly
                else:
                    if ticker not in daily.columns.get_level_values(0):
                        continue
                    d_data = daily[ticker].dropna(subset=['Close'])
                    w_data = weekly[ticker].dropna(subset=['Close'])

                passed, reason = check_ticker(ticker, d_data, w_data)
                if passed:
                    print(f"  PASS: {ticker} — {reason}")
                    passing.append(ticker)
                else:
                    pass  # silent fail
            except Exception as e:
                pass  # silent fail

        print(f"  Batch {i//BATCH+1}/{(total+BATCH-1)//BATCH} done. Passing so far: {len(passing)}")

    print()
    print(f"=== SCAN COMPLETE ===")
    print(f"Symbols found ({len(passing)}): {passing}")

    result = {
        "timestamp": int(datetime.datetime.now().timestamp() * 1000),
        "scanner": "Momentum after pullback",
        "symbolsFound": passing,
        "count": len(passing)
    }
    print()
    print("JSON RESULT:")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
EOF
