Reversal need not be a bet on one asset's own past. It can be a ranking. At a formation date you sort a universe by a recent return, buy the names that did worst, and sell the names that did best, with weights written down before the holding return exists. That is the portfolio shape of the short-horizon evidence in [[reversion/the-reversion-hypothesis]]: Jegadeesh in 1990 and Lehmann in 1990 were comparing groups of stocks, not pressing a threshold on a single oscillator. The one-day sign rule on Path A is the time-series special case, one name, horizon of one step. The book in this chapter has more than one name, and the horizon in the worked example is a month because that is long enough to rank and short enough not to be the multi-year claim.

A ranking is not yet a weight. "Long the losers" still needs a count of names, a gross exposure, and a decision about the middle of the list. The smallest book that has both a long loser and a short winner uses one name on each side. This chapter uses that smallest book so the arithmetic stays visible. A wider leg is a different map, and [[portfolio/from-signal-to-weight]] is where maps are compared. Nothing here recommends a universe, a monthly sort, or the catalogue's weekly loser-minus-winner row as a book to hold.

## Rank, then wait

Let names be indexed by $i$, and let $R^{\mathrm{f}}_{i}$ be a **formation return**: a simple return over a window that has already closed. Let $R^{\mathrm{h}}_{i}$ be the **holding return** over a later window. The formation return is allowed to choose the weight. The holding return is what the weight earns. Using $R^{\mathrm{f}}_{i}$ as if it were the profit of the book that was built from $R^{\mathrm{f}}_{i}$ is a same-window mistake. It is not a small off-by-one. For this particular ranking it has a sign you can prove before seeing any prices.

