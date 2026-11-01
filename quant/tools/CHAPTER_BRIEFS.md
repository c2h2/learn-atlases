# Chapter briefs

Shared by every lesson. Read `CONTENT_GUIDE.md` and `LIBRARY.md` first. British spelling. Education only: never tell the reader to trade. Quote library figures only from `LIBRARY.md`, with the 2026 attribution sentence, and say the atlas has not re-run them.

## Path A (verified)

Prices $P = (100, 102, 101, 104, 103, 107, 106, 110)$.

Simple returns, rounded to six decimals: $0.020000,\ -0.009804,\ 0.029703,\ -0.009615,\ 0.038835,\ -0.009346,\ 0.037736$.

Log returns: $0.019803,\ -0.009852,\ 0.029270,\ -0.009662,\ 0.038100,\ -0.009390,\ 0.037041$. Sum of log returns $= \ln(1.10) = 0.095310$. Compound simple return $= 0.10$.

Sample mean of the seven simple returns $0.013930$. Sample standard deviation with divisor $n-1$: $0.022848$. Ratio of mean to that standard deviation: $0.6097$. That ratio times $\sqrt{252}$ is about $9.68$, which is **not** a meaningful annual Sharpe of a seven-day path. Use this contrast in the uncertainty chapter; other chapters may point forward to it.

Equity index from 1 finishes at $1.10$. The only peak-to-trough on this rising path is the step $102 \to 101$, a drawdown of $-0.009804$ if you mark equity at each price. Say so; then build a second path when you need a serious drawdown.

SMA(3) ending at each date from the third price: $101,\ 102.3333,\ 102.6667,\ 104.6667,\ 105.3333,\ 107.6667$.

Two assets with volatility $0.10$ and $0.20$, inverse-volatility weights renormalised to sum to 1: $2/3$ and $1/3$. A book whose recent volatility is $0.16$, scaled to a target of $0.10$, is multiplied by $0.625$.

Use Path A rather than inventing a conflicting series. You may add Path B when the lesson needs a drawdown or a cross. Compute Path B with Python and show the inputs.

Macros available: `\E`, `\Var`, `\Cov`, `\Corr`, `\abs`, `\Prob`.

## Course: markets

Voice of the whole atlas: a strategy is a function of information available at $t$, and it earns what happens after $t$. Three families, matching the library: weights, orders, walk-forward. No recommendations.

### markets/systematic-question
Define information set $\mathcal{F}_t$, a signal $s_t \in \mathcal{F}_t$, a weight $w_t$ and an order as different objects. Proposition: a rule that multiplies $s_t$ by the return $R_t$ (which uses $P_t$ and $P_{t-1}$) has looked at a price that a close-to-close decision at $t-1$ would not yet have earned; write the legal product as $s_t R_{t+1}$. Examples: classify four plain-language "strategies" into signal, weight, order, or illegal clock. Widget: `sequence` of a constant gross return, caption that compounding is not a strategy. History: 1602 and why a transferable share is the object. Library: name the three families and the counts 25 / 20 / 5, no need to quote every Sharpe. Link `[[markets/instruments]]`, `[[performance/simple-and-log-returns]]`.

### markets/instruments
Define a cash equity, an ETF (a traded basket with a fee already inside the price), a USD-quoted spot FX rate, and a futures contract with a multiplier. Proposition: the P&L of one futures contract over a move $\Delta F$ is $\text{multiplier}\times \Delta F$, not $\Delta F$. Examples: SPY as one price versus 500 names; a euro FX quote in dollars; one equity-index future with multiplier 50 and a 2-point move (P&L = 100). Widget: `plot` of two linear contract values. Do not recommend ETFs. History: 1972 currency futures, 1993 SPY. Link `[[markets/prices-and-bars]]`.

### markets/prices-and-bars
Define tick, bar, OHLC, close. Show that many paths share one OHLC bar. Define close-to-close simple return. Examples on Path A: the return on the day the price goes from 104 to 103; the high and low the close throws away, with a made-up intraday range that has the same close. Widget: `plot` of a toy price `f: 100+2*sin(x)` with a horizontal line at a "close". History: decimalisation 2001 and the minimum tick. Link `[[markets/adjustment-universes-and-rolls]]`.

### markets/adjustment-universes-and-rolls
Split: price falls by the split factor, shares rise, raw close is not a return. Dividend: define a total-return index that reinvests a cash dividend $D_t$ as $P_t^{\mathrm{tr}} = (P_t + D_t) P_{t-1}^{\mathrm{tr}} / P_{t-1}$. Work a 2-for-1 split and a dividend of 1 on a price of 50. Survivorship: a universe chosen at the end of the sample. Futures roll: a continuous series is a choice (difference or ratio) and is not the P&L of holding the front contract through expiry. Examples with integers. Widget: `plot` of a price and a split-adjusted twin. History: CBOT 1848 as the futures template. Link `[[markets/reading-a-dashboard]]`.

