A share count can move by one share. A standard FX lot and a futures contract cannot: the quantity jumps, and the jump is part of the order. A target of 1.6 contracts is not an order until a rounding rule maps it to an integer. A target of 4.54 standard lots is not an order until the same kind of rule maps it to a whole lot. The map is a function from a research quantity to a message the venue’s grid will accept. It is not a forecast, and it is not advice to trade currencies, futures, or any other instrument.

The prices below are invented, except when a sentence names a library row. A continuous futures series is not the profit and loss of holding the front contract through expiry; that distinction belongs to [[markets/adjustment-universes-and-rolls]] and [[asset-classes/futures]]. This chapter stops at the quantity and at the intraday bar.

## A standard lot on a USD-quoted pair

A **USD-quoted** pair has a price in dollars per unit of the base currency. A rise in the quote is a rise in the dollar value of one base unit. The convention is the quoting convention, not a suggestion to hold either currency. If the dollar were the base instead of the quote, the conversion would be different, and the specification would have to say so. Every dollar figure in this section assumes the quote currency is the dollar.

:::definition Standard lot {#def-lot}
A **standard lot** is 100,000 units of the base currency. The dollar profit and loss of \(n\) standard lots, when the quote moves by \(\Delta q\) dollars per base unit, is \(n \times 100{,}000 \times \Delta q\). A mini lot of 10,000 base units and a micro lot of 1,000 are the same formula with a smaller block. This chapter’s worked numbers use the standard lot.
:::

:::proposition Lot profit and the simple return {#prop-lot}
Let the quote move from \(q_0 > 0\) to \(q_0 + \Delta q\). The dollar profit and loss of one standard lot is \(100{,}000 \times \Delta q\). The simple return of the quote is \(\Delta q / q_0\). That return equals the dollar profit and loss divided by the starting dollar notional \(100{,}000 \times q_0\). In particular, \(\Delta q = 0.0050\) gives a profit of 500 dollars per standard lot, whatever \(q_0\) was. The simple return still depends on \(q_0\).
:::

:::proof
Each base unit changes in dollar value by \(\Delta q\), by the quoting convention. A standard lot holds 100,000 base units, so its dollar change is \(100{,}000 \times \Delta q\). For \(\Delta q = 0.0050\) that product is \(100{,}000 \times 0.0050 = 500\) dollars. The starting notional is the dollar value of those base units at \(q_0\), which is \(100{,}000 \times q_0\). Dividing the profit by that notional cancels 100,000 and leaves \(\Delta q / q_0\), the simple return of the quote. The profit in dollars does not need \(q_0\); the return does. Linearity in \(n\) is the same product with \(n\) lots, because each lot is a separate block of 100,000 base units and the quote move does not depend on \(n\).
:::

:::example Five hundred dollars, and a return that is not 0.0050 {#ex-lot}
One standard lot, USD-quoted, moves from 1.1000 to 1.1050. Compute the dollar profit, the starting notional, and the simple return of the quote to six decimal places.
:::solution
The move is \(\Delta q = 0.0050\). By [[#prop-lot]] the dollar profit is 500. The starting notional is \(100{,}000 \times 1.1000 = 110{,}000\) dollars. The simple return is \(0.0050 / 1.1000 = 0.004545\) to six decimal places, and \(500 / 110{,}000\) is the same ratio. Quoting the move as “half a percent” would be wrong: 0.0050 is half a cent per unit of a quote near 1, which is about 0.45 percent of 1.1000, not 0.50 percent. Two standard lots would make \(2 \times 500 = 1{,}000\) dollars on the same move. The formula is linear. Nothing here says to hold the pair.
:::
:::

## Contracts, then the integer

A futures profit is linear in the price change, in the multiplier, and in the number of contracts. The number has to be an integer. Margin, if a contract requires it, is collateral posted beside the position. It is not the profit, and it is not subtracted again from the profit formula below. [[markets/instruments]] introduces the multiplier; this chapter uses it as arithmetic.

:::definition Futures profit {#def-fut}
The profit and loss of \(n\) contracts with multiplier \(M\), in units of account per point, on a price change \(\Delta F\) is \(n \times M \times \Delta F\). Here \(n\) is an integer. A fractional target \(q\) is not yet this \(n\).
:::

Two maps from a positive target \(q\) are used below, and a specification has to pick one. The **budget floor** is \(n = \lfloor q \rfloor\), the greatest integer that does not exceed \(q\), so the order never takes more contracts than the target. The **nearest integer** takes the closest integer; a tie at \(q = k + 1/2\), for integer \(k\), rounds away from zero. For the target 1.6 there is no tie: the distance to 1 is 0.6 and the distance to 2 is 0.4, so the nearest integer is 2, while the floor is 1.

:::proposition Rounding scales the profit by \(n/q\) {#prop-ratio}
Let \(M \Delta F \ne 0\) and let \(q > 0\) be a fractional target, with \(n\) the integer a stated rule returns. The profit of \(n\) contracts divided by the profit of the fractional target is \(n/q\). For \(q = 1.6\), the floor realises \(1/1.6 = 0.625\) of the fractional profit, and the nearest integer realises \(2/1.6 = 1.25\) of it. With \(M = 50\) and \(\Delta F = 10\), the fractional profit is 800, the floor profit is 500, and the nearest profit is 1,000, all in units of account.
:::

:::proof
By [[#def-fut]] the fractional expression \(q \times M \times \Delta F\) and the integer expression \(n \times M \times \Delta F\) share the factor \(M \Delta F\), which is not zero. Their ratio is \(n/q\). The floor of 1.6 is 1 and the nearest integer is 2, so the ratios are \(1/1.6 = 0.625\) and \(2/1.6 = 1.25\). Substitute \(M = 50\) and \(\Delta F = 10\): the common factor \(M \Delta F\) is 500, and \(1.6 \times 500 = 800\), \(1 \times 500 = 500\), \(2 \times 500 = 1{,}000\). The sign of \(\Delta F\) would scale all three the same way. The ratio does not say which rounding rule a study ought to adopt. It says the rule is a scale factor on the profit, not a cosmetic print.
:::

One way to arrive at 1.6, invented and not a policy, is a volatility budget. Let the multiplier be 50 and let an invented daily standard deviation of the futures price be 20 points. The dollar-style volatility of one contract is \(50 \times 20 = 1{,}000\) units of account. A budget of 1,600 then asks for \(1{,}600 / 1{,}000 = 1.6\) contracts, and the previous paragraph turns 1.6 into either 1 or 2. A share version of the same budget is milder, because the grid is one share. At a price of 100 and a daily simple-return volatility of 0.01, one share has volatility \(100 \times 0.01 = 1\) unit of account. The same budget of 1,600 asks for 1,600 shares, already an integer. A target of 1,600.8 shares would floor to 1,600 and drop 0.8 of the budget. The FX grid is the harsh case, worked next.

:::example Two contracts, and the 1.6 that is not an order {#ex-round}
An invented futures price goes from 4,000 to 4,010, so \(\Delta F = 10\). The multiplier is 50. Compute the profit of 2 contracts. Then apply both rounding rules to a target of 1.6 contracts on the same move, and record the three profits: fractional, floor and nearest.
:::solution
Two contracts make \(2 \times 50 \times 10 = 1{,}000\) units of account. That is [[#def-fut]] with an integer already in hand.

The fractional target makes \(1.6 \times 50 \times 10 = 800\). The budget floor takes 1 contract and makes \(1 \times 500 = 500\), which is \(0.625 \times 800\). The nearest integer takes 2 and makes 1,000, which is \(1.25 \times 800\). The order that can actually be a message is the 500 or the 1,000, not the 800. Choosing the floor keeps the volatility budget from being exceeded, if 1.6 came from the budget above. Choosing the nearest exceeds it. Both are legal specifications. Neither is a recommendation to trade the contract, and the multiplier 50 is an arithmetic choice, not a listed product.
:::
:::

:::example Half a book that is not a whole number of lots {#ex-weight}
Net asset value is 1,000,000 dollars. The target weight on a USD-quoted pair at 1.1000 is 0.5. Convert the weight to standard lots, then apply the floor and the nearest integer. Report notionals and weights.
:::solution
The target dollar notional is \(0.5 \times 1{,}000{,}000 = 500{,}000\). Base units are \(500{,}000 / 1.1000 = 5{,}000{,}000/11 = 454{,}545.\overline{45}\). Standard lots are that quantity divided by 100,000, which is \(50/11 = 4.\overline{54}\).

The floor is 4 lots. Notional \(4 \times 100{,}000 \times 1.1000 = 440{,}000\) dollars. The weight is \(440{,}000 / 1{,}000{,}000 = 0.44\), short of the target by 0.06, which is 60,000 dollars of notional not sent.

The nearest integer is 5, because \(4.545\ldots\) is closer to 5 than to 4. Notional \(5 \times 110{,}000 = 550{,}000\) dollars. The weight is 0.55, over the target by 0.05, which is 50,000 dollars. The same floor that dropped 0.8 shares in the share sketch drops 60,000 dollars here. Whole lots are not a minor print of a weight. O19 is the library’s whole-lot case; its row is quoted below, and it is negative.
:::
:::

A second invented budget, for the lot rather than the contract: a daily quote volatility of 0.0060 moves one standard lot by \(100{,}000 \times 0.0060 = 600\) dollars. A budget of 1,600 dollars of that volatility asks for \(1{,}600 / 600 = 8/3 = 2.\overline{6}\) lots. The floor is 2 and the nearest integer is 3. By [[#prop-ratio]] those realise \(2/(8/3) = 0.75\) and \(3/(8/3) = 1.125\) of the fractional profit on any later move. The 0.0060 is invented. It is not a measured FX volatility and not a size to send.

## Bars that are short on the calendar

A five-minute bar is still an OHLC bar. Many paths share it, just as many paths share a daily bar. A stop can be touched inside the bar without the close showing the touch, so the range convention and the gap convention still have work to do. What changes is the session and the length of the sample. This chapter’s intraday convention cancels a resting order at the end of the session if it has not filled. An overnight hold would be a different function.

Count with a 390-minute session, the length of a 6.5-hour cash-equity day, used only as a counting convention. A session holds \(390/5 = 78\) bars of five minutes, and \(390/30 = 13\) bars of thirty minutes. Four weeks of five sessions is 20 sessions and \(20 \times 78 = 1{,}560\) five-minute bars. Eight weeks is 40 sessions and \(40 \times 13 = 520\) thirty-minute bars. The number of bars is not the number of independent days. Twenty weekday sessions are twenty days, or fewer if a parameter was chosen on the same days.

:::proposition A blank CAGR is not a zero, and it is not yours to fill {#prop-nocagr}
In the multi-year library rows, CAGR means \((V_T / V_0)^{1/Y} - 1\) with the span \(Y\) in years, and the library prints it only when it reports one. A cell printed as — is unreported. It is not zero. Raising a single short-horizon return to the power \(52/W\), for a span of \(W\) weeks, produces a number and not a CAGR of a strategy. In particular, an invented four-week simple return of 0.01 — which is not O15’s reported return — satisfies \((1.01)^{13} - 1 = 0.138\) to three decimal places, and that 0.138 is not a growth rate this atlas will quote.
:::

:::proof
The exponent \(52/4 = 13\) converts four weeks into a year only by assuming the four-week return repeats, independently and identically, thirteen times. One observed four-week window is one window. Exponentiation does not manufacture the other twelve. The library’s own multi-year rows cover 7, 16 or 25 years and print a CAGR when they have one. O15’s span is four weeks and its CAGR cell is —. O16’s span is eight weeks and its CAGR cell is —. By the definition just given, those blanks stay blank. The numerical value \((1.01)^{13} - 1 = 0.138093\ldots\), rounded half up to three decimal places, is 0.138. It was computed from an invented 0.01 so that nobody can mistake it for an annualisation of O15’s +1.1 percent. We do not compute that annualisation at all.
:::

:::example What four weeks can teach, and what they cannot {#ex-intra}
Count the five-minute bars in four weeks under the convention above. Then place O15’s stated bracket distances, +0.6 percent and −0.4 percent, on an invented entry at 100, and compute the two clean exit prices. Do not annualise O15 or O16.
:::solution
Four weeks, five sessions a week, 78 bars a session: \(4 \times 5 \times 78 = 1{,}560\) bars, and only 20 sessions. The bar count is a description of the grid. It is not a sample size for a CAGR.

O15’s one-line description is an RSI dip with a bracket at +0.6 percent and −0.4 percent, on five-minute bars, over four weeks. On an entry of 100 those distances sit at 100.6 and 99.6. The clean paths of the bracket proposition in [[orders/trailing-brackets-and-oco]], applied to these distances, return \(+0.006\) if the profit is the only price in the bar, and \(-0.004\) if the stop is. That is the shape of the message. It is not O15’s trade list. O15 reports a total return of +1.1 percent and a maximum drawdown of −1.3 percent. CAGR, Sharpe, win rate and profit factor are —. The library does not report them, and four weeks cannot support a CAGR.

O16 is a buy-stop above the 12-bar high, with a fixed holding period, on thirty-minute bars, over eight weeks. It reports a total return of −13.9 percent and a maximum drawdown of −14.8 percent. The other cells are —. Eight weeks cannot support a CAGR either. The return is negative. We do not take the other side, and we do not invent the length of the holding period beyond the words “fixed holding period”. Inside each thirty-minute bar the buy-stop is still the stop of the previous chapter: an open through the 12-bar high fills at the open under the gap convention. The close of the bar is not a substitute for that test.
:::
:::

:::widget sequence
a: 500*n
mode: terms
N: 6
caption: Dollar profit of n standard lots on a USD-quoted pair when the quote moves by 0.0050. The terms are 500, 1000, 1500, and so on. Linearity in the lot count is the whole figure. Not a forecast.
:::

O19, FX Momentum Lots, is contract-aware whole-lot momentum on USD-quoted spot pairs, daily bars, 16 years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the total return is −14.2 percent, the CAGR is −0.95 percent, the reported Sharpe is −0.71 and the maximum drawdown is −15.3 percent. Win rate and profit factor are —. The library does not report them. This atlas has not re-run the backtest. The figures are not a forecast and not advice. The negative row is the published result of a whole-lot rule. It is not a reason to reverse the sign. Further instrument detail of FX sits in [[asset-classes/foreign-exchange]]; the quantity convention is what this chapter has just calculated.

O20, Futures Donchian Contracts, is whole-contract sizing on a provider’s continuous futures, daily bars, 7 years. The same attribution applies. It reports a total return of +35.5 percent, a CAGR of +4.67 percent, a reported Sharpe of 0.30, a maximum drawdown of −16.7 percent, a win rate of 48.0 percent and a profit factor of 1.34. The library does report a CAGR here, and the span it states is 7 years. Seven years is not a long sample merely because a CAGR was printable. The one-line description mentions ATR sizing; we do not re-derive that size rule, and we do not treat the continuous series as a held contract. Rolls stay in [[asset-classes/futures]]. A positive reported Sharpe is not advice to trade futures. Set beside O19, the pair says only that whole units were part of two different experiments, one reported negative over 16 years and one reported positive over 7.

:::warning Do not annualise four weeks
O15’s CAGR cell is —. O16’s is —. [[#prop-nocagr]] is the reason those blanks stay blank, including the invented power \((1.01)^{13} - 1 \approx 0.138\), which is a calculator’s output on a made-up 1 percent and still not a CAGR. A 1,560-bar chart feels long. It is twenty sessions.
:::

:::quiz
Under the USD-quote convention, what is the dollar profit of one standard lot on a quote move of 0.0050?
- [ ] 5 dollars, because 0.0050 is a small return
- [x] 500 dollars, because a standard lot is 100,000 base units
- [ ] 50,000 dollars, because the lot is 100,000 and the move is half a percent of something near 1
- [ ] It cannot be known without the starting quote
:::solution
[[#prop-lot]] separates the dollar profit, \(100{,}000 \times 0.0050 = 500\), from the simple return, which does need the starting quote. The third option treats 0.0050 as a return rather than as a change in the quote. It is a change in dollars per base unit.
:::
:::

:::quiz
O16 reports a return of −13.9 percent over eight weeks, and the CAGR cell is —. What is the right use of that cell?
- [ ] Treat the CAGR as zero, because a blank means no growth
- [ ] Annualise −13.9 percent so it can be compared with the 25-year rows
- [x] Leave it unreported: eight weeks cannot support a CAGR, and the library did not print one
- [ ] Replace it with O20’s CAGR, because both examples use stops
:::solution
[[#prop-nocagr]] forbids filling the blank. O20’s CAGR belongs to a different, seven-year futures experiment. O16’s negative return stays a return over eight weeks, not a growth rate and not a reason to take the other side.
:::
:::

:::history
Island ECN, launched in 1996, was one of the electronic limit-order markets that moved US equity trading off the floor and made a public book the object a simulator has to imitate. On that kind of book a quantity can be a single share. A standard lot and a futures contract are coarser grids: the message jumps by 100,000 base units, or by one contract, whether or not a fractional target would have been a clearer expression of a weight. Island was an equity venue. The comparison is only about the grid. Intraday equity bars, including the short library samples, compress a book of that kind into OHLC and then discard the book.
:::

## Where this leads

The fill still has to pay the spread and any slippage written into the specification. That is [[orders/fills-slippage-and-spread]]. FX as an asset-class hypothesis, including the negative published momentum results read as results, continues in [[asset-classes/foreign-exchange]]. Futures, rolls and the continuous series are [[asset-classes/futures]]. Why a few weeks of fine bars cannot carry a performance ratio is taken up again in [[backtesting/intraday-samples]].

:::summary
- A standard lot is 100,000 base units. On a USD-quoted pair, a move of 0.0050 is 500 dollars per standard lot. The simple return still divides by the starting quote.
- Futures profit is contracts times multiplier times the price change. Margin is collateral, not that profit.
- A target of 1.6 contracts floors to 1 or rounds to 2. With multiplier 50 and a 10-point move, the profits are 500 or 1,000, against a fractional 800.
- The same floor on a half-weight in 1,000,000 dollars at a quote of 1.1000 sends 4 lots instead of \(50/11\), a notional gap of 60,000 dollars.
- O19 reports a 16-year return of −14.2 percent, a CAGR of −0.95 percent and a reported Sharpe of −0.71. O20 reports a 7-year CAGR of +4.67 percent and a reported Sharpe of 0.30. Neither row is advice.
- O15, four weeks of five-minute bars, reports +1.1 percent and a drawdown of −1.3 percent, and no CAGR. O16, eight weeks of thirty-minute bars, reports −13.9 percent and a drawdown of −14.8 percent, and no CAGR.
- Those blanks are unreported, not zero. A short sample cannot support a CAGR. The figures are as reported in 2026; this atlas has not re-run them.
:::

## Exercises

:::exercise One lot, one move {level=1 check="500"}
A USD-quoted pair moves by 0.0050. What is the dollar profit of one standard lot? (Enter the number of dollars.)
:::solution
\(100{,}000 \times 0.0050 = 500\). The starting quote is not required for the dollar profit.
:::
:::

:::exercise Two lots {level=1 check="1000"}
The same move of 0.0050. What is the dollar profit of two standard lots? (Enter the number of dollars.)
:::solution
Profit is linear in the number of lots: \(2 \times 500 = 1000\) dollars.
:::
:::

:::exercise Three contracts {level=1 check="600"}
Three futures contracts, multiplier 50, price change \(\Delta F = 4\). What is the profit in units of account? (Enter the profit.)
:::solution
\(3 \times 50 \times 4 = 600\). The multiplier is an arithmetic input, not a named listed contract.
:::
:::

:::exercise Floor of 1.6 {level=2 check="1"}
A volatility budget produces a target of 1.6 contracts. The rule is the budget floor. How many contracts are ordered? (Enter the integer.)
:::solution
The greatest integer that does not exceed 1.6 is 1. The order is 1 contract, not 1.6 and not 2.
:::
:::

:::exercise Nearest to 1.6 {level=2 check="2"}
The same target, 1.6 contracts, under the nearest-integer rule. How many contracts are ordered? (Enter the integer.)
:::solution
The distance from 1.6 to 2 is 0.4, and the distance to 1 is 0.6. The nearest integer is 2. There is no half-integer tie to settle.
:::
:::

:::exercise Simple return of the quote {level=2 check="0.004545"}
The quote moves from 1.1000 to 1.1050. What is the simple return, rounded half up to six decimal places? (Enter the simple return.)
:::solution
\(\Delta q = 0.0050\) and \(q_0 = 1.1000\), so the simple return is \(0.0050/1.1000 = 0.00454545\ldots\), which is 0.004545 to six decimal places. The dollar profit of one standard lot is still 500. The return is not 0.0050.
:::
:::

:::exercise The weight the nearest lot actually has {level=3 check="0.04"}
Net asset value is 1,000,000 dollars. The quote is 1.0000 dollar per base unit. The target weight is 0.36. Round the resulting standard-lot count to the nearest integer, and report the absolute error of the weight that integer produces. (Enter the absolute error.)
:::hint
At a quote of 1, dollar notional and base units coincide. Lots are notional divided by 100,000. After rounding, convert the integer lot count back to a weight and subtract the target.
:::
:::solution
Target notional is \(0.36 \times 1{,}000{,}000 = 360{,}000\) dollars. At a quote of 1.0000 that is 360,000 base units, hence \(360{,}000 / 100{,}000 = 3.6\) standard lots. The nearest integer is 4. Four lots have notional \(4 \times 100{,}000 \times 1 = 400{,}000\) dollars and weight \(400{,}000 / 1{,}000{,}000 = 0.40\). The absolute error is \(|0.40 - 0.36| = 0.04\).

The floor would have sent 3 lots, weight 0.30, absolute error 0.06. The question asks for the nearest rule. A quote of 1 was chosen so the grid, rather than an awkward division, would be the whole exercise. It is not a market.
:::
:::

:::exercise Floor the contracts before you scale the loss {level=3 check="-200"}
The target is 2.4 contracts. The multiplier is 20. The futures price changes by \(\Delta F = -5\). The rule is the budget floor. What profit, in units of account, does the rounded position make? (Enter the profit, with its sign.)
:::hint
Floor does not exceed the target. Then multiply the integer by the multiplier by \(\Delta F\), and keep the minus sign. The fractional profit is a comparison, not the answer.
:::
:::solution
The floor of 2.4 is 2. The nearest integer is also 2, since 2.4 is closer to 2 than to 3, but the question asks for the floor, which is 2 either way. The profit is \(2 \times 20 \times (-5) = -200\).

The fractional target would have made \(2.4 \times 20 \times (-5) = -240\). The floor realises \(-200 / -240 = 5/6\) of that loss, which is \(2/2.4\), the ratio in [[#prop-ratio]]. Rounding did not remove the loss. It scaled it. The negative sign is the price change, not a recommendation to be short or long.
:::
:::
