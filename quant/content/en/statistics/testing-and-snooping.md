A $t$ statistic answers the question that was asked before the number was seen. A search over twenty rules asks twenty questions and then reports the winner as if it had been the only question. The arithmetic of that distinction is small. It does not depend on a market, and it is not a licence to trade the rule that survived.

The single-test machinery — null hypothesis, size, p-value, and the Student distribution under an independent normal model — is proved in the Maths Atlas, in [hypothesis tests](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing). This chapter specialises it to a mean excess return, then derives the probability of at least one false rejection when several true nulls are tested together. White's reality check and the factor-zoo warning are stated as ideas, not re-derived.

## One mean, one test

Let $X_1,\ldots,X_n$ be excess returns over a stated risk-free rate. In the examples the risk-free rate is zero, so $X_t$ is the simple return itself, and the null says that the mean return is zero. The sample mean is $\bar X$ and the sample standard deviation $s$ uses the divisor $n-1$.

:::definition $t$ statistic of a mean {#def-t}
The **$t$ statistic** for the null hypothesis $\E[X] = 0$ is

$$
t = \frac{\bar X}{s / \sqrt{n}} = \frac{\bar X}{s}\sqrt{n},
$$

provided $s > 0$. Under the additional assumptions that $X_1,\ldots,X_n$ are independent and each is normally distributed with mean zero and the same variance, this statistic follows a Student $t$ distribution with $n-1$ degrees of freedom. A two-sided test of size $\alpha$ rejects when $\abs{t}$ exceeds the $1 - \alpha/2$ quantile of that distribution. The proof of the distributional claim is the one in the Maths Atlas. This chapter does not repeat it.
:::

Read the assumptions again before using a table. Independence fails when returns are autocorrelated, which is the content of [[statistics/moments-and-dependence]]. Normality fails, in particular, when a few large moves dominate the sum. The statistic $t$ can still be computed: it is a scaled mean. What fails with the assumptions is the reference distribution. A p-value taken from a $t_{n-1}$ table is then not a probability under the true null. Heavy tails and dependence both tend to make extreme means more common than the table says, so the table is not a conservative decoration one may safely ignore.

The size $\alpha$ is a property of a pre-specified test. Throughout this chapter the default is $\alpha = 0.05$, two-sided, unless an example says otherwise. Choosing one-sided after seeing that the mean came out positive is a second look at the same sample. It is recorded as a choice, not as a refinement.

:::example A mean that produces $t = 2$ {#ex-t2}
The excess returns $0.01, 0.01, 0.01, 0.05$ are invented, and the risk-free rate is zero. Compute $\bar X$, $s$ with divisor $n-1$, and the $t$ statistic. The two-sided $5\%$ critical value of a $t$ distribution with $3$ degrees of freedom is $3.182$ to three decimals, taken from that reference distribution and not from these four numbers. Does the test reject, if one pretends the normal independent model holds?
:::solution
The mean is $(0.01 + 0.01 + 0.01 + 0.05)/4 = 0.08/4 = 0.02$. The deviations from $0.02$ are $-0.01, -0.01, -0.01, +0.03$. The sum of squares is $3 \times 0.0001 + 0.0009 = 0.0012$. With divisor $n-1 = 3$,

$$
s^2 = 0.0012 / 3 = 0.0004, \qquad s = 0.02.
$$

The standard error is $s/\sqrt{n} = 0.02 / 2 = 0.01$, so $t = 0.02 / 0.01 = 2$. Since $\abs{2} < 3.182$, a two-sided test at size $0.05$ does not reject the null, under the independent normal model. The mean is positive and the statistic is the familiar "about two", and the critical value at three degrees of freedom is still further out than $2$. A rule of thumb inherited from a normal $z$ test, where $1.96$ is the two-sided $5\%$ point, is the wrong reference for $n = 4$. The four returns remain an invented sample. Not rejecting is not evidence that the true mean is zero; it is the statement that a mean of this size is unsurprising under the null when the sample is this short and the model is granted.
:::
:::

:::example Path A under a pretence {#ex-path-t}
Path A has seven simple returns, sample mean $0.013930$ and sample standard deviation $0.022848$ with divisor $n-1$. The risk-free rate is taken to be zero. Compute the $t$ statistic to three decimals. The two-sided $5\%$ critical value of a $t_6$ reference distribution is $2.447$ to three decimals. What does the comparison allow, and what does the alternation of the path forbid?
:::solution
The standard error is $0.022848 / \sqrt{7}$. Since $\sqrt{7} \approx 2.64575$, the standard error is about $0.008636$, and

$$
t = 0.013930 / 0.008636 \approx 1.613.
$$

The same three decimals are obtained from the exact price ratios, whose mean and standard deviation round to the figures used here. Because $1.613 < 2.447$, the two-sided test does not reject a zero mean at size $0.05$, if the independent normal model is granted.

The grant is false on this path. The seven returns alternate in sign, and the lag-1 correlation computed in [[statistics/moments-and-dependence]] is $-0.953430$. The disturbances are not independent draws. The $t_6$ p-value, about $0.16$ under the pretence, is not a probability one may attach to Path A. The useful part of the arithmetic is the scale: the mean is $1.613$ standard errors above zero, and seven observations leave a standard error large enough that the mean does not clear a conventional two-sided hurdle even before dependence is admitted. Choosing a one-sided test after seeing that the mean is positive would replace $2.447$ by the one-sided $5\%$ point $1.943$, and $1.613$ would still fall short. Making that choice because the mean came out positive would, separately, be a second look.
:::
:::

:::quiz
Under the independent normal model, a two-sided $t$ test of a zero mean at size $0.05$ rejects when which event occurs?
- [ ] The sample mean is positive.
- [ ] The $p$-value computed under the alternative is below $0.05$.
- [x] The absolute $t$ statistic exceeds the $1 - \alpha/2$ quantile of the $t_{n-1}$ distribution named in [[#def-t]], with $\alpha = 0.05$.
- [ ] The sample standard deviation is below the sample mean.
:::solution
Size is a probability computed under the null, and the rejection region in [[#def-t]] is a tail statement about $\abs{t}$. A positive mean is not enough: the four-point example has a positive mean and $t = 2$, and it does not reject at three degrees of freedom. The $p$-value is computed under the null, not under the alternative.
:::
:::

## Many true nulls

One test at size $0.05$ rejects a true null with probability $0.05$, when the size is exact. Twenty such tests, run as if each were the only test, are a different experiment. The result that follows is the probability of being embarrassed at least once. It is proved from independence and nothing else.

:::proposition At least one rejection {#prop-multiplicity}
Suppose $m$ tests are independent, and that each has size exactly $\alpha$ when its own null hypothesis is true. If all $m$ nulls are true, the probability that at least one test rejects is

$$
1 - (1 - \alpha)^m.
$$

If instead each test has size at most $\alpha$, and the tests remain independent, the probability of at least one rejection is at most $1 - (1 - \alpha)^m$.
:::

:::proof
Let $A_i$ be the event that test $i$ rejects, and write $A_i^c$ for its complement. Under that test's null, $\Prob(A_i) = \alpha$ in the exact case, so $\Prob(A_i^c) = 1 - \alpha$. Independence of the tests means independence of these events. The probability that every test fails to reject is therefore

$$
\Prob(A_1^c \cap \cdots \cap A_m^c) = \prod_{i=1}^m \Prob(A_i^c) = (1 - \alpha)^m.
$$

The event "at least one rejection" is the complement, so its probability is $1 - (1 - \alpha)^m$.

If instead $\Prob(A_i) \le \alpha$, then $\Prob(A_i^c) \ge 1 - \alpha$. The product of the $\Prob(A_i^c)$ is then at least $(1 - \alpha)^m$, and the probability of the complement is at most $1 - (1 - \alpha)^m$. Discrete test statistics often have size at most $\alpha$ rather than exactly $\alpha$, because the rejection probability cannot hit $\alpha$ on a lattice. The inequality is the version that covers them, still under independence. Nothing in the argument requires the tests to be about the same parameter, or the samples to be the same length. It requires independence, and it requires every null to be true. A test whose null is false contributes a rejection for a different reason, called power, and is not part of this probability.
:::

For $m = 1$ the formula returns $\alpha$, as it must. The expected number of rejections, when all nulls are true and each size is exactly $\alpha$, is $m\alpha$, by adding the $m$ indicators. Expectation and the probability of at least one are different summaries. For rare events they are close. For $\alpha = 0.05$ and $m = 20$ they are not close, and the next example separates them.

:::example Twenty independent tests {#ex-twenty}
Take $m = 20$ and $\alpha = 0.05$, under the exact hypotheses of [[#prop-multiplicity]], with every null true. Compute the probability that no test rejects, the probability that at least one rejects, and the expected number of rejections.
:::solution
The probability that a given test does not reject is $0.95$. Independence multiplies these probabilities:

$$
0.95^{20} = 0.358486
$$

to six decimals. The probability of at least one rejection is

$$
1 - 0.95^{20} = 0.641514,
$$

which rounds to $0.6415$. About two times in three, a battery of twenty independent true-null tests at size $0.05$ produces at least one rejection. The expected number of rejections is $20 \times 0.05 = 1$. So the typical count of false rejections is one, and the probability of none is only about $0.36$. Reporting the smallest p-value among the twenty, without reporting the twenty, converts an event of probability $0.6415$ into an apparent discovery. The calculation uses independence in full. Tests that share a sample are not independent, and the formula is then an analogy for the number of looks, not a p-value for the battery.
:::
:::

:::example Nine looks, and a grid that has nine cells {#ex-nine}
Compute $1 - (1 - 0.01)^9$. Separately, the walk-forward catalogue entry WF04 is a grid of nine combinations: fast windows in $\{20, 50, 80\}$ and slow windows in $\{100, 150, 200\}$, each scored by a backtest's Sharpe ratio, on a $26$-year span. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the page is a parameter grid of that shape. This atlas has not re-run the backtests, and the library table does not report the nine Sharpe ratios or any p-value. What may the number $0.0865$ be compared with, and what may it not?
:::solution
First, $0.99^9 = 0.913517$ to six decimals, so

$$
1 - 0.99^9 = 0.086483.
$$

Rounded to four decimals, the probability is $0.0865$. Under nine independent tests, each of exact size $0.01$, with every null true, the probability of at least one rejection is about $0.0865$. The expected number of false rejections is $9 \times 0.01 = 0.09$.

WF04 contains nine scored backtests. The integer nine is the analogy. The formula is not WF04's family-wise error rate. The nine cells share one history, the slow and fast windows overlap across cells, and a Sharpe ratio is not a p-value computed from a pre-specified $t$ test of a mean. The library does not report the Sharpes, so this chapter does not invent them, and it does not claim that any cell rejected anything. Dependence among the nine backtests means the independent-null calculation is a count of looks. A later walk-forward on a frozen choice is a different object from the nine looks that produced the choice. WF05, in the same catalogue, is thirty trials of a sampler followed by a walk-forward on the winner; those thirty trials are a larger count of looks, and they are discussed as a search in [[validation/parameter-search]], not as thirty confirmations.
:::
:::

The bound that does not need independence is coarser, and it is the one that still applies when every rule is a function of the same years.

:::proposition Bonferroni bound {#prop-bonferroni}
Suppose $m$ tests each have size at most $\alpha/m$ when its own null is true. The tests need not be independent. If all $m$ nulls are true, the probability that at least one test rejects is at most $\alpha$.
:::

:::proof
Let $A_i$ be rejection by test $i$. The event that at least one test rejects is the union $A_1 \cup \cdots \cup A_m$. For any events, whether or not they are independent,

$$
\Prob(A_1 \cup \cdots \cup A_m) \le \sum_{i=1}^m \Prob(A_i).
$$

That is the union bound. Each size hypothesis gives $\Prob(A_i) \le \alpha/m$, so the sum is at most $m \cdot (\alpha/m) = \alpha$. The argument uses nothing about the dependence structure. Positive dependence, the usual situation when many rules are scored on one history, makes the bound loose: the union is smaller than the sum when the rejection events overlap. Loose is not the same as wrong. The bound still holds. What it costs is power. Testing each rule at $\alpha/m$ is a harder hurdle than testing it at $\alpha$, and a real effect that would have cleared $\alpha$ can miss $\alpha/m$.
:::

:::example The bound at twenty tests {#ex-bonf}
Each of $20$ tests is run at size $0.05/20 = 0.0025$, and every null is true. What does [[#prop-bonferroni]] give? If, in addition, the tests are independent and the sizes are exact, what is $1 - (1 - 0.0025)^{20}$?
:::solution
The Bonferroni bound gives a probability of at most $0.05$, with no independence assumption. Under exact sizes and independence the sharper formula applies:

$$
1 - (1 - 0.0025)^{20} = 1 - 0.9975^{20} = 0.048830
$$

to six decimals. The independent case sits just below the bound. The gap is the overlap among rejection events: two tests can both reject, and the union bound counts that outcome twice while the exact formula counts it once. On a single financial history the tests are not independent, so $0.048830$ is not the probability one should quote. The number $0.05$ remains an upper bound if each test really has size $0.0025$. Publishing the best of twenty tests at the unadjusted size $0.05$, and also quoting a Bonferroni adjustment computed afterwards on the winner alone, does not implement the proposition. The adjustment has to govern every test that was run, including the ones that were not written up.
:::
:::

:::intuition The winner is a different random variable
Under a true null, one pre-specified mean fluctuates on the scale $s/\sqrt{n}$. The maximum of $m$ such means fluctuates on a wider scale. Comparing the winner to the reference distribution of a single test treats the maximum as if it were an ordinary draw. [[#prop-multiplicity]] is the exact price of that treatment when the tests are independent: the size of the implicit test "reject if the best p-value is below $\alpha$" is $1 - (1-\alpha)^m$, not $\alpha$. For $m = 20$ and $\alpha = 0.05$ that size is $0.6415$. The procedure rejects a true global null most of the time.
:::

## A search inside the null

Halbert White's reality check, published in 2000, is aimed at this maximum. The idea, not the derivation, is as follows. The null hypothesis is that no rule in a pre-specified catalogue beats a stated benchmark. The test statistic is the performance of the best rule in the catalogue, not the performance of a rule chosen in advance. The reference distribution has to be the distribution of that best performance when the null is true.

Recentring each rule's returns so that its sample mean advantage over the benchmark is removed produces a sample in which the null holds by construction. Resampling entire dates, keeping the cross-section of rules together on each resampled date, preserves the dependence among rules that shared a day. On each resample one recomputes every rule's performance and then takes the maximum. The original, uncentred maximum is then compared with that bootstrap distribution of the maximum. If the original winner is typical of winners that arise when every advantage has been recentred away, the search has not found a departure from the null. The bootstrap used for that comparison is the subject of [[statistics/resampling]]. This chapter does not expand White's statistic into a formula, and it does not apply the procedure to WF04: the library does not publish the nine Sharpe ratios the procedure would need, and a reality check run on invented Sharpes would be theatre.

Campbell R. Harvey, Yan Liu and Heqing Zhu, in 2016, documented the multiplicity behind the published factor literature and argued that the reported $t$ statistics overstate the evidence. Their practical conclusion was that a hurdle near a $t$ statistic of $3$, rather than the single-test value near $2$, was a more honest benchmark once the number of factors that had been tried was taken seriously. That hurdle is their argument about a literature, not a theorem of this chapter, and it is not a licence to treat a $t$ statistic of $3.1$ on a searched rule as confirmed. A hurdle shifts the single-test critical value. It does not by itself put the search inside the null the way a reality check attempts to. The deflated Sharpe ratio developed for a searched backtest is taken up in [[validation/the-deflated-sharpe]], again as a hurdle that rises with the number of trials, not as a number computed for the library grids.

:::widget hypothesis
test: t
tail: two
alpha: 0.05
effect: 0.3
n: 60
caption: One pre-specified two-sided t test. The shaded tails are the size. The widget cannot draw the other nineteen tests that were discarded. If those twenty tests were independent and every null were true, the probability of at least one rejection at this size would be about 0.64.
:::

:::warning A p-value after the fact
A p-value is computed under a null that was stated before the statistic was chosen. Selecting the rule, the lag, the window, or the asset because the $t$ statistic came out large, and then reading the $t$ table as if that rule had been the only one tried, repeats the error [[#prop-multiplicity]] measures. The Path A statistic $1.613$ was computed for a path this course had already fixed, and even then the normal reference distribution does not apply. A p-value attached to the best cell of a nine-cell grid, with the other eight cells unmentioned, is not a p-value at size $0.05$.
:::

:::application What to write down before seeing $t$
The object that has a size of $\alpha$ is a pair: a rule, and a test, both fixed before the evaluation sample is examined. "Fixed" means written down, not merely intended. A specification that leaves the window free, and a table that shows only the window with the largest $t$ statistic, is the battery of [[#ex-twenty]] with an unpublished $m$. The Bonferroni bound is one way to pay for a published $m$ when the tests share data. White's construction is another, aimed at the maximum rather than at each individual size. Neither construction turns a rejected null into a decision to trade. Both of them are about the meaning of the rejection.
:::

:::remark Power is the other error
[[#prop-multiplicity]] is entirely about true nulls. A false null that the test fails to reject is a type II error, and the probability of rejecting a false null is the power. The Maths Atlas plots power against sample size for a single test. Two facts transfer. Power rises with the absolute mean measured in standard errors, and it falls when the hurdle is raised from $\alpha$ to $\alpha/m$. A battery that is honest about multiplicity is less likely to declare a small true effect significant. That is the price of keeping the size of the battery near $\alpha$, and it is not a reason to skip the adjustment. A small true effect that is only visible after twenty unadjusted looks was never estimated at size $0.05$.
:::

:::quiz
Twenty independent tests of true nulls are each run at exact size $0.05$. Which number is the probability that at least one rejects?
- [ ] $0.05$
- [ ] $1$
- [ ] $0.05/20 = 0.0025$
- [x] $1 - 0.95^{20} \approx 0.6415$
:::solution
[[#prop-multiplicity]] with $m = 20$ and $\alpha = 0.05$ gives $1 - 0.95^{20} = 0.641514$, about $0.6415$. The expected number of rejections is $1$, which is a different summary and is not a probability. The Bonferroni threshold $0.0025$ is what each test would be compared with if the battery, rather than each member, were being held at size $0.05$.
:::
:::

:::history
In 2016 Campbell R. Harvey, Yan Liu and Heqing Zhu documented the multiplicity behind the factor literature and argued that published $t$ statistics overstate the evidence. The same warning, in the form of a bootstrap test of the best rule in a catalogue, is Halbert White's reality check of 2000: a test of whether the winner beats the benchmark once the search itself is taken into account. Both papers are about the statistic one is allowed to compare with a single-test table. Neither paper is a backtest of a library example, and neither one selects a strategy.
:::

## Where this leads

The bootstrap inside a reality check, and the difference between resampling single days and resampling blocks, are [[statistics/resampling]]. Turning a grid of Sharpes into a selected statistic, with WF04 and WF05 as the library's own grids, is [[validation/parameter-search]]. A hurdle that grows like the expected maximum of several noise Sharpes is [[validation/the-deflated-sharpe]]. The regression slope this chapter refused to decorate with a classical p-value is [[statistics/regression-on-a-signal]].

:::summary
- The $t$ statistic of a mean excess return is $\bar X \sqrt{n} / s$, with $s$ using divisor $n-1$. It has a $t_{n-1}$ null distribution only under independent normal draws. That theorem is in the Maths Atlas.
- On an invented four-point sample the statistic equals $2$ and does not reject at size $0.05$ against the $t_3$ critical value $3.182$. On Path A it equals $1.613$ and does not reject against the $t_6$ value $2.447$, and the normal model is in any case false there.
- If $m$ independent tests each have exact size $\alpha$ and every null is true, the probability of at least one rejection is $1 - (1-\alpha)^m$. For $m = 20$ and $\alpha = 0.05$ that probability is $0.6415$.
- For nine independent tests at exact size $0.01$ the same probability is $0.0865$. WF04 has nine cells; the count is the analogy, not a p-value for that page.
- The Bonferroni bound needs no independence: testing each of $m$ nulls at size $\alpha/m$ keeps the probability of any false rejection at most $\alpha$.
- White's reality check compares the best rule with a bootstrap distribution of the best rule under a recentred null. It is an idea about the maximum, not a formula derived here.
- A p-value computed after keeping the winner is not the p-value of a pre-specified test.
:::

## Exercises

:::exercise Two tests {#exr-two level=1 check="0.0975"}
Two independent tests each have exact size $0.05$, and both nulls are true. Compute the probability that at least one rejects. (Enter the probability.)
:::solution
By [[#prop-multiplicity]], the probability is $1 - 0.95^2 = 1 - 0.9025 = 0.0975$. It is a little less than $0.05 + 0.05 = 0.10$, because the union bound double-counts the outcome in which both tests reject. The probability is $0.0975$.
:::
:::

:::exercise The four-point statistic {#exr-t level=1 check="2"}
For the excess returns $0.01, 0.01, 0.01, 0.05$, with risk-free rate zero, compute the $t$ statistic of [[#def-t]]. (Enter the statistic.)
:::solution
As in [[#ex-t2]], the mean is $0.02$ and the sample standard deviation with divisor $3$ is $0.02$. Then $t = 0.02 / (0.02 / \sqrt{4}) = 2$. The statistic is $2$.
:::
:::

:::exercise A Bonferroni threshold {#exr-bon-thresh level=1 check="0.0025"}
A battery of $20$ tests is to be held at family-wise size $0.05$ by the Bonferroni bound. At what size is each individual test run? (Enter the individual size.)
:::solution
[[#prop-bonferroni]] uses the individual size $\alpha/m = 0.05/20 = 0.0025$. Each test is run at size $0.0025$.
:::
:::

:::exercise Nine tests at size one percent {#exr-nine level=2 check="0.086483"}
Compute $1 - 0.99^9$ to six decimal places, under the exact hypotheses of [[#prop-multiplicity]]. (Enter the probability to six decimals.)
:::solution
$0.99^9 = 0.9135172475\ldots$, so $1 - 0.99^9 = 0.0864827525\ldots$, which equals $0.086483$ to six decimal places. This is the probability in [[#ex-nine]]. It is not a p-value for the nine cells of WF04. The probability is $0.086483$.
:::
:::

:::exercise Expected false rejections {#exr-expect level=2 check="1"}
Twenty independent tests of true nulls each have exact size $0.05$. What is the expected number of rejections? (Enter the expectation.)
:::solution
Each test contributes an indicator with expectation $0.05$. Linearity of expectation gives $20 \times 0.05 = 1$, and it does not need independence. Independence was used for the probability $0.6415$ of at least one rejection, which is a different number. The expected number is $1$.
:::
:::

:::exercise Path A's scaled mean {#exr-path level=2 check="1.613"}
Using mean $0.013930$, sample standard deviation $0.022848$ and $n = 7$, compute the $t$ statistic to three decimal places. (Enter the statistic.)
:::solution
The standard error is $0.022848/\sqrt{7} \approx 0.008636$. Then $t \approx 0.013930/0.008636 = 1.613$ to three decimals, as in [[#ex-path-t]]. The statistic is $1.613$. It lies below the two-sided $t_6$ $5\%$ point $2.447$, and the $t_6$ reference is in any case the wrong model for an alternating path.
:::
:::

:::exercise Prove the product formula {#exr-prove level=3}
Prove the equality in [[#prop-multiplicity]]: if $m$ tests are independent and each has size exactly $\alpha$ under its own true null, then the probability of at least one rejection is $1 - (1-\alpha)^m$. State where independence is used.
:::hint
Work with the complementary event that every test fails to reject. Independence turns a joint probability into a product. Each factor equals $1-\alpha$ only because the size is exact.
:::
:::solution
Let $A_i$ be the event that test $i$ rejects. Exact size under a true null gives $\Prob(A_i^c) = 1 - \alpha$. The event of no rejection is the intersection $A_1^c \cap \cdots \cap A_m^c$. Independence is used here and only here: it factors the joint probability into $\prod_i \Prob(A_i^c) = (1-\alpha)^m$. The probability of at least one rejection is the complement, $1 - (1-\alpha)^m$. Without independence the product step is false, which is why a grid of backtests on one history does not inherit the formula. The union bound of [[#prop-bonferroni]] is what remains when the product is unavailable.
:::
:::

:::exercise A dependent grid is not nine coins {#exr-grid level=3 check="0.3698"}
Compute $1 - 0.95^9$ to four decimal places. Then say why that number is not the probability that WF04's grid of nine window pairs produces a false discovery. (Enter the four-decimal probability.)
:::hint
The independent calculation is the same product as in [[#prop-multiplicity]]. The catalogue's nine cells are nine looks at one $26$-year span, not nine separate experiments. The library does not report nine p-values.
:::
:::solution
$0.95^9 = 0.6302494097\ldots$, so $1 - 0.95^9 = 0.3697505902\ldots$, which equals $0.3698$ to four decimal places. That is the probability of at least one rejection among nine independent tests of exact size $0.05$ when every null is true. WF04's nine cells share a sample, the windows overlap, and the reported score is a Sharpe ratio rather than a p-value from a pre-specified $t$ test. The library table does not list the nine Sharpes, and this atlas has not re-run them. The number $0.3698$ counts nine independent looks. It is not a probability attached to that page. The four-decimal value is $0.3698$.
:::
:::