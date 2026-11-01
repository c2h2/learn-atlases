A moving-average cross compares two smoothers of the close. A breakout compares the close with a high, and MACD compares a difference of smoothers with a smoother of that difference. Both are still sign rules in the sense of [[trend/the-trend-hypothesis]]: a feature dated $t$, built only from information available at $t$, offered as a hypothesis about the return after $t$. They change the feature. They do not change the economic claim into something else, and they do not become an instruction to hold the asset the feature was computed on.

Path A is the same eight invented closes, $t = 0,\ldots,7$,

$$
P = (100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110).
$$

The series gives closes only. A channel defined on highs and lows cannot be computed until a substitute is stated. The substitute used here is the close itself: the toy high of a session is its close, and the toy low is the same number. That is a limitation of the example, not a claim that highs do not matter. Where the library rule says "20-day high", the catalogue means a high. The toy means a prior close.

## A channel and a stop price

:::definition Prior-window channel {#def-channel}
Fix an integer $N \ge 1$. At a date $t \ge N$, the **prior-window channel** of a close series has upper edge

$$
U_t = \max\{P_{t-N},\ldots,P_{t-1}\}
$$

and lower edge $L_t = \min\{P_{t-N},\ldots,P_{t-1}\}$. The window stops at $t - 1$. The close $P_t$ is not a member of the set whose maximum it is being asked to beat. The breakout signal is $b_t = 1$ if $P_t > U_t$, and $b_t = 0$ otherwise. The legal profit is $b_t R_{t+1}$. Including $P_t$ inside $U_t$ would force $P_t \le U_t$ and the signal would never fire.
:::

A Donchian-style channel is this construction when the inputs are highs and lows rather than closes: the upper edge is the highest high over a stated window, and a breakout is a trade through that high. The name marks the construction. This chapter does not attach a year to it beyond what the course record already says about channel rules.

:::definition Buy-stop above a channel {#def-stop}
A **buy-stop** is an order intended to buy if the market trades at a stated price above the current quote. In a breakout specification the stop price is set from the channel, at or just above the prior high. The signal $b_t$ in [[#def-channel]] is not that order. It is a comparison of a close with a prior maximum. Whether a stop is elected, and at what price it fills, depends on trades inside the bar and on the order type. Those mechanics belong to [[orders/stops-and-stop-limits]]. On Path A there are no inside-bar trades, so the chapter never pretends to fill a stop. It only computes $b_t$.
:::

O05 in the open library is the stop-entry breakout: a buy-stop above the recent 20-day high. Daily bars, span 25 years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the total return is $+41.44\%$, the CAGR is $+1.40\%$, the reported Sharpe is $-0.19$, the max drawdown is $-10.5\%$, the win rate is $61.9\%$ and the profit factor is $1.45$. This atlas has not re-run the backtest and has not verified the Sharpe's annualisation or its risk-free convention. The row is not advice and not a forecast.

The positive total return beside a negative reported Sharpe is easy to "correct" in the wrong direction, by flipping a sign or by dropping one of the two cells. The next proposition says why a flip is not available inside the definitions used in this atlas.

:::proposition Two-period compound growth and the sign of the mean {#prop-mean}
Let $a > -1$, $b > -1$, and suppose $(1+a)(1+b) > 1$. Then $a + b > 0$. Consequently, if these two simple returns are the whole sample, the risk-free rate is $0$, and the sample standard deviation of $\{a, b\}$ is positive, the Sharpe ratio defined as the mean divided by that standard deviation is positive.
:::

:::proof
The inequality $(1+a)(1+b) > 1$ expands to $a + b + ab > 0$, so $a + b > -ab$.

Suppose, for a contradiction, that $a + b \le 0$. Then $-ab < a + b \le 0$, which forces $ab > 0$. Combined with a non-positive sum, both $a$ and $b$ are strictly negative: a zero sum with a positive product is impossible, because $b = -a$ would give $ab = -a^2 \le 0$. Both are also greater than $-1$ by assumption, so $0 < 1+a < 1$ and $0 < 1+b < 1$. Their product is strictly less than $1$, contradicting the hypothesis. Therefore $a + b > 0$.

The mean of the two returns is $(a+b)/2 > 0$. Dividing by a positive sample standard deviation, with a risk-free rate of $0$, leaves a positive Sharpe ratio.
:::

:::remark From two periods to a long sample
For $n$ simple returns, each greater than $-1$, with growth factor $G = \prod(1+R_t) > 1$, concavity of the logarithm on $(0, \infty)$ gives

$$
\frac1n\sum_{t=1}^{n}\log(1+R_t) \le \log\Bigl(1 + \bar R\Bigr).
$$

The left side equals $(\log G)/n > 0$, so $\bar R > 0$. This chapter uses concavity as a named property of $\log$ and does not re-prove it. Under that property, a positive compound growth of a simple-return series forces a positive arithmetic mean of the same series. Our Sharpe with a risk-free rate of $0$ is then positive whenever the sample standard deviation is positive.

O05 reports a total return of $+41.44\%$, so the catalogue's terminal growth is above $1$, and it reports a Sharpe of $-0.19$. Those two cells cannot be our zero-risk-free Sharpe of the same simple returns that produced the total return, together with a positive standard deviation. A positive financing rate subtracted before the ratio is formed, or a different convention entirely, could produce the pair. This atlas has not checked which convention the catalogue used. The cells stay side by side. They are not an error to repair, and the negative reported Sharpe is not a reason to take the other side of the breakout.
:::

The futures version of a channel rule is a different experiment again. O20 is whole-contract sizing on a provider's continuous futures series; the contract arithmetic is left to [[asset-classes/futures]] and is not repeated as though it were O05.

:::algorithm Breakout flags from closes {#alg-break}
1. Choose $N$ and a close series. If highs exist and the specification names them, use highs in place of closes in the maximum; otherwise say that you are using closes.
2. For each $t \ge N$, set $U_t = \max\{P_{t-N},\ldots,P_{t-1}\}$ and $b_t = 1$ if $P_t > U_t$, else $0$.
3. Earn $b_t R_{t+1}$. Do not earn $b_t R_t$. The session of the break, $R_t$, contains the move that crossed the prior maximum, and that move is already in $P_t$.
4. Record the lower edge if you need to say that a close sat inside the channel, but do not turn the lower edge into a sell rule unless the specification says so. This chapter's toy is long or flat, not long or short.
:::

## The three-session channel on Path A

Take $N = 3$. The first date with three prior closes is $t = 3$.

:::example Prior three-session channel {#ex-channel}
For $t = 3,\ldots,7$ on Path A, list the prior window, $U_t$, $L_t$, and $b_t$.
:::solution
The windows exclude the current close.

| $t$ | prior closes | $U_t$ | $L_t$ | $P_t$ | $b_t$ |
|---|---|---|---|---|---|
| $3$ | $100, 102, 101$ | $102$ | $100$ | $104$ | $1$ |
| $4$ | $102, 101, 104$ | $104$ | $101$ | $103$ | $0$ |
| $5$ | $101, 104, 103$ | $104$ | $101$ | $107$ | $1$ |
| $6$ | $104, 103, 107$ | $107$ | $103$ | $106$ | $0$ |
| $7$ | $103, 107, 106$ | $107$ | $103$ | $110$ | $1$ |

At $t = 4$ the close $103$ sits strictly inside $[101, 104]$. The signal is flat not because the path has "stopped trending", but because $103$ does not exceed the prior maximum $104$. At $t = 7$ the signal is long and there is no next return inside the sample, so step 3 of [[#alg-break]] records the flag and pays nothing further.
:::
:::

:::example Compound return of the three-session breakout {#ex-break-pnl}
Hold $b_t$ from [[#ex-channel]] over the next session, with cash at return $0$. Compute the compound return.
:::solution
The paid dates are $t = 3$ and $t = 5$. They earn $R_4 = -1/104$ and $R_6 = -1/107$. The flat dates contribute factors of $1$. The growth factor is

$$
\frac{103}{104}\cdot\frac{106}{107} = \frac{5459}{5564}.
$$

The compound return is $-105/5564 = -0.018871$ to six decimals. Both held sessions are down sessions. The up sessions that pushed the close through the prior maximum, $R_3$, $R_5$ and $R_7$, are exactly the sessions the legal clock refuses to pay, because each of them is the return that ends at the break. A same-bar version would have harvested those up sessions and would have been a different, illegal, experiment. The negative toy result does not confirm O05's negative reported Sharpe, and it does not contradict O05's positive reported CAGR. The windows, the instruments and the order type do not match.
:::
:::

A two-session prior window, $N = 2$, happens to fire at the same dates $t = 3, 5, 7$ and to stay flat at $t = 4, 6$. At the extra date $t = 2$, the prior maximum is $\max(100, 102) = 102$ and the close is $101$, so $b_2 = 0$. The paid sessions are again $R_4$ and $R_6$, and the compound return is again $-0.018871$. Agreement of $N = 2$ and $N = 3$ is a fact about Path A. It is not a theorem about channels, and it is not a licence to treat the window length as irrelevant on any other path.

## MACD

:::definition MACD line and signal line {#def-macd}
Choose decays $\lambda_{\mathrm{f}}$ and $\lambda_{\mathrm{s}}$ in $(0, 1]$, with the fast decay the larger one, and seed both exponential averages at a stated close. Let $E^{\mathrm{f}}_t$ and $E^{\mathrm{s}}_t$ be the recursions of [[trend/moving-averages]]. The **MACD line** is

$$
M_t = E^{\mathrm{f}}_t - E^{\mathrm{s}}_t.
$$

Choose a further decay $\lambda_{\mathrm{g}}$ and a seed for the signal line. The **signal line** $S_t$ is the exponential average of $M_t$ under that decay. The long/flat rule used as the shape of the library example is $m_t = 1$ when $M_t > S_t$, and $m_t = 0$ otherwise. The legal profit is $m_t R_{t+1}$.
:::

Gerald Appel's construction, dated 1979 in the course record, subtracts a slower exponential average from a faster one and smooths the difference again. The usual spans quoted in desks are longer than eight sessions. The toy below uses $\lambda_{\mathrm{f}} = 2/3$ (span $2$, under the convention $\lambda = 2/(n+1)$), $\lambda_{\mathrm{s}} = 1/2$ (span $3$) and $\lambda_{\mathrm{g}} = 2/3$, with both price averages seeded at $P_0 = 100$ and the signal line seeded at $M_0 = 0$. Those spans are chosen so that every step fits on Path A. They are not a reconstruction of the library rule, and a reader who swaps in spans $12$, $26$ and $9$ is running a different toy.

W22, MACD Trend, is: long while MACD is above its signal line. Daily bars, span 26 years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the total return is $+186\%$, the CAGR is $+4.13\%$, the reported Sharpe is $0.22$, the max drawdown is $-35.6\%$, the win rate is $63.5\%$ and the profit factor is $1.24$. This atlas has not re-run the backtest and has not verified the Sharpe convention. The reported drawdown is deeper than O05's $-10.5\%$, and the reported CAGR is higher. The spans differ by a year, one rule is a stop-entry breakout and the other is a weight while a MACD inequality holds. The two rows are not a paired test of "breakout versus MACD".

:::example Toy MACD on Path A {#ex-macd}
Using the decays and seeds just stated, compute $M_t$ and $S_t$ through $t = 7$. Mark the dates where $M_t > S_t$. Show the step from $t = 0$ to $t = 1$ in fractions, and take the later rows as the same recursion evaluated in exact arithmetic and then rounded to six decimals.
:::solution
At $t = 0$, $E^{\mathrm{f}} = E^{\mathrm{s}} = 100$, so $M_0 = 0$ and $S_0 = 0$. The inequality is not strict, and $m_0 = 0$.

At $t = 1$,

$$
E^{\mathrm{f}}_1 = \tfrac23\cdot 102 + \tfrac13\cdot 100 = \tfrac{304}{3}, \qquad E^{\mathrm{s}}_1 = \tfrac12\cdot 102 + \tfrac12\cdot 100 = 101,
$$

so $M_1 = 304/3 - 101 = 1/3 = 0.333333$. The signal update is $S_1 = \tfrac23\cdot(1/3) + \tfrac13\cdot 0 = 2/9 = 0.222222$. Since $1/3 > 2/9$, the rule is long at $t = 1$.

The remaining rows, rounded to six decimals from exact fractions, are:

| $t$ | $M_t$ | $S_t$ | $M_t > S_t$ |
|---|---|---|---|
| $0$ | $0.000000$ | $0.000000$ | no |
| $1$ | $0.333333$ | $0.222222$ | yes |
| $2$ | $0.111111$ | $0.148148$ | no |
| $3$ | $0.537037$ | $0.407407$ | yes |
| $4$ | $0.262346$ | $0.310700$ | no |
| $5$ | $0.795782$ | $0.634088$ | yes |
| $6$ | $0.452761$ | $0.513203$ | no |
| $7$ | $0.911337$ | $0.778626$ | yes |

The line is above its signal on the odd dates from $1$ to $7$, and below it on the even dates from $2$ to $6$. On this path, with these short spans, the toy alternates once per session after the seed. That is whipsaw of a feature, visible before any cost is charged. It is not W22, whose spans and universe are not these.
:::
:::

:::example What the alternating MACD actually earns {#ex-macd-pnl}
Hold the toy signal of [[#ex-macd]] over the next session. Compute the compound return, with cash at $0$.
:::solution
The signal is long at $t = 1, 3, 5, 7$. The last of these has no next return. The paid profits are $R_2$, $R_4$ and $R_6$, each of which is negative on Path A: factors $101/102$, $103/104$ and $106/107$. The product is $551359/567528$, and the compound return is $-16169/567528 = -0.028490$ to six decimals.

The same three sessions, and the same compound return, appeared as the long/flat one-day sign rule in [[trend/the-trend-hypothesis]]. The equality is an accident of this path and these decays: the toy MACD happened to be long exactly on the dates whose next return was a down session. It is not an identity between MACD and $\sgn(R_t)$. Changing $\lambda_{\mathrm{f}}$ would change the long dates. W22's reported CAGR of $+4.13\%$ is a 26-year catalogue figure under a different specification, not a contradiction of a negative eight-close toy.
:::
:::

:::widget plot
f: sin(x); 0.65*sin(x-0.7); sin(x)-0.65*sin(x-0.7)
x: 0, 16
labels: fast sine; lagged copy; difference
caption: The third curve is a fast sine minus a lagged copy, a sketch of a MACD line. Where it crosses zero is not a trading signal and not a forecast. No slider is required.
:::

:::intuition Breaking a high is still a bet on the next sign
$P_t > U_t$ says the close printed above a recent maximum. The hypothesis, if one bothers to state it, is that the next return is more often positive after that print than a stated alternative. O05 implements one version with a buy-stop and reports a negative Sharpe beside a positive CAGR. W22 implements another version with a smoothed difference and reports a positive Sharpe beside a much deeper drawdown. Neither row answers the one-day channel on Path A, and Path A does not answer either row.
:::

:::warning Do not fill a stop you cannot see
A close above a prior close is not evidence that a buy-stop one tick above the prior high would have filled, nor of the price at which it would have filled. Path A has no highs and no trades. [[#def-stop]] keeps the order out of the toy. O05's catalogue line is a stop-entry rule; its reported fill assumptions are not restated here and must not be replaced by the toy's close-to-close factors.
:::

:::quiz
Why does [[#def-channel]] keep $P_t$ out of the maximum that defines $U_t$?
- [ ] Because the close is a worse estimator of the high than the open
- [x] Because $P_t$ cannot strictly exceed a maximum taken over a set that already contains $P_t$
- [ ] Because a legal signal is forbidden from using $P_t$ at all
- [ ] Because $N = 3$ is too short to include the current bar
:::solution
The signal asks whether the current close beat the prior window. A maximum that includes the current close is at least the current close, so the strict inequality never holds. The signal may use $P_t$. What it may not do is treat $R_t$ as the profit of that comparison.
:::
:::

:::quiz
O05 reports CAGR $+1.40\%$ and Sharpe $-0.19$. Which reading agrees with this chapter?
- [ ] The Sharpe should be reported as positive, because the CAGR is positive
- [ ] The CAGR should be reported as negative, because the Sharpe is negative
- [x] Leave both cells as reported. Under our definitions with a zero risk-free rate, one and the same simple-return series cannot compound to a gain and have a negative mean, so the catalogue's pair is not that ratio. The convention was not re-derived here
- [ ] The negative Sharpe means the breakout hypothesis has been rejected for every window
:::solution
[[#prop-mean]] and the following remark separate our zero-rate Sharpe from a reported cell whose convention is unverified. Editing one cell to match the other invents a number the library does not contain. One 25-year row does not reject every breakout specification.
:::
:::

:::history A difference of averages, smoothed again
The course record dates MACD to 1979 and describes Gerald Appel's moving-average convergence/divergence oscillator, introduced in the late 1970s: a slower exponential average subtracted from a faster one, and the difference smoothed again. That is the shape of [[#def-macd]]. The record does not fix the spans, the universe or the cost. W22 is one later specification that is long while the line is above its signal, with the reported summary quoted above. The 1979 construction did not produce that summary.
:::

## Where this leads

A filter takes one signal, which might be a channel or a long average, and uses it to choose a list rather than a single long/flat flag. [[trend/filters-and-defensive]] writes that map and quotes the library's defensive switch. The cost of a flag that flips as often as the toy MACD is the subject of [[trend/lag-whipsaw-and-costs]]. Stops, as orders rather than as features, are [[orders/stops-and-stop-limits]].

:::summary
- A prior-window channel sets its upper edge to the maximum of the previous $N$ closes, not including the current close. The breakout flag is long only when the current close is strictly above that edge, and it earns the next return.
- On Path A with $N = 3$ the flag is long at $t = 3, 5, 7$. The paid compound return is $-0.018871$. The up sessions that made the new highs are not the sessions the legal clock pays.
- A buy-stop above a high is an order. The Path A flag is not a fill.
- O05 reports CAGR $+1.40\%$, Sharpe $-0.19$ and max drawdown $-10.5\%$ over 25 years. A positive compound growth and a negative mean cannot coexist under our zero-rate definitions; the reported pair is left as reported.
- Toy MACD with the short decays above is long on alternate sessions after the seed and compounds to $-0.028490$. W22, a different experiment, reports CAGR $+4.13\%$, Sharpe $0.22$ and max drawdown $-35.6\%$ over 26 years.
- O20 is the futures whole-contract channel experiment and is not O05. Its details live with futures, not in this toy.
:::

## Exercises

:::exercise A prior maximum {level=1 check="104"}
On Path A with $N = 3$, enter $U_5$, the maximum of the three closes before session $5$.
:::solution
The prior closes are $P_2, P_3, P_4 = 101, 104, 103$. The maximum is $104$.
:::
:::

:::exercise Is session 4 a breakout? {level=1 check="0"}
Using [[#def-channel]] with $N = 3$ on Path A, enter $b_4$, either $0$ or $1$.
:::solution
$U_4 = 104$ and $P_4 = 103$. Since $103 > 104$ is false, $b_4 = 0$.
:::
:::

:::exercise The first MACD value {level=1 check="0.333333"}
With the toy decays of [[#ex-macd]], enter $M_1$ to six decimals.
:::solution
$M_1 = 1/3 = 0.333333$ to six decimals, from the subtraction $304/3 - 101$ in [[#ex-macd]].
:::
:::

:::exercise Breakout compound return {level=2 check="-0.018871"}
Enter the compound return of the $N = 3$ legal breakout on Path A, cash at $0$, to six decimals.
:::solution
The paid factors are $103/104$ and $106/107$. The growth factor is $5459/5564$, and the compound return is $-105/5564 = -0.018871$ to six decimals.
:::
:::

:::exercise How many MACD sessions are paid? {level=2 check="3"}
In [[#ex-macd-pnl]], how many sessions contribute a non-zero profit? Enter an integer.
:::solution
The signal is long at $t = 1, 3, 5, 7$. Only $t = 1, 3, 5$ have a next return. The count of paid sessions is $3$. The profit on each of those sessions is non-zero because the corresponding Path A returns are non-zero.
:::
:::

:::exercise Why the reported pair is not edited {level=2}
O05 reports a positive CAGR and a negative Sharpe. Give one reason, internal to this chapter, not to replace the Sharpe by its absolute value.
:::solution
Under the definitions used here, with a risk-free rate of $0$, a simple-return series that compounds to a gain has a positive mean, by [[#prop-mean]] in two periods and by concavity of $\log$ in the longer case. A negative ratio is then not our Sharpe of that series. The catalogue nevertheless reports $-0.19$ beside a positive total return. The convention behind that cell was not verified, so replacing $-0.19$ by $0.19$ invents a figure the library does not report. The pair is quoted as reported in 2026 and the backtest was not re-run.
:::
:::

:::exercise The strict case of opposite signs {level=3}
In the proof of [[#prop-mean]], the product $ab$ may be negative. Show, without using the contradiction argument for the both-negative case, that if $a > -1$, $b > -1$, $(1+a)(1+b) > 1$ and $ab < 0$, then $a + b > 0$.
:::hint
Expand the product inequality until you have $a + b > -ab$, and use the sign of $ab$.
:::
:::solution
$(1+a)(1+b) > 1$ expands to $a + b + ab > 0$, hence $a + b > -ab$. The hypothesis $ab < 0$ means $-ab > 0$. Therefore $a + b > -ab > 0$, so $a + b > 0$. The restrictions $a > -1$ and $b > -1$ are not required for this short step; they keep the original returns from being total losses, and they are used in the both-negative half of the full proof.
:::
:::

:::exercise An accident, not an identity {level=3 check="-0.028490"}
Enter the toy MACD compound return on Path A to six decimals. Then state whether equality with the long/flat one-day sign rule is an identity of the two definitions.
:::hint
The paid MACD dates are $t = 1, 3, 5$. Compare those dates with the dates on which $R_t > 0$.
:::
:::solution
The growth factor is $101/102 \cdot 103/104 \cdot 106/107 = 551359/567528$, and the compound return is $-0.028490$ to six decimals. The long/flat one-day sign rule is long when $R_t > 0$, which on Path A is the odd dates, and those are exactly the dates the toy MACD is long. The shared compound return is a coincidence of this series and these three decays. The definitions are not the same: one looks at $\sgn(R_t)$, the other at $M_t - S_t$. A different $\lambda_{\mathrm{f}}$ need not fire on the same sessions.
:::
:::
