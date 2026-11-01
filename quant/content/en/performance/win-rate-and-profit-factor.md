Four of the seven simple returns on Path A are positive. That sentence becomes a win rate only after the unit is named. Here the unit is one step, the sign is the sign of the simple return, and there is no zero to argue about, so the win rate is $4/7$. The same seven printed simple returns have positive part summing to $0.126274$ and negative part summing, in absolute value, to $0.028765$. The ratio of those two sums is $4.3898$ to four decimal places. That is a profit factor for this unit. The compound simple return of the same path is $0.10$, and the sum of the log returns is $0.095310$. None of these numbers is a mistake. None of them is a utility. A different path can win more often than it loses and still finish lower, and a path with no losses at all can post an infinite profit factor while compounding only a few per cent.

The open library makes the same point with reported figures rather than invented ones. One limit-order example reports a win rate of $100$ per cent and an infinite profit factor, with a CAGR of only $+2.70$ per cent. The useful response is to ask how a win was defined, not to admire the percentage and not to copy the rule. A trailing-stop example reports a win rate of $39.8$ per cent, a profit factor of $0.91$, and a negative CAGR. A weight example reports a profit factor of $11.14$ and a win rate of $82.0$ per cent, which cannot be interpreted until the win unit is known. Those sentences are unpacked below with the attribution the catalogue requires. They are not a ranking, and they are not an invitation to take the other side of a loss.

The arithmetic of simple and log returns is [[performance/simple-and-log-returns]]. The fact that a path summary can ignore order, while a drawdown cannot, is [[performance/volatility-and-drawdown]]. The ratios that keep a mean and a scale are [[performance/sharpe-and-its-relatives]]. A win rate keeps a count. A profit factor keeps a ratio of two partial sums. Both discard information that those earlier objects keep, and both can be moved by redrawing the boundary of a "trade".

## What counts as a win

