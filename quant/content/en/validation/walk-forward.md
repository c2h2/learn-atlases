A rule that is chosen on the same dates it is then scored on has already seen the outcomes it claims to have met later. Splitting those dates is the least a research record can do. A **walk-forward** protocol cuts one recorded history into pairs of windows: an earlier window on which a choice is frozen, and a later window on which that frozen choice is scored. The cut is a statement about the clock. It is not, by itself, evidence that the choice will earn anything on a path that has not been recorded, and it is not an instruction to trade.

The open library's first two walk-forward pages each use 48 folds over a span of 26 years. As reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026, WF01 slides a fixed-length training window and a fixed-length test window forward, with a purge before the test slice, and WF02 lets the training window grow to include everything before the test, again against a sliding test window. This atlas has not re-run either backtest. The catalogue's own description, as recorded in this atlas's library notes, calls the output slice diagnostics rather than independent out-of-sample evidence. That sentence belongs in the definition of what those pages are. It is not a courtesy we add after admiring a number.

Throughout this chapter, dates are integer indices. A window written $[a,b]$ contains every integer $t$ with $a \le t \le b$. A feature dated $t$ may use prices up to the close at $t$, and it earns the simple return after $t$. Inside a fold, the parameter is a function of the training window only. During the test it stays frozen. A feature inside the test may still use prices up to its own decision time. It may not use a test label to retune the parameter the fold claims to have frozen. Purging labels that spill across the cut is the subject of [[validation/purging-and-embargo]]. Why a stack of folds can still move as one object is the subject of [[validation/what-a-fold-does-not-prove]].

## Rolling and expanding windows

Fix three positive integers: a training length $L$, a test length $H$, and a step $S$. The step is how far the pair of windows moves. Taking $S = H$ makes successive tests meet end to end. Taking $S$ smaller than $H$ makes the tests overlap. Both designs are walk-forward designs. They are not the same experiment, and neither design manufactures new histories.

