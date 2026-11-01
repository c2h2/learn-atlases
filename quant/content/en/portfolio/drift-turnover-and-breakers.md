A target weight is a decision at time $t$. Prices then move, and the weight the book actually has is no longer the target, even though nobody has traded. That gap is drift. A research rule can ignore it and trade on a calendar, trade only when the gap exceeds a band, trade only inside a turnover budget, trade only when a tracking error to a benchmark is large enough, or throw the weights away entirely after a drawdown. Each of those is a constraint on the trade. None of them is a property of the signal that produced the target.

A shallower drawdown on a toy path is a property of a rule, not a reason to install the rule. The same warning covers every catalogue row below.

## Drift

Take one risky sleeve with weight $w$ and a cash sleeve with weight $1-w$. The risky sleeve earns simple return $R$. Cash earns $0$. No trade happens. The new risky weight is not $w$.

:::definition Drifted weight {#def-drift}
Under those assumptions the **drifted weight** is

$$
w' = \frac{w(1+R)}{1 + w R}.
$$

The cash weight drifts to $1-w'$. The distance that a rule can see without a new signal is $\abs{w' - w^\star}$, where $w^\star$ is the target. The target may still be $w$, or a new signal may have changed it.
:::

:::proposition Where the formula comes from {#prop-drift}
Assume the risky sleeve starts as a fraction $w$ of net asset value, cash starts as $1-w$ and earns simple return $0$, the risky simple return over the step is $R > -1$, and nothing is traded. Then the risky fraction at the end of the step is $w(1+R)/(1+wR)$. If $R > 0$ and $0 < w < 1$, the risky weight rises. If $-1 < R < 0$, it falls.
:::

:::proof
Let the risky position be worth $V$ and cash be worth $C$, with $w = V/(V+C)$ and $C/V = (1-w)/w$. After the step the risky position is worth $V(1+R)$ and cash is still worth $C$. The new weight is

$$
w' = \frac{V(1+R)}{V(1+R)+C} = \frac{w(1+R)}{w(1+R) + (1-w)} = \frac{w(1+R)}{1+wR}.
$$

The denominator is positive because $R > -1$ and $w \le 1$ in this fully funded setup; more carefully, $1+wR = (1-w) + w(1+R) > 0$. Compare $w'$ with $w$:

$$
w' - w = \frac{w(1+R) - w(1+wR)}{1+wR} = \frac{w(1-w)R}{1+wR}.
$$

If $0 < w < 1$, the fraction $w(1-w)/(1+wR)$ is positive, so $w'-w$ has the same sign as $R$.
:::

The formula is the whole mechanism. A winner that is not cut back becomes a larger fraction of the book. A loser that is not topped up becomes a smaller one. Neither fact tells the researcher to trade. It tells the researcher what the weight is if they do not.

:::example From $0.40$ to $0.47$ {#ex-drift}
The risky weight starts at $0.40$, cash earns $0$, and the risky simple return is $35/106$. Compute the drifted weight. A band of $b = 0.10$ trades only when the distance from the drifted weight to the target $0.40$ is strictly greater than $0.10$. Does this step trade? Would a band of $0.05$ trade?
:::solution
[[#prop-drift]] gives

$$
w' = \frac{0.40\bigl(1 + 35/106\bigr)}{1 + 0.40\cdot(35/106)}.
$$

Since $1 + 35/106 = 141/106$ and $0.40 = 2/5$,

$$
w' = \frac{(2/5)\cdot(141/106)}{1 + (2/5)\cdot(35/106)} = \frac{282/530}{600/530} = \frac{282}{600} = 0.47.
$$

In units of account: risky value $40$ grows by the factor $141/106$ to $2820/53$, cash stays $60$, and $2820/53$ over $6000/53$ is $0.47$.

The distance is $\abs{0.47 - 0.40} = 0.07$. This is not strictly greater than $0.10$, so the band of $0.10$ does not trade. It is strictly greater than $0.05$, so a band of $0.05$ does trade. The signal never entered. The same drifted weight is inside one band and outside another because the bands are different parameters.

A month-end rule that always restores $0.40$ would trade on this step even though $0.07 < 0.10$. Calendar rebalance and a drift band are different constraints. [[momentum/rotation-and-calendars]] makes that comparison for a different gap, from $0.50$ to $0.62$. The arithmetic here is the one this chapter owns.
:::
:::

:::definition Drift band {#def-band}
Given a target $w^\star$, a current weight $w^{\mathrm{cur}}$ after drift, and a threshold $b \ge 0$, a **drift band** trades towards $w^\star$ only when

$$
\abs{w^{\mathrm{cur}} - w^\star} > b,
$$

and otherwise leaves the book unchanged. The threshold is in weight units, not a percentage of the weight. A band of $0.10$ around $0.40$ runs from $0.30$ to $0.50$. It is not the interval from $0.40\times 0.90$ to $0.40\times 1.10$, which would be $0.36$ to $0.44$.
:::

The figure compounds a constant risky return of $2\%$ a step, starting from weight $0.40$, with cash earning $0$ and with no trades. It is the closed form of [[#prop-drift]] iterated, $w(1.02)^n\big/\bigl(w(1.02)^n + 1 - w\bigr)$, not a market path.

:::widget sequence
a: 0.40*(1.02)^n/(0.40*(1.02)^n+0.60)
mode: terms
N: 40
caption: Drift of a sleeve that starts at weight $0.40$ and earns $2\%$ a step, while cash earns $0$ and nobody trades. The weight passes $0.50$ between steps $20$ and $21$. A band of $0.10$ around $0.40$ is the interval from $0.30$ to $0.50$, so that crossing is the first step on which this particular band would trade. The curve is the drift formula, not a rule this atlas is recommending.
:::

## Turnover and tracking error

When a band, a calendar or a new signal calls for a move from $w^{\mathrm{cur}}$ towards $w^\star$, the move itself may be capped.

:::definition Turnover budget {#def-turnover}
The **turnover** of a change from $w^{\mathrm{cur}}$ to a candidate $w^{\mathrm{new}}$, in the convention of this chapter, is

$$
\tau(w^{\mathrm{new}}, w^{\mathrm{cur}}) = \sum_i \abs{w^{\mathrm{new}}_i - w^{\mathrm{cur}}_i}.
$$

A **turnover budget** $\tau_{\max}$ allows the change only if that sum is at most $\tau_{\max}$. If the full step to $w^\star$ exceeds the budget, the implemented weights are

$$
w^{\mathrm{new}} = w^{\mathrm{cur}} + \lambda(w^\star - w^{\mathrm{cur}}), \qquad \lambda = \min\Bigl(1,\ \frac{\tau_{\max}}{\tau(w^\star, w^{\mathrm{cur}})}\Bigr),
$$

provided $\tau(w^\star, w^{\mathrm{cur}}) > 0$. This convention counts both sides of a funded trade. Some authors divide by $2$. A specification that says "turnover" without the formula has not said which convention it used. Costs, when they are charged, are charged on the turnover the convention defines; [[trend/lag-whipsaw-and-costs]] is where a per-unit cost enters the compound return.
:::

:::proposition Two sleeves, both sides {#prop-two-turn}
If the book is one risky weight and one cash weight, the two weights both change by the same absolute amount when the risky weight moves by $\delta$. The turnover in [[#def-turnover]] is $2\abs{\delta}$.
:::

:::proof
Cash changes by $-\delta$ so that the weights still sum to $1$. The sum of absolute changes is $\abs{\delta} + \abs{-\delta} = 2\abs{\delta}$.
:::

:::example A budget that does not finish the job {#ex-budget}
The drifted weight is $0.47$ and the target is $0.40$, as in [[#ex-drift]]. Cash is the other sleeve. Compute the turnover of the full restoration. Then apply a turnover budget of $0.10$ and report the implemented risky weight.
:::solution
The full change in the risky weight is $\delta = 0.40 - 0.47 = -0.07$. By [[#prop-two-turn]] the turnover is $2\times 0.07 = 0.14$.

The budget $0.10$ is smaller than $0.14$, so $\lambda = 0.10/0.14 = 5/7$. The implemented change is $(5/7)\cdot(-0.07) = -0.05$. The new risky weight is $0.47 - 0.05 = 0.42$, and cash is $0.58$. The turnover actually used is $2\times 0.05 = 0.10$, which meets the budget and does not reach the target. A later step may move the rest, or the target may have moved again by then. The budget is a constraint on this trade, not a statement that $0.42$ is a good weight.
:::
:::

Tracking error needs a benchmark that the signal does not provide.

:::definition Ex-ante tracking error {#def-te}
Let $w$ be the book's weights, $w^{b}$ a benchmark's weights, and $\Sigma$ a covariance fixed at the decision time. The **ex-ante tracking error** is

$$
\mathrm{TE}(w, w^{b}) = \sqrt{(w - w^{b})^{\mathsf T}\Sigma(w - w^{b})}.
$$

A **tracking-error gate** allows a trade only when this number exceeds a stated threshold, or only when the trade would otherwise leave it above the threshold. Either rule is a constraint on the trade. The square root is not the standard deviation of a sample of realised active returns; that realised number is a different object, related to the information ratio in [[performance/sharpe-and-its-relatives]].
:::

For one risky name, benchmark weight $w^{b}$, book weight $w$, volatility $\sigma$, and cash with volatility $0$, the quadratic form collapses.

:::example One name against a benchmark {#ex-te}
The risky weight has drifted to $0.47$. The benchmark weight is $0.50$. The risky volatility is $0.20$ and cash volatility is $0$. Compute the ex-ante tracking error. A gate that trades only when the tracking error exceeds $0.01$ — does this book trade?
:::solution
The active risky weight is $0.47 - 0.50 = -0.03$. The active cash weight is the negative of that, and cash adds no variance. So

$$
\mathrm{TE} = \abs{-0.03}\cdot 0.20 = 0.006.
$$

Since $0.006$ is not greater than $0.01$, the gate does not trade. The distance to the signal target of [[#ex-drift]], which was $0.07$ from $0.40$, is a different comparison. A gate can be closed while a band around the signal target is open, because the benchmark and the signal target are different vectors. The threshold $0.01$ is part of the example's specification. It is not a recommended trigger.
:::
:::

## A drawdown that sets the weights to cash

Drift, bands, budgets and gates modify a trade towards a target. A circuit breaker replaces the target.

:::definition Circuit breaker {#def-breaker}
Let $V_t$ be the book's net asset value and let $P^\star_t = \max\{P^\star_{t-1}, V_t\}$ be the running peak, with $P^\star$ started at the first value. The drawdown is $D_t = V_t/P^\star_t - 1$. A **circuit breaker** with threshold $d \in (0,1)$ and cooldown $H$ acts as follows. If $D_t < -d$ — the drawdown is strictly deeper than $d$ — the weights for the next $H$ decision intervals are set to cash. During the cooldown the book earns the cash return, which is $0$ in the example below. The bar that first crosses the threshold is still earned at the old weights: the breach is known only once that return has happened. After the cooldown the signal weights may be used again. Whether the peak is reset is part of the specification; the example ends inside the cooldown, so a reset is not used.
:::

"Exceeds $d$" is the strict inequality. Landing exactly on $D = -d$ does not trigger this definition. A gap can jump from a drawdown shallower than $d$ to one much deeper, because the check happens at bar ends.

:::example The same path, with and without the breaker {#ex-path}
Net asset value of the always-invested book, in units of account, is

$$
100,\ 110,\ 99,\ 88,\ 70,\ 98.
$$

The peak is $110$. A breaker uses $d = 0.15$ and a cooldown of two periods after the first bar that finishes strictly more than $15\%$ below the peak. Cash earns $0$. Compute both terminal wealths, and both maximum drawdowns.
:::solution
Drawdowns of the always-invested path from the running peak: $100$ and $110$ are peaks, drawdown $0$. Then $99/110 - 1 = -0.10$, which is not strictly below $-0.15$. Then $88/110 - 1 = -0.20$, which is strictly below $-0.15$. The crossing bar is earned in full: wealth is $88$ before the breaker does anything. The cooldown covers the next two moves of the asset, from $88$ to $70$ and from $70$ to $98$, if one were still invested.

With the breaker, wealth stays at $88$ through the cooldown. Terminal wealth is $88$. The path of wealth is $100, 110, 99, 88, 88, 88$. The maximum drawdown is $88/110 - 1 = -1/5 = -0.20$.

Without the breaker, terminal wealth is $98$. The trough is $70$, and the maximum drawdown is $70/110 - 1 = -4/11 \approx -0.363636$.

On this path the breaker makes the maximum drawdown shallower, $-0.20$ instead of $-4/11$, and it makes terminal wealth lower, $88$ instead of $98$. It skipped both the further fall and the rebound. That is what a cooldown to cash does. It is not a result in favour of the breaker or against it.

If the asset path had stopped at $70$, with no rebound, the same trigger would have left the breaker at $88$ and the invested book at $70$. The wealth ranking would have flipped, and the drawdown ranking would still have favoured the breaker. The sign of the wealth gap is path-dependent. One toy does not select a policy. The simple returns along the invested path are $0.10$, $-0.10$, $-1/9$, $-9/44$ and $0.40$, from the price ratios $110/100$, $99/110$, $88/99$, $70/88$ and $98/70$. The compound from $100$ to $98$ is $-0.02$. The compound from $100$ to $88$ is $-0.12$.
:::
:::

:::warning The threshold is not the realised drawdown
The breaker is specified at $15\%$, and the toy's realised drawdown on the trigger bar is $20\%$. Checking only at bar ends allows an overshoot. The other direction also occurs in published summaries: a reported maximum drawdown can be a smaller number than the threshold written in the rule, because the two percentages need not be the same object. Do not "correct" a catalogue cell so that it matches the threshold in the rule's name.
:::

## Four catalogue rows

The figures in this section are **as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026**. This atlas has **not** re-run the backtests. Reported Sharpes are theirs, not the per-step ratio of [[performance/sharpe-and-its-relatives]].

W02, "Monthly Drift ETF", is an SMA$(50/200)$ trend on ETFs, at month-end, with a $5\%$ drift band. Multi-asset, daily bars, $19$ years. Reported total return $+138\%$, CAGR $+4.66\%$, Sharpe $0.31$, maximum drawdown $-19.4\%$, win rate $63.5\%$, profit factor $1.73$. The band is five percentage points of weight, in the sense of [[#def-band]], if the implementation matches the ordinary reading of that phrase. The row does not print the code. Month-end plus a band is two constraints: the calendar can refuse to look, and the band can refuse to trade when it does look. W02 is not "the" moving-average result. The signal is shared with other rows; the trade constraint is not.

W12, "Daily Partial Drift", is a momentum tilt that trades only names past a $10\%$ drift band. Daily bars, $26$ years. Reported total return $+269\%$, CAGR $+5.15\%$, Sharpe $0.30$, maximum drawdown $-36.8\%$, win rate $68.2\%$, profit factor $1.62$. A $10\%$ band leaves the gap in [[#ex-drift]] untraded, because $0.07$ is not greater than $0.10$. The same gap would trade under W02's $5\%$ band if the target and the drift were those of the example, which they are not: W02 and W12 are different universes, different spans and different signals. The comparison that is legitimate is only that $0.05$ and $0.10$ are different thresholds, and [[#ex-drift]] shows a gap that sits between them.

W11, "Quarterly TE Cost Gate", is momentum with a tracking-error trigger and a turnover budget. Daily bars, $19$ years. Reported total return $+266\%$, CAGR $+7.07\%$, Sharpe $0.44$, maximum drawdown $-25.5\%$, win rate $66.4\%$, profit factor $2.67$. Both objects in the name are constraints on the trade, as in [[#def-te]] and [[#def-turnover]]. The dashboard does not print the tracking-error threshold or the budget. We do not invent them. The reported CAGR is not evidence that gates raise CAGR. It is the result of one specification on one sample.

W10, "Monthly Circuit Breaker", is a monthly ETF trend that flattens on a $15\%$ drawdown and then waits through a cooldown. Daily bars, $19$ years. Reported total return $+14.2\%$, CAGR $+0.70\%$, Sharpe $-0.45$, maximum drawdown $-10.6\%$, win rate $53.3\%$, profit factor $1.11$. Read the Sharpe and the drawdown together. The reported maximum drawdown, $-10.6\%$, is the shallower drawdown figure on this row, and the reported Sharpe is negative. The breaker did what a flatten-on-drawdown rule is specified to aim at — a path whose reported drawdown is not deep — and the reported Sharpe on that path is $-0.45$, with a CAGR of $+0.70\%$ over the $19$ years in the catalogue. A negative Sharpe next to a shallower drawdown is the point of the row. It is not a reason to add a breaker, and it is not a reason to take the other side of the trend rule. The toy in [[#ex-path]] is not this backtest. It only shows how a cooldown can cut a drawdown and give up terminal wealth on one stated path. We also do not force $-10.6\%$ to equal $15\%$. The threshold in the rule and the maximum drawdown in the dashboard are both reported; they are not automatically the same measurement.

:::intuition A constraint can dominate the signal
Two momentum rules that share a ranking formula and differ by a $10\%$ band, a turnover budget or a drawdown cooldown are two experiments. The signal column in a write-up is the part authors like to name. The constraint is often where the equity curve actually changes, because it decides which of the signal's trades are allowed to happen. When a published path looks surprisingly quiet, or surprisingly busy, the band and the breaker are among the first sentences to re-read. [[backtesting/reading-published-tests]] turns that habit into a checklist.
:::

:::history
Markowitz, in 1952, stated portfolio choice as an optimisation over weights subject to constraints the holder can actually live with: a budget, and often the refusal to go short. A variance formula that assumes the weights are reset whenever the inputs move is a different model from a rule that trades only past a band, only inside a turnover budget, or not at all during a cooldown. Drift bands and circuit breakers are later operational constraints. The 1952 paper does not contain them, and this chapter does not pretend that it does. The date matters because the weights, not the signal, are already the decision variable, and a constraint on the trade is a constraint on those weights through time.
:::

:::quiz
A risky weight drifts from $0.40$ to $0.47$, and the target is still $0.40$. Which band trades?
- [ ] A band of $0.10$, because $0.47$ is $17.5\%$ above $0.40$.
- [ ] Both a band of $0.10$ and a band of $0.05$, because any gap trades.
- [x] A band of $0.05$, but not a band of $0.10$, because the gap in weight units is $0.07$.
- [ ] Neither, because cash earned $0$.
:::solution
[[#def-band]] compares $\abs{0.47-0.40} = 0.07$ with $b$, in weight units. Then $0.07 > 0.05$, and $0.07$ is not greater than $0.10$. Multiplying $0.40$ by $17.5\%$ confuses a relative price move with a weight gap. The return that caused the drift was $35/106$, about $0.330$, which is a third object again.
:::
:::

:::quiz
In [[#ex-path]], what did the breaker change?
- [ ] It avoided the fall from $110$ to $88$, so the trigger bar was not felt.
- [x] It left terminal wealth at $88$ rather than $98$, and maximum drawdown at $-0.20$ rather than about $-0.3636$.
- [ ] It raised terminal wealth above the invested path, because drawdown rules repair losses.
- [ ] It set the drawdown to exactly $-15\%$.
:::solution
The bar that reaches $88$ is earned before the cooldown. Cash then skips the move to $70$ and the move to $98$. Terminal wealth falls relative to the invested path on this particular rebound, while the trough at $70$ is skipped, so the maximum drawdown is shallower. The realised trigger drawdown is $-20\%$, not $-15\%$, because the check is at bar ends.
:::
:::

## Where this leads

The bands and the breaker act on a weight vector that already lives in some feasible set. [[portfolio/long-only-and-neutral]] writes the long-only simplex and the neutral budgets those vectors are drawn from. A turnover budget is also a cost input: once $\sum_i\abs{\Delta w_i}$ is known, [[backtesting/timing-costs-and-biases]] can turn it into a drag, under a cost model that still has to be stated. The signal that produced $w^\star$ may be a trend weight or a momentum weight; either way the drift rule is a second map, stacked on the map in [[portfolio/from-signal-to-weight]].

:::summary
- If cash earns $0$ and nothing is traded, a risky weight $w$ becomes $w(1+R)/(1+wR)$. A positive return raises a weight that is strictly between $0$ and $1$.
- The step from $0.40$ with return $35/106$ ends at $0.47$. The gap $0.07$ is inside a band of $0.10$ and outside a band of $0.05$.
- A band of $0.10$ is ten percentage points of weight, not ten per cent of the weight.
- Turnover in this chapter adds absolute weight changes on every sleeve. Restoring $0.40$ from $0.47$ costs $0.14$ in that sum. A budget of $0.10$ stops at weight $0.42$.
- Ex-ante tracking error to a benchmark is $\sqrt{(w-w^b)^{\mathsf T}\Sigma(w-w^b)}$. In the one-name example it is $0.006$, and a gate at $0.01$ does not trade.
- A breaker sets weights to cash after a drawdown strictly deeper than $d$, for a cooldown. On the path $100,110,99,88,70,98$ the terminals are $88$ with the breaker and $98$ without, and the maximum drawdowns are $-0.20$ and $-4/11$.
- W10 reports Sharpe $-0.45$ next to maximum drawdown $-10.6\%$. The shallower drawdown figure and the negative reported Sharpe are the point of that breaker row, not a policy.
:::

## Exercises

:::exercise The gap in weight units {level=1 check="0.07"}
A weight drifts from $0.40$ to $0.47$ and the target stays $0.40$. What is the absolute gap? (Enter a decimal.)
:::solution
$\abs{0.47-0.40} = 0.07$. A band of $0.10$ does not see this as a trade. A band of $0.05$ does.
:::
:::

:::exercise Full two-sleeve turnover {level=1 check="0.14"}
The risky weight moves from $0.47$ to $0.40$ and cash takes the other side. Using the sum of absolute weight changes, what is the turnover? (Enter a decimal.)
:::solution
Each sleeve changes by $0.07$. The sum of absolute changes is $0.14$, which is $2\times 0.07$ by [[#prop-two-turn]].
:::
:::

:::exercise One-name tracking error {level=1 check="0.006"}
Book weight $0.47$, benchmark weight $0.50$, volatility $0.20$, cash volatility $0$. What is the ex-ante tracking error? (Enter a decimal.)
:::solution
$\mathrm{TE} = \abs{0.47-0.50}\times 0.20 = 0.006$. A gate at $0.01$ would not trade. The formula is the one-name collapse of [[#def-te]], not a sample standard deviation of past active returns.
:::
:::

:::exercise Apply the drift formula {level=2 check="0.47"}
Start at risky weight $0.40$, cash return $0$, risky simple return $35/106$. What is the drifted weight? (Enter a decimal.)
:::solution
$w' = 0.40\times(141/106) / (1 + 0.40\times 35/106) = 0.47$, as simplified in [[#ex-drift]]. The fraction $282/600$ reduces to $47/100$.
:::
:::

:::exercise A partial trade {level=2 check="0.42"}
Turnover of the full move from risky weight $0.47$ to $0.40$ is $0.14$, cash on the other side. A budget of $0.10$ scales the move. What risky weight is implemented? (Enter a decimal.)
:::solution
$\lambda = 0.10/0.14 = 5/7$. The risky weight moves by $(5/7)\times 0.07 = 0.05$ towards the target, from $0.47$ to $0.42$. Cash becomes $0.58$. The budget is exhausted and the target is not reached.
:::
:::

:::exercise Terminal wealth with the breaker {level=2 check="88"}
On the path in [[#ex-path]], the breaker triggers when wealth hits $88$ and the cooldown covers the rest of the path. Cash earns $0$. Starting from $100$, what is terminal wealth? (Enter a number.)
:::solution
The crossing bar is felt, so wealth is $88$. The later asset moves, down to $70$ and up to $98$, are not taken. Terminal wealth is $88$. Without the breaker it would be $98$.
:::
:::

:::exercise A cleaner drift {level=3 check="1/3"}
The risky weight starts at $1/4$. The risky simple return is $1/2$. Cash earns $0$ and nothing is traded. What is the drifted weight? (Enter a fraction.)
:::hint
Use $w(1+R)/(1+wR)$ with $w = 1/4$ and $R = 1/2$. The denominator is $1 + (1/4)(1/2)$.
:::
:::solution
$$
w' = \frac{(1/4)\cdot(3/2)}{1 + (1/4)\cdot(1/2)} = \frac{3/8}{1 + 1/8} = \frac{3/8}{9/8} = \frac{3}{9} = \frac{1}{3}.
$$
The weight rises from $1/4$ to $1/3$ because the risky sleeve gained and was not cut back. The gap is $1/3 - 1/4 = 1/12 \approx 0.0833$, which a band of $0.10$ would leave untraded and a band of $0.05$ would trade.
:::
:::

:::exercise Wealth exactly at the threshold {level=3 check="93.5"}
The running peak is $110$. What net asset value is a drawdown of exactly $15\%$ from that peak? Under [[#def-breaker]], the trigger is strict, so this value does not by itself flatten the book. (Enter a decimal.)
:::hint
A drawdown of exactly $0.15$ means $V/110 - 1 = -0.15$, so $V = 0.85\times 110$. The previous bar in [[#ex-path]] was $99$, which is still above this level.
:::
:::solution
$V = (1-0.15)\times 110 = 0.85\times 110 = 93.5$. Then $D = 93.5/110 - 1 = -0.15$, which is not strictly less than $-0.15$, so this definition of the breaker does not fire. The path in [[#ex-path]] jumps from $99$ to $88$ and never lands on $93.5$. The overshoot is the difference between checking continuously and checking at bar ends. From $99$, the simple return that would land exactly on $93.5$ is $93.5/99 - 1 = -11/198 \approx -0.055556$. Any strictly worse return from $99$ finishes below $93.5$ and does trigger.
:::
:::
