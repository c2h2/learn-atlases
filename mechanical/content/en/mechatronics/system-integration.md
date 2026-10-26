The previous chapters treated the parts of a mechatronic system one at a time: sensors, conditioning, the microcontroller, motors, fluid power, motion control. A machine is more than its parts. Components that each meet their specification can still fail together: a motor drive's switching noise corrupts a load-cell signal, regenerated braking energy over-volts the supply, a heat sink sized for the average power lets a transistor cook during a peak, an error budget that added the parts' accuracies optimistically leaves the machine out of tolerance, and a guard interlock implemented in ordinary software fails the first time the program hangs. **System integration** is the discipline of designing the parts so that the whole works — and fails safely when it does not.

This chapter collects the system-level tools: the design process and requirements, error budgets, power and thermal budgets, electromagnetic compatibility and grounding, reliability, and functional safety. It ends with case studies that bring the course together: the inkjet printer carriage, anti-lock braking, and a 3D-printer axis.

## From requirements to architecture {#sec-process}

The design process of [[mechatronics/mechatronic-systems#sec-elements]] begins with **requirements**: measurable statements of what the system must do, under which conditions, and how this will be verified. "Fast and accurate" is not a requirement; "position a $2\ \mathrm{kg}$ head over $400\ \mathrm{mm}$ in $0.35\ \mathrm{s}$ to $\pm 50\ \mathrm{\mu m}$, $60$ cycles per minute, at $10$–$40\,^\circ\mathrm{C}$ ambient, for $20\,000$ hours" is. Requirements cover function and performance, environment (temperature, humidity, vibration, dust, electromagnetic surroundings), interfaces (supply, communication, mounting), life and reliability, safety and the standards that apply, cost and volume.

The **architecture** allocates functions to physical elements and fixes the interfaces between them: which loops close where and at what rate, which controller runs which task, which signals cross which boundaries in which form (analogue, digital, fieldbus), how the power is distributed and where the safety functions sit. The VDI 2206 guideline's V-model then leads through domain designs to integration and verification, each level tested against the requirement allocated to it. Two habits make this work in practice: **budgets** that apportion each system requirement among the elements (error, power, heat, time, cost), revised as the design proceeds; and **early integration** of crude prototypes, because the interactions between domains — a resonance excited by a control loop, noise coupled from a drive into a sensor — are much easier to find than to predict.

## Error budgets {#sec-error-budget}

The accuracy of a machine is the combination of many independent errors: sensor resolution and calibration, screw lead error, thermal expansion, structural deflection under load, servo error, backlash. An **error budget** lists them and combines them.

::: proposition Combination of independent errors {#prop-rss}
If the total error is the sum $E = \sum_i c_iE_i$ of independent random contributions $E_i$ with standard deviations $u_i$ (their **standard uncertainties**), weighted by sensitivity coefficients $c_i$, then the standard deviation of $E$ is
$$
u_c = \sqrt{\sum_i c_i^2u_i^2} \qquad\text{(root-sum-square, RSS)},
$$ {#eq-rss}
which never exceeds the worst-case sum $\sum_i \lvert c_i\rvert u_i$. For a contribution known only to lie within $\pm a$ with no value more likely than another (a uniform distribution), $u = a/\sqrt3$.
:::

::: proof
The variance of a sum of independent random variables is the sum of their variances: $\operatorname{Var}(\sum c_iE_i) = \sum c_i^2\operatorname{Var}(E_i)$, because the cross terms $2c_ic_j\operatorname{Cov}(E_i, E_j)$ vanish for independent variables. Taking the square root gives [[#eq-rss]]. The inequality is the triangle inequality for the Euclidean norm of the vector $(\lvert c_1\rvert u_1, \dots)$ against its $\ell^1$ norm: $\sqrt{\sum x_i^2} \le \sum x_i$ for $x_i \ge 0$, since squaring the right side adds the non-negative cross terms. For a uniform distribution on $[-a, a]$, the variance is $\frac{1}{2a}\int_{-a}^{a}x^2\,\mathrm{d}x = a^2/3$.
:::

This is the rule of the *Guide to the Expression of Uncertainty in Measurement* (GUM, JCGM 100:2008). Its validity rests on independence: errors with a common cause — two contributions that both grow with temperature, say — must be added linearly before being combined with the rest. Systematic errors that can be measured (a screw's lead error, a thermal drift with a known coefficient) should be **compensated**, by a calibration table or a temperature model in the controller, rather than budgeted; what remains in the budget is the uncertainty of the compensation. To state a bound with a given confidence, the combined standard uncertainty is multiplied by a **coverage factor**: $k = 2$ gives about $95\,\%$ coverage when the sum is approximately normal.

::: example Positioning error budget {#ex-error-budget}
A linear axis has the following independent error contributions at the tool, given as standard uncertainties: servo error and encoder quantisation $3\ \mathrm{\mu m}$, residual screw lead error after compensation $4\ \mathrm{\mu m}$, thermal expansion $12\ \mathrm{\mu m}$. Find the combined standard uncertainty, the expanded uncertainty with $k = 2$, and the linear sum. Which contribution should the designer attack first?
::: solution
$u_c = \sqrt{3^2 + 4^2 + 12^2} = \sqrt{169} = 13\ \mathrm{\mu m}$. Expanded: $U = 2 \times 13 = 26\ \mathrm{\mu m}$ (about $95\,\%$ coverage). Linear sum: $3 + 4 + 12 = 19\ \mathrm{\mu m}$ (of the standard uncertainties).

The thermal term dominates: removing the servo and lead errors entirely would only reduce $u_c$ from $13$ to $12\ \mathrm{\mu m}$, while halving the thermal error would reduce it to $\sqrt{9 + 16 + 36} = 7.8\ \mathrm{\mu m}$. Thermal measures — temperature control, low-expansion materials, a temperature-compensated scale, or a thermal model in the controller — come first.

Sanity check: in an RSS budget the largest term dominates quadratically, so effort spent on small terms is wasted. A steel screw of $300\ \mathrm{mm}$ grows by $11.7 \times 10^{-6} \times 300\ \mathrm{mm} = 3.5\ \mathrm{\mu m}$ per kelvin; a $12\ \mathrm{\mu m}$ thermal uncertainty corresponds to about $3.4\ \mathrm{K}$ — a plausible daily variation in an unconditioned workshop.
:::
:::

::: widget distribution
dist: normal
params: mu=0, sigma=13
a: -26
b: 26
caption: Distribution of the total positioning error (μm) in the error-budget example, a normal distribution with the combined standard uncertainty $13\ \mathrm{\mu m}$. The shaded band, $\pm 26\ \mathrm{\mu m}$ ($k = 2$), contains $95.4\,\%$ of the axes or moves. Change $\sigma$ to see the effect of improving the thermal behaviour, and the limits to see how the coverage depends on the factor $k$.
:::

## Power and thermal budgets {#sec-power}

The **power budget** lists every consumer — controller, sensors, drives and actuators — with its average and peak demands. The supply is sized for the peak demands that can coincide, its average rating for the mean, and the wiring, fuses and connectors for the currents involved. Separate supplies (or at least separately regulated and filtered rails) are used for logic, analogue measurement and power stages, joined at a single point.

Motors accelerate loads and then brake them. When a motor decelerates, it acts as a generator and its drive returns the kinetic energy to the DC bus. A battery can absorb it; a mains rectifier cannot, so the energy charges the drive's bus capacitors and raises their voltage. From the energy balance $\tfrac12C(V_2^2 - V_1^2) = E$, the bus rises to
$$
V_2 = \sqrt{V_1^2 + \frac{2E}{C}} .
$$ {#eq-regen}
If $V_2$ would exceed the drive's rating, a **braking resistor** switched by a chopper (a "regen" or "dump" circuit) dissipates the energy.

::: example Regenerated energy on a 24 V bus {#ex-regen}
A motor and load with $J = 2.0\times10^{-4}\ \mathrm{kg\,m^2}$ decelerate from $300\ \mathrm{rad/s}$ to rest. The drive's bus is fed at $24\ \mathrm{V}$ by a supply that cannot sink current and has $4700\ \mathrm{\mu F}$ of bus capacitance. Ignoring losses, find the bus voltage at the end of the stop.
::: solution
$E = \tfrac12J\omega^2 = 0.5 \times 2.0\times10^{-4} \times 9.0\times10^{4} = 9.0\ \mathrm{J}$. $V_2 = \sqrt{24^2 + 2 \times 9.0/4.7\times10^{-3}} = \sqrt{576 + 3830} = 66\ \mathrm{V}$.

A drive rated at, say, $60\ \mathrm{V}$ trips on over-voltage or is damaged. Remedies: a braking resistor with a chopper that switches in above about $30\ \mathrm{V}$, more capacitance (to keep below $30\ \mathrm{V}$ one would need $C = 2E/(30^2 - 24^2) = 0.056\ \mathrm{F}$, a large capacitor bank), or a supply that can absorb energy.

Sanity check: in reality winding resistance and friction dissipate part of the energy, so this is an upper bound — but the order of magnitude is right, and multi-axis machines that stop all axes at once (an emergency stop) return the sum of all their kinetic energies at the same moment.
:::
:::

Every watt of loss becomes heat that must leave through a chain of **thermal resistances**. For a semiconductor dissipating $P$, the junction temperature in steady state is
$$
T_j = T_a + P\left(R_{\theta jc} + R_{\theta cs} + R_{\theta sa}\right),
$$ {#eq-thermal}
with junction-to-case, case-to-sink (interface material) and sink-to-ambient resistances in K/W — the thermal analogue of Ohm's law ([[heat-transfer/steady-conduction]]). The heat sink is chosen so that $T_j$ stays below the data-sheet maximum (typically $125$–$175\,^\circ\mathrm{C}$) with margin at the highest ambient temperature; the electrolytic capacitors, whose life roughly halves for every $10\ \mathrm{K}$ rise, are often the real limit. Enclosures need the same budget: the heat generated inside must leave through the walls or a fan, raising the internal temperature above the room's.

## Electromagnetic compatibility and grounding {#sec-emc}

**Electromagnetic compatibility** (EMC) means that a system does not disturb other equipment (**emission**) and is not disturbed by its environment (**immunity**). Mechatronic systems are hard cases: they contain powerful noise sources — PWM drives switching hundreds of volts in nanoseconds, relays and solenoids, switch-mode supplies — beside microvolt-level sensor signals. In the European Union, the EMC Directive (2014/30/EU) requires conformity, usually shown against harmonised standards such as IEC 61000-6-2 (immunity) and IEC 61000-6-4 (emission) for industrial environments.

The coupling mechanisms were introduced in [[mechatronics/signal-conditioning#sec-noise]]. At system level the practices are:

- **Partition** the design: power electronics, motor cables and switching circuits in one zone, sensitive analogue circuits in another, with filtering at every cable entering or leaving.
- **Grounding:** a solid reference plane on circuit boards; a single **star point** joining logic, analogue and power grounds, so that large return currents do not flow through signal grounds; or, where unavoidable, differential signalling and galvanic isolation (optocouplers, isolated amplifiers, isolated supplies) to break **ground loops**.
- **Cabling:** shielded motor cables with the shield bonded all round at both ends (for high-frequency emission), twisted pairs for signals, signal and power cables separated, ferrites on cables at the entry points.
- **Decoupling:** a ceramic capacitor ($100\ \mathrm{nF}$ is typical) at every integrated-circuit supply pin, close to the pin, and bulk capacitance at each board's supply input; switching current loops kept small.

::: example A ground loop in a sensor input {#ex-ground-loop}
A $0$–$10\ \mathrm{V}$ position sensor's ground is connected to the controller's ground through a conductor of resistance $20\ \mathrm{m\Omega}$ that also carries the $10\ \mathrm{A}$ return current of a motor drive. Find the error in the sensor reading and suggest two fixes.
::: solution
The drive current develops $10 \times 0.020 = 0.20\ \mathrm{V}$ along the shared conductor. The controller measures the sensor voltage relative to its own ground, so the reading is shifted by up to $0.20\ \mathrm{V}$ — $2\,\%$ of full scale — and the shift varies with the motor current, appearing as noise correlated with the motion.

Fixes: (1) give the sensor its own ground return to the controller's star point, so no motor current flows in it; (2) read the sensor with a differential input (instrumentation amplifier) that measures between the sensor's output and the sensor's own ground wire, rejecting the common-mode shift. A $4$–$20\ \mathrm{mA}$ current-loop sensor would also be immune.

Sanity check: $20\ \mathrm{m\Omega}$ is only a couple of metres of $1.5\ \mathrm{mm^2}$ copper. Shared returns are the commonest origin of "sensor noise" that disappears when the motor stops.
:::
:::

## Reliability {#sec-reliability}

::: definition Reliability, failure rate and MTTF {#def-reliability}
The **reliability** $R(t)$ of a component is the probability that it is still working at time $t$. For components whose **failure rate** $\lambda$ (failures per unit time among survivors) is constant — a good model for electronics during their useful life, between early failures and wear-out —
$$
R(t) = e^{-\lambda t},\qquad \text{MTTF} = \int_0^\infty R(t)\,\mathrm{d}t = \frac1\lambda .
$$
Electronic failure rates are often quoted in **FIT** (failures in $10^9$ device-hours). For repaired systems the mean time between failures (MTBF) is used in the same way.
:::

::: proposition Series and parallel systems {#prop-series-parallel}
(a) A system that fails if **any** of $n$ independent components fails (**series** in the reliability sense) has $R_s = \prod_i R_i$; with constant failure rates, $\lambda_s = \sum_i\lambda_i$.

(b) A system that works if **at least one** of $n$ independent components works (**active parallel redundancy**) has $R_p = 1 - \prod_i(1 - R_i)$. For two identical components with constant rate $\lambda$, $\text{MTTF} = 3/(2\lambda)$.
:::

::: proof
(a) The system survives only if every component survives; for independent events the probability is the product. With $R_i = e^{-\lambda_it}$, $\prod_iR_i = e^{-(\sum_i\lambda_i)t}$, an exponential with rate $\sum_i\lambda_i$. (b) The system fails only if every component has failed, with probability $\prod_i(1 - R_i)$; it survives with the complementary probability. For two identical components, $R_p = 1 - (1 - e^{-\lambda t})^2 = 2e^{-\lambda t} - e^{-2\lambda t}$, and $\text{MTTF} = \int_0^\infty R_p\,\mathrm{d}t = 2/\lambda - 1/(2\lambda) = 3/(2\lambda)$.
:::

Series systems are the rule: a machine with a hundred components fails if any one of them does, so its failure rate is the sum of theirs and every component matters. Redundancy is expensive and helps less than intuition suggests: two units in parallel raise the MTTF by only $50\,\%$, although they greatly improve the reliability over short missions ($R \approx 1 - (\lambda t)^2$ rather than $1 - \lambda t$ when $\lambda t$ is small) — which is why redundancy is used where failure during a mission is unacceptable (aircraft flight controls, vehicle braking) and is combined with monitoring and repair. Redundant channels must also be protected from **common-cause failures** — a shared power supply, the same software bug, the same overheating — that defeat them together.

::: example Reliability of a controller {#ex-reliability}
A motor-controller board has a microcontroller ($100\ \mathrm{FIT}$), a gate driver ($200\ \mathrm{FIT}$), six power MOSFETs ($100\ \mathrm{FIT}$ each), electrolytic capacitors ($600\ \mathrm{FIT}$ in total), connectors and solder joints ($500\ \mathrm{FIT}$) — all in series. Find its failure rate, MTTF and the probability of surviving one year of continuous operation. What is the one-year reliability of two such boards in active redundancy?
::: solution
$\lambda = 100 + 200 + 600 + 600 + 500 = 2000\ \mathrm{FIT} = 2.0\times10^{-6}\ \mathrm{h^{-1}}$. MTTF $= 5.0\times10^{5}\ \mathrm{h}$ (about $57$ years). One year ($8760\ \mathrm{h}$): $R = e^{-0.01752} = 0.9826$ — a $1.7\,\%$ chance of failure. Two in parallel: $R_p = 1 - (1 - 0.9826)^2 = 1 - 3.0\times10^{-4} = 0.9997$.

Sanity check: an MTTF of decades does not mean a board lasts decades — it means that in a fleet of $1000$ boards about $17$ fail in the first year. The constant-rate model also ignores wear-out; electrolytic capacitors and fans wear out, and their life at the operating temperature must be checked separately.
:::
:::

::: widget plot
title: Reliability of single, series and redundant units
f: exp(-L*x); exp(-2*L*x); 1 - (1 - exp(-L*x))^2
x: 0, 10
y: 0, 1.05
sliders: L=0.2:0.05:1:0.05
labels: \text{one unit}; \text{two in series}; \text{two in parallel}
caption: Reliability against time (in arbitrary units, for example years) for one component of failure rate $\lambda$ (slider), two in series and two in active parallel redundancy. Early in life the parallel pair is far better — its curve starts flat — but its mean life, the area under the curve, is only $1.5$ times that of one unit. Two in series halve the mean life.
:::

## Functional safety {#sec-safety}

A machine that moves can injure people. **Machine safety** starts with a **risk assessment** (ISO 12100): identify the hazards (crushing, shearing, entanglement, stored energy, heat, electricity), estimate the risk of each from severity and likelihood, and reduce it by, in this order, inherently safe design (limit forces and speeds, eliminate pinch points), safeguarding (fixed guards, interlocked movable guards, light curtains, two-hand controls) and information (warnings, training). Where the safeguarding depends on a control system — a guard switch that must stop the motors — that control function is a **safety function**, and its reliability is specified and verified by **functional-safety** standards: ISO 13849-1 grades safety-related parts of control systems by **performance level** PL a to e; IEC 62061 and the generic IEC 61508 use **safety integrity levels** SIL 1 to 3 (to 4 in IEC 61508), each corresponding to a range of probabilities of dangerous failure per hour.

Several principles follow for mechatronic design:

- **Safety functions are separate from ordinary control.** A guard interlock is not an `if` statement in the motion-control software, which can hang or be wrong; it is implemented by safety-rated components — a safety relay or safety controller, and **safe torque off** (STO) in the drive (IEC 61800-5-2), which removes the power to the motor's gate drivers by hardware so the motor cannot produce torque.
- **Stop categories** (IEC 60204-1): category 0 removes power immediately (the motor coasts); category 1 brakes under control, then removes power; category 2 stops under control and keeps power. Emergency stops are category 0 or 1, and must override every other function.
- **Fail-safe and monitored design**: normally-closed safety contacts (a broken wire stops the machine), redundant channels with cross-monitoring, watchdog timers that reset the controller into a safe state, brakes that engage when power is lost (on vertical axes, which fall under gravity when the motor is disabled).
- **Validation**: the safety functions are tested, and the calculation of their performance level documented, as part of conformity with the applicable regulations — in the European Union the Machinery Directive 2006/42/EC, which is being replaced by the Machinery Regulation (EU) 2023/1230, applying from January 2027.

::: warning Software is not a guard
The most dangerous integration error is to rely on the normal control program for safety: a "door open" input that pauses the motion in software, an emergency-stop button read by the same microcontroller that runs the motors, a speed limit enforced only in the trajectory generator. Each fails exactly when it is needed — a hung program, a corrupted variable, a wiring fault read as "OK". Safety functions use safety-rated, monitored hardware (or certified safety controllers) designed and validated to the required PL or SIL, with STO or contactors acting directly on the power. This lesson teaches principles; machine safety is a regulated field, and real machines are designed and validated by qualified engineers to the current standards.
:::

## Case studies {#sec-cases}

**The inkjet printer carriage.** A brushed DC motor drives the print-head carriage through a toothed belt along a plain steel rod. A transparent strip with about 150 to 600 lines per inch (6 to 24 lines per millimetre), read by an optical quadrature sensor on the carriage, gives position directly at the head — so belt stretch and pulley errors are inside the loop and corrected. The controller generates trapezoidal profiles, uses velocity and acceleration feedforward and a PID loop at several kilohertz, and fires the nozzles from the encoder edges rather than from time, so that drops land in the right place even if the speed varies. The paper feed uses a separate DC motor with a rotary encoder. Everything — mechanism, motor, sensor — is cheap; the precision lives in the sensor placement and the software.

**Anti-lock braking.** When a wheel locks, the tyre slides and loses both braking grip and steering. The anti-lock braking system (ABS) measures each wheel's speed with a toothed ring and an inductive or Hall-effect sensor, estimates the vehicle speed $v$ from all the wheels, and computes the **slip ratio**
$$
\lambda = \frac{v - \omega r}{v},
$$ {#eq-slip}
($\omega$ the wheel speed, $r$ its rolling radius). The tyre's braking force peaks at slip ratios of roughly $0.1$–$0.2$ on most surfaces and falls beyond. When the wheel decelerates too fast or the slip rises past the peak, solenoid valves in a hydraulic modulator hold and then release the brake pressure of that wheel, and a pump returns the released fluid; the pressure is then reapplied, cycling several times per second to keep the wheel near the peak of the friction curve. The ABS is a mechatronic system in the full sense: sensors, a hydraulic actuator ([[mechatronics/fluid-power]]), an embedded controller with extensive self-monitoring, and a safety-critical function that must fall back to conventional braking if it fails.

::: example Slip ratio in an ABS {#ex-slip}
A car travels at $20\ \mathrm{m/s}$. During braking, one wheel of rolling radius $0.30\ \mathrm{m}$ turns at $60\ \mathrm{rad/s}$. Find the slip ratio. If the controller's target band is $0.10$–$0.20$, what range of wheel speeds should it maintain at this vehicle speed?
::: solution
$\omega r = 60 \times 0.30 = 18\ \mathrm{m/s}$; $\lambda = (20 - 18)/20 = 0.10$, at the lower edge of the band. For the band: $\omega = v(1 - \lambda)/r$, i.e. from $20 \times 0.90/0.30 = 60\ \mathrm{rad/s}$ down to $20 \times 0.80/0.30 = 53.3\ \mathrm{rad/s}$.

Sanity check: the band is only $7\ \mathrm{rad/s}$ wide, and the vehicle-speed estimate itself is uncertain (all wheels may be slipping), so practical ABS algorithms work with wheel deceleration thresholds and slip estimates together, not with a precise slip set-point.
:::
:::

**A 3D-printer axis.** A typical desktop printer moves its print head with two-phase hybrid steppers ([[mechatronics/electric-actuators#sec-stepper]]) driving toothed belts, open-loop, with $1/16$ microstepping and limit switches for homing. The firmware plans trapezoidal or jerk-limited profiles through a look-ahead buffer so that the head does not stop at every segment of a curve. The heater block and bed are separate temperature loops with thermistors and MOSFET switches ([[mechatronics/mechatronic-systems]]), with thermal-runaway protection in firmware (and, in better designs, independent thermal fuses). The design choices are economic: steppers avoid encoders and tuning, at the price of lost steps if the nozzle hits a curled print — which is why more expensive printers add encoders, closed-loop steppers or accelerometer-based resonance compensation (input shaping), applying exactly the ideas of [[mechatronics/motion-control]].

::: quiz
Two identical controllers, each with a one-year reliability of $0.90$, are used in active redundancy, and both are fed from the same power supply, whose one-year reliability is $0.95$. What is the one-year reliability of the system?
- [ ] $0.99$
- [x] about $0.94$
- [ ] $0.90$
- [ ] $0.855$
::: solution
The redundant pair has $R = 1 - 0.1^2 = 0.99$; it is in series with the shared supply: $0.99 \times 0.95 = 0.9405$. The common supply is a common-cause failure that dominates; the redundancy gains little until the supply is duplicated too.
:::
:::

::: history
Systematic design methods for mechatronic products were codified in the German guideline VDI 2206, *Design methodology for mechatronic systems*, published in 2004 and revised in 2021. Functional safety took its modern form with IEC 61508, published in parts between 1998 and 2000, from which sector standards followed — IEC 62061 for machinery (2005), ISO 13849-1 in its probabilistic form (2006), and ISO 26262 for road vehicles (2011). Bosch introduced the first electronic four-wheel anti-lock braking system in series production on the Mercedes-Benz S-Class in 1978, and in 1986 presented the controller area network (CAN), which first went into series production in the Mercedes-Benz S-Class of 1991 and became the backbone of vehicle electronics.
:::

::: summary
- Start from measurable requirements; fix the architecture and interfaces; keep error, power, heat, timing and cost budgets; integrate early.
- Independent errors combine by root-sum-square of standard uncertainties, $u_c = \sqrt{\sum c_i^2u_i^2}$; correlated ones add linearly; the largest term dominates; compensate measurable systematic errors.
- Size supplies for coinciding peaks; regenerated energy raises the bus to $\sqrt{V_1^2 + 2E/C}$ — use braking resistors. $T_j = T_a + P\sum R_\theta$.
- EMC: partition, star grounding, isolation, shielded and twisted cables, decoupling; shared ground returns turn motor current into sensor error.
- Reliability: $R = e^{-\lambda t}$, MTTF $1/\lambda$; series rates add; parallel pairs improve short-mission reliability greatly but MTTF only by $50\,\%$; beware common causes.
- Safety: risk assessment (ISO 12100), safety functions in safety-rated hardware (STO, safety relays) to the required PL or SIL, stop categories of IEC 60204-1; never rely on ordinary software.
:::

## Exercises

::: exercise Root-sum-square {level=1 check="26"}
Three independent error contributions have standard uncertainties $6$, $8$ and $24\ \mathrm{\mu m}$. Find the combined standard uncertainty. (Enter it in μm.)
::: solution
$\sqrt{36 + 64 + 576} = \sqrt{676} = 26\ \mathrm{\mu m}$, against a linear sum of $38\ \mathrm{\mu m}$.
:::
:::

::: exercise Series failure rate {level=1 check="1000000"}
A system consists of three components in series with failure rates $200$, $300$ and $500\ \mathrm{FIT}$. Find its MTTF. (Enter it in hours.)
::: solution
$\lambda = 1000\ \mathrm{FIT} = 10^{-6}\ \mathrm{h^{-1}}$; MTTF $= 10^{6}\ \mathrm{h}$.
:::
:::

::: exercise Parallel redundancy {level=1 check="0.99"}
Two independent sensors, each with reliability $0.90$ over a mission, are used so that either one suffices. Find the mission reliability. (Enter $R$.)
::: solution
$1 - (1 - 0.90)^2 = 1 - 0.01 = 0.99$.
:::
:::

::: exercise MTTF of a redundant pair {level=2 check="15000"}
Two identical units with constant failure rate $\lambda = 1.0\times10^{-4}\ \mathrm{h^{-1}}$ operate in active redundancy. Find the MTTF of the pair. (Enter it in hours.)
::: solution
$3/(2\lambda) = 3/(2\times10^{-4}) = 15\,000\ \mathrm{h}$, against $10\,000\ \mathrm{h}$ for one unit.
:::
:::

::: exercise Heat-sink selection {level=2 check="14.5"}
A MOSFET dissipates $5.0\ \mathrm{W}$ with $R_{\theta jc} = 1.0\ \mathrm{K/W}$ and an interface pad of $0.5\ \mathrm{K/W}$. The junction must stay below $125\,^\circ\mathrm{C}$ at an ambient of $45\,^\circ\mathrm{C}$. Find the largest acceptable sink-to-ambient thermal resistance. (Enter it in K/W.)
::: solution
Total allowed $(125 - 45)/5.0 = 16\ \mathrm{K/W}$; $R_{\theta sa} \le 16 - 1.0 - 0.5 = 14.5\ \mathrm{K/W}$. A designer would choose a sink of perhaps $10\ \mathrm{K/W}$ for margin.
:::
:::

::: exercise Battery runtime {level=2 check="4.8"}
A mobile robot draws an average of $80\ \mathrm{W}$ from a $24\ \mathrm{V}$, $20\ \mathrm{Ah}$ battery, of which $80\,\%$ of the capacity may be used. Find the runtime. (Enter it in hours.)
::: solution
Usable energy $24 \times 20 \times 0.80 = 384\ \mathrm{Wh}$; runtime $384/80 = 4.8\ \mathrm{h}$. Peaks above the average do not change the energy but do set the battery's current rating and the voltage sag.
:::
:::

::: exercise Slip ratio {level=2 check="0.104"}
A car travels at $25\ \mathrm{m/s}$ while one braked wheel of rolling radius $0.32\ \mathrm{m}$ turns at $70\ \mathrm{rad/s}$. Find the slip ratio. (Enter $\lambda$.)
::: solution
$\omega r = 22.4\ \mathrm{m/s}$; $\lambda = (25 - 22.4)/25 = 0.104$.
:::
:::

::: exercise Ground-loop error {level=2 check="1.5"}
A $15\ \mathrm{A}$ motor return current flows through $10\ \mathrm{m\Omega}$ of conductor shared with the ground of a $0$–$10\ \mathrm{V}$ sensor. Find the resulting error as a percentage of full scale. (Enter it in %.)
::: solution
$15 \times 0.010 = 0.15\ \mathrm{V}$, i.e. $1.5\,\%$ of $10\ \mathrm{V}$.
:::
:::

::: exercise Standby redundancy {level=3}
In **standby** redundancy the second unit is switched on only when the first fails (assume perfect switching and no failures while idle). For two identical units with constant failure rate $\lambda$, derive the reliability $R(t)$ and show that the MTTF is $2/\lambda$. Compare with active redundancy and explain the difference.
::: solution
The system survives to $t$ if the first unit survives ($e^{-\lambda t}$), or if it fails at some $\tau < t$ (density $\lambda e^{-\lambda\tau}$) and the second unit, started at $\tau$, survives for the remaining $t - \tau$ ($e^{-\lambda(t - \tau)}$). So $R(t) = e^{-\lambda t} + \int_0^t\lambda e^{-\lambda\tau}e^{-\lambda(t - \tau)}\,\mathrm{d}\tau = e^{-\lambda t}(1 + \lambda t)$. Then $\text{MTTF} = \int_0^\infty e^{-\lambda t}(1 + \lambda t)\,\mathrm{d}t = 1/\lambda + 1/\lambda = 2/\lambda$ — the lifetimes add. Active redundancy gives only $3/(2\lambda)$, because both units age together and the second may already have failed when the first does. Standby is better on paper but relies on the switch-over working and on detecting the failure of the active unit; idle units can also fail undetected, so they are tested periodically.
:::
:::

::: exercise Concept design of a parcel-sorting gate {level=3}
A conveyor carries parcels of $0.2$–$10\ \mathrm{kg}$ at $2\ \mathrm{m/s}$; a gate must divert selected parcels to a side chute, completing its stroke within $150\ \mathrm{ms}$ of a trigger, $3000$ times an hour, for $10$ years. Propose the system: requirements list, actuator choice (pneumatic cylinder, servo motor, solenoid), sensing (parcel detection, gate position), controller and communication, error and timing budget, reliability (number of cycles), and safety measures for people working near the conveyor.
::: solution
A good answer includes: (i) requirements quantified — stroke and force (from parcel momentum, up to $10 \times 2 = 20\ \mathrm{N\,s}$ to redirect), timing ($150\ \mathrm{ms}$, so the trigger-to-motion latency of sensor, controller and valve or drive must be a few tens of milliseconds at most), life ($3000 \times 8760 \times 10 \approx 2.6\times10^{8}$ cycles if continuous — a key driver: solenoid valves and cylinders are rated in tens of millions of cycles, so maintenance intervals or a servo drive with no wearing seals may be needed). (ii) Actuator: a pneumatic cylinder is cheap and fast but its timing varies with supply pressure and its seals wear; a servo motor with a crank or belt gives repeatable, programmable motion and diagnostics. (iii) Sensing: a light barrier or camera upstream with known distance and conveyor speed (encoder on the conveyor) to time the gate; gate position from end switches or the servo encoder. (iv) Controller: PLC or microcontroller with deterministic timing; communication with the sorting system by fieldbus; timing budget for detection, decision and actuation. (v) Reliability: identify wear parts and schedule replacement; monitor cycle times to predict failure. (vi) Safety: risk assessment; guards around the gate's swept volume; interlocked access doors acting on STO or air-dump valves through a safety relay, emergency stops; stored pneumatic energy released on stop; the gate's force limited where it can trap fingers.
:::
:::
