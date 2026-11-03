A digital audio recorder samples at $48\,\mathrm{kHz}$, an ECG front end must reject mains hum while keeping a $0.05\,\mathrm{Hz}$ baseline, a radio receiver selects one channel among hundreds, and a vibration sensor in a jet engine must see only the band around the shaft frequency. Each needs a filter whose response meets a written specification — so many decibels of ripple here, so many of attenuation there — and that keeps meeting it as components age and temperatures change.

[[circuits-2/filters]] introduced the ideal filter types, the Butterworth response, the unity-gain Sallen–Key section and magnitude and frequency scaling. This chapter turns those ideas into a design method. We first solve the **approximation problem** — finding a transfer function that meets a specification — with Butterworth and **Chebyshev** responses, and meet the Bessel and elliptic alternatives. We then realise the transfer function as a cascade of second-order sections, study how sensitive each section is to its component values, and add two standard circuits: the Sallen–Key section with gain and the **Tow–Thomas biquad**, a two-integrator loop that gives low-pass and band-pass outputs with independently adjustable $\omega_0$ and $Q$. We examine how the op-amp's finite gain–bandwidth product of [[electronics-2/operational-amplifier-design]] distorts these filters, and finish with **switched-capacitor filters**, in which a capacitor and a clock replace each resistor and the response is set by capacitor ratios — the technique that put precision filters on chips.

## The approximation problem

A low-pass specification gives four numbers: the passband edge $\omega_p$ with the maximum passband loss $A_p$ (in dB), and the stopband edge $\omega_s$ with the minimum stopband attenuation $A_s$. High-pass, band-pass and band-stop specifications are converted to an equivalent low-pass **prototype** by frequency transformations, so the low-pass case is the one to solve. We look for

