The sensors of [[mechatronics/sensors]] rarely produce a signal that a controller can use directly. A strain-gauge bridge gives a few millivolts riding on several volts of common-mode voltage; a thermocouple gives microvolts per kelvin; an accelerometer's signal is mixed with electrical noise from the motor drive two cables away. **Signal conditioning** is the chain of circuits that turns such signals into a clean, correctly scaled voltage — amplification, bridge completion, filtering, isolation — and **data acquisition** is its final step, converting the voltage into numbers at a chosen rate. Mistakes here are especially treacherous, because a badly conditioned signal still produces plausible numbers: an amplifier that saturates, a filter that removes the signal, or a sampling rate that folds high-frequency noise into a slow, convincing-looking drift.

This chapter develops the operational-amplifier circuits used with sensors, the Wheatstone bridge, active filters, noise and interference, and analogue-to-digital conversion with the sampling theorem and aliasing. The circuit theory of op-amps is treated in more depth in the [Electrical Engineering Atlas](/learn/ee/lesson.php?c=circuits-1&l=operational-amplifiers); here we concentrate on what an engineer specifying a measurement chain must calculate.

## Operational-amplifier circuits {#sec-opamps}

An **operational amplifier** (op-amp) is a high-gain differential amplifier: its output is $v_o = A(v_+ - v_-)$, with open-loop gain $A$ of $10^5$–$10^6$ at low frequency, very high input resistance and low output resistance. It is never used open-loop in a measuring circuit; **negative feedback** from the output to the inverting input sets the gain by resistor ratios, independently of the uncertain value of $A$.

