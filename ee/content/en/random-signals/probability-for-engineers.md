Every measurement an engineer makes is a little uncertain. The voltage on a thermocouple lead wanders by a few microvolts from one reading to the next; a receiver occasionally decides that a transmitted 0 was a 1; an analog-to-digital converter rounds every sample and so adds a small error that is different each time; the number of photons reaching a photodiode in a microsecond is never quite the same twice. None of these effects can be predicted sample by sample, yet all of them are perfectly predictable *on average*: a well-designed link really does make one error in a billion bits, and a 12-bit converter really does add $0.14\,\mathrm{mV}$ RMS of rounding error. The tool that makes "unpredictable in detail but predictable on average" precise is **probability theory**.

This chapter collects the probability that the rest of the course needs and gives it an engineering slant. The axioms and the general theory are developed in the Maths Atlas course [Probability](/learn/maths/lesson.php?c=probability&l=probability-spaces); we review them briefly and concentrate on what an electrical engineer does with them: interpreting the mean as a DC level and the variance as an AC power, computing error probabilities with the Gaussian $Q$-function, describing two signals at once with joint distributions and the correlation coefficient, and finding the distribution of a signal after it passes through a nonlinear device such as a rectifier or an envelope detector. These are the building blocks of the random processes in [[random-signals/random-processes]].

## Events, probability and Bayes' rule

