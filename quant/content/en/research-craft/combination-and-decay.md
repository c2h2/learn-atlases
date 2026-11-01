Two books of research results have a covariance, whether or not anyone averages them. Equal-weighting the books is a calculation about that covariance. The algebra is the same algebra a portfolio chapter uses for assets, and the meaning is not the same, because the correlation you are entitled to insert is the correlation of the books’ results. Two trend books can move together while the assets underneath them do not. Plugging in the asset correlation answers a different question.

Crowding and decay are hypotheses about why a published pattern can come out smaller later. Observable signs — results that move more with peer books, net results that shrink after the specification’s costs — are descriptions. They are not a signal to trade. Stopping a piece of research is allowed. Adding two library CAGRs is not a blend, and this chapter does not do it.

## The correlation that belongs in the formula

:::definition Book correlation {#def-corr}
Let $X$ and $Y$ be the simple-return series of two research books over a common set of periods, each book computed from its own frozen specification. The **book correlation** is the sample correlation of $X$ and $Y$ on those periods, with the divisor of the sample covariance stated (this chapter uses the $n-1$ convention when a sample is estimated, and uses a given $\rho$ when the number is an assumption). Book correlation is not the correlation of the underlying assets unless each book *is* the asset, held with weight $1$.
:::

The definition refuses a shortcut. A specification that is long a basket whenever a slow average rises will share a factor with a second specification that is long the same basket on a similar rule. Their book correlation can be high. A pair of assets inside the basket can still have a modest correlation. [[portfolio/from-signal-to-weight]] maps a signal to a weight for one book. It does not, by itself, supply the correlation between two books.

:::proposition Equal-weight variance {#prop-var}
Let $X$ and $Y$ be random variables with $\Var(X) = \Var(Y) = \sigma^2$ and $\Corr(X,Y) = \rho$, where the variances exist and $|\rho| \le 1$. Let $Z = (X+Y)/2$ be the equal-weight combination, rebalanced so that each book has weight $1/2$ at the start of the period the returns refer to. Then

$$
\Var(Z) = \frac{\sigma^2}{2}(1+\rho), \qquad \sqrt{\Var(Z)} = \sigma \sqrt{\frac{1+\rho}{2}}.
$$

The identity is a fact about second moments. It is not a forecast, not a utility, and not a recommendation to hold the combination.
:::

:::proof
Bilinearity gives

$$
\Var(Z) = \frac14 \Var(X) + \frac14 \Var(Y) + \frac12 \Cov(X,Y).
$$

The covariance is $\rho\,\sigma\,\sigma = \rho\sigma^2$, so

$$
\Var(Z) = \frac14\sigma^2 + \frac14\sigma^2 + \frac12\rho\sigma^2 = \frac{\sigma^2}{2}(1+\rho).
$$

The standard deviation is the non-negative square root. The weight $1/2$ is an assumption of this proposition. A different weight vector is a different random variable and needs its own expansion.
:::

:::corollary Variance rises with book correlation {#cor-mono}
Under [[#prop-var]], with $\sigma > 0$ fixed, $\Var(Z)$ is strictly increasing in $\rho$ on $[-1,1]$. At $\rho = 1$, $\Var(Z) = \sigma^2$. At $\rho = -1$, $\Var(Z) = 0$.
:::

:::proof
The map $\rho \mapsto (\sigma^2/2)(1+\rho)$ has slope $\sigma^2/2 > 0$, so it is strictly increasing. Substituting the endpoints gives $\sigma^2$ and $0$. Perfect correlation removes the variance reduction the equal weight seemed to promise. Perfect negative correlation cancels the two books in this second-moment arithmetic. Neither endpoint is a market fact; both are checks on the formula.
:::

Take $\sigma = 0.10$ for each book, as a modelling assumption with no estimated sample behind it. At book correlation $0.2$,

$$
\Var(Z) = \frac{0.01}{2}(1.2) = 0.006, \qquad \sqrt{\Var(Z)} = 0.077460
$$

to six decimal places. At book correlation $0.9$,

$$
\Var(Z) = \frac{0.01}{2}(1.9) = 0.0095, \qquad \sqrt{\Var(Z)} = 0.097468
$$

to six decimal places. A single book has variance $0.01$ and standard deviation $0.10$. The equal-weight variances are $60\%$ and $95\%$ of that single-book variance. The standard deviations are $77.46\%$ and $97.47\%$ of $0.10$, on the rounded square roots. Most of the variance reduction visible at correlation $0.2$ is gone at correlation $0.9$.

If the books really correlate at $0.9$ and the calculation inserts $0.2$ because that is an asset correlation someone remembers, the reported variance is $0.006$ against a second-moment value of $0.0095$. The ratio $0.0095/0.006 = 1.5833$ to four decimal places: the plugged-in variance is too small by that factor. The formula did not fail. The input was the correlation of the wrong pair of series. [[#def-corr]] is the instruction to name which pair.

:::example The two toy variances {#ex-two-var}
Compute $\Var(Z)$ and the standard deviation at $\rho = 0.2$ and at $\rho = 0.9$ for $\sigma = 0.10$, and the variance at the endpoint $\rho = 1$.
:::solution
From [[#prop-var]], $\Var(Z) = (0.01/2)(1+\rho) = 0.005(1+\rho)$. At $\rho = 0.2$ the variance is $0.006$ and the standard deviation is $\sqrt{0.006} = 0.077460$ to six decimal places. At $\rho = 0.9$ the variance is $0.0095$ and the standard deviation is $\sqrt{0.0095} = 0.097468$ to six decimal places. At $\rho = 1$ the variance is $0.01$ and the standard deviation is $0.10$, equal to one book alone. None of these inputs was estimated from a library page.
:::
:::

:::widget plot
f: 0.1*sqrt((1+x)/2)
x: -1, 1
points: 0.2,0.07746; 0.9,0.09747
caption: Equal-weight standard deviation of two books, each with standard deviation $0.10$, as a function of their correlation. The marked points are the correlations $0.2$ and $0.9$. At correlation $1$ the curve returns to $0.10$. The curve is the formula in [[#prop-var]], not an estimate from any published backtest.
:::

## Compound returns do not average

A one-period equal weight does average simple returns: if the books return $0.04$ and $-0.02$ in the same period, the equal-weight simple return is $0.01$. That identity dies as soon as there are two periods and the compound return is the statistic. [[#prop-avg]] is the precise gap.

:::proposition Two-period compounds do not average {#prop-avg}
Let two books have simple returns $(r, u)$ and $(s, v)$ over two periods. Assume the combination is rebalanced to weights $1/2$, $1/2$ at the start of each period, with no costs. The combination’s growth multiple is

$$
\left(1 + \frac{r+s}{2}\right)\left(1 + \frac{u+v}{2}\right).
$$

The average of the two books’ growth multiples is $\bigl[(1+r)(1+u) + (1+s)(1+v)\bigr]/2$. The average minus the combination’s multiple equals $(r-s)(u-v)/4$. In particular, the average of the compound returns equals the combination’s compound return for all such inputs only if one book matches the other in the first period or in the second.
:::

:::proof
Expand the combination’s multiple:

$$
1 + \frac{r+s}{2} + \frac{u+v}{2} + \frac{(r+s)(u+v)}{4}.
$$

Expand the average of the multiples:

$$
1 + \frac{r+s}{2} + \frac{u+v}{2} + \frac{ru + sv}{2}.
$$

Subtract the first from the second. The linear terms cancel and the remainder is

$$
\frac{ru+sv}{2} - \frac{(r+s)(u+v)}{4} = \frac{(r-s)(u-v)}{4}.
$$

Compound returns are growth multiples minus $1$, so the same difference holds for them. The difference is zero for all pairs only if, for every choice, $r = s$ or $u = v$, which is not true of arbitrary books.
:::

:::example A numerical counterexample {#ex-counter}
Book X returns $0.10$ then $-0.10$. Book Y returns $0$ then $0$. Compute each compound return, their average, and the compound return of the equal-weight rebalanced combination.
:::solution
Book X grows by $1.10 \times 0.90 = 0.99$, so its compound return is $-0.01$. Book Y’s compound return is $0$. The average of the compound returns is $-0.005$. The equal-weight simple returns are $0.05$ and $-0.05$. The combination grows by $1.05 \times 0.95 = 0.9975$, so its compound return is $-0.0025$. The difference, average minus combination, is $-0.0025$, which matches $(r-s)(u-v)/4 = (0.10 - 0)(-0.10 - 0)/4 = -0.0025$. Averaging the compound returns overstates the loss relative to the rebalanced combination, on this toy. On another toy the inequality can flip. The identity to trust is the one in [[#prop-avg]], not a habit of averaging the summary numbers.
:::
:::

:::example One period, so that the average is honest {#ex-one}
Two books return $0.04$ and $-0.02$ in a single period. What is the equal-weight simple return, and why is this not a licence to average multi-year CAGRs?
:::solution
The equal-weight simple return is $(0.04 + (-0.02))/2 = 0.01$. [[#prop-avg]] needs two periods before the cross-term appears, so there is no contradiction. A CAGR over many years is not a one-period simple return. Averaging two CAGRs skips both the cross-term and, when the spans differ, the hypothesis that the periods line up. The figure $0.01$ is a classroom return. It is not a blend of any published books.
:::
:::

## Two library books one might be tempted to add

W01, “Daily SMA Trend”, reports CAGR $+7.38\%$ over $26$ years, reported Sharpe $0.45$, maximum drawdown $-34.7\%$. W18, “Vol Target Momentum”, reports CAGR $+10.96\%$ over $19$ years, reported Sharpe $0.57$, maximum drawdown $-41.2\%$. Both sentences use figures as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run either backtest. W18’s one-line rule is a momentum basket scaled to a $15\%$ volatility target; W01’s is a daily sector trend weight. The volatility-target mechanism belongs to [[portfolio/inverse-volatility-and-targets]]. Here the books appear only as objects a reader might try to blend by arithmetic on the headlines.

Adding the CAGRs gives $7.38 + 10.96 = 18.34$, which is not a CAGR of any experiment in the library. Averaging them gives $(0.0738 + 0.1096)/2 = 0.0917$ as a pure number, or $9.17\%$. That average is not a portfolio CAGR either. The spans are $26$ years and $19$ years, so the two-period identity of [[#prop-avg]] does not even get as far as its hypotheses: there is no common pair of period returns on the page. The total returns, $+537\%$ and $+621\%$, are still less eligible to be added. A serious combination would need the two simple-return series, a shared clock, a weight between books, and a cost. The library extract used here does not provide the series. The toy variances earlier in the chapter are what we can compute without pretending otherwise.

:::warning Do not add the headlines
The slip is to treat two attractive CAGRs as ingredients. Addition assumes a common unit and a common sample, and then still computes the wrong functional if the object you wanted was the compound return of a rebalanced blend. W01 and W18 fail the common-sample step before they fail the functional. Reporting both CAGRs, side by side, with the attribution sentence, is allowed. Reporting $18.34\%$ or $9.17\%$ as what a blend “would have earned” is not.
:::

## Crowding, decay, and stopping

**Crowding**, as used here, is a hypothesis: as more capital runs a published pattern, the net result after costs shrinks, because later participants trade in the same direction and the price impact moves against them. **Decay** is the broader observation that a pattern measured on a later window can be smaller than the pattern that made the window famous, without a commitment to one cause. Both are hypotheses about research results. Neither is a threshold for entering or leaving a market.

Signs that would be *consistent with* crowding, and also consistent with other stories, include a rising book correlation against peer rules that share the pattern, and a net paper result, under the frozen cost, that moves toward zero or through it. The unidentified-gap result in [[research-craft/comparing-implementations]] already forbids reading a single gap as a single cause. A shrinking net result can be crowding, a regime change, a data revision, or the delayed bill for a search that kept a lucky window. A rising correlation can be crowding or a common factor that was always there and has become more visible. Listing the signs is part of the science. Promoting a sign to an order is not.

Stopping is a research decision. A specification can be marked retired because a pre-written rule says so: the monitoring statistic left a band that was written before the new bars arrived. It can be retired because the specification was found to be incomplete, or because the question it asked is no longer the question. Stopping maintains the log. It is not a short sale of the rule, and it is not advice to a reader who does not hold the rule. There is no position in this atlas to exit.

A pre-written band is itself a field. “Stop the research log if the paper compound return over the next $20$ sessions is below $-0.05$” can be honest if it was fixed before those sessions. “Stop because the path disappointed us, and backdate the threshold” is a search, and the search field has to say so. The threshold $-0.05$ in that sentence is an illustration of a form, not a threshold this chapter recommends for any book, including W01 and W18.

:::example What a sign does not authorise {#ex-sign}
Suppose two paper books, each with $\sigma = 0.10$ by assumption, had book correlation $0.2$ in an earlier window and $0.9$ in a later window. The equal-weight variance rises from $0.006$ to $0.0095$. The later window’s net compound return is also smaller. What may you conclude?
:::solution
You may conclude the arithmetic: under [[#prop-var]] the variance of the equal-weight combination is higher at the higher correlation, $0.0095$ against $0.006$, if the standard deviations really stayed at $0.10$. You may record that the net result shrank, if the paper record says so. You may not conclude that crowding is the unique cause, because a shared factor or a regime change can raise correlation and cut a net result without any new capital having followed the rule. You may not convert the rise from $0.2$ to $0.9$ into an order to reduce, reverse, or increase a market position. Stopping the research log can still be the pre-written response to the smaller net result. That is a decision about the log.
:::
:::

:::quiz
Two assets correlate at $0.2$. Two books that are often long the same one of those assets correlate at $0.9$. Which variance belongs in [[#prop-var]] for the equal-weight blend of the books, if each book has standard deviation $0.10$?
- [ ] $0.006$, because the assets correlate at $0.2$.
- [x] $0.0095$, because the books correlate at $0.9$.
- [ ] $0.01$, because equal weighting always preserves variance.
- [ ] $0.006 + 0.0095$, the sum of the two interpretations.
:::solution
[[#def-corr]] puts the book correlation into the formula. The asset correlation would be the right input only for an equal-weight blend of the assets themselves. At $\rho = 0.9$ the variance is $0.0095$, not $0.006$, and the two numbers are not added.
:::
:::

:::quiz
Book X compounds to $-0.01$ and book Y compounds to $0$ over the two-period toy. Why is $-0.005$ not the equal-weight compound return?
- [ ] Because compound returns must be averaged with weights proportional to volatility.
- [x] Because the average of growth multiples differs from the growth multiple of averaged simple returns by $(r-s)(u-v)/4$.
- [ ] Because a negative compound return cannot be blended.
- [ ] Because the equal-weight compound return is always zero.
:::solution
[[#prop-avg]] gives the difference $-0.0025$ on this toy, so the combination’s compound return is $-0.0025$, not the average $-0.005$. The result uses equal weights and no costs. It does not use volatility weights, and a negative number can be an input.
:::
:::

:::remark Diversifying rules is not diversifying assets
The sentence “the books are different ideas, so the correlation is low” is an extra assumption. Different English descriptions can share a factor. The same English description, implemented as orders on one page and as weights on another, can still be highly correlated, or not: O01 and W01 do not report the correlation of their return series in the table this atlas uses, and this chapter does not invent it. Low correlation is something you measure on the series, or assume explicitly as in the $\sigma = 0.10$ toys. It is not something the adjectives guarantee.
:::

:::intuition The square root hides less than people think
Going from correlation $0.2$ to $0.9$ moves the standard deviation only from about $0.077$ to about $0.097$, which looks mild, while the variance moves from $0.006$ to $0.0095$, a factor $1.58$. If a risk limit is written on variance, the mild-looking standard-deviation curve has crossed a large fraction of the gap back to the single-book variance $0.01$. Read the moment the limit actually names.
:::

:::history
Richard Grinold and Ronald Kahn, in *Active Portfolio Management* (2000), treated the combination of signals as a covariance problem and an information ratio as a way to read a result, not as an instruction to trade. The equal-weight identity in [[#prop-var]] is the second-moment piece of that attitude, stripped of any claim about an information coefficient. The book is not a mandate to blend W01 with W18, and the identity is not their formula copied into a library page.
:::

## Where this leads

The calculations stop at the research log. [[research-craft/the-boundary]] says what must not be added to them: a security, a weight to use, a broker, a leverage, a live order, or a promise that a published curve will recur. [[research-craft/comparing-implementations]] is why the two CAGRs were never inputs to [[#prop-avg]] in the first place. [[portfolio/long-only-and-neutral]] is where weight constraints live when the object really is a portfolio of assets rather than a pair of hypothetical books.

:::summary
- Book correlation is the correlation of two specification results, not the correlation of the assets those specifications mention.
- For two books with equal variance $\sigma^2$ and correlation $\rho$, the equal-weight variance is $(\sigma^2/2)(1+\rho)$.
- At $\sigma = 0.10$, that variance is $0.006$ when $\rho = 0.2$ and $0.0095$ when $\rho = 0.9$. The standard deviations are $0.077460$ and $0.097468$ to six decimal places.
- Using $0.2$ when the books correlate at $0.9$ understates the combination’s variance by a factor $1.5833$ to four decimal places.
- The average of two compound returns equals the compound return of the equal-weight blend only in special cases. In the two-period toy the figures are $-0.005$ and $-0.0025$.
- W01’s reported CAGR is $+7.38\%$ over $26$ years and W18’s is $+10.96\%$ over $19$ years. Their sum and their average are not blend results.
- Crowding and decay are hypotheses. A rising correlation or a shrinking net result does not identify a unique cause and is not a trading signal.
- Stopping a research log can be pre-written. It is not an order to leave a position.
:::

## Exercises

:::exercise Variance at correlation $0.2$ {level=1 check="0.006"}
Two books each have standard deviation $0.10$ and correlation $0.2$. Enter the equal-weight variance.
:::solution
$\Var(Z) = 0.005 \times (1 + 0.2) = 0.006$. The standard deviation is not required for this entry. The inputs are assumptions, not library estimates.
:::
:::

:::exercise Variance at correlation $0.9$ {level=1 check="0.0095"}
The same two books have correlation $0.9$ instead. Enter the equal-weight variance.
:::solution
$\Var(Z) = 0.005 \times 1.9 = 0.0095$. By [[#cor-mono]] this had to exceed the variance at correlation $0.2$.
:::
:::

:::exercise The perfect-correlation check {level=1 check="0.10"}
Enter the equal-weight standard deviation when $\sigma = 0.10$ and $\rho = 1$.
:::solution
[[#cor-mono]] gives $\sigma$ itself, so the standard deviation is $0.10$. Equal weighting does not reduce dispersion when the books are the same random variable.
:::
:::

:::exercise Standard deviation at correlation $0.2$ {level=2 check="0.077460"}
Enter $\sqrt{0.006}$ rounded to six decimal places.
:::solution
$\sqrt{0.006} = 0.07745966\ldots$, which rounds to $0.077460$. This is $\sigma\sqrt{(1+\rho)/2}$ at the stated inputs. It is smaller than $0.10$ and larger than the zero you would get at $\rho = -1$.
:::
:::

:::exercise Equal-weight two-period compound return {level=2 check="-0.0025"}
Using book returns $0.10$ then $-0.10$, and $0$ then $0$, enter the compound return of the equal-weight rebalanced combination.
:::solution
Period returns of the combination are $0.05$ and $-0.05$. The multiple is $1.05 \times 0.95 = 0.9975$. The compound return is $-0.0025$. The average of the separate compound returns, $-0.005$, is the trap [[#prop-avg]] exists to catch.
:::
:::

:::exercise How badly the wrong correlation understates {level=2 check="1.5833"}
Divide the equal-weight variance at $\rho = 0.9$ by the equal-weight variance at $\rho = 0.2$. Round to four decimal places.
:::solution
$0.0095 / 0.006 = 1.58333\ldots$, which is $1.5833$ to four decimal places. If $0.9$ is the book correlation and $0.2$ is what was inserted, the inserted variance is too small by this factor. The ratio is not itself a correlation.
:::
:::

:::exercise Derive the variance {level=3}
Derive $\Var\bigl((X+Y)/2\bigr) = (\sigma^2/2)(1+\rho)$ from bilinearity, stating the assumptions.
:::hint
Expand $\Var(aX + bY)$ with $a = b = 1/2$. Replace the covariance by $\rho\sigma^2$. Do not assume independence.
:::
:::solution
Assume $\Var(X) = \Var(Y) = \sigma^2$, $\Cov(X,Y) = \rho\sigma^2$, and $Z = X/2 + Y/2$. Then

$$
\Var(Z) = \frac14\sigma^2 + \frac14\sigma^2 + 2\cdot\frac12\cdot\frac12\cdot\rho\sigma^2 = \frac{\sigma^2}{2} + \frac{\rho\sigma^2}{2} = \frac{\sigma^2}{2}(1+\rho).
$$

Independence would force $\rho = 0$ and variance $\sigma^2/2$, which is the special case $0.005$ when $\sigma = 0.10$. The derivation does not recommend the weight $1/2$.
:::
:::

:::exercise The headline average is not a blend {level=3}
Compute $(0.0738 + 0.1096)/2$. Then say why the result is not a combined CAGR of W01 and W18.
:::hint
The reported spans are $26$ years and $19$ years. [[#prop-avg]] needs aligned period returns even before it will let you average compounds. The library extract does not give those period returns.
:::
:::solution
$(0.0738 + 0.1096)/2 = 0.0917$. W01’s reported CAGR is $+7.38\%$ over $26$ years and W18’s is $+10.96\%$ over $19$ years, as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026, and not re-run here. The number $0.0917$ averages two pure numbers of different spans. It is not the compound return of an equal-weight blend, because the blend’s period returns are not in the source and [[#prop-avg]] shows that even aligned compound returns do not average in general. The sum $0.1834$ is not a CAGR either.
:::
:::
