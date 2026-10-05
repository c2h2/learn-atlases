An integral is a limit of sums. On a line, a fine grid makes a good sum. In ten variables the same spacing is no longer affordable, because the number of grid points grows as a power of the dimension. Monte Carlo integration replaces the grid by an average of values of the integrand at random points. The error then falls like $1/\sqrt{N}$, whatever the dimension, provided the variance stays finite and the samples are independent. That last proviso is the whole difficulty of the Metropolis algorithm later in the chapter.

The integral we keep as a test is the area of a quarter-circle,

$$
\int_0^1 4 \sqrt{1 - x^2}\,\dd x = \pi.
$$

The antiderivative is elementary, so we know the answer and can see the error. A method that cannot get $\pi$ roughly right on this integral will not get a ten-dimensional expectation right either. Deterministic quadrature, and the initial-value view of an integral as $y' = f(x)$ in [[math-methods/odes]], remain the better tools in one smooth dimension. They are the tools of [[computation/integrating-motion]]. This chapter is what you reach for when the grid, or that ordinary differential equation, has become too large. The rest of [[computation]] uses the same standard: every numerical claim below was produced by a recorded seed, and the seed is part of the result.

## What you may trust a generator to do {#generators}

A Monte Carlo estimate is a function of random numbers. If you cannot say which generator produced them, and from which seed, a second person cannot reproduce the digits. Reproducibility here is not a philosophical extra. It is how you tell a bug from a fluctuation.

