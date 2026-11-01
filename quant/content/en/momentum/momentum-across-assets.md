The sentences in the earlier chapters did not mention shares. They mentioned a past return, a rank or a sign, and a weight. Those sentences can be read over a currency pair. Reading them over a currency pair is not the same thing as obtaining the same sign of result. In this library, the three FX momentum pages that belong to this chapter are negative over the windows they report. A negative published result is part of the record. It is not an instruction to take the opposite trade, and it is not a forecast that the next window will be negative either. It is evidence about those specifications, those quotes, those costs and those years.

The two sentences stay distinct when the instrument changes. Time-series momentum still looks at a pair's own past return. Cross-sectional momentum still ranks a universe of pairs and holds the strongest against the weakest. A loss on one of those pages is not a result about the other. Mixing them into "FX momentum" and then flipping the sign is two mistakes at once.

## The same two sentences, pointed at a quote

W23 is six-month time-series momentum on USD-quoted spot pairs, with inverse-volatility weights. W24 is long the strongest and short the weakest XXX/USD pair, monthly. The first is a diary, one sign per pair, of the kind defined in [[momentum/two-kinds-of-momentum]] and already studied as trend. The second is a ranking, of the kind defined in the same chapter, with the extreme pair on each side rather than a deep winner set and a deep loser set. O19 is a further specification: whole lots, on USD-quoted spot pairs. What a USD quote means, and what a lot is, is finished in [[asset-classes/foreign-exchange]] and in [[orders/lots-contracts-and-intraday]]. This chapter does not re-derive the contract. It owns the sign of the published results, and the refusal to turn that sign around.

"USD-quoted" and "XXX/USD" are the catalogue's words. Reversing a quote reverses which direction a long position wants. That is one reason a reader does not get to invent the opposite trade from a dashboard: the opposite of a printed return is not even well specified until the quote convention is. The instrument chapter is where that convention is unpacked. Here it is enough to leave the library's wording alone.

## Inverse-volatility weights, both long

The portfolio course derives the inverse-volatility map and the separate question of a volatility target. The only case needed here is the two-asset arithmetic already fixed in the shared notes. If two assets have positive volatility estimates $0.10$ and $0.20$, the raw inverse weights are $10$ and $5$, and dividing by their sum $15$ gives $2/3$ and $1/3$.

