A moving average is a smoother with a clock. It does not discover a trend hiding in a price. It replaces a window of closes by one number, and a second window by another number, and a cross compares the two. That comparison is a time-series sign in the sense of [[trend/the-trend-hypothesis]]: a feature known at $t$, offered as a hypothesis about returns after $t$. The feature is no longer the sign of a raw return. Writing the windows down is what makes the hypothesis a rule rather than a mood.

The numerical path is again Path A,

$$
P = (100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110)
$$

at sessions $t = 0,\ldots,7$, invented closes, unadjusted because the series never split and never paid a dividend. Simple returns are those of the previous chapter. Two library experiments and a third, all built from moving averages and all different, occupy the middle of the chapter. Their reported summaries are not forecasts, not advice, and not one result.

## Two averages

:::definition Simple moving average {#def-sma}
For an integer window $n \ge 1$ and a date $t \ge n - 1$, the **simple moving average** of the close is

$$
\mathrm{SMA}_n(t) = \frac{1}{n}\sum_{i=0}^{n-1} P_{t-i}.
$$

It is undefined when fewer than $n$ closes exist. The weights are equal and sum to $1$, so the average of a constant price is that constant. The date of the average is the date of the newest close inside it. The older $n - 1$ closes are still inside the sum, which is why a turn in $P_t$ moves the average by only $1/n$ of that turn.
:::

:::definition Exponential moving average {#def-ema}
Fix a decay $\lambda$ with $0 < \lambda \le 1$, and a seed $E_{t_0}$ equal to a stated close. The **exponential moving average** then obeys

$$
E_t = \lambda P_t + (1 - \lambda)\, E_{t-1}, \qquad t > t_0.
$$

A common translation from a span $n$ is $\lambda = 2/(n+1)$. That translation is a convention, not a theorem, and a chapter that uses it has to say so. Until the seed is stated, $E_t$ is not a number.
:::

Unrolling the recursion gives a finite discounted sum, which is the form to check by hand.

:::proposition Discounted weights of a seeded EMA {#prop-ema}
Assume $E_0 = P_0$ and $0 < \lambda \le 1$. Then for every $t \ge 0$,

$$
E_t = \lambda\sum_{k=0}^{t-1} (1-\lambda)^k P_{t-k} + (1-\lambda)^t P_0,
$$

where the sum is empty at $t = 0$. The coefficients are non-negative and sum to $1$.
:::

:::proof
At $t = 0$ the display is $E_0 = P_0$. Suppose the formula holds at $t - 1$ for some $t \ge 1$. The recursion gives

$$
E_t = \lambda P_t + (1-\lambda)\Biggl(\lambda\sum_{k=0}^{t-2}(1-\lambda)^k P_{t-1-k} + (1-\lambda)^{t-1} P_0\Biggr).
$$

Re-index the sum by $j = k + 1$. Then $(1-\lambda)$ times the sum is $\lambda\sum_{j=1}^{t-1}(1-\lambda)^j P_{t-j}$, and $(1-\lambda)\cdot(1-\lambda)^{t-1} P_0 = (1-\lambda)^t P_0$. Adding $\lambda P_t$ produces the formula at $t$.

The coefficients sum to $\lambda\sum_{k=0}^{t-1}(1-\lambda)^k + (1-\lambda)^t$. The geometric sum equals $\bigl(1 - (1-\lambda)^t\bigr)/\lambda$ when $\lambda < 1$, so the total is $1 - (1-\lambda)^t + (1-\lambda)^t = 1$. If $\lambda = 1$, then $E_t = P_t$ and the only surviving coefficient is $1$.
:::

The infinite-history picture, weights $\lambda(1-\lambda)^k$ for $k = 0, 1, 2, \ldots$, is the limit of this formula as the seed recedes, and only when $\lvert 1 - \lambda\rvert < 1$. On eight closes the seed is not remote. [[#ex-ema]] uses the finite form.

:::definition Cross rule {#def-cross}
Choose a fast window and a slow window, or a fast decay and a slow decay, with the fast average the one that puts more weight on the newest close. The **cross signal** at dates where both averages exist is

$$
c_t = \begin{cases} +1 & \text{if the fast average is strictly above the slow average},\\ 0 & \text{otherwise.} \end{cases}
$$

Before the slow average exists, this chapter sets $c_t = 0$. The legal holding is the one in [[trend/the-trend-hypothesis]]: $c_t$ may use closes through $t$ and multiplies $R_{t+1}$, not $R_t$. "Long when fast is above slow" is this $c_t$. It is a long/flat rule, not a long/short rule, unless a specification says otherwise. A cross of averages is not by itself an order and not by itself a weight.
:::

:::algorithm Positions from an SMA cross {#alg-cross}
1. Fix $n_{\mathrm{fast}} < n_{\mathrm{slow}}$ and the close series.
2. At each $t$, if $t < n_{\mathrm{slow}} - 1$, set $c_t = 0$.
3. Otherwise compute $\mathrm{SMA}_{n_{\mathrm{fast}}}(t)$ and $\mathrm{SMA}_{n_{\mathrm{slow}}}(t)$ from [[#def-sma]]. Set $c_t = 1$ if the fast value is strictly greater, and $c_t = 0$ otherwise.
4. The profit earned over the next session is $c_t R_{t+1}$. If $t$ is the last session, record $c_t$ and do not invent a further return.
5. Turnover, for later use, is $\sum_t \lvert c_t - c_{t-1}\rvert$ with $c_{-1} = 0$. Count a change once, when it happens. Do not add a sale at the sample's end unless the specification says the book is flattened.
:::

Equal weights are easy to audit and slow to wake up: the newest close has weight $1/n$, the same as the oldest close in the window. The EMA puts weight $\lambda$ on the newest close and lets the rest decay. Neither weight is "correct". They are different features, and a backtest that swaps them is a different experiment.

## Path A, window by window

The brief for this path records $\mathrm{SMA}_3$ from the third close onward as $101$, $102.3333$, $102.6667$, $104.6667$, $105.3333$, $107.6667$. The next example derives those figures and then places $\mathrm{SMA}_5$ beside them.

:::example SMA(3) on Path A {#ex-sma3}
Compute $\mathrm{SMA}_3(t)$ for $t = 2,\ldots,7$. Give the exact fraction and the value rounded to four decimals, half away from a trailing infinite $6$ where that arises.
:::solution
The windows and the sums are:

| $t$ | closes in the window | sum | $\mathrm{SMA}_3(t)$ | four decimals |
|---|---|---|---|---|
| $2$ | $100, 102, 101$ | $303$ | $101$ | $101.0000$ |
| $3$ | $102, 101, 104$ | $307$ | $307/3$ | $102.3333$ |
| $4$ | $101, 104, 103$ | $308$ | $308/3$ | $102.6667$ |
| $5$ | $104, 103, 107$ | $314$ | $314/3$ | $104.6667$ |
| $6$ | $103, 107, 106$ | $316$ | $316/3$ | $105.3333$ |
| $7$ | $107, 106, 110$ | $323$ | $323/3$ | $107.6667$ |

$307/3 = 102.3\overline{3}$ rounds to $102.3333$. $308/3 = 102.6\overline{6}$ rounds to $102.6667$. The same rule fixes the other two recurring thirds. These are the six values fixed for Path A. At $t = 2$ the average equals the close, because $(100+102+101)/3 = 101$. Equality will matter when a later chapter uses a strict inequality against the average.
:::
:::

:::example Where SMA(3) sits above SMA(5) {#ex-cross-dates}
Compute $\mathrm{SMA}_5(t)$ on Path A for every $t$ where it exists, and list the dates at which the fast average is strictly above the slow average.
:::solution
Five closes exist from $t = 4$.

| $t$ | sum of $P_{t-4},\ldots,P_t$ | $\mathrm{SMA}_5(t)$ | $\mathrm{SMA}_3(t)$ | fast above slow? |
|---|---|---|---|---|
| $4$ | $510$ | $102$ | $308/3 \approx 102.6667$ | yes, gap $2/3$ |
| $5$ | $517$ | $103.4$ | $314/3 \approx 104.6667$ | yes, gap $19/15$ |
| $6$ | $521$ | $104.2$ | $316/3 \approx 105.3333$ | yes, gap $17/15$ |
| $7$ | $530$ | $106$ | $323/3 \approx 107.6667$ | yes, gap $5/3$ |

The fast average is strictly above the slow average at $t = 4, 5, 6, 7$, and at no earlier date, because the slow average does not exist earlier. There is no date in the overlap where the inequality flips back. On this path the cross does not change its mind. That is a fact about eight closes. It is not a property of moving averages in general, and the whipsaw chapter needs a second path before a flip can be counted.
:::
:::

Apply [[#alg-cross]] with windows $3$ and $5$. Then $c_t = 0$ for $t = 0, 1, 2, 3$ and $c_t = 1$ for $t = 4, 5, 6, 7$. The position changes once, from flat to long, at $t = 4$. It does not change again. With $c_{-1} = 0$ and no terminal liquidation, turnover is $1$. The sessions whose returns are actually earned are those with a next return and $c_t = 1$, namely $t = 4, 5, 6$, earning $R_5$, $R_6$ and $R_7$. The long signal at $t = 7$ is real and unpaid inside the sample. [[trend/lag-whipsaw-and-costs]] prices the single change; the gross compound return is computed now so that the cost has a base.

:::example Gross compound return of the 3-versus-5 cross {#ex-cross-gross}
Using the positions just obtained, compute the compound return of $c_t R_{t+1}$ on Path A with cash at return $0$.
:::solution
Only $R_5$, $R_6$ and $R_7$ are taken. Their gross factors are $107/103$, $106/107$ and $110/106$. The product collapses to $110/103$. The compound return is

$$
\frac{110}{103} - 1 = \frac{7}{103} = 0.067961
$$

to six decimals. The three returns are not all positive: $R_6 = -1/107$. The product is positive because the move from $103$ to $110$ dominates that one down session. Buy-and-hold from the first close to the last compounds to $0.10$, which is a different set of sessions. Comparing $7/103$ with $0.10$ without saying which sessions were held is not a comparison.
:::
:::

:::example An EMA with decay one half {#ex-ema}
Seed $E_0 = P_0 = 100$ and set $\lambda = 1/2$. Compute $E_t$ on Path A through $t = 7$. Then, separately, take one step of a slower average with $\lambda = 1/3$ from the same seed, and say whether "fast above slow" holds at $t = 1$.
:::solution
With $\lambda = 1/2$ the recursion is the average of the new close and the previous EMA. The values are exactly

$$
100,\ 101,\ 101,\ \frac{205}{2},\ \frac{411}{4},\ \frac{839}{8},\ \frac{1687}{16},\ \frac{3447}{32},
$$

that is $100$, $101$, $101$, $102.5$, $102.75$, $104.875$, $105.4375$, $107.71875$. The step into $t = 5$ is the one to check by hand: the previous value is $411/4 = 102.75$, the close is $107$, and

$$
\tfrac12\cdot 107 + \tfrac12\cdot 102.75 = 53.5 + 51.375 = 104.875.
$$

[[#prop-ema]] says these eight numbers are weighted averages of the closes seen so far, not an infinite tail.

The slower recursion $F_t = \tfrac13 P_t + \tfrac23 F_{t-1}$, with $F_0 = 100$, has $F_1 = \tfrac13\cdot 102 + \tfrac23\cdot 100 = 302/3 \approx 100.666667$. The fast value at $t = 1$ is $101 > 302/3$, so a cross that is long when the $\lambda = 1/2$ average is above the $\lambda = 1/3$ average is long at $t = 1$. Continuing the slow recursion in exact arithmetic keeps the fast average above the slow one at every $t = 1,\ldots,7$. As with the SMA cross, this particular pair does not flip on Path A. A later MACD example will flip, because it differences two averages and then smooths the difference. The level of an average and the sign of a difference are different features.
:::
:::

The figure uses one invented wavy path, not Path A. Path A’s short rising list does not produce a cross for the windows in the worked example, so it is a poor picture of a cross. Lengthen either window and the average responds more slowly. The shading is the set of dates on which the fast average is strictly above the slow one. That is a description of this path.

:::widget average
fast: 5
slow: 20
kind: sma
caption: Change the two windows, or switch from a simple average to the span convention λ = 2/(n+1). Shading marks dates where the fast average is above the slow one. The path is a sine plus a drift, invented for the picture. It is not a forecast. The chapter’s worked EMA sets λ directly and does not use 2/(n+1).
:::
:::widget plot
f: 100+8*sin(x); 100+8*(2/3)*sin(1.5)*sin(x-1.5)
x: 0, 16
labels: sine; trailing three-unit mean
caption: The second curve averages the sine over the previous three units of x. Its crests come after the sine's crests. The pair is a shape, not a price forecast.
:::

On a straight line the lag is exact rather than visual. If $P_t = a + bt$, then [[#def-sma]] equals the line evaluated $(n-1)/2$ sessions before $t$. The identity is proved in [[trend/lag-whipsaw-and-costs]], where lag is the point. Used here, it only warns that "fast above slow" on a rising straight line is a statement about two delays, not about a new piece of news.

:::intuition The cross is a sign with the roughness averaged out
[[trend/the-trend-hypothesis]] took $\sgn(R_t)$, which on Path A alternates and loses. An average does not alternate just because the close does. $\mathrm{SMA}_3$ on Path A rises from $101$ to $107.\overline{6}$ with a single flat comparison against the close at the first date, and $\mathrm{SMA}_3$ stays above $\mathrm{SMA}_5$ once both exist. Smoothing can turn an alternating close into a one-sided signal. That is a change of feature. It is not evidence that the smoothed signal will earn the next return out of sample.
:::

## Three library rows, not one backtest

The open library, read in 2026, contains several moving-average experiments. Three of them are the ones this chapter is allowed to discuss in any detail. Each figure below is as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtests, has not verified the annualisation convention inside the reported Sharpe, and does not treat the rows as advice or as forecasts.

**O01, Market SMA Cross.** The one-line rule is: buy when $\mathrm{SMA}(20)$ crosses above $\mathrm{SMA}(50)$; sell on the reverse; market orders; equity ETFs; trend. Daily bars, span 25 years. Reported total return $+126.66\%$, CAGR $+3.33\%$, reported Sharpe $0.21$, max drawdown $-16.35\%$, win rate $51.9\%$, profit factor $2.18$.

**W01, Daily SMA Trend.** The catalogue rule keeps a long weight in each sector ETF while $\mathrm{SMA}(50) > \mathrm{SMA}(200)$, and it rebalances daily. Daily bars, span 26 years. Reported total return $+537\%$, CAGR $+7.38\%$, reported Sharpe $0.45$, max drawdown $-34.7\%$, win rate $72.6\%$, profit factor $2.48$.

**O18, Signal Change Rotation Orders.** Trade only on SMA trend-signal flips, with no calendar. Daily bars, span 25 years. The one-line rule does not restate the window lengths, so this chapter does not invent them. Reported total return $+130\%$, CAGR $+3.38\%$, reported Sharpe $0.22$, max drawdown $-16.3\%$, win rate $52.4\%$, profit factor $2.21$.

Put the three CAGRs in a sentence and they look like a ranking: $+7.38\%$, $+3.38\%$, $+3.33\%$. The ranking is not a result about moving averages. The rows differ in ways that change the experiment.

- The feature differs. O01 compares windows $20$ and $50$ and acts on a cross. W01 compares windows $50$ and $200$ and acts while the inequality holds, which is the level rule [[#def-cross]], not merely the session of a crossing. O18 says "SMA trend-signal" and does not, in the catalogue line, publish the same pair of windows.
- The object differs. O01 submits market orders. W01 sets target weights and rebalances them every day. O18 submits orders only when the signal flips. A weight is not an order. [[backtesting/weights-versus-orders]] separates the two engines; [[portfolio/from-signal-to-weight]] is where a signal becomes a weight. This chapter only needs the consequence: the same adjective "trend" sits on three different maps from feature to position.
- The clock differs. A cross is an event. A daily rebalance is a calendar, and it can trade because weights have drifted even when the signal has not changed. A flip-only rule refuses that calendar. On Path A the 3-versus-5 signal changes once, so an event rule and a daily 0-or-1 weight happen to trade on the same session. That coincidence is the single-name 0-or-1 case. It is not W01, which holds a list of sector ETFs and rebalances daily.
- The sample differs. Twenty-five years and twenty-six years are not the same window. One cannot subtract O01's CAGR from W01's and call the difference the value of daily weights.
- The reported drawdowns do not line up with a simple moral. W01's reported CAGR is the largest of the three and its reported max drawdown, $-34.7\%$, is the deepest. O01 and O18 report drawdowns near $-16\%$ with CAGRs near $+3.3\%$. Depth of drawdown is part of the reported summary. It is not a price one is required to pay, and it is not a reason to prefer the row with the milder number. The paths are different experiments.
- The win rates and profit factors are catalogue fields. This atlas has not re-defined what those backtests counted as a win. A profit factor of $2.48$ beside a win rate of $72.6\%$ is not comparable, without that definition, to a profit factor of $2.18$ beside $51.9\%$. [[performance/win-rate-and-profit-factor]] is the place where the ratio is defined for a stated unit.

:::warning There is no "the" moving-average backtest
O01, W01 and O18 are three specifications. Quoting one Sharpe as what "moving averages do" throws away the window, the order-or-weight choice, the rebalance clock and the sample. The reported Sharpes $0.21$, $0.45$ and $0.22$ are the library's numbers under a convention this atlas has not verified. They are not Path A's mean divided by Path A's standard deviation, and they are not annualisations one may recompute from the CAGRs.
:::

:::application Reading the three rows as implementations
Take one column and ask what had to be true for the cell to exist. The CAGR cell required a start value, an end value and a span in years. The Sharpe cell required a series of excess returns and a division by a dispersion, under a convention not stated in the one-line rule. The max-drawdown cell required a path of wealth, not just a terminal wealth. Two rules can share a terminal CAGR and differ in the drawdown cell, or share a drawdown and differ in the clock. [[research-craft/comparing-implementations]] puts O01 beside W01 as a worked comparison of implementations. The point to carry from this chapter is narrower: if the specification does not name the windows, the object (weight or order) and the clock, there is nothing to compare.
:::

:::quiz
On Path A, at which sessions is $\mathrm{SMA}_3(t) > \mathrm{SMA}_5(t)$?
- [ ] At no session, because the price is not monotone
- [ ] At $t = 2$ and $t = 3$ only
- [x] At $t = 4, 5, 6, 7$, and the slow average is undefined before that
- [ ] At every session from $t = 2$ onward
:::solution
$\mathrm{SMA}_5$ exists only from $t = 4$. [[#ex-cross-dates]] shows the fast average above the slow one at each of those four dates. Before $t = 4$ the cross in [[#def-cross]] is defined to be flat, not long.
:::
:::

:::quiz
Which change would make O01 and W01 the same experiment?
- [ ] Replacing W01's reported Sharpe $0.45$ by O01's reported Sharpe $0.21$
- [x] None of the edits that touch only the reported summary. The rules differ in windows, in weights versus market orders, in daily rebalance versus a cross, and in the stated universe and span
- [ ] Rounding both CAGRs to the nearest percent
- [ ] Calling both of them "SMA trend"
:::solution
The reported numbers are outputs. Editing an output does not make the specifications match. The catalogue lines already differ in window, engine, clock, universe and span. A shared nickname is not a shared experiment.
:::
:::

:::remark What Path A is allowed to say about these rows
The 3-versus-5 cross on Path A is long on four dates, earns three sessions, and compounds to $7/103$. That calculation checks [[#alg-cross]]. It does not approximate O01's windows of $20$ and $50$, which do not fit on eight closes, and it does not approximate W01's daily rebalance of a sector list. If a toy and a 25-year row disagreed, the toy would not refute the row. If they agreed, the toy would not confirm it. The library rows stand as reported summaries of someone else's experiments. The toy stands as arithmetic you can recompute.
:::

:::history Tested rules, not a nickname
In 1992 Brock, Lakonishok and LeBaron tested moving-average rules and trading-range rules on the Dow Jones index and found historically positive results. The course record notes that later work argued about costs, data mining and whether the result survived. The useful inheritance is the form of the test: a window, a cross or a range, and a stated market. "Follow the moving average" is not that form. O01, W01 and O18 are closer to it, and they are still three forms rather than one.
:::

## Where this leads

A channel high and a MACD difference are the next two features that get offered as the same kind of sign. [[trend/breakouts-and-macd]] defines them and quotes a different pair of library rows. The single position change counted in [[#alg-cross]] is the turnover [[trend/lag-whipsaw-and-costs]] will price at a one-way cost of $0.001$. How a weight differs from the market orders in O01 is [[backtesting/weights-versus-orders]], and the side-by-side reading of implementations is [[research-craft/comparing-implementations]].

:::summary
- $\mathrm{SMA}_n(t)$ is the equal-weight mean of $n$ closes ending at $t$. An EMA is the recursion $E_t = \lambda P_t + (1-\lambda)E_{t-1}$ with a stated seed, and it unrolls into discounted weights that sum to $1$.
- A cross is long when the fast average is strictly above the slow average, and flat before the slow average exists. The legal profit is $c_t R_{t+1}$.
- On Path A, $\mathrm{SMA}_3$ matches the six recorded values, and it sits strictly above $\mathrm{SMA}_5$ at $t = 4, 5, 6, 7$ only. The position changes once. The gross compound return is $7/103 = 0.067961$.
- O01, W01 and O18 report CAGRs $+3.33\%$, $+7.38\%$ and $+3.38\%$, Sharpes $0.21$, $0.45$ and $0.22$, and max drawdowns $-16.35\%$, $-34.7\%$ and $-16.3\%$, as catalogue figures this atlas has not re-run.
- Those three rows differ in windows, in orders versus weights, in clock and in sample. There is no single moving-average backtest to quote.
:::

## Exercises

:::exercise One SMA(3) value {level=1 check="102.3333"}
On Path A, enter $\mathrm{SMA}_3$ at the session whose close is $104$, rounded to four decimals.
:::solution
The close $104$ is at $t = 3$. The window is $102, 101, 104$, the sum is $307$, and $307/3 = 102.3333$ to four decimals.
:::
:::

:::exercise How many dates is the fast average above? {level=1 check="4"}
On Path A, at how many sessions is $\mathrm{SMA}_3(t) > \mathrm{SMA}_5(t)$? Enter an integer.
:::solution
Both averages exist at $t = 4, 5, 6, 7$, and [[#ex-cross-dates]] shows the inequality at each of them. The count is $4$.
:::
:::

:::exercise One EMA step {level=1 check="104.875"}
An EMA with $\lambda = 1/2$ equals $102.75$, and the next close is $107$. Enter the next EMA value.
:::solution
$E = \tfrac12\cdot 107 + \tfrac12\cdot 102.75 = 53.5 + 51.375 = 104.875$. This is the step from $t = 4$ to $t = 5$ in [[#ex-ema]].
:::
:::

:::exercise Gross compound return of the cross {level=2 check="0.067961"}
Using [[#alg-cross]] on Path A with windows $3$ and $5$, cash return $0$, and no costs, enter the compound return to six decimals.
:::solution
The signal is long at $t = 4, 5, 6, 7$. Only the first three of those dates have a next return. The growth factor is $110/103$, and the compound return is $7/103 = 0.067961$ to six decimals.
:::
:::

:::exercise Gap at the first overlap {level=2 check="0.6667"}
Enter $\mathrm{SMA}_3(4) - \mathrm{SMA}_5(4)$ on Path A, rounded to four decimals.
:::solution
$\mathrm{SMA}_3(4) = 308/3$ and $\mathrm{SMA}_5(4) = 102 = 306/3$, so the gap is $2/3 = 0.6666\ldots$, which rounds to $0.6667$.
:::
:::

:::exercise Name a difference that is not the CAGR {level=2}
O01 reports CAGR $+3.33\%$ and W01 reports CAGR $+7.38\%$. Give one difference between the two experiments that is not a difference of reported summary statistics. Use only the catalogue descriptions.
:::solution
Any one of the following is enough. O01 uses windows $20$ and $50$ and market orders on crosses of equity ETFs over 25 years. W01 holds each sector ETF while $\mathrm{SMA}(50) > \mathrm{SMA}(200)$ and rebalances weights daily over 26 years. Windows, order versus weight, event versus daily rebalance, the stated universe and the span are all differences of specification. The CAGR gap is an output, not one of those differences. The figures are as reported in 2026 and were not re-run here.
:::
:::

:::exercise Check the unrolled EMA at t = 2 {level=3 check="101"}
Use [[#prop-ema]] with $\lambda = 1/2$ and $E_0 = P_0 = 100$ on Path A. Compute $E_2$ from the discounted-sum formula, not from the recursion, and enter the value.
:::hint
The formula at $t = 2$ has two discounted closes plus the seed term $(1-\lambda)^2 P_0$. With $\lambda = 1/2$ every coefficient is a power of one half.
:::
:::solution
$$
E_2 = \tfrac12 P_2 + \tfrac12\cdot\tfrac12 P_1 + \bigl(\tfrac12\bigr)^2 P_0 = \tfrac12\cdot 101 + \tfrac14\cdot 102 + \tfrac14\cdot 100 = 50.5 + 25.5 + 25 = 101.
$$
The recursion in [[#ex-ema]] gives the same value. The exercise is a check that the unrolled weights, which sum to $1/2 + 1/4 + 1/4 = 1$, reproduce it.
:::
:::

:::exercise A straight line and SMA(5) {level=3 check="110"}
Let $P_t = 100 + 2t$ for $t = 0, 1, \ldots, 7$, so the closes run $100, 102, \ldots, 114$. Enter $\mathrm{SMA}_5(7)$.
:::hint
Average the five closes $P_3$ through $P_7$. On a straight line this equals the close $(5-1)/2 = 2$ sessions before $t = 7$. The lag identity is proved in the costs chapter; here you only need the average.
:::
:::solution
The five closes are $106, 108, 110, 112, 114$. Their sum is $550$ and their mean is $110$. That is $P_5$, two sessions before $t = 7$, which is the lag $(n-1)/2$ for $n = 5$. The answer is $110$.
:::
:::
