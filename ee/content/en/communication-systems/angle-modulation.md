In the early 1930s the received wisdom among radio engineers was that frequency modulation was a dead end. John Carson had shown in 1922 that FM can never occupy *less* bandwidth than AM, and since noise power grows with bandwidth, FM seemed to have nothing to offer. Edwin Armstrong turned the argument on its head: by deliberately making the frequency deviation much *larger* than the message bandwidth, he obtained a received signal that was dramatically quieter than AM, at the price of using several times the spectrum. FM broadcasting, the sound of analog television, two-way radio and the first generation of mobile phones were all built on that trade, and the phase-locked loop that grew up alongside FM is now in every radio, every clock-recovery circuit and every frequency synthesiser.

In **angle modulation** the message changes the phase or frequency of the carrier while the amplitude stays constant. That makes the signal immune to amplitude disturbances and lets the transmitter use efficient saturated amplifiers, but it also makes the modulation **nonlinear**: the spectrum is not a shifted copy of the message spectrum, and superposition fails. This lesson defines phase and frequency modulation, computes the spectrum for a tone with Bessel functions, derives Carson's bandwidth rule, describes how FM is generated and demodulated, and analyses the phase-locked loop. Noise performance, the real reason for FM, is the subject of [[communication-systems/noise-in-analog-systems]]. As in [[communication-systems/amplitude-modulation]], $m(t)$ is a real message of bandwidth $W$.

## Instantaneous frequency, PM and FM {#sec-definitions}

A constant-amplitude signal $s(t) = A_c\cos\theta(t)$ has **angle** $\theta(t)$. For an unmodulated carrier, $\theta(t) = 2\pi f_ct + \theta_0$ grows linearly and its rate of change, divided by $2\pi$, is the frequency $f_c$. That suggests a definition for any angle.

