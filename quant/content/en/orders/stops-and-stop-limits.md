A limit waits for a price and, if the price prints, trades at that price. A **stop** waits for a price and then changes what kind of order it is. Until the trigger prints, it is only a condition. After the trigger, it is either a market order or a limit, and those two successors do not fill on the same paths. The whole object is still a function from a future path to a fill, a cancel or a miss. It is not a forecast, and it is not advice to open or close any position.

The awkward case is a gap. The stop says 95. The next bar opens at 90. There is no print at 95 for the order to trade against, because the first price of the bar is already through the trigger. A stop that has become a market order fills at 90 under the convention this chapter states. A stop that has become a limit may not fill at all. Both outcomes are part of the definition. Neither is a reason to take the other side of a published loss, and neither is an instruction a broker is being asked to receive.

The previous chapter’s range convention and its three market clocks are assumed. Path language here is invented unless a sentence names a library row.

## A trigger, then a different order

People talk about protective stops and breakout stops as if they were different instruments. The inequality is the same. A **sell-stop** sits below the market and is the usual exit from a long. A **buy-stop** sits above the market and is the usual entry on a breakout. [[trend/breakouts-and-macd]] owns the breakout as a hypothesis about highs. This chapter owns the fill. O05’s one-line description is a buy-stop above a recent high; the high itself is not computed again here.

