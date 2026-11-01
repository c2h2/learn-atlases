Between two closes a price can travel through many trades and still leave behind only four numbers. Anyone who builds a rule on daily bars is choosing to forget most of that travel. The choice is legitimate when it is explicit: the information set contains the close, or the open, high, low and close, and it does not contain the path those four numbers discarded. It is not legitimate when a backtest quietly uses a high that the stated rule was not allowed to see.

The previous chapter attached units to a contract. A share has a dollar price, a fund has one traded price, a USD quote is dollars per unit of another currency, and a futures point becomes currency only through a multiplier. This chapter is about the time series of those numbers. A tick is one print. A bar compresses many prints. A close-to-close simple return compresses the bar still further, down to two closes. Each compression is a modelling choice. Path A, the eight invented closes $(100, 102, 101, 104, 103, 107, 106, 110)$, is already on the far side of that compression. We will put one invented intraday range back under the step from $104$ to $103$, so the loss is visible.

Marcos López de Prado's 2018 book, listed among this course's references, argues at length for bars that are not cut by the clock. That argument is a data objection, not a menu of strategies. The open library's cases are time-barred, at daily or intraday horizons, so this chapter stays with time bars and says what they keep.

## Ticks and the minimum increment

:::definition Tick {#def-tick}
A **tick** is a single price print in a stated convention: a trade, or a quote update, at a time, in the unit of the contract. The **minimum tick** is the smallest increment the venue permits for that print. A price that is not a whole number of minimum ticks is not a printable price, whatever a formula produces.
:::

The minimum tick is part of the information, not a cosmetic rounding. A rule that subtracts two prices, divides by a close, and then interprets a difference smaller than one tick as a tradable edge has invented a price the venue would not have printed. Decimalisation in US equities, recorded below, changed that increment. It did not change the definition. Before and after, the tick is the grid the prints lie on.

On a share quoted in dollars, a one-cent tick means the printable prices around $103$ dollars are $102.99$ and $103.01$, not $103.005$. A formula can still emit $103.005$ as an average of other prints. The average is a signal, if the inputs were known, and it is not itself a tradeable price. [[markets/instruments]] already separated signals from orders. The tick is a further constraint on the order's price, when the order is allowed to name one.

:::example Sixteenths and cents {#ex-tick}
Take a share priced at $100$ dollars. A minimum increment of one sixteenth of a dollar is $1/16 = 0.0625$ dollars. A minimum increment of one cent is $0.01$ dollars. How many one-cent ticks fit in one sixteenth? What fraction of the $100$ dollar price is a one-tick spread in each convention? Separately, the Path A step from $104$ to $103$ is a one-dollar move. How many one-cent ticks is that?
:::solution
The ratio of the increments is $0.0625 / 0.01 = 6.25$. One sixteenth of a dollar is six and a quarter one-cent ticks. It is not six, and it is not an integer number of pennies. A venue that moves from sixteenths to cents changes the grid; it does not merely print the old prices with a different symbol.

As a fraction of a $100$ dollar price, the sixteenth is $0.0625/100 = 0.000625$. The cent is $0.01/100 = 0.0001$. A one-tick spread, if the spread is one minimum increment and the mid is near $100$, is $6.25$ times larger under the old grid than under the new one, because $0.000625 / 0.0001 = 6.25$. That comparison is arithmetic about spreads. It is not a finding that trading became attractive after the grid changed, and it is not a recommendation to trade inside the spread.

The move from $104$ to $103$ is one dollar per share, which is $100$ one-cent ticks, or $1 / 0.0625 = 16$ sixteenths. The close-to-close simple return on that step is $-1/104$, computed in the next section. The tick count and the return are different summaries of the same two prices. One hundred ticks says how the move sits on the grid. The return says how the move sits relative to the starting close. A rule has to say which one it uses.
:::
:::

## What a bar keeps

:::definition OHLC bar {#def-ohlc}
An **OHLC bar** on a stated clock records four numbers from the prints inside the interval: the **open** $O$, the first print; the **high** $H$, the maximum print; the **low** $L$, the minimum print; and the **close** $C$, the last print under the convention you name (last trade, or an auction price). They satisfy $L \le \min(O, C) \le \max(O, C) \le H$. The bar does not record the order of the prints between the open and the close, except that the high and the low were attained at least once.
:::

Two vendors can disagree on the close because they disagree on the convention: a last trade in one feed, an auction print in another, a price after a late correction in a third. Once you name the feed, $C$ is a number in $\mathcal{F}_t$ at the decision time that feed supports, and not before. "The close" without a feed is not yet an information set. Harris's account of the book, cited for this course, is why the close is a summary of a mechanism rather than a natural constant. We use the summary. We do not pretend it is the mechanism.

The inequalities in the definition are not decorative. A bar with a high below the close is not a bar; it is a data error. A rule that trusts every file will treat a corrupted high as a breakout. Checking $L \le \min(O,C) \le \max(O,C) \le H$ is a property of the object, and it is the cheapest test you can run before any signal is computed.

:::proposition Many paths, one bar {#prop-many-paths}
Let a bar report $(O, H, L, C)$ with $H > \max(O, C)$ and $L < \min(O, C)$. Then at least two sequences of prints share that bar and differ in the order of the extremes. Explicitly, the sequences $(O, H, L, C)$ and $(O, L, H, C)$ have the same open, high, low and close, and they are not the same sequence.

Furthermore, the close-to-close simple return from a previous close $C_{\mathrm{prev}} \neq 0$ to this close $C$ equals $C/C_{\mathrm{prev}} - 1$. It depends on the two closes only. Any other path with the same two closes, whatever its high and low, has the same close-to-close return.
:::

:::proof
Both sequences start at $O$ and end at $C$. The maximum of $(O, H, L, C)$ is $H$, because $H > \max(O, C)$ implies $H > O$ and $H > C$, and $H > L$ follows from $H > \max(O, C) \ge \min(O, C) > L$. The minimum is $L$, because $L$ is strictly below $O$ and below $C$. The same comparisons show that $(O, L, H, C)$ has maximum $H$ and minimum $L$. The second print of the first sequence is $H$ and the second print of the second sequence is $L$. Since $H > L$, the sequences differ. The bar stores neither the second print nor the time of the high. It cannot say which sequence occurred.

The close-to-close return is the ratio of two closes minus one, by the formula in [[#def-close-return]] below, which uses $C$ and $C_{\mathrm{prev}}$ and no other print. High and low do not appear. Therefore two bars, or two paths, that share those closes share the return, even if one of them travelled through a different high. The formula does not need the strict inequalities used in the first half. The strict inequalities are what make the two sequences a witness that the bar has thrown information away.
:::

The proposition is the formal version of a remark a chart makes obvious and a spreadsheet hides. The spreadsheet has one row. The row looks like the whole day. It is four summaries. A fill rule that says "buy if the low touches a limit" uses more of the row than a close-to-close return does, and it still does not know whether the low came before the high. Assuming a fill at the low, because the low is in the bar, is an optimistic model of a path the bar does not record. The orders course makes that optimism precise. Here it is enough to see that the optimism is not in the four numbers.

:::definition Close-to-close simple return {#def-close-return}
Given consecutive closes $C_{t-1} \neq 0$ and $C_t$, the **close-to-close simple return** is

$$
R_t = \frac{C_t}{C_{t-1}} - 1.
$$

It is the simple return used on Path A. High, low and open do not enter. A rule whose information set contains only closes is a rule about $(R_t)$, not a rule about the bars' ranges.
:::

:::example The step from 104 to 103 {#ex-104}
On Path A the closes include the step from $104$ to $103$. This is the return $R_4$ when $t = 0$ is the close $100$. Compute it exactly and to six decimals. Confirm it matches the path statement.
:::solution
The exact simple return is

$$
R_4 = \frac{103}{104} - 1 = -\frac{1}{104}.
$$

The decimal is $-0.009615384\ldots$, which rounds to $-0.009615$ at six decimals. That is the fourth figure in the path statement:

$$
0.020000,\ -0.009804,\ 0.029703,\ -0.009615,\ \ldots
$$

The match is a check that the path statement and the definition agree, not a market fact. The price fell by one dollar on a starting close of $104$ dollars. [[#ex-tick]] counted that dollar as $100$ one-cent ticks. The return is the dollar divided by $104$, with a minus sign. Both descriptions are right, and they answer different questions. A signal dated at the close $104$ may use earlier closes. Under the legal clock it earns $R_4$ only if the decision was taken at the previous close. A signal dated at $103$ may use $R_4$ as an input and earns the next return, from $103$ to $107$, which is $0.038835$ at six decimals.
:::
:::

## The high and the low the close throws away

Put an invented day under that same close. Nothing in Path A records a high or a low. The day below is extra structure, labelled as invented, so that the loss from using only the close can be computed rather than waved at.

:::example A six-point range with the same close {#ex-range}
The previous close is $104$. The next bar is invented as open $104$, high $106$, low $100$, close $103$. Compute the close-to-close return, the range, the simple return from the previous close to the high, and the simple return from the previous close to the low. Then name two print sequences that share the bar.
:::solution
The close-to-close return is $103/104 - 1 = -1/104 \approx -0.009615$, the same number as [[#ex-104]]. [[#prop-many-paths]] said the range would not appear in it, and it does not.

The range is $H - L = 106 - 100 = 6$ dollars. The absolute close-to-close move is $1$ dollar. The range is six times that move. A volatility computed from close-to-close returns does not see those six dollars. The performance course will define that volatility; the point here is the discarded input, not the estimator.

Marked against the previous close, the high would have been a simple return $106/104 - 1 = 1/52 \approx 0.019231$. The low would have been $100/104 - 1 = -1/26 \approx -0.038462$. Neither number is $R_4$. A rule that reports the low's return as if the close had been $100$ has replaced the bar's close with a different print. That may be a legal signal if the low is in the information set and the score is a later return. It is not the close-to-close return of this bar.

The two sequences $(104, 106, 100, 103)$ and $(104, 100, 106, 103)$ share the open, high, low and close. In the first, the high is printed before the low. In the second, the low is printed before the high. A stop that sells on the way down and a limit that buys at $100$ do not have the same life on the two sequences, even though every OHLC statistic agrees. The close-to-close return agrees because both sequences end at $103$. Sameness of $R_4$ is not sameness of the day.
:::
:::

:::example A tight bar with the same two closes {#ex-tight}
A second invented bar has open $104$, high $104$, low $103$ and close $103$. Compare its close-to-close return and its range with the bar in [[#ex-range]].
:::solution
The closes are again $104$ then $103$, so the close-to-close return is again $-1/104 \approx -0.009615$. The range is $104 - 103 = 1$ dollar, not $6$. The two bars are indistinguishable to [[#def-close-return]] and easily distinguishable to anyone who stored $H$ and $L$.

A research claim that "the day from $104$ to $103$ was a quiet day" is a claim about the range, or about the path, and it is false of the six-point bar and true of this one, relative to a one-dollar range. The claim cannot be checked on Path A, because Path A stores neither range. Adding the adjective from memory is look-ahead of a more casual kind: the information set does not contain the fact. If the dataset grows to include ranges, the sentence can be tested, and it will be a different experiment from the close-to-close experiment on the same dates.

The tight bar also satisfies the OHLC inequalities: the low equals the close, the high equals the open, and nothing falls outside. [[#prop-many-paths]] does not promise two different orders of extremes here, because the high is not strictly above both open and close. The close-to-close half of the proposition still applies. The hypothesis has to match the bar in front of you.
:::
:::

:::warning Using the high as if it were a close you earned
The high in [[#ex-range]] is $106$. The simple return from $104$ to $106$ is about $0.019231$. That figure is not a profit the close-to-close rule earned, and it is not a profit a rule earned merely because the print occurred. Earning it would require a sale at the high, which is a fill hypothesis about a path the bar does not order. The orders course treats optimistic fills. The mistake to avoid here is smaller and prior: do not drop the high into a column of closes and compute $R_t$ from the mixture.
:::

## A curve that returns to the same level

A close is a sample of a path. Sampling at the times when a wavy path crosses one level makes the sampled series look flat, even though the path moved. The widget is a toy price, not a market, and the horizontal line is one candidate "close" level.


The same path can be drawn as bars, and the bars change when several sessions are pressed into one. The figure below builds a toy path and lets the group size grow. A coarser bar keeps the first open and the last close, and it takes the highest high and the lowest low. The path inside the group disappears. That is a property of the drawing, not a forecast.

:::widget candles
seed: 11
days: 24
group: 1
caption: Raise the group size. Each new bar swallows several sessions, so its high and low are the extremes of those sessions and the path between them is gone. The series is invented.
:::
:::widget plot
f: 100+2*sin(x)
x: 0, 20
hlines: 100
caption: The curve is the toy price 100 + 2 sin(x). The horizontal line is the level 100. The path leaves that level by as much as 2 and comes back to it. A rule that records the price only when it sits on the line records a flat series. The picture is a compression, not a market and not a forecast.
:::

:::example Sampling the sine at a peak and a trough {#ex-sine}
The toy price is $P(x) = 100 + 2\sin x$. It equals $102$ at $x = \pi/2$ and $98$ at $x = 3\pi/2$. Treat those two values as consecutive closes, and compute the simple return. Also record the price at $x = 0$ and at $x = 2\pi$.
:::solution
At the peak and the trough the close-to-close return is

$$
\frac{98}{102} - 1 = -\frac{2}{51} \approx -0.039216.
$$

At $x = 0$ and at $x = 2\pi$ the sine is $0$, so the price is $100$ both times and the simple return is $0$. The same path produces either report, depending on the sampling clock. [[#def-close-return]] is well-defined in both cases and answers two different questions. A daily bar that samples at the official close is one clock. A bar that sampled at the high and then at the low would be another, and it is not the bar the exchange printed just because the high and the low occurred.

The amplitude is $2$ by construction. Between samples at multiples of $2\pi$ the close-to-close return is zero and the path has still travelled from $100$ up to $102$ and down to $98$. That travel is the range the close throws away, in a smooth picture rather than in the six-point bar. The widget's horizontal line is the set of times at which a close-only rule, sampled there, is blind to the amplitude.
:::
:::

:::intuition The bar is a sufficient statistic only for the questions it can answer
If the question is "what was the last print?", the close is enough. If the question is "what was the worst print?", the low is enough and the close is not. If the question is "could a limit at $100$ have traded before the high?", neither the close nor the pair $(H, L)$ is enough, because the order of the extremes is not in the bar. Sufficiency is relative to a question. A backtest that changes the question without changing the stored columns is using a statistic that is no longer sufficient, or using columns that were not in the information set.
:::

:::quiz
Two days share the closes $104$ and $103$. One has range $6$ and the other has range $1$. What do they share for certain under [[#def-close-return]]?
- [ ] The same high and the same low
- [ ] The same order of extremes
- [x] The same close-to-close simple return, $-1/104$
- [ ] The same profit for every rule that traded during the day
:::solution
The close-to-close return uses only the two closes, so both days have return $-1/104$. They were built with different ranges, so they do not share high and low. [[#prop-many-paths]] shows that the order of extremes need not be shared even inside one OHLC bar. A rule that trades the low does not have the same profit on both days.
:::
:::

:::history
By 9 April 2001 the New York Stock Exchange and the American Stock Exchange had completed the move from fractions to decimals. The minimum price increment shrank. A common increment immediately before that change, for prices quoted in sixteenths, was $1/16$ of a dollar, that is $0.0625$ dollars; the decimal grid for a share priced in dollars was one cent. [[#ex-tick]] is the arithmetic of that shrink at a price of $100$ dollars: the old one-tick increment was $6.25$ times the new one. The change is a fact about the prints a historical series mixes together if it crosses 2001 without a break in the tick size. It is not a trading recommendation, and it does not say that every listed name shared one fraction on the day before the conversion. The definition of a tick did not change. The grid the definition refers to did.
:::

:::remark Closes are already a decision
Path A arrives in this atlas as eight closes. Using it as the worked series means we have already accepted [[#def-close-return]] and declined to invent highs, except in labelled examples such as [[#ex-range]]. That is a virtue of the path: the information set is small enough to audit. It is also a limitation. No result computed from Path A can claim to have used an intraday range, a tick, or a quote, because those numbers are not in the eight closes. When a later chapter needs a range, it has to add one and say that it has done so.
:::

## Where this leads

The close defined here is still not an economic return if a split or a dividend sits between the two closes, or if the two closes belong to different futures expiries. [[markets/adjustment-universes-and-rolls]] is that bookkeeping. The simple return $R_t = C_t/C_{t-1} - 1$ is carried forward into [[performance/simple-and-log-returns]], where the log return and the failure of adding simple returns are treated properly. Until then, do not sum the seven Path A returns and call the sum the result of the path. The result of the closes, as a holding of one share with no distribution, is the compound, $110/100 - 1 = 0.10$.

:::summary
- A tick is one print. The minimum tick is the venue's grid. A one-sixteenth-dollar increment is $0.0625$ dollars, which is $6.25$ one-cent ticks.
- An OHLC bar stores open, high, low and close. It does not store the order of the extremes. The sequences $(O, H, L, C)$ and $(O, L, H, C)$ can share a bar.
- The close-to-close simple return uses two closes only. On Path A, $104$ to $103$ is exactly $-1/104$, or $-0.009615$ at six decimals.
- An invented bar with high $106$ and low $100$ has that same return and a range of $6$. A tight bar with range $1$ has it too. The return does not see the difference.
- Marking the same previous close to the high or the low produces about $0.019231$ and $-0.038462$, which are not the close-to-close return.
- Sampling $100 + 2\sin x$ at its peak and trough gives the return $-2/51$. Sampling it where it crosses $100$ gives the return $0$. The clock is part of the result.
- Decimalisation, completed for the NYSE and Amex by 9 April 2001, changed the grid and not the definition of a tick.
:::

## Exercises

:::exercise The Path A step as a fraction {level=1 check="-1/104"}
Enter the exact close-to-close simple return from $104$ to $103$.
:::solution
[[#def-close-return]] gives $103/104 - 1 = -1/104$. At six decimals this is the path's $-0.009615$. Either form is the same number; the fraction is exact. The following return on Path A, from $103$ to $107$, is a different step and is not the answer.
:::
:::

:::exercise Range of the invented day {level=1 check="6"}
The invented bar has high $106$ and low $100$. Enter the range in dollars.
:::solution
The range is $H - L = 106 - 100 = 6$. It is not the close-to-close move of $1$ dollar, and it is not the return $-1/104$. [[#ex-range]] uses this range to show what the close throws away. The tight bar in [[#ex-tight]] has range $1$ on the same two closes, which is why the range has to be computed from the high and the low you were given, not from the closes alone.
:::
:::

:::exercise Penny ticks in a dollar {level=1 check="100"}
A price moves by one dollar and the minimum tick is one cent. Enter the number of minimum ticks in the move.
:::solution
One dollar is $1/0.01 = 100$ one-cent ticks. The same dollar is $16$ sixteenths, because $1/0.0625 = 16$. The exercise asks for the one-cent grid, which is the decimal grid after the change recorded in the historical note. The return on a move from $104$ to $103$ is not $100$; the tick count is.
:::
:::

:::exercise Return to the low {level=2 check="-1/26"}
Previous close $104$, low $100$. Enter the exact simple return from the previous close to the low. This is not the close-to-close return.
:::solution
$100/104 - 1 = -4/104 = -1/26$. The decimal is about $-0.038462$. [[#def-close-return]] refuses this number as the bar's return, because the bar closed at $103$, not at $100$. The number is still a well-defined ratio of two prices that appear in [[#ex-range]]. Keeping both, and labelling which is the close, is the whole exercise. The return to the high on the same bar is $1/52$, a different wrong candidate for $R_t$.
:::
:::

:::exercise Two sequences, one return {level=2 check="-0.009615"}
The sequences $(104, 106, 100, 103)$ and $(104, 100, 106, 103)$ both end at $103$, and the previous close is $104$. Enter the close-to-close simple return they share, to six decimals.
:::solution
Both sequences have the same close, so both have return $103/104 - 1 \approx -0.009615$. [[#prop-many-paths]] built the sequences precisely so that the OHLC bar could not tell them apart. Their shared return is the second half of that proposition. The sequences differ as trading paths: the low prints second in one and third in the other. That difference is real and invisible to the number you just entered. Reporting $-0.009615$ is correct for the question that was asked and incomplete as a description of either day.
:::
:::

:::exercise Peak to trough on the toy price {level=2 check="-2/51"}
Treat $102$ and then $98$ as consecutive closes of $P(x) = 100 + 2\sin x$. Enter the exact simple return.
:::solution
$98/102 - 1 = -4/102 = -2/51$. The decimal is about $-0.039216$. Sampling the same curve at $x = 0$ and $x = 2\pi$ would have given $100$ and $100$, hence a return of $0$. [[#ex-sine]] is the source of both clocks. The widget draws the curve so that neither sample is privileged by the picture; the privilege is the rule's decision to store one pair of times. The answer $-2/51$ is the peak-to-trough clock only.
:::
:::

:::exercise Constructing the two paths {level=3}
Prove the first half of [[#prop-many-paths]] without looking at the write-up: from $H > \max(O, C)$ and $L < \min(O, C)$, show that $(O, H, L, C)$ and $(O, L, H, C)$ are legal OHLC witnesses of each other and are different sequences. State where you use $H \neq L$.
:::hint
Check the maximum and the minimum of each sequence against $H$ and $L$. Then compare the second print of each sequence.
:::
:::solution
The sequence $(O, H, L, C)$ attains $H$ and $L$. Its maximum is $H$ because $H > \max(O, C)$ puts $H$ strictly above $O$ and above $C$, and $L < \min(O, C) \le \max(O, C) < H$ puts $H$ strictly above $L$. Its minimum is $L$ because $L$ is strictly below $O$, below $C$ and below $H$. The sequence $(O, L, H, C)$ attains the same four values, only in a different order, so it has the same maximum, the same minimum, the same open and the same close. Both therefore compress to the bar $(O, H, L, C)$.

They differ as sequences because their second prints are $H$ and $L$. The inequality $H > L$ is not an extra assumption: it follows from $H > \max(O, C) \ge \min(O, C) > L$. That is where $H \neq L$ enters. If the high did not clear both the open and the close, or the low did not undercut both, this particular pair of sequences might leave the bar, and a different witness would be needed. The close-to-close return does not use this construction at all. It only needs the shared close.
:::
:::

:::exercise A fill at the low is not a close-to-close result {level=3}
On the bar with previous close $104$, low $100$ and close $103$, compute the per-share P&L of buying at the low and selling at the close, and the per-share P&L of holding from the previous close to this close. Explain why the first figure uses a hypothesis the second does not, and why "the low printed" does not by itself justify a fill at the low.
:::hint
Subtract prices for both P&Ls first. Then ask whether the OHLC bar records that a buy order was present at the low, or only that some print equalled the low.
:::
:::solution
Buying at $100$ and selling at $103$ makes $103 - 100 = 3$ dollars per share. Holding from the previous close to this close makes $103 - 104 = -1$ dollar per share. The two figures differ by $4$ dollars per share on the same day. The second is the close-to-close P&L of one share, whose return is $-1/104$. The first is a round trip inside the bar.

The round trip assumes a buy was filled at the low and a sale was filled at the close. [[#def-ohlc]] records that the minimum print was $100$ and that the last print was $103$. It does not record that any particular order was working at $100$, nor whether $100$ printed early or late, nor whether a buy order of the size you have in mind would have been the print. [[#prop-many-paths]] supplies two sequences with the same low. A fill model that always grants the low is using a path the bar does not identify. That grant is the optimistic hypothesis the orders course will name. Even before that course, the $3$ dollar figure cannot be entered as the close-to-close result, because the close-to-close result is $-1$ dollar. The information set of a close-only rule does not contain the low, so the $3$ dollar trade is not a rearrangement of that rule. It is a different rule, with a fill assumption attached.
:::
:::