::: definition Uniform draws {#def-uniform}
A sequence $U_1, U_2, \dots$ of **uniform draws** on $(0, 1)$ is a sequence of random variables, each distributed as the uniform law on that interval, and independent of one another. A **pseudo-random generator** is a deterministic map that, from a finite seed, produces a sequence whose finite collections are hard to distinguish from those uniform draws by the tests you actually apply.
:::

Two properties are not optional. The period, the number of steps before the sequence repeats, must be far longer than the number of draws you will take. And simple independence checks must pass. Plotting successive pairs $(U_i, U_{i+1})$ should fill the unit square, rather than lining up on a handful of straight lines. George Marsaglia, in 1968, showed that a linear congruential generator does line up in that way: the tuples fall on a limited number of hyperplanes. A short recurrence of the kind often called `rand` in a textbook of the 1970s fails this test. A long period alone does not repair a bad lattice. We do not treat any one modern generator as the correct brand. We require a long period and those plain tests, and we use a scientific library rather than a toy recurrence.

Every number reported in this chapter was produced with NumPy 1.26.4, by `numpy.random.default_rng(seed)`. The seed is an integer passed to that constructor. Changing it changes the sequence. Forgetting it makes the printed digits irreproducible, which is the mistake recorded at the end of the Metropolis section.

The generator returns values in $[0, 1)$. A continuous law does not care about the endpoints, which have probability zero. A transformation such as $-\ln U$ does care in exact arithmetic if $U = 0$ is ever returned. In the runs below it was not.

::: intuition Samples estimate averages
A uniform draw is not a guess at the answer. It is a coordinate. The integrand, evaluated there, is one term in an average. The law of large numbers says the average settles on the integral. The standard error says how fast, and only under an independence assumption you must check before quoting it.
:::

## Monte Carlo integration {#integration}

Let $f$ be integrable on a finite interval $[a, b]$, and let $X$ be uniform on that interval. Then

$$
\E[f(X)] = \frac{1}{b - a} \int_a^b f(x)\,\dd x,
$$

so the integral equals $(b - a)$ times an expectation. An average of independent copies of $f(X)$ is therefore an estimate of the integral. That is the whole method. The rest is the size of the error, and the production of the copies.

::: definition Monte Carlo estimator {#def-mc}
Let $X_1, \dots, X_N$ be independent and uniform on $[a, b]$, and write $f_i = f(X_i)$. The **Monte Carlo estimator** of $I = \int_a^b f$ is

$$
\hat I_N = (b - a) \cdot \frac{1}{N} \sum_{i=1}^{N} f_i.
$$ {#eq-mc}

If $\sigma^2 = \Var(f(X_1))$ is finite, the **standard error** of $\hat I_N$ is

$$
\mathrm{se}(\hat I_N) = (b - a) \frac{\sigma}{\sqrt{N}}.
$$ {#eq-se}

In practice $\sigma$ is unknown and is replaced by the sample standard deviation of the numbers $f_i$, with the $N - 1$ denominator.
:::

::: theorem Unbiasedness and the $1/\sqrt{N}$ error {#thm-se}
Under the hypotheses of [[#def-mc]], $\E[\hat I_N] = I$, and

$$
\Var(\hat I_N) = (b - a)^2 \frac{\sigma^2}{N}.
$$

The root-mean-square error is therefore exactly the standard error [[#eq-se]]. Multiplying the number of independent samples by $100$ divides that error by $10$, and not by $100$.
:::

::: proof
Linearity of expectation does not need independence. Each $X_i$ has the same law, so $\E[f_i] = I/(b - a)$ and $\E[\hat I_N] = I$. The estimator is unbiased for every $N \ge 1$.

For the variance, expand the square of the sum. Independence makes the cross terms vanish: if $i \neq j$, then $\E[f_i f_j] = \E[f_i]\E[f_j]$, so $\Cov(f_i, f_j) = 0$. The variance of a sum of uncorrelated random variables is the sum of the variances, and each $\Var(f_i)$ equals $\sigma^2$, hence

$$
\Var\left(\frac{1}{N}\sum_{i=1}^{N} f_i\right) = \frac{\sigma^2}{N}.
$$

Multiplying by the constant $(b - a)$ multiplies the variance by $(b - a)^2$. The root-mean-square error of an unbiased estimator is the square root of its variance, which is [[#eq-se]]. Replacing $N$ by $100N$ puts a factor $100$ under the square root in the denominator. The square root of $100$ is $10$.
:::

The formula is a theorem about independent samples. It is not a theorem about consecutive states of a Markov chain. The Metropolis section returns to that distinction, with a numerical autocorrelation in hand.

In $d$ dimensions the same construction estimates an integral over a box by $N$ random points. The variance formula does not acquire a factor that is exponential in $d$. The variance itself may grow with $d$, and a badly scaled integrand can make $\sigma$ enormous, but the $N$ dependence remains $1/\sqrt{N}$. A tensor-product grid does not have this indifference to dimension. If you place $n$ points along each axis, you pay $N = n^d$ evaluations. The composite trapezoidal rule on a smooth one-dimensional integrand has an error of order $1/n^2$, as the next example measures. On a product grid the mesh spacing is $n^{-1} = N^{-1/d}$, and the error of a product trapezoidal rule is of order $N^{-2/d}$. That exponent is worse than $-1/2$ once $d > 4$. Even before the exponents cross, the practical point is the cost of refining: halving the spacing multiplies the work by $2^d$. Halving a Monte Carlo standard error multiplies the work by $4$, in any dimension. Monte Carlo wins in high dimension because the grid grows exponentially and the Monte Carlo error does not.

::: example A smooth integral, by the trapezoidal rule {#ex-trap}
Estimate $\int_0^1 e^{x}\,\dd x = e - 1$ by the composite trapezoidal rule with $n = 10, 20, 40, 80$ panels, and compare the errors.
::: solution
The exact value is $e - 1 = 1.718281828459045$. With $n$ equal panels the rule reads

$$
T_n = \frac{1}{n}\left(\frac{1}{2} f(0) + \sum_{k=1}^{n-1} f(k/n) + \frac{1}{2} f(1)\right), \qquad f(x) = e^{x}.
$$

A direct evaluation gives

$$
\begin{aligned}
T_{10} &= 1.719713491389, \\
T_{20} &= 1.718639788925, \\
T_{40} &= 1.718371321372, \\
T_{80} &= 1.718304201862.
\end{aligned}
$$

The errors $T_n - (e - 1)$ are $1.431663\times 10^{-3}$, $3.579605\times 10^{-4}$, $8.949291\times 10^{-5}$ and $2.237340\times 10^{-5}$. Each doubling of $n$ divides the error by four, which is the $1/n^2$ behaviour the Euler–Maclaurin formula predicts when $f$ and its low derivatives stay bounded. On a smooth one-dimensional integral this deterministic rule is far more accurate, per evaluation, than $1/\sqrt{N}$. The quarter-circle integrand of the next example is not in that class: its derivative blows up at $x = 1$, and the same rule does not deliver a factor of four.
:::
:::

::: example The quarter-circle, with a recorded seed {#ex-quarter}
Estimate $\int_0^1 4\sqrt{1 - x^2}\,\dd x$ by [[#eq-mc]] with $N = 10000$, using `numpy.random.default_rng(1)` in NumPy 1.26.4. Report the estimate and the sample standard error.
::: solution
Here $a = 0$, $b = 1$, so $\hat I_N$ is simply the average of the values $f(X_i)$ with $f(x) = 4\sqrt{1 - x^2}$. Drawing $N = 10000$ uniforms from `default_rng(1)` and averaging $f$ produced

$$
\hat I_{10000} = 3.133560693867511.
$$

The sample standard deviation of those $10000$ values of $f$, using the $N - 1$ denominator, was $0.8975626631075645$. Dividing by $\sqrt{N} = 100$ gives the standard-error estimate

$$
\mathrm{se} = 0.008975626631075645.
$$

The true value is $\pi = 3.141592653589793$, so the error is $\hat I_N - \pi = -0.008031959722282$. That is about $0.90$ of the reported standard error, which is an ordinary size for one realisation: the error is random, and landing inside one standard error is not a new confirmation of the method.

The variance can also be computed exactly, as a check on the sample. With $X$ uniform on $(0, 1)$,

$$
\E[f(X)^2] = \int_0^1 16(1 - x^2)\,\dd x = 16\left[x - \frac{x^3}{3}\right]_0^1 = \frac{32}{3},
$$

so $\sigma^2 = 32/3 - \pi^2$ and $\sigma = \sqrt{32/3 - \pi^2} = 0.8927834371096431$. The theoretical standard error is $0.008927834371096432$. The sample figure $0.0089756$ agrees with it to about half a percent. Quoting either one, you should expect the third decimal digit of this estimate of $\pi$ to move when the seed changes.

The same seed and a shorter or longer draw show the $1/\sqrt{N}$ scale, with one caution. Calling `default_rng(1).random(N)` afresh for $N = 100$, $N = 10000$ and $N = 10^6$ produces nested prefixes of one stream, not three independent experiments. The results were

$$
\begin{aligned}
N = 100 &\colon & \hat I &= 3.120643544545631, & \mathrm{se} &= 0.085956719743236, \\
N = 10000 &\colon & \hat I &= 3.133560693867511, & \mathrm{se} &= 0.008975626631076, \\
N = 10^6 &\colon & \hat I &= 3.141558697091800, & \mathrm{se} &= 0.000892941819971.
\end{aligned}
$$

The absolute errors are $0.0209$, $0.00803$ and $3.40\times 10^{-5}$. From $N = 100$ to $N = 10^6$ the sample size grows by $10^4$ and the standard error falls by about $100$, as [[#thm-se]] requires. The realised errors fall too, but not by exactly that factor, because each error is one draw from a distribution of that width.

For comparison, the composite trapezoidal rule on this same $f$, which has $f'(x) = -4x/\sqrt{1 - x^2}$ unbounded at $x = 1$, gave errors $-3.707433\times 10^{-2}$, $-1.312777\times 10^{-2}$, $-4.644919\times 10^{-3}$, $-1.642856\times 10^{-3}$ and $-5.809484\times 10^{-4}$ at $n = 10, 20, 40, 80, 160$ panels. Doubling $n$ reduced the error by a factor near $2.83$, not near $4$. The $1/n^2$ theorem of [[#ex-trap]] does not apply to an integrand whose derivative is unbounded. On this particular integral a fine trapezoidal rule still beats $N = 10000$ random samples. The random method is not being recommended for a quarter-circle. It is being measured on a quarter-circle, where the answer is known.
:::
:::

::: widget plot
f: sqrt(1-x^2)
x: -1, 1
equal: true
caption: The upper half-circle. Monte Carlo integration of $4\sqrt{1-x^2}$ on $[0, 1]$ throws uniform abscissae at random and averages the height; the figure is the exact curve those samples are estimating. The full semicircle is drawn so the quarter on $[0, 1]$ is visible as a region. Dragging the window does not change the integral.
:::

The factor $4$ is there so that the integral equals $\pi$ rather than $\pi/4$. Nothing in the method requires a clever factor. Any integrable $f$ is allowed, and a constant factor passes straight through the average.

::: quiz
The root-mean-square error of the Monte Carlo estimator, for independent samples of a finite-variance integrand, scales with the number $N$ of samples as which of the following?
- [ ] $1/N^{2}$, as for the trapezoidal rule on a smooth one-dimensional integrand
- [ ] $1/N$, as for a single panel of the rectangle rule
- [x] $1/\sqrt{N}$, from the variance of an average of independent terms
- [ ] It does not depend on $N$ once $N$ exceeds the period of the generator
::: solution
[[#thm-se]] gives a variance proportional to $1/N$, hence a standard error proportional to $1/\sqrt{N}$. The trapezoidal $1/n^2$ needs smoothness and a grid, and it was measured on $\int e^{x}$ in [[#ex-trap]]. A generator's period must be longer than $N$, but that requirement does not freeze the error.
:::
:::

## Sampling a named distribution {#transforms}

Monte Carlo integration of the previous section only needed uniforms. Many expectations are written as $\E[g(Y)]$ where $Y$ is not uniform: an exponential waiting time, a Gaussian measurement error, a Boltzmann weight. If you can transform a uniform draw into a draw from the law of $Y$, the same average applies. The inverse of the cumulative distribution function does it whenever you can compute that inverse.

::: theorem Exponential draws from a logarithm {#thm-exp}
Let $U$ be uniform on $(0, 1)$. Then $E = -\ln U$ has the exponential law of mean $1$: for every $t > 0$,

$$
\P(E \le t) = 1 - e^{-t},
$$

and $\E[E] = 1$. Equivalently, $-\ln(1 - U)$ has the same law, since $1 - U$ is uniform on $(0, 1)$ as well.
:::

::: proof
Since the logarithm is increasing, and $U > 0$,

$$
\P(-\ln U \le t) = \P(\ln U \ge -t) = \P(U \ge e^{-t}).
$$

A uniform random variable on $(0, 1)$ satisfies $\P(U \ge e^{-t}) = 1 - e^{-t}$ for $t > 0$. That is the cumulative distribution function of the exponential law of rate $1$, whose mean is $1$. The same calculation with $1 - U$ in place of $U$ gives $-\ln(1 - U)$.

The mean can also be read off by integration, which is a useful check that the tail has been identified correctly:

$$
\E[-\ln U] = \int_0^1 (-\ln u)\,\dd u.
$$

The antiderivative of $-\ln u$ is $u - u\ln u$. At the upper limit, $1 - 1\cdot\ln 1 = 1$. At the lower limit, $u\ln u \to 0$ as $u \to 0^+$, so the boundary term vanishes. The definite integral equals $1$.
:::

::: example A numerical check of the logarithm transform {#ex-exp}
Draw $100000$ uniforms with `default_rng(5)` and apply $E = -\ln U$. Compare the sample mean and variance with the exponential law of mean $1$.
::: solution
The run produced a sample mean $0.998760293748148$ and a sample variance, with the $N - 1$ denominator, $1.001355673308658$. The theoretical mean is $1$ and the theoretical variance is $1$. The discrepancies are a few thousandths, consistent with a standard error of order $1/\sqrt{N} = 0.00316$ for the mean. This does not prove the theorem. [[#thm-exp]] was proved by comparing cumulative distribution functions. The run is a check that the implementation of the logarithm, the generator and the seed agree with that theorem at the scale $N = 100000$.
:::
:::

A Gaussian sample is not an elementary inverse cumulative distribution function, because that inverse is the inverse of the error function. The Box–Muller transformation avoids it by producing two normals at once. George Box and Mervin Muller published the construction in 1958, in the Annals of Mathematical Statistics.

::: proposition Box–Muller {#prop-bm}
Let $U_1$ and $U_2$ be independent and uniform on $(0, 1)$. Then

$$
Z_1 = \sqrt{-2\ln U_1}\,\cos(2\pi U_2), \qquad Z_2 = \sqrt{-2\ln U_1}\,\sin(2\pi U_2)
$$

are independent standard normal random variables.
:::

::: proof
Two independent standard normals $(Z_1, Z_2)$ have joint density $(1/(2\pi)) \exp(-(z_1^2 + z_2^2)/2)$ on the plane. Pass to polar coordinates $z_1 = r\cos\theta$, $z_2 = r\sin\theta$, with $r > 0$ and $\theta \in (0, 2\pi)$. The area element contributes a factor $r$, so the joint density of $(r, \theta)$ is

$$
\frac{1}{2\pi} e^{-r^2/2}\, r.
$$

The angle $\theta$ is therefore uniform on $(0, 2\pi)$ and independent of $r$, and $r$ has density $r e^{-r^2/2}$. Set $s = r^2$. Then $r = \sqrt{s}$ and $\dd r/\dd s = 1/(2\sqrt{s})$, so the density of $s$ is

$$
\sqrt{s}\, e^{-s/2} \cdot \frac{1}{2\sqrt{s}} = \frac{1}{2} e^{-s/2}, \qquad s > 0.
$$

That is the exponential law of mean $2$, which is the law of $-2\ln U_1$ by [[#thm-exp]] applied to a scaled variable: if $E = -\ln U_1$ has mean $1$, then $2E$ has mean $2$ and density $(1/2) e^{-s/2}$. The angle has the law of $2\pi U_2$. Inverting $s = -2\ln U_1$ and $\theta = 2\pi U_2$ gives $r = \sqrt{-2\ln U_1}$ and the two formulae for $Z_1$ and $Z_2$.
:::

A check, not a second proof: with `default_rng(4)` and $N = 100000$ pairs, the first coordinate had sample mean $0.000360076375513$ and sample variance $1.001871410171511$, the second had mean $-0.001931943654896$ and variance $0.998238018556363$, and the sample correlation was $-0.000239392058773$. Means near $0$, variances near $1$ and a correlation near $0$ are what independent standard normals produce at this $N$. The Metropolis algorithm below does not need this transformation. It is the tool you use when the target really is Gaussian and you want independent draws. When the target is a high-dimensional Boltzmann weight with no usable inverse, independent draws are exactly what you cannot cheaply make, and a Markov chain is the alternative.

::: quiz
$U$ is uniform on $(0, 1)$ and $E = -\ln U$. Which statement is true?
- [ ] $E$ is uniform on $(0, 1)$ as well, because the logarithm is smooth
- [x] $E$ has the exponential law of mean $1$, so $\P(E > t) = e^{-t}$ for $t > 0$
- [ ] $E$ is standard normal, by the Box–Muller proposition
- [ ] $E$ has mean $0$, because $\ln u$ is negative on $(0, 1)$ and the minus sign cancels that
::: solution
[[#thm-exp]] gives the cumulative distribution function $1 - e^{-t}$, so the survival function is $e^{-t}$, and the mean is $1$, not $0$. The values of $\ln u$ are negative, and the leading minus sign makes $E$ positive. Box–Muller uses an extra uniform draw and a square root; the logarithm alone is not a normal sample.
:::
:::

## The Metropolis algorithm {#metropolis}

Suppose the integral you want is an expectation under a probability proportional to a weight $w(x) = e^{-\beta E(x)}$, as in the canonical ensemble of [[statistical-mechanics/canonical]]. In one variable you might invert the cumulative distribution function or use a rejection method. In hundreds of variables the normalising constant is itself an intractable integral, the region where $w$ is not tiny may be a thin subset, and rejection sampling spends almost every proposal outside that subset. The Metropolis algorithm builds a Markov chain whose stationary law is the normalised weight, without ever computing the normalising constant. The constant cancels in the acceptance ratio.

::: algorithm Metropolis with a symmetric proposal {#alg-metropolis}
Start from a state $x$ in the space you are sampling. The weight $w(x) > 0$ need not be normalised. The proposal density $q(x' \mid x)$ is assumed symmetric, $q(x' \mid x) = q(x \mid x')$. One step is:

1. Draw a proposal $x'$ from $q(\cdot \mid x)$.
2. Set $\alpha = \min\bigl(1,\, w(x')/w(x)\bigr)$.
3. Draw $U$ uniform on $(0, 1)$. If $U < \alpha$, replace $x$ by $x'$. If not, keep $x$.
4. Record the current $x$. That record is one sample. Return to step 1.

If $w = e^{-\beta E}$, the ratio in step 2 is $e^{-\beta \Delta E}$ with $\Delta E = E(x') - E(x)$. A proposal that lowers the energy, or leaves it unchanged, has $\alpha = 1$ and is always accepted. A proposal that raises the energy is accepted with probability $e^{-\beta \Delta E}$.
:::

Symmetry of $q$ is a hypothesis, not a decoration. A Gaussian random walk, $x' = x + \delta Z$ with $Z$ standard normal, is symmetric, because the density of the step depends only on $|x' - x|$. A proposal that always walks to the right is not symmetric, and the acceptance probability above is then the wrong one. Asymmetric proposals need the Hastings correction, which multiplies the ratio of weights by the ratio of proposal densities. This chapter stays with the symmetric case, which is the 1953 algorithm.

::: theorem Detailed balance {#thm-balance}
Let $\pi$ be the probability with density proportional to $w$, and let $P(x \to x')$ be the transition density of one step of [[#alg-metropolis]], including the probability of staying put. If $q$ is symmetric, then

$$
\pi(x)\, P(x \to x') = \pi(x')\, P(x' \to x)
$$

for $x \neq x'$. A chain that satisfies this detailed-balance identity, and that can reach any region of positive $\pi$-probability, has $\pi$ as its stationary distribution.
:::

::: proof
It is enough to compare the densities of the moves that actually change the state. The probability of proposing $x'$ and then accepting it is $q(x' \mid x)\, \alpha(x' \mid x)$, with $\alpha(x' \mid x) = \min\bigl(1, \pi(x')/\pi(x)\bigr)$. The normalising constant of $w$ has cancelled, so $\pi(x')/\pi(x) = w(x')/w(x)$.

Consider the case $\pi(x') \ge \pi(x)$. Then $\alpha(x' \mid x) = 1$ and $\alpha(x \mid x') = \pi(x)/\pi(x')$. Symmetry gives $q(x' \mid x) = q(x \mid x')$. Therefore

$$
\pi(x)\, q(x' \mid x)\, \alpha(x' \mid x) = \pi(x)\, q(x' \mid x),
$$

while

$$
\pi(x')\, q(x \mid x')\, \alpha(x \mid x') = \pi(x')\, q(x' \mid x) \cdot \frac{\pi(x)}{\pi(x')} = \pi(x)\, q(x' \mid x).
$$

The two sides agree. The case $\pi(x') < \pi(x)$ is the same comparison with the labels exchanged. Summing the identity against a test function shows that if a draw is already distributed as $\pi$, the next step is too. That is stationarity. Reaching it from a fixed start, rather than merely staying there, needs the chain to be able to move between the regions that carry the probability. A random-walk proposal of any positive width has that property on the line.
:::

The samples you record are dependent. Step $n + 1$ starts where step $n$ finished, so the values are correlated. The proof that the variance of an average is $\sigma^2/N$ used $\Cov(f_i, f_j) = 0$ for $i \neq j$. That step is false for a Metropolis chain. The variance of the average is larger, by a factor often written as an integrated autocorrelation time. Quoting $\sigma/\sqrt{N}$ with $N$ equal to the number of steps, and with no estimate of that factor, understates the error. The next example measures the factor on one chain instead of leaving it as a slogan.

::: example A Gaussian target on the line {#ex-metro}
Sample the weight $w(x) = \exp(-x^2/2)$, which is the un-normalised standard normal, by a Gaussian random walk. Use `default_rng(2)`, proposal width $\delta = 1.5$, $20000$ steps, and the start $x = 0$. Report the acceptance fraction, and the mean and variance after discarding the first $2000$ steps.
::: solution
The energy is $E(x) = x^2/2$ at inverse temperature $\beta = 1$, so

$$
\alpha = \min\left(1,\ \exp\left(-\frac{x'^2 - x^2}{2}\right)\right).
$$

In the program the comparison is made in logarithms: the proposal is accepted when $\ln U < -(x'^2 - x^2)/2$, which is the same test and does not underflow when the exponent is large and negative. Of the $20000$ proposals, $11794$ were accepted. The acceptance fraction on the whole run, burn-in included, is

$$
\frac{11794}{20000} = 0.5897.
$$

Discarding the first $2000$ steps leaves $18000$ samples. Their mean was $0.019267075823895$ and their sample variance, with the $N - 1$ denominator, was $0.961667652748667$. A standard normal has mean $0$ and variance $1$. Both figures are in range for a chain of this length once correlation is admitted; they are not independent-sample standard errors.

The first three proposals, rounded only in the prose and taken from this same stream, show the rule working one step at a time. From $x = 0$ the first proposal was $0.283580072690300$, the energy rose by $0.040208828813518$, and the uniform draw was $0.298491143414123$. The acceptance threshold is $e^{-0.040208828813518} = 0.960588819582007$. The draw lies below the threshold, so the move is accepted. The next proposal, $-0.336015242397541$, is also accepted. The one after that proposes $2.363545831683813$, the energy rises by $2.736721327673224$, and the threshold falls to $e^{-2.736721327673224} = 0.064782399337941$. The uniform draw was $0.728560526811795$, which is above the threshold, so the chain stays at $-0.336015242397541$. An uphill move is not forbidden. It is unlikely when the energy rise is several units.

The sample autocorrelation of the $18000$ retained values, after subtracting the sample mean, was about $0.680$ at lag $1$, $0.459$ at lag $2$ and $0.310$ at lag $3$, and it first became negative at lag $15$. Summing $1 + 2\sum \rho_k$ up to the last positive lag before that crossing gives a rough integrated autocorrelation time of $5.15$. The naive standard error of the mean, $\sigma/\sqrt{18000}$, was $0.00731$. Multiplying by $\sqrt{5.15}$ raises it to about $0.0166$. The mean $0.0193$ sits about one corrected standard error from $0$. Using $0.00731$ would have made the same mean look like a $2.6$-standard-error surprise. The correlation is not a small correction on this run.

The proposal width is a choice, and a bad choice shows up as a variance that has not yet reached $1$. Restarting from `default_rng(3)` for $20000$ steps, again discarding $2000$, and varying only $\delta$, gave:

- $\delta = 0.1$: acceptance $0.9679$, sample variance $0.770$.
- $\delta = 0.5$: acceptance $0.8411$, sample variance $0.961$.
- $\delta = 1.0$: acceptance $0.7074$, sample variance $1.030$.
- $\delta = 2.0$: acceptance $0.4980$, sample variance $1.028$.
- $\delta = 5.0$: acceptance $0.2443$, sample variance $1.009$.

At $\delta = 0.1$ almost every proposal is accepted, and the chain has not explored enough of the line for the sample variance to approach $1$. A high acceptance fraction is not evidence that the chain is healthy. At $\delta = 5$ only about a quarter of the proposals are accepted, but the variance is already near $1$. The main run, $\delta = 1.5$ and acceptance $0.5897$, sits between these regimes. None of these five chains used the seed of the main run. They are a separate experiment.
:::
:::

::: warning Seeds, and the independent-sample formula
Two mistakes are easy to publish. The first is to run [[#alg-metropolis]], compute the standard deviation of the recorded values, and quote that standard deviation over $\sqrt{N}$ as the error of the mean. [[#thm-se]] assumed uncorrelated terms. The chain in [[#ex-metro]] had lag-$1$ autocorrelation about $0.68$, and the corrected error of the mean was more than twice the naive one. The second mistake is to omit the seed. The estimate $3.133560693867511$ in [[#ex-quarter]] is the output of `default_rng(1)` at $N = 10000$ under NumPy 1.26.4. Without that sentence it is an unrepeatable decimal, and nobody can tell a later change in the program from a different draw.
:::

Burn-in is the decision to discard early steps, whose law still remembers the start at $x = 0$. Discarding $2000$ steps does not create independence among the steps you keep. It only reduces the contribution of the initial condition. How many steps to discard is a property of the chain, not a universal constant.

::: history Ulam, von Neumann, and five authors in 1953
Estimating an integral by random sampling, as a deliberate numerical method, was developed in the late 1940s for neutron transport. Stanislaw Ulam and John von Neumann proposed the sampling. Nicholas Metropolis and Ulam published the account "The Monte Carlo Method" in the Journal of the American Statistical Association in 1949. That paper is the Monte Carlo method. It is not the Metropolis algorithm.

The algorithm of [[#alg-metropolis]] is the 1953 paper of Nicholas Metropolis, Arianna W. Rosenbluth, Marshall N. Rosenbluth, Augusta H. Teller and Edward Teller, "Equation of State Calculations by Fast Computing Machines", Journal of Chemical Physics, volume 21, pages 1087–1092, received on 6 March 1953. The calculations reported there were for a two-dimensional system of hard spheres, carried out on the Los Alamos MANIAC. All five names are authors of the algorithm. Arianna Rosenbluth and Marshall Rosenbluth, and Augusta Teller and Edward Teller, are not assistants in a story whose method belongs to Ulam. Attributing the 1953 chain to Ulam alone confuses the 1949 paper with a different algorithm, published four years later, by a different list of people. The Box–Muller transformation used above is later still: Box and Muller, 1958.
:::

## Where this leads {#leads}

The estimator [[#eq-mc]] is the one to compare with a grid whenever the dimension makes $n^d$ unreasonable. In one smooth dimension, [[#ex-trap]] is a reminder to use the trapezoidal rule, or an integrator from [[math-methods/odes]], instead. The chain [[#alg-metropolis]] is the standard way into a canonical average when the weight is a Boltzmann factor. What it returns is a dependent sample. Any error bar you attach has to come from a block average, a batch of independent runs with different seeds, or an autocorrelation time you have actually estimated, as in [[#ex-metro]]. Later chapters in [[computation]] put many particles on a line and ask the same question of a trajectory: does the number you printed estimate the quantity you named, and have you kept the seed?

::: summary
- A usable generator has a long period and passes simple independence tests. A short linear congruential `rand` does not. Record the seed: the runs here use NumPy 1.26.4 and `default_rng`.
- The Monte Carlo estimator of $\int_a^b f$ is $(b - a)$ times the average of $f$ at $N$ independent uniform points. It is unbiased. Its standard error is $(b - a)\, \sigma/\sqrt{N}$.
- On a smooth one-dimensional integral the trapezoidal rule is of order $1/n^2$. In high dimension the grid costs $n^d$ points, while the Monte Carlo $1/\sqrt{N}$ does not carry an exponential in $d$.
- With `default_rng(1)` and $N = 10000$, the quarter-circle integrand averaged to $3.133560693867511$, with sample standard error $0.008975626631075645$.
- If $U$ is uniform on $(0, 1)$, then $-\ln U$ is exponential of mean $1$. Box–Muller turns two uniforms into two independent standard normals.
- The Metropolis algorithm accepts every downhill move and accepts an uphill move with probability $e^{-\beta \Delta E}$. For a symmetric proposal, detailed balance gives the Boltzmann weight as the stationary law. The normalising constant is never required.
- Consecutive Metropolis samples are correlated. In the Gaussian run with `default_rng(2)`, $\delta = 1.5$ and $20000$ steps, the acceptance fraction was $0.5897$, and the lag-$1$ autocorrelation after burn-in was about $0.68$. The independent-sample standard error does not apply unchanged.
:::

## Exercises {#exercises}

::: exercise Four uniform abscissae {level=1 check="12/5"}
Estimate $\int_0^1 4\sqrt{1 - x^2}\,\dd x$ by the Monte Carlo average at the four points $x = 0$, $x = 3/5$, $x = 4/5$ and $x = 1$. These are not random. The exercise is the arithmetic of [[#eq-mc]] on a set you can check by hand.
::: solution
The integrand is $f(x) = 4\sqrt{1 - x^2}$. Then $f(0) = 4$, $f(3/5) = 4\sqrt{1 - 9/25} = 4\sqrt{16/25} = 4\cdot 4/5 = 16/5$, $f(4/5) = 4\sqrt{1 - 16/25} = 4\sqrt{9/25} = 4\cdot 3/5 = 12/5$, and $f(1) = 0$. The interval length is $1$, so the estimator is the plain average

$$
\hat I = \frac{1}{4}\left(4 + \frac{16}{5} + \frac{12}{5} + 0\right) = \frac{1}{4}\left(\frac{20 + 16 + 12}{5}\right) = \frac{1}{4}\cdot \frac{48}{5} = \frac{12}{5}.
$$

The value $12/5 = 2.4$ is not close to $\pi$. Four hand-picked points are not $N = 10000$, and the point $x = 1$ contributes a genuine zero of this integrand. The calculation checks the formula, not the quality of a design.
:::
:::

::: exercise A standard error you can finish by hand {level=1 check="0.9/sqrt(10000)"}
An integrand on an interval of length $1$ has been sampled independently. The sample standard deviation of the values of $f$ is $0.9$, and $N = 10000$. Compute the standard-error estimate $\sigma/\sqrt{N}$.
::: solution
By [[#eq-se]], with $b - a = 1$,

$$
\mathrm{se} = \frac{0.9}{\sqrt{10000}} = \frac{0.9}{100} = 0.009.
$$

The fourth digit of an average built from these samples should not be trusted on the strength of this one run. The quarter-circle run in [[#ex-quarter]] had a sample standard deviation near $0.898$ and a standard error near $0.00898$, which is the same arithmetic with a measured $\sigma$.
:::
:::

::: exercise An uphill acceptance probability {level=1 check="1/4"}
A Metropolis proposal, with a symmetric proposal density, moves from a state of weight $w$ to a state of weight $w/4$. What is the probability that the proposal is accepted?
::: solution
[[#alg-metropolis]] sets $\alpha = \min(1, w(x')/w(x)) = \min(1, 1/4) = 1/4$. The move is uphill in energy if the weight is a Boltzmann factor, and it is accepted with probability $1/4$, not rejected outright and not accepted with probability $1$. The normalising constant of $w$ would appear in both the numerator and the denominator and cancels before this ratio is formed.
:::
:::

::: exercise Second moment of the quarter-circle integrand {level=2 check="32/3"}
Let $X$ be uniform on $(0, 1)$ and $f(x) = 4\sqrt{1 - x^2}$. Compute $\E[f(X)^2]$ exactly.
::: solution
Square the integrand first: $f(x)^2 = 16(1 - x^2)$. Because $X$ is uniform on $(0, 1)$, the expectation is the integral

$$
\E[f(X)^2] = \int_0^1 16(1 - x^2)\,\dd x = 16\left[x - \frac{x^3}{3}\right]_0^1 = 16\left(1 - \frac{1}{3}\right) = 16\cdot \frac{2}{3} = \frac{32}{3}.
$$

The variance is then $32/3 - \pi^2$, since $\E[f(X)] = \pi$. That is the $\sigma^2$ used to quote the theoretical standard error $0.00892783$ in [[#ex-quarter]]. The sample second moment is not required for this exact value.
:::
:::

::: exercise An exponential probability {level=2 check="1/2"}
Let $U$ be uniform on $(0, 1)$ and $E = -\ln U$. Find $\P(E > \ln 2)$.
::: solution
By [[#thm-exp]], $\P(E > t) = e^{-t}$ for $t > 0$. Take $t = \ln 2$. Then $e^{-\ln 2} = 1/2$. The same result falls out of the definition without naming the exponential law: $E > \ln 2$ means $-\ln U > \ln 2$, so $\ln U < -\ln 2 = \ln(1/2)$, so $U < 1/2$, and a uniform draw falls below $1/2$ with probability $1/2$.
:::
:::

::: exercise The cost of a grid {level=2 check="10^5"}
A product grid places $10$ points along each axis of a five-dimensional unit cube, including no further refinement. How many points does the grid contain?
::: solution
Each axis contributes a factor $10$, and the axes are independent choices, so the grid contains $10^5 = 100000$ points. A Monte Carlo estimate with the same budget of $100000$ evaluations has standard error proportional to $1/\sqrt{10^5} = 10^{-2.5}$, about $0.00316$ times $\sigma$, in any dimension. Refining the grid to $20$ points on each axis would multiply the cost by $2^5 = 32$. Refining the Monte Carlo sample by that same factor $32$ would divide the standard error by $\sqrt{32} = 4\sqrt{2}$, a little more than $5$. The comparison is the reason the chapter exists. It is not a claim that every five-dimensional integral should be attacked by sampling: if the integrand is very smooth and $d$ is only $2$ or $3$, a grid can still win.
:::
:::

::: exercise Acceptance rate on two states {level=2 check="1/2"}
Two states, $A$ and $B$, have weights $1$ and $3$. The chain always proposes the other state. In stationarity, what fraction of proposals are accepted?
::: hint
:::
The stationary probabilities are proportional to the weights. Compute the acceptance probability of each direction, then average over the state the chain is actually in.
::: solution
The normalising constant is $1 + 3 = 4$, so $\pi(A) = 1/4$ and $\pi(B) = 3/4$. A proposal from $A$ to $B$ has weight ratio $3/1 > 1$, so it is always accepted. A proposal from $B$ to $A$ has weight ratio $1/3$, so it is accepted with probability $1/3$. Under the stationary law the acceptance fraction is

$$
\pi(A)\cdot 1 + \pi(B)\cdot \frac{1}{3} = \frac{1}{4} + \frac{3}{4}\cdot \frac{1}{3} = \frac{1}{4} + \frac{1}{4} = \frac{1}{2}.
$$

This is an exact stationary average, not the acceptance fraction of a finite run. It is the two-state cousin of the measured fraction $0.5897$ in [[#ex-metro]]. Detailed balance holds: $\pi(A)$ times the transition $A \to B$, which equals $1$, is $1/4$, and $\pi(B)$ times the transition $B \to A$, which equals $1/3$, is $(3/4)\cdot(1/3) = 1/4$.
:::
:::

::: exercise Where independence is used {level=3}
Prove that if $f(X_1), \dots, f(X_N)$ are uncorrelated, with common variance $\sigma^2$, then the variance of their average is $\sigma^2/N$. Then point to the step that fails for successive samples from [[#alg-metropolis]], and say what the Gaussian run in [[#ex-metro]] showed instead.
::: hint
:::
Expand $\Var(\sum f_i)$ into diagonal terms and covariances. You do not need identical distribution beyond a common variance, but you do need the covariances.
::: solution
Let $S = \sum_{i=1}^{N} f_i$. Then

$$
\Var(S) = \sum_{i=1}^{N} \sum_{j=1}^{N} \Cov(f_i, f_j) = \sum_{i=1}^{N} \Var(f_i) + \sum_{i \neq j} \Cov(f_i, f_j).
$$

Uncorrelated means the off-diagonal covariances vanish, and a common variance means each diagonal term equals $\sigma^2$, so $\Var(S) = N\sigma^2$. The average is $S/N$, and scaling by $1/N$ scales the variance by $1/N^2$, which leaves $\sigma^2/N$. [[#thm-se]] is this identity multiplied by $(b - a)^2$.

For a Metropolis chain the off-diagonal covariances do not vanish. Neighbouring samples share the current state, so $\Cov(f_i, f_{i+1})$ is positive for a smooth observable. The variance of the average is then $\sigma^2/N$ times a factor greater than $1$. In [[#ex-metro]] that factor, estimated roughly by summing the positive autocorrelations, was about $5.15$, and the lag-$1$ autocorrelation was about $0.680$. The naive standard error $0.00731$ of the sample mean became about $0.0166$ after the correction. The identity $\sigma^2/N$ is the step that has to be replaced, not the construction of the chain.
:::
:::

::: exercise Prove detailed balance {level=3}
State the symmetry hypothesis carefully, and prove that one step of [[#alg-metropolis]] satisfies $\pi(x)\, q(x'\mid x)\, \alpha(x'\mid x) = \pi(x')\, q(x\mid x')\, \alpha(x\mid x')$ whenever $x \neq x'$. Take $\alpha(x'\mid x) = \min\bigl(1, \pi(x')/\pi(x)\bigr)$.
::: hint
:::
Split into the case $\pi(x') \ge \pi(x)$ and the opposite case. In each case one of the two acceptance probabilities equals $1$, and the other equals the ratio of the probabilities.
::: solution
Assume $q(x'\mid x) = q(x\mid x')$. This is the symmetry hypothesis. It is true for a random-walk proposal whose density depends on $x' - x$ only through $|x' - x|$, and it is false for a proposal that prefers one direction.

Write $r = \pi(x')/\pi(x)$, and assume $x \neq x'$ so that the densities in the statement are the densities of moves that change the state. The acceptance probabilities are $\alpha(x'\mid x) = \min(1, r)$ and $\alpha(x\mid x') = \min(1, 1/r)$.

If $r \ge 1$, then $\alpha(x'\mid x) = 1$ and $\alpha(x\mid x') = 1/r = \pi(x)/\pi(x')$. The left-hand side of the required identity is $\pi(x)\, q(x'\mid x)\, 1$. The right-hand side is

$$
\pi(x')\, q(x\mid x') \cdot \frac{\pi(x)}{\pi(x')} = \pi(x)\, q(x'\mid x),
$$

where the second equality is symmetry of $q$. The two sides match.

If $r < 1$, then $\alpha(x'\mid x) = r$ and $\alpha(x\mid x') = 1$. The left-hand side is $\pi(x)\, q(x'\mid x)\, \pi(x')/\pi(x) = \pi(x')\, q(x'\mid x)$, and the right-hand side is $\pi(x')\, q(x\mid x')$. Symmetry of $q$ makes them equal.

In both cases the normalising constant inside $\pi$ cancels in the ratio $r$, which is why the algorithm can be run from the weight $w$ alone. The identity is [[#thm-balance]]. It implies stationarity of $\pi$. It does not imply that successive samples are uncorrelated, and it does not fix the proposal width.
:::
:::
