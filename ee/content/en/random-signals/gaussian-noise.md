The faintest signals engineers deal with — the carrier of a deep-space probe, the echo of a distant aircraft, a GPS signal arriving $20\,\mathrm{dB}$ below the noise — are received against a background of noise that has two remarkable properties. Its spectrum is flat over enormous bandwidths, and its amplitude follows the Gaussian law almost perfectly. Both properties have the same root: the noise is made of a vast number of tiny, independent events — the thermal jostling of electrons in a resistor, the arrival of individual electrons across a junction — and the central limit theorem turns their sum into a Gaussian process.

This chapter develops the model that underlies almost every calculation of system performance in electronics and communications: **white Gaussian noise**. We define Gaussian processes and show why they are so convenient (second-order statistics describe them completely, and linear filtering keeps them Gaussian). We derive the spectra of the two fundamental physical noises from the random-process theory of the previous chapters — thermal noise from the fluctuation–dissipation argument and shot noise from Campbell's theorem for filtered Poisson processes — and finish with **band-pass noise**, the form noise takes in every radio receiver, whose envelope and phase have the Rayleigh and uniform distributions met in [[random-signals/probability-for-engineers]]. The device-level noise models of diodes, transistors and amplifiers are in [[electronics-2/electronic-noise]]; here we concentrate on the processes themselves.

## Gaussian processes