### markets/reading-a-dashboard
Define total return, CAGR $(V_T/V_0)^{1/Y}-1$, and point at Sharpe, drawdown, win rate and profit factor as names the next course defines. Read O01 and W01 side by side from LIBRARY.md: same broad family, different reported CAGR (+3.33% versus +7.38%) and different max drawdown (−16.35% versus −34.7%). The lesson of the comparison is that the implementation is part of the result. Also show O10's negative CAGR so a dashboard is not a shop window. Widget: `plot` of $(1.0333)^x$ and $(1.0738)^x$ over 25 years, caption that these are the library CAGRs drawn as smooth compound curves, not the equity paths, and not forecasts. History: none new; point at Sharpe 1966. Link `[[performance/simple-and-log-returns]]`.

## Course: performance

### performance/simple-and-log-returns
Definitions and the proposition $\sum r_t = \ln(P_T/P_0)$. Show $r = \ln(1+R)$ and the approximation $r \approx R - R^2/2$. Examples: all of Path A, plus a two-period case $R = 0.50$ then $R = -0.50$ where the compound simple return is $-0.25$ and the sum of simple returns is $0$. Widget: `plot` of $\ln(1+x)$ against $x$ on $(-0.5,0.5)$. Warning: adding simple returns. Link `[[performance/volatility-and-drawdown]]`.

### performance/volatility-and-drawdown
Sample variance with $n-1$. Annualisation $\sigma\sqrt{252}$ only for daily returns that are being scaled, with the assumption stated. Downside deviation: root mean square of $\min(R_t - \tau, 0)$ with threshold $\tau$ stated (use 0). Maximum drawdown of an equity index. Proposition: volatility does not determine drawdown. Examples: Path A volatility; a second path $100,110,90,95$ whose drawdown is $90/110-1 = -18.1818\%$ (compute the returns yourself and confirm). Widget: `distribution` normal with sigma 0.01. Warning: a small standard deviation can hide one gap. Link Sharpe chapter.

### performance/sharpe-and-its-relatives
Define Sharpe $S = \bar{(R-R_f)} / s(R-R_f)$. In examples set $R_f = 0$ and say so. Annualisation $S\sqrt{K}$ under i.i.d., $K = 252$ for trading days. Sortino uses downside deviation. Calmar uses CAGR over $\abs{\text{max drawdown}}$; state Young's 1991 ratio as a path statistic, not a utility. Information ratio: active return over tracking error to a stated benchmark. Examples: Path A Sharpe $0.6097$ (per step, not annualised). A second example with $R_f$ not zero. Quote W01's reported Sharpe $0.45$ and O01's $0.21$ as reported numbers whose annualisation convention this atlas has not verified. Widget: `plot` of $m/s$ as $m$ varies. Warning: do not annualise seven observations. Link win-rate chapter.

### performance/win-rate-and-profit-factor
Define a win on a stated unit. Profit factor $=$ gross gains $/$ gross losses. Proposition: profit factor can be infinite with a tiny CAGR if there are no losses and the gains are small; and a win rate above one half can pair with a negative compound return if losses are larger. Examples: Path A win rate $4/7$ and profit factor $4.3898$ (compute from the simple returns; confirm). O03: reported win rate 100% and profit factor infinite, CAGR only +2.70% — ask how a win was defined, do not admire it. O10: win rate 39.8%, profit factor 0.91, negative CAGR. W20: profit factor 11.14 and win rate 82% as a number that is not interpretable until the win unit is known. Widget: `plot`. Link uncertainty.

### performance/uncertainty-of-performance
Standard error of a mean $\sigma/\sqrt{n}$. Lo (2002): for i.i.d. excess returns the standard error of the Sharpe ratio is approximately $\sqrt{(1 + \tfrac{1}{2}S^2)/n}$ when returns are normal and $S$ is not annualised; if returns are autocorrelated the effective $n$ shrinks. State the assumptions. Example: Path A, $S = 0.6097$, $n = 7$, the i.i.d. normal SE is about $0.41$, so the interval is huge. Second example: $n = 2520$ (about 10 years of trading days), $S = 0.05$ per day, SE much smaller — compute it. Do not claim the library Sharpes have these standard errors. Widget: `confidence` for a mean. History: Lo 2002. Link `[[statistics/moments-and-dependence]]`.

## Course: statistics

Point to Maths Atlas for proofs of least squares and of the CLT. Derive the trading specialisations here.

### statistics/moments-and-dependence
$\E$, $\Var$, $\Cov$, autocorrelation at lag 1: $\rho_1 = \Corr(R_t, R_{t-1})$. Positive $\rho_1$ is the trend hypothesis's statistical shadow; negative $\rho_1$ is reversion's. They can both be true at different lags. Examples: compute $\rho_1$ on Path A's simple returns with Python (the series is short; say the estimate is noisy). A two-point illustration where reversing a series flips the sign of $\rho_1$. Widget: `regression` or `distribution`. Link regression chapter. History: Lo and MacKinlay 1988, as dependence that can be detectable and still small.

### statistics/regression-on-a-signal
Model $R_{t+1} = a + b s_t + \varepsilon_{t+1}$. The signal is dated $t$. Proposition: replacing $s_t$ by $s_{t+1}$ is look-ahead. Least squares formulas for a simple regression, worked on four invented pairs $(s, R_{\text{next}})$ that you compute with numpy. Report $\hat a$, $\hat b$, residuals, $R^2$. Widget: `regression` with those points. Warning: $R^2$ on an in-sample fit is not a Sharpe ratio. Link testing chapter.

