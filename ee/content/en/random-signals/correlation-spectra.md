Ask a spectrum analyser to display the output of a noisy amplifier and it obliges at once: a smooth curve showing so many nanovolts per root hertz at each frequency, perhaps rising at low frequencies and rolling off at high ones. Yet the noise waveform has no Fourier transform in the sense of [[signals-systems/fourier-transform]]. A sample function of a stationary process goes on for ever without dying away, so its energy is infinite and the Fourier integral does not converge; and even a finite stretch of it gives a ragged, random transform that changes from one record to the next. What the analyser shows is something else: the **power spectral density**, the average distribution of the signal's *power* over frequency.

This chapter defines the power spectral density (PSD) of a wide-sense stationary process, and proves the central result of the subject, the **Wiener–Khinchin theorem**: the PSD is the Fourier transform of the autocorrelation function. That makes every autocorrelation of [[random-signals/random-processes]] a spectrum. We compute the spectra of the standard processes, including the spectrum of a digital data signal, which decides how much bandwidth a link needs. We then treat cross-correlation and cross-spectra, which measure how two signals are related and are used to locate leaks, echoes and sound sources, and finish with discrete-time spectra and the practical problem of estimating a PSD from data.

## Power spectral density

Throughout, $X(t)$ is a real WSS process with mean $\mu_X$ and autocorrelation $R_X(\tau)$. We use frequency $f$ in hertz, as spectrum analysers and data sheets do; the transform pair is

$$
G(f) = \int_{-\infty}^{\infty}g(\tau)e^{-j2\pi f\tau}\,\dd\tau, \qquad g(\tau) = \int_{-\infty}^{\infty}G(f)e^{j2\pi f\tau}\,\dd f,
$$

which is the transform of [[signals-systems/fourier-transform]] with $\omega = 2\pi f$, so that $G(f) = X(j2\pi f)$ in that chapter's notation.

To define a spectrum we look at the process through a finite window. Let $x_T(t)$ be a sample function truncated to $\abs t < T/2$, with Fourier transform $X_T(f) = \int_{-T/2}^{T/2}x(t)e^{-j2\pi ft}\,\dd t$. By Parseval's theorem the energy of the truncated signal is $\int\abs{X_T(f)}^2\,\dd f$, so its average power over the window is $\frac1T\int\abs{X_T(f)}^2\,\dd f$. The integrand, $\abs{X_T(f)}^2/T$, is called the **periodogram**: it shows how the power of this particular stretch of signal is spread over frequency. It is random. Averaging it over the ensemble and letting the window grow gives a deterministic function.