$$
\abs{H(j\omega)}^2 = \frac{1}{1 + \varepsilon^2F^2(\omega/\omega_p)},
$$ {#eq-characteristic-function}

where $F$ is a polynomial (or rational function) that is small for $\abs{x} < 1$ and grows rapidly for $\abs{x} > 1$. The number $\varepsilon$ fixes the passband loss: if $\abs{F} \le 1$ in the passband then the loss there is at most $10\log_{10}(1 + \varepsilon^2)\,\mathrm{dB}$, so

$$
\varepsilon^2 = 10^{A_p/10} - 1.
$$ {#eq-epsilon}

For $A_p = 3.01\,\mathrm{dB}$, $\varepsilon = 1$; for $A_p = 1\,\mathrm{dB}$, $\varepsilon^2 = 0.2589$; for $A_p = 0.5\,\mathrm{dB}$, $\varepsilon^2 = 0.1220$.

### Butterworth

The choice $F(x) = x^n$ gives the maximally flat Butterworth response of [[circuits-2/filters#def-butterworth]]. Its poles have a simple geometry.

::: theorem Butterworth poles {#thm-butterworth-poles}
The $n$-th order Butterworth low-pass function with $\abs{H(j\omega)}^2 = 1/(1 + (\omega/\omega_c)^{2n})$ has its $n$ poles on the circle $\abs{s} = \omega_c$ in the left half-plane, at

$$
s_k = \omega_c\,e^{j\theta_k}, \qquad \theta_k = \frac{\pi}{2} + \frac{(2k - 1)\pi}{2n}, \qquad k = 1, \dots, n.
$$ {#eq-butterworth-poles}

A complex pair at angle $\pm\psi$ from the negative real axis has pole quality factor $Q = 1/(2\cos\psi)$.
:::

::: proof
Because $H(s)$ has real coefficients, $\abs{H(j\omega)}^2 = H(j\omega)H(-j\omega)$, so $H(s)H(-s) = 1/(1 + (s/j\omega_c)^{2n}) = 1/\bigl(1 + (-1)^n(s/\omega_c)^{2n}\bigr)$. Its poles satisfy $(s/\omega_c)^{2n} = (-1)^{n+1} = e^{j(n + 1)\pi}$, giving the $2n$ points $s = \omega_ce^{j[(n + 1 + 2m)\pi/(2n)]}$, equally spaced on the circle. Half lie in the left half-plane; assigning those to $H(s)$ (so that it is stable) and the mirror images to $H(-s)$ gives [[#eq-butterworth-poles]]: the left-half-plane angles are $\pi/2 + (2k - 1)\pi/(2n)$. For a pair $\omega_c(-\cos\psi \pm j\sin\psi)$, the denominator is $s^2 + 2\omega_c\cos\psi\,s + \omega_c^2$; comparing with $s^2 + (\omega_0/Q)s + \omega_0^2$ gives $\omega_0 = \omega_c$ and $Q = 1/(2\cos\psi)$.
:::

For example, $n = 5$ has a real pole at $-\omega_c$ and pairs at $\psi = 36^\circ$ and $72^\circ$, with $Q = 0.618$ and $1.618$. A Butterworth filter with a passband edge defined at a loss $A_p$ other than $3\,\mathrm{dB}$ uses $F(x) = x^n$ with $\varepsilon$ from [[#eq-epsilon]]; its $3\,\mathrm{dB}$ frequency is then $\omega_p\varepsilon^{-1/n}$.

### Chebyshev

The Butterworth response spends its "flatness" near $\omega = 0$, where nobody needs it, and is only $3\,\mathrm{dB}$ down (or $A_p$) at the edge. A better use of the polynomial is to let the passband loss **ripple** between $0$ and $A_p$ across the whole passband, which allows a much faster roll-off just beyond it. The polynomials that do this are named after Pafnuty Chebyshev.

::: definition Chebyshev (type I) response {#def-chebyshev}
The **Chebyshev polynomial** of degree $n$ is

$$
T_n(x) = \begin{cases} \cos(n\arccos x), & \abs{x} \le 1,\\ \cosh(n\,\mathrm{arccosh}\,x), & \abs{x} > 1, \end{cases}
$$

so $T_0 = 1$, $T_1 = x$ and $T_{n+1} = 2xT_n - T_{n-1}$ (for example $T_2 = 2x^2 - 1$, $T_3 = 4x^3 - 3x$). The $n$-th order **Chebyshev low-pass** response with ripple $A_p$ has

$$
\abs{H(j\omega)}^2 = \frac{1}{1 + \varepsilon^2T_n^2(\omega/\omega_p)}.
$$ {#eq-chebyshev}

In the passband the loss oscillates between $0$ and $A_p$, touching each bound $n$ times in total; at $\omega_p$ the loss is exactly $A_p$; above $\omega_p$ it grows monotonically.
:::

The recurrence follows from $\cos((n + 1)t) + \cos((n - 1)t) = 2\cos t\cos nt$ with $x = \cos t$, and shows that $T_n$ is a polynomial of degree $n$ with leading coefficient $2^{n-1}$. For large $x$, $T_n(x) \approx 2^{n-1}x^n$, so far into the stopband a Chebyshev filter has $2^{n-1}$ times (that is $6(n - 1)\,\mathrm{dB}$ more attenuation than) a Butterworth filter with the same $\varepsilon$ and order.

::: theorem Order of Butterworth and Chebyshev filters {#thm-order}
To meet passband loss $\le A_p$ up to $\omega_p$ and stopband attenuation $\ge A_s$ beyond $\omega_s$, with $D = (10^{A_s/10} - 1)/(10^{A_p/10} - 1)$, the order must satisfy

$$
n_{\text{Butterworth}} \ge \frac{\log_{10}D}{2\log_{10}(\omega_s/\omega_p)}, \qquad n_{\text{Chebyshev}} \ge \frac{\mathrm{arccosh}\sqrt{D}}{\mathrm{arccosh}(\omega_s/\omega_p)}.
$$ {#eq-orders}
:::

::: proof
Both responses are monotonic beyond $\omega_p$, so it suffices to meet the attenuation at $\omega_s$: $1 + \varepsilon^2F^2(\omega_s/\omega_p) \ge 10^{A_s/10}$, that is $F^2(\omega_s/\omega_p) \ge D$ after substituting [[#eq-epsilon]]. For Butterworth, $(\omega_s/\omega_p)^{2n} \ge D$; taking logarithms gives the first inequality. For Chebyshev, $\cosh^2\bigl(n\,\mathrm{arccosh}(\omega_s/\omega_p)\bigr) \ge D$, and since $\cosh$ and $\mathrm{arccosh}$ are increasing, $n\,\mathrm{arccosh}(\omega_s/\omega_p) \ge \mathrm{arccosh}\sqrt D$.
:::

::: example Butterworth or Chebyshev? {#ex-order}
An anti-aliasing filter must have at most $1\,\mathrm{dB}$ loss up to $1\,\mathrm{kHz}$ and at least $40\,\mathrm{dB}$ of attenuation at $2\,\mathrm{kHz}$. Find the Butterworth and Chebyshev orders.
::: solution
$D = (10^4 - 1)/(10^{0.1} - 1) = 9999/0.2589 = 3.862\times10^4$, and $\omega_s/\omega_p = 2$. By [[#eq-orders]],

$$
n_B \ge \frac{\log_{10}(3.862\times10^4)}{2\log_{10}2} = \frac{4.587}{0.602} = 7.62, \qquad n_C \ge \frac{\mathrm{arccosh}(196.5)}{\mathrm{arccosh}(2)} = \frac{5.974}{1.317} = 4.54.
$$

The Butterworth filter needs order $8$ (giving $42.3\,\mathrm{dB}$ at $2\,\mathrm{kHz}$) and the Chebyshev filter order $5$ (giving $45.3\,\mathrm{dB}$). Three fewer poles means two fewer op-amp sections — at the price of $1\,\mathrm{dB}$ of ripple in the passband and, as we shall see, higher pole $Q$s.
:::
:::

::: widget plot
f: -10*log10(1 + 0.2589*x^(2*n)); -10*log10(1 + 0.2589*if(x < 1, cos(n*acos(x)), cosh(n*ln(x + sqrt(x^2 - 1))))^2)
x: 0, 2.5
y: -60, 2
sliders: n=5:2:9:1
hlines: -1; -40
vlines: 2
labels: \text{Butterworth } (A_p = 1\ \mathrm{dB}); \text{Chebyshev } (A_p = 1\ \mathrm{dB})
caption: Gain in dB against $\omega/\omega_p$ for Butterworth and Chebyshev low-pass filters of order $n$ (slider), both with $1\,\mathrm{dB}$ loss at the passband edge. Zoom into the passband: the Chebyshev curve ripples between $0$ and $-1\,\mathrm{dB}$ while the Butterworth curve droops smoothly. At the stopband edge $\omega_s = 2\omega_p$ (vertical line) find the order each needs to reach $-40\,\mathrm{dB}$: five for Chebyshev, eight for Butterworth.
:::

The Chebyshev poles lie on an ellipse rather than a circle. With $a = \tfrac1n\,\mathrm{arcsinh}(1/\varepsilon)$ and $\theta_k = (2k - 1)\pi/(2n)$, the left-half-plane poles of the normalised ($\omega_p = 1$) function are

$$
s_k = -\sinh a\,\sin\theta_k + j\cosh a\,\cos\theta_k, \qquad k = 1, \dots, n.
$$ {#eq-chebyshev-poles}

(The derivation substitutes $\omega = \cos(u)$ with complex $u$ into $1 + \varepsilon^2\cos^2(nu) = 0$; see Schaumann and Van Valkenburg, chapter 10.) The poles nearest the $j\omega$ axis have high $Q$: for the fifth-order $1\,\mathrm{dB}$ filter of [[#ex-order]] the pairs have $Q = 1.40$ and $5.56$, against $0.62$ and $1.62$ for a fifth-order Butterworth filter.

### Other approximations

- **Inverse Chebyshev** (type II) responses are flat in the passband and ripple in the stopband, with transmission zeros on the $j\omega$ axis.
- **Elliptic** (Cauer) responses ripple in both bands and have the steepest transition of all for a given order: the specification of [[#ex-order]] needs only $n = 4$. Their transmission zeros require notch sections.
- **Bessel** (Thomson) responses have a **maximally flat group delay** instead of a flat magnitude. A Bessel filter delays all passband frequencies by nearly the same time, so pulses keep their shape with almost no overshoot, which matters for data signals and oscilloscope front ends; its magnitude roll-off is the gentlest of the four.

::: warning Sharp magnitude means poor transients
Every step in the direction "Bessel → Butterworth → Chebyshev → elliptic" buys a sharper magnitude response with poles of higher $Q$, and therefore with more ringing in the step response and more variation of group delay near the band edge. A fifth-order $1\,\mathrm{dB}$ Chebyshev filter overshoots a step by roughly $10\,\%$ and rings for many periods of $\omega_p$. Choose the approximation for the signal: magnitude for audio and spectra, delay for pulses.
:::

::: quiz
A data-acquisition system digitises short pulses and must preserve their shape, with little overshoot, while removing high-frequency noise. Which approximation suits it best?
- [ ] Chebyshev, because it has the steepest roll-off for its order.
- [ ] Elliptic, because it needs the fewest sections.
- [x] Bessel, because its group delay is nearly constant across the passband.
- [ ] Any of them, since all have the same $-3\,\mathrm{dB}$ frequency.
::: solution
Waveform fidelity needs all frequency components of the pulse to be delayed equally, which is what a maximally flat group delay provides. Chebyshev and elliptic filters have high-$Q$ poles, large delay variation near the band edge and pronounced ringing ([[#ex-order]]'s fifth-order Chebyshev filter overshoots a step by about $10\,\%$).
:::
:::

## Cascade design and sensitivity

A transfer function of order $n$ is realised most often as a **cascade** of second-order sections (**biquads**), one for each complex pole pair, plus a first-order section if $n$ is odd. Active sections have low output impedance, so they do not load each other and their transfer functions simply multiply. Two practical rules govern the arrangement:

- **Ordering.** Put sections of increasing $Q$ along the chain (low-$Q$ first) so that the peaking of high-$Q$ sections does not overload the earlier stages; some designers instead put the high-$Q$ section last to filter the noise of earlier stages. Check the signal level at every internal node.
- **Gain distribution.** Distribute gain so that every op-amp output uses as much of its swing as possible without clipping, which maximises the dynamic range.

The quality of a section is judged by how much its response changes when a component drifts.

::: definition Sensitivity {#def-sensitivity}
The (classical) **sensitivity** of a quantity $y$ to a parameter $x$ is

$$
S_x^y = \frac{x}{y}\,\frac{\partial y}{\partial x} = \frac{\partial\ln y}{\partial\ln x},
$$ {#eq-sensitivity}

so that a relative change $\Delta x/x$ produces $\Delta y/y \approx S_x^y\,\Delta x/x$.
:::

For example, if $\omega_0 = 1/\sqrt{R_1R_2C_1C_2}$, then $S_{R_1}^{\omega_0} = S_{C_1}^{\omega_0} = -\tfrac12$ for each component: a $1\,\%$ rise in any one of them lowers $\omega_0$ by $0.5\,\%$. Sensitivities of $\pm\tfrac12$ or $\pm1$ are as good as passive components allow. Sensitivities that grow with $Q$ are the danger.

### The Sallen–Key section with gain

The **equal-component Sallen–Key low-pass** section has $R_1 = R_2 = R$ and $C_1 = C_2 = C$, and replaces the follower by a non-inverting amplifier of gain $K = 1 + R_a/R_b$. Its transfer function (exercise in [[circuits-2/filters]]) is

$$
H(s) = \frac{K\,\omega_0^2}{s^2 + (3 - K)\omega_0s + \omega_0^2}, \qquad \omega_0 = \frac{1}{RC}, \qquad Q = \frac{1}{3 - K}.
$$ {#eq-sk-gain}

It is attractive because all four frequency-determining components are equal and $Q$ is set by a resistor ratio alone.

::: proposition Sensitivity of the equal-component Sallen–Key section {#prop-sk-sensitivity}
For the equal-component section, $S_R^{\omega_0} = S_C^{\omega_0} = -1$ (for the pair) and

$$
S_K^Q = \frac{K}{3 - K} = 3Q - 1.
$$ {#eq-sk-sensitivity}

The $Q$-sensitivity grows in proportion to $Q$ itself; at $K = 3$ the poles reach the $j\omega$ axis and the section oscillates.
:::

::: proof
$\omega_0 = (RC)^{-1}$ gives $\partial\ln\omega_0/\partial\ln R = -1$. For $Q = (3 - K)^{-1}$, $\partial Q/\partial K = (3 - K)^{-2}$, so $S_K^Q = (K/Q)(3 - K)^{-2} = K/(3 - K)$. Writing $K = 3 - 1/Q$ gives $K/(3 - K) = (3 - 1/Q)Q = 3Q - 1$.
:::

For a Butterworth section, $K = 1.586$ and $S_K^Q = 1.12$: a $1\,\%$ change in $K$ changes $Q$ by $1.1\,\%$, which is fine. For a section with $Q = 10$, $S_K^Q = 29$, and $1\,\%$ resistor tolerances in $R_a/R_b$ give up to about $\pm40\,\%$ in $Q$. The unity-gain section of [[circuits-2/filters#thm-sallen-key]], whose $Q = \tfrac12\sqrt{C_1/C_2}$ has sensitivity $\pm\tfrac12$ to each capacitor, is far more robust, at the cost of a capacitor ratio $C_1/C_2 = 4Q^2$ that becomes awkward for high $Q$. Sallen–Key sections are therefore used for $Q$ up to about $3$–$5$.

::: widget plot
f: 20*log10(K) - 10*log10((1 - 10^(2*x))^2 + (10^x*(3 - K))^2)
x: -1, 1
y: -40, 40
sliders: K=1.586:1:2.99:0.001
hlines: 0
labels: \lvert H\rvert\ (\mathrm{dB})
caption: Gain of an equal-component Sallen–Key low-pass section against $x = \log_{10}(\omega/\omega_0)$ for amplifier gain $K$ (slider). At $K = 1.586$ the response is Butterworth (flat, $+4\,\mathrm{dB}$ passband gain). Raise $K$ towards $3$: $Q = 1/(3 - K)$ rises without limit and the peak grows explosively. Near $K = 2.9$, a change of $0.01$ in $K$ visibly moves the peak: that is a $Q$-sensitivity of about $29$.
:::

A **Sallen–Key high-pass** section is obtained by the **RC–CR transformation**: exchange every resistor in the frequency-determining network with a capacitor and vice versa. This maps $s \to \omega_0^2/s$, turning the low-pass response into the corresponding high-pass response with the same $\omega_0$ and $Q$.

::: example A fourth-order Chebyshev low-pass filter {#ex-chebyshev-design}
Design a low-pass filter with at most $1\,\mathrm{dB}$ ripple up to $1\,\mathrm{kHz}$ and at least $30\,\mathrm{dB}$ of attenuation at $2\,\mathrm{kHz}$, using unity-gain Sallen–Key sections with $R_1 = R_2 = 10\,\mathrm{k\Omega}$.
::: solution
**Order.** $D = 999/0.2589 = 3858$, so $n \ge \mathrm{arccosh}(62.1)/\mathrm{arccosh}(2) = 4.82/1.317 = 3.66$: $n = 4$.

**Poles.** With $\varepsilon = 0.5088$, $a = \tfrac14\mathrm{arcsinh}(1.965) = 0.357$, $\sinh a = 0.365$, $\cosh a = 1.064$. [[#eq-chebyshev-poles]] with $\theta = 22.5^\circ$ and $67.5^\circ$ gives

$$
s_1 = -0.1395 \pm j0.9834, \qquad s_2 = -0.3369 \pm j0.4073.
$$

Each pair gives $\omega_0 = \abs{s}$ and $Q = \abs{s}/(2\abs{\mathrm{Re}\,s})$ (in units of $\omega_p$): section A, $f_0 = 993\,\mathrm{Hz}$ and $Q = 3.56$; section B, $f_0 = 529\,\mathrm{Hz}$ and $Q = 0.785$.

**Components.** For the unity-gain section with equal resistors, $Q = \tfrac12\sqrt{C_1/C_2}$ and $\omega_0 = 1/(R\sqrt{C_1C_2})$, so $C_2 = 1/(2Q\omega_0R)$ and $C_1 = 4Q^2C_2$:

| section | $f_0$ | $Q$ | $C_1$ | $C_2$ |
|---|---|---|---|---|
| B (first) | $529\,\mathrm{Hz}$ | $0.785$ | $47.2\,\mathrm{nF}$ | $19.2\,\mathrm{nF}$ |
| A (second) | $993\,\mathrm{Hz}$ | $3.56$ | $114\,\mathrm{nF}$ | $2.25\,\mathrm{nF}$ |

**Check.** Each section has unit DC gain, so the cascade's response starts at $0\,\mathrm{dB}$, ripples up to $+1\,\mathrm{dB}$ in the passband (an even-order Chebyshev filter normalised to unit DC gain peaks at $+A_p$) and returns to $0\,\mathrm{dB}$ at $1\,\mathrm{kHz}$; at $2\,\mathrm{kHz}$ it is $-32.9\,\mathrm{dB}$, that is $33.9\,\mathrm{dB}$ below the passband peak. The specification is met. Section A's capacitor ratio of $51$ is inconvenient; in practice one would use a Sallen–Key section with a little gain, or a multiple-feedback or biquad section, for the high-$Q$ pair.
:::
:::

## The two-integrator loop: Tow–Thomas biquad

For higher $Q$, and when several outputs or precise tuning are wanted, filters are built from **integrators**. The idea comes from analogue computing: to realise the differential equation $\ddot y + (\omega_0/Q)\dot y + \omega_0^2y = \omega_0^2x$, integrate twice and feed the results back. Two integrators in a loop with an inversion form a lossless resonator at $\omega_0$; damping the first integrator sets $Q$.

The **Tow–Thomas biquad** uses three op-amps, each with its non-inverting input grounded:

- Op-amp 1 is a **lossy integrator**: its inverting input receives the filter input $V_i$ through $R_1$ and the loop feedback $V_3$ through $R$, and its feedback network is a capacitor $C$ in parallel with a damping resistor $R_Q$. Its output is $V_1$.
- Op-amp 2 is an **ideal integrator**: input $V_1$ through $R$, feedback capacitor $C$, output $V_2$.
- Op-amp 3 is a **unity-gain inverter** with two equal resistors $r$: $V_3 = -V_2$.

::: theorem The Tow–Thomas biquad {#thm-tow-thomas}
With ideal op-amps, the Tow–Thomas biquad has a band-pass output at $V_1$ and a low-pass output at $V_2$:

$$
\frac{V_1}{V_i} = -\frac{s/(R_1C)}{s^2 + s/(R_QC) + 1/(RC)^2}, \qquad \frac{V_2}{V_i} = \frac{1/(R_1RC^2)}{s^2 + s/(R_QC) + 1/(RC)^2},
$$ {#eq-tow-thomas}

so that

$$
\omega_0 = \frac{1}{RC}, \qquad Q = \frac{R_Q}{R}, \qquad H_{BP}(j\omega_0) = -\frac{R_Q}{R_1}, \qquad H_{LP}(0) = \frac{R}{R_1}.
$$

$\omega_0$ is set by $R$ and $C$, $Q$ by $R_Q$ alone, and the gain by $R_1$ alone.
:::

::: proof
The inverter and the second integrator give $V_3 = -V_2 = V_1/(sRC)$. KCL at the virtual ground of op-amp 1, whose feedback admittance is $sC + 1/R_Q$:

$$
\frac{V_i}{R_1} + \frac{V_3}{R} + V_1\Bigl(sC + \frac{1}{R_Q}\Bigr) = 0 \quad\Longrightarrow\quad V_1\Bigl(sC + \frac{1}{R_Q} + \frac{1}{sR^2C}\Bigr) = -\frac{V_i}{R_1}.
$$

Multiplying by $s/C$ gives $V_1\bigl(s^2 + s/(R_QC) + 1/(RC)^2\bigr) = -sV_i/(R_1C)$, the band-pass function. Then $V_2 = -V_1/(sRC)$ gives the low-pass function. Comparing the denominator with $s^2 + (\omega_0/Q)s + \omega_0^2$: $\omega_0 = 1/(RC)$ and $\omega_0/Q = 1/(R_QC)$, so $Q = R_QRC/(RC\cdot R) = R_Q/R$. At $s = j\omega_0$ the denominator is $j\omega_0/(R_QC)$, and the band-pass gain is $-(1/R_1C)/(1/R_QC) = -R_Q/R_1$. At $s = 0$ the low-pass gain is $(1/R_1RC^2)(RC)^2 = R/R_1$.
:::

Because each parameter depends on a different component, the biquad is easy to tune, and its sensitivities are all $\pm1$ or $\pm\tfrac12$, independent of $Q$. The closely related **Kerwin–Huelsman–Newcomb (state-variable)** biquad uses a summing amplifier instead of the inverter and provides high-pass, band-pass and low-pass outputs at once; adding the outputs with suitable weights gives notch and all-pass responses.

::: example A band-pass biquad {#ex-tow-thomas}
Design a Tow–Thomas band-pass filter with $f_0 = 1\,\mathrm{kHz}$, $Q = 10$ and unit gain at $f_0$, using $C = 10\,\mathrm{nF}$.
::: solution
$R = 1/(2\pi f_0C) = 1/(2\pi\times10^3\times10^{-8}) = 15.9\,\mathrm{k\Omega}$ (E96: $15.8\,\mathrm{k\Omega}$). $R_Q = QR = 159\,\mathrm{k\Omega}$ (E96: $158\,\mathrm{k\Omega}$). Unit gain at $f_0$ needs $R_1 = R_Q = 159\,\mathrm{k\Omega}$. The inverter resistors $r$ can be any convenient value, say $10\,\mathrm{k\Omega}$. The $3\,\mathrm{dB}$ bandwidth is $f_0/Q = 100\,\mathrm{Hz}$. With the E96 values, $f_0 = 1007\,\mathrm{Hz}$ and $Q = 10.0$; trimming $R$ in the second integrator moves $f_0$, and trimming $R_Q$ moves $Q$, without interaction.
:::
:::

### Finite op-amp bandwidth

Each op-amp in a filter is a feedback amplifier whose loop gain falls with frequency. Near $\omega_0$ an op-amp with unity-gain frequency $\omega_t$ contributes a small **excess phase lag**, of order $\omega_0/\omega_t$ times its noise gain, and these lags accumulate around the two-integrator loop.

::: proposition Q enhancement {#prop-q-enhancement}
If the loop of a two-integrator biquad has a small excess phase lag $\varphi$ (in radians) at $\omega_0$, the realised quality factor is approximately

$$
Q_{\text{actual}} \approx \frac{Q}{1 - Q\varphi}.
$$ {#eq-q-enhancement}

For the Tow–Thomas biquad with three identical op-amps, $\varphi \approx 4\omega_0/\omega_t$.
:::

::: proof
The characteristic equation of the biquad can be written $1 + \omega_0/(Qs) + \omega_0^2/s^2 = 0$, in which the last term is the loop gain of the two integrators and the inverter. An excess lag multiplies that term by $e^{-j\varphi} \approx 1 - j\varphi$. At $s = j\omega_0$ the terms become $1 - j/Q - (1 - j\varphi) = -j(1/Q - \varphi)$, which is the value an ideal biquad of damping $1/Q_{\text{actual}} = 1/Q - \varphi$ would have. Hence [[#eq-q-enhancement]]. The value of $\varphi$ follows from modelling each op-amp as $\omega_t/s$; a numerical solution of the three-op-amp circuit confirms it (see the example below).
:::

The lag reduces the effective damping, so $Q$ *rises*, and if $Q\varphi \to 1$ the filter oscillates. With $\omega_t = 100\,\omega_0$ and $Q = 10$, $Q\varphi = 0.4$ and the realised $Q$ is $16.7$. A nodal solution of the Tow–Thomas circuit with $f_0 = 10\,\mathrm{kHz}$, $Q = 10$ and op-amps of $f_t = 1\,\mathrm{MHz}$ gives $Q = 16.6$, a peak gain of $1.65$ instead of $1$, and a centre frequency $1\,\%$ low. With $f_t = 10\,\mathrm{MHz}$ the error falls to $Q = 10.5$.

::: warning Choose the op-amp for $Q\,f_0$, not just $f_0$
A rule of thumb "$f_t \ge 10f_0$" is adequate for Butterworth sections but not for selective filters: by [[#eq-q-enhancement]] the relative $Q$ error is about $4Qf_0/f_t$, so a $Q = 10$ section with a $5\,\%$ $Q$ error budget needs $f_t \ge 800\,f_0$. Compensating by pre-distorting $R_Q$ works only if $f_t$ is known and stable. Check also the slew rate at the largest internal signal: the band-pass node of a high-$Q$ biquad can be $Q$ times larger than the input.
:::

::: quiz
In a Tow–Thomas biquad, the damping resistor $R_Q$ is doubled while all else is unchanged. What happens?
- [ ] $\omega_0$ doubles and $Q$ is unchanged.
- [x] $Q$ doubles, $\omega_0$ is unchanged, and the band-pass gain at $\omega_0$ doubles.
- [ ] $Q$ halves and the low-pass DC gain doubles.
- [ ] Only the low-pass DC gain changes.
::: solution
By [[#thm-tow-thomas]], $\omega_0 = 1/(RC)$ does not involve $R_Q$; $Q = R_Q/R$ doubles; and the band-pass gain at $\omega_0$, $-R_Q/R_1$, doubles too. The low-pass DC gain $R/R_1$ is unchanged. To double $Q$ at constant peak gain, double $R_1$ as well.
:::
:::

## Switched-capacitor filters

An integrated active-$RC$ filter has a serious problem: on-chip resistors and capacitors each vary by $\pm10$–$20\,\%$ from wafer to wafer, independently, so a time constant $RC$ can be off by $30\,\%$ or more. Capacitor *ratios*, however, match to $0.1\,\%$ or better on the same chip, and a clock frequency can be made as accurate as a crystal. **Switched-capacitor** (SC) circuits exploit both facts by replacing each resistor with a capacitor that is switched between two nodes.

::: theorem The switched-capacitor resistor {#thm-sc-resistor}
A capacitor $C_1$ switched alternately between a node at voltage $V_1$ and a node at $V_2$, at clock frequency $f_{clk}$ (two non-overlapping phases per period $T = 1/f_{clk}$), transfers an average current

$$
I = C_1(V_1 - V_2)f_{clk},
$$

and so behaves, for signals much slower than the clock, as a resistor

$$
R_{eq} = \frac{1}{f_{clk}C_1}.
$$ {#eq-sc-resistor}
:::

::: proof
In phase 1 the capacitor connects to $V_1$ and charges to $q_1 = C_1V_1$. In phase 2 it connects to $V_2$ and its charge becomes $q_2 = C_1V_2$; the charge $\Delta q = C_1(V_1 - V_2)$ has moved from the first node to the second. This happens once per period, so the average current is $\Delta q/T = C_1(V_1 - V_2)f_{clk}$. Dividing $V_1 - V_2$ by $I$ gives [[#eq-sc-resistor]]. The approximation requires $V_1$ and $V_2$ to change little during one period, that is signal frequencies $f \ll f_{clk}$.
:::

Put a switched capacitor $C_1$ at the input of an op-amp integrator with feedback capacitor $C_2$. The integrator's time constant becomes $R_{eq}C_2 = C_2/(f_{clk}C_1)$, and its unity-gain frequency

$$
\omega_{u} = f_{clk}\,\frac{C_1}{C_2}
$$ {#eq-sc-integrator}

depends only on a capacitor ratio and the clock. Replace every integrator of a Tow–Thomas or state-variable biquad by a switched-capacitor integrator and the filter's $\omega_0$ and $Q$ become set by capacitor ratios times $f_{clk}$: accurate to a fraction of a percent, and **tunable by the clock**.

::: example A switched-capacitor integrator {#ex-sc}
A switched-capacitor integrator uses $C_1 = 1\,\mathrm{pF}$, $C_2 = 10\,\mathrm{pF}$ and $f_{clk} = 1\,\mathrm{MHz}$. Find the equivalent input resistance and the unity-gain frequency. What area of on-chip resistor would the same $R_{eq}$ need?
::: solution
$R_{eq} = 1/(10^6\times10^{-12}) = 1\,\mathrm{M\Omega}$. The unity-gain frequency is $f_u = f_{clk}C_1/(2\pi C_2) = 10^6\times0.1/(2\pi) = 15.9\,\mathrm{kHz}$. A $1\,\mathrm{M\Omega}$ polysilicon resistor at, say, $1\,\mathrm{k\Omega}$ per square would need $1000$ squares, a long serpentine occupying far more area than a $1\,\mathrm{pF}$ capacitor, with a tolerance of $\pm20\,\%$ against the capacitor ratio's $0.1\,\%$. Doubling the clock to $2\,\mathrm{MHz}$ doubles $f_u$ exactly.
:::
:::

Switched-capacitor filters are **sampled-data** systems. Their response is exactly described by the $z$-transform ([[signals-systems/z-transform]]), and the resistor approximation is good only well below $f_{clk}$, typically for $f_0 < f_{clk}/20$. Being sampled, they alias: an input component near $f_{clk}$ appears in the passband, so a simple continuous-time **anti-aliasing** filter must precede them. Practical SC integrators use four switches in a **parasitic-insensitive** arrangement, so that the stray capacitance of the switches and plates does not upset the ratio.

::: application Filters on chips
Switched-capacitor filters made the single-chip telephone codec of the late 1970s possible, and SC techniques now underlie most CMOS sampled analog circuits: the sample-and-hold and residue amplifiers of pipelined ADCs and the integrators of sigma–delta modulators ([[electronics-2/data-converters]]). For signals in the tens to hundreds of megahertz, beyond the reach of SC circuits, integrated filters use **$g_m$–$C$** integrators, whose transconductances are tuned automatically by a control loop against an on-chip reference.
:::

::: history
Pafnuty Chebyshev introduced his polynomials in 1854 in work on mechanisms. Stephen Butterworth's maximally flat filter appeared in 1930, and Wilhelm Cauer developed the theory of elliptic filters in the 1930s. W. E. Thomson described maximally flat delay (Bessel) filters in 1949. R. P. Sallen and E. L. Key published their active $RC$ sections in 1955. The state-variable biquad of W. J. Kerwin, L. P. Huelsman and R. W. Newcomb appeared in 1967, and the biquad of J. Tow (1968) and L. C. Thomas (1971) followed. D. L. Fried described switched-capacitor resistors in 1972, and in 1977 B. J. Hosticka, R. W. Brodersen and P. R. Gray at Berkeley, and J. T. Caves and colleagues at Bell Laboratories, published the first MOS switched-capacitor filters.
:::

## Where this leads

Filters appear before and after every data converter: anti-aliasing and reconstruction filters, and the noise-shaping loop filters of sigma–delta converters, in [[electronics-2/data-converters]]. Their noise, which sets the dynamic range of a filter, is analysed in [[electronics-2/electronic-noise]]. Digital filters that take over once the signal is sampled are designed in [[dsp/iir-filter-design]], often from the analogue prototypes of this chapter by the bilinear transformation. Filters at radio frequencies, where op-amps run out of bandwidth, return to inductors and transmission lines in [[rf-microwave/passive-microwave-components]].

::: summary
- The approximation problem chooses $\abs{H}^2 = 1/(1 + \varepsilon^2F^2)$ with $\varepsilon^2 = 10^{A_p/10} - 1$; Butterworth uses $F = x^n$ (poles on a circle), Chebyshev uses $T_n(x)$ (equiripple passband, poles on an ellipse).
- Required orders: $n_B \ge \log D/(2\log(\omega_s/\omega_p))$ and $n_C \ge \mathrm{arccosh}\sqrt D/\mathrm{arccosh}(\omega_s/\omega_p)$, with $D = (10^{A_s/10} - 1)/(10^{A_p/10} - 1)$; Chebyshev needs markedly fewer poles. Elliptic needs fewest; Bessel preserves waveform shape.
- High-order filters are cascades of biquads, ordered and scaled for dynamic range; sensitivity $S_x^y = \partial\ln y/\partial\ln x$ measures robustness.
- The equal-component Sallen–Key section has $Q = 1/(3 - K)$ and $S_K^Q = 3Q - 1$: suitable for low $Q$ only.
- The Tow–Thomas biquad sets $\omega_0 = 1/(RC)$, $Q = R_Q/R$ and gain independently, with low sensitivities.
- Finite op-amp bandwidth enhances $Q$: $Q_{\text{actual}} \approx Q/(1 - Q\varphi)$ with $\varphi \approx 4\omega_0/\omega_t$ for the Tow–Thomas.
- A switched capacitor is a resistor $1/(f_{clk}C)$; switched-capacitor filters have $\omega_0$ and $Q$ set by capacitor ratios and the clock.
:::

## Exercises

::: exercise Ripple parameter {level=1 check="10^(0.05)-1"}
Find $\varepsilon^2$ for a Chebyshev filter with $0.5\,\mathrm{dB}$ passband ripple.
::: solution
By [[#eq-epsilon]], $\varepsilon^2 = 10^{0.05} - 1 = 0.1220$, so $\varepsilon = 0.349$.
:::
:::

::: exercise Butterworth Q {level=1 check="1/(2*cos(pi/8))"}
What is the $Q$ of the low-$Q$ pole pair of a fourth-order Butterworth filter?
::: solution
The fourth-order poles are at $\psi = 22.5^\circ$ and $67.5^\circ$ from the negative real axis. The low-$Q$ pair has $Q = 1/(2\cos22.5^\circ) = 0.541$; the other has $Q = 1/(2\cos67.5^\circ) = 1.307$.
:::
:::

::: exercise A switched-capacitor resistor {level=1 check="1/(100e3*5e-12)"}
What resistance, in ohms, does a $5\,\mathrm{pF}$ capacitor switched at $100\,\mathrm{kHz}$ emulate?
::: solution
$R_{eq} = 1/(f_{clk}C) = 1/(10^5\times5\times10^{-12}) = 2\,\mathrm{M\Omega}$.
:::
:::

::: exercise Chebyshev order {level=2 check="4"}
A filter must have at most $0.5\,\mathrm{dB}$ ripple up to $10\,\mathrm{kHz}$ and at least $45\,\mathrm{dB}$ attenuation at $30\,\mathrm{kHz}$. Find the minimum Chebyshev order.
::: solution
$D = (10^{4.5} - 1)/0.1220 = 2.59\times10^5$, $\sqrt D = 509$, $\mathrm{arccosh}(509) = 6.93$, $\mathrm{arccosh}(3) = 1.763$. So $n \ge 3.93$, giving $n = 4$. A Butterworth filter would need $\log_{10}(2.59\times10^5)/(2\log_{10}3) = 5.67$, that is $n = 6$.
:::
:::

::: exercise Tow–Thomas low-pass {level=2}
A Tow–Thomas biquad is to provide a second-order Butterworth low-pass response at its $V_2$ output with $f_0 = 5\,\mathrm{kHz}$ and DC gain $2$, using $C = 4.7\,\mathrm{nF}$. Find $R$, $R_Q$ and $R_1$.
::: solution
$R = 1/(2\pi\times5000\times4.7\times10^{-9}) = 6.77\,\mathrm{k\Omega}$. Butterworth: $Q = 0.707$, so $R_Q = 0.707\times6.77 = 4.79\,\mathrm{k\Omega}$. DC gain $R/R_1 = 2$ gives $R_1 = 3.39\,\mathrm{k\Omega}$.
:::
:::

::: exercise Sallen–Key sensitivity {level=2 check="3*5-1"}
An equal-component Sallen–Key section is designed for $Q = 5$. What is the sensitivity $S_K^Q$, and by roughly how much can $Q$ change if $K$ is set by two $1\,\%$ resistors?
::: solution
$S_K^Q = 3Q - 1 = 14$. With $K = 3 - 1/Q = 2.8$, $R_a/R_b = 1.8$; two $1\,\%$ resistors give up to $\pm2\,\%$ in $R_a/R_b$, which changes $K = 1 + R_a/R_b$ by up to $\pm1.8/2.8\times2\,\% = \pm1.3\,\%$. So $Q$ can change by about $\pm14\times1.3\,\% \approx \pm18\,\%$.
:::
:::

::: exercise Q enhancement {level=2 check="8/(1-8*4*20e3/2e6)"}
A Tow–Thomas band-pass filter with $Q = 8$ and $f_0 = 20\,\mathrm{kHz}$ uses op-amps with $f_t = 2\,\mathrm{MHz}$. Estimate the realised $Q$.
::: solution
$\varphi \approx 4f_0/f_t = 0.04$, so $Q\varphi = 0.32$ and $Q_{\text{actual}} \approx 8/0.68 = 11.8$, a $47\,\%$ error. A faster op-amp, or pre-distortion of $R_Q$ (designing for $Q' $ with $Q'/(1 - Q'\varphi) = 8$, i.e. $Q' = 8/1.32 = 6.06$), is needed.
:::
:::

::: exercise Chebyshev poles {level=3}
(a) Show from [[#eq-chebyshev-poles]] that the Chebyshev poles lie on the ellipse $(\sigma/\sinh a)^2 + (\omega/\cosh a)^2 = 1$. (b) For $n = 2$ and $1\,\mathrm{dB}$ ripple, find the poles, $\omega_0$ and $Q$ (normalised to $\omega_p = 1$). (c) Find the DC gain of $\abs{H}^2$ in [[#eq-chebyshev]] for even $n$, and explain why the cascade of [[#ex-chebyshev-design]] peaked at $+1\,\mathrm{dB}$.
::: solution
(a) With $\sigma = -\sinh a\sin\theta$ and $\omega = \cosh a\cos\theta$, $(\sigma/\sinh a)^2 + (\omega/\cosh a)^2 = \sin^2\theta + \cos^2\theta = 1$.

(b) $\varepsilon = 0.5088$, $a = \tfrac12\mathrm{arcsinh}(1.965) = 0.714$, $\sinh a = 0.776$, $\cosh a = 1.266$, $\theta = 45^\circ$: $s = -0.549 \pm j0.895$. Then $\omega_0 = \abs s = 1.050$ and $Q = 1.050/(2\times0.549) = 0.957$.

(c) For even $n$, $T_n(0) = \cos(n\pi/2) = \pm1$, so $\abs{H(0)}^2 = 1/(1 + \varepsilon^2)$: the DC loss is $A_p$. A cascade of sections each with unit DC gain is the same response multiplied by $\sqrt{1 + \varepsilon^2}$, so its ripple runs from $0$ up to $+A_p$ instead of from $-A_p$ to $0$. For odd $n$, $T_n(0) = 0$ and the DC gain is $1$.
:::
:::

::: exercise A complete filter design {level=3}
Design a fifth-order $1\,\mathrm{dB}$ Chebyshev low-pass filter with $f_p = 1\,\mathrm{kHz}$ (the solution of [[#ex-order]]) as a first-order $RC$ section followed by two Tow–Thomas low-pass sections, using $C = 10\,\mathrm{nF}$ throughout, unit overall DC gain, and the high-$Q$ section last. Give every resistor value. What op-amp $f_t$ keeps the $Q$ error of the last section below $5\,\%$?
::: hint
Compute the five poles from [[#eq-chebyshev-poles]] with $n = 5$, $a = \tfrac15\mathrm{arcsinh}(1/\varepsilon)$.
:::
::: solution
$a = \tfrac15\mathrm{arcsinh}(1.965) = 0.2857$, $\sinh a = 0.2895$, $\cosh a = 1.0411$. With $\theta = 18^\circ, 54^\circ, 90^\circ$: $s = -0.0895 \pm j0.9902$ ($\omega_0 = 0.9941$, $Q = 5.56$), $s = -0.2342 \pm j0.6119$ ($\omega_0 = 0.6552$, $Q = 1.40$), and the real pole $s = -0.2895$.

**First-order section**: pole at $0.2895\times2\pi\times1\,\mathrm{kHz}$, i.e. $289.5\,\mathrm{Hz}$: $R = 1/(2\pi\times289.5\times10^{-8}) = 55.0\,\mathrm{k\Omega}$, buffered by a follower.

**Section B** ($f_0 = 655.2\,\mathrm{Hz}$, $Q = 1.40$): $R = 1/(2\pi\times655.2\times10^{-8}) = 24.3\,\mathrm{k\Omega}$, $R_Q = 1.40R = 34.0\,\mathrm{k\Omega}$, $R_1 = R = 24.3\,\mathrm{k\Omega}$ for unit DC gain.

**Section A** ($f_0 = 994.1\,\mathrm{Hz}$, $Q = 5.56$): $R = 16.0\,\mathrm{k\Omega}$, $R_Q = 5.56R = 89.0\,\mathrm{k\Omega}$, $R_1 = 16.0\,\mathrm{k\Omega}$.

For odd $n$ the DC gain of [[#eq-chebyshev]] is $1$, so unit-gain sections give the correct response, rippling between $0$ and $-1\,\mathrm{dB}$.

**Op-amp**: the $Q$ error $\approx 4Qf_0/f_t \le 0.05$ needs $f_t \ge 4\times5.56\times994/0.05 = 442\,\mathrm{kHz}$; any modern general-purpose op-amp of $1\,\mathrm{MHz}$ or more suffices, and $f_t \ge 4.4\,\mathrm{MHz}$ brings the error under $0.5\,\%$.
:::
:::
