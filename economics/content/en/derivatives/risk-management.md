A trading book has a loss over the next day, or the next ten days, that is a random variable. **Value at risk** (VaR) is a quantile of that variable: a number $L$ such that the loss exceeds $L$ with probability at most $1-\alpha$, on the model's distribution. **Expected shortfall** (ES) is the average of the losses beyond that quantile. Both are statistics of a distribution. Neither is a certificate that the book will not lose more, that the distribution is the right one, or that the firm is safe. Several crises have been, in part, a demonstration of those limits.

This chapter computes Gaussian VaR and ES on an illustrative book of value $W = 10{,}000{,}000$ with a daily return standard deviation of $1.5\%$ and a mean of zero. The one-day $99\%$ VaR comes out about $349{,}000$; the $99\%$ ES about $400{,}000$. It then treats historical and Monte Carlo VaR, mapping and Greeks, stress testing, and the record of 1998 and 2008. The tone of the atlas's finance pages holds: the calculations are education. They are not a recommendation to run a book at a VaR limit, to raise a limit, or to treat a green dashboard as a fact about the world.

## VaR as a quantile

:::definition Value at risk {#def-var}
Let $L$ be the loss of a portfolio over a stated horizon (a positive $L$ is a loss). For a **confidence level** $\alpha \in (0,1)$ — typically $0.95$ or $0.99$ — the **value at risk** is

$$
\operatorname{VaR}_\alpha = \inf\bigl\{ x : \Prob(L \le x) \ge \alpha \bigr\},
$$ {#eq-var}

the $\alpha$-quantile of $L$. Equivalently, $\Prob(L > \operatorname{VaR}_\alpha) \le 1-\alpha$. The probability is computed in a stated model, on a stated information set, for a stated horizon. Changing any of the three changes the number.
:::

VaR is in units of money. A one-day $99\%$ VaR of $349{,}000$ on the illustrative book means: under the model's distribution of one-day losses, $99\%$ of days have a loss less than or equal to $349{,}000$, and $1\%$ have a larger loss. It does not mean that the loss cannot be $2{,}000{,}000$. It does not mean that $1\%$ of days will lose *exactly* $349{,}000$. It does not mean that the model is true.

:::definition Expected shortfall {#def-es}
The **expected shortfall** (conditional value at risk, tail expectation) at level $\alpha$ is

$$
\operatorname{ES}_\alpha = \E\bigl[ L \bigm| L > \operatorname{VaR}_\alpha \bigr],
$$ {#eq-es}

when the distribution is continuous (the general definition uses an integral of VaRs). It is the mean of the loss in the tail that VaR only locates.
:::

ES asks “how bad, given that we are in the tail?”, which VaR refuses to ask. Artzner, Delbaen, Eber and Heath (1999) showed that VaR is not a **coherent** risk measure: it can penalise diversification, because a quantile of a sum is not the sum of the quantiles. ES, under mild conditions, is coherent. Regulation after 2016 (the Fundamental Review of the Trading Book) moved the market-risk standard from VaR toward ES. The move is a change of statistic. It is not a proof that the tail mean is correctly estimated.

:::proposition Gaussian VaR and ES {#prop-gaussian}
If the portfolio's loss over the horizon is $L = -W R$ with $R \sim N(\mu, \sigma^2)$ (so $\mu$ is the mean *return*, and a negative $R$ is a loss), then

$$
\operatorname{VaR}_\alpha = W\bigl( -\mu + \sigma\, z_\alpha \bigr),\qquad
\operatorname{ES}_\alpha = W\bigl( -\mu + \sigma\,\frac{n(z_\alpha)}{1-\alpha} \bigr),
$$ {#eq-gvar}

where $z_\alpha = N^{-1}(\alpha)$ and $n$ is the standard normal density. For $\mu = 0$, $\alpha = 0.99$, $z_{0.99} = 2.326$; for $\alpha = 0.95$, $z_{0.95} = 1.645$. Assumptions: a normal return, a fixed $W$, no optionality that would make $L$ a nonlinear function of $R$.
:::

:::proof
$R \le -x/W$ is the event $L \ge x$. $\Prob(R \le -\operatorname{VaR}/W) = 1-\alpha$ gives $-\operatorname{VaR}/W = \mu - \sigma z_\alpha$ when $\mu$ is the mean of $R$, hence the VaR formula. For ES, the mean of a left-truncated normal $R \mid R < \mu - \sigma z_\alpha$ is $\mu - \sigma n(z_\alpha)/(1-\alpha)$; multiplying by $-W$ gives the ES formula. The identities are textbook truncated-normal calculations.
:::

:::example House-number Gaussian VaR {#ex-gvar}
$W = 10{,}000{,}000$, $\mu = 0$, daily $\sigma = 0.015$. Compute one-day $95\%$ and $99\%$ VaR, and the matching ES.
:::solution
$z_{0.95} = 1.64485$, $z_{0.99} = 2.32635$. Then

$$
\operatorname{VaR}_{0.95} = 10{,}000{,}000 \times 0.015 \times 1.64485 = 246{,}728,
$$

$$
\operatorname{VaR}_{0.99} = 10{,}000{,}000 \times 0.015 \times 2.32635 = 348{,}952.
$$

The density values are $n(1.64485) = 0.10314$, $n(2.32635) = 0.02665$, so

$$
\operatorname{ES}_{0.95} = 10{,}000{,}000 \times 0.015 \times \frac{0.10314}{0.05} = 309{,}407,
$$

$$
\operatorname{ES}_{0.99} = 10{,}000{,}000 \times 0.015 \times \frac{0.02665}{0.01} = 399{,}782.
$$

The $99\%$ tail mean is about $15\%$ above the $99\%$ quantile, in this Gaussian world. In a heavy-tailed world the gap is larger, and the quantile itself is larger than $2.33\sigma$. The four numbers describe $N(0, 0.015^2)$, not a particular desk's next day.
:::
:::

:::example Ten-day square-root conversion {#ex-ten-day}
On the book of [[#ex-gvar]], convert the one-day $99\%$ VaR of $348{,}952$ to a ten-day $99\%$ VaR by the square-root-of-time rule.
:::solution
$\sqrt{10} \times 348{,}952 = 1{,}103{,}483$. Under i.i.d. normal returns the ten-day $\sigma$ is $\sqrt{10}$ times the one-day $\sigma$, and VaR scales with $\sigma$. If consecutive days are positively correlated, ten-day VaR is larger than this; if $\sigma$ itself mean-reverts, a ten-day $\sigma$ is not $\sqrt{10}$ times a one-day $\sigma$. The $1{,}103{,}483$ is the i.i.d. conversion, not a supervisory number (Basel used a ten-day horizon, and sometimes a multiplier, on top of a similar conversion).
:::
:::

:::widget distribution
dist: normal
params: mu=0, sigma=0.015
a: -0.08
b: -0.0349
caption: The illustrative daily-return distribution $N(0, 0.015^2)$. The shaded left tail is $R \le -2.326 \times 0.015 = -0.0349$, which on $W = 10{,}000{,}000$ is the $349{,}000$ VaR of [[#ex-gvar]]. The picture is a model's density, not a certificate that tomorrow's return will sit inside it.
:::

A square-root-of-time rule, $\sigma_{h} = \sigma_1 \sqrt{h}$, converts a one-day $\sigma$ to an $h$-day $\sigma$ when returns are i.i.d. The ten-day $99\%$ VaR on the house book, under that rule, is $\sqrt{10} \times 348{,}952 \approx 1{,}103{,}000$. Serial correlation, a $\sigma$ that moves, and overlapping ten-day windows all break the rule. Basel's market-risk frameworks used ten-day VaR for years; the square-root conversion was an assumption, named as such in the original 1996 amendment.

:::quiz
A one-day $99\%$ VaR of $349{,}000$ is reported. Which reading is licensed by [[#def-var]]?
- [ ] The portfolio cannot lose more than $349{,}000$ tomorrow
- [ ] The expected loss is $349{,}000$
- [x] Under the stated model, $1\%$ of one-day losses exceed $349{,}000$; the size of those exceedances is not this number
- [ ] The firm is adequately capitalised
:::solution
VaR locates a quantile. It is silent on the tail mean (that is ES), silent on model error, and silent on capital, which is a regulatory mapping from a statistic to a requirement. “Cannot lose more” is the reading that several institutions, in several years, treated as a fact. It is not in the definition.
:::
:::

## Three ways to compute the distribution

**Parametric (variance–covariance).** Map the book to risk factors, estimate a covariance matrix, linearise with deltas (and maybe gammas), and apply [[#eq-gvar]]. Fast, closed form, and wrong when the book is a short option (the loss is not linear, and not Gaussian). RiskMetrics, released by J.P. Morgan in October 1994, is the documented ancestor: an exponentially weighted covariance and a Gaussian (or mixture) quantile.

**Historical.** Take the last $N$ days of factor moves, apply each day's move to *today's* book, sort the $N$ losses, and read the quantile. No distributional assumption beyond “the next day looks like a draw from the last $N$”. Fragile when $N = 250$ and $\alpha = 0.99$: the $99\%$ historical VaR is roughly the third-worst day, a statistic with a large sampling error. Quiet windows (2017, parts of 2005–06) produce small historical VaRs; they are a description of the window.

**Monte Carlo.** Draw factor paths from a stated model (GBM, a jump process, a copula of credit names), revalue the book on each draw, and read the quantile of the simulated losses. The method of [[derivatives/numerical-methods]] applied to $L$ rather than to a premium. The error is $1/\sqrt{M}$ in the usual way, plus the model's error.

:::example A ten-day historical toy {#ex-hist}
Ten illustrative daily losses, in thousands: $120, 80, 200, 50, 30, 90, 150, 40, 70, 110$. For a $90\%$ historical VaR on this sample of ten, report the one-in-ten quantile (the worst day, on a sample this small, is the $90\%$ level if we take the worst as the $10\%$ tail).
:::solution
Sorted descending: $200, 150, 120, 110, 90, 80, 70, 50, 40, 30$. The worst is $200$; the second-worst is $150$. A $90\%$ VaR as the worst of ten is $200$ thousand. A $80\%$ VaR as the second-worst is $150$ thousand. With ten observations the $99\%$ quantile is not identified: there is no empirical $1\%$ tail. That is the sampling lesson. The ten numbers are invented; they are not a firm's P&amp;L.
:::
:::

:::example Two-asset parametric VaR {#ex-two-asset}
Two illustrative positions, each of value $5{,}000{,}000$, have daily $\sigma_1 = \sigma_2 = 0.015$ and correlation $\rho = 0.4$, with $\mu = 0$. Compute the portfolio's daily $\sigma$ and the one-day $99\%$ Gaussian VaR.
:::solution
Variance of the return on equal weights is

$$
\sigma_p^2 = (0.5)^2(0.015)^2 + (0.5)^2(0.015)^2 + 2\times 0.5\times 0.5\times 0.4\times 0.015\times 0.015
= 2\times 0.25 \times 0.000225 + 0.5 \times 0.4 \times 0.000225
= 0.0001125 + 0.000045 = 0.0001575,
$$

so $\sigma_p = \sqrt{0.0001575} = 0.01255$. Then $\operatorname{VaR}_{0.99} = 10{,}000{,}000 \times 0.01255 \times 2.32635 = 291{,}900$ to the nearest hundred. Diversification against $\rho = 1$ (which would have reproduced [[#ex-gvar]]'s $348{,}952$) saves about $57{,}000$ of Gaussian VaR on these numbers. If $\rho$ jumps to $1$ in a stress, that saving disappears. The $291{,}900$ is a two-factor variance–covariance statistic, not a reason to treat the book as $57{,}000$ safer.
:::
:::

:::warning Linearising a short option and calling it VaR
A short call, on a one-day move, has a loss that is small if $S$ is quiet and large if $S$ jumps. A delta-normal VaR uses $\Delta \times \sigma_S \times z_\alpha$ and misses the gamma term $\tfrac12 \Gamma (\Delta S)^2$ of [[derivatives/greeks-and-hedging#eq-gamma-theta]]. For a short option $\Gamma < 0$ from the writer's point of view, so the missed term is a *further loss* on a large move. The reported VaR is then too small, in the direction that matters. Full revaluation (historical or Monte Carlo) is the repair. Reporting a delta-normal VaR on an option book without the gamma warning is the compression this section exists to name.
:::

## Mapping, aggregation, and what is left out

A book of bonds, swaps, options and CDS is mapped to a vector of risk factors: yield-curve nodes, FX, equity indices, implied vols, hazard rates, a commodity strip. Greeks, or a full revaluation, send a factor move to a P&amp;L. Adding those P&amp;Ls, with a covariance or a copula, produces a distribution of $L$. **Liquidity** (the cost of exiting), **funding** (the cost of posting variation margin), **model risk** (the wrong $\sigma$, the wrong copula), and **operational risk** are extra. Some of them have their own VaR-like statistics. None of them is in [[#eq-gvar]] on a single $W$ and $\sigma$.

**Backtesting** compares the VaR to subsequent realised losses. A $99\%$ one-day VaR should be exceeded on about $1\%$ of days. Kupiec's (1995) proportion-of-failures test, and Christoffersen's (1998) test for clustered exceptions, are the standard checks. A year with twelve exceptions of a $99\%$ daily VaR, as several banks recorded in 2008, is a rejection of the model's calibration, or of its i.i.d. assumption, or of both. It is not a surprise if the model was a Gaussian, a short window, and a linear map.

**Stress testing** drops the probability and names the scenario: equity $-20\%$, credit spreads $+200$ bp, the 2008 covariance, a parallel $+100$ bp in yields. The output is a P&amp;L, not a quantile. Supervisory stress tests (the US CCAR, the European EBA/ECB exercises, the Bank of England concurrent stress test) are institutional versions of the same idea, with stated scenarios and a capital mapping. They answer a different question from VaR: not “how bad in the $1\%$ of the model's world?” but “how bad in *this* world?”. A book can have a small VaR and a large stress loss if the stress is a jump the model's $\sigma$ did not fund.

:::intuition VaR is a zoom setting
A $95\%$ VaR looks at a milder tail than a $99\%$ VaR. A one-day VaR looks at a shorter horizon than a ten-day VaR. A Gaussian VaR looks at a thinner tail than a $t$-distribution VaR with four degrees of freedom. Each choice is a zoom. Zooming in on a mild, short, thin-tailed statistic and then treating the number as a bound on a week of jumps is a use the statistic does not support. ES zooms past the quantile into the tail mean; it is a different zoom, still of the model's world.
:::

:::application LTCM, 1998
Long-Term Capital Management reported, in contemporaneous accounts, a daily VaR that was small relative to capital on the models then in use. In August–September 1998, after the Russian default of 17 August, spreads on the firm's relative-value positions moved together, liquidity disappeared, and losses exhausted the capital the VaR had described as ample. The Federal Reserve Bank of New York organised a private recapitalisation in September 1998. The case is the textbook warning about: (i) a covariance estimated in a quiet window; (ii) a book whose risk was in the *correlation* of the residual trades; (iii) a quantile that did not speak to liquidation in a stressed market. Jorion (2000), “Risk Management Lessons from Long-Term Capital Management”, *European Financial Management*, is a standard write-up. The lesson is about the statistic, not a verdict on any living firm.
:::

## Evidence, and 2008

J.P. Morgan's RiskMetrics technical document (October 1994; fourth edition 1996, with Reuters) made a variance–covariance VaR a public recipe and a daily data set. The 1996 Market Risk Amendment to the Basel Accord put VaR into the regulatory capital of trading books. By 2007 the statistic was a dashboard item at every large dealer.

The financial crisis of 2007–09 produced clustered VaR exceptions, large stress losses on structured credit, and a counterparty shock that credit VaR on a names-only copula had not always included. The BIS and the Financial Crisis Inquiry Commission (2011) documented the chain; this atlas's [[derivatives/credit-derivatives]] chapter recorded the CDS and CDO part. The regulatory sequel — Basel 2.5 (stressed VaR), the Fundamental Review of the Trading Book (ES, liquidity horizons, a default-risk charge), central clearing of OTC derivatives — is a change of the *required* statistic and of market structure. It is not a proof that the next tail will be the one the new statistic describes.

Country implementations vary. The US, the EU, the UK, Japan, Switzerland, Singapore and Hong Kong apply the Basel market-risk framework with local add-ons; several emerging-market supervisors run parallel FX and interest-rate stress tests on banks whose books are simpler but whose local-currency tails are fatter. A Gaussian VaR in a currency that has jumped $15\%$ in a week is the same formula as [[#ex-gvar]] and a worse description.

At end-June 2025 the BIS reported USD $21.8$ trillion of OTC derivatives gross market value on USD $846$ trillion of notional (BIS OTC derivatives statistics). Gross market value is a replacement-cost snapshot, closer to a current-exposure number than to a VaR. The gap between notional, gross market value, and a $99\%$ tail is the gap this chapter has been naming: three different compressions of the same book.

## Where this leads

The course stops here. A second course would treat spectral risk measures, elicitability (Gneiting, 2011: VaR is elicitable, ES is not, which matters for backtesting), liquidity-adjusted VaR, and the full FRTB machinery. The first-course duty is smaller and prior: to compute a Gaussian VaR by hand, to compute an ES, to say out loud that both are statistics of a model, and to read 1998 and 2008 as evidence about the statistic rather than as colour.

The pricing chapters remain the input. A VaR of an option book is a VaR of the Black–Scholes (or local-vol, or jump) P&amp;L; a VaR of a CDS book is a VaR of a hazard and a recovery. Garbage in the pricing model is garbage in the quantile. The reverse is also true: a perfect Black–Scholes price, delta-hedged at the close, still has a next-day P&amp;L whose quantile is this chapter's object.

:::history
**1994, RiskMetrics.** J.P. Morgan released RiskMetrics in October 1994, with a technical document and a public covariance data set. **1996, Basel.** The Market Risk Amendment added a VaR-based capital charge for trading books. **1998, LTCM.** The recapitalisation of Long-Term Capital Management, organised by the Federal Reserve Bank of New York in September 1998, became the case study for a small VaR and a large, correlated, illiquid loss. **1999, coherence.** Artzner, Delbaen, Eber and Heath, “Coherent Measures of Risk”, *Mathematical Finance* 9, set out the axioms that VaR fails and ES (under conditions) satisfies. **2008–16.** Clustered exceptions, stressed VaR, and the Fundamental Review of the Trading Book. The sequence is the institutional history of a quantile, not a proof that the next quantile will hold.
:::

:::summary
- VaR is an $\alpha$-quantile of a stated loss distribution, on a stated horizon, in a stated model. It is not a maximum loss, not an expected loss, and not a capital verdict.
- ES is the tail mean beyond VaR. House-number Gaussian book: one-day $99\%$ VaR $348{,}952$, ES $399{,}782$, on $W = 10{,}000{,}000$, $\sigma = 0.015$, $\mu = 0$.
- Parametric, historical and Monte Carlo VaR are three estimators of the same object. Linearising a short option misses gamma in the tail.
- Backtesting checks exceptions; stress testing drops the probability and names a world. A small VaR and a large stress loss can coexist.
- 1998 and 2008 are evidence that a quantile of a quiet, linear, Gaussian world is a poor bound on a correlated, illiquid, jumping one. The statistic remains useful as a statistic, with its assumptions said out loud.
:::

## Exercises

:::exercise $z_{0.99}$ {level=1 check="2.326"}
Enter $N^{-1}(0.99)$ to three decimals.
:::solution
$z_{0.99} = 2.326$ to three decimals. The more precise value used in [[#ex-gvar]] is $2.32635$.
:::
:::

:::exercise $95\%$ VaR {level=1 check="246728"}
$W = 10000000$, $\sigma = 0.015$, $\mu = 0$, $z_{0.95} = 1.64485$. Enter the one-day $95\%$ Gaussian VaR to the nearest unit of money.
:::solution
$10000000 \times 0.015 \times 1.64485 = 246728$, [[#ex-gvar]].
:::
:::

:::exercise $99\%$ VaR {level=1 check="348952"}
With $z_{0.99} = 2.32635$, enter the one-day $99\%$ Gaussian VaR on the same book, to the nearest unit of money.
:::solution
$10000000 \times 0.015 \times 2.32635 = 348952$.
:::
:::

:::exercise $99\%$ ES {level=2 check="399782"}
$n(2.32635) = 0.02665214$. Enter the one-day $99\%$ Gaussian ES on the same book, to the nearest unit of money.
:::solution
$10000000 \times 0.015 \times 0.02665214 / 0.01 = 399782$, matching [[#ex-gvar]].
:::
:::

:::exercise Ten-day square-root {level=2 check="1103500"}
Using the square-root-of-time rule and the one-day $99\%$ VaR $348952$, enter the ten-day $99\%$ VaR to the nearest hundred.
:::solution
$\sqrt{10} \times 348952 = 1{,}103{,}483$, which is $1{,}103{,}500$ to the nearest hundred. The conversion assumes i.i.d. returns.
:::
:::

:::exercise Historical quantile {level=2 check="200"}
In [[#ex-hist]], enter the worst of the ten illustrative losses, in thousands.
:::solution
$200$. On a sample of ten this is the $90\%$ historical VaR as the exercise defined it. A $99\%$ historical VaR is not identified.
:::
:::

:::exercise A short-call tail {level=3}
A written call on the house numbers has $\Delta = 0.6368$, $\Gamma = 0.01876$ from the writer's side as $-\Gamma_{\mathrm{call}}$. Over one day, $\Delta t = 1/365$, $\Theta_{\mathrm{writer}} \approx +0.0176$ per call. Using [[derivatives/greeks-and-hedging#eq-gamma-theta]], compute the second-order P&amp;L of a *delta-hedged* writer on a day when $S$ moves by $+4$, and compare its *loss* to a delta-normal $99\%$ daily move of $S$, $\sigma_S = 0.015 \times 100 = 1.5$. Which loss is larger, and what does that say about a delta-normal VaR of the written call?
:::hint
Writer's gamma P&amp;L is $-\tfrac12 \Gamma_{\mathrm{call}} (\Delta S)^2$. A $99\%$ Gaussian $\Delta S$ is $2.326 \times 1.5 \approx 3.49$.
:::
:::solution
On $\Delta S = 4$, the delta-hedged writer's second-order P&amp;L is $0.0176 - \tfrac12 \times 0.01876 \times 16 = 0.0176 - 0.150 = -0.132$ per call, a loss of $0.132$. A $99\%$ Gaussian $\Delta S$ of $3.49$ gives a gamma loss of $\tfrac12 \times 0.01876 \times 3.49^2 \approx 0.114$, minus theta $0.018$, net loss about $0.096$. Delta-normal VaR of a *hedged* writer is near $0$ (delta is matched; the linear map has nothing left). The second-order loss of $0.10$–$0.13$ is therefore *entirely* outside the delta-normal VaR. A delta-normal VaR on this position is a VaR of approximately zero plus a missed convexity loss of order $0.1$ per call per loud day. Full revaluation, or a gamma adjustment, is the repair. The $0.132$ is a Taylor remainder on an illustrative move, not a quoted P&amp;L.
:::
:::

:::exercise Exceptions in a year {level=3 check="2.5"}
A $99\%$ one-day VaR, if i.i.d. and correctly calibrated, has exception probability $0.01$ each day. In a $250$-day year, enter the expected number of exceptions, to one decimal. Then, in the solution, state whether twelve exceptions in a year is compatible with this calibration on a binomial test at conventional significance.
:::hint
Expected count is $250 \times 0.01$. Twelve exceptions is a binomial tail.
:::
:::solution
$250 \times 0.01 = 2.5$. Twelve exceptions: under $\mathrm{Bin}(250, 0.01)$, $\E = 2.5$, $\Var = 2.475$, and $12$ is $(12-2.5)/\sqrt{2.475} \approx 6.0$ standard deviations above the mean, or a Poisson tail $\Prob(N \ge 12)$ with $\lambda = 2.5$ of about $2 \times 10^{-5}$. A Kupiec test rejects at any conventional level. Twelve exceptions in 2008, recorded at several banks, were a rejection of the i.i.d. $1\%$ model in force, not a run of bad luck inside it. The $2.5$ is the model's expectation, not a recommendation of how many losses a desk should have.
:::
:::
