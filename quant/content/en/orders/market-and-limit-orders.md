A weight is a fraction of net asset value. It says nothing about the price at which a position appears, or about whether a position appears at all. Between the weight and the position sits an **order**: a message that maps the path still to come onto a fill, a cancel, or a miss. The map is part of the definition of the research. It is not a forecast, and writing it down is not an instruction to send it to a broker.

Two messages cover the daily-bar cases in this chapter. A **market order** asks to trade against liquidity that is already resting. On a daily bar the book is not observed, so the simulator has to name the price it will pretend that liquidity had. A **limit order** names the worst price it will accept, and it fills only if the path trades there. The second rule sounds cautious. Under the convention most daily bars actually use, it is also optimistic, and that optimism is one place a perfect-looking win rate comes from.

Nothing on this page is advice to buy, sell or hold any security, fund or rule. Illustrative prices are invented, except when a sentence names Path A or a library row. Path A’s closes are \(100, 102, 101, 104, 103, 107, 106, 110\).

## An order is a function of the path

A signal dated \(t\) may use prices up to the decision at \(t\). Whatever it earns, it earns after \(t\). [[markets/prices-and-bars]] makes the close of a bar the usual decision price, and [[trend/moving-averages]] shows one way to turn those closes into a sign. Neither object is an order. A moving-average cross can be sent as a market order, as a limit, or not sent at all if the limit is never touched. Those are different functions, and a backtest that does not say which one it used has not finished specifying the rule.

