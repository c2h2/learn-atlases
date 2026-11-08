A telephone codec samples speech at $8\,\mathrm{kHz}$. Suppose it must keep everything up to $1\,\mathrm{kHz}$ to within $0.5\,\mathrm{dB}$ and remove everything above $1.25\,\mathrm{kHz}$ by at least $60\,\mathrm{dB}$, perhaps to separate a low-band signalling channel. An optimal linear-phase FIR filter ([[dsp/fir-filter-design]]) meets that specification with $75$ taps. A recursive filter with only seven poles and seven zeros meets it too — about a fifth of the multiplications per sample, and a delay of a few samples instead of $37$. Such filters are **infinite impulse response (IIR)** filters, and the classical way of designing them is not to place poles and zeros by hand but to borrow a century of analog filter theory: design a Butterworth, Chebyshev or elliptic filter in the $s$-plane, then map it into the $z$-plane.

This chapter develops that route. We first recall the analog **prototypes** and derive how their order follows from a specification. We then study two mappings from $s$ to $z$. **Impulse invariance** samples the impulse response of the analog filter; it preserves the time-domain behaviour but aliases the frequency response. The **bilinear transform** is an algebraic substitution that maps the whole imaginary axis onto the unit circle once; it never aliases but compresses the frequency axis, which we undo by **pre-warping**. We finish with frequency transformations to high-pass and band-pass filters and with an honest comparison of IIR and FIR designs. The analog background — Butterworth responses and second-order sections — is in [[circuits-2/filters]]; the $z$-plane tools are those of [[dsp/discrete-time-systems]].

## Analog prototypes {#sec-prototypes}

Analog filter design is a mature subject with closed-form answers. For a low-pass magnitude specification, four families cover nearly all needs. All are defined through the **squared magnitude** $\lvert H_c(j\Omega)\rvert^2$, because that is what a specification constrains and because a squared magnitude that is a rational function of $\Omega^2$ can always be factored into a stable $H_c(s)$. We write $\Omega$ for analog frequency in rad/s, keeping $\omega$ for digital frequency in rad/sample.

