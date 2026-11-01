A dollar-quoted spot rate is the price of one unit of a base currency in dollars. A rise from \(1.1000\) to \(1.1050\) means that one unit of the base buys five-thousandths of a dollar more than it did. It is not a share price, and it is not by itself a profit. The profit, if any, depends on how many units the book held, on which side of the quote it held, and on the costs the report remembered to charge.

This chapter computes that arithmetic and then reads three published FX momentum pages that lost money. The losses stay losses. They are not reversed into a rule, and nothing here is an instruction to trade a currency, to hold dollars, or to take the other side of a reported book. Meese and Rogoff's 1983 comparison with a random walk is the benchmark a forecast has to beat. A backtest that never states that benchmark has not yet said what "worked" would mean.

## The quote and the lot

:::definition Dollar-quoted spot {#def-quote}
A **USD-quoted spot** rate \(S_t\) is dollars per one unit of the base currency at time \(t\). An increase in \(S\) is an increase in the dollar value of one unit of the base. The simple return on a long position of one unit of base, marked in dollars, is

$$
R_t = \frac{S_t}{S_{t-1}} - 1.
$$ {#eq-fx-ret}

The change \(S_t - S_{t-1}\) is not that return unless \(S_{t-1} = 1\). A feature dated \(t\) may use quotes up to \(t\) and is scored on the return after \(t\).
:::

:::definition Standard lot {#def-lot}
A **standard lot** in this chapter is \(100\,000\) units of the base currency. At quote \(S\), the dollar notional of one standard lot is \(100\,000 \times S\). The dollar mark-to-market profit on a long position of \(Q\) base units, over a move from \(S_{t-1}\) to \(S_t\), with no costs, is \(Q\,(S_t - S_{t-1})\). Mini and micro lots are not used below. A negative \(Q\) would be a short base position; the examples that need a negative weight say so as a weight in a published-style map, not as an instruction to short a currency.
:::

The quoting convention is the whole game. In a USD-quoted pair, the dollar is the quote currency, not the base. A researcher who mixes in a pair quoted as dollars per nothing — the other way round — changes the sign of every return without changing the economics, and then adds that sign error to every weight. This chapter uses one convention and sticks to it.

:::proposition Profit and simple return {#prop-pnl}
Let a position hold a constant \(Q\) units of base from \(t-1\) to \(t\), with USD-quoted rates \(S_{t-1} > 0\) and \(S_t\), and with no commission, spread, or financing. The dollar profit is \(Q\,(S_t - S_{t-1})\). Dividing by the starting dollar value \(Q\, S_{t-1}\) (for \(Q \neq 0\)) recovers \(R_t\) in [[#eq-fx-ret]]. Equivalently, dollar profit equals starting dollar value times the simple return. The identity is for a constant \(Q\) over one step. It does not include a roll, a swap point, or an interest differential on the two currencies.
:::

:::proof
Starting dollar value is \(V = Q S_{t-1}\). Ending dollar value of the same units is \(Q S_t\). The difference is \(Q S_t - Q S_{t-1} = Q\,(S_t - S_{t-1})\). Divide by \(V\):

$$
\frac{Q\,(S_t - S_{t-1})}{Q S_{t-1}} = \frac{S_t}{S_{t-1}} - 1 = R_t,
$$

where the \(Q\) cancels for \(Q \neq 0\). Hence profit \(= V R_t\). If someone divides the price change by \(1\) instead of by \(S_{t-1}\), they are not computing \(R_t\) unless the quote started at \(1\).
:::

:::example From 1.1000 to 1.1050 {#ex-move}
A USD-quoted rate moves from \(1.1000\) to \(1.1050\). Compute the simple return as a fraction, the dollar profit on one long standard lot, and the profit implied by mistakenly treating the \(0.0050\) change as if it were already a simple return on a one-lot notional.
:::solution
The simple return is

$$
R = \frac{1.1050}{1.1000} - 1 = \frac{1}{220} = 0.00454545\ldots
$$

One standard lot is \(Q = 100\,000\) base units. The dollar profit is \(100\,000 \times (1.1050 - 1.1000) = 100\,000 \times 0.0050 = 500\) dollars. Check against [[#prop-pnl]]: starting notional is \(100\,000 \times 1.1000 = 110\,000\) dollars, and \(110\,000 \times (1/220) = 500\) dollars. The two routes agree.

The change \(0.0050\) is fifty points of \(0.0001\), often called pips in this quoting convention. It is not a \(0.50\%\) return. A \(0.50\%\) return on the \(110\,000\) dollar notional would be \(550\) dollars, which is \(100\,000 \times 0.0055\), a different move. One pip on one standard lot is \(100\,000 \times 0.0001 = 10\) dollars. Fifty pips are \(500\) dollars, which matches the profit above and still is not \(0.50\%\) of notional.

The log return is \(\ln(1.1050/1.1000) = \ln(221/220) \approx 0.00453516\), slightly below \(1/220\), as \(\ln(1+R)\) always is for \(R \neq 0\). The dollar profit uses the simple difference of the quote, not the log return. Logs add across time; they do not price a lot.
:::
:::

:::quiz
A USD-quoted rate rises. Which statement matches [[#def-quote]]?
- [ ] The base currency has become cheaper in dollars.
- [ ] The simple return equals the change in the quote, with no division.
- [x] One unit of the base is worth more dollars, and the simple return divides the new quote by the old one.
- [ ] The dollar profit on a long standard lot is always \(500\) dollars.
:::solution
A rise in a USD quote is a rise in dollars per unit of base. The simple return is \(S_t/S_{t-1} - 1\), so the old quote stays in the denominator. The \(500\) dollar figure is the profit on one specific move, from \(1.1000\) to \(1.1050\), not a constant.
:::
:::

## Lots from a weight

A momentum weight is a target fraction of net asset value. The orders chapter defines the lot; this chapter applies it to a currency quote. Whole lots are what O19's page says it traded. A weight of \(0.25\) does not become a quarter of a lot by magic. It becomes a dollar exposure, then a number of base units, then a number of lots, and then an integer only after a rounding rule.

:::algorithm Whole lots from a weight {#alg-lots}
Inputs: net asset value \(V > 0\) in dollars, target weight \(w\), USD quote \(S > 0\), and a rounding rule.
1. Dollar exposure is \(w V\). Base units are \(w V / S\).
2. Unrounded standard lots are \(w V / (100\,000 \times S)\).
3. Apply the stated rounding rule to get an integer \(N\). Truncation towards zero and rounding to nearest are different rules. Write which one you used.
4. Implemented dollar exposure is \(N \times 100\,000 \times S\), and the implemented weight is that exposure divided by \(V\). It equals \(w\) only when step 3 did not change the lot count.
5. The sign of \(w\) is the sign of the position in the base. This algorithm does not tell you to choose a negative sign. If a published map produces one, record it as that map's output.
:::

:::example A quarter of a million dollars at 1.1000 {#ex-lots}
Net asset value is \(1\,000\,000\) dollars. The target weight is \(+0.25\). The quote is \(1.1000\). Compute the unrounded number of standard lots, the implemented weight if the count is truncated towards zero to an integer, and the dollar gap between target exposure and implemented exposure.
:::solution
One lot's notional is \(100\,000 \times 1.1000 = 110\,000\) dollars. Target exposure is \(0.25 \times 1\,000\,000 = 250\,000\) dollars. Unrounded lots are \(250\,000 / 110\,000 = 25/11 = 2.272727\ldots\)

Truncation towards zero gives \(2\) lots. Implemented exposure is \(2 \times 110\,000 = 220\,000\) dollars, and the implemented weight is \(220\,000 / 1\,000\,000 = 0.22\). The gap is \(250\,000 - 220\,000 = 30\,000\) dollars, or \(0.03\) of net asset value. Nearest-integer rounding would have chosen \(2\) as well, because \(0.2727 < 0.5\). A different quote, or a target of \(2.6\) lots, would split the two rules. Until the rule is stated, "about two lots" is not a position.

The next simple return, if the quote moves and the two lots are held, is still [[#eq-fx-ret]] on the implemented exposure. The \(0.03\) of net asset value that was not invested earns whatever the residual cash earns, often modelled as \(0\) in a toy and not modelled at all if the specification forgets it.
:::
:::

## Inverse volatility on two pairs

Path A's shared fact for two volatilities is reused here, because the FX pages size by inverse volatility and the arithmetic should not be reinvented. If recent volatilities are \(0.10\) and \(0.20\), raw inverse volatilities are \(10\) and \(5\). Renormalised to sum to \(1\), the weights are \(2/3\) and \(1/3\). That renormalisation is a long-only, fully invested map: both signs are positive. A time-series momentum map multiplies each inverse volatility by a sign and then rescales, often so that the sum of absolute weights equals a gross budget. Those are different maps. W23's catalogue line says "inverse-vol weights" on a six-month trend. It does not, in the one line we have, write the gross budget. The examples below state the map they actually use.

:::example Both signs positive {#ex-ivol}
Volatilities are \(0.10\) and \(0.20\). Both trend signs are positive, and weights are renormalised to sum to \(1\), hence \(2/3\) and \(1/3\). The next simple returns are \(0.012\) and \(-0.009\). Compute the book return. Assume the weights were fixed before those returns.
:::solution
Inverse volatilities \(1/0.10 = 10\) and \(1/0.20 = 5\) sum to \(15\). Weights are \(10/15 = 2/3\) and \(5/15 = 1/3\). The book return is

$$
\frac{2}{3} \times 0.012 + \frac{1}{3} \times (-0.009) = 0.008 - 0.003 = 0.005.
$$

The lower-volatility pair gets twice the weight and, in this invented step, the positive return. That is not a reason to seek low volatility. Swap the returns and the book return changes sign pattern: the formula does not prefer a pair. It only sizes a pair whose sign was already \(+1\).
:::
:::

:::example Opposite signs, gross one {#ex-signed}
The same volatilities are used, but the signs are \(+1\) and \(-1\). Absolute inverse volatilities are again \(10\) and \(5\). Scale them so the sum of absolute weights is \(1\): weights \(+2/3\) and \(-1/3\). Both pairs' next simple returns are \(+0.009\). Compute the book return. The negative weight is the output of this stated map on a negative sign. It is not an instruction to short a currency.
:::solution
The book return is

$$
\frac{2}{3} \times 0.009 + \left(-\frac{1}{3}\right) \times 0.009 = 0.006 - 0.003 = 0.003.
$$

Both quotes rose by the same simple return. The book still shows a positive return because the gross is not split equally: the positive weight is twice the absolute value of the negative weight. Dollar neutrality would have required weights that sum to zero, for example \(+1/2\) and \(-1/2\), and that book would have returned \(0\) on two equal simple returns. Inverse volatility did not produce dollar neutrality. Reporting the \(0.003\) as "market neutral" would misuse both terms. Market-neutral constraints are the last chapter of this course.
:::
:::

:::widget plot
f: 100000*(x-1.1)
x: 1.05, 1.15
hlines: 0; 500
caption: Dollar profit of one long standard lot as a USD quote moves away from 1.10. The horizontal line at 500 dollars is the profit at 1.1050. The slope is 100000 dollars per one point of the quote, or 10 dollars per pip of 0.0001. The figure has no spread, no swap, and no recommendation to hold the base currency.
:::

:::warning The move is not the return, and a loss is not a reverse trade
Dividing nothing — treating \(1.1050 - 1.1000 = 0.0050\) as a \(0.50\%\) return — overstates the simple return, which is \(1/220\). A second slip is larger. W23, W24, and O19, quoted below, report losses. Reversing every weight because the published path lost money is a new rule whose sign was chosen after seeing the path. That is not an out-of-sample test of the opposite book. It is the same sample, read backwards. This chapter does not do it, and it does not suggest that you do it.
:::

## Three published losses

The momentum course owns the sign of these results across assets. This chapter owns the instrument: USD-quoted spot, lots, and inverse-volatility weights. The figures that follow are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests. A reported Sharpe below is their number, not a claim that it matches our ratio of mean excess return to the standard deviation of excess return. Where the catalogue shows a dash, the library does not report that statistic. Do not fill the dash.

W23 is six-month time-series momentum on USD-quoted spot pairs, with inverse-volatility weights. The reported span is 16 years. The reported total return is \(-27.3\%\), the reported CAGR is \(-1.97\%\), the reported Sharpe is \(-0.59\), and the maximum drawdown is \(-29.4\%\). The library does not report a win rate or a profit factor for W23. A negative total return over 16 years is the headline. Inverse volatility did not, on this reported path, turn the six-month signs into a gain. The sizing map can still be studied, as in [[#ex-ivol]] and [[#ex-signed]]. Studying it is not a reason to run it, and the loss is not a reason to run the sign-flipped twin.

W24 is cross-sectional: the catalogue describes it as long the strongest and short the weakest dollar-quoted pair, monthly, over 16 years. The reported total return is \(-34.1\%\), the reported CAGR is \(-2.58\%\), the reported Sharpe is \(-1.00\), and the maximum drawdown is \(-41.4\%\). The library does not report a win rate or a profit factor. The words "long" and "short" here are the catalogue's description of that rule. They are not instructions. The short leg is part of why a reader must ask about borrow, financing, and the quote convention. The page, as catalogued in this atlas, does not itemise those costs. Silence is not a measurement that the costs were zero.

O19 is contract-aware whole-lot momentum on USD-quoted spot pairs, again over 16 years. The reported total return is \(-14.2\%\), the reported CAGR is \(-0.95\%\), the reported Sharpe is \(-0.71\), and the maximum drawdown is \(-15.3\%\). The library does not report a win rate or a profit factor. Whole lots, the integer in [[#alg-lots]], are the design point of this page. The integer did not, on the reported path, produce a positive total return. Comparing O19's \(-14.2\%\) with W23's \(-27.3\%\) and declaring a winner would ignore every other difference in the two specifications: weights versus orders, lot rounding versus fractional weights, and whatever cost model each page used. This atlas has not re-run either page and does not rank them.

All three spans are 16 years, which is longer than the seven-year futures windows in the next chapter and still one historical path. A negative reported Sharpe is compatible with a rule that did not beat a zero-mean benchmark on that path. It is not a standard error, and it is not a trade.

:::intuition The random-walk forecast is "no change"
A random-walk forecast of the spot rate says that the next quote equals this quote. The predicted simple return is zero. Any other forecast — a six-month sign, a macroeconomic equation, a cross-sectional rank — has to beat that zero prediction out of sample, on a loss function chosen in advance, before the forecast counts as evidence. Beating it inside the sample that suggested the rule does not count. The published losses above are what those pages report. They are not, by themselves, a theorem that no currency rule can ever beat a random walk. They are also not an invitation to take the other side.
:::

:::history
In 1983 Richard Meese and Kenneth Rogoff, in the *Journal of International Economics*, compared standard macroeconomic models of the exchange rate with a random walk, out of sample. The models did not beat the random walk. The random-walk benchmark in this chapter is that result's practical form: the forecast of no change in the spot rate, hence a predicted simple return of zero. Later work has argued with the finding on other samples and other loss functions. The argument is not settled by W23, W24, or O19, and those pages are not a re-run of Meese and Rogoff. They are momentum specifications on USD-quoted pairs, and the catalogue reports losses. Currency futures at the CME in 1972 made an exchange-traded contract out of a rate; the futures chapter picks up the contract. The 1983 forecasts were about spot exchange rates. [[#def-quote]] is the quoting convention this chapter uses for that kind of price, not a claim about the paper's tables.
:::

:::remark What the dollar profit leaves out
[[#prop-pnl]] has no bid-ask spread, no commission, and no interest differential. A spot position held overnight is economically a pair of deposits, and the differential can add or subtract a return that the quote change does not show. A backtest that marks only \(S_t\) is a backtest of the quote, not of a funded currency position, unless the specification adds the funding. O19's "contract-aware" claim is about lots. It is not, in the catalogue line, a full funding ledger this atlas can audit. If the ledger is absent from the report, say so, and do not invent the missing carry.
:::

## Where this leads

Futures, in [[asset-classes/futures]], replace the lot of \(100\,000\) base units with a multiplier and an integer number of contracts, and they replace a spot quote with a contract that expires. The sign of the FX results is also discussed, without this instrument detail, in [[momentum/momentum-across-assets]]. Lot rounding as an order-level topic is [[orders/lots-contracts-and-intraday]]. None of those pages, and not this one, is advice to trade a currency.

:::summary
- A USD-quoted spot rate is dollars per unit of base. A rise is a rise in that dollar value. The simple return divides by the old quote ([[#def-quote]], [[#eq-fx-ret]]).
- One standard lot is \(100\,000\) base units. Dollar profit on a constant holding is \(Q\) times the change in the quote, with no costs ([[#prop-pnl]]).
- From \(1.1000\) to \(1.1050\) the simple return is \(1/220\), not \(0.0050\). One long standard lot gains \(500\) dollars. One pip on that lot is \(10\) dollars.
- A target weight becomes an integer lot only after a stated rounding rule. At \(1.1000\), weight \(0.25\) on \(1\,000\,000\) dollars is \(2.2727\ldots\) lots; two lots implement weight \(0.22\).
- Inverse volatilities \(0.10\) and \(0.20\) give weights \(2/3\) and \(1/3\) when both signs are positive and the weights sum to one. Opposite signs with gross one give \(+2/3\) and \(-1/3\), which is not dollar neutral.
- W23, W24, and O19 report losses over 16 years: total returns \(-27.3\%\), \(-34.1\%\), and \(-14.2\%\). The library does not report win rates or profit factors for them. The losses are not reversed here.
- Meese and Rogoff (1983) is the random-walk benchmark: a forecast has to beat "no change" out of sample. These pages are not that test, and they are not a recommendation.
:::

## Exercises

:::exercise The simple return {level=1 check="1/220"}
A USD-quoted rate moves from \(1.1000\) to \(1.1050\). Compute the simple return as a fraction in lowest terms. (Enter the fraction.)
:::solution
\(1.1050/1.1000 - 1 = 0.0050/1.1000 = 5/1100 = 1/220\). The change \(0.0050\) is not the simple return.
:::
:::

:::exercise One standard lot {level=1 check="500"}
On the same move, compute the dollar profit of one long standard lot, with no costs. (Enter the number of dollars.)
:::solution
\(Q = 100\,000\) and the quote rises by \(0.0050\), so the profit is \(100\,000 \times 0.0050 = 500\) dollars. Equivalently, notional \(110\,000\) times \(1/220\) is \(500\).
:::
:::

:::exercise Dollars per pip {level=1 check="10"}
A pip is a quote change of \(0.0001\). How many dollars does one long standard lot gain per pip, with no costs? (Enter the number of dollars.)
:::solution
\(100\,000 \times 0.0001 = 10\) dollars. Fifty pips are \(500\) dollars, the profit in the previous exercise, not a \(0.50\%\) return.
:::
:::

:::exercise Implemented weight {level=2 check="0.22"}
Net asset value is \(1\,000\,000\) dollars, the target weight is \(+0.25\), and the quote is \(1.1000\). The position is truncated towards zero to a whole number of standard lots. What weight is actually held? (Enter the implemented weight.)
:::solution
Unrounded lots are \(250\,000 / 110\,000 = 25/11 \approx 2.2727\). Truncation keeps \(2\) lots, exposure \(220\,000\) dollars, weight \(220\,000/1\,000\,000 = 0.22\).
:::
:::

:::exercise Inverse-vol book return {level=2 check="0.02"}
Weights are \(2/3\) and \(1/3\), fixed before the returns. The next simple returns are \(0.03\) and \(0\). Compute the book return. (Enter the book return.)
:::solution
\((2/3) \times 0.03 + (1/3) \times 0 = 0.02\). The zero return still occupies a third of the book; it contributes nothing, and the first weight is not \(1\).
:::
:::

:::exercise Opposite signs, equal returns {level=2 check="0.003"}
Weights are \(+2/3\) and \(-1/3\), from a stated sign-times-inverse-vol map with gross one. Both next simple returns are \(+0.009\). Compute the book return. The negative weight is the map's output, not an instruction.
:::solution
\((2/3) \times 0.009 + (-1/3) \times 0.009 = 0.006 - 0.003 = 0.003\). Equal simple returns do not cancel, because the weights are not opposites of equal size.
:::
:::

:::exercise A fall in the quote {level=3 check="-1000"}
The USD quote moves from \(1.1000\) to \(1.0900\). Compute the dollar profit of one long standard lot, with no costs. (Enter the number of dollars, with its sign.)
:::hint
The change in the quote is \(-0.01\), not \(-0.01/1\). Multiply by \(100\,000\). A long position in the base loses dollars when the USD quote falls. Leave the sign negative. Do not report the simple return; the question asks for dollars.
:::
:::solution
The change is \(1.0900 - 1.1000 = -0.01\). Profit is \(100\,000 \times (-0.01) = -1000\) dollars. The simple return would be \(-0.01/1.1000 = -1/110\), and \(-1/110 \times 110\,000 = -1000\) as well. Flipping the sign would describe a short base position, which this question did not hold.
:::
:::

:::exercise Truncation at a different quote {level=3 check="0.0625"}
Net asset value is \(2\,000\,000\) dollars. The target weight is \(+0.10\). The USD quote is \(1.2500\). Standard lots are truncated towards zero. Compute the implemented weight. (Enter that weight.)
:::hint
One standard lot is \(100\,000\) base units, so its dollar notional is \(100\,000 \times 1.25 = 125\,000\). Target exposure is \(200\,000\) dollars, which is \(1.6\) lots. Truncation towards zero keeps \(1\) lot, not \(2\). Divide that lot's dollar notional by net asset value.
:::
:::solution
Unrounded lots are \(0.10 \times 2\,000\,000 / 125\,000 = 200\,000 / 125\,000 = 1.6\). Truncation towards zero keeps \(1\). Implemented exposure is \(125\,000\) dollars. The implemented weight is \(125\,000 / 2\,000\,000 = 0.0625\). Nearest rounding would have kept \(2\) lots and a different weight; that is not the rule stated here.
:::
:::
