A kitchen scale and a $50\,\mathrm{t}$ weighbridge use the same sensor: a steel or aluminium element carrying four strain gauges. At full load each gauge changes its resistance by about a tenth of a per cent. Measured directly, $350\,\Omega$ becoming $350.35\,\Omega$ is a small change on a large number, and drifts of the ohmmeter, the leads or the excitation would swamp it. Wired as a bridge, the four gauges produce *zero* volts at zero load and about $2\,\mathrm{mV}$ per volt of excitation at full load — a load cell's "rated output" of $2\,\mathrm{mV/V}$ — so the signal is the deviation itself, proportional to the excitation, and the large constant part has been subtracted away before any amplifier sees it.

That subtraction is the essence of **signal conditioning**: the set of operations that turn a sensor's raw electrical response into a clean voltage of the right size, bandwidth and linearity for an analog-to-digital converter. This chapter starts with the Wheatstone bridge — its balance, its output and output resistance, its non-linearity and the quarter-, half- and full-bridge arrangements of strain gauges — and with how resistive sensors are excited and wired so that excitation and lead errors cancel. Then it treats AC bridges for impedances, and the AC excitation and synchronous demodulation used for inductive and capacitive sensors and for any measurement buried in noise. It ends with amplification, filtering and linearisation, and a complete design of a load-cell channel. The circuit tools — dividers, Thévenin equivalents, superposition — are those of [[circuits-1/network-theorems]]; the sensors are those of [[instrumentation/sensors-transducers]]. The Mechanical Atlas treats the bridge more briefly in [signal conditioning](/learn/mechanical/lesson.php?c=mechatronics&l=signal-conditioning).

## The Wheatstone bridge {#sec-wheatstone}

Four resistors form a loop: $R_1$ from node A to node C, $R_2$ from C to node B, $R_3$ from A to node D and $R_4$ from D to B. An excitation voltage $V_{ex}$ is applied between A (positive) and B, and the output $v_o = v_D - v_C$ is taken between the midpoints C and D. Each side is a voltage divider, so

$$
v_C = V_{ex}\frac{R_2}{R_1 + R_2}, \qquad v_D = V_{ex}\frac{R_4}{R_3 + R_4}.
$$