:::definition Stop-market {#def-stopmarket}
A **stop-market** at trigger \(s\) is dormant until a bar trades through \(s\). It then becomes a market order. For a sell-stop, “through” means the bar’s low is at or below \(s\). For a buy-stop, it means the bar’s high is at or above \(s\). The **gap convention** names the fill. If the open is already through \(s\), the fill is the open, because that is the first price a market order can hit. If the open is not through \(s\) but the range is, the fill is \(s\): an optimistic touch, the same optimism as a limit that fills because the range contains its price. If the range does not reach \(s\), the bar is a miss.
:::

The touch case borrows the optimism of [[orders/market-and-limit-orders]]. A low that merely equals \(s\) is treated as a fill of the whole quantity at \(s\), with no queue. The gap case is the opposite of optimism about the stop price. The market never offered \(s\), and the convention refuses to pretend that it did.

:::definition Stop-limit {#def-stoplimit}
A **stop-limit** has a trigger \(s\) and a limit \(\ell\). When the bar trades through \(s\), the order becomes a limit at \(\ell\), not a market order. For a sell stop-limit the limit is a floor on the sale, so \(\ell \le s\): the order will not sell below \(\ell\). For a buy stop-limit the limit is a cap on the purchase, so \(\ell \ge s\): the order will not buy above \(\ell\). Becoming a limit does not imply a fill. If the bar never trades at a legal price for that limit, the outcome on the bar is a miss. A day order that misses then cancels; a good-till-cancelled order remains, still unfilled.
:::

O07’s one-line description, “cap the maximum fill price”, is a buy stop-limit. O08’s, a stop-limit sell under a trend entry, is the protective version. The cap and the floor are the same idea facing opposite directions. A cap that is never traded is a breakout the order refuses. A floor that gaps through is a loss the order fails to cut. Both are misses, not silent fills at \(\ell\).

:::algorithm Resolving one bar {#alg-stop}
Inputs are the bar’s open, high and low, and the order. The first matching case wins.
1. *Sell stop-market at \(s\).* If the low is above \(s\), miss. If the open is at or below \(s\), fill at the open. If the open is above \(s\) and the low is at or below \(s\), fill at \(s\).
2. *Buy stop-market at \(s\).* If the high is below \(s\), miss. If the open is at or above \(s\), fill at the open. If the open is below \(s\) and the high is at or above \(s\), fill at \(s\).
3. *Sell stop-limit, trigger \(s\), limit \(\ell \le s\).* If the low is above \(s\), miss. If the open is strictly below \(\ell\), miss: the bar is through the floor. If \(\ell \le\) open \(\le s\), fill at the open. If the open is above \(s\) and the low is at or below \(s\), fill at \(s\).
4. *Buy stop-limit, trigger \(s\), limit \(\ell \ge s\).* If the high is below \(s\), miss. If the open is strictly above \(\ell\), miss: the bar is through the cap. If \(s \le\) open \(\le \ell\), fill at the open. If the open is below \(s\) and the high is at or above \(s\), fill at \(s\).
:::

Case 3’s last step fills at \(s\) rather than at the low. The optimistic touch says the trigger traded, and \(s\) is a legal sell because \(s \ge \ell\). It does not say the order sold the low. Case 4 is the mirror: the buy fills at \(s\), not at the high, when the path comes up through the trigger inside the cap.

:::quiz
A sell stop-market rests at 95. The next bar opens at 90. Which fill does the gap convention record?
- [ ] 95, because that is the price written on the stop
- [x] 90, the open, because the stop has become a market order and the open is already through 95
- [ ] No fill, because a stop never trades worse than its trigger
- [ ]  the close, whatever it is, because stops fill at closes
:::solution
Once the open is at or below the sell trigger, [[#def-stopmarket]] turns the stop into a market order and fills it at the open. Filling at 95 would invent a print the bar did not have. A stop-limit with a floor above 90 could miss instead; this question is a stop-market.
:::
:::

## The gap is a worse price, not a rounding error

The arithmetic is short, and it is the whole content of “my stop was at 95”.

:::proposition Gap shortfall of a sell-stop {#prop-gap}
Let a long be entered at \(E > 0\), and let a sell stop-market rest at \(s\) with \(0 < s < E\). The next bar opens at \(O \le s\). Under the gap convention the fill is \(O\), and the simple return from entry to fill is \(O/E - 1\). The simple return had the fill been the trigger is \(s/E - 1\). The difference of those returns is \((O - s)/E\), which is strictly negative when \(O < s\). The seller receives \(s - O\) fewer units of account per unit of the asset than the trigger suggested. In particular, \(E = 100\), \(s = 95\) and \(O = 90\) give returns \(-0.10\) and \(-0.05\), and the cash gap is 5 units of account per unit.
:::

:::proof
By case 1 of [[#alg-stop]], an open at or below a sell trigger fills at the open, so the fill price is \(O\) and the simple return is \(O/E - 1\). Subtract the trigger-priced return: \((O/E - 1) - (s/E - 1) = (O - s)/E\). When \(O < s\) the numerator is negative and \(E > 0\), so the difference is negative. The cash difference per unit is the same numerator, \(O - s\). Substitute the three prices: \(90/100 - 1 = -0.10\), \(95/100 - 1 = -0.05\), and \((90 - 95)/100 = -0.05\). The seller receives \(95 - 90 = 5\) fewer units of account per unit than a fill at the trigger. The high and the close do not enter, because the open has already settled the fill.
:::

Five percent of the entry 100 is 5, so a trigger at 95 is a 5 percent protective distance. That is the distance named in O06’s one-line description, applied here to an invented entry. It is not O06’s fill, and it is not a guaranteed loss of 5 percent. The gap turns 5 percent into 10 percent on this bar without changing the order ticket.

:::proposition A stop-limit can refuse the gap {#prop-miss}
Let a sell stop-limit have trigger \(s\) and limit \(\ell \le s\), and let the next bar open at \(O < \ell\). The stop-limit does not fill on that bar. The sell stop-market at the same \(s\) does fill, at \(O\). The two orders are different functions: the limit does not cap the loss at \(\ell\), or at \(s\), on a gap through the floor.
:::

:::proof
From \(O < \ell \le s\) it follows that \(O < s\). Case 1 of [[#alg-stop]] therefore fills the stop-market at \(O\). Case 3 treats an open strictly below \(\ell\) as a miss, before any fill price is chosen. A miss has no fill at \(\ell\) and no fill at \(s\). The position is still open. Any mark uses a later price, which the order did not choose. So the sentence “the downside is protected at \(\ell\)” is false on this path, even though \(\ell\) is written on the order.
:::

:::example Stop at 95, open at 90 {#ex-gap}
A long is entered at 100. A day sell stop-market rests at 95. The next bar opens at 90, with high 92, low 88 and close 91. Apply the gap convention. Compare the fill with a hypothetical fill at the trigger, in simple returns and in units of account.
:::solution
The open 90 is at or below 95, so [[#prop-gap]] fills at 90, not at 95 and not at the low 88. The simple return from the entry is \(90/100 - 1 = -0.10\). A fill at the trigger would have been \(95/100 - 1 = -0.05\). The difference is \(-0.05\), and the seller receives 5 fewer units of account per unit. The close 91 is irrelevant to the fill; it would matter only if the order had missed and the position were being marked. The stop-market did not miss.
:::
:::

:::example The same gap, with a floor at 94 {#ex-miss}
Keep the entry at 100 and the trigger at 95, but make the order a day sell stop-limit with limit 94. Use the same bar, open 90, high 92, low 88, close 91. Then change only the open, to 94.5, and resolve the order again. The high, low and close of that second version can stay 96, 94 and 95; only the open is doing the work in the first comparison, but the second bar must be a possible OHLC, so take it as open 94.5, high 96, low 94, close 95.
:::solution
On the first bar the open 90 is strictly below the floor 94, so case 3 of [[#alg-stop]] records a miss. There is no sale at 94, at 95 or at 90. A day order then cancels. The position is still long. Marked at the close 91, the unrealised simple return from the entry is \(91/100 - 1 = -0.09\), which is better than the stop-market’s realised \(-0.10\) only because this is a mark, not a fill. The loss is not capped. The next bar, if the position is still held, can do what it likes.

On the second bar the open 94.5 satisfies \(94 \le 94.5 \le 95\), so the stop-limit fills at the open. The simple return is \(94.5/100 - 1 = -0.055\). That is worse than a fill at 95, by half a unit of account per unit, and it is a real fill: the open got through the trigger without getting through the floor. The gap convention and the limit are both binding. Neither number is a recommendation to use a floor of 94.
:::
:::

:::example A touch that does fill the stop-limit {#ex-touch}
The same sell stop-limit, trigger 95 and limit 94, meets a bar that opens at 97, with high 99, low 94.5 and close 96. The entry was 100. Where does it fill, and what is the simple return?
:::solution
The open 97 is above the trigger, and the low 94.5 is at or below 95, so the stop is triggered from above. Case 3 fills at the trigger, 95, not at the low. The trigger is a legal price for the limit because \(95 \ge 94\). The simple return is \(95/100 - 1 = -0.05\). The low printed 94.5, inside the floor, but the optimistic touch does not donate the low to the seller. It donates the trigger. Had the low been 93, still with the open at 97, the same case would still fill at 95: the rule looks at whether the low reached \(s\), not at how far past \(\ell\) it went, once the open is above \(s\). That last sentence is the optimism. A path that knifes through 95 to 93 without trading 95 is declared to have traded 95.
:::
:::

:::example A buy-stop, touched and gapped {#ex-break}
A buy stop-market rests at 105, the shape of a breakout entry and not a 20-day high. Two invented bars are separate experiments. The first opens at 103, with high 108, low 102 and close 106. The second opens at 110, with high 112, low 109 and close 111. Apply [[#alg-stop]] and score each fill to its own close.
:::solution
On the first bar the open 103 is below 105 and the high 108 is above it, so the fill is the trigger, 105. The simple return from that fill to the close is \(106/105 - 1 = 0.009524\) to six decimal places.

On the second bar the open 110 is already above 105, so the fill is the open, 110. The simple return from that fill to the close is \(111/110 - 1 = 0.009091\) to six decimal places. A hypothetical fill at the trigger, marked to the same close, would be \(111/105 - 1 = 0.057143\) to six decimal places. The gap convention does not grant that return. The entry is 5 units of account worse per unit, 110 rather than 105, and the close-to-fill return collapses because the open has already taken most of the move. A buy stop-limit with cap 106 on this second bar would not repair the price: the open 110 is above 106, so case 4 records a miss. The breakout that gapped is the breakout the cap refuses.
:::
:::


The default bar opens at 90, with high 94 and low 88, and the sell stop-market rests at 95. The open is already through the trigger, so the gap convention fills at the open, not at 95. Switch to a sell stop-limit with the limit at 93 and the same open: the open is through the floor, and the bar misses.

:::widget stop
open: 90
high: 94
low: 88
close: 91
trigger: 95
limit: 93
kind: sell-market
caption: The default is a sell stop-market at 95 on a bar that opens at 90. The readout fills at the open. Change the kind to a sell stop-limit and the same open misses, because 90 is through the limit at 93. The bar is invented. The figure is the rule, not an order to send.
:::
:::widget plot
f: 100 - 3*x; 90 + 0*x
x: 0, 4
y: 80, 105
hlines: 95
labels: touch path; gap open
caption: The falling line starts at 100 and crosses the sell-stop at 95 inside the window: that is the touch case, a fill at 95 if the open was above the stop. The flat line at 90 is an open already through the stop: the gap convention fills at 90, not on the stop. A drawing, not a market.
:::

:::intuition The trigger is not a promise
The number on a stop is a condition in a message, not a trade the market has agreed to. [[#prop-gap]] is what remains when that confusion is removed: if the open is through the trigger, a market-style stop takes the open, and the distance you wrote down is not the loss. A stop-limit restores a price you are willing to accept, and [[#prop-miss]] is the cost of the restoration. On the path that most needs the exit, the limit can stand aside.
:::

## Four reported stop backtests

O05, O06, O07 and O08 are daily, 25-year order-mode examples. The figures below are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests. They are not forecasts and not advice. “Reported Sharpe” means their Sharpe, under a convention this atlas has not verified.

O05, Stop Breakout Entry, is a buy-stop above the recent 20-day high. It reports a total return of +41.44 percent, a CAGR of +1.40 percent, a reported Sharpe of −0.19, a maximum drawdown of −10.5 percent, a win rate of 61.9 percent and a profit factor of 1.45.

O06, Protective Stop Loss, is a trend entry with a 5 percent protective stop. It reports a total return of +60.1 percent, a CAGR of +1.90 percent, a reported Sharpe of 0.00, a maximum drawdown of −16.2 percent, a win rate of 44.7 percent and a profit factor of 1.70. A reported Sharpe of 0.00 is not a claim that the stop “did nothing”. The same row has a positive CAGR and a drawdown of −16.2 percent. The zero is their summary statistic, read as printed.

O07, Stop Limit Breakout, enters breakouts but caps the maximum fill. It reports a total return of +56.2 percent, a CAGR of +1.80 percent, a reported Sharpe of −0.05, a maximum drawdown of −6.4 percent, a win rate of 63.0 percent and a profit factor of 1.63.

O08, Stop Limit Protection, is a trend entry with a stop-limit sell on the downside. It reports a total return of +63.6 percent, a CAGR of +1.99 percent, a reported Sharpe of 0.02, a maximum drawdown of −14.2 percent, a win rate of 43.1 percent and a profit factor of 1.81.

Set O05 beside O07, and O06 beside O08. Each pair is a market-style stop against a stop-limit on a related economic story, breakout or protection. The reported drawdowns differ: −10.5 percent against −6.4 percent on the breakout pair, −16.2 percent against −14.2 percent on the protective pair. Those are their rows. A smaller reported drawdown is not a reason to prefer the cap, because the fill function has changed, the missed breakouts are not in the same place in the two experiments, and this atlas has not re-run either one. O07’s win rate of 63.0 percent is not O03’s 100 percent. A cap does not manufacture a perfect denominator by itself; [[#ex-break]] shows it manufacturing a miss.

The negative reported Sharpes on O05 and O07, and the near-zero figures on O06 and O08, are part of the same lesson as the gap arithmetic. The exit or the entry is a function of the path. Changing stop-market into stop-limit changes the function. The published summaries move, and they do not move into a story about what a reader ought to trade.

:::warning Booking the trigger when the open has gapped
The usual slip is to subtract 5 percent because the stop said 5 percent. [[#ex-gap]] is the counter-example: trigger 95, open 90, fill 90, simple return −0.10. The other slip is to “fix” that by adding a limit, and then to keep assuming a fill. [[#ex-miss]] opens at 90 with a floor at 94 and does not sell. A protected loss that is not a fill is still a position.
:::

:::remark Stops do not know why they were placed
Nothing in [[#alg-stop]] asks whether the order is protecting a long or breaking out of a range. The position the order leaves behind is different — an exit flattens, an entry opens — but the fill price is the same function of open, high, low and the two prices on the ticket. A research note that says “stops work for breakouts” or “stops work as protection”, citing O05 against O06 as if the verb “work” were visible in the Sharpe column, has changed the subject. O05’s reported Sharpe is −0.19. O06’s is 0.00. Neither column is a permit.
:::

:::quiz
A sell stop-limit has trigger 95 and limit 94. The next bar opens at 90. What does [[#alg-stop]] record?
- [ ] A fill at 94, because the limit is the worst allowed sale
- [ ] A fill at 90, because every stop fills at the open when the open gaps
- [x] A miss: the open is through the floor, so the limit that the stop has become does not trade
- [ ] A fill at 95, the trigger, with the limit ignored once the gap is large
:::solution
[[#prop-miss]] applies: the open is strictly below the floor, so the stop-limit misses, while a stop-market at 95 would have sold at 90. The floor does not become a fill merely because it was written down.
:::
:::

:::history
In 1985 Albert S. Kyle gave a linear relation between an informed order and the price move it causes, the ancestor of later impact formulas. A stop-market, once triggered, is aggressive in the plain sense that it takes liquidity at whatever price is there, whether or not anyone in the trade is informed. This chapter does not fit Kyle’s line, and it does not turn the gap in [[#prop-gap]] into a measured impact coefficient. The point of naming the model is narrower: the fill of a triggered stop is not the number printed on the order.
:::

## Where this leads

A stop that moves only in the favourable direction, and a pair of exits that cancel each other, are [[orders/trailing-brackets-and-oco]]. The market and limit messages this chapter turns a stop into are [[orders/market-and-limit-orders]]. The breakout whose high a buy-stop is supposed to sit above is [[trend/breakouts-and-macd]]. Costs that a gap fill still has to pay, on top of the worse price, are [[orders/fills-slippage-and-spread]].

:::summary
- A stop-market becomes a market order when the bar trades through the trigger. If the open is already through, the gap convention fills at the open, not at the trigger.
- A stop-limit becomes a limit, which can miss. A sell floor gaps through to a miss; a buy cap gaps through to a miss.
- On an entry at 100, a sell-stop at 95 and an open at 90, the simple return is −0.10, not −0.05. The cash gap is 5 units of account per unit.
- The same open with a floor at 94 does not sell. Protection that does not fill is still a position.
- O05 and O07 are the breakout pair, stop against stop-limit, with reported Sharpes −0.19 and −0.05. O06 and O08 are the protective pair, with reported Sharpes 0.00 and 0.02.
- Those rows are as reported in 2026 for the QuantJourney examples. This atlas has not re-run them. A smaller reported drawdown is not a reason to prefer the cap.
- The 5 percent distance in O06’s description is not a guaranteed loss of 5 percent once a bar can gap.
:::

## Exercises

:::exercise The gap fill {level=1 check="90"}
A sell stop-market rests at 95. The next bar opens at 90. Under the gap convention, what is the fill price? (Enter the fill price.)
:::solution
The open is already through the trigger, so the stop has become a market order and the fill is the open. The fill price is 90, not 95.
:::
:::

:::exercise Return from the entry {level=1 check="-0.1"}
The long was entered at 100 and the gap fill is 90. What is the simple return from entry to fill? (Enter the simple return.)
:::solution
\(90/100 - 1 = -0.1\). The trigger-priced return would have been \(-0.05\). [[#prop-gap]] subtracts them and gets \(-0.05\), which is not the question: the question is the return the convention actually books.
:::
:::

:::exercise A floor the open has beaten {level=1 check="0"}
A sell stop-limit has trigger 95 and limit 94. The bar opens at 90, with high 92. Enter 0 if the order misses, and enter the fill price otherwise.
:::solution
The open is strictly below 94, so case 3 of [[#alg-stop]] records a miss. The high 92 never gets back to the floor. Enter 0.
:::
:::

:::exercise A breakout that trades up through the stop {level=2 check="105"}
A buy stop-market rests at 105. The bar opens at 103, with high 108 and low 102. What is the fill price? (Enter the fill price.)
:::solution
The open is below the trigger and the high is above it, so this is the touch case, not the gap case. The fill is the trigger. The fill price is 105.
:::
:::

:::exercise The breakout gaps {level=2 check="110"}
A buy stop-market rests at 105. The next bar opens at 110. What is the fill price under the gap convention? (Enter the fill price.)
:::solution
The open is already above the trigger, so the buy stop-market fills at the open. The fill price is 110. A cap at 106 would have missed instead; this question has no cap.
:::
:::

:::exercise How much the gap cost, in cash {level=2 check="5"}
Entry 100, sell stop-market at 95, open 90, fill at 90. How many fewer units of account per unit does the seller receive than a fill at the trigger would have paid? (Enter that positive difference.)
:::solution
A fill at 95 would have received 95. The gap fill receives 90. The difference is \(95 - 90 = 5\) units of account per unit. The simple-return difference is \(-0.05\), which is that cash gap divided by the entry 100. The question asks for the cash gap, 5.
:::
:::

:::exercise Two bars, one 5 percent stop {level=3 check="93"}
A long is entered at 100 with a day sell stop-market at 95, a 5 percent distance. Bar 1 opens at 101, with high 104, low 96 and close 102. Bar 2 opens at 93, with high 96, low 92 and close 94. The stop is still live at the start of bar 2 if bar 1 did not fill it. What is the fill price? (Enter the fill price.)
:::hint
A low strictly above the trigger does not fire a sell-stop. An open at or below the trigger fills at the open, even if the high later trades back above the trigger.
:::
:::solution
Bar 1 has low 96, which is above 95, so the stop does not trigger. The close 102 is just a close. Bar 2 opens at 93, and \(93 \le 95\), so the gap convention fills at the open. The fill price is 93. The simple return from the entry is \(93/100 - 1 = -0.07\), worse than \(-0.05\) and better than the open-at-90 case, because this open stopped 3 units through the trigger rather than 5. The high 96 on bar 2 does not pull the fill back to 95.
:::
:::

:::exercise Which bar survives the cap {level=3 check="105"}
A buy stop-limit has trigger 105 and limit 106. Bar A opens at 107, with high 109, low 106 and close 108. Bar B opens at 104, with high 105.5, low 103 and close 105. The bars are separate experiments, not a sequence. On the bar that fills, what is the fill price? (Enter the fill price.)
:::hint
Compare each open with the cap before you look at the high. An open above 106 is a miss. An open below the trigger, with a high that reaches the trigger, fills at the trigger, because the trigger sits inside the cap.
:::
:::solution
Bar A opens at 107, which is strictly above the cap 106. Case 4 of [[#alg-stop]] records a miss. The low 106 equals the cap, but the rule does not go on to salvage a fill after an open through the cap; the first matching case is the miss.

Bar B opens at 104, below the trigger, and the high 105.5 is at or above 105. The fill is the trigger, 105, which is inside the cap because \(105 \le 106\). The fill price is 105. The high 105.5 is not the fill: a touch buy does not pay the high. Had the high been only 104.5, the order would have missed, because the trigger would never have printed and the open was not already inside \([105, 106]\).
:::
:::
