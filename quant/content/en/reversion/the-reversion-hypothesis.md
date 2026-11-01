A price that has just fallen is not, by that fact, cheap, and a price that has just risen is not, by that fact, finished. **Short-horizon reversal** is the hypothesis that, over a stated short window, some of an individual asset's own move tends to come back. The window is part of the claim. A week is not a year, and a year is not the next bar. Mixing those clocks is how a sentence from one study gets rewritten as an entry level the study never used.

This chapter keeps two historical claims apart, then computes a one-day sign rule on the atlas's shared toy path and on a second path that only rises. The first path alternates, so the rule wins every step it holds. The second path does not, so the rule loses every step. Both results are arithmetic. Neither is a reason to buy a dip, sell a rally, or treat 35 as a special number.

The decision clock is the same one used throughout the atlas. A feature dated $t$ may use prices up to the close of $t$, and it earns the return that happens after $t$. The product of a signal with the return that was already used to build the signal is a different, and usually illegal, object. For a reversal sign that object is not even flattering: it is a loss on every nonzero bar. The bias of a bad clock depends on the sign of the rule.

## Two horizons, two claims

Narasimhan Jegadeesh, in the *Journal of Finance* in 1990, and Bruce Lehmann, in the *Quarterly Journal of Economics* in the same year, documented negative autocorrelation in individual US stock returns at horizons of about a week to a month. Recent losers, as a group, tended to do better over the next short window than recent winners. That is a statement about a cross-section of stocks and about a short holding period, before one has named a universe, a lag, a cost, or a threshold. The cross-sectional ranking is built properly in [[reversion/cross-sectional-reversal]]. Here the object is the time-series shadow of the same idea: an asset's own recent return, and the return that comes next.

James Poterba and Lawrence Summers, in 1988, reported evidence that stock-price innovations reverse in part over long horizons. Their horizon is measured in years. A multi-year variance comparison, or any other multi-year regression of a later return on an earlier one, can be informative about slow reversal and still say nothing about tomorrow's close. The converse is just as sharp. A negative relationship at a one-day lag, even a large one on a toy, is not evidence for the 1988 claim.

The two claims can both be true, both be false, or split, because they are statements about different pairs of windows. [[statistics/moments-and-dependence]] already separates lag 1 from longer lags: positive autocorrelation at one lag is the statistical shadow of a trend hypothesis, and negative autocorrelation at another lag is the shadow of reversal. [[trend/the-trend-hypothesis]] owns the intermediate-horizon sign rule, the one that bets continuation rather than a give-back. Putting that rule and a one-day reversal rule on the same path is a useful contrast. Calling them one phenomenon is not.

