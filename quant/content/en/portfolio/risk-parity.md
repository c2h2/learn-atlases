Inverse volatility gives a quiet name a larger weight than a noisy one, and it stops there. It never asks how much of the book's variance each name actually produces. That question needs the covariance, not only the diagonal. Equal risk contribution — the usual meaning of risk parity in this chapter — chooses weights so that those variance contributions match. On a diagonal covariance the solution is inverse volatility again. With two assets it is inverse volatility even when the correlation is not zero, because the cross term cancels. With three or more assets, unequal correlations move the weights. A cap on a single weight moves them again, by force, and then the contributions no longer match.

Equal risk contribution is a constraint one can write down. It is not a portfolio this atlas is recommending, and a cap is not a suggestion to hold any sector.

## Variance contributions

Let $w$ be a column of weights and let $\Sigma$ be a covariance matrix of simple returns, estimated with a stated window and a stated divisor, and fixed before the weights are used. The portfolio variance is the scalar

$$
\sigma_p^2 = w^{\mathsf T}\Sigma w = \sum_i w_i\,(\Sigma w)_i.
$$

The $i$-th term in that sum is the piece this chapter will equalise.

:::definition Risk contribution {#def-rc}
The **variance contribution** of name $i$ is

$$
\mathrm{RC}_i(w) = w_i\,(\Sigma w)_i.
$$

The contributions add to $\sigma_p^2$. The **marginal contribution** of name $i$ to variance is the partial derivative $\partial(w^{\mathsf T}\Sigma w)/\partial w_i = 2(\Sigma w)_i$, so $\mathrm{RC}_i = w_i$ times half of that marginal. If $\sigma_p > 0$, the contribution of name $i$ to volatility $\sigma_p$ is $w_i\,(\Sigma w)_i/\sigma_p$, which is $\mathrm{RC}_i/\sigma_p$. Equalising the $\mathrm{RC}_i$ equalises the volatility contributions, because $\sigma_p$ does not depend on $i$.
:::

:::definition Equal risk contribution {#def-erc}
A fully invested long-only portfolio is an **equal-risk-contribution** portfolio, or **ERC** portfolio, when $w_i > 0$, $\sum_i w_i = 1$, and

$$
\mathrm{RC}_i(w) = \mathrm{RC}_j(w) \qquad\text{for all names } i,j.
$$

Each name then contributes $\sigma_p^2/n$ to variance. Maillard, Roncalli and Teïletche (2010) show that when $\Sigma$ is positive definite this portfolio exists and is unique. The examples below use that uniqueness when a symmetry argument needs a single solution. We do not re-prove the general existence theorem.
:::

Qian's 2005 note argued for allocating by risk contribution rather than by capital. The definition above is the equal-contribution special case: capital weights may differ, and the products $w_i(\Sigma w)_i$ may not. "Risk parity" is also used, loosely, for inverse volatility. This chapter keeps the two names apart except where a proposition says they coincide.

:::proposition Diagonal ERC is inverse volatility {#prop-diag}
Assume $\Sigma = \operatorname{diag}(\sigma_1^2,\ldots,\sigma_n^2)$ with every $\sigma_i > 0$, and assume $w_i > 0$ with $\sum_i w_i = 1$. Then $\mathrm{RC}_i(w) = w_i^2\sigma_i^2$. These contributions are equal if and only if $w_i\sigma_i$ is the same for every $i$, which is the inverse-volatility rule

$$
w_i = \frac{1/\sigma_i}{\sum_j 1/\sigma_j}.
$$
:::

:::proof
On a diagonal matrix, $(\Sigma w)_i = \sigma_i^2 w_i$, so $\mathrm{RC}_i = w_i\cdot\sigma_i^2 w_i = w_i^2\sigma_i^2$. Setting $w_i^2\sigma_i^2 = w_j^2\sigma_j^2$ and taking positive square roots, $w_i\sigma_i = w_j\sigma_j$. Hence $w_i = c/\sigma_i$ for a single constant $c$. The constraint $\sum_i w_i = 1$ forces $c = 1\big/\sum_j(1/\sigma_j)$, which is [[portfolio/inverse-volatility-and-targets]] at gross budget $1$. Conversely, any such $w$ has $w_i\sigma_i = c$ and therefore $w_i^2\sigma_i^2 = c^2$ for every $i$.
:::

The diagonal case is the one people compute by hand, and it is easy to confuse with a different classical book. Minimum variance does not equalise the contributions.

:::proposition Diagonal minimum variance {#prop-minvar}
Assume the same diagonal $\Sigma$, and minimise $w^{\mathsf T}\Sigma w$ subject to $\sum_i w_i = 1$, with no sign restriction. The unique solution is

$$
w_i = \frac{1/\sigma_i^2}{\sum_j 1/\sigma_j^2}.
$$

Every $w_i$ is positive, so the same vector is the solution if non-negativity is added. The variance contributions $w_i^2\sigma_i^2$ are not equal unless every $\sigma_i$ is equal.
:::

:::proof
Let $V = \sum_i w_i^2\sigma_i^2$. Substitute $w_n = 1 - \sum_{i<n} w_i$ and differentiate in $w_k$ for $k < n$:

$$
\frac{\partial V}{\partial w_k} = 2 w_k\sigma_k^2 - 2 w_n\sigma_n^2.
$$

Setting the derivative to zero gives $w_k\sigma_k^2 = w_n\sigma_n^2$ for each $k$, so $w_i\sigma_i^2$ is constant across $i$. Thus $w_i \propto 1/\sigma_i^2$, and the budget fixes the constant as in the display. After the substitution, the Hessian in the free weights has diagonal entries $2\sigma_k^2 + 2\sigma_n^2$ and off-diagonal entries $2\sigma_n^2$. For a non-zero step $x$ in those free coordinates,

$$
x^{\mathsf T} H x = 2\sum_{k<n}\sigma_k^2 x_k^2 + 2\sigma_n^2\Bigl(\sum_{k<n} x_k\Bigr)^2 > 0,
$$

so $H$ is positive definite. The critical point is the unique minimum. For the contributions: $w_i^2\sigma_i^2 = w_i\cdot(w_i\sigma_i^2) = w_i\cdot c$, which varies with $i$ whenever the weights do.
:::

:::example Inverse volatility and minimum variance disagree {#ex-minvar}
Volatilities $0.10$ and $0.20$, diagonal covariance, weights summing to $1$. Compute the ERC weights and the minimum-variance weights, and the variance contribution of each name under the minimum-variance weights.
:::solution
By [[#prop-diag]] the ERC weights are the inverse-volatility weights: raw scores $10$ and $5$, so

$$
w^{\mathrm{ERC}} = \bigl(\tfrac23,\tfrac13\bigr).
$$

Each variance contribution equals $(2/3)^2(0.10)^2 = 4/900 = 1/225$. The same figure comes from $(1/3)^2(0.20)^2$. Portfolio variance is $2/225$.

By [[#prop-minvar]] the minimum-variance raw scores are $1/(0.10)^2 = 100$ and $1/(0.20)^2 = 25$. The weights are $100/125 = 4/5$ and $25/125 = 1/5$:

$$
w^{\mathrm{MV}} = \bigl(\tfrac45,\tfrac15\bigr).
$$

Variance contributions: $(4/5)^2(0.10)^2 = 0.0064$ and $(1/5)^2(0.20)^2 = 0.0016$. They are not equal. The quieter name still gets more weight than under ERC — $4/5$ rather than $2/3$ — because minimum variance penalises variance with $1/\sigma^2$, not $1/\sigma$. Portfolio variance is $0.008$, which is smaller than $2/225 \approx 0.008889$, as it must be: ERC was not trying to minimise variance.
:::
:::

## Two assets, with a correlation

Let two volatilities be $\sigma_1$ and $\sigma_2$, and let the correlation be $\rho$ with $\abs{\rho} \le 1$. The covariance is

$$
\Sigma = \begin{pmatrix} \sigma_1^2 & \rho\sigma_1\sigma_2 \\ \rho\sigma_1\sigma_2 & \sigma_2^2 \end{pmatrix}.
$$

:::proposition Two assets: the cross term cancels {#prop-two}
Assume $\sigma_1 > 0$, $\sigma_2 > 0$ and $\abs{\rho} \le 1$. Among weights with $w_1 > 0$, $w_2 > 0$ and $w_1 + w_2 = 1$, the ERC condition holds if and only if $w_1\sigma_1 = w_2\sigma_2$, that is

$$
w_1 = \frac{\sigma_2}{\sigma_1+\sigma_2}, \qquad w_2 = \frac{\sigma_1}{\sigma_1+\sigma_2}.
$$

The correlation does not appear. For two assets, ERC and inverse volatility coincide on every admissible $\rho$.
:::

:::proof
Expand the contributions:

$$
(\Sigma w)_1 = \sigma_1^2 w_1 + \rho\sigma_1\sigma_2 w_2, \qquad (\Sigma w)_2 = \rho\sigma_1\sigma_2 w_1 + \sigma_2^2 w_2.
$$

Set $w_1(\Sigma w)_1 = w_2(\Sigma w)_2$:

$$
w_1^2\sigma_1^2 + \rho\sigma_1\sigma_2 w_1 w_2 = \rho\sigma_1\sigma_2 w_1 w_2 + w_2^2\sigma_2^2.
$$

The two middle terms are identical, so they cancel, leaving $w_1^2\sigma_1^2 = w_2^2\sigma_2^2$. Positive weights give $w_1\sigma_1 = w_2\sigma_2$. Together with $w_1+w_2 = 1$ this is the displayed formula, which is inverse volatility. Every step reverses, so the condition is necessary and sufficient. The value of $\rho$ never enters the reduced equation. It does enter $\sigma_p^2$ itself: the level of portfolio variance depends on correlation, the split of that variance between the two names does not, once the weights are these ones.
:::

So the sentence "correlation breaks inverse volatility" is false for two assets. It becomes true as soon as there are three assets and the correlations are not all the same. Before that numerical break, the two-asset arithmetic is worth seeing in full, because symmetry and the cancellation look similar and are not.

:::example Equal volatilities, correlation one half {#ex-sym}
Let $\sigma_1 = \sigma_2 = 0.10$ and $\rho = 0.5$. Show that $w = (1/2,1/2)$ is the ERC portfolio, and compute each variance contribution and the portfolio volatility.
:::solution
The covariance is

$$
\Sigma = \begin{pmatrix} 0.01 & 0.005 \\ 0.005 & 0.01 \end{pmatrix},
$$

since $\rho\sigma_1\sigma_2 = 0.5\cdot 0.10\cdot 0.10 = 0.005$. By symmetry of $\Sigma$ and uniqueness of the positive ERC portfolio, the two weights are equal, so each is $1/2$. [[#prop-two]] gives the same answer because the volatilities are equal. Check the contributions directly:

$$
\Sigma w = \begin{pmatrix} 0.01\cdot\tfrac12 + 0.005\cdot\tfrac12 \\ 0.005\cdot\tfrac12 + 0.01\cdot\tfrac12 \end{pmatrix} = \begin{pmatrix} 0.0075 \\ 0.0075 \end{pmatrix}.
$$

Each $\mathrm{RC}_i = (1/2)\cdot 0.0075 = 0.00375$. Portfolio variance is $0.0075 = 3/400$, and $\sigma_p = \sqrt{3}/20 \approx 0.086603$.

On a diagonal covariance the same weights would have variance $2\cdot(1/2)^2\cdot 0.01 = 0.005$. The correlation raised the variance and did not move the weights. That is [[#prop-two]], not a numerical accident.
:::
:::

:::example Unequal volatilities, same correlation {#ex-asym}
Now let $\sigma_1 = 0.10$, $\sigma_2 = 0.20$ and $\rho = 0.5$, still with weights summing to $1$. Find the ERC weights. Show that equal weights are not ERC. Compute the ERC portfolio volatility.
:::solution
[[#prop-two]] does not look at $\rho$. The weights are $0.20/(0.10+0.20) = 2/3$ and $0.10/0.30 = 1/3$. The covariance is

$$
\Sigma = \begin{pmatrix} 0.01 & 0.01 \\ 0.01 & 0.04 \end{pmatrix},
$$

because $\rho\sigma_1\sigma_2 = 0.5\cdot 0.10\cdot 0.20 = 0.01$. At $w = (2/3,1/3)$,

$$
\Sigma w = \begin{pmatrix} 0.01\cdot\tfrac23 + 0.01\cdot\tfrac13 \\ 0.01\cdot\tfrac23 + 0.04\cdot\tfrac13 \end{pmatrix} = \begin{pmatrix} 0.01 \\ 0.02 \end{pmatrix},
$$

and the contributions are $(2/3)\cdot 0.01 = 1/150$ and $(1/3)\cdot 0.02 = 1/150$. They match. Portfolio variance is $1/75$, so $\sigma_p = \sqrt{3}/15 \approx 0.115470$.

At equal weights $w = (1/2,1/2)$,

$$
(\Sigma w)_1 = 0.01,\qquad (\Sigma w)_2 = 0.025,
$$

so the contributions are $0.005$ and $0.0125$. They do not match. Equal capital is not equal risk once the volatilities differ, correlation or not. The correlation changed the variance relative to the diagonal book of [[#ex-minvar]] — there $\sigma_p^2 = 2/225 \approx 0.008889$, here $1/75 \approx 0.013333$ — and it did not change the ERC weights.
:::
:::

The figure shows those two contributions as functions of the weight on the quieter name. They meet at $2/3$.


On a diagonal covariance the equal-risk-contribution weights are the inverse-volatility weights. The figure is that diagonal case. Volatilities 0.10 and 0.20 give weights 2/3 and 1/3, and the two variance shares match. Turn on a correlation, in the sense of leaving the diagonal, and this picture stops being the general ERC solution. The figure cannot draw that off-diagonal case. It draws the case the proposition solves.

:::widget weights
s1: 0.10
s2: 0.20
s3: 0
target: 0.10
caption: Variance shares are equal because the book is diagonal: weight times volatility is the same for both names. That is inverse volatility, which is equal risk contribution only in this case. The narrow bars are a volatility-target scale. A scale above 1 is arithmetic, not a suggestion to borrow.
:::
:::widget plot
f: 0.01*x; (1-x)*(0.04-0.03*x)
x: 0.05, 0.95
hlines: 0.006667
caption: Variance contributions for volatilities $0.10$ and $0.20$ with correlation $0.5$, as the weight on the quieter name runs from near $0$ to near $1$. The curves meet at weight $2/3$, where each contribution is $1/150$. The meeting point is the ERC weight, not a holding this atlas recommends.
:::

## Where correlation does move the weights

Equal pairwise correlations restore inverse volatility for any number of names. If $(\Sigma)_{ij} = \rho\sigma_i\sigma_j$ for $i \ne j$, and $w_i = c/\sigma_i$ with the same $c$ for every $i$, then $\sigma_i w_i = c$ and

$$
(\Sigma w)_i = (1-\rho)\sigma_i^2 w_i + \rho\sigma_i\sum_j \sigma_j w_j = (1-\rho)\sigma_i c + \rho\sigma_i\,(nc),
$$

so $\mathrm{RC}_i = w_i(\Sigma w)_i = (1-\rho)c^2 + \rho n c^2$, the same for every $i$. The budget fixes $c$. Unequal correlations have no such common value, and the inverse-volatility vector stops being ERC.

:::example Three assets, one pair correlated {#ex-three}
Three names, each with volatility $0.10$. The correlation between the first and the second is $0.5$. The third name is uncorrelated with each of the others. The covariance is positive definite (its eigenvalues are $0.005$, $0.01$ and $0.015$). Find the ERC weights and compare them with equal weight, which is the inverse-volatility solution because the volatilities match.
:::solution
Uniqueness plus the symmetry that swaps the first two names forces their ERC weights to be equal. Set $w_1 = w_2 = a$ and $w_3 = 1-2a$, with $0 < a < 1/2$. The covariance is $0.01$ times the correlation matrix, so

$$
(\Sigma w)_1 = 0.01 a + 0.005 a = 0.015 a, \qquad (\Sigma w)_3 = 0.01(1-2a).
$$

Equal contributions:

$$
a\cdot 0.015 a = (1-2a)\cdot 0.01(1-2a).
$$

That is $0.015 a^2 = 0.01(1-2a)^2$, or $3a^2 = 2(1-2a)^2$. The positive root with $1-2a > 0$ is

$$
a\sqrt{3} = (1-2a)\sqrt{2}, \qquad a = \frac{\sqrt{2}}{\sqrt{3}+2\sqrt{2}} = \frac{4-\sqrt{6}}{5}.
$$

The last step rationalises the denominator: $\sqrt{2}(\sqrt{3}-2\sqrt{2})/(3-8) = (4-\sqrt{6})/5$. Numerically $a \approx 0.310102$. The third weight is

$$
w_3 = 1-2a = \frac{2\sqrt{6}-3}{5} \approx 0.379796.
$$

So the ERC weights are about $(0.310102,\ 0.310102,\ 0.379796)$. The uncorrelated name gets more weight than either member of the correlated pair. Inverse volatility, blind to correlation, would have said $(1/3,1/3,1/3)$.

At those equal weights the contributions are not equal. $(\Sigma w)_1 = 0.015/3 = 0.005$, so $\mathrm{RC}_1 = (1/3)\cdot 0.005 = 1/600$. And $\mathrm{RC}_3 = (1/3)\cdot(0.01/3) = 1/900$. Since $1/600 \ne 1/900$, equal capital is not ERC. The arithmetic was checked by solving the same quadratic in Python. The weights are a worked example of the condition in [[#def-erc]], not a book to hold.
:::
:::

:::warning Two assets hide the correlation
After [[#ex-asym]] it is tempting to say "risk parity is just inverse volatility, and the correlation only changes the risk". That sentence is [[#prop-two]], and it stops at two names. [[#ex-three]] is the correction: same volatilities, unequal correlations, weights $0.310$ and $0.380$ rather than $1/3$. A backtest that says "risk parity" without saying whether it used the diagonal formula or the full covariance has not said which map it ran.
:::

## A cap breaks the solution

A per-name cap is a further constraint, $w_i \le c$. If the unconstrained ERC weight already respects the cap, the cap does nothing. If it does not, the capped book is not the ERC book. The contributions that [[#def-erc]] equalised become unequal, unless some other adjustment happens to restore them, which a plain cap does not promise.

:::example A thirty per cent cap on four names {#ex-cap}
Four names, volatilities $0.10$, $0.10$, $0.20$, $0.20$, diagonal covariance. Inverse volatility, hence ERC, gives weights proportional to $10,10,5,5$, that is $(1/3,1/3,1/6,1/6)$. Impose a cap of $0.30$ on every weight, keep the weights non-negative and summing to $1$, and give the two capped names the cap. Split the residual equally across the two names that were symmetric and have room under the cap. Compute the new variance contributions.
:::solution
Each unconstrained weight $1/3 \approx 0.3333$ exceeds $0.30$ by $1/3-0.30 = 1/30$. Two such names produce an excess of $1/15$ to reallocate. The other two weights are equal, so each receives half of $1/15$, which is $1/30$. Their new weight is $1/6 + 1/30 = 0.20$. The capped vector is

$$
w = (0.30,\ 0.30,\ 0.20,\ 0.20).
$$

These add to $1$, and each coordinate is at most $0.30$.

On the diagonal, unconstrained contributions were all $(1/3)^2(0.10)^2 = 1/900$, and the same $1/900$ from $(1/6)^2(0.20)^2$. After the cap:

$$
(0.30)^2(0.10)^2 = 0.0009, \qquad (0.20)^2(0.20)^2 = 0.0016.
$$

The quiet names now contribute less variance than the noisy names. The cap did what it was specified to do — no weight above $0.30$ — and it destroyed equality of $\mathrm{RC}_i$. Portfolio variance rises from $4/900 \approx 0.004444$ to $2\cdot 0.0009 + 2\cdot 0.0016 = 0.005$. A cap is not a free improvement to the ERC objective. It is a different feasible set.
:::
:::

## Two catalogue rows

The figures in this section are **as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026**. This atlas has **not** re-run the backtests. Reported Sharpes are theirs.

W19, "Risk Parity Multi Asset", is equal risk contribution across a multi-asset basket. Daily bars, $19$ years. Reported total return $+84.5\%$, CAGR $+3.28\%$, Sharpe $0.16$, maximum drawdown $-35.6\%$, win rate $60.9\%$, profit factor $1.34$. The row says equal risk contribution. It does not publish the covariance, the window, or the divisor. A reader cannot reconstruct [[#ex-three]] from the dashboard. The modest reported CAGR and the reported Sharpe of $0.16$ sit next to a maximum drawdown of $-35.6\%$. That drawdown is part of the row. It is not a reason to take the other side of the rule, and it is not a reason to drop every risk-parity specification on sight. It is one experiment.

W20, "Risk Parity Capped", is sector ERC chained with a $25\%$ per-position cap. Daily bars, $26$ years. Reported total return $+677\%$, CAGR $+8.21\%$, Sharpe $0.45$, maximum drawdown $-47.9\%$, win rate $82\%$, profit factor $11.14$. The cap is part of the specification: whenever an unconstrained weight would exceed one quarter, the held weight is not the pure solution of [[#def-erc]]. The dashboard does not say on which dates the cap bound. The rule is written so that it can bind, in the sense of [[#ex-cap]], and the catalogue describes the book as ERC chained with that cap. We do not invent a date on which it bound.

The profit factor $11.14$, beside an $82\%$ win rate, is not portable. A profit factor in a weight backtest depends on how a win is defined — a day, a name, a rebalance — and the single percentage does not identify the unit. [[performance/win-rate-and-profit-factor]] is where that ratio is defined. Do not treat $11.14$ as a typical property of risk parity, capped or otherwise. The same row reports a maximum drawdown of $-47.9\%$. A large profit factor has not described the worst peak-to-trough fall. W19 and W20 differ in universe, span, cap and reported path. Adding their CAGRs, or picking the larger one, is not an analysis.

:::remark Between two classical books
Maillard, Roncalli and Teïletche place the long-only ERC portfolio between the minimum-variance portfolio and the equal-weight portfolio, in a sense they make precise with a diversification measure. [[#ex-minvar]] is the diagonal illustration: minimum variance used $4/5$, ERC used $2/3$, and equal weight would have used $1/2$ on the quieter name. The order $4/5 > 2/3 > 1/2$ matches that picture for this pair. It is not a theorem we have proved for every covariance, and it is not advice to sit in the middle.
:::

:::history
Qian's 2005 research note put risk contribution, rather than capital, at the centre of the allocation. Maillard, Roncalli and Teïletche, in the Journal of Portfolio Management in 2010, characterised the portfolio whose weights equalise those contributions and located it between minimum variance and equal weight. Both papers are about a constraint on weights given a covariance. Neither paper chooses a security for the reader of this atlas, and the catalogue rows above are later, separate experiments with their own clocks and constraints. The $25\%$ cap in W20 is one such constraint. It is not in the 2010 characterisation of the unconstrained ERC portfolio.
:::

:::quiz
For two assets, $\sigma_1 = 0.10$, $\sigma_2 = 0.20$, $\rho = 0.5$, which statement is correct?
- [ ] ERC weights cannot be computed until a numerical solver uses $\rho$.
- [ ] Equal weights are ERC, by symmetry of the correlation.
- [x] ERC weights are $2/3$ and $1/3$, and $\rho$ cancels out of the ERC equation.
- [ ] ERC weights equal the minimum-variance weights $4/5$ and $1/5$.
:::solution
[[#prop-two]] cancels the cross term, so the weights are inverse-volatility weights, $2/3$ and $1/3$. Symmetry would force equal weights only if the two volatilities were equal, as in [[#ex-sym]]. Minimum variance on the diagonal uses $1/\sigma^2$ and gives $4/5$ and $1/5$; the correlation was not part of that calculation, and those weights do not equalise $\mathrm{RC}_i$ in [[#ex-asym]].
:::
:::

:::quiz
What does a binding per-name cap do to an ERC book?
- [ ] It keeps every variance contribution equal and only reduces turnover.
- [x] The weights that hit the cap are no longer the unconstrained ERC weights, and the variance contributions need not match.
- [ ] It is the same object as inverse volatility.
- [ ] It forces the profit factor above $10$.
:::solution
[[#ex-cap]] starts from equal contributions and, after a cap of $0.30$, has contributions $0.0009$ and $0.0016$. A profit factor is not a consequence of a cap. W20's reported profit factor is one catalogue cell, not a property of the constraint.
:::
:::

## Where this leads

A weight that equalises $\mathrm{RC}_i$ on Monday does not keep equalising them once prices move and no trade happens. The drift of a weight, and the rules that refuse to trade until a band, a turnover budget or a drawdown threshold says so, are [[portfolio/drift-turnover-and-breakers]]. The long-only restriction used in [[#def-erc]] is one feasible set; dollar neutrality and beta neutrality are others, in [[portfolio/long-only-and-neutral]]. Covariance itself, as a matrix of $\Cov$ rather than as a risk budget, is [[statistics/moments-and-dependence]].

:::summary
- The variance contribution of name $i$ is $w_i(\Sigma w)_i$. ERC makes these equal, with positive weights summing to $1$.
- On a diagonal covariance, ERC is inverse volatility, $w_i \propto 1/\sigma_i$. Minimum variance is $w_i \propto 1/\sigma_i^2$, and its contributions are not equal.
- For two assets the correlation term cancels. ERC weights stay $\sigma_2/(\sigma_1+\sigma_2)$ and $\sigma_1/(\sigma_1+\sigma_2)$ for every admissible $\rho$.
- With $\sigma = 0.10$ and $0.20$ and $\rho = 0.5$, the ERC weights are still $2/3$ and $1/3$. Equal weights give contributions $0.005$ and $0.0125$, which do not match.
- With three equal volatilities and only one correlated pair, ERC puts weight about $0.379796$ on the uncorrelated name and about $0.310102$ on each of the others, not $1/3$.
- A cap that binds replaces the ERC vector. In the four-name diagonal example, $0.30$ and $0.20$ replace $1/3$ and $1/6$, and the contributions become $0.0009$ and $0.0016$.
- W19 reports CAGR $+3.28\%$, Sharpe $0.16$, maximum drawdown $-35.6\%$. W20 chains ERC with a $25\%$ cap and reports profit factor $11.14$ beside maximum drawdown $-47.9\%$. That profit factor is not portable.
:::

## Exercises

:::exercise The noisy ERC weight {level=1 check="1/3"}
Diagonal covariance, volatilities $0.10$ and $0.20$, weights positive and summing to $1$. What is the ERC weight on the name with volatility $0.20$? (Enter a fraction.)
:::solution
[[#prop-diag]] says the weights are inverse-volatility weights, $2/3$ and $1/3$. The noisier name gets $1/3$.
:::
:::

:::exercise Equal volatilities, two names {level=1 check="1/2"}
Two names, equal volatility, any correlation in $[-1,1]$, ERC weights summing to $1$. What is the weight on the first name? (Enter a fraction.)
:::solution
[[#prop-two]] gives $\sigma/(\sigma+\sigma) = 1/2$. The correlation does not appear. Symmetry gives the same answer.
:::
:::

:::exercise Minimum-variance weight {level=1 check="4/5"}
Diagonal covariance, volatilities $0.10$ and $0.20$. What is the minimum-variance weight on the quieter name? (Enter a fraction.)
:::solution
Raw scores are $1/0.01 = 100$ and $1/0.04 = 25$. The quieter weight is $100/125 = 4/5$. This is not the ERC weight, which would be $2/3$.
:::
:::

:::exercise Portfolio variance at the symmetric point {level=2 check="0.0075"}
Volatilities $0.10$ and $0.10$, correlation $0.5$, weights $(1/2,1/2)$. What is the portfolio variance? (Enter a decimal.)
:::solution
$\Sigma w = (0.0075,\ 0.0075)^{\mathsf T}$ and $w^{\mathsf T}\Sigma w = 0.0075$. Each contribution is $0.00375$, and the two contributions add to the variance.
:::
:::

:::exercise Equal capital, unequal risk {level=2 check="0.0075"}
Volatilities $0.10$ and $0.20$, correlation $0.5$, weights $(1/2,1/2)$. The variance contributions are $0.005$ and $0.0125$. What is the second minus the first? (Enter a decimal.)
:::solution
$0.0125 - 0.005 = 0.0075$. The gap is zero only at the ERC weights $2/3$ and $1/3$, not at equal weights. The number $0.0075$ here is a gap between contributions, not the portfolio variance of [[#ex-sym]].
:::
:::

:::exercise After the cap {level=2 check="0.2"}
Diagonal ERC weights are $(1/3,1/3,1/6,1/6)$. A cap of $0.30$ binds on the first two names, and the excess is split equally onto the last two. What is one of those last two weights? (Enter a decimal.)
:::solution
Excess per capped name: $1/3 - 0.30 = 1/30$. Total excess $1/15$. Half of that, added to $1/6$, is $1/6 + 1/30 = 5/30 + 1/30 = 6/30 = 0.2$.
:::
:::

:::exercise The uncorrelated name {level=3 check="0.379796"}
Use the three-asset ERC problem of [[#ex-three]]: equal volatilities $0.10$, correlation $0.5$ on the first pair only. What is the ERC weight on the third name, to six decimal places? (Enter the six-decimal approximation.)
:::hint
Set the first two weights equal to $a$ by symmetry. Solve $3a^2 = 2(1-2a)^2$ with $a < 1/2$. The third weight is $(2\sqrt{6}-3)/5$.
:::
:::solution
The derivation in [[#ex-three]] gives $w_3 = (2\sqrt{6}-3)/5 \approx 0.379796$. The other two weights are each $(4-\sqrt{6})/5 \approx 0.310102$, and the three sum to $1$. Equal weight would have been $1/3 \approx 0.333333$ on the third name, which leaves contributions $1/600$ and $1/900$ and is not ERC.
:::
:::

:::exercise A diagonal ERC variance {level=3 check="0.01125"}
Volatilities $0.10$ and $0.30$, diagonal covariance, ERC weights summing to $1$. What is the portfolio variance? (Enter a decimal.)
:::hint
ERC weights are proportional to $1/\sigma$. On a diagonal covariance the two variance contributions are equal, and each equals $(w_i\sigma_i)^2$. Add them.
:::
:::solution
Weights: $0.30/0.40 = 3/4$ and $0.10/0.40 = 1/4$. Then $w_i\sigma_i = 0.075$ for both names, so each variance contribution is $0.075^2 = 0.005625$. Portfolio variance is $2\times 0.005625 = 0.01125$. Check: $(3/4)^2(0.10)^2 + (1/4)^2(0.30)^2 = 0.005625 + 0.005625 = 0.01125$.
:::
:::
