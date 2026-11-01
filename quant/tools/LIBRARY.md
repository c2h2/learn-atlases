# The open library (quants.md) — figures lessons may quote

Source: the public catalogue at https://quants.md/ and the Apache-2.0 examples in
https://github.com/QuantJourneyOrg/quantjourney-bt (QuantJourney). Read in 2026.

These are **that project's reported backtests**, under their data, costs and fill rules.
This atlas has not re-run them. They are not forecasts and not recommendations.
The library itself describes the walk-forward pages as slice diagnostics, not as independent
out-of-sample evidence. Where a cell is "—", the catalogue page does not report that statistic.
Do not invent a replacement. Prefer the more precise figure when two are given.

Engine split, in their words: weight mode sets target weights; order mode submits explicit
orders; walk-forward examples test whether a result holds up over time. The project states
that the software is not a broker, not a live trading system and not investment advice.

## Orders

| id | name | rule (their one-line description) | bars | span | return | CAGR | Sharpe | max DD | win | PF |
|---|---|---|---|---|---|---|---|---|---|---|
| O01 | Market SMA Cross | Buy when SMA(20) crosses above SMA(50); sell on the reverse. Market orders. Equity ETFs, trend. | daily | 25 yrs | +126.66% | +3.33% | 0.21 | −16.35% | 51.9% | 2.18 |
| O02 | Market RSI Reversion | Buy RSI(14) < 35, sell RSI > 60. Market orders. | daily | 25 yrs | +29.08% | +1.03% | −0.17 | −16.01% | 71.6% | 1.81 |
| O03 | Limit RSI Dip | Passive buy-limit below the close on weak RSI. | daily | 25 yrs | +94.66% | +2.70% | 0.14 | −19.09% | 100% | infinite |
| O04 | Limit Trend Pullback | In an uptrend, wait for a 1% pullback to enter. Limit. | daily | 25 yrs | +56.83% | +1.82% | −0.04 | −6.85% | 48.2% | 1.36 |
| O05 | Stop Breakout Entry | Buy-stop above the recent 20-day high. | daily | 25 yrs | +41.44% | +1.40% | −0.19 | −10.5% | 61.9% | 1.45 |
| O06 | Protective Stop Loss | Trend entry with a 5% protective stop. | daily | 25 yrs | +60.1% | +1.90% | 0.00 | −16.2% | 44.7% | 1.70 |
| O07 | Stop Limit Breakout | Enter breakouts but cap the maximum fill price. Stop-limit. | daily | 25 yrs | +56.2% | +1.80% | −0.05 | −6.4% | 63.0% | 1.63 |
| O08 | Stop Limit Protection | Trend entry, downside protected by a stop-limit sell. | daily | 25 yrs | +63.6% | +1.99% | 0.02 | −14.2% | 43.1% | 1.81 |
| O09 | Trailing Stop Trend | Trend entry, 4% trailing stop manages the exit. | daily | 25 yrs | +30.0% | +1.06% | −0.33 | −7.0% | 47.6% | 1.71 |
| O10 | Trailing Stop RSI | Oversold RSI entry, 5% trailing stop. | daily | 25 yrs | −12.2% | −0.52% | −0.41 | −39.0% | 39.8% | 0.91 |
| O11 | Trailing Stop Limit | Trailing stop that converts to a limit on trigger. | daily | 25 yrs | +28.1% | +1.00% | −0.38 | −6.2% | 47.6% | 1.69 |
| O12 | Bracket Trend | Trend entry with a +6% / −3% bracket. | daily | 25 yrs | +29.4% | +1.04% | −0.38 | −6.8% | 45.8% | 1.58 |
| O13 | Bracket RSI Reversion | RSI dip with a +4% / −2% bracket. | daily | 25 yrs | +8.5% | +0.33% | −0.43 | −11.6% | 45.8% | 1.07 |
| O14 | OCO Dip Or Breakout | Competing buy-limit (dip) and buy-stop (breakout). | daily | 25 yrs | +45.5% | +1.51% | −0.08 | −13.2% | 58.0% | 1.27 |
| O15 | Intraday Bracket Reversion 5m | RSI dip, bracket +0.6% / −0.4%. | 5-min | 4 wks | +1.1% | — | — | −1.3% | — | — |
| O16 | Intraday Stop Breakout 30m | Buy-stop above the 12-bar high, fixed holding period. | 30-min | 8 wks | −13.9% | — | — | −14.8% | — | — |
| O17 | Monthly Rotation Orders | Event-driven monthly momentum rotation, executed with orders. Multi-asset. | daily | 19 yrs | +381% | +8.62% | 0.53 | −28.2% | 52.1% | 1.78 |
| O18 | Signal Change Rotation Orders | Trade only on SMA trend-signal flips (no calendar). | daily | 25 yrs | +130% | +3.38% | 0.22 | −16.3% | 52.4% | 2.21 |
| O19 | FX Momentum Lots | Contract-aware whole-lot momentum on USD-quoted spot pairs. | daily | 16 yrs | −14.2% | −0.95% | −0.71 | −15.3% | — | — |
| O20 | Futures Donchian Contracts | Whole-contract ATR sizing on provider continuous futures. | daily | 7 yrs | +35.5% | +4.67% | 0.30 | −16.7% | 48.0% | 1.34 |

