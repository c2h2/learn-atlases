The world that an embedded system controls is analog. A thermostat measures a temperature that varies continuously; a battery charger watches a voltage and a current; a drone's flight controller reads gyroscopes and drives motors whose torque depends on current, not on bits. At the edge of every such system sit two kinds of interface: on the input side, **sensors** and the **analog-to-digital converter** (ADC) that turns their voltages into numbers; on the output side, **actuators** — LEDs, relays, motors, heaters — and the transistor stages, PWM signals and **digital-to-analog converters** (DACs) that drive them.

How converters work inside — successive approximation, sigma-delta, flash, their resolution, linearity and noise — is the subject of [[electronics-2/data-converters]], and the design of signal-conditioning circuits of [[instrumentation/bridges-signal-conditioning]]. This chapter is about using the converters built into a microcontroller well: getting from an ADC code to a physical value, choosing the sampling time so that the reading is accurate, using the reference voltage to cancel errors, averaging to gain resolution, and triggering conversions from timers. The second half turns to the output side: how a $3.3\,\mathrm{V}$ pin that can supply a few milliamperes controls a $12\,\mathrm{V}$ relay, a $2\,\mathrm{A}$ LED strip or a motor without destroying itself. The Mechanical Atlas covers the motors themselves in [Electric motors and drives](/learn/mechanical/lesson.php?c=mechatronics&l=electric-actuators).

## The ADC in a microcontroller

Most microcontrollers contain one or more **successive-approximation** (SAR) ADCs with $10$ to $16$ bits of resolution and conversion rates from about $100\,\mathrm{kS/s}$ to a few $\mathrm{MS/s}$, an input **multiplexer** that selects one of many pins or internal signals (a temperature sensor, the internal reference, the supply voltage), and a sequencer that converts several channels in turn, optionally triggered by a timer and emptied by DMA.

