A digital filter in a phone or a hearing aid is, in the end, a few lines of code: a difference equation such as $y[n] = 1.386\,y[n-1] - 0.961\,y[n-2] + 0.0275\,x[n]$ executed once per sample. Change one coefficient slightly and the filter may stop resonating where it should, or may start to oscillate on its own and drive the output into its limits. Which coefficients are safe, and what each does to the frequency response, is best seen in the complex **$z$-plane**, where the filter is represented by its poles and zeros. The transform that produces that picture is the **$z$-transform**, and it plays for discrete-time systems exactly the role that [[signals-systems/laplace-transform]] plays for continuous-time ones.

The $z$-transform generalises the DTFT of [[signals-systems/discrete-time-fourier]] in the same way that the Laplace transform generalises the Fourier transform: by allowing the exponential $e^{j\omega n}$ to grow or decay, $z^n$ with $z = re^{j\omega}$. The unit circle $\lvert z\rvert = 1$ takes the place of the imaginary axis, so "all poles in the left half-plane" becomes "all poles inside the unit circle". We define the transform with its region of convergence, learn to invert rational transforms, read causality, stability and frequency response off a pole–zero plot, design a digital resonator, relate the $s$- and $z$-planes, and solve difference equations with initial conditions using the unilateral transform.

## The z-transform and its region of convergence {#sec-definition}

