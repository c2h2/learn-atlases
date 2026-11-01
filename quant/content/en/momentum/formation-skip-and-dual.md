A rank is not yet a portfolio. Someone still has to say which past months enter the number being ranked, which recent month is left out, and how long the weights are left in place. Those three choices change the signal even when the sentence "hold past winners against past losers" stays fixed. A fourth choice, the absolute filter, asks a question the ranking refuses: if the winner's own past return is negative, do you still hold it?

The reason a recent month gets special treatment is a different horizon, not a fussiness about calendars. Jegadeesh in 1990 and Lehmann in 1990 documented short-horizon negative autocorrelation in individual stocks. The reversion course keeps that claim in its own place, in [[reversion/the-reversion-hypothesis]], and does not mix it with a three-to-twelve-month continuation. The practical consequence for a ranking is narrow. The last month can reorder names for a reason that intermediate-horizon momentum does not claim. Leaving that month out, or leaving a gap between formation and holding, is a way of refusing the mixture. It is a specification, not a decoration.

## Three windows, and one product

At a decision date $t$ the most recent completed monthly simple return is $R_t$. Older returns are $R_{t-1}$, $R_{t-2}$, and so on. A formation rule picks a finite set of those returns and compounds them.

:::definition Formation, skip and holding {#def-windows}
The **formation window** is the set of past simple returns that enter the signal dated $t$. The **skip window** is a most-recent stretch excluded from that set, often the single month $R_t$ or $R_{t-1}$, depending on how the decision date is labelled. The **holding window** is the future stretch over which the weights chosen at $t$ are left unchanged.

The **12–1 formation return** used in this lesson skips the most recent month $R_{i,t}$ and compounds the eleven months from $t-11$ through $t-1$,
$$
F^{\mathrm{skip}}_{i,t} = \prod_{k=1}^{11} \bigl(1 + R_{i,t-k}\bigr) - 1.
$$
The full twelve-month formation return compounds those eleven months together with $R_{i,t}$. Papers that name the *holding* month $t$, rather than the decision date, write this same skipped window as month $t-12$ through month $t-2$. The two indexings are one window. The full twelve-month product and the skipped product are not.
:::

Count the indices. From $t-11$ through $t-1$ inclusive is eleven monthly returns, not twelve, and $R_t$ is the month left out. The name "12–1" means a year of calendar with the latest month removed. It does not mean a twelve-month compound that has merely been delayed. Jegadeesh and Titman's original design is in the same family but not the same product. They formed on a $J$-month window and held for $K$ months, with $J$ and $K$ in $\{3, 6, 9, 12\}$, and a short gap between formation and holding is part of that design. A gap *after* a window that still contains the last month, and a window that *drops* the last month from the product, can rank the same names differently. Write which one you mean.

:::proposition When a skip can reorder a universe {#prop-skip}
Let $G_i > 0$ be asset $i$'s gross return over a shared earlier window, and let $g_i = 1 + R_i^{\mathrm{last}} > 0$ be the gross return in the month a skip would drop. The full gross formation return is $G_i g_i$. If $g_i = g$ for every $i$ and some $g > 0$, then $G_i g_i$ and $G_i$ have the same strict order. If the $g_i$ are allowed to differ, the order of $G_i g_i$ can differ from the order of $G_i$.
:::

:::proof
Suppose $G_a > G_b$ and $g_a = g_b = g > 0$. Multiplying both sides by $g$ preserves the inequality, so $G_a g > G_b g$. Every pairwise comparison survives, and the ranks survive. That is the first claim: a common last month cannot, by itself, reorder the universe.

For the second claim it is enough to exhibit two assets. Let $G_A = (1.01)^{11}$ and $g_A = 0.88$, and let $G_B = (1.002)^{11}$ and $g_B = 1.04$. Direct calculation gives
$$
G_A - 1 = 0.115668, \qquad G_A g_A - 1 = -0.018212,
$$
$$
G_B - 1 = 0.022221, \qquad G_B g_B - 1 = 0.063110,
$$
to six decimal places. On the earlier window A leads B, because $0.115668 > 0.022221$. On the full window B leads A, because $0.063110 > -0.018212$. Dropping the last month reverses the ranking. The skip is not a delay of the same decision.
:::

:::example Eleven quiet months and one violent one {#ex-skip}
Asset A has eleven monthly simple returns of $+0.01$, oldest first, and then a last month of $-0.12$. Asset B has eleven monthly simple returns of $+0.002$ and then a last month of $+0.04$. Compute the twelve-month compound simple return and the eleven-month compound that drops the last month, for each asset, to six decimal places. Who ranks first under each signal?
:::solution
Asset A's eleven-month gross return is $(1.01)^{11} = 1.115668$ to six decimals in the gross figure used above, and the compound simple return is $0.115668$. Including the last month multiplies by $0.88$:
$$
(1.01)^{11} \times 0.88 - 1 = -0.018212.
$$
Asset B's eleven-month compound return is $(1.002)^{11} - 1 = 0.022221$. Including the last month multiplies by $1.04$:
$$
(1.002)^{11} \times 1.04 - 1 = 0.063110.
$$
With the last month included, B ranks above A ($0.063110 > -0.018212$). With the last month dropped, A ranks above B ($0.115668 > 0.022221$). A rule that says "twelve-month winners" without saying whether the last month is inside the product has not named a portfolio. The arithmetic is the witness in [[#prop-skip]].
:::
:::

The same arithmetic is why a skip is aimed at reversal and not at volatility in the abstract. A's last month was a large negative return after a steady climb. If that month was a short-horizon reversal, folding it into a twelve-month rank punishes A for a move the intermediate-horizon sentence is not about. If that month was the start of a genuine change in A, dropping it leaves the signal stale. Both stories are possible. The skip chooses the first worry and pays the second. It does not settle which story was true.

The signal at a decision date is the simple return from the close f steps before the end of the formation to the close at the end of the formation. The skip sits between that end and the decision, and it is not part of the signal. The return after the decision is not part of the signal either. Move the decision, the length, or the skip. The path is a smooth toy, so the sign of the signal is a property of that curve.

:::widget formation
form: 12
skip: 1
now: 36
caption: The first shaded block is the formation. The second, if the skip is positive, is the gap that the signal does not use. The vertical line is the decision. The readout is the simple return across the formation only. Shorten the skip to 0 and the formation runs up to the decision close. The path is invented.
:::

:::widget sequence
a: (1.01)^n - 1
mode: terms
N: 12
caption: Twelve steps of a constant +1% simple return, compounded. A skip-month rule deletes one factor from this product, and deleting the last factor is not the same decision as deleting an earlier one when assets differ. The path is a toy, not a price.
:::

## Relative weights, and the absolute filter

Dual momentum, as popularised in book form by Antonacci in 2014, stacks two sentences. The relative sentence ranks. The absolute sentence requires an asset's own past return to be positive before that asset is held. If nothing passes, the book is cash. The library's W04 is one member of that family — a count of two, a twelve-month rank, a quarter-end clock — and it is not the book. The definitions below are this lesson's conventions, chosen so that a three-name example has a determinate weight vector. Another count, or a short side, would be a different rule.

:::definition Pure relative book and dual book {#def-dual}
Let three distinct assets have formation returns $F_{(1)} > F_{(2)} > F_{(3)}$, the skip already applied or already refused, and say which. The **pure relative book** in this lesson puts weight $+1/2$ on the best, weight $-1/2$ on the worst, and weight $0$ on the middle. The weights sum to $0$ and the gross exposure is $1$.

The **dual book** looks only at names with a positive formation return. Take the two best names in the universe. Hold, at equal weight, those of them whose own formation return is strictly positive. Any name that fails the sign test, and any name outside that top two, gets weight $0$. If neither of the top two has a positive formation return, every weight is $0$ and the book is cash. Cash earns simple return $0$ in the examples, unless a later exercise says otherwise. There are no shorts.
:::

On the returns $+8\%$, $+3\%$ and $-2\%$, these two books do not match. The pure relative book shorts the worst name. The dual book refuses that short, and it holds the middle name because $+3\%$ is both inside the top two and positive.

:::example Relative and dual on $+8\%$, $+3\%$, $-2\%$ {#ex-dual}
Three assets, X, Y and Z, have skip-adjusted twelve-month simple returns $+0.08$, $+0.03$ and $-0.02$. Write both weight vectors from [[#def-dual]], in the order (X, Y, Z). The next month's simple returns are $+0.01$, $-0.04$ and $+0.06$. Compute both portfolio returns.
:::solution
The order is X, Y, Z. The pure relative weights are $(+1/2,\ 0,\ -1/2)$. The top two are X and Y, and both formation returns are positive, so the dual weights are $(1/2,\ 1/2,\ 0)$.

The pure relative return is
$$
(1/2)(0.01) + (-1/2)(0.06) = 0.005 - 0.030 = -0.025.
$$
The dual return is
$$
(1/2)(0.01) + (1/2)(-0.04) = 0.005 - 0.020 = -0.015.
$$
Same gross exposure, same next month, different books. The gap is not a scale effect. Z was the best of the three over the next month and the pure relative book was short it. Y fell and the dual book was long it. Neither number is a recommendation. They are the two maps applied to invented inputs.
:::
:::

:::example Nobody is positive {#ex-cash}
Formation returns are $-0.01$, $-0.04$ and $-0.09$, already skip-adjusted. Write the pure relative weights and the dual weights. If the next simple returns are $+0.02$, $+0.01$ and $-0.03$, and cash earns $0$, what does each book return?
:::solution
The least bad name is the first and the worst is the third. Pure relative weights: $(+1/2,\ 0,\ -1/2)$. Every formation return is negative, so the dual set is empty and the dual weights are $(0, 0, 0)$.

$$
R^{\mathrm{rel}} = (1/2)(0.02) + (-1/2)(-0.03) = 0.010 + 0.015 = 0.025,
$$
$$
R^{\mathrm{dual}} = 0.
$$
The relative book still holds a name with a negative own past return, financed by a short in a worse one. The dual book holds cash and earns the cash return we stated, which is zero. The common-shift corollary in [[momentum/two-kinds-of-momentum]] says something useful here, and also something easy to miss. Adding a constant to every *asset* return would not change the pure relative result, because that book sums to zero. It would not pay the dual book either, unless the cash rate itself moves. The comparison depends on what cash earns. Setting cash to zero is a modelling choice, not a fact about funding markets.
:::
:::

:::quiz
Asset A's last month was very negative and asset B's last month was very positive. The earlier eleven months rank A above B. Which statement is right?
- [ ] A skip cannot change the ranking, because both signals use almost the same year
- [x] Including the last month can put B above A, as in the eleven-versus-twelve calculation
- [ ] The skip always ranks the asset with the worse last month first
- [ ] Time-series signs ignore the last month by definition
:::solution
[[#prop-skip]] says a common last month cannot reorder anyone, and a pair of different last months can. The worked pair A and B is exactly this pattern: A leads on the skipped window and loses the lead once the last month is multiplied in. The skip does not "always" promote the name that just fell. It drops a month. Where that name then sits is an arithmetic outcome.
:::
:::

## Holding for more than one rebalance

A holding window of $K$ periods, with a new portfolio formed every period, creates overlapping sleeves. Jegadeesh and Titman did not pick one portfolio and stare at it for $K$ months in isolation. Each month they started a cohort and averaged the cohorts still inside their holding windows. That average is a calendar choice. It belongs to the definition of the experiment.

:::algorithm Overlapping sleeves {#alg-overlap}
Fix a holding length of $K$ rebalance dates. At each date form a sleeve by a stated map, for example the equal-weight winner-minus-loser map of [[momentum/two-kinds-of-momentum]]. The live weight vector is the equal-weighted average of the $K$ sleeves whose holding windows still contain the date. Do not rescale a name upward because another sleeve has cancelled it. Each sleeve is funded with $1/K$ of capital, and a cancelled pair of positions is simply a smaller gross exposure.
:::

:::example Two sleeves that partly cancel {#ex-sleeve}
Sleeve 1, still alive, has weights $(0.5,\ 0.5,\ -0.5,\ -0.5)$. Sleeve 2, just formed, has weights $(0.5,\ -0.5,\ 0.5,\ -0.5)$. The holding length is $K = 2$, and both sleeves are inside their windows. Write the live book. What are its net sum and its gross exposure?
:::solution
The live weight is the average, coordinate by coordinate:
$$
\bigl((0.5+0.5)/2,\ (0.5-0.5)/2,\ (-0.5+0.5)/2,\ (-0.5-0.5)/2\bigr) = (0.5,\ 0,\ 0,\ -0.5).
$$
The sum is $0$. The gross exposure is $0.5 + 0.5 = 1$. Each sleeve on its own had gross exposure $2$. Averaging them cut the gross exposure in half because the middle two names were long in one sleeve and short in the other. Rescaling the live book back to gross exposure $2$ would be a different rule. [[#alg-overlap]] refuses that rescaling on purpose: the cancelled names were cancelled by the overlap, not forgotten by a rounding error.
:::
:::

Overlap changes the path even when every sleeve is a standard winner-minus-loser map. A reversal of the entire ranking does not flip the live book in one date. Half of yesterday's sleeve is still inside its holding window. That lag is the cost of the design Jegadeesh and Titman used to average out the starting-month noise of a single cohort. It is also a way to be slow. The next chapter treats the calendar as a turnover policy. Here the point is narrower: the holding window is inside the signal's life, not a reporting convenience.

## The quarterly page is one specification

W04 ranks exchange-traded funds by twelve-month return, holds the top two if their returns are positive, and does this at quarter-end. Daily bars, $19$ years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026: total return $+64.6\%$, CAGR $+2.66\%$, reported Sharpe $0.12$, maximum drawdown $-42.8\%$, win rate $59.5\%$, profit factor $1.21$. This atlas has not re-run the backtest and has not verified how the reported Sharpe was annualised.

Read the sentence in pieces, because each piece is doing work. "Twelve-month return" is a formation window; the one-line description does not say whether a skip month was removed, so this lesson will not invent one. "Top two if positive" is a dual filter of the same family as [[#def-dual]], with a count of two and with cash, rather than a short, when a name fails the sign test. "Quarter-end" is a calendar. The reported path that comes out of all three choices together is a modest positive CAGR beside a maximum drawdown of $-42.8\%$. The drawdown is not a footnote to the CAGR. A reader who quotes $+2.66\%$ and omits $-42.8\%$ has not described the page. A reader who treats $0.12$ as the Sharpe ratio of dual momentum in general has confused one quarterly specification with a research programme. Antonacci's book argued for combining relative and absolute momentum as an investing method. This atlas is not repeating that advice. W04 is a published backtest of one rule in the family, and the family is larger than the page.

:::warning Do not mix the one-month reversal with the twelve-month rank
A negative last month and a strong prior year are different claims. The reversion course studies the first, including a weekly loser-minus-winner page, W16, whose reported result is itself negative. Folding that horizon back into the formation return and then announcing that "momentum failed" or "momentum worked" names no experiment. If the last month can reorder the book, as [[#ex-skip]] shows, then including it and excluding it are two signals. Report them as two signals.
:::

:::intuition Why the filter changes the short side
A pure relative book with weights summing to zero must short someone whenever it is long someone. The worst name in a universe of rising assets is still short. The dual rule in [[#def-dual]] will not short a name merely for finishing last, and it will not hold a winner whose own past return is negative. On $+0.08$, $+0.03$, $-0.02$ the two objections bite different names: the short in Z is the first objection, and there is no failing winner. On $-0.01$, $-0.04$, $-0.09$ the second objection empties the book. That is the sense in which the rules differ. It is not a claim that one of them is the right portfolio.
:::

:::remark Cash is a weight
Weight zero earns whatever cash earns under the specification. This lesson sets that simple return to zero so that the filter is the only difference on the page. A funding rate, a different count than two, or a short side added back, would be further specifications. W04's quarter-end clock is yet another, and it waits for [[momentum/rotation-and-calendars]].
:::

:::history
The intermediate-horizon ranking is Jegadeesh and Titman, Journal of Finance, 1993: formation and holding windows of three to twelve months, a short gap, and a positive winner-minus-loser average in their US sample. The worry that the most recent month belongs to a different effect is older than the factor tables. Jegadeesh in 1990 and Lehmann in 1990 had already reported short-horizon reversal; the reversion course is where that evidence is weighed. Carhart in 1997 used a winner-minus-loser factor whose past return skips the most recent month, the 12–1 shape of [[#def-windows]]. Antonacci's 2014 book put the relative ranking and the absolute sign together for a general reader. The library page W04 is one quarterly specification in that family, not a summary of the book and not advice to hold the assets it ranked.
:::

## Where this leads

The windows choose the signal. They do not yet choose the dates on which weights are allowed to change. Month-end, quarter-end, a drift band and a trade only when the signal flips are the subject of [[momentum/rotation-and-calendars]]. The two sentences being filtered, rank against sign, were separated in [[momentum/two-kinds-of-momentum]]. The short-horizon effect the skip is trying not to swallow is [[reversion/the-reversion-hypothesis]], and the weekly loser-minus-winner page sits in [[reversion/cross-sectional-reversal]].

:::summary
- Formation, skip and holding are three different windows. The 12–1 formation return in this lesson compounds the eleven months from $t-11$ through $t-1$ and drops the most recent month $R_t$.
- A last month that is the same for every asset cannot reorder a compound ranking. A last month that differs across assets can. In the worked pair, eleven months rank A first and twelve months rank B first.
- The pure relative three-name book is long the best at $+1/2$ and short the worst at $-1/2$. The dual book holds, equally weighted, the top two names whose own formation returns are positive, and otherwise cash. On $+0.08$, $+0.03$, $-0.02$ the weight vectors differ.
- If every formation return is negative, the dual book is cash under this convention. The relative book still holds the least bad name against the worst. What cash earns is part of the comparison.
- Overlapping $K$ sleeves, averaged and not rescaled, are the Jegadeesh–Titman holding design. Two disagreeing sleeves in the example cut gross exposure from $2$ to $1$.
- W04, top two if positive at quarter-end, reports CAGR $+2.66\%$, reported Sharpe $0.12$ and maximum drawdown $-42.8\%$ over $19$ years. The drawdown belongs in the sentence. The page is not dual momentum in general, and this atlas has not re-run it.
:::

## Exercises

:::exercise A two-month compound {level=1 check="0.045"}
An asset returns $+0.10$ and then $-0.05$. What is the two-month compound simple return? (Enter a decimal.)
:::solution
The gross product is $1.10 \times 0.95 = 1.045$. The compound simple return is $1.045 - 1 = 0.045$. Adding the simple returns would have given $0.05$, which is not the compound.
:::
:::

:::exercise Dual weight on the negative name {level=1 check="0"}
Formation returns are $+0.08$, $+0.03$ and $-0.02$, skip already applied. Using [[#def-dual]], what is the dual book's weight on the third asset? (Enter a decimal.)
:::solution
The top two are the first and the second, both positive, so they share the book at $1/2$ each. The third asset has a negative formation return and is outside that pair. Its dual weight is $0$.
:::
:::

:::exercise Pure relative weight on the worst name {level=1 check="-0.5"}
For the same three formation returns, what is the pure relative weight on the worst asset? (Enter a decimal.)
:::solution
The worst return is $-0.02$. The pure relative book puts weight $-1/2$ on the worst and $+1/2$ on the best. The weight is $-0.5$. The dual book gave this same asset weight $0$. The two rules differ on this coordinate.
:::
:::

:::exercise Twelve-month compound for asset A {level=2 check="-0.018212"}
Asset A has eleven monthly simple returns of $+0.01$ followed by $-0.12$, as in [[#ex-skip]]. What is the twelve-month compound simple return, to six decimal places? (Enter the six-decimal number.)
:::solution
$(1.01)^{11} = 1.115668346\ldots$, and times $0.88$ this is $0.981788145\ldots$. Subtracting $1$ gives $-0.01821185\ldots$, which is $-0.018212$ to six decimal places. The eleven-month compound, dropping the last month, is $+0.115668$ to six decimals. The sign of A's formation return depends on whether the skip is in force.
:::
:::

:::exercise Dual book when every formation return is negative {level=2 check="0"}
Every formation return in a three-name universe is negative. Cash earns simple return $0$. The next asset returns are $+0.04$, $-0.02$ and $+0.01$. What is the dual book's simple return under [[#def-dual]]? (Enter a decimal.)
:::solution
The dual set is empty, so every weight is $0$. The book earns the cash return, which is $0$, regardless of the three asset returns. A pure relative book would not earn $0$ on these next returns. That difference is the filter, not a property of the next month.
:::
:::

:::exercise Average of two sleeves {level=2 check="0"}
Sleeve 1 has weights $(0.5,\ 0.5,\ -0.5,\ -0.5)$ and sleeve 2 has weights $(0.5,\ -0.5,\ 0.5,\ -0.5)$. Under [[#alg-overlap]] with both sleeves alive, what is the live weight on the second name? (Enter a decimal.)
:::solution
The second coordinate averages $(0.5 + (-0.5))/2 = 0$. The live book is $(0.5,\ 0,\ 0,\ -0.5)$. Do not rescale the second name back to a non-zero weight. The sleeves disagreed, and the average records the disagreement.
:::
:::

:::exercise A smaller ranking flip {level=3 check="-0.01"}
Asset P's gross return over the earlier window is $1.10$, and its last month is $-0.10$. Asset Q's earlier gross return is $1.05$, and its last month is $+0.02$. What is P's full compound simple return, including the last month? (Enter a decimal.)
:::hint
The full gross return is the product of the earlier gross return and one plus the last simple return. Subtract $1$ at the end. Then compare $1.10$ with $1.05$, and compare the two full gross returns, to see which signal ranks P first.
:::
:::solution
P's full gross return is $1.10 \times 0.90 = 0.99$, so the compound simple return is $0.99 - 1 = -0.01$. Q's full gross return is $1.05 \times 1.02 = 1.071$, so Q's compound simple return is $0.071$. On the skipped window P leads, because $1.10 > 1.05$. On the full window Q leads, because $1.071 > 0.99$. The last months were not a common factor, so [[#prop-skip]] allows the order to change, and here it does.
:::
:::

:::exercise Cash at zero against a zero-sum book {level=3 check="-0.025"}
Formation returns are $-0.01$, $-0.04$ and $-0.09$. Next simple returns are $+0.02$, $+0.01$ and $-0.03$. Cash earns $0$. What is the dual book's return minus the pure relative book's return, under [[#def-dual]]? (Enter a decimal.)
:::hint
The dual book is cash, so its return is $0$. The pure relative book is long the least bad name at $+1/2$ and short the worst at $-1/2$. Subtract that return from zero.
:::
:::solution
Dual return: $0$. Pure relative weights are $(+1/2,\ 0,\ -1/2)$, and
$$
R^{\mathrm{rel}} = (1/2)(0.02) + (-1/2)(-0.03) = 0.025.
$$
The difference is $0 - 0.025 = -0.025$. The relative book made money by shorting a name that then fell, while remaining long a name whose own formation return was negative. The dual rule, as defined here, declines that pair of positions. Raising the cash rate would move the dual return and would not move the relative return, because a common addition to every asset return drops out of a zero-sum book while a cash rate is a property of the weight on cash.
:::
:::
