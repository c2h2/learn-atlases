Equal weight gives every active name the same fraction of the book. That is a map, and it ignores a fact the researcher may already have written down: the names are not equally noisy. Inverse volatility and volatility targeting both divide by a risk estimate. They do not answer the same question. Inverse volatility sets relative sizes. A volatility target sets the scale of the whole book, after some relative map has already been chosen. Mixing the two up is how a specification drifts without anyone editing the signal.

The numbers below are formulas in a research note. A scale, including a scale above one, is not a suggestion to borrow, and it is not a forecast of a return.

## Relative size

Let $\sigma_i > 0$ be a volatility estimate for name $i$, already in hand at the decision time. This chapter does not rebuild the estimator. When the estimate is a sample standard deviation of simple returns, the specification has to say whether the divisor is $n$ or $n-1$, and whether the series was annualised by $\sqrt{252}$ or left per step. In the arithmetic below the volatilities are given, so no divisor and no annualisation factor are hiding inside them. [[performance/volatility-and-drawdown]] is where those choices are defined.

:::definition Inverse-volatility weights {#def-invvol}
Given $\sigma_i > 0$ and a gross budget $g > 0$ that the risky weights will sum to in absolute value, the **inverse-volatility weights** are

$$
w_i = g \cdot \frac{1/\sigma_i}{\sum_j 1/\sigma_j},
$$

when every weight is required to be non-negative. The raw scores $1/\sigma_i$ are not weights. The denominator is the map.
:::

The budget $g$ in [[#def-invvol]] is the same kind of object as the gross budget in [[portfolio/from-signal-to-weight]]. Until it is stated, the reciprocals cannot be held. Throughout the examples that compare relative sizes, $g = 1$ and every weight is positive, so the weights sum to $1$.

:::proposition Two volatilities {#prop-two-vol}
Let two names have volatilities $\sigma > 0$ and $k\sigma$ with $k > 0$, and let the inverse-volatility weights be positive and sum to $1$. Then

$$
w_1 = \frac{k}{k+1}, \qquad w_2 = \frac{1}{k+1}.
$$

In particular, if the second volatility is twice the first, the weights are $2/3$ and $1/3$.
:::

:::proof
The raw scores are $1/\sigma$ and $1/(k\sigma)$. Their sum is $(k+1)/(k\sigma)$. Dividing,

$$
w_1 = \frac{1/\sigma}{(k+1)/(k\sigma)} = \frac{k}{k+1}, \qquad w_2 = \frac{1/(k\sigma)}{(k+1)/(k\sigma)} = \frac{1}{k+1}.
$$

Both are positive and they add to $1$. Setting $k = 2$ gives $w_1 = 2/3$ and $w_2 = 1/3$. The quieter name, the one with volatility $\sigma$, receives the larger weight. That is the whole content of the formula. It is not a claim that the quieter name has a higher mean.
:::

:::example Halving the volatility doubles the raw score {#ex-two-thirds}
Volatilities are $0.10$ and $0.20$. Compute the inverse-volatility weights that sum to $1$.
:::solution
Raw scores: $1/0.10 = 10$ and $1/0.20 = 5$. The sum is $15$. The weights are $10/15 = 2/3$ and $5/15 = 1/3$.

[[#prop-two-vol]] gives the same pair with $\sigma = 0.10$ and $k = 2$, without going through the raw scores of $10$ and $5$. The weight on the noisier name is half the weight on the quieter name, because its volatility is twice as large, and the two weights must add to $1$. Half of $2/3$ is $1/3$.
:::
:::

Three names are the same arithmetic. Volatilities $0.10$, $0.20$ and $0.40$ have raw scores $10$, $5$ and $2.5$, summing to $17.5$. The weights are $10/17.5 = 4/7$, $5/17.5 = 2/7$ and $2.5/17.5 = 1/7$. The noisiest name is not dropped. It is given the smallest positive weight. Dropping it would be a different map, a filter followed by inverse volatility, and the specification would have to say so.

Inverse volatility does not use the correlation between the names. Two names with volatility $0.10$ receive the same inverse-volatility weight whether they move together or not. Correlation enters when the object is a contribution to portfolio variance rather than a standalone volatility. That is [[portfolio/risk-parity]]. On a diagonal covariance the two maps agree; off that diagonal they need not. Using inverse volatility is a choice to ignore that distinction, not a shortcut that secretly includes it.

## The scale of the book

Relative weights can be fixed and the book can still be the wrong size for a stated risk budget. A volatility target scales the whole vector.

:::definition Volatility-target scale {#def-scale}
Let $w$ be a weight vector whose risky weights already sum to $1$ in the sense of the map that produced them, and let $\hat\sigma_p > 0$ be an estimate of the volatility of the simple returns of that book. For a target $\sigma_\star > 0$, the **volatility-target scale** is

$$
k = \frac{\sigma_\star}{\hat\sigma_p}.
$$

The scaled weights are $k w_i$ on each risky name. The cash weight is $1 - k$ when the pre-scale risky weights sum to $1$. If $k > 1$, the cash weight is negative.
:::

The estimate $\hat\sigma_p$ is an input, just as $\sigma_i$ was. It might be the sample standard deviation of recent portfolio returns, with a stated divisor, or it might be $\sqrt{w^{\mathsf T}\Sigma w}$ from a covariance that was fixed before the decision. The examples state which. The target $\sigma_\star$ is a parameter of the map. It is not an optimal risk level, and this chapter does not have a procedure for choosing it.

:::proposition The scale multiplies both sides {#prop-scale}
Assume the pre-scale risky weights sum to $1$, the portfolio's simple return before scaling would have been $R_p$, and the cash residual earns simple return $0$. Then the scaled simple return is $k R_p$. In particular, a positive $R_p$ and a negative $R_p$ of the same size remain the same size after scaling, and both are multiplied by $k$. If $k > 1$, the cash weight $1-k$ is negative: in this accounting that is leverage. Leverage magnifies gains and losses by the same factor. Nothing here suggests using it. If cash earns a non-zero rate, or if financing a negative cash weight has a cost, the identity $k R_p$ is false and the specification must say what replaced it.
:::

:::proof
After scaling, the risky weights are $k$ times the old weights, so their contribution to the simple return is $k R_p$. The cash weight is $1-k$ and earns $0$, which adds nothing. The sum is $k R_p$. Replacing $R_p$ by $-R_p$ replaces the scaled return by $-k R_p$. The factor $k$ does not know the sign of $R_p$.

If $k > 1$, then $1-k < 0$. The book is larger than net asset value, financed in this model by borrowing at rate $0$. A gain on the risky book is larger than the unscaled gain, and a loss is larger than the unscaled loss, by the same factor. That is what "magnifies both sides" means. A target sitting above the estimated volatility produces exactly this case, because $k = \sigma_\star/\hat\sigma_p$ exceeds $1$ when $\sigma_\star > \hat\sigma_p$. The formula is still well defined. Using it is a modelling choice this atlas is not recommending.
:::

:::example A scale below one {#ex-scale-down}
A book has estimated volatility $0.16$. The target is $0.10$. Scale the book, and apply the scale to portfolio simple returns of $+0.04$ and $-0.04$, under the assumptions of [[#prop-scale]].
:::solution
The scale is $k = 0.10/0.16 = 0.625$. Equivalently, $0.10/0.16 = 5/8$. The risky weights are multiplied by $5/8$, and the cash weight is $1 - 0.625 = 0.375$, earning $0$.

The scaled returns are $0.625 \times 0.04 = 0.025$ and $0.625 \times (-0.04) = -0.025$. Both sides shrink by the same factor. The target did not remove the loss. It reduced the loss and the gain together. A reader who keeps $0.025$ and forgets $-0.025$ has not applied the map.
:::
:::

:::example A scale above one {#ex-scale-up}
A single name has estimated volatility $0.08$. The target is $0.10$. Compute the scale, and apply it to portfolio simple returns of $+0.02$ and $-0.02$. State what the cash weight is.
:::solution
The scale is $k = 0.10/0.08 = 1.25$. The scaled returns are $1.25 \times 0.02 = 0.025$ and $1.25 \times (-0.02) = -0.025$. The cash weight is $1 - 1.25 = -0.25$.

This is leverage in the sense of [[#prop-scale]]. The gain of $0.02$ becomes $0.025$, and the loss of $0.02$ becomes $-0.025$. Both sides are magnified. The accounting assumes the negative cash earns $0$. A borrowing cost would make the loss worse than $-0.025$ and would also reduce the gain. This atlas is not suggesting the scale, the borrowing, or the target. The example exists so that a scale above $1$ is recognised when it appears, not so that it is used.
:::
:::

The two maps compose, and the composition is easy to miss. Inverse volatility first sets relative weights that sum to $1$. A target then multiplies every risky weight by $k$. The product is not inverse volatility, and it is not the target alone.

:::example Both maps on one book {#ex-both}
Start from the weights $2/3$ and $1/3$ in [[#ex-two-thirds]], on volatilities $0.10$ and $0.20$. Assume the covariance is diagonal, so the portfolio variance is $(2/3)^2(0.10)^2 + (1/3)^2(0.20)^2$. Compute that volatility. Then scale the book to a target of $0.10$, and write the final risky weights.
:::solution
The variance is

$$
\frac{4}{9}\cdot 0.01 + \frac{1}{9}\cdot 0.04 = \frac{0.04 + 0.04}{9} = \frac{0.08}{9} = \frac{2}{225}.
$$

The volatility is $\sqrt{2/225} = \sqrt{2}/15 \approx 0.094281$. The inverse-volatility step has already made the book slightly quieter than $0.10$, because the weights are not equal and the covariance has no covariance term. (Equal weights on a diagonal covariance would not be this number. That is a different map.)

The scale to a target of $0.10$ is

$$
k = \frac{0.10}{\sqrt{2}/15} = \frac{1.5}{\sqrt{2}} = \frac{3\sqrt{2}}{4} \approx 1.060660.
$$

Since $k > 1$, the cash weight is negative and both sides of any portfolio return are magnified, exactly as in [[#prop-scale]]. This is not a suggestion to apply the scale. The final risky weights, if the scale were nonetheless the specification, would be

$$
k\cdot\frac{2}{3} \approx 0.707107, \qquad k\cdot\frac{1}{3} \approx 0.353553,
$$

which sum to $k$ rather than to $1$. Stopping after inverse volatility would have left $(2/3,1/3)$ and cash weight $0$. Stopping after a target, without the inverse-volatility step, would have required some other pre-scale book. The two sentences in the specification are not interchangeable.
:::
:::

:::warning Relative size is not a target
A common slip is to compute $2/3$ and $1/3$ and then describe the book as "vol-targeted". Those weights sum to $1$. They match a target only for the particular portfolio volatility that the covariance happens to imply, and only if that volatility equals $\sigma_\star$. In [[#ex-both]] it equals about $0.094281$, not $0.10$, and not $0.16$. The other slip is the reverse: multiplying every signal by $0.625$ and calling the result inverse volatility. The scale does not look at the individual $\sigma_i$ at all.
:::

The figure is the scale $0.10/\hat\sigma$ against the estimated volatility. Where the curve sits above $1$, the target is above the estimate.


The defaults are the two volatilities 0.10 and 0.20. With a budget of 1 the weights are 2/3 and 1/3. The wide bars are those weights. The narrow bars are the same weights multiplied by the scale that takes the zero-correlation book volatility to the target. A scale above 1 is what the arithmetic does. It is not a suggestion to borrow, and the zero-correlation book is not a market.

:::widget weights
s1: 0.10
s2: 0.20
s3: 0
target: 0.10
caption: Wide bars sum to 1. Narrow bars are those weights after the zero-correlation book is scaled to the target. With volatilities 0.10 and 0.20 the wide bars are 2/3 and 1/3. Raising the third volatility above 0 brings in a third name. The scale is not advice to use leverage.
:::
:::widget plot
f: 0.10/x
x: 0.05, 0.40
hlines: 1
caption: The scale $k = 0.10/\hat\sigma$ that hits a target of $0.10$. The horizontal line is $k = 1$. To the left of $\hat\sigma = 0.10$ the scale is above $1$, which is leverage in the zero-rate accounting and magnifies both gains and losses. The curve is a formula, not a suggestion to lever, and not a plot of any market.
:::

:::quiz
Volatilities $0.10$ and $0.20$, weights summing to $1$. Which vector is the inverse-volatility map?
- [ ] $(1/2,\ 1/2)$, because there are two names.
- [x] $(2/3,\ 1/3)$.
- [ ] $(1/3,\ 2/3)$, because the noisier name needs more capital.
- [ ] $(1,\ 0)$, because one should drop the noisier name.
:::solution
Raw scores are $10$ and $5$, so the quieter name gets twice the weight of the noisier name, and the weights sum to $1$. That is $2/3$ and $1/3$. Equal weight ignores the volatilities. Dropping a name is a filter, not inverse volatility. The phrase "needs more capital" reverses the formula.
:::
:::

## What the catalogue did with the two maps

Three weight-mode rows in the open library use these maps, and they are not one experiment. The figures that follow are **as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026**. This atlas has **not** re-run the backtests. The reported Sharpe is their number; this chapter does not claim it was computed with the mean-over-standard-deviation convention of [[performance/sharpe-and-its-relatives]], nor with any stated annualisation.

W05, "Monthly Inverse Vol", sizes each ETF by the reciprocal of a $63$-day volatility and sets weights at month-end. Daily bars, $19$ years. Reported total return $+174\%$, CAGR $+5.45\%$, Sharpe $0.45$, maximum drawdown $-20.4\%$, win rate $73.2\%$, profit factor $3.59$. The $63$-day window and the month-end clock are parameters of the map. A $20$-day window, or a daily rebalance, would be a different rule. The row does not say whether the $63$-day figure uses divisor $n-1$ or $n$. We do not fill that in.

W17, "Vol Target Trend", scales an SMA trend basket to a $10\%$ volatility target. Daily bars, $19$ years. Reported total return $+169\%$, CAGR $+5.35\%$, Sharpe $0.36$, maximum drawdown $-28.9\%$, win rate $63.8\%$, profit factor $1.93$.

W18, "Vol Target Momentum", scales a momentum basket to a $15\%$ volatility target. Daily bars, $19$ years. Reported total return $+621\%$, CAGR $+10.96\%$, Sharpe $0.57$, maximum drawdown $-41.2\%$, win rate $64.6\%$, profit factor $2.05$.

Put W17 next to W18 and read both columns. The reported CAGR is higher on W18, and the reported maximum drawdown is deeper: $-41.2\%$ against $-28.9\%$. That pair is the point of the comparison, not a ranking to act on. The baskets differ, trend against momentum, and the targets differ, $10\%$ against $15\%$. A higher target raises the scale whenever the estimated volatility sits below the target, and [[#prop-scale]] says a larger scale magnifies both sides. None of the six reported figures is a forecast. None of them is a reason to prefer a $15\%$ target, a momentum basket, or the opposite of either rule.

W05 is not a third target. It is the relative-size map, on a month-end clock, with its own window. Its reported maximum drawdown, $-20.4\%$, is not "what inverse volatility does". It is what that specification did on that sample, under cost and fill rules this atlas has not re-run. [[momentum/momentum-across-assets]] meets inverse-volatility weights again on a different asset class; the map is the same kind of object, and the results are not assumed to travel.

:::intuition A target without a window is unfinished
The symbol $\hat\sigma_p$ looks like a constant. In a backtest it is recomputed. W05 says the window is $63$ days. A target row that does not say the window, the divisor, or whether the estimate is a standard deviation of portfolio returns or a covariance formula, has not specified $k$. Two implementations can share the sentence "target $10\%$" and differ on every weight. That is the same lesson as W17 against W18, one step earlier: the sentence that sounds like the whole rule is only the scale.
:::

:::history
Tobin, in 1958, proved a separation result: under his assumptions, every mean–variance investor holds a combination of the risk-free asset and one tangency portfolio of risky assets. The risky mix does not depend on the investor's risk appetite; the mix between that portfolio and the risk-free asset does. A volatility target is a later and cruder relative of that split. It takes a book that has already been chosen — by a trend rule, a momentum rule, an inverse-volatility map — and scales it towards a number. It does not derive the tangency portfolio, and it does not inherit Tobin's assumptions. The date is not a warrant for any particular target. This chapter does not suggest a scale above one, which is the case where the cash position in [[#def-scale]] is negative.
:::

:::quiz
A book's estimated volatility is $0.16$ and the target is $0.10$. Which reading of $k = 0.625$ is right?
- [ ] The book is leveraged, because a target always magnifies returns.
- [x] Risky weights are multiplied by $0.625$, cash weight is $0.375$ if cash earns $0$ and the old weights summed to $1$, and both a gain and a loss are shrunk by $0.625$.
- [ ] Each name's weight becomes the reciprocal of its own volatility.
- [ ] The maximum drawdown becomes $0.625$ times as deep, as an identity.
:::solution
[[#prop-scale]] multiplies the portfolio simple return by $k$ only under the zero cash-rate assumption. It does not by itself multiply a drawdown, which is a path property of the equity curve and need not scale by $k$ once the scale is itself changing through time. Inverse volatility was not used. And $k < 1$ is not leverage; $k > 1$ would be, and would magnify both sides.
:::
:::

## Where this leads

[[portfolio/risk-parity]] asks each name to contribute the same amount of portfolio variance. On a diagonal covariance that requirement reproduces [[#def-invvol]]. With unequal correlations it does not, which is why the relative-size map in this chapter had to be written without pretending it had seen the covariance. The scale $k$ comes back as soon as a finished risk-parity vector is compared with a target: equal risk contributions fix relative weights, and a target, if one is used, is a further multiplication, with the warning in [[#prop-scale]] unchanged. How hard a reported Sharpe is to tell from noise is [[performance/uncertainty-of-performance]], not a property of $k$.

:::summary
- Inverse-volatility weights are proportional to $1/\sigma_i$, then normalised. With a budget of $1$ they sum to $1$. They set relative size and ignore correlation.
- Volatilities $0.10$ and $0.20$ give weights $2/3$ and $1/3$. The quieter name gets the larger weight.
- A volatility target multiplies a finished book by $k = \sigma_\star/\hat\sigma_p$. It does not look at the individual $\sigma_i$.
- Estimated volatility $0.16$ and target $0.10$ give $k = 0.625$. Under a zero cash rate, a return of $\pm 0.04$ becomes $\pm 0.025$.
- If the target sits above the estimate, then $k > 1$, the cash weight is negative, and both sides are magnified. That is leverage. This atlas is not suggesting it. The case $0.08$ to a target $0.10$ has $k = 1.25$.
- On a diagonal covariance the $2/3$, $1/3$ book has volatility $\sqrt{2}/15 \approx 0.094281$. Scaling it to $0.10$ pushes $k$ slightly above $1$.
- W05 is a $63$-day inverse-volatility map at month-end. W17 and W18 are targets of $10\%$ and $15\%$ on different baskets. W18's higher reported CAGR sits next to a deeper reported drawdown. That is the comparison, not a ranking.
:::

## Exercises

:::exercise The quiet name {level=1 check="2/3"}
Volatilities are $0.10$ and $0.20$. Inverse-volatility weights sum to $1$. What is the weight on the name with volatility $0.10$? (Enter a fraction.)
:::solution
Raw scores $10$ and $5$ sum to $15$. The quieter name gets $10/15 = 2/3$. [[#prop-two-vol]] with $k = 2$ gives the same fraction.
:::
:::

:::exercise The canonical scale {level=1 check="0.625"}
Estimated portfolio volatility is $0.16$ and the target is $0.10$. What is the scale $k$? (Enter a decimal.)
:::solution
$k = 0.10/0.16 = 0.625$. The cash weight, if the pre-scale weights sum to $1$ and cash earns $0$, is $0.375$. Both sides of a portfolio return are multiplied by $0.625$.
:::
:::

:::exercise Three equal volatilities {level=1 check="1/3"}
Three names each have volatility $0.20$. Inverse-volatility weights sum to $1$. What is the weight on the first name? (Enter a fraction.)
:::solution
The three raw scores are equal, so the normalisation gives each name $1/3$. Inverse volatility reproduces equal weight when every volatility is the same. Correlation, if any, was not an input.
:::
:::

:::exercise The noisiest of three {level=2 check="1/7"}
Volatilities are $0.10$, $0.20$ and $0.40$. Inverse-volatility weights sum to $1$. What is the weight on the name with volatility $0.40$? (Enter a fraction.)
:::solution
Raw scores are $10$, $5$ and $2.5$, summing to $17.5$. The noisiest weight is $2.5/17.5 = 1/7$. The others are $4/7$ and $2/7$.
:::
:::

:::exercise Shrinking a loss {level=2 check="-0.025"}
The scale is $0.625$, cash earns $0$, and the unscaled portfolio simple return is $-0.04$. What is the scaled simple return? (Enter a decimal.)
:::solution
[[#prop-scale]] multiplies the return by $k$. The scaled return is $0.625 \times (-0.04) = -0.025$. The matching gain of $+0.04$ would have become $+0.025$. The map shrinks both.
:::
:::

:::exercise Recognising leverage {level=2 check="1.25"}
Estimated volatility is $0.08$ and the target is $0.10$. What is the scale? (Enter a decimal.)
:::solution
$k = 0.10/0.08 = 1.25$. This is greater than $1$, so in the zero-rate accounting the cash weight is $-0.25$ and both a gain and a loss are magnified by $1.25$. The number is the scale a specification would be using. It is not a suggestion to use it, and a non-zero borrowing cost is not included.
:::
:::

:::exercise Diagonal volatility of the two-name book {level=3 check="0.094281"}
Weights $2/3$ and $1/3$, volatilities $0.10$ and $0.20$, diagonal covariance. What is the portfolio volatility, to six decimal places? (Enter the six-decimal approximation.)
:::hint
Portfolio variance is the sum of squared weight times squared volatility. There is no sample divisor: the volatilities are given. Take the square root last. The exact value is $\sqrt{2}/15$.
:::
:::solution
Variance:

$$
\bigl(\tfrac23\bigr)^2 (0.10)^2 + \bigl(\tfrac13\bigr)^2 (0.20)^2 = \tfrac{4}{9}\cdot 0.01 + \tfrac{1}{9}\cdot 0.04 = \tfrac{2}{225}.
$$

Volatility $\sqrt{2}/15 \approx 0.094281$. A target of $0.10$ would then need a scale of about $1.060660$, which magnifies both sides. Computing the volatility does not require applying that scale.
:::
:::

:::exercise Compose the two maps {level=3 check="5/12"}
Inverse-volatility weights on volatilities $0.10$ and $0.20$ sum to $1$. The book is then scaled by $0.625$, the scale of [[#ex-scale-down]], with cash earning $0$. What is the final weight on the quieter name? (Enter a fraction.)
:::hint
The inverse-volatility weight on the quieter name is $2/3$. Multiply by $5/8$, which is $0.625$. The two steps are one map only after both have been written down.
:::
:::solution
The quieter weight before the scale is $2/3$. After the scale it is

$$
\frac{2}{3}\times 0.625 = \frac{2}{3}\times\frac{5}{8} = \frac{5}{12}.
$$

The noisier final weight is $(1/3)\times(5/8) = 5/24$, and the cash weight is $1 - 5/8 = 3/8$. The risky weights sum to $0.625$, not to $1$. Calling $5/12$ an inverse-volatility weight would drop the scale. Calling it a pure target would hide the fact that the other risky weight is half of it.
:::
:::
