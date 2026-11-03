A radar sends out a single microsecond-long burst of microwaves and listens for the echo. A camera flash fires once. A data bit on a cable lasts a few nanoseconds and is never repeated in exactly the same way. None of these signals is periodic, so the Fourier series of [[signals-systems/fourier-series]] does not apply, and yet engineers routinely ask "what bandwidth does this pulse occupy?" or "which frequencies will this cable pass?". The answer is the **Fourier transform**, which describes an aperiodic signal as a continuous superposition of complex exponentials of all frequencies. Where a periodic signal has a line spectrum, a pulse has a continuous spectrum, a density of amplitude per unit frequency.

We obtain the transform as the limit of the Fourier series as the period grows, compute the transforms that every engineer should know by heart, and derive the properties that make the transform a practical tool. The most important of these is the **convolution theorem**: convolution in time is multiplication in frequency, so the effect of an LTI system on any signal is to multiply its spectrum by the frequency response. That single fact explains filtering, modulation, the bandwidth of pulses and much of the design of communication and measurement systems. The mathematical theory, conditions of existence and inversion, is in the Maths Atlas lesson [The Fourier transform](/learn/maths/lesson.php?c=pde&l=fourier-transform); here we concentrate on what the transform says about signals and systems.

## From Fourier series to Fourier transform {#sec-derivation}

Take an aperiodic signal $x(t)$ that is zero outside some interval $\lvert t\rvert < T_1$, and build a periodic signal $\tilde x(t)$ by repeating it with period $T_0 > 2T_1$. Over one period $\tilde x = x$, so the Fourier coefficients of $\tilde x$ are

$$
a_k = \frac{1}{T_0}\int_{-T_0/2}^{T_0/2}x(t)e^{-jk\omega_0t}\,\dd t = \frac{1}{T_0}\int_{-\infty}^{\infty}x(t)e^{-jk\omega_0t}\,\dd t = \frac{1}{T_0}X(jk\omega_0),
$$

