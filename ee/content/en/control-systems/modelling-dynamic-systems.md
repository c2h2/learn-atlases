A small permanent-magnet DC motor drives the paper feed of a printer. Apply $12\,\mathrm{V}$ and it spins at about $2300\,\mathrm{rpm}$ — until the paper roll gets heavier, the supply sags to $11\,\mathrm{V}$ or the motor warms up and its winding resistance rises. Each of these changes the speed, and none of them is known in advance. The cure is to measure the speed, compare it with the speed we want and adjust the voltage according to the difference. That is **feedback control**, and before we can design the rule that turns an error into a voltage we need a mathematical description of how the motor, the amplifier and the sensor respond to their inputs.

This chapter builds such descriptions. We name the parts of a feedback loop, represent each part by a **transfer function**, combine the parts with **block diagrams**, and derive models of the plants an electrical engineer meets most often: networks of resistors, capacitors, inductors and op-amps, the DC motor, and the averaged model of a switching power converter. Most real devices are nonlinear, so we finish by **linearising** a model about an operating point, using a magnetically levitated steel ball — a plant that is unstable without feedback and that will reappear throughout the course. The Laplace transform of [[signals-systems/laplace-transform]] is the only tool we need.

## The parts of a feedback loop

Every feedback system in this course has the structure below, though some blocks may be trivial.

