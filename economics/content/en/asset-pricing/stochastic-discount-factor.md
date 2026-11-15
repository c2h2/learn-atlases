Every model in this course is a way of attaching a present value to a risky payoff. The **stochastic discount factor** (SDF, also called a pricing kernel) is the object that does the attaching: a random variable $m$ such that the price of a payoff $x$ is $p = \E[mx]$. The CAPM, the APT, the consumption Euler equation and the term-structure models of later chapters are all statements about $m$. This chapter derives $p = \E[mx]$ from no arbitrage in a finite state space, connects $m$ to **state prices** and to **risk-neutral probabilities**, and obtains the Hansen–Jagannathan bound on how volatile $m$ has to be. The two-state numbers are invented. The bound applied to historical premia is a calculation on those premia, not a forecast.

The CAPM of [[asset-pricing/capm]] is the special case $m$ linear in the market return. Factor models of [[asset-pricing/factor-models]] are $m$ linear in the factors. Consumption-based pricing of [[asset-pricing/consumption-based-pricing]] is $m$ equal to the marginal rate of substitution.

## State prices and no arbitrage

A finite set of states $s = 1,\ldots,S$, with physical probabilities $\pi_s > 0$, is enough to see the structure. A **payoff** is a vector $\mathbf{x} = (x_1,\ldots,x_S)$. A **state-contingent claim**, or **Arrow security** $s$, pays one unit in state $s$ and nothing otherwise. If every Arrow security is traded, markets are **complete**, and every payoff is a bundle of Arrow securities.

