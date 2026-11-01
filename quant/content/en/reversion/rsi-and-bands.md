An index that prints 30 feels like a fact about the market. It is a fact about a formula, a window, and a smoother. The **relative strength index** compresses recent gains and recent losses into a number between 0 and 100. A **Bollinger band** places a moving average and a moving standard deviation around recent closes. Either object can be the input to an entry and an exit. Neither object is the short-horizon hypothesis in [[reversion/the-reversion-hypothesis]], and neither number is an instruction to trade.

This chapter fixes computable definitions, runs them on Path A, and then reads three catalogue experiments that use the same family of language with different clocks. Two of those experiments enter when RSI(14) is below 35 and exit when it is above 60. One submits market orders. One sets weekly weights. The third buys below a lower band and leaves at a midline. The reported paths do not agree, which is the result worth keeping. A published gain is not a band to adopt, and a published loss is not a signal to take the other side.

Path A is again
$$
P = (100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110)
$$
on dates $0$ through $7$. The close-to-close changes are $+2, -1, +3, -1, +4, -1, +4$. Seven changes cannot support a 14-period window. Every RSI below is therefore a 3-period calculation on this toy, and it is labelled as such. It is not the RSI(14) in the catalogue.

## Average gain, average loss, one number

A change is split into a gain and a loss. If the close rises by $u > 0$, the gain is $u$ and the loss is $0$. If the close falls by $u > 0$, the gain is $0$ and the loss is $u$. A flat close contributes zero to both. Wilder's 1978 construction then smooths those two series. The smoothing he published is recursive. A simple average over a fixed window is a different function. Both are used in software under the same name. A specification has to say which one it means.

