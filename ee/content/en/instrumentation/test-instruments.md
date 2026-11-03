Every electronics bench has the same few instruments: a digital multimeter, an oscilloscope with a handful of probes, a signal generator, a power supply, and, in RF and communications work, a spectrum analyser and a vector network analyser. They are so familiar that their limitations are easily forgotten. A multimeter set to AC volts may read a square wave $11\,\%$ high; an oscilloscope probe with a long ground lead turns a clean edge into a ringing one; a $100\,\mathrm{MHz}$ oscilloscope reports a $2\,\mathrm{ns}$ rise time as $4\,\mathrm{ns}$; a signal generator set to $1\,\mathrm{V}$ puts $2\,\mathrm{V}$ on an unterminated cable; a spectrum analyser hides a weak spur under its own noise floor until the resolution bandwidth is reduced. None of these is a fault of the instrument. Each is a consequence of how it works, and each is avoidable once that is understood.

This chapter opens up the main bench instruments. For each we look at the architecture, derive the one or two relations that govern its accuracy — the integrating converter's mains rejection, the rise-time–bandwidth relation, the probe compensation condition, the spectrum analyser's noise floor and sweep time, the frequency resolution of direct digital synthesis — and give worked examples of using it correctly. The acquisition principles are those of [[instrumentation/data-acquisition]]; the uncertainty of a reading, from its specification, is evaluated as in [[instrumentation/measurement-uncertainty]]; and the S-parameters measured by network analysers are defined in [[rf-microwave/scattering-parameters]].

## Digital multimeters {#sec-dmm}

A **digital multimeter** (DMM) is a precision DC voltmeter with signal conditioning in front of it. For DC voltage, a high-impedance attenuator ($10\,\mathrm{M\Omega}$ in most ranges, often $>10\,\mathrm{G\Omega}$ on the lowest ones) scales the input; for current, the current flows through a **shunt** and the voltage across it is measured; for resistance, a known current is passed through the unknown and the voltage measured; for AC, an RMS converter (analog, or digital sampling) precedes the DC measurement. The converter in bench meters is normally an **integrating** ADC, because of a property no other architecture offers for free.

