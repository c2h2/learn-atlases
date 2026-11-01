A rule can be faithful to a reversal entry and still lose, because the path does not turn around, because the hedge used to define the spread has jumped, or because the exit is a different idea wearing the entry's name. Failure, in this chapter, means a specified rule lost money on a specified path or in a specified published sample. It does not mean the opposite rule should be run. A published loss is evidence about the combination that was tested. Taking the other side is a new combination, with its own costs and its own clock, and it is not implied by a minus sign in a table.

The entry that opens the main catalogue row below is an oversold relative-strength reading, the family defined in [[reversion/rsi-and-bands]]. The exit is a 5% trailing stop, which ratchets with a favourable extreme and does not care whether the oscillator has recovered. One half of the sentence is a reversion story. The other half is a path-dependent stop. The reported compound return of that combination is negative. The loss belongs to the combination.

## An exit that is not the entry

A trailing stop on a long position is a function of the path after entry. Let the extreme be the most favourable price seen since entry, and let the stop sit a fixed fraction below that extreme. If the price makes a new high, the stop moves up. If the price falls, the stop stays where it is. Nothing in Wilder's index, and nothing in the short-horizon hypothesis, chooses the fraction. Five percent is a parameter. So is the question of which price updates the extreme, and of what fill you take when the stop is touched.

