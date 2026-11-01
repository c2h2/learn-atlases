A rise in price is a fact about the past. Whether the sign of that rise says anything about the next return is a separate sentence, and the trend hypothesis is that sentence written so it can fail. The version studied here is **time-series momentum**: the sign of an asset's own past return, taken over a stated horizon, is a hypothesis about the sign of that same asset's next return. It is not a rank among several assets, and it is not an instruction to hold anything.

Two published averages fix the horizon this course means when it talks about the historical claim. In 2012 Moskowitz, Ooi and Pedersen reported a positive relation between an asset's past 12-month return and its next return across equity-index, currency, commodity and bond futures. In 2017 Hurst, Ooi and Pedersen assembled a long futures history and argued that the average result was not an artefact of the most recent decades. Both are averages across markets and years. Neither is an exchange-traded product, and neither survives contact with a rule whose costs exceed it. What would count against the hypothesis is set out below, before any toy profit is computed.

The arithmetic uses Path A, the eight invented closes shared by the atlas:

$$
P = (100,\ 102,\ 101,\ 104,\ 103,\ 107,\ 106,\ 110),
$$

at sessions $t = 0, 1, \ldots, 7$. These are closes of a made-up series. Nothing was split and nothing paid a dividend, so there is no adjustment to argue about. The simple return is $R_t = P_t/P_{t-1} - 1$. In lowest terms,

$$
R = \Bigl(\frac{1}{50},\ -\frac{1}{102},\ \frac{3}{101},\ -\frac{1}{104},\ \frac{4}{103},\ -\frac{1}{107},\ \frac{2}{53}\Bigr),
$$

which to six decimals is $0.020000,\ -0.009804,\ 0.029703,\ -0.009615,\ 0.038835,\ -0.009346,\ 0.037736$. The signs alternate, beginning with a rise. The price still finishes at $110$, so the compound simple return from the first close to the last is $0.10$. A path can rise while every lagged one-day sign is wrong. That is the first thing the definitions have to make easy to say.

## A signal with a clock

