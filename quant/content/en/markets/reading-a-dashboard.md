A results page is a table of summaries of one historical path under one protocol. It is not a shop window, and it is not a forecast. Reading it well means knowing which question each cell answers and which question it leaves open. The cells in front of a reader of the open library are a total return, a compound annual growth rate, a reported Sharpe ratio, a maximum drawdown, a win rate and a profit factor. This chapter defines the first two, says what kind of object the other four are, and reads three published rows without turning any of them into a recommendation.

The rows are QuantJourney examples as reported on quants.md, Apache-2.0, read in 2026. This atlas has not re-run the backtests. Where two printed cells disagree with a textbook identity by a tenth of a percentage point, the disagreement is left on the page. We do not "correct" a vendor's rounding into a new performance number, and we do not invent a Sharpe convention the page does not state.

The series underneath a cell is the series the previous chapter worried about. A total return on raw closes, on a split-adjusted price index, on a total-return index, or on a continuous future, are four experiments. The dashboard inherits whichever one the page used. If the page is silent, the cell is not yet interpretable, however many decimals it prints.

## Two numbers that share the endpoints

:::definition Total return {#def-total}
Over a stated path of value, with starting value $V_0 > 0$ and ending value $V_T$, the **total return** is

$$
\frac{V_T}{V_0} - 1.
$$

It is the simple return of the whole window. It does not say when, inside the window, the value rose or fell. A published "return" of $+126.66\%$ is this object only if $V_T/V_0 - 1 = 1.2666$ under the page's own accounting. Costs, the cash rate and the series are inside that accounting, or they have been omitted. The cell does not say which.
:::

Total return is a property of the endpoints and of the protocol that produced them. Two protocols with the same endpoints share it and can differ everywhere else. Path A, the invented closes from $100$ to $110$, has total return $0.10$. That sentence is complete only because we know there was no split, no dividend, no cost and no external cash flow. A library cell is the same kind of sentence with most of those clauses unstated on the summary line. The clauses are part of the result.

:::definition Compound annual growth rate {#def-cagr}
Let $Y > 0$ be the length of the window in years, under a year-count you state. The **compound annual growth rate** is

$$
g = \left(\frac{V_T}{V_0}\right)^{1/Y} - 1.
$$

It is the constant simple rate per year which compounds to the same terminal multiple: $V_0 (1+g)^Y = V_T$. It is not a typical year, and it is not a forecast that the next year will earn $g$.
:::

The year-count is part of the definition. "Twenty-five years" might mean $25$ exactly, or a day count divided by $365.25$, or a count of trading days divided by $252$. Those choices move $g$ slightly. They do not move the total return at all, because total return has no $Y$ in it. A page that prints both cells has printed a total return, a year-count and a rate, whether or not the three are labelled. Checking them against each other is a reading skill, not a repair.

:::proposition Same endpoints, same CAGR, not the same path {#prop-same-cagr}
Assume $V_0 > 0$ and $Y > 0$, and define $g$ by [[#def-cagr]]. Then $V_0(1+g)^Y = V_T$. Any other path with the same $V_0$, the same $V_T$ and the same $Y$ has the same total return and the same $g$.

Maximum drawdown, marked on a stated grid as the most negative value of $V / \text{running peak} - 1$, depends on the intermediate marks. It is not a function of $(V_0, V_T, Y)$ alone.
:::

:::proof
Raise $1+g = (V_T/V_0)^{1/Y}$ to the power $Y$. The exponents cancel and $(1+g)^Y = V_T/V_0$, so $V_0(1+g)^Y = V_T$. If a second path has the same three inputs, the same algebra produces the same $g$, and [[#def-total]] produces the same total return $V_T/V_0 - 1$. Nothing in that algebra consults an intermediate value.

Drawdown does. Let the running peak at a mark be the maximum value on the grid up to that mark. The drawdown at the mark is the value divided by the running peak, minus one, and the maximum drawdown is the minimum of those numbers (a non-positive number, or zero if the path never falls below a peak). Changing an intermediate mark can change the running peak or the trough without changing $V_T$. The functional is therefore not determined by the endpoints. The example that follows is the witness: two paths, one $Y$, one $g$, two drawdowns.
:::

:::example Two paths, one growth rate {#ex-two-paths}
Both paths start at $100$ and end at $121$ after two years, so $Y = 2$. The monotone path is $100$, $110$, $121$. The dipped path is $100$, $50$, $121$. Compute the total return, the CAGR, and the maximum drawdown of each path, marking at the three dates.
:::solution
The terminal multiple is $121/100 = 1.21$. The total return is $0.21$ on both paths. The CAGR is

$$
g = 1.21^{1/2} - 1 = 1.1 - 1 = 0.10,
$$

because $1.1^2 = 1.21$. [[#prop-same-cagr]] said the dipped path could not escape this $g$, and it cannot. A constant $10$ percent a year describes the endpoints. It does not describe a year in which the value was cut in half.

On the monotone path the running peak is $100$, then $110$, then $121$. The value never sits below the peak in force at that date, so the maximum drawdown is $0$. On the dipped path the running peak is $100$ at the first two dates, and the middle value gives $50/100 - 1 = -0.50$. The final value $121$ sets a new peak and a drawdown of $0$ at the end, which does not erase the $-0.50$ in the middle. The maximum drawdown is $-0.50$.

The two paths are the proposition's witness. A dashboard that printed "CAGR $+10\%$" would be telling the truth about both and would be silent about the difference a holder would have felt. Drawdown is the cell that speaks to that difference, and it speaks only about the path that was marked, not about the next one. The performance course defines drawdown with the care a statistic needs. Here the number $-0.50$ is the minimum of value over running peak, minus one, on a grid we stated.
:::
:::

:::warning Do not annualise seven observations
Path A's total return is $0.10$ over seven simple returns. Suppose someone forces the year-count $Y = 7/252$, as if seven trading days were $7/252$ of a year, and reports a CAGR. Then

$$
g = (1.10)^{252/7} - 1 \approx 29.91.
$$

A rate of $29.91$ means a terminal multiple near $30.91$ over one such "year". The eight invented prices do not contain a year, and they do not support that multiple. The same impulse, applied to the path's ratio of mean simple return to its sample standard deviation, which is $0.6097$ per step, multiplies by $\sqrt{252}$ and gets about $9.68$. The path statement already flags $9.68$ as not a meaningful annual figure. Both calculations are algebraically tidy and scientifically empty. A library page with a span of a few weeks that leaves the CAGR cell blank is behaving better than this annualisation. Do not fill the blank.
:::

:::example Path A's own row {#ex-path-a-row}
Mark an equity index at each Path A close, starting from $1$ at the close $100$. The index finishes at $1.10$. The only decline is the step from $102$ to $101$. Compute the total return and that peak-to-trough move. Say what a CAGR cell would be doing if someone filled it in.
:::solution
The index is the gross compound of the simple returns, so it equals the price divided by $100$: $1$, $1.02$, $1.01$, $1.04$, $1.03$, $1.07$, $1.06$, $1.10$. The total return is $1.10 - 1 = 0.10$, which is also $110/100 - 1$. [[#def-total]] needs nothing else, because this path has no external cash flow.

The running peak falls only on the step $1.02$ to $1.01$, and $1.01/1.02 - 1 = 101/102 - 1 = -0.009804$ at the path's six-decimal return. Every later close is at or above the peaks that precede it, so the maximum drawdown on this grid is $-0.009804$. It is a real dip and a small one. A dashboard that printed only $+10\%$ would be silent about it. [[#prop-same-cagr]] is why the silence matters: another path with the same endpoints could have hidden a much larger dip, and the total-return cell would look identical.

There is no honest CAGR cell. The sample is seven steps, not a year. The warning above is what you get if the cell is filled anyway: a rate near $29.91$ that restates $0.10$ under a silly year-count. [[#alg-read]] says to leave a short span's CAGR blank. Path A is the shortest possible illustration. It is not a library page, and the drawdown $-0.009804$ is not a forecast of anything that will be traded.
:::
:::

## What the other cells are names of

:::definition A published results row {#def-row}
A **published results row** is a tuple of statistics computed on one stated sample, under one protocol: the series, the clock, the signal, the map to weights or the order rule, the cost model, and the definitions of the statistics. In the open library a row typically shows a total return, a CAGR, a Sharpe ratio, a maximum drawdown, a win rate and a profit factor, together with a bar size and a span. A blank cell means the page does not report that statistic. It is not a zero, and it is not an invitation to impute one.

The Sharpe ratio, the drawdown, the win rate and the profit factor are defined in the performance course. Until those definitions are in force, a printed figure is a **reported** figure under the page's own unstated convention. In particular, this atlas has not verified how the library annualises a Sharpe ratio.
:::

The honest way to point at the four names, without pretending to define them, is to say what question each one fails to close.

A reported Sharpe ratio is some ratio of average reward to variability. The performance course will set the risk-free rate, the standard-deviation divisor and the annualisation factor. O01's reported Sharpe of $0.21$ and W01's reported Sharpe of $0.45$ are not yet known to be that object. They are the numbers on the page. A larger one is not a decision.

A maximum drawdown is a peak-to-trough summary of the path that was run. It is silent on how long the trough lasted, and it is silent on any path that was not run. It is not a forecast of the next trough.

A win rate needs a unit: a day, a trade, a month, a rebalance. Without the unit, two percentages are not comparable. With the unit, a win rate above one half can still sit next to a loss, if the losses are larger than the wins. The performance course makes that arithmetic precise. This chapter refuses to rank rows by the win column.

A profit factor is a ratio of gains to losses on a stated unit. A value below one lines up, in ordinary cases, with a negative total of those units. The alignment is not a theorem until the unit is the same unit as the total return, which a weight backtest may not grant you. W20's profit factor, discussed in the library note as a prompt to ask how a "win" is defined, is a later chapter's caution. We do not need it to read the rows below, and we do not treat any profit factor as portable.

:::algorithm Reading one row {#alg-read}
Read a published row in this order. Stop at the first item you cannot answer from the page and the stated protocol.

1. Name the case identifier and the family: weight, order, or walk-forward. A family is not a result.
2. Read the bar size and the span before any ratio. A span of weeks cannot support an annual rate. Leave a blank CAGR blank.
3. Read the total return and the CAGR together. Under an explicit year-count, check whether $(1+g)^Y - 1$ is the printed total return, up to ordinary rounding. If it is not, say so. Do not replace either cell with your own.
4. Read the maximum drawdown as a fact about that path. Do not read it as a bound on the future.
5. Read the win rate and the profit factor only together with the unit of a win. If the unit is not stated, the two cells are labels, not measurements you can compare across pages.
6. Do not convert the row into a holding, a fund, a broker, a leverage or a forecast. The page is a record of one protocol on one history.
:::

:::quiz
Two strategies both end at $1.21$ times starting wealth after two years. Which statement follows from [[#prop-same-cagr]] alone?
- [ ] They had the same maximum drawdown
- [ ] They had the same win rate
- [x] They had the same CAGR, and the drawdowns may still differ
- [ ] The next year will earn that CAGR
:::solution
The proposition gives them the same CAGR, here $0.10$, and the same total return, $0.21$. Drawdown depends on the path between the endpoints. [[#ex-two-paths]] has drawdowns $0$ and $-0.50$ on exactly this terminal multiple. Nothing in the endpoints is a forecast.
:::
:::

## The same broad family, two rows

O01 and W01 are both moving-average studies in the open library, and they are not the same experiment. The lesson of putting them side by side is that the implementation is part of the result. It is not that one of them is the moving-average result, and it is not that a reader should prefer the larger CAGR.

O01, "Market SMA Cross", buys when a $20$-day average crosses above a $50$-day average and sells on the reverse, with market orders, on equity exchange-traded funds, daily bars, over $25$ years. W01, "Daily SMA Trend", holds each sector exchange-traded fund while a $50$-day average is above a $200$-day average, as daily target weights, over $26$ years. The figures below are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests.

| | O01 | W01 |
|---|---|---|
| Family | orders | weights |
| Bars | daily | daily |
| Span | $25$ years | $26$ years |
| Total return | $+126.66\%$ | $+537\%$ |
| CAGR | $+3.33\%$ | $+7.38\%$ |
| Reported Sharpe | $0.21$ | $0.45$ |
| Maximum drawdown | $-16.35\%$ | $-34.7\%$ |
| Win rate | $51.9\%$ | $72.6\%$ |
| Profit factor | $2.18$ | $2.48$ |

The windows differ ($20/50$ against $50/200$). The object differs (a market-order cross against a daily weight that is on while the fast average is above the slow one). The span differs by a year. The universe is described as equity funds in one line and sector funds in the other. Any of those differences could move a compound growth rate. The table does not say which one did. Attributing the gap from $+3.33\%$ to $+7.38\%$ to "weights beat orders", or to "the longer average", would require an experiment that changed only that one thing. These two pages are not that experiment.

The drawdowns refuse the same attribution in the other direction. W01's reported maximum drawdown, $-34.7\%$, is deeper than O01's $-16.35\%$. Reading $-34.7\%$ as $-0.347$ and $-16.35\%$ as $-0.1635$, the difference is $-0.1835$. The row with the higher reported CAGR is the row with the deeper reported drawdown, on these two pages, in this reading. That pairing is a fact about the table. It is not a trade-off the reader is invited to accept, and it is not a law about moving averages. A third page could pair a higher CAGR with a shallower drawdown, or a loss with a shallow one. O10, below, is a loss. The table is not a menu.

:::example Does the printed CAGR reproduce the printed total? {#ex-identity}
Assume $Y = 25$ exactly for O01 and $Y = 26$ exactly for W01, and assume the printed CAGRs are exactly $0.0333$ and $0.0738$. Compute $(1+g)^Y - 1$ and compare it with the printed total returns $+126.66\%$ and $+537\%$.
:::solution
Python gives $(1.0333)^{25} - 1 = 1.268092$, that is $+126.81\%$ when the percentage is rounded to two decimals. The page reports $+126.66\%$. The gap is about $0.15$ percentage points of total return. Inverting the reported total instead, $2.2666^{1/25} - 1 \approx 0.03327$, against a printed CAGR of $0.0333$. The gap in the rate is about $0.27$ basis points. Ordinary rounding of either cell, or a year-count that is not exactly $25$, would move the identity by this much. We cannot separate those causes without the equity curve, and this atlas has not re-run it. Both cells stand as printed. Neither is replaced.

For W01, $(1.0738)^{26} - 1 = 5.368078$, that is $+536.81\%$ to two decimals, against a reported $+537\%$. The gap is about $0.19$ percentage points. Inverting $6.37^{1/26} - 1$ gives about $0.07381$, next to the printed $0.0738$. At the precision the page uses, the two W01 cells agree. The O01 pair agrees a little less tightly and still looks like rounding rather than like two different experiments. [[#alg-read]] says to notice the check and not to overwrite the page.

The widget below draws $(1.0333)^x$ and $(1.0738)^x$ for $x$ from $0$ to $25$. At $x = 25$ the curves sit near $2.2681$ and $5.9304$. The second number is not W01's terminal multiple: W01's span is $26$ years, and $(1.0738)^{26} \approx 6.3681$, while $+537\%$ is a multiple of $6.37$. The curve is a smooth picture of a rate. It is not the equity path, whose drawdown cell says the path fell by more than a third from a peak in W01's reported row, something a smooth compound curve never does.
:::
:::


A dashboard that quotes a terminal return and a drawdown is quoting two different functions of one path. Drag any price in the figure. The equity index starts at 1. The maximum drawdown is the most negative value of equity divided by the running peak, minus 1. Path A, left untouched, ends at a compound return of 0.10 and its maximum drawdown is −0.009804.

:::widget equity
preset: a
caption: Drag a mark. Compound return and maximum drawdown both move, and they do not move by the same amount. Path A’s untouched numbers are a compound return of 0.100000 and a maximum drawdown of −0.009804. This is a toy path.
:::
:::widget plot
f: (1.0333)^x; (1.0738)^x
x: 0, 25
labels: O01 reported CAGR; W01 reported CAGR
caption: Smooth compound curves of the CAGRs reported on quants.md for O01 (+3.33%) and W01 (+7.38%), as read in 2026. These are not the equity paths, not forecasts, and not a reason to prefer either example. This atlas has not re-run the backtests. W01's reported span is 26 years, so the right-hand edge of the picture is not W01's reported horizon.
:::

:::quiz
The smooth curve $(1.0738)^x$ ends near $5.93$ at year $25$. Which reading of that picture is fair?
- [ ] It is W01's equity path, so the path never drew down
- [ ] It shows that the W01 protocol should be traded in preference to O01
- [x] It is the constant CAGR reported for W01, drawn as a smooth curve, and it omits the path and the extra year of span
- [ ] It corrects the reported total return of $+537\%$ and replaces it
:::solution
[[#ex-identity]] separates the curve, the $26$-year compound of the same rate, and the reported total return. A smooth curve has drawdown zero by construction, while W01's reported maximum drawdown is $-34.7\%$. The picture illustrates a rate. [[#alg-read]] forbids turning the illustration into a holding.
:::
:::

## A row that loses money

A dashboard that only showed O01 and W01 would look like a shop window: two positive CAGRs, two profit factors above one. The library also contains losses. O10, "Trailing Stop RSI", is an oversold RSI entry with a $5\%$ trailing stop, daily bars, over $25$ years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, and not re-run here: total return $-12.2\%$, CAGR $-0.52\%$, reported Sharpe $-0.41$, maximum drawdown $-39.0\%$, win rate $39.8\%$, profit factor $0.91$.

The sign is the point. A results page can say that the protocol lost money on the sample. The loss is evidence about that published combination of an entry and an exit, on that sample, under that cost and fill convention, whatever those were. It is not a reason to take the other side of the same rule. Flipping the sign of a losing backtest is a new experiment, with its own clock, and the original loss does not identify the flipped rule's future.

:::example The negative CAGR against the negative total {#ex-o10}
Treat O10's printed CAGR as $-0.0052$ exactly and the span as $25$ years exactly. Compute $(0.9948)^{25} - 1$ and set it next to the printed total return $-12.2\%$.
:::solution
$(0.9948)^{25} - 1 = -0.122202$, that is $-12.22\%$ to two decimals. The page reports $-12.2\%$. The gap is about two hundredths of a percentage point, smaller than the O01 gap and consistent with rounding a total return to one decimal. Inverting $0.878^{1/25} - 1$ gives about $-0.005191$, next to the printed $-0.0052$. The identity check passes in the same modest sense as W01's.

The check passing does not make the row a success. Both cells are negative. The reported Sharpe is negative, the profit factor is below one, and the drawdown is $-39.0\%$. [[#def-row]] says each of those is a reported figure under a convention we have not re-derived. They agree in sign with a loss. That is as much as the summary line can honestly be said to show. The win rate $39.8\%$ is below one half. Even if it had been above one half, the performance course will show that a high win rate can accompany a negative compound return when the losses are large. We do not need that construction here, because this row is negative in the total, the CAGR, the reported Sharpe and the profit factor together.

O10's span is $25$ years, the same order as O01's, so the negative CAGR is not an artefact of annualising a week. The warning about seven observations does not rescue the row, and it does not condemn it either. The row is a long-sample published loss. Leaving it in the chapter is the difference between reading a dashboard and shopping on one.
:::
:::

:::remark Reported Sharpes are not Path A's ratio
Path A's ratio of mean to sample standard deviation is $0.6097$ per step, on seven returns, with divisor $n-1$. Multiplying by $\sqrt{252}$ produces the meaningless $9.68$ already refused. O01's $0.21$ and W01's $0.45$ and O10's $-0.41$ are not that object with a different sample. They are reported Sharpes whose annualisation this atlas has not verified. Do not "convert" $0.6097$ into a library Sharpe, and do not attach a standard error from a later chapter to the library figures as if the convention had been checked. The comparison that is available today is qualitative: the pages print a reward-to-variability number, and the number can be negative, as O10 shows.
:::

:::intuition Implementation is part of the result
If a friend says "moving averages made $7$ percent a year", the systematic question from the first chapter has not been asked. Which average, which map, which orders, which funds, which span, which costs? O01 and W01 are a minimal pair of answers that already disagree by several percentage points of CAGR and by a deep difference in reported drawdown. The disagreement is not a nuisance around a true rate. The rate without the protocol is not a rate the pages measured. [[#alg-read]] is the habit of asking for the protocol before repeating the rate.
:::

:::history
In 1966 William F. Sharpe published a study of mutual-fund performance that used a ratio of average excess return to the variability of return. Later writers called that kind of ratio a Sharpe ratio. The paper is the origin of the name on a modern dashboard; the name's later career is not a quotation from the paper, and this chapter does not pretend the library's reported Sharpes were computed from the 1966 formula. The performance course will define the ratio this atlas uses in its own examples, including the risk-free rate and the annualisation. Until that definition, [[#def-row]] treats $0.21$, $0.45$ and $-0.41$ as reported numbers. No new market-structure date is needed to read them. The 1966 name explains why the column exists. It does not turn the column into advice about funds, then or now.
:::

:::application What not to do with the three rows
Do not average O01's CAGR with W01's. They do not share a span or a protocol, and an average would invent a third experiment nobody ran. Do not subtract the drawdowns and call $-0.1835$ a price of higher growth. Do not drop O10 because it spoils a table. Do not invert O10's sign. Do not describe either positive CAGR as expected future growth: [[#def-cagr]] is an equivalent constant rate for a window that is already over. The widget compounds those equivalent rates because compound interest is unambiguous. The market path that produced them is not in the widget, and the next window is not in the page.
:::

## Where this leads

[[performance/simple-and-log-returns]] defines the return that a total-return cell is built from, and it shows why a sum of simple returns is not a compound return. [[performance/volatility-and-drawdown]] defines the drawdown that this chapter only illustrated with $0$ and $-0.50$. [[performance/sharpe-and-its-relatives]] defines the Sharpe ratio whose library values were left as reported figures. [[performance/win-rate-and-profit-factor]] defines the win and the profit factor, which [[#alg-read]] refuses to compare across pages until the unit is known. The series those statistics sit on was the subject of [[markets/adjustment-universes-and-rolls]]. A dashboard read before that bookkeeping is a dashboard of an unnamed object.

:::summary
- Total return is $V_T/V_0 - 1$. CAGR is $(V_T/V_0)^{1/Y} - 1$, the constant yearly rate with the same endpoints. The year-count is part of the definition.
- The same endpoints force the same CAGR and do not force the same drawdown. The paths $100, 110, 121$ and $100, 50, 121$ share a CAGR of $0.10$ and have drawdowns $0$ and $-0.50$.
- Annualising Path A's $0.10$ over seven steps as if they were $7/252$ of a year produces a CAGR near $29.91$, which those prices do not support. The same refusal applies to multiplying $0.6097$ by $\sqrt{252}$.
- A published row is one protocol. Sharpe, drawdown, win rate and profit factor are named here and defined in the next course. Library Sharpes are reported numbers whose annualisation this atlas has not verified.
- O01 and W01 are both moving-average studies and not one study. Reported CAGRs $+3.33\%$ and $+7.38\%$, reported maximum drawdowns $-16.35\%$ and $-34.7\%$. The implementation is part of the result. The gap has no single identified cause.
- Compounding the printed CAGRs reproduces the printed totals up to a few tenths of a percentage point. The cells are not overwritten. The smooth widget curves are not the equity paths.
- O10 reports a negative CAGR, $-0.52\%$, and a negative total return, $-12.2\%$. A dashboard is not a shop window. The loss is not a reason to take the other side.
:::

## Exercises

:::exercise Two-year CAGR {level=1 check="0.10"}
Value goes from $100$ to $121$ in $Y = 2$ years. Enter the CAGR as a decimal.
:::solution
$121/100 = 1.21$ and $\sqrt{1.21} = 1.1$, so $g = 0.10$. [[#def-cagr]] is this calculation. The dipped path $100$, $50$, $121$ has the same CAGR. Entering $0.21$ answers with the total return instead. Both numbers belong on a dashboard, in different cells.
:::
:::

:::exercise Total return of the same window {level=1 check="0.21"}
Value goes from $100$ to $121$. Enter the total return.
:::solution
[[#def-total]] gives $121/100 - 1 = 0.21$. The CAGR is $0.10$, not $0.21$, because the $0.21$ was earned over two years and the CAGR is the constant yearly rate that compounds to it. On a one-year window the two cells would agree. The year-count is what separates them.
:::
:::

:::exercise Drawdown of the dipped path {level=1 check="-0.5"}
The path is $100$, $50$, $121$, marked at those three dates. Enter the maximum drawdown as a fraction.
:::solution
The running peak is $100$ when the value hits $50$, so the drawdown is $50/100 - 1 = -0.5$. The recovery to $121$ does not erase it. [[#prop-same-cagr]] and [[#ex-two-paths]] use this path as the witness that CAGR can be $0.10$ while the marked path was cut in half. The monotone path $100$, $110$, $121$ has drawdown $0$ and is not the answer.
:::
:::

:::exercise Compounding O01's printed CAGR {level=2 check="1.268"}
Using $g = 0.0333$ and $Y = 25$ exactly, enter $(1+g)^{25} - 1$ to three decimals. This is the identity's total return, not the page's printed total return.
:::solution
$(1.0333)^{25} - 1 = 1.268092\ldots$, which is $1.268$ to three decimals. The page reports $+126.66\%$, a total return of $1.2666$. [[#ex-identity]] records the gap and does not overwrite either cell. The exercise asks for the identity, so $1.268$ is the answer, and quoting it as if it were O01's new official return would violate [[#alg-read]]. The widget's O01 curve ends near $2.268$, which is the gross multiple $1 + 1.268$, a different way of writing the same identity.
:::
:::

:::exercise O10's identity {level=2 check="-0.1222"}
Using $g = -0.0052$ and $Y = 25$ exactly, enter $(1+g)^{25} - 1$ to four decimals.
:::solution
$(0.9948)^{25} - 1 = -0.122202\ldots$, which is $-0.1222$ to four decimals. The page reports $-12.2\%$. The two figures agree at the page's one-decimal precision. The interesting fact is the sign. Both the identity and the printed cell are losses. [[#ex-o10]] refuses to flip that sign into a strategy. A positive answer would be the total return of a different CAGR, not of this one.
:::
:::

:::exercise Difference of two reported drawdowns {level=2 check="-0.1835"}
Read W01's reported maximum drawdown as $-0.347$ and O01's as $-0.1635$. Enter W01's figure minus O01's figure.
:::solution
$-0.347 - (-0.1635) = -0.1835$. The negative sign means W01's reported drawdown is the deeper of the two, by $0.1835$ in fractional units, that is $18.35$ percentage points. The subtraction uses the printed cells as exact at the decimals given ($-34.7\%$ and $-16.35\%$). It does not say why the drawdowns differ. Windows, order mode against weight mode, span and universe description all differ between O01 and W01. [[#alg-read]] stops a reader from assigning the $-0.1835$ to one of those causes. It also stops a reader from treating the deeper drawdown as an acceptable price to pay for the higher CAGR. The cell is a record, not an offer.
:::
:::

:::exercise No single cause for the CAGR gap {level=3}
O01 reports a CAGR of $+3.33\%$ and W01 reports $+7.38\%$. Explain why the gap cannot be attributed to "weights beat orders" or to "the longer moving average", and list at least four protocol differences that the two pages fail to hold fixed.
:::hint
Compare the one-line descriptions: windows, what is held while the signal is true, orders against weights, span, and the way the universe is described. A cause would require a contrast that changed one of those and left the rest alone.
:::
:::solution
The printed rates differ by $7.38 - 3.33 = 4.05$ percentage points. A cause for that gap would be a pair of experiments that differed in one stated place and shared everything else: the same funds, the same span, the same costs, the same clock, the same definition of CAGR. O01 and W01 are not that pair.

At least four differences are on the page. The windows are $20$ and $50$ against $50$ and $200$. O01 acts on a cross, with market orders; W01 holds a target weight while the fast average is above the slow one, and it rebalances daily. The spans are $25$ years and $26$ years. The universe lines say equity exchange-traded funds in one case and sector exchange-traded funds in the other. Costs and fill conventions are not shown to be identical either, and this atlas has not re-run the pages to check them.

Any one of those differences is large enough, in principle, to move a compound growth rate by more than rounding. Because they all move at once, the table identifies a gap and does not identify a cause. "Weights beat orders" changes the family and pretends the windows and the universes were held fixed. "The longer average is better" changes the window and pretends the family was held fixed. Both sentences are stronger than the evidence. [[#def-row]] makes the implementation part of the result precisely so that a gap between two implementations is not laundered into a property of a shared idea. The research habit is to specify the contrast you did not run, not to award the contrast to the larger cell.
:::
:::

:::exercise What the smooth curve is not showing {level=3}
The widget draws $(1.0738)^x$ up to year $25$, where the curve is about $5.930$. W01's reported span is $26$ years, $(1.0738)^{26}$ is about $6.368$, and the reported total return $+537\%$ is a multiple of $6.37$. The reported maximum drawdown is $-34.7\%$. Explain what the curve shows and three things it does not show.
:::hint
Separate a constant compound curve, a terminal multiple under a stated year-count, and a path that can fall below its peak. The caption of the widget already denies that the curves are equity paths or forecasts.
:::
:::solution
The curve shows the constant CAGR reported for W01, compounded as $(1.0738)^x$, over a horizontal axis that stops at $25$ because the picture was drawn on a common window with O01. At the right-hand edge the gross multiple is about $5.930$. That is an illustration of arithmetic, the same kind of illustration as compounding $1.001$ in the first chapter. It is not a path the strategy produced.

It does not show W01's horizon. The reported span is $26$ years, and compounding the same rate for $26$ years produces about $6.368$, close to the multiple $6.37$ implied by a $+537\%$ total return. [[#ex-identity]] already compared those two and left both cells as printed. A reader who quotes $5.930$ as W01's terminal multiple has read the axis of the picture and missed the span of the page.

It does not show the equity path. A compound curve of a positive rate is strictly increasing, so its drawdown on its own grid is $0$. W01's reported maximum drawdown is $-34.7\%$. The path that earned the CAGR, if the cell is right, fell by more than a third from a peak and later recovered enough to finish at the reported total. The curve has nowhere to put that fall. [[#prop-same-cagr]] is the abstract version: endpoints fix $g$, intermediates fix the drawdown. The widget keeps the endpoints of a constant-rate story and throws the intermediates away on purpose.

It does not show the future, and it does not show O10. A smooth positive curve is the shop window this chapter is written against. O10's reported CAGR is negative and would draw a declining curve under the same widget convention. Leaving O10 out of the picture does not remove it from the library. Nothing in the picture is a holding, a fund or a forecast, which is what the caption says and what [[#alg-read]] requires.
:::
:::
