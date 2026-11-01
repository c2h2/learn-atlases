An average can be kind while a path is not. Momentum research has a particular version of that gap. Winner-minus-loser portfolios have stretches in which they fall hard, often when a market that has been declining snaps back and the names that had been losing are the ones rising. Daniel and Moskowitz, in the Journal of Financial Economics in 2016, documented those episodes and the option-like shape they give the payoff. The average historical premium and the conditional left tail are both facts about the samples they study. Neither fact cancels the other, and neither fact is an order.

The paper also estimates a conditional mean and variance and studies a weight that changes with them. That estimate is not derived here. A description of when crashes have clustered — after declines, when volatility is high, and during the rebound — is not a timer, and it is not a hedge this atlas is suggesting anyone hold. The lesson stops at the shape of the loss: how a positive mean can sit on top of a negative compound return, and how a rebound in which yesterday's losers lead makes the winner-minus-loser identity negative even though both sides are up.

## Two summaries of one path

:::definition Arithmetic mean and compound return {#def-two-summaries}
For simple returns $R_1, \ldots, R_T$, each greater than $-1$, the **arithmetic mean** is $\bar R = T^{-1} \sum_{t=1}^{T} R_t$. The **compound return** is $\prod_{t=1}^{T}(1 + R_t) - 1$. The equity index starts at $1$ and ends at $\prod (1+R_t)$. The **maximum drawdown** is the most negative peak-to-trough change of that index, a fraction less than or equal to zero.
:::

The performance course separates these objects properly, including the logarithm and the drawdown of a path that is not a momentum book. Two facts are needed before the crash arithmetic. First, $\sum \ln(1+R_t) = \ln\bigl(\prod(1+R_t)\bigr)$, so the sign of the sum of log returns is the sign of the compound growth. Second, $\ln(1+R) \approx R - R^2/2$ for small $R$, and the quadratic term is always a drag. A large down move is not cancelled, in the compound, by an up move of the same arithmetic size. The two-period case below is large enough that the approximation is only a guide, and the exact product is the result.

:::proposition Positive mean, negative compound return {#prop-mean-compound}
Let $R_1 > -1$ and $R_2 > -1$. The arithmetic mean is strictly positive and the two-period compound return is strictly negative if and only if
$$
R_1 + R_2 > 0 \qquad \text{and} \qquad R_1 R_2 < -(R_1 + R_2).
$$
Any such pair has opposite signs.
:::

:::proof
The mean is positive exactly when $R_1 + R_2 > 0$. The compound return is negative exactly when $(1+R_1)(1+R_2) < 1$. Expanding the product gives $1 + R_1 + R_2 + R_1 R_2 < 1$, so $R_1 R_2 < -(R_1 + R_2)$. Both inequalities together are the claim.

If the product $R_1 R_2$ were positive or zero, it could not be strictly less than $-(R_1+R_2)$, because that quantity is strictly negative whenever the sum is strictly positive. So one return is positive and the other is negative. The negative one is large enough to break the compound and not large enough to break the sum. For a loss of size $a \in (0,1)$ and a gain $b > 0$, the two inequalities become $a < b < a/(1-a)$. The upper bound exceeds $a$ whenever $a > 0$, so the interval is non-empty.
:::

:::corollary The second step is the drawdown {#cor-dd}
Suppose equity is marked only at $0$, at the end of the first period and at the end of the second, with $R_1 > 0$ and $R_2 < 0$. The maximum drawdown of those three marks is $R_2$.
:::

:::proof
The marks are $1$, $1+R_1$ and $(1+R_1)(1+R_2)$. Because $R_1 > 0$, the middle mark is strictly above the first, so the running peak after the first step is $1+R_1$. The last mark divided by that peak is $1+R_2$, and $1+R_2 - 1 = R_2 < 0$. No earlier trough exists, because the path rose from $1$ to $1+R_1$. The most negative peak-to-trough change is therefore $R_2$. In particular the drawdown equals the crash step, not the two-period compound return, and not the arithmetic mean.
:::

:::example Up one half, down two fifths {#ex-two}
A momentum book's simple returns over two periods are $+0.50$ and then $-0.40$. Compute the arithmetic mean, the sum of the simple returns, the compound return, the sum of the log returns to six decimal places, and the maximum drawdown of the equity marks $1$, $1.5$ and $0.9$.
:::solution
The mean is $(0.50 + (-0.40))/2 = 0.05$. The sum of the simple returns is $0.10$. Someone who adds simple returns reports a gain.

The compound return is $1.50 \times 0.60 - 1 = 0.90 - 1 = -0.10$. The equity marks are exactly $1$, $1.5$ and $0.9$. The book is down a tenth over the two periods and the mean of the two simple returns is positive. This pair sits inside [[#prop-mean-compound]]: the sum $0.10$ is positive, and the product $(0.50)(-0.40) = -0.20$ is less than $-0.10$.

The log returns are $\ln 1.5 = 0.405465$ and $\ln 0.6 = -0.510826$ to six decimals, and they sum to $\ln 0.9 = -0.105361$. The quadratic approximation $R - R^2/2$ gives $0.50 - 0.125 = 0.375$ and $-0.40 - 0.08 = -0.48$, which sum to $-0.105$. The approximation is close, and it is not the result. The result is the product.

By [[#cor-dd]] the maximum drawdown is the second return, $-0.40$. The compound loss of $0.10$ hides a forty per cent peak-to-trough fall. Reporting the mean $0.05$, or the sum $0.10$, hides both.
:::
:::

The interval in the proof is easy to miss, so it is worth one more look at these particular numbers. The loss is $a = 0.40$. The gain must sit strictly between $0.40$ and $0.40/0.60 = 2/3 \approx 0.6667$. The gain $0.50$ is inside that interval. A gain of $0.70$ would have made the sum larger and the compound positive: $1.70 \times 0.60 - 1 = 0.02$. A gain of $0.30$ would have made the mean negative. "Up, then down a bit less" is not automatically a positive compound, and "up more than down" is not automatically a positive mean. The two thresholds are different.

:::example A loss that is too small to flip the compound {#ex-noclash}
Simple returns are $+0.20$ and then $-0.10$. Compute the mean and the compound return. Does the pair meet both inequalities in [[#prop-mean-compound]]?
:::solution
The mean is $(0.20 - 0.10)/2 = 0.05 > 0$. The compound return is $1.20 \times 0.90 - 1 = 0.08 > 0$. Equity goes $1 \to 1.20 \to 1.08$. The product of the returns is $(0.20)(-0.10) = -0.02$, and $-(0.20 - 0.10) = -0.10$. Because $-0.02$ is not strictly less than $-0.10$, the second inequality fails and the compound return stays positive. Opposite signs are required for the clash in [[#prop-mean-compound]], and they are not sufficient. The drawdown of the three marks is $-0.10$, by [[#cor-dd]], which is milder than the crash step of $-0.40$ and, unlike that crash, leaves the terminal wealth above where it started.
:::
:::

:::example Four quiet gains and one crash {#ex-five}
Five simple returns are $+0.12$, $+0.12$, $+0.12$, $+0.12$ and $-0.40$. Compute the arithmetic mean and the compound return to six decimal places. Mark equity at each step and state the maximum drawdown.
:::solution
The sum is $4 \times 0.12 - 0.40 = 0.08$, so the mean is $0.08/5 = 0.016$.

Equity, starting at $1$, multiplies by $1.12$ four times and then by $0.60$:
$$
1,\quad 1.12,\quad 1.2544,\quad 1.404928,\quad 1.57351936,\quad 0.944111616.
$$
To six decimals the peak is $1.573519$ and the terminal value is $0.944112$. The compound return is $0.944111616 - 1 = -0.055888$ to six decimals. The mean is still positive.

The running peak is the fifth mark. The last step multiplies it by $0.60$, so the drawdown on that step is $-0.40$, and no earlier step fell. The maximum drawdown is $-0.40$. A sentence that says only "the average return was $+1.6\%$ per step" has not described this path. The same warning, for a general equity index rather than a momentum toy, is the point of [[performance/volatility-and-drawdown]]: a volatility number would also have failed to name the trough. Here the object being refused is the mean.
:::
:::

:::widget distribution
dist: normal
params: mu=0.02, sigma=0.15
a: -0.40
b: -0.10
caption: A normal toy with a positive mean and a wide sigma. The shaded band is a crash-sized range of simple returns. Widen sigma and the band fills in, even though the mean stays positive. A real momentum crash is conditional and skewed; this curve is not a fit and not a forecast. It only shows that a kind mean and a wide left region can be drawn on the same axis.
:::

## When yesterday's losers lead

Recall the identity from [[momentum/two-kinds-of-momentum]]. For the equal-weight winner-minus-loser map, the book's simple return over the next period is the winners' average simple return minus the losers' average. The sign of the book is the sign of that gap. Nothing in the identity requires the winners to fall.

Daniel and Moskowitz locate the bad gap in a particular place. In their account, the crashes line up with panic states: they follow market declines, they arrive when market volatility is high, and they are contemporaneous with market rebounds. The mechanism they emphasise is a conditional beta. After major declines in their US sample, the past-loser decile's beta rose sharply — they report figures that can exceed $3$ — while the past-winner decile's beta fell, with figures below one half. A fast rebound then lifts the short side by more than the long side. The book has a large negative exposure to the rebound it did not ask for. Those betas are a finding in their sample, reported here so the arithmetic has a reason. They are not thresholds to apply to a live market, and this lesson does not estimate a beta.

The historical extremity of that pattern is part of the paper's own narrative, not a toy. In their 1927–2013 US equity sample, the two worst months for a book long the top decile of past twelve-month winners and short the bottom decile were consecutive: July and August 1932. Over that short window the past-loser decile returned $232\%$ and the past-winner decile gained $32\%$. This atlas has not recomputed those months. The figures are theirs. They are enough to see the identity at work: both sides rose, and the side the momentum book was short rose by far more. What the scaled long-short lost in those months depends on financing and on weights this lesson does not reconstruct. The decile gap is already the fact.

:::example A rebound that both sides enjoy {#ex-rebound}
Three past winners have simple returns $+0.05$, $+0.02$ and $0.00$ in the rebound month. Three past losers have $+0.40$, $+0.35$ and $+0.30$. The book is the equal-weight winner-minus-loser map with $K = 3$, so its return is the difference of the two averages. Compute that return to six decimal places. Did any winner have a negative return?
:::solution
The winners' average is $(0.05 + 0.02 + 0.00)/3 = 0.07/3 = 0.023333\ldots$. The losers' average is $(0.40 + 0.35 + 0.30)/3 = 1.05/3 = 0.35$. The book returns
$$
0.07/3 - 0.35 = -0.98/3 = -0.326666\ldots,
$$
which is $-0.326667$ to six decimal places. Every winner return is non-negative. Every loser return is positive and large. The long-short book loses about a third of capital in one period, under the convention that the long side sums to $+1$ and the short side to $-1$. A long-only investor who held the winners would have made a small gain. The crash here is not "the winners fell". It is "the short side rose more". That is the 1932 shape, scaled down to invented numbers so the arithmetic is visible. It is not a reproduction of 1932, and it is not a claim that the next rebound will look like either one.
:::
:::

Put the two examples side by side and the reporting temptation is obvious. A sample that is mostly quiet gains, like the four steps of $+0.12$, has a pleasant mean. One rebound of the [[#ex-rebound]] kind, or one step of $-0.40$, flips the compound and dominates the drawdown. An average premium taken over decades can be positive in a paper and still be the average of a path with a few intolerable months. Daniel and Moskowitz's point, in the words the course record uses, is that those crashes account for a large part of the option-like payoff of momentum: the book resembles the short side of an option because the left tail is where a lot of the shape lives. This atlas has not re-estimated that decomposition. The two-period toy is the smallest exact version of the same tension. The mean is $+0.05$ and the compound return is $-0.10$.

:::warning A cluster is not a timer
The episodes cluster after declines and during volatile rebounds, in the paper's samples. That is a statement about those samples. It is not a rule of the form "after the market has fallen, change the position". A rule of that form is a new strategy: another signal, another search, another cost, another way to be late. The authors study one such weight. Teaching it here would turn a fact about crashes into a timing product, which is exactly the step this chapter does not take. The same refusal runs in the other direction. The left tail is not a reason to throw out the historical average, and the average is not a reason to talk as if the tail were a surprise. W15, in [[momentum/two-kinds-of-momentum]], already showed a flat cross-sectional page with a maximum drawdown of $-25.4\%$. That page is not this paper's sample. It is a reminder that a tame CAGR and a serious trough can share a row.
:::

:::intuition Short the damaged names, then watch them recover
The winner-minus-loser book is long the names that held up and short the names that were hurt. If the hurt names are the high-beta names, a rebound pays the people you are short. You do not need a new formula to see the loss. You need the identity: portfolio return equals average winner minus average loser. When the second average is the large one, the book's return is negative while a headline index is positive. Calling that month a "momentum gain because the market was up" looks at the wrong column.
:::

:::quiz
Which pair has a positive arithmetic mean and a negative compound return?
- [ ] $+0.20$ and then $-0.10$
- [x] $+0.50$ and then $-0.40$
- [ ] $-0.50$ and then $+0.40$
- [ ] $+0.10$ and then $+0.10$
:::solution
The first pair compounds to $1.20 \times 0.90 - 1 = 0.08 > 0$, even though the mean is positive. The second is [[#ex-two]]: mean $+0.05$, compound $-0.10$. The third has a negative sum, so the mean is negative. The fourth is positive on both summaries. Opposite signs are required for the clash, and they are not sufficient.
:::
:::

:::quiz
In [[#ex-rebound]], which description is right?
- [ ] The winners fell, so the long side caused the loss
- [ ] The book's return equals the losers' average, because the winners were flat on average
- [x] Both sides rose, and the book lost because the losers rose by more
- [ ] A zero-sum book cannot lose money when every name has a positive return
:::solution
Winners averaged about $0.023$ and losers averaged $0.35$. The difference is about $-0.327$. Every name's return was non-negative. The common-shift corollary in [[momentum/two-kinds-of-momentum]] says a *common* positive return would have dropped out. These returns were not common. The short side rose by more than the long side, and the gap is the loss.
:::
:::

:::application What to report if you only have room for one sentence
Suppose the only number you are allowed to carry out of [[#ex-two]] is a single summary. The mean says $+0.05$. The compound return says $-0.10$. The drawdown says $-0.40$. These are not three estimates of one quantity. A specification sheet that reports a mean return over a long window and omits the worst peak-to-trough fall has made the choice the proposition warns against. The library rows quoted in this course print both a CAGR and a maximum drawdown for that reason. Using only the kind cell is a reading error, not a feature of the page.
:::

:::history
Daniel and Moskowitz published "Momentum crashes" in the Journal of Financial Economics in 2016. They showed that winner-minus-loser strategies have infrequent, persistent strings of losses, concentrated in volatile rebounds after market declines, and that this left tail is a large part of the option-like payoff. The July and August 1932 episode in their US sample, with the loser decile up $232\%$ and the winner decile up $32\%$, is the extreme they use to make that shape concrete. The paper goes further and builds a dynamic weight from forecasts of the mean and the variance. This lesson uses the episode and the arithmetic. It does not use the weight.
:::

## Where this leads

The same winner-minus-loser sentence can be read over currency pairs, where several published pages in this library are negative over the windows they report. That is [[momentum/momentum-across-assets]], and a negative page is still not a timing rule. The logarithm and the ban on adding simple returns are [[performance/simple-and-log-returns]]. Drawdown as an object that volatility does not determine is [[performance/volatility-and-drawdown]]. The identity that turned the rebound into a loss is [[momentum/two-kinds-of-momentum]].

:::summary
- The arithmetic mean and the compound return answer different questions. For two simple returns, the mean is positive and the compound return is negative exactly when the sum is positive and the product of the returns is less than minus that sum. The two returns then have opposite signs.
- The pair $+0.50$, $-0.40$ has mean $+0.05$, sum of simple returns $+0.10$, compound return $-0.10$ and maximum drawdown $-0.40$. Adding the simple returns hides the loss. The drawdown equals the crash step, not the two-period compound.
- Four gains of $+0.12$ and one loss of $-0.40$ have mean $+0.016$ and compound return $-0.055888$. The maximum drawdown is again $-0.40$.
- Under the winner-minus-loser identity, a rebound in which losers rise more than winners is a loss for the book even if every winner is up. The invented rebound returns $-0.326667$. The 1932 decile gap in Daniel and Moskowitz has the same shape at a very different scale.
- Clustering of crashes after declines is a fact about the samples in that paper. It is not a position-sizing rule. Their dynamic weight is a further experiment, and this lesson does not teach it.
:::

## Exercises

:::exercise Mean of the two-step crash {level=1 check="0.05"}
Simple returns are $+0.50$ and $-0.40$. What is the arithmetic mean? (Enter a decimal.)
:::solution
$(0.50 - 0.40)/2 = 0.05$. The positive mean does not decide the compound return.
:::
:::

:::exercise Compound return of the same pair {level=1 check="-0.10"}
For the same two returns, what is the compound return? (Enter a decimal, with two places.)
:::solution
$1.50 \times 0.60 - 1 = 0.90 - 1 = -0.10$. Equity ends at $0.90$ if it started at $1$.
:::
:::

:::exercise Drawdown of the two-step path {level=1 check="-0.40"}
Equity is marked at $1$, then $1.5$, then $0.9$. What is the maximum drawdown? (Enter a decimal, with two places.)
:::solution
The peak is $1.5$. The later mark is $0.9$. The change is $0.9/1.5 - 1 = 0.6 - 1 = -0.40$. [[#cor-dd]] gives the same figure as the second simple return, because that return is negative and the first is positive.
:::
:::

:::exercise A pair that does not clash {level=2 check="0.08"}
Simple returns are $+0.20$ and then $-0.10$. What is the compound return? (Enter a decimal.)
:::solution
$1.20 \times 0.90 - 1 = 1.08 - 1 = 0.08$. The mean is $(0.20-0.10)/2 = 0.05 > 0$, and the compound return is also positive. Check the product test in [[#prop-mean-compound]]: $(0.20)(-0.10) = -0.02$, and $-(0.20-0.10) = -0.10$. Because $-0.02$ is not less than $-0.10$, the compound return does not go negative. Opposite signs are not enough.
:::
:::

:::exercise Winners up, losers up more {level=2 check="-0.18"}
The winners' average simple return in a rebound month is $0.04$. The losers' average is $0.22$. The book is the equal-weight winner-minus-loser map. What is its simple return? (Enter a decimal.)
:::solution
The identity gives $0.04 - 0.22 = -0.18$. Both averages are positive. The book is down eighteen percentage points because it is short the average that rose more.
:::
:::

:::exercise Peak after four gains of twelve per cent {level=2 check="1.573519"}
Equity starts at $1$ and multiplies by $1.12$ four times, with no other marks in between. What is the equity after those four steps, to six decimal places? (Enter the six-decimal number.)
:::solution
$1.12^2 = 1.2544$. Times $1.12$ is $1.404928$. Times $1.12$ again is $1.57351936$, which is $1.573519$ to six decimal places. A fifth step of $-0.40$ would pull this peak down by exactly forty per cent and would make the compound return over all five steps negative, as in [[#ex-five]]. The peak itself is still $1.573519$ to six decimals.
:::
:::

:::exercise The boundary where the compound return is zero {level=3 check="-0.166667"}
The first simple return is $+0.20$. Find the second simple return $R_2$ at which the two-period compound return is exactly zero. (Enter the value to six decimal places.)
:::hint
Set $(1.20)(1+R_2) = 1$ and solve. Check afterwards that the arithmetic mean at this boundary is still positive, so the boundary is the edge of the region in [[#prop-mean-compound]], not a point already inside the negative-mean region. The strict inequality in the proposition is the open side of this boundary.
:::
:::solution
$1 + R_2 = 1/1.20 = 5/6$, so $R_2 = 5/6 - 1 = -1/6 = -0.166666\ldots$, which is $-0.166667$ to six decimal places. The sum is $0.20 - 1/6 = 0.033333\ldots > 0$, so the mean is positive. The product $(1.20)(5/6) = 1$, so the compound return is zero, not yet negative. Any $R_2$ strictly between $-0.20$ and $-1/6$ has a positive mean and a negative compound return. At $R_2 = -0.20$ the mean is zero.
:::
:::

:::exercise How far the sum misleads {level=3 check="0.20"}
For the returns $+0.50$ and $-0.40$, subtract the compound return from the sum of the simple returns. What do you get? (Enter a decimal.)
:::hint
The sum of the simple returns is $0.10$. The compound return is negative. Subtracting a negative number widens the gap. The performance chapter's warning is that the sum is not a wealth relative.
:::
:::solution
The sum is $0.50 - 0.40 = 0.10$. The compound return is $-0.10$. The difference is $0.10 - (-0.10) = 0.20$. Reporting the sum would claim a gain of a tenth. The equity index, which follows the compound, claims a loss of a tenth. The two claims differ by $0.20$ on a path only two steps long. The log sum, $-0.105361$ to six decimals, sits with the compound, not with the arithmetic sum.
:::
:::
