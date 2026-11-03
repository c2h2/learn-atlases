A modern phone carries a dozen sensors: a three-axis accelerometer and a gyroscope etched in silicon, a magnetometer based on the Hall effect or on magnetoresistance, a barometric pressure sensor sensitive enough to tell which floor of a building it is on, ambient-light and proximity photodiodes, several temperature sensors, capacitive touch electrodes and microphones. A chemical plant has thousands more: thermocouples in furnaces, platinum resistance thermometers in reactors, strain-gauge load cells under tanks, piezoelectric accelerometers on pumps. In every case a physical quantity — temperature, force, displacement, light — is converted into an electrical one, and the circuit that follows can only be designed well if we know exactly what kind of electrical signal comes out: a resistance that changes by a fraction of a per cent, a charge of a few picocoulombs that leaks away, a microvolt-level electromotive force, a photocurrent of nanoamperes.

This chapter is about that conversion, seen from the electrical side. We first define how a sensor is characterised, statically and dynamically, and distinguish **modulating** sensors, which need excitation, from **self-generating** ones, which produce their own signal. Then we work through the main physical principles: resistive sensors (resistance thermometers, thermistors, strain gauges), capacitive and inductive sensors (including MEMS accelerometers, LVDTs and Hall-effect sensors), and the self-generating thermocouples, piezoelectric transducers and photodiodes. For each we derive the transfer characteristic, give realistic numbers, and identify the electrical model that the interface circuits of [[instrumentation/bridges-signal-conditioning]] and [[instrumentation/instrumentation-amplifiers]] must handle. Mechanical sensors — encoders, tachometers, resolvers, load cells in machines — are treated from a mechatronics point of view in the Mechanical Atlas [sensors](/learn/mechanical/lesson.php?c=mechatronics&l=sensors) chapter; here the emphasis is on the electrical behaviour and its errors, expressed in the uncertainty language of [[instrumentation/measurement-uncertainty]].

## Describing a sensor {#sec-describing}