:::definition Short-horizon reversal {#def-short}
Fix an asset and a horizon of $h$ steps, with $h$ small — in the 1990 papers, on the order of a week to a month. **Short-horizon reversal** is the hypothesis that the asset's simple return over the next $h$ steps is negatively related to its simple return over the $h$ steps just ended. The returns are measured on a stated price, usually a close, and the second window starts only when the first window is already known. The hypothesis does not name a numerical entry level.
:::

:::definition Multi-year mean reversion {#def-years}
**Multi-year mean reversion**, in the sense of Poterba and Summers (1988), is a claim about a horizon $H$ measured in years: that a price innovation over a window of length about $H$ is, on average in the historical cross-section or index they studied, partly undone over a later window of similar length. It is a claim about that pair of long windows. It is not a claim about the sign of the next daily return, and it does not imply an oscillator threshold.
:::

A negative sample correlation is not yet either definition. Correlation is a number computed on a sample. The hypothesis is a claim about a conditional relationship that might fail on the next sample, at a different horizon, or once costs are charged. On seven returns the sample correlation is mostly a description of those seven returns.

:::quiz
Which pairing of claim and horizon matches the papers named in this chapter?
- [ ] Jegadeesh (1990) is a multi-year variance claim, and Poterba and Summers (1988) is a one-day oscillator.
- [x] Jegadeesh (1990) and Lehmann (1990) are short-horizon results, and Poterba and Summers (1988) is a multi-year claim.
- [ ] All three papers are statements about an RSI threshold of 35.
- [ ] Lehmann (1990) is a trend-following rule at a one-year horizon.
:::solution
Jegadeesh and Lehmann studied negative autocorrelation in individual stocks over roughly a week to a month. Poterba and Summers studied partial reversal of price innovations over horizons of years. An oscillator level appears in neither claim.
:::
:::

## The legal one-day position

Let $P_t$ be the close on date $t$, and let $R_t = P_t/P_{t-1} - 1$ be the close-to-close **simple return** ending on date $t$. The one-day case of [[#def-short]] takes $h = 1$. The information available at the close of $t$ includes $R_t$ and excludes $R_{t+1}$.

:::definition Legal one-day reversal position {#def-legal}
If $R_t \neq 0$, the **legal one-day reversal position** known at the close of date $t$ is
$$
s_t = -\mathrm{sign}(R_t) \in \{-1,+1\}.
$$
Its simple profit on the next step is the product $s_t R_{t+1}$. If $R_t = 0$, set $s_t = 0$. The position is a signal, not a weight, until a map from $s_t$ to a fraction of net asset value is stated. In the examples that map is the identity: the book is fully long, fully short, or flat.
:::

The same-bar product $s_t R_t = -\lvert R_t\rvert$ uses the return that has already happened. It is not the profit of a position that could have been held through $R_t$, because choosing $-\mathrm{sign}(R_t)$ requires $R_t$. [[markets/systematic-question]] and [[backtesting/timing-costs-and-biases]] keep this clock. For a continuation rule the illegal same-bar product is $+\lvert R_t\rvert$, which flatters the story. For reversal it does the opposite: every nonzero bar contributes a loss. A corrupt clock is not a machine that always improves the number you hope to publish. It is a machine that answers a different question.

:::proposition Opposite signs pay the reversal position {#prop-signs}
Let $R_t$ and $R_{t+1}$ be nonzero. With $s_t = -\mathrm{sign}(R_t)$, the product $s_t R_{t+1}$ is strictly positive if and only if $R_t$ and $R_{t+1}$ have opposite signs, and strictly negative if and only if they have the same sign.
:::

:::proof
Since $R_t \neq 0$, the position is $-1$ when $R_t > 0$ and $+1$ when $R_t < 0$. In the first case $s_t R_{t+1} = -R_{t+1}$, which is positive exactly when $R_{t+1} < 0$. In the second case $s_t R_{t+1} = R_{t+1}$, which is positive exactly when $R_{t+1} > 0$. Those two situations are the ways for the signs to differ. If the signs agree, the same two lines show that the product is negative. The hypothesis excludes a zero return. A zero factor makes the product zero regardless of the other sign, so the strict claim really does need both returns to be nonzero.
:::

[[#prop-signs]] is an identity, not a market. It says when this particular position makes money on the next step. It does not say that the next step will have the opposite sign. Path A is a case where the identity fires in favour of the rule on every held step, because the path was built as an alternation. A monotone path is a case where it fires against the rule on every held step.

:::warning A negative correlation is not a threshold
Nothing in [[#def-short]], [[#def-years]], or [[#prop-signs]] produces the number 35, or 30, or 70. Those integers show up as parameters of oscillator rules in the next chapter. An average historical relationship, even one reported in a journal, does not become an entry level by being repeated often enough. If you change 35 to 30 you have written a different rule, and you owe that rule its own experiment.
:::

## Path A, where the toy alternates

Path A is the price series used across the atlas:

$$
P = (100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110),
$$

labelled as dates $0$ through $7$. The seven simple returns, already computed to six decimal places in the performance course, are

$$
\begin{align*}
R_1 &= 0.020000, & R_2 &= -0.009804, & R_3 &= 0.029703,\\
R_4 &= -0.009615, & R_5 &= 0.038835, & R_6 &= -0.009346,\\
R_7 &= 0.037736.
\end{align*}
$$

After $R_1$, the signs alternate: plus, minus, plus, minus, plus, minus, plus. The legal reversal position can first be set at the close of date $1$, and the last return it can earn inside this series is $R_7$. That is six held steps, not seven. The missing step is the price of the lag.

:::example Six legal steps on Path A {#ex-path-a}
Using the six-decimal returns above, list $s_t$, the return it earns, and the simple profit $s_t R_{t+1}$ for $t = 1,\ldots,6$. Then compute the compound growth of a book that starts at unit net asset value and applies these profits in order, with no costs.
:::solution
[[#prop-signs]] applies at each step because every return is nonzero and, from $R_1$ onward, consecutive signs differ. The products are therefore the absolute values of $R_2,\ldots,R_7$:

| Date $t$ | $R_t$ | $s_t$ | Earns | Profit |
|---|---|---|---|---|
| 1 | $+0.020000$ | $-1$ | $R_2$ | $0.009804$ |
| 2 | $-0.009804$ | $+1$ | $R_3$ | $0.029703$ |
| 3 | $+0.029703$ | $-1$ | $R_4$ | $0.009615$ |
| 4 | $-0.009615$ | $+1$ | $R_5$ | $0.038835$ |
| 5 | $+0.038835$ | $-1$ | $R_6$ | $0.009346$ |
| 6 | $-0.009346$ | $+1$ | $R_7$ | $0.037736$ |

The terminal wealth is the product
$$
1.009804 \times 1.029703 \times 1.009615 \times 1.038835 \times 1.009346 \times 1.037736 = 1.142295,
$$
so the compound simple return is $0.142295$, or $0.1423$ to four decimal places. The sum of the six profits is $0.135039$, which is smaller. Adding simple returns is not compounding; [[performance/simple-and-log-returns]] keeps that distinction. Every held step won, so on the unit "one step of this book" the win rate is $6/6$ and the profit factor is infinite, because the gross loss is zero. [[performance/win-rate-and-profit-factor]] is where those ratios are defined. On this path they record the alternation, and they are not a track record.
:::
:::

The time-series momentum position of the trend course is $+\mathrm{sign}(R_t)$, held through $R_{t+1}$. On each row of the table its profit is the negative of the reversal profit. The two rules cannot both make money on the same step of the same asset. That is [[#prop-signs]] again, read in the other direction. It does not say which sign the next unseen return will have. It says the two stories are opposite bets at this one-day horizon. At a monthly horizon, or a yearly one, they need not be opposite at all, because "the previous return" would be a different object.

:::example The same-bar product on Path A {#ex-illegal}
Replace each legal profit $s_t R_{t+1}$ by the same-bar product $-\lvert R_t\rvert$, for all seven returns, and compute the compound growth.
:::solution
The seven products are $-0.020000$, $-0.009804$, $-0.029703$, $-0.009615$, $-0.038835$, $-0.009346$, $-0.037736$. Every term is a loss. The terminal wealth factor is the product of one plus each of those numbers, which equals $0.854418$, so the compound return is $-0.145582$. The illegal clock made the reversal story look hopeless. That is still not evidence about reversal. It is evidence that the product used a return the signal was not allowed to see in advance, and that for this sign the mistake points down rather than up.
:::
:::

:::example A path that only rises {#ex-mono}
Take the invented closes $100, 101, 103, 106, 110$. Compute the simple returns to six decimal places, apply [[#def-legal]], and report the three profits and the compound return.
:::solution
The returns are
$$
R_1 = 0.010000,\quad R_2 = 0.019802,\quad R_3 = 0.029126,\quad R_4 = 0.037736.
$$
All four signs are positive, so [[#prop-signs]] says each reversal profit is negative. The position is $-1$ at the end of dates $1$, $2$, and $3$, and the profits are $-0.019802$, $-0.029126$, and $-0.037736$. Terminal wealth is
$$
0.980198 \times 0.970874 \times 0.962264 = 0.915737,
$$
so the compound return is $-0.084263$. The same identity that paid $0.1423$ on Path A takes $0.0843$ away on a path with no down step. A researcher who keeps only the first path has not tested the rule. They have displayed the alternation.
:::
:::

:::example One unit of cost on each unit of turnover {#ex-cost}
Start from flat. Charge a one-way cost of $c = 0.001$ of net asset value per unit of absolute weight change, paid when the position is set, and do not flatten at the end. Using the six profits in [[#ex-path-a]], compute turnover and the net compound return.
:::solution
The positions through the six steps are $-1,+1,-1,+1,-1,+1$. From flat, the absolute weight changes are $1, 2, 2, 2, 2, 2$, and they sum to $11$. Each flip between fully long and fully short trades two units of notional, not one. Net profits are the gross profits minus $0.001$ times those changes:
$$
0.008804,\ 0.027703,\ 0.007615,\ 0.036835,\ 0.007346,\ 0.035736.
$$
The product of one plus each net profit is $1.130073$, so the net compound return is $0.1301$ to four decimal places, against $0.1423$ gross. The cost did not flip the sign of this particular toy, because every gross profit was larger than the charge. That is a statement about these six numbers and this $c$, not a claim that reversal survives costs in a market. A final flatten, had we required one, would trade one further unit and charge another $0.001$.
:::
:::

:::intuition What the alternation is doing
Path A steps up, down, up, down, and the up steps are larger than the down steps, which is why the price ends at $110$ rather than back at $100$. A reversal position is long the up steps and short the down steps, once the lag has thrown the first up step away. It is being paid by the zigzag, not by a discovered tendency of markets. Change the zigzag and, as in [[#ex-mono]], the payments reverse.
:::

## What a large correlation on seven points is worth

The lag-1 sample correlation of Path A's seven simple returns, using the six consecutive pairs and the usual Pearson formula, is $-0.9534$ to four decimal places. The sign agrees with reversal. The magnitude is what a nearly perfect alternation looks like when you only have six pairs. It is not a precise estimate of a population autocorrelation, and it is not a standard error. [[performance/uncertainty-of-performance]] is where a short sample gets an interval; this chapter only needs the warning that six pairs cannot carry one.

A negative lag-1 correlation can also be manufactured by the bid-ask bounce without any give-back in the efficient price. If one trade prints at the ask and the next is more likely to print at the bid, the change in recorded price is negative autocorrelation of a mechanical kind. At a one-day horizon, in individual stocks, that mechanism is a serious rival to "the move went too far". Weekly and monthly horizons are less automatic. Naming the rival is not the same as measuring how much of the 1990 evidence it explains. This atlas does not re-estimate those papers.

What would count against [[#def-short]], as a research hypothesis, is concrete. The negative relationship can fail on a later sample that was not used to notice it. It can be present in the middle of the spread and absent in the return a trader can actually lock in. It can be smaller than the costs of turning the book over, which [[#ex-cost]] only illustrates. It can be real at a monthly horizon and absent at a daily one, or the other way round. None of those failures is repaired by moving a threshold from 35 to 30.

:::widget distribution
dist: normal
params: mu=0, sigma=0.02
a: -0.01
b: 0.01
caption: An unconditional sketch of a daily simple return. The shaded band is a choice of a and b, not a reversal signal. Nothing on the curve nominates an oscillator level, and the curve is not the conditional distribution of the next return given the last one.
:::

The figure is deliberately not a price forecast. Widening the shaded band does not tell you to trade. It shows that "large move" is a cut you chose.

:::quiz
The legal profit of $s_t = -\mathrm{sign}(R_t)$ is which product?
- [ ] $s_t R_t$, because the signal and the return should share a date.
- [x] $s_t R_{t+1}$, because the signal may use only what is known at $t$.
- [ ] $\lvert R_{t+1}\rvert$, always, because reversal wins by definition.
- [ ] $R_t + R_{t+1}$, because simple returns add over two days.
:::solution
[[#def-legal]] dates the signal at $t$ and the return at $t+1$. The absolute return $\lvert R_{t+1}\rvert$ equals the profit only when the signs happen to oppose, which is the conclusion of [[#prop-signs]], not a definition. Simple returns do not add to a compound return.
:::
:::

:::remark What this chapter is refusing to do
There is no catalogue backtest in this chapter. The published rows that use an RSI threshold of 35, a band, a pair, or a trailing stop are read in the later chapters, from the library, as reported experiments. They are not implied by Jegadeesh, Lehmann, or Poterba and Summers. A loss among those rows would not mean "take the other side", and a gain would not mean "use the threshold". The hypothesis here is a sign relationship at a named horizon. A trading rule is a much longer sentence.
:::

:::history
In 1990 Narasimhan Jegadeesh, and separately Bruce Lehmann, documented negative autocorrelation in individual US stock returns at horizons of a week to a month. In 1988 James Poterba and Lawrence Summers reported evidence that stock-price innovations reverse in part over long horizons, measured in years rather than in the few days of an oscillator rule. The shared word "reversion" is not a shared clock.
:::

## Where this leads

The next chapter turns the idea into two explicit formulas, Wilder's relative strength index and a Bollinger band, and reads three catalogue experiments that use thresholds rather than a sign. The ranking version of the 1990 claim is [[reversion/cross-sectional-reversal]]. The dependence behind the sign sits in [[statistics/moments-and-dependence]], and the reason a same-bar product is not a backtest sits in [[backtesting/timing-costs-and-biases]].

:::summary
- Short-horizon reversal, as in Jegadeesh (1990) and Lehmann (1990), is a negative relationship at a horizon of about a week to a month. Poterba and Summers (1988) is a multi-year claim. The horizons do not substitute for each other.
- The legal one-day position is $s_t = -\mathrm{sign}(R_t)$, and it earns $R_{t+1}$. The same-bar product $-\lvert R_t\rvert$ is a different object and, here, a loss on every nonzero bar.
- If both returns are nonzero, that position makes money on the next step if and only if the two signs differ. This is an identity.
- On Path A the six legal profits are all positive and the compound return is $0.1423$ to four decimal places, because the toy alternates. On $100, 101, 103, 106, 110$ the same rule compounds to $-0.0843$.
- A one-way cost of $0.001$ on Path A's reversals cuts the compound return from $0.1423$ to $0.1301$. Surviving this particular cost is not a market result.
- The lag-1 correlation of Path A's returns is about $-0.95$ on six pairs. That describes the alternation. It does not justify a threshold of 35, and a bid-ask bounce can imitate the sign at a very short horizon.
- A win rate of $6/6$ and an infinite profit factor, on this toy, record the absence of a losing step. They are not a performance claim.
:::

## Exercises

:::exercise One step, both signs known {level=1 check="0.01"}
Suppose $R_t = 0.02$ and $R_{t+1} = -0.01$, both already on the page so that you can do the arithmetic. What is the legal simple profit of the one-day reversal position? (Enter the profit.)
:::solution
The position is $s_t = -\mathrm{sign}(0.02) = -1$. The profit is $-1 \times (-0.01) = 0.01$. The signs differ, so [[#prop-signs]] already required a positive profit. The same-bar product would have been $-0.02$, and it is not the answer.
:::
:::

:::exercise A zero return {level=1 check="0"}
Suppose $R_t = 0$ and $R_{t+1} = 0.04$. Under [[#def-legal]], what is the simple profit? (Enter the profit.)
:::solution
A zero return sets $s_t = 0$. The profit is $0 \times 0.04 = 0$. [[#prop-signs]] does not apply, because $R_t$ is zero. Flat is not a quiet long.
:::
:::

:::exercise Two gross profits, one compound {level=1 check="0.0302"}
A reversal book has two successive simple profits, $0.01$ and $0.02$, and no costs. What is the compound return? (Enter the compound return.)
:::solution
Terminal wealth is $1.01 \times 1.02 = 1.0302$, so the compound return is $0.0302$. The sum of the simple profits is $0.03$, which is a different number. Use the product whenever the question says compound.
:::
:::

:::exercise Read a position off a sign {level=2}
Prices are $50, 49, 51$ on dates $0, 1, 2$. Compute $R_1$ and $R_2$ as exact fractions, the legal position at the close of date $1$, and the simple profit on date $2$.
:::solution
$R_1 = 49/50 - 1 = -1/50 = -0.02$. $R_2 = 51/49 - 1 = 2/49$, which is about $0.040816$. The position at date $1$ is $s_1 = -\mathrm{sign}(-0.02) = +1$. The profit is $2/49$, about $0.040816$. There is no position through $R_1$, because nothing earlier set one. One winning step is not a test of [[#def-short]].
:::
:::

:::exercise Which clock produced the loss? {level=2}
Someone reports that a "one-day reversal" on Path A lost money in every period, with profits equal to the negatives of the seven simple returns. Which product did they compute, and what does the loss say about [[#def-short]]?
:::solution
They computed $-\lvert R_t\rvert$ for each $t$, the same-bar product in [[#ex-illegal]], whose compound return on the six-decimal series is $-0.145582$. That product is negative whenever the return is nonzero, by algebra, with no reference to the next bar. It says nothing about [[#def-short]], which concerns $R_{t+1}$, and nothing about Path A's legal book, which compounded to $0.1423$. A loss from an illegal clock is not a falsification, and it is also not a backtest.
:::
:::

:::exercise Turnover of an alternating book {level=2 check="11"}
A book starts flat. It then holds a position of absolute value $1$ for $m = 6$ steps, and the sign flips at every step. Absolute weight changes are $1$ on entry and $2$ on each later flip. There is no final flatten. What is total turnover? (Enter the total turnover.)
:::solution
Entry contributes $1$. Each of the other $5$ steps flips the sign and contributes $2$. The total is $1 + 2 \times 5 = 11$, which is the turnover charged in [[#ex-cost]]. In general, before any final flatten, the total is $1 + 2(m-1) = 2m - 1$. For $m = 6$ that is $11$.
:::
:::

:::exercise Why the monotone path cannot win a step {level=3}
Using only [[#prop-signs]], explain why the reversal position on closes $100, 101, 103, 106, 110$ cannot have a positive simple profit on any held step. You do not need to recompute the three profits if you first establish the signs.
:::hint
Write the sign of each simple return without calculating its magnitude. The position is known one close before the return it earns.
:::
:::solution
Each close is strictly above the previous close, so $R_1, R_2, R_3, R_4$ are all positive. The held steps use pairs $(R_1, R_2)$, $(R_2, R_3)$, and $(R_3, R_4)$. In every pair the two signs agree, and neither return is zero. [[#prop-signs]] then says each product $s_t R_{t+1}$ is strictly negative. The compound return has to be negative as well, because it is the product of factors that are each below one, but the question only asked for the step-by-step sign.
:::
:::

:::exercise A cost that does flip the toy {level=3}
Take a single legal reversal step with gross simple profit $0.009804$, as on the first held step of Path A. The position moves from flat to a weight of absolute value $1$, so turnover is $1$. Find the smallest one-way cost $c$, charged as $c$ times turnover, that makes this step's net profit exactly zero. Then say, in a sentence, why that break-even $c$ is not a trading recommendation.
:::hint
Net profit is gross profit minus $c$ times the absolute weight change. Set that equal to zero. The weight change on entry from flat has absolute value $1$, not $2$.
:::
:::solution
Net profit is $0.009804 - c \times 1$. This is zero at $c = 0.009804$. Any larger one-way cost makes the step a loss. The number is the size of this particular gross profit, so it moves as soon as the return moves. It is a break-even calculation on one invented step, not a cost you should demand from a broker and not a rule for the other five steps. Those steps have different gross profits, and a flip, unlike this entry, has turnover $2$, so the break-even cost per unit of turnover would be half the gross profit on those steps.
:::
:::