::: definition ADC code and LSB {#def-adc-code}
An ideal $N$-bit unipolar ADC with reference voltage $V_\text{ref}$ maps an input voltage $v$ with $0 \le v < V_\text{ref}$ to the integer **code**

$$
k = \left\lfloor \frac{v}{V_\text{ref}}\,2^N \right\rfloor, \qquad 0 \le k \le 2^N - 1,
$$ {#eq-adc-code}

and inputs at or above $V_\text{ref}$ to the full-scale code $2^N - 1$. One **least significant bit** (LSB) is $V_\text{ref}/2^N$. The best estimate of the input given the code $k$ is the middle of its interval, $(k + \tfrac12)\,V_\text{ref}/2^N$, with a **quantisation error** of at most $\pm\tfrac12$ LSB.
:::

(Real converters place their first transition at $\tfrac12$ LSB rather than $1$ LSB, so that the code is the *rounded* rather than truncated value; data sheets state which. The difference matters only at the level of half an LSB, which is usually below the converter's other errors.)

::: widget plot
f: floor(x/Vr*2^N); x/Vr*2^N - floor(x/Vr*2^N) - 0.5
x: 0, 3.3
y: -1, 16
sliders: N=4:2:8:1; Vr=3.3:1:3.3:0.1
labels: \text{code }k; \text{error (LSB), centred}
caption: Transfer function of an ideal $N$-bit ADC with reference $V_\text{ref}$ (V): the code steps up once per LSB, and the quantisation error relative to the centre of each step is a sawtooth between $-\tfrac12$ and $+\tfrac12$ LSB. With $N = 4$ the steps are $206\,\mathrm{mV}$ wide; at $N = 12$ they would be $0.8\,\mathrm{mV}$, invisible at this scale (the vertical axis is cropped at $16$ codes). Lower $V_\text{ref}$ and watch the steps narrow and the inputs above it saturate.
:::

::: example From code to volts {#ex-adc-volts}
A $12$-bit ADC with $V_\text{ref} = 3.3\,\mathrm{V}$ measures a battery through a divider of $100\,\mathrm{k\Omega}$ (top) and $33\,\mathrm{k\Omega}$ (bottom). The code is $2730$. (a) What is the LSB? (b) What is the battery voltage? (c) What is the largest battery voltage that can be measured?
::: solution
(a) $3.3/4096 = 0.806\,\mathrm{mV}$.

(b) The pin voltage is $(2730 + 0.5)\times 0.806\,\mathrm{mV} = 2.200\,\mathrm{V}$. The divider ratio is $33/(100 + 33) = 0.2481$, so the battery is at $2.200/0.2481 = 8.87\,\mathrm{V}$. In integer firmware one would compute millivolts as `(uint32_t)k * 3300u * 133u / (4096u * 33u)`, ordering the operations so that the intermediate product ($\approx 1.2\times 10^9$) fits in $32$ bits.

(c) Full scale at the pin, $3.3\,\mathrm{V}$, corresponds to $3.3/0.2481 = 13.3\,\mathrm{V}$ at the battery. Each LSB at the pin is $0.806/0.2481 = 3.25\,\mathrm{mV}$ at the battery.

The divider also loads the battery with $133\,\mathrm{k\Omega}$, $67\,\mathrm{\mu A}$ at $8.9\,\mathrm{V}$ — in a product that sleeps at $5\,\mathrm{\mu A}$ this dominates the standby current, which is why battery dividers are often switched off by a transistor between measurements. Its Thévenin resistance of $24.8\,\mathrm{k\Omega}$ also matters for the sampling time, as we see next.
:::
:::

### The sampling capacitor and source impedance

A SAR ADC does not measure its input continuously. During the **sampling** (acquisition) phase, a switch connects the input pin to an internal **sampling capacitor** $C_S$ of a few picofarads; then the switch opens and the converter compares the held charge with a sequence of trial voltages. If the sampling phase is too short for $C_S$ to charge to the input voltage through the source's resistance, the code is wrong — and, worse, depends on what the capacitor held before, typically the previous channel.

::: theorem Minimum sampling time {#thm-sampling-time}
Let a source of Thévenin resistance $R_s$ drive an ADC whose sampling switch has resistance $R_\text{ADC}$ and whose sampling capacitor is $C_S$, and suppose the capacitor starts from a voltage that differs from the input by up to full scale. The capacitor voltage is within $\tfrac12$ LSB of the input at the end of the sampling time $t_s$ if

$$
t_s \ge (R_s + R_\text{ADC})\,C_S\,\ln\!\left(2^{N+1}\right) = (N+1)\ln 2\,(R_s + R_\text{ADC})\,C_S .
$$ {#eq-sampling-time}
:::

::: proof
During sampling the circuit is a series $RC$ with $R = R_s + R_\text{ADC}$, so the difference between the capacitor and input voltages decays as $\Delta(t) = \Delta(0)e^{-t/RC}$ ([[circuits-1/first-order-circuits]]). In the worst case $\abs{\Delta(0)} = V_\text{ref}$. Requiring $V_\text{ref}e^{-t_s/RC} \le \tfrac12 V_\text{ref}/2^N$ gives $e^{t_s/RC} \ge 2^{N+1}$, which is [[#eq-sampling-time]]. (The model ignores the pin's own capacitance and any external capacitor, which can help — see below — and assumes the source itself is not disturbed by the charge it delivers.)
:::

For a $12$-bit converter, $\ln 2^{13} = 9.0$: the sampling time must be at least nine time constants.

::: example Choosing a sampling time {#ex-sampling-time}
A $12$-bit SAR ADC has $C_S = 5\,\mathrm{pF}$ and $R_\text{ADC} = 1\,\mathrm{k\Omega}$, and runs from a $14\,\mathrm{MHz}$ ADC clock. Its sampling time is selectable as $1.5$, $7.5$, $13.5$, $28.5$ … ADC clock cycles, and a conversion takes the sampling time plus $12.5$ cycles. (a) Which setting is needed for a source of $10\,\mathrm{k\Omega}$? (b) What is the conversion rate? (c) What about the $24.8\,\mathrm{k\Omega}$ battery divider of [[#ex-adc-volts]]?
::: solution
(a) By [[#eq-sampling-time]], $t_s \ge 11\,\mathrm{k\Omega}\times 5\,\mathrm{pF}\times 9.01 = 496\,\mathrm{ns}$, which is $496\times 10^{-9}\times 14\times 10^6 = 6.9$ cycles: choose $7.5$ cycles ($536\,\mathrm{ns}$).

(b) $7.5 + 12.5 = 20$ cycles, $1.43\,\mathrm{\mu s}$, $700\,\mathrm{kS/s}$.

(c) $t_s \ge 25.8\,\mathrm{k\Omega}\times 5\,\mathrm{pF}\times 9.01 = 1.16\,\mathrm{\mu s} = 16.3$ cycles: the $28.5$-cycle setting. Alternatively — and better for a high-impedance source — a capacitor of $100\,\mathrm{nF}$ from the pin to ground acts as a charge reservoir: when $C_S$ connects, charge sharing moves the pin by at most $V_\text{ref}\,C_S/(C_S + C_\text{ext}) = 3.3\times 5\,\mathrm{pF}/100\,\mathrm{nF} = 0.17\,\mathrm{mV}$, a fifth of an LSB, so any sampling time works. The price is bandwidth: the divider and the capacitor form a low-pass filter with $\tau = 24.8\,\mathrm{k\Omega}\times 100\,\mathrm{nF} = 2.5\,\mathrm{ms}$, fine for a battery but not for an audio signal.
:::
:::

::: warning The previous channel leaks into the next
When a sequencer converts several channels in turn, the sampling capacitor starts each conversion holding the previous channel's voltage. With too short a sampling time for a high-impedance source, the reading of one channel is pulled towards its neighbour's — "crosstalk" that looks like a sensor fault. Symptoms: a channel's reading changes when another channel's input changes, or a reading depends on the order of conversion. The cure is a longer sampling time, a buffer amplifier, or an external capacitor, as in [[#ex-sampling-time]].
:::

### The reference and ratiometric measurement

Every ADC result is a ratio $v/V_\text{ref}$. An error in the reference therefore appears directly as a gain error in the measurement: a reference that is $1\,\%$ high makes every reading $1\,\%$ low. Small microcontrollers often use their supply voltage as the reference, which may be accurate only to a few percent and noisy. There are two remedies.

The first is an accurate reference: an internal bandgap reference ($\approx 1.2\,\mathrm{V}$, calibrated at the factory, with its calibration value stored in a read-only memory location) or an external reference chip. Measuring the internal reference channel with the supply as $V_\text{ref}$ also gives the supply voltage itself: if the reference $V_\text{int}$ reads $k_\text{int}$, then $V_{DD} = V_\text{int}\,2^N/k_\text{int}$, the standard way for a battery product to measure its own battery.

The second remedy is more elegant: make the sensor's output proportional to the same voltage that the ADC uses as its reference, so that the reference cancels.

::: definition Ratiometric measurement {#def-ratiometric}
A measurement is **ratiometric** when the sensor is excited by the ADC's reference voltage $V_\text{ref}$ and produces an output $v = g(x)\,V_\text{ref}$, where $g$ depends only on the measured quantity $x$. The code $k \approx 2^N g(x)$ is then independent of $V_\text{ref}$ and of its drift and noise.
:::

Potentiometers, resistive dividers with thermistors or light-dependent resistors, and bridge sensors excited from the reference are all ratiometric. A thermistor divider is the classic example.

A **negative-temperature-coefficient** (NTC) thermistor's resistance is well described over a moderate range by the **beta model**

$$
R_T(T) = R_0\,\exp\!\left(B\left(\frac1T - \frac{1}{T_0}\right)\right),
$$ {#eq-beta-model}

with $T$ in kelvin, $R_0$ the resistance at $T_0$ (usually $25\,^\circ\mathrm{C} = 298.15\,\mathrm{K}$) and $B$ a material constant of $3000$–$5000\,\mathrm{K}$. With the thermistor from the ADC input to ground and a fixed resistor $R_f$ from $V_\text{ref}$ to the input, the code is $k = 2^N R_T/(R_T + R_f)$, independent of $V_\text{ref}$.

::: proposition Best series resistor for a thermistor {#prop-thermistor}
For a divider of a fixed resistor $R_f$ and a sensor resistance $R_T$, the sensitivity of the output to a small relative change of $R_T$ is

$$
\frac{\partial v}{\partial \ln R_T} = V_\text{ref}\,\frac{R_f R_T}{(R_f + R_T)^2},
$$ {#eq-divider-sensitivity}

which, for a given $R_T$, is largest when $R_f = R_T$, where it equals $V_\text{ref}/4$. For a thermistor, choose $R_f$ equal to its resistance at the centre of the temperature range of interest.
:::

::: proof
$v = V_\text{ref}R_T/(R_T + R_f)$, so $\partial v/\partial R_T = V_\text{ref}R_f/(R_T + R_f)^2$ and $\partial v/\partial\ln R_T = R_T\,\partial v/\partial R_T$, which is [[#eq-divider-sensitivity]]. As a function of $R_f$ with $R_T$ fixed, write $u = R_f/R_T$: the expression is $V_\text{ref}\,u/(1 + u)^2$, whose derivative $(1 - u)/(1+u)^3$ vanishes at $u = 1$ and changes sign from positive to negative there, so $u = 1$ is the maximum, with value $V_\text{ref}/4$. For a thermistor, $\partial \ln R_T/\partial T = -B/T^2$ by [[#eq-beta-model]], a property of the thermistor alone, so maximising the sensitivity to $\ln R_T$ maximises the sensitivity to temperature.
:::

::: example Reading a thermistor {#ex-thermistor}
A $10\,\mathrm{k\Omega}$ NTC thermistor ($B = 3950\,\mathrm{K}$ at $25\,^\circ\mathrm{C}$) is read with a $10\,\mathrm{k\Omega}$ series resistor and a $12$-bit ratiometric ADC. (a) What code does $25\,^\circ\mathrm{C}$ give? (b) The code is $3000$: what is the temperature? (c) What is the resolution at $25\,^\circ\mathrm{C}$, in kelvin per count?
::: solution
(a) $R_T = R_f$, so $k = 4096/2 = 2048$.

(b) Invert the divider: $R_T = R_f\,k/(2^N - k) = 10\,\mathrm{k\Omega}\times 3000/1096 = 27.37\,\mathrm{k\Omega}$. Invert [[#eq-beta-model]]:

$$
\frac1T = \frac{1}{T_0} + \frac{1}{B}\ln\frac{R_T}{R_0} = \frac{1}{298.15} + \frac{\ln 2.737}{3950} = 3.6088\times 10^{-3}\,\mathrm{K^{-1}},
$$

so $T = 277.1\,\mathrm{K} = 3.9\,^\circ\mathrm{C}$.

(c) At $25\,^\circ\mathrm{C}$, $\partial\ln R_T/\partial T = -B/T^2 = -3950/298.15^2 = -0.0444\,\mathrm{K^{-1}}$, and by [[#eq-divider-sensitivity]] with $R_f = R_T$ the code changes by $2^N\times\tfrac14\times 0.0444 = 45.5$ counts per kelvin, a resolution of $0.022\,\mathrm{K}$ per count. Resolution is not accuracy: a $1\,\%$ thermistor tolerance is about $0.23\,\mathrm{K}$ at this point, ten counts.

In firmware, the logarithm can be computed in floating point on a core with an FPU, or replaced by a lookup table of codes at, say, every $5\,^\circ\mathrm{C}$ with linear interpolation, which needs only integer arithmetic.
:::
:::

::: widget plot
f: 4096*R0*exp(B*(1/(x+273.15) - 1/298.15))/(R0*exp(B*(1/(x+273.15) - 1/298.15)) + Rf)
x: -20, 120
y: 0, 4096
sliders: Rf=10:1:100:1; R0=10:1:100:1; B=3950:3000:5000:50
labels: \text{ADC code}
caption: ADC code of a thermistor divider against temperature (°C), for a thermistor of $R_0$ kΩ at $25\,^\circ\mathrm{C}$ with constant $B$ and a series resistor of $R_f$ kΩ. The curve is steepest — most counts per kelvin — where the thermistor's resistance equals $R_f$. Set $R_f$ to $1$ kΩ and the steep part moves up to around $80\,^\circ\mathrm{C}$; this is how a divider is centred on the temperature range that matters.
:::

## Getting more out of an ADC

### Noise, averaging and oversampling

A real ADC reading fluctuates by a few LSB because of noise from the sensor, the reference, the supply and the converter itself. Averaging $M$ readings reduces the random part of the error.

::: theorem Averaging independent samples {#thm-averaging}
If readings $k_1, \dots, k_M$ are the true value plus independent noise of zero mean and standard deviation $\sigma$, their mean has standard deviation $\sigma/\sqrt{M}$. Consequently, if $\sigma$ is at least about one LSB, averaging $M = 4^p$ samples yields $p$ additional bits of effective resolution, at a sample rate divided by $M$.
:::

::: proof
The variance of a sum of independent random variables is the sum of their variances, so $\Var\!\left(\sum k_i\right) = M\sigma^2$ and $\Var\!\left(\tfrac1M\sum k_i\right) = \sigma^2/M$ (see [Expectation and generating functions](/learn/maths/lesson.php?c=probability&l=expectation)). Each extra bit halves the size of an LSB, so it requires the noise to be halved, which takes four times as many samples: $p$ bits need $\sqrt{M} = 2^p$, $M = 4^p$. The noise must be at least comparable to an LSB, because quantisation of a constant noise-free input gives the same code every time, and averaging identical codes adds nothing: the noise acts as **dither** that spreads the input over neighbouring codes in proportion to its position between them.
:::

To turn a $12$-bit converter into a $14$-bit one this way requires $16$ samples per output; the sum of $16$ $12$-bit codes is a $16$-bit number, which is shifted right by $2$ to give a $14$-bit result. Many microcontroller ADCs do this in hardware ("oversampling ratio" and "shift" settings). Averaging does nothing for **systematic** errors — offset, gain error, nonlinearity, reference error — which must be removed by calibration.

::: widget clt
dist: uniform
n: 16
caption: Each "sample" here is a reading corrupted by uniform noise; the histogram shows the distribution of the average of $n$ readings over many repetitions. The spread shrinks like $1/\sqrt{n}$: with $n = 16$ it is a quarter of the spread of a single reading, worth two extra bits. Try $n = 4$ (one extra bit) and $n = 64$ (three).
:::

### Effective resolution

The data sheet's resolution ($12$ bits) is the number of output bits; the useful resolution is set by noise and distortion. It is expressed by the **effective number of bits**, $\text{ENOB} = (\text{SINAD} - 1.76\,\mathrm{dB})/6.02\,\mathrm{dB}$, where SINAD is the measured signal-to-noise-and-distortion ratio for a full-scale sine wave; the formula inverts the ideal quantiser's $6.02N + 1.76\,\mathrm{dB}$ derived in [[electronics-2/data-converters]]. A $12$-bit microcontroller ADC with a SINAD of $65\,\mathrm{dB}$ has an ENOB of $10.5$ bits. Board design affects it strongly: a separate, filtered analog supply and reference, a solid ground plane, short traces and quiet digital activity during conversions are often worth more than another bit on the data sheet.

### Timing and aliasing

For signals that are processed as sequences — audio, vibration, the current in a motor-control loop — the samples must be **evenly spaced**, because the digital-signal-processing theory of [[signals-systems/sampling]] and [[dsp]] assumes it. Starting conversions from software in a loop gives irregular spacing (jitter); the right way is to let a timer trigger the ADC directly, with the results moved to memory by DMA and an interrupt only once per block. And because sampling folds every frequency above half the sample rate onto a lower one, signals must be limited in bandwidth before the ADC. A simple $RC$ low-pass filter at the pin is the minimum, but a first-order filter attenuates slowly — a filter with its corner at a tenth of the sample rate attenuates the frequency at half the sample rate by only $14\,\mathrm{dB}$ — so serious designs use a higher-order analog filter, or sample much faster than necessary and filter digitally ([[dsp/multirate-processing]]).

::: quiz
A $12$-bit ADC reads a slowly varying sensor. Successive readings are always exactly the same code, $1837$. Averaging $16$ readings will:
- [ ] add two bits of resolution, giving a $14$-bit result
- [x] give exactly $1837$ again, adding no information
- [ ] reduce the error due to the reference tolerance
- [ ] reduce the quantisation error to $\tfrac18$ LSB
::: solution
With no noise there is nothing to average: every reading lies at the same code, and the mean of identical numbers is that number. Oversampling gains resolution only when noise of about an LSB or more spreads the readings over neighbouring codes — which is why some designs deliberately add a small dither signal. No amount of averaging removes systematic errors such as the reference tolerance.
:::
:::

## Digital-to-analog outputs

Many microcontrollers include a $12$-bit DAC, usually a resistor string or a capacitive array, with an optional output buffer. Its output can drive a reference level, generate a waveform (from a table, triggered by a timer, fed by DMA) or set the threshold of an on-chip comparator. The unbuffered output has a high output impedance (several kilohms) and must drive only a high-impedance load; the buffered output can drive a few kilohms but cannot reach exactly $0\,\mathrm{V}$ or $V_\text{ref}$. Where no DAC exists, a filtered PWM output serves for slow signals ([[embedded-systems/timers-interrupts#prop-pwm-ripple]]).

## Driving loads

A GPIO pin can source or sink a few milliamperes at the supply voltage, enough for an indicator LED and a logic input — and nothing else. Anything larger needs a switch: a bipolar transistor, a MOSFET, a dedicated driver chip, or for mains loads a relay or a solid-state relay. The microcontroller then controls only the switch, through a small current or voltage.

### A low-side transistor switch

The simplest driver places an NPN transistor or an N-channel MOSFET between the load and ground, with the load connected to its own supply. The pin turns the transistor fully on (saturated, or in the triode region) or fully off.

::: algorithm Designing a BJT low-side switch {#alg-bjt-switch}
1. Find the load current $I_L = (V_S - V_{CE,sat})/R_L$ (or from the load's data sheet).
2. Take the transistor's minimum current gain $\beta_\text{min}$ at $I_L$ from its data sheet. To guarantee saturation over temperature and part variation, choose a base current with a **forced gain** well below it — typically $\beta_\text{forced} = 10$ to $20$: $I_B = I_L/\beta_\text{forced}$.
3. The base resistor is $R_B = (V_{OH} - V_{BE,sat})/I_B$, with $V_{BE,sat} \approx 0.7$–$0.9\,\mathrm{V}$. Round **down** to a standard value.
4. Check that $I_B$ is within the pin's rating, that the transistor's current and power ratings are met, and add protection for inductive loads.
:::

::: example Driving a relay {#ex-relay}
A $12\,\mathrm{V}$ relay has a coil resistance of $400\,\Omega$ and an inductance of about $0.2\,\mathrm{H}$. It is switched by an NPN transistor ($\beta_\text{min} = 100$, $V_{BE,sat} = 0.7\,\mathrm{V}$, $V_{CE,sat} \approx 0.1\,\mathrm{V}$) from a $3.3\,\mathrm{V}$ microcontroller. (a) Design the base resistor. (b) What happens when the transistor turns off, with no protection? (c) Add a flyback diode and find how long the coil current takes to decay.
::: solution
(a) $I_L \approx 11.9/400 \approx 30\,\mathrm{mA}$. With $\beta_\text{forced} = 10$, $I_B = 3\,\mathrm{mA}$ and $R_B = (3.3 - 0.7)/0.003 = 867\,\Omega$; choose $820\,\Omega$, giving $I_B = 3.2\,\mathrm{mA}$, an acceptable pin current. The transistor then dissipates only $V_{CE,sat}I_L = 3\,\mathrm{mW}$.

(b) An inductor resists a change of current: $v = L\,di/dt$. If the transistor cuts the $30\,\mathrm{mA}$ off in $100\,\mathrm{ns}$, the coil tries to produce $0.2\times 0.03/10^{-7} = 60\,\mathrm{kV}$. In reality the collector voltage rises until the transistor breaks down (at perhaps $40$–$60\,\mathrm{V}$), and the coil's energy, $\tfrac12 LI^2 = 90\,\mathrm{\mu J}$, is dumped into the transistor at every switch-off; it fails sooner or later, and the spike couples noise into everything nearby.

(c) A diode across the coil (cathode to $+12\,\mathrm{V}$) gives the current a path: when the transistor turns off, the current continues through the diode, and the collector rises only to $12\,\mathrm{V}$ plus a diode drop. The current decays with time constant $L/R = 0.2/400 = 0.5\,\mathrm{ms}$, so the relay releases a few milliseconds later than it would otherwise. Where fast release matters, a Zener diode in series with the flyback diode lets the voltage rise to a safe, higher level and absorbs the energy faster.
:::
:::

::: warning Every inductive load needs a current path
Relays, solenoids, motors, and even long cables have inductance. Switching their current off without providing a path for it creates a voltage spike that destroys transistors and resets microcontrollers. Fit a flyback diode (for DC loads switched on one side), a TVS diode or a snubber; H-bridges for motors have diodes across every switch (often the MOSFETs' own body diodes). Equally, check the switch-on current: incandescent lamps draw ten times their rated current when cold, and capacitive loads draw a large inrush current.
:::

### MOSFET switches

For currents above a few hundred milliamperes, or for PWM, an N-channel MOSFET is usually better than a bipolar transistor: it needs no steady gate current, and when fully on it behaves as a small resistance $R_{DS(on)}$, so its loss is $I^2R_{DS(on)}$. The pitfall is the gate voltage. A MOSFET's $R_{DS(on)}$ is specified at a stated $V_{GS}$, often $10\,\mathrm{V}$; at $3.3\,\mathrm{V}$ a standard device may be barely on. A **logic-level** MOSFET is specified at $V_{GS} = 2.5\,\mathrm{V}$ or $4.5\,\mathrm{V}$; the threshold voltage $V_{th}$ is *not* the voltage at which it is fully on ([[electronics-1/mosfet-circuits]]).

When the MOSFET switches fast with PWM, the gate capacitance matters: the gate charge $Q_g$ (typically $5$–$50\,\mathrm{nC}$) must be delivered by the pin, which can supply perhaps $20\,\mathrm{mA}$, so a switching transition takes roughly $Q_g/I_\text{pin}$ — $0.5\,\mathrm{\mu s}$ for $10\,\mathrm{nC}$ — during which the MOSFET carries current and voltage at once and dissipates power. The switching loss is approximately

$$
P_\text{sw} \approx \tfrac12\,V\,I\,(t_r + t_f)\,f_\text{PWM}.
$$ {#eq-switching-loss}

For a $12\,\mathrm{V}$, $2\,\mathrm{A}$ LED strip dimmed at $1\,\mathrm{kHz}$ with $t_r + t_f = 1\,\mathrm{\mu s}$, this is $\tfrac12\times 12\times 2\times 10^{-6}\times 10^3 = 12\,\mathrm{mW}$, negligible next to the conduction loss of a $25\,\mathrm{m\Omega}$ MOSFET ($I^2R = 0.1\,\mathrm{W}$). At $100\,\mathrm{kHz}$ it would be $1.2\,\mathrm{W}$, and a gate-driver chip that supplies amperes of gate current would be needed. Power converters live with exactly this trade-off ([[power-electronics/power-switches]]).

### Motors

A **brushed DC motor** is driven with PWM through a transistor for one direction or an **H-bridge** — four switches, two half bridges — for both, with the PWM duty cycle setting the average voltage and hence the speed. The winding inductance smooths the current if the PWM frequency is high enough ($\gg R/(2\pi L)$), and the dead time and break input of [[embedded-systems/timers-interrupts]] protect the bridge. Integrated H-bridge chips include the gate drivers, current sensing and protection.

A **stepper motor** moves a fixed angle per step, commonly $1.8^\circ$ ($200$ steps per revolution); a driver chip takes step and direction pulses, and with **microstepping** (sinusoidally weighted coil currents) divides each step into, for example, $16$ microsteps. Running at $300$ revolutions per minute ($5$ per second) with $1/16$ microstepping needs $5\times 200\times 16 = 16\,000$ step pulses per second, a natural job for a timer in output-compare mode. Steppers run open-loop, and lose position silently if the load torque exceeds what the motor can deliver.

**Servo** systems close the loop with a sensor. A **quadrature encoder** produces two square waves $90^\circ$ apart; their order gives the direction, and counting every edge of both gives four counts per line. Timers have an **encoder mode** in which the counter follows the encoder in hardware. A $500$-line encoder gives $2000$ counts per revolution; at $3000$ revolutions per minute that is $10^5$ counts per second, and sampling the counter every millisecond measures the speed as $100$ counts per sample, a $1\,\%$ resolution. The control laws for these loops are in [[control-systems/pid-control]] and [[control-systems/digital-control]].

::: application A battery-powered sensor node
A wireless soil-moisture sensor reads a capacitive moisture probe and a thermistor once every ten minutes. Its designer powers the thermistor divider and the probe from a GPIO pin, so that they draw current only during the $1\,\mathrm{ms}$ measurement; uses a ratiometric connection so that the falling battery voltage does not change the readings; measures the battery through the internal reference channel instead of a resistive divider; averages $16$ samples per reading to suppress radio interference; and uses the ADC's hardware oversampler so that the processor can sleep during the conversions. Each choice removes a microampere or a source of error; together they decide whether the battery lasts one year or five ([[embedded-systems/embedded-system-design]]).
:::

::: history
Michael Faraday noticed in 1833 that the resistance of silver sulfide falls as it is heated, the first observation of a negative temperature coefficient in a semiconductor. Practical thermistors made from sintered metal oxides were developed at Bell Telephone Laboratories in the 1930s and 1940s, where Joseph Becker, Carl Green and Gerald Pearson described their properties and uses in a 1946 paper that introduced them to engineers; the beta model of [[#eq-beta-model]] dates from that period. The successive-approximation converter, a binary search performed with a comparator and a DAC, became the standard microcontroller ADC because it is compact, reasonably fast and draws little power; microcontrollers with on-chip ADCs were common by the 1980s, and today's parts integrate several $12$- to $16$-bit converters with hardware oversampling, sequencers and DMA.
:::

## Where this leads

The ADCs, DACs and drivers of this chapter are where firmware meets the physics of the system. The conversion process and its errors are analysed in depth in [[electronics-2/data-converters]], and front-end circuits — instrumentation amplifiers, bridges, filters — in [[instrumentation]]. Evenly sampled ADC data are the input to the filters of [[dsp/fir-filter-design]] and [[dsp/iir-filter-design]] and to the digital controllers of [[control-systems/digital-control]]; motor drives and switch-mode power stages are the domain of [[power-electronics]]. Scheduling the conversions, the processing and the outputs so that every deadline is met is the subject of the next chapter, [[embedded-systems/real-time-systems]].

::: summary
- An $N$-bit ADC returns $k = \lfloor 2^N v/V_\text{ref}\rfloor$; one LSB is $V_\text{ref}/2^N$ and the best estimate of the input is $(k + \tfrac12)$ LSB ([[#def-adc-code]]).
- The sampling capacitor must settle: $t_s \ge (N+1)\ln 2\,(R_s + R_\text{ADC})C_S$ ([[#thm-sampling-time]]); for high-impedance sources use a longer sampling time, a buffer or a reservoir capacitor.
- Reference errors are gain errors; ratiometric connections ([[#def-ratiometric]]) cancel them, and an internal reference channel measures the supply.
- A sensor divider is most sensitive when the fixed resistor equals the sensor resistance at the operating point ([[#prop-thermistor]]); thermistor readings are converted with the beta model or a lookup table.
- Averaging $4^p$ samples with about an LSB of noise gains $p$ bits ([[#thm-averaging]]) but does not remove systematic errors; trigger conversions from timers for even spacing, and filter before sampling.
- Loads beyond a few milliamperes need transistor switches: BJTs with a forced gain of $10$–$20$ ([[#alg-bjt-switch]]), logic-level MOSFETs for larger currents and PWM; every inductive load needs a flyback path.
- Motors are driven by PWM through H-bridges, steppers by step pulses from timers, and servo loops read quadrature encoders with timers in encoder mode.
:::

## Exercises

::: exercise The LSB {level=1 check="2.5/1024"}
What is the size of one LSB, in volts, for a $10$-bit ADC with a $2.5\,\mathrm{V}$ reference?
::: solution
$2.5/2^{10} = 2.44\,\mathrm{mV}$.
:::
:::

::: exercise A code {level=1 check="1241"}
A $12$-bit ADC with $V_\text{ref} = 3.3\,\mathrm{V}$ and the truncating transfer function [[#eq-adc-code]] measures $1.000\,\mathrm{V}$. What code does it return?
::: solution
$1.000/3.3\times 4096 = 1241.2$, so $k = 1241$.
:::
:::

::: exercise Oversampling {level=1 check="64"}
How many samples must be averaged to gain $3$ bits of resolution, assuming sufficient noise? By what factor does the output sample rate fall?
::: solution
$M = 4^3 = 64$; the output rate falls by a factor of $64$.
:::
:::

::: exercise Sampling time {level=2 check="51e3*8e-12*13*ln(2)"}
A $12$-bit ADC with $C_S = 8\,\mathrm{pF}$ and $R_\text{ADC} = 1\,\mathrm{k\Omega}$ samples a source of $50\,\mathrm{k\Omega}$. What is the minimum sampling time, in seconds, by [[#eq-sampling-time]]?
::: solution
$t_s \ge 13\ln 2\times 51\,\mathrm{k\Omega}\times 8\,\mathrm{pF} = 9.01\times 408\,\mathrm{ns} = 3.68\,\mathrm{\mu s}$. That is long; a buffer amplifier or a reservoir capacitor would allow fast conversions.
:::
:::

::: exercise Measuring the supply {level=2 check="1.21*4096/1500"}
A microcontroller uses its supply as the ADC reference. The internal bandgap reference, calibrated at $1.21\,\mathrm{V}$, reads as code $1500$ on the $12$-bit ADC. What is the supply voltage, in volts?
::: solution
$V_{DD} = 1.21\times 4096/1500 = 3.30\,\mathrm{V}$. (The bandgap's own tolerance after calibration, typically a few millivolts, sets the accuracy of this measurement.)
:::
:::

::: exercise A thermistor at 0 °C {level=2}
For the divider of [[#ex-thermistor]], find the code at $0\,^\circ\mathrm{C}$ and at $50\,^\circ\mathrm{C}$, and compare the resolution in kelvin per count at these temperatures with that at $25\,^\circ\mathrm{C}$. Which series resistor would maximise the resolution at $0\,^\circ\mathrm{C}$?
::: solution
At $0\,^\circ\mathrm{C}$: $R_T = 10\,\mathrm{k\Omega}\exp(3950(1/273.15 - 1/298.15)) = 33.6\,\mathrm{k\Omega}$, code $4096\times 33.6/43.6 = 3157$. At $50\,^\circ\mathrm{C}$: $R_T = 3.59\,\mathrm{k\Omega}$, code $4096\times 3.59/13.59 = 1082$. By [[#eq-divider-sensitivity]] the sensitivity in counts per kelvin is $2^N\,(B/T^2)\,R_fR_T/(R_f + R_T)^2$: at $0\,^\circ\mathrm{C}$, $4096\times 0.0529\times 0.177 = 38.4$ counts/K; at $50\,^\circ\mathrm{C}$, $4096\times 0.0378\times 0.194 = 30.1$ counts/K; at $25\,^\circ\mathrm{C}$, $45.5$ counts/K. To maximise the resolution at $0\,^\circ\mathrm{C}$, choose $R_f = 33.6\,\mathrm{k\Omega}$ (standard value $33\,\mathrm{k\Omega}$), giving $4096\times 0.0529/4 = 54$ counts/K there.
:::
:::

::: exercise A MOSFET for an LED strip {level=2}
A $12\,\mathrm{V}$ LED strip draws $3\,\mathrm{A}$ and is dimmed by PWM at $2\,\mathrm{kHz}$ through a logic-level MOSFET with $R_{DS(on)} = 20\,\mathrm{m\Omega}$ at $V_{GS} = 3.3\,\mathrm{V}$, driven directly from a GPIO pin. The switching transitions take $0.8\,\mathrm{\mu s}$ each. Estimate the conduction and switching losses at $100\,\%$ and $50\,\%$ duty cycle. Is a heat sink needed?
::: solution
Conduction at $100\,\%$: $3^2\times 0.02 = 0.18\,\mathrm{W}$; at $50\,\%$: $0.09\,\mathrm{W}$. Switching, by [[#eq-switching-loss]]: $\tfrac12\times 12\times 3\times 1.6\times 10^{-6}\times 2000 = 58\,\mathrm{mW}$, present at any duty cycle between $0$ and $100\,\%$ exclusive. The total stays below about $0.25\,\mathrm{W}$, which a small surface-mount package on a modest copper area can dissipate without a heat sink. (Check the data sheet's junction-to-ambient thermal resistance: at $60\,\mathrm{K/W}$, $0.25\,\mathrm{W}$ is a $15\,\mathrm{K}$ rise.)
:::
:::

::: exercise A charge reservoir {level=3}
A high-impedance sensor ($R_s = 200\,\mathrm{k\Omega}$) is read by a $12$-bit ADC with $C_S = 5\,\mathrm{pF}$. (a) What external capacitor at the pin keeps the charge-sharing error below $\tfrac12$ LSB even if $C_S$ starts at the opposite rail? (b) How long must the system wait between conversions of this channel for the external capacitor to recover to within $\tfrac12$ LSB? (c) What is the maximum sample rate, and is it adequate for a temperature sensor?
::: hint
Charge sharing: the pin voltage moves by $\Delta V\,C_S/(C_S + C_\text{ext})$. Recovery: the disturbance decays through $R_s$ with time constant $R_sC_\text{ext}$.
:::
::: solution
(a) The pin moves by at most $V_\text{ref}C_S/(C_S + C_\text{ext})$, which must be below $V_\text{ref}/2^{13}$: $C_\text{ext} \ge (2^{13} - 1)C_S = 8191\times 5\,\mathrm{pF} = 41\,\mathrm{nF}$. Use $47\,\mathrm{nF}$ or $100\,\mathrm{nF}$.

(b) With $C_\text{ext} = 100\,\mathrm{nF}$, the disturbance is at most $V_\text{ref}\times 5\,\mathrm{pF}/100\,\mathrm{nF} = 5\times 10^{-5}V_\text{ref}$, about $0.2$ LSB, already below $\tfrac12$ LSB; but repeated conversions accumulate if the capacitor never recovers. Recovery to a small fraction of the disturbance takes a few time constants of $R_sC_\text{ext} = 200\,\mathrm{k\Omega}\times 100\,\mathrm{nF} = 20\,\mathrm{ms}$; to be safe, wait about $3\tau = 60\,\mathrm{ms}$ ($e^{-3} = 5\,\%$ of $0.2$ LSB remaining).

(c) About $16$ samples per second — ample for temperature, whose time constant is seconds, but this channel could not follow anything faster. A buffer amplifier is the alternative when bandwidth matters.
:::
:::

::: exercise Designing a battery monitor {level=3}
A product powered by a lithium-ion cell ($3.0$–$4.2\,\mathrm{V}$) runs from a $3.3\,\mathrm{V}$ regulator, which drops out below about $3.4\,\mathrm{V}$ input, so the supply then follows the cell down. The $12$-bit ADC uses $V_{DD}$ as its reference. The product must measure the cell voltage to $\pm 20\,\mathrm{mV}$, and its sleep current budget is $2\,\mathrm{\mu A}$. Propose a measurement circuit and procedure, and justify each choice.
::: solution
A divider is needed because the cell exceeds $V_{DD}$; with $V_{DD}$ as reference the reading is not ratiometric, and $V_{DD}$ itself falls when the regulator drops out. So: (1) measure the internal bandgap reference to find $V_{DD}$ at the time of the reading ([[#ex-adc-volts]] style: $V_{DD} = V_\text{int}2^{12}/k_\text{int}$); (2) measure the divided cell voltage and scale by the measured $V_{DD}$. Divider: ratio $0.5$ (two equal resistors) maps $4.2\,\mathrm{V}$ to $2.1\,\mathrm{V}$, inside even a $3.0\,\mathrm{V}$ supply. To meet the sleep budget, either use large resistors ($2\times 1\,\mathrm{M\Omega}$ draws $2.1\,\mathrm{\mu A}$ — the whole budget) with a $100\,\mathrm{nF}$ reservoir capacitor for the ADC, or better, switch the divider with a P-MOSFET (or from a GPIO pin if its voltage drop is calibrated) so that it draws nothing between readings; then $2\times 100\,\mathrm{k\Omega}$ can be used, with a sampling time per [[#thm-sampling-time]] ($R_s = 50\,\mathrm{k\Omega}$). Accuracy: one LSB at the cell is $2\times 3.3/4096 = 1.6\,\mathrm{mV}$, but the bandgap calibration (a few mV out of $1.2\,\mathrm{V}$, a few tenths of a percent, i.e. $\approx 10\,\mathrm{mV}$ at $4\,\mathrm{V}$) and the divider resistors ($0.1\,\%$ parts contribute $\approx 4\,\mathrm{mV}$) dominate; averaging $16$ readings suppresses noise. A one-point calibration against a precision voltage at production removes most of the remaining gain error, which brings $\pm 20\,\mathrm{mV}$ within reach.
:::
:::

::: exercise Encoder speed measurement {level=3}
A motor with a $1000$-line quadrature encoder (counted on all edges) runs between $30$ and $3000$ revolutions per minute. The speed is measured every $1\,\mathrm{ms}$ by differencing a $16$-bit encoder counter. (a) What is the speed resolution at each end of the range? (b) Can the $16$-bit counter wrap between samples? (c) Propose a method with better resolution at low speed.
::: solution
(a) $4000$ counts per revolution. At $3000\,\mathrm{rpm} = 50\,\mathrm{rev/s}$: $2\times 10^5$ counts/s, $200$ counts per ms, resolution $0.5\,\%$. At $30\,\mathrm{rpm}$: $2$ counts per ms, resolution $50\,\%$ — useless.

(b) The largest change per sample is $200$ counts, far below $2^{15}$, so the signed difference of [[embedded-systems/timers-interrupts#thm-wrap]] (cast to `int16_t` for direction) is always correct.

(c) At low speed measure the *time between encoder edges* instead of counting edges in a fixed time: a second timer in input-capture mode at $1\,\mathrm{MHz}$ captures each edge; at $30\,\mathrm{rpm}$ edges come every $500\,\mathrm{\mu s}$, measured to $\pm 1\,\mathrm{\mu s}$, $0.2\,\%$. Practical drives combine both: count edges over the sample period and also capture the time of the last edge, dividing the number of edges by the exact time spanned — accurate at all speeds.
:::
:::
