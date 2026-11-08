Every telephone call that crosses a modern network, every song on a compact disc and every reading from a digital sensor began as an analog waveform and was turned into a stream of bits by the same three steps: **sample** it in time, **quantise** each sample to one of a finite set of levels, and **encode** the level as a binary word. The result is **pulse-code modulation** (PCM). The digital telephone channel, for example, is $8000$ samples per second of $8$ bits each, $64\,\mathrm{kbit/s}$. Once a message is a sequence of bits it can be regenerated without loss at every repeater, multiplexed with other messages, encrypted, compressed, protected by error-correcting codes and stored indefinitely. Analog signals can do none of these things.

The price is paid twice. Quantisation replaces the exact sample by a nearby level and so adds an error that no receiver can remove. And a bit stream needs more bandwidth than the analog message it carries, typically $8$ to $16$ times more. This lesson quantifies both costs. We review practical sampling, derive the famous rule that each additional bit buys $6\,\mathrm{dB}$ of signal-to-quantisation-noise ratio, show how **companding** makes that ratio nearly independent of the speaker's loudness, analyse **delta modulation** as a one-bit alternative, and assemble many PCM channels into a **time-division multiplexed** stream such as T1 or E1. We will find, as promised at the end of [[communication-systems/noise-in-analog-systems]], that PCM trades bandwidth for signal-to-noise ratio *exponentially*, where FM managed only a square law.

## Sampling in practice {#sec-sampling}

The sampling theorem of [[signals-systems/sampling]] says that a signal band-limited to $W$ hertz is determined by its samples taken at any rate $f_s > 2W$, and that ideal low-pass filtering of the impulse-sampled signal recovers it exactly. A communication engineer has to turn that idealisation into hardware, and three departures from it matter.

First, real messages are not strictly band-limited. Speech has energy well above $4\,\mathrm{kHz}$, and any component above $f_s/2$ folds back into the band as an **alias** that cannot be removed afterwards. So every PCM encoder starts with an **anti-aliasing filter**, a low-pass filter that limits the message to $W$ before sampling. Second, no filter is ideal, so the sampling rate is chosen above $2W$ to leave a **guard band** between $W$ and $f_s - W$ in which the anti-aliasing and reconstruction filters can roll off. Telephony filters speech to $300$–$3400\,\mathrm{Hz}$ and samples at $8\,\mathrm{kHz}$, leaving a guard band from $3.4$ to $4.6\,\mathrm{kHz}$; the compact disc filters audio to $20\,\mathrm{kHz}$ and samples at $44.1\,\mathrm{kHz}$. Third, the samples are not impulses but pulses of finite width.

