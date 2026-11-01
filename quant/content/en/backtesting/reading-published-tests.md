The number in the compound-annual-growth-rate column is the last thing to read. Before it, the page has already told you — sometimes by what it prints, sometimes by what it leaves blank — how long the sample was, what was allowed to count as a fill, whether a win was defined, and whether the author has already warned you that a stack of folds is a diagnostic rather than a stack of independent experiments. Reading a published test is the job of recovering that protocol before repeating the adjective next to the growth rate. This chapter does not re-run the fifty library pages. It does not trust them either. They remain QuantJourney examples (Apache-2.0), as reported on quants.md and read in 2026.

A page can be careful and still be easy to over-read. Forty-eight folds feel like forty-eight confirmations. A win rate of $100\%$ feels like the absence of error. A growth rate in double digits feels like a summary that has already absorbed the drawdown. None of those feelings is a step in the checklist below.

## The list you can apply without the code

:::definition Reading checklist {#def-check}
A **reading checklist** for a published backtest asks, in order:

1. **Span.** How long is the sample, in a unit the claim can bear? Days and weeks do not support a compound annual growth rate; several of the library's intraday rows leave that cell blank on purpose, as [[backtesting/intraday-samples]] records.
2. **Clock.** Does a feature dated $t$ earn the return after $t$, or the return that ends at $t$? If the page does not say, the clock is unaudited, not confirmed.
3. **Costs.** Is a cost model stated, including the number and the turnover it multiplies? Silence is not zero. A stated zero is a zero.
4. **Universe.** Which names were eligible at each decision, and were delistings kept for the dates they existed?
5. **Configurations.** How many rules, windows or thresholds were scored before the printed one was chosen? One printed row is not, by itself, a count of one.
6. **Win unit.** A win rate is meaningless until the page says whether a win is a trade, a day, a name or a rebalance.
7. **The page's own label.** If the page calls the output a slice diagnostic, or denies that the folds are independent out-of-sample evidence, that sentence is part of the result. It overrides the atmosphere of the equity curve.

A checklist answers what the page supports. It does not produce a replacement statistic, and it does not produce a trade.
:::

:::algorithm Applying the checklist {#alg-read}
1. Copy the span, the bar size and every reported statistic exactly, including the sign of a drawdown.
2. Write "unreported" next to any column the row does not contain. Do not insert a zero, a convention or a number computed from a neighbouring page.
3. List the protocol differences you can see, and the protocol sentences you cannot see. An unseen clock is a gap in the audit, not a pass.
4. If the page itself restricts how the folds may be read, quote that restriction in ordinary words and stop. Do not promote a diagnostic to evidence because the span was long.
5. If several configurations were scored, say so before you say the winner's growth rate. The next proposition is why.
6. Separate a large reported growth rate from a large reported drawdown. They are two columns. One does not cancel the other.
:::

## The best of two pure noises

The configurations line on the checklist is there because the maximum of several noisy scores has a positive expectation even when every true mean is zero. The model below is the smallest one in which that sentence is a theorem. It is not a correction factor to paste onto a catalogue page.

:::proposition Expected maximum of two noise means {#prop-max}
Let $Z_1$ and $Z_2$ be independent, each distributed as $\Normal(0, \tau^2)$ with $\tau > 0$. Then

$$
\E\bigl[\max(Z_1, Z_2)\bigr] = \frac{\tau}{\sqrt{\pi}}.
$$
:::

:::proof
For any two numbers, $\max(z_1, z_2) = (z_1 + z_2)/2 + |z_1 - z_2|/2$. Taking expectations and using $\E[Z_1] = \E[Z_2] = 0$,

$$
\E\bigl[\max(Z_1, Z_2)\bigr] = \frac{1}{2}\, \E\bigl|Z_1 - Z_2\bigr|.
$$

Independence gives $\Var(Z_1 - Z_2) = \Var(Z_1) + \Var(Z_2) = 2\tau^2$, so $Z_1 - Z_2$ is normal with mean $0$ and variance $2\tau^2$.

It remains to compute $\E|W|$ for $W \sim \Normal(0, \sigma^2)$. By symmetry,

$$
\E|W| = \int_{-\infty}^{\infty} |w|\, \frac{1}{\sigma\sqrt{2\pi}}\, e^{-w^2/(2\sigma^2)}\, dw = \frac{2}{\sigma\sqrt{2\pi}} \int_0^{\infty} w\, e^{-w^2/(2\sigma^2)}\, dw.
$$

Substitute $u = w^2/(2\sigma^2)$, so $du = w\, dw / \sigma^2$ and $w\, dw = \sigma^2\, du$. The limits stay $0$ and $\infty$. The integral becomes

$$
\frac{2}{\sigma\sqrt{2\pi}} \cdot \sigma^2 \int_0^{\infty} e^{-u}\, du = \frac{2\sigma}{\sqrt{2\pi}} = \sigma \sqrt{\frac{2}{\pi}}.
$$

Here $\sigma = \tau\sqrt{2}$, so $\E|Z_1 - Z_2| = \tau\sqrt{2} \cdot \sqrt{2/\pi} = 2\tau/\sqrt{\pi}$. Half of that is $\tau/\sqrt{\pi}$.

The assumptions are independence, a common variance, a mean of zero for each estimator, and the habit of reporting the maximum rather than a pre-specified one of the two. If the two scores were fit on the same prices they would not be independent, and the formula would not apply as a number. The qualitative warning would remain: selection pushes the reported mean up. This proposition does not estimate that push for any library page.
:::

:::example A numerical size for the toy {#ex-tau}
Take $\tau = 0.01$, the standard deviation of a mean and not a return forecast. What is $\E[\max(Z_1, Z_2)]$ to six decimal places, and what would a reader who ignores the selection report?
:::solution
$\E[\max] = 0.01/\sqrt{\pi} = 0.00564189\ldots$, which is $0.005642$ to six decimal places. Each true mean is zero. A reader who prints the winner's mean as if it had been the only rule tried prints a number whose expectation is about fifty-six basis points of the units $\tau$ is measured in, not zero. The figure is a property of two independent normal estimators. It is not a Sharpe ratio, and it is not a prediction. If the protocol had named the rule before the look at the two scores, the expectation of the reported mean would have been zero under this model. The checklist's configurations line is the question that distinguishes those two protocols.
:::
:::

WF04, in one sentence and no further, scores 9 combinations of moving-average windows, each by a backtest's Sharpe ratio, on a 26-year span. The count $9$ is what [[#def-check]] asks you to write down. This chapter does not extend [[#prop-max]] from two independent normals to those nine dependent Sharpe ratios. That extension is a different theorem, and the owner of the search is [[validation/parameter-search]]. The deflated Sharpe ratio is [[validation/the-deflated-sharpe]]. Mentioning the count is the whole of the obligation here.

:::quiz
Under [[#prop-max]], two independent mean-zero estimators are scored and the larger is reported. The expectation of the report is which of the following?
- [ ] Zero, because each estimator is mean zero
- [ ] $\tau$, the standard deviation itself
- [x] $\tau/\sqrt{\pi}$, which is positive
- [ ] The larger of the two true means, both of which are zero, so zero
:::solution
The maximum of the estimators is not an unbiased report of zero once you have selected it. The proof reduces the expectation to half the expected absolute gap, which is $\tau/\sqrt{\pi} > 0$. Reporting a pre-specified estimator, rather than the larger one, would have kept the expectation at zero.
:::
:::

## What the page already says about its folds

WF01, "Rolling Walk-Forward Validation", is 48 folds: sliding fixed-length train and test windows, with a purge before each out-of-sample slice, on a span of 26 years. The catalogue states that the page calls these slice diagnostics, not independent out-of-sample evidence. The same caveat is attached to the other walk-forward rows in the library. The WF01 row, as this atlas has it, does not report a return, a compound annual growth rate, a Sharpe ratio or a drawdown. Those absences are not holes to be filled from W01 or from anywhere else.

Apply [[#alg-read]]. The span is long, 26 years, which is enough calendar for a growth rate to be a defined path statistic *if the page had printed one and had offered it as a single test*. The page did not. It printed 48 folds and a restriction on how to read them. Step 4 of the algorithm stops there. Forty-eight is the number of slices. It is not the number of independent experiments. Calling the folds independent out-of-sample evidence would contradict the page's own sentence. This atlas will not do that, and it will not invent a pooled Sharpe ratio that the row does not contain.

Dependence is the reason the page's caution is the right shape, even before one quotes it. Sliding test windows are pieces of one historical path. Even if the test windows do not overlap, they are ordered slices of one sample, exposed to the same markets and, where a rule was chosen on related training data, to a shared search. An independent experiment would be a path that did not share that history. Counting 48 where the object is one path multiplies the sample size by the number of cuts. [[#prop-max]] is a different failure, about a maximum. WF01's failure mode, as the page itself names it, is the cut. Both belong on the checklist. They are not the same line.

The purge before each test window is part of the catalogue sentence. It is a real piece of protocol, and it does not convert a diagnostic into a set of independent trials. Purging is taken further in [[validation/purging-and-embargo]]. What a fold does not prove is [[validation/what-a-fold-does-not-prove]]. The walk-forward design itself is [[validation/walk-forward]]. This chapter's job is only to refuse the promotion from "48 diagnostics" to "48 confirmations".

:::example A label you are not free to upgrade {#ex-wf}
A summary sentence says: "WF01 ran 48 out-of-sample tests over 26 years and therefore confirms the rule." What does the checklist replace that sentence with?
:::solution
The span is 26 years and the fold count is 48, both as reported. The page's own label is that the folds are slice diagnostics, not independent out-of-sample evidence. No return, growth rate, Sharpe ratio or drawdown is reported on the WF01 row this atlas uses, so none is inserted. The replacement sentence is: WF01 reports 48 sliding slices with a pre-test purge, on 26 years, and calls them slice diagnostics rather than independent out-of-sample evidence. This atlas has not re-run the page. Confirmation is not a word the checklist has earned.
:::
:::

## A large growth rate beside a large hole

W18, "Vol Target Momentum", scales a momentum basket to a $15\%$ volatility target, on daily bars, over 19 years. The figures that follow are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtest. The reported total return is $+621\%$. The reported compound annual growth rate is $+10.96\%$. The reported Sharpe ratio is $0.57$. The reported maximum drawdown is $-41.2\%$. The reported win rate is $64.6\%$. The reported profit factor is $2.05$. The $15\%$ target is a sentence of the rule as catalogued. It is not a volatility you are being told to aim at, and the basket is not a portfolio this course recommends.

The growth rate is large. The drawdown is also large. Dividing the absolute drawdown by the growth rate, $0.412 / 0.1096 = 3.759$ to three decimal places, says that the reported hole is about $3.76$ times one year of the reported growth rate. That ratio is arithmetic on two reported columns. It is not Young's ratio under a verified definition, and it is not a utility. It stops a reading in which $+10.96\%$ has already "netted out" $-41.2\%$. One year of the reported growth rate does not refill that hole. Several do, on this arithmetic, and only if the path after the hole resembles the average the growth rate summarises, which the checklist does not assume.

The span, 19 years, is long enough that a compound annual growth rate is a defined summary of the path the page had. Defined is not the same as predictive, and it is not the same as audited. The row does not, in the one line this atlas has, state the cost model or the decision clock. Both are therefore unreported, not passed. The win rate of $64.6\%$ waits on the win unit, which the one line also does not define. A positive reported Sharpe ratio of $0.57$ is their reported Sharpe ratio. This atlas has not verified the annualisation inside it.

:::warning A growth rate is not the absence of a drawdown
The eye goes to $+10.96\%$ and files $-41.2\%$ as scenery. [[#alg-read]] puts the two numbers in the same sentence. W18 is an illustration of a volatility-targeted momentum basket as that page specified it, including a deep reported drawdown. It is not a cleaner version of a rule whose drawdown you found inconvenient elsewhere. Comparing it with a different momentum page would reopen the single-cause error of [[backtesting/weights-versus-orders]]: too many sentences differ.
:::

:::quiz
W18 reports a compound annual growth rate of $+10.96\%$ and a maximum drawdown of $-41.2\%$. Which reading matches the checklist?
- [ ] The drawdown is irrelevant because the growth rate is positive
- [ ] The page shows that a $15\%$ volatility target avoids large losses
- [x] Both numbers are part of the report, and the drawdown is several times one year of the reported growth rate
- [ ] The Sharpe ratio of $0.57$ has been verified to match this atlas's per-step definition
:::solution
$0.412/0.1096 = 3.759$, so the absolute drawdown is about $3.76$ times the reported annual growth rate. The volatility target is a rule sentence, not a proof that losses stayed small: the reported drawdown is $-41.2\%$. The Sharpe ratio remains a reported Sharpe ratio, with the convention unaudited.
:::
:::

## Two rows, line by line

:::example The checklist on O03 {#ex-o03}
O03, "Limit RSI Dip", is a passive buy-limit below the close when a relative-strength index is weak, on daily bars, over 25 years. The reported total return is $+94.66\%$, the reported compound annual growth rate is $+2.70\%$, the reported Sharpe ratio is $0.14$, the reported maximum drawdown is $-19.09\%$, the reported win rate is $100\%$ and the reported profit factor is infinite. Fill the checklist in prose. The figures are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the page.
:::solution
The span is 25 years of daily bars, long enough for a growth rate to be a summary of a path, not long enough to audit a clock the row does not state. The clock is unreported: a passive limit "below the close" can be filled with information from the same bar, and the one-line description does not say whether the decision was restricted to prices known before the fill. An unaudited clock is not a passed clock. The cost model is unreported. This solution does not write zero. The universe is unreported beyond the rule sentence; this solution does not borrow the equity-fund universe from O01.

The configurations count is unreported. One printed row is not evidence that only one threshold was tried. The win unit is the sore point. A win rate of $100\%$ and an infinite profit factor mean that, under whatever unit the page used, the denominator of the profit factor was zero: no losing unit was recorded. They do not mean the account never fell. The reported maximum drawdown is $-19.09\%$, so the equity index did fall, by nearly a fifth from a peak, while every recorded "win" was a win. A limit that fills only on favourable excursions can produce that pattern; adverse selection of that kind is discussed with the order, not re-derived here, in [[orders/fills-slippage-and-spread]]. The growth rate beside the perfect win rate is $+2.70\%$, which is modest next to the rhetoric a $100\%$ win rate invites. The checklist asks how a win was defined. It does not admire the $100\%$. The page does not call itself a diagnostic. That last line is "not claimed", which is different from WF01's explicit denial.
:::
:::

:::example The checklist on W10 {#ex-w10}
W10, "Monthly Circuit Breaker", is a monthly exchange-traded-fund trend that flattens on a $15\%$ drawdown and then cools down, on daily bars, over 19 years. The reported total return is $+14.2\%$, the reported compound annual growth rate is $+0.70\%$, the reported Sharpe ratio is $-0.45$, the reported maximum drawdown is $-10.6\%$, the reported win rate is $53.3\%$ and the reported profit factor is $1.11$. Fill the checklist. The figures are as reported for that QuantJourney example, read in 2026, and this atlas has not re-run the page.
:::solution
The span is 19 years. The clock and the cost model are unreported in the one-line row, so both are gaps rather than passes. The universe is a monthly trend on exchange-traded funds, with a flatten-and-cooldown rule tied to a $15\%$ drawdown; the names are not listed in the row, so they are not invented here. The configurations count is unreported. The win rate of $53.3\%$ is slightly above one half, on an unstated unit, beside a profit factor of $1.11$. Neither number is a reason to like or dislike the breaker.

The two columns that must be read together are the growth rate $+0.70\%$ and the Sharpe ratio $-0.45$. They disagree in sign. That is allowed, because they are not the same functional: a compound growth rate can be positive while an average excess return scaled by a volatility, under whatever convention the page used, is negative. This atlas has not verified that convention and does not "correct" the Sharpe ratio into the growth rate's sign. The reported maximum drawdown is $-10.6\%$, which sits next to a rule whose text mentions a $15\%$ flatten threshold. The checklist does not conclude that the threshold "worked" because $10.6$ is less than $15$. Different drawdown definitions, a cooldown, and the path's own timing can all produce that pair of numbers. The page does not call the result a slice diagnostic. The honest summary is a small positive reported growth rate, a negative reported Sharpe ratio, a drawdown of $-10.6\%$, and several protocol sentences missing. It is not a policy for when to flatten a book you hold.
:::
:::

:::example An invented dashboard, refused {#ex-toy}
A one-page note, not from the library, says: "CAGR $12\%$ over three days, costs not mentioned, forty thresholds tried, win rate $90\%$ of trades." Apply [[#def-check]] and say which number you will not repeat as evidence.
:::solution
The span is three days, which does not support a compound annual growth rate; the $12\%$ is a short-sample decoration of the kind [[backtesting/intraday-samples]] refuses to promote. Costs are unmentioned, so they are not zero. Forty thresholds are a selection, and [[#prop-max]] is the two-rule version of why the winner's mean is pushed up; forty is worse and is not given a formula here. The win unit is at least stated: trades. A $90\%$ win rate on trades can sit next to a negative compound if the losses are large, a point that belongs to [[performance/win-rate-and-profit-factor]] and is not re-proved on this empty note. The number that must not be repeated as evidence is the $12\%$ growth rate. The note is invented. It is here because the library pages are easy to treat more gently than a note this bald, and the checklist is the same list.
:::
:::

:::widget confidence
dist: normal
n: 20
level: 0.95
intervals: 48
method: t
caption: Forty-eight simulated intervals for a normal mean. About the stated fraction cover the true value, and the misses belong in the picture. WF01's forty-eight folds are not forty-eight of these independent draws; the page calls them slice diagnostics. The draws are noise, not a published backtest.
:::

The widget draws independent samples. That is why a coverage probability is a meaningful sentence about it. WF01's folds are not independent samples, by the page's own account, so you cannot read a coverage probability off the fold count. The picture is a contrast, not a model of the catalogue.

:::remark Reported numbers stay in their columns
O01 and W01, compared in [[backtesting/weights-versus-orders]], are a lesson about not attributing a gap. They are not re-litigated here. O03's infinite profit factor is a lesson about the win unit. W18's growth rate is a lesson about reading the drawdown in the same breath. W10 is a lesson about two columns that need not share a sign. WF01 is a lesson about a restriction the author has already written. A reader who wants one of these pages to be "the" result has skipped the checklist.
:::

:::history
In 2000 Halbert White's reality check gave this course its date for a specific demand: the winner of a large in-sample search needs a test which includes the search, not a test written as if the winner had been the only rule tried. [[#prop-max]] is the two-estimator sketch of why that demand has a sign. The checklist is the reading version of the demand. It does not replace White's test, and it does not compute it for WF04's nine combinations. It stops a reader from skipping the count of configurations on the way to the growth rate.
:::

## Where this leads

The folds WF01 refuses to promote are specified, as a design rather than as a warning label, in [[validation/walk-forward]]. Counting a search properly, beyond the two-noise toy proved here, is [[validation/parameter-search]] and [[validation/the-deflated-sharpe]]. What remains after a fold has been computed with care is [[validation/what-a-fold-does-not-prove]]. A win rate and a profit factor, including an infinite one, are defined in [[performance/win-rate-and-profit-factor]].

:::summary
- Read span, clock, costs, universe, the number of configurations, the win unit and the page's own label before you read the growth rate.
- A blank cell stays blank. Silence on costs is not a zero. An unaudited clock is not a passed clock.
- The expected maximum of two independent mean-zero normal estimators with variance $\tau^2$ is $\tau/\sqrt{\pi}$. For $\tau = 0.01$ that is $0.005642$ to six decimal places.
- WF01's 48 folds are, in the page's own words, slice diagnostics, not independent out-of-sample evidence. The row does not report a growth rate or a Sharpe ratio, and none is invented.
- W18 reports a compound annual growth rate of $+10.96\%$ and a maximum drawdown of $-41.2\%$ over 19 years. The absolute drawdown is $3.759$ times the growth rate. The $15\%$ volatility target is not advice.
- O03 reports a win rate of $100\%$, an infinite profit factor and a growth rate of $+2.70\%$, beside a maximum drawdown of $-19.09\%$. Ask what a win was. Do not admire the $100\%$.
- W10 reports a growth rate of $+0.70\%$ and a Sharpe ratio of $-0.45$. The signs need not match, and this atlas does not force them to.
:::

## Exercises

:::exercise The fold count {level=1 check="48"}
Enter the number of folds the WF01 catalogue row reports.
:::solution
The row says 48 folds. The number $48$ is a count of slices. It is not a count of independent out-of-sample experiments; the page says the folds are slice diagnostics.
:::
:::

:::exercise The page's own restriction {level=1 check="0"}
According to the WF01 page, as this course records it, are the 48 folds independent out-of-sample evidence? Enter $0$ for no and $1$ for yes.
:::solution
The page says they are slice diagnostics, not independent out-of-sample evidence. The entry is $0$. The span of 26 years does not upgrade the label.
:::
:::

:::exercise W18's drawdown {level=1 check="-0.412"}
W18's reported maximum drawdown is $-41.2\%$. Enter that drawdown as a decimal.
:::solution
$-41.2\%$ is $-0.412$. The reported compound annual growth rate, $+10.96\%$, is a different column and is not asked for here.
:::
:::

:::exercise Drawdown against the growth rate {level=2 check="3.759"}
Using W18's reported maximum drawdown of $-41.2\%$ and its reported compound annual growth rate of $+10.96\%$, enter the absolute drawdown divided by the growth rate, to three decimal places.
:::solution
$0.412 / 0.1096 = 3.759124\ldots$, which is $3.759$ to three decimal places. The ratio means the reported hole is about $3.76$ times one year of the reported growth rate. It is not a utility, and it is not a forecast that the hole will be refilled.
:::
:::

:::exercise The two-noise expectation {level=2 check="0.005642"}
For $\tau = 0.01$ in [[#prop-max]], enter $\tau/\sqrt{\pi}$ to six decimal places.
:::solution
$0.01/\sqrt{\pi} = 0.005641895\ldots$, which rounds to $0.005642$. Each true mean is zero. The positive expectation is the effect of reporting the larger estimator. It is not a market return.
:::
:::

:::exercise O03's growth rate, unread as a trophy {level=2 check="2.70"}
Enter O03's reported compound annual growth rate in percent, to two decimal places, without a percent sign. The solution must also record the win rate and say what not to do with it.
:::solution
The reported growth rate is $+2.70\%$, so the figure to enter is $2.70$. The reported win rate is $100\%$ and the reported profit factor is infinite, beside a maximum drawdown of $-19.09\%$. The checklist asks how a win was defined. It does not treat $100\%$ as a reason to admire the row or to copy the limit. This atlas has not re-run the page.
:::
:::

:::exercise Half the absolute gap {level=3}
Derive $\E[\max(Z_1, Z_2)]$ for independent $Z_i \sim \Normal(0, \tau^2)$. You may use $\E|W| = \sigma\sqrt{2/\pi}$ for $W \sim \Normal(0, \sigma^2)$, or derive that integral. State the independence assumption.
:::hint
Write the maximum as the average plus half the absolute difference. The difference of the two estimators has variance $2\tau^2$.
:::
:::solution
$\max(Z_1, Z_2) = (Z_1+Z_2)/2 + |Z_1-Z_2|/2$, so the expectation is half of $\E|Z_1-Z_2|$ because the means are zero. Independence is what makes $\Var(Z_1-Z_2) = 2\tau^2$ rather than $2\tau^2 - 2\Cov(Z_1, Z_2)$. With $\sigma = \tau\sqrt{2}$, $\E|Z_1-Z_2| = \tau\sqrt{2}\cdot\sqrt{2/\pi} = 2\tau/\sqrt{\pi}$, and half of that is $\tau/\sqrt{\pi}$. If you derive the absolute moment: the integral of $w$ times the half-normal density, with the substitution $u = w^2/(2\sigma^2)$, collapses to $\sigma\sqrt{2/\pi}$. The result is not applicable as a number to dependent scores from one shared price path. WF01 is not this proposition. WF04's nine combinations are not this proposition either.
:::
:::

:::exercise What you may not write in a blank {level=3}
O03's one-line catalogue row does not state a cost. A reader wants a number in the cost line of [[#def-check]]. Which substitution is illegitimate, and what do you write instead?
:::hint
Compare the instruction on dash cells in [[#alg-read]] with the wish to treat "not mentioned" as "free".
:::
:::solution
Writing $0$ is illegitimate. Silence is not a stated zero-cost model; [[backtesting/timing-costs-and-biases]] makes the same distinction, and a blank in the library is an unreported cell rather than a measured nought. The cost line of the checklist for this row is "unreported". The same answer applies to the clock: "unreported" is not "legal". O03's reported figures — growth rate $+2.70\%$, Sharpe ratio $0.14$, maximum drawdown $-19.09\%$, win rate $100\%$, profit factor infinite — stay in their columns, and the missing cost is not filled from a neighbouring example. This atlas has not re-run the page, and the refusal to invent a cost is not a judgement that the limit was expensive or cheap.
:::
:::
