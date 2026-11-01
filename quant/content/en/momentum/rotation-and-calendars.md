A momentum signal dated today does not say when the book is allowed to trade. The formation window, the skip and the dual filter choose a target weight vector. A second rule decides whether that target is imposed on a calendar date, only when the signal label flips, or only when a weight has wandered further than a band. Those are turnover policies. They are not three names for one backtest, and the library pages that illustrate them are not a controlled experiment in which only the clock changes.

The accounting starts before the policy. If you do not trade, prices move the weights for you. A name that was half the book and then rallies is more than half the book, with no decision having been taken. Any rule that "rebalances monthly" is a rule that undoes this drift on a date. A rule that waits for a new signal leaves the drift in place. The difference is a number, and the number below is computed rather than sketched.

## Drift is an identity, not a view

Suppose the decision at date $t$ sets weights $w_i$ as fractions of net asset value, with $\sum_i w_i = 1$, and there is no external cash flow before the next look at the book. Asset $i$ then has gross simple return $G_i = 1 + R_i > 0$ over the interval. The position that started at value $w_i$ finishes at value $w_i G_i$. The portfolio finishes at $\sum_j w_j G_j$, which is also its gross growth, because the weights summed to one.

:::definition Drifted weight {#def-drift}
With $\sum_i w_i = 1$ and no cash flow in or out, the **drifted weight** of asset $i$ is
$$
w_i' = \frac{w_i G_i}{\sum_j w_j G_j}.
$$
The **drift** of that name is $w_i' - w_i^{\star}$, where $w_i^{\star}$ is the target weight at the moment you look. If the signal has not been recomputed, the target is still the old weight and the drift is $w_i' - w_i$.
:::

:::proposition Two-asset drift {#prop-drift}
Let two assets have weights $w$ and $1-w$, and gross returns $G_1$ and $G_2$. Then
$$
w' = \frac{w G_1}{w G_1 + (1-w) G_2}.
$$
In particular, if $w = 1/2$ and $G_2 = 1$, then $w' = G_1 / (G_1 + 1)$.
:::

:::proof
The definition in [[#def-drift]] with two names is the first display: the denominator is the sum of weight times gross return. Set $w = 1/2$ and $G_2 = 1$. The denominator becomes $(1/2) G_1 + (1/2) \cdot 1 = (G_1 + 1)/2$, and the numerator is $(1/2) G_1$, so the ratio simplifies to $G_1 / (G_1 + 1)$.
:::

:::corollary Equal gross returns do not move weights {#cor-nodrift}
If $\sum_i w_i = 1$ and every asset has the same gross return $G > 0$, then $w_i' = w_i$ for every $i$.
:::

:::proof
The denominator in [[#def-drift]] is $\sum_j w_j G = G \sum_j w_j = G$. The numerator is $w_i G$. Cancelling $G$, which is not zero, leaves $w_i$. A market in which every held asset has the same simple return does not change a fully invested book's weights. Drift is a relative move, which is why a momentum book that has just picked a winner is exposed to it: the winner is the name most likely, if the signal was right or if it was merely lucky, to be the one that pulls ahead.
:::

:::example From one half to $0.62$ {#ex-062}
Two assets, A and B, start at weights $1/2$ and $1/2$. Over the interval A has gross return $31/19$ and B has gross return $1$. There is no trade. Find A's drifted weight and the drift relative to the original target of $1/2$. What simple return did A have?
:::solution
By [[#prop-drift]],
$$
w_A' = \frac{31/19}{31/19 + 1} = \frac{31/19}{50/19} = \frac{31}{50} = 0.62.
$$
The drift is $0.62 - 0.50 = 0.12$. A's simple return is $31/19 - 1 = 12/19$, which is $0.631579$ to six decimal places. B's simple return is $0$. The same identity with the complement gives B's new weight as $1 - 0.62 = 0.38$, a drift of $-0.12$. No view about momentum was required. A rally in the name that already had weight one half pulled that weight to $0.62$.
:::
:::

The distance $0.12$ is twelve percentage points of net asset value. It is not "about ten per cent" in the sense that would sit inside a band of width $0.10$. The policies below use an absolute band: trade when the absolute drift exceeds $b$, with $b = 0.10$ meaning ten percentage points, the same unit as the portfolio chapter's band. On this path the inequality $|0.12| > 0.10$ is true.

A smaller rally stays inside that band, and the contrast between policies needs that path as well.

:::example A rally the band ignores {#ex-inside}
Keep the starting weights at $1/2$ and $1/2$, and now let A's gross return be $1.20$ while B's is $1$. Compute the drifted weight, the drift to six decimal places, and say whether a band of $b = 0.10$ is breached.
:::solution
$$
w_A' = \frac{1.20}{1.20 + 1} = \frac{1.20}{2.20} = \frac{6}{11} = 0.5454545\ldots,
$$
which is $0.545455$ to six decimal places. The drift is $6/11 - 1/2 = 1/22 = 0.0454545\ldots$, or $0.045455$ to six decimals. The absolute drift is about $0.045$, which is not greater than $0.10$. A ten-point band does not trade. The month-end question is still open, because a calendar does not consult this inequality.
:::
:::

:::example Nothing drifts when both names match {#ex-equal}
Both assets start at weight $1/2$. Each has gross return $1.10$. There is no cash flow. Find the drifted weight of the first asset, and the one-way turnover of a calendar that resets to the same target.
:::solution
The numerator in [[#def-drift]] is $(1/2) \times 1.10 = 0.55$. The denominator is $(1/2) \times 1.10 + (1/2) \times 1.10 = 1.10$. The ratio is $0.55/1.10 = 0.50$. [[#cor-nodrift]] is this cancellation written once. The drifted vector is already the target, so a calendar reset has one-way turnover $0$ on this particular path. A common move does not create a trade. Only a *relative* move does, which is why the rally in [[#ex-062]] changed the book and this one did not.
:::
:::

## Three answers to the same drift

:::definition Three rebalance policies {#def-policies}
Let $w'$ be the drifted weight vector and $w^{\star}$ the target implied by the signal known at the decision, using only information available then.

1. **Calendar.** On each date in a fixed set, such as month-end or quarter-end, trade from $w'$ to $w^{\star}$. The signal need not have changed.
2. **Signal-change.** Trade only when the signal's discrete label differs from the label at the previous trade. A weight that has drifted, with the label unchanged, is left alone.
3. **Drift band.** Trade the whole book from $w'$ back to $w^{\star}$ if any name has $|w_i' - w_i^{\star}| > b$, for a stated absolute band $b$. Otherwise do not trade. This lesson takes $b = 0.10$ when it says a ten-point band. Per-name bands and partial trades are a different rule; W12's version is owned by the portfolio course.

**One-way turnover** of a trade from $w'$ to a new vector $u$ is
$$
\tau = \frac12 \sum_i |u_i - w_i'|.
$$
The factor one half counts a sale and the matching purchase once. If there is no trade, $\tau = 0$.
:::

On the path in [[#ex-062]], take the signal label as unchanged and the target as still $(1/2,\ 1/2)$. The three policies then disagree in a way that can be written as three turnovers.

- Signal-change turnover is $0$, because the label did not flip. The book is left at $(0.62,\ 0.38)$.
- Calendar turnover, at a month-end that falls on this date, resets the book to $(0.50,\ 0.50)$. The absolute changes are $0.12$ and $0.12$, so $\tau = \tfrac12(0.12 + 0.12) = 0.12$.
- The ten-point band also trades, because $0.12 > 0.10$, and its turnover is the same $0.12$ if the target is the same.

On the path in [[#ex-inside]] the label is again unchanged.

- Signal-change turnover is $0$.
- Calendar turnover is $\tfrac12 \times 2 \times (1/22) = 1/22 \approx 0.045455$.
- Band turnover is $0$, because the absolute drift does not exceed $0.10$.

This second path is the one on which a ten-point band is silent and a month-end rule is not. The first path, the move from $0.50$ to $0.62$, is the one on which both the band and the calendar trade, and only the signal-change rule is silent. Eyeballing $0.62$ as "inside ten per cent of one half" is the mistake [[#ex-062]] is there to stop. The distance is $0.12$.

:::example A label that does flip {#ex-flip}
Three assets have drifted weights $(0.62,\ 0.38,\ 0)$, which is the two-name rally of [[#ex-062]] with a third name still at weight zero. The signal then changes. The new target is $(0,\ 0.5,\ 0.5)$: the first name has left the winner set, and the third has entered it. Compute the one-way turnover of trading to the new target. A calendar date, a signal-change rule and a ten-point band all see a move far larger than $0.10$ in the first name. Do they all trade?
:::solution
The changes are $0 - 0.62 = -0.62$, $0.5 - 0.38 = 0.12$ and $0.5 - 0 = 0.50$. The sum of absolute changes is $0.62 + 0.12 + 0.50 = 1.24$. One-way turnover is $1.24 / 2 = 0.62$. The changes sum to zero, as they must when both vectors are fully invested.

All three policies trade. The calendar trades because the date is a rebalance date and the target has moved. The signal-change rule trades because the label changed: the winner set is a different set. The band trades because $|0.62 - 0| = 0.62 > 0.10$, and also because $|0 - 0.50| = 0.50 > 0.10$. Agreement on a flip does not make the policies the same rule. They already disagreed on the path where the label was quiet and the weight moved from $0.50$ to $0.62$.
:::
:::

:::warning Twelve points is outside a ten-point band
A band of $10\%$ is an absolute distance of $0.10$ in this lesson and in the portfolio chapter's statement of the same object: trade when $|w' - w^{\star}| > b$. The drifted weight $0.62$ against a target of $0.50$ has distance $0.12$. The band trades. The path that the band skips is the smaller one, from $0.50$ to about $0.545$, where the distance is $1/22$. A month-end rule trades on both paths. Quoting a single "rebalanced momentum" return without saying which of these three responses was used quotes a mixture.
:::

:::widget plot
f: x/(x+1)
x: 1, 2.2
hlines: 0.5; 0.6
caption: New weight of a name that started at one half, when the other name's gross return stays at 1. The horizontal line at 0.60 is the edge of a ten-point band around 0.50. The curve passes 0.60 once the winner's gross return exceeds 1.5, and it passes 0.62 at a gross return of 31/19. This is an accounting identity, not a forecast.
:::

:::quiz
The signal label is unchanged. The policy is signal-change. The weight of the winner has drifted from $0.50$ to $0.62$. What is the one-way turnover?
- [ ] $0.12$, because the weight moved
- [x] $0$, because the label did not change
- [ ] $0.62$, because that is the new weight
- [ ] $0.10$, the width of the band
:::solution
Signal-change turnover is zero whenever the discrete label is the same as it was at the previous trade. The drift is real, and a calendar would trade $0.12$ of one-way turnover to remove it. The signal-change rule is defined to leave it.
:::
:::

:::quiz
Both assets in a fully invested two-asset book have gross return $1.10$. The starting weight on the first was $0.50$. What is the drifted weight?
- [ ] $0.55$, because both rose by ten per cent of the weight
- [ ] $0.60$, the edge of the ten-point band
- [x] $0.50$, because equal gross returns do not move weights
- [ ] $1.10$, the gross return itself
:::solution
[[#cor-nodrift]] cancels the common gross return. A ten per cent rise in both names raises net asset value and raises each position value by the same factor. The shares of net asset value are where they started.
:::
:::

## What the library pages are, and are not

O17 is an event-driven monthly momentum rotation, executed with orders, on a multi-asset book. Daily bars, $19$ years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026: total return $+381\%$, CAGR $+8.62\%$, reported Sharpe $0.53$, maximum drawdown $-28.2\%$, win rate $52.1\%$, profit factor $1.78$. This atlas has not re-run the backtest. The word "monthly" is a calendar in the sense of [[#def-policies]]. The word "orders" means the fills are in the project's order mode rather than its weight mode; order fills are a different course, and this chapter does not re-derive them. "Event-driven" is the catalogue's phrase for how those orders are submitted. It is not a licence to treat O17 as the signal-change policy. The one-line description says monthly, and monthly is the part used here.

The reported pair CAGR $+8.62\%$ and maximum drawdown $-28.2\%$ is a description of that whole specification over $19$ years. It is not a ranking of calendars, and it is not a target. A deeper drawdown beside a higher CAGR is not, by itself, a reason to prefer the page or to avoid it. Nothing on the page tells a reader to run the rotation.

O18 trades only when an SMA trend signal flips, and the catalogue's own line says there is no calendar. Daily bars, $25$ years. As reported on the same reading of quants.md: total return $+130\%$, CAGR $+3.38\%$, reported Sharpe $0.22$, maximum drawdown $-16.3\%$, win rate $52.4\%$, profit factor $2.21$. This atlas has not re-run it. The moving-average cross that produces the flip is derived in [[trend/moving-averages]], and the whipsaw that a flip rule still suffers is discussed in [[trend/lag-whipsaw-and-costs]]. One paragraph is enough here, because O18 is not O17 with the calendar removed. The signal is an average cross rather than a momentum rank, the span is $25$ years rather than $19$, and the universe is that example's universe. Subtracting $+3.38\%$ from $+8.62\%$ and calling the difference the value of a month-end clock would attribute to the calendar every other difference on the two pages. The policies in [[#def-policies]] were compared above on a common toy path precisely so that the calendar was the only thing that changed. The library does not offer that pair of pages.

W12 is a momentum tilt that trades only names past a $10\%$ drift band. As reported, its CAGR over $26$ years is $+5.15\%$. The full row, including the reported Sharpe $0.30$ and the maximum drawdown $-36.8\%$, is discussed with the algebra of bands, turnover budgets and breakers in [[portfolio/drift-turnover-and-breakers]]. This chapter borrows one fact from that page: a band is a third policy, distinct from a month-end and from a signal flip. It does not borrow $+5.15\%$ as the effect of "adding a band to O17". Different page, different span, different rest of the specification.

:::application The quiet month
Take the inside-band path, weight $0.545455$ against a target of $0.50$, label unchanged. A researcher who rebalances every month-end trades about $0.045$ of the book, one way, and pays costs on that trade. A researcher who uses the ten-point band trades nothing. A researcher who trades only on signal changes also trades nothing. If the next month's return is identical for the two assets, [[#cor-nodrift]] says the weight will not move further on account of that month. The cost was paid, in the calendar book, for returning to a target the relative returns had only mildly disturbed. Whether that cost is worth paying is a property of the signal's decay and of the cost, not a property of the word rotation.
:::

:::remark Targets that do not notice the winner
An equal-weight book of a fixed list has the same target whoever won the last year. Drift still happens, and a calendar still trades it back, but a signal-change rule on the ranking never fires if the held list is not a function of the ranking. Rotation, in the sense of this chapter, means the target itself depends on the momentum signal. O17's target does. A fixed equal-weight portfolio's monthly rebalance is only the first policy, applied to a target that momentum did not choose.
:::

:::history
Jegadeesh and Titman's 1993 design already contained a calendar, whether or not later writers describe it as a rebalance policy. They formed a cohort every month and held it for $K$ months, averaging the living cohorts. That is a monthly formation calendar glued to a holding window of several months, which is the overlapping-sleeve construction of [[momentum/formation-skip-and-dual]]. Choosing $K$, and choosing to form every month rather than only when a rank changes, was part of the research design. It was not a brokerage convention they failed to mention. Quarter-end dual rankings of the sort W04 uses are a later specification in the same broad family, with a different clock. The clock is part of the result in both cases.
:::

## Where this leads

A calendar that keeps a winner-minus-loser book on its target also keeps it exposed to the episodes in which that book falls hard. Those episodes are [[momentum/momentum-crashes]]. The band algebra that W12 only illustrated is [[portfolio/drift-turnover-and-breakers]]. The order mode that O17 actually traded in is separated from weight mode in [[backtesting/weights-versus-orders]], and the moving-average flip in O18 stays with [[trend/moving-averages]].

:::summary
- If weights sum to one and there is no cash flow, a name's weight drifts to $w_i G_i$ divided by the portfolio's gross growth. Equal gross returns do not move weights.
- A name that starts at weight $1/2$, with the other name's gross return equal to $1$, finishes at weight $0.62$ when its own gross return is $31/19$. The drift is $0.12$. A gross return of $1.20$ finishes at weight $6/11$, and the drift is $1/22$.
- A calendar trades back to the target on the date. A signal-change rule trades only when the label flips. A ten-point absolute band trades only when some name has moved by more than $0.10$. On the path to $0.62$ the band trades; on the path to $6/11$ it does not. The calendar trades on both. Signal-change trades on neither if the label is quiet.
- One-way turnover is half the sum of absolute weight changes. Resetting $(0.62,\ 0.38)$ to $(0.50,\ 0.50)$ has one-way turnover $0.12$. The three-name flip to $(0,\ 0.5,\ 0.5)$ has one-way turnover $0.62$.
- O17 is a monthly momentum rotation in order mode: reported CAGR $+8.62\%$, reported Sharpe $0.53$, maximum drawdown $-28.2\%$, over $19$ years. O18 is an SMA flip rule with no calendar, a different signal and a different span. W12 is a $10\%$ drift band whose algebra lives in the portfolio course. Do not subtract their CAGRs and call the remainder a calendar effect. This atlas has not re-run the pages.
:::

## Exercises

:::exercise Drifted weight at a gross return of $31/19$ {level=1 check="0.62"}
Two assets start at weights $1/2$ and $1/2$. The first has gross return $31/19$ and the second has gross return $1$. What is the first asset's drifted weight? (Enter a decimal.)
:::solution
By [[#prop-drift]], $w' = (31/19) / (31/19 + 1) = 31/50 = 0.62$.
:::
:::

:::exercise The drift itself {level=1 check="0.12"}
In the previous exercise the target is still $1/2$, because you have not recomputed a signal. What is the drift of the first asset? (Enter a decimal.)
:::solution
$0.62 - 0.50 = 0.12$. The second asset's drift is $-0.12$, because the two drifted weights still sum to one.
:::
:::

:::exercise A common gross return {level=1 check="0.5"}
Both assets have gross return $1.10$, and the first started at weight $0.50$. What is its drifted weight? (Enter a decimal.)
:::solution
[[#cor-nodrift]] gives $w' = 0.50$. The numerator is $0.50 \times 1.10$ and the denominator is $1.10$, so the factors cancel. The answer is $0.5$.
:::
:::

:::exercise Drift after a twenty per cent rally {level=2 check="0.045455"}
The first asset's gross return is $1.20$, the second's is $1$, and both started at weight $1/2$. What is the drift of the first asset relative to $1/2$, to six decimal places? (Enter the six-decimal number.)
:::solution
The new weight is $1.20 / 2.20 = 6/11 = 0.5454545\ldots$, which rounds to $0.545455$. The drift is $6/11 - 1/2 = 1/22 = 0.0454545\ldots$, which rounds to $0.045455$. A band of $0.10$ is not breached.
:::
:::

:::exercise Turnover when the band is silent {level=2 check="0"}
Use the drift from the previous exercise. The signal label is unchanged, so the target is still $1/2$. The policy is the ten-point band in [[#def-policies]]. What is the one-way turnover? (Enter a decimal.)
:::solution
The absolute drift is about $0.045$, which is not greater than $0.10$. The band does not trade. Turnover is $0$. A month-end calendar on the same path would have one-way turnover $1/22$, about $0.045455$. The policies differ by exactly that trade.
:::
:::

:::exercise Turnover of the three-name flip {level=2 check="0.62"}
Drifted weights are $(0.62,\ 0.38,\ 0)$ and the new target is $(0,\ 0.5,\ 0.5)$. What is the one-way turnover? (Enter a decimal.)
:::solution
Absolute changes: $|0 - 0.62| = 0.62$, $|0.5 - 0.38| = 0.12$, $|0.5 - 0| = 0.50$. The sum is $1.24$. Half of that is $0.62$.
:::
:::

:::exercise The gross return that lands on the band edge {level=3 check="1.5"}
A name starts at weight $1/2$, and the other name's gross return is $1$. Which gross return $G$ puts the drifted weight exactly at $0.60$, the edge of a ten-point band around $0.50$? (Enter a decimal.)
:::hint
Use $w' = G/(G+1)$. Set that equal to $0.60$ and solve for $G$. The band in this lesson trades only when the distance is strictly greater than $0.10$, so the edge itself is not yet a trade. You are being asked for the edge, not for a point beyond it.
:::
:::solution
Solve $G/(G+1) = 0.60$. Then $G = 0.60\, G + 0.60$, so $0.40\, G = 0.60$, and $G = 0.60/0.40 = 1.5$. At a simple return of $+0.50$ the drifted weight is exactly $0.60$. The path in [[#ex-062]], with simple return $12/19 \approx 0.63$, is past this edge, which is why that band trades. The path with gross return $1.20$ is not.
:::
:::

:::exercise Both names move {level=3 check="0.666667"}
Two assets start at weight $1/2$ each. Gross returns are $1.8$ and $0.9$. What is the first asset's drifted weight, to six decimal places? (Enter the six-decimal number.)
:::hint
The denominator is $(1/2)(1.8) + (1/2)(0.9)$, not $1$. Divide the first position's ending value by that sum. The two gross returns are not equal, so the corollary that freezes weights does not apply.
:::
:::solution
Numerator: $(1/2) \times 1.8 = 0.9$. Denominator: $0.9 + 0.45 = 1.35$. The new weight is $0.9 / 1.35 = 2/3 = 0.666666\ldots$, which is $0.666667$ to six decimal places. The drift is $2/3 - 1/2 = 1/6 \approx 0.166667$, which is greater than $0.10$, so the ten-point band trades. One-way turnover back to $1/2$ is also $1/6$, because half of $2 \times (1/6)$ equals $1/6$.
:::
:::