::: definition Pulse-amplitude modulation {#def-pam}
**Pulse-amplitude modulation** (PAM) represents a message $m(t)$ by a train of pulses whose amplitudes are the samples $m(nT_s)$, $T_s = 1/f_s$. In **flat-top** PAM each pulse is a rectangle $p(t)$ of width $\tau \le T_s$ starting at the sampling instant, as produced by a sample-and-hold circuit:

$$
s(t) = \sum_{n} m(nT_s)\,p(t - nT_s), \qquad p(t) = \begin{cases}1, & 0 \le t < \tau,\\ 0, & \text{otherwise.}\end{cases}
$$ {#eq-pam}
:::

A PAM signal is still analog, because its amplitudes are continuous; it is the intermediate step inside every analog-to-digital converter and the input to the quantiser. Its spectrum shows a small but systematic distortion.

::: theorem Aperture effect {#thm-aperture}
The spectrum of flat-top PAM is

$$
S(f) = P(f)\,f_s\sum_{k=-\infty}^{\infty} M(f - kf_s), \qquad P(f) = \tau\,\frac{\sin(\pi f\tau)}{\pi f\tau}\,e^{-j\pi f\tau} .
$$ {#eq-aperture}

Low-pass filtering $s(t)$ to $W$ therefore yields the message filtered by $P(f)$: its spectrum is attenuated by the factor $\lvert\sin(\pi f\tau)/(\pi f\tau)\rvert$, which falls from $1$ at $f = 0$ to $0.637$ ($-3.9\,\mathrm{dB}$) at $f = 1/(2\tau)$, and delayed by $\tau/2$.
:::

::: proof
Flat-top PAM is ideal impulse sampling followed by a filter with impulse response $p(t)$: $s(t) = p(t) * \sum_n m(nT_s)\delta(t - nT_s)$. By [[signals-systems/sampling#thm-spectrum]] the impulse-sampled signal has spectrum $f_s\sum_k M(f - kf_s)$, and convolution in time is multiplication in frequency, so $S(f) = P(f)f_s\sum_k M(f - kf_s)$. The transform of a rectangle of width $\tau$ starting at $t = 0$ is $\tau\,\mathrm{sinc}$-shaped with the linear phase $e^{-j\pi f\tau}$ of a delay $\tau/2$. The low-pass filter keeps only the $k = 0$ term, $f_sP(f)M(f)$.
:::

The distortion is called the **aperture effect** because it grows with the width ("aperture") of the pulse. For narrow pulses ($\tau \ll T_s$) it is negligible: with $\tau = T_s/10$ at telephone rates the attenuation at $3.4\,\mathrm{kHz}$ is $0.03\,\mathrm{dB}$. A digital-to-analog converter that holds each output value for the whole sample period ($\tau = T_s$) shows the full effect, $-2.75\,\mathrm{dB}$ at $3.4\,\mathrm{kHz}$ when $f_s = 8\,\mathrm{kHz}$, and is followed by an **equaliser** with gain $(\pi f\tau)/\sin(\pi f\tau)$ in the passband.

## Quantisation {#sec-quantisation}

A sample $m(nT_s)$ can take any value in a continuum; a binary word of $n$ bits can name only $L = 2^n$ values. A **quantiser** maps each sample to the nearest of $L$ allowed levels. The difference between the input and the output is the **quantisation error**, and it is the one irreversible step in PCM.

::: definition Uniform quantiser {#def-quantiser}
A **uniform quantiser** with $L$ levels and **overload level** $m_p$ divides the range $[-m_p, m_p]$ into $L$ intervals of equal width, the **step size**

$$
\Delta = \frac{2m_p}{L} ,
$$ {#eq-step}

and maps every input in an interval to its midpoint (a **mid-rise** quantiser when $L$ is even, with output levels $\pm\Delta/2, \pm3\Delta/2, \dots, \pm(L - 1)\Delta/2$). Inputs beyond $\pm m_p$ are mapped to the outermost levels (**overload** or **clipping**). The **quantisation error** is $q = Q(x) - x$; within the range it satisfies $\lvert q\rvert \le \Delta/2$.
:::

::: widget plot
f: 2^(1 - n)*(floor(x*2^(n - 1)) + 0.5); x; x - 2^(1 - n)*(floor(x*2^(n - 1)) + 0.5)
x: -1, 1
y: -1.1, 1.1
sliders: n=3:1:6:1
labels: Q(x); x; \text{error } x - Q(x)
caption: A mid-rise uniform quantiser on $[-1, 1]$ with $n$ bits, i.e. $L = 2^n$ levels and step $\Delta = 2/2^n$ (orange: the identity, green: the quantisation error). The error is a sawtooth of peak $\Delta/2$ whatever the input, and a busy input sweeps it through its whole range, which is why its mean square is $\Delta^2/12$. Add one bit: the step and the error amplitude halve, which is a quarter of the power, or $6\,\mathrm{dB}$.
:::

To compute the power of the error we need a model. When the input is busy (it changes by many steps between samples and does not dwell on particular values) and the step is small compared with the signal's range, the error behaves like a random variable spread evenly over one step, uncorrelated with the signal and from sample to sample. This **additive-noise model** of quantisation is excellent for speech, music and video at $6$ bits or more, and poor for very coarse quantisers or for signals that sit still (a constant input produces a constant error, not noise).

::: theorem Quantisation noise and the 6-dB-per-bit rule {#thm-sqnr}
If the quantisation error is uniformly distributed on $[-\Delta/2, \Delta/2]$, its mean-square value is

$$
\sigma_q^2 = \frac{\Delta^2}{12} .
$$ {#eq-q-noise}

For a message of power $P_m$ that does not overload a uniform quantiser with $L = 2^n$ levels, the **signal-to-quantisation-noise ratio** is

$$
\mathrm{SQNR} = \frac{P_m}{\Delta^2/12} = 3L^2\,\frac{P_m}{m_p^2} = 3\cdot4^n\,\frac{P_m}{m_p^2},
$$ {#eq-sqnr}

or in decibels

$$
\mathrm{SQNR_{dB}} = 6.02\,n + 4.77 + 10\log_{10}\frac{P_m}{m_p^2} .
$$ {#eq-sqnr-db}

For a full-scale sinusoid ($P_m = m_p^2/2$) this is $6.02\,n + 1.76\,\mathrm{dB}$.
:::

::: proof
With $q$ uniform on $[-\Delta/2, \Delta/2]$ the density is $1/\Delta$ and

$$
\E[q^2] = \frac{1}{\Delta}\int_{-\Delta/2}^{\Delta/2} q^2\,\dd q = \frac{1}{\Delta}\cdot\frac{2}{3}\Big(\frac{\Delta}{2}\Big)^3 = \frac{\Delta^2}{12} .
$$

Substituting $\Delta = 2m_p/L$ gives $\sigma_q^2 = m_p^2/(3L^2)$, so $\mathrm{SQNR} = 3L^2P_m/m_p^2$. With $L = 2^n$, $10\log_{10}(4^n) = 20n\log_{10}2 = 6.02n$ and $10\log_{10}3 = 4.77$. For the sinusoid, $10\log_{10}(3/2) = 1.76$.
:::

The rule "$6\,\mathrm{dB}$ per bit" is one of the most used facts in signal processing. A 16-bit audio converter offers at most about $98\,\mathrm{dB}$; an 8-bit video converter about $50\,\mathrm{dB}$. The last term of [[#eq-sqnr-db]] is the **loading factor**: it is negative because a real signal must have its peak inside the range and its mean power well below the peak. A speech or noise-like signal is usually loaded so that its RMS value is about a quarter of $m_p$ (a Gaussian signal then clips on fewer than one sample in ten thousand), giving $10\log_{10}(1/16) = -12.0\,\mathrm{dB}$.

::: warning Peak, RMS and the loading factor
The $6.02n + 1.76\,\mathrm{dB}$ figure quoted in converter data sheets is for a *full-scale sinusoid*. Speech, music and modulated signals have much higher peak-to-RMS ratios, and the SQNR they actually receive is lower by the difference: about $10\,\mathrm{dB}$ for a Gaussian-like signal loaded at $4\sigma$, and much more when the signal is quieter than the level the system was designed for. Always state what signal an SQNR refers to.
:::

::: example The compact disc {#ex-cd}
A compact disc stores two audio channels sampled at $44.1\,\mathrm{kHz}$ with $16$-bit uniform quantisation. (a) Find the audio bit rate. (b) Find the SQNR for a full-scale sinusoid and for a Gaussian-like music signal with RMS value $m_p/4$. (c) A quiet passage is $30\,\mathrm{dB}$ below the level in (b). What is its SQNR?
::: solution
(a) $R = 2 \times 44\,100 \times 16 = 1\,411\,200\,\mathrm{bit/s} \approx 1.41\,\mathrm{Mbit/s}$. (Error correction and framing on the disc roughly double the channel rate, but that is not audio data.)

(b) Full-scale sinusoid: $6.02 \times 16 + 1.76 = 98.1\,\mathrm{dB}$. With $P_m/m_p^2 = 1/16$: $6.02 \times 16 + 4.77 - 12.04 = 89.1\,\mathrm{dB}$.

(c) The quantisation noise is unchanged ($\Delta$ is fixed) and the signal power is $30\,\mathrm{dB}$ lower, so $\mathrm{SQNR} = 59.1\,\mathrm{dB}$. Uniform quantisation gives quiet signals a poor ratio, a point we return to in the section on companding.
:::
:::

## The PCM system {#sec-pcm}

A complete PCM link has the blocks shown in the table: each sample's level index is written as an $n$-bit binary word, the words are sent one after another, and the receiver regenerates the bits, decodes each word to its level, and low-pass filters the resulting staircase (with aperture equalisation) to recover the message.

| transmitter | channel | receiver |
|---|---|---|
| anti-aliasing filter ($W$) → sampler ($f_s$) → quantiser ($L = 2^n$) → encoder | $n f_s$ bits per second, with regenerative repeaters | bit detector → decoder → reconstruction filter |

::: theorem Bit rate and bandwidth of PCM {#thm-pcm-rate}
A PCM system with sampling rate $f_s$ and $n$ bits per sample produces a bit rate

$$
R_b = n f_s .
$$ {#eq-pcm-rate}

Sent as binary pulses, this needs a transmission bandwidth of at least $B_T = R_b/2 = nf_s/2$ (the Nyquist bandwidth of [[communication-systems/baseband-transmission]]). At the Nyquist sampling rate $f_s = 2W$ the minimum bandwidth is $B_T = nW$, and the SQNR [[#eq-sqnr]] can be written

$$
\mathrm{SQNR} = 3\,\frac{P_m}{m_p^2}\,2^{2B_T/W} .
$$ {#eq-pcm-exchange}
:::

::: proof
Each of the $f_s$ samples per second contributes $n$ bits, giving [[#eq-pcm-rate]]. That $R$ binary symbols per second need at least $R/2$ hertz is the Nyquist result proved in the next lesson. With $f_s = 2W$ and $B_T = nW$ we have $n = B_T/W$ and $4^n = 2^{2B_T/W}$; substitute into [[#eq-sqnr]].
:::

Equation [[#eq-pcm-exchange]] is the PCM exchange of bandwidth for signal-to-noise ratio: each extra bit adds $W$ hertz of bandwidth and multiplies the SQNR by four. Compare FM, whose output SNR grows as $\beta^2$, roughly the square of the bandwidth. PCM's exponential law has the same form as the ideal exchange [[communication-systems/noise-in-analog-systems#eq-ideal-exchange]] that Shannon's capacity theorem allows, although with a smaller base.

::: example Designing a telemetry PCM link {#ex-pcm-design}
A pressure sensor produces a noise-like signal band-limited to $W = 5\,\mathrm{kHz}$, which must be digitised with an SQNR of at least $50\,\mathrm{dB}$. The quantiser is set to overload at four times the RMS value. The anti-aliasing filter needs a guard band of $20\,\%$ of $W$. Choose $n$ and $f_s$ and find the bit rate and minimum transmission bandwidth.
::: solution
The loading factor is $10\log_{10}(1/16) = -12.04\,\mathrm{dB}$, so [[#eq-sqnr-db]] requires $6.02n + 4.77 - 12.04 \ge 50$, i.e. $n \ge 57.27/6.02 = 9.51$. Take $n = 10$, which gives $\mathrm{SQNR} = 60.21 + 4.77 - 12.04 = 52.9\,\mathrm{dB}$, a margin of $2.9\,\mathrm{dB}$.

A guard band of $0.2W = 1\,\mathrm{kHz}$ means $f_s - W \ge W + 1\,\mathrm{kHz}$, so $f_s \ge 2W + 1\,\mathrm{kHz} = 11\,\mathrm{kHz}$; choose a convenient $f_s = 12\,\mathrm{kHz}$, which also gives the filter a little more room. Then $R_b = 10 \times 12\,000 = 120\,\mathrm{kbit/s}$ and $B_T \ge 60\,\mathrm{kHz}$, twelve times the message bandwidth. Nine bits would have been $1.1\,\mathrm{dB}$ short of the specification; the price of each $6\,\mathrm{dB}$ is $12\,\mathrm{kbit/s}$.
:::
:::

### Regeneration and the effect of bit errors

The great advantage of a digital signal is that a repeater does not amplify the noise along with the signal: it decides which bit was sent and transmits a clean new pulse. Noise accumulates only through the occasional wrong decision, and the error probability per hop can be made very small by giving each hop enough signal-to-noise ratio (we compute how much in [[communication-systems/optimal-detection]]). After $k$ hops with bit error probability $p$ each, the end-to-end error probability is about $kp$, whereas an analog chain of $k$ identical amplified hops loses $10\log_{10}k$ decibels of SNR.

Bit errors that do get through add a second kind of noise at the decoder output. Its size depends strongly on *which* bit is wrong: an error in the most significant bit moves the decoded level by half the range.

::: theorem Output SNR of PCM with bit errors {#thm-pcm-errors}
Consider a uniform $n$-bit quantiser with natural binary coding, a message uniformly distributed over $[-m_p, m_p]$, and independent bit errors of probability $P_b$ (small enough that two errors in one word are negligible). Then the output signal-to-noise ratio is

$$
\mathrm{SNR}_o = \frac{4^n}{1 + 4P_b\,(4^n - 1)} \approx \frac{4^n}{1 + 4P_b\,4^n} .
$$ {#eq-pcm-errors}

For $4P_b4^n \ll 1$ the system is quantisation-limited ($\mathrm{SNR}_o \approx 4^n$, i.e. $6.02n\,\mathrm{dB}$); for $4P_b4^n \gg 1$ it is error-limited ($\mathrm{SNR}_o \approx 1/(4P_b)$), independent of $n$.
:::

::: proof
An error in bit $k$ (weight $2^k$, $k = 0, \dots, n - 1$) changes the decoded level by $\pm2^k\Delta$. With single errors the mean-square error contributed per sample is

$$
\sigma_e^2 = P_b\sum_{k=0}^{n-1}(2^k\Delta)^2 = P_b\Delta^2\,\frac{4^n - 1}{3} .
$$

The quantisation error is independent of the channel error, so the powers add: $\sigma_q^2 + \sigma_e^2 = \frac{\Delta^2}{12}\big[1 + 4P_b(4^n - 1)\big]$. A uniform message on $[-m_p, m_p]$ has power $m_p^2/3 = (L\Delta/2)^2/3 = 4^n\Delta^2/12$. Dividing gives [[#eq-pcm-errors]].
:::

The output SNR therefore has a **threshold**, like FM. Above it (small $P_b$) the receiver is limited by quantisation and the channel noise is invisible; below it the SNR collapses quickly, since $P_b$ grows very fast as the channel SNR drops. For $8$-bit PCM the threshold, where the two noise terms are equal, is at $P_b = 1/(4\cdot4^8) \approx 4\times10^{-6}$. A PCM link is therefore designed to run at $P_b \le 10^{-6}$ or better, where its output quality is set entirely by $n$.

::: quiz
An 8-bit PCM link ($6.02 \times 8 = 48.2\,\mathrm{dB}$ quantisation-limited) suffers bit errors with $P_b = 10^{-4}$. Roughly what is its output SNR?
- [ ] $48\,\mathrm{dB}$: the bit errors are too rare to matter
- [x] About $34\,\mathrm{dB}$: the channel errors dominate
- [ ] About $40\,\mathrm{dB}$: errors cost exactly one bit
- [ ] $0\,\mathrm{dB}$: the link is useless
::: solution
$4P_b4^n = 4 \times 10^{-4} \times 65\,536 = 26.2$, so $\mathrm{SNR}_o = 65\,536/27.2 = 2410$, i.e. $33.8\,\mathrm{dB}$. One wrong bit in ten thousand looks harmless, but the errors in the most significant bits are huge, and $1/(4P_b) = 2500$ ($34\,\mathrm{dB}$) is the ceiling no matter how many bits are used.
:::
:::

## Companding {#sec-companding}

The SQNR [[#eq-sqnr]] of a uniform quantiser is proportional to the signal power. Telephone speech varies by $30$ to $40\,\mathrm{dB}$ between a loud and a quiet talker, and within a sentence between vowels and consonants. A uniform quantiser fine enough for the quiet talker wastes bits on the loud one. What we want is a constant *relative* accuracy: small steps for small amplitudes and large steps for large ones, so that the SQNR depends little on the level.

The standard solution is to pass the signal through a **compressor**, a memoryless nonlinearity $y = c(x)$ that expands small values and compresses large ones, quantise $y$ uniformly, and apply the inverse **expander** $c^{-1}$ at the receiver. The combination is called **companding**. A step $\Delta$ in $y$ corresponds to a step $\Delta/c'(x)$ in $x$, so the effective step size is small where the slope $c'$ is large.

::: definition μ-law and A-law companding {#def-companding}
For an input normalised to $\lvert x\rvert \le m_p$, the **μ-law** compressor is

$$
c(x) = m_p\,\frac{\ln(1 + \mu\lvert x\rvert/m_p)}{\ln(1 + \mu)}\,\operatorname{sgn}x ,
$$ {#eq-mu-law}

with $\mu = 255$ in North America and Japan. The **A-law** compressor, used in Europe and most of the world with $A = 87.6$, is linear for $\lvert x\rvert/m_p \le 1/A$ and logarithmic above:

$$
c(x) = m_p\operatorname{sgn}x\cdot\begin{cases}\dfrac{A\lvert x\rvert/m_p}{1 + \ln A}, & 0 \le \lvert x\rvert/m_p \le 1/A,\\[2ex] \dfrac{1 + \ln(A\lvert x\rvert/m_p)}{1 + \ln A}, & 1/A \le \lvert x\rvert/m_p \le 1.\end{cases}
$$ {#eq-a-law}

Both are combined with $8$-bit quantisation in the ITU-T standard G.711, which defines $64\,\mathrm{kbit/s}$ telephone PCM.
:::

::: theorem SQNR of a μ-law quantiser {#thm-mu-sqnr}
With the additive-noise model and $L$ levels after a μ-law compressor, the SQNR for a message of power $P_m$ and mean absolute value $\E\lvert x\rvert$ is

$$
\mathrm{SQNR} = \frac{3L^2}{[\ln(1 + \mu)]^2}\cdot\frac{P_m}{m_p^2/\mu^2 + 2m_p\E\lvert x\rvert/\mu + P_m} .
$$ {#eq-mu-sqnr}

For signals large enough that $\mu\lvert x\rvert \gg m_p$ most of the time, $\mathrm{SQNR} \approx 3L^2/[\ln(1 + \mu)]^2$, independent of the signal level. For $\mu = 255$ and $L = 256$ this is $38.1\,\mathrm{dB}$.
:::

::: proof
The compressed signal $y$ is quantised uniformly with step $\Delta = 2m_p/L$. Near an input value $x$ the effective step is $\Delta/c'(x)$, so the conditional mean-square error is $\Delta^2/(12c'(x)^2)$, and averaging over the input,

$$
\sigma_q^2 = \frac{\Delta^2}{12}\,\E\Big[\frac{1}{c'(x)^2}\Big] .
$$

Differentiating [[#eq-mu-law]] gives $c'(x) = \mu/[(1 + \mu\lvert x\rvert/m_p)\ln(1 + \mu)]$. Hence

$$
\sigma_q^2 = \frac{\Delta^2[\ln(1 + \mu)]^2}{12\mu^2}\,\E\Big[\Big(1 + \frac{\mu\lvert x\rvert}{m_p}\Big)^2\Big] = \frac{m_p^2[\ln(1 + \mu)]^2}{3L^2\mu^2}\Big(1 + \frac{2\mu\E\lvert x\rvert}{m_p} + \frac{\mu^2P_m}{m_p^2}\Big) .
$$

Dividing $P_m$ by this and multiplying numerator and denominator by $m_p^2/\mu^2$ gives [[#eq-mu-sqnr]]. When $\mu\lvert x\rvert \gg m_p$, the last term of the denominator dominates and the ratio tends to $3L^2/[\ln(1 + \mu)]^2$.
:::

::: widget plot
f: 10*log10(1.5*4^n*10^(x/10)); 10*log10(3*4^n/ln(1 + u)^2*(10^(x/10)/2)/(1/u^2 + 4*10^(x/20)/(pi*u) + 10^(x/10)/2))
x: -60, 0
y: 0, 80
sliders: n=8:4:12:1; u=255:5:500:1
labels: \text{uniform}; \mu\text{-law}
caption: SQNR in decibels of a sinusoid of peak amplitude $x$ dB relative to the overload level, for an $n$-bit uniform quantiser (blue) and an $n$-bit μ-law quantiser (orange). With $n = 8$ and $\mu = 255$ the μ-law curve stays within a few decibels of $38\,\mathrm{dB}$ over a $40\,\mathrm{dB}$ range of levels, while the uniform curve falls $1\,\mathrm{dB}$ for every decibel of level. Above about $-12\,\mathrm{dB}$ uniform quantisation is better. Vary $\mu$: a larger value widens the flat region but lowers the plateau. Try $n = 12$ uniform against $n = 8$ μ-law at $-40\,\mathrm{dB}$: they are about equal, which is what companding saves.
:::

::: example Companded versus uniform telephone PCM {#ex-companding}
Compare 8-bit uniform and 8-bit μ-law ($\mu = 255$) quantisation for a sinusoid at the overload level and at $20$ and $40\,\mathrm{dB}$ below it. How many bits would a uniform quantiser need to match the μ-law SQNR at $-40\,\mathrm{dB}$?
::: solution
For a sinusoid of amplitude $a$ (with $m_p = 1$): $P_m = a^2/2$ and $\E\lvert x\rvert = 2a/\pi$. The uniform SQNR is $3L^2a^2/2$, i.e. $49.9\,\mathrm{dB}$ at $a = 1$, falling to $29.9\,\mathrm{dB}$ at $-20\,\mathrm{dB}$ and $9.9\,\mathrm{dB}$ at $-40\,\mathrm{dB}$.

For μ-law, $3L^2/[\ln256]^2 = 196\,608/30.75 = 6394$ ($38.1\,\mathrm{dB}$). At $a = 1$ the second fraction of [[#eq-mu-sqnr]] is $0.5/(1.5\times10^{-5} + 0.00499 + 0.5) = 0.990$, so $\mathrm{SQNR} = 38.0\,\mathrm{dB}$. At $a = 0.1$ ($-20\,\mathrm{dB}$): $0.005/(1.5\times10^{-5} + 0.000499 + 0.005) = 0.907$, giving $37.6\,\mathrm{dB}$. At $a = 0.01$ ($-40\,\mathrm{dB}$): $5\times10^{-5}/(1.5\times10^{-5} + 4.99\times10^{-5} + 5\times10^{-5}) = 0.435$, giving $34.4\,\mathrm{dB}$.

To reach $34.4\,\mathrm{dB}$ at $-40\,\mathrm{dB}$ a uniform quantiser needs $6.02n + 1.76 - 40 \ge 34.4$, i.e. $n \ge 12.01$: about $12$ bits ($12$ bits give $34.0\,\mathrm{dB}$). Companding saves four bits per sample, $32\,\mathrm{kbit/s}$ per telephone channel, at the cost of $12\,\mathrm{dB}$ for the loudest signals. (A simulation of the actual quantiser gives $37.6$, $38.3$ and $34.0\,\mathrm{dB}$, close to the model.)
:::
:::

::: remark Segmented companding in practice
G.711 codecs do not compute logarithms. They approximate the μ-law or A-law curve by eight straight segments per polarity, each with sixteen uniform steps and each segment's step double the previous one's. The 8-bit word is one sign bit, three bits for the segment and four for the step within it: a tiny floating-point format with a 3-bit exponent and 4-bit mantissa. This view explains the constant relative accuracy: floating-point numbers have it by construction.
:::

## Delta modulation and differential PCM {#sec-delta}

Successive samples of a speech or video signal are strongly correlated, especially when the signal is sampled faster than the Nyquist rate. Sending each sample in full repeats much of what the receiver already knows. **Differential** schemes send only the change from a prediction. The simplest, **delta modulation**, uses one bit per sample.

::: definition Delta modulation {#def-dm}
A **delta modulator** keeps a staircase approximation $\hat m[n]$ of the message. At each sampling instant it compares the message with the staircase and sends one bit $b[n] = \operatorname{sgn}(m(nT_s) - \hat m[n - 1])$; both transmitter and receiver then update

$$
\hat m[n] = \hat m[n - 1] + \delta\,b[n] ,
$$ {#eq-dm}

where $\delta$ is the fixed **step size**. The receiver's staircase, low-pass filtered to $W$, is the output. The bit rate equals the sampling rate, $R_b = f_s$, which is chosen many times the Nyquist rate.
:::

The staircase can rise or fall by at most $\delta$ per sample, a slope of $\delta f_s$. If the message changes faster than that, the staircase falls behind (**slope overload**); if the message is nearly constant, the staircase hunts up and down around it by $\pm\delta$ (**granular noise**). The step size must balance the two.

::: theorem SNR of delta modulation {#thm-dm-snr}
Slope overload is avoided if $\delta f_s \ge \max\lvert m'(t)\rvert$; for a tone $m(t) = A\cos(2\pi f_mt)$ this requires $A \le \delta f_s/(2\pi f_m)$. Modelling the granular error as uniform on $[-\delta, \delta]$ with a flat spectrum from $0$ to $f_s$ (the conventional model: the error is a ripple at about half the sampling rate with sharp steps), the output noise after a low-pass filter of bandwidth $W$ is $\sigma^2 = \delta^2W/(3f_s)$, and for the largest tone without overload the output SNR is

$$
\mathrm{SNR}_o = \frac{3f_s^3}{8\pi^2f_m^2W} .
$$ {#eq-dm-snr}
:::

::: proof
The staircase can follow a slope of at most $\delta/T_s = \delta f_s$. The tone's derivative has peak $2\pi f_mA$, hence the condition on $A$. A uniform error on $[-\delta, \delta]$ has mean square $(2\delta)^2/12 = \delta^2/3$. If this power is spread evenly over the band from $0$ to $f_s$, the fraction passed by a low-pass filter of bandwidth $W$ is $W/f_s$, giving $\sigma^2 = \delta^2W/(3f_s)$. The tone's power at the overload limit is $A^2/2 = \delta^2f_s^2/(8\pi^2f_m^2)$. The ratio is $\dfrac{\delta^2f_s^2}{8\pi^2f_m^2}\cdot\dfrac{3f_s}{\delta^2W} = \dfrac{3f_s^3}{8\pi^2f_m^2W}$.
:::

The SNR grows as $f_s^3$, $9\,\mathrm{dB}$ per doubling of the sampling (and bit) rate. Doubling PCM's bit rate, by contrast, doubles $n$ and adds $6n\,\mathrm{dB}$: far more for any useful $n$. Delta modulation is therefore inefficient at high quality but very simple, and robust to bit errors because every bit has the same small weight.

::: example Delta modulation of speech {#ex-dm}
A delta modulator for telephone speech ($W = 3.4\,\mathrm{kHz}$) is tested with an $800\,\mathrm{Hz}$ tone of amplitude $1\,\mathrm{V}$. (a) At $f_s = 64\,\mathrm{kHz}$, find the smallest step that avoids slope overload and the resulting SNR. (b) What sampling rate would give $30\,\mathrm{dB}$? (c) Compare with PCM at the same bit rate.
::: solution
(a) $\delta \ge 2\pi f_mA/f_s = 2\pi \times 800 \times 1/64\,000 = 78.5\,\mathrm{mV}$. Then

$$
\mathrm{SNR}_o = \frac{3 \times (64\times10^3)^3}{8\pi^2 \times 800^2 \times 3400} = 4580, \quad\text{i.e. } 36.6\,\mathrm{dB}.
$$

(b) Setting [[#eq-dm-snr]] equal to $1000$ and solving for $f_s$: $f_s^3 = 1000 \times 8\pi^2 \times 800^2 \times 3400/3$, so $f_s = 38.5\,\mathrm{kHz}$.

(c) $64\,\mathrm{kbit/s}$ is the rate of $8$-bit PCM at $8\,\mathrm{kHz}$, which gives $6.02 \times 8 + 1.76 = 49.9\,\mathrm{dB}$ for a full-scale tone (uniform) or about $38\,\mathrm{dB}$ over a wide range of levels (μ-law). Delta modulation is $13\,\mathrm{dB}$ worse than uniform PCM at full scale, and its result applies only at the one amplitude where the step is just right: a quieter tone has the same granular noise and less signal.
:::
:::

Two refinements remove most of delta modulation's weaknesses. **Adaptive delta modulation** enlarges the step after several bits of the same sign (the staircase is falling behind) and shrinks it when the bits alternate (it is hunting). **Differential PCM** (DPCM) subtracts a linear prediction $\hat m[n]$ of each sample, computed from past reconstructed samples, and quantises the prediction error with several bits. Since the error has a smaller variance than the signal, the same SQNR needs fewer bits; with adaptive prediction and quantisation (ADPCM, ITU-T G.726) telephone quality is achieved at $32\,\mathrm{kbit/s}$, half the rate of G.711.

::: application Sigma-delta converters
Almost every audio analog-to-digital converter today is a **sigma-delta** ($\Sigma\Delta$) modulator: a one-bit (or few-bit) quantiser inside a feedback loop with an integrator, sampled at $64$ or more times the Nyquist rate. Oversampling alone spreads the quantisation noise over a band $K = f_s/(2W)$ times wider, so a filter keeps only $1/K$ of it ($3\,\mathrm{dB}$ per octave of oversampling). The loop also *shapes* the noise, pushing it to high frequencies where the digital decimation filter removes it, so that a first-order loop gains $9\,\mathrm{dB}$ per octave and higher-order loops more. The analysis is exercise [[#ex-noise-shaping]].
:::

## Time-division multiplexing {#sec-tdm}

A PCM channel at $64\,\mathrm{kbit/s}$ is a small fraction of what a cable or fibre can carry. Many channels share one link by **time-division multiplexing** (TDM): the bits (or words) of the channels are interleaved in a repeating **frame**, and each channel owns fixed **time slots** in every frame. The receiver must know where each frame starts, so the frame also carries a **framing pattern**, a known bit sequence it can search for.

::: definition TDM frame {#def-tdm}
A synchronous TDM frame of duration $T_F$ carries one word of $n$ bits from each of $N$ channels plus $F$ overhead bits for framing and signalling. When each channel is sampled once per frame ($T_F = 1/f_s$), the line rate is

$$
R = \frac{Nn + F}{T_F} = (Nn + F)\,f_s .
$$ {#eq-tdm}
:::

::: example The T1 and E1 carriers {#ex-t1}
(a) The North American T1 carrier multiplexes $24$ telephone channels, each sampled at $8\,\mathrm{kHz}$ with $8$ bits, plus one framing bit per frame. Find the frame duration, the line rate and the minimum Nyquist bandwidth. (b) The European E1 frame has $32$ time slots of $8$ bits, of which slot $0$ carries framing and slot $16$ usually carries signalling. Find its line rate and the number of speech channels.
::: solution
(a) A frame holds one sample from each channel, so $T_F = 1/8000 = 125\,\mathrm{\mu s}$. It contains $24 \times 8 + 1 = 193$ bits, so $R = 193 \times 8000 = 1.544\,\mathrm{Mbit/s}$. The Nyquist bandwidth for binary pulses is $R/2 = 772\,\mathrm{kHz}$, compared with $24 \times 4\,\mathrm{kHz} = 96\,\mathrm{kHz}$ for the same channels in analog frequency-division multiplexing with SSB: digital transmission costs eight times the bandwidth. (In practice T1 uses bipolar line coding and occupies about $1.5\,\mathrm{MHz}$ of cable bandwidth.)

(b) $R = 32 \times 8 \times 8000 = 2.048\,\mathrm{Mbit/s}$, carrying $30$ speech channels. The overhead fraction is $2/32 = 6.25\,\%$, against T1's $1/193 = 0.5\,\%$; T1 takes its signalling by "robbing" the least significant bit of each channel in every sixth frame instead.
:::
:::

Higher levels of the hierarchy multiplex these streams again: four T1 lines form a T2 at $6.312\,\mathrm{Mbit/s}$ (the extra rate is for synchronisation of the slightly different tributary clocks), and the Synchronous Digital Hierarchy carries thousands of channels on fibre at $155.52\,\mathrm{Mbit/s}$ and its multiples. TDM requires the multiplexer and demultiplexer to agree on time to within a fraction of a bit; recovering that timing from the received signal is part of the receiver design in [[communication-systems/baseband-transmission]].

::: quiz
A TDM system multiplexes $10$ channels, each of bandwidth $5\,\mathrm{kHz}$, sampled at $12\,\mathrm{kHz}$ with $10$ bits per sample and $10$ framing bits per frame. What is the line rate?
- [ ] $1.0\,\mathrm{Mbit/s}$
- [x] $1.32\,\mathrm{Mbit/s}$
- [ ] $1.2\,\mathrm{Mbit/s}$
- [ ] $120\,\mathrm{kbit/s}$
::: solution
Each frame lasts $1/12\,000\,\mathrm{s}$ and holds $10 \times 10 + 10 = 110$ bits, so $R = 110 \times 12\,000 = 1.32\,\mathrm{Mbit/s}$. Forgetting the framing bits gives $1.2\,\mathrm{Mbit/s}$; forgetting that there are ten channels gives $120\,\mathrm{kbit/s}$.
:::
:::

## Where this leads

The bits produced here must now be sent as waveforms. [[communication-systems/baseband-transmission]] shapes them into pulses that fit a band-limited channel without interfering with each other, and [[communication-systems/digital-modulation]] places them on a carrier. [[communication-systems/optimal-detection]] computes the bit error probability $P_b$ that enters [[#eq-pcm-errors]], closing the loop between the channel SNR and the output quality of a PCM system. Quantisation, oversampling and noise shaping return in [[dsp/multirate-processing]], and the question of how few bits a source really needs, given its statistics, belongs to source coding in [[information-theory/source-coding]].

::: history
Alec Reeves, an engineer at the Paris laboratories of International Telephone and Telegraph, conceived pulse-code modulation in 1937 and patented it in France in 1938; with the vacuum tubes of the time it was far too complex to be economic, but the idea was complete: sample, quantise, send binary codes. During the Second World War Bell Telephone Laboratories built SIGSALY, a secure speech system for Allied leaders that digitised the parameters of a vocoder and encrypted them, an early working use of PCM-like quantisation. In 1948 Bernard Oliver, John Pierce and Claude Shannon published "The philosophy of PCM" in the Proceedings of the IRE, explaining the exponential exchange of bandwidth for SNR and the value of regeneration. Delta modulation was patented by E. M. Deloraine, S. Van Mierlo and B. Derjavitch at ITT's Paris laboratory in 1946. The transistor made PCM practical: the Bell System put the T1 carrier into commercial service in 1962 to carry 24 telephone calls on existing pairs between exchanges, and the ITU standardised 64 kbit/s companded PCM as G.711 in 1972.
:::

::: summary
- PCM samples a band-limited message (after an anti-aliasing filter, at $f_s > 2W$ with a guard band), quantises each sample to $L = 2^n$ levels and sends $R_b = nf_s$ bits per second.
- Flat-top sampling multiplies the message spectrum by $\sin(\pi f\tau)/(\pi f\tau)$ (aperture effect), which is equalised when $\tau$ is not small.
- Uniform quantisation adds noise of power $\Delta^2/12$; $\mathrm{SQNR} = 3\cdot4^n P_m/m_p^2$, or $6.02n + 1.76\,\mathrm{dB}$ for a full-scale sinusoid: $6\,\mathrm{dB}$ per bit, minus the loading factor for real signals.
- At the Nyquist rate PCM needs $B_T \ge nW$, and its SQNR grows exponentially with $B_T/W$.
- Bit errors add noise $P_b\Delta^2(4^n - 1)/3$; PCM has a threshold near $P_b \approx 1/(4\cdot4^n)$, so links are designed for $P_b \le 10^{-6}$ or lower.
- μ-law ($\mu = 255$) and A-law ($A = 87.6$) companding make the SQNR of 8-bit telephone PCM nearly constant ($\approx 38\,\mathrm{dB}$) over a $40\,\mathrm{dB}$ range of levels, worth about four bits of uniform quantisation.
- Delta modulation sends one bit per sample; it must avoid slope overload ($\delta f_s \ge \max\lvert m'\rvert$) and its SNR grows only as $f_s^3$.
- TDM interleaves channels in frames with framing bits: T1 is $24 \times 8 + 1$ bits per $125\,\mathrm{\mu s}$ ($1.544\,\mathrm{Mbit/s}$), E1 is $32 \times 8$ ($2.048\,\mathrm{Mbit/s}$).
:::

## Exercises

::: exercise Telephone bit rate {level=1 check="64000"}
Telephone speech is sampled at $8\,\mathrm{kHz}$ and coded with $8$ bits per sample. Find the bit rate in bits per second.
::: solution
$R_b = nf_s = 8 \times 8000 = 64\,000\,\mathrm{bit/s}$.
:::
:::

::: exercise Step size {level=1 check="10/1024"}
A 10-bit uniform quantiser covers the input range $-5\,\mathrm{V}$ to $+5\,\mathrm{V}$. Find the step size in volts and the RMS quantisation noise.
::: solution
$\Delta = 2m_p/L = 10/1024 = 9.77\,\mathrm{mV}$. The RMS noise is $\Delta/\sqrt{12} = 2.82\,\mathrm{mV}$.
:::
:::

::: exercise SQNR of a 12-bit converter {level=1 check="10*log10(1.5*4^12)"}
Find the SQNR in decibels of a 12-bit uniform quantiser for a full-scale sinusoid, and for a sinusoid $20\,\mathrm{dB}$ below full scale.
::: solution
Full scale: $6.02 \times 12 + 1.76 = 74.0\,\mathrm{dB}$ (exactly $10\log_{10}(1.5\cdot4^{12}) = 74.01\,\mathrm{dB}$). The noise does not change with the signal level, so at $-20\,\mathrm{dB}$ the SQNR is $54.0\,\mathrm{dB}$.
:::
:::

::: exercise Bits for speech {level=2 check="8"}
A speech signal is loaded so that its RMS value is one quarter of the overload level, and an SQNR of at least $40\,\mathrm{dB}$ is required with uniform quantisation. What is the minimum number of bits per sample?
::: solution
$6.02n + 4.77 - 12.04 \ge 40$ gives $n \ge 47.27/6.02 = 7.85$, so $n = 8$, with $\mathrm{SQNR} = 40.9\,\mathrm{dB}$. This holds only at the design level; quieter talkers would need companding.
:::
:::

::: exercise T1 bandwidth {level=2 check="772000"}
Find the minimum transmission bandwidth in hertz of a T1 line (24 channels, 8 bits, $8\,\mathrm{kHz}$, one framing bit per frame) if it used ideal Nyquist pulses. By what factor does it exceed the total bandwidth of the 24 voice channels sent by SSB with $4\,\mathrm{kHz}$ spacing?
::: solution
$R = 193 \times 8000 = 1.544\,\mathrm{Mbit/s}$; $B_T = R/2 = 772\,\mathrm{kHz}$. SSB needs $24 \times 4 = 96\,\mathrm{kHz}$, so the factor is $8.04$.
:::
:::

::: exercise Slope overload {level=2 check="2*pi*1000/40000"}
A delta modulator samples at $40\,\mathrm{kHz}$. Find the smallest step size in volts that avoids slope overload for a $1\,\mathrm{kHz}$ tone of amplitude $1\,\mathrm{V}$. If the step is set to this value and the tone frequency rises to $2\,\mathrm{kHz}$, what amplitude can be handled without overload?
::: solution
$\delta \ge 2\pi f_mA/f_s = 2\pi \times 1000/40\,000 = 0.157\,\mathrm{V}$. At $2\,\mathrm{kHz}$ the maximum amplitude is $\delta f_s/(2\pi f_m) = 0.5\,\mathrm{V}$: delta modulation's overload level falls as $1/f$, which suits speech, whose spectrum falls at high frequencies.
:::
:::

::: exercise The bit-error threshold {level=2 check="1/(4*4^10)"}
For a 10-bit PCM system modelled by [[#thm-pcm-errors]], find the bit error probability at which channel-error noise equals quantisation noise, and the output SNR there.
::: solution
The two terms are equal when $4P_b(4^n - 1) = 1$, i.e. $P_b \approx 1/(4\cdot4^{10}) = 2.38\times10^{-7}$. The SNR is then $4^{10}/2$, i.e. $60.2 - 3.0 = 57.2\,\mathrm{dB}$, $3\,\mathrm{dB}$ below the quantisation-limited value.
:::
:::

::: exercise A high-fidelity PCM design {level=3}
A studio link must carry audio with $W = 20\,\mathrm{kHz}$ at an SQNR of at least $90\,\mathrm{dB}$ for a full-scale sinusoid. (a) Choose $n$ and a sampling rate with a $10\,\%$ guard band, and find the bit rate and the minimum binary bandwidth. (b) The channel delivers $P_b = 10^{-9}$. Using [[#thm-pcm-errors]] as a guide, by how many decibels do bit errors degrade the output? (c) What $P_b$ keeps the degradation below $0.5\,\mathrm{dB}$?
::: hint
The ratio of channel-error noise to quantisation noise is $4P_b(4^n - 1)$, whatever the signal.
:::
::: solution
(a) $6.02n + 1.76 \ge 90$ gives $n \ge 14.66$, so $n = 15$ ($92.1\,\mathrm{dB}$). A guard band of $2\,\mathrm{kHz}$ requires $f_s \ge 42\,\mathrm{kHz}$; take $f_s = 44\,\mathrm{kHz}$. Then $R_b = 15 \times 44\,000 = 660\,\mathrm{kbit/s}$ and $B_T \ge 330\,\mathrm{kHz}$.

(b) $4P_b(4^{15} - 1) = 4\times10^{-9} \times 1.074\times10^9 = 4.29$. The total noise is $1 + 4.29 = 5.29$ times the quantisation noise, a degradation of $10\log_{10}5.29 = 7.2\,\mathrm{dB}$: the link would no longer meet the specification. A bit error rate that sounds tiny is not small enough for $15$-bit words, because an error in the top bit is a click of half full scale.

(c) $10\log_{10}(1 + x) \le 0.5$ requires $x \le 0.122$, so $P_b \le 0.122/(4 \times 1.074\times10^9) = 2.8\times10^{-11}$. In practice this is achieved with error-correcting codes and by protecting the most significant bits more strongly.
:::
:::

::: exercise Oversampling and noise shaping {level=3 #ex-noise-shaping}
A quantiser with step $\Delta$ samples a signal of bandwidth $W$ at $f_s = 2KW$, and its error is white with power $\Delta^2/12$ spread over $\lvert f\rvert < f_s/2$. (a) Show that an ideal digital low-pass filter to $W$ improves the SQNR by $10\log_{10}K$ decibels. (b) In a first-order sigma-delta modulator the error that reaches the output is $e[n] - e[n - 1]$. Show that the in-band noise power is approximately $\frac{\Delta^2}{12}\cdot\frac{\pi^2}{3K^3}$ for large $K$, and compute the improvement over Nyquist-rate quantisation for $K = 8$. (c) How many bits of resolution does each doubling of $K$ buy in each case?
::: hint
The filter $1 - z^{-1}$ has $\lvert H(e^{j2\pi f/f_s})\rvert^2 = 4\sin^2(\pi f/f_s)$; for $f \le W \ll f_s$ use $\sin x \approx x$.
:::
::: solution
(a) The noise density is $(\Delta^2/12)/f_s$, and the filter keeps the band $2W$, a fraction $2W/f_s = 1/K$ of the noise. The signal is unaffected, so the SQNR improves by $K$, i.e. $10\log_{10}K$ ($3\,\mathrm{dB}$ per doubling).

(b) The shaped noise density is $\frac{\Delta^2}{12f_s}\cdot4\sin^2(\pi f/f_s) \approx \frac{\Delta^2}{12f_s}\cdot\frac{4\pi^2f^2}{f_s^2}$. Integrating over $\lvert f\rvert < W$:

$$
\sigma^2 \approx \frac{\Delta^2}{12f_s}\cdot\frac{4\pi^2}{f_s^2}\cdot\frac{2W^3}{3} = \frac{\Delta^2}{12}\cdot\frac{\pi^2}{3}\Big(\frac{2W}{f_s}\Big)^3 = \frac{\Delta^2}{12}\cdot\frac{\pi^2}{3K^3} .
$$

The improvement over $\Delta^2/12$ is $3K^3/\pi^2$; for $K = 8$ this is $155.6$, i.e. $21.9\,\mathrm{dB}$, compared with $9.0\,\mathrm{dB}$ from oversampling alone.

(c) Plain oversampling: $3\,\mathrm{dB}$ per doubling, half a bit. First-order shaping: $10\log_{10}8 = 9\,\mathrm{dB}$ per doubling, $1.5$ bits. With $K = 64$ a first-order one-bit modulator already gains $10\log_{10}(3\cdot64^3/\pi^2) = 49.0\,\mathrm{dB}$, and second-order loops ($15\,\mathrm{dB}$ per doubling) reach audio quality.
:::
:::
