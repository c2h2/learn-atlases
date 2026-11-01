Two simulators can name the same order and book different fills. One pays the ask. One fills at the mid. One fills a passive limit whenever the bar’s range contains it, and then scores a win only on the paths that filled. The gap between those ledgers is the subject of this chapter: the half-spread, a linear slippage rate, and the selection built into a passive fill. The order is still a function from a future path to a fill, a cancel or a miss. Putting a cost on the fill does not turn the function into advice, and it does not say how to route a live order to a broker. A backtest’s ledger is not a broker.

O03’s reported win rate of 100 percent returns here as a fill fact, not as a result to admire and not as a full retelling of limit orders. The trade-off between paying impact now and waiting, from Almgren and Chriss in 2001, is stated and not derived. Illustrative prices are invented. The library figures are attributed when they appear.

## Half the spread, written as arithmetic

When a book is visible, the **mid** is the average of the bid and the ask. The **half-spread** is half of ask minus bid. A market buy lifts the ask, which is mid plus the half-spread. A market sell hits the bid, which is mid minus the half-spread. On the numbers used throughout this chapter the mid is 100 and the half-spread is 0.01, so the bid is 99.99 and the ask is 100.01. One cent per unit is the one-way cost of crossing. A daily bar does not print the bid or the ask. A specification that wants this cost has to put it back by hand.

