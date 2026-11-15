If every mean–variance agent holds a mix of cash and the same tangency portfolio, then that tangency portfolio has to be the value-weighted portfolio of everything in positive net supply. That identification turns a demand theory into an equilibrium restriction on expected returns: an asset's expected excess return equals its **beta** against the market, times the market's expected excess return. The restriction is the **capital asset pricing model** (CAPM). This chapter derives it, states the assumptions that carry the derivation, and records the main empirical tests — including the tests that the model fails. The CAPM is a model. A historical average return is not an expected return, and a fitted beta is not a reason to buy or sell any share.

The demand side is [[asset-pricing/portfolio-choice]]: two-fund separation, with a common $r_f$ and homogeneous beliefs. The new ingredient is market clearing.

## From tangency to the market

Write $R_m$ for the simple return on the **market portfolio**, the value-weighted portfolio of all invested wealth — every share, every bond, every piece of privately held capital, every acre of land, in every country. In any actual test $R_m$ is replaced by a proxy, usually a stock-market index. The distinction between the theoretical market and the proxy is not cosmetic; it is Roll's critique, below.

::: definition Beta {#def-beta}
The **beta** of asset $i$ with respect to a portfolio $m$ is

$$
\beta_{im} = \frac{\Cov(R_i, R_m)}{\Var(R_m)},
$$

provided $\Var(R_m) > 0$. Equivalently, $\beta_{im}$ is the slope in the population regression $R_i = \alpha_i + \beta_{im} R_m + \varepsilon_i$ with $\E[\varepsilon_i] = 0$ and $\Cov(\varepsilon_i, R_m) = 0$. The **residual** (or **idiosyncratic**) variance is $\Var(\varepsilon_i) = \Var(R_i) - \beta_{im}^2\Var(R_m)$.
:::

Beta is a regression coefficient. It is not a volatility. An asset can be very volatile and still have a small beta, if most of its variance is residual. Diversification, in the previous chapter, is the statement that residual variance can be driven toward zero in a well-spread portfolio; beta cannot, because it is common.

::: proposition Residual variance is not priced {#prop-idio}
Under the assumptions of [[#thm-sml]], two assets with the same $\beta_{im}$ have the same expected return, regardless of $\Var(\varepsilon_i)$. A well-diversified portfolio's expected return depends only on its average beta. Assumptions: those of [[#thm-sml]]; in particular, residuals are not common factors in disguise.
:::

::: proof
The SML is $\E[R_i] = r_f + \beta_{im}(\E[R_m]-r_f)$. The right-hand side does not contain $\Var(\varepsilon_i)$. For a portfolio with weights $\mathbf{w}$, $\beta_{pm} = \mathbf{w}\T\boldsymbol\beta$ and $\Var(\varepsilon_p) = \mathbf{w}\T \Sigma_\varepsilon \mathbf{w}$, which vanishes like $1/n$ if residuals are uncorrelated and bounded. The SML for $p$ still uses only $\beta_{pm}$. If residuals are in fact a common factor, they belong in $m$, and the one-factor CAPM is misspecified rather than “pricing residual variance”.
:::

::: theorem The CAPM security-market line {#thm-sml}
Suppose the assumptions of two-fund separation hold ([[asset-pricing/portfolio-choice#thm-twofund]]), every asset is in positive net supply, and markets clear. Then the tangency portfolio is the market portfolio, and for every asset $i$

$$
\E[R_i] = r_f + \beta_{im}\bigl(\E[R_m] - r_f\bigr).
$$

Equivalently, the expected excess return is proportional to beta, with intercept zero and slope equal to the market risk premium $\E[R_m]-r_f$. Assumptions, collected: one period; mean–variance (or jointly normal returns, or quadratic utility); a common risk-free rate with unlimited borrowing and lending; homogeneous beliefs about $\boldsymbol\mu$ and $\Sigma$; no non-traded income; frictionless markets (no taxes, no transaction costs, infinitely divisible shares); the market portfolio of all invested wealth.
:::

::: proof
Two-fund separation says that every agent $h$ holds $y^h$ in the tangency portfolio $T$ and $1-y^h$ in the risk-free asset. Summing over agents, aggregate demand for the risky bundle is $(\sum_h y^h W^h) \mathbf{w}_T$. The risk-free asset is in zero net supply (borrowing equals lending), so the net demand for risky assets must equal their outstanding values. That is possible only if $\mathbf{w}_T$ equals the value-weight vector of those assets, which is the market $\mathbf{w}_m$. Hence $T = m$.

The tangency first-order condition is $\boldsymbol\mu - r_f\mathbf{1} = \kappa\, \Sigma\mathbf{w}_m$ for a positive scalar $\kappa$ (the Lagrange multiplier on the adding-up constraint, equal to $(\E[R_m]-r_f)/\Var(R_m)$). The $i$-th row of that vector equation is $\E[R_i] - r_f = \kappa\, \Cov(R_i, R_m)$. Dividing by the same equation for the market itself, $\E[R_m]-r_f = \kappa\,\Var(R_m)$, yields the security-market line. Residual variance does not appear: it was diversified in the construction of $T$, and it is not priced.
:::

The security-market line (SML) is a statement about *expected* returns. A scatter of *realised* returns against betas is a scatter around that line, and a single period's scatter can look like anything. Tests of the CAPM are tests of whether the *average* residual is zero, and of whether the slope of average returns on beta equals the average market excess return.

::: example A beta, a residual, and the SML {#ex-beta}
Let $r_f = 0.03$, $\E[R_m] = 0.10$ and $\sigma_m = 0.16$, so $\Var(R_m) = 0.0256$. Asset $i$ has $\sigma_i = 0.40$ and $\Cov(R_i, R_m) = 0.032$. Compute $\beta_{im}$, the CAPM expected return, the systematic standard deviation $\lvert\beta_{im}\rvert\sigma_m$, and the residual standard deviation.
::: solution
$\beta_{im} = 0.032/0.0256 = 1.25$. The SML gives $\E[R_i] = 0.03 + 1.25\times 0.07 = 0.1175$. Systematic standard deviation is $1.25\times 0.16 = 0.20$. Residual standard deviation is $\sqrt{0.40^2 - 0.20^2} = \sqrt{0.12} \approx 0.3464$. Most of this asset's volatility is residual. Under the CAPM that residual is not compensated. The numbers are invented; $0.1175$ is not a forecast of any named share.
:::
:::

::: example Alpha as a residual of the SML {#ex-alpha}
The same asset is observed, in an invented sample, to have an average return of $0.14$. Define **alpha** as $\alpha_i = \E[R_i] - r_f - \beta_{im}(\E[R_m]-r_f)$ and compute it using the CAPM inputs of [[#ex-beta]] in place of the population means. What does a non-zero alpha mean inside the model, and what does it mean as a sample statistic?
::: solution
$\alpha_i = 0.14 - 0.03 - 1.25\times 0.07 = 0.0225$. Inside the model, a non-zero *population* alpha is a contradiction of [[#thm-sml]]: the asset is not priced by its beta. As a *sample* statistic, $0.0225$ is the average return the asset earned in that sample, in excess of the SML fitted on the same sample's $r_f$, $\beta$ and market premium. Sampling variation, a bad market proxy, a changing beta, and a genuine mispricing (relative to this model) all produce a non-zero sample alpha. Distinguishing those is the testing problem below, not a signal that the asset should be bought.
:::
:::

::: widget plot
f: 0.03 + 0.07*x
x: -0.4, 2.2
y: 0, 0.2
labels: \text{SML}
points: 0,0.03; 1,0.10; 1.25,0.1175; 1.25,0.14
caption: The CAPM security-market line with $r_f = 0.03$ and $\E[R_m]-r_f = 0.07$. The marked points are the risk-free asset, the market, the SML value at $\beta = 1.25$, and an invented sample average of $0.14$ at the same beta (a sample alpha of $0.0225$). Drag the idea, not the points: a test of the CAPM is a test of whether average returns sit on this line, not a test of whether last month's return did. The figure is a model, not a forecast.
:::

## The zero-beta CAPM and the index model

Two of the listed assumptions are particularly fragile: a risk-free asset with unlimited borrowing, and the identification of $m$ with a stock index.

Black (1972, *Journal of Business*) drops the risk-free asset. Mean–variance agents then hold combinations of two frontier portfolios, and market clearing still forces the market to be mean–variance efficient among risky assets. The SML becomes

$$
\E[R_i] = \E[R_z] + \beta_{im}\bigl(\E[R_m] - \E[R_z]\bigr),
$$

where $z$ is a frontier portfolio with $\beta_{zm} = 0$ (the **zero-beta** portfolio). The intercept is no longer $r_f$; it is the expected return on a portfolio that has no market covariance. Empirically, tests that allow a free intercept often find it higher than the Treasury-bill rate, which is one reading of Black's model and one reading of borrowing constraints.

The **single-index model** is a statistical cousin, not an equilibrium:

$$
R_{it} - r_{f,t} = \alpha_i + \beta_i (R_{mt} - r_{f,t}) + \varepsilon_{it}, \qquad \E[\varepsilon_{it}\mid R_{mt}] = 0.
$$

If the CAPM holds in the population, $\alpha_i = 0$ for every $i$. The index model can be estimated whether or not the CAPM holds; it is then a decomposition of variance, not a pricing model. Residual correlation across $i$ is assumed away in the textbook version, which is convenient for estimating $\Sigma$ and is false (industries, factors). [[asset-pricing/factor-models]] puts those extra common residuals back as named factors.

::: example Two assets, one beta {#ex-same-beta}
Asset $U$ has $\beta = 1.25$ and residual standard deviation $0.10$. Asset $V$ has $\beta = 1.25$ and residual standard deviation $0.40$. Using the SML inputs of [[#ex-beta]], compute both expected returns. Which asset is riskier for a holder of the market, and which is riskier for a holder of only that asset?
::: solution
Both expected returns are $0.1175$, by [[#prop-idio]]. For a holder of the market, $V$'s extra residual is diversified and is not extra risk in the CAPM sense. For a holder of only that asset, $V$ is much riskier: total standard deviation is $\sqrt{0.20^2 + 0.40^2} \approx 0.447$ against $\sqrt{0.20^2 + 0.10^2} \approx 0.224$ for $U$. The distinction is the whole of “systematic versus idiosyncratic”. It is a property of the model, not a recommendation to hold the market, and not a claim that $V$'s residual is actually uncorrelated with everything else.
:::
:::

::: example A six-observation time-series regression {#ex-ols}
Invented excess returns on an asset and on a market proxy, over six periods, are

$$
\begin{align*}
R_m^e &= (0.02,\; -0.01,\; 0.03,\; 0.01,\; -0.02,\; 0.04),\\
R_i^e &= (0.039,\; -0.012,\; 0.041,\; 0.009,\; -0.013,\; 0.050).
\end{align*}
$$

Estimate $\alpha$ and $\beta$ by OLS, and compute $R^2$.
::: solution
The design matrix has a column of ones and a column $R_m^e$. OLS gives $(\hat\alpha, \hat\beta) \approx (0.00530,\; 1.1739)$, with $R^2 \approx 0.941$. The residuals are small because the series was built as $0.005 + 1.2 R_m^e$ plus a little noise; the estimator recovers that slope to sampling error. Six observations are not a test of the CAPM. They are a reminder that $\beta$ is a regression coefficient, estimated with a standard error, and that $\hat\alpha = 0.0053$ on six points is not a rejection of $\alpha = 0$.
:::
:::

::: widget regression
points: 0.02,0.039; -0.01,-0.012; 0.03,0.041; 0.01,0.009; -0.02,-0.013; 0.04,0.05
degree: 1
residuals: true
x: -0.03, 0.05
y: -0.02, 0.06
caption: The six invented pairs of [[#ex-ols]]. The fitted slope is beta; the intercept is alpha. Drag a point and watch both change. With six points the intercept is unidentified for any serious purpose. The figure is a calculation on invented data, not a market.
:::

## Testing the CAPM

A test needs a market proxy, a sample, a list of assets, and a way to handle the fact that betas are estimated rather than known. Two classical designs dominate the early literature.

**Time-series tests.** Black, Jensen and Scholes (1972) sort US shares into portfolios by estimated beta, run the index-model regression on each portfolio, and ask whether $\hat\alpha$ is zero and whether $\hat\alpha$ plus $\hat\beta$ times the sample market premium matches the sample average return. They find that the SML is too flat: low-beta portfolios earn more, on average, than the CAPM predicts, and high-beta portfolios earn less. The intercept is closer to Black's zero-beta rate than to the Treasury-bill rate.

**Cross-sectional tests.** Fama and MacBeth (1973, *Journal of Political Economy*) estimate betas in a rolling window, then each month regress that month's cross-section of returns on the betas, and study the time series of the cross-sectional intercept and slope. Under the CAPM the average intercept equals the average $r_f$ (or the average zero-beta rate) and the average slope equals the average market excess return. They find a positive slope on beta over $1935$–$1968$ in US data, a positive intercept, and little extra explanatory power from residual variance — which is what the CAPM says about residual variance, and which is the part of the evidence most favourable to the model.

**The flat SML after 1963.** Fama and French (1992, *Journal of Finance*), on US shares over $1963$–$1990$, find that when betas are allowed to vary independently of size, the relation between beta and average return is flat, even when beta is the only regressor. Size and book-to-market absorb the cross-sectional variation that beta, leverage and earnings yields had been credited with. That paper is the bridge to [[asset-pricing/factor-models]]. It is a statement about that sample and that design, not a theorem that beta never mattered.

**Roll's critique.** Roll (1977, *Journal of Financial Economics*) observed that the CAPM's testable content is the mean–variance efficiency of the *market* portfolio. Any proper subset — a stock index, a stock-and-bond mix, a US-only book — is a proxy. If the proxy is efficient, the SML will look linear in sample whether or not the true market is efficient; if the proxy is inefficient, the SML will look wrong whether or not the true market is efficient. Tests of the CAPM on the CRSP value-weighted equity index are tests of that index's efficiency, plus the auxiliary assumptions needed to estimate the test. They are not, without a claim that the proxy is close to the market, tests of [[#thm-sml]].

**The joint-hypothesis problem.** Fama (1970) already noted that any test of a pricing model is a joint test of the model and of market efficiency, because expected returns are not observed. A rejection can mean that the CAPM is false, or that the market was inefficient in the sample, or that the proxy, the beta estimates, or the assumption of constant moments is false. The same joint problem reappears in [[asset-pricing/market-efficiency]]: a rejection of efficiency is a rejection of efficiency *plus* a model of expected returns. Neither literature has a way around the joint test; both have a duty to say so.

What, then, is the status of the CAPM as of the evidence? On US post-1963 samples, using equity-index proxies, the security-market line is too flat, and size and value spreads remain after beta is controlled. On earlier US samples the slope on beta is more visible. International evidence is mixed and is sensitive to the proxy (a local index versus a world index). The model remains the benchmark against which other models are compared, because it has one factor, a clear theoretical derivation, and a well-defined null that $\alpha_i = 0$. A benchmark that is rejected can still be the right place to start. It is not, on this evidence, an adequate description of the cross-section of average returns.

::: warning Using an equity index as if it were the market
The market of [[#thm-sml]] includes bonds, private equity, unlisted land, human capital. Stambaugh (1982) and Jagannathan and Wang (1996) experiment with broader proxies and with labour-income factors; the verdict on the CAPM moves, which is Roll's point in numbers. Reporting a beta against the S&P 500, or against the CRSP value-weighted index, is a well-defined statistical operation. Calling that beta “the” CAPM beta is a claim about the proxy. This course keeps the names separate.
:::

::: quiz
Under the CAPM, which of the following is priced?
- [ ] The total volatility $\sigma_i$ of every asset
- [ ] The residual standard deviation $\sigma(\varepsilon_i)$
- [x] The covariance of the asset with the market portfolio, equivalently $\beta_{im}$
- [ ] The asset's sample alpha over the last twelve months
::: solution
[[#thm-sml]] prices $\beta_{im}$ and nothing else. Total volatility includes residual variance, which diversification removes from the market portfolio. Sample alpha is a statistic, not a population price of risk.
:::
:::

## Where this leads

[[asset-pricing/factor-models]] keeps linear pricing and drops the claim that one market proxy is enough: additional factors, motivated by the cross-section that the CAPM missed, enter the time-series regression, and the intercepts are asked to vanish again. [[asset-pricing/market-efficiency]] asks a different question — whether prices incorporate information — that cannot be answered without some model of expected returns, of which the CAPM is the historical default. [[asset-pricing/stochastic-discount-factor]] will rewrite [[#thm-sml]] as $\E[m R_i] = 1$ with $m$ linear in $R_m$, which is the form in which every later model in the course is stated.

::: history
William Sharpe's 'Capital Asset Prices: A Theory of Market Equilibrium under Conditions of Risk' appeared in the *Journal of Finance* in September 1964. John Lintner's 'The Valuation of Risk Assets and the Selection of Risky Investments in Stock Portfolios and Capital Budgets' (*Review of Economics and Statistics*, 1965) and Jan Mossin's 'Equilibrium in a Capital Asset Market' (*Econometrica*, 1966) give independent derivations. Fischer Black's 'Capital Market Equilibrium with Restricted Borrowing' (*Journal of Business*, 1972) replaces the risk-free asset by a zero-beta frontier portfolio. The early tests are Black, Jensen and Scholes (1972) and Fama and MacBeth (1973). Roll's 1977 critique, Fama and French (1992), and the joint-hypothesis discussion in Fama (1970) are the standard reasons for not treating a rejection, or a non-rejection, as the end of the argument. Sharpe shared the 1990 Nobel Memorial Prize with Markowitz and Miller.
:::

::: summary
- Beta is $\Cov(R_i,R_m)/\Var(R_m)$, a regression slope, not a volatility. Residual variance is the rest of $\Var(R_i)$.
- Under two-fund separation and market clearing, the tangency portfolio is the market, and $\E[R_i] = r_f + \beta_{im}(\E[R_m]-r_f)$. That is the CAPM. Residual variance is not priced.
- In the invented example, $\beta = 1.25$ and a market premium of $0.07$ give an SML expected return of $0.1175$. A sample average of $0.14$ is a sample alpha of $0.0225$, which is not by itself a rejection.
- Black's zero-beta CAPM drops the risk-free asset; the intercept becomes $\E[R_z]$ for a zero-beta frontier portfolio.
- Black, Jensen and Scholes (1972) find a too-flat SML. Fama and MacBeth (1973) find a positive slope on beta and little role for residual variance. Fama and French (1992), on 1963–1990 US data, find the beta–return relation flat once size is controlled.
- Roll (1977): tests on a stock-index proxy are tests of that proxy's efficiency. Every test is a joint test of the model and of the auxiliaries used to implement it.
:::

## Exercises

::: exercise Reading a beta {level=1 check="1.25"}
Using $\Cov(R_i,R_m) = 0.032$ and $\Var(R_m) = 0.0256$, enter $\beta_{im}$.
::: solution
$0.032/0.0256 = 1.25$. Systematic standard deviation is then $1.25\times 0.16 = 0.20$, which is not the question asked.
:::
:::

::: exercise SML expected return {level=1 check="0.1175"}
With $r_f = 0.03$, $\E[R_m] = 0.10$ and $\beta = 1.25$, enter the CAPM expected return as a decimal.
::: solution
$0.03 + 1.25\times 0.07 = 0.1175$. This is [[#ex-beta]]. A sample average of $0.14$ on the same asset is not the CAPM expected return.
:::
:::

::: exercise Residual volatility {level=1 check="0.346"}
With $\sigma_i = 0.40$ and systematic standard deviation $0.20$, enter the residual standard deviation to three decimals.
::: solution
$\sqrt{0.16-0.04} = \sqrt{0.12} \approx 0.346410$, which rounds to $0.346$. Under the CAPM this number does not enter the expected return.
:::
:::

::: exercise Sample alpha {level=2 check="0.0225"}
Enter the sample alpha of [[#ex-alpha]] as a decimal.
::: solution
$0.14 - 0.03 - 1.25\times 0.07 = 0.0225$. Population alpha is a violation of the CAPM; this figure is a sample statistic on invented numbers.
:::
:::

::: exercise Index-model OLS slope {level=2 check="1.174"}
From [[#ex-ols]], enter the OLS beta to three decimals.
::: solution
The OLS slope on the six invented pairs is $1.1739$, which rounds to $1.174$. The intercept is about $0.0053$ and $R^2$ is about $0.941$. Six points do not test [[#thm-sml]].
:::
:::

::: exercise Zero-beta intercept {level=2}
A zero-beta portfolio has expected return $0.05$, the market has expected return $0.11$, and $\beta_{im} = 0.8$. Compute the Black CAPM expected return on $i$. How would you distinguish this prediction from the Sharpe–Lintner SML with $r_f = 0.03$ on the same beta?
::: solution
Black: $\E[R_i] = 0.05 + 0.8\times(0.11-0.05) = 0.05 + 0.048 = 0.098$. Sharpe–Lintner: $0.03 + 0.8\times(0.11-0.03) = 0.03 + 0.064 = 0.094$. The two predictions differ by $0.004$ at this beta, and the gap *widens* as beta falls: at $\beta = 0$ Black says $0.05$ and Sharpe–Lintner says $0.03$. A too-flat fitted SML with a high intercept is therefore easier to reconcile with Black than with Sharpe–Lintner, which is one reading of Black, Jensen and Scholes (1972). The arithmetic does not decide which model is true; it says how their intercepts differ.
:::
:::

::: exercise Roll in one paragraph {level=3}
State Roll's critique. Then explain why a finding that the CRSP value-weighted equity index is inefficient is not, by itself, a rejection of [[#thm-sml]], and why a finding that it is efficient is not a confirmation.
::: hint
The CAPM's testable claim is efficiency of the market portfolio of all invested wealth. An equity index is a subset.
:::
::: solution
Roll (1977) notes that the CAPM is equivalent to mean–variance efficiency of the market portfolio of all invested wealth. A test that replaces that portfolio by a proxy is a test of the *proxy's* efficiency. If the CRSP value-weighted equity index is inefficient, the CAPM could still hold, because the true market includes bonds, private capital, foreign assets and human capital, and might be efficient even if one slice of it is not. If the CRSP index *is* efficient, the SML against that index will look linear, whether or not the true market is efficient: efficiency of a subset does not imply efficiency of the whole, but it does imply an SML *relative to that subset*. Either finding is therefore compatible with both the truth and the falsehood of [[#thm-sml]]. What the finding *does* decide is whether that particular proxy can serve as $m$ in a test. The honest report is “this proxy is (in)efficient in this sample”, not “the CAPM is (false) true”.
:::
:::

::: exercise Deriving the SML from the tangency FOC {level=3}
Starting from $\boldsymbol\mu - r_f\mathbf{1} = \kappa\, \Sigma\mathbf{w}_m$ with $\kappa = (\E[R_m]-r_f)/\Var(R_m)$, derive [[#thm-sml]] for a single asset $i$. Identify where market clearing was used, and where two-fund separation was used.
::: hint
Write out row $i$ of the vector equation, then divide by the market's own equation.
:::
::: solution
Row $i$ says $\E[R_i] - r_f = \kappa\, \Cov(R_i, R_m)$, because $(\Sigma\mathbf{w}_m)_i = \Cov(R_i, R_m)$. For the market, $\E[R_m]-r_f = \kappa\,\Var(R_m)$. Dividing the two displayed equations (or substituting $\kappa$) yields $\E[R_i]-r_f = \beta_{im}(\E[R_m]-r_f)$. Two-fund separation was used to identify the risky bundle that every agent holds as a single portfolio $T$. Market clearing was used to set $T$ equal to the value-weighted market: with the risk-free asset in zero net supply, the only risky bundle that can be held in aggregate is the market itself. Without clearing, $T$ is just “whatever the agents happen to want”; without two-fund separation, agents do not share a common risky bundle and there is no single $T$ to identify with $m$.
:::
:::
