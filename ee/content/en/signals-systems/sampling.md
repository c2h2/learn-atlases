In old western films the wagon wheels sometimes appear to turn slowly backwards while the wagon races forwards. The camera takes $24$ pictures a second, and if a spoke moves almost exactly one spoke-spacing between frames, the eye connects each spoke with the one just behind it. The pictures are perfectly accurate; it is the *interpretation* of the samples that is wrong. The same thing happens to every signal that is sampled too slowly: a high frequency masquerades as a low one. This is **aliasing**, and avoiding it is the first design rule of every digital audio recorder, oscilloscope, software radio and control system.

This lesson answers the questions that make digital signal processing possible. When do samples $x(nT)$ determine a continuous-time signal $x(t)$ completely? (When the signal is band-limited and the sampling rate exceeds twice its bandwidth: the **sampling theorem**.) How is $x(t)$ rebuilt from its samples, ideally and in practice? What goes wrong when the conditions are violated, and how do anti-aliasing filters and oversampling prevent it? And how can a discrete-time system, a few lines of code, imitate a continuous-time filter? The tools are those of [[signals-systems/fourier-transform]] and [[signals-systems/discrete-time-fourier]]; the key computation is the spectrum of a sampled signal.

## Impulse-train sampling {#sec-impulse-sampling}

To analyse sampling with the CT Fourier transform, we model the sampled signal as a CT signal: a train of impulses whose areas are the sample values.