:::definition Simple-average RSI {#def-rsi}
On a window of $n \ge 1$ close-to-close changes, let the **average gain** be the arithmetic mean of the $n$ gains and the **average loss** the arithmetic mean of the $n$ losses. If the average loss is positive,
$$
\mathrm{RS} = \frac{\text{average gain}}{\text{average loss}}, \qquad \mathrm{RSI} = 100 - \frac{100}{1+\mathrm{RS}}.
$$
If the average loss is $0$ and the average gain is positive, the ratio is undefined; the convention in this chapter is to set RSI to $100$. If both averages are $0$, set RSI to $50$, because the window has no move to normalise. This is a simple average, not Wilder's recursive smoother, and the changes are in price points, not in percent. The window ends at a stated date, and the value is known at that close.
:::

The formula is a monotone function of the ratio of the two averages. RSI is $50$ when the averages are equal, above $50$ when gains dominate, and below $50$ when losses dominate. It does not know the word "cheap". A reading of $20$ means that, on the chosen window and the chosen smoother, losses have been large relative to gains. What a book does with that reading is a second sentence: the entry, the exit, the order, and the cost.

:::algorithm One Wilder update {#alg-wilder}
Start from simple averages over the first $n$ changes, written $\bar g$ and $\bar \ell$. When the next change arrives, with gain $g$ and loss $\ell$, replace the averages by
$$
\bar g \leftarrow \frac{(n-1)\bar g + g}{n}, \qquad \bar \ell \leftarrow \frac{(n-1)\bar \ell + \ell}{n},
$$
and recompute RS and RSI from [[#def-rsi]]. Do not restart the average from scratch. The new average retains a fraction $(n-1)/n$ of the old one, so a shock decays only as later changes arrive. State $n$, and state that this recursion is in use, whenever you call the result Wilder's RSI.
:::

On Path A with $n = 3$, the simple-average readings and one Wilder step are easy to put side by side, and they do not match.

:::example Simple-average RSI on Path A {#ex-rsi-path}
Using $n = 3$ and [[#def-rsi]], compute RSI at the closes $104, 103, 107, 106, 110$.
:::solution
The changes, in order, are $+2, -1, +3, -1, +4, -1, +4$. Each window is three of them, and the value is known at the close the window ends on.

At $104$, the changes are $+2, -1, +3$. Average gain $(2+0+3)/3 = 5/3$, average loss $(0+1+0)/3 = 1/3$, so $\mathrm{RS} = 5$ and
$$
\mathrm{RSI} = 100 - 100/6 = 83.3333
$$
to four decimal places.

At $103$, the changes are $-1, +3, -1$. Average gain $1$, average loss $2/3$, $\mathrm{RS} = 1.5$, and $\mathrm{RSI} = 100 - 100/2.5 = 60$ exactly.

At $107$, the changes are $+3, -1, +4$. Average gain $7/3$, average loss $1/3$, $\mathrm{RS} = 7$, and $\mathrm{RSI} = 100 - 100/8 = 87.5$ exactly.

At $106$, the changes are $-1, +4, -1$. Average gain $4/3$, average loss $2/3$, $\mathrm{RS} = 2$, and $\mathrm{RSI} = 100 - 100/3 = 66.6667$ to four decimal places.

At $110$, the changes are $+4, -1, +4$. Average gain $8/3$, average loss $1/3$, $\mathrm{RS} = 8$, and $\mathrm{RSI} = 100 - 100/9 = 88.8889$ to four decimal places.

None of the five readings is below $35$. The lowest is $60$, at the close $103$. A rule that enters only when this RSI is below $35$ never enters on Path A. That silence is a property of a rising, alternating toy measured with $n = 3$. It is not a defect in the arithmetic, and it is not a comment on a 14-period index computed on a different series.
:::
:::

:::example One recursive step, different number {#ex-wilder}
Start from the simple averages at the close $104$, which are also the legal seed for [[#alg-wilder]] with $n = 3$. Apply one Wilder update on the next change, $-1$, and compare the RSI with the simple-average reading at $103$.
:::solution
The seed is $\bar g = 5/3$ and $\bar \ell = 1/3$. The next change is a loss of $1$, so $g = 0$ and $\ell = 1$. Then
$$
\bar g = \frac{2 \times (5/3) + 0}{3} = \frac{10}{9}, \qquad \bar \ell = \frac{2 \times (1/3) + 1}{3} = \frac{5}{9}.
$$
The ratio is $2$, and $\mathrm{RSI} = 100 - 100/3 = 66.6667$ to four decimal places. The simple average at the same close was $60$. Same changes, same $n$, two smoothers, two readings, and neither one is below $35$. A backtest that says only "RSI(3)" has not specified a rule. O02 and W03, below, say RSI(14) and a pair of thresholds. They do not, in the one-line catalogue description, say whether the code uses this recursion or a rolling simple average. We do not guess, and we have not re-run them.
:::
:::

:::warning Dividing by a zero loss
If a window is all gains, the average loss is zero and RS will not divide. Setting RSI to $100$ is a convention, not a theorem. Dropping the date, or carrying forward the previous RSI, changes the series and can change an exit that is defined as "RSI above 60". Write the convention next to $n$. The same warning applies to a window of one flat change: both averages are zero, and $50$ is again a convention, the one [[#def-rsi]] stated so that this chapter has an answer.
:::

## A band is an average and a width

Bollinger's construction, as set out in his 2001 book and used by him from the early 1980s, is a moving average plus and minus a multiple of a moving standard deviation. The multiple $2$ and the window $20$ are conventions he chose. They are not implied by [[reversion/the-reversion-hypothesis]]. The standard deviation in that construction divides by the window length $n$, not by $n-1$. This chapter follows that divisor and says so. A sample divisor is a different band.

:::definition Bollinger band on a window {#def-band}
Let $P_{t-n+1},\ldots,P_t$ be $n \ge 2$ closes ending at $t$, with arithmetic mean $m_t$. Let $s_t$ be the population standard deviation of those $n$ closes, so $n s_t^2$ is the sum of squared deviations from $m_t$. For a multiple $k > 0$ the **Bollinger band** known at $t$ is the interval $[m_t - k s_t,\ m_t + k s_t]$, and $m_t$ is the **midline**. The close $P_t$ is inside the window that built the band. A rule that instead compares $P_t$ with the band known at $t-1$ is a different rule and must be named as such.
:::

Including the close in its own window puts a hard ceiling on how extreme that close can look.

:::proposition A point cannot outrun its own short window {#prop-bound}
Let $x_1,\ldots,x_n$ be real numbers, $n \ge 2$, not all equal, with mean $m$ and population standard deviation $s > 0$. For each index $j$,
$$
\frac{\lvert x_j - m\rvert}{s} \le \sqrt{n-1}.
$$
In particular, if $n = 3$ and $k = 2$, every close in the window lies strictly inside the band of [[#def-band]], because $\sqrt{2} < 2$.
:::

:::proof
Write $d_i = x_i - m$, so $\sum_{i=1}^{n} d_i = 0$ and $s^2 = n^{-1}\sum_{i=1}^{n} d_i^2$. Fix $j$. Then $d_j = -\sum_{i \neq j} d_i$. Cauchy–Schwarz on the other $n-1$ deviations gives
$$
d_j^2 = \Big(\sum_{i \neq j} d_i\Big)^2 \le (n-1)\sum_{i \neq j} d_i^2 = (n-1)\Big(\sum_{i=1}^{n} d_i^2 - d_j^2\Big).
$$
Hence $n d_j^2 \le (n-1)\sum_i d_i^2$, so $d_j^2 / s^2 \le n-1$. Equality is available when the other deviations are equal, so the bound is sharp, but the inequality we need is only $\le$. For $n = 3$ the bound is $\sqrt{2} \approx 1.4142$, which is less than $2$. A close that helped to build a 3-period, $k = 2$ band cannot sit outside that band. If the window is flat, $s = 0$ and the band is not defined as a two-sided width; the hypothesis $s > 0$ excludes that case.
:::

The proposition is why a buy-the-lower-band rule with $n = 3$ and $k = 2$ is silent on every path, not only on Path A, whenever the band includes the close being tested. Lengthening the window, raising the chance that one close is far from the other $n-1$, or judging today's close against yesterday's band, are three different ways to make a trigger possible. They are three different rules.

:::example The band on the way to 104 {#ex-band-104}
On closes $102, 101, 104$, compute $m$, the population $s$, the $k = 2$ band, and the population $z$-score of $104$. Say whether a rule that buys when the close is below the lower band, using [[#def-band]], would buy.
:::solution
The mean is $(102+101+104)/3 = 307/3 = 102.333333$. Squared deviations are $0.111111$, $1.777778$, and $2.777778$ to six decimals, and they sum to $4.666667$. Population variance is $4.666667/3 = 1.555556$, so $s = \sqrt{14/9} = 1.247219$ to six decimal places. Rounded from full precision, the band $m \pm 2s$ is $[99.838895,\ 104.827772]$.
The $z$-score of the last close is $(104 - 102.333333)/1.247219 = 1.3363$ to four decimals, inside $\sqrt{2}$ as [[#prop-bound]] requires, and well inside $k = 2$. The close is not below $99.838895$. The rule does not buy. It also does not buy at any date of Path A under this definition: for $n = 3$ it cannot, at $k = 2$, on any path at all.
:::
:::

:::example Yesterday's band, today's close {#ex-lag-band}
Closes are $100, 102, 101, 90, 95$ on dates $0$ through $4$. At date $3$, compare two rules. Rule A uses [[#def-band]] with $n = 3$ and $k = 2$ on the window that includes $90$. Rule B compares $90$ with the $n = 3$, $k = 2$ band known at date $2$, and if it buys, it earns $R_4$. Do not treat either trigger as a suggestion to buy the dip from $101$ to $90$.
:::solution
Rule A uses $102, 101, 90$. The mean is $97.666667$. The population standard deviation is $5.436502$. The lower edge, rounded from full precision, is $86.793662$. The close $90$ is above that edge. The population $z$-score is $(90 - 97.666667)/5.436502 = -1.4102$, which is inside $\sqrt{2}$. Rule A does not buy. [[#prop-bound]] already forbade a $k = 2$ breach.

Rule B uses the earlier window $100, 102, 101$. The mean is $101$ and the population standard deviation is $\sqrt{2/3} = 0.816497$, so the lower edge is $101 - 1.632993 = 99.367007$. The new close $90$ is below $99.367007$, so rule B buys one unit at the close of date $3$. That position earns
$$
R_4 = 95/90 - 1 = 0.055556.
$$
The profit is an arithmetic consequence of a long position and a bounce from $90$ to $95$ on an invented path. Rule A, on the same path, earned nothing because it did not trade. The catalogue line for W21, below, does not say whether its band includes the close being tested. The two rules are not interchangeable, and this toy does not identify which one the catalogue ran.
:::
:::

A band is a rolling mean plus and minus k sample standard deviations. The figure draws one on a toy mean-reverting path. The sample standard deviation inside the band uses the divisor n−1. A close outside the band is a fact about this sample. It is not an instruction.

:::widget bands
window: 10
k: 2
seed: 3
caption: Widen k or the window. The count of closes outside the band falls as the band widens. New path draws another toy series from the same rule. The rule is an illustration of a band, not a strategy.
:::
:::widget plot
f: 100+8*sin(x); 100; 106; 94
x: 0, 12
labels: toy price; midline; upper; lower
caption: A sine wave against a fixed midline and two fixed bands. Crossings are properties of the drawing. Move your eye along x and notice how often a "buy the lower band" story would depend on the band staying still, which a real rolling band does not.
:::

:::intuition Width and window fight each other
A larger $k$ makes a breach rarer. A larger $n$ lets one unusual close sit further out in population $z$-score, up to $\sqrt{n-1}$, so the same $k$ can start to trigger. Choosing $n$ and $k$ after looking at the breaches is a search. [[statistics/testing-and-snooping]] is where a grid of searches gets charged for the number of looks. This chapter only needs the smaller point: $n$ and $k$ belong in the sentence that defines the rule.
:::

## Three catalogue rows, not one RSI result

The figures in this section are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtests. The reported Sharpe is their number. We do not know their risk-free rate or their annualisation, and we do not convert a reported Sharpe into the per-step ratio used on our toys. None of the rows is a forecast, and none is a strategy to copy.

O02, "Market RSI Reversion", buys when RSI(14) is below 35 and sells when RSI is above 60, with market orders, on daily bars over 25 years. The catalogue reports a total return of $+29.08\%$, a CAGR of $+1.03\%$, a Sharpe of $-0.17$, a maximum drawdown of $-16.01\%$, a win rate of $71.6\%$, and a profit factor of $1.81$.

W03, "Weekly RSI Reversion", uses the same entry and the same exit, RSI(14) below 35 and above 60, but sets weights weekly, on Fridays, over 26 years of daily bars. The catalogue reports a total return of $+373\%$, a CAGR of $+6.16\%$, a Sharpe of $0.34$, a maximum drawdown of $-49.2\%$, a win rate of $62.1\%$, and a profit factor of $2.15$.

W21, "Bollinger Reversion", buys below the lower band and exits at the midline, over 26 years of daily bars. The one-line description does not state the window or the multiple. We do not fill them in. The catalogue reports a total return of $+487\%$, a CAGR of $+7.04\%$, a Sharpe of $0.42$, a maximum drawdown of $-35.2\%$, a win rate of $59.8\%$, and a profit factor of $1.96$.

O02 and W03 share the integers 14, 35, and 60, and they do not share an experiment. One sends orders. One sets a weekly target weight. The samples differ by a year. The reported CAGR is $+1.03\%$ in one row and $+6.16\%$ in the other, and the reported maximum drawdown is $-16.01\%$ against $-49.2\%$. You cannot hand the gap to a single cause — the order, the Friday clock, the year, the names in the book — without a controlled re-run, which we have not done. Talking about "the RSI backtest" erases the only fact the two rows cleanly support: the implementation is part of the result.

O02's reported Sharpe is negative while its reported CAGR is positive, and its win rate is $71.6\%$. A high win rate with a negative reported Sharpe is possible when wins are small relative to the scale on which that Sharpe was computed, or when the Sharpe is not the ratio of the CAGR to a volatility. We do not pick which reconciliation is theirs. We also do not flip the negative Sharpe into a short rule. A published mixture of signs is a description of that row.

W21 is not a tie-breaker between O02 and W03. It is a third specification, with a band instead of an oscillator and with an exit at a midline rather than at RSI 60. Its reported CAGR is the largest of the three, and its reported drawdown is deeper than O02's and shallower than W03's. Ranking the three CAGRs and then keeping the winner is a search of three looks, done after the fact, on experiments that were not designed as a horse-race. [[#prop-bound]] is a reminder that "below the lower band" is empty or busy according to $n$, $k$, and the clock. W21's line does not settle those choices.

On our definitions, Path A never prints a simple-average 3-period RSI below 35, and it never prints a close outside its own 3-period, $k = 2$ band. A reader who expected the catalogue thresholds to "show up" on the toy was asking the toy to be a 25-year order blotter. It is eight closes.

:::quiz
On the simple-average 3-period RSI of Path A, how many of the five readings are strictly below 35?
- [ ] Five, because the path zigzags and reversal indicators fire on zigzags.
- [ ] One, the reading of 60 at the close 103, because 60 is the exit level in O02.
- [x] None. The readings run from 60 to 88.8889.
- [ ] Two, because Wilder's update differs from the simple average.
:::solution
[[#ex-rsi-path]] gives 83.3333, 60, 87.5, 66.6667, and 88.8889. The smallest is 60, which is not strictly below 35. Wilder's single update produced 66.6667 at the same date where the simple average produced 60, so the smoother changes the number and still does not create an entry on this step.
:::
:::

:::quiz
What does [[#prop-bound]] forbid?
- [ ] Any use of a 20-period band on a long sample.
- [x] A close lying outside the $k = 2$ band built from a window of three closes that includes that close.
- [ ] A close lying outside yesterday's band.
- [ ] A positive reported CAGR in a band backtest.
:::solution
For $n = 3$ the population $z$-score of any point inside the window is at most $\sqrt{2} < 2$. Yesterday's band is a different rule, and [[#ex-lag-band]] shows a close that does fall through it. The proposition is silent about other people's reported CAGRs.
:::
:::

:::application What the rows are for
Use O02, W03, and W21 as worked examples of specification, not as a menu. If you write "enter below 35, exit above 60", you still owe the smoother, the bar, the order or the weight, the rebalance, and the cost. If you write "buy the lower band", you still owe $n$, $k$, the divisor inside $s$, and whether the close is inside the window. The catalogue has already shown that two completions of the first sentence can report a CAGR of $+1.03\%$ and a CAGR of $+6.16\%$. Completing the sentence yourself, on data you chose after seeing these rows, would be a further look, not a confirmation.
:::

:::history
J. Welles Wilder defined the relative strength index in 1978, in *New Concepts in Technical Trading Systems*, as a normalised comparison of average gains and average losses over a fixed window. The 14-period length used in O02 and W03 is his suggestion, not a consequence of the formula. John Bollinger's 2001 book set out the band construction he had used since the early 1980s: a moving average plus and minus a multiple of a moving standard deviation.
:::

## Where this leads

A band around one price is a statement about that price. [[reversion/pairs-and-spreads]] builds a spread from two prices, by a log ratio and by a hedge ratio, and separates both constructions from cointegration. The exit that replaces "RSI above 60" with a trailing stop is the subject of [[reversion/when-reversion-fails]], not a tweak to be ignored when the entry looks familiar. Weights, as opposed to the signal $s_t$, are mapped in [[portfolio/from-signal-to-weight]].

:::summary
- Simple-average RSI is $100 - 100/(1+\mathrm{RS})$ with $\mathrm{RS}$ the ratio of mean gain to mean loss on a stated window of price changes. Wilder's update keeps a fraction $(n-1)/n$ of the previous average instead of restarting.
- On Path A with $n = 3$, the simple-average readings at $104, 103, 107, 106, 110$ are $83.3333$, $60$, $87.5$, $66.6667$, and $88.8889$. None is below 35. One Wilder step at $103$ gives $66.6667$, not $60$.
- A Bollinger band here is $m_t \pm k s_t$ with $s_t$ the population standard deviation of the $n$ closes ending at $t$. The multiple $2$ is a convention.
- Any point inside its own window has population $z$-score at most $\sqrt{n-1}$. For $n = 3$ and $k = 2$ the close cannot leave the band. Comparing the close with yesterday's band is a different rule; on the invented dip to $90$ it buys, and the inclusive band does not.
- O02 and W03 both say RSI(14) below 35 and above 60. As reported in 2026, and not re-run here, O02's CAGR is $+1.03\%$ with Sharpe $-0.17$, and W03's CAGR is $+6.16\%$ with Sharpe $0.34$ and maximum drawdown $-49.2\%$. Same thresholds, different experiments.
- W21 buys below the lower band and exits at the midline, with a reported CAGR of $+7.04\%$, Sharpe $0.42$, and maximum drawdown $-35.2\%$. The line does not state $n$ or $k$. We do not invent them, and we do not rank W21 above the other two as a choice to trade.
- A negative reported Sharpe next to a positive reported CAGR, as in O02, is left as a fact about that row. It is not a reason to take the other side.
:::

## Exercises

:::exercise Equal averages {level=1 check="50"}
A window has average gain $2$ and average loss $2$. What is RSI under [[#def-rsi]]? (Enter the RSI.)
:::solution
$\mathrm{RS} = 2/2 = 1$, so $\mathrm{RSI} = 100 - 100/2 = 50$. Equal averages are the midpoint of the scale, not a signal to do anything.
:::
:::

:::exercise A three-to-one ratio {level=1 check="75"}
Average gain is $3$ and average loss is $1$. What is RSI? (Enter the RSI.)
:::solution
$\mathrm{RS} = 3$, so $\mathrm{RSI} = 100 - 100/4 = 75$. The reading is above 50 because gains dominate. It is not an instruction to sell, and it is not "above 60" in the sense of O02 unless you have also specified that 60 is your exit. Here the question only asked for the index.
:::
:::

:::exercise The short-window bound {level=1 check="1.4142"}
For $n = 3$, [[#prop-bound]] caps the population $z$-score by $\sqrt{n-1}$. Enter that cap to four decimal places.
:::solution
$\sqrt{2} = 1.41421356\ldots$, which is $1.4142$ to four decimal places. Since $1.4142 < 2$, a $k = 2$ band that includes the close cannot be breached by that close when $n = 3$.
:::
:::

:::exercise Path A's lowest simple RSI {level=2 check="60"}
From the five simple-average readings in [[#ex-rsi-path]], what is the lowest RSI? (Enter the number.)
:::solution
The readings are $83.3333$, $60$, $87.5$, $66.6667$, and $88.8889$. The lowest is $60$, at the close $103$, on the changes $-1, +3, -1$. An entry threshold of 35 does not fire. An exit threshold of "strictly above 60" does not fire on this date either, because the reading is equal to 60, not above it. Equality has to be specified or it will be filled in later by accident.
:::
:::

:::exercise Population variance by hand {level=2 check="1.555556"}
Closes $102, 101, 104$. The mean is $102.333333$ and the sum of squared deviations is $4.666667$. What is the population variance, to six decimal places? (Enter the variance, not the standard deviation.)
:::solution
Divide by $n = 3$, not by $2$. The variance is $4.666667/3 = 1.555556$. The standard deviation is the square root, $1.247219$, which is what [[#ex-band-104]] uses for the band. Using $n-1$ would widen $s$ and would be a different convention from [[#def-band]].
:::
:::

:::exercise All gains {level=2}
A window of three changes is $+1, +2, +4$. Apply the zero-loss convention in [[#def-rsi]] and state the RSI. Why is "leave it blank" a dangerous alternative in a backtest?
:::solution
Average gain is $7/3$ and average loss is $0$. The ratio does not divide. [[#def-rsi]] sets RSI to $100$. Leaving the date blank forces every downstream rule to invent a value: carry forward the old RSI, skip the bar, or treat the blank as zero. Those choices change whether an exit at "RSI above 60" fires. The convention is arbitrary, but it has to be written down before the result is computed, not after a blank cell looks inconvenient.
:::
:::

:::exercise Sample divisor, still inside {level=3}
The sample standard deviation uses the divisor $n-1$ instead of $n$. Show that the corresponding $z$-score is the population $z$-score multiplied by $\sqrt{(n-1)/n}$, and compute the resulting cap for $n = 3$. Explain why switching to the sample divisor still cannot push a close outside a $k = 2$ band on a window of three.
:::hint
Population variance is $\sum d_i^2 / n$ and sample variance is $\sum d_i^2 /(n-1)$, so the sample standard deviation is larger by $\sqrt{n/(n-1)}$. A larger denominator makes the $z$-score smaller. Then apply [[#prop-bound]].
:::
:::solution
Let $s_{\mathrm{pop}}^2 = \sum d_i^2 / n$ and $s_{\mathrm{sam}}^2 = \sum d_i^2 /(n-1)$. Then $s_{\mathrm{sam}} = s_{\mathrm{pop}}\sqrt{n/(n-1)}$, and
$$
\frac{\lvert d_j\rvert}{s_{\mathrm{sam}}} = \frac{\lvert d_j\rvert}{s_{\mathrm{pop}}}\sqrt{\frac{n-1}{n}}.
$$
[[#prop-bound]] caps the population ratio by $\sqrt{n-1}$, so the sample ratio is at most
$$
\sqrt{n-1}\cdot\sqrt{(n-1)/n} = (n-1)/\sqrt{n}.
$$
For $n = 3$ the cap is $2/\sqrt{3} \approx 1.1547$, which is still less than $2$. The sample band is wider, so the close looks even less extreme. Switching divisor does not create the breach that $k = 2$ and $n = 3$ forbid.
:::
:::

:::exercise Two completions, one sentence {level=3}
O02 reports CAGR $+1.03\%$ and Sharpe $-0.17$. W03 reports CAGR $+6.16\%$ and Sharpe $0.34$. Both catalogue lines enter on RSI(14) below 35 and exit above 60. Give two protocol differences that the library states, and explain why those differences stop you from attributing the CAGR gap to the thresholds.
:::hint
Look at orders against weights, and at the rebalance and the sample length. The thresholds themselves are the part the two lines share. Figures are as reported in 2026; they were not re-run in this atlas.
:::
:::solution
O02 submits market orders and is reported on a 25-year span. W03 sets weights weekly, on Fridays, and is reported on a 26-year span. The entry integer and the exit integer match. The CAGR gap of $6.16 - 1.03 = 5.13$ percentage points, in the reported figures, sits next to at least those protocol differences, and possibly next to others the one-line descriptions do not list. A single cause is not identified. In particular the shared thresholds cannot be "what produced" a gap between two rules that share them. The negative reported Sharpe on O02 is not a reason to run the opposite of O02, and the higher reported CAGR on W03 is not a reason to prefer Friday weights. Both rows remain descriptions of experiments this atlas has not repeated.
:::
:::
