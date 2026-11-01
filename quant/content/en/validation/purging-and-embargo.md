A calendar cut can look clean and still leak. Suppose the test window starts at index $100$, and a training decision at index $99$ is allowed to use the return that ends at $100$. The decision index is earlier than the test. The label is not. It has reached into the dates the fold claims to have kept unseen. **Purging** drops every training decision whose label intersects the test window. An **embargo** then drops a further block of training decisions, not because their labels intersect the test, but because serial dependence can correlate a legal label with the returns just after it.

The open library's third walk-forward page, WF03, is the anchored design with exclusions of both kinds. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the page uses fixed and percentage-based exclusions before each test window, over 48 folds and a span of 26 years. This atlas has not re-run the backtest. The catalogue description recorded in the library notes gives WF03 the same status as WF01 and WF02: slice diagnostics, not independent out-of-sample evidence. Purging a boundary does not promote a fold to an independent replication. Forty-eight purged folds are still forty-eight functions of one span.

The index convention is the one in [[validation/walk-forward]]. Windows are inclusive integer intervals. A feature dated $t$ may use information available at $t$ and earns returns after $t$. The new object is the label, which is allowed to look a stated number of steps past $t$, and which therefore has a width.

## Labels are intervals, not instants

:::definition Label span {#def-label}
Fix a label horizon $h$, a positive integer. The label of a decision at index $t$ is the set of indices $\{t+1, t+2, \ldots, t+h\}$. Equivalently, the label uses the simple returns that end at those indices. The label **intersects** a test window if the two sets of indices have an element in common.
:::

A horizon of $h = 1$ is the ordinary next return. The label of $t$ is the singleton $\{t+1\}$, and it intersects a test that starts at $\tau$ only when $t+1$ is inside the test, so the only training decision that touches a test starting at $\tau$ is $t = \tau-1$, if that index was in the train. A horizon of $h = 5$ smears the label five steps to the right. Decisions that sit several places before the cut still touch the test. The smear is the whole reason a "decision before $\tau$" rule is not a "label before $\tau$" rule.

Nothing in the definition says the label is a good forecast, a utility, or a trading target. It says which dates the scoring function reads. If the specification uses a different horizon, the purged set changes. Two researchers who cut the calendar in the same place and label with different horizons have run different experiments.

:::proposition Which training decisions the purge removes {#prop-which}
Let the test window be $[\tau,\ \tau+H-1]$ with $H \ge 1$, and let the label horizon be $h \ge 1$. A decision $t \le \tau-1$ has a label that intersects the test if and only if $t \ge \tau-h$. In particular, if the candidate train contains every index from $\tau-h$ to $\tau-1$, the purge removes exactly the $h$ decisions $\tau-h, \tau-h+1, \ldots, \tau-1$.
:::

:::proof
The label is $\{t+1, \ldots, t+h\}$. Because $t \le \tau-1$, the left end satisfies $t+1 \le \tau$, so the label starts at or before the first test index. It therefore meets $[\tau,\ \tau+H-1]$ if and only if its right end is at least $\tau$, that is $t+h \ge \tau$, or $t \ge \tau-h$. Both bounds together are $\tau-h \le t \le \tau-1$. If each of those integers is in the candidate train, there are $h$ of them.
:::

The proof uses the inclusive span and the assumption that the decision sits before the test. It does not assume independence of returns, and it does not say the remaining training rows are independent of each other. Overlapping labels inside the train still share dates. The purge stops a train-test leak. It is not a transformation to an independent sample. Dependence of that second kind is discussed in [[statistics/moments-and-dependence]].

:::example A five-day label against a test at 100 {#ex-touch}
The candidate train is $[0,99]$, the test is $[100,119]$, and $h = 5$. List every training decision whose label intersects the test, and write the label set for the earliest of them and for the decision just before that.
:::solution
[[#prop-which]] with $\tau = 100$ removes $t = 95, 96, 97, 98, 99$.

The earliest of these is $t = 95$. Its label is $\{96, 97, 98, 99, 100\}$, which meets the test at $100$. The next decision down is $t = 94$. Its label is $\{95, 96, 97, 98, 99\}$, which lies entirely inside the train and does not meet the test. So $94$ is not purged by the intersection rule. Whether it should still be dropped is the embargo question, not the purge question.

For the record, the other labels are $\{97, \ldots, 101\}$, $\{98, \ldots, 102\}$, $\{99, \ldots, 103\}$ and $\{100, \ldots, 104\}$. Each of them meets $[100,119]$. A horizon of $1$ would have purged only $t = 99$. The extra four decisions are the price of looking five days ahead.
:::
:::

## The purge, and the gap that is not a purge

:::definition Purge {#def-purge}
Given a candidate training set and a test window, the purge is the removal of every training decision whose label, in the sense of [[#def-label]], intersects the test. The surviving training decisions are the only ones a purged fold may use to choose the parameter. The parameter is then frozen. The test labels are used to score it and not to choose it.
:::

:::definition Embargo {#def-embargo}
An embargo of $m$ further decisions, $m \ge 0$, removes $m$ additional training indices immediately to the left of the purged block, or immediately to the left of the test if the purge removed nothing. Those $m$ indices are excluded because of serial dependence, not because their labels intersect the test. In the worked protocol of this chapter, a percentage embargo of fraction $\rho$ on a candidate train of $n$ decisions uses $m = \rho n$ when $\rho n$ is an integer, and $m = \lfloor \rho n \rfloor$ otherwise.
:::

The two removals answer two different failures. The purge answers a logical overlap: the label set and the test set share an index, so the training row has been shown part of the answer. The embargo answers a statistical overlap: even a label that stops at $\tau-1$ can be correlated with the return that ends at $\tau$. Dropping two extra days does not prove the correlation is gone. It is a stated gap. Its width belongs in the specification, in the same way the horizon belongs in the specification. A reader who cannot find $h$, $m$ and $\rho$ does not yet know which experiment was run.

WF03, as catalogued, uses fixed exclusions and percentage-based exclusions before each test. The library table does not say whether the implementation takes the sum of a fixed count and a percentage count, the maximum, or some other combination, and it does not publish the counts. This chapter therefore teaches the two controls separately and, in the worked numbers, applies a label purge and then a percentage embargo as two successive steps. That succession is our teaching protocol. It is not a reconstructed line of the library's code. Attributing a particular combination rule to WF03 would invent one.

:::algorithm Purge, then embargo {#alg-exclude}
Start from the candidate training indices and the test window. Remove every training index whose label intersects the test. Then, with $m$ given either as a fixed count or as the percentage rule in [[#def-embargo]] applied to the original candidate length $n$, remove the $m$ surviving indices closest to the test. Fit only on what remains. Score only on the test. Do not move a purged or embargoed index back into the fit after seeing the test score.
:::

On the example with $n = 100$ candidate training decisions, indices $0$ to $99$, a two per cent embargo has $m = 0.02 \times 100 = 2$. The horizon-$5$ purge has already removed $95$ to $99$. The embargo removes the next two to the left, $93$ and $94$. The last index that survives is $92$. The number of surviving training decisions is $100 - 5 - 2 = 93$. The test $[100,119]$ is untouched. Seven training decisions were dropped so that five of them would not see a test date and two more would stand away from the boundary.

:::example Two per cent, then two days {#ex-two-percent}
Use the train $[0,99]$, the test $[100,119]$ and $h = 5$, then an embargo of two per cent of the $100$ candidate training decisions. Which indices does the embargo remove, which index is the last survivor, and how many training decisions remain?
:::solution
The purge removes $95, 96, 97, 98, 99$, by [[#ex-touch]]. Two per cent of $100$ is $2$, so the embargo removes $93$ and $94$. The last survivor is $92$. The remaining train is $[0,92]$, which has $93$ indices. The seven removed indices are a property of this protocol. They are not a claim about the unpublished day counts on the WF03 page.

The label at $94$ is $\{95, 96, 97, 98, 99\}$. It does not intersect the test. The embargo drops $94$ anyway. That is the content of the distinction: intersection is sufficient for the purge, and it is not necessary for the embargo.
:::
:::

:::example A fixed gap that is too thin {#ex-short-fixed}
Someone keeps the same train and the same test, ignores the horizon, and drops only a fixed two decisions, $98$ and $99$. For $h = 5$, which training decisions still have a label that meets the test? What is the smallest such decision index?
:::solution
[[#prop-which]] still marks $95, 96, 97, 98, 99$. Removing $98$ and $99$ leaves $95, 96$ and $97$ inside the fit. The smallest of those is $95$. Its label contains $100$, the first test index, so the fit is being shown a test date. A fixed exclusion of two days and a label horizon of five days are not substitutes. WF03's catalogue line is careful enough to name both fixed and percentage-based exclusions. A write-up that names only a small fixed gap, and also uses a long label, has not closed the leak [[#prop-which]] describes.
:::
:::

:::warning The purge does not police the feature
Suppose $h = 5$ and the purge correctly drops $95$ to $99$ before a test at $100$. A decision at $t = 90$ remains, because its label $\{91, \ldots, 95\}$ stops before the test. If the feature at $t = 90$ is built from the price at $93$, the feature is using a price that a decision at $90$ did not yet have. The label-intersection test does not catch that. Look-ahead inside a feature is a clock error of the kind in [[backtesting/timing-costs-and-biases]]. Purge and embargo are not a general disinfectant. They close one door: labels, and a stated dependence gap, across one cut.
:::

:::example A short train with horizon three {#ex-small}
Candidate train $[0,11]$, test $[12,15]$, horizon $h = 3$. Which training decisions are purged? Which single decision would be purged if the horizon were $1$ instead?
:::solution
Here $\tau = 12$, so [[#prop-which]] removes $t = 9, 10, 11$. Their labels are $\{10, 11, 12\}$, $\{11, 12, 13\}$ and $\{12, 13, 14\}$. Each meets the test. The decision $t = 8$ has label $\{9, 10, 11\}$ and stays, as far as the purge is concerned.

With $h = 1$ the same proposition removes only $t = 11$, whose label is the singleton $\{12\}$. Horizon is not a cosmetic parameter. Changing it from $3$ to $1$ changes the training set.
:::
:::

## Anchored folds, with the exclusion written down

:::definition Anchored walk-forward {#def-anchored}
An anchored walk-forward fixes the left edge of training at an anchor $a$. For a test that starts at $\tau > a$, the candidate train is $[a,\ \tau-1]$. The fold then applies the purge and the embargo of [[#alg-exclude]], and scores the frozen parameter on the test only. The anchor does not jump forward when the test does.
:::

If the anchor is $0$ and the only exclusion is the purge, the design is the expanding walk-forward of [[validation/walk-forward]] with that purge written in. A percentage embargo, or a fixed gap wider than the label horizon, makes the right edge stricter than the expanding definition without exclusions. An anchor $a > 0$ throws away the dates before $a$ on every fold. That is a different information set from an anchor at the start of the sample. "Anchored" is not a synonym one may scatter over a figure. It is a left edge, plus a right-hand exclusion, plus a test.

WF03 is the library's anchored page: 48 folds, 26 years, fixed and percentage-based exclusions before each test, and the diagnostic caveat. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, those are the facts this atlas repeats. We do not invent the page's anchor, its horizon, or the way its two exclusion rules are combined. We also do not read "48" as 48 independent tests that have survived a purge. The purge changes which rows are eligible. It does not change the fact that the rows come from one recorded span. The same warning is the point of [[validation/what-a-fold-does-not-prove]].

There is a second boundary, at the right edge of the sample rather than between train and test. If decisions $100$ to $119$ are the test and $h = 5$, the label of $t = 115$ is $\{116, \ldots, 120\}$. If the sample ends at $119$, that label asks for an index the sample does not have. Decisions $115$ to $119$ all do. A specification has to say whether those decisions are dropped, shortened, or scored on a truncated label. Leaving the choice implicit lets the same calendar produce two different test statistics. The exercise below counts the incomplete labels. The count is part of writing the protocol, not a reason to stretch the sample with a price that had not arrived.

:::widget plot
f: 0.15*sin(x/5)
x: 85, 125
vlines: 93; 95; 100; 120
caption: Toy curve, not a price. In the worked example the vertical lines are the start of the embargo (93), the start of the purge (95), the first test index (100) and the first index after the test (120). Training survivors are to the left of 93.
:::

The lines on the curve mark one fold. The next figure draws that fold as intervals. Take 120 dates, a train of length 100 and a test of length 20, so the test is the index interval from 100 to 119 and the candidate train is 0 to 99. A label horizon of 5 purges decisions 95 through 99. An embargo of 2 then drops 93 and 94. The purge is the intersection of the label with the test. The embargo is the further gap. Neither one manufactures a new history.

:::widget folds
T: 120
L: 100
H: 20
S: 100
h: 5
m: 2
mode: rolling
caption: One rolling fold. The test is the right-hand block. Inside the train, the purge for a label horizon of 5 sits against the test, and the embargo of 2 dates sits to its left. Lengthen the horizon and more of the train is excluded. The remaining dates are still one path.
:::

:::intuition A smear to the right of the decision
Draw the decision as a point and the label as a smear of width $h$ to its right. The test is a shaded block. Any smear that enters the block has to be discarded, even if the point that casts the smear sits in the white area to the left. The embargo is a second, unshaded gap, painted in because the smear is not the only way information moves. Returns can be correlated across a boundary the smear does not cross.
:::

:::quiz
Train $[0,99]$, test starting at $100$, horizon $5$. Which decision indices does the purge remove?
- [ ] Only $99$, because it is the last training index.
- [ ] $90$ to $99$, because a five-day label should be matched by a ten-day gap.
- [x] $95, 96, 97, 98$ and $99$.
- [ ] $100$ to $104$, because those are the dates the labels use inside the test.
:::solution
[[#prop-which]] removes the $h = 5$ decisions immediately before the test, namely $95$ through $99$. The test indices themselves are not training decisions, so they are not what the purge lists. A one-day label would have removed only $99$. The horizon is doing the work.
:::
:::

:::quiz
An embargo of two days drops indices $98$ and $99$ before a test at $100$. The label horizon is $5$. Has the train-test label leak been closed?
- [x] No. The decisions $95$, $96$ and $97$ still have labels that contain test indices.
- [ ] Yes. Any positive embargo closes every label overlap.
- [ ] Yes, because $98$ is earlier than $100$.
- [ ] The question is meaningless, because an embargo replaces the horizon.
:::solution
A two-day embargo is not a five-day purge. The label at $95$ contains the test index $100$. Intersection is settled by [[#prop-which]], not by the presence of some other, thinner gap. The embargo is for serial dependence beyond the intersection. It does not do the purge's job unless its width happens to be at least the horizon.
:::
:::

:::application The status of WF03
WF03 is easy to over-read because the exclusions sound like rigour, and rigour is easy to confuse with replication. The page adds an anchored geometry and two kinds of exclusion to the walk-forward idea. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, it still has 48 folds on a 26-year span, and the catalogue still calls the result a slice diagnostic rather than independent out-of-sample evidence. This atlas has not re-run it. The lesson to take is the machinery: fixed gaps and percentage gaps are controls you can write down, and writing them down does not multiply the number of histories. Search over the width of the gap would be a further trial, in the sense of [[validation/parameter-search]], not a stricter version of the same single test.
:::

:::remark Percentage of which length
The worked embargo uses a fraction of the original candidate training length, before the purge. Two per cent of $100$ is $2$, whether or not five further indices are purged by the label rule. A specification that instead takes two per cent of the post-purge length, or two per cent of the full sample, is a different rule. On these particular numbers, two per cent of the $95$ post-purge decisions is $1.9$, and $\lfloor 1.9 \rfloor = 1$, so the embargo would drop one index rather than two. The fraction is not interpretable until the base it multiplies is stated. The library table does not state WF03's base. We do not guess it.
:::

:::history
The account followed here is López de Prado's, from *Advances in Financial Machine Learning* (2018): labels in finance often overlap in time, so a split that only checks the decision index leaks, and a purge with an embargo is the proposed repair. The book also treats cross-validation designs in which training rows can sit after the test, where an embargo on the far side of the test matters as well. A causal walk-forward already forbids training on the future. Its leak, the one this chapter calculates, is the label that reaches forward across the cut, plus serial dependence at that cut. The open library's WF03 page is a practical cousin, with fixed and percentage-based exclusions, and with the diagnostic caveat attached.
:::

## Where this leads

Once the cut and the gap are specified, it is still possible to ruin the protocol by trying many gaps, many horizons or many windows and keeping the best score. That search is [[validation/parameter-search]]. The scale that grows with the number of tries, and the paper that defines the full deflated Sharpe ratio, are [[validation/the-deflated-sharpe]]. The folds that remain after a careful purge are still one path, which is [[validation/what-a-fold-does-not-prove]]. Serial dependence, the reason an embargo exists at all, is [[statistics/moments-and-dependence]].

:::summary
- A label of horizon $h$ at decision $t$ uses indices $t+1$ through $t+h$. It can intersect a later test even though $t$ itself is earlier than the test.
- If the train runs up to a test that starts at $\tau$, the purge removes exactly the $h$ decisions $\tau-h, \ldots, \tau-1$.
- The embargo removes a further gap for serial dependence. In the worked protocol, two per cent of $100$ training decisions is two further indices.
- A fixed gap thinner than the horizon does not close the label leak. Purge and embargo are not substitutes.
- WF03 reports 48 anchored folds over 26 years, with fixed and percentage-based exclusions, and is a slice diagnostic rather than independent out-of-sample evidence.
- Purging does not repair a feature that reads prices from after the decision, and it does not turn one history into many.
:::

## Exercises

:::exercise The first purged index {level=1 check="95"}
The test starts at index $100$ and the label horizon is $5$. The candidate train includes every index just before the test. What is the smallest decision index the purge removes? (Enter that index.)
:::solution
[[#prop-which]] removes $\tau-h = 100-5 = 95$, and every integer from there up to $99$. The smallest is $95$.
:::
:::

:::exercise Two per cent of a longer train {level=1 check="5"}
A percentage embargo uses $\rho = 0.02$ on a candidate train of $n = 250$ decisions, and $0.02 \times 250$ is an integer. How many further decisions does the embargo drop? (Enter that count.)
:::solution
$0.02 \times 250 = 5$. The embargo width is $5$ decisions under the rule in [[#def-embargo]]. This does not say those five are enough for a particular horizon. The horizon determines the purge. The percentage determines the embargo. They are computed separately.
:::
:::

:::exercise How many training rows survive {level=1 check="93"}
Start with $100$ candidate training decisions. A horizon of $5$ purges five of them, and a two per cent embargo drops two more. How many training decisions remain? (Enter that count.)
:::solution
$100 - 5 - 2 = 93$. On the index set $[0,99]$ with a test at $100$, the survivors are $[0,92]$.
:::
:::

:::exercise The right end of one label {level=2 check="101"}
The horizon is $h = 5$ and the decision is $t = 96$. What is the last index the label uses? (Enter that index.)
:::solution
The label uses $t+1$ through $t+h$, so the last index is $96+5 = 101$. If the test starts at $100$, then $101$ is a test index and the decision is purged. The same conclusion follows from $96 \ge 100-5$.
:::
:::

:::exercise A thin fixed gap {level=2 check="95"}
Only indices $98$ and $99$ are dropped before a test at $100$. The horizon is $5$. What is the smallest decision index that still has a label intersecting the test? (Enter that index.)
:::solution
The intersection rule still flags $95, 96, 97, 98, 99$. After $98$ and $99$ are removed, $95$ remains, and it is the smallest. Its label contains $100$. The fixed gap of two has not implemented [[#prop-which]].
:::
:::

:::exercise Horizon three on a short train {level=2 check="3"}
Candidate train $[0,11]$, test $[12,15]$, horizon $3$. How many training decisions does the purge remove? (Enter that count.)
:::solution
[[#prop-which]] removes $9, 10, 11$. The count is $h = 3$. With horizon $1$ the count would have been $1$, so the number is not a property of the calendar cut alone.
:::
:::

:::exercise Labels that run off the end of the sample {level=3 check="5"}
The test decisions are $100$ to $119$ inclusive, the horizon is $5$, and the sample ends at index $119$. How many of those test decisions have a label that requires an index strictly above $119$? (Enter that count.)
:::hint
The label of $t$ needs the index $t+h$. Find every test decision with $t+5 > 119$.
:::
:::solution
The inequality $t+5 > 119$ is $t > 114$, and $t$ must lie in $100, \ldots, 119$, so $t = 115, 116, 117, 118, 119$. There are five such decisions. A protocol that silently shortens their labels, and a protocol that drops them, produce different test sets. The purge between train and test does not answer this question. It is a separate line of the specification. Five incomplete labels out of twenty test decisions is large enough that ignoring it is not a rounding error.
:::
:::

:::exercise A feature the purge will not see {level=3 check="93"}
The horizon is $5$, the test starts at $100$, and the purge has removed $95$ to $99$. The decision $t = 90$ survives that purge. An illegal feature at $t = 90$ is the simple return from the price at $90$ to the price at $93$, so it reads the later price. What is the last price index that feature uses? (Enter that index.)
:::hint
Separate two questions. Does the label of $t = 90$ intersect the test? Which price index does the feature read? The purge answers only the first.
:::
:::solution
The feature uses the price at $93$. That index is the answer. The label of $t = 90$ is $\{91, 92, 93, 94, 95\}$, which stops at $95$ and does not meet a test that starts at $100$, so [[#prop-which]] correctly leaves $t = 90$ in the train. The feature is still illegal, because a decision at $90$ is using the price at $93$. Purge and embargo close label leaks and a stated dependence gap across the cut. They do not scan features for look-ahead. That check is the clock in [[backtesting/timing-costs-and-biases]], and it has to be passed before the purged fold means anything.
:::
:::