:::definition Five-percent trailing stop on a long {#def-trail}
A long position is entered at a stated price $P_{\mathrm{in}}$. Let $M_t$ be the maximum close from the entry close through date $t$, inclusive. The **5% trailing stop** known after the close of $t$ is $0.95\, M_t$. Under the **close convention** used in the worked example, the position exits at the first close $P_t$ with $P_t \le 0.95\, M_t$, and the fill is that close, not the stop price. Under a **stop-price convention**, a touch of the stop fills at $0.95\, M_t$ when the path is assumed to trade there. The two conventions are different experiments. A gap that opens through the stop, so that the next observed price is already worse than $0.95\, M_t$, fills at the observed price under the close convention and is not entitled to the stop price.
:::

The order-mechanics course owns stops, gaps, and brackets in more detail. Here the stop is only the exit attached to a reversal entry. [[orders/trailing-brackets-and-oco]] is where a trail is compared with a bracket. This chapter's job is the interaction: an entry that wants a bounce, and an exit that will leave during a bounce if the path first goes the right way and then gives more than 5% back from its extreme.

:::example A trail on five closes {#ex-trail}
Closes are $100, 104, 110, 108, 103$. Enter long at the first close. Update a 5% trailing stop from closes only. Under the close convention, where do you exit, and what is the simple return from entry to exit? What would the simple return be under a stop-price fill at the stop that was first breached?
:::solution
After $100$, the extreme is $100$ and the stop is $95$. After $104$, the extreme is $104$ and the stop is $98.8$. After $110$, the extreme is $110$ and the stop is $0.95 \times 110 = 104.5$. After $108$, the extreme is still $110$, the stop is still $104.5$, and $108 > 104.5$, so the position is held. After $103$, the close is at or below $104.5$, so the close convention exits at $103$. The simple return from the entry close is
$$
103/100 - 1 = 0.03.
$$
The stop that was breached stood at $104.5$. A stop-price convention that filled there would have returned $104.5/100 - 1 = 0.045$. The two fills differ by $1.5$ price points on an entry of $100$, which is $0.015$ of the entry price. The path's peak close was $110$, so the give-back from the peak close to the exit close is $103/110 - 1 = -0.0636$ to four decimal places. The trail did what [[#def-trail]] says: it locked in a fraction of a favourable extreme, and the close convention then failed to achieve the stop price because the close jumped past it. Neither $0.03$ nor $0.045$ is a reason to attach a 5% trail to an oscillator. They are two fill models on one invented path.
:::
:::

:::example A gap through the stop {#ex-gap}
Continue the previous path only up through the close $108$, so the stop stands at $104.5$ and the position is still open. The next close is $100$, not $103$. Under the close convention, what is the fill, and by how many price points is it worse than the stop?
:::solution
The close $100$ is below $104.5$, so the position exits. The close convention fills at $100$. The stop price was $104.5$, so the fill is $104.5 - 100 = 4.5$ price points worse than the stop. The simple return from entry is $100/100 - 1 = 0$, which hides the gap: from the previous close of $108$ the position lost $100/108 - 1 = -0.0741$ to four decimal places, while a fill at $104.5$ would have lost only $104.5/108 - 1 = -0.0324$ to four decimal places on that last step. A trailing stop does not ensure the stop price across a gap. [[orders/stops-and-stop-limits]] treats that distinction as an order-type question. Here it is enough that the exit price is a convention, and that O10's one-line description, below, does not state the convention. We do not invent one for the catalogue.
:::
:::

## The catalogue combination

The figures in this section are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtest. The reported Sharpe is their number, under a convention we have not verified.

O10, "Trailing Stop RSI", is described as an oversold RSI entry with a 5% trailing stop, on daily bars over 25 years. The catalogue reports a total return of $-12.2\%$, a CAGR of $-0.52\%$, a Sharpe of $-0.41$, a maximum drawdown of $-39.0\%$, a win rate of $39.8\%$, and a profit factor of $0.91$.

The entry is the reversion story: buy when an RSI reading is oversold. The line does not repeat the integers 14 and 35 from the market-order RSI row. We do not paste those integers in. The exit is the trail. O02, in [[reversion/rsi-and-bands]], exits when RSI is above 60 and reports a positive CAGR; that is a different exit on a different order rule, and the gap between the two reported paths is not a controlled experiment we have re-run. What O10 itself shows is enough. The combination of an oversold entry with a 5% trail, in that sample, has a negative reported total return, a negative reported CAGR, a negative reported Sharpe, a maximum drawdown of $-39.0\%$, and a profit factor below $1$. Wins, on the catalogue's unit, did not pay for losses.

A profit factor of $0.91$ means the absolute gross losses exceeded the gross gains, on the unit being summed. Unlike a ratio of $1$, this one already says the additive pieces were negative in sum, if the ratio is exact. The compound path agrees in sign: $-12.2\%$ over 25 years, a CAGR of $-0.52\%$. The drawdown of $-39.0\%$ says the path was not a slow drift of half a percent a year and nothing else. It had a deep hole. We cannot see whether the hole was one episode or many, or whether the trail caused exits that the RSI exit would have avoided. The description says the trail is the exit. The row says the package lost. Attributing every point of $-12.2\%$ to the trail alone would require the same entry with a different exit, run on the same data with the same fills. We do not have that run.

The loss is not a reason to take the other side. The other side of "buy oversold RSI, then trail by 5%" is not a well-defined strategy. It might mean "sell oversold RSI", which abandons the entry and keeps nothing coherent. It might mean "buy oversold RSI and do not use the trail", which is a different exit and is closer to the rule O02 already reports, with its own mixed dashboard, not with the negation of O10's CAGR. It might mean "sell whenever this rule would have bought, and manage the short with a mirrored trail". That third reading is a new short rule. Borrow, gaps up, and the asymmetry of a trail on a short are not the negatives of the long rule's costs. A minus sign in front of $-12.2\%$ does not construct them. [[momentum/momentum-crashes]] makes a related point about sign-flipped books: an episode that hurts one ranking helps the opposite ranking only when the weights really are opposites. Even then, knowing the episode after it has happened is not a timing signal.

:::warning Do not promote a loss into a signal
O10's reported return is negative. That fact does not say "fade the trail", "fade the RSI entry", or "trade the names the catalogue used". It says that one specified package, in one reported sample, lost money under that project's costs and fills. Using the loss as an entry signal for the opposite package is a second strategy, chosen because you saw the first result. [[statistics/testing-and-snooping]] is where a second look gets charged. This chapter stops at the smaller claim. The result is about the combination. The combination is not a menu.
:::

:::quiz
O10's reported total return is $-12.2\%$. Which reading is justified by the catalogue line and the number?
- [ ] Sell short whenever an RSI is oversold, because the long version lost money.
- [ ] Drop the trailing stop and keep the entry; the exit was the only part that could have lost.
- [x] The oversold entry together with a 5% trailing stop lost money in that reported sample. The other side is a different rule and is not identified by changing the sign.
- [ ] The figure is a forecast that the same package will lose another $12.2\%$ over the next 25 years.
:::solution
The row describes one package and reports a negative total return, CAGR, and Sharpe for it. Removing the stop, or reversing the entry, changes the package. A reported sample path is not a forecast, and this atlas has not re-run the row.
:::
:::

## Adding to a spread that does not come back

A $z$-score rule fails in a particularly mechanical way when the spread is a trend and the rule's response to a positive score is to hold a short, or to add to it. The $z$-score of a trailing window on an arithmetic trend need not grow. On a straight line it is often constant. "Adding" then has to be part of the position rule: each date the score stays positive, the short increases by one unit. That is a pyramid. It is a legal rule if the score uses only the past and the present. It is a costly rule on a trend, and the cost has a closed form.

:::definition Pyramid short on a positive score {#def-pyramid}
Let the spread levels be $S_0, S_1, \ldots$, and let $z_t$ be a trailing $z$-score known at $t$, built only from levels up through $t$. Start flat. On each date $t$ with $z_t > 0$, add one short unit and hold the accumulated position through the next change $S_{t+1} - S_t$. The simple profit of that step, in spread points, is the position, after the add, times the change. Dates with $z_t \le 0$ add nothing. If the score stays positive, the position is $-1, -2, -3, \ldots$ on successive steps.
:::

:::proposition Pyramid loss on a unit trend {#prop-pyramid}
Suppose $S_t = S_0 + d\, t$ with $d > 0$, so every change equals $d$. Suppose the trailing score is positive at $m \ge 1$ consecutive dates, and the rule in [[#def-pyramid]] adds one short unit at each of them, with no other positions. The $m$ step profits are $-d, -2d, \ldots, -m d$, and their sum is
$$
-d\, \frac{m(m+1)}{2}.
$$
:::

:::proof
After the first add the position is $-1$ and the next change is $+d$, so the profit is $-d$. After the second add the position is $-2$ and the profit is $-2d$. After $m$ adds the last profit is $-m d$. There is no positive term: every change is $+d$ and every position is negative. The sum of the first $m$ positive integers is $m(m+1)/2$, so the sum of the profits is $-d$ times that quantity. The hypothesis that the score stays positive is an input. On an arithmetic trend with a fixed window it is often true, because the last point of a rising line sits above the window mean by a constant fraction of the window's width. The proposition does not need the fraction. It needs the sign.
:::

:::example Four adds on a unit trend {#ex-pyramid}
Let $S_t = t$ for $t = 0, 1, \ldots, 6$, so $d = 1$. For a window of three levels ending at $t \ge 2$, the sample $z$-score of the last point, divisor $n-1 = 2$, equals $+1$. Apply [[#def-pyramid]] at $t = 2, 3, 4, 5$, and stop when the next change would need a level you do not have. Report the four profits and the sum.
:::solution
At $t = 2$ the window is $0, 1, 2$. The mean is $1$. Squared deviations sum to $2$, so the sample variance is $2/2 = 1$ and the sample standard deviation is $1$. The last deviation is $1$, and the $z$-score is $+1$. Shift the window up by one point and the deviations do not change, so the score stays $+1$ at $t = 3, 4, 5$. [[#prop-pyramid]] applies with $d = 1$ and $m = 4$. Profits are $-1, -2, -3, -4$. The sum is $-10$, which is also $-m(m+1)/2$. A rule that adds because the score is still positive is adding to a loser on a path that never turns. The sum is in spread points, not in a funded return, until a price is attached to one point. It is already the wrong sign. The result is not a reason to flip the pyramid into a long. A long pyramid on a falling line loses by the same formula with the sign of $d$ reversed. The lesson is that a $z$-score entry, without a reason for the spread to turn, is a trend bet wearing a reversion name.
:::
:::

A constant short, rather than a pyramid, loses less and still loses. One short unit held across the same four changes of $+1$ loses $4$ spread points, not $10$. The pyramid's extra loss is the price of adding. Both rules are short a rising spread. Neither loss is a signal to take the long side on the next path you have not seen.

## A hedge ratio that jumps

[[reversion/pairs-and-spreads]] fitted a slope on a window and watched it move by a few hundredths when one date rolled. A structural break is the same object with the relationship itself changed, not merely re-estimated. Suppose the log-price link is exact, then becomes a different exact link.

For five dates, let the second price be $40, 42, 41, 44, 43$ and set the first price to the square of the second, divided by $40$. Then
$$
\ln P^{(1)} = 2\ln P^{(2)} - \ln 40
$$
exactly, so the least-squares hedge ratio on those five dates is $2$ and the intercept is $-\ln 40 = -3.6889$ to four decimal places. The prices of the first leg are $40$, $44.1$, $42.025$, $48.4$, and $46.225$.

For the next five dates, let the second price be $43, 45, 44, 47, 46$ and set the first price to $10$ times the square root of the second. Then
$$
\ln P^{(1)} = \ln 10 + \tfrac12 \ln P^{(2)}
$$
exactly, so the hedge ratio on those five dates alone is $0.5$ and the intercept is $\ln 10 = 2.3026$ to four decimal places. Rounded to four decimals for display, the first-leg prices are $65.5744$, $67.0820$, $66.3325$, $68.5565$, and $67.8233$. The slope $0.5$ is exact on the unrounded construction, not on a further rounding of those prices.

:::example Pooled slope, and a rolling window {#ex-break}
On the ten dates formed by placing the second regime after the first, the pooled least-squares slope of $\ln P^{(1)}$ on $\ln P^{(2)}$, with an intercept, is $3.8322$ to four decimal places, and the intercept is $-10.4582$. A rolling window of five dates produces slopes $2.0000$, $3.1670$, $4.1285$, $3.8847$, $2.4826$, and $0.5000$, in that order, each to four decimal places. What does the pooled slope match, and what does the roll show?
:::solution
The pooled slope $3.8322$ equals neither regime's slope. It is not $2$, and it is not $0.5$. It is the compromise a single line makes when it is asked to serve two lines. The first rolling window sits entirely inside the first regime and recovers $2$. The last sits entirely inside the second regime and recovers $0.5$. The four windows that straddle the join print $3.1670$, $4.1285$, $3.8847$, and $2.4826$, none of which is a hedge that was true on either side of the break. A $z$-score built from the straddling residual is a score of a spread that neither regime generated. We do not attach a unit-root $p$-value to any of these residuals. The slopes already show that "the" hedge ratio depended on which dates were allowed into the window.
:::
:::

:::example A stale hedge after the break {#ex-stale}
Keep using $\beta = 2$ and intercept $-\ln 40$ on the first date of the second regime, where $P^{(2)} = 43$ and $P^{(1)} = 10\sqrt{43}$. The in-regime residual, using $\beta = 1/2$ and intercept $\ln 10$, is zero by construction. Compute the stale residual $\ln P^{(1)} - 2\ln P^{(2)} + \ln 40$ to four decimal places.
:::solution
Substitute $\ln P^{(1)} = \ln 10 + \tfrac12 \ln 43$:
$$
\ln 10 + \tfrac12 \ln 43 - 2\ln 43 + \ln 40 = \ln 400 - \tfrac32 \ln 43 = 0.3497
$$
to four decimal places. The fresh residual is $0$. The stale one is about $0.35$ log points, on a date when the new relationship holds exactly. A rule that standardises the stale residual and then shorts it, because $0.35$ looks large against a width estimated in the old regime, is short a spread that is no longer the spread it measured. The other four dates of the second regime give stale residuals $0.2815$, $0.3152$, $0.2162$, and $0.2485$, all positive, all far from the true residual of zero. The break does not have to be noisy to make a frozen hedge wrong. This calculation is not a reason to trade the square-root relationship, and it is not a $p$-value.
:::
:::

Freezing a hedge, refitting it every date, and refitting it only after a declared break are three rules. The roll in [[#ex-break]] shows the refitted slope thrashing through the join, which is its own problem: the estimate moves most just when you would most like it to be stable. There is no free choice that both notices the break instantly and refuses to move on ordinary noise. [[statistics/stationarity-and-regimes]] already warns that a regime filter fitted in sample is another searched parameter. A break you can see only at the end of the ten dates was not available to the positions held on the way through.

:::widget plot
f: x; 0.55*x
x: 0, 10
labels: spread; lagging reference
caption: A spread that rises by a fixed step, and a reference that stays below it. A short that adds while the spread is above the reference keeps adding to a loser. Drag nothing; read the gap. The drawing is the shape of the pyramid example, not a price path and not a forecast.
:::

:::quiz
A rolling five-date hedge ratio prints $2$ on the first regime and $0.5$ on the second. The pooled slope on all ten dates is $3.8322$. Which statement is fair?
- [ ] The pooled slope is the correct hedge, because it uses more data.
- [ ] The break is not real, because a single regression always recovers the true $\beta$.
- [x] The pooled slope matches neither regime. A window that straddles the join is a third, and wrong, hedge.
- [ ] A unit-root $p$-value of $0.01$ on the pooled residual would be the right way to finish this chapter's calculation.
:::solution
Each regime has its own exact slope, $2$ and then $0.5$. The pooled line is a compromise, $3.8322$, and the straddling windows in [[#ex-break]] sit near neither value. No unit-root statistic was computed, and none belongs in the answer.
:::
:::

:::intuition The exit can dominate the story
O10 and the pyramid are the same moral in two dialects. In O10 the entry is an oversold reading and the exit is a trail; the published package lost money. In the pyramid the entry is a positive $z$-score and the "management" is to add; the invented package loses $10$ spread points on a straight line. Changing the entry's story, after you have seen the loss, does not identify a better exit. It identifies a wish. Write the exit in the same sentence as the entry, and score that sentence. If the sentence loses, leave the loss as a loss.
:::

:::history
Wilder's 1978 index compares average gains with average losses over a window already in hand. A trailing stop is a different function: it ratchets with a favourable extreme after entry and freezes when the path goes the other way. Nothing in that 1978 definition, and nothing in the 1990 short-horizon results of Jegadeesh and Lehmann, chooses a distance of 5% or says what to do when the path keeps going. The distance is a parameter of a later rule, and O10 is one reported completion of it.
:::

## Where this leads

[[momentum/momentum-crashes]] studies episodes in which a winner-minus-loser book is hurt because yesterday's losers lead the rebound. That is the sign flip of a reversal ranking only when the weights, costs, and dates really match. It is not a schedule for turning O10's loss into a trade. The order that implements a trail, including the gap in [[#ex-gap]], is specified in [[orders/trailing-brackets-and-oco]]. A hedge that is allowed to jump belongs back with [[reversion/pairs-and-spreads]], where correlation was already refused as a stand-in for a stable residual.

:::summary
- Failure means a specified rule lost on a specified path or in a specified sample. It does not mean the opposite rule is the one to run.
- A 5% trailing stop sets the exit at $0.95$ times the running maximum close. On closes $100, 104, 110, 108, 103$, the close convention exits at $103$, a simple return of $0.03$ from entry. A fill at the stop price $104.5$ would have returned $0.045$. The two conventions are different experiments.
- A later close of $100$, with the stop still at $104.5$, fills $4.5$ price points worse than the stop under the close convention. The trail does not ensure the stop price across a gap.
- As reported in 2026 and not re-run here, O10 — oversold RSI entry, 5% trailing stop, 25 years — has total return $-12.2\%$, CAGR $-0.52\%$, Sharpe $-0.41$, maximum drawdown $-39.0\%$, win rate $39.8\%$, and profit factor $0.91$. The entry is the reversion story. The exit is the trail. The loss is about that combination.
- O02's RSI exit is a different rule with a different reported path. The gap is not a controlled re-run, and it is not a reason to drop the stop or to reverse O10.
- On a spread that rises by $d > 0$ each step, a pyramid that adds one short unit for $m$ dates with a positive score loses $d\, m(m+1)/2$ spread points. For $d = 1$ and $m = 4$ the loss is $10$. A published or computed loss of this kind is not a signal to take the long side.
- An exact hedge ratio of $2$ that becomes an exact hedge ratio of $0.5$ is not recovered by a pooled slope: the pooled slope is $3.8322$. A stale residual on the first post-break date is $0.3497$ log points, against a true residual of zero. No unit-root $p$-value is reported.
:::

## Exercises

:::exercise Stop after a new extreme {level=1 check="104.5"}
The running maximum close is $110$. Where does a 5% trailing stop sit? (Enter the stop price.)
:::solution
$0.95 \times 110 = 104.5$. The stop uses the extreme, not the latest close, once the latest close is below the extreme. A close of $108$ does not move this stop. A close of $112$ would.
:::
:::

:::exercise Close-convention return {level=1 check="0.03"}
Entry close $100$, exit close $103$, under the close convention of [[#ex-trail]]. What is the simple return? (Enter the return.)
:::solution
$103/100 - 1 = 0.03$. The stop price $104.5$ does not enter this calculation. It would enter only under a stop-price fill, which returned $0.045$ on the same path and is a different convention.
:::
:::

:::exercise Four unit steps, no pyramid {level=1 check="-4"}
A spread rises by $1$ on each of four steps. The position is a constant short of one unit, not a pyramid. What is the sum of the four profits, in spread points? (Enter the sum.)
:::solution
Each step contributes $1 \times (-1) = -1$. Four steps sum to $-4$. [[#prop-pyramid]] gives $-10$ only when the short grows through $1, 2, 3, 4$. Holding still is a different rule and a smaller loss. Both are losses. Neither is an order to go long the next trend.
:::
:::

:::exercise Gap versus stop {level=2 check="4.5"}
The stop stands at $104.5$ and the next close is $100$. Under the close convention, by how many price points is the fill worse than the stop? (Enter the difference.)
:::solution
$104.5 - 100 = 4.5$. The fill is $100$. The trail named $104.5$ and did not transact there. [[#ex-gap]] is this arithmetic. It does not say what O10's engine did on gaps, because the catalogue line does not say.
:::
:::

:::exercise Pooled slope {level=2 check="3.8322"}
From [[#ex-break]], what is the pooled hedge ratio on all ten dates, to four decimal places? (Enter the slope.)
:::solution
The pooled slope is $3.8322$. It is not $2$ and it is not $0.5$. A larger sample, formed by gluing two regimes, did not reveal a better estimate of either regime's slope. It revealed a line that belongs to neither.
:::
:::

:::exercise Pyramid sum for a general $m$ {level=2 check="-10"}
[[#prop-pyramid]] with $d = 1$ and $m = 4$ sums the profits $-1, -2, -3, -4$. What is that sum? (Enter the sum.)
:::solution
$-(1+2+3+4) = -10$, or $-m(m+1)/2 = -4 \times 5 / 2 = -10$. The formula is the reason the example does not need a seventh level. Four adds, four rising steps, ten points lost.
:::
:::

:::exercise Stale residual, one line {level=3}
At $P^{(2)} = 43$ and $P^{(1)} = 10\sqrt{43}$, the fresh hedge $\beta = 1/2$ leaves a residual of zero. Show that the stale residual at $\beta = 2$, with the old intercept $-\ln 40$, equals $\ln 400 - \tfrac{3}{2}\ln 43$, and state its value to four decimal places.
:::hint
Write $\ln P^{(1)} = \ln 10 + \tfrac12 \ln 43$, subtract $2\ln 43$, and add $\ln 40$. Then combine $\ln 10 + \ln 40$.
:::
:::solution
The stale residual is
$$
\ln P^{(1)} - 2\ln 43 + \ln 40 = \ln 10 + \tfrac12 \ln 43 - 2\ln 43 + \ln 40.
$$
The coefficients on $\ln 43$ are $\tfrac12 - 2 = -\tfrac32$, and $\ln 10 + \ln 40 = \ln 400$. The expression is $\ln 400 - \tfrac32 \ln 43$, which equals $0.3497$ to four decimal places. The fresh residual is zero because $P^{(1)}$ was built from $\beta = 1/2$. A rule still using $\beta = 2$ is not measuring that residual. No unit-root probability enters, and the number is not a forecast that the residual will shrink.
:::
:::

:::exercise Why $-12.2\%$ is not a short signal {level=3}
O10 reports a total return of $-12.2\%$ for an oversold RSI entry with a 5% trailing stop. Give two distinct "other sides" a reader might invent from that minus sign, and explain why neither is identified by the catalogue row.
:::hint
One invention changes the exit and keeps the entry. Another reverses the entry. Compare each with what O10's line actually specifies. The row was not re-run here. O02, which exits on RSI rather than on a trail, is a different published package, not the negation of O10.
:::
:::solution
One invention keeps the oversold entry and deletes the trail. That is a different exit. The catalogue already contains RSI exits, notably O02's exit when RSI is above 60, and that row is a separate experiment with its own reported path, not the number $+12.2\%$. Another invention sells when the RSI is oversold, perhaps with a mirrored trail. That reverses the entry and builds a new short rule. Borrow, gap risk, and the geometry of a trail on a short are not obtained by multiplying O10's costs by $-1$. The row identifies one package: oversold entry, 5% trail, and a reported loss on that package in that sample. [[#def-trail]] and [[#prop-pyramid]] are the same warning on toys you can finish by hand. A loss of a stated rule is a result about that rule. It becomes a signal only if someone writes a second rule, and the second rule then needs its own test rather than the minus sign of the first.
:::
:::