::: definition Instantaneous frequency {#def-inst-freq}
The **instantaneous frequency** of $s(t) = A_c\cos\theta(t)$ is

$$
f_i(t) = \frac{1}{2\pi}\frac{\dd\theta}{\dd t} .
$$ {#eq-inst-freq}

Writing $\theta(t) = 2\pi f_ct + \phi(t)$, the **phase deviation** is $\phi(t)$ and the **frequency deviation** is $f_i(t) - f_c = \frac{1}{2\pi}\phi'(t)$. The complex envelope is $\tilde s(t) = A_ce^{j\phi(t)}$, with constant magnitude.
:::

::: definition Phase and frequency modulation {#def-pm-fm}
In **phase modulation** (PM) the phase deviation is proportional to the message,

$$
s_{PM}(t) = A_c\cos\big(2\pi f_ct + k_pm(t)\big),
$$ {#eq-pm}

with **phase sensitivity** $k_p$ in $\mathrm{rad/V}$. In **frequency modulation** (FM) the frequency deviation is proportional to the message, $f_i(t) = f_c + k_fm(t)$, so

$$
s_{FM}(t) = A_c\cos\!\Big(2\pi f_ct + 2\pi k_f\int_0^tm(\tau)\,\dd\tau\Big),
$$ {#eq-fm}

with **frequency sensitivity** $k_f$ in $\mathrm{Hz/V}$. The **peak frequency deviation** is $\Delta f = k_f\max_t\lvert m(t)\rvert$, and the **deviation ratio** is $D = \Delta f/W$.
:::

PM and FM are two views of one thing. FM with message $m$ is PM with message $\int m$; PM with message $m$ is FM with message $m'$. A frequency modulator preceded by a differentiator is a phase modulator, and a phase modulator preceded by an integrator is a frequency modulator. From the outside — given only $s(t)$ — one cannot tell which was used unless one knows the message.

### Tone modulation and the modulation index

For a single tone, $m(t) = A_m\cos(2\pi f_mt)$, FM gives

$$
\phi(t) = 2\pi k_f\int_0^tA_m\cos(2\pi f_m\tau)\,\dd\tau = \frac{k_fA_m}{f_m}\sin(2\pi f_mt) = \beta\sin(2\pi f_mt),
$$ {#eq-tone-fm}

where

$$
\beta = \frac{\Delta f}{f_m}, \qquad \Delta f = k_fA_m ,
$$ {#eq-beta}

is the **modulation index**: the peak phase deviation in radians. The instantaneous frequency swings between $f_c - \Delta f$ and $f_c + \Delta f$, $f_m$ times per second. With PM the phase deviation is $k_pA_m\cos(2\pi f_mt)$, again a sinusoid, with index $\beta = k_pA_m$ independent of $f_m$. The difference shows up only when $f_m$ changes: in FM the frequency deviation is fixed and $\beta$ falls as $f_m$ rises, in PM the phase deviation is fixed and the frequency deviation $\beta f_m$ rises with $f_m$.

::: widget plot
f: cos(2*pi*c*x + b*sin(2*pi*x)); cos(2*pi*x)
x: 0, 2
y: -1.5, 1.5
sliders: b=3:0:8:0.1; c=10:4:20:1
labels: s(t)/A_c; m(t)/A_m
caption: A tone-modulated FM wave, with time in periods of the message ($f_m = 1$) and carrier frequency $c$. The wave is squeezed where the instantaneous frequency $f_i = c + \beta\cos(2\pi t)$ is high and stretched where it is low. Increase $\beta$: the deviation $\Delta f = \beta f_m$ grows and the contrast between compressed and stretched regions with it, but the amplitude never changes. The oscillation is fastest at the message peaks and slowest at the troughs.
:::

## Narrowband FM {#sec-nbfm}

When the peak phase deviation is small, $\lvert\phi(t)\rvert \ll 1$ rad, the complex envelope can be linearised: $\tilde s = A_ce^{j\phi} \approx A_c(1 + j\phi(t))$, so

$$
s(t) \approx A_c\cos(2\pi f_ct) - A_c\phi(t)\sin(2\pi f_ct) .
$$ {#eq-nbfm}

This is **narrowband FM** (NBFM) or narrowband PM: a carrier plus a DSB signal in *quadrature* with it. Compare conventional AM, $A_c\cos(2\pi f_ct) + A_c\mu m_n(t)\cos(2\pi f_ct)$, where the sidebands are *in phase* with the carrier. Both have bandwidth $2W$. For a tone, NBFM is

$$
s(t) \approx A_c\cos(2\pi f_ct) + \frac{\beta A_c}{2}\cos(2\pi(f_c + f_m)t) - \frac{\beta A_c}{2}\cos(2\pi(f_c - f_m)t),
$$

the same three lines as AM, but with the lower side-frequency inverted.

::: intuition The phasor picture
Draw the carrier as a fixed phasor. In AM the two side-frequency phasors rotate in opposite directions so that their sum is always *along* the carrier: the resultant grows and shrinks. In NBFM the lower side-frequency is inverted, so the sum is always *perpendicular* to the carrier: the resultant swings back and forth in angle with almost constant length. The small residual change of length (the resultant is $A_c\sqrt{1 + \beta^2\sin^2}$, not $A_c$) is the error of the linear approximation; the higher-order sidebands of true FM correct it.
:::

Narrowband FM is not much use on its own — it has no noise advantage over AM — but it is easy to generate with a balanced modulator and a $90^\circ$ phase shift, and it is the starting point of Armstrong's indirect method below.

## The spectrum of wideband FM {#sec-spectrum}

When $\beta$ is not small, the linearisation fails and we must compute the spectrum of $A_ce^{j\beta\sin(2\pi f_mt)}$ exactly. The complex envelope is periodic with period $1/f_m$, so it has a Fourier series, and its coefficients are Bessel functions.

::: definition Bessel functions of the first kind {#def-bessel}
For integer $n$, the **Bessel function of the first kind** of order $n$ is

$$
J_n(\beta) = \frac{1}{2\pi}\int_{-\pi}^{\pi}e^{j(\beta\sin x - nx)}\,\dd x = \sum_{k=0}^{\infty}\frac{(-1)^k}{k!\,(k + n)!}\left(\frac\beta2\right)^{2k + n}\quad(n \ge 0),
$$ {#eq-bessel}

with $J_{-n}(\beta) = (-1)^nJ_n(\beta)$. For small $\beta$, $J_0(\beta) \approx 1 - \beta^2/4$, $J_1(\beta) \approx \beta/2$ and $J_n(\beta) \approx (\beta/2)^n/n!$.
:::

::: theorem Spectrum of tone-modulated FM {#thm-fm-spectrum}
The FM (or PM) signal $s(t) = A_c\cos\big(2\pi f_ct + \beta\sin(2\pi f_mt)\big)$ is

$$
s(t) = A_c\sum_{n=-\infty}^{\infty}J_n(\beta)\cos\big(2\pi(f_c + nf_m)t\big) .
$$ {#eq-fm-bessel}

It consists of a carrier component of amplitude $A_cJ_0(\beta)$ and side-frequencies at $f_c \pm nf_m$ of amplitude $A_c\lvert J_n(\beta)\rvert$, for every $n \ge 1$. The total power is $\tfrac12A_c^2$, independent of $\beta$, and $\sum_nJ_n^2(\beta) = 1$.
:::

::: proof
The complex envelope $\tilde s(t) = A_ce^{j\beta\sin(2\pi f_mt)}$ is periodic in $t$ with period $T_m = 1/f_m$, so $\tilde s(t) = \sum_nc_ne^{j2\pi nf_mt}$ with

$$
c_n = \frac{1}{T_m}\int_{-T_m/2}^{T_m/2}A_ce^{j\beta\sin(2\pi f_mt)}e^{-j2\pi nf_mt}\,\dd t = \frac{A_c}{2\pi}\int_{-\pi}^{\pi}e^{j(\beta\sin x - nx)}\,\dd x = A_cJ_n(\beta),
$$

substituting $x = 2\pi f_mt$ and using [[#eq-bessel]]. Then $s = \operatorname{Re}\{\tilde se^{j2\pi f_ct}\} = A_c\sum_nJ_n(\beta)\operatorname{Re}\{e^{j2\pi(f_c + nf_m)t}\}$, which is [[#eq-fm-bessel]] because the $J_n$ are real (the integral's imaginary part, $\int\sin(\beta\sin x - nx)\,\dd x$, has an odd integrand). The power is $\tfrac12\overline{\lvert\tilde s\rvert^2} = \tfrac12A_c^2$ since $\lvert\tilde s\rvert = A_c$; by Parseval for Fourier series it is also $\tfrac12\sum\lvert c_n\rvert^2 = \tfrac12A_c^2\sum J_n^2$, so $\sum J_n^2 = 1$. The power series in [[#eq-bessel]] follows by expanding $e^{(\beta/2)(z - 1/z)}$ with $z = e^{jx}$ as a product of two exponential series and collecting powers of $z$.
:::

Three consequences stand out. First, the spectrum has infinitely many lines: FM is never strictly band-limited. Second, the power is redistributed, not created: as $\beta$ grows, power moves out of the carrier into the sidebands, and at the zeros of $J_0$ — $\beta = 2.405, 5.520, 8.654, \dots$ — the carrier vanishes entirely, which gives an accurate way to calibrate a modulator's deviation (raise the tone level until the carrier line on a spectrum analyser disappears). Third, $J_n(\beta)$ becomes small rapidly once $n > \beta + 1$; that is the basis of Carson's rule.

| $\beta$ | $J_0$ | $J_1$ | $J_2$ | $J_3$ | $J_4$ | $J_5$ | $J_6$ | $J_7$ |
|---|---|---|---|---|---|---|---|---|
| $0.2$ | $0.990$ | $0.100$ | $0.005$ | | | | | |
| $0.5$ | $0.938$ | $0.242$ | $0.031$ | $0.003$ | | | | |
| $1$ | $0.765$ | $0.440$ | $0.115$ | $0.020$ | $0.002$ | | | |
| $2$ | $0.224$ | $0.577$ | $0.353$ | $0.129$ | $0.034$ | $0.007$ | $0.001$ | |
| $5$ | $-0.178$ | $-0.328$ | $0.047$ | $0.365$ | $0.391$ | $0.261$ | $0.131$ | $0.053$ |

::: widget plot
f: abs(sum((-1)^k/(fact(k)*fact(k + round(abs(x))))*(b/2)^(2*k + round(abs(x))), k, 0, 45))*heaviside(0.18 - abs(x - round(x))); 0.05*heaviside(b + 1 - abs(x))
x: -14, 14
y: 0, 1.05
sliders: b=2:0:10:0.05
labels: \lvert J_n(\beta)\rvert; \text{Carson band}
caption: Line spectrum of tone-modulated FM: the bar at $n$ is the amplitude $\lvert J_n(\beta)\rvert$ of the side-frequency at $f_c + nf_m$, relative to $A_c$. The orange strip marks Carson's band, $\lvert n\rvert \le \beta + 1$. Slide $\beta$ from $0$: at small $\beta$ only the carrier and the first pair matter (narrowband FM). At $\beta = 2.405$ the carrier ($n = 0$) vanishes. For every $\beta$, the lines outside the Carson band are small.
:::

::: example Spectrum of an FM test signal {#ex-fm-spectrum}
A $100\,\mathrm{MHz}$ carrier of amplitude $10\,\mathrm{V}$ (into $50\,\Omega$) is frequency-modulated by a $10\,\mathrm{kHz}$ tone with peak deviation $\Delta f = 20\,\mathrm{kHz}$. List the spectral lines with amplitude above $1\,\%$ of $A_c$, find the power in the carrier, and the fraction of the power within $f_c \pm 30\,\mathrm{kHz}$.
::: solution
$\beta = \Delta f/f_m = 2$. From the table, lines at $f_c$ ($J_0 = 0.224$, $2.24\,\mathrm{V}$), $f_c \pm 10\,\mathrm{kHz}$ ($0.577$, $5.77\,\mathrm{V}$), $\pm20\,\mathrm{kHz}$ ($0.353$), $\pm30\,\mathrm{kHz}$ ($0.129$), $\pm40\,\mathrm{kHz}$ ($0.034$); at $\pm50\,\mathrm{kHz}$, $J_5 = 0.007$ is below $1\,\%$. Eleven lines, from $99.96$ to $100.04\,\mathrm{MHz}$.

The total power is $\tfrac12A_c^2/R = \tfrac12\cdot100/50 = 1\,\mathrm{W}$, and the carrier carries $J_0^2 = 0.050$ of it, $50\,\mathrm{mW}$. The power within $\pm30\,\mathrm{kHz}$ (lines $n = -3$ to $3$) is $J_0^2 + 2(J_1^2 + J_2^2 + J_3^2) = 0.0501 + 2(0.3326 + 0.1245 + 0.0166) = 0.998$ of the total. That band is exactly Carson's $2(\beta + 1)f_m = 60\,\mathrm{kHz}$.
:::
:::

### Carson's rule

::: theorem Carson's rule {#thm-carson}
The bandwidth containing about $98\,\%$ or more of the power of an FM signal with peak deviation $\Delta f$ and message bandwidth $W$ is approximately

$$
B_T \approx 2(\Delta f + W) = 2W(D + 1) ,
$$ {#eq-carson}

where $D = \Delta f/W$. For tone modulation this is $2(\beta + 1)f_m$.
:::

::: proof {collapsed}
For tone modulation, [[#eq-bessel]] and Stirling's formula show that $J_n(\beta)$ decays faster than geometrically once $n$ exceeds $\beta$: for $n > \beta$, $\lvert J_n(\beta)\rvert \le (\beta/2)^n/n!\cdot e^{\beta^2/4}$, and the ratio of successive terms is about $\beta/2n$. Numerically, for integer $\beta$ the power in the lines with $\lvert n\rvert \le \beta + 1$ is $99.9\,\%$ at $\beta = 1$, $99.8\,\%$ at $\beta = 2$, $99.4\,\%$ at $\beta = 5$ and $99.0\,\%$ at $\beta = 10$, falling only slowly as $\beta$ grows; for non-integer $\beta$, where $\beta + 1$ falls just short of the next line, the fraction can dip to about $96\,\%$. That is the sense in which the rule holds for tones. The two limits explain the form of the rule: for $\beta \ll 1$ the spectrum is the carrier and one pair of lines, bandwidth $2f_m$; for $\beta \gg 1$ the instantaneous frequency sweeps slowly over $f_c \pm \Delta f$ and the spectrum fills that range, bandwidth $2\Delta f$. Carson's rule adds the two. For a general message it is a rule of thumb, using the worst case $D = \Delta f/W$; it slightly underestimates the bandwidth needed for very low distortion, for which $2(\Delta f + 2W)$ is sometimes used.
:::

::: example FM broadcasting {#ex-fm-broadcast}
Broadcast FM uses a peak deviation of $75\,\mathrm{kHz}$ and audio to $15\,\mathrm{kHz}$. Find the deviation ratio and the Carson bandwidth, and compare with the $200\,\mathrm{kHz}$ channel spacing. Stereo broadcasting replaces the audio by a composite baseband signal extending to $53\,\mathrm{kHz}$; what does Carson's rule predict now?
::: solution
$D = 75/15 = 5$ and $B_T = 2(75 + 15) = 180\,\mathrm{kHz}$, comfortably inside a $200\,\mathrm{kHz}$ channel. With the stereo composite, $W = 53\,\mathrm{kHz}$ and $B_T = 2(75 + 53) = 256\,\mathrm{kHz}$. The rule overestimates here, because the peak deviation is shared between the components of the composite signal and the high-frequency part (the $38\,\mathrm{kHz}$ DSB-SC difference channel) produces a smaller index; measured occupied bandwidths of stereo stations are around $200$–$250\,\mathrm{kHz}$, which is why adjacent stations in one area are not assigned adjacent channels. Compare AM for the same $15\,\mathrm{kHz}$ audio: $30\,\mathrm{kHz}$. FM uses six times the bandwidth.
:::
:::

::: quiz
A tone frequency-modulates a carrier with $\Delta f = 50\,\mathrm{kHz}$ at $f_m = 5\,\mathrm{kHz}$. The tone frequency is doubled to $10\,\mathrm{kHz}$ at the same amplitude. What happens to $\beta$ and to the Carson bandwidth?
- [ ] $\beta$ doubles; the bandwidth doubles
- [x] $\beta$ halves (from $10$ to $5$); the bandwidth grows only from $110$ to $120\,\mathrm{kHz}$
- [ ] $\beta$ is unchanged; the bandwidth doubles
- [ ] $\beta$ halves; the bandwidth halves
::: solution
In FM, $\Delta f = k_fA_m$ depends only on the amplitude, so it stays at $50\,\mathrm{kHz}$, and $\beta = \Delta f/f_m$ halves from $10$ to $5$. Carson's rule gives $2(50 + 5) = 110\,\mathrm{kHz}$ before and $2(50 + 10) = 120\,\mathrm{kHz}$ after: wideband FM bandwidth is set mainly by the deviation, not by the message frequency. In PM the *phase* deviation would be unchanged and $\Delta f$ would double.
:::
:::

## Generating FM {#sec-generation}

### Direct FM

The obvious way to produce FM is to let the message control the frequency of an oscillator: a **voltage-controlled oscillator** (VCO) with $f_i = f_0 + K m(t)$ is an FM modulator with $k_f = K$. In an LC oscillator the control element is a **varactor** diode, whose junction capacitance falls as its reverse bias rises. The resonant frequency $f = 1/(2\pi\sqrt{LC})$ is not linear in $C$, nor $C$ in the voltage, so direct FM is linear only for small fractional deviations; and the free-running LC oscillator drifts with temperature by far more than the $\pm2\,\mathrm{kHz}$ or so allowed for a broadcast carrier. Modern direct modulators therefore place the VCO inside a phase-locked loop (below) whose bandwidth is narrower than the lowest message frequency: the loop holds the average frequency to a crystal reference while the message modulates within the loop's blind spot. Today, most FM is generated digitally: a DSP computes $\phi(t) = 2\pi k_f\int m$ and an I/Q modulator transmits $\tilde s = A_ce^{j\phi}$.

### Indirect FM (Armstrong's method)

Armstrong's transmitter started from a crystal oscillator, stable but impossible to modulate much, and built wideband FM from narrowband FM in two steps.

1. Generate NBFM with a tiny deviation using [[#eq-nbfm]]: integrate the message, multiply by $\sin(2\pi f_1t)$ in a balanced modulator and subtract from the carrier.
2. Pass the result through a chain of **frequency multipliers** — nonlinear stages (e.g. a class-C amplifier tuned to a harmonic) that produce $\cos(n\theta(t))$ from $\cos\theta(t)$. Multiplication by $n$ multiplies the instantaneous frequency, so both the carrier and the deviation are multiplied: $nf_1$ and $n\Delta f_1$. A **mixer** then shifts the carrier without changing the deviation, so carrier frequency and deviation can be set independently.

::: example Armstrong's indirect FM transmitter {#ex-armstrong}
A crystal-controlled NBFM modulator produces $f_1 = 200\,\mathrm{kHz}$ with peak deviation $\Delta f_1 = 25\,\mathrm{Hz}$. Design a chain of two multipliers and a mixer to produce an FM signal at $f_c = 91.2\,\mathrm{MHz}$ with $\Delta f = 76.8\,\mathrm{kHz}$. Check that the NBFM approximation holds for audio above $100\,\mathrm{Hz}$.
::: solution
The deviation must be multiplied by $76\,800/25 = 3072 = 64\times48$. Multiplying by $64$ first gives a carrier of $64\times0.2 = 12.8\,\mathrm{MHz}$ with deviation $64\times25 = 1.6\,\mathrm{kHz}$. If we then multiplied by $48$ directly, the carrier would be $614.4\,\mathrm{MHz}$ — too high. So a mixer with a crystal oscillator at $10.9\,\mathrm{MHz}$ translates the carrier down to $12.8 - 10.9 = 1.9\,\mathrm{MHz}$, deviation still $1.6\,\mathrm{kHz}$. The second multiplier ($\times48$) gives $48\times1.9 = 91.2\,\mathrm{MHz}$ and deviation $48\times1.6 = 76.8\,\mathrm{kHz}$, as required.

In the NBFM stage, $\beta_1 = \Delta f_1/f_m = 25/f_m$, which is at most $0.25$ for $f_m \ge 100\,\mathrm{Hz}$. At $\beta = 0.25$, $J_1(0.25)/(\beta/2) = 0.992$ and the second-order sidebands $J_2 \approx 0.008$ are $-42\,\mathrm{dB}$ relative to the carrier, so the linear approximation [[#eq-nbfm]] is good. Any frequency error of the $10.9\,\mathrm{MHz}$ oscillator is multiplied by $48$, so it must be crystal-controlled too.
:::
:::

## Demodulating FM {#sec-demodulation}

An FM demodulator must produce an output proportional to the instantaneous frequency deviation $k_fm(t)$, ideally ignoring the amplitude.

::: theorem The FM discriminator {#thm-discriminator}
Let $s(t) = A_c\cos(2\pi f_ct + \phi(t))$ with $\phi(t) = 2\pi k_f\int m$ and $\lvert k_fm(t)\rvert < f_c$. Then

$$
\frac{\dd s}{\dd t} = -A_c\big[2\pi f_c + 2\pi k_fm(t)\big]\sin\big(2\pi f_ct + \phi(t)\big),
$$ {#eq-discriminator}

an AM-like signal whose envelope $2\pi A_c[f_c + k_fm(t)]$ is a linear function of the message. A differentiator followed by an envelope detector and DC removal therefore recovers $2\pi A_ck_fm(t)$.
:::

::: proof
Differentiate with the chain rule: $\dd s/\dd t = -A_c\sin(\theta)\,\theta'(t)$ with $\theta' = 2\pi f_c + \phi' = 2\pi f_c + 2\pi k_fm(t)$. Because $f_c + k_fm(t) > 0$, this envelope is positive and an envelope detector (as in [[communication-systems/amplitude-modulation#thm-envelope-rc]]) follows it, provided the time constant is chosen as there.
:::

Because the output is proportional to $A_c$, any amplitude variation — fading, noise, interference — passes straight through. Practical FM receivers therefore precede the discriminator with a **limiter**: a high-gain amplifier that clips the signal to a square wave of fixed amplitude, followed by a band-pass filter that restores a sinusoid at the carrier frequency. The limiter removes amplitude variations without disturbing the zero crossings, which carry all the information in FM.

Any circuit whose gain rises linearly with frequency across $f_c \pm \Delta f$ can act as the differentiator: a tuned circuit operated on its slope (**slope detector**), two stagger-tuned circuits subtracted (**balanced discriminator**), or the **quadrature detector** used in integrated FM receivers, which multiplies the signal by a copy delayed through a phase-shift network whose phase varies linearly with frequency. Digital receivers compute the phase $\phi = \arg\tilde s$ from I/Q samples and differentiate it numerically, or use the equivalent $\phi' = (x_Ix_Q' - x_Qx_I')/(x_I^2 + x_Q^2)$.

::: quiz
An FM signal fades so that its amplitude drops to half for a few milliseconds. Which receiver output is unaffected?
- [ ] A discriminator without a limiter
- [x] A limiter followed by a discriminator
- [ ] An envelope detector
- [ ] None: every FM demodulator output scales with amplitude
::: solution
By [[#thm-discriminator]] the discriminator's output envelope is $2\pi A_c[f_c + k_fm(t)]$, so without a limiter the recovered message would halve. The limiter restores a constant amplitude before the discriminator while preserving the zero crossings, and with them the instantaneous frequency, so the output is unchanged. An envelope detector sees only the fade and none of the message. (A PLL is also largely insensitive, since its phase detector output scales with $A_c$ only through the loop gain.)
:::
:::

## The phase-locked loop {#sec-pll}

A **phase-locked loop** (PLL) is a feedback system that forces a local oscillator to track the phase of an input signal. It demodulates FM, recovers carriers for coherent detection, synthesises frequencies and extracts clocks from data.

::: definition Phase-locked loop {#def-pll}
A **phase-locked loop** consists of a **phase detector**, a **loop filter** $F(s)$ and a **voltage-controlled oscillator**, connected in a loop. With input $A_c\cos(2\pi f_ct + \phi_i(t))$ and VCO output $\sin(2\pi f_ct + \phi_v(t))$, the phase detector (in its simplest form, a multiplier followed by removal of the $2f_c$ terms) produces $e(t) = K_d\sin\big(\phi_i(t) - \phi_v(t)\big)$, the loop filter produces $v(t) = (f * e)(t)$, and the VCO advances its phase at the rate $\phi_v'(t) = K_v\,v(t)$, where $K_d$ (in $\mathrm{V/rad}$) and $K_v$ (in $\mathrm{rad\,s^{-1}/V}$) are the detector and VCO gains. The loop is **locked** when the **phase error** $\phi_e = \phi_i - \phi_v$ stays small.
:::

Near lock, $\sin\phi_e \approx \phi_e$, and the loop becomes linear. Taking Laplace transforms of $\phi_v' = K_vK_d(f * \phi_e)$ gives $s\Phi_v(s) = K_dK_vF(s)\,[\Phi_i(s) - \Phi_v(s)]$, so the phase transfer functions are

$$
H(s) = \frac{\Phi_v(s)}{\Phi_i(s)} = \frac{KF(s)}{s + KF(s)}, \qquad \frac{\Phi_e(s)}{\Phi_i(s)} = 1 - H(s) = \frac{s}{s + KF(s)}, \qquad K = K_dK_v .
$$ {#eq-pll}

This is a unity-feedback control loop with open-loop gain $KF(s)/s$; the VCO is the integrator in the loop, as analysed in [[control-systems]].

::: theorem The PLL as an FM demodulator {#thm-pll-fm}
If the input is FM, $\phi_i = 2\pi k_f\int m$, and the loop's phase response satisfies $H(j2\pi f) \approx 1$ for $\lvert f\rvert \le W$, then the VCO control voltage is

$$
v(t) \approx \frac{2\pi k_f}{K_v}\,m(t) .
$$ {#eq-pll-fm}
:::

::: proof
If $H \approx 1$ over the message band, the VCO phase follows the input phase: $\phi_v \approx \phi_i$. Then $K_vv = \phi_v' \approx \phi_i' = 2\pi k_fm(t)$.
:::

The argument is almost too simple, and it hides a design condition: the linear model requires a small phase error, and the error grows with the frequency deviation. For the **first-order loop**, $F(s) = 1$, $H(s) = K/(s + K)$ has a 3-dB bandwidth of $K/2\pi$ hertz, and a constant frequency offset $\Delta\omega$ (input phase $\Delta\omega\,t$) leaves a steady-state phase error $\phi_e = \Delta\omega/K$ by the final-value theorem. Since the phase detector's output $K_d\sin\phi_e$ cannot exceed $K_d$, the loop holds lock only for $\lvert\Delta\omega\rvert < K$: the **hold-in range**. The **second-order loop** with a proportional-plus-integral filter $F(s) = (1 + s\tau_2)/(s\tau_1)$ gives

$$
H(s) = \frac{2\zeta\omega_ns + \omega_n^2}{s^2 + 2\zeta\omega_ns + \omega_n^2}, \qquad \omega_n = \sqrt{K/\tau_1},\quad \zeta = \tfrac12\omega_n\tau_2 ,
$$ {#eq-pll2}

whose integrator drives the steady-state phase error for a frequency step to zero. Its error for a step $\Delta\omega$ in frequency is $\Phi_e(s) = \Delta\omega/(s^2 + 2\zeta\omega_ns + \omega_n^2)$, i.e. for $\zeta < 1$

$$
\phi_e(t) = \frac{\Delta\omega}{\omega_n\sqrt{1 - \zeta^2}}\,e^{-\zeta\omega_nt}\sin\!\big(\omega_n\sqrt{1 - \zeta^2}\,t\big) .
$$ {#eq-pll-step}

::: widget plot
f: exp(-z*x)*sin(sqrt(1 - z^2)*x)/sqrt(1 - z^2); exp(-x)*x
x: 0, 12
y: -0.4, 1.1
sliders: z=0.707:0.1:0.99:0.01
labels: \phi_e\omega_n/\Delta\omega\ (\zeta); \zeta=1
caption: Phase error of a second-order PLL after a sudden step $\Delta\omega$ in input frequency, normalised by $\Delta\omega/\omega_n$, against $\omega_nt$. The error rises, rings and decays to zero: the integrator in the loop filter removes any steady error. Lower $\zeta$: the peak error grows and the ringing lasts longer. The usual choice $\zeta = 0.707$ gives a peak of about $0.46\,\Delta\omega/\omega_n$; the loop stays in its linear range if this is well below $1\,\mathrm{rad}$.
:::

::: example Designing a PLL FM demodulator {#ex-pll-design}
An FM signal with $\Delta f = 75\,\mathrm{kHz}$ and $W = 15\,\mathrm{kHz}$, at an IF of $10.7\,\mathrm{MHz}$, is to be demodulated by a first-order PLL whose VCO has $K_v/2\pi = 1\,\mathrm{MHz/V}$. (a) Choose the loop gain $K$ so that the loop bandwidth exceeds $W$ and the peak phase error is below $0.15\,\mathrm{rad}$. (b) Find the phase-detector gain and the peak output voltage. (c) What is the loop's 3-dB bandwidth, and why is it so much larger than $W$?
::: solution
(a) For slowly varying $m$ the first-order loop's phase error is $\phi_e \approx \phi_i'/K = 2\pi k_fm(t)/K$, with peak $2\pi\Delta f/K$. Requiring $2\pi\Delta f/K \le 0.15$ gives $K \ge 2\pi\cdot75\times10^3/0.15 = 3.14\times10^6\,\mathrm{s^{-1}}$, i.e. $K/2\pi = 500\,\mathrm{kHz}$. At this error, $\sin(0.15) = 0.1494$, a nonlinearity of $0.4\,\%$.

(b) $K_d = K/K_v = (2\pi\cdot5\times10^5)/(2\pi\cdot10^6) = 0.5\,\mathrm{V/rad}$. By [[#eq-pll-fm]] the output is $v = (2\pi k_f/K_v)m$, whose peak is $\Delta f/(K_v/2\pi) = 75\,\mathrm{kHz}/(1\,\mathrm{MHz/V}) = 75\,\mathrm{mV}$.

(c) The 3-dB bandwidth is $K/2\pi = 500\,\mathrm{kHz}$, more than thirty times $W$. The loop must not merely pass the message frequencies; it must keep the phase error small while the input frequency swings by $\pm75\,\mathrm{kHz}$, and with a first-order loop that requires a gain proportional to the deviation. A second-order loop (or adding a low-pass filter after the PLL output) narrows the noise bandwidth, which matters near the FM threshold of [[communication-systems/noise-in-analog-systems]].
:::
:::

::: warning Carson's rule needs the frequency deviation
Carson's rule uses the *frequency* deviation. For PM with phase sensitivity $k_p$, the frequency deviation is $\Delta f = \frac{k_p}{2\pi}\max\lvert m'(t)\rvert$, which depends on the message *slope*: a PM signal carrying a high-frequency tone needs more bandwidth than the same amplitude at low frequency. Using $\beta = k_pA_m$ in place of $\Delta f/W$, or forgetting that $\beta$ is in radians, is a common error. Always compute $\Delta f$ first, then $B_T = 2(\Delta f + W)$.
:::

::: application Phase-locked loops everywhere
The same loop that demodulates FM is the core of every **frequency synthesiser**: with a divide-by-$N$ counter between the VCO and the phase detector, the loop locks the VCO to $N$ times a crystal reference, so a phone selects its channel by changing $N$. PLLs recover the bit clock in every serial link (USB, PCIe, Ethernet), generate the gigahertz clocks of processors from a $25\,\mathrm{MHz}$ crystal, and track the carrier phase in coherent digital receivers, where the Costas loop of [[communication-systems/amplitude-modulation]] is a PLL with a modified phase detector. The GPS receiver in a phone runs dozens of them in software.
:::

## Where this leads

The constant envelope that makes FM immune to amplitude noise, and the deliberate excess bandwidth, combine in [[communication-systems/noise-in-analog-systems]] to give an output SNR proportional to $\beta^2$ — the "FM improvement" — until the signal falls below a threshold, where the advantage collapses. Pre-emphasis, which exploits the shape of the FM noise spectrum, is treated there too. Digital frequency-shift keying and its continuous-phase variants (MSK, GMSK in GSM) are FM with digital messages ([[communication-systems/digital-modulation]]), and phase-shift keying is PM with a digital message. Loop dynamics are a direct application of [[control-systems]], and frequency synthesisers are built in [[rf-microwave]].

::: history
John Renshaw Carson's 1922 paper "Notes on the theory of modulation" analysed FM mathematically, derived the line spectrum and concluded, correctly for narrowband FM, that it offered no bandwidth saving over AM. Edwin Howard Armstrong was granted four patents on wideband FM on 26 December 1933, demonstrated the system to the Institute of Radio Engineers in 1935 and published "A method of reducing disturbances in radio signaling by a system of frequency modulation" in 1936. Commercial FM broadcasting began in the United States in 1941, and the band was moved to $88$–$108\,\mathrm{MHz}$ in 1945; the stereo multiplex system was approved in 1961. The phase-locked loop was described by Henri de Bellescize in 1932 for synchronous reception of AM, and the formulas for Bessel functions in [[#thm-fm-spectrum]] go back to Friedrich Bessel's study of planetary motion (1824), where the same integrals arose in Kepler's equation.
:::

::: summary
- Angle modulation keeps the amplitude constant: $\tilde s = A_ce^{j\phi(t)}$, with $\phi = k_pm$ (PM) or $\phi = 2\pi k_f\int m$ (FM); instantaneous frequency $f_i = f_c + \phi'/2\pi$.
- Tone FM has modulation index $\beta = \Delta f/f_m$ (peak phase deviation in radians) and line spectrum $A_c\sum J_n(\beta)\cos(2\pi(f_c + nf_m)t)$; the total power $\tfrac12A_c^2$ does not depend on $\beta$, and the carrier vanishes at $\beta = 2.405, 5.520, \dots$
- Narrowband FM ($\beta \ll 1$) is carrier plus quadrature DSB, bandwidth $2W$; wideband FM needs Carson's $B_T \approx 2(\Delta f + W)$.
- Direct FM uses a VCO (stabilised by a PLL); indirect FM multiplies the deviation of a crystal-controlled NBFM signal by frequency multiplication, with mixers to set the carrier.
- A discriminator (differentiator plus envelope detector, after a limiter) or a PLL demodulates FM; the PLL's VCO control voltage is $(2\pi k_f/K_v)m(t)$ when the loop tracks the input phase.
- The linearised PLL has $H(s) = KF(s)/(s + KF(s))$; a first-order loop has steady phase error $\Delta\omega/K$ and hold-in range $\pm K$, while a second-order loop with an integrator tracks frequency steps with zero steady error.
:::

## Exercises

::: exercise Modulation index {level=1 check="4"}
A $2\,\mathrm{kHz}$ tone produces a peak frequency deviation of $8\,\mathrm{kHz}$. What is the modulation index $\beta$?
::: solution
$\beta = \Delta f/f_m = 8/2 = 4$.
:::
:::

::: exercise Carson bandwidth {level=1 check="2*(5e3+3e3)"}
A two-way radio uses FM with peak deviation $5\,\mathrm{kHz}$ and speech limited to $3\,\mathrm{kHz}$. Find the Carson bandwidth in hertz.
::: solution
$B_T = 2(5 + 3) = 16\,\mathrm{kHz}$; such radios used $25\,\mathrm{kHz}$ channels (later narrowed to $12.5\,\mathrm{kHz}$ with $2.5\,\mathrm{kHz}$ deviation, Carson bandwidth $11\,\mathrm{kHz}$).
:::
:::

::: exercise Instantaneous frequency {level=1}
Find the instantaneous frequency of $s(t) = \cos(2\pi\cdot10^6t + 5\sin(2\pi\cdot10^3t))$ and its maximum and minimum values. If this is an FM signal, what is the message, up to a constant?
::: solution
$f_i = 10^6 + \frac{1}{2\pi}\cdot5\cdot2\pi\cdot10^3\cos(2\pi\cdot10^3t) = 10^6 + 5000\cos(2\pi\cdot10^3t)\,\mathrm{Hz}$, between $995$ and $1005\,\mathrm{kHz}$. As FM, $k_fm(t) = 5000\cos(2\pi\cdot10^3t)$: the message is a $1\,\mathrm{kHz}$ cosine (as PM it would be a sine).
:::
:::

::: exercise Carrier nulls {level=2 check="2.405*1000"}
A deviation meter is calibrated by modulating with a $1\,\mathrm{kHz}$ tone and increasing its level until the carrier first disappears. What is the peak frequency deviation, in hertz, at that point?
::: solution
The carrier amplitude is $A_cJ_0(\beta)$, which first vanishes at $\beta = 2.405$. Then $\Delta f = \beta f_m = 2405\,\mathrm{Hz}$. Repeating at the second null ($\beta = 5.520$) gives a second calibration point, $5520\,\mathrm{Hz}$.
:::
:::

::: exercise PM versus FM bandwidth {level=2}
A message $m(t) = \cos(2\pi f_mt)$ is applied to (a) an FM modulator with $k_f = 10\,\mathrm{kHz/V}$, and (b) a PM modulator with $k_p = 2\,\mathrm{rad/V}$. Find $\beta$ and the Carson bandwidth for $f_m = 1\,\mathrm{kHz}$ and $f_m = 5\,\mathrm{kHz}$ in each case.
::: solution
(a) FM: $\Delta f = 10\,\mathrm{kHz}$ for both. $f_m = 1\,\mathrm{kHz}$: $\beta = 10$, $B_T = 2(10 + 1) = 22\,\mathrm{kHz}$. $f_m = 5\,\mathrm{kHz}$: $\beta = 2$, $B_T = 2(10 + 5) = 30\,\mathrm{kHz}$.

(b) PM: $\beta = k_p = 2$ for both, and $\Delta f = \beta f_m$. $f_m = 1\,\mathrm{kHz}$: $\Delta f = 2\,\mathrm{kHz}$, $B_T = 2(2 + 1) = 6\,\mathrm{kHz}$. $f_m = 5\,\mathrm{kHz}$: $\Delta f = 10\,\mathrm{kHz}$, $B_T = 30\,\mathrm{kHz}$. PM bandwidth grows in proportion to the message frequency; FM bandwidth hardly changes.
:::
:::

::: exercise Frequency multiplication {level=2}
An NBFM signal at $f_1 = 1\,\mathrm{MHz}$ with $\beta_1 = 0.1$ for a $1\,\mathrm{kHz}$ tone is passed through a frequency tripler and then a frequency doubler, and finally mixed with $5\,\mathrm{MHz}$ (keeping the difference). Find the final carrier frequency, deviation and modulation index, and the Carson bandwidth.
::: solution
The initial deviation is $\beta_1f_m = 100\,\mathrm{Hz}$. Multiplication by $3\times2 = 6$ gives carrier $6\,\mathrm{MHz}$ and deviation $600\,\mathrm{Hz}$, $\beta = 0.6$. Mixing with $5\,\mathrm{MHz}$ gives a $1\,\mathrm{MHz}$ carrier with the same $600\,\mathrm{Hz}$ deviation and $\beta = 0.6$. Carson: $2(600 + 1000) = 3.2\,\mathrm{kHz}$.
:::
:::

::: exercise A first-order PLL with a frequency offset {level=2}
A first-order PLL with $K = 2\pi\times20\times10^3\,\mathrm{s^{-1}}$ locks to an input whose frequency is $3\,\mathrm{kHz}$ above the VCO's free-running frequency. Find the steady-state phase error in the linear model and with the exact sinusoidal phase detector. What is the largest offset it can hold?
::: solution
Linear: $\phi_e = \Delta\omega/K = (2\pi\cdot3000)/(2\pi\cdot20\,000) = 0.15\,\mathrm{rad}$. Exactly, the loop settles where $K\sin\phi_e = \Delta\omega$, so $\phi_e = \arcsin(0.15) = 0.1506\,\mathrm{rad}$ — almost the same. The hold-in range is $\lvert\Delta\omega\rvert < K$, i.e. offsets up to $20\,\mathrm{kHz}$; at that limit $\phi_e = \pi/2$ and the phase detector output cannot grow further.
:::
:::

::: exercise Power in the Carson band {level=3}
Using the series [[#eq-bessel]], compute $J_0, \dots, J_4$ at $\beta = 3$ to three decimal places, and find the fraction of the power of a tone-modulated FM signal with $\beta = 3$ within the Carson bandwidth. How many side-frequency pairs are needed for $99\,\%$ of the power?
::: hint
Carson's band covers $\lvert n\rvert \le \beta + 1 = 4$.
:::
::: solution
Summing the series: $J_0(3) = -0.260$, $J_1(3) = 0.339$, $J_2(3) = 0.486$, $J_3(3) = 0.309$, $J_4(3) = 0.132$. The fraction within $\lvert n\rvert \le 4$ is $J_0^2 + 2\sum_{n=1}^4J_n^2 = 0.0676 + 2(0.1150 + 0.2362 + 0.0955 + 0.0174) = 0.0676 + 0.9282 = 0.996$. With only three pairs: $0.0676 + 2(0.1150 + 0.2362 + 0.0955) = 0.961$, not enough; so four pairs are needed for $99\,\%$, exactly Carson's band.
:::
:::

::: exercise Two-tone FM and intermodulation {level=3}
An FM signal is modulated by two tones, $\phi(t) = \beta_1\sin(2\pi f_1t) + \beta_2\sin(2\pi f_2t)$. Show that its spectrum contains lines at $f_c + nf_1 + kf_2$ for all integers $n, k$, with amplitudes $A_cJ_n(\beta_1)J_k(\beta_2)$. Explain why this shows that FM is nonlinear, and identify the lines that would be absent for a linear modulation.
::: hint
Write the complex envelope as a product of two exponentials and expand each with [[#thm-fm-spectrum]].
:::
::: solution
$\tilde s = A_ce^{j\beta_1\sin(2\pi f_1t)}e^{j\beta_2\sin(2\pi f_2t)} = A_c\sum_nJ_n(\beta_1)e^{j2\pi nf_1t}\sum_kJ_k(\beta_2)e^{j2\pi kf_2t} = A_c\sum_{n,k}J_n(\beta_1)J_k(\beta_2)e^{j2\pi(nf_1 + kf_2)t}$. Taking $\operatorname{Re}\{\tilde se^{j2\pi f_ct}\}$ gives lines at $f_c + nf_1 + kf_2$ with amplitudes $A_cJ_n(\beta_1)J_k(\beta_2)$. For a linear modulation (DSB, AM), the spectrum for the sum of two tones would be the sum of the two single-tone spectra, with lines only at $f_c$, $f_c \pm nf_1$ ($k = 0$) and $f_c \pm kf_2$ ($n = 0$). The cross-product lines with $n \ne 0$ and $k \ne 0$, such as $f_c + f_1 - f_2$, are intermodulation terms that exist only because $e^{j(\phi_1 + \phi_2)} \neq e^{j\phi_1} + e^{j\phi_2}$. They are not distortion: the discriminator recovers $\phi'$ exactly.
:::
:::

::: exercise Designing a second-order PLL {level=3}
A second-order PLL [[#eq-pll2]] must track a frequency step of $\Delta f = 2\,\mathrm{kHz}$ with a peak phase error below $0.5\,\mathrm{rad}$, using $\zeta = 0.707$. (a) Find the minimum natural frequency $f_n = \omega_n/2\pi$, using the peak of [[#eq-pll-step]]. (b) With $K = 2\pi\times10^5\,\mathrm{s^{-1}}$, find $\tau_1$ and $\tau_2$. (c) How long does the error take to fall below $1\,\%$ of $\Delta\omega/\omega_n$?
::: hint
For $\zeta = 0.707$ the maximum of $e^{-\zeta x}\sin(\sqrt{1-\zeta^2}x)/\sqrt{1-\zeta^2}$ is about $0.456$.
:::
::: solution
(a) The peak error is $0.456\,\Delta\omega/\omega_n \le 0.5$, so $\omega_n \ge 0.912\,\Delta\omega = 0.912\cdot2\pi\cdot2000$, $f_n \ge 1.82\,\mathrm{kHz}$. Take $f_n = 2\,\mathrm{kHz}$, $\omega_n = 1.257\times10^4\,\mathrm{s^{-1}}$, peak error $0.456\cdot(2\pi\cdot2000)/\omega_n = 0.456\,\mathrm{rad}$.

(b) $\tau_1 = K/\omega_n^2 = 6.283\times10^5/(1.579\times10^8) = 3.98\,\mathrm{ms}$, and $\tau_2 = 2\zeta/\omega_n = 1.414/1.257\times10^4 = 112.5\,\mathrm{\mu s}$.

(c) The envelope of the error is $e^{-\zeta\omega_nt}/\sqrt{1 - \zeta^2}$ (in units of $\Delta\omega/\omega_n$); it falls below $0.01$ when $\zeta\omega_nt = \ln(100/\sqrt{1 - \zeta^2}) = \ln(141.4) = 4.95$, i.e. $t = 4.95/(0.707\cdot1.257\times10^4) = 0.56\,\mathrm{ms}$.
:::
:::
