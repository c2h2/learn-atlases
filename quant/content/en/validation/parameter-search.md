Search is not validation. A grid that scores nine moving-average windows by an in-sample Sharpe ratio, and then quotes the largest of those nine numbers, has performed nine experiments and kept the winner. The winner is a **selected statistic**. Its distribution, even under a true null of no edge, is the distribution of a maximum, not the distribution of a single window that was written down before any score was seen. Freezing that winner and walking it forward afterwards is a later protocol. It is not a reinterpretation in which the nine scores were nine confirmations all along.

The open library separates these stages more carefully than most published curves do. As reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026, WF04 scores a grid of nine combinations, with the fast window in $\{20, 50, 80\}$ and the slow window in $\{100, 150, 200\}$, each combination run as a backtest and scored by a Sharpe ratio, over a span of 26 years. WF05 runs 30 trials of Optuna's Tree-structured Parzen Estimator over integer simple-moving-average windows with the fast window strictly shorter than the slow window, and then runs a rolling walk-forward on the winner, again over 26 years. This atlas has not re-run either page. The library table does not report the nine cell-level Sharpe ratios, nor the winning windows, nor a Sharpe ratio for the walk-forward stage. Those missing cells stay missing. The numbers in the worked example below are invented for the arithmetic of a maximum. They are not a reconstruction of WF04.

The thirty trials are not thirty confirmations. They are the search. The walk-forward, if the winner is frozen before it begins, is one later test of one frozen choice. If the walk-forward result is allowed to send the researcher back to pick a different trial, the walk-forward has been spent as another search step.

## A grid is a list of trials