::: definition z-transform and region of convergence {#def-z}
The **(bilateral) $z$-transform** of a sequence $x[n]$ is

$$
X(z) = \sum_{n=-\infty}^{\infty}x[n]\,z^{-n},
$$ {#eq-z}

where $z$ is a complex variable. The **region of convergence (ROC)** is the set of $z$ for which the series converges absolutely. A $z$-transform is the expression $X(z)$ together with its ROC. Writing $z = re^{j\omega}$, $X(re^{j\omega})$ is the DTFT of $x[n]r^{-n}$; in particular, if the ROC contains the unit circle, the DTFT exists and $X(e^{j\omega}) = X(z)\big|_{z = e^{j\omega}}$.
:::

Since $\lvert x[n]z^{-n}\rvert = \lvert x[n]\rvert r^{-n}$, convergence depends only on $r = \lvert z\rvert$: the ROC is a ring (annulus) centred on the origin, possibly including the origin or extending to infinity. For an FIR sequence, $X(z)$ is a polynomial in $z^{-1}$ (and perhaps $z$): the sequence $\{\underline{1}, 2, 3\}$ has $X(z) = 1 + 2z^{-1} + 3z^{-2}$, which is the generating polynomial whose multiplication performed the convolution in [[signals-systems/convolution#ex-finite]].

::: example Right-sided and left-sided exponentials {#ex-exponentials}
Find the $z$-transforms of $x_1[n] = a^nu[n]$ and $x_2[n] = -a^nu[-n-1]$.
::: solution
For $x_1$, a geometric series in $az^{-1}$:

$$
X_1(z) = \sum_{n=0}^{\infty}(az^{-1})^n = \frac{1}{1 - az^{-1}} = \frac{z}{z - a},\qquad \lvert z\rvert > \lvert a\rvert .
$$

For $x_2$, which is $-a^n$ for $n \le -1$, put $m = -n$:

$$
X_2(z) = -\sum_{m=1}^{\infty}a^{-m}z^m = -\frac{a^{-1}z}{1 - a^{-1}z} = \frac{1}{1 - az^{-1}},\qquad \lvert z\rvert < \lvert a\rvert .
$$

Same expression, complementary ROCs: outside the circle through the pole $z = a$ for the right-sided sequence, inside it for the left-sided one. Note that $X_1$ has a pole at $z = a$ and a zero at $z = 0$; it is common to write transforms in powers of $z^{-1}$, which hides the zeros at the origin, so look at both forms when drawing pole–zero plots.
:::
:::

::: theorem Properties of the ROC {#thm-roc}
1. The ROC is a ring $r_R < \lvert z\rvert < r_L$ in the $z$-plane (with possibly $r_R = 0$ or $r_L = \infty$).
2. For a rational $X(z)$ the ROC contains no poles and is bounded by poles (or by $0$ or $\infty$).
3. A finite-length sequence has an ROC that is the entire $z$-plane, except possibly $z = 0$ (if $x[n] \ne 0$ for some $n > 0$) and $z = \infty$ (if $x[n] \ne 0$ for some $n < 0$).
4. A right-sided sequence has an ROC outside its outermost pole, $\lvert z\rvert > r_{\max}$; it includes $z = \infty$ if and only if the sequence is also causal ($x[n] = 0$ for $n < 0$).
5. A left-sided sequence has an ROC inside its innermost pole, $\lvert z\rvert < r_{\min}$.
6. A two-sided sequence has a ring between two poles as its ROC, or none at all.
:::

The proofs are those of [[signals-systems/laplace-transform#thm-roc]] with $e^{-\sigma t}$ replaced by $r^{-n}$; for example, for a right-sided sequence, if the series converges at $\lvert z\rvert = r_0$, then for $\lvert z\rvert > r_0$ the terms with large positive $n$ are smaller still, so it converges there too. The geometry has changed, though: vertical strips have become rings, right half-planes have become exteriors of circles, and the imaginary axis has become the unit circle.

## Properties and inversion {#sec-properties}

| property | sequence | $z$-transform | ROC |
|---|---|---|---|
| linearity | $ax_1 + bx_2$ | $aX_1 + bX_2$ | at least $R_1\cap R_2$ |
| time shift | $x[n - n_0]$ | $z^{-n_0}X(z)$ | $R$, except possibly $0$ or $\infty$ |
| scaling in $z$ | $z_0^nx[n]$ | $X(z/z_0)$ | $\lvert z_0\rvert R$ |
| time reversal | $x[-n]$ | $X(1/z)$ | $1/R$ |
| convolution | $x_1 * x_2$ | $X_1(z)X_2(z)$ | at least $R_1\cap R_2$ |
| differentiation in $z$ | $n\,x[n]$ | $-z\,\dd X/\dd z$ | $R$ |
| accumulation | $\sum_{k=-\infty}^nx[k]$ | $X(z)/(1 - z^{-1})$ | at least $R\cap\{\lvert z\rvert > 1\}$ |

The time-shift property is the reason difference equations become algebraic: **$z^{-1}$ is a unit delay**. It is why block diagrams of digital filters label their delay elements $z^{-1}$. Useful pairs: $\delta[n] \leftrightarrow 1$ (all $z$); $u[n] \leftrightarrow 1/(1 - z^{-1})$ ($\lvert z\rvert > 1$); $na^nu[n] \leftrightarrow az^{-1}/(1 - az^{-1})^2$ ($\lvert z\rvert > \lvert a\rvert$); $r^n\cos(\omega_0n)u[n] \leftrightarrow (1 - r\cos\omega_0\,z^{-1})/(1 - 2r\cos\omega_0\,z^{-1} + r^2z^{-2})$ ($\lvert z\rvert > r$).

**Inversion** of rational transforms uses partial fractions in the variable $z^{-1}$, so that each term matches the pair $1/(1 - az^{-1})$; the ROC decides for each pole whether its term is right-sided (pole inside the ROC's inner radius) or left-sided (pole outside the ROC's outer radius). Alternatively, for a right-sided sequence, **long division** of numerator by denominator in powers of $z^{-1}$ produces $x[0], x[1], x[2], \dots$ directly; this is just the difference-equation recursion in disguise.

::: example Inverting a second-order transform {#ex-inverse}
Find $x[n]$ for $X(z) = \dfrac{1}{(1 - 0.5z^{-1})(1 - 0.25z^{-1})}$ with (a) $\lvert z\rvert > 0.5$, (b) $0.25 < \lvert z\rvert < 0.5$, (c) $\lvert z\rvert < 0.25$.
::: solution
Partial fractions in $z^{-1}$: $X(z) = \dfrac{A}{1 - 0.5z^{-1}} + \dfrac{B}{1 - 0.25z^{-1}}$ with, by cover-up, $A = 1/(1 - 0.25/0.5) = 2$ and $B = 1/(1 - 0.5/0.25) = -1$.

(a) Both poles inside the ROC's inner circle: both terms right-sided, $x[n] = \big(2(0.5)^n - (0.25)^n\big)u[n]$. The first samples are $1, 0.75, 0.4375, 0.2344, \dots$, which long division of $1$ by $1 - 0.75z^{-1} + 0.125z^{-2}$ confirms.

(b) The pole at $0.25$ is inside, the pole at $0.5$ outside: $x[n] = -2(0.5)^nu[-n-1] - (0.25)^nu[n]$, two-sided.

(c) Both poles outside: $x[n] = \big(-2(0.5)^n + (0.25)^n\big)u[-n-1]$, left-sided.

Only (a) contains the unit circle, so only (a) has a DTFT; only (a) is the impulse response of a causal system.
:::
:::

::: warning Partial fractions in z or in z⁻¹?
Partial fractions of $X(z)$ written in powers of $z$ do not match the table directly: $\frac{1}{z - a}$ is $z^{-1}\cdot\frac{1}{1 - az^{-1}}$, the transform of $a^{n-1}u[n-1]$, not of $a^nu[n]$. Either work throughout in $z^{-1}$, as above, or expand $X(z)/z$ in partial fractions and multiply back by $z$, which produces terms $\frac{z}{z - a}$ that match. Mixing the two gives answers off by one sample, an error that is easy to make and easy to catch: check $x[0]$ against $\lim_{z\to\infty}X(z)$ (the initial-value theorem for causal sequences).
:::

## System functions, causality and stability {#sec-system-function}

The $z$-transform of the impulse response is the **system function** $H(z)$, and by the convolution property $Y(z) = H(z)X(z)$. For a difference equation $\sum_{k=0}^{N}a_ky[n - k] = \sum_{k=0}^{M}b_kx[n - k]$, the shift property gives

$$
H(z) = \frac{Y(z)}{X(z)} = \frac{\sum_{k=0}^{M}b_kz^{-k}}{\sum_{k=0}^{N}a_kz^{-k}},
$$ {#eq-hz}

the same ratio as the frequency response [[signals-systems/discrete-time-fourier#eq-rational]] with $e^{j\omega}$ replaced by $z$. The coefficients of the difference equation are the coefficients of the polynomials, which is why the code and the pole–zero plot are so directly related.

::: theorem Causality and stability in the z-plane {#thm-causal-stable}
For a DT LTI system with system function $H(z)$:

1. The system is **causal** if and only if the ROC is the exterior of a circle *including* $z = \infty$. For rational $H(z)$, this means the ROC is outside the outermost pole and the numerator degree does not exceed the denominator degree when $H$ is written in powers of $z$.
2. The system is **BIBO stable** if and only if the ROC includes the unit circle $\lvert z\rvert = 1$.
3. A causal system with rational $H(z)$ is stable if and only if **all its poles lie strictly inside the unit circle**.
:::

::: proof
(1) A causal $h$ has $h[n] = 0$ for $n < 0$, so $H(z) = \sum_{n\ge0}h[n]z^{-n}$ contains no positive powers of $z$ and converges at $z = \infty$; with [[#thm-roc]] (4) this gives the exterior of a circle including infinity. Conversely, if the ROC is such an exterior, $H(z)$ has no positive powers of $z$, so $h[n] = 0$ for $n < 0$. A numerator of higher degree than the denominator (in $z$) would give a pole at infinity, i.e. a positive power of $z$, i.e. an advance.

(2) Stability means $\sum\lvert h[n]\rvert < \infty$ ([[signals-systems/convolution#thm-lti-props]]), which is absolute convergence of [[#eq-z]] at $\lvert z\rvert = 1$.

(3) Combining (1) and (2): the exterior of the outermost pole contains the unit circle exactly when every pole has $\lvert p\rvert < 1$.
:::

::: example Stability of a recursion {#ex-stability}
Is the causal system $y[n] = y[n-1] - 0.5\,y[n-2] + x[n]$ of [[signals-systems/convolution]] stable? Find its poles and the form of its impulse response.
::: solution
From [[#eq-hz]], $H(z) = \dfrac{1}{1 - z^{-1} + 0.5z^{-2}} = \dfrac{z^2}{z^2 - z + 0.5}$. The poles solve $z^2 - z + 0.5 = 0$: $z = \frac{1 \pm \sqrt{1 - 2}}{2} = 0.5 \pm 0.5j$, with $\lvert z\rvert = \sqrt{0.5} = 0.707$ and angle $\pm\pi/4$. Both are inside the unit circle, so the system is stable. A complex pole pair $re^{\pm j\theta}$ produces an impulse response of the form $r^n\cos(\theta n + \phi)$ times a constant: here $(0.707)^n$ times a sinusoid of period $2\pi/(\pi/4) = 8$ samples, exactly the decaying oscillation found by recursion in the convolution lesson. Each sample of the envelope is $0.707$ of the last; the oscillation loses half its amplitude every $2$ samples.
:::
:::

::: quiz
A causal digital filter has poles at $z = 0.9$, $z = -0.5$, $z = 0.8e^{\pm j2}$ and $z = 1.05e^{\pm j0.3}$. What does its impulse response do?
- [ ] It decays, because most poles are inside the unit circle
- [x] It grows without bound, as an oscillation at $0.3\,\mathrm{rad/sample}$
- [ ] It oscillates forever at constant amplitude
- [ ] It cannot be determined without the zeros
::: solution
The pole pair $1.05e^{\pm j0.3}$ lies outside the unit circle, so for a causal system it contributes a term proportional to $1.05^n\cos(0.3n + \phi)$, which grows. Zeros can change the amplitudes of the terms but cannot remove a pole's mode (unless they cancel it exactly, which never happens reliably with finite-precision coefficients).
:::
:::

### Frequency response from the pole–zero plot

On the unit circle, $H(e^{j\omega}) = H(z)\big|_{z = e^{j\omega}}$. With $H(z) = K\prod_i(z - z_i)/\prod_k(z - p_k)$ (after multiplying through by a power of $z$, which affects only the phase), the same geometric reading as in the $s$-plane applies, with the point $e^{j\omega}$ travelling round the unit circle instead of up the imaginary axis:

$$
\lvert H(e^{j\omega})\rvert = \lvert K\rvert\frac{\prod_i\lvert e^{j\omega} - z_i\rvert}{\prod_k\lvert e^{j\omega} - p_k\rvert} .
$$ {#eq-geometric-z}

A pole close to the unit circle at angle $\theta$ makes a sharp peak at $\omega = \theta$; a zero on the unit circle at angle $\theta$ makes a null there. Poles near $z = 1$ give low-pass behaviour, poles near $z = -1$ high-pass. This explains the observation in [[signals-systems/discrete-time-fourier]] that the exponential smoother $(1 - a)/(1 - az^{-1})$ is low-pass for $a > 0$ (pole near $z = 1$) and high-pass for $a < 0$ (pole near $z = -1$).

::: widget complexmap
f: z^2/(z^2 - 2*r*cos(q)*z + r^2)
mode: domain
x: -1.6, 1.6
y: -1.6, 1.6
sliders: r=0.9:0.3:1.2:0.01; q=0.8:0:3.1:0.01
caption: Domain colouring of the resonator $H(z) = z^2/(z^2 - 2r\cos\theta\,z + r^2)$ with a double zero at the origin and poles at $re^{\pm j\theta}$ (sliders $r$ and $q = \theta$). The frequency response is the colouring along the unit circle, radius $1$ about the origin. Move $r$ towards $1$: the poles approach the circle and the response there becomes very bright near angle $\pm\theta$, a sharp resonance. Push $r$ past $1$ and the causal filter becomes unstable.
:::

::: example Designing a digital resonator {#ex-resonator}
Design a second-order IIR resonator for a system sampled at $f_s = 8\,\mathrm{kHz}$ that peaks at $1\,\mathrm{kHz}$ with a $3\,\mathrm{dB}$ bandwidth of about $50\,\mathrm{Hz}$ and unit gain at the peak. Use poles at $re^{\pm j\theta}$ and two zeros at the origin, and the rule that for $r$ close to $1$ the $3\,\mathrm{dB}$ bandwidth is about $2(1 - r)$ rad/sample.
::: solution
The pole angle is the DT peak frequency, $\theta = 2\pi\cdot1000/8000 = \pi/4$. The bandwidth in radians per sample is $2\pi\cdot50/8000 = 0.0393$, so $2(1 - r) = 0.0393$ and

$$
r = 1 - \frac{\pi\cdot50}{8000} = 0.9804 .
$$

The denominator $(1 - re^{j\theta}z^{-1})(1 - re^{-j\theta}z^{-1}) = 1 - 2r\cos\theta\,z^{-1} + r^2z^{-2}$ has $a_1 = 2r\cos\theta = 1.3864$ and $a_2 = r^2 = 0.9611$. Evaluating $\lvert1 - a_1e^{-j\omega} + a_2e^{-j2\omega}\rvert^{-1}$ at $\omega = \pi/4$ gives a peak gain of $36.4$ ($31.2\,\mathrm{dB}$), so we scale the input by $b_0 = 1/36.4 = 0.0275$. The filter is

$$
y[n] = 1.3864\,y[n-1] - 0.9611\,y[n-2] + 0.0275\,x[n],
$$

the filter quoted at the start of the lesson. A numerical check of its response gives a $3\,\mathrm{dB}$ bandwidth of $50.5\,\mathrm{Hz}$, confirming the approximation. The poles are at radius $0.980$, safely inside the unit circle; but if the coefficients were quantised to, say, $4$ fractional bits, $a_2$ would become $0.9375$, the pole radius $0.968$ and the bandwidth about $81\,\mathrm{Hz}$, more than half as wide again. Narrow-band IIR filters need enough coefficient precision, because the pole radius is very sensitive to $a_2$ when it is close to $1$.
:::
:::

::: widget plot
f: 1/sqrt((1 - 2*r*cos(q)*cos(x) + r^2*cos(2*x))^2 + (2*r*cos(q)*sin(x) - r^2*sin(2*x))^2)
x: 0, pi
y: 0, 40
sliders: r=0.95:0.5:0.995:0.005; q=0.785:0.1:3:0.005
piticks: true
labels: \lvert H(e^{j\omega})\rvert
caption: Magnitude response of the resonator $1/(1 - 2r\cos\theta\,z^{-1} + r^2z^{-2})$ on $0 \le \omega \le \pi$, without the gain normalisation. The peak sits close to $\omega = \theta$ (slider $q$), and its height grows and its width shrinks as $r \to 1$: roughly, height $\propto 1/(1 - r)$ and width $\approx 2(1 - r)$. For $\theta$ near $0$ or $\pi$ the two poles interact and the peak shifts away from $\theta$.
:::

## The s-plane and the z-plane {#sec-mapping}

If a DT signal is obtained by sampling, $x[n] = x_c(nT)$, then each continuous-time exponential $e^{s_0t}$ becomes the sequence $(e^{s_0T})^n$. A pole of $X_c(s)$ at $s_0$ therefore corresponds to a pole of $X(z)$ at

$$
z_0 = e^{s_0T} .
$$ {#eq-s-to-z}

Writing $s_0 = \sigma_0 + j\Omega_0$ gives $\lvert z_0\rvert = e^{\sigma_0T}$ and $\angle z_0 = \Omega_0T$. So the left half-plane $\sigma < 0$ maps inside the unit circle, the imaginary axis onto it and the right half-plane outside it; and the strip $-\pi/T < \Omega \le \pi/T$ wraps once around the circle, which is aliasing seen in the pole positions. This is the basis of the **impulse-invariance** method of digital filter design and of the analysis of sampled control systems ([[dsp]], [[control-systems]]).

::: example Mapping a pole pair {#ex-mapping}
A CT system has poles at $s = -100 \pm j2\pi\cdot1000\,\mathrm{s^{-1}}$. Where are the corresponding poles of the sampled impulse response at $f_s = 8\,\mathrm{kHz}$? What happens at $f_s = 1.5\,\mathrm{kHz}$?
::: solution
With $T = 125\,\mathrm{\mu s}$: $\lvert z\rvert = e^{-100\times125\times10^{-6}} = e^{-0.0125} = 0.9876$ and $\angle z = \pm2\pi\cdot1000/8000 = \pm\pi/4$. The poles lie just inside the unit circle at $\pm45^\circ$, a lightly damped resonance at $1\,\mathrm{kHz}$, as expected.

At $f_s = 1.5\,\mathrm{kHz}$: $\angle z = \pm2\pi\cdot1000/1500 = \pm4\pi/3$, which is the same point as $\mp2\pi/3$, the angle of a $500\,\mathrm{Hz}$ resonance. The $1\,\mathrm{kHz}$ resonance has aliased to $500\,\mathrm{Hz}$, because $1.5\,\mathrm{kHz}$ is below its Nyquist rate. The radius $e^{-100/1500} = 0.936$ still records the correct decay per sample.
:::
:::

| feature | $s$-plane (CT) | $z$-plane (DT) |
|---|---|---|
| stability boundary | imaginary axis | unit circle |
| stable causal poles | $\operatorname{Re}s < 0$ | $\lvert z\rvert < 1$ |
| DC | $s = 0$ | $z = 1$ |
| highest frequency | $s \to j\infty$ | $z = -1$ ($\omega = \pi$) |
| frequency response | $H(j\omega)$ | $H(e^{j\omega})$ |
| unit delay / integrator | $e^{-sT}$, $1/s$ | $z^{-1}$, $1/(1 - z^{-1})$ |

## The unilateral z-transform {#sec-unilateral}

To solve a difference equation that starts at $n = 0$ with given past outputs, we need a transform that ignores the past of the signal but remembers the past of the system.

::: definition Unilateral z-transform {#def-unilateral}
The **unilateral $z$-transform** of $x[n]$ is $\mathcal X(z) = \sum_{n=0}^{\infty}x[n]z^{-n}$. It equals the bilateral transform of $x[n]u[n]$, so its ROC is always the exterior of a circle and is usually not stated.
:::

Because it ignores $n < 0$, its shift property brings in the initial conditions:

$$
x[n - 1] \;\leftrightarrow\; z^{-1}\mathcal X(z) + x[-1],\qquad x[n - 2] \;\leftrightarrow\; z^{-2}\mathcal X(z) + z^{-1}x[-1] + x[-2].
$$ {#eq-unilateral-shift}

(The first follows from $\sum_{n\ge0}x[n - 1]z^{-n} = x[-1] + \sum_{m\ge0}x[m]z^{-m-1}$.) This is the DT analogue of $\dd x/\dd t \leftrightarrow s\mathcal X - x(0^-)$.

::: example A recursion with an initial condition {#ex-unilateral}
Solve $y[n] - 0.5\,y[n-1] = u[n]$ for $n \ge 0$ with $y[-1] = 4$, and separate the zero-input and zero-state responses.
::: solution
Transforming with [[#eq-unilateral-shift]]: $\mathcal Y(z) - 0.5\big(z^{-1}\mathcal Y(z) + 4\big) = \dfrac{1}{1 - z^{-1}}$, so

$$
\mathcal Y(z) = \underbrace{\frac{2}{1 - 0.5z^{-1}}}_{\text{zero input}} + \underbrace{\frac{1}{(1 - z^{-1})(1 - 0.5z^{-1})}}_{\text{zero state}} .
$$

The zero-input part is $2(0.5)^n$. Partial fractions for the zero-state part give $\frac{2}{1 - z^{-1}} - \frac{1}{1 - 0.5z^{-1}}$, i.e. $2 - (0.5)^n$. Altogether $y[n] = 2 + (0.5)^n$ for $n \ge 0$. Check by recursion: $y[0] = 0.5\cdot4 + 1 = 3$ and the formula gives $2 + 1 = 3$; $y[1] = 0.5\cdot3 + 1 = 2.5$, formula $2 + 0.5$. The steady state $2$ is $H(1) = 1/(1 - 0.5)$, the DC gain.
:::
:::

Two limits of $\mathcal X(z)$ give quick checks on any solution.

::: theorem Initial- and final-value theorems {#thm-ivt-fvt}
For a sequence $x[n]$ with unilateral transform $\mathcal X(z)$:

1. $x[0] = \lim_{z\to\infty}\mathcal X(z)$.
2. If $x[n]$ converges as $n \to \infty$ (which is the case when all poles of $(1 - z^{-1})\mathcal X(z)$ lie strictly inside the unit circle), then $\displaystyle\lim_{n\to\infty}x[n] = \lim_{z\to1}(1 - z^{-1})\mathcal X(z)$.
:::

::: proof
(1) In $\mathcal X(z) = x[0] + x[1]z^{-1} + x[2]z^{-2} + \cdots$ every term but the first vanishes as $z \to \infty$. (2) The unilateral transform of $x[n] - x[n-1]$ is $(1 - z^{-1})\mathcal X(z) - x[-1]$, by [[#eq-unilateral-shift]]. Its value at $z = 1$ (inside the ROC under the stated condition) is $\sum_{n=0}^{\infty}(x[n] - x[n-1]) = \lim_{N\to\infty}x[N] - x[-1]$, a telescoping sum. Equating the two expressions and cancelling $x[-1]$ gives the result.
:::

In [[#ex-unilateral]], $\lim_{z\to\infty}\mathcal Y(z) = 2 + 1 = 3 = y[0]$, and $(1 - z^{-1})\mathcal Y(z) \to 0 + \frac{1}{1 - 0.5} = 2$ as $z \to 1$, the steady state. For a stable system driven by a unit step, the final value is always $H(1)$, the DC gain.

::: quiz
The causal sequence with $X(z) = \dfrac{3 - z^{-1}}{(1 - z^{-1})(1 - 0.5z^{-1})}$ tends to which value as $n \to \infty$?
- [ ] $3$
- [x] $4$
- [ ] $6$
- [ ] It does not converge
::: solution
$(1 - z^{-1})X(z) = \frac{3 - z^{-1}}{1 - 0.5z^{-1}}$ has its only pole at $0.5$, inside the unit circle, so the final-value theorem applies: the limit is $\frac{3 - 1}{1 - 0.5} = 4$. (The initial value is $\lim_{z\to\infty}X = 3$.)
:::
:::

::: application Digital control loops
In a digital control system, a microcontroller samples a sensor at, say, $1\,\mathrm{kHz}$, computes a control law such as a PID difference equation, and updates an actuator through a DAC with a zero-order hold. The closed loop is analysed in the $z$-plane: the plant is converted to its sampled equivalent $G(z)$ (including the hold), the controller is $C(z)$, and the closed-loop poles are the roots of $1 + C(z)G(z) = 0$. They must lie inside the unit circle, and for good damping they should lie inside the image of the $s$-plane damping region under $z = e^{sT}$. The computation delay of one sample adds a factor $z^{-1}$ to the loop, a pole at the origin that reduces the stability margin, which is why control engineers care about microseconds of latency.
:::

## Where this leads

The $z$-transform is the working language of [[dsp]], where FIR and IIR filters are designed by placing poles and zeros, the bilinear transform maps analog prototypes from the $s$-plane to the $z$-plane, and multirate systems are analysed with $X(z^L)$. In [[control-systems]] it describes sampled-data controllers; in [[communication-systems]] it describes equalisers and channel models. With it, the course has come full circle: signals, systems, convolution, and four transforms that turn convolution into multiplication, two for continuous time and two for discrete time, linked by sampling.

::: history
Generating functions, power series whose coefficients are a sequence of interest, were used by Abraham de Moivre in the 1730s and by Laplace in his work on probability, and are mathematically the $z$-transform in the variable $z^{-1}$. The transform entered engineering through sampled-data control during and after the Second World War: Witold Hurewicz analysed sampled servomechanisms with such series in 1947, and John Ragazzini and Lotfi Zadeh at Columbia University named and systematised the $z$-transform in 1952. Eliahu Jury's *Sampled-Data Control Systems* (1958) and his modified $z$-transform spread the method, and the rise of digital signal processing in the 1960s made it the standard description of digital filters.
:::

::: summary
- $X(z) = \sum x[n]z^{-n}$ with an ROC that is a ring; $X(e^{j\omega})$ is $X(z)$ on the unit circle when the circle is in the ROC.
- Right-sided sequences have ROCs outside the outermost pole, left-sided inside the innermost, two-sided in a ring; the same $X(z)$ with different ROCs gives different sequences.
- $z^{-1}$ is a unit delay; a difference equation gives $H(z) = \sum b_kz^{-k}/\sum a_kz^{-k}$ directly.
- Invert by partial fractions in $z^{-1}$ (or long division for causal sequences), using the ROC to decide the side of each term.
- Causal and stable iff all poles are strictly inside the unit circle; the frequency response is read geometrically as $e^{j\omega}$ moves round the circle.
- A pole pair $re^{\pm j\theta}$ near the circle is a resonator at $\omega = \theta$ with bandwidth $\approx 2(1 - r)$; narrow resonances need precise coefficients.
- Sampling maps $s$-plane poles to $z = e^{sT}$; the unilateral transform handles initial conditions through $x[n-1] \leftrightarrow z^{-1}\mathcal X + x[-1]$.
:::

## Exercises

::: exercise A finite sequence {level=1}
Find the $z$-transform and ROC of $x[n] = \{2, \underline{1}, 0, -1\}$ (that is $x[-1] = 2$, $x[0] = 1$, $x[2] = -1$).
::: solution
$X(z) = 2z + 1 - z^{-2}$. The ROC is all $z$ except $z = 0$ (because of $z^{-2}$) and $z = \infty$ (because of $2z$).
:::
:::

::: exercise Poles and stability {level=1}
A causal system has $H(z) = \dfrac{1 + z^{-1}}{1 - 1.2z^{-1} + 0.72z^{-2}}$. Find its poles and decide whether it is stable.
::: solution
Poles: $z^2 - 1.2z + 0.72 = 0$, $z = 0.6 \pm 0.6j$, $\lvert z\rvert = 0.6\sqrt2 = 0.849 < 1$. Stable. There is a zero at $z = -1$, so the gain at $\omega = \pi$ is zero.
:::
:::

::: exercise DC gain {level=1 check="2/0.52"}
Find the DC gain $H(e^{j0})$ of the system in the previous exercise.
::: solution
$H(1) = (1 + 1)/(1 - 1.2 + 0.72) = 2/0.52 = 3.85$.
:::
:::

::: exercise Inverse by long division {level=2}
Find the first four samples of the causal sequence with $X(z) = \dfrac{1 + 2z^{-1}}{1 - 0.5z^{-1}}$ by long division, and check them with partial fractions.
::: solution
Division: $1 + 2z^{-1} = (1 - 0.5z^{-1})(1 + 2.5z^{-1} + 1.25z^{-2} + 0.625z^{-3} + \cdots)$, so $x = \{1, 2.5, 1.25, 0.625, \dots\}$. Partial fractions: $X = -4 + \frac{5}{1 - 0.5z^{-1}}$ (since $\frac{1 + 2z^{-1}}{1 - 0.5z^{-1}} = -4 + \frac{5}{1 - 0.5z^{-1}}$: check at $z^{-1} = 0$: $-4 + 5 = 1$), giving $x[n] = -4\delta[n] + 5(0.5)^nu[n]$: $1, 2.5, 1.25, 0.625$. Agreed.
:::
:::

::: exercise A system from its pole–zero plot {level=2}
A causal system has zeros at $z = \pm j$, poles at $z = \pm0.9j$, and $H(1) = 1$. Write $H(z)$ and its difference equation. What does it do to a $2\,\mathrm{kHz}$ tone at $f_s = 8\,\mathrm{kHz}$?
::: solution
$H(z) = K\frac{(z - j)(z + j)}{(z - 0.9j)(z + 0.9j)} = K\frac{z^2 + 1}{z^2 + 0.81} = K\frac{1 + z^{-2}}{1 + 0.81z^{-2}}$. $H(1) = K\cdot2/1.81 = 1$ gives $K = 0.905$. Difference equation: $y[n] = -0.81y[n-2] + 0.905(x[n] + x[n-2])$. A $2\,\mathrm{kHz}$ tone is at $\omega = \pi/2$, i.e. $z = j$, a zero: it is removed completely. It is a notch filter at $f_s/4$.
:::
:::

::: exercise Impulse response of a resonator {level=2 check="0.9^5*sin(6*pi/3)/sin(pi/3)"}
The causal system $H(z) = \dfrac{1}{1 - 2r\cos\theta\,z^{-1} + r^2z^{-2}}$ has impulse response $h[n] = r^n\dfrac{\sin((n + 1)\theta)}{\sin\theta}u[n]$. Verify $h[0]$ and $h[1]$ from the recursion, and evaluate $h[5]$ for $r = 0.9$ and $\theta = \pi/3$.
::: solution
Recursion: $h[0] = 1$; $h[1] = 2r\cos\theta$. Formula: $h[0] = \sin\theta/\sin\theta = 1$; $h[1] = r\sin2\theta/\sin\theta = 2r\cos\theta$. Agreed. For $n = 5$: $h[5] = 0.9^5\sin(2\pi)/\sin(\pi/3) = 0$. (The oscillation has period $6$ samples, and $(n+1)\theta = 2\pi$ is one of its zero crossings; $h[4] = 0.9^4\sin(5\pi/3)/\sin(\pi/3) = -0.656$.)
:::
:::

::: exercise Mapping poles between planes {level=2}
A CT filter has a pole at $s = -2000\,\mathrm{s^{-1}}$. Where does it map in the $z$-plane at $f_s = 10\,\mathrm{kHz}$? What CT pole would map to $z = -0.5$ at the same rate?
::: solution
$z = e^{-2000\times10^{-4}} = e^{-0.2} = 0.819$. For $z = -0.5 = 0.5e^{j\pi}$: $e^{sT} = 0.5e^{j\pi}$ gives $s = (\ln0.5 + j\pi)/T = -6931 + j31\,416\,\mathrm{s^{-1}}$ (plus any multiple of $j2\pi/T$). A negative real DT pole corresponds to a CT oscillation exactly at the Nyquist frequency $5\,\mathrm{kHz}$; it cannot come from a real CT pole.
:::
:::

::: exercise Coefficient sensitivity {level=3}
For the resonator of [[#ex-resonator]] ($a_1 = 1.3864$, $a_2 = 0.9611$), find the pole radius and angle after rounding $a_1$ and $a_2$ to $6$ fractional bits (multiples of $1/64$). How far does the peak frequency move, and is the filter still stable?
::: hint
For poles $re^{\pm j\theta}$: $r = \sqrt{a_2}$ and $\cos\theta = a_1/(2r)$.
:::
::: solution
$a_1 \to 89/64 = 1.390625$, $a_2 \to 62/64 = 0.96875$ ($0.9611\times64 = 61.51$). Then $r = \sqrt{0.96875} = 0.9843$ and $\cos\theta = 1.390625/(2\times0.9843) = 0.7064$, $\theta = 0.7863\,\mathrm{rad}$ versus $\pi/4 = 0.7854$. The peak moves from $1000\,\mathrm{Hz}$ to $0.7863\times8000/(2\pi) = 1001.2\,\mathrm{Hz}$, and the bandwidth shrinks to about $2(1 - 0.9843)\cdot8000/(2\pi) = 40\,\mathrm{Hz}$. Still stable ($r < 1$), but the bandwidth error is $20\%$: the pole radius is very sensitive to $a_2$ when $r$ is close to $1$. Implementations use more bits or alternative structures (coupled-form or lattice) that are less sensitive.
:::
:::

::: exercise Deriving the bandwidth rule {level=3}
For the resonator with poles $re^{\pm j\theta}$, $r$ close to $1$ and $\theta$ not close to $0$ or $\pi$, use [[#eq-geometric-z]] to show that the $3\,\mathrm{dB}$ bandwidth is approximately $2(1 - r)$ rad/sample.
::: hint
Near $\omega = \theta$ only the distance to the nearby pole changes appreciably. Approximate the unit circle there by a straight line.
:::
::: solution
Near $\omega = \theta$, the distance from $e^{j\omega}$ to the far pole $re^{-j\theta}$ is about $\lvert e^{j\theta} - e^{-j\theta}\rvert = 2\sin\theta$, nearly constant; and the zeros at the origin are at distance $1$. So $\lvert H\rvert$ is inversely proportional to the distance $d$ to the near pole. Locally the unit circle is a straight line perpendicular to the radius through the pole, at distance $1 - r$ from it; moving along it by an arc $\Delta\omega$ gives $d \approx \sqrt{(1 - r)^2 + \Delta\omega^2}$. The gain is $3\,\mathrm{dB}$ down when $d = \sqrt2(1 - r)$, i.e. $\Delta\omega = \pm(1 - r)$. The full bandwidth is therefore $2(1 - r)$, and the peak gain is about $1/((1 - r)\cdot2\sin\theta)$: for [[#ex-resonator]], $1/(0.0196\times1.414) = 36.0$, close to the exact $36.4$.
:::
:::
