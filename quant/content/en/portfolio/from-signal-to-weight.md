A moving-average cross, a momentum rank and an RSI threshold are three different stories, and they are the same kind of object. Each one, on a given day, attaches a number to a name. That number is a **signal**. A portfolio cannot hold a signal. It holds a **weight**: a target fraction of net asset value. The step from one to the other is a map, and the map has parameters of its own. Two researchers can agree on every sign and still run different books, because they chose different maps.

The rest of this course studies particular maps — inverse volatility, volatility targets, equal risk contribution, drift bands, long-only constraints, neutrality constraints. This chapter fixes the vocabulary those maps share. The arithmetic is a specification, not an instruction to hold, buy or sell any security, fund or strategy.

## A signal is not yet a holding

Fix a decision time $t$. Write $P_{i,t}$ for the price of name $i$ used at that time, and say when the series is an adjusted close. The simple return that finishes at $t$ is $R_{i,t} = P_{i,t}/P_{i,t-1} - 1$. It is known once $P_{i,t}$ is known. It is not a weight.

:::definition Signal {#def-signal}
A **signal** $s_{i,t}$ is a number attached to name $i$ at time $t$, and it is a function of information available at $t$. In the examples here $s_{i,t}$ is usually a sign in $\{-1,0,1\}$ or a real score. A vector $s_t = (s_{1,t},\ldots,s_{n,t})$ is the signal on the whole universe. The signal is not a holding.
:::

:::definition Weight {#def-weight}
A **weight** $w_{i,t}$ is a target fraction of net asset value for name $i$ at the decision time $t$. The vector $w_t$ is a **portfolio**. A **map** is a stated rule $w_t = M(s_t)$ that turns a signal vector into a weight vector. Until $M$ is written down, $s_t$ does not determine $w_t$.
:::

Cash is allowed to be one of the names. When it is not listed, a **cash weight** is the residual that makes the listed weights and the cash weight add to $1$, and in every toy in this chapter that residual earns simple return $0$. Say so whenever you use it: a bond, a bill or an uninvested balance in a real account does not earn zero, and this chapter is not choosing among them.

:::definition Gross and net exposure {#def-gross}
For a weight vector $w$,

$$
G(w) = \sum_i \abs{w_i}, \qquad N(w) = \sum_i w_i.
$$

$G(w)$ is the **gross exposure**. $N(w)$ is the **net exposure**. If a cash weight is included and the weights add to $1$, the net is $1$. Gross and net answer different questions: net can be small while gross is large, because longs and shorts cancel in the sum and add in the sum of absolute values.
:::

Equal weight among the names with $s_i = 1$, with the rest in cash and with gross exposure $1$, is one map. Proportional to the raw signal, scaled so that the gross exposure is $1$, is another. They are not the only two. Any use of either one has to name it.

:::algorithm Long-only equal weight {#alg-long-only}
Given signs $s_i \in \{-1,0,1\}$ and a gross budget $g$ with $0 \le g \le 1$:

1. Let $A = \{i : s_i = 1\}$ be the active set, and let $m = \abs{A}$.
2. If $m = 0$, set every risky weight to $0$ and put weight $1$ on cash.
3. If $m \ge 1$, set $w_i = g/m$ for $i \in A$ and $w_i = 0$ for every other risky name.
4. Set the cash weight to $1 - g$.

The output is a weight vector. The signs of the names outside $A$ are thrown away by this particular map: a short signal and a flat signal both become zero.
:::

:::proposition Proportional gross-one map {#prop-proportional}
Let $s \in \R^n$ with $\sum_i \abs{s_i} > 0$, and define

$$
w_i = \frac{s_i}{\sum_j \abs{s_j}}.
$$

Then $G(w) = 1$, and $w_i$ has the same sign as $s_i$ whenever $s_i \ne 0$. The net is $N(w) = \sum_i s_i \big/ \sum_j \abs{s_j}$, which equals $1$ only when every non-zero signal is positive.
:::

:::proof
Factor the positive constant $c = \sum_j \abs{s_j}$ out of the sums:

$$
G(w) = \sum_i \abs{s_i}/c = c/c = 1, \qquad N(w) = \sum_i s_i / c.
$$

If $s_i > 0$ then $w_i > 0$, and if $s_i < 0$ then $w_i < 0$. The net equals $1$ when $\sum_i s_i = \sum_i \abs{s_i}$, which holds precisely when no $s_i$ is negative.
:::

[[#prop-proportional]] is a normalisation, not a view about expected returns. Replacing the denominator by $\sum_j s_j$ would fail as soon as a signal is negative or the signals cancel. Replacing it by $n$ would make the gross depend on how large the scores happen to be. The denominator in the proposition is the one that forces gross exposure $1$. A different gross budget $g$ is the same vector multiplied by $g$. If $g > 1$, that multiplication is leverage: it magnifies both gains and losses in the zero-rate accounting below. This atlas is not suggesting it. The worked maps in this chapter keep $g = 1$ or $g < 1$.

:::quiz
Signals on four names are $(1,1,0,-1)$. Which statement is true before a map is chosen?
- [ ] Each name with signal $1$ must have weight $1$.
- [ ] The fourth name must be short, because the signal is $-1$.
- [x] The same signal vector is compatible with more than one weight vector.
- [ ] The gross exposure is already $1$.
:::solution
A signal is not a weight. [[#alg-long-only]] sends this vector to $(1/2,1/2,0,0)$. [[#prop-proportional]] sends it to $(1/3,1/3,0,-1/3)$. Both maps are legal specifications. Neither is implied by the signs alone, so the gross exposure is not determined yet either.
:::
:::

## The same signs, two books

Take $s = (1,1,0,-1)$. Two names are long, one is flat, one is short.

:::example Two maps for one signal {#ex-two-maps}
Apply [[#alg-long-only]] with gross budget $g = 1$, and apply [[#prop-proportional]], to $s = (1,1,0,-1)$. Write both weight vectors, and the gross and the net of each.
:::solution
The active set has $m = 2$ names. Long-only equal weight with $g = 1$ gives

$$
w^{\mathrm{L}} = \bigl(\tfrac12,\tfrac12,0,0\bigr).
$$

Cash weight $1 - 1 = 0$. Gross $1/2+1/2 = 1$. Net $1$. The short signal has been replaced by zero. That is the map, not a hidden claim that the fourth name is unattractive.

For the proportional map, $\sum \abs{s_i} = 3$, so

$$
w^{\mathrm{P}} = \bigl(\tfrac13,\tfrac13,0,-\tfrac13\bigr).
$$

Gross $1/3+1/3+1/3 = 1$. Net $1/3+1/3-1/3 = 1/3$.

The two vectors disagree in the first, second and fourth coordinates. Same signal, different portfolio. The nets differ because one map refuses to short.
:::
:::

Nothing in that arithmetic says which map is appropriate. A research specification has to pick one and keep it. Changing from $w^{\mathrm{L}}$ to $w^{\mathrm{P}}$ after seeing a result is a second experiment, not a footnote.

Scores that are not signs need the same sentence. A score of $2$ is not "twice as long" as a score of $1$ until the normalisation is stated.

:::example Scores that are not signs {#ex-scores}
Let $z = (2,-1,1/2)$. Form the proportional gross-one weights. Then form the long-only weights that set every negative score to $0$ and renormalise the remaining positive scores so that they sum to $1$.
:::solution
The sum of absolute scores is $2 + 1 + 1/2 = 7/2$. [[#prop-proportional]] gives

$$
w^{\mathrm{P}} = \frac{2}{7/2},\ \frac{-1}{7/2},\ \frac{1/2}{7/2} = \bigl(\tfrac47,-\tfrac27,\tfrac17\bigr).
$$

Gross $4/7+2/7+1/7 = 1$. Net $(4-2+1)/7 = 3/7$.

The long-only convention drops the middle score. The positive part is $(2,0,1/2)$, and its sum is $5/2$. Dividing by that sum,

$$
w^{\mathrm{L}} = \bigl(\tfrac{2}{5/2},\ 0,\ \tfrac{1/2}{5/2}\bigr) = \bigl(\tfrac45,0,\tfrac15\bigr).
$$

Again the vectors differ. The proportional book is short the second name. The long-only book holds none of it, and it loads more onto the first name because the short no longer absorbs any of the gross budget.
:::
:::

:::intuition The active set is a parameter
Equal weight feels as if it contained no choice. It does. The choice is the active set, and the gross budget. With two names switched on, [[#alg-long-only]] at $g = 1$ gives each of them weight $1/2$. With four names switched on, each gets $1/4$. The signal on each name may still be "long". The weight moved because the count of names moved. A rule that adds a name to the universe changes every other weight, even when no signal flips.
:::

The figure draws that dependence and nothing else. It is not a price, and it is not a recommended count of holdings.

:::widget plot
f: 1/x
x: 1, 12
hlines: 0.5; 0.25
caption: Equal weight among $n$ names that a long-only map has switched on, with gross budget $1$. At $n = 2$ each weight is $1/2$; at $n = 4$ each weight is $1/4$. The signal on a name that stays "on" did not change. The weight did.
:::

## What the weight earns

A weight dated $t$ is chosen when the prices up to $t$ are known. The return those prices already produced is $R_{i,t}$. The weight was not in place during that return. Between $t$ and $t+1$, if the book is held still, name $i$ contributes $w_{i,t}$ times the next simple return.

:::proposition The legal product {#prop-clock}
Assume: the decision price $P_{i,t}$ is known at $t$; the simple return $R_{i,t} = P_{i,t}/P_{i,t-1}-1$ uses that price; the weight $w_{i,t}$ may depend on information available at $t$, including $P_{i,t}$; no further trade happens until $t+1$; and a name that is not in the vector earns nothing. Then the simple return of the book from $t$ to $t+1$ is

$$
R_{p,t+1} = \sum_i w_{i,t}\, R_{i,t+1},
$$

with $R_{i,t+1} = P_{i,t+1}/P_{i,t} - 1$. The product $\sum_i w_{i,t}\, R_{i,t}$ credits a move that had already finished when $w_{i,t}$ was chosen.
:::

:::proof
Over the interval from the decision price $P_{i,t}$ to the next price $P_{i,t+1}$, a fraction $w_{i,t}$ of net asset value is held in name $i$. The simple return on that fraction is $R_{i,t+1}$, by the definition of simple return. Summing across names gives $R_{p,t+1}$, because a weight is a fraction of the same net asset value and, in this model, the weights that earn the interval are the weights chosen at the start of it.

The return $R_{i,t}$ equals $P_{i,t}/P_{i,t-1}-1$. Both of those prices are already fixed at time $t$. Multiplying by $w_{i,t}$ does not describe an interval on which $w_{i,t}$ was the holding, unless a separate rule had set that same weight at $t-1$. If the signal inside $w_{i,t}$ used $P_{i,t}$, then $\sum_i w_{i,t} R_{i,t}$ also uses the end price of the return it claims to have earned. That is look-ahead, not a more accurate backtest. The clock is the same one as in [[markets/systematic-question]]: information at $t$, payoff after $t$.
:::

On a single name the long-only sign map of [[#alg-long-only]] is concrete. Let $s_t = 1$ when $R_t > 0$ and $s_t = 0$ otherwise, and set $w_t = s_t$. Then $w_t$ earns $R_{t+1}$, or earns $0$ when the signal is flat. The signed map $w_t = \operatorname{sign}(R_t)$, using $+1$ or $-1$ and never $0$, is [[#prop-proportional]] on a one-dimensional non-zero signal: the gross is $1$ and the sign is kept. Path A is the atlas's shared toy price path, not a market.

:::example Path A under two maps {#ex-path-a}
Path A prices are $100, 102, 101, 104, 103, 107, 106, 110$. The simple returns, rounded to six decimals, are $0.020000$, $-0.009804$, $0.029703$, $-0.009615$, $0.038835$, $-0.009346$, $0.037736$. Using the sign of the return just observed, form the long-only weight and the signed gross-one weight, each earning the next return, with cash return $0$. Compound both books. There is no signal for the first return, and the last return is a signal with no following return.
:::solution
Index the returns as $R_1,\ldots,R_7$. The long-only weight $w_t = 1$ when $R_t > 0$, else $0$, earns $R_{t+1}$ for $t = 1,\ldots,6$. The positive returns in that range are $R_1$, $R_3$ and $R_5$, and each of the following returns is negative. The book therefore earns $R_2$, $R_4$ and $R_6$, and earns $0$ on the three steps that follow a down move. Multiplying the exact gross price ratios,

$$
\frac{101}{102}\cdot\frac{103}{104}\cdot\frac{106}{107} = \frac{551359}{567528} \approx 0.971510.
$$

The compound simple return is $0.971510 - 1 = -0.028490$ to six decimals. The six-decimal returns reproduce the same six decimals.

The signed weight is $w_t = \operatorname{sign}(R_t)$. It is long into each of those three down moves, and it is short into each of the three up moves that follow a down move. The six gross factors are $101/102$, $98/101$, $103/104$, $99/103$, $106/107$ and $51/53$. Their product is $4851/5564 \approx 0.871855$, so the compound simple return is $-0.128145$ to six decimals.

Both numbers are losses. Path A alternates, so the sign of the last return is a poor description of the next one on this particular path. The point of the pair is not the sign of the loss. The point is that the losses differ: $-0.028490$ against $-0.128145$. The signal, "the sign of the last return", did not determine the compound return. The map did. Seven steps are not evidence about trend, and they are not a reason to prefer one map. [[trend/the-trend-hypothesis]] is where that hypothesis is stated.
:::
:::

One period is enough to see the same split without a path.

:::example One period, two names {#ex-one-period}
Signals are $(1,-1)$. The next simple returns are $0.02$ and $-0.01$. Cash earns $0$. Compute the portfolio simple return under long-only equal weight with gross $1$, and under the proportional gross-one map.
:::solution
Long-only keeps only the first name: $w^{\mathrm{L}} = (1,0)$. The portfolio return is $0.02$.

The proportional map divides by $\abs{1}+\abs{-1} = 2$, so $w^{\mathrm{P}} = (1/2,-1/2)$. The portfolio return is

$$
\tfrac12\cdot 0.02 + \bigl(-\tfrac12\bigr)\cdot(-0.01) = 0.010 + 0.005 = 0.015.
$$

Same signals, same next returns, two portfolio returns. The second book is not "using the signal more completely" in a way that this chapter endorses. It is a different exposure: gross $1$, net $0$, instead of gross $1$, net $1$.
:::
:::

:::warning A sign is not a position
The slip is to read $s_i = 1$ as "hold the name" and $s_i = -1$ as "short the name", with no further arithmetic. That reading smuggles in a map: gross $1$ on a single name, or gross $1$ split in some unstated way across many names. [[#ex-two-maps]] is the counterexample. Write the active set, the gross budget and the normalisation in the same sentence as the signal.
:::

## A weight row in the open library

The open library separates weight-mode research from order-mode research. In weight mode the output of the rule is a target weight, not an order type. W01, "Daily SMA Trend", is one such rule: hold each sector ETF while the $50$-day average is above the $200$-day average, and rebalance daily. The comparison of the two averages is a signal in $\{0,1\}$ on each name. The map is long-or-cash, in the family of [[#alg-long-only]], with a gross that depends on how many names are on. Daily rebalance is a third choice. It is not implied by the averages. The reported path of that rule belongs to [[trend/moving-averages]] and is not repeated here. Naming the rule is not a suggestion to hold a sector ETF, or to rebalance every day.

What this chapter needs from that catalogue row is only the separation. A later reader who quotes a weight backtest is quoting a signal and a map and a rebalance clock. Dropping the map, or swapping it, produces a different experiment. [[backtesting/weights-versus-orders]] takes the same separation from the other side: an order is not a weight either.

:::remark Cash is a weight
A book that is "out of the market" still has a weight vector. In the toys here the residual earns $0$, so being flat contributes a factor $1$ to the compound product. That is a modelling choice, useful because it makes the arithmetic visible. It is not a description of any cash instrument. If the residual earned a non-zero rate, every flat period would multiply by that rate, and [[#ex-path-a]] would change. The specification has to say which rate it used.
:::

:::quiz
In [[#ex-one-period]], why is the proportional book's return $0.015$ rather than $0.02$?
- [ ] Because the second signal was ignored.
- [x] Because half the gross is short the second name, and that name's next return is negative, so the short contributes a positive $0.005$.
- [ ] Because weights are always divided by $4$.
- [ ] Because the long-only map is illegal at this clock.
:::solution
Both maps are legal: the signals are known before the next returns. The proportional weights are $(1/2,-1/2)$. The short half multiplies $-0.01$ and contributes $+0.005$. The long-only map never takes that term, because it sets the second weight to $0$ and puts the whole gross on the first name.
:::
:::

:::history
Markowitz's 1952 paper on portfolio selection put the decision on the weights. The mean and the variance of a portfolio are functions of the weight vector and of a mean vector and a covariance, not functions of an un-normalised score. Constraints — non-negative weights, a budget that adds to one — are part of that problem because they describe holdings a portfolio can actually have. The signal, if a later researcher has one, can be an input to a mean or a filter. It is not itself the holding. Nothing in that paper is a recommendation of a security, and this chapter does not borrow one.
:::

## Where this leads

[[portfolio/inverse-volatility-and-targets]] replaces equal weight among the names that are on with a map that uses a volatility estimate. The gross budget and the clock from this chapter stay in force: a reciprocal of volatility is still not a weight until it is normalised, and it still earns the next return. [[portfolio/long-only-and-neutral]] writes the feasible sets that [[#alg-long-only]] and [[#prop-proportional]] were sampling. The performance of whatever comes out is measured in [[performance/simple-and-log-returns]] and [[performance/volatility-and-drawdown]], not by the size of the signal.

:::summary
- A signal $s_{i,t}$ is known at $t$. A weight $w_{i,t}$ is a target fraction of net asset value. A map is what joins them.
- Gross exposure adds absolute weights. Net exposure adds weights with their signs. The two are equal only in special cases.
- Long-only equal weight keeps the names with signal $+1$, splits a stated gross equally, and drops the rest. The proportional map divides by the sum of absolute signals and keeps every sign.
- The same vector $(1,1,0,-1)$ becomes $(1/2,1/2,0,0)$ or $(1/3,1/3,0,-1/3)$ according to the map.
- Scores $(2,-1,1/2)$ become $(4/7,-2/7,1/7)$ or $(4/5,0,1/5)$ under those two conventions.
- The book earns $\sum_i w_{i,t} R_{i,t+1}$. Multiplying by the return that has already finished is a different, generally illegal, product.
- On Path A those two sign maps compound to $-0.028490$ and $-0.128145$. The signal did not determine which.
:::

## Exercises

:::exercise Gross of the proportional book {level=1 check="1"}
For $w = (1/3,1/3,0,-1/3)$, what is the gross exposure? (Enter the number.)
:::solution
Add the absolute values: $1/3+1/3+0+1/3 = 1$.
:::
:::

:::exercise Net of the proportional book {level=1 check="1/3"}
For the same vector $w = (1/3,1/3,0,-1/3)$, what is the net exposure? (Enter a fraction.)
:::solution
Add with signs: $1/3+1/3+0-1/3 = 1/3$. Gross can be $1$ while net is $1/3$, because the short cancels one of the longs in the net and joins them in the gross.
:::
:::

:::exercise Long-only weight on the large score {level=1 check="4/5"}
Scores are $(2,-1,1/2)$. Negatives are set to $0$, and the positive scores are renormalised to sum to $1$. What is the weight on the first name? (Enter a fraction.)
:::solution
The positive part is $(2,0,1/2)$ and sums to $5/2$. The first weight is $2/(5/2) = 4/5$.
:::
:::

:::exercise A mixed score, proportional {level=2 check="-1/4"}
Scores are $(4,-2,2)$. Use the proportional gross-one map. What is the weight on the second name? (Enter a fraction.)
:::solution
The sum of absolute scores is $4+2+2 = 8$. The second weight is $-2/8 = -1/4$. The first and third weights are each $4/8 = 1/2$ and $2/8 = 1/4$, and the absolute values sum to $1$.
:::
:::

:::exercise Cash as the residual {level=2 check="0.5"}
Risky weights are $(0.2,0.3)$, and the cash weight is whatever makes all weights, cash included, sum to $1$. Cash earns $0$ in this question. What is the cash weight? (Enter a decimal.)
:::solution
The risky weights sum to $0.5$, so the cash weight is $1 - 0.5 = 0.5$. The gross of the risky part is also $0.5$, because both risky weights are positive. Net of the whole vector, cash included, is $1$.
:::
:::

:::exercise One legal step {level=2 check="-1/35"}
Prices of one name are $100$, then $105$, then $102$. The long-only sign map sets the weight to $1$ after a positive simple return and to $0$ after a negative one, and the weight earns the next return. What is the portfolio's simple return over the only step it has a legal signal for? (Enter a fraction.)
:::solution
The first simple return is $105/100 - 1 = 0.05 > 0$, so the weight chosen then is $1$. It earns the next simple return, $102/105 - 1 = -3/105 = -1/35$. There is no earlier return to justify a weight on the first step, and there is no return after the last price. The answer $-1/35$ is the whole book, because cash is not used on that step and the weight is $1$.
:::
:::

:::exercise Four names, one period {level=3 check="7/300"}
Signals are $(1,0,-1,1)$. Next simple returns are $(0.02,\ 0.05,\ -0.04,\ 0.01)$. Use the proportional gross-one map, and cash earns nothing outside these names. What is the portfolio simple return? (Enter a fraction.)
:::hint
Divide the signal by the sum of its absolute values before multiplying by the next returns. The second signal is zero, so the second return does not enter.
:::
:::solution
The sum of absolute signals is $1+0+1+1 = 3$, so

$$
w = \bigl(\tfrac13,\ 0,\ -\tfrac13,\ \tfrac13\bigr).
$$

The portfolio return is

$$
\tfrac13\cdot 0.02 + 0\cdot 0.05 + \bigl(-\tfrac13\bigr)\cdot(-0.04) + \tfrac13\cdot 0.01 = \tfrac{0.02 + 0.04 + 0.01}{3} = \tfrac{0.07}{3} = \tfrac{7}{300}.
$$

The return $0.05$ is real and is unused, because the map set that weight to $0$. That is not look-ahead. It is the map.
:::
:::

:::exercise A gross budget below one {level=3 check="0.01"}
Three names have signals $(1,1,1)$. The map splits a gross budget of $0.6$ equally across them, and the cash weight $0.4$ earns $0$. The next simple returns are $0.10$, $-0.05$ and $0$. What is the portfolio simple return? (Enter a decimal.)
:::hint
Each risky weight is $0.6/3$. Multiply each by its next return and add. The cash term is zero.
:::
:::solution
Each risky weight is $0.6/3 = 0.2$. The portfolio return is

$$
0.2\cdot 0.10 + 0.2\cdot(-0.05) + 0.2\cdot 0 + 0.4\cdot 0 = 0.020 - 0.010 = 0.01.
$$

If the gross budget had been $1$, each weight would have been $1/3$ and the portfolio return would have been $0.10/3 - 0.05/3 = 1/60 \approx 0.016667$. Cutting the gross from $1$ to $0.6$ scales this particular return by $0.6$, because cash earns $0$. The scale is part of the map. It is not a suggestion to hold cash, and a non-zero cash return would have broken the simple scaling.
:::
:::