where we have *defined* the function $X(j\omega) = \int x(t)e^{-j\omega t}\,\dd t$. The coefficients are samples of this one envelope, spaced $\omega_0 = 2\pi/T_0$ apart, exactly as the pulse-train coefficients of [[signals-systems/fourier-series#ex-pulse-train]] were samples of a sinc. The synthesis equation becomes

$$
\tilde x(t) = \sum_k\frac{1}{T_0}X(jk\omega_0)e^{jk\omega_0t} = \frac{1}{2\pi}\sum_kX(jk\omega_0)e^{jk\omega_0t}\,\omega_0 .
$$

Now let $T_0 \to \infty$. The periodic copies move off to infinity, so $\tilde x \to x$; the spacing $\omega_0$ becomes the infinitesimal $\dd\omega$; and the sum, a Riemann sum, becomes an integral.

::: definition Continuous-time Fourier transform {#def-ctft}
The **Fourier transform** of $x(t)$ and its inverse are

$$
X(j\omega) = \int_{-\infty}^{\infty}x(t)\,e^{-j\omega t}\,\dd t,\qquad x(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty}X(j\omega)\,e^{j\omega t}\,\dd\omega .
$$ {#eq-ctft}

We write $x(t) \leftrightarrow X(j\omega)$ or $X = \mathcal F\{x\}$. $X(j\omega)$ is the **spectrum** of $x$: $\lvert X(j\omega)\rvert$ is the **magnitude spectrum** and $\angle X(j\omega)$ the **phase spectrum**. The variable $\omega$ is in $\mathrm{rad/s}$; the notation $X(j\omega)$ anticipates the Laplace transform $X(s)$ evaluated at $s = j\omega$.
:::

The inverse formula says that $x(t)$ is a superposition of exponentials $e^{j\omega t}$ with "amplitude" $X(j\omega)\,\dd\omega/2\pi$ in each band $\dd\omega$. Unlike the Fourier coefficients, $X(j\omega)$ is a density: its units are those of $x$ times seconds (for example $\mathrm{V\,s}$, or $\mathrm{V/Hz}$).

::: theorem Existence of the Fourier transform {#thm-existence}
If $x(t)$ is absolutely integrable, $\int\lvert x(t)\rvert\,\dd t < \infty$, then $X(j\omega)$ exists, is continuous and bounded by $\int\lvert x\rvert$, and tends to zero as $\lvert\omega\rvert \to \infty$. If in addition $x$ satisfies the Dirichlet conditions on every finite interval, the inverse transform returns $x(t)$ at points of continuity and the midpoint at jumps. If $x$ has finite energy, $\int\lvert x\rvert^2 < \infty$, the transform exists in the mean-square sense and the inverse converges to $x$ in energy.
:::

The bound $\lvert X(j\omega)\rvert \le \int\lvert x(t)e^{-j\omega t}\rvert\,\dd t = \int\lvert x\rvert\,\dd t$ is immediate; the rest is proved in the Maths Atlas. Signals that are neither absolutely integrable nor of finite energy, such as constants, sinusoids and the unit step, have no transform in the ordinary sense, but they do have transforms containing impulses, which are just as useful (see below).

## Transforms to know {#sec-pairs}

::: example The decaying exponential {#ex-exp}
Find the Fourier transform of $x(t) = e^{-at}u(t)$ with $a > 0$, and its magnitude and phase.
::: solution
$$
X(j\omega) = \int_0^\infty e^{-at}e^{-j\omega t}\,\dd t = \left[\frac{-e^{-(a + j\omega)t}}{a + j\omega}\right]_0^\infty = \frac{1}{a + j\omega},
$$

since $e^{-(a+j\omega)t} \to 0$ for $a > 0$. Hence $\lvert X(j\omega)\rvert = 1/\sqrt{a^2 + \omega^2}$ and $\angle X(j\omega) = -\arctan(\omega/a)$. The magnitude is $1/a$ at $\omega = 0$ (the area under $x$) and falls to $1/(a\sqrt2)$, $3\,\mathrm{dB}$ down, at $\omega = a$. A faster decay (larger $a$) means a lower, wider spectrum. This is also the frequency response of an RC low-pass filter with $a = 1/RC$, up to the factor $a$: $H(j\omega) = a/(a + j\omega) = 1/(1 + j\omega RC)$.
:::
:::

::: example The rectangular pulse {#ex-rect}
Find the transform of the pulse $x(t) = 1$ for $\lvert t\rvert < T_1$ and $0$ otherwise. Where are the zeros of the spectrum for a pulse of duration $2T_1 = 1\,\mathrm{\mu s}$?
::: solution
$$
X(j\omega) = \int_{-T_1}^{T_1}e^{-j\omega t}\,\dd t = \frac{e^{j\omega T_1} - e^{-j\omega T_1}}{j\omega} = \frac{2\sin(\omega T_1)}{\omega} = 2T_1\,\frac{\sin(\omega T_1)}{\omega T_1}.
$$

The spectrum is real (the pulse is even), equal to the area $2T_1$ at $\omega = 0$, and zero at $\omega = k\pi/T_1$, $k = \pm1, \pm2, \dots$, i.e. at $f = k/(2T_1)$. For $2T_1 = 1\,\mathrm{\mu s}$ the zeros are at $f = 1, 2, 3, \dots\,\mathrm{MHz}$. The main lobe $\lvert f\rvert < 1\,\mathrm{MHz}$ contains about $90.3\%$ of the pulse energy (a numerical integration with Parseval's relation below), which is why the "null-to-null bandwidth" $2/(2T_1)$, or the one-sided $1/(2T_1)$, is a common rule of thumb for the bandwidth of a pulse.
:::
:::

::: widget plot
f: 2*sin(x*T)/x; heaviside(T - abs(x))
x: -12, 12
y: -0.8, 4.2
sliders: T=1:0.2:2:0.05
labels: X(j\omega) = 2\sin(\omega T_1)/\omega; x(t)\ \text{(same axis, time in s)}
caption: The rectangular pulse of half-width $T_1$ (orange, against time) and its spectrum (blue, against $\omega$ in $\mathrm{rad/s}$). Make the pulse narrower: its spectrum gets lower and wider, with the first zero at $\omega = \pi/T_1$. The product of duration and bandwidth stays constant, the first instance of the time–bandwidth trade-off.
:::

Several important pairs involve impulses. The sifting property gives $\delta(t) \leftrightarrow 1$ immediately: an impulse contains all frequencies equally. Conversely, the inverse transform of the impulse $2\pi\delta(\omega - \omega_0)$ is $\frac{1}{2\pi}\int2\pi\delta(\omega - \omega_0)e^{j\omega t}\,\dd\omega = e^{j\omega_0t}$, so

$$
e^{j\omega_0t} \leftrightarrow 2\pi\,\delta(\omega - \omega_0),\qquad 1 \leftrightarrow 2\pi\,\delta(\omega),\qquad \cos\omega_0t \leftrightarrow \pi\big[\delta(\omega - \omega_0) + \delta(\omega + \omega_0)\big].
$$ {#eq-impulse-pairs}

A periodic signal with Fourier coefficients $a_k$ therefore has the transform $X(j\omega) = 2\pi\sum_ka_k\,\delta(\omega - k\omega_0)$, a train of impulses at the harmonics: the Fourier series is a special case of the transform. Finally, the **ideal low-pass impulse response** follows by inverting a rectangle in frequency: if $H(j\omega) = 1$ for $\lvert\omega\rvert < W$ and $0$ otherwise,

$$
h(t) = \frac{1}{2\pi}\int_{-W}^{W}e^{j\omega t}\,\dd\omega = \frac{\sin Wt}{\pi t}.
$$ {#eq-sinc}

| $x(t)$ | $X(j\omega)$ |
|---|---|
| $\delta(t)$ | $1$ |
| $1$ | $2\pi\delta(\omega)$ |
| $e^{j\omega_0t}$ | $2\pi\delta(\omega - \omega_0)$ |
| $\cos\omega_0t$ | $\pi[\delta(\omega - \omega_0) + \delta(\omega + \omega_0)]$ |
| $\sin\omega_0t$ | $\frac{\pi}{j}[\delta(\omega - \omega_0) - \delta(\omega + \omega_0)]$ |
| $e^{-at}u(t)$, $a > 0$ | $\dfrac{1}{a + j\omega}$ |
| $te^{-at}u(t)$, $a > 0$ | $\dfrac{1}{(a + j\omega)^2}$ |
| $e^{-a\lvert t\rvert}$, $a > 0$ | $\dfrac{2a}{a^2 + \omega^2}$ |
| $1$ for $\lvert t\rvert < T_1$ | $\dfrac{2\sin\omega T_1}{\omega}$ |
| $\dfrac{\sin Wt}{\pi t}$ | $1$ for $\lvert\omega\rvert < W$ |
| $u(t)$ | $\dfrac{1}{j\omega} + \pi\delta(\omega)$ |
| $e^{-t^2/(2\sigma^2)}$ | $\sigma\sqrt{2\pi}\,e^{-\sigma^2\omega^2/2}$ |
| $\sum_k\delta(t - kT)$ | $\dfrac{2\pi}{T}\sum_k\delta\!\left(\omega - \dfrac{2\pi k}{T}\right)$ |

The last pair, an impulse train in time is an impulse train in frequency, is the key to [[signals-systems/sampling]].

::: warning Angular frequency or hertz?
This course writes transforms in terms of $\omega$ in $\mathrm{rad/s}$, with the factor $1/2\pi$ in the inverse. Many communications texts use $f$ in $\mathrm{Hz}$, $X(f) = \int x(t)e^{-j2\pi ft}\,\dd t$, which has no $2\pi$ in the inverse and turns $2\pi\delta(\omega)$ into $\delta(f)$ (because $\delta(\omega) = \delta(2\pi f) = \delta(f)/2\pi$). Both are correct; mixing them is not. When you take a pair from a table, check its convention, and when you quote a bandwidth, say whether it is in $\mathrm{rad/s}$ or $\mathrm{Hz}$.
:::

## Properties of the Fourier transform {#sec-properties}

::: theorem Properties of the continuous-time Fourier transform {#thm-ft-props}
Let $x(t) \leftrightarrow X(j\omega)$ and $y(t) \leftrightarrow Y(j\omega)$.

1. **Linearity:** $ax + by \leftrightarrow aX + bY$.
2. **Time shift:** $x(t - t_0) \leftrightarrow e^{-j\omega t_0}X(j\omega)$.
3. **Frequency shift:** $e^{j\omega_0t}x(t) \leftrightarrow X(j(\omega - \omega_0))$.
4. **Conjugate symmetry:** if $x$ is real, $X(-j\omega) = X^*(j\omega)$, so $\lvert X\rvert$ is even and $\angle X$ is odd. Real and even $x$ give real and even $X$; real and odd $x$ give imaginary and odd $X$.
5. **Time scaling:** $x(at) \leftrightarrow \dfrac{1}{\lvert a\rvert}X\!\left(\dfrac{j\omega}{a}\right)$ for real $a \ne 0$.
6. **Differentiation:** $\dfrac{\dd x}{\dd t} \leftrightarrow j\omega X(j\omega)$; **integration:** $\displaystyle\int_{-\infty}^{t}x(\tau)\,\dd\tau \leftrightarrow \frac{X(j\omega)}{j\omega} + \pi X(0)\delta(\omega)$.
7. **Duality:** if $x(t) \leftrightarrow X(j\omega)$, then $X(jt) \leftrightarrow 2\pi\,x(-\omega)$.
8. **Parseval's relation:** $\displaystyle\int_{-\infty}^{\infty}\lvert x(t)\rvert^2\,\dd t = \frac{1}{2\pi}\int_{-\infty}^{\infty}\lvert X(j\omega)\rvert^2\,\dd\omega$.
:::

::: proof
(2) Substitute $\tau = t - t_0$ in $\int x(t - t_0)e^{-j\omega t}\,\dd t$ to get $e^{-j\omega t_0}\int x(\tau)e^{-j\omega\tau}\,\dd\tau$. (3) $\int x(t)e^{-j(\omega - \omega_0)t}\,\dd t = X(j(\omega - \omega_0))$. (4) Conjugate the definition, using $x^* = x$. (5) For $a > 0$ substitute $\tau = at$: $\int x(at)e^{-j\omega t}\,\dd t = \frac1a\int x(\tau)e^{-j(\omega/a)\tau}\,\dd\tau$; for $a < 0$ the limits swap and give $1/\lvert a\rvert$. (6) Differentiate the inverse transform under the integral sign: $x'(t) = \frac{1}{2\pi}\int j\omega X(j\omega)e^{j\omega t}\,\dd\omega$. The integration rule follows from the convolution theorem below with $h = u$. (7) Swap the names of $t$ and $\omega$ in the inverse formula: $2\pi x(-t) = \int X(j\omega)e^{-j\omega t}\,\dd\omega$, which says that $2\pi x(-\cdot)$ is the transform of $X$. (8) Write $\int\lvert x\rvert^2 = \int x^*(t)\big[\frac{1}{2\pi}\int X(j\omega)e^{j\omega t}\,\dd\omega\big]\dd t$, swap the integrals, and recognise $\int x^*(t)e^{j\omega t}\,\dd t = X^*(j\omega)$.
:::

The time-scaling property is the **time–bandwidth trade-off** in its purest form: compressing a signal by $a$ stretches its spectrum by $a$. Playing a tape at double speed doubles every frequency; a pulse half as long needs twice the bandwidth. The figure shows it for a Gaussian, the one signal whose transform has the same shape.

::: widget plot
f: exp(-x^2/(2*s^2)); exp(-s^2*x^2/2)
x: -6, 6
y: -0.1, 1.2
sliders: s=1:0.3:3:0.05
labels: x(t) = e^{-t^2/2\sigma^2}; X(j\omega)/X(0)
caption: A Gaussian pulse of width $\sigma$ (blue, against $t$) and its normalised spectrum (orange, against $\omega$), which is a Gaussian of width $1/\sigma$. Drag $\sigma$: as one narrows the other widens, and the product of their RMS widths stays $\sigma\cdot(1/\sigma) = 1$. The Gaussian achieves the smallest possible product, a result known as the uncertainty principle of signal analysis.
:::

Parseval's relation identifies $\lvert X(j\omega)\rvert^2/2\pi$ as the **energy spectral density**: the energy of $x$ in a band of frequencies is the integral of $\lvert X\rvert^2/2\pi$ over that band (counting both positive and negative frequencies).

::: example How much bandwidth does an exponential pulse need? {#ex-energy-bandwidth}
For $x(t) = e^{-at}u(t)$, find the fraction of the energy at frequencies $\lvert\omega\rvert < W$, and the bandwidth containing $90\%$ of the energy for $a = 1000\,\mathrm{s^{-1}}$.
::: solution
The total energy is $\int_0^\infty e^{-2at}\,\dd t = 1/(2a)$. Check with Parseval: $\frac{1}{2\pi}\int\frac{\dd\omega}{a^2 + \omega^2} = \frac{1}{2\pi}\cdot\frac{\pi}{a} = \frac{1}{2a}$. The energy in $\lvert\omega\rvert < W$ is

$$
\frac{1}{2\pi}\int_{-W}^{W}\frac{\dd\omega}{a^2 + \omega^2} = \frac{1}{\pi a}\arctan\frac{W}{a},
$$

a fraction $\frac{2}{\pi}\arctan(W/a)$ of the total. Setting this to $0.9$: $\arctan(W/a) = 0.45\pi$, $W = a\tan(0.45\pi) = 6.31a$. For $a = 1000\,\mathrm{s^{-1}}$, $W = 6310\,\mathrm{rad/s}$, i.e. $1.00\,\mathrm{kHz}$. The $3\,\mathrm{dB}$ bandwidth $W = a$ contains only half of the energy; $99\%$ would need $W = a\tan(0.495\pi) = 63.7a$. The slow $1/\omega$ decay of the spectrum, caused by the jump at $t = 0$, makes "the" bandwidth of this pulse very definition-dependent.
:::
:::

::: quiz
A signal $x(t)$ has bandwidth $5\,\mathrm{kHz}$ (its spectrum is zero for $\lvert f\rvert > 5\,\mathrm{kHz}$). What is the bandwidth of $x(3t)$?
- [ ] $5/3\,\mathrm{kHz}$
- [ ] $5\,\mathrm{kHz}$
- [x] $15\,\mathrm{kHz}$
- [ ] $45\,\mathrm{kHz}$
::: solution
By the scaling property, $x(3t) \leftrightarrow \frac13X(j\omega/3)$, which is non-zero for $\lvert\omega/3\rvert < 2\pi\cdot5\,\mathrm{kHz}$, i.e. for $\lvert f\rvert < 15\,\mathrm{kHz}$. Compressing time by $3$ stretches frequency by $3$.
:::
:::

## The convolution and multiplication theorems {#sec-convolution}

::: theorem Convolution theorem {#thm-convolution}
If $y = x * h$, then

$$
Y(j\omega) = X(j\omega)\,H(j\omega).
$$ {#eq-conv-thm}

Dually, multiplication in time is convolution in frequency:

$$
x(t)\,p(t) \;\leftrightarrow\; \frac{1}{2\pi}\,X(j\omega) * P(j\omega) = \frac{1}{2\pi}\int_{-\infty}^{\infty}X(j\theta)\,P(j(\omega - \theta))\,\dd\theta .
$$ {#eq-mult-thm}
:::

::: proof
$Y(j\omega) = \int\Big[\int x(\tau)h(t - \tau)\,\dd\tau\Big]e^{-j\omega t}\,\dd t$. Swap the integrals and substitute $\sigma = t - \tau$ in the inner one: $\int h(t - \tau)e^{-j\omega t}\,\dd t = e^{-j\omega\tau}\int h(\sigma)e^{-j\omega\sigma}\,\dd\sigma = e^{-j\omega\tau}H(j\omega)$. What remains is $H(j\omega)\int x(\tau)e^{-j\omega\tau}\,\dd\tau = H(j\omega)X(j\omega)$. The multiplication theorem follows in the same way from the inverse transform, or from the convolution theorem by duality.
:::

This is the theorem that makes the frequency domain worth visiting. The frequency response $H(j\omega)$ of an LTI system, defined in [[signals-systems/convolution]] as the eigenvalue for $e^{j\omega t}$, is also the Fourier transform of the impulse response, and the output spectrum is the input spectrum multiplied by it, frequency by frequency. A cascade of systems has frequency response $H_1H_2$, which in decibels is $\lvert H_1\rvert_{\mathrm{dB}} + \lvert H_2\rvert_{\mathrm{dB}}$, the reason Bode plots are drawn in decibels ([[circuits-2/frequency-response]]).

::: example Convolution by multiplication {#ex-conv-thm}
Use the convolution theorem to find $y(t) = e^{-t}u(t) * e^{-2t}u(t)$.
::: solution
$Y(j\omega) = \dfrac{1}{1 + j\omega}\cdot\dfrac{1}{2 + j\omega}$. Partial fractions in the variable $j\omega$:

$$
\frac{1}{(1 + j\omega)(2 + j\omega)} = \frac{A}{1 + j\omega} + \frac{B}{2 + j\omega},\quad A = \frac{1}{2 - 1} = 1,\quad B = \frac{1}{1 - 2} = -1.
$$

Each term is a known transform, so $y(t) = (e^{-t} - e^{-2t})u(t)$, the result found by direct convolution in the exercises of [[signals-systems/convolution]] with much less effort. Partial fractions plus a table is the standard method for inverting rational transforms, developed fully for the Laplace transform.
:::
:::

::: example The triangular pulse without integration {#ex-triangle-ft}
Find the Fourier transform of the triangular pulse $x(t) = 1 - \lvert t\rvert/T$ for $\lvert t\rvert < T$ (and $0$ otherwise), and compare the decay of its spectrum with that of the rectangular pulse.
::: solution
A rectangular pulse $p(t)$ of height $1$ on $\lvert t\rvert < T/2$ convolved with itself gives a triangle of base $[-T, T]$ and peak value $T$ (the overlap length at $t = 0$), as in [[signals-systems/convolution#ex-triangle]]. Hence $x = \frac1T\,p * p$. By [[#ex-rect]] with $T_1 = T/2$, $P(j\omega) = 2\sin(\omega T/2)/\omega$, and the convolution theorem gives

$$
X(j\omega) = \frac1T\left(\frac{2\sin(\omega T/2)}{\omega}\right)^2 = T\left(\frac{\sin(\omega T/2)}{\omega T/2}\right)^2 .
$$

At $\omega = 0$ this is $T$, the area of the triangle. The spectrum is non-negative, has zeros at $\omega = 2\pi k/T$, and decays as $1/\omega^2$ instead of $1/\omega$: the triangle is continuous, with jumps only in its slope. Its sidelobes are much lower: the first one is at about $4.7\%$ of the peak ($-26.5\,\mathrm{dB}$), against $21.7\%$ ($-13.3\,\mathrm{dB}$) for the rectangle. This is why smooth pulse shapes are used when spectrum must be conserved, and why tapered windows are used in spectral analysis.
:::
:::

::: quiz
A filter has $H(j\omega) = e^{-j\omega/1000}$ for $\lvert\omega\rvert < 2\pi\times5000\,\mathrm{rad/s}$. A signal band-limited to $4\,\mathrm{kHz}$ passes through it. The output is
- [ ] distorted, because the phase changes with frequency
- [x] the input delayed by $1\,\mathrm{ms}$
- [ ] the input advanced by $1\,\mathrm{ms}$
- [ ] the input delayed by $1000\,\mathrm{s}$
::: solution
Over the signal's band the gain is $1$ and the phase is $-\omega t_d$ with $t_d = 10^{-3}\,\mathrm{s}$, linear in $\omega$. By [[#eq-distortionless]] the output is $x(t - 1\,\mathrm{ms})$. A phase that varies with frequency causes distortion only if it is not linear.
:::
:::

### Modulation

The multiplication theorem with $p(t) = \cos\omega_ct$, whose transform is $\pi[\delta(\omega - \omega_c) + \delta(\omega + \omega_c)]$, gives the **modulation property**:

$$
x(t)\cos\omega_ct \;\leftrightarrow\; \tfrac12\big[X(j(\omega - \omega_c)) + X(j(\omega + \omega_c))\big].
$$ {#eq-modulation}

Multiplying by a carrier moves a copy of the spectrum, at half height, to $\pm\omega_c$. This is how radio works: a baseband audio signal is shifted up to a frequency where antennas are practical and where it does not overlap with other stations, and the receiver shifts it back down by multiplying again by $\cos\omega_ct$ (see [[communication-systems]]). Multiplication by a carrier is linear but time-varying, which is exactly why it can do what no LTI system can, put energy at new frequencies.

::: example Spectrum of an AM signal {#ex-am}
Speech band-limited to $4\,\mathrm{kHz}$ is multiplied by a $1\,\mathrm{MHz}$ carrier. Which band does the product occupy, and what bandwidth must the transmitter's output filter pass? If the receiver multiplies the received signal by $\cos\omega_ct$ again, what does it obtain?
::: solution
By [[#eq-modulation]] the spectrum, originally in $\lvert f\rvert < 4\,\mathrm{kHz}$, appears centred on $\pm1\,\mathrm{MHz}$, occupying $996$–$1004\,\mathrm{kHz}$ (and the mirror band at negative frequencies). The filter must pass $8\,\mathrm{kHz}$ around $1\,\mathrm{MHz}$: double-sideband modulation uses twice the message bandwidth. Multiplying again by $\cos\omega_ct$ gives $x(t)\cos^2\omega_ct = \tfrac12x(t) + \tfrac12x(t)\cos2\omega_ct$: the message at half amplitude plus a copy around $2\,\mathrm{MHz}$, which a low-pass filter with cut-off between $4\,\mathrm{kHz}$ and $1.996\,\mathrm{MHz}$ removes.
:::
:::

## Frequency response and filtering {#sec-filtering}

Write $H(j\omega) = \lvert H(j\omega)\rvert e^{j\angle H(j\omega)}$. By [[#eq-conv-thm]], the system scales each frequency component by the **gain** $\lvert H\rvert$ and shifts its phase by $\angle H$. A **filter** is a system designed to pass some frequencies and reject others.

::: definition Ideal filters and distortionless transmission {#def-ideal}
An **ideal low-pass filter** with cut-off $\omega_c$ has $H(j\omega) = 1$ for $\lvert\omega\rvert < \omega_c$ and $0$ otherwise; high-pass, band-pass and band-stop filters are defined likewise. A system is **distortionless** over a band if, in that band,

$$
H(j\omega) = K\,e^{-j\omega t_d},
$$ {#eq-distortionless}

constant gain and **linear phase**, so that its output is $Kx(t - t_d)$, a scaled, delayed copy of the input. The **group delay** of a general system is $\tau_g(\omega) = -\dfrac{\dd\angle H(j\omega)}{\dd\omega}$; for a linear-phase system it equals $t_d$ at all frequencies.
:::

That [[#eq-distortionless]] gives $Kx(t - t_d)$ is just the time-shift property. If the phase is not linear, components at different frequencies are delayed by different amounts and the waveform changes shape even if the gain is perfectly flat: **phase distortion**. The ear is fairly insensitive to it, but a data receiver or a video system is not, because pulse shapes matter.

Ideal filters cannot be built. By [[#eq-sinc]] the ideal low-pass filter's impulse response is $\sin(\omega_ct)/(\pi t)$, which extends over all negative times: the filter is not causal. It is not even BIBO stable (see [[signals-systems/convolution]]). Practical filters, Butterworth, Chebyshev, elliptic ([[circuits-2/filters]]), approximate the ideal with a transition band of finite width and are causal; the price is a phase that is not exactly linear, or, in digital FIR filters, a delay of half the filter length.

::: example Rise time and bandwidth {#ex-rise-time}
A first-order low-pass system $H(j\omega) = 1/(1 + j\omega\tau)$ responds to a step with $s(t) = 1 - e^{-t/\tau}$. Find the $10$–$90\%$ rise time $t_r$ in terms of the $3\,\mathrm{dB}$ bandwidth $f_{3\mathrm{dB}}$. An oscilloscope is to display edges with rise times down to $5\,\mathrm{ns}$ without adding more than about $1\,\mathrm{ns}$ of its own; what bandwidth should it have?
::: solution
$s(t) = 0.1$ at $t_{10} = \tau\ln(1/0.9)$ and $s(t) = 0.9$ at $t_{90} = \tau\ln10$, so $t_r = \tau(\ln10 - \ln(10/9)) = \tau\ln9 = 2.197\tau$. With $f_{3\mathrm{dB}} = 1/(2\pi\tau)$,

$$
t_r\,f_{3\mathrm{dB}} = \frac{\ln9}{2\pi} = 0.350 .
$$

This "$0.35$ rule" is used for many systems that are not exactly first order. Rise times of cascaded stages combine approximately as the root sum of squares, so an instrument rise time $t_s$ makes a $5\,\mathrm{ns}$ edge appear as $\sqrt{5^2 + t_s^2}\,\mathrm{ns}$. For an excess of at most $1\,\mathrm{ns}$, $\sqrt{25 + t_s^2} \le 6$, so $t_s \le \sqrt{11} = 3.3\,\mathrm{ns}$, and the bandwidth must be at least $0.35/3.3\,\mathrm{ns} \approx 106\,\mathrm{MHz}$. A $100\,\mathrm{MHz}$ scope is marginal; a $200\,\mathrm{MHz}$ one ($t_s \approx 1.75\,\mathrm{ns}$, displayed edge $5.3\,\mathrm{ns}$) is comfortable.
:::
:::

::: example Designing a filter for a sensor {#ex-sensor}
A strain-gauge signal of interest occupies $0$–$20\,\mathrm{Hz}$, and it is contaminated by $50\,\mathrm{Hz}$ interference. A first-order RC low-pass filter is to attenuate the interference by at least $20\,\mathrm{dB}$ while attenuating the $20\,\mathrm{Hz}$ edge of the band by no more than $3\,\mathrm{dB}$. Is that possible? If not, what order of Butterworth filter, $\lvert H\rvert^2 = 1/(1 + (\omega/\omega_c)^{2N})$, is needed with $f_c = 20\,\mathrm{Hz}$?
::: solution
With $f_c = 20\,\mathrm{Hz}$ (exactly $3\,\mathrm{dB}$ at the band edge), a first-order filter gives at $50\,\mathrm{Hz}$: $\lvert H\rvert = 1/\sqrt{1 + 2.5^2} = 0.371$, an attenuation of $8.6\,\mathrm{dB}$. Lowering $f_c$ would improve the rejection but violate the passband requirement, so one RC stage cannot do it.

For a Butterworth filter of order $N$, the attenuation at $50\,\mathrm{Hz}$ is $10\log_{10}(1 + 2.5^{2N})\,\mathrm{dB}$. We need $1 + 2.5^{2N} \ge 100$, i.e. $2.5^{2N} \ge 99$, $N \ge \frac{\log_{10}99}{2\log_{10}2.5} = 2.51$. So $N = 3$, which gives $10\log_{10}(1 + 2.5^6) = 23.9\,\mathrm{dB}$. (A $50\,\mathrm{Hz}$ notch filter is an alternative when the interference is a single known frequency.)
:::
:::

::: application Spectrum analysers
A swept spectrum analyser measures $\lvert X\rvert$ by multiplying the input by a local oscillator (shifting the spectrum, [[#eq-modulation]]), passing the product through a narrow band-pass "resolution bandwidth" filter and measuring the power that gets through, while the oscillator sweeps. An FFT analyser instead samples a block of the signal and computes the DFT ([[dsp]]). In both, the finite observation time $T$ limits the frequency resolution to roughly $1/T$, the time–bandwidth trade-off again: to resolve two tones $1\,\mathrm{Hz}$ apart you must observe for about a second.
:::

## Where this leads

The Fourier transform has a discrete-time twin, the DTFT of [[signals-systems/discrete-time-fourier]], and the two are linked by [[signals-systems/sampling]], whose central theorem follows from the impulse-train pair and the multiplication theorem. Signals that grow, such as $e^{t}u(t)$, and systems that are unstable have no Fourier transform; [[signals-systems/laplace-transform]] removes the restriction by letting the exponent $j\omega$ become a general complex $s$. The convolution theorem underlies filter design ([[circuits-2/filters]], [[dsp]]), modulation ([[communication-systems]]) and the spectral analysis of random signals ([[random-signals]]).

::: history
Fourier introduced the integral representation of non-periodic functions in his *Théorie analytique de la chaleur* (1822), and Cauchy and Poisson used it in the same years in problems of waves and heat. The energy identity was proved for square-integrable functions by Michel Plancherel in 1910, and Norbert Wiener's *The Fourier Integral and Certain of Its Applications* (1933) made the transform a tool for communication engineering. At Bell Telephone Laboratories, George Campbell and Ronald Foster compiled an extensive table of Fourier integral pairs for circuit problems in 1931. The digital computation of spectra became routine after James Cooley and John Tukey published the fast Fourier transform algorithm in 1965.
:::

::: summary
- $X(j\omega) = \int x(t)e^{-j\omega t}\,\dd t$ and $x(t) = \frac{1}{2\pi}\int X(j\omega)e^{j\omega t}\,\dd\omega$; the transform is the limit of $T_0a_k$ as the period grows.
- Key pairs: $e^{-at}u(t) \leftrightarrow 1/(a + j\omega)$; rectangle $\leftrightarrow$ sinc; $\delta \leftrightarrow 1$; $e^{j\omega_0t} \leftrightarrow 2\pi\delta(\omega - \omega_0)$; periodic signals have impulse spectra at the harmonics.
- Shift adds linear phase; scaling trades duration against bandwidth; differentiation multiplies by $j\omega$; Parseval equates energy in time and frequency.
- Convolution in time is multiplication in frequency: $Y = HX$. Multiplication in time is convolution in frequency; multiplying by a carrier shifts the spectrum (modulation).
- A distortionless system has constant gain and linear phase over the band; group delay $-\dd\angle H/\dd\omega$ measures delay per frequency.
- Ideal filters are non-causal; practical filters trade transition width and phase linearity. A first-order system obeys $t_rf_{3\mathrm{dB}} = 0.35$.
- Mind the convention: $\omega$ in $\mathrm{rad/s}$ (with $1/2\pi$ in the inverse) or $f$ in $\mathrm{Hz}$.
:::

## Exercises

::: exercise A two-sided exponential {level=1}
Find the transform of $x(t) = e^{-2\lvert t\rvert}$ and its value at $\omega = 0$.
::: solution
$X(j\omega) = \int_{-\infty}^0e^{2t}e^{-j\omega t}\,\dd t + \int_0^\infty e^{-2t}e^{-j\omega t}\,\dd t = \frac{1}{2 - j\omega} + \frac{1}{2 + j\omega} = \frac{4}{4 + \omega^2}$. At $\omega = 0$ it is $1$, the area under $x$. Real and even, as $x$ is real and even.
:::
:::

::: exercise Shifted pulse {level=1}
Find the transform of the pulse $x(t) = 1$ for $0 < t < 2$ and $0$ otherwise, using the shift property, and give its magnitude.
::: solution
It is the pulse of [[#ex-rect]] with $T_1 = 1$, delayed by $1$: $X(j\omega) = e^{-j\omega}\,\frac{2\sin\omega}{\omega}$, with $\lvert X\rvert = \lvert2\sin\omega/\omega\rvert$. The delay changes only the phase, by $-\omega$ (linear phase).
:::
:::

::: exercise Energy from the spectrum {level=1 check="0.25"}
Use Parseval's relation to find $\frac{1}{2\pi}\int_{-\infty}^{\infty}\frac{\dd\omega}{4 + \omega^2}$ without integrating.
::: solution
$1/(2 + j\omega)$ is the transform of $e^{-2t}u(t)$, and $\lvert1/(2 + j\omega)\rvert^2 = 1/(4 + \omega^2)$. By Parseval the integral equals $\int_0^\infty e^{-4t}\,\dd t = 1/4 = 0.25$.
:::
:::

::: exercise Duality {level=2}
Use duality and the pair for $e^{-a\lvert t\rvert}$ to find the transform of $x(t) = \dfrac{1}{1 + t^2}$.
::: hint
With $a = 1$: $e^{-\lvert t\rvert} \leftrightarrow 2/(1 + \omega^2)$.
:::
::: solution
Duality: if $x(t) \leftrightarrow X(j\omega)$ then $X(jt) \leftrightarrow 2\pi x(-\omega)$. With $x(t) = e^{-\lvert t\rvert}$ and $X = 2/(1 + \omega^2)$: $\frac{2}{1 + t^2} \leftrightarrow 2\pi e^{-\lvert\omega\rvert}$. Dividing by $2$: $\frac{1}{1 + t^2} \leftrightarrow \pi e^{-\lvert\omega\rvert}$. Check at $\omega = 0$: $\int\frac{\dd t}{1 + t^2} = \pi$.
:::
:::

::: exercise Output of an RC filter {level=2 check="1/(2*1000*(1 + 1000/1000))"}
The pulse $x(t) = e^{-at}u(t)$ with $a = 1000\,\mathrm{s^{-1}}$ passes through an RC low-pass filter with $H(j\omega) = b/(b + j\omega)$, $b = 1000\,\mathrm{s^{-1}}$. Find the output $y(t)$ and its energy (in $\mathrm{V^2\,s}$ if $x$ is in volts).
::: hint
With $a = b$ the product $b/(a + j\omega)^2$ is in the table.
:::
::: solution
$Y = \frac{b}{(a + j\omega)^2}$, so $y(t) = b\,te^{-at}u(t) = 1000\,te^{-1000t}u(t)$. Its energy is $b^2\int_0^\infty t^2e^{-2at}\,\dd t = b^2\cdot\frac{2}{(2a)^3} = \frac{b^2}{4a^3} = \frac{10^6}{4\times10^9} = 2.5\times10^{-4}\,\mathrm{V^2\,s}$, half of the input energy $1/(2a) = 5\times10^{-4}$. (The general formula for $a \ne b$ is $E_y = b/(2a(a + b))$, which gives the same here.)
:::
:::

::: exercise Group delay of an RC filter {level=2 check="1e-3"}
Find the group delay of $H(j\omega) = 1/(1 + j\omega\tau)$ as a function of $\omega$, and its value in seconds at $\omega = 0$ for $\tau = 1\,\mathrm{ms}$.
::: solution
$\angle H = -\arctan(\omega\tau)$, so $\tau_g = \frac{\dd}{\dd\omega}\arctan(\omega\tau) = \frac{\tau}{1 + \omega^2\tau^2}$. At $\omega = 0$, $\tau_g = \tau = 1\,\mathrm{ms}$; at the cut-off $\omega = 1/\tau$ it has halved. The phase is not linear, so a pulse whose spectrum extends past the cut-off is distorted as well as smoothed.
:::
:::

::: exercise Modulating a pulse {level=2}
Find and sketch the spectrum of $x(t) = p(t)\cos(\omega_ct)$, where $p$ is the rectangular pulse of [[#ex-rect]] with $T_1 = 1\,\mathrm{\mu s}$ and $\omega_c = 2\pi\times10\,\mathrm{MHz}$. This is a radar pulse.
::: solution
By the modulation property, $X(j\omega) = \frac{\sin((\omega - \omega_c)T_1)}{\omega - \omega_c} + \frac{\sin((\omega + \omega_c)T_1)}{\omega + \omega_c}$: two sinc functions of height $T_1 = 10^{-6}$, centred on $\pm10\,\mathrm{MHz}$, each with first zeros $\pm1/(2T_1) = \pm0.5\,\mathrm{MHz}$ from its centre. The main lobe occupies $9.5$–$10.5\,\mathrm{MHz}$. A shorter pulse would give better range resolution but need a wider band.
:::
:::

::: exercise Why the ideal filter rings {level=3}
A unit step passes through an ideal low-pass filter with cut-off $W$. Show that the output is $s(t) = \tfrac12 + \tfrac1\pi\operatorname{Si}(Wt)$, where $\operatorname{Si}(x) = \int_0^x\frac{\sin u}{u}\,\dd u$, and use $\operatorname{Si}(\pi) \approx 1.852$ to find the overshoot. Interpret the result in terms of [[signals-systems/fourier-series]].
::: hint
$s(t) = \int_{-\infty}^th(\tau)\,\dd\tau$ with $h(t) = \sin(Wt)/(\pi t)$, and $\int_{-\infty}^0h = \tfrac12$.
:::
::: solution
$h(t) = \sin(Wt)/(\pi t)$ is even with total area $H(0) = 1$, so $\int_{-\infty}^0h = \frac12$. Then $s(t) = \frac12 + \int_0^t\frac{\sin W\tau}{\pi\tau}\,\dd\tau = \frac12 + \frac1\pi\operatorname{Si}(Wt)$ (substituting $u = W\tau$). The first maximum is where $h(t) = 0$ for the first time after $0$, at $Wt = \pi$: $s = \frac12 + \frac{1.852}{\pi} = 1.0895$, an overshoot of $8.95\%$ of the step, independent of $W$. Raising $W$ makes the ringing faster but not smaller: it is the Gibbs phenomenon, now for a transform instead of a series. The response also starts before $t = 0$, showing again that the filter is not causal.
:::
:::

::: exercise Deriving the integration property {level=3}
Derive the integration property $\int_{-\infty}^tx(\tau)\,\dd\tau \leftrightarrow X(j\omega)/(j\omega) + \pi X(0)\delta(\omega)$ from the convolution theorem and the transform of $u(t)$, and explain the role of the impulse.
::: solution
The running integral is $x * u$. By the convolution theorem its transform is $X(j\omega)\big[\frac{1}{j\omega} + \pi\delta(\omega)\big] = \frac{X(j\omega)}{j\omega} + \pi X(j\omega)\delta(\omega) = \frac{X(j\omega)}{j\omega} + \pi X(0)\delta(\omega)$, using $f(\omega)\delta(\omega) = f(0)\delta(\omega)$. If $X(0) = \int x\,\dd t \ne 0$, the running integral tends to the constant $X(0)$ as $t \to \infty$ (and to $0$ as $t \to -\infty$); the impulse carries the DC average, $X(0)/2$, of that step-like signal, just as $\pi\delta(\omega)$ in the transform of $u(t)$ carries its average $\frac12$.
:::
:::