### statistics/testing-and-snooping
$t$-statistic of a mean. One test at size $0.05$. Proposition: if $m$ independent true-null tests are run, the chance of at least one rejection is $1-(1-\alpha)^m$. Compute it for $m = 20$ and $\alpha = 0.05$ (about $0.6415$). White's reality check as the idea, not a full derivation. Harvey, Liu and Zhu 2016 as the factor-zoo warning. Examples: the formula; a second example with $\alpha = 0.01$, $m = 9$ (the library grid WF04 has 9 cells — the analogy is the count of looks, not a claim about their p-values). Widget: `hypothesis`. Link resampling.

### statistics/stationarity-and-regimes
A price level with a unit root is not a stationary series; the return may be modelled as stationary, and that model may still be wrong. Volatility clustering: large $\abs{R}$ followed by large $\abs{R}$. Two-state Markov chain with the widget matrix in the content guide; compute the stationary distribution. For $P = \begin{pmatrix} 0.85 & 0.15 \\ 0.30 & 0.70 \end{pmatrix}$, stationary mass on calm solves the balance — compute it with Python and show the steps. Widget: `markov`. Warning: a regime filter fitted in sample is another searched parameter. Link `[[statistics/resampling]]`.

### statistics/resampling
i.i.d. bootstrap versus block bootstrap. Algorithm block: how to draw overlapping blocks of length $\ell$. Example: a short series with $\rho_1 > 0$, show that an i.i.d. bootstrap destroys it (compute one seeded bootstrap mean and one seeded block-bootstrap mean; fix the seed). What the interval does not cover: a break that has not happened yet. Widget: `lln` or `clt`. Link `[[trend/the-trend-hypothesis]]` and `[[validation/walk-forward]]`.

## Course: trend

### trend/the-trend-hypothesis
Time-series momentum: the sign of an asset's own past return, at an intermediate horizon, as a hypothesis about the sign of the next return. Cite Moskowitz, Ooi, Pedersen 2012 and Hurst, Ooi, Pedersen 2017 as historical averages across many futures, not as an ETF product. State what would count against the hypothesis (the sign relation disappears out of sample, or costs exceed it). Examples: a sign rule on Path A using the previous return — write the positions and the next-period P&L, including the legal lag. Widget: `plot`. Link moving averages.

### trend/moving-averages
$\mathrm{SMA}_n(t) = n^{-1}\sum_{i=0}^{n-1} P_{t-i}$. EMA with decay $\lambda$, recursion $E_t = \lambda P_t + (1-\lambda) E_{t-1}$. Cross: long when fast is above slow. Apply SMA(3) and SMA(5) to Path A and list the dates the fast is above the slow (compute). Library, as the main cases: O01 (SMA 20/50, market orders, reported CAGR +3.33%, Sharpe 0.21, max DD −16.35%), W01 (SMA 50/200 on sector ETFs, daily weights, CAGR +7.38%, Sharpe 0.45, max DD −34.7%), O18 (trade only on signal flips, CAGR +3.38%, Sharpe 0.22). The comparison is the lesson: do not talk about "the" moving-average backtest. Widget: `plot` of a price sinusoid and a smoother. Link breakouts.

### trend/breakouts-and-macd
Donchian channel: upper band = highest high over $N$ days. A buy-stop sits above that high. MACD: $E^{\text{fast}} - E^{\text{slow}}$, signal line a further EMA. Long while MACD is above its signal is W22's rule; report W22's CAGR +4.13%, Sharpe 0.22, max DD −35.6%. O05 is the stop-entry breakout (CAGR +1.40%, Sharpe −0.19). O20 is the futures version, owned in detail by asset-classes; mention it in one sentence. Examples: a 3-day channel on Path A. Widget: `plot`. Link filters.

### trend/filters-and-defensive
A filter maps one signal into a universe. W06: if SPY is above its SMA(200), hold the risk-on ETF list, otherwise the defensive list, and trade on signal change. Reported CAGR +4.54%, Sharpe 0.26, max DD −24.6%, win rate 41.1%. Define the rule without treating SPY, or any defensive ticker, as something the reader should hold. Example: a toy binary filter on Path A that is in the asset only when $P_t > \mathrm{SMA}_3$, else in cash earning 0. Compute the compound return. Widget: `markov` or `plot`. Link lag chapter.

### trend/lag-whipsaw-and-costs
A longer average lags a turn. Whipsaw: a cross that flips and flips back. Cost: each unit of turnover pays $c$. Proposition: if a rule is long, flat, long, its net compound return is the gross one times a cost factor you write explicitly for a one-way cost $c$ on notional traded. Example: Path A SMA cross with $c = 0.001$ per unit turnover. Count the flips you already computed and subtract. O09's reported Sharpe −0.33 is a reminder that an exit overlay can dominate; leave the order mechanics to the orders course. Widget: `plot`. Link `[[orders/market-and-limit-orders]]` and `[[portfolio/from-signal-to-weight]]`.

## Course: reversion