::: definition Sensor, transducer and transfer characteristic {#def-sensor}
A **transducer** converts energy or a signal from one physical form to another; a **sensor** is a transducer whose input is the quantity to be measured, the **measurand** $x$, and whose output $y$ is (here) electrical. Its **transfer characteristic** is the steady-state relation $y = F(x)$. The **sensitivity** is $S = \dd y/\dd x$; **range** is the interval of $x$ the sensor is designed for, and **full-scale output** (FSO) is the corresponding span of $y$. **Non-linearity** is the maximum deviation of $F$ from a reference straight line, as a percentage of FSO; the line may be the **end-point line** through the outputs at the two ends of the range or the **best-fit** (least-squares) line, which gives a smaller figure for the same sensor. **Hysteresis** is the maximum difference in output at the same $x$ approached from below and from above; **offset** is the output at $x = 0$; **drift** is a change of offset or sensitivity with time or temperature.
:::

::: definition Modulating and self-generating sensors {#def-active}
A **modulating** (or passive) sensor changes an electrical property — resistance, capacitance, inductance — in response to the measurand and needs an external **excitation** to turn that change into a signal; its output is proportional to the excitation. A **self-generating** (or active) sensor converts energy from the measurand itself into an electrical output, with no excitation: a thermocouple generates an EMF, a piezoelectric crystal a charge, a photodiode a current.
:::

The distinction decides the interface. A modulating sensor's output can be made larger by increasing the excitation — until self-heating or power limits intervene — and can be measured **ratiometrically**, so that excitation errors cancel. A self-generating sensor's output is fixed by physics, often tiny, and must be read without drawing much energy from it; its source impedance — a few ohms for a thermocouple, a capacitor of a nanofarad for a piezoelectric crystal, a current source shunted by picofarads for a photodiode — dictates the amplifier.

### Dynamic behaviour

A sensor responds to change with a lag. Many temperature sensors, and any sensor whose response is limited by one energy store, behave as first-order systems; mass–spring sensors such as accelerometers and pressure diaphragms behave as second-order systems. The step and frequency responses of such systems are those of [[signals-systems/systems]] and [[circuits-1/first-order-circuits]]; what is new here is where the parameters come from.

::: theorem First-order thermal sensor {#thm-thermal}
A sensor of mass $m$, specific heat capacity $c$ and surface area $A$, exchanging heat with a fluid at temperature $T_f(t)$ through a heat-transfer coefficient $h$, and with uniform internal temperature $T_s$, obeys

$$
\tau\frac{\dd T_s}{\dd t} + T_s = T_f(t), \qquad \tau = \frac{mc}{hA}.
$$ {#eq-thermal}

After a step of the fluid temperature from $T_0$ to $T_1$ at $t = 0$, $T_s(t) = T_1 - (T_1 - T_0)e^{-t/\tau}$.
:::

::: proof
The heat flowing into the sensor through its surface is $hA(T_f - T_s)$ (Newton's law of cooling) and equals the rate of increase of its stored energy, $mc\,\dd T_s/\dd t$. Dividing by $hA$ gives [[#eq-thermal]]. The step response is the standard solution of a first-order linear equation with constant input. The assumption of uniform temperature (a "lumped" sensor) is good when the Biot number $hL/\kappa$ is below about $0.1$, $L$ being volume divided by surface area and $\kappa$ the sensor's thermal conductivity; for metal beads in air or water it holds easily.
:::

The time constant is a property of the sensor *and its environment*: the same probe can have $\tau$ of half a second in stirred water and half a minute in still air, because $h$ differs by a factor of $50$. Data sheets therefore state $\tau$ for specified conditions, such as "in water flowing at $0.2\,\mathrm{m/s}$".

::: example Time constant of a thermocouple bead {#ex-bead}
A thermocouple junction is a sphere of diameter $D = 1\,\mathrm{mm}$, density $8500\,\mathrm{kg/m^3}$ and specific heat $400\,\mathrm{J/(kg\,K)}$. Estimate its time constant in still air ($h = 20\,\mathrm{W/(m^2K)}$) and in water ($h = 1000\,\mathrm{W/(m^2K)}$). How long after a step must one wait in air for the error to be below $1\,\%$ of the step?
::: solution
For a sphere $m/A = \rho(\pi D^3/6)/(\pi D^2) = \rho D/6$, so $\tau = \rho cD/(6h)$. In air: $\tau = 8500\times400\times10^{-3}/(6\times20) = 28.3\,\mathrm{s}$. In water: $\tau = 3400\times10^{-3}/6000 = 0.57\,\mathrm{s}$. The error after time $t$ is $e^{-t/\tau}$ of the step; $e^{-t/\tau} = 0.01$ gives $t = \tau\ln100 = 4.6\tau = 130\,\mathrm{s}$ in air. A finer wire or bead helps in proportion to $D$; a $0.1\,\mathrm{mm}$ junction in air has $\tau \approx 3\,\mathrm{s}$.
:::
:::

::: widget plot
f: 1 - exp(-x/tau); 1 - exp(-x/(tau/10))
x: 0, 60
y: 0, 1.1
sliders: tau=28:1:60:1
labels: \text{bead in still air}; \text{same bead, } h \times 10
hlines: 0.632; 0.99
caption: Normalised response of a first-order temperature sensor to a step, against time in seconds, for time constant $\tau$ (slider) and for the same sensor with ten times the heat-transfer coefficient. The output reaches $63.2\,\%$ of the step at $t = \tau$ and $99\,\%$ at $4.6\tau$. Notice how a sensor that looks "slow" in air becomes fast when the fluid is stirred: the environment is part of the sensor's dynamics.
:::

## Resistive sensors {#sec-resistive}

### Resistance temperature detectors

The resistance of a pure metal rises almost linearly with temperature, because lattice vibrations scatter conduction electrons more strongly. Platinum is the metal of choice: it is chemically inert, can be made very pure, and its resistance–temperature relation is stable for years. A **resistance temperature detector** (RTD) is a platinum wire coil or thin film; the **Pt100** has $R_0 = 100\,\Omega$ at $0\,^\circ\mathrm{C}$, and Pt1000 elements ($1000\,\Omega$) are common in battery-powered systems.

::: definition Callendar–Van Dusen equation (IEC 60751) {#def-cvd}
The resistance of an industrial platinum RTD is

$$
R(T) = R_0\left(1 + AT + BT^2\right), \qquad 0 \le T \le 850\,^\circ\mathrm{C},
$$ {#eq-cvd}

with an additional term $R_0C(T - 100)T^3$ below $0\,^\circ\mathrm{C}$, where $T$ is in degrees Celsius and, for the standard platinum of IEC 60751, $A = 3.9083\times10^{-3}\,^\circ\mathrm{C}^{-1}$, $B = -5.775\times10^{-7}\,^\circ\mathrm{C}^{-2}$, $C = -4.183\times10^{-12}\,^\circ\mathrm{C}^{-4}$. The mean coefficient between $0$ and $100\,^\circ\mathrm{C}$, $\alpha = (R_{100} - R_0)/(100R_0) = 0.003\,85\,^\circ\mathrm{C}^{-1}$, identifies the grade.
:::

A Pt100 therefore reads $138.51\,\Omega$ at $100\,^\circ\mathrm{C}$ and changes by about $0.39\,\Omega/^\circ\mathrm{C}$ near room temperature: a sensitivity of $0.39\,\%$ per kelvin of $R$, small enough that the leads (a few ohms of copper) matter, which is why RTDs are wired with three or four conductors ([[instrumentation/bridges-signal-conditioning]]). Tolerance classes AA, A and B allow deviations at $0\,^\circ\mathrm{C}$ of $\pm0.10$, $\pm0.15$ and $\pm0.30\,^\circ\mathrm{C}$ respectively, growing with $\lvert T\rvert$.

The RTD is a modulating sensor: to read it we pass a current, and that current heats it. The **self-heating** error is $\Delta T = P/\delta$, where $P = I^2R$ is the dissipated power and $\delta$ the **dissipation constant** (in $\mathrm{mW/K}$) for the mounting and medium; data sheets often quote its inverse, a self-heating coefficient in $\mathrm{K/mW}$.

::: example Reading a Pt100 {#ex-rtd}
A Pt100 is measured with a $5\,\mathrm{mA}$ excitation current and its resistance found to be $110.00\,\Omega$. Its self-heating coefficient in the moving air of the installation is $0.2\,\mathrm{K/mW}$. Find the temperature of the element, the self-heating error, and the error with an excitation of $1\,\mathrm{mA}$.
::: solution
Solve [[#eq-cvd]] for $T$: $BT^2 + AT + (1 - R/R_0) = 0$, so

$$
T = \frac{-A + \sqrt{A^2 - 4B(1 - R/R_0)}}{2B} = \frac{-3.9083\times10^{-3} + \sqrt{1.527\,48\times10^{-5} + 4\times5.775\times10^{-7}\times(-0.1)}}{2\times(-5.775\times10^{-7})} = 25.68\,^\circ\mathrm{C}.
$$

(The other root is far outside the range.) The power is $I^2R = (5\times10^{-3})^2\times110 = 2.75\,\mathrm{mW}$, so the element is $2.75\times0.2 = 0.55\,\mathrm{K}$ hotter than the air: the air is at about $25.13\,^\circ\mathrm{C}$. At $1\,\mathrm{mA}$ the power is $0.11\,\mathrm{mW}$ and the error $0.022\,\mathrm{K}$, twenty-five times smaller, because $P \propto I^2$. The price is a signal five times smaller ($110\,\mathrm{mV}$ instead of $550\,\mathrm{mV}$, and a sensitivity of $0.39\,\mathrm{mV/K}$), which is no problem for a modern ADC.
:::
:::

### Thermistors

A **thermistor** is a ceramic semiconductor (usually a sintered mixture of manganese, nickel and cobalt oxides) whose resistance falls steeply with temperature: a **negative temperature coefficient** (NTC) device. The number of charge carriers grows roughly as $e^{-E_a/kT}$, which suggests the **β model**

$$
R(T) = R_{25}\exp\!\left[\beta\left(\frac1T - \frac{1}{T_{25}}\right)\right],
$$ {#eq-beta}

with $T$ in kelvins, $T_{25} = 298.15\,\mathrm{K}$ and $\beta$ typically $3000$–$4500\,\mathrm{K}$. Its relative sensitivity is $\frac1R\frac{\dd R}{\dd T} = -\beta/T^2$, about $-4.4\,\%/\mathrm{K}$ at $25\,^\circ\mathrm{C}$ for $\beta = 3950\,\mathrm{K}$: more than ten times that of platinum. The price is strong non-linearity — a $10\,\mathrm{k\Omega}$ NTC has about $33.6\,\mathrm{k\Omega}$ at $0\,^\circ\mathrm{C}$ and $0.70\,\mathrm{k\Omega}$ at $100\,^\circ\mathrm{C}$ — a narrower useful range, and poorer long-term stability than platinum. Over wide ranges the **Steinhart–Hart equation** $1/T = a + b\ln R + c(\ln R)^3$, fitted to three calibration points, reaches millikelvin accuracy. **PTC** thermistors, by contrast, are mostly used as switches and self-resetting fuses, because their resistance rises abruptly above a transition temperature.

::: example A thermistor reading {#ex-ntc}
A $10\,\mathrm{k\Omega}$ NTC thermistor with $\beta = 3950\,\mathrm{K}$ reads $3.60\,\mathrm{k\Omega}$. Find the temperature. What resistance change corresponds to $0.1\,\mathrm{K}$ at this temperature?
::: solution
Invert [[#eq-beta]]: $\dfrac1T = \dfrac{1}{T_{25}} + \dfrac1\beta\ln\dfrac{R}{R_{25}} = \dfrac{1}{298.15} + \dfrac{\ln0.36}{3950} = 3.3540\times10^{-3} - 2.587\times10^{-4} = 3.0954\times10^{-3}\,\mathrm{K^{-1}}$, so $T = 323.06\,\mathrm{K} = 49.9\,^\circ\mathrm{C}$. The sensitivity there is $-\beta/T^2 = -3950/323.06^2 = -3.78\,\%/\mathrm{K}$, so $0.1\,\mathrm{K}$ changes $R$ by $0.378\,\%$, or $13.6\,\Omega$. A Pt100 at the same temperature would change by $0.038\,\Omega$ — about three hundred and fifty times less in absolute terms.
:::
:::

::: widget plot
f: exp(b*(1/(x + 273.15) - 1/298.15)); (1 + 3.9083e-3*x - 5.775e-7*x^2)/(1 + 3.9083e-3*25 - 5.775e-7*625)
x: -20, 120
y: 0, 4
sliders: b=3950:3000:4500:50
labels: \text{NTC } R/R_{25}; \text{Pt100 } R/R_{25}
caption: Resistance normalised to its $25\,^\circ\mathrm{C}$ value against temperature (°C) for an NTC thermistor with parameter $\beta$ (slider) and for a platinum RTD. The thermistor changes by a factor of about fifty over this range, the RTD by about $50\,\%$ and almost linearly. Increase $\beta$: the thermistor becomes more sensitive and even less linear.
:::

### Strain gauges

A **strain gauge** is a thin metal-foil grid (or, in semiconductor gauges, a doped silicon strip) bonded to a surface; when the surface stretches, the grid lengthens and narrows and its resistance rises.

::: theorem Gauge factor {#thm-gauge}
A conductor of resistivity $\rho$, length $L$ and cross-section $A$, subjected to an axial strain $\varepsilon = \dd L/L$ with Poisson's ratio $\nu$, changes its resistance by

$$
\frac{\Delta R}{R} = G\,\varepsilon, \qquad G = 1 + 2\nu + \frac{\Delta\rho/\rho}{\varepsilon},
$$ {#eq-gauge}

where $G$ is the **gauge factor**.
:::

::: proof
From $R = \rho L/A$, logarithmic differentiation gives $\dd R/R = \dd\rho/\rho + \dd L/L - \dd A/A$. The lateral dimensions shrink by $-\nu\varepsilon$ each, so for a section of any shape $\dd A/A = -2\nu\varepsilon$ to first order. Substituting $\dd L/L = \varepsilon$ gives $\dd R/R = \varepsilon(1 + 2\nu) + \dd\rho/\rho$; dividing by $\varepsilon$ defines $G$.
:::

The first two terms are purely geometric: with $\nu \approx 0.3$ they give $1.6$. The third is the **piezoresistive** effect, the change of resistivity with stress. For the constantan (copper–nickel) and Karma (nickel–chromium) alloys of foil gauges it adds about $0.4$, making $G \approx 2.0$; for doped silicon it dominates, giving gauge factors of $50$–$200$ with either sign, depending on doping and crystal orientation. Silicon piezoresistors diffused into a thin diaphragm are the basis of most MEMS pressure sensors.

Strains in engineering structures are small: steel ($E = 200\,\mathrm{GPa}$) at a working stress of $200\,\mathrm{MPa}$ has $\varepsilon = 10^{-3}$, i.e. $1000\,\mu\varepsilon$ (**microstrain**). A $120\,\Omega$ gauge with $G = 2$ then changes by $0.24\,\Omega$, or $0.2\,\%$, and a $1\,\mu\varepsilon$ resolution requires measuring $\Delta R/R = 2\times10^{-6}$. That is why gauges are always used in bridges. Temperature is the main enemy: the resistance of the grid and the differential expansion between gauge and specimen produce an **apparent strain** that can be several microstrain per kelvin. Foils are therefore **self-temperature-compensated** — alloyed so that their temperature coefficient cancels the expansion mismatch for a given specimen material (steel, aluminium) — and bridges use dummy or active gauges in adjacent arms so that thermal effects cancel.

::: quiz
Which of these is a self-generating sensor?
- [ ] A platinum RTD
- [ ] A foil strain gauge
- [x] A type K thermocouple
- [ ] A differential capacitive displacement sensor
::: solution
The thermocouple produces its own EMF from the temperature difference between its junctions; no excitation is needed. The RTD, strain gauge and capacitive sensor change an electrical property (resistance, capacitance) and produce an output only when excited, in proportion to the excitation.
:::
:::

## Capacitive, inductive and magnetic sensors {#sec-capacitive}

### Capacitive sensors

A parallel-plate capacitor with overlap area $A$, gap $d$ and dielectric permittivity $\varepsilon = \varepsilon_r\varepsilon_0$ has $C = \varepsilon A/d$ (ignoring fringing). The measurand can change any of the three: a moving plate changes $d$ (displacement, pressure, acceleration), a sliding plate changes $A$ (angle, linear position), a dielectric changes $\varepsilon_r$ (liquid level, humidity, proximity of a finger in a touch screen). Capacitances are small — two $10\times10\,\mathrm{mm}$ plates $100\,\mathrm{\mu m}$ apart in air make $8.85\,\mathrm{pF}$ — so stray capacitances of cables and the circuit can be comparable, and capacitive sensors are read with AC excitation, guarded electrodes and the amplifier close by.

Gap variation is inherently non-linear: $C = \varepsilon A/(d_0 + x)$. The cure is the **differential capacitor**, a centre plate between two fixed plates, so that one gap shrinks as the other grows.

::: proposition Differential capacitive sensor {#prop-diffcap}
For a centre electrode displaced by $x$ between two fixed electrodes at nominal gaps $d_0$, with $C_1 = \varepsilon A/(d_0 - x)$ and $C_2 = \varepsilon A/(d_0 + x)$,

$$
\frac{C_1 - C_2}{C_1 + C_2} = \frac{x}{d_0}
$$ {#eq-diffcap}

exactly, for any $\lvert x\rvert < d_0$.
:::

::: proof
$C_1 - C_2 = \varepsilon A\,\dfrac{(d_0 + x) - (d_0 - x)}{d_0^2 - x^2} = \dfrac{2\varepsilon Ax}{d_0^2 - x^2}$ and $C_1 + C_2 = \dfrac{2\varepsilon Ad_0}{d_0^2 - x^2}$; their ratio is $x/d_0$.
:::

A circuit that measures this ratio — for instance a capacitive half-bridge driven by antiphase sinusoids, whose centre electrode voltage is proportional to $(C_1 - C_2)/(C_1 + C_2)$ — is therefore linear in displacement and independent of $\varepsilon$, which removes humidity and temperature effects on the dielectric to first order.

### MEMS accelerometers

A MEMS accelerometer is a proof mass $m$ of silicon suspended on springs of total stiffness $k$, with interdigitated comb fingers forming a differential capacitor. An acceleration $a$ of the frame displaces the mass relative to it; at frequencies well below resonance, Newton's law with the spring force gives $kx = ma$, so

$$
x = \frac{a}{\omega_n^2}, \qquad \omega_n = \sqrt{k/m}.
$$ {#eq-accel}

Above the static region the mass–spring–damper is a second-order system with natural frequency $\omega_n$ and damping ratio $\zeta$ set by squeeze-film damping of the gas in the gaps; the relative displacement follows $X/A = 1/(\omega_n^2 - \omega^2 + 2j\zeta\omega_n\omega)$. The design trade-off is plain from [[#eq-accel]]: a high resonance gives bandwidth but a tiny displacement per $g$.

::: example Displacement in a MEMS accelerometer {#ex-mems}
A MEMS accelerometer has a resonance of $5\,\mathrm{kHz}$. Find the proof-mass displacement for $1\,g = 9.81\,\mathrm{m/s^2}$. If its comb capacitors have $d_0 = 2\,\mathrm{\mu m}$ and $C_0 = 100\,\mathrm{fF}$ each, find the differential capacitance change $C_1 - C_2$.
::: solution
By [[#eq-accel]], $x = 9.81/(2\pi\times5000)^2 = 9.81/9.87\times10^8 = 9.94\,\mathrm{nm}$: about forty silicon atoms. With [[#eq-diffcap]] and $C_1 + C_2 \approx 2C_0$ for small $x$, $C_1 - C_2 \approx 2C_0x/d_0 = 200\,\mathrm{fF}\times9.94\times10^{-3}/2 = 0.99\,\mathrm{fF}$ per $g$. Resolving $1\,\mathrm{m}g$ means resolving $1\,\mathrm{aF}$ ($10^{-18}\,\mathrm{F}$), which is only possible because the readout circuit sits on the same chip, a few micrometres from the electrodes, with no cable capacitance at all.
:::
:::

::: widget plot
f: 1/sqrt((1 - x^2)^2 + (2*z*x)^2); 1 + 0*x
x: 0, 3
y: 0, 4
sliders: z=0.1:0.05:1.5:0.05
labels: \lvert X\omega_n^2/A\rvert; \text{ideal}
caption: Normalised response of a mass–spring accelerometer against frequency relative to resonance, $\omega/\omega_n$, for damping ratio $\zeta$ (slider). Lightly damped sensors ($\zeta = 0.1$) are flat to within $5\,\%$ only up to about $0.22\,\omega_n$, then resonate; with $\zeta \approx 0.65$–$0.7$ the response stays within a few per cent to about $0.5\,\omega_n$. Piezoelectric accelerometers are nearly undamped and are used well below their resonance; MEMS sensors are often gas-damped close to $0.7$.
:::

### Inductive and magnetic sensors

The **linear variable differential transformer** (LVDT) has one primary and two secondary coils on a tube, with a movable ferromagnetic core. Excited by a sinusoid of a few kilohertz, the primary induces voltages in the two secondaries that depend on the core position; the secondaries are connected in series opposition, so the output amplitude is proportional to displacement from the centre and its phase (in or out of phase with the excitation) gives the direction. It is contactless, rugged and has essentially infinite resolution; its signal is recovered by synchronous demodulation ([[instrumentation/bridges-signal-conditioning]]). **Eddy-current** proximity probes use the change in a coil's impedance as a conductive target approaches; they measure shaft vibration in turbines with micrometre resolution.

The **Hall effect** gives a direct measurement of magnetic flux density. In a thin conducting strip of thickness $t$ carrying a current $I$ along its length in a perpendicular field $B$, the magnetic force pushes the carriers to one edge until the resulting transverse field balances it: $qE_y = qv_dB$. With $I = nqv_d\cdot wt$ and $V_H = E_yw$,

$$
V_H = \frac{IB}{nqt} = R_H\frac{IB}{t}, \qquad R_H = \frac{1}{nq}.
$$ {#eq-hall}

The output is largest for a low carrier density $n$, so Hall elements are semiconductors (silicon, GaAs, InSb), not metals. A GaAs element with $n = 5\times10^{21}\,\mathrm{m^{-3}}$, $t = 10\,\mathrm{\mu m}$ and $I = 1\,\mathrm{mA}$ gives $V_H = 10^{-3}\times0.1/(5\times10^{21}\times1.602\times10^{-19}\times10^{-5}) = 12.5\,\mathrm{mV}$ at $0.1\,\mathrm{T}$. Integrated silicon Hall sensors with on-chip offset cancellation (current spinning) are used for current sensing, brushless-motor commutation and contactless position sensing.

## Self-generating sensors {#sec-selfgen}

### Thermocouples

When two different conductors A and B are joined at both ends and the junctions are at different temperatures, an EMF appears in the loop: the **Seebeck effect**. Each conductor contributes an EMF along its length proportional to the temperature gradient, with a material-dependent **Seebeck coefficient** $S(T)$; the loop EMF is

$$
E = \int_{T_r}^{T_m}\big(S_A(T) - S_B(T)\big)\,\dd T,
$$ {#eq-seebeck}

where $T_m$ is the measuring ("hot") junction and $T_r$ the reference ("cold") junction. The EMF is generated in the wires where the temperature changes, not at the junctions; the junctions merely define the temperatures at the two ends of the pair.

::: theorem Laws of thermoelectric circuits {#thm-tc-laws}
For homogeneous conductors:

1. **Homogeneous circuit**: a circuit of a single homogeneous material produces no EMF, whatever the temperature distribution.
2. **Intermediate metals**: inserting a third conductor C into the circuit does not change the EMF provided both junctions with C are at the same temperature.
3. **Intermediate temperatures**: $E_{AB}(T_1, T_3) = E_{AB}(T_1, T_2) + E_{AB}(T_2, T_3)$.
:::

::: proof
All three follow from [[#eq-seebeck]], in which each wire contributes $\int S\,\dd T$ along its length, depending only on the temperatures at its ends. (1) Going round a loop of one material, the integral of $S(T)\,\dd T$ returns to its starting temperature, so its total is zero. (2) A conductor C whose two ends are at the same temperature contributes $\int_{T}^{T}S_C\,\dd T = 0$. (3) The integral from $T_3$ to $T_1$ splits at $T_2$.
:::

The second law is what makes thermocouples usable: the copper terminals of a voltmeter introduce two extra junctions, but if both are at the same temperature (on an **isothermal block**) they add nothing. The third law is the basis of **cold-junction compensation**: tables and polynomials (IEC 60584 / NIST ITS-90) give $E(T, 0\,^\circ\mathrm{C})$; if the reference junction is at $T_r$, we measure $E(T_m, T_r)$, measure $T_r$ with another sensor (a thermistor or silicon sensor on the terminal block), add $E(T_r, 0)$ and look up $T_m$.

| type | conductors | approx. $S$ at $25\,^\circ\mathrm{C}$ | typical range |
|---|---|---|---|
| K | Chromel / Alumel (Ni–Cr / Ni–Al) | $41\,\mathrm{\mu V/K}$ | $-200$ to $1250\,^\circ\mathrm{C}$ |
| J | Fe / Constantan | $52\,\mathrm{\mu V/K}$ | $-40$ to $750\,^\circ\mathrm{C}$ |
| T | Cu / Constantan | $41\,\mathrm{\mu V/K}$ | $-200$ to $350\,^\circ\mathrm{C}$ |
| N | Nicrosil / Nisil | $27\,\mathrm{\mu V/K}$ | $-200$ to $1250\,^\circ\mathrm{C}$ |
| S | Pt–10 % Rh / Pt | $6\,\mathrm{\mu V/K}$ | $0$ to $1600\,^\circ\mathrm{C}$ |

::: example Cold-junction compensation {#ex-cjc}
A type K thermocouple is connected to a terminal block at $25\,^\circ\mathrm{C}$, and the voltmeter reads $7.138\,\mathrm{mV}$. The reference tables give $E(25\,^\circ\mathrm{C}, 0) = 1.000\,\mathrm{mV}$, $E(200\,^\circ\mathrm{C}, 0) = 8.138\,\mathrm{mV}$ and $E(175\,^\circ\mathrm{C}, 0) = 7.140\,\mathrm{mV}$. What is the hot-junction temperature, and what would be reported without compensation? What is the effect of a $0.5\,^\circ\mathrm{C}$ error in the cold-junction sensor?
::: solution
By the law of intermediate temperatures, $E(T_m, 0) = E(T_m, 25) + E(25, 0) = 7.138 + 1.000 = 8.138\,\mathrm{mV}$, so $T_m = 200\,^\circ\mathrm{C}$. Without compensation one would look up $7.138\,\mathrm{mV}$ directly and report about $175\,^\circ\mathrm{C}$: an error of $25\,^\circ\mathrm{C}$, roughly the cold-junction temperature. A $0.5\,^\circ\mathrm{C}$ error in $T_r$ changes $E(T_r, 0)$ by about $0.5\times41 = 20\,\mathrm{\mu V}$, which at the hot junction (where $S \approx 40\,\mathrm{\mu V/K}$) is again about $0.5\,^\circ\mathrm{C}$: cold-junction errors pass straight through. Cold-junction compensation is usually the largest error of a thermocouple channel after the thermocouple's own tolerance ($\pm1.5\,^\circ\mathrm{C}$ or $\pm0.4\,\%$ for class 1 type K).
:::
:::

::: warning Thermocouple voltages are tiny, and every joint is a thermocouple
At $41\,\mathrm{\mu V/K}$, a $0.1\,^\circ\mathrm{C}$ resolution needs $4\,\mathrm{\mu V}$ — below the offset of many amplifiers. Connectors and extension cables must be of the matching alloys (or of "compensating" alloys with the same Seebeck coefficient over their limited temperature range): copper wire in the hot zone of a type K circuit creates junctions at unknown temperatures. Conversely, in *any* low-level DC measurement, copper–tin solder joints ($\approx 1$–$3\,\mathrm{\mu V/K}$), copper–Kovar IC leads ($\approx 40\,\mathrm{\mu V/K}$) and relay contacts form parasitic thermocouples. Keep junctions in pairs at the same temperature, away from heat sources.
:::

::: quiz
A type K thermocouple is extended from the furnace to the instrument with ordinary copper wire, joined to the thermocouple leads in a connection box that sits at $60\,^\circ\mathrm{C}$. The instrument compensates for its own terminals at $25\,^\circ\mathrm{C}$. What happens?
- [ ] Nothing: copper is a good conductor and adds no EMF
- [x] The reading is about $35\,^\circ\mathrm{C}$ too low, because the effective cold junction is now at $60\,^\circ\mathrm{C}$
- [ ] The reading is about $35\,^\circ\mathrm{C}$ too high
- [ ] The reading becomes random
::: solution
The thermocouple pair now ends at the connection box: the copper extensions form a homogeneous pair from $60$ to $25\,^\circ\mathrm{C}$ (both copper) and add no net EMF. So the measured EMF is $E(T_m, 60)$, but the instrument adds $E(25, 0)$ instead of $E(60, 0)$. The result is low by $E(60, 25) \approx 35\times41\,\mathrm{\mu V} = 1.4\,\mathrm{mV}$, i.e. about $35\,^\circ\mathrm{C}$. Extension cables must be of thermocouple alloy, so that the cold junction stays at the instrument.
:::
:::

### Piezoelectric sensors

Quartz, lithium niobate and poled ferroelectric ceramics such as lead zirconate titanate (PZT) develop a charge proportional to applied stress: the **direct piezoelectric effect**. For a force $F$ applied along the polarisation axis of a plate,

$$
q = d\,F,
$$ {#eq-piezo}

with the **piezoelectric charge coefficient** $d$ about $2.3\,\mathrm{pC/N}$ for quartz ($d_{11}$) and $300$–$600\,\mathrm{pC/N}$ for PZT ($d_{33}$). Quartz is extremely stable and linear and has almost no pyroelectric response; PZT is far more sensitive but drifts with temperature and age.

Electrically the sensor is a charge source $q(t)$ in parallel with its own capacitance $C_s$ and a very high leakage resistance. No piezoelectric sensor can measure a truly static force: the charge leaks away through the insulation and the amplifier input. It measures *changes* — vibration, shock, dynamic pressure — down to a low cut-off frequency set by the interface. The interface of choice is the **charge amplifier**, an inverting op-amp integrator with feedback capacitor $C_f$ shunted by a large resistor $R_f$.

::: proposition Charge amplifier {#prop-charge-amp}
A charge source $q$ with sensor capacitance $C_s$ and cable capacitance $C_c$ drives the inverting input of an amplifier of gain $-A$ with feedback capacitor $C_f$. Then

$$
v_o = -\frac{q}{C_f\left(1 + \dfrac1A\right) + \dfrac{C_s + C_c}{A}} \approx -\frac{q}{C_f},
$$ {#eq-charge-amp}

so the output is independent of the cable to first order. With $R_f$ across $C_f$, the response is high-pass with cut-off $f_L = 1/(2\pi R_fC_f)$.
:::

::: proof
The charge $q$ released by the sensor must reside on the capacitances connected to the input node: $C_s + C_c$ to ground, at voltage $v_-$, and $C_f$, with voltage $v_- - v_o$ across it. Conservation of charge gives $q = (C_s + C_c)v_- + C_f(v_- - v_o)$. With $v_o = -Av_-$, $v_- = -v_o/A$, and solving for $v_o$ gives [[#eq-charge-amp]]. With $R_f$ in parallel with $C_f$, the feedback impedance becomes $R_f/(1 + j\omega R_fC_f)$; for an ideal amplifier the transfer from the sensor current $i = \dd q/\dd t$ is $v_o = -iZ_f$, so $V_o/Q = -j\omega R_f/(1 + j\omega R_fC_f)$, a first-order high-pass with corner $1/(R_fC_f)$ that tends to $-1/C_f$ above it.
:::

::: example Designing a charge amplifier {#ex-charge-design}
A quartz force sensor ($d = 2.3\,\mathrm{pC/N}$, $C_s = 20\,\mathrm{pF}$) is connected through $5\,\mathrm{m}$ of low-noise cable ($100\,\mathrm{pF/m}$) to a charge amplifier. Choose $C_f$ for a $\pm5\,\mathrm{V}$ output at $\pm1\,\mathrm{kN}$, and $R_f$ for a low-frequency cut-off of $0.1\,\mathrm{Hz}$. If the op-amp's open-loop gain at the signal frequency is $10^4$, what is the gain error caused by the cable?
::: solution
At $1\,\mathrm{kN}$, $q = 2.3\times10^{-12}\times1000 = 2.3\,\mathrm{nC}$. For $5\,\mathrm{V}$: $C_f = q/v_o = 2.3\times10^{-9}/5 = 460\,\mathrm{pF}$; choose $470\,\mathrm{pF}$, giving $4.89\,\mathrm{V/kN}$, and trim or calibrate. For $f_L = 0.1\,\mathrm{Hz}$: $R_f = 1/(2\pi\times0.1\times470\times10^{-12}) = 3.4\,\mathrm{G\Omega}$, a value available as a special high-value resistor (or synthesised with a T-network). The input capacitance is $C_s + C_c = 20 + 500 = 520\,\mathrm{pF}$, and by [[#eq-charge-amp]] the relative gain error is $(C_f + C_s + C_c)/(AC_f) = (470 + 520)/(10^4\times470) = 2.1\times10^{-4}$, i.e. $0.02\,\%$. Had we used a voltage amplifier across the sensor, the output would have been $q/(C_s + C_c)$, changing by $96\,\%$ between no cable and $5\,\mathrm{m}$ of it.
:::
:::

### Photodiodes

A **photodiode** is a p–n (or p–i–n) junction in which absorbed photons create electron–hole pairs that the junction field separates. Each photon of energy $hc/\lambda$ produces on average $\eta$ carriers (the **quantum efficiency**), so the photocurrent per watt of optical power, the **responsivity**, is

$$
\mathcal{R} = \frac{I_p}{P} = \frac{\eta q\lambda}{hc} \approx \eta\,\frac{\lambda}{1.2398\,\mathrm{\mu m}}\ \mathrm{A/W}.
$$ {#eq-responsivity}

A silicon photodiode with $\eta = 0.8$ at $850\,\mathrm{nm}$ has $\mathcal{R} = 0.548\,\mathrm{A/W}$. Silicon absorbs from about $400$ to $1100\,\mathrm{nm}$ (its band gap of $1.12\,\mathrm{eV}$ sets the long-wavelength limit); InGaAs covers $900$–$1700\,\mathrm{nm}$ for fibre-optic wavelengths. The photocurrent is linear in optical power over seven to nine decades provided the diode voltage is held constant. That is the job of the **transimpedance amplifier** (TIA): an op-amp with feedback resistor $R_f$ holds the diode at zero bias (**photovoltaic mode**, lowest dark current and noise, best for precision light measurement) or at a reverse bias (**photoconductive mode**, lower junction capacitance and higher speed), and outputs $v_o = I_pR_f$. Its design — the diode capacitance and $R_f$ form a pole that must be compensated by a small capacitor across $R_f$ — is an application of [[electronics-2/stability-compensation]]. Photodiodes and their detector physics are treated in depth in [[photonics]].

## Choosing a sensor {#sec-choosing}

The physical principle is only the start. A practical choice weighs range, accuracy and stability against cost, size, environment and the interface the principle demands.

| measurand | sensor | typical accuracy | output / interface |
|---|---|---|---|
| temperature, $-200$ to $850\,^\circ\mathrm{C}$ | Pt RTD | $0.1$–$0.5\,^\circ\mathrm{C}$ | $0.39\,\Omega/\mathrm{K}$, current excitation, 3- or 4-wire |
| temperature, $-50$ to $150\,^\circ\mathrm{C}$ | NTC thermistor | $0.1$–$1\,^\circ\mathrm{C}$ | $-4\,\%/\mathrm{K}$, divider, linearisation |
| temperature, up to $1700\,^\circ\mathrm{C}$ | thermocouple | $1$–$2\,^\circ\mathrm{C}$ | $6$–$50\,\mathrm{\mu V/K}$, CJC, low-offset amplifier |
| strain, force, pressure | foil gauge, silicon piezoresistor | $0.02$–$0.5\,\%$ FS | $\Delta R/R \sim 10^{-3}$, bridge |
| dynamic force, vibration | piezoelectric | $1$–$5\,\%$ | charge, charge amplifier, no DC |
| acceleration, tilt | MEMS capacitive | $1$–$5\,\%$ | integrated, digital output |
| position | LVDT, capacitive, Hall | $0.1$–$1\,\%$ FS | AC excitation and demodulation |
| light | Si / InGaAs photodiode | $1$–$5\,\%$ | current, transimpedance amplifier |

::: application Smart sensors
As of 2026, many sensors arrive with their interface integrated: a MEMS inertial unit, a digital temperature sensor or a pressure sensor contains the transducer, a low-noise front end, an ADC, calibration coefficients in non-volatile memory and a digital interface (I²C, SPI, or IO-Link and fieldbuses in industry). The engineer then specifies rather than designs the front end, but the questions of this chapter remain: what is the transducer's intrinsic non-linearity and drift, how was the calibration done, what is its uncertainty, and how does the package couple stress and heat into the sensing element? A digital output with sixteen bits is not a sixteen-bit accurate measurement.
:::

## Where this leads

The small resistance changes of RTDs and strain gauges become measurable voltages in the bridges of [[instrumentation/bridges-signal-conditioning]], which also treats excitation, lead-wire compensation, linearisation and the synchronous demodulation needed by LVDTs and capacitive sensors. The microvolt outputs of thermocouples and bridges, contaminated by common-mode voltages, are recovered by the instrumentation amplifiers of [[instrumentation/instrumentation-amplifiers]], and digitised as in [[instrumentation/data-acquisition]]. The device physics behind semiconductor sensors — Hall elements, piezoresistors, photodiodes — is in [[semiconductor-devices]], and the mechatronic use of sensors in control loops in the Mechanical Atlas [signal conditioning](/learn/mechanical/lesson.php?c=mechatronics&l=signal-conditioning) chapter.

::: history
Thomas Johann Seebeck observed the thermoelectric effect in 1821, and Henri Le Chatelier made the platinum/platinum–rhodium thermocouple a practical pyrometer in 1886. William Siemens proposed the platinum resistance thermometer in his Bakerian Lecture of 1871; Hugh Longbourne Callendar showed in 1887 how to make it stable and accurate, and Milton Van Dusen added the low-temperature term of the equation that bears both their names in 1925. Edwin Hall discovered his effect in 1879 as a graduate student at Johns Hopkins, and Pierre and Jacques Curie the direct piezoelectric effect in 1880. William Thomson (Lord Kelvin) had noted the change of resistance of stretched wires in 1856; the bonded wire strain gauge was invented independently by Edward Simmons and Arthur Ruge in 1938, and Charles Smith's 1954 measurements of the large piezoresistive effect in silicon and germanium at Bell Labs led to semiconductor gauges and MEMS pressure sensors. Analog Devices' ADXL50 (1991), with its sensor and electronics on one chip, opened the market for MEMS accelerometers, first in car airbags and later in every phone.
:::

::: summary
- A sensor is characterised by its transfer characteristic, sensitivity, non-linearity (end-point or best-fit), hysteresis, offset, drift and dynamics; modulating sensors need excitation, self-generating ones do not.
- A lumped thermal sensor is first-order with $\tau = mc/(hA)$; the medium is part of the time constant.
- Platinum RTDs follow the Callendar–Van Dusen equation ($\approx 0.385\,\%/\mathrm{K}$, very stable); NTC thermistors follow the β model ($\approx -4\,\%/\mathrm{K}$, non-linear); self-heating is $P/\delta$.
- Strain gauges have $\Delta R/R = G\varepsilon$ with $G = 1 + 2\nu + (\Delta\rho/\rho)/\varepsilon$, about $2$ for metal foil and up to $200$ for silicon; signals are of order $10^{-3}$ and need bridges.
- Differential capacitive sensors are linear, $(C_1 - C_2)/(C_1 + C_2) = x/d_0$; MEMS accelerometers trade bandwidth for displacement, $x = a/\omega_n^2$; the Hall voltage is $IB/(nqt)$.
- Thermocouple EMF depends only on the two junction temperatures (for homogeneous wires); cold-junction compensation uses the law of intermediate temperatures.
- Piezoelectric sensors are charge sources, read by charge amplifiers ($v_o = -q/C_f$, independent of cable) with no DC response; photodiodes have responsivity $\eta q\lambda/hc$ and are read by transimpedance amplifiers.
:::

## Exercises

::: exercise Strain gauge resistance change {level=1 check="0.24"}
A $120\,\Omega$ foil strain gauge with gauge factor $2.0$ is bonded to steel strained to $1000\,\mu\varepsilon$. Find the change of resistance in ohms.
::: solution
$\Delta R = GR\varepsilon = 2.0\times120\times10^{-3} = 0.24\,\Omega$.
:::
:::

::: exercise A Pt100 at 50 °C {level=1 check="100*(1+3.9083e-3*50-5.775e-7*2500)"}
Find the resistance, in ohms, of an IEC 60751 Pt100 at $50\,^\circ\mathrm{C}$.
::: solution
$R = 100(1 + 3.9083\times10^{-3}\times50 - 5.775\times10^{-7}\times2500) = 100(1 + 0.195\,415 - 0.001\,444) = 119.397\,\Omega$.
:::
:::

::: exercise Responsivity {level=1 check="0.7*1.602176634e-19*650e-9/(6.62607015e-34*299792458)"}
A silicon photodiode has a quantum efficiency of $70\,\%$ at $650\,\mathrm{nm}$. Find its responsivity in amperes per watt.
::: solution
$\mathcal{R} = \eta q\lambda/(hc) = 0.7\times650/1239.84 = 0.367\,\mathrm{A/W}$.
:::
:::

::: exercise Waiting for a probe {level=2 check="10*ln(50)"}
A temperature probe with $\tau = 10\,\mathrm{s}$ is moved from $20\,^\circ\mathrm{C}$ air into a $70\,^\circ\mathrm{C}$ bath (assume $\tau$ is that in the bath). How many seconds must you wait before the reading is within $1\,^\circ\mathrm{C}$ of the bath temperature?
::: solution
The error is $50e^{-t/\tau}$; setting it to $1$ gives $t = \tau\ln50 = 39.1\,\mathrm{s}$.
:::
:::

::: exercise Thermocouple with a hot terminal block {level=2}
A type K thermocouple reads $4.096\,\mathrm{mV}$ at a terminal block whose temperature is $25\,^\circ\mathrm{C}$. Using $E(25, 0) = 1.000\,\mathrm{mV}$, $E(100, 0) = 4.096\,\mathrm{mV}$, $E(120, 0) = 4.920\,\mathrm{mV}$ and $E(130, 0) = 5.328\,\mathrm{mV}$, find the hot-junction temperature by linear interpolation.
::: solution
$E(T_m, 0) = 4.096 + 1.000 = 5.096\,\mathrm{mV}$. Between $120$ and $130\,^\circ\mathrm{C}$ the EMF rises by $0.408\,\mathrm{mV}$; $5.096 - 4.920 = 0.176\,\mathrm{mV}$, so $T_m = 120 + 10\times0.176/0.408 = 124.3\,^\circ\mathrm{C}$. Note that the reading happens to equal $E(100, 0)$: forgetting the cold junction would give $100\,^\circ\mathrm{C}$.
:::
:::

::: exercise A differential capacitor {level=2 check="2e-6*(1.1-1)/(1.1+1)"}
A differential capacitive displacement sensor has nominal gaps $d_0 = 2\,\mathrm{\mu m}$. The two capacitances are measured as $C_1 = 1.10\,\mathrm{pF}$ and $C_2 = 1.00\,\mathrm{pF}$. Find the displacement in metres.
::: solution
By [[#eq-diffcap]], $x = d_0(C_1 - C_2)/(C_1 + C_2) = 2\,\mathrm{\mu m}\times0.10/2.10 = 0.0952\,\mathrm{\mu m} = 95.2\,\mathrm{nm}$.
:::
:::

::: exercise Hall-effect current sensor {level=2}
A Hall element with $R_H/t = 100\,\mathrm{V/(A\,T)}$, biased at $2\,\mathrm{mA}$, sits in the gap of a ferrite ring around a conductor; the gap is $2\,\mathrm{mm}$ and the ferrite's permeability is high enough that all the magnetomotive force appears across the gap. Find the Hall voltage when the conductor carries $10\,\mathrm{A}$.
::: hint
Ampère's law around the ring: $Hl_{\text{gap}} \approx I$, and $B = \mu_0H$ in the gap.
:::
::: solution
$B = \mu_0I/l_{\text{gap}} = 4\pi\times10^{-7}\times10/0.002 = 6.28\,\mathrm{mT}$. Then $V_H = (R_H/t)IB = 100\times0.002\times6.28\times10^{-3} = 1.26\,\mathrm{mV}$. (Strictly $\mu_0$ is no longer exactly $4\pi\times10^{-7}\,\mathrm{H/m}$ in the 2019 SI, but the difference, a few parts in $10^{10}$, is irrelevant here.) Closed-loop sensors use this signal to drive a compensating winding that nulls the gap field, making the reading independent of the Hall element's sensitivity.
:::
:::

::: exercise Why semiconductors make good gauges {level=3}
(a) Derive [[#eq-gauge]]. (b) A silicon piezoresistor has a longitudinal piezoresistive coefficient $\pi_l = 7\times10^{-10}\,\mathrm{Pa^{-1}}$, so $\Delta\rho/\rho = \pi_l\sigma$, and Young's modulus $E = 169\,\mathrm{GPa}$ in the relevant direction. Estimate its gauge factor and compare it with a foil gauge. (c) What disadvantages balance the advantage?
::: solution
(a) See the proof of [[#thm-gauge]]: $\dd R/R = \dd\rho/\rho + \dd L/L - \dd A/A$, with $\dd A/A = -2\nu\varepsilon$.

(b) $\Delta\rho/\rho = \pi_lE\varepsilon$, so the piezoresistive term is $\pi_lE = 7\times10^{-10}\times1.69\times10^{11} = 118$. Adding $1 + 2\nu \approx 1.6$ gives $G \approx 120$, sixty times a foil gauge.

(c) The piezoresistive coefficients depend strongly on temperature (the gauge factor falls by roughly $0.1$–$0.3\,\%/\mathrm{K}$) and on doping, the resistance itself has a large temperature coefficient, and the response is non-linear at large strain. Silicon gauges therefore need careful temperature compensation, usually by placing four piezoresistors in a full bridge on the same diaphragm and calibrating the assembly over temperature.
:::
:::

::: exercise Cable capacitance with a voltage amplifier {level=3}
A PZT accelerometer has a charge sensitivity of $10\,\mathrm{pC}/g$ and a capacitance of $1\,\mathrm{nF}$. (a) It is connected to a voltage amplifier with $1\,\mathrm{G\Omega}$ input resistance through $3\,\mathrm{m}$ of $100\,\mathrm{pF/m}$ cable. Find the voltage sensitivity and the low-frequency cut-off. (b) The cable is replaced by $10\,\mathrm{m}$. What changes? (c) Repeat with a charge amplifier with $C_f = 1\,\mathrm{nF}$ and $R_f = 10\,\mathrm{G\Omega}$.
::: solution
(a) Total capacitance $1 + 0.3 = 1.3\,\mathrm{nF}$: sensitivity $10\,\mathrm{pC}/1.3\,\mathrm{nF} = 7.69\,\mathrm{mV}/g$; cut-off $1/(2\pi\times10^9\times1.3\times10^{-9}) = 0.122\,\mathrm{Hz}$.

(b) $2\,\mathrm{nF}$ total: $5.0\,\mathrm{mV}/g$ (a $35\,\%$ drop) and cut-off $0.080\,\mathrm{Hz}$. The calibration depends on the cable.

(c) $v_o = -q/C_f = -10\,\mathrm{mV}/g$ for either cable, to within $(C_s + C_c)/(AC_f)$, and $f_L = 1/(2\pi\times10^{10}\times10^{-9}) = 0.016\,\mathrm{Hz}$. This is why charge amplifiers are standard for piezoelectric sensors with long cables; the alternative is an IEPE sensor with a built-in voltage amplifier powered over the same coaxial cable.
:::
:::

::: exercise Choosing a temperature sensor {level=3}
Specify a temperature sensor and interface for each case, giving reasons and the dominant error source: (a) a laboratory incubator held at $37.0 \pm 0.1\,^\circ\mathrm{C}$; (b) the exhaust of a gas turbine at about $900\,^\circ\mathrm{C}$; (c) a battery pack with twenty cells to be monitored to $\pm1\,^\circ\mathrm{C}$ at minimum cost; (d) the stator winding of a motor, where the sensor must survive high voltages.
::: solution
(a) A class A Pt100 or Pt1000 in a 4-wire connection, excited at $\le 1\,\mathrm{mA}$ (self-heating below $0.03\,\mathrm{K}$), read ratiometrically against a reference resistor; or a calibrated thermistor. Dominant error: sensor tolerance unless calibrated, then self-heating and the thermal coupling to the air. (b) A type K or N thermocouple (sheathed, mineral-insulated) with cold-junction compensation; RTDs are unstable above about $600\,^\circ\mathrm{C}$ and thermistors cannot survive. Dominant error: thermocouple tolerance ($\pm0.4\,\%$, i.e. $\pm3.6\,^\circ\mathrm{C}$) and drift from contamination, then radiation to the cooler duct walls. (c) NTC thermistors in dividers, one per cell, multiplexed into a microcontroller ADC with a look-up table; cheap and sensitive. Dominant error: thermistor tolerance (about $\pm1\,\%$ on $R_{25}$, i.e. $\approx 0.25\,^\circ\mathrm{C}$, and on β) and divider resistor tolerance. (d) A Pt100 or PTC thermistor with reinforced insulation, or a fibre-optic sensor where isolation is critical; the interface must be isolated ([[instrumentation/instrumentation-amplifiers]]). Dominant error: the thermal resistance between the winding hot spot and the sensor.
:::
:::
