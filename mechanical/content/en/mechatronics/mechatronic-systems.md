A modern inkjet printer moves its print head across the paper at about a metre per second and places drops to within a few hundredths of a millimetre. No part of it is unusually precise: the carriage slides on a plain steel rod, it is pulled by a rubber toothed belt, and the motor is a cheap brushed DC motor. The precision comes from a strip of film with a few hundred lines per centimetre stretched along the carriage path, an optical sensor that counts the lines, a microcontroller that compares the count with where the head should be, and a transistor bridge that adjusts the motor voltage thousands of times a second. Remove the feedback and the same mechanism is useless; add it and an imprecise mechanism behaves as a precise one. That trade — replacing mechanical accuracy and complexity by sensing, computation and control — is what **mechatronics** means.

This chapter sets out the elements of a mechatronic system and the vocabulary used in the rest of the course, then gives the small amount of circuit theory a mechanical engineer needs to connect sensors, controllers and actuators without destroying any of them: Ohm's and Kirchhoff's laws, dividers and loading, the RC circuit, inductive loads and transistor switches. It ends by closing a first feedback loop around a motor and showing what a model can and cannot tell you. The control theory is in [[control-systems]] — especially [[control-systems/modelling-dynamic-systems]] and [[control-systems/time-response]] — and circuits are treated in depth in the [Electrical Engineering Atlas](/learn/ee/lesson.php?c=circuits-1).

## The elements of a mechatronic system {#sec-elements}

