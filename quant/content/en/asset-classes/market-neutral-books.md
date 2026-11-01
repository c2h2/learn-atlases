Dollar neutrality sets the sum of the weights to zero. Beta neutrality sets the weighted sum of betas to zero. On two names with different betas those are different lines, and they meet only at the origin. A book can satisfy one and miss the other. A borrow fee on the negative weight changes the result again, whether or not a published page mentions the fee.

This chapter puts the library's pair pages and ranking pages in that frame. Each of them has a short leg in the catalogue's description. The short leg is part of the published rule. It is not an instruction to short a share, a fund, a currency, or a futures contract, and this chapter never turns a loss on one side into a recommendation to hold the other. Capacity — how large the book could have been before its own trading moved the price — is a question the library pages do not answer.

## Two constraints

Betas below are given numbers, not estimates. A beta that is not tied to a window and a benchmark is not yet a constraint; in the algebra the number is simply an input called \(\beta_i\).

:::definition Dollar neutrality {#def-dollar}
Weights are **dollar neutral** when \(\sum_i w_i = 0\). The **gross** exposure is \(g = \sum_i |w_i|\). A usual scale in the examples is \(g = 1\), so a two-name dollar-neutral book is \((1/2, -1/2)\) or \((-1/2, 1/2)\). The one-period simple-return contribution, before costs, is \(\sum_i w_i R_i\). That contribution is not a return on gross, and not a return on a long-only net asset value, until the specification says which denominator is used. Here it is reported as a fraction of the net asset value the weights were defined on.
:::

:::definition Beta neutrality {#def-beta}
Given betas \(\beta_i\), weights are **beta neutral** when \(\sum_i w_i \beta_i = 0\). Dollar neutrality is not this statement unless every beta equals the same constant, or the weights are all zero. A long-only book, \(w_i \ge 0\), can be beta neutral only in trivial cases, because a sum of non-negative terms \(w_i \beta_i\) is zero only if each term is zero when betas are positive. Market-neutral examples in this chapter therefore use a negative weight. The negative weight is a coordinate in a linear constraint. It is not a trade recommendation.
:::

:::proposition Only the zero book meets both lines {#prop-only-zero}
Suppose two assets have betas \(\beta_1 \neq \beta_2\). The only weights that are both dollar neutral and beta neutral are \(w_1 = w_2 = 0\).
:::

:::proof
Dollar neutrality gives \(w_2 = -w_1\). Beta neutrality then gives \(\beta_1 w_1 + \beta_2 (-w_1) = (\beta_1 - \beta_2)\, w_1 = 0\). Since \(\beta_1 - \beta_2 \neq 0\), it follows that \(w_1 = 0\), and then \(w_2 = 0\). The two equations are independent when the betas differ: the coefficient matrix has determinant proportional to \(\beta_2 - \beta_1 \neq 0\), so the only solution of the homogeneous system is zero. A gross budget \(g = 1\) cannot be added on top without dropping one of the two neutrality conditions, or adding a third asset.
:::

:::corollary Equal betas collapse the two constraints {#cor-equal}
If \(\beta_1 = \beta_2 = \beta\), then every dollar-neutral pair is beta neutral, because \(\beta w_1 + \beta w_2 = \beta\,(w_1 + w_2) = 0\). The converse is not free: beta neutrality at a common beta \(\beta \neq 0\) also forces \(w_1 + w_2 = 0\), so the two constraints coincide. If \(\beta = 0\) for both names, every weight is beta neutral and dollar neutrality is a separate demand.
:::

The long-only one-period bound does not survive a negative weight. With weights \((1/2, -1/2)\) and simple returns \(0.01\) and \(-0.10\), the contribution is

$$
\frac12 \times 0.01 + \left(-\frac12\right) \times (-0.10) = 0.005 + 0.05 = 0.055,
$$

which lies outside the interval from \(-0.10\) to \(0.01\). A fully invested long-only book cannot print that number. The calculation is a diagnostic about the constraint. It is not a reason to choose the negative weight, and the returns are invented.

:::example Two names, gross one {#ex-two}
Betas are \(1.2\) and \(0.8\). Find a dollar-neutral pair with gross \(1\) and a positive weight on the first name. Find a beta-neutral pair with gross \(1\) and a positive weight on the first name. Compute the beta of the dollar-neutral pair and the net dollar sum of the beta-neutral pair.
:::solution
Dollar neutrality and gross \(1\) with \(w_1 > 0\) give \(w_1 = 1/2\), \(w_2 = -1/2\). The portfolio beta is

$$
1.2 \times \frac12 + 0.8 \times \left(-\frac12\right) = 0.6 - 0.4 = 0.2,
$$

not zero. The pair is dollar neutral and not beta neutral.

Beta neutrality gives \(1.2\, w_1 + 0.8\, w_2 = 0\), so \(w_2 = -1.5\, w_1\). Gross \(1\) and \(w_1 > 0\) give \(w_1 + 1.5\, w_1 = 2.5\, w_1 = 1\), hence \(w_1 = 0.4\) and \(w_2 = -0.6\). Check beta: \(1.2 \times 0.4 + 0.8 \times (-0.6) = 0.48 - 0.48 = 0\). The net dollar sum is \(0.4 + (-0.6) = -0.2\), not zero. The pair is beta neutral and not dollar neutral. [[#prop-only-zero]] said both could not happen together unless the weights vanish. They do not happen together here. The opposite sign pattern, \((-0.4, 0.6)\), is the other beta-neutral gross-\(1\) solution. It is the same line with the signs flipped, not a second economic idea, and it is not a preferred trade.
:::
:::

:::quiz
Betas are \(1.2\) and \(0.8\). Which weight pair is dollar neutral but not beta neutral?
- [ ] \((0.4, -0.6)\)
- [x] \((0.5, -0.5)\)
- [ ] \((0, 0)\)
- [ ] \((0.6, 0.4)\)
:::solution
\((0.5, -0.5)\) sums to zero, so it is dollar neutral, and its beta is \(0.2 \neq 0\). The pair \((0.4, -0.6)\) is beta neutral and sums to \(-0.2\). The zero pair meets both constraints and fails a gross of \(1\). The pair \((0.6, 0.4)\) is long-only.
:::
:::

## Borrow on the short leg

A negative weight is a short position in the accounting of the book. The shares, if they are shares, have to be borrowed, and the borrow has a fee. The fee in the examples is \(0.5\%\) of short notional per year, written \(b = 0.005\). That rate is a hypothetical easy-borrow figure for the arithmetic. It is not a quote for any named stock. Names that are hard to borrow cost more, sometimes much more. If a period is not a year, \(0.005\) is the wrong input until it is scaled.

:::algorithm Net of a borrow fee {#alg-borrow}
Inputs: weights \(w_i\), same-period simple returns \(R_i\), and a borrow rate \(b\) for that period, charged on start-of-period short notional.
1. Price contribution: \(\sum_i w_i R_i\).
2. Short fraction: \(\sum_{i:\, w_i < 0} |w_i|\).
3. Fee: \(b\) times the short fraction. Subtract it. Do not subtract \(b\) times gross, unless every unit of gross is short, which it is not.
4. Assumptions: no rebate on short-sale proceeds, no extra financing charge on the long leg, and a simple rather than a continuously compounded fee. If the library page does not report a borrow fee, do not claim the reported result includes one, and do not claim it was zero. Silence is not a measurement.
:::

:::example The same returns, two constraints {#ex-borrow}
Next simple returns are \(0.04\) and \(0.01\), on the betas \(1.2\) and \(0.8\). The period is a year. The borrow rate is \(0.005\) on the short fraction. Using the gross-\(1\) pairs from [[#ex-two]], compute the price contribution and the net of borrow for the dollar-neutral pair and for the beta-neutral pair \((0.4, -0.6)\).
:::solution
Dollar-neutral price contribution:

$$
\frac12 \times 0.04 + \left(-\frac12\right) \times 0.01 = 0.02 - 0.005 = 0.015.
$$

The short fraction is \(1/2\), so the fee is \(0.005 \times 1/2 = 0.0025\). Net is \(0.015 - 0.0025 = 0.0125\).

Beta-neutral price contribution:

$$
0.4 \times 0.04 + (-0.6) \times 0.01 = 0.016 - 0.006 = 0.010.
$$

The short fraction is \(0.6\), so the fee is \(0.005 \times 0.6 = 0.003\). Net is \(0.010 - 0.003 = 0.007\).

The two nets differ because the constraints differ and because the short fractions differ. Neither net is a forecast. Dropping the fee would have left \(0.015\) and \(0.010\), which are the numbers a page can print when step 3 of [[#alg-borrow]] is omitted. The omission is visible only if the specification says the fee is zero or says the fee is absent. A blank cell does not say either.
:::
:::

With three assets the two neutrality conditions no longer force the zero book. They are two equations in three unknowns. A scale condition closes the system.

:::example Three names, then a fee on a flat price result {#ex-three}
Betas are \(1.2\), \(0.8\), and \(1.0\). Weights proportional to \((1, 1, -2)\) are dollar neutral and beta neutral. Scale them to gross \(1\). Then apply next simple returns \(0.03\), \(0.01\), and \(0.02\), and a borrow rate \(0.005\) on the short fraction. Compute the price contribution and the net.
:::solution
The unscaled weights sum to \(1 + 1 - 2 = 0\). The beta is \(1.2 \times 1 + 0.8 \times 1 + 1.0 \times (-2) = 1.2 + 0.8 - 2 = 0\). Gross of \((1, 1, -2)\) is \(4\). Dividing by \(4\) gives \((1/4, 1/4, -1/2)\), still neutral on both lines, with gross \(1\).

The price contribution is

$$
\frac14 \times 0.03 + \frac14 \times 0.01 + \left(-\frac12\right) \times 0.02 = 0.0075 + 0.0025 - 0.010 = 0.
$$

The short fraction is \(1/2\). The fee is \(0.0025\). The net is \(0 - 0.0025 = -0.0025\). Both neutralities held, the weighted price return was zero, and the book still lost the borrow fee. A reported result that ignores the fee would show a flat book. The flatness was the prices. The fee is a second line. This is why a page that does not mention borrow cannot be read as a net-of-borrow track record.
:::
:::

:::widget rowreduce
matrix: 1,1,1,0; 6,4,5,0; 1,0,0,1
augmented: true
caption: Step through to reduced form. The first row is dollar neutrality. The second is five times beta neutrality for betas 1.2, 0.8 and 1.0. The third sets the first weight to 1. You should read off weights 1, 1 and -2, then divide by gross 4 if you want gross 1. The figure is a linear system, not a forecast and not a list of names to short.
:::

The widget's third row is a scale, not a market. Clearing it produces the unscaled triple in [[#ex-three]]. Two assets cannot host that non-zero solution, which is [[#prop-only-zero]] again: the analogous two-column system with a zero right-hand side reduces to the zero weights.

:::example One period, two rankings {#ex-rank}
Four invented names are ordered by a past return that is used only to rank them. The highest past return is name A, the lowest is name D. The next simple returns, which the weights must not use in advance, are \(-0.04\) for A and \(+0.08\) for D. Rule H assigns \(+1/2\) to A and \(-1/2\) to D. Rule L assigns \(+1/2\) to D and \(-1/2\) to A. Borrow is \(0.005\) on a short fraction of \(1/2\). Compute both nets. Do not treat either rule as a trade.
:::solution
Rule H, the past-winner long and the past-loser short, contributes

$$
\frac12 \times (-0.04) + \left(-\frac12\right) \times 0.08 = -0.02 - 0.04 = -0.06
$$

before the fee, and \(-0.06 - 0.0025 = -0.0625\) after it. Rule L, the opposite assignment, contributes

$$
\frac12 \times 0.08 + \left(-\frac12\right) \times (-0.04) = 0.04 + 0.02 = 0.06
$$

before the fee, and \(0.06 - 0.0025 = 0.0575\) after it. The two rules are different specifications. On this one invented period they disagree by a wide margin, and the borrow fee does not flip either sign. One period is not a test. Choosing rule L because this period favoured it would be choosing the rule after seeing the next returns, which is the illegal clock. The past returns never entered the profit; they only chose the weights. Using them as if they were the \(R_i\) in \(\sum w_i R_i\) is a second, separate mistake.
:::
:::

:::warning Neutrality is not a fee waiver
A dollar-neutral or beta-neutral label does not set the borrow fee to zero, and it does not put the book return back inside the long-only range. The \(0.055\) contribution earlier in the chapter is outside the two asset returns precisely because of the negative weight. Subtracting a fee makes the net \(0.0525\) on that invented pair, still outside the range, and still not a suggestion to hold the pair. The other slip is verbal. "Short the loser" in a catalogue line is a description of a published ranking. Repeating it as advice uses a textbook as a broker. This book is not a broker.
:::

## Four library books with a short leg

W13, W14, W15, and W16 are the open library's market-neutral examples: two pair books and two ranking books. The pair construction is owned in the reversion course, and the ranking clocks are owned with momentum and with cross-sectional reversal. This chapter's job is the short leg: neutrality, borrow, and the fact that a reported summary can sit next to a fee the one-line entry never mentions. The figures are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests. Reported Sharpes are their numbers, not a verification that they match our excess-return convention. None of the four pages is a recommendation to short the names in the rule.

W13 is a market-neutral pair on KO and PEP using a log-ratio z-score, daily, over 26 years. The reported total return is \(+48.8\%\), the reported CAGR is \(+1.54\%\), the reported Sharpe is \(-0.05\), the maximum drawdown is \(-23.6\%\), the win rate is \(49.1\%\), and the profit factor is \(1.14\). W14 is a market-neutral pair on EWA and EWC using a rolling ordinary-least-squares hedge ratio, also 26 years. The reported total return is \(+12.4\%\), the reported CAGR is \(+0.45\%\), the reported Sharpe is \(-0.30\), the maximum drawdown is \(-14.3\%\), the win rate is \(50.2\%\), and the profit factor is \(1.06\).

A positive total return beside a negative reported Sharpe is possible for more than one reason: a risk-free rate inside their Sharpe, a volatility large relative to a small mean, or a convention this atlas has not seen. The chapter does not pick a reason and does not "correct" the Sharpe. The two numbers are allowed to stand. What they do not stand for is a clean market-neutral profit that has already paid borrow. The catalogue lines do not mention a borrow fee. The reported result may omit one. It may also include a fee the one-line entry does not repeat. [[#alg-borrow]] is the question to ask, not a number to paste into their CAGR.

W15 is long the top three and short the bottom three names by 12-month return, monthly, over 26 years. The reported total return is \(+1.3\%\), the reported CAGR is \(+0.05\%\), the reported Sharpe is \(-0.24\), the maximum drawdown is \(-25.4\%\), the win rate is \(49.4\%\), and the profit factor is \(1.00\). W16 is long the losers and short the winners by one-month return, weekly, over 26 years. The reported total return is \(-1.7\%\), the reported CAGR is \(-0.07\%\), the reported Sharpe is \(-0.24\), the maximum drawdown is \(-33.7\%\), the win rate is \(47.5\%\), and the profit factor is \(1.00\). Profit factors reported as \(1.00\) mean that, on whatever unit the page used, gains and losses nearly balanced. The CAGRs are near zero. That near-flatness is not a proof that the opposite ranking would have been flat too: costs and borrow need not be symmetric. In [[#ex-rank]] the two price contributions are exact opposites, and the same borrow fee pulls both nets down, so the pair of nets is no longer symmetric about zero. Over 26 years the catalogue's W15 and W16 are simply both close to flat on the reported CAGR, with large drawdowns relative to those CAGRs. Flipping W16's sign because the total return is negative would be a new experiment that had already seen W16.

The names KO, PEP, EWA, and EWC appear because they are the instruments in those published rules. Listing them is not a suggestion to trade the pair, and it is not a statement that the pair is easy to borrow. The \(0.5\%\) hypothetical fee was not estimated from those names.

:::intuition Gross is the short leg's denominator
Dollar neutrality makes the long notionals and the short notionals match, so with gross \(1\) the short fraction is \(1/2\). Beta neutrality with unequal betas moves that fraction, as \(-0.6\) did against \(+0.4\). The fee cares about the absolute short weight, not about whether the beta sum was zero. A reader who checks only \(\sum w_i \beta_i = 0\) and then compounds \(\sum w_i R_i\) has checked the constraint and skipped [[#alg-borrow]]. Both checks belong in the specification. Passing one is not passing the other.
:::

## Capacity is a question, not a cell in the table

The library pages do not say how large a book could have been before its orders moved the price. They do not report a participation rate or a volume series. A toy makes the missing input obvious. Suppose a rule refuses to exceed \(5\%\) of a day's share volume, the price is \(40\) units of account, and that day's volume is \(1\,000\,000\) shares. Then the share cap is \(0.05 \times 1\,000\,000 = 50\,000\) shares, and the dollar cap is \(50\,000 \times 40 = 2\,000\,000\). Change the \(5\%\), the volume, or the price, and the cap changes. None of those three numbers is in the W13–W16 catalogue lines. The \(2\,000\,000\) is not an estimate for any named pair. It is the arithmetic of a constraint the pages do not state.

Gatev, Goetzmann, and Rouwenhorst, in the *Review of Financial Studies* in 2006, published a pairs rule whose matching, entry, exit, and delay are explicit enough to argue with. That standard of specification is what a market-neutral book owes the reader. It is not a return series this chapter is allowed to invent, and it is not W13. W13 is a different pair rule on a different page. Conflating them because both say "pairs" is how a careful paper becomes a ticker.

:::remark What a hedge ratio is not
W14's hedge ratio is a rolling regression coefficient used to size one leg against the other. A hedge ratio of \(h\) means the specification sets the relative weights from \(h\). It does not mean the book is beta neutral against the equity market unless \(h\) was estimated as that beta, on a stated benchmark, and the weights were constrained to it. Dollar neutrality, beta neutrality, and a regression hedge are three sentences. A page that says only "market neutral" has not chosen among them. [[#ex-two]] is the demonstration that the first two sentences already disagree.
:::

:::history
The 2006 pairs study of Evan Gatev, William Goetzmann, and K. Geert Rouwenhorst is the specification standard this chapter points at: the match, the entry, the exit, and the delay are written down, so a reader can argue with them. Dollar and beta constraints are older portfolio facts; the point of stating them again is the two-name impossibility in [[#prop-only-zero]], which a "market neutral" label often skips. The library pages W13 to W16 are much later teaching examples, not that 2006 paper, and their reported summaries include drawdowns and, in W16's case, a negative total return. A fully specified rule can still lose. Specification is how you know what lost. It is not a promise of the other sign.
:::

## Where this leads

A book that has survived this course still needs a written specification: universe, clock, formula, weights, costs, and the statistic being claimed. That list is [[research-craft/writing-a-specification]]. Pair construction in more detail is [[reversion/pairs-and-spreads]], and the long-only contrast is [[portfolio/long-only-and-neutral]]. The futures and FX chapters are where a short leg is a contract sign or a quote sign rather than a borrowed share. In every case the sign in the weight is a coordinate. It is not an order this atlas is placing, and it is not an order it is asking you to place.

:::summary
- Dollar neutrality is \(\sum w_i = 0\). Beta neutrality is \(\sum w_i \beta_i = 0\). With unequal betas and only two names, both hold only at the zero weights ([[#prop-only-zero]]).
- On betas \(1.2\) and \(0.8\), the gross-\(1\) dollar-neutral pair \((1/2, -1/2)\) has beta \(0.2\). The beta-neutral pair \((0.4, -0.6)\) has dollar sum \(-0.2\).
- A borrow fee is a rate times the short fraction. At \(0.005\) a year, the dollar-neutral example nets \(0.0125\) and the beta-neutral example nets \(0.007\), on invented returns \(0.04\) and \(0.01\).
- Three names allow both neutralities at once. Scaled to gross \(1\), weights \((1/4, 1/4, -1/2)\) can have a zero price contribution and still net \(-0.0025\) after borrow.
- A negative weight can put a one-period contribution outside the range of the asset returns. That fact does not select the short leg as a trade.
- W13, W14, W15, and W16 all have a short leg in the catalogue. Several report a positive total return beside a negative Sharpe; W16 reports a loss. None of the one-line entries states a borrow fee. This atlas has not re-run them and does not flip them.
- Capacity is not in those pages. A \(5\%\) volume cap is a hypothetical input, not a reported result. The 2006 pairs paper is a standard of specification, not a ticker list.
:::

## Exercises

:::exercise Beta of the dollar-neutral pair {level=1 check="0.2"}
Weights are \(1/2\) and \(-1/2\). Betas are \(1.2\) and \(0.8\). Compute the portfolio beta. (Enter the beta.)
:::solution
\(1.2 \times 1/2 + 0.8 \times (-1/2) = 0.6 - 0.4 = 0.2\). Dollar neutrality held. Beta neutrality did not.
:::
:::

:::exercise Dollar sum of the beta-neutral pair {level=1 check="-0.2"}
Weights are \(0.4\) and \(-0.6\). What is the sum of the weights? (Enter the sum.)
:::solution
\(0.4 + (-0.6) = -0.2\). The pair can still have beta zero, as in [[#ex-two]]. A zero beta is not a zero dollar sum.
:::
:::

:::exercise Dollar-neutral net of borrow {level=1 check="0.0125"}
The price contribution is \(0.015\). The short fraction is \(1/2\). The borrow rate is \(0.005\). Compute the net. (Enter the net.)
:::solution
The fee is \(0.005 \times 1/2 = 0.0025\). The net is \(0.015 - 0.0025 = 0.0125\).
:::
:::

:::exercise Beta-neutral price contribution {level=2 check="0.01"}
Weights are \(0.4\) and \(-0.6\). Next simple returns are \(0.04\) and \(0.01\). Compute the price contribution before any fee. (Enter that contribution.)
:::solution
\(0.4 \times 0.04 + (-0.6) \times 0.01 = 0.016 - 0.006 = 0.01\). The fee of \(0.003\) is a later subtraction, not part of this number.
:::
:::

:::exercise After the larger short {level=2 check="0.007"}
Start from the price contribution \(0.01\) in the previous exercise. The short fraction is \(0.6\) and the borrow rate is \(0.005\). Compute the net. (Enter the net.)
:::solution
The fee is \(0.005 \times 0.6 = 0.003\). The net is \(0.01 - 0.003 = 0.007\). The short fraction is larger than \(1/2\) because this pair is not dollar neutral.
:::
:::

:::exercise A flat price result {level=2 check="-0.0025"}
A three-name book has price contribution \(0\) and short fraction \(1/2\). The borrow rate is \(0.005\). Compute the net. (Enter the net.)
:::solution
The fee is \(0.0025\). The net is \(0 - 0.0025 = -0.0025\). Neutrality of the prices does not pay the borrow.
:::
:::

:::exercise A ranking and a fee {level=3 check="-0.0625"}
A past return is used only to rank. The past winner's next simple return is \(-0.04\). The past loser's next simple return is \(+0.08\). Weights are \(+1/2\) on the past winner and \(-1/2\) on the past loser. Borrow is \(0.005\) on the short fraction. Compute the net. The negative weight is the rule's output on this hypothetical rank, not an instruction. (Enter the net.)
:::hint
Do not multiply the weights by the past returns. The short leg's next return is \(+0.08\), and a negative weight times a positive return is a loss. The price contribution is \(-0.06\). Then subtract \(0.005 \times 1/2\).
:::
:::solution
Price contribution: \((1/2) \times (-0.04) + (-1/2) \times 0.08 = -0.02 - 0.04 = -0.06\). Fee: \(0.0025\). Net: \(-0.06 - 0.0025 = -0.0625\). The opposite ranking is a different rule and was not asked for.
:::
:::

:::exercise Equal betas do not waive the fee {level=3 check="0.0275"}
Both betas are \(1.1\). Weights are \(1/2\) and \(-1/2\), so the pair is dollar neutral and, by [[#cor-equal]], beta neutral. Next simple returns are \(0.05\) and \(-0.01\). Borrow is \(0.005\) on the short fraction \(1/2\). Compute the net of borrow. (Enter the net.)
:::hint
Equal betas make the beta zero. The question does not ask for the beta. It asks for the net return. The second weight is negative and the second return is negative, so that leg contributes a profit before the fee. Then subtract \(0.0025\).
:::
:::solution
Price contribution: \((1/2) \times 0.05 + (-1/2) \times (-0.01) = 0.025 + 0.005 = 0.030\). Fee: \(0.0025\). Net: \(0.030 - 0.0025 = 0.0275\). The portfolio beta is \(1.1 \times 1/2 + 1.1 \times (-1/2) = 0\), which confirms [[#cor-equal]] and is not the answer string.
:::
:::