::: definition Power spectral density {#def-psd}
The (two-sided) **power spectral density** of a WSS process $X(t)$ is

$$
S_X(f) = \lim_{T\to\infty}\frac{1}{T}\,\E\bigl[\abs{X_T(f)}^2\bigr], \qquad -\infty < f < \infty .
$$ {#eq-psd-def}

Its units are those of $x^2$ per hertz, for example $\mathrm{V^2/Hz}$, or watts per hertz when $x^2$ is a power.
:::

::: theorem Wiener–Khinchin theorem {#thm-wk}
If $X(t)$ is WSS and $\int\abs{\tau R_X(\tau)}\,\dd\tau$ is finite (or, more generally, if $R_X$ is integrable), then the power spectral density is the Fourier transform of the autocorrelation function:

$$
S_X(f) = \int_{-\infty}^{\infty}R_X(\tau)\,e^{-j2\pi f\tau}\,\dd\tau, \qquad R_X(\tau) = \int_{-\infty}^{\infty}S_X(f)\,e^{j2\pi f\tau}\,\dd f .
$$ {#eq-wk}
:::

::: proof
Write the squared magnitude as a double integral and take the expectation inside:

$$
\E\bigl[\abs{X_T(f)}^2\bigr] = \int_{-T/2}^{T/2}\!\int_{-T/2}^{T/2}\E\bigl[X(t)X(s)\bigr]e^{-j2\pi f(t - s)}\,\dd t\,\dd s = \int_{-T/2}^{T/2}\!\int_{-T/2}^{T/2}R_X(t - s)\,e^{-j2\pi f(t - s)}\,\dd t\,\dd s .
$$

The integrand depends only on $\tau = t - s$. As in the proof of [[random-signals/random-processes#thm-ergodic]], the line $t - s = \tau$ crosses the square $[-T/2, T/2]^2$ in a segment whose projection has length $T - \abs\tau$ for $\abs\tau < T$, so

$$
\frac1T\E\bigl[\abs{X_T(f)}^2\bigr] = \int_{-T}^{T}\Bigl(1 - \frac{\abs\tau}{T}\Bigr)R_X(\tau)\,e^{-j2\pi f\tau}\,\dd\tau .
$$ {#eq-bartlett}

As $T\to\infty$ the triangular weight $1 - \abs\tau/T$ tends to $1$ for each fixed $\tau$; the difference from the full transform is bounded by $\frac{1}{T}\int\abs{\tau R_X(\tau)}\,\dd\tau + \int_{\abs\tau>T}\abs{R_X}\,\dd\tau$, which tends to zero. Hence the limit [[#eq-psd-def]] is the Fourier transform of $R_X$. The inverse relation is the inverse Fourier transform.
:::

The theorem says that the spectrum and the autocorrelation carry exactly the same information, expressed in two domains. It also explains what [[random-signals/random-processes#thm-acf-props]] meant: an autocorrelation must be positive semidefinite precisely because its transform, a power density, cannot be negative. Functions with a narrow autocorrelation (fast decorrelation) have broad spectra, and slowly varying processes have spectra concentrated near zero frequency — the time–bandwidth reciprocity familiar from deterministic signals.

When $X$ has a nonzero mean, $R_X(\tau)\to\mu_X^2$ at large lags and is not integrable; the theorem still holds if we allow impulses, as for deterministic power signals. The constant $\mu_X^2$ transforms to $\mu_X^2\delta(f)$: **DC power appears as an impulse at $f = 0$**. Similarly a periodic component in $R_X$ gives spectral lines.

::: theorem Properties of the power spectral density {#thm-psd-props}
For a real WSS process,

1. $S_X(f)$ is real and non-negative;
2. $S_X(f)$ is even: $S_X(-f) = S_X(f)$;
3. the mean power is the area under the PSD:

$$
\E\bigl[X^2(t)\bigr] = R_X(0) = \int_{-\infty}^{\infty}S_X(f)\,\dd f ;
$$ {#eq-power}

4. $S_X(0) = \int_{-\infty}^\infty R_X(\tau)\,\dd\tau$.
:::

::: proof
(2) and reality: $R_X$ is real and even, so its transform $\int R_X(\tau)\cos(2\pi f\tau)\,\dd\tau$ is real and even. (1): $S_X$ is a limit of the non-negative quantities $\E\abs{X_T(f)}^2/T$. (3) and (4) are the inverse and forward transforms of [[#eq-wk]] evaluated at $\tau = 0$ and $f = 0$.
:::

What justifies calling $S_X(f)$ a *density* of power — rather than just a function whose integral is the power — is that the power in any band can be measured: pass the process through an ideal band-pass filter that keeps only $f_1 < \abs{f} < f_2$, and the output power is $\int_{f_1<\abs f<f_2}S_X(f)\,\dd f$. We prove this in [[random-signals/random-signals-lti]]; it is how a spectrum analyser works.

::: warning One-sided and two-sided spectra
Our $S_X(f)$ is **two-sided**: it is defined for negative as well as positive frequencies, and the power in a physical band $f_1$ to $f_2$ is $2\int_{f_1}^{f_2}S_X(f)\,\dd f$. Engineers often use the **one-sided** density $G_X(f) = 2S_X(f)$ for $f\ge0$, so that the power is $\int_{f_1}^{f_2}G_X(f)\,\dd f$. The thermal noise density $4kTR$ of [[electronics-2/electronic-noise]] is one-sided; the two-sided equivalent is $2kTR$. Communication texts write white noise as $N_0/2$ two-sided, which is $N_0$ one-sided. Mixing the conventions is the most common factor-of-two error in noise calculations: always check which one a formula or data sheet uses.
:::

::: quiz
An amplifier data sheet gives an input noise density of $10\,\mathrm{nV/\sqrt{Hz}}$, flat from DC to $100\,\mathrm{kHz}$ (a one-sided figure, as data sheets always use). What is the two-sided PSD $S_X(f)$ in this band?
- [ ] $10^{-16}\,\mathrm{V^2/Hz}$
- [x] $5\times10^{-17}\,\mathrm{V^2/Hz}$
- [ ] $2\times10^{-16}\,\mathrm{V^2/Hz}$
- [ ] $5\,\mathrm{nV/\sqrt{Hz}}$
::: solution
The one-sided density is $G_X = (10\,\mathrm{nV})^2/\mathrm{Hz} = 10^{-16}\,\mathrm{V^2/Hz}$, and $S_X = G_X/2 = 5\times10^{-17}\,\mathrm{V^2/Hz}$ for $\abs f < 100\,\mathrm{kHz}$. Either way the power in the band is the same: $10^{-16}\times10^5 = 2\times5\times10^{-17}\times10^5 = 10^{-11}\,\mathrm{V^2}$, or $3.16\,\mu\mathrm{V}$ RMS. (The last option halves the amplitude density, which would quarter the power.)
:::
:::

## Spectra of standard processes

::: example Spectrum of a random-phase sinusoid {#ex-psd-sinusoid}
Find the PSD of $X(t) = A\cos(2\pi f_0t + \Theta)$ with $\Theta$ uniform, and of the same sinusoid plus a constant $V$.
::: solution
From [[random-signals/random-processes#ex-random-phase]], $R_X(\tau) = \frac{A^2}{2}\cos2\pi f_0\tau = \frac{A^2}{4}\bigl(e^{j2\pi f_0\tau} + e^{-j2\pi f_0\tau}\bigr)$. Since $e^{j2\pi f_0\tau}\leftrightarrow\delta(f - f_0)$,

$$
S_X(f) = \frac{A^2}{4}\bigl[\delta(f - f_0) + \delta(f + f_0)\bigr].
$$

The power $A^2/2$ is split equally between the two lines at $\pm f_0$. Adding an independent constant $V$ adds $V^2$ to the autocorrelation (the cross terms vanish because $\E[\cos(\cdot + \Theta)] = 0$), and hence a line $V^2\delta(f)$ at DC. Periodic signals have line spectra whether they are deterministic or random; what randomness contributes is a continuous part.
:::
:::

::: example The Lorentzian spectrum {#ex-lorentzian}
Find the PSD of a process with $R_X(\tau) = \sigma^2e^{-a\abs\tau}$, $a > 0$, and hence of the random telegraph signal. At what frequency has the PSD fallen to half its low-frequency value?
::: solution
Split the integral at $\tau = 0$:

$$
S_X(f) = \sigma^2\int_{-\infty}^0 e^{(a - j2\pi f)\tau}\dd\tau + \sigma^2\int_0^\infty e^{-(a + j2\pi f)\tau}\dd\tau = \sigma^2\Bigl(\frac{1}{a - j2\pi f} + \frac{1}{a + j2\pi f}\Bigr) = \frac{2a\sigma^2}{a^2 + (2\pi f)^2}.
$$ {#eq-lorentzian}

This **Lorentzian** spectrum is flat, at $S_X(0) = 2\sigma^2/a$, up to the **corner frequency** $f_c = a/2\pi$, where it has halved, and falls as $1/f^2$ (at $20\,\mathrm{dB}$ per decade in power) above it. For the random telegraph signal, $\sigma^2 = 1$ and $a = 2\lambda$, so

$$
S_X(f) = \frac{4\lambda}{4\lambda^2 + (2\pi f)^2} = \frac{\lambda}{\lambda^2 + \pi^2f^2}, \qquad f_c = \frac{\lambda}{\pi}.
$$

A telegraph signal switching $1000$ times per second has a corner at $318\,\mathrm{Hz}$. As a check of [[#eq-power]], $\int\frac{\lambda\,\dd f}{\lambda^2 + \pi^2f^2} = \frac1\pi\bigl[\arctan(\pi f/\lambda)\bigr]_{-\infty}^\infty = 1 = R_X(0)$.
:::
:::

The Lorentzian is the spectrum of every **first-order** process: in [[random-signals/random-signals-lti]] we will see that it is exactly what comes out of an $RC$ low-pass filter fed with white noise. A superposition of telegraph processes with a wide range of switching rates — many traps in a MOSFET oxide, each with its own time constant — sums Lorentzians with different corners, and if the rates are spread evenly on a logarithmic scale the sum is close to $1/f$ over many decades. This is the McWhorter model of flicker noise.

::: widget plot
f: 10*log10(1/(1 + (10^x/fc)^2)); 10*log10(1/(1 + (10^x/(10*fc))^2)) - 10
x: 0, 5
y: -50, 5
sliders: fc=300:10:3000:10
labels: \text{Lorentzian, corner } f_c; \text{ten times faster switching}
caption: Lorentzian spectra in decibels against $x = \log_{10}(f/\mathrm{Hz})$, normalised to the low-frequency level of the first curve. The first is flat up to $f_c$ and then falls at $20\,\mathrm{dB}$ per decade. The second curve belongs to a process that switches ten times faster: its correlation time is ten times shorter, its corner ten times higher, and — because the total power is the same — its low-frequency density is $10\,\mathrm{dB}$ lower. Spreading a fixed power over a wider band lowers the density.
:::

### White noise

The flat part of a Lorentzian extends further the faster the process decorrelates. In the limit of a process that decorrelates instantly, the spectrum is flat at all frequencies.

::: definition White noise {#def-white}
A zero-mean WSS process $W(t)$ is **white** with two-sided density $N_0/2$ if

$$
S_W(f) = \frac{N_0}{2}\ \text{ for all } f, \qquad R_W(\tau) = \frac{N_0}{2}\,\delta(\tau).
$$ {#eq-white}
:::

White noise is uncorrelated at any two distinct times and has infinite power, so it is an idealisation, like the impulse. It is the right model whenever the noise is flat over a much wider band than the system that observes it, which is true of thermal noise up to terahertz and of shot noise up to the inverse transit time; the details, and its Gaussian form, are in [[random-signals/gaussian-noise]]. A white process observed through any real system has finite power, as we will see.

::: example An ideal band-limited noise {#ex-bandlimited}
A noise has $S_X(f) = S_0$ for $\abs f < B$ and $0$ otherwise. Find its power and its autocorrelation. At what sample spacing are its samples uncorrelated?
::: solution
By [[#eq-power]], the power is $2BS_0$. The inverse transform of a rectangle is a sinc:

$$
R_X(\tau) = \int_{-B}^{B}S_0e^{j2\pi f\tau}\,\dd f = 2BS_0\,\frac{\sin2\pi B\tau}{2\pi B\tau} = 2BS_0\operatorname{sinc}(2B\tau),
$$

with $\operatorname{sinc}u = \sin(\pi u)/(\pi u)$. $R_X$ is zero at $\tau = k/(2B)$ for every nonzero integer $k$. Samples taken at the Nyquist rate $2B$ are therefore uncorrelated (and, if the noise is Gaussian, independent): a band-limited white noise of bandwidth $B$ provides $2B$ independent samples per second. This is the noise counterpart of the sampling theorem of [[signals-systems/sampling]], and it is used constantly in communication theory.
:::
:::

### The spectrum of a data signal

Digital signals are random processes too: the transmitter does not know in advance which bits it will send. Their spectra decide how much bandwidth a link occupies and how close together channels can be packed.

::: theorem Spectrum of a random pulse train {#thm-pulse-train}
Let $X(t) = \sum_kA_k\,p(t - kT - D)$, where the symbols $A_k$ are independent and identically distributed with mean $\mu_A$ and variance $\sigma_A^2$, the pulse $p(t)$ has Fourier transform $P(f)$, and the offset $D$ is uniform on $[0, T)$ and independent of the symbols. Then

$$
S_X(f) = \frac{\sigma_A^2}{T}\abs{P(f)}^2 + \frac{\mu_A^2}{T^2}\sum_{m=-\infty}^{\infty}\abs{P\bigl(\tfrac mT\bigr)}^2\delta\Bigl(f - \frac mT\Bigr).
$$ {#eq-pulse-train}
:::

::: proof
(Sketch for $\mu_A = 0$.) Truncate to $K$ symbols, $X_K(t) = \sum_{k=0}^{K-1}A_kp(t - kT - D)$, whose transform is $P(f)e^{-j2\pi fD}\sum_kA_ke^{-j2\pi fkT}$. Then $\E\abs{X_K(f)}^2 = \abs{P(f)}^2\sum_{k,l}\E[A_kA_l]e^{-j2\pi f(k - l)T} = K\sigma_A^2\abs{P(f)}^2$, because $\E[A_kA_l] = \sigma_A^2\delta_{kl}$. Dividing by the duration $KT$ and letting $K\to\infty$ gives $\sigma_A^2\abs{P(f)}^2/T$. With nonzero mean, write $A_k = \mu_A + \tilde A_k$: the zero-mean part gives the same continuous term, and the constant part is a periodic pulse train $\mu_A\sum_kp(t - kT - D)$, whose Fourier series has lines at $m/T$ with power $\mu_A^2\abs{P(m/T)}^2/T^2$ each, as in [[signals-systems/fourier-series]].
:::

::: example Polar NRZ and Manchester signalling {#ex-line-codes}
Find the PSD of (a) polar NRZ, $A_k = \pm A$ with rectangular pulses of width $T$, and (b) Manchester code, in which each bit is sent as a pulse that is $+A$ for the first half of the bit and $-A$ for the second half (or the reverse). What fraction of the NRZ power lies in the main lobe $\abs f < 1/T$?
::: solution
(a) $\mu_A = 0$, $\sigma_A^2 = A^2$, and the rectangle of width $T$ has $\abs{P(f)} = T\abs{\operatorname{sinc}(fT)}$, so

$$
S_\mathrm{NRZ}(f) = A^2T\operatorname{sinc}^2(fT).
$$ {#eq-nrz}

This agrees with the transform of the triangular autocorrelation of [[random-signals/random-processes#ex-binary-wave|the random binary waveform]], since a triangle of height $A^2$ and half-width $T$ transforms to $A^2T\operatorname{sinc}^2(fT)$. Numerical integration gives $\int_{-1}^1\operatorname{sinc}^2u\,\dd u = 0.903$: $90.3\,\%$ of the power lies within $\pm$ the bit rate.

(b) The Manchester pulse is a rectangle of width $T/2$ minus a rectangle of width $T/2$ delayed by $T/2$. Its transform is $\frac{T}{2}\operatorname{sinc}(fT/2)\bigl(e^{-j\pi fT/2} - e^{-j3\pi fT/2}\bigr)$, of magnitude $T\operatorname{sinc}(fT/2)\abs{\sin(\pi fT/2)}$. With $\sigma_A^2 = A^2$,

$$
S_\mathrm{Man}(f) = A^2T\operatorname{sinc}^2\Bigl(\frac{fT}{2}\Bigr)\sin^2\Bigl(\frac{\pi fT}{2}\Bigr).
$$

The Manchester spectrum is zero at DC, so the signal passes through transformers and AC couplings without baseline wander, and it has a transition in every bit, which makes clock recovery easy. The price is about twice the bandwidth: its main lobe extends to $2/T$. That is why $10\,\mathrm{Mb/s}$ Ethernet, which used Manchester code, needed a $20\,\mathrm{MHz}$-wide spectrum.
:::
:::

::: widget plot
f: sinc(x)^2; sinc(x/2)^2*sin(pi*x/2)^2
x: -4, 4
y: 0, 1.05
labels: \text{polar NRZ}; \text{Manchester}
caption: Power spectral densities of two line codes, in units of $A^2T$, against normalised frequency $fT$ (frequency divided by the bit rate). NRZ has most of its power at low frequencies and a peak at DC; Manchester has none at DC and a main lobe twice as wide. Hover over the curves to compare the densities at $fT = 0.5$ and $fT = 1$, where NRZ has its first null and Manchester its maximum.
:::

::: quiz
A random polar NRZ signal at $1\,\mathrm{Mb/s}$ is passed through an ideal low-pass filter. What cutoff keeps about $90\,\%$ of its power?
- [ ] $500\,\mathrm{kHz}$
- [x] $1\,\mathrm{MHz}$
- [ ] $2\,\mathrm{MHz}$
- [ ] No finite cutoff, because the rectangular pulses have infinite bandwidth
::: solution
The NRZ spectrum $A^2T\operatorname{sinc}^2(fT)$ has its first null at $1/T = 1\,\mathrm{MHz}$, and the main lobe contains $90.3\,\%$ of the power. (The spectrum is indeed infinitely wide, but the power outside the main lobe is small.) Pulse shaping, treated in [[communication-systems/baseband-transmission]], packs the same bit rate into about half that bandwidth.
:::
:::

## Cross-correlation and cross-spectra

When two signals are observed together we want to know how they are related: whether one is a delayed, filtered copy of the other, and at which frequencies they share power.

::: definition Cross-correlation and cross-spectral density {#def-cross}
For jointly WSS processes $X$ and $Y$, the **cross-correlation** is $R_{XY}(\tau) = \E[X(t + \tau)Y(t)]$ and the **cross-spectral density** is its Fourier transform,

$$
S_{XY}(f) = \int_{-\infty}^{\infty}R_{XY}(\tau)e^{-j2\pi f\tau}\,\dd\tau .
$$ {#eq-cross-psd}
:::

Unlike an autocorrelation, $R_{XY}$ need not be even or peak at zero, and $S_{XY}$ is in general complex. The properties that remain are

$$
R_{YX}(\tau) = R_{XY}(-\tau), \qquad S_{YX}(f) = S_{XY}^*(f), \qquad \abs{R_{XY}(\tau)}^2 \le R_X(0)R_Y(0),
$$

the last by the Cauchy–Schwarz inequality. Two processes are **uncorrelated** if $R_{XY}(\tau) = \mu_X\mu_Y$ for all $\tau$, and **orthogonal** if $R_{XY}\equiv0$. For uncorrelated zero-mean processes the autocorrelation of the sum is the sum of the autocorrelations, so **the spectra of uncorrelated processes add**: $S_{X+Y} = S_X + S_Y$. In general $S_{X+Y} = S_X + S_Y + S_{XY} + S_{YX} = S_X + S_Y + 2\operatorname{Re}S_{XY}$.

The phase of the cross-spectrum carries timing information, and the cross-correlation shows it directly in time.

::: example Time-delay estimation {#ex-delay}
A signal $X(t)$ is received at a second sensor as $Y(t) = aX(t - D) + N(t)$, where $N$ is noise uncorrelated with $X$. Find $R_{YX}(\tau)$ and $S_{YX}(f)$. A water pipe has acoustic sensors $100\,\mathrm{m}$ apart, with a leak somewhere between them; the leak noise travels at $1200\,\mathrm{m/s}$ in the pipe, and the cross-correlation of the two sensor signals peaks at a lag of $25\,\mathrm{ms}$, the far sensor's signal lagging. Where is the leak?
::: solution
$R_{YX}(\tau) = \E[(aX(t + \tau - D) + N(t + \tau))X(t)] = aR_X(\tau - D)$, since $N$ and $X$ are uncorrelated. Because $\abs{R_X(\tau - D)} \le R_X(0)$ with equality at $\tau = D$, the cross-correlation peaks at the delay. In frequency, the shift theorem gives $S_{YX}(f) = aS_X(f)e^{-j2\pi fD}$: the cross-spectrum's phase is linear in $f$ with slope $-2\pi D$, while its magnitude follows the signal's own spectrum.

For the pipe, let the leak be $d_1$ from the near sensor and $d_2 = 100 - d_1$ from the far one. The delay is $(d_2 - d_1)/v = 25\,\mathrm{ms}$, so $d_2 - d_1 = 1200\times0.025 = 30\,\mathrm{m}$. With $d_1 + d_2 = 100\,\mathrm{m}$, $d_1 = 35\,\mathrm{m}$ and $d_2 = 65\,\mathrm{m}$: the leak is $35\,\mathrm{m}$ from the near sensor. The sharper the peak of $R_X$ — the broader the leak's noise spectrum — the more precisely the delay can be read.
:::
:::

::: application Correlators everywhere
The same principle locates aircraft by multilateration, finds the direction of a sound with a microphone pair, measures the speed of a conveyor from two optical sensors, and acquires GPS signals: a GPS receiver correlates the incoming signal, far below the noise, against a local copy of each satellite's known pseudo-random code, and the lag of the correlation peak is the signal's travel time. Because the code's autocorrelation is a narrow triangle (it behaves like the random binary waveform, with a chip period of about $1\,\mu\mathrm{s}$), the peak locates the delay to a small fraction of a microsecond, which, multiplied by the speed of light, gives a range to a few metres.
:::

## Discrete-time spectra and estimation

Sampled signals are discrete-time processes $X[n]$ with autocorrelation $R_X[k] = \E[X[n + k]X[n]]$. Their spectrum is defined with the discrete-time Fourier transform of [[signals-systems/discrete-time-fourier]].

::: definition PSD of a discrete-time process {#def-psd-dt}
The power spectral density of a WSS sequence is

$$
S_X(e^{j\omega}) = \sum_{k=-\infty}^{\infty}R_X[k]\,e^{-j\omega k}, \qquad R_X[k] = \frac{1}{2\pi}\int_{-\pi}^{\pi}S_X(e^{j\omega})e^{j\omega k}\,\dd\omega,
$$ {#eq-psd-dt}

periodic in $\omega$ with period $2\pi$, real, even and non-negative; the power is $R_X[0] = \frac{1}{2\pi}\int_{-\pi}^\pi S_X(e^{j\omega})\,\dd\omega$.
:::

White noise of variance $\sigma^2$ has $R_W[k] = \sigma^2\delta[k]$ and therefore a flat spectrum $S_W(e^{j\omega}) = \sigma^2$. The two-term moving average $Y[n] = W[n] + W[n - 1]$ of [[random-signals/random-processes]] has $R_Y[0] = 2\sigma^2$, $R_Y[\pm1] = \sigma^2$, and so

$$
S_Y(e^{j\omega}) = 2\sigma^2 + \sigma^2(e^{-j\omega} + e^{j\omega}) = 2\sigma^2(1 + \cos\omega) = 4\sigma^2\cos^2(\omega/2),
$$

a low-pass spectrum, zero at $\omega = \pi$: averaging neighbours suppresses the fastest fluctuations.

If a continuous-time process with autocorrelation $R_X(\tau)$ is sampled every $T_s$ seconds, the samples have $R_X[k] = R_X(kT_s)$, and the spectrum of the sequence is the continuous spectrum **aliased**:

$$
S_{X}(e^{j\omega}) = \frac{1}{T_s}\sum_{m=-\infty}^{\infty}S_X\Bigl(\frac{\omega - 2\pi m}{2\pi T_s}\Bigr),
$$

with the frequency $f$ mapped to $\omega = 2\pi fT_s$. This follows from the impulse-sampling argument of [[signals-systems/sampling]] applied to $R_X$. Noise above half the sampling rate is not removed by sampling; it folds down onto the band of interest, which is why anti-aliasing filters must limit the noise as well as the signal.

### Estimating a spectrum

In practice $S_X$ is estimated from a finite record $x[0], \ldots, x[N - 1]$. The natural estimate is the **periodogram** $\hat S(e^{j\omega}) = \frac1N\bigl\lvert\sum_nx[n]e^{-j\omega n}\bigr\rvert^2$, computed at the DFT frequencies with an FFT. By [[#eq-bartlett]] in its discrete form, its mean is the true spectrum smoothed by a narrow kernel, which becomes exact as $N\to\infty$. But its *variance* does not shrink: for Gaussian noise each periodogram value is (approximately) the true density times an exponentially distributed random variable of mean 1, so its standard deviation equals its mean, however long the record. The periodogram is not a consistent estimator.

::: example Averaging periodograms {#ex-welch}
Estimate the spectrum of unit-variance white Gaussian noise from a single $128$-point periodogram and from the average of $64$ such periodograms. How large are the fluctuations?
::: solution
A Python script (`random.seed(5)`, `random.gauss(0, 1)`, a direct DFT of each $128$-sample segment) printed, over the $63$ frequency bins strictly between $0$ and $\pi$:

| estimate | mean of the bins | standard deviation across bins | range |
|---|---|---|---|
| one periodogram | $1.27$ | $1.44$ | $0.010$ to $6.23$ |
| average of $64$ | $0.998$ | $0.138$ | — |

The true PSD is $\sigma^2 = 1$ at every frequency. A single periodogram is useless for reading a level: individual bins range over a factor of six hundred, and with only $63$ bins even its sample mean is off by $27\,\%$ (the theory predicts a standard deviation of $1$ per bin and $1/\sqrt{63} = 0.13$ for the mean of $63$ bins, so this is a two-standard-deviation excursion). Averaging $K = 64$ independent periodograms reduces the relative fluctuation to about $1/\sqrt{K} = 0.125$, matching the printed $0.138$. This is **Bartlett's method**; Welch's refinement overlaps windowed segments to use the data more efficiently. Both trade frequency resolution (shorter segments) for statistical stability (more averages) — the spectral form of the averaging-time trade-off of [[random-signals/random-processes#thm-ergodic]].
:::
:::

::: remark Resolution against variance
A spectral estimate from a record of length $T$ cannot resolve features narrower than about $1/T$ in frequency. Splitting the record into $K$ segments widens the resolution to $K/T$ and cuts the relative standard deviation to $1/\sqrt K$. The product of resolution bandwidth and averaging time is fixed by the data. Spectrum analysers expose exactly this choice as their resolution bandwidth (RBW) and video bandwidth (VBW) controls. A full treatment of windows, bias and variance is in [[dsp/spectral-analysis]].
:::

::: history
Norbert Wiener developed the theory of generalised harmonic analysis, including the relation between autocorrelation and power spectrum for individual functions, in a long paper published in *Acta Mathematica* in 1930. Aleksandr Khinchin proved the corresponding theorem for stationary random processes in 1934. Albert Einstein had stated the same relation in a short note in 1914, which was rediscovered only decades later. Arthur Schuster introduced the periodogram in 1898 to look for hidden periodicities in meteorological data; Maurice Bartlett (1948) and Peter Welch (1967) proposed the averaging methods that bear their names, and the fast Fourier transform of Cooley and Tukey (1965) made them routine.
:::

## Where this leads

The power spectral density is the working description of noise in the rest of the course and beyond. [[random-signals/random-signals-lti]] proves that a linear filter multiplies the PSD by $\abs{H}^2$, which turns spectra into a design tool; [[random-signals/gaussian-noise]] gives the PSDs of thermal and shot noise from physics; [[random-signals/optimal-filtering]] uses signal and noise spectra to design the best filters. The spectra of line codes and modulated signals are developed in [[communication-systems/baseband-transmission]] and [[communication-systems/digital-modulation]], and practical spectral estimation in [[dsp/spectral-analysis]].

::: summary
- The PSD $S_X(f) = \lim\frac1T\E\abs{X_T(f)}^2$ distributes a WSS process's power over frequency; its area is the mean power $R_X(0)$.
- Wiener–Khinchin ([[#thm-wk]]): $S_X$ is the Fourier transform of $R_X$. Narrow autocorrelation means broad spectrum; DC appears as $\mu_X^2\delta(f)$ and periodic components as lines.
- Two-sided densities ($N_0/2$, $2kTR$) count negative frequencies; one-sided densities ($N_0$, $4kTR$) are twice as large. Check the convention.
- Standard pairs: $\sigma^2e^{-a\abs\tau}\leftrightarrow 2a\sigma^2/(a^2 + 4\pi^2f^2)$ (Lorentzian); $\frac{N_0}{2}\delta(\tau)\leftrightarrow\frac{N_0}{2}$ (white); band-limited white $\leftrightarrow$ sinc autocorrelation with uncorrelated samples at rate $2B$.
- A random pulse train has $S_X = \sigma_A^2\abs{P(f)}^2/T$ plus lines from the symbol mean; polar NRZ gives $A^2T\operatorname{sinc}^2(fT)$ with $90\,\%$ of the power below the bit rate.
- Cross-correlation $R_{XY}$ and cross-spectrum $S_{XY}$ describe relations between signals; the peak of $R_{YX}$ estimates a delay. Spectra of uncorrelated processes add.
- A single periodogram fluctuates by $100\,\%$ at every frequency; averaging $K$ segments reduces this to $1/\sqrt K$ at the cost of resolution.
:::

## Exercises

::: exercise Density at low frequency {level=1 check="8e-3"}
A noise voltage has $R_X(\tau) = 4e^{-1000\abs\tau}\,\mathrm{V^2}$. Find its two-sided PSD at $f = 0$ in $\mathrm{V^2/Hz}$, and its corner frequency.
::: solution
By [[#eq-lorentzian]] with $\sigma^2 = 4$, $a = 1000\,\mathrm{s^{-1}}$: $S_X(0) = 2\sigma^2/a = 8\times10^{-3}\,\mathrm{V^2/Hz}$. The corner is at $a/2\pi = 159\,\mathrm{Hz}$.
:::
:::

::: exercise White noise in a bandwidth {level=1 check="2e-8"}
White noise with two-sided density $N_0/2 = 10^{-12}\,\mathrm{V^2/Hz}$ is passed through an ideal low-pass filter of bandwidth $10\,\mathrm{kHz}$. What is the output power in $\mathrm{V^2}$?
::: solution
The filter passes $-10\,\mathrm{kHz} < f < 10\,\mathrm{kHz}$, so the power is $10^{-12}\times2\times10^4 = 2\times10^{-8}\,\mathrm{V^2}$, an RMS value of $141\,\mu\mathrm{V}$. Forgetting the negative frequencies would give half the power.
:::
:::

::: exercise A valid autocorrelation? {level=1}
Is $g(\tau) = 1$ for $\abs\tau < T$, $0$ otherwise, a valid autocorrelation function? Is the triangle $h(\tau) = 1 - \abs\tau/T$ for $\abs\tau < T$, $0$ otherwise?
::: solution
Both are even with a maximum at zero, but validity requires a non-negative transform. $g$ transforms to $2T\operatorname{sinc}(2fT)$, which is negative for $1/(2T) < \abs f < 1/T$, so $g$ is not valid. $h$ transforms to $T\operatorname{sinc}^2(fT)\ge0$, so it is valid: it is the autocorrelation of the random binary waveform.
:::
:::

::: exercise Power below a frequency {level=2 check="2/pi*atan(pi)"}
A random telegraph signal ($\pm1$) switches at rate $\lambda = 1000\,\mathrm{s^{-1}}$. What fraction of its power lies below $1\,\mathrm{kHz}$ (that is, in $\abs f < 1\,\mathrm{kHz}$)?
::: solution
Integrating the telegraph PSD $\lambda/(\lambda^2 + \pi^2f^2)$,

$$
\int_{-F}^{F}\frac{\lambda\,\dd f}{\lambda^2 + \pi^2f^2} = \frac{2}{\pi}\arctan\frac{\pi F}{\lambda} = \frac2\pi\arctan\pi = 0.804 .
$$

About $80\,\%$ of the power is below $1\,\mathrm{kHz}$, although the corner frequency is only $318\,\mathrm{Hz}$: the $1/f^2$ tail is slow to integrate out.
:::
:::

::: exercise Locating a leak {level=2 check="65"}
In [[#ex-delay]], suppose the cross-correlation instead peaks with the *near* sensor's signal lagging the far sensor's by $25\,\mathrm{ms}$. How far, in metres, is the leak from the near sensor?
::: solution
Now $d_1 - d_2 = 30\,\mathrm{m}$ with $d_1 + d_2 = 100\,\mathrm{m}$, so $d_1 = 65\,\mathrm{m}$: the leak is nearer the far sensor.
:::
:::

::: exercise A first-order discrete-time process {level=2}
A sequence has $R_X[k] = \sigma^2a^{\abs k}$ with $\abs a < 1$. Show that

$$
S_X(e^{j\omega}) = \frac{\sigma^2(1 - a^2)}{1 - 2a\cos\omega + a^2},
$$

and evaluate at $\omega = 0$ and $\omega = \pi$ for $a = 0.9$. What does the result say about such a process?
::: solution
Sum the two geometric series:

$$
S_X = \sigma^2\Bigl[\sum_{k=0}^\infty(ae^{-j\omega})^k + \sum_{k=1}^\infty(ae^{j\omega})^k\Bigr] = \sigma^2\Bigl[\frac{1}{1 - ae^{-j\omega}} + \frac{ae^{j\omega}}{1 - ae^{j\omega}}\Bigr] = \frac{\sigma^2(1 - a^2)}{\abs{1 - ae^{-j\omega}}^2},
$$

and $\abs{1 - ae^{-j\omega}}^2 = 1 - 2a\cos\omega + a^2$. For $a = 0.9$: $S_X(e^{j0}) = \sigma^2\times0.19/0.01 = 19\sigma^2$ and $S_X(e^{j\pi}) = 0.19\sigma^2/3.61 = 0.0526\sigma^2$. The process is strongly low-pass, a factor of $361$ ($25.6\,\mathrm{dB}$) between DC and the Nyquist frequency: it is the discrete counterpart of the Lorentzian, and the sampled version of the telegraph signal.
:::
:::

::: exercise Bit rate for a channel {level=2 check="1/0.84853"}
A polar NRZ signal must have at least $90\,\%$ of its power within $\abs f < 1\,\mathrm{MHz}$. Using the fact that $\int_{-u}^{u}\operatorname{sinc}^2v\,\dd v = 0.9$ for $u = 0.8485$, find the highest bit rate in Mb/s.
::: solution
The fraction within $\abs f < F$ is $\int_{-FT}^{FT}\operatorname{sinc}^2v\,\dd v$, so we need $FT\ge0.8485$, i.e. $T \ge 0.8485\,\mu\mathrm{s}$, and the bit rate $1/T \le 1.18\,\mathrm{Mb/s}$.
:::
:::

::: exercise Unipolar signalling and spectral lines {level=3}
In on–off (unipolar NRZ) signalling the symbols are $A_k = A$ or $0$ with equal probability. Use [[#thm-pulse-train]] to find the PSD, and show that it contains a DC line but no other spectral lines. What fraction of the power is in the line?
::: solution
$\mu_A = A/2$ and $\sigma_A^2 = A^2/4$. With $\abs{P(f)}^2 = T^2\operatorname{sinc}^2(fT)$,

$$
S_X(f) = \frac{A^2}{4}T\operatorname{sinc}^2(fT) + \frac{A^2}{4}\sum_m\operatorname{sinc}^2(m)\,\delta(f - m/T).
$$

Since $\operatorname{sinc}(m) = 0$ for every nonzero integer $m$, only the $m = 0$ line survives: $S_X = \frac{A^2}{4}T\operatorname{sinc}^2(fT) + \frac{A^2}{4}\delta(f)$. The total power is $\E[A_k^2] = A^2/2$, of which the DC line holds $A^2/4$, exactly half — power that carries no information. Return-to-zero pulses would make the lines at $m/T$ reappear (useful for clock recovery) because their spectrum has no nulls at the multiples of the bit rate.
:::
:::

::: exercise Derive the Manchester spectrum {level=3}
Starting from the definition of the Manchester pulse in [[#ex-line-codes]], derive $\abs{P(f)} = T\abs{\operatorname{sinc}(fT/2)\sin(\pi fT/2)}$, and show that $\int S_\mathrm{Man}\,\dd f = A^2$. Where is $S_\mathrm{Man}$ largest?
::: hint
Factor $e^{-j\pi fT}$ out of $e^{-j\pi fT/2} - e^{-j3\pi fT/2}$. For the power, use Parseval rather than integrating the spectrum.
:::
::: solution
The half-width rectangle on $[0, T/2)$ has transform $\frac T2\operatorname{sinc}(fT/2)e^{-j\pi fT/2}$; the second half-pulse is its negative delayed by $T/2$. So $P(f) = \frac T2\operatorname{sinc}(fT/2)\bigl(e^{-j\pi fT/2} - e^{-j3\pi fT/2}\bigr) = \frac T2\operatorname{sinc}(fT/2)e^{-j\pi fT}\cdot2j\sin(\pi fT/2)$, whose magnitude is $T\abs{\operatorname{sinc}(fT/2)\sin(\pi fT/2)}$. By Parseval $\int\abs{P}^2\,\dd f = \int\abs{p}^2\,\dd t = T$, so $\int S\,\dd f = (A^2/T)\cdot T = A^2$, the power of a $\pm A$ waveform, as it must be. Numerically, $\operatorname{sinc}^2(u/2)\sin^2(\pi u/2)$ peaks near $u = fT \approx 0.74$, at about $0.52$ (in units of $A^2T$).
:::
:::

::: exercise Spectrum of a modulated process {level=3}
Using the result of [[random-signals/random-processes]] that $Y(t) = X(t)\cos(2\pi f_ct + \Theta)$ has $R_Y(\tau) = \frac12R_X(\tau)\cos2\pi f_c\tau$, find $S_Y(f)$ in terms of $S_X$. A baseband noise with $S_X = S_0$ for $\abs f < B$ modulates a carrier at $f_c \gg B$: sketch $S_Y$ and check that the powers agree.
::: solution
Multiplying by $\cos2\pi f_c\tau = \frac12(e^{j2\pi f_c\tau} + e^{-j2\pi f_c\tau})$ shifts the transform, so

$$
S_Y(f) = \tfrac14\bigl[S_X(f - f_c) + S_X(f + f_c)\bigr].
$$

For the band-limited noise, $S_Y = S_0/4$ on $f_c - B < \abs f < f_c + B$ and zero elsewhere: two bands of width $2B$ each. The power of $Y$ is $2\times2B\times S_0/4 = BS_0$, and $R_Y(0) = \frac12R_X(0) = \frac12\cdot2BS_0 = BS_0$. Modulation moves the spectrum to the carrier and halves the power, the half being the mean of $\cos^2$.
:::
:::