::: definition Arbitrage {#def-arb}
An **arbitrage** is a portfolio that (i) costs no more than zero today, (ii) pays at least zero in every state, and (iii) either costs strictly less than zero, or pays strictly more than zero in some state. Equivalently: a free lunch, with no chance of a later bill. A market is **arbitrage-free** if no such portfolio exists.
:::

::: theorem Fundamental theorem, finite states {#thm-ftap}
In a finite-state market, the following are equivalent. (1) There is no arbitrage. (2) There exists a strictly positive state-price vector $\mathbf{q} \gg \mathbf{0}$ such that every traded payoff $\mathbf{x}$ with price $p$ satisfies $p = \mathbf{q}\T\mathbf{x}$. (3) There exists a strictly positive random variable $m$ such that $p = \E[m x]$ for every traded payoff. If markets are complete, $\mathbf{q}$ and $m$ are unique. Assumptions: finite $S$, free portfolio formation, and a payoff space that is a linear subspace of $\R^S$.
:::

::: proof
Sketch, in the complete-market case; the incomplete case is a separating-hyperplane argument. If every Arrow security is traded at price $q_s$, then $p = \sum_s q_s x_s$ for every payoff, which is (2). Set $m_s = q_s / \pi_s$. Then $\E[mx] = \sum_s \pi_s m_s x_s = \sum_s q_s x_s = p$, which is (3), and $m_s > 0$ because $q_s > 0$ and $\pi_s > 0$. Conversely, if some $q_s \le 0$, buying (if $q_s < 0$) or selling (if $q_s = 0$ and some other price is inconsistent) the corresponding Arrow security is an arbitrage, so (1) requires $q \gg 0$. Uniqueness in complete markets: $S$ independent payoffs pin down $S$ state prices. In incomplete markets the same $p = \E[mx]$ must hold for every $m$ in a convex set of strictly positive random variables that agree on the traded subspace; existence of at least one such $m$ is equivalent to no arbitrage, by separating a positive cone from the marketed payoff-and-price subspace.
:::

The random variable $m$ is the **stochastic discount factor**. The name records the two jobs it does: it discounts (its mean is the price of a unit of sure payoff), and it is stochastic (it varies across states, which is how it prices risk).

::: definition Stochastic discount factor {#def-sdf}
A **stochastic discount factor** for a set of payoffs is a random variable $m$ such that

$$
p = \E[m x]
$$

for every traded payoff $x$ with price $p$. For a gross return $R = x/p$, this is the **fundamental pricing equation**

$$
\E[m R] = 1.
$$

If a risk-free gross return $R_f$ is traded, $\E[m] = 1/R_f$. Strict positivity of $m$ is equivalent to no arbitrage, by [[#thm-ftap]].
:::

The covariance form of the same equation is the asset-pricing equation in the form most people use:

$$
\E[R] - R_f = - R_f \Cov(m, R),
$$

which follows from $\E[mR] = \E[m]\E[R] + \Cov(m,R) = 1$ and $\E[m] = 1/R_f$. An asset that pays off in states where $m$ is high — states where a unit of payoff is precious — has a negative covariance with $m$, a lower expected return, and a higher price. That is the whole of “priced risk” in this language. The CAPM is the claim that $m$ is (affine in) the market return; the CCAPM is the claim that $m$ is (affine in) consumption growth. A factor model is the claim that $m$ is affine in the factors.

## A two-state market, worked

Two states, equally likely. A risk-free bond costs $1$ today and pays $1.03$ in both states, so $R_f = 1.03$. A risky claim costs $100$ today and pays $120$ in state $1$ and $90$ in state $2$, so its gross returns are $1.20$ and $0.90$. Markets are complete: two independent payoffs, two states.

::: example State prices, $m$, and risk-neutral probabilities {#ex-two-state}
Compute the Arrow prices $q_1, q_2$, the SDF $(m_1, m_2)$, and the risk-neutral probabilities. Verify $\E[m R] = 1$ for both the bond and the risky claim, and that the risk-neutral expectation of the risky gross return equals $R_f$.
::: solution
Let $q_s$ be the price of one unit in state $s$. The bond and the risky claim give

$$
1.03\, q_1 + 1.03\, q_2 = 1, \qquad 120\, q_1 + 90\, q_2 = 100.
$$

The first says $q_1 + q_2 = 1/1.03 \approx 0.970874$. Substituting into the second, $120 q_1 + 90(0.970874 - q_1) = 100$, so $30 q_1 = 100 - 87.3786 = 12.6214$ and $q_1 \approx 0.4207$, $q_2 \approx 0.5502$. Then

$$
m_s = q_s / \pi_s \implies m_1 \approx 0.8414, \qquad m_2 \approx 1.1003.
$$

$m$ is higher in state $2$, the state in which the risky claim pays $90$ rather than $120$: that is the state in which a unit of payoff is more valuable, so it is the state the SDF weights more heavily. Check: $\E[m] = 0.5(0.8414 + 1.1003) = 0.97085 \approx 1/1.03$. For the risky claim, $0.5(0.8414\times 1.20 + 1.1003\times 0.90) = 0.5(1.0097 + 0.9903) = 1$. **Risk-neutral probabilities** are $\pi^*_s = q_s / \sum_{s'} q_{s'}$, so $\pi^*_1 \approx 0.4333$ and $\pi^*_2 \approx 0.5667$. The risk-neutral expectation of the risky gross return is $0.4333\times 1.20 + 0.5667\times 0.90 = 1.03 = R_f$. Under $\pi^*$, every asset earns $R_f$; risk has been moved into the probabilities. The numbers are invented, and the equality is an identity of a complete two-state market, not a property of any index.
:::
:::

::: definition Risk-neutral probabilities {#def-rn}
Given an SDF $m$ and physical probabilities $\pi_s$, the **risk-neutral probabilities** are $\pi^*_s = \pi_s m_s / \E[m]$. Equivalently, $\pi^*_s = q_s / \sum_{s'} q_{s'}$. They are positive and sum to one if $m \gg 0$. The pricing equation becomes

$$
p = \frac{1}{R_f}\, \E^*[x],
$$

the discounted risk-neutral expectation of the payoff. $\E^*$ does not represent anyone's beliefs; it is a change of measure that absorbs risk adjustment into the probabilities so that discounting can be done at $R_f$.
:::

The risk-neutral probability of the bad state, in [[#ex-two-state]], is $0.5667 > 0.5$: the change of measure *overweights* the state that the SDF already overweights. That is how a risk-averse representative agent, whose $m$ is high when consumption is low, shows up in option prices and in bond prices. [[derivatives]] will use $\E^*$ constantly. This chapter only needs the definition.

::: widget plot
f: 0.97
f: 0.8414 + (1.1003-0.8414)*(x>1.5)
x: 0.5, 2.5
y: 0.6, 1.3
labels: \E[m]; m
caption: A two-point SDF from [[#ex-two-state]]: $m = 0.8414$ in the good state (drawn on the left) and $m = 1.1003$ in the bad state (drawn on the right), with $\E[m] \approx 0.971 = 1/R_f$. The step is the whole of priced risk in a two-state world. The figure is the invented market, not a forecast of any $m$.
:::

## The Hansen–Jagannathan bound

An SDF that prices a set of returns cannot be too smooth. If it were, $\Cov(m, R)$ would be too small to explain the premia on those returns.

::: proposition Hansen–Jagannathan bound {#prop-hj}
If $m$ prices a vector of gross returns $\mathbf{R}$, then for every portfolio $R$ formed from those returns,

$$
\frac{\sigma(m)}{\E[m]} \ge \frac{\lvert \E[R] - R_f\rvert}{\sigma(R)},
$$

whenever $\sigma(R) > 0$ and a risk-free rate is traded (so $\E[m] = 1/R_f$). Equivalently, the ratio of the standard deviation of $m$ to its mean is at least the largest absolute Sharpe ratio attainable from the assets being priced. Assumptions: $m$ prices the assets (so $\E[mR] = 1$), finite second moments, and $R_f$ traded. The bound does not require completeness or positivity of $m$; a tighter bound with $m > 0$ imposed is in Hansen and Jagannathan (1991, *Journal of Political Economy*).
:::

::: proof
From $\E[mR] = 1 = \E[m]\E[R] + \Cov(m,R)$, we have $\lvert \E[R] - R_f\rvert = R_f \lvert\Cov(m,R)\rvert \le R_f \sigma(m)\sigma(R)$, by Cauchy–Schwarz. Dividing by $\sigma(R)$ and using $R_f = 1/\E[m]$ gives the claim. Equality holds when $m$ is perfectly correlated with $R$ (more precisely, when $m - \E[m]$ is collinear with $R - \E[R]$), which is the case in a complete two-state market with one risky asset, as in [[#ex-two-state]].
:::

::: example Covariance form on the two-state claim {#ex-cov-form}
In [[#ex-two-state]], compute $\Cov(m,R)$ from the two equally likely pairs $(m,R) = (0.8414, 1.20)$ and $(1.1003, 0.90)$, and verify that $\E[R] - R_f = -R_f \Cov(m,R)$.
::: solution
Means: $\E[m] \approx 0.97085$, $\E[R] = 1.05$. The products of deviations are $(0.8414-0.97085)(1.20-1.05) = (-0.12945)(0.15) = -0.01942$ and $(1.1003-0.97085)(0.90-1.05) = (0.12945)(-0.15) = -0.01942$. So $\Cov(m,R) = -0.01942$. Then $-R_f\Cov(m,R) = -1.03\times(-0.01942) \approx 0.0200$, which equals $\E[R]-R_f = 0.02$. The risky claim pays *little* when $m$ is *high*, so the covariance is negative and the premium is positive. That is the only sense in which this claim is “risky” for pricing.
:::
:::

::: example The bound on the two-state SDF {#ex-hj-two}
In [[#ex-two-state]], compute the Sharpe ratio of the risky claim and the ratio $\sigma(m)/\E[m]$, and confirm equality.
::: solution
The risky gross return has mean $1.05$ and takes the two values $1.20$ and $0.90$, so $\sigma(R) = 0.15$. The excess mean is $1.05 - 1.03 = 0.02$, and the Sharpe ratio is $0.02/0.15 \approx 0.1333$. The SDF takes $0.8414$ and $1.1003$, with mean $0.97085$ and $\sigma(m) = 0.12945$. Then $\sigma(m)/\E[m] \approx 0.12945/0.97085 \approx 0.1333$. Equality holds because $m$ is an affine function of $R$ in this complete two-state market. The calculation is an identity check, not a test.
:::
:::

Applied to historical premia the bound becomes a test. Mehra and Prescott's 1889–1978 US numbers (real equity premium $6.18$ percentage points, standard deviation of real equity returns $16.54$ per cent) give a Sharpe ratio of about $0.374$. With a mean real risk-free rate of $0.80$ per cent, $\E[m] \approx 1/1.008 \approx 0.992$, so any SDF that prices those two assets must satisfy $\sigma(m) \ge 0.37$. A power-utility SDF $m = \beta (C_{t+1}/C_t)^{-\gamma}$ has, to a log-linear approximation, $\sigma(m) \approx \gamma \sigma(\Delta \ln C)$. Mehra and Prescott's consumption-growth standard deviation is $3.57$ per cent a year, so $\gamma = 2$ delivers $\sigma(m) \approx 0.07$, well below $0.37$, and $\gamma \approx 10$ is needed to meet the bound — before one asks whether that $\gamma$ is consistent with the risk-free rate. That is the Hansen–Jagannathan version of the equity-premium puzzle, taken up in the next chapter. The inputs are a historical sample. The bound is a necessary condition on any model that claims to price that sample.

::: widget plot
f: 0.374*x
f: 2*0.0357
f: 10*0.0357
x: 0, 1.2
y: 0, 0.5
labels: \text{HJ min } \sigma(m); \gamma{=}2; \gamma{=}10
caption: A cartoon of [[#prop-hj]] on the Mehra–Prescott Sharpe ratio of about $0.374$. The upward line is the minimum $\sigma(m)$ as a function of $\E[m]$; at $\E[m]\approx 1$ it is $0.374$. The two horizontal lines are the approximate $\sigma(m)$ of power utility at $\gamma = 2$ and $\gamma = 10$, using $\sigma(\Delta\ln C) = 0.0357$. The $\gamma = 2$ line sits well below the bound. The figure uses 1889–1978 US sample moments (Mehra and Prescott 1985); it is not a forecast of the premium.
:::

## Unification

The SDF is not an extra model. It is a language.

- **Mean–variance and the CAPM.** If a risk-free asset is traded and a mean–variance-efficient risky portfolio $m_{\mathrm{mv}}$ exists, there is an SDF that is affine in $R_{m_{\mathrm{mv}}}$. The CAPM is the further claim that $m_{\mathrm{mv}}$ is the market return. Cochrane (2005, ch. 6) is the textbook development of this equivalence.
- **Factor models.** $\E[R_i^e] = \boldsymbol\beta_i\T\boldsymbol\lambda$ for a vector of factor excess returns is equivalent to an SDF $m = a - \mathbf{b}\T\mathbf{f}$ that is affine in the factors, with $\mathbf{b}$ proportional to $\Sigma_f^{-1}\boldsymbol\lambda$. The APT's approximate statement is an approximate affine $m$.
- **Expected utility.** An agent who can trade at the prices $p$ and who maximises $\E[u(W)]$ has a first-order condition $p\, u'(W_0) = \E[u'(W_1) x]$, so $m = u'(W_1)/u'(W_0)$ (up to a discount factor $\beta$ if utility is time-separable). Complete markets make this $m$ unique, hence common to all agents at the margin, and it becomes a representative-agent $m$.
- **No arbitrage without utility.** [[#thm-ftap]] does not need a utility function. It needs the absence of a free lunch. Utility identifies *which* $m$, among those that price the traded assets, is the one a given agent uses.

::: example An affine factor SDF {#ex-affine}
A one-factor model has $m = a - b f$ with $f$ a mean-zero factor, $a = 0.97$ and $b = 1.5$. An asset has $\Cov(f, R) = 0.04$ and $\E[R] = 1.08$. Does this $m$ price the asset, given $R_f = 1/0.97$?
::: solution
$\E[m] = a = 0.97$, so $R_f = 1/0.97 \approx 1.0309$. Then $\Cov(m,R) = -b\Cov(f,R) = -1.5\times 0.04 = -0.06$, and $-R_f\Cov(m,R) \approx 1.0309\times 0.06 \approx 0.0619$. The asset's excess return is $1.08 - 1.0309 = 0.0491$, which is *smaller* than $0.0619$. This $m$ does **not** price the asset: the implied premium is too large. Either $b$ is too big, or $\Cov(f,R)$ is too big, or the asset has a negative alpha relative to this factor. The arithmetic is the test $\E[mR] = 1$ in covariance clothes. The numbers are invented.
:::
:::

A test of a model is then a test of a restriction on $m$: that it is affine in $R_m$, or affine in SMB and HML, or equal to $\beta (C_{t+1}/C_t)^{-\gamma}$. Hansen's GMM (1982) is the natural estimator of those restrictions, because $\E[mR-1] = 0$ is a moment condition. This course stops at the moment condition; the GMM mechanics are in a later econometrics course.

::: quiz
In the two-state example, $m$ is higher in the state where the risky claim pays $90$ rather than $120$. Why, in words, does that make the risky claim's expected return higher than $R_f$?
- [ ] Because $m$ is a probability, and the bad state is more likely
- [x] Because the claim pays little in the state where payoff is precious, so $\Cov(m,R) < 0$ and $\E[R] - R_f = -R_f\Cov(m,R) > 0$
- [ ] Because $m$ is higher than one, which raises all expected returns
- [ ] Because risk-neutral probabilities are physical probabilities
::: solution
The covariance form is the whole argument. $m$ is not a probability (the risk-neutral probabilities are $\pi^*$). $\E[m] < 1$ here, not greater. $\pi^* \neq \pi$; that is the point of [[#def-rn]].
:::
:::

::: warning Treating $\E^*$ as a forecast
The risk-neutral expectation $\E^*[x]$ is a pricing operator. It is not the physical expectation $\E[x]$, and it is not a forecast of $x$. Option-implied distributions, which are $\pi^*$ in continuous state spaces, overweight the states that $m$ overweights. Reading them as “the market's forecast” without the change of measure is a category error. The physical forecast, if one insists on the word, is $\E[x]$, which requires $\pi$, not $\pi^*$.
:::

## Where this leads

[[asset-pricing/consumption-based-pricing]] identifies $m$ with the marginal rate of substitution and runs into the Hansen–Jagannathan bound at US consumption moments. [[asset-pricing/fixed-income]] is the specialisation to default-free bonds, where $m$ prices every horizon and the forward curve is a statement about $\E^*[1/R_{t,t+1}]$. [[derivatives]] prices payoffs that are non-linear in an underlying by computing $\E^*[\cdot]$ on a tree or with a PDE, which is [[#def-rn]] in computational clothes. The next time a model is written down in this course, the right first question is: what is $m$?

::: history
Kenneth Arrow's 1953 paper 'Le rôle des valeurs boursières pour la répartition la meilleure des risques', published in the CNRS volume *Économétrie*, introduced complete markets of state-contingent claims; Debreu's *Theory of Value* (1959) gave the definitive treatment. The equivalence of no arbitrage and a positive state-price vector, in finite markets, is in Ross (1978, *Journal of Economic Theory*) and, in a form closer to [[#thm-ftap]], in Harrison and Kreps (1979, *Journal of Economic Theory*) and Harrison and Pliska (1981, *Stochastic Processes and their Applications*). Hansen and Jagannathan (1991, *Journal of Political Economy*) derived [[#prop-hj]]. Cochrane's *Asset Pricing* (2005) organised the graduate field around $p = \E[mx]$; this chapter is the undergraduate version of that organisation. Hansen shared the 2013 Nobel Memorial Prize with Fama and Shiller.
:::

::: summary
- No arbitrage, in finite states, is equivalent to a strictly positive SDF $m$ with $p = \E[mx]$, and to strictly positive state prices $q_s = \pi_s m_s$. In complete markets $m$ is unique.
- For a gross return, $\E[mR] = 1$. If $R_f$ is traded, $\E[m] = 1/R_f$ and $\E[R] - R_f = -R_f\Cov(m,R)$.
- In the invented two-state market, $q \approx (0.4207, 0.5502)$, $m \approx (0.8414, 1.1003)$, $\pi^* \approx (0.4333, 0.5667)$. The risky claim's risk-neutral expectation equals $R_f = 1.03$.
- Risk-neutral probabilities absorb risk adjustment; $\E^*$ is a pricing operator, not a forecast.
- The Hansen–Jagannathan bound says $\sigma(m)/\E[m]$ is at least the maximum Sharpe ratio of the assets being priced. On Mehra and Prescott's 1889–1978 numbers that floor is about $0.37$; power utility at $\gamma = 2$ delivers about $0.07$.
- The CAPM, factor models and the CCAPM are restrictions on $m$. A test of a model is a test of those restrictions.
:::

## Exercises

::: exercise Mean of $m$ {level=1 check="0.970874"}
If $R_f = 1.03$, enter $\E[m]$ to six decimals.
::: solution
$\E[m] = 1/1.03 \approx 0.970874$. This is the price of a unit of sure next-period payoff, and it is $q_1+q_2$ in [[#ex-two-state]].
:::
:::

::: exercise State price $q_1$ {level=1 check="0.4207"}
From [[#ex-two-state]], enter $q_1$ to four decimals.
::: solution
$q_1 \approx 0.4207$. Then $q_2 \approx 0.5502$ and $m_1 = q_1/0.5 \approx 0.8414$.
:::
:::

::: exercise Risk-neutral probability {level=1 check="0.4333"}
Enter $\pi^*_1$ from [[#ex-two-state]] to four decimals.
::: solution
$\pi^*_1 = q_1/(q_1+q_2) \approx 0.4207/0.9709 \approx 0.4333$. The physical probability is $0.5$; the difference is the change of measure.
:::
:::

::: exercise Covariance form {level=2 check="0.02"}
Using $\E[R] = 1.05$, $R_f = 1.03$ and the covariance form, enter $\E[R]-R_f$ for the risky claim in [[#ex-two-state]].
::: solution
$1.05-1.03 = 0.02$. The same number is $-R_f\Cov(m,R)$. With $\sigma(R) = 0.15$ the Sharpe ratio is $0.1333$, matching $\sigma(m)/\E[m]$.
:::
:::

::: exercise An incomplete-market $m$ {level=2}
Markets have three states and only the risk-free bond is traded, at $R_f = 1.02$. Give two different strictly positive SDFs that price the bond, and explain why both are compatible with [[#thm-ftap]].
::: solution
The only restriction is $\E[m] = 1/1.02 \approx 0.9804$. For example $m = (0.98, 0.98, 0.9812)$ (almost flat) and $m = (0.5, 1.0, 1.4412)$, both with mean $0.9804$ and all coordinates positive, both price the bond. They price *other* payoffs differently: the second puts much more weight on state $3$. Because those other payoffs are not traded, no arbitrage is silent about them, and both $m$'s are admissible. Completeness would have pinned $m$ down. This is why an incomplete-market model has to say more than no arbitrage in order to price a new payoff.
:::
:::

::: exercise HJ on Mehra–Prescott {level=2 check="0.374"}
Using a premium of $6.18$ per cent and a standard deviation of $16.54$ per cent, enter the Sharpe ratio to three decimals.
::: solution
$6.18/16.54 \approx 0.3736$, which rounds to $0.374$. The HJ floor on $\sigma(m)/\E[m]$ is this number. With $\E[m]\approx 0.992$ the floor on $\sigma(m)$ is about $0.371$. These are 1889–1978 US sample moments from Mehra and Prescott (1985), not expected values.
:::
:::

::: exercise From the CAPM to $m$ {level=3}
Suppose the CAPM holds: $\E[R_i] = R_f + \beta_{im}(\E[R_m]-R_f)$ for every $i$. Show that $m = a + b R_m$, for $a$ and $b$ that you identify in terms of $R_f$, $\E[R_m]$ and $\Var(R_m)$, prices every return. (You may assume a risk-free asset is traded.)
::: hint
Choose $a$ and $b$ so that $\E[m] = 1/R_f$ and $\Cov(m, R_m) = (1 - \E[m]\E[R_m])$, then use the CAPM to get $\Cov(m, R_i)$.
:::
::: solution
Set $m = a + b R_m$. Then $\E[m] = a + b\E[R_m] = 1/R_f$, and $\Cov(m, R_m) = b\Var(R_m)$. The covariance form for the market itself requires $b\Var(R_m) = (1 - \E[m]\E[R_m]) = 1/R_f - \E[R_m]/R_f = -( \E[R_m]-R_f)/R_f$, so

$$
b = -\frac{\E[R_m]-R_f}{R_f\,\Var(R_m)}, \qquad a = \frac{1}{R_f} - b\E[R_m].
$$

For any asset $i$, $\Cov(m, R_i) = b\Cov(R_m, R_i) = b\beta_{im}\Var(R_m) = -\beta_{im}(\E[R_m]-R_f)/R_f$. The covariance form then gives $\E[R_i] - R_f = -R_f\Cov(m,R_i) = \beta_{im}(\E[R_m]-R_f)$, which is the CAPM. So this $m$ prices every $i$. The derivation used the CAPM as an input; it shows equivalence, not a new restriction. If the CAPM fails, no affine function of $R_m$ prices every asset.
:::
:::

::: exercise Why positivity of $m$ rules out arbitrage {level=3}
In a two-state market, suppose $m_1 = 1.1$ and $m_2 = -0.1$, with $\pi = (1/2, 1/2)$. Construct an arbitrage using Arrow securities, and explain which clause of [[#thm-ftap]] has failed.
::: hint
A negative $m_2$ means a non-positive state price $q_2 = \pi_2 m_2$.
:::
::: solution
$q_2 = 0.5\times(-0.1) = -0.05 < 0$. Buying the Arrow security that pays $1$ in state $2$ *gives* you $0.05$ today (you are paid to take it) and pays $1 \ge 0$ in state $2$ and $0$ in state $1$. That is an arbitrage: negative cost, non-negative payoff, and a strictly positive payoff in some state. (If one prefers a zero-cost arbitrage, put the $0.05$ into any non-negative payoff.) Clause (2) of [[#thm-ftap]] requires $\mathbf{q} \gg \mathbf{0}$; clause (3) requires $m \gg 0$. A signed $m$ can still satisfy $\E[mR] = 1$ for some returns — it is then a signed state-price density, useful in incomplete-market algebra — but it does not rule out arbitrage. Hansen and Jagannathan's tighter bound imposes $m > 0$ for this reason.
:::
:::
