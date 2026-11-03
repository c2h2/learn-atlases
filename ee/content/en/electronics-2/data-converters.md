The physical world is analog; computation is digital. Between them stand two circuits: the **analog-to-digital converter** (ADC), which measures a voltage and reports it as a number, and the **digital-to-analog converter** (DAC), which turns a number back into a voltage or current. A smartphone contains dozens — for audio, touch, radio, battery monitoring, the camera — and the converter often decides the performance of the whole system: the dynamic range of a radio, the resolution of a medical scanner, the noise floor of a studio recording.

Conversion has two steps, **sampling** in time and **quantisation** in amplitude, each with its own errors. The sampling theorem of [[signals-systems/sampling]] tells us how fast to sample; this chapter is about the circuits. We begin with the sample-and-hold, then quantify quantisation noise and derive the famous $6.02N + 1.76\,\mathrm{dB}$, define the static and dynamic specifications by which converters are judged, and study the main architectures: resistor and current-steering DACs; flash, successive-approximation, integrating and pipelined ADCs; and the **sigma–delta** converter, which trades speed for resolution by oversampling and **noise shaping**. Binary codes are those of [[digital-logic/number-systems]], and the comparators and op-amps are those of [[electronics-2/operational-amplifier-design]].

## Sampling: the track-and-hold

An ADC needs time to make its decision — a successive-approximation converter takes $N$ clock cycles — and during that time the input must not change by more than a fraction of a least significant bit. A **track-and-hold** (T/H, often called sample-and-hold) circuit freezes the input. In its simplest form it is a switch (a MOSFET or a CMOS transmission gate) and a hold capacitor $C_H$, followed by a buffer: in **track** mode the switch is on and $v_C$ follows $v_{in}$; at the sampling instant the switch opens and $C_H$ holds the voltage for the converter.

Its main imperfections are:

- **Acquisition time**: in track mode the capacitor charges through the switch resistance $R_{on}$ with time constant $\tau = R_{on}C_H$. To settle within $\tfrac12$ LSB of an $N$-bit full-scale step takes $\tau\ln(2^{N+1})$.
- **Droop**: in hold mode, leakage current $I_L$ discharges the capacitor at $I_L/C_H$ volts per second.
- **Charge injection and clock feedthrough**: when the MOSFET switch turns off, part of its channel charge and the gate drive coupled through its overlap capacitance land on $C_H$, giving a signal-dependent error. Bottom-plate sampling, dummy switches and differential circuits reduce it.
- **Aperture jitter**: random variation of the sampling instant converts directly into amplitude error on a changing signal.
- **Thermal noise**: the switch resistance leaves a random voltage of RMS value $\sqrt{kT/C_H}$ on the capacitor, independent of $R_{on}$ ([[electronics-2/electronic-noise]]).

