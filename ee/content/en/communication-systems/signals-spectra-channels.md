Tune a car radio across the FM band and you pass a new station every few hundred kilohertz between $88$ and $108\,\mathrm{MHz}$. Each station broadcasts music whose spectrum reaches only about $15\,\mathrm{kHz}$, yet it occupies roughly $200\,\mathrm{kHz}$ of spectrum near $100\,\mathrm{MHz}$, and dozens of them share the same air without interfering. A mobile phone does something similar with far more stations — every handset in a cell — and far less spectrum per bit. How a message can be moved up to a radio frequency, how much spectrum it then needs, and what the medium in between does to it are the first questions of communication engineering.

This lesson sets up the language for the whole course. We describe signals by their spectra and define what "bandwidth" means (there are several answers). We then show that every **bandpass** signal — a signal whose spectrum is concentrated around a carrier frequency $f_c$ — is completely described by a slowly varying complex signal, its **complex envelope**, so that radio-frequency systems can be analysed, simulated and built at baseband. The **Hilbert transform** gives the tools to compute complex envelopes and will reappear in single-sideband modulation. Finally we model **channels**: linear filtering, delay and distortion, additive noise, and the ultimate limit set by Shannon's capacity formula. The Fourier analysis is that of [[signals-systems/fourier-transform]]; noise is treated properly in [[random-signals/gaussian-noise]].

## The communication problem {#sec-problem}

Every communication system, from a telegraph to a 5G base station, has the same skeleton. A **source** produces a **message** $m(t)$ (speech, video, a file). The **transmitter** converts it into a signal $s(t)$ suited to the medium. The **channel** — wire, cable, fibre or radio path — delivers a modified version $r(t)$ to the **receiver**, which produces an estimate $\hat m(t)$ of the message for the **destination**. The channel does three kinds of damage: it **attenuates** (a radio link may lose a factor of $10^{12}$ in power), it **distorts** (it does not pass all frequencies equally or with the same delay), and it **adds noise and interference**. Communication engineering is the art of designing $s(t)$ and the receiver so that $\hat m$ is as close as possible to $m$ for a given transmitted power and a given slice of spectrum.

Messages are usually **baseband**: their spectrum extends from (or near) zero frequency up to some highest frequency $W$. Telephone speech occupies about $300$–$3400\,\mathrm{Hz}$, high-fidelity audio $20\,\mathrm{Hz}$–$20\,\mathrm{kHz}$, a baseband data stream from DC to roughly its bit rate. Radio channels, in contrast, are **passband**: they pass frequencies in a band around some $f_c$ and nothing at DC. **Modulation** — varying the amplitude, frequency or phase of a carrier $\cos(2\pi f_ct)$ according to the message — moves the message spectrum to where the channel can carry it. There are three reasons to do so.

- **Antennas.** An antenna radiates efficiently when its size is comparable to the wavelength $\lambda = c/f$, a quarter-wave monopole being typical. At $3\,\mathrm{kHz}$, $\lambda = (3\times10^8\,\mathrm{m/s})/(3\times10^3\,\mathrm{Hz}) = 100\,\mathrm{km}$, so a quarter-wave antenna would be $25\,\mathrm{km}$ tall; at $100\,\mathrm{MHz}$ it is $0.75\,\mathrm{m}$.
- **Sharing.** Different messages placed on different carriers occupy disjoint frequency bands and can share one medium: **frequency-division multiplexing** (FDM). Every broadcast band and every cable-television system works this way.
- **Trading bandwidth for noise immunity.** Some modulations (wideband FM, spread spectrum, coded digital modulation) deliberately use more bandwidth than the message needs and in return tolerate much more noise, as we shall see in [[communication-systems/noise-in-analog-systems]] and [[communication-systems/optimal-detection]].

### Fourier conventions for this course

Communication engineers measure frequency in hertz, so this course writes the Fourier transform with $f$ rather than $\omega$:

