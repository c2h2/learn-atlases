Every real system that observes noise filters it. An oscilloscope probe has a bandwidth; an audio amplifier passes $20\,\mathrm{Hz}$ to $20\,\mathrm{kHz}$; a radio receiver selects a channel a few kilohertz or megahertz wide; a digital voltmeter integrates its input over a power-line cycle. The noise we actually see at the output is therefore never the raw, broadband noise of the devices but a filtered version of it, and choosing the filter is one of the most effective ways of controlling noise. Halve the bandwidth of a system that sees white noise and you halve the noise power, gaining $3\,\mathrm{dB}$ of signal-to-noise ratio for nothing.

This chapter answers the basic question: if a WSS random process enters a linear time-invariant system, what are the mean, autocorrelation and power spectral density of the output? The answers are short and beautiful — the mean is scaled by the DC gain, and the PSD is multiplied by $\abs{H}^2$ — and they are the most used results in the theory of noise. We derive them from the convolution of [[signals-systems/convolution]] and the spectra of [[random-signals/correlation-spectra]], define the **noise-equivalent bandwidth** that summarises a filter's effect on white noise, and use the results in reverse: to *generate* noise with a prescribed spectrum by filtering white noise, and to identify an unknown system from its response to noise.

## Mean and correlation of the output

Let a real, stable LTI system with impulse response $h(t)$ be driven by a real WSS process $X(t)$ with mean $\mu_X$ and autocorrelation $R_X(\tau)$. Each sample function $x(t)$ produces an output sample function by convolution,

