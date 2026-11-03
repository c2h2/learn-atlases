Listen to a medium-wave AM station at night and then to an FM station of similar strength: the AM programme sits on a bed of hiss and crackle, the FM programme is clean. Yet drive away from the FM transmitter and the FM signal does not fade gracefully. It stays quiet for a long way and then, quite suddenly, dissolves into bursts of clicks and noise. Both behaviours — the large noise advantage of wideband FM and its abrupt collapse below a **threshold** — follow from a short calculation of how each demodulator transforms the noise that arrives with the signal.

This lesson computes the output **signal-to-noise ratio** (SNR) of every analog receiver in [[communication-systems/amplitude-modulation]] and [[communication-systems/angle-modulation]] under a common set of assumptions, so that they can be compared fairly. The tool is the representation of bandpass noise by in-phase and quadrature components, derived in [[random-signals/gaussian-noise]]. The answers fit in one table: DSB-SC and SSB match an ideal baseband system, conventional AM is at least $4.8\,\mathrm{dB}$ worse, and FM is better by a factor proportional to the square of its deviation ratio — the bandwidth-for-noise exchange that Armstrong discovered — provided the received signal is above threshold. Pre-emphasis then gains another $10$ to $13\,\mathrm{dB}$ for broadcast audio almost for free.

## A fair comparison {#sec-model}

