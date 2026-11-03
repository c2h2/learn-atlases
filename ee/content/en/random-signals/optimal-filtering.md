A radar transmits a pulse and listens for its echo. The echo from a distant aircraft is far weaker than the receiver's noise: on an oscilloscope there is nothing to see. Yet the radar detects it reliably, because it knows exactly what shape of pulse to look for and uses a filter designed to make that shape stand out. A different problem faces an engineer restoring an old recording or cleaning up a sensor signal: the signal is not a known pulse but a random waveform with a known spectrum, and the goal is not to decide whether it is there but to reproduce it as accurately as possible. Both problems ask for the *best* linear filter, and both have elegant, exact answers.

This chapter derives the two classical optimal filters. The **matched filter** maximises the signal-to-noise ratio at one instant for a known pulse in noise; it is the heart of every radar, sonar and digital receiver, and it gives the famous ratio $2E/N_0$ that governs error rates. The **Wiener filter** minimises the mean-square error between a random signal and its estimate from noisy observations; it is the foundation of noise reduction, equalisation and, in its recursive form, the Kalman filter of [[random-signals/estimation-kalman]]. We use the spectra of [[random-signals/correlation-spectra]], the filtering theorems of [[random-signals/random-signals-lti]] and the white Gaussian noise of [[random-signals/gaussian-noise]].

## The matched filter

### The problem

A known pulse $s(t)$ of finite energy $E = \int s^2(t)\,\dd t$ is received in additive white noise $W(t)$ of two-sided density $N_0/2$:

$$
X(t) = s(t) + W(t).
$$

We pass $X$ through an LTI filter $h$ and sample the output at a chosen instant $T_0$. The output sample is the sum of a deterministic signal part $y_s(T_0) = \int h(T_0 - t)s(t)\,\dd t$ and a random noise part of variance $\frac{N_0}{2}\int h^2(t)\,\dd t$ (by [[random-signals/random-signals-lti]]). The figure of merit is the **output signal-to-noise ratio**

