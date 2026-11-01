Two prices can rise together for a month and still leave a spread that walks away and does not come back. A **pairs** construction tries to isolate that spread: something that might be stabler than either price alone, because a common component has been subtracted. The subtraction is an estimate. A log-price ratio uses the estimate "one for one in logs". A regression hedge uses the slope of one log price on the other. A large correlation justifies neither estimate, and it is not cointegration.

Cointegration, in the sense of Engle and Granger (1987), is a statement about orders of integration. It asks whether there exists a fixed hedge such that the residual does not itself behave like a unit-root series. Computing a correlation, or printing one $z$-score, does not answer that question. This chapter states the two-step idea and its assumptions, computes one trailing $z$-score and one hedge ratio on invented prices, and does not report a unit-root statistic or a $p$-value. Inventing either would be a worse mistake than leaving the test unrun.

Nothing here recommends a pair of names, a threshold for $z$, or the catalogue labels KO/PEP and EWA/EWC as books to hold. Those labels identify rows. The rows are experiments someone else reported.

## The log ratio and its $z$-score

Let $P^{(1)}_t$ and $P^{(2)}_t$ be two positive prices, and write $x_t = \ln P^{(1)}_t$ and $y_t = \ln P^{(2)}_t$. The **log ratio** is $q_t = x_t - y_t$, the log of $P^{(1)}_t/P^{(2)}_t$. A one-for-one hedge in logs is a modelling choice. It says that a given percentage move in the second price is to be offset by the same percentage move in the first. If the offset you wanted was not one, the log ratio still moves because the hedge is wrong, not only because a residual shock arrived.

