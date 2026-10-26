A controller can only be as good as what it is told. A position loop cannot hold a carriage more closely than its encoder resolves; a force controller cannot apply a force more accurately than its load cell measures; a temperature loop with a slow sensor will overshoot no matter how it is tuned. Choosing and understanding the sensor is therefore the first design decision in any mechatronic system, and the place where many of them go wrong.

A **sensor** (or transducer) converts a physical quantity — the **measurand** — into a signal, nearly always electrical. Most sensors exploit a physical effect that couples the measurand to an electrical quantity: the change of resistance of a stretched wire, the voltage at the junction of two metals, the charge on a squeezed crystal, the interruption of light by a slotted disc. This chapter first defines the specifications by which sensors are compared — static and dynamic — and then works through the sensors a mechanical engineer meets most often: for position and speed, acceleration, strain, force and pressure, and temperature. The electronics that turn their small, noisy signals into numbers are the subject of [[mechatronics/signal-conditioning]].

## Static characteristics {#sec-static}

::: definition Static sensor characteristics {#def-static}
For a sensor whose output $y$ is measured at steady values of the input (measurand) $x$:

- **Range** is the interval of $x$ over which the sensor is designed to work; **span** or **full scale (FS)** is its width. **Output span** is the corresponding range of $y$.
- **Sensitivity** is the slope $S = \mathrm{d}y/\mathrm{d}x$ of the calibration curve (for example $\mathrm{mV/N}$ or $\mathrm{counts/mm}$).
- **Resolution** is the smallest change of $x$ that produces a detectable change of $y$. For a digital sensor it is one count; for an analogue one it is set by noise and by the converter that reads it.
- **Error** is the difference between the indicated and the true value; **accuracy** is a bound on the error, usually quoted as a percentage of full scale (% FS) or of reading.
- **Non-linearity** is the largest deviation of the calibration curve from a reference straight line, expressed as % FS. The *end-point* line joins the outputs at the two ends of the range; the *independent* (best-fit) line minimises the largest deviation and gives about half the end-point figure.
- **Hysteresis** is the largest difference between outputs at the same input approached from below and from above.
- **Repeatability** is the scatter of the output for repeated application of the same input under the same conditions.
- **Drift** is a change of output over time or with temperature at constant input: *zero drift* (offset) and *sensitivity drift* (gain).
:::

The distinction between **resolution** and **accuracy** matters constantly. An encoder may resolve one micrometre while the screw it is mounted on has a pitch error of ten; a 16-bit converter resolves one part in 65 536 of a reading whose sensor is accurate to one part in 500. Feedback control corrects everything that the sensor sees, and nothing that it does not: errors *between* the sensor and the point of interest (screw pitch, thermal expansion, deflection of the frame) remain, which is why precision machines put the encoder as close as possible to the tool.

::: example Non-linearity from a calibration {#ex-linearity}
A load cell with a range of $0$–$100\ \mathrm{N}$ is calibrated with dead weights and gives the outputs

| $F$ / N | 0 | 25 | 50 | 75 | 100 |
|---|---|---|---|---|---|
| $y$ / mV | 0 | 2.52 | 5.03 | 7.52 | 10.00 |

Find the sensitivity and the end-point non-linearity.
::: solution
The end-point line joins $(0, 0)$ and $(100, 10.00)$: sensitivity $S = 10.00/100 = 0.100\ \mathrm{mV/N}$, predicting $2.50$, $5.00$, $7.50\ \mathrm{mV}$ at the intermediate loads. Deviations: $0.02$, $0.03$, $0.02\ \mathrm{mV}$. The largest is $0.03\ \mathrm{mV}$ on a span of $10.00\ \mathrm{mV}$: non-linearity $0.3\,\%$ FS.

Sanity check: the deviations are all of one sign and largest at mid-range — a bow, typical of an elastic element with slightly non-linear stiffness. A best-fit line, shifted up by about $0.015\ \mathrm{mV}$, would halve the figure to about $0.15\,\%$ FS, which is why manufacturers usually quote the best-fit value; know which line a data sheet means.
:::
:::

## Dynamic characteristics {#sec-dynamic}

A sensor that is perfect at steady state may still be useless in a loop if it responds slowly. Most sensors are well described by a first- or second-order model.

### First-order sensors

::: proposition Thermal time constant of a lumped sensor {#prop-thermal-tau}
A sensor of mass $m$, specific heat $c$ and surface area $A$, immersed in a fluid at temperature $T_f(t)$ with heat-transfer coefficient $h$, and small enough that its own temperature is uniform (Biot number $\mathrm{Bi} = h(V/A)/k < 0.1$), obeys
$$
\tau\,\frac{\mathrm{d}T_s}{\mathrm{d}t} + T_s = T_f(t),\qquad \tau = \frac{mc}{hA} = \frac{\rho c V}{hA}.
$$ {#eq-first-order-sensor}
After a step change of $T_f$ the error decays as $e^{-t/\tau}$; when $T_f$ rises at a constant rate $\dot T$, the sensor reading lags behind by $\tau\dot T$ once the transient has died out.
:::

::: proof
Energy balance on the sensor: the rate of increase of stored energy equals the convective heat inflow, $mc\,\mathrm{d}T_s/\mathrm{d}t = hA(T_f - T_s)$, using one temperature for the whole body (justified by the small Biot number, as in the lumped-capacitance analysis of [[heat-transfer/transient-conduction]]). Dividing by $hA$ gives [[#eq-first-order-sensor]]. For a ramp $T_f = T_0 + \dot Tt$ with $T_s(0) = T_0$, try $T_s = T_0 + \dot T(t - \tau) + Be^{-t/\tau}$: then $\tau\,\mathrm{d}T_s/\mathrm{d}t = \tau\dot T - Be^{-t/\tau}$, and adding $T_s$ gives $T_0 + \dot Tt = T_f$, so the trial function satisfies the equation for any $B$; the initial condition $T_s(0) = T_0$ gives $B = \dot T\tau$. As $t \to \infty$ the exponential vanishes and $T_f - T_s \to \dot T\tau$.
:::

The same equation describes any sensor with one energy store and one dissipation: a pressure transducer connected through a long thin tube to a small cavity, an RC filter, a hot-wire anemometer at low frequency. The time constant is not a property of the sensor alone: it depends on $h$, which is several hundred times larger in flowing water than in still air.

::: example A thermocouple bead {#ex-bead}
A thermocouple junction is a sphere of diameter $1.0\ \mathrm{mm}$ with $\rho = 8500\ \mathrm{kg/m^3}$, $c = 400\ \mathrm{J\,kg^{-1}\,K^{-1}}$ and $k = 20\ \mathrm{W\,m^{-1}\,K^{-1}}$, in a gas stream with $h = 200\ \mathrm{W\,m^{-2}\,K^{-1}}$. Find its time constant, check the lumped assumption, and find the lag when the gas temperature rises at $2\ \mathrm{K/s}$.
::: solution
For a sphere $V/A = D/6 = 1.667\times10^{-4}\ \mathrm{m}$. Then $\tau = \rho cV/(hA) = 8500 \times 400 \times 1.667\times10^{-4}/200 = 2.83\ \mathrm{s}$. Biot number $200 \times 1.667\times10^{-4}/20 = 1.7\times10^{-3} \ll 0.1$: lumped analysis is valid. Lag during the ramp: $\tau\dot T = 2.83 \times 2 = 5.7\ \mathrm{K}$.

Sanity check: $\tau \propto D$, so a $0.25\ \mathrm{mm}$ bead would respond in about $0.7\ \mathrm{s}$ (and $h$ also grows for smaller beads). A thermocouple in a protective sheath, a few millimetres in diameter, can have a time constant of tens of seconds — slower than many of the processes it is used to control.
:::
:::

::: widget plot
title: First-order sensor following a ramp
f: 2*x; 2*(x - tau*(1 - exp(-x/tau)))
x: 0, 15
y: 0, 30
sliders: tau=2.83:0.5:6:0.01
labels: \text{fluid } T_f - T_0; \text{sensor } T_s - T_0
caption: Fluid temperature rising at $2\ \mathrm{K/s}$ (in K, against time in s) and the reading of a first-order sensor with time constant $\tau$. After a few time constants the sensor runs parallel to the fluid, a constant $2\tau$ kelvin behind — the "dynamic error" that a slow sensor adds to every transient. Shorten $\tau$ and the gap shrinks in proportion.
:::

### Second-order sensors: the accelerometer

An **accelerometer** measures acceleration by measuring the force needed to make a small **proof mass** follow its case. Model it as a mass $m$ on a spring $k$ with damping $c$ inside a case that moves with displacement $x_b(t)$; let $z = x_m - x_b$ be the displacement of the mass relative to the case, which the sensing element (a piezoelectric crystal, a capacitive comb, a strain gauge) measures.

::: proposition Seismic accelerometer {#prop-accelerometer}
The relative displacement $z$ responds to the case acceleration $a = \ddot x_b$ as
$$
\frac{Z(s)}{A(s)} = \frac{-1}{s^2 + 2\zeta\omega_n s + \omega_n^2},\qquad \omega_n = \sqrt{k/m},\quad \zeta = \frac{c}{2\sqrt{km}} .
$$ {#eq-accelerometer}
Well below resonance $z \approx -a/\omega_n^2$, so the sensitivity is $1/\omega_n^2$. For sinusoidal acceleration at frequency $\omega$ the amplitude, relative to the low-frequency value, is
$$
\frac{\lvert Z\rvert\,\omega_n^2}{\lvert A\rvert} = \frac{1}{\sqrt{(1 - r^2)^2 + (2\zeta r)^2}},\qquad r = \frac{\omega}{\omega_n}.
$$ {#eq-accel-ratio}
:::

::: proof
Free-body diagram of the proof mass: spring force $-k(x_m - x_b)$ and damper force $-c(\dot x_m - \dot x_b)$, both acting on the mass and transmitted from the case; gravity is a constant offset and is omitted. Newton's second law, $m\ddot x_m = -kz - c\dot z$, with $\ddot x_m = \ddot z + a$, gives $m\ddot z + c\dot z + kz = -ma$. Dividing by $m$ and taking Laplace transforms with zero initial conditions gives [[#eq-accelerometer]]. At $s = 0$ the gain is $-1/\omega_n^2$; setting $s = j\omega$ and taking the modulus relative to that gives [[#eq-accel-ratio]].
:::

The design consequence is a trade between sensitivity and bandwidth: a soft suspension (low $\omega_n$) gives a large deflection per unit acceleration but a low usable frequency. Piezoelectric accelerometers are very stiff (resonances of $20$–$50\ \mathrm{kHz}$) and almost undamped ($\zeta \approx 0.01$–$0.05$); they are used up to about a fifth of the resonance, where the amplitude error is about $4\,\%$. MEMS capacitive accelerometers, as in phones and airbag controllers, have resonances of a few kilohertz and gas damping near $\zeta \approx 0.7$, which keeps the response within $5\,\%$ up to about $0.6\,\omega_n$ (exactly flat as $r \to 0$ and $-3\ \mathrm{dB}$ near $r = 1$ for $\zeta = 1/\sqrt2$).

::: widget plot
title: Accelerometer frequency response
f: 1/sqrt((1 - x^2)^2 + (2*z*x)^2); 1.05; 0.95
x: 0, 1.5
y: 0, 3
sliders: z=0.05:0.01:1:0.01
labels: \lvert Z\rvert\omega_n^2/\lvert A\rvert; +5\,\%; -5\,\%
caption: Amplitude ratio of a seismic accelerometer against the frequency ratio $r = \omega/\omega_n$, for damping ratio $\zeta$ on the slider. With light damping (piezoelectric types) the curve leaves the $\pm 5\,\%$ band near $r = 0.2$ and has a sharp resonance; at $\zeta = 0.7$ it stays within the band to about $r = 0.6$, and at $\zeta = 0.65$ to about $r = 0.7$. That is the reason MEMS sensors are gas-damped near $0.7$.
:::

## Position and speed {#sec-position}

### Potentiometers and LVDTs

A **potentiometer** is a resistive track with a sliding wiper: with a supply $V_s$ across the track, the wiper voltage is proportional to position, as long as it is read without loading ([[mechatronics/mechatronic-systems#ex-pot-loading]]). It is cheap, absolute and needs no electronics, but the wiper wears and its resolution is limited by the track (wire-wound tracks step from turn to turn). It is found in joysticks, throttle-position sensors and servo motors for models.

The **linear variable differential transformer** (LVDT) has a primary coil excited by an AC voltage (typically $1$–$10\ \mathrm{kHz}$) and two secondary coils connected in opposition, with a movable ferromagnetic core. At the centre the two secondary voltages cancel; displacement of the core increases one and decreases the other, and the amplitude of the difference is proportional to displacement while its phase indicates the direction. A phase-sensitive demodulator turns it into a DC voltage. With no contact between core and coils, the LVDT has essentially infinite resolution (limited by the electronics), no wear, and works in harsh environments, including inside hydraulic cylinders.

### Encoders

::: definition Incremental and absolute encoders {#def-encoder}
An **incremental encoder** produces pulses as it moves: a disc (rotary) or scale (linear) carries a pattern of $N$ lines per revolution or per unit length, read optically or magnetically by two sensors (channels $A$ and $B$) displaced by a quarter of a line pitch, so that the two square waves are $90°$ apart (in **quadrature**). Counting every rising and falling edge of both channels gives $4N$ counts per revolution (**×4 decoding**); the order of the edges ($A$ leading $B$ or $B$ leading $A$) gives the direction. A third **index** channel gives one pulse per revolution as a reference. The position is known only relative to the power-up position, so machines **home** to a switch or the index after start-up.

An **absolute encoder** gives a unique code word for every position, read from several tracks (or serially from a single-chip sensor), so the position is known immediately at power-up. Its tracks use a **Gray code**, in which successive positions differ in exactly one bit, so a reading taken during a transition can be wrong by at most one step.
:::

The resolution of a rotary encoder driving a linear axis through a screw of lead $p$ (travel per revolution) is $p/(4N)$ per count. With ordinary binary code, the step from $0111$ to $1000$ changes four bits; if the read-heads are slightly misaligned, a reading during that transition can be any of sixteen values. Gray code ($0100$ to $1100$) removes the problem.

::: example Encoder resolution on a ball-screw axis {#ex-encoder}
A servo motor carries a 2500-line incremental encoder and drives a carriage through a ball screw of $10\ \mathrm{mm}$ lead. Find the resolution in counts per revolution and in micrometres, and the count frequency at a carriage speed of $0.5\ \mathrm{m/s}$.
::: solution
×4 decoding: $4 \times 2500 = 10\,000$ counts per revolution. Linear resolution $10\ \mathrm{mm}/10\,000 = 1.0\ \mathrm{\mu m}$ per count. At $0.5\ \mathrm{m/s}$ the screw turns at $0.5/0.010 = 50\ \mathrm{rev/s}$ ($3000\ \mathrm{rev/min}$) and the count rate is $50 \times 10\,000 = 5.0\times10^{5}$ counts per second; each channel's line frequency is $50 \times 2500 = 125\ \mathrm{kHz}$.

Sanity check: microcontroller quadrature-decoder peripherals and drive inputs handle several megacounts per second, so $0.5\ \mathrm{MHz}$ is comfortable — but the cable must carry $125\ \mathrm{kHz}$ square waves cleanly, which is why industrial encoders use differential (RS-422) line drivers. The $1\ \mathrm{\mu m}$ count says nothing about accuracy: a typical precision ball screw has a lead error of the order of $10\ \mathrm{\mu m}$ per $300\ \mathrm{mm}$.
:::
:::

### Measuring speed

Speed can be measured directly by a **tachogenerator** (a small DC generator whose voltage is proportional to speed, $v = K\omega$) but is now usually computed from the encoder. There are two ways.

::: proposition Count and period methods of speed measurement {#prop-speed}
Let the encoder give $n_e$ counts per revolution.

(a) **Count (frequency) method:** count the encoder edges $m$ in a fixed window $T$. The speed is $\omega = 2\pi m/(n_eT)$ and its resolution (the change of $\omega$ corresponding to one count) is
$$
\Delta\omega = \frac{2\pi}{n_eT}\quad\text{(independent of speed)}.
$$ {#eq-count-method}
(b) **Period method:** count the pulses $q$ of a fast clock of frequency $f_c$ between successive encoder edges. The speed is $\omega = 2\pi f_c/(n_eq)$ and its relative resolution is
$$
\frac{\Delta\omega}{\omega} \approx \frac1q = \frac{n_e\,\omega}{2\pi f_c}\quad\text{(proportional to speed)}.
$$ {#eq-period-method}
:::

::: proof
(a) In time $T$ the shaft turns $m/n_e$ revolutions, i.e. $2\pi m/n_e$ radians, so $\omega = 2\pi m/(n_eT)$; $m$ is an integer, and changing it by one changes $\omega$ by $2\pi/(n_eT)$. (b) The time between edges, $1/n_e$ of a revolution, is $q/f_c$, so $\omega = (2\pi/n_e)/(q/f_c)$. Changing $q$ by one changes $\omega$ by the fraction $1/(q \mp 1) \approx 1/q$; substituting $q = 2\pi f_c/(n_e\omega)$ gives the second form of [[#eq-period-method]].
:::

The count method is good at high speed (many counts per window) and poor at low speed; the period method is the reverse, and at very low speed it must wait a long time for the next edge. Servo drives combine them, for example by timing the last edge in each sampling window, and filter the result, because the differenced encoder signal is noisy ([[mechatronics/motion-control]]).

### Hall-effect sensors

A current flowing across a magnetic field in a semiconductor plate develops a voltage across the plate proportional to the field (the Hall effect). Hall sensors measure magnetic field, and through it the position of a magnet: they detect rotor position in brushless motors ([[mechatronics/electric-actuators]]), serve as non-contact switches and gear-tooth speed sensors, and, around a conductor in a magnetic core, measure current without contact.

## Strain, force and pressure {#sec-strain}

::: definition Gauge factor {#def-gauge-factor}
A **strain gauge** is a fine metal grid (foil, typically a few micrometres thick, on a polymer backing) bonded to the surface of a part so that it stretches with it. Its resistance changes with the strain $\varepsilon$ along the grid; the **gauge factor** is
$$
GF = \frac{\Delta R/R}{\varepsilon}.
$$
Metal-foil gauges (constantan, a copper–nickel alloy) have $GF \approx 2.0$–$2.1$ and nominal resistances of $120$, $350$ or $1000\ \mathrm{\Omega}$; semiconductor (silicon) gauges have gauge factors of about $100$ or more but are strongly temperature-dependent.
:::

::: proposition Origin of the gauge factor {#prop-gauge-factor}
For a conductor of resistivity $\rho$, length $L$ and cross-section $A$ under uniaxial strain $\varepsilon$ with Poisson's ratio $\nu$,
$$
GF = 1 + 2\nu + \frac{\Delta\rho/\rho}{\varepsilon} .
$$ {#eq-gauge-factor}
:::

::: proof
$R = \rho L/A$, so $\ln R = \ln\rho + \ln L - \ln A$ and, for small changes, $\mathrm{d}R/R = \mathrm{d}\rho/\rho + \mathrm{d}L/L - \mathrm{d}A/A$. Here $\mathrm{d}L/L = \varepsilon$. The lateral strain is $-\nu\varepsilon$ in each transverse direction, so each transverse dimension changes by the factor $(1 - \nu\varepsilon)$ and the area by $(1 - \nu\varepsilon)^2 \approx 1 - 2\nu\varepsilon$: $\mathrm{d}A/A = -2\nu\varepsilon$. Hence $\mathrm{d}R/R = \mathrm{d}\rho/\rho + \varepsilon(1 + 2\nu)$; dividing by $\varepsilon$ gives [[#eq-gauge-factor]].
:::

With $\nu = 0.3$ the geometric part is $1.6$; the remainder of a metal gauge's factor of about $2$ comes from the change of resistivity with strain (piezoresistance), which dominates completely in semiconductors. The resistance changes are tiny: at $1000\ \mu\varepsilon$ ($0.1\,\%$ strain, already a large working strain for steel) a $350\ \mathrm{\Omega}$ gauge changes by $0.7\ \mathrm{\Omega}$. They are measured in a Wheatstone bridge, which also cancels the effect of temperature ([[mechatronics/signal-conditioning]]).

A **load cell** is an elastic element — a column, a beam, a shear web, a ring — designed so that the force produces a well-defined strain at the gauge locations, with four gauges in a full bridge. Its design is an exercise in [[mechanics-of-materials]]: high strain at the gauges for sensitivity, low stress elsewhere for fatigue life, and an arrangement that rejects off-axis loads.

::: example A tension load cell {#ex-load-cell}
A steel tension link ($E = 200\ \mathrm{GPa}$) of cross-section $100\ \mathrm{mm^2}$ carries a gauge with $R = 350\ \mathrm{\Omega}$ and $GF = 2.0$ along its axis. Find the gauge resistance change at $10\ \mathrm{kN}$, and the stress.
::: solution
$\sigma = F/A = 10\,000/(100\times10^{-6}) = 100\ \mathrm{MPa}$; $\varepsilon = \sigma/E = 100\times10^{6}/200\times10^{9} = 5.0\times10^{-4} = 500\ \mu\varepsilon$; $\Delta R = GF\,\varepsilon R = 2.0 \times 5.0\times10^{-4} \times 350 = 0.35\ \mathrm{\Omega}$.

Sanity check: $\Delta R/R = 0.1\,\%$. Load cells are typically designed for $1000$–$1500\ \mu\varepsilon$ at full scale, so this link is at about a third to a half of a typical design strain; the stress, $100\ \mathrm{MPa}$, is a comfortable fraction of the fatigue strength of a good steel, as it must be for a part that is loaded millions of times.
:::
:::

**Pressure sensors** use a thin diaphragm whose deflection or surface strain is measured by bonded or diffused (silicon) gauges, capacitive plates or a resonant element. A sensor measures **absolute** pressure (relative to a sealed vacuum reference), **gauge** pressure (relative to the atmosphere, through a vent) or **differential** pressure between two ports.

**Piezoelectric** sensors (quartz or ceramic) produce a charge proportional to force, $q = dF$ with $d \approx 2.3\ \mathrm{pC/N}$ for quartz. They are extremely stiff and fast, ideal for impact, cutting-force and combustion-pressure measurement, but the charge leaks away through the finite insulation resistance, so they cannot measure static forces; their lower frequency limit is set by the time constant of the charge amplifier that reads them.

::: warning Gauge, absolute — and apparent strain
Two classic errors. (1) Mixing gauge and absolute pressure: a sensor reading $0\ \mathrm{bar}$ gauge is at about $1.013\ \mathrm{bar}$ absolute, and gas-law calculations ([[mechatronics/fluid-power]]) need absolute values. (2) Reading temperature as strain: a gauge on a steel part whose temperature rises by $10\ \mathrm{K}$ sees a resistance change from the mismatch of the gauge's and the part's thermal expansion and from the alloy's resistance–temperature coefficient (**apparent strain**) that can amount to tens of microstrain for gauges not matched to the material. Use gauges whose alloy is compensated for the part's expansion coefficient ("self-temperature-compensated"), and bridge arrangements in which equal changes in adjacent arms cancel.
:::

## Temperature {#sec-temperature}

**Thermocouples.** A junction of two dissimilar metals in a circuit whose other junction is at a different temperature produces a voltage that depends on the temperature difference (the Seebeck effect). In practice the voltage is generated along the wires wherever there is a temperature gradient, and the circuit reads the difference between the measuring ("hot") junction and the point where the thermocouple wires join the copper of the instrument (the **reference** or **cold junction**). The instrument must therefore measure the cold-junction temperature — with a thermistor or a semiconductor sensor at its terminals — and add it back: **cold-junction compensation**. The common type K (nickel–chromium against nickel–aluminium) produces about $41\ \mathrm{\mu V/K}$ near room temperature and works to about $1250\,^\circ\mathrm{C}$; the full relation is non-linear and is given by standard reference tables and polynomials (IEC 60584-1, NIST ITS-90 tables). Thermocouples are cheap, rugged, small and wide-ranging; their signals are small, and their accuracy is typically $\pm 1$–$2\ \mathrm{K}$.

::: example Cold-junction compensation {#ex-cjc}
A type K thermocouple reads $3.28\ \mathrm{mV}$ at an instrument whose terminals are at $20\,^\circ\mathrm{C}$. Using a constant sensitivity of $41\ \mathrm{\mu V/K}$, estimate the hot-junction temperature, and say what happens if the compensation is omitted.
::: solution
The voltage corresponds to the difference $3.28\ \mathrm{mV}/(0.041\ \mathrm{mV/K}) = 80\ \mathrm{K}$ between the hot and the cold junction, so $T \approx 20 + 80 = 100\,^\circ\mathrm{C}$. Without compensation the instrument would treat the reading as relative to $0\,^\circ\mathrm{C}$ and display $80\,^\circ\mathrm{C}$, and the error would wander with the room temperature.

Sanity check against the standard table: type K gives $4.096\ \mathrm{mV}$ at $100\,^\circ\mathrm{C}$ and $0.798\ \mathrm{mV}$ at $20\,^\circ\mathrm{C}$ (both relative to $0\,^\circ\mathrm{C}$); their difference, $3.298\ \mathrm{mV}$, would be read as $100.4\,^\circ\mathrm{C}$ by the linear estimate. The correct procedure with the table is to add the cold-junction *voltage* ($0.798\ \mathrm{mV}$) to the reading and convert the sum back to temperature — adding temperatures is only exact for a linear characteristic.
:::
:::

**Resistance temperature detectors (RTDs).** The resistance of pure platinum rises almost linearly with temperature. The standard industrial element, Pt100, has $R_0 = 100\ \mathrm{\Omega}$ at $0\,^\circ\mathrm{C}$ and follows, for $0 \le T \le 850\,^\circ\mathrm{C}$, the Callendar–Van Dusen equation of IEC 60751,
$$
R(T) = R_0\left(1 + AT + BT^2\right),\qquad A = 3.9083\times10^{-3}\ ^\circ\mathrm{C}^{-1},\quad B = -5.775\times10^{-7}\ ^\circ\mathrm{C}^{-2},
$$ {#eq-cvd}
with $T$ in °C (below $0\,^\circ\mathrm{C}$ a further cubic term is added). At $100\,^\circ\mathrm{C}$ a Pt100 reads $100(1 + 0.39083 - 0.005775) = 138.51\ \mathrm{\Omega}$, a sensitivity of about $0.385\ \mathrm{\Omega/K}$. RTDs are more accurate and stable than thermocouples (class A tolerance is $\pm(0.15 + 0.002\lvert T\rvert)\ \mathrm{K}$) but larger and slower. Two errors must be managed: the resistance of the lead wires, which is why three- and four-wire connections are used, and **self-heating** by the measuring current, $P = I^2R$, which is why the current is kept to about $1\ \mathrm{mA}$.

**Thermistors** are semiconducting ceramics whose resistance falls steeply with temperature (NTC types), typically by about $4\,\%$ per kelvin at room temperature. They are sensitive, cheap and small, but strongly non-linear; over a limited range the "beta" model $R = R_{25}\exp[B(1/T - 1/T_{25})]$, with $T$ in kelvin, is adequate, and the Steinhart–Hart equation is more accurate. They are the usual choice in consumer products, battery packs and 3D-printer hot ends.

| sensor | typical range | accuracy (typical) | strengths | weaknesses |
|---|---|---|---|---|
| thermocouple (type K) | $-200$ to $1250\,^\circ\mathrm{C}$ | $\pm 1.5$–$2\ \mathrm{K}$ | wide range, rugged, fast if fine | small signal, needs cold-junction compensation |
| Pt100 RTD | $-200$ to $850\,^\circ\mathrm{C}$ | $\pm 0.15$–$0.3\ \mathrm{K}$ near $0\,^\circ\mathrm{C}$ | accurate, stable, near-linear | lead resistance, self-heating, slower |
| NTC thermistor | $-50$ to $150\,^\circ\mathrm{C}$ | $\pm 0.2$–$1\ \mathrm{K}$ | very sensitive, cheap | strongly non-linear, limited range |

::: quiz
A 1000-line incremental encoder on a motor is read with ×4 decoding. How many counts does the controller see per revolution, and how does it know the direction?
- [ ] 1000 counts; from the index pulse
- [ ] 2000 counts; from the pulse width
- [x] 4000 counts; from which of channels A and B leads the other
- [ ] 4000 counts; from the sign of the voltage
::: solution
Each line produces a rising and a falling edge on each of the two channels: $4 \times 1000 = 4000$ edges per revolution. The channels are $90°$ apart, so in one direction $A$ changes before $B$ and in the other $B$ before $A$; the decoder's state machine counts up or down accordingly. The index pulse marks a reference position once per revolution and carries no direction information.
:::
:::

::: history
Many of the effects used in sensors were discovered long before they were used for control. Thomas Johann Seebeck reported the thermoelectric effect in 1821; Pierre and Jacques Curie discovered piezoelectricity in 1880; Edwin Hall found the effect named after him in 1879; and Hugh Longbourne Callendar's work on the platinum resistance thermometer, published in 1887, laid the basis of precise resistance thermometry. The bonded resistance strain gauge appeared independently in 1938: Arthur C. Ruge at MIT bonded fine wire to a model structure while studying earthquake loading, and Edward E. Simmons at Caltech had developed a similar gauge for impact testing; the patent was granted to Simmons in 1942, and the etched-foil gauge that replaced wire followed in the 1950s. Frank Gray of Bell Laboratories patented the reflected binary code now used in absolute encoders in 1953 (filed in 1947), for pulse-code communication rather than for measuring position.
:::

::: summary
- Static specifications: range, sensitivity, resolution, accuracy, non-linearity (say which reference line), hysteresis, repeatability and drift. Resolution is not accuracy, and feedback corrects only what the sensor sees.
- A lumped thermal sensor is first order with $\tau = \rho cV/(hA)$; it lags a ramp by $\tau\dot T$. Its time constant depends on the flow around it.
- A seismic accelerometer measures $z \approx -a/\omega_n^2$ below resonance; amplitude ratio $1/\sqrt{(1 - r^2)^2 + (2\zeta r)^2}$. Light damping limits use to about $r = 0.2$; $\zeta \approx 0.7$ extends it to about $0.6$.
- Incremental encoders give $4N$ counts per revolution with direction from quadrature; absolute encoders use Gray code. Speed by counting (good at high speed) or by timing (good at low speed).
- Strain gauges: $GF = 1 + 2\nu + (\Delta\rho/\rho)/\varepsilon \approx 2$ for metal foil; $\Delta R/R$ is of order $10^{-3}$ and is read in a bridge.
- Thermocouples need cold-junction compensation; Pt100 RTDs follow $R_0(1 + AT + BT^2)$; thermistors are sensitive but non-linear.
:::

## Exercises

::: exercise Encoder angular resolution {level=1 check="0.087890625"}
A 1024-line incremental encoder is read with ×4 decoding. Find its angular resolution. (Enter it in degrees, exactly.)
::: solution
$4 \times 1024 = 4096$ counts per revolution; $360°/4096 = 0.087890625°$ ($1.534\ \mathrm{mrad}$).
:::
:::

::: exercise Gauge resistance change {level=1 check="0.252"}
A $120\ \mathrm{\Omega}$ strain gauge with $GF = 2.1$ is strained to $1000\ \mu\varepsilon$. Find its change of resistance. (Enter $\Delta R$ in Ω.)
::: solution
$\Delta R = GF\,\varepsilon R = 2.1 \times 10^{-3} \times 120 = 0.252\ \mathrm{\Omega}$.
:::
:::

::: exercise A Pt100 at 50 °C {level=1 check="119.397125"}
Use [[#eq-cvd]] to find the resistance of a Pt100 at $50\,^\circ\mathrm{C}$. (Enter $R$ in Ω to at least four decimal places.)
::: solution
$R = 100(1 + 3.9083\times10^{-3} \times 50 - 5.775\times10^{-7} \times 2500) = 100(1 + 0.195415 - 0.00144375) = 119.397125\ \mathrm{\Omega}$. A linear model with the mean coefficient $0.00385$ would give $119.25\ \mathrm{\Omega}$, an error equivalent to about $0.4\ \mathrm{K}$.
:::
:::

::: exercise Ramp lag {level=1 check="10"}
A sheathed temperature probe with a time constant of $2.5\ \mathrm{s}$ measures oil whose temperature rises steadily at $4\ \mathrm{K/s}$. After the start-up transient, by how much does the reading lag the oil temperature? (Enter the lag in K.)
::: solution
From [[#prop-thermal-tau]], the lag is $\tau\dot T = 2.5 \times 4 = 10\ \mathrm{K}$. A controller acting on this reading would see the oil $10\ \mathrm{K}$ cooler than it is.
:::
:::

::: exercise Speed resolution {level=2 check="15"}
A 500-line encoder is read with ×4 decoding, and the controller computes speed by counting edges in a $2\ \mathrm{ms}$ window. Find the speed resolution. (Enter it in rev/min.)
::: solution
Counts per revolution $n_e = 2000$. One count in $2\ \mathrm{ms}$ corresponds to $1/(2000 \times 0.002) = 0.25\ \mathrm{rev/s} = 15\ \mathrm{rev/min}$. At $30\ \mathrm{rev/min}$ the reading would jump between $15$, $30$ and $45\ \mathrm{rev/min}$ — useless for low-speed control without the period method or a longer window.
:::
:::

::: exercise Accelerometer used too close to resonance {level=2 check="4/3"}
An undamped accelerometer ($\zeta \approx 0$) with resonance at $10\ \mathrm{kHz}$ is used to measure vibration at $5\ \mathrm{kHz}$. By what factor does it overstate the acceleration amplitude? (Enter the factor.)
::: solution
$r = 0.5$, so from [[#eq-accel-ratio]] the ratio is $1/(1 - 0.25) = 4/3$: it reads $33\,\%$ high. Keep $r$ below about $0.2$ for errors under $5\,\%$ with an undamped sensor.
:::
:::

::: exercise End-point non-linearity {level=2 check="1"}
A displacement sensor with range $0$–$20\ \mathrm{mm}$ gives $0$, $1.03$, $2.04$, $3.02$ and $4.00\ \mathrm{V}$ at $0$, $5$, $10$, $15$ and $20\ \mathrm{mm}$. Find the end-point non-linearity. (Enter it in % of full scale.)
::: solution
End-point slope $4.00/20 = 0.200\ \mathrm{V/mm}$, predicting $1.00$, $2.00$, $3.00\ \mathrm{V}$. Deviations $0.03$, $0.04$, $0.02\ \mathrm{V}$; the largest, $0.04\ \mathrm{V}$, is $1\,\%$ of the $4.00\ \mathrm{V}$ span.
:::
:::

::: exercise Piezoresistance in silicon {level=2 check="118.4"}
A silicon strain gauge has $GF = 120$ and $\nu = 0.3$. Using [[#eq-gauge-factor]], find the contribution $(\Delta\rho/\rho)/\varepsilon$ of the change of resistivity. (Enter the number.)
::: solution
$(\Delta\rho/\rho)/\varepsilon = GF - 1 - 2\nu = 120 - 1.6 = 118.4$. The geometric effect contributes about $1.3\,\%$ of the response; the rest is piezoresistance.
:::
:::

::: exercise Measuring a hydraulic cylinder's position {level=3}
A hydraulic cylinder with $400\ \mathrm{mm}$ stroke on a forestry machine needs position feedback to $\pm 0.5\ \mathrm{mm}$, in an environment with vibration, mud, water spray and temperatures from $-30$ to $+80\,^\circ\mathrm{C}$. Compare at least three sensor options (for example an external potentiometer, a draw-wire encoder, an LVDT, a magnetostrictive sensor inside the rod, a camera) against the requirements, and recommend one.
::: solution
A good answer considers: resolution and accuracy ($0.5\ \mathrm{mm}$ on $400\ \mathrm{mm}$ is $0.125\,\%$ FS — within reach of all the contact-free options); absolute versus incremental (absolute is preferred: no homing after power loss); protection (sensors mounted inside the cylinder, such as magnetostrictive position sensors in the gun-drilled rod or LVDTs, are protected from impact and dirt; an external potentiometer or draw-wire encoder is exposed); wear (potentiometers wear with the constant small vibration-driven motions); temperature range and sealing; electrical interface (analogue $4$–$20\ \mathrm{mA}$ is robust over long cables, CAN or SSI digital interfaces are common on mobile machines); and cost and serviceability. A typical recommendation is an in-cylinder magnetostrictive sensor with a digital or current-loop output, at the price of a special cylinder with a bored rod; a camera is unsuited to mud and vibration.
:::
:::