$$
Y(t) = \int_{-\infty}^{\infty}h(\alpha)\,X(t - \alpha)\,\dd\alpha,
$$ {#eq-conv}

so the output is itself a random process. (For a stable system and a process with finite power the integral converges in mean square; we take this for granted, as is standard in an engineering course.) We write $H(f) = \int h(t)e^{-j2\pi ft}\,\dd t$ for the frequency response, the $H(j\omega)$ of [[signals-systems/fourier-transform]] evaluated at $\omega = 2\pi f$.

::: theorem Mean of the output {#thm-mean}
The output of a stable LTI system driven by a WSS process with mean $\mu_X$ has constant mean

$$
\mu_Y = \mu_X\int_{-\infty}^\infty h(\alpha)\,\dd\alpha = \mu_X\,H(0).
$$ {#eq-mean}
:::

::: proof
Take the expectation of [[#eq-conv]] and exchange expectation and integral (both are linear): $\E[Y(t)] = \int h(\alpha)\E[X(t - \alpha)]\,\dd\alpha = \mu_X\int h(\alpha)\,\dd\alpha$, and $\int h = H(0)$ by the definition of the transform at $f = 0$.
:::

The DC component of the input passes through with the DC gain of the filter, as a deterministic constant would. The fluctuating part is more interesting.

::: theorem Input–output correlations {#thm-correlations}
Under the same conditions, $X$ and $Y$ are jointly WSS, and

$$
R_{YX}(\tau) = \int_{-\infty}^\infty h(\alpha)R_X(\tau - \alpha)\,\dd\alpha = (h * R_X)(\tau),
$$ {#eq-ryx}

$$
R_Y(\tau) = \int_{-\infty}^{\infty}\!\int_{-\infty}^{\infty}h(\alpha)h(\beta)R_X(\tau - \alpha + \beta)\,\dd\alpha\,\dd\beta = (h * \tilde h * R_X)(\tau),
$$ {#eq-ry}

where $\tilde h(t) = h(-t)$ is the time-reversed impulse response.
:::

::: proof
Multiply [[#eq-conv]], written at time $t + \tau$, by $X(t)$ and take expectations:

$$
R_{YX}(\tau) = \E\Bigl[\int h(\alpha)X(t + \tau - \alpha)\,\dd\alpha\;X(t)\Bigr] = \int h(\alpha)R_X(\tau - \alpha)\,\dd\alpha ,
$$

which depends only on $\tau$. Next multiply $Y(t + \tau)$ by $Y(t) = \int h(\beta)X(t - \beta)\,\dd\beta$:

$$
R_Y(\tau) = \int\!\!\int h(\alpha)h(\beta)\E\bigl[X(t + \tau - \alpha)X(t - \beta)\bigr]\dd\alpha\,\dd\beta = \int\!\!\int h(\alpha)h(\beta)R_X(\tau - \alpha + \beta)\,\dd\alpha\,\dd\beta .
$$

Again only $\tau$ appears, so $Y$ is WSS. The inner integral over $\alpha$ is $R_{YX}(\tau + \beta)$, so $R_Y(\tau) = \int h(\beta)R_{YX}(\tau + \beta)\,\dd\beta = (\tilde h * R_{YX})(\tau)$, which is the convolution form.
:::

The time-domain formulas are sometimes the quickest route, but the frequency domain makes them almost trivial, because convolution becomes multiplication and time reversal becomes conjugation ($\tilde h \leftrightarrow H^*(f)$ for real $h$).

::: theorem Output power spectral density {#thm-output-psd}
The cross-spectrum and the output spectrum are

$$
S_{YX}(f) = H(f)\,S_X(f), \qquad S_Y(f) = \abs{H(f)}^2\,S_X(f).
$$ {#eq-output-psd}

Consequently the output power is

$$
\E\bigl[Y^2(t)\bigr] = \int_{-\infty}^\infty\abs{H(f)}^2S_X(f)\,\dd f .
$$ {#eq-output-power}
:::

::: proof
Fourier-transform [[#eq-ryx]] and [[#eq-ry]] using the convolution theorem of [[signals-systems/fourier-transform]] and $\mathcal F\{\tilde h\} = H^*(f)$: $S_{YX} = HS_X$ and $S_Y = H\,H^*S_X = \abs H^2S_X$. The power follows from [[random-signals/correlation-spectra#thm-psd-props]].
:::

The phase of $H$ has disappeared from $S_Y$: two filters with the same magnitude response produce outputs with the same spectrum and the same power, even if their waveforms look different. The phase survives in the cross-spectrum $S_{YX}$, which is how a system's full frequency response can be measured with noise.

::: corollary The PSD is a density of power {#cor-density}
Pass $X$ through an ideal band-pass filter with $\abs{H(f)} = 1$ for $f_1 < \abs f < f_2$ and $0$ elsewhere. The output power is $2\int_{f_1}^{f_2}S_X(f)\,\dd f$. In particular $S_X(f)\ge0$ for every $f$.
:::

::: proof
The power formula is [[#eq-output-power]] with $\abs H^2$ the indicator of the two bands, together with the evenness of $S_X$. If $S_X$ were negative on some small band, choosing $f_1, f_2$ to enclose it would give a negative output power, which is impossible.
:::

This is the operational meaning of the PSD promised in [[random-signals/correlation-spectra]], and it is exactly how a swept spectrum analyser works: a narrow band-pass filter (the resolution bandwidth) followed by a power detector, swept across the band.

::: warning Powers through filters: square the gain
A filter with voltage gain $\abs{H}$ multiplies the noise *power density* by $\abs{H}^2$, not by $\abs H$. Equivalently, RMS noise densities in $\mathrm{V/\sqrt{Hz}}$ are multiplied by $\abs{H}$. An amplifier with a gain of $100$ turns $10\,\mathrm{nV/\sqrt{Hz}}$ into $1\,\mu\mathrm{V/\sqrt{Hz}}$, i.e. $10^{-16}$ into $10^{-12}\,\mathrm{V^2/Hz}$: a factor of $10^4$ in power, $40\,\mathrm{dB}$ either way.
:::

## White noise through filters

When the input is white with two-sided density $N_0/2$, $S_Y(f) = \frac{N_0}{2}\abs{H(f)}^2$: the output spectrum has the shape of the filter's power response. In the time domain, [[#eq-ry]] with $R_X = \frac{N_0}{2}\delta$ collapses to

$$
R_Y(\tau) = \frac{N_0}{2}\int_{-\infty}^{\infty}h(t + \tau)h(t)\,\dd t, \qquad \E[Y^2] = \frac{N_0}{2}\int_{-\infty}^\infty h^2(t)\,\dd t = \frac{N_0}{2}\int_{-\infty}^\infty\abs{H(f)}^2\,\dd f .
$$ {#eq-white-out}

The output autocorrelation is the (deterministic) autocorrelation of the impulse response: filtered white noise remembers its past for as long as the impulse response lasts. Its power is finite whenever $h$ has finite energy, although the input power was infinite.

::: example White noise through an RC low-pass filter {#ex-rc}
White noise of two-sided density $N_0/2$ drives an $RC$ low-pass filter, $H(f) = 1/(1 + j2\pi fRC)$. Find the output PSD, autocorrelation and power. Apply the result to the thermal noise of the resistor itself, whose two-sided density is $2kTR$, to find the noise voltage on the capacitor.
::: solution
$\abs{H}^2 = 1/(1 + (2\pi fRC)^2)$, so $S_Y(f) = \dfrac{N_0/2}{1 + (2\pi fRC)^2}$, a Lorentzian. The impulse response is $h(t) = \frac{1}{RC}e^{-t/RC}u(t)$, and for $\tau \ge 0$,

$$
R_Y(\tau) = \frac{N_0}{2}\int_0^\infty\frac{1}{(RC)^2}e^{-(t + \tau)/RC}e^{-t/RC}\,\dd t = \frac{N_0}{2}\cdot\frac{1}{(RC)^2}\cdot\frac{RC}{2}e^{-\tau/RC} = \frac{N_0}{4RC}e^{-\abs\tau/RC},
$$

using evenness for $\tau < 0$. (Compare [[random-signals/correlation-spectra#ex-lorentzian]] with $a = 1/RC$ and $\sigma^2 = N_0/4RC$: the same pair.) The output power is $R_Y(0) = N_0/(4RC)$ and the correlation time is $RC$.

A resistor's own thermal noise is a voltage source of two-sided density $N_0/2 = 2kTR$ in series with it. Across the capacitor,

$$
\E[V_C^2] = \frac{2kTR}{2RC} = \frac{kT}{C},
$$

independent of $R$: the **$kT/C$ noise** of [[electronics-2/electronic-noise]]. A larger resistor makes more noise density but a proportionally narrower bandwidth. For $C = 1\,\mathrm{pF}$ at $300\,\mathrm{K}$ the RMS voltage is $\sqrt{kT/C} = 64.4\,\mu\mathrm{V}$.
:::
:::

### Noise-equivalent bandwidth

Because white noise appears so often, it pays to summarise a filter by a single number that gives its white-noise output.

::: definition Noise-equivalent bandwidth {#def-enbw}
The **noise-equivalent bandwidth** of a filter with reference gain $H_0$ (the gain at DC for a low-pass filter, at the centre frequency for a band-pass filter) is

$$
B_N = \frac{1}{\abs{H_0}^2}\int_0^\infty\abs{H(f)}^2\,\dd f .
$$ {#eq-enbw}

It is the width of an ideal rectangular filter of gain $H_0$ that passes the same white-noise power. With white input of two-sided density $N_0/2$ (one-sided $N_0$), the output power is

$$
\E[Y^2] = N_0\abs{H_0}^2B_N .
$$ {#eq-enbw-power}
:::

Note that $B_N$ is defined over positive frequencies only and is multiplied by the one-sided density $N_0$. For a low-pass filter, [[#eq-white-out]] gives $\frac{N_0}{2}\int_{-\infty}^\infty\abs H^2\,\dd f = N_0\int_0^\infty\abs H^2\,\dd f = N_0\abs{H_0}^2B_N$, consistent with the definition. For a band-pass filter centred on $f_0$, $B_N$ is the width of the equivalent rectangle around $f_0$ on the positive axis.

::: theorem Noise bandwidths of common filters {#thm-enbw-table}
With $f_c$ the $3\,\mathrm{dB}$ cutoff frequency,

| filter | $B_N$ |
|---|---|
| first-order low-pass (RC) | $\dfrac{\pi}{2}f_c = 1.571f_c$ |
| $n$th-order Butterworth low-pass | $\dfrac{\pi/2n}{\sin(\pi/2n)}f_c$: $1.111f_c$ ($n = 2$), $1.047f_c$ ($n = 3$), $1.026f_c$ ($n = 4$) |
| averaging over a time $T$ ($h = \frac1T$ on $[0, T]$) | $\dfrac{1}{2T}$ |
| ideal low-pass | $f_c$ |
:::

::: proof
For the Butterworth filter $\abs{H}^2 = 1/(1 + (f/f_c)^{2n})$, and the standard integral $\int_0^\infty\frac{\dd u}{1 + u^{2n}} = \frac{\pi/2n}{\sin(\pi/2n)}$ (obtained by contour integration; see [Maths Atlas: residues](/learn/maths/lesson.php?c=complex-analysis&l=residues)) gives the result, with $n = 1$ the RC case: $\int_0^\infty\frac{\dd u}{1 + u^2} = \frac\pi2$. For the averager, $H_0 = 1$ and by Parseval $\int_0^\infty\abs H^2\,\dd f = \frac12\int_{-\infty}^{\infty}h^2\,\dd t = \frac12\cdot\frac{1}{T^2}\cdot T = \frac{1}{2T}$.
:::

The averager result reproduces the ergodic theorem of [[random-signals/random-processes]] in a new light: averaging white noise for a time $T$ leaves a variance $N_0/(2T)$, falling as $1/T$. Higher-order filters approach the ideal brick wall, and their noise bandwidth approaches the $3\,\mathrm{dB}$ bandwidth; the single-pole filter's long $1/f^2$ skirt lets through $57\,\%$ more noise than its cutoff suggests.

::: widget plot
f: 1/(1 + (x/1)^2); 1/(1 + (x/1)^4); 1/(1 + (x/1)^(2*n)); if(x < B, 1, 0)
x: 0, 4
y: 0, 1.1
sliders: n=3:1:8:1; B=1.571:1:2:0.001
labels: \text{RC}; \text{Butterworth } n=2; \text{Butterworth order } n; \text{rectangle of width } B_N
caption: Power responses $\abs{H(f)}^2$ against $f/f_c$ for filters with the same $3\,\mathrm{dB}$ cutoff. The area under each curve is its noise bandwidth in units of $f_c$. The rectangle starts at $B_N = 1.571f_c$, the RC value: drag $B$ until the rectangle's area matches the other curves ($1.111$ for $n = 2$), and raise the order $n$ to watch the Butterworth curve close in on the ideal brick wall.
:::

::: example Choosing a filter to meet a noise specification {#ex-design-filter}
An amplifier's input-referred noise is white at $20\,\mathrm{nV/\sqrt{Hz}}$ (one-sided), and the gain is $1$. The output noise must not exceed $1\,\mu\mathrm{V}$ RMS. Find the largest allowed noise bandwidth, and the corresponding $3\,\mathrm{dB}$ cutoff for a single-pole RC filter and for a second-order Butterworth filter. Choose component values for the RC filter with $C = 10\,\mathrm{nF}$.
::: solution
By [[#eq-enbw-power]] with $N_0 = (20\,\mathrm{nV})^2/\mathrm{Hz} = 4\times10^{-16}\,\mathrm{V^2/Hz}$:

$$
B_N \le \frac{(10^{-6})^2}{4\times10^{-16}}\,\mathrm{Hz} = 2500\,\mathrm{Hz}.
$$

For the RC filter $f_c = B_N/1.571 = 1592\,\mathrm{Hz}$; for the second-order Butterworth $f_c = 2500/1.111 = 2251\,\mathrm{Hz}$. The sharper filter allows $41\,\%$ more signal bandwidth for the same noise. With $C = 10\,\mathrm{nF}$, $R = 1/(2\pi f_cC) = 1/(2\pi\times1592\times10^{-8}) = 10.0\,\mathrm{k\Omega}$; a standard $10\,\mathrm{k\Omega}$ resistor gives $f_c = 1591.5\,\mathrm{Hz}$ and $B_N = 2500\,\mathrm{Hz}$ exactly. But the filter makes noise of its own. By [[#ex-rc]] its resistor puts $\sqrt{kT/C} = 0.64\,\mu\mathrm{V}$ RMS on the capacitor at $300\,\mathrm{K}$, which adds in power to the amplifier's $1\,\mu\mathrm{V}$ and gives $1.19\,\mu\mathrm{V}$, breaking the specification. Scaling the impedance to $R = 1\,\mathrm{k\Omega}$, $C = 100\,\mathrm{nF}$ keeps $f_c$ and lowers the filter's contribution to $0.20\,\mu\mathrm{V}$; reducing $B_N$ by $4\,\%$, to $2396\,\mathrm{Hz}$, then restores a total of exactly $1\,\mu\mathrm{V}$. Budget every source, including the filter.
:::
:::

::: quiz
White noise passes through two filters in cascade, each a single-pole RC low-pass with the same cutoff $f_c$ (buffered, so they do not load each other). Compared with a single such filter, the output noise power is
- [ ] the same, because the cutoff frequency is the same
- [ ] half, because each filter halves the noise
- [x] half, because $B_N$ falls from $\frac\pi2f_c$ to $\frac\pi4f_c$
- [ ] a quarter, because the gain is squared
::: solution
The cascade has $\abs H^2 = 1/(1 + (f/f_c)^2)^2$, and $\int_0^\infty\frac{\dd u}{(1 + u^2)^2} = \frac\pi4$, so $B_N = \frac{\pi}{4}f_c$, half that of one stage. (Its $3\,\mathrm{dB}$ frequency is lower too, $0.644f_c$.) The noise power is proportional to the area under $\abs H^2$, not to a single frequency or a gain.
:::
:::

## Discrete-time systems and noise generation

Every result above has a discrete-time twin, obtained by replacing integrals over $t$ with sums over $n$ and the Fourier transform with the DTFT. For a stable system with impulse response $h[n]$ and frequency response $H(e^{j\omega})$, driven by a WSS sequence $X[n]$,

$$
\mu_Y = \mu_X H(e^{j0}), \qquad S_{YX}(e^{j\omega}) = H(e^{j\omega})S_X(e^{j\omega}), \qquad S_Y(e^{j\omega}) = \abs{H(e^{j\omega})}^2S_X(e^{j\omega}),
$$ {#eq-dt-psd}

and for white input of variance $\sigma_W^2$, $\E[Y^2] = \sigma_W^2\sum_n h^2[n]$. The last formula is the workhorse of digital-filter noise analysis: it gives the output noise caused by quantisation errors injected inside a filter ([[dsp/filter-structures]]).

::: example A first-order recursive process {#ex-ar1}
White noise $W[n]$ of variance $\sigma_W^2$ drives the recursion $Y[n] = aY[n - 1] + W[n]$ with $\abs a < 1$. Find $R_Y[k]$ and $S_Y(e^{j\omega})$, and check by simulation for $a = 0.9$, $\sigma_W = 1$.
::: solution
The system has $h[n] = a^nu[n]$ and $H(e^{j\omega}) = 1/(1 - ae^{-j\omega})$. By [[#eq-dt-psd]],

$$
S_Y(e^{j\omega}) = \frac{\sigma_W^2}{\abs{1 - ae^{-j\omega}}^2} = \frac{\sigma_W^2}{1 - 2a\cos\omega + a^2}.
$$

In the time domain, the discrete form of [[#eq-white-out]] gives, for $k\ge0$,

$$
R_Y[k] = \sigma_W^2\sum_{n=0}^\infty h[n + k]h[n] = \sigma_W^2\sum_{n=0}^\infty a^{2n + k} = \frac{\sigma_W^2a^{k}}{1 - a^2}, \qquad R_Y[k] = \frac{\sigma_W^2a^{\abs k}}{1 - a^2}.
$$ {#eq-ar1}

For $a = 0.9$: $R_Y[0] = 1/0.19 = 5.263$, $R_Y[1] = 4.737$, $R_Y[5] = 3.108$, $R_Y[20] = 0.640$. A Python simulation (`random.seed(7)`, $10^6$ samples after a $1000$-sample warm-up) printed time-averaged estimates of $5.257$, $4.732$, $3.105$ and $0.653$. The filter has amplified the noise power by $5.3$ and made it strongly low-pass: compare [[random-signals/correlation-spectra]], where the same spectrum appeared as the transform of $\sigma^2a^{\abs k}$.
:::
:::

::: widget plot
f: 10*log10(1/(1 - 2*a*cos(x) + a^2)); 10*log10(1/(1 - a^2)) + 0*x
x: 0, pi
y: -10, 30
sliders: a=0.9:-0.95:0.95:0.05
piticks: true
labels: S_Y(e^{j\omega})\ \text{(dB)}; \text{power } R_Y[0]\ \text{(dB)}
caption: Output spectrum of $Y[n] = aY[n - 1] + W[n]$ for unit-variance white input, in decibels, over $0\le\omega\le\pi$. For $a$ near $1$ the noise is concentrated at low frequencies (slowly varying, long correlation time); for negative $a$ it is concentrated near $\omega = \pi$ (alternating in sign). The flat line is the output variance $1/(1 - a^2)$, the average of the spectrum over the band. At $a = 0$ the output is white.
:::

Read backwards, this example is a recipe. To simulate a process with autocorrelation $\sigma^2a^{\abs k}$ — a sampled telegraph-like or Lorentzian noise — run white noise through a one-pole recursion with that $a$ and with $\sigma_W^2 = \sigma^2(1 - a^2)$. In general, a process with a rational spectrum can be generated by filtering white noise through a **shaping filter** $H$ with $\abs{H}^2 = S_X/\sigma_W^2$.

::: theorem Spectral factorisation (shaping and whitening filters) {#thm-factorisation}
Let $S_X(e^{j\omega})$ be a rational PSD that is positive on the unit circle. Then it can be written as $S_X(e^{j\omega}) = \sigma_W^2\abs{H(e^{j\omega})}^2$, where $H(z)$ is causal and stable with all its poles and zeros inside the unit circle and $h[0] = 1$. Filtering white noise of variance $\sigma_W^2$ by $H$ produces a process with spectrum $S_X$; filtering $X$ by the causal stable inverse $1/H$ produces white noise of variance $\sigma_W^2$, called the **innovations** of $X$.
:::

::: proof
(Sketch.) Writing $S_X$ as a rational function of $z = e^{j\omega}$, its evenness and reality make its poles and zeros occur in pairs $p$ and $1/p^*$. Assign to $H(z)$ the member of each pair inside the unit circle and to $H^*(1/z^*)$ the other, and normalise so that $h[0] = 1$; then $S_X = \sigma_W^2H(z)H^*(1/z^*)$ on $\abs z = 1$. Because $H$ has its zeros inside the circle, $1/H$ is causal and stable. The output statements follow from [[#eq-dt-psd]]. The general (non-rational) case is the Paley–Wiener theory; see Papoulis and Pillai.
:::

The whitening filter is the first step in many optimal filters and estimators: it turns a coloured noise problem into a white one ([[random-signals/optimal-filtering]], [[random-signals/estimation-kalman]]).

::: example Designing a noise generator {#ex-shaping}
A test needs a sampled noise with variance $4\,\mathrm{V^2}$ whose correlation coefficient between consecutive samples is $0.8$, falling geometrically. Design a first-order recursion driven by unit-variance white Gaussian noise $V[n]$.
::: solution
We need $R_Y[k] = 4(0.8)^{\abs k}$. By [[#eq-ar1]], the recursion $Y[n] = 0.8Y[n - 1] + W[n]$ with white $W$ of variance $\sigma_W^2 = 4(1 - 0.64) = 1.44$ does this. With unit-variance input, scale it: $W[n] = 1.2V[n]$. So

$$
Y[n] = 0.8\,Y[n - 1] + 1.2\,V[n].
$$

Its spectrum is $1.44/(1.64 - 1.6\cos\omega)$, from $36\,\mathrm{V^2}$ per unit of normalised frequency at DC to $0.444$ at $\omega = \pi$. Start the recursion with $Y[0]$ drawn from $\Normal(0, 4)$ (or discard the first few dozen samples) so that the output is stationary from the beginning. The output is Gaussian because it is a linear combination of Gaussians ([[random-signals/probability-for-engineers#thm-linear-gauss]]).
:::
:::

::: quiz
White noise of variance $\sigma_W^2$ passes through an FIR filter with coefficients $h[0] = 0.5$, $h[1] = 0.5$, $h[2] = -0.5$, $h[3] = -0.5$. What is the output variance?
- [ ] $0$, because the coefficients sum to zero
- [x] $\sigma_W^2$
- [ ] $4\sigma_W^2$
- [ ] $0.5\sigma_W^2$
::: solution
For white input the output variance is $\sigma_W^2\sum h^2[n] = \sigma_W^2(0.25 \times 4) = \sigma_W^2$. The sum of the coefficients is the DC gain $H(e^{j0})$, which sets the output *mean*, not its variance: this filter blocks DC but passes noise at other frequencies.
:::
:::

## Several outputs and system identification

When the same input drives two filters $h_1$ and $h_2$, the same argument as in [[#thm-correlations]] shows that the outputs have cross-spectrum

$$
S_{Y_1Y_2}(f) = H_1(f)H_2^*(f)S_X(f).
$$

If the filters occupy non-overlapping frequency bands, $H_1H_2^* = 0$ everywhere and the outputs are uncorrelated, even though they come from the same noise. This is why the noise in different frequency bins of a spectrum analyser, or in different sub-carriers of an OFDM receiver, can be treated as independent (for Gaussian noise).

The input–output cross-correlation gives a powerful way of measuring an unknown system.

::: example Identifying a system with white noise {#ex-identification}
A system with unknown impulse response $h$ is driven by white noise of two-sided density $N_0/2$, and the output is cross-correlated with the input. Show that $R_{YX}(\tau) = \frac{N_0}{2}h(\tau)$. Why is this better than measuring the impulse response with a single pulse?
::: solution
By [[#eq-ryx]] with $R_X = \frac{N_0}{2}\delta$, $R_{YX}(\tau) = \int h(\alpha)\frac{N_0}{2}\delta(\tau - \alpha)\,\dd\alpha = \frac{N_0}{2}h(\tau)$; in frequency, $S_{YX} = \frac{N_0}{2}H(f)$, so the cross-spectrum is the frequency response, phase included. A single impulse strong enough to measure $h$ above the background noise may overload or damage the system, whereas white noise spreads the same energy over a long time at a low level. Correlating over a time $T$ averages away the system's own internal noise (which is uncorrelated with the test input) at the rate of [[random-signals/random-processes#thm-ergodic]]. In practice a maximal-length pseudo-random binary sequence, whose autocorrelation is very nearly an impulse, is used; the same idea measures room acoustics, loudspeakers and radio channels.
:::
:::

::: remark Derivatives of random processes
A differentiator has $H(f) = j2\pi f$, so the derivative $X'(t)$ of a WSS process has $S_{X'}(f) = (2\pi f)^2S_X(f)$ and $R_{X'}(\tau) = -R_X''(\tau)$. The derivative has finite power only if $\int f^2S_X(f)\,\dd f < \infty$: a process with a Lorentzian spectrum, such as RC-filtered noise, has no mean-square derivative — its sample functions are continuous but nowhere smooth, like the telegraph signal's jumps smeared out. For a Gaussian process with a differentiable autocorrelation, Rice showed that the expected number of zero crossings per second is $\frac1\pi\sqrt{-R_X''(0)/R_X(0)}$; [[#exr-rice]] applies it to band-limited noise.
:::

::: application Noise budgets in practice
Designers of measurement and communication systems keep a **noise budget**: a table of every noise source, each converted to a density at a common reference point (usually the input) using $\abs H^2$, multiplied by the noise bandwidth of the final filter, and added in power. An audio ADC specified at $-110\,\mathrm{dB}$ relative to full scale over $20\,\mathrm{kHz}$, a seismometer resolving nanometres at $0.1\,\mathrm{Hz}$, and a GPS receiver tracking a signal $20\,\mathrm{dB}$ below the noise in a $2\,\mathrm{MHz}$ band all rest on exactly the theorems of this chapter.
:::

::: history
The output-spectrum relation $S_Y = \abs{H}^2S_X$ was used informally by telephone and radio engineers in the 1920s to compute the noise in a receiver's passband, notably in Harry Nyquist's 1928 derivation of thermal noise and in John Carson's studies of selective circuits. Its systematic statement for stationary processes came with the correlation theory of Wiener and Khinchin in the 1930s. Stephen O. Rice's *Mathematical Analysis of Random Noise* (1944–45) gave the time-domain formulas, zero-crossing rates and the statistics of filtered noise used by a generation of engineers. Spectral factorisation was developed by Wiener and by Andrey Kolmogorov around 1940 for their prediction and filtering theories.
:::

## Where this leads

With $S_Y = \abs{H}^2S_X$ in hand, noise analysis reduces to filter analysis. [[random-signals/gaussian-noise]] shows that filtering preserves Gaussianity and treats band-pass noise, the form noise takes in every radio receiver. [[random-signals/optimal-filtering]] asks which $H$ gives the best signal-to-noise ratio or the smallest error, and shaping and whitening filters become the state models of [[random-signals/estimation-kalman]]. The quantisation noise of digital filters is computed with $\sigma^2\sum h^2[n]$ in [[dsp/filter-structures]], and the noise performance of analog modulation in [[communication-systems/noise-in-analog-systems]].

::: summary
- A stable LTI system maps a WSS input to a WSS output with $\mu_Y = H(0)\mu_X$.
- Correlations: $R_{YX} = h * R_X$ and $R_Y = h * \tilde h * R_X$; spectra: $S_{YX} = HS_X$ and $S_Y = \abs{H}^2S_X$. Phase affects only the cross-spectrum.
- Filtered white noise has $R_Y(\tau) = \frac{N_0}{2}\int h(t + \tau)h(t)\,\dd t$ and power $\frac{N_0}{2}\int\abs H^2\dd f$; RC filtering gives a Lorentzian and the $kT/C$ result.
- Noise-equivalent bandwidth $B_N = \int_0^\infty\abs H^2\dd f/\abs{H_0}^2$ gives output power $N_0\abs{H_0}^2B_N$; $B_N = 1.571f_c$ (RC), $1.111f_c$ (2nd-order Butterworth), $1/(2T)$ (averager).
- Discrete time: $S_Y = \abs{H(e^{j\omega})}^2S_X$, and white input gives power $\sigma_W^2\sum h^2[n]$; $Y[n] = aY[n - 1] + W[n]$ has $R_Y[k] = \sigma_W^2a^{\abs k}/(1 - a^2)$.
- Shaping filters generate noise with a given spectrum from white noise; their inverses whiten it (spectral factorisation).
- Cross-correlating input and output with white noise measures the impulse response: $R_{YX} = \frac{N_0}{2}h$.
:::

## Exercises

::: exercise DC through a filter {level=1 check="1"}
A WSS input with mean $2\,\mathrm{V}$ drives a filter with $H(f) = 0.5/(1 + j f/100)$. What is the mean of the output in volts?
::: solution
By [[#thm-mean]], $\mu_Y = H(0)\mu_X = 0.5\times2 = 1\,\mathrm{V}$.
:::
:::

::: exercise RC-filtered amplifier noise {level=1 check="sqrt(1e-16*2500)"}
A one-sided white noise density of $10^{-16}\,\mathrm{V^2/Hz}$ ($10\,\mathrm{nV/\sqrt{Hz}}$) is filtered by an RC low-pass with $R = 10\,\mathrm{k\Omega}$ and $C = 10\,\mathrm{nF}$. Find the RMS output noise in volts.
::: solution
$f_c = 1/(2\pi RC) = 1591.5\,\mathrm{Hz}$ and $B_N = \frac\pi2f_c = 2500\,\mathrm{Hz}$. By [[#eq-enbw-power]], $\E[Y^2] = 10^{-16}\times2500 = 2.5\times10^{-13}\,\mathrm{V^2}$, so the RMS noise is $0.50\,\mu\mathrm{V}$.
:::
:::

::: exercise Gain and noise density {level=1 check="40e-9*sqrt(1000)"}
An amplifier with voltage gain $4$ and a flat bandwidth of $1\,\mathrm{kHz}$ (brick-wall) is driven by noise of one-sided density $10\,\mathrm{nV/\sqrt{Hz}}$. What is the RMS output noise in volts?
::: solution
The output density is $4\times10 = 40\,\mathrm{nV/\sqrt{Hz}}$, i.e. $1.6\times10^{-15}\,\mathrm{V^2/Hz}$; over $1\,\mathrm{kHz}$ the power is $1.6\times10^{-12}\,\mathrm{V^2}$ and the RMS value $1.26\,\mu\mathrm{V}$.
:::
:::

::: exercise Power of a recursive process {level=2 check="1/(1-0.95^2)"}
White noise of unit variance drives $Y[n] = 0.95Y[n - 1] + W[n]$. Find the variance of $Y$ and its correlation time in samples (the lag at which the correlation coefficient falls to $1/e$).
::: solution
By [[#eq-ar1]], $R_Y[0] = 1/(1 - 0.9025) = 10.26$. The correlation coefficient is $0.95^k$, which equals $1/e$ at $k = -1/\ln0.95 = 19.5$ samples.
:::
:::

::: exercise Two filters, one noise {level=2}
White noise of two-sided density $N_0/2$ drives two filters in parallel: an ideal low-pass passing $\abs f < 1\,\mathrm{kHz}$ and an ideal band-pass passing $1\,\mathrm{kHz} < \abs f < 2\,\mathrm{kHz}$. Find the powers of the two outputs and their cross-correlation. Then repeat with the low-pass replaced by an RC filter with $f_c = 1\,\mathrm{kHz}$: are the outputs still uncorrelated?
::: solution
Powers: $\frac{N_0}{2}\times2000 = 1000N_0$ for each, since both pass a total of $2\,\mathrm{kHz}$ of two-sided bandwidth. The cross-spectrum $H_1H_2^*\frac{N_0}{2}$ is zero everywhere because the bands do not overlap, so $R_{Y_1Y_2}\equiv0$. With the RC filter, $H_1$ is nonzero in $1$–$2\,\mathrm{kHz}$, so $S_{Y_1Y_2} = \frac{N_0}{2}H_1(f)$ in that band and the outputs are correlated; the cross-power is $R_{Y_1Y_2}(0) = \frac{N_0}{2}\cdot2\int_{1000}^{2000}\frac{\dd f}{1 + (f/1000)^2}$ (the imaginary parts cancel between $\pm f$) $= 1000N_0[\arctan2 - \arctan1] = 322N_0$.
:::
:::

::: exercise Noise bandwidth of an averager {level=2}
A digital voltmeter integrates its input for one power-line cycle, $T = 20\,\mathrm{ms}$, and displays the average. Find its noise bandwidth and the RMS reading fluctuation caused by white input noise of $100\,\mathrm{nV/\sqrt{Hz}}$ (one-sided). Why is $T = 20\,\mathrm{ms}$ chosen in a $50\,\mathrm{Hz}$ country?
::: solution
By [[#thm-enbw-table]], $B_N = 1/(2T) = 25\,\mathrm{Hz}$, so the RMS fluctuation is $100\,\mathrm{nV}\times\sqrt{25} = 0.5\,\mu\mathrm{V}$. The averager's frequency response is $\operatorname{sinc}(fT)$ (with a linear phase), which has nulls at all multiples of $1/T = 50\,\mathrm{Hz}$: integrating over exactly one cycle rejects mains hum and all its harmonics completely. This is the "normal-mode rejection" of integrating voltmeters.
:::
:::

::: exercise Noise bandwidth of a resonant circuit {level=3}
A band-pass filter has $\abs{H(f)}^2 = \dfrac{1}{1 + Q^2\bigl(\frac{f}{f_0} - \frac{f_0}{f}\bigr)^2}$, the power response of a series RLC circuit with quality factor $Q$. Show that its noise bandwidth is $B_N = \dfrac{\pi f_0}{2Q}$, which is $\frac\pi2$ times its $3\,\mathrm{dB}$ bandwidth $f_0/Q$.
::: hint
Substitute $u = Q(f/f_0 - f_0/f)$. As $f$ runs from $0$ to $\infty$, $u$ runs from $-\infty$ to $\infty$, and $\dd u = Q(1/f_0 + f_0/f^2)\,\dd f$. Write the integral in two ways, in terms of $f$ and of $f_0^2/f$.
:::
::: solution
Let $I = \int_0^\infty\abs H^2\,\dd f$. The substitution $f\mapsto f_0^2/f$ leaves $\abs{H}^2$ unchanged and gives $I = \int_0^\infty\abs{H}^2\frac{f_0^2}{f^2}\,\dd f$. Adding the two forms, $2I = \int_0^\infty\abs H^2\bigl(1 + \frac{f_0^2}{f^2}\bigr)\dd f = \frac{f_0}{Q}\int_{-\infty}^\infty\frac{\dd u}{1 + u^2} = \frac{\pi f_0}{Q}$. So $I = \frac{\pi f_0}{2Q}$, and with $H_0 = 1$ at $f_0$, $B_N = \frac{\pi f_0}{2Q}$. The $3\,\mathrm{dB}$ points satisfy $u = \pm1$; their separation is $f_0/Q$, so $B_N = \frac\pi2\times$ the $3\,\mathrm{dB}$ bandwidth, the same factor as for the RC low-pass — a resonator is a low-pass filter shifted to $f_0$.
:::
:::

::: exercise Zero crossings of band-limited noise {#exr-rice level=3}
Gaussian noise has a flat PSD for $\abs f < B$ and zero elsewhere. Use Rice's formula from the remark above to show that its expected rate of zero crossings is $2B/\sqrt3$ per second. Evaluate for $B = 3\,\mathrm{kHz}$, and compare with a sinusoid at $B$.
::: hint
$-R_X''(0) = R_{X'}(0) = \int(2\pi f)^2S_X(f)\,\dd f$.
:::
::: solution
With $S_X = S_0$ on $\abs f < B$: $R_X(0) = 2BS_0$ and $-R_X''(0) = \int_{-B}^{B}4\pi^2f^2S_0\,\dd f = \frac{8\pi^2B^3S_0}{3}$. So $-R_X''(0)/R_X(0) = \frac{4\pi^2B^2}{3}$ and the crossing rate is $\frac1\pi\cdot\frac{2\pi B}{\sqrt3} = \frac{2B}{\sqrt3} = 1.155B$. For $B = 3\,\mathrm{kHz}$: $3464$ crossings per second. A sinusoid at $3\,\mathrm{kHz}$ crosses zero $6000$ times per second; the noise, whose power is spread from $0$ to $B$, crosses less often, as if it were a sinusoid at its RMS frequency $B/\sqrt3 = 1.73\,\mathrm{kHz}$.
:::
:::

::: exercise Whitening a first-order process {level=3}
A sampled sensor noise has $R_X[k] = 4(0.8)^{\abs k}$. (a) Find a causal FIR filter $G(z)$ that turns $X$ into white noise, and the variance of the result. (b) Verify that $G$ inverts the shaping filter of [[#ex-shaping]]. (c) Why might you want to whiten noise before detecting a signal in it?
::: solution
(a) From [[#ex-shaping]], $X$ is the output of $H(z) = 1/(1 - 0.8z^{-1})$ driven by white noise of variance $1.44$. The filter $G(z) = 1 - 0.8z^{-1}$, i.e. $E[n] = X[n] - 0.8X[n - 1]$, gives $S_E = \abs{G}^2S_X = \abs{G}^2\cdot1.44\abs H^2 = 1.44$: white with variance $1.44$. Directly: $\E[E^2] = R_X[0] - 1.6R_X[1] + 0.64R_X[0] = 4 - 5.12 + 2.56 = 1.44$, and $\E[E[n + 1]E[n]] = R_X[1] - 0.8R_X[0] - 0.8R_X[2] + 0.64R_X[1] = 3.2 - 3.2 - 2.048 + 2.048 = 0$. (b) $G(z)H(z) = 1$. (c) Many detection and estimation results (the matched filter of [[random-signals/optimal-filtering]], least squares) are simplest and optimal for white noise; whitening first and then applying the white-noise solution to the equally whitened signal gives the optimal solution for coloured noise.
:::
:::
