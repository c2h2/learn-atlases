A return series has a typical size, and the equity path built from it has a worst peak-to-trough fall. The typical size is a volatility. The fall is a drawdown. They are summaries of the same path and they are not the same summary. Volatility does not know the order of the returns. Drawdown is almost nothing except order, together with the size of the moves that happen to sit next to the peak.

Path A makes the contrast look small, which is why it is a poor path on which to learn drawdown and a useful path on which to see the trap. The prices are $100, 102, 101, 104, 103, 107, 106, 110$. The equity index that starts at $1$ finishes at $1.10$. Marked at each price, the only peak-to-trough falls are the single down steps, and the deepest is $101/102 - 1 = -0.009804$. A reader who stops there can believe that a standard deviation and a drawdown are two words for "how rough the path was". Path B is there to break the habit: prices $100, 110, 90, 95$, with a peak-to-trough fall of $90/110 - 1 = -0.181818$. Even Path B does not *prove* that volatility fails to determine drawdown, because its volatility is different as well. The proof is a pair of paths that share a multiset of returns and do not share a drawdown.

The simple returns used below are the ones defined in [[performance/simple-and-log-returns]]. The sample mean of Path A's seven unrounded simple returns, rounded to six decimals, is $0.013930$. The sample standard deviation defined in this chapter, with divisor $n-1$, rounds to $0.022848$. Those two verified figures are inputs to the next chapter's ratio. This chapter says what the second figure is, what it is not, and why multiplying it by $\sqrt{252}$ is an assumption rather than a unit conversion you are entitled to.

None of the paths is a market, a fund, or a recommendation. A small standard deviation is not a reason to prefer a path. A large drawdown is not, by itself, a reason to take the other side of a published rule.

## Sample volatility