$$
\mathrm{SNR} = \frac{y_s^2(T_0)}{\E[y_n^2]} = \frac{\bigl\lvert\int H(f)S(f)e^{j2\pi fT_0}\,\dd f\bigr\rvert^2}{\frac{N_0}{2}\int\abs{H(f)}^2\,\dd f},
$$ {#eq-snr}

where $S(f)$ is the Fourier transform of $s$ and the numerator is the inverse transform of $HS$ evaluated at $T_0$. Which $H$ makes this as large as possible?

::: theorem Matched filter {#thm-matched}
Among all LTI filters, the output SNR [[#eq-snr]] at time $T_0$ is maximised by

$$
H(f) = k\,S^*(f)\,e^{-j2\pi fT_0}, \qquad h(t) = k\,s(T_0 - t),
$$ {#eq-matched}

for any constant $k\neq0$, and the maximum SNR is

$$
\mathrm{SNR}_\mathrm{max} = \frac{2E}{N_0}.
$$ {#eq-2e-n0}
:::

::: proof
The Cauchy–Schwarz inequality for complex functions states $\bigl\lvert\int A(f)B(f)\,\dd f\bigr\rvert^2 \le \int\abs{A}^2\dd f\int\abs B^2\dd f$, with equality if and only if $A$ is proportional to $B^*$. Apply it with $A = H$ and $B = Se^{j2\pi fT_0}$:

$$
\mathrm{SNR} \le \frac{\int\abs H^2\,\dd f\int\abs S^2\,\dd f}{\frac{N_0}{2}\int\abs H^2\,\dd f} = \frac{2}{N_0}\int\abs{S(f)}^2\,\dd f = \frac{2E}{N_0},
$$

using Parseval's theorem $\int\abs S^2\,\dd f = \int s^2\,\dd t = E$. Equality holds if and only if $H(f) = kS^*(f)e^{-j2\pi fT_0}$. For real $s$, $S^*(f)$ is the transform of $s(-t)$, and the factor $e^{-j2\pi fT_0}$ delays it by $T_0$, giving $h(t) = ks(T_0 - t)$.
:::

The result is remarkable in three ways. First, the optimal impulse response is the signal itself, **reversed in time** and delayed — hence "matched". Second, the best SNR depends only on the pulse's **energy**, not on its shape, duration or bandwidth: a long, low pulse and a short, intense one of the same energy are equally detectable. Third, in the frequency domain the filter's magnitude $\abs{H} \propto \abs{S}$ emphasises the frequencies where the signal is strong and suppresses those where there is mostly noise, while its phase $-\angle S(f) - 2\pi fT_0$ cancels the signal's phase so that all its frequency components add in phase at $t = T_0$.

The delay $T_0$ must be at least the pulse duration for $h(t) = s(T_0 - t)$ to be causal: we cannot finish matching a pulse before it has arrived. For a pulse on $[0, T]$ the usual choice is $T_0 = T$.

::: definition Correlation receiver {#def-correlator}
For a pulse $s(t)$ on $[0, T]$, the matched-filter output at $T_0 = T$ is

$$
y(T) = \int_0^TX(t)\,s(t)\,\dd t
$$ {#eq-correlator}

(with $k = 1$). A receiver that multiplies the input by a stored copy of the pulse and integrates over the pulse duration is a **correlator**; it produces the same sample at $t = T$ as the matched filter.
:::

Indeed $y(T) = \int h(T - t)X(t)\,\dd t = \int s(t)X(t)\,\dd t$. The two implementations differ only at other instants: the matched filter produces the whole cross-correlation of the input with the pulse as a function of time, which is what a radar needs when the echo's delay is unknown, while the correlator produces just the one number needed when the timing is known, as in a synchronised data receiver.

::: example Matched filter for a rectangular pulse {#ex-rect-matched}
A pulse $s(t) = A$ for $0\le t < T$ is received in white noise. Find the matched filter, its output signal $y_s(t)$, and the output SNR at $t = T$. Evaluate the SNR for $A = 1\,\mathrm{mV}$, $T = 10\,\mu\mathrm{s}$ and $N_0/2 = 10^{-15}\,\mathrm{V^2/Hz}$.
::: solution
With $T_0 = T$ and $k = 1$, $h(t) = s(T - t) = A$ for $0 \le t < T$: the matched filter is an **integrate-and-dump** circuit that integrates the input over one pulse length. Its output to the pulse is the convolution of two rectangles, a triangle:

$$
y_s(t) = \int s(\tau)h(t - \tau)\,\dd\tau = A^2\bigl(T - \abs{t - T}\bigr) \quad\text{for } 0\le t\le 2T,
$$

peaking at $t = T$ with $y_s(T) = A^2T = E$. The noise variance is $\frac{N_0}{2}\int h^2 = \frac{N_0}{2}A^2T = \frac{N_0}{2}E$, so $\mathrm{SNR} = E^2/(\frac{N_0}{2}E) = 2E/N_0$, as [[#thm-matched]] promises.

Numerically, $E = (10^{-3})^2\times10^{-5} = 10^{-11}\,\mathrm{V^2s}$ and $N_0 = 2\times10^{-15}\,\mathrm{V^2/Hz}$, so $\mathrm{SNR} = 2\times10^{-11}/(2\times10^{-15}) = 10^4$, or $40\,\mathrm{dB}$. Before filtering, in a bandwidth of, say, $1\,\mathrm{MHz}$, the noise power would be $2\times10^{-15}\times10^6 = 2\times10^{-9}\,\mathrm{V^2}$, an RMS value of $44.7\,\mu\mathrm{V}$, against a signal of $1\,\mathrm{mV}$: an SNR of $27\,\mathrm{dB}$. The matched filter gains $13\,\mathrm{dB}$ by integrating the pulse's energy and rejecting noise outside its spectrum.
:::
:::

::: example How good is a simple RC filter? {#ex-rc-mismatch}
Instead of an integrate-and-dump, the rectangular pulse of [[#ex-rect-matched]] is filtered by an RC low-pass, $h(t) = \frac{1}{RC}e^{-t/RC}u(t)$, and sampled at $t = T$. Find the SNR as a function of $x = T/RC$, choose the best time constant, and find the loss relative to the matched filter.
::: solution
The output at $t = T$ is the step response $y_s(T) = A(1 - e^{-T/RC})$. The noise variance is $\frac{N_0}{2}\int h^2 = \frac{N_0}{2}\cdot\frac{1}{2RC}$. Hence

$$
\mathrm{SNR} = \frac{A^2(1 - e^{-x})^2}{N_0/(4RC)} = \frac{2E}{N_0}\cdot\frac{2(1 - e^{-x})^2}{x}, \qquad x = \frac{T}{RC},
$$

using $E = A^2T$ and $4RC = 4T/x$. The factor $g(x) = 2(1 - e^{-x})^2/x$ is small both for small $x$ (the filter is too slow and the pulse barely charges it) and for large $x$ (the bandwidth is too wide and lets in too much noise). Maximising numerically gives $x = 1.256$, i.e. $RC = 0.796T$, with $g = 0.815$: a loss of only $0.89\,\mathrm{dB}$. A crude filter of the right bandwidth comes close to optimal; the matched filter's main lesson is "use a bandwidth of about $1/T$", and its exact shape buys the last decibel.
:::
:::

::: widget plot
f: 2*(1 - exp(-x))^2/x; 1 + 0*x
x: 0.05, 6
y: 0, 1.1
points: 1.256, 0.8145
labels: \text{RC filter}, g(T/RC); \text{matched filter}
caption: Output SNR of an RC filter for a rectangular pulse, as a fraction of the matched-filter value $2E/N_0$, against $x = T/RC$. The marked optimum at $x = 1.256$ reaches $81\,\%$ ($-0.89\,\mathrm{dB}$). Hover to see how flat the curve is near its peak: any time constant between $0.5T$ and $1.5T$ stays within $1.5\,\mathrm{dB}$ of the matched filter.
:::

### Detection and error probability

Combining the matched filter with the Gaussian statistics of [[random-signals/gaussian-noise]] gives the error rate of the simplest digital link.

::: example Error rate of antipodal signalling {#ex-antipodal}
Each bit is sent as $+s(t)$ or $-s(t)$ with energy $E_b$, equally likely, in white Gaussian noise. The receiver correlates with $s(t)$ and decides by the sign of the output. Show that $P_e = Q\bigl(\sqrt{2E_b/N_0}\bigr)$, and find the $E_b/N_0$ needed for $P_e = 10^{-5}$.
::: solution
The correlator output is $Z = \pm E_b + N$, where $N = \int W(t)s(t)\,\dd t$ is Gaussian with zero mean and variance $\frac{N_0}{2}E_b$ by [[random-signals/gaussian-noise#def-wgn]]. As in [[random-signals/probability-for-engineers#ex-threshold-design]],

$$
P_e = Q\Bigl(\frac{E_b}{\sqrt{N_0E_b/2}}\Bigr) = Q\Bigl(\sqrt{\frac{2E_b}{N_0}}\Bigr).
$$ {#eq-pe-antipodal}

The argument is the square root of the matched-filter SNR $2E_b/N_0$. Solving $Q(\sqrt{2E_b/N_0}) = 10^{-5}$ by bisection gives $E_b/N_0 = 9.09$, i.e. $9.6\,\mathrm{dB}$ — the benchmark figure for binary phase-shift keying quoted in every communications text. No receiver can do better for this signal set, because the matched filter extracts the largest possible SNR and, for Gaussian noise, the sign decision on it is the optimal (maximum-likelihood) rule ([[communication-systems/optimal-detection]]).
:::
:::

::: widget hypothesis
test: z
tail: right
alpha: 0.001
effect: 0.5
n: 25
caption: Detection as a test between two Gaussian densities: "no target" (matched-filter output $\Normal(0, 1)$, normalised) and "target present" ($\Normal(d, 1)$ with $d = \sqrt{2E/N_0}$, here $d = \text{effect}\times\sqrt n = 2.5$). The threshold is set by the false-alarm probability $\alpha$; the power is the detection probability. Increase $n$ (more pulse energy) and watch the detection probability rise at a fixed false-alarm rate; lower $\alpha$ and the price is paid in missed detections.
:::

::: quiz
A radar doubles its pulse length while keeping the same peak transmitter power, and uses a matched filter. How does the detection SNR change?
- [ ] It is unchanged, because the peak power is unchanged
- [x] It doubles ($+3\,\mathrm{dB}$), because the pulse energy doubles
- [ ] It halves, because the longer pulse needs a narrower filter that lets in less signal
- [ ] It quadruples, because both the amplitude and the duration matter
::: solution
The matched-filter SNR is $2E/N_0$ and depends only on energy, which is peak power times duration. Doubling the duration doubles $E$. The price is range resolution, which for a plain pulse is set by its duration; pulse compression ([[#app-pulse-compression]]) recovers it.
:::
:::

### Coloured noise

If the noise is not white but has PSD $S_N(f)$, the same Cauchy–Schwarz argument, applied after writing $HS = (H\sqrt{S_N})(S/\sqrt{S_N})$, gives the optimum

$$
H(f) = k\,\frac{S^*(f)}{S_N(f)}\,e^{-j2\pi fT_0}, \qquad \mathrm{SNR}_\mathrm{max} = \int_{-\infty}^\infty\frac{\abs{S(f)}^2}{S_N(f)}\,\dd f .
$$ {#eq-coloured}

It factorises naturally into a **whitening filter** $1/\sqrt{S_N}$ (with a suitable phase, as in [[random-signals/random-signals-lti#thm-factorisation]]) followed by a filter matched to the whitened pulse $S/\sqrt{S_N}$. The SNR integral shows where detection power comes from: frequencies where the signal is strong relative to the noise. A pulse whose spectrum avoids the noisiest frequencies is easier to detect.

::: application Pulse compression {#app-pulse-compression}
A radar's detection range is set by the pulse energy $E$, but its range resolution by the duration of the matched-filter output peak, roughly $1/B$ for a pulse of bandwidth $B$. A plain rectangular pulse has $B\approx1/T$, so energy and resolution conflict: a long pulse for energy gives a broad peak. **Pulse compression** escapes the conflict by transmitting a long pulse whose frequency sweeps across a bandwidth $B\gg1/T$ (a chirp) or whose phase is coded. The matched filter, $h(t) = s(T_0 - t)$, compresses it to a peak of width about $1/B$, a compression ratio of $BT$, which exceeds $1000$ in modern radars. The same idea underlies GPS codes, the chirp spread spectrum of LoRa radios, and ultrasound imaging.
:::

## The Wiener filter

### Linear minimum mean-square-error estimation

Now the signal $S(t)$ is itself a random process — speech, a sensor reading, a transmitted waveform after an unknown channel — and we observe $X(t) = S(t) + N(t)$, where the noise $N$ is uncorrelated with $S$. We want an LTI filter whose output $\hat S(t) = \int h(\alpha)X(t - \alpha)\,\dd\alpha$ is as close as possible to $S(t)$ in the mean-square sense:

$$
\text{minimise } \ \E\bigl[(S(t) - \hat S(t))^2\bigr].
$$

The key to all such problems is a geometric principle.

::: theorem Orthogonality principle {#thm-orthogonality}
The linear estimate $\hat S = \sum_kh_kX_k$ (or its integral form) of a zero-mean random variable $S$ from zero-mean observations $X_k$ minimises $\E[(S - \hat S)^2]$ if and only if the error is orthogonal to every observation:

$$
\E\bigl[(S - \hat S)\,X_k\bigr] = 0 \quad\text{for all } k.
$$ {#eq-orthogonality}

The minimum mean-square error is then $\E[(S - \hat S)S] = \E[S^2] - \E[\hat SS]$.
:::

::: proof
Let $\hat S$ satisfy [[#eq-orthogonality]] and let $\tilde S = \sum_kg_kX_k$ be any other linear estimate. Then $\hat S - \tilde S$ is a linear combination of the $X_k$, so it is orthogonal to the error $S - \hat S$, and

$$
\E\bigl[(S - \tilde S)^2\bigr] = \E\bigl[(S - \hat S + \hat S - \tilde S)^2\bigr] = \E\bigl[(S - \hat S)^2\bigr] + \E\bigl[(\hat S - \tilde S)^2\bigr] \ge \E\bigl[(S - \hat S)^2\bigr],
$$

with equality only if $\tilde S = \hat S$ (in mean square). Conversely, if some $\E[(S - \hat S)X_k] = c \neq 0$, adding $\eps X_k$ to $\hat S$ changes the error by $-2\eps c + \eps^2\E[X_k^2]$, which is negative for small $\eps$ of the sign of $c$, so $\hat S$ was not optimal. Finally, the MMSE is $\E[(S - \hat S)(S - \hat S)] = \E[(S - \hat S)S]$, because the error is orthogonal to $\hat S$, a combination of the $X_k$.
:::

Geometrically, random variables with finite second moments form a vector space with inner product $\E[UV]$; the best estimate is the orthogonal projection of $S$ onto the subspace spanned by the observations, exactly like the least-squares solution in [Maths Atlas: least squares](/learn/maths/lesson.php?c=linear-algebra&l=least-squares). The error is perpendicular to the subspace.

::: example A single noisy measurement {#ex-scalar}
A zero-mean signal $S$ with variance $\sigma_S^2$ is measured as $X = S + N$, with independent zero-mean noise of variance $\sigma_N^2$. Find the best linear estimate $\hat S = cX$ and its MMSE.
::: solution
Orthogonality: $\E[(S - cX)X] = 0$, i.e. $\E[SX] = c\E[X^2]$. With $\E[SX] = \sigma_S^2$ and $\E[X^2] = \sigma_S^2 + \sigma_N^2$,

$$
c = \frac{\sigma_S^2}{\sigma_S^2 + \sigma_N^2} = \frac{\mathrm{SNR}}{1 + \mathrm{SNR}}, \qquad \mathrm{MMSE} = \sigma_S^2 - c\sigma_S^2 = \frac{\sigma_S^2\sigma_N^2}{\sigma_S^2 + \sigma_N^2}.
$$

The estimate does *not* simply take the measurement at face value ($c = 1$, error $\sigma_N^2$); it shrinks it towards the prior mean $0$, by more when the SNR is low. For $\sigma_S^2 = 9$ and $\sigma_N^2 = 4$: $c = 9/13 = 0.692$ and MMSE $= 36/13 = 2.77$, smaller than both $\sigma_N^2 = 4$ (trusting the measurement) and $\sigma_S^2 = 9$ (ignoring it).
:::
:::

### The non-causal Wiener filter

Applying the orthogonality principle to the continuous observation $X(t - \alpha)$, $-\infty < \alpha < \infty$, gives the condition $\E[(S(t) - \hat S(t))X(t - \tau)] = 0$ for all $\tau$, which reads

$$
R_{SX}(\tau) = \int_{-\infty}^\infty h(\alpha)R_X(\tau - \alpha)\,\dd\alpha \quad\text{for all } \tau ,
$$ {#eq-wiener-hopf}

the **Wiener–Hopf equation**. When the filter may use the whole observation, past and future, it holds for every $\tau$ and is solved by a Fourier transform.

::: theorem Non-causal Wiener filter {#thm-wiener}
The LTI filter that minimises $\E[(S(t) - \hat S(t))^2]$, using all of $X$, is

$$
H(f) = \frac{S_{SX}(f)}{S_X(f)},
$$ {#eq-wiener}

and for $X = S + N$ with $S$ and $N$ uncorrelated and zero-mean,

$$
H(f) = \frac{S_S(f)}{S_S(f) + S_N(f)}, \qquad \mathrm{MMSE} = \int_{-\infty}^{\infty}\frac{S_S(f)S_N(f)}{S_S(f) + S_N(f)}\,\dd f .
$$ {#eq-wiener-sn}
:::

::: proof
The right side of [[#eq-wiener-hopf]] is a convolution, so transforming gives $S_{SX} = HS_X$. With uncorrelated $S$ and $N$, $R_{SX}(\tau) = \E[S(t + \tau)(S(t) + N(t))] = R_S(\tau)$ and $R_X = R_S + R_N$, so $S_{SX} = S_S$ and $S_X = S_S + S_N$. For the error, the orthogonality principle gives $\mathrm{MMSE} = R_S(0) - \E[\hat S(t)S(t)] = \int(S_S - H^*S_{SX})\,\dd f$ — the cross term is $\int h(\alpha)R_{SX}(-\alpha)\,\dd\alpha = \int H^*(f)S_{SX}(f)\,\dd f$ for real $h$ — and substituting $H$ gives $\int S_S\bigl(1 - \frac{S_S}{S_S + S_N}\bigr)\dd f$, which is [[#eq-wiener-sn]].
:::

The Wiener filter is a frequency-by-frequency version of the scalar shrinkage of [[#ex-scalar]]. At each frequency, its gain $S_S/(S_S + S_N)$ is the "local SNR over one plus local SNR": close to $1$ where the signal dominates, close to $0$ where the noise dominates, and $\frac12$ where they are equal. It never amplifies, and it has zero phase, so it is non-causal — it needs future samples — which is no obstacle for recorded data (image restoration, offline audio processing) but must be addressed in real time.

::: widget plot
f: 1/(1 + (x/a)^2)/(1/(1 + (x/a)^2) + n); 1/(1 + (x/a)^2); n + 0*x
x: 0, 10
y: 0, 1.1
sliders: a=1:0.2:3:0.1; n=0.05:0.005:0.5:0.005
labels: H(f)\ \text{Wiener gain}; S_S(f)\ \text{(normalised)}; S_N(f)
caption: A Lorentzian signal spectrum $S_S$ (normalised to $1$ at DC, corner $a$) in white noise of level $n$, against frequency, with the Wiener gain $S_S/(S_S + S_N)$. The gain is near $1$ where the signal dominates and rolls off where the signal spectrum sinks below the noise, reaching $\tfrac12$ where they cross. Lower the noise level $n$ and the filter opens up to pass more of the signal; raise it and the filter closes down, accepting distortion of the signal to reject noise.
:::

::: example Wiener filtering of a first-order signal {#ex-wiener-lorentz}
A signal with $R_S(\tau) = \sigma^2e^{-a\abs\tau}$ is observed in white noise of two-sided density $N_0/2$. Find the non-causal Wiener filter and its MMSE. Evaluate for $\sigma^2 = 1\,\mathrm{V^2}$, $a = 100\,\mathrm{s^{-1}}$ and $N_0/2 = 10^{-4}\,\mathrm{V^2/Hz}$.
::: solution
With $\omega = 2\pi f$, $S_S = 2a\sigma^2/(a^2 + \omega^2)$ ([[random-signals/correlation-spectra#ex-lorentzian]]). Then

$$
H = \frac{2a\sigma^2}{2a\sigma^2 + \frac{N_0}{2}(a^2 + \omega^2)} = \frac{b^2 - a^2}{b^2 + \omega^2}, \qquad b^2 = a^2 + \frac{4a\sigma^2}{N_0}.
$$

This is again Lorentzian in shape, with corner $b > a$; its impulse response is $h(t) = \frac{b^2 - a^2}{2b}e^{-b\abs t}$, symmetric in time. The MMSE is $\int\frac{N_0}{2}H\,\dd f = \frac{N_0}{2}(b^2 - a^2)\int\frac{\dd f}{b^2 + 4\pi^2f^2} = \frac{N_0}{2}\cdot\frac{b^2 - a^2}{2b}$, and since $\frac{N_0}{2}(b^2 - a^2) = 2a\sigma^2$,

$$
\mathrm{MMSE} = \frac{a\sigma^2}{b}.
$$

Numerically, $4a\sigma^2/N_0 = 400/(2\times10^{-4}) = 2\times10^6\,\mathrm{s^{-2}}$, so $b = \sqrt{10^4 + 2\times10^6} = 1418\,\mathrm{s^{-1}}$ and $\mathrm{MMSE} = 100/1418 = 0.0705\,\mathrm{V^2}$. The error is $11.5\,\mathrm{dB}$ below the signal power. (Without filtering, the error would be the white noise itself, of infinite power.) The best *causal* filter, derived in [[random-signals/estimation-kalman]], is $H(s) = (b - a)/(s + b)$ with MMSE $\frac{N_0}{2}(b - a) = 0.132\,\mathrm{V^2}$: being unable to look ahead costs a factor of $1.87$.
:::
:::

::: quiz
A Wiener filter is designed for a signal in white noise. The noise level then rises by $10\,\mathrm{dB}$ and the filter is redesigned. What happens to the filter?
- [ ] Its gain rises at all frequencies, to keep the signal level constant
- [x] Its gain falls, most at frequencies where the signal spectrum is weak, so its bandwidth shrinks
- [ ] It is unchanged, because the Wiener filter depends only on the signal spectrum
- [ ] It becomes the matched filter
::: solution
The gain $S_S/(S_S + S_N)$ decreases at every frequency when $S_N$ grows, and most strongly where $S_S$ is small compared with $S_N$, i.e. in the signal's spectral tails. In [[#ex-wiener-lorentz]], $b^2 = a^2 + 4a\sigma^2/N_0$ falls as $N_0$ rises: the filter's corner moves down towards the signal's own corner $a$. More noise means more smoothing and more signal distortion.
:::
:::

::: warning Optimal for the assumed spectra only
A Wiener filter is optimal only for the signal and noise spectra it was designed with. If the noise is louder than assumed, the filter passes too much of it; if the signal has energy where the model said it had none, the filter removes it. In practice the spectra are estimated, and adaptive versions — the LMS and RLS filters of echo cancellers and equalisers — re-estimate them continuously. Do not confuse the Wiener filter, which estimates a *random* signal, with the matched filter, which detects a *known* one: they solve different problems and generally give different filters.
:::

### FIR Wiener filters

In digital signal processing the filter is usually a causal FIR filter with $L$ taps, $\hat S[n] = \sum_{k=0}^{L-1}h_kX[n - k]$. The orthogonality conditions $\E[(S[n] - \hat S[n])X[n - i]] = 0$ for $i = 0, \ldots, L - 1$ become a finite linear system.

::: theorem Normal equations of the FIR Wiener filter {#thm-normal-equations}
The optimal $L$-tap FIR estimate of $S[n]$ from $X[n], \ldots, X[n - L + 1]$ has coefficients $\mathbf h = [h_0, \ldots, h_{L-1}]\T$ satisfying

$$
\mathbf R_X\mathbf h = \mathbf r_{SX}, \qquad (\mathbf R_X)_{ik} = R_X[i - k], \quad (\mathbf r_{SX})_i = R_{SX}[i],
$$ {#eq-normal}

and the MMSE is $R_S[0] - \mathbf h\T\mathbf r_{SX}$. The matrix $\mathbf R_X$ is symmetric, Toeplitz and positive definite (for a process with a nonzero continuous spectrum), so the solution is unique.
:::

::: proof
$\E[S[n]X[n - i]] = R_{SX}[i]$ and $\E[\hat S[n]X[n - i]] = \sum_kh_kR_X[i - k]$, so [[#eq-orthogonality]] for each $i$ is one row of [[#eq-normal]]. The MMSE follows from [[#thm-orthogonality]]: $R_S[0] - \E[\hat S[n]S[n]] = R_S[0] - \sum_kh_kR_{SX}[k]$. Positive definiteness: $\mathbf a\T\mathbf R_X\mathbf a = \E[(\sum_ka_kX[n - k])^2] = \frac{1}{2\pi}\int\abs{A(e^{j\omega})}^2S_X\,\dd\omega > 0$ for $\mathbf a \neq \mathbf 0$.
:::

The Toeplitz structure allows the Levinson–Durbin recursion to solve [[#eq-normal]] in $O(L^2)$ operations instead of $O(L^3)$; the same equations appear in linear prediction of speech ([[dsp/spectral-analysis]]).

::: example Designing an FIR noise-reduction filter {#ex-fir-wiener}
A signal is the first-order process of [[random-signals/random-signals-lti#ex-ar1]], $S[n] = 0.9S[n - 1] + W[n]$ with unit-variance $W$, so $R_S[k] = 0.9^{\abs k}/0.19$. It is observed in independent white noise of unit variance. Design the 3-tap Wiener filter, find its MMSE, and verify by simulation.
::: solution
$R_X[k] = R_S[k] + \delta[k]$ and $R_{SX}[k] = R_S[k]$. With $R_S[0] = 5.263$, $R_S[1] = 4.737$, $R_S[2] = 4.263$, the normal equations are

$$
\begin{bmatrix}6.263 & 4.737 & 4.263\\ 4.737 & 6.263 & 4.737\\ 4.263 & 4.737 & 6.263\end{bmatrix}\begin{bmatrix}h_0\\h_1\\h_2\end{bmatrix} = \begin{bmatrix}5.263\\4.737\\4.263\end{bmatrix},
$$

whose solution (by Gaussian elimination) is $\mathbf h = [0.6013,\ 0.2250,\ 0.1013]\T$. The MMSE is $5.263 - (0.6013\times5.263 + 0.2250\times4.737 + 0.1013\times4.263) = 0.601$. For comparison, using the raw observation gives an error of $1$ (the noise variance), and a single tap ($L = 1$) gives $0.840$; longer filters give $0.597$ ($L = 5$) and converge to $0.5974$, the causal IIR limit. The non-causal Wiener filter, which can also use future samples, reaches $\frac{1}{2\pi}\int\frac{S_SS_N}{S_S + S_N}\,\dd\omega = 0.463$.

A Python simulation (`random.seed(13)`, $5\times10^5$ samples) filtered the noisy observation with the 3-tap filter and printed an error power of $0.5994$ against the predicted $0.6012$, and an error power of $0.9974$ for the raw observation (predicted $1$). The filter has improved the SNR from $5.263/1 = 7.2\,\mathrm{dB}$ to $5.263/0.601 = 9.4\,\mathrm{dB}$.
:::
:::

::: history
The matched filter was derived by Dwight O. North at RCA Laboratories in 1943, in a classified report on radar detection, and independently by J. H. Van Vleck and David Middleton at Harvard in 1944–46. Norbert Wiener developed the theory of optimal linear prediction and filtering of stationary time series during the Second World War, motivated by anti-aircraft fire control; his report, known to engineers as the "yellow peril" for its yellow cover and formidable mathematics, was published as the book *Extrapolation, Interpolation, and Smoothing of Stationary Time Series* in 1949. Andrey Kolmogorov had solved the discrete-time prediction problem independently in 1941. Norman Levinson's 1947 recursion made the discrete Wiener filter practical, and Bernard Widrow and Ted Hoff's LMS algorithm of 1960 made it adaptive.
:::

## Where this leads

The matched filter is the receiver of [[communication-systems/optimal-detection]] and [[communication-systems/digital-modulation]], where $E_b/N_0$ becomes the universal currency of link performance, and pulse shaping that keeps matched filtering free of intersymbol interference is developed in [[communication-systems/baseband-transmission]]. The Wiener filter's restriction to stationary processes and its frequency-domain solution are lifted in [[random-signals/estimation-kalman]], where the Kalman filter computes the causal MMSE estimate recursively, in the time domain, for time-varying systems. FIR Wiener filters reappear as adaptive equalisers and linear predictors in [[dsp/spectral-analysis]].

::: summary
- For a known pulse $s(t)$ in white noise, the filter $h(t) = s(T_0 - t)$ maximises the output SNR at $T_0$ ([[#thm-matched]]); the maximum is $2E/N_0$, independent of the pulse shape.
- A matched filter sampled at the end of the pulse is a correlator $\int Xs\,\dd t$; for a rectangular pulse it is an integrate-and-dump, and a well-chosen RC filter is only $0.89\,\mathrm{dB}$ worse.
- Antipodal signalling with matched filtering gives $P_e = Q(\sqrt{2E_b/N_0})$; $P_e = 10^{-5}$ needs $E_b/N_0 = 9.6\,\mathrm{dB}$.
- In coloured noise, $H = S^*e^{-j2\pi fT_0}/S_N$: whiten, then match. SNR $= \int\abs S^2/S_N\,\dd f$.
- Orthogonality principle: the best linear estimate makes the error orthogonal to all the data.
- Non-causal Wiener filter $H = S_S/(S_S + S_N)$, with MMSE $\int S_SS_N/(S_S + S_N)\,\dd f$; it shrinks each frequency by its local SNR.
- An $L$-tap FIR Wiener filter solves the Toeplitz normal equations $\mathbf R_X\mathbf h = \mathbf r_{SX}$.
:::

## Exercises

::: exercise Matched-filter SNR {level=1 check="10*log10(200)"}
A pulse of energy $10^{-9}\,\mathrm{V^2s}$ is received in white noise with $N_0 = 10^{-11}\,\mathrm{V^2/Hz}$ (one-sided). What is the maximum output SNR in dB?
::: solution
$2E/N_0 = 2\times10^{-9}/10^{-11} = 200$, i.e. $23.0\,\mathrm{dB}$.
:::
:::

::: exercise Matched filter for a ramp {level=1}
Find the matched filter, with $T_0 = T$, for the pulse $s(t) = t/T$ on $0\le t < T$ (zero elsewhere), and the maximum SNR in noise of density $N_0/2$.
::: solution
$h(t) = s(T - t) = (T - t)/T$ for $0\le t < T$: a falling ramp. The energy is $E = \int_0^Tt^2/T^2\,\dd t = T/3$, so $\mathrm{SNR}_\mathrm{max} = 2T/(3N_0)$.
:::
:::

::: exercise Wiener gain {level=1 check="0.75"}
At a certain frequency the signal spectrum is three times the noise spectrum. What is the gain of the non-causal Wiener filter there?
::: solution
$H = S_S/(S_S + S_N) = 3/(3 + 1) = 0.75$.
:::
:::

::: exercise Bit error rate {level=2 check="0.00019091"}
Antipodal signalling is received with $E_b/N_0 = 8\,\mathrm{dB}$ using a matched filter. What is the bit error probability?
::: solution
$E_b/N_0 = 10^{0.8} = 6.31$, so $\sqrt{2E_b/N_0} = 3.552$ and $P_e = Q(3.552) = 1.91\times10^{-4}$.
:::
:::

::: exercise Best single-tap estimate {level=2 check="36/13"}
In [[#ex-scalar]], suppose $\sigma_S^2 = 9$ and $\sigma_N^2 = 4$. What is the MMSE of the best linear estimate? By how many dB does it improve on simply using $X$?
::: solution
$\mathrm{MMSE} = 9\times4/13 = 2.769$. Using $X$ directly gives error variance $4$; the improvement is $10\log_{10}(4/2.769) = 1.6\,\mathrm{dB}$.
:::
:::

::: exercise Wiener filter for a band-limited signal {level=2}
A signal has $S_S = S_0$ for $\abs f < B$ (zero elsewhere) and is observed in white noise $N_0/2$. Find the Wiener filter and the MMSE. Show that as $S_0\to\infty$ the MMSE tends to $N_0B$, the noise passed by an ideal low-pass filter of bandwidth $B$.
::: solution
$H = S_0/(S_0 + N_0/2)$ for $\abs f < B$ and $0$ outside. $\mathrm{MMSE} = 2B\cdot\frac{S_0N_0/2}{S_0 + N_0/2}$. As $S_0\to\infty$ the fraction tends to $N_0/2$ and the MMSE to $2B\cdot N_0/2 = N_0B$. At high SNR the Wiener filter becomes the ideal low-pass filter matched to the signal band; at low SNR it also attenuates the in-band signal, trading distortion for noise.
:::
:::

::: exercise A matched filter is not a Wiener filter {level=2}
For the rectangular pulse of [[#ex-rect-matched]], compare the matched filter's output waveform $y_s(t)$ with the pulse itself. Why is this acceptable for detection but not for waveform estimation?
::: solution
The matched filter turns the rectangle into a triangle of twice the duration, peaking at $t = T$. The shape is badly distorted, but detection needs only the value at the sampling instant, which the matched filter maximises relative to the noise. An estimator whose aim is to reproduce $s(t)$ for all $t$ would be judged by the mean-square error over the whole waveform, and the triangle is a poor reproduction of the rectangle. The two criteria — SNR at one instant, and MSE over time — lead to different filters.
:::
:::

::: exercise Matched filtering in coloured noise {level=3}
Derive [[#eq-coloured]]. Then apply it to a pulse with spectrum $S(f)$ in noise $S_N(f) = \frac{N_0}{2}\bigl(1 + (f/f_1)^2\bigr)$ (white noise plus a rising high-frequency component). Explain qualitatively how the optimal filter differs from the white-noise matched filter.
::: hint
Write the numerator of [[#eq-snr]] as $\bigl\lvert\int\bigl(H\sqrt{S_N}\bigr)\bigl(Se^{j2\pi fT_0}/\sqrt{S_N}\bigr)\dd f\bigr\rvert^2$ and the denominator as $\int\abs{H}^2S_N\,\dd f$.
:::
::: solution
With coloured noise the output noise variance is $\int\abs H^2S_N\,\dd f$. Cauchy–Schwarz gives

$$
\Bigl\lvert\int H\sqrt{S_N}\cdot\frac{Se^{j2\pi fT_0}}{\sqrt{S_N}}\,\dd f\Bigr\rvert^2 \le \int\abs H^2S_N\,\dd f\int\frac{\abs S^2}{S_N}\,\dd f,
$$

so $\mathrm{SNR}\le\int\abs S^2/S_N\,\dd f$, with equality when $H\sqrt{S_N}\propto S^*e^{-j2\pi fT_0}/\sqrt{S_N}$, i.e. $H\propto S^*e^{-j2\pi fT_0}/S_N$. For the given noise, $H\propto S^*e^{-j2\pi fT_0}/(1 + (f/f_1)^2)$: the white-noise matched filter followed by an extra single-pole-like roll-off above $f_1$, de-emphasising the frequencies where the noise is strong. If the pulse has most of its energy below $f_1$ the loss from using the plain matched filter is small; if it relies on high frequencies, the coloured-noise filter is substantially better.
:::
:::

::: exercise The RC filter optimum {level=3}
Show that the function $g(x) = 2(1 - e^{-x})^2/x$ of [[#ex-rc-mismatch]] is maximised where $2x = e^x - 1$, and verify that $x = 1.2564$ satisfies this to four figures. What value of $RC$ would you choose for a $1\,\mu\mathrm{s}$ pulse, and what $3\,\mathrm{dB}$ bandwidth does this correspond to?
::: solution
$g'(x) = \frac{2}{x^2}\bigl[2x(1 - e^{-x})e^{-x} - (1 - e^{-x})^2\bigr]$. Setting the bracket to zero and dividing by $(1 - e^{-x})e^{-x}$: $2x = (1 - e^{-x})e^{x} = e^x - 1$. At $x = 1.2564$, $e^x - 1 = 2.5128$ and $2x = 2.5128$. So $RC = T/1.2564 = 0.796\,\mu\mathrm{s}$ and $f_c = 1/(2\pi RC) = 200\,\mathrm{kHz}$, about $0.2/T$. The noise bandwidth is $\frac\pi2f_c = 0.31/T$.
:::
:::

::: exercise A two-tap Wiener filter by hand {level=3}
For the signal and noise of [[#ex-fir-wiener]], set up and solve the normal equations for $L = 2$, and find the MMSE. Check that it lies between the $L = 1$ and $L = 3$ values.
::: solution
$\begin{bmatrix}6.263 & 4.737\\4.737 & 6.263\end{bmatrix}\mathbf h = \begin{bmatrix}5.263\\4.737\end{bmatrix}$. The determinant is $6.263^2 - 4.737^2 = 16.80$, so $h_0 = (5.263\times6.263 - 4.737\times4.737)/16.80 = 0.627$ and $h_1 = (6.263\times4.737 - 4.737\times5.263)/16.80 = 0.282$. The MMSE is $5.263 - (0.627\times5.263 + 0.282\times4.737) = 0.627$, between $0.840$ ($L = 1$) and $0.601$ ($L = 3$). (Interestingly, for this problem $h_0$ equals the MMSE, a consequence of the white observation noise of unit variance: the orthogonality condition at $i = 0$ gives $R_S[0] - \mathbf h\T\mathbf r_{SX} = h_0\sigma_N^2$.)
:::
:::
