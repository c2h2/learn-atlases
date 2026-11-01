A one-minute bar is a smaller container for the same kind of question, not a larger sample of independent evidence. Six days of those bars are still six days. The open library has five pages drawn on bars finer than a day, over spans of days or weeks rather than years. Each page reports a sample return and a maximum drawdown. Each page leaves the compound annual growth rate blank, and leaves the Sharpe ratio, the win rate and the profit factor blank as well. The blank is the result a careful reader is supposed to notice. Filling it in is the mistake this chapter is for.

Nothing below is a recommendation to trade inside the day, to prefer a five-minute bar to an hourly bar, or to take the other side of a page that lost money. A library loss is part of the lesson. It is not a signal to reverse the rule. The pages are QuantJourney examples (Apache-2.0), as reported on quants.md and read in 2026. This atlas has not re-run them.

## What the bar changes, and what it does not

:::definition Span and bar count {#def-span}
The **span** of a test is the calendar length of the sample, counted in the unit the claim needs. A claim about a day uses days. A claim about a year uses years. The **bar count** is the number of rows in the file. A one-minute file can have hundreds of rows in a single day. Those rows share the day's open, the day's news and the day's close. They are not hundreds of independent copies of a daily experiment. A parameter chosen on the same span is not a fresh observation of that span.
:::

Finer bars change the mechanism you can see. A bracket of a few tenths of one percent is invisible on a daily close. A stop sitting above a twelve-bar high means one thing on a thirty-minute bar and another on a daily bar, because "twelve bars" is a different amount of time. The legal product of [[backtesting/timing-costs-and-biases]] does not relax just because the bar is short. A feature stamped at minute $t$ may use prices up to minute $t$, and it earns the return after minute $t$. A same-bar product on a one-minute file is still a same-bar product. The clock feels more precise. The offence is unchanged.

What a fine bar does not change is the span. Annualising a span of days treats a noisy total return as if it were a year, and the algebra of that rescaling is the proposition below. The library's response, on these five pages, is to leave the compound annual growth rate unreported. This atlas will not invent the missing cell.

## Five pages, read as mechanisms

The figures in this section are only the figures LIBRARY.md records. Where a cell is "—", the catalogue does not report that statistic. A dash is not a zero, and it is not an invitation.

W08, "Intraday EMA Scalp 1m", is an exponential-moving-average pair, $9$ and $21$, used as a trend-or-cash rule on one-minute bars. The span is 6 days. The reported sample return is $-0.2\%$. The reported maximum drawdown is $-0.2\%$. The compound annual growth rate, the Sharpe ratio, the win rate and the profit factor are unreported. Two numbers of $-0.2\%$ say that, on the marks the page used, the path ended where its worst peak-to-trough also sat. They do not say the rule has a stable daily loss, and they do not say the loss is small enough to ignore. They say the page showed you a week, not a career.

W07, "Intraday RSI 15m", holds an equal-weight basket when a relative-strength index is oversold, on fifteen-minute bars, over 3 weeks. The reported sample return is $+2.6\%$. The reported maximum drawdown is $-1.1\%$. The catalogue line does not give the numerical oversold threshold. This atlas will not copy a threshold from a different page and attribute it to W07. The growth rate, the Sharpe ratio, the win rate and the profit factor are unreported. A positive sample return of a few percent, beside a drawdown of about one percent, over three weeks, is a description of that window. It is not an edge.

W09, "Intraday SMA Trend 1h", is a simple-moving-average pair, $10$ and $30$, trend or cash, on hourly bars, over 9 weeks. The reported sample return is $+1.5\%$. The reported maximum drawdown is $-3.5\%$. The drawdown is larger than the sample return, which is allowed: a path can finish up and still have been down by more in the middle. The compound annual growth rate and the other ratios are unreported. Nine weeks are not a long sample of hourly trends. They are nine weeks.

O15, "Intraday Bracket Reversion 5m", enters on a relative-strength dip and attaches a bracket of $+0.6\%$ and $-0.4\%$, on five-minute bars, over 4 weeks. The reported sample return is $+1.1\%$. The reported maximum drawdown is $-1.3\%$. The other ratio columns are unreported. What the row can teach is the shape of a bracket: two distances, unequal, around an entry. What it cannot teach is whether those distances are a good idea. The order, as an order, is discussed with the other intraday order pages in [[orders/lots-contracts-and-intraday]]. This chapter's interest is the span.

O16, "Intraday Stop Breakout 30m", buys on a stop above the 12-bar high and holds for a fixed period, on thirty-minute bars, over 8 weeks. The reported sample return is $-13.9\%$. The reported maximum drawdown is $-14.8\%$. The other ratio columns are unreported. A loss of that size on an eight-week window is part of the published picture. It is not a CAGR, because the page does not report one. It is not a reason to run the opposite orders. The opposite of a short-sample loss is a different experiment, and "take the other side" would be advice this course does not give. The mechanism the row does document is a stop above a high that looks back twelve bars of thirty minutes, followed by a holding period the one-line description calls fixed. Twelve bars are six hours if the session is continuous. Whether the library's session is continuous is not stated in the one-line row, so this atlas does not assert it. The lookback in bars is the fact. The number of hours is not, until a protocol says so.

:::example How many days are in six days {#ex-days}
W08's span is 6 days. If the sampling unit you care about is the day, and no parameter was chosen on those days, how many independent days does the page contain? If a search over rules was scored on those same six days, how many fresh days remain for evidence?
:::solution
Without a search, the count is 6. Days can still be dependent, so 6 is an upper count of independent daily observations, not a guarantee of independence. It is already far below the bar count of a one-minute file. If the rule, or a threshold inside it, was chosen because it looked best on these six days, the fresh count is 0. The days have been spent on the choice. [[#def-span]] is the distinction: a parameter fit on the span is not a second copy of the span. The page itself does not, in the catalogue line this atlas has, report a search. The zero is what you would have to write if there had been one. It is not an accusation that W08 searched.
:::
:::

:::example Bars are not days {#ex-bars}
Take, as a counting convention for this exercise only, a session of 390 one-minute bars, the length of a six-and-a-half-hour cash session. This convention is not a claim about W08's venue or calendar. How many one-minute bars is that over 6 sessions, and why is that number not the sample size of a daily claim?
:::solution
$6 \times 390 = 2340$ bars. A daily claim, such as "the rule loses about a fifth of one percent a day", has at most 6 observations in this span, not 2340. The 2340 rows share six opens and six closes. Treating them as $2340$ independent draws of a daily edge divides a standard error by $\sqrt{2340}$ instead of by something no larger than $\sqrt{6}$. The ratio of those two divisors is $\sqrt{2340}/\sqrt{6} = \sqrt{390} \approx 19.75$, so the bar-count standard error is about $19.75$ times too small on that crude comparison. The legal response is not a corrected Sharpe ratio. W08 does not report a Sharpe ratio. The response is to refuse the bar count as the sample size.
:::
:::

## The function that fills a blank, and why it must not

Let $R > -1$ be a total simple return over a horizon of $y$ years, $y > 0$, and define the naive annualisation

$$
A(R) = (1 + R)^{1/y} - 1.
$$

If $y = 1$, then $A(R) = R$: a one-year total return is already an annual figure. If $y$ is a small fraction of a year, $A$ magnifies $R$. The library's compound annual growth rate, when it reports one, is a column of its own, under a convention this atlas has not re-derived. $A$ is not that column. $A$ is the function a reader is tempted to paste into a blank cell.

:::proposition Slope of a naive annualisation {#prop-annual}
Fix $y > 0$ and let $A(R) = (1+R)^{1/y} - 1$ for $R > -1$. Then

$$
A'(R) = \frac{1}{y} (1+R)^{1/y - 1},
$$

and $A'(0) = 1/y$. If the horizon is $d$ trading days of a 252-day year, so that $y = d/252$, then $A'(0) = 252/d$.
:::

:::proof
Let $u = 1 + R > 0$. Then $A = u^{1/y} - 1$. Differentiating with respect to $R$, and using $du/dR = 1$,

$$
\frac{dA}{dR} = \frac{1}{y}\, u^{1/y - 1} = \frac{1}{y} (1+R)^{1/y - 1}.
$$

At $R = 0$ the power is $1$, so $A'(0) = 1/y$. Substituting $y = d/252$ gives $1/y = 252/d$. The derivative is a fact about the function $A$. It is not a sampling distribution, and it is not a licence to report $A(R)$ as a compound annual growth rate when the catalogue cell is blank.
:::

:::corollary A six-day slope {#cor-six}
Under the 252-day convention of [[#prop-annual]], a span of 6 trading days has $A'(0) = 42$. A return error of size $\varepsilon$, near zero, is magnified by about $42$ in the annualised function.
:::

:::proof
$252/6 = 42$, and [[#prop-annual]] says $A'(0) = 252/d$.
:::

The same convention, stated every time so that it stays a convention, gives $252/15 = 16.8$ if a three-week span is taken as 15 trading days, $252/45 = 5.6$ if nine weeks are 45 trading days, $252/20 = 12.6$ if four weeks are 20 trading days, and $252/40 = 6.3$ if eight weeks are 40 trading days. All of these slopes are large compared with $1$, which is $A'(0)$ for a one-year horizon. The five library spans sit on the large side. That is why a blank cell is the conservative object, and why "the library forgot the CAGR" is the wrong description. The library withheld a number that the span cannot support.

:::example The amplifier, once, and not as a result {#ex-amp}
W08 reports a sample return of $-0.2\%$, which as a decimal is $-0.002$, over 6 days. Compute $A(-0.002)$ with $y = 6/252$, and say what the number is not.
:::solution
$1/y = 42$, so $A(-0.002) = (0.998)^{42} - 1 = -0.080646$ to six decimal places. Near zero, the derivative $42$ would have suggested $42 \times (-0.002) = -0.084$, and the exact value of $A$ is a little less severe because $(1+R)^{42}$ is not exactly linear. The figure $-0.080646$ is the value of the function $A$ at the reported sample return. It is not a compound annual growth rate. It is not a library figure. It will not be written into W08's blank cell. This atlas does not compute the same decoration for W07, W09, O15 or O16. One amplifier is enough to see the slope. Five fake annualisations would look like a column.
:::
:::

:::warning Do not complete the row
A reader who publishes $A(R)$ next to W08 has invented a statistic the catalogue refused, under a day-count the catalogue did not state. The 252-day year is our convention for the derivative, not a discovery about the page. The reported objects are the sample return $-0.2\%$ and the maximum drawdown $-0.2\%$, over 6 days, on one-minute bars, for an exponential-average pair of lengths $9$ and $21$. That is the whole quantitative content of the row. The mechanism is the pair of lengths and the trend-or-cash alternative. The evidence is not there.
:::

:::algorithm Reading a short-sample row {#alg-short}
1. Read the span in the unit the page uses: days or weeks. Do not convert it into a compound annual growth rate.
2. Read the bar size. Use it to understand the rule's lookback, not as a multiplier on the sample size.
3. Copy only the statistics the row actually prints. If the growth rate, the Sharpe ratio, the win rate or the profit factor is a dash, write "unreported".
4. Say what mechanism the one-line rule names: a bracket, a stop above a high, a pair of averages, a basket when an oscillator is oversold.
5. Say what the page cannot support: an edge, a Sharpe ratio, a compound annual growth rate, or a decision to take the other side of a loss.
6. If you form $A(R)$ as an exercise in [[#prop-annual]], label it as the value of $A$ and keep it out of the table.
:::

:::example Applying the algorithm to O16 {#ex-o16}
Run [[#alg-short]] on O16, using only the catalogue row.
:::solution
The span is 8 weeks. The bars are 30 minutes. The reported sample return is $-13.9\%$ and the reported maximum drawdown is $-14.8\%$. The compound annual growth rate, the Sharpe ratio, the win rate and the profit factor are unreported. The mechanism is a buy-stop above the high of the previous 12 bars, with a fixed holding period. The page can teach what that order looks like on a short window, including that the window lost $13.9\%$ in the report and drew down $14.8\%$. It cannot teach an edge, and it cannot teach the opposite trade. This atlas has not re-run the page. The figures are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026.
:::
:::

:::widget lln
experiment: coin
trials: 400
runs: 6
caption: Six fair coins, not six market days. Look at the left edge, where each running average has only a handful of trials: a six-day sample lives in that region and has not settled. The paths are not intraday prices, and none of them is a compound annual growth rate.
:::

The widget is the law of large numbers for a coin, which is why the right-hand side calms down and the left-hand side does not. W08 has six days, which is the left-hand side. W07's three weeks and O16's eight weeks are still the left-hand side of a question about years. Watching the coins settle is not evidence about an exponential-average scalp. It is a picture of how little a short run knows about its own mean.

:::quiz
W08's catalogue row reports a compound annual growth rate. Which reading is correct?
- [ ] The growth rate is $-0.2\%$, the same as the sample return
- [ ] The growth rate is $(0.998)^{42} - 1$, because that is the natural annualisation
- [x] The cell is blank, and this atlas leaves it blank
- [ ] The growth rate is zero, because a blank means no edge
:::solution
A blank cell is unreported. [[#ex-amp]] computes $A(-0.002)$ only to show the amplifier, and then refuses to file the result as W08's growth rate. Zero would be an invented report of a different kind. The sample return $-0.2\%$ stays a six-day sample return.
:::
:::

:::quiz
Under the counting convention of [[#ex-bars]], 6 sessions of 390 one-minute bars contain how many independent daily observations of a daily claim, if no parameter was searched?
- [ ] $2340$, one per bar
- [x] At most $6$, one per session
- [ ] $252$, because a year has $252$ trading days
- [ ] $42$, the slope $A'(0)$
:::solution
The bar count is $2340$ and the day count is $6$. [[#def-span]] takes the unit from the claim. A daily claim does not inherit the minute count. The number $42$ is $A'(0)$ for a six-day horizon, not a sample size. The number $252$ is the convention in the denominator of $y$, not the length of W08.
:::
:::

:::history
Marcos López de Prado's *Advances in Financial Machine Learning* (2018) collected the sampling, labelling, cross-validation and overfitting objections that a modern backtest is expected to answer. Choosing a one-minute bar rather than a daily bar is a sampling decision. It changes the shape of the path a rule is allowed to see: a bracket of $0.6\%$ can be hit inside a day, and a twelve-bar high can mean six hours rather than twelve days. Sampling does not manufacture years of evidence out of six days. The five catalogue pages are illustrations of mechanisms on short spans. They are not the long samples the objections ask for.
:::

## Where this leads

A short page is read with the same checklist as a long one, which is [[backtesting/reading-published-tests]]. The brackets, stops and whole-contract constraints that sit inside some of these rules are specified as orders in [[orders/lots-contracts-and-intraday]]. The clock that a one-minute feature still has to obey is [[backtesting/timing-costs-and-biases]].

:::summary
- Bar count is not span. A one-minute file over six days is six days, however many rows it holds.
- W08 reports $-0.2\%$ and maximum drawdown $-0.2\%$ over 6 days of one-minute bars. W07 reports $+2.6\%$ and $-1.1\%$ over 3 weeks of fifteen-minute bars. W09 reports $+1.5\%$ and $-3.5\%$ over 9 weeks of hourly bars.
- O15 reports $+1.1\%$ and maximum drawdown $-1.3\%$ over 4 weeks of five-minute bars, with a bracket of $+0.6\%$ and $-0.4\%$. O16 reports $-13.9\%$ and $-14.8\%$ over 8 weeks of thirty-minute bars.
- On all five pages the compound annual growth rate, the Sharpe ratio, the win rate and the profit factor are unreported. The blanks stay blank.
- The derivative of a naive annualisation at a zero return is $252/d$ under a 252-day convention. For 6 days that slope is $42$. The value of that function is not a library CAGR.
- These pages can show the shape of a rule on a fine bar. They cannot show an edge, and a loss is not an instruction to take the other side.
- This atlas has not re-run the pages. The figures are the catalogue's, read in 2026.
:::

## Exercises

:::exercise Days in the shortest page {level=1 check="6"}
W08's span is 6 days, and you are not told of a parameter search on those days. Taking the day as the unit, enter the upper count of independent daily observations.
:::solution
The upper count is $6$. Dependence between days would only make the effective count smaller. The one-minute bar count is not the answer.
:::
:::

:::exercise The six-day slope {level=1 check="42"}
Using a 252-day year, enter $A'(0)$ for a horizon of 6 trading days.
:::solution
[[#prop-annual]] gives $A'(0) = 252/6 = 42$. This is the slope of the naive annualisation at a zero return. It is not W08's compound annual growth rate, which the library does not report.
:::
:::

:::exercise A blank is not a zero {level=1 check="0"}
O15's compound-annual-growth-rate cell is blank. Enter $0$ if this atlas treats the cell as unreported, and enter $1$ if it treats a blank as a reported growth rate of zero.
:::solution
A blank is unreported. The entry is $0$, meaning "unreported", not meaning that the growth rate was zero. O15's reported sample return remains $+1.1\%$ over 4 weeks, which is a different object.
:::
:::

:::exercise A session's worth of minutes {level=2 check="2340"}
Using only the counting convention of a 390-bar session, enter the number of one-minute bars in 6 sessions.
:::solution
$6 \times 390 = 2340$. The convention is not a claim about the library's venue. The number $2340$ is a bar count. It is not the number of independent days.
:::
:::

:::exercise Three weeks as a slope {level=2 check="16.8"}
Take W07's span of 3 weeks as 15 trading days of a 252-day year. Enter $A'(0)$ to one decimal place. Do not annualise W07's reported return.
:::solution
$252/15 = 16.8$. The slope says a small total return would be magnified by about $16.8$ near zero. W07's reported sample return is $+2.6\%$ and its reported maximum drawdown is $-1.1\%$, and its compound annual growth rate is unreported. The figure to enter is $16.8$, which is $1/y$, not a growth rate.
:::
:::

:::exercise Eight weeks as a slope {level=2 check="6.3"}
Take O16's span of 8 weeks as 40 trading days of a 252-day year. Enter $A'(0)$ to one decimal place.
:::solution
$252/40 = 6.3$. O16's reported sample return is $-13.9\%$ and its reported maximum drawdown is $-14.8\%$. Those are the path statistics the page gives. The slope $6.3$ is not a compound annual growth rate, and this exercise does not ask for $A(-0.139)$.
:::
:::

:::exercise Differentiate the annualisation {level=3}
Derive $A'(R)$ for $A(R) = (1+R)^{1/y} - 1$ with $y > 0$ fixed and $R > -1$. Evaluate the derivative at $R = 0$.
:::hint
Set $u = 1+R$ and differentiate $u^{1/y}$ with the chain rule.
:::
:::solution
With $u = 1+R > 0$, $A = u^{1/y} - 1$. Then $dA/dR = (1/y)\, u^{1/y - 1} \cdot 1 = (1/y)\, (1+R)^{1/y - 1}$. At $R = 0$, the power of $1$ is $1$, so $A'(0) = 1/y$. If $y = d/252$, this is $252/d$. The derivation assumes $y$ fixed and $R > -1$ so that $u$ stays positive. It does not assume that $R$ is a library return, and the value of $A$ at a short-sample return is not a CAGR the catalogue withheld by accident.
:::
:::

:::exercise A search spends the sample {level=3}
Suppose the lengths $9$ and $21$ in an exponential-average rule were chosen because, among several pairs, they produced the least bad result on a particular 6-day file. How many of those days remain as fresh evidence for the chosen pair? Explain in terms of [[#def-span]]. This is not a claim that W08 chose its lengths that way.
:::hint
A day used to pick the rule cannot be re-used as an untouched test of the rule you picked.
:::
:::solution
None. The six days are the span on which the choice was scored, so the fresh count is $0$. [[#def-span]] says a parameter chosen on the span is not a new observation of the span. The catalogue line for W08 does not report such a search; the exercise is the counterfactual. Reporting the chosen pair's $-0.2\%$ as if the lengths had been fixed in advance would overstate what six days can confirm. The legal description is: if the lengths were searched on these days, these days do not confirm them.
:::
:::