### reversion/the-reversion-hypothesis
Jegadeesh 1990 and Lehmann 1990: short-horizon negative autocorrelation in individual stocks. Poterba and Summers 1988: a different, multi-year claim. Do not mix the horizons. Examples: a one-day reversal rule on Path A (legal lag) and its P&L. State that an average historical relation is not a threshold at 35. Widget: `distribution`. Link RSI.

### reversion/rsi-and-bands
Wilder's RSI. Give a computable definition: average gain and average loss over a window, $\mathrm{RS} = \text{avg gain}/\text{avg loss}$, $\mathrm{RSI} = 100 - 100/(1+\mathrm{RS})$, and state whether you use a simple average or Wilder's smoother. Work RSI on a window of Path A you choose, with Python. Bollinger band: $\mathrm{SMA} \pm k s$, $k = 2$ unless stated. W21: buy below the lower band, exit at the midline; reported CAGR +7.04%, Sharpe 0.42, max DD −35.2%. O02 and W03: RSI enter below 35, exit above 60. O02 is market orders, reported CAGR +1.03%, Sharpe −0.17, win rate 71.6%. W03 is weekly weights, CAGR +6.16%, Sharpe 0.34, max DD −49.2%. Same thresholds, different experiment. Widget: `plot` of a mean and two bands. Link pairs.

### reversion/pairs-and-spreads
Log ratio $z_t = (\ln P^{(1)}_t - \ln P^{(2)}_t - \mu)/\sigma$ using a trailing window only. Hedge ratio: rolling OLS of one log price on the other, residual as the spread. Correlation is not cointegration. State the Engle–Granger idea (regress, test the residual for a unit root) and its assumptions; do not fake a unit-root p-value. W13: KO/PEP log-ratio z-score, reported CAGR +1.54%, Sharpe −0.05, max DD −23.6%. W14: EWA/EWC rolling OLS hedge, CAGR +0.45%, Sharpe −0.30. Examples: two invented price paths, compute one z-score and one hedge ratio with numpy. Widget: `regression`. History: Gatev, Goetzmann, Rouwenhorst 2006. Link cross-sectional reversal.

### reversion/cross-sectional-reversal
Rank by the last month's return. Long the losers, short the winners, in the library's W16: bottom versus top, weekly, reported return −1.7%, CAGR −0.07%, Sharpe −0.24, max DD −33.7%, profit factor 1.00. A profit factor of 1 with a small negative CAGR is a lesson in costs or in the definition of the ratio; say what you can and cannot see from the dashboard. Example: three names, one-month returns $+5\%$, $+1\%$, $-4\%$, equal-weight long the worst and short the best, next-month invented returns, legal timing. Widget: `plot`. Link failure chapter.

### reversion/when-reversion-fails
O10: RSI entry with a 5% trailing stop, reported return −12.2%, CAGR −0.52%, Sharpe −0.41, max DD −39.0%, profit factor 0.91. The entry is the reversion story; the exit is a trend-style stop. The loss is evidence about that combination in that sample, not a reason to take the other side. Structural breaks: a hedge ratio that jumps. Example: a spread that trends by a fixed amount each day so a z-score rule keeps adding to a loser. Compute the P&L. Widget: `plot`. Link `[[momentum/momentum-crashes]]` and `[[orders/trailing-brackets-and-oco]]`.

## Course: momentum

### momentum/two-kinds-of-momentum
Cross-sectional: rank a universe. Time-series: each asset's own past, already defined in trend. Jegadeesh and Titman 1993. W15: long top 3, short bottom 3, by 12-month return, monthly; reported return +1.3%, CAGR +0.05%, Sharpe −0.24, max DD −25.4%, profit factor 1.00. A near-zero profit factor and a near-zero CAGR over 26 years is a published negative-to-flat result. Say so. Example: rank four invented 12-month returns and form equal long/short weights that sum to zero. Widget: `plot`. Link formation chapter.

### momentum/formation-skip-and-dual
Formation window, skip window, holding window. The skip exists because the last month can be a reversal. Dual momentum: among assets with positive own past return, hold the relative winners; otherwise cash. W04: rank by 12-month return, hold the top 2 if positive, quarter-end; reported CAGR +2.66%, Sharpe 0.12, max DD −42.8%. Example: three assets, 12-month returns $+8\%$, $+3\%$, $-2\%$, skip already applied in the given numbers, decide the book under a dual rule and under a pure relative rule. They differ. Widget: `sequence`. Link calendars.

### momentum/rotation-and-calendars
Calendar rebalance versus signal-change versus drift band. O17: monthly momentum rotation with orders, multi-asset, reported CAGR +8.62%, Sharpe 0.53, max DD −28.2%, 19 years. O18 is the signal-change SMA case from the trend course; one paragraph here on the calendar contrast, do not repeat the whole SMA derivation. W12's 10% drift band is owned in the portfolio course; one sentence. Example: a weight that drifts from 0.50 to 0.62 because the winner rallied; a 10% band does not trade, a month-end rule does. Compute the drift. Widget: `plot`. Link crashes.

