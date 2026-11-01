A column of returns has a centre and a spread. It also has an order. The centre can be positive while neighbouring values lean in opposite directions, and a smooth run of gains can hide inside a column whose average is close to zero. Trend rules and reversion rules are claims about that order. They are not claims about the average, and a large number on six overlapping pairs is not yet evidence that either claim will survive another sample.

The prices used throughout this course, called Path A, are

$$
P = (100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110).
$$

The seven simple returns, to six decimals, are $0.020000$, $-0.009804$, $0.029703$, $-0.009615$, $0.038835$, $-0.009346$, $0.037736$. The performance course records the sample mean $0.013930$ and the sample standard deviation $0.022848$ with divisor $n-1$. Those two numbers describe the column after the order has been thrown away. This chapter puts the order back, and it points to the Maths Atlas for the probability underneath: [expectation](/learn/maths/lesson.php?c=probability&l=expectation) and [covariance](/learn/maths/lesson.php?c=probability&l=joint-distributions). Nothing computed here is a recommendation to trade.

## Centre and spread

A single return $R$ is a random variable once a model is stated. The model may be as modest as "these seven numbers are the population", or as strong as an assumption that successive days are independent copies of one law. The symbols below are the same in either reading; the assumptions are not.

:::definition Expectation and variance of a return {#def-moments}
Let $R$ be a return with $\E[R^2] < \infty$. Its **expectation** (mean) and **variance** are

$$
\E[R], \qquad \Var(R) = \E\bigl[(R - \E[R])^2\bigr] = \E[R^2] - (\E[R])^2.
$$

The standard deviation is $\sqrt{\Var(R)}$. Given observations $R_1,\ldots,R_n$, the **sample mean** and the **sample variance with divisor $n-1$** are

$$
\bar R = \frac1n\sum_{t=1}^n R_t, \qquad
s^2 = \frac{1}{n-1}\sum_{t=1}^n (R_t - \bar R)^2.
$$

The divisor $n-1$ is the one used for Path A. A divisor of $n$ is the variance of the discrete uniform distribution that puts mass $1/n$ on each observation. The two conventions are not interchangeable when $n$ is small, and neither one uses the order of the observations.
:::

On Path A, $n = 7$, $\bar R = 0.013930$ and $s = 0.022848$. The ratio $\bar R / s = 0.6097$ is a per-step scale, not an annual Sharpe ratio. Multiplying it by $\sqrt{252}$ produces a large number that seven days cannot support; that contrast belongs to [[performance/uncertainty-of-performance]]. The compound simple return on the path is $0.10$, because $110/100 - 1 = 0.10$, which is not the sum of the simple returns. Adding simple returns is a different operation, already separated from compounding in [[performance/simple-and-log-returns]].

The sample mean is linear. The sample variance is not. Two series can share a mean and a variance and still differ in every way that a rule cares about, because a rule cares about which return sits next to which.

:::quiz
Path A has sample mean $0.013930$ and compound simple return $0.10$. Which statement is correct?
- [ ] The compound return equals the sum of the seven simple returns.
- [ ] The sample variance with divisor $n-1$ uses the order of the seven returns.
- [x] The mean and the variance describe the list of returns after the order has been discarded.
- [ ] A positive mean forces the lag-1 correlation to be positive.
:::solution
The sample mean and the sample variance are unchanged if the seven returns are written in another order. The compound return is not the sum of the simple returns. The sign of the mean and the sign of a lag-1 correlation are separate facts, and on this path they disagree.
:::
:::

## Covariance, correlation, and a sum

Diversification is a statement about a covariance. The algebra is short, and it is the part of the portfolio calculation that belongs here rather than in a weighting rule.

:::definition Covariance and correlation {#def-corr}
Let $X$ and $Y$ have finite variances, and let $\Var(Y) > 0$ and $\Var(X) > 0$. The **covariance** and **correlation** are

$$
\Cov(X, Y) = \E\bigl[(X - \E X)(Y - \E Y)\bigr], \qquad
\Corr(X, Y) = \frac{\Cov(X, Y)}{\sqrt{\Var(X)\,\Var(Y)}}.
$$

Correlation is defined only when both variances are positive. It lies in $[-1, 1]$. The sample versions replace the expectations by averages over the pairs you actually have, and you must say whether the divisor is the number of pairs or one less. In a correlation the divisor cancels, provided the same divisor is used in the covariance and in both variances.
:::

:::proposition Variance of a sum {#prop-var-sum}
If $X$ and $Y$ have finite variances, then

$$
\Var(X + Y) = \Var(X) + \Var(Y) + 2\,\Cov(X, Y).
$$

If the covariance is zero, the variances add. If the covariance is negative, $\Var(X+Y)$ is smaller than $\Var(X) + \Var(Y)$.
:::

:::proof
Expand the square inside the definition. Write $X' = X - \E X$ and $Y' = Y - \E Y$, so that $\E X' = \E Y' = 0$ and $X + Y - \E(X+Y) = X' + Y'$. Then

$$
\Var(X+Y) = \E[(X' + Y')^2] = \E[X'^2] + \E[Y'^2] + 2\E[X'Y'],
$$

which is $\Var(X) + \Var(Y) + 2\Cov(X, Y)$. The two sentences about the sign of the covariance are immediate: the cross term drops out when the covariance is zero, and it subtracts when the covariance is negative. Finite variances are the assumption that makes every term exist. Independence of $X$ and $Y$ is enough to give a zero covariance, but a zero covariance does not require independence.
:::

The proposition is the reason a negative association between two return series reduces the variance of their sum. It is not a recipe for a hedge. The covariance in the formula is an input. Estimated from a short window, it moves, and a correlation of $-1$ in a spreadsheet is an assumption that the two series are exact offsets, which traded prices are not.

:::proposition Rescaling and the sign of a correlation {#prop-scale}
Suppose $\Corr(X, Y)$ exists, $c > 0$ and $d \neq 0$. Then

$$
\Corr(cX,\ dY) = \operatorname{sign}(d)\,\Corr(X, Y).
$$

Multiplying both series by positive constants leaves the correlation unchanged. Multiplying exactly one series by a negative constant flips the sign.
:::

:::proof
Covariance scales by the product of the constants: $\Cov(cX, dY) = cd\,\Cov(X, Y)$. Because $c > 0$, the standard deviation of $cX$ is $c$ times the standard deviation of $X$. The standard deviation of $dY$ is $\abs{d}$ times the standard deviation of $Y$, the absolute value appearing because a standard deviation is a square root. Therefore

$$
\Corr(cX, dY) = \frac{cd}{c\,\abs{d}}\Corr(X, Y) = \operatorname{sign}(d)\,\Corr(X, Y),
$$

where the last step is $d/\abs{d} = \operatorname{sign}(d)$. The hypothesis that the original correlation exists is the hypothesis that both variances are positive and finite, so the scaled variances are positive too.
:::

Changing the units of a return, or quoting it as a percentage rather than a fraction, is a positive rescaling. The correlation does not notice. Changing which leg of a long-short pair is called the "left" leg can flip a sign, and the proposition says the flip is in the definition, not in the data.

:::quiz
The sample correlation of two return series is $0.4$. Every return in the first series is multiplied by $10$, and every return in the second series is multiplied by $-2$. What is the new correlation?
- [ ] $0.4$
- [ ] $-8$
- [ ] $8$
- [x] $-0.4$
:::solution
A positive scale on the first series does nothing to the correlation, by [[#prop-scale]] with $c = 10$. A negative scale on the second series flips the sign and does not change the magnitude. The new correlation is $-0.4$, not $-8$: correlation has no units to absorb the factor $20$.
:::
:::

## Lag-1 autocorrelation

The dependence a one-period rule argues about is the association between a return and the return before it.

:::definition Sample lag-1 correlation {#def-rho}
Let $R_1,\ldots,R_n$ be a return series with $n \ge 3$, and suppose the first $n-1$ values are not all equal and the last $n-1$ values are not all equal. Write

$$
\bar R_{-} = \frac{1}{n-1}\sum_{t=1}^{n-1} R_t, \qquad
\bar R_{+} = \frac{1}{n-1}\sum_{t=2}^{n} R_t.
$$

The **sample lag-1 correlation** is the ordinary correlation of the $n-1$ pairs $(R_{t-1}, R_t)$:

$$
\hat\rho_1
= \frac{\sum_{t=2}^{n}(R_{t-1} - \bar R_{-})(R_t - \bar R_{+})}
{\sqrt{\sum_{t=2}^{n}(R_{t-1} - \bar R_{-})^2\;\sum_{t=2}^{n}(R_t - \bar R_{+})^2}}.
$$

Positive $\hat\rho_1$ means that, after each leg is centred on its own mean, the products $(R_{t-1}-\bar R_{-})(R_t-\bar R_{+})$ are positive on average. Negative $\hat\rho_1$ means those products are negative on average. Under a stationary model the population version uses one variance, $\rho_1 = \Cov(R_t, R_{t-1}) / \Var(R_t)$. The sample definition above does not assume the two legs have the same variance.
:::

:::proposition Sign of the sample lag-1 correlation {#prop-sign}
In [[#def-rho]], the denominator is positive. Therefore $\hat\rho_1$ has the same sign as $\sum_{t=2}^{n}(R_{t-1}-\bar R_{-})(R_t-\bar R_{+})$, and $\hat\rho_1 = 0$ exactly when that sum is zero.
:::

:::proof
Each sum of squares in the denominator is positive because neither leg is constant, by the hypothesis in [[#def-rho]]. A square root of a positive number is positive, and a product of two positive numbers is positive. The denominator cannot flip the sign of the numerator, nor can it turn a zero numerator into a nonzero correlation. The sign of $\hat\rho_1$ is the sign of the sum of centred products, which is what the proposition says.
:::

This is the whole content of the sign. A trend hypothesis, at a named lag, is the hypothesis that this sum is positive in the population: a return above its mean tends to be followed by another return above its mean. A short-horizon reversion hypothesis is the hypothesis that the sum is negative. The two hypotheses do not contradict each other until the lag, the universe and the horizon are the same. A series can correlate positively at one lag and negatively at another, and the next example is built so that the opposition is exact.

A different convention puts one mean, the mean of all $n$ returns, into both factors, and divides by the full sum of squared deviations $\sum_{t=1}^{n}(R_t - \bar R)^2$. That is a common software autocorrelation. It is not the correlation in [[#def-rho]]. On Path A the two numbers are $-0.953430$ and $-0.833314$. Both are negative. They are not the same statistic, and a later exercise asks you to separate them on a four-point series.

:::example Lag-1 correlation of Path A {#ex-path-a}
Compute $\hat\rho_1$ for the seven exact simple returns of Path A. There are six pairs. Report the two leg means, the sum of centred products, and the correlation.
:::solution
The exact simple returns come from the price ratios $P_t/P_{t-1} - 1$. To six decimals they are the list in the opening, and the six pairs $(R_{t-1}, R_t)$ are

| pair | $R_{t-1}$ | $R_t$ |
|---|---:|---:|
| 1 | $0.020000$ | $-0.009804$ |
| 2 | $-0.009804$ | $0.029703$ |
| 3 | $0.029703$ | $-0.009615$ |
| 4 | $-0.009615$ | $0.038835$ |
| 5 | $0.038835$ | $-0.009346$ |
| 6 | $-0.009346$ | $0.037736$ |

The signs alternate, so every raw product $R_{t-1} R_t$ is already negative. Centring does not change that conclusion. The mean of the first six returns is $\bar R_{-} = 0.009962$. The mean of the last six is $\bar R_{+} = 0.012918$. Both differ from the seven-point mean $0.013930$, because the first return is missing from the second leg and the last return is missing from the first. The sum of the six centred products is $-0.002634$. By [[#prop-sign]] the correlation is negative. Its value, from the exact ratios, is

$$
\hat\rho_1 = -0.953430.
$$

The sample standard deviations of the two legs, with divisor $5$, are $0.022230$ and $0.024856$. They are close, and they are not equal, which is why a one-variance formula is a further modelling choice. Rounding each return to six decimals before the correlation changes the result only in the sixth decimal, to $-0.953429$.

Six overlapping pairs are a short sample. The returns share terms — the second return appears once as a follower and once as a leader — so the pairs are not an independent bivariate sample. A rough large-sample scale for a sample autocorrelation, under a white-noise hypothesis, is $1/\sqrt{n} = 1/\sqrt{7} \approx 0.378$. The estimate $-0.953430$ is larger in magnitude than that scale, and the scale itself is not a valid standard error here: $n$ is small, the pairs overlap, and the alternation was noticed on the same seven points. The number records the sign on this path. It does not estimate a reversion parameter for any other asset, and it is not a rule.
:::
:::

:::example Reversing one series flips the sign {#ex-reverse}
Take two lagged values $u = (0.01,\ 0.03)$ and two following values $v = (0.02,\ 0.04)$. Compute the correlation of the pairs $(0.01, 0.02)$ and $(0.03, 0.04)$. Then reverse only the following series, to $v' = (0.04,\ 0.02)$, and compute the correlation again.
:::solution
The mean of $u$ is $0.02$, so the deviations are $-0.01$ and $+0.01$. The mean of $v$ is $0.03$, so the deviations are $-0.01$ and $+0.01$. Both centred products are positive, and the two points lie on a straight line of positive slope, so the correlation is $+1$.

The reversed series $v'$ has the same mean $0.03$ and deviations $+0.01$ and $-0.01$. The centred products are now both negative, and the line slopes down, so the correlation is $-1$.

Reversing the order of the following series, while leaving the lagged series where it is, flips the sign of $\hat\rho_1$. With only two pairs, any two non-constant series have correlation $+1$ or $-1$, because two points determine a line and the sample correlation only records the sign of its slope. The example isolates that sign. It says nothing about a magnitude one might see in a market, and it is not Path A. Order reversal of the whole path is a different operation: the consecutive pairs come back with both coordinates swapped, and swapping both coordinates does not change a correlation. That fact is an exercise below, and it is why "reverse the tape" is not a way to turn a positive lag into a negative one.
:::
:::

:::example Equal weights and a chosen correlation {#ex-sum}
Let $X$ and $Y$ be hypothetical return contributions with standard deviations $0.02$ and $0.02$ and correlation $0.5$. These numbers are chosen, not estimated. Find the variance of the equal-weight sum $\tfrac12 X + \tfrac12 Y$. Compare it with correlation $0$, correlation $1$ and correlation $-1$.
:::solution
The covariance at correlation $0.5$ is $0.5 \times 0.02 \times 0.02 = 0.0002$. For weights $w_X = w_Y = \tfrac12$,

$$
\begin{align*}
\Var(w_X X + w_Y Y)
&= w_X^2 \Var(X) + w_Y^2 \Var(Y) + 2 w_X w_Y \Cov(X, Y) \\
&= \tfrac14(0.0004) + \tfrac14(0.0004) + 2\cdot\tfrac12\cdot\tfrac12\cdot 0.0002 \\
&= 0.0001 + 0.0001 + 0.0001 = 0.0003.
\end{align*}
$$

The standard deviation is $\sqrt{0.0003} \approx 0.017321$. The same arithmetic with the cross term removed or replaced gives:

- correlation $0$: variance $0.0002$, standard deviation $\sqrt{0.0002} \approx 0.014142$;
- correlation $1$: variance $0.0004$, standard deviation $0.02$, the same as each piece, because the two pieces are then identical up to a shift of mean;
- correlation $-1$: variance $0$.

The last line is [[#prop-var-sum]] with a covariance exactly large enough to cancel the two variance terms. It is an algebraic identity under an assumption we typed in. It is not an estimate from Path A, and it is not evidence that any traded pair offsets.
:::
:::

:::example Two lags, two signs {#ex-two-lags}
Let the constructed series be $1, 2, 1, 2, 1, 2$. It is not a return series from a market. Compute the sample lag-1 correlation and the sample lag-2 correlation, defined in the same way as [[#def-rho]] on the pairs $(x_t, x_{t+2})$.
:::solution
The lag-1 pairs are $(1, 2)$, $(2, 1)$, $(1, 2)$, $(2, 1)$, $(1, 2)$. Whenever the first coordinate is the smaller value, the second is the larger, and conversely. The centred products are all negative and the points lie on a line of slope $-1$, so $\hat\rho_1 = -1$.

The lag-2 pairs are $(1, 1)$, $(2, 2)$, $(1, 1)$, $(2, 2)$. The two coordinates are equal in every pair, so the lag-2 correlation is $+1$.

One series carries both signs. A sentence such as "the series is persistent" is unfinished until it names the lag. The trend hypothesis taken up in [[trend/the-trend-hypothesis]] and the short-horizon reversion hypothesis taken up in [[reversion/the-reversion-hypothesis]] are hypotheses about different lags, different universes, or both. Path A was only a lag-1 calculation, on seven points, with a negative sign. It does not referee either hypothesis.
:::
:::

:::intuition Order is not a moment of one margin
The mean and the variance are computed from the list $\{R_t\}$ as a set of values with multiplicities. Any shuffle of Path A has the same sample mean and the same sample variance. The lag-1 correlation of [[#def-rho]] uses pairs, so a shuffle generally changes it. A histogram of returns, however well it matches a normal curve, has thrown away the pairs. Dependence is invisible in that picture.
:::

:::widget distribution
dist: normal
params: mu=0.013930, sigma=0.022848
a: -0.01
b: 0.04
caption: A normal curve with Path A's sample mean and sample standard deviation. The shaded band is only a region of that marginal model. The curve does not know that consecutive returns on the path alternated in sign.
:::

:::warning A large correlation on a short path
The value $-0.953430$ looks decisive because it is close to $-1$. It is computed from six overlapping pairs on a path that alternates by inspection. Replacing the lag, extending the path, or reordering the same seven numbers can move it. [[#prop-scale]] says a change of units will not. Readers sometimes annualise $\bar R / s$ on the same seven points; that mistake lives in the performance course, and it is the same habit of treating a toy sample as a stable parameter. Do not promote $-0.953430$ into a reversion speed, and do not trade against the last move because a textbook path alternated.
:::

:::application What the sign is evidence for
A positive population lag-1 correlation is the statistical shadow of a one-period trend claim: the sign of a centred return tends to persist for one step. A negative population lag-1 correlation is the shadow of a one-period reversion claim. "Shadow" is the right word. A correlation is not a weight, not an order, and not a costed backtest. Estimating it on a long weekly equity series is what a variance-ratio statistic also probes, more efficiently; the 1988 result below used that statistic. This chapter stops at the correlation the later hypotheses have to name.
:::

:::remark Two conventions, one path
On Path A the pair-correlation of [[#def-rho]] is $-0.953430$, and the full-mean autocorrelation that uses $\bar R = 0.013930$ in both factors and the seven-point sum of squares in the denominator is $-0.833314$. Software that prints "acf" is often computing the second. Quote the formula with the number. The sign agrees here. Agreement of sign is not identity of the statistic, and on a short series the two denominators can disagree by a lot, as the exercise on $(0, 1, 2, 0)$ shows.
:::

:::history
In 1988 Andrew W. Lo and A. Craig MacKinlay rejected the random-walk hypothesis for weekly US stock returns with a variance-ratio test. Dependence of that kind can be statistically detectable and still economically small. A lag-1 correlation is the simplest dependence a one-period rule is pointing at. Detecting a departure from zero, in a long sample, under a test that was specified in advance, is not a decision to trade, and the seven-point estimate in [[#ex-path-a]] is not that detection.
:::

## Where this leads

The next chapter turns the pair $(s_t, R_{t+1})$ into a line, with the signal required to be known at $t$. That is [[statistics/regression-on-a-signal]]. Stationarity, which this chapter used as a parenthetical when it wrote a population $\rho_1$, is [[statistics/stationarity-and-regimes]]. The two signs of $\hat\rho_1$, at named horizons, are the hypotheses of [[trend/the-trend-hypothesis]] and [[reversion/the-reversion-hypothesis]]. The standard error of a mean, and why seven observations do not support an annualised ratio, is [[performance/uncertainty-of-performance]].

:::summary
- Expectation and variance describe a return after its order has been discarded. On Path A they are $0.013930$ and $0.022848^2$, with divisor $n-1$.
- $\Var(X+Y) = \Var(X) + \Var(Y) + 2\Cov(X, Y)$. A negative covariance shrinks the variance of a sum. The identity is not a hedge.
- Correlation is unchanged by positive rescaling and flips sign if exactly one argument is multiplied by a negative constant.
- The sample lag-1 correlation is the correlation of the pairs $(R_{t-1}, R_t)$. Its sign is the sign of the sum of centred products.
- On Path A that correlation is $-0.953430$, from six overlapping pairs. The estimate is noisy, and it is not a trading rule.
- Reversing the following series, and not the whole tape, flips the sign in a two-point illustration. Both signs can occur at two lags of one series.
- A marginal normal curve with Path A's mean and standard deviation does not display this dependence.
:::

## Exercises

:::exercise Three returns {#exr-three level=1 check="0.01"}
The simple returns $0.02$, $-0.01$ and $0.02$ are not Path A. Compute their sample mean. (Enter the sample mean.)
:::solution
The sum is $0.02 - 0.01 + 0.02 = 0.03$, and $0.03/3 = 0.01$. The order is irrelevant for the mean. The sample mean is $0.01$.
:::
:::

:::exercise Sign on three points {#exr-sign level=1 check="-1"}
For the series $1, 3, 2$, compute the sample lag-1 correlation. There are two pairs. (Enter the correlation.)
:::solution
The pairs are $(1, 3)$ and $(3, 2)$. The lagged mean is $(1+3)/2 = 2$, so the lagged deviations are $-1$ and $+1$. The following mean is $(3+2)/2 = 2.5$, so the following deviations are $+0.5$ and $-0.5$. The centred products are $-0.5$ and $-0.5$, and the points lie on a downward line. The correlation is $-1$.
:::
:::

:::exercise Variance of a sum {#exr-var level=1 check="11"}
Suppose $\Var(X) = 4$, $\Var(Y) = 9$ and $\Cov(X, Y) = -1$, with all three moments finite. Compute $\Var(X+Y)$. (Enter the variance.)
:::solution
By [[#prop-var-sum]], $\Var(X+Y) = 4 + 9 + 2(-1) = 11$. The negative covariance reduces the variance of the sum from $13$ to $11$. It does not make the variance negative. The variance is $11$.
:::
:::

:::exercise A four-point correlation {#exr-four level=2 check="-1/2"}
Compute the sample lag-1 correlation of $0, 1, 2, 0$ by the definition in [[#def-rho]]. (Enter the correlation as a fraction.)
:::solution
The pairs are $(0, 1)$, $(1, 2)$ and $(2, 0)$. The lagged mean is $(0+1+2)/3 = 1$, with deviations $-1$, $0$, $+1$. The following mean is $(1+2+0)/3 = 1$, with deviations $0$, $+1$, $-1$. The centred products are $0$, $0$ and $-1$, so the numerator is $-1$. Each sum of squares equals $1 + 0 + 1 = 2$, so the denominator is $\sqrt{2 \times 2} = 2$. The correlation is $-1/2$.
:::
:::

:::exercise Plug in the correlation {#exr-plug level=2 check="0.0003"}
Repeat the equal-weight calculation of [[#ex-sum]] with standard deviations $0.02$ and $0.02$ and correlation $0.5$. (Enter the variance of the equal-weight sum.)
:::solution
The covariance is $0.0002$. The variance is

$$
\tfrac14(0.0004) + \tfrac14(0.0004) + \tfrac12(0.0002) = 0.0003.
$$

The cross term contributes the third $0.0001$. The variance is $0.0003$.
:::
:::

:::exercise The other lag {#exr-lag2 level=2 check="1"}
For the constructed series $1, 2, 1, 2, 1, 2$, compute the sample lag-2 correlation. (Enter the correlation.)
:::solution
The lag-2 pairs are $(1, 1)$, $(2, 2)$, $(1, 1)$ and $(2, 2)$, as in [[#ex-two-lags]]. The two coordinates match in every pair, so the correlation is $1$. The lag-1 correlation of the same series is $-1$. The answer asked for is the lag-2 value, $1$.
:::
:::

:::exercise Reversing the tape {#exr-tape level=3}
Let $x_1,\ldots,x_n$ be a series whose sample lag-1 correlation exists. Let $y_t = x_{n+1-t}$ be the time-reversed series. Prove that the sample lag-1 correlation of $y$ equals the sample lag-1 correlation of $x$.
:::hint
List the consecutive pairs of $y$. Each of them is an original consecutive pair with the two coordinates swapped, written in reverse order. Correlation does not care about that order, and it is symmetric in the two coordinates.
:::
:::solution
The consecutive pairs of $x$ are $(x_1, x_2), (x_2, x_3), \ldots, (x_{n-1}, x_n)$. The consecutive pairs of $y$ are $(x_n, x_{n-1}), (x_{n-1}, x_{n-2}), \ldots, (x_2, x_1)$. That is the same collection of points with the coordinates swapped and the list reversed. Reversing a list does not change a sample correlation. Swapping the two coordinates of every point replaces $\Corr(U, V)$ by $\Corr(V, U)$, which is the same number whenever either exists. Therefore the sample lag-1 correlation is exactly invariant under time reversal. It does not flip. The sign flip in [[#ex-reverse]] came from reversing only one of the two series, not from playing the tape backwards.
:::
:::

:::exercise Two formulas on one series {#exr-acf level=3 check="-13/44"}
For $x = (0, 1, 2, 0)$, the pair-correlation of [[#def-rho]] is $-1/2$, from [[#exr-four]]. Now compute the full-mean autocorrelation

$$
\frac{\sum_{t=2}^{4}(x_t - \bar x)(x_{t-1} - \bar x)}{\sum_{t=1}^{4}(x_t - \bar x)^2},
$$

where $\bar x$ is the mean of all four points. (Enter the value as a fraction.)
:::hint
The four-point mean is $3/4$, not the leg mean $1$ used in the Pearson calculation. Square the four deviations for the denominator, and do not replace that denominator by a product of two separate leg norms.
:::
:::solution
The mean is $\bar x = (0+1+2+0)/4 = 3/4$. The deviations of $(x_1, x_2, x_3, x_4)$ from $3/4$ are $-3/4$, $1/4$, $5/4$, $-3/4$. The numerator uses the three consecutive products

$$
\bigl(\tfrac14\bigr)\bigl(-\tfrac34\bigr) + \bigl(\tfrac54\bigr)\bigl(\tfrac14\bigr) + \bigl(-\tfrac34\bigr)\bigl(\tfrac54\bigr)
= -\tfrac{3}{16} + \tfrac{5}{16} - \tfrac{15}{16} = -\tfrac{13}{16}.
$$

The denominator is

$$
\bigl(-\tfrac34\bigr)^2 + \bigl(\tfrac14\bigr)^2 + \bigl(\tfrac54\bigr)^2 + \bigl(-\tfrac34\bigr)^2
= \tfrac{9}{16} + \tfrac{1}{16} + \tfrac{25}{16} + \tfrac{9}{16} = \tfrac{44}{16} = \tfrac{11}{4}.
$$

The ratio is $(-13/16) / (11/4) = -13/44$. This is not $-1/2$. Both formulas are autocorrelations. They centre the series differently and they normalise differently. On a short series the numerical gap is part of the answer, not a rounding error. The value is $-13/44$.
:::
:::