:::definition Cross-sectional reversal book {#def-xs}
At a formation date, rank a stated universe by formation return, lowest to highest. A **cross-sectional reversal book** is long a stated set of names at the bottom of that ranking and short a stated set at the top, with weights $w_i$ known at the formation date. In the two-name convention used for every numerical example below, the worst name receives $w = +1/2$, the best name receives $w = -1/2$, and every other name receives $0$. The net weight is $0$ and the gross weight is $1$. The book's simple return over the holding window is $\sum_i w_i R^{\mathrm{h}}_i$. Replacing $+1/2$ and $-1/2$ by any other scale is a different gross exposure. Including a third name is a different book.
:::

:::definition Formation date and holding date {#def-clock}
The **formation date** is the last date whose price enters $R^{\mathrm{f}}_i$. The **holding date** is later. Weights are a function of information available at the formation date, and the simple return they multiply is $R^{\mathrm{h}}_i$, which uses prices strictly after the formation date. A backtest that multiplies $w_i$ by $R^{\mathrm{f}}_i$ has used the ranking return as the profit. Call that product the **same-window return**. It is not the return of [[#def-xs]].
:::

The two-name convention is deliberate and narrow. Equal weights of $+1/2$ and $-1/2$ make the net zero and the gross one, so the book is dollar-neutral and not levered on a gross basis. Dollar-neutral here means the weights sum to zero. It does not mean the book is free of risk, and it does not mean the two names hedge each other in the sense of [[reversion/pairs-and-spreads]]. No regression was run. The names are paired only by their ranks.

:::proposition Two-name holding return {#prop-book}
Under [[#def-xs]], with the worst name $L$ and the best name $W$ distinct, the net weight is $0$, the gross weight is $1$, and the holding return is
$$
R_{\mathrm{book}} = \frac{1}{2}\big(R^{\mathrm{h}}_L - R^{\mathrm{h}}_W\big).
$$
The same-window return, which replaces holding returns by formation returns, equals $\tfrac12\big(R^{\mathrm{f}}_L - R^{\mathrm{f}}_W\big)$ and is strictly negative whenever $R^{\mathrm{f}}_L \neq R^{\mathrm{f}}_W$.
:::

:::proof
The weights are $+1/2$ on $L$, $-1/2$ on $W$, and $0$ elsewhere. They sum to $0$, and the sum of absolute weights is $1$. The holding return collapses to
$$
\tfrac12 R^{\mathrm{h}}_L + \big(-\tfrac12\big) R^{\mathrm{h}}_W = \tfrac12\big(R^{\mathrm{h}}_L - R^{\mathrm{h}}_W\big).
$$
The same algebra with formation returns gives $\tfrac12\big(R^{\mathrm{f}}_L - R^{\mathrm{f}}_W\big)$. By the ranking, $L$ has the lowest formation return and $W$ the highest, so $R^{\mathrm{f}}_L \le R^{\mathrm{f}}_W$. If the two differ, the difference is negative and so is the same-window return. The inequality uses only the definition of best and worst. It does not use the holding window, and it does not say whether $R^{\mathrm{h}}_L$ will exceed $R^{\mathrm{h}}_W$.
:::

[[#prop-book]] is why a careless backtest of cross-sectional reversal looks systematically bad, which is the opposite of the usual look-ahead flattery. The illegal product is negative whenever the extreme names disagree. A negative same-window number is not evidence against the hypothesis. A positive holding-window number on three invented names is not evidence for it. The legal object is the later window, and one later window is an anecdote.

:::example Three names, one legal month {#ex-legal}
Formation-month simple returns are $A: +0.05$, $B: +0.01$, $C: -0.04$. Holding-month simple returns, invented and not used in the rank, are $A: -0.02$, $B: +0.03$, $C: +0.04$. Apply [[#def-xs]] and compute the holding return.
:::solution
The lowest formation return is $C$ at $-0.04$. The highest is $A$ at $+0.05$. The middle name $B$ is flat. Weights are $w_A = -1/2$, $w_B = 0$, $w_C = +1/2$. Net weight $0$, gross weight $1$. Do not put the formation return $-0.04$ into the profit. The holding return uses the later numbers only:
$$
R_{\mathrm{book}} = \tfrac12\big(0.04 - (-0.02)\big) = \tfrac12 \times 0.06 = 0.03.
$$
Directly: $(-1/2)(-0.02) + (1/2)(0.04) = 0.01 + 0.02 = 0.03$. Name $B$'s holding return of $+0.03$ does not enter. A rule that gave $B$ a nonzero weight would be a different map, even with the same ranking. The profit $0.03$ is the return of this weight vector on this invented month. It is not a forecast of the next month, and it is not a reason to sort a real universe this way.
:::
:::

:::example The same month, scored as if it were profit {#ex-same}
Using only the formation returns of [[#ex-legal]], compute the same-window return of the weights in that example.
:::solution
[[#prop-book]] gives
$$
\tfrac12\big(R^{\mathrm{f}}_C - R^{\mathrm{f}}_A\big) = \tfrac12\big(-0.04 - 0.05\big) = \tfrac12 \times (-0.09) = -0.045.
$$
The book is long the name that just fell and short the name that just rose, and then it is scored on those same moves. The result is negative because the ranking was defined that way, not because the next month was hostile. Comparing $-0.045$ with the legal $0.03$ is a comparison of two different products. Only one of them is a holding return. A researcher who averages a panel of same-window returns will report a negative "reversal premium" that the algebra forces. That report is a bug, not a discovery.
:::
:::

:::example When the losers do not bounce {#ex-continue}
Keep the formation returns and the weights of [[#ex-legal]], but replace the holding month by $A: +0.06$, $B: +0.01$, $C: -0.03$. Compute the holding return.
:::solution
The weights do not change, because the formation returns did not change. [[#prop-book]] gives
$$
R_{\mathrm{book}} = \tfrac12\big(-0.03 - 0.06\big) = -0.045.
$$
The worst formation name kept falling, and the best kept rising. The reversal book loses $0.045$ in the holding month. The short-horizon hypothesis in [[reversion/the-reversion-hypothesis]] is a claim about an average relationship, not a claim that every holding window cooperates. One losing month does not refute the hypothesis, and one winning month does not confirm it. A test would name the universe, the number of months, the costs, and the statistic before seeing this particular triple of numbers. These numbers were chosen so that both signs are easy to compute.
:::
:::

:::example A profit factor of one, and a loss {#ex-pf}
A book has two successive simple returns, $+0.10$ and $-0.10$. The profit factor on the unit "one period" is the gross gain divided by the absolute gross loss. Compute that ratio, the sum of the simple returns, and the compound return.
:::solution
Gross gain is $0.10$ and absolute gross loss is $0.10$, so the profit factor is $1$. The sum of the simple returns is $0$. The compound return is $1.10 \times 0.90 - 1 = -0.01$. A ratio of $1$ says the positives and the negatives add to zero on the chosen unit. Compounding multiplies, and $1.10 \times 0.90$ is below $1$ because the loss acts on a larger base than the gain started from. This is the whole content of the example. It does not say that any catalogue profit factor was produced by a two-period path of this shape. It says a profit factor of $1$ and a negative compound return can sit in the same dashboard without either cell being a typo. [[performance/win-rate-and-profit-factor]] defines the ratio. [[performance/simple-and-log-returns]] is why the sum and the product disagree.
:::
:::

:::widget plot
f: 0.05-0.045*x
x: 0, 2
points: 0,0.05; 1,0.01; 2,-0.04
caption: Three formation-month returns, worst at the right. The reversal book of this chapter is long the low point and short the high point, and it earns a later month that is not on the figure. The line is a visual guide, not a fit and not a forecast.
:::

## What a weekly catalogue row can and cannot show

The figures in this section are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtest. The reported Sharpe is their number. We do not know their risk-free rate or their annualisation.

W16, "Cross Sectional Reversal", is described as long losers and short winners by a one-month return, rebalanced weekly, on daily bars over 26 years. The catalogue reports a total return of $-1.7\%$, a CAGR of $-0.07\%$, a Sharpe of $-0.24$, a maximum drawdown of $-33.7\%$, a win rate of $47.5\%$, and a profit factor of $1.00$.

Read the row from the outside, which is the only view we have. The total return is slightly negative. The CAGR is close to zero and on the same side. The drawdown is not close to zero: $-33.7\%$ is a deep peak-to-trough on the reported equity path. The win rate is a little under one half, on a unit the line does not define. The profit factor is reported as $1.00$.

A profit factor of $1.00$, to the printed precision, means that on whatever unit the catalogue summed, the gross positive piece and the absolute gross negative piece matched. [[#ex-pf]] shows how that match can coexist with a negative compound return: the sum of the pieces can be about zero while the product of the gross factors is not. Costs can also land in the net-asset-value path without landing in the ratio in the same way, and $1.00$ itself may be a rounded value rather than an exact $1$. We cannot see the unit, the rounding, or the cost convention. We can see that the dashboard does not say "gross gains exceeded gross losses". It says they matched at the printed precision, and that the compound path still finished down $1.7\%$ over 26 years, with a drawdown of $33.7\%$ along the way.

What we cannot conclude is that the rule "almost worked", or that the other side would have made $+1.7\%$. Flipping every weight changes the sign of the gross return only in a world without costs, without borrow, and without a short leg that is not the negative of the long leg. W16's rebalance is weekly and its formation window is one month. Those two clocks are part of the specification. Our toy is one formation month and one holding month, closer in shape to a single step of the 1990 horizon than to a weekly book. It is a different experiment from W16. The toy's $+0.03$ does not repair the catalogue's $-1.7\%$, and the catalogue's $-1.7\%$ does not condemn the toy's arithmetic.

The sign-flipped book — long the winners, short the losers — is a momentum ranking, not a free profit extracted from W16. The momentum course owns that family of rules, at its own horizons. This chapter does not quote those rows and does not treat W16's loss as their gain. A published loss is evidence about the rule that was run, in the sample that was used. It is not an order to trade the opposite weights. [[momentum/momentum-crashes]] is where a winner-minus-loser book shows a left tail in particular episodes. A reversal book is the negative of that payoff only when the weights really are the negative, the costs match, and the episode is the same episode. Identity of sign is not a timing rule.

Re-ranking has to be said out loud, because a second month is not a second use of the first weights unless the rule freezes them.

:::example The next formation is a new rank {#ex-rerank}
After the legal holding month in [[#ex-legal]], the returns just realised are $A: -0.02$, $B: +0.03$, $C: +0.04$. Treat those as the new formation returns. A further invented month then prints $A: +0.01$, $B: 0$, $C: +0.02$. Compute the new weights, the new holding return, and the compound return of the two legal months in sequence.
:::solution
The new worst name is $A$ at $-0.02$. The new best name is $C$ at $+0.04$. Weights become $w_A = +1/2$, $w_C = -1/2$, $w_B = 0$. These are not the previous weights. The new holding return is
$$
\tfrac12\big(0.01 - 0.02\big) = -0.005.
$$
The first legal month returned $+0.03$. Compounded,
$$
1.03 \times (1 - 0.005) - 1 = 1.03 \times 0.995 - 1 = 0.02485.
$$
The sum of the two simple returns is $0.025$, which is not the compound. Freezing the original weights into the second month would have earned, on the new holding returns, $\tfrac12(0.02 - 0.01) = 0.005$ instead of $-0.005$. Freezing is a different rule: it skips the re-rank that [[#def-xs]] requires at each formation date. W16's weekly rebalance is a refusal to freeze, on a clock this two-month story does not copy.
:::
:::

:::intuition The middle name is a decision
$B$ returned $+0.01$ in formation and $+0.03$ in the first holding month, and the two-name book ignored both. That is not because $B$ is uninteresting. It is because [[#def-xs]] set the middle weight to zero. A book that goes long the bottom third and short the top third would have had to say which third $B$ falls into, and with three names the thirds are the three names. The convention "only the extremes" is the whole weight map. Changing it changes the experiment as surely as changing the horizon.
:::

:::warning Do not read $-1.7\%$ as a prompt
W16's reported total return is negative. The other side of a loser-minus-winner sort is a winner-minus-loser sort. Taking that other side because the published number is negative skips costs, skips the difference between a weekly one-month rank and any other momentum rule, and treats one catalogue row as if its sign were a signal. [[#prop-book]] already showed a sign that is forced by algebra, the same-window sign. The holding-window sign is not forced. A negative holding-window result in a published sample is a result about that sample. It is not a new formation return for the reader to rank.
:::

:::quiz
Under the two-name convention, which product is the holding return?
- [ ] $\tfrac12\big(R^{\mathrm{f}}_L - R^{\mathrm{f}}_W\big)$, because the formation returns are the ones you know.
- [x] $\tfrac12\big(R^{\mathrm{h}}_L - R^{\mathrm{h}}_W\big)$, with weights chosen from the formation ranking.
- [ ] $R^{\mathrm{h}}_L - R^{\mathrm{h}}_W$, because equal weight means weight $1$ on each leg.
- [ ] The formation return of the middle name, because the extremes cancel.
:::solution
[[#prop-book]] puts weight $+1/2$ and $-1/2$ on the holding returns of the worst and best formation names. The same-window product is a different, and systematically negative, object. Weight $1$ on each leg would make the gross weight $2$, which is not the convention in [[#def-xs]].
:::
:::

:::quiz
A profit factor of $1$ on period returns implies which of the following?
- [ ] The compound return is zero.
- [ ] The compound return is positive, because wins and losses balanced.
- [x] The sum of the period profits on that unit is zero, if the ratio is exact. The compound return can still be negative.
- [ ] The maximum drawdown is zero.
:::solution
Profit factor $1$ means gross gains equal absolute gross losses, so the pieces sum to zero. [[#ex-pf]] has period returns $+0.10$ and $-0.10$, profit factor $1$, and compound return $-0.01$. Drawdown is a path property, not a consequence of the ratio alone.
:::
:::

:::history
The cross-sectional form of short-horizon reversal is the 1990 evidence. Narasimhan Jegadeesh ranked individual stocks by a recent return and documented that recent losers tended to outperform recent winners over the next short window, and Bruce Lehmann reported a weekly companion to that ranking. The horizon in those papers is about a week to a month. It is not the multi-year claim James Poterba and Lawrence Summers published in 1988, and it is not an oscillator threshold.
:::

## Where this leads

[[reversion/when-reversion-fails]] is where a reversal entry meets a path that does not turn around, and where an exit rule accounts for a published loss. The time-series sign on a single name stays in [[reversion/the-reversion-hypothesis]]. A winner-minus-loser ranking, which is the sign flip of this chapter's book only under a matching specification, is the subject of [[momentum/two-kinds-of-momentum]], and the episodes in which that flip hurts are [[momentum/momentum-crashes]]. Weights beyond $\pm 1/2$ are [[portfolio/from-signal-to-weight]] and [[portfolio/long-only-and-neutral]].

:::summary
- A cross-sectional reversal book ranks names by a formation return and holds the resulting weights through a later return. In the two-name convention the worst name gets $+1/2$, the best gets $-1/2$, and everyone else gets $0$. Net weight $0$, gross weight $1$.
- The holding return is half the gap between the loser's later return and the winner's later return. On the worked month that is $0.03$. On a continuation month with the same weights it is $-0.045$.
- The same-window product, which scores the weights on the returns that built them, is always negative when the extreme formation returns differ. A negative number of that kind is a bug, not a test.
- Re-ranking after the first holding month changes the weights. Compounding the two legal months in the example gives $0.02485$. Freezing the old weights is a different rule.
- As reported in 2026 and not re-run here, W16 — long one-month losers, short one-month winners, weekly — has total return $-1.7\%$, CAGR $-0.07\%$, Sharpe $-0.24$, maximum drawdown $-33.7\%$, win rate $47.5\%$, and profit factor $1.00$.
- A profit factor of $1$ means the summed pieces match. It does not mean the compound return is zero. The toy $+0.10$ then $-0.10$ compounds to $-0.01$. What W16's $1.00$ counts, and whether it is rounded, is not visible from the dashboard.
- W16's loss is not an order to take the other side. The other side is a different experiment. Costs do not flip as cleanly as a minus sign.
:::

## Exercises

:::exercise Net weight {level=1 check="0"}
Under [[#def-xs]], what is the sum of the weights? (Enter the net weight.)
:::solution
$+1/2 + (-1/2) + 0 = 0$. Dollar-neutral, in the sense used here, is this sum. It is not a claim that the two names offset each other's risk.
:::
:::

:::exercise The worked holding return {level=1 check="0.03"}
Formation returns $A: +0.05$, $C: -0.04$, and holding returns $A: -0.02$, $C: +0.04$. What is the two-name reversal book's holding return? (Enter the return.)
:::solution
$C$ is worst and $A$ is best in formation. [[#prop-book]] gives $\tfrac12(0.04 - (-0.02)) = 0.03$. The formation returns do not appear in the profit. They appear only in the choice of who is long and who is short.
:::
:::

:::exercise A losing gap {level=1 check="-0.02"}
The loser, already chosen, returns $+0.01$ in the holding window. The winner returns $+0.05$. What is the book return? (Enter the return.)
:::solution
$\tfrac12(0.01 - 0.05) = \tfrac12 \times (-0.04) = -0.02$. The book is long the smaller holding return and short the larger one. The hypothesis did not promise this particular window.
:::
:::

:::exercise Same-window on the worked ranks {level=2 check="-0.045"}
Formation returns $A: +0.05$ and $C: -0.04$, with $C$ the long leg and $A$ the short leg. What is the same-window return? (Enter the return.)
:::solution
$\tfrac12(-0.04 - 0.05) = -0.045$. [[#prop-book]] says the sign is compulsory when the extremes differ. The legal holding return of [[#ex-legal]] was $+0.03$ on different numbers. Do not average $-0.045$ into a performance table for the strategy.
:::
:::

:::exercise Who is flat? {level=2}
Three formation returns are $A: -0.01$, $B: -0.04$, $C: +0.02$. State the two-name weights. Which name, if any, has a nonzero weight and a negative formation return besides the worst name?
:::solution
The worst is $B$ at $-0.04$, the best is $C$ at $+0.02$, and $A$ at $-0.01$ is the middle. Weights: $w_B = +1/2$, $w_C = -1/2$, $w_A = 0$. Name $A$ has a negative formation return and a zero weight. "Long the losers" in this convention means long the single worst name, not long every name that fell. $A$ fell and is flat. A book that was long every negative name would have held $A$ and $B$, and would have needed a new gross-weight rule. That book is not [[#def-xs]].
:::
:::

:::exercise Compound the two legal months {level=2 check="0.02485"}
Simple returns of a reversal book are $+0.03$ and then $-0.005$, in that order, matching [[#ex-rerank]]. What is the compound return? (Enter the compound return.)
:::solution
$1.03 \times 0.995 - 1 = 1.02485 - 1 = 0.02485$. The sum $0.025$ is larger. Report the product when the question says compound. Neither number is W16's reported return. W16 is a 26-year weekly experiment, not two invented months.
:::
:::

:::exercise Why the same-window sign is forced {level=3}
Prove, from the ranking alone, that the same-window return in [[#prop-book]] is strictly negative when the best and worst formation returns differ. Do not use a holding return.
:::hint
Write the same-window return as half the difference between the lowest formation return and the highest. The ranking is what "lowest" and "highest" mean.
:::
:::solution
Let $L$ be a worst name and $W$ a best name, with $R^{\mathrm{f}}_L < R^{\mathrm{f}}_W$. The same-window return is $\tfrac12(R^{\mathrm{f}}_L - R^{\mathrm{f}}_W)$. The quantity in parentheses is negative, so the whole expression is negative. If several names tie for worst or for best, the definition of [[#def-xs]] has not said which tied name is chosen; the statement assumes a distinct best and worst with different returns, which is the case [[#prop-book]] uses for the strict inequality. No price path after the formation date entered the proof. A negative same-window average across many dates is what this algebra produces in bulk. It is not a rejection of short-horizon reversal.
:::
:::

:::exercise What the dashboard withholds {level=3}
W16 reports profit factor $1.00$, total return $-1.7\%$, and maximum drawdown $-33.7\%$, as stated in the library in 2026. Using [[#ex-pf]], explain one mechanism by which a profit factor of $1$ can sit beside a negative compound return. Then name one thing you would need to see, and do not have, before treating $1.00$ as an exact match of gross gains and gross losses in W16.
:::hint
Multiply $1.10$ by $0.90$ for the mechanism. For the catalogue cell, think about rounding and about the unit being summed. Do not invent a $p$-value or a cost figure the library does not print.
:::
:::solution
If period returns are $+0.10$ and $-0.10$, the profit factor is exactly $1$ and the sum of simple returns is $0$, but the compound return is $1.10 \times 0.90 - 1 = -0.01$. The loss is applied after the gain has increased the base. That mechanism is available whenever the ratio is computed on additive pieces and the published return is a compound of gross factors. It may or may not be what happened inside W16. Before treating the printed $1.00$ as an exact equality, you would need the unrounded ratio, or the gross positive and gross negative sums themselves, and the unit those sums use (a day, a week, a trade). The catalogue prints $1.00$ and does not print those sums. The drawdown of $-33.7\%$ is compatible with a near-zero compound return over a long sample; it does not identify the unit either. None of this is a reason to run the opposite weights. The opposite weights are a new rule, and a published loss is not a signal to take them.
:::
:::