:::definition Sample mean and sample standard deviation {#def-vol}
Let $R_1, \ldots, R_n$ be simple returns, $n \ge 2$. The sample mean is $\bar R = n^{-1}\sum_{t=1}^{n} R_t$. The **sample variance**, with divisor $n-1$, is

$$
s^2 = \frac{1}{n-1}\sum_{t=1}^{n}(R_t - \bar R)^2,
$$

and the **sample standard deviation** is $s = \sqrt{s^2}$. In this atlas, "volatility" of a return series means this $s$, unless a sentence names a different divisor or an annualising factor. The symbol $\sigma$ is reserved for a population standard deviation in a model, not for a number computed from a sample.
:::

The divisor is $n-1$ because the deviations are taken from the sample mean, which is computed from the same $n$ numbers. For an independent sample from a distribution with finite variance, $s^2$ is an unbiased estimator of that variance. Unbiasedness does not pass through the square root: $\sqrt{\cdot}$ is concave, so Jensen's inequality gives $\E[\sqrt{V}] \le \sqrt{\E[V]}$, and the inequality is strict when $V$ is non-degenerate. Quoting $s$ is the convention in this atlas. It is not a claim that $s$ itself is unbiased, and on a dependent path it is a summary rather than that estimator.

Dividing by $n$ instead of $n-1$ produces the root-mean-square deviation from the sample mean. It is smaller than $s$ by exactly $\sqrt{(n-1)/n}$. For Path A, $n = 7$, so the factor is $\sqrt{6/7}$. Applied to the verified $s = 0.022848$, it gives $0.021153$ to six decimals. Both numbers describe the same seven deviations. A comparison of two volatilities that uses $n-1$ on one side and $n$ on the other is not a comparison of paths.

:::example Sample standard deviation of Path A {#ex-vol-a}
The verified sample mean of the seven unrounded simple returns is $0.013930$, and the verified sample standard deviation with divisor $n-1$ is $0.022848$. The sum of squared deviations of the unrounded simple returns from their mean is $0.00313205$ to eight decimals. Show how that sum produces $0.022848$.
:::solution
There are $n = 7$ simple returns, so the divisor is $6$. The sample variance is

$$
s^2 = \frac{0.00313205}{6} = 0.000522008.
$$

The sample standard deviation is the square root,

$$
s = \sqrt{0.000522008} = 0.0228475\ldots,
$$

which rounds to $0.022848$. The same rounding is what the verified figure records. The printed six-decimal simple returns

$$
0.020000,\ -0.009804,\ 0.029703,\ -0.009615,\ 0.038835,\ -0.009346,\ 0.037736
$$

reproduce the mean $0.013930$ and the standard deviation $0.022848$ at the printed precision. They are the right column to use if you are checking the arithmetic by hand. They are a rounding of the price ratios $P_t/P_{t-1} - 1$, not a second path.

The number $0.022848$ is a scale of those seven simple returns. It is not a drawdown, not a forecast of the next return, and not an annual volatility. Multiplying it by $\sqrt{252}$ is a further operation, defined below, and on seven observations it is an assumption you should be able to point at.
:::
:::

## Annualising a daily scale

:::proposition Scale of an uncorrelated sum {#prop-ann}
Let $R_1, \ldots, R_K$ be uncorrelated random variables with a common finite variance $\sigma^2$. Then

$$
\Var\Bigl(\sum_{i=1}^{K} R_i\Bigr) = K\sigma^2,
$$

and the standard deviation of the sum is $\sigma\sqrt{K}$. In particular, if each $R_i$ is a daily simple return and one is willing to treat $252$ trading days as uncorrelated and of equal variance, the standard deviation of the sum of $252$ of them is $\sigma\sqrt{252}$.
:::

:::proof
Uncorrelated means $\Cov(R_i, R_j) = 0$ for $i \neq j$. The variance of a sum is the sum of the variances plus twice the sum of the covariances, so every cross term drops and $\Var(\sum R_i) = \sum \Var(R_i) = K\sigma^2$. The standard deviation is the positive square root. Nothing in the argument says that the $R_i$ are normal, and nothing in it says that $\prod(1+R_i) - 1$ has standard deviation $\sigma\sqrt{K}$. The sum of simple returns is not the compound return. [[performance/simple-and-log-returns]] gives the cross terms that the sum omits. Annualising a volatility by $\sqrt{K}$ is a statement about the additive sum, used as a scale convention. It is not a theorem about the distribution of a one-year compound return.
:::

The convention $K = 252$ is a count of trading days that you name when you use it. It is not a fact about the calendar, and it is not appropriate for weekly, monthly, or intraday steps. Applying $\sqrt{252}$ to Path A's $0.022848$ produces $0.3627$ to four decimals. That product pretends the seven daily simple returns are a draw from a process you are willing to spread, uncorrelated and with equal variance, across a year of trading days. The seven points do not test the pretence. The same inflation, applied to the per-step ratio $0.6097$, is the figure near $9.68$ rejected as an annual performance in [[performance/sharpe-and-its-relatives]]. A constant factor is not evidence.

:::intuition Order and the square
The sample variance adds squared deviations. A squared number forgets the sign, and a sum forgets the order. Two paths with the same returns in a different order have the same $\bar R$ and the same $s$. The account does not have the same experience, because the account multiplies gross returns in sequence. Any path property that depends on sequence — the worst peak-to-trough fall, the time spent below a previous peak, the level at which a loss occurs — can differ while $s$ stays fixed. That is the content of [[#prop-not-dd]]. It is also why a small $s$ can sit next to one ugly gap: the gap is squared, averaged with the quiet steps, and divided. Averaging is the opposite of looking at the worst step.
:::

## Downside deviation

A standard deviation treats an up move and a down move of equal size as equal contributions to risk. That is a coherent choice if the object of interest is the width of the whole distribution. It is a poor match to the ordinary word "risk" if what hurts the account is the shortfall below a target. Downside deviation is the scale that keeps only the shortfall.

:::definition Downside deviation {#def-down}
Fix a target $\tau$. For a sample $R_1, \ldots, R_n$ the **downside deviation** relative to $\tau$ is the root mean square of the shortfalls, with the positive parts replaced by zero:

$$
\delta_\tau = \sqrt{ \frac{1}{n} \sum_{t=1}^{n} \min(R_t - \tau,\ 0)^2 }.
$$

The divisor is $n$, the full sample length, not $n-1$ and not the number of shortfalls. A return that meets or beats the target contributes a zero inside the sum. It is not dropped. In this chapter the target is $\tau = 0$ unless a sentence names another target. The square root of an average of squares is not a standard deviation of the negative subset. Dividing only by the count of negative returns would be a different statistic, and this atlas does not call that statistic downside deviation.
:::

The zero contributions matter. If you drop them, a path with one loss and ninety-nine gains can show the same downside deviation as a path that lost on every step by the same amount. Keeping the zeros means that a rare loss is diluted by the quiet steps, which is what a root mean square does. Dilution is not a bug in the definition. It is the reason downside deviation, like ordinary volatility, can still hide a gap. It hides less of the gap than $s$ does, because the large positive returns, which inflate $s$, contribute nothing here.

:::example Downside deviation of Path A {#ex-down-a}
Using $\tau = 0$ and the seven printed simple returns, compute the downside deviation to six decimal places.
:::solution
The three negative printed returns are $-0.009804$, $-0.009615$ and $-0.009346$. The four positive returns contribute $0$ to the sum of squares. The sum of squares of the absolute shortfalls is

$$
(0.009804)^2 + (0.009615)^2 + (0.009346)^2 = 0.000275914.
$$

Divide by $n = 7$, not by $3$ and not by $6$:

$$
\frac{0.000275914}{7} = 0.000039416,\qquad \sqrt{0.000039416} = 0.006278
$$

to six decimals. The unrounded price ratios produce the same six-decimal downside deviation. It is smaller than the sample standard deviation $0.022848$ because the four positive returns, some of them near $0.04$, sit inside $s$ and sit out of $\delta_0$. The next chapter's Sortino ratio puts the mean $0.013930$ over this denominator. The ratio is larger than the Sharpe ratio of the same path because the denominator is smaller, not because a new fact about the path has appeared.
:::
:::

If every return is at or above the target, then $\delta_\tau = 0$. A ratio with $\delta_\tau$ in the denominator is then undefined. Calling it infinite is a convention about division by zero, not a measurement of a very safe path. A short rising sample can have no down step. Path A has three, so $\delta_0$ is defined and positive.

## Maximum drawdown

Volatility is computed from the returns as an unordered cloud of deviations. Drawdown is computed from the equity index as a sequence.

:::definition Maximum drawdown {#def-dd}
Let the equity index start at $E_0 = 1$ and update by $E_t = E_{t-1}(1+R_t)$. If the account is fully invested in a single positive price $P$, the same index is $E_t = P_t/P_0$. The running peak is $M_t = \max_{0 \le s \le t} E_s$. The drawdown at $t$ is

$$
D_t = \frac{E_t}{M_t} - 1 \le 0.
$$

The **maximum drawdown** is $\min_t D_t$, the most negative of these values. It is reported as a negative fraction. The absolute value $| \min_t D_t |$ is a depth. This atlas does not flip the sign inside the definition and then call the positive number a drawdown. A sentence that needs the depth says "absolute drawdown".

The marks are the dates at which $E_t$ is observed. A gap inside a bar that is not a mark does not appear. Close-to-close drawdown is a property of the closes, not of every print between them. [[markets/prices-and-bars]] is where a bar is distinguished from a path.
:::

On a path that ends above where it started, the maximum drawdown can still be strictly negative. "It made money" and "it never fell below a previous peak" are different sentences. Path A ends at $1.10$ and its maximum drawdown is $-0.009804$.

The worst single simple return is not the maximum drawdown either. One down step off a peak has drawdown equal to that simple return, because $E_t/E_{t-1} - 1 = R_t$ and $M_t = E_{t-1}$ if the peak was the previous mark. Two down steps in a row compound. The drawdown from the peak is $(1+R_{\text{first}})(1+R_{\text{second}}) - 1$, which is worse than either step alone when both are negative. A definition that reports $\min_t R_t$ and calls it the maximum drawdown is reporting a different statistic.

:::example Path B, a drawdown you can see {#ex-path-b}
Prices are $100, 110, 90, 95$. Compute the three simple returns to six decimals, the terminal compound simple return, the sample mean and sample standard deviation of the three returns, and the maximum drawdown of the equity index.
:::solution
The simple returns are

$$
\frac{110}{100} - 1 = 0.100000,
$$
$$
\frac{90}{110} - 1 = -\frac{2}{11} = -0.181818,
$$
$$
\frac{95}{90} - 1 = \frac{1}{18} = 0.055556,
$$

the last two rounded to six decimals. The account ends at $95/100 - 1 = -0.05$. The sample mean of the three exact returns is $-0.008754$ to six decimals. The sum of squared deviations from that mean is $0.045914$ to six decimals, the divisor is $n-1 = 2$, and

$$
s = \sqrt{0.045914 / 2} = 0.151516
$$

to six decimals. The volatility is an order of magnitude larger than Path A's $0.022848$, and the path is only three steps long, so the annualising factor $\sqrt{252}$ would turn $0.151516$ into a number near $2.4$. That product is not reported here as an annual volatility. Three observations do not support it. [[#prop-ann]] already said what would have to be true.

The equity index is $1$, $1.1$, $0.9$, $0.95$. The running peak is $1$, then $1.1$, and it stays $1.1$. The drawdowns are $0$, $0$, $0.9/1.1 - 1 = -0.181818$, and $0.95/1.1 - 1 = -0.136364$. The maximum drawdown is $-0.181818$, which is $-18.1818$ per cent. After the trough the index recovers part of the way, to $0.95$, and the drawdown from the peak becomes shallower. The maximum does not heal when the path bounces. The terminal result, down $5$ per cent from the start, is a different sentence from the peak-to-trough result, down $18.1818$ per cent from the high.

On this particular path the worst simple return equals the maximum drawdown, because the trough is one mark after the peak. That coincidence is the single-step case mentioned above. It is not the definition.
:::
:::

Path A, for comparison, has equity index

$$
1,\ 1.02,\ 1.01,\ 1.04,\ 1.03,\ 1.07,\ 1.06,\ 1.10.
$$

Each down step falls off a fresh peak, so each drawdown equals that step's simple return, and the deepest is $-0.009804$. There is no two-step decline. Saying "the only peak-to-trough on this rising path is the step $102 \to 101$" is exact, provided the marks are the prices in the list. A finer mark schedule could show a deeper fall inside a bar. We do not have those marks, so we do not invent them.

## Volatility does not determine drawdown

Path A and Path B have different volatilities and different drawdowns. That is consistent with volatility determining drawdown, and also consistent with it not determining drawdown. One pair of different numbers cannot separate the two stories. The separation needs two samples with the same volatility and different drawdowns.

:::proposition Volatility does not determine maximum drawdown {#prop-not-dd}
The sample standard deviation of a simple-return series does not determine the maximum drawdown of the equity index built from those returns. More sharply: any two series with the same multiset of simple returns have the same sample mean and the same sample standard deviation, but they need not have the same maximum drawdown.

Assumptions: the equity index is fully invested, with no external cash, and it is marked exactly at the dates of the simple returns. Drawdown is [[#def-dd]]. Volatility is [[#def-vol]]. No assumption is made that the returns are small.
:::

:::proof
The sample mean and the sample variance are functions of the multiset of values. Reordering the sample does not change $\bar R$ or $s$. Maximum drawdown depends on the order, because the running peak depends on the order. It is therefore enough to exhibit one multiset and two orders.

Take the multiset $\{0.10,\ 0.10,\ -0.10,\ -0.10\}$. The mean is $0$. The sum of squared deviations is $4 \times 0.01 = 0.04$. The divisor is $3$. The sample variance is $0.04/3$ and

$$
s = \sqrt{0.04/3} = 0.115470
$$

to six decimals, in either order.

Order C, the two gains first, builds the equity index $1$, $1.10$, $1.21$, $1.089$, $0.9801$. The running peak reaches $1.21$ and the terminal level is $0.9801$, so

$$
D = \frac{0.9801}{1.21} - 1 = 0.81 - 1 = -0.19.
$$

The intermediate level $1.089$ is only $-0.10$ below the peak. The maximum drawdown is $-0.19$, which is worse than either individual simple return of $-0.10$, because the two losses compound off the peak: $1.21 \times 0.9 \times 0.9 = 0.9801$.

Order D, alternating, builds $1$, $1.10$, $0.99$, $1.089$, $0.9801$. The running peak is $1.10$. The deepest drawdown is $0.99/1.10 - 1 = -0.10$ at the second step, and the terminal drawdown is $0.9801/1.10 - 1 = -0.109$. The maximum drawdown is $-0.109$.

Both orders finish at the same level, because a product does not depend on order. Both have the same volatility. The maximum drawdowns are $-0.19$ and $-0.109$. No function of $s$ alone can return both numbers. Therefore volatility does not determine maximum drawdown.
:::

The terminal wealth did not determine the drawdown either: both orders end at $0.9801$ and the drawdowns differ. Ending down $1.99$ per cent from the start is compatible with having been down $19$ per cent from the peak and with having been down $10.9$ per cent from the peak. A last-point-to-first-point return throws the path away. That is the same lesson as Path B, where the account ends at $-0.05$ and the maximum drawdown is $-0.181818$, told here with the volatility held fixed so the confounding is gone.

:::quiz
Two equity paths are built from the simple returns $0.10, 0.10, -0.10, -0.10$ and from $0.10, -0.10, 0.10, -0.10$. What is true?
- [ ] The sample standard deviations differ, because the paths feel different
- [ ] The maximum drawdowns match, because both paths end at $0.9801$
- [x] The sample standard deviations match, and the maximum drawdowns do not
- [ ] Both maximum drawdowns equal the worst simple return, $-0.10$
:::solution
The multiset of returns is the same, so the sample mean and the sample standard deviation match. The running peak does not. One order falls $0.19$ from its peak and the other falls $0.109$. The worst single simple return is $-0.10$ in both orders, and that is not the maximum drawdown of the clumped order, where two losses compound.
:::
:::

:::example A small standard deviation beside one gap {#ex-gap}
Consider ten simple returns: $0.005$ nine times, and then $-0.08$. Compute the sample mean, the sample standard deviation, and the maximum drawdown if the large loss is last.
:::solution
The sum of the returns is $9 \times 0.005 - 0.08 = -0.035$, so the sample mean is $-0.0035$. The deviations from the mean are $0.0085$ nine times and $-0.0765$ once. The sum of squares is

$$
9 \times (0.0085)^2 + (0.0765)^2 = 9 \times 0.00007225 + 0.00585225 = 0.0065025.
$$

The divisor is $n-1 = 9$, so the sample variance is $0.0065025/9 = 0.0007225$ and

$$
s = \sqrt{0.0007225} = 0.026879
$$

to six decimals. The large loss is one observation. Squared, averaged with nine mild deviations, and rooted, it becomes a scale of about $0.027$.

The equity index rises for nine steps and then falls by a factor $0.92$. The peak is the mark just before the last step, so the maximum drawdown equals the last simple return, $-0.08$. The scale $0.026879$ did not display a gap of $0.08$. The gap is about three times the sample standard deviation. A reader who was told only $s$ would not know the gap was there. A reader who was told only the maximum drawdown would not know that nine of the ten steps were small gains. The two summaries are not substitutes, which is [[#prop-not-dd]] in a noisier form: here the multiset is not being reordered, but a single squared outlier is being diluted by the average.
:::
:::

:::warning A small standard deviation can hide one gap
Sample variance averages squares. One move of $-0.08$ among nine moves of $0.005$ produces $s = 0.026879$, not $0.08$. The maximum drawdown of that path, with the loss last, is $-0.08$. Quoting the standard deviation without the path invites a reader to treat $0.027$ as the size of a typical bad outcome. The bad outcome in the sample was three times that. Downside deviation dilutes the same gap by a root mean square, so it does not automatically rescue the description. [[#ex-gap]] is a warning about dilution. The counter-example in [[#prop-not-dd]] needs two negative returns that can compound, which is why it uses two copies of $-0.10$.
:::


Orders C and D in the proof share the multiset of simple returns +0.10, +0.10, −0.10, −0.10. The figure draws both equity paths and both drawdown paths. The sample standard deviations match. The maximum drawdowns are −0.19 and −0.109.

:::widget equity
preset: compare
caption: Order C takes both gains first and both losses second. Order D alternates. The shared sample standard deviation does not pick out a unique maximum drawdown. The curves start from an equity index of 1.
:::
:::widget distribution
dist: normal
params: mu=0, sigma=0.01
a: -0.02
b: 0.02
caption: The curve is a normal model of a daily simple return, centred at zero with scale 0.01. The shaded band is the central range from $-0.02$ to $0.02$. Widen sigma and the same band holds less of the distribution: a fixed interval is not a fixed probability once the scale changes. The normal curve is a sketch of a scale. It is not Path A, and it has no drawdown, because a distribution has no order.
:::

:::remark What annualising does not repair
Multiplying Path A's $0.022848$, or Path B's $0.151516$, by $\sqrt{252}$ reports a scale for an uncorrelated sum under [[#prop-ann]]. It does not turn seven observations, or three, into a year of evidence, and it does not turn a standard deviation into a maximum drawdown.
:::

:::history
In 1994 Frank Sortino and Lee N. Price set out a performance ratio that replaces total volatility with downside deviation, so that upside variation is not treated as risk. The denominator they isolated is [[#def-down]]. The ratio itself, a mean over that denominator, is defined in the next chapter. Treating every departure from the mean as risk is the choice a standard deviation makes. It is a coherent choice about width. It is not forced by the mere existence of a return series, and [[#prop-not-dd]] shows that width does not determine the worst peak-to-trough fall. This note follows the course record of the 1994 paper. It is not a reconstructed quotation.
:::

## Where this leads

The Sharpe ratio divides a mean excess return by the sample standard deviation of this chapter. The Sortino ratio divides a mean excess over a target by downside deviation. The Calmar ratio divides a compound annual growth rate by an absolute maximum drawdown. Each denominator is a different sentence, and [[performance/sharpe-and-its-relatives]] keeps the sentences apart. The sampling noise in a standard deviation computed from seven points is the subject of [[performance/uncertainty-of-performance]]. A path property such as maximum drawdown has a sampling distribution too. It is not the sampling distribution of $s$.

:::summary
- Volatility in this atlas is the sample standard deviation of simple returns with divisor $n-1$. On Path A it is $0.022848$. The divisor $n$ produces a smaller root-mean-square figure, $0.021153$ if you rescale the verified $s$.
- Unbiasedness of $s^2$ for a population variance needs an independent sample. The square root $s$ is not in general unbiased for $\sigma$. On a dependent path, $s$ is still a summary and is not that estimator.
- Under uncorrelated equal variances, the standard deviation of a sum of $K$ simple returns is $\sigma\sqrt{K}$. The factor $\sqrt{252}$ is a named convention for trading days. It does not describe the compound return, and Path A's $0.022848 \times \sqrt{252} = 0.3627$ is not a year of evidence.
- Downside deviation relative to a target $\tau$ is the root mean square of $\min(R_t-\tau, 0)$, divided by $n$. On Path A with $\tau = 0$ it is $0.006278$.
- Maximum drawdown is the most negative peak-to-trough fall of the equity index, reported as a negative fraction. On Path A it is $-0.009804$. On prices $100, 110, 90, 95$ it is $-0.181818$.
- The worst simple return is not in general the maximum drawdown. Two losses off a peak compound.
- The same multiset of returns can be ordered to give maximum drawdowns $-0.19$ and $-0.109$ with the same sample standard deviation $0.115470$. Volatility does not determine drawdown.
:::

## Exercises

:::exercise A three-point mean {level=1 check="0.02"}
The simple returns are $0.01$, $0.02$ and $0.03$. Compute the sample mean. (Enter the sample mean.)
:::solution
The sum is $0.06$ and $n = 3$, so the sample mean is $0.02$. The sample standard deviation is not required. The divisor $n-1$ appears only in the variance.
:::
:::

:::exercise Drawdown from 110 to 90 {level=1 check="-0.181818"}
The equity index reaches $110$ and the next mark is $90$, which is below every later mark you need to consider. Compute the drawdown of that peak-to-trough fall, rounded to six decimal places, as a negative fraction. (Enter the drawdown.)
:::solution
$90/110 - 1 = -2/11 = -0.181818$ to six decimal places. The same figure is the maximum drawdown of the price path $100, 110, 90, 95$. The terminal move from $100$ to $95$ is a different number, $-0.05$.
:::
:::

:::exercise Path A's deepest dip {level=1 check="-0.009804"}
Path A's prices are $100, 102, 101, 104, 103, 107, 106, 110$, and the equity index is marked at those prices. Compute the maximum drawdown as a negative fraction, rounded to six decimal places. (Enter the maximum drawdown.)
:::solution
Each decline lasts one step and starts from a new peak. The three negative simple returns are $-0.009804$, $-0.009615$ and $-0.009346$ at the printed precision. The most negative is the step $102 \to 101$, and the maximum drawdown is $-0.009804$. The index still finishes at $1.10$. Ending higher is not the same statement as never having a drawdown.
:::
:::

:::exercise Volatility of a two-and-two multiset {level=2 check="0.115470"}
The simple returns are $0.10$, $0.10$, $-0.10$, $-0.10$, in any order. Compute the sample standard deviation with divisor $n-1$, rounded to six decimal places. (Enter the sample standard deviation.)
:::solution
The mean is $0$. The sum of squared deviations is $4 \times 0.01 = 0.04$. The divisor is $3$, so the variance is $0.04/3$ and

$$
s = \sqrt{0.04/3} = 0.115470
$$

to six decimals. The order does not enter the calculation. [[#prop-not-dd]] uses that fact: the same $s$ sits beside maximum drawdowns of $-0.19$ and of $-0.109$.
:::
:::

:::exercise A three-point downside deviation {level=2 check="0.023094"}
The simple returns are $0.02$, $-0.04$ and $0.01$. Using target $\tau = 0$ and divisor $n$, compute the downside deviation, rounded to six decimal places. (Enter the downside deviation.)
:::solution
Only $-0.04$ is a shortfall. The sum of squares is $0.0016$. Divide by $n = 3$, not by $1$ and not by $n-1 = 2$:

$$
\delta_0 = \sqrt{0.0016 / 3} = 0.023094
$$

to six decimals. Dropping the two zeros and dividing by the count of losses would give $0.04$, which is the absolute loss itself and is not [[#def-down]].
:::
:::

:::exercise A named annualising factor {level=2 check="0.158745"}
A daily simple-return series has sample standard deviation $0.01$. Under the assumptions of [[#prop-ann]] with $K = 252$, compute the standard deviation of the sum of $252$ uncorrelated copies, rounded to six decimal places. (Enter that scaled standard deviation.)
:::solution
[[#prop-ann]] scales the common standard deviation by $\sqrt{252}$:

$$
0.01 \times \sqrt{252} = 0.158745
$$

to six decimals. The assumptions are uncorrelated steps and equal variance, and the object being scaled is the standard deviation of an additive sum, not the standard deviation of a compound return. The input $0.01$ was given as a daily figure. Applying the same factor to a weekly series, or to Path A's seven observations as if they were a year of evidence, is a different and unsupported step. This exercise does not ask for a forecast.
:::
:::

:::exercise Same returns, alternating order {level=3 check="-0.109"}
The simple returns arrive in the order $0.10$, $-0.10$, $0.10$, $-0.10$. The equity index starts at $1$. Compute the maximum drawdown as a negative decimal that is exact at three digits. In the solution, compute the clumped order as well and confirm that the sample standard deviation matches. (Enter the maximum drawdown of the alternating order.)
:::hint
Multiply the gross returns in order, keep the running peak, and divide each level by that peak. The alternating path's peak is $1.10$. The terminal level of either order is $1.10^2 \times 0.90^2$.
:::
:::solution
The alternating equity index is $1$, $1.10$, $0.99$, $1.089$, $0.9801$. The running peak is $1.10$ after the first step and never rises above it. The drawdowns at the later marks are $0.99/1.10 - 1 = -0.10$, $1.089/1.10 - 1 = -0.01$, and $0.9801/1.10 - 1 = -0.109$. The maximum drawdown is $-0.109$.

The clumped order $0.10$, $0.10$, $-0.10$, $-0.10$ has equity index $1$, $1.10$, $1.21$, $1.089$, $0.9801$. The peak is $1.21$ and the terminal drawdown is $0.9801/1.21 - 1 = -0.19$. Both orders have mean $0$ and sample standard deviation $0.115470$ to six decimals, by the calculation in the level-2 exercise on this multiset. The drawdowns differ. That is [[#prop-not-dd]].

Both orders finish at $0.9801$, so the compound simple return, $-0.0199$, also fails to determine the drawdown. A performance number that uses only the ends of the sample has thrown the path away.
:::
:::

:::exercise The square root is not unbiased just because the variance is {level=3 check="0.021153"}
Path A's verified sample standard deviation with divisor $n-1 = 6$ is $0.022848$. Compute the corresponding root-mean-square deviation that uses divisor $n = 7$, rounded to six decimal places. In the solution, explain why an unbiased sample variance does not hand you an unbiased sample standard deviation. (Enter the rescaled figure.)
:::hint
Multiply $0.022848$ by $\sqrt{6/7}$. For the second part, remember that the square root is concave, and think about Jensen's inequality applied to an unbiased estimator of the variance.
:::
:::solution
The sum of squared deviations is the same in both formulas. Changing the divisor from $6$ to $7$ multiplies the variance by $6/7$ and the standard deviation by $\sqrt{6/7}$:

$$
0.022848 \times \sqrt{6/7} = 0.021153
$$

to six decimals. This is the $/n$ summary. It is not a second measurement of the path.

If $V$ is an unbiased estimator of $\sigma^2$, then $\E[V] = \sigma^2$. The square root is concave, so Jensen's inequality yields $\E[\sqrt{V}] \le \sqrt{\E[V]} = \sigma$, and the inequality is strict unless $V$ is constant. An independent normal sample has a non-degenerate sample variance, so $\E[s] < \sigma$. Unbiasedness of $s^2$ is a statement about the variance estimator under an independent sample. It is not a statement about $s$, and it is not a reason to switch Path A's reported volatility from $0.022848$ to $0.021153$ in the middle of a comparison. The next chapter's ratio $0.6097$ uses $0.022848$ in the denominator, the $n-1$ convention, throughout.
:::
:::