::: definition Impulse-train sampling {#def-sampling}
**Sampling** a CT signal $x_c(t)$ with **sampling period** $T$ produces the sequence $x[n] = x_c(nT)$. The **sampling frequency** is $\omega_s = 2\pi/T$ in $\mathrm{rad/s}$ ($f_s = 1/T$ in $\mathrm{Hz}$). The **impulse-train sampled** signal is

$$
x_p(t) = x_c(t)\,p(t) = \sum_{n=-\infty}^{\infty}x_c(nT)\,\delta(t - nT),\qquad p(t) = \sum_{n=-\infty}^{\infty}\delta(t - nT).
$$ {#eq-xp}
:::

The modulation of $x_c$ by the impulse train $p$ is a mathematical device: $x_p$ carries exactly the information in the samples $x[n]$ and nothing else, but lives in the CT world where we can take its Fourier transform. From the table in [[signals-systems/fourier-transform]], $P(j\omega) = \frac{2\pi}{T}\sum_k\delta(\omega - k\omega_s)$: an impulse train in frequency with spacing $\omega_s$. The multiplication theorem then gives the spectrum of the sampled signal.

::: theorem Spectrum of a sampled signal {#thm-spectrum}
The Fourier transform of the impulse-train sampled signal is

$$
X_p(j\omega) = \frac{1}{T}\sum_{k=-\infty}^{\infty}X_c\big(j(\omega - k\omega_s)\big),
$$ {#eq-replicas}

a sum of copies of the original spectrum, scaled by $1/T$ and shifted by every multiple of the sampling frequency. Equivalently, the DTFT of the sequence $x[n] = x_c(nT)$ is

$$
X(e^{j\omega}) = X_p\!\left(j\frac{\omega}{T}\right) = \frac1T\sum_{k=-\infty}^{\infty}X_c\!\left(j\,\frac{\omega - 2\pi k}{T}\right).
$$ {#eq-dtft-samples}
:::

::: proof
By the multiplication theorem [[signals-systems/fourier-transform#eq-mult-thm]],

$$
X_p(j\omega) = \frac{1}{2\pi}X_c(j\omega) * \frac{2\pi}{T}\sum_k\delta(\omega - k\omega_s) = \frac1T\sum_kX_c\big(j(\omega - k\omega_s)\big),
$$

because convolving with a shifted impulse shifts. For the second form, take the Fourier transform of [[#eq-xp]] term by term: $X_p(j\omega) = \sum_nx_c(nT)e^{-j\omega nT} = \sum_nx[n]e^{-j(\omega T)n}$, which is the DTFT $X(e^{j\Omega})$ evaluated at $\Omega = \omega T$. Hence $X(e^{j\omega}) = X_p(j\omega/T)$.
:::

Equation [[#eq-dtft-samples]] is the dictionary between the CT and DT frequency variables: the CT frequency $\Omega$ (we now write $\Omega$ for CT angular frequency when both appear) corresponds to the DT frequency $\omega = \Omega T$, so $\Omega = \omega_s/2$ maps to $\omega = \pi$ and $\Omega = \omega_s$ to $\omega = 2\pi$. The periodicity of the DTFT, which looked like a mathematical curiosity, is the spectral replication caused by sampling.

## The sampling theorem {#sec-theorem}

Suppose $x_c$ is **band-limited**: $X_c(j\Omega) = 0$ for $\lvert\Omega\rvert > \Omega_M$. The copies in [[#eq-replicas]] are centred on $k\omega_s$ and each occupies a band of width $2\Omega_M$. If $\omega_s - \Omega_M > \Omega_M$, adjacent copies do not touch, and the original spectrum can be recovered by a low-pass filter that keeps the copy at $k = 0$ and rejects the others. If $\omega_s < 2\Omega_M$, the copies overlap and add: frequencies from the copy at $\omega_s$ fall into the band of the original, and no filter can separate them.

::: widget plot
f: sum(max(0, 1 - abs(x - k*s)), k, -4, 4); max(0, 1 - abs(x))
x: -6, 6
y: 0, 2.2
sliders: s=3:1:5:0.05
labels: T\,X_p(j\Omega); X_c(j\Omega)
caption: The spectrum of a sampled signal (blue) for a triangular baseband spectrum of bandwidth $\Omega_M = 1$ (orange), as a function of $\Omega$. The slider sets the sampling frequency $\omega_s$. For $\omega_s > 2$ the copies are separate and the original can be cut out by a low-pass filter. Reduce $\omega_s$ below $2$: the copies overlap and add, and the shape near $\pm\Omega_M$ is corrupted. That overlap is aliasing.
:::

::: theorem Sampling theorem (Nyquist–Shannon) {#thm-sampling}
Let $x_c(t)$ be band-limited with $X_c(j\Omega) = 0$ for $\lvert\Omega\rvert > \Omega_M$. Then $x_c(t)$ is uniquely determined by its samples $x_c(nT)$, $n = 0, \pm1, \pm2, \dots$, if

$$
\omega_s = \frac{2\pi}{T} > 2\Omega_M .
$$ {#eq-nyquist}

The frequency $2\Omega_M$ is the **Nyquist rate** of the signal; $\omega_s/2$ is the **Nyquist frequency** of the sampler (also called the folding frequency).
:::

::: proof
Under [[#eq-nyquist]] the copies in [[#eq-replicas]] do not overlap, so on $\lvert\Omega\rvert < \omega_s/2$ only the term $k = 0$ is non-zero: $X_p(j\Omega) = \frac1TX_c(j\Omega)$ there. Pass $x_p$ through an ideal low-pass filter $H_r(j\Omega)$ with gain $T$ for $\lvert\Omega\rvert < \Omega_c$ and $0$ otherwise, with any cut-off $\Omega_M < \Omega_c < \omega_s - \Omega_M$. Its output has spectrum $H_rX_p = X_c$, so the output is $x_c(t)$. Since $x_p$ is built from the samples alone, the samples determine $x_c$.
:::

The inequality is strict for a reason. The signal $\sin(\Omega_Mt)$ sampled at exactly $\omega_s = 2\Omega_M$ may be sampled at its zero crossings, giving all-zero samples indistinguishable from no signal at all. At exactly the Nyquist rate the theorem holds only if the spectrum has no impulse at $\pm\Omega_M$.

### Reconstruction by sinc interpolation

The proof also tells us how to rebuild $x_c$. The ideal reconstruction filter has impulse response $h_r(t) = T\,\dfrac{\sin\Omega_ct}{\pi t}$ (by [[signals-systems/fourier-transform#eq-sinc]]), and its output is $x_p * h_r = \sum_nx_c(nT)h_r(t - nT)$.

::: theorem Ideal band-limited interpolation {#thm-interpolation}
With $\Omega_c = \omega_s/2 = \pi/T$, a band-limited signal satisfying [[#eq-nyquist]] is recovered from its samples by

$$
x_c(t) = \sum_{n=-\infty}^{\infty}x_c(nT)\,\frac{\sin\big(\pi(t - nT)/T\big)}{\pi(t - nT)/T} .
$$ {#eq-interpolation}
:::

::: proof
Substitute $\Omega_c = \pi/T$ into $h_r(t) = T\sin(\Omega_ct)/(\pi t)$ to get $h_r(t) = \sin(\pi t/T)/(\pi t/T)$, and use $x_c = x_p * h_r = \sum_nx_c(nT)\,h_r(t - nT)$.
:::

Each sample launches a sinc pulse centred on its own instant. The pulse $h_r(t - nT)$ equals $1$ at $t = nT$ and $0$ at every other sampling instant, so the interpolation passes exactly through the samples; between samples, all the sincs contribute. The formula is exact but impractical: each output value needs infinitely many samples, past and future, because $h_r$ is non-causal and decays only as $1/t$. Practical reconstruction approximates it.

::: example The Nyquist rate of standard signals {#ex-nyquist}
Find the minimum sampling rate for (a) telephone speech filtered to $3.4\,\mathrm{kHz}$; (b) audio with content to $20\,\mathrm{kHz}$; (c) the signal $x(t) = \cos(2\pi\cdot1000t)\,\sin(2\pi\cdot3000t)$; (d) $x(t) = \big(\sin(2\pi\cdot500t)/(\pi t)\big)^2$.
::: solution
(a) $2\times3.4 = 6.8\,\mathrm{kHz}$; the telephone network uses $8\,\mathrm{kHz}$, leaving a guard band for a realisable anti-aliasing filter.

(b) $40\,\mathrm{kHz}$; CDs use $44.1\,\mathrm{kHz}$ (Nyquist frequency $22.05\,\mathrm{kHz}$), studios $48\,\mathrm{kHz}$ or more.

(c) The product equals $\tfrac12[\sin(2\pi\cdot4000t) + \sin(2\pi\cdot2000t)]$, with highest frequency $4\,\mathrm{kHz}$; Nyquist rate $8\,\mathrm{kHz}$. Multiplication adds bandwidths.

(d) $\sin(2\pi\cdot500t)/(\pi t)$ has a rectangular spectrum on $\lvert f\rvert < 500\,\mathrm{Hz}$. Squaring in time convolves the spectrum with itself (multiplication theorem), giving a triangle on $\lvert f\rvert < 1000\,\mathrm{Hz}$. Nyquist rate $2\,\mathrm{kHz}$.
:::
:::

## Aliasing {#sec-aliasing}

::: definition Aliasing {#def-aliasing}
When $x_c$ is sampled below its Nyquist rate, components of $X_c$ at frequencies above $\omega_s/2$ are shifted by multiples of $\omega_s$ into the band $\lvert\Omega\rvert < \omega_s/2$, where they are indistinguishable from genuine components. This is **aliasing**; the shifted components are **aliases**.
:::

For a single sinusoid the bookkeeping is simple. The samples of $\cos(2\pi f_0t)$ at rate $f_s$ are $\cos(2\pi(f_0/f_s)n)$, and by [[signals-systems/signals#thm-dt-sinusoid]] adding any integer to $f_0/f_s$, or changing its sign, changes nothing. So the tone at $f_0$ produces exactly the same samples as the tone at the **apparent frequency**

$$
f_a = \lvert f_0 - kf_s\rvert,\qquad k \text{ chosen so that } 0 \le f_a \le f_s/2 .
$$ {#eq-alias}

Graphically, the frequency axis is folded back and forth like a paper fan at multiples of $f_s/2$, and every frequency lands on the interval $[0, f_s/2]$.

::: widget plot
f: cos(2*pi*f*x); cos(2*pi*abs(f - round(f))*x)
x: 0, 8
y: -1.3, 1.3
sliders: f=0.9:0:2:0.01
vlines: 0; 1; 2; 3; 4; 5; 6; 7; 8
labels: \cos(2\pi f_0t); \cos(2\pi f_at)
caption: A tone at $f_0$ (blue) and its alias at $f_a = \lvert f_0 - kf_s\rvert$ (orange), with time in units of the sampling period ($f_s = 1$). The grey lines are the sampling instants: at every one of them the two curves pass through the same point, so the samples cannot tell them apart. Set $f_0 = 0.9$: the alias is $0.1$, a slow wave. At $f_0 = 0.5$ the two tones have the same frequency; below $0.5$ there is no aliasing.
:::

::: example Where does the tone appear? {#ex-alias}
A data acquisition system samples at $f_s = 10\,\mathrm{kHz}$ with no anti-aliasing filter. Where in the sampled spectrum ($0$–$5\,\mathrm{kHz}$) do tones at (a) $3\,\mathrm{kHz}$, (b) $7\,\mathrm{kHz}$, (c) $12.5\,\mathrm{kHz}$, (d) $19.9\,\mathrm{kHz}$ appear? And a $50\,\mathrm{Hz}$ mains harmonic, the $201$st, at $10.05\,\mathrm{kHz}$?
::: solution
Using [[#eq-alias]]:

(a) $3\,\mathrm{kHz}$ (below $f_s/2$, no aliasing).

(b) $\lvert7 - 10\rvert = 3\,\mathrm{kHz}$: indistinguishable from (a).

(c) $\lvert12.5 - 10\rvert = 2.5\,\mathrm{kHz}$.

(d) $\lvert19.9 - 20\rvert = 0.1\,\mathrm{kHz} = 100\,\mathrm{Hz}$.

The mains harmonic at $10.05\,\mathrm{kHz}$ appears at $50\,\mathrm{Hz}$, on top of the fundamental. Aliasing can make high-frequency interference look like a perfectly plausible low-frequency signal, and nothing in the samples reveals the deception: it must be prevented *before* sampling.
:::
:::

::: warning Aliasing cannot be removed after sampling
Once the samples have been taken, an aliased component is mathematically identical to a genuine one at the alias frequency. No digital filter, however clever, can separate them. The only protection is an analog **anti-aliasing filter** in front of the sampler that attenuates everything above $f_s/2$ (more precisely, everything that would fold into the band of interest) to below the noise floor. A common mistake is to choose $f_s$ by the bandwidth of the *wanted* signal and forget the noise and interference at higher frequencies, which alias just the same.
:::

::: quiz
A $1.1\,\mathrm{kHz}$ tone is sampled at $1\,\mathrm{kHz}$ and the samples are played back through an ideal $500\,\mathrm{Hz}$ reconstruction filter. What do you hear?
- [ ] $1.1\,\mathrm{kHz}$
- [ ] $900\,\mathrm{Hz}$
- [x] $100\,\mathrm{Hz}$
- [ ] Silence
::: solution
The apparent frequency is $\lvert1.1 - 1\rvert = 0.1\,\mathrm{kHz}$. The samples are those of a $100\,\mathrm{Hz}$ tone, and the reconstruction filter, which assumes the signal was band-limited to $500\,\mathrm{Hz}$, rebuilds exactly that. This is the wagon-wheel effect: a fast rotation seen as a slow one.
:::
:::

### Anti-aliasing filters and oversampling

A real anti-aliasing filter has a transition band. If the wanted band extends to $f_p$ and the sampler runs at $f_s$, a component at frequency $f$ aliases into the wanted band if $\lvert f - kf_s\rvert < f_p$ for some $k \ne 0$; the lowest such frequency is $f_s - f_p$. So the filter must pass $f < f_p$ and attenuate $f > f_s - f_p$ by the required amount; frequencies between $f_s/2$ and $f_s - f_p$ alias, but only into the unused band between $f_p$ and $f_s/2$, which can be removed digitally afterwards.

::: example Designing the anti-aliasing filter of an audio converter {#ex-aaf}
An audio ADC must capture $0$–$20\,\mathrm{kHz}$ with less than $3\,\mathrm{dB}$ loss at $20\,\mathrm{kHz}$, and anything that would alias into that band must be attenuated by at least $80\,\mathrm{dB}$. Find the order of Butterworth filter, $\lvert H\rvert^2 = 1/(1 + (f/f_c)^{2N})$ with $f_c = 20\,\mathrm{kHz}$, needed (a) at $f_s = 48\,\mathrm{kHz}$ and (b) with $8\times$ oversampling at $f_s = 384\,\mathrm{kHz}$.
::: solution
The attenuation at frequency $f$ is $10\log_{10}\big(1 + (f/f_c)^{2N}\big)$; we need at least $80\,\mathrm{dB}$ at $f = f_s - 20\,\mathrm{kHz}$, i.e. $(f/f_c)^{2N} \ge 10^8$ approximately, $N \ge \dfrac{8}{2\log_{10}(f/f_c)}$.

(a) $f = 28\,\mathrm{kHz}$, $f/f_c = 1.4$: $N \ge 8/(2\times0.146) = 27.4$, so $N = 28$. A $28$th-order analog filter is out of the question: it would need dozens of precision components and drift with temperature.

(b) $f = 364\,\mathrm{kHz}$, $f/f_c = 18.2$: $N \ge 8/(2\times1.260) = 3.17$, so $N = 4$, giving $10\log_{10}(1 + 18.2^8) = 101\,\mathrm{dB}$. A fourth-order filter is easy.

This is why every modern audio ADC oversamples: a simple analog filter protects the fast sampler, and the sharp filtering is done digitally, where a $100$-tap FIR filter is cheap, exactly linear in phase and does not drift, before the rate is reduced to $48\,\mathrm{kHz}$ (decimation, [[dsp]]).
:::
:::

## Practical reconstruction {#sec-reconstruction}

A digital-to-analog converter does not emit impulses. It holds each sample value until the next one arrives, producing a staircase: a **zero-order hold** (ZOH). The staircase is $x_p * h_0$ with $h_0(t) = 1$ for $0 \le t < T$ and $0$ otherwise, whose transform (the rectangular pulse of [[signals-systems/fourier-transform#ex-rect]] delayed by $T/2$) is

$$
H_0(j\Omega) = e^{-j\Omega T/2}\,\frac{2\sin(\Omega T/2)}{\Omega} = T\,e^{-j\Omega T/2}\,\frac{\sin(\pi f/f_s)}{\pi f/f_s} .
$$ {#eq-zoh}

Compared with the ideal reconstruction filter (gain $T$ up to $f_s/2$, zero beyond), the ZOH does two things wrong. It has **droop** in the passband: the gain falls to $\sin(\pi/2)/(\pi/2) = 2/\pi$, i.e. $-3.92\,\mathrm{dB}$, at $f_s/2$. And it does not remove the images: it attenuates the copy at $f_s$ only by its sinc sidelobes, so the staircase contains energy around $f_s, 2f_s, \dots$ (its steps). It also adds a delay of $T/2$. A smoothing analog **reconstruction filter** after the DAC removes the images, and the droop is either tolerated, pre-compensated digitally or made negligible by oversampling.

::: example Droop of a CD player's DAC {#ex-droop}
A DAC with a zero-order hold runs at $44.1\,\mathrm{kHz}$. Find the droop at $20\,\mathrm{kHz}$, and at $20\,\mathrm{kHz}$ if the samples are first interpolated to $4\times44.1 = 176.4\,\mathrm{kHz}$ digitally.
::: solution
At $f/f_s = 20/44.1 = 0.4535$: $\sin(0.4535\pi)/(0.4535\pi) = 0.694$, a loss of $3.17\,\mathrm{dB}$, clearly audible as dull treble if uncorrected. At $f/f_s = 20/176.4 = 0.1134$: $\sin(0.1134\pi)/(0.1134\pi) = 0.979$, a loss of $0.18\,\mathrm{dB}$. Oversampling moves the images far from the audio band (so the analog filter can be gentle) and flattens the sinc over the band of interest.
:::
:::

::: quiz
A $1\,\mathrm{kHz}$ sine is reproduced by a zero-order-hold DAC running at $8\,\mathrm{kHz}$, with no filter after it. Besides $1\,\mathrm{kHz}$, at which frequencies does the output contain energy?
- [ ] None: the staircase is a $1\,\mathrm{kHz}$ signal
- [ ] Only at $2$, $3$, $4\,\mathrm{kHz}$ (harmonics)
- [x] At $7$, $9$, $15$, $17\,\mathrm{kHz}$, … (images around multiples of $8\,\mathrm{kHz}$)
- [ ] Only at $4\,\mathrm{kHz}$, the Nyquist frequency
::: solution
The sampled signal has spectral copies at $k\cdot8 \pm 1\,\mathrm{kHz}$. The hold multiplies them by its sinc response, which is zero only at multiples of $8\,\mathrm{kHz}$, not at $7$ or $9\,\mathrm{kHz}$: at $7\,\mathrm{kHz}$ the relative gain is $\sin(7\pi/8)/(7\pi/8) = 0.139$, about $-17\,\mathrm{dB}$ relative to DC. These images are the "steps" of the staircase, and the reconstruction filter is there to remove them.
:::
:::

## Discrete-time processing of continuous-time signals {#sec-dt-processing}

The standard architecture of digital signal processing is: anti-aliasing filter, sampler (C/D converter), discrete-time system $H(e^{j\omega})$, D/C converter with reconstruction filter. Under the right conditions the whole chain behaves like a single CT LTI system.

::: theorem Effective frequency response of a sampled-data system {#thm-effective}
If the input is band-limited with $X_c(j\Omega) = 0$ for $\lvert\Omega\rvert \ge \pi/T$, and the D/C converter uses ideal band-limited reconstruction, then the C/D – $H(e^{j\omega})$ – D/C chain is equivalent to a CT LTI system with frequency response

$$
H_{\text{eff}}(j\Omega) = \begin{cases}H(e^{j\Omega T}), & \lvert\Omega\rvert < \pi/T,\\ 0, & \lvert\Omega\rvert \ge \pi/T.\end{cases}
$$ {#eq-effective}
:::

::: proof
By [[#eq-dtft-samples]], with no aliasing, $X(e^{j\omega}) = \frac1TX_c(j\omega/T)$ for $\lvert\omega\rvert < \pi$. The DT system gives $Y(e^{j\omega}) = H(e^{j\omega})X(e^{j\omega})$. Ideal reconstruction produces a CT signal whose spectrum is $T\,Y(e^{j\Omega T})$ for $\lvert\Omega\rvert < \pi/T$ and zero outside (the reverse of the sampling relation). Combining, $Y_c(j\Omega) = T\cdot H(e^{j\Omega T})\cdot\frac1TX_c(j\Omega) = H(e^{j\Omega T})X_c(j\Omega)$ for $\lvert\Omega\rvert < \pi/T$.
:::

The DT frequency response is simply read off on a stretched axis: DT frequency $\omega$ corresponds to CT frequency $\Omega = \omega/T$, i.e. $f = \omega f_s/2\pi$. If the input is not band-limited, the chain is not even time-invariant in general, because aliased components depend on the exact sampling instants; that is why the anti-aliasing filter is part of the specification.

::: example A digital low-pass filter in a sampled system {#ex-dt-lowpass}
A system samples at $f_s = 8\,\mathrm{kHz}$, applies a DT ideal low-pass filter with cut-off $\omega_c = \pi/4$, and reconstructs ideally. The input, already band-limited to $4\,\mathrm{kHz}$, is $x(t) = \cos(2\pi\cdot500t) + \cos(2\pi\cdot1500t)$. Find the effective CT cut-off frequency and the output. What changes if $f_s$ is raised to $16\,\mathrm{kHz}$ without changing the DT filter?
::: solution
By [[#eq-effective]], the CT cut-off is $f_c = \omega_cf_s/2\pi = (\pi/4)\cdot8000/(2\pi) = 1\,\mathrm{kHz}$. The $500\,\mathrm{Hz}$ tone ($\omega = 2\pi\cdot500/8000 = \pi/8 < \pi/4$) passes; the $1500\,\mathrm{Hz}$ tone ($\omega = 3\pi/8$) is removed. Output: $\cos(2\pi\cdot500t)$.

At $f_s = 16\,\mathrm{kHz}$ the same DT filter has CT cut-off $(\pi/4)\cdot16000/(2\pi) = 2\,\mathrm{kHz}$, so both tones pass. A digital filter's cut-off is fixed in radians per sample; its cut-off in hertz scales with the clock. Changing the sampling rate of a digital system therefore retunes all its filters, a property exploited in switched-capacitor and clock-tunable filters.
:::
:::

::: application Bandpass sampling in software radio
The sampling theorem as stated assumes a low-pass signal. A signal occupying only a band $f_L < \lvert f\rvert < f_H$ can be sampled at a rate related to its *bandwidth* $B = f_H - f_L$ rather than to $f_H$, provided the copies in [[#eq-replicas]] interleave without overlapping. For example, a $1\,\mathrm{MHz}$-wide channel centred at $70\,\mathrm{MHz}$ ($69.5$–$70.5\,\mathrm{MHz}$) can be sampled at $f_s = 8\,\mathrm{MHz}$, far below its Nyquist rate of $141\,\mathrm{MHz}$: $68$ and $72\,\mathrm{MHz}$ are consecutive multiples of $f_s/2 = 4\,\mathrm{MHz}$, so the band lies inside one Nyquist zone and aliases cleanly to $1.5$–$2.5\,\mathrm{MHz}$ (frequency-inverted, because the zone, the $17$th, is odd-numbered). Software-defined radios use this deliberate aliasing to digitise an intermediate frequency directly, but the anti-aliasing filter must then be a band-pass filter that removes everything else that would fold onto the same place.
:::

## Where this leads

The sampling theorem underlies all of [[dsp]], where sample-rate conversion, the DFT and digital filter design build on the relations derived here, and [[communication-systems]], where the Nyquist rate limits pulse rates through band-limited channels. The effective frequency response [[#eq-effective]] is how digital controllers are analysed in [[control-systems]], with the $z$-transform of [[signals-systems/z-transform]] replacing the DTFT when stability is at stake. Quantisation, the other half of analog-to-digital conversion, is treated in [[dsp]] and [[instrumentation]].

::: history
The sampling theorem has many fathers. Edmund Taylor Whittaker studied the "cardinal function" [[#eq-interpolation]] as an interpolation formula in 1915. Harry Nyquist showed in 1928 that $2W$ independent pulse amplitudes per second can be sent through a channel of bandwidth $W$. Vladimir Kotelnikov stated and proved the theorem for communication engineering in 1933, in a paper little known outside the Soviet Union for decades, and Claude Shannon gave the now-standard statement and proof in "Communication in the Presence of Noise" (1949), crediting Whittaker and Nyquist. Pulse-code modulation, which relies on it, had been patented by Alec Reeves in 1938, and the first commercial digital telephone transmission systems (T1, at $8\,\mathrm{kHz}$ per channel) went into service in the United States in 1962.
:::

::: summary
- Sampling with period $T$ replicates the spectrum: $X_p(j\Omega) = \frac1T\sum_kX_c(j(\Omega - k\omega_s))$, and the DTFT of the samples is this with $\omega = \Omega T$.
- Sampling theorem: a signal band-limited to $\Omega_M$ is determined by its samples if $\omega_s > 2\Omega_M$ (the Nyquist rate).
- Ideal reconstruction is sinc interpolation, $x_c(t) = \sum x_c(nT)\operatorname{sinc}$; it is exact but non-causal.
- Below the Nyquist rate, a tone at $f_0$ appears at $\lvert f_0 - kf_s\rvert \in [0, f_s/2]$; aliasing cannot be undone after sampling.
- Anti-aliasing filters must attenuate everything above $f_s - f_p$; oversampling makes them simple and moves sharp filtering into the digital domain.
- A zero-order hold DAC has sinc droop ($-3.92\,\mathrm{dB}$ at $f_s/2$), leaves images that a reconstruction filter must remove, and delays by $T/2$.
- With band-limited inputs, a DT system $H(e^{j\omega})$ between ideal converters acts as the CT system $H(e^{j\Omega T})$ for $\lvert\Omega\rvert < \pi/T$.
:::

## Exercises

::: exercise Nyquist rate {level=1 check="12000"}
What is the Nyquist rate, in hertz, of $x(t) = 3\cos(2\pi\cdot1000t) + \sin(2\pi\cdot6000t)$?
::: solution
The highest frequency is $6\,\mathrm{kHz}$, so the Nyquist rate is $12\,\mathrm{kHz}$; sampling must be faster than this.
:::
:::

::: exercise An alias {level=1 check="200"}
A $4.2\,\mathrm{kHz}$ tone is sampled at $f_s = 4\,\mathrm{kHz}$. At what frequency, in hertz, does it appear?
::: solution
$\lvert4.2 - 4\rvert = 0.2\,\mathrm{kHz} = 200\,\mathrm{Hz}$.
:::
:::

::: exercise ZOH droop {level=1 check="sin(pi/4)/(pi/4)"}
Find the gain of a zero-order hold, relative to its DC gain, at $f = f_s/4$.
::: solution
$\sin(\pi/4)/(\pi/4) = 0.900$, a loss of $0.91\,\mathrm{dB}$.
:::
:::

::: exercise Aliasing in a product {level=2}
The signal $x(t) = \cos(2\pi\cdot3000t)$ is sampled at $f_s = 5\,\mathrm{kHz}$ and reconstructed with an ideal $2.5\,\mathrm{kHz}$ low-pass filter. What signal is output? Then the samples are squared before reconstruction. What is output now, and how does it compare with sampling $x^2(t)$?
::: solution
The samples are $\cos(2\pi\cdot0.6n) = \cos(2\pi\cdot0.4n)$, so the output is $\cos(2\pi\cdot2000t)$. Squaring the samples gives $\cos^2(2\pi\cdot0.4n) = \frac12 + \frac12\cos(2\pi\cdot0.8n) = \frac12 + \frac12\cos(2\pi\cdot0.2n)$, reconstructed as $\frac12 + \frac12\cos(2\pi\cdot1000t)$. Sampling $x^2(t) = \frac12 + \frac12\cos(2\pi\cdot6000t)$ at $5\,\mathrm{kHz}$ gives the same samples, since $6\,\mathrm{kHz}$ aliases to $1\,\mathrm{kHz}$: squaring and sampling commute on the samples, and both are aliased.
:::
:::

::: exercise A digital differentiator in real time {level=2}
A sampled system with $f_s = 1\,\mathrm{kHz}$ uses the DT filter $y[n] = f_s\,(x[n] - x[n-1])$. Find its effective CT frequency response for band-limited inputs and compare it with an ideal differentiator $j\Omega$ at $10\,\mathrm{Hz}$ and $250\,\mathrm{Hz}$.
::: solution
$H(e^{j\omega}) = f_s(1 - e^{-j\omega}) = 2jf_se^{-j\omega/2}\sin(\omega/2)$, so $H_{\text{eff}}(j\Omega) = 2jf_se^{-j\Omega T/2}\sin(\Omega T/2)$. Its magnitude relative to $\Omega$ is $\sin(\Omega T/2)/(\Omega T/2)$. At $10\,\mathrm{Hz}$: $\Omega T/2 = \pi\cdot0.01$, ratio $0.9998$. At $250\,\mathrm{Hz}$: $\Omega T/2 = \pi/4$, ratio $0.900$. It also adds a delay of half a sample. Good at low frequencies, increasingly inaccurate towards $f_s/2$.
:::
:::

::: exercise Choosing a sampling rate {level=2}
An ECG signal has useful content up to $150\,\mathrm{Hz}$. The available anti-aliasing filter is a fourth-order Butterworth with $f_c = 150\,\mathrm{Hz}$. Choose the lowest sampling rate (a round number of hertz) such that anything that aliases into $0$–$150\,\mathrm{Hz}$ is attenuated by at least $60\,\mathrm{dB}$.
::: hint
Find $f$ with $10\log_{10}(1 + (f/150)^8) = 60$, then $f_s = f + 150\,\mathrm{Hz}$.
:::
::: solution
$(f/150)^8 \approx 10^6$ gives $f/150 = 10^{0.75} = 5.62$, $f = 843\,\mathrm{Hz}$. Then $f_s \ge 843 + 150 = 993\,\mathrm{Hz}$; choose $f_s = 1\,\mathrm{kHz}$, a common choice for diagnostic ECGs. The Nyquist rate of the wanted band alone ($300\,\mathrm{Hz}$) would be far too low with this filter.
:::
:::

::: exercise Interpolation passes through the samples {level=2}
Show that the interpolation formula [[#eq-interpolation]] gives $x_c(mT)$ at $t = mT$ for every integer $m$, whatever the samples are. Does this mean any set of samples defines a band-limited signal?
::: solution
At $t = mT$, the $n$th term contains $\sin(\pi(m - n))/(\pi(m - n))$, which is $1$ for $n = m$ and $0$ for $n \ne m$ (since $\sin(\pi k) = 0$ for integer $k \ne 0$). So only the term $n = m$ survives, giving $x_c(mT)$. Yes: any bounded sequence with finite energy defines, through [[#eq-interpolation]], a finite-energy signal band-limited to $\pi/T$, the unique such signal through those samples. This is the content of the theorem read backwards.
:::
:::

::: exercise Sampling a sinusoid at exactly the Nyquist rate {level=3}
Show that $x(t) = \sin(\Omega_0t + \phi)$ sampled at $\omega_s = 2\Omega_0$ gives $x[n] = (-1)^n\sin\phi$. Which signals band-limited to $\Omega_0$ produce the same samples? Why does this justify the strict inequality in [[#thm-sampling]]?
::: solution
With $T = \pi/\Omega_0$: $x[n] = \sin(\pi n + \phi) = \sin(\pi n)\cos\phi + \cos(\pi n)\sin\phi = (-1)^n\sin\phi$. Any $A\sin(\Omega_0t + \theta)$ with $A\sin\theta = \sin\phi$ gives the same samples, for example $\sin\phi\cos(\Omega_0t)$ (with $\theta = \pi/2$) and, if $\phi = 0$, the zero signal. Amplitude and phase cannot be separated, so the samples do not determine the signal. The spectrum of a sinusoid contains impulses exactly at $\pm\Omega_0 = \pm\omega_s/2$, where the copies in [[#eq-replicas]] touch and add; the strict inequality excludes this.
:::
:::

::: exercise Designing a bandpass sampling scheme {level=3}
A signal occupies $20$–$25\,\mathrm{MHz}$. Show that $f_s = 10\,\mathrm{MHz}$ samples it without aliasing, find where the band appears in $0$–$5\,\mathrm{MHz}$ and whether it is inverted in frequency, and explain why $f_s = 11\,\mathrm{MHz}$ fails.
::: hint
The band must lie entirely between two consecutive multiples of $f_s/2$.
:::
::: solution
Multiples of $f_s/2 = 5\,\mathrm{MHz}$: $20$ and $25\,\mathrm{MHz}$ are exactly the $4$th and $5$th, so the band fills one Nyquist zone without straddling a fold. Subtracting $2f_s = 20\,\mathrm{MHz}$ maps $20$–$25$ to $0$–$5\,\mathrm{MHz}$, not inverted (the zone index $4$ is even). With $f_s = 11\,\mathrm{MHz}$, $f_s/2 = 5.5$ and the multiples near the band are $16.5$, $22$, $27.5\,\mathrm{MHz}$: the band straddles the fold at $22\,\mathrm{MHz}$, so $20$–$22$ maps to $2$–$0\,\mathrm{MHz}$ (inverted) and $22$–$25$ maps to $0$–$3\,\mathrm{MHz}$; the two parts overlap on $0$–$2\,\mathrm{MHz}$ and alias onto each other. (In practice the band would be placed with guard bands inside a zone, since an exact fit leaves no room for the filter's transition.)
:::
:::