:::definition Time-series momentum signal {#def-tsm}
Fix a lookback of $k \ge 1$ sessions and write the asset's own simple return over that lookback as $P_t/P_{t-k} - 1$, defined when $t \ge k$. The **time-series momentum signal** is

$$
s_t^{(k)} = \sgn\bigl(P_t/P_{t-k} - 1\bigr),
$$

where $\sgn(u) = 1$ if $u > 0$, $\sgn(u) = -1$ if $u < 0$, and $\sgn(0) = 0$. The case $k = 1$ is the sign of the latest one-session return. The historical claim cited above uses a 12-month own-return in place of this $k$, and then speaks about the next return. Those are different choices of $k$ and of the holding length. They share a shape and they are not the same hypothesis.
:::

The signal is a number in $\{-1, 0, +1\}$ known when the closes through $t$ are known. It is not yet a weight. A weight is a target fraction of net asset value, and an order is an instruction to a venue. Both need a further map. [[markets/systematic-question]] keeps those objects apart; this chapter only builds the signed input and the return it is allowed to multiply.

:::definition Legal signed profit {#def-legal}
A feature dated $t$ may use information available at $t$, including closes through $t$. The one-session profit attached to $s_t^{(k)}$ is the product $s_t^{(k)} R_{t+1}$, with the convention that the product is $0$ when the next return does not exist. The same-bar product $s_t^{(k)} R_t$ is not a profit of this signal. While $|s_t^{(k)}| = 1$ the account is treated, in the toys below, as fully long or fully short for that next session; while $s_t^{(k)} = 0$ it earns the cash return, taken to be $0$ unless a toy says otherwise. No cost is charged until a later chapter writes a cost down.
:::

The legal product is the one a decision at the close of $t$ can still earn. By the close of $t$, the move from $P_{t-1}$ to $P_t$ has already happened. Multiplying by it is a description of the past, not a holding. The full catalogue of look-ahead errors sits in [[backtesting/timing-costs-and-biases]]. Here a single contrast is enough, and it is computed in [[#ex-illegal]].

:::proposition Alternation makes every legal one-day sign lose {#prop-alt}
Suppose $R_t \ne 0$ at every session where the return exists, and the signs strictly alternate: $\sgn(R_{t+1}) = -\sgn(R_t)$ whenever both returns exist. Let $s_t = \sgn(R_t)$, the signal [[#def-tsm]] with $k = 1$. Then

$$
s_t R_{t+1} = -\lvert R_{t+1}\rvert < 0
$$

for every $t$ that has a next return.
:::

:::proof
Strict alternation gives $\sgn(R_{t+1}) = -\sgn(R_t)$. Because $R_{t+1} \ne 0$,

$$
R_{t+1} = \sgn(R_{t+1})\,\lvert R_{t+1}\rvert = -\sgn(R_t)\,\lvert R_{t+1}\rvert.
$$

Multiply by $s_t = \sgn(R_t)$. The product of a sign with itself is $1$, so $s_t R_{t+1} = -\lvert R_{t+1}\rvert$, which is strictly negative.
:::

Path A meets the assumptions from $R_1$ through $R_7$: no return is zero, and the signs are $+,-,+,-,+,-,+$. [[#prop-alt]] therefore applies to each of the six products $s_t R_{t+1}$ with $t = 1,\ldots,6$. The conclusion is about this path and this $k$. It is not a remark about futures, and it is not a remark about $k$ equal to twelve months.

:::quiz
On Path A, $R_1 = 0.020000$ and $R_2 = -0.009804$. Which product is the legal one-session profit of the signal $s_1 = \sgn(R_1)$?
- [ ] $s_1 R_1$, because the signal and the return share an index
- [x] $s_1 R_2$
- [ ] $R_1 + R_2$, because a trend is a sum of returns
- [ ] $s_2 R_1$, because the later sign is the one that "confirms" the move
:::solution
[[#def-legal]] multiplies a signal dated $t$ by the return that comes after $t$. Here $t = 1$, so the profit is $s_1 R_2$. The product $s_1 R_1$ uses a move that was already finished when $s_1$ became known.
:::
:::

## What would count against the hypothesis

A hypothesis that cannot fail is a slogan. Two failures are enough, and either one is enough on its own.

- The sign relation disappears out of sample. The horizon, the asset class and the statistic have to be named first: for example the mean of $s_t^{(k)} R_{t+1}$ on a later stretch of the same class of futures, with the $k$ that was stated in advance. If that mean sits on the other side of zero, the historical average has not travelled.
- Costs exceed the gross relation. If the mean of $s_t^{(k)} R_{t+1}$ is positive and the turnover required to hold $s_t^{(k)}$ costs more than that mean, the sign can be real and the traded rule still a loss. [[trend/lag-whipsaw-and-costs]] writes the cost factor. A loss after a stated cost is evidence about that rule, not an invitation to take the opposite sign.

A third failure mode is quieter. If $k$ was chosen after scanning many lookbacks, the scan is part of the experiment. [[statistics/testing-and-snooping]] and [[validation/parameter-search]] treat that search. A clean definition does not undo it.

Path A cannot carry out any of these tests. Eight closes contain no later sample, and a cost plugged into eight closes is a piece of arithmetic. The path is here so that the legal product, the horizon and the alternation result can be seen with fractions.

:::intuition Sign, not slope
The price on Path A goes from $100$ to $110$. Someone staring at the chart will call it an uptrend. The one-day signal does not ask whether the chart slopes up. It asks whether the last session's sign matches the next session's sign. On this path it never does. A 12-month own-return asks a third question, about a different window. Three questions, three different objects. Only one of them is [[#def-tsm]] at a stated $k$.
:::

Cross-sectional momentum is yet another question: it ranks several assets by their past returns and holds the winners against the losers. A positive rank relation would not confirm [[#def-tsm]], and a failure of the rank relation would not refute it. The split is the subject of [[momentum/two-kinds-of-momentum]]. Short-horizon negative autocorrelation in individual stocks, the reversion hypothesis, is a claim at the other end of the lag; [[reversion/the-reversion-hypothesis]] keeps that horizon away from the 12-month futures average. Mixing them produces a sentence no sample can answer.

## The one-day rule on Path A

Let $s_t = \sgn(R_t)$. The position held over the next session is $s_t$, and the profit is $s_t R_{t+1}$. There is no position during $R_1$, because $R_1$ is the first return and the signal that could have earned it would have needed a close before $t = 0$.

:::example Legal positions on Path A {#ex-sign-path}
For each $t = 1,\ldots,6$, write $s_t$ and the legal profit $s_t R_{t+1}$, using the six-decimal returns of Path A.
:::solution
The signs of $R_1,\ldots,R_6$ are $+,-,+,-,+,-$. Alternation, from [[#prop-alt]], forces every profit to be the next return with its sign flipped, which on this path means the negative of a positive number.

| $t$ | $s_t$ | next return | profit $s_t R_{t+1}$ |
|---|---|---|---|
| $1$ | $+1$ | $-0.009804$ | $-0.009804$ |
| $2$ | $-1$ | $0.029703$ | $-0.029703$ |
| $3$ | $+1$ | $-0.009615$ | $-0.009615$ |
| $4$ | $-1$ | $0.038835$ | $-0.038835$ |
| $5$ | $+1$ | $-0.009346$ | $-0.009346$ |
| $6$ | $-1$ | $0.037736$ | $-0.037736$ |

No profit is positive. The position is long into every down session and short into every up session. That is the table [[#prop-alt]] promised, not a market result.
:::
:::

Wealth in these toys starts at $1$ and multiplies by $1 + s_t R_{t+1}$ at each step, which is [[#def-legal]] together with a cash return of $0$ and no costs. The **compound return** over the steps is that growth factor minus one. Adding the six profits in the table gives $-0.135039$ to six decimals, which is not the compound return. Simple returns do not add across time; [[performance/simple-and-log-returns]] is the chapter for that warning. The next example multiplies.

:::example Three compound returns from one sign {#ex-compound-sign}
Using exact fractions on Path A, compute the compound return of (i) the legal long/short rule $s_t = \sgn(R_t)$, (ii) the legal long/flat rule that is long only when $R_t > 0$ and otherwise in cash at return $0$, and (iii) do not annualise either number.
:::solution
(i) The six growth factors are $1 + s_t R_{t+1}$:

$$
\frac{101}{102},\quad \frac{98}{101},\quad \frac{103}{104},\quad \frac{99}{103},\quad \frac{106}{107},\quad \frac{51}{53}.
$$

The first is $1 + R_2$. The second is $1 - R_3 = 1 - 3/101$. The pattern continues, once from [[#ex-sign-path]]. Cancel $101$, then $103$:

$$
\frac{98}{102}\cdot\frac{99}{104}\cdot\frac{106}{107}\cdot\frac{51}{53} = \frac{49}{51}\cdot\frac{99}{104}\cdot\frac{106}{107}\cdot\frac{51}{53} = \frac{49\cdot 99}{52\cdot 107} = \frac{4851}{5564}.
$$

The compound return is $4851/5564 - 1 = -713/5564 = -0.128145$ to six decimals.

(ii) The long/flat rule keeps only the factors where $s_t = +1$, and replaces the short steps by $1$. Those three factors are $101/102$, $103/104$ and $106/107$. The product is $1102718/1135056 = 551359/567528$, and the compound return is $-16169/567528 = -0.028490$ to six decimals. The rule is long precisely into $R_2$, $R_4$ and $R_6$, the three down sessions, and flat on the up sessions. Dropping the shorts makes the loss smaller. It does not make it a gain. Cash at return $0$ cannot repair a long position that is held only on down sessions.

(iii) There are six steps, not $252$. Multiplying $-0.128145$ by $\sqrt{252}$ would dress a toy as an annual Sharpe. [[performance/uncertainty-of-performance]] explains why a handful of observations cannot support that. The risk-free rate in this example is $0$, because cash was defined to earn $0$; the ratios above are compound returns, not Sharpes.
:::
:::

:::example The same-bar product on the same path {#ex-illegal}
Replace the legal profit by $s_t R_t = \lvert R_t\rvert$ for $t = 1,\ldots,7$, and compute the compound return. Say why the number is not comparable to [[#ex-compound-sign]] as a holding.
:::solution
Each factor is $1 + \lvert R_t\rvert$:

$$
\frac{51}{50},\ \frac{103}{102},\ \frac{104}{101},\ \frac{105}{104},\ \frac{107}{103},\ \frac{108}{107},\ \frac{55}{53}.
$$

Cancel $104$, $103$ and $107$, then $51$ against $102 = 2\cdot 51$, then $55$ against $50 = 2\cdot 25$ and $105$ against the remaining $5$:

$$
\frac{21\cdot 27\cdot 11}{101\cdot 53} = \frac{6237}{5353}.
$$

The compound return is $884/5353 = 0.165141$ to six decimals. Every factor exceeds $1$ because the rule multiplies each return by its own sign. A decision that knows $R_t$ already knows $P_t$, so the move inside $R_t$ is no longer available to earn. The legal compound return in [[#ex-compound-sign]] is negative and the illegal one is positive. The gap is the clock. It is not evidence for or against a 12-month futures average, and it is not a cost.
:::
:::

:::example Changing the lookback to two sessions {#ex-two-day}
Keep Path A. Let $s_t^{(2)} = \sgn(P_t/P_{t-2} - 1)$ for $t = 2,\ldots,6$, and hold that signal over the next session. Compute each past two-session return and the compound return of the legal long/short rule.
:::solution
The two-session returns are

$$
\begin{align*}
t = 2&\colon P_2/P_0 - 1 = 1/100 = 0.010000,\\
t = 3&\colon P_3/P_1 - 1 = 1/51 \approx 0.019608,\\
t = 4&\colon P_4/P_2 - 1 = 2/101 \approx 0.019802,\\
t = 5&\colon P_5/P_3 - 1 = 3/104 \approx 0.028846,\\
t = 6&\colon P_6/P_4 - 1 = 3/103 \approx 0.029126.
\end{align*}
$$

Every one is positive, so $s_t^{(2)} = +1$ at each of these five dates. The rule earns $R_3,\ldots,R_7$ and nothing else. The growth factor telescopes:

$$
\frac{104}{101}\cdot\frac{103}{104}\cdot\frac{107}{103}\cdot\frac{106}{107}\cdot\frac{110}{106} = \frac{110}{101}.
$$

The compound return is $9/101 = 0.089109$ to six decimals. Moving from $k = 1$ to $k = 2$ flipped the rule from "short every up session" to "long the whole way from session $2$ to session $7$". The definition did not change its shape. The horizon did the work. Five positive two-session returns on eight closes are a fact about this list of numbers, not a reason to prefer a two-day rule, and not a test of the 12-month lookback in the 2012 paper.
:::
:::

:::warning An alternating toy is not a refutation
[[#prop-alt]] says that a strictly alternating path makes the one-day legal sign lose on every step. Path A is such a path, and it was chosen as a shared numerical example, not as a sample from a futures market. Using it to retire a 12-month average, or using a 12-month average to decorate a one-day equity rule, answers neither hypothesis. The failures that count are the two named above: the stated sign relation fails on a later sample, or the costs of holding it exceed the gross mean.
:::

A monotone path shows the other side of the same definition, so that "sign rules lose" does not harden into folklore.

:::example A path that does not alternate {#ex-monotone}
Closes $100, 101, 103, 106$. Apply the legal long/short rule with $k = 1$. Report the positions and the compound return.
:::solution
The returns are $1/100$, $2/101$ and $3/103$, all positive. Signals at $t = 1$ and $t = 2$ are therefore $+1$. The rule earns the second and third returns only. The growth factor is

$$
\frac{103}{101}\cdot\frac{106}{103} = \frac{106}{101},
$$

and the compound return is $5/101 = 0.049505$ to six decimals. The first return is not earned, for the same clock reason as on Path A. The rule made money here because the path did not alternate. [[#prop-alt]] does not apply, and nothing in the definition says it should.
:::
:::

:::quiz
Which observation would count against the time-series momentum hypothesis, as that hypothesis was stated in this chapter?
- [ ] Path A's one-day legal profits are all negative
- [ ] A chart of Path A slopes up from $100$ to $110$
- [x] On a later sample of the futures markets named in the claim, with the lookback fixed in advance, the mean of $s_t R_{t+1}$ is negative, or the gross mean is smaller than the stated costs of holding $s_t$
- [ ] A moving-average rule on equity funds has a modest reported Sharpe
:::solution
The hypothesis is about a stated sign relation for an own-return, historically a 12-month futures own-return. Path A is an illustration of the clock. A moving-average backtest is a different experiment, taken up in [[trend/moving-averages]]. The relation fails if it is absent out of sample or if costs eat it.
:::
:::

:::widget plot
f: 100+0.35*x+2*sin(x); 100+0.35*x
x: 0, 24
labels: path with turns; straight drift
caption: The straight line keeps rising. The sine puts a turn in every few units of x. A one-step sign of the wiggle is not the slope of the line, and neither curve is a forecast.
:::

:::remark Correlation is the population version of the same sign
[[statistics/moments-and-dependence]] defines lag-1 autocorrelation. A positive autocorrelation is the statistical shadow of "the last sign agrees with the next"; a negative one is the shadow of alternation. Path A has only six adjacent pairs, which is why this chapter argues from the signs themselves rather than from a correlation rounded to two decimals. The estimate would be noisy even if the sign were obvious. Negative lag-1 autocorrelation and a positive 12-month relation can both be true, because they are different lags. The reversion course starts from the short lag. This course does not.

The open library's equity-fund rules, which the next chapters quote, are not estimates of that 12-month futures relation. They are specific moving-average, channel and filter experiments. Reading one as confirmation of the other skips the horizon and the instrument.
:::

:::history Futures averages, not a product
In 2012 Moskowitz, Ooi and Pedersen documented a positive relation between an asset's past 12-month return and its next return across equity-index, currency, commodity and bond futures. In 2017 Hurst, Ooi and Pedersen assembled a long futures history and argued that trend-following's average result was not an artefact of the most recent decades. The course record is explicit that the second result is an average across markets and years, not a promise about a single exchange-traded rule. This chapter uses those two statements as the historical form of [[#def-tsm]], and uses Path A only to fix the clock.
:::

## Where this leads

The next chapter turns the sign into a smoother. A moving-average cross is still a claim about persistence, but the feature is no longer $\sgn(R_t)$; [[trend/moving-averages]] writes the averages and then refuses to talk about "the" moving-average backtest. The dependence that would make $s_t R_{t+1}$ positive in expectation is [[statistics/moments-and-dependence]]. The performance arithmetic used above, compound return against a sum of simple returns, is [[performance/simple-and-log-returns]].

:::summary
- Time-series momentum is a hypothesis about the sign of an asset's own next return given the sign of its own past return, at a horizon you have to name.
- The 2012 and 2017 futures averages used here are historical averages across many markets, not an exchange-traded product and not a holding.
- The legal profit of a signal dated $t$ is $s_t R_{t+1}$. The product $s_t R_t$ looks better on Path A precisely because it is not a holding.
- If one-session returns strictly alternate, every legal one-day signed profit is negative. Path A alternates; the long/short compound return is $-0.128145$.
- The same definition with a two-session lookback is long on Path A and compounds to $0.089109$. Horizon is part of the claim.
- The hypothesis fails if that sign relation is absent out of sample, or if the costs of holding the signal exceed the gross mean. Eight closes can illustrate neither test.
:::

## Exercises

:::exercise Sign of one Path A return {level=1 check="-1"}
The close goes from $102$ to $101$. What is $\sgn(R_t)$ for that session? Enter $-1$, $0$ or $1$.
:::solution
$R = 101/102 - 1 = -1/102 < 0$, so the sign is $-1$.
:::
:::

:::exercise One legal profit {level=1 check="-0.009804"}
Take $s_t = +1$ and let the next simple return be the Path A figure $-0.009804$. Enter the legal profit to six decimals.
:::solution
[[#def-legal]] multiplies the signal by the next return: $(+1)\times(-0.009804) = -0.009804$.
:::
:::

:::exercise How many legal profits are positive? {level=1 check="0"}
On Path A, with $k = 1$, how many of the six legal long/short profits are strictly positive? Enter an integer.
:::solution
[[#prop-alt]] applies, and [[#ex-sign-path]] lists the six profits. Each is negative. The count is $0$.
:::
:::

:::exercise Long/short compound return {level=2 check="-0.128145"}
Enter the compound return of the legal long/short one-day rule on Path A, to six decimals, as computed in [[#ex-compound-sign]].
:::solution
The growth factor reduces to $4851/5564$. Subtracting $1$ gives $-713/5564 = -0.128145$ to six decimals.
:::
:::

:::exercise A short monotone path {level=2 check="0.049505"}
Closes are $100, 101, 103, 106$. Enter the compound return of the legal long/short rule with $k = 1$, to six decimals.
:::solution
Both signals that have a next return are $+1$. The growth factor is $(103/101)\cdot(106/103) = 106/101$. The compound return is $5/101 = 0.049505$ to six decimals. The opening return $1/100$ is not earned.
:::
:::

:::exercise Two different failures {level=2}
Name the two outcomes, stated in this chapter, that would count against the time-series momentum hypothesis. Do not use Path A's one-day losses as one of them.
:::solution
First, the sign relation disappears out of sample: with the horizon and the asset class fixed in advance, the mean of the legal product on a later sample is not positive. Second, costs exceed the gross relation: the mean of $s_t R_{t+1}$ may be positive and still smaller than the cost of holding $s_t$. Path A is an illustration of the legal product under alternation. It is not an out-of-sample test of the 12-month futures claim.
:::
:::

:::exercise Growth under alternation {level=3}
Suppose returns strictly alternate and none is zero, as in [[#prop-alt]]. Show that the legal long/short growth factor over the steps that have a next return equals $\prod (1 - \lvert R_{t+1}\rvert)$, and hence is strictly less than $1$ whenever at least one such return is present. Then check the identity on Path A by reducing the product.
:::hint
Replace each profit by $-\lvert R_{t+1}\rvert$ before you write the factor $1 + \text{profit}$. On Path A the six factors are already listed in [[#ex-compound-sign]].
:::
:::solution
By [[#prop-alt]], each legal profit equals $-\lvert R_{t+1}\rvert$, so each growth factor is $1 - \lvert R_{t+1}\rvert$. Every factor is strictly less than $1$, and all are positive if each simple return is greater than $-1$, which it is when prices stay positive. A product of numbers in $(0, 1)$ is strictly less than $1$. On Path A the product was reduced in [[#ex-compound-sign]] to $4851/5564 < 1$, compound return $-0.128145$.
:::
:::

:::exercise Why the same-bar rule compounds above zero {level=3}
Show that the same-bar long/short growth factor on a path with no zero returns equals $\prod_t (1 + \lvert R_t\rvert)$, and explain in two sentences why that identity makes the rule unusable as a holding even before costs. Use Path A's reduced value $6237/5353$ as the check on the algebra, not as a performance summary.
:::hint
$s_t = \sgn(R_t)$ multiplies $R_t$ to give the absolute value. Then ask whether $R_t$ is still in the future at the moment $s_t$ is known.
:::
:::solution
If $R_t \ne 0$, then $\sgn(R_t)\, R_t = \lvert R_t\rvert$, so the growth factor is $\prod (1 + \lvert R_t\rvert)$. Each term is at least $1$, and one strict inequality anywhere makes the product strictly greater than $1$. On Path A the product reduces to $6237/5353$, compound return $0.165141$ to six decimals, as in [[#ex-illegal]]. The identity is unusable as a holding because $R_t$ depends on $P_t$ and $P_{t-1}$. When the close $P_t$ is known, that return has already been realised. A rule that earns $\lvert R_t\rvert$ is marking the past with a sign, which any path will reward.
:::
:::
