Two research sentences share the word momentum, and they do not look at the same information. One ranks a universe. The other reads each asset's own past and never asks who else was in the room. A moving-average rule on a single price, already studied as time-series momentum in the trend course, can be stated for a universe of one. A winner-minus-loser portfolio cannot: with one name there is nothing to rank. Treating the two sentences as one strategy, and then comparing their reported Sharpes as if only the label differed, is how careful pages get mashed into a slogan.

The cross-sectional sentence was fixed, for US equities, by Jegadeesh and Titman in 1993. They sorted stocks on past returns over windows of three to twelve months, left a short gap, and held the resulting portfolios for a similar horizon. In that sample, past winners beat past losers on average. That is a historical statement about a ranking. It is not an instruction to hold anything, and it is not the same object as the sign of one asset's own past return.

## What each rule is allowed to see

A signal dated $t$ may use only information known at $t$. It earns what happens after $t$. Write $F_{i,t}$ for a past simple return of asset $i$, computed from prices up to $t$, over a window the next chapter will pin down. The number $F_{i,t}$ is an input. What a rule may do with it depends on which sentence you chose.

:::definition Cross-sectional momentum signal {#def-cs}
Let $U_t$ be a universe known at date $t$, and let $F_{i,t}$ be a past simple return known at $t$ for each $i \in U_t$. The **cross-sectional momentum signal** of $i$ is the rank of $F_{i,t}$ inside $U_t$, with rank $1$ given to the largest value. A portfolio rule is a stated map from those ranks to weights $w_{i,t}$. The map is part of the experiment. The rank alone is not a weight.
:::

:::definition Time-series momentum signal {#def-ts}
The **time-series momentum signal** of asset $i$ at $t$ is the sign of that asset's own past simple return,
$$
s_{i,t} = \sgn(F_{i,t}),
$$
with the convention $\sgn(0) = 0$. It does not depend on any other asset. This is the same object as the trend hypothesis in [[trend/the-trend-hypothesis]], repeated here so the contrast stays visible.
:::

A cross-sectional rule can short a name whose own past return is positive, because someone else did better. A time-series rule cannot: a positive own past return is a long signal, whatever the rest of the universe did. The other way round is just as sharp. A name with a negative own past return is a short under the time-series rule even if it is the least bad name in the universe, and a cross-sectional rule that only shorts the bottom of the ranking may leave it alone.

:::intuition A race, or a diary
Cross-sectional momentum is a race: the signal is who finished ahead inside a stated field. Time-series momentum is a diary: the signal is whether this one asset's own past return was positive. You can keep a diary for a single name. You cannot run a race with a single name. Adding a constant to every runner's time does not change the finishing order, and it can change the diary, which is the content of [[#prop-shift]].
:::

## From ranks to a zero-sum book

The map still has to be written down. The version used throughout this chapter is the equal-weight winner-minus-loser book: the same weight on each of the $K$ best names, the opposite weight on each of the $K$ worst names, and zero on anyone in the middle. Ties make the rule incomplete, so the statement assumes there are none. A tie-break is a further choice, not a detail.

:::algorithm Equal-weight winner-minus-loser book {#alg-wml}
Fix $K \ge 1$ and a universe with $n \ge 2K$ names and no ties in $F_{i,t}$.

1. Sort the universe by $F_{i,t}$, largest first.
2. Give weight $+1/K$ to each of the first $K$ names, the winners.
3. Give weight $-1/K$ to each of the last $K$ names, the losers.
4. Give weight $0$ to every remaining name.
5. Hold those weights from the decision at $t$ to the next decision. They earn the simple returns $R_{i,t+1}$, which use prices after $t$.
:::

Each side then sums to $+1$ or to $-1$. The gross exposure, the sum of absolute weights, is $2$: one unit long, financed by one unit short. The net sum of the weights is $0$. Nothing in that sentence says the book has no market exposure. A sum of weights equal to zero is not a beta of zero. Beta needs a stated benchmark and a covariance, which this chapter does not estimate. The portfolio course separates those constraints in [[portfolio/long-only-and-neutral]].

:::proposition Winner minus loser {#prop-wml}
Assume the weights from [[#alg-wml]], and write $\bar R^{(W)}_{t+1}$ for the equal-weighted average of the winners' next simple returns and $\bar R^{(L)}_{t+1}$ for the losers'. Then the portfolio's simple return is
$$
R_{p,t+1} = \sum_i w_{i,t} R_{i,t+1} = \bar R^{(W)}_{t+1} - \bar R^{(L)}_{t+1},
$$
and $\sum_i w_{i,t} = 0$.
:::

:::proof
There are $K$ winners, each with weight $1/K$, so the winners contribute
$$
\sum_{i \in W} \frac{1}{K} R_{i,t+1} = \bar R^{(W)}_{t+1}.
$$
The $K$ losers, each with weight $-1/K$, contribute $-\bar R^{(L)}_{t+1}$. Middle names contribute nothing. Adding these pieces gives the identity. The sum of the weights is $K \cdot (1/K) + K \cdot (-1/K) = 0$.
:::

The identity is the whole strategy in one line. The book makes money over the next period precisely when the winners' average simple return exceeds the losers'. Both sides can be up, or both down. Only the gap enters $R_{p,t+1}$.

:::corollary A common next-period return {#cor-common}
If $\sum_i w_{i,t} = 0$ and every asset's next simple return is shifted by the same constant $c$, the portfolio simple return does not change.
:::

:::proof
$$
\sum_i w_{i,t} (R_{i,t+1} + c) = \sum_i w_{i,t} R_{i,t+1} + c \sum_i w_{i,t} = \sum_i w_{i,t} R_{i,t+1},
$$
because the second sum is zero. The hypothesis $\sum w = 0$ is the result proved in [[#prop-wml]] for this particular map. The same one-line argument applies to any other zero-sum weight vector.
:::

A common shift of the *formation* returns is a different operation. It acts on the signal, not on the next period, and the two sentences in this chapter do not answer it the same way.

:::proposition A common shift of the formation returns {#prop-shift}
Replace every formation return by $F_{i,t} + c$ for the same constant $c$. Every rank is unchanged, so the weights from [[#alg-wml]] are unchanged. The time-series signs need not be unchanged: if $F_{i,t} < 0$ and $F_{i,t} + c > 0$, then $\sgn(F_{i,t} + c) = +1$ while $\sgn(F_{i,t}) = -1$.
:::

:::proof
If $F_{a,t} > F_{b,t}$, then $F_{a,t} + c > F_{b,t} + c$. Strict inequalities, and therefore ranks in a universe with no ties, are invariant to adding $c$. The winner set and the loser set are the same sets, so the weights are the same vector. The sign claim is the definition of $\sgn$: a negative number and a positive number have opposite signs. The two-name case $F = -0.02$ and $F = 0.03$ with $c = 0.05$ is one witness. The shifted values are $0.03$ and $0.08$. The order is untouched. The first sign flips from $-1$ to $+1$.
:::

:::quiz
Which of these can be computed for a universe of one asset?
- [ ] The cross-sectional rank of its past return
- [x] The sign of its own past return
- [ ] A winner-minus-loser weight of $+1/K$
- [ ] The identity in the winner-minus-loser proposition, which needs a loser set
:::solution
A rank needs at least two formation returns to be a comparison, and a winner-minus-loser book needs a bottom as well as a top. The sign of the single asset's own past return is defined with no reference to anyone else. That is why time-series momentum belongs, conceptually, to the trend course, and why it can be stated for one price series.
:::
:::

## A four-name book, computed both ways

The numbers in this section are invented. They are not a sample of W15, and they are not a forecast. They exist so that the weights and the next-period return can be seen in full.

:::example Four formation returns {#ex-rank}
Four names have twelve-month simple returns, already computed and known at the decision: North $0.30$, East $0.12$, South $-0.08$, West $0.04$. There are no ties. Form the book in [[#alg-wml]] with $K = 2$. Write the weight vector in the order (North, East, South, West), and check that the weights sum to zero.
:::solution
Sort by formation return, largest first: North $0.30$, East $0.12$, West $0.04$, South $-0.08$.

The winners are North and East, each with weight $+1/2$. The losers are West and South, each with weight $-1/2$. In the requested order the weights are
$$
(0.5,\ 0.5,\ -0.5,\ -0.5).
$$
The sum is $0.5 + 0.5 - 0.5 - 0.5 = 0$. The gross exposure is $2$. West is short even though its own formation return is positive. That is allowed for a ranking and forbidden for a sign rule.
:::
:::

:::example The next month, and the identity {#ex-next}
Keep the weights from [[#ex-rank]]. The next month's simple returns, which were not known at the decision, are North $0.02$, East $-0.01$, South $0.04$, West $0.05$. Compute the portfolio simple return from the weights, and again from [[#prop-wml]].
:::solution
From the weights,
\begin{align*}
R_p &= (0.5)(0.02) + (0.5)(-0.01) + (-0.5)(0.04) + (-0.5)(0.05) \\
&= 0.010 - 0.005 - 0.020 - 0.025 \\
&= -0.040.
\end{align*}
The winners' average next return is $(0.02 + (-0.01))/2 = 0.005$. The losers' average is $(0.05 + 0.04)/2 = 0.045$. The identity says
$$
R_p = 0.005 - 0.045 = -0.040,
$$
the same number. The names did not have to fall. The losers rose by more than the winners, and a book that is long the winners and short the losers lost $0.040$ over the month. Under [[#cor-common]], adding the same constant to all four next returns would leave $-0.040$ unchanged. The loss is a gap, not a market level.
:::
:::

:::example The same four names, as a diary {#ex-ts}
Using the formation returns in [[#ex-rank]], write the time-series signs. Scale them to the same gross exposure of $2$ by giving every name absolute weight $1/2$, with the sign of its own formation return. Compute the portfolio simple return on the same next-month returns as [[#ex-next]].
:::solution
The formation returns have signs $+$, $+$, $-$, $+$ for North, East, South, West. With absolute weight $1/2$ the time-series weights are
$$
(0.5,\ 0.5,\ -0.5,\ 0.5).
$$
They do not sum to zero: three longs and one short give a net weight of $0.5 + 0.5 - 0.5 + 0.5 = 1$. Matching the gross exposure does not match the net exposure. The portfolio return is
\begin{align*}
R^{\mathrm{ts}} &= (0.5)(0.02) + (0.5)(-0.01) + (-0.5)(0.04) + (0.5)(0.05) \\
&= 0.010 - 0.005 - 0.020 + 0.025 \\
&= 0.010.
\end{align*}
The cross-sectional book returned $-0.040$ on the same next month. The disagreement is West. Formation return $+0.04$ puts West in the bottom half of this universe, so [[#alg-wml]] is short West, and the sign rule is long West. One name, two sentences, opposite positions. Averaging $-0.040$ and $0.010$ would describe neither rule.
:::
:::

:::example A shift that the ranking ignores {#ex-shift}
Two assets have formation returns $-0.02$ and $+0.03$. Add $c = 0.05$ to both. State the ranks before and after, and the time-series signs before and after, using $\sgn(0) = 0$ only if a value lands on zero.
:::solution
Before the shift the order is second asset, then first. The signs are $-1$ and $+1$. After the shift the formation returns are $0.03$ and $0.08$. The second asset is still ahead, so a winner-minus-loser map is unchanged: still long the second and short the first, for $K = 1$. The signs are now $+1$ and $+1$. The first asset flipped. [[#prop-shift]] is this arithmetic, not a special property of the number $0.05$. Any $c > 0.02$ would have made the first formation return positive and left the order alone.
:::
:::

:::warning One label, two experiments
Calling both rules momentum, and then speaking of the momentum Sharpe, hides the choice of information. The cross-sectional book in [[#ex-next]] and the time-series book in [[#ex-ts]] saw the same four numbers and the same next month. They did not hold the same positions, and they did not earn the same return. A later chapter that changes the window, the skip, or the rebalance calendar is changing the experiment again. None of those changes is a comment on the others.
:::

Path A from the shared notes, prices $(100, 102, 101, 104, 103, 107, 106, 110)$, is a one-asset path, so the ranking in [[#def-cs]] cannot be formed. Its seven simple returns alternate in sign. A time-series rule with a one-step legal lag — the position that earns return $t$ is the sign of return $t-1$ — is therefore on the wrong side of every step it is allowed to take. That is a property of this short alternating toy, not a finding about markets. The position list and the full trend hypothesis live in [[trend/the-trend-hypothesis]]. The point here is only the missing object: there is no second name, so there is no cross-section.

:::widget plot
f: 100*exp(0.01*x); 130*exp(-0.005*x)
x: 0, 40
labels: Starts behind; Starts ahead
caption: Two invented price paths. One starts lower and grows faster. Which name leads depends on the window you rank. A sign rule never asks that question: it only asks whether each path's own past return was positive. Nothing here is a forecast.
:::

## What W15 reported, and what it did not

The library's cross-sectional page is a single specification, not a verdict on the 1993 hypothesis. W15 is described as long the top $3$ and short the bottom $3$ by twelve-month return, rebalanced monthly. The bars are daily. The span is $26$ years. As reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026, the row is: total return $+1.3\%$, CAGR $+0.05\%$, reported Sharpe $-0.24$, maximum drawdown $-25.4\%$, win rate $49.4\%$, profit factor $1.00$. This atlas has not re-run the backtest, and it has not verified the annualisation or the risk-free rate inside the reported Sharpe. The number is theirs. It is not the Sharpe ratio defined for the short examples in this atlas.

Read the row as a flat published result. A CAGR of $+0.05\%$ compounded over $26$ years is about $+1.3\%$, in line with the reported total return: $(1.0005)^{26} - 1 \approx 0.013$. The same quiet path is being described twice, not two different successes. A profit factor of $1.00$ means that, on whatever unit the catalogue calls a win, the sum of positive contributions equals the absolute sum of negative contributions. It is not a near-zero profit factor, and it is not a large one. The win rate of $49.4\%$ is uninterpretable until that unit is known; the performance course makes that warning in [[performance/win-rate-and-profit-factor]]. The reported Sharpe is negative beside a tiny positive CAGR. Those two cells can sit together if the excess is taken over a positive financing rate, or if the two statistics are not the same series. This atlas will not invent the reconciliation.

The honest sentence is the dull one. Over the window and the specification printed on that page, the cross-sectional book did not compound into anything a reader should admire, and the drawdown was still $-25.4\%$. A flat page is not a reason to take the opposite weights. The opposite book is a different experiment, with its own costs, and the library does not report it. Nor is a flat page a reason to declare the 1993 average false. W15 is one implementation: top three against bottom three, a twelve-month return, a monthly clock, that data, those costs. Jegadeesh and Titman's sample, windows and stock universe were not this page. Comparing either of them with a time-series moving-average backtest from [[trend/moving-averages]] changes the signal, the universe and the clock at once. The gap between two reported Sharpes would not be the gap between the two hypotheses.

:::quiz
W15 reports a CAGR of $+0.05\%$ and a profit factor of $1.00$ over $26$ years. Which reading fits the row?
- [ ] The profit factor is near zero, so the losers dominated
- [ ] A negative reported Sharpe means the total return must have been negative
- [x] The published path is flat: the profit factor says wins and losses balanced on the catalogue's unit, and the CAGR is about zero
- [ ] The row is a reason to hold the opposite of the top-three book
:::solution
A profit factor of $1.00$ means the two sides of the ratio match. It does not mean the numerator was near zero. The CAGR is slightly positive, so the total-return cell is not a loss. The opposite book is not reported on the page, and a flat result is not an instruction to reverse the weights.
:::
:::

:::remark Reported Sharpe
Whenever this course quotes a Sharpe ratio from the library, the phrase is **reported Sharpe**. The definition used in our own short examples — mean excess return divided by the standard deviation of excess return, with the risk-free rate stated, often zero — is not assumed to be theirs.
:::

:::history
Jegadeesh and Titman, in the Journal of Finance in 1993, sorted US stocks on intermediate past returns and held long the past winners against the past losers. Across formation and holding windows of three, six, nine and twelve months, winners beat losers on average in their sample. The six-month by six-month cell is the one later summaries usually describe as on the order of one per cent a month. This atlas has not recomputed that table. Carhart, in 1997, put a winner-minus-loser factor next to the Fama–French three-factor model as a control in mutual-fund studies. The factor is a research instrument. It is not a product, and it is not W15.
:::

## Where this leads

The ranking still needs a window, a month that may be left out, and a rule for what to do when an asset's own past return is negative. That is [[momentum/formation-skip-and-dual]]. The same zero-sum book has a left tail that an average hides, studied in [[momentum/momentum-crashes]]. The diary version, the sign of one asset's own past, stays with [[trend/the-trend-hypothesis]], and the dependence that makes a sign informative or useless is the lag-one autocorrelation in [[statistics/moments-and-dependence]].

:::summary
- Cross-sectional momentum ranks a universe by a past return. Time-series momentum uses only each asset's own past sign. The second can be stated for one asset; the first cannot.
- The equal-weight winner-minus-loser map puts weight $+1/K$ on each of $K$ winners and $-1/K$ on each of $K$ losers. The weights sum to $0$ and the gross exposure is $2$.
- Under that map the next simple return equals the winners' average next return minus the losers' average. A common shift of every next return drops out. A common shift of every formation return leaves the ranks fixed and can flip time-series signs.
- A name can be a relative loser and an absolute winner. In the four-name toy, West was short in the ranking and long in the sign rule, and the two books returned $-0.040$ and $+0.010$ on the same next month.
- W15, top three against bottom three by twelve-month return, monthly, is a published flat result over $26$ years: total return $+1.3\%$, CAGR $+0.05\%$, reported Sharpe $-0.24$, maximum drawdown $-25.4\%$, profit factor $1.00$. This atlas has not re-run it. The row is not a reason to reverse the book, and it is not the 1993 sample.
:::

## Exercises

:::exercise Weight on a middle formation return {level=1 check="-0.5"}
Four names, A, B, C and D, have formation returns $0.15$, $0.02$, $-0.07$ and $0.09$, with no ties. Use [[#alg-wml]] with $K = 2$. What is the weight on B? (Enter the weight as a decimal.)
:::solution
Sort: A $0.15$, D $0.09$, B $0.02$, C $-0.07$. Winners are A and D, each at $+1/2$. Losers are B and C, each at $-1/2$. The weight on B is $-0.5$.
:::
:::

:::exercise Next-month return of that book {level=1 check="0.04"}
Keep the weights from the previous exercise. The next simple returns are A $0.03$, B $0.01$, C $-0.02$, D $0.04$. What is the portfolio simple return? (Enter a decimal.)
:::solution
Weights are A $+0.5$, B $-0.5$, C $-0.5$, D $+0.5$.
$$
R_p = (0.5)(0.03) + (-0.5)(0.01) + (-0.5)(-0.02) + (0.5)(0.04) = 0.015 - 0.005 + 0.010 + 0.020 = 0.040.
$$
The winners' average is $(0.03+0.04)/2 = 0.035$ and the losers' average is $(0.01 + (-0.02))/2 = -0.005$, and $0.035 - (-0.005) = 0.040$.
:::
:::

:::exercise Gross exposure {level=1 check="2"}
For the same $K = 2$ book, what is the sum of the absolute weights? (Enter an integer.)
:::solution
Four names carry absolute weight $1/2$ each, and the middle of a four-name universe is empty when $K = 2$. The gross exposure is $4 \times 1/2 = 2$. The net sum remains $0$.
:::
:::

:::exercise Time-series weights on the same four {level=2 check="0.05"}
Formation returns are again $0.15$, $0.02$, $-0.07$, $0.09$ for A, B, C, D, and the next returns are $0.03$, $0.01$, $-0.02$, $0.04$. Give every name absolute weight $1/2$ and the sign of its own formation return. What is the portfolio simple return? (Enter a decimal.)
:::solution
Signs of the formation returns are $+$, $+$, $-$, $+$. Weights: $(0.5,\ 0.5,\ -0.5,\ 0.5)$.
$$
R = (0.5)(0.03) + (0.5)(0.01) + (-0.5)(-0.02) + (0.5)(0.04) = 0.015 + 0.005 + 0.010 + 0.020 = 0.050.
$$
The cross-sectional book on the same next returns earned $0.040$. C is short under both rules. B is a loser in the ranking, hence short there, and long under the sign rule. The two returns are not obliged to match.
:::
:::

:::exercise Shifted formation return {level=2 check="0.03"}
An asset's formation return is $-0.02$. You add $c = 0.05$, as in [[#ex-shift]]. What is the shifted formation return? (Enter a decimal.)
:::solution
$-0.02 + 0.05 = 0.03$. The sign flips from $-1$ to $+1$. A ranking against a second asset whose formation return was $+0.03$, now $+0.08$, is unchanged, because $0.03 < 0.08$ just as $-0.02 < 0.03$.
:::
:::

:::exercise A common next return {level=2 check="0"}
A winner-minus-loser book has weights summing to zero. Over the next period every asset, winners and losers alike, has simple return $0.07$. What is the portfolio simple return? (Enter a decimal.)
:::solution
By [[#cor-common]], shifting every next return by $0.07$ from a base of zero adds $0.07$ times the sum of the weights. That sum is $0$, so $R_p = 0$. The identity in [[#prop-wml]] says the same thing: both averages equal $0.07$, and the difference is $0$. A zero-sum momentum book does not get paid for a rally that lifts every name by the same amount.
:::
:::

:::exercise Use only the two averages {level=3 check="-0.03"}
You are not told the individual next returns. You are told that the book was formed by [[#alg-wml]], that the winners' equal-weighted average next return was $0.02$, and that the losers' equal-weighted average next return was $0.05$. What is $R_p$? (Enter a decimal.)
:::hint
The individual names are not needed once both averages are known. Look at the identity that writes $R_p$ as a difference of those two averages.
:::
:::solution
[[#prop-wml]] gives $R_p = 0.02 - 0.05 = -0.03$. The winners rose and the losers rose by more. The book lost $0.03$ even though you never saw a single losing asset.
:::
:::

:::exercise Legal lag on the first step of Path A {level=3 check="-0.009804"}
Path A's first two simple returns are $0.020000$ and $-0.009804$. A time-series rule sets the position that earns a return equal to the sign of the previous return, and it may not use the return it is about to earn. What is the simple P&L on the second return, per unit of absolute position? (Enter the six-decimal number.)
:::hint
The sign that multiplies the second return is the sign of the first return, not the sign of the second. The position is $+1$.
:::
:::solution
The first return is positive, so the legal position for the second step is $+1$. The P&L is $(+1) \times (-0.009804) = -0.009804$. Using the sign of the second return itself would be a same-bar rule. It is not the signal defined in [[#def-ts]].
:::
:::
