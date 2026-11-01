An average cannot print a turn at the same instant as the close that made it. The newest close is one term in a sum, and the other terms are older. That delay is lag. If the delayed signal flips and then flips back, the account pays to enter and pays to leave on a move that did not continue. That round trip is a whipsaw. A cost per unit of turnover turns the round trip into arithmetic. None of the three is a footnote on a trend rule. Each one is part of what the rule claims once it is written as a holding.

The path already used for the cross is Path A, closes $100, 102, 101, 104, 103, 107, 106, 110$ at $t = 0,\ldots,7$. [[trend/moving-averages]] computed the positions of the $\mathrm{SMA}_3$ versus $\mathrm{SMA}_5$ rule: flat through $t = 3$, long at $t = 4, 5, 6, 7$, one change of position, gross compound return $7/103 = 0.067961$ from the paid sessions $R_5, R_6, R_7$. This chapter prices that one change at a one-way cost $c = 0.001$. A second, longer invented path is needed before a flip back can be counted. It is computed below and is not a market.

## Lag on a line, and lag at a crest

:::definition Lag of a trailing window {#def-lag}
The **lag** of $\mathrm{SMA}_n$, on a path where the statement makes sense, is the number of sessions between a reference date on the close and the date at which the average reflects that reference. On a straight line the number is exact and equals $(n-1)/2$. On a path with a crest, this chapter measures lag as the number of sessions between the crest of the close and the later crest of the average. A longer window has a weakly larger line-lag, because $(n-1)/2$ increases with $n$. Larger lag is a later signal, not a more conservative philosophy.
:::

:::proposition An SMA on a straight line equals an earlier point on the line {#prop-linear-lag}
Suppose $P_t = a + bt$ for every integer $t$, with $a$ and $b$ constant. For $n \ge 1$ and $t \ge n - 1$,

$$
\mathrm{SMA}_n(t) = a + b\Bigl(t - \frac{n-1}{2}\Bigr),
$$

which is the straight line evaluated $(n-1)/2$ sessions before $t$. When $n$ is odd this value is one of the observed closes, the close at the centre of the window.
:::

:::proof
By definition,

$$
\mathrm{SMA}_n(t) = \frac1n\sum_{i=0}^{n-1} \bigl(a + b(t-i)\bigr) = a + bt - \frac{b}{n}\sum_{i=0}^{n-1} i.
$$

The sum of the first $n$ non-negative integers starting at $0$ equals $(n-1)n/2$, so the subtracted term is $b(n-1)/2$. Therefore the average equals $a + b\bigl(t - (n-1)/2\bigr)$, which is $P$ at time $t - (n-1)/2$. If $n = 2m+1$, the lag is the integer $m$, and the centre of the window $\{t-n+1,\ldots,t\}$ is the observation $t - m$.
:::

For $n = 3$ the lag is $1$ session. For $n = 5$ it is $2$. A rule that is long when a fast average exceeds a slow one is, on a rising line, comparing two delayed copies of the same line. The fast copy is the more recent one, so the inequality holds while $b > 0$, after both windows exist. No new information has arrived. The cross is the ordering of two lags.

A crest is where the delay becomes a mistake about timing rather than a shift along a line. The illustration uses a sine sampled once per session,

$$
Q_t = 100 + 10\sin\bigl(\pi t / 6\bigr), \qquad t = 0, 1, \ldots, 12.
$$

The values at integer multiples of the period are ordinary: $Q_0 = 100$, $Q_1 = 105$, $Q_3 = 110$, $Q_5 = 105$, $Q_6 = 100$, $Q_7 = 95$, $Q_9 = 90$, $Q_{12} = 100$. The off-grid samples are $Q_2 = Q_4 = 100 + 5\sqrt{3} \approx 108.660254$ and $Q_8 = Q_{10} = 100 - 5\sqrt{3} \approx 91.339746$. The unique maximum of $Q$ is at $t = 3$.

:::example Crests of the average come later {#ex-sine}
On the series $Q_t$, compute $\mathrm{SMA}_3$ and $\mathrm{SMA}_5$ at every date they exist, to four decimals, and report the date of each maximum.
:::solution
$\mathrm{SMA}_3$, rounded to four decimals, runs from $t = 2$ through $t = 12$:

$$
104.5534,\ 107.8868,\ 109.1068,\ 107.8868,\ 104.5534,\ 100,\ 95.4466,\ 92.1132,\ 90.8932,\ 92.1132,\ 95.4466.
$$

The unique maximum is $109.1068$ at $t = 4$, one session after the close crested at $t = 3$. That is the line-lag of a three-session window, now visible on a turn: at $t = 4$ the close has already fallen back to about $108.6603$, while the average is still printing its high, because the high close at $t = 3$ has only just reached the centre of the window.

$\mathrm{SMA}_5$ from $t = 4$ through $t = 12$, to four decimals:

$$
106.4641,\ 107.4641,\ 106.4641,\ 103.7321,\ 100,\ 96.2679,\ 93.5359,\ 92.5359,\ 93.5359.
$$

The unique maximum is $107.4641$ at $t = 5$, two sessions after the close crested. The five-session average is later than the three-session average, as [[#prop-linear-lag]] suggests and as a crest makes costly: by $t = 5$ the close is $105$, five points under its high, and the slow average is only then reaching its own high. A cross that waits for the slow average waits through that fall. Waiting is not free merely because the window is longer.
:::
:::

Lengthen the slow window on the figure. The slow average changes more slowly than the price, and the number of crossings falls. On a straight line this chapter proves that an n-day average equals the line (n−1)/2 steps earlier. This path is not a straight line, so that identity is not the number in the readout. The lag is still why the shading does not sit on the crests of the price.

:::widget average
fast: 4
slow: 16
kind: sma
caption: Lengthen the slow window and watch the crossing count. The shading is where the fast average is above the slow one. On a straight line the lag is (n−1)/2 steps. This curve is not a straight line, and it is not a market.
:::
:::widget plot
f: 100+6*sin(x); 100+6*(2/L)*sin(L/2)*sin(x-L/2)
x: 0, 18
sliders: L=3:1:8:0.5
labels: sine; trailing mean of length L
caption: Increase L. The second crest moves to the right and shrinks. That shift is the lag of a longer trailing window. The curves are a sine and its mean, not a forecast.
:::

The widget is the continuous version of the same fact. The mean of $\sin$ over $[x-L, x]$ equals $\frac{2}{L}\sin(L/2)\sin(x - L/2)$ for $L$ not a multiple of $2\pi$ in a way that kills the amplitude, and the phase $L/2$ is the lag. Increasing $L$ moves the crest later. It does not move the crest of the raw sine at all.

## Whipsaw

:::definition Whipsaw {#def-whipsaw}
A **whipsaw** is a pair of opposite position changes that returns the account to a state it has already left, over an interval on which the price move that justified the first change does not continue in that direction. In the long/flat case the pattern is long, then flat, then long: two exits from a state, three unit changes if one counts the opening entry, the exit and the re-entry. The middle state earns the cash return. The two outer states earn whatever the risky return was, which may already be the wrong sign by the time the lagged signal arrives.
:::

Path A does not contain this pattern. Its 3-versus-5 flag is flat and then long, once. Calling that entry a whipsaw would empty the word. The path that does contain it is Path B, invented for this chapter and checked with exact fractions:

$$
P^{B} = (100,\ 102,\ 106,\ 110,\ 112,\ 108,\ 102,\ 98,\ 103,\ 109,\ 115),
$$

sessions $t = 0,\ldots,10$. The close rises to $112$ at $t = 4$, falls to $98$ at $t = 7$, and rises to $115$ at $t = 10$.

:::example A cross that flips and flips back {#ex-pathb}
On Path B compute $\mathrm{SMA}_3$ and $\mathrm{SMA}_5$ where both exist, list the long/flat flag of [[trend/moving-averages]], and list the sessions at which the position changes. State the paid risky returns.
:::solution
Both averages exist from $t = 4$.

| $t$ | $P^{B}_t$ | $\mathrm{SMA}_3$ | $\mathrm{SMA}_5$ | flag |
|---|---|---|---|---|
| $4$ | $112$ | $328/3 \approx 109.3333$ | $106$ | long |
| $5$ | $108$ | $110$ | $107.6$ | long |
| $6$ | $102$ | $322/3 \approx 107.3333$ | $107.6$ | flat |
| $7$ | $98$ | $308/3 \approx 102.6667$ | $106$ | flat |
| $8$ | $103$ | $101$ | $104.6$ | flat |
| $9$ | $109$ | $310/3 \approx 103.3333$ | $104$ | flat |
| $10$ | $115$ | $109$ | $105.4$ | long |

The flag is long, long, flat, flat, flat, flat, long. With a flat start before $t = 4$, the position changes at $t = 4$ (enter), $t = 6$ (exit) and $t = 10$ (re-enter). That is the pattern in [[#def-whipsaw]].

The position dated $t$ earns $R_{t+1}$. The paid risky sessions are therefore $R_5$ and $R_6$ only:

$$
R_5 = \frac{108}{112} - 1 = -\frac{1}{28}, \qquad R_6 = \frac{102}{108} - 1 = -\frac{1}{18}.
$$

The growth factor with cash at $0$ is $(27/28)\cdot(17/18) = 51/56$. The compound return is $-5/56 = -0.089286$ to six decimals. The rebound from $98$ to $115$ is real and almost entirely unpaid: the slow average keeps the flag flat through $t = 9$, and the re-entry at $t = 10$ has no next session inside the sample. Lag is why the entry at the crest and the re-entry at the end bracket a fall the account actually held, while the recovery the account did not hold sits in the flat stretch. This is one constructed path. It shows the mechanism. It does not show that crosses lose on markets.
:::
:::

Turnover is the sum of the absolute changes in the target weight, starting from $0$. On Path B each of the three changes has size $1$, so turnover is $3$. On Path A the single entry has size $1$, so turnover is $1$. No terminal liquidation is added in either case. A specification that flattens at the last print would add another unit on any path that ends long, and it would be a different specification.

## A cost per unit traded

:::definition Proportional turnover cost {#def-cost}
Fix $c$ with $0 \le c < 1$. When the target weight changes by $\tau$ at a moment when wealth is $W$, with $\tau \ge 0$ the notional traded as a fraction of $W$, wealth is multiplied by $1 - c\tau$, provided $c\tau < 1$. The charge is taken at the rebalance, before the account earns the next session's return. Cash earns $0$ unless a sentence says otherwise. A sequence of rebalances multiplies these factors together with the gross return factors of the sessions that are actually held.
:::

The charge $c\tau$ is linear in the notional traded at that instant. Two separate rebalances of size $1$, at two different times, contribute two factors of $1 - c$. One rebalance of size $2$, for example a flip from long to short, contributes a single factor $1 - 2c$, which is not the same as $(1-c)^2$. The proposition uses the first situation only.

:::proposition Cost factor of long, flat, long {#prop-cost}
Assume the cost model in [[#def-cost]], cash return $0$, and risky simple returns $R_a > -1$, $R_b > -1$. The position path, and nothing else, is: enter one unit from flat, earn $R_a$ while long, exit to flat, earn $0$ while flat, enter one unit again, earn $R_b$ while long. There are three rebalances, each of size $\tau = 1$, and no terminal liquidation. Let $G_0 = (1+R_a)(1+R_b)$ be the growth factor of the same position path with $c = 0$. Then the net growth factor is

$$
G(c) = G_0\,(1-c)^3.
$$

The net compound return $G(c) - 1$ is not equal to $(G_0 - 1)\,(1-c)^3$, and it is not equal to $G_0 - 1 - 3c$, except at isolated values of the inputs.
:::

:::proof
Start with wealth $1$. The entry multiplies by $1 - c$. The long session multiplies by $1 + R_a$. The exit multiplies by $1 - c$. The flat session multiplies by $1$. The re-entry multiplies by $1 - c$. The second long session multiplies by $1 + R_b$. The product is $(1+R_a)(1+R_b)(1-c)^3$, which is $G_0(1-c)^3$.

The gross compound return is $G_0 - 1$. Multiplying that quantity by $(1-c)^3$ drops the $-1$ through the same factor and does not recover $G(c) - 1 = G_0(1-c)^3 - 1$. Subtracting $3c$ from $G_0 - 1$ ignores both the timing of the charges inside a product and the difference between $1 - 3c + 3c^2 - c^3$ and $1 - 3c$. Those two expressions agree only on a set of special cases, not as an identity.
:::

The factor $(1-c)^3$ is the explicit cost factor for this position path. It multiplies the gross growth factor. It does not multiply the gross compound return. The Path A example is the place where "subtract $c$" can be seen to miss by a definite fraction.

:::example Path A at a cost of one thousandth {#ex-cost-a}
The 3-versus-5 cross on Path A changes position once, by one unit, and its gross growth factor is $110/103$. Apply [[#def-cost]] with $c = 0.001$. Compute the net compound return. Also compute the number obtained by subtracting $0.001$ from the gross compound return, and the gap between those two answers.
:::solution
There is one rebalance of size $1$, so the cost factor is $1 - c = 999/1000$, not $(1-c)^3$. The path is long once, not long-flat-long. [[#prop-cost]] is the general pattern; this example uses the same cost definition with the turnover already counted, which is $1$.

$$
G = \frac{110}{103}\cdot\frac{999}{1000} = \frac{109890}{103000} = \frac{10989}{10300}.
$$

The net compound return is $689/10300 = 0.066893$ to six decimals.

The gross compound return is $7/103 = 0.067961165\ldots$. Subtracting $0.001$ produces

$$
\frac{7}{103} - \frac{1}{1000} = \frac{6897}{103000} = 0.066961165\ldots,
$$

which rounds to $0.066961$ at six decimals. The exact net compound return is smaller by

$$
\frac{6897}{103000} - \frac{6890}{103000} = \frac{7}{103000} \approx 0.00006796,
$$

or $0.000068$ to six decimals. The gap equals $c$ times the gross compound return: subtracting $c$ from a compound return forgets that the cost was a fraction of wealth at the entry, after which the gross growth still applied to what remained. On this toy the miss is in the fifth decimal. The identity that fails is the same one that fails for large $c$. At the break-even cost that drives $G$ to $1$, $c = 1 - 103/110 = 7/110 \approx 0.063636$, subtracting $c$ from $7/103$ does not give zero. The factor form does.
:::
:::

:::example The same cost on the whipsaw {#ex-cost-b}
Apply $c = 0.001$ to Path B's three unit rebalances. The gross growth factor is $51/56$. Compute the net compound return to six decimals.
:::solution
[[#prop-cost]] applies directly: the position path is long, flat, long, with three unit trades, and the two risky factors are already multiplied in $51/56$. The flat stretch contributes $1$. The net growth factor is

$$
\frac{51}{56}\,(0.999)^3 = \frac{51}{56}\cdot 0.997002999.
$$

The net compound return is $-0.092015$ to six decimals. The gross compound return was $-0.089286$ to six decimals. The cost makes a losing whipsaw slightly more losing. It does not create the loss. The loss was the two down sessions held after a lagged entry. A reader who subtracted $3c = 0.003$ from $-5/56$ would get $-0.092286$ to six decimals, which is not $-0.092015$. The factor $(1-c)^3$ is the expression [[#prop-cost]] derived; the subtraction is the approximation the proposition refuses.
:::
:::

One library row is enough to show an exit rule sitting on top of a trend entry and dominating the published summary. O09 is described as a trend entry whose exit is managed by a 4% trailing stop. Daily bars, span 25 years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the total return is $+30.0\%$, the CAGR is $+1.06\%$, the reported Sharpe is $-0.33$ and the max drawdown is $-7.0\%$. This atlas has not re-run the backtest and has not verified the Sharpe convention. The order mechanics of a trailing stop are not derived here; they belong to [[orders/trailing-brackets-and-oco]]. The point that belongs here is narrower. An exit overlay is part of the position path. It can change the sign of a reported Sharpe relative to a casual reading of the entry, and a negative reported Sharpe beside a modest positive CAGR is left as reported. It is not a reason to take the other side of the entry, and it is not a reason to drop the exit from the specification in order to rescue the adjective "trend".

:::intuition You pay for the delay on the way in and on the way out
On a straight line, lag only shifts the date at which the average matches a price the line has already passed. On Path B the same arithmetic enters near a crest, holds two down sessions, exits, and re-enters after the recovery. Each of those three weight changes is a date at which [[#def-cost]] multiplies by $1 - c$. Lengthening the window to "avoid whipsaw" increases the lag in [[#prop-linear-lag]]. Sometimes that skips a false turn. Sometimes, as in [[#ex-sine]], it arrives even later to a real one. The window length is a parameter with a lag attached, not a moral setting.
:::

:::warning Subtracting the cost from the compound return
The gross compound return on Path A is $0.067961$ to six decimals, and $c = 0.001$. The difference $0.066961$ is not the net compound return. The net figure is $0.066893$, because wealth was multiplied by $1 - c$ and then by $110/103$. [[#prop-cost]] records the general failure of the subtraction. A small gap is still the wrong expression. Costs specified as a fraction of notional belong inside the product.
:::

:::quiz
On a straight line, how many sessions of lag does $\mathrm{SMA}_5$ carry?
- [ ] $5$, the length of the window
- [ ] $0$, because an average of a line is the line
- [x] $2$, which is $(5-1)/2$
- [ ] $1$, the same lag as $\mathrm{SMA}_3$
:::solution
[[#prop-linear-lag]] puts the average at time $t - (n-1)/2$. For $n = 5$ that is two sessions before $t$. The average equals the line, but it equals an earlier point on the line, not the current close, unless the slope is zero.
:::
:::

:::quiz
Path A's 3-versus-5 cross, with no terminal liquidation, has turnover $1$ and gross growth factor $110/103$. With $c = 0.001$, which quantity is the net growth factor?
- [ ] $110/103 - 0.001$
- [ ] $(7/103)\cdot 0.999$
- [x] $(110/103)\cdot 0.999$
- [ ] $(110/103)\cdot(0.999)^3$, because every cross is a whipsaw
:::solution
Turnover is one unit trade, so [[#def-cost]] contributes a single factor $0.999$ multiplying the gross growth factor $110/103$. Subtracting from the growth factor, multiplying the compound return, and using the three-trade factor from [[#prop-cost]] are three different expressions. Path A does not flip back, so the three-trade factor does not apply.
:::
:::

:::remark Where the orders and the weights go
A unit of turnover is a change in a target weight, or the notional of an order, only after a map is chosen. [[portfolio/from-signal-to-weight]] writes the map from a signal to a weight. [[orders/market-and-limit-orders]] writes the map from a desired trade to an order type. This chapter stops at $1 - c\tau$ multiplied into wealth. It does not choose a venue, a limit price or a share count. O09's trailing stop is named so that an exit overlay is visible in a reported Sharpe; the stop itself is not specified again.

The same boundary applies to the library rows in the earlier chapters. A reported CAGR is a terminal growth on someone else's cost model. Putting $c = 0.001$ onto Path A does not adjust O01, W01, W22 or W06, and it does not say that those experiments omitted costs. Their cost assumptions are whatever the source used. They were not re-run here.
:::

:::history Costs were part of the argument
Brock, Lakonishok and LeBaron in 1992 tested moving-average and trading-range rules on the Dow Jones index and found historically positive results. The course record notes that later work argued about costs, data mining and whether the result survived. The cost factor in [[#prop-cost]] is the sort of object that argument needs: an explicit multiplier, tied to a position path, rather than a general doubt. Hurst, Ooi and Pedersen in 2017 is an average across futures markets and years; the course references say to read that paper's market list and its cost assumptions. Those assumptions do not migrate into an equity-fund order rule, and Path B's three trades do not migrate into that average either.
:::

## Where this leads

A signal becomes a weight only after a map, and a weight becomes a fill only after an order type. [[portfolio/from-signal-to-weight]] and [[orders/market-and-limit-orders]] are those two steps. The trend hypothesis, the averages, the channel, the MACD line and the list filter are all features dated $t$. Lag, whipsaw and $1 - c\tau$ are what the features cost once they are allowed to change a position. None of them is a recommendation to follow a trend, to widen a window, or to hold any of the series named in the library rows.

:::summary
- On a straight line, $\mathrm{SMA}_n(t)$ equals the line $(n-1)/2$ sessions earlier. For $n = 3$ the lag is one session; for $n = 5$ it is two.
- On the sampled sine, the close crests at $t = 3$, $\mathrm{SMA}_3$ crests at $t = 4$ and $\mathrm{SMA}_5$ crests at $t = 5$. A longer window is later, not automatically gentler.
- A whipsaw in the long/flat case is the pattern long, flat, long. Path B's 3-versus-5 cross does this, with turnover $3$, and the paid compound return is $-5/56$. Path A's cross does not; its turnover is the one entry already counted.
- If each of three unit rebalances multiplies wealth by $1-c$, the net growth factor equals the gross growth factor times $(1-c)^3$. The net compound return is that product minus one, not the gross compound return times the same factor.
- On Path A with $c = 0.001$, the net compound return is $0.066893$. Subtracting $0.001$ from the gross compound return gives $0.066961$ and is the wrong expression.
- O09 reports Sharpe $-0.33$ with CAGR $+1.06\%$ for a trend entry managed by a trailing stop. The overlay is part of the result. The stop's mechanics are left to the orders course.
:::

## Exercises

:::exercise Lag of the short window {level=1 check="1"}
On a straight line, how many sessions of lag does $\mathrm{SMA}_3$ have? Enter an integer.
:::solution
[[#prop-linear-lag]] gives $(3-1)/2 = 1$.
:::
:::

:::exercise Lag of the long window {level=1 check="2"}
On a straight line, how many sessions of lag does $\mathrm{SMA}_5$ have? Enter an integer.
:::solution
$(5-1)/2 = 2$.
:::
:::

:::exercise Turnover on Path A {level=1 check="1"}
The 3-versus-5 cross on Path A is flat and then long, with no terminal liquidation. Enter its turnover, counting unit changes in position from a flat start.
:::solution
There is one change, from $0$ to $1$, at the first date the slow average exists and the fast average is above it. Turnover is $1$.
:::
:::

:::exercise Net compound return on Path A {level=2 check="0.066893"}
Gross growth factor $110/103$, one unit trade, $c = 0.001$. Enter the net compound return to six decimals.
:::solution
The net growth factor is $(110/103)\cdot(999/1000) = 10989/10300$. Subtracting $1$ gives $689/10300 = 0.066893$ to six decimals.
:::
:::

:::exercise How many trades on Path B? {level=2 check="3"}
Enter the number of unit position changes of the 3-versus-5 flag on Path B, including the entry, the exit and the re-entry, and excluding any terminal liquidation.
:::solution
[[#ex-pathb]] records changes at $t = 4$, $t = 6$ and $t = 10$. The count is $3$.
:::
:::

:::exercise Gross compound return on Path B {level=2 check="-0.089286"}
Enter the compound return of Path B's cross with $c = 0$, rounded to six decimals.
:::solution
The paid factors are $27/28$ and $17/18$, and the product is $51/56$. The compound return is $-5/56 = -0.0892857\ldots$, which rounds to $-0.089286$.
:::
:::

:::exercise The subtraction gap {level=3 check="0.000068"}
On the Path A cost example, subtract the exact net compound return from the number obtained by subtracting $0.001$ from the gross compound return. Enter the gap rounded to six decimals.
:::hint
The naive difference is $7/103 - 1/1000 = 6897/103000$. The exact net compound return is $689/10300 = 6890/103000$. Subtract those two fractions before you round.
:::
:::solution
$$
\frac{6897}{103000} - \frac{6890}{103000} = \frac{7}{103000} \approx 0.00006796,
$$
which rounds to $0.000068$. The gap equals $c \cdot (7/103)$, the cost times the gross compound return. It is the amount by which a subtraction overstates the net compound return in this example.
:::
:::

:::exercise Session of the slow crest {level=3 check="5"}
On $Q_t = 100 + 10\sin(\pi t/6)$ for $t = 0,\ldots,12$, at which session does $\mathrm{SMA}_5$ attain its unique maximum? Enter the session index.
:::hint
The close itself is largest at $t = 3$. The five-session average needs the window that still contains that crest and as much of the high neighbourhood as possible. Compare the averages at $t = 4$, $t = 5$ and $t = 6$; the values to four decimals are $106.4641$, $107.4641$ and $106.4641$.
:::
:::solution
The averages at $t = 4, 5, 6$ are about $106.4641$, $107.4641$ and $106.4641$, and the series of $\mathrm{SMA}_5$ in [[#ex-sine]] falls after $t = 5$ and is undefined before $t = 4$. The unique maximum is at session $5$, two sessions after the close crested. The lag matches $(5-1)/2$, even though $Q_t$ is not a straight line. That match is a feature of this particular sine sample, visible in the numbers, not a second proof of [[#prop-linear-lag]].
:::
:::