::: definition Butterworth and Chebyshev prototypes {#def-prototypes}
A low-pass filter of order $N$ with passband edge $\Omega_p$ is

- **Butterworth** if $\lvert H_c(j\Omega)\rvert^2 = \dfrac{1}{1 + \varepsilon^2(\Omega/\Omega_p)^{2N}}$;
- **Chebyshev type I** if $\lvert H_c(j\Omega)\rvert^2 = \dfrac{1}{1 + \varepsilon^2T_N^2(\Omega/\Omega_p)}$,

where $T_N$ is the **Chebyshev polynomial** of degree $N$,

$$
T_N(x) = \begin{cases}\cos(N\arccos x), & \lvert x\rvert \le 1,\\ \cosh(N\operatorname{arcosh}x), & x > 1,\end{cases}
$$ {#eq-chebyshev-poly}

which satisfies $T_0 = 1$, $T_1 = x$ and $T_{N+1}(x) = 2xT_N(x) - T_{N-1}(x)$. The parameter $\varepsilon$ fixes the passband edge attenuation: $A_p = 10\log_{10}(1 + \varepsilon^2)$ decibels. A **Chebyshev type II** (inverse Chebyshev) filter has a flat passband and equal ripples in the stopband; an **elliptic** (Cauer) filter has equal ripples in both bands, with $T_N$ replaced by a Chebyshev rational function built from Jacobi elliptic functions.
:::

The Butterworth response is **maximally flat**: the first $2N - 1$ derivatives of $\lvert H_c\rvert^2$ vanish at $\Omega = 0$, and the magnitude falls monotonically. The Chebyshev type I response trades that flatness for steepness: on $\lvert x\rvert \le 1$, $T_N(x) = \cos(N\arccos x)$ oscillates between $-1$ and $1$, so the passband gain ripples between $1$ and $1/\sqrt{1 + \varepsilon^2}$ exactly $N$ times; beyond the edge $T_N$ grows like $2^{N-1}x^N$, much faster than $x^N$. The elliptic filter goes further, placing zeros of transmission on the $j\Omega$ axis in the stopband, and is the steepest possible for a given order. Bessel filters, which approximate linear phase, are poorly preserved by the mappings below and are rarely used as digital prototypes.

::: widget plot
f: -10*log10(1 + e2*x^(2*N)); -10*log10(1 + e2*if(x < 1, cos(N*acos(x)), cosh(N*acosh(x)))^2)
x: 0, 3
y: -80, 2
sliders: N=5:1:10:1; e2=0.2589:0.01:1:0.01
hlines: -40
vlines: 1; 2
labels: \text{Butterworth}; \text{Chebyshev I}
caption: Magnitude in decibels of Butterworth (blue) and Chebyshev type I (orange) prototypes of order $N$, with frequency normalised to the passband edge ($x = \Omega/\Omega_p$) and the same edge attenuation $10\log_{10}(1 + \varepsilon^2)$; the initial $\varepsilon^2 = 0.2589$ is a $1\,\mathrm{dB}$ edge. At $x = 2$ a fifth-order Chebyshev filter is already below $-40\,\mathrm{dB}$ while the Butterworth filter of the same order has reached only about $-24\,\mathrm{dB}$. Increase $\varepsilon^2$: the Chebyshev passband ripple grows and its stopband deepens. The Chebyshev filter buys steepness with passband ripple.
:::

### Poles and order

The squared magnitude does not yet tell us $H_c(s)$. We need its poles.

::: theorem Poles of the Butterworth filter {#thm-butter-poles}
Let $\Omega_c = \Omega_p\varepsilon^{-1/N}$ be the $3\,\mathrm{dB}$ frequency, so that $\lvert H_c\rvert^2 = 1/(1 + (\Omega/\Omega_c)^{2N})$. The stable Butterworth filter is $H_c(s) = \Omega_c^N/\prod_{k=1}^{N}(s - s_k)$ with poles

$$
s_k = \Omega_c\,e^{j\pi(2k + N - 1)/(2N)},\qquad k = 1, 2, \dots, N,
$$ {#eq-butter-poles}

equally spaced on a circle of radius $\Omega_c$ in the left half-plane.
:::

::: proof
For real coefficients $H_c(-j\Omega) = H_c^*(j\Omega)$, so $\lvert H_c(j\Omega)\rvert^2 = H_c(s)H_c(-s)$ at $s = j\Omega$. Replace $\Omega$ by $s/j$: $H_c(s)H_c(-s) = 1/(1 + (s/j\Omega_c)^{2N})$. Its poles solve $(s/j\Omega_c)^{2N} = -1 = e^{j\pi(2k - 1)}$, i.e. $s = j\Omega_c e^{j\pi(2k - 1)/(2N)} = \Omega_c e^{j\pi(2k - 1 + N)/(2N)}$ for $k = 1, \dots, 2N$. These $2N$ points are spaced by $\pi/N$ on the circle $\lvert s\rvert = \Omega_c$, symmetric about both axes; none lies on the imaginary axis because $(2k - 1 + N)/(2N)$ is never exactly $\tfrac12$ or $\tfrac32$ in a way that would need $2k - 1 = 0$ or $2N$. If $s_k$ is a pole of $H_c(s)H_c(-s)$, so is $-s_k$; assigning the $N$ left-half-plane poles to $H_c(s)$ makes it stable, and these are $k = 1, \dots, N$, whose angles run from $\pi/2 + \pi/(2N)$ to $3\pi/2 - \pi/(2N)$. The numerator $\Omega_c^N$ makes $H_c(0) = 1$, since $\prod(-s_k) = \Omega_c^N$.
:::

For $N = 4$ the poles are at angles $112.5^\circ$, $157.5^\circ$, $202.5^\circ$ and $247.5^\circ$: two conjugate pairs, $-0.3827 \pm j0.9239$ and $-0.9239 \pm j0.3827$ times $\Omega_c$, which is how a fourth-order Butterworth filter is built as two second-order sections. Chebyshev poles lie on an ellipse whose minor axis shrinks as $\varepsilon$ grows; their formulas are in every filter handbook and in the references.

::: theorem Order of Butterworth and Chebyshev filters {#thm-order}
Let a low-pass filter have attenuation at most $A_p$ decibels up to $\Omega_p$ and at least $A_s$ decibels beyond $\Omega_s$. Put $\varepsilon = \sqrt{10^{A_p/10} - 1}$, $A = \sqrt{10^{A_s/10} - 1}$ and the **selectivity** $\Omega_s/\Omega_p$. The smallest orders that meet the specification are

$$
N_{\mathrm{B}} = \left\lceil\frac{\log_{10}(A/\varepsilon)}{\log_{10}(\Omega_s/\Omega_p)}\right\rceil,\qquad N_{\mathrm{C}} = \left\lceil\frac{\operatorname{arcosh}(A/\varepsilon)}{\operatorname{arcosh}(\Omega_s/\Omega_p)}\right\rceil
$$ {#eq-order}

for the Butterworth and Chebyshev (type I or II) responses.
:::

::: proof
Both responses are monotonic beyond $\Omega_p$, so the stopband requirement need only hold at $\Omega_s$: $10\log_{10}(1 + \varepsilon^2F^2) \ge A_s$, where $F = (\Omega_s/\Omega_p)^N$ for Butterworth and $F = T_N(\Omega_s/\Omega_p)$ for Chebyshev. This is $\varepsilon^2F^2 \ge 10^{A_s/10} - 1 = A^2$, i.e. $F \ge A/\varepsilon$. For Butterworth, take logarithms: $N\log_{10}(\Omega_s/\Omega_p) \ge \log_{10}(A/\varepsilon)$. For Chebyshev, $\Omega_s/\Omega_p > 1$ so $T_N = \cosh(N\operatorname{arcosh}(\Omega_s/\Omega_p)) \ge A/\varepsilon$, and $\cosh$ is increasing on $[0, \infty)$. The passband condition holds by the choice of $\varepsilon$. Type II has the same order because its squared magnitude is $1 - \lvert H_I\rvert^2$ evaluated at the reciprocal frequency, which swaps the roles of the bands.
:::

The ratio $A/\varepsilon$ is the **discrimination** — how much more the stopband must be attenuated than the passband edge — and $\Omega_s/\Omega_p$ is how much room there is to do it. Because $\operatorname{arcosh}x \approx \ln 2x$ grows like a logarithm but $\operatorname{arcosh}$ of a number near $1$ is much larger than $\log_{10}$ of it, the Chebyshev advantage is greatest for sharp filters. For the elliptic filter the order is given by a ratio of complete elliptic integrals; in practice one calls `ellipord`.

::: example Orders for an anti-aliasing specification {#ex-orders}
An analog low-pass filter must attenuate by at most $1\,\mathrm{dB}$ up to $1\,\mathrm{kHz}$ and by at least $40\,\mathrm{dB}$ beyond $2\,\mathrm{kHz}$. Find the Butterworth and Chebyshev orders.
::: solution
$\varepsilon = \sqrt{10^{0.1} - 1} = 0.5088$ and $A = \sqrt{10^4 - 1} = 99.995$, so $A/\varepsilon = 196.5$. The selectivity is $2$ (the ratio is the same in hertz or rad/s). Then

$$
N_{\mathrm{B}} = \left\lceil\frac{\log_{10}196.5}{\log_{10}2}\right\rceil = \lceil 2.293/0.301\rceil = \lceil 7.62\rceil = 8,\qquad N_{\mathrm{C}} = \left\lceil\frac{\operatorname{arcosh}196.5}{\operatorname{arcosh}2}\right\rceil = \lceil 5.974/1.317\rceil = \lceil 4.54\rceil = 5.
$$

An eighth-order Butterworth filter needs four op-amp sections; a fifth-order Chebyshev filter needs three (two second-order and one first-order). The elliptic filter would need order $4$.
:::
:::

## Impulse invariance {#sec-impulse-invariance}

The most direct way to make a digital copy of an analog filter is to sample its impulse response.

::: definition Impulse-invariant design {#def-impulse-invariance}
Given a causal analog filter with impulse response $h_c(t)$ and a sampling interval $T$, the **impulse-invariant** digital filter has

$$
h[n] = T\,h_c(nT),\qquad n \ge 0 .
$$ {#eq-ii}

The factor $T$ makes the gain of the digital filter match that of the analog one at low frequencies when $T$ is small.
:::

::: theorem Frequency response and poles under impulse invariance {#thm-ii}
(a) The frequency response of the impulse-invariant filter is

$$
H(e^{j\omega}) = \sum_{k=-\infty}^{\infty}H_c\Big(j\frac{\omega - 2\pi k}{T}\Big).
$$ {#eq-ii-alias}

(b) If $H_c(s) = \sum_{k=1}^{N}\dfrac{A_k}{s - s_k}$ has distinct poles, then

$$
H(z) = \sum_{k=1}^{N}\frac{TA_k}{1 - e^{s_kT}z^{-1}} ,
$$ {#eq-ii-pf}

so each analog pole $s_k$ becomes a digital pole $z_k = e^{s_kT}$, and a stable analog filter gives a stable digital filter.
:::

::: proof
(a) Sampling a continuous-time signal at interval $T$ makes its spectrum periodic: by the sampling theorem of [[signals-systems/sampling]], the DTFT of $x[n] = x_c(nT)$ is $\frac1T\sum_kX_c(j(\omega - 2\pi k)/T)$. Apply this to $x_c = h_c$ and multiply by $T$.

(b) The inverse Laplace transform of $A_k/(s - s_k)$ is $A_ke^{s_kt}u(t)$, so $h[n] = T\sum_kA_ke^{s_kTn}u[n] = T\sum_kA_k(e^{s_kT})^nu[n]$. Each term is a geometric sequence whose $z$-transform is $TA_k/(1 - e^{s_kT}z^{-1})$. If $\operatorname{Re}s_k < 0$ then $\lvert z_k\rvert = e^{\operatorname{Re}(s_k)T} < 1$.
:::

The pole map $z = e^{sT}$ is exactly the relation between the $s$- and $z$-planes met in [[signals-systems/z-transform]]: a strip of height $2\pi/T$ of the left half-plane covers the whole unit disc. The zeros do not map this way — they are whatever the partial-fraction sum produces — and the frequency response is the analog response *plus all its aliases*, [[#eq-ii-alias]]. If $H_c(j\Omega)$ is negligible for $\lvert\Omega\rvert > \pi/T$, the aliases are small and $H(e^{j\omega}) \approx H_c(j\omega/T)$, a faithful copy with $\Omega = \omega/T$. If it is not, the tails fold back into the band.

::: example Impulse invariance on a first-order low-pass filter {#ex-ii-rc}
An $RC$ low-pass filter with $3\,\mathrm{dB}$ frequency $1\,\mathrm{kHz}$ is to be imitated digitally at $f_s = 8\,\mathrm{kHz}$ by impulse invariance. Find $H(z)$, its gain at DC and at $\omega = \pi$, and compare with the analog filter.
::: solution
$H_c(s) = \Omega_c/(s + \Omega_c)$ with $\Omega_c = 2\pi\times1000 = 6283\,\mathrm{rad/s}$ and $T = 125\,\mathrm{\mu s}$, so $\Omega_cT = \pi/4 = 0.7854$. By [[#eq-ii-pf]] with $A_1 = \Omega_c$, $s_1 = -\Omega_c$:

$$
H(z) = \frac{\Omega_cT}{1 - e^{-\Omega_cT}z^{-1}} = \frac{0.7854}{1 - 0.4559z^{-1}} .
$$

At DC, $H(1) = 0.7854/0.5441 = 1.444$ ($+3.2\,\mathrm{dB}$), not $1$; at $\omega = \pi$, $H(-1) = 0.7854/1.4559 = 0.539$ ($-5.4\,\mathrm{dB}$). The analog filter at the corresponding frequency $f_s/2 = 4\,\mathrm{kHz}$ gives $1/\sqrt{1 + 16} = 0.243$ ($-12.3\,\mathrm{dB}$). Even after normalising the DC gain to $1$, the digital filter is only $-8.5\,\mathrm{dB}$ at $\omega = \pi$. Both discrepancies are aliasing: the first-order response decays only as $1/\Omega$, so the sum [[#eq-ii-alias]] adds a substantial contribution from every image. Impulse invariance suits filters whose responses are already small at half the sampling rate — sharply band-limited low-pass and band-pass designs — and is unsuitable for high-pass and band-stop filters, whose responses never die away.
:::
:::

::: application Where impulse invariance is the right answer
When the *time-domain* behaviour of an analog system must be reproduced — the impulse response of a room for an artificial reverberator, the transient of a plant model in a control simulation, a resonance of a musical instrument body — impulse invariance (or its sibling, **step invariance**, which samples the step response and is the "zero-order hold equivalent" of digital control, [[control-systems/digital-control]]) matches the samples exactly. Its frequency response is then a by-product, and the aliasing is the price of exactness in time.
:::

## The bilinear transform {#sec-bilinear}

To avoid aliasing altogether we need a map that sends the *entire* imaginary axis of the $s$-plane onto the unit circle exactly once. A rational map of first degree does this.

::: definition Bilinear transform {#def-bilinear}
The **bilinear transform** designs the digital filter

$$
H(z) = H_c(s)\Big|_{s = \frac{2}{T}\frac{1 - z^{-1}}{1 + z^{-1}}} .
$$ {#eq-bilinear}

Its inverse is $z = \dfrac{1 + sT/2}{1 - sT/2}$.
:::

The substitution can be motivated by numerical integration: the analog integrator $1/s$ becomes $\frac T2\frac{1 + z^{-1}}{1 - z^{-1}}$, which is the trapezoidal rule $y[n] = y[n - 1] + \frac T2(x[n] + x[n - 1])$. Replacing every integrator in a block diagram of $H_c$ by its trapezoidal approximation gives [[#eq-bilinear]]. That is why control engineers know it as **Tustin's method**.

::: theorem Properties of the bilinear transform {#thm-bilinear}
The map $z = (1 + sT/2)/(1 - sT/2)$

1. sends the open left half-plane $\operatorname{Re}s < 0$ onto the open unit disc $\lvert z\rvert < 1$, so stable analog filters become stable digital filters of the same order;
2. sends the imaginary axis $s = j\Omega$ onto the unit circle $z = e^{j\omega}$, one-to-one, with
$$
\Omega = \frac2T\tan\frac\omega2,\qquad \omega = 2\arctan\frac{\Omega T}{2};
$$ {#eq-warp}
3. so that $H(e^{j\omega}) = H_c\big(j\tfrac2T\tan\tfrac\omega2\big)$ exactly, with no aliasing.
:::

::: proof
Write $s = \sigma + j\Omega$ and $a = T/2 > 0$. Then

$$
\lvert z\rvert^2 = \frac{(1 + a\sigma)^2 + (a\Omega)^2}{(1 - a\sigma)^2 + (a\Omega)^2},
$$

which is less than $1$ exactly when $(1 + a\sigma)^2 < (1 - a\sigma)^2$, i.e. $4a\sigma < 0$, i.e. $\sigma < 0$. Equality $\lvert z\rvert = 1$ holds exactly when $\sigma = 0$. On $s = j\Omega$, $z = (1 + ja\Omega)/(1 - ja\Omega)$ is a ratio of complex conjugates, so its angle is twice the angle of the numerator: $\omega = 2\arctan(a\Omega)$. As $\Omega$ runs from $-\infty$ to $\infty$, $\omega$ runs once from $-\pi$ to $\pi$; inverting gives $\Omega = \frac1a\tan(\omega/2)$. Part 3 follows by evaluating [[#eq-bilinear]] at $z = e^{j\omega}$: $\frac{1 - e^{-j\omega}}{1 + e^{-j\omega}} = \frac{e^{j\omega/2} - e^{-j\omega/2}}{e^{j\omega/2} + e^{-j\omega/2}} = j\tan\frac\omega2$. The order is unchanged because each factor $s - s_k$ becomes a ratio of two first-degree polynomials in $z^{-1}$.
:::

The digital response is therefore the analog response *read on a distorted frequency axis*. Every feature of $\lvert H_c\rvert$ — equal ripples, monotonic decay, the value at an edge — survives exactly, but at a different frequency. Near DC, $\tan(\omega/2) \approx \omega/2$ and $\Omega \approx \omega/T$, the natural correspondence; towards $\omega = \pi$ the analog axis is compressed without limit, the point $\Omega = \infty$ landing at $\omega = \pi$. In particular, an analog zero at infinity (every all-pole low-pass prototype has $N$ of them) becomes a zero at $z = -1$, which is why bilinear low-pass filters have an exact null at the Nyquist frequency.

::: widget plot
f: 2*tan(x/2); x
x: 0, 3
y: 0, 8
labels: \Omega T = 2\tan(\omega/2)\ \text{(bilinear)}; \Omega T = \omega\ \text{(no warping)}
caption: Frequency warping of the bilinear transform: the analog frequency $\Omega T$ (vertical) that lands at each digital frequency $\omega$ (horizontal). Up to about $\omega = 0.4$ ($6\%$ of the sampling rate) the curves agree within $1.5\%$. Hover at $\omega = \pi/2$ (a quarter of the sampling rate): the analog frequency is $\Omega T = 2$, not $1.571$, so an analog edge must be placed $27\%$ higher than the naive value. As $\omega \to \pi$ the whole infinite analog stopband is squeezed into a vanishing interval.
:::

The warping is harmless for a piecewise-constant specification, because only the band *edges* matter: we simply design the analog filter for edges that the warp will carry to the right places.

::: algorithm Bilinear IIR design with pre-warping {#alg-bilinear}
Given digital edges $\omega_p$, $\omega_s$ (rad/sample) and attenuations $A_p$, $A_s$:

1. **Pre-warp** the edges: $\Omega_p = \frac2T\tan\frac{\omega_p}2$, $\Omega_s = \frac2T\tan\frac{\omega_s}2$. (Any $T$ may be used; it cancels. Taking $T = 2$ gives $\Omega = \tan(\omega/2)$.)
2. Choose a prototype and find its order from [[#eq-order]] (or `ellipord`) with these analog edges.
3. Design $H_c(s)$ — poles from [[#eq-butter-poles]] or a table — and scale it to the pre-warped edge.
4. Substitute [[#eq-bilinear]], preferably section by section: factor $H_c$ into first- and second-order sections and transform each one.
5. Check the digital response against the specification.
:::

::: example A second-order Butterworth low-pass filter {#ex-bilinear-butter2}
Design a second-order Butterworth digital low-pass filter with its $3\,\mathrm{dB}$ point at $1\,\mathrm{kHz}$ for $f_s = 8\,\mathrm{kHz}$, and locate its poles.
::: solution
The digital cut-off is $\omega_c = 2\pi\times1000/8000 = \pi/4$. With $T = 2$, the pre-warped analog cut-off is $K = \tan(\pi/8) = \sqrt2 - 1 = 0.41421$. The analog prototype is $H_c(s) = K^2/(s^2 + \sqrt2Ks + K^2)$. Substituting $s = (1 - z^{-1})/(1 + z^{-1})$ and multiplying numerator and denominator by $(1 + z^{-1})^2$:

$$
H(z) = \frac{K^2(1 + z^{-1})^2}{(1 + \sqrt2K + K^2) + 2(K^2 - 1)z^{-1} + (1 - \sqrt2K + K^2)z^{-2}} .
$$

Numerically $K^2 = 0.17157$, $1 + \sqrt2K + K^2 = 1.75736$, $2(K^2 - 1) = -1.65685$ and $1 - \sqrt2K + K^2 = 0.58579$. Dividing by $1.75736$,

$$
H(z) = \frac{0.097631\,(1 + 2z^{-1} + z^{-2})}{1 - 0.942809z^{-1} + 0.333333z^{-2}} .
$$

Checks: $H(1) = 0.097631\times4/(1 - 0.942809 + 0.333333) = 0.390524/0.390524 = 1$; at $\omega = \pi/4$ the magnitude is $-3.010\,\mathrm{dB}$ exactly, as the pre-warping intended; at $\omega = \pi/2$ it is $-15.4\,\mathrm{dB}$ and at $\omega = \pi$ it is zero (double zero at $z = -1$). The poles solve $z^2 - 0.942809z + 0.333333 = 0$: $z = 0.4714 \pm j0.3333$, of radius $1/\sqrt3 = 0.5774$. Without pre-warping (analog cut-off $\Omega_cT/2 = \pi/8 = 0.3927$ instead of $0.4142$) the digital $3\,\mathrm{dB}$ point would fall at $2\arctan(0.3927)\times f_s/2\pi = 953\,\mathrm{Hz}$, about $5\%$ low.
:::
:::

::: warning Pre-warp the edges, not the whole filter
Pre-warping corrects frequencies only at the points you pre-warp; it cannot make the digital response a scaled copy of the analog one at every frequency. A bilinear Bessel filter loses its nearly linear phase, and a bilinear version of a resonance placed at the wrong frequency will be "detuned". Equally common is a units slip: the warp formula needs $\omega$ in rad/sample and returns $\Omega$ in rad/s. Forgetting the factor $2\pi$ when converting hertz, or pre-warping with $\tan\omega$ instead of $\tan(\omega/2)$, produces a filter whose edges are wrong by tens of percent.
:::

::: quiz
A digital low-pass filter for $f_s = 48\,\mathrm{kHz}$ must have its passband edge at $12\,\mathrm{kHz}$. With $T = 1/f_s$, at what analog frequency should the prototype's edge be placed?
- [ ] $12\,\mathrm{kHz}$
- [x] About $15.3\,\mathrm{kHz}$
- [ ] About $9.4\,\mathrm{kHz}$
- [ ] $24\,\mathrm{kHz}$
::: solution
$\omega_p = 2\pi\times12/48 = \pi/2$, so $\Omega_p = 2f_s\tan(\pi/4) = 96\,000\,\mathrm{rad/s}$, i.e. $96\,000/2\pi = 15.28\,\mathrm{kHz}$. The analog edge is higher because the bilinear transform compresses high frequencies.
:::
:::

A useful consequence of [[#thm-bilinear]] for the Butterworth family is a closed form for the digital magnitude: substituting $\Omega/\Omega_c = \tan(\omega/2)/\tan(\omega_c/2)$,

$$
\lvert H(e^{j\omega})\rvert^2 = \frac{1}{1 + \Big(\dfrac{\tan(\omega/2)}{\tan(\omega_c/2)}\Big)^{2N}} .
$$ {#eq-digital-butter}

::: widget plot
f: -10*log10(1 + (tan(x/2)/tan(w/2))^(2*N)); -10*log10(1 + (x/w)^(2*N))
x: 0, pi
y: -80, 2
sliders: N=4:1:12:1; w=0.785:0.1:2.5:0.005
piticks: true
hlines: -3
labels: \text{bilinear Butterworth}; \text{analog response at }\Omega = \omega/T
caption: The magnitude in decibels of an $N$-th-order bilinear Butterworth filter with cut-off $\omega_c = w$ (blue), against the analog Butterworth response read with the naive correspondence $\Omega = \omega/T$ (orange). Both pass through $-3\,\mathrm{dB}$ at $\omega_c$ because the cut-off was pre-warped. Away from it the digital filter is steeper and plunges to $-\infty$ at $\omega = \pi$, where all its zeros sit. Move $w$ above $2$: the difference becomes dramatic, because warping is strongest near the Nyquist frequency.
:::

## A complete design {#sec-design}

::: example An elliptic filter against an equiripple FIR filter {#ex-elliptic-design}
Design a digital low-pass filter for $f_s = 8\,\mathrm{kHz}$ with at most $0.5\,\mathrm{dB}$ attenuation up to $1\,\mathrm{kHz}$ and at least $60\,\mathrm{dB}$ above $1.25\,\mathrm{kHz}$. Compare the orders of the Butterworth, Chebyshev and elliptic bilinear designs with an equiripple FIR filter, and the cost per sample.
::: solution
**Edges.** $\omega_p = 2\pi\times1000/8000 = 0.25\pi$ and $\omega_s = 2\pi\times1250/8000 = 0.3125\pi$. Pre-warping with $T = 2$: $\Omega_p = \tan(0.125\pi) = 0.41421$, $\Omega_s = \tan(0.15625\pi) = 0.53451$, selectivity $1.2904$ (the unwarped ratio $1.25$ would underestimate it).

**Discrimination.** $\varepsilon = \sqrt{10^{0.05} - 1} = 0.34931$, $A = \sqrt{10^6 - 1} = 1000.0$, so $A/\varepsilon = 2862.8$.

**Orders.** From [[#eq-order]], $N_{\mathrm B} = \lceil\log_{10}2862.8/\log_{10}1.2904\rceil = \lceil 3.457/0.1107\rceil = \lceil31.2\rceil = 32$ and $N_{\mathrm C} = \lceil\operatorname{arcosh}2862.8/\operatorname{arcosh}1.2904\rceil = \lceil 8.653/0.7448\rceil = \lceil 11.6\rceil = 12$. The elliptic order (from `ellipord`) is $7$.

**The elliptic design.** Designing the seventh-order elliptic prototype and applying [[#eq-bilinear]] section by section gives one first-order section and three second-order sections. Its pole radii are $0.754$, $0.820$, $0.918$ and $0.978$; measured on a fine grid, the passband attenuation never exceeds $0.500\,\mathrm{dB}$ and the stopband peak is $-60.0\,\mathrm{dB}$, so the specification is met with nothing to spare — the elliptic filter is optimal.

**FIR comparison.** The ripples are $\delta_p = (10^{0.025} - 1)/(10^{0.025} + 1) = 0.0288$ and $\delta_s = 0.001$. [[dsp/fir-filter-design#eq-pm-order]] estimates $M \approx (-10\log_{10}(2.88\times10^{-5}) - 13)/(2.324\times0.0625\pi) = 32.4/0.4563 = 71$; the Parks–McClellan program needs $M = 74$, $75$ taps, after checking.

**Cost.** A second-order section with numerator $b_0 + b_1z^{-1} + b_2z^{-2}$ and denominator $1 + a_1z^{-1} + a_2z^{-2}$ costs $5$ multiplications, a first-order section $3$, so the elliptic filter costs $3\times5 + 3 = 18$ multiplications per sample (fewer with scaled sections whose numerators are $1 + b_1z^{-1} + z^{-2}$). The symmetric FIR filter needs $38$ (one per coefficient pair, [[dsp/filter-structures]]). The elliptic filter is about twice as cheap and its delay at low frequencies is $5.5$ samples instead of $37$. But its group delay rises to about $24$ samples near the passband edge: it is far from linear phase.
:::
:::

### Other frequency-selective filters

High-pass, band-pass and band-stop filters are obtained by transforming a low-pass prototype with passband edge $1\,\mathrm{rad/s}$. In the analog domain the standard substitutions are

$$
\begin{aligned}
\text{low-pass} \to \text{high-pass:}\quad & s \to \frac{\Omega_p}{s},\\
\text{low-pass} \to \text{band-pass:}\quad & s \to \frac{s^2 + \Omega_0^2}{Bs},\qquad \Omega_0^2 = \Omega_1\Omega_2,\ B = \Omega_2 - \Omega_1,\\
\text{low-pass} \to \text{band-stop:}\quad & s \to \frac{Bs}{s^2 + \Omega_0^2},
\end{aligned}
$$ {#eq-freq-transform}

after which the bilinear transform is applied with all edges pre-warped. The band-pass map sends $\Omega_1$ and $\Omega_2$ to the prototype edges $\mp1$ and $\Omega_0$ to DC, and doubles the order. Equivalent substitutions can be made directly in the $z$-plane (Constantinides' all-pass transformations $z^{-1} \to \pm\frac{z^{-1} - \alpha}{1 - \alpha z^{-1}}$ and their second-order versions), which convert a digital low-pass filter into any other band without returning to $s$. For example, the low-pass-to-high-pass transformation with $z^{-1} \to -z^{-1}$ reflects the response about $\omega = \pi/2$: $H(-z)$ has the magnitude of $H(z)$ at $\pi - \omega$.

::: quiz
Why does impulse invariance fail for a high-pass prototype, while the bilinear transform works?
- [ ] The high-pass filter's poles are in the right half-plane
- [x] A high-pass response does not decay with frequency, so the aliases in [[#eq-ii-alias]] overlap everywhere; the bilinear transform maps the whole $j\Omega$ axis onto the circle without aliasing
- [ ] The bilinear transform changes the order of the filter
- [ ] Impulse invariance cannot produce zeros
::: solution
The images $H_c(j(\omega - 2\pi k)/T)$ of a high-pass response are all near $1$ at high frequencies, so their sum does not converge to anything resembling $H_c$. The bilinear transform compresses $\Omega \in (-\infty, \infty)$ onto $\omega \in (-\pi, \pi]$ and never overlaps.
:::
:::

## IIR or FIR? {#sec-iir-vs-fir}

The comparison in [[#ex-elliptic-design]] is typical. IIR filters designed from analog prototypes are very economical for sharp magnitude specifications, and their delay is small. Their disadvantages are:

- **Phase.** A causal stable IIR filter cannot have exactly linear phase (its impulse response would have to be symmetric and therefore finite). The elliptic filter is the worst offender, with group delay peaking at the passband edge. When phase matters it can be equalised with an all-pass filter ([[dsp/discrete-time-systems#thm-allpass]]), at extra cost, or the data can be filtered forwards and backwards offline for zero phase.
- **Finite precision.** Sharp IIR filters have poles close to the unit circle (radius $0.978$ above), whose positions are very sensitive to coefficient rounding; they need careful structures and scaling to avoid overflow and limit cycles ([[dsp/filter-structures]]). FIR filters cannot become unstable.
- **Flexibility.** The classical prototypes give only standard band shapes. Arbitrary responses — equalisers, differentiators, multi-band filters — are much easier with FIR methods or with direct numerical optimisation of the poles and zeros.

Roughly: when the phase does not matter, the specification is sharp and the processor is small (audio tone controls, hum and DC removal, detectors, biomedical and sensor conditioning), use an IIR filter. When waveform shape matters or the sampling rate is to be changed, use a linear-phase FIR filter.

::: history
Stephen Butterworth described the maximally flat filter in his 1930 paper "On the Theory of Filter Amplifiers" in *Wireless Engineer*, building it from valve amplifier stages separated by $RC$ and $LC$ networks. Wilhelm Cauer developed the theory of filters with equal ripples in both bands using elliptic functions in the early 1930s, and Sidney Darlington's insertion-loss synthesis of 1939 made such responses realisable as passive ladders; Pafnuty Chebyshev's polynomials, which give the filters their name, date from his work on minimax approximation of the 1850s. In digital filtering, Arnold Tustin introduced the bilinear substitution in 1947 for analysing sampled control systems, and Roger Golden and James Kaiser's 1964 paper on sampled-data filters in the *Bell System Technical Journal* gave both impulse invariance and the bilinear transform with pre-warping as design methods. Anthony Constantinides published the digital frequency transformations in 1970.
:::

## Where this leads

The difference equations designed here must still be computed. [[dsp/filter-structures]] compares direct, cascade and parallel realisations and shows why the sections of [[#ex-elliptic-design]] should be ordered and scaled with care when the arithmetic has finite word length. IIR filters reappear as the cheap filters in [[dsp/multirate-processing]] (half-band and polyphase IIR filters), and as the autoregressive models of [[dsp/spectral-analysis]]. In control, the same mappings convert analog controllers into code ([[control-systems/digital-control]]).

::: summary
- IIR filters meet sharp magnitude specifications with far fewer coefficients and less delay than FIR filters, at the cost of non-linear phase and greater sensitivity to finite precision.
- Butterworth filters are maximally flat; Chebyshev filters ripple in one band and fall faster; elliptic filters ripple in both and need the lowest order. Orders follow from the discrimination $A/\varepsilon$ and the selectivity $\Omega_s/\Omega_p$.
- Butterworth poles lie equally spaced on a circle of radius $\Omega_c$ in the left half-plane.
- Impulse invariance samples $h_c(t)$, maps poles by $z = e^{sT}$ and preserves the impulse response, but aliases the frequency response; it is limited to band-limited low-pass and band-pass designs.
- The bilinear transform $s = \frac2T\frac{1 - z^{-1}}{1 + z^{-1}}$ maps the left half-plane into the unit disc and the $j\Omega$ axis onto the unit circle without aliasing, warping frequency by $\Omega = \frac2T\tan\frac\omega2$.
- Pre-warp the band edges, design the analog prototype for the warped edges, transform section by section and check the result.
- High-pass, band-pass and band-stop filters follow from a low-pass prototype by frequency transformations in $s$ or $z$.
:::

## Exercises

::: exercise Pre-warping an edge {level=1 check="96000"}
A filter for $f_s = 48\,\mathrm{kHz}$ needs its passband edge at $12\,\mathrm{kHz}$. With $T = 1/f_s$, find the pre-warped analog edge in rad/s.
::: solution
$\omega_p = 2\pi\times12/48 = \pi/2$, so $\Omega_p = 2f_s\tan(\pi/4) = 2\times48\,000\times1 = 96\,000\,\mathrm{rad/s}$ ($15.28\,\mathrm{kHz}$).
:::
:::

::: exercise Mapping a pole {level=1 check="exp(-0.1)"}
An analog filter has poles at $s = -1000 \pm j2000\,\mathrm{s^{-1}}$. Find the radius and angle of the corresponding digital poles under impulse invariance with $T = 100\,\mathrm{\mu s}$, and enter the radius.
::: solution
$z = e^{sT} = e^{-0.1}e^{\pm j0.2}$: radius $e^{-0.1} = 0.9048$, angle $\pm0.2\,\mathrm{rad/sample}$, i.e. a resonance at $0.2f_s/2\pi = 318\,\mathrm{Hz}$, the same as the analog $2000/2\pi$.
:::
:::

::: exercise Butterworth order {level=1 check="5"}
Find the order of a Butterworth filter whose attenuation is $3\,\mathrm{dB}$ at $\Omega_p$ and at least $30\,\mathrm{dB}$ at $2\Omega_p$.
::: solution
$\varepsilon = \sqrt{10^{0.3} - 1} = 0.998 \approx 1$, $A = \sqrt{999} = 31.61$, so $N_{\mathrm B} = \lceil\log_{10}31.68/\log_{10}2\rceil = \lceil 4.98\rceil = 5$. A fifth-order filter gives $10\log_{10}(1 + 0.998^2\times2^{10}) = 30.1\,\mathrm{dB}$ — just enough.
:::
:::

::: exercise Chebyshev order {level=2 check="4"}
For the specification of the previous exercise, find the order of a Chebyshev type I filter (with $3\,\mathrm{dB}$ passband ripple) and its attenuation at $2\Omega_p$.
::: solution
$N_{\mathrm C} = \lceil\operatorname{arcosh}31.68/\operatorname{arcosh}2\rceil = \lceil 4.148/1.317\rceil = \lceil 3.15\rceil = 4$. With $T_4(x) = 8x^4 - 8x^2 + 1$, $T_4(2) = 97$, so the attenuation is $10\log_{10}(1 + 0.998^2\times97^2) = 39.7\,\mathrm{dB}$ — a fourth-order Chebyshev filter beats the fifth-order Butterworth filter by almost $10\,\mathrm{dB}$, at the price of $3\,\mathrm{dB}$ of passband ripple.
:::
:::

::: exercise A first-order bilinear filter {level=2 check="(1 - tan(pi/10))/(1 + tan(pi/10))"}
Design by the bilinear transform a first-order low-pass filter with its $3\,\mathrm{dB}$ point at $100\,\mathrm{Hz}$ for $f_s = 1\,\mathrm{kHz}$. Give $H(z)$ and enter the pole.
::: solution
$\omega_c = 0.2\pi$, $K = \tan(0.1\pi) = 0.32492$ (with $T = 2$). The prototype $K/(s + K)$ with $s = (1 - z^{-1})/(1 + z^{-1})$ gives

$$
H(z) = \frac{K(1 + z^{-1})}{(1 + K) + (K - 1)z^{-1}} = \frac{0.24524(1 + z^{-1})}{1 - 0.50953z^{-1}} .
$$

The pole is at $z = (1 - K)/(1 + K) = 0.5095$. Check: $H(1) = 0.49048/0.49047 = 1$.
:::
:::

::: exercise Tustin's integrator {level=2}
Show that the bilinear transform of the analog integrator $H_c(s) = 1/s$ is the trapezoidal rule, and find its frequency response. At which frequency does it differ most from an ideal integrator?
::: solution
$H(z) = \frac T2\frac{1 + z^{-1}}{1 - z^{-1}}$, i.e. $y[n] - y[n - 1] = \frac T2(x[n] + x[n - 1])$: the area under the straight line joining two samples. By [[#thm-bilinear]], $H(e^{j\omega}) = 1/(j\frac2T\tan\frac\omega2)$, compared with the ideal $1/(j\omega/T)$. The ratio is $(\omega/2)/\tan(\omega/2)$, which is $1$ at DC and falls to $0$ at $\omega = \pi$, where the trapezoidal integrator has a zero ($z = -1$). It differs most near the Nyquist frequency.
:::
:::

::: exercise Fourth-order Butterworth sections {level=2 check="2*cos(pi/8)"}
Using [[#eq-butter-poles]], write a fourth-order Butterworth filter with $\Omega_c = 1$ as a product of two second-order sections $1/(s^2 + 2\zeta_is + 1)$ and enter the larger coefficient $2\zeta$.
::: solution
The poles are $e^{j\pi(2k + 3)/8}$, $k = 1, \dots, 4$: angles $5\pi/8$, $7\pi/8$, $9\pi/8$, $11\pi/8$. The pair at $\pm7\pi/8$ has real part $-\cos(\pi/8)$, giving $s^2 + 2\cos(\pi/8)s + 1 = s^2 + 1.8478s + 1$; the pair at $\pm5\pi/8$ has real part $-\cos(3\pi/8)$, giving $s^2 + 0.7654s + 1$. The section quality factors are $1/1.8478 = 0.541$ and $1/0.7654 = 1.307$.
:::
:::

::: exercise The digital Butterworth magnitude {level=3}
Derive [[#eq-digital-butter]] and show that the bilinear Butterworth filter of order $N$ has all $N$ zeros at $z = -1$. Then use the formula to find the order needed for a $3\,\mathrm{dB}$ cut-off at $\omega_c = 0.2\pi$ and at least $40\,\mathrm{dB}$ attenuation at $\omega = 0.3\pi$.
::: hint
The analog prototype $\Omega_c^N/\prod(s - s_k)$ has $N$ zeros at $s = \infty$. Where does the bilinear transform send $s = \infty$?
:::
::: solution
By [[#thm-bilinear]], $H(e^{j\omega}) = H_c(j\Omega)$ with $\Omega = \frac2T\tan\frac\omega2$. Pre-warping sets $\Omega_c = \frac2T\tan\frac{\omega_c}2$, so $\Omega/\Omega_c = \tan(\omega/2)/\tan(\omega_c/2)$; substituting in $\lvert H_c\rvert^2 = 1/(1 + (\Omega/\Omega_c)^{2N})$ gives [[#eq-digital-butter]]. Each factor $1/(s - s_k)$ becomes $\frac{1 + z^{-1}}{\frac2T(1 - z^{-1}) - s_k(1 + z^{-1})}$, which contributes one zero at $z = -1$ (the image of $s = \infty$), so there are $N$ of them. For the specification, $(\tan(0.15\pi)/\tan(0.1\pi))^{2N} \ge 10^4 - 1$, i.e. $N \ge \log_{10}(99.995)/\log_{10}(0.50953/0.32492) = 2.000/0.1954 = 10.2$: $N = 11$. (Without pre-warping the selectivity would be taken as $1.5$ and $N = \lceil 2.000/0.1761\rceil = 12$, one order more than needed.)
:::
:::

::: exercise A digital high-pass filter {level=3}
A $44.1\,\mathrm{kHz}$ audio system needs a second-order Butterworth high-pass filter with its $3\,\mathrm{dB}$ point at $50\,\mathrm{Hz}$ to remove rumble. Design it by the bilinear transform and give the coefficients. Why do the coefficients of such a filter need many bits?
::: hint
Apply $s \to \Omega_c/s$ to the normalised prototype $1/(s^2 + \sqrt2s + 1)$, or replace $K^2$ in the numerator of [[#ex-bilinear-butter2]] by $(1 - z^{-1})^2$.
:::
::: solution
Pre-warp with $T = 2$: $K = \tan(\pi\times50/44\,100) = 0.0035619$. The high-pass prototype is $H_c(s) = s^2/(s^2 + \sqrt2Ks + K^2)$, and with $s = (1 - z^{-1})/(1 + z^{-1})$,

$$
H(z) = \frac{(1 - z^{-1})^2}{(1 + \sqrt2K + K^2) + 2(K^2 - 1)z^{-1} + (1 - \sqrt2K + K^2)z^{-2}} = \frac{0.994975\,(1 - 2z^{-1} + z^{-2})}{1 - 1.989925z^{-1} + 0.989976z^{-2}} .
$$

Check: at $\omega = \pi$, $H(-1) = 0.994975\times4/(1 + 1.989925 + 0.989976) = 3.97990/3.97990 = 1$. The poles have radius $\sqrt{0.989976} = 0.99498$, within $0.005$ of the unit circle, because the cut-off is only $0.11\%$ of the sampling rate. Small changes in $a_1 = -1.989925$ move these poles a long way relative to their distance from $z = 1$; with $16$-bit coefficients ($2^{-15} \approx 3\times10^{-5}$), the cut-off would shift noticeably. Such filters are built with more coefficient bits or with the structures of [[dsp/filter-structures]].
:::
:::
