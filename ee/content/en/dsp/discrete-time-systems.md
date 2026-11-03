A digital audio processor running at a clock rate of $200\,\mathrm{MHz}$ and fed with samples at $48\,\mathrm{kHz}$ has $200\times10^6/48\,000 \approx 4167$ clock cycles to spend on each sample before the next one arrives. Whatever it does with them — equalise, compress, cancel echo, remove hum — it must finish in time, every time, for hours on end. Inside that budget the processor is doing nothing more mysterious than multiplying recent input and output samples by constants and adding the results. Digital signal processing is the art of choosing those constants, and the order in which the arithmetic is done, so that the sequence of numbers coming out is the signal we want.

The theory that makes this possible was developed in [[signals-systems]]: sequences, linear time-invariant systems, convolution, the discrete-time Fourier transform (DTFT) of [[signals-systems/discrete-time-fourier]] and the $z$-transform of [[signals-systems/z-transform]]. This chapter does not re-teach it. Instead it restates the results in the form a DSP engineer uses every day, fixes the notation for the rest of the course, and adds the ideas that the earlier course left out: the distinction between FIR and IIR filters as computations, the cost of a filter per sample, **group delay**, **all-pass** and **minimum-phase** systems, and the design of a filter directly from a pole–zero picture.

## Sequences and frequencies {#sec-sequences}

A DSP system almost always sits between converters. An analog-to-digital converter (ADC) samples a continuous-time signal $x_c(t)$ every $T$ seconds and quantises each sample; the processor computes; a digital-to-analog converter (DAC) and a reconstruction filter turn the output numbers back into a voltage. The sampling theorem of [[signals-systems/sampling]] tells us when the samples $x[n] = x_c(nT)$ determine $x_c(t)$, and the course [[instrumentation]] treats the converters themselves. Between the converters there is only the sequence.