::: definition The ideal op-amp rules {#def-ideal-opamp}
For an op-amp with negative feedback, operating within its output-voltage and frequency limits, analysis uses two rules:
1. **No input current:** the currents into the $+$ and $-$ inputs are zero.
2. **Virtual short:** the feedback adjusts the output so that $v_+ = v_-$.

Rule 2 follows from $v_+ - v_- = v_o/A \to 0$ as $A \to \infty$ with $v_o$ finite. Both rules fail when the output saturates (reaches the supply rails) or when the signal frequency approaches the op-amp's gain–bandwidth product.
:::

::: proposition Inverting, non-inverting and difference amplifiers {#prop-amps}
With ideal op-amps:

(a) **Inverting amplifier** (input through $R_{\text{in}}$ to the $-$ input, feedback $R_f$ from output to $-$ input, $+$ input grounded): $v_o = -(R_f/R_{\text{in}})\,v_{\text{in}}$; input resistance $R_{\text{in}}$.

(b) **Non-inverting amplifier** (input to $+$; $R_g$ from $-$ to ground, $R_f$ from output to $-$): $v_o = (1 + R_f/R_g)\,v_{\text{in}}$; input resistance practically infinite. With $R_f = 0$ and $R_g$ omitted it is a **voltage follower** (buffer), gain $1$.

(c) **Difference amplifier** ($v_1$ through $R_1$ to $-$, $R_2$ from output to $-$; $v_2$ through $R_1$ to $+$, $R_2$ from $+$ to ground): $v_o = (R_2/R_1)(v_2 - v_1)$.
:::

::: proof
(a) The $+$ input is at $0$, so by rule 2 the $-$ input is at $0$ (a "virtual ground"). The current $v_{\text{in}}/R_{\text{in}}$ flows in through $R_{\text{in}}$ and, by rule 1, all of it continues through $R_f$, so $v_o = 0 - R_f\,v_{\text{in}}/R_{\text{in}}$. (b) $v_- = v_+ = v_{\text{in}}$. With no input current, $R_f$ and $R_g$ form a divider of $v_o$: $v_- = v_oR_g/(R_g + R_f)$; equating gives $v_o = v_{\text{in}}(1 + R_f/R_g)$. (c) The $+$ input is a divider of $v_2$: $v_+ = v_2R_2/(R_1 + R_2)$. KCL at the $-$ input: $(v_1 - v_-)/R_1 = (v_- - v_o)/R_2$. With $v_- = v_+$, solve for $v_o$: $v_o = v_-(1 + R_2/R_1) - v_1R_2/R_1 = v_2R_2/R_1 - v_1R_2/R_1$.
:::

The difference amplifier rejects any voltage common to both inputs — but only as well as its resistor ratios match. If one ratio differs by a fraction $\delta$, a common-mode voltage $v_{cm}$ produces an output error of order $\delta\,v_{cm}R_2/(R_1 + R_2)$. The figure of merit is the **common-mode rejection ratio**, $\mathrm{CMRR} = 20\log_{10}(G_{\text{diff}}/G_{cm})$ in decibels. A further weakness is that its input resistances ($R_1$ and $R_1 + R_2$) load the source. Both problems are solved by the instrumentation amplifier.

::: proposition The three-op-amp instrumentation amplifier {#prop-inamp}
Two non-inverting amplifiers, sharing a gain resistor $R_G$ connected between their inverting inputs and each with feedback resistor $R$, drive a unity-gain difference amplifier. The output is
$$
v_o = \left(1 + \frac{2R}{R_G}\right)(v_2 - v_1),
$$ {#eq-inamp}
the input resistance at both inputs is that of an op-amp's non-inverting input (very high), and a common-mode voltage passes through the first stage with unity gain, so it is rejected by the difference stage.
:::

::: proof
By rule 2 the two ends of $R_G$ are at $v_1$ and $v_2$, so a current $i = (v_2 - v_1)/R_G$ flows through it. By rule 1 the same current flows through both resistors $R$, so the first-stage outputs are $v_{o2} = v_2 + iR$ and $v_{o1} = v_1 - iR$, and their difference is $v_{o2} - v_{o1} = (v_2 - v_1)(1 + 2R/R_G)$. The difference stage with equal resistors gives $v_o = v_{o2} - v_{o1}$. A common-mode input $v_1 = v_2 = v_{cm}$ makes $i = 0$, so both first-stage outputs equal $v_{cm}$: the first stage amplifies the difference by $1 + 2R/R_G$ but the common mode only by $1$, multiplying the overall CMRR by the first-stage gain.
:::

Integrated instrumentation amplifiers contain the matched resistors, trimmed by laser, so that one external resistor $R_G$ sets the gain and CMRR exceeds $100\ \mathrm{dB}$ at high gain. They are the standard front end for bridges, thermocouples and biomedical electrodes.

## The Wheatstone bridge {#sec-bridge}

A strain gauge changes its resistance by about $0.1\,\%$ at most. Measuring the voltage across a single gauge fed with a current would mean detecting a millivolt change on a signal of volts, and any drift in the supply would swamp it. The **Wheatstone bridge** subtracts the large constant part.

::: proposition Bridge output {#prop-bridge}
Four resistors form two dividers across the excitation $V_s$: $R_1$ (top) and $R_2$ (bottom) on the left, $R_4$ (top) and $R_3$ (bottom) on the right. The differential output between the right and left midpoints is
$$
V_o = V_s\left(\frac{R_3}{R_3 + R_4} - \frac{R_2}{R_1 + R_2}\right),
$$ {#eq-bridge}
zero when $R_1R_3 = R_2R_4$ (the bridge is **balanced**). For four equal arms $R$ with small changes $\Delta R_i$,
$$
V_o \approx \frac{V_s}{4}\left(\frac{\Delta R_3}{R} - \frac{\Delta R_4}{R} - \frac{\Delta R_2}{R} + \frac{\Delta R_1}{R}\right).
$$ {#eq-bridge-lin}
For a **quarter bridge** (one active gauge, $\Delta R_3 = \Delta R$) the exact output is $V_o = V_s\,x/(4 + 2x)$ with $x = \Delta R/R$, approximately $V_s\,GF\,\varepsilon/4$.
:::

::: proof
Each midpoint voltage is a divider ([[mechatronics/mechatronic-systems#eq-divider]]), unloaded because the output is read by an instrumentation amplifier; subtracting gives [[#eq-bridge]]. Balance: $R_3/(R_3 + R_4) = R_2/(R_1 + R_2)$ cross-multiplies to $R_3R_1 = R_2R_4$. For the linearisation, $\partial/\partial R_3$ of $R_3/(R_3 + R_4)$ is $R_4/(R_3 + R_4)^2 = 1/(4R)$ at equal arms, and $\partial/\partial R_4$ is $-1/(4R)$; similarly the left divider contributes $-\Delta R_2/(4R) + \Delta R_1/(4R)$. Quarter bridge exactly: $V_o = V_s[R(1 + x)/(R(2 + x)) - \tfrac12] = V_s\,x/(2(2 + x))$.
:::

Equation [[#eq-bridge-lin]] is the key to bridge design. Changes in *adjacent* arms (sharing an output node, e.g. $R_3$ and $R_4$) subtract; changes in *opposite* arms ($R_1$ and $R_3$) add. Hence:

- a gauge in tension in arm 3 and an identical unstrained "dummy" gauge on the same material at the same temperature in arm 4 cancel the temperature effect;
- on a bending beam, a gauge on the tension face in arm 3 and one on the compression face in arm 4 double the output (a **half bridge**) and cancel temperature;
- with four active gauges, two in tension and two in compression in the right arms (a **full bridge**), the output is $V_s\,GF\,\varepsilon$, four times the quarter bridge, exactly linear, and temperature-compensated. Load cells are full bridges, specified by their **rated output** in mV per volt of excitation, typically $2\ \mathrm{mV/V}$.

The bridge output is **ratiometric**: proportional to $V_s$. If the ADC's reference is derived from the same excitation voltage, drift of the supply cancels in the digital reading.

::: example Conditioning a load cell {#ex-load-cell-chain}
A full-bridge load cell rated $2\ \mathrm{mV/V}$ at $500\ \mathrm{N}$ is excited with $5.0\ \mathrm{V}$. An instrumentation amplifier with internal resistors $R = 25\ \mathrm{k\Omega}$ is to map full scale to about $2.5\ \mathrm{V}$ for an ADC with a $0$–$4.096\ \mathrm{V}$ range. Choose $R_G$, find the common-mode voltage, and the error caused by a CMRR of $100\ \mathrm{dB}$.
::: solution
Full-scale bridge output $2\ \mathrm{mV/V} \times 5.0\ \mathrm{V} = 10\ \mathrm{mV}$. Required gain $2.5/0.010 = 250$; with [[#eq-inamp]], $R_G = 2R/(G - 1)$. Taking $G = 251$ gives $R_G = 50\,000/250 = 200\ \mathrm{\Omega}$ exactly, and full scale becomes $2.51\ \mathrm{V}$, leaving headroom for overload.

Both bridge outputs sit near $V_s/2 = 2.5\ \mathrm{V}$: that is the common-mode voltage. A CMRR of $100\ \mathrm{dB}$ ($10^5$) means a common-mode input is equivalent to a differential input $10^5$ times smaller: $2.5/10^5 = 25\ \mathrm{\mu V}$, i.e. $0.25\,\%$ of the $10\ \mathrm{mV}$ full scale. Because the common mode is constant, this appears as an offset and is removed by taring (zeroing) — but it drifts with the excitation, which is one reason precision designs use ratiometric conversion.

Sanity check: the gain must leave the amplifier's output within its swing — $2.51\ \mathrm{V}$ on a $5\ \mathrm{V}$ rail-to-rail device is fine — and the input common mode of $2.5\ \mathrm{V}$ must lie within the amplifier's allowed input range, which on single-supply devices is easy to violate. Check both in the data sheet.
:::
:::

::: example Quarter-bridge non-linearity {#ex-quarter}
A $350\ \mathrm{\Omega}$ gauge with $GF = 2.0$ in a quarter bridge excited at $5.0\ \mathrm{V}$ is strained to $500\ \mu\varepsilon$. Compare the exact and linearised outputs.
::: solution
$x = GF\,\varepsilon = 1.0\times10^{-3}$. Linearised: $V_sx/4 = 5.0 \times 10^{-3}/4 = 1.250\ \mathrm{mV}$. Exact: $V_sx/(4 + 2x) = 5.0\times10^{-3}/4.002 = 1.2494\ \mathrm{mV}$. The relative error is $x/2 = 0.05\,\%$.

Sanity check: the non-linearity grows in proportion to the strain, so at $5000\ \mu\varepsilon$ (plastic strain in steel) it would be $0.5\,\%$; for elastic strains of metals the quarter bridge is linear enough for most purposes. A full bridge has no such error.
:::
:::

## Filters {#sec-filters}

A **filter** removes the parts of a signal's spectrum we do not want: high-frequency noise, mains hum, or components above half the sampling rate that would otherwise alias (see below). The simplest is the RC low-pass of [[mechatronics/mechatronic-systems#prop-rc]], with transfer function $1/(\tau s + 1)$ and corner frequency $f_c = 1/(2\pi RC)$; above $f_c$ it attenuates at $20\ \mathrm{dB}$ per decade. When a steeper roll-off is needed, second-order active sections are cascaded.

::: proposition Unity-gain Sallen–Key low-pass filter {#prop-sallen-key}
Resistors $R_1$ and $R_2$ in series connect the input to the $+$ input of a voltage follower; capacitor $C_1$ connects the junction of the resistors to the output, and $C_2$ connects the $+$ input to ground. The transfer function is
$$
\frac{V_o(s)}{V_i(s)} = \frac{1}{R_1R_2C_1C_2\,s^2 + C_2(R_1 + R_2)\,s + 1},
$$ {#eq-sallen-key}
a second-order low-pass with $\omega_n = 1/\sqrt{R_1R_2C_1C_2}$ and quality factor $Q = \sqrt{R_1R_2C_1C_2}/[C_2(R_1 + R_2)]$. With $R_1 = R_2 = R$, $Q = \tfrac12\sqrt{C_1/C_2}$, and the choice $C_1 = 2C_2$ gives $Q = 1/\sqrt2$: a second-order **Butterworth** response.
:::

::: proof
Let $A$ be the junction of the resistors. The follower makes $v_+ = v_o$. KCL at the $+$ input (no current into the op-amp): $(V_A - V_o)/R_2 = sC_2V_o$, so $V_A = V_o(1 + sR_2C_2)$ and $V_A - V_o = sR_2C_2V_o$. KCL at $A$: $(V_i - V_A)/R_1 = (V_A - V_o)/R_2 + sC_1(V_A - V_o) = sC_2V_o + s^2R_2C_1C_2V_o$. Hence $V_i = V_A + R_1V_o(sC_2 + s^2R_2C_1C_2) = V_o[1 + s(R_1 + R_2)C_2 + s^2R_1R_2C_1C_2]$, which is [[#eq-sallen-key]]. Comparing with $1/(s^2/\omega_n^2 + s/(Q\omega_n) + 1)$ gives $\omega_n$ and $1/(Q\omega_n) = C_2(R_1 + R_2)$, so $Q = \sqrt{R_1R_2C_1C_2}/[C_2(R_1 + R_2)]$. With equal resistors this is $\sqrt{C_1C_2}/(2C_2) = \tfrac12\sqrt{C_1/C_2}$.
:::

An $n$th-order **Butterworth** filter has the maximally flat magnitude response
$$
\lvert H(f)\rvert = \frac{1}{\sqrt{1 + (f/f_c)^{2n}}},
$$ {#eq-butterworth}
$3\ \mathrm{dB}$ down at $f_c$ for every $n$ and falling at $20n\ \mathrm{dB}$ per decade above it. It is built from cascaded second-order sections with specific $Q$ values (for $n = 4$: $0.541$ and $1.307$). Other designs trade flatness for steepness (Chebyshev, elliptic) or for a clean step response with little overshoot (Bessel, which has nearly constant group delay — preferred when the *shape* of a transient matters, as in control loops).

::: widget plot
title: Butterworth low-pass filters
f: 1/sqrt(1 + x^(2*n)); 1/sqrt(1 + x^2)
x: 0, 5
y: 0, 1.05
sliders: n=2:1:8:1
labels: \text{order } n; \text{first order}
caption: Magnitude of an $n$th-order Butterworth low-pass against frequency normalised by the corner frequency, $f/f_c$, compared with a first-order RC filter. All pass through $0.707$ ($-3\ \mathrm{dB}$) at $f/f_c = 1$; higher orders are flatter below the corner and fall off much faster above it. At $f/f_c = 3$ the first-order filter still passes $32\,\%$, the fourth-order $1.2\,\%$.
:::

## Noise and interference {#sec-noise}

Two kinds of unwanted signal reach a measurement. **Intrinsic noise** is generated in the components: every resistor at absolute temperature $T$ produces **thermal (Johnson) noise** with root-mean-square voltage
$$
v_n = \sqrt{4k_BTRB},
$$ {#eq-johnson}
where $k_B = 1.380649\times10^{-23}\ \mathrm{J/K}$ and $B$ is the bandwidth in hertz; a $1\ \mathrm{k\Omega}$ resistor at $300\ \mathrm{K}$ in a $10\ \mathrm{kHz}$ bandwidth gives $0.41\ \mathrm{\mu V}$ rms. Amplifiers add their own voltage and current noise, and at low frequencies $1/f$ ("flicker") noise rises. Because noise power grows with bandwidth, **the first rule of low-noise measurement is to use no more bandwidth than the signal needs.**

**Interference** is coupled in from outside, and in machines it usually dominates:

- **capacitive (electric-field) coupling** from nearby high-voltage conductors — motor cables switched at hundreds of volts in tens of nanoseconds — is reduced by a grounded **shield**, earthed at one end for low-frequency signals;
- **inductive (magnetic) coupling** from currents in nearby conductors is reduced by keeping the signal loop area small: **twisted pairs**, and routing signal cables away from power cables and crossing them at right angles;
- **ground loops**: when the sensor and the instrument are grounded at different points, the voltage drop along the ground conductor between them (from motor and supply currents) adds to the signal. Differential inputs (the instrumentation amplifier), single-point grounding and galvanic isolation break the loop ([[mechatronics/system-integration]]).

Over long distances in factories, analogue signals are sent as a **4–20 mA current loop**: the transmitter sets a current, which is the same everywhere in the series loop regardless of wire resistance, and is converted back to a voltage across a precision resistor at the receiver. The live zero ($4\ \mathrm{mA}$) distinguishes a zero reading from a broken wire ($0\ \mathrm{mA}$).

## Analogue-to-digital conversion {#sec-adc}

::: definition Resolution and quantisation of an ADC {#def-adc}
An $N$-bit **analogue-to-digital converter** (ADC) with full-scale range $V_{FS}$ maps its input to one of $2^N$ integer codes. The code width — the **least significant bit** — is
$$
Q = \frac{V_{FS}}{2^N}.
$$ {#eq-lsb}
The rounding of the input to a code is the **quantisation error**, which lies within $\pm Q/2$ for an ideal converter. Common architectures: **successive approximation** (SAR; 10–18 bits, up to a few million samples per second; the usual microcontroller ADC), **sigma–delta** (16–24 bits at lower rates, with built-in digital filtering; used for load cells and thermocouples), and **flash/pipelined** converters for very high rates.
:::

::: proposition Quantisation noise and the ideal SNR {#prop-quant-noise}
If the input varies over many codes so that the quantisation error is uniformly distributed on $[-Q/2, Q/2]$, its root-mean-square value is $Q/\sqrt{12}$. For a full-scale sine wave the ratio of signal power to quantisation-noise power of an ideal $N$-bit converter is
$$
\mathrm{SNR} = 6.02N + 1.76\ \mathrm{dB}.
$$ {#eq-snr}
:::

::: proof
For $e$ uniform on $[-Q/2, Q/2]$, the mean square is $\frac1Q\int_{-Q/2}^{Q/2}e^2\,\mathrm{d}e = \frac{1}{Q}\cdot\frac{2}{3}\left(\frac Q2\right)^3 = \frac{Q^2}{12}$. A sine filling the range has amplitude $V_{FS}/2 = 2^NQ/2$ and mean-square value $(2^NQ/2)^2/2 = 2^{2N}Q^2/8$. The power ratio is $(2^{2N}Q^2/8)/(Q^2/12) = 1.5 \times 2^{2N}$, and $10\log_{10}(1.5 \times 2^{2N}) = 20N\log_{10}2 + 10\log_{10}1.5 = 6.02N + 1.76\ \mathrm{dB}$.
:::

Real converters fall short of [[#eq-snr]] because of their own noise and non-linearity; the **effective number of bits** (ENOB) is $N$ recomputed from the measured SNR. A 12-bit microcontroller ADC typically achieves 10 to 11 effective bits. And the ADC's resolution is only useful if the signal fills its range: a $10\ \mathrm{mV}$ bridge signal applied directly to a $3.3\ \mathrm{V}$ 12-bit converter would use only $12$ codes.

::: example Resolution of the load-cell chain {#ex-resolution}
The load-cell signal of [[#ex-load-cell-chain]] ($2.51\ \mathrm{V}$ at $500\ \mathrm{N}$) is read by a 12-bit ADC with a $4.096\ \mathrm{V}$ reference. Find the LSB, the force per LSB, the rms quantisation noise in newtons, and the ideal SNR.
::: solution
$Q = 4.096/4096 = 1.000\ \mathrm{mV}$. Force sensitivity at the ADC: $2.51\ \mathrm{V}/500\ \mathrm{N} = 5.02\ \mathrm{mV/N}$, so one LSB is $1.000/5.02 = 0.199\ \mathrm{N}$, and the rms quantisation noise $0.199/\sqrt{12} = 0.058\ \mathrm{N}$. Referred to the bridge, one LSB is $1\ \mathrm{mV}/251 = 3.98\ \mathrm{\mu V}$. Ideal SNR for a full-scale sine: $6.02 \times 12 + 1.76 = 74.0\ \mathrm{dB}$.

Sanity check: $500\ \mathrm{N}/0.199\ \mathrm{N} \approx 2500$ steps, not $4096$, because the signal uses only $2.51/4.096 = 61\,\%$ of the range. The amplifier noise referred to the input (typically $10$–$20\ \mathrm{nV/\sqrt{Hz}}$, i.e. well under a microvolt in a $100\ \mathrm{Hz}$ bandwidth) is below one LSB, so this chain is limited by the converter; a 24-bit sigma–delta converter, as used in commercial weighing electronics, removes that limit.
:::
:::

### Sampling and aliasing

::: theorem Sampling theorem {#thm-sampling}
A signal containing no frequency components at or above $f_s/2$ is completely determined by its samples taken at rate $f_s$. A sinusoid of frequency $f$ above $f_s/2$ produces exactly the same samples as one at the **alias frequency**
$$
f_a = \lvert f - kf_s\rvert,\qquad k \text{ the integer that makes } f_a \le f_s/2 .
$$ {#eq-alias}
:::

::: proof
We prove the aliasing statement, which is what matters in practice; the reconstruction half (Whittaker–Shannon interpolation) is proved in signal-processing texts ([Maths Atlas](/learn/maths/)). Samples of $\cos(2\pi ft + \phi)$ at $t_n = n/f_s$ are $\cos(2\pi fn/f_s + \phi)$. Replacing $f$ by $f - kf_s$ changes the argument by $2\pi kn$, an integer multiple of $2\pi$, so the samples are unchanged. Replacing $f$ by $-f$ and $\phi$ by $-\phi$ leaves the cosine unchanged too. Hence frequencies $f$, $\lvert f - kf_s\rvert$ and $kf_s - f$ for every integer $k$ are indistinguishable after sampling, and exactly one of them lies in $[0, f_s/2]$. Two sinusoids with distinct frequencies in $[0, f_s/2)$ give different sample sequences, which is why that band, and only that band, can be represented unambiguously.
:::

The frequency $f_s/2$ is the **Nyquist frequency**. Aliasing cannot be undone after sampling: the aliased component sits in the signal band, indistinguishable from real signal. It must be prevented *before* the ADC by an analogue **anti-aliasing filter** that attenuates everything above $f_s/2$ to below the resolution of the converter.

::: widget plot
title: Aliasing
f: sin(2*pi*9*x); -sin(2*pi*x)
x: 0, 1
y: -1.2, 1.2
points: 0, 0; 0.1, -0.5878; 0.2, -0.9511; 0.3, -0.9511; 0.4, -0.5878; 0.5, 0; 0.6, 0.5878; 0.7, 0.9511; 0.8, 0.9511; 0.9, 0.5878; 1, 0
labels: 9\ \text{Hz signal}; 1\ \text{Hz alias}
caption: A $9\ \mathrm{Hz}$ sine sampled at $f_s = 10\ \mathrm{Hz}$ (the dots, against time in s). The samples lie exactly on a $1\ \mathrm{Hz}$ sine of opposite sign: $f_a = \lvert 9 - 10\rvert = 1\ \mathrm{Hz}$. From the samples alone, nothing distinguishes the fast signal from the slow one — which is why the filtering must happen before the converter.
:::

::: example Specifying an anti-aliasing filter {#ex-antialias}
Vibration signals up to $100\ \mathrm{Hz}$ are sampled at $1\ \mathrm{kHz}$ by a 12-bit ADC. Interference anywhere above the Nyquist frequency could be as large as full scale. Which components alias into the $0$–$100\ \mathrm{Hz}$ band, and what Butterworth filter with $f_c = 100\ \mathrm{Hz}$ keeps them below one LSB? What changes if the signal is sampled at $10\ \mathrm{kHz}$ and filtered digitally?
::: solution
By [[#eq-alias]] the frequencies that fold into $0$–$100\ \mathrm{Hz}$ are those within $100\ \mathrm{Hz}$ of a multiple of $f_s$: $900$–$1100\ \mathrm{Hz}$, $1900$–$2100\ \mathrm{Hz}$, and so on. The lowest is $900\ \mathrm{Hz} = 9f_c$. One LSB in 12 bits is $1/4096$ of full scale, $-72.2\ \mathrm{dB}$. From [[#eq-butterworth]] at $f/f_c = 9$: order 1 gives $-19.1\ \mathrm{dB}$, order 2 $-38.2\ \mathrm{dB}$, order 4 $-76.3\ \mathrm{dB}$. A fourth-order filter is needed.

With $10\ \mathrm{kHz}$ sampling, the first aliasing band starts at $9900\ \mathrm{Hz} = 99f_c$, where a second-order filter already gives $-79.8\ \mathrm{dB}$. A simple analogue filter suffices, and a sharp digital low-pass in the processor (followed by keeping every tenth sample if a $1\ \mathrm{kHz}$ rate is wanted) does the rest. This **oversampling** strategy is why sigma–delta converters, which sample at very high rates internally, need only trivial analogue filters.

Sanity check: the $-3\ \mathrm{dB}$ point at $100\ \mathrm{Hz}$ means the filter also attenuates the top of the signal band by $29\,\%$; if amplitudes near $100\ \mathrm{Hz}$ matter, $f_c$ must be placed higher, and the filter order raised again — another argument for oversampling.
:::
:::

::: warning Aliasing of PWM ripple and mains hum
A classic mechatronic failure: a motor current or position signal carries ripple at the drive's PWM frequency, say $20\ \mathrm{kHz}$, and is sampled at $1\ \mathrm{kHz}$ with no anti-aliasing filter. Since $20\ \mathrm{kHz}$ is an exact multiple of $f_s$, the ripple aliases to $0\ \mathrm{Hz}$ — a constant offset that depends on the phase between PWM and sampling, and that changes when either clock drifts, appearing as a slow wander. If the PWM is at $20.05\ \mathrm{kHz}$ instead, the alias is a convincing $50\ \mathrm{Hz}$ oscillation. The cures are an analogue filter, or synchronising the sampling to the PWM so that every sample is taken at the same point in the PWM cycle (as motor drives do). Similarly, $50$ or $60\ \mathrm{Hz}$ mains interference should be removed before sampling, or the sampling window made an integer number of mains periods, which is why integrating converters often use $20\ \mathrm{ms}$ or $100\ \mathrm{ms}$ integration times.
:::

::: quiz
A signal is sampled at $f_s = 1000\ \mathrm{Hz}$. At what frequency does a $1300\ \mathrm{Hz}$ interference component appear in the sampled data?
- [ ] $1300\ \mathrm{Hz}$
- [ ] $700\ \mathrm{Hz}$
- [x] $300\ \mathrm{Hz}$
- [ ] It is removed by the sampling
::: solution
By [[#eq-alias]] with $k = 1$: $\lvert 1300 - 1000\rvert = 300\ \mathrm{Hz}$, which lies below the Nyquist frequency of $500\ \mathrm{Hz}$. $700\ \mathrm{Hz}$ is a valid alias too ($2000 - 1300$) but lies above $500\ \mathrm{Hz}$, so in the sampled data, which only represents $0$–$500\ \mathrm{Hz}$, it appears as $1000 - 700 = 300\ \mathrm{Hz}$.
:::
:::

::: history
The bridge circuit was described by Samuel Hunter Christie in 1833 and popularised by Charles Wheatstone in his Bakerian lecture of 1843, for comparing resistances. The term *operational amplifier* comes from a 1947 paper by John R. Ragazzini, Robert H. Randall and Frederick A. Russell on electronic analogue computers, whose amplifiers performed mathematical operations — addition, integration — by feedback; the integrated op-amp followed in the 1960s with Robert Widlar's designs at Fairchild (the μA709, 1965), and the μA741 of 1968 became the standard general-purpose part. Stephen Butterworth published the maximally flat filter in 1930, and R. P. Sallen and E. L. Key their active-filter circuits in 1955. Harry Nyquist's 1928 analysis of telegraph signalling and Claude Shannon's 1949 paper *Communication in the presence of noise* established the sampling theorem as engineers use it; E. T. Whittaker (1915) and V. A. Kotelnikov (1933) had reached equivalent results independently.
:::

::: summary
- With negative feedback, an ideal op-amp draws no input current and holds $v_+ = v_-$. Inverting gain $-R_f/R_{\text{in}}$; non-inverting $1 + R_f/R_g$; difference $R_2/R_1$.
- The instrumentation amplifier, gain $1 + 2R/R_G$, combines high input resistance, adjustable gain and high CMRR — the standard bridge front end.
- Bridge output $\approx (V_s/4)\sum \pm\Delta R_i/R$: adjacent arms subtract, opposite arms add. Quarter bridge $V_sGF\varepsilon/4$, full bridge $V_sGF\varepsilon$, temperature-compensated and linear.
- Butterworth filters fall $20n\ \mathrm{dB}$ per decade above $f_c$; the unity-gain Sallen–Key section with $C_1 = 2C_2$ is a second-order Butterworth.
- Thermal noise $\sqrt{4k_BTRB}$ grows with bandwidth; interference is fought with shielding, twisted pairs, differential inputs, single-point grounding and current loops.
- ADC: $Q = V_{FS}/2^N$, quantisation noise $Q/\sqrt{12}$, ideal SNR $6.02N + 1.76\ \mathrm{dB}$; scale the signal to fill the range.
- Frequencies above $f_s/2$ alias to $\lvert f - kf_s\rvert$ and cannot be removed afterwards: filter before sampling, or oversample.
:::

## Exercises

::: exercise Non-inverting gain {level=1 check="100"}
A non-inverting amplifier has $R_f = 99\ \mathrm{k\Omega}$ and $R_g = 1.0\ \mathrm{k\Omega}$. Find its gain. (Enter the gain.)
::: solution
$1 + R_f/R_g = 1 + 99 = 100$.
:::
:::

::: exercise Inverting amplifier output {level=1 check="-0.825"}
An inverting amplifier has $R_{\text{in}} = 10\ \mathrm{k\Omega}$ and $R_f = 33\ \mathrm{k\Omega}$, and an input of $0.25\ \mathrm{V}$. Find the output. (Enter $v_o$ in V.)
::: solution
$v_o = -(33/10) \times 0.25 = -0.825\ \mathrm{V}$. The source sees an input resistance of only $10\ \mathrm{k\Omega}$, which matters for high-impedance sensors.
:::
:::

::: exercise Choosing the gain resistor {level=1 check="500"}
An instrumentation amplifier has internal resistors $R = 25\ \mathrm{k\Omega}$. Find $R_G$ for a gain of $101$. (Enter $R_G$ in Ω.)
::: solution
$R_G = 2R/(G - 1) = 50\,000/100 = 500\ \mathrm{\Omega}$.
:::
:::

::: exercise Quarter-bridge output {level=1 check="5"}
A quarter bridge with a gauge of $GF = 2.0$ is excited at $10\ \mathrm{V}$ and the gauge is strained to $1000\ \mu\varepsilon$. Use the linearised formula to find the output, and state the size of the non-linearity error. (Enter $V_o$ in mV.)
::: solution
$V_o \approx V_sGF\varepsilon/4 = 10 \times 2.0 \times 10^{-3}/4 = 5.0\ \mathrm{mV}$. The exact value is $V_sx/(4 + 2x)$ with $x = 2\times10^{-3}$, i.e. $4.995\ \mathrm{mV}$: a relative error of $x/2 = 0.1\,\%$.
:::
:::

::: exercise A bipolar ADC {level=2 check="0.3125"}
A 16-bit ADC has an input range of $\pm 10.24\ \mathrm{V}$. Find its LSB. (Enter $Q$ in mV.)
::: solution
$V_{FS} = 20.48\ \mathrm{V}$; $Q = 20.48/65\,536 = 3.125\times10^{-4}\ \mathrm{V} = 0.3125\ \mathrm{mV}$.
:::
:::

::: exercise Alias frequency {level=2 check="300"}
Vibration at $2.3\ \mathrm{kHz}$ reaches an ADC sampling at $1\ \mathrm{kHz}$ without filtering. At what frequency does it appear? (Enter $f_a$ in Hz.)
::: solution
$\lvert 2300 - 2 \times 1000\rvert = 300\ \mathrm{Hz}$, below the Nyquist frequency of $500\ \mathrm{Hz}$.
:::
:::

::: exercise Butterworth attenuation {level=2 check="1/17"}
Find the power ratio $\lvert H\rvert^2$ of a second-order Butterworth low-pass at twice its corner frequency. (Enter the exact ratio.)
::: solution
$\lvert H\rvert^2 = 1/(1 + 2^4) = 1/17$, i.e. $-12.3\ \mathrm{dB}$; the amplitude ratio is $1/\sqrt{17} = 0.243$.
:::
:::

::: exercise Ideal SNR {level=2 check="98.08"}
Using [[#eq-snr]], find the ideal SNR of a 16-bit converter for a full-scale sine. (Enter it in dB.)
::: solution
$6.02 \times 16 + 1.76 = 98.08\ \mathrm{dB}$. Real 16-bit SAR converters achieve about $90$–$95\ \mathrm{dB}$.
:::
:::

::: exercise Sallen–Key design {level=2 check="2"}
Design a unity-gain Sallen–Key Butterworth low-pass with $f_c = 1\ \mathrm{kHz}$ using $R_1 = R_2 = 10\ \mathrm{k\Omega}$. Find $C_2$ and $C_1$ and show that $C_1/C_2$ is the required ratio. (Enter $C_1/C_2$.)
::: solution
For a Butterworth response $C_1 = 2C_2$, so $\omega_n = 1/(R\sqrt{2}\,C_2)$. With $\omega_n = 2\pi \times 1000\ \mathrm{rad/s}$: $C_2 = 1/(\sqrt2 R\omega_n) = 1/(1.414 \times 10^4 \times 6283) = 11.3\ \mathrm{nF}$ and $C_1 = 22.5\ \mathrm{nF}$. In practice one picks $C_2 = 10\ \mathrm{nF}$, $C_1 = 22\ \mathrm{nF}$ and adjusts the resistors: with $C_1/C_2 = 2.2$, $Q = \tfrac12\sqrt{2.2} = 0.742$, a little peaking, acceptable for most uses.
:::
:::

::: exercise Measurement chain for a torque transducer {level=3}
A rotating shaft carries a strain-gauge full bridge measuring torque up to $200\ \mathrm{N\,m}$ (rated output $1.5\ \mathrm{mV/V}$). The signal is needed at $1\ \mathrm{kHz}$ bandwidth in a test rig with a $15\ \mathrm{kW}$ inverter-fed motor nearby. Propose the complete chain — excitation, transmission off the rotating shaft, amplification, filtering, conversion, grounding and shielding — and estimate the gain and the ADC resolution needed for $0.1\ \mathrm{N\,m}$.
::: solution
A good answer includes: (i) Excitation $5$–$10\ \mathrm{V}$ (say $5\ \mathrm{V}$: full scale $7.5\ \mathrm{mV}$); ratiometric conversion. (ii) Off the shaft: slip rings are noisy and wear; modern designs put the amplifier and ADC on the shaft and transmit digitally by inductive or radio telemetry, with inductive power supply. (iii) Gain about $300$ for $\sim 2.25\ \mathrm{V}$ full scale from an instrumentation amplifier close to the bridge. (iv) $0.1\ \mathrm{N\,m}$ in $200\ \mathrm{N\,m}$ is 1 part in 2000; with margin for noise and offsets a 14–16-bit converter (ENOB $\ge 12$) is appropriate. (v) Anti-aliasing: sample at $10$–$20\ \mathrm{kHz}$ with a second- to fourth-order analogue filter near $2$–$5\ \mathrm{kHz}$ and digital filtering to $1\ \mathrm{kHz}$; synchronise or filter well away from the inverter's switching frequency and its harmonics. (vi) Shielded twisted-pair cables, separated from the motor cables, shields grounded at the instrument end, a single star ground point, and isolated interfaces to the PC. (vii) Calibration with a lever and known weights, and a shunt-calibration resistor to check the chain.
:::
:::