:::definition Grid and trial {#def-trial}
A **trial** is one fully specified configuration, scored once on a stated sample by a stated statistic. A **grid** is the set of trials obtained by taking every combination of stated parameter values, optionally after a constraint that deletes illegal combinations. The trial count $N$ is the number of configurations actually scored. Configurations the search never ran do not contribute to $N$, and they do not contribute to the maximum.
:::

WF04's grid, read off the catalogue, is the Cartesian product

$$
\{20, 50, 80\} \times \{100, 150, 200\}.
$$

There are $3 \times 3 = 9$ pairs: $(20,100)$, $(20,150)$, $(20,200)$, $(50,100)$, $(50,150)$, $(50,200)$, $(80,100)$, $(80,150)$, $(80,200)$. Every pair satisfies fast $<$ slow, because the largest fast value is $80$ and the smallest slow value is $100$. On this particular grid the constraint does not delete a cell. On a grid where the two ranges interleave, the same constraint deletes cells, and $N$ is the number that survive, not the area of the rectangle. WF05 states the constraint because its integer ranges can interleave. The catalogue does not publish those ranges. It publishes the trial budget, $30$, and the constraint.

Each of the nine WF04 cells is "scored by a real backtest's Sharpe", in the catalogue's wording. The Sharpe ratio in our own short examples is the mean excess simple return divided by the sample standard deviation of excess simple return, with the risk-free rate stated, usually zero, and with no annualisation unless a factor is named. The library's reported Sharpe ratios, where a page reports one, need not use that convention. WF04's page, in the table this atlas quotes, does not report the nine numbers at all. Calling any cell "the" moving-average strategy confuses a menu with a dish. The moving-average chapter owns the cross as a rule. This chapter owns the fact that nine scored crosses are a search.

:::algorithm Enumerate a constrained grid {#alg-enum}
List the fast values and the slow values. For each pair, keep it if it satisfies the constraint, here fast $<$ slow, and discard it otherwise. Score each kept pair once, on the sample the specification names, by the statistic the specification names. Record $N$ as the number kept and scored. The selected value is the maximum of the $N$ scores, together with the identity of a maximising pair. Ties are part of the result: if two pairs share the maximum, the specification needs a tie-break before either pair can be called the winner.
:::

:::example A constraint that actually deletes cells {#ex-constraint}
Fast windows are $\{10, 20, 30\}$ and slow windows are $\{15, 25, 40\}$. Keep a pair only when the fast window is strictly shorter than the slow window. List the surviving pairs and the number scored.
:::solution
The rectangle has $3 \times 3 = 9$ pairs. The survivors are $(10,15)$, $(10,25)$, $(10,40)$, $(20,25)$, $(20,40)$ and $(30,40)$. The discarded pairs are $(20,15)$, $(30,15)$ and $(30,25)$, where the fast window is at least as long as the slow one. So $N = 6$, not $9$. WF04's own nine pairs all survive the same style of constraint, which is why that page's trial count is $9$ rather than something smaller. The count follows the list, not the shape of the rectangle you might have drawn first.
:::
:::

## The maximum is a different random variable

Let $X_1, \ldots, X_N$ be the scores of $N$ trials, and write $M = \max\{X_1, \ldots, X_N\}$. If a single pair $(j)$ was designated before any score was computed, the object of interest is $X_j$. After a search, the object that gets quoted is $M$. These are not the same function of the data. Selection is not a cosmetic description of an otherwise ordinary average. It changes the estimand.

:::definition Selected statistic {#def-selected}
A statistic is **selected** when the function of the data that is reported was itself chosen by looking at the data. The maximum of $N$ trial scores is selected. So is the score of whichever trial won. A score attached to a configuration that was fixed before the scores were seen is not selected by this search, though it may have been selected by an earlier, unreported one.
:::

:::proposition The maximum sits above a pre-specified trial {#prop-max}
Let $X_1, \ldots, X_N$ be integrable random variables and let $M_N = \max_{i \le N} X_i$. Then $\E[M_N] \ge \E[X_1]$. If $\Prob(M_N > X_1) > 0$, the inequality is strict. In particular, if $X_1, \ldots, X_N$ are independent and identically distributed continuous random variables, then $\E[M_N] > \E[X_1]$ whenever $N > 1$.
:::

:::proof
The maximum is at least as large as the first coordinate, so $M_N - X_1 \ge 0$. The expectation of a non-negative random variable is zero if and only if the variable is zero almost surely, and it is positive if the variable is positive with positive probability. Thus $\E[M_N] \ge \E[X_1]$, and the inequality is strict precisely when $\Prob(M_N > X_1) > 0$.

If the variables are independent and identically distributed and continuous, and $N > 1$, then $\Prob(X_2 > X_1) > 0$, hence $\Prob(M_N > X_1) > 0$. Integrability of the maximum follows from $|M_N| \le |X_1| + \cdots + |X_N|$.
:::

The proposition is deliberately modest. It does not give the size of the gap, and it does not assume a normal distribution. It says that under a true null in which every pre-specified trial has the same expected score, the expected value of the winner is larger, once $N > 1$ and the scores can differ. Quoting $M_N$ as if it had the expectation of $X_1$ is the selection bias. How large the bias is, in standardised units and under a normal approximation, is the work of [[validation/the-deflated-sharpe]]. That chapter also has to say where the normal approximation does not apply. Financial trials on one history are dependent, and a sequential sampler manufactures further dependence. [[#prop-max]] survives dependence in its weak form, $\E[M_N] \ge \E[X_1]$, because the proof never divided the joint distribution. The strict improvement uses a condition that perfect dependence can fail: if $X_2 = X_1$ always, the maximum does not rise.

:::example Nine invented in-sample scores {#ex-nine}
The following nine numbers are invented in-sample Sharpe ratios, risk-free rate $0$, not annualised, one per cell of a $3 \times 3$ grid. They are not the WF04 results, which the library table does not report. In the order $(20,100)$, $(20,150)$, $(20,200)$, $(50,100)$, $(50,150)$, $(50,200)$, $(80,100)$, $(80,150)$, $(80,200)$ the scores are

$$
0.21,\ 0.45,\ 0.33,\ 0.12,\ 0.58,\ 0.40,\ 0.27,\ 0.51,\ 0.36.
$$

Find the maximum, the mean, the gap between them, and the median.
:::solution
Adding in hundredths, $21+45+33+12+58+40+27+51+36 = 323$. The mean is $323/900 = 0.358\overline{8}$, which is $0.3589$ to four decimal places. The maximum is $0.58$, at the invented cell $(50,150)$. The gap between the maximum and the mean is $0.58 - 323/900 = 199/900 = 0.22\overline{1}$, or $0.2211$ to four decimal places.

Sorted, the nine scores are $0.12$, $0.21$, $0.27$, $0.33$, $0.36$, $0.40$, $0.45$, $0.51$, $0.58$. The median is the fifth, $0.36$. The maximum exceeds the median by $0.22$.

The cell $(50,150)$ is the maximiser of this invented list. It is not a window anyone has a reason to trade, and it is not a WF04 output. The arithmetic point is the gap: a report that quotes $0.58$ and stays silent about the other eight scores is quoting a selected statistic. A report that quotes the mean, $0.3589$, is describing the menu. Neither number is a forecast. [[#prop-max]] is why one should expect the quoted maximum to sit above the score of a cell that had been named in advance, when the scores can differ.
:::
:::

:::quiz
Nine configurations are scored and the largest Sharpe ratio is the one published. Which object was published?
- [ ] The Sharpe ratio of a configuration fixed before the scores were seen.
- [x] A selected statistic, the maximum of the nine scores.
- [ ] The mean of the nine scores.
- [ ] An out-of-sample confirmation, because a grid is a form of walk-forward.
:::solution
Publishing the largest of nine scores publishes the maximum. The mean is a different function. A grid search is not a walk-forward. Walk-forward scores a frozen choice on later dates. The grid chooses the choice.
:::
:::

## Thirty trials, then one frozen walk-forward

A sequential model-based search spends a budget of trials on the same history and lets later trials depend on earlier scores. The Tree-structured Parzen Estimator, the sampler named in the WF05 catalogue line, is of that kind. At the level this atlas needs, the sampler keeps the trials scored so far, forms a picture of the parameter region that has produced the better scores and a picture of the rest, and proposes the next trial where the better-scoring picture is more plausible. The proposal for trial $15$ is allowed to depend on the scores of trials $1$ through $14$. That is the point of a sequential sampler. It is also the reason the thirty scores are not thirty independent draws, and not thirty confirmations of a rule that was fixed before trial $1$.

Bergstra and Bengio, in the Journal of Machine Learning Research in 2012, showed that random search is a strong and simple baseline for hyperparameter optimisation. Random search draws candidates without looking at previous scores. A grid does look at a pre-specified list, but it still keeps the best cell. In one or two dimensions a small grid can cover the axes evenly; the selection problem remains, because the reported number is still a maximum. Random search is not a validation method, and it is not a trading result. It is a baseline for how a search explores a parameter space. The 2012 paper's warning, as it applies here, is that changing the searcher does not set $N$ back to $1$.

Akiba, Sano, Yanase, Ohta and Koyama released Optuna at KDD in 2019. The paper is about the optimiser. It is not evidence about any market, and the catalogue entry for WF05 does not become a market result by using that sampler. The sampler explains why the thirty trials are sequential. The trial budget explains why $N = 30$ for the search stage.

The walk-forward that WF05 runs afterwards is a different stage. Read fairly, the winner is frozen and then walked forward. The fold geometry of a rolling walk-forward is [[validation/walk-forward]]. The catalogue line for WF05 does not, in the table this atlas quotes, give a separate fold count for that second stage. Whatever the number of slices is, those slices are diagnostics on one path unless a genuinely new path has been produced, and the thirty trials remain the search that chose the frozen parameter. Multiplying $30$ by a fold count, or by $48$ because a different page used $48$ folds, does not count anything that the protocol delivered. The product is not a sample size.

:::example A budget, a freeze, and a false product {#ex-freeze}
A search scores $N = 30$ trials and freezes one winner. A later toy walk-forward, not the unpublished WF05 design, then cuts three test windows on one path, in the manner of the thirty-date example of [[validation/walk-forward]]. How many configurations did the walk-forward re-select among? If a reader multiplies $30$ by $3$ and reports $90$ confirmations, what has been counted?
:::solution
The walk-forward re-selects among one configuration, the frozen winner, provided the protocol forbids going back. The three windows are three slices of one path, with the dependence already discussed for folds. They are not three confirmations in the sense of three histories, and they are not thirty confirmations.

The product $30 \times 3 = 90$ counts a fiction. It treats every discarded trial as if it had been walked forward, and it treats every slice as if it were an independent trial of every discarded configuration. Neither of those things happened. The search scored thirty configurations. The later protocol scored one of them, on slices of one path. If the researcher looks at the three slices and then unfreezes the choice, even that one-configuration reading is gone: the walk-forward has become another search step, and the trial count has to include the configurations the step was allowed to choose among.
:::
:::

## A family-wise count is a different story

There is a second, older way to feel the effect of $N$. Suppose $N$ tests are run, each at level $\alpha$, the null is true for every test, and the tests are independent. The probability that a given test does not reject is $1-\alpha$. The probability that none of them rejects is $(1-\alpha)^N$. The probability that at least one rejects is

$$
1 - (1-\alpha)^N.
$$

The expected number of rejections is $N\alpha$, by linearity, and linearity does not need independence. The probability formula does. For $\alpha = 0.05$, the expected number of false rejections is $0.45$ when $N = 9$ and $1.5$ when $N = 30$. Under independence, the probability of at least one false rejection is $1 - 0.95^{9} = 0.3698$ to four decimal places when $N = 9$, and $1 - 0.95^{30} = 0.7854$ to four decimal places when $N = 30$. A search of thirty independent true-null tests at this level is more likely than not to produce something a threshold rule can crown.

:::example Two family-wise probabilities {#ex-fwe}
Assume independence, a true null for every trial, and a rejection level $\alpha = 0.05$. Compute $1 - 0.95^{N}$ for $N = 9$ and for $N = 30$, to four decimal places, and compute the expected number of rejections in each case.
:::solution
For $N = 9$, $0.95^{9} = 0.630249$ to six decimal places, so $1 - 0.95^{9} = 0.369751$, which is $0.3698$ to four decimal places. The expected number of rejections is $9 \times 0.05 = 0.45$.

For $N = 30$, $0.95^{30} = 0.214639$ to six decimal places, so $1 - 0.95^{30} = 0.785361$, which is $0.7854$ to four decimal places. The expected number of rejections is $30 \times 0.05 = 1.5$.

These calculations are not the Sharpe ratios of WF04 or WF05, and they are not the deflated Sharpe ratio. They describe a rejection count under assumptions the library searches do not satisfy. The nine grid cells share one history, so their scores are dependent. The thirty TPE trials are sequential, so each trial after the first is a function of earlier scores. Dependence means $1 - (1-\alpha)^N$ is not a calibrated probability for those pages. It remains a useful piece of arithmetic: even the independent case, which is the case most flattering to a claim of "many separate looks", already makes a false crown ordinary. The next chapter replaces the rejection story with a scale for the maximum of standardised statistics, and it repeats the independence warning in that setting.
:::
:::

:::widget hypothesis
test: z
tail: right
alpha: 0.05
effect: 0.3
n: 60
caption: One pre-specified test of a mean. A grid of nine Sharpe ratios is nine looks, and a TPE budget of thirty trials is thirty looks. Raising the sample size makes this single picture sharper. It does not spend the multiplicity, and it does not freeze a winner.
:::

:::warning Do not promote the winning cell
The maximum in an in-sample grid is the score of a cell that won a comparison. It is not the performance of "the" strategy, because the strategy was chosen for the size of the number. It is not a walk-forward result unless a later, frozen test was actually run and is the number being quoted. It is not a reason to trade the winning windows. WF04's nine cells and WF05's thirty trials are there to be counted. Counting them is the correction. Quoting only the winner throws the count away.
:::

:::intuition The menu and the dish
A restaurant that lets you taste nine dishes and then report your favourite dish's score has not told you what a randomly assigned dish would have scored. The favourite is real. The tasting is real. The selection is the whole story. Writing down the dish before the tasting, or taking the favourite and judging it on a later service that was not used to pick it, is a different protocol. WF04 is the tasting. The walk-forward on a frozen WF05 winner is an attempt at the later service. The later service still uses one kitchen's history.
:::

:::quiz
WF05 runs 30 TPE trials and then a rolling walk-forward on the winner. Which description matches that order?
- [ ] Thirty independent confirmations, because each trial has its own score.
- [ ] Thirty walk-forward replications of the eventual winner.
- [x] A search of thirty trials, then, if the winner is frozen, one later test of that single choice. The trials are not thirty confirmations.
- [ ] A single trial, because only the winner is reported.
:::solution
The thirty trials are the search budget. They choose the winner, and a sequential sampler lets later trials depend on earlier scores. The walk-forward tests the frozen winner once, in the sense of one configuration. Reporting only the winner does not reduce the search to a single trial. The configurations that were scored still count in $N$.
:::
:::

:::remark Ties and repeated trials
If two grid cells return the same score, [[#alg-enum]] does not know which window is the winner until a tie-break is stated. If a sampler scores the identical configuration twice, the second run is not a new look, and a trial count that treats it as new overstates $N$. The opposite error also exists: a grid of $125$ imaginable cells, of which only $30$ were scored, has $N = 30$ for the maximum that was actually computed. The unrun cells are not in the maximum. They also do not entitle anyone to pretend the maximum was taken over the full grid. $N$ is the number of configurations scored, neither the size of a fantasy grid nor $1$.
:::

:::history
Bergstra and Bengio (2012), in the Journal of Machine Learning Research, made random search the baseline a grid has to be compared with when the question is exploration of a parameter space. The comparison does not acquit either search of multiplicity. Akiba, Sano, Yanase, Ohta and Koyama (2019) described Optuna, whose Tree-structured Parzen Estimator is the sequential sampler named in the WF05 catalogue line. That paper is about the optimiser. The deflated Sharpe ratio of Bailey and López de Prado (2014), which is the next chapter, is about what happens to a performance number after a search has been allowed to pick a winner. The dates matter because the tools are often stacked in one paragraph as if they were one result. They are three different pieces of work.
:::

## Where this leads

The scale $\sqrt{2\ln N}$, under a normal approximation with assumptions that financial trials usually violate, is computed in [[validation/the-deflated-sharpe]], which also points to the 2014 paper for the full deflated Sharpe ratio rather than replacing it with that scale. Folds of the later walk-forward are still the objects in [[validation/walk-forward]], and they still fail to be independent replications for the reasons in [[validation/what-a-fold-does-not-prove]]. Multiple testing in the abstract, without a moving-average grid attached, is [[statistics/testing-and-snooping]].

:::summary
- WF04 is a grid of nine backtests, fast windows $\{20, 50, 80\}$ and slow windows $\{100, 150, 200\}$, scored by a Sharpe ratio. The maximum of the nine is a selected statistic.
- A constraint such as fast $<$ slow can delete cells. $N$ is the number actually scored.
- For integrable scores, the expected maximum is at least the expected score of any one pre-specified trial, and the inequality is strict when a better trial is possible.
- WF05's 30 Optuna TPE trials are a sequential search. They are not 30 confirmations. A later walk-forward on a frozen winner tests one choice.
- Under independence and a true null, $1-0.95^{9} = 0.3698$ and $1-0.95^{30} = 0.7854$ to four decimal places, at level $0.05$. Real grid cells and TPE trials are not independent, so these are illustrations, not p-values for the library pages.
- No cell of the grid is a recommendation to trade.
:::

## Exercises

:::exercise Count WF04 {level=1 check="9"}
How many combinations are in the grid $\{20, 50, 80\} \times \{100, 150, 200\}$? (Enter that count.)
:::solution
There are three fast values and three slow values, and $3 \times 3 = 9$. Every pair has fast $<$ slow, so a constraint of that form removes none of them. The trial count of WF04, as catalogued, is this $9$.
:::
:::

:::exercise A constraint with teeth {level=1 check="6"}
Fast values $\{10, 20, 30\}$ and slow values $\{15, 25, 40\}$ are combined, and a pair is kept only if the fast value is strictly smaller. How many pairs are kept? (Enter that count.)
:::solution
The six pairs are $(10,15)$, $(10,25)$, $(10,40)$, $(20,25)$, $(20,40)$ and $(30,40)$. Three pairs are discarded. $N = 6$, not $9$.
:::
:::

:::exercise Expected false rejections {level=1 check="0.45"}
Nine independent tests are each run at level $0.05$, and every null is true. What is the expected number of rejections? (Enter that expectation.)
:::solution
By linearity the expected number is $N\alpha = 9 \times 0.05 = 0.45$. Independence is not required for this expectation. It is required for the probability $1 - 0.95^{9}$ computed in [[#ex-fwe]]. Neither calculation is a Sharpe ratio, and neither is a licence to treat WF04's dependent cells as nine independent tests.
:::
:::

:::exercise A cleaner gap {level=2 check="9/50"}
Nine invented in-sample Sharpe ratios, risk-free rate $0$ and not annualised, are $0.10$, $0.20$, $0.15$, $0.40$, $0.25$, $0.05$, $0.30$, $0.35$ and $0.18$. They are not library figures. Compute the gap between the maximum and the mean. (Enter the exact gap.)
:::solution
The sum in hundredths is $10+20+15+40+25+5+30+35+18 = 198$. The mean is $198/900 = 11/50 = 0.22$. The maximum is $0.40 = 2/5 = 4/10$. The gap is $0.40 - 0.22 = 0.18 = 9/50$. Quoting $0.40$ without the mean quotes the selected end of the list. The list is still an invention for the arithmetic, not a backtest result and not advice.
:::
:::

:::exercise What the walk-forward is allowed to choose {level=2 check="1"}
Thirty trials have been scored and the winner has been frozen before a walk-forward begins. The walk-forward is not allowed to switch to another trial. How many configurations is the walk-forward selecting among? (Enter that number.)
:::solution
It is selecting among one configuration, the frozen winner. The thirty trials are the search that produced the freeze. They are not thirty confirmations hiding inside the walk-forward. If the protocol is later relaxed so that a disappointing walk-forward can reopen the menu, the answer stops being $1$.
:::
:::

:::exercise Cells that were never scored {level=2 check="95"}
A parameter space contains $125$ imaginable cells. A search scores $30$ distinct cells and leaves the rest unrun. How many cells were not scored? (Enter that count.)
:::solution
$125 - 30 = 95$ cells were not scored. The maximum among the thirty is not the maximum over all $125$, because the other cells have no scores. The unrun cells also do not reduce $N$ to $1$. For the maximum that was computed, $N = 30$.
:::
:::

:::exercise Count a constrained rectangle {level=3 check="270"}
Fast windows are the integers $5, 6, \ldots, 20$ and slow windows are the integers $10, 11, \ldots, 30$. A pair is scored only when the fast window is strictly shorter than the slow window. How many pairs are scored? (Enter that count.)
:::hint
Split the fast values into those strictly below $10$, where every slow window qualifies, and those from $10$ to $20$, where the slow window must run from the integer just above the fast window up to $30$.
:::
:::solution
There are $16$ fast values and $21$ slow values, so the rectangle has $16 \times 21 = 336$ pairs before the constraint.

Fast values $5$ through $9$ are five integers, each strictly below every slow value, which starts at $10$. They contribute $5 \times 21 = 105$ pairs.

For a fast value $f$ from $10$ to $20$, the legal slow values are $f+1, \ldots, 30$, and there are $30-f$ of them. The counts are $20, 19, \ldots, 10$. Their sum is $(1+\cdots+20) - (1+\cdots+9) = 20 \times 21/2 - 9 \times 10/2 = 210 - 45 = 165$.

The total is $105 + 165 = 270$. So $N = 270$ if every surviving pair is scored, not $336$. A budget that scores only $30$ of these $270$ has trial count $30$. The size of the legal set is not the size of the search that was actually run.
:::
:::

:::exercise A duplicated cell is not a new look {level=3 check="8"}
Nine recorded scores are attached to grid cells, but two of the nine records are the identical configuration run twice. The other records are unique. How many distinct configurations were scored? (Enter that count.)
:::hint
A second run of the same configuration, with the same data and the same specification, does not add a trial. Count the unique pairs, not the lines in the log, once you have been told the duplicate is exact.
:::
:::solution
Eight distinct configurations were scored. Using $N = 9$ in a later selection scale overstates the number of looks. Using $N = 1$ because a winner was declared understates it. The right count for an exact duplicate is the number of distinct configurations, here $8$.

If the two records had differed by a single window length, or by a cost, they would have been different trials. "Looks similar" is not "is the same configuration". The exercise states that the duplicate is exact. A sequential sampler can also revisit a point. The log, not the budget printed in a caption, decides whether $30$ trials were $30$ distinct configurations. The catalogue states a budget of $30$ trials for WF05. It does not hand us the log. We count $30$ trials as the stated budget, and we do not call them $30$ confirmations.
:::
:::