::: definition Sequence, sampling rate and normalised frequency {#def-sequence}
A **sequence** (discrete-time signal) is a function $x[n]$ of the integer $n$. When it comes from sampling at rate $f_s = 1/T$, a continuous-time frequency $f$ in hertz appears in the sequence as the **normalised frequency**

$$
\omega = 2\pi\frac{f}{f_s} = \Omega T\quad\text{radians per sample},
$$ {#eq-normalised}

where $\Omega = 2\pi f$ is in radians per second. Equivalently $\nu = f/f_s$ is the frequency in cycles per sample. The DTFT is periodic in $\omega$ with period $2\pi$, and the range $0 \le \omega \le \pi$ corresponds to $0 \le f \le f_s/2$.
:::

The upper limit $f_s/2$, the **Nyquist frequency**, is the highest frequency a real sequence can represent: $\omega = \pi$ is the alternating sequence $(-1)^n$. Every frequency in this course will be stated in one of four units, and most errors in DSP calculations come from mixing them.

| quantity | symbol | unit | Nyquist frequency | example at $f_s = 8\,\mathrm{kHz}$, $f = 1\,\mathrm{kHz}$ |
|---|---|---|---|---|
| analog frequency | $f$ | $\mathrm{Hz}$ | $f_s/2$ | $1000$ |
| analog angular frequency | $\Omega$ | $\mathrm{rad/s}$ | $\pi f_s$ | $6283$ |
| normalised frequency | $\omega$ | $\mathrm{rad/sample}$ | $\pi$ | $\pi/4 = 0.785$ |
| normalised frequency | $\nu$ | $\mathrm{cycles/sample}$ | $0.5$ | $0.125$ |

::: warning Three different "normalised frequencies"
Textbooks and software disagree about what "normalised frequency" means. In this course it is $\omega$ in radians per sample, with Nyquist at $\pi$. Some books use $\nu = f/f_s$, with Nyquist at $0.5$. MATLAB's and SciPy's filter-design functions by default use $f/(f_s/2)$, with Nyquist at $1$. A cut-off "of $0.25$" is therefore $0.04f_s$, $f_s/4$ or $f_s/8$ depending on the convention: always convert to hertz before comparing.
:::

Several sequences recur constantly: the unit impulse $\delta[n]$, the unit step $u[n]$, the exponential $a^nu[n]$, the sinusoid $\cos(\omega_0n + \phi)$ and the complex exponential $e^{j\omega_0n}$. Recall from [[signals-systems/signals]] that $\cos(\omega_0n)$ is periodic only if $\omega_0/2\pi$ is rational, and that $\omega_0$ and $\omega_0 + 2\pi$ give the same sequence. In hardware, each sample is also quantised to a finite number of bits; we postpone that until [[dsp/filter-structures]], and for now treat samples as exact real numbers.

## LTI systems as computations {#sec-lti}

A discrete-time system maps an input sequence to an output sequence. If it is linear and time-invariant (LTI), it is completely described by its **impulse response** $h[n]$, its output for the input $\delta[n]$, and the output for any input is the **convolution sum** derived in [[signals-systems/convolution]]:

$$
y[n] = (x * h)[n] = \sum_{k=-\infty}^{\infty}h[k]\,x[n-k].
$$ {#eq-convolution}

The system is **causal** if $h[n] = 0$ for $n < 0$, so that $y[n]$ depends only on present and past inputs, and **BIBO stable** if and only if $\sum_n\lvert h[n]\rvert < \infty$. For a processor working in real time, causality is not optional: the sample $x[n+1]$ has not been converted yet when $y[n]$ is due. A non-causal filter can be used only after delaying it until it becomes causal, or on recorded data.

::: definition FIR and IIR systems {#def-fir-iir}
An LTI system is **finite impulse response (FIR)** if $h[n]$ has finitely many non-zero samples. A causal FIR filter of **length** $M$ (with $M$ **taps**; its **order** is $M - 1$) computes

$$
y[n] = \sum_{k=0}^{M-1}h[k]\,x[n-k],
$$ {#eq-fir}

which costs $M$ multiplications and $M - 1$ additions per output sample. An LTI system whose impulse response has infinitely many non-zero samples is **infinite impulse response (IIR)**. An IIR system cannot be computed from [[#eq-fir]]; it is computed recursively, from a difference equation that feeds back past outputs.
:::

The FIR sum [[#eq-fir]] is literally the program. Keeping the last $M$ inputs in a buffer (a **delay line**), the processor multiplies each by its coefficient and accumulates: one **multiply–accumulate (MAC)** per tap. DSP chips are designed around executing one or more MACs per clock cycle, so an FIR filter's cost in cycles is close to its length. In the $4167$-cycle budget of the introduction, a single-MAC processor could run an FIR filter of a few thousand taps on one channel, or a few hundred taps on each of several channels with time left for everything else.

::: example Convolving a short sequence {#ex-convolve}
The three-tap smoother $h = \{\underline{0.25}, 0.5, 0.25\}$ (the underline marks $n = 0$) is applied to $x = \{\underline{4}, 0, 8, 4\}$. Find the output and check it with the sum of the samples.
::: solution
The output has length $4 + 3 - 1 = 6$. From [[#eq-fir]], $y[n] = 0.25x[n] + 0.5x[n-1] + 0.25x[n-2]$:

$$
\begin{aligned}
y[0] &= 0.25(4) = 1, & y[1] &= 0.25(0) + 0.5(4) = 2,\\
y[2] &= 0.25(8) + 0.5(0) + 0.25(4) = 3, & y[3] &= 0.25(4) + 0.5(8) + 0.25(0) = 5,\\
y[4] &= 0.5(4) + 0.25(8) = 4, & y[5] &= 0.25(4) = 1.
\end{aligned}
$$

So $y = \{\underline{1}, 2, 3, 5, 4, 1\}$. Check: the sum of an output of a convolution is the product of the sums, $\sum y = (\sum h)(\sum x) = 1\times16 = 16$, and indeed $1 + 2 + 3 + 5 + 4 + 1 = 16$. The smoother has filled in the zero at $n = 1$ and blurred the step at $n = 2$, as a low-pass filter should.
:::
:::

## Difference equations {#sec-difference}

The filters that DSP actually builds are those that can be computed with a finite amount of arithmetic per sample. These are exactly the systems described by linear constant-coefficient difference equations.

::: definition Difference equation and system function {#def-difference}
A causal **linear constant-coefficient difference equation** of order $N$ is

$$
y[n] = \sum_{k=0}^{M}b_k\,x[n-k] - \sum_{k=1}^{N}a_k\,y[n-k],
$$ {#eq-difference}

with $a_0 = 1$, computed with **initial rest** (all inputs and outputs zero before the input starts). It defines a causal LTI system with **system function**

$$
H(z) = \frac{B(z)}{A(z)} = \frac{b_0 + b_1z^{-1} + \cdots + b_Mz^{-M}}{1 + a_1z^{-1} + \cdots + a_Nz^{-N}}.
$$ {#eq-system-function}

If all $a_k = 0$ for $k \ge 1$ the system is FIR with $h[n] = b_n$; otherwise (unless poles cancel zeros exactly) it is IIR.
:::

The sign convention matters. In [[#eq-difference]] the feedback coefficients appear with a minus sign so that they are exactly the coefficients of the denominator $A(z)$; this is the convention of Oppenheim and Schafer and of MATLAB and SciPy's `lfilter(b, a, x)`. Some books write $y[n] = \sum b_kx[n-k] + \sum a_ky[n-k]$ instead, which flips the signs of all the $a_k$. Read the convention before copying coefficients from a table.

The cost of [[#eq-difference]] is $M + 1 + N$ multiplications per output sample, independent of how long the impulse response is. That is the great attraction of IIR filters: a second-order section with five coefficients can have an impulse response that rings for thousands of samples, which an FIR filter could match only with thousands of taps. The price, which we study in [[dsp/iir-filter-design]] and [[dsp/filter-structures]], is non-linear phase, the possibility of instability, and greater sensitivity to rounding.

Here is [[#eq-difference]] as a program — the same computation a DSP chip performs, written in standard-library Python. We will reuse it throughout the course.

```python
def lfilter(b, a, x):
    """Direct-form I: a[0]*y[n] = sum b[k] x[n-k] - sum_{k>=1} a[k] y[n-k]."""
    y = []
    for n in range(len(x)):
        acc = sum(b[k] * x[n - k] for k in range(len(b)) if n - k >= 0)
        acc -= sum(a[k] * y[n - k] for k in range(1, len(a)) if n - k >= 0)
        y.append(acc / a[0])
    return y

impulse = [1] + [0] * 7
h = lfilter([1], [1, -1.5, 0.56], impulse)
print([round(v, 4) for v in h])
print(lfilter([0.25, 0.5, 0.25], [1], [4, 0, 8, 4, 0, 0]))
```

```text
[1.0, 1.5, 1.69, 1.695, 1.5961, 1.4449, 1.2736, 1.1012]
[1.0, 2.0, 3.0, 5.0, 4.0, 1.0]
```

The second line reproduces [[#ex-convolve]]; the first is the subject of the next example.

::: example Impulse response by recursion and by partial fractions {#ex-recursion}
Find the impulse response of $y[n] = 1.5\,y[n-1] - 0.56\,y[n-2] + x[n]$ in closed form, and check it against the first samples computed by the program above.
::: solution
In the form [[#eq-difference]], $a_1 = -1.5$ and $a_2 = 0.56$, so

$$
H(z) = \frac{1}{1 - 1.5z^{-1} + 0.56z^{-2}}.
$$

The poles are the roots of $z^2 - 1.5z + 0.56 = 0$: $z = \frac{1.5 \pm \sqrt{2.25 - 2.24}}{2} = \frac{1.5 \pm 0.1}{2}$, that is $p_1 = 0.8$ and $p_2 = 0.7$. Both are inside the unit circle, so the causal system is stable. Partial fractions in $z^{-1}$ (as in [[signals-systems/z-transform]]), by cover-up:

$$
H(z) = \frac{A}{1 - 0.8z^{-1}} + \frac{B}{1 - 0.7z^{-1}},\qquad A = \frac{1}{1 - 0.7/0.8} = 8,\quad B = \frac{1}{1 - 0.8/0.7} = -7.
$$

Hence $h[n] = \big(8(0.8)^n - 7(0.7)^n\big)u[n]$. Check: $h[0] = 8 - 7 = 1$, $h[1] = 6.4 - 4.9 = 1.5$, $h[2] = 5.12 - 3.43 = 1.69$, $h[3] = 4.096 - 2.401 = 1.695$, matching the recursion. The response rises before it decays, because the two modes start with opposite signs and the faster one ($0.7^n$) dies first. It never becomes exactly zero: the system is IIR, although each output costs only two multiplications.
:::
:::

::: quiz
A causal filter is computed as $y[n] = x[n] - x[n-4] + y[n-1]$. Which statement is true?
- [ ] It is IIR, because it feeds back $y[n-1]$
- [x] It is FIR: its impulse response is $1$ for $0 \le n \le 3$ and $0$ afterwards
- [ ] It is unstable, because it has a pole on the unit circle
- [ ] It is not LTI
::: solution
$H(z) = \dfrac{1 - z^{-4}}{1 - z^{-1}} = 1 + z^{-1} + z^{-2} + z^{-3}$: the pole at $z = 1$ is cancelled exactly by one of the four zeros of $1 - z^{-4}$. The impulse response is a four-sample rectangle, so the filter is FIR (a four-point running sum) even though it is computed recursively. This **recursive running sum** costs one multiplication-free subtraction and addition per sample whatever the length; it is the core of the CIC filters of [[dsp/multirate-processing]]. In exact (or integer, wrap-around) arithmetic it is stable; in floating point the cancellation is not exact and errors can accumulate, which is why it is implemented with integers.
:::
:::

## Magnitude, phase and group delay {#sec-frequency}

A stable LTI system responds to $e^{j\omega n}$ with $H(e^{j\omega})e^{j\omega n}$, where the **frequency response** $H(e^{j\omega}) = \sum_nh[n]e^{-j\omega n}$ is the $z$-transform on the unit circle. Writing it in polar form, $H(e^{j\omega}) = \lvert H(e^{j\omega})\rvert e^{j\theta(\omega)}$, a real sinusoid $\cos(\omega_0n)$ comes out as $\lvert H(e^{j\omega_0})\rvert\cos(\omega_0n + \theta(\omega_0))$. The magnitude is usually plotted in decibels, $20\log_{10}\lvert H\rvert$, and is what filter specifications constrain. The phase is less visible but just as important when the waveform shape matters, as in data transmission, radar pulses and audio transients.

::: definition Phase delay and group delay {#def-group-delay}
Let $\theta(\omega)$ be the **unwrapped** (continuous) phase of $H(e^{j\omega})$. The **phase delay** and the **group delay** are

$$
\tau_p(\omega) = -\frac{\theta(\omega)}{\omega},\qquad \tau_g(\omega) = -\frac{\dd\theta(\omega)}{\dd\omega},
$$ {#eq-group-delay}

both measured in samples. The phase delay is the delay of a single sinusoid at $\omega$; the group delay is the delay of the envelope of a narrow-band signal centred at $\omega$.
:::

The interpretation of $\tau_g$ comes from a first-order expansion. A narrow-band input $s[n]\cos(\omega_0n)$, whose envelope $s[n]$ varies slowly, occupies frequencies near $\pm\omega_0$, where $\theta(\omega) \approx \theta(\omega_0) - \tau_g(\omega_0)(\omega - \omega_0)$. Each component is then delayed by an amount that makes the envelope come out as $s[n - \tau_g]$ and the carrier as $\cos(\omega_0(n - \tau_p))$, both scaled by $\lvert H(e^{j\omega_0})\rvert$. If the group delay varies across the band of a signal, different parts of its spectrum arrive at different times and the waveform is **dispersed**.

::: theorem Linear phase and additivity of group delay {#thm-group-delay}
1. If $H(e^{j\omega}) = A(\omega)e^{-j\alpha\omega}$ with $A$ real, the group delay is $\alpha$ samples at every frequency where $A \ne 0$; a symmetric FIR filter $h[n] = h[M-1-n]$ has $\alpha = (M-1)/2$.
2. The group delay of a cascade is the sum of the group delays: if $H = H_1H_2$ then $\tau_g = \tau_{g,1} + \tau_{g,2}$; the group delay of $1/H_1$ is $-\tau_{g,1}$.
3. For a single factor $1 - ce^{-j\omega}$ with $c = re^{j\phi}$,

$$
\tau_g(\omega) = \frac{r^2 - r\cos(\omega - \phi)}{1 - 2r\cos(\omega - \phi) + r^2}.
$$ {#eq-gd-factor}
:::

::: proof
(1) The phase is $-\alpha\omega$ plus jumps of $\pi$ where $A$ changes sign; the derivative of the jumps is zero wherever $A \ne 0$. The symmetric FIR case was proved in [[signals-systems/discrete-time-fourier]]. (2) Phases of a product add, and so do their derivatives; the phase of $1/H_1$ is $-\theta_1$.

(3) Write $1 - ce^{-j\omega} = 1 - r\cos(\omega - \phi) + jr\sin(\omega - \phi)$, so $\theta = \operatorname{atan2}\big(r\sin\psi, 1 - r\cos\psi\big)$ with $\psi = \omega - \phi$. Differentiating $\arctan(v/u)$ gives $(uv' - vu')/(u^2 + v^2)$, with $u = 1 - r\cos\psi$, $v = r\sin\psi$, $u' = r\sin\psi$, $v' = r\cos\psi$:

$$
\frac{\dd\theta}{\dd\omega} = \frac{(1 - r\cos\psi)r\cos\psi - r^2\sin^2\psi}{1 - 2r\cos\psi + r^2} = \frac{r\cos\psi - r^2}{1 - 2r\cos\psi + r^2},
$$

and $\tau_g = -\dd\theta/\dd\omega$ is [[#eq-gd-factor]].
:::

Part (2) and part (3) together give the group delay of any rational filter: factor $B(z)$ and $A(z)$ into first-order factors, add [[#eq-gd-factor]] for each zero and subtract it for each pole. A pole close to the unit circle contributes a large positive group delay near its angle, which is why sharp IIR filters have peaks of group delay at their band edges.

::: example Group delay of the exponential smoother {#ex-smoother-delay}
The smoother $H(e^{j\omega}) = (1 - a)/(1 - ae^{-j\omega})$ with $a = 0.9$ is used to average a sensor signal. Find its group delay at $\omega = 0$, at $\omega = 0.1$ and at $\omega = \pi$, and interpret the result.
::: solution
The smoother has one pole at $z = a$ ($r = a$, $\phi = 0$) and no zeros other than at the origin, which contribute nothing. By [[#thm-group-delay]] (2) and (3), the group delay is minus that of the factor $1 - ae^{-j\omega}$:

$$
\tau_g(\omega) = \frac{a\cos\omega - a^2}{1 - 2a\cos\omega + a^2}.
$$

- $\omega = 0$: $\tau_g = \dfrac{a - a^2}{(1 - a)^2} = \dfrac{a}{1 - a} = \dfrac{0.9}{0.1} = 9$ samples.
- $\omega = 0.1$: $\cos0.1 = 0.995004$, so $\tau_g = \dfrac{0.895504 - 0.81}{1 - 1.791008 + 0.81} = \dfrac{0.085504}{0.018992} = 4.50$ samples.
- $\omega = \pi$: $\tau_g = \dfrac{-a - a^2}{(1 + a)^2} = -\dfrac{a}{1 + a} = -0.474$ samples.

At DC the envelope of a slowly varying signal is delayed by $9$ samples, the same "mean delay" $\sum nh[n]/\sum h[n]$ found in the DTFT lesson. The delay halves by $\omega = 0.1$, so a signal whose spectrum spans $0$ to $0.1$ will be distorted, not just delayed. The negative value at $\omega = \pi$ is not a violation of causality: group delay describes envelopes of narrow-band signals, and at $\omega = \pi$ the filter's gain is only $0.1/1.9 = 0.053$.
:::
:::

::: widget plot
f: (a*cos(x) - a^2)/(1 - 2*a*cos(x) + a^2); (1 - a)/sqrt(1 - 2*a*cos(x) + a^2)
x: 0, pi
y: -2, 20
sliders: a=0.9:0:0.95:0.01
piticks: true
labels: \tau_g(\omega)\ \text{(samples)}; \lvert H(e^{j\omega})\rvert
caption: Group delay (blue) and magnitude (orange) of the smoother $(1-a)/(1-ae^{-j\omega})$. Move $a$ towards $1$: the low-pass band narrows and the low-frequency delay $a/(1-a)$ grows sharply, the price of heavy smoothing. Over the passband the delay is far from constant, so a smoothed waveform is distorted as well as delayed — compare a linear-phase FIR average, whose delay is the same at every frequency.
:::

::: warning Wrapped phase
Software computes the phase with $\operatorname{atan2}$, which returns values in $(-\pi, \pi]$. A filter with a delay of $50$ samples has phase $-50\omega$, which wraps around $16$ times between $0$ and $\pi$; the plotted phase is a sawtooth. Differentiating the wrapped phase gives spikes at every wrap. Unwrap the phase (add multiples of $2\pi$ to remove jumps larger than $\pi$) before computing group delay, or compute $\tau_g$ directly from [[#eq-gd-factor]] or from the identity $\tau_g = \operatorname{Re}\{\sum_nn\,h[n]e^{-j\omega n}/H(e^{j\omega})\}$. Jumps of exactly $\pi$ at zeros of $A(\omega)$ are real features, not wrapping artefacts.
:::

## Poles, zeros, all-pass and minimum-phase systems {#sec-poles-zeros}

With $H(z)$ factored as $H(z) = b_0\prod_{k}(1 - c_kz^{-1})/\prod_k(1 - d_kz^{-1})$, the zeros $c_k$ and poles $d_k$ determine everything except the gain. From [[signals-systems/z-transform]]: a causal system is stable if and only if every pole satisfies $\lvert d_k\rvert < 1$; the magnitude response at $\omega$ is the product of distances from $e^{j\omega}$ to the zeros divided by the product of distances to the poles; and a pole (zero) near the unit circle makes a peak (dip) at its angle. Two classes of pole–zero patterns deserve names.

::: definition All-pass and minimum-phase systems {#def-allpass-minphase}
A stable system is **all-pass** if $\lvert H(e^{j\omega})\rvert$ is constant for all $\omega$. A causal, stable system is **minimum-phase** if all its zeros, as well as its poles, lie strictly inside the unit circle (so that its inverse $1/H(z)$ is also causal and stable).
:::

::: theorem The first-order all-pass section {#thm-allpass}
For any complex $a$ with $\lvert a\rvert < 1$, the causal system

$$
H_{ap}(z) = \frac{z^{-1} - a^*}{1 - az^{-1}}
$$ {#eq-allpass}

is stable and all-pass with $\lvert H_{ap}(e^{j\omega})\rvert = 1$. Its pole is at $a$ and its zero at the **conjugate reciprocal** $1/a^*$, outside the unit circle. Its group delay is $\tau_g(\omega) = (1 - \lvert a\rvert^2)/\lvert1 - ae^{-j\omega}\rvert^2 > 0$.
:::

::: proof
On the unit circle, $e^{-j\omega} - a^* = e^{-j\omega}(1 - a^*e^{j\omega}) = e^{-j\omega}\big(1 - ae^{-j\omega}\big)^*$. Taking magnitudes, $\lvert e^{-j\omega} - a^*\rvert = \lvert1 - ae^{-j\omega}\rvert$, so the numerator and denominator of [[#eq-allpass]] have equal magnitude and $\lvert H_{ap}\rvert = 1$. The numerator vanishes at $z^{-1} = a^*$, i.e. $z = 1/a^*$. For the group delay, the identity above shows that the phase of the numerator is $-\omega$ minus the phase of $1 - ae^{-j\omega}$, so by [[#thm-group-delay]] the total group delay is $1 - 2\tau_d$, where $\tau_d$ is the group delay of $1 - ae^{-j\omega}$ from [[#eq-gd-factor]]. With $r = \lvert a\rvert$ and $\psi = \omega - \arg a$, $1 - 2\dfrac{r^2 - r\cos\psi}{1 - 2r\cos\psi + r^2} = \dfrac{1 - r^2}{1 - 2r\cos\psi + r^2}$, which is the stated formula; it is positive because $r < 1$.
:::

All-pass sections change only the phase. They are used as **phase equalisers** (to flatten the group delay of an IIR filter), as fractional delays, and as building blocks of very efficient IIR filters and filter banks. Their importance for theory is that any zero outside the unit circle can be "reflected" inside by an all-pass factor, which gives the following decomposition.

::: theorem Minimum-phase and all-pass decomposition {#thm-minphase-decomp}
Every causal, stable rational $H(z)$ with no zeros on the unit circle can be written as $H(z) = H_{\mathrm{min}}(z)\,H_{ap}(z)$, where $H_{\mathrm{min}}$ is minimum-phase, $H_{ap}$ is all-pass, and $\lvert H_{\mathrm{min}}(e^{j\omega})\rvert = \lvert H(e^{j\omega})\rvert$. Among all causal stable systems with this magnitude response, $H_{\mathrm{min}}$ has the smallest group delay at every frequency.
:::

::: proof
Let $c$ be a zero of $H$ with $\lvert c\rvert > 1$, and write $H(z) = G(z)(1 - cz^{-1})$. Put $a = 1/c^*$, so $\lvert a\rvert < 1$. Then

$$
1 - cz^{-1} = -c\,(z^{-1} - a^*) = -c\,(1 - az^{-1})\cdot\frac{z^{-1} - a^*}{1 - az^{-1}},
$$

which is a factor with a zero at $a$, inside the circle, times the all-pass section [[#eq-allpass]]. (Check: $-c(z^{-1} - a^*) = -cz^{-1} + ca^* = 1 - cz^{-1}$ because $ca^* = c/c = 1$.) Doing this for every zero outside the unit circle moves each one to its conjugate-reciprocal position inside and collects the all-pass factors into $H_{ap}$, whose magnitude is $1$, so the magnitude is unchanged. Each all-pass factor has positive group delay by [[#thm-allpass]], and $\tau_g = \tau_{g,\mathrm{min}} + \tau_{g,ap}$ by [[#thm-group-delay]], so $\tau_g \ge \tau_{g,\mathrm{min}}$ at every frequency.
:::

So the magnitude response does not determine a filter: zeros can be reflected in the unit circle without changing $\lvert H\rvert$. The minimum-phase member of the family has the least delay, and also (a classical result we only illustrate) the **minimum energy delay**: its partial energies $\sum_{n=0}^{m}\lvert h[n]\rvert^2$ are the largest of the family for every $m$.

::: example Splitting a filter into minimum-phase and all-pass parts {#ex-minphase}
Decompose $H(z) = \dfrac{1 - 2z^{-1}}{1 - 0.8z^{-1}}$ into minimum-phase and all-pass factors, and compare the energies of the first samples of $h$ and $h_{\mathrm{min}}$.
::: solution
The zero is at $c = 2$, outside the unit circle; its conjugate reciprocal is $a = 0.5$. Following the proof, $1 - 2z^{-1} = -2(1 - 0.5z^{-1})\dfrac{z^{-1} - 0.5}{1 - 0.5z^{-1}}$, so

$$
H_{\mathrm{min}}(z) = \frac{-2(1 - 0.5z^{-1})}{1 - 0.8z^{-1}},\qquad H_{ap}(z) = \frac{z^{-1} - 0.5}{1 - 0.5z^{-1}}.
$$

(The sign may be moved to either factor; we take $h_{\mathrm{min}}$ with the opposite sign, $2 - z^{-1}$ over $1 - 0.8z^{-1}$, which has the same magnitude.) The impulse responses follow from $\frac{b_0 + b_1z^{-1}}{1 - 0.8z^{-1}}$: $h[0] = b_0$, $h[n] = (0.8b_0 + b_1)(0.8)^{n-1}$ for $n \ge 1$.

- $h$: $b_0 = 1$, $b_1 = -2$: $h = \{1, -1.2, -0.96, -0.768, \dots\}$.
- $h_{\mathrm{min}}$: $b_0 = 2$, $b_1 = -1$: $h_{\mathrm{min}} = \{2, 0.6, 0.48, 0.384, \dots\}$.

Total energies are equal: $1 + 1.44/(1 - 0.64) = 5$ and $4 + 0.36/0.36 = 5$, as they must be because the magnitude responses are equal (Parseval). But the partial energies up to $n = 0, 1, 2, 3$ are $1, 2.44, 3.36, 3.95$ for $h$ and $4, 4.36, 4.59, 4.74$ for $h_{\mathrm{min}}$: the minimum-phase response delivers its energy earlier.
:::
:::

## Designing from the pole–zero plot {#sec-notch}

The simplest filters are designed by placing a few poles and zeros by hand. A zero on the unit circle at angle $\theta_0$ removes the frequency $\theta_0$ completely; a pole just inside, at the same angle, restores the response at nearby frequencies, because close to $\theta_0$ the distances from $e^{j\omega}$ to the zero and to the pole are almost equal. This is the **notch filter**.

::: example Designing a mains-hum notch {#ex-notch}
An ECG is sampled at $f_s = 1\,\mathrm{kHz}$ and contaminated by $50\,\mathrm{Hz}$ interference. Design a second-order IIR notch with zeros at $e^{\pm j\theta_0}$ and poles at $re^{\pm j\theta_0}$ whose $3\,\mathrm{dB}$ stop bandwidth is $4\,\mathrm{Hz}$. Give the difference equation, the gain at DC and at $45$ and $48\,\mathrm{Hz}$.
::: solution
The notch angle is $\theta_0 = 2\pi\cdot50/1000 = 0.1\pi$ ($18^\circ$). For $r$ close to $1$, the same geometric argument as for the resonator of [[signals-systems/z-transform]] shows that the $3\,\mathrm{dB}$ width of the notch is about $2(1 - r)$ radians per sample. The specification is $2\pi\cdot4/1000 = 0.02513\,\mathrm{rad/sample}$, so

$$
r = 1 - \frac{0.02513}{2} = 1 - \frac{\pi\cdot4}{1000} = 0.98743.
$$

Multiplying out the conjugate pairs, $(1 - e^{j\theta_0}z^{-1})(1 - e^{-j\theta_0}z^{-1}) = 1 - 2\cos\theta_0\,z^{-1} + z^{-2}$, and similarly for the poles:

$$
H(z) = \frac{1 - 1.902113\,z^{-1} + z^{-2}}{1 - 1.878210\,z^{-1} + 0.975025\,z^{-2}},
$$

with $2\cos\theta_0 = 1.902113$, $2r\cos\theta_0 = 1.878210$ and $r^2 = 0.975025$. The difference equation is

$$
y[n] = x[n] - 1.902113\,x[n-1] + x[n-2] + 1.878210\,y[n-1] - 0.975025\,y[n-2].
$$

At DC, $H(1) = (2 - 1.902113)/(1 - 1.878210 + 0.975025) = 0.097887/0.096815 = 1.011$, a gain of $+0.10\,\mathrm{dB}$; at $\omega = \pi$ the gain is $1.013$. Numerically, the response is $-0.54\,\mathrm{dB}$ at $45\,\mathrm{Hz}$, $-2.93\,\mathrm{dB}$ at $48\,\mathrm{Hz}$ and $-6.9\,\mathrm{dB}$ at $49\,\mathrm{Hz}$, and the $3\,\mathrm{dB}$ points (relative to the DC gain) are at $47.99$ and $52.01\,\mathrm{Hz}$, a bandwidth of $4.01\,\mathrm{Hz}$, confirming the approximation. If unity DC gain matters, scale the numerator by $1/1.011$.

The price of the narrow notch is a long transient: the poles have radius $0.987$, so the filter's natural response decays by a factor $e$ every $1/(1 - r) \approx 80$ samples, $80\,\mathrm{ms}$. A narrower notch would ring for longer.
:::
:::

::: widget plot
f: 20*log10(abs(2*cos(x) - 2*cos(q))/sqrt((1 - 2*r*cos(q)*cos(x) + r^2*cos(2*x))^2 + (2*r*cos(q)*sin(x) - r^2*sin(2*x))^2))
x: 0, pi
y: -40, 5
sliders: r=0.987:0.8:0.999:0.001; q=0.314:0.05:3:0.001
piticks: true
labels: 20\log_{10}\lvert H(e^{j\omega})\rvert\ \text{(dB)}
caption: Magnitude in decibels of the notch filter with zeros at $e^{\pm jq}$ and poles at $re^{\pm jq}$; the initial values are the $50\,\mathrm{Hz}$ design at $f_s = 1\,\mathrm{kHz}$ ($q = 0.1\pi$). Move $r$ towards $1$ and the notch becomes narrower while its depth stays infinite; move it down to $0.8$ and the "notch" becomes a broad band-stop filter that attenuates everything near $q$. (The numerator is written as $\lvert2\cos\omega - 2\cos q\rvert$, the magnitude of $e^{j\omega} + e^{-j\omega} - 2\cos q$.)
:::

::: quiz
A designer moves the poles of a notch filter from radius $0.99$ to radius $0.999$. What happens?
- [ ] The notch becomes deeper
- [x] The notch becomes about ten times narrower and the filter's transients last about ten times longer
- [ ] The filter becomes unstable
- [ ] Nothing changes, because the zeros determine the notch
::: solution
The depth is already infinite (zeros on the unit circle). The width is about $2(1 - r)$, which drops from $0.02$ to $0.002\,\mathrm{rad/sample}$, and the time constant of the natural response, about $1/(1 - r)$ samples, grows from $100$ to $1000$ samples. Frequency selectivity and time-domain duration trade off against each other. The filter is still stable ($r < 1$), although at radius $0.999$ coefficient rounding becomes a real concern ([[dsp/filter-structures]]).
:::
:::

::: application Where the arithmetic runs
The same difference equation may run on very different hardware. A hearing aid runs fixed-point filters on a custom low-power DSP at a few milliwatts; a phone runs them on DSP cores beside the application processor; an FPGA in a radio base station builds hundreds of multipliers in parallel and computes a long FIR filter in one clock cycle per sample; a laptop runs them in floating point on a general-purpose CPU with vector instructions. The mathematics of this course is the same for all of them; what changes is whether multiplications or memory are expensive, whether arithmetic is fixed or floating point, and how much latency the application can tolerate. Those trade-offs reappear in [[dsp/filter-structures]] and, on the hardware side, in [[embedded-systems/real-time-systems]] and [[computer-architecture]].
:::

::: history
Recursive digital filters were first used in the 1950s and early 1960s to simulate analog systems on computers, notably in speech research at Bell Telephone Laboratories and at MIT Lincoln Laboratory, where Bernard Gold and Charles Rader programmed vocoders as difference equations. James Kaiser's chapter on digital filters in *System Analysis by Digital Computer* (1966) and Gold and Rader's book *Digital Processing of Signals* (1969) turned these techniques into a discipline, and Alan Oppenheim and Ronald Schafer's *Digital Signal Processing* (1975) became its standard textbook. Real-time processing became cheap with single-chip signal processors in the early 1980s, such as Texas Instruments' TMS32010 (1983).
:::

## Where this leads

The rest of the course builds on the computations defined here. [[dsp/discrete-fourier-transform]] samples the DTFT at $N$ frequencies and turns convolution into a block computation; [[dsp/fast-fourier-transform]] makes it cheap. [[dsp/fir-filter-design]] and [[dsp/iir-filter-design]] replace hand-placed poles and zeros with systematic methods that meet a specification; [[dsp/filter-structures]] studies how the difference equation should be arranged when the coefficients and signals have finite word length. Minimum-phase and all-pass ideas return in IIR design, in lattice filters and in the spectral factorisation behind the Wiener filter of [[random-signals/optimal-filtering]].

::: summary
- DSP works with sequences; keep frequencies straight: $\omega = 2\pi f/f_s$ radians per sample, with the Nyquist frequency $f_s/2$ at $\omega = \pi$.
- An LTI system is its impulse response; FIR filters compute the convolution sum directly at $M$ multiply–accumulates per sample, IIR filters compute a difference equation whose cost is independent of the length of $h$.
- The difference equation $y[n] = \sum b_kx[n-k] - \sum a_ky[n-k]$ has $H(z) = B(z)/A(z)$; watch the sign convention for the $a_k$.
- Group delay $\tau_g = -\dd\theta/\dd\omega$ is the delay of a narrow-band envelope; it is constant for linear-phase FIR filters and adds over cascades.
- All-pass sections $(z^{-1} - a^*)/(1 - az^{-1})$ have unit magnitude and positive group delay; reflecting zeros in the unit circle changes only the phase.
- Every causal stable filter is a minimum-phase filter times an all-pass filter; the minimum-phase one has the least delay for its magnitude response.
- A notch is a zero pair on the unit circle with a pole pair just inside; its width is about $2(1 - r)$ and its transient lasts about $1/(1 - r)$ samples.
:::

## Exercises

::: exercise Units of frequency {level=1 check="pi/8"}
A $3\,\mathrm{kHz}$ tone is sampled at $f_s = 48\,\mathrm{kHz}$. Give its frequency in cycles per sample and in radians per sample (the answer box takes radians per sample).
::: solution
$\nu = 3/48 = 0.0625$ cycles per sample, and $\omega = 2\pi\nu = \pi/8 = 0.393\,\mathrm{rad/sample}$. In the "Nyquist $= 1$" convention of filter-design software it would be $3/24 = 0.125$.
:::
:::

::: exercise A convolution {level=1}
Compute the output of the FIR filter $h = \{\underline{1}, 1\}$ for the input $x = \{\underline{1}, 2, 3\}$, and check the sum.
::: solution
$y[n] = x[n] + x[n-1]$: $y = \{\underline{1}, 3, 5, 3\}$. Check: $\sum y = 12 = (\sum h)(\sum x) = 2\times6$.
:::
:::

::: exercise FIR or IIR? {level=1}
For $y[n] = x[n] + 0.5\,x[n-1] - 0.2\,y[n-1]$, write $H(z)$, find its pole and zero, and decide whether the system is FIR or IIR and whether it is stable.
::: solution
In the form [[#eq-difference]], $a_1 = 0.2$, so $H(z) = (1 + 0.5z^{-1})/(1 + 0.2z^{-1})$. Zero at $z = -0.5$, pole at $z = -0.2$. The pole is not cancelled, so the impulse response $h[0] = 1$, $h[n] = 0.3(-0.2)^{n-1}$ for $n \ge 1$ is infinitely long: IIR. The pole is inside the unit circle: stable. It is also minimum-phase, since the zero is inside too.
:::
:::

::: exercise Group delay of a symmetric filter {level=1 check="2"}
What is the group delay, in samples, of the FIR filter $h = \{\underline{1}, 2, 3, 2, 1\}$?
::: solution
The impulse response is symmetric with $M = 5$, so by [[#thm-group-delay]] the group delay is $(M - 1)/2 = 2$ samples at every frequency. (Indeed $H(z) = (1 + z^{-1} + z^{-2})^2$.)
:::
:::

::: exercise A closed-form impulse response {level=2 check="0.369"}
Find $h[n]$ for the causal system $H(z) = 1/(1 - 0.9z^{-1} + 0.2z^{-2})$ and evaluate $h[3]$.
::: solution
Poles: $z^2 - 0.9z + 0.2 = (z - 0.5)(z - 0.4)$. Cover-up: $A = 1/(1 - 0.4/0.5) = 5$, $B = 1/(1 - 0.5/0.4) = -4$, so $h[n] = \big(5(0.5)^n - 4(0.4)^n\big)u[n]$. Then $h[3] = 5(0.125) - 4(0.064) = 0.625 - 0.256 = 0.369$. Recursion check: $h[0] = 1$, $h[1] = 0.9$, $h[2] = 0.81 - 0.2 = 0.61$, $h[3] = 0.549 - 0.18 = 0.369$.
:::
:::

::: exercise Delay of an all-pass section {level=2 check="3"}
For the first-order all-pass $H(z) = (z^{-1} - 0.5)/(1 - 0.5z^{-1})$, find the group delay at $\omega = 0$ and at $\omega = \pi$, in samples. (Enter the value at $\omega = 0$.)
::: solution
By [[#thm-allpass]] with $a = 0.5$: $\tau_g(\omega) = (1 - 0.25)/(1 - \cos\omega + 0.25)$. At $\omega = 0$: $0.75/0.25 = 3$ samples. At $\omega = \pi$: $0.75/2.25 = 0.333$ samples. Low frequencies are delayed most; an all-pass with $a < 0$ would delay high frequencies most. Averaged over $\omega$ the group delay of a first-order all-pass is exactly $1$ sample, because the phase falls by $2\pi$ as $\omega$ goes once around the circle.
:::
:::

::: exercise Same magnitude, different phase {level=2}
Show that $H_1(z) = 1 + 0.5z^{-1}$ and $H_2(z) = 0.5 + z^{-1}$ have the same magnitude response. Which is minimum-phase? Compare their group delays at $\omega = 0$.
::: solution
$\lvert H_2(e^{j\omega})\rvert = \lvert e^{-j\omega}(0.5e^{j\omega} + 1)\rvert = \lvert1 + 0.5e^{j\omega}\rvert = \lvert1 + 0.5e^{-j\omega}\rvert^* = \lvert H_1\rvert$. $H_1$ has its zero at $-0.5$ (minimum-phase); $H_2$ at $-2$. Group delay of $H_1$ at DC from [[#eq-gd-factor]] with $c = -0.5$ ($r = 0.5$, $\phi = \pi$, so $\cos(\omega - \phi) = -1$ at $\omega = 0$): $\tau_1(0) = (0.25 + 0.5)/(1 + 1 + 0.25) = 1/3$ sample, which agrees with the mean delay $\sum nh_1[n]/\sum h_1[n] = 0.5/1.5$. For $H_2$, $\tau_2(0) = \sum nh_2[n]/\sum h_2[n] = 1/1.5 = 2/3$ sample (at DC the group delay of a real filter with $H(1) \ne 0$ equals this mean delay, by the identity of [[#exr-gd-identity]]). The minimum-phase version has the smaller delay; the difference, $1/3$, is the delay of the all-pass $(0.5 + z^{-1})/(1 + 0.5z^{-1})$ at DC, $(1 - 0.25)/(1.5)^2 = 1/3$.
:::
:::

::: exercise Deriving the group delay of a pole {#exr-gd-identity level=3}
Derive the group delay of $H(e^{j\omega}) = 1/(1 - ae^{-j\omega})$ for real $a$ without differentiating an arctangent, using the identity $\tau_g = \operatorname{Re}\big\{\sum_nn\,h[n]e^{-j\omega n}/H(e^{j\omega})\big\}$. First prove the identity.
::: hint
Write $H = \lvert H\rvert e^{j\theta}$ and differentiate $\ln H = \ln\lvert H\rvert + j\theta$ with respect to $\omega$; use the DTFT property $nh[n] \leftrightarrow j\,\dd H/\dd\omega$.
:::
::: solution
From $\ln H = \ln\lvert H\rvert + j\theta$, $\frac{1}{H}\frac{\dd H}{\dd\omega} = \frac{\dd\ln\lvert H\rvert}{\dd\omega} + j\frac{\dd\theta}{\dd\omega}$. Multiply by $j$: $\frac{j\,\dd H/\dd\omega}{H} = j\frac{\dd\ln\lvert H\rvert}{\dd\omega} - \frac{\dd\theta}{\dd\omega}$, whose real part is $-\dd\theta/\dd\omega = \tau_g$. Since $j\,\dd H/\dd\omega$ is the DTFT of $nh[n]$, the identity follows.

For $h[n] = a^nu[n]$: $\sum na^ne^{-j\omega n} = \dfrac{ae^{-j\omega}}{(1 - ae^{-j\omega})^2}$, and dividing by $H = 1/(1 - ae^{-j\omega})$ gives $\dfrac{ae^{-j\omega}}{1 - ae^{-j\omega}}$. Multiply numerator and denominator by $1 - ae^{j\omega}$: $\dfrac{ae^{-j\omega} - a^2}{1 - 2a\cos\omega + a^2}$, whose real part is $\dfrac{a\cos\omega - a^2}{1 - 2a\cos\omega + a^2}$, the result used in [[#ex-smoother-delay]].
:::
:::

::: exercise Designing a DC blocker {level=3 check="(1 - sin(2*pi*20/48000))/cos(2*pi*20/48000)"}
The DC-blocking filter $H(z) = \dfrac{1 + p}{2}\cdot\dfrac{1 - z^{-1}}{1 - pz^{-1}}$ ($0 < p < 1$) removes the DC offset of an audio ADC. Show that it has unit gain at $\omega = \pi$, find $p$ exactly for a $3\,\mathrm{dB}$ cut-off of $20\,\mathrm{Hz}$ at $f_s = 48\,\mathrm{kHz}$, and compare with the approximation $p \approx 1 - \omega_c$.
::: hint
Set $\lvert H(e^{j\omega_c})\rvert^2 = \tfrac12$ with $\lvert1 - e^{-j\omega}\rvert^2 = 2(1 - \cos\omega)$; the equation reduces to a quadratic $cp^2 - 2p + c = 0$ with $c = \cos\omega_c$.
:::
::: solution
At $\omega = \pi$: $\frac{1 + p}{2}\cdot\frac{2}{1 + p} = 1$. With $c = \cos\omega_c$, the condition is $\frac{(1 + p)^2}{4}\cdot\frac{2(1 - c)}{1 - 2pc + p^2} = \frac12$, i.e. $(1 + p)^2(1 - c) = 1 - 2pc + p^2$. Expanding, $p^2 + 2p + 1 - c p^2 - 2cp - c = 1 - 2pc + p^2$, which simplifies to $cp^2 - 2p + c = 0$, so

$$
p = \frac{1 - \sqrt{1 - c^2}}{c} = \frac{1 - \sin\omega_c}{\cos\omega_c}
$$

(the other root exceeds $1$). With $\omega_c = 2\pi\cdot20/48000 = 0.0026180$: $p = 0.997385$, and the approximation gives $1 - \omega_c = 0.997382$, essentially identical (the error is of order $\omega_c^2/2$). The pole is so close to $z = 1$ that in fixed point $p$ must be represented with at least $10$ to $12$ fractional bits; a convenient choice is $p = 1 - 2^{-8} = 0.99609$, which gives a cut-off of about $30\,\mathrm{Hz}$.
:::
:::

::: exercise All-pass group delay is positive {level=3}
Using [[#thm-allpass]] and [[#thm-group-delay]], prove that the group delay of any causal stable all-pass filter of order $N$ (a product of $N$ first-order sections) is positive at every frequency, and that its average over $-\pi < \omega \le \pi$ is exactly $N$ samples.
::: hint
For the average, integrate the group delay: $\frac{1}{2\pi}\int_{-\pi}^{\pi}\tau_g\,\dd\omega = -\frac{1}{2\pi}\big[\theta(\pi) - \theta(-\pi)\big]$. How much does the phase of $(e^{-j\omega} - a^*)/(1 - ae^{-j\omega})$ change as $\omega$ goes once round?
:::
::: solution
By [[#thm-group-delay]] the group delay of a product is the sum of the group delays of the factors, and each factor has $\tau_g = (1 - \lvert a\rvert^2)/\lvert1 - ae^{-j\omega}\rvert^2 > 0$ by [[#thm-allpass]]. A sum of positive terms is positive.

For the average: as $\omega$ increases from $-\pi$ to $\pi$, $1 - ae^{-j\omega}$ traces a circle of radius $\lvert a\rvert < 1$ about $1$, which does not enclose the origin, so its phase returns to its starting value. The numerator $e^{-j\omega} - a^*$ traces a unit circle about $-a^*$, which does enclose the origin, clockwise, so its phase decreases by $2\pi$. Hence each section's phase falls by $2\pi$ and its average group delay is $2\pi/2\pi = 1$ sample. Adding $N$ sections gives an average of $N$ samples. An all-pass filter cannot reduce delay overall: it can only redistribute it between frequencies.
:::
:::