::: theorem Bridge output, balance and output resistance {#thm-bridge}
The open-circuit output of the Wheatstone bridge is

$$
v_o = V_{ex}\left(\frac{R_4}{R_3 + R_4} - \frac{R_2}{R_1 + R_2}\right) = V_{ex}\,\frac{R_1R_4 - R_2R_3}{(R_1 + R_2)(R_3 + R_4)} .
$$ {#eq-bridge}

The bridge is **balanced** ($v_o = 0$) if and only if $R_1R_4 = R_2R_3$, equivalently $R_1/R_2 = R_3/R_4$, independently of $V_{ex}$. Its Thévenin (output) resistance, seen between C and D with the excitation source replaced by a short circuit, is

$$
R_o = (R_1\parallel R_2) + (R_3\parallel R_4).
$$ {#eq-bridge-ro}
:::

::: proof
Subtracting the two divider voltages and putting them over a common denominator gives $V_{ex}[R_4(R_1 + R_2) - R_2(R_3 + R_4)]/[(R_1 + R_2)(R_3 + R_4)]$; the terms $R_2R_4$ cancel, leaving [[#eq-bridge]]. The numerator vanishes exactly when $R_1R_4 = R_2R_3$, and $V_{ex}$ is a common factor. For the output resistance, an ideal voltage source set to zero is a short circuit, so A and B are joined; then $R_1$ and $R_2$ are in parallel between C and the joined node, and $R_3$ and $R_4$ in parallel between D and the same node, and the two parallel pairs are in series between C and D.
:::

The balance condition is the historical use of the bridge: with three known resistors, one of them adjustable, a sensitive galvanometer between C and D indicates when $R_x = R_2R_3/R_1$, and the result does not depend on the source voltage or on the calibration of the detector, which only has to recognise zero. This **null method** is why bridges were the standard of precision resistance measurement for a century, and why modern resistance-ratio bridges still reach parts in $10^9$.

### The deflection bridge

For sensors we use the bridge unbalanced: start from balance with all arms equal to $R$, and let the sensor arms change. Write each arm as $R_i = R(1 + x_i)$ with fractional changes $x_i$ (for a strain gauge, $x = G\varepsilon$). Substituting into [[#eq-bridge]] and keeping only first-order terms,

$$
\frac{v_o}{V_{ex}} \approx \frac14\left(x_1 - x_2 - x_3 + x_4\right).
$$ {#eq-bridge-lin}

Adjacent arms (those that share a midpoint, 1 and 2, or 3 and 4) subtract; opposite arms (1 and 4, or 2 and 3) add. This simple rule — derived in [[#exr-four-arm]] — decides where gauges go.

::: proposition Quarter, half and full bridges {#prop-configs}
With arm resistance $R$ and fractional change $x$:

- **Quarter bridge** (one active arm, $R_4 = R(1 + x)$): $\dfrac{v_o}{V_{ex}} = \dfrac{x}{4}\cdot\dfrac{1}{1 + x/2}$, non-linear;
- **Half bridge** (two adjacent arms changing oppositely, $R_4 = R(1 + x)$, $R_3 = R(1 - x)$): $\dfrac{v_o}{V_{ex}} = \dfrac{x}{2}$, exactly linear;
- **Full bridge** (all four arms active, $R_1 = R_4 = R(1 + x)$, $R_2 = R_3 = R(1 - x)$): $\dfrac{v_o}{V_{ex}} = x$, exactly linear.
:::

::: proof
Quarter: [[#eq-bridge]] with $R_1 = R_2 = R_3 = R$ gives $\dfrac{R\cdot R(1 + x) - R^2}{2R\cdot R(2 + x)} = \dfrac{x}{2(2 + x)} = \dfrac{x}{4(1 + x/2)}$. Half: the right divider gives $R(1 + x)/(2R) = (1 + x)/2$ exactly because the sum $R_3 + R_4 = 2R$ is constant, and the left gives $1/2$, so $v_o/V_{ex} = x/2$. Full: the right divider gives $(1 + x)/2$, the left $(1 - x)/2$, and the difference is $x$.
:::

::: widget plot
f: x/4/(1 + x/2); x/4; x/2; x
x: -0.5, 0.5
y: -0.5, 0.5
labels: \text{quarter bridge}; \text{quarter, linear approx.}; \text{half bridge}; \text{full bridge}
caption: Normalised bridge output $v_o/V_{ex}$ against the fractional resistance change $x$. The quarter bridge (blue) bends away from its tangent $x/4$ (orange) because the current in the active arm changes with $x$; half and full bridges are straight lines with twice and four times the sensitivity. For strain gauges $x$ is about $0.002$, far to the left of the visible curvature, but thermistors and some potentiometric sensors reach $x \sim 1$. Hover to read off the non-linearity at a given $x$.
:::

For a strain gauge the quarter-bridge non-linearity is small but not negligible in precision work: the relative error is $1/(1 + x/2) - 1 \approx -x/2$, i.e. $-0.1\,\%$ at $x = 0.002$ ($1000\,\mu\varepsilon$ with $G = 2$). Half and full bridges are not only linear but self-compensating: if all gauges sit at the same temperature and change by the same thermal $x_T$, the terms cancel in [[#eq-bridge-lin]].

::: example A strain-gauge quarter bridge {#ex-quarter}
A $350\,\Omega$ gauge with $G = 2.0$ forms a quarter bridge with three $350\,\Omega$ precision resistors and $5\,\mathrm{V}$ excitation. Find the output at $1000\,\mu\varepsilon$, the non-linearity error, the output resistance and the power dissipated in the gauge. What apparent strain does a $1\,\mathrm{K}$ temperature rise of the gauge cause if its uncompensated temperature coefficient of resistance relative to the specimen is $10\,\mathrm{ppm/K}$?
::: solution
$x = G\varepsilon = 0.002$. By [[#prop-configs]], $v_o = 5\times0.002/4\times1/(1.001) = 2.4975\,\mathrm{mV}$, against $2.5000\,\mathrm{mV}$ from the linear approximation: an error of $-0.1\,\%$, or $-1\,\mu\varepsilon$ at this strain. By [[#eq-bridge-ro]], $R_o = 175 + 175 = 350\,\Omega$. The gauge carries $V_{ex}/(2R) = 7.14\,\mathrm{mA}$ and dissipates $I^2R = 17.9\,\mathrm{mW}$, acceptable for a gauge bonded to steel but too much on plastic or thin aluminium. A $1\,\mathrm{K}$ rise gives $x_T = 10^{-5}$, indistinguishable from a strain of $x_T/G = 5\,\mu\varepsilon$. That is why a dummy gauge on an unstrained piece of the same material, in arm 3 (adjacent to the active gauge), is used when only one active gauge is possible.
:::
:::

::: quiz
On a cantilever beam in bending, a gauge on the top surface sees $+\varepsilon$ and an identical gauge on the bottom surface sees $-\varepsilon$. Where should the two gauges go in the bridge to maximise output and cancel temperature effects?
- [ ] In opposite arms (1 and 4)
- [x] In adjacent arms (3 and 4)
- [ ] It does not matter
- [ ] In series in one arm
::: solution
By [[#eq-bridge-lin]], adjacent arms subtract: $x_4 - x_3 = G\varepsilon - (-G\varepsilon) = 2G\varepsilon$, doubling the output, while a common thermal change $x_T$ in both gives $x_T - x_T = 0$. In opposite arms the strain contributions would cancel ($G\varepsilon + (-G\varepsilon)$) and the thermal ones add — the worst possible choice. (Opposite arms are right for two gauges with the *same* strain, such as two gauges on the tension side of a column.)
:::
:::

## Excitation and wiring {#sec-excitation}

### Ratiometric measurement

Every output in [[#prop-configs]] is proportional to $V_{ex}$. A $0.1\,\%$ drift of the excitation therefore looks like a $0.1\,\%$ change of strain. The cure is not a better reference but a **ratiometric** measurement: feed the excitation voltage, or a fixed fraction of it, to the ADC as its reference. The ADC computes $v_o/V_{\text{ref}}$, and since both are proportional to $V_{ex}$, the excitation cancels — exactly as the common gain error cancelled in the ratio measurement of [[instrumentation/measurement-uncertainty#ex-ratio]]. Load-cell amplifiers and most sensor-interface ADCs (with a "REF" input tied to the excitation) work this way.

### Constant-current excitation

Driving a quarter bridge, or a single RTD, with a current source has two benefits. A current source $I$ through a single sensor gives $v = IR(1 + x)$, exactly linear in $x$, and a current-driven quarter bridge has a non-linearity of about $-x/4$ instead of $-x/2$ (see [[#exr-current]]). More importantly, a current source makes the measurement insensitive to the resistance of the leads that carry it.

### Lead-wire resistance

A sensor at the end of a cable adds the resistance of its leads to its own. For a Pt100 at $10\,\mathrm{m}$ through $0.5\,\mathrm{mm^2}$ copper, each lead has $r = \rho l/A = 1.72\times10^{-8}\times10/(0.5\times10^{-6}) = 0.344\,\Omega$. Three wiring schemes are used.

- **Two-wire**: the meter sees $R_t + 2r$. The error is $2r/(0.385\,\Omega/\mathrm{K}) = 1.8\,\mathrm{K}$, and it changes with the cable's own temperature. Acceptable only for high-resistance sensors (Pt1000, thermistors) or very short leads.
- **Three-wire**: in a bridge, one lead is placed in the sensor's arm and the second in the adjacent arm, so their resistances subtract by [[#eq-bridge-lin]]; the third lead carries the output to the detector, which draws no current. The compensation is exact at balance and good near it.
- **Four-wire** (Kelvin): two leads carry a known current, two others sense the voltage at the sensor's terminals with a high-impedance amplifier. No current flows in the sense leads, so their resistance does not matter at all. This is the standard for precision RTDs and for low resistances generally ([[instrumentation/test-instruments]]).

::: example Two- and three-wire RTD errors {#ex-three-wire}
A Pt100 at $100\,^\circ\mathrm{C}$ ($R_t = 138.51\,\Omega$) is connected through leads of $r = 0.344\,\Omega$ each. Find the indicated temperature (a) in two-wire connection to an ohmmeter, and (b) in a three-wire connection to a bridge with $R_1 = R_2 = R_3 = 100\,\Omega$, the sensor in arm 4, one lead in arm 4, one in arm 3, and the bridge output converted to resistance assuming no leads.
::: solution
(a) The ohmmeter reads $138.51 + 0.69 = 139.19\,\Omega$, which by the Callendar–Van Dusen equation is $101.81\,^\circ\mathrm{C}$: an error of $+1.81\,\mathrm{K}$.

(b) The right divider is $\dfrac{R_t + r}{(R_t + r) + (R_3 + r)} = \dfrac{138.849}{239.193} = 0.580\,49$. A lead-free bridge would give this ratio for $R_{\text{app}}/(R_{\text{app}} + 100) = 0.580\,49$, i.e. $R_{\text{app}} = 138.37\,\Omega$, which is $99.65\,^\circ\mathrm{C}$: an error of $-0.35\,\mathrm{K}$, five times smaller than two-wire, and zero at balance ($0\,^\circ\mathrm{C}$ here). The residual error grows with the imbalance; four-wire measurement removes it entirely.
:::
:::

::: warning Self-heating, thermal EMFs and excitation level
More excitation means more signal but also more self-heating (proportional to $V_{ex}^2$). Typical limits are $2$–$10\,\mathrm{V}$ for foil gauges on metal and $0.1$–$1\,\mathrm{mA}$ for RTDs. With DC excitation, thermoelectric EMFs of a few microvolts at connections add directly to millivolt bridge outputs. Two remedies: reverse the excitation and average the two readings (the thermal EMF does not reverse, so it cancels in $(v_+ - v_-)/2$), or use AC excitation with synchronous demodulation, as below.
:::

## AC bridges {#sec-ac-bridges}

Replace the four resistors by impedances $\mathbf{Z}_1$ to $\mathbf{Z}_4$ and excite the bridge with a sinusoid. The algebra of [[#thm-bridge]] carries over to phasors unchanged.

::: theorem AC bridge balance {#thm-ac-balance}
An AC bridge with arm impedances $\mathbf{Z}_1, \dots, \mathbf{Z}_4$, arranged as in [[#sec-wheatstone]], is balanced if and only if

$$
\mathbf{Z}_1\mathbf{Z}_4 = \mathbf{Z}_2\mathbf{Z}_3,
$$ {#eq-ac-balance}

which is two real conditions: $\lvert\mathbf{Z}_1\rvert\lvert\mathbf{Z}_4\rvert = \lvert\mathbf{Z}_2\rvert\lvert\mathbf{Z}_3\rvert$ and $\angle\mathbf{Z}_1 + \angle\mathbf{Z}_4 = \angle\mathbf{Z}_2 + \angle\mathbf{Z}_3$ (equivalently, real and imaginary parts).
:::

::: proof
The derivation of [[#eq-bridge]] used only Ohm's law and the divider rule, which hold for phasors with impedances in place of resistances ([[circuits-2/ac-analysis]]). So $\mathbf{V}_o = \mathbf{V}_{ex}(\mathbf{Z}_1\mathbf{Z}_4 - \mathbf{Z}_2\mathbf{Z}_3)/[(\mathbf{Z}_1 + \mathbf{Z}_2)(\mathbf{Z}_3 + \mathbf{Z}_4)]$, which vanishes exactly when [[#eq-ac-balance]] holds. A complex equation is equivalent to two real ones.
:::

Because there are two conditions, an AC bridge needs two adjustments, and the art of AC bridge design is to make them independent, so that each knob affects only one condition.

::: proposition Maxwell–Wien bridge {#prop-maxwell}
Let arm 1 be the unknown inductor, modelled as $L_x$ in series with $R_x$; arms 2 and 3 resistors $R_2$ and $R_3$; and arm 4 a resistor $R_4$ in parallel with a capacitor $C_4$, of admittance $\mathbf{Y}_4 = 1/R_4 + j\omega C_4$. At balance,

$$
L_x = R_2R_3C_4, \qquad R_x = \frac{R_2R_3}{R_4},
$$ {#eq-maxwell}

both independent of frequency.
:::

::: proof
From [[#eq-ac-balance]], $\mathbf{Z}_1 = \mathbf{Z}_2\mathbf{Z}_3/\mathbf{Z}_4 = R_2R_3\mathbf{Y}_4 = R_2R_3/R_4 + j\omega R_2R_3C_4$. Equating with $R_x + j\omega L_x$, real part to real part and imaginary to imaginary, gives [[#eq-maxwell]]. $C_4$ sets the inductance balance and $R_4$ the resistance balance independently.
:::

The Maxwell bridge measures an inductor against a capacitor, which is easier to make accurately and without losses. Its relatives follow the same pattern: the **Schering bridge** measures a capacitor and its dissipation factor (high-voltage cable and insulator testing); the **Wien bridge** has a balance frequency $\omega_0 = 1/\sqrt{R_aR_bC_aC_b}$ and becomes the frequency-selective network of the Wien-bridge oscillator ([[electronics-2/oscillators]]); and **transformer ratio-arm bridges**, in which two arms are the halves of a precision centre-tapped transformer, are the basis of capacitance standards and of capacitive displacement sensors, because the ratio of turns is extraordinarily stable.

::: example A Maxwell bridge measurement {#ex-maxwell}
A Maxwell bridge with $R_2 = R_3 = 1.000\,\mathrm{k\Omega}$ balances at $1\,\mathrm{kHz}$ with $C_4 = 10.0\,\mathrm{nF}$ and $R_4 = 100\,\mathrm{k\Omega}$. Find $L_x$, $R_x$ and the quality factor of the coil at $1\,\mathrm{kHz}$.
::: solution
By [[#eq-maxwell]], $L_x = 10^3\times10^3\times10^{-8} = 10.0\,\mathrm{mH}$ and $R_x = 10^6/10^5 = 10.0\,\Omega$. The quality factor is $Q = \omega L_x/R_x = 2\pi\times10^3\times0.01/10 = 6.28$. The bridge also shows its limitation: a high-$Q$ coil needs $R_4 = R_2R_3/R_x$ very large; for $Q > 10$ the Hay bridge, with $R_4$ and $C_4$ in series, is preferred.
:::
:::

## AC excitation and synchronous demodulation {#sec-demod}

Inductive sensors (LVDTs), capacitive sensors and AC bridges deliver their information as the amplitude and phase of a carrier at the excitation frequency $\omega_0$. Even resistive bridges benefit from AC excitation: amplifier offset, $1/f$ noise and thermal EMFs live at DC and low frequency, and a carrier of a few kilohertz moves the signal away from them. The circuit that recovers the measurand is the **synchronous** (phase-sensitive) **demodulator**, the heart of the **lock-in amplifier**.

::: theorem Synchronous demodulation {#thm-lockin}
Let the input be $v(t) = A\cos(\omega_0t + \phi) + n(t)$ and multiply it by a reference $\cos(\omega_0t)$ derived from the excitation. After an ideal low-pass filter of bandwidth $B \ll \omega_0/2\pi$, the output is

$$
\bar v = \frac{A}{2}\cos\phi,
$$ {#eq-lockin}

plus the contribution of the components of $n(t)$ that lie within $\pm B$ of $\omega_0/2\pi$. A second channel with reference $\sin(\omega_0t)$ gives $-\tfrac{A}{2}\sin\phi$, so amplitude and phase can both be recovered. With a square-wave reference of values $\pm1$ (a switching demodulator), the output is $(2A/\pi)\cos\phi$, but odd harmonics of $\omega_0$ in $n(t)$ are also demodulated.
:::

::: proof
$A\cos(\omega_0t + \phi)\cos\omega_0t = \tfrac{A}{2}\cos\phi + \tfrac{A}{2}\cos(2\omega_0t + \phi)$; the low-pass filter removes the term at $2\omega_0$. A noise component $\cos\omega t$ becomes $\tfrac12[\cos(\omega - \omega_0)t + \cos(\omega + \omega_0)t]$, which passes the filter only if $\lvert\omega - \omega_0\rvert < 2\pi B$. For the quadrature channel, $\cos(\omega_0t + \phi)\sin\omega_0t = \tfrac12[\sin(2\omega_0t + \phi) - \sin\phi]$. The square wave has Fourier series $\frac4\pi\big(\cos\omega_0t - \frac13\cos3\omega_0t + \dots\big)$ ([[signals-systems/fourier-series]]); its fundamental gives $\frac4\pi\cdot\frac A2\cos\phi$, and each harmonic $k\omega_0$ demodulates noise near $k\omega_0$.
:::

::: widget plot
f: cos(2*pi*x + p)*cos(2*pi*x); 0.5*cos(p) + 0*x; cos(2*pi*x + p)
x: 0, 3
y: -1.2, 1.2
sliders: p=0:0:3.1416:0.01
labels: v(t)\cos\omega_0t; \tfrac12\cos\phi; v(t)
caption: Synchronous demodulation over three carrier periods. The signal (green) is multiplied by the reference; the product (blue) oscillates at twice the carrier around its mean $\tfrac12\cos\phi$ (orange), which the low-pass filter extracts. Slide the phase $\phi$: at $\phi = 0$ the product is always positive, at $\phi = \pi/2$ its mean is zero (the quadrature channel would then carry the signal), and at $\phi = \pi$ it is negative — the sign tells an LVDT which side of centre its core is on.
:::

The benefit is a dramatic narrowing of the bandwidth. A lock-in with a $1\,\mathrm{Hz}$ output filter is a band-pass filter $2\,\mathrm{Hz}$ wide centred on the carrier, which tracks the carrier exactly because the reference is the excitation itself; no fixed analog filter could be that narrow and that well tuned.

::: example Rejecting mains interference with AC excitation {#ex-lockin}
A bridge excited at $1\,\mathrm{kHz}$ produces a $10\,\mathrm{\mu V}$ amplitude signal, contaminated by $1\,\mathrm{mV}$ of $50\,\mathrm{Hz}$ pickup. After multiplication, the demodulator output passes through a second-order low-pass filter with a $1\,\mathrm{Hz}$ cut-off. How large is the residual interference, relative to the signal?
::: solution
After multiplication the signal gives $5\,\mathrm{\mu V}$ at DC (with $\phi = 0$). The interference becomes $0.5\,\mathrm{mV}$ at $950\,\mathrm{Hz}$ and $1050\,\mathrm{Hz}$. A second-order low-pass attenuates by about $(f/f_c)^2$ well above cut-off: $950^2 \approx 9\times10^5$, i.e. $119\,\mathrm{dB}$. The residual is $0.5\,\mathrm{mV}/9\times10^5 = 0.55\,\mathrm{nV}$ of ripple at $950\,\mathrm{Hz}$, about $10^{-4}$ of the signal. With DC excitation and the same filter, the $50\,\mathrm{Hz}$ pickup would be attenuated only by $50^2 = 2500$ ($68\,\mathrm{dB}$) to $0.4\,\mathrm{\mu V}$, $8\,\%$ of the signal — and the DC measurement would also carry the amplifier offset and thermal EMFs.
:::
:::

::: quiz
An LVDT is excited at $5\,\mathrm{kHz}$ and its output is demodulated with a square-wave reference. The environment contains strong interference at $15\,\mathrm{kHz}$ from a switching power supply. What happens?
- [ ] Nothing: the demodulator only responds near $5\,\mathrm{kHz}$
- [x] The interference is demodulated by the reference's third harmonic and appears in the output, attenuated by only a factor of three
- [ ] The interference doubles the output
- [ ] The low-pass filter removes it because $15\,\mathrm{kHz}$ is far above its cut-off
::: solution
A square-wave reference contains $\frac{4}{\pi}\cdot\frac13\cos3\omega_0t$, so any component near $3\omega_0 = 15\,\mathrm{kHz}$ is shifted to near DC with a third of the weight of the fundamental and passes the low-pass filter. Either filter the signal before the demodulator (a band-pass around $5\,\mathrm{kHz}$) or use a sinusoidal (multiplying or digital) reference.
:::
:::

## Amplification, filtering and linearisation {#sec-conditioning}

After the bridge or sensor comes the chain: amplify, filter, possibly linearise, then digitise.

**Amplification** raises the signal to fill a good part of the ADC input range, so that the converter's quantisation and noise are small compared with the signal. Because bridge outputs are differential and sit on a common-mode voltage of $V_{ex}/2$, the amplifier must be an instrumentation amplifier with high common-mode rejection, treated in [[instrumentation/instrumentation-amplifiers]]. The gain is set by the full-scale signal and the ADC range: $G = \alpha V_{\text{ADC,FS}}/v_{o,\text{FS}}$ with $\alpha \approx 0.8$ to leave headroom for overload and offsets.

**Filtering** limits the bandwidth to what the measurand needs. A weighing system needs a few hertz, a vibration channel kilohertz. Every hertz of unnecessary bandwidth admits noise (whose power grows with bandwidth, [[electronics-2/electronic-noise]]) and interference, and above half the sampling rate it admits aliases ([[instrumentation/data-acquisition]]). Low-pass filters before the ADC, and sometimes a notch at the mains frequency, are standard; their design is that of [[electronics-2/active-filters]].

**Linearisation** corrects a non-linear sensor characteristic. Three approaches are used.

- *By the circuit*: half and full bridges; constant-current excitation; a fixed resistor in parallel with a thermistor; feedback that keeps a bridge at balance (a servo bridge, or a constant-temperature hot-wire anemometer).
- *Analog function circuits*: piecewise-linear diode networks, log amplifiers; now rare.
- *In software*: after digitising, invert the characteristic with a polynomial, a look-up table with interpolation, or the exact inverse (the quadratic solution of the Callendar–Van Dusen equation in [[instrumentation/sensors-transducers#ex-rtd]]; the Steinhart–Hart equation for a thermistor). This is the usual method today, but it needs enough ADC resolution where the characteristic is flat.

The thermistor is the classic case for circuit linearisation. Put a fixed resistor $R$ in series with the thermistor $R_T$ across $V_{ex}$, and take the output across $R$: $v = V_{ex}R/(R + R_T)$. Rising temperature lowers $R_T$ and raises $v$, and a well-chosen $R$ makes $v(T)$ nearly straight around a chosen temperature.

::: proposition Optimum linearising resistor for a thermistor {#prop-thermistor-lin}
For a thermistor obeying the β model, the divider output $v = V_{ex}R/(R + R_T)$ (equivalently, the parallel combination $R\parallel R_T$) has an inflection point at the absolute temperature $T_m$ — so that it is linear to second order there — if

$$
R = R_T(T_m)\,\frac{\beta - 2T_m}{\beta + 2T_m}.
$$ {#eq-thermistor-lin}
:::

::: proof
Write $g = 1/R_T \propto e^{-\beta/T}$, so $g' = g\beta/T^2$ and $g'' = g\beta(\beta - 2T)/T^4$ (primes are derivatives with respect to $T$). The voltage across the thermistor is $V_{ex}R_T/(R + R_T) = V_{ex}(R\parallel R_T)/R$, so $v$ and $R\parallel R_T$ are linear functions of each other and have inflection points at the same temperature. The parallel combination is $1/G$ with $G = 1/R + g$, and $\dfrac{\dd^2}{\dd T^2}\dfrac1G = \dfrac{2g'^2 - Gg''}{G^3}$. This vanishes when $Gg'' = 2g'^2$, i.e. $G\beta(\beta - 2T)/T^4 = 2g\beta^2/T^4$, so $G = 2g\beta/(\beta - 2T)$ and $1/R = G - g = g(\beta + 2T)/(\beta - 2T)$, which is [[#eq-thermistor-lin]].
:::

::: widget plot
f: 1/(1 + 10*exp(3950*(1/(x + 273.15) - 1/298.15))/R); 1/(1 + 10*exp(3950*(1/273.15 - 1/298.15))/R) + (1/(1 + 10*exp(3950*(1/323.15 - 1/298.15))/R) - 1/(1 + 10*exp(3950*(1/273.15 - 1/298.15))/R))*x/50
x: -10, 60
y: 0, 1
sliders: R=7.38:1:30:0.01
labels: v/V_{ex}; \text{end-point line, } 0\text{–}50\,^\circ\mathrm{C}
caption: Output of a thermistor divider ($10\,\mathrm{k\Omega}$ at $25\,^\circ\mathrm{C}$, $\beta = 3950\,\mathrm{K}$) against temperature, for a series resistor $R$ in kilohms (slider), with the straight line through the outputs at $0$ and $50\,^\circ\mathrm{C}$. The optimum of [[#eq-thermistor-lin]], $R = 7.38\,\mathrm{k\Omega}$, makes the curve hug the line: the maximum deviation is about $1.1\,^\circ\mathrm{C}$-equivalent. Try $R = 20\,\mathrm{k\Omega}$ and watch the bow grow to about $6\,^\circ\mathrm{C}$.
:::

::: example Linearising a thermistor for 0–50 °C {#ex-linearise}
Choose the series resistor for a $10\,\mathrm{k\Omega}$, $\beta = 3950\,\mathrm{K}$ thermistor to be used from $0$ to $50\,^\circ\mathrm{C}$, and find the output span and the non-linearity with $V_{ex} = 3.3\,\mathrm{V}$.
::: solution
Centre the inflection at $T_m = 25\,^\circ\mathrm{C} = 298.15\,\mathrm{K}$, where $R_T = 10\,\mathrm{k\Omega}$: by [[#eq-thermistor-lin]], $R = 10\times(3950 - 596.3)/(3950 + 596.3) = 7.38\,\mathrm{k\Omega}$; use the E96 value $7.32\,\mathrm{k\Omega}$ or $7.50\,\mathrm{k\Omega}$. With $R_T(0) = 33.62\,\mathrm{k\Omega}$ and $R_T(50) = 3.588\,\mathrm{k\Omega}$, the output goes from $v/V_{ex} = 7.38/(7.38 + 33.62) = 0.180$ to $7.38/(7.38 + 3.588) = 0.673$, i.e. from $0.594$ to $2.220\,\mathrm{V}$: a span of $1.63\,\mathrm{V}$, about $32.5\,\mathrm{mV/K}$ on average. A numerical scan shows the largest deviation from the end-point line to be $2.2\,\%$ of span, about $1.1\,^\circ\mathrm{C}$. That is good enough for a thermostat; for $0.1\,^\circ\mathrm{C}$ the residual is removed in software, but now from a nearly linear signal with uniform resolution.
:::
:::

## Design and practice: a load-cell channel {#sec-design}

::: example Designing a weighing channel {#ex-loadcell}
A $50\,\mathrm{kg}$ platform scale uses a $350\,\Omega$ full-bridge load cell with a rated output of $2.0\,\mathrm{mV/V}$. The display must resolve $5\,\mathrm{g}$. Choose the excitation, the amplifier gain for a differential ADC input range of $\pm2.5\,\mathrm{V}$, the required ADC resolution, and the wiring. Estimate the excitation power and the noise budget if the amplifier's input-referred noise is $10\,\mathrm{nV/\sqrt{Hz}}$ and the bandwidth is $10\,\mathrm{Hz}$.
::: solution
*Excitation.* Take $V_{ex} = 5\,\mathrm{V}$, shared with the ADC reference so the measurement is ratiometric. Full-scale output: $2.0\,\mathrm{mV/V}\times5\,\mathrm{V} = 10\,\mathrm{mV}$. Bridge current $5/350 = 14.3\,\mathrm{mA}$, power $71\,\mathrm{mW}$ — fine for a load cell, but a battery-powered scale would pulse the excitation.

*Gain.* Fill $80\,\%$ of $2.5\,\mathrm{V}$: $G = 2.0/0.010 = 200$.

*Resolution.* $5\,\mathrm{g}$ in $50\,\mathrm{kg}$ is $1$ part in $10\,000$, so $1\,\mathrm{\mu V}$ at the bridge output. For the ADC, the $5\,\mathrm{g}$ step is $200\,\mathrm{\mu V}$ at its input, against an LSB of $5\,\mathrm{V}/2^N$; requiring the step to be at least $10$ LSB (so quantisation is negligible and averaging works) gives $2^N \ge 5/20\times10^{-6} = 250\,000$, i.e. $N \ge 18$. A $24$-bit sigma–delta converter, the standard choice, gives a comfortable margin; many such converters include the gain-of-$128$ amplifier, in which case $G = 128$ and the signal uses $51\,\%$ of the range.

*Noise.* $10\,\mathrm{nV/\sqrt{Hz}}\times\sqrt{10\,\mathrm{Hz}} = 32\,\mathrm{nV}$ RMS, plus the bridge's thermal noise, $\sqrt{4kTR_o B} = \sqrt{4\times1.38\times10^{-23}\times300\times350\times10} = 7.6\,\mathrm{nV}$ RMS. Both are well below $1\,\mathrm{\mu V}$, so a $5\,\mathrm{g}$ resolution is noise-limited only at the level of the amplifier's $1/f$ noise and drift — which is why such ADCs use chopping.

*Wiring.* Use a six-wire connection: excitation $\pm$, sense $\pm$ (taken to the ADC reference input, so the voltage *at the cell* is the reference and lead drops cancel), and signal $\pm$, in a shielded, twisted cable. Over the temperature range, the cell's zero and span drift (data-sheet values of order $0.002\,\%$ FS per kelvin) and creep set the real accuracy, and the scale is calibrated with test masses.
:::
:::

::: application Integrated bridge front ends
As of 2026, a single sensor-interface chip typically integrates everything in this design: excitation switches (for AC or reversed excitation to cancel thermal EMFs), a chopper-stabilised programmable-gain amplifier with offsets of a few nanovolts, a $24$-bit sigma–delta ADC with ratiometric reference inputs, digital filters with simultaneous $50$ and $60\,\mathrm{Hz}$ rejection, and current sources for RTDs with matched outputs for three-wire compensation. The engineer's work moves from circuit design to configuration and to the error budget — and to wiring, which no chip can fix.
:::

## Where this leads

The bridge output is a small differential voltage on a large common-mode voltage, and extracting it accurately in the presence of ground differences and interference is the subject of [[instrumentation/instrumentation-amplifiers]]. The filtered, amplified signal is then sampled and quantised in [[instrumentation/data-acquisition]], where the anti-aliasing filter and converter resolution are chosen with the same budget thinking as [[#ex-loadcell]]. Lock-in detection reappears in [[communication-systems]] as coherent demodulation, and noise bandwidth and the optimal choice of filter in [[random-signals/optimal-filtering]].

::: history
Samuel Hunter Christie described the bridge circuit in 1833, and Charles Wheatstone made it famous in his Bakerian Lecture to the Royal Society in 1843, crediting Christie; the name stuck to Wheatstone anyway. James Clerk Maxwell described the inductance bridge in his *Treatise on Electricity and Magnetism* (1873); Max Wien published his frequency-dependent bridge in 1891, and Harald Schering his high-voltage capacitance bridge in 1920. Alan Blumlein's transformer ratio-arm bridges at Standard Telephones and Cables in the 1920s made precise impedance comparison routine. The lock-in amplifier grew out of the phase-sensitive detection used in radio and physics in the 1930s and 1940s; Robert Dicke's radiometer work in the 1940s made the technique famous, and commercial lock-in amplifiers appeared in the early 1960s.
:::

::: summary
- The Wheatstone bridge output is $V_{ex}(R_1R_4 - R_2R_3)/[(R_1 + R_2)(R_3 + R_4)]$; balance $R_1R_4 = R_2R_3$ is independent of the excitation; output resistance $(R_1\parallel R_2) + (R_3\parallel R_4)$.
- Near balance $v_o/V_{ex} \approx \tfrac14(x_1 - x_2 - x_3 + x_4)$: adjacent arms subtract, opposite arms add.
- Quarter bridges are non-linear ($x/4\cdot1/(1 + x/2)$); half ($x/2$) and full ($x$) bridges are linear and cancel common thermal changes.
- Ratiometric measurement cancels excitation errors; four-wire (and three-wire bridge) connections remove lead resistance; reversed or AC excitation cancels thermal EMFs.
- AC bridges balance when $\mathbf{Z}_1\mathbf{Z}_4 = \mathbf{Z}_2\mathbf{Z}_3$ — two real conditions; the Maxwell bridge gives $L_x = R_2R_3C_4$, $R_x = R_2R_3/R_4$.
- Synchronous demodulation gives $\tfrac{A}{2}\cos\phi$ and rejects everything outside a narrow band around the carrier.
- A series resistor $R = R_T(T_m)(\beta - 2T_m)/(\beta + 2T_m)$ linearises a thermistor divider about $T_m$; the rest of the linearisation is done in software.
:::

## Exercises

::: exercise Bridge output {level=1 check="5*(120.24/240.24-0.5)"}
A quarter bridge of $120\,\Omega$ arms with $5\,\mathrm{V}$ excitation has its active gauge at $120.24\,\Omega$. Find the exact output in volts.
::: solution
$v_o = 5\,(120.24/240.24 - 0.5) = 5\times0.000\,4995 = 2.4975\,\mathrm{mV}$.
:::
:::

::: exercise Output resistance {level=1 check="(1000*2000/3000)+(1000*2000/3000)"}
A bridge has $R_1 = R_3 = 1\,\mathrm{k\Omega}$ and $R_2 = R_4 = 2\,\mathrm{k\Omega}$. Find its output resistance in ohms.
::: solution
$R_o = (1\parallel2) + (1\parallel2) = 0.667 + 0.667 = 1.333\,\mathrm{k\Omega}$.
:::
:::

::: exercise Rated output {level=1 check="0.0015*10*0.6"}
A load cell has a rated output of $1.5\,\mathrm{mV/V}$ at its $100\,\mathrm{kg}$ capacity and is excited at $10\,\mathrm{V}$. What output voltage, in volts, corresponds to $60\,\mathrm{kg}$?
::: solution
Full scale $1.5\times10 = 15\,\mathrm{mV}$; at $60\,\%$ of capacity, $9.0\,\mathrm{mV}$.
:::
:::

::: exercise Four arms {#exr-four-arm level=2}
Derive [[#eq-bridge-lin]] from [[#eq-bridge]] by substituting $R_i = R(1 + x_i)$ and keeping first-order terms. Then use it to explain why gauges on the tension and compression sides of a beam go in adjacent arms.
::: solution
Numerator: $R^2[(1 + x_1)(1 + x_4) - (1 + x_2)(1 + x_3)] \approx R^2(x_1 + x_4 - x_2 - x_3)$. Denominator: $R^2(2 + x_1 + x_2)(2 + x_3 + x_4) \approx 4R^2$. Hence $v_o/V_{ex} \approx \frac14(x_1 - x_2 - x_3 + x_4)$. Tension ($+x$) and compression ($-x$) gauges in adjacent arms 3 and 4 give $x_4 - x_3 = 2x$; common thermal changes cancel. See the quiz in [[#sec-wheatstone]].
:::
:::

::: exercise Current-driven quarter bridge {#exr-current level=2}
A quarter bridge with arms $R$ (one active, $R(1 + x)$) is driven by a constant current $I$ into node A and out of node B. Show that $v_o = \dfrac{IRx}{4}\cdot\dfrac{1}{1 + x/4}$ and compare its non-linearity with voltage drive.
::: hint
The current divides between the two sides in inverse proportion to their resistances, $2R$ and $R(2 + x)$.
:::
::: solution
The side with the active arm has resistance $R(2 + x)$, the other $2R$. The current in the active side is $I\cdot2R/(2R + R(2 + x)) = 2I/(4 + x)$, giving a midpoint voltage (relative to B) of $2IR(1 + x)/(4 + x)$; the other side carries $I(2 + x)/(4 + x)$ and its midpoint is at $IR(2 + x)/(4 + x)$. The difference is $IR[2 + 2x - 2 - x]/(4 + x) = IRx/(4 + x) = \frac{IRx}{4}\cdot\frac{1}{1 + x/4}$. The relative non-linearity is $-x/4$, half that of voltage drive ($-x/2$).
:::
:::

::: exercise A Schering bridge {level=2}
In a Schering bridge, arm 1 is the unknown capacitor, modelled as $C_x$ in series with $R_x$; arm 2 is a lossless standard capacitor $C_2$; arm 3 is a resistor $R_3$; arm 4 is $R_4$ in parallel with $C_4$. Using $\mathbf{Z}_1 = \mathbf{Z}_2\mathbf{Z}_3/\mathbf{Z}_4$, find $C_x$, $R_x$ and the dissipation factor $D = \omega C_xR_x$ at balance.
::: solution
$\mathbf{Z}_1 = \dfrac{R_3}{j\omega C_2}\left(\dfrac{1}{R_4} + j\omega C_4\right) = \dfrac{R_3C_4}{C_2} + \dfrac{R_3}{j\omega C_2R_4}$. Comparing with $R_x + 1/(j\omega C_x)$: $R_x = R_3C_4/C_2$ and $C_x = C_2R_4/R_3$. Then $D = \omega C_xR_x = \omega R_4C_4$. The capacitance balance uses $R_4$ (or $R_3$) and the loss balance $C_4$; the high voltage appears only across $C_x$ and $C_2$, so the adjustable low-voltage arms are safe to touch, which is why the bridge is used to test insulation at kilovolts.
:::
:::

::: exercise Lock-in phase error {level=2 check="1-cos(10*pi/180)"}
A synchronous demodulator's reference is $10^\circ$ out of phase with the signal it is meant to measure (which is in phase with the excitation). By what fraction is the output reduced?
::: solution
The output is proportional to $\cos\phi$, so it is reduced by $1 - \cos10^\circ = 1.52\,\%$. A dual-phase lock-in avoids the error by computing $\sqrt{X^2 + Y^2}$.
:::
:::

::: exercise Thermal EMF cancellation {level=3}
A DC-excited bridge has a true output of $k V_{ex}$, plus a thermal EMF $e_t = 3\,\mathrm{\mu V}$ and an amplifier offset $V_{OS} = 20\,\mathrm{\mu V}$ in series with the output. Show that reversing the excitation ($\pm V_{ex}$) and computing $(v_+ - v_-)/2$ removes both. Why does a reversal every $10\,\mathrm{ms}$ also reduce the amplifier's $1/f$ noise, and what limits the cancellation in practice?
::: solution
$v_+ = kV_{ex} + e_t + V_{OS}$ and $v_- = -kV_{ex} + e_t + V_{OS}$, so $(v_+ - v_-)/2 = kV_{ex}$ exactly: everything that does not reverse with the excitation cancels. Reversing at $50\,\mathrm{Hz}$ (every $10\,\mathrm{ms}$) is a square-wave modulation; the subtraction is a square-wave synchronous demodulation, so slowly varying errors (offset drift, $1/f$ noise below a few hertz) appear only as a difference between successive half-periods and are suppressed, like the chopper amplifiers of [[instrumentation/instrumentation-amplifiers]]. In practice the cancellation is limited by the settling of the bridge and amplifier after each reversal (which must be blanked), by thermal EMFs that change when the current reverses (the Peltier effect at junctions), and by interference correlated with the switching.
:::
:::

::: exercise Thermistor linearisation range {level=3}
(a) Show that for the β model the optimum resistor [[#eq-thermistor-lin]] is positive only if $\beta > 2T_m$, and interpret. (b) For $\beta = 3500\,\mathrm{K}$ and $T_m = 25\,^\circ\mathrm{C}$ find $R/R_T(T_m)$. (c) At the inflection point, the slope of the divider output is $\dfrac{\dd}{\dd T}\dfrac{v}{V_{ex}}$. Show that it equals $\dfrac{\beta}{T_m^2}\cdot\dfrac{RR_T}{(R + R_T)^2}$ and evaluate it for (b).
::: solution
(a) $R > 0$ requires $\beta - 2T_m > 0$. For $\beta < 2T_m$ the curve $R_T(T)$ itself has no inflection that a parallel resistor can move into the range; physically, the thermistor is too insensitive at that temperature. For all real NTCs ($\beta \ge 2500\,\mathrm{K}$) and temperatures below about $1000\,\mathrm{K}$ this holds.

(b) $R/R_T = (3500 - 596.3)/(3500 + 596.3) = 2903.7/4096.3 = 0.709$.

(c) $v/V_{ex} = R/(R + R_T)$, so $\dfrac{\dd}{\dd T}\dfrac{v}{V_{ex}} = -\dfrac{R}{(R + R_T)^2}\dfrac{\dd R_T}{\dd T} = \dfrac{R}{(R + R_T)^2}\cdot\dfrac{\beta R_T}{T^2}$, using $\dd R_T/\dd T = -\beta R_T/T^2$. With $R = 0.709R_T$: $\dfrac{RR_T}{(R + R_T)^2} = \dfrac{0.709}{1.709^2} = 0.2428$, and $\beta/T_m^2 = 3500/298.15^2 = 0.039\,37\,\mathrm{K^{-1}}$, so the slope is $9.56\times10^{-3}\,\mathrm{K^{-1}}$: about $9.6\,\mathrm{mV/K}$ per volt of excitation.
:::
:::

::: exercise Designing a strain measurement {level=3}
A steel shaft ($E = 200\,\mathrm{GPa}$, $\nu = 0.3$) in pure axial tension carries up to $50\,\mathrm{kN}$ on a cross-section of $500\,\mathrm{mm^2}$. Four $350\,\Omega$ gauges ($G = 2.1$) are available: two can be mounted axially and two circumferentially (seeing $-\nu\varepsilon$). (a) Arrange them in a full bridge and find the output per volt of excitation at full load. (b) With $V_{ex} = 5\,\mathrm{V}$, choose the amplifier gain for a $\pm2.5\,\mathrm{V}$ ADC. (c) Show that the arrangement is insensitive to temperature and to bending.
::: solution
(a) Stress $50\,000/500\times10^{-6} = 100\,\mathrm{MPa}$, axial strain $\varepsilon = 100\times10^6/200\times10^9 = 500\,\mu\varepsilon$, circumferential $-150\,\mu\varepsilon$. Axial gauges in opposite arms 1 and 4 ($x = G\varepsilon = 1.05\times10^{-3}$), circumferential gauges in arms 2 and 3 ($x = -0.315\times10^{-3}$). By [[#eq-bridge-lin]], $v_o/V_{ex} = \frac14(2\times1.05 + 2\times0.315)\times10^{-3} = 0.6825\,\mathrm{mV/V}$ (the factor $\tfrac12(1 + \nu) = 0.65$ of a full bridge with four equal active gauges).

(b) $v_o = 3.41\,\mathrm{mV}$ at full load; for $2.0\,\mathrm{V}$ at the ADC, $G = 2.0/0.003\,41 = 586$; choose $500$ ($1.71\,\mathrm{V}$, leaving headroom for overload).

(c) Temperature: all four gauges change by the same $x_T$, and $\frac14(x_T - x_T - x_T + x_T) = 0$. Bending: mount the two axial gauges on opposite sides of the shaft (and likewise the circumferential pair); bending adds $+x_b$ to one and $-x_b$ to the other gauge of each pair, which are in opposite arms and therefore add: $x_b + (-x_b) = 0$.
:::
:::