Every receiver in this lesson has the same structure. The received signal $s(t)$, of power $P_R$, arrives with additive white Gaussian noise $w(t)$ of two-sided power spectral density $N_0/2$ (the AWGN channel of [[communication-systems/signals-spectra-channels#def-awgn]]). A **pre-detection band-pass filter**, ideal with bandwidth $B_T$ centred on $f_c$, passes the signal undistorted and removes noise outside the signal band. The **demodulator** follows, and then a **post-detection low-pass filter** of bandwidth $W$, which passes the message and removes everything else.

To compare modulations that use different bandwidths and powers we need a common yardstick. The natural one is the SNR that a **baseband system** would achieve if it simply sent the message with the same received power $P_R$ through a low-pass channel of bandwidth $W$:

::: definition Reference SNR and figure of merit {#def-gamma}
The **reference SNR** of a receiver with received signal power $P_R$, noise density $N_0$ and message bandwidth $W$ is

$$
\gamma = \frac{P_R}{N_0W} .
$$ {#eq-gamma}

The **output SNR** is $\mathrm{SNR}_o = \overline{(\text{message part of output})^2}/\overline{(\text{noise part of output})^2}$, and the **figure of merit** of a modulation is $\mathrm{SNR}_o/\gamma$. The **pre-detection** or **carrier-to-noise ratio** is $\mathrm{CNR} = P_R/(N_0B_T)$, the SNR at the demodulator input.
:::

A figure of merit of $1$ means the modulation does as well as sending the message directly. All comparisons are made at the same $\gamma$, that is, at the same received power and noise density.

### Bandpass noise

The noise after the pre-detection filter is a bandpass Gaussian process. Like any bandpass signal, it can be written with a complex envelope.

::: theorem In-phase and quadrature noise components {#thm-bandpass-noise}
Let $n(t)$ be white Gaussian noise of density $N_0/2$ passed through an ideal band-pass filter of bandwidth $B_T$ centred on $f_c$. Then

$$
n(t) = n_I(t)\cos(2\pi f_ct) - n_Q(t)\sin(2\pi f_ct),
$$ {#eq-bp-noise}

where $n_I$ and $n_Q$ are zero-mean, jointly Gaussian, low-pass processes, each with power spectral density $N_0$ for $\lvert f\rvert < B_T/2$ and $0$ outside, and they are independent of each other (uncorrelated at equal times, and at all lags when the band is symmetric about $f_c$). All three processes have the same power, $\overline{n^2} = \overline{n_I^2} = \overline{n_Q^2} = N_0B_T$. In polar form, $n = r_n(t)\cos(2\pi f_ct + \psi_n(t))$ with **Rayleigh**-distributed envelope $r_n$ and uniformly distributed phase $\psi_n$.
:::

::: proof {collapsed}
The full derivation is in [[random-signals/gaussian-noise]]; here is the spectral bookkeeping. The noise has power $\frac{N_0}{2}\cdot2B_T = N_0B_T$. Its complex envelope $\tilde n = n_I + jn_Q$ has spectrum obtained by doubling and shifting the positive-frequency part ([[communication-systems/signals-spectra-channels#thm-bandpass-spectrum]]), so its power spectral density is $4\cdot\frac{N_0}{2} = 2N_0$ on $\lvert f\rvert < B_T/2$. The real part of a complex process has power spectral density $\tfrac14[S_{\tilde n}(f) + S_{\tilde n}(-f)]$ when the real and imaginary parts are uncorrelated, giving $S_{n_I}(f) = \tfrac14(2N_0 + 2N_0) = N_0$ for a symmetric band, and the same for $n_Q$. Each has power $N_0B_T$. Gaussianity is preserved because $n_I$ and $n_Q$ are obtained from $n$ by linear operations (mixing and low-pass filtering). The envelope $r_n = \sqrt{n_I^2 + n_Q^2}$ of two independent zero-mean Gaussians of equal variance is Rayleigh, and the angle is uniform, as shown in [[random-signals/probability-for-engineers]].
:::

The theorem formalises an intuition: narrowband noise looks like a carrier whose amplitude and phase wander randomly at a rate comparable with the bandwidth. A coherent detector sees only one of its components, an envelope detector sees its envelope, and an FM detector sees the rate of change of its phase.

## Linear modulations {#sec-linear}

### DSB-SC with coherent detection

The received DSB-SC signal is $s(t) = A_cm(t)\cos(2\pi f_ct)$, with power $P_R = \tfrac12A_c^2P_m$ and bandwidth $B_T = 2W$. After the band-pass filter,

$$
r(t) = \big[A_cm(t) + n_I(t)\big]\cos(2\pi f_ct) - n_Q(t)\sin(2\pi f_ct) .
$$

Multiplying by $2\cos(2\pi f_ct)$ and low-pass filtering (as in [[communication-systems/amplitude-modulation#thm-coherent]]) gives $y(t) = A_cm(t) + n_I(t)$. The quadrature noise is rejected completely. The message power is $A_c^2P_m$, and the noise power is that of $n_I$ in $\lvert f\rvert < W$, which is $N_0\cdot2W$. Therefore

$$
\mathrm{SNR}_o^{DSB} = \frac{A_c^2P_m}{2N_0W} = \frac{P_R}{N_0W} = \gamma .
$$ {#eq-snr-dsb}

The figure of merit is $1$. Note what has happened: the *pre-detection* SNR is $P_R/(2N_0W) = \gamma/2$, and coherent detection doubles it. The two sidebands add coherently (amplitudes add, so power quadruples), whereas the noise in the two sidebands is independent (powers add, so it only doubles).

### SSB with coherent detection

The SSB signal $\tfrac{A_c}{2}[m\cos(2\pi f_ct) \mp \hat m\sin(2\pi f_ct)]$ has power $P_R = \tfrac14A_c^2P_m$ (an exercise in [[communication-systems/amplitude-modulation]]) and occupies a band of width $W$ on one side of the carrier. Coherent detection gives $y = \tfrac{A_c}{2}m(t) + n_I(t)$, where now $n_I$ is the in-phase component of noise in an *asymmetric* band $f_c < \lvert f\rvert < f_c + W$. Its complex envelope has density $2N_0$ on $0 < f < W$ only, so $S_{n_I}(f) = \tfrac14[S_{\tilde n}(f) + S_{\tilde n}(-f)] = \tfrac12N_0$ for $\lvert f\rvert < W$, and its power is $N_0W$. Hence

$$
\mathrm{SNR}_o^{SSB} = \frac{\tfrac14A_c^2P_m}{N_0W} = \frac{P_R}{N_0W} = \gamma .
$$ {#eq-snr-ssb}

SSB and DSB-SC have identical noise performance for the same received power. SSB's advantage is bandwidth, not SNR: half the spectrum for the same quality.

### Conventional AM with envelope detection

The AM signal $A_c[1 + \mu m_n(t)]\cos(2\pi f_ct)$ has power $P_R = \tfrac12A_c^2(1 + \mu^2P_{m_n})$. With noise, the received signal is

$$
r(t) = \big[A_c(1 + \mu m_n) + n_I\big]\cos(2\pi f_ct) - n_Q\sin(2\pi f_ct),
$$

whose envelope is

$$
e(t) = \sqrt{\big[A_c(1 + \mu m_n) + n_I\big]^2 + n_Q^2} .
$$ {#eq-am-envelope}

When the carrier is much larger than the noise (**high CNR**), the in-phase term dominates and $e(t) \approx A_c(1 + \mu m_n) + n_I$: the quadrature noise only rotates the resultant slightly, to first order without changing its length. After removing the DC term, the output is $A_c\mu m_n(t) + n_I(t)$, with message power $A_c^2\mu^2P_{m_n}$ and noise power $2N_0W$.

::: theorem Output SNR of AM with envelope detection {#thm-am-snr}
At high carrier-to-noise ratio,

$$
\mathrm{SNR}_o^{AM} = \frac{A_c^2\mu^2P_{m_n}}{2N_0W} = \frac{\mu^2P_{m_n}}{1 + \mu^2P_{m_n}}\,\gamma = \eta\,\gamma ,
$$ {#eq-snr-am}

where $\eta$ is the power efficiency of [[communication-systems/amplitude-modulation#thm-am-power]]. For tone modulation at $\mu = 1$, $\eta = 1/3$, so AM is at least $4.8\,\mathrm{dB}$ worse than DSB-SC; for typical speech it is $10\,\mathrm{dB}$ or more worse.
:::

::: proof
The approximation $e \approx A_c(1 + \mu m_n) + n_I$ gives the stated message and noise powers. Dividing by $\gamma = P_R/(N_0W) = A_c^2(1 + \mu^2P_{m_n})/(2N_0W)$ gives the figure of merit $\eta$. The approximation is justified by expanding [[#eq-am-envelope]]: writing $a = A_c(1 + \mu m_n) + n_I$, $e = a\sqrt{1 + n_Q^2/a^2} \approx a + n_Q^2/(2a)$, and the correction is second order in the noise, negligible when $a \gg \lvert n_Q\rvert$ with high probability.
:::

The loss is entirely due to the carrier: the detector's noise is the same as DSB-SC's, but two-thirds or more of the received power is in a carrier that carries no message. Coherent detection of AM gives exactly the same result; it is not the detector but the carrier that costs the power.

::: warning The AM threshold
The approximation fails when the noise envelope is comparable with the carrier. Then $e \approx r_n(t) + A_c(1 + \mu m_n)\cos\psi_n(t)$: the message is multiplied by the random $\cos\psi_n$ and is no longer present as an additive term at all. Below this **threshold** (roughly a CNR of $10\,\mathrm{dB}$ for $\mu$ near $1$) the output SNR falls much faster than the input, and the message is "mutilated" rather than merely noisy. Coherent detectors have no threshold, because $y = A_cm + n_I$ holds at any SNR. Do not apply [[#eq-snr-am]] at low CNR.
:::

::: example Comparing linear modulations on one link {#ex-linear-compare}
A receiver with a noise figure of $6\,\mathrm{dB}$ (so $N_0 = -174 + 6 = -168\,\mathrm{dBm/Hz}$) receives $-100\,\mathrm{dBm}$. The message bandwidth is $W = 5\,\mathrm{kHz}$. Find $\gamma$, and the output SNR for DSB-SC, SSB, AM with a full-scale tone ($\mu = 1$), and AM carrying speech with $\mu = 1$ and $P_{m_n} = 0.1$.
::: solution
$10\log_{10}(5000) = 37.0\,\mathrm{dB}$, so $\gamma = -100 - (-168) - 37.0 = 31.0\,\mathrm{dB}$.

DSB-SC and SSB: $\mathrm{SNR}_o = \gamma = 31.0\,\mathrm{dB}$.

AM, tone: $\eta = 1/3$, $-4.77\,\mathrm{dB}$, so $\mathrm{SNR}_o = 26.2\,\mathrm{dB}$.

AM, speech: $\eta = 0.1/1.1 = 0.0909$, $-10.4\,\mathrm{dB}$, so $\mathrm{SNR}_o = 20.6\,\mathrm{dB}$.

The pre-detection CNR for AM is $P_R/(N_0\cdot2W) = 31.0 - 3.0 = 28.0\,\mathrm{dB}$, well above threshold, so the formulas apply. To give speech the same $31\,\mathrm{dB}$ with AM, the transmitter would need $10.4\,\mathrm{dB}$ — eleven times — more power than with SSB, and twice the bandwidth.
:::
:::

## Noise in FM {#sec-fm}

FM is nonlinear, and so is its noise analysis. The received signal is $s(t) = A_c\cos(2\pi f_ct + \phi(t))$ with $\phi = 2\pi k_f\int m$; its power is $P_R = \tfrac12A_c^2$ whatever the message, and the pre-detection filter has the Carson bandwidth $B_T$. The ideal FM demodulator — limiter and discriminator — produces the instantaneous frequency deviation of the received signal, $\frac{1}{2\pi}\frac{\dd\theta}{\dd t}$ in hertz, where $\theta(t)$ is the phase of the signal-plus-noise.

Add noise in the form of [[#eq-bp-noise]]. The resultant is a phasor sum: the signal phasor of length $A_c$ at angle $\phi(t)$, plus a noise phasor of length $r_n$ at angle $\psi_n$. At high CNR, $r_n \ll A_c$ most of the time, and the noise phasor perturbs the angle of the resultant by approximately its component perpendicular to the signal divided by the signal length:

$$
\theta(t) \approx \phi(t) + \frac{r_n(t)}{A_c}\sin\big(\psi_n(t) - \phi(t)\big) .
$$ {#eq-fm-phase-noise}

The term $r_n\sin(\psi_n - \phi)$ is the quadrature component of the noise *relative to the signal's own phase*. Because $\psi_n$ is uniform and independent of $\phi$, its statistics, measured over the message band, are those of $n_Q(t)$ (the standard simplification, which can be justified carefully but which we accept here): $\theta \approx \phi + n_Q/A_c$.

::: theorem Output noise spectrum of an FM discriminator {#thm-fm-noise}
At high carrier-to-noise ratio, the noise at the output of an ideal FM discriminator (output in hertz) has power spectral density

$$
S_{n_o}(f) = \frac{N_0}{A_c^2}\,f^2, \qquad \lvert f\rvert < \frac{B_T}{2} ,
$$ {#eq-fm-noise}

rising parabolically with frequency. After the post-detection filter, the noise power is $\displaystyle\int_{-W}^{W}\frac{N_0f^2}{A_c^2}\dd f = \frac{2N_0W^3}{3A_c^2}$.
:::

::: proof
The output is $\frac{1}{2\pi}\frac{\dd\theta}{\dd t} = k_fm(t) + \frac{1}{2\pi A_c}\frac{\dd n_Q}{\dd t}$. Differentiation is an LTI system with frequency response $j2\pi f$, so the noise term has spectral density $\left\lvert\frac{j2\pi f}{2\pi A_c}\right\rvert^2S_{n_Q}(f) = \frac{f^2}{A_c^2}N_0$ for $\lvert f\rvert < B_T/2$, using [[#thm-bandpass-noise]] and the rule for spectra of filtered random processes in [[random-signals/random-signals-lti]]. Integrating over $\lvert f\rvert < W$ gives the noise power.
:::

Two facts are hidden in this result. The noise power falls as $1/A_c^2$: a stronger carrier is perturbed less in phase — **noise quieting**, which AM never shows, because there the noise adds to the envelope whatever the carrier. And the noise is concentrated at the high end of the message band, which pre-emphasis will exploit.

::: theorem Output SNR of FM {#thm-fm-snr}
Above threshold, an FM receiver with peak deviation $\Delta f$ and message $m$ with power $P_m$ and peak $m_p = \max\lvert m\rvert$ achieves

$$
\mathrm{SNR}_o^{FM} = \frac{3k_f^2P_m}{W^2}\,\gamma = 3D^2\,\frac{P_m}{m_p^2}\,\gamma, \qquad D = \frac{\Delta f}{W} .
$$ {#eq-snr-fm}

For tone modulation, $P_m/m_p^2 = \tfrac12$ and $D = \beta$, so $\mathrm{SNR}_o^{FM} = \tfrac32\beta^2\gamma$.
:::

::: proof
The message part of the output, $k_fm(t)$, has power $k_f^2P_m$. Dividing by the noise power of [[#thm-fm-noise]]:

$$
\mathrm{SNR}_o = \frac{k_f^2P_m}{2N_0W^3/(3A_c^2)} = \frac{3k_f^2P_m}{W^2}\cdot\frac{A_c^2/2}{N_0W} = \frac{3k_f^2P_m}{W^2}\,\gamma ,
$$

since $P_R = A_c^2/2$. Writing $k_f = \Delta f/m_p$ gives the second form.
:::

The figure of merit grows as the *square* of the deviation ratio, and since Carson's bandwidth $B_T = 2(D + 1)W$ grows linearly with $D$, the output SNR grows roughly as the square of the transmission bandwidth. This is the **bandwidth–SNR exchange** of wideband FM. Broadcast FM, with $\beta = 5$, has a figure of merit of $\tfrac32\cdot25 = 37.5$, or $15.7\,\mathrm{dB}$, before pre-emphasis.

Phase modulation can be treated the same way: the output is $\theta$ itself, so the noise $n_Q/A_c$ has the flat density $N_0/A_c^2$, and $\mathrm{SNR}_o^{PM} = k_p^2P_m\gamma$, or $\tfrac12\beta^2\gamma$ for a tone. For a tone at the top of the message band ($f_m = W$) the two have the same index and bandwidth, and FM is three times ($4.8\,\mathrm{dB}$) better: the parabolic FM noise density, averaged over $\lvert f\rvert < W$, is one third of its value at the band edge, whereas the flat PM noise is at the band-edge level everywhere. Pre-emphasis blurs the distinction (see the exercises).

::: quiz
The peak deviation of an FM system is doubled while the received power and message are unchanged, and the receiver stays above threshold. By how much does the output SNR change?
- [ ] $+3\,\mathrm{dB}$
- [x] $+6\,\mathrm{dB}$
- [ ] $0\,\mathrm{dB}$, because the noise bandwidth doubles too
- [ ] $-3\,\mathrm{dB}$
::: solution
By [[#eq-snr-fm]], $\mathrm{SNR}_o \propto D^2$, so doubling $\Delta f$ multiplies the SNR by $4$: $+6\,\mathrm{dB}$. The wider pre-detection filter does admit more noise, but the post-detection filter still passes only $\lvert f\rvert < W$, where the output noise density $N_0f^2/A_c^2$ is unchanged; meanwhile the message output $k_fm$ has doubled in amplitude. The price is a wider channel and a higher threshold.
:::
:::

::: example Choosing the deviation for a speech link {#ex-fm-design}
An FM link carries speech with $W = 3.4\,\mathrm{kHz}$ and $P_m/m_p^2 = 0.1$ (a peak-to-average power ratio of $10\,\mathrm{dB}$). At the edge of coverage $\gamma = 25\,\mathrm{dB}$, and the output SNR must be at least $40\,\mathrm{dB}$ without pre-emphasis. Find the required deviation ratio and peak deviation, the Carson bandwidth, and check that the receiver is above threshold.
::: solution
By [[#eq-snr-fm]], we need $3D^2\cdot0.1\cdot\gamma \ge 10^{4}$ with $\gamma = 10^{2.5} = 316.2$, so $D^2 \ge 10^{1.5}/0.3 = 105.4$ and $D \ge 10.27$. The peak deviation is $\Delta f = DW = 10.27\times3.4\,\mathrm{kHz} = 34.9\,\mathrm{kHz}$, and Carson's bandwidth is $B_T = 2(34.9 + 3.4) = 76.6\,\mathrm{kHz}$.

Threshold check with [[#eq-threshold]]: $\gamma_{\mathrm{th}} = 10\cdot B_T/W = 10\times76.6/3.4 = 225$, i.e. $23.5\,\mathrm{dB}$. The link at $\gamma = 25\,\mathrm{dB}$ is $1.5\,\mathrm{dB}$ above threshold: the design works, but with little margin against fading. Asking for a few decibels more output SNR by raising $D$ further would push $\gamma_{\mathrm{th}}$ above $25\,\mathrm{dB}$ and the link over the edge; pre-emphasis is the better way to gain them.
:::
:::

## The FM threshold {#sec-threshold}

The derivation of [[#eq-fm-phase-noise]] assumed that the noise phasor is small compared with the carrier. Occasionally, though, the noise envelope $r_n$ exceeds $A_c$. When it does, the resultant can swing *around the origin*: the phase $\theta$ gains or loses a full $2\pi$ in a short time. The discriminator output, proportional to $\dd\theta/\dd t$, contains a spike of area $\pm1$ (in hertz-seconds) — heard as a **click**. Clicks are rare at high CNR, because the Rayleigh probability that $r_n$ exceeds $A_c$, $\Prob(r_n > A_c) = e^{-A_c^2/(2N_0B_T)} = e^{-\mathrm{CNR}}$, is tiny. As the CNR falls they multiply rapidly, their power soon exceeds the "smooth" noise of [[#thm-fm-noise]], and the output SNR collapses.

::: definition FM threshold {#def-threshold}
The **FM threshold** is the carrier-to-noise ratio, $\mathrm{CNR} = A_c^2/(2N_0B_T)$, below which click noise makes the output SNR fall significantly below [[#eq-snr-fm]]. For a conventional limiter–discriminator receiver it is about

$$
\mathrm{CNR}_{\mathrm{th}} \approx 10\ (10\,\mathrm{dB}),\qquad\text{equivalently}\qquad \gamma_{\mathrm{th}} = \mathrm{CNR}_{\mathrm{th}}\,\frac{B_T}{W} = 20(D + 1)
$$ {#eq-threshold}

using Carson's bandwidth.
:::

The threshold sets a limit on the bandwidth exchange. Raising $D$ improves the output SNR above threshold, but also raises $\gamma_{\mathrm{th}}$, because a wider pre-detection filter lets in more noise for the same carrier. A system with a given $\gamma$ can therefore use only so much deviation before it falls over the edge. Threshold-extension receivers — FM feedback demodulators and phase-locked loops with narrow noise bandwidths — lower the threshold by a few decibels, which was decisive for early satellite links.

::: widget plot
f: x; x + 10*log10(1/3); if(x > 10 + 10*log10(2*(b + 1)), x + 10*log10(1.5*b^2), -10)
x: 0, 50
y: 0, 70
sliders: b=5:1:15:0.5
labels: \text{DSB, SSB}; \text{AM}\ (\mu=1); \text{FM}\ (\beta)
caption: Output SNR (dB) against the reference SNR $\gamma$ (dB) for tone modulation. DSB-SC and SSB follow $\mathrm{SNR}_o = \gamma$; AM is $4.8\,\mathrm{dB}$ lower; FM is $10\log_{10}(1.5\beta^2)$ higher, but only above its threshold $\gamma_{\mathrm{th}} = 20(\beta + 1)$. Below threshold (where the green line drops off the plot) the formula fails and the real output collapses. Raise $\beta$: the FM line moves up, and its starting point moves to the right. For a weak signal, a smaller $\beta$ can be better.
:::

::: example An FM broadcast receiver at threshold {#ex-fm-threshold}
An FM broadcast receiver ($\beta = 5$ for a full-scale $15\,\mathrm{kHz}$ tone, $B_T = 180\,\mathrm{kHz}$) has a noise figure of $7\,\mathrm{dB}$. (a) Find the output SNR (no pre-emphasis) for a received power of $-90\,\mathrm{dBm}$. (b) Find the minimum received power for operation above threshold and the output SNR there. (c) Compare with DSB-SC at the same received power.
::: solution
$N_0 = -174 + 7 = -167\,\mathrm{dBm/Hz}$ and $10\log_{10}(15\,000) = 41.8\,\mathrm{dB}$.

(a) $\gamma = -90 + 167 - 41.8 = 35.2\,\mathrm{dB}$. Check the threshold: $\mathrm{CNR} = -90 + 167 - 10\log_{10}(180\,000) = 77 - 52.6 = 24.4\,\mathrm{dB}$, far above $10\,\mathrm{dB}$. Then $\mathrm{SNR}_o = 35.2 + 10\log_{10}(37.5) = 35.2 + 15.7 = 50.9\,\mathrm{dB}$.

(b) Threshold at $\mathrm{CNR} = 10\,\mathrm{dB}$: $P_{R,\mathrm{min}} = -167 + 52.6 + 10 = -104.4\,\mathrm{dBm}$. Then $\gamma_{\mathrm{th}} = 10 + 10\log_{10}(180/15) = 10 + 10.8 = 20.8\,\mathrm{dB}$, in agreement with $20(\beta + 1) = 120$, and $\mathrm{SNR}_o = 20.8 + 15.7 = 36.5\,\mathrm{dB}$.

(c) DSB-SC at the same received powers gives only $\gamma$: $35.2\,\mathrm{dB}$ in case (a) and $20.8\,\mathrm{dB}$ at the threshold power. FM's advantage of $15.7\,\mathrm{dB}$ holds right down to $-104\,\mathrm{dBm}$; below that the FM output degrades rapidly, while DSB degrades only in proportion.
:::
:::

## Pre-emphasis and de-emphasis {#sec-preemphasis}

The output noise of FM rises as $f^2$, while the spectrum of speech and music falls at high frequencies: most of the noise lies where there is least signal. The remedy is to **pre-emphasise** the message before modulation — boost the high frequencies with a filter $H_p(f)$ — and **de-emphasise** after demodulation with $H_d(f) = 1/H_p(f)$. The message comes through unchanged, but the noise, which entered between the two filters, is attenuated at high frequencies by $H_d$.

The standard de-emphasis network is a first-order low-pass RC filter, $H_d(f) = 1/(1 + jf/f_1)$, with time constant $RC = 75\,\mathrm{\mu s}$ in the Americas and Korea ($f_1 = 2.12\,\mathrm{kHz}$) and $50\,\mathrm{\mu s}$ elsewhere ($f_1 = 3.18\,\mathrm{kHz}$). The pre-emphasis filter $1 + jf/f_1$ is approximately a differentiator above $f_1$: FM with pre-emphasis behaves like PM at high audio frequencies and like FM at low ones.

::: theorem Improvement from de-emphasis {#thm-deemphasis}
If pre-emphasis is applied without increasing the peak deviation, the output noise power of an FM receiver with de-emphasis $H_d(f) = 1/(1 + jf/f_1)$ is reduced by the factor

$$
I = \frac{\int_{-W}^{W}f^2\,\dd f}{\int_{-W}^{W}\dfrac{f^2}{1 + (f/f_1)^2}\,\dd f} = \frac{(W/f_1)^3}{3\big[W/f_1 - \arctan(W/f_1)\big]} .
$$ {#eq-deemphasis}
:::

::: proof
By [[#thm-fm-noise]] the noise density before de-emphasis is $N_0f^2/A_c^2$; after it, $N_0f^2/(A_c^2(1 + f^2/f_1^2))$. The numerator integral is $2W^3/3$. For the denominator, write $\dfrac{f^2}{1 + f^2/f_1^2} = f_1^2\left(1 - \dfrac{1}{1 + f^2/f_1^2}\right)$, whose integral from $-W$ to $W$ is $2f_1^2\left[W - f_1\arctan(W/f_1)\right]$. The ratio is $\dfrac{2W^3/3}{2f_1^3[W/f_1 - \arctan(W/f_1)]}$, which is [[#eq-deemphasis]]. The message is unaffected because $H_pH_d = 1$, and the assumption about deviation means $A_c$ and $k_f$ are unchanged.
:::

::: widget plot
f: x^2; x^2/(1 + (x/a)^2)
x: 0, 15
y: 0, 60
sliders: a=2.12:1:6:0.01
labels: S_{n_o}\ \text{without de-emphasis}; \text{with de-emphasis}
caption: Output noise spectral density of an FM receiver (arbitrary units) against audio frequency in kilohertz, without (blue) and with (orange) de-emphasis of corner frequency $f_1 = a$ kHz. The improvement factor is the ratio of the areas under the two curves up to $W = 15\,\mathrm{kHz}$. With $f_1 = 2.12\,\mathrm{kHz}$ ($75\,\mathrm{\mu s}$) the orange curve flattens to $f_1^2$ above $f_1$, and the area shrinks by a factor of about $21$. Raise $f_1$: less improvement, but less boost of the treble before transmission.
:::

::: example The value of pre-emphasis in broadcast FM {#ex-preemphasis}
Compute the improvement for $W = 15\,\mathrm{kHz}$ with $75\,\mathrm{\mu s}$ and with $50\,\mathrm{\mu s}$ de-emphasis, and the resulting figure of merit of broadcast FM ($\beta = 5$).
::: solution
For $75\,\mathrm{\mu s}$: $f_1 = 1/(2\pi\cdot75\times10^{-6}) = 2122\,\mathrm{Hz}$ and $W/f_1 = 7.07$. Then $\arctan(7.07) = 1.430$, so $I = 7.07^3/(3(7.07 - 1.430)) = 353.3/16.92 = 20.9$, i.e. $13.2\,\mathrm{dB}$.

For $50\,\mathrm{\mu s}$: $f_1 = 3183\,\mathrm{Hz}$, $W/f_1 = 4.71$, $\arctan(4.71) = 1.362$, and $I = 104.6/10.05 = 10.4$, i.e. $10.2\,\mathrm{dB}$.

With $75\,\mathrm{\mu s}$, the overall figure of merit becomes $15.7 + 13.2 = 28.9\,\mathrm{dB}$. The assumption that the peak deviation is unchanged is reasonable because programme material rarely has full-level content at the top of the audio band; heavily processed modern pop music does, and broadcasters must then limit the pre-emphasised high frequencies, which gives back part of the gain.
:::
:::

::: application Dolby, emphasis everywhere
The same idea — boost what the noise will hit, then cut it back — appears wherever noise is coloured. Vinyl records use the RIAA curve to keep surface noise and groove amplitude in check, analog tape used Dolby noise reduction (a level-dependent pre-emphasis), and high-speed serial links use transmitter pre-emphasis and receiver equalisation to compensate for cable loss that rises with frequency. FM stereo's difference channel, which sits at $23$–$53\,\mathrm{kHz}$ in the composite baseband where the parabolic noise is highest, is the reason stereo reception is noticeably noisier than mono at the same field strength: roughly $20\,\mathrm{dB}$ more noise.
:::

## Comparing analog systems {#sec-comparison}

| Modulation | Bandwidth $B_T$ | Figure of merit $\mathrm{SNR}_o/\gamma$ | Threshold |
|---|---|---|---|
| Baseband | $W$ | $1$ | none |
| DSB-SC, coherent | $2W$ | $1$ | none |
| SSB, coherent | $W$ | $1$ | none |
| AM, envelope | $2W$ | $\eta = \dfrac{\mu^2P_{m_n}}{1 + \mu^2P_{m_n}} \le \tfrac13$ (tone) | yes |
| PM | $2(\Delta f + W)$ | $k_p^2P_m$ ($\tfrac12\beta^2$, tone) | yes |
| FM | $2(\Delta f + W)$ | $3D^2P_m/m_p^2$ ($\tfrac32\beta^2$, tone) | yes, CNR $\approx 10\,\mathrm{dB}$ |

The linear modulations cannot beat the baseband figure of merit. Only by spending bandwidth — angle modulation in analog systems, coding in digital ones — can the output SNR be raised above $\gamma$. How far could an ideal system go? By [[communication-systems/signals-spectra-channels#thm-shannon]], a channel of bandwidth $B_T$ and SNR $P_R/(N_0B_T) = \gamma W/B_T$ carries $C = B_T\log_2(1 + \gamma W/B_T)$ bit/s, and a message of bandwidth $W$ reproduced with output SNR $\mathrm{SNR}_o$ needs at least $W\log_2(1 + \mathrm{SNR}_o)$ bit/s (the rate–distortion function of a Gaussian source, from [[information-theory]]). Equating gives the ideal exchange

$$
\mathrm{SNR}_o^{\mathrm{ideal}} = \left(1 + \frac{\gamma}{b}\right)^b - 1, \qquad b = \frac{B_T}{W} ,
$$ {#eq-ideal-exchange}

exponential in the bandwidth expansion $b$, compared with FM's quadratic. FM is a good use of bandwidth; digital systems with powerful codes are much better, which is one reason why broadcasting and mobile telephony went digital.

::: quiz
At a reference SNR $\gamma = 20\,\mathrm{dB}$, which tone-modulated system gives the highest output SNR?
- [ ] FM with $\beta = 10$
- [x] FM with $\beta = 5$
- [ ] SSB
- [ ] AM with $\mu = 1$
::: solution
SSB gives $20\,\mathrm{dB}$ and AM $15.2\,\mathrm{dB}$. FM with $\beta = 5$ needs $\gamma_{\mathrm{th}} = 20\cdot6 = 120$ ($20.8\,\mathrm{dB}$), so at $20\,\mathrm{dB}$ it is just below threshold and somewhat degraded, but still far ahead: the formula would give $35.7\,\mathrm{dB}$ and the true value is only a few decibels less. FM with $\beta = 10$ has $\gamma_{\mathrm{th}} = 220$ ($23.4\,\mathrm{dB}$): at $20\,\mathrm{dB}$ it is $3.4\,\mathrm{dB}$ below threshold, deep in the click region, and its output collapses. More deviation is not always better.
:::
:::

## Where this leads

The method of this lesson — express the receiver's output as message plus a transformed noise process, then integrate the noise spectrum over the message band — is the same for digital receivers, except that the output is sampled and compared with a threshold, and the measure of quality becomes the probability of error ([[communication-systems/optimal-detection]]). The Rayleigh envelope of bandpass noise reappears as the Rayleigh fading of wireless channels in [[communication-systems/wireless-communication]]. Quantisation noise, a different kind of noise that the transmitter itself creates, is analysed in [[communication-systems/pulse-code-modulation]], where the PCM exchange of bandwidth for SNR turns out to be exponential, like the ideal [[#eq-ideal-exchange]].

::: history
Edwin Armstrong's 1936 paper reported field tests in which wideband FM gave signal-to-noise improvements far beyond what Carson's analysis had suggested, and he explained them qualitatively as the effect of the wider deviation. The quantitative theory came in the late 1930s and 1940s: Murray Crosby (1937) and others derived the parabolic noise spectrum and the $3\beta^2$ improvement, and Stephen O. Rice's monumental "Mathematical analysis of random noise" (Bell System Technical Journal, 1944–45) provided the statistics of bandpass noise used in [[#thm-bandpass-noise]]. Rice returned to FM in 1963 with his analysis of clicks, which explained the threshold quantitatively. The $75\,\mathrm{\mu s}$ pre-emphasis standard was adopted with US FM broadcasting in the 1940s; Europe chose $50\,\mathrm{\mu s}$.
:::

::: summary
- Compare receivers at the same reference SNR $\gamma = P_R/(N_0W)$; the figure of merit is $\mathrm{SNR}_o/\gamma$.
- Bandpass noise is $n_I\cos - n_Q\sin$ with independent low-pass Gaussian components, each of density $N_0$ in the band and power $N_0B_T$; its envelope is Rayleigh.
- DSB-SC and SSB with coherent detection achieve $\mathrm{SNR}_o = \gamma$, as good as baseband; coherent detectors have no threshold.
- AM with envelope detection achieves $\eta\gamma$ ($\le \gamma/3$ for a tone) above its threshold, because the carrier carries most of the power.
- An FM discriminator's output noise density is $N_0f^2/A_c^2$; above threshold $\mathrm{SNR}_o = 3D^2(P_m/m_p^2)\gamma$, or $\tfrac32\beta^2\gamma$ for a tone.
- The FM threshold (CNR $\approx 10\,\mathrm{dB}$, $\gamma_{\mathrm{th}} \approx 20(D + 1)$) limits how much bandwidth can usefully be traded for SNR.
- De-emphasis ($75$ or $50\,\mathrm{\mu s}$) removes the high-frequency part of FM noise, gaining about $13$ or $10\,\mathrm{dB}$ for $15\,\mathrm{kHz}$ audio.
:::

## Exercises

::: exercise The reference SNR {level=1 check="-95+174-10*log10(4000)"}
A receiver at $T = 290\,\mathrm{K}$ (noise figure $0\,\mathrm{dB}$) receives $-95\,\mathrm{dBm}$. The message bandwidth is $4\,\mathrm{kHz}$. Find $\gamma$ in decibels.
::: solution
$\gamma = -95 - (-174) - 10\log_{10}4000 = 79 - 36.0 = 43.0\,\mathrm{dB}$.
:::
:::

::: exercise AM efficiency loss {level=1 check="10*log10(0.7^2*0.5/(1+0.7^2*0.5))"}
A tone-modulated AM signal with $\mu = 0.7$ is envelope-detected above threshold. Find the figure of merit in decibels.
::: solution
$\eta = \mu^2/(2 + \mu^2) = 0.49/2.49 = 0.197$, i.e. $-7.06\,\mathrm{dB}$.
:::
:::

::: exercise FM figure of merit {level=1 check="10*log10(1.5*4)"}
Find the figure of merit, in decibels, of tone-modulated FM with $\beta = 2$ above threshold (no pre-emphasis).
::: solution
$\tfrac32\beta^2 = 6$, i.e. $7.8\,\mathrm{dB}$.
:::
:::

::: exercise SSB versus DSB {level=2}
A DSB-SC and an SSB transmitter each deliver the same received power $P_R$ for the same message. Show directly (without quoting the results above) that the coherent receivers give the same output SNR, by computing message and noise powers for both. Why might you nevertheless prefer DSB-SC on a channel with a frequency offset?
::: solution
DSB: output $A_cm + n_I$ with $P_R = \tfrac12A_c^2P_m$; message power $A_c^2P_m = 2P_R$; noise $2N_0W$; SNR $= P_R/(N_0W)$. SSB: $P_R = \tfrac14A_c'^2P_m$; output $\tfrac{A_c'}{2}m + n_I$, message power $\tfrac14A_c'^2P_m = P_R$; noise $N_0W$ (density $N_0/2$ over $\lvert f\rvert < W$); SNR $= P_R/(N_0W)$. Equal. DSB can have its carrier recovered by squaring or a Costas loop, so frequency offsets are tracked; SSB carries no carrier information at all and an offset shifts the message spectrum, which is fine for speech but not for signals with precise frequency content.
:::
:::

::: exercise The AM threshold {level=2}
For the AM envelope of [[#eq-am-envelope]], explain why, when $r_n \gg A_c$, the output contains the term $A_c\mu m_n(t)\cos\psi_n(t)$ rather than $A_c\mu m_n(t)$. Estimate the probability that the noise envelope exceeds the unmodulated carrier when the CNR $A_c^2/(2N_0B_T)$ is $10\,\mathrm{dB}$ and $5\,\mathrm{dB}$.
::: solution
Write the received signal as noise phasor plus carrier phasor: when $r_n \gg A_c$, $e = \lvert r_ne^{j\psi_n} + A_c(1 + \mu m_n)\rvert \approx r_n + A_c(1 + \mu m_n)\cos\psi_n$ (the projection of the small phasor onto the large one). The message is multiplied by the random, rapidly varying $\cos\psi_n$, a multiplicative corruption no filter can undo. The Rayleigh envelope has $\Prob(r_n > A_c) = e^{-A_c^2/(2\sigma^2)}$ with $\sigma^2 = N_0B_T$, i.e. $e^{-\mathrm{CNR}}$. At $10\,\mathrm{dB}$: $e^{-10} = 4.5\times10^{-5}$. At $5\,\mathrm{dB}$ (CNR $3.16$): $e^{-3.16} = 0.042$ — the noise dominates about $4\,\%$ of the time, and the output is badly mutilated.
:::
:::

::: exercise A two-way radio link {level=2}
A narrowband FM radio uses $\Delta f = 2.5\,\mathrm{kHz}$, speech with $W = 3\,\mathrm{kHz}$ and $P_m/m_p^2 = 0.1$. (a) Find the Carson bandwidth, the figure of merit (no pre-emphasis), and $\gamma_{\mathrm{th}}$. (b) Find the minimum output SNR above threshold. (c) Compare with SSB at the same $\gamma$.
::: solution
(a) $B_T = 2(2.5 + 3) = 11\,\mathrm{kHz}$; $D = 0.833$; figure of merit $3D^2\cdot0.1 = 0.208$, i.e. $-6.8\,\mathrm{dB}$. $\gamma_{\mathrm{th}} = 10\cdot B_T/W = 36.7$ ($15.6\,\mathrm{dB}$).

(b) At threshold, $\mathrm{SNR}_o = 15.6 - 6.8 = 8.8\,\mathrm{dB}$.

(c) SSB at $\gamma = 15.6\,\mathrm{dB}$ gives $15.6\,\mathrm{dB}$. With such a small deviation ratio and a speech peak-to-mean ratio of $10\,\mathrm{dB}$, narrowband FM is worse than SSB in noise; it is used for its constant envelope (cheap efficient amplifiers), simple receivers and capture effect (rejection of weaker interferers), not its SNR. With pre-emphasis it does somewhat better.
:::
:::

::: exercise The ideal exchange {level=2}
For $\gamma = 20\,\mathrm{dB}$ and bandwidth expansion $b = B_T/W = 12$ (that of broadcast FM), compute the ideal output SNR from [[#eq-ideal-exchange]] and compare with FM ($\beta = 5$, no pre-emphasis). Repeat for $b = 2$, the expansion of DSB.
::: solution
$b = 12$: $(1 + 100/12)^{12} - 1 = 9.333^{12} - 1 = 4.37\times10^{11}$, i.e. $116.4\,\mathrm{dB}$. FM: $20 + 15.7 = 35.7\,\mathrm{dB}$ (and in fact $\gamma = 20\,\mathrm{dB}$ is just below its threshold). $b = 2$: $(1 + 50)^2 - 1 = 2600$, $34.1\,\mathrm{dB}$, compared with DSB's $20\,\mathrm{dB}$. The ideal system improves exponentially with bandwidth; analog FM's quadratic improvement uses only a small part of what bandwidth could buy.
:::
:::

::: exercise PM with pre-emphasis equals FM? {level=3}
Show that an FM system preceded by an ideal differentiator in the transmitter (and followed by an integrator in the receiver) is a PM system, and that its output noise density is flat. Then explain why FM with pre-emphasis $H_p(f) = 1 + jf/f_1$ behaves like FM below $f_1$ and like PM above, and find the output noise density with de-emphasis in each region.
::: hint
Track where the noise enters: after the discriminator, before the receiver's post-processing.
:::
::: solution
FM of $m'$ has phase $2\pi k_f\int m' = 2\pi k_fm$: PM with $k_p = 2\pi k_f$. The discriminator output noise density $N_0f^2/A_c^2$ passes through the receiver's integrator $1/(j2\pi f)$, giving $N_0/(4\pi^2A_c^2)$, flat, as for PM. With $H_p = 1 + jf/f_1$: for $f \ll f_1$, $H_p \approx 1$ (FM); for $f \gg f_1$, $H_p \approx jf/f_1$, a differentiator (PM, up to a scale). The de-emphasised noise density is $N_0f^2/(A_c^2(1 + f^2/f_1^2))$: approximately $N_0f^2/A_c^2$ (parabolic) below $f_1$ and approximately $N_0f_1^2/A_c^2$ (flat, like PM) above.
:::
:::

::: exercise Designing deviation for a given received power {level=3}
A tone-modulated FM link has $\gamma = 25\,\mathrm{dB}$ at the edge of coverage. Choose the largest integer $\beta$ that keeps the receiver at least $2\,\mathrm{dB}$ above threshold, and find the resulting output SNR and transmission bandwidth for $W = 10\,\mathrm{kHz}$. How much would a threshold-extension demodulator lowering $\mathrm{CNR}_{\mathrm{th}}$ to $7\,\mathrm{dB}$ improve the output SNR?
::: hint
Require $\gamma \ge \gamma_{\mathrm{th}} + 2\,\mathrm{dB}$ with $\gamma_{\mathrm{th}} = \mathrm{CNR}_{\mathrm{th}}\cdot2(\beta + 1)$.
:::
::: solution
We need $10\log_{10}(20(\beta + 1)) \le 23\,\mathrm{dB}$, i.e. $20(\beta + 1) \le 199.5$, $\beta + 1 \le 9.98$, so $\beta = 8$. Then $\mathrm{SNR}_o = 25 + 10\log_{10}(1.5\cdot64) = 25 + 19.8 = 44.8\,\mathrm{dB}$, and $B_T = 2(8 + 1)\cdot10 = 180\,\mathrm{kHz}$. With $\mathrm{CNR}_{\mathrm{th}} = 7\,\mathrm{dB}$ ($5.01$): $10\log_{10}(10.02(\beta + 1)) \le 23$ gives $\beta + 1 \le 19.9$, so $\beta = 18$, $\mathrm{SNR}_o = 25 + 10\log_{10}(1.5\cdot324) = 25 + 26.9 = 51.9\,\mathrm{dB}$ — $7\,\mathrm{dB}$ better, at the cost of $B_T = 380\,\mathrm{kHz}$.
:::
:::
