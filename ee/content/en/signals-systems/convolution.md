Clap your hands once in a cathedral and listen: the sound you hear is not the clap but the building's answer to it, a burst of early reflections followed by a reverberant tail lasting several seconds. Acousticians record that answer, the **impulse response** of the hall, and from it alone they can predict how any piece of music played on that spot will sound in any seat. Recording studios do exactly this to give a dry voice the acoustics of a famous concert hall. The mathematical operation that combines the music with the impulse response is **convolution**, and the reason one recording is enough is that the hall, to an excellent approximation, is a linear time-invariant system.

This lesson proves that claim in general. Using the decomposition of a signal into impulses from [[signals-systems/signals]] and the two properties of [[signals-systems/systems]], we show that every LTI system is completely characterised by its impulse response and that its output is the convolution of input and impulse response, a sum in discrete time and an integral in continuous time. We learn to evaluate convolutions by the flip-and-slide method, derive the algebraic properties of convolution, translate causality and stability into conditions on the impulse response, and connect convolution to the differential and difference equations by which most systems are actually specified.

## Discrete time: the convolution sum {#sec-sum}

::: definition Impulse response {#def-impulse-response}
The **impulse response** of a DT system is its output $h[n]$ when the input is the unit impulse $\delta[n]$ and the system is initially at rest. For a CT system, $h(t)$ is the response to $\delta(t)$.
:::

Start with any input $x[n]$ and write it, as in [[signals-systems/signals]], as a sum of shifted, scaled impulses:

$$
x[n] = \sum_{k=-\infty}^{\infty} x[k]\,\delta[n - k].
$$

Each term is an impulse located at $n = k$ with weight $x[k]$. Now apply the system. By time invariance, the input $\delta[n - k]$ produces $h[n - k]$. By homogeneity, $x[k]\,\delta[n - k]$ produces $x[k]\,h[n - k]$ (the weight $x[k]$ is a constant, a number, as far as the system is concerned). By additivity, the sum of the inputs produces the sum of the outputs. This proves the central result of the course.

::: theorem The convolution sum {#thm-conv-sum}
The output of a DT LTI system with impulse response $h[n]$ to the input $x[n]$ is

$$
y[n] = \sum_{k=-\infty}^{\infty} x[k]\,h[n - k] \;=\; (x * h)[n].
$$ {#eq-conv-sum}

The operation $*$ is called **convolution**. An LTI system is therefore completely determined by its impulse response.
:::

::: proof
The argument above, written out: $y = T\{\sum_k x[k]\delta[\cdot - k]\} = \sum_k x[k]\,T\{\delta[\cdot - k]\} = \sum_k x[k]\,h[\cdot - k]$, using linearity for the second equality and time invariance for the third. (For infinite sums we also need the system to be continuous in a suitable sense, which holds for every system of practical interest.)
:::

There are two ways to read [[#eq-conv-sum]]. **Input side:** the output is a superposition of copies of the impulse response, one launched at each instant $k$ and scaled by the input sample there. That is how the hall turns each instant of music into a reverberating copy. **Output side:** for a fixed $n$, the output sample $y[n]$ is a weighted sum of input samples, with weight $h[n - k]$ on $x[k]$. Substituting $m = n - k$ gives the equivalent form $y[n] = \sum_m h[m]\,x[n - m]$: $h[m]$ is the weight given to the input $m$ samples in the past.

### Flip and slide

To compute $y[n]$ for a particular $n$ from [[#eq-conv-sum]]:

1. Plot $x[k]$ and $h[k]$ against the dummy variable $k$.
2. **Flip** $h$ to get $h[-k]$, then **slide** it by $n$ to get $h[n - k]$; for $n > 0$ this moves the flipped sequence to the right.
3. Multiply $x[k]$ and $h[n - k]$ sample by sample and sum over $k$.
4. Repeat for every $n$, noting the ranges of $n$ for which the overlap changes form.

::: example Convolving two short sequences {#ex-finite}
Let $x[n] = \{\underline{1}, 2, 3\}$ and $h[n] = \{\underline{2}, 1, -1\}$, where the underline marks $n = 0$ (both are zero outside $0 \le n \le 2$). Find $y = x * h$.
::: solution
Using $y[n] = \sum_k x[k]h[n - k]$ with $k$ running over $0, 1, 2$:

- $y[0] = x[0]h[0] = 1\cdot2 = 2$.
- $y[1] = x[0]h[1] + x[1]h[0] = 1\cdot1 + 2\cdot2 = 5$.
- $y[2] = x[0]h[2] + x[1]h[1] + x[2]h[0] = -1 + 2 + 6 = 7$.
- $y[3] = x[1]h[2] + x[2]h[1] = -2 + 3 = 1$.
- $y[4] = x[2]h[2] = -3$.

So $y[n] = \{\underline{2}, 5, 7, 1, -3\}$. Two checks catch most mistakes. The **length** is $3 + 3 - 1 = 5$. The **sum** of $y$ equals the product of the sums: $\sum y = 12$ and $(\sum x)(\sum h) = 6\cdot2 = 12$. (This works because $\sum_n y[n] = \sum_k x[k]\sum_n h[n - k]$.) The computation is the same as multiplying the polynomials $1 + 2z + 3z^2$ and $2 + z - z^2$, a fact that becomes the $z$-transform.
:::
:::

::: example Step response of a first-order recursive system {#ex-step-dt}
A DT LTI system has impulse response $h[n] = a^n u[n]$ with $\lvert a\rvert < 1$ (the feedback loop $y[n] = x[n] + a\,y[n-1]$ of [[signals-systems/systems]]). Find its response to the unit step $x[n] = u[n]$.
::: solution
$y[n] = \sum_k u[k]\,a^{n-k}u[n - k]$. The factor $u[k]$ is zero for $k < 0$ and $u[n - k]$ is zero for $k > n$. If $n < 0$ the two conditions cannot both hold and $y[n] = 0$. If $n \ge 0$ the sum runs over $0 \le k \le n$:

$$
y[n] = \sum_{k=0}^{n}a^{n-k} = \sum_{m=0}^{n}a^m = \frac{1 - a^{n+1}}{1 - a},\qquad n \ge 0.
$$

As $n \to \infty$ the response tends to $1/(1 - a)$. For $a = 0.8$, $y[5] = (1 - 0.8^6)/0.2 \approx 3.69$ and the final value is $5$. The flipped-and-slid picture: $h[n - k]$ is a decaying exponential reversed so that its largest sample sits at $k = n$; it overlaps the step on $0 \le k \le n$, an overlap that grows with $n$.
:::
:::

## Continuous time: the convolution integral {#sec-integral}

The CT argument is the same with integrals in place of sums. Approximate $x(t)$ by a staircase of narrow pulses of width $\Delta$: the pulse at $t = k\Delta$ has height $x(k\Delta)$, so it equals $x(k\Delta)\,\delta_\Delta(t - k\Delta)\,\Delta$ with $\delta_\Delta$ the unit-area pulse of [[signals-systems/signals]]. If $h_\Delta(t)$ is the response to $\delta_\Delta(t)$, linearity and time invariance give the response to the staircase as $\sum_k x(k\Delta)\,h_\Delta(t - k\Delta)\,\Delta$. As $\Delta \to 0$ the staircase tends to $x$, $h_\Delta$ tends to the impulse response $h$, and the sum becomes an integral.

::: theorem The convolution integral {#thm-conv-int}
The output of a CT LTI system with impulse response $h(t)$ to the input $x(t)$ is

$$
y(t) = \int_{-\infty}^{\infty} x(\tau)\,h(t - \tau)\,\dd\tau \;=\; \int_{-\infty}^{\infty} h(\tau)\,x(t - \tau)\,\dd\tau \;=\; (x * h)(t).
$$ {#eq-conv-int}
:::

::: proof {collapsed}
The limiting argument above is the engineer's proof. A cleaner one uses the sifting property directly: $x(t) = \int x(\tau)\delta(t - \tau)\,\dd\tau$ is a superposition of impulses $\delta(t - \tau)$ with weights $x(\tau)$. Time invariance maps each $\delta(t - \tau)$ to $h(t - \tau)$, and linearity, extended from sums to integrals, maps the superposition to $\int x(\tau)h(t - \tau)\,\dd\tau$. The second form follows from the substitution $\sigma = t - \tau$.
:::

In the integral, $\tau$ is the dummy variable and $t$ is a fixed parameter. Graphically: plot $x(\tau)$; flip $h(\tau)$ to $h(-\tau)$ and slide it to $h(t - \tau)$, which places the "front" of a causal $h$ at $\tau = t$; multiply and integrate the product over $\tau$. The value of the integral is the output at that one time $t$; move $t$ and repeat.

::: warning Limits come from the overlap, not from the formula
The most frequent error in evaluating a convolution integral is to integrate over the wrong interval. For causal signals the integrand is non-zero only where *both* factors are non-zero. Write down each factor's support as an inequality in $\tau$ (for $x(\tau)u(\tau)$: $\tau > 0$; for $h(t - \tau)$ with $h$ causal: $\tau < t$), intersect them, and expect the answer to have different formulas on different ranges of $t$. Sketch the flipped signal for each range before writing an integral.
:::

::: example A rectangular pulse into an RC circuit {#ex-rc-pulse}
An RC low-pass filter has impulse response $h(t) = \frac{1}{\tau_c}e^{-t/\tau_c}u(t)$ with time constant $\tau_c = RC$. Find its response to the rectangular pulse $x(t) = u(t) - u(t - T)$ of duration $T$.
::: solution
Use $y(t) = \int x(\tau)h(t - \tau)\,\dd\tau$. The factor $x(\tau)$ is $1$ for $0 < \tau < T$; the factor $h(t - \tau)$ is non-zero for $\tau < t$. Three ranges of $t$:

**$t < 0$.** The flipped impulse response lies entirely to the left of the pulse: no overlap, $y(t) = 0$.

**$0 < t < T$.** Overlap on $0 < \tau < t$:

$$
y(t) = \int_0^t \frac{1}{\tau_c}e^{-(t - \tau)/\tau_c}\,\dd\tau = e^{-t/\tau_c}\big[e^{\tau/\tau_c}\big]_0^t = 1 - e^{-t/\tau_c}.
$$

**$t > T$.** Overlap on $0 < \tau < T$:

$$
y(t) = \int_0^T \frac{1}{\tau_c}e^{-(t - \tau)/\tau_c}\,\dd\tau = e^{-t/\tau_c}\big(e^{T/\tau_c} - 1\big) = \big(1 - e^{-T/\tau_c}\big)e^{-(t - T)/\tau_c}.
$$

The output is the familiar charge-and-discharge curve of [[circuits-1]]: the capacitor charges towards $1$ while the pulse is on, reaching $1 - e^{-T/\tau_c}$ at $t = T$, and then discharges with the same time constant. The two formulas agree at $t = T$, so $y$ is continuous, as a capacitor voltage must be. For $T = 1\,\mathrm{ms}$ and $\tau_c = 0.5\,\mathrm{ms}$ the peak is $1 - e^{-2} \approx 0.865$, and at $t = 2\,\mathrm{ms}$ the output has decayed to $0.865\,e^{-2} \approx 0.117$.
:::
:::

::: widget plot
f: if(x < 0, 0, if(x < 1, 1 - exp(-x/k), (1 - exp(-1/k))*exp(-(x - 1)/k))); heaviside(x) - heaviside(x - 1)
x: -0.5, 4
y: -0.1, 1.2
sliders: k=0.5:0.05:2:0.05
labels: y(t); x(t)
caption: The response of an RC low-pass with time constant $\tau_c$ (slider $k$, in units of the pulse width $T$) to a rectangular pulse. Small $\tau_c$: the output follows the pulse with rounded edges. Large $\tau_c$: the output never gets near $1$ and spreads far beyond the pulse. The impulse response is the "smearing kernel", and its width relative to the signal decides how much detail survives.
:::

The flip-and-slide picture itself is worth seeing. In the figure below the slider is the output time $t$; the blue curve is the product $x(\tau)h(t - \tau)$, whose area is $y(t)$.

::: widget plot
f: (heaviside(x) - heaviside(x - 1))*exp(-(t - x))*heaviside(t - x); heaviside(x) - heaviside(x - 1); exp(-(t - x))*heaviside(t - x)
x: -2, 4
y: -0.1, 1.2
sliders: t=0.5:-1:3.5:0.05
labels: x(\tau)h(t-\tau); x(\tau); h(t-\tau)
caption: Flip and slide for $x(\tau)$ a unit pulse on $[0, 1]$ and $h(\tau) = e^{-\tau}u(\tau)$, plotted against the dummy variable $\tau$. Move $t$ from $-1$ to $3.5$. For $t < 0$ the flipped exponential (green) misses the pulse and the product is zero; for $0 < t < 1$ the overlap grows; for $t > 1$ the whole pulse lies under the flipped exponential, whose height there falls as $t$ increases. The area under the blue curve is the output $y(t)$ of the previous figure with $\tau_c = T$.
:::

::: example Two rectangular pulses make a triangle {#ex-triangle}
Convolve $x(t) = u(t) - u(t - 1)$ with itself.
::: solution
$y(t) = \int x(\tau)x(t - \tau)\,\dd\tau$ is the length of the overlap of the interval $[0, 1]$ with the interval $[t - 1, t]$ (where $x(t - \tau) = 1$). For $t < 0$ or $t > 2$ there is no overlap. For $0 \le t \le 1$ the overlap is $[0, t]$, of length $t$. For $1 \le t \le 2$ it is $[t - 1, 1]$, of length $2 - t$. So $y(t)$ is a triangle of height $1$ at $t = 1$ and base $[0, 2]$. In general the convolution of two pulses of widths $T_1$ and $T_2$ has width $T_1 + T_2$, the CT analogue of the length rule $N + M - 1$; and convolution is a smoothing operation: two discontinuous signals give a continuous one.
:::
:::

## Properties of convolution {#sec-properties}

::: theorem Algebraic properties of convolution {#thm-conv-props}
For signals (CT or DT) for which the convolutions exist:

1. **Commutative:** $x * h = h * x$.
2. **Associative:** $(x * h_1) * h_2 = x * (h_1 * h_2)$.
3. **Distributive:** $x * (h_1 + h_2) = x * h_1 + x * h_2$.
4. **Identity:** $x * \delta = x$; more generally $x * \delta(\cdot - t_0) = x(\cdot - t_0)$.
5. **Shift:** if $y = x * h$ then $x(t - t_1) * h(t - t_2) = y(t - t_1 - t_2)$.
:::

::: proof
(1) In $\int x(\tau)h(t - \tau)\,\dd\tau$ substitute $\sigma = t - \tau$ to get $\int h(\sigma)x(t - \sigma)\,\dd\sigma$.

(2) Both sides equal the double integral $\iint x(\sigma)\,h_1(\rho)\,h_2(t - \sigma - \rho)\,\dd\sigma\,\dd\rho$, as you see by writing out each side and changing the order of integration (allowed when the double integral converges absolutely).

(3) Linearity of the integral.

(4) The sifting property: $\int x(\tau)\delta(t - t_0 - \tau)\,\dd\tau = x(t - t_0)$.

(5) Combine (2) and (4): $x(t - t_1) = x * \delta(\cdot - t_1)$ and similarly for $h$, and the impulses combine into $\delta(\cdot - t_1 - t_2)$. The DT proofs are identical with sums.
:::

Each property is a statement about systems. Commutativity says the roles of input and impulse response are interchangeable. Associativity together with commutativity says that **LTI systems in cascade can be reordered** and that the cascade is itself LTI with impulse response $h_1 * h_2$. Distributivity says that **LTI systems in parallel** combine into one with impulse response $h_1 + h_2$. Property 4 says the identity system has impulse response $\delta$, and the ideal delay by $t_0$ has impulse response $\delta(t - t_0)$.

The **step response** $s(t)$, the output for $x = u$, is often easier to measure than the impulse response (switching on a voltage is easier than applying an impulse). Since $u * h = h * u = \int_{-\infty}^{t}h(\tau)\,\dd\tau$,

$$
s(t) = \int_{-\infty}^{t}h(\tau)\,\dd\tau,\qquad h(t) = \frac{\dd s}{\dd t};\qquad s[n] = \sum_{k=-\infty}^{n}h[k],\qquad h[n] = s[n] - s[n-1].
$$ {#eq-step-response}

::: quiz
A DT LTI system has impulse response of length $40$ samples (an FIR filter with $40$ taps), and its input is a burst of $100$ samples. How many output samples can be non-zero?
- [ ] $100$
- [ ] $140$
- [x] $139$
- [ ] $4000$
::: solution
If $x$ is non-zero for $0 \le n \le 99$ and $h$ for $0 \le n \le 39$, then $y[n] = \sum_k x[k]h[n - k]$ can be non-zero for $0 \le n \le 99 + 39 = 138$, which is $139 = 100 + 40 - 1$ samples. The $39$ extra samples are the filter's "tail", which matters when long signals are filtered block by block in [[dsp]].
:::
:::

## System properties from the impulse response {#sec-system-properties}

Because $h$ determines an LTI system completely, every property of [[signals-systems/systems]] must be visible in $h$.

::: theorem Properties of LTI systems in terms of h {#thm-lti-props}
For an LTI system with impulse response $h$:

1. It is **memoryless** if and only if $h(t) = K\delta(t)$ ($h[n] = K\delta[n]$) for a constant $K$, i.e. it is a pure gain.
2. It is **causal** if and only if $h(t) = 0$ for $t < 0$ ($h[n] = 0$ for $n < 0$).
3. It is **BIBO stable** if and only if $h$ is absolutely integrable (summable):

$$
\int_{-\infty}^{\infty}\lvert h(t)\rvert\,\dd t < \infty \qquad\text{or}\qquad \sum_{n=-\infty}^{\infty}\lvert h[n]\rvert < \infty.
$$ {#eq-stability}

4. It is **invertible** if and only if there is an $h_i$ with $h * h_i = \delta$; $h_i$ is then the impulse response of the inverse system.
:::

::: proof
We give the DT proofs; the CT ones are the same with integrals.

(1) $y[n] = \sum_m h[m]x[n - m]$ depends only on $x[n]$ for all inputs exactly when $h[m] = 0$ for all $m \ne 0$.

(2) In $y[n] = \sum_m h[m]x[n - m]$ the terms with $m < 0$ involve future inputs $x[n - m]$, $n - m > n$. They are absent for every input exactly when $h[m] = 0$ for $m < 0$.

(3) *Sufficiency.* If $\lvert x[n]\rvert \le B$ for all $n$, then $\lvert y[n]\rvert \le \sum_m\lvert h[m]\rvert\,\lvert x[n - m]\rvert \le B\sum_m\lvert h[m]\rvert$, which is finite. *Necessity.* Suppose $\sum\lvert h[m]\rvert = \infty$. Choose the bounded input $x[n] = \operatorname{sgn}(h[-n])$ (with $\operatorname{sgn}0 = 0$; for complex $h$ use $h^*[-n]/\lvert h[-n]\rvert$). Then $y[0] = \sum_m h[m]x[-m] = \sum_m\lvert h[m]\rvert = \infty$, so the output is unbounded.

(4) The inverse system $T^{-1}$ undoes $T$, so their cascade is the identity, whose impulse response is $\delta$; by associativity the cascade's impulse response is $h * h_i$.
:::

Apply the tests to familiar systems. The RC filter, $h(t) = \frac{1}{\tau_c}e^{-t/\tau_c}u(t)$, is causal and stable ($\int\lvert h\rvert = 1$). The integrator, $h = u(t)$, is causal but unstable ($\int_0^\infty 1\,\dd t = \infty$), confirming [[signals-systems/systems]]. The DT system $h[n] = a^nu[n]$ is stable if and only if $\sum\lvert a\rvert^n < \infty$, i.e. $\lvert a\rvert < 1$. An ideal low-pass filter, met in [[signals-systems/fourier-transform]], has a sinc-shaped impulse response that is not causal and, more surprisingly, not absolutely integrable.

::: quiz
An LTI system has impulse response $h(t) = e^{-t}u(t + 1)$. Which statement is true?
- [ ] It is causal and stable.
- [x] It is stable but not causal.
- [ ] It is causal but not stable.
- [ ] It is neither causal nor stable.
::: solution
$h(t)$ is non-zero on $-1 < t < 0$, so the system responds up to $1\,\mathrm{s}$ before the impulse arrives: not causal. $\int\lvert h\rvert = \int_{-1}^{\infty}e^{-t}\,\dd t = e \approx 2.72$, finite: stable. Delaying the output by $1\,\mathrm{s}$ would make it causal, with impulse response $e^{-(t-1)}u(t) = e\cdot e^{-t}u(t)$.
:::
:::

::: example Removing an echo {#ex-echo}
A transmission channel produces a delayed, attenuated echo: $y[n] = x[n] + \alpha x[n - N]$ with $0 < \alpha < 1$ and delay $N$ samples. Find the impulse response of the channel and of a causal, stable inverse system (an echo canceller).
::: solution
The channel's impulse response is $h[n] = \delta[n] + \alpha\,\delta[n - N]$. Try an inverse defined by the feedback equation $w[n] = y[n] - \alpha\,w[n - N]$: if $y = x + \alpha x[\cdot - N]$ then $w = x$ satisfies $x[n] = x[n] + \alpha x[n - N] - \alpha x[n - N]$, which is true, so (with initial rest) $w = x$. The inverse's impulse response follows from running the recursion with $y = \delta$:

$$
h_i[n] = \delta[n] - \alpha\,\delta[n - N] + \alpha^2\delta[n - 2N] - \cdots = \sum_{k=0}^{\infty}(-\alpha)^k\,\delta[n - kN].
$$

It is causal and, since $\sum\lvert h_i\rvert = \sum\alpha^k = 1/(1 - \alpha)$, stable for $\alpha < 1$. Check with the convolution: $h * h_i = \sum_k(-\alpha)^k\delta[n - kN] + \alpha\sum_k(-\alpha)^k\delta[n - (k+1)N]$; the second sum, re-indexed, is $-\sum_{k\ge1}(-\alpha)^{k}\delta[n - kN]$, which cancels every term of the first except $k = 0$, leaving $\delta[n]$. If the echo were stronger than the direct signal ($\alpha > 1$) the same causal inverse would be unstable.
:::
:::

## Exponentials are eigenfunctions {#sec-eigen}

Feed the complex exponential $x(t) = e^{st}$ into an LTI system. By [[#eq-conv-int]],

$$
y(t) = \int_{-\infty}^{\infty}h(\tau)e^{s(t - \tau)}\,\dd\tau = e^{st}\int_{-\infty}^{\infty}h(\tau)e^{-s\tau}\,\dd\tau = H(s)\,e^{st}.
$$

::: theorem Complex exponentials are eigenfunctions of LTI systems {#thm-eigen}
If the integral (sum) converges, the response of a CT LTI system to $e^{st}$ is $H(s)e^{st}$ and the response of a DT LTI system to $z^n$ is $H(z)z^n$, where

$$
H(s) = \int_{-\infty}^{\infty}h(t)e^{-st}\,\dd t,\qquad H(z) = \sum_{n=-\infty}^{\infty}h[n]z^{-n}.
$$ {#eq-system-function}

$H$ is called the **system function** (or transfer function). For $s = j\omega$ and $z = e^{j\omega}$ it is the **frequency response**.
:::

The proof is the computation above (and its DT twin). It explains why sinusoidal steady-state analysis with phasors works: a sinusoid is a sum of two exponentials, each is multiplied by a complex number, and the output is a sinusoid of the same frequency with gain $\lvert H(j\omega)\rvert$ and phase shift $\angle H(j\omega)$. It is also the bridge to the rest of the course: if we can write any input as a combination of exponentials, the output is the same combination with each term multiplied by $H$. Fourier series and transforms use $s = j\omega$; the Laplace and $z$-transforms of [[#eq-system-function]] use general $s$ and $z$.

## Differential and difference equations {#sec-equations}

Systems are rarely specified by their impulse response. Circuits produce differential equations; digital filters are programmed as difference equations. The **linear constant-coefficient differential equation**

$$
\sum_{k=0}^{N}a_k\frac{\dd^k y}{\dd t^k} = \sum_{k=0}^{M}b_k\frac{\dd^k x}{\dd t^k}
$$ {#eq-lccde}

does not by itself define a system: its solutions contain arbitrary constants from the homogeneous solution. We need an auxiliary condition, and the one that makes the system LTI and causal is **initial rest**: if $x(t) = 0$ for $t < t_0$, then $y(t) = 0$ for $t < t_0$. The DT counterpart is the **linear constant-coefficient difference equation**

$$
\sum_{k=0}^{N}a_k\,y[n - k] = \sum_{k=0}^{M}b_k\,x[n - k],
$$ {#eq-lccde-dt}

which with $a_0 \ne 0$ can be solved *recursively*: $y[n] = \frac{1}{a_0}\big(\sum_k b_kx[n - k] - \sum_{k\ge1}a_ky[n - k]\big)$, each new output from past outputs and present and past inputs. This is literally how a digital filter is implemented.

If $N = 0$ the output is a weighted sum of the last $M + 1$ inputs and $h[n] = b_n/a_0$ for $0 \le n \le M$: a **finite impulse response (FIR)** system. If $N \ge 1$ the feedback of past outputs usually makes the impulse response infinitely long: an **infinite impulse response (IIR)** system.

::: example Impulse response from a difference equation {#ex-difference}
Find the impulse response of the causal system $y[n] - 0.5\,y[n-1] = x[n] + x[n-1]$.
::: solution
Run the recursion $h[n] = 0.5\,h[n-1] + \delta[n] + \delta[n-1]$ with $h[n] = 0$ for $n < 0$:

$h[0] = 0 + 1 + 0 = 1$, $h[1] = 0.5 + 0 + 1 = 1.5$, $h[2] = 0.75$, $h[3] = 0.375$, and from then on each sample is half the last.

In closed form: by linearity, the response to the right-hand side $\delta[n]$ alone is $g[n] = 0.5^nu[n]$, and the term $x[n-1]$ adds its delayed copy, so $h[n] = 0.5^nu[n] + 0.5^{n-1}u[n-1]$. For $n \ge 1$ this is $0.5^n + 2\cdot0.5^n = 3\cdot0.5^n$, giving $h[1] = 1.5$ as before. Hence $h[n] = \delta[n] + 3(0.5)^nu[n-1]$, an IIR system. It is stable: $\sum\lvert h\rvert = 1 + 3\cdot\sum_{n\ge1}0.5^n = 1 + 3 = 4$.
:::
:::

For CT systems the impulse response can be found from the step response, which is an ordinary initial-value problem. For the RC circuit $\tau_c y' + y = x$, the step response from rest is $s(t) = (1 - e^{-t/\tau_c})u(t)$, and by [[#eq-step-response]] $h(t) = s'(t) = \frac{1}{\tau_c}e^{-t/\tau_c}u(t)$, as used above. For higher-order equations the Laplace transform of [[signals-systems/laplace-transform]] (and [[circuits-2/laplace-circuit-analysis]]) is the efficient route.

::: example Designing an RC smoothing filter {#ex-rc-design}
A sensor output is to be smoothed by an RC low-pass filter with $C = 100\,\mathrm{nF}$, and the specification requires the step response to reach $90\%$ of its final value within $1.0\,\mathrm{ms}$ (but the filter should be as slow as allowed, to smooth as much as possible). Choose $R$ from the E24 series ($\dots, 3.9, 4.3, 4.7, \dots\,\mathrm{k\Omega}$) and state the resulting $90\%$ time.
::: solution
The step response $1 - e^{-t/RC}$ reaches $0.9$ when $e^{-t/RC} = 0.1$, at $t_{90} = RC\ln10 \approx 2.303\,RC$. The requirement $t_{90} \le 1.0\,\mathrm{ms}$ gives

$$
RC \le \frac{1.0\,\mathrm{ms}}{2.303} = 0.434\,\mathrm{ms},\qquad R \le \frac{0.434\times10^{-3}\,\mathrm{s}}{100\times10^{-9}\,\mathrm{F}} = 4.34\,\mathrm{k\Omega}.
$$

The largest E24 value not exceeding $4.34\,\mathrm{k\Omega}$ is $4.3\,\mathrm{k\Omega}$, giving $\tau_c = 0.43\,\mathrm{ms}$ and $t_{90} = 2.303\times0.43\,\mathrm{ms} = 0.990\,\mathrm{ms}$. With a $5\%$ capacitor tolerance and a $1\%$ resistor the worst case is $0.990\times1.05\times1.01 \approx 1.05\,\mathrm{ms}$, which would just miss: a careful designer would drop to $3.9\,\mathrm{k\Omega}$ ($t_{90} = 0.898\,\mathrm{ms}$ nominal, $0.952\,\mathrm{ms}$ worst case).
:::
:::

::: application Convolution reverb and FIR filters
A convolution reverb plug-in stores a measured room impulse response, typically $2$ to $5\,\mathrm{s}$ long, about $10^5$ to $2.4\times10^5$ samples at $48\,\mathrm{kHz}$, and convolves the dry audio with it. Done directly, that is $10^5$ multiply–adds per output sample, about $5\times10^9$ per second per channel, which is why real implementations use the FFT-based fast convolution of [[dsp]]. The same convolution sum, with a few dozen to a few hundred taps, is the FIR filter at the heart of every audio codec, modem and software radio.
:::

## Where this leads

Convolution is how LTI systems act, but evaluating it directly is laborious, and it hides the most useful description of a filter, its effect on each frequency. [[signals-systems/fourier-series]] and [[signals-systems/fourier-transform]] exploit [[#thm-eigen]] to replace convolution by multiplication, and [[signals-systems/laplace-transform]] and [[signals-systems/z-transform]] do the same for differential and difference equations, turning them into algebra. The stability condition [[#eq-stability]] will reappear as a condition on pole locations.

::: history
Integrals of the convolution form appear in the eighteenth century in the work of Euler and Laplace and in Fourier's analysis of heat (1822). Jean-Marie Duhamel's memoir of 1833 on heat conduction with time-varying boundary conditions gave the superposition principle that engineers still call **Duhamel's integral**: the response to a varying input is the integral of step responses. In electrical engineering, John R. Carson's *Electric Circuit Theory and the Operational Calculus* (1926) used the superposition integral systematically to put Heaviside's methods on a firm basis. The German name *Faltung* ("folding") recalls the flip in flip-and-slide; the English term "convolution" became standard in the mid-twentieth century.
:::

::: summary
- The impulse response $h$ of an LTI system determines it completely: $y = x * h$, with $y[n] = \sum_k x[k]h[n - k]$ or $y(t) = \int x(\tau)h(t - \tau)\,\dd\tau$.
- Evaluate convolutions by flip and slide; take the limits from the overlap of the supports, which changes with $t$.
- Convolution is commutative, associative and distributive with identity $\delta$: cascades of LTI systems commute and combine as $h_1 * h_2$; parallel systems as $h_1 + h_2$.
- The step response is the running integral (sum) of the impulse response.
- An LTI system is causal iff $h = 0$ for negative time, and BIBO stable iff $h$ is absolutely integrable (summable).
- $e^{st}$ and $z^n$ are eigenfunctions: the output is $H(s)e^{st}$ or $H(z)z^n$, the basis of all transform methods.
- Differential and difference equations with initial rest define causal LTI systems; difference equations without output feedback are FIR, with feedback usually IIR.
:::

## Exercises

::: exercise A convolution by hand {level=1}
Compute $\{\underline{1}, 1, 1, 1\} * \{\underline{1}, 1, 1\}$ and check its length and sum.
::: solution
$y = \{\underline{1}, 2, 3, 3, 2, 1\}$. Length $4 + 3 - 1 = 6$; sum $12 = 4\cdot3$. Convolving two rectangles gives a trapezoid (a triangle when the lengths are equal).
:::
:::

::: exercise Stability from the impulse response {level=1}
Which of these impulse responses describe BIBO stable systems? Which are causal? (a) $h[n] = 0.9^n u[n]$; (b) $h[n] = 1.1^{n}u[-n]$; (c) $h(t) = e^{-2t}\cos(5t)u(t)$; (d) $h(t) = u(t) - u(t - 3)$; (e) $h(t) = \frac{1}{1+t}u(t)$.
::: solution
(a) Causal; stable ($\sum 0.9^n = 10$). (b) For $n \le 0$, $h[n] = 1.1^{n}$, which decays as $n \to -\infty$: not causal; stable ($\sum_{n\le0}1.1^{n} = 1/(1 - 1/1.1) = 11$). (c) Causal; stable ($\int\lvert h\rvert \le \int_0^\infty e^{-2t}\,\dd t = 0.5$). (d) Causal; stable ($\int\lvert h\rvert = 3$). (e) Causal; unstable, since $\int_0^\infty\frac{\dd t}{1+t}$ diverges logarithmically, even though $h(t) \to 0$.
:::
:::

::: exercise Step response of an RC circuit at one instant {level=1 check="1 - exp(-2)"}
An RC circuit with $\tau_c = 1\,\mathrm{ms}$ is driven by a unit step. What is the output (in volts, for a $1\,\mathrm{V}$ step) at $t = 2\,\mathrm{ms}$?
::: solution
$s(t) = 1 - e^{-t/\tau_c}$, so $s(2\,\mathrm{ms}) = 1 - e^{-2} \approx 0.865\,\mathrm{V}$.
:::
:::

::: exercise Convolution of two exponentials {level=2 check="exp(-1) - exp(-2)"}
Find $y(t) = e^{-at}u(t) * e^{-bt}u(t)$ for $a \ne b$, and evaluate it for $a = 1\,\mathrm{s^{-1}}$, $b = 2\,\mathrm{s^{-1}}$ at $t = 1\,\mathrm{s}$.
::: solution
For $t > 0$: $y(t) = \int_0^t e^{-a\tau}e^{-b(t - \tau)}\,\dd\tau = e^{-bt}\int_0^t e^{(b - a)\tau}\,\dd\tau = e^{-bt}\frac{e^{(b-a)t} - 1}{b - a} = \frac{e^{-at} - e^{-bt}}{b - a}$, and $y = 0$ for $t < 0$. With $a = 1$, $b = 2$, $t = 1$: $y = e^{-1} - e^{-2} \approx 0.2325$. This is the impulse response of two RC stages in cascade, separated by a buffer.
:::
:::

::: exercise Cascade and parallel {level=2}
Systems with $h_1[n] = \delta[n] - \delta[n-1]$ and $h_2[n] = u[n]$ are connected in cascade. Find the overall impulse response and explain the result. Then find the impulse response when they are connected in parallel.
::: solution
Cascade: $h_1 * h_2 = u[n] - u[n-1] = \delta[n]$. The first difference and the accumulator are inverses (see [[signals-systems/systems]]). Parallel: $h_1 + h_2 = \delta[n] - \delta[n-1] + u[n]$. Sample by sample: at $n = 0$ it is $1 + 1 = 2$; at $n = 1$ it is $-1 + 1 = 0$; for $n \ge 2$ it is $1$. So the parallel response is $\{\underline{2}, 0, 1, 1, 1, \dots\} = 2\delta[n] + u[n-2]$.
:::
:::

::: exercise A moving-average hum filter {level=2 check="20"}
A sensor signal sampled at $f_s = 1\,\mathrm{kHz}$ is contaminated by $50\,\mathrm{Hz}$ hum. A moving average $y[n] = \frac1M\sum_{k=0}^{M-1}x[n-k]$ removes any signal that is periodic with period $M$ and zero mean. What is the smallest $M$ that removes the hum? What is the delay of the filter's step response to reach its final value?
::: solution
The sampled hum has period $f_s/50 = 20$ samples, and the sum of any $20$ consecutive samples of a zero-mean signal with period $20$ is zero. So $M = 20$. The step response $s[n] = \sum_{k=0}^{n}h[k]$ rises linearly from $1/20$ to $1$ over $n = 0, \dots, 19$, reaching its final value after $19$ samples, $19\,\mathrm{ms}$ (and $40$, $60$, … also remove the hum, with longer delays).
:::
:::

::: exercise Impulse response of a second-order recursion {level=2}
Find the first five samples of the impulse response of $y[n] = y[n-1] - 0.5\,y[n-2] + x[n]$, assumed causal. Is the system FIR or IIR? (Its stability is settled in [[signals-systems/z-transform]].)
::: solution
$h[0] = 1$, $h[1] = 1$, $h[2] = 1 - 0.5 = 0.5$, $h[3] = 0.5 - 0.5 = 0$, $h[4] = 0 - 0.25 = -0.25$, then $h[5] = -0.25$, $h[6] = -0.125$, … IIR: the feedback keeps it going forever, as a decaying oscillation (the samples are $(1/\sqrt2)^n$ times a sinusoid of period $8$).
:::
:::

::: exercise Necessity of absolute integrability {level=3}
Show directly that the CT system with $h(t) = \frac{\sin t}{t}$ is not BIBO stable, by constructing a bounded input whose output is unbounded at $t = 0$. You may use the fact that $\int_0^\infty\lvert\sin t\rvert/t\,\dd t$ diverges.
::: hint
Follow the necessity part of [[#thm-lti-props]]: choose $x(t) = \operatorname{sgn}(h(-t))$.
:::
::: solution
Take $x(t) = \operatorname{sgn}\big(\sin(-t)/(-t)\big) = \operatorname{sgn}(\sin t/t)$, which is bounded by $1$. Then $y(0) = \int h(\tau)x(-\tau)\,\dd\tau = \int\frac{\sin\tau}{\tau}\operatorname{sgn}\frac{\sin\tau}{\tau}\,\dd\tau = \int_{-\infty}^\infty\frac{\lvert\sin\tau\rvert}{\lvert\tau\rvert}\,\dd\tau = \infty$. The integral diverges because on each interval $[k\pi, (k+1)\pi]$ the integrand is at least $\lvert\sin\tau\rvert/((k+1)\pi)$, whose integral is $2/((k+1)\pi)$, and $\sum 1/(k+1)$ diverges. This $h$ is (up to scaling) the impulse response of the ideal low-pass filter: it has finite energy but is not absolutely integrable, and so the ideal low-pass filter is not BIBO stable.
:::
:::

::: exercise Designing a two-tap equaliser {level=3}
A channel has impulse response $h[n] = \delta[n] + 0.5\,\delta[n-1]$. (a) Find the exact causal inverse $h_i[n]$ and show it is stable. (b) A designer truncates it to an FIR filter $g[n] = \delta[n] - 0.5\,\delta[n-1] + 0.25\,\delta[n-2]$. Compute $h * g$ and the size of the residual intersymbol interference (the largest non-zero sample other than $n = 0$).
::: hint
Use [[#ex-echo]] with $N = 1$.
:::
::: solution
(a) From [[#ex-echo]] with $\alpha = 0.5$, $N = 1$: $h_i[n] = (-0.5)^nu[n]$, with $\sum\lvert h_i\rvert = 2$, stable.

(b) $h * g = \{1, -0.5 + 0.5, 0.25 - 0.25, 0.125\} = \{\underline{1}, 0, 0, 0.125\}$. The residual interference is a single sample of $0.125$ three steps later, compared with $0.5$ before equalisation, a reduction by a factor of $4$ (12 dB in amplitude). Each additional tap of the truncated inverse halves it again.
:::
:::