::: theorem Dual-slope conversion {#thm-dual-slope}
In a dual-slope converter an integrator ($RC$) integrates the input $v_{in}$ for a fixed time $T_1$ (a fixed count of clock pulses), and then integrates a reference $-V_{\text{ref}}$ of opposite sign until its output returns to zero, taking time $t_2$. Then

$$
\bar v_{in} = V_{\text{ref}}\,\frac{t_2}{T_1}, \qquad \bar v_{in} = \frac{1}{T_1}\int_0^{T_1}v_{in}(t)\,\dd t,
$$ {#eq-dual-slope}

independent of $R$, $C$ and the clock frequency. A sinusoidal component of frequency $f$ in the input is attenuated in the result by the factor

$$
\left\lvert H(f)\right\rvert = \left\lvert\frac{\sin(\pi fT_1)}{\pi fT_1}\right\rvert,
$$ {#eq-nmr}

which is zero at every multiple of $1/T_1$.
:::

::: proof
After the first phase the integrator output is $-\frac{1}{RC}\int_0^{T_1}v_{in}\,\dd t = -\frac{T_1\bar v_{in}}{RC}$. In the second phase it changes at the constant rate $V_{\text{ref}}/RC$ and reaches zero after $t_2$, so $\frac{V_{\text{ref}}t_2}{RC} = \frac{T_1\bar v_{in}}{RC}$, and $RC$ cancels. Both $T_1$ and $t_2$ are counted with the same clock, so its frequency cancels too. The result is the average of $v_{in}$ over $T_1$, which is the output at $t = T_1$ of a filter with rectangular impulse response of width $T_1$ and unit area; its frequency response has magnitude $\lvert\sin(\pi fT_1)/(\pi fT_1)\rvert$ (the rectangular pulse of [[signals-systems/fourier-transform]]).
:::

The ratio of DC sensitivity to sensitivity at frequency $f$ is the **normal-mode rejection ratio**, $\mathrm{NMRR} = -20\log_{10}\lvert H(f)\rvert$. Choosing $T_1$ equal to one **power-line cycle** (1 PLC: $20\,\mathrm{ms}$ at $50\,\mathrm{Hz}$, $16.7\,\mathrm{ms}$ at $60\,\mathrm{Hz}$) puts a null on the mains frequency and all its harmonics. Precision DMMs let the user choose the integration time in PLCs, trading reading rate against noise and rejection; multi-slope variants of the dual-slope principle reach $8\tfrac12$ digits.

::: widget plot
f: 20*log10(abs(sin(pi*x*n*0.02)/(pi*x*n*0.02)) + 1e-9)
x: 1, 400
y: -80, 5
sliders: n=1:0.1:10:0.1
caption: Response of an integrating converter (dB) against input frequency in hertz, for an integration time of $n$ power-line cycles at $50\,\mathrm{Hz}$ (slider, $n \times 20\,\mathrm{ms}$). With $n = 1$, nulls fall exactly on $50, 100, 150\,\mathrm{Hz} \dots$: mains hum and its harmonics vanish. With $n = 0.1$ the first null moves to $500\,\mathrm{Hz}$ and $50\,\mathrm{Hz}$ passes almost unattenuated. With $n = 10$ the nulls are every $5\,\mathrm{Hz}$ and the envelope is $20\,\mathrm{dB}$ lower: slower but quieter readings.
:::

::: example Mains rejection when the frequency drifts {#ex-nmr}
A DMM integrates for exactly $20\,\mathrm{ms}$. A DC measurement is contaminated by $10\,\mathrm{mV}$ peak of mains pickup. Find the residual error if the mains frequency is $50.0$, $50.5$ and $60\,\mathrm{Hz}$.
::: solution
By [[#eq-nmr]] with $T_1 = 20\,\mathrm{ms}$: at $50.0\,\mathrm{Hz}$, $\pi fT_1 = \pi$ and $H = 0$: perfect rejection. At $50.5\,\mathrm{Hz}$, $\pi fT_1 = 1.01\pi$ and $\lvert H\rvert = \lvert\sin(1.01\pi)\rvert/(1.01\pi) = 0.0314/3.173 = 0.0099$, an NMRR of $40\,\mathrm{dB}$; the residual is up to $99\,\mathrm{\mu V}$, depending on the phase at which integration starts. At $60\,\mathrm{Hz}$, $\pi fT_1 = 1.2\pi$, $\lvert H\rvert = 0.588/3.770 = 0.156$: only $16\,\mathrm{dB}$, $1.6\,\mathrm{mV}$ of error. This is why meters let you select $50$ or $60\,\mathrm{Hz}$, and why the best ones measure the line frequency and lock the integration time to it.
:::
:::

### Loading, burden and four-wire ohms

The meter is part of the circuit. In voltage mode its input resistance $R_{in}$ forms a divider with the source's Thévenin resistance $R_s$: the reading is $v\,R_{in}/(R_{in} + R_s)$. A $10\,\mathrm{M\Omega}$ input on a $1\,\mathrm{M\Omega}$ source reads $9.1\,\%$ low. In current mode the shunt adds a **burden voltage** (the meter of [[instrumentation/measurement-uncertainty]] dropped $0.1\,\mathrm{V}$ at full scale) that reduces the current. In resistance mode, two-wire measurement includes the leads and contacts, typically $0.1$–$0.5\,\Omega$; for low resistances the **four-wire** (Kelvin) method of [[instrumentation/bridges-signal-conditioning]] is used, with separate force and sense leads, and **offset compensation** (measuring with the current on and off and subtracting) removes thermal EMFs.

### AC measurements: true RMS and form factor

The RMS value of a waveform is the DC voltage that would dissipate the same power in a resistor: $V_{\text{rms}} = \sqrt{\frac1T\int_0^Tv^2\,\dd t}$. Inexpensive meters do not compute it; they rectify, average, and multiply by the **form factor** of a sine wave,

$$
\frac{V_{\text{rms}}}{\overline{\lvert v\rvert}} = \frac{V_p/\sqrt2}{2V_p/\pi} = \frac{\pi}{2\sqrt2} = 1.1107,
$$ {#eq-form-factor}

so they read correctly only for sinusoids. A **true-RMS** meter computes the RMS (by an analog RMS-to-DC converter or by sampling and computing $\sqrt{\overline{v^2}}$). Its specification adds a **crest factor** limit (peak divided by RMS, e.g. $3$ at full scale), because a pulse train with a high crest factor overloads the input before its RMS value reaches full scale, and a bandwidth limit.

::: example An average-responding meter on non-sinusoidal waveforms {#ex-rms}
An average-responding, sine-calibrated meter measures (a) a symmetric square wave of amplitude $\pm1\,\mathrm{V}$, (b) a symmetric triangle wave of amplitude $\pm1\,\mathrm{V}$, and (c) a pulse train of $5\,\mathrm{V}$ height and $10\,\%$ duty cycle on AC coupling. Find the reading and the true RMS value in each case.
::: solution
(a) $\overline{\lvert v\rvert} = 1\,\mathrm{V}$, reading $1.111\,\mathrm{V}$; true RMS $1\,\mathrm{V}$: $11.1\,\%$ high.

(b) $\overline{\lvert v\rvert} = 0.5\,\mathrm{V}$, reading $0.555\,\mathrm{V}$; true RMS $1/\sqrt3 = 0.577\,\mathrm{V}$: $3.8\,\%$ low.

(c) AC coupling removes the mean of $0.5\,\mathrm{V}$, leaving $+4.5\,\mathrm{V}$ for $10\,\%$ of the time and $-0.5\,\mathrm{V}$ for $90\,\%$. Then $\overline{\lvert v\rvert} = 0.1\times4.5 + 0.9\times0.5 = 0.9\,\mathrm{V}$ and the reading is $1.00\,\mathrm{V}$. The true RMS of the AC part is $\sqrt{0.1\times4.5^2 + 0.9\times0.5^2} = \sqrt{2.025 + 0.225} = 1.50\,\mathrm{V}$: the meter reads $33\,\%$ low. The crest factor is $4.5/1.5 = 3$, at the limit of many true-RMS meters.
:::
:::

## Oscilloscopes {#sec-scope}

A digital oscilloscope is a fast data-acquisition system with a display: a switchable attenuator and amplifier per channel (the **front end**), a fast ADC (usually $8$ bits, $10$–$12$ in "high-resolution" models), acquisition memory, a **trigger** system that decides which part of the signal to capture, and processing that displays, measures and decodes. The specifications that matter are **bandwidth** (the $-3\,\mathrm{dB}$ frequency of the front end), **sample rate**, **record length** (memory depth), vertical resolution and noise, and the trigger's capabilities.

### Bandwidth and rise time

A step applied to an amplifier with limited bandwidth emerges with a finite **rise time** $t_r$, conventionally measured from $10\,\%$ to $90\,\%$ of the step.

::: theorem Rise time of a first-order system {#thm-risetime}
A first-order low-pass system with $-3\,\mathrm{dB}$ bandwidth $B$ has a $10$–$90\,\%$ rise time

$$
t_r = \frac{\ln9}{2\pi B} = \frac{0.35}{B}.
$$ {#eq-risetime}

For a cascade of $k$ systems whose step responses are each close to Gaussian, the rise times add approximately in quadrature, $t_{r,\text{total}} \approx \sqrt{t_{r1}^2 + \dots + t_{rk}^2}$.
:::

::: proof
The step response is $1 - e^{-t/\tau}$ with $\tau = 1/(2\pi B)$. It reaches $10\,\%$ at $t_{10} = \tau\ln(1/0.9)$ and $90\,\%$ at $t_{90} = \tau\ln(1/0.1)$, so $t_r = \tau(\ln10 - \ln(10/9)) = \tau\ln9 = 2.197\tau$, and $2.197/(2\pi) = 0.350$. For the cascade, the impulse response of the chain is the convolution of the individual impulse responses; for positive, bell-shaped impulse responses the rise time is proportional to the standard deviation of the impulse response (taken as a probability density), and the variances of convolved densities add ([[random-signals/probability-for-engineers]]). For exactly Gaussian responses the rule is exact; for others it is a good approximation.
:::

Oscilloscope front ends are designed for a nearly Gaussian (or "maximally flat") response with little overshoot, for which $t_r B$ is between $0.35$ and about $0.45$; the data sheet states the rise time. The rule of thumb that follows is that a scope should have three to five times the bandwidth implied by the fastest edge to be measured.

::: example Measuring a fast edge {#ex-rise}
A $100\,\mathrm{MHz}$ oscilloscope ($t_r = 3.5\,\mathrm{ns}$) with a $500\,\mathrm{MHz}$ probe ($t_r = 0.7\,\mathrm{ns}$) displays an edge with a rise time of $4.1\,\mathrm{ns}$. What is the true rise time? What bandwidth would be needed to measure a $2\,\mathrm{ns}$ edge with less than $5\,\%$ error?
::: solution
By the quadrature rule, $t_{r,\text{true}} = \sqrt{4.1^2 - 3.5^2 - 0.7^2} = \sqrt{16.81 - 12.25 - 0.49} = \sqrt{4.07} = 2.0\,\mathrm{ns}$. The correction is large and its uncertainty larger: a $10\,\%$ uncertainty in the scope's own rise time makes the result uncertain by about $20\,\%$. For a $5\,\%$ error, $\sqrt{2^2 + t_{rs}^2} \le 2.1$ requires $t_{rs} \le 0.64\,\mathrm{ns}$ for scope plus probe, i.e. a bandwidth of at least $0.35/0.64\,\mathrm{ns} \approx 550\,\mathrm{MHz}$ — about five times the $175\,\mathrm{MHz}$ "bandwidth" of the edge itself.
:::
:::

Sample rate and record length are related to bandwidth through [[signals-systems/sampling]]: to represent a $B$-hertz bandwidth without aliasing, the scope samples at $2.5$ to $5$ times $B$ (its front end is not a brick-wall filter) and reconstructs with sinc interpolation. Record length determines how long the scope can keep sampling at full rate: a $10\,\mathrm{Mpoint}$ memory at $5\,\mathrm{GS/s}$ holds $2\,\mathrm{ms}$; at longer time bases the scope must reduce its sample rate and its effective bandwidth, unless it uses peak-detect acquisition.

::: warning Aliasing on a digital oscilloscope
At slow time bases, a scope with fixed memory lowers its sample rate, and a fast signal can alias into a stable-looking, completely false waveform at a much lower frequency — the wagon-wheel effect on the screen. If a waveform looks suspicious, change the time base: a real signal keeps its frequency, an alias changes. Peak-detect mode, which keeps the minimum and maximum of every sampling interval, reveals narrow glitches and aliased bursts.
:::

### Probes

The standard probe is the **$10\times$ passive probe**: a $9\,\mathrm{M\Omega}$ resistor $R_1$ in the tip, which with the scope's $1\,\mathrm{M\Omega}$ input $R_2$ forms a $10:1$ divider and presents $10\,\mathrm{M\Omega}$ to the circuit. The scope input and cable have capacitance $C_2$ (tens of picofarads); a capacitor $C_1$ across $R_1$, adjusted by the user, compensates it.

::: proposition Probe compensation {#prop-probe}
The divider formed by $R_1\parallel C_1$ (tip) and $R_2\parallel C_2$ (scope) has a frequency-independent ratio, equal to $R_2/(R_1 + R_2)$ at all frequencies, if and only if

$$
R_1C_1 = R_2C_2 .
$$ {#eq-probe}

Otherwise its step response starts at $C_1/(C_1 + C_2)$ and settles exponentially to $R_2/(R_1 + R_2)$ with time constant $(R_1\parallel R_2)(C_1 + C_2)$.
:::

::: proof
With $Z_i = R_i/(1 + j\omega R_iC_i)$, the ratio is $Z_2/(Z_1 + Z_2)$. If $R_1C_1 = R_2C_2 = \tau$, both impedances share the factor $1/(1 + j\omega\tau)$, which cancels, leaving $R_2/(R_1 + R_2)$. In general, at high frequency the capacitors dominate and the ratio tends to $C_1/(C_1 + C_2)$ (a capacitive divider), at DC to $R_2/(R_1 + R_2)$. The transfer function has one pole, at $s = -1/[(R_1\parallel R_2)(C_1 + C_2)]$, found by setting the sum of the two admittances $1/R_1 + sC_1 + 1/R_2 + sC_2$ to zero, so the step response moves exponentially from the high-frequency value to the DC value with that time constant.
:::

::: widget plot
f: 1 + (10*k/(9 + k) - 1)*exp(-x); 1 + 0*x
x: 0, 5
y: 0, 1.6
sliders: k=1:0.5:1.5:0.01
labels: \text{probe step response}; \text{ideal}
caption: Step response of a $10\times$ probe, normalised to its DC ratio, against time in units of $(R_1\parallel R_2)(C_1 + C_2)$, for compensation ratio $k = R_1C_1/(R_2C_2)$ (slider). At $k = 1$ the step is perfect. Over-compensated ($k > 1$), the edge overshoots and droops back; under-compensated ($k < 1$), it rises with a rounded corner. This is exactly what you see on the scope's $1\,\mathrm{kHz}$ calibration square wave while turning the probe's trimmer.
:::

Even a compensated probe loads the circuit: $10\,\mathrm{M\Omega}$ in parallel with about $10\,\mathrm{pF}$. At $100\,\mathrm{MHz}$, $10\,\mathrm{pF}$ is $159\,\Omega$ of reactance — a heavy load on a $50\,\Omega$ or higher-impedance node. The **ground lead** is the other enemy: a $15\,\mathrm{cm}$ lead has an inductance of roughly $150\,\mathrm{nH}$, which resonates with the probe's $10\,\mathrm{pF}$ at $1/(2\pi\sqrt{LC}) = 130\,\mathrm{MHz}$ and makes every fast edge ring. For fast signals use the short ground spring that comes with the probe, an **active probe** (a FET buffer in the tip, under $1\,\mathrm{pF}$), a **low-impedance** ($500\,\Omega$ to $50\,\Omega$) resistive divider probe, or a **differential probe**, which also removes the problem of referencing the measurement to the scope's grounded chassis. Current is measured with **current probes**: a split ferrite core with a Hall sensor for DC and a transformer winding for AC.

::: quiz
You measure a $50\,\mathrm{MHz}$ clock with a $500\,\mathrm{MHz}$ scope and a $10\times$ probe with its $15\,\mathrm{cm}$ ground clip. The edges show strong ringing at about $130\,\mathrm{MHz}$. Replacing the clip with the probe's ground spring removes it. What was it?
- [ ] Reflections on the clock trace
- [ ] Aliasing in the scope
- [x] Resonance of the ground-lead inductance with the probe's input capacitance
- [ ] Probe under-compensation
::: solution
The ground lead (about $150\,\mathrm{nH}$) and the probe tip capacitance (about $10\,\mathrm{pF}$) form a series resonant circuit at $\approx130\,\mathrm{MHz}$, excited by every edge. Shortening the ground return reduces $L$ by a factor of ten or more and moves the resonance far above the scope's bandwidth. Compensation errors affect the response over microseconds to milliseconds, not nanoseconds.
:::
:::

## Spectrum analysers {#sec-sa}

The oscilloscope shows a signal in time; the **spectrum analyser** shows its power as a function of frequency, with a dynamic range of $100\,\mathrm{dB}$ or more that no time-domain display can match. The classic architecture is the **swept-tuned superheterodyne**: the input is mixed with a local oscillator swept in frequency, so that each input frequency in turn is translated to a fixed intermediate frequency (IF), where a narrow filter of **resolution bandwidth** (RBW) selects it; a detector and a **video filter** (VBW) smooth the result, which is plotted against the oscillator frequency. Modern instruments digitise the IF and implement the RBW filter, detectors and averaging digitally, and many add an FFT mode for narrow spans and **real-time** analysis that computes overlapping FFTs fast enough to catch transient signals.

::: proposition Noise floor and sweep time {#prop-sa}
(a) The **displayed average noise level** of a spectrum analyser with noise figure $\mathrm{NF}$ (dB) and resolution bandwidth $\mathrm{RBW}$ (Hz), referred to its $50\,\Omega$ input at $290\,\mathrm{K}$, is approximately

$$
\mathrm{DANL} \approx -174\,\mathrm{dBm/Hz} + \mathrm{NF} + 10\log_{10}\mathrm{RBW}\ \ \mathrm{dBm}.
$$ {#eq-danl}

(b) A swept analyser must dwell on each frequency long enough for the RBW filter to respond; the minimum sweep time is approximately

$$
t_{\text{sweep}} \approx k\,\frac{\mathrm{span}}{\mathrm{RBW}^2},
$$ {#eq-sweep}

with $k$ between about $2$ and $3$ for analog Gaussian filters.
:::

::: proof
(a) The available thermal noise power of a matched source in bandwidth $B$ is $kTB$; at $T = 290\,\mathrm{K}$, $kT = 4.00\times10^{-21}\,\mathrm{W/Hz}$, i.e. $-174.0\,\mathrm{dBm/Hz}$. The analyser adds its own noise, characterised by the noise figure (the factor by which it degrades the SNR of a $290\,\mathrm{K}$ source, [[electronics-2/electronic-noise]]), and the RBW filter sets $B$. In decibels the three factors add. (Detector and averaging corrections of about $2.5\,\mathrm{dB}$, and the difference between the filter's $3\,\mathrm{dB}$ and noise bandwidths, are neglected.)

(b) A filter of bandwidth $\mathrm{RBW}$ needs a time of order $1/\mathrm{RBW}$ to respond. While sweeping at rate $\mathrm{span}/t_{\text{sweep}}$, a signal stays within the filter's passband for $\mathrm{RBW}\cdot t_{\text{sweep}}/\mathrm{span}$. Requiring this to be at least $k/\mathrm{RBW}$ gives [[#eq-sweep]].
:::

The two results define the analyser's basic trade-off. Each factor of ten reduction in RBW lowers the noise floor by $10\,\mathrm{dB}$ — revealing weak signals — and lengthens the sweep a hundredfold. Digital RBW filters and FFT analysis shorten the sweep considerably at narrow RBW, but the noise-floor rule is fundamental.

::: example Finding a weak spur {#ex-sa}
An analyser with a noise figure of $20\,\mathrm{dB}$ is used with a span of $1\,\mathrm{GHz}$. Find the DANL and sweep time ($k = 2$) for RBW of $100\,\mathrm{kHz}$ and $10\,\mathrm{kHz}$. A spur at $-115\,\mathrm{dBm}$ is suspected; which setting shows it? Express $-115\,\mathrm{dBm}$ in $\mathrm{dB\mu V}$ in $50\,\Omega$.
::: solution
By [[#eq-danl]]: at $100\,\mathrm{kHz}$, $-174 + 20 + 50 = -104\,\mathrm{dBm}$; at $10\,\mathrm{kHz}$, $-114\,\mathrm{dBm}$. By [[#eq-sweep]]: $2\times10^9/10^{10} = 0.2\,\mathrm{s}$ and $2\times10^9/10^8 = 20\,\mathrm{s}$. At $100\,\mathrm{kHz}$ the spur is $11\,\mathrm{dB}$ below the floor and invisible; at $10\,\mathrm{kHz}$ it is about $1\,\mathrm{dB}$ above the average floor — barely detectable. A $1\,\mathrm{kHz}$ RBW ($-124\,\mathrm{dBm}$ floor) over a narrow span around the suspected frequency is the practical approach. In $50\,\Omega$, $0\,\mathrm{dBm} = 1\,\mathrm{mW} = 0.2236\,\mathrm{V}$ RMS $= 107.0\,\mathrm{dB\mu V}$, so $-115\,\mathrm{dBm} = -8\,\mathrm{dB\mu V}$, i.e. $0.40\,\mathrm{\mu V}$.
:::
:::

::: warning dBm, dBV and dBμV
Spectrum analysers display power in dBm (decibels relative to $1\,\mathrm{mW}$) referred to their input impedance, usually $50\,\Omega$; EMC receivers display voltage in $\mathrm{dB\mu V}$; audio analysers use dBV or dBu ($0\,\mathrm{dBu} = 0.775\,\mathrm{V}$ RMS, the voltage of $1\,\mathrm{mW}$ in $600\,\Omega$). Converting between power and voltage units requires the impedance: in $50\,\Omega$, $\mathrm{dB\mu V} = \mathrm{dBm} + 107$. Connecting a high-impedance circuit directly to a $50\,\Omega$ analyser input loads it heavily, and the displayed power is not the power in the original circuit.
:::

::: quiz
On a spectrum analyser, you reduce the RBW from $10\,\mathrm{kHz}$ to $1\,\mathrm{kHz}$ while looking at a pure CW tone and the noise floor. What happens on the display?
- [ ] Both the tone and the noise floor drop by $10\,\mathrm{dB}$
- [x] The noise floor drops by $10\,\mathrm{dB}$; the tone's level stays the same; the sweep becomes about $100$ times slower
- [ ] The tone rises by $10\,\mathrm{dB}$
- [ ] Nothing changes except the sweep time
::: solution
A CW tone has all its power at one frequency, which falls entirely inside the RBW filter whatever its width, so its displayed level is unchanged. Noise power is proportional to the bandwidth, so the floor falls by $10\log_{10}10 = 10\,\mathrm{dB}$. By [[#eq-sweep]], the sweep time grows as $1/\mathrm{RBW}^2$. This is how a weak tone is pulled out of the noise — and how to tell a tone from noise: tones do not move when the RBW changes.
:::
:::

## Signal generators {#sec-generators}

Function and arbitrary waveform generators, and RF signal generators, are the stimulus side of the bench. Almost all modern low- and medium-frequency generators use **direct digital synthesis** (DDS): a phase accumulator, a look-up table of waveform samples and a DAC followed by a reconstruction filter.

::: proposition Direct digital synthesis {#prop-dds}
An $N$-bit phase accumulator clocked at $f_{clk}$, incremented by the tuning word $M$ on every clock, overflows $M f_{clk}/2^N$ times per second. The output frequency and the frequency resolution are

$$
f_{out} = \frac{M\,f_{clk}}{2^N}, \qquad \Delta f = \frac{f_{clk}}{2^N}.
$$ {#eq-dds}

The output must satisfy $f_{out} < f_{clk}/2$ (in practice $\lesssim 0.4f_{clk}$) so that the reconstruction filter can remove the images.
:::

::: proof
The accumulator holds the phase as a fraction of a cycle, $\theta = \text{acc}/2^N$. It increases by $M/2^N$ of a cycle per clock period, i.e. by $Mf_{clk}/2^N$ cycles per second. The smallest non-zero step, $M = 1$, gives $\Delta f$. The DAC output is a sampled sinusoid at rate $f_{clk}$, so by the sampling theorem it represents $f_{out}$ unambiguously only below $f_{clk}/2$.
:::

A $32$-bit accumulator at $100\,\mathrm{MHz}$ gives a resolution of $0.023\,\mathrm{Hz}$; a $10\,\mathrm{MHz}$ output needs $M = 429\,496\,730$ (rounded), giving $10.000\,000\,01\,\mathrm{MHz}$. Frequency changes are phase-continuous and instantaneous. The price is spurious tones from phase truncation and DAC non-linearity, specified as SFDR, and the sinc droop of the DAC's zero-order hold. RF generators instead use phase-locked loops with fractional-$N$ dividers, specified by their **phase noise** in dBc/Hz at given offsets.

::: warning The 50 Ω output and the "doubled" voltage
Most generators have a $50\,\Omega$ source impedance, and their displayed amplitude assumes a $50\,\Omega$ load. Into a high-impedance load (an oscilloscope input at $1\,\mathrm{M\Omega}$, a CMOS gate) the voltage is twice the displayed value, because no current flows in the source resistance. Either terminate the cable in $50\,\Omega$ or set the generator's "load" setting to high impedance. The same $50\,\Omega$ source also prevents reflections on a $50\,\Omega$ cable ([[rf-microwave/lines-smith-chart]]).
:::

## Network analysers and impedance measurement {#sec-vna}

A **vector network analyser** (VNA) measures the complex response of a network — amplitude *and* phase — against frequency, as **scattering parameters**: $S_{11}$ is the reflection coefficient at port 1, $S_{21}$ the transmission from port 1 to port 2, and so on ([[rf-microwave/scattering-parameters]]). It contains a swept source, directional couplers or bridges that separate incident and reflected waves at each port, and coherent receivers (like a multichannel lock-in, [[instrumentation/bridges-signal-conditioning]]) that measure ratios of waves.

Its accuracy comes not from perfect hardware but from **calibration**: the systematic errors of the couplers, cables and receivers (directivity, source and load match, tracking, isolation) are described by an error model — twelve terms for a two-port VNA in the classic model — and measured by connecting known **standards** to the ends of the test cables: short, open, load and through (SOLT), or variants such as TRL. The analyser then solves for the error terms and corrects every subsequent measurement. A VNA without a fresh calibration at the reference plane of the device under test is a much less accurate instrument.

At lower frequencies, **LCR meters** and impedance analysers measure $Z = V/I$ directly with an auto-balancing bridge: a transimpedance amplifier holds the low terminal of the device at virtual ground and measures its current, and a lock-in separates the in-phase and quadrature components to give resistance and reactance, from which $L$, $C$, $Q$ and dissipation factor are computed. They use four-terminal-pair (Kelvin) connections for the same reasons as four-wire ohms, and open/short compensation for the fixtures.

::: application Frequency and time
The most accurate measurements of all are of frequency. A **frequency counter** counts input cycles during a gate time defined by its time base; a **reciprocal counter** instead measures the period with a fast clock and interpolators, giving the same relative resolution at any input frequency, typically $10$–$12$ digits per second of gate time. The accuracy is that of the time base: a crystal oscillator ($10^{-6}$), an oven-controlled crystal ($10^{-8}$ to $10^{-9}$ per day of ageing), a rubidium standard ($10^{-11}$), or a GNSS-disciplined oscillator traceable to the caesium definition of the second. As of 2026, optical lattice clocks in metrology laboratories reach systematic uncertainties around $10^{-18}$, and a redefinition of the second in terms of an optical transition is under discussion for around 2030.
:::

## Where this leads

The instruments of this chapter are data-acquisition systems ([[instrumentation/data-acquisition]]) wrapped round particular measurement problems, and their specifications are the Type B entries of every bench uncertainty budget ([[instrumentation/measurement-uncertainty]]). The spectrum analyser and its EMI-receiver variant are the main tools of [[instrumentation/electromagnetic-compatibility]]; the VNA, Smith chart and S-parameters belong to [[rf-microwave]]; and the windows, averaging and resolution of FFT analysers are explained in [[dsp/spectral-analysis]].

::: history
Karl Ferdinand Braun built the cathode-ray tube in 1897, and with it the first oscillograph. Tektronix, founded by Howard Vollum and Jack Murdock in 1946, introduced the Model 511 in 1947, whose triggered sweep — starting the trace at a defined point of the waveform — made the oscilloscope a measuring instrument rather than a display. Digital storage oscilloscopes appeared in the 1970s and had displaced analog ones by the end of the 1990s. The first digital voltmeter is credited to Andrew Kay's Non-Linear Systems in 1954; integrating dual-slope converters made the hand-held DMM possible from the 1970s. Hewlett-Packard's 8551/851 (1964) was one of the first commercial calibrated spectrum analysers, and its 8510 (1984) set the pattern of the modern error-corrected vector network analyser. Direct digital synthesis was described by Joseph Tierney, Charles Rader and Bernard Gold in 1971.
:::

::: summary
- Dual-slope (integrating) DMMs measure the average of the input over $T_1$, independent of $R$, $C$ and clock; their response $\lvert\sin(\pi fT_1)/(\pi fT_1)\rvert$ nulls mains and harmonics when $T_1$ is a whole number of power-line cycles.
- Meter loading ($R_{in}$ against $R_s$), burden voltage and lead resistance are often the largest errors; use four-wire ohms for low resistance.
- Average-responding meters multiply by the sine form factor $1.1107$ and are wrong for other waveforms; true-RMS meters have crest-factor and bandwidth limits.
- Rise time and bandwidth are related by $t_r \approx 0.35/B$; rise times of cascaded systems add in quadrature; use three to five times the signal's bandwidth.
- A $10\times$ probe is compensated when $R_1C_1 = R_2C_2$; its capacitance and ground-lead inductance limit high-frequency measurements.
- Spectrum analyser noise floor $\approx -174 + \mathrm{NF} + 10\log_{10}\mathrm{RBW}$ dBm; sweep time $\approx k\cdot\mathrm{span}/\mathrm{RBW}^2$.
- DDS gives $f_{out} = Mf_{clk}/2^N$ with resolution $f_{clk}/2^N$; generator amplitudes assume a $50\,\Omega$ load; VNAs rely on calibration with known standards.
:::

## Exercises

::: exercise Loading a source {level=1 check="10*10e6/(10e6+100e3)"}
A $10\,\mathrm{V}$ source with $100\,\mathrm{k\Omega}$ internal resistance is measured with a $10\,\mathrm{M\Omega}$ voltmeter. What does it read, in volts?
::: solution
$10\times10/(10 + 0.1) = 9.901\,\mathrm{V}$: $1\,\%$ low.
:::
:::

::: exercise Rise time {level=1 check="0.35/200e6"}
Estimate the rise time, in seconds, of an oscilloscope with a bandwidth of $200\,\mathrm{MHz}$.
::: solution
$t_r \approx 0.35/200\times10^6 = 1.75\,\mathrm{ns}$.
:::
:::

::: exercise DDS tuning {level=1 check="2^28*1e6/50e6"}
A $28$-bit DDS is clocked at $50\,\mathrm{MHz}$. What tuning word $M$ gives $1\,\mathrm{MHz}$ (exactly, if possible)?
::: solution
$M = 2^{28}\times10^6/(50\times10^6) = 268\,435\,456/50 = 5\,368\,709.12$; the nearest integer, $5\,368\,709$, gives $0.999\,999\,98\,\mathrm{MHz}$. The resolution is $50\,\mathrm{MHz}/2^{28} = 0.186\,\mathrm{Hz}$.
:::
:::

::: exercise Probe compensation {level=2 check="1e6*20e-12/9e6"}
A $10\times$ probe has $R_1 = 9\,\mathrm{M\Omega}$ and is used on a scope with $R_2 = 1\,\mathrm{M\Omega}$ and $C_2 = 20\,\mathrm{pF}$ (including cable). What value of $C_1$, in farads, compensates it? What capacitance does the probe present to the circuit?
::: solution
$C_1 = R_2C_2/R_1 = 10^6\times20\times10^{-12}/9\times10^6 = 2.22\,\mathrm{pF}$. The circuit sees $C_1$ in series with $C_2$: $2.22\times20/22.22 = 2.0\,\mathrm{pF}$, plus the tip's own stray capacitance (in practice about $10\,\mathrm{pF}$ total, because the cable capacitance is larger than in this idealised example).
:::
:::

::: exercise Mains rejection at fractional PLC {level=2 check="-20*log10(abs(sin(pi*50*0.01)/(pi*50*0.01)))"}
An integrating DMM is set to $0.5\,\mathrm{PLC}$ at $50\,\mathrm{Hz}$ ($T_1 = 10\,\mathrm{ms}$). Find its normal-mode rejection, in dB, of $50\,\mathrm{Hz}$ interference.
::: solution
$\pi fT_1 = \pi/2$: $\lvert H\rvert = 1/(\pi/2) = 0.637$, an NMRR of only $3.9\,\mathrm{dB}$. Half-cycle integration does not null the fundamental (it nulls $100\,\mathrm{Hz}$); it is useful for speed, not hum rejection.
:::
:::

::: exercise Noise floor {level=2 check="-174+10+10*log10(300)"}
A spectrum analyser with a noise figure of $10\,\mathrm{dB}$ (with preamplifier) is set to an RBW of $300\,\mathrm{Hz}$. Estimate its DANL in dBm.
::: solution
$-174 + 10 + 10\log_{10}300 = -174 + 10 + 24.8 = -139.2\,\mathrm{dBm}$.
:::
:::

::: exercise True RMS of a sine with DC {level=2}
A signal $v(t) = 2 + 3\sin(\omega t)\,\mathrm{V}$ is measured with (a) a true-RMS meter on DC+AC coupling, (b) a true-RMS meter on AC coupling, (c) an average-responding meter on AC coupling. Find the three readings.
::: solution
(a) $\sqrt{2^2 + 3^2/2} = \sqrt{8.5} = 2.915\,\mathrm{V}$. (b) The AC part only: $3/\sqrt2 = 2.121\,\mathrm{V}$. (c) The AC part is a sine, so the average-responding meter is correct: $2.121\,\mathrm{V}$. The total RMS is the root sum of squares of the DC and AC RMS values, because the cross term averages to zero.
:::
:::

::: exercise A measurement chain's rise time {level=3}
A pulse generator ($t_r = 1.0\,\mathrm{ns}$) drives a device under test through $2\,\mathrm{m}$ of coaxial cable ($t_r = 0.3\,\mathrm{ns}$); the output is observed through an active probe ($t_r = 0.4\,\mathrm{ns}$) on a $1\,\mathrm{GHz}$ scope (Gaussian response, $t_r B = 0.40$). The displayed rise time is $1.65\,\mathrm{ns}$. (a) What is the device's own rise time? (b) If each of the four instrument rise times is uncertain by $\pm10\,\%$ (standard uncertainty $5\,\%$), estimate the standard uncertainty of the result using the law of propagation of uncertainty.
::: hint
Write $t_d = \sqrt{t_m^2 - \sum t_i^2}$ and differentiate with respect to each $t_i$.
:::
::: solution
(a) Scope $t_r = 0.40/10^9 = 0.40\,\mathrm{ns}$. $t_d = \sqrt{1.65^2 - 1.0^2 - 0.3^2 - 0.4^2 - 0.4^2} = \sqrt{2.7225 - 1.41} = \sqrt{1.3125} = 1.146\,\mathrm{ns}$.

(b) $\partial t_d/\partial t_i = -t_i/t_d$. The contributions are $(t_i/t_d)\times0.05t_i = 0.05t_i^2/t_d$: $0.0436$ (generator), $0.0039$ (cable), $0.0070$ (probe), $0.0070$ (scope) ns. Root sum of squares: $u(t_d) = 0.045\,\mathrm{ns}$, about $4\,\%$, dominated by the generator. The measured value itself also has an uncertainty (say $u(t_m) = 0.02\,\mathrm{ns}$, contributing $(t_m/t_d)\times0.02 = 0.029\,\mathrm{ns}$); total about $0.054\,\mathrm{ns}$. The lesson: deconvolving rise times is reliable only when the instrument contributions are clearly smaller than the device's.
:::
:::

::: exercise Designing a measurement of a small resistance {level=3}
You must measure a $10\,\mathrm{m\Omega}$ current shunt to $0.1\,\%$ with a DMM having a $100\,\mathrm{mV}$ range ($\pm(0.005\,\%\text{ of reading} + 0.0035\,\%\text{ of range})$) and a calibrated $1\,\mathrm{A}$ current source ($u = 0.01\,\%$). The connecting leads are $50\,\mathrm{m\Omega}$ each, and thermal EMFs in the circuit may reach $5\,\mathrm{\mu V}$. Design the measurement and estimate its uncertainty.
::: solution
*Method*: four-wire connection (current through force leads, voltage sensed at the shunt's sense terminals), so the $50\,\mathrm{m\Omega}$ leads do not matter. *Signal*: $1\,\mathrm{A}\times10\,\mathrm{m\Omega} = 10\,\mathrm{mV}$. *Thermal EMF*: $5\,\mathrm{\mu V}$ is $0.05\,\%$ of $10\,\mathrm{mV}$, so reverse the current and take $(V_+ - V_-)/2$, which cancels it (offset-compensated ohms). *Meter*: $a = 0.000\,05\times10\,\mathrm{mV} + 0.000\,035\times100\,\mathrm{mV} = 0.5 + 3.5 = 4.0\,\mathrm{\mu V}$, rectangular: $u = 2.3\,\mathrm{\mu V}$, i.e. $0.023\,\%$. (The range term dominates; the averaging of two readings does not reduce it, as it is systematic.) *Current*: $0.01\,\%$. *Combined*: $\sqrt{0.023^2 + 0.01^2} = 0.025\,\%$, $U = 0.05\,\%$ ($k = 2$), meeting the $0.1\,\%$ requirement with a test uncertainty ratio of $2$. Self-heating ($10\,\mathrm{mW}$) and the shunt's temperature coefficient must also be considered: at $50\,\mathrm{ppm/K}$, a $2\,\mathrm{K}$ rise is another $0.01\,\%$.
:::
:::

::: exercise Counting and resolution {level=3}
(a) A conventional counter with a $10\,\mathrm{MHz}$ time base counts a $1\,\mathrm{kHz}$ input for a $1\,\mathrm{s}$ gate. What is its resolution, and why is it poor? (b) A reciprocal counter measures the period of the same input over $1\,\mathrm{s}$ with a $10\,\mathrm{MHz}$ clock and $100\,\mathrm{ps}$ interpolators. What is its resolution? (c) Its time base is an oven-controlled crystal last calibrated one month ago, with an ageing rate of $5\times10^{-10}$ per day. What is the accuracy of a $10\,\mathrm{MHz}$ measurement?
::: solution
(a) The count is $1000\pm1$: a resolution of $1\,\mathrm{Hz}$, $10^{-3}$, because the $\pm1$ count ambiguity is relative to the small number of input cycles. (b) It measures $1000$ periods in about $1\,\mathrm{s}$ with a timing resolution of about $100\,\mathrm{ps}$: relative resolution $10^{-10}$, independent of the input frequency, i.e. $10^{-7}\,\mathrm{Hz}$ at $1\,\mathrm{kHz}$. (c) Thirty days at $5\times10^{-10}$ per day gives a drift up to $1.5\times10^{-8}$, i.e. $\pm0.15\,\mathrm{Hz}$ at $10\,\mathrm{MHz}$, far larger than the resolution. Resolution is not accuracy; a GNSS-disciplined time base would reduce the error to about $10^{-12}$.
:::
:::