:::definition Order {#def-order}
An **order** is a function from a future price path to an outcome: a fill at a stated price and quantity, a cancel, or a miss. The function may depend on a limit price, a trigger, a quantity and a **time in force**, but only through a convention the simulator states in advance. A *day* order that has not filled by the end of its bar becomes a cancel. A *good-till-cancelled* order that has not filled is a miss on that bar and remains live. The order is not a weight and not a forecast.
:::

The three outcomes are easy to blur in ordinary language. A miss means the path did not produce a trade and the message is still governed by its time in force. A cancel means the message is dead, whether because it expired or because another message killed it. A fill means a price and a quantity are now a position. Profit and loss start at the fill price, not at the decision price, unless the convention has forced those two prices to be the same.

:::definition Market order, daily bar {#def-market}
A **market order** requests an immediate trade against resting liquidity. When a book is visible, a market buy pays the **ask** (the lowest resting sell limit) and a market sell receives the **bid** (the highest resting buy limit). The **spread** is ask minus bid. A daily bar does not contain the bid or the ask. On a daily bar the simulator must name the fill price. This chapter allows three named clocks, and no unnamed one: the next bar’s open, the next bar’s close, or the decision close plus a stated slippage. A fill at the decision close itself uses a price the decision has already seen; it is a different experiment from a fill after \(t\), and it has to be labelled as such.
:::

Slippage as a model of its own, and the half-spread as a number subtracted from every market fill, are the work of [[orders/fills-slippage-and-spread]]. Here “decision close plus slippage” only means that the specification writes a number down. If it does not, this chapter does not invent one.

:::definition Limit order and the range convention {#def-limit}
A **buy limit** at \(\ell\) is an instruction to buy at a price no worse than \(\ell\). A **sell limit** at \(\ell\) is an instruction to sell at a price no worse than \(\ell\). On a daily bar, the **optimistic range convention** fills either order at \(\ell\) when \(\ell\) lies in the closed interval from the bar’s low \(L\) to its high \(H\), and otherwise records a miss on that bar. The fill is all or nothing: this chapter does not split the quantity across a queue. The convention is optimistic because a single print at \(\ell\), at the back of a queue, is treated as a fill of the whole order at \(\ell\).
:::

The range convention is not the only rule a person could write, and it is not what a marketable limit does on a visible book. If the entire bar sits strictly below a buy limit, every print is a better buy than \(\ell\), but \(\ell\) itself is not in \([L, H]\), so the range convention records a miss. A *marketable-open* alternative would fill that buy at the open whenever the open is already at or below \(\ell\). We do not use that alternative unless a sentence says so. Mixing the two inside one backtest, without saying so, changes the function.

:::quiz
A buy limit rests at 98. The next bar has low 99 and high 103. Under the optimistic range convention, what does the order do on that bar?
- [ ] It fills at 98, because every trade in the bar was a better price than 98
- [x] It misses, because 98 is not between the low and the high
- [ ] It fills at 99, the low of the bar
- [ ] It becomes a market order and fills at the close
:::solution
The range convention fills a limit only when the limit price itself lies in the bar’s range, and then it fills at that limit. Here 98 is strictly below the low, so the outcome on this bar is a miss. Filling at the low, or treating a better bar as a marketable fill, would be a different convention.
:::
:::

## What the fill price is allowed to be

The range convention has a small piece of arithmetic attached to it, and the arithmetic is where a “win” can be manufactured out of a denominator.

:::proposition Fill-to-close return {#prop-ftc}
Let a bar have low \(L\), high \(H\) and close \(C\), and let a buy limit rest at \(\ell > 0\). Under the optimistic range convention the order fills if and only if \(L \le \ell \le H\), and the fill price is \(\ell\). If it fills, the simple return from the fill to that bar’s close is \(C/\ell - 1\), which is positive if and only if \(C > \ell\). A second buy limit at \(\ell' < L\) does not fill, so it contributes no trade. A win rate whose denominator is the number of fills can therefore equal 1 on a sample in which every *filled* order happened to be scored on an exit above its fill, while every missed order is invisible to that rate.
:::

:::proof
By [[#def-limit]], \(\ell \in [L, H]\) is necessary and sufficient for a fill, and the price of that fill is \(\ell\), not \(C\) and not \(L\). The simple return from a positive price \(\ell\) to \(C\) is \(C/\ell - 1\) by definition, and the sign is the sign of \(C - \ell\). If \(\ell' < L\), then \(\ell' \notin [L, H]\), so the second order misses on this bar. A miss is not a fill. Any statistic that divides by the number of fills drops it from both the numerator and the denominator. Hence a sample whose filled exits all satisfy \(C > \ell\), or the analogous inequality at whatever later price the study uses to score the trade, has win rate 1 on fills even if other signals never traded. The rate says nothing about the missed paths, and it does not determine the compound growth of the book.
:::

The proposition does *not* say that every limit backtest has a win rate of 1. A fill at \(\ell\) above the scoring price is a loss. The proposition says where a reported rate of 1 has to be coming from: the set of paths that were allowed into the denominator. That is a fill assumption.

:::algorithm Three clocks for a market order {#alg-market}
The inputs are a decision close, the next bar’s open and close, and one named convention.
1. If the convention is *next open*, the fill price is the next open.
2. If the convention is *next close*, the fill price is the next close.
3. If the convention is *decision close plus slippage*, the fill price is the decision close plus a stated buy slippage, or minus a stated sell slippage. The slippage may be zero, but zero must be written down.
4. If none of the three is named, the backtest has not specified a fill. This chapter does not supply a default.
:::

Same-bar fill, at the decision close, is not on the list. It can be studied as a broken clock, the way [[backtesting/timing-costs-and-biases]] studies it. It is not one of the three honest daily clocks above, because the decision has already used that close.

:::example Two limits on one bar {#ex-touch}
Take an invented bar with low 99, high 103 and close 101. A day buy limit rests at 100, and another rests at 98. Apply the range convention. Then replace the close by 99, keep the same low and high, and score the limit at 100 again from fill to close.
:::solution
The interval \([99, 103]\) contains 100 and does not contain 98. The buy limit at 100 fills at 100. The buy limit at 98 misses. On the first close, the fill-to-close simple return is \(101/100 - 1 = 0.01\).

On the second bar the range still contains 100, so the limit still fills at 100. The fill-to-close simple return is \(99/100 - 1 = -0.01\). The touch rule is the same. The sign of the return is the sign of close minus limit, as [[#prop-ftc]] says. A limit fill is not automatically a win.
:::
:::

:::example Three clocks on Path A {#ex-clocks}
A market buy is decided at Path A’s close 104, and the position is flattened at Path A’s later close 110. The bar that closes at 103 is the next bar. Its open, high and low are not in Path A; take them to be 105, 105 and 102, so the bar is a possible OHLC with that close. Compute the simple return from each of the three clocks to the exit at 110. For the third clock take slippage of zero, and label it as a same-decision-price fill rather than as “next close”.
:::solution
Next open fills at 105. The simple return is \(110/105 - 1 = 0.047619\), rounded half up to six decimal places (the exact value is \(5/105\)).

Next close fills at 103. The simple return is \(110/103 - 1 = 0.067961\) to six decimal places.

Decision close plus zero slippage fills at 104. The simple return is \(110/104 - 1 = 0.057692\) to six decimal places. This clock uses the price the decision has already seen. It is not the next-close clock, and on this path it is not even the flattering one: the next close is 103, below the decision close, so waiting for the next close *improves* the buy. A same-bar fill is still the wrong clock when the rule claimed to decide at the close and then trade. The gap between the next-close return and the next-open return is \(0.067961 - 0.047619 = 0.020342\) at six decimal places. One sentence in the specification moves the result by about two percentage points on a path that only runs from just above 100 to 110.
:::
:::

:::intuition The limit selects the path, and the path selects the limit
A buy limit below the market is a wish to trade only if price comes down. The paths on which it fills are not a random sample of the paths on which the signal was true. They are the paths that traded at \(\ell\). Some of those continue down, which is the loss in the second bar of [[#ex-touch]]. Some never come down at all, which is the miss at 98. A win rate on fills keeps the first group when they happen to recover, and it deletes the second group. That deletion is the fill assumption. It is not a property of the asset.
:::

:::example A sell limit is the same interval {#ex-sell}
An invented long was filled earlier at 100. The exit bar has low 101, high 107 and close 104. A day sell limit rests at 106, and a second rests at 108. Apply the range convention, and compute the simple return from the entry fill to the exit fill when there is one.
:::solution
The interval \([101, 107]\) contains 106 and does not contain 108. The sell limit at 106 fills at 106, and the simple return from the entry is \(106/100 - 1 = 0.06\). The sell limit at 108 misses; there is no exit fill and no return to score. Relative to selling at this bar’s close of 104, the fill at 106 receives \(106 - 104 = 2\) extra units of account per unit of the asset. That two-unit gap is the optimism: the convention assumes the whole exit traded at 106 because the high printed 107, with no queue and no partial fill.
:::
:::

:::example A win rate of 1 with a modest account {#ex-wins}
Four invented day-order signals each place a buy limit. Three fill and, by the exits we are about to state, each filled trade is a win. The fourth misses. Score win rate on fills and on signals, the profit factor, and the cash path of an account that starts at 100 and trades one unit. Separately, note a missed rally from 100 to 110.
:::solution
The three fills buy one unit at 100 and sell, in turn, at 102, at 101 and at 103. Cash goes \(100 \to 102 \to 103 \to 106\). The compound simple return is \(106/100 - 1 = 0.06\). Gross gains are \(2 + 1 + 3 = 6\). Gross losses are 0, so the profit factor, gains divided by the absolute losses, is infinite. The win rate on fills is \(3/3 = 1\).

The fourth signal is a miss, so the win rate on signals, counting a miss as not a win, is \(3/4 = 0.75\). The missed path is a bar whose low is 100 and whose close is 110, with the buy limit resting at 99. The range does not contain 99, so the range convention buys nothing. A next-close market buy decided at 100 and flattened at 110 would have had simple return \(0.10\), larger than the whole limit account’s \(0.06\). None of that \(0.10\) enters the limit account’s win rate. The rate of 1 is the denominator. We chose the three exits to be wins so the arithmetic would be obvious. It is not a reconstruction of any published trade list.
:::
:::


Bar 1 of the figure is the worked bar: low 99, high 103, close 101. Drag the limit. Under the optimistic range convention the bar fills if and only if the limit lies between the low and the high, and the fill price is the limit. A limit at 100 fills. A limit at 98 misses, because 98 is not in the range. Buy and sell use the same range test.

:::widget barlimit
limit: 100
side: buy
caption: Drag the horizontal line. A bar is marked as a fill only when the line sits between that bar’s low and high. Bar 1 is low 99, high 103, close 101. At 100 it fills, and the fill-to-close simple return of a buy is 0.0100. At 98 it misses. The convention is optimistic and it is not a broker.
:::
:::widget plot
f: 101 - 2*sin(x)
x: 0, 6.28
y: 96, 106
hlines: 100; 98
caption: A toy path through one bar, low 99 and high 103. The line at 100 is crossed, so a buy limit at 100 fills under the range convention. The line at 98 is not touched, so a buy limit there is a miss. A drawing, not a market.
:::

## Two reported limit backtests

O03, Limit RSI Dip, is a passive buy limit below the close on weak RSI, daily bars, 25 years. O04, Limit Trend Pullback, waits for a 1 percent pullback in an uptrend and enters with a limit, also daily, 25 years. The figures that follow are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests. They are not forecasts and not advice.

O03 reports a total return of +94.66 percent, a CAGR of +2.70 percent, a reported Sharpe of 0.14, a maximum drawdown of −19.09 percent, a win rate of 100 percent and an infinite profit factor. Infinite means the reported gross losses were zero: no losing unit was counted in whatever unit that page calls a trade. A win rate of 100 percent is the same statement about the denominator. Neither number says that every path made money. The equity path still has a maximum drawdown of −19.09 percent, and the CAGR is +2.70 percent, not a picture of a sure thing. The 100 percent win rate is a fill-and-accounting fact of that reported backtest. It is not good news.

O04 reports a total return of +56.83 percent, a CAGR of +1.82 percent, a reported Sharpe of −0.04, a maximum drawdown of −6.85 percent, a win rate of 48.2 percent and a profit factor of 1.36. The win rate is not 100 percent. A different limit, a different reported row. We have not verified how either Sharpe was annualised; both are “the reported Sharpe”, not a claim that the library used the mean-over-standard-deviation convention of the performance chapters. A positive CAGR beside a slightly negative reported Sharpe is allowed in a reported row, and it is not a puzzle to be traded away. The comparison is the lesson. There is no such thing as “the” RSI dip or “the” pullback once the order changes, and neither row is a reason to prefer one message to the other.

A 1 percent pullback is only a distance. On an invented decision close of 100 it would sit at 99. Whether that limit fills is still the question in [[#def-limit]], and O04’s row is what one published engine reported over 25 years, not the toy bar.

:::warning A win rate of 100 percent
Do not read O03’s win rate as evidence that the rule cannot lose. The profit factor is infinite because the reported losses were zero, and the same row shows a drawdown of −19.09 percent and a CAGR of only +2.70 percent. [[#ex-wins]] builds a miniature of that shape on purpose: every fill wins, the missed rally never enters the rate, and the account’s growth is ordinary. Ask what a win was, whether a miss was in the denominator, and what the drawdown did. The performance definitions live in [[performance/win-rate-and-profit-factor]].
:::

:::application Reading the row, not the slogan
Three checks keep a limit backtest from turning into a slogan. First, name the clock: next open, next close, or decision price plus a written slippage, as in [[#alg-market]]. Second, name the touch rule, and say whether a bar that never prints the limit can still fill because it traded through it. Third, name the win unit. If the unit is a filled round trip, a miss is not a loss, and a win rate near 1 can sit on a modest CAGR. O03 fails the slogan and passes the checks only in the weak sense that the catalogue printed the awkward columns next to the flattering ones. The awkward columns are part of the result.
:::

:::remark Queues and partial fills
Even a bar that truly printed \(\ell\) may have printed one unit of it, in front of a queue this order had not joined. The range convention fills the whole quantity at \(\ell\) anyway. That is a second optimism, separate from the adverse selection that [[orders/fills-slippage-and-spread]] takes up: not only *whether* a touch is a fair sample, but *how much* of the order the touch could have carried. A large order and a one-lot illustration do not share a fill function. This chapter’s examples are one-unit illustrations.
:::

:::quiz
What is the right reading of O03’s reported win rate of 100 percent and infinite profit factor?
- [ ] The rule cannot lose, so the drawdown column must be a printing error
- [ ] The CAGR of +2.70 percent is a forecast of future growth
- [x] No losing trade was counted in the reported unit, which is a fact about fills and accounting, not evidence that the equity path could not fall
- [ ] A passive limit always fills above the close, so the win rate is an identity
:::solution
[[#prop-ftc]] and [[#ex-touch]] show that a limit fill can lose money from fill to close. O03’s infinite profit factor means the reported gross losses were zero, and the same row reports a maximum drawdown of −19.09 percent and a CAGR of +2.70 percent. The perfect win rate is not good news and not a forecast. This atlas has not re-run the backtest.
:::
:::

:::history
In 1985 Lawrence Glosten and Paul Milgrom modelled the bid–ask spread as compensation for trading with someone who may be better informed. In that model a passive fill is not a free improvement on a market order: the fact that the other side traded with the resting limit is itself information. The range convention in [[#def-limit]] ignores that selection. It fills whenever the bar’s range contains the limit, as if the touch were a gift.
:::

## Where this leads

A stop is the next message: it waits for a trigger and then becomes either a market order or a limit. That is [[orders/stops-and-stop-limits]]. The half-spread, a linear cost and the reason a passive fill is a selected sample are [[orders/fills-slippage-and-spread]]. The win-rate and profit-factor words used on O03 and O04 are defined as statistics in [[performance/win-rate-and-profit-factor]], and the bar that made the range convention possible is the OHLC bar of [[markets/prices-and-bars]].

:::summary
- An order is a function from a future path to a fill, a cancel or a miss. It is not a weight and not a forecast.
- On a daily bar a market order needs a named fill clock: next open, next close, or decision close plus a stated slippage.
- The optimistic range convention fills a limit at its limit price when that price lies between the bar’s low and high, and otherwise records a miss.
- A win rate on fills drops every miss. It can equal 1, and the profit factor can be infinite, while the account’s growth stays modest.
- O03 reports a 100 percent win rate, an infinite profit factor, a CAGR of +2.70 percent and a maximum drawdown of −19.09 percent. The perfect win rate is a fill assumption, not good news.
- O04, a different limit rule, reports a win rate of 48.2 percent, a CAGR of +1.82 percent and a reported Sharpe of −0.04. The order is part of the result.
- These library figures are as reported in 2026 for those QuantJourney examples. This atlas has not re-run them, and they are not advice.
:::

## Exercises

:::exercise Touch, and the price {level=1 check="100"}
An invented bar has low 99 and high 103. A buy limit rests at 100. Under the optimistic range convention, what is the fill price? (Enter the fill price.)
:::solution
100 lies between 99 and 103, so the order fills, and the range convention fills it at the limit. The fill price is 100.
:::
:::

:::exercise A limit the bar never prints {level=1 check="0"}
On the same bar, low 99 and high 103, a buy limit rests at 98. Enter 0 if the order misses on that bar, and enter the fill price otherwise.
:::solution
98 is strictly below the low, so 98 is not in the range. The range convention records a miss. Enter 0. A marketable-open rule could do something else if the open were below 98; this question does not use that rule.
:::
:::

:::exercise From the fill to the close {level=1 check="0.01"}
A buy limit fills at 100. The bar closes at 101. What is the simple return from the fill to the close? (Enter the simple return.)
:::solution
\(101/100 - 1 = 0.01\). The return is positive because the close is above the fill, which is the sign test in [[#prop-ftc]]. It is not a recommendation to place the limit.
:::
:::

:::exercise Next open on the Path A exit {level=2 check="0.047619"}
Use the market buy in [[#ex-clocks]]. The fill clock is the next open, at the invented price 105, and the exit is Path A’s close 110. What is the simple return, rounded half up to six decimal places? (Enter the simple return.)
:::solution
\(110/105 - 1 = 1/21 = 0.047619047\ldots\), which is 0.047619 to six decimal places. The decision close 104 is not the fill.
:::
:::

:::exercise How much the clock moved the return {level=2 check="0.020342"}
On the same exit at 110, the next-close fill is Path A’s 103 and the next-open fill is 105. How much larger is the next-close simple return than the next-open simple return, after each return has been rounded half up to six decimal places? (Enter the difference.)
:::solution
The next-close return is \(110/103 - 1 = 0.067961\) to six decimal places. The next-open return is 0.047619. The difference is \(0.067961 - 0.047619 = 0.020342\). One named clock, not a change of signal, produces that gap.
:::
:::

:::exercise Signals, not just fills {level=2 check="0.6"}
Five signals each place a buy limit. Three of them fill, and each of those three fills is scored as a win. The other two miss. What is the win rate on signals if a miss counts as not a win? (Enter the win rate as a decimal.)
:::solution
The denominator is the five signals, not the three fills. The numerator is the three wins. The win rate on signals is \(3/5 = 0.6\). The win rate on fills would be \(3/3 = 1\), which is a different statistic and the one [[#ex-wins]] warns against reading alone.
:::
:::

:::exercise A limit that rests for three bars {level=3 check="0.07"}
A good-till-cancelled buy limit at 100 is placed before bar 1. Bar 1 has low 101, high 104, close 103. Bar 2 has low 99, high 102, close 101. Bar 3 has low 100, high 108, close 107. The range convention is in force, and a fill on an earlier bar is not re-filled. What is the simple return from the fill price to the close of bar 3? (Enter the simple return.)
:::hint
The order fills on the first bar whose range contains 100, at 100, and only then is there a position to mark at bar 3’s close. A bar whose low is 101 does not contain 100.
:::
:::solution
Bar 1 has low 101, so 100 is not in the range. The order misses and, being good-till-cancelled, remains live. Bar 2 has range \([99, 102]\), which contains 100, so the order fills at 100. Bar 3 is after the fill; it does not create a second fill. The simple return from 100 to the close 107 is \(107/100 - 1 = 0.07\).

The cash gap versus buying bar 2’s close is \(101 - 100 = 1\) unit of account per unit. That one unit is the optimism of the touch, not a second trade. The return 0.07 already uses the fill at 100 as its entry.
:::
:::

:::exercise Range convention against a marketable open {level=3 check="97"}
An invented bar opens at 97, with high 97.5, low 96 and close 96.5. A buy limit rests at 98. The range convention records one outcome. An alternative *marketable-open* convention fills a buy limit at the open whenever the open is already at or below the limit. What fill price does the marketable-open convention record? (Enter the fill price.)
:::hint
Ask two separate questions. Does the range contain 98? And is the open already a legal price for a buy limit at 98? The question asks for the second convention’s price.
:::
:::solution
The high is 97.5, so 98 is not in \([96, 97.5]\). The range convention records a miss, even though every print in the bar is a better buy than 98. That is deliberate: the range convention demands that the limit price itself be inside the bar.

The marketable-open convention sees an open of 97, and \(97 \le 98\), so it fills at the open. The fill price is 97. The two conventions disagree by the whole trade: one has no position, the other is long at 97. A specification that does not say which function it used has not specified the order. This disagreement is not a reason to trade either function.
:::
:::