::: proposition Jitter-limited signal-to-noise ratio {#prop-jitter}
A full-scale sinusoid of frequency $f$ sampled with RMS timing jitter $\sigma_t$ has a signal-to-noise ratio, due to jitter alone, of

$$
\mathrm{SNR}_{\text{jitter}} = -20\log_{10}(2\pi f\sigma_t)\ \mathrm{dB}.
$$ {#eq-jitter}
:::

::: proof
For $v = A\sin(2\pi ft)$, a timing error $\Delta t$ produces an amplitude error $\Delta v \approx (\mathrm{d}v/\mathrm{d}t)\Delta t = 2\pi fA\cos(2\pi ft)\,\Delta t$. Averaging the square over the signal phase and the independent jitter gives the error power $(2\pi fA)^2\sigma_t^2/2$, while the signal power is $A^2/2$. Their ratio is $1/(2\pi f\sigma_t)^2$, which in decibels is [[#eq-jitter]].
:::

For a $100\,\mathrm{MHz}$ input and $1\,\mathrm{ps}$ of RMS jitter, $\mathrm{SNR} = 64\,\mathrm{dB}$ — about $10.3$ bits, whatever the resolution of the converter. High-speed converters therefore need clocks with femtosecond-level jitter.

::: example Sizing a track-and-hold {#ex-track-hold}
A $12$-bit ADC with a $1\,\mathrm{V}$ input range uses a track-and-hold with $R_{on} = 1\,\mathrm{k\Omega}$. (a) How large must $C_H$ be for its $kT/C$ noise to equal the quantisation noise $\Delta^2/12$ at $300\,\mathrm{K}$? (b) With $C_H = 1\,\mathrm{pF}$, how long must the acquisition phase be? (c) What droop does a leakage of $1\,\mathrm{nA}$ cause?
::: solution
(a) $\Delta = 1\,\mathrm{V}/4096 = 244\,\mu\mathrm{V}$ and $\Delta^2/12 = 4.97\times10^{-9}\,\mathrm{V^2}$. Setting $kT/C_H$ equal: $C_H = 1.38\times10^{-23}\times300/4.97\times10^{-9} = 0.83\,\mathrm{pF}$. A larger capacitor makes the thermal noise a smaller part of the total; designers often choose two to four times this.

(b) $\tau = 1\,\mathrm{k\Omega}\times1\,\mathrm{pF} = 1\,\mathrm{ns}$, and settling to half an LSB of a full-scale step needs $\tau\ln(2^{13}) = 9.0\,\mathrm{ns}$.

(c) $I_L/C_H = 10^{-9}/10^{-12} = 1000\,\mathrm{V/s}$, that is $1\,\mathrm{mV}$ per microsecond — four LSBs per microsecond. A $1\,\mathrm{pF}$ hold capacitor must therefore be read within tens of nanoseconds, or leakage must be far smaller (on-chip junction leakages are typically picoamperes or less).
:::
:::

## Quantisation

::: definition Quantiser, resolution and LSB {#def-quantiser}
An $N$-bit converter with full-scale range $V_{FS}$ divides the range into $2^N$ codes. The **least significant bit** (LSB), or quantisation step, is

$$
\Delta = \frac{V_{FS}}{2^N}.
$$ {#eq-lsb}

An ideal ADC with **rounding** (mid-tread) assigns to $v_{in}$ the code $D = \mathrm{round}(v_{in}/\Delta)$; the **quantisation error** $e = D\Delta - v_{in}$ then lies in $[-\Delta/2, \Delta/2]$.
:::

::: warning Which LSB?
Some data sheets and textbooks define the LSB as $V_{FS}/(2^N - 1)$, the step of a DAC whose full-scale output is its largest code. The difference is negligible for $N \ge 8$ but matters in small examples and in specifications given "in LSBs". Also check whether $V_{FS}$ is peak or peak-to-peak and single-ended or differential: a "$2\,\mathrm{V}$ differential" input range is $4\,\mathrm{V}$ peak-to-peak between the two inputs.
:::

::: theorem Quantisation noise {#thm-quantisation-noise}
If the input is busy enough that the quantisation error is uniformly distributed on $[-\Delta/2, \Delta/2]$ and uncorrelated with the signal, the quantisation noise power is

$$
\overline{e^2} = \frac{\Delta^2}{12},
$$ {#eq-q-noise}

spread uniformly from DC to $f_s/2$. For a full-scale sinusoid (peak $V_{FS}/2$) the **signal-to-quantisation-noise ratio** of an ideal $N$-bit converter is

$$
\mathrm{SQNR} = 6.02N + 1.76\ \mathrm{dB}.
$$ {#eq-sqnr}
:::

::: proof
For $e$ uniform on $[-\Delta/2, \Delta/2]$, $\overline{e^2} = \frac{1}{\Delta}\int_{-\Delta/2}^{\Delta/2}e^2\,\mathrm{d}e = \frac{1}{\Delta}\cdot\frac{2}{3}\left(\frac\Delta2\right)^3 = \frac{\Delta^2}{12}$. A full-scale sinusoid has amplitude $V_{FS}/2 = 2^{N-1}\Delta$ and power $(2^{N-1}\Delta)^2/2 = 2^{2N}\Delta^2/8$. The ratio is

$$
\frac{2^{2N}\Delta^2/8}{\Delta^2/12} = \frac32\cdot2^{2N}, \qquad 10\log_{10}\Bigl(\frac32\cdot2^{2N}\Bigr) = 20N\log_{10}2 + 10\log_{10}1.5 = 6.02N + 1.76\ \mathrm{dB}.
$$

The noise is white because successive errors of a busy signal are, to a good approximation, independent; its power is therefore spread uniformly over the Nyquist band $0$ to $f_s/2$.
:::

Each extra bit buys $6\,\mathrm{dB}$. An 8-bit converter reaches at best $49.9\,\mathrm{dB}$, a 16-bit converter $98.1\,\mathrm{dB}$ (CD audio), and a 24-bit converter a theoretical $146\,\mathrm{dB}$ — far below the thermal noise of any real circuit, so that real "24-bit" audio converters achieve about $120$–$130\,\mathrm{dB}$ of dynamic range (as of 2026).

::: widget plot
f: round(sin(x)*2^(n - 1))/2^(n - 1); sin(x); 5*(round(sin(x)*2^(n - 1))/2^(n - 1) - sin(x))*2^(n - 1)/2^2
x: 0, 2pi
y: -1.3, 1.3
piticks: true
sliders: n=3:2:8:1
labels: \text{quantised}; \text{input}; \text{error (scaled)}
caption: A full-scale sinusoid quantised with $n$ bits (slider), with the quantisation error magnified so that $\pm\tfrac12\,\mathrm{LSB}$ always spans $\pm0.625$ on this scale. At $3$ bits the staircase is coarse and the error is a jagged, signal-dependent pattern; by $6$–$8$ bits the error looks like noise bounded by $\pm\tfrac12$ LSB, the regime in which $\Delta^2/12$ applies.
:::

### Oversampling

The noise power $\Delta^2/12$ is fixed, but it is spread over $0$ to $f_s/2$. If the signal occupies only $0$ to $f_B$, a digital filter can remove the noise above $f_B$. Defining the **oversampling ratio** $\mathrm{OSR} = f_s/(2f_B)$, the in-band noise is $\Delta^2/(12\,\mathrm{OSR})$ and

$$
\mathrm{SQNR} = 6.02N + 1.76 + 10\log_{10}\mathrm{OSR}\ \mathrm{dB}.
$$ {#eq-oversampling}

Doubling the sampling rate gains $3\,\mathrm{dB}$, half a bit: slow on its own, but the basis of sigma–delta conversion below.

## Converter specifications

::: definition Static errors {#def-static}
For a converter with ideal step $\Delta$:

- **Offset error**: the shift of the whole transfer characteristic, measured at code zero.
- **Gain error**: the deviation of the slope, measured as the full-scale error after offset is removed.
- **Differential non-linearity** of code $k$: $\mathrm{DNL}_k = (V_{k+1} - V_k)/\Delta - 1$ LSB, where $V_k$ is the output (DAC) or the transition level (ADC) of code $k$. A DAC is **monotonic** if every $\mathrm{DNL}_k > -1$; an ADC has **missing codes** if some $\mathrm{DNL}_k = -1$.
- **Integral non-linearity** of code $k$: $\mathrm{INL}_k = (V_k - V_k^{\text{ideal}})/\Delta$ LSB, measured from a straight line through the end points (or a best-fit line) after offset and gain errors are removed. The INL is the running sum of the DNL.
:::

The dynamic performance is measured with a pure sinusoidal input. The **SINAD** (signal to noise and distortion) is the ratio of the signal power to everything else in the Nyquist band, and the **effective number of bits** is the resolution of an ideal converter with the same SINAD:

$$
\mathrm{ENOB} = \frac{\mathrm{SINAD} - 1.76}{6.02}.
$$ {#eq-enob}

A "$14$-bit" converter with a SINAD of $70\,\mathrm{dB}$ has $\mathrm{ENOB} = 11.3$. Further specifications include the **spurious-free dynamic range** (SFDR, signal to largest spur), and, for comparing designs, the **Walden figure of merit** $P/(2^{\mathrm{ENOB}}f_s)$, the energy per conversion step: the best published ADCs reach the order of $1\,\mathrm{fJ}$ per step (as of 2026).

::: example DNL and INL of a 3-bit DAC {#ex-dnl}
A 3-bit DAC with ideal step $1\,\mathrm{V}$ produces, for codes $0$ to $7$, the outputs $0$, $1.1$, $1.9$, $3.2$, $3.9$, $5.0$, $6.2$ and $6.9\,\mathrm{V}$. Its end points are close enough to ideal that we measure INL from the ideal line $V_k = k\,\mathrm{V}$. Find the DNL and INL, and say whether it is monotonic.
::: solution
The steps are $1.1, 0.8, 1.3, 0.7, 1.1, 1.2, 0.7\,\mathrm{V}$, so the DNL values (step minus $1$, in LSB) are

$$
+0.1,\ -0.2,\ +0.3,\ -0.3,\ +0.1,\ +0.2,\ -0.3.
$$

The INL values (output minus $k$) are $0, +0.1, -0.1, +0.2, -0.1, 0, +0.2, -0.1$ LSB, each the running sum of the DNL values before it. The worst DNL is $\pm0.3$ LSB and the worst INL $+0.2$ LSB. Every DNL exceeds $-1$, so the DAC is monotonic.
:::
:::

## Digital-to-analog converters

### Binary-weighted and R–2R DACs

The most direct DAC sums binary-weighted currents. In the **binary-weighted resistor DAC**, bit $b_k$ connects a resistor $2^{N-1-k}R$ between $V_{ref}$ and the virtual ground of an inverting op-amp, so that the bit currents are in the ratio $1:2:4:\cdots$. For more than a few bits the resistor spread ($2^{N-1}$ to $1$) is impractical: the large resistors are slow and the small ones carry large currents. The **R–2R ladder** solves this with only two resistor values.

::: theorem The R–2R ladder DAC {#thm-r2r}
In a current-mode R–2R ladder fed by $V_{ref}$, each of the $N$ shunt "$2R$" arms is switched by its bit either to ground or to the virtual ground of an op-amp with feedback resistor $R_f$. The output is

$$
v_O = -\frac{R_f}{R}\,V_{ref}\sum_{k=0}^{N-1}b_k2^{k-N} = -\frac{R_f}{R}\,V_{ref}\,\frac{D}{2^N},
$$ {#eq-r2r}

where $D = \sum b_k2^k$ is the input code. The current drawn from $V_{ref}$ is $V_{ref}/R$, independent of the code.
:::

::: proof
The ladder consists of series resistors $R$ between successive nodes and, at each node, a $2R$ arm to ground or virtual ground (both at $0\,\mathrm{V}$), with an extra $2R$ termination at the far end. Looking towards the far end from the last node, $2R\parallel2R = R$; adding the series $R$ gives $2R$, in parallel with the next arm gives $R$ again, and so on: every node sees $R$ to the right and a $2R$ arm, and the resistance looking into the ladder from $V_{ref}$ is $R$. So the current entering is $V_{ref}/R$, and at each node it splits equally between the arm ($2R$) and the rest of the ladder (also $2R$). The MSB arm carries $V_{ref}/(2R)$, the next $V_{ref}/(4R)$, and the arm of bit $k$ carries $V_{ref}2^{k-N}/R$. Since every arm is at $0\,\mathrm{V}$ whichever way it is switched, the currents do not depend on the code; the op-amp sums those of the bits that are $1$ and produces $v_O = -R_f\sum b_kV_{ref}2^{k-N}/R$.
:::

The weakness of every binary-weighted DAC is the **major-carry transition**, from $0111\ldots1$ to $1000\ldots0$, where the MSB element switches on and all the others switch off. For the step to be one LSB within $\tfrac12$ LSB, the MSB current must equal the sum of all the others plus one LSB to within $\tfrac12$ LSB, a relative accuracy of $2^{-N}$: $0.024\,\%$ for $12$ bits. A mismatch beyond that makes the DAC non-monotonic.

::: example A 10-bit R–2R DAC {#ex-r2r}
A 10-bit R–2R DAC has $V_{ref} = 2.048\,\mathrm{V}$, $R = 10\,\mathrm{k\Omega}$ and $R_f = R$. Find the LSB, the output for code $D = 600$, the full-scale output and the reference current. How accurately must the MSB arm current match the sum of the rest for DNL $\le \tfrac12$ LSB at the major carry?
::: solution
By [[#eq-r2r]], the LSB is $V_{ref}/2^{10} = 2.000\,\mathrm{mV}$. For $D = 600$, $v_O = -2.048\times600/1024 = -1.200\,\mathrm{V}$. Full scale ($D = 1023$) gives $-2.046\,\mathrm{V}$. The reference supplies $2.048\,\mathrm{V}/10\,\mathrm{k\Omega} = 204.8\,\mu\mathrm{A}$ always. At the major carry the MSB arm ($512$ LSB) must exceed the other nine arms ($511$ LSB) by $1 \pm \tfrac12$ LSB, so its error relative to its own value must be below about $0.5/512 \approx 0.1\,\%$. That calls for laser-trimmed or carefully matched resistors.
:::
:::

### Current-steering and segmented DACs

High-speed DACs (hundreds of megasamples to gigasamples per second) use arrays of transistor current sources, each steered by a differential switch either to the output or to a dump node. To avoid the major-carry problem, the most significant bits are **thermometer-coded**: $2^M - 1$ identical unit sources for the $M$ MSBs, switched on one at a time as the code rises, so that every step adds one more identical unit and the DAC is monotonic by construction. A **segmented** DAC uses thermometer coding for the MSBs and binary weighting for the LSBs, balancing accuracy against the number of elements. Matching then follows Pelgrom's law ([[electronics-2/operational-amplifier-design#eq-pelgrom]]), and the static linearity depends on the area of the current sources.

::: quiz
Why does a thermometer-coded DAC guarantee monotonicity while a binary-weighted one does not?
- [ ] Because thermometer codes use fewer bits.
- [x] Because each code increase switches on one more unit element without switching any off, so the output can only rise.
- [ ] Because the unit elements are perfectly matched.
- [ ] Because thermometer-coded DACs have no offset.
::: solution
In a thermometer DAC, code $k + 1$ uses all the elements of code $k$ plus one more. Whatever the mismatch, each element contributes a positive current, so $V_{k+1} > V_k$. In a binary DAC the major carry turns the MSB on and all others off, and a small MSB can make the output fall. Mismatch still causes DNL and INL in a thermometer DAC, but not non-monotonicity.
:::
:::

## Nyquist-rate ADCs

### The flash ADC

A **flash** ADC compares the input simultaneously with all $2^N - 1$ transition levels, produced by a resistor string from $V_{ref}$ to ground. Each comparator outputs $1$ if the input is above its level, giving a thermometer code that a digital encoder converts to binary. Conversion takes one comparator decision, so flash converters are the fastest of all, reaching tens of gigasamples per second. But the comparator count doubles with each bit: $255$ for $8$ bits, $4095$ for $12$. Power, area and input capacitance grow accordingly, and flash ADCs are rarely built beyond $6$–$8$ bits; they are used as building blocks of faster or more accurate architectures.

### The successive-approximation ADC

The **successive-approximation register** (SAR) ADC performs a binary search with a single comparator and an internal DAC.

::: algorithm Successive approximation {#alg-sar}
To convert a held input $v_{in}$ in $0 \le v_{in} < V_{ref}$ with $N$ bits:

1. Set the trial code to $1000\ldots0$, so the DAC outputs $V_{ref}/2$.
2. For each bit from the MSB down: compare $v_{in}$ with the DAC output. If $v_{in}$ is greater or equal, keep the bit at $1$; otherwise clear it to $0$. Then set the next lower bit to $1$ and repeat.
3. After $N$ comparisons the register holds $D = \lfloor v_{in}/\Delta\rfloor$ with $\Delta = V_{ref}/2^N$.
:::

::: example A 4-bit SAR conversion {#ex-sar}
A 4-bit SAR ADC with $V_{ref} = 1\,\mathrm{V}$ converts $v_{in} = 0.6\,\mathrm{V}$. Trace the conversion.
::: solution
$\Delta = 62.5\,\mathrm{mV}$.

| step | trial code | DAC output | $v_{in} \ge$ DAC? | bit |
|---|---|---|---|---|
| 1 | $1000$ | $0.5000\,\mathrm{V}$ | yes | $b_3 = 1$ |
| 2 | $1100$ | $0.7500\,\mathrm{V}$ | no | $b_2 = 0$ |
| 3 | $1010$ | $0.6250\,\mathrm{V}$ | no | $b_1 = 0$ |
| 4 | $1001$ | $0.5625\,\mathrm{V}$ | yes | $b_0 = 1$ |

The result is $1001_2 = 9$, representing $0.5625\,\mathrm{V}$; indeed $\lfloor0.6/0.0625\rfloor = \lfloor9.6\rfloor = 9$. The error, $37.5\,\mathrm{mV}$, is less than one LSB, as it must be for a truncating converter; adding $\tfrac12$ LSB to the DAC levels would make it round.
:::
:::

In CMOS the DAC is usually a **capacitive** (charge-redistribution) array: binary-weighted capacitors $C, C, 2C, 4C, \ldots, 2^{N-1}C$ that sample the input on their top plates and then have their bottom plates switched between $V_{ref}$ and ground, bit by bit. The array doubles as the track-and-hold, consumes power only when switching, and benefits from the excellent matching of capacitors. SAR ADCs dominate the range from $8$ to $18$ bits at sample rates from kilohertz to a few hundred megahertz, and offer the best energy efficiency of any architecture.

### Integrating and pipelined ADCs

The **dual-slope** ADC integrates the input for a fixed time $T_1$, then integrates a reference of opposite sign until the integrator returns to zero, taking $T_2$; then $v_{in} = V_{ref}T_2/T_1$, independent of $R$, $C$ and the clock frequency, which cancel. Integrating over exactly one period of the mains ($20\,\mathrm{ms}$ at $50\,\mathrm{Hz}$) rejects hum completely. Dual-slope converters are slow — tens of conversions per second — but accurate and cheap, and are used in digital multimeters.

The **pipelined** ADC is an assembly line: each stage samples its input, resolves a few bits with a small flash ADC, subtracts the corresponding DAC value and amplifies the **residue** for the next stage. All stages work simultaneously on successive samples, giving flash-like throughput with SAR-like resolution, typically $10$–$16$ bits at hundreds of megasamples per second. Time-interleaving several SAR or pipelined converters extends the rate further, to the tens of gigasamples per second of RF-sampling receivers and oscilloscopes.

## Sigma–delta converters

Oversampling alone buys $3\,\mathrm{dB}$ per doubling of the sample rate. Noise shaping does far better by moving the quantisation noise out of the signal band before it is filtered away.

The **first-order sigma–delta modulator** has an integrator (accumulator), a coarse quantiser — often a single comparator — and a 1-bit DAC in a feedback loop. In discrete time, with input $x[n]$, integrator state $u[n]$ and output $y[n]$:

$$
u[n] = u[n - 1] + x[n - 1] - y[n - 1], \qquad y[n] = Q(u[n]).
$$

The loop drives the *average* of $y$ to equal the average of $x$: any persistent difference would accumulate in the integrator without bound. For a DC input of $0.3$ (with output levels $\pm1$), the bitstream runs $1, -1, 1, -1, 1, 1, -1, 1, 1, -1, \ldots$ and its average over $1000$ samples is exactly $0.300$. A digital **decimation filter** averages the bitstream and reduces the rate to $2f_B$, producing high-resolution words.

::: theorem Noise shaping {#thm-noise-shaping}
Model the quantiser as the addition of white noise $e[n]$ of power $\Delta^2/12$. Then the first-order modulator output is

$$
Y(z) = z^{-1}X(z) + (1 - z^{-1})E(z),
$$ {#eq-ntf}

so the signal passes unchanged (delayed) while the noise is high-pass filtered by the **noise transfer function** $\mathrm{NTF}(z) = 1 - z^{-1}$. For $\mathrm{OSR} \gg 1$, the in-band noise of an $L$-th order modulator with $\mathrm{NTF} = (1 - z^{-1})^L$ is

$$
\overline{e^2_{\text{in-band}}} = \frac{\Delta^2}{12}\,\frac{\pi^{2L}}{(2L + 1)\,\mathrm{OSR}^{2L+1}},
$$

and for a full-scale sinusoid and an $N$-bit quantiser

$$
\mathrm{SQNR} = 6.02N + 1.76 - 10\log_{10}\frac{\pi^{2L}}{2L + 1} + (2L + 1)\,10\log_{10}\mathrm{OSR}\ \mathrm{dB}.
$$ {#eq-sd-sqnr}
:::

::: proof
In $z$-transforms ([[signals-systems/z-transform]]) the integrator is $U = z^{-1}U + z^{-1}(X - Y)$, so $U = z^{-1}(X - Y)/(1 - z^{-1})$, and the quantiser gives $Y = U + E$. Substituting, $Y(1 - z^{-1}) = z^{-1}X - z^{-1}Y + (1 - z^{-1})E$, so $Y = z^{-1}X + (1 - z^{-1})E$.

On the unit circle, $\abs{1 - e^{-j\omega}}^2 = 4\sin^2(\omega/2) \approx \omega^2$ for small $\omega$, and for the $L$-th order NTF the factor is $\omega^{2L}$. The white noise has density $(\Delta^2/12)/\pi$ per unit of $\omega$ on $0 \le \omega \le \pi$. The signal band is $0 \le \omega \le \pi/\mathrm{OSR}$, so

$$
\overline{e^2_{\text{in-band}}} \approx \frac{\Delta^2}{12\pi}\int_0^{\pi/\mathrm{OSR}}\omega^{2L}\,\mathrm{d}\omega = \frac{\Delta^2}{12\pi}\cdot\frac{(\pi/\mathrm{OSR})^{2L+1}}{2L + 1} = \frac{\Delta^2}{12}\cdot\frac{\pi^{2L}}{(2L + 1)\mathrm{OSR}^{2L+1}}.
$$

Dividing the full-scale signal power by this and taking $10\log_{10}$, as in [[#thm-quantisation-noise]], gives [[#eq-sd-sqnr]].
:::

For $L = 1$ the penalty term is $10\log_{10}(\pi^2/3) = 5.17\,\mathrm{dB}$ and each doubling of OSR gains $9\,\mathrm{dB}$; for $L = 2$ the penalty is $12.9\,\mathrm{dB}$ and each doubling gains $15\,\mathrm{dB}$. A second-order modulator with a 1-bit quantiser and $\mathrm{OSR} = 128$ reaches $100\,\mathrm{dB}$, the quality of 16-bit audio, from a single comparator.

::: widget plot
f: 7.78 + 10*log10(2^x); 7.78 - 5.17 + 30*log10(2^x); 7.78 - 12.9 + 50*log10(2^x); 7.78 - 30.2 + 90*log10(2^x)
x: 0, 9
y: 0, 160
hlines: 98
labels: \text{oversampling only}; L = 1; L = 2; L = 4
caption: Theoretical SQNR of a 1-bit converter (dB) against $\log_2\mathrm{OSR}$: plain oversampling gains $3\,\mathrm{dB}$ per doubling, first-order noise shaping $9\,\mathrm{dB}$, second-order $15\,\mathrm{dB}$ and fourth-order $27\,\mathrm{dB}$. The horizontal line is the $98\,\mathrm{dB}$ of an ideal 16-bit converter. Find the OSR at which each curve crosses it: about $22$ for $L = 4$, $115$ for $L = 2$, but about $1500$ for $L = 1$. (High-order loops need careful design to remain stable, so real modulators fall a little short of these curves.)
:::

::: example An audio sigma–delta ADC {#ex-sigma-delta}
An audio ADC must digitise $0$–$20\,\mathrm{kHz}$ with an SQNR of at least $100\,\mathrm{dB}$ using a second-order modulator with a 1-bit quantiser. Find the required OSR and the modulator clock rate.
::: solution
From [[#eq-sd-sqnr]] with $N = 1$ and $L = 2$: $100 \le 7.78 - 12.9 + 50\log_{10}\mathrm{OSR}$, so $\log_{10}\mathrm{OSR} \ge 105.1/50 = 2.10$ and $\mathrm{OSR} \ge 126$. Choose the power of two $\mathrm{OSR} = 128$, which gives $100.2\,\mathrm{dB}$. The modulator runs at $f_s = 2f_B\,\mathrm{OSR} = 2\times20\,\mathrm{kHz}\times128 = 5.12\,\mathrm{MHz}$; with the standard audio rate of $48\,\mathrm{kHz}$ and $\mathrm{OSR} = 128$, the clock is $6.144\,\mathrm{MHz}$. The decimation filter then reduces the 1-bit stream at $6.144\,\mathrm{MHz}$ to 24-bit words at $48\,\mathrm{kHz}$. In practice, multi-bit quantisers and higher-order loops give margin for the circuit noise that a real converter adds.
:::
:::

::: quiz
In a first-order sigma–delta modulator, why does the integrator force the average of the output bitstream to equal the input?
- [ ] Because the comparator has infinite gain.
- [x] Because any persistent difference between input and output would accumulate without limit in the integrator, so the loop must keep the long-term difference at zero.
- [ ] Because the decimation filter removes the difference.
- [ ] Because the 1-bit DAC is perfectly linear.
::: solution
The integrator sums $x - y$. Its output stays bounded (it only ever has to be on one side or the other of the comparator threshold), so the running sum of $x - y$ is bounded, and the average of $x - y$ over $M$ samples tends to zero as $M$ grows. The perfect linearity of a 1-bit DAC (two points always lie on a straight line) is a separate, important advantage of 1-bit modulators.
:::
:::

::: application Choosing an architecture (as of 2026)
Audio, precision instrumentation and sensor interfaces use sigma–delta converters, $16$–$32$ bits at up to a few hundred kilosamples per second. Data acquisition and microcontroller ADCs are mostly SAR, $10$–$18$ bits at up to a few megasamples per second. Communications receivers use pipelined or time-interleaved SAR converters, $10$–$14$ bits at hundreds of megasamples to tens of gigasamples per second. Oscilloscopes and optical-link receivers use interleaved flash or SAR converters at $6$–$8$ effective bits and very high rates. The boundary between them moves every year, but the trade-off — resolution against speed against power — does not.
:::

::: history
Alec Reeves, working for International Telephone and Telegraph in Paris, patented pulse-code modulation in 1938, the first proposal to transmit speech as binary numbers. Bell Laboratories built experimental PCM systems in the 1940s, and in 1948 Bernard Oliver, John Pierce and Claude Shannon published "The philosophy of PCM", which set out the trade-off between bits and signal-to-noise ratio. The first commercial ADC, Bernard Gordon's DATRAC at Epsco (1954), was a vacuum-tube successive-approximation converter of $11$ bits at $50\,\mathrm{kS/s}$ that weighed about $70\,\mathrm{kg}$. Hiroshi Inose, Yasuhiko Yasuda and Jun Murakami described delta–sigma modulation in 1962, and integrated sigma–delta converters became practical in the 1980s with fast, dense CMOS. Successive-approximation converters using charge-redistribution capacitor arrays were introduced by James McCreary and Paul Gray in 1975.
:::

## Where this leads

Data converters sit at the edges of every digital system. What happens to the samples next — digital filtering, decimation and interpolation — is the subject of [[dsp/multirate-processing]] and [[dsp/fir-filter-design]], and the anti-aliasing filters in front of them were designed in [[electronics-2/active-filters]]. The noise that ultimately limits a converter's resolution, including the $kT/C$ noise of its sampling capacitor, is analysed in [[electronics-2/electronic-noise]]. Microcontroller converters and their use are covered in [[embedded-systems/analog-interfaces]], and complete measurement chains in [[instrumentation/data-acquisition]].

::: summary
- A track-and-hold freezes the input; its acquisition time is $R_{on}C_H\ln(2^{N+1})$, its droop $I_L/C_H$, and aperture jitter limits SNR to $-20\log_{10}(2\pi f\sigma_t)$.
- An $N$-bit quantiser has step $\Delta = V_{FS}/2^N$ and noise power $\Delta^2/12$; an ideal converter reaches $\mathrm{SQNR} = 6.02N + 1.76\,\mathrm{dB}$, and oversampling adds $10\log_{10}\mathrm{OSR}$.
- Static linearity is described by offset, gain error, DNL and INL; dynamic performance by SINAD and $\mathrm{ENOB} = (\mathrm{SINAD} - 1.76)/6.02$.
- The R–2R ladder gives binary-weighted currents with two resistor values; binary DACs need $2^{-N}$ matching at the major carry, while thermometer-coded DACs are monotonic by construction.
- Flash ADCs use $2^N - 1$ comparators for one-step conversion; SAR ADCs perform an $N$-step binary search with one comparator and a capacitive DAC; dual-slope and pipelined ADCs fill the slow-accurate and fast-accurate niches.
- Sigma–delta modulators shape quantisation noise away from the signal band: an $L$-th order loop gains $(2L + 1)\times3\,\mathrm{dB}$ per doubling of OSR.
:::

## Exercises

::: exercise LSB size {level=1 check="3.3/4096"}
A 12-bit ADC has a full-scale range of $3.3\,\mathrm{V}$. What is its LSB in volts?
::: solution
$\Delta = 3.3/2^{12} = 3.3/4096 = 0.806\,\mathrm{mV}$.
:::
:::

::: exercise Ideal SQNR {level=1 check="6.02*14+1.76"}
What is the ideal SQNR, in dB, of a 14-bit converter for a full-scale sinusoid?
::: solution
$6.02\times14 + 1.76 = 86.0\,\mathrm{dB}$.
:::
:::

::: exercise ENOB {level=1 check="(62-1.76)/6.02"}
An ADC measures a SINAD of $62\,\mathrm{dB}$. What is its effective number of bits?
::: solution
$\mathrm{ENOB} = (62 - 1.76)/6.02 = 10.0$ bits.
:::
:::

::: exercise Jitter budget {level=2 check="1/(2*pi*200e6*10^(70/20))"}
A receiver samples signals up to $200\,\mathrm{MHz}$ and needs a jitter-limited SNR of at least $70\,\mathrm{dB}$. What is the largest allowed RMS clock jitter in seconds?
::: solution
From [[#eq-jitter]], $2\pi f\sigma_t \le 10^{-70/20} = 3.16\times10^{-4}$, so $\sigma_t \le 3.16\times10^{-4}/(2\pi\times2\times10^8) = 0.25\,\mathrm{ps}$, that is $250\,\mathrm{fs}$.
:::
:::

::: exercise Oversampling a Nyquist converter {level=2}
A 12-bit SAR ADC sampling at $1\,\mathrm{MS/s}$ digitises a signal limited to $1\,\mathrm{kHz}$, and the samples are digitally low-pass filtered to $1\,\mathrm{kHz}$. Assuming only quantisation noise, what SQNR can be achieved, and how many effective bits does it correspond to? Why might this not be achieved in practice?
::: solution
$\mathrm{OSR} = 10^6/(2\times10^3) = 500$, so by [[#eq-oversampling]] $\mathrm{SQNR} = 74.0 + 10\log_{10}500 = 74.0 + 27.0 = 101\,\mathrm{dB}$, equivalent to $16.5$ bits. In practice the gain requires the quantisation error to be white, which needs a busy input or added dither, and it does nothing for the converter's INL, which produces harmonic distortion inside the band: a 12-bit converter with $\pm1$ LSB INL cannot deliver 16-bit linearity.
:::
:::

::: exercise Flash comparator count {level=2 check="2^10-1"}
How many comparators does a 10-bit flash ADC need? If each comparator draws $0.5\,\mathrm{mW}$, what is the comparator power?
::: solution
$2^{10} - 1 = 1023$ comparators, drawing $512\,\mathrm{mW}$. A 6-bit flash would need $63$ comparators and $32\,\mathrm{mW}$: each extra bit doubles the cost.
:::
:::

::: exercise Dual-slope conversion {level=2}
A dual-slope ADC integrates the input for $T_1 = 20\,\mathrm{ms}$ (one $50\,\mathrm{Hz}$ period), then de-integrates with $V_{ref} = -2\,\mathrm{V}$; the de-integration time is counted with a $1\,\mathrm{MHz}$ clock. (a) What count results for $v_{in} = 1.234\,\mathrm{V}$? (b) Show that a $50\,\mathrm{Hz}$ hum of any phase added to the input does not change the result.
::: solution
(a) $T_2 = T_1v_{in}/\abs{V_{ref}} = 20\,\mathrm{ms}\times1.234/2 = 12.34\,\mathrm{ms}$, that is $12\,340$ counts of $1\,\mu\mathrm{s}$.

(b) The integrator output at the end of $T_1$ is proportional to $\int_0^{T_1}v_{in}\,\mathrm{d}t$. For $v_h = A\sin(2\pi\cdot50t + \phi)$, $\int_0^{20\,\mathrm{ms}}v_h\,\mathrm{d}t = 0$ for every $\phi$, since the interval is exactly one period. So the hum contributes nothing, and the converter has, in principle, infinite rejection at $50\,\mathrm{Hz}$ and its harmonics.
:::
:::

::: exercise The capacitive SAR DAC {level=3}
A 4-bit charge-redistribution SAR DAC has capacitors $C$, $C$, $2C$, $4C$, $8C$ (total $16C$), the first being a dummy that is always grounded at its bottom plate. During sampling all top plates are at ground through a switch and all bottom plates are at $v_{in}$. Then the top-plate switch opens and every bottom plate is switched to ground. (a) Show that the top-plate voltage becomes $-v_{in}$. (b) Now the bottom plate of the $8C$ capacitor is switched to $V_{ref}$. Show that the top plate becomes $-v_{in} + V_{ref}/2$, so that a comparator checking its sign performs the first SAR step. (c) What does a parasitic capacitance $C_p$ from the top plate to ground do?
::: solution
(a) During sampling the charge on the top plate is $Q = 16C(0 - v_{in}) = -16Cv_{in}$. With the top plate floating, $Q$ is conserved. With all bottom plates at ground and top-plate voltage $v_x$, $Q = 16Cv_x$, so $v_x = -v_{in}$.

(b) With the $8C$ bottom plate at $V_{ref}$ and the rest at ground, $Q = 8C(v_x - V_{ref}) + 8Cv_x = 16Cv_x - 8CV_{ref}$. Setting $Q = -16Cv_{in}$: $v_x = -v_{in} + V_{ref}/2$. The comparator tests $v_x < 0$, i.e. $v_{in} > V_{ref}/2$, which decides the MSB; if the bit is $0$ the plate returns to ground. Each subsequent bit adds $V_{ref}2^{k-4}$ in the same way.

(c) The top-plate parasitic $C_p$ shares the charge: $v_x$ becomes $(16C/(16C + C_p))(-v_{in} + \ldots)$. Every voltage is scaled by the same factor, so the *sign* that the comparator tests is unchanged and the conversion remains correct, but the signal at the comparator shrinks, making comparator noise and offset relatively larger. Parasitics on individual bottom plates are driven by the switches and do not matter; this is one reason for the top-plate/bottom-plate arrangement.
:::
:::

::: exercise A sigma–delta design {level=3}
A sensor interface must achieve $\mathrm{SQNR} \ge 120\,\mathrm{dB}$ over a $1\,\mathrm{kHz}$ bandwidth. (a) Using [[#eq-sd-sqnr]] with a 1-bit quantiser, find the OSR needed for $L = 2$ and for $L = 3$, rounded up to a power of two, and the corresponding modulator clock rates. (b) With $L = 2$ and a 4-bit quantiser, what OSR suffices? (c) Comment on the practical choice.
::: hint
For $L = 3$ the penalty term is $10\log_{10}(\pi^6/7)$.
:::
::: solution
(a) $L = 2$: $120 \le 7.78 - 12.90 + 50\log_{10}\mathrm{OSR}$, so $\mathrm{OSR} \ge 10^{125.1/50} = 10^{2.502} = 318$; take $512$, giving $f_s = 2\times1\,\mathrm{kHz}\times512 = 1.024\,\mathrm{MHz}$. $L = 3$: the penalty is $10\log_{10}(961.4/7) = 21.4\,\mathrm{dB}$, so $120 \le 7.78 - 21.4 + 70\log_{10}\mathrm{OSR}$, $\mathrm{OSR} \ge 10^{133.6/70} = 10^{1.909} = 81$; take $128$, $f_s = 256\,\mathrm{kHz}$.

(b) A 4-bit quantiser adds $6.02\times3 = 18.1\,\mathrm{dB}$: $\mathrm{OSR} \ge 10^{(125.1 - 18.1)/50} = 10^{2.14} = 138$; take $256$.

(c) All three are feasible at these low clock rates. A single-bit second-order loop is the simplest and is unconditionally stable, and its 1-bit DAC is perfectly linear; at $\mathrm{OSR} = 512$ the clock is only $1\,\mathrm{MHz}$, so it is a natural choice. Multi-bit quantisers need a linear multi-bit DAC (with element shuffling) and third-order single-bit loops need careful stabilisation. Moreover, at $120\,\mathrm{dB}$ the thermal noise of the input stage, not quantisation, is likely to dominate ([[electronics-2/electronic-noise]]).
:::
:::