:::definition Trailing log-ratio $z$-score {#def-z}
Fix a window length $n \ge 2$. At date $t \ge n-1$, take the log ratios $q_{t-n+1},\ldots,q_t$. Let $\mu_t$ be their arithmetic mean and let $\sigma_t$ be their sample standard deviation with divisor $n-1$, assumed positive. The **trailing $z$-score** is
$$
z_t = \frac{q_t - \mu_t}{\sigma_t}.
$$
The window ends at $t$, so the current log ratio enters the numerator and both estimates. A position chosen from $z_t$ earns only what happens after $t$. Using the population divisor $n$ instead of $n-1$ is a different score.
:::

A reading of $2$ means "two sample standard deviations above the mean of this window". It does not mean the spread will sit on $\mu_t$ tomorrow. The point being judged also pulls the mean and the width, so a short window cannot make a single close look arbitrarily extreme. That is the same geometry as the bound in [[reversion/rsi-and-bands]], moved from a price window to a spread window. The bound is not a substitute for a stationarity test.

## A hedge ratio is a slope

Ordinary least squares of $x$ on $y$, with an intercept, chooses $\alpha$ and $\beta$ to minimise the sum of squared residuals $x_u - \alpha - \beta y_u$ on a stated window. The slope $\beta$ is the **hedge ratio** in logs: the fitted move in $x$ per unit move in $y$. The residual $e_u = x_u - \alpha - \beta y_u$ is the spread that hedge implies. [[statistics/regression-on-a-signal]] derives the one-regressor formulas. Here the regressor is a log price, not a signal dated earlier, and the residual is an object we might later standardise. Dating still matters. A slope fitted on a window that ends at $t$ is known at $t$. It does not earn $x_t$ or $y_t$.

:::definition Rolling log-price hedge {#def-hedge}
On a window of $n \ge 2$ dates ending at $t$, the **rolling hedge ratio** $\hat\beta_t$ is the least-squares slope of $\ln P^{(1)}$ on $\ln P^{(2)}$, with an intercept $\hat\alpha_t$. The residual spread on the last date of the window is
$$
e_t = \ln P^{(1)}_t - \hat\alpha_t - \hat\beta_t \ln P^{(2)}_t.
$$
The window is trailing: no price after $t$ enters $\hat\alpha_t$ or $\hat\beta_t$. A later window may, and usually will, print a different slope. The residual is in log points. It becomes a return only after a weight map says how many units of each price are held.
:::

The invented prices below are not a disguised real pair. Call the legs A and B only inside this example.

$$
\begin{align*}
P^{(A)} &= (100,\ 104,\ 99,\ 106,\ 110,\ 103,\ 112,\ 116),\\
P^{(B)} &= (50,\ 51,\ 50,\ 52,\ 53,\ 52,\ 54,\ 55),
\end{align*}
$$

on dates $0$ through $7$. Over all eight dates the correlation of the two price levels is $0.9762$, and the correlation of the seven log-price changes is $0.9896$, both to four decimal places. Those are high numbers. They are the temptation this chapter is about.

:::example A five-date hedge ratio {#ex-hedge}
Using dates $0$ through $4$ only, regress $\ln P^{(A)}$ on $\ln P^{(B)}$ with an intercept. Report the slope and the intercept to four decimal places.
:::solution
Full-precision natural logs on that window give the centred sums
$$
\sum (y_u - \bar y)(x_u - \bar x) = 0.004328622, \qquad \sum (y_u - \bar y)^2 = 0.002574180,
$$
where $x = \ln P^{(A)}$ and $y = \ln P^{(B)}$. The slope is the ratio of those sums,
$$
\hat\beta = 0.004328622 / 0.002574180 = 1.6816
$$
to four decimal places, and the intercept that matches the two means is $\hat\alpha = -1.9760$ to four decimal places. In words, the fitted log price of A moves by about $1.6816$ log points when the log price of B moves by one, inside this window and this line. The logs displayed to six decimals are, for A, $4.605170$, $4.644391$, $4.595120$, $4.663439$, $4.700480$, and for B, $3.912023$, $3.931826$, $3.912023$, $3.951244$, $3.970292$. Rebuilding the sums from the rounded logs moves the slope by less than $0.0001$ before the fourth decimal; the quoted slope uses full precision. The slope is not a holding recommendation. It is the minimiser of a sum of squares on five invented points.
:::
:::

:::example The $z$-score at the same date, and the next step {#ex-z}
On the same five log ratios, with the sample divisor $n-1 = 4$, compute $z_4$ under [[#def-z]]. Then suppose a rule is short one unit of the log ratio when $z_t > 1$, long one unit when $z_t < -1$, and otherwise flat. The unit earns the next change in the log ratio, not a currency return. What does the rule earn from date $4$ to date $5$?
:::solution
The five log ratios $q_t = \ln P^{(A)}_t - \ln P^{(B)}_t$ are $0.693147$, $0.712565$, $0.683097$, $0.712195$, and $0.730188$, to six decimals. Their mean is $\mu_4 = 0.706239$. Their sample standard deviation is $\sigma_4 = 0.018412$. The last deviation is $0.730188 - 0.706239 = 0.023949$, so
$$
z_4 = 0.023949 / 0.018412 = 1.3008
$$
to four decimal places. Since $z_4 > 1$, the rule is short one unit of the log ratio. The next log ratio, at date $5$, is $0.683485$, so the change is $0.683485 - 0.730188 = -0.046703$. The short unit earns
$$
-1 \times (-0.046703) = 0.046703
$$
log points. That is the change in $q$, not the profit of a funded book. A funded book would say how the unit of $q$ is mapped into weights of A and of B, and what it pays to trade them. [[portfolio/from-signal-to-weight]] is that map. One favourable log-point change on an invented path is not evidence that a $z$-score above $1$ is an entry anyone should use.
:::
:::

:::example The slope moves when the window rolls {#ex-roll}
Repeat the regression of [[#ex-hedge]] on dates $1$ through $5$. Report $\hat\beta$ to four decimal places, and say what the change in slope is, and what it is not.
:::solution
The same normal equations on the new window give $\hat\beta = 1.5927$ and an intercept of $-1.6329$, both to four decimal places. The slope has moved by $1.6816 - 1.5927 = 0.0889$. Five of the points overlap, and one date was enough to move the second decimal. The movement is not a unit-root $p$-value, not a cointegration test, and not a verdict on A against B. It is evidence that "the" hedge ratio was never a property of the two series independent of the window. A rule that freezes $1.6816$ after date $4$, and a rule that refits, are different rules. The $z$-score of the log ratio in [[#ex-z]] did not use this slope at all. Ratio and regression are not two views of one spread. They are two spreads.
:::
:::

On dates $1$ through $5$ the log-ratio $z$-score, same definition, is $-1.0148$. The threshold rule of [[#ex-z]] would be long one unit of the ratio, and the next change in $q$ is $+0.046030$, so that long unit would earn $+0.046030$ log points. Two winning steps in a row, on eight invented closes with a correlation near $1$, are still a toy. The third eligible date inside the sample, date $6$, has $z_6 = 0.9317$, inside the dead zone, so the rule is flat into the last step. The flat step is part of the rule. Dropping it because "nothing happened" would bias any later average towards the dates when $|z|$ was large.

The second series in the figure was built as 20 + 2 times the first, plus a sine of amplitude 3. The hedge ratio therefore has a home at 2, where the spread is that sine shifted by 20. A ratio of 1 leaves a trend in the spread. Flatness on a series that was built to be flat is not a discovered edge.

:::widget spread
beta: 1
caption: Move the hedge ratio toward 2. The sample standard deviation of the spread falls, because the second series was constructed as 20 plus twice the first, plus a wave. The dip is the construction. It is not evidence of a pair to trade.
:::
:::widget regression
points: 3.912023,4.605170; 3.931826,4.644391; 3.912023,4.595120; 3.951244,4.663439; 3.970292,4.700480
degree: 1
residuals: true
x: 3.90, 4.00
y: 4.55, 4.75
caption: Five invented log prices, ln A against ln B, the window behind the hedge ratio 1.6816. Drag a point and the slope moves. That movement is the rolling-hedge problem in one picture, not a forecast and not a cointegration test.
:::

## Correlation is not cointegration

Engle and Granger (1987) proposed a two-step residual check for a pair of series. Step one: regress one series on the other, with an intercept if the specification includes one, and keep the residual. Step two: test that residual for a unit root, using critical values that acknowledge the residual was estimated rather than observed. A rejection of the unit-root null, at a stated size and under the assumptions, is what would let you call the pair cointegrated in that sample. A failure to reject is not a proof of a unit root. We run neither step on the invented prices, and we run neither step on the catalogue pairs. There is no $p$-value in this chapter.

The assumptions that make the procedure mean what it says are easy to list and easy to skip.

- Each input series is integrated of order one: a unit root in the level, and not in the difference. A pair of already-stationary series can have a stationary residual for a trivial reason, and the usual residual critical values are the wrong reference.
- The cointegrating vector, if it exists, is fixed over the sample. A hedge that jumps — the subject of [[reversion/when-reversion-fails]] — is a break in that assumption, not a small estimation error.
- In a pair, the interesting vector is essentially unique up to scale. Normalising the coefficient on the first series to $1$ is a choice of scale, which is why $\beta$ is "the" hedge ratio only after that normalisation.
- The residual test uses the Engle–Granger critical values, or some other set derived for an estimated residual. Reading a textbook Dickey–Fuller $p$-value off a residual you just fitted, as if the residual had been a pre-specified series, is not the test.
- A result, had we computed one, would be about the sample and the specification. It would not promise that the residual keeps a stable mean after the last date.

Correlation of levels, correlation of changes, and a single $z_t$ appear nowhere in that list.

:::proposition A perfect correlation of changes need not revert {#prop-corr}
Let $\Delta x_t$ be a fixed sequence of real numbers with positive sample variance, and set $\Delta y_t = \Delta x_t + c$ with a constant $c \neq 0$. Build the log prices from $x_0 = y_0 = 0$ by summing the changes. Then the sample correlation of $(\Delta x, \Delta y)$ equals $1$, while the unit-hedge spread $y_t - x_t$ equals $c\, t$. That spread is an arithmetic trend. It does not return to a fixed mean. Furthermore, no constant $\beta$ makes $y_t - \beta x_t$ constant for every $t$ in the sample, because that would force $\Delta x$ itself to be constant.
:::

:::proof
Centre the changes. The sample mean of $\Delta y$ is the sample mean of $\Delta x$, plus $c$, so
$$
\Delta y_t - \overline{\Delta y} = \Delta x_t - \overline{\Delta x}.
$$
The centred vectors are identical. Whenever $\Delta x$ is not constant, the sample correlation is exactly $1$.

Summing from a common start at $0$ gives $y_t = x_t + c\, t$. The spread at hedge $1$ is $c\, t$, which moves by $c$ every step and does not return.

Suppose some fixed $\beta$ made $y_t - \beta x_t$ constant on the whole sample. First differences would vanish:
$$
\Delta y_t - \beta \Delta x_t = (1-\beta)\Delta x_t + c = 0
$$
for every $t$, so $\Delta x_t = -c/(1-\beta)$ for every $t$, a constant. If $\beta = 1$ the same line says $c = 0$, which was excluded. This contradicts a non-constant $\Delta x$. So no fixed hedge flattens the path into a constant. The argument is algebra on a finite sequence. It is not a unit-root test, and it produces no $p$-value.
:::

:::example Numbers for the proposition {#ex-corr}
Take $c = 0.004$ and
$$
\Delta x = (0.010,\ -0.020,\ 0.015,\ -0.005,\ 0.020,\ -0.010,\ 0.008).
$$
Confirm the correlation claim and the terminal unit-hedge spread.
:::solution
Add $0.004$ to each entry to get $\Delta y$. The centred sequences match, entry by entry, so the sample correlation is $1$, as [[#prop-corr]] asserts. There are seven steps, so the unit-hedge spread ends at $7 \times 0.004 = 0.028$. It visited $0.004, 0.008, \ldots, 0.028$ and never came back towards $0$. A researcher who stopped at "correlation equals 1, so the spread mean-reverts" would have skipped the spread. The spread is the object that had to revert, and on this construction it does the opposite. We still do not quote a Dickey–Fuller statistic for the residual. The residual of the unit hedge is a straight line, which is already enough to refuse the word "mean-reverting" for that hedge.
:::
:::

High correlation on the A/B prices sits next to this proposition on purpose. Level correlation $0.9762$ and log-change correlation $0.9896$ are both large, and the hedge ratio still moved from $1.6816$ to $1.5927$ when one date rolled off the window. We do not conclude that A and B are cointegrated. We do not conclude that they are not, in the sense of a formal test. We conclude that the correlations are the wrong object, and that a test we did not run has no $p$-value to report.

:::warning Do not borrow a critical value
Even on a series where a unit-root regression is appropriate, the residual from an estimated hedge is not a raw series. The null distribution moves because $\hat\beta$ was chosen to make the residual small. Using an ordinary Dickey–Fuller table on that residual, and reading the result as an Engle–Granger result, is a second error stacked on the first. Reporting a made-up $p$-value "for illustration" would repeat it. [[statistics/stationarity-and-regimes]] keeps the unit-root idea at the level of a model assumption. This chapter does not add a fake test statistic to the invented residual.
:::

## Two catalogue rows

The figures below are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtests. Reported Sharpes are their numbers. We do not know the risk-free rate or the annualisation, and we do not "correct" a row in which the reported CAGR and the reported Sharpe have opposite signs.

W13, "Pairs Ratio Z Score", is described as a market-neutral book on KO against PEP, using a log-ratio $z$-score, on daily bars over 26 years. The catalogue reports a total return of $+48.8\%$, a CAGR of $+1.54\%$, a Sharpe of $-0.05$, a maximum drawdown of $-23.6\%$, a win rate of $49.1\%$, and a profit factor of $1.14$. KO and PEP are the names in that row. Naming them is how we point at the row. It is not a suggestion to trade that pair, and it is not a finding that their log ratio is cointegrated. The catalogue line does not report a unit-root $p$-value. Neither do we.

W14, "Pairs Hedge Ratio", is described as a market-neutral book on EWA against EWC, using a rolling ordinary-least-squares hedge-ratio spread, again on daily bars over 26 years. The catalogue reports a total return of $+12.4\%$, a CAGR of $+0.45\%$, a Sharpe of $-0.30$, a maximum drawdown of $-14.3\%$, a win rate of $50.2\%$, and a profit factor of $1.06$. EWA and EWC are labels for the row, not a country-fund trade this chapter endorses. The line says the hedge is a rolling regression. It does not publish the window, and we do not invent one. Our five-date slope is a classroom calculation so that $\hat\beta$ is a number you can divide out by hand. It is not a reconstruction of W14.

Both rows report a positive CAGR and a negative Sharpe. That combination is possible when the Sharpe is not "CAGR divided by a volatility of the same net-asset-value path", for example if a positive financing rate enters the excess return, or if the two statistics are computed on different series. We do not choose an explanation and then treat it as fact. We also do not flip the negative reported Sharpe into the opposite book. A loss, or a negative reported Sharpe beside a small gain, is evidence about that specification in that sample. The other side of a pairs book is a different specification: the short leg becomes the long leg, costs do not change sign for free, and the hedge ratio does not become its own reciprocal just because you changed your mind.

W13 and W14 are also different subtractions, which is the point of having both [[#def-z]] and [[#def-hedge]]. One standardises a log ratio. The other standardises a residual from a fitted slope. On our toy those were not the same spread, and the slope did not sit still. The catalogue's two reported CAGRs, $+1.54\%$ and $+0.45\%$, differ as well, and the samples are described as the same length. Even so, you cannot assign the gap to "ratio versus hedge" alone. The names differ, the windows are unpublished, and we have not re-run either row. The implementation is part of the result, as it was for the two RSI rows in the previous chapter.

Gatev, Goetzmann and Rouwenhorst (2006) specified a distance-based pairs rule and, importantly, delayed the first trade until after the matching window, so that the act of choosing the pair does not peek at the returns the pair is then credited with. A $z$-score that includes the current price, as [[#def-z]] does, is a legal description of the window. It becomes illegal if the same price is also treated as a fill that the $z$-score was allowed to foresee. The 2006 delay is a design choice aimed at that class of leak in the matching step. Our toy has no matching step. The eight prices were written down in advance, which is why they cannot confirm a pairs premium.

:::quiz
Which statement is an Engle–Granger cointegration result?
- [ ] The correlation of two log-price changes is $0.99$.
- [ ] A trailing $z$-score printed $1.30$ on the last date of the window.
- [x] None of the quantities computed in this chapter. No residual unit-root statistic was calculated.
- [ ] The least-squares slope on five dates equals $1.6816$.
:::solution
Correlation, a $z$-score, and a hedge ratio are all defined without a unit-root test. [[#prop-corr]] shows a case where the correlation of changes is exactly $1$ and the unit-hedge spread is a straight trend. Engle and Granger's second step was not run, so there is no $p$-value to quote and no cointegration result to announce.
:::
:::

:::quiz
The $z$-score in [[#def-z]] uses which divisor, and which dates?
- [ ] Population divisor $n$, on a window that excludes the current log ratio so the score can be more extreme.
- [x] Sample divisor $n-1$, on a window that ends at $t$ and therefore includes $q_t$.
- [ ] Whatever divisor makes $|z_t|$ exceed $2$, because otherwise the rule never trades.
- [ ] The Engle–Granger critical value, rescaled.
:::solution
[[#def-z]] states the sample divisor and a window ending at $t$. Excluding $q_t$, or dividing by $n$, would be a different score. A critical value from a unit-root table is not a standard deviation.
:::
:::

:::intuition What the residual is refusing to be
The least-squares line makes the residuals on the fitting window sum to zero when an intercept is included. That is a property of the fit, not a property of the next residual. A $z$-score then rescales the last residual, or the last log ratio, by a width estimated on that same window. You can do all of this and still be holding a trend with a drifting hedge. The arithmetic is compulsory. The word "cointegrated" is not.
:::

:::history
In 2006 Evan Gatev, William Goetzmann and K. Geert Rouwenhorst specified a distance-based pairs rule on US stocks and reported its historical performance after a delay that limits look-ahead in the matching step. The delay is part of the design: the pair is chosen on information that is already old when the first spread trade is allowed. A $z$-score computed through the same date as the prices that entered it is a description of the window. It is not, by itself, that delayed experiment.
:::

## Where this leads

[[reversion/cross-sectional-reversal]] takes the short-horizon idea back to a ranking of many names, which is the shape of the 1990 evidence, rather than a hedge between two prices. A hedge ratio that jumps when the relationship breaks is one of the failure modes in [[reversion/when-reversion-fails]]. The least-squares formulas used for $\hat\beta$ are those in [[statistics/regression-on-a-signal]], and the reason a unit root is a model rather than a slogan is [[statistics/stationarity-and-regimes]].

:::summary
- The log ratio $q_t = \ln P^{(1)}_t - \ln P^{(2)}_t$ is a one-for-one hedge in logs. A trailing $z$-score subtracts the window mean and divides by the sample standard deviation, divisor $n-1$, including the current point. It earns the subsequent change, not the current one.
- The rolling hedge ratio is the least-squares slope of one log price on the other, with an intercept, on a trailing window. On invented prices, dates $0$ through $4$ give $\hat\beta = 1.6816$. Dates $1$ through $5$ give $\hat\beta = 1.5927$.
- At date $4$ the log-ratio $z$-score is $1.3008$. A unit short of the log ratio earns the next change, $+0.046703$ log points. That is not a currency return and not a recommendation.
- If log-price changes differ by a nonzero constant, their sample correlation is $1$ and the unit-hedge spread is a straight trend. No fixed $\beta$ makes that spread constant. Correlation is not cointegration.
- Engle and Granger's check is: regress, then test the residual for a unit root, with critical values for an estimated residual. This chapter states the assumptions and computes no $p$-value.
- As reported in 2026 and not re-run here, W13 (KO/PEP log-ratio $z$-score) has CAGR $+1.54\%$ and Sharpe $-0.05$. W14 (EWA/EWC rolling hedge) has CAGR $+0.45\%$ and Sharpe $-0.30$. The names identify the rows. They are not trades, and the sign of the reported Sharpe is not an order to flip the book.
- A positive reported CAGR beside a negative reported Sharpe is left unresolved. We do not know their excess-return convention, and we do not invent one.
:::

## Exercises

:::exercise One division {level=1 check="1.5"}
A log ratio is $0.73$, the trailing mean is $0.70$, and the trailing sample standard deviation is $0.02$. What is $z$? (Enter the $z$-score.)
:::solution
$z = (0.73 - 0.70)/0.02 = 0.03/0.02 = 1.5$. The current point is included in the mean and the width only if the person who computed $0.70$ and $0.02$ included it. The question hands you those two estimates already finished, so the arithmetic is one division. A $z$-score of $1.5$ is not an instruction to short the spread.
:::
:::

:::exercise Terminal trend spread {level=1 check="0.028"}
In [[#ex-corr]] the unit-hedge spread increases by $0.004$ on each of seven steps, starting from $0$. What is the spread after seven steps? (Enter the spread.)
:::solution
$7 \times 0.004 = 0.028$. The path of the spread is $0.004, 0.008, \ldots, 0.028$. It does not cross back through zero. The correlation of the changes is $1$ at the same time. That is the content of [[#prop-corr]].
:::
:::

:::exercise Correlation of a shifted series {level=1 check="1"}
$\Delta y_t = \Delta x_t + c$ with $c \neq 0$, and $\Delta x$ is not constant. What is the sample correlation of the two change series? (Enter the correlation.)
:::solution
Centring removes $c$, so the centred series are identical and the sample correlation is $1$. The value does not depend on how large $c$ is, provided $c$ is constant. The spread $y - x$ does depend on $c$. Correlation throws that information away.
:::
:::

:::exercise A one-point move in the regressor {level=2 check="0.0168"}
Use $\hat\beta = 1.6816$ from [[#ex-hedge]]. If $\ln P^{(B)}$ rises by $0.01$ and the residual and the intercept stay fixed, by how much does the fitted $\ln P^{(A)}$ rise? Round to four decimal places. (Enter the fitted change.)
:::solution
The fitted change is $\hat\beta \times 0.01 = 1.6816 \times 0.01 = 0.016816$, which is $0.0168$ to four decimal places. This is a property of the already fitted line. It does not say that the residual will stay fixed on the next date, and it does not say that a position of $1.6816$ units is a book anyone should hold.
:::
:::

:::exercise Ratio versus residual {level=2}
On dates $0$ through $4$, the log-ratio hedge is implicitly $\beta = 1$, while the fitted hedge is $\hat\beta = 1.6816$. Why is a $z$-score of $q_t = \ln P^{(A)}_t - \ln P^{(B)}_t$ not a $z$-score of the least-squares residual?
:::solution
The log ratio sets the slope to $1$ and uses no intercept. The residual $x_t - \hat\alpha - \hat\beta y_t$ sets the slope to $1.6816$ and removes $\hat\alpha = -1.9760$. Those are different series. Standardising one of them does not standardise the other, even on the same five dates. [[#ex-roll]] then changes $\hat\beta$ again. A sentence such as "the spread $z$-score" has not named a spread until the hedge is written down.
:::
:::

:::exercise What W13 does not report {level=2}
W13 reports CAGR $+1.54\%$ and Sharpe $-0.05$ for a KO/PEP log-ratio book, as stated in the library in 2026. Give one fact the row does report about performance, and one fact a cointegration claim would need that the row does not contain.
:::solution
The row does report a CAGR, a total return, a Sharpe, a maximum drawdown, a win rate, and a profit factor, on a 26-year daily span, for a rule described as a market-neutral log-ratio $z$-score on those two names. A cointegration claim would need a stated hedge, a residual, a unit-root procedure, and a critical value appropriate to an estimated residual. None of that is in the catalogue line, and this chapter does not supply a $p$-value to fill the gap. The negative reported Sharpe is not an order to reverse KO against PEP. Reversing the book would be a new experiment, with its own costs.
:::
:::

:::exercise Why the centred changes match {level=3}
Prove the correlation half of [[#prop-corr]] from the definition of the sample correlation, without appealing to the rest of the proposition. Assume the sample variance of $\Delta x$ is positive.
:::hint
Write $\overline{\Delta y}$ in terms of $\overline{\Delta x}$ and $c$. Subtract it from $\Delta y_t = \Delta x_t + c$. The two centred vectors are the same vector, so the covariance equals the variance.
:::
:::solution
The sample mean of $\Delta y$ is $\overline{\Delta x} + c$. Therefore
$$
\Delta y_t - \overline{\Delta y} = (\Delta x_t + c) - (\overline{\Delta x} + c) = \Delta x_t - \overline{\Delta x}.
$$
The sample covariance of $(\Delta x, \Delta y)$ equals the sample variance of $\Delta x$, and the sample variance of $\Delta y$ equals that same variance. The ratio that defines the sample correlation is $1$. The argument never uses the level of the spread. A correlation of $1$ is compatible with any constant gap $c$ in the changes, including a gap that makes $y_t - x_t$ a trend.
:::
:::

:::exercise No constant residual {level=3}
In [[#prop-corr]], suppose someone proposes $\beta = 2$ as a hedge that might cancel the trend. Show from the first-difference identity that $y_t - 2x_t$ is not constant on the sample.
:::hint
A constant path has zero first differences. Compute $\Delta y_t - 2\Delta x_t$ and use $\Delta y_t = \Delta x_t + c$. You only need to find one $t$ where the result is not zero, or show it cannot be zero for all $t$.
:::
:::solution
The first difference of the proposed residual is
$$
\Delta y_t - 2\Delta x_t = (\Delta x_t + c) - 2\Delta x_t = c - \Delta x_t.
$$
With $c = 0.004$, this equals zero only when $\Delta x_t = 0.004$. The given $\Delta x$ contains $0.010$ and $-0.020$, neither of which equals $0.004$. So at least two first differences are nonzero, and $y_t - 2x_t$ is not constant. The same calculation with a general $\beta \neq 1$ is the second half of the proof of [[#prop-corr]]: the first difference is $(1-\beta)\Delta x_t + c$, which cannot vanish for every $t$ unless $\Delta x$ is constant. No $p$-value entered.
:::
:::