::: definition Mechatronic system {#def-mechatronic-system}
A **mechatronic system** is a machine in which a mechanical process is measured by **sensors**, the measurements are processed by a **controller** (almost always a digital processor running software), and the controller's decisions are applied to the process by **actuators** through **power electronics**. The elements and the signals between them are:

1. the **process** or **plant**: the mechanism, structure or fluid system whose behaviour we want to control (a carriage on a rail, a robot joint, a valve spool, a heated block);
2. **sensors**, which convert a physical quantity (position, speed, force, pressure, temperature) into an electrical signal;
3. **signal conditioning and conversion**: amplification, filtering and analogue-to-digital conversion, so that the controller receives a clean number;
4. the **controller**: a microcontroller, programmable logic controller (PLC) or embedded computer that compares measurements with commands and computes outputs;
5. **drivers** (power electronics): transistor switches and amplifiers that turn low-power command signals into the voltages and currents the actuator needs;
6. **actuators**, which convert electrical (or hydraulic or pneumatic) power into force or motion: motors, solenoids, cylinders;
7. a **power supply**, and usually a **user interface** and **communication** with other machines.
:::

The information path (sensor → conditioning → controller → driver command) carries milliwatts; the power path (supply → driver → actuator → mechanism) may carry kilowatts. Keeping the two apart — physically, in the wiring, and in the designer's mind — is the first rule of building such systems, and we return to it in [[mechatronics/system-integration]].

### Open and closed loop

A system is **open loop** if the controller's output does not depend on a measurement of the result: a washing-machine timer, a stepper motor driven by a fixed pulse sequence, a toaster. It is **closed loop** (feedback) if the controller measures the controlled quantity and acts on the **error** between command and measurement. Feedback has three benefits that justify its cost: it makes the output insensitive to changes in the plant (wear, load, temperature), it rejects disturbances, and it can make an unstable or sluggish process stable and fast. It also has one danger: a loop with too much gain or too much delay oscillates. The rest of this chapter, and most of [[mechatronics/motion-control]], is about getting the benefits without the danger.

| element | inkjet printer carriage | car anti-lock brakes | 3D-printer hot end |
|---|---|---|---|
| process | carriage on rod and belt | wheel and brake | heater block and nozzle |
| sensor | optical linear encoder strip | toothed wheel and inductive or Hall speed sensor | thermistor |
| controller | printer microcontroller | brake control unit | printer microcontroller |
| driver | H-bridge | solenoid-valve drivers, pump motor relay | MOSFET switch with PWM |
| actuator | brushed DC motor | hydraulic modulator valves | resistive heater cartridge |
| loop rate (order of magnitude) | kHz | 100 Hz – 1 kHz | 1–10 Hz |

The last row is worth noticing: every loop runs at a rate set by the speed of the process it controls. A heater block with a thermal time constant of a minute needs a decision every second or so; a carriage that must stop within a millimetre at a metre per second needs one every fraction of a millisecond.

### The design process

Mechatronic design is *concurrent*: the mechanism, the electronics and the software are chosen together, because a decision in one domain changes the requirements in the others. A stiffer frame allows a faster control loop; a better encoder allows a cheaper mechanism; a faster processor allows a cheaper sensor whose signal is corrected in software. The German engineering society's guideline VDI 2206 (first issued in 2004, revised in 2021) describes the process as a **V-model**: requirements at the top left are decomposed into a system architecture, then into domain-specific designs (mechanical, electrical, software); the right-hand side integrates and tests the parts in reverse order, checking each level against the requirements of the level opposite it. The practical consequences are simple:

- write down quantitative requirements first (stroke, speed, accuracy, settling time, load, life, cost);
- make error, power and timing **budgets** that apportion each requirement among the elements;
- model the whole loop early, crudely, and refine the model as parts are chosen;
- test subsystems before integrating them, and integrate one loop at a time.

## Circuit basics for mechanical engineers {#sec-circuits}

Every element in the table above meets the others through wires. A mechanical engineer does not have to design amplifiers, but must be able to predict what voltage appears where, how much current flows, how much power is dissipated, and what happens when a switch opens. Four laws do most of the work.

- **Ohm's law** for a resistor: $v = Ri$, with $v$ in volts, $i$ in amperes, $R$ in ohms. The power dissipated is $P = vi = i^2R = v^2/R$.
- **Kirchhoff's current law (KCL):** the currents flowing into any node sum to zero (charge is conserved).
- **Kirchhoff's voltage law (KVL):** the voltages around any closed loop sum to zero (the electric potential is single-valued).
- The constitutive laws of the two storage elements: a **capacitor** $i = C\,\mathrm{d}v/\mathrm{d}t$ (stores energy $\tfrac12Cv^2$), an **inductor** $v = L\,\mathrm{d}i/\mathrm{d}t$ (stores energy $\tfrac12Li^2$).

The mechanical analogies help: voltage is like force or pressure (an "across" or "effort" variable), current like velocity or flow; a resistor is a damper, a capacitor a compliance (a spring or a tank), an inductor a mass. A capacitor's voltage and an inductor's current, like a spring's deflection and a mass's velocity, cannot change instantaneously.

### Dividers and loading

::: proposition Voltage divider and Thévenin equivalent {#prop-divider}
Two resistors $R_1$ (top) and $R_2$ (bottom) in series across a source $V_s$, with no load connected, give the output across $R_2$
$$
V_{\text{out}} = V_s\,\frac{R_2}{R_1 + R_2}.
$$ {#eq-divider}
Seen from its output terminals, the divider behaves as an ideal source $V_{\text{Th}} = V_sR_2/(R_1 + R_2)$ in series with a resistance $R_{\text{Th}} = R_1R_2/(R_1 + R_2)$ (its **Thévenin equivalent**). Connecting a load $R_L$ therefore gives
$$
V_{\text{out}} = V_{\text{Th}}\,\frac{R_L}{R_{\text{Th}} + R_L}.
$$ {#eq-loading}
:::

::: proof
With no load, the same current $i$ flows through both resistors (KCL at the middle node). KVL around the loop gives $V_s = i(R_1 + R_2)$, so $i = V_s/(R_1 + R_2)$ and $V_{\text{out}} = iR_2$, which is [[#eq-divider]]. With a load $R_L$ in parallel with $R_2$, KCL at the output node gives
$$
\frac{V_s - V_{\text{out}}}{R_1} = \frac{V_{\text{out}}}{R_2} + \frac{V_{\text{out}}}{R_L}
\quad\Longrightarrow\quad
V_{\text{out}}\left(\frac1{R_1} + \frac1{R_2} + \frac1{R_L}\right) = \frac{V_s}{R_1}.
$$
Multiplying through by $R_{\text{Th}} = R_1R_2/(R_1 + R_2)$, for which $R_{\text{Th}}(1/R_1 + 1/R_2) = 1$ and $R_{\text{Th}}/R_1 = R_2/(R_1 + R_2)$, gives $V_{\text{out}}(1 + R_{\text{Th}}/R_L) = V_{\text{Th}}$, which rearranges to [[#eq-loading]]. The same algebra holds for any linear network of sources and resistors (Thévenin's theorem): from two terminals it looks like one source and one resistance.
:::

Equation [[#eq-loading]] is the **loading effect**: whenever an instrument or input draws current from a source, the voltage it measures drops. The fractional error is $R_{\text{Th}}/(R_{\text{Th}} + R_L) \approx R_{\text{Th}}/R_L$ when $R_L \gg R_{\text{Th}}$. The rule that follows is the most useful single fact about interfacing: **a signal source should have an output resistance much smaller than the input resistance of whatever reads it** — by a factor of 100 for 1 % error, 1000 for 0.1 %. When that cannot be arranged, a buffer amplifier (a voltage follower, [[mechatronics/signal-conditioning]]) is inserted between them.

::: example Loading a potentiometer {#ex-pot-loading}
A $10\ \mathrm{k\Omega}$ rotary potentiometer is supplied with $5.0\ \mathrm{V}$ and used as an angle sensor. With the wiper at mid-travel, find the output voltage when it is read by (a) an input of resistance $10\ \mathrm{k\Omega}$, (b) an input of $1\ \mathrm{M\Omega}$.
::: solution
At mid-travel the track is split into $R_1 = R_2 = 5\ \mathrm{k\Omega}$. Unloaded, $V_{\text{Th}} = 5.0 \times 5/10 = 2.5\ \mathrm{V}$ and $R_{\text{Th}} = 5 \times 5/10 = 2.5\ \mathrm{k\Omega}$.

(a) $V_{\text{out}} = 2.5 \times 10/(2.5 + 10) = 2.0\ \mathrm{V}$: a $20\,\%$ error, which would be read as an angle error of a fifth of the half-travel.

(b) $V_{\text{out}} = 2.5 \times 1000/(2.5 + 1000) = 2.494\ \mathrm{V}$: an error of $0.25\,\%$.

Sanity check: the Thévenin resistance of a potentiometer is largest at mid-travel ($R/4$) and zero at either end, so the loading error is zero at the ends and greatest near the middle — the loaded characteristic sags into a bow, not a uniform scale error. A high-impedance input (or a buffer) is the cure.
:::
:::

::: example Scaling a 24 V signal for a 3.3 V microcontroller {#ex-scaling}
A machine's $24\ \mathrm{V}$ supply rail is to be monitored by a microcontroller whose analogue input accepts $0$–$3.3\ \mathrm{V}$. Design a divider that maps $24\ \mathrm{V}$ to $3.0\ \mathrm{V}$ (leaving headroom for an over-voltage of $10\,\%$), draws no more than $0.2\ \mathrm{mA}$, and estimate the error caused by an input leakage current of up to $1\ \mathrm{\mu A}$.
::: solution
Ratio: $R_2/(R_1 + R_2) = 3.0/24 = 1/8$, so $R_1 = 7R_2$. Current limit: $R_1 + R_2 \ge 24\ \mathrm{V}/0.2\ \mathrm{mA} = 120\ \mathrm{k\Omega}$. Choosing standard values $R_2 = 20\ \mathrm{k\Omega}$ and $R_1 = 140\ \mathrm{k\Omega}$ (both in the E96 series) gives a total of $160\ \mathrm{k\Omega}$, a current of $24/160\,000 = 0.15\ \mathrm{mA}$ and a dissipation of $24 \times 0.15\times10^{-3} = 3.6\ \mathrm{mW}$.

Thévenin resistance: $R_{\text{Th}} = 140 \times 20/160 = 17.5\ \mathrm{k\Omega}$. A leakage of $1\ \mathrm{\mu A}$ through it shifts the output by $17.5\ \mathrm{mV}$, about $0.6\,\%$ of the $3.0\ \mathrm{V}$ reading, i.e. $0.14\ \mathrm{V}$ referred to the $24\ \mathrm{V}$ rail. At $26.4\ \mathrm{V}$ (the $10\,\%$ over-voltage) the input sees $3.3\ \mathrm{V}$, just within range.

Sanity check: larger resistors would draw less current but increase $R_{\text{Th}}$ and the leakage error; a sampling ADC also needs its input capacitor recharged through $R_{\text{Th}}$, which is why data sheets specify a maximum source resistance (often a few kΩ to tens of kΩ). A small capacitor ($10$–$100\ \mathrm{nF}$) from the input to ground supplies that charge and filters noise.
:::
:::

### The RC circuit

::: proposition Step response of an RC circuit {#prop-rc}
A resistor $R$ in series with an initially uncharged capacitor $C$ is connected at $t = 0$ to a constant voltage $V$. The capacitor voltage is
$$
v_C(t) = V\left(1 - e^{-t/\tau}\right),\qquad \tau = RC .
$$ {#eq-rc}
:::

::: proof
KVL: $V = Ri + v_C$, and the capacitor law gives $i = C\,\mathrm{d}v_C/\mathrm{d}t$. Hence $RC\,\mathrm{d}v_C/\mathrm{d}t + v_C = V$, a first-order linear ODE with the constant particular solution $v_C = V$ and homogeneous solution $Ae^{-t/RC}$. The initial condition $v_C(0) = 0$ (a capacitor voltage cannot jump) gives $A = -V$. Dimensions: $RC$ has units $\Omega \cdot \mathrm{F} = (\mathrm{V/A})(\mathrm{A\,s/V}) = \mathrm{s}$.
:::

After one time constant the capacitor has reached $63.2\,\%$ of its final value, after three $95.0\,\%$, after five $99.3\,\%$. Seen as a filter with the output across $C$, the same circuit has transfer function $1/(\tau s + 1)$ and attenuates sinusoids above its **corner frequency** $f_c = 1/(2\pi RC)$; it is the simplest low-pass filter and appears at almost every analogue input. Its mechanical twin is a spring and damper in series pulled by a step displacement, and its thermal twin is the sensor of [[mechatronics/sensors]] whose temperature lags the fluid it is immersed in.

::: widget plot
title: RC charging curve
f: 1 - exp(-x/tau); 1 - exp(-1)
x: 0, 10
y: 0, 1.05
sliders: tau=1:0.2:4:0.1
labels: v_C/V; 63.2\,\%
caption: Normalised capacitor voltage against time in milliseconds for a time constant $\tau = RC$ (in ms) set by the slider. Whatever $\tau$, the curve crosses the $63.2\,\%$ line at $t = \tau$ and its initial slope would reach the final value at $t = \tau$. Doubling $R$ or $C$ doubles the time to settle — the reason a heavily filtered input responds slowly.
:::

### Inductive loads and transistor switches

Solenoids, relays, motor windings and valve coils are inductors in series with a resistance. A microcontroller pin can supply only a few milliamperes, so it drives such loads through a **transistor switch**: usually an N-channel **MOSFET** connected between the load and ground (a *low-side switch*). When the gate–source voltage exceeds the threshold by a margin, the MOSFET conducts with a small on-resistance $R_{\text{DS(on)}}$ and dissipates $I^2R_{\text{DS(on)}}$; when the gate is at $0\ \mathrm{V}$ it blocks. For a $3.3\ \mathrm{V}$ microcontroller the MOSFET must be a *logic-level* type whose $R_{\text{DS(on)}}$ is specified at a gate voltage of $2.5$–$4.5\ \mathrm{V}$; a MOSFET specified only at $10\ \mathrm{V}$ may barely turn on.

The danger appears at switch-off. The coil's current cannot change instantaneously ($v = L\,\mathrm{d}i/\mathrm{d}t$), so when the transistor tries to interrupt it the coil voltage rises until something conducts — usually the transistor, destructively. The standard protection is a **flyback** (freewheeling) diode across the coil, which gives the current a path to circulate and decay.

::: proposition Current decay in a freewheeling coil {#prop-flyback}
A coil of inductance $L$ and resistance $R$ carries current $I_0$ when its switch opens at $t = 0$. If the current then circulates through a freewheeling path containing a constant voltage drop $V_z$ (the clamp voltage: about $0.7\ \mathrm{V}$ for a plain diode, larger with a Zener diode or resistor in series), the current is
$$
i(t) = \left(I_0 + \frac{V_z}{R}\right)e^{-t/\tau} - \frac{V_z}{R},\qquad \tau = \frac{L}{R},
$$ {#eq-flyback}
valid until $i$ reaches zero (the diode then blocks). The current reaches zero after $t_0 = \tau\ln\left(1 + RI_0/V_z\right)$. The energy $\tfrac12LI_0^2$ stored in the coil is dissipated in $R$ and in the clamp.
:::

::: proof
KVL around the freewheeling loop: $L\,\mathrm{d}i/\mathrm{d}t + Ri + V_z = 0$. This first-order ODE has particular solution $i = -V_z/R$ and homogeneous solution $Ae^{-Rt/L}$; $i(0) = I_0$ gives $A = I_0 + V_z/R$, hence [[#eq-flyback]]. Setting $i(t_0) = 0$ gives $e^{-t_0/\tau} = (V_z/R)/(I_0 + V_z/R)$, i.e. $t_0 = \tau\ln(1 + RI_0/V_z)$. Energy: multiply the loop equation by $i$ and integrate from $0$ to $t_0$: $-\int Li\,\mathrm{d}i = \int(Ri^2 + V_zi)\,\mathrm{d}t$, and the left side is $\tfrac12LI_0^2$. As $V_z \to 0$ (an ideal diode), $t_0 \to \infty$: the current decays only exponentially, with time constant $L/R$.
:::

::: example Driving a solenoid valve {#ex-solenoid}
A $12\ \mathrm{V}$ solenoid valve has coil resistance $24\ \mathrm{\Omega}$ and inductance $0.12\ \mathrm{H}$. It is switched by a logic-level MOSFET with $R_{\text{DS(on)}} = 0.050\ \mathrm{\Omega}$. Find (a) the coil current and the MOSFET conduction loss, (b) the stored energy, (c) the voltage that would appear if the current were interrupted in $1\ \mathrm{\mu s}$ without protection, (d) the time for the current to fall to $10\,\%$ with a plain freewheeling diode (neglect its drop), and to zero with a $24\ \mathrm{V}$ Zener clamp.
::: solution
(a) $I_0 = 12/24 = 0.50\ \mathrm{A}$ (the $0.05\ \mathrm{\Omega}$ of the MOSFET is negligible). Conduction loss $I_0^2R_{\text{DS(on)}} = 0.25 \times 0.050 = 12.5\ \mathrm{mW}$ — no heat sink needed.

(b) $\tfrac12LI_0^2 = 0.5 \times 0.12 \times 0.25 = 0.015\ \mathrm{J}$.

(c) $L\,\Delta i/\Delta t = 0.12 \times 0.50/10^{-6} = 6\times10^{4}\ \mathrm{V}$. In reality the voltage rises only until the MOSFET avalanches (perhaps $60\ \mathrm{V}$), which then has to absorb the $15\ \mathrm{mJ}$ — repeated at every switch-off, this kills transistors that are not rated for it.

(d) $\tau = L/R = 0.12/24 = 5.0\ \mathrm{ms}$. With a diode, $i = I_0e^{-t/\tau}$ falls to $10\,\%$ at $t = \tau\ln 10 = 11.5\ \mathrm{ms}$. With a $24\ \mathrm{V}$ Zener, $t_0 = 5.0\ln(1 + 24 \times 0.5/24) = 5.0\ln 1.5 = 2.03\ \mathrm{ms}$.

Sanity check: the diode protects the transistor (the drain rises only to $12.7\ \mathrm{V}$) but keeps the valve energised for some milliseconds after the command; the Zener clamp lets the drain rise to $12 + 24 = 36\ \mathrm{V}$, so the MOSFET must be rated above that, and in exchange the valve releases about five times sooner. Fast-acting valves and injectors use exactly this trade.
:::
:::

::: warning The missing flyback diode
Driving a relay, solenoid or motor from a transistor without a freewheeling path is the commonest way to destroy driver transistors, and the failure is often delayed: each switch-off avalanches the transistor a little, and it fails after hours or days. The diode goes *across the coil* (cathode to the positive supply side), not across the transistor. Two related mistakes: assuming a microcontroller pin can drive a coil directly (it can supply milliamperes, not the hundreds of milliamperes a coil needs), and forgetting the common ground between the logic supply and the load supply, without which the gate voltage is undefined.
:::

::: quiz
A sensor with an output resistance of $5\ \mathrm{k\Omega}$ is read by a data logger with an input resistance of $100\ \mathrm{k\Omega}$. Roughly how large is the loading error?
- [ ] $0.05\,\%$
- [ ] $0.5\,\%$
- [x] $5\,\%$
- [ ] $50\,\%$
::: solution
The reading is $R_L/(R_{\text{Th}} + R_L) = 100/105 = 0.952$ of the true voltage: an error of $4.8\,\%$, about $R_{\text{Th}}/R_L = 5\,\%$. For a $0.1\,\%$ error the input resistance would have to exceed $5\ \mathrm{M\Omega}$, or a buffer amplifier be used.
:::
:::

## Closing a first loop {#sec-first-loop}

To see the elements working together, consider the simplest position servo: a DC motor driving a light load, its angle $\theta$ measured by an encoder, and a controller that applies a voltage proportional to the position error, $v = K(\theta_{\text{ref}} - \theta)$ (proportional control). The motor model derived in [[mechatronics/electric-actuators]] gives, when the winding inductance is negligible, a transfer function from voltage to angle of the form
$$
G(s) = \frac{\Theta(s)}{V(s)} = \frac{b}{s(s + a)},
$$ {#eq-motor-tf}
with an integrator (voltage sets speed, speed integrates to angle) and one pole at $s = -a$ set by the mechanical time constant $1/a$.

::: proposition Proportional position control of a motor {#prop-p-servo}
With the plant [[#eq-motor-tf]] and controller gain $K$ in a unity-feedback loop, the closed-loop transfer function is
$$
\frac{\Theta(s)}{\Theta_{\text{ref}}(s)} = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2},\qquad \omega_n = \sqrt{Kb},\qquad \zeta = \frac{a}{2\sqrt{Kb}} .
$$ {#eq-p-servo}
The loop is stable for every $K > 0$; the steady-state error to a step is zero, and to a ramp $\theta_{\text{ref}} = \Omega t$ it is $e_{ss} = \Omega a/(Kb)$.
:::

::: proof
The loop transfer function is $KG(s)$, so the closed loop is $KG/(1 + KG) = Kb/(s^2 + as + Kb)$. Matching coefficients with the standard second-order form gives $\omega_n^2 = Kb$ and $2\zeta\omega_n = a$. For $a, b, K > 0$ both coefficients of the characteristic polynomial $s^2 + as + Kb$ are positive, which for a quadratic is necessary and sufficient for both roots to lie in the left half-plane. The error transform is $E = \Theta_{\text{ref}}/(1 + KG) = \Theta_{\text{ref}}\,s(s + a)/(s^2 + as + Kb)$. By the final value theorem, for a step $\Theta_{\text{ref}} = 1/s$, $e_{ss} = \lim_{s\to0} s(s+a)/(s^2 + as + Kb) = 0$; for a ramp $\Theta_{\text{ref}} = \Omega/s^2$, $e_{ss} = \lim_{s\to0}\Omega(s + a)/(s^2 + as + Kb) = \Omega a/(Kb)$.
:::

Raising $K$ makes the loop faster ($\omega_n$ grows as $\sqrt K$) but less damped ($\zeta$ falls as $1/\sqrt K$), and reduces the following error at constant speed. The step response of the standard second-order system is derived in [[control-systems/time-response]]: the overshoot is $M_p = e^{-\pi\zeta/\sqrt{1 - \zeta^2}}$ and the $2\,\%$ settling time about $4/(\zeta\omega_n)$.

::: example Choosing a proportional gain {#ex-p-gain}
A motor and load have $G(s) = 10/[s(s + 5)]$, with $\theta$ in radians and $v$ in volts. Choose the proportional gain $K$ (in V/rad) that gives a damping ratio of $0.5$, and find the overshoot, the settling time, and the following error at $2\ \mathrm{rad/s}$.
::: solution
Here $a = 5\ \mathrm{s^{-1}}$ and $b = 10\ \mathrm{rad\,V^{-1}\,s^{-2}}$. From [[#eq-p-servo]], $2\zeta\omega_n = 5$ with $\zeta = 0.5$ gives $\omega_n = 5\ \mathrm{rad/s}$, so $Kb = 25$ and $K = 2.5\ \mathrm{V/rad}$.

Overshoot: $M_p = e^{-\pi \times 0.5/\sqrt{0.75}} = e^{-1.814} = 0.163$, i.e. $16.3\,\%$. Settling time: $4/(\zeta\omega_n) = 4/2.5 = 1.6\ \mathrm{s}$. Following error at $\Omega = 2\ \mathrm{rad/s}$: $e_{ss} = 2 \times 5/25 = 0.40\ \mathrm{rad}$.

Sanity check: $\zeta\omega_n = a/2 = 2.5\ \mathrm{s^{-1}}$ for *every* gain — proportional control cannot make this loop settle faster than about $1.6\ \mathrm{s}$; it can only change the oscillation frequency. Faster settling needs derivative (velocity) feedback, which moves the real part of the poles ([[mechatronics/motion-control]]). And a following error of $0.4\ \mathrm{rad}$ ($23°$) would be unacceptable in most machines; the cures are a higher gain with velocity feedback, integral action or feedforward.
:::
:::

::: widget plot
title: Proportional position control of a motor
f: 1 - exp(-2.5*x)*(cos(sqrt(10*K - 6.25)*x) + 2.5/sqrt(10*K - 6.25)*sin(sqrt(10*K - 6.25)*x)); 1
x: 0, 4
y: 0, 1.9
sliders: K=2.5:0.7:20:0.1
labels: \theta/\theta_{\text{ref}}; \text{reference}
caption: Unit step response of the loop of the example, $G(s) = 10/[s(s+5)]$ under proportional control with gain $K$ in V/rad (valid for $K > 0.625$, where the response oscillates). Raise $K$: the oscillation gets faster and the overshoot larger, but the envelope $e^{-2.5t}$ — and so the settling time — does not change. Nothing you do with this slider makes the loop unstable, which is a property of the model, not of the real motor.
:::

::: warning A model with no ultimate gain
The Ziegler–Nichols ultimate-cycle method tunes a controller from the gain $K_u$ at which a proportional loop just oscillates and the period $T_u$ of that oscillation ([[control-systems/pid-control]]). Applied on paper to $G(s) = 10/[s(s+5)]$ it fails: the characteristic polynomial $s^2 + 5s + 10K$ has stable roots for every $K$, so there is no $K_u$ and no $T_u$, and any "ultimate gain" quoted for this model is invented. Real motors do oscillate at some gain, because the model omits the amplifier's bandwidth, the winding inductance, the sampling delay of the digital controller and the compliance of the load; it is these neglected lags that set the true stability limit. [[#exr-ultimate]] adds one of them and finds a finite $K_u$. The lesson: before trusting a gain margin computed from a model, ask which dynamics were left out.
:::

## Budgets and rules of thumb {#sec-budgets}

A few quantitative rules connect the elements of the loop and are used throughout the course. Each is a rule of thumb, not a law; know where it comes from so you can tell when it does not apply.

- **Sensor resolution versus required accuracy.** The resolution of the feedback sensor should be several times — typically 4 to 10 times — finer than the positioning accuracy required, because the loop cannot hold a position more closely than it can see it, and other errors (backlash, thermal growth, noise) take their share of the budget.
- **Sensor and actuator bandwidth versus loop bandwidth.** Every element inside the loop adds phase lag. Elements whose bandwidth is five to ten times the intended closed-loop bandwidth add only a few degrees and can usually be treated as ideal; slower elements must be modelled.
- **Sampling rate versus loop bandwidth.** A digital controller sampling at $f_s$ adds an effective delay of about half a sample plus the computation time. Sampling at 10 to 30 times the closed-loop bandwidth keeps that delay a small fraction of the phase margin ([[control-systems/digital-control]], [[mechatronics/microcontrollers]]).
- **Mechanical resonance versus loop bandwidth.** The lowest structural resonance of the mechanism inside the loop should lie well above the loop bandwidth — a factor of three or more — or it must be filtered and the loop slowed ([[mechatronics/motion-control]]).

::: example A first loop budget {#ex-loop-budget}
A carriage must be positioned to $\pm 20\ \mathrm{\mu m}$ over a $300\ \mathrm{mm}$ stroke, with a closed-loop position bandwidth of $20\ \mathrm{Hz}$. It is driven by a motor through a ball screw with $5\ \mathrm{mm}$ lead (travel per revolution). Using the rules above, specify the minimum encoder resolution on the motor shaft, the minimum bandwidth of the current amplifier, a suitable controller sampling rate, and the lowest acceptable structural resonance.
::: solution
Resolution: at least four times finer than $20\ \mathrm{\mu m}$, so $5\ \mathrm{\mu m}$ or better per count. Counts per revolution $\ge 5\ \mathrm{mm}/5\ \mathrm{\mu m} = 1000$. A 500-line quadrature encoder read with ×4 decoding gives $2000$ counts per revolution ($2.5\ \mathrm{\mu m}$ per count) and leaves margin ([[mechatronics/sensors]]).

Amplifier bandwidth: at least $5$–$10 \times 20 = 100$–$200\ \mathrm{Hz}$; current loops of commercial servo drives are typically above $1\ \mathrm{kHz}$, so this is easily met.

Sampling: $10$–$30 \times 20\ \mathrm{Hz} = 200\ \mathrm{Hz}$–$600\ \mathrm{Hz}$ at the very least; in practice $1$–$4\ \mathrm{kHz}$ is chosen because the velocity estimate from the encoder improves with a faster loop and processors are cheap.

Resonance: at least $3 \times 20 = 60\ \mathrm{Hz}$, preferably more, for the lowest mode of the carriage, screw and frame seen by the motor.

Sanity check: the numbers are mutually consistent — a $2.5\ \mathrm{\mu m}$ count at a top speed of, say, $0.25\ \mathrm{m/s}$ arrives at $100\ \mathrm{kHz}$, well within the counting rate of microcontroller encoder interfaces.
:::
:::

::: history
The word *mechatronics* was coined in 1969 by Tetsuro Mori, an engineer at the Japanese motor manufacturer Yaskawa Electric, from *mecha*nism and elec*tronics*, to describe the company's motors with integrated electronic control. Yaskawa applied to register it as a trademark in 1969, obtained the registration in 1972, and later gave up its rights so that the word could be used freely; by the 1980s it was in general use in Japan and Europe. The idea is older than the word. James Watt's centrifugal governor (fitted to his rotative steam engines from 1788) measured engine speed with flyweights and moved the throttle — a sensor, controller and actuator in one mechanism — and James Clerk Maxwell's paper *On Governors* (1868) gave the first mathematical analysis of why such loops can oscillate. What changed in the 1970s was the arrival of the cheap microprocessor (the Intel 4004 of 1971 and the single-chip microcontrollers that followed), which moved the controller from mechanism and analogue circuit into software.
:::

::: summary
- A mechatronic system measures a mechanical process with sensors, decides in a (usually digital) controller and acts through power electronics and actuators; the information path and the power path are kept separate.
- Feedback makes a machine insensitive to plant changes and disturbances but can cause oscillation; each loop runs at a rate set by the speed of its process.
- Ohm's law, KCL and KVL, plus $i = C\,\mathrm{d}v/\mathrm{d}t$ and $v = L\,\mathrm{d}i/\mathrm{d}t$, cover the interfacing calculations of this course.
- Any linear source looks like $V_{\text{Th}}$ in series with $R_{\text{Th}}$; a load $R_L$ reads $V_{\text{Th}}R_L/(R_{\text{Th}} + R_L)$, so inputs must have resistance much greater than the source's.
- An RC circuit responds with time constant $\tau = RC$ and is a first-order low-pass filter with corner frequency $1/(2\pi RC)$.
- Inductive loads need a freewheeling path; the current then decays with time constant $L/R$, faster with a higher clamp voltage.
- Proportional control of a motor, $G = b/[s(s+a)]$, gives $\omega_n = \sqrt{Kb}$ and $\zeta = a/(2\sqrt{Kb})$: gain trades speed of oscillation against damping, and the model's unconditional stability is an artefact of neglected lags.
- Budgets connect the elements: sensor resolution several times finer than the accuracy, in-loop elements and sampling several times faster than the loop, resonances well above it.
:::

## Exercises

::: exercise Divider design {level=1 check="30"}
A pressure transmitter gives $0$–$10\ \mathrm{V}$. Using $R_2 = 10\ \mathrm{k\Omega}$ as the bottom resistor, find $R_1$ so that the divider output is $0$–$2.5\ \mathrm{V}$. (Enter $R_1$ in kΩ.)
::: solution
$R_2/(R_1 + R_2) = 2.5/10 = 1/4$, so $R_1 + R_2 = 40\ \mathrm{k\Omega}$ and $R_1 = 30\ \mathrm{k\Omega}$. The Thévenin resistance is $30 \times 10/40 = 7.5\ \mathrm{k\Omega}$.
:::
:::

::: exercise A loaded divider {level=1 check="4"}
Two $10\ \mathrm{k\Omega}$ resistors divide a $12\ \mathrm{V}$ supply. A $10\ \mathrm{k\Omega}$ load is connected across the lower resistor. Find the output voltage. (Enter it in V.)
::: solution
$V_{\text{Th}} = 6\ \mathrm{V}$, $R_{\text{Th}} = 5\ \mathrm{k\Omega}$, so $V_{\text{out}} = 6 \times 10/15 = 4\ \mathrm{V}$. Directly: the lower resistor in parallel with the load is $5\ \mathrm{k\Omega}$, and $12 \times 5/15 = 4\ \mathrm{V}$.
:::
:::

::: exercise An RC input filter {level=1 check="1"}
An analogue input has a series resistor of $10\ \mathrm{k\Omega}$ and a capacitor of $100\ \mathrm{nF}$ to ground. Find its time constant, and state how long the input takes to settle within $1\,\%$ of a step. (Enter the time constant in ms.)
::: solution
$\tau = RC = 10^4 \times 10^{-7} = 10^{-3}\ \mathrm{s} = 1\ \mathrm{ms}$. Settling within $1\,\%$ needs $e^{-t/\tau} = 0.01$, $t = \tau\ln 100 = 4.6\ \mathrm{ms}$. The corner frequency is $1/(2\pi\tau) = 159\ \mathrm{Hz}$.
:::
:::

::: exercise Energy in a coil {level=1 check="0.144"}
A relay coil of resistance $10\ \mathrm{\Omega}$ and inductance $0.20\ \mathrm{H}$ is supplied from $12\ \mathrm{V}$. Find the energy stored in its magnetic field when the current is steady. (Enter it in J.)
::: solution
$I = 12/10 = 1.2\ \mathrm{A}$, energy $\tfrac12LI^2 = 0.5 \times 0.20 \times 1.44 = 0.144\ \mathrm{J}$. This energy must be dissipated in the coil resistance and the freewheeling path every time the relay is switched off.
:::
:::

::: exercise MOSFET losses {level=2 check="0.4"}
A heater drawing $4.0\ \mathrm{A}$ is switched by a MOSFET with $R_{\text{DS(on)}} = 25\ \mathrm{m\Omega}$ at the gate voltage used. Find the conduction loss in the MOSFET, and discuss whether $R_{\text{DS(on)}}$ at $25\,^\circ\mathrm{C}$ is the right value to use. (Enter the loss in W.)
::: solution
$P = I^2R_{\text{DS(on)}} = 16 \times 0.025 = 0.40\ \mathrm{W}$. $R_{\text{DS(on)}}$ rises with junction temperature — typically by a factor of about $1.5$ to $2$ between $25\,^\circ\mathrm{C}$ and $125\,^\circ\mathrm{C}$ — so a careful design uses the hot value from the data sheet, giving $0.6$–$0.8\ \mathrm{W}$, and checks the junction temperature with the thermal resistance ([[mechatronics/system-integration]]).
:::
:::

::: exercise Gain for a chosen damping ratio {level=2 check="1"}
A motor and load have $G(s) = 4/[s(s + 2)]$. Find the proportional gain $K$ that gives $\zeta = 0.5$ in a unity-feedback loop. (Enter $K$.)
::: solution
Characteristic polynomial $s^2 + 2s + 4K$: $2\zeta\omega_n = 2$ gives $\omega_n = 2\ \mathrm{rad/s}$ with $\zeta = 0.5$, so $4K = 4$ and $K = 1$.
:::
:::

::: exercise Following error {level=2 check="0.25"}
For the loop of the previous exercise with $K = 1$, find the steady-state error when the reference angle increases at $0.5\ \mathrm{rad/s}$. (Enter the error in rad.)
::: solution
From [[#prop-p-servo]], $e_{ss} = \Omega a/(Kb) = 0.5 \times 2/(1 \times 4) = 0.25\ \mathrm{rad}$. Equivalently, the velocity error constant is $K_v = \lim_{s\to0}sKG(s) = 4/2 = 2\ \mathrm{s^{-1}}$ and $e_{ss} = \Omega/K_v$.
:::
:::

::: exercise A finite ultimate gain {#exr-ultimate level=3 check="27.5"}
The amplifier driving the motor of [[#ex-p-gain]] has a first-order lag with time constant $20\ \mathrm{ms}$, so the plant becomes $G(s) = 10/[s(s + 5)(0.02s + 1)]$. Find the ultimate gain $K_u$ of a proportional loop and the frequency of the oscillation at that gain. (Enter $K_u$ in V/rad.)
::: solution
Characteristic polynomial: $s(s + 5)(0.02s + 1) + 10K = 0.02s^3 + 1.1s^2 + 5s + 10K$. For a cubic $a_3s^3 + a_2s^2 + a_1s + a_0$ with positive coefficients the Routh criterion requires $a_2a_1 > a_3a_0$: $1.1 \times 5 > 0.02 \times 10K$, i.e. $K < 27.5$. At $K_u = 27.5\ \mathrm{V/rad}$ the auxiliary equation $1.1s^2 + 275 = 0$ gives $s = \pm j\omega_u$ with $\omega_u = \sqrt{250} = 15.8\ \mathrm{rad/s}$, a period $T_u = 2\pi/\omega_u = 0.397\ \mathrm{s}$. A $20\ \mathrm{ms}$ lag that looked negligible beside the $200\ \mathrm{ms}$ mechanical time constant sets the stability limit; Ziegler–Nichols would now give $K_p = 0.6K_u = 16.5\ \mathrm{V/rad}$ for a PID controller — a starting point to be refined, since that rule assumes a different class of plant.
:::
:::

::: exercise Designing a heated-bed controller {level=3}
A 3D printer's heated bed is an aluminium plate with a $24\ \mathrm{V}$, $200\ \mathrm{W}$ resistive heater. It must reach $100\,^\circ\mathrm{C}$ from room temperature and hold it within $\pm 1\,^\circ\mathrm{C}$. Sketch the mechatronic system: choose a sensor, the conditioning, the controller output stage and its protection, the loop rate, and the safety measures. Estimate the heater current and the switch dissipation.
::: solution
A good answer includes: (i) Heater current $200/24 = 8.3\ \mathrm{A}$ (heater resistance $2.88\ \mathrm{\Omega}$). (ii) Sensor: an NTC thermistor bonded to the plate, read through a divider with a fixed resistor into the microcontroller ADC, with an RC filter of time constant around $10\ \mathrm{ms}$; or a Pt100 with a dedicated converter for better accuracy ([[mechatronics/sensors]]). (iii) Output: a logic-level MOSFET low-side switch with $R_{\text{DS(on)}}$ of a few milliohms (with $10\ \mathrm{m\Omega}$ hot, $0.69\ \mathrm{W}$ conduction loss), driven by slow PWM (a few hertz to a few hundred hertz) — the plate's thermal time constant of minutes averages the pulses. A resistive heater needs no flyback diode, but wiring inductance makes a small snubber or diode cheap insurance. Connectors and wiring must be rated for the current; under-rated connectors are a known fire cause. (iv) Loop: PI or PID control at $1$–$10\ \mathrm{Hz}$, tuned from a measured step response. (v) Safety: thermal-runaway detection in software (temperature not rising while the heater is on, or a sensor reading out of range — a detached or shorted thermistor reads as cold or very hot), an independent thermal cut-out, and a fuse. These are the elements of [[mechatronics/system-integration]].
:::
:::
