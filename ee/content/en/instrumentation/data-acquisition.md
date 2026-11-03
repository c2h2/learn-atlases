A condition-monitoring system on a wind turbine records eight accelerometers on the gearbox and bearings, two shaft encoders, the generator's three phase currents, and a dozen temperatures. The vibration channels need tens of kilohertz of bandwidth and a dynamic range large enough to see a $0.01\,g$ bearing defect beneath a $5\,g$ gear-mesh tone; the temperatures change over minutes and need a tenth of a degree; the currents must be sampled simultaneously so that their phase relations are preserved. All of them end up as numbers in a computer, and every one of those numbers has been through the same chain: sensor, conditioning, an anti-aliasing filter, perhaps a multiplexer, a sample-and-hold, an analog-to-digital converter (ADC), and a digital interface. That chain is a **data-acquisition system** (DAQ), and designing it means deciding, channel by channel, how fast to sample, how finely to quantise, and how to protect the samples from aliasing, crosstalk, timing errors and noise.

This chapter assembles the chain. It builds on the sampling theorem and aliasing of [[signals-systems/sampling]], which we do not re-derive, and on the amplified, filtered signals produced in [[instrumentation/instrumentation-amplifiers]]. We define the converter's ideal behaviour and derive the quantisation-noise limit $6.02N + 1.76\,\mathrm{dB}$; define the dynamic specifications (SNR, SINAD, THD, SFDR, ENOB) by which real converters are compared; derive the jitter limit; design anti-aliasing filters for a given resolution; analyse multiplexer and ADC-driver settling; and survey the converter architectures with their typical ranges as of 2026. The internal circuit design of converters is in [[electronics-2/data-converters]]; the digital filtering and decimation that follow are in [[dsp/multirate-processing]].

## The acquisition chain {#sec-chain}

A typical multichannel DAQ has, per channel, a front end (amplifier, gain selection, anti-aliasing filter), and then either a **multiplexer** (MUX) that connects the channels in turn to one sample-and-hold and ADC, or one ADC per channel. The ADC output goes through a digital interface (SPI, a parallel bus, or a serial link such as JESD204 at high speeds) to a processor, FPGA or computer, often with digital filtering and decimation on the way.