### momentum/momentum-crashes
Daniel and Moskowitz 2016: winner-minus-loser portfolios have episodic crashes, especially in a volatile rebound after a decline, when yesterday's losers lead. An average premium with a conditional left tail is the fact. Do not turn it into a timing rule the reader should trade. Example: a two-period momentum book that is up small, then down large, so the mean is positive and the compound return is negative. Choose numbers and compute both. Widget: `distribution` with a wide sigma, or `hypothesis`. Link FX chapter.

### momentum/momentum-across-assets
The same sentences on FX. W23: six-month time-series momentum on USD-quoted pairs, inverse-vol weights, reported return −27.3%, CAGR −1.97%, Sharpe −0.59, max DD −29.4%, 16 years. W24: long the strongest and short the weakest, reported return −34.1%, CAGR −2.58%, Sharpe −1.00, max DD −41.4%. O19: whole lots, return −14.2%, Sharpe −0.71. Instrument detail (lots, quotes) is finished in `[[asset-classes/foreign-exchange]]`; this chapter owns the sign of the published results and the refusal to flip them. Example: inverse-vol weights $2/3$, $1/3$ on two pairs whose next returns you specify. Widget: `markov`. Link `[[portfolio/inverse-volatility-and-targets]]`.

## Course: portfolio

### portfolio/from-signal-to-weight
A signal $s_i \in \{-1,0,1\}$ becomes a weight only under a map. Equal weight among the names with $s_i = 1$, cash the rest, gross exposure 1. Score-proportional weights need a stated normalisation. Example: signals $(1,1,0,-1)$ under a long-only map and under a gross-one long-short map. Write both vectors. They are not unique; say which convention you picked. Widget: `plot`. Link inverse vol. Library: W01 is a long-or-cash weight rule; do not repeat the whole trend chapter.

### portfolio/inverse-volatility-and-targets
$w_i \propto 1/\sigma_i$, then renormalise. Volatility target: scale $w$ by $\sigma_{\star}/\hat\sigma_p$. These are different maps. W05: inverse 63-day volatility, month-end, reported CAGR +5.45%, Sharpe 0.45, max DD −20.4%, profit factor 3.59. W17: trend basket to a 10% vol target, CAGR +5.35%, Sharpe 0.36, max DD −28.9%. W18: momentum basket to a 15% target, CAGR +10.96%, Sharpe 0.57, max DD −41.2%. A higher CAGR with a deeper drawdown is the point of W18 versus W17, not a ranking to act on. Examples: the $2/3$, $1/3$ weights; the $0.625$ scale. If the target is above the asset's volatility, the scale exceeds 1: that is leverage, and the lesson must say leverage magnifies both sides and that the atlas is not suggesting it. Widget: `plot` of scale against estimated vol. Link risk parity.

### portfolio/risk-parity
Equal risk contribution. For a diagonal covariance, ERC weights coincide with inverse volatility. With correlation, they do not. State the marginal-contribution condition. For two assets, derive the weights in the diagonal case (you already have them) and give a numerical off-diagonal case: $\sigma_1 = \sigma_2 = 0.1$, correlation $0.5$, and show equal weights are then the ERC solution by symmetry — then break symmetry with $\sigma_2 = 0.2$ and compute. W19: multi-asset ERC, CAGR +3.28%, Sharpe 0.16, max DD −35.6%. W20: sector ERC with a 25% cap, CAGR +8.21%, Sharpe 0.45, max DD −47.9%, win rate 82%, profit factor 11.14. The cap binds; the profit factor is not portable. Say both. Widget: `contour` or `plot`. Link drift chapter. Cite Maillard, Roncalli and Teïletche 2010 and Qian 2005.

### portfolio/drift-turnover-and-breakers
Drift of a weight when prices move and you do not trade. A band: trade only if $\abs{w^{\text{current}} - w^{\star}} > b$. Turnover budget: $\sum \abs{\Delta w_i} \le \tau$. A tracking-error gate needs a benchmark and a covariance; define the object even if you only compute a one-asset case. Circuit breaker: if drawdown exceeds $d$, set weights to cash for a cooldown. W02: month-end plus a 5% band, CAGR +4.66%, Sharpe 0.31, max DD −19.4%. W10: flatten on a 15% drawdown, CAGR +0.70%, Sharpe −0.45, max DD −10.6%. The breaker did what it was specified to do (a shallower reported drawdown) and the reported Sharpe is negative. W11: tracking-error trigger and turnover budget, CAGR +7.07%, Sharpe 0.44. W12: 10% drift band on a momentum tilt, CAGR +5.15%. Examples: a weight drifting from 0.40 to 0.47 (no trade if $b = 0.10$); a path that hits a 15% drawdown and goes to cash, versus the same path without the breaker. Compute both terminal wealths. Widget: `sequence`. Link long-only chapter.

### portfolio/long-only-and-neutral
Long-only: $w_i \ge 0$, $\sum w_i = 1$ (or $\le 1$ if cash is allowed; say which). Dollar neutral: $\sum w_i = 0$, and a gross budget $\sum \abs{w_i} = g$. Beta neutral: $\sum w_i \beta_i = 0$ given betas. Example: betas $1.2$ and $0.8$, find dollar-neutral and beta-neutral pairs with gross 1. Solve the 2 by 2 system with Python. Widget: `rowreduce` if it fits, otherwise `plot`. Link `[[asset-classes/market-neutral-books]]`.