:::definition Win rate {#def-win}
Choose a unit and a profit measured on that unit. A **win** is a unit whose profit is strictly positive. A **loss** is a unit whose profit is strictly negative. A zero is neither, unless a sentence states a different convention. If $N$ is the number of units and $W$ is the number of wins, the **win rate** is $W/N$. The denominator counts every unit, including losses and zeros. A win rate computed only among units that were not flat is a different ratio and has to be named as one.

The unit is part of the definition. A step, a calendar day, a round trip from entry to flat, and a rebalance of a weight book are different units. Splitting one round trip into many positive daily marks raises the win rate if those days are positive. Merging two losing days into one losing round trip lowers the count of losses and can raise or lower the win rate according to what happens to the denominator. Neither operation changes the compound return of a fully invested account.
:::

On Path A the natural unit of the earlier chapters is the step, and the natural profit is the simple return, or any positive multiple of it. The signs are $+$, $-$, $+$, $-$, $+$, $-$, $+$. So $W = 4$, $N = 7$, and the win rate is $4/7$, about $0.5714$. Three steps are losses. There is no zero. Reporting "$57$ per cent winners" without the unit is incomplete, but at least the unit can be reconstructed from the table. A published win rate whose unit is not in the table cannot be reconstructed at all.

Redrawing the unit changes the scoreboard and leaves the path alone. Pair each negative Path A step with a neighbouring positive step and call the pair one trade. Whether the pair is a win depends on the combined profit, not on the count $4/7$, while the compound return of the seven steps is untouched. A weight book can mark each day by the account return, or mark each round trip when a signal flips. [[portfolio/from-signal-to-weight]] separates a signal from a weight. Once that map changes, the set of units changes, and the win rate is not required to stay put.

:::quiz
Path A has seven simple returns, four of them positive and three negative, and no zeros. Taking the unit to be one step, what is the win rate?
- [ ] $4/3$, wins divided by losses
- [ ] $3/7$, because a conservative summary counts the losses
- [x] $4/7$
- [ ] $0.10$, the compound simple return
:::solution
The win rate is wins divided by units, $4/7$. Wins divided by losses is not the definition. The compound simple return $0.10$ is not a count of signs. The three losses stay in the denominator.
:::
:::

## Profit factor

:::definition Profit factor {#def-pf}
Using the same units as the win rate, let $G$ be the sum of the positive profits and let $L$ be the sum of the absolute values of the negative profits. The **profit factor** is $G/L$, provided $L > 0$. If $L = 0$ and $G > 0$, the profit factor is infinite. If $G = 0$ and $L = 0$, there is nothing to ratio and the statistic is left undefined. A profit factor of $1$ means the gains and the losses sum to the same absolute total. It does not mean the compound return is zero. A profit factor above $1$ does not mean the compound return is positive. Both implications fail, and [[#prop-pf]] is the failure.
:::

The profits have to be in one unit of account, or all in simple returns under a stated notional, but not a mixture. A simple return of $-0.01$ at a high price and a price change of $-1$ point are not automatically the same loss. Path A is the worked example of that mix-up, because the verified profit factor "about $4.3898$" is the ratio of simple returns, while the ratio of price changes on the same path is $13/3$.

:::example Path A by simple returns {#ex-pf-a}
Treat each Path A step as one unit, and take the profit to be the printed simple return. Compute the win rate and the profit factor.
:::solution
The positive printed simple returns are $0.020000$, $0.029703$, $0.038835$ and $0.037736$. Their sum is

$$
G = 0.126274.
$$

The negative ones are $-0.009804$, $-0.009615$ and $-0.009346$. The absolute sum is

$$
L = 0.028765.
$$

The profit factor is $0.126274 / 0.028765 = 4.389849\ldots$, which is $4.3898$ to four decimal places. The win rate is $4/7$. The compound simple return, from the prices, is $0.10$, and the log sum is $0.095310$. The profit factor is not $1.10$, not $0.10$, and not $0.095310$. It answers "how many units of positive simple return per unit of negative simple return?" A number near $4.4$ says the positive column is a bit more than four times the absolute negative column. It does not say the account quadrupled. The account grew by a tenth.

Using the unrounded price ratios in place of the printed six-decimal returns changes the ratio only beyond the fourth decimal. The verified figure to quote is about $4.3898$, from the simple returns, with the unit stated as the step.
:::
:::

:::example The same prices, two other profits {#ex-pf-units}
The Path A price changes, in quote points, are $+2, -1, +3, -1, +4, -1, +4$. Separately, a fully invested equity index that starts at $1$ has step profits equal to those price changes divided by $100$. Compute both profit factors.
:::solution
On price changes, the gains are $2+3+4+4 = 13$ and the absolute losses are $1+1+1 = 3$. The profit factor is $13/3 = 4.3333\ldots$, or $4.3333$ to four decimal places. The win rate is still $4/7$, because the signs did not change. The profit factor moved, from about $4.3898$ to $4.3333$, because a one-point decline is a larger simple return when the price is lower, and the simple-return version weights the early decline at $102$ more heavily than a raw point does. Both ratios are correct for their profit. Quoting $4.3898$ for the point-change scoreboard would be the wrong pairing.

For the fully invested index the step profits in account units are exactly the price changes divided by the starting price $100$:

$$
+0.02,\ -0.01,\ +0.03,\ -0.01,\ +0.04,\ -0.01,\ +0.04.
$$

Gains sum to $0.13$ and absolute losses sum to $0.03$, so the profit factor is again $13/3 \approx 4.3333$. The total profit is $0.10$, matching the compound simple return. This is the profit factor of the account's mark-to-market increments. It is not the profit factor of the simple-return column. The simple-return column divides each increment by the *previous* level rather than by the original level, so the early steps are scaled differently from the later steps. [[performance/simple-and-log-returns]] already separated an asset return from an account profit. Here the separation shows up inside a single ratio.

None of the three numbers — about $4.3898$, about $4.3333$, and $0.10$ — is the Sharpe ratio $0.6097$. A reader who wants a mean relative to a scale is in the wrong chapter if they stop at a profit factor.
:::
:::

:::intuition Signs against sizes
A win rate remembers a sign and forgets a size. A profit factor remembers two bucket sums and forgets the order. Shuffle Path A's simple returns and both statistics stay put, because both are functions of the multiset. The equity path between the start and the finish does not. Maximum drawdown notices the order. Win rate and profit factor do not.
:::

## Two scoreboards that do not imply a compound return

:::proposition Profit factor and win rate do not determine the compound return {#prop-pf}
Assume the unit is one step, the profit used in the scoreboard is the simple return, and the account is fully invested with no external cash, so the compound simple return is $\prod(1+R_t) - 1$.

1. The profit factor can be infinite while a CAGR over a stated year is small. It is enough that every simple return is positive and the product of the gross returns is close to $1$.
2. The win rate can be strictly above one half while the compound simple return is negative. It is enough that the losing steps are larger in magnitude than the winning steps.

Neither claim needs a probabilistic model. Both are statements about finite lists of numbers.
:::

:::proof
For the first claim, take $252$ steps with simple return $0.0001$ on each step, and call that list one year when a CAGR is required. Every profit is positive, so $L = 0$ and $G = 252 \times 0.0001 > 0$. By [[#def-pf]] the profit factor is infinite. The compound gross return is $(1.0001)^{252}$. Numerically,

$$
(1.0001)^{252} - 1 = 0.025519
$$

to six decimals. If this window is the year in the CAGR definition, the CAGR is about $2.55$ per cent. An infinite profit factor has not produced a large compound return. It has recorded the absence of a negative step. The size of the positive steps was free, and these positive steps were a basis point each. The approximation $\exp(252 \times 0.0001) - 1 = \exp(0.0252) - 1$ agrees with $0.025519$ at the first five decimals, which is the usual small-return expansion and not the definition. The definition is the product.

For the second claim, take the four simple returns $0.05$, $0.05$, $0.05$, $-0.20$. Three of the four are wins, so the win rate is $3/4$, which is above one half. The gains sum to $0.15$ and the absolute loss is $0.20$, so the profit factor is $0.15/0.20 = 0.75$, which is below $1$. The compound gross return is

$$
(1.05)^3 \times 0.80 = 1.157625 \times 0.80 = 0.926100,
$$

and the compound simple return is $0.926100 - 1 = -0.073900$. The account finishes lower. The arithmetic sum of the simple returns is $-0.05$, also negative, but the claim is about the compound return, and the product is the account. A win rate above one half did not prevent the loss. The single loss was larger than the three gains put together, and the profit factor, unlike the win rate, noticed. The compound return noticed as well, through the product, and it is more negative than a careless reading of "three wins" suggests.

Both constructions are invented lists. They are not estimated edges, and they are not instructions to seek a high win rate or to avoid one.
:::

:::corollary Order drops out of the scoreboard {#cor-order}
The win rate and the profit factor of a list of profits are unchanged if the list is reordered. The maximum drawdown of the equity index built from those profits, read as simple returns, need not be unchanged.
:::

:::proof
A reorder leaves the count of strictly positive entries, the count of entries, the sum of the positive entries, and the absolute sum of the negative entries where they are. [[#def-win]] and [[#def-pf]] are functions of those four quantities only. [[performance/volatility-and-drawdown]] exhibits the multiset $\{0.10, 0.10, -0.10, -0.10\}$ in two orders, with maximum drawdowns $-0.19$ and $-0.109$ and with the same sample standard deviation. That multiset has win rate $2/4 = 1/2$ and profit factor $0.20/0.20 = 1$ in both orders. The scoreboard is identical and the peak-to-trough fall is not. Reordering is not a harmless presentational choice once the sentence you care about is about the path rather than about the buckets.
:::

:::example Three wins and a loss that is larger {#ex-three-wins}
Verify the second construction in [[#prop-pf]] from the gross returns, and state the win rate and the profit factor beside the compound simple return.
:::solution
The gross returns are $1.05$, $1.05$, $1.05$ and $0.80$. First, $1.05 \times 1.05 = 1.1025$. Then $1.1025 \times 1.05 = 1.157625$. Then $1.157625 \times 0.80 = 0.926100$. Subtract one: the compound simple return is $-0.073900$. The win rate is $3/4$. The profit factor is $0.15/0.20 = 0.75$. All three numbers belong in the same description. Quoting only $3/4$ would hide the loss. Quoting only $-0.073900$ would hide that three of the four steps were gains. A performance sentence that keeps one of them and implies the others is doing work the definitions do not licence.

The sum of the simple returns is $0.15 - 0.20 = -0.05$, which is not $-0.073900$. Adding simple returns would understate the loss on this list, just as it mis-stated Path A in the other direction. The product is the account. The sum is not.
:::
:::

:::warning A high win rate is not a successful account
The list $0.05, 0.05, 0.05, -0.20$ wins on three steps out of four and compounds to $-0.073900$. The list of $252$ copies of $0.0001$ never loses, has an infinite profit factor, and compounds to about $0.025519$ over that year. Path A wins on $4/7$ of its steps, has profit factor about $4.3898$, and compounds to $0.10$. Looking at the win rate column alone, the three-out-of-four list appears to sit between Path A and the never-lose list. Looking at the compound return, it is the worst of the three. The scoreboard you sort on is the conclusion you have already chosen.
:::

## Reported rows are prompts to ask about the unit

A catalogue win rate is a number from someone else's unit, cost model, and fill rule. The atlas has not re-run those backtests. The figures below are used only as reported scoreboards, to practise the questions [[#def-win]] and [[#def-pf]] force. They are not forecasts and not recommendations. A negative reported CAGR is part of the lesson. It is not a signal to take the other side.

:::example Three catalogue scoreboards {#ex-library}
Read the reported win rate, profit factor, and CAGR of examples O03, O10, and W20, and say which definitional question each row leaves open.
:::solution
O03, Limit RSI Dip, is a passive buy-limit example on weak RSI, daily bars, span $25$ years. The reported win rate is $100$ per cent, the reported profit factor is infinite, and the reported CAGR is $+2.70$ per cent. The same row reports a total return of $+94.66$ per cent, a Sharpe of $0.14$, and a maximum drawdown of $-19.09$ per cent. Those figures are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtest. An infinite profit factor means the catalogue's denominator, the absolute sum of losing units, was zero. A win rate of $100$ per cent means every unit the catalogue counted was a win. [[#prop-pf]] shows that this pair is compatible with a modest compound growth: the gains can be real and still be small relative to a year. The reported CAGR of $+2.70$ per cent is that situation in a catalogue, not a paradox. The reported maximum drawdown of $-19.09$ per cent says the equity path was not a straight line even though the win column was. The open question is the unit. A limit that fills only on favourable excursions can mark every fill as a win and still leave the account exposed between fills. How a win was defined is the question. Copying the rule is not a conclusion the row supports. Adverse selection and the difference between a limit and a mark are taken up in [[orders/fills-slippage-and-spread]], not here.

O10, Trailing Stop RSI, is an oversold-RSI entry with a trailing stop, daily bars, span $25$ years. The reported win rate is $39.8$ per cent, the reported profit factor is $0.91$, and the reported CAGR is $-0.52$ per cent. The same row reports a total return of $-12.2$ per cent, a Sharpe of $-0.41$, and a maximum drawdown of $-39.0$ per cent. Those figures are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtest. A profit factor below $1$ means the catalogue's losing units outweighed its winning units in the profit it summed. A negative CAGR is consistent with that imbalance and is not implied by the win rate alone: $39.8$ per cent would be compatible with a positive compound return if the winners were large enough, and here the reported profit factor says they were not. The row is a loss inside the library. It is not a reason to reverse the rule, and it is not a reason to treat $39.8$ per cent as a property of "RSI" in general. The implementation, including the trailing stop, is part of the reported result.

W20, Risk Parity Capped, is a sector equal-risk-contribution book with a per-position cap, daily bars, span $26$ years. The reported profit factor is $11.14$ and the reported win rate is $82.0$ per cent. The same row reports a CAGR of $+8.21$ per cent, a Sharpe of $0.45$, and a maximum drawdown of $-47.9$ per cent. Those figures are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run the backtest. A profit factor of $11.14$ beside a win rate of $82.0$ per cent is not interpretable until the win unit is known. In a weight backtest the unit may be a day, or a rebalance, with a positive account increment. That is a different denominator from a round trip. The library note on this row is the right one: do not treat $11.14$ as a typical or portable number. The reported maximum drawdown of $-47.9$ per cent is enough to stop a reading in which a large profit factor means the path was smooth. [[#cor-order]] is the abstract version of that stop. The weight construction itself belongs to [[portfolio/risk-parity]]. This chapter does not interpret the cap, and it does not suggest that a reader should hold the book.
:::
:::

The three rows are incompatible with the idea that one column implies the others. None of the pairings is an arithmetic error. A dashboard that sorts by win rate is sorting by [[#def-win]] and calling the sort a research result.


The figure starts from the seven printed simple returns of Path A. The win rate is 4/7 and the profit factor is about 4.3898. The compound simple return of the price path is 0.10, and the figure keeps that 0.10 rather than compounding the rounded prints. The custom sliders separate the win rate from the size of a win and the size of a loss.

:::widget payoff
mode: patha
caption: Path A uses the six-decimal simple returns printed in this chapter. The profit factor is about 4.3898 and the compound simple return of the price path is 0.100000. Switch to Custom and move the average loss to 0: the profit factor becomes infinite while the win rate can stay modest. Neither number is a recommendation.
:::
:::widget plot
f: 0.126274/x
x: 0.02, 0.20
y: 0, 8
hlines: 1
caption: Gains are held at 0.126274, the sum of Path A's positive printed simple returns. The curve is the profit factor as the absolute sum of losses runs from 0.02 to 0.20. The horizontal line is 1. Read where the curve crosses 1. A profit factor above 1 is not a compound return, and the graph is a definition, not a forecast.
:::

:::remark What this chapter refuses to infer
A win rate, a profit factor, a CAGR and a maximum drawdown are four different functions. [[#prop-pf]] is the disconnection. Even the sum of the buckets is not the compound return: on Path A, $0.126274 - 0.028765 = 0.097509$, the sum of the printed simple returns, not $0.10$. The sum $G - L$ equals the account's profit only when the increments are the account's increments, as in the mark-to-market profits of [[#ex-pf-units]].
:::

:::history
The reward-to-variability ratio in Sharpe's 1966 paper is a mean of excess returns divided by a standard deviation. It uses every excess return in the sample, including the losses, and it uses them in proportion to their distance from the mean. A win rate uses only the sign, and a profit factor uses only the two bucket sums. The 1966 definition is one reason a standard error can be attached, in the next chapter, to a Sharpe ratio, and cannot be copied unchanged onto a count of winning trades: the count is a different statistic, with a different sampling distribution. This note follows the course record of that paper. It is not a reconstructed quotation and not a comment on any fund in the 1966 study.
:::

## Where this leads

A win rate of $4/7$ and a profit factor of about $4.3898$ are descriptions of seven numbers. They are not precise properties of a process that produced the numbers. [[performance/uncertainty-of-performance]] puts standard errors under a mean and under a Sharpe ratio, which is the right next scepticism: even the statistics that keep every observation are wide on a short sample. A count with seven trials is not narrower. The order book and the fill, which decide whether a limit example's "win" was available at the quoted price, are [[orders/market-and-limit-orders]] and [[orders/fills-slippage-and-spread]].

:::summary
- A win rate needs a unit. On Path A, with the step as the unit and the sign of the simple return as the test, the win rate is $4/7$. Zeros are neither wins nor losses unless a convention says so.
- Changing the unit changes the rate without changing the compound return. Pairing days into round trips is a new scoreboard, not a new path.
- The profit factor is the sum of positive profits divided by the absolute sum of negative profits on that same unit. It is infinite when the denominator is $0$ and the numerator is positive.
- On Path A's printed simple returns the profit factor is $4.3898$ to four decimals. On the price changes of the same path it is $13/3 \approx 4.3333$. The unit of profit has to be stated.
- An infinite profit factor can sit beside a small CAGR: $252$ steps of $+0.0001$ compound to about $0.025519$. A win rate of $3/4$ can sit beside a negative compound return: $0.05, 0.05, 0.05, -0.20$ compounds to $-0.073900$.
- Win rate and profit factor do not depend on order. Maximum drawdown does. The multiset of two $+0.10$ steps and two $-0.10$ steps has profit factor $1$ in either order and drawdowns $-0.19$ or $-0.109$.
- O03's reported $100$ per cent win rate and infinite profit factor, with CAGR $+2.70$ per cent, ask how a win was defined. O10's reported win rate $39.8$ per cent, profit factor $0.91$, and negative CAGR are a loss in the library, not a reason to take the other side. W20's reported profit factor $11.14$ and win rate $82.0$ per cent are uninterpretable until the unit is known. All three are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026, and this atlas has not re-run them.
:::

## Exercises

:::exercise Count the positive steps {level=1 check="4"}
Path A's seven simple returns have signs $+$, $-$, $+$, $-$, $+$, $-$, $+$. With the step as the unit, how many wins are there? (Enter the number of wins.)
:::solution
Four of the signs are positive, so there are $4$ wins. The win rate is $4/7$, but the question asks for the count in the numerator.
:::
:::

:::exercise Divide the two Path A buckets {level=1 check="4.3898"}
The positive printed simple returns on Path A sum to $0.126274$. The absolute sum of the negative printed simple returns is $0.028765$. Compute the profit factor to four decimal places. (Enter the profit factor.)
:::solution
$0.126274 / 0.028765 = 4.389849\ldots = 4.3898$ to four decimal places. This is the simple-return profit factor, not $13/3$ and not the compound return $0.10$.
:::
:::

:::exercise A year of tiny gains {level=1 check="0.025519"}
There are $252$ steps, each with simple return $0.0001$, and the account is fully invested. Compute the compound simple return over the $252$ steps, rounded to six decimal places. (Enter the compound simple return.)
:::solution
The compound gross return is $(1.0001)^{252}$, so the compound simple return is

$$
(1.0001)^{252} - 1 = 0.025519
$$

to six decimals. There is no negative profit, so the profit factor on these steps is infinite. The exercise asks for the compound return, which stays modest. Infinite profit factor did not mean a large year. This is the first construction in [[#prop-pf]], and it is an invented list, not a target.
:::
:::

:::exercise Three modest gains and one large loss {level=2 check="-0.073900"}
The simple returns are $0.05$, $0.05$, $0.05$ and $-0.20$, in that order, and the account is fully invested. Compute the compound simple return to six decimal places. (Enter the compound simple return.)
:::solution
$(1.05)^3 = 1.157625$ and $1.157625 \times 0.80 = 0.926100$, so the compound simple return is $0.926100 - 1 = -0.073900$. The win rate is $3/4$ and the profit factor is $0.75$. The question asks for the compound return, which is negative. Adding the simple returns instead would give $-0.05$, a different and wrong description of the account.
:::
:::

:::exercise Points are not simple returns {level=2 check="4.3333"}
A price path has successive changes $+2, -1, +3, -1, +4, -1, +4$, in quote points. Taking each change as the profit of one unit, compute the profit factor to four decimal places. (Enter the profit factor.)
:::solution
Gains are $2+3+4+4 = 13$. Absolute losses are $1+1+1 = 3$. The profit factor is $13/3 = 4.3333\ldots = 4.3333$ to four decimal places. These are the Path A price changes, and $4.3333$ is not the simple-return profit factor $4.3898$. The signs still give a win rate of $4/7$. The scoreboard changed because the profit changed, not because the path changed.
:::
:::

:::exercise Six small wins and one larger loss {level=2 check="0.75"}
Six simple returns are $+0.01$ and one simple return is $-0.08$. Taking each simple return as the profit of one step, compute the profit factor. (Enter the profit factor.)
:::solution
The gains sum to $0.06$ and the absolute loss is $0.08$, so the profit factor is $0.06/0.08 = 0.75$. The win rate is $6/7$, which is above one half, and the profit factor is below $1$. The sum of the simple returns is $-0.02$. The compound return is negative as well, but the question asks for the profit factor. A high win rate did not put the profit factor above $1$, because the definition uses sizes.
:::
:::

:::exercise Four small gains do not survive one loss of a tenth {level=3 check="-0.063456"}
The simple returns are $0.01$, $0.01$, $0.01$, $0.01$ and $-0.10$, and the account is fully invested. Compute the compound simple return, rounded to six decimal places. (Enter the compound simple return.)
:::hint
Multiply the five gross returns $1.01$, $1.01$, $1.01$, $1.01$ and $0.90$. Do not add the simple returns. The sum is $-0.06$, and the product is a different number.
:::
:::solution
$(1.01)^4 = 1.04060401$, and $1.04060401 \times 0.90 = 0.936543609$, so the compound simple return is

$$
0.936543609 - 1 = -0.063456
$$

to six decimal places. The win rate is $4/5 = 0.80$, which is above one half. The profit factor is $0.04/0.10 = 0.40$, which is below $1$. The sum of the simple returns is $-0.06$, slightly less negative than the compound return. [[#prop-pf]] is this pattern with different magnitudes. The account result is the product.
:::
:::

:::exercise Infinite profit factor, small product {level=3 check="0.010045"}
Ten steps each have simple return $0.001$, and there are no other steps. Compute the compound simple return, rounded to six decimal places. In the solution, state the profit factor. (Enter the compound simple return.)
:::hint
The profit factor is a statement about signs and bucket sums. With no negative step the denominator is zero. The compound return is still $(1.001)^{10} - 1$, which you can compute directly.
:::
:::solution
$(1.001)^{10} - 1 = 0.010045$ to six decimal places. Every step is a win, so the win rate is $1$ and the absolute sum of losses is $0$. The profit factor is infinite by [[#def-pf]]. A ten-step gain of about $1$ per cent is compatible with that infinity. The infinity records that the loss bucket was empty. It does not record that the gains were large. The same reading is what O03's reported infinite profit factor demands: ask what was counted as a unit, and do not treat the symbol as a large CAGR. The catalogue CAGR on that row is a separate reported number, $+2.70$ per cent, and it is not this exercise's $0.010045$.
:::
:::