:::definition Implementation shortfall on one fill {#def-shortfall}
Let \(D\) be the decision price, often the mid at the decision, and let \(F\) be the fill. For a buy, the **implementation shortfall** per unit is \(F - D\). For a sell, it is \(D - F\). Positive shortfall means a worse fill than the decision price. A miss has no fill and therefore no shortfall; it has an opportunity the win rate may be about to ignore.
:::

:::definition Linear cost {#def-linear}
A one-way **linear cost** at rate \(c \ge 0\) charges \(c\) times the notional traded, in units of account, on that leg. A round trip that buys notional \(N\) and sells notional \(N\) charges about \(2cN\), and exactly \(2cN\) when both legs are charged on the same \(N\). The specification must say whether \(c\) already contains the half-spread or sits on top of it. Using both, silently, double-counts the spread.
:::

With mid \(m = 100\) and half-spread \(h = 0.01\), the rate that matches the half-spread on the mid notional is \(c = h/m = 0.0001\). Then \(c \times m = 0.01\), the one cent. This \(c\) is a translation of the spread into a fraction of notional. It is not a measured impact coefficient.

:::proposition Round trip at an unchanged mid {#prop-rt}
Suppose the mid \(m > 0\) does not move, the half-spread is a constant \(h\) with \(0 \le h < m\), and a market buy is followed by a market sell of one unit. The buy fills at \(m+h\) and the sell at \(m-h\). The cash loss is \(2h\). The simple return on the purchase price is
\[
\frac{m-h}{m+h} - 1 = -\frac{2h}{m+h}.
\]
With \(m = 100\) and \(h = 0.01\), the cash loss is 0.02 and the simple return equals \(-0.000200\) to six decimal places.
:::

:::proof
Cash out is \(m+h\) and cash in is \(m-h\), so the change is \((m-h) - (m+h) = -2h\). The simple return on the cash outlay is \((m-h)/(m+h) - 1\). The numerator of that difference is \((m-h) - (m+h) = -2h\), and the denominator is \(m+h\), which is the displayed identity. Substitute \(m = 100\) and \(h = 0.01\): the cash loss is \(0.02\), and the return is \(-0.02/100.01 = -0.00019998\ldots\). Rounded half up to six decimal places, that is \(-0.000200\).

The linear rate \(c = h/m\) charges \(c(m+h) + c(m-h) = 2cm = 2h\) if each leg is charged on its own fill notional, the same 0.02. Charging \(c\) on the mid notional twice is also \(2cm = 2h\). The simple return is not exactly \(-2c\). Here \(-2c = -0.0002\), while \(-2h/(m+h)\) is a hair smaller in magnitude, because the return divides by the ask rather than by the mid. The two models agree on the cash loss and disagree in the sixth decimal of the return. A specification should say which one it compounds.
:::

:::algorithm What the ledger is allowed to subtract {#alg-fill}
This is a backtest’s ledger, not a route to a broker.
1. Name the decision price \(D\). In this chapter it is the mid.
2. If the order is a market buy and the cost model is the half-spread, the fill is \(D + h\), plus any extra slippage the specification has written in units of price. A market sell fills at \(D - h\), minus that extra slippage.
3. If the cost model is only the linear rate \(c\), and \(c\) is declared to *include* the spread, do not also add \(h\) to the fill. Charge \(c\) times notional once per leg.
4. If a passive limit fills under the range convention of [[orders/market-and-limit-orders]], the fill is the limit. Do not subtract \(h\) again. The limit price is already the fill. Adverse selection is not repaired by taxing the fill a second time; it is reported by saying which paths filled.
5. If the text does not say whether \(c\) contains \(h\), the cost model is unfinished. Do not guess.
:::

:::example One cent each way {#ex-rt}
Mid 100, half-spread 0.01, mid unchanged. Buy one unit at the market and sell it back at the market. Compute the two fill prices, the cash loss, and the simple return to six decimal places.
:::solution
The buy fills at \(100 + 0.01 = 100.01\). The sell fills at \(100 - 0.01 = 99.99\). Cash out 100.01, cash in 99.99, loss \(0.02\), which is one cent each way. By [[#prop-rt]] the simple return is \(-0.02/100.01 = -0.00019998\ldots\), or \(-0.000200\) to six decimal places. The implementation shortfall on the buy is \(100.01 - 100 = 0.01\). On the sell it is \(100 - 99.99 = 0.01\). The round trip’s shortfall is the sum, 0.02, because the mid did not move and so contributed nothing of its own. A limit buy that had rested at 100 and filled there would have shortfall zero against this mid, and would still be exposed to the selection in the next section. Zero shortfall is not a free lunch.
:::
:::

## A cost that repeats

A single round trip at a fraction \(0.0002\) of net asset value looks negligible. A book that does it every session is multiplying by a number slightly below 1, once per session. The product is the content of “trades twice a day”, once the sentence has said whether “twice” means two one-way legs or two round trips.

:::proposition Costs multiply {#prop-cost}
Let a book start at net asset value \(V_0\). On day \(t\) the mid move multiplies value by a gross factor \(G_t > 0\) before costs, and a round-trip cost then multiplies the result by a constant factor \(1-\delta\) with \(0 \le \delta < 1\). After \(T\) days
\[
V_T = V_0 \Bigl(\prod_{t=1}^{T} G_t\Bigr) (1-\delta)^T.
\]
If every mid move is zero, then \(G_t = 1\) and \(V_T = V_0 (1-\delta)^T\). One day with gross simple return \(g\), so \(G = 1+g\), has net simple return \((1+g)(1-\delta) - 1 = g - \delta - g\delta\).
:::

:::proof
After one day, \(V_1 = V_0 G_1 (1-\delta)\) by the two multiplications in the hypothesis, applied in that order. Suppose the formula holds up to day \(T-1\). Day \(T\) multiplies by \(G_T(1-\delta)\). The factors \(1-\delta\) do not depend on \(t\), so they collect as \((1-\delta)^T\), and the gross factors collect as the product. If \(G_t = 1\) for every \(t\), the product is 1. The one-day identity is expansion: \((1+g)(1-\delta) - 1 = 1 + g - \delta - g\delta - 1\). When \(g = 0\) the net simple return is \(-\delta\), with no cross term. The cross term \(g\delta\) is why a sloppy “subtract \(c\) from the CAGR” is an approximation. The product above is the exact ledger for this model.
:::

Take \(\delta = 2c = 0.0002\), the linear round trip when \(c = 0.0001\), and \(T = 252\) sessions with no mid move. Then \(100 \times (1-0.0002)^{252} = 95.0844\ldots\), which rounds half up to 95.08 to the cent. That is the whole-book version of one round trip a day: two one-way trades, the natural reading of “trades twice a day” if each trade is a crossing. It is an invented cost schedule, not a market’s measured drag.

:::example Two hundred and fifty-two unchanged mids {#ex-year}
Start from net asset value 100. The mid stays 100 and the half-spread stays 0.01. Compound one market round trip per session for 252 sessions, using the exact spread factor \(99.99/100.01\). Compare with the linear approximation \((1-0.0002)^{252}\). Then say what changes if “twice a day” is misread as two round trips.
:::solution
One round trip multiplies value by \(99.99/100.01\). From 100, the first session ends at \(100 \times 99.99/100.01 = 99.980002\) to six decimal places. The second ends at 99.960008 to six decimal places. After 252 sessions the product is \(100 \times (99.99/100.01)^{252} = 95.0849\ldots\), which rounds half up to 95.08 to the cent.

The linear factor \((1-0.0002)^{252} \times 100 = 95.0844\ldots\), also 95.08 to the cent. The one-step rates differ by about \(2 \times 10^{-8}\), which is \(2h/(m+h)\) against \(2c\). They agree on the cent over a year of sessions and are not the same function. A paper that compounds one and reports the other has changed the sixth decimal of a one-day return and, over 252 days, still the dust below a cent on a start of 100. On a larger book the dust scales. The specification names the factor.

Two round trips a session are four one-way legs. The linear daily fraction is \(4 \times 0.0001 = 0.0004\). Under the spread model the 252-session product of the squared factor, from 100, ends at 90.41 to the cent. “Trades twice a day” without a definition of a trade is the difference between 95.08 and 90.41 on this invented, flat mid. Neither number is a forecast.
:::
:::

:::widget plot
f: 0.05 - 0.001*x
x: 0, 80
hlines: 0
caption: Invented net growth \(0.05 - 0.001x\) against annual one-way turnover \(x\). The gross 0.05 and the cost 0.001 are invented, not library figures and not a forecast. The line crosses zero at turnover 50. Past that point the invented edge has been spent on costs.
:::

:::example An invented edge against turnover {#ex-turn}
Use the widget’s invented ledger, net \(= 0.05 - 0.001\,\tau\), where \(\tau\) is annual one-way turnover as a multiple of net asset value and 0.001 is an invented one-way cost, ten times the 0.0001 that matched a one-cent half-spread on a mid of 100. Evaluate the net at \(\tau = 10\), at \(\tau = 50\), and at \(\tau = 504\), which is two one-way trades a session for 252 sessions.
:::solution
At turnover 10 the net is \(0.05 - 0.001 \times 10 = 0.04\). At turnover 50 it is \(0.05 - 0.05 = 0\). At turnover 504 it is \(0.05 - 0.001 \times 504 = 0.05 - 0.504 = -0.454\). The zero at 50 is the crossing on the figure. The \(-0.454\) says that a one-cent-style story told with a cost ten times larger, on a book that crosses twice a session all year, spends more than the invented gross. None of 0.05, 0.001 or \(-0.454\) is a library statistic. They are a picture of subtraction, not a published backtest.
:::
:::

## Fills are a selected sample

A passive buy is filled when a seller trades at the limit. Those are not a random subset of the bars on which the signal was true. Glosten and Milgrom’s 1985 account of the spread, the historical note of [[orders/market-and-limit-orders]], is the same selection told about a visible book: the spread compensates for the chance that the other side knows more. A daily-bar range convention ignores the compensation and still keeps the selection, because it fills only on the bars that touch the limit.

:::example Five next-returns, two of them filled {#ex-adv}
Five invented signals each place a buy limit. The next-bar simple returns, in order, are \(0.02\), \(0.01\), \(-0.03\), \(-0.01\) and \(0.04\). The limit fills only on the third and the fourth. Compute the unconditional mean of the five returns, the mean on the fills, and the mean on the misses.
:::solution
The sum of the five returns is \(0.02 + 0.01 - 0.03 - 0.01 + 0.04 = 0.03\), so the unconditional mean is \(0.03/5 = 0.006\).

The fills are \(-0.03\) and \(-0.01\). Their mean is \(-0.04/2 = -0.02\).

The misses are \(0.02\), \(0.01\) and \(0.04\). Their sum is \(0.07\) and their mean is \(0.07/3 = 0.023333\ldots\).

The paths that filled are the paths that went down. The paths that missed are the paths that went up. A win rate computed only on fills never sees \(0.02\), \(0.01\) or \(0.04\). If, on top of that, the study’s exit rule happened to score every fill as a win, the win rate on fills would be 1 while the mean next-return on fills in this toy is \(-0.02\). The toy’s exits are not specified beyond the next bar, so the win rate is not even defined here; the conditional mean is. Selection does not require a dramatic story. It requires a denominator that drops the misses.
:::
:::

O03, Limit RSI Dip, is the passive buy-limit on weak RSI, daily bars, 25 years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the total return is +94.66 percent, the CAGR is +2.70 percent, the reported Sharpe is 0.14, the maximum drawdown is −19.09 percent, the win rate is 100 percent and the profit factor is infinite. This atlas has not re-run the backtest. The figures are not a forecast and not advice.

Infinite profit factor means the reported gross losses were zero. A win rate of 100 percent is that statement about the denominator. [[#ex-adv]] is not a reconstruction of O03’s trades; it is the shape of a fill filter. The optimistic range convention fills the limit when the bar touches it, and a win statistic that keeps only fills deletes every signal the market never came down to. O03’s equity path still shows a maximum drawdown of −19.09 percent, and the CAGR is +2.70 percent, not a picture of a rule that cannot lose. The 100 percent win rate is a fill assumption. It is not good news.

A limit filled below the decision mid has negative shortfall by [[#def-shortfall]] and can still be followed by the negative returns in [[#ex-adv]]. Booking that shortfall as edge, and ignoring which bars filled, repeats the gift. [[#alg-fill]] already forbids subtracting the half-spread a second time.

:::warning Two gifts at once
The range convention fills a passive limit at the limit whenever the bar contains it. A cost model that then also treats that fill as earning the half-spread, with no missed bars and no selection, has handed the backtest two gifts. O03’s 100 percent win rate and infinite profit factor are what a generous denominator looks like in the summary columns, next to a drawdown of −19.09 percent and a CAGR of +2.70 percent. Do not stack \(h\) and a \(c\) that already contains \(h\). Do not read the win rate as a growth rate.
:::

:::intuition You meet the flow that wanted the other side
A resting buy is traded against when someone sells. In the toy, that is when the next return is negative. The half-spread is the visible price of liquidity; the conditional return is what a daily bar can still show. Impact, the subject of the next section, is a different cost. A specification can carry both.
:::

## Impact against waiting

In 2001 Robert Almgren and Neil Chriss posed execution as a trade-off between market impact and the risk of waiting. Trading the whole order immediately pays impact: the price moves against the order as it takes liquidity. Spreading the order out reduces that impact and leaves the residual size exposed to ordinary price moves. They derived schedules between a pure risk-minimising path and an aggressive one. This chapter does not re-derive the schedules, and it does not turn them into a procedure for slicing a live order.

What the research ledger needs is the corner a simple fill has quietly chosen. A market order filled at the next close, with no half-spread and no \(c\), assumes impact of zero and a wait of one bar, and it sets the fill equal to that close. Adding a constant half-spread keeps the wait and replaces zero impact with a constant. Neither corner is the interior schedule Almgren and Chriss characterised. Kyle’s 1985 linear relation between an informed order and the price move it causes is the ancestor of the impact term; we name it and do not fit a slope. A backtest that wants impact has to write a function. Until it does, the honest sentence is that impact was set to zero or to a constant.

The linear cost in [[#def-linear]] does not by itself make a faster schedule cost more than a slower one. A larger \(c\) for the aggressive case is a scenario, not an estimate. [[#ex-turn]] is that kind of scenario.

:::application The three numbers a cost line needs
A specification that has finished the fill writes three things. The half-spread \(h\), or an explicit statement that the book is not charged a spread. The linear rate \(c\), and whether it contains \(h\). The turnover the rule actually generates, in one-way notionals per year, so that [[#prop-cost]] has a \(\delta\) rather than a slogan. “Trades twice a day” is not yet a \(\delta\). [[#ex-year]] turned one reading into a factor of about 0.9508 over 252 flat sessions and another reading into about 0.9041. The timing biases that sit beside this ledger, including a fill at the decision close, are [[backtesting/timing-costs-and-biases]].
:::

:::quiz
Mid 100, half-spread 0.01, mid unchanged. A market buy is followed by a market sell of one unit. What is the cash loss?
- [ ] 0.01, the half-spread, because the sale earns it back
- [x] 0.02, the full spread: one cent to buy and one cent to sell
- [ ] Zero, because the mid did not move
- [ ] 0.04, because each leg pays the full spread
:::solution
[[#prop-rt]] gives cash loss \(2h = 0.02\). The unchanged mid contributes no profit to offset it. Each leg pays the half-spread, not the full spread, so the round trip pays the full spread once.
:::
:::

:::quiz
What does O03’s reported win rate of 100 percent add to the cost discussion?
- [ ] Proof that a passive limit has no cost, because every trade won
- [ ] A forecast that the next 25 years will repeat the CAGR of +2.70 percent
- [x] A reminder that a perfect win rate can be a property of which fills entered the denominator, compatible with a drawdown of −19.09 percent
- [ ] Evidence that the half-spread was zero in that backtest
:::solution
The catalogue reports the 100 percent win rate, an infinite profit factor, a CAGR of +2.70 percent and a maximum drawdown of −19.09 percent together. [[#ex-adv]] shows how a fill filter removes the paths that never touched the limit. None of this says the half-spread was zero, and none of it is a forecast. This atlas has not re-run O03.
:::
:::

:::history
In 2001 Robert Almgren and Neil Chriss set execution as a trade-off between market impact and the risk of waiting, and derived schedules between a pure risk-minimising path and an aggressive one. The constant half-spread and the linear rate in this chapter are not those schedules. They are the corners a ledger can actually write down without pretending to have solved the trade-off: a named wait, and an impact of zero or of a constant. Kyle’s linear impact model of 1985 is the ancestor of the impact side. We do not fit it, and we do not turn either paper into instructions for sending an order.
:::

## Where this leads

The clock, the cost and the bias list that a finished backtest has to declare together are [[backtesting/timing-costs-and-biases]]. The limit whose optimistic fill started the selection story is [[orders/market-and-limit-orders]]. Win rate and profit factor, including the infinite case, are statistics in [[performance/win-rate-and-profit-factor]]. A quantity grid still sits under the notional that \(c\) multiplies; that grid is [[orders/lots-contracts-and-intraday]].

:::summary
- A market round trip at an unchanged mid loses the full spread. With mid 100 and half-spread 0.01 the cash loss is 0.02 and the simple return is \(-0.000200\) to six decimal places.
- The matching linear rate on the mid is \(c = 0.0001\). Charging it and the half-spread together double-counts, unless the specification says \(c\) is extra.
- Costs multiply. One linear round trip a session for 252 flat sessions, \(\delta = 0.0002\), takes a start of 100 to about 95.08. Two round trips a session take the spread-model ledger to about 90.41. “Twice a day” has to say which.
- An invented gross of 0.05 minus an invented one-way cost of 0.001 times turnover is zero at turnover 50. That line is a picture, not a library result.
- Passive fills are a selected sample. In the five-return toy the unconditional mean is 0.006 and the mean on fills is \(-0.02\).
- O03 reports a 100 percent win rate, an infinite profit factor, a CAGR of +2.70 percent and a maximum drawdown of −19.09 percent. The win rate is a fill assumption, not good news.
- Almgren and Chriss in 2001 trade impact against waiting. A fill at the next close with a constant spread is one corner of that trade-off, not the derived schedule. These library figures are as reported in 2026; this atlas has not re-run them, and they are not advice.
:::

## Exercises

:::exercise The ask {level=1 check="100.01"}
The mid is 100 and the half-spread is 0.01. A market buy pays the ask. What is the fill price? (Enter the fill price.)
:::solution
The ask is mid plus half-spread: \(100 + 0.01 = 100.01\). The shortfall against the mid is 0.01 per unit.
:::
:::

:::exercise The round trip in cash {level=1 check="0.02"}
The mid stays 100 and the half-spread stays 0.01. One unit is bought at the market and sold at the market. What is the cash loss? (Enter the loss as a positive number.)
:::solution
Buy at 100.01, sell at 99.99. The cash loss is \(100.01 - 99.99 = 0.02\), which is \(2 \times 0.01\). The mid contributed nothing.
:::
:::

:::exercise A linear charge on a stated notional {level=1 check="2.5"}
The one-way rate is \(c = 0.0001\), declared to include the spread, and the notional of one leg is 25,000. What is the cost of that leg? (Enter the cost.)
:::solution
\(0.0001 \times 25{,}000 = 2.5\). Because \(c\) is declared to include the spread, the ledger does not add a half-spread on top. A second leg of the same notional would charge another 2.5.
:::
:::

:::exercise The return, not the cash {level=2 check="-0.000200"}
Mid 100, half-spread 0.01, mid unchanged, one market round trip. What is the simple return on the purchase price, rounded half up to six decimal places? (Enter the simple return.)
:::solution
The purchase price is 100.01 and the sale price is 99.99. The simple return is \(99.99/100.01 - 1 = -0.02/100.01 = -0.00019998\ldots\), which is \(-0.000200\) to six decimal places. The cash loss 0.02 is a different object: it is not yet divided by the ask.
:::
:::

:::exercise Two round trips in a session {level=2 check="0.0004"}
The linear rate is \(c = 0.0001\) per one-way leg, charged on the whole book. A session contains two round trips, hence four legs. What is the day’s cost as a fraction of net asset value? (Enter the fraction.)
:::solution
Each leg charges \(0.0001\). Four legs charge \(4 \times 0.0001 = 0.0004\). One round trip would have been \(0.0002\). The factor \(1 - 0.0004\) is what [[#prop-cost]] would then multiply by, if the mid factor \(G_t\) is applied as well. The question asks only for the fraction 0.0004.
:::
:::

:::exercise The mean on the fills {level=2 check="-0.02"}
Use the five next-bar simple returns of [[#ex-adv]]: \(0.02\), \(0.01\), \(-0.03\), \(-0.01\), \(0.04\). The buy limit fills only on the third and the fourth. What is the mean return on the fills? (Enter the mean.)
:::solution
The filled returns are \(-0.03\) and \(-0.01\). Their mean is \(-0.04/2 = -0.02\). The unconditional mean of all five is \(0.006\), which is not the question. The gap between them is the selection.
:::
:::

:::exercise Compound the spread for a year of sessions {level=3 check="95.08"}
Start from net asset value 100. Each of 252 sessions, the mid is unchanged at 100 and the book does one market round trip with half-spread 0.01, multiplying value by \(99.99/100.01\). What is the ending value, rounded half up to the cent? (Enter the value.)
:::hint
The one-session factor is \(99.99/100.01\). Raise it to the 252nd power and multiply by 100. The unrounded product is about 95.0849. Round half up to two decimal places. The linear approximation \((1-0.0002)^{252} \times 100\) is close, and it is not the factor this question asks for.
:::
:::solution
One session multiplies by \(99.99/100.01\). After 252 sessions the value is
\[
100 \times \left(\frac{99.99}{100.01}\right)^{252} = 95.0849\ldots.
\]
Rounded half up to the cent, that is 95.08. The first session alone ends near 99.980002, which is the same factor once; the rest is the product. The linear approximation \(100 \times (1-0.0002)^{252} = 95.0844\ldots\) also rounds to 95.08, but the question compounds the spread factor, not \(1-0.0002\). Ending at 95.08 on a flat mid is the cost, not a market move, and not a forecast.
:::
:::

:::exercise Where the invented edge is gone {level=3 check="50"}
An invented gross of 0.05 is reduced by an invented one-way cost of 0.001 times annual turnover \(\tau\), as on the figure in this chapter. What turnover makes the net exactly zero? (Enter the turnover.)
:::hint
Set \(0.05 - 0.001\tau = 0\) and solve for \(\tau\). The 0.05 and the 0.001 are invented. They are not O03’s CAGR and not the half-spread on a mid of 100.
:::
:::solution
\(0.05 - 0.001\tau = 0\) gives \(\tau = 0.05/0.001 = 50\). At that turnover the invented gross has been entirely spent on the invented cost. Turnover 504, two one-way trades a session for 252 sessions, would leave \(0.05 - 0.504 = -0.454\) under the same invented rate. The figure’s cost 0.001 is ten times \(0.0001\), the rate that matched a one-cent half-spread on a mid of 100. Mixing those rates without saying so is the double-count [[#alg-fill]] forbids. Neither line is a published backtest.
:::
:::
