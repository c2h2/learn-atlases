The rules so far have mapped a feature of one series into a long or flat position in that same series. A filter does a different job. It maps a signal into a universe: which names are eligible, or which named list is the one whose weights may be non-zero. The economic claim is still a trend claim. Someone is asserting that the sign of a reference series is informative about the returns of the list that gets switched on. The map is not a suggestion to hold the reference series, and it is not a suggestion to hold the list.

Path A remains the invented closes $P = (100, 102, 101, 104, 103, 107, 106, 110)$ at $t = 0,\ldots,7$. From [[trend/moving-averages]], $\mathrm{SMA}_3(t)$ for $t = 2,\ldots,7$ is $101$, $307/3$, $308/3$, $314/3$, $316/3$, $323/3$. The toy in this chapter is long the same series, or in cash, according to whether the close is strictly above that average. It is a one-name picture of a binary filter. It is not a multi-name defensive allocation, and the library row quoted below is not that toy.

## From a signal to a list

:::definition Filter {#def-filter}
Let a universe $\mathcal{U}$ be a finite set of names, and let $\mathcal{L}_1, \ldots, \mathcal{L}_m$ be subsets of $\mathcal{U}$, called lists. A **filter** is a rule that, at each date $t$, uses only information available at $t$ and returns one list $\mathcal{L}_{I_t}$. Names outside the chosen list receive target weight $0$. Names inside it receive whatever weights a further map assigns. The filter does not itself set those weights. A signal dated $t$ still earns returns after $t$: the list chosen at $t$ is exposed to the session that produces $R_{t+1}$, not to $R_t$.
:::

If $m = 2$ and one of the lists is a single risky series while the other is cash, the filter collapses to a long/flat rule. That collapse is the toy below. W06, the library case this chapter is built around, does not collapse in that way. Its catalogue line is: if SPY is above its $\mathrm{SMA}(200)$, hold the risk-on ETF list, otherwise the defensive list, and trade on signal change. Daily bars, span 19 years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the total return is $+132\%$, the CAGR is $+4.54\%$, the reported Sharpe is $0.26$, the max drawdown is $-24.6\%$, the win rate is $41.1\%$ and the profit factor is $1.64$. This atlas has not re-run the backtest, has not verified the Sharpe convention, and does not know, from the one-line rule, the membership of either list. Inventing tickers for those lists would invent an experiment.

SPY appears in that sentence as the series whose average chooses the list. Naming it is part of describing the reported experiment. It is not a finding that the series should be held, and the defensive list is a label in the same experiment, not a set of holdings this atlas is proposing. A reader who wants the constituents has to read the source. This chapter will not supply substitutes.

The reported win rate $41.1\%$ sits beside a positive reported CAGR. There is no tension in that pair until a win is defined. A win rate under one half, on whatever unit the backtest counted, can accompany a positive compound return if the winning units are larger than the losing units, or if the unit is not a full holding period. [[performance/win-rate-and-profit-factor]] makes the definition; the profit factor $1.64$ is the catalogue's companion cell, not a quantity recomputed here. The pair is not a reason to adopt the filter, and the positive CAGR is not one either.

:::definition Binary close-versus-average filter {#def-binary}
Fix a window $n$ and a cash return $c_f$ per session, constant, and known in advance. For $t \ge n - 1$, set

$$
f_t = \begin{cases} 1 & \text{if } P_t > \mathrm{SMA}_n(t),\\ 0 & \text{otherwise.} \end{cases}
$$

Before the average exists, set $f_t = 0$. If $f_t = 1$, the account earns $R_{t+1}$ over the next session. If $f_t = 0$, it earns $c_f$. The comparison is strict. A close equal to its average is cash, not risk. The rule is a filter in the sense of [[#def-filter]] whose two lists are "this one series" and "cash".
:::

:::proposition Growth when cash earns zero {#prop-cash}
Assume $c_f = 0$, each risky simple return satisfies $R_{t+1} > -1$, and wealth starts at $1$. Let $A$ be the set of dates $t$ at which $f_t = 1$ and $R_{t+1}$ exists. Then the growth factor of [[#def-binary]] is

$$
G = \prod_{t \in A} (1 + R_{t+1}),
$$

with the empty product equal to $1$. Replacing one held factor $1 + R$ by the cash factor $1$ raises $G$ if $R < 0$, lowers $G$ if $R > 0$, and leaves $G$ unchanged if $R = 0$, provided the other factors stay positive.
:::

:::proof
On a date with $f_t = 0$, wealth is multiplied by $1 + c_f = 1$. On a date with $f_t = 1$ and a next return, wealth is multiplied by $1 + R_{t+1}$. Dates without a next return multiply wealth by nothing further. The product of ones and of the held factors is the product over $A$.

Consider a factor $1 + R > 0$ inside that product, and write $G = (1+R)\, G_{\setminus}$ with $G_{\setminus} > 0$. The cash replacement gives $G' = G_{\setminus}$. Then $G' - G = G_{\setminus}\bigl(1 - (1+R)\bigr) = -R\, G_{\setminus}$. The sign of $G' - G$ is the opposite of the sign of $R$, and both are zero when $R$ is zero.
:::

The second sentence is the whole content of the word "defensive" inside this toy. Skipping a down session raises terminal wealth relative to having held it. Skipping an up session lowers it. A filter that spends a rally in cash is not defensive on that rally; it is absent. Whether absence helps depends on the returns it drops, which is observable after the fact and is not what the filter knew at $t$. Nothing in [[#prop-cash]] says that $P_t > \mathrm{SMA}_n(t)$ selects the positive next returns.

:::algorithm Signal-change trading for a binary filter {#alg-switch}
1. Compute $f_t$ from [[#def-binary]] at each date where the input exists.
2. Set $f_{-1} = 0$. A trade is required at $t$ when $f_t \ne f_{t-1}$.
3. If the risky sleeve is a single fully invested name, the trade is an entry when the flag goes from $0$ to $1$ and an exit when it goes from $1$ to $0$. The size of the change in weight is $1$.
4. If the risky sleeve is a list of names with internal weights, a signal change may require trades in every name whose target moves, and a day with no signal change may still require trades if the specification rebalances drift. W06's line says the reported rule trades on signal change. A daily-rebalance rule is a different clock. The one-name toy cannot show that difference, because a weight in $\{0, 1\}$ does not drift.
:::

## The toy on Path A

Compare $P_t$ with $\mathrm{SMA}_3(t)$. At $t = 2$, both equal $101$, so the strict rule is in cash. At $t = 3, 4, 5, 6, 7$ the close is strictly above the average: $104 > 307/3$, $103 > 308/3$, $107 > 314/3$, $106 > 316/3$, $110 > 323/3$. The flag therefore goes from $0$ to $1$ once, at $t = 3$, and stays $1$. [[#alg-switch]] records one entry and no exit inside the sample.

:::example Compound return with cash at zero {#ex-filter}
Apply [[#def-binary]] on Path A with $n = 3$ and $c_f = 0$. Which next-session returns are earned, and what is the compound return?
:::solution
The decision at $t$ earns $R_{t+1}$. The flag is $0$ at $t = 2$, so $R_3$ is not earned. The flag is $1$ at $t = 3, 4, 5, 6$, so $R_4, R_5, R_6, R_7$ are earned. The flag at $t = 7$ has no next return.

The held factors are $103/104$, $107/103$, $106/107$ and $110/106$. Cancel $103$, $107$ and $106$:

$$
\frac{103}{104}\cdot\frac{107}{103}\cdot\frac{106}{107}\cdot\frac{110}{106} = \frac{110}{104} = \frac{55}{52}.
$$

[[#prop-cash]] said the growth factor would be exactly that product. The compound return is $55/52 - 1 = 3/52 = 0.057692$ to six decimals.

The skipped return $R_3 = 3/101 > 0$ is an up session, the move from $101$ to $104$. By the second part of [[#prop-cash]], skipping it lowered the growth factor relative to having held it. Holding from $P_2$ through $P_7$ would have compounded to $110/101 - 1 = 9/101 = 0.089109$. The filter's $3/52$ is the move from $104$ to $110$, which is what remains after the cash session. Cash helped on none of the later down sessions in a way that dominates this arithmetic, because those down sessions were held: the telescope keeps them and still reduces to $110/104$. The filter was "defensive" only at the tie, and the tie was followed by a rise.
:::
:::

:::example The tie is the whole difference {#ex-tie}
Change only the inequality in [[#def-binary]], from strict to weak, so a close equal to $\mathrm{SMA}_3$ is invested. Recompute the compound return on Path A with $c_f = 0$.
:::solution
The unique tie is at $t = 2$. The weak rule sets $f_2 = 1$ and therefore earns $R_3$ as well as $R_4,\ldots,R_7$. The extra factor is $104/101$, and

$$
\frac{104}{101}\cdot\frac{110}{104} = \frac{110}{101}.
$$

The compound return is $9/101 = 0.089109$ to six decimals. One date, on which the close equals the average, moves the compound return from $0.057692$ to $0.089109$. The specification's choice of $>$ rather than $\ge$ is not decorative. It is the entire difference between these two toys. Neither choice is recommended by the arithmetic. Both are definitions.
:::
:::

:::example A non-zero cash return on the one flat session {#ex-cash-rate}
Keep the strict rule, and set $c_f = 0.001$ on each flat session that has a next return. Compute the compound return.
:::solution
There is one such session, the step earning $R_3$, on which the account now multiplies by $1.001$ instead of by $1$. Every held factor is unchanged, so the growth factor is

$$
1.001 \cdot \frac{55}{52} = \frac{1001}{1000}\cdot\frac{55}{52} = \frac{11011}{10400}.
$$

The compound return is $611/10400 = 0.05875$ exactly. Relative to $3/52 = 0.057692\ldots$, the cash yield adds a little and does not change which risky sessions were held. A cash return larger than the skipped risky return would have mattered more; $0.001$ is far below $R_3 = 3/101$. This is still a one-name toy with a made-up cash rate. It is not a Treasury and not a defensive list.
:::
:::

:::example Why the toy does not reproduce W06's clock {#ex-clock}
On the strict Path A filter, list the sessions at which [[#alg-switch]] trades. Explain why a daily rebalance of this same flag would trade on the same sessions, and why that agreement would fail if the risky side were a list whose internal weights drift.
:::solution
The flag is $0, 0, 0$ at $t = 0, 1, 2$ (the average is undefined at the first two, and the tie is cash at $t = 2$) and $1$ afterwards. The unique change is at $t = 3$, from $0$ to $1$. Signal-change trading enters once.

A weight that is either $0$ or $1$ in a single name, and that is reset whenever the flag is evaluated, moves only when the flag moves. Daily evaluation and signal-change evaluation see the same unique move. There is no drift to repair: after the entry, the target remains $1$, and a single fully invested name has nothing to rebalance against.

If instead the chosen list contained several names with targets that sum to $1$, those weights would drift as soon as the names' returns differed, even while the filter's flag stayed on "risk-on". A daily rebalance would trade the drift. A signal-change rule, as W06's catalogue line describes, would not trade until the flag switched lists. The Path A agreement is an artefact of $\{0, 1\}$ weights in one name. It says nothing about which clock the 19-year row used beyond the words already in the catalogue line, and it is not a reason to prefer either clock.
:::
:::

W06's reported max drawdown of $-24.6\%$ is a property of whatever wealth path the catalogue computed. The toy's wealth path is short and ends at $55/52$, and its only flat step is at the beginning of the paid window, so it has no internal peak-to-trough worth quoting as a drawdown lesson. [[performance/volatility-and-drawdown]] separates a terminal return from a drawdown. A positive $3/52$ does not describe the path inside the product.

## A switch is not a return

The filter's flag is a two-state object. One can draw a Markov chain as a sketch of a book that moves between a risk-on list and a defensive list, remembering that a sketch is not W06 and not a model fitted to Path A.

:::widget markov
matrix: 0.90,0.10; 0.25,0.75
states: Risk-on; Defensive
steps: 24
caption: Start from Risk-on and read the distribution after a few steps. The chain is a picture of switching, not W06, and neither state is a list this atlas is telling you to hold.
:::

Let the states be risk-on and defensive, in that order, with the transition matrix

$$
\begin{pmatrix} 0.90 & 0.10 \\ 0.25 & 0.75 \end{pmatrix}.
$$

A stationary row vector $\pi$ satisfies $\pi = \pi P$ and $\pi_1 + \pi_2 = 1$. The first coordinate obeys $\pi_1 = 0.90\,\pi_1 + 0.25\,(1 - \pi_1)$, so $0.35\,\pi_1 = 0.25$, hence $\pi_1 = 5/7$ and $\pi_2 = 2/7$. About five sevenths of a long run of this chain is spent in the risk-on state, if the chain is the data-generating process, which it is not. The fraction $5/7$ is not a CAGR, not a Sharpe and not a win rate. It is the balance equation of a matrix chosen for the figure. Changing the matrix changes the fraction. Fitting the matrix on the same sample later used to judge the filter is another searched object; [[statistics/stationarity-and-regimes]] is where regime filters are treated as parameters rather than as decorations.

:::intuition Absence is a position
Flat, cash, or "the defensive list" is a position with its own return. In the toy the return is $0$ or $0.001$, chosen by the writer of the example. In W06 the alternative return is whatever the defensive list did in that experiment, which this atlas has not recomputed. Calling the alternative defensive describes a hope about its drawdowns. The hope is not in [[#def-filter]]. The definition only says that one list is selected and the other receives weight zero.
:::

:::warning The reference series is not a holding
W06 uses a broad index fund's distance from its 200-session average as a switch. Describing that rule requires naming the series the catalogue names. The name is an input to someone else's specification. This chapter does not say to hold that series, does not say to hold a defensive basket, and does not say to follow a trend. The reported CAGR $+4.54\%$ is a cell in a backtest this atlas has not re-run. A cell is not an instruction.
:::

:::quiz
On Path A, the strict filter $P_t > \mathrm{SMA}_3(t)$ is flat at $t = 2$. Which return does that flat decision refuse?
- [ ] $R_2$, the return that just arrived at $t = 2$
- [x] $R_3$, the next session's return
- [ ] $R_7$, because a filter always refuses the last return
- [ ] No return, because a tie is invested by convention
:::solution
A feature dated $t = 2$ earns $R_3$ if it is invested, and earns the cash return if it is flat. The tie makes the strict rule flat, so $R_3$ is the refused risky return. [[#def-binary]] does not invest ties.
:::
:::

:::quiz
The catalogue reports a win rate of $41.1\%$ and a CAGR of $+4.54\%$ for W06. Which statement is justified without re-running the backtest?
- [ ] The rule lost money, because the win rate is below one half
- [ ] The rule should be scaled up, because the CAGR is positive
- [x] The two cells can sit together, and neither cell identifies the unit that was called a win. The atlas has not re-defined that unit and has not re-run the test
- [ ] The win rate must be a misprint, because a positive CAGR forces a win rate above one half
:::solution
A compound return and a win rate answer different questions. Without the unit, a win rate under one half does not determine the sign of the compound return. The positive CAGR is a reported cell, not a recommendation. Both figures are as reported in 2026.
:::
:::

:::remark Lists, weights, and what is still missing
Even after $I_t$ has chosen a list, each name inside the list needs a weight, and the weights need a rebalance rule. [[portfolio/from-signal-to-weight]] starts from that gap. A filter that is silent about weights is silent about turnover inside the list, which is why [[#ex-clock]] refused to treat the one-name toy as a model of W06. The trend hypothesis has not become milder by being applied to a list. It has become a hypothesis about the list's returns conditional on the reference signal. Costs and lag still apply, one level up: the reference average lags the reference turn, and each switch of lists pays the turnover of every name that enters or leaves.
:::

:::history Trend tools and extreme-reading tools
Wilder's *New Concepts in Technical Trading Systems* (1978) collected several indicators, including the relative strength index, and treated trend readings and extreme readings as separate tools. A filter that switches lists because a reference close is above a long average is on the trend side of that separation: it bets that a sign persists. An entry because a reading is extreme is a different bet, taken up in the reversion course. The 1978 separation does not endorse either bet, and it does not name a defensive list.
:::

## Where this leads

Switching lists does not remove lag. A long average turns after the price does, and a switch that waits for the average waits through the turn. [[trend/lag-whipsaw-and-costs]] prices that wait, including the single entry this chapter counted at $t = 3$, though the cost chapter's main Path A example is the moving-average cross rather than this filter. The weight map the filter still needs is [[portfolio/from-signal-to-weight]].

:::summary
- A filter maps information at $t$ to one list. Names off the list get weight zero. Weights on the list are a further map. The list chosen at $t$ earns returns after $t$.
- W06 switches between a risk-on ETF list and a defensive list according to whether SPY is above its $\mathrm{SMA}(200)$, trading on signal change. Reported CAGR $+4.54\%$, Sharpe $0.26$, max drawdown $-24.6\%$, win rate $41.1\%$. The series name is the catalogue's input, not a holding.
- The toy $P_t > \mathrm{SMA}_3(t)$ on Path A is flat only at the tie $t = 2$, then long. With cash at $0$ the growth factor is $55/52$ and the compound return is $0.057692$. Treating the tie as invested changes the compound return to $0.089109$.
- Skipping a positive return lowers terminal wealth relative to holding it. The word defensive does not override that arithmetic.
- On a single 0-or-1 name, signal-change trading and daily rebalancing trade on the same dates. On a drifting list they do not. W06's line specifies signal change.
- A two-state chain with the figure's matrix spends stationary mass $5/7$ on its first state. That mass is not a performance statistic.
:::

## Exercises

:::exercise Flat or invested at the tie? {level=1 check="0"}
Using the strict rule $P_t > \mathrm{SMA}_3(t)$ on Path A, enter $f_2$.
:::solution
$P_2 = \mathrm{SMA}_3(2) = 101$. The inequality is strict, so $f_2 = 0$.
:::
:::

:::exercise A later date {level=1 check="1"}
Enter $f_6$ for the same strict rule.
:::solution
$P_6 = 106$ and $\mathrm{SMA}_3(6) = 316/3 \approx 105.3333$. Since $106 > 316/3$, $f_6 = 1$.
:::
:::

:::exercise Toy compound return {level=1 check="0.057692"}
Enter the compound return of the strict filter on Path A with cash return $0$, to six decimals.
:::solution
The growth factor reduces to $55/52$. The compound return is $3/52 = 0.057692$ to six decimals.
:::
:::

:::exercise Include the tie {level=2 check="0.089109"}
If a close equal to $\mathrm{SMA}_3$ is invested, enter the compound return on Path A with cash at $0$, to six decimals.
:::solution
The extra held factor is $104/101$, and the growth factor becomes $110/101$. The compound return is $9/101 = 0.089109$ to six decimals.
:::
:::

:::exercise Cash earns one tenth of one percent {level=2 check="0.05875"}
Keep the strict filter and set the cash return to $0.001$ on the single flat paid session. Enter the compound return.
:::solution
Multiply $55/52$ by $1.001$. The growth factor is $11011/10400$, and the compound return is $611/10400 = 0.05875$.
:::
:::

:::exercise Win rate under one half {level=2}
W06 reports win rate $41.1\%$ and CAGR $+4.54\%$. Give one reason this pair is not, by itself, a contradiction. Do not propose a trade.
:::solution
A win rate is a count of units that met a definition of winning, divided by the number of units. A CAGR is a compound growth over a span of years. If the winning units are larger than the losing units, or if the unit is not "one holding period of the whole account", a win rate under one half can sit beside a positive compound return. The catalogue also reports a profit factor of $1.64$, which is consistent with gains exceeding losses on the unit it used, but this atlas has not re-defined that unit and has not re-run the test. The positive CAGR remains a reported cell, not an instruction.
:::
:::

:::exercise Cancel the telescope {level=3 check="55/52"}
Write the four held gross factors of [[#ex-filter]] and cancel them. Enter the growth factor as a reduced fraction.
:::hint
The factors are $103/104$, $107/103$, $106/107$ and $110/106$. Cancel a numerator against a later denominator.
:::
:::solution
Cancel $103$, then $107$, then $106$. The product is $110/104 = 55/52$. That is the growth factor. The compound return is $3/52$, which is not what the question asked for.
:::
:::

:::exercise Stationary mass {level=3 check="5/7"}
For the transition matrix in the figure, with rows $(0.90,\ 0.10)$ and $(0.25,\ 0.75)$, enter the stationary probability of the first state as a reduced fraction.
:::hint
Solve $\pi_1 = 0.90\pi_1 + 0.25(1-\pi_1)$ together with the probabilities summing to $1$.
:::
:::solution
The balance equation rearranges to $\pi_1 - 0.65\pi_1 = 0.25$, so $0.35\pi_1 = 0.25$ and $\pi_1 = 0.25/0.35 = 5/7$. The complementary mass is $2/7$. The fraction is a property of the matrix, not a backtest result, and the states are labels on a sketch rather than lists to hold.
:::
:::