## Course: orders

Every order is a function from a future path to a fill, a cancel, or a miss. Illustrative prices only.

### orders/market-and-limit-orders
Market: take the liquidity that is there; a daily-bar model must state the fill price (next open, or close, or close plus slippage). Limit: fill only if the path touches the limit, and state the optimistic assumption (fill at the limit if the bar's range contains it) and why it is optimistic. O03: passive buy-limit on weak RSI, reported win rate 100%, profit factor infinite, CAGR +2.70%, max DD −19.09%. O04: 1% pullback limit in an uptrend, CAGR +1.82%, Sharpe −0.04, max DD −6.85%, win rate 48.2%. Examples: a bar with low 99 and close 101, a buy limit at 100 fills under the optimistic rule; a buy limit at 98 does not. Widget: `plot` of a bar range. Warning: 100% wins. Link stops. History: Glosten and Milgrom 1985 in a short form.

### orders/stops-and-stop-limits
Stop: becomes a market order when touched. Stop-limit: becomes a limit, which may not fill. Gap: the next price is through the stop, so a market stop fills worse than the stop price. O05 buy-stop breakout, O06 5% protective stop (reported Sharpe 0.00, CAGR +1.90%, max DD −16.2%), O07 stop-limit breakout (Sharpe −0.05, max DD −6.4%), O08 stop-limit protection (Sharpe 0.02, CAGR +1.99%). Examples: stop at 95, next bar opens at 90, fill at 90 under a gap convention you state. A stop-limit that does not fill. Widget: `plot`. Link brackets.

### orders/trailing-brackets-and-oco
Trailing stop: the stop ratchets with a favourable extreme and freezes otherwise. Work a 4% trail on a path you specify (O09's distance) and show the exit price. Bracket: a profit limit and a protective stop; OCO between them after entry. O12: +6% / −3% around a trend entry, reported CAGR +1.04%, Sharpe −0.38, max DD −6.8%. O13: +4% / −2% on an RSI entry, CAGR +0.33%, Sharpe −0.43. O14: competing buy-limit and buy-stop, CAGR +1.51%, Sharpe −0.08. O09, O11: trailing variants, Sharpes −0.33 and −0.38. The cluster of negative reported Sharpes is the lesson: the exit geometry dominates the story. Examples: one bracket path that hits the profit, one that hits the stop, one OCO where the stop entry cancels the limit. Widget: `plot`. Link lots.

### orders/lots-contracts-and-intraday
FX lot: define a standard lot as 100,000 units of base and compute the dollar P&L of a USD-quoted pair for a 0.0050 move (500 dollars per standard lot if the quote is the dollar — state the quoting convention). Futures: P&L $=$ contracts $\times$ multiplier $\times$ $\Delta F$. O19 and O20 are the library's whole-lot and whole-contract cases; quote O20's CAGR +4.67%, Sharpe 0.30, 7 years, and leave the roll discussion to asset-classes. O15: 4 weeks, 5-minute, return +1.1%, max DD −1.3%, other ratios unreported. O16: 8 weeks, 30-minute, return −13.9%, max DD −14.8%. These samples cannot support a CAGR; the library does not report one. Examples: round a target of 1.6 contracts to 1 or 2 under a stated rule. Widget: `sequence`. Link slippage.

### orders/fills-slippage-and-spread
Half-spread plus slippage. A linear model: cost $= c \times \text{notional traded}$. Adverse selection: the optimistic limit fill happens more often when price is about to go through the order. Tie back to O03 without repeating the whole order-type chapter. Almgren and Chriss 2001 as the impact-versus-waiting trade-off, stated not derived in full. Examples: buy at mid 100, half-spread 0.01, one-way cost 1 cent, a round trip's cost; then a strategy that trades twice a day. Widget: `plot` of net CAGR against turnover for a fixed gross edge you invent (label it invented). Link `[[backtesting/timing-costs-and-biases]]`.

## Course: backtesting

### backtesting/the-backtest-as-an-experiment
Write the pipeline: data, features, signals, weights or orders, fills, positions, NAV, metrics. Reproducibility: seed, data version, code version. A backtest is not a broker. Examples: two protocols that differ by one sentence (fill at next open versus fill at same close) and how that one sentence changes Path A's P&L if the signal is the sign of the previous return. Compute both. Widget: `plot`. Link weights versus orders. History: Bailey, Borwein, López de Prado and Zhu 2014.

### backtesting/weights-versus-orders
Weight mode: target fractions, fractional holdings allowed or not (state it), rebalance policy. Order mode: messages, partial fills, cash. O01 versus W01 is the comparison, already quoted in markets and trend: put the two reported rows in one place and list the protocol differences (window 20/50 versus 50/200, orders versus weights, 25 versus 26 years, one cross versus a sector book). You cannot attribute the CAGR gap to a single cause. Say that. Examples: a target weight of 0.5 achieved by a market order, versus not achieved because a limit is missed. Widget: `regression` or `plot`. Link timing.

### backtesting/timing-costs-and-biases
Legal clock $s_t R_{t+1}$. Look-ahead list. Survivorship. Omitted costs. Example: Path A, signal $=$ sign of same-bar return (illegal) versus sign of previous return (legal). Compute both compound returns; the illegal one will look better. Then subtract a cost. Widget: `hypothesis`. Link intraday. This is the chapter that should make a student angry at a same-bar backtest.

### backtesting/intraday-samples
W08: 6 days, 1-minute, return −0.2%, max DD −0.2%, no Sharpe reported. W07: 3 weeks, +2.6%, max DD −1.1%. W09: 9 weeks, +1.5%, max DD −3.5%. O15 and O16 as above. Proposition: a CAGR needs a horizon of years; the library correctly leaves CAGR blank. What these pages can teach: the shape of a rule on a fine bar. What they cannot teach: an edge. Examples: how many independent days are in 6 days (answer: 6, or fewer if you care about a parameter search). Widget: `lln`. Link reading published tests.

### backtesting/reading-published-tests
A checklist: sample length, clock, costs, universe, number of configurations, what a win is, whether the page itself calls the result a diagnostic. Apply it to WF01's own caveat (48 folds, slice diagnostics, not independent out-of-sample evidence) and to W18's impressive CAGR with a −41.2% drawdown. Examples: fill the checklist for O03 and for W10 in a table in prose. Widget: `confidence`. Link `[[validation/walk-forward]]`.

## Course: asset-classes

Do not recommend an asset class. Specialise definitions that earlier courses left generic.

### asset-classes/equity-etf-books
An ETF price already includes the basket, the published fee drag to the extent the market prices it, and corporate actions inside the fund. A backtest on SPY is not a backtest on a stock-picking rule. Long-only constraint. Examples: a 0.10% annual fee dragged from a 5% gross CAGR — compute the net. One library sentence: most long equity examples are ETF studies; point at W01 without repeating it. Widget: `sequence` comparing two compound rates. Link multi-asset.

### asset-classes/multi-asset-books
Universe plus fallback. W06 again, briefly, as a multi-asset defensive switch: risk-on list versus defensive list. W02 as a multi-asset trend with a drift band. Define what changes when the fallback earns a non-zero return (a bond ETF is not cash). Example: binary filter, fallback return 0.01 per year held in the years the filter is off; compute. Do not name a real bond fund as a suggestion. Widget: `plot`. Link FX.

### asset-classes/foreign-exchange
USD-quoted spot: a rise is a rise in the dollar value of one unit of the other currency. Lot sizing from the orders course, used here on a momentum weight. W23, W24, O19 with their negative reported results. Meese and Rogoff 1983: the random-walk benchmark a FX forecast has to beat. Examples: a pair from 1.1000 to 1.1050, simple return, dollar P&L of one standard lot. Inverse-vol on two pairs. Widget: `plot`. Link futures. Do not tell the reader to trade currencies.

### asset-classes/futures
Multiplier, margin as a collateral convention (define initial margin as collateral, not as the P&L), roll: difference adjustment versus ratio adjustment, and the fact that a continuous vendor series is not a held contract. O20: whole contracts, Donchian, ATR sizing, 7 years, CAGR +4.67%, Sharpe 0.30, max DD −16.7%, profit factor 1.34. W25: diversified long/short trend on a continuous series, 7 years, CAGR +5.88%, Sharpe 0.62, max DD −9.7%, win rate 50%, profit factor 5.85. Short window. Profit factor with a 50% win rate means winners larger than losers; it does not mean seven years is a long sample. Examples: 2 contracts, multiplier 50, futures from 4000 to 4010, P&L $= 1000$. A roll gap of 5 points that a continuous series removes and a real roll would have. Widget: `plot`. Link market-neutral.

### asset-classes/market-neutral-books
Bring W13, W14, W15, W16 together as books with a short leg. Dollar neutral versus beta neutral, computed on a small example (you may reuse the portfolio chapter's numbers and extend them). Borrow: a short has a fee; if the library page does not report one, say the reported result may omit it. Capacity: the library pages do not answer how large a book could have been. Example: add a borrow fee of 0.5% a year on the short leg and recompute a toy return. Widget: `rowreduce` or `regression`. Link `[[research-craft/writing-a-specification]]`.

## Course: validation

The library's own sentence — "slice diagnostics, not independent out-of-sample evidence" — is part of the definition, not a footnote.

### validation/walk-forward
Rolling: train length $L$, test length $H$, step $H$ or smaller. Expanding: train is everything before the test, after a purge. WF01: 48 rolling folds, 26 years, pre-OOS purge. WF02: 48 expanding folds. Draw one timeline with three folds and mark what is known at the start of each test window. Example: a series of 20 dates, $L = 10$, $H = 5$, list the index ranges of two successive rolling folds. Widget: `sequence` or `plot`. Warning: 48 folds on one history are dependent. Link purge chapter.

### validation/purging-and-embargo
A label that uses the next 5 days overlaps the boundary. Purge: drop training observations whose labels intersect the test window. Embargo: drop a further gap because of serial dependence. WF03: anchored walk-forward with fixed and percentage-based exclusions, 48 folds, the same diagnostic caveat. Example: train indices $0..99$, test $100..119$, label horizon 5, so training labels that touch the test are those with decision times $95..99$. List them. A 2% embargo on 100 training days drops 2 further days; compute which. Widget: `plot` of a timeline if you can do it with `plot` vlines, otherwise `sequence` and explain in the caption. Link search.

### validation/parameter-search
WF04: the grid $\{20,50,80\}\times\{100,150,200\}$ is 9 backtests, scored by Sharpe. The maximum of 9 Sharpes is a selected statistic. WF05: 30 Optuna TPE trials on integer windows with fast < slow, then a walk-forward on the winner. The walk-forward is a later test of a frozen choice; the 30 trials are not 30 confirmations. Bergstra and Bengio 2012: random search as a baseline. Akiba and colleagues 2019: the sampler, not a trading result. Example: nine invented in-sample Sharpes, report the max, then the mean, and the gap. Compute. Widget: `hypothesis` with a note about repeated looks. Link deflated Sharpe.

### validation/the-deflated-sharpe
Follow Bailey and López de Prado 2014 at the level of a stated formula, not a fake derivation of their expected-maximum term. A usable version for the lesson: the Sharpe ratio of the best of $N$ independent true-null trials has an expected maximum that grows like $\sqrt{2\ln N}$ in the standardised unit, under a normal approximation. State this as an approximation with its assumptions (i.i.d. normal trials, true null, independence — which financial trials do not have). Example: $N = 9$ and $N = 30$, compute $\sqrt{2\ln N}$. For $N = 9$, $\sqrt{2\ln 9} = \sqrt{2\ln 9}$. Calculate it (about $2.095$). Explain that a reported in-sample Sharpe must clear a hurdle that rises with $N$, and that the published deflated Sharpe also adjusts for sample length and skewness; point at the paper for the full expression rather than mis-stating it. If you write the full deflated-Sharpe formula, check it against the paper's statement and include every term you use. Widget: `confidence`. Link the last chapter.

### validation/what-a-fold-does-not-prove
Dependent folds share regimes. One asset class. A passed walk-forward is still one historical path. It is not a decision to trade. Example: two folds whose test windows both sit inside one bull market; agreeing with each other is not two experiments. WF01's 48 folds, restated. Widget: `markov` to show persistence of a regime across a fold boundary. Link `[[research-craft/writing-a-specification]]`.

## Course: research-craft

### research-craft/writing-a-specification
The fields: universe and point-in-time rule, decision clock, signal formula with every window, map to weights or the order types, rebalance policy, cost model, benchmark, the exact statistic, the search that was run, the software version. Write one complete specification for a toy SMA rule on Path A's asset, fictional, called "Example Book A", obviously not a product. Show a second specification that looks similar but changes the clock, and say they are different experiments. Widget: `plot`. Link comparing implementations. No broker, no API keys, no deployment steps.

### research-craft/comparing-implementations
The method: a table of protocol rows beside a table of reported metrics, and a paragraph that refuses to declare a cause for the gap. Main case: O01 against W01, using only LIBRARY.md figures. Second case: O02 against W03 (same RSI thresholds, orders versus weekly weights). Third, shorter: WF04's winning cell is not a peer of WF01's folds. Widget: `regression` is optional; a `plot` of two compound CAGRs is enough if the caption says they are smooth illustrations of reported CAGRs. Link monitoring.

### research-craft/paper-records-and-monitoring
A paper record is a hypothetical NAV computed after the specification is frozen, on data that arrive later, with no order sent to a market. It can detect a broken data feed, a changed corporate-action rule, or a signal that does not match the specification. It cannot detect the future. It is not a track record in the GIPS sense; mention GIPS 1999 only as the instinct that a record needs a written method. Examples: a frozen rule on a new five-day path you invent, and a bug that uses the wrong window. Widget: `sequence`. Link combination. Do not describe how to connect to a broker.

### research-craft/combination-and-decay
Strategy P&Ls have a covariance. Equal-weighting two strategy books whose correlation is $0.2$ is not the same as equal-weighting two assets. Compute a toy variance: two strategy returns with $\sigma = 0.10$, correlation $0.2$ versus $0.9$. Crowding: a hypothesis that a published pattern shrinks as more capital runs it. Observable signs (rising correlation with peers, falling net returns after costs) are not a trading signal. Stopping is allowed. W18 and W01 as two books one might be tempted to blend; do the algebra on toy numbers, and if you mention both library CAGRs, do not add them. Widget: `plot` or `contour`. Link the boundary.

### research-craft/the-boundary
This chapter is the line. List, concretely, what the atlas will not do: recommend a security, a weight, a broker, a leverage, a live order, or a claim that a quants.md curve will recur. Explain mechanisms, including orders, so that a reader can recognise them. Jurisdiction-specific regulation is not taught as legal advice. Re-read Bailey, Borwein, López de Prado and Zhu 2014 as the public warning against impressive in-sample curves. Examples may be negative examples: rewrite three sentences from "you should buy the dip with a limit" into descriptions of what a limit order does, and say why the first form is outside the atlas. Widget: `hypothesis`, caption about how easily a search rejects a true null. The summary should be usable as a code of conduct for the whole atlas. Link back to `[[markets/systematic-question]]`.
