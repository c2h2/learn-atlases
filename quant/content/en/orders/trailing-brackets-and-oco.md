A fixed stop is a number chosen when the position is opened. A **trailing stop** is allowed to move, but only in the direction that locks in a more favourable extreme: up for a long, and then not back down. A **bracket** puts two exits on the same position, one above and one below, and a cancel link so that the first fill kills the other. An **entry OCO** — one-cancels-the-other — puts two *entries* on the same signal, a dip and a breakout, and kills the one that did not trade. In every case the object is still a function from a future path to a fill, a cancel or a miss. The geometry of that function is the whole lesson. It is not a forecast, and it is not advice to trail, to bracket, or to leave either order live.

O09’s one-line description uses a 4 percent trail. O12’s uses a bracket at +6 percent and −3 percent. The paths below use those distances on invented prices, so the arithmetic is visible. They are not those backtests’ trades. The reported rows come after the arithmetic, and several of the reported Sharpes are negative. That cluster is the point of reading them together.

## A stop that ratchets

The extreme that drives a long trail is a running maximum. The stop is a fixed fraction of that maximum. When the price falls, the maximum does not fall, so the stop does not fall. Giving the high back is allowed only by waiting until the stop is hit, not by loosening the stop.

:::definition Trailing stop {#def-trail}
Fix a distance \(\delta\) with \(0 < \delta < 1\), here \(\delta = 0.04\) when the example is O09’s distance. A long **trailing stop** keeps a favourable extreme \(X\), seeded at the entry price. After each bar that does not exit, \(X\) becomes the maximum of its previous value and that bar’s high. The working stop is \(s = (1 - \delta) X\). The stop is a sell stop-market at \(s\), resolved by the gap convention of [[orders/stops-and-stop-limits]], except that \(s\) is not allowed to use the current bar’s high until the bar has failed to hit the stop inherited from earlier bars.
:::

The last clause is the same-bar rule. A daily bar does not say whether the high happened before the low. If the inherited stop is touched, we fill against that inherited stop and we do not first raise \(X\) with the same bar’s high. Raising it first would invent a tighter stop the bar’s own high had just created. We refuse that function.

:::algorithm One bar of a long trail {#alg-trail}
At the start of the bar the extreme \(X\) and the stop \(s = (1-\delta)X\) are already known.
1. If the open is at or below \(s\), fill at the open. Do not update \(X\). The other exit, if this trail sits inside a bracket, is cancelled.
2. If the open is above \(s\) and the low is at or below \(s\), fill at \(s\). Do not update \(X\).
3. If the low is above \(s\), there is no exit. Replace \(X\) by \(\max(X, H)\) and replace \(s\) by \((1-\delta)\) times the new extreme.
4. A trailing *stop-limit* uses the same trigger. On a trigger it becomes a sell limit at the current \(s\), not a market order. If that limit’s price is not inside the bar, the bar is a miss and the position remains. This is the shape of O11’s description, not O11’s sample.
:::

Four percent of the extreme is not four units of account once the extreme has left the entry. Four percent of 100 is 4, so the seed stop is 96. Four percent of 110 is 4.40, so a stop at \(110 \times 0.96 = 105.60\) sits 4.40 below that high. The simple return from the entry, if that stop fills, is computed against the entry, not against the high.

:::example A 4 percent trail, three bars {#ex-trail}
A long is filled at 100, which seeds the extreme. The distance is 4 percent. Three bars follow. Bar 1: open 101, high 104, low 100.5, close 103. Bar 2: open 103, high 110, low 106, close 109. Bar 3: open 107, high 108, low 103, close 104. Apply [[#alg-trail]] and report the exit price and the simple return from the entry.
:::solution
The seed is \(X = 100\) and \(s = 100 \times 0.96 = 96\).

Bar 1 has low 100.5, above 96, so there is no exit. The high 104 replaces the extreme. The new stop is \(104 \times 0.96 = 99.84\).

Bar 2 has low 106, above 99.84, so there is no exit. The high 110 replaces the extreme. The new stop is \(110 \times 0.96 = 105.60\). The give-back from this high is \(110 - 105.60 = 4.40\), not 4.

Bar 3 opens at 107, above 105.60, and the low 103 is at or below 105.60. Step 2 fills at 105.60. The high 108 is ignored, and it would not have raised the extreme anyway, because 108 is below 110. The simple return from the entry is \(105.60/100 - 1 = 0.056\). The cash gain is 5.60 units of account per unit. The other way of narrating the same fill — “it gave back 4.40 from the high” — is \(110 - 105.60\), which is not the profit. Both sentences are true, and they answer different questions.
:::
:::

:::example The bar that makes a new high and hits the old stop {#ex-samebar}
Keep the trail of [[#ex-trail]] up to the end of bar 2, so the inherited extreme is 110 and the inherited stop is 105.60. Replace bar 3 by open 101, high 120, low 90, close 100. What fills, and what would be illegitimate?
:::solution
The open 101 is already at or below 105.60, so step 1 fills at the open, 101. The extreme is not updated. The simple return from the entry at 100 is \(101/100 - 1 = 0.01\).

Using the high first would set \(X = 120\) and \(s = 120 \times 0.96 = 115.20\). The daily bar does not contain that order of prints. [[#alg-trail]] fills at 101. A specification that ratchets first is a different experiment, not a rounding choice.
:::
:::

:::intuition The trail sells a fixed fraction of the best print
From a high of \(X\) the long is willing, under this rule, to give back \(\delta X\) and no more. That is a statement about the exit message, not about the path being likely to resume. If the path falls through \(s\), the function exits. If the path goes on to a new high, the function tightens. O09 reports what one such function did over 25 years. The sign of that report is not implied by the cleanliness of the ratchet.
:::

## Two prices, one cancel

A bracket is two exits with a shared cancel. An entry OCO is two entries with a shared cancel. The link is the same English word and not the same convention when the bar touches both prices, because one case already has a position and the other does not.

:::definition Bracket {#def-bracket}
A long **bracket** entered at \(E > 0\) rests a sell limit at \(E(1+u)\) and a sell stop-market at \(E(1-d)\), with \(u > 0\) and \(0 < d < 1\). The two exits are one-cancels-the-other: the first fill cancels the other. If a bar contains neither price, both remain, which is a miss of the exits on that bar, not a cancel. If both prices lie in the bar’s range, this lesson’s tie-break fills the stop and cancels the profit whenever the open is above the stop, and fills at the open if the open is already through the stop. The tie-break is pessimistic for the long. A study that assumes the profit printed first is a different experiment.
:::

O12’s distances are \(u = 0.06\) and \(d = 0.03\). On an invented entry at 100 the profit limit is 106 and the stop is 97. O13’s distances are \(u = 0.04\) and \(d = 0.02\), so the same entry would put the exits at 104 and 98. The proposition covers both pairs. The worked bars use O12’s pair.

:::proposition Clean bracket paths {#prop-bracket}
Let the bracket of [[#def-bracket]] be live, and let the bar have open \(O\), low \(L\) and high \(H\).
1. If \(E(1-d) < L \le E(1+u) \le H\), the sell limit fills at \(E(1+u)\), the stop is cancelled, and the simple return from entry is \(u\).
2. If \(H < E(1+u)\), \(O > E(1-d)\) and \(L \le E(1-d)\), the stop fills at \(E(1-d)\), the limit is cancelled, and the simple return is \(-d\).

With \(E = 100\), \(u = 0.06\) and \(d = 0.03\), those returns are \(0.06\) and \(-0.03\).
:::

:::proof
In the first clause the stop price \(E(1-d)\) is strictly below the low, so the sell-stop does not trigger. The profit price lies in \([L, H]\), so the range convention fills the sell limit at \(E(1+u)\). The cancel link kills the stop. The simple return is \(E(1+u)/E - 1 = u\).

In the second clause the profit price is strictly above the high, so the sell limit misses. The open is above the stop and the low is at or below it, so the touch case of the stop-market fills at \(E(1-d)\). The cancel link kills the limit. The simple return is \(E(1-d)/E - 1 = -d\).

Both clauses require that exactly one of the two exit prices lies in the bar. The tie-break in [[#def-bracket]] is what this lesson uses when that fails. Substituting the O12 distances at an entry of 100 gives \(100 \times 1.06 = 106\) and \(100 \times 0.97 = 97\), and the returns \(0.06\) and \(-0.03\). The same algebra with O13’s distances gives returns \(0.04\) and \(-0.02\) on any bar that satisfies the same two shapes. Nothing here says the next bar will have either shape.
:::

:::definition Entry OCO {#def-oco}
An **entry OCO** rests two entry orders, here a buy limit at a dip price and a buy stop-market at a breakout price, joined by a cancel. If the bar touches exactly one of them, that order fills under the ordinary limit or stop rule, and the other is cancelled. If the bar touches neither, both remain. If both prices lie in the bar’s range, the bar does not say which printed first: this lesson cancels both and records no fill. Opening a position would invent a path. That refusal is not the bracket’s tie-break, and it should not be. A bracket already has a position and chooses a pessimistic exit; an entry OCO has no position and declines to invent one.
:::

:::example The profit bar and the stop bar {#ex-bracket}
Entry at 100, profit limit 106, protective stop 97, the O12 distances. Bar P: open 102, high 107, low 101, close 105. Bar S: open 99, high 100, low 94, close 96. Resolve each bar as its own experiment.
:::solution
Bar P has low 101, which is above 97, and the interval from 101 to 107 contains 106. Clause 1 of [[#prop-bracket]] fills the sell limit at 106 and cancels the stop. The simple return is \(106/100 - 1 = 0.06\). The close 105 is not the fill. The range convention sells at the limit because the high printed through it.

Bar S has high 100, below 106, so the profit is not touched. The open 99 is above 97 and the low 94 is below 97, so the stop fills at 97, not at the open and not at the low. The profit limit is cancelled. The simple return is \(97/100 - 1 = -0.03\). The cash loss is 3 units of account per unit. Had the open been 94, the gap convention would have sold at 94 instead, and the return would have been \(-0.06\), the gap case from the stops chapter sitting inside the bracket. This open does not do that.
:::
:::

:::example The breakout cancels the dip {#ex-oco}
An entry OCO rests a buy limit at 98 and a buy stop-market at 105. One bar opens at 100, with high 106, low 99 and close 104. A second, separate bar opens at 100, with high 101, low 97 and close 99. A third opens at 100, with high 106, low 97 and close 103. Apply [[#def-oco]].
:::solution
On the first bar the high 106 reaches 105 and the low 99 does not reach 98. Only the buy-stop is touched. The open 100 is below 105, so the touch fill is 105, not a gap fill. The buy limit is cancelled. Its outcome is a cancel, not a miss that survives to the next bar.

On the second bar the low 97 reaches 98 and the high 101 does not reach 105. The buy limit fills at 98. The buy-stop is cancelled. The simple return from that fill to the close is \(99/98 - 1 = 0.010204\) to six decimal places. The return is a property of this invented bar, not a reason to prefer dips.

On the third bar both 98 and 105 lie in \([97, 106]\). The convention cancels both and records no fill. There is no entry price to score. A specification that fills 105 anyway, or 98 anyway, has added a path the OHLC bar does not contain.
:::
:::

:::example When the trail becomes a limit {#ex-tlim}
Take the trail after bar 2 of [[#ex-trail]], so the working stop is 105.60, but convert the trigger into a sell limit at 105.60, as in step 4 of [[#alg-trail]]. The next bar opens at 100, with high 102, low 99 and close 99. Compare with the stop-market trail on the same bar.
:::solution
The open 100 is below 105.60, so a trailing stop-market fills at the open. The simple return from the entry at 100 is \(100/100 - 1 = 0\).

The trailing stop-limit becomes a sell limit at 105.60. The high is 102, so 105.60 is not in the range and the limit misses. The position remains long. Marked at the close 99, the unrealised simple return from the entry is \(99/100 - 1 = -0.01\). The conversion did not improve the exit: it refused the gap. O11 is the library’s version of that conversion; this bar is not their bar.
:::
:::

:::widget plot
f: 100 + 8*sin(x)
x: 0, 3.1416
y: 90, 115
hlines: 96; 103.68
caption: Toy path \(100 + 8\sin x\). It peaks at 108. A 4 percent trail seeded at 100 starts at 96, the lower line, and if the extreme is that peak it sits at 103.68, the upper line. The path ends back at 100, through the upper line. The figure does not apply the same-bar rule; it only shows the two stop levels. Not a market.
:::

:::warning Do not ratchet with the bar that stops you out
The inherited stop is the only stop that can fire on this bar. [[#ex-samebar]] is the case people smooth over: high 120, open 101, inherited stop 105.60. The fill is 101. Updating the extreme to 120 first, and then claiming a stop at 115.20, uses a price the fill convention is not allowed to see. The same discipline applies inside a bracket. If both the profit and the stop lie in the range, [[#def-bracket]] takes the stop, not the profit.
:::

## What the reported exit rows did

O09, O10, O11, O12, O13 and O14 are daily, 25-year order-mode examples. The figures are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests. They are not forecasts and not advice.

O09, Trailing Stop Trend, is a trend entry with a 4 percent trailing stop. It reports a total return of +30.0 percent, a CAGR of +1.06 percent, a reported Sharpe of −0.33, a maximum drawdown of −7.0 percent, a win rate of 47.6 percent and a profit factor of 1.71.

O11, Trailing Stop Limit, converts the trail to a limit on the trigger. It reports a total return of +28.1 percent, a CAGR of +1.00 percent, a reported Sharpe of −0.38, a maximum drawdown of −6.2 percent, a win rate of 47.6 percent and a profit factor of 1.69. The win rate matches O09’s to the printed precision. The Sharpe does not, and [[#ex-tlim]] is why a matching win rate would not have been guaranteed: a limit can miss where a market-style trail fills.

O12, Bracket Trend, is a trend entry with a +6 percent / −3 percent bracket. It reports a total return of +29.4 percent, a CAGR of +1.04 percent, a reported Sharpe of −0.38, a maximum drawdown of −6.8 percent, a win rate of 45.8 percent and a profit factor of 1.58.

O13, Bracket RSI Reversion, is an RSI dip with a +4 percent / −2 percent bracket. It reports a total return of +8.5 percent, a CAGR of +0.33 percent, a reported Sharpe of −0.43, a maximum drawdown of −11.6 percent, a win rate of 45.8 percent and a profit factor of 1.07. The win rate matches O12’s as printed. The CAGR does not. Same bracket shape, different distances, different entry story, different row.

O14, OCO Dip Or Breakout, rests a buy limit and a buy-stop against each other. It reports a total return of +45.5 percent, a CAGR of +1.51 percent, a reported Sharpe of −0.08, a maximum drawdown of −13.2 percent, a win rate of 58.0 percent and a profit factor of 1.27.

O10, Trailing Stop RSI, is an oversold RSI entry with a 5 percent trailing stop. It reports a total return of −12.2 percent, a CAGR of −0.52 percent, a reported Sharpe of −0.41, a maximum drawdown of −39.0 percent, a win rate of 39.8 percent and a profit factor of 0.91. The return is negative. That is evidence about that combination in that sample. It is not a reason to take the other side. The reversion reading of the same row belongs to [[reversion/when-reversion-fails]]. Here it is enough that a trailing exit did not turn the entry story into a positive reported CAGR.

The reported Sharpes on these six rows are −0.33, −0.41, −0.38, −0.38, −0.43 and −0.08. Five CAGRs are positive and modest; O10’s is not. Trail, trail-limit, bracket and competing entries are different functions, and in this cluster the reported Sharpe does not come out positive. We do not annualise them further.

:::application The cluster is the result
Quoting only O14’s CAGR of +1.51 percent, and not its reported Sharpe of −0.08 or its drawdown of −13.2 percent, edits the row. Quoting only O10’s loss and reversing the sign edits it the other way. The reported Sharpes in this group sit at or below zero. That is six published experiments, not a ranking of exits.
:::

:::remark Give-back is not the entry return
In [[#ex-trail]] the position gives back 4.40 from a high of 110 and still has simple return \(0.056\) from the entry. Those are \(\delta\) and \((1-\delta)X/E - 1\). O09’s win rate of 47.6 percent uses their unit, which this atlas has not reconstructed.
:::

:::quiz
A long trail has just made a new extreme. The next bar falls, but not as far as the stop. What happens to the stop?
- [ ] It falls by the same amount as the price, so the distance stays visually constant on the chart
- [ ] It is cancelled, because a trail only applies while price is rising
- [x] It stays where it is: the extreme does not fall, so the stop does not fall
- [ ] It moves halfway back towards the entry, as a compromise
:::solution
By [[#def-trail]] the extreme is a running maximum. A bar that does not make a new high and does not hit the stop leaves both the extreme and the stop unchanged. The distance in price units stays a fixed fraction of the old high, not a rubber band tied to the latest print.
:::
:::

:::quiz
An entry OCO has both its buy limit and its buy-stop inside the same daily bar’s range. What does this lesson record?
- [ ] A fill at the buy-stop, because breakouts outrank dips
- [ ] A fill at the buy limit, because the limit is the better price
- [ ] A fill at both prices, with two positions
- [x] No fill: both orders are cancelled, because the bar does not say which price printed first
:::solution
[[#def-oco]] refuses the trade when both entry prices lie in the range. The bracket’s pessimistic tie-break is a different convention, for a position that already exists. Using it here would invent an entry.
:::
:::

:::history
In 2002 Jean-Philippe Bouchaud, Marc Mézard and Marc Potters measured the order books of liquid Paris stocks and found regularities in the incoming limit prices and in the shape of the average book. A trailing stop, a bracket and an OCO pair are rules for where a price sits in a book of that kind, and for which message to cancel. A daily bar keeps a high and a low and discards the shape. The ratchet in [[#alg-trail]] and the two tie-breaks in this chapter are conventions about those two numbers. They do not use the regularities a visible book would have offered, because the bar no longer contains them.
:::

## Where this leads

Quantity is the next constraint. A trail or a bracket on a single invented unit does not say how many FX lots or futures contracts the message is for; that is [[orders/lots-contracts-and-intraday]]. The stop-market a trail becomes, including the gap, is [[orders/stops-and-stop-limits]]. O10’s negative row, read as a reversion entry that a trail did not save, continues in [[reversion/when-reversion-fails]].

:::summary
- A long trailing stop ratchets the extreme up to new highs and freezes it otherwise. The working stop is \((1-\delta)\) times that extreme.
- The stop that can fire on a bar is the stop inherited at the open. The bar’s own high is not allowed to raise it first.
- On a 4 percent trail from 100, highs of 104 and then 110 put the stop at 99.84 and then 105.60. A later low through 105.60 exits at 105.60, a simple return of 0.056, if the open has not gapped through.
- A bracket at +6 percent and −3 percent from 100 exits at 106 or at 97 on the clean paths, returns 0.06 and −0.03. If both prices lie in the bar, this lesson fills the stop.
- An entry OCO that finds both the dip and the breakout inside one bar cancels both and does not invent a fill.
- O09, O11, O12, O13 and O14 report Sharpes −0.33, −0.38, −0.38, −0.43 and −0.08. O10 reports a return of −12.2 percent and a CAGR of −0.52 percent. The exit is part of the result. The loss is not a reason to take the other side.
- The figures are as reported in 2026 for those QuantJourney examples. This atlas has not re-run them, and they are not advice.
:::

## Exercises

:::exercise The seed stop {level=1 check="96"}
A long trail is seeded at an entry of 100 with distance 4 percent. What is the working stop before any later high? (Enter the stop.)
:::solution
\(100 \times (1 - 0.04) = 96\). The stop is 96. No bar has traded yet, so there is nothing to ratchet.
:::
:::

:::exercise After a high of 110 {level=1 check="105.6"}
The same 4 percent trail has favourable extreme 110. What is the working stop? (Enter the stop.)
:::solution
\(110 \times 0.96 = 105.6\). Equivalently, the give-back is \(110 \times 0.04 = 4.4\), and \(110 - 4.4 = 105.6\). The stop does not stay at 96 once the extreme has moved.
:::
:::

:::exercise The profit price {level=1 check="106"}
A bracket is entered at 100 with an upside distance of 6 percent. What is the sell-limit price? (Enter the price.)
:::solution
\(100 \times 1.06 = 106\). The stop at 3 percent below would be 97; the question asks only for the profit limit.
:::
:::

:::exercise Clean profit path {level=2 check="0.06"}
Entry 100, profit limit 106, stop 97. A bar has low 101 and high 107, and the open is 102. What is the simple return from the entry under [[#prop-bracket]]? (Enter the simple return.)
:::solution
The low is above the stop and the high reaches the profit, so clause 1 fills at 106 and cancels the stop. The simple return is \(106/100 - 1 = 0.06\).
:::
:::

:::exercise Clean stop path {level=2 check="-0.03"}
Entry 100, profit limit 106, stop 97. A bar opens at 99, with high 100 and low 94. What is the simple return from the entry? (Enter the simple return.)
:::solution
The high does not reach 106. The open is above 97 and the low is below it, so the stop fills at 97 and the profit limit is cancelled. The simple return is \(97/100 - 1 = -0.03\). The open is not through the stop, so the fill is not 99 and not 94.
:::
:::

:::exercise Which entry survives {level=2 check="105"}
An entry OCO rests a buy limit at 98 and a buy stop-market at 105. The bar opens at 100, with high 106 and low 99. What is the fill price of the order that fills? (Enter the fill price.)
:::solution
The high reaches 105 and the low does not reach 98, so only the buy-stop is touched. The open 100 is below 105, so the fill is the trigger, 105. The buy limit is cancelled.
:::
:::

:::exercise A trail you have to update yourself {level=3 check="101.76"}
A 4 percent long trail is seeded at 100. Bar 1: open 101, high 104, low 100, close 103. Bar 2: open 103, high 106, low 102, close 105. Bar 3: open 104, high 105, low 100, close 101. What is the exit price? (Enter the price.)
:::hint
Update the extreme only on a bar whose low stays above the inherited stop. On the bar that hits, fill at the inherited stop if the open is still above it. Do not use that bar’s high. Check \(106 \times 0.96\).
:::
:::solution
The seed stop is 96. Bar 1 has low 100, above 96, so there is no exit. The extreme becomes 104 and the stop becomes \(104 \times 0.96 = 99.84\).

Bar 2 has low 102, above 99.84, so there is no exit. The extreme becomes 106 and the stop becomes \(106 \times 0.96 = 101.76\).

Bar 3 opens at 104, above 101.76, and the low 100 is below 101.76. Step 2 of [[#alg-trail]] fills at 101.76. The high 105 is below the extreme 106 anyway, and it would have been ignored even if it had been higher. The simple return from the entry is \(101.76/100 - 1 = 0.0176\). The exit price the question asks for is 101.76.
:::
:::

:::exercise Both exits in one bar {level=3 check="97"}
A bracket entered at 100 has its profit limit at 106 and its stop at 97. The bar opens at 100, with high 108, low 95 and close 102. What fill price does this lesson record? (Enter the fill price.)
:::hint
Both 106 and 97 lie between the low and the high, so the clean clauses of [[#prop-bracket]] do not apply. Use the bracket tie-break, not the entry-OCO refusal and not the profit.
:::
:::solution
The profit price 106 and the stop price 97 both lie in \([95, 108]\). [[#def-bracket]] then looks at the open. The open 100 is above the stop, so the tie-break fills the stop at 97 and cancels the profit. It does not fill at 106, even though the high reached 108, and it does not cancel both, which is the entry-OCO rule for a position that does not yet exist. The simple return is \(97/100 - 1 = -0.03\). The fill price is 97.

Had the open been 95, the same definition would have filled at the open, because the open would already have been through the stop. That is not this bar.
:::
:::
