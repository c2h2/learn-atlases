A claim that pays 115 units of money next year, in expectation, does not in general sell for 115 units today. If the 115 is certain, the discount is just interest. If the 115 is the mean of a spread-out lottery, a further discount appears, and that further discount is the subject of asset pricing. This chapter names the objects that later chapters will price: a **return**, a measure of **risk**, and a **risk aversion** that turns risk into a price. The numbers are invented unless a source and a date are attached. Nothing here is a forecast of any market, and nothing here is a recommendation to buy, sell or hold any security.

The previous course treated the cost of capital as an input to a firm's decision ([[corporate-finance/risk-and-return]]). Here the cost of capital is an output: it is the expected return that clearing the market of a given risk requires. To get there we need arithmetic that does not mix units, a statistical description of the payoffs, and a preference that can refuse a fair gamble. Probability and sampling are developed in the Maths Atlas; this chapter uses them, and it does not re-derive the sampling distribution of a mean.

## Simple, log and excess returns

A quoted price is not a return. Two contracts can represent the same economic exposure and carry different quotes, because one quote is in a different unit or because one quote is a futures price rather than a cash price. A move of 2 on a quote near 50 is not the same object as a move of 2 on a quote near 200. Dividing by the previous price removes the unit.

::: definition Simple return and gross return {#def-simple}
Let $P_{t-1}$ and $P_t$ be successive positive prices, or successive positive levels of an account, of a fully invested position with no cash added or removed between the two dates. The **gross return** over the step is $P_t/P_{t-1}$. The **simple return** is

$$
R_t = \frac{P_t}{P_{t-1}} - 1.
$$

Equivalently, $P_t = P_{t-1}(1+R_t)$. A simple return of $0.04$ is a move of 4 per cent. The definition requires $P_{t-1} \neq 0$. It does not require $P_t > 0$, but a non-positive $P_t$ makes the gross return non-positive and the log return of [[#def-log]] undefined.
:::

Over $T$ steps with no cash added or removed, the terminal level is the starting level multiplied by every gross return. The **compound simple return** from date $0$ to date $T$ is therefore

$$
\frac{P_T}{P_0} - 1 = \prod_{t=1}^{T}(1+R_t) - 1.
$$

The product is the right-hand side. The sum $\sum_t R_t$ is a different number. For two steps the algebra is short:

$$
(1+a)(1+b) - 1 = a + b + ab.
$$

The extra term $ab$ is the cross term. It is zero only if at least one of the simple returns is zero. When both returns are positive the cross term is positive, so the compound return exceeds the sum; when the returns have opposite signs the cross term is negative. There is no general inequality that says “the sum is conservative”.

Dividends, coupons, splits and cash contributions break the identification of a price ratio with an account. If a dividend $D_t$ is paid between $t-1$ and $t$ and the quoted price is the ex-dividend price, the simple return on the account is $(P_t + D_t)/P_{t-1} - 1$, not $P_t/P_{t-1} - 1$. The telescoping product above is true of any positive series you feed it. The modelling choice is which series is the account. In this chapter the prices are treated as the marks of a fully invested account with no external cash, unless an example says otherwise. [[corporate-finance/valuing-stocks]] is the bookkeeping of dividends; the adjustment of a series for splits and rolls is a data problem treated in the Quant Atlas.

::: example Five invented closes {#ex-five}
An invented share of Firm A has month-end closes $50, 52, 49, 53, 51, 55$, in units of money, with no dividend. Compute the five simple returns exactly, the sum of those returns, and the compound simple return from the first close to the last.
::: solution
The five simple returns are

$$
\begin{align*}
R_1 &= 52/50 - 1 = 0.04,\\
R_2 &= 49/52 - 1 = -3/52 = -0.057692307\ldots,\\
R_3 &= 53/49 - 1 = 4/49 = 0.081632653\ldots,\\
R_4 &= 51/53 - 1 = -2/53 = -0.037735849\ldots,\\
R_5 &= 55/51 - 1 = 4/51 = 0.078431373\ldots.
\end{align*}
$$

Rounded to six decimals they are $0.040000$, $-0.057692$, $0.081633$, $-0.037736$, $0.078431$. Their sum is $0.104636$ at six decimals. The compound simple return does not use that sum. It uses the prices at the ends:

$$
\frac{55}{50} - 1 = 0.10.
$$

Equivalently, the product of the five exact gross returns telescopes to $55/50 = 1.10$. The compound return is smaller than the sum by about $0.0046$. That gap is the accumulated cross terms. It is small because the simple returns are a few per cent, and it is not zero. Reporting $0.104636$ as “the return over the five months” is a different claim from reporting $0.10$.
:::
:::

::: definition Log return {#def-log}
Given successive positive prices $P_{t-1}$ and $P_t$, the **log return** (continuously compounded return) is

$$
r_t = \ln(1+R_t) = \ln P_t - \ln P_{t-1}.
$$

Log returns add over time: $\sum_{t=1}^{T} r_t = \ln(P_T/P_0)$. They do not add across assets in a portfolio. Simple returns add across assets in a portfolio (the portfolio simple return is the value-weighted average of the component simple returns) and do not add over time.
:::

The two objects agree to first order when $R_t$ is small, because $\ln(1+x) = x - x^2/2 + \cdots$. For a simple return of $0.04$, the log return is $\ln(1.04) \approx 0.039221$. The gap is second order. For a simple return of $0.50$, the log return is $\ln(1.50) \approx 0.405465$, and the gap is no longer a rounding error. Choosing one convention and sticking to it is part of stating a model. Mixing them — adding simple returns across months, or averaging log returns across names in a portfolio and calling the average a portfolio return — produces a number that is not the return of any stated account.

::: example Log returns on the same closes {#ex-log}
On the closes of [[#ex-five]], compute the five log returns and confirm that they sum to $\ln(55/50)$.
::: solution
The five log returns are $\ln(52/50)$, $\ln(49/52)$, $\ln(53/49)$, $\ln(51/53)$ and $\ln(55/51)$. To six decimals they are $0.039221$, $-0.059423$, $0.078472$, $-0.038466$ and $0.075508$. Their sum is $0.095310$, which equals $\ln(1.10)$ to all printed decimals. The telescoping is an identity, not an approximation: every intermediate $\ln P_t$ cancels. The compound simple return of $0.10$ and the total log return of $0.095310$ are two descriptions of the same path from $50$ to $55$. Neither is a forecast of the next path.
:::
:::

A third object is needed as soon as a risk-free alternative is on the table.

::: definition Excess return {#def-excess}
Let $R_t$ be the simple return on a risky account and $R_{f,t}$ the simple return, over the same dates, on a default-free account that is known at the start of the step (a Treasury-bill return in many empirical implementations). The **excess return** is $R_t^e = R_t - R_{f,t}$. The **net risk-free rate** is $r_f$ when it is constant; the **gross risk-free rate** is $R_f = 1+r_f$. In this course, $R$ without a superscript is a gross or net simple return according to the surrounding notation, and $r$ is a log return or a net rate; each chapter says which.
:::

The excess return is what a mean–variance investor is compensated for bearing. It is also what a factor model will be asked to explain. Subtracting $R_{f,t}$ does not make the leftover unpredictable, and it does not make $R_{f,t}$ literally risk-free in real terms: inflation between $t-1$ and $t$ is not known at $t-1$. When we need a real risk-free payoff we will say so.

::: warning Adding simple returns across time
The five simple returns of [[#ex-five]] add to about $0.1046$. The account that held one share from $50$ to $55$ earned $0.10$. Adding the simple returns is a different arithmetic from compounding them. The same warning runs in the other direction: averaging log returns across names in a portfolio does not give the log return of the portfolio, because $\ln(\sum_i w_i e^{r_i})$ is not $\sum_i w_i r_i$. Use simple returns to mix assets, and log returns to mix dates, or convert explicitly.
:::

## Means, variances and the Sharpe ratio

A return over a future step is a random variable. We write $\E[R]$ for its mean, $\Var(R)$ for its variance and $\sigma(R) = \sqrt{\Var(R)}$ for its standard deviation, often called **volatility** in this field. For two returns, $\Cov(R_i, R_j) = \E[(R_i-\E[R_i])(R_j-\E[R_j])]$ and the correlation is $\rho_{ij} = \Cov(R_i,R_j)/(\sigma_i\sigma_j)$ when both standard deviations are positive. These are population objects. A sample of $T$ realised returns $\hat R_1,\ldots,\hat R_T$ produces a **sample mean** $\bar R = T^{-1}\sum_t \hat R_t$, a **sample variance** $s^2 = (T-1)^{-1}\sum_t (\hat R_t - \bar R)^2$, and a sample covariance defined analogously. The hat or the word “sample” is the distinction. Treating a sample mean as if it were $\E[R]$ is the step that turns a historical table into a forecast; this course does not take that step unless a model says so.

::: definition Sharpe ratio {#def-sharpe}
For a return $R$ and a risk-free rate $r_f$ over the same horizon, the **Sharpe ratio** is

$$
S = \frac{\E[R] - r_f}{\sigma(R)},
$$

provided $\sigma(R) > 0$. The sample Sharpe ratio replaces the population moments by sample moments. The ratio is not invariant to the length of the step: a monthly Sharpe is not twelve times an annual Sharpe, because means scale with time and standard deviations, for uncorrelated increments, scale with the square root of time.
:::

The Sharpe ratio is a slope in mean–standard-deviation space. [[asset-pricing/portfolio-choice]] will show that every mean–variance investor, facing a risk-free asset, wants the risky portfolio with the largest Sharpe ratio. That is a property of the mean–variance problem, not a ranking of funds for a reader to follow. Transaction costs, option-like payoffs and non-normality all make the ratio an incomplete summary; [[#def-sharpe]] does not claim otherwise.

::: example Sample moments on the five returns {#ex-moments}
On the five simple returns of [[#ex-five]], compute the sample mean, the sample standard deviation (divisor $T-1 = 4$), and the sample Sharpe ratio against a monthly risk-free simple return of $0.002$.
::: solution
The five returns add to $0.104635869$ at nine decimals, so the sample mean is $0.104635869/5 = 0.020927174$. The sample variance, divisor $4$, is $0.004244508$, and the sample standard deviation is $0.065150$ at six decimals. The sample mean excess return is $0.020927174 - 0.002 = 0.018927174$, so the sample Sharpe ratio is $0.018927174/0.065150 \approx 0.290$. That figure is a property of these five invented numbers. It is not an expected Sharpe ratio, and it is not comparable to an annual Sharpe ratio computed from a different series.
:::
:::

If log returns are modelled as i.i.d. normal, simple returns are i.i.d. log-normal. The mean of a simple return then exceeds the median, because a log-normal random variable is skewed to the right. Explicitly, if $r \sim N(\mu, \sigma^2)$ then $\E[e^r] = \exp(\mu + \sigma^2/2)$, so the expected simple return is $\exp(\mu+\sigma^2/2)-1$ while the median simple return is $e^\mu - 1$. With $\mu = 0.08$ and $\sigma = 0.20$ those two numbers are $0.105171$ and $0.083287$. Calling $0.08$ “the expected return” without saying whether it is the mean of the log or the mean of the simple return is a confusion of objects. The normal model is already a restriction: realised return histograms are typically more peaked at the centre and fatter in the tails than a normal density with the same variance, a regularity documented below.

::: widget distribution
dist: normal
params: mu=0.01, sigma=0.05
a: -0.09
b: 0.11
caption: A normal density with mean $0.01$ and standard deviation $0.05$, a monthly scale often used as a cartoon of equity returns. Shade a region in the left tail and read the probability. The figure is a distributional assumption, not a description of any index and not a forecast.
:::

::: widget distribution
dist: t
params: nu=4
a: -2
b: 2
caption: A Student's $t$ density with four degrees of freedom, mean zero, variance $2$. Compared with the normal, more probability sits in the tails. Lower the degrees of freedom toward $3$ and watch the tails thicken; raise them toward $30$ and the shape approaches the normal. Equity-return histograms are closer to the thick-tailed picture than to the thin-tailed one, which is a statement about past samples, not a prediction.
:::

The **annualisation** of a mean and of a volatility is a unit conversion under an assumption about dependence. If monthly simple returns are uncorrelated with constant mean $\mu_m$ and variance $\sigma_m^2$, the annual mean is $12\mu_m$ in the sum-of-simple-returns convention and $(1+\mu_m)^{12}-1$ in the compound convention, and the annual standard deviation of the *sum* is $\sigma_m\sqrt{12}$. Those two annual means are not the same number, and neither conversion survives serial correlation or time-varying volatility. Writing “$16$ per cent volatility” without a horizon is unfinished.

## Expected utility and risk aversion

Why would anyone pay less than $115$ for a lottery with mean $115$? Because the extra unit of wealth is worth less, in utility, when it arrives in the already-rich state than when it arrives in the poor state. That idea is older than portfolio theory.

::: definition Expected utility {#def-eu}
A decision maker with von Neumann–Morgenstern preferences over lotteries on wealth $W$ is represented by a strictly increasing, twice differentiable **utility function** $u$, unique up to a positive affine transformation, and ranks lotteries by $\E[u(W)]$. The decision maker is **risk averse** if $u$ is strictly concave, **risk neutral** if $u$ is linear, and **risk loving** if $u$ is strictly convex. By Jensen's inequality, risk aversion is equivalent to $\E[u(W)] < u(\E[W])$ for every non-degenerate lottery.
:::

The **certainty equivalent** $C$ of a lottery $W$ is defined by $u(C) = \E[u(W)]$; it is the sure wealth that the decision maker finds indifferent to the lottery. The **risk premium** $\Pi$ of the lottery is $\E[W] - C$. For a risk-averse decision maker, $\Pi > 0$: they would pay to replace the lottery by its mean. None of this yet says how $\Pi$ depends on the shape of $u$ or on the size of the gamble. That is the content of the Arrow–Pratt theory.

::: definition Arrow–Pratt coefficients {#def-arrow-pratt}
For a twice differentiable $u$ with $u' > 0$, the **Arrow–Pratt coefficient of absolute risk aversion** at wealth $W$ is

$$
A(W) = -\frac{u''(W)}{u'(W)},
$$

and the **coefficient of relative risk aversion** is

$$
R(W) = -W\frac{u''(W)}{u'(W)} = W\, A(W).
$$

Preferences are **decreasing absolute risk aversion** (DARA) if $A'(W) < 0$, **constant absolute risk aversion** (CARA) if $A$ is constant, **increasing absolute risk aversion** if $A'(W) > 0$, and likewise for relative risk aversion (DRRA, CRRA, IRRA).
:::

::: proposition Arrow–Pratt approximation {#prop-ap}
Let $W = \bar W + \tilde\varepsilon$ with $\E[\tilde\varepsilon] = 0$ and $\Var(\tilde\varepsilon) = \sigma^2$ small. For a risk-averse $u$, the risk premium $\Pi$ of this lottery satisfies

$$
\Pi = \tfrac12 A(\bar W)\, \sigma^2 + o(\sigma^2).
$$

In particular, of two twice differentiable utilities, the one with the larger $A$ at $\bar W$ requires the larger premium for a small gamble. Assumptions: $u$ is $C^2$ in a neighbourhood of $\bar W$, $u'(\bar W) > 0$, and the moments of $\tilde\varepsilon$ used in the Taylor remainder are finite.
:::

::: proof
Take a Taylor expansion of $u(\bar W + \tilde\varepsilon)$ about $\bar W$:

$$
u(\bar W + \tilde\varepsilon) = u(\bar W) + u'(\bar W)\tilde\varepsilon + \tfrac12 u''(\bar W)\tilde\varepsilon^2 + r(\tilde\varepsilon),
$$

where $r(\tilde\varepsilon)/\sigma^2 \to 0$ in expectation as $\sigma \to 0$ under the moment assumption. Taking expectations, $\E[u(W)] = u(\bar W) + \tfrac12 u''(\bar W)\sigma^2 + o(\sigma^2)$. The certainty equivalent satisfies $u(\bar W - \Pi) = \E[u(W)]$. Expanding the left-hand side, $u(\bar W) - u'(\bar W)\Pi + o(\Pi) = u(\bar W) + \tfrac12 u''(\bar W)\sigma^2 + o(\sigma^2)$. Solving for $\Pi$ and using $A = -u''/u'$ gives the claim. The comparison of two utilities is Pratt's theorem for small risks; the global version (one utility is more risk averse than another if and only if it is a concave transformation of the other) is in Pratt (1964, *Econometrica*).
:::

Two families are used constantly. **CARA** (exponential) utility $u(W) = -e^{-AW}$ for $A > 0$ has $A(W) = A$, independent of wealth. **CRRA** (isoelastic, power) utility

$$
u(C) = \begin{cases}
C^{1-\gamma}/(1-\gamma) & \gamma > 0,\; \gamma \neq 1,\\
\ln C & \gamma = 1,
\end{cases}
$$

has $R(C) = \gamma$, independent of $C$. Logarithmic utility is the $\gamma \to 1$ limit of the power family. CRRA is the workhorse of consumption-based pricing in [[asset-pricing/consumption-based-pricing]], because it makes portfolio shares independent of wealth and because it is defined on multiplicative shocks. CARA is convenient for additive normal shocks, and it has the unattractive implication that a richer agent invests the *same number of units* in a given additive gamble.

::: widget plot
f: ln(x)
f: -1/x
f: -1/(2*x^2)
x: 0.4, 3
y: -3, 1.2
labels: \ln C; \gamma{=}2; \gamma{=}3
caption: Three CRRA utilities, each shifted only by the convention of the formula. Raise $C$ and every curve flattens: extra wealth is worth less at the margin. The $\gamma = 3$ curve is more concave. The figure is a preference, not a market.
:::

::: example A two-outcome lottery under log utility {#ex-log-ce}
A decision maker with $u(W) = \ln W$ faces a $50$–$50$ lottery on wealth $150$ or $80$. Compute expected wealth, expected utility, the certainty equivalent and the risk premium.
::: solution
Expected wealth is $0.5\times 150 + 0.5\times 80 = 115$. Expected utility is $0.5\ln 150 + 0.5\ln 80 = \ln\sqrt{12000} = \ln(109.544511\ldots)$. The certainty equivalent is therefore $C = \sqrt{12000} \approx 109.545$. The risk premium is $115 - 109.545 = 5.455$. The decision maker is indifferent between the lottery and a sure $109.545$, and would pay up to $5.455$ to replace the lottery by its mean. These are properties of $\ln W$ on this lottery. They are not a premium that any asset “must” earn.
:::
:::

::: example The same lottery under $\gamma = 2$ {#ex-gamma2}
Repeat [[#ex-log-ce]] with $u(C) = -1/C$, which is CRRA with $\gamma = 2$.
::: solution
Expected utility is $0.5(-1/150) + 0.5(-1/80) = -0.00958333\ldots$. The certainty equivalent solves $-1/C = -0.00958333\ldots$, so $C = 1/0.00958333\ldots = 104.3478$. The risk premium is $115 - 104.348 = 10.652$. Relative to log utility, $\gamma = 2$ is more risk averse on this lottery, as [[#prop-ap]] requires, since $R(W) = 2 > 1$. The ranking of the two utilities is a ranking of concavity, not a statement about how any person does or should choose.
:::
:::

::: example A small additive gamble under CARA {#ex-cara}
A decision maker with $u(W) = -e^{-0.02 W}$ has current wealth $100$ and faces a $50$–$50$ additive gamble of $+10$ or $-10$. Compute the exact risk premium and the Arrow–Pratt approximation $\tfrac12 A \sigma^2$.
::: solution
The two wealth levels are $110$ and $90$. Expected utility is

$$
0.5\bigl(-e^{-0.02\times 110}\bigr) + 0.5\bigl(-e^{-0.02\times 90}\bigr) = -0.138051023.
$$

The certainty equivalent solves $-e^{-0.02 C} = -0.138051023$, so $C = -\ln(0.138051023)/0.02 \approx 99.0066$. The risk premium is $100 - 99.0066 = 0.9934$. The gamble has mean zero and variance $100$, and $A = 0.02$, so the approximation is $\tfrac12 \times 0.02 \times 100 = 1.00$. The exact premium is within one per cent of the approximation, as it should be for a gamble that is not a large fraction of wealth. The approximation is a local statement. It is not a pricing formula for Firm A's share.
:::
:::

::: intuition Concave utility prices the bad state more heavily
A one-unit loss from $\bar W$ costs more utility than a one-unit gain adds, because $u'$ is decreasing. Expected utility therefore weights the downside more than the arithmetic mean does. That reweighting is the whole of risk aversion in this model. A different psychology of gains and losses is taken up in [[asset-pricing/behavioural-finance]]; it is not a correction that one applies silently inside [[#def-eu]].
:::

## The price of risk

A risk-averse agent who can trade will not leave a fair gamble on the table if it is uncorrelated with everything else they already face: they can take a little of it, raise expected utility, and stop. They *will* leave a fair gamble on the table if taking it worsens the states that are already bad. The covariance of a payoff with the agent's marginal utility is therefore the quantity that has to be compensated. That sentence is the stochastic-discount-factor view of [[asset-pricing/stochastic-discount-factor]], and it is already visible here.

For small risks and smooth $u$, [[#prop-ap]] gives a mean–variance approximation: the agent ranks portfolios approximately by $\E[R_p] - \tfrac12 A \Var(R_p)$. Under that ranking, a payoff's contribution to the agent's risk is its covariance with the portfolio they already hold. In equilibrium, if every agent holds a piece of the same portfolio — the step that will produce the CAPM — that covariance becomes covariance with the market. None of those steps is free, and each one is named in the next two chapters.

Historically, the compensation that equity has paid over short default-free debt has been large relative to the covariance of equity with consumption. Mehra and Prescott (1985, *Journal of Monetary Economics*) report that, for the United States over $1889$–$1978$, the average real annual return on the Standard and Poor's composite was $6.98$ per cent, the average real return on short-term debt was $0.80$ per cent, and the difference — the **equity premium** — was $6.18$ percentage points, with a standard deviation of real equity returns of $16.54$ per cent. A representative-agent model with power utility and moderate $\gamma$ generates at most a few tenths of a percentage point of premium on those consumption moments; that gap is the **equity-premium puzzle**, treated in [[asset-pricing/consumption-based-pricing]]. The figures are a historical sample. They are not an expected premium from 1979 onwards, and they are not a required return for any named share.

A broader historical record, covering more countries and a longer window, is the Dimson–Marsh–Staunton database. In the *Credit Suisse Global Investment Returns Yearbook 2023* they report that, from $1900$ to $2022$ (123 years), a world equity index delivered an annualised real return in US dollars of $5.0$ per cent, against $1.7$ per cent on bonds and $0.4$ per cent on bills; world equities outperformed bills by $4.6$ per cent per year and bonds by $3.3$ per cent per year. Equities outperformed bonds, bills and inflation in all $35$ markets in their study. Australia recorded an annualised real USD return of $6.43$ per cent, the United States $6.38$ per cent. These are geometric (compound) real returns with income reinvested, not forecasts, and not a ranking of countries in which a reader should hold shares. The world figure is lower than the US figure, which is one reason for not treating the US record as the parameter of a representative agent.

::: quiz
A fully invested account moves from $50$ to $55$ over five months, with the simple returns of [[#ex-five]]. Which number is the compound simple return of the account?
- [ ] $0.104636$, the sum of the five simple returns
- [x] $0.10$, equal to $55/50 - 1$
- [ ] $0.095310$, the sum of the five log returns
- [ ] $0.020927$, the sample mean of the five simple returns
::: solution
The compound simple return uses the two end prices, or the product of gross returns, and equals $0.10$. The sum of simple returns is a different arithmetic. The sum of log returns equals $\ln(1.10)$ and is the total log return, not the simple compound. The sample mean is a per-month average, not the five-month compound.
:::
:::

## Evidence: stylised facts of returns

The statistical regularities below are **stylised facts**: empirical regularities documented on particular samples, not theorems, and not claims that the next sample will look the same. They constrain the models we write down. They do not, by themselves, identify a risk premium.

**Fat tails.** Daily and monthly equity-index returns have more mass in the extremes than a normal distribution with the same variance. Mandelbrot (1963, *Journal of Business*) made the observation on cotton prices; Fama (1965, *Journal of Business*) documented it on US share prices. A Student's $t$ with between three and six degrees of freedom is a common cartoon of daily index returns. Kurtosis estimates are sample-dependent and are pulled around by single days; the qualitative fact that the normal understates crash frequency is stable across post-war samples of major indices.

**Negative skewness in indices, positive in single names.** Index returns, especially at daily and weekly horizons, are typically negatively skewed: large down days are larger than large up days. Individual-share returns are often positively skewed. Aggregation, and the fact that shares tend to fall together, is the usual account of the difference. Skewness is a third moment; mean–variance theory ignores it, which is a limitation of [[asset-pricing/portfolio-choice]] rather than a defect of the data.

**Volatility clustering.** Large moves tend to be followed by large moves, of either sign. Engle's ARCH model (1982, *Econometrica*) and Bollerslev's GARCH (1986, *Journal of Econometrics*) are the standard statistical descriptions. Clustering does not, by itself, produce a risk premium: a risk-neutral agent would still be indifferent to a fair gamble whose variance comes in bunches. It does mean that a constant-$\sigma$ assumption is false at high frequency, and that sample Sharpe ratios over short windows are noisy.

**Leverage correlation.** For equity indices, volatility tends to rise when the index falls. Black (1976) proposed a leverage story (a lower share price raises the debt-to-equity ratio of the firm); a risk-premium story, in which news that raises expected returns raises current volatility and cuts current prices, is the main alternative. The correlation is a fact about indices. It is weaker, and sometimes absent, for individual shares and for many non-equity assets.

**Diversification of idiosyncratic noise.** The variance of an equal-weighted portfolio of $n$ shares whose idiosyncratic shocks are uncorrelated falls like $1/n$, plus any common factor. With a common standard deviation of $0.20$ and an idiosyncratic standard deviation of $0.25$ per name, the portfolio standard deviation is $\sqrt{0.20^2 + 0.25^2/n}$, which is $0.320$ at $n=1$, $0.229$ at $n=5$, $0.215$ at $n=10$ and $0.202$ at $n=100$. Most of the idiosyncratic variance is gone by a few dozen names; the common factor remains. That arithmetic is the starting point of [[asset-pricing/portfolio-choice]]. It is not a recommendation to hold any particular $n$.

None of these regularities is a theorem, and none of them is a trading rule. They are the shape of the raw material that a pricing model is asked to digest.

## Where this leads

[[asset-pricing/portfolio-choice]] takes the mean and the variance as the agent's objects of choice and builds the efficient frontier. [[asset-pricing/capm]] puts many such agents into equilibrium and prices covariance with the market. [[asset-pricing/stochastic-discount-factor]] returns to the covariance with marginal utility and shows that every no-arbitrage model in this course is a special case of $p = \E[mx]$. The equity-premium numbers cited above become a quantitative test in [[asset-pricing/consumption-based-pricing]]. Throughout, a sample mean is a sample mean. Replacing it by $\E[R]$ is a modelling step, and it should be written down as one.

::: history
In 1738 Daniel Bernoulli published *Specimen theoriae novae de mensura sortis* in the *Commentarii* of the Imperial Academy of Sciences of St Petersburg. A lottery that pays $2^k$ units with probability $2^{-k}$ for $k = 1, 2, \ldots$ has infinite expected value, yet no one would pay an infinite price for it; that is the St Petersburg paradox. Bernoulli proposed that the value of a gamble is the expected *logarithm* of wealth, which is finite for that lottery, and he motivated the logarithm by diminishing marginal value of additional wealth. The paper is the ancestor of [[#def-eu]] and of logarithmic utility. It is not a theory of market prices: there is no clearing, and no second agent. Expected-utility theory in its modern form is von Neumann and Morgenstern's 1944 *Theory of Games and Economic Behavior*; the Arrow–Pratt coefficients are from Pratt (1964, *Econometrica*) and Arrow's 1965 Yrjö Jahnsson lectures, *Aspects of the Theory of Risk-Bearing*.
:::

::: summary
- The simple return is $R_t = P_t/P_{t-1} - 1$. Compound simple returns multiply gross returns; they do not add. On the invented closes $50$ to $55$, the compound simple return is $0.10$ and the five simple returns add to about $0.1046$.
- Log returns $r_t = \ln(1+R_t)$ add over time and not across assets. Simple returns add across assets in a portfolio and not over time.
- The excess return is $R_t - R_{f,t}$. The Sharpe ratio is mean excess return per unit of standard deviation, at a stated horizon.
- A sample mean is not $\E[R]$. Annualising a mean and a volatility uses an assumption about dependence that should be stated.
- Risk aversion is concavity of $u$. The Arrow–Pratt coefficient $A(W) = -u''(W)/u'(W)$ converts a small variance into a risk premium $\Pi \approx \tfrac12 A \sigma^2$.
- CRRA utility has constant relative risk aversion $\gamma$; CARA has constant absolute risk aversion $A$. Logarithmic utility is CRRA with $\gamma = 1$.
- Mehra and Prescott (1985) report a US real equity premium of $6.18$ percentage points over $1889$–$1978$. Dimson, Marsh and Staunton (2023) report a world geometric real equity return of $5.0$ per cent per year over $1900$–$2022$, against $0.4$ per cent on bills. Both are historical samples, not expected returns.
:::

## Exercises

::: exercise The fifth simple return {level=1 check="4/51"}
On the invented closes of [[#ex-five]], enter the exact simple return from $51$ to $55$.
::: solution
$55/51 - 1 = 4/51$. The decimal is $0.078431$ at six places. The compound return from $50$ to $55$ is $0.10$, which is a different object, and the log return on this step is $\ln(55/51) \approx 0.075508$, also a different object.
:::
:::

::: exercise Compound versus sum {level=1 check="0.1"}
Enter the compound simple return of the account in [[#ex-five]] as a decimal.
::: solution
$55/50 - 1 = 0.1$ exactly. The sum of the five simple returns is about $0.1046$ and is not the answer. The total log return is $\ln(1.1) \approx 0.09531$ and is not the answer either.
:::
:::

::: exercise A log-normal mean {level=1 check="0.105171"}
Log returns are modelled as $N(0.08, 0.20^2)$. Enter the expected simple return $\exp(\mu+\sigma^2/2) - 1$ to six decimals.
::: solution
$\mu + \sigma^2/2 = 0.08 + 0.02 = 0.10$, so $\exp(0.10) - 1 = 0.105170918\ldots$, which rounds to $0.105171$. The median simple return is $e^{0.08}-1 \approx 0.083287$, a smaller number. The $0.08$ in the question is the mean of the *log*, not the mean of the simple return.
:::
:::

::: exercise Sample Sharpe {level=2 check="0.290"}
Using the sample mean excess return $0.018927$ and the sample standard deviation $0.065150$ from [[#ex-moments]], enter the sample Sharpe ratio to three decimals.
::: solution
$0.018927 / 0.065150 \approx 0.29048$, which rounds to $0.290$. The inputs already subtract a monthly risk-free simple return of $0.002$. Annualising this figure by multiplying by $\sqrt{12}$ would be a further assumption about serial correlation, and is not asked.
:::
:::

::: exercise Certainty equivalent under log utility {level=2 check="109.545"}
For the lottery of [[#ex-log-ce]], enter the certainty equivalent to three decimals.
::: solution
$C = \sqrt{150\times 80} = \sqrt{12000} \approx 109.544511$, which rounds to $109.545$. Expected wealth is $115$; the risk premium is about $5.455$. The square root is the geometric mean of the two outcomes, which is the certainty equivalent of log utility on a two-point, equal-probability lottery.
:::
:::

::: exercise Arrow–Pratt on a small gamble {level=2 check="1"}
A CARA decision maker has $A = 0.02$ and faces a mean-zero additive gamble of variance $100$. Enter the Arrow–Pratt approximate risk premium $\tfrac12 A\sigma^2$.
::: solution
$\tfrac12 \times 0.02 \times 100 = 1$. [[#ex-cara]] computed the exact premium on the two-point gamble $+10$ or $-10$ as $0.993$, which is the same approximation target. The formula is local; it is not the price of a share.
:::
:::

::: exercise Diversification of uncorrelated noise {level=3 check="0.215"}
Each name has a common-factor standard deviation of $0.20$ and an idiosyncratic standard deviation of $0.25$, with idiosyncratic shocks uncorrelated across names. Enter the standard deviation of an equal-weighted portfolio of $n = 10$ names, to three decimals.
::: hint
The portfolio variance is $0.20^2 + 0.25^2/n$.
:::
::: solution
$\sqrt{0.04 + 0.0625/10} = \sqrt{0.04625} \approx 0.215058$, which rounds to $0.215$. At $n=1$ the same formula gives $0.320$; at $n=100$ it gives $0.202$. The common factor is a floor. The calculation assumes equal weights, identical residual variances and zero residual correlation; if residuals are correlated the floor is higher.
:::
:::

::: exercise Relative risk aversion of power utility {level=3}
For $u(C) = C^{1-\gamma}/(1-\gamma)$ with $\gamma > 0$, $\gamma \neq 1$, compute $A(C)$ and $R(C)$. Then take the limit $\gamma \to 1$ and recover the coefficients of $\ln C$.
::: hint
Differentiate: $u'(C) = C^{-\gamma}$ and $u''(C) = -\gamma C^{-\gamma-1}$. Relative risk aversion is $-C u''/u'$.
:::
::: solution
$u'(C) = C^{-\gamma}$ and $u''(C) = -\gamma C^{-\gamma-1}$, so

$$
A(C) = \frac{\gamma C^{-\gamma-1}}{C^{-\gamma}} = \frac{\gamma}{C}, \qquad R(C) = C\cdot\frac{\gamma}{C} = \gamma.
$$

Relative risk aversion is constant and equal to the exponent. For $u(C) = \ln C$, $u' = 1/C$ and $u'' = -1/C^2$, so $A(C) = 1/C$ and $R(C) = 1$, which is the $\gamma \to 1$ case. The family is therefore CRRA for every $\gamma > 0$, logarithm included. Absolute risk aversion falls with $C$, so the family is DARA as well as CRRA: a richer agent is willing to take a larger *additive* gamble, but invests a constant *share* of wealth in a multiplicative gamble.
:::
:::