::: definition Simultaneous and multiplexed sampling {#def-mux}
In **multiplexed** sampling one converter serves $M$ channels in sequence, each channel being sampled at $f_s/M$ if the converter runs at $f_s$; successive channels are sampled at different instants, a **skew** of $1/f_s$ between neighbours. In **simultaneous** sampling every channel is sampled at the same instant, by one ADC per channel or by a sample-and-hold per channel before a shared converter.
:::

Skew matters whenever the relation between channels matters. Two channels sampled $\Delta t$ apart see a sinusoid of frequency $f$ with a spurious phase difference $2\pi f\Delta t$. For power measurements (voltage times current), three-phase systems, vibration analysis with cross-spectra, or beam-forming with microphone arrays, simultaneous sampling or a correction for the known skew is required.

::: example Phase error from multiplexing {#ex-skew}
A power analyser samples a voltage channel and a current channel through one $100\,\mathrm{kS/s}$ ADC, alternately, so each channel gets $50\,\mathrm{kS/s}$ and the current is sampled $10\,\mathrm{\mu s}$ after the voltage. Find the phase error at $50\,\mathrm{Hz}$ and at the $20$th harmonic ($1\,\mathrm{kHz}$), and its effect on the measured active power at a true power factor of $0.5$ ($\phi = 60^\circ$) at $50\,\mathrm{Hz}$.
::: solution
The phase error is $360^\circ\times f\Delta t$: $360\times50\times10^{-5} = 0.18^\circ$ at $50\,\mathrm{Hz}$ and $3.6^\circ$ at $1\,\mathrm{kHz}$. Active power is $VI\cos\phi$; measured with $\phi' = 60.18^\circ$ instead of $60^\circ$, the ratio is $\cos60.18^\circ/\cos60^\circ = 0.4973/0.5 = 0.9946$, an error of $-0.54\,\%$ — far outside a class $0.2$ meter's tolerance. Either sample simultaneously or shift the current samples back by $10\,\mathrm{\mu s}$ with a fractional-delay interpolator ([[dsp/multirate-processing]]).
:::
:::

## Quantisation {#sec-quantisation}

::: definition Ideal ADC {#def-adc}
An ideal $N$-bit ADC with **full-scale range** $\mathrm{FSR}$ (for example $0$ to $V_{\text{ref}}$, or $\pm V_{\text{ref}}$ for $\mathrm{FSR} = 2V_{\text{ref}}$) maps an input $v$ to an integer code $k \in \{0, \dots, 2^N - 1\}$ such that the reconstructed value $kq$ (plus a fixed offset) is the nearest level to $v$. The step size is the **least significant bit**

$$
q = 1\,\mathrm{LSB} = \frac{\mathrm{FSR}}{2^N}.
$$ {#eq-lsb}

The **quantisation error** $e = v_q - v$ lies in $[-q/2, q/2]$ for inputs within range; outside it the converter **clips** (saturates).
:::

The quantisation error of a single sample is a deterministic function of the input — a sawtooth of $v$. But for an input that is busy (spans many LSBs and is not synchronised with the sampling), successive errors are nearly uncorrelated and uniformly distributed over one LSB. Under that model quantisation is an additive white noise.

::: theorem Quantisation noise and the ideal SNR {#thm-sqnr}
If the quantisation error is uniformly distributed on $[-q/2, q/2]$, its mean is zero and its RMS value is

$$
e_{\text{rms}} = \frac{q}{\sqrt{12}} .
$$ {#eq-qnoise}

For a full-scale sine input (peak-to-peak equal to $\mathrm{FSR}$), the signal-to-quantisation-noise ratio of an ideal $N$-bit converter is

$$
\mathrm{SQNR} = 20\log_{10}\left(2^N\sqrt{\tfrac32}\right) = 6.02N + 1.76\ \mathrm{dB}.
$$ {#eq-sqnr}

The noise is spread uniformly from DC to $f_s/2$.
:::

::: proof
For $e$ uniform on $[-q/2, q/2]$, $\E[e^2] = \frac1q\int_{-q/2}^{q/2}e^2\,\dd e = \frac{q^2}{12}$ (the rectangular distribution of [[instrumentation/measurement-uncertainty#prop-typeb]] with $a = q/2$). A full-scale sine has amplitude $\mathrm{FSR}/2 = 2^Nq/2$ and RMS value $2^Nq/(2\sqrt2)$. The ratio of RMS values is $\dfrac{2^Nq/(2\sqrt2)}{q/\sqrt{12}} = 2^N\sqrt{\dfrac{12}{8}} = 2^N\sqrt{1.5}$, and $20\log_{10}$ of it is $N\cdot20\log_{10}2 + 10\log_{10}1.5 = 6.02N + 1.76\,\mathrm{dB}$. Samples with uncorrelated errors have a flat (white) spectrum, which for real samples at rate $f_s$ is spread over $[0, f_s/2]$.
:::

So each bit buys $6\,\mathrm{dB}$: an ideal $12$-bit converter has $74.0\,\mathrm{dB}$, a $16$-bit $98.1\,\mathrm{dB}$, a $24$-bit $146.2\,\mathrm{dB}$ — the last far beyond the thermal noise of any real front end, which is why $24$-bit converters are specified by their noise, not by their bit count.

::: widget plot
f: q*round(x/q); x; q*round(x/q) - x
x: -1, 1
y: -1.1, 1.1
sliders: q=0.25:0.01:0.5:0.01
labels: \text{quantised } v_q; v; e = v_q - v
caption: An ideal mid-tread quantiser with step $q$ (slider), input on the horizontal axis. The staircase (blue) approximates the input (orange); the error (green) is a sawtooth confined to $\pm q/2$. Shrink $q$ — one more bit halves it — and the error shrinks with it. For a busy input the sawtooth is sampled at effectively random points, which is why the error behaves like noise of RMS value $q/\sqrt{12}$.
:::

::: warning The noise model needs a busy signal
The white-noise model fails for slowly varying, small or periodic inputs synchronised with the sampling clock. A DC input gives a *constant* error of up to $q/2$, not noise, and averaging does not reduce it. A small sine of a few LSB gives harmonics, not noise. The cure is **dither**: add random noise of about one LSB RMS (or more) before the converter. The error then becomes noise-like, its mean (for a DC input) equals the true input, and averaging resolves fractions of an LSB. Most precision DAQs have enough analog noise to dither themselves; a very quiet front end may need deliberate dither.
:::

### Oversampling

The total quantisation noise power $q^2/12$ does not depend on $f_s$, but it is spread over $[0, f_s/2]$. If the signal occupies only $[0, f_B]$, a digital low-pass filter removes the noise above $f_B$, and the remaining in-band noise is the fraction $2f_B/f_s$ of the total.

::: proposition Processing gain of oversampling {#prop-osr}
With white quantisation noise and an ideal digital filter to the signal band $f_B$, sampling at $f_s = \mathrm{OSR}\cdot2f_B$ improves the SNR by

$$
\Delta\mathrm{SNR} = 10\log_{10}\mathrm{OSR}\ \mathrm{dB},
$$ {#eq-osr}

i.e. half a bit ($3\,\mathrm{dB}$) for every doubling of the **oversampling ratio**.
:::

::: proof
The in-band noise power is $\frac{q^2}{12}\cdot\frac{2f_B}{f_s} = \frac{q^2}{12\,\mathrm{OSR}}$, while the signal power is unchanged. The SNR therefore rises by the factor $\mathrm{OSR}$, or $10\log_{10}\mathrm{OSR}$ dB.
:::

Plain oversampling is expensive: one extra bit costs a factor of four in sample rate. **Sigma–delta** ($\Sigma\Delta$) converters do much better by **noise shaping**: a feedback loop around a coarse quantiser (often one bit) pushes the quantisation noise out of the signal band towards $f_s/2$, so that the in-band noise falls by $(2L + 1)\times3\,\mathrm{dB}$ per doubling of OSR for an $L$th-order loop. A fourth-order modulator at $\mathrm{OSR} = 256$ reaches well beyond $20$ bits of in-band SQNR; the analysis belongs to [[electronics-2/data-converters]].

## Dynamic specifications {#sec-specs}

Real converters fall short of [[#eq-sqnr]] because of thermal noise in their circuits, non-linearity (unequal step sizes), and timing errors. They are characterised by applying a pure, nearly full-scale sinusoid and computing the spectrum of the output with an FFT ([[dsp/spectral-analysis]]).

::: definition SNR, THD, SINAD, SFDR and ENOB {#def-dynamic}
For a sinusoidal input of frequency $f_{in}$, with powers measured in the output spectrum over $[0, f_s/2]$:

- **SNR**: signal power to the power of all noise, excluding harmonics and DC;
- **THD** (total harmonic distortion): power of the harmonics (usually the first five to nine) relative to the signal;
- **SINAD** (signal to noise and distortion): signal power to the power of everything else except DC, so that $\mathrm{SINAD} = -10\log_{10}\big(10^{-\mathrm{SNR}/10} + 10^{\mathrm{THD}/10}\big)$ with THD in dB (negative);
- **SFDR** (spurious-free dynamic range): ratio of the signal to the largest single spur, harmonic or not;
- **ENOB** (effective number of bits): the resolution of an ideal converter with the same SINAD,

$$
\mathrm{ENOB} = \frac{\mathrm{SINAD} - 1.76\,\mathrm{dB}}{6.02\,\mathrm{dB}} .
$$ {#eq-enob}

All are quoted for a stated input amplitude (often $-1\,\mathrm{dBFS}$) and frequency; ENOB is normally referred to a full-scale input.
:::

Static specifications complement them: **offset** and **gain error** (correctable by calibration), **integral non-linearity** (INL, the maximum deviation of the transfer function from a straight line, in LSB) and **differential non-linearity** (DNL, the deviation of each step width from $1\,\mathrm{LSB}$; $\mathrm{DNL} < -1\,\mathrm{LSB}$ means a missing code).

::: example ENOB from a data sheet {#ex-enob}
A $16$-bit SAR ADC has, at $f_{in} = 10\,\mathrm{kHz}$ and $-0.5\,\mathrm{dBFS}$, $\mathrm{SNR} = 92\,\mathrm{dB}$ and $\mathrm{THD} = -105\,\mathrm{dB}$. Find SINAD and ENOB. Compare with an ideal $16$-bit converter.
::: solution
$\mathrm{SINAD} = -10\log_{10}(10^{-9.2} + 10^{-10.5}) = -10\log_{10}(6.310\times10^{-10} + 3.16\times10^{-11}) = -10\log_{10}(6.626\times10^{-10}) = 91.79\,\mathrm{dB}$. Referred to full scale, SINAD is $92.29\,\mathrm{dB}$ (add the $0.5\,\mathrm{dB}$ by which the test signal was below full scale), so $\mathrm{ENOB} = (92.29 - 1.76)/6.02 = 15.04$ bits. The ideal $16$-bit SQNR is $98.1\,\mathrm{dB}$; the converter loses about one bit to thermal noise, a typical figure for precision SAR converters.
:::
:::

::: quiz
A "$16$-bit" converter's data sheet gives $\mathrm{SINAD} = 86\,\mathrm{dB}$ for a full-scale input. A $1\,\mathrm{mV}$ change on its $\pm10\,\mathrm{V}$ range is to be detected in a single sample. Is that realistic?
- [ ] No: $1\,\mathrm{mV}$ is below one LSB
- [x] Yes, but only just: ENOB is about $14$ bits, so the noise is about $0.4\,\mathrm{mV}$ RMS
- [ ] Yes, easily: $1\,\mathrm{mV}$ is more than $3$ LSB
- [ ] It depends only on the INL
::: solution
One LSB is $20\,\mathrm{V}/65\,536 = 0.31\,\mathrm{mV}$. But the converter's noise matters more than its step: $\mathrm{ENOB} = (86 - 1.76)/6.02 = 14.0$, so the total noise and distortion is that of an ideal $14$-bit converter, $q_{14}/\sqrt{12} = (20/16\,384)/\sqrt{12} = 0.35\,\mathrm{mV}$ RMS. A $1\,\mathrm{mV}$ step is about three times the RMS noise: detectable in one sample with some risk of error, reliably after averaging a few samples.
:::
:::

## Aperture jitter {#sec-jitter}

A sample is supposed to be taken at $t = nT$. In reality the instant wanders by a small random amount $\delta t_n$: the **jitter** of the sampling clock and of the sample-and-hold's aperture. For a rapidly changing input, a timing error is a voltage error.

::: theorem Jitter-limited SNR {#thm-jitter}
A full-scale sine $v(t) = A\sin(2\pi f_{in}t)$ sampled with random timing errors of RMS value $\sigma_j$, independent of the signal, acquires an error of RMS value $2\pi f_{in}\sigma_j A/\sqrt2$. The SNR limit is

$$
\mathrm{SNR}_j = -20\log_{10}\left(2\pi f_{in}\sigma_j\right)\ \mathrm{dB},
$$ {#eq-jitter}

independent of the amplitude and of the resolution. Independent noise sources combine as $\mathrm{SNR} = -10\log_{10}\big(\sum_k10^{-\mathrm{SNR}_k/10}\big)$.
:::

::: proof
To first order, a timing error $\delta t$ produces a voltage error $\delta v = v'(t)\,\delta t = 2\pi f_{in}A\cos(2\pi f_{in}t)\,\delta t$. With $\delta t$ independent of the signal phase, $\E[\delta v^2] = (2\pi f_{in}A)^2\,\E[\cos^2]\,\sigma_j^2 = (2\pi f_{in}A)^2\sigma_j^2/2$. Dividing by the signal power $A^2/2$ gives $\mathrm{SNR}_j = 1/(2\pi f_{in}\sigma_j)^2$, i.e. [[#eq-jitter]] in decibels. Independent noise powers add; expressing each as a fraction $10^{-\mathrm{SNR}_k/10}$ of the signal power and summing gives the combination rule.
:::

Jitter is irrelevant for slow signals and dominant for fast ones. At $f_{in} = 1\,\mathrm{kHz}$, even $1\,\mathrm{ns}$ of jitter allows $104\,\mathrm{dB}$. At $100\,\mathrm{MHz}$, a clock with $100\,\mathrm{fs}$ RMS jitter limits the SNR to $84.0\,\mathrm{dB}$, about $13.7$ bits, whatever the converter's resolution. This is why high-speed converters for radio receivers specify clock sources with jitter in the tens of femtoseconds, and why the clock is distributed on its own low-noise path.

::: widget plot
f: -20*log10(2*pi*x*1e6*s*1e-12); 6.02*N + 1.76 + 0*x
x: 0.01, 1000
y: 40, 140
sliders: s=1:0.01:100:0.01; N=16:8:24:1
labels: \mathrm{SNR}_j; \text{ideal } 6.02N + 1.76
caption: Jitter-limited SNR (dB) against input frequency in megahertz for RMS jitter $\sigma_j$ in picoseconds (slider), with the quantisation limit of an $N$-bit converter. Where the falling line crosses the horizontal one, jitter starts to cost resolution. With $1\,\mathrm{ps}$ and $16$ bits, the crossing is near $2\,\mathrm{MHz}$; set $s = 0.1$ ($100\,\mathrm{fs}$) and it moves to $20\,\mathrm{MHz}$.
:::

::: example A jitter budget {#ex-jitter}
What RMS jitter is allowed if jitter alone must not limit a $16$-bit converter (ideal SQNR $98.1\,\mathrm{dB}$) at $f_{in} = 1\,\mathrm{MHz}$? A converter has thermal-noise-limited $\mathrm{SNR} = 90\,\mathrm{dB}$ and is clocked with $\sigma_j = 2\,\mathrm{ps}$; find the total SNR at $1\,\mathrm{MHz}$ and at $10\,\mathrm{MHz}$.
::: solution
From [[#eq-jitter]], $\sigma_j = 10^{-98.1/20}/(2\pi\times10^6) = 1.25\times10^{-5}/6.28\times10^6 = 1.99\,\mathrm{ps}$; to be comfortably below, aim for well under $1\,\mathrm{ps}$. With $2\,\mathrm{ps}$: at $1\,\mathrm{MHz}$, $\mathrm{SNR}_j = -20\log_{10}(2\pi\times10^6\times2\times10^{-12}) = 98.0\,\mathrm{dB}$, and the total is $-10\log_{10}(10^{-9} + 10^{-9.80}) = 89.4\,\mathrm{dB}$. At $10\,\mathrm{MHz}$, $\mathrm{SNR}_j = 78.0\,\mathrm{dB}$ and the total $77.7\,\mathrm{dB}$: jitter now dominates and has cost two bits.
:::
:::

## Anti-aliasing filters {#sec-aaf}

From [[signals-systems/sampling]], every component above $f_s/2$ folds into $[0, f_s/2]$, and a component at frequency $f$ lands in the signal band $[0, f_B]$ if $f$ is within $f_B$ of a multiple of $f_s$; the lowest such frequency is $f_s - f_B$. The **anti-aliasing filter** (AAF) must therefore attenuate everything above $f_s - f_B$ to an acceptable level — for a DAQ, usually below the converter's noise floor or below $\tfrac12\,\mathrm{LSB}$ — while passing $[0, f_B]$ with the required flatness. It must be analog, because aliasing cannot be undone after sampling.

::: algorithm Choosing the sampling rate and anti-aliasing filter {#alg-aaf}
1. From the signal, fix the band $f_B$, the passband flatness (e.g. $0.1\,\mathrm{dB}$) and, if waveforms matter, the phase linearity.
2. From the resolution, fix the required stop-band attenuation $A_s$: for an $N$-bit converter and full-scale interferers, about $6.02N + 1.76\,\mathrm{dB}$; less if the interference above $f_s - f_B$ is known to be small.
3. Choose a filter family and order $n$; compute the frequency $f_a$ at which the attenuation reaches $A_s$ (for Butterworth, $10\log_{10}[1 + (f_a/f_c)^{2n}] = A_s$).
4. Set $f_s \ge f_a + f_B$. If this rate is too high for the converter or the data link, raise the order, or oversample with a sigma–delta converter and let its digital decimation filter do the sharp filtering.
5. Check the filter's group delay, step-response settling and its own noise and distortion, which add to the error budget.
:::

::: widget plot
f: -10*log10(1 + x^(2*n)); -98 + 0*x
x: 0.1, 100
y: -140, 5
sliders: n=4:1:8:1
labels: \text{Butterworth, order } n; -98\,\mathrm{dB}\ (16\text{ bits})
caption: Attenuation of an $n$th-order Butterworth low-pass filter against frequency normalised to its cut-off $f/f_c$, with the $98\,\mathrm{dB}$ level needed to bring a full-scale alias below the noise of a $16$-bit converter. With $n = 4$ the line crosses at $f/f_c \approx 17$; with $n = 8$, at about $4.1$. Every step in order moves the crossing in — and every step adds components, noise and group-delay distortion.
:::

::: example Sampling rate for a 16-bit vibration channel {#ex-aaf-design}
A vibration channel needs $0$–$10\,\mathrm{kHz}$ with a $16$-bit converter, and any alias must be below $-98\,\mathrm{dB}$. The anti-aliasing filter is a fourth-order Butterworth with $f_c = 10\,\mathrm{kHz}$ ($3\,\mathrm{dB}$ loss at the band edge is accepted and corrected digitally). Find the minimum sampling rate. Repeat for an eighth-order filter, and comment on using a sigma–delta ADC with $f_s = 6.4\,\mathrm{MHz}$ modulator rate.
::: solution
Fourth order: $(f_a/f_c)^8 = 10^{9.8} - 1$, so $f_a/f_c = 10^{9.8/8} = 16.8$, $f_a = 168\,\mathrm{kHz}$, and $f_s \ge 168 + 10 = 178\,\mathrm{kHz}$; use $200\,\mathrm{kS/s}$, a $20\times$ oversampling of the Nyquist rate. Eighth order: $f_a/f_c = 10^{9.8/16} = 4.10$, $f_a = 41\,\mathrm{kHz}$, $f_s \ge 51\,\mathrm{kHz}$; but an eighth-order active filter needs four op-amps and sixteen precision components, and its group delay varies strongly near $10\,\mathrm{kHz}$. With a sigma–delta converter, aliases come only from near multiples of $6.4\,\mathrm{MHz}$; a simple second-order RC filter at about $100\,\mathrm{kHz}$ attenuates $6.39\,\mathrm{MHz}$ by $10\log_{10}(1 + 63.9^4) = 72\,\mathrm{dB}$, and the converter's digital filter provides the sharp cut-off at $10\,\mathrm{kHz}$ before decimation to, say, $25.6\,\mathrm{kS/s}$. Plus a little extra analog filtering for the remaining margin, this is how most modern vibration DAQs are built.
:::
:::

## Multiplexers, sample-and-holds and settling {#sec-settling}

An ADC samples its input by connecting a sampling capacitor $C_s$ (picofarads to tens of picofarads) to the input for an **acquisition time** $t_{acq}$, then disconnecting it and converting. Before the next sample is valid, the capacitor's voltage must settle to within a fraction of an LSB of the new input. With a multiplexer the problem is worse: the previous channel may have been at the opposite end of the range, so the input sees a full-scale step every time the MUX switches.

::: proposition Settling time for N bits {#prop-settling}
A first-order (RC) system driven by a full-scale step settles to within $\tfrac12\,\mathrm{LSB}$ of an $N$-bit converter after

$$
t_s = \tau\ln\left(2^{N+1}\right) = (N + 1)\,\tau\ln2,
$$ {#eq-settling}

i.e. $9.0\tau$ for $12$ bits, $11.8\tau$ for $16$ bits and $13.2\tau$ for $18$ bits.
:::

::: proof
After a step of size $\mathrm{FSR}$, the remaining error is $\mathrm{FSR}\,e^{-t/\tau}$. Setting it equal to $q/2 = \mathrm{FSR}/2^{N+1}$ gives $e^{-t/\tau} = 2^{-(N+1)}$, so $t = \tau(N + 1)\ln2$.
:::

Real drivers are not first order: an op-amp also has slew-rate limiting and a second-order settling tail, and the sampling capacitor's charge "kickback" disturbs the driver every time it connects. SAR converter data sheets therefore recommend a driver circuit: a fast, low-noise op-amp, a small series resistor, and a **charge-bucket** capacitor $C_f$ at the ADC input, much larger than $C_s$ (typically $20$ to $50$ times), which supplies the charge instantly and is then recharged by the op-amp through the resistor. The RC formed by the resistor and $C_f$ must satisfy [[#eq-settling]] within $t_{acq}$.

::: example Multiplexed 16-bit channel {#ex-mux}
An $8$-channel MUX feeds a $16$-bit SAR ADC running at $200\,\mathrm{kS/s}$ (so $25\,\mathrm{kS/s}$ per channel). The ADC needs $1\,\mathrm{\mu s}$ to convert, leaving $t_{acq} = 4\,\mathrm{\mu s}$. A buffer after the MUX drives the ADC through $R$ into $C_f = 1\,\mathrm{nF}$. Find the largest $R$. Why must the buffer be *after* the MUX, and what happens if the sources drive the MUX directly through $10\,\mathrm{k\Omega}$?
::: solution
By [[#eq-settling]] the time constant must satisfy $11.8\tau \le 4\,\mathrm{\mu s}$, so $\tau \le 0.34\,\mathrm{\mu s}$ and $R \le 0.34\,\mathrm{\mu s}/1\,\mathrm{nF} = 339\,\Omega$; choose $300\,\Omega$ (and check that the buffer settles fast enough too, which needs a bandwidth of several megahertz). The buffer must follow the MUX because it is the step at the MUX output that must settle, and the MUX's own on-resistance and capacitance form part of the RC. With $10\,\mathrm{k\Omega}$ sources and no buffer, $\tau = 10\,\mathrm{k\Omega}\times1\,\mathrm{nF} = 10\,\mathrm{\mu s}$: after $4\,\mathrm{\mu s}$ the error is $e^{-0.4} = 67\,\%$ of the step, so each channel reads mostly the previous channel's value — **crosstalk** or "ghosting", one of the commonest faults of multiplexed systems.
:::
:::

::: quiz
A $12$-bit ADC reads a thermocouple amplifier through an $8$-channel MUX; the other seven channels are at full scale. The thermocouple channel shows readings that jump by tens of LSB whenever the neighbouring channel changes. What is the most likely cause?
- [ ] Quantisation noise
- [ ] Aliasing of the thermocouple signal
- [x] Incomplete settling after the MUX switches, so part of the previous channel's voltage remains
- [ ] Insufficient anti-aliasing filtering on the neighbouring channel
::: solution
Dependence on the *previous channel's* value is the signature of incomplete settling (or of charge left on the MUX and sampling capacitors). Quantisation noise is at most an LSB and independent of other channels; aliasing would depend on the thermocouple channel's own spectrum. The cures are a lower source impedance (a buffer after the MUX), a longer acquisition time, or a dummy conversion of a grounded channel between channels.
:::
:::

## Converter architectures and selection {#sec-architectures}

The architectures differ in how many comparisons they make per sample and when.

| architecture | principle | resolution | speed (as of 2026) | typical use |
|---|---|---|---|---|
| integrating (dual-slope, multi-slope) | integrate input for a fixed time, de-integrate against reference | $16$–$28$ bits | $1$–$10^3$ readings/s | multimeters, mains rejection |
| sigma–delta | oversampling, noise shaping, digital decimation | $16$–$32$ bits (noise-limited) | output rates from Hz to a few MS/s | weighing, temperature, audio, vibration |
| SAR (successive approximation) | binary search with a capacitive DAC, one bit per step | $8$–$20$ bits | to about $10$–$20\,\mathrm{MS/s}$ at $16$ bits | general DAQ, multiplexed systems, control |
| pipeline | cascade of low-resolution stages with residue amplification | $10$–$16$ bits | tens of MS/s to a few GS/s | communications, imaging, oscilloscopes |
| flash and time-interleaved | $2^N - 1$ comparators in parallel; several ADCs in rotation | $6$–$10$ bits (per core) | tens to over $100\,\mathrm{GS/s}$ | high-speed oscilloscopes, optical links |

Choosing among them is mostly a matter of matching three numbers — bandwidth, dynamic range and the need for low latency or multiplexing — with cost and power.

- **Sigma–delta** converters give the best resolution and integrate the anti-aliasing problem, but their digital filters add a latency of many output samples and need several outputs to settle after a step, so they multiplex poorly. They suit one-channel-per-converter systems.
- **SAR** converters have no latency (each sample is independent), switch between channels freely and have the best power efficiency at moderate speeds; they need a careful driver and an analog anti-aliasing filter.
- **Integrating** converters average the input over the integration time $T_i$, which nulls every frequency that completes a whole number of cycles in $T_i$: with $T_i = 20\,\mathrm{ms}$ (one mains cycle at $50\,\mathrm{Hz}$), $50\,\mathrm{Hz}$ and all its harmonics are rejected ([[instrumentation/test-instruments]]).
- **Pipeline** and **time-interleaved** converters serve bandwidths beyond the reach of the others, where clock jitter ([[#thm-jitter]]) rather than resolution usually sets the SNR.

::: application Software-defined acquisition
As of 2026, the boundary between DAQ and computing is fading. A single FPGA or system-on-chip can take the raw $16$-bit stream of a fast SAR or pipeline converter, apply calibration, digital anti-alias and decimation filters, digital down-conversion and triggering in real time, and stream the result over Ethernet; commercial modular DAQ systems synchronise thousands of channels to better than $100\,\mathrm{ns}$ using IEEE 1588 precision time protocol. The analog front end remains the part that sets the limits: aliasing, noise, settling and jitter cannot be fixed in software.
:::

## Design and practice: a channel budget {#sec-budget}

::: example Error budget of a 16-bit acquisition channel {#ex-budget}
A $16$-bit SAR ADC with $\pm5\,\mathrm{V}$ input ($\mathrm{FSR} = 10\,\mathrm{V}$) has transition (thermal) noise of $40\,\mathrm{\mu V}$ RMS. It is preceded by an in-amp at gain $10$ with input noise $20\,\mathrm{nV/\sqrt{Hz}}$ and a fourth-order Butterworth anti-aliasing filter at $f_c = 25\,\mathrm{kHz}$ (noise bandwidth $1.026f_c$), and sampled at $200\,\mathrm{kS/s}$ with a clock jitter of $10\,\mathrm{ps}$ RMS. For a full-scale $20\,\mathrm{kHz}$ sine, estimate the SNR and the ENOB of the channel.
::: solution
Work in RMS volts at the ADC input. Signal: $5/\sqrt2 = 3.536\,\mathrm{V}$.

| source | RMS noise |
|---|---|
| quantisation, $q/\sqrt{12}$ with $q = 10/65\,536 = 152.6\,\mathrm{\mu V}$ | $44.0\,\mathrm{\mu V}$ |
| ADC transition noise | $40.0\,\mathrm{\mu V}$ |
| in-amp: $10\times20\,\mathrm{nV/\sqrt{Hz}}\times\sqrt{1.026\times25\,\mathrm{kHz}}$ | $32.0\,\mathrm{\mu V}$ |
| jitter: $3.536\,\mathrm{V}\times2\pi\times20\,\mathrm{kHz}\times10\,\mathrm{ps}$ | $4.4\,\mathrm{\mu V}$ |
| total (root sum of squares) | $67.7\,\mathrm{\mu V}$ |

$\mathrm{SNR} = 20\log_{10}(3.536/67.7\times10^{-6}) = 94.4\,\mathrm{dB}$, so $\mathrm{ENOB} = (94.4 - 1.76)/6.02 = 15.4$ bits, before distortion. The three largest terms are comparable, which is a balanced design: halving any one of them alone would gain less than $1.5\,\mathrm{dB}$. Note that the in-amp's noise was computed over the *filter's* noise bandwidth, not the signal band: the anti-aliasing filter also sets the noise bandwidth, and a $0$–$20\,\mathrm{kHz}$ digital filter after the ADC would reduce the quantisation and ADC noise share (by $10\log_{10}(100/20) = 7\,\mathrm{dB}$) but not the in-amp noise already integrated by the analog filter up to $25\,\mathrm{kHz}$.
:::
:::

::: remark Resolution, accuracy and noise-free bits
Three different numbers are often confused. **Resolution** is the bit count $N$. **Effective resolution** is $\log_2(\mathrm{FSR}/v_{n,\text{rms}})$, and **noise-free resolution** uses the peak-to-peak noise ($\approx 6.6\,v_{n,\text{rms}}$) instead, about $2.7$ bits fewer; precision sigma–delta data sheets tabulate both against output rate. **Accuracy** includes offset, gain error, INL, reference drift and temperature effects, and for a $24$-bit converter it is typically at the $10^{-5}$ level — seventeen bits — however quiet it is.
:::

## Where this leads

The converters themselves — comparators, capacitive DACs, sigma–delta loops — are designed in [[electronics-2/data-converters]]. The digital side of acquisition — decimation filters, sample-rate conversion, spectral estimation of the recorded data with windows and averaging — is in [[dsp/multirate-processing]] and [[dsp/spectral-analysis]]. The same acquisition chain, built to the highest speeds, is the inside of the digital oscilloscope and spectrum analyser of [[instrumentation/test-instruments]]; and the microcontroller ADCs and timers that most small systems actually use are treated in [[embedded-systems/analog-interfaces]].

::: history
Alec Reeves patented pulse-code modulation in 1938, and Bell Labs built the first practical PCM coders in the 1940s. Bernard Gordon's company Epsco offered the vacuum-tube "Datrac", an 11-bit, 50 kS/s converter, in 1954 — one of the first commercial ADCs. Delta modulation (1940s–1950s) and the sigma–delta modulator described by Hiroshi Inose, Yasuhiko Yasuda and Jun Murakami in 1962 led, once VLSI made digital decimation filters cheap in the 1980s, to the oversampling converters that now dominate audio and precision measurement. Dual-slope integration became the basis of digital voltmeters in the 1960s. The analysis of quantisation as additive noise, with its $q^2/12$ variance, goes back to William Bennett's 1948 paper "Spectra of quantized signals", and Bernard Widrow gave the conditions under which it is exact in 1956.
:::

::: summary
- A DAQ chain is front end, anti-aliasing filter, (multiplexer), sample-and-hold, ADC and digital interface; multiplexing introduces inter-channel skew $2\pi f\Delta t$ and crosstalk from incomplete settling.
- An $N$-bit ADC has $q = \mathrm{FSR}/2^N$; uniform quantisation error has RMS $q/\sqrt{12}$, giving an ideal SQNR of $6.02N + 1.76\,\mathrm{dB}$ for a full-scale sine; dither makes the model valid for small or slow signals.
- Oversampling by OSR improves in-band SNR by $10\log_{10}\mathrm{OSR}$; noise shaping in sigma–delta converters does much better.
- Real converters are specified by SNR, THD, SINAD, SFDR and ENOB $= (\mathrm{SINAD} - 1.76)/6.02$, plus offset, gain, INL and DNL.
- Aperture jitter limits the SNR to $-20\log_{10}(2\pi f_{in}\sigma_j)$, independent of resolution; independent noise powers add.
- The anti-aliasing filter must attenuate everything above $f_s - f_B$ to the required level; order and sampling rate trade against each other; oversampling converters move sharp filtering into the digital domain.
- RC settling to $\tfrac12\,\mathrm{LSB}$ takes $(N + 1)\tau\ln2$; SAR inputs need a fast driver and a charge-bucket capacitor.
:::

## Exercises

::: exercise LSB size {level=1 check="5/4096"}
Find the LSB, in volts, of a $12$-bit ADC with a $0$–$5\,\mathrm{V}$ input range.
::: solution
$q = 5/2^{12} = 5/4096 = 1.22\,\mathrm{mV}$.
:::
:::

::: exercise Ideal SNR {level=1 check="6.02*14+1.76"}
What is the ideal SQNR, in dB, of a $14$-bit converter for a full-scale sine?
::: solution
$6.02\times14 + 1.76 = 86.0\,\mathrm{dB}$.
:::
:::

::: exercise ENOB {level=1 check="(74-1.76)/6.02"}
A converter has a full-scale SINAD of $74\,\mathrm{dB}$. Find its ENOB.
::: solution
$(74 - 1.76)/6.02 = 12.0$ bits.
:::
:::

::: exercise Oversampling {level=2 check="4^4"}
A converter's white quantisation noise is to be reduced by oversampling and digital filtering alone, to gain four effective bits. By what factor must the sampling rate be increased?
::: solution
Each bit is $6.02\,\mathrm{dB}$ and each doubling of OSR gives $3.01\,\mathrm{dB}$, so each bit costs a factor of $4$. Four bits: $4^4 = 256$. This is why noise shaping, not plain oversampling, is used for high resolution.
:::
:::

::: exercise Jitter at an IF {level=2 check="10^(-74/20)/(2*pi*70e6)"}
A receiver samples a $70\,\mathrm{MHz}$ intermediate frequency. What RMS jitter, in seconds, limits the SNR to $74\,\mathrm{dB}$?
::: solution
$\sigma_j = 10^{-74/20}/(2\pi\times70\times10^6) = 2.00\times10^{-4}/4.40\times10^8 = 0.45\,\mathrm{ps}$.
:::
:::

::: exercise Settling with a multiplexer {level=2 check="0.5e-6/(17*ln(2))"}
A $16$-bit SAR converter has an acquisition time of $0.5\,\mathrm{\mu s}$. What is the largest RC time constant, in seconds, of its input network for full-scale steps to settle to $\tfrac12\,\mathrm{LSB}$?
::: solution
$\tau \le 0.5\,\mathrm{\mu s}/(17\ln2) = 0.5/11.78 = 42\,\mathrm{ns}$. With a $2.7\,\mathrm{nF}$ charge-bucket capacitor, $R \le 15.7\,\Omega$ — which is why the driver op-amp must be stable driving almost directly into a large capacitor.
:::
:::

::: exercise Combining SINAD {level=2}
An ADC has $\mathrm{SNR} = 85\,\mathrm{dB}$ and $\mathrm{THD} = -80\,\mathrm{dB}$. Find SINAD and ENOB. Which would you improve first?
::: solution
$\mathrm{SINAD} = -10\log_{10}(10^{-8.5} + 10^{-8}) = -10\log_{10}(3.162\times10^{-9} + 10^{-8}) = 78.8\,\mathrm{dB}$; ENOB $= (78.8 - 1.76)/6.02 = 12.8$ bits. Distortion dominates; improving THD by $10\,\mathrm{dB}$ would raise SINAD to $83.8\,\mathrm{dB}$, while improving SNR by $10\,\mathrm{dB}$ would only reach $79.9\,\mathrm{dB}$. The input driver's distortion is often the culprit.
:::
:::

::: exercise Anti-aliasing design {level=3}
An ECG channel has $0.05$–$150\,\mathrm{Hz}$ bandwidth, a $12$-bit ADC and a requirement that aliases be at least $72\,\mathrm{dB}$ down. (a) With a second-order Butterworth AAF at $f_c = 150\,\mathrm{Hz}$, find the minimum sampling rate. (b) With a fourth-order filter? (c) An engineer proposes $f_s = 500\,\mathrm{Hz}$ with the second-order filter, arguing that the ECG has nothing above $150\,\mathrm{Hz}$. What is wrong, and what in particular will alias?
::: solution
(a) $(f_a/f_c)^4 = 10^{7.2}$ gives $f_a/f_c = 10^{1.8} = 63.1$, $f_a = 9.46\,\mathrm{kHz}$, $f_s \ge 9.6\,\mathrm{kHz}$. (b) $(f_a/f_c)^8 = 10^{7.2}$ gives $f_a/f_c = 10^{0.9} = 7.94$, $f_a = 1.19\,\mathrm{kHz}$, $f_s \ge 1.34\,\mathrm{kHz}$. (c) The *signal* may have nothing above $150\,\mathrm{Hz}$, but the input does: electromyographic (muscle) noise to a few hundred hertz, mains harmonics, and radio-frequency and switching interference. At $500\,\mathrm{Hz}$ the second-order filter attenuates $350\,\mathrm{Hz}$ (which folds to $150\,\mathrm{Hz}$) by only $10\log_{10}(1 + (350/150)^4) = 15\,\mathrm{dB}$. Mains harmonics alias too: at $f_s = 500\,\mathrm{Hz}$ the $50\,\mathrm{Hz}$ harmonics fold onto multiples of $50\,\mathrm{Hz}$, for example $450\,\mathrm{Hz} \to 50\,\mathrm{Hz}$ — onto the mains notch, which then hides them, but $f_s = 512\,\mathrm{Hz}$ would send them to non-harmonic frequencies inside the band.
:::
:::

::: exercise Quantisation noise of a sinusoid at half scale {level=3}
(a) Show that for a sine of amplitude $A$ (not full scale) the ideal SQNR is $6.02N + 1.76 + 20\log_{10}(2A/\mathrm{FSR})$ dB. (b) A $24$-bit converter has $\mathrm{FSR} = 5\,\mathrm{V}$ and an input-referred noise of $1.2\,\mathrm{\mu V}$ RMS. Find its effective resolution and its noise-free resolution, and the SNR for a $10\,\mathrm{mV}$-amplitude sine. (c) Why does a $24$-bit converter with this noise still have an advantage over an ideal $20$-bit converter?
::: solution
(a) The noise $q/\sqrt{12}$ is unchanged; the signal RMS is $A/\sqrt2$ instead of $(\mathrm{FSR}/2)/\sqrt2$, so the SNR falls by $20\log_{10}(\mathrm{FSR}/2A)$.

(b) Effective resolution $\log_2(5/1.2\times10^{-6}) = \log_2(4.17\times10^6) = 22.0$ bits; noise-free $\log_2(5/(6.6\times1.2\times10^{-6})) = 19.3$ bits. For $10\,\mathrm{mV}$ amplitude, $\mathrm{SNR} = 20\log_{10}(0.01/\sqrt2/1.2\times10^{-6}) = 75.4\,\mathrm{dB}$.

(c) An ideal $20$-bit converter has $q = 4.77\,\mathrm{\mu V}$ and quantisation noise $1.38\,\mathrm{\mu V}$ RMS, slightly more than the $24$-bit converter's total noise, and with no analog noise it would need dither to behave linearly on small signals; the $24$-bit converter's fine steps and inherent noise make it linear on small signals and let averaging extract resolution below its noise.
:::
:::

::: exercise Simultaneous sampling or correction {level=3}
A three-phase power monitor samples six channels (three voltages, three currents) with one multiplexed ADC at $f_s$, in the order $v_a, i_a, v_b, i_b, v_c, i_c$. (a) Find, in terms of $f_s$, the skew between each voltage and its current, and the resulting error in active power at power factor $\cos\phi$ for a fundamental of frequency $f_0$, to first order. (b) Evaluate for $f_s = 38.4\,\mathrm{kS/s}$, $f_0 = 50\,\mathrm{Hz}$ and $\cos\phi = 0.5$ lagging. (c) Propose two ways to remove the error.
::: hint
$\cos(\phi + \delta) \approx \cos\phi - \delta\sin\phi$.
:::
::: solution
(a) Each current is sampled one ADC period after its voltage: $\Delta t = 1/f_s$, a phase error $\delta = 2\pi f_0/f_s$. The measured power is $VI\cos(\phi + \delta) \approx VI(\cos\phi - \delta\sin\phi)$, a relative error $-\delta\tan\phi$ (sign depending on lead or lag and on which signal is delayed).

(b) $\delta = 2\pi\times50/38\,400 = 8.18\times10^{-3}\,\mathrm{rad} = 0.47^\circ$; $\tan60^\circ = 1.732$, so the error is $1.42\,\%$ of the active power. 

(c) Use simultaneous sampling (six sigma–delta converters, as in energy-metering ICs, or six sample-and-holds), or keep the multiplexer and correct the known delay digitally, either by a fractional-delay filter on the current samples or by a phase correction of the computed phasors, which is exact for each frequency. A simple linear interpolation between successive current samples is accurate only for frequencies well below $f_s$, so it serves the fundamental but not the higher harmonics.
:::
:::
