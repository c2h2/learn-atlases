A risk-averse agent who can hold more than one risky asset will not, in general, hold only the asset with the highest expected return. Combining assets whose surprises are imperfectly correlated reduces the variance of wealth without a one-for-one cut in the mean. That reduction is **diversification**, and the set of combinations that cannot be improved upon in both mean and variance is the **mean–variance frontier**. This chapter builds the frontier from two assets up, adds a risk-free asset, and obtains two-fund separation. The numbers are invented. The frontier is a property of means, variances and covariances that have been taken as given; it is not a forecast of those moments, and it is not a recommendation to hold any of the portfolios that sit on it.

The ingredients are those of [[asset-pricing/returns-and-risk]]: a simple return $R$, a mean $\E[R]$, a variance $\Var(R)$, and a risk aversion that, for small risks, ranks portfolios by mean and variance. The optimisation is a constrained quadratic programme; the Lagrange techniques are those of [[mathematical-economics/constrained-optimisation]].

## Diversification with two risky assets

Take two assets, $A$ and $B$, with expected simple returns $\mu_A$, $\mu_B$, standard deviations $\sigma_A$, $\sigma_B$, and correlation $\rho$. A **portfolio** is a pair of weights $(w, 1-w)$ on $A$ and $B$, with $w$ the share of current value held in $A$. Short sales are allowed when $w$ lies outside $[0,1]$. The portfolio return is $R_p = w R_A + (1-w) R_B$, so

$$
\mu_p(w) = w\mu_A + (1-w)\mu_B,
$$

$$
\sigma_p^2(w) = w^2\sigma_A^2 + (1-w)^2\sigma_B^2 + 2w(1-w)\rho\sigma_A\sigma_B.
$$

The mean is linear in $w$. The variance is a quadratic. If $\rho < 1$, the quadratic lies strictly below the line that would join $(\sigma_A, \mu_A)$ to $(\sigma_B, \mu_B)$ in the $(\sigma, \mu)$ plane: the portfolio standard deviation is less than the weighted average of the two standard deviations. That gap is diversification. If $\rho = 1$ the gap vanishes and the two-asset “frontier” is a pair of rays. If $\rho = -1$ there is a weight that drives $\sigma_p$ to zero, provided $\sigma_A$ and $\sigma_B$ are positive.