## Weights

| id | name | rule | bars | span | return | CAGR | Sharpe | max DD | win | PF |
|---|---|---|---|---|---|---|---|---|---|---|
| W01 | Daily SMA Trend | Hold each sector ETF while SMA(50) > SMA(200); daily rebalance. | daily | 26 yrs | +537% | +7.38% | 0.45 | −34.7% | 72.6% | 2.48 |
| W02 | Monthly Drift ETF | SMA(50/200) trend on ETFs; month-end + 5% drift band. Multi-asset. | daily | 19 yrs | +138% | +4.66% | 0.31 | −19.4% | 63.5% | 1.73 |
| W03 | Weekly RSI Reversion | Enter RSI(14) < 35, exit RSI > 60; weekly (Friday). | daily | 26 yrs | +373% | +6.16% | 0.34 | −49.2% | 62.1% | 2.15 |
| W04 | Quarterly Dual Momentum | Rank ETFs by 12-month return, hold top 2 if positive; quarter-end. | daily | 19 yrs | +64.6% | +2.66% | 0.12 | −42.8% | 59.5% | 1.21 |
| W05 | Monthly Inverse Vol | Size each ETF by inverse 63-day volatility; month-end. | daily | 19 yrs | +174% | +5.45% | 0.45 | −20.4% | 73.2% | 3.59 |
| W06 | Signal Change Defensive | SPY > SMA(200) then risk-on ETFs, else defensive; on signal change. | daily | 19 yrs | +132% | +4.54% | 0.26 | −24.6% | 41.1% | 1.64 |
| W07 | Intraday RSI 15m | Equal-weight basket when RSI oversold. | 15-min | 3 wks | +2.6% | — | — | −1.1% | — | — |
| W08 | Intraday EMA Scalp 1m | EMA(9/21) trend or cash. | 1-min | 6 days | −0.2% | — | — | −0.2% | — | — |
| W09 | Intraday SMA Trend 1h | SMA(10/30) trend or cash. | hourly | 9 wks | +1.5% | — | — | −3.5% | — | — |
| W10 | Monthly Circuit Breaker | Monthly ETF trend; flatten on a 15% drawdown, then a cooldown. | daily | 19 yrs | +14.2% | +0.70% | −0.45 | −10.6% | 53.3% | 1.11 |
| W11 | Quarterly TE Cost Gate | Momentum with a tracking-error trigger and a turnover budget. | daily | 19 yrs | +266% | +7.07% | 0.44 | −25.5% | 66.4% | 2.67 |
| W12 | Daily Partial Drift | Momentum tilt; trade only names past a 10% drift band. | daily | 26 yrs | +269% | +5.15% | 0.30 | −36.8% | 68.2% | 1.62 |
| W13 | Pairs Ratio Z Score | Market-neutral KO/PEP on a log-ratio z-score. | daily | 26 yrs | +48.8% | +1.54% | −0.05 | −23.6% | 49.1% | 1.14 |
| W14 | Pairs Hedge Ratio | Market-neutral EWA/EWC on a rolling OLS hedge-ratio spread. | daily | 26 yrs | +12.4% | +0.45% | −0.30 | −14.3% | 50.2% | 1.06 |
| W15 | Cross Sectional Momentum | Long top 3 / short bottom 3 by 12-month return; monthly. | daily | 26 yrs | +1.3% | +0.05% | −0.24 | −25.4% | 49.4% | 1.00 |
| W16 | Cross Sectional Reversal | Long losers / short winners by 1-month return; weekly. | daily | 26 yrs | −1.7% | −0.07% | −0.24 | −33.7% | 47.5% | 1.00 |
| W17 | Vol Target Trend | SMA trend basket scaled to a 10% volatility target. | daily | 19 yrs | +169% | +5.35% | 0.36 | −28.9% | 63.8% | 1.93 |
| W18 | Vol Target Momentum | Momentum basket scaled to a 15% volatility target. | daily | 19 yrs | +621% | +10.96% | 0.57 | −41.2% | 64.6% | 2.05 |
| W19 | Risk Parity Multi Asset | Equal risk contribution across a multi-asset basket. | daily | 19 yrs | +84.5% | +3.28% | 0.16 | −35.6% | 60.9% | 1.34 |
| W20 | Risk Parity Capped | Sector ERC chained with a 25% per-position cap. | daily | 26 yrs | +677% | +8.21% | 0.45 | −47.9% | 82.0% | 11.14 |
| W21 | Bollinger Reversion | Buy below the lower band, exit at the midline. | daily | 26 yrs | +487% | +7.04% | 0.42 | −35.2% | 59.8% | 1.96 |
| W22 | MACD Trend | Long while MACD is above its signal line. | daily | 26 yrs | +186% | +4.13% | 0.22 | −35.6% | 63.5% | 1.24 |
| W23 | FX Time Series Momentum | Six-month trend on USD-quoted spot pairs; inverse-vol weights. | daily | 16 yrs | −27.3% | −1.97% | −0.59 | −29.4% | — | — |
| W24 | FX Cross Sectional Momentum | Long strongest / short weakest XXX/USD pair; monthly. | daily | 16 yrs | −34.1% | −2.58% | −1.00 | −41.4% | — | — |
| W25 | Continuous Futures Trend | Diversified long/short trend on provider continuous series. | daily | 7 yrs | +46.3% | +5.88% | 0.62 | −9.7% | 50.0% | 5.85 |

