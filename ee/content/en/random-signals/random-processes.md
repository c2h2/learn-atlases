Connect an oscilloscope to a resistor and turn up the gain: the trace is a ragged, never-repeating wiggle. Do it again a second later and you see a different wiggle, yet anybody can tell that the two traces are "the same kind" of signal, with the same size and the same texture. The same is true of the bit stream on an Ethernet cable, the speech from a microphone, the fluctuating power of a mobile-phone signal as you walk down a street, and the photocurrent in an optical receiver. Each is a waveform we cannot predict in detail but whose statistical character is stable and measurable.

A **random process** is the mathematical model of such a signal. In [[random-signals/probability-for-engineers]] a random variable was a number chosen by chance; a random process is a whole *waveform* chosen by chance. This chapter sets up the language: the ensemble of possible waveforms, the mean and autocorrelation functions that summarise it, the notion of **stationarity** (statistics that do not change with time), and **ergodicity**, the property that lets us measure ensemble statistics from a single long recording — which is all an engineer ever has. The examples introduced here — the random-phase sinusoid, the random telegraph signal, the random binary waveform and discrete-time white noise — will be used throughout the course.

## Ensembles and sample functions

Imagine a very large collection of identical resistors, all at the same temperature, each connected to its own oscilloscope. Each screen shows a different waveform. The collection of all the waveforms that could occur, together with the probabilities with which they occur, is the **ensemble**.

