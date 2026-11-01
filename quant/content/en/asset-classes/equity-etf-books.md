A sector fund and the shares inside it are not the same research object. The fund has one traded price. The shares have many prices, a basket the fund chose, corporate actions the fund processed, and a fee that never arrives as a separate invoice if it has already been taken out of net asset value. A moving-average rule run on the fund's price answers a question about that price. It does not answer the same question about a rule that picks among the constituents.

This chapter specialises two constraints that earlier courses left generic. The first is the instrument: an equity **exchange-traded fund** (ETF) is a traded claim on a basket, so a backtest on its price is a backtest of that claim. The second is the sign of the weight: a **long-only** book never assigns a negative weight. Neither constraint is a suggestion to hold a fund, a share, or cash. The arithmetic below uses hypothetical fees and invented prices. It is not a forecast and not a recommendation.

The open library's long equity examples are mostly studies of ETF prices, not of a stock-picking rule. One of them, W01, is the daily simple-moving-average trend on sector ETFs. The trend course owns that case. This chapter only needs the distinction: a sector-ETF study is not a study of the underlying names, however familiar the ticker.

## What the traded price already contains

An ETF price is a market price for the share of the fund. Inside that one number, several different mechanisms have already acted, and a close-to-close backtest does not see them separately unless the researcher builds a separate model.

The basket is the first. The fund holds constituents in weights its own rules set, and those weights move when the fund rebalances or when prices move. One adjusted ETF series does not show the internal weights. Replacing it with an equal-weighted average of today's members, computed at the end of the sample, is a different experiment, and a survivorship experiment. The universe rule belongs to [[markets/adjustment-universes-and-rolls]].

Corporate actions are the second. A split or a constituent dividend is handled inside the fund before the shareholder looks at the price. If the series is a **price series**, a distributing fund's dividend leaves the price and the simple return misses cash the shareholder received. If the series is a **total-return series**, that cash was put back by the constructor's rule, which may not match the fund's actual distribution. The specification names the series. Then \(R_t = P_t/P_{t-1} - 1\) is the simple return of that series, not automatically the shareholder's total return.

The fee is the third. An expense ratio accrues against assets, so net asset value is lower than a gross-of-fee counterfactual, and the traded price reflects that to the extent the market prices net asset value. Subtracting the same rate again double-counts it. Adding it back pretends the researcher knows a counterfactual the price does not show. This chapter does neither: the algebra below uses a hypothetical gross return, and a real ETF series is left as it is.

Creation and redemption are the fourth, and this chapter does not model them. Authorised participants can create or redeem shares against the basket, and the secondary-market price can sit at a premium or a discount to net asset value. A daily close includes that gap. It does not include a creation ledger unless one is supplied. Ignoring the gap is a modelling choice and belongs in the specification.

None of this makes the ETF the same object as its largest constituent, and none of it is a suggestion to buy the fund. It only fixes what a backtest on one series may claim.