::: definition Elements of a feedback control system {#def-loop}
- The **plant** (or process) $G(s)$ is the system to be controlled: a motor, a converter, a heater. Its input $u$ is the **control input** or manipulated variable (a voltage, a duty cycle); its output $y$ is the **controlled variable** (a speed, a voltage, a temperature).
- The **reference** $r$ (setpoint, command) is the desired value of $y$.
- The **sensor** $H(s)$ measures $y$; its output $y_m$ is compared with $r$ to form the **error** $e = r - y_m$.
- The **controller** $C(s)$ computes $u$ from $e$.
- A **disturbance** $d$ is an unwanted input that acts on the plant (load torque, input-voltage ripple, ambient temperature); **measurement noise** $n$ corrupts the sensor signal.

The system is **closed-loop** when $u$ depends on the measured output and **open-loop** when $u$ is computed from $r$ alone.
:::

An open-loop controller can work well when the plant is accurately known and undisturbed: a stepper motor driven pulse by pulse, or a toaster on a timer. It cannot correct for anything it does not know about. A closed-loop controller corrects for every effect that changes $y$, whatever its cause, as long as the sensor is accurate. That is the fundamental bargain of feedback: the accuracy of the closed loop rests on the sensor, not on the plant. The price is that feedback can make a loop oscillate, which is why so much of this course is about stability.

::: intuition The thermostat in a soldering iron
A soldering station measures the tip temperature with a thermocouple, compares it with the setpoint and switches the heater on when the tip is too cold. Nobody needs to know the thermal resistance of the joint being soldered: when a large copper pour draws heat from the tip, the temperature falls, the error grows and the heater delivers more power. A cheaper iron with a fixed heater power (open loop) is too hot when idle and too cold on a ground plane.
:::

## Transfer functions

Each block in a loop is a dynamic system: its output depends on the history of its input. For a **linear time-invariant** (LTI) block described by a linear differential equation with constant coefficients, the Laplace transform turns the differential equation into algebra.

::: definition Transfer function {#def-tf}
The **transfer function** of an LTI system with input $u(t)$ and output $y(t)$ is the ratio of Laplace transforms

$$
G(s) = \frac{Y(s)}{U(s)}
$$ {#eq-tf}

computed with all initial conditions zero. For a system described by

$$
a_n\frac{\dd^ny}{\dd t^n} + \dots + a_1\frac{\dd y}{\dd t} + a_0y = b_m\frac{\dd^mu}{\dd t^m} + \dots + b_0u
$$

it is the rational function $G(s) = (b_ms^m + \dots + b_0)/(a_ns^n + \dots + a_0)$. The roots of the numerator are the **zeros**, the roots of the denominator the **poles**, $n$ is the **order**, $G(0)$ is the **DC gain**, and $G$ is **proper** if $m \le n$ and **strictly proper** if $m < n$.
:::

Three facts about transfer functions are used constantly. The transfer function is the Laplace transform of the impulse response, so $Y(s) = G(s)U(s)$ for any input. Its poles are the exponents of the system's natural modes: a pole at $s = p$ produces a term $e^{pt}$ in every response, and complex poles $\sigma \pm j\omega$ produce $e^{\sigma t}\cos(\omega t + \phi)$. And on the imaginary axis it is the frequency response: a sinusoid $\cos\omega t$ applied for a long time to a stable system produces $\abs{G(j\omega)}\cos(\omega t + \angle G(j\omega))$. Physical systems are proper — no real device has a gain that grows without bound with frequency — and most are strictly proper.

### Electrical networks

For circuits the transfer function comes directly from impedances, as in [[circuits-2/laplace-circuit-analysis]]: a resistor has impedance $R$, an inductor $sL$, a capacitor $1/(sC)$, and the usual circuit laws apply with these impedances. Op-amp circuits are particularly useful, because they let us build almost any transfer function we need for a controller.

::: proposition Inverting op-amp stage {#prop-opamp}
An ideal op-amp with input impedance $Z_1(s)$ from the source to the inverting input, feedback impedance $Z_2(s)$ from the output to the inverting input and the non-inverting input grounded has

$$
\frac{V_o(s)}{V_i(s)} = -\frac{Z_2(s)}{Z_1(s)}.
$$ {#eq-opamp}
:::

::: proof
The inverting input is a virtual ground ([[circuits-1/operational-amplifiers]]), so the current through $Z_1$ is $V_i/Z_1$. No current enters the op-amp, so the same current flows through $Z_2$ from the inverting input to the output, giving $0 - V_o = Z_2V_i/Z_1$.
:::

Choosing $Z_1$ and $Z_2$ as combinations of resistors and capacitors gives integrators ($Z_1 = R$, $Z_2 = 1/(sC)$: $-1/(sRC)$), low-pass stages ($Z_2 = R_2\parallel C$), and the proportional-plus-integral stage of the next example. A second inverting stage of gain $-1$ restores the sign when needed.

::: example An op-amp PI controller {#ex-opamp-pi}
Design an inverting op-amp stage with transfer function magnitude $5\left(1 + \dfrac{1}{T_is}\right)$, $T_i = 2\,\mathrm{ms}$, using $R_1 = 10\,\mathrm{k\Omega}$.
::: solution
Take $Z_1 = R_1$ and $Z_2 = R_2 + 1/(sC)$, a resistor in series with a capacitor. By [[#eq-opamp]],

$$
\frac{V_o}{V_i} = -\frac{R_2 + 1/(sC)}{R_1} = -\frac{R_2}{R_1}\left(1 + \frac{1}{sR_2C}\right).
$$

Matching terms: $R_2/R_1 = 5$ gives $R_2 = 50\,\mathrm{k\Omega}$ (the E24 value $51\,\mathrm{k\Omega}$, or $49.9\,\mathrm{k\Omega}$ from E96), and $R_2C = T_i$ gives $C = 2\times10^{-3}/(5\times10^4) = 40\,\mathrm{nF}$; the nearest E12 value is $39\,\mathrm{nF}$, which changes $T_i$ by $2.5\,\%$. The proportional gain is set by a resistor ratio and the integral time by an $RC$ product, so they can be adjusted independently. A real circuit also needs a way of limiting the integrator output, which we discuss in [[control-systems/pid-control]].
:::
:::

## Block diagrams

A block diagram shows how signals flow between transfer-function blocks. Arrows carry Laplace-transformed signals, a block multiplies its input by its transfer function, a summing junction adds or subtracts signals according to the signs written at its inputs, and a pick-off point copies a signal without loading it. That last assumption matters: a block diagram treats each block as unaffected by what is connected to its output, which is true for op-amp outputs and sensors with high input impedance but false for, say, two passive RC sections in cascade.

::: theorem Block diagram algebra {#thm-blocks}
1. **Series**: blocks $G_1$ and $G_2$ in cascade are equivalent to $G_1G_2$.
2. **Parallel**: blocks $G_1$ and $G_2$ with the same input whose outputs are added are equivalent to $G_1 + G_2$.
3. **Feedback**: a forward block $G$ with a block $H$ in the feedback path and the feedback subtracted at the input is equivalent to

$$
T(s) = \frac{Y(s)}{R(s)} = \frac{G(s)}{1 + G(s)H(s)} .
$$ {#eq-feedback}

The product $L(s) = G(s)H(s)$ is the **loop gain** (or open-loop transfer function), and $1 + L(s) = 0$ is the **characteristic equation** of the loop.
:::

::: proof
Series and parallel follow from $Y = G_2(G_1U)$ and $Y = G_1U + G_2U$. For the feedback loop, the error is $E = R - HY$ and $Y = GE$, so $Y = GR - GHY$, hence $(1 + GH)Y = GR$ and [[#eq-feedback]] follows wherever $1 + GH \neq 0$.
:::

The same algebra lets us move a summing junction or a pick-off point across a block, provided we insert a compensating block: moving a pick-off point from the output of $G$ to its input requires a block $G$ in the branch, and moving a summing junction from the output of $G$ to its input requires $1/G$ in the added path. For diagrams with several interlocking loops, Mason's gain formula gives the overall transfer function in one step; for the loops in this course, repeated use of [[#thm-blocks]] is enough.

::: warning The sign in the feedback formula
[[#eq-feedback]] holds for *negative* feedback, where the measured output is subtracted. With positive feedback the denominator becomes $1 - GH$. Many errors in control calculations come from a sign that was dropped in a block diagram: an inverting op-amp stage contributes a factor $-1$ to the loop, so a loop made of an inverting controller and a non-inverting plant must take the feedback at a summing junction with a $+$ sign — or use the controller's inverting input as the subtraction. Always multiply all the signs around a loop and check that the result is negative feedback at DC.
:::

With a disturbance, the plant output is the sum of two effects. Because the system is linear we find each closed-loop transfer function with the other input set to zero and add the results (superposition).

::: example A speed loop with a load disturbance {#ex-speed-loop}
A motor's speed obeys $\Omega(s) = G_v(s)V(s) - G_d(s)T_L(s)$ with $G_v = 19.8/(0.0159s + 1)$ in $\mathrm{rad\,s^{-1}/V}$ and $G_d = 794/(0.0159s + 1)$ in $\mathrm{rad\,s^{-1}/(N\,m)}$ (these come from [[#ex-motor]]). A proportional amplifier of gain $K_c = 10$ drives the motor from the error between a reference voltage $r$ and a tachometer signal $0.02\,\mathrm{V}$ per $\mathrm{rad/s}$. Find the closed-loop transfer functions from $r$ and from $T_L$, the steady speed for $r = 4\,\mathrm{V}$, and the speed drop caused by a load of $10\,\mathrm{mN\,m}$, with and without feedback.
::: solution
The loop gain is $L(s) = K_cG_v(s)H = 10\times19.8\times0.02/(0.0159s + 1) = 3.97/(0.0159s + 1)$. With $T_L = 0$, [[#eq-feedback]] gives

$$
\frac{\Omega}{R} = \frac{K_cG_v}{1 + L} = \frac{198}{0.0159s + 4.97} = \frac{39.9}{0.0032s + 1}.
$$

With $r = 0$, the load enters at the plant output; the loop sees $\Omega$ through $H$, $K_c$ and $G_v$, so $\Omega = -G_dT_L - K_cG_vH\,\Omega$, giving

$$
\frac{\Omega}{T_L} = \frac{-G_d}{1 + L} = \frac{-794}{0.0159s + 4.97} = \frac{-160}{0.0032s + 1}.
$$

At DC: $r = 4\,\mathrm{V}$ gives $\Omega = 39.9\times4 = 160\,\mathrm{rad/s}$ ($1520\,\mathrm{rpm}$). A load of $0.01\,\mathrm{N\,m}$ lowers the speed by $794\times0.01 = 7.9\,\mathrm{rad/s}$ in open loop but only by $160\times0.01 = 1.6\,\mathrm{rad/s}$ in closed loop: feedback divides the effect of the disturbance by $1 + L(0) = 4.97$. It also speeds up the response, from a time constant of $15.9\,\mathrm{ms}$ to $3.2\,\mathrm{ms}$. A residual error remains because the controller is only proportional; an integrator removes it ([[control-systems/time-response]]).
:::
:::

::: quiz
In a unity-feedback loop ($H = 1$) the forward transfer function is $G(s) = 100/(s + 10)$. What is the closed-loop DC gain?
- [ ] $10$
- [x] $10/11 \approx 0.909$
- [ ] $100/110$ divided by $10$
- [ ] $1$ exactly
::: solution
$G(0) = 10$, so by [[#eq-feedback]] $T(0) = 10/(1 + 10) = 0.909$. The closed-loop gain approaches $1/H = 1$ only as the loop gain becomes large; with $L(0) = 10$ the output settles $9\,\%$ below the reference.
:::
:::

## Electromechanical systems

Motors, loudspeakers, relays and actuators couple an electrical circuit to a mechanical one. The mechanical side has its own elements, and each has an electrical analogue.

| translation | rotation | element law | electrical analogue (force–voltage) |
|---|---|---|---|
| mass $m$ | inertia $J$ | $f = m\,\dot v$, $\tau = J\dot\omega$ | inductor $L$ |
| damper $b$ | rotational damper $b$ | $f = bv$, $\tau = b\omega$ | resistor $R$ |
| spring $k$ | torsional spring $k$ | $f = k\int v\,\dd t$ | capacitor, $1/C$ |
| force $f$, velocity $v$ | torque $\tau$, speed $\omega$ | | voltage, current |

In this **force–voltage analogy**, a mass–spring–damper driven by a force behaves exactly like a series RLC circuit driven by a voltage, and the same transfer functions describe both. The mechanical atlas develops these models in detail ([Mechanical Atlas: modelling dynamic systems](/learn/mechanical/lesson.php?c=control-systems&l=modelling-dynamic-systems)); here we need only Newton's law for a rotating body, $J\dot\omega = \sum\tau$.

### The DC motor

A permanent-magnet DC motor has an armature winding of resistance $R$ and inductance $L$ that rotates in the field of the magnets. Two physical laws couple the electrical and mechanical sides ([[electric-machines/dc-machines]] derives them from the Lorentz force and Faraday's law): the torque is proportional to the armature current, $\tau = K_ti$, and the rotating winding generates a **back-EMF** proportional to speed, $e = K_e\omega$.

::: theorem DC motor model {#thm-dc-motor}
For a permanent-magnet DC motor with armature voltage $v$, load torque $\tau_L$, rotor and load inertia $J$ and viscous friction $b$,

$$
v = Ri + L\frac{\dd i}{\dd t} + K\omega, \qquad J\frac{\dd\omega}{\dd t} + b\omega = Ki - \tau_L,
$$ {#eq-motor-ode}

where $K = K_t = K_e$ in SI units ($\mathrm{N\,m/A} = \mathrm{V\,s/rad}$). The speed is

$$
\Omega(s) = \frac{K}{(Ls + R)(Js + b) + K^2}\,V(s) - \frac{Ls + R}{(Ls + R)(Js + b) + K^2}\,T_L(s),
$$ {#eq-motor-tf}

and the shaft angle is $\Theta(s) = \Omega(s)/s$.
:::

::: proof
The first equation is Kirchhoff's voltage law around the armature: the applied voltage equals the resistive drop, the inductive drop and the back-EMF. The second is Newton's law: the inertia accelerates under the motor torque minus friction and load. Equality of $K_t$ and $K_e$ follows from conservation of energy: the electrical power converted, $ei = K_e\omega i$, must equal the mechanical power produced, $\tau\omega = K_ti\omega$. Transforming with zero initial conditions,

$$
(Ls + R)I = V - K\Omega, \qquad (Js + b)\Omega = KI - T_L .
$$

Substituting $I = (V - K\Omega)/(Ls + R)$ into the second equation and multiplying by $Ls + R$ gives $[(Ls + R)(Js + b) + K^2]\,\Omega = KV - (Ls + R)T_L$, which is [[#eq-motor-tf]].
:::

The term $K^2$ in the denominator is the back-EMF acting as internal feedback: a faster motor generates more back-EMF, which reduces the current and the torque. In block-diagram form the motor is a loop with forward path $K/[(Ls + R)(Js + b)]$ and feedback $K$.

::: example A small DC motor {#ex-motor}
A motor has $R = 2\,\Omega$, $L = 1\,\mathrm{mH}$, $K = 0.05\,\mathrm{N\,m/A}$, $J = 2\times10^{-5}\,\mathrm{kg\,m^2}$ (rotor plus load) and $b = 10^{-5}\,\mathrm{N\,m\,s/rad}$. Find the transfer function from voltage to speed, its poles and DC gain, the no-load speed at $12\,\mathrm{V}$ and the stall current.
::: solution
The denominator of [[#eq-motor-tf]] is

$$
(10^{-3}s + 2)(2\times10^{-5}s + 10^{-5}) + 0.05^2 = 2\times10^{-8}s^2 + 4.001\times10^{-5}s + 2.52\times10^{-3},
$$

so

$$
\frac{\Omega(s)}{V(s)} = \frac{0.05}{2\times10^{-8}s^2 + 4.001\times10^{-5}s + 2.52\times10^{-3}}.
$$

The quadratic formula gives poles at $s = -65.1\,\mathrm{s^{-1}}$ and $s = -1935\,\mathrm{s^{-1}}$, that is time constants of $15.4\,\mathrm{ms}$ and $0.52\,\mathrm{ms}$. The DC gain is $0.05/0.00252 = 19.8\,\mathrm{rad\,s^{-1}/V}$, so at $12\,\mathrm{V}$ the no-load speed is $238\,\mathrm{rad/s}$, or $238\times60/(2\pi) = 2270\,\mathrm{rpm}$. At stall ($\omega = 0$) the current is $V/R = 6\,\mathrm{A}$ and the torque $K\times6 = 0.3\,\mathrm{N\,m}$.

The two poles are far apart. The fast one belongs mostly to the electrical circuit, $L/R = 0.5\,\mathrm{ms}$; the slow one is the **mechanical time constant**

$$
\tau_m \approx \frac{RJ}{K^2 + Rb} = \frac{2\times2\times10^{-5}}{0.00252} = 15.9\,\mathrm{ms},
$$

obtained by setting $L = 0$. Neglecting $L$ gives the first-order model $\Omega/V \approx 19.8/(0.0159s + 1)$ used in [[#ex-speed-loop]], accurate for signals much slower than $1/0.5\,\mathrm{ms}$. The disturbance transfer function at DC is $R/(Rb + K^2) = 794\,\mathrm{rad\,s^{-1}/(N\,m)}$.
:::
:::

::: widget plot
f: 238.1*(1 + ((-(l*1e-8 + 4e-5) - sqrt((l*1e-8 + 4e-5)^2 - l*2.016e-10))*exp((-(l*1e-8 + 4e-5) + sqrt((l*1e-8 + 4e-5)^2 - l*2.016e-10))/(l*4e-8)*x/1000) - (-(l*1e-8 + 4e-5) + sqrt((l*1e-8 + 4e-5)^2 - l*2.016e-10))*exp((-(l*1e-8 + 4e-5) - sqrt((l*1e-8 + 4e-5)^2 - l*2.016e-10))/(l*4e-8)*x/1000))/(2*sqrt((l*1e-8 + 4e-5)^2 - l*2.016e-10)/(l*4e-8))); 238.1*(1 - exp(-x/15.87))
x: 0, 80
y: 0, 260
sliders: l=1:0.1:5:0.1
hlines: 238.1
labels: \omega(t)\ \text{exact}; \text{first-order model}
caption: Speed (rad/s) of the motor of [[#ex-motor]] after a $12\,\mathrm{V}$ step, against time in milliseconds, with the armature inductance $l$ in millihenries on the slider. The exact second-order response (blue) starts with zero slope because the current must first build up through $L$; the first-order model (orange) ignores this. For $l = 1$ the two are almost indistinguishable after a few milliseconds; raise $l$ to $5$ and the electrical pole moves towards the mechanical one, so the first-order model becomes visibly optimistic.
:::

::: remark Gearboxes and reflected inertia
A motor usually drives its load through a gearbox of ratio $N$ (motor turns per load turn). The load speed is $\omega_m/N$ and the load torque reaches the motor divided by $N$, so a load inertia $J_L$ appears at the motor shaft as $J_L/N^2$. A modest gear ratio therefore lets a small motor accelerate a large load, and it makes the load parameters, which may be uncertain, matter less to the motor model.
:::

## Power converters and other electrical plants

Switching power converters are controlled by their **duty cycle** $d$, the fraction of each switching period during which the main switch is on ([[power-electronics/dc-dc-converters]]). The instantaneous waveforms are discontinuous, but a controller acting much more slowly than the switching frequency sees only their averages over one period. Averaging turns the converter into a continuous, often nonlinear, model; for the buck converter the result is linear.

::: proposition Averaged model of the buck converter {#prop-buck}
A buck converter with input voltage $V_{in}$, inductor $L$, output capacitor $C$ and resistive load $R$, operating in continuous conduction, has averaged equations

$$
L\frac{\dd i_L}{\dd t} = dV_{in} - v_o, \qquad C\frac{\dd v_o}{\dd t} = i_L - \frac{v_o}{R},
$$ {#eq-buck-avg}

and transfer function from duty cycle to output voltage

$$
\frac{V_o(s)}{D(s)} = \frac{V_{in}}{LCs^2 + (L/R)s + 1}.
$$ {#eq-buck-tf}
:::

::: proof
During the on-time the switch node is at $V_{in}$, during the off-time the diode (or lower switch) holds it at $0$, so its average over a period is $dV_{in}$. The inductor sees the switch-node voltage minus $v_o$; averaging $L\,\dd i_L/\dd t$ over one period gives the first equation. The capacitor current is the inductor current minus the load current, which gives the second. Both are linear in $i_L$, $v_o$ and the product $dV_{in}$; with $V_{in}$ constant, transforming and eliminating $I_L$ gives $(LCs^2 + (L/R)s + 1)V_o = V_{in}D$. The model is valid for frequencies well below the switching frequency and while the inductor current never reaches zero.
:::

::: example A buck converter as a plant {#ex-buck}
A buck converter has $V_{in} = 12\,\mathrm{V}$, $L = 10\,\mathrm{\mu H}$, $C = 100\,\mathrm{\mu F}$ and a load of $R = 1\,\Omega$, and switches at $500\,\mathrm{kHz}$. Find the natural frequency, damping ratio and DC gain of its control-to-output transfer function, and comment on what they mean for a voltage controller.
::: solution
Comparing [[#eq-buck-tf]] with $V_{in}\omega_n^2/(s^2 + 2\zeta\omega_ns + \omega_n^2)$:

$$
\omega_n = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{10^{-5}\times10^{-4}}} = 3.16\times10^4\,\mathrm{rad/s}\ (5.03\,\mathrm{kHz}),\qquad \zeta = \frac{1}{2R}\sqrt{\frac{L}{C}} = \frac{1}{2}\sqrt{0.1} = 0.158 .
$$

The DC gain is $V_{in} = 12\,\mathrm{V}$ per unit of duty cycle, so $3.3\,\mathrm{V}$ needs $d = 0.275$. The plant is a lightly damped resonance ($Q = 1/(2\zeta) = 3.16$, a $10\,\mathrm{dB}$ peak) about a hundred times below the switching frequency. Its phase falls through $-90^\circ$ at $5\,\mathrm{kHz}$ and approaches $-180^\circ$ just above, so a simple integral controller would make a poorly damped loop; the compensators of [[control-systems/compensator-design]] add phase lead near the resonance. The damping depends on the load: at light load ($R$ large) $\zeta$ is smaller still, which is why converter loops are designed at the worst-case load. The capacitor's equivalent series resistance, ignored here, adds a zero ([[#exr-esr]]).
:::
:::

Many other electrical plants are first-order. A heater with thermal capacity $C_{th}$ (in $\mathrm{J/K}$) and thermal resistance $R_{th}$ to ambient (in $\mathrm{K/W}$) obeys $C_{th}\,\dd T/\dd t = P - (T - T_a)/R_{th}$, the same equation as an RC circuit driven by a current, with time constant $R_{th}C_{th}$. An inductive load such as a solenoid, driven by a voltage, has current transfer function $1/(Ls + R)$. A battery charger, a lamp dimmer and a heated crystal oven are all such loops.

## Linearisation

Transfer functions describe linear systems, but most real devices are not linear: magnetic forces depend on the square of current, diode currents are exponential, and a converter's output depends on the product of duty cycle and input voltage. The way forward is to study small deviations from a steady operating point, where every smooth nonlinearity looks linear.

::: definition Equilibrium {#def-equilibrium}
For a system $\dot{x} = f(x, u)$ with state vector $x$ and input $u$, an **equilibrium** (operating point) is a pair $(x_0, u_0)$ with $f(x_0, u_0) = 0$: with the input held at $u_0$, the state stays at $x_0$.
:::

::: theorem Linearisation about an equilibrium {#thm-linearise}
Let $f$ be continuously differentiable and $(x_0, u_0)$ an equilibrium. For small deviations $\delta x = x - x_0$, $\delta u = u - u_0$,

$$
\dot{\delta x} \approx \frac{\partial f}{\partial x}\bigg|_{0}\delta x + \frac{\partial f}{\partial u}\bigg|_{0}\delta u ,
$$ {#eq-linearise}

with the partial derivatives (Jacobian matrices) evaluated at the operating point. The error is of second order in $\delta x$ and $\delta u$.
:::

::: proof
Taylor's theorem for a function of several variables (see [Maths Atlas: nonlinear systems](/learn/maths/lesson.php?c=ode&l=nonlinear-systems)) gives $f(x_0 + \delta x, u_0 + \delta u) = f(x_0, u_0) + \frac{\partial f}{\partial x}\delta x + \frac{\partial f}{\partial u}\delta u + O(\norm{\delta x}^2 + \norm{\delta u}^2)$. The first term vanishes at an equilibrium, and $\dot x = \dot{\delta x}$ because $x_0$ is constant.
:::

The linear model holds only near the operating point, and its coefficients depend on which point we choose. A controller designed with it works for small signals; large excursions may need **gain scheduling** (a different controller for each operating point) or a nonlinear design.

::: example Linearising a magnetic levitator {#ex-maglev}
An electromagnet holds a steel ball of mass $m = 50\,\mathrm{g}$ suspended below it. With gap $y$ (measured downwards from the magnet face) and coil current $i$, the magnetic force is approximately $F = k\,i^2/y^2$, upwards. The ball should hover at $y_0 = 10\,\mathrm{mm}$ with $i_0 = 1\,\mathrm{A}$. Find $k$, the linearised model and its transfer function from current to gap, and its poles.
::: solution
Newton's law, with $y$ positive downwards, is $m\ddot y = mg - k\,i^2/y^2$. At equilibrium $\ddot y = 0$, so $k = mgy_0^2/i_0^2 = 0.05\times9.81\times10^{-4}/1 = 4.905\times10^{-5}\,\mathrm{N\,m^2/A^2}$.

The partial derivatives of the force at the operating point are

$$
\frac{\partial F}{\partial i} = \frac{2ki_0}{y_0^2} = \frac{2mg}{i_0},\qquad \frac{\partial F}{\partial y} = -\frac{2ki_0^2}{y_0^3} = -\frac{2mg}{y_0}.
$$

By [[#thm-linearise]], $m\,\ddot{\delta y} = -\frac{\partial F}{\partial y}\delta y - \frac{\partial F}{\partial i}\delta i$, that is

$$
\ddot{\delta y} = \frac{2g}{y_0}\,\delta y - \frac{2g}{i_0}\,\delta i = 1962\,\delta y - 19.62\,\delta i ,
$$

with $\delta y$ in metres and $\delta i$ in amperes. Transforming,

$$
\frac{\Delta Y(s)}{\Delta I(s)} = \frac{-19.62}{s^2 - 1962}\ \mathrm{m/A},
$$

with poles at $s = \pm\sqrt{1962} = \pm44.3\,\mathrm{s^{-1}}$. The pole in the right half-plane means the equilibrium is unstable: a small deviation grows as $e^{44.3t}$, doubling every $\ln2/44.3 = 15.6\,\mathrm{ms}$. Physically, if the ball drops slightly, the force weakens and it drops further; if it rises, the force grows and it flies to the magnet. Only feedback — measuring the gap optically and adjusting the current — can hold it. The minus sign in the gain says that more current reduces the gap.
:::
:::

::: widget plot
f: 4.905e-5*c^2/(x/1000)^2
x: 5, 20
y: 0, 2
sliders: c=1:0.05:1.5:0.05
tangent: 10
hlines: 0.4905
labels: F(y)\ \text{in N}
caption: Magnetic force on the ball of [[#ex-maglev]] against the gap in millimetres, for coil current $c$ in amperes; the horizontal line is the ball's weight, $0.49\,\mathrm{N}$. At $c = 1$ the curve crosses the weight at $y_0 = 10\,\mathrm{mm}$, the equilibrium; the draggable tangent is the linearised model. Its negative slope is the instability: a smaller gap means a larger force. Drag the tangent point away from $10\,\mathrm{mm}$ and see how quickly the linear approximation departs from the curve.
:::

::: warning Linearise about the right point, and only for small signals
A linear model is a statement about deviations, not about absolute values: $\delta y$ and $\delta i$ are measured from the operating point, so a controller designed with them must add $i_0$ to its output. The coefficients change with the operating point — for the levitator the unstable pole is $\sqrt{2g/y_0}$, which grows as the gap shrinks — and the model says nothing about large disturbances. A linearised levitator controller that works perfectly at $10\,\mathrm{mm}$ may let the ball fall if it is released from $20\,\mathrm{mm}$, where the current needed to hold it is twice as large and the unstable pole is different.
:::

::: quiz
A nonlinear resistor has $i = a v^3$. Linearised about $v_0 = 2\,\mathrm{V}$ it behaves as a conductance $g = \partial i/\partial v$. What is $g$ if $a = 0.01\,\mathrm{A/V^3}$?
- [ ] $0.08\,\mathrm{S}$, because $i_0/v_0 = 0.08/2$
- [ ] $0.04\,\mathrm{S}$
- [x] $0.12\,\mathrm{S}$
- [ ] $0.03\,\mathrm{S}$
::: solution
$g = 3av_0^2 = 3\times0.01\times4 = 0.12\,\mathrm{S}$. The ratio $i_0/v_0 = 0.04\,\mathrm{S}$ is the large-signal (chord) conductance, which is not what small deviations see: the incremental conductance is the slope of the curve at the operating point.
:::
:::

::: application Small-signal models everywhere
Linearisation is the same idea as the small-signal models of [[electronics-1/small-signal-amplifiers]], where a transistor biased at a quiescent point is replaced by its transconductance and output resistance. In power electronics the averaged models of the boost and buck–boost converters contain products such as $(1 - d)v_o$, and linearising them about the operating duty cycle gives control-to-output transfer functions with a **right-half-plane zero** that strongly limits how fast their voltage loops can be ([[control-systems/time-response]] shows what such a zero does to a step response).
:::

::: history
James Watt's centrifugal governor of 1788 regulated steam-engine speed by feedback, but governors were often unstable or "hunted" until James Clerk Maxwell's paper "On governors" (1868) linearised their equations about the operating speed and related stability to the roots of the characteristic equation — the first use of linearisation and transfer-function thinking in control. Oliver Heaviside's operational calculus of the 1880s and 1890s, later justified by the Laplace transform, gave engineers the algebraic $s$-domain models used here. Block diagrams became standard in the 1940s through the wartime servomechanism work at MIT, and Samuel Mason published his signal-flow-graph gain formula in 1953. The averaged models of switching converters were systematised by R. D. Middlebrook and Slobodan Ćuk at Caltech in 1976.
:::

## Where this leads

With transfer functions in hand, [[control-systems/time-response]] asks how pole and zero positions determine overshoot, speed and steady-state error, and [[control-systems/stability]] decides when a closed loop such as [[#eq-feedback]] is stable. The DC motor, the buck converter and the levitator are the running examples of the course: the motor is the plant of the root-locus and PID chapters, the converter of the compensator chapter, and the levitator of the state-feedback chapter. The linearised state equation [[#eq-linearise]] is the starting point of [[control-systems/state-space-models]].

::: summary
- A feedback loop measures the output, compares it with the reference and drives the plant with a function of the error; its accuracy rests on the sensor, not on the plant.
- A transfer function is $Y(s)/U(s)$ with zero initial conditions; its poles are the system's natural modes and its value on the $j\omega$ axis is the frequency response.
- Op-amp stages realise $-Z_2/Z_1$, so controllers can be built from resistors and capacitors; block diagrams combine blocks in series ($G_1G_2$), in parallel ($G_1 + G_2$) and in feedback ($G/(1 + GH)$).
- Feedback divides the effect of a disturbance by $1 + L$ and speeds up a first-order response by the same factor.
- The DC motor is $K/[(Ls + R)(Js + b) + K^2]$ from voltage to speed, usually with a fast electrical and a slow mechanical pole; the averaged buck converter is a lightly damped LC resonance with DC gain $V_{in}$.
- Nonlinear models are linearised about an equilibrium with the Jacobian; the result holds only for small deviations, and its coefficients depend on the operating point.
- The magnetic levitator linearises to a plant with a right-half-plane pole: it cannot be operated without feedback.
:::

## Exercises

::: exercise An RC low-pass {level=1 check="1000"}
An RC low-pass filter has $R = 10\,\mathrm{k\Omega}$ and $C = 100\,\mathrm{nF}$, output across the capacitor. Find its transfer function and the magnitude of its pole in $\mathrm{s^{-1}}$ (rad/s).
::: solution
By the voltage divider, $V_o/V_i = \dfrac{1/(sC)}{R + 1/(sC)} = \dfrac{1}{RCs + 1} = \dfrac{1}{10^{-3}s + 1}$. The pole is at $s = -1/(RC) = -1000\,\mathrm{s^{-1}}$.
:::
:::

::: exercise A closed-loop DC gain {level=1 check="5/3.5"}
A forward block $G(s) = 10/(s + 2)$ has feedback $H = 0.5$ (negative feedback). Find the closed-loop transfer function and its DC gain.
::: solution
$T = \dfrac{G}{1 + GH} = \dfrac{10/(s + 2)}{1 + 5/(s + 2)} = \dfrac{10}{s + 7}$. The DC gain is $10/7 = 1.43$, the same as $G(0)/(1 + G(0)H) = 5/3.5$.
:::
:::

::: exercise No-load speed {level=1 check="24*0.05/(2*1e-5 + 0.05^2)"}
The motor of [[#ex-motor]] is run from $24\,\mathrm{V}$ with no load. Find its steady speed in rad/s.
::: solution
In steady state $\dd i/\dd t = \dd\omega/\dd t = 0$, so $V = Ri + K\omega$ and $Ki = b\omega$. Hence $\omega = KV/(Rb + K^2) = 0.05\times24/0.00252 = 476\,\mathrm{rad/s}$ ($4550\,\mathrm{rpm}$).
:::
:::

::: exercise Reflected inertia {level=2 check="2e-5 + 0.01/400"}
The motor of [[#ex-motor]] (rotor inertia $2\times10^{-5}\,\mathrm{kg\,m^2}$) drives a load of inertia $0.01\,\mathrm{kg\,m^2}$ through a gearbox of ratio $N = 20$. Find the total inertia seen at the motor shaft, in $\mathrm{kg\,m^2}$, and say what happens to the mechanical time constant.
::: solution
The load reflects as $J_L/N^2 = 0.01/400 = 2.5\times10^{-5}\,\mathrm{kg\,m^2}$, so $J = 4.5\times10^{-5}\,\mathrm{kg\,m^2}$. The mechanical time constant $RJ/(K^2 + Rb)$ scales with $J$ and rises from $15.9\,\mathrm{ms}$ to about $35.7\,\mathrm{ms}$. Without the gearbox the load inertia would be $500$ times the rotor's and the motor would accelerate it very slowly.
:::
:::

::: exercise A loop with an inner loop {level=2}
A position servo has an amplifier $K_a$, a motor $G(s) = K_m/(s(\tau s + 1))$ from voltage to angle, an inner loop that feeds back speed through a tachometer of gain $K_t$ (subtracted at the amplifier output, so the motor voltage is $K_aE - K_t s\Theta$), and an outer unity feedback of the angle. Find $\Theta(s)/R(s)$.
::: hint
Reduce the inner loop first: its forward path is $G$ and its feedback path is $K_ts$.
:::
::: solution
The inner loop gives $\dfrac{\Theta}{V_a} = \dfrac{G}{1 + K_tsG} = \dfrac{K_m}{s(\tau s + 1) + K_mK_ts} = \dfrac{K_m}{\tau s^2 + (1 + K_mK_t)s}$, where $V_a = K_aE$. Closing the outer loop with forward path $K_a$ times this,

$$
\frac{\Theta}{R} = \frac{K_aK_m}{\tau s^2 + (1 + K_mK_t)s + K_aK_m}.
$$

The tachometer increases the coefficient of $s$, that is the damping, without changing the stiffness $K_aK_m$: velocity feedback is a way of damping a position loop.
:::
:::

::: exercise Linearising a diode {level=2 check="25.9e-6"}
A capacitor $C = 1\,\mathrm{\mu F}$ is connected in parallel with a diode, and the combination is fed by a current source $I_0 + \delta i(t)$ with $I_0 = 1\,\mathrm{mA}$. The diode obeys $i_D = I_S(e^{v/V_T} - 1)$ with $V_T = 25.9\,\mathrm{mV}$. Linearise and find the time constant (in seconds) with which the voltage responds to small changes $\delta i$.
::: solution
The circuit equation is $C\dot v = I_0 + \delta i - I_S(e^{v/V_T} - 1)$. At the operating point $i_D = I_0$, and $\partial i_D/\partial v = I_Se^{v_0/V_T}/V_T \approx I_0/V_T = 1/r_d$, with $r_d = V_T/I_0 = 25.9\,\Omega$. The linear model is $C\,\dot{\delta v} = \delta i - \delta v/r_d$, an RC circuit with $\tau = r_dC = 25.9\,\mathrm{\mu s}$. At $10\,\mathrm{mA}$ the time constant would be ten times shorter: the linear model depends on the operating point.
:::
:::

::: exercise A series RLC circuit {level=2}
A series RLC circuit is driven by $v_i$. Find the transfer function from $v_i$ to the loop current $i$ and identify its poles and zeros. For $R = 10\,\Omega$, $L = 1\,\mathrm{mH}$ and $C = 10\,\mathrm{\mu F}$, find $\omega_n$ and $\zeta$ and state the mechanical system it is analogous to.
::: solution
$I/V_i = 1/(R + sL + 1/(sC)) = sC/(LCs^2 + RCs + 1)$: a zero at $s = 0$ (no DC current through a capacitor) and the poles of $LCs^2 + RCs + 1$. Here $\omega_n = 1/\sqrt{LC} = 1/\sqrt{10^{-8}} = 10^4\,\mathrm{rad/s}$ and $\zeta = (R/2)\sqrt{C/L} = 5\times0.1 = 0.5$. In the force–voltage analogy it is a mass ($L$) on a spring (compliance $C$) with a damper ($R$) driven by a force, with the current playing the role of the velocity.
:::
:::

::: exercise Capacitor ESR in a buck converter {#exr-esr level=3}
The output capacitor of the buck converter of [[#ex-buck]] has an equivalent series resistance $R_c = 20\,\mathrm{m\Omega}$. (a) Derive the control-to-output transfer function. (b) Find the frequency of the zero it introduces. (c) Explain why the zero matters to the voltage loop.
::: hint
Replace $1/(sC)$ by $R_c + 1/(sC)$ and find the impedance of this branch in parallel with $R$.
:::
::: solution
(a) The output is the averaged switch-node voltage $DV_{in}$ divided between $sL$ and $Z = R\parallel(R_c + 1/(sC))$. With $Z = R(1 + sR_cC)/(1 + s(R + R_c)C)$,

$$
\frac{V_o}{D} = V_{in}\frac{Z}{sL + Z} = \frac{V_{in}(1 + sR_cC)}{LC\left(1 + \frac{R_c}{R}\right)s^2 + \left(\frac{L}{R} + R_cC\right)s + 1}.
$$

(b) The zero is at $s = -1/(R_cC) = -1/(0.02\times10^{-4}) = -5\times10^5\,\mathrm{s^{-1}}$, i.e. $80\,\mathrm{kHz}$. The poles barely move; the damping rises slightly because the term $R_cC = 2\,\mathrm{\mu s}$ adds to $L/R = 10\,\mathrm{\mu s}$.

(c) Above the zero the plant's phase rises by up to $90^\circ$ and its magnitude falls at only $20\,\mathrm{dB/decade}$. A designer can use the lead it provides, but its frequency depends on the capacitor type and temperature (electrolytic capacitors have large, variable ESR; ceramics have very little), so the compensator must work for the whole range.
:::
:::

::: exercise A levitator with coil dynamics {level=3}
In practice the levitator of [[#ex-maglev]] is driven by a voltage $v$ across a coil of resistance $R_L = 10\,\Omega$ and inductance $L_c = 0.5\,\mathrm{H}$ (treated as constant). (a) Find the operating voltage and the linearised transfer function from $\delta v$ to $\delta y$. (b) List its poles. (c) Why do practical levitators drive the coil from a current-controlled amplifier?
::: solution
(a) The coil obeys $v = R_Li + L_c\,\dd i/\dd t$, which is already linear: $\Delta I/\Delta V = 1/(L_cs + R_L)$, and the operating voltage is $v_0 = R_Li_0 = 10\,\mathrm{V}$. In series with the mechanical model,

$$
\frac{\Delta Y}{\Delta V} = \frac{-19.62}{(0.5s + 10)(s^2 - 1962)} = \frac{-39.24}{(s + 20)(s^2 - 1962)}\ \mathrm{m/V}.
$$

(b) Poles at $-20$, $-44.3$ and $+44.3\,\mathrm{s^{-1}}$. (c) The coil's time constant $L_c/R_L = 50\,\mathrm{ms}$ is slower than the instability ($1/44.3 = 23\,\mathrm{ms}$), so the voltage-driven plant is harder to stabilise: the coil adds phase lag exactly where the controller needs phase lead. A fast inner current loop (a transconductance amplifier) makes $\delta i$ follow its command within a fraction of a millisecond, removing the coil pole from the outer design. This is the cascade structure of [[control-systems/pid-control]].
:::
:::
