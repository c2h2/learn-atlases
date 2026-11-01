A mean does not use a signal. The claim behind a rule is that some number available at the decision time lines up with the return earned after that time. Written as a line, the claim is

$$
R_{t+1} = a + b\, s_t + \varepsilon_{t+1},
$$

with the subscript on $s$ doing as much work as the slope. This chapter fits that line by least squares, on numbers small enough to check by hand, and separates the fit from a forecast. The proof that the line minimises the sum of squared residuals lives in the Maths Atlas, in [simple linear regression](/learn/maths/lesson.php?c=statistics&l=regression) and in [least squares](/learn/maths/lesson.php?c=linear-algebra&l=least-squares). What is derived here is the clock: which variable is allowed to sit on the right-hand side. The fit is not a recommendation to trade the signal.

## A signal dated $t$

The decision clock of the atlas is fixed in [[markets/systematic-question]]. A feature dated $t$ may use prices up to time $t$. It earns the return realised after $t$. For a close-to-close simple return that return is $R_{t+1} = P_{t+1}/P_t - 1$, not $R_t$. The product of a signal with a return is legal only when the signal is the earlier of the two.

:::definition Lagged signal regression {#def-lag-reg}
Let $s_t$ be a signal known at time $t$, and let $R_{t+1}$ be the simple return earned from $t$ to $t+1$. The **lagged signal regression** on a sample of $n \ge 3$ decision times is the model

$$
R_{t+1} = a + b\, s_t + \varepsilon_{t+1},
$$

fitted by least squares of the observed next returns on the observed signals and a constant. The signal must be a function of information available at $t$. The disturbance $\varepsilon_{t+1}$ is whatever the line does not capture. No assumption is made yet that the disturbances are independent, normal, or of constant variance. Those assumptions are what a later standard error would need, and they are not granted by writing the equation down.
:::

The population reading, when one is willing to state it, is that $a + b s_t$ is the conditional expectation of $R_{t+1}$ given the signal. The sample reading is more modest: $a$ and $b$ are the numbers that make the line as close as possible to the observed pairs in the least-squares sense. Closeness in sample is not a Sharpe ratio, and it is not evidence about the next sample.

Recall the formulas, under the assumption that the signals are not all equal. With pairs $(s_i, y_i)$ for $i = 1,\ldots,n$, write $\bar s$ and $\bar y$ for the two sample means and

$$
S_{ss} = \sum_{i=1}^n (s_i - \bar s)^2, \qquad
S_{sy} = \sum_{i=1}^n (s_i - \bar s)(y_i - \bar y), \qquad
S_{yy} = \sum_{i=1}^n (y_i - \bar y)^2.
$$

The Maths Atlas proves that the unique minimiser of $\sum_i (y_i - a - b s_i)^2$ is

$$
\hat b = \frac{S_{sy}}{S_{ss}}, \qquad \hat a = \bar y - \hat b\, \bar s.
$$

The fitted values are $\hat y_i = \hat a + \hat b\, s_i$, and the residuals are $e_i = y_i - \hat y_i$. This chapter uses those formulas and does not re-prove them.

:::definition Residual and coefficient of determination {#def-r2}
For a lagged signal regression with an intercept and with $S_{yy} > 0$, the **residual sum of squares** and the **coefficient of determination** are

$$
\mathrm{SSE} = \sum_{i=1}^n e_i^2, \qquad
R^2 = 1 - \frac{\mathrm{SSE}}{S_{yy}} = \frac{S_{sy}^2}{S_{ss}\, S_{yy}}.
$$

$R^2$ is the fraction of the sample variance of the next return that is linearly associated with the signal, in this sample. It lies in $[0, 1]$ for a regression with an intercept. It is not a mean return, not a correlation with a bank account, and not a Sharpe ratio. For this one-signal regression it equals the square of the sample correlation between $s$ and the next return, so it discards the sign of $\hat b$.
:::

The sign of the slope is the part a rule would care about, and $R^2$ has thrown it away. A slope of $-0.01$ and a slope of $+0.01$ can share an $R^2$. Reporting only $R^2$ hides which way the line points.

:::proposition Rescaling the signal {#prop-rescale}
Suppose a lagged regression has $S_{ss} > 0$, and replace the signal by $s'_t = c\, s_t$ with $c > 0$. The least-squares intercept is unchanged, the slope is divided by $c$, and $R^2$ is unchanged.
:::

:::proof
The formulas recalled above are the starting point; their derivation is the least-squares theorem in the Maths Atlas. Deviations of $s'$ are $c$ times deviations of $s$, so $S_{s's'} = c^2 S_{ss}$ and $S_{s'y} = c\, S_{sy}$. The new slope is

$$
\hat b' = \frac{c\, S_{sy}}{c^2 S_{ss}} = \frac{1}{c}\hat b.
$$

The new signal mean is $c\, \bar s$, so

$$
\hat a' = \bar y - \hat b' (c\, \bar s) = \bar y - \hat b\, \bar s = \hat a.
$$

The coefficient of determination is $S_{sy}^2 / (S_{ss} S_{yy})$. Numerator and the $S_{ss}$ factor in the denominator both pick up $c^2$, which cancels. Equivalently, $R^2$ is the square of a correlation, and a positive rescaling does not change a correlation, by the scaling result in [[statistics/moments-and-dependence]]. Multiplying a signal by $100$ to make a slope look smaller, or by $0.01$ to make it look larger, does not create a better in-sample fit.
:::

## Look-ahead

Replacing $s_t$ by a variable dated $t+1$ is not a cosmetic change of index. The return $R_{t+1}$ already depends on $P_{t+1}$. A regressor that also depends on $P_{t+1}$ is using the price the return is built from.

:::proposition Same-date regressor {#prop-lookahead}
Let $R_1,\ldots,R_n$ be returns that are not all equal, and consider the simple regression of $R_i$ on $R_i$ itself, with an intercept. The unique least-squares fit is $\hat a = 0$, $\hat b = 1$, every residual is $0$, and $R^2 = 1$. If the object being described is the return earned after time $t$, a decision that may use only information available at $t$ cannot use $R_{t+1}$ as the regressor.
:::

:::proof
The line $a = 0$, $b = 1$ gives residual $R_i - R_i = 0$ for every $i$. The sum of squared residuals is $0$. No other line can do better, because a sum of squares cannot be negative. For uniqueness, suppose $a + b R_i = R_i$ for every $i$. Then $a + (b - 1) R_i = 0$ for every $i$. If $b \neq 1$, every $R_i$ equals $-a/(b-1)$, contradicting the hypothesis that the returns are not all equal. Hence $b = 1$, and then $a = 0$.

The clock half is the definition of the decision time, not an extra algebraic identity. The simple return $R_{t+1} = P_{t+1}/P_t - 1$ depends on $P_{t+1}$. Information dated $t$ may use prices up to $t$ and earns $R_{t+1}$ afterwards, which is the convention in [[markets/systematic-question]]. A regressor equal to $R_{t+1}$ is not available when the decision is made. Fitting it produces the perfect line just derived, which describes an identity, not a forecast.
:::

:::corollary Affine look-ahead {#cor-affine}
Under the same hypotheses, if the regressor is $s_i = c + d R_i$ with $d \neq 0$, the unique least-squares fit of $R_i$ on $s_i$ has residuals identically zero, $R^2 = 1$, slope $1/d$ and intercept $-c/d$.
:::

:::proof
Solve the affine relation for the return: $R_i = -c/d + (1/d)\, s_i$. That line fits every observation exactly, so the residual sum of squares is zero and $R^2 = 1$. The signals are not all equal, because the returns are not all equal and $d \neq 0$, so the least-squares slope and intercept are unique by the same theorem that gives $\hat b = S_{sy}/S_{ss}$. Any signal that is an invertible affine function of the return it is supposed to forecast will look perfect in sample. The perfection is the look-ahead, visible in the algebra.
:::

A raw same-bar return is the obvious illegal regressor. The corollary is the less obvious one: a "feature" built from today's close, plugged in beside the return from yesterday's close to today's close, can still be an affine function of that return. The test is the date of the last price the feature uses, not the name of the feature.

:::quiz
In the lagged model $R_{t+1} = a + b s_t + \varepsilon_{t+1}$, which regressor respects the decision clock?
- [ ] $s_{t+1}$, because it is closer to the return being explained.
- [ ] $R_{t+1}$ itself, because [[#prop-lookahead]] gives $R^2 = 1$, and a larger $R^2$ is a better forecast.
- [x] $s_t$, a function of information available at $t$.
- [ ] The average of $s_t$ and $R_{t+1}$, because the average of a legal signal and an illegal one is half legal.
:::solution
The return on the left is realised after $t$. The only regressor among the options that is required to be known at $t$ is $s_t$. A perfect $R^2$ from regressing $R_{t+1}$ on itself is the identity in [[#prop-lookahead]], not a forecast. An average that still depends on $R_{t+1}$ is still dated after the decision.
:::
:::

## Four pairs, fitted by hand

The worked sample is invented. The signal takes the values $0, 1, 2, 3$. The next-period return takes the values $0.02, 0.00, 0.01, 0.05$. Nothing in the four pairs is a market, and the slope is not a position.

:::example Least squares on four pairs {#ex-four}
Fit $y = a + b s$ to the pairs $(s, y) = (0, 0.02),\ (1, 0.00),\ (2, 0.01),\ (3, 0.05)$. Report $\hat a$, $\hat b$, the four residuals and $R^2$.
:::solution
The signal mean is $\bar s = (0+1+2+3)/4 = 1.5$. The return mean is $\bar y = (0.02 + 0.00 + 0.01 + 0.05)/4 = 0.08/4 = 0.02$. Signal deviations are $-1.5, -0.5, +0.5, +1.5$, and

$$
S_{ss} = (-1.5)^2 + (-0.5)^2 + (0.5)^2 + (1.5)^2 = 2.25 + 0.25 + 0.25 + 2.25 = 5.
$$

Return deviations from $0.02$ are $0, -0.02, -0.01, +0.03$. The cross sum is

$$
S_{sy} = (-1.5)(0) + (-0.5)(-0.02) + (0.5)(-0.01) + (1.5)(0.03) = 0 + 0.01 - 0.005 + 0.045 = 0.05.
$$

Hence $\hat b = 0.05 / 5 = 0.01$ and $\hat a = 0.02 - 0.01 \times 1.5 = 0.005$. The fitted values $0.005 + 0.01 s$ are $0.005, 0.015, 0.025, 0.035$. The residuals are

$$
\begin{align*}
0.02 - 0.005 &= 0.015, \\
0.00 - 0.015 &= -0.015, \\
0.01 - 0.025 &= -0.015, \\
0.05 - 0.035 &= 0.015.
\end{align*}
$$

They sum to zero, which is the intercept's normal equation and a useful arithmetic check. The residual sum of squares is $4 \times (0.015)^2 = 4 \times 0.000225 = 0.0009$. The total sum of squares is

$$
S_{yy} = 0^2 + (-0.02)^2 + (-0.01)^2 + (0.03)^2 = 0.0004 + 0.0001 + 0.0009 = 0.0014.
$$

Therefore $R^2 = 1 - 0.0009/0.0014 = 0.0005/0.0014 = 5/14 \approx 0.357143$. About a third of the in-sample variance of these four returns lies along the signal. Two-thirds does not. The slope is positive and small: one extra unit of signal lines up, in this sample, with one extra percentage point of next return. That sentence is a description of four typed-in pairs. It is not a prediction interval, and it is not a weight.
:::
:::

:::widget regression
points: 0,0.02; 1,0; 2,0.01; 3,0.05
degree: 1
residuals: true
caption: The four invented pairs from the worked fit. The line is least squares of a later return on a signal. Drag a point and both the slope and $R^2$ move. The picture is in-sample, and $R^2$ here is not a Sharpe ratio.
:::

:::example The same returns, used twice {#ex-illegal}
Take the four next returns $0.02, 0.00, 0.01, 0.05$ and regress each of them on itself. Report the fit, then say why the same four numbers, as a signal dated one step earlier, would be a different regression.
:::solution
The returns are not all equal. By [[#prop-lookahead]] the fit is $\hat a = 0$, $\hat b = 1$, every residual is $0$ and $R^2 = 1$. Numerically, $S_{sy} = S_{ss} = S_{yy}$, so the slope formula returns $1$, and the intercept formula returns $\bar y - \bar y = 0$.

If those same four numbers had been known one decision earlier — if they were $s_t$ and the left-hand side were a later return — the regression would be the lagged model of [[#def-lag-reg]], and $R^2 = 1$ would be a genuine in-sample association rather than an identity. The algebra cannot see the difference. The dates can. Writing $R_{t+1}$ on both sides dates the regressor at $t+1$. The perfect fit is the symptom, not a performance statistic.
:::
:::

:::example Path A, lagged and in sample {#ex-path}
Using the exact simple returns of Path A, regress each return on the previous return. There are six pairs. Report $\hat a$, $\hat b$ and $R^2$ to six decimals, and the residuals to six decimals.
:::solution
The seven exact simple returns, to six decimals, are $0.020000$, $-0.009804$, $0.029703$, $-0.009615$, $0.038835$, $-0.009346$, $0.037736$, as in [[statistics/moments-and-dependence]]. The lagged regression has six pairs. Least squares on the exact ratios gives

$$
\hat a = 0.023538, \qquad \hat b = -1.066049, \qquad R^2 = 0.909028.
$$

The fitted values, to six decimals, are $0.002217$, $0.033990$, $-0.008127$, $0.033789$, $-0.017862$, $0.033501$. The residuals, to six decimals, are $-0.012021$, $-0.004287$, $-0.001489$, $0.005046$, $0.008516$, $0.004235$. They sum to zero at that precision. Starting from the six-decimal returns instead of the exact ratios changes $R^2$ only in the sixth decimal.

$R^2 = 0.909028$ is the square of the lag-1 correlation $-0.953430$. The slope is negative because that correlation is negative: on this path a high return is followed, in sample, by a low one. The classical $t$ statistic on the slope would look enormous and is not reported as a p-value. Its reference distribution assumes independent disturbances. Consecutive pairs of returns overlap, so the disturbances in this regression are not independent, and six points are not a large sample. The fit is a description of Path A. [[#def-r2]] forbids reading $0.909028$ as a Sharpe ratio. The performance course already records how misleading an annualised ratio of the same seven returns would be.
:::
:::

:::example A signal that does not vary {#ex-flat}
Suppose the signal is $1, 1, 1, 1$ and the next returns are $0.02, 0.00, 0.01, 0.05$. What happens to the slope formula?
:::solution
Every signal deviation is $0$, so $S_{ss} = 0$. The formula $\hat b = S_{sy}/S_{ss}$ divides by zero. The hypothesis of the least-squares theorem — that the regressor is not constant — fails, and there is no unique slope. Every line $y = \bar y + b(s - \bar s)$ collapses to the horizontal line $y = 0.02$, because $s - \bar s = 0$, and every such $b$ produces the same fitted values. The residuals are the return deviations $0, -0.02, -0.01, 0.03$, and $R^2 = 0$ if one still computes $1 - \mathrm{SSE}/S_{yy}$, since the line explains nothing beyond the mean. A signal that is constant on the sample cannot be credited with a slope. This is a degeneracy, not a slope of zero. A slope of zero would require $S_{ss} > 0$ and $S_{sy} = 0$.
:::
:::

:::intuition The line passes through the means
The intercept formula $\hat a = \bar y - \hat b\, \bar s$ is the statement that $(\bar s, \bar y)$ lies on the fitted line. In the four-pair example, the point $(1.5, 0.02)$ satisfies $0.005 + 0.01 \times 1.5 = 0.02$. If a plotted line misses the point of means, the arithmetic has gone wrong, or the regression was run without an intercept. This chapter always includes the intercept. A regression forced through the origin is a different model, and a signal with mean zero is the only case in which the two models share a slope.
:::

:::warning $R^2$ is not a Sharpe ratio
An in-sample $R^2$ answers a narrow question: of the squared deviations of these next returns from their own mean, what fraction lies along these signals? Path A's lagged regression answers $0.909028$ on six pairs. The four-pair example answers $5/14$. Neither number is a mean excess return, neither is divided by a standard deviation of a profit-and-loss series, and neither subtracts a cost. A high $R^2$ from a same-date regressor, as in [[#prop-lookahead]], is the highest possible value and the worst possible research error. Choosing the signal, the lag, or the sample because $R^2$ came out large is a search, and the next chapter treats the search as part of the claim.
:::

:::application What the slope is allowed to mean
Inside one pre-specified sample, $\hat b$ is the in-sample change in next return per unit of signal, holding the intercept free. It becomes a research object only when $s_t$ was fixed before the next returns were examined, in the sense of [[#def-lag-reg]]. A positive estimate is then the sample shadow of "this signal lines up with the subsequent return". It is still not a weight. Mapping a signal to a weight is a further function, and it is not estimated by the regression unless that map is the thing being fitted. Costs, delays and the difference between a close and a fill are outside the four pairs. They will move a traded result even when $\hat b$ is left untouched.
:::

:::remark Residuals sum to zero, and that is not a diagnosis
With an intercept, $\sum_i e_i = 0$ and $\sum_i s_i e_i = 0$, because those are the normal equations. The four residuals $0.015, -0.015, -0.015, 0.015$ pass both checks: the sum is zero, and the signal-weighted sum is $0(0.015) + 1(-0.015) + 2(-0.015) + 3(0.015) = 0$. The checks confirm arithmetic. They cannot confirm the decision clock, and they cannot confirm that the disturbances are independent. A residual plot against time can show a run of signs that the normal equations do not forbid, because the normal equations constrain a sum, not the order.
:::

:::quiz
The four-pair fit has $R^2 = 5/14$ and slope $0.01$. Which conclusion is justified by those two numbers alone?
- [ ] The signal should be traded with weight proportional to $0.01$.
- [ ] The Sharpe ratio of the signal is $5/14$.
- [x] In this sample, the least-squares line accounts for $5/14$ of the squared deviations of the next return from its mean.
- [ ] The same $R^2$ will be obtained on the next four periods.
:::solution
[[#def-r2]] is an in-sample variance fraction. It does not specify a weight, it is not a Sharpe ratio, and nothing in the fit extends it to a later sample. The slope's sign and size are a separate report from $R^2$.
:::
:::

:::history
In 1970 Eugene F. Fama's review organised the evidence on whether prices reflect information, and named the weak, semi-strong and strong forms that later empirical work argues with. A lagged regression is one of the shapes that argument takes. Under a strict reading of the weak form, a signal built only from past prices should have slope zero in [[#def-lag-reg]]. Estimating the slope, and discovering that a search over signals can manufacture a nonzero one, are different activities. The second is the subject of the next chapter. The 1970 review is not a fitted line, and this chapter does not attribute a numerical slope to it.
:::

## Where this leads

The $t$ statistic on a mean, and the damage done by fitting many signals and keeping the winner, are [[statistics/testing-and-snooping]]. Dependence between $R_t$ and $R_{t-1}$, which the Path A slope is made of, is [[statistics/moments-and-dependence]]. A same-bar backtest is the clock error of [[#prop-lookahead]] in the form it usually takes in a research pipeline; the backtesting course treats that pipeline in [[backtesting/timing-costs-and-biases]]. The least-squares theorem used here, including the normal equations and the geometry of residuals, stays in the Maths Atlas.

:::summary
- The research regression is $R_{t+1} = a + b s_t + \varepsilon_{t+1}$, with $s_t$ known at $t$. The subscript is the decision clock.
- Least squares gives $\hat b = S_{sy}/S_{ss}$ and $\hat a = \bar y - \hat b\, \bar s$ when the signals are not all equal. The proof is in the Maths Atlas; this chapter applies it.
- On the four invented pairs, $\hat a = 0.005$, $\hat b = 0.01$, the residuals are $\pm 0.015$, and $R^2 = 5/14$.
- Positive rescaling of the signal divides the slope by the same constant and leaves the intercept and $R^2$ unchanged.
- Regressing a return on itself gives $\hat a = 0$, $\hat b = 1$ and $R^2 = 1$. That fit is an identity, not a forecast. Any affine function of the same return does the same.
- Path A's lagged regression has slope $-1.066049$ and $R^2 = 0.909028$ on six overlapping pairs. The $R^2$ is not a Sharpe ratio, and the classical slope $t$ statistic is not a valid p-value here.
- A constant signal makes $S_{ss} = 0$. The slope is then undefined, which is not the same thing as a slope of zero.
:::

## Exercises

:::exercise The slope from the cross sum {#exr-slope level=1 check="0.01"}
In the four-pair example, $S_{sy} = 0.05$ and $S_{ss} = 5$. Compute $\hat b$. (Enter the slope.)
:::solution
$\hat b = S_{sy}/S_{ss} = 0.05/5 = 0.01$. The slope is $0.01$.
:::
:::

:::exercise The intercept {#exr-intercept level=1 check="0.005"}
The four next returns have mean $0.02$, the signals have mean $1.5$, and $\hat b = 0.01$. Compute $\hat a$. (Enter the intercept.)
:::solution
$\hat a = \bar y - \hat b\, \bar s = 0.02 - 0.01 \times 1.5 = 0.02 - 0.015 = 0.005$. The intercept is $0.005$.
:::
:::

:::exercise One residual {#exr-resid level=1 check="0.015"}
The fitted value at $s = 0$ is $0.005$, and the observed next return is $0.02$. Compute the residual. (Enter the residual.)
:::solution
The residual is observed minus fitted: $0.02 - 0.005 = 0.015$. The residual is $0.015$.
:::
:::

:::exercise The variance fraction {#exr-r2 level=2 check="5/14"}
For the same four pairs, $\mathrm{SSE} = 0.0009$ and $S_{yy} = 0.0014$. Compute $R^2$ as a fraction in lowest terms. (Enter the fraction.)
:::solution
$R^2 = 1 - 0.0009/0.0014 = 0.0005/0.0014 = 5/14$. The fraction is already in lowest terms, since $5$ and $14$ share no divisor greater than $1$. The value is $5/14$.
:::
:::

:::exercise Sum of squared residuals {#exr-sse level=2 check="0.0009"}
The four residuals are $0.015, -0.015, -0.015, 0.015$. Compute $\mathrm{SSE}$. (Enter the sum of squares.)
:::solution
Each square is $0.000225$, and there are four of them: $4 \times 0.000225 = 0.0009$. The signs disappear when the residuals are squared, which is why two positive and two negative residuals of equal magnitude contribute the same sum of squares as four positive ones. The sum of squares is $0.0009$.
:::
:::

:::exercise Double the signal {#exr-double level=2 check="0.005"}
Start from $\hat b = 0.01$ on the four-pair sample. Replace every signal by twice itself, leaving the next returns unchanged. What is the new slope? (Enter the slope.)
:::solution
By [[#prop-rescale]] with $c = 2$, the slope is divided by $2$. The new slope is $0.01/2 = 0.005$. The intercept stays $0.005$, and $R^2$ stays $5/14$. A larger signal unit buys a smaller slope and no extra fit.
:::
:::

:::exercise Prove the identity fit {#exr-identity level=3}
Let $R_1,\ldots,R_n$ be returns that are not all equal. Prove that the unique least-squares line for regressing $R_i$ on $R_i$ is $0 + 1 \cdot R_i$, and conclude that $R^2 = 1$.
:::hint
A sum of squares is at least zero. Exhibit a line that attains zero, then show that any other perfect line would force the returns to be constant.
:::
:::solution
The line $a = 0$, $b = 1$ has residual $0$ at every observation, so its sum of squared residuals is $0$. Any competing line has sum of squared residuals at least $0$, so this line is a minimiser. If $a + b R_i = R_i$ for all $i$, then $a + (b-1)R_i = 0$ for all $i$. The returns are not all equal, so the coefficient of $R_i$ must vanish: $b = 1$, and then $a = 0$. The zero residual vector gives $\mathrm{SSE} = 0$. Since the returns are not all equal, $S_{yy} > 0$, and $R^2 = 1 - 0/S_{yy} = 1$. This is [[#prop-lookahead]] without the clock paragraph. The clock is what stops the identity being reported as a forecast.
:::
:::

:::exercise A signal with no variation {#exr-constant level=3 check="0"}
The signal takes the value $1$ at each of four decision times, and the next returns are not all equal. Compute $S_{ss}$. Then explain, in one further sentence, why the least-squares slope is undefined rather than zero. (Enter $S_{ss}$.)
:::hint
$S_{ss}$ is a sum of squared deviations from the signal mean. A slope of zero is what the formula returns when the cross sum is zero and the signal sum of squares is positive.
:::
:::solution
The signal mean is $1$, and every deviation is $0$. Hence $S_{ss} = 0 + 0 + 0 + 0 = 0$. The slope formula divides by $S_{ss}$, so it does not return a number. A slope of zero would be the case $S_{sy} = 0$ with $S_{ss} > 0$: the signal varies, and the centred signal is orthogonal to the centred return. A constant signal never reaches that case. The value of $S_{ss}$ is $0$.
:::
:::