:::definition Equity-ETF research object {#def-etf}
An **equity-ETF book** in this chapter is a rule whose traded instrument is one or more equity ETF prices. The price \(P_t\) is the series named in the specification (price or total return), observed at the decision clock. A feature dated \(t\) may use prices up to \(t\) and is scored on returns after \(t\). The book studies that series. It does not, by itself, study a rule that selects constituents, and it does not undo a fee, a dividend policy, or a premium to net asset value that the series already contains.
:::

:::definition Long-only weights {#def-long-only}
Weights \(w_{i,t}\) are **long-only** when \(w_{i,t} \ge 0\) for every asset \(i\) and every decision date \(t\). The book is **fully invested** when \(\sum_i w_{i,t} = 1\). If cash is allowed, \(\sum_i w_{i,t} \le 1\) and the residual weight \(1 - \sum_i w_{i,t}\) earns a stated cash return, which is \(0\) unless the specification says otherwise. A signal \(s_{i,t}\) is not a weight until a map from signals to weights is stated. The long-only map used in the examples below sends a negative desired weight to \(0\).
:::

The two definitions separate an instrument constraint from a sign constraint. A long-only rule can be run on a single stock. A negative weight on an ETF is a different book, with borrow questions the market-neutral chapter takes up. This chapter sets that weight to zero. The constraint is not a forecast that the negative weight would have lost money.

:::quiz
A backtest loads a total-return series for one equity ETF. The series already reflects the fund's fee. Which reading matches [[#def-etf]]?
- [ ] The path is evidence about a stock-picking rule on the current constituents.
- [x] The path is about that traded series, and subtracting the same fee again double-counts it.
- [ ] The fee identity says the fee should be added back, to be conservative.
- [ ] Long-only means a weight may be negative provided the weights sum to one.
:::solution
The object defined in [[#def-etf]] is the named series, not the constituents and not a gross-of-fee counterfactual. A negative weight would violate [[#def-long-only]], whether or not the weights sum to one.
:::
:::

## A fee taken from ending assets

The hypothetical rate in this section is \(0.10\%\) a year, written \(f = 0.001\). It is not a published expense ratio of any named fund, including SPY. It exists so that a \(5\%\) gross compound annual growth rate has a net counterpart you can compute by hand.

:::proposition Fee on ending assets {#prop-fee}
Let one year have gross simple return \(g > -1\), and write \(G = 1+g\) for the gross growth factor. Suppose a fee at rate \(f\), with \(0 < f < 1\), is charged as a fraction of assets after that gross growth, and suppose no other cost is charged. Then the net growth factor is \(G(1-f)\), and the net simple return is

$$
g_{\mathrm{net}} = (1+g)(1-f) - 1 = g - f - gf.
$$ {#eq-fee}

In particular \(g_{\mathrm{net}} = (g-f) - gf\), so the net return is smaller than the naive difference \(g-f\) by the cross term \(gf\) when \(g > 0\). The identity assumes that this fee is not already inside \(g\). Applying it again to a series that already contains the same fee double-counts the charge.
:::

:::proof
Expand the product: \((1+g)(1-f) - 1 = 1 + g - f - gf - 1 = g - f - gf\). The last step groups \(g - f - gf\) as \((g-f) - gf\). When \(g > 0\) and \(f > 0\), the cross term \(gf\) is positive, so \(g_{\mathrm{net}} < g - f\). When \(g < 0\), the cross term is negative and \(-gf\) raises \(g_{\mathrm{net}}\) relative to \(g-f\): the fee is taken from a smaller ending value. In both cases \(g_{\mathrm{net}} - g = -f(1+g) < 0\), so the fee still reduces the growth factor. The double-counting warning is the assumption that \(g\) is gross of this fee. If \(g\) is already net, the algebra describes a second fee, not the fund's fee.
:::

The cross term is \(0.05 \times 0.001 = 0.00005\), half a basis point in a \(5\%\) year. Subtracting \(0.10\%\) from \(5\%\) and reporting \(4.9\%\) is close for one year. Over a long sample the missed factor is \((1-f)\) each year, and \((1-f)^T\) is not a rounding convenience. The naive difference also has the wrong pattern in a down year. The exact line is [[#eq-fee]].

:::example A 5 percent year and a 0.10 percent fee {#ex-fee}
A hypothetical gross simple return is \(g = 0.05\). The fee rate is \(f = 0.001\), taken from ending assets, and \(g\) does not already contain \(f\). Compute the naive difference \(g-f\), the cross term \(gf\), and the net simple return.
:::solution
The naive difference is \(0.05 - 0.001 = 0.049\). The cross term is \(0.05 \times 0.001 = 0.00005\). By [[#eq-fee]],

$$
g_{\mathrm{net}} = 0.05 - 0.001 - 0.00005 = 0.04895.
$$

The same figure comes from the growth factor: \(1.05 \times 0.999 = 1.04895\), and \(1.04895 - 1 = 0.04895\). One unit of starting assets ends at \(1.04895\), not at \(1.049\) and not at \(1.05\).
:::
:::

:::example Ten years and twenty-six years of the same drag {#ex-wealth}
Keep \(g = 0.05\) and \(f = 0.001\) every year, charged on ending assets, with no other cost. Compute the gross and net wealth factors after \(10\) years and after \(26\) years, starting from one unit, and the fraction of gross wealth that remains after the fees. Round wealth factors half up to six decimal places.
:::solution
The annual factors are \(1.05\) and \(1.04895\). The same gross return is repeated so that the fee is the only difference; that repetition is an assumption, not a market. After \(10\) years the factors, rounded half up to six decimals from a high-precision power, are \(1.05^{10} = 1.628895\) and \(1.04895^{10} = 1.612679\). The gap is \(0.016216\) per unit of starting wealth. Fees retain the fraction \(0.999^{10} = 0.990045\) of gross terminal wealth.

After \(26\) years the factors are \(1.05^{26} = 3.555673\) and \(1.04895^{26} = 3.464372\). The gap is \(0.091301\) per unit started, and the retained fraction is \(0.999^{26} = 0.974322\). Twenty-six is only a horizon for this toy. It is not W01's result, and this fee is not being stacked on an ETF series.
:::
:::

:::widget sequence
a: (1+r)^n
sliders: r=0.05:0.048:0.052:0.00005
N: 26
mode: terms
caption: Wealth after n years of a constant annual factor 1+r, starting from 1. Set r to 0.05, then to 0.04895, and compare the year-26 term with the factors in the ten-year and twenty-six-year example. This is compound interest on a repeated toy return, not a market, not a fund, and not a forecast.
:::

If \(g = 0\), then [[#eq-fee]] gives \(g_{\mathrm{net}} = -f = -0.001\). Assets that do not move still shrink by the fee when it is charged on ending value and was not already in the price. A down year shows the cross term change sign.

:::example A down year, and a two-stock basket {#ex-basket}
Use \(f = 0.001\) again. First, take a hypothetical gross return \(g = -0.05\) that does not already contain the fee, and compute the net simple return. Second, take an invented two-stock basket. The fund starts at a net asset value of \(100\). It holds \(50\) in a share that rises by \(10\%\) and \(50\) in a share that falls by \(20\%\), for one period, with no rebalance inside the period. Then the same fee is charged on ending assets. Compute the gross fund return and the net fund return.
:::solution
For the down year, \(0.95 \times 0.999 = 0.94905\), so \(g_{\mathrm{net}} = 0.94905 - 1 = -0.05095\). The naive difference \(g - f = -0.051\) overstates the loss by the cross term \(0.00005\). The net return is still worse than the gross return: \(-0.05095 < -0.05\). The fee did not "soften" the year relative to a world without the fee. It only fails to equal the naive subtraction.

For the basket, the ending value before the fee is \(50 \times 1.10 + 50 \times 0.80 = 55 + 40 = 95\). The gross simple return is \(95/100 - 1 = -0.05\). This matches the equal-weight average of the constituent simple returns, \((0.10 + (-0.20))/2 = -0.05\), which is the one-period identity for equal starting dollars. The fee then takes \(0.001 \times 95 = 0.095\), so the net asset value is \(94.905\) and the net simple return is \(94.905/100 - 1 = -0.05095\). One period, equal starting dollars, and a proportional fee: the fund return is the weighted constituent return, then [[#eq-fee]]. It is not a new fact about either share.
:::
:::

:::warning Counting the fee twice, or not at all
The worked fee applies to a gross return defined to exclude it. A vendor total-return series for an ETF is often already net of the expense ratio, because the traded net asset value is net. Running [[#eq-fee]] on that series counts a second fee. The opposite mistake is to treat a price drop on a dividend as lost economic value. The specification names the series and the costs still outside it.
:::

## The long-only bound is one period long

A fully invested long-only book is a weighted average of its assets over a single period. That sounds like a platitude until a report shows a book return outside the range of the asset returns, or until someone compounds the one-period bound across a decade.

:::proposition One-period range {#prop-bound}
Let \(R_1,\ldots,R_n\) be simple returns over one period, and let \(w_i \ge 0\) with \(\sum_{i=1}^n w_i = 1\). Define the book return by \(R = \sum_{i=1}^n w_i R_i\). Then

$$
\min_i R_i \le R \le \max_i R_i.
$$

The result uses the one-period weighted sum. It does not apply to a sum of simple returns across time, and it does not apply to a compound return over many periods even if every period is long-only and fully invested. If cash at return \(0\) is allowed and some \(w_i\) are zero, the cash return must be included as its own asset before the bound is claimed.
:::

:::proof
Let \(m = \min_i R_i\). Then \(R - m = \sum_i w_i (R_i - m)\). Each weight is non-negative, each \((R_i - m)\) is non-negative, and the sum of the weights is \(1\), so \(R - m \ge 0\). The same argument with \(M = \max_i R_i\) gives \(M - R = \sum_i w_i (M - R_i) \ge 0\). Both steps fail if some weight is negative, because \(w_i(R_i - m)\) can then be negative. Both steps are about one period's weighted sum. A compound \(\prod_t (1+R_t) - 1\) is not a weighted sum of the constituents' compounds, so the inequality does not carry over to it.
:::

:::example Weights inside the bound, and a weight that is not long-only {#ex-weights}
Two hypothetical assets return \(0.04\) and \(-0.01\) over one period. The long-only fully invested weights are \(0.6\) and \(0.4\). A second pair, \(1.2\) and \(-0.2\), sums to \(1\) but is not long-only. Compute both book returns, and check them against [[#prop-bound]].
:::solution
The long-only book returns \(0.6 \times 0.04 + 0.4 \times (-0.01) = 0.024 - 0.004 = 0.02\). The asset returns range from \(-0.01\) to \(0.04\), and \(0.02\) sits inside that range.

The second pair returns \(1.2 \times 0.04 + (-0.2) \times (-0.01) = 0.048 + 0.002 = 0.05\). The value \(0.05\) is strictly above the larger asset return. [[#prop-bound]] does not apply, and the breach is the negative weight. A report that calls this book long-only is using the word for a book the definition excludes. The arithmetic is not a reason to prefer the negative weight. It is a diagnostic: a one-period return outside the asset range, under a claim of full investment, means some weight was negative or the return identity was not the weighted sum.
:::
:::

:::example Compounds leave the one-period range {#ex-compound}
Two assets, two periods, long-only and fully invested in each period separately. Period 1 uses weights \((1, 0)\) and asset returns \((0.10, -0.50)\), so the book return is \(0.10\). Period 2 uses weights \((0, 1)\) and asset returns \((0.10, 0.50)\), so the book return is \(0.50\). Compute the book's compound return and each asset's compound return.
:::solution
The book compounds by \(1.10 \times 1.50 - 1 = 0.65\). The first asset compounds by \(1.10 \times 1.10 - 1 = 0.21\). The second compounds by \(0.50 \times 1.50 - 1 = -0.25\). The book's compound return \(0.65\) lies outside the interval from \(-0.25\) to \(0.21\). Every period satisfied [[#prop-bound]]. The compound did not, because a compound of weighted sums is not the weighted sum of compounds. A long-only constraint is a statement about weights at each rebalance. It is not a promise that the equity curve stays between the constituents' equity curves.
:::
:::

Path A is the eight-price path shared across the atlas: \(100, 102, 101, 104, 103, 107, 106, 110\). The seven simple returns alternate in sign. That alternation is a property of these eight numbers. It is not a market fact, and a position rule evaluated on seven steps is not a track record. The uncertainty chapter is where a ratio of mean to standard deviation on this path is shown to be too noisy to annualise. Here the path only illustrates a legal clock under a long-only map.

:::example Long-only on Path A, with a legal lag {#ex-path}
Prices are Path A. The desired weight for the next step is \(1\) if the simple return just completed is positive, and \(0\) if it is negative or if no return has completed yet. The weight earns the next simple return, never the same one. Compute the seven weights, the compound growth factor of the book, and the compound simple return rounded half up to six decimal places. Cash earns \(0\).
:::solution
The simple returns, as fractions of the prices, are \(1/50\), \(-1/102\), \(3/101\), \(-1/104\), \(4/103\), \(-1/107\), \(2/53\). Their signs are positive, negative, positive, negative, positive, negative, positive. The legal weight on each of those returns uses the previous sign, and the first weight is \(0\). The weights are therefore \(0, 1, 0, 1, 0, 1, 0\).

On this path the book is flat on the up days and long on the three down days. That is the lag plus the alternation, not a market fact. The growth factor is

$$
\frac{101}{102} \times \frac{103}{104} \times \frac{106}{107} = \frac{551359}{567528}.
$$

The compound simple return is \(551359/567528 - 1 = -0.028490\) to six decimal places. Buy-and-hold on the same prices compounds by \(110/100 - 1 = 0.10\). The long-only lagged rule is a different function of the path. Comparing the two numbers does not say which function to run on any other path.

For contrast, the illegal clock that sets the weight from the same return it earns, still long-only, is long exactly on the four up days. Its growth factor is \(102/100 \times 104/101 \times 107/103 \times 110/106\), and the compound simple return is \(0.132258\) to six decimal places. The illegal number is larger because it uses the sign of the move it is scoring. That is look-ahead, discussed as a bias in [[backtesting/timing-costs-and-biases]]. It is not an ETF effect, and it is not evidence in favour of the rule.
:::
:::

:::intuition The fund is one price
Think of the ETF as a parcel the market prices whole. A question answered with that price is a question about the parcel. Opening it — constituents, creation, fee accrual — needs data the price does not contain. Calling the closed parcel a stock-picking backtest puts those data back by assumption. [[#def-etf]] is the decision to leave it closed and to say so.
:::

:::application Where W01 sits
W01 holds each sector ETF while a 50-day average of its price is above a 200-day average, with daily rebalancing, over a reported span of 26 years. The moving-average chapter owns the rule and the reported path, as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, and not re-run here. The objects are sector ETF series. Copying the tickers does not make a constituent-level study, and it does not make the path a suggestion to hold the funds. Most long equity examples in the library have this shape: the series is the fund.
:::

Cash changes the bound if you forget to include it. One risky ETF returns \(0.10\) with weight \(0.5\), and cash earns \(0\). The book return is \(0.05\), below the only risky return. [[#prop-bound]] was not claimed, because the risky weights do not sum to one. Include cash as an asset with return \(0\) and weight \(0.5\), and \(0.05\) sits between \(0\) and \(0.10\). "Long-only" without a sentence on residual cash is an unfinished constraint.

:::remark What this chapter does not estimate
The hypothetical \(0.10\%\) is not a named fund's expense ratio and not a bid-ask spread. Spread, commission, and tracking difference against a prospectus index are zero in the algebra unless a line puts them in. Tracking difference is an outcome, not an input invented to "correct" a price. A cost enters as [[#prop-fee]] enters: a stated rate and a stated base.
:::

:::history
The listing of SPY in 1993, by State Street, made a capitalisation-weighted equity basket a single exchange-traded price. What changed for research was the habit of loading one equity series and calling the result an equity-market backtest. The series is the fund's price, including its fee and its corporate actions only to the extent that series already reflects them. That smaller claim is [[#def-etf]].
:::

## Where this leads

The next chapter, [[asset-classes/multi-asset-books]], keeps the ETF as the instrument and changes the universe: more than one sleeve, and a fallback that is not automatically cash. The long-only sign constraint is stated in general form in [[portfolio/long-only-and-neutral]], and the moving-average ETF case W01 is treated in [[trend/moving-averages]]. Simple versus total return, which decides whether a dividend is inside \(P_t\), is [[performance/simple-and-log-returns]]. Nothing on those pages, and nothing here, is an instruction to buy, sell, or hold a fund or a share.

:::summary
- An equity-ETF backtest studies the named fund series. It does not study a stock-picking rule on the constituents, and it does not undo a fee the series already contains ([[#def-etf]]).
- Long-only means every weight is non-negative. Fully invested means the weights sum to one. Cash, if allowed, has a stated return ([[#def-long-only]]).
- A fee at rate \(f\) taken from ending assets turns gross growth \(1+g\) into \((1+g)(1-f)\). The net simple return is \(g - f - gf\), not merely \(g-f\) ([[#prop-fee]]).
- On a hypothetical \(5\%\) year and a \(0.10\%\) fee, the net simple return is \(0.04895\). Over \(26\) repeated years the wealth gap against the gross path is \(0.091301\) per unit started, in this toy only.
- Over one period, a fully invested long-only book return lies between the worst and the best asset return ([[#prop-bound]]). A negative weight can leave that range. A multi-period compound need not lie between the constituents' compounds.
- A legal weight uses information available before the return it earns. On Path A the long-only lagged sign rule compounds to about \(-0.028490\); the same-bar version looks better because it cheats the clock.
- W01 is a sector-ETF study. Pointing at it is not a reason to hold the funds, and this chapter does not re-report its path as if it were new evidence.
:::

## Exercises

:::exercise One year, proportional fee {level=1 check="0.04895"}
A hypothetical gross simple return is \(0.05\). A fee of \(0.001\) is taken from ending assets, and the gross return does not already contain the fee. Compute the net simple return. (Enter the net simple return.)
:::solution
By [[#eq-fee]], \(1.05 \times 0.999 - 1 = 1.04895 - 1 = 0.04895\). The naive subtraction \(0.049\) omits the cross term \(0.00005\).
:::
:::

:::exercise The net growth factor {level=1 check="1.04895"}
Same gross return and same fee as the previous exercise. Compute the net growth factor, not the net simple return. (Enter the net growth factor.)
:::solution
The net growth factor is \((1+g)(1-f) = 1.05 \times 0.999 = 1.04895\). Subtract one only when the question asks for a simple return.
:::
:::

:::exercise A long-only weighted sum {level=1 check="0.02"}
Two assets return \(0.04\) and \(-0.01\). Weights are \(0.6\) and \(0.4\). Compute the book return for this one period. (Enter the book return.)
:::solution
\(0.6 \times 0.04 + 0.4 \times (-0.01) = 0.024 - 0.004 = 0.02\). Both weights are non-negative and sum to one, and \(0.02\) lies between \(-0.01\) and \(0.04\), as [[#prop-bound]] requires.
:::
:::

:::exercise The fee in a down year {level=2 check="-0.05095"}
A hypothetical gross simple return is \(-0.05\), still gross of a fee \(f = 0.001\) taken from ending assets. Compute the net simple return.
:::solution
The net growth factor is \(0.95 \times 0.999 = 0.94905\), so the net simple return is \(0.94905 - 1 = -0.05095\). Equivalently, \(g - f - gf = -0.05 - 0.001 - (-0.05)(0.001) = -0.05095\). This is a smaller loss than the naive \(-0.051\), and a larger loss than the gross \(-0.05\).
:::
:::

:::exercise Two periods, still long-only {level=2 check="0.5"}
Period 1: weights \((1, 0)\), asset returns \((0.20, -0.10)\). Period 2: weights \((0, 1)\), asset returns \((-0.10, 0.25)\). Cash is not held, because each period is fully invested. Compute the book's compound simple return over the two periods. (Enter that compound return.)
:::solution
The book return is \(0.20\) in period 1 and \(0.25\) in period 2. The compound return is \(1.20 \times 1.25 - 1 = 1.50 - 1 = 0.5\). Each period is a legal long-only weighted sum. The compound is a different object, which is the point of [[#ex-compound]].
:::
:::

:::exercise How many Path A steps are invested {level=2 check="3"}
Use Path A prices \(100, 102, 101, 104, 103, 107, 106, 110\). The long-only weight on the next step is \(1\) if the simple return just completed is positive and \(0\) otherwise, and there is no position on the first return. How many of the seven simple returns are earned with weight \(1\)? (Enter that count.)
:::solution
The seven returns alternate in sign, starting positive. The legal weights are \(0, 1, 0, 1, 0, 1, 0\). The weight equals \(1\) on three of the seven returns. The count is the object asked for. The compound return of those three steps is a different question, worked in [[#ex-path]].
:::
:::

:::exercise A fee that hits a stated net return {level=3 check="1/105"}
Under the ending-assets convention, a hypothetical gross simple return of \(0.05\) should produce a net simple return of \(0.04\). Find the fee rate \(f\). (Enter \(f\) as a fraction in lowest terms.)
:::hint
Set \((1.05)(1-f) = 1.04\) and solve for \(f\). The answer is not \(0.01\), because the fee is a fraction of ending assets rather than a subtraction from the simple return.
:::
:::solution
The net growth factor is \(1.04\) when the net simple return is \(0.04\). So \(1.05 \,(1-f) = 1.04\), hence \(1-f = 1.04/1.05 = 104/105\), and \(f = 1 - 104/105 = 1/105\). As a decimal, \(1/105 \approx 0.009524\), a little under \(1\%\), not \(1\%\) itself. The cross term is why a full percentage point of fee is slightly more drag, on a positive year, than a one-point subtraction from \(0.05\).
:::
:::

:::exercise Twenty-six years of wealth gap {level=3 check="0.091301"}
Repeat the toy of [[#ex-wealth]]: gross simple return \(0.05\) every year, fee \(0.001\) taken from ending assets every year, for \(26\) years, one unit of starting wealth. Compute the gross terminal wealth minus the net terminal wealth, rounded half up to six decimal places. (Enter that rounded gap.)
:::hint
The net annual growth factor is \(1.04895\), not \(1.049\). Compute \(1.05^{26} - 1.04895^{26}\) and round half up to six decimal places. Do not apply the fee to a market series, and do not treat the gap as a forecast.
:::
:::solution
Gross terminal wealth is \(1.05^{26} = 3.555673\) to six decimals. Net terminal wealth is \(1.04895^{26} = 3.464372\) to six decimals. The difference is \(3.555673 - 3.464372 = 0.091301\), which matches the directly rounded value of the unrounded difference. The retained fraction of gross wealth is \(0.999^{26}\), not \(1 - 26 \times 0.001\). This remains a compound-interest toy on a constant gross return.
:::
:::