::: definition Mean–variance frontier {#def-frontier}
Given a collection of assets with a non-singular covariance matrix, a portfolio is **mean–variance efficient** (it lies on the **upper frontier**, or **efficient frontier**) if no other portfolio has the same variance and a strictly higher mean, or the same mean and a strictly lower variance. The **minimum-variance frontier** is the full curve of minimum-variance portfolios at each mean, upper and lower branches together. The **global minimum-variance (GMV) portfolio** is the portfolio of risky assets with the smallest attainable variance.
:::

For two assets the GMV weight on $A$ is obtained by differentiating $\sigma_p^2$ and setting the derivative to zero:

$$
w_{\mathrm{GMV}} = \frac{\sigma_B^2 - \rho\sigma_A\sigma_B}{\sigma_A^2 + \sigma_B^2 - 2\rho\sigma_A\sigma_B}.
$$

The formula is a ratio of covariances: it puts more weight on the asset that contributes less to portfolio variance. It does not use the means. Means enter only when we select a point on the frontier other than the GMV.

Throughout this chapter the working example is two invented assets with

$$
\mu_A = 0.08,\; \sigma_A = 0.20,\; \mu_B = 0.12,\; \sigma_B = 0.30,\; \rho = 0.3.
$$

The covariance is $\Cov(R_A,R_B) = 0.3\times 0.20\times 0.30 = 0.018$. These are annual simple-return moments of two fictional names, not estimates from any index.

::: example Equal weights and the GMV {#ex-two}
For the working pair, compute the mean and standard deviation of the equal-weighted portfolio $w = 1/2$, and of the GMV portfolio.
::: solution
At $w = 1/2$,

$$
\mu_p = 0.10, \qquad \sigma_p^2 = (0.5)^2(0.04) + (0.5)^2(0.09) + 2(0.5)(0.5)(0.018) = 0.0415,
$$

so $\sigma_p = \sqrt{0.0415} \approx 0.2037$. The weighted average of the two standard deviations is $0.25$. Diversification has cut volatility from $0.25$ to $0.204$ at the same mean of $0.10$ that a $50$–$50$ mix of the *means* produces. The GMV weight is

$$
w_{\mathrm{GMV}} = \frac{0.09 - 0.018}{0.04 + 0.09 - 2\times 0.018} = \frac{0.072}{0.094} \approx 0.7660.
$$

Then $\mu_{\mathrm{GMV}} \approx 0.08936$ and $\sigma_{\mathrm{GMV}} \approx 0.1867$. The GMV is safer than either asset and safer than the equal-weighted mix. It is not the highest-Sharpe mix; that mix uses the means, and is computed in [[#ex-tangency]].
:::
:::

::: example Perfect negative correlation {#ex-minus-one}
Keep the working standard deviations but set $\rho = -1$. Find a weight that makes $\sigma_p = 0$, and the mean of that portfolio.
::: solution
With $\rho = -1$, $\sigma_p = \lvert w\sigma_A - (1-w)\sigma_B\rvert$. This is zero at $w = \sigma_B/(\sigma_A+\sigma_B) = 0.30/0.50 = 0.6$. The mean is $0.6\times 0.08 + 0.4\times 0.12 = 0.096$. A perfect hedge has turned two risky assets into a synthetic risk-free asset paying $0.096$. In any real sample $\rho = -1$ does not hold for long; the calculation is a boundary case that shows where the quadratic is capable of going. It is not a hedge that a reader is being told to put on.
:::
:::

::: widget plot
f: 0.08*x + 0.12*(1-x)
f: sqrt(x^2*0.04 + (1-x)^2*0.09 + 2*x*(1-x)*rho*0.06)
x: -0.4, 1.4
y: 0, 0.4
sliders: rho=0.3:-1:1:0.05
labels: \text{expected return}; \text{volatility}
caption: Horizontal axis is the weight $w$ on asset $A$. The upper curve is portfolio expected return; the lower curve is portfolio standard deviation. Drag $\rho$ down toward $-1$ and watch the volatility curve develop a deeper well — that well is diversification. At $\rho = 1$ the well vanishes. Short sales are the regions $w<0$ and $w>1$. The moments are the invented pair in the text.
:::

The widget draws mean and volatility against *weight*. The classical picture draws mean against *volatility*. For two assets that picture is a hyperbola in the $(\sigma, \mu)$ plane, opening to the right, with vertex at the GMV. The upper branch is the efficient frontier; the lower branch is the inefficient minimum-variance locus, where one takes extra variance in order to *lower* the mean. With $\rho$ as a slider on the weight picture, the same comparative static is easier to see: correlation is the parameter that opens or closes the well.

## Many risky assets

With $N$ assets, stack expected returns in a vector $\boldsymbol\mu$ and covariances in a symmetric positive-definite matrix $\Sigma$. A portfolio is a vector $\mathbf{w}$ with $\mathbf{w}\T\mathbf{1} = 1$. Then $\mu_p = \mathbf{w}\T\boldsymbol\mu$ and $\sigma_p^2 = \mathbf{w}\T\Sigma\mathbf{w}$. The GMV is the solution of $\min_{\mathbf{w}} \mathbf{w}\T\Sigma\mathbf{w}$ subject to $\mathbf{w}\T\mathbf{1} = 1$. The Lagrangian $\mathbf{w}\T\Sigma\mathbf{w} + \lambda(1-\mathbf{w}\T\mathbf{1})$ has first-order condition $2\Sigma\mathbf{w} = \lambda\mathbf{1}$, so

$$
\mathbf{w}_{\mathrm{GMV}} = \frac{\Sigma^{-1}\mathbf{1}}{\mathbf{1}\T\Sigma^{-1}\mathbf{1}}.
$$

::: proposition Minimum-variance frontier {#prop-mv}
Let $\Sigma$ be positive definite and let $\boldsymbol\mu$ not be collinear with $\mathbf{1}$. The minimum-variance portfolio with target mean $\mu^*$ is

$$
\mathbf{w}(\mu^*) = \Sigma^{-1}\bigl(\lambda_1\mathbf{1} + \lambda_2\boldsymbol\mu\bigr),
$$

where $(\lambda_1, \lambda_2)$ solve the two linear equations imposed by $\mathbf{w}\T\mathbf{1} = 1$ and $\mathbf{w}\T\boldsymbol\mu = \mu^*$. Equivalently, every minimum-variance portfolio is a linear combination of two fixed frontier portfolios (two-fund spanning of the risky frontier). The locus of $(\sigma_p, \mu_p)$ is a hyperbola. Assumptions: unconstrained weights (including short sales), a single-period simple-return mean and covariance that the agent treats as known, and no labour income, non-traded assets or constraints other than the adding-up of weights.
:::

::: proof
The Lagrangian of $\min \tfrac12\mathbf{w}\T\Sigma\mathbf{w}$ subject to $\mathbf{w}\T\mathbf{1} = 1$ and $\mathbf{w}\T\boldsymbol\mu = \mu^*$ is $\tfrac12\mathbf{w}\T\Sigma\mathbf{w} - \lambda_1(\mathbf{w}\T\mathbf{1}-1) - \lambda_2(\mathbf{w}\T\boldsymbol\mu-\mu^*)$. Differentiating with respect to $\mathbf{w}$ gives $\Sigma\mathbf{w} = \lambda_1\mathbf{1} + \lambda_2\boldsymbol\mu$, which is the displayed formula. The two constraints are two linear equations in $(\lambda_1, \lambda_2)$. Because the solution is linear in the two multipliers, it is a linear combination of the two particular solutions obtained by setting the target mean equal to the means of any two distinct frontier portfolios. The hyperbola follows by substituting $\mathbf{w}(\mu^*)$ into $\sigma_p^2 = \mathbf{w}\T\Sigma\mathbf{w}$ and completing the square; the vertex is the GMV. If $\boldsymbol\mu$ is collinear with $\mathbf{1}$ every portfolio has the same mean and the frontier degenerates to a point, the GMV.
:::

Two-fund spanning of the *risky* frontier is not yet Tobin separation. Tobin separation requires a risk-free asset, and it identifies a *single* risky fund that every agent holds. The risky frontier is spanned by any two of its points; the capital-allocation line of the next section is spanned by the risk-free asset and one tangency point.

::: example Three invented assets {#ex-three}
Three assets have $\boldsymbol\mu = (0.08, 0.12, 0.10)\T$ and

$$
\Sigma = \begin{pmatrix} 0.04 & 0.012 & 0.008 \\ 0.012 & 0.09 & 0.015 \\ 0.008 & 0.015 & 0.0625 \end{pmatrix}.
$$

Compute the GMV weights, mean and standard deviation.
::: solution
Inverting $\Sigma$ (determinant $0.00020412$) and applying $\mathbf{w}_{\mathrm{GMV}} = \Sigma^{-1}\mathbf{1}/(\mathbf{1}\T\Sigma^{-1}\mathbf{1})$ gives

$$
\mathbf{w}_{\mathrm{GMV}} \approx (0.5325,\; 0.1639,\; 0.3036)\T.
$$

The mean is $0.09263$ and the standard deviation is $0.1603$. All three weights are positive, so the GMV happens to satisfy a no-short-sale constraint that we did not impose. That is a property of this $\Sigma$, not a general fact: the GMV of a large equity universe typically shorts something. The calculation treats $\Sigma$ as known. Estimating $\Sigma$ from a few years of monthly returns, inverting it, and holding the result is a different, and much noisier, exercise.
:::
:::

A constraint that forbids short sales, or that forbids weights outside a box, cuts the frontier. The constrained GMV is then a quadratic programme with inequalities, and two-fund spanning fails: the constrained frontier is a sequence of segments, each spanned by a different active set. The algebra of [[#prop-mv]] is the unconstrained benchmark. Real mandates are constrained; the benchmark is still the place to start, because it says what the constraint is costing in mean–variance terms.

## The risk-free asset and the tangency portfolio

Add an asset that pays a sure simple return $r_f$ over the period. Combinations of that asset and a risky portfolio $p$ trace a **capital-allocation line** (CAL) in the $(\sigma, \mu)$ plane:

$$
\mu = r_f + \frac{\mu_p - r_f}{\sigma_p}\,\sigma, \qquad \sigma \ge 0.
$$

The slope is the Sharpe ratio of $p$. An agent who can borrow and lend at $r_f$ wants the CAL with the largest slope, because every mean–variance indifference curve (level sets of $\mu - \tfrac12 A\sigma^2$, or of a strictly increasing transformation) is tangent to the steepest available line at a better point than it is to a flatter line.

::: definition Tangency portfolio {#def-tangency}
The **tangency portfolio** $T$ is the portfolio of risky assets whose capital-allocation line through $(0, r_f)$ is tangent to the risky minimum-variance frontier. Equivalently, $T$ maximises the Sharpe ratio $(\mathbf{w}\T\boldsymbol\mu - r_f)/\sqrt{\mathbf{w}\T\Sigma\mathbf{w}}$ over $\mathbf{w}\T\mathbf{1} = 1$. Its weights are proportional to $\Sigma^{-1}(\boldsymbol\mu - r_f\mathbf{1})$:

$$
\mathbf{w}_T = \frac{\Sigma^{-1}(\boldsymbol\mu - r_f\mathbf{1})}{\mathbf{1}\T\Sigma^{-1}(\boldsymbol\mu - r_f\mathbf{1})}.
$$
:::

The numerator $\Sigma^{-1}(\boldsymbol\mu - r_f\mathbf{1})$ is the unconstrained mean–variance demand for the risky assets when wealth not used there is held in the risk-free asset (so weights on the risky assets need not add to one). Normalising by the sum of those demands produces the fully invested risky mix, which is $T$. If the sum of the unconstrained demands is negative, $T$ lies on the *lower* branch and the interesting CAL is the one that *shorts* $T$ and holds the risk-free asset; that case is rare in textbook calibrations with $\boldsymbol\mu > r_f\mathbf{1}$ and a well-conditioned $\Sigma$.

::: theorem Two-fund separation {#thm-twofund}
Suppose every agent maximises a strictly increasing, strictly concave function of the mean and variance of next-period wealth, can trade a risk-free asset at a common $r_f$, and agrees on $\boldsymbol\mu$ and $\Sigma$. Then every agent's optimal portfolio is a combination of the risk-free asset and the single tangency portfolio $T$ of [[#def-tangency]]. Agents differ only in the *scalar* share of wealth held in $T$, which decreases with risk aversion. Assumptions: those of [[#prop-mv]], plus a common $r_f$ with unlimited borrowing and lending, homogeneous beliefs, and no non-traded income.
:::

::: proof
Any combination of the risk-free asset and a risky portfolio $p$ has Sharpe ratio at most that of $T$, with equality only if $p$ is $T$ (or a leverage of $T$). A mean–variance agent therefore never chooses a risky mix other than $T$: doing so would place them on a flatter CAL, and a move onto the $T$ line would raise mean at the same variance or cut variance at the same mean. The share $y$ of wealth in $T$ solves $\max_y \bigl(r_f + y(\mu_T-r_f)\bigr) - \tfrac12 A y^2\sigma_T^2$ in the quadratic-utility (or small-risk) case, giving $y^* = (\mu_T-r_f)/(A\sigma_T^2)$. More risk-averse agents (larger $A$) choose smaller $y^*$; they do not change the *composition* of the risky bundle. For a general increasing concave function of $(\mu,\sigma^2)$ the same qualitative conclusion holds: the optimum is the tangency of an indifference curve with the $T$ line, and that tangency slides down the line as concavity increases.
:::

[[#thm-twofund]] is Tobin's 1958 result. It is the reason a mean–variance world has a well-defined “the” risky portfolio. The CAPM of the next chapter will argue that, in equilibrium, $T$ must be the value-weighted market portfolio of all invested wealth. That identification uses market clearing. It is not a consequence of [[#thm-twofund]] alone: two-fund separation is a statement about *demand*, given prices (hence given $\boldsymbol\mu$ and $\Sigma$). Equilibrium turns demand into a restriction on $\boldsymbol\mu$.

::: example Tangency of the working pair {#ex-tangency}
For the working pair and $r_f = 0.03$, compute $\mathbf{w}_T$, $\mu_T$, $\sigma_T$ and the Sharpe ratio of $T$. Then compute the capital-allocation-line mean at $\sigma = 0.15$ and at $\sigma = 0.25$.
::: solution
The excess-return vector is $(0.05, 0.09)\T$. Then

$$
\Sigma^{-1}(\boldsymbol\mu - r_f\mathbf{1}) \approx (0.8791,\; 0.8242)\T,
$$

and normalising gives $\mathbf{w}_T \approx (0.5161,\; 0.4839)\T$. So $\mu_T \approx 0.09935$, $\sigma_T \approx 0.2018$, and the Sharpe ratio is $(0.09935-0.03)/0.2018 \approx 0.3437$. The CAL is $\mu = 0.03 + 0.3437\,\sigma$. At $\sigma = 0.15$ the mean is $0.0816$; at $\sigma = 0.25$ it is $0.1159$. A mean–variance agent with $A = 3$ would put a share $y^* = (0.09935-0.03)/(3\times 0.2018^2) \approx 0.568$ of wealth in $T$ and the rest in the risk-free asset. That scalar is a property of this $A$ and these moments. It is not a recommended mix.
:::
:::

::: widget plot
f: 0.08936 + 0.45*sqrt(max(0.0001, x^2 - 0.1867^2))
f: 0.08936 - 0.45*sqrt(max(0.0001, x^2 - 0.1867^2))
f: 0.03 + 0.3437*x
x: 0, 0.4
y: 0, 0.2
labels: \text{upper frontier}; \text{lower frontier}; \text{CAL}
caption: A cartoon of the working pair in $(\sigma,\mu)$ space. The two branches meet at the GMV, near $(0.187, 0.089)$. The straight line is the CAL through $r_f = 0.03$ with the tangency slope $0.344$. Points on the CAL to the left of tangency mix $T$ with the risk-free asset; points to the right lever $T$. The picture uses the invented moments; it is not a market forecast.
:::

::: warning Treating a sample frontier as a deliverable return
The frontier is computed from $\boldsymbol\mu$ and $\Sigma$. In a classroom those are numbers on the page. In a sample they are estimates, and the estimated frontier is biased *outward*: the portfolios that looked best in-sample are those whose means were lucky and whose covariances were kind. Michaud (1989) called the result an “error-maximising” portfolio. A mean–variance calculation on historical averages is a description of those averages. It becomes a statement about next period only if one takes the estimates as the population, which this chapter does not.
:::

## What the mean–variance problem leaves out

Several assumptions of [[#prop-mv]] and [[#thm-twofund]] are false of any actual investor, and they matter.

**Known moments.** The agent in this chapter knows $\boldsymbol\mu$ and $\Sigma$. A real agent estimates them. Estimation error in $\boldsymbol\mu$ is first-order: a few percentage points on a mean, on an asset with $\sigma = 0.20$, is a large change in a Sharpe ratio. Estimation error in $\Sigma$ is smaller for variances than for covariances, and it is acute once $N$ approaches the number of observations, because $\Sigma$ then becomes ill-conditioned and $\Sigma^{-1}$ amplifies noise. Shrinkage, factor structures and constraints are the usual responses; they are econometric patches, not part of the two-date theory.

**One period.** The agent consumes at the end of the period. An agent who consumes over many periods, and who can rebalance, has a hedging demand for assets that pay off when investment opportunities worsen (Merton 1973). Mean–variance one-period choice is nested in that problem when returns are i.i.d. and utility is CRRA, but it is not nested in general. [[asset-pricing/consumption-based-pricing]] is the multi-period, consumption-based version.

**Quadratic utility, or small risks, or jointly normal returns.** Only then is $\E[u(W)]$ a function of $\E[W]$ and $\Var(W)$ alone. Fat tails and skewness, documented in [[asset-pricing/returns-and-risk]], are then priced at zero by construction. An agent who cares about crashes will not be willing to hold the mean–variance tangency mix of a sample that happened not to contain one.

**A single risk-free rate, with unlimited borrowing.** Actual borrowing rates exceed lending rates, and many agents cannot borrow at all. The CAL then kinks at the tangency point, and two-fund separation fails for agents who would have liked to lever $T$. Black's zero-beta CAPM, in the next chapter, is the equilibrium response to that failure.

**No non-traded income.** Labour income, a privately held business, or a house that is costly to trade, all change the agent's existing risk and therefore the mix of *traded* assets they want. Two-fund separation is a statement about the traded risk that remains after non-traded risk has been taken as given; it is not a statement that every agent holds the same *traded* mix once labour income differs.

These limitations do not make the frontier a useless object. They make it a benchmark: the mix a mean–variance agent would hold *if* the assumptions held. Deviations from the benchmark are then things to be explained, by estimation error, by constraints, by hedging, or by preferences that are not mean–variance. They are not, without further argument, things to be traded on.

::: quiz
In the working example, the equal-weighted portfolio has $\sigma_p \approx 0.204$ and the weighted average of the two volatilities is $0.25$. What does the gap of about $0.046$ represent?
- [ ] A risk premium that the equal-weighted mix is expected to earn
- [x] Diversification: imperfect correlation makes portfolio volatility smaller than the weighted average of the component volatilities
- [ ] Estimation error in $\Sigma$
- [ ] The cost of forbidding short sales
::: solution
With $\rho = 0.3 < 1$, $\sigma_p$ is strictly below $w\sigma_A + (1-w)\sigma_B$. That is the definition of a diversification benefit in a two-asset mix. It is not a premium, it is not an estimation issue (the moments were given), and shorts are not involved at $w = 1/2$.
:::
:::

## Where this leads

[[asset-pricing/capm]] takes [[#thm-twofund]] as the demand side of an equilibrium. If every agent holds $T$ mixed with the risk-free asset, then $T$ must be the value-weighted portfolio of all assets in positive net supply — the market — and expected excess returns must line up with betas against that market. [[asset-pricing/factor-models]] relaxes the single-factor implication without abandoning linear pricing. [[asset-pricing/stochastic-discount-factor]] will show that mean–variance efficiency of the market is equivalent to a stochastic discount factor that is linear in the market return. The arithmetic of this chapter remains the arithmetic of any of those models, because a beta is a covariance divided by a variance, and a covariance is the object that diversification did not kill.

::: history
Harry Markowitz's 'Portfolio Selection' appeared in the *Journal of Finance* in March 1952. The paper treats the investor's problem as a choice among mean–variance pairs, describes the efficient set, and distinguishes diversification that reduces variance from the futile attempt to diversify a common factor. James Tobin's 'Liquidity Preference as Behavior Towards Risk' (*Review of Economic Studies*, 1958) adds the risk-free asset and proves [[#thm-twofund]]: the composition of the risky bundle is the same for every mean–variance agent, and risk aversion scales only the mix of that bundle with cash. Markowitz was awarded the Nobel Memorial Prize in Economic Sciences in 1990, jointly with Merton Miller and William Sharpe; Tobin had received it in 1981, in part for the portfolio theory of money demand of which two-fund separation is the centre.
:::

::: summary
- A portfolio's simple return is the value-weighted average of component simple returns. Its variance is a quadratic form $\mathbf{w}\T\Sigma\mathbf{w}$, and is reduced by imperfect correlation.
- For the invented pair $(\mu, \sigma) = (0.08, 0.20)$ and $(0.12, 0.30)$ with $\rho = 0.3$, an equal-weighted mix has mean $0.10$ and standard deviation $0.204$, against a weighted-average volatility of $0.25$. The GMV puts weight $0.766$ on the safer asset and has $\sigma \approx 0.187$.
- The minimum-variance frontier of unconstrained risky assets is a hyperbola, spanned by any two frontier portfolios. The GMV is $\Sigma^{-1}\mathbf{1}$ normalised.
- With a risk-free asset, every mean–variance agent holds a mix of cash and the tangency portfolio $\mathbf{w}_T \propto \Sigma^{-1}(\boldsymbol\mu - r_f\mathbf{1})$. That is two-fund separation (Tobin 1958).
- For the working pair and $r_f = 0.03$, $T$ has weights about $(0.516, 0.484)$, Sharpe ratio about $0.344$, and CAL $\mu = 0.03 + 0.344\,\sigma$.
- The frontier is computed from assumed moments. A sample frontier is biased outward. Short-sale constraints, estimation error, non-traded income and multi-period hedging all move an agent off the textbook $T$.
:::

## Exercises

::: exercise Equal-weighted mean {level=1 check="0.1"}
For the working pair, enter the expected return of the equal-weighted portfolio as a decimal.
::: solution
$0.5\times 0.08 + 0.5\times 0.12 = 0.1$. The standard deviation of that mix is about $0.204$, which is a different question. The mean does not use $\rho$.
:::
:::

::: exercise GMV weight {level=1 check="0.766"}
Enter the GMV weight on asset $A$ in the working pair, to three decimals.
::: solution
$w_{\mathrm{GMV}} = (0.09-0.018)/(0.04+0.09-0.036) = 0.072/0.094 \approx 0.76596$, which rounds to $0.766$. The weight does not use the means. The GMV mean is about $0.0894$.
:::
:::

::: exercise Zero-risk mix {level=1 check="0.6"}
With $\rho = -1$ and the working standard deviations, enter the weight on $A$ that makes $\sigma_p = 0$.
::: solution
$w = \sigma_B/(\sigma_A+\sigma_B) = 0.3/0.5 = 0.6$, as in [[#ex-minus-one]]. The mean of that mix is $0.096$. If $\rho$ is greater than $-1$ the zero-risk mix does not exist.
:::
:::

::: exercise Tangency Sharpe {level=2 check="0.344"}
Using $\mu_T = 0.09935$, $\sigma_T = 0.2018$ and $r_f = 0.03$, enter the Sharpe ratio of $T$ to three decimals.
::: solution
$(0.09935-0.03)/0.2018 = 0.06935/0.2018 \approx 0.34366$, which rounds to $0.344$. This is the slope of the CAL in [[#ex-tangency]]. A sample Sharpe computed from five months of invented returns, as in the previous chapter, is a different object.
:::
:::

::: exercise CAL at a stated volatility {level=2 check="0.0816"}
On the CAL of [[#ex-tangency]], enter the expected return at $\sigma = 0.15$ to four decimals.
::: solution
$0.03 + 0.3437\times 0.15 = 0.03 + 0.051555 = 0.081555$, which rounds to $0.0816$. The point is a mix of $T$ and the risk-free asset, with weight $0.15/0.2018 \approx 0.743$ on $T$.
:::
:::

::: exercise Mean–variance demand {level=2 check="0.568"}
An agent with $A = 3$ faces the $T$ of [[#ex-tangency]]. Enter the optimal share of wealth in $T$, to three decimals, using $y^* = (\mu_T-r_f)/(A\sigma_T^2)$.
::: solution
$(0.06935)/(3\times 0.04072) \approx 0.06935/0.12216 \approx 0.5677$, which rounds to $0.568$. The rest of wealth is in the risk-free asset. Doubling $A$ halves $y^*$; it does not change the composition of $T$. The scalar is not a recommended allocation.
:::
:::

::: exercise Three-asset GMV algebra {level=3}
For $N$ assets, show that $\mathbf{w}_{\mathrm{GMV}} = \Sigma^{-1}\mathbf{1}/(\mathbf{1}\T\Sigma^{-1}\mathbf{1})$ and that its variance is $1/(\mathbf{1}\T\Sigma^{-1}\mathbf{1})$. Verify the three-asset numbers of [[#ex-three]] at least as far as checking that the reported weights add to one and produce a variance near $0.0257$.
::: hint
The first-order condition of the GMV Lagrangian is $2\Sigma\mathbf{w} = \lambda\mathbf{1}$. Solve for $\mathbf{w}$ and impose $\mathbf{w}\T\mathbf{1} = 1$.
:::
::: solution
The Lagrangian is $\mathbf{w}\T\Sigma\mathbf{w} + \lambda(1-\mathbf{w}\T\mathbf{1})$. Differentiating in $\mathbf{w}$ gives $2\Sigma\mathbf{w} = \lambda\mathbf{1}$, so $\mathbf{w} = (\lambda/2)\Sigma^{-1}\mathbf{1}$. Then $\mathbf{w}\T\mathbf{1} = 1$ forces $\lambda/2 = 1/(\mathbf{1}\T\Sigma^{-1}\mathbf{1})$, which is the displayed formula. The GMV variance is $\mathbf{w}\T\Sigma\mathbf{w} = \mathbf{1}\T\Sigma^{-1}\mathbf{1}/(\mathbf{1}\T\Sigma^{-1}\mathbf{1})^2 = 1/(\mathbf{1}\T\Sigma^{-1}\mathbf{1})$. In [[#ex-three]] the weights $0.5325 + 0.1639 + 0.3036 = 1.0000$ add to one, and $\sigma \approx 0.1603$ squares to about $0.02570$, matching $1/(\mathbf{1}\T\Sigma^{-1}\mathbf{1})$ for that $\Sigma$. The algebra used $\Sigma$ positive definite so that the critical point is a minimum.
:::
:::

::: exercise Why two-fund separation needs a common $r_f$ {level=3}
Explain, in a short argument, why two-fund separation fails if some agents can lend at $r_f$ but cannot borrow, while others can borrow at $r_f$. Identify which agents still hold $T$ and which do not. Relate the failure to the kinked CAL.
::: hint
Draw the CAL as a ray from $r_f$ through $T$, then remove the part of the ray that lies to the right of $T$ for the constrained agents.
:::
::: solution
Agents who would have chosen $y^* \le 1$ (a mix of $T$ and lending) are unaffected by a no-borrowing constraint: their optimum is still on the segment between $(0, r_f)$ and $T$. Agents who would have chosen $y^* > 1$ cannot. Their feasible set is the risky frontier itself, to the right of $T$, together with the segment from $r_f$ to $T$. The best available point for a sufficiently aggressive mean–variance agent is then somewhere on the *risky* upper frontier to the right of $T$, not a leverage of $T$. Different aggressive agents pick different points on that frontier, so the risky bundle is no longer common. The CAL kinks at $T$: slope $(\mu_T-r_f)/\sigma_T$ to the left, and the shallower local slope of the risky frontier to the right. Unlimited borrowing at a *higher* rate than $r_f$ produces a similar kink, with a second, flatter ray starting from the higher borrowing rate. Black's zero-beta CAPM replaces the risk-free asset by a zero-beta frontier portfolio and restores a linear relation, at the cost of a different intercept.
:::
:::
