A price that moves from $100$ to $110$ has changed by $10$ units of account. The same move is a simple return of $0.10$, and it is a log return of $\ln(1.10) = 0.095310$. Those three descriptions of one path are not interchangeable. The first depends on the unit in which the price is quoted. The second is a ratio of prices, minus one. The third is the natural logarithm of the gross ratio. Every later object in this course — a volatility, a drawdown, a Sharpe ratio, a win rate, a profit factor, a standard error — is a function of a return series, and the function changes if the series changes.

Path A is the short price path used throughout the atlas:

$$
P = (100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110).
$$

It finishes exactly $10$ per cent above where it started, because $110/100 - 1 = 0.10$. The seven simple returns along the way add to $0.097509$, not to $0.10$. The seven log returns add to $0.095310$, which is $\ln(1.10)$. The gap between those sentences is the whole of this chapter. Nothing here is a forecast, and nothing here is a recommendation to buy, sell, or hold any asset. The path is invented so that the arithmetic can be checked by hand.

The return dated $t$ is earned over the step that ends at $t$. In symbols, $R_t$ uses $P_t$ and $P_{t-1}$. A signal that is allowed to see prices only up to date $t$ is scored on a later return, not on $R_t$. That clock is fixed in [[markets/prices-and-bars]]. This chapter does not score a rule. It names the arithmetic of a path that has already been written down, and it separates that arithmetic from a profit in units of account.

## What is being measured

A quoted price is not a return. Two contracts can have the same economic exposure and different quoted prices, because one quote is in a different unit, or because one quote is a futures price with a multiplier rather than a cash price. A change of $2$ in a quote near $100$ is not the same object as a change of $2$ in a quote near $20$. Dividing by the previous price removes the unit. That ratio is the gross return. Subtracting one centres it on zero, which is the simple return. Taking the logarithm replaces multiplication of gross returns by addition. Each step is a definition, not an approximation, and each step throws something away.

External cash breaks the identification of a price ratio with an account. A dividend, a split, a fee, or a deposit between $t-1$ and $t$ means that $P_t/P_{t-1}$ is not the growth of the holder's wealth. The telescoping identity proved below is true of any positive series you feed it. The modelling choice, which belongs with [[markets/adjustment-universes-and-rolls]], is which series is the account. In this chapter the prices are treated as the marks of a fully invested account with no external cash, unless an example says otherwise. Under that reading, Path A's compound simple return of $0.10$ is the account's simple return over the seven steps. It is not a compound annual growth rate. A CAGR divides by a stated number of years, and seven steps are not a year. [[markets/reading-a-dashboard]] fixes that definition. Annualising this path is a unit error. The uncertainty chapter returns to the same error when a ratio of $0.6097$ is multiplied by $\sqrt{252}$.

## Simple returns