:::definition Rolling walk-forward {#def-rolling}
On dates $0, 1, \ldots, T-1$, the rolling fold numbered $k = 0, 1, 2, \ldots$ has training window $[kS,\ kS+L-1]$ and test window $[kS+L,\ kS+L+H-1]$, provided the test window lies inside $0, \ldots, T-1$. The parameter scored on the test is a function of the training window of that same fold, and of the specification, and of nothing in the test labels.
:::

The training length stays equal to $L$ on every fold. As $k$ increases, old dates fall out of the left edge and new dates enter at the right edge. The dates that were the test of an earlier fold can sit inside the training window of a later fold. That is legal for the later fold, because those dates are earlier than the later test. It is fatal to any claim that the two test scores are replications on separate samples.

:::definition Expanding walk-forward {#def-expanding}
On the same dates, an expanding fold with anchor $a$ and the same test windows uses, for the test that starts at index $\tau$, the training window $[a,\ \tau-1]$, after any exclusion the specification places immediately before $\tau$. The anchor does not move. The training window grows as $\tau$ moves forward.
:::

WF02, as catalogued, is the expanding design: an ever-growing training window against a sliding test. WF01 is the rolling design, with a purge before each test. The purge changes which right-hand training indices are allowed to count; the geometry of "fixed length" versus "ever-growing" is the distinction between the two definitions. Two scores computed on the same test dates, one from a rolling fit and one from an expanding fit, are two experiments. Averaging them does not create a third, more precise, replication.

What is known when a test opens is easy to mark and easy to overstate. At the open of a rolling test, the fit may use the $L$ training indices of that fold and no later label. At the open of an expanding test, the fit may use every index from the anchor up to, but not including, the test, after the exclusion. In both cases the first return the fold is allowed to earn is the simple return from the last eligible training close to the next close. Scoring the return that ends on a training date is an in-sample score, even if a later paragraph of the write-up calls it out of sample.

:::algorithm Build the rolling list {#alg-folds}
Input positive integers $T$, $L$, $H$ and $S$ with $T \ge L+H$. For $k = 0, 1, 2, \ldots$, stop when $kS+L+H-1 > T-1$. Otherwise emit the training window $[kS,\ kS+L-1]$ and the test window $[kS+L,\ kS+L+H-1]$. The parameter for that pair is estimated on the training window only, then frozen, then scored on the test window only.
:::

:::proposition How many rolling folds fit {#prop-count}
Under [[#def-rolling]], if $T \ge L+H$ and $S \ge 1$, the number of folds is $\lfloor (T-L-H)/S \rfloor + 1$. If $S = H$, successive test windows are disjoint and contiguous: the first index of test $k+1$ is the integer immediately after the last index of test $k$. If $S < H$, successive test windows share exactly $H-S$ indices.
:::

:::proof
The test of fold $k$ ends at $kS+L+H-1$. That index is at most $T-1$ if and only if $kS \le T-L-H$. Since $S > 0$, this is $k \le (T-L-H)/S$. The admissible integers $k$ are $0, 1, \ldots, \lfloor (T-L-H)/S \rfloor$, and there are $\lfloor (T-L-H)/S \rfloor + 1$ of them.

Now set $S = H$. Test $k$ ends at $kH+L+H-1 = (k+1)H+L-1$. Test $k+1$ starts at $(k+1)H+L$. Those two indices differ by $1$, so the windows share nothing and leave no gap. If instead $S < H$, test $k+1$ starts at $kS+S+L$, while test $k$ still runs to $kS+L+H-1$. The shared indices run from $kS+S+L$ to $kS+L+H-1$, and the count of them is $H-S$.
:::

The same arithmetic gives the overlap of successive rolling training windows. Train $k$ is $[kS,\ kS+L-1]$ and train $k+1$ is $[(k+1)S,\ (k+1)S+L-1]$. When $L > S$ they share $L-S$ indices. A long training window and a short step produce folds whose fitted parameters are functions of almost the same dates. Disjoint tests do not undo that. The parameters can still be close, and the test scores can still move together, because the path that feeds the features is one path. [[#prop-count]] counts windows. It does not count independent experiments.

:::quiz
WF01 reports 48 folds over 26 years. Which reading agrees with the status the catalogue gives those folds?
- [ ] They are 48 independent out-of-sample replications.
- [x] They are slice diagnostics on one history, not independent out-of-sample evidence.
- [ ] They are 48 asset classes, so the result has been replicated across markets.
- [ ] The number 48 is a sample size one may drop into an ordinary standard error, with independence supplied by the word "fold".
:::solution
The library notes for WF01 call the page a slice diagnostic rather than independent out-of-sample evidence. Forty-eight is the number of windows in that protocol. The windows are cut from one span of 26 years. Nothing in the fold count supplies a new path, a new asset class, or an independent sample of size 48.
:::
:::

## What a fold is allowed to know

Consider thirty dates, indices $0$ to $29$, with $L = 12$, $H = 6$ and $S = 6$. [[#prop-count]] gives $\lfloor (30-12-6)/6 \rfloor + 1 = 3$ rolling folds.

- Fold $0$ trains on $[0,11]$ and tests on $[12,17]$. At the open of the test the fit may use prices on $0$ to $11$ only. The first return it may earn is the simple return from index $11$ to index $12$.
- Fold $1$ trains on $[6,17]$ and tests on $[18,23]$. The fit may use prices on $6$ to $17$. Six of those training indices were the entire test of fold $0$.
- Fold $2$ trains on $[12,23]$ and tests on $[24,29]$. Every test index of fold $0$ is now a training index. The fold is still a legal walk-forward relative to its own test. It is not a second look at a fresh history.

The expanding design with anchor $0$ and the same three tests, and with no exclusion yet, trains fold $0$ on $[0,11]$, fold $1$ on $[0,17]$ and fold $2$ on $[0,23]$. The second expanding train has $18$ indices. The second rolling train has $12$. The six indices $0$ to $5$ are in one fit and not in the other. A researcher who reports "the" walk-forward result without saying which of these information sets was used has not named the experiment. The comparison is the same comparison the catalogue forces by publishing WF01 and WF02 as separate pages: fixed length and ever-growing length are different protocols, even when both pages honestly refuse to call their folds independent evidence.

:::intuition Slicing a loaf
Cutting one loaf into forty-eight slices does not bake forty-eight loaves. A slice can still be informative. The crumb of slice $12$ tells you something about the loaf. It does not tell you what a second loaf, baked on another day from other flour, would have done. Walk-forward is a careful way to cut. The care is about the order of the dates. The number of slices is not a number of loaves.
:::

Overlapping tests add a further, purely arithmetic, dependence. If $S < H$, then by [[#prop-count]] the same simple return is an entry in two test windows. An average of the two window means counts that return twice. The mean of the distinct test dates is a different number, and it can even have the other sign when one shared return is large. The exercise at the end of the chapter makes that arithmetic unavoidable. Until it is done, there is no excuse for treating the average of overlapping fold scores as if the folds had been concatenated into a sample of size $2H$.

:::widget plot
f: 100+0.35*x+5*sin(x/3)
x: 0, 30
vlines: 12; 18; 24; 30
caption: A toy path, not a market and not a library backtest. The vertical lines at 12, 18, 24 and 30 mark the edges used in the thirty-date example. Rolling tests occupy indices 12 to 17, 18 to 23 and 24 to 29. The curve is only there so the cuts are visible.
:::

The cuts above are three edges on a curve. The next figure is the same arithmetic as windows. It starts at the thirty-date example: T = 30, L = 12, H = 6, S = 6, which is 3 folds. Lower the step below the test length and successive tests share dates. The fold count updates. It remains a count of windows on one history.

:::widget folds
T: 30
L: 12
H: 6
S: 6
h: 0
m: 0
mode: rolling
caption: Rolling trains and tests on 30 dates, with L = 12, H = 6 and S = 6. That is 3 folds, and the tests do not overlap. Shrink the step and the tests share indices. Switch to expanding and every train starts at the left edge. The count is not a number of independent samples.
:::

## Forty-eight is a geometry, not a replication count

WF01 and WF02 each report 48 folds and a span of 26 years, and each page carries the diagnostic caveat. The library table quoted in this atlas does not state the training length, the test length or the step. Many triples $(L, H, S)$ produce a fold count of 48. One illustration, built with our own counting convention of 252 trading days a year, is $T = 26 \times 252 = 6552$, $L = 504$, $H = 126$ and $S = 126$. Then

$$
\lfloor (6552 - 504 - 126)/126 \rfloor + 1 = \lfloor 5922/126 \rfloor + 1 = 47 + 1 = 48,
$$

because $126 \times 47 = 5922$. That identity shows how a fold count comes out of [[#prop-count]]. It does not identify the windows on the WF01 page. Using it as if it were a recovered specification would invent a design the catalogue has not given us. What the identity does show is that 48 windows can be laid along one span of a few thousand dates. They are then 48 functions of that span.

Nor is 48 a sample size for the standard error in [[performance/uncertainty-of-performance]]. That standard error divides by a count of returns only under a stated dependence assumption. Fold scores on one history violate the independent case by construction: neighbouring rolling trains share $L-S$ dates, later trains swallow earlier tests, and a regime longer than $H$ sits inside many tests at once. The honest sample-size conversation starts from the specification and the dependence, not from the fold counter.

:::warning Disjoint is not independent
When $S = H$, successive tests share no index. It is tempting to stop there and call the fold scores independent. They are functions of successive pieces of one path. A drift, a volatility level or a single policy regime that lasts longer than a test window is then present in more than one score. Sharing no calendar index removes double-counted returns. It does not remove the path.
:::

:::example Two rolling folds on twenty dates {#ex-twenty}
Dates are indexed $0$ to $19$, so $T = 20$. Take $L = 10$, $H = 5$ and $S = 5$. List the training and test indices of every rolling fold that fits, and say what the second training window has in common with the first test.
:::solution
[[#prop-count]] gives $\lfloor (20-10-5)/5 \rfloor + 1 = 2$ folds. Fold $0$ trains on $[0,9]$ and tests on $[10,14]$. Fold $1$ trains on $[5,14]$ and tests on $[15,19]$. A third fold would test on $[20,24]$, which does not fit.

The second training window is $[5,14]$. The first test is $[10,14]$. Those five indices lie in both. Fold $1$ is allowed to train on them, because its own test starts at $15$. The five test returns of fold $0$ are therefore inputs to the parameter that fold $1$ freezes. The two test scores are not two experiments on separate samples.
:::
:::

:::example Three folds, and the expanding alternative {#ex-thirty}
Using indices $0$ to $29$, $L = 12$, $H = 6$ and $S = 6$, list the three rolling folds. Then list the expanding training window for the test $[18,23]$, with anchor $0$ and no exclusion. How many indices are in that expanding window but not in the rolling window for the same test?
:::solution
The rolling folds are $[0,11]$ against $[12,17]$, $[6,17]$ against $[18,23]$, and $[12,23]$ against $[24,29]$. This is the list drawn in the figure above.

The expanding train for the test that starts at $18$ is $[0,17]$, which has $18$ indices. The rolling train for that same test is $[6,17]$, which has $12$ indices. The indices in the expanding fit only are $0, 1, 2, 3, 4, 5$: six dates. The two fits do not know the same information. Reporting one test score without saying which fit produced the frozen parameter reports an unfinished experiment.
:::
:::

:::example A one-fold clock on Path A {#ex-path-a}
Path A has prices $100, 102, 101, 104, 103, 107, 106, 110$. The three simple returns up to the close at $104$ are $0.020000$, $-0.009804$ and $0.029703$, as elsewhere in the atlas. The rule freezes a single binary choice: if the mean of those three returns is positive, hold the asset over the four later simple returns; if the mean is negative, hold cash at return $0$. The risk-free rate in the cash case is $0$ by this specification, not by a market quote. Compute the test compound return. Compare it with always holding the asset over the same four returns, and with the compound return from $100$ to $104$.
:::solution
The sum of the three rounded training returns is $0.020000 - 0.009804 + 0.029703 = 0.039899$, so the mean is positive. The rounded figures are far enough from zero that the published six-decimal rounding cannot flip the sign. The rule therefore holds the asset.

The four later prices run from $104$ to $110$. Telescoping, the gross compound growth is $110/104 = 55/52$, and the compound simple return is $55/52 - 1 = 3/52$, which is $0.057692$ to six decimal places. An always-long position on the same test window earns the same $3/52$, because the frozen choice was long. The fold has checked the clock. It has not separated this rule from buying and holding over those four dates.

The compound return from $100$ to $104$ is $0.04$. That number uses training dates only. It is an in-sample growth, and it is not the walk-forward result. Four test returns are also too short a path for an annualised Sharpe. We do not annualise them. A different sign on the training mean would have put the test in cash and earned $0$, against the same buy-and-hold compound of $3/52$. Either way, one binary choice on one short path is a worked clock, not a confirmation. Nothing here is a suggestion to hold the asset, or cash, or any traded instrument.
:::
:::

:::example A fold count of forty-eight, built in the open {#ex-forty-eight}
Count $252$ trading days in a year, and set $T = 26 \times 252$. With $L = 504$, $H = 126$ and $S = 126$, how many rolling folds fit? Does the result tell you the window lengths used on the WF01 page?
:::solution
$T = 6552$. The formula in [[#prop-count]] is $\lfloor (6552-504-126)/126 \rfloor + 1$. The numerator inside the floor is $5922$, and $5922/126 = 47$ exactly, so the number of folds is $48$.

It does not tell you the WF01 window lengths. The library table states the fold count, the span, the rolling design, the presence of a pre-test purge, and the diagnostic caveat. It does not state $L$, $H$ or $S$. The triple used here was chosen so that the formula would return $48$, as a demonstration of the formula. Treating $504$ and $126$ as the library's unpublished parameters would invent a specification. The demonstration still stands as a warning in the other direction: a count of $48$ is what you get from one long span once the lengths are fixed. It is not $48$ histories.
:::
:::

:::quiz
Successive rolling tests are built with $S = H$. Which statement is right?
- [ ] The tests overlap in $H/2$ indices, so each return is counted twice.
- [x] The tests share no index: the next test starts at the integer just after the previous test ends.
- [ ] Sharing no index makes the fold scores independent random variables.
- [ ] The test windows cannot be listed until the test returns have been seen.
:::solution
[[#prop-count]] puts the start of test $k+1$ exactly one index after the end of test $k$ when $S = H$. The windows are disjoint. Disjoint subsets of one path are not independent samples. The index arithmetic uses only $L$, $H$, $S$ and $T$, so it does not wait for the returns.
:::
:::

:::application What WF01 and WF02 contribute
The two pages are useful because they are specific and because they are modest. WF01 is rolling, WF02 is expanding, both have 48 folds, both span 26 years, and both are described by their own catalogue as slice diagnostics. As reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026, that is the whole of the numerical claim this atlas will repeat: the fold count and the span. This atlas has not re-run the backtests, and the library table does not give a Sharpe ratio, a CAGR or a drawdown for these two pages. Inventing one would turn a careful catalogue into fan fiction. The research use of the pages is the contrast: same span, different training geometry, same refusal to treat folds as independent out-of-sample evidence.
:::

:::remark Where the moving-average rule goes
The rules inside these library pages are moving-average crosses of the sort studied in [[trend/moving-averages]]. This chapter does not re-try those crosses and does not rank them. A cross is a parameterised rule. Walk-forward is a way to score a frozen parameter on later dates. The quality of the score is the quality of the clock and of the dependence you are willing to assume. It is not a property of the words "moving average".
:::

:::history
López de Prado's *Advances in Financial Machine Learning* (2018) set out purged and embargoed cross-validation for labels that overlap in time. The walk-forward pages in the open library are a practical cousin of that discipline: a training block, a later test block, and an exclusion before the test. The 2018 book does not turn a stack of blocks on one history into a stack of independent histories, and the catalogue text recorded for WF01 and WF02 says the same thing in the language of slice diagnostics. White's reality check of 2000, which belongs with the multiple-testing chapters of this atlas, is a different instrument: it tests a searched winner. This chapter is about the cut itself.
:::

## Where this leads

The next cut is not geometric. A label that uses the next several returns can reach from a training decision into the test even when the decision index itself is earlier than the test, which is why [[validation/purging-and-embargo]] removes those decisions and then leaves a further gap. Counting trials, as opposed to counting folds, is [[validation/parameter-search]]. The reason disjoint folds still fail to be replications is [[validation/what-a-fold-does-not-prove]]. The backtest that hosts the fold is still the experiment described in [[backtesting/the-backtest-as-an-experiment]]: a specification, a clock and a loss function, not a broker.

:::summary
- A walk-forward fold freezes a parameter on a training window and scores it on a later test window.
- Rolling folds keep training length $L$. Expanding folds keep a fixed anchor and let the train grow. They are different information sets.
- The number of rolling folds is $\lfloor (T-L-H)/S \rfloor + 1$. When $S = H$ the tests are disjoint; when $S < H$ they share $H-S$ indices.
- A later rolling train may legally contain an earlier test. That legality is exactly why the folds are not separate samples.
- WF01 and WF02 each report 48 folds over 26 years and are catalogue-labelled slice diagnostics, not independent out-of-sample evidence. This atlas has not re-run them.
- A fold count is not a sample size, not a number of asset classes, and not a decision to trade.
:::

## Exercises

:::exercise How many folds {level=1 check="4"}
Dates $0$ to $39$ are available, so $T = 40$. Rolling windows use $L = 20$, $H = 5$ and $S = 5$. How many folds fit? (Enter the number of folds.)
:::solution
[[#prop-count]] gives $\lfloor (40-20-5)/5 \rfloor + 1 = \lfloor 15/5 \rfloor + 1 = 4$.
:::
:::

:::exercise Where the test starts {level=1 check="20"}
Rolling folds are numbered $k = 0, 1, 2, \ldots$, with $L = 10$, $H = 5$ and $S = 5$. What is the first index of the test window of fold $k = 2$? (Enter that index.)
:::solution
The test of fold $k$ starts at $kS+L$. For $k = 2$ that is $2 \times 5 + 10 = 20$. The test is the five indices $20$ to $24$, provided the sample reaches them.
:::
:::

:::exercise Shared training dates {level=1 check="6"}
Two successive rolling training windows use $L = 12$ and $S = 6$. How many indices lie in both windows? (Enter that count.)
:::solution
The overlap of successive rolling trains is $L-S = 6$ when $L > S$. If train $k$ starts at $kS$, train $k+1$ starts six indices later and the first window still has six indices left.
:::
:::

:::exercise Expanding length {level=2 check="18"}
In the thirty-date example, the second test is $[18,23]$. The expanding protocol uses anchor $0$ and no exclusion. How many indices are in that training window? (Enter the length.)
:::solution
The train is $[0,17]$, which contains $18$ indices. The rolling train for the same test is only $[6,17]$. The length $18$ is the expanding experiment, not the rolling one.
:::
:::

:::exercise Path A, scored after the freeze {level=2 check="3/52"}
Using the rule and the prices in [[#ex-path-a]], the training mean is positive and the test runs from the price $104$ to the price $110$. What is the compound simple return on the test? (Enter the exact value; a fraction is accepted.)
:::solution
The prices cancel along the path: $103/104 \times 107/103 \times 106/107 \times 110/106 = 110/104 = 55/52$. The compound simple return is $55/52 - 1 = 3/52$. Always-long on the same dates earns the same value, because the frozen choice was long. The in-sample rise from $100$ to $104$ is a different number, $0.04$, and is not this answer.
:::
:::

:::exercise Overlapping tests {level=2 check="5"}
Successive rolling tests have length $H = 8$ and the step is $S = 3$. How many indices lie in both test windows? (Enter that count.)
:::solution
[[#prop-count]] gives the overlap $H-S = 5$. An average of the two test-window means counts each of those five returns twice. It is not the mean of the union of the two windows, whose length is $8+8-5 = 11$, not $16$.
:::
:::

:::exercise Reverse the fold count, and do not invent a specification {level=3 check="504"}
Count $252$ trading days a year and set $T = 26 \times 252 = 6552$. You want exactly $48$ rolling folds with $S = H = 126$. Which training length $L$ does that require? (Enter $L$.)
:::hint
Set $\lfloor (T-L-H)/S \rfloor + 1 = 48$. With $S = H = 126$ the ratio inside the floor comes out as an integer, so you can drop the floor and solve for $L$. Then read the sentence in the solution about what this $L$ is not.
:::
:::solution
The equation $(6552 - L - 126)/126 + 1 = 48$ becomes $(6426 - L)/126 = 47$, so $6426 - L = 47 \times 126$. Since $47 \times 126 = 5922$, one gets $L = 6426 - 5922 = 504$.

This $L$ is the training length that makes our illustration return $48$. It is not a measurement of the WF01 page. The catalogue does not publish $L$, and matching a fold count is not recovering a specification. Forty-eight folds of whatever length remain forty-eight slices of one span of $6552$ dates under this counting convention.
:::
:::

:::exercise An average that double-counts {level=3 check="-1/800"}
Six simple returns, on indices $0$ to $5$, are $1/100$, $1/100$, $-1/25$, $1/100$, $1/100$ and $1/50$. Fold A tests on indices $0$ to $3$. Fold B tests on indices $2$ to $5$. Compute the average of the two fold-mean returns. (Enter that average as an exact fraction or decimal.)
:::hint
Average the two window means. Do not divide the sum of the six returns by $8$, and do not drop the shared indices before averaging the means. The point of the exercise is the gap between those procedures.
:::
:::solution
Fold A sums to $1/100 + 1/100 - 4/100 + 1/100 = -1/100$, so its mean is $-1/400$. Fold B sums to $-4/100 + 1/100 + 1/100 + 2/100 = 0$, so its mean is $0$. The average of the two means is $-1/800$.

The union of the indices is $0$ to $5$, six returns, summing to $1/50$. Their mean is $1/300$, which is positive. The average of the fold means is negative because the shared return $-1/25$ is inside both windows and is counted twice. Overlapping folds do not give a sample of size $4+4$. Here the number of distinct test indices is $6$. Even that count of $6$ would not be an independent sample size: the returns were laid out as one short path for the arithmetic, not drawn as six independent experiments.
:::
:::