::: definition Random process {#def-process}
A **random process** (or stochastic process) $X(t)$ is a family of random variables indexed by time $t$, all defined on the same probability space. For each outcome $\omega$ of the underlying experiment, $t\mapsto X(t, \omega)$ is an ordinary function of time, a **sample function** or **realisation** $x(t)$; for each fixed time $t_1$, $X(t_1)$ is a random variable. If $t$ ranges over the real numbers the process is **continuous-time**; if it ranges over the integers it is **discrete-time**, written $X[n]$.
:::

So a random process can be viewed in two ways, and both are essential.

- **Across the ensemble at a fixed time** ("vertically"): $X(t_1)$ is a random variable with a density $f_{X}(x; t_1)$, and we can ask for its mean or variance.
- **Along one sample function** ("horizontally"): $x(t)$ is a deterministic signal, and we can compute its time average, its power or its Fourier transform.

A complete description of the process requires the joint distribution of $X(t_1), X(t_2), \ldots, X(t_n)$ for every $n$ and every choice of times — the **$n$th-order distributions**. That is far too much information to handle in general. Fortunately, for most engineering questions — the power of a signal, its spectrum, the output of a linear filter — the first- and second-order statistics suffice, and for Gaussian processes they are a complete description.

::: definition Mean, autocorrelation and autocovariance {#def-mean-acf}
The **mean function** of $X(t)$ is $\mu_X(t) = \E[X(t)]$. The **autocorrelation function** and the **autocovariance function** are

$$
R_X(t_1, t_2) = \E\bigl[X(t_1)X(t_2)\bigr], \qquad C_X(t_1, t_2) = R_X(t_1, t_2) - \mu_X(t_1)\mu_X(t_2).
$$ {#eq-acf}

For two processes $X$ and $Y$, the **cross-correlation** is $R_{XY}(t_1, t_2) = \E[X(t_1)Y(t_2)]$. For complex-valued processes the second factor is conjugated: $R_X(t_1, t_2) = \E[X(t_1)X^*(t_2)]$.
:::

The autocorrelation at equal times, $R_X(t, t) = \E[X^2(t)]$, is the **mean power** (the mean square value) at time $t$. At different times it measures how strongly the value at $t_1$ is related to the value at $t_2$: a slowly varying process has $R_X(t_1, t_2)$ close to $R_X(t_1, t_1)$ for nearby times, while a rapidly fluctuating one "forgets" its value quickly.

::: example The random-phase sinusoid {#ex-random-phase}
An oscillator produces $X(t) = A\cos(\omega_0t + \Theta)$, where $A$ and $\omega_0$ are fixed and the phase $\Theta$ is uniformly distributed on $[0, 2\pi)$ (we do not know when the oscillator was switched on). Find the mean and autocorrelation functions.
::: solution
Each sample function is a perfectly ordinary sinusoid; only its phase is random. For the mean,

$$
\mu_X(t) = \frac{A}{2\pi}\int_0^{2\pi}\cos(\omega_0t + \theta)\,\dd\theta = 0,
$$

because a cosine integrates to zero over a full period of $\theta$. For the autocorrelation, use $\cos a\cos b = \tfrac12[\cos(a - b) + \cos(a + b)]$:

$$
R_X(t_1, t_2) = A^2\,\E\bigl[\cos(\omega_0t_1 + \Theta)\cos(\omega_0t_2 + \Theta)\bigr] = \frac{A^2}{2}\cos\omega_0(t_1 - t_2) + \frac{A^2}{2}\E\bigl[\cos(\omega_0(t_1 + t_2) + 2\Theta)\bigr].
$$

The last expectation is again zero, so $R_X(t_1, t_2) = \frac{A^2}{2}\cos\omega_0(t_1 - t_2)$. It depends only on the time difference $t_1 - t_2$, and its value at zero difference is the familiar mean power $A^2/2$.
:::
:::

::: example Random amplitude, fixed phase {#ex-random-amplitude}
Now let $X(t) = A\cos\omega_0t$, with the amplitude $A$ a random variable of mean $0$ and variance $\sigma^2$, and the phase fixed. Find $\mu_X$ and $R_X$.
::: solution
$\mu_X(t) = \E[A]\cos\omega_0t = 0$, and

$$
R_X(t_1, t_2) = \E[A^2]\cos\omega_0t_1\cos\omega_0t_2 = \frac{\sigma^2}{2}\bigl[\cos\omega_0(t_1 - t_2) + \cos\omega_0(t_1 + t_2)\bigr].
$$

The second term depends on the absolute times. In particular the mean power $R_X(t, t) = \sigma^2\cos^2\omega_0t$ is zero at the zero crossings $\omega_0t = \pi/2 + k\pi$, which every sample function shares, and maximum at the peaks. The ensemble "breathes" in time: its statistics are not invariant to a time shift.
:::
:::

## Stationarity

The resistor's noise of the opening paragraph looks the same now as it will in an hour: its statistics do not depend on when we look. This is the property of stationarity.

::: definition Strict-sense and wide-sense stationarity {#def-stationary}
A process is **strict-sense stationary** (SSS) if all its $n$th-order distributions are invariant to a shift of the time origin: $(X(t_1), \ldots, X(t_n))$ and $(X(t_1 + c), \ldots, X(t_n + c))$ have the same joint distribution for every $n$, all times and every shift $c$.

A process is **wide-sense stationary** (WSS) if its mean is constant and its autocorrelation depends only on the time difference:

$$
\E[X(t)] = \mu_X, \qquad \E\bigl[X(t + \tau)X(t)\bigr] = R_X(\tau) \quad\text{for all } t.
$$ {#eq-wss}

The variable $\tau$ is the **lag**. Two processes are **jointly WSS** if each is WSS and $R_{XY}(\tau) = \E[X(t + \tau)Y(t)]$ depends only on $\tau$.
:::

Strict-sense stationarity implies wide-sense stationarity (if the mean square is finite), since the first- and second-order distributions, which fix $\mu_X$ and $R_X$, are shift-invariant. The converse fails in general but holds for Gaussian processes, whose distributions are determined by mean and autocorrelation ([[random-signals/gaussian-noise]]). In practice "stationary" almost always means WSS. The random-phase sinusoid of [[#ex-random-phase]] is WSS with $R_X(\tau) = \frac{A^2}{2}\cos\omega_0\tau$; the random-amplitude sinusoid of [[#ex-random-amplitude]] is not.

::: warning Sign conventions for the lag
Some books define $R_X(\tau) = \E[X(t)X(t + \tau)]$, others $\E[X(t + \tau)X(t)]$. For a real WSS process they agree, since $R_X$ is even. For cross-correlations they do not: with our convention $R_{XY}(\tau) = \E[X(t + \tau)Y(t)]$, and $R_{YX}(\tau) = R_{XY}(-\tau)$. Check the convention before using a formula from another source, especially for the input–output cross-correlations of [[random-signals/random-signals-lti]].
:::

The autocorrelation of a WSS process is far from an arbitrary function. Its properties follow from its definition as an average of products.

::: theorem Properties of the autocorrelation function {#thm-acf-props}
Let $X(t)$ be a real WSS process with autocorrelation $R_X(\tau)$. Then

1. $R_X(0) = \E[X^2(t)] \ge 0$ is the mean power;
2. $R_X$ is even: $R_X(-\tau) = R_X(\tau)$;
3. $R_X$ is largest at the origin: $\abs{R_X(\tau)} \le R_X(0)$;
4. if $R_X(T) = R_X(0)$ for some $T \neq 0$, then $R_X$ is periodic with period $T$, and so (with probability 1) is every sample function;
5. $R_X$ is **positive semidefinite**: $\sum_i\sum_k a_ia_kR_X(t_i - t_k) \ge 0$ for all real $a_1, \ldots, a_n$ and times $t_1, \ldots, t_n$.

If $X$ has mean $\mu_X$, then $C_X(\tau) = R_X(\tau) - \mu_X^2$, and if $X$ contains no periodic component $C_X(\tau) \to 0$ as $\abs\tau\to\infty$, so that $R_X(\infty) = \mu_X^2$ is the DC power.
:::

::: proof
(1) is the definition with $\tau = 0$. (2): substituting $s = t + \tau$, $R_X(-\tau) = \E[X(t - \tau)X(t)] = \E[X(s)X(s + \tau)] = R_X(\tau)$ by stationarity. (3): the expectation of a square is non-negative, so

$$
0 \le \E\bigl[(X(t + \tau) \pm X(t))^2\bigr] = 2R_X(0) \pm 2R_X(\tau),
$$

which gives $-R_X(0)\le R_X(\tau)\le R_X(0)$. (4): $\E[(X(t + T) - X(t))^2] = 2R_X(0) - 2R_X(T) = 0$, so $X(t + T) = X(t)$ with probability 1 for each $t$, and then $R_X(\tau + T) = \E[X(t + \tau + T)X(t)] = R_X(\tau)$. (5): $\sum_{i,k}a_ia_kR_X(t_i - t_k) = \E\bigl[\bigl(\sum_ia_iX(t_i)\bigr)^2\bigr] \ge 0$. The final statement is the definition of $C_X$ together with the fact that values far apart in time become uncorrelated for a process without periodic parts (a modelling assumption that holds for physical noise).
:::

Property 5 looks technical, but it is the one that matters most: in [[random-signals/correlation-spectra]] it becomes the statement that a power spectral density can never be negative. A function such as a rectangular pulse in $\tau$ is even and peaks at zero but is *not* a valid autocorrelation, because its Fourier transform, a sinc, goes negative.

::: quiz
Which of these functions could be the autocorrelation $R_X(\tau)$ of a real WSS process?
- [ ] $e^{-\tau}$ for all $\tau$
- [ ] $\sin(\omega_0\tau)$
- [x] $4e^{-3\abs\tau} + 1$
- [ ] $2 - e^{-\abs{\tau}}$
::: solution
$e^{-\tau}$ and $\sin\omega_0\tau$ are not even. $2 - e^{-\abs\tau}$ equals $1$ at $\tau = 0$ and approaches $2$ for large $\abs{\tau}$, violating $\abs{R_X(\tau)}\le R_X(0)$. $4e^{-3\abs\tau} + 1$ is even, peaks at $\tau = 0$ with mean power $5$, and tends to $1 = \mu_X^2$: a process with DC value $\pm1$ plus a fluctuating part of power $4$. (Its Fourier transform is non-negative, so it is genuinely valid.)
:::
:::

## A gallery of processes

### The random telegraph signal

Many physical signals switch between two levels at random instants: a trapped charge in a MOSFET oxide that captures and releases an electron (random telegraph noise, the microscopic origin of flicker noise), a channel that is busy or idle, a relay contact. The simplest model takes the switching instants to be a Poisson process.

::: definition Poisson process {#def-poisson}
A **Poisson process** of rate $\lambda$ is a counting process $N(t)$, $t\ge0$, with $N(0) = 0$, such that the numbers of events in disjoint time intervals are independent, and the number of events in any interval of length $\tau$ is Poisson-distributed with mean $\lambda\tau$:

$$
\Prob\bigl(N(t + \tau) - N(t) = k\bigr) = e^{-\lambda\tau}\frac{(\lambda\tau)^k}{k!}, \qquad k = 0, 1, 2, \ldots
$$ {#eq-poisson}

The times between successive events are independent and exponentially distributed with mean $1/\lambda$.
:::

The Poisson process models the arrival of electrons across a junction (shot noise), photons at a detector, decays in a radioactive source and calls at a telephone exchange: any stream of events that occur independently of each other at a constant average rate.

::: example The random telegraph signal {#ex-telegraph}
$X(t)$ takes the values $\pm1$. At $t = 0$ it is $+1$ or $-1$ with probability $\tfrac12$ each, and it changes sign at the events of a Poisson process of rate $\lambda$, independent of the initial value. Show that $X$ is WSS and find $R_X(\tau)$.
::: solution
Each $X(t)$ is $\pm1$ with probability $\tfrac12$: the initial value is symmetric and flipping preserves the symmetry. So $\mu_X(t) = 0$. For $\tau \ge 0$, the product $X(t + \tau)X(t)$ is $+1$ if an even number of switches occurred in $(t, t + \tau]$ and $-1$ if an odd number did. By [[#eq-poisson]],

$$
R_X(\tau) = \sum_{k=0}^\infty(-1)^k e^{-\lambda\tau}\frac{(\lambda\tau)^k}{k!} = e^{-\lambda\tau}e^{-\lambda\tau} = e^{-2\lambda\tau}.
$$

The result depends only on $\tau$, and by symmetry $R_X(\tau) = e^{-2\lambda\abs\tau}$ for all $\tau$. The process is WSS. Its correlation decays with **correlation time** $\tau_c = 1/(2\lambda)$: values much closer than $\tau_c$ are probably equal, values much further apart are nearly uncorrelated.
:::
:::

In discrete time the analogue is a two-state **Markov chain** that stays in its state with probability $1 - p$ and switches with probability $p$ at each step. Its correlation at lag $k$ is $(1 - 2p)^k$, a geometric decay that is the sampled version of $e^{-2\lambda\abs\tau}$.

::: widget markov
matrix: 0.9, 0.1; 0.1, 0.9
states: +1; −1
start: 0
steps: 40
caption: A discrete-time telegraph signal: at each step the level switches with probability $p = 0.1$. Watch a simulated walk — runs of equal values, typically $1/p = 10$ steps long — and note that the distribution after many steps is $(\tfrac12, \tfrac12)$ whatever the starting state: the process forgets its start and settles into stationarity. Change the switching probability to $0.4$ for a rougher signal with a shorter correlation time.
:::

### The random binary waveform

A digital transmitter sends a sequence of independent, equally likely bits, each as a rectangular pulse of height $+A$ or $-A$ and duration $T$ (non-return-to-zero signalling). An observer who does not know the bit clock sees

$$
X(t) = \sum_{k=-\infty}^{\infty}A_k\,p(t - kT - D),
$$

where $p(t) = 1$ for $0 \le t < T$ and $0$ otherwise, the $A_k = \pm A$ are independent and equally likely, and the timing offset $D$ is uniform on $[0, T)$ and independent of the bits.

::: example Autocorrelation of the random binary waveform {#ex-binary-wave}
Find $R_X(\tau)$ for the random binary waveform.
::: solution
The mean is zero because each $A_k$ has zero mean. Fix $t$ and $\tau$ with $0\le\tau < T$. The values $X(t)$ and $X(t + \tau)$ either lie in the same bit interval, in which case their product is $A_k^2 = A^2$, or in adjacent intervals, in which case the product $A_kA_{k+1}$ has zero mean because the bits are independent. They lie in different intervals exactly when a bit boundary falls in $(t, t + \tau]$. The boundaries are at $kT + D$ with $D$ uniform, so this happens with probability $\tau/T$. Hence

$$
R_X(\tau) = A^2\Bigl(1 - \frac{\abs\tau}{T}\Bigr)\ \text{ for } \abs\tau < T, \qquad R_X(\tau) = 0 \ \text{ for } \abs\tau \ge T,
$$ {#eq-binary-acf}

using evenness for negative $\tau$; for $\abs\tau\ge T$ the two values always lie in different bits. The triangle has height $A^2$, the power of the waveform, and width $\pm T$: bits are uncorrelated beyond one bit period.
:::
:::

Without the random offset $D$ the process would not be stationary: with a known clock, $X(t)$ and $X(t + \tau)$ for small $\tau$ would be certainly equal except near the known bit boundaries, and $R_X(t + \tau, t)$ would depend on where $t$ sits within the bit. Randomising the time origin is a standard way of turning such **cyclostationary** signals into WSS models. Its spectrum is computed in [[random-signals/correlation-spectra]].

::: widget plot
f: exp(-2*l*abs(x)); if(abs(x) < T, 1 - abs(x)/T, 0); cos(2*pi*x)
x: -3, 3
y: -1.1, 1.1
sliders: l=1:0.1:5:0.1; T=1:0.2:3:0.1
labels: \text{telegraph, } e^{-2\lambda|\tau|}; \text{binary waveform}; \text{random-phase sinusoid}
caption: Normalised autocorrelations $R_X(\tau)/R_X(0)$ against the lag $\tau$ in seconds: the random telegraph signal with switching rate $\lambda$ (slider $l$), the random binary waveform with bit period $T$, and a random-phase sinusoid of frequency $1\,\mathrm{Hz}$. All three peak at $\tau = 0$ and are even. The first two decay, so distant values become uncorrelated; the sinusoid's correlation never decays because its future is fixed by its past. Raise $\lambda$ and the telegraph signal decorrelates faster.
:::

### White noise in discrete time

::: definition Discrete-time white noise {#def-white-dt}
A discrete-time process $W[n]$ is **white noise** with variance $\sigma^2$ if its samples have zero mean and are uncorrelated:

$$
\E\bigl[W[n]\bigr] = 0, \qquad R_W[k] = \E\bigl[W[n + k]W[n]\bigr] = \sigma^2\,\delta[k].
$$ {#eq-white-dt}

If in addition the samples are independent and identically distributed, it is **i.i.d. noise**; if they are Gaussian, it is **white Gaussian noise**.
:::

White noise is the building block from which more interesting processes are made by filtering. The simplest example is a moving average of two samples, $Y[n] = W[n] + W[n - 1]$. Its autocorrelation is

$$
R_Y[k] = \E\bigl[(W[n + k] + W[n + k - 1])(W[n] + W[n - 1])\bigr] = 2\sigma^2\delta[k] + \sigma^2\delta[k - 1] + \sigma^2\delta[k + 1],
$$

since only the products of equal-index samples survive. Filtering has introduced correlation between neighbouring samples. The continuous-time version of white noise is more delicate — its autocorrelation is an impulse $\delta(\tau)$ and its power is infinite — and is treated in [[random-signals/gaussian-noise]].

### A non-stationary process: the random walk

Accumulate white noise: $S[n] = W[1] + W[2] + \cdots + W[n]$ for $n\ge1$, with $S[0] = 0$. This **random walk** models the phase of a free-running oscillator (phase noise), the position of a diffusing particle, and the drift of an integrating gyroscope. Its mean is zero, but by [[random-signals/probability-for-engineers#thm-sum]] its variance grows linearly, $\Var(S[n]) = n\sigma^2$, and for $m\le n$,

$$
R_S[n, m] = \E\Bigl[\sum_{i=1}^n W[i]\sum_{k=1}^m W[k]\Bigr] = \sigma^2 \min(n, m).
$$

It depends on the absolute times, not only on $n - m$: the random walk is not stationary, and its typical excursion $\sigma\sqrt n$ grows without bound. The continuous-time limit is the **Wiener process** (Brownian motion), the integral of white noise.

## Time averages and ergodicity

In the laboratory we cannot average over an ensemble of resistors; we have one resistor and one long recording. Its **time average** over a record of length $T$ is

$$
\langle x\rangle_T = \frac1T\int_0^T x(t)\,\dd t,
$$

and similarly for time-averaged products $\langle x(t + \tau)x(t)\rangle_T$. These are computed from one sample function and are themselves random variables — another resistor, or another stretch of time, would give slightly different values. A process is **ergodic** if its time averages converge to the corresponding ensemble averages as $T\to\infty$. Ergodicity is what justifies estimating $\mu_X$ with a voltmeter and $R_X(\tau)$ with a correlator.

::: theorem Mean-square ergodic theorem for the mean {#thm-ergodic}
Let $X(t)$ be WSS with mean $\mu_X$ and autocovariance $C_X(\tau)$. The time average $\langle X\rangle_T$ has mean $\mu_X$ and variance

$$
\Var\bigl(\langle X\rangle_T\bigr) = \frac{1}{T}\int_{-T}^{T}\Bigl(1 - \frac{\abs\tau}{T}\Bigr)C_X(\tau)\,\dd\tau .
$$ {#eq-ergodic-var}

Consequently $\langle X\rangle_T \to \mu_X$ in mean square as $T\to\infty$ if and only if this variance tends to zero, which is the case in particular if $\int_{-\infty}^\infty\abs{C_X(\tau)}\,\dd\tau < \infty$. The process is then **mean-ergodic**.
:::

::: proof
Exchanging expectation and integral, $\E\langle X\rangle_T = \frac1T\int_0^T\mu_X\,\dd t = \mu_X$. For the variance,

$$
\Var\bigl(\langle X\rangle_T\bigr) = \E\Bigl[\Bigl(\frac1T\int_0^T(X(t) - \mu_X)\,\dd t\Bigr)^2\Bigr] = \frac{1}{T^2}\int_0^T\!\!\int_0^T C_X(t - s)\,\dd t\,\dd s .
$$

The integrand depends only on $\tau = t - s$. In the square $[0, T]^2$ the line $t - s = \tau$ has length proportional to $T - \abs\tau$, so the double integral equals $\int_{-T}^T(T - \abs\tau)C_X(\tau)\,\dd\tau$, which gives [[#eq-ergodic-var]]. If $\int\abs{C_X} = K<\infty$, the variance is at most $K/T \to 0$.
:::

The theorem has a simple reading. If the process decorrelates in a time of order $\tau_c$, a record of length $T$ contains about $T/\tau_c$ effectively independent samples, and the variance of their average falls as $\tau_c/T$. More precisely, for large $T$,

$$
\Var\bigl(\langle X\rangle_T\bigr) \approx \frac{1}{T}\int_{-\infty}^\infty C_X(\tau)\,\dd\tau .
$$ {#eq-ergodic-approx}

The discrete-time version is equally useful. The sample mean $\hat\mu = \frac1N\sum_{n=0}^{N-1}X[n]$ of a WSS sequence has variance $\frac1N\sum_{k=-(N-1)}^{N-1}\bigl(1 - \frac{\abs k}{N}\bigr)C_X[k]$; for white noise this is $\sigma^2/N$, the familiar $1/\sqrt N$ law for averaging independent readings.

::: example A process that is stationary but not ergodic {#ex-not-ergodic}
A batch of voltage references is manufactured, each with a constant output $X(t) = V$, where $V$ varies from unit to unit with mean $2.5\,\mathrm{V}$ and standard deviation $5\,\mathrm{mV}$. Is the process WSS? Is it mean-ergodic?
::: solution
$\E[X(t)] = 2.5\,\mathrm{V}$ for all $t$, and $R_X(t_1, t_2) = \E[V^2]$, independent of both times, so $X$ is WSS (indeed SSS). But every sample function is constant, so the time average of any one unit is its own $V$, however long we average: $\langle X\rangle_T = V$, with variance $(5\,\mathrm{mV})^2$ that does not decrease with $T$. In the theorem, $C_X(\tau) = \sigma_V^2$ for all $\tau$, and [[#eq-ergodic-var]] gives exactly $\sigma_V^2$. The process is not ergodic. Measuring one reference for a year tells us its own value precisely, but nothing about the spread of the batch.
:::
:::

::: quiz
You sample a WSS noise at $1\,\mathrm{MHz}$ for $10\,\mathrm{ms}$ and average the $10\,000$ samples to estimate its mean. The noise has a correlation time of about $1\,\mathrm{ms}$. Roughly how much does averaging reduce the standard deviation compared with a single sample?
- [ ] By $\sqrt{10\,000} = 100$
- [x] Only by a factor of order $\sqrt{T/\tau_c}\approx3$, because the record spans only about ten correlation times
- [ ] Not at all, because the samples are correlated
- [ ] By $10\,000$
::: solution
Samples closer together than the correlation time carry nearly the same information. A $10\,\mathrm{ms}$ record contains of order $T/\tau_c = 10$ effectively independent values (the exact number depends on the shape of $C_X$), so by [[#eq-ergodic-approx]] the standard deviation falls by a factor of order $\sqrt{10}$ (for the exponential covariance of [[#ex-averaging-time]], $\sqrt{T/2\tau_c} = 2.2$). Sampling faster would not change this; recording for longer would.
:::
:::

::: example How long to average? {#ex-averaging-time}
A sensor's output has a DC value to be measured, plus a WSS noise with RMS value $\sigma = 1\,\mathrm{mV}$ and autocovariance $C(\tau) = \sigma^2 e^{-\abs\tau/\tau_c}$ with $\tau_c = 1\,\mathrm{ms}$. How long must we average to make the standard deviation of the estimate $10\,\mu\mathrm{V}$?
::: solution
By [[#eq-ergodic-approx]], with $\int_{-\infty}^\infty\sigma^2e^{-\abs\tau/\tau_c}\,\dd\tau = 2\sigma^2\tau_c$,

$$
\Var\bigl(\langle X\rangle_T\bigr) \approx \frac{2\sigma^2\tau_c}{T} \quad\Longrightarrow\quad T = \frac{2\sigma^2\tau_c}{(10\,\mu\mathrm{V})^2} = \frac{2\times10^{-6}\times10^{-3}}{10^{-10}}\,\mathrm{s} = 20\,\mathrm{s}.
$$

Evaluating the exact formula [[#eq-ergodic-var]] for this covariance gives $\frac{2\sigma^2\tau_c}{T}\bigl[1 - \frac{\tau_c}{T}(1 - e^{-T/\tau_c})\bigr]$; at $T = 20\,\mathrm{s}$ the correction is $5\times10^{-5}$ and the standard deviation is $9.99975\,\mu\mathrm{V}$. The record contains about $T/(2\tau_c) = 10\,000$ effectively independent samples, and $1\,\mathrm{mV}/\sqrt{10\,000} = 10\,\mu\mathrm{V}$, as expected. Note that taking more samples per second would not help once the samples are closer than $\tau_c$: correlated samples are not independent evidence.
:::
:::

::: example Measuring an autocorrelation from one record {#ex-measure-acf}
Simulate one long sample function of the random telegraph signal with $\lambda = 1\,\mathrm{s^{-1}}$ and estimate $R_X(\tau)$ by time averaging. Compare with [[#ex-telegraph]].
::: solution
We sample at $\Delta t = 10\,\mathrm{ms}$: in each step the level flips if an odd number of Poisson events falls in the step, which has probability $\tfrac12(1 - e^{-2\lambda\Delta t})$. A Python script (`random.seed(3)`, $10^6$ steps, a record of $10^4\,\mathrm{s}$) estimates $\hat R(\tau) = \frac{1}{N - k}\sum_n x[n + k]x[n]$ with $k = \tau/\Delta t$, and printed

| $\tau$ (s) | $0.25$ | $0.5$ | $1$ | $2$ |
|---|---|---|---|---|
| estimate $\hat R(\tau)$ | $0.607$ | $0.368$ | $0.132$ | $0.011$ |
| theory $e^{-2\tau}$ | $0.607$ | $0.368$ | $0.135$ | $0.018$ |

The time-averaged mean was $0.0025$ (theory $0$). The agreement is excellent at small lags. At $\tau = 2\,\mathrm{s}$ the error, about $0.007$, is consistent with the statistical fluctuation of an average over roughly $10^4$ correlation times ($\sim 1/\sqrt{10^4} = 0.01$): estimates of small correlations at long lags are always relatively noisy. The process is ergodic, and one record suffices.
:::
:::

::: widget lln
experiment: bernoulli
p: 0.5
trials: 2000
runs: 5
caption: Running time averages of five independent records of an i.i.d. binary process. Each record's average converges to the ensemble mean $0.5$, with an error shrinking like $1/\sqrt n$ — the discrete form of [[#thm-ergodic]]. For a correlated process the convergence would be slower, by the number of samples per correlation time.
:::

::: remark Ergodicity in practice
Ergodicity cannot be tested from a single record — it is a statement about the relation between the record and an ensemble we never see. In practice we assume it when the physical mechanism is stationary and "forgets" its initial conditions (thermal noise, shot noise, a scrambled data stream), and we distrust it when there is a hidden random constant (an unknown offset, a fixed manufacturing parameter, a channel that does not change during the measurement). The mean-square theorem above concerns only the mean; ergodicity of the autocorrelation needs a similar condition on fourth-order moments, which holds for Gaussian processes whose covariance decays.
:::

::: application Spectrum analysers and averaging
A swept or FFT spectrum analyser estimates the power of a noise signal in each frequency bin by time averaging; its "video bandwidth" or "number of averages" setting is exactly the $T$ of [[#thm-ergodic]]. A single FFT of white noise shows a ragged spectrum with fluctuations as large as the mean (each bin is a squared Gaussian magnitude, compare [[random-signals/probability-for-engineers]]); averaging $100$ spectra reduces the fluctuation to $10\,\%$. The same trade-off — measurement time against statistical accuracy — governs the noise-power measurements behind noise figures and the bit-error-rate tests of communication links.
:::

::: history
Albert Einstein's 1905 analysis of Brownian motion and Marian Smoluchowski's work of 1906 treated a physical random process quantitatively for the first time, predicting that a particle's mean-square displacement grows linearly in time. Norbert Wiener gave the mathematical construction of Brownian motion in 1923. Agner Krarup Erlang applied the Poisson process to telephone traffic from 1909. Aleksandr Khinchin's 1934 paper on the correlation theory of stationary processes introduced what we now call wide-sense stationarity, and George David Birkhoff (1931) and John von Neumann (1932) proved the ergodic theorems that relate time and ensemble averages.
:::

## Where this leads

The autocorrelation of a WSS process is the bridge to frequency: its Fourier transform is the **power spectral density**, the subject of [[random-signals/correlation-spectra]]. [[random-signals/random-signals-lti]] then follows the mean and autocorrelation through a linear filter, and [[random-signals/gaussian-noise]] specialises to Gaussian processes, where second-order statistics tell the whole story. Markov chains like the discrete telegraph signal reappear as state models in [[random-signals/estimation-kalman]], and the averaging-time trade-off of [[#thm-ergodic]] underlies the spectral estimation of [[dsp/spectral-analysis]].

::: summary
- A random process is an ensemble of waveforms: at a fixed time it is a random variable, and each outcome gives a deterministic sample function.
- Mean $\mu_X(t)$ and autocorrelation $R_X(t_1, t_2) = \E[X(t_1)X(t_2)]$ are the second-order description; $R_X(t, t)$ is the mean power.
- WSS: constant mean and $R_X$ depending only on the lag $\tau$. Then $R_X$ is even, maximal at $0$ ($R_X(0)$ is the power), positive semidefinite, and tends to $\mu_X^2$ at large lags.
- Key examples: random-phase sinusoid $\frac{A^2}{2}\cos\omega_0\tau$; random telegraph $e^{-2\lambda\abs\tau}$; random binary waveform, a triangle of width $\pm T$; white noise $\sigma^2\delta[k]$. A random walk is not stationary.
- The Poisson process counts independent events at rate $\lambda$; counts are Poisson, gaps exponential.
- Ergodicity lets time averages from one record replace ensemble averages; the variance of a time average is about $\frac1T\int C_X(\tau)\,\dd\tau$, so accuracy improves with the number of correlation times averaged.
:::

## Exercises

::: exercise Reading an autocorrelation {level=1 check="34"}
A WSS process has $R_X(\tau) = 25e^{-\abs{\tau}/2} + 9$ (in $\mathrm{V^2}$). Find its mean power in $\mathrm{V^2}$ (across $1\,\Omega$), the magnitude of its mean, and its variance.
::: solution
Mean power $R_X(0) = 25 + 9 = 34\,\mathrm{V^2}$. As $\tau\to\infty$, $R_X \to 9 = \mu_X^2$, so $\abs{\mu_X} = 3\,\mathrm{V}$ (the sign cannot be found from $R_X$). Variance $C_X(0) = 34 - 9 = 25\,\mathrm{V^2}$, standard deviation $5\,\mathrm{V}$.
:::
:::

::: exercise Telegraph correlation {level=1 check="exp(-1)"}
A random telegraph signal switches at an average rate of $500$ times per second. What is the correlation coefficient between its values $1\,\mathrm{ms}$ apart?
::: solution
$\rho = R_X(\tau)/R_X(0) = e^{-2\lambda\tau} = e^{-2\times500\times10^{-3}} = e^{-1} = 0.368$.
:::
:::

::: exercise A sinusoid with restricted phase {level=1}
Let $X(t) = \cos(\omega_0t + \Theta)$ with $\Theta$ uniform on $[0, \pi]$ instead of $[0, 2\pi)$. Find $\mu_X(t)$. Is the process WSS?
::: solution
$\mu_X(t) = \frac1\pi\int_0^\pi\cos(\omega_0t + \theta)\,\dd\theta = \frac1\pi\bigl[\sin(\omega_0t + \pi) - \sin\omega_0t\bigr] = -\frac{2}{\pi}\sin\omega_0t$. The mean depends on $t$, so the process is not WSS. The uniform phase over a whole period is what makes [[#ex-random-phase]] stationary.
:::
:::

::: exercise Sum of independent processes {level=2}
$X(t)$ is a random-phase sinusoid of amplitude $2\,\mathrm{V}$ and frequency $1\,\mathrm{kHz}$, and $N(t)$ is an independent zero-mean WSS noise with $R_N(\tau) = 0.5e^{-10^4\abs\tau}\,\mathrm{V^2}$. Find the autocorrelation of $Y(t) = X(t) + N(t)$ and its value at $\tau = 0$ and at $\tau = 1\,\mathrm{ms}$. How could you use $R_Y$ to detect a sinusoid buried in noise?
::: solution
$R_Y(\tau) = \E[(X(t + \tau) + N(t + \tau))(X(t) + N(t))] = R_X(\tau) + R_N(\tau)$, since the cross terms are $\E[X]\E[N] = 0$. So $R_Y(\tau) = 2\cos(2\pi\cdot1000\,\tau) + 0.5e^{-10^4\abs\tau}$. At $\tau = 0$: $2.5\,\mathrm{V^2}$. At $\tau = 1\,\mathrm{ms}$: $2\cos2\pi + 0.5e^{-10} = 2.00002\,\mathrm{V^2}$. The noise's correlation dies within a fraction of a millisecond, but the sinusoid's persists forever, so at large lags $R_Y$ shows only the periodic component. This is how a correlator detects a weak periodic signal, even one weaker than the noise.
:::
:::

::: exercise A moving-average process {level=2}
$W[n]$ is white noise of variance $\sigma^2$. Find the mean, the autocorrelation $R_Y[k]$ and the correlation coefficient between neighbouring samples of $Y[n] = \tfrac12(W[n] + W[n - 1])$. Is $Y$ WSS?
::: solution
$\E[Y[n]] = 0$. Following the calculation in the text with the factor $\tfrac14$: $R_Y[0] = \tfrac12\sigma^2$, $R_Y[\pm1] = \tfrac14\sigma^2$, and $R_Y[k] = 0$ for $\abs k\ge2$. The neighbour correlation coefficient is $\tfrac14/\tfrac12 = 0.5$. $Y$ is WSS, since its mean is constant and $R_Y$ depends only on $k$. Averaging halves the variance but makes neighbouring samples correlated.
:::
:::

::: exercise Poisson arrivals {level=2 check="exp(-2)"}
Photoelectrons are emitted as a Poisson process at an average rate of $1000$ per second. (a) What is the probability that none is emitted in a $2\,\mathrm{ms}$ window? (b) Find the mean and variance of the count in that window. (c) Show that the counting process $N(t)$ has $R_N(t_1, t_2) = \lambda\min(t_1, t_2) + \lambda^2t_1t_2$, and conclude that it is not stationary.
::: hint
For $t_1\le t_2$ write $N(t_2) = N(t_1) + [N(t_2) - N(t_1)]$ and use independence of the increments.
:::
::: solution
(a) $\lambda\tau = 2$, so $\Prob(0) = e^{-2} = 0.135$. (b) Mean and variance are both $\lambda\tau = 2$. (c) For $t_1\le t_2$, $\E[N(t_1)N(t_2)] = \E[N(t_1)^2] + \E[N(t_1)]\E[N(t_2) - N(t_1)] = (\lambda t_1 + \lambda^2t_1^2) + \lambda t_1\cdot\lambda(t_2 - t_1) = \lambda t_1 + \lambda^2t_1t_2$. The mean $\lambda t$ grows with time, and $R_N$ depends on $t_1$ and $t_2$ separately, so $N$ is not stationary. (Its increments over intervals of fixed length are, which is why the *current* $\dd N/\dd t$ in shot noise is.)
:::
:::

::: exercise Variance of a time average {level=3}
For the autocovariance $C(\tau) = \sigma^2 e^{-\abs\tau/\tau_c}$, evaluate [[#eq-ergodic-var]] exactly and show that

$$
\Var\bigl(\langle X\rangle_T\bigr) = \frac{2\sigma^2\tau_c}{T}\Bigl[1 - \frac{\tau_c}{T}\bigl(1 - e^{-T/\tau_c}\bigr)\Bigr].
$$

Check the limits $T\ll\tau_c$ and $T\gg\tau_c$ and interpret them.
::: solution
By evenness, $\Var = \frac{2\sigma^2}{T}\int_0^T\bigl(1 - \frac\tau T\bigr)e^{-\tau/\tau_c}\,\dd\tau$. Now $\int_0^Te^{-\tau/\tau_c}\dd\tau = \tau_c(1 - e^{-T/\tau_c})$ and $\int_0^T\tau e^{-\tau/\tau_c}\dd\tau = \tau_c^2\bigl[1 - e^{-T/\tau_c}(1 + T/\tau_c)\bigr]$. Combining,

$$
\Var = \frac{2\sigma^2}{T}\Bigl[\tau_c(1 - e^{-T/\tau_c}) - \frac{\tau_c^2}{T}\bigl(1 - e^{-T/\tau_c}\bigr) + \tau_c e^{-T/\tau_c}\Bigr] = \frac{2\sigma^2\tau_c}{T}\Bigl[1 - \frac{\tau_c}{T}\bigl(1 - e^{-T/\tau_c}\bigr)\Bigr].
$$

For $T\gg\tau_c$ the bracket tends to $1$ and $\Var\approx 2\sigma^2\tau_c/T$, as in [[#ex-averaging-time]]. For $T\ll\tau_c$, expand $1 - e^{-u} = u - u^2/2 + u^3/6$ with $u = T/\tau_c$: the bracket is $u/2 - u^2/6$, so $\Var\approx\sigma^2(1 - T/(3\tau_c)) \to \sigma^2$. A very short average is just one sample, with the full variance $\sigma^2$; averaging only helps once the record spans many correlation times.
:::
:::

::: exercise The random walk and phase noise {level=3}
The phase of a free-running oscillator is modelled as a random walk: every $1\,\mu\mathrm{s}$ it receives an independent Gaussian increment of RMS value $10^{-4}\,\mathrm{rad}$. (a) What is the RMS phase error after $1\,\mathrm{s}$? (b) Find $R_S[n, m]$ and show the process is not WSS. (c) Show that the *phase difference over a fixed interval*, $S[n + k] - S[n]$, is stationary, and find its variance.
::: solution
(a) After $n = 10^6$ steps the variance is $n\sigma^2 = 10^6\times10^{-8} = 10^{-2}\,\mathrm{rad^2}$, so the RMS phase error is $0.1\,\mathrm{rad}$. (b) As derived in the text, $R_S[n, m] = \sigma^2\min(n, m)$, which depends on $n$ and $m$ separately (for example $R_S[n, n] = n\sigma^2$ grows), so $S$ is not WSS. (c) $S[n + k] - S[n] = \sum_{i=n+1}^{n+k}W[i]$ is a sum of $k$ independent increments whatever $n$ is; its distribution, Gaussian with variance $k\sigma^2$, does not depend on $n$. This is why oscillator phase noise is characterised by the statistics of phase *differences* over a fixed time (jitter over an interval), not by the absolute phase.
:::
:::

::: exercise Stationarity of a modulated process {level=3}
A WSS process $X(t)$ with mean zero and autocorrelation $R_X(\tau)$ modulates a carrier: $Y(t) = X(t)\cos(\omega_ct + \Theta)$, with $\Theta$ uniform on $[0, 2\pi)$ and independent of $X$. Show that $Y$ is WSS with $R_Y(\tau) = \tfrac12R_X(\tau)\cos\omega_c\tau$. What goes wrong if the phase $\Theta$ is fixed?
::: solution
By independence, $\E[Y(t)] = \E[X(t)]\E[\cos(\omega_ct + \Theta)] = 0$ and

$$
\E[Y(t + \tau)Y(t)] = R_X(\tau)\,\E\bigl[\cos(\omega_c(t + \tau) + \Theta)\cos(\omega_ct + \Theta)\bigr] = R_X(\tau)\cdot\tfrac12\cos\omega_c\tau,
$$

using [[#ex-random-phase]] with $A = 1$. This depends only on $\tau$, so $Y$ is WSS. With a fixed phase, the expectation becomes $\tfrac12[\cos\omega_c\tau + \cos(\omega_c(2t + \tau) + 2\Theta)]$, which depends on $t$: the modulated signal is cyclostationary, its power varying periodically at $2\omega_c$. The random phase is the stationary model of a receiver that does not know the carrier phase.
:::
:::