:::definition Simple return and gross return {#def-simple}
Let $P_{t-1}$ and $P_t$ be successive positive prices, or successive positive levels of an account. The **gross return** over the step is $P_t/P_{t-1}$. The **simple return** is

$$
R_t = \frac{P_t}{P_{t-1}} - 1.
$$

Equivalently, $P_t = P_{t-1}(1+R_t)$. A simple return of $0.10$ is a move of $10$ per cent. The definition requires $P_{t-1} \neq 0$. It does not require $P_t > 0$, but a non-positive $P_t$ makes the gross return non-positive and the log return of the next section undefined.
:::

Over $T$ steps with no cash added or removed, the terminal level is the starting level multiplied by every gross return. The **compound simple return** from step $0$ to step $T$ is therefore

$$
\frac{P_T}{P_0} - 1 = \prod_{t=1}^{T}(1+R_t) - 1.
$$

The product is the right-hand side. The sum $\sum R_t$ is a different number. For two steps the algebra is short enough to keep in view:

$$
(1+a)(1+b) - 1 = a + b + ab.
$$

The extra term $ab$ is the cross term. It is zero only if at least one of the simple returns is zero. When both returns are positive the cross term is positive, so the compound return exceeds the sum. When the returns have opposite signs the cross term is negative. There is no general inequality that says "the sum is conservative". Path A is a counter-example to that slogan: the sum of the simple returns is smaller than the compound return.

:::example Path A, simple returns {#ex-path-a-simple}
The prices are $100, 102, 101, 104, 103, 107, 106, 110$. Compute the seven simple returns to six decimal places, the sum of those printed returns, and the compound simple return from the first price to the last.
:::solution
Each simple return is an exact ratio of the two prices, then rounded to six decimal places for the table. The verified rounded values are

$$
0.020000,\ -0.009804,\ 0.029703,\ -0.009615,\ 0.038835,\ -0.009346,\ 0.037736.
$$

The first is $102/100 - 1 = 0.02$ exactly. The second is $101/102 - 1 = -1/102$, which equals $-0.009803921\ldots$ and rounds to $-0.009804$. The others arise in the same way: $104/101 - 1$, $103/104 - 1$, $107/103 - 1$, $106/107 - 1$, and $110/106 - 1$.

The seven printed figures add to $0.097509$. The compound simple return does not use that sum. It uses the prices at the ends:

$$
\frac{110}{100} - 1 = 0.10.
$$

Equivalently, the product of the seven exact gross returns telescopes to $110/100 = 1.10$. The product of the *rounded* gross returns is $1.10000035$, which agrees with $1.10$ well past the sixth decimal and is not a reason to replace $0.10$ by the sum $0.097509$. The compound return exceeds the sum by $0.002491$. That gap is the accumulated cross terms. It is small because the simple returns are a few per cent, and it is not zero.
:::
:::

The same identity explains the first dip without any rounding. From $100$ to $102$ the simple return is $1/50$. From $102$ to $101$ it is $-1/102$. Their sum is $52/5100$. Their product is $-1/5100$. Sum plus product is $51/5100 = 0.01$, and $101/100 - 1 = 0.01$. Two steps that "almost cancel" in a sum do cancel in the account only after the cross term is kept. Here the cross term is about $-0.000196$, and the account is up $0.01$, not up $0.010196$.

:::example A gain and a loss that do not cancel {#ex-fifty}
Simple returns $R_1 = 0.50$ and $R_2 = -0.50$ arrive in that order. Compute the sum of the simple returns and the compound simple return.
:::solution
The sum is $0.50 + (-0.50) = 0$. The compound simple return is

$$
(1.50)(0.50) - 1 = 0.75 - 1 = -0.25.
$$

The cross term is $(0.50)(-0.50) = -0.25$, and $0 + (-0.25) = -0.25$. An account that starts at $1$ is at $1.50$ after the first step and at $0.75$ after the second. It has lost a quarter of its starting level. Adding the simple returns reports a flat result. The order does not save it: $-0.50$ followed by $0.50$ compounds to $(0.50)(1.50) - 1 = -0.25$ as well. The sum is still $0$. Opposite moves of equal simple-return size do not restore the account, because the second move is applied to a different level.
:::
:::

:::warning Adding simple returns
The sum of simple returns is not the compound simple return, except in the trivial cases where every cross term vanishes. On Path A the printed simple returns add to $0.097509$ and the account grows by $0.10$. On the two-step path above they add to $0$ and the account falls by $0.25$. A spreadsheet that adds a column of percentage changes and calls the total a performance has chosen the wrong operation. The operation that matches a fully invested account is the product of gross returns.
:::

:::quiz
Over two steps the simple returns are $0.50$ and then $-0.50$. What is the compound simple return?
- [ ] $0$, because the simple returns cancel
- [x] $-0.25$
- [ ] $-0.50$, the worse of the two steps
- [ ] $0.25$, the cross term with the sign dropped
:::solution
The gross returns are $1.50$ and $0.50$. Their product is $0.75$, so the compound simple return is $0.75 - 1 = -0.25$. The sum of the simple returns is $0$, and that sum is not the change in the account. The cross term $(0.50)(-0.50) = -0.25$ is exactly the difference.
:::
:::

## Log returns

:::definition Log return {#def-log}
With $P_{t-1} > 0$ and $P_t > 0$, the **log return** is

$$
r_t = \ln\frac{P_t}{P_{t-1}} = \ln(1+R_t).
$$

The second equality is the change of variable $1+R_t = P_t/P_{t-1}$. It requires $R_t > -1$, which is the same condition as $P_t > 0$. A simple return of $-1$ is a total loss of the marked price. The logarithm of zero is not a real number, so a log return refuses to describe that step. That refusal is informative: an additive series cannot continue through a zero price.
:::

Log returns are not an approximation to simple returns. They are a different coordinate on the same gross return. The approximation comes afterwards, from the Taylor expansion of the logarithm at $1$, and it is accurate only when $R_t$ is small. The exact link between a path and a sum is the next statement. It is the reason log returns are the objects one adds.

:::proposition Telescoping sum of log returns {#prop-telescope}
Let $P_0, P_1, \ldots, P_T$ be strictly positive. Let $r_t = \ln(P_t/P_{t-1})$. Then

$$
\sum_{t=1}^{T} r_t = \ln\frac{P_T}{P_0}.
$$

No assumption is made that the returns are small, random, independent, or identically distributed. The prices must stay positive. If the prices are raw closes and the account received a dividend, the identity still holds for the raw closes and does not hold as a description of the account.
:::

:::proof
The sum of logarithms is the logarithm of the product:

$$
\sum_{t=1}^{T} \ln\frac{P_t}{P_{t-1}} = \ln \prod_{t=1}^{T} \frac{P_t}{P_{t-1}}.
$$

The product is $(P_1/P_0)(P_2/P_1)\cdots(P_T/P_{T-1})$. Every intermediate price appears once in a numerator and once in a denominator, so the product equals $P_T/P_0$. The logarithm of that ratio is the claim. The same algebra in the gross-return coordinate is $\prod(1+R_t) = P_T/P_0$, which rearranges to the compound simple return. Exponentiating the sum of log returns recovers it:

$$
\exp\Bigl(\sum_{t=1}^{T} r_t\Bigr) - 1 = \frac{P_T}{P_0} - 1.
$$

That last display is a corollary of the proposition, not a second empirical fact.
:::

:::example Path A, log returns {#ex-path-a-log}
Using the same prices, compute the seven log returns to six decimal places and their sum. Compare the sum with $\ln(1.10)$ and with the compound simple return $0.10$.
:::solution
The natural logarithm of each exact gross return, rounded to six decimal places, is

$$
0.019803,\ -0.009852,\ 0.029270,\ -0.009662,\ 0.038100,\ -0.009390,\ 0.037041.
$$

These seven printed figures add to $0.095310$. By [[#prop-telescope]] the sum of the *exact* log returns is exactly $\ln(110/100) = \ln(1.10)$, and $\ln(1.10) = 0.095310179\ldots$, which rounds to the same six decimals. The compound simple return is $0.10$, and $\exp(0.095310179\ldots) - 1 = 0.10$. You cannot recover $0.10$ by adding the simple returns, and you cannot recover $0.095310$ by adding them either. You recover $0.095310$ by adding the log returns, and you recover $0.10$ by exponentiating that sum and subtracting one, or by dividing the last price by the first.
:::
:::

:::quiz
Which operation equals $\ln(P_T/P_0)$ for a strictly positive price path?
- [ ] The sum of the simple returns $R_t$
- [x] The sum of the log returns $r_t = \ln(P_t/P_{t-1})$
- [ ] The product of the log returns
- [ ] The largest simple return on the path
:::solution
[[#prop-telescope]] says the sum of the log returns telescopes to $\ln(P_T/P_0)$. The sum of the simple returns leaves out the cross terms. The product of the log returns is not a return identity at all. The largest simple return ignores the rest of the path.
:::
:::

### The quadratic approximation

For $|R| < 1$,

$$
\ln(1+R) = R - \frac{R^2}{2} + \frac{R^3}{3} - \frac{R^4}{4} + \cdots.
$$

The first two terms are the approximation used when a log return is replaced by a simple return, or the other way round:

$$
r \approx R - \frac{R^2}{2}.
$$

The error after those two terms begins with $R^3/3$. When $R$ is a few per cent, $R^2/2$ is a few parts in ten thousand and $R^3/3$ is smaller again. When $R$ is $0.50$ or $-0.50$, the quadratic term is $0.125$ and the remainder is several hundredths. The approximation is a statement about small moves. It is not a licence to add simple returns.

The sign of the cubic term matters. If $R > 0$, then $R^3/3 > 0$, so the quadratic approximation sits below the true log return. If $R < 0$, then $R^3/3 < 0$, so the quadratic approximation sits above the true log return: the true log is more negative. A down move and an up move of the same simple-return size are not symmetric in log coordinates. That is the same fact as the two-step example. $\ln(1.50) + \ln(0.50) = \ln(0.75)$, not $0$.

:::example Where the approximation holds, and where it does not {#ex-approx}
Compare $R - R^2/2$ with $\ln(1+R)$ for $R = 0.50$, for $R = -0.50$, and for the first Path A simple return $R = 0.02$.
:::solution
For $R = 0.50$ the quadratic approximation is $0.50 - 0.125 = 0.375$. The log return is $\ln(1.50) = 0.405465$ to six decimals. The approximation is low by about $0.0305$. The leading omitted term is $(0.50)^3/3 \approx 0.0417$, which has the right sign and overshoots because the later terms have not been included.

For $R = -0.50$ the quadratic approximation is $-0.50 - 0.125 = -0.625$. The log return is $\ln(0.50) = -0.693147$ to six decimals. The approximation is high by about $0.0681$: it is not negative enough. The absolute error is larger than on the up move of equal simple-return size. The cubic term $(-0.50)^3/3 \approx -0.0417$ again has the right sign and is not the whole remainder.

For $R = 0.02$ the quadratic approximation is $0.02 - 0.0002 = 0.019800$. The log return is $\ln(1.02) = 0.019803$ to six decimals. The gap is $0.000003$, which is $\ln(1.02)$'s seventh decimal. On Path A the largest simple return is about $0.039$, and the same comparison leaves an error of about two units in the fifth decimal place. For this path, replacing each log return by $R - R^2/2$ and adding is already within $0.00005$ of $\ln(1.10)$. That closeness is a fact about these particular magnitudes. The $0.50$ case shows that it is not a general identity.
:::
:::

:::intuition Addition is the point
A simple return answers "by what fraction of the *previous* level did the price change?" A log return answers "what increment adds, along the path, to the logarithm of total growth?" The first question is local. The second is a coordinate chosen so that a long path becomes a sum. Volatility in the next chapter is a scale of a series of increments. If the increments are simple returns, the scale describes the simple returns. If they are log returns, it describes the log returns. The two scales are close when every move is small, and [[#ex-approx]] shows that "small" is a numerical hypothesis, not a synonym for "return".
:::

## From a path to a profit

Return is dimensionless. Profit is in units of account. The connection needs a starting level and a weight, and the weight is part of the sentence.

:::application A fully invested account, and an account that is not {#app-pnl}
Suppose the account starts at level $V_0$, stays fully invested in the mark $P$, and receives no external cash. Then $V_T = V_0 \cdot P_T/P_0$, and the profit is $V_0$ times the compound simple return. On Path A, with $V_0 = 1$, the profit is $0.10$. With $V_0 = 250$, the profit is $25$. The compound simple return is still $0.10$. Scaling the account scales the profit and does not scale the return.

Now suppose that over a single step only a fraction $w$ of the account is in the asset, the rest earns a simple return of $0$, and $w$ is chosen before the step's return is known. The account's simple return is $w R$, and the profit is $V \cdot w \cdot R$. Take $V = 1000$, $w = 0.20$ and $R = 0.10$. The profit is $20$ units of account. The account's simple return is $0.02$. The asset's simple return is still $0.10$. Reporting $0.10$ as the account's return would describe a different account, the fully invested one. This is bookkeeping. It is not a suggestion to choose the weight $0.20$, or any other weight.
:::

Two further distinctions follow from the same bookkeeping, and both are easy to blur.

First, the arithmetic mean of the simple returns is not the per-step growth of the account. On Path A the seven unrounded simple returns have sample mean $0.013930$, the verified rounding of their average. The per-step geometric return is

$$
(1.10)^{1/7} - 1 = 0.013709
$$

to six decimals. The account that compounds at the arithmetic mean every step would finish at $(1.013930)^7$, which is not $1.10$. The account that compounds at $0.013709$ does finish at $1.10$. The gap between $0.013930$ and $0.013709$ is $0.000221$. Half the square of the verified sample standard deviation $0.022848$ is $0.000261$. The slogan "arithmetic mean minus half a variance" is a small-move approximation to this gap, coming from $R - r \approx R^2/2$ averaged along the path. On Path A it has the right order of magnitude and it is not an identity. The sample variance uses the divisor $n-1$, the average of $R^2/2$ is not that variance, and the cubic remainder is not zero. The next chapter defines the sample standard deviation properly. The point here is only that the mean you are tempted to annualise is not the growth of the account.

Second, a sum of log returns equalling $0.095310$ is not a profit of $0.095310$ units. Exponentiate first. The profit factor and the win rate in a later chapter are sums of pieces of the simple-return column, and they are not the compound return either. Path A can carry a win rate of $4/7$, a profit factor near $4.3898$, a compound simple return of $0.10$, and a log sum of $0.095310$ at the same time, without any of those numbers being a mistake. They answer different questions.


Two simple returns are enough to separate the three summaries. Leave the sliders at +0.50 and −0.50. The sum of the simple returns is 0. The account finishes at 0.75, so the compound simple return is −0.25. The sum of the log returns is ln(0.75), which the figure prints as −0.287682.

:::widget compound
r: 0.5
s: -0.5
caption: Move either return. The sum of the simple returns, the compound simple return, and the sum of the log returns are three different numbers. The default pair is +0.50 then −0.50: the sum is 0 and the account finishes down a quarter. Nothing here is a price path to trade.
:::
:::widget plot
f: ln(1+x); x; x - x^2/2
x: -0.5, 0.5
y: -0.8, 0.6
labels: \ln(1+x); x; x-x^{2}/2
caption: The curve is the log return as a function of the simple return. The straight line is the simple return itself. The third graph is the quadratic approximation. Near zero the three sit together. Towards $\pm 0.5$ they separate, and they separate more on the downside. Nothing drawn here is a price path.
:::

:::remark Rounding at six decimals
The simple returns $0.020000$, $-0.009804$, $0.029703$, $-0.009615$, $0.038835$, $-0.009346$, $0.037736$ and the log returns $0.019803$, $-0.009852$, $0.029270$, $-0.009662$, $0.038100$, $-0.009390$, $0.037041$ are the verified six-decimal roundings of the exact price ratios. Later chapters use the verified sample mean $0.013930$ and the verified sample standard deviation $0.022848$ of the unrounded simple returns. Rebuilding those two summaries from the rounded simple returns changes digits beyond the ones printed. When a later ratio is quoted as $0.6097$, it is the ratio of the two verified summaries, not a fresh division of rounded intermediate columns.
:::

:::history
In 1952 Harry Markowitz set portfolio selection up as a choice about the mean and the variance of return. Diversification, in that argument, is a statement about covariance, not about holding many names. The programme is silent until "return" is specified. The variance of a series of simple returns is not the variance of the corresponding log returns, and a covariance between simple returns is not a covariance between log returns. The definitions above are the part of that 1952 object that has to be fixed before a variance is a meaningful number. This note records the claim as it is stated for the course. It is not a reconstructed quotation.
:::

## Where this leads

Volatility is the scale of a return series, and maximum drawdown is a property of the equity path built from the same series. They are not substitutes. [[performance/volatility-and-drawdown]] defines both and shows a pair of paths with the same standard deviation and different drawdowns. The Sharpe ratio in [[performance/sharpe-and-its-relatives]] divides a mean excess return by a standard deviation, so it inherits every choice made here, including the choice not to annualise seven steps. The price that enters $R_t$ is a close, or an adjusted close, only after [[markets/prices-and-bars]] and [[markets/adjustment-universes-and-rolls]] have said which series is being marked.

:::summary
- The simple return is $R_t = P_t/P_{t-1} - 1$, defined when the previous price is not zero. The gross return is $1+R_t$.
- The compound simple return over a fully invested path is $\prod(1+R_t) - 1 = P_T/P_0 - 1$. On Path A it is $0.10$.
- The sum of simple returns is a different number. On Path A the printed simple returns add to $0.097509$. On a $0.50$ move followed by a $-0.50$ move the sum is $0$ and the compound simple return is $-0.25$.
- The log return is $r_t = \ln(1+R_t)$, defined when prices stay positive. Log returns add: their sum is exactly $\ln(P_T/P_0)$. On Path A that sum is $0.095310$.
- The quadratic approximation $r \approx R - R^2/2$ is the start of the Taylor expansion. It is close on Path A and not close at $R = \pm 0.50$, and the error is larger on the down move.
- A profit needs a starting level and a weight. The asset's simple return is not the account's simple return unless the account is fully invested in that asset.
- The arithmetic mean $0.013930$ is not the per-step geometric growth $0.013709$. Neither number is a CAGR, and neither is a recommendation.
:::

## Exercises

:::exercise One step from 100 to 102 {level=1 check="0.02"}
The price goes from $100$ to $102$. Compute the simple return. (Enter the simple return.)
:::solution
$R = 102/100 - 1 = 0.02$.
:::
:::

:::exercise Log return of a ten per cent move {level=1 check="0.095310"}
A simple return is $0.10$. Compute the corresponding log return, rounded to six decimal places. (Enter the log return.)
:::solution
$r = \ln(1.10) = 0.095310$ to six decimal places. This is also the sum of Path A's log returns, because Path A's compound simple return is $0.10$. The simple return itself is $0.10$, not $0.095310$.
:::
:::

:::exercise Two large opposite moves {level=1 check="-0.25"}
The simple returns are $0.50$ and then $-0.50$. Compute the compound simple return. (Enter the compound simple return.)
:::solution
$(1+0.50)(1-0.50) - 1 = 1.50 \times 0.50 - 1 = -0.25$. The sum of the simple returns is $0$, and that is not what the question asks.
:::
:::

:::exercise The first dip on Path A {level=2 check="0.01"}
Prices go $100$, then $102$, then $101$. Compute the compound simple return from $100$ to $101$. In the solution, also compute the sum of the two exact simple returns and the cross term, and check that sum plus cross term equals the compound simple return. (Enter the compound simple return.)
:::solution
The compound simple return is $101/100 - 1 = 0.01$.

The exact simple returns are $1/50$ and $-1/102$. Their sum is $52/5100 = 0.010196078\ldots$. Their product, the cross term, is $-1/5100 = -0.000196078\ldots$. Adding the cross term cancels the extra $1/5100$ and leaves $51/5100 = 0.01$. The two-step identity $(1+a)(1+b)-1 = a+b+ab$ is an equality, not an approximation. Using the six-decimal rounding $-0.009804$ in place of $-1/102$ moves the check by less than $10^{-7}$.
:::
:::

:::exercise Sum the column, then do not stop {level=2 check="0.097509"}
Add the seven printed Path A simple returns $0.020000$, $-0.009804$, $0.029703$, $-0.009615$, $0.038835$, $-0.009346$, $0.037736$. Report the sum to six decimal places, and explain in the solution why the sum is not Path A's compound simple return. (Enter the sum.)
:::solution
The sum is $0.097509$. The compound simple return is $110/100 - 1 = 0.10$. The difference, $0.002491$, is what the cross terms contribute once the gross returns are multiplied rather than the simple returns added. [[#ex-path-a-simple]] records the same comparison. A sum of percentage changes is a useful intermediate in a variance calculation. It is not the growth of a fully invested account.
:::
:::

:::exercise Weight is part of the profit {level=2 check="0.02"}
An account has level $1000$ at the start of the step. A fraction $0.20$ of the account is in an asset whose simple return over the step is $0.10$. The rest of the account earns a simple return of $0$. Compute the account's simple return over the step. (Enter the account's simple return.)
:::solution
The account's simple return is $w R = 0.20 \times 0.10 = 0.02$. The profit in units of account is $1000 \times 0.02 = 20$. The asset's own simple return remains $0.10$. Confusing the two numbers reports the fully invested account rather than the account in the question. The figure $0.20$ is an input to an exercise, not a weight the text recommends.
:::
:::

:::exercise The cubic term on a down move {level=3 check="-0.223144"}
Let $R = -0.20$. Compute $\ln(1+R)$ to six decimal places. In the solution, also compute the quadratic approximation $R - R^2/2$ and compare the sign of the error with the sign of $R^3/3$. (Enter the log return, rounded to six decimal places.)
:::hint
The expansion is $\ln(1+R) = R - R^2/2 + R^3/3 - \cdots$ for $|R| < 1$. Compute the quadratic piece first, then the logarithm of $0.80$.
:::
:::solution
$\ln(0.80) = -0.223144$ to six decimal places. The quadratic approximation is $-0.20 - (-0.20)^2/2 = -0.20 - 0.02 = -0.220000$. The true log return is more negative. The difference, log minus quadratic, is about $-0.003144$.

The next term is $R^3/3 = -0.008/3 \approx -0.002667$, which has the same sign as the error and accounts for most of it. The following term is $-R^4/4 = -0.0004$, and $-0.002667 - 0.0004 = -0.003067$, close to $-0.003144$. The remainder after the quadratic is not optional once $|R|$ leaves the range of Path A's moves. Because the cubic term is negative for $R < 0$, using $R - R^2/2$ in place of the log return understates the severity of a down move.
:::
:::

:::exercise A dividend the raw close does not see {level=3 check="0"}
The marked price goes from $50$ to $40$, and over the same step the holder receives a cash dividend of $10$. No other cash moves. Compute the total simple return that treats the dividend as part of the gross payoff. In the solution, also compute the raw close-to-close simple return, and say which series [[#prop-telescope]] describes if you feed it the raw prices. (Enter the total simple return.)
:::hint
Add the cash dividend to the terminal price before dividing by the previous price. The raw ratio uses $40$ alone.
:::
:::solution
The total simple return is $(40 + 10)/50 - 1 = 0$. The raw close-to-close simple return is $40/50 - 1 = -0.20$. Both numbers are real. They describe different objects.

[[#prop-telescope]] applied to the raw prices $50, 40$ returns $\ln(40/50) = \ln(0.80)$, which is the log change of the quote. It does not know about the dividend. Applied to a total-return index that goes from $50$ to $50$, it returns $\ln(1) = 0$, matching the account. The identity is exact either way. The error is feeding it a series that is not the account and then calling the output a performance. Splits and dividends are handled systematically in [[markets/adjustment-universes-and-rolls]]. This exercise only shows that the choice of series is part of the result.
:::
:::