$$
X(f) = \int_{-\infty}^{\infty}x(t)\,e^{-j2\pi ft}\,\dd t, \qquad x(t) = \int_{-\infty}^{\infty}X(f)\,e^{j2\pi ft}\,\dd f .
$$ {#eq-ft-f}

This is the transform $X(j\omega)$ of [[signals-systems/fourier-transform]] evaluated at $\omega = 2\pi f$; the inverse has no factor $1/2\pi$, and the impulse pairs become $1 \leftrightarrow \delta(f)$ and $\cos(2\pi f_0t) \leftrightarrow \tfrac12[\delta(f - f_0) + \delta(f + f_0)]$. Four properties are used constantly: the **modulation theorem** $x(t)e^{j2\pi f_0t} \leftrightarrow X(f - f_0)$, hence

$$
x(t)\cos(2\pi f_0t) \leftrightarrow \tfrac12\big[X(f - f_0) + X(f + f_0)\big];
$$ {#eq-mod-thm}

the **convolution theorem** $x * h \leftrightarrow X(f)H(f)$; conjugate symmetry $X(-f) = X^*(f)$ for real $x$; and **Parseval's theorem** $\int\lvert x(t)\rvert^2\dd t = \int\lvert X(f)\rvert^2\dd f$. Parseval's theorem says that $\lvert X(f)\rvert^2$ is the **energy spectral density** of $x$: the energy per hertz at frequency $f$. For power signals (periodic signals, carriers, noise) the corresponding quantity is the **power spectral density** $S_x(f)$, whose integral is the average power; for random signals it is defined through the autocorrelation in [[random-signals/correlation-spectra]].

::: warning Hertz or radians per second?
A bandwidth of "$2\pi\times 10^3$" in $\mathrm{rad/s}$ is $1\,\mathrm{kHz}$. Mixing the two conventions — taking a pair from a table written in $\omega$ and using it with $f$ — produces stray factors of $2\pi$ that survive into bandwidths and noise powers. In this course every bandwidth is in hertz and every spectrum is a function of $f$; when you consult a text written in $\omega$, convert before you compute.
:::

## Bandwidth {#sec-bandwidth}

A time-limited signal cannot be strictly band-limited, and a strictly band-limited signal lasts forever; every practical signal therefore has a spectrum that tails off without ever reaching zero for good. "Bandwidth" must then be defined by a convention, and several are in use.

::: definition Bandwidth {#def-bandwidth}
Let $x(t)$ be a real baseband signal with energy (or power) spectral density $\Psi(f)$, an even function of $f$. Its bandwidth $B$ is the positive-frequency width of the band that contains "essentially all" of the spectrum, made precise in one of the following ways.

- **Absolute bandwidth:** $\Psi(f) = 0$ for $\lvert f\rvert > B$ (exists only for strictly band-limited signals).
- **3-dB bandwidth:** the frequency at which $\Psi(f)$ falls to half its peak value (for spectra peaked at $f = 0$).
- **Null-to-null bandwidth** (for baseband signals, the **first-null bandwidth**): the frequency of the first zero of $\Psi(f)$.
- **Fractional-power (containment) bandwidth:** the $B$ for which $\int_{-B}^{B}\Psi(f)\,\dd f$ is a stated fraction, typically $99\,\%$, of the total.
- **Noise-equivalent bandwidth** of a filter $H(f)$: $B_N = \dfrac{1}{\lvert H(0)\rvert^2}\displaystyle\int_0^\infty\lvert H(f)\rvert^2\dd f$, the width of the ideal filter that passes the same white-noise power.

For a **bandpass** signal, whose spectrum is concentrated in $f_c - B/2 < \lvert f\rvert < f_c + B/2$, the bandwidth is the full width $B$ of the band around $f_c$, measured on the positive-frequency axis.
:::

The regulators who allocate the spectrum use the containment definition: the International Telecommunication Union's **occupied bandwidth** is the $99\,\%$ power bandwidth. Engineers designing a filter use the 3-dB bandwidth; those computing noise power use the noise-equivalent bandwidth (introduced in [[random-signals/random-signals-lti]]).

::: example The bandwidth of a rectangular pulse {#ex-rect-bandwidth}
A rectangular pulse $x(t) = A$ for $\lvert t\rvert < T/2$ and $0$ otherwise is the simplest model of one transmitted bit. Find its first-null bandwidth and the bandwidths containing $90\,\%$ and $99\,\%$ of its energy, for $T = 1\,\mathrm{\mu s}$.
::: solution
The transform is $X(f) = AT\,\dfrac{\sin(\pi fT)}{\pi fT}$, so the energy spectral density is $\lvert X(f)\rvert^2 = A^2T^2\,\dfrac{\sin^2(\pi fT)}{(\pi fT)^2}$, with total energy $A^2T$ by Parseval. The first zero is at $\pi fT = \pi$: first-null bandwidth $B = 1/T = 1\,\mathrm{MHz}$.

The fraction of the energy in $\lvert f\rvert < B$ is

$$
\frac{1}{A^2T}\int_{-B}^{B}\lvert X(f)\rvert^2\dd f = 2\int_0^{BT}\frac{\sin^2(\pi u)}{(\pi u)^2}\dd u ,
$$

with $u = fT$, which must be evaluated numerically. It equals $0.774$ at $BT = 0.5$, $0.903$ at $BT = 1$, $0.950$ at $BT = 2$, and reaches $0.99$ only at $BT \approx 10.3$. So $90\,\%$ of the energy lies within the main lobe ($B_{90} \approx 1/T = 1\,\mathrm{MHz}$), but the $99\,\%$ bandwidth is about $10.3\,\mathrm{MHz}$.

The lesson is that a rectangular pulse is spectrally wasteful: its sidelobes fall only as $1/f^2$ in energy, and the last percent of the energy is spread over ten times the main-lobe width. Shaping pulses so that their spectra fall faster is the subject of [[communication-systems/baseband-transmission]].
:::
:::

::: widget plot
f: (sinc(pi*x*T))^2; 10^(-2)
x: -4, 4
y: 0, 1.1
sliders: T=1:0.25:4:0.05
labels: \lvert X(f)\rvert^2/(AT)^2; 1\,\%
caption: Normalised energy spectral density of a rectangular pulse of duration $T$ (in milliseconds, so $f$ is in kilohertz). Lengthen the pulse with the slider: the main lobe narrows in proportion, since first-null bandwidth $= 1/T$. The time–bandwidth product is fixed by the shape, not the scale. Notice how slowly the sidelobes die away; the horizontal line marks $1\,\%$ of the peak.
:::

The figure shows the most important qualitative fact about spectra: **time and frequency scale inversely**. By the scaling property $x(at) \leftrightarrow \frac{1}{\lvert a\rvert}X(f/a)$, compressing a pulse by a factor $a$ widens its spectrum by the same factor. A pulse of duration $T$ always needs a bandwidth of order $1/T$, and a channel of bandwidth $B$ can carry about $2B$ independent pulses per second (the Nyquist rate of [[signals-systems/sampling]] read backwards). Bit rate costs bandwidth.

::: quiz
A data link sends rectangular pulses of duration $T$. The pulse duration is halved to double the data rate. What happens to the first-null bandwidth and to the fraction of the energy inside it?
- [ ] Both halve
- [x] The bandwidth doubles; the fraction is unchanged ($90\,\%$)
- [ ] The bandwidth doubles; the fraction rises because the pulse is shorter
- [ ] The bandwidth is unchanged; the sidelobes grow
::: solution
By the scaling property the whole spectrum is stretched by a factor of $2$ in frequency, so the first null moves from $1/T$ to $2/T$. The *shape* of the spectrum is unchanged, so the fraction of the energy in the main lobe stays at $90.3\,\%$. Fractional bandwidths are properties of the pulse shape; they all scale as $1/T$.
:::
:::

## Bandpass signals and the complex envelope {#sec-envelope}

A bandpass signal looks, on an oscilloscope, like a carrier at $f_c$ whose amplitude and phase drift slowly compared with the carrier period. A $1\,\mathrm{MHz}$-wide Wi-Fi subchannel at $5\,\mathrm{GHz}$ changes its amplitude and phase about a million times per second while the carrier oscillates five billion times per second. All the information is in the slow variation, and we want a description that keeps it and discards the carrier.

Write the slowly varying amplitude as $a(t) \ge 0$ and the phase as $\phi(t)$:

$$
x(t) = a(t)\cos\big(2\pi f_ct + \phi(t)\big) .
$$

Expanding the cosine of a sum gives the equivalent **quadrature form**

$$
x(t) = x_I(t)\cos(2\pi f_ct) - x_Q(t)\sin(2\pi f_ct), \qquad x_I = a\cos\phi,\quad x_Q = a\sin\phi ,
$$ {#eq-quadrature}

and both are the real part of one complex expression.

::: definition Complex envelope {#def-envelope}
A real bandpass signal $x(t)$ with carrier (reference) frequency $f_c$ is written

$$
x(t) = \operatorname{Re}\big\{\tilde x(t)\,e^{j2\pi f_ct}\big\}, \qquad \tilde x(t) = x_I(t) + jx_Q(t) = a(t)\,e^{j\phi(t)} .
$$ {#eq-envelope}

The complex low-pass signal $\tilde x(t)$ is the **complex envelope** (or **baseband equivalent**) of $x$. Its real part $x_I(t)$ is the **in-phase component**, its imaginary part $x_Q(t)$ the **quadrature component**, its magnitude $a(t) = \lvert\tilde x(t)\rvert$ the **envelope** and its angle $\phi(t)$ the **phase** of $x$.
:::

The choice of $f_c$ is a matter of convenience: changing the reference frequency by $\Delta f$ multiplies $\tilde x$ by $e^{-j2\pi\Delta ft}$. The complex envelope is most useful when $f_c$ is near the middle of the band, because $\tilde x$ is then a low-pass signal with bandwidth half that of $x$.

::: theorem Spectrum of a bandpass signal {#thm-bandpass-spectrum}
If $x(t) = \operatorname{Re}\{\tilde x(t)e^{j2\pi f_ct}\}$, then

$$
X(f) = \tfrac12\big[\tilde X(f - f_c) + \tilde X^*(-f - f_c)\big] .
$$ {#eq-bp-spectrum}

If $\tilde X(f) = 0$ for $\lvert f\rvert \ge f_c$, the two terms do not overlap: the positive-frequency half of $X$ is $\tfrac12\tilde X(f - f_c)$, and conversely $\tilde X(f) = 2X(f + f_c)$ for $f > -f_c$ and $0$ otherwise. A bandpass signal of bandwidth $B$ centred on $f_c$ has a complex envelope band-limited to $\lvert f\rvert \le B/2$.
:::

::: proof
For any complex $z$, $\operatorname{Re}z = \tfrac12(z + z^*)$, so

$$
x(t) = \tfrac12\tilde x(t)e^{j2\pi f_ct} + \tfrac12\tilde x^*(t)e^{-j2\pi f_ct} .
$$

By the modulation theorem the first term has transform $\tfrac12\tilde X(f - f_c)$. The transform of $\tilde x^*(t)$ is $\int\tilde x^*(t)e^{-j2\pi ft}\dd t = \big(\int\tilde x(t)e^{j2\pi ft}\dd t\big)^* = \tilde X^*(-f)$, and shifting by $-f_c$ gives $\tilde X^*(-f - f_c)$ for the second term. If $\tilde X$ vanishes outside $\lvert f\rvert < f_c$, the first term lives on $f > 0$ and the second on $f < 0$, which proves the remaining statements.
:::

The theorem says that the complex envelope is the positive-frequency half of the spectrum, doubled and shifted down to zero. Because $\tilde X(f)$ need not be conjugate-symmetric, $\tilde x(t)$ is in general complex: a spectrum that is asymmetric about $f_c$ (as in single-sideband signals) produces a non-zero quadrature component.

::: theorem Energy, power and filtering with complex envelopes {#thm-envelope-ops}
For a bandpass signal whose complex envelope is band-limited to $\lvert f\rvert < f_c$:

1. **Energy and power.** $E_x = \tfrac12E_{\tilde x}$, i.e. $\displaystyle\int x^2(t)\,\dd t = \tfrac12\int\lvert\tilde x(t)\rvert^2\dd t$, and likewise the average power is $P_x = \tfrac12\overline{\lvert\tilde x(t)\rvert^2}$.
2. **Filtering.** If $x$ passes through an LTI system $H(f)$, the output $y$ is bandpass with complex envelope

$$
\tilde Y(f) = H_l(f)\,\tilde X(f), \qquad H_l(f) = H(f + f_c) \ \text{for } f > -f_c .
$$ {#eq-lowpass-equiv}

$H_l(f)$, the channel's response seen from the carrier frequency, is its **low-pass equivalent** transfer function.
:::

::: proof
(1) By Parseval and [[#eq-bp-spectrum]] with non-overlapping halves, $\int\lvert X\rvert^2\dd f = 2\cdot\tfrac14\int\lvert\tilde X\rvert^2\dd f = \tfrac12\int\lvert\tilde x\rvert^2\dd t$. The power statement follows by applying this to segments of length $T_0$ and letting $T_0\to\infty$; it is the familiar fact that a sinusoid of amplitude $a$ has power $a^2/2$.

(2) For $f > 0$, $Y(f) = H(f)X(f) = H(f)\cdot\tfrac12\tilde X(f - f_c)$. Since $y$ is real and bandpass, its complex envelope is $\tilde Y(f) = 2Y(f + f_c) = H(f + f_c)\tilde X(f)$ for $f > -f_c$.
:::

Part (2) is why radio systems are designed and simulated at baseband: a filter at $2.4\,\mathrm{GHz}$ acts on the complex envelope as an ordinary (possibly complex-valued) low-pass filter, and no simulation needs to resolve the carrier.

### Quadrature modulation and demodulation

Equation [[#eq-quadrature]] is also a recipe for hardware. A **quadrature modulator** multiplies $x_I(t)$ by $\cos(2\pi f_ct)$ and $x_Q(t)$ by $-\sin(2\pi f_ct)$ and adds the products. A **quadrature demodulator** recovers the components: multiplying $x(t)$ by $2\cos(2\pi f_ct)$ gives

$$
2x(t)\cos(2\pi f_ct) = x_I(t) + x_I(t)\cos(4\pi f_ct) - x_Q(t)\sin(4\pi f_ct),
$$

and a low-pass filter removes the terms at $2f_c$, leaving $x_I(t)$. Multiplying by $-2\sin(2\pi f_ct)$ and filtering leaves $x_Q(t)$. Every software-defined radio, every Wi-Fi chip and every cellular modem contains this pair of mixers driven by a local oscillator and its $90^\circ$-shifted copy; the two low-pass outputs, digitised, are the "I and Q samples" on which all further processing works.

::: example Complex envelope of a two-message signal {#ex-two-messages}
A transmitter sends $x(t) = 4\cos(2\pi\cdot1000t)\cos(2\pi f_ct) + 3\sin(2\pi\cdot500t)\sin(2\pi f_ct)$ (volts, across $1\,\Omega$) with $f_c = 1\,\mathrm{MHz}$. Find the in-phase and quadrature components, the complex envelope, the envelope at $t = 0$ and $t = 0.5\,\mathrm{ms}$, and the average power, computed both directly and from [[#thm-envelope-ops]].
::: solution
Comparing with [[#eq-quadrature]], $x_I(t) = 4\cos(2\pi\cdot1000t)$ and $-x_Q(t)\sin(\cdot) = 3\sin(2\pi\cdot500t)\sin(\cdot)$, so $x_Q(t) = -3\sin(2\pi\cdot500t)$. The complex envelope is

$$
\tilde x(t) = 4\cos(2\pi\cdot1000t) - j3\sin(2\pi\cdot500t) .
$$

At $t = 0$: $\tilde x = 4$, envelope $a = 4\,\mathrm{V}$, phase $0$. At $t = 0.5\,\mathrm{ms}$: $\cos(\pi) = -1$ and $\sin(\pi/2) = 1$, so $\tilde x = -4 - j3$, envelope $5\,\mathrm{V}$, phase $\phi = \operatorname{atan2}(-3, -4) = -143.1^\circ$.

Power from the envelope: $\overline{\lvert\tilde x\rvert^2} = \overline{x_I^2} + \overline{x_Q^2} = 16\cdot\tfrac12 + 9\cdot\tfrac12 = 12.5\,\mathrm{V^2}$, so $P = \tfrac12(12.5) = 6.25\,\mathrm{W}$.

Directly: $x^2 = x_I^2\cos^2(\cdot) + x_Q^2\sin^2(\cdot) - 2x_Ix_Q\sin(\cdot)\cos(\cdot)$. Averaged over many carrier cycles, $\cos^2$ and $\sin^2$ average to $\tfrac12$ and the cross term to $0$, so $P = \tfrac12\overline{x_I^2} + \tfrac12\overline{x_Q^2} = 4 + 2.25 = 6.25\,\mathrm{W}$. The two components are orthogonal: they carry independent messages in the same band, which is the principle of **quadrature multiplexing** used by QAM in [[communication-systems/digital-modulation]].
:::
:::

::: widget plot
f: a*cos(2*pi*0.5*x)*cos(2*pi*c*x) - b*sin(2*pi*0.3*x)*sin(2*pi*c*x); sqrt((a*cos(2*pi*0.5*x))^2 + (b*sin(2*pi*0.3*x))^2); -sqrt((a*cos(2*pi*0.5*x))^2 + (b*sin(2*pi*0.3*x))^2)
x: 0, 6
y: -3.5, 3.5
sliders: a=2:0:3:0.1; b=1:0:3:0.1; c=8:2:20:1
labels: x(t); a(t)=\lvert\tilde x(t)\rvert; -a(t)
caption: A bandpass signal $x(t) = x_I\cos(2\pi f_ct) - x_Q\sin(2\pi f_ct)$ with $x_I = a\cos(2\pi\cdot0.5t)$ and $x_Q = b\sin(2\pi\cdot0.3t)$; $c$ is the carrier frequency in the same units. The envelope $\pm\lvert\tilde x\rvert$ (orange, green) touches the carrier's peaks. Set $b = 0$: the envelope becomes $\lvert x_I\rvert$ and the carrier reverses sign where $x_I$ crosses zero. Raise $c$: the waveform fills in but the envelope does not change, because it does not depend on the carrier.
:::

::: warning Factors of 2 in complex envelopes
Texts differ on where the factor $2$ goes. This course uses $x = \operatorname{Re}\{\tilde xe^{j2\pi f_ct}\}$, so $\lvert\tilde x\rvert$ is the physical envelope (peak amplitude) and the power is $\tfrac12\overline{\lvert\tilde x\rvert^2}$. Others write $x = \sqrt2\operatorname{Re}\{\cdot\}$ (so that power is $\overline{\lvert\tilde x\rvert^2}$) or define the equivalent low-pass impulse response with an extra $\tfrac12$. All are consistent internally; mixing them makes power and noise calculations wrong by $3\,\mathrm{dB}$. Check the convention before you use a formula from another source.
:::

## The Hilbert transform and the analytic signal {#sec-hilbert}

[[#thm-bandpass-spectrum]] says that $\tilde x$ is obtained by keeping only the positive frequencies of $x$ and shifting down. Discarding negative frequencies is done by a filter with a remarkable property: it shifts the phase of every positive-frequency component by $-90^\circ$ and every negative one by $+90^\circ$.

::: definition Hilbert transform {#def-hilbert}
The **Hilbert transform** $\hat x(t)$ of a real signal $x(t)$ is the output of the LTI system with frequency response

$$
H_{\mathrm{H}}(f) = -j\operatorname{sgn}(f) = \begin{cases}-j, & f > 0,\\ 0, & f = 0,\\ +j, & f < 0,\end{cases}
\qquad\text{impulse response}\quad h_{\mathrm{H}}(t) = \frac{1}{\pi t},
$$ {#eq-hilbert}

that is $\hat x(t) = \dfrac1\pi\displaystyle\int_{-\infty}^{\infty}\frac{x(\tau)}{t - \tau}\,\dd\tau$ (a principal-value integral). The **analytic signal** (pre-envelope) of $x$ is $x_+(t) = x(t) + j\hat x(t)$.
:::

The impulse response follows from the transform pair $\operatorname{sgn}(t) \leftrightarrow 1/(j\pi f)$ and duality: $1/(\pi t) \leftrightarrow -j\operatorname{sgn}(f)$. The filter is non-causal and has infinite impulse response, so it can only be approximated (by a long FIR filter with delay, or by a pair of all-pass networks whose phases differ by $90^\circ$ across the band of interest), but its properties are simple.

::: theorem Properties of the Hilbert transform {#thm-hilbert-props}
For real signals $x$ (with no DC component where relevant):

1. $\widehat{\cos(2\pi f_0t + \theta)} = \sin(2\pi f_0t + \theta)$ and $\widehat{\sin(2\pi f_0t + \theta)} = -\cos(2\pi f_0t + \theta)$ for $f_0 > 0$.
2. Applying the transform twice gives $\hat{\hat x} = -x$; $x$ and $\hat x$ have the same energy (or power) spectral density.
3. $x$ and $\hat x$ are orthogonal: $\int x(t)\hat x(t)\,\dd t = 0$.
4. The analytic signal has spectrum $X_+(f) = 2X(f)$ for $f > 0$, $X(0)$ at $f = 0$ and $0$ for $f < 0$, and the complex envelope is $\tilde x(t) = x_+(t)\,e^{-j2\pi f_ct}$. Hence

$$
x_I(t) = x(t)\cos(2\pi f_ct) + \hat x(t)\sin(2\pi f_ct), \qquad x_Q(t) = \hat x(t)\cos(2\pi f_ct) - x(t)\sin(2\pi f_ct) .
$$ {#eq-iq-hilbert}

5. (**Bedrosian's theorem**, product form.) If $m(t)$ is low-pass with $M(f) = 0$ for $\lvert f\rvert \ge W$ and $f_c > W$, then $\widehat{m(t)\cos(2\pi f_ct)} = m(t)\sin(2\pi f_ct)$.
:::

::: proof
(1) $\cos(2\pi f_0t + \theta) = \tfrac12e^{j\theta}e^{j2\pi f_0t} + \tfrac12e^{-j\theta}e^{-j2\pi f_0t}$; the filter multiplies the first term by $-j$ and the second by $+j$, giving $\tfrac{1}{2j}\big(e^{j(2\pi f_0t + \theta)} - e^{-j(2\pi f_0t + \theta)}\big) = \sin(2\pi f_0t + \theta)$. The sine case is identical.

(2) Applying the filter twice multiplies the spectrum by $(-j\operatorname{sgn}f)^2 = -1$ for $f \neq 0$. Since $\lvert H_{\mathrm{H}}(f)\rvert = 1$ for $f \ne 0$, the spectral densities agree.

(3) By Parseval, $\int x\hat x\,\dd t = \int X(f)\hat X^*(f)\,\dd f = \int\lvert X(f)\rvert^2\,(j\operatorname{sgn}f)\,\dd f = 0$, because $\lvert X\rvert^2$ is even and $\operatorname{sgn}f$ is odd.

(4) $X_+ = X + j(-j\operatorname{sgn}f)X = (1 + \operatorname{sgn}f)X$, which is $2X$, $X$ or $0$ as stated. By [[#thm-bandpass-spectrum]], $\tilde X(f) = 2X(f + f_c)$ for $f > -f_c$, which is $X_+(f + f_c)$; shifting back in time, $\tilde x(t) = x_+(t)e^{-j2\pi f_ct}$. Taking real and imaginary parts of $(x + j\hat x)(\cos - j\sin)$ gives [[#eq-iq-hilbert]].

(5) $m(t)\cos(2\pi f_ct) = \tfrac12m(t)e^{j2\pi f_ct} + \tfrac12m(t)e^{-j2\pi f_ct}$. The first term has spectrum $\tfrac12M(f - f_c)$, which lies entirely in $f > 0$ because $f_c > W$, so the filter multiplies it by $-j$; the second lies in $f < 0$ and is multiplied by $+j$. The result is $\tfrac{1}{2j}m(t)\big(e^{j2\pi f_ct} - e^{-j2\pi f_ct}\big) = m(t)\sin(2\pi f_ct)$.
:::

::: example Checking the formulas on a single tone {#ex-hilbert-tone}
Use [[#eq-iq-hilbert]] to find the complex envelope of $x(t) = A\cos(2\pi(f_c + \Delta)t + \theta)$ with respect to $f_c$, where $0 < \Delta < f_c$, and interpret the result.
::: solution
By property (1), $\hat x = A\sin(2\pi(f_c + \Delta)t + \theta)$, so $x_+ = Ae^{j(2\pi(f_c + \Delta)t + \theta)}$ and

$$
\tilde x(t) = x_+e^{-j2\pi f_ct} = A\,e^{j(2\pi\Delta t + \theta)} .
$$

The envelope is constant ($a = A$) and the phase $\phi(t) = 2\pi\Delta t + \theta$ grows linearly. A tone above the reference frequency is, at baseband, a phasor rotating *counter-clockwise* at $\Delta$ revolutions per second; a tone below $f_c$ rotates clockwise. The complex envelope distinguishes the two sides of the carrier, which a real baseband signal could not do: $x_I = A\cos(2\pi\Delta t + \theta)$ alone is the same for $f_c \pm \Delta$, and the sign of $x_Q = A\sin(2\pi\Delta t + \theta)$ tells them apart. This is why a direct-conversion receiver needs both I and Q.
:::
:::

::: intuition Why complex numbers appear in a real system
Nothing in a radio is complex-valued. The "complex" baseband signal is simply a pair of real signals, $x_I$ and $x_Q$, carried on two carriers $90^\circ$ apart. Packing the pair into one complex number makes the algebra of frequency shifts, phase rotations and filtering exactly the algebra of phasors from circuit theory, extended to phasors that change slowly with time.
:::

## Channels {#sec-channels}

A **channel** is everything between the transmitter's output and the receiver's input. It is modelled at the level of detail the problem requires, usually by some combination of the following idealisations.

### Linear channels and distortion

Most channels are linear to a good approximation and, over the duration of a message, time-invariant: a cable, a fibre (at moderate power), a fixed microwave link. Such a channel is a filter with transfer function $H(f) = \lvert H(f)\rvert e^{j\theta(f)}$. From [[signals-systems/fourier-transform]], it transmits a baseband signal without distortion — an exact, delayed and scaled replica — if $H(f) = Ke^{-j2\pi f\tau}$ over the signal band: constant magnitude and linear phase. Departures cause **amplitude distortion** (some frequencies attenuated more than others) and **phase distortion**. The latter is measured by the **group delay**

$$
\tau_g(f) = -\frac{1}{2\pi}\frac{\dd\theta}{\dd f} ,
$$ {#eq-group-delay}

the delay experienced by a narrow group of frequencies near $f$. A distortionless channel has constant group delay. For bandpass signals the condition is weaker, and the reason is worth deriving.

::: theorem Bandpass transmission through a linear channel {#thm-bandpass-channel}
Let a bandpass signal $x(t) = a(t)\cos(2\pi f_ct + \phi(t))$, of bandwidth $B$, pass through a channel whose magnitude response is constant, $\lvert H(f)\rvert = K$, and whose phase is linear across the band, $\theta(f) \approx \theta(f_c) - 2\pi(f - f_c)\tau_g$ for $\lvert f - f_c\rvert < B/2$. Then the output is

$$
y(t) = K\,a(t - \tau_g)\cos\big(2\pi f_c(t - \tau_p) + \phi(t - \tau_g)\big), \qquad \tau_p = -\frac{\theta(f_c)}{2\pi f_c} .
$$ {#eq-group-phase}

The envelope and the phase modulation are delayed by the **group delay** $\tau_g$ and the carrier by the **phase delay** $\tau_p$; they need not be equal.
:::

::: proof
By [[#eq-lowpass-equiv]], $\tilde Y(f) = H(f + f_c)\tilde X(f)$, and over the band of $\tilde x$ ($\lvert f\rvert < B/2$), $H(f + f_c) = Ke^{j\theta(f_c)}e^{-j2\pi f\tau_g}$. Multiplication by $e^{-j2\pi f\tau_g}$ is a delay, so $\tilde y(t) = Ke^{j\theta(f_c)}\tilde x(t - \tau_g) = Ke^{j\theta(f_c)}a(t - \tau_g)e^{j\phi(t - \tau_g)}$. Then $y = \operatorname{Re}\{\tilde ye^{j2\pi f_ct}\} = Ka(t - \tau_g)\cos\big(2\pi f_ct + \theta(f_c) + \phi(t - \tau_g)\big)$, and $2\pi f_ct + \theta(f_c) = 2\pi f_c(t - \tau_p)$.
:::

The information in a bandpass signal rides on the envelope and phase, which travel at the group delay; a constant carrier phase offset is harmless for an envelope detector and is tracked by a coherent receiver. What does harm is **group-delay variation** across the band, which smears pulses in time. In a waveguide or an optical fibre the group and phase velocities differ substantially (dispersion), which is exactly this distinction.

::: example Phase distortion in an RC channel {#ex-rc-delay}
A baseband channel behaves like a first-order low-pass filter $H(f) = 1/(1 + j2\pi fRC)$ with $RC = 1\,\mathrm{\mu s}$. Find the 3-dB bandwidth, and the gain and group delay at $0$, $50$ and $100\,\mathrm{kHz}$. Is the channel distortionless for a signal occupying $0$–$100\,\mathrm{kHz}$?
::: solution
The 3-dB frequency is $f_{3} = 1/(2\pi RC) = 159.2\,\mathrm{kHz}$. The phase is $\theta(f) = -\arctan(2\pi fRC)$, and differentiating,

$$
\tau_g(f) = -\frac{1}{2\pi}\frac{\dd\theta}{\dd f} = \frac{RC}{1 + (2\pi fRC)^2} = \frac{RC}{1 + (f/f_3)^2} .
$$

| $f$ | $\lvert H\rvert$ | gain | $\tau_g$ |
|---|---|---|---|
| $0$ | $1.000$ | $0\,\mathrm{dB}$ | $1.000\,\mathrm{\mu s}$ |
| $50\,\mathrm{kHz}$ | $0.954$ | $-0.41\,\mathrm{dB}$ | $0.910\,\mathrm{\mu s}$ |
| $100\,\mathrm{kHz}$ | $0.847$ | $-1.45\,\mathrm{dB}$ | $0.717\,\mathrm{\mu s}$ |

The magnitude falls by $1.45\,\mathrm{dB}$ across the band and the group delay varies by $0.28\,\mathrm{\mu s}$, which is $2.8\,\%$ of a $10\,\mathrm{\mu s}$ period at $100\,\mathrm{kHz}$. The channel is therefore not distortionless. For analog speech this would be inaudible; for data at $200\,\mathrm{kbit/s}$ ($5\,\mathrm{\mu s}$ pulses) it causes each pulse to spread into its neighbours — the intersymbol interference of [[communication-systems/baseband-transmission]] — which an **equaliser** must correct.
:::
:::

### Additive noise and the AWGN channel

Every receiver adds noise: thermal noise in resistors and transistors, shot noise in junctions, and noise picked up by the antenna from the sky and the ground. Over the bandwidths of interest it is well modelled, as shown in [[random-signals/gaussian-noise]], as **white Gaussian noise** $w(t)$ with two-sided power spectral density $N_0/2$. Its power in a bandwidth $B$ (positive and negative frequencies together) is

$$
N = \frac{N_0}{2}\cdot 2B = N_0B, \qquad N_0 = kT_{\mathrm{sys}},
$$ {#eq-noise-power}

where $k = 1.381\times10^{-23}\,\mathrm{J/K}$ is Boltzmann's constant and $T_{\mathrm{sys}}$ the system noise temperature. At the reference temperature $T_0 = 290\,\mathrm{K}$, $kT_0 = 4.00\times10^{-21}\,\mathrm{W/Hz}$, which is $-174\,\mathrm{dBm/Hz}$ — a number every radio engineer knows by heart.

::: definition The AWGN channel {#def-awgn}
The **additive white Gaussian noise (AWGN) channel** delivers

$$
r(t) = \alpha\,s(t - \tau) + w(t) ,
$$ {#eq-awgn}

where $\alpha$ is the attenuation, $\tau$ the propagation delay and $w(t)$ zero-mean white Gaussian noise with two-sided power spectral density $N_0/2$, independent of $s$. The **signal-to-noise ratio** (SNR) in a bandwidth $B$ is $\mathrm{SNR} = P_r/(N_0B)$, where $P_r = \alpha^2P_s$ is the received signal power.
:::

The AWGN channel is the reference model of the subject. It is an excellent model of satellite and deep-space links, a good one of cables and fibres, and the starting point for wireless channels, to which [[communication-systems/wireless-communication]] adds **fading** (a random, time-varying $\alpha$) and **multipath** (several delayed copies of $s$). Other impairments — nonlinear amplifiers that create intermodulation products, interference from other users, impulsive noise from switching transients — are added to it as needed.

### The capacity of a band-limited channel

How much information can an AWGN channel of bandwidth $B$ carry? Before 1948 the answer seemed to be: as much as you like, at a correspondingly increasing error rate. Shannon showed that the true answer is a sharp threshold.

::: theorem Shannon–Hartley capacity theorem {#thm-shannon}
An AWGN channel of bandwidth $B$ (in hertz), received signal power $P$ and noise density $N_0$ has **capacity**

$$
C = B\log_2\!\left(1 + \frac{P}{N_0B}\right)\ \mathrm{bit/s} .
$$ {#eq-shannon}

For every rate $R < C$ there exist codes whose probability of error can be made as small as desired; for $R > C$ the error probability is bounded away from zero, whatever the code.
:::

::: proof {collapsed}
A full proof belongs to [[information-theory/channel-capacity]]; here is the geometric idea. By the sampling theorem, a signal of bandwidth $B$ and duration $T$ is described by about $n = 2BT$ numbers, a point in $n$-dimensional space. Signals of power $P$ lie within a sphere of radius $\sqrt{nP'}$, where $P' = P/(2B)$ is the power per sample, and noise of variance $\sigma^2 = N_0/2$ per sample moves each received point, with overwhelming probability for large $n$, to the surface of a small sphere of radius $\sqrt{n\sigma^2}$ around the transmitted point. Received points lie within a sphere of radius $\sqrt{n(P' + \sigma^2)}$. The number of non-overlapping noise spheres that fit is at most the ratio of volumes, $\big((P' + \sigma^2)/\sigma^2\big)^{n/2}$, so at most $\tfrac n2\log_2(1 + P'/\sigma^2) = BT\log_2(1 + P/(N_0B))$ bits can be distinguished in time $T$. Shannon's random-coding argument shows that this many can in fact be distinguished with vanishing error probability as $T \to \infty$.
:::

Two regimes follow from [[#eq-shannon]]. At high SNR, $C \approx B\log_2(\mathrm{SNR})$: each $3\,\mathrm{dB}$ of SNR buys one more bit per second per hertz, and the system is **bandwidth-limited**. At low SNR, $\log_2(1 + x) \approx x/\ln 2$ and $C \approx P/(N_0\ln2)$, independent of $B$: the system is **power-limited**, and extra bandwidth no longer helps. Writing $P = E_bR$ (energy per bit times bit rate) and letting $B \to \infty$ at $R = C$ gives the absolute minimum

$$
\frac{E_b}{N_0} \ge \ln 2 = 0.693 \;(-1.59\,\mathrm{dB})
$$ {#eq-shannon-limit}

for reliable communication over any AWGN channel. Every practical system is measured against these limits.

::: widget plot
f: x*log2(1 + 10^(s/10)/(x*1e6)); 10^(s/10)/(1e6*ln(2))
x: 0.1, 200
y: 0, 400
sliders: s=84:70:90:0.5
labels: C(B)\ \mathrm{[Mbit/s]}; P/(N_0\ln 2)
caption: Capacity of an AWGN channel against bandwidth $B$ (in megahertz) for a fixed received $P/N_0$, set in $\mathrm{dB\,Hz}$ by the slider ($84\,\mathrm{dB\,Hz}$ is $-90\,\mathrm{dBm}$ received at $290\,\mathrm{K}$). At small $B$ capacity grows almost linearly with bandwidth; at large $B$ the SNR becomes small and capacity saturates at $P/(N_0\ln2)$ (orange). Raise $P/N_0$ by $10\,\mathrm{dB}$ and see the ceiling rise tenfold.
:::

::: example A link-capacity design {#ex-capacity}
A receiver with system noise temperature $290\,\mathrm{K}$ picks up $-90\,\mathrm{dBm}$ from a distant transmitter. (a) Find the noise power and SNR in a $20\,\mathrm{MHz}$ channel and the Shannon capacity. (b) What bandwidth is needed, at the same received power, for a capacity of $100\,\mathrm{Mbit/s}$? (c) What is the largest rate achievable with unlimited bandwidth?
::: solution
(a) $N_0 = -174\,\mathrm{dBm/Hz}$ and $10\log_{10}(20\times10^6) = 73.0\,\mathrm{dB}$, so $N = -174 + 73.0 = -101.0\,\mathrm{dBm}$. The SNR is $-90 - (-101.0) = 11.0\,\mathrm{dB}$, a ratio of $12.5$. Then $C = 20\times10^6\log_2(13.5) = 75.1\,\mathrm{Mbit/s}$.

(b) $P/N_0 = -90 + 174 = 84.0\,\mathrm{dB\,Hz} = 2.50\times10^8\,\mathrm{Hz}$. We need $B\log_2(1 + 2.50\times10^8/B) = 10^8$. The left side increases with $B$, so we solve numerically (bisection): $B = 31.8\,\mathrm{MHz}$, at which the SNR is $9.0\,\mathrm{dB}$. Increasing the bandwidth by $59\,\%$ raises the capacity by only $33\,\%$, because the SNR falls as the noise bandwidth grows.

(c) As $B\to\infty$, $C \to P/(N_0\ln 2) = 2.50\times10^8/0.693 = 3.60\times10^8\,\mathrm{bit/s} = 360\,\mathrm{Mbit/s}$. No amount of spectrum gets past this ceiling; only more power, a better antenna or a quieter receiver does.
:::
:::

::: quiz
A link operates at an SNR of $30\,\mathrm{dB}$. Its bandwidth is doubled while the received signal power stays the same. By roughly what factor does its Shannon capacity grow?
- [ ] $4$
- [x] A little less than $2$
- [ ] Exactly $2$
- [ ] It does not change, because the SNR falls
::: solution
Doubling $B$ doubles the noise power, so the SNR falls by $3\,\mathrm{dB}$ to $27\,\mathrm{dB}$ ($501$). The capacity goes from $B\log_2(1001) = 9.97B$ to $2B\log_2(502) = 17.9B$, a factor of $1.80$. In the bandwidth-limited regime extra bandwidth helps almost in proportion; at low SNR it would help much less.
:::
:::

::: application The radio spectrum as a resource
Because capacity grows linearly with bandwidth but only logarithmically with power, spectrum is the scarcest resource in wireless communication, and it is allocated by national regulators and the ITU. As of 2026, FM broadcasting uses $88$–$108\,\mathrm{MHz}$ with $200\,\mathrm{kHz}$ channels (in most of the world), Wi-Fi uses the $2.4$, $5$ and (since Wi-Fi 6E) $6\,\mathrm{GHz}$ bands with channels of $20$ to $320\,\mathrm{MHz}$ (the widest in Wi-Fi 7), and 5G cellular systems use bands from below $1\,\mathrm{GHz}$ to millimetre-wave bands near $28$ and $39\,\mathrm{GHz}$, with carrier bandwidths up to $100\,\mathrm{MHz}$ below $6\,\mathrm{GHz}$ and $400\,\mathrm{MHz}$ at millimetre waves. Auctions of cellular spectrum have raised tens of billions of dollars, which puts a price on a hertz.
:::

## Where this leads

The complex envelope is the working representation of the rest of the course. [[communication-systems/amplitude-modulation]] builds DSB, AM, SSB and VSB signals by choosing $\tilde x(t)$ as simple functions of the message, using the Hilbert transform for SSB, and [[communication-systems/angle-modulation]] puts the message in the phase $\phi(t)$. The AWGN channel and the noise power $N_0B$ give the SNR calculations of [[communication-systems/noise-in-analog-systems]] and the error rates of [[communication-systems/optimal-detection]], always to be compared with the Shannon limit [[#eq-shannon-limit]]. Group-delay distortion returns as intersymbol interference in [[communication-systems/baseband-transmission]], and the time-varying channel as fading in [[communication-systems/wireless-communication]]. The proof of the capacity theorem and the codes that approach it are the subject of [[information-theory]].

::: history
Harry Nyquist (1924, 1928) and Ralph Hartley (1928), both at Bell Labs and AT&T, gave the first quantitative links between bandwidth and signalling rate: Nyquist showed that $2B$ independent pulses per second fit through a bandwidth $B$, and Hartley proposed measuring information by the logarithm of the number of distinguishable messages. The transform now named after David Hilbert appears in his work on integral equations in the early 1900s. Dennis Gabor's paper "Theory of communication" (1946) introduced the analytic signal and the complex representation of real signals. Claude Shannon's "A mathematical theory of communication" (1948) founded information theory, and "Communication in the presence of noise" (1949) gave the capacity formula [[#eq-shannon]] for the band-limited Gaussian channel, with the geometric argument sketched above. Shannon's limit took almost half a century to approach in practice: turbo codes (1993) and rediscovered low-density parity-check codes came within a fraction of a decibel of it.
:::

::: summary
- Modulation moves a baseband message to a passband channel, for antenna size, frequency sharing and noise immunity. This course writes spectra as functions of $f$ in hertz.
- Bandwidth is a convention: absolute, 3-dB, first-null, $99\,\%$ containment or noise-equivalent; time and bandwidth scale inversely, and a rectangular pulse of duration $T$ has first-null bandwidth $1/T$ but $99\,\%$ bandwidth $\approx 10.3/T$.
- A bandpass signal is $x = \operatorname{Re}\{\tilde xe^{j2\pi f_ct}\}$ with complex envelope $\tilde x = x_I + jx_Q = ae^{j\phi}$; $\tilde X(f) = 2X(f + f_c)$ for $f > -f_c$, power is $\tfrac12\overline{\lvert\tilde x\rvert^2}$, and filtering acts on $\tilde x$ through $H(f + f_c)$.
- The Hilbert transform ($-j\operatorname{sgn}f$) shifts every component by $90^\circ$; the analytic signal $x + j\hat x$ has only positive frequencies, and $\tilde x = (x + j\hat x)e^{-j2\pi f_ct}$.
- Through a channel with constant gain and linear phase over the band, the envelope is delayed by the group delay $\tau_g = -\theta'(f)/2\pi$; group-delay variation is distortion.
- The AWGN channel $r = \alpha s(t - \tau) + w$ has noise power $N_0B$, with $kT_0 = -174\,\mathrm{dBm/Hz}$.
- Shannon: $C = B\log_2(1 + P/(N_0B))$; at high SNR $3\,\mathrm{dB}$ buys $1\,\mathrm{bit/s/Hz}$, at low SNR $C \to P/(N_0\ln 2)$, and no system works below $E_b/N_0 = -1.59\,\mathrm{dB}$.
:::

## Exercises

::: exercise Antenna size {level=1 check="3e8/(900e6*4)"}
What is the length, in metres, of a quarter-wave antenna for a $900\,\mathrm{MHz}$ mobile phone?
::: solution
$\lambda = c/f = (3\times10^8)/(9\times10^8) = 0.333\,\mathrm{m}$, so $\lambda/4 = 0.0833\,\mathrm{m} = 8.3\,\mathrm{cm}$. That is why phones can have internal antennas at these frequencies (folded and loaded to fit), whereas a long-wave broadcast transmitter at $200\,\mathrm{kHz}$ ($\lambda/4 = 375\,\mathrm{m}$) needs a mast.
:::
:::

::: exercise Thermal noise power {level=1 check="10*log10(1.380649e-23*290*1e4/1e-3)"}
Find the thermal noise power, in dBm, in a bandwidth of $10\,\mathrm{kHz}$ at $T = 290\,\mathrm{K}$.
::: solution
$N = kTB = 1.381\times10^{-23}\times290\times10^4 = 4.00\times10^{-17}\,\mathrm{W}$. In dBm: $10\log_{10}(4.00\times10^{-17}/10^{-3}) = -134.0\,\mathrm{dBm}$, equivalently $-174 + 10\log_{10}10^4 = -174 + 40 = -134\,\mathrm{dBm}$.
:::
:::

::: exercise A Hilbert transform {level=1}
Find the Hilbert transform and the analytic signal of $x(t) = \cos(2\pi f_1t) + 2\sin(2\pi f_2t)$, with $f_1, f_2 > 0$.
::: solution
By [[#thm-hilbert-props]] (1), $\hat x(t) = \sin(2\pi f_1t) - 2\cos(2\pi f_2t)$. The analytic signal is $x + j\hat x = \big[\cos(2\pi f_1t) + j\sin(2\pi f_1t)\big] + 2\big[\sin(2\pi f_2t) - j\cos(2\pi f_2t)\big] = e^{j2\pi f_1t} - 2je^{j2\pi f_2t}$, which contains only positive frequencies, as it should.
:::
:::

::: exercise A telephone channel {level=2 check="3100*log2(1+1000)"}
An analog telephone channel passes $300$–$3400\,\mathrm{Hz}$ with an SNR of $30\,\mathrm{dB}$. Find its Shannon capacity in bit/s. Dial-up modems of the 1990s reached $33.6\,\mathrm{kbit/s}$ on analog lines; what SNR does that rate require in this bandwidth?
::: solution
$B = 3100\,\mathrm{Hz}$ and $\mathrm{SNR} = 1000$, so $C = 3100\log_2(1001) = 30.9\,\mathrm{kbit/s}$. For $33.6\,\mathrm{kbit/s}$, $\log_2(1 + \mathrm{SNR}) = 33600/3100 = 10.84$, so $\mathrm{SNR} = 2^{10.84} - 1 = 1830$, i.e. $32.6\,\mathrm{dB}$. (Good lines with a slightly wider usable band achieved it; the later $56\,\mathrm{kbit/s}$ modems avoided the analog-to-digital conversion noise on one side of the link.)
:::
:::

::: exercise The complex envelope of a frequency-offset tone {level=2}
A receiver tuned to $f_c = 100\,\mathrm{MHz}$ receives $x(t) = 2\cos(2\pi(100\,\mathrm{MHz} - 3\,\mathrm{kHz})t)$. Find $x_I(t)$, $x_Q(t)$ and $\tilde x(t)$, and sketch the path of $\tilde x(t)$ in the complex plane. What would a receiver that used only the in-phase channel be unable to tell?
::: solution
As in [[#ex-hilbert-tone]] with $\Delta = -3\,\mathrm{kHz}$: $\tilde x(t) = 2e^{-j2\pi\cdot3000t}$, so $x_I = 2\cos(2\pi\cdot3000t)$ and $x_Q = -2\sin(2\pi\cdot3000t)$. The complex envelope moves clockwise on a circle of radius $2$, three thousand times per second. The in-phase channel alone gives $2\cos(2\pi\cdot3000t)$ for a tone at either $f_c + 3\,\mathrm{kHz}$ or $f_c - 3\,\mathrm{kHz}$; only the sign of the quadrature component distinguishes them (the image problem of direct-conversion receivers).
:::
:::

::: exercise Envelope of a bandpass pulse {level=2}
The signal $x(t) = \Pi(t/T)\cos(2\pi f_ct)$, where $\Pi$ is the unit rectangle on $\lvert t\rvert < 1/2$ and $f_c \gg 1/T$, is the simplest radar pulse. Find its complex envelope, its spectrum, and its null-to-null bandwidth around $f_c$. Compare with the first-null bandwidth of $\Pi(t/T)$ itself.
::: solution
$\tilde x(t) = \Pi(t/T)$ (real), with $\tilde X(f) = T\sin(\pi fT)/(\pi fT)$. By [[#eq-bp-spectrum]], $X(f) = \tfrac T2\left[\dfrac{\sin(\pi(f - f_c)T)}{\pi(f - f_c)T} + \dfrac{\sin(\pi(f + f_c)T)}{\pi(f + f_c)T}\right]$. Around $f_c$ the main lobe runs from $f_c - 1/T$ to $f_c + 1/T$: null-to-null bandwidth $2/T$, twice the first-null bandwidth $1/T$ of the baseband pulse. Moving a signal to a carrier doubles its bandwidth, because both the positive and the negative frequencies of the baseband spectrum appear on the positive-frequency axis.
:::
:::

::: exercise Group and phase delay {level=2}
A bandpass channel has $\lvert H(f)\rvert = 1$ and phase $\theta(f) = -2\pi f\tau_0 - \pi/3$ for $f > 0$ (and the odd extension for $f < 0$), with $\tau_0 = 2\,\mathrm{\mu s}$. A signal $a(t)\cos(2\pi f_ct)$ with $f_c = 10\,\mathrm{MHz}$ is transmitted. Find the group and phase delays and the output. Would the same channel distort a baseband signal?
::: solution
$\tau_g = -\theta'(f)/(2\pi) = \tau_0 = 2\,\mathrm{\mu s}$. $\tau_p = -\theta(f_c)/(2\pi f_c) = \tau_0 + (\pi/3)/(2\pi f_c) = 2\,\mathrm{\mu s} + 1/(6f_c) = 2\,\mathrm{\mu s} + 16.7\,\mathrm{ns}$. By [[#thm-bandpass-channel]], $y(t) = a(t - 2\,\mathrm{\mu s})\cos(2\pi f_c(t - \tau_0) - \pi/3)$: the envelope is delayed intact and the carrier picks up an extra $-60^\circ$, which is harmless for a bandpass signal. For a baseband signal the phase jump at $f = 0$ (from $+\pi/3$ to $-\pi/3$) is not of the form $-2\pi f\tau$, and it would distort it (it acts partly like a Hilbert transformer).
:::
:::

::: exercise Orthogonality of I and Q {level=3}
Let $x_I$ and $x_Q$ be real low-pass signals band-limited to $\lvert f\rvert < W$, with $f_c > W$. Prove that $u(t) = x_I(t)\cos(2\pi f_ct)$ and $v(t) = x_Q(t)\sin(2\pi f_ct)$ are orthogonal, $\int u(t)v(t)\,\dd t = 0$, even when $x_I = x_Q$. Explain why this makes quadrature multiplexing possible.
::: hint
Use Bedrosian's theorem to write $v$ as a Hilbert transform, then property (3); or work with Parseval directly.
:::
::: solution
By [[#thm-hilbert-props]] (5), $x_Q(t)\sin(2\pi f_ct) = \widehat{x_Q(t)\cos(2\pi f_ct)}$. Write $p(t) = x_I\cos(2\pi f_ct)$ and $q(t) = x_Q\cos(2\pi f_ct)$, so $\int uv = \int p\,\hat q$. By Parseval, $\int p\hat q\,\dd t = \int P(f)\hat Q^*(f)\,\dd f = \int P(f)Q^*(f)\,(j\operatorname{sgn}f)\,\dd f$. Now $P(f) = \tfrac12[X_I(f - f_c) + X_I(f + f_c)]$ and similarly $Q$; with $f_c > W$ the cross terms vanish and $P(f)Q^*(f) = \tfrac14[X_I(f - f_c)X_Q^*(f - f_c) + X_I(f + f_c)X_Q^*(f + f_c)]$. Call $G(f) = X_I(f)X_Q^*(f)$. The integral is $\tfrac j4\left[\int G(f - f_c)\,\dd f - \int G(f + f_c)\,\dd f\right]$, since the first term lives on $f > 0$ and the second on $f < 0$. Both integrals equal $\int G(f)\,\dd f$, so their difference is $0$. A receiver that multiplies by $\cos$ and integrates (or low-pass filters) therefore rejects the sine-carrier signal completely, and two independent messages can share the same band and carrier frequency.
:::
:::

::: exercise The Shannon limit {level=3}
Starting from [[#eq-shannon]] with $P = E_bR$, show that reliable transmission at rate $R$ and spectral efficiency $\eta = R/B$ requires $E_b/N_0 \ge (2^\eta - 1)/\eta$. Evaluate this bound at $\eta = 1, 2, 4, 6\,\mathrm{bit/s/Hz}$ in decibels, and show that it tends to $\ln 2$ as $\eta \to 0$.
::: hint
Set $R \le C$ and divide by $B$.
:::
::: solution
$R \le B\log_2(1 + E_bR/(N_0B))$ gives $\eta \le \log_2(1 + \eta E_b/N_0)$, so $2^\eta \le 1 + \eta E_b/N_0$ and $E_b/N_0 \ge (2^\eta - 1)/\eta$. Values: $\eta = 1$: $1$, i.e. $0\,\mathrm{dB}$; $\eta = 2$: $3/2 = 1.76\,\mathrm{dB}$; $\eta = 4$: $15/4 = 5.74\,\mathrm{dB}$; $\eta = 6$: $63/6 = 10.5 = 10.21\,\mathrm{dB}$. As $\eta \to 0$, $2^\eta = e^{\eta\ln2} = 1 + \eta\ln 2 + O(\eta^2)$, so $(2^\eta - 1)/\eta \to \ln2 = -1.59\,\mathrm{dB}$. High spectral efficiency is expensive in power: going from $2$ to $6\,\mathrm{bit/s/Hz}$ costs about $8.5\,\mathrm{dB}$ of $E_b/N_0$.
:::
:::

::: exercise Designing a bandwidth for a deep-space link {level=3}
A spacecraft link delivers $P/N_0 = 50\,\mathrm{dB\,Hz}$ to the ground station. (a) What is the largest data rate any system could achieve? (b) The mission uses a code that needs $E_b/N_0 = 1\,\mathrm{dB}$ for acceptable errors. What data rate does it support? (c) What minimum bandwidth would Shannon's formula require at that rate?
::: solution
(a) $P/N_0 = 10^5\,\mathrm{Hz}$, so $C_\infty = 10^5/\ln2 = 144\,\mathrm{kbit/s}$. (b) $R = (P/N_0)/(E_b/N_0) = 10^5/10^{0.1} = 79.4\,\mathrm{kbit/s}$. (c) We need $B\log_2(1 + 10^5/B) \ge 79400$. At $B = 79.4\,\mathrm{kHz}$ the left side is $79400\log_2(2.26) = 93.4\,\mathrm{kbit/s}$, enough; at $B = 50\,\mathrm{kHz}$ it is $50000\log_2 3 = 79.2\,\mathrm{kbit/s}$, just short. Bisection gives $B_{\mathrm{min}} \approx 50.3\,\mathrm{kHz}$, a spectral efficiency of about $1.6\,\mathrm{bit/s/Hz}$. Deep-space links are power-limited, so real missions use more bandwidth than this minimum to bring the required $E_b/N_0$ closer to $-1.59\,\mathrm{dB}$.
:::
:::
