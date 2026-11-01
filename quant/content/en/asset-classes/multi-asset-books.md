A rule that is finished on one equity fund is not finished once a second sleeve appears. The specification has to name the universe, and it has to name what the book holds when it does not want the risky sleeve. Cash at a zero return is one fallback. A second sleeve with its own return is another. Those are different books even when the on-off switch is copied verbatim.

This chapter treats that switch as an object you can compute, not as a list of funds to hold. No bond fund, gold fund, or equity fund is named as something you should buy. A fallback earns whatever simple return the specification writes down. If that return is not zero, the book is not a cash book. The open library's multi-asset pages are cited for their reported shapes and then left alone: this atlas has not re-run them, and a reported path is not a forecast.

## Universe, filter, fallback

Call the risky sleeve \(A\) and the fallback sleeve \(F\). Each sleeve may itself be a basket. While the book is inside a sleeve, that sleeve has a simple return over the period, built from the weights inside it. The multi-asset question is which sleeve is active, not how a moving average is defined. Moving averages live in [[trend/moving-averages]]. The defensive switch, as a signal, is introduced in [[trend/filters-and-defensive]]. Here the new piece is the return of \(F\).

:::definition Universe and fallback {#def-universe}
A **multi-asset book** names a universe of sleeves and a **fallback** sleeve \(F\). The fallback is the sleeve held when the rule is not in the risky sleeve. Its simple return over a period is a number \(R^F\), which may be positive, zero, or negative. Cash is the special case \(R^F = 0\). A bond fund, an equity fund, or any other traded series is not cash unless its return in the sample really is zero. This chapter does not name a real fund as \(F\). The symbol is the specification.
:::

:::definition Binary filter book {#def-filter}
A **binary filter** \(I_t \in \{0,1\}\) is known at the start of period \(t\), using information dated before the returns of period \(t\). The book's simple return is

$$
R_t = I_t \, R^A_t + (1-I_t)\, R^F_t.
$$ {#eq-filter}

\(R^A_t\) is the risky sleeve's simple return and \(R^F_t\) is the fallback's. When \(I_t = 1\) the book earns \(R^A_t\) and does not earn \(R^F_t\). When \(I_t = 0\) it earns \(R^F_t\) and does not earn \(R^A_t\). A filter that is a function of \(R^A_t\) itself has looked at the return it is scoring. That clock is illegal, in the same sense as a same-bar signal in [[backtesting/timing-costs-and-biases]].
:::

The indicator is not a weight inside the sleeve. If the risky sleeve holds several ETFs, their weights are a second map, applied only in periods with \(I_t = 1\). Equal weights are one map. Inverse volatility is another, owned by [[portfolio/inverse-volatility-and-targets]]. Mixing the two maps up — treating the filter as if it were already a set of percentages — produces a book nobody specified.

A period in these examples is a year, so that a fallback of \(0.01\) means one percent over that year. The same algebra works for a day if every return is a daily simple return and the fallback is a daily return, not an annual rate pasted onto a daily rule. Putting \(0.01\) into a one-day slot because "the bond earns one percent" is a unit error. State the horizon.

:::quiz
The filter is off, the risky sleeve's simple return that year is \(-0.08\), and the fallback's simple return is \(0.01\). What does [[#eq-filter]] record for the book?
- [ ] \(-0.08\), because the risky sleeve is the real market.
- [ ] \(0\), because "defensive" means cash.
- [x] \(0.01\), the fallback return, because \(I_t = 0\).
- [ ] \(0.01 - 0.08\), because both sleeves are always held.
:::solution
With \(I_t = 0\), [[#eq-filter]] drops \(R^A_t\) and keeps \(R^F_t\). Cash would be the further special case \(R^F_t = 0\), which this fallback is not. The book does not earn both returns at once.
:::
:::

## The wealth ratio when the fallback is constant

Suppose the fallback return equals the same \(f > -1\) in every off period, and cash is the comparison book that earns \(0\) in those periods and the same risky returns in the on periods. The on periods then cancel in a ratio of terminal wealth.

:::proposition Off-year ratio {#prop-ratio}
Fix a set of periods. Let the binary filter and the risky returns on periods with \(I_t = 1\) be the same for two books. Book \(B\) earns a constant simple return \(f > -1\) on each period with \(I_t = 0\). Book \(C\) earns \(0\) on those periods. Let \(n_{\mathrm{off}}\) be the number of off periods. Then the ratio of terminal wealth, starting from the same unit, is

$$
\frac{W_B}{W_C} = (1+f)^{n_{\mathrm{off}}}.
$$ {#eq-ratio}

The result assumes no extra cost on the switch, no look-ahead in \(I_t\), and a cash return of exactly zero. It does not say that \(W_B\) beats a book that stays in the risky sleeve. That third book earns \(R^A_t\) on the off periods, and those factors do not cancel.
:::

:::proof
Write \(W_B = \prod_t (1+R^B_t)\) and \(W_C = \prod_t (1+R^C_t)\), from a start of one. On each on period, \(R^B_t = R^C_t = R^A_t\), so those factors match. On each off period, \(1+R^B_t = 1+f\) and \(1+R^C_t = 1\). The ratio therefore multiplies by \(1+f\) once per off period and by \(1\) on every on period, which is \((1+f)^{n_{\mathrm{off}}}\). Nothing in the argument depends on the on-period returns, which is why they cancel. Replacing book \(C\) with a book that stays in the risky sleeve removes the cancellation, because that book contributes \(1+R^A_t\) on off periods rather than \(1\).
:::

:::algorithm Building the period returns {#alg-book}
Inputs: a legal filter \(I_t\), risky-sleeve returns \(R^A_t\), and fallback returns \(R^F_t\), one per period.
1. For each \(t\), set \(R_t\) by [[#eq-filter]]. Do not average \(R^A_t\) and \(R^F_t\) unless the specification says the book holds both, with stated weights.
2. Compound by \(\prod_t (1+R_t) - 1\). Do not add the simple returns.
3. If the comparison is cash, repeat with \(R^F_t\) replaced by \(0\), and only then form the ratio \(W_B/W_C\).
4. If \(R^F\) was quoted as an annual rate and the period is not a year, convert the rate or refuse the product. Do not insert the annual number unchanged.
:::

The algorithm is bookkeeping. It does not choose a fallback you should hold. A positive \(f\) raises wealth relative to cash only inside the assumptions of [[#prop-ratio]], on the periods that were actually off, and only relative to cash. A fallback that loses money lowers wealth relative to cash. Both statements are arithmetic.

:::example Four years, fallback at one percent {#ex-four}
The filter over four years is \((1, 0, 0, 1)\). The risky sleeve's simple returns are \(0.12\), \(-0.08\), \(0.05\), \(0.03\). The fallback return is \(0.01\) in every off year. Cash earns \(0\). Compute the book's four returns, its compound return, the cash book's compound return, and the compound return of a book that is always in the risky sleeve.
:::solution
By [[#eq-filter]] the book returns \(0.12\), \(0.01\), \(0.01\), \(0.03\). The off years do not earn \(-0.08\) and \(0.05\). The growth factor is

$$
1.12 \times 1.01 \times 1.01 \times 1.03 = 1.17678736,
$$

so the compound return is \(0.17678736\). The cash book returns \(0.12\), \(0\), \(0\), \(0.03\), and \(1.12 \times 1.03 = 1.1536\), a compound return of \(0.1536\). The always-risky book returns \(0.12\), \(-0.08\), \(0.05\), \(0.03\):

$$
1.12 \times 0.92 = 1.0304, \quad 1.0304 \times 1.05 = 1.08192, \quad 1.08192 \times 1.03 = 1.1143776.
$$

Its compound return is \(0.1143776\). On these four invented years the fallback book finished above both cash and the always-risky sleeve. That ordering is a property of these four numbers, in particular of the off-year risky path \(0.92 \times 1.05 = 0.966\), which is worse than \(1.01 \times 1.01 = 1.0201\). It is not evidence that a fallback sleeve is a good thing to hold, and the years are not a sample of any market.
:::
:::

:::example Checking the ratio, then a fallback that loses {#ex-ratio}
Using the books in [[#ex-four]], compute \(W_B/W_C\) and compare it with \((1.01)^2\). Then replace the first off year only: the fallback returns \(-0.03\), \(0.01\) in the two off years, and the on years stay \(0.12\) and \(0.03\). Compute that book's compound return and compare it with cash.
:::solution
The wealth levels are \(1.17678736\) and \(1.1536\). Their ratio is \(1.17678736 / 1.1536 = 1.0201\). And \((1.01)^2 = 1.0201\). [[#eq-ratio]] matches, with \(n_{\mathrm{off}} = 2\) and \(f = 0.01\). The on-year factors cancelled, as the proof said they would.

The losing fallback produces returns \(0.12\), \(-0.03\), \(0.01\), \(0.03\). The factor is

$$
1.12 \times 0.97 = 1.0864, \quad 1.0864 \times 1.01 = 1.097264, \quad 1.097264 \times 1.03 = 1.13018192.
$$

The compound return is \(0.13018192\), below the cash book's \(0.1536\). One negative fallback year was enough to lose the comparison with cash on this path. A fallback is not a free option. It contributes its own return, which the specification has to allow to be negative. Calling the sleeve "defensive" does not set that return to zero, and it does not keep the return positive.
:::
:::

:::example An equal-weight sleeve, then one off year {#ex-sleeve}
In an on year the risky sleeve holds two invented ETFs in equal starting weights, with simple returns \(0.08\) and \(-0.02\). The next year the filter is off and the fallback returns \(0.01\). No cost is charged on the switch. Compute the sleeve return in the on year and the two-year compound return of the book.
:::solution
Equal starting dollars over one period give the arithmetic mean: \((0.08 + (-0.02))/2 = 0.03\). That is \(R^A\) for the on year. The off year contributes \(0.01\), not a second average of constituents that are not held. The compound return is \(1.03 \times 1.01 - 1 = 0.0403\). The \(0.03\) is a one-period weighted sum, the object bounded in [[asset-classes/equity-etf-books]] when weights are long-only and fully invested. The \(0.0403\) is a compound of two different sleeves. Do not describe \(0.0403\) as "the average of the two ETFs".
:::
:::

:::example A filter that cheats the year {#ex-clock}
Suppose someone sets \(I_t = 1\) when \(R^A_t > 0\) and \(I_t = 0\) otherwise, using the same year's risky return, with fallback \(0\). On the risky returns \(0.12\), \(-0.08\), \(0.05\), \(0.03\), compute this illegal book's compound return, and compare it with the legal book in [[#ex-four]] only as a difference of clocks.
:::solution
The same-year signs are positive, negative, positive, positive, so the illegal returns are \(0.12\), \(0\), \(0.05\), \(0.03\). The factor is \(1.12 \times 1 \times 1.05 \times 1.03 = 1.21128\), and the compound return is \(0.21128\). The legal fallback book in [[#ex-four]] compounded to \(0.17678736\) on a different filter, so the two numbers are not a pure look-ahead gap: the filters differ as well as the clocks. The clean point is smaller. The illegal rule uses \(R^A_t\) to decide whether to keep \(R^A_t\). That decision is not available at the start of the year. A higher compound return from that use is not a property of multi-asset investing. It is a property of reading the year before choosing the sleeve.
:::
:::

:::widget plot
f: (1.06)^x; (1.06)^(0.5*x)*(1.01)^(0.5*x); (1.06)^(0.5*x)
x: 0, 20
labels: risky every year; half the years at 1 percent; half the years in cash
caption: Three smooth wealth paths that share a risky annual factor of 1.06. The middle path spends half the years in a fallback earning 1 percent. The lowest spends those years in cash at zero. Drag is not required. The curves are compound interest, not the four-year example, not a forecast, and not a suggestion to hold a fund, a bond, or cash.
:::

:::warning A fallback is not a virtue
Two slips are common. The first is to write "defensive" and then compound at zero, when the sleeve named in the specification returned something else, including a loss. The second is to read a published switch as a shopping list: the risk-on names in good times, the other names otherwise. [[#def-universe]] allows a symbol \(F\) with a return. It does not name a fund, and it does not say the reader should hold one. A third slip, flipping a disappointing risky sleeve into "so hold the fallback", uses the same sample twice. The off periods were part of the path that suggested the flip.
:::

## What the library pages actually vary

W06 and W02 are multi-asset ETF studies in the open library. The trend course owns W06's filter, and the portfolio course owns drift bands. This section only records what changes when the book is no longer a single equity series, and what the pages report. The figures are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests. They are not forecasts and not recommendations. Where a one-line description says "defensive", that word is their label for a sleeve in that experiment. It is not a generic asset you should buy.

W06 changes sleeve when a signal changes, rather than on a calendar. The catalogue's rule is: if SPY is above its 200-day average, hold the risk-on ETF list; otherwise hold the defensive list. The reported span is 19 years. The reported total return is \(+132\%\), the reported CAGR is \(+4.54\%\), the reported Sharpe is \(0.26\), the maximum drawdown is \(-24.6\%\), the win rate is \(41.1\%\), and the profit factor is \(1.64\). A win rate below one half with a profit factor above one means, if both statistics share a unit, that winning units were larger than losing units on average. The page does not by itself tell you the unit. SPY, in this sentence, is an input to a published filter. Naming it is not advice to hold it, and the defensive list is not advice either.

W02 is a different experiment on a multi-asset ETF universe: an SMA(50)/SMA(200) trend, with trades at month-end and when a position has drifted through a \(5\%\) band. The reported span is again 19 years. The reported total return is \(+138\%\), the reported CAGR is \(+4.66\%\), the reported Sharpe is \(0.31\), the maximum drawdown is \(-19.4\%\), the win rate is \(63.5\%\), and the profit factor is \(1.73\). The \(5\%\) band is part of that specification. It is not a default band for every book. A weight that moves from \(0.50\) to \(0.52\) has relative drift \(0.52/0.50 - 1 = 0.04\), which does not cross a \(5\%\) band; a move from \(0.50\) to \(0.53\) has relative drift \(0.06\), which does. The portfolio chapter derives drift properly. The only point here is that W02's calendar-plus-band is not W06's signal-change rule. Similar CAGR figures, \(4.66\%\) and \(4.54\%\), sit on different switches. "The" multi-asset trend result is not a thing these two pages support.

Both pages can lose a large fraction of wealth on the reported drawdowns even with positive reported CAGRs. A fallback sleeve does not delete that sentence. Whether their fallback or defensive list earned a return near zero, near a bond's return, or something else is a question about their holdings and their data, which this atlas has not re-derived. Reading \(+4.54\%\) as "cash plus a bit" would invent a decomposition the catalogue line does not give.

:::intuition Cancellation is the whole trick
[[#prop-ratio]] feels stronger than it is, because the on-years disappear. They disappear only from the comparison with cash, and only when the on-years really match. Change one on-year return and the ratio moves. Compare with a book that stayed risky, and the off-year risky returns come back into the product, as they did in [[#ex-four]], where the always-risky compound was the worst of the three on that invented path. Cancellation is algebra. It is not a ranking of sleeves.
:::

:::remark Annual rate, daily book
A specification that says "the fallback earns \(1\%\) a year" has not said what a day earns. Spreading \(0.01\) across \(252\) trading days as \(0.01/252\) is one convention. Compounding a daily factor \(1.01^{1/252}\) is another. They differ, and neither is what a bond fund did on a particular day. If the research series is daily, the honest input is the daily simple return of the named fallback series, including the negative days. The annual sentence is not a substitute.
:::

:::history
Antti Ilmanen's *Expected Returns* (2011) surveys evidence across asset classes and keeps the sample period next to the claim. A multi-asset book in the sense of [[#def-filter]] is a smaller object than that survey: a named universe, a legal filter, and a fallback return. The book is not the survey, and a single published path, including W06 or W02, is not a cross-asset law. The date matters because the habit of putting several ETF sleeves in one rule is recent relative to the underlying markets, while the arithmetic of a switch is not.
:::

## Where this leads

Foreign exchange, in [[asset-classes/foreign-exchange]], keeps a multi-asset shape — several series, weights that can depend on volatility — and changes the instrument to a dollar-quoted spot rate. The library's FX pages on that instrument report losses. The filter that chooses a defensive sleeve is [[trend/filters-and-defensive]]. Drift bands of the W02 kind are [[portfolio/drift-turnover-and-breakers]]. None of these chapters names a fund, a bond, or a currency for you to hold.

:::summary
- A multi-asset book names a risky sleeve and a fallback. The fallback return is an input. It is zero only when the specification says cash ([[#def-universe]]).
- A legal binary filter is known before the returns it scores. The book earns exactly one of the two sleeve returns in each period ([[#eq-filter]]).
- Against a cash book with the same on-years, constant fallback return \(f\) scales terminal wealth by \((1+f)\) to the power of the number of off periods ([[#prop-ratio]]).
- On the invented four-year path, fallback \(0.01\) compounds to \(0.17678736\), cash to \(0.1536\), and the always-risky sleeve to \(0.1143776\). One negative fallback year undoes the gap versus cash.
- An equal-weight on-year is an arithmetic mean of that period's constituent returns. The next off year does not average constituents the book does not hold.
- W06 and W02 are different switches on multi-asset ETF universes, with reported CAGRs \(+4.54\%\) and \(+4.66\%\) over 19 years. The figures are not a recommendation, and this atlas has not re-run them.
- "Defensive" is a label in a specification. It is not a proof that the sleeve's return was positive, and it is not a list of funds to buy.
:::

## Exercises

:::exercise The off year {level=1 check="0.01"}
The filter is off. The risky sleeve would have returned \(-0.08\). The fallback return is \(0.01\). What simple return does the book record? (Enter the book's simple return.)
:::solution
[[#eq-filter]] with \(I_t = 0\) returns \(R^F_t = 0.01\). The risky return is not used. Cash would have recorded \(0\), which is a different fallback.
:::
:::

:::exercise One off year against cash {level=1 check="1.01"}
Two books share every on-year return. There is exactly one off year. The fallback book earns \(0.01\) that year and the cash book earns \(0\). What is the ratio of their terminal wealth? (Enter the ratio.)
:::solution
By [[#eq-ratio]], the ratio is \((1.01)^1 = 1.01\). The on-year returns are not needed, provided they match.
:::
:::

:::exercise Three years with one off year {level=1 check="0.03929"}
The filter is \((1, 0, 1)\). Risky returns are \(0.05\), \(0.20\), \(-0.02\). The fallback earns \(0.01\) in the off year. Compute the book's compound return. (Enter the compound return.)
:::solution
The book returns \(0.05\), \(0.01\), \(-0.02\). The middle risky return \(0.20\) is not earned. The factor is \(1.05 \times 1.01 \times 0.98 = 1.03929\), so the compound return is \(0.03929\).
:::
:::

:::exercise The same three years in cash {level=2 check="0.029"}
Repeat the previous exercise with a cash fallback of \(0\) instead of \(0.01\). Compute the compound return.
:::solution
The returns are \(0.05\), \(0\), \(-0.02\). The factor is \(1.05 \times 0.98 = 1.029\), so the compound return is \(0.029\). The ratio of wealth levels \(1.03929 / 1.029 = 1.01\), which is the one-off-year case of [[#prop-ratio]].
:::
:::

:::exercise Equal weight inside the sleeve {level=2 check="0.03"}
While the filter is on, four invented assets return \(0.08\), \(0.02\), \(-0.04\), and \(0.06\), held in equal starting weights for that one period. Compute the sleeve's simple return. (Enter the sleeve return.)
:::solution
Equal starting weights over one period give the arithmetic mean: \((0.08 + 0.02 - 0.04 + 0.06)/4 = 0.12/4 = 0.03\). This is not a compound, and it is not a fallback return.
:::
:::

:::exercise A negative middle year {level=2 check="-0.00187"}
Year returns are \(0.05\), \(-0.03\), \(-0.02\), already the book returns after the filter has been applied. Compute the compound return.
:::solution
The factor is \(1.05 \times 0.97 \times 0.98 = 0.99813\). The compound return is \(0.99813 - 1 = -0.00187\). Adding the simple returns would have given \(0\), which is the wrong object.
:::
:::

:::exercise Four off years {level=3 check="1.04060401"}
A fallback book and a cash book share the same on-year returns. The fallback return is \(0.01\) in each of four off years, and cash earns \(0\) in those years. Compute the ratio of terminal wealth, fallback over cash. (Enter the ratio.)
:::hint
The on-year factors cancel. [[#eq-ratio]] leaves \((1+f)\) raised to the number of off years. Here \(f = 0.01\) and there are four off years. Do not insert the risky returns into the ratio.
:::
:::solution
The ratio is \((1.01)^4 = 1.04060401\). Any shared on-year path multiplies both wealth levels and drops out. The ratio is not a compound return; subtract one only if the question asks for a return.
:::
:::

:::exercise Two off years inside a short path {level=3 check="0.03968592"}
The filter is \((1, 0, 1, 0)\). Risky returns are \(0.04\), \(0.10\), \(-0.02\), \(0.07\). The fallback earns \(0.01\) whenever the filter is off. Compute the book's compound return. (Enter the compound return.)
:::hint
Off years earn \(0.01\), not the risky returns \(0.10\) and \(0.07\), and not zero. Multiply \(1.04 \times 1.01 \times 0.98 \times 1.01\) and subtract \(1\).
:::
:::solution
The book returns \(0.04\), \(0.01\), \(-0.02\), \(0.01\). Then \(1.04 \times 1.01 = 1.0504\), \(1.0504 \times 0.98 = 1.029392\), and \(1.029392 \times 1.01 = 1.03968592\). The compound return is \(0.03968592\). The unused risky returns do not enter.
:::
:::