A random experiment has a set of possible outcomes, the **sample space** $\Omega$. An **event** is a set of outcomes, and a **probability** $\Prob$ assigns to each event a number in $[0, 1]$ such that $\Prob(\Omega) = 1$ and the probabilities of disjoint events add (Kolmogorov's axioms; see [Probability spaces](/learn/maths/lesson.php?c=probability&l=probability-spaces)). For an engineer the most useful reading of $\Prob(A)$ is the long-run **relative frequency**: repeat the experiment $N$ times, count the $N_A$ occurrences of $A$, and $N_A/N \to \Prob(A)$ as $N\to\infty$. A bit error rate of $10^{-6}$ means about one wrong bit per million transmitted.

The **conditional probability** of $A$ given $B$ is $\Prob(A\mid B) = \Prob(A\cap B)/\Prob(B)$ for $\Prob(B) > 0$: the relative frequency of $A$ among those trials in which $B$ occurred. Two events are **independent** if $\Prob(A\cap B) = \Prob(A)\Prob(B)$, that is, if knowing that $B$ occurred does not change the probability of $A$.

::: theorem Total probability and Bayes' rule {#thm-bayes}
If the events $B_1, \ldots, B_n$ are disjoint, have positive probability and together make up $\Omega$, then for any event $A$

$$
\Prob(A) = \sum_{k=1}^n \Prob(A\mid B_k)\,\Prob(B_k)
$$ {#eq-total-prob}

and, if $\Prob(A) > 0$,

$$
\Prob(B_k\mid A) = \frac{\Prob(A\mid B_k)\,\Prob(B_k)}{\sum_{i}\Prob(A\mid B_i)\,\Prob(B_i)}.
$$ {#eq-bayes}
:::

::: proof
Because the $B_k$ partition $\Omega$, the sets $A\cap B_k$ are disjoint and their union is $A$, so $\Prob(A) = \sum_k\Prob(A\cap B_k) = \sum_k\Prob(A\mid B_k)\Prob(B_k)$ by the addition axiom and the definition of conditional probability. Bayes' rule follows from writing $\Prob(B_k\mid A) = \Prob(A\cap B_k)/\Prob(A)$ and replacing the numerator by $\Prob(A\mid B_k)\Prob(B_k)$ and the denominator by [[#eq-total-prob]].
:::

In communication the $B_k$ are the messages that might have been sent, $A$ is what was received, and Bayes' rule turns the channel's **forward** probabilities $\Prob(\text{received}\mid\text{sent})$, which we can measure, into the **backward** probabilities $\Prob(\text{sent}\mid\text{received})$, which a receiver needs in order to decide.

::: example A binary channel {#ex-binary-channel}
A transmitter sends 0 with probability $0.6$ and 1 with probability $0.4$. The channel flips a 0 into a 1 with probability $0.01$ and a 1 into a 0 with probability $0.02$. Find the probability that a 1 is received, the probability that a received 1 was really sent as a 1, and the overall probability of a bit error.
::: solution
Let $S_0, S_1$ be the events "0 sent", "1 sent" and $R_1$ the event "1 received". By total probability,

$$
\Prob(R_1) = \Prob(R_1\mid S_0)\Prob(S_0) + \Prob(R_1\mid S_1)\Prob(S_1) = 0.01\times0.6 + 0.98\times0.4 = 0.006 + 0.392 = 0.398.
$$

By Bayes' rule,

$$
\Prob(S_1\mid R_1) = \frac{0.392}{0.398} = 0.9849.
$$

Similarly $\Prob(S_0\mid R_0) = 0.594/0.602 = 0.9867$. An error happens when a 0 is sent and flipped or a 1 is sent and flipped:

$$
P_e = 0.01\times0.6 + 0.02\times0.4 = 0.014 .
$$

Note that $\Prob(S_1\mid R_1) = 0.985$ is *not* the same as $\Prob(R_1\mid S_1) = 0.98$: the forward and backward probabilities differ because the two symbols have different prior probabilities.
:::
:::

## Random variables and their distributions

Most engineering outcomes are numbers: a voltage, a count, an error. A **random variable** $X$ is a rule that assigns a real number $X(\omega)$ to each outcome $\omega$. Its probabilistic behaviour is summarised by one function.

::: definition Distribution and density {#def-cdf-pdf}
The **cumulative distribution function** (CDF) of a random variable $X$ is

$$
F_X(x) = \Prob(X \le x), \qquad x\in\R .
$$

It is non-decreasing, right-continuous, and runs from $F_X(-\infty) = 0$ to $F_X(\infty) = 1$. If $X$ takes only the values $x_1, x_2, \ldots$ it is **discrete**, with **probability mass function** (PMF) $p_X(x_k) = \Prob(X = x_k)$. If $F_X$ is differentiable, $X$ is **continuous** with **probability density function** (PDF)

$$
f_X(x) = \deriv{F_X}{x}, \qquad \Prob(a < X \le b) = \int_a^b f_X(x)\,\dd x, \qquad \int_{-\infty}^\infty f_X(x)\,\dd x = 1 .
$$ {#eq-pdf}
:::

A density is not a probability: $f_X(x)\,\dd x$ is the probability that $X$ lands in the small interval $(x, x+\dd x]$, and $f_X$ has the units of $1/x$ (per volt, for a voltage). Densities can exceed 1; probabilities cannot. Mixed variables, with both a density and point masses, occur too — the output of a half-wave rectifier fed with noise is exactly $0$ half the time — and are handled by allowing impulses $\delta(x - x_k)$ in the density, just as impulses appear in the spectra of [[signals-systems/fourier-transform]].

The following distributions turn up again and again in electrical engineering. Their properties are derived in [Discrete random variables](/learn/maths/lesson.php?c=probability&l=discrete-random-variables) and [Continuous random variables](/learn/maths/lesson.php?c=probability&l=continuous-random-variables).

| distribution | PMF or PDF | mean | variance | where it appears |
|---|---|---|---|---|
| Bernoulli$(p)$ | $\Prob(X=1) = p$, $\Prob(X=0) = 1-p$ | $p$ | $p(1-p)$ | one bit in error or not |
| binomial $(n, p)$ | $\binom nk p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ | errors in a block of $n$ bits |
| Poisson $(\lambda)$ | $e^{-\lambda}\lambda^k/k!$ | $\lambda$ | $\lambda$ | photons, electrons, packets in a time slot |
| uniform $(a, b)$ | $1/(b-a)$ on $[a, b]$ | $(a+b)/2$ | $(b-a)^2/12$ | quantisation error, random phase |
| exponential $(\lambda)$ | $\lambda e^{-\lambda x}$, $x\ge0$ | $1/\lambda$ | $1/\lambda^2$ | time between Poisson events, lifetimes |
| Gaussian $\Normal(\mu,\sigma^2)$ | $\frac{1}{\sqrt{2\pi}\sigma}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ | thermal noise, sums of many effects |
| Rayleigh $(\sigma)$ | $\frac{r}{\sigma^2}e^{-r^2/2\sigma^2}$, $r\ge0$ | $\sigma\sqrt{\pi/2}$ | $(2-\pi/2)\sigma^2$ | envelope of narrowband noise, fading |

## Expectation, power and the Gaussian

::: definition Expectation and moments {#def-moments}
The **expected value** or **mean** of $X$ is

$$
\E[X] = \int_{-\infty}^\infty x\,f_X(x)\,\dd x \quad\text{or}\quad \E[X] = \sum_k x_k\,p_X(x_k),
$$

and more generally $\E[g(X)] = \int g(x)f_X(x)\,\dd x$ for any function $g$. The **mean square** is $\E[X^2]$, the **variance** $\Var(X) = \sigma_X^2 = \E[(X - \mu_X)^2]$ with $\mu_X = \E[X]$, and the **standard deviation** is $\sigma_X$. Expanding the square,

$$
\E[X^2] = \sigma_X^2 + \mu_X^2 .
$$ {#eq-power-split}
:::

The identity [[#eq-power-split]] is the probabilistic form of a fact every engineer knows about signals. If $X$ is the value of a voltage across $1\,\Omega$, then $\mu_X$ is its **DC value**, $\E[X^2]$ its **total mean power**, $\mu_X^2$ the **DC power** and $\sigma_X^2$ the **AC power**; $\sqrt{\E[X^2]}$ is the RMS value and $\sigma_X$ the RMS value of the fluctuation. A noise voltage with zero mean has RMS value equal to its standard deviation, which is why "$\sigma$" and "RMS" are used interchangeably for noise.

Expectation is linear: $\E[aX + bY + c] = a\E[X] + b\E[Y] + c$ for any random variables, independent or not. Variance is not linear: $\Var(aX + c) = a^2\Var(X)$, and the variance of a sum involves the correlation between the terms (see below).

::: example Quantisation noise {#ex-quantisation}
An ideal $N$-bit ADC with input range $\pm V_\mathrm{FS}$ rounds each sample to the nearest of $2^N$ levels spaced $\Delta = 2V_\mathrm{FS}/2^N$ apart. Model the rounding error $e$ as uniform on $[-\Delta/2, \Delta/2]$. Find its mean and RMS value, and the signal-to-quantisation-noise ratio for a full-scale sine wave. Evaluate for $N = 12$ and $V_\mathrm{FS} = 1\,\mathrm{V}$.
::: solution
The density is $f_e = 1/\Delta$ on $[-\Delta/2, \Delta/2]$, symmetric about zero, so $\E[e] = 0$ and

$$
\sigma_e^2 = \E[e^2] = \frac1\Delta\int_{-\Delta/2}^{\Delta/2}e^2\,\dd e = \frac{1}{\Delta}\cdot\frac{2}{3}\Bigl(\frac\Delta2\Bigr)^3 = \frac{\Delta^2}{12}.
$$

A full-scale sine of amplitude $V_\mathrm{FS} = 2^{N-1}\Delta$ has power $V_\mathrm{FS}^2/2 = 2^{2N}\Delta^2/8$, so

$$
\mathrm{SQNR} = \frac{2^{2N}\Delta^2/8}{\Delta^2/12} = \frac32\,2^{2N}, \qquad 10\log_{10}\mathrm{SQNR} = 6.02N + 1.76\ \mathrm{dB}.
$$

For $N = 12$ and $V_\mathrm{FS} = 1\,\mathrm{V}$: $\Delta = 2/4096 = 0.488\,\mathrm{mV}$, $\sigma_e = \Delta/\sqrt{12} = 0.141\,\mathrm{mV}$ RMS, and $\mathrm{SQNR} = 74.0\,\mathrm{dB}$. A seeded simulation that rounds $200\,000$ uniformly distributed inputs gives an RMS error of $0.14099\,\mathrm{mV}$, against the predicted $0.14095\,\mathrm{mV}$. The uniform model is good when the signal is busy and spans many levels; it fails for small or slowly varying signals, where the error is strongly correlated with the signal (see [[electronics-2/data-converters]]).
:::
:::

### The Gaussian distribution and the Q-function

The Gaussian (or normal) distribution is special for two reasons. Physically, noise that is the sum of very many small independent contributions — the thermal agitation of electrons, the arrival of many photons — is Gaussian by the **central limit theorem** ([Limit theorems](/learn/maths/lesson.php?c=probability&l=limit-theorems)). Mathematically, Gaussians stay Gaussian under every linear operation, so that filtered Gaussian noise is still Gaussian ([[random-signals/gaussian-noise]]).

::: widget clt
dist: uniform
n: 4
samples: 4000
caption: Each sample is the mean of $n$ independent uniform variables — think of $n$ independent noise contributions added together. Already at $n = 4$ the histogram is hard to tell from the Gaussian curve; try the skewed and bimodal populations and see how many terms they need. This is why the noise of a resistor, made of the motions of some $10^{20}$ electrons, is Gaussian to high accuracy.
:::

The Gaussian CDF has no closed form. Engineers express tail probabilities with the **Q-function**.

::: definition The Q-function {#def-q}
For a standard Gaussian $Z \sim \Normal(0, 1)$,

$$
Q(x) = \Prob(Z > x) = \frac{1}{\sqrt{2\pi}}\int_x^\infty e^{-u^2/2}\,\dd u = \tfrac12\operatorname{erfc}\bigl(x/\sqrt2\bigr).
$$ {#eq-q}

If $X\sim\Normal(\mu,\sigma^2)$ then $(X-\mu)/\sigma \sim \Normal(0,1)$, so $\Prob(X > x) = Q\bigl((x - \mu)/\sigma\bigr)$. Also $Q(-x) = 1 - Q(x)$, and for $x > 0$ the bounds $\dfrac{x}{1+x^2}\dfrac{e^{-x^2/2}}{\sqrt{2\pi}} < Q(x) < \dfrac{e^{-x^2/2}}{x\sqrt{2\pi}}$ hold, so $Q(x)$ falls like $e^{-x^2/2}$.
:::

| $x$ | $1$ | $2$ | $3$ | $4$ | $4.75$ | $5$ | $6$ |
|---|---|---|---|---|---|---|---|
| $Q(x)$ | $0.159$ | $0.0228$ | $1.35\times10^{-3}$ | $3.17\times10^{-5}$ | $1.0\times10^{-6}$ | $2.87\times10^{-7}$ | $9.87\times10^{-10}$ |

The extraordinary steepness of the tail is the most important practical fact about Gaussian noise. Going from $4\sigma$ to $6\sigma$ — a factor of $1.5$ in amplitude, $3.5\,\mathrm{dB}$ — reduces the probability of exceeding the threshold by a factor of thirty thousand.

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: 2
b: 6
caption: The shaded area is $\Prob(2 < Z \le 6) \approx Q(2)$ for a standard Gaussian. Move $a$ from $1$ to $4$ and watch the tail probability collapse from $0.16$ to $3\times10^{-5}$; change $\sigma$ to see that only the ratio threshold/$\sigma$ matters.
:::

::: example Designing a threshold receiver {#ex-threshold-design}
A baseband link sends $+A$ for a 1 and $-A$ for a 0, equally likely. The receiver samples the signal plus zero-mean Gaussian noise of RMS value $\sigma = 10\,\mathrm{mV}$ and decides "1" if the sample is positive. What amplitude $A$ gives a bit error probability of $10^{-6}$? What error probability results if $A$ is halved?
::: solution
If a 1 is sent the sample is $X = A + N$ with $N\sim\Normal(0,\sigma^2)$, and an error occurs when $X < 0$, that is $N < -A$. By symmetry $\Prob(N < -A) = Q(A/\sigma)$, and the same holds when a 0 is sent, so

$$
P_e = \tfrac12 Q(A/\sigma) + \tfrac12 Q(A/\sigma) = Q(A/\sigma).
$$

We need $Q(A/\sigma) = 10^{-6}$, which (by bisection on [[#eq-q]], or from the table) gives $A/\sigma = 4.753$. Hence $A = 4.753\times10\,\mathrm{mV} = 47.5\,\mathrm{mV}$.

Halving the amplitude gives $A/\sigma = 2.377$ and $P_e = Q(2.377) = 8.7\times10^{-3}$: a $6\,\mathrm{dB}$ loss of signal raises the error rate nearly ten thousand times. Every digital receiver lives on this steep curve; [[random-signals/optimal-filtering]] shows how to make $A/\sigma$ as large as possible.
:::
:::

::: warning σ is an RMS value, not a peak
Gaussian noise has no peak value: any level is exceeded eventually. When a data sheet quotes "peak-to-peak noise" it means a span that is rarely exceeded, usually $6.6\sigma$ ($\pm3.3\sigma$, exceeded $0.1\,\%$ of the time). Do not put a peak-to-peak figure into $Q(A/\sigma)$; convert it to RMS first.
:::

::: quiz
A sensor output is Gaussian with mean $2.0\,\mathrm{V}$ and standard deviation $0.1\,\mathrm{V}$. What is the probability that a reading exceeds $2.3\,\mathrm{V}$?
- [ ] $0.3$
- [ ] $Q(0.3) \approx 0.38$
- [x] $Q(3) \approx 1.35\times10^{-3}$
- [ ] $Q(23)$, essentially zero
::: solution
Standardise: $\Prob(X > 2.3) = Q\bigl((2.3 - 2.0)/0.1\bigr) = Q(3) = 1.35\times10^{-3}$. The argument of $Q$ is the distance from the mean measured in standard deviations, not in volts.
:::
:::

## Two random variables

A signal and the noise added to it, the voltages at two ends of a cable, the in-phase and quadrature outputs of a demodulator: engineering problems usually involve several random quantities at once, and the interesting questions concern how they relate.

::: definition Joint distribution, independence and correlation {#def-joint}
The **joint density** $f_{XY}(x, y)$ of two continuous random variables gives $\Prob\bigl((X, Y)\in D\bigr) = \iint_D f_{XY}\,\dd x\,\dd y$ for any region $D$ of the plane. The **marginal** densities are $f_X(x) = \int f_{XY}(x, y)\,\dd y$ and $f_Y(y) = \int f_{XY}(x,y)\,\dd x$. $X$ and $Y$ are **independent** if $f_{XY}(x, y) = f_X(x)f_Y(y)$ for all $x, y$. The **correlation** of $X$ and $Y$ is $\E[XY]$; their **covariance** and **correlation coefficient** are

$$
\Cov(X, Y) = \E\bigl[(X - \mu_X)(Y - \mu_Y)\bigr] = \E[XY] - \mu_X\mu_Y, \qquad \rho_{XY} = \frac{\Cov(X, Y)}{\sigma_X\sigma_Y}.
$$ {#eq-cov}

$X$ and $Y$ are **uncorrelated** if $\Cov(X, Y) = 0$, and **orthogonal** if $\E[XY] = 0$.
:::

The correlation coefficient always satisfies $-1\le\rho_{XY}\le1$ (by the Cauchy–Schwarz inequality, $\abs{\E[UV]}^2 \le \E[U^2]\E[V^2]$, applied to the centred variables), with $\abs{\rho} = 1$ exactly when $Y$ is a linear function of $X$. It measures *linear* dependence only. Independence implies uncorrelatedness, because $\E[XY] = \iint xy f_X(x)f_Y(y)\,\dd x\,\dd y = \E[X]\E[Y]$, but not conversely: if $X$ is uniform on $[-1, 1]$ and $Y = X^2$, then $Y$ is completely determined by $X$, yet $\Cov(X, Y) = \E[X^3] - \E[X]\E[X^2] = 0$. For jointly Gaussian variables — and only in such special cases — uncorrelated does imply independent.

Note the vocabulary: in signal processing "correlation" means the unnormalised $\E[XY]$, which for zero-mean variables equals the covariance. The next two chapters build the whole theory of random signals on correlations of this kind.

::: quiz
$X$ is a zero-mean noise voltage with a density symmetric about zero, and $Y = \abs{X}$ is the output of an ideal full-wave rectifier. Which statement is true?
- [ ] $X$ and $Y$ are independent, because $\Cov(X, Y) = 0$.
- [x] $X$ and $Y$ are uncorrelated but not independent.
- [ ] $X$ and $Y$ are positively correlated, because $Y$ grows with $\abs{X}$.
- [ ] $\rho_{XY} = 1$, because $Y$ is a function of $X$.
::: solution
$\Cov(X, Y) = \E[X\abs{X}] - \E[X]\E[\abs{X}] = 0 - 0$, since $x\abs{x}$ is odd and the density is even. So they are uncorrelated. But knowing $X$ fixes $Y$ completely, so they are certainly not independent. A correlation coefficient of $\pm1$ requires a *linear* relation, and $\abs{x}$ is not linear.
:::
:::

::: theorem Sums of random variables {#thm-sum}
For any random variables $X$ and $Y$,

$$
\Var(X + Y) = \Var(X) + \Var(Y) + 2\Cov(X, Y).
$$ {#eq-var-sum}

If $X$ and $Y$ are uncorrelated, their variances add. If they are independent, the density of $Z = X + Y$ is the convolution of their densities:

$$
f_Z(z) = \int_{-\infty}^{\infty}f_X(x)\,f_Y(z - x)\,\dd x .
$$ {#eq-pdf-conv}
:::

::: proof
Write $\tilde X = X - \mu_X$ and $\tilde Y = Y - \mu_Y$. Then $\Var(X + Y) = \E[(\tilde X + \tilde Y)^2] = \E[\tilde X^2] + \E[\tilde Y^2] + 2\E[\tilde X\tilde Y]$, which is [[#eq-var-sum]]. For the density, $F_Z(z) = \Prob(X + Y \le z) = \int f_X(x)\Bigl[\int_{-\infty}^{z - x}f_Y(y)\,\dd y\Bigr]\dd x$ by independence; differentiating under the integral with respect to $z$ gives [[#eq-pdf-conv]].
:::

This theorem is the reason that "independent noise sources add in power" ([[electronics-2/electronic-noise]]): powers are variances, and the cross term vanishes for uncorrelated sources. The convolution formula explains the central limit theorem pictorially: convolving two uniform densities gives a triangle, convolving again gives a piecewise quadratic, and repeated convolution smooths any shape towards a Gaussian.

::: example Signal plus independent noise {#ex-signal-noise}
A sensor signal $S$ with mean $0$ and RMS value $3\,\mathrm{mV}$ is observed as $X = S + N$, where the noise $N$ is independent of $S$, has zero mean and RMS value $4\,\mathrm{mV}$. Find the RMS value of $X$ and the correlation coefficient between $X$ and $S$.
::: solution
By [[#thm-sum]] with $\Cov(S, N) = 0$, $\sigma_X^2 = 9 + 16 = 25\,\mathrm{mV^2}$, so $\sigma_X = 5\,\mathrm{mV}$ RMS (not $3 + 4 = 7\,\mathrm{mV}$). The covariance is

$$
\Cov(X, S) = \E[(S + N)S] = \E[S^2] + \E[NS] = 9\,\mathrm{mV^2} + 0,
$$

so $\rho_{XS} = 9/(5\times3) = 0.6$. In general $\rho_{XS} = \sigma_S/\sqrt{\sigma_S^2 + \sigma_N^2} = \sqrt{\mathrm{SNR}/(1 + \mathrm{SNR})}$ with $\mathrm{SNR} = \sigma_S^2/\sigma_N^2$: correlation with the clean signal is a measure of signal-to-noise ratio.
:::
:::

### Jointly Gaussian variables and random vectors

With many variables we collect them into a column vector $\mathbf{X} = [X_1, \ldots, X_n]\T$, with **mean vector** $\boldsymbol\mu = \E[\mathbf X]$ and **covariance matrix** $\mathbf{C} = \E\bigl[(\mathbf X - \boldsymbol\mu)(\mathbf X - \boldsymbol\mu)\T\bigr]$, whose $(i,k)$ entry is $\Cov(X_i, X_k)$. A covariance matrix is symmetric and positive semidefinite, because $\mathbf a\T\mathbf C\mathbf a = \Var(\mathbf a\T\mathbf X) \ge 0$ for every vector $\mathbf a$.

::: definition Jointly Gaussian random vector {#def-gauss-vector}
$\mathbf X$ is **jointly Gaussian** with mean $\boldsymbol\mu$ and nonsingular covariance $\mathbf C$, written $\mathbf X\sim\Normal(\boldsymbol\mu, \mathbf C)$, if

$$
f_{\mathbf X}(\mathbf x) = \frac{1}{(2\pi)^{n/2}\sqrt{\det\mathbf C}}\exp\Bigl(-\tfrac12(\mathbf x - \boldsymbol\mu)\T\mathbf C^{-1}(\mathbf x - \boldsymbol\mu)\Bigr).
$$ {#eq-gauss-vector}

Equivalently, every linear combination $\mathbf a\T\mathbf X$ is a (scalar) Gaussian random variable.
:::

::: theorem Linear transformation of Gaussian vectors {#thm-linear-gauss}
If $\mathbf X\sim\Normal(\boldsymbol\mu, \mathbf C)$ and $\mathbf Y = \mathbf A\mathbf X + \mathbf b$ for a matrix $\mathbf A$ and vector $\mathbf b$, then $\mathbf Y$ is jointly Gaussian with

$$
\E[\mathbf Y] = \mathbf A\boldsymbol\mu + \mathbf b, \qquad \mathbf C_{\mathbf Y} = \mathbf A\mathbf C\mathbf A\T .
$$ {#eq-linear-cov}

In particular, jointly Gaussian variables that are uncorrelated are independent.
:::

::: proof
Linearity of expectation gives the mean. For the covariance, $\mathbf Y - \E[\mathbf Y] = \mathbf A(\mathbf X - \boldsymbol\mu)$, so $\mathbf C_{\mathbf Y} = \E[\mathbf A(\mathbf X-\boldsymbol\mu)(\mathbf X-\boldsymbol\mu)\T\mathbf A\T] = \mathbf A\mathbf C\mathbf A\T$. Any linear combination of $\mathbf Y$ is $\mathbf a\T\mathbf A\mathbf X + \mathbf a\T\mathbf b$, a linear combination of $\mathbf X$ plus a constant, hence Gaussian; so $\mathbf Y$ is jointly Gaussian by the second form of [[#def-gauss-vector]]. Finally, if $\mathbf C$ is diagonal then $\mathbf C^{-1}$ is diagonal and the quadratic form in [[#eq-gauss-vector]] is a sum of squares, so the exponential factorises into a product of one-dimensional Gaussian densities: the components are independent.
:::

The rule $\mathbf C_{\mathbf Y} = \mathbf A\mathbf C\mathbf A\T$ holds for *any* random vector, Gaussian or not; what is special about the Gaussian is that the mean and covariance determine the whole distribution. This is why second-order statistics — means and correlations — are a complete description of Gaussian noise, and why the course concentrates on them.

## Functions of random variables

Signals pass through nonlinear devices: rectifiers, squarers (power meters), limiters, envelope detectors, analog-to-digital converters. If $Y = g(X)$ and we know $f_X$, what is $f_Y$?

::: theorem Density of a function of a random variable {#thm-transform}
Let $Y = g(X)$, where $g$ is differentiable, and suppose that for a given $y$ the equation $g(x) = y$ has finitely many roots $x_1, \ldots, x_m$ with $g'(x_k) \neq 0$. Then

$$
f_Y(y) = \sum_{k=1}^m\frac{f_X(x_k)}{\abs{g'(x_k)}} .
$$ {#eq-transform}

If $g(x) = y$ has no roots, $f_Y(y) = 0$.
:::

::: proof
For a small $\dd y > 0$, the event $y < Y \le y + \dd y$ occurs exactly when $X$ lies in one of the small intervals around the roots $x_k$ that $g$ maps onto $(y, y + \dd y]$. Near $x_k$, $g(x) \approx y + g'(x_k)(x - x_k)$, so that interval has length $\dd y/\abs{g'(x_k)}$ and probability $f_X(x_k)\,\dd y/\abs{g'(x_k)}$. The intervals are disjoint for small $\dd y$, so the probabilities add: $f_Y(y)\,\dd y = \sum_k f_X(x_k)\,\dd y/\abs{g'(x_k)}$.
:::

The factor $1/\abs{g'}$ has a clear meaning: where the device characteristic is steep it spreads the probability thinly over many output values, and where it is flat it piles probability up. Flat regions of zero slope, such as a clipping limiter, give point masses in $f_Y$.

::: example The random-phase sinusoid {#ex-arcsine}
A sinusoid $A\cos\Theta$ is sampled at an instant unrelated to its phase, so that $\Theta$ is uniform on $[0, 2\pi)$. Find the density of the sample $Y = A\cos\Theta$, and its mean and mean square.
::: solution
For $\abs{y} < A$ the equation $A\cos\theta = y$ has two roots in $[0, 2\pi)$, $\theta_{1,2} = \pm\arccos(y/A)$ (mod $2\pi$), and at each $\abs{g'(\theta)} = \abs{A\sin\theta} = \sqrt{A^2 - y^2}$. With $f_\Theta = 1/(2\pi)$, [[#eq-transform]] gives

$$
f_Y(y) = 2\cdot\frac{1/(2\pi)}{\sqrt{A^2 - y^2}} = \frac{1}{\pi\sqrt{A^2 - y^2}}, \qquad \abs{y} < A,
$$

and $f_Y = 0$ for $\abs{y} > A$. This **arcsine density** is infinite at $\pm A$: a sinusoid spends most of its time near its peaks, where it is momentarily stationary. By symmetry $\E[Y] = 0$, and

$$
\E[Y^2] = \E[A^2\cos^2\Theta] = \frac{A^2}{2\pi}\int_0^{2\pi}\cos^2\theta\,\dd\theta = \frac{A^2}{2},
$$

the familiar mean power of a sinusoid. Computing $\E[Y^2]$ from $\Theta$ directly, rather than from $f_Y$, is an instance of the rule $\E[g(X)] = \int g(x)f_X(x)\,\dd x$, which never needs the density of $g(X)$.
:::
:::

::: widget plot
f: if(abs(x) < A, 1/(pi*sqrt(A^2 - x^2)), 0); exp(-x^2/A^2)/(sqrt(pi)*A)
x: -3, 3
y: 0, 1.5
sliders: A=1:0.3:2.5:0.1
labels: \text{sinusoid, amplitude } A; \text{Gaussian, same power}
caption: Density of a sample of a random-phase sinusoid of amplitude $A$ (the arcsine law) against the Gaussian density with the same mean power $A^2/2$. They have the same RMS value, but the sinusoid never exceeds $A$ and spends most of its time near $\pm A$, while the Gaussian is concentrated near zero with thin tails reaching far beyond $A$. A histogram of samples tells a sine wave from noise at a glance.
:::

### Two variables: the Rayleigh envelope

For a function of two variables, $(U, V) = \mathbf g(X, Y)$ with a one-to-one smooth map, the same argument with areas instead of lengths gives $f_{UV}(u, v) = f_{XY}(x, y)/\abs{J}$, where $J$ is the Jacobian determinant $\partial(u, v)/\partial(x, y)$ evaluated at the preimage (see [Joint distributions](/learn/maths/lesson.php?c=probability&l=joint-distributions)). The most important application in communications follows.

::: example The envelope of two Gaussian components {#ex-rayleigh}
A narrowband noise signal at a radio receiver can be written $X\cos\omega_ct - Y\sin\omega_ct$, where $X$ and $Y$ are independent $\Normal(0,\sigma^2)$ variables ([[random-signals/gaussian-noise]]). Find the density of the envelope $R = \sqrt{X^2 + Y^2}$ and of the phase $\Phi = \operatorname{atan2}(Y, X)$, the mean of $R$, and the probability that $R$ exceeds $3\sigma$.
::: solution
The joint density is $f_{XY} = \frac{1}{2\pi\sigma^2}e^{-(x^2+y^2)/2\sigma^2}$. Change to polar coordinates $x = r\cos\phi$, $y = r\sin\phi$; the area element $\dd x\,\dd y = r\,\dd r\,\dd\phi$, so

$$
f_{R\Phi}(r, \phi) = \frac{r}{2\pi\sigma^2}e^{-r^2/2\sigma^2}, \qquad r \ge 0,\ -\pi < \phi \le \pi .
$$

This factorises: $\Phi$ is uniform on $(-\pi, \pi]$, independent of $R$, and $R$ has the **Rayleigh density**

$$
f_R(r) = \frac{r}{\sigma^2}e^{-r^2/2\sigma^2}, \qquad r\ge 0 .
$$ {#eq-rayleigh}

Its mean is $\E[R] = \int_0^\infty \frac{r^2}{\sigma^2}e^{-r^2/2\sigma^2}\,\dd r = \sigma\sqrt{\pi/2} = 1.253\sigma$, and $\E[R^2] = \E[X^2] + \E[Y^2] = 2\sigma^2$. The tail is

$$
\Prob(R > r) = \int_r^\infty f_R\,\dd r' = e^{-r^2/2\sigma^2}, \qquad \Prob(R > 3\sigma) = e^{-4.5} = 0.0111 .
$$

A simulation with Python's `random.gauss`, seed $2$, $200\,000$ pairs and $\sigma = 1$, printed a mean envelope of $1.2530$ (theory $1.2533$), mean square $1.9970$ (theory $2$) and $\Prob(R > 3) = 0.01101$ (theory $0.01111$). Note that the envelope exceeds $3\sigma$ about four times as often as a single Gaussian component does ($2Q(3) = 0.0027$ for $\abs{X} > 3\sigma$).
:::
:::

::: remark Rice and fading
If a sinusoid of amplitude $A$ is added to the narrowband noise, the envelope has the **Rice** density, which tends to the Rayleigh density as $A\to0$ and to a Gaussian of mean $A$ as $A/\sigma\to\infty$. The same two densities describe the amplitude of a radio signal arriving by many scattered paths, without (Rayleigh) or with (Rice) a direct line-of-sight path; see [[communication-systems/wireless-communication]].
:::

::: application Where the distribution matters
Power and RMS figures depend only on the second moment, but many practical limits depend on the whole distribution. The **crest factor** (peak/RMS) of a signal decides how much headroom an amplifier or converter needs: $\sqrt2$ for a sinusoid, about $3.3$–$4$ for Gaussian-like signals such as OFDM radio waveforms or audio programme material. Clipping such a signal at $3.3\sigma$ distorts $0.1\,\%$ of the samples; the power-amplifier "back-off" used in Wi-Fi and LTE transmitters is a direct consequence of the Gaussian tail.
:::

::: history
Probability began with a correspondence in 1654 between Blaise Pascal and Pierre de Fermat about games of chance. Abraham de Moivre found the normal curve in 1733 as an approximation to the binomial distribution; Carl Friedrich Gauss derived it in 1809 as the law of errors of astronomical observations, and Pierre-Simon Laplace proved a general form of the central limit theorem in 1810. Lord Rayleigh obtained the distribution that bears his name in 1880, studying the resultant of many sound vibrations of random phase. The axiomatic foundation now universal was given by Andrey Kolmogorov in 1933. Stephen O. Rice's long paper *Mathematical Analysis of Random Noise* in the *Bell System Technical Journal* (1944–45) brought these tools to bear on electrical noise and remains a classic of the field.
:::

## Where this leads

Random variables describe single measurements. A noise waveform is an uncountable family of them, one at each instant, and the relations between values at different times — the correlations of [[#def-joint]] — carry the information about its spectrum. [[random-signals/random-processes]] makes this precise, [[random-signals/correlation-spectra]] turns correlations into power spectral densities, and [[random-signals/estimation-kalman]] uses jointly Gaussian vectors and [[#thm-linear-gauss]] to estimate signals from noisy measurements. The Q-function returns in every error-rate calculation of [[communication-systems/optimal-detection]] and [[communication-systems/digital-modulation]].

::: summary
- Probabilities are long-run relative frequencies; Bayes' rule ([[#thm-bayes]]) turns forward channel probabilities into the backward probabilities a receiver needs.
- A random variable is described by its CDF and PDF (or PMF); a density has units of $1/x$ and only $f_X\,\dd x$ is a probability.
- Mean $=$ DC value, mean square $=$ total power, variance $=$ AC power: $\E[X^2] = \sigma_X^2 + \mu_X^2$. Uniform quantisation error has variance $\Delta^2/12$, giving $6.02N + 1.76\,\mathrm{dB}$.
- Gaussian tail probabilities are $Q\bigl((x-\mu)/\sigma\bigr)$; $Q$ falls like $e^{-x^2/2}$, so error rates are extremely sensitive to the ratio amplitude/$\sigma$.
- Covariance and the correlation coefficient measure linear dependence; uncorrelated variances add, and independent densities convolve.
- Linear maps send $\Normal(\boldsymbol\mu, \mathbf C)$ to $\Normal(\mathbf A\boldsymbol\mu + \mathbf b, \mathbf A\mathbf C\mathbf A\T)$; for Gaussians, uncorrelated means independent.
- Through a device $Y = g(X)$, $f_Y = \sum f_X(x_k)/\abs{g'(x_k)}$; a random-phase sinusoid has the arcsine density, and the envelope of two independent Gaussian components is Rayleigh.
:::

## Exercises

::: exercise Moments of a uniform voltage {level=1 check="1/3"}
A voltage $X$ is uniformly distributed between $0$ and $2\,\mathrm{V}$. Find its mean, its mean square and its variance (in $\mathrm{V^2}$).
::: solution
$\E[X] = 1\,\mathrm{V}$. $\E[X^2] = \frac12\int_0^2x^2\,\dd x = \frac{8}{6} = \frac43\,\mathrm{V^2}$. By [[#eq-power-split]], $\Var(X) = \frac43 - 1 = \frac13\,\mathrm{V^2}$, which agrees with $(b-a)^2/12 = 4/12$. The DC power is $1\,\mathrm{W}$ and the AC power $\frac13\,\mathrm{W}$ in $1\,\Omega$.
:::
:::

::: exercise Exceeding a noise threshold {level=1 check="0.0026997961"}
Zero-mean Gaussian noise has an RMS value of $2\,\mathrm{mV}$. What is the probability that a sample has magnitude greater than $6\,\mathrm{mV}$?
::: solution
$\Prob(\abs{N} > 6\,\mathrm{mV}) = 2Q(6/2) = 2Q(3) = 2\times1.3499\times10^{-3} = 2.70\times10^{-3}$.
:::
:::

::: exercise Photon counting {level=1 check="exp(-4)"}
A photodiode receives on average $4$ photons per bit interval, the count being Poisson. What is the probability that no photon arrives in an interval (so that a transmitted 1 is read as 0)?
::: solution
$\Prob(K = 0) = e^{-\lambda}\lambda^0/0! = e^{-4} = 0.0183$. Even with perfect electronics an optical receiver needs a minimum number of photons per bit; for an error probability of $10^{-9}$ from this mechanism alone, $\lambda = 9\ln10 \approx 20.7$ photons (the "quantum limit").
:::
:::

::: exercise A noisier channel {level=2 check="0.95/(0.95+0.08)"}
In the channel of [[#ex-binary-channel]], suppose 0 and 1 are equally likely, a 0 becomes a 1 with probability $0.08$ and a 1 becomes a 0 with probability $0.05$. Find the probability that a received 1 was sent as a 1.
::: solution
$\Prob(R_1) = 0.5\times0.08 + 0.5\times0.95 = 0.515$, and $\Prob(S_1\mid R_1) = 0.475/0.515 = 0.922$ (the halves cancel, giving $0.95/1.03$).
:::
:::

::: exercise The square-law detector {level=2}
A power meter squares its input: $Y = X^2$ with $X \sim \Normal(0, \sigma^2)$. Find the density of $Y$, its mean and its variance. What is the ratio of the RMS fluctuation of $Y$ to its mean?
::: hint
Use [[#thm-transform]] with two roots $\pm\sqrt y$. For the variance you need $\E[X^4] = 3\sigma^4$.
:::
::: solution
For $y > 0$ the roots are $x = \pm\sqrt y$, with $\abs{g'(x)} = 2\sqrt y$. So

$$
f_Y(y) = 2\cdot\frac{1}{\sqrt{2\pi}\sigma}e^{-y/2\sigma^2}\cdot\frac{1}{2\sqrt y} = \frac{1}{\sigma\sqrt{2\pi y}}e^{-y/2\sigma^2}, \qquad y > 0,
$$

a chi-square density with one degree of freedom, scaled by $\sigma^2$. $\E[Y] = \sigma^2$ and $\E[Y^2] = \E[X^4] = 3\sigma^4$, so $\Var(Y) = 2\sigma^4$ and the ratio is $\sqrt2\sigma^2/\sigma^2 = \sqrt2$. A single squared sample is a very poor power estimate; a power meter must average many independent samples, the fluctuation falling as $1/\sqrt{n}$ ([[random-signals/random-processes]]).
:::
:::

::: exercise Covariance of a linear transformation {level=2}
Two independent zero-mean noise voltages $X_1$, $X_2$ have variances $1\,\mathrm{mV^2}$ and $4\,\mathrm{mV^2}$. A differential amplifier forms $Y_1 = X_1 + X_2$ and $Y_2 = X_1 - X_2$. Find the covariance matrix of $(Y_1, Y_2)$ and the correlation coefficient. Are $Y_1$ and $Y_2$ independent if the $X_i$ are Gaussian?
::: solution
With $\mathbf A = \begin{bmatrix}1&1\\1&-1\end{bmatrix}$ and $\mathbf C = \diag(1, 4)$, [[#eq-linear-cov]] gives

$$
\mathbf C_{\mathbf Y} = \mathbf A\mathbf C\mathbf A\T = \begin{bmatrix}5 & -3\\ -3 & 5\end{bmatrix}\,\mathrm{mV^2},
$$

so $\rho = -3/5 = -0.6$. They are correlated, hence not independent. (If the two variances were equal, $Y_1$ and $Y_2$ would be uncorrelated and, being jointly Gaussian, independent.)
:::
:::

::: exercise A half-wave rectifier {level=2 check="1/(2*sqrt(2*pi))"}
Zero-mean Gaussian noise $X$ of unit variance drives an ideal half-wave rectifier, $Y = \max(X, 0)$. Find $\Prob(Y = 0)$, $\E[Y]$ (the DC output, the number to enter) and $\E[Y^2]$.
::: solution
$\Prob(Y = 0) = \Prob(X \le 0) = \tfrac12$: the output density has a point mass $\tfrac12\delta(y)$ plus the Gaussian density for $y > 0$. $\E[Y] = \int_0^\infty x\frac{e^{-x^2/2}}{\sqrt{2\pi}}\,\dd x = \frac{1}{\sqrt{2\pi}} = 0.399$. Half the power is removed: $\E[Y^2] = \int_0^\infty x^2\frac{e^{-x^2/2}}{\sqrt{2\pi}}\dd x = \tfrac12$. The variance of the output is $\tfrac12 - \tfrac{1}{2\pi} = 0.341$.
:::
:::

::: exercise Optimum threshold with unequal priors {level=3}
In [[#ex-threshold-design]], suppose a 0 (sent as $-A$) has prior probability $P_0$ and a 1 (sent as $+A$) has $P_1 = 1 - P_0$. The receiver decides 1 if the sample exceeds a threshold $t$. (a) Write the error probability as a function of $t$. (b) Show that it is minimised at $t^* = \dfrac{\sigma^2}{2A}\ln\dfrac{P_0}{P_1}$. (c) Evaluate $t^*$ and $P_e$ for $A = 1\,\mathrm{V}$, $\sigma = 0.5\,\mathrm{V}$, $P_0 = 0.8$, and compare with $t = 0$.
::: hint
Differentiate using $\dfrac{\dd}{\dd x}Q(x) = -\dfrac{1}{\sqrt{2\pi}}e^{-x^2/2}$.
:::
::: solution
(a) An error occurs if $-A$ is sent and $-A + N > t$, or $+A$ is sent and $A + N < t$:

$$
P_e(t) = P_0\,Q\Bigl(\frac{t + A}{\sigma}\Bigr) + P_1\,Q\Bigl(\frac{A - t}{\sigma}\Bigr).
$$

(b) Setting the derivative to zero,

$$
-\frac{P_0}{\sigma\sqrt{2\pi}}e^{-(t+A)^2/2\sigma^2} + \frac{P_1}{\sigma\sqrt{2\pi}}e^{-(A-t)^2/2\sigma^2} = 0 \;\Longrightarrow\; \ln\frac{P_0}{P_1} = \frac{(t+A)^2 - (A-t)^2}{2\sigma^2} = \frac{2At}{\sigma^2},
$$

so $t^* = \sigma^2\ln(P_0/P_1)/(2A)$. The threshold moves towards the less likely symbol.

(c) $t^* = 0.25\ln4/2 = 0.173\,\mathrm{V}$. Then $P_e = 0.8\,Q(2.347) + 0.2\,Q(1.653) = 0.8\times9.46\times10^{-3} + 0.2\times0.0491 = 0.0174$. With $t = 0$, $P_e = Q(2) = 0.0228$. The optimum threshold reduces the error rate by about a quarter.
:::
:::

::: exercise Choosing converter resolution {level=3 check="15"}
A signal with range $\pm1\,\mathrm{V}$ carries Gaussian analog noise of $50\,\mu\mathrm{V}$ RMS. Find the smallest number of bits $N$ for which the quantisation noise (modelled as uniform) is at most half the analog noise in RMS value. By how much does the quantisation then increase the total RMS noise?
::: solution
We need $\Delta/\sqrt{12} \le 25\,\mu\mathrm{V}$, i.e. $\Delta \le 86.6\,\mu\mathrm{V}$, and $\Delta = 2/2^N$, so $2^N \ge 23\,094$. Since $2^{14} = 16\,384$ and $2^{15} = 32\,768$, $N = 15$. Then $\Delta = 61.0\,\mu\mathrm{V}$ and $\sigma_q = 17.6\,\mu\mathrm{V}$. Quantisation error and analog noise are independent, so the variances add (by [[#thm-sum]]): total $\sqrt{50^2 + 17.6^2} = 53.0\,\mu\mathrm{V}$, an increase of $6\,\%$ (about $0.5\,\mathrm{dB}$).
:::
:::

::: exercise Deriving the Rayleigh moments {level=3}
Starting from [[#eq-rayleigh]], show that $\E[R] = \sigma\sqrt{\pi/2}$, $\E[R^2] = 2\sigma^2$, and find the median of $R$ and the most likely value (mode). A receiver's narrowband noise has $\sigma = 1\,\mu\mathrm{V}$; with what probability does its envelope exceed $5\,\mu\mathrm{V}$?
::: solution
With $u = r^2/2\sigma^2$, $\E[R^2] = \int_0^\infty \frac{r^3}{\sigma^2}e^{-r^2/2\sigma^2}\dd r = 2\sigma^2\int_0^\infty ue^{-u}\dd u = 2\sigma^2$. For the mean, integrate by parts: $\E[R] = \int_0^\infty r\cdot\frac{r}{\sigma^2}e^{-r^2/2\sigma^2}\dd r = \bigl[-re^{-r^2/2\sigma^2}\bigr]_0^\infty + \int_0^\infty e^{-r^2/2\sigma^2}\dd r = \sigma\sqrt{\pi/2}$, using the Gaussian integral $\int_0^\infty e^{-r^2/2\sigma^2}\dd r = \sigma\sqrt{\pi/2}$. The median solves $e^{-r^2/2\sigma^2} = \tfrac12$: $r = \sigma\sqrt{2\ln2} = 1.177\sigma$. The mode is where $\deriv{}{r}\bigl(re^{-r^2/2\sigma^2}\bigr) = (1 - r^2/\sigma^2)e^{-r^2/2\sigma^2} = 0$: $r = \sigma$. Finally $\Prob(R > 5\sigma) = e^{-12.5} = 3.7\times10^{-6}$.
:::
:::