::: definition Gaussian process {#def-gaussian-process}
A random process $X(t)$ is **Gaussian** if for every $n$ and every choice of times $t_1, \ldots, t_n$ the random vector $\bigl(X(t_1), \ldots, X(t_n)\bigr)$ is jointly Gaussian ([[random-signals/probability-for-engineers#def-gauss-vector]]). Its finite-dimensional distributions are then determined by the mean function $\mu_X(t)$ and the autocovariance $C_X(t_1, t_2)$.
:::

Two consequences make Gaussian processes the natural model for noise.

::: theorem Stationarity of Gaussian processes {#thm-gauss-sss}
A Gaussian process that is wide-sense stationary is strict-sense stationary.
:::

::: proof
If $X$ is WSS, the mean vector of $(X(t_1 + c), \ldots, X(t_n + c))$ is $(\mu_X, \ldots, \mu_X)$ and its covariance matrix has entries $C_X(t_i - t_k)$, both independent of the shift $c$. A jointly Gaussian distribution is fixed by its mean and covariance, so the shifted vector has the same distribution as the unshifted one, for every $n$ and every choice of times.
:::

::: theorem Linear filtering preserves Gaussianity {#thm-gauss-lti}
If a Gaussian process $X(t)$ is the input of a stable LTI system, the output $Y(t)$ is a Gaussian process, and $X$ and $Y$ are jointly Gaussian. If $X$ is WSS, $Y$ is a stationary Gaussian process with mean $H(0)\mu_X$ and spectrum $\abs{H(f)}^2S_X(f)$.
:::

::: proof
(Sketch.) Each $Y(t_i) = \int h(\alpha)X(t_i - \alpha)\,\dd\alpha$ is a limit of Riemann sums $\sum_mh(\alpha_m)X(t_i - \alpha_m)\Delta\alpha$, which are linear combinations of values of $X$. Any finite set of such sums is a linear transformation of a jointly Gaussian vector, hence jointly Gaussian by [[random-signals/probability-for-engineers#thm-linear-gauss]]. Mean-square limits of jointly Gaussian vectors are jointly Gaussian (their characteristic functions converge to Gaussian ones), so the outputs $Y(t_1), \ldots, Y(t_n)$ are jointly Gaussian, and so are mixed sets of input and output values. The mean and spectrum come from [[random-signals/random-signals-lti]], and stationarity in the strict sense from [[#thm-gauss-sss]].
:::

So for Gaussian noise the second-order theory of the last two chapters is the *whole* story: the output of any linear receiver is Gaussian, with a variance we can compute from $\abs H^2$, and every probability we want — of a false alarm, of a bit error — follows from the $Q$-function.

::: warning Non-Gaussian noise exists
The Gaussian model fails for noise that is not the sum of many small independent effects: impulsive interference from switching transients and ignition systems, the clipped output of an overloaded amplifier, the quantisation error of a slowly varying signal, crosstalk from a single strong neighbour, and the counting statistics of very weak optical signals (a few photons per bit, which are Poisson, not Gaussian). Error rates computed from $Q$-functions can be wildly optimistic for impulsive noise, whose tails are much heavier. A nonlinear device also destroys Gaussianity: the output of a rectifier or square-law detector fed with Gaussian noise is not Gaussian.
:::

## White Gaussian noise

::: definition White Gaussian noise {#def-wgn}
**White Gaussian noise** $W(t)$ of two-sided density $N_0/2$ is a zero-mean stationary Gaussian process with

$$
R_W(\tau) = \frac{N_0}{2}\delta(\tau), \qquad S_W(f) = \frac{N_0}{2}.
$$

It is to be understood through its effect on linear systems: for any finite-energy functions $\phi$ and $\psi$, the **correlator outputs** $Z_\phi = \int W(t)\phi(t)\,\dd t$ and $Z_\psi$ are jointly Gaussian with zero mean and

$$
\E[Z_\phi Z_\psi] = \frac{N_0}{2}\int_{-\infty}^{\infty}\phi(t)\psi(t)\,\dd t .
$$ {#eq-wgn-inner}
:::

White noise cannot exist as an ordinary function of time: its value at an instant would have infinite variance. But every physical observation of noise passes through a system of finite bandwidth, and then only integrals like $Z_\phi$ matter. Formula [[#eq-wgn-inner]] follows formally from $\E[Z_\phi Z_\psi] = \iint\phi(t)\psi(s)\frac{N_0}{2}\delta(t - s)\,\dd t\,\dd s$, and it is the definition that makes the model rigorous. It has a consequence that is the foundation of detection theory.

::: theorem Projections of white Gaussian noise {#thm-wgn-projections}
Let $\phi_1, \ldots, \phi_n$ be orthonormal functions, $\int\phi_i\phi_k\,\dd t = \delta_{ik}$. Then the coefficients $Z_k = \int W(t)\phi_k(t)\,\dd t$ of white Gaussian noise are independent $\Normal(0, N_0/2)$ random variables. In other words, white Gaussian noise has the same variance $N_0/2$ in every direction of signal space, and its components along orthogonal directions are independent.
:::

::: proof
By [[#eq-wgn-inner]], $\E[Z_iZ_k] = \frac{N_0}{2}\int\phi_i\phi_k = \frac{N_0}{2}\delta_{ik}$, so the $Z_k$ are uncorrelated with variance $N_0/2$. They are jointly Gaussian (as linear functionals of a Gaussian process), and uncorrelated jointly Gaussian variables are independent by [[random-signals/probability-for-engineers#thm-linear-gauss]].
:::

This is why a digital receiver can represent a transmitted waveform by a few coordinates — the outputs of correlators matched to orthonormal basis pulses — and treat the noise on each coordinate as an independent Gaussian with variance $N_0/2$. The matched filter of [[random-signals/optimal-filtering]] and the signal-space analysis of [[communication-systems/optimal-detection]] are built on this theorem.

::: example Noise at the output of a correlator {#ex-correlator}
A receiver multiplies its input by a rectangular pulse $p(t) = A$ for $0\le t < T$ and integrates. The input is white Gaussian noise with $N_0/2 = 10^{-12}\,\mathrm{V^2/Hz}$. Find the output variance for $A = 1$ and $T = 1\,\mu\mathrm{s}$, and the probability that the output magnitude exceeds $3\,\mathrm{nV\,s}$.
::: solution
By [[#eq-wgn-inner]] with $\phi = \psi = p$,

$$
\Var(Z) = \frac{N_0}{2}\int_0^TA^2\,\dd t = \frac{N_0}{2}A^2T = 10^{-12}\times10^{-6} = 10^{-18}\,\mathrm{V^2s^2},
$$

so $\sigma_Z = 10^{-9}\,\mathrm{V\,s} = 1\,\mathrm{nV\,s}$ (the output of an integrator has units of volt-seconds). $Z$ is Gaussian, so $\Prob(\abs Z > 3\sigma_Z) = 2Q(3) = 2.7\times10^{-3}$. Notice that the variance grows linearly with $T$, while a constant signal integrated over $T$ grows linearly in amplitude and quadratically in power: integrating longer improves the signal-to-noise ratio in proportion to $T$.
:::
:::

## Thermal noise

### The two-sided thermal noise density

A resistor in thermal equilibrium is a source of white Gaussian noise. The equipartition argument of [[electronics-2/electronic-noise]] fixes its density; we recast it in the language of this course.

::: theorem Thermal noise (Johnson–Nyquist) {#thm-thermal}
The open-circuit voltage of a resistor $R$ at absolute temperature $T$ is a zero-mean stationary Gaussian process with two-sided PSD

$$
S_v(f) = 2kTR \qquad (\text{one-sided } 4kTR),
$$ {#eq-thermal}

for $\abs f \ll kT/h$, where $k = 1.380649\times10^{-23}\,\mathrm{J/K}$ is Boltzmann's constant and $h$ is Planck's constant. The **available noise power**, delivered into a matched load, is $kT$ per hertz of (one-sided) bandwidth, independent of $R$.
:::

::: proof
Model the noisy resistor as a noiseless $R$ in series with a white source of two-sided density $S$, and connect it across a capacitor $C$. The capacitor voltage is the source filtered by an RC low-pass, so by [[random-signals/random-signals-lti#ex-rc]] its mean square is $S/(2RC)$. In thermal equilibrium the energy $\frac12Cv^2$ of the capacitor, a single quadratic degree of freedom, has mean $\frac12kT$ by the equipartition theorem of statistical mechanics, so $\E[v^2] = kT/C$. Equating, $S/(2RC) = kT/C$ and $S = 2kTR$. The noise is Gaussian because it is the sum of the effects of an enormous number of independent electron motions. For the available power: a source of open-circuit voltage $v$ and resistance $R$ delivers $\E[v^2]/(4R)$ into a matched load $R$; per hertz of one-sided bandwidth, $4kTR/(4R) = kT$.
:::

The flat spectrum cannot extend for ever, or the resistor would contain infinite energy. Nyquist's 1928 derivation, which treats the resistor as the termination of a transmission line in equilibrium, gives the exact one-sided available power density

$$
\frac{hf}{e^{hf/kT} - 1},
$$ {#eq-planck}

which equals $kT$ for $hf \ll kT$ and falls exponentially above $kT/h$, a frequency of $6.25\,\mathrm{THz}$ at $300\,\mathrm{K}$. (Strictly, quantum theory adds a zero-point term $hf/2$, which matters only for amplifiers working near the quantum limit.) At $1\,\mathrm{THz}$ the factor is still $0.92$; at $6\,\mathrm{THz}$ it is $0.60$. For every circuit below the far infrared, thermal noise is white.

::: widget plot
f: x/(exp(x) - 1); 1 + 0*x
x: 0.01, 8
y: 0, 1.1
labels: \text{Planck factor } \frac{hf/kT}{e^{hf/kT}-1}; \text{white approximation}
caption: The ratio of the true thermal noise density to $kT$ as a function of $x = hf/kT$. At room temperature $x = 1$ corresponds to $6.25\,\mathrm{THz}$; the white-noise model is accurate to $1\,\%$ up to about $x = 0.02$, which is $125\,\mathrm{GHz}$ at $300\,\mathrm{K}$ but only $1.7\,\mathrm{GHz}$ at the $4\,\mathrm{K}$ of a cryogenic quantum-computing amplifier. Hover to read the factor at other frequencies.
:::

The numbers worth remembering follow at once. At the standard temperature $T_0 = 290\,\mathrm{K}$, $kT_0 = 4.00\times10^{-21}\,\mathrm{W/Hz}$, or $-174.0\,\mathrm{dBm/Hz}$; in a $1\,\mathrm{MHz}$ bandwidth the available noise power is $-114\,\mathrm{dBm}$. The open-circuit noise of a $50\,\Omega$ resistor over $1\,\mathrm{MHz}$ is $\sqrt{4kT_0RB} = 0.895\,\mu\mathrm{V}$ RMS.

### Noise temperature

Because the available power of thermal noise is $kT$ per hertz, *any* white noise of available power density $P_n$ can be described by an equivalent temperature $T_n = P_n/k$. An antenna pointing at cold sky has a noise temperature of a few kelvin, one pointing at the ground about $290\,\mathrm{K}$; an amplifier's internal noise, referred to its input, is described by its **noise temperature** $T_e$, related to the noise factor $F$ of [[electronics-2/electronic-noise]] by $T_e = (F - 1)T_0$. A receiving system with antenna temperature $T_A$ and receiver noise temperature $T_e$ has **system noise temperature** $T_\mathrm{sys} = T_A + T_e$, and the noise power in a noise bandwidth $B_N$ is

$$
P_n = kT_\mathrm{sys}B_N .
$$ {#eq-system-noise}

::: example Sensitivity of a receiver {#ex-receiver}
A $1\,\mathrm{GHz}$ receiver with a noise figure of $2\,\mathrm{dB}$ is connected to an antenna with noise temperature $50\,\mathrm{K}$, and its IF filter has a noise bandwidth of $200\,\mathrm{kHz}$. Find the system noise temperature, the noise power, and the signal power needed for an SNR of $10\,\mathrm{dB}$.
::: solution
$F = 10^{0.2} = 1.585$, so $T_e = 0.585\times290 = 169.6\,\mathrm{K}$ and $T_\mathrm{sys} = 50 + 169.6 = 219.6\,\mathrm{K}$. By [[#eq-system-noise]],

$$
P_n = 1.381\times10^{-23}\times219.6\times2\times10^5 = 6.06\times10^{-16}\,\mathrm{W} = -122.2\,\mathrm{dBm}.
$$

An SNR of $10\,\mathrm{dB}$ requires $-112.2\,\mathrm{dBm}$ of signal, about $6\times10^{-15}\,\mathrm{W}$. Note how much the cold antenna helps: with the conventional assumption $T_A = 290\,\mathrm{K}$ the noise would be $-119.0\,\mathrm{dBm}$, $3.2\,\mathrm{dB}$ worse.
:::
:::

## Shot noise and Campbell's theorem

Thermal noise comes from equilibrium fluctuations. Shot noise comes from the discreteness of charge: a DC current across a barrier — a pn junction, a vacuum gap, a photodiode — is a stream of individual electrons, each producing a short pulse of current. The natural model is a **filtered Poisson process**.

::: theorem Campbell's theorem {#thm-campbell}
Let events occur at the times $t_k$ of a Poisson process of rate $\lambda$, and let each event produce a response $h(t - t_k)$, where $h$ is integrable and square-integrable. The process

$$
X(t) = \sum_k h(t - t_k)
$$

is stationary, with mean, variance and power spectral density

$$
\mu_X = \lambda\int_{-\infty}^{\infty}h(t)\,\dd t, \qquad \sigma_X^2 = \lambda\int_{-\infty}^\infty h^2(t)\,\dd t, \qquad S_X(f) = \lambda\abs{H(f)}^2 + \mu_X^2\delta(f).
$$ {#eq-campbell}
:::

::: proof
Divide the time axis into short intervals of length $\Delta$. In the $m$th interval the number of events $N_m$ is Poisson with mean and variance $\lambda\Delta$, independent of the other intervals, and $X(t) \approx \sum_mN_mh(t - m\Delta)$. This is white "impulse" noise $\sum_mN_m\delta(t - m\Delta)$ filtered by $h$. The impulse train has mean $\lambda$ per unit time and, since the $N_m$ are uncorrelated with variance $\lambda\Delta$, a fluctuating part whose autocovariance tends to $\lambda\delta(\tau)$ as $\Delta\to0$: it is white with two-sided density $\lambda$. By [[random-signals/random-signals-lti#thm-mean]] the mean of $X$ is $\lambda H(0) = \lambda\int h$; by [[random-signals/random-signals-lti#thm-output-psd]] its fluctuating part has spectrum $\lambda\abs{H(f)}^2$ and variance $\lambda\int\abs H^2\,\dd f = \lambda\int h^2\,\dd t$; and the mean adds the DC line $\mu_X^2\delta(f)$.
:::

::: corollary Shot noise {#cor-shot}
A DC current $I$ made of independent carriers of charge $q$, each producing a pulse of area $q$ much shorter than the time scales of interest, has two-sided noise spectral density

$$
S_i(f) = qI \qquad (\text{one-sided } 2qI),
$$ {#eq-shot}

plus the DC line $I^2\delta(f)$. When many pulses overlap (the rate $\lambda = I/q$ is large compared with the bandwidth), the fluctuation is Gaussian.
:::

::: proof
Here $\lambda = I/q$ and $h(t)$ is a pulse with $H(0) = q$. For frequencies well below the inverse pulse duration, $H(f)\approx q$, so $\lambda\abs{H}^2 = (I/q)q^2 = qI$. The mean is $\lambda q = I$. When a large number of independent pulses overlap at any instant, $X(t)$ is a sum of many small independent contributions and the central limit theorem makes it approximately Gaussian; the skewness of a Campbell process is $\lambda\int h^3/(\lambda\int h^2)^{3/2}$, which falls as $\lambda^{-1/2}$.
:::

A photocurrent of $1\,\mu\mathrm{A}$ consists of $6.24\times10^{12}$ electrons per second; its shot noise in a $1\,\mathrm{MHz}$ bandwidth is $\sqrt{2qIB} = 0.566\,\mathrm{nA}$ RMS, a relative fluctuation of $5.7\times10^{-4}$. The relative noise falls as $1/\sqrt I$, so shot noise dominates at low currents.

::: example Checking Campbell's theorem by simulation {#ex-campbell-sim}
Pulses $h(t) = e^{-t/\tau}u(t)$ with $\tau = 1\,\mathrm{ms}$ (unit height) arrive as a Poisson process of rate $\lambda = 10^4\,\mathrm{s^{-1}}$. Find the mean, variance and skewness of $X(t)$, and compare with a simulation.
::: solution
$\int h = \tau$, $\int h^2 = \tau/2$ and $\int h^3 = \tau/3$, so by [[#eq-campbell]]

$$
\mu_X = \lambda\tau = 10, \qquad \sigma_X^2 = \frac{\lambda\tau}{2} = 5, \qquad \text{skewness} = \frac{\lambda\tau/3}{(\lambda\tau/2)^{3/2}} = \frac{10/3}{5^{3/2}} = 0.298 .
$$

A Python simulation (`random.seed(11)`, time step $10\,\mu\mathrm{s}$, Poisson counts per step, each count adding a unit step that then decays by $e^{-\Delta t/\tau}$ per step, over $200\,\mathrm{s}$) printed a mean of $10.05$, a variance of $5.06$ and a skewness of $0.300$. The discrete-time theory for this sampled model predicts $10.050$, $5.050$ and $0.298$, so the agreement is within the statistical error. With an average of only $10$ overlapping pulses the distribution is still visibly skewed; at $\lambda\tau = 1000$ the skewness would be $0.03$ and the process Gaussian for all practical purposes.
:::
:::

::: quiz
A photodiode current doubles. By what factor does its shot-noise RMS current (in a fixed bandwidth) change, and what happens to the signal-to-shot-noise ratio of the DC current?
- [ ] Doubles; unchanged
- [x] Increases by $\sqrt2$; improves by $\sqrt2$ (in amplitude)
- [ ] Unchanged; doubles
- [ ] Increases by $\sqrt2$; unchanged
::: solution
The one-sided density is $2qI$, so the RMS noise $\sqrt{2qIB}$ scales as $\sqrt I$. The ratio $I/\sqrt{2qIB} = \sqrt{I/(2qB)}$ also scales as $\sqrt I$: twice the current gives $\sqrt2$ times better amplitude SNR, $3\,\mathrm{dB}$ in power. Counting more particles makes the relative fluctuation smaller.
:::
:::

## Band-pass noise

In a radio receiver the noise reaching the detector has passed through a filter centred on the carrier frequency $f_c$ with a bandwidth $B$ much smaller than $f_c$. Its sample functions look like a sinusoid at $f_c$ whose amplitude and phase wander slowly and randomly, on the time scale $1/B$.

::: definition In-phase and quadrature components {#def-iq}
A zero-mean WSS band-pass process $N(t)$, whose PSD is confined to $f_c - B/2 < \abs f < f_c + B/2$ with $B < 2f_c$, can be written

$$
N(t) = N_I(t)\cos(2\pi f_ct) - N_Q(t)\sin(2\pi f_ct) = R(t)\cos\bigl(2\pi f_ct + \Phi(t)\bigr),
$$ {#eq-iq}

where the **in-phase** and **quadrature components** $N_I$, $N_Q$ are low-pass processes, the **envelope** is $R = \sqrt{N_I^2 + N_Q^2}$ and the **phase** is $\Phi = \operatorname{atan2}(N_Q, N_I)$. The components can be obtained by mixing with $2\cos2\pi f_ct$ and $-2\sin2\pi f_ct$ and low-pass filtering, as a quadrature demodulator does.
:::

::: theorem Properties of band-pass noise {#thm-bandpass}
For a WSS band-pass process $N(t)$ with PSD $S_N(f)$:

1. $N_I$ and $N_Q$ are jointly WSS, zero-mean, low-pass processes with the same power as $N$: $\E[N_I^2] = \E[N_Q^2] = \E[N^2]$;
2. they have the same spectrum,

$$
S_{N_I}(f) = S_{N_Q}(f) = \bigl[S_N(f - f_c) + S_N(f + f_c)\bigr]\ \text{ for } \abs f < B/2 \ (\text{and } 0 \text{ otherwise});
$$ {#eq-iq-psd}

3. $N_I(t)$ and $N_Q(t)$ at the same instant are uncorrelated; if $S_N$ is symmetric about $f_c$, they are uncorrelated at all lags;
4. if $N$ is Gaussian, $N_I$ and $N_Q$ are jointly Gaussian; with a symmetric spectrum they are independent, the envelope $R(t)$ has the Rayleigh density with $\sigma^2 = \E[N^2]$, and the phase $\Phi(t)$ is uniform and independent of $R(t)$.
:::

::: proof
(Sketch.) Demodulate: $2N(t)\cos2\pi f_ct = N_I + N_I\cos4\pi f_ct - N_Q\sin4\pi f_ct$, and a low-pass filter removes the terms at $2f_c$, leaving $N_I$. In the frequency domain, multiplying by $2\cos2\pi f_ct$ shifts the band-pass spectrum down and up by $f_c$, with amplitude factor $1$ on each shifted copy; the low-pass filter keeps the two copies that land around $f = 0$, which are $S_N(f + f_c)$ (from the positive-frequency band) and $S_N(f - f_c)$ (from the negative-frequency band). That gives [[#eq-iq-psd]] for $N_I$ and, with a sine instead of a cosine, for $N_Q$. Integrating [[#eq-iq-psd]] over $\abs f < B/2$ gives the total area of $S_N$ over both bands, which is $\E[N^2]$. The cross-spectrum of $N_I$ and $N_Q$ turns out to be $j[S_N(f + f_c) - S_N(f - f_c)]$ on $\abs f < B/2$, which is purely imaginary and odd, so its integral $R_{N_IN_Q}(0)$ vanishes, and it is identically zero when $S_N$ is symmetric about $f_c$. Linear operations preserve Gaussianity ([[#thm-gauss-lti]]); for jointly Gaussian, uncorrelated, equal-variance components, [[random-signals/probability-for-engineers#ex-rayleigh]] gives the Rayleigh envelope and uniform, independent phase. A complete derivation, using the Hilbert transform, is in Haykin's or Proakis and Salehi's communication texts.
:::

The striking statement is that $N_I$ and $N_Q$ *each* carry the full power of $N$. There is no contradiction: $N = N_I\cos - N_Q\sin$, and the mean of $\cos^2$ and of $\sin^2$ is $\frac12$, so $\E[N^2] = \frac12\E[N_I^2] + \frac12\E[N_Q^2]$.

::: quiz
Band-pass Gaussian noise $N(t)$ at an IF of $10.7\,\mathrm{MHz}$ has a mean-square value of $4\,\mu\mathrm{V^2}$ and a spectrum symmetric about the IF. What is the mean-square value of its in-phase component $N_I(t)$?
- [ ] $1\,\mu\mathrm{V^2}$
- [ ] $2\,\mu\mathrm{V^2}$, half the power, because the other half is in $N_Q$
- [x] $4\,\mu\mathrm{V^2}$
- [ ] $8\,\mu\mathrm{V^2}$
::: solution
By [[#thm-bandpass]] each component has the full power of $N$: $\E[N_I^2] = \E[N_Q^2] = 4\,\mu\mathrm{V^2}$. The factor $\frac12$ that seems missing is supplied by the carriers: $\E[N^2] = \frac12\E[N_I^2] + \frac12\E[N_Q^2]$.
:::
:::

::: example Ideal band-pass white noise {#ex-iq-white}
White noise of two-sided density $N_0/2$ is filtered by an ideal band-pass filter of bandwidth $B$ centred on $f_c$. Find the PSD and power of $N$, $N_I$ and $N_Q$, and the mean envelope.
::: solution
$S_N = N_0/2$ on the two bands $\abs{f \mp f_c} < B/2$, so $\E[N^2] = 2\times\frac{N_0}{2}B = N_0B$. By [[#eq-iq-psd]], $S_{N_I} = S_{N_Q} = \frac{N_0}{2} + \frac{N_0}{2} = N_0$ for $\abs f < B/2$, with power $N_0B$ each. With $\sigma^2 = N_0B$, the mean envelope is $\sigma\sqrt{\pi/2} = 1.253\sqrt{N_0B}$. Each component is low-pass white noise of bandwidth $B/2$ and therefore offers $B$ independent samples per second ([[random-signals/correlation-spectra#ex-bandlimited]]); the band-pass process as a whole offers $2B$ real samples per second, the same as a low-pass process of bandwidth $B$.
:::
:::

::: example Setting a detection threshold {#ex-false-alarm}
A radar receiver declares a target when the envelope of its IF output exceeds a threshold $\gamma$. In the absence of a target the IF output is narrowband Gaussian noise with RMS value $\sigma = 2\,\mu\mathrm{V}$. Find the threshold for a false-alarm probability of $10^{-6}$ per sample. If the envelope is sampled at the IF bandwidth of $1\,\mathrm{MHz}$, how often does a false alarm occur?
::: solution
The envelope is Rayleigh, so $\Prob(R > \gamma) = e^{-\gamma^2/2\sigma^2}$ ([[random-signals/probability-for-engineers#ex-rayleigh]]). Setting this to $10^{-6}$:

$$
\gamma = \sigma\sqrt{2\ln10^6} = 5.257\sigma = 10.5\,\mu\mathrm{V}.
$$

At $10^6$ roughly independent samples per second, a false alarm occurs on average once per second — far too often for a surveillance radar, which typically demands $10^{-10}$ or less, requiring $\gamma = \sigma\sqrt{2\ln10^{10}} = 6.79\sigma$. The cost of a lower false-alarm rate is a higher threshold and hence a weaker detection range, the trade-off of [[random-signals/optimal-filtering]].
:::
:::

::: widget plot
f: x*exp(-x^2/2); if(x > g, x*exp(-x^2/2), 0)
x: 0, 6
y: 0, 0.7
sliders: g=3:1:6:0.01
labels: \text{Rayleigh density } (\sigma = 1); \text{false-alarm region}
vlines: 5.257
caption: The envelope density of narrowband Gaussian noise with $\sigma = 1$. Every sample above the threshold $g$ is a false alarm, with probability $e^{-g^2/2}$. Slide $g$ to the marked line at $5.257$, where the false-alarm probability is $10^{-6}$, and notice how little the threshold has to move from there to buy another factor of a thousand.
:::

::: remark Sinusoid plus noise: the Rice density
If the band-pass input contains a carrier $A\cos2\pi f_ct$ as well as noise, the in-phase component becomes $A + N_I$ and the envelope $R = \sqrt{(A + N_I)^2 + N_Q^2}$ has the **Rice** density

$$
f_R(r) = \frac{r}{\sigma^2}\exp\Bigl(-\frac{r^2 + A^2}{2\sigma^2}\Bigr)I_0\Bigl(\frac{Ar}{\sigma^2}\Bigr), \qquad r\ge 0,
$$

where $I_0$ is the modified Bessel function of order zero. It reduces to the Rayleigh density for $A = 0$ and approaches a Gaussian of mean $A$ and variance $\sigma^2$ when $A \gg \sigma$. The probability of *detecting* the target in [[#ex-false-alarm]] is the area of the Rice density above $\gamma$; it is computed with the Marcum $Q$-function and is tabulated in radar texts.
:::

::: application Thermal noise in a smartphone
A cellular receiver at $2\,\mathrm{GHz}$ with a $20\,\mathrm{MHz}$ channel has a thermal noise floor of $-174 + 10\log_{10}(2\times10^7) = -101\,\mathrm{dBm}$ at its input, before its own noise figure (typically $5$–$8\,\mathrm{dB}$ for a handset front end) is added. Every link budget, every coverage map and every choice of modulation order in such a system starts from that number. The baseband processor sees the noise as two independent Gaussian streams, $N_I$ and $N_Q$, exactly as [[#thm-bandpass]] predicts, and its error-rate tables are computed for "AWGN", additive white Gaussian noise.
:::

::: history
Walter Schottky predicted shot noise in 1918, using the theory of fluctuations in electron emission. Norman Campbell published his theorems on the mean and variance of filtered random pulse trains in 1909, studying fluctuations in radioactive measurements. John B. Johnson at Bell Laboratories measured the thermal noise of resistors in 1926–27, and Harry Nyquist's companion paper of 1928 derived $4kTR$, including the quantum correction, from thermodynamics. The theory of Gaussian processes, band-pass noise, envelope statistics and the Rice density was set out by Stephen O. Rice in the *Bell System Technical Journal* in 1944–45. Herbert Callen and Theodore Welton's fluctuation–dissipation theorem of 1951 generalised Nyquist's result to every dissipative system.
:::

## Where this leads

White Gaussian noise is the starting point for the rest of the course and for communication theory. [[random-signals/optimal-filtering]] designs the filter that maximises the signal-to-noise ratio against it and the filter that minimises the mean-square error of an estimate; [[random-signals/estimation-kalman]] assumes Gaussian process and measurement noises. [[communication-systems/noise-in-analog-systems]] uses band-pass noise to compare AM and FM, [[communication-systems/optimal-detection]] uses [[#thm-wgn-projections]] to compute error rates, and the capacity of the band-limited AWGN channel, $C = B\log_2(1 + \mathrm{SNR})$, is derived in [[information-theory/channel-capacity]].

::: summary
- A Gaussian process has jointly Gaussian samples; it is described completely by its mean and autocovariance, WSS implies strict stationarity, and linear filtering keeps it Gaussian.
- White Gaussian noise ($R_W = \frac{N_0}{2}\delta$) is defined through correlators: $\E[Z_\phi Z_\psi] = \frac{N_0}{2}\int\phi\psi$; projections on orthonormal functions are independent $\Normal(0, N_0/2)$.
- Thermal noise has two-sided density $2kTR$ (one-sided $4kTR$) and available power $kT$ per hertz, $-174\,\mathrm{dBm/Hz}$ at $290\,\mathrm{K}$; it is white up to about $kT/h$. Noise power is $kT_\mathrm{sys}B_N$.
- Campbell's theorem: Poisson pulses $h$ at rate $\lambda$ give mean $\lambda\int h$, variance $\lambda\int h^2$ and PSD $\lambda\abs{H}^2$; shot noise is $qI$ two-sided, $2qI$ one-sided.
- Band-pass noise $N = N_I\cos - N_Q\sin$: the components are low-pass, each with the full power of $N$, and (for symmetric spectra) independent; the envelope is Rayleigh and the phase uniform.
- A Rayleigh envelope exceeds $\gamma$ with probability $e^{-\gamma^2/2\sigma^2}$, which sets detection thresholds.
:::

## Exercises

::: exercise Noise power in a bandwidth {level=1 check="1.380649e-23*290*10e6"}
What is the available thermal noise power, in watts, from a resistor at $290\,\mathrm{K}$ in a $10\,\mathrm{MHz}$ bandwidth? Express it in dBm too.
::: solution
$P = kTB = 1.381\times10^{-23}\times290\times10^7 = 4.00\times10^{-14}\,\mathrm{W}$, which is $-104\,\mathrm{dBm}$.
:::
:::

::: exercise Shot noise of a photodiode {level=1 check="sqrt(2*1.602176634e-19*100e-9*1e5)"}
A photodiode carries a mean photocurrent of $100\,\mathrm{nA}$. Find the RMS shot-noise current, in amperes, in a $100\,\mathrm{kHz}$ bandwidth.
::: solution
$\sqrt{2qIB} = \sqrt{2\times1.602\times10^{-19}\times10^{-7}\times10^5} = 5.66\times10^{-11}\,\mathrm{A} = 56.6\,\mathrm{pA}$ RMS.
:::
:::

::: exercise Envelope threshold {level=1 check="sqrt(2*log(1000))"}
Narrowband Gaussian noise has $\sigma = 1$. What envelope threshold (in units of $\sigma$) is exceeded with probability $10^{-3}$?
::: solution
$e^{-\gamma^2/2} = 10^{-3}$ gives $\gamma = \sqrt{2\ln1000} = 3.717$. (Here `log` is the natural logarithm.)
:::
:::

::: exercise A resistor at high frequency {level=2}
At what frequency does the thermal noise density of a resistor at $300\,\mathrm{K}$ fall $1\,\mathrm{dB}$ below $kT$? Repeat for a resistor at $4\,\mathrm{K}$.
::: solution
We need $x/(e^x - 1) = 10^{-0.1} = 0.794$, which (by bisection) gives $x = hf/kT = 0.444$. At $300\,\mathrm{K}$, $kT/h = 6.25\,\mathrm{THz}$, so $f = 2.78\,\mathrm{THz}$; at $4\,\mathrm{K}$, $kT/h = 83.3\,\mathrm{GHz}$, so $f = 37\,\mathrm{GHz}$. Cryogenic microwave circuits operate where the white-noise model of thermal noise begins to fail.
:::
:::

::: exercise Orthonormal correlators {level=2}
White Gaussian noise of density $N_0/2$ is correlated with $\phi_1(t) = \sqrt{2/T}\cos(2\pi t/T)$ and $\phi_2(t) = \sqrt{2/T}\sin(2\pi t/T)$ over $0\le t < T$. Find the joint distribution of the two outputs, and the distribution of $Z_1^2 + Z_2^2$.
::: solution
The functions are orthonormal on $[0, T)$: $\int_0^T\frac2T\cos^2 = 1$, $\int_0^T\frac2T\sin^2 = 1$, and $\int_0^T\frac2T\cos\sin = 0$. By [[#thm-wgn-projections]] $Z_1$ and $Z_2$ are independent $\Normal(0, N_0/2)$. Then $\sqrt{Z_1^2 + Z_2^2}$ is Rayleigh with $\sigma^2 = N_0/2$, and $Z_1^2 + Z_2^2$ is exponential with mean $N_0$: $\Prob(Z_1^2 + Z_2^2 > z) = e^{-z/N_0}$. This is the noise statistic of a non-coherent (envelope) detector.
:::
:::

::: exercise Shot noise as Campbell's theorem {level=2}
In a vacuum diode each electron crossing the gap produces a triangular current pulse of duration $\tau = 1\,\mathrm{ns}$ (rising linearly to a peak and falling back in a symmetric triangle) and area $q$. The mean current is $1\,\mathrm{mA}$. Find the low-frequency shot-noise density and the frequency at which the density has fallen to half.
::: solution
Low frequencies: $S_i = qI = 1.602\times10^{-22}\,\mathrm{A^2/Hz}$ two-sided ($17.9\,\mathrm{pA/\sqrt{Hz}}$ one-sided). The triangle of area $q$ and base $\tau$ is the convolution of two rectangles of width $\tau/2$, so its transform is $q\operatorname{sinc}^2(f\tau/2)$. So $S_i(f) = qI\operatorname{sinc}^4(f\tau/2)$, which halves where $\operatorname{sinc}^2(f\tau/2) = 1/\sqrt2$, i.e. $\operatorname{sinc}(u) = 2^{-1/4} = 0.841$ with $u = f\tau/2$, which gives $u = 0.319$. Hence $f = 0.638/\tau = 638\,\mathrm{MHz}$. Shot noise is white up to frequencies of order the inverse transit time.
:::
:::

::: exercise Receiver noise temperature {level=2 check="10*log10(1.380649e-23*(30+60)*1e6/1e-3)"}
A radio-astronomy receiver has a noise temperature of $60\,\mathrm{K}$ and views a sky of $30\,\mathrm{K}$ through a noise bandwidth of $1\,\mathrm{MHz}$. What is the system noise power in dBm?
::: solution
$T_\mathrm{sys} = 90\,\mathrm{K}$; $P_n = kT_\mathrm{sys}B = 1.381\times10^{-23}\times90\times10^6 = 1.24\times10^{-15}\,\mathrm{W} = -119.1\,\mathrm{dBm}$.
:::
:::

::: exercise In-phase and quadrature spectra for an asymmetric band {level=3}
White noise of density $N_0/2$ is filtered by an ideal filter passing $f_c < \abs f < f_c + B$ (a single-sideband filter, entirely above $f_c$). Using [[#eq-iq-psd]] with the reference frequency $f_c$, find the PSDs of $N_I$ and $N_Q$, and show that $N_I$ and $N_Q$ are now correlated at nonzero lags. What reference frequency would make them uncorrelated at all lags?
::: solution
$S_N(f + f_c) = N_0/2$ for $0 < f < B$ and $S_N(f - f_c) = N_0/2$ for $-B < f < 0$ (in the low-pass range $\abs f < B$). Their sum is $N_0/2$ on $\abs f < B$: each component is white over $\abs f < B$, power $N_0B$ — the same as $\E[N^2] = 2\times\frac{N_0}{2}B$. The cross-spectrum is proportional to $j[S_N(f + f_c) - S_N(f - f_c)]$, which is $+jN_0/2$ on $0 < f < B$ and $-jN_0/2$ on $-B < f < 0$: not zero, so the components are correlated at lags $\tau\neq0$ (its inverse transform, odd in $\tau$, vanishes only at $\tau = 0$). Choosing the reference at the band centre $f_c + B/2$ makes the spectrum symmetric about the reference and the components uncorrelated at all lags.
:::
:::

::: exercise Campbell's theorem for a variance {level=3}
Derive the variance part of [[#eq-campbell]] directly, without spectra, for the special case of a rectangular pulse $h(t) = 1$ for $0\le t < \tau$: show that $X(t)$ is then the number of Poisson events in $(t - \tau, t]$ and verify $\mu_X = \lambda\tau$ and $\sigma_X^2 = \lambda\tau$. Then find $C_X(s)$ for $0 \le s < \tau$ and check that its Fourier transform is $\lambda\abs{H(f)}^2$.
::: solution
$X(t) = \sum_kh(t - t_k)$ counts the events with $0 \le t - t_k < \tau$, i.e. in a window of length $\tau$, so it is Poisson with mean and variance $\lambda\tau$, matching $\lambda\int h = \lambda\int h^2 = \lambda\tau$. For $0\le s < \tau$, $X(t + s)$ and $X(t)$ share the events in an overlap of length $\tau - s$; the counts in the non-overlapping parts are independent of everything else, so $C_X(s) = \Var(\text{count in overlap}) = \lambda(\tau - s)$, and $C_X(s) = 0$ for $s \ge \tau$. That is $\lambda\tau(1 - \abs s/\tau)$, a triangle, whose transform is $\lambda\tau^2\operatorname{sinc}^2(f\tau) = \lambda\abs{H(f)}^2$ since $\abs{H(f)} = \tau\abs{\operatorname{sinc}(f\tau)}$.
:::
:::