:::definition Inverse-volatility weights for a long book {#def-invvol}
Suppose a time-series signal has already chosen a set of assets to hold long, and a volatility estimate $\sigma_i > 0$ is known for each of them at the decision date. The **inverse-volatility weight** is
$$
w_i = \frac{1/\sigma_i}{\sum_j 1/\sigma_j}.
$$
The weights are positive and sum to $1$. The window inside $\sigma_i$, and the horizon inside the sign that selected the set, are part of the specification. W23 uses a six-month sign and an inverse-volatility map together. This definition is only the map.
:::

If some signs are short, the signed raw score is $\sgn(F_i)/\sigma_i$, and one common normalisation divides by the sum of the absolute raw scores so that the gross exposure is $1$. That signed map is not the $2/3$, $1/3$ example. The example is the long book, both signals positive, which is the case the shared notes computed. A negative own past return would have removed a pair from [[#def-invvol]] or flipped its sign in the signed map. Say which rule you are using. W23's one-line description says inverse-vol weights on a trend rule, which in the trend sense can be short. The toy below is the easier object: both weights positive. The signed map is recorded next so that a negative own past return has a weight, rather than being silently dropped.

:::definition Signed inverse-volatility weights {#def-signed}
Let each asset have a time-series sign $s_i \in \{-1,+1\}$ and a volatility estimate $\sigma_i > 0$, both known at $t$. The raw score is $s_i/\sigma_i$. The **signed inverse-volatility weight** divides by the sum of the absolute raw scores,
$$
w_i = \frac{s_i/\sigma_i}{\sum_j |s_j|/\sigma_j},
$$
so that $\sum_i |w_i| = 1$. If every sign is $+1$, this is the same vector as [[#def-invvol]]. If any sign is $-1$, the weights are no longer all positive, and their sum need not be $1$.
:::

:::example Two pairs, weights $2/3$ and $1/3$ {#ex-inv}
Pair Low has volatility $0.10$ and pair High has volatility $0.20$. Both time-series signals are long. The next simple returns are $+0.01$ for Low and $-0.05$ for High. Compute the inverse-volatility weights and the portfolio simple return. Compute the equal-weight portfolio return on the same two returns.
:::solution
Raw inverses: $1/0.10 = 10$ and $1/0.20 = 5$. The sum is $15$. The weights are $10/15 = 2/3$ and $5/15 = 1/3$.
$$
R_p = \frac23(0.01) + \frac13(-0.05) = \frac{0.02}{3} - \frac{0.05}{3} = \frac{-0.03}{3} = -0.01.
$$
Equal weights, $1/2$ and $1/2$, give
$$
\frac12(0.01) + \frac12(-0.05) = 0.005 - 0.025 = -0.020.
$$
The inverse-volatility book lost one percentage point. The equal-weight book lost two. The larger loss sat on the smaller weight, so the weighted book lost less *on these two numbers*. That is arithmetic. It is not a reason to prefer the inverse-volatility map, it is not a description of W23, and it is not a suggestion to hold either pair. W23's reported result, quoted below, is a loss over sixteen years, not a one-period damping story.
:::
:::

A common next return would not have favoured either map. If both pairs had returned $+0.03$, both books would have returned $+0.03$, because both weight vectors sum to one. The gap between $-0.01$ and $-0.020$ is entirely the disagreement about how to share a *difference* in returns. Inverse volatility is a scale choice inside a sign rule. It is not a third kind of momentum.

## Why the printed loss does not flip

Suppose, for one period, the gross portfolio return is $g = \sum_i w_i R_i$, before a cost drag. Suppose the drag $\kappa > 0$ depends on turnover, and the sign-flipped weights $-w$ have the same absolute trades, so they pay the same $\kappa$. This is a modelling assumption about the cost, not a measured spread. It is already enough to block the slogan.

:::proposition The flipped book is not the negated net {#prop-flip}
Under the cost assumption just stated, the net returns satisfy
$$
\mathrm{net}(-w) = -\mathrm{net}(w) - 2\kappa.
$$
If $\kappa$ is unknown, $-\mathrm{net}(w)$ is not a reported profit for the opposite book. If $\kappa = 0$, the one-period nets are exact negatives, and the compound return over more than one period is still not the negative of the original compound return.
:::

:::proof
Write $\mathrm{net}(w) = g - \kappa$ and $\mathrm{net}(-w) = -g - \kappa$. Then
$$
\mathrm{net}(-w) = -g - \kappa = -(g - \kappa) - 2\kappa = -\mathrm{net}(w) - 2\kappa.
$$
The negated net overstates the flipped book's net by twice the drag. That is the one-period claim.

If $\kappa = 0$, then $\mathrm{net}(-w) = -g = -\mathrm{net}(w)$ in that single period. Over two periods the original compound return is $(1+g_1)(1+g_2)-1$, so its negation is $1 - (1+g_1)(1+g_2) = -(g_1+g_2) - g_1 g_2$. The flipped compound return is $(1-g_1)(1-g_2)-1 = -(g_1+g_2) + g_1 g_2$. These are equal only when $g_1 g_2 = 0$. A non-zero product of the two gross returns breaks the negation. Compounding does not commute with a change of sign.
:::

The cross term in that proof is the whole point, and a clean pair of numbers makes it harder to skip. The next example puts the cost back in as well.

:::example One period, then two {#ex-cost}
Take $g = -0.010$ and $\kappa = 0.002$ for a single period. Compute the original net, the flipped net, and the naive negation of the original net.

Then take two periods with gross returns $-0.010$ and $-0.020$, and the same $\kappa = 0.002$ in each period. Compute the compound net return of the original book and of the flipped book, to six decimal places.
:::solution
One period: the original net is $-0.010 - 0.002 = -0.012$. The flipped gross return is $+0.010$, so the flipped net is $0.010 - 0.002 = 0.008$. The naive negation of the original net is $+0.012$. The gap is $0.012 - 0.008 = 0.004 = 2\kappa$, which is [[#prop-flip]].

Two periods, original nets: $-0.012$ and $-0.022$. The wealth relative is $0.988 \times 0.978$. 
$$
0.988 \times 0.978 = 0.966264, \qquad 0.966264 - 1 = -0.033736.
$$
Flipped nets: $+0.008$ and $+0.018$. The wealth relative is $1.008 \times 1.018 = 1.026144$, so the compound return is $0.026144$. The naive negation of the original compound return would have been $+0.033736$. The flipped book, even before anyone argues about the quote convention, compounds to $0.026144$, not to $0.033736$. And none of these figures is a library result. They are the identity, with the cost written down. W23's cost drag is not reported as a separate cell, so the identity cannot be evaluated on that page. That is a reason to stop, not a reason to assume $\kappa = 0$ and flip the sign anyway.
:::
:::

:::example Two periods with no cost at all {#ex-nocost}
Keep gross returns $-0.010$ and $-0.020$, and set $\kappa = 0$. What is the compound return of the flipped book? What is the negation of the original compound return?
:::solution
The flipped simple returns are $+0.010$ and $+0.020$. The compound return is $1.01 \times 1.02 - 1 = 1.0302 - 1 = 0.0302$.

The original wealth relative is $0.99 \times 0.98 = 0.9702$, so the original compound return is $-0.0298$. Its negation is $+0.0298$, which is not $0.0302$. The gap is the cross term from the proof: the difference between $(1-g_1)(1-g_2) - 1$ and $-\bigl((1+g_1)(1+g_2) - 1\bigr)$ equals $2 g_1 g_2 = 2(0.010)(0.020) = 0.0004$, and $0.0302 - 0.0298 = 0.0004$. Zero costs repair the one-period slogan and leave the multi-period slogan false.
:::
:::

## Three negative pages

The figures below are as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026. This atlas has not re-run any of the three backtests, and it has not verified the annualisation inside the reported Sharpes. Where the catalogue prints a dash, the statistic is not reported. Win rate and profit factor are unreported for all three FX rows. This lesson does not fill them in.

W23, six-month time-series momentum on USD-quoted spot pairs, inverse-volatility weights, daily bars, $16$ years: total return $-27.3\%$, CAGR $-1.97\%$, reported Sharpe $-0.59$, maximum drawdown $-29.4\%$.

W24, long the strongest and short the weakest XXX/USD pair, monthly, daily bars, $16$ years: total return $-34.1\%$, CAGR $-2.58\%$, reported Sharpe $-1.00$, maximum drawdown $-41.4\%$.

O19, contract-aware whole-lot momentum on USD-quoted spot pairs, daily bars, $16$ years: total return $-14.2\%$, CAGR $-0.95\%$, reported Sharpe $-0.71$, maximum drawdown $-15.3\%$.

All three signs are negative. The magnitudes do not agree, and the disagreement is informative. A six-month sign with inverse-volatility weights, a monthly cross-sectional extreme pair, and a whole-lot constraint are three experiments. O19's milder reported loss is not evidence that "using lots fixes the sign", and it is not a suggestion to trade lots. Whole-lot rounding is an instrument constraint. It changes the book relative to a fractional weight, which is why the reported path can differ from W23's without either page having been misread. Averaging $-0.59$, $-1.00$ and $-0.71$ into one FX-momentum Sharpe would commit the same error this course has been refusing since the first chapter: different signals, one label.

Nor does the common sign license the opposite book. [[#prop-flip]] already fails the slogan inside a single period once a positive drag is admitted, and it fails the slogan across periods even when the drag is zero. On top of that algebra, the opposite of W23 is not the opposite of W24. Reversing a time-series sign rule and reversing a long-strongest short-weakest rule are different new strategies. The library reports neither. A cross-market research average is a third object again. Asness, Moskowitz and Pedersen, in the Journal of Finance in 2013, studied value and momentum together across asset classes, currencies included among them. That paper is not W23's sixteen-year USD-quoted specification, and W23 is not that paper. A negative library page does not cancel a published cross-market average. A cross-market average does not cancel a negative library page. This chapter refuses both cancellations.

:::example The cross-sectional sentence, on three invented pairs {#ex-cs}
Three pairs have formation returns $+0.07$, $+0.01$ and $-0.04$. The cross-sectional rule is W24's sentence scaled to a toy: long the strongest and short the weakest at weights $+1/2$ and $-1/2$, middle weight $0$. The next simple returns are $-0.02$, $+0.01$ and $+0.03$. What is the portfolio return?

The time-series signs of the same formation returns are $+$, $+$ and $-$. Give each name absolute weight $1/3$, so the gross exposure is $1$, and compute that book's return on the same next returns.
:::solution
Cross-sectional weights: $(+1/2,\ 0,\ -1/2)$.
$$
R^{\mathrm{cs}} = (1/2)(-0.02) + (-1/2)(0.03) = -0.010 - 0.015 = -0.025.
$$
Time-series weights: $(+1/3,\ +1/3,\ -1/3)$.
$$
R^{\mathrm{ts}} = \frac{-0.02 + 0.01 - 0.03}{3} = \frac{-0.04}{3} = -0.013333\ldots,
$$
which is $-0.013333$ to six decimal places. The middle pair is flat in the extreme-pair book and long in the sign book. That is the same disagreement as in the equity chapter, moved onto pairs. Both toy returns are negative because the next returns were chosen that way, not because W24 had to come out negative. W24's negativity is a sixteen-year reported compound result. One invented month is not a backtest, and a backtest that lost money is not repaired by a toy that might have been given happier next returns.
:::
:::

:::warning Do not trade the minus sign
A reported return of $-27.3\%$ is not a reported return of $+27.3\%$ on the other side, and a reported Sharpe of $-1.00$ is not an invitation to hold the opposite weights. Costs do not change sign when the book does. Quotes do not interpret themselves. The three pages differ from each other by more than a sign. The only use of the minus signs in this chapter is to keep them: the published FX momentum examples in this library, over the windows printed, lost money. What a reader does with a currency is not a topic of the atlas.
:::

:::quiz
Which reading of W23 is justified by the library row?
- [ ] The reported return is positive once the sign of a USD quote is repaired
- [ ] A negative reported Sharpe means the opposite weights are a positive-Sharpe strategy
- [x] The page reports a loss: total return $-27.3\%$, CAGR $-1.97\%$, reported Sharpe $-0.59$, over $16$ years, and the opposite book is not on the page
- [ ] The missing win rate can be inferred from the Sharpe
:::solution
The row is negative on every reported performance cell, and the win rate is a dash, so it is not reported and cannot be inferred from the Sharpe. Repairing a quote, or flipping a weight, would be a new experiment. [[#prop-flip]] says even the arithmetic of "just change the sign" fails once costs or compounding enter.
:::
:::

:::quiz
In [[#ex-cost]], with $g = -0.010$ and $\kappa = 0.002$, the flipped one-period net is which number?
- [ ] $+0.012$, the negation of the original net
- [x] $+0.008$, the flipped gross return minus the same drag
- [ ] $-0.008$, because a negative page must stay negative
- [ ] $0$, because costs cancel the gross return exactly
:::solution
The flipped gross return is $+0.010$. Subtracting $\kappa = 0.002$ leaves $+0.008$. The negation of the original net is $+0.012$, which overstates the flipped net by $2\kappa = 0.004$. The third option confuses a library sign with an identity: the flipped toy is positive, and that positivity is still not a recommendation and not a library result.
:::
:::

:::widget markov
matrix: 0.85,0.15; 0.30,0.70
states: Calm; Stress
steps: 24
caption: A two-state sketch, the same illustrative chain as the statistics course. From the calm state the chance of stress next step is 0.15. A window that happens to be calm is not evidence about the stress state, and the chain is not an estimated model of FX momentum. It is not a timing signal.
:::

The stationary distribution of this chain is derived in [[statistics/stationarity-and-regimes]], and it is not re-derived here. The one-step fact is enough for the warning. A sample path that stays calm for a while is compatible with a transition probability of $0.15$ into stress. Sixteen quiet years would not have proved the stress state empty, and sixteen losing years do not prove the next year is a loss. The library rows are reports on the windows they name. They are not a Markov model, and the widget is not a fit to them.

:::intuition Same words, different instrument, different page
Nothing in the rank, the sign or the inverse-volatility formula used the word "equity". That is why the sentences travel. The results did not travel with them, on these three pages, in the direction a reader who has just come from an equity momentum paper might expect. Holding both thoughts at once is the chapter. The sentences are portable. The sign of a particular backtest is not a property of the sentences. It is a property of the page.
:::

:::remark Gross exposure when a sign is negative
[[#def-invvol]] sums the weights to one because every selected name is long. A signed inverse-volatility rule that is short one pair and long another does not sum to one. It needs a stated gross exposure, just as the winner-minus-loser map needed one. Using $2/3$ and $1/3$ for a book that is actually short the high-volatility pair would be a sign error, not a weighting subtlety. The toy in [[#ex-inv]] states that both signals are long so that the shared $2/3$, $1/3$ figures apply.
:::

:::application What O19 is allowed to teach
O19's reported total return is $-14.2\%$ and its reported maximum drawdown is $-15.3\%$, milder on both cells than W23. The specification is whole lots rather than fractional inverse-volatility weights. A reader who stops at "milder" and concludes that lot-sizing is the version to run has turned a comparison of two losing pages into a selection. Both pages lost money over the reported window. The less negative one is still negative. Selection among losing specifications, using the same window that produced the losses, is a search. The validation course is where searches are priced. This chapter's job is to leave the minus signs where the catalogue put them.
:::

:::history
Asness, Moskowitz and Pedersen, Journal of Finance, 2013, studied value and momentum jointly across markets and asset classes, including currencies, and the correlation between the two premia. The paper is the reason a course that started with US equities owes a chapter to other instruments. It is not a performance claim about the library's FX pages, and those pages are not a refutation of the paper. They are a different construction on a different sample. Daniel and Moskowitz's crash evidence, from 2016, is not restated here as an FX regression. Crashes remain a fact about the winner-minus-loser payoff in the samples that paper studies. They are not a product, on equities or on pairs.
:::

## Where this leads

The inverse-volatility map, and the different act of scaling a whole book to a volatility target, is [[portfolio/inverse-volatility-and-targets]]. Quote conventions, lots and the rest of the instrument live in [[asset-classes/foreign-exchange]]. The crash shape that an average can hide, including on the way into a rebound, is [[momentum/momentum-crashes]]. The refusal to treat two Sharpes with the same nickname as one experiment started in [[momentum/two-kinds-of-momentum]].

:::summary
- Time-series momentum on a currency pair uses that pair's own past sign. Cross-sectional momentum ranks pairs. W23 is the first sentence with inverse-volatility weights. W24 is the second, long the strongest and short the weakest. They are not one strategy.
- Volatilities $0.10$ and $0.20$ give long-book weights $2/3$ and $1/3$. On next returns $+0.01$ and $-0.05$ the portfolio return is $-0.01$, against $-0.02$ for equal weights. That gap is a scale effect on these inputs, not a verdict on W23.
- If a positive turnover cost $\kappa$ is unchanged when every weight flips, the flipped net equals the negated net minus $2\kappa$. With $\kappa = 0$ the one-period nets flip exactly, and two-period compounds still do not: $-0.010$ then $-0.020$ compounds to $-0.0298$, while the flipped path compounds to $+0.0302$.
- As reported, and not re-run: W23 returned $-27.3\%$ (CAGR $-1.97\%$, reported Sharpe $-0.59$, maximum drawdown $-29.4\%$) over $16$ years; W24 returned $-34.1\%$ (CAGR $-2.58\%$, reported Sharpe $-1.00$, maximum drawdown $-41.4\%$); O19 returned $-14.2\%$ (CAGR $-0.95\%$, reported Sharpe $-0.71$, maximum drawdown $-15.3\%$). Win rates and profit factors are not reported. The signs are not to be flipped.
- A cross-market average in a 2013 paper and a negative sixteen-year library page are different objects. Neither cancels the other.
:::

## Exercises

:::exercise Inverse-volatility portfolio return {level=1 check="-0.01"}
Weights are $2/3$ on a pair that then returns $+0.01$ and $1/3$ on a pair that then returns $-0.05$. What is the portfolio simple return? (Enter a decimal.)
:::solution
$(2/3)(0.01) + (1/3)(-0.05) = 0.02/3 - 0.05/3 = -0.03/3 = -0.01$.
:::
:::

:::exercise Equal-weight return on the same pair {level=1 check="-0.02"}
The same two next returns, $+0.01$ and $-0.05$, are held at equal weights. What is the portfolio simple return? (Enter a decimal.)
:::solution
$(1/2)(0.01) + (1/2)(-0.05) = 0.005 - 0.025 = -0.020$, which as a two-decimal entry is $-0.02$. The inverse-volatility book lost less on this particular pair of returns. The lesson does not promote either weighting.
:::
:::

:::exercise Flipped net for one period {level=1 check="0.008"}
The gross return is $g = -0.010$ and the cost drag is $\kappa = 0.002$, paid again by the flipped book. What is the flipped book's net return? (Enter a decimal.)
:::solution
The flipped gross return is $+0.010$. Net of the drag: $0.010 - 0.002 = 0.008$. The negation of the original net would have been $-(-0.012) = 0.012$, which is larger by $0.004$.
:::
:::

:::exercise Extreme-pair toy {level=2 check="-0.025"}
Weights are $+1/2$, $0$ and $-1/2$. Next simple returns are $-0.02$, $+0.01$ and $+0.03$. What is the portfolio simple return? (Enter a decimal.)
:::solution
$(1/2)(-0.02) + 0 \cdot (0.01) + (-1/2)(0.03) = -0.01 - 0.015 = -0.025$. The middle return does not enter. That is the extreme-pair sentence, and it is not W24's sixteen-year result.
:::
:::

:::exercise Sign rule on the same three next returns {level=2 check="-0.013333"}
Weights are $+1/3$, $+1/3$ and $-1/3$. Next simple returns are $-0.02$, $+0.01$ and $+0.03$. What is the portfolio simple return, to six decimal places? (Enter the six-decimal number.)
:::solution
The signed sum of next returns is $-0.02 + 0.01 - 0.03 = -0.04$. Dividing by $3$ gives $-0.013333\ldots$, which is $-0.013333$ to six decimal places. This book is long the middle pair. The extreme-pair book was not. The returns differ.
:::
:::

:::exercise A common next return {level=2 check="0.03"}
Both pairs in a $2/3$, $1/3$ book have next simple return $+0.03$. What is the portfolio simple return? (Enter a decimal.)
:::solution
The weights sum to $1$, so $R_p = (2/3)(0.03) + (1/3)(0.03) = 0.03$. Equal weights would have given the same number. Inverse volatility does not change a return that both names share.
:::
:::

:::exercise Two-period flipped compound, with costs {level=3 check="0.026144"}
Gross returns are $-0.010$ and $-0.020$. Each period charges $\kappa = 0.002$ to the original book and the same $\kappa$ to the flipped book. What is the flipped book's compound net return? (Enter the number to six decimal places.)
:::hint
Flip each gross return first, then subtract $0.002$, then compound. The two net simple returns are $+0.008$ and $+0.018$. Do not negate the original compound return; that is the slogan [[#prop-flip]] rejects.
:::
:::solution
Flipped nets: $0.010 - 0.002 = 0.008$ and $0.020 - 0.002 = 0.018$. The wealth relative is $1.008 \times 1.018 = 1.026144$. The compound return is $1.026144 - 1 = 0.026144$. The original nets $-0.012$ and $-0.022$ compound to $-0.033736$, and the negation of that figure is not $0.026144$.
:::
:::

:::exercise Two-period flip with zero costs {level=3 check="0.0302"}
Gross returns are $-0.010$ and $-0.020$, and $\kappa = 0$. What is the compound return of the sign-flipped book? (Enter a decimal.)
:::hint
With zero costs the flipped simple returns are exactly $+0.010$ and $+0.020$. Compound those two numbers. Then, as a check rather than as the answer, compound the original returns and negate. The two calculations disagree by $0.0004$.
:::
:::solution
$1.01 \times 1.02 - 1 = 1.0302 - 1 = 0.0302$. The original compound return is $0.99 \times 0.98 - 1 = -0.0298$, and $-(-0.0298) = 0.0298 \neq 0.0302$. Even a costless one-line flip fails over two periods. A reported sixteen-year compound return is much further from a one-line flip than this toy is.
:::
:::
