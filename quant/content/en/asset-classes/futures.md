A futures price of \(4000\) is not a cash outlay of \(4000\). The contract pays or collects a mark-to-market cash flow equal to the price change times a multiplier times the number of contracts. Collateral posted as initial margin is not that cash flow. And a smooth series labelled continuous is a vendor's stitch across contracts that expired. The stitch is a choice. The held contract was not optional in the same way: it had a delivery month, and when it was closed the next contract was a different instrument.

This chapter computes the cash flow, the stitch, and the integer number of contracts. It then reads two published futures pages, O20 and W25, both on seven-year windows. Seven years is a short sample. A high profit factor on that window is a description of winners and losers inside the window, not evidence that the window was long enough. Nothing here is an instruction to trade a futures contract, to post margin, or to take a short side.

## Multiplier, margin, and one contract's profit

:::definition Multiplier {#def-multiplier}
A futures **multiplier** \(M\) converts a price change of one point into currency units per contract. If the futures price of the **same** contract moves from \(F_{t-1}\) to \(F_t\), the mark-to-market profit on \(N\) contracts, before commission, is \(N \times M \times (F_t - F_{t-1})\). \(N\) may be recorded as negative in a published book that holds the short side of the contract. Recording that sign describes the book. It does not tell the reader to short a contract. A continuous vendor series is not, by itself, an \(F\) in this definition, because the series may change contract identity inside the interval.
:::

:::definition Initial margin {#def-margin}
**Initial margin** is collateral posted so that the clearing arrangement will carry the position. It is not the profit, not the loss, and not the denominator of "the" return unless the specification says the return is profit divided by margin. Maintenance margin and variation margin move cash as the position is marked. Those movements are part of a funded account. They are not a second copy of the profit formula. In the examples, any margin number that is not implied by \(M\) and \(F\) is invented for the arithmetic and is not an exchange's schedule.
:::

:::proposition Same-contract profit {#prop-fut}
Assume a constant multiplier \(M\), a constant number of contracts \(N\), and a price path \(F_{t-1}, F_t\) of one contract, with no expiry and no roll inside the step, and with no commission. Then the profit in units of account is

$$
\Pi = N \, M \, (F_t - F_{t-1}).
$$ {#eq-fut}

It is not \(N\,(F_t - F_{t-1})\), and it is not the change in a continuous series that splices two contracts. The starting notional \(N M F_{t-1}\) is a reference amount. Profit divided by that notional is a return on notional. Profit divided by posted margin is a different ratio. Neither ratio is defined until the denominator is named.
:::

:::proof
By [[#def-multiplier]], one contract gains \(M\) units of account per point. \(N\) contracts gain \(N M\) per point. The number of points on this contract is \(F_t - F_{t-1}\). The product is [[#eq-fut]]. Dropping \(M\) leaves a point count, not a profit. Using a spliced series replaces \(F_t - F_{t-1}\) with a change that may include a gap between two contracts, which the next section removes or, if the researcher is careless, keeps.
:::

:::example Two contracts, from 4000 to 4010 {#ex-1000}
Hold \(2\) contracts of one futures market. The multiplier is \(50\). The price of that contract moves from \(4000\) to \(4010\). No roll occurs, and no commission is charged. An invented initial margin is \(20\,000\) per contract, posted at the start and not a market quote. Compute the profit, the starting notional, the profit divided by notional, and the profit divided by posted margin.
:::solution
The point change is \(4010 - 4000 = 10\). By [[#eq-fut]],

$$
\Pi = 2 \times 50 \times 10 = 1000
$$

units of account. The starting notional is \(2 \times 50 \times 4000 = 400\,000\). Profit over notional is \(1000 / 400\,000 = 0.0025\). Posted margin is \(2 \times 20\,000 = 40\,000\), and \(1000 / 40\,000 = 0.025\). The same \(1000\) is a \(0.25\%\) move on notional and a \(2.5\%\) move on this invented collateral. A report that calls \(0.025\) "the return" without saying "on margin" has changed the denominator. A report that calls \(0.0025\) "the return" without saying "on notional" has the same problem. The margin figure is a teaching input. It is not a statement about any exchange.

One contract on the same move would have gained \(50 \times 10 = 500\). The multiplier scales the point; the contract count scales it again. Forgetting either factor is how a weight becomes a fantasy profit.
:::
:::

:::quiz
Initial margin of \(40\,000\) is posted, and the same-contract profit over the step is \(1000\). Which reading matches [[#def-margin]]?
- [ ] The profit is \(40\,000\), because that is the cash that moved into the account at the start.
- [ ] The profit is \(41\,000\), because margin and profit add.
- [x] The profit is \(1000\). The \(40\,000\) is collateral, and \(1000/40\,000\) is a ratio only if you say so.
- [ ] The profit is the change in the futures price, \(10\), because the multiplier is only a quote convention.
:::solution
Margin is collateral, not the mark-to-market profit. [[#eq-fut]] gives \(1000\) on this step. Dividing by margin is optional and must be labelled. Dropping the multiplier leaves points, not units of account.
:::
:::

## A five-point gap at the roll

Suppose the front contract is \(4000\) and, one step later, is \(4010\). At that later time the next contract is \(4015\). One step after the roll, the next contract is \(4020\). A trader who holds the front from \(4000\) to \(4010\), then holds the next contract from \(4015\) to \(4020\), earns \(10 + 5 = 15\) points. The \(5\)-point difference between \(4010\) and \(4015\) is a difference between two contracts at one moment. It is not a mark-to-market on a contract the trader held across that moment. Closing one contract and opening another exchanges instruments. It does not pay the gap.

:::algorithm One difference adjustment {#alg-roll}
Inputs: front prices up to the roll, the front price \(F^{\mathrm{front}}\) and the next price \(F^{\mathrm{next}}\) at the roll, and later prices of the next contract.
1. Points earned on the front, up to the roll, are ordinary differences of the front. In the numbers above, \(4010 - 4000 = 10\).
2. At the roll, record the gap \(\gamma = F^{\mathrm{next}} - F^{\mathrm{front}}\). In the numbers, \(\gamma = 5\). Do not add \(\gamma\) to profit.
3. Points earned after the roll are ordinary differences of the next contract. In the numbers, \(4020 - 4015 = 5\).
4. A difference-adjusted continuous series is any path whose consecutive differences equal those earned points and never equal \(\gamma\). One such path, anchored on the front, is \(4000\), \(4010\), \(4015\): the last level is \(4010 + 5\), parallel to the next contract and \(\gamma\) below it. Another path adds \(\gamma\) to all pre-roll history so the series can sit on the new contract; its differences are the same.
5. A naive splice that prints \(4000\), then \(4015\), then \(4020\) has differences \(15\) and \(5\), total \(20\). It has charged the trader with a \(5\)-point jump that the held contracts did not produce. The continuous series that removes \(\gamma\) is trying to match held-contract points. It is still not a contract you can hold.
:::

Ratio adjustment is the other common stitch. It multiplies pre-roll history by a factor so that percentage changes match the held contract, and it does not preserve points.

:::example Fifteen points, or twenty {#ex-roll}
Use the prices in the section above. Compute held-contract points, naive-splice points, and the differences of the anchored series \(4000\), \(4010\), \(4015\).
:::solution
Held-contract points are \((4010 - 4000) + (4020 - 4015) = 10 + 5 = 15\). The gap \(\gamma = 4015 - 4010 = 5\) is not included. The naive splice \(4000 \to 4015 \to 4020\) changes by \(15 + 5 = 20\), which is the \(15\) earned points plus the \(5\)-point gap. The anchored difference-adjusted series \(4000 \to 4010 \to 4015\) changes by \(10 + 5 = 15\). [[#alg-roll]] matches the held contracts and not the naive splice. A backtest on the naive splice would report \(5\) points of profit that the roll did not pay. A backtest on the difference-adjusted series reports the points, and still is not a backtest of commissions, of the bid-ask at the roll, or of a contract that existed for the whole sample.
:::
:::

:::example Ratio adjustment does not keep the ten points {#ex-ratio}
At the roll the front is \(4010\) and the next is \(4015\). Scale the pre-roll price \(4000\) by \(4015/4010\) so that a series anchored on the new contract reproduces the front's percentage change. Compute that percentage change, and compute the point change on the scaled series from the adjusted pre-roll level up to \(4015\). Round the point change half up to six decimal places.
:::solution
The scaled pre-roll level is \(4000 \times 4015/4010\). The percentage change up to \(4015\) is

$$
\frac{4015}{4000 \times 4015/4010} - 1 = \frac{4010}{4000} - 1 = 0.0025,
$$

which is the front's own percentage change, \(10/4000\). The point change on the stitched series is

$$
4015 - 4000 \times \frac{4015}{4010} = \frac{4015}{401} = 10.012469
$$

to six decimal places, not \(10\). Ratio adjustment kept the percentage and spent the point identity. Profit in [[#eq-fut]] needs points times a multiplier. Feeding it ratio-adjusted points feeds it \(10.012469\) where the front contract moved \(10\). Over one roll the damage is a fraction of a point. Over a long chain of rolls it is a different series. A vendor file named "continuous" has already chosen difference, ratio, or some third stitch. The choice is part of the data, and it is not written on the axis unless the documentation says so. O20 and W25, below, are reported on provider continuous series. Their profits are profits on those series, not a roll-by-roll ledger this atlas has audited.
:::
:::

:::example An unrounded 1.6 contracts {#ex-round}
Net asset value is \(1\,000\,000\) units of account. The target weight on notional is \(0.32\). The futures price is \(4000\) and the multiplier is \(50\), so one contract's notional is \(200\,000\). Compute the unrounded contract count. Then compute profit on a \(10\)-point move if the count is truncated towards zero, and if it is rounded to the nearest integer. No roll, no commission.
:::solution
Target notional is \(0.32 \times 1\,000\,000 = 320\,000\). Unrounded contracts are \(320\,000 / 200\,000 = 1.6\). Truncation towards zero keeps \(1\) contract. Profit is \(1 \times 50 \times 10 = 500\). Nearest-integer rounding keeps \(2\) contracts, because the fractional part \(0.6\) is at least one half. Profit is \(2 \times 50 \times 10 = 1000\). The same target weight produces two profits, \(500\) or \(1000\), until the rounding rule is written down. O20's design point is whole contracts. The integer is not a detail underneath a weight. It is the position.
:::
:::

:::widget plot
f: 2*50*(x-4000); 50*(x-4000)
x: 3990, 4020
hlines: 0; 1000
labels: two contracts; one contract
caption: Mark-to-market profit in units of account as one contract's price moves away from 4000, multiplier 50, no roll. Two contracts gain 1000 on a move to 4010. One contract gains 500. Margin is not on the graph. The lines are not a forecast and not a suggestion to hold the contract.
:::

:::warning Collateral, stitch, and a short window
Three separate objects get called "the futures return". Profit over notional, profit over margin, and the change in a continuous series answer three questions. [[#ex-1000]] already splits the first two: \(0.0025\) and \(0.025\) on the same \(1000\). [[#ex-roll]] splits the third: \(15\) points versus \(20\). A further slip is to read a seven-year profit factor as if the sample were long because the factor is large. The next section is that slip, with the numbers the library actually prints.
:::

## Two seven-year pages

O20 and W25 are the library's futures cases. The breakout idea in O20 is also discussed with the trend material; the contract arithmetic is here. The figures are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests. Reported Sharpes are their numbers. They are not certified to be our mean excess return divided by the standard deviation of excess return. Neither page is a recommendation to trade futures, and the short side of W25's description is the catalogue's description, not an instruction.

O20 is whole-contract Donchian breakout with ATR sizing, on provider continuous futures, daily, over 7 years. The reported total return is \(+35.5\%\), the reported CAGR is \(+4.67\%\), the reported Sharpe is \(0.30\), the maximum drawdown is \(-16.7\%\), the win rate is \(48.0\%\), and the profit factor is \(1.34\). Whole contracts are the integer from a rule of the [[#ex-round]] kind. Donchian means a channel of past highs and lows; the trend course defines the channel. ATR sizing means the position depends on a recent average true range. This chapter does not re-derive that range. It records that the position was an integer on a continuous series, over seven years, with a reported profit factor of \(1.34\) beside a win rate of \(48\%\). A profit factor above one with a win rate below one half is the shape "winners larger than losers", if the two statistics share a unit. The catalogue's one line does not define the unit. Seven years is the span either way.

W25 is diversified long/short trend on a provider continuous series, daily, over 7 years. The reported total return is \(+46.3\%\), the reported CAGR is \(+5.88\%\), the reported Sharpe is \(0.62\), the maximum drawdown is \(-9.7\%\), the win rate is \(50.0\%\), and the profit factor is \(5.85\). "Long/short" is the catalogue's name for a book that takes both signs. It is not a suggestion to short any market. The profit factor \(5.85\) with a win rate of \(50\%\) is the same shape, sharper: if the win rate and the profit factor are computed on the same unit, half the units won and half lost, and the average winner was \(5.85\) times the average loser in absolute profit. That is what "winners larger than losers" means numerically. It does not mean seven years is a long sample. A few large winners can dominate a profit factor on a short window, and the window is not repeated here. The maximum drawdown of \(-9.7\%\) and the CAGR of \(+5.88\%\) are the other reported summaries of that same short window. They are not a carry-home ratio.

O20 is also 7 years. Putting \(+4.67\%\) beside \(+5.88\%\) and ranking the books ignores the different rules (Donchian whole contracts with ATR sizing, versus a diversified long/short trend), the different continuous series, and the fact that neither backtest was re-run. A profit factor of \(1.34\) and a profit factor of \(5.85\) are not on a common scale until the win unit is known. Both sit on samples this chapter refuses to call long.

One more caution on the arithmetic of compounding. The catalogue reports both a total return and a CAGR over "7 yrs". This chapter does not treat \((1+\mathrm{CAGR})^7\) as an identity that must reproduce the total return to the last decimal. The phrase "7 yrs" is a reported span, not a number of compounding steps we have verified. The figures stand as printed.

:::intuition Points are the contract; the series is a file
[[#eq-fut]] is a cash-flow identity for one contract held across one price change. A continuous file is a column in a database. Difference adjustment tries to make the column's changes match a roll policy's points. Ratio adjustment tries to make its percentage changes match. Neither column is what a statement of "buy one contract" referred to after the front expired. If the research question is the contract, the contracts have to be named. If the research question is the vendor file, the file has to be named. O20 and W25, as catalogued, are the second question.
:::

:::history
Currency futures at the Chicago Mercantile Exchange in 1972 turned an interbank rate into an exchange-traded contract with a fixed size, which is the ancestor of the multiplier in [[#def-multiplier]]. S&P 500 futures at the same exchange, from 21 April 1982, did the same for a broad equity basket: the position became a number of contracts, long or short, rather than a pile of shares. The 1993 listing of SPY, treated in the equity-ETF chapter, later made a related basket into a fund share. A futures trend rule and an ETF trend rule can share a moving average and still not share a profit identity. The contract's profit is [[#eq-fut]]. The fund's profit is a change in the share price, fee included to the extent the price already includes it.
:::

## Where this leads

Market-neutral books, in [[asset-classes/market-neutral-books]], keep a short leg in the specification and ask when dollar neutrality and beta neutrality are the same constraint. They are not the same on two names with different betas. Rolls and continuous series, as data rather than as profit, are also [[markets/adjustment-universes-and-rolls]]. The Donchian channel itself is [[trend/breakouts-and-macd]]. None of this is advice to trade equity, bond, currency, or futures contracts.

:::summary
- Profit on \(N\) contracts of one futures is \(N\) times the multiplier times the price change of that contract ([[#eq-fut]]). It is not the price change alone.
- Initial margin is collateral. On the worked step, profit is \(1000\), profit over notional \(400\,000\) is \(0.0025\), and profit over an invented margin of \(40\,000\) is \(0.025\).
- A \(5\)-point roll gap is not held-contract profit. Held points in the worked roll are \(15\); a naive splice shows \(20\); a difference adjustment removes the gap.
- Ratio adjustment can keep the percentage change \(0.0025\) while the stitched point change becomes \(10.012469\) instead of \(10\).
- An unrounded \(1.6\) contracts is \(1\) if truncated towards zero and \(2\) if rounded to nearest, with profits \(500\) and \(1000\) on a \(10\)-point move at multiplier \(50\).
- O20 reports CAGR \(+4.67\%\), Sharpe \(0.30\), maximum drawdown \(-16.7\%\), win rate \(48\%\), profit factor \(1.34\), over 7 years. W25 reports CAGR \(+5.88\%\), Sharpe \(0.62\), maximum drawdown \(-9.7\%\), win rate \(50\%\), profit factor \(5.85\), also over 7 years.
- W25's profit factor with a \(50\%\) win rate means winners larger than losers — \(5.85\) times, if the unit matches. The sample is still short. O20's window is the same length. Neither page is a recommendation.
:::

## Exercises

:::exercise Another multiplier {level=1 check="400"}
Four contracts, multiplier \(20\), move from \(100\) to \(105\) on the same contract. No roll and no commission. Compute the profit in units of account. (Enter the profit.)
:::solution
Points are \(5\). Profit is \(4 \times 20 \times 5 = 400\).
:::
:::

:::exercise Return on notional {level=1 check="0.0025"}
Two contracts, multiplier \(50\), move from \(4000\) to \(4010\), profit \(1000\), starting notional \(400\,000\). Compute profit divided by starting notional, not by margin. (Enter that ratio.)
:::solution
\(1000 / 400\,000 = 0.0025\). The ratio on an invented margin would be a different number and was not asked for.
:::
:::

:::exercise The reported window {level=1 check="7"}
How many years does the library report for W25's continuous futures trend? (Enter the number of years.)
:::solution
The catalogue span for W25 is 7 years. O20 is also 7 years. The profit factor \(5.85\) does not lengthen the window.
:::
:::

:::exercise Held-contract points {level=2 check="15"}
The front contract moves from \(4000\) to \(4010\). At that time the next contract is \(4015\). The next contract then moves to \(4020\). The holder rolls at \(4010\) against \(4015\). How many points does the holder earn? (Enter the number of points.)
:::solution
\((4010 - 4000) + (4020 - 4015) = 15\). The gap of \(5\) between the two contracts at the roll is not a held point.
:::
:::

:::exercise Naive splice points {level=2 check="20"}
A series prints \(4000\) (front), then \(4015\) (next contract), then \(4020\). How many points does that splice change by, in total? (Enter the number of points.)
:::solution
\((4015 - 4000) + (4020 - 4015) = 20\). That is the \(15\) held points plus the \(5\)-point gap. [[#alg-roll]] removes the gap; this splice does not.
:::
:::

:::exercise Unrounded contracts {level=2 check="1.6"}
Target weight \(0.32\) of a \(1\,000\,000\) net asset value, futures price \(4000\), multiplier \(50\). How many contracts is that before rounding? (Enter the unrounded count.)
:::solution
One contract's notional is \(50 \times 4000 = 200\,000\). Target notional is \(320\,000\). The count is \(320\,000 / 200\,000 = 1.6\).
:::
:::

:::exercise Ratio-adjusted points {level=3 check="10.0125"}
Pre-roll price \(4000\) is multiplied by \(4015/4010\), and the stitched series is then at \(4015\) on the new contract. By how many points did the stitched series move? Round half up to four decimal places. (Enter the rounded point change.)
:::hint
The point change is \(4015/401\), not \(10\). The percentage change matches the front contract; the points do not. Divide \(4015\) by \(401\) and round half up to four decimal places.
:::
:::solution
\(4015 - 4000 \times 4015/4010 = 4015/401 = 10.0124688\ldots\) To four decimal places, the fifth decimal digit is \(6\), so the fourth decimal digit rounds from \(4\) to \(5\). The rounded value is \(10.0125\). The held front contract moved \(10\) points, which is the wrong answer to this question.
:::
:::

:::exercise Truncation on the 1.6 contracts {level=3 check="500"}
The unrounded count is \(1.6\), the multiplier is \(50\), and the same contract moves \(10\) points. The count is truncated towards zero. Compute the profit. (Enter the profit.)
:::hint
Truncation towards zero on a positive \(1.6\) keeps \(1\), not \(2\) and not \(1.6\). Profit is the integer times \(50\) times \(10\). Nearest rounding would give \(1000\), which is a different rule.
:::
:::solution
The integer is \(1\). Profit is \(1 \times 50 \times 10 = 500\). The fractional contract \(0.6\) is not held under this rule, so it contributes no profit.
:::
:::