W20's profit factor of 11.14 with an 82% win rate is a prompt to ask how a "win" is defined in a weight backtest. Do not treat it as a typical or portable number.

W25's profit factor of 5.85 with a 50% win rate is the classic trend shape (winners larger than losers) on a **7-year** window. Say the window is short.

## Walk-forward

| id | name | what the catalogue says | span |
|---|---|---|---|
| WF01 | Rolling Walk-Forward Validation | 48 folds. Sliding fixed-length train/test windows with a pre-OOS purge. The page says these are slice diagnostics, not independent out-of-sample evidence. | 26 yrs |
| WF02 | Expanding Walk-Forward Validation | 48 folds. Ever-growing training window against a sliding test window. Same diagnostic caveat. | 26 yrs |
| WF03 | Anchored Walk-Forward With Pre-OOS Purging | 48 folds. Fixed and percentage-based exclusions before each test window. Same diagnostic caveat. | 26 yrs |
| WF04 | Grid Search Parameter Optimization | 9 combinations. SMA fast in {20, 50, 80}, slow in {100, 150, 200}, each scored by a real backtest's Sharpe. | 26 yrs |
| WF05 | Optuna TPE Optimization + Walk-Forward | 30 trials. Optuna TPE over integer SMA windows with fast < slow, then a rolling walk-forward on the winner. | 26 yrs |

## Which chapter owns the main discussion

Mention a case in other chapters only in a sentence. The owner chapter does the real treatment.

- O01, O18, W01: trend/moving-averages
- O05, O20 (the breakout idea), W22: trend/breakouts-and-macd
- W06: trend/filters-and-defensive
- costs and whipsaw around these: trend/lag-whipsaw-and-costs
- O02, W03, W21: reversion/rsi-and-bands
- W13, W14: reversion/pairs-and-spreads
- W16: reversion/cross-sectional-reversal
- O10: reversion/when-reversion-fails
- W15: momentum/two-kinds-of-momentum
- W04: momentum/formation-skip-and-dual
- O17, O18 (calendar vs signal-change), W12 (as a drift policy, one paragraph; the algebra lives in portfolio): momentum/rotation-and-calendars
- crashes, using Daniel and Moskowitz, not a library id: momentum/momentum-crashes
- O19, W23, W24: momentum/momentum-across-assets and again, with instrument detail, asset-classes/foreign-exchange
- W05, W17, W18: portfolio/inverse-volatility-and-targets
- W19, W20: portfolio/risk-parity
- W02, W10, W11, W12: portfolio/drift-turnover-and-breakers
- O03, O04: orders/market-and-limit-orders
- O05, O06, O07, O08: orders/stops-and-stop-limits
- O09, O11, O12, O13, O14: orders/trailing-brackets-and-oco
- O15, O16, O19 (lots), O20 (contracts): orders/lots-contracts-and-intraday
- O03's 100% win rate as adverse selection: orders/fills-slippage-and-spread
- W07, W08, W09, O15, O16: backtesting/intraday-samples
- the weight/order split, O01 vs W01 as the preview: backtesting/weights-versus-orders
- WF01, WF02: validation/walk-forward
- WF03: validation/purging-and-embargo
- WF04, WF05: validation/parameter-search
- O01 vs W01 side by side: research-craft/comparing-implementations
