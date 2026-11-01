Forty-eight slices of one recorded history are still one recorded history. A purge can stop a label from crossing a cut. An embargo can insert a gap for serial dependence. A grid search can be counted, and a leading-term scale can be computed under assumptions the search does not meet. None of those repairs creates a second path. A walk-forward that comes out the way the specification hoped is a fact about the path that was fed in, under the rules that were written down. It is not a replication on a new history, it is not a result about every asset class, and it is not a decision to trade.

WF01 is the page to keep in view. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, it has 48 rolling folds over 26 years, with a purge before each test, and the catalogue calls the output slice diagnostics rather than independent out-of-sample evidence. This atlas has not re-run the backtest. The same sentence covers WF02 and WF03. This chapter is what that sentence is for, once the machinery of the earlier chapters is in place. The machinery is worth having. It does not outrank the sentence.

## Folds are functions of one path

:::definition Fold statistic {#def-foldstat}
Fix one recorded price path and one specification: the universe, the clock, the rule, the windows, the purge, the embargo, the cost and the scoring function. The **fold statistic** of fold $k$ is the number that scoring function returns on the test window of fold $k$. It is a function of that single path and of that specification. The vector of all fold statistics is a function of the same two objects.
:::

The definition is austere on purpose. It does not mention a sampling distribution over paths, because the researcher who has one history has not drawn one. It does not mention a broker, an order or a position anyone ought to hold. Changing the specification changes the function. Two functions of one path can be compared as algebra. They cannot be stacked and called a sample from a population of histories that were never observed.

:::definition What "passed" is allowed to mean {#def-passed}
A **passed walk-forward**, in the only sense used in this atlas, means that a scoring rule fixed by the specification met a numerical condition, also fixed by the specification, on the test windows of one recorded path. It does not mean a forecast, a replication on an independent history, or a decision to buy, sell, hold, lever or choose a broker.
:::

:::proposition One path, one sigma-algebra {#prop-one}
Let the recorded prices be one sequence $P_0, \ldots, P_{T-1}$. Each fold statistic in [[#def-foldstat]] is a function of this sequence. The vector of $K$ fold statistics is therefore a single function of one sequence. It is not a sample of $K$ independent copies of a fold statistic computed on $K$ independent sequences, because those other sequences were not observed. Disjoint test windows do not alter the conclusion: disjoint functions of one sequence are still functions of one sequence.
:::

:::proof
By [[#def-foldstat]], the statistic $\theta_k$ of fold $k$ is computed from the specification and from prices at indices that lie on $P$. The map $P \mapsto (\theta_1, \ldots, \theta_K)$ is therefore a function of one argument. An independent replication across histories would be a draw of $K$ sequences, each producing its own $\theta$, with the joint distribution factorising. No such draw was made. Restricting the indices that enter $\theta_k$ so that the test windows do not overlap changes which coordinates of $P$ each $\theta_k$ reads. It does not add a second sequence. If a regime, a drift or a volatility level is itself a function of $P$ and varies more slowly than the test length, then several of the $\theta_k$ read pieces of the same slow function. Their agreement is the slow function showing up more than once.
:::

The proposition is the whole of the negative result. It does not say the fold statistics are useless. A function of one path can still detect a broken clock, a cost model that swallows the gross return, or a rule whose test windows all fail. Those are facts about the experiment that was run. The proposition says only that the facts are about that experiment. WF01's 48 folds are 48 coordinates of one function of one 26-year span. The catalogue's phrase "slice diagnostics, not independent out-of-sample evidence" is [[#prop-one]] in the library's own words.

Agreement across folds is especially easy to over-read when every test window sits inside one bull market. Two long-only rules, or one long-only rule scored twice, will both make money if the path rises through both windows. The windows need not share a day. The shared object is the rise. Calling the agreement two experiments counts the rise twice.

:::example Two bull windows that share no day {#ex-bull}
Fold A has simple returns $0.01$, $0.02$, $-0.005$, $0.015$, $0.01$. Fold B, on later and disjoint dates, has $0.012$, $0.008$, $0.02$, $-0.004$, $0.011$. These returns are invented for the count. They are not a library path and not Path A. Compute the mean return and the compound simple return of each window. A long-only position is held throughout both windows, with no cost. Does the agreement of the two compounds amount to two experiments?
:::solution
Fold A sums to $0.01 + 0.02 - 0.005 + 0.015 + 0.01 = 0.05$, so the mean is $0.05/5 = 0.01$. The gross product is $1.01 \times 1.02 \times 0.995 \times 1.015 \times 1.01 = 1.050829$ to six decimal places, and the compound simple return is $0.050829$.

Fold B sums to $0.012 + 0.008 + 0.02 - 0.004 + 0.011 = 0.047$, so the mean is $0.0094$. The gross product is $1.047736$ to six decimal places, and the compound simple return is $0.047736$.

Both compounds are positive, and the windows share no index. A classmate who says the rule has been confirmed twice has counted one upward drift twice. A buy-and-hold position on the same dates has the same compounds, because the position was long throughout. The fold has not separated the rule from the regime. [[#prop-one]] is the abstract form of the same point: both statistics are functions of one bull path. Nothing in the sign of either compound is a decision to be long any traded asset.
:::
:::

:::example One crash, two overlapping windows {#ex-crash}
Indices $0$ to $6$ have simple returns $0.002$, $0.001$, $-0.05$, $0.002$, $0.001$, $0.003$, $0.002$. Window 1 is indices $0$ to $4$. Window 2 is indices $2$ to $6$. The step is shorter than the window, so the windows overlap. Compute the mean and the compound simple return of each window. Then recompute the mean of window 1 with the shared crash return removed, leaving the other four returns.
:::solution
Window 1 sums to $0.002 + 0.001 - 0.05 + 0.002 + 0.001 = -0.044$, so the mean is $-0.0088$. The compound simple return is $-0.044288$ to six decimal places. Window 2 sums to $-0.05 + 0.002 + 0.001 + 0.003 + 0.002 = -0.042$, so the mean is $-0.0084$. The compound simple return is $-0.042378$ to six decimal places.

Both windows look like small losses, and both losses are the crash of $-0.05$ sitting inside a handful of otherwise tiny returns. The overlap is indices $2, 3, 4$. Removing $-0.05$ from window 1 leaves $0.002$, $0.001$, $0.002$, $0.001$, whose mean is $0.0015$ and whose compound simple return is $0.006013$ to six decimal places. The sign of the five-day mean was the shared day.

This is the geometric dependence of [[validation/walk-forward]], made numerical. It is a different mechanism from [[#ex-bull]], where the windows shared no day and still agreed. A stack of folds can fail to be two experiments either because the tests overlap or because a regime is longer than the gap between them. WF01's catalogue line does not say whether its step equals its test length. Either way, [[#prop-one]] applies.
:::
:::

## A model for how fast the count collapses

One can put a number on the collapse without pretending to have measured WF01. The number is a model. The library table does not report the correlation between fold scores, and this atlas will not invent one.

:::proposition Effective count under equicorrelation {#prop-keff}
Let $X_1, \ldots, X_K$ have common variance $\sigma^2 > 0$ and common pairwise correlation $\rho$, and write $\bar X$ for their average. The covariance matrix is $(1-\rho)I + \rho\,\mathbf{1}\mathbf{1}^{\mathsf{T}}$, where $\mathbf{1}$ is the all-ones vector. Its eigenvalues are $1-\rho$ with multiplicity $K-1$ and $1+(K-1)\rho$ with multiplicity $1$. The matrix is positive semidefinite if and only if $-1/(K-1) \le \rho \le 1$. Whenever it is,

$$
\Var(\bar X) = \frac{\sigma^2}{K}\bigl(1+(K-1)\rho\bigr).
$$

The **effective count** defined by $\sigma^2/K_{\mathrm{eff}} = \Var(\bar X)$ is $K_{\mathrm{eff}} = K / \bigl(1+(K-1)\rho\bigr)$. If $\rho = 0$, then $K_{\mathrm{eff}} = K$. If $\rho > 0$, then $K_{\mathrm{eff}} < K$. If $\rho \to 1$, then $K_{\mathrm{eff}} \to 1$.
:::

:::proof
If $v$ is orthogonal to $\mathbf{1}$, then $\mathbf{1}^{\mathsf{T}} v = 0$, so the matrix sends $v$ to $(1-\rho)v$. The all-ones vector itself is sent to $(1-\rho)\mathbf{1} + \rho K \mathbf{1} = \bigl(1+(K-1)\rho\bigr)\mathbf{1}$. Those are the eigenvalues, with the stated multiplicities, because the orthogonal complement of $\mathbf{1}$ has dimension $K-1$. Both eigenvalues are non-negative exactly when $\rho \le 1$ and $\rho \ge -1/(K-1)$.

For the variance, expand $\Var(\sum_i X_i) = K\sigma^2 + K(K-1)\rho\sigma^2 = K\sigma^2\bigl(1+(K-1)\rho\bigr)$. Divide by $K^2$ to get the variance of the average. Set that equal to $\sigma^2/K_{\mathrm{eff}}$ and solve. The comparisons with $K$ and with $1$ are immediate from the sign of $\rho$ and from the limit.
:::

For $K = 48$ the lower bound on $\rho$ is $-1/47$, about $-0.0213$. An equicorrelation model of $48$ fold scores cannot legally carry a large negative correlation. The only available stories inside the model are "almost uncorrelated" and "positively correlated, hence a much smaller effective count". That is a mathematical restriction, not a finding about WF01. It does stop a particular excuse. One cannot say "the folds are strongly negatively correlated, so $48$ of them are worth even more than $48$ independent observations" and stay inside equicorrelation. Strong negative equicorrelation is not a possible covariance for $K = 48$.

:::example Forty-eight folds, two assumed correlations {#ex-keff}
Assume the model of [[#prop-keff]] with $K = 48$. Compute $K_{\mathrm{eff}}$ at $\rho = 0.5$ and at $\rho = 0.2$. State what the calculation is not.
:::solution
At $\rho = 0.5$ the denominator is $1 + 47 \times 0.5 = 24.5$, and $K_{\mathrm{eff}} = 48/24.5 = 96/49 = 1.959184\ldots$, or $1.96$ to two decimal places. At $\rho = 0.2$ the denominator is $1 + 47 \times 0.2 = 10.4$, and $K_{\mathrm{eff}} = 48/10.4 = 60/13 = 4.615385\ldots$, or $4.62$ to two decimal places.

Under a correlation of one half, forty-eight equicorrelated folds behave, for the variance of their mean, like about two independent observations. Under a correlation of $0.2$ they behave like about five. Neither $\rho$ is a measurement of WF01, WF02 or WF03. The catalogue does not report it. The arithmetic shows the rate of collapse inside the model: you do not need a correlation anywhere near $1$ before $48$ stops being a relevant sample size. Using $K_{\mathrm{eff}}$ as if it were a standard-error input estimated from the library page would pretend we had estimated $\rho$. We have not.
:::
:::

## A regime that ignores the cut

Even non-overlapping folds share a regime when the regime persists across the boundary. A two-state sketch is enough to see the persistence, and it is a sketch. It is not a fitted model of any market in the library.

Take states Calm and Stress, and the transition matrix with rows summing to one,

$$
\begin{pmatrix} 0.85 & 0.15 \\ 0.30 & 0.70 \end{pmatrix}.
$$

From Calm, the next step is Calm with probability $0.85$. From Stress, the next step is Stress with probability $0.70$. A fold boundary that falls between two steps does not reset the state. The chain is the content of the figure below.

:::example The chain usually stays put {#ex-markov}
For the transition matrix above, find the stationary probability of Calm, and the stationary probability that the state one step later equals the state now.
:::solution
Let $\pi_C$ be the stationary probability of Calm and $\pi_S = 1 - \pi_C$. Stationarity gives $\pi_C = 0.85\,\pi_C + 0.30\,\pi_S$. Substitute $\pi_S$: $\pi_C = 0.85\,\pi_C + 0.30(1-\pi_C) = 0.55\,\pi_C + 0.30$. Then $0.45\,\pi_C = 0.30$, so $\pi_C = 0.30/0.45 = 2/3$ and $\pi_S = 1/3$.

The probability of remaining in the current state, under the stationary distribution, is

$$
\frac{2}{3}\times 0.85 + \frac{1}{3}\times 0.70 = \frac{1.70 + 0.70}{3} = \frac{2.40}{3} = 0.80.
$$

Four times out of five, in this stationary sketch, the state after the boundary equals the state before it. Neighbouring folds then share a regime even when they share no calendar index. The matrix was chosen as a clear picture, not estimated from prices. Changing the diagonal entries changes $0.80$. It does not change the qualitative lesson: persistence across a cut is the default behaviour of a chain with a large diagonal, and a walk-forward cut does not create a new draw of the chain.
:::
:::

:::widget markov
matrix: 0.85,0.15; 0.30,0.70
states: Calm; Stress
steps: 24
caption: A two-regime sketch, not a fitted market and not a library result. Calm stays Calm with probability 0.85. A fold boundary that falls between two steps usually does not change the state, so neighbouring folds share a regime even when their test windows are disjoint.
:::

:::intuition The boundary is not a new world
Draw the fold boundary as a vertical line on a path that has already been generated. The line changes which dates you call "test". It does not reroll the path. If the path was calm on the left of the line, the chain above is usually still calm on the right. Two fold statistics that both came out well have then both been read in the calm state. Their agreement is what persistence produces. It is not two visits to two worlds.
:::

## One asset class, one specification, no order

A path is not only one time series. It is one universe. WF01's summary, in the table this atlas quotes, gives the fold count, the geometry, the purge, the diagnostic caveat and a span of 26 years. It does not, in that table, restate the asset list. Whatever list the page used, the result is about that list on that span. A second asset class is a second experiment. Equity books, futures books and foreign-exchange books are different functions of different instruments, which is why they live in [[asset-classes/equity-etf-books]], [[asset-classes/futures]] and [[asset-classes/foreign-exchange]] rather than as corollaries of one walk-forward. This chapter does not rank those instruments and does not suggest holding any of them. It says that a pass on one of them would not be a pass on the others.

The specification is part of the same point. [[#def-foldstat]] includes the cost. Change the cost and the fold statistic changes. A gross compound return and a net compound return are not two opinions about one experiment. They are two specifications. [[research-craft/writing-a-specification]] is where a specification is required to name the universe, the clock, the windows, the cost, the statistic and the search. Until those fields are filled, "the fold passed" does not refer to an object.

:::example The same windows, a stated cost {#ex-cost}
Use the gross product from fold A in [[#ex-bull]], which is $1.050829$ to six decimal places. A specification charges a one-off cost of fraction $c$ of starting notional at the beginning of the window, and no other cost. End wealth is $(1-c)$ times the gross product. Compute the net compound simple return at $c = 0.01$ and at $c = 0.05$. The costs are invented for the arithmetic. They are not a recommended fee and not a library input.
:::solution
At $c = 0.01$, end wealth is $0.99 \times 1.050829 = 1.040321$ to six decimal places, and the net compound return is $0.040321$. At $c = 0.05$, end wealth is $0.95 \times 1.050829 = 0.998288$ to six decimal places, and the net compound return is $-0.001712$.

The gross compound was $0.050829$. One specification still shows a gain. Another, differing only by a stated cost, shows a loss. Both are functions of the same five returns. Neither is a confirmation on a new path, and the sign is not a property of the fold geometry. It is a property of the specification. A write-up that says the walk-forward passed, without naming $c$, has not said which function passed. The atlas does not go on to recommend the cost, the window or a trade that would implement either one.
:::
:::

:::warning A pass is not an order
Suppose every test window met the specification's numerical condition, the purge was in place, the trial count was disclosed and a selection scale was computed under assumptions the author actually believes. The output is still a statement about one historical path. It does not contain an instruction to buy, sell or hold any security, to prefer one asset class, to choose a broker, or to treat a quants.md curve as a forecast. [[#def-passed]] is a limit on vocabulary. "Passed" may mean the inequality in the specification held on this path. It may not mean "trade it".
:::

:::quiz
Two disjoint test windows both sit inside one rising market, and a long-only rule earns a positive compound return on each. What has been shown?
- [ ] Two independent replications, because the windows share no date.
- [ ] A decision to keep the long position, because both folds agreed.
- [x] That the same rising path produced two positive scores. Agreement across the two windows is not two experiments.
- [ ] That the result extends to every asset class, because the sign did not depend on the particular dates inside the rise.
:::solution
[[#ex-bull]] is this situation in numbers. The windows can be disjoint and still be two readings of one drift. A positive sign is not an order, and one universe is not every universe.
:::
:::

:::quiz
Under the equicorrelation model with $K = 48$ and $\rho = 0.5$, what happens to the effective count?
- [ ] It stays $48$, because the model assumes a common variance.
- [ ] It exceeds $48$, because positive correlation is informative.
- [x] It falls to $96/49$, about $1.96$, for the variance of the average. This is a model, not a measurement of WF01.
- [ ] It equals $1$ exactly, for any positive correlation.
:::solution
[[#prop-keff]] gives $K_{\mathrm{eff}} = 48/(1+47\times 0.5) = 96/49 \approx 1.96$. The count equals $1$ only in the limit $\rho \to 1$. The catalogue does not report $\rho$, so the figure is an illustration of collapse, not an estimated standard error for WF01.
:::
:::

:::application Restating WF01 without promoting it
WF01 remains 48 rolling folds, 26 years, a pre-test purge, and a catalogue status of slice diagnostic rather than independent out-of-sample evidence. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, and not re-run here, that is the full numerical claim. The chapter's additions are negative and they are the point. The folds share a path. They may share regimes. They sit in one universe. A selection scale from [[validation/the-deflated-sharpe]], even if its assumptions had held, would still be a scale for a statistic of that path. It would not be a second path. Treating the page as a stack of $48$ confirmations, or as a reason to trade the rule inside it, contradicts the page's own status as well as [[#prop-one]].
:::

:::remark Negative correlation is almost unavailable
The eigenvalue $1+(K-1)\rho$ is negative when $\rho < -1/(K-1)$. For $K = 48$ that floor is $-1/47 \approx -0.0213$. Equicorrelated fold scores cannot be strongly negatively correlated and still have a legal covariance. The effective count can slightly exceed $48$ only in a thin region just below zero. Anyone hoping that "diversification across folds" will make $48$ slices worth hundreds of independent observations is outside the model, not at a flattering corner of it. Overlapping windows and persistent regimes push $\rho$ up, not down. The model does not measure that push on the library pages.
:::

:::history
White's reality check (Econometrica, 2000) already required that a rule found by search be judged as a searched rule, against the null that none of the tried rules has value. Bailey and López de Prado (Journal of Portfolio Management, 2014) carried the same instinct into the Sharpe ratio. Both papers are about the distribution of a statistic on data the researcher holds. This chapter's further point is older than either formula and is not a quotation from them. One historical path, however carefully sliced, purged, searched and deflated, is still one path. The open library's walk-forward pages say so in the language of slice diagnostics. The mathematics above is the reason that language is not modesty for its own sake. It is the sample the pages actually have.
:::

## Where this leads

A fold that has been refused the status of a trade still has to be written precisely enough that another person could recompute it. That document is [[research-craft/writing-a-specification]]. The cuts it names are [[validation/walk-forward]] and [[validation/purging-and-embargo]]. The trial count it must disclose is [[validation/parameter-search]], and the selection scale it must not mis-state is [[validation/the-deflated-sharpe]]. Reading someone else's published curve with the same refusal is [[backtesting/reading-published-tests]].

:::summary
- Each fold statistic is a function of one recorded path and one specification. Forty-eight of them are one function with forty-eight coordinates, not forty-eight histories.
- Disjoint test windows remove shared dates. They do not remove a shared regime. Two bull windows can agree without sharing a day.
- Overlapping windows can put one crash into two means. In the worked crash, dropping the shared return of $-0.05$ flips the first window's mean from $-0.0088$ to $0.0015$.
- Under equicorrelation, $K = 48$ and $\rho = 0.5$ give $K_{\mathrm{eff}} = 96/49 \approx 1.96$. At $\rho = 0.2$ the effective count is $60/13 \approx 4.62$. These are not estimates of WF01.
- For $K = 48$, equicorrelation requires $\rho \ge -1/47$. Strong negative correlation across folds is not available inside the model.
- A passed walk-forward is a numerical fact about one specification and one path. It is not a decision to trade, and it is not a result about every asset class.
:::

## Exercises

:::exercise The independent benchmark {level=1 check="48"}
In the equicorrelation model, $K = 48$ and $\rho = 0$. What is the effective count? (Enter that count.)
:::solution
[[#prop-keff]] gives $K_{\mathrm{eff}} = K$ when $\rho = 0$, so the count is $48$. This is the benchmark the other values fall away from. It is not the dependence structure of WF01. Independent fold scores would require the covariance the proposition sets to zero, and one shared path does not provide that covariance for free.
:::
:::

:::exercise The denominator at one half {level=1 check="24.5"}
For $K = 48$ and $\rho = 0.5$, compute the denominator $1+(K-1)\rho$. (Enter that denominator.)
:::solution
$1 + 47 \times 0.5 = 1 + 23.5 = 24.5$. The effective count is $48/24.5$, not $24.5$ itself. The question asks only for the denominator, which is the factor by which dependence inflates the variance of the mean relative to the independent case.
:::
:::

:::exercise Overlap length {level=1 check="6"}
Two successive test windows have length $H = 10$ and the step is $S = 4$. How many indices lie in both windows? (Enter that count.)
:::solution
The overlap is $H - S = 6$, by the rolling geometry in [[validation/walk-forward]]. Six shared returns are enough to make the two window means functions of a common piece of the path. The effective-count model is a further, optional summary. The overlap itself is already dependence, visible in the index arithmetic, and it does not require a correlation parameter.
:::
:::

:::exercise Effective count at $\rho = 0.2$ {level=2 check="4.62"}
Using [[#prop-keff]] with $K = 48$ and $\rho = 0.2$, compute the effective count and round it to two decimal places. (Enter the rounded value.)
:::solution
The denominator is $1 + 47 \times 0.2 = 10.4$. Then $48/10.4 = 60/13 = 4.61538\ldots$, which rounds to $4.62$. About five effective observations, inside this model, is what forty-eight folds become at a correlation of $0.2$. The model is not a fit to WF01, and $4.62$ is not a sample size one may drop into a standard error for that page.
:::
:::

:::exercise A cost that flips the sign {level=2 check="-0.001712"}
The gross product of a test window is $1.050829$. A one-off cost of fraction $c = 0.05$ of starting notional is charged at the beginning, and end wealth is $(1-c)$ times the gross product. What is the net compound simple return, rounded to six decimal places? (Enter the rounded net return.)
:::solution
End wealth is $0.95 \times 1.050829 = 0.99828755$, and the net compound return is $0.99828755 - 1 = -0.00171245$, which rounds to $-0.001712$. The gross compound return was positive, about $0.050829$. The specification with $c = 0.05$ does not pass a "positive net compound" condition. The specification with $c = 0$ does. They are different experiments on the same returns. The cost is an invention for the arithmetic, not a fee anyone is being told to pay, and the sign is not a trade.
:::
:::

:::exercise One step of the chain {level=2 check="0.85"}
The chain in [[#ex-markov]] is Calm now. What is the probability that it is Calm at the next step? (Enter that probability.)
:::solution
The first row of the transition matrix gives $0.85$. A fold boundary placed on that single step therefore sees the same regime on both sides with probability $0.85$, if the state was Calm. The stationary calculation in the example averages over the starting state and gets $0.80$. Both numbers say the same qualitative thing: the cut is not a fresh draw. Neither number is an estimate from market data.
:::
:::

:::exercise Which correlation cuts forty-eight down to two {level=3 check="23/47"}
In the equicorrelation model with $K = 48$, which correlation $\rho$ produces $K_{\mathrm{eff}} = 2$? (Enter the exact value.)
:::hint
Set $48 / \bigl(1+47\rho\bigr) = 2$ and solve for $\rho$. Check that the result sits above $-1/47$, so the covariance is still legal, and resist the urge to call $\rho$ a property of WF01.
:::
:::solution
The equation $1+47\rho = 48/2 = 24$ gives $47\rho = 23$, so $\rho = 23/47$. Numerically $23/47 = 0.489362\ldots$, just under one half, which matches [[#ex-keff]]: at $\rho = 0.5$ the effective count is already $96/49 \approx 1.96$, a hair under $2$. Since $23/47 > 0 > -1/47$, the matrix is positive definite and the model is legal. The value is the correlation that would have to be present, inside equicorrelation, before forty-eight folds carried the variance information of two independent observations. It is not a correlation estimated from the WF01 page. The page does not report one.
:::
:::

:::exercise Rewrite the claim {level=3}
A classmate says: "Both test windows were positive, so the rule has been confirmed twice, and you should trade it." The windows are the two bull windows of [[#ex-bull]]. They share no date. Rewrite the claim as a statement about one path, and name two decisions the evidence does not justify.
:::hint
Count paths, not folds. [[#def-passed]] limits the verb "passed". The atlas does not convert a fold into an order, a broker or a second asset class. The windows' agreement is the shared rise computed in [[#ex-bull]].
:::
:::solution
Both compounds are functions of one invented rising path. Fold A compounds to about $0.050829$ and fold B to about $0.047736$. They share no index, and they still share the fact that the path rose. A long-only position earns that rise because it was long, not because two histories agreed. The lawful sentence is: on this one path, under a long-only specification with no cost, both test windows had positive compound simple returns.

The evidence does not justify a decision to trade the rule, and it does not justify moving the conclusion to a second asset class or to a live order. It also does not justify calling the two windows independent replications. [[#prop-one]] forbids that promotion even before anyone asks whether the rise would recur. The classmate's "you should trade it" is outside the atlas. A specification can still be written, as in [[research-craft/writing-a-specification]], so that the numerical fact is reproducible. Reproducible is not the same as tradable.
:::
:::
