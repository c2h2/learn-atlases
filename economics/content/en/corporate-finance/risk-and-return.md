The discount rate in the last four chapters was an input. This chapter builds it. A project’s cash flows are risky: they are not the promised coupons of a default-free bond. Discounting a risky stream at a risk-free rate overstates present value if people dislike risk, and the amount of the overstatement depends on *which* risk. Diversifiable risk is not priced in a well-functioning market of the kind the CAPM describes; risk that covaries with the market is. The **capital asset pricing model** turns that covariance, scaled as a **beta**, into an expected return, and that expected return is the cost of equity used in a **weighted average cost of capital** (WACC).

The CAPM is an equilibrium model with named assumptions, not a law of arithmetic. Using it to produce a cost of capital for a fictional firm is an illustration of the formula. It is not a recommendation to buy, sell or hold any security, and it is not a forecast of a return. Historical averages cited below are dated samples, not expected returns. The atlas is for education only — not investment or financial advice.

A fuller treatment of portfolio choice, the CAPM’s tests, and factor models is the subject of [[asset-pricing]]. This chapter takes what corporate-finance applications need: a beta, a cost of equity, a cost of debt, and a WACC, with the assumptions stated.

## Returns, risk and diversification

::: definition Simple return and expected return {#def-return}
The **simple return** on a claim between date $0$ and date $1$ is $R = (P_1 + C_1)/P_0 - 1$, where $P$ is the price of the claim and $C_1$ is the cash paid to the holder at date $1$ (a dividend, a coupon). The **expected return** is $\E[R]$. **Variance** is $\Var(R) = \E\bigl[(R - \E[R])^{2}\bigr]$ and **standard deviation** (volatility) is $\sigma = \sqrt{\Var(R)}$. For two claims, **covariance** is $\Cov(R_i, R_j) = \E\bigl[(R_i - \E[R_i])(R_j - \E[R_j])\bigr]$ and **correlation** is $\rho_{ij} = \Cov(R_i, R_j)/(\sigma_i \sigma_j)$.
:::

A portfolio that puts weight $w$ on claim $A$ and $1-w$ on claim $B$ has expected return $w\,\E[R_A] + (1-w)\,\E[R_B]$ and variance

$$
\sigma_p^{2} = w^{2}\sigma_A^{2} + (1-w)^{2}\sigma_B^{2} + 2w(1-w)\rho_{AB}\sigma_A\sigma_B.
$$ {#eq-port-var}

Variance is *not* the weighted average of the two variances unless $\rho_{AB} = 1$. When $\rho_{AB} < 1$ there is a diversification gain: $\sigma_p$ lies below the weighted average of $\sigma_A$ and $\sigma_B$. When $\rho_{AB} = -1$ it is possible, for a suitable $w$, to drive $\sigma_p$ to zero. Markowitz (1952) made [[#eq-port-var]] the foundation of mean–variance portfolio choice; the corporate-finance use is more modest. A firm’s equity is itself a portfolio of projects. Risk that is specific to one project — a factory fire, a lawsuit, a failed drug trial — averages out across projects and across investors’ portfolios if it is not correlated with other returns. Risk that moves with the economy does not.

::: proposition Diversifiable and systematic risk {#prop-diversify}
In a portfolio of $N$ claims with equal weights $1/N$, equal variances $\sigma^{2}$ and equal pairwise correlations $\rho$, the portfolio variance tends to $\rho\sigma^{2}$ as $N \to \infty$. The limit is zero if and only if $\rho = 0$. The part of each claim’s variance that survives in a large portfolio is the **systematic** part, associated with common variation; the rest is **idiosyncratic** (diversifiable).
:::

::: proof
Portfolio variance is $(1/N)\sigma^{2} + \bigl(1 - 1/N\bigr)\rho\sigma^{2}$, which tends to $\rho\sigma^{2}$. The first term is the contribution of own-variances and vanishes; the second is the contribution of covariances and does not.
:::

::: example Two fictional shares {#ex-two-shares}
Share A has $\E[R_A] = 12$ percent, $\sigma_A = 20$ percent; share B has $\E[R_B] = 8$ percent, $\sigma_B = 15$ percent; $\rho_{AB} = 0.30$. A portfolio with weight $w = 0.6$ on A has what expected return and standard deviation?
::: solution
$\E[R_p] = 0.6 \times 0.12 + 0.4 \times 0.08 = 0.104$, or $10.4$ percent. Variance is

$$
0.6^{2}(0.20)^{2} + 0.4^{2}(0.15)^{2} + 2(0.6)(0.4)(0.30)(0.20)(0.15) = 0.0144 + 0.0036 + 0.00432 = 0.02232,
$$

so $\sigma_p = \sqrt{0.02232} \approx 0.1494$, about $14.9$ percent. The weighted-average volatility is $0.6 \times 20 + 0.4 \times 15 = 18$ percent; diversification trims about three percentage points. The numbers are invented. They illustrate [[#eq-port-var]], not a pair of listed shares.
:::
:::

::: widget plot
f: sqrt(x^2*0.20^2+(1-x)^2*0.15^2+2*x*(1-x)*rho*0.20*0.15)
sliders: rho=0.3:-1:1:0.05
x: 0, 1
y: 0, 0.25
labels: \text{portfolio } \sigma
caption: Standard deviation of the two-share portfolio as a function of the weight x on A, with correlation on the slider. Set rho = 1 and the graph is a straight line between 0.15 and 0.20; lower rho and a U appears. The returns are invented.
:::

::: warning Variance is not value
A project can have high own-variance and still be cheap to finance, in a CAPM world, if that variance is idiosyncratic. A project can have modest own-variance and still require a high discount rate if it covaries strongly with the market. Discounting at a rate that tracks the project’s own $\sigma$, rather than its covariance with priced risk, mixes diversifiable noise into the cost of capital. That is the operational content of [[#prop-diversify]] for capital budgeting.
:::

## Beta and the CAPM

::: definition Beta {#def-beta}
The **beta** of claim $i$ with respect to a market portfolio $M$ is

$$
\beta_i = \frac{\Cov(R_i, R_M)}{\Var(R_M)}.
$$ {#eq-beta}

It is the slope in the population regression $R_i = \alpha_i + \beta_i R_M + \varepsilon_i$. The residual $\varepsilon_i$ is idiosyncratic given $M$. A firm’s **asset beta** (unlevered beta) is the beta of its enterprise claim; its **equity beta** is the beta of its shares, which is larger than the asset beta when the firm has debt, because leverage concentrates residual risk on equity.
:::

::: proposition CAPM expected return {#prop-capm}
Assume: investors are mean–variance optimisers; they share beliefs; they can borrow and lend at a risk-free rate $r_f$; markets are frictionless; and $M$ is the value-weighted portfolio of all traded claims. Then the expected return of every claim $i$ satisfies

$$
\E[R_i] = r_f + \beta_i \bigl(\E[R_M] - r_f\bigr).
$$ {#eq-capm}

The term $\E[R_M] - r_f$ is the **market risk premium**. The line [[#eq-capm]] in $(\beta, \E[R])$ space is the **security market line**.
:::

::: proof
A mean–variance investor who can use the risk-free claim holds a combination of $r_f$ and a single tangency portfolio of risky claims (Tobin separation). Market clearing forces that tangency portfolio to be $M$. The first-order condition for the weight on claim $i$ is that the extra expected return per extra covariance with $M$ is the same for every claim, which rearranges to [[#eq-capm]]. A complete derivation is in [[asset-pricing/capm]]; what is used below is the formula and its assumptions.
:::

The CAPM cost of equity is [[#eq-capm]] applied to the firm’s equity beta. It is an *expected* return in equilibrium, not a promised yield, and not a realised return. Estimating it requires three numbers, each of them a modelling choice: $r_f$ (a current government-bond yield of some maturity), $\beta_i$ (a regression slope on some market index, over some window), and $\E[R_M] - r_f$ (a historical average, a survey, or a forward-looking implied premium). Changing the window, the index, or the averaging period changes the cost of equity. The formula does not pick the ingredients.

::: example A CAPM cost of equity {#ex-capm}
A fictional firm has equity beta $1.2$. The risk-free rate used in the illustration is $4$ percent and the market risk premium is $6$ percent. What cost of equity does [[#eq-capm]] assign?
::: solution
$r_E = 0.04 + 1.2 \times 0.06 = 0.112$, or $11.2$ percent. If the beta had been $0.8$, the cost of equity would have been $0.04 + 0.8 \times 0.06 = 0.088$. The difference, $2.4$ percentage points, is the model’s price of the extra $0.4$ of beta. It is not a finding that the first firm is “better” or “worse”. Both calculations take the premium and the risk-free rate as given; both are illustrations.
:::
:::

::: widget plot
f: 0.04+0.06*x
x: 0, 2
y: 0, 0.18
points: 0,0.04; 1,0.10; 1.2,0.112
labels: \text{SML}
caption: An illustrative security market line with r_f = 4 percent and a 6 percent market premium. The marked points are the risk-free claim (beta 0), the market (beta 1), and the fictional firm of [[#ex-capm]] (beta 1.2). The line is a plot of the CAPM formula, not a fitted market and not a forecast.
:::

::: remark Asset betas and industry betas
A project’s beta need not equal the firm’s equity beta. A conglomerate’s equity beta is a value-weighted average of its activities, levered. A project in a different industry, or with different operating leverage (fixed costs), has a different asset beta. Practitioners often start from an unlevered industry beta and relever at the project’s financing. The Hamada formula, used below, is one such relevering, valid under the Modigliani–Miller assumptions of the next chapter with a constant debt level. Using the parent’s equity beta on a project with a different asset beta is a category error, of the same kind as using the wrong $r$ in an NPV.
:::

::: quiz
In the CAPM, a claim with $\beta = 0$ has expected return
- [ ] zero, because it has no risk
- [x] equal to the risk-free rate, because it has no *systematic* risk
- [ ] equal to the market return, because every claim is held in $M$
- [ ] undefined, because division by $\beta$ appears in the formula
::: solution
[[#eq-capm]] at $\beta_i = 0$ is $\E[R_i] = r_f$. The claim can have idiosyncratic variance; that variance is not priced under the stated assumptions. There is no division by $\beta$ in the formula.
:::
:::

## The weighted average cost of capital

A firm that discounts free cash flow to the *firm* — the pre-interest residual of [[corporate-finance/valuing-stocks]] — needs a rate that blends the returns required by equity and by debt, after the tax treatment of interest.

::: definition WACC {#def-wacc}
Let $E$ and $D$ be the *market* values of equity and interest-bearing debt, $V = E + D$, $r_E$ the cost of equity, $r_D$ the cost of debt, and $t_c$ the marginal corporate tax rate used in the illustration. The **after-tax weighted average cost of capital** is

$$
r_{\mathrm{WACC}} = \frac{E}{V}\, r_E + \frac{D}{V}\, r_D (1 - t_c).
$$ {#eq-wacc}

The factor $(1-t_c)$ is there because interest is deductible at the corporate level in this tax system, so the government’s share of the debt bill reduces the effective cost of debt to the firm. The formula assumes that $D/V$ is the leverage at which $r_E$ and $r_D$ were computed, and that the firm will adjust debt to keep $D/V$ at that ratio (so that the weights in the WACC match the weights in the financing). A different debt policy wants a different tool — adjusted present value in [[corporate-finance/capital-structure]].
:::

::: proposition WACC as a blending of required returns {#prop-wacc}
If the CAPM holds for equity and for debt, if interest is deductible at a constant $t_c$, and if leverage $D/V$ is constant, then discounting expected free cash flow to the firm at $r_{\mathrm{WACC}}$ gives the enterprise value $V$ that is consistent with $E + D = V$. Without taxes, $r_{\mathrm{WACC}}$ equals the required return on assets $r_A = (E/V) r_E + (D/V) r_D$, which is independent of leverage under the Modigliani–Miller assumptions of the next chapter.
:::

::: proof
Enterprise value is the present value of expected FCFF at the blended rate that investors as a group require, after the tax shield on a constant $D/V$. Write $V = E + D$ and take the expected return on $V$ as a weighted average of $r_E$ and the after-tax $r_D$. Rearrangement is [[#eq-wacc]]. The no-tax case is Modigliani–Miller Proposition I in return form, proved in [[corporate-finance/capital-structure]].
:::

::: example A WACC illustration {#ex-wacc}
Firm A has market equity $70$, market debt $30$, a CAPM cost of equity $11.2$ percent (the beta-$1.2$ firm of [[#ex-capm]]), a cost of debt $5$ percent, and $t_c = 25$ percent. What is $r_{\mathrm{WACC}}$?
::: solution
$r_{\mathrm{WACC}} = 0.70 \times 0.112 + 0.30 \times 0.05 \times (1-0.25) = 0.0784 + 0.01125 = 0.08965$, about $8.97$ percent. The after-tax cost of debt is $3.75$ percent; the weights $70/100$ and $30/100$ are market weights, not book weights. Replacing market equity by book equity, when the two differ, is a different formula and is not [[#eq-wacc]].
:::
:::

Leverage changes $r_E$. Under the Modigliani–Miller assumptions with tax and a constant debt *level* (rather than a constant ratio), a common relevering formula — Hamada’s — is

$$
\beta_E = \beta_U \bigl(1 + (1-t_c) D/E\bigr), \qquad \beta_U = \frac{\beta_E}{1 + (1-t_c)D/E},
$$ {#eq-hamada}

where $\beta_U$ is the unlevered (asset) beta. For Firm A, $\beta_E = 1.2$, $D/E = 30/70$, $t_c = 0.25$ give $\beta_U \approx 0.908$. An all-equity firm in the same asset-risk class would, under these assumptions, have equity beta $0.908$ and cost of equity $0.04 + 0.908 \times 0.06 \approx 0.0945$, which is also $r_A$ before the tax adjustment. The formula is only as good as the MM-with-tax assumptions behind it; it is not a measurement of anyone’s beta.

::: example Project WACC versus firm WACC {#ex-project-wacc}
Firm A’s WACC is $8.97$ percent, from [[#ex-wacc]]. It is considering a project in a safer industry, whose unlevered beta is $0.5$, to be financed at the same $D/V = 0.30$ and the same $r_D$ and $t_c$. What WACC belongs to the project?
::: solution
Relever: $\beta_E^{\mathrm{proj}} = 0.5 \times \bigl(1 + (1-0.25) \times 0.30/0.70\bigr) = 0.5 \times 1.3214 \approx 0.661$. Then $r_E^{\mathrm{proj}} = 0.04 + 0.661 \times 0.06 \approx 0.0797$, and

$$
r_{\mathrm{WACC}}^{\mathrm{proj}} = 0.70 \times 0.0797 + 0.30 \times 0.05 \times 0.75 \approx 0.0558 + 0.01125 = 0.0670,
$$

about $6.7$ percent, below the firm’s $8.97$ percent. Using the firm WACC on this safer project would over-discount it and could reject a positive-NPV project. Using it on a *riskier* project would under-discount and could accept a negative-NPV project. Matching the rate to the project’s asset risk is the content of the NPV rule’s “$r$ matches the risk class” clause.
:::
:::

::: intuition WACC is not a knob
Because $r_E$ rises with leverage, substituting a little more cheap after-tax debt for equity does not cut $r_{\mathrm{WACC}}$ one-for-one with $r_D(1-t_c) - r_E$. In a no-tax MM world the two effects cancel and $r_{\mathrm{WACC}}$ is flat in $D/V$. With corporate tax it declines, in that model, in proportion to the tax shield; with distress costs it eventually rises. Treating WACC as a number a treasurer can lower by issuing debt, without moving $r_E$, is the mistake Modigliani and Miller named. The next chapter is that argument in full.
:::

## Evidence

Dimson, Marsh and Staunton’s *Credit Suisse Global Investment Returns Yearbook* (various years; the 2023 edition is a convenient reference) reports that over 1900–2022 a world equity portfolio earned a geometric real return of a little under 5 percent a year, with a world equity premium relative to bills of a similar order, and with large variation across countries and subperiods. The US arithmetic equity premium over T-bills in the post-1926 CRSP sample has been higher, in the neighbourhood of 7–8 percent depending on the exact window (see Ibbotson’s yearbooks and Damodaran’s dated tables). Those figures are *realised* averages. Using them as $\E[R_M] - r_f$ in [[#eq-capm]] is a modelling choice, and one that is known to be sensitive to the window: the premium realised in 1990–2020 is not the premium realised in 1960–1990. They are not a forecast of the premium, and they are not a reason to hold equities.

Fama and French (1992, *Journal of Finance*) found that CAPM beta, estimated in the usual way, did not line up with average returns on US shares once size and book-to-market were controlled for. The CAPM as a description of average returns is, on that evidence, incomplete. Factor models in [[asset-pricing/factor-models]] add further slopes. Corporate-finance practice still uses a CAPM cost of equity more often than any other model: Graham and Harvey (2001) reported that 73 percent of their CFO respondents used the CAPM to estimate the cost of equity, with a minority using multifactor models or a historical average. The gap between the empirical status of the CAPM and its use as a cost-of-capital recipe is itself a finding, not a licence to treat [[#eq-capm]] as a measurement.

::: history
Harry Markowitz’s “Portfolio Selection” (*Journal of Finance*, 1952) introduced mean–variance diversification. William Sharpe (1964, *Journal of Finance*), John Lintner (1965) and Jan Mossin (1966) derived the CAPM. Fischer Black (1972) gave a version without a risk-free claim. The WACC formula with a tax factor is older textbook practice; its rigorous link to a constant-ratio debt policy is set out in Miles and Ezzell (1980, *Journal of Financial and Quantitative Analysis*) and in Harris and Pringle (1985). Hamada’s relevering formula appeared in *Journal of Finance* in 1972.
:::

## Where this leads

[[corporate-finance/capital-structure]] asks whether $V$ itself depends on $D/E$, and therefore whether the WACC’s decline with leverage is a true reduction in the cost of capital or an artefact of a tax system. Payout policy uses $r_E$ as the return owners can earn on retained cash, in homemade-dividend arguments. Real options replace a constant $r$ with a decision tree whose branches may carry different risks. Asset pricing, in the next course, tests [[#eq-capm]], replaces it with factor models, and rewrites the whole of discounting as a stochastic discount factor.

::: summary
- Diversification, in a large portfolio, drives idiosyncratic variance toward zero and leaves systematic variance. Own-$\sigma$ is not the input a cost of capital wants.
- Beta is $\Cov(R_i, R_M)/\Var(R_M)$. The CAPM says $\E[R_i] = r_f + \beta_i(\E[R_M]-r_f)$, under named assumptions (mean–variance investors, a risk-free rate, frictionless markets, $M$ the market).
- A CAPM cost of equity is an equilibrium expected return, not a promised yield and not a realised return. Its three ingredients are modelling choices.
- WACC blends $r_E$ and after-tax $r_D$ at *market* weights, and is the right rate for FCFF only at the leverage for which it was computed.
- Match the rate to the *project’s* asset risk, not automatically to the parent’s equity beta.
- Historical average returns are dated samples, not forecasts. Nothing in this chapter is a recommendation to hold a security or a capital structure.
:::

## Exercises

::: exercise A CAPM cost of equity {level=1 check="0.094"}
A share has beta $0.8$. Using $r_f = 3$ percent and $\E[R_M] = 11$ percent, what cost of equity does the CAPM assign? (Enter the decimal.)
::: solution
$0.03 + 0.8 \times (0.11-0.03) = 0.03 + 0.064 = 0.094$.
:::
:::

::: exercise Portfolio expected return {level=1 check="0.104"}
Using the two shares of [[#ex-two-shares]] and $w = 0.6$ on A, what is the portfolio expected return as a decimal?
::: solution
$0.6 \times 0.12 + 0.4 \times 0.08 = 0.104$.
:::
:::

::: exercise A WACC {level=1 check="0.1056"}
A firm has $E = 80$, $D = 20$, $r_E = 12$ percent, $r_D = 6$ percent, $t_c = 20$ percent. What is $r_{\mathrm{WACC}}$ as a decimal?
::: solution
$0.80 \times 0.12 + 0.20 \times 0.06 \times (1-0.20) = 0.096 + 0.0096 = 0.1056$.
:::
:::

::: exercise Portfolio volatility {level=2 check="0.1494"}
Using [[#ex-two-shares]], what is $\sigma_p$ at $w = 0.6$, rounded to four decimal places?
::: solution
Variance $0.02232$, so $\sigma_p = \sqrt{0.02232} \approx 0.1494$.
:::
:::

::: exercise Unlevering a beta {level=2 check="0.908"}
Firm A has $\beta_E = 1.2$, $D = 30$, $E = 70$, $t_c = 25$ percent. Using [[#eq-hamada]], what is $\beta_U$, rounded to three decimal places?
::: solution
$\beta_U = 1.2 / \bigl(1 + 0.75 \times 30/70\bigr) = 1.2 / (1 + 0.321429) = 1.2 / 1.321429 \approx 0.9081$, which rounds to $0.908$.
:::
:::

::: exercise Project versus firm {level=2}
In [[#ex-project-wacc]], the safer project’s WACC was about $6.7$ percent and the firm’s WACC was about $9.0$ percent. A project with cash flows $(-100, 40, 40, 40, 40)$ has NPV $26.79$ at $10$ percent, from [[corporate-finance/capital-budgeting]]. Without recomputing the four-year annuity exactly, say in which direction NPV at the project WACC and at the firm WACC would move relative to $26.79$, and which rate is the one the NPV rule wants.
::: solution
Both $6.7$ and $9.0$ percent are below $10$ percent, so both NPVs exceed $26.79$, and the project-WACC NPV is the larger of the two (lower discount rate). The NPV rule wants the *project* rate $6.7$ percent, because that is the rate that matches the project’s asset risk at the intended leverage. The firm WACC would over-discount a safer project.
:::
:::

::: exercise Correlation and the diversification bound {level=3}
Using [[#eq-port-var]] with the $\sigma_A, \sigma_B$ of [[#ex-two-shares]], find the portfolio variance at $w = 0.6$ if $\rho = 1$ and if $\rho = -1$. Compare with the $\rho = 0.30$ case.
::: hint
The covariance term is the only piece that changes.
:::
::: solution
The own-variance piece is $0.6^{2}(0.04) + 0.4^{2}(0.0225) = 0.0144 + 0.0036 = 0.018$. The covariance coefficient $2(0.6)(0.4)(0.20)(0.15) = 0.0144$ is then multiplied by $\rho$. At $\rho = 1$, variance is $0.018 + 0.0144 = 0.0324$ and $\sigma_p = 0.18$, the weighted average. At $\rho = -1$, variance is $0.018 - 0.0144 = 0.0036$ and $\sigma_p = 0.06$. At $\rho = 0.30$, variance was $0.02232$ and $\sigma_p \approx 0.149$. Perfect positive correlation destroys the diversification gain; perfect negative correlation maximises it.
:::
:::

::: exercise Miles–Ezzell versus a constant level of debt {level=3}
A firm will rebalance debt annually to keep $D/V$ constant. Another firm will set debt in dollars today and leave the dollar amount unchanged. Both have the same current $D/V$, the same $r_E$, $r_D$ and $t_c$. Why is [[#eq-wacc]] the matching tool for the first firm and not, without adjustment, for the second? Which tool in [[corporate-finance/capital-structure]] matches the second?
::: hint
The tax shield of a constant *ratio* has the risk of $V$; the tax shield of a constant *level* has the risk of debt.
:::
::: solution
A constant-ratio policy makes next year’s debt, and therefore next year’s interest tax shield, proportional to next year’s $V$. The shield inherits the risk of the assets and is discounted at (something close to) $r_{\mathrm{WACC}}$ or $r_A$; Miles and Ezzell showed that [[#eq-wacc]] is then the right blending. A constant *level* of debt makes the shield a (nearly) safe stream, to be discounted at $r_D$, which is the adjusted-present-value writing $V_L = V_U + t_c D$ of the next chapter. Applying [[#eq-wacc]] to the second firm uses too high a discount rate on the shield and understates $V_L$. The matching tool is APV.
:::
:::
