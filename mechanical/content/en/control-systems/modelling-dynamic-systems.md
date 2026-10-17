Before a system can be controlled it has to be written down, and writing it down is where control engineering stops being a theory of feedback and becomes a theory of the plant. Half of the discipline is the ability to look at a motor, a tank, a furnace or a suspension and produce a linear model with a small number of physically named parameters — a gain, a time constant, an inertia, a damping — and the other half is knowing when that model has stopped being true.

Three techniques carry the whole modelling business. **Impedance reflection** moves inertias, dampings and stiffnesses through gears, levers and screws so that a multi-shaft mechanism collapses to one equivalent inertia at one shaft. **Linearisation about an operating point** turns a non-linear law into a gain and a time constant valid over a stated range. And the **analogy** between mechanical, electrical, thermal and fluid systems means that one solution serves four problems — with the caveat, which is where engineers go wrong, that the analogy fixes which variable is the "across" variable and the wrong choice inverts every impedance in the diagram.

::: warning A linear model is valid over a range, not at a point
Every linearisation is a tangent, and the useful statement is not the tangent but the range over which the tangent is close. A tank's linearised time constant of nineteen minutes is good to five per cent for level changes of about ten per cent and wrong by a factor of two for a change of eighty. A pendulum's $\sin \theta \approx \theta$ is good to one per cent at $7^{\circ}$. An actuator's "linear" force–current curve ends at the knee of its magnetic circuit, and a valve's at the point where the flow chokes. The professional habit is therefore to state the linearisation **with its band**, and to design the controller's range of authority to stay inside it — because a controller designed against a model that is wrong at large error is the standard explanation for a loop that behaves beautifully on the test bench and hunts the moment it is asked to do real work.
:::

## Building models

::: definition Impedance and reflected impedance {#def-impedance}
Each energy store or dissipator relates an across variable $v$ to a through variable $f$: a mass has mechanical impedance $Z = m s$, a damper $Z = c$, a spring $Z = k / s$, an inductor $Z = L s$, a capacitor $Z = 1 / C s$, a resistor $Z = R$. Through an ideal transformer of ratio $n$ — a gear train, a lever, a screw, an electrical transformer — the impedance scales as
$$
Z_{\text{primary}} = \frac{Z_{\text{secondary}}}{n^{2}}
$$
where $n$ is the ratio of primary velocity to secondary velocity. Inertia, damping and stiffness all reflect by the same $n^{2}$, which is why a gear train is a **scaling law** and not merely a torque multiplier.
:::

::: proof Reflected inertia and the optimum gear ratio {#proof-gears}
A motor of inertia $J_m$ drives a load $J_L$ through a gear train with motor speed $N$ times the load speed, the train being lossless and massless. Equating kinetic energies,
$$
\frac{1}{2} J_{\text{eq}} \omega_m^{2} = \frac{1}{2} J_m \omega_m^{2} + \frac{1}{2} J_L \left( \frac{\omega_m}{N} \right)^{2}
\quad\Longrightarrow\quad
J_{\text{eq}} = J_m + \frac{J_L}{N^{2}} .
$$
With a motor torque $T$ applied, the load acceleration is
$$
\alpha_L = \frac{1}{N} \frac{T}{J_m + J_L / N^{2}} = \frac{T}{N J_m + J_L / N} .
$$
Differentiating the denominator and setting it to zero,
$$
J_m - \frac{J_L}{N^{2}} = 0
\quad\Longrightarrow\quad
\boxed{ N_{\text{opt}} = \sqrt{\frac{J_L}{J_m}} }, \qquad
\alpha_{L, \max} = \frac{T}{2 \sqrt{J_m J_L}} ,
$$
and at that ratio the motor's own inertia is exactly half the reflected total. $\checkmark$

*Note.* The result is the reason a servo axis is nearly always under-geared rather than over-geared: a designer who puts a 5:1 box on a load whose inertia is 2500 times the rotor's has thrown away most of the available acceleration, and the same $N^2$ law means the fault is invisible in the torque rating, which looks comfortable. The mirror-image fault is worse: as $N$ grows past the optimum the reflected load inertia vanishes and the loop becomes dominated by the **gear mesh**, whose stiffness and backlash are then the plant, and a high-resolution servo axis can be made unstable by nothing but the wind-up of a compliant gear train between the motor and the encoder.
:::

::: definition Linearisation about an operating point {#def-linearisation}
For $\dot{x} = u \left( x , w \right)$ and $y = g \left( x , w \right)$ with a steady state $\left( x_0 , w_0 \right)$ satisfying $u \left( x_0 , w_0 \right) = 0$, define the deviation variables $\delta x = x - x_0$, $\delta w = w - w_0$. Then to first order
$$
\delta \dot{x} = a \, \delta x + b \, \delta w,
\qquad
a = \left. \frac{\partial u}{\partial x} \right|_0 , \quad
b = \left. \frac{\partial u}{\partial w} \right|_0 ,
$$
and the linear model is exact for the deviations, not for the variables: it predicts $\delta x$, and $x$ is recovered only by adding back $x_0$. The linearisation is valid while the second-order term $\frac{1}{2} u_{xx} \delta x^{2}$ stays small against the first-order term.
:::

::: proof Why the deviation form is the right one {#proof-linearise}
Taylor's theorem about $\left( x_0 , w_0 \right)$ gives
$$
u \left( x , w \right) = u \left( x_0 , w_0 \right)
+ \left. \frac{\partial u}{\partial x} \right|_0 \delta x
+ \left. \frac{\partial u}{\partial w} \right|_0 \delta w
+ \frac{1}{2} \left( u_{xx} \delta x^{2} + 2 u_{xw} \delta x \delta w + u_{ww} \delta w^{2} \right) + \cdots
$$
The zeroth-order term vanishes **because the operating point is an equilibrium**, which is the whole content of the deviation-variable trick: the constant terms drop out and the linear model is homogeneous, so it can be Laplace-transformed with zero initial conditions and a transfer function read off. The remainder is bounded by $\frac{1}{2} M \left( \left| \delta x \right| + \left| \delta w \right| \right)^{2}$ with $M$ the largest second derivative in the region, so the linear model's relative error is under $\epsilon$ throughout a region in which
$$
\left| \delta x \right| + \left| \delta w \right| < \frac{2 \epsilon \left| a \delta x + b \delta w \right|}{M} .
$$
$\checkmark$

*Note.* Two failures are common enough to be worth naming. The first is linearising about a point that is **not** an equilibrium, which leaves a constant term and a model that drifts; the second is a system with no equilibrium at all — a double integrator, a level with no outlet — for which the "operating point" is a whole line of them and the linear model is exact but useless because the gain to any disturbance is infinite. A non-self-regulating process is not badly modelled by a linear model; it is correctly modelled as an integrator, and the controller must be designed to know the difference.
:::

::: definition The four analogies {#def-analogies}
Every one-port model in engineering pairs an **across** variable that is common to parallel elements with a **through** variable that is common to series ones, and the table below is the reason one differential equation serves four subjects.

| System | Across | Through | Store 1 | Store 2 | Dissipator |
|---|---|---|---|---|---|
| Translational | velocity $v$ | force $F$ | $m$ | $1 / k$ | $c$ |
| Rotational | angular velocity | torque | $J$ | $1 / k_t$ | $c_t$ |
| Electrical | voltage $v$ | current $i$ | $C$ | $1 / L$ | $G$ |
| Fluid (lumped) | pressure $p$ | flow $Q$ | compliance | inertance | resistance |
| Thermal | temperature $T$ | heat flow $\dot{Q}$ | capacitance | — | conductance |

The **impedance** or force-voltage analogy puts force with voltage and velocity with current, so that series mechanical elements are series electrical ones and the transformer rule is the $n^{2}$ of the previous definition. The **mobility** or force-current analogy reverses it, and is natural for loudspeakers and for structural vibration because a mass then behaves as an inductor and a mechanical parallel connection maps to a series one. The two are duals and both are correct; mixing them in one model is not.
:::

::: widget plot
f: x => (1/(0.00002*x+0.05/x))/500
x: 1, 150
y: 0, 1.05
n: 400
labels: alpha_L / alpha_max
caption: Load acceleration against gear ratio for a motor of 2e-5 kg m squared inertia and one newton-metre of torque driving a 0.05 kg m squared load. The curve peaks at the ratio 50, which is the square root of the inertia ratio, and falls off as 1/N on either side — a factor of two loss of acceleration for a factor of four error in the gear ratio, in either direction.
:::

::: example A position stage {#ex-stage}
A $50\ \mathrm{kg}$ table rides on a ball screw of $10\ \mathrm{mm}$ lead driven through a $5:1$ belt. The screw is a $16\ \mathrm{mm}$ diameter steel rod $400\ \mathrm{mm}$ long. Find the inertia the motor sees.
::: solution
**Table.** A screw of lead $p$ reflects a translation as a rotation,
$$
J_{\text{table}} = m \left( \frac{p}{2 \pi} \right)^{2}
= 50 \times \left( \frac{0.010}{6.283} \right)^{2} = 1.267 \times 10^{- 4}\ \mathrm{kg\, m^{2}} .
$$
**Screw.**
$$
m_s = \rho \pi R^{2} L = 7850 \times \pi \times 0.008^{2} \times 0.400 = 0.631\ \mathrm{kg},
\qquad
J_s = \frac{m_s R^{2}}{2} = 2.02 \times 10^{- 5}\ \mathrm{kg\, m^{2}} .
$$
**Total at the motor shaft** (belt ratio $5$, so divide by $25$):
$$
J_{\text{motor}} = \frac{1.267 \times 10^{- 4} + 2.02 \times 10^{- 5}}{25}
= 5.88 \times 10^{- 6}\ \mathrm{kg\, m^{2}} .
$$
*Check.* A typical $400\ \mathrm{W}$ servo rotor has $1.1 \times 10^{- 5}\ \mathrm{kg\, m^{2}}$, so the reflected load is fifty-three per cent of the rotor's own inertia — a comfortable ratio, and the design is well geared. $\checkmark$

*Sanity.* The table's inertia is reflected through the **square** of the lead, so halving the lead quarter the reflected inertia and double the position-loop bandwidth — and simultaneously halves the speed and doubles the torque required. That is the whole of the ball-screw sizing trade in one line, and it is why a fast positioning stage uses a **large lead** and a big motor rather than a fine screw and a small one. The second thing this example hides is the screw's **torsional** compliance: a $400\ \mathrm{mm}$ shaft in torsion has $k_t = GJ / L = 1276\ \mathrm{N\, m / rad}$, which with the reflected load gives a torsional resonance at $\sqrt{1276 / 1.47 \times 10^{- 4}} / 2 \pi = 469\ \mathrm{Hz}$ — comfortably above a typical $100\ \mathrm{Hz}$ position loop, but only just, and a longer screw would put the resonance inside the loop's crossover and force a notch filter.
:::
:::

::: example A tank with a hole {#ex-tank}
A tank of $0.5\ \mathrm{m^{2}}$ cross-section drains through a $20\ \mathrm{mm}$ orifice with a discharge coefficient of $0.62$. Find the linearised time constant at a one-metre level, and the true time to empty.
::: solution
$$
Q = C_d A_o \sqrt{2 g h}, \qquad
C_d A_o \sqrt{2 g} = 0.62 \times 3.142 \times 10^{- 4} \times 4.429 = 8.63 \times 10^{- 4} ,
$$
$$
\left. \frac{\mathrm{d} Q}{\mathrm{d} h} \right|_{h_0} = \frac{k}{2 \sqrt{h_0}} = 4.31 \times 10^{- 4}\ \mathrm{m^{3} / s / m},
\qquad
R = 2318\ \mathrm{s / m^{5}} ,
$$
$$
\tau = A R = 0.5 \times 2318 = 1159\ \mathrm{s} = 19.3\ \mathrm{min}.
$$
**True emptying time.** Integrating $A \,\mathrm{d}h = - k \sqrt{h}\,\mathrm{d}t$,
$$
t = \frac{2 A \sqrt{h_0}}{k} = 1159\ \mathrm{s}.
$$
*Check.* The two agree exactly, which is not a coincidence: the linearised time constant of a square-root process equals the full drain-down time from that level, because the tangent to $\sqrt{h}$ at $h_0$ reaches zero at $t = 2 A \sqrt{h_0} / k$. $\checkmark$

*Sanity.* The equality is a warning rather than a comfort. The linear model says the level falls exponentially with a nineteen-minute time constant, and the truth is that the level reaches **zero** in nineteen minutes and stays there — the linear model predicts a level of $37$ per cent after nineteen minutes and never reaches empty. For a control loop that only ever moves the level by ten per cent this is harmless; for a design that must know the overflow time or the pump-down time it is wrong by a factor that grows with the excursion. The rule for square-root processes is that the linear model is good for **small perturbations about the level** and useless for **excursions through it**, and the difference between the two is the difference between a control problem and a design problem.
:::
:::

::: example An armature-controlled motor {#ex-motor}
A DC motor has $R_a = 0.5\ \Omega$, $L_a = 1\ \mathrm{mH}$, $K = 0.08\ \mathrm{N\, m / A} = 0.08\ \mathrm{V\, s / rad}$ and drives $J = 10^{- 4}\ \mathrm{kg\, m^{2}}$ with negligible friction. Find the transfer function from armature voltage to speed and its low-frequency form.
::: solution
$$
L_a \frac{\mathrm{d} i}{\mathrm{d} t} + R_a i + K \omega = v,
\qquad
J \frac{\mathrm{d} \omega}{\mathrm{d} t} = K i ,
$$
$$
\frac{\Omega}{V} = \frac{K}{\left( L_a s + R_a \right) J s + K^{2}}
= \frac{K / \left( L_a J \right)}{s^{2} + \left( R_a / L_a \right) s + K^{2} / \left( L_a J \right)} ,
$$
$$
\omega_n = \frac{K}{\sqrt{L_a J}} = 253\ \mathrm{rad / s} \left( 40.3\ \mathrm{Hz} \right),
\qquad
\zeta = \frac{R_a}{2 K} \sqrt{\frac{J}{L_a}} = 0.99 .
$$
**Low-frequency form.** The two time constants are the electrical $\tau_e = L_a / R_a = 2.0\ \mathrm{ms}$ and the mechanical $\tau_m = J R_a / K^{2} = 7.8\ \mathrm{ms}$, a separation of only $3.9$, and the closed pair at $- 250 \pm 39\ \mathrm{s^{- 1}}$ is very nearly critically damped. Neglecting the inductance leaves the single pole
$$
\frac{\Omega}{V} \approx \frac{1 / K}{1 + \tau_m s} = \frac{12.5}{1 + 0.0078\, s} ,
$$
which is a fair approximation because the exact pair has no overshoot at all.

*Sanity.* A damping ratio of $0.99$ is the reason a plain DC motor needs no current loop to behave itself and why the reduced first-order model is so widely used. The approximation fails when the separation collapses — a high-inertia load multiplies $\tau_m$ and moves the pair toward lighter damping in the opposite sense, and a low-inductance brushless or air-core motor shrinks $\tau_e$ to a fraction of a millisecond while the driver's current loop bandwidth rises to match. In every such case the current loop must be closed around the motor before the position loop is closed around the current loop, and that cascade — current inside velocity inside position — is the standard servo architecture.
:::
:::

::: example Two interacting tanks {#ex-two-tanks}
Two tanks are connected by a pipe of resistance $R_1$ so that the flow between them is $\left( h_1 - h_2 \right) / R_1$, and the second drains to atmosphere through $R_2$. Find the transfer function from the inflow to the second tank's level and explain why the pair is slower than two time constants in series.
::: solution
$$
A_1 \dot{h}_1 = q_{\text{in}} - \frac{h_1 - h_2}{R_1},
\qquad
A_2 \dot{h}_2 = \frac{h_1 - h_2}{R_1} - \frac{h_2}{R_2} ,
$$
which in deviations gives, with $\tau_i = A_i R_i$,
$$
\frac{H_2}{Q_{\text{in}}}
= \frac{R_2}{\tau_1 \tau_2 s^{2} + \left( \tau_1 + \tau_2 + \tau_2 R_2 / R_1 \right) s + 1} .
$$
For equal tanks and equal resistances, $\tau_1 = \tau_2 = \tau$ and $R_1 = R_2$,
$$
\frac{H_2}{Q_{\text{in}}} = \frac{R_2}{\tau^{2} s^{2} + 3 \tau s + 1}
\quad\Longrightarrow\quad
\zeta = 1.5, \qquad
\tau_{1,2} = 2.618\, \tau \text{ and } 0.382\, \tau .
$$
*Check.* The product of the two time constants is $2.618 \times 0.382\ \tau^{2} = \tau^{2}$, which must equal the ratio of the constant to the $s^{2}$ coefficient. $\checkmark$

*Sanity.* Two **non-interacting** tanks would each keep its own time constant and give a response beginning flat and curved; interaction splits the pair to $2.6\,\tau$ and $0.38\,\tau$, so the slow one is two and a half times slower than either tank on its own. The extra term $\tau_2 R_2 / R_1$ in the damping is the mathematical signature of the coupling, and it always makes the system **more** damped and **slower**. This is the reason a plant test on a single vessel systematically under-predicts the tuning a pair of vessels needs, and why the classical step test on a large interacting plant is fitted as "dead time plus first order" even when there is no dead time at all: the first seconds of a heavily overdamped second-order response are indistinguishable from a pure delay, and a controller tuned on a model with an invented delay is conservative in exactly the direction that keeps a large plant stable.
:::
:::

::: example Design {#ex-design-furnace}
An oven with a $1\ \mathrm{kW}$ heater holds $20\ \mathrm{K}$ above ambient at full power and has a thermal mass of $10\ \mathrm{kJ / K}$ and a loss conductance of $50\ \mathrm{W / K}$. Design the control approach.
::: solution
$$
\tau = \frac{C}{G} = \frac{10\,000}{50} = 200\ \mathrm{s}, \qquad
K = \frac{1}{G} = 0.02\ \mathrm{K / W}, \qquad
t_{63\%} = 3\ \mathrm{min}, \quad t_{98\%} = 13\ \mathrm{min}.
$$
**Model.** $G /(C s + G) = 1 /(\tau s + 1)$ in watts per kelvin — a single first-order lag with a $200\ \mathrm{s}$ time constant and a $50\ \mathrm{mK / W}$ gain.
**Control.** A time constant of $200\ \mathrm{s}$ against a measurement noise of $50\ \mathrm{mK}$ and a supply that must be switched, not modulated, gives a **three-position or time-proportional** controller with a hysteresis band of $\pm 0.25\ \mathrm{K}$ rather than a continuous PID. The equivalent switching frequency follows from the energy balance: at a $0.25\ \mathrm{K}$ band the duty cycle changes by $50 / 1000 \times 0.5 = 2.5$ per cent per $0.25\ \mathrm{K}$, so a one-minute cycle is enough resolution.

*Design comment.* The dominant non-linearity is not the radiation loss, which is only ten per cent of the total at these temperatures, but the **heater's own quantisation** and the fact that the thermocouple is not where the heat is. A $200\ \mathrm{s}$ process with a $60\ \mathrm{s}$ sensor lag is a system whose phase is lost before the controller sees anything, and the fix is not a better controller but a better sensor position — the junction moved from the air to the wall, or a second sensor used as a feedforward measurement of the disturbance. The second design decision is the **loss conductance**, which is not constant: an oven's $G$ rises with temperature through radiation, so the process gain and the time constant both change by twenty per cent across the operating range, and a controller tuned at $20\ \mathrm{K}$ above ambient is over-aggressive at $200\ \mathrm{K}$. This is the standard case for **gain scheduling** on the setpoint, which is the cheapest and most honest of non-linear control strategies and remains the most used in industry.
:::
:::

::: history
Feedback was engineered long before it was analysed: **Cornelius Drebbel**'s thermostat of about 1620, **Watt**'s centrifugal governor of 1788 and the float valve of the ancients are all closed loops with no theory behind them. The theory begins with **Maxwell**'s 1868 paper *"On governors"*, the first stability analysis of a feedback system and the first recognition that the question is the sign of the roots of a polynomial; **Routh**'s criterion of 1876 and **Hurwitz**'s of 1895 made that question decidable without computing the roots, and **Lyapunov**'s 1892 thesis put stability on its modern geometric footing. The industrial era of control begins with **Cameron**'s automatic controllers at the American Telephone and Telegraph Company and **Ziegler and Nichols**' 1942 tuning rules, which are still the first thing tried on a plant, and with **Minorsky**'s 1922 ship-autopilot design, the first published use of what we now call a PID structure. **Nyquist**'s 1932 criterion and **Bode**'s and **Nichols**' frequency-domain work at the same laboratory gave the design method, **Evans**' 1948 root locus another, and the **Bode integral** the reason none of it is free. The state-space and optimal-control edifice is the work of **Kalman**'s 1960 papers, **Bellman**'s dynamic programming and **Pontryagin**'s maximum principle; the robust-control revival of the late 1980s is the $H_{\infty}$ of **Zames**, **Doyle** and **Glover**. The **optimum gear ratio** result of Example 1 is a standard of electromechanical design textbooks from the 1970s, and the impedance analogy of **Kennelly** of 1920 and the mobility analogy of **Lautermann** and **Thier** of the 1950s are the two competing conventions whose confusion still ruins models.
:::

::: quiz
A servo motor with $2 \times 10^{- 5}\ \mathrm{kg\, m^{2}}$ of rotor inertia drives a $0.05\ \mathrm{kg\, m^{2}}$ load. The gear ratio that maximises the load's angular acceleration is:
- [ ] $5$, because a lower ratio keeps the gear train stiff
- [x] $\sqrt{0.05 / 2 \times 10^{- 5}} = 50$
- [ ] $2500$, because the load should be made to look as light as possible
- [ ] It does not depend on the inertia ratio, only on the torque
::: solution
Maximising $\alpha_L = T / \left( N J_m + J_L / N \right)$ over $N$ gives $N_{\text{opt}} = \sqrt{J_L / J_m} = 50$, at which the reflected load equals the rotor inertia and each takes half the torque. Choosing $N$ too low leaves the load looking heavy and wastes torque accelerating it; choosing it too high makes the load look weightless, and the axis then resonates on the gear mesh between the motor and the encoder. Note that the optimum is for **acceleration**: a drive that must run at a high constant speed against a load torque wants a lower ratio, and real selections compromise between the two and the available single-stage ratios.
:::
:::

## Where this leads

The second-order model that dominates everything here is the spring–mass–damper of [[vibrations/vibration-fundamentals]] and [[vibrations/free-vibration]], the frequency-domain tools are developed in [[vibrations/harmonic-excitation]] and [[vibrations/isolation-transmissibility]], the multi-degree-of-freedom plants that defeat single-loop control are in [[vibrations/two-degrees-of-freedom]] and [[vibrations/modal-analysis]], and the rotational dynamics behind the motor model is in [[dynamics/rigid-body-kinetics]].

::: summary
- A model is a statement of which variables are across and which are through; the impedance analogy makes every energy store an impedance and every transformer an $n^{2}$ scaler.
- Inertia, damping and stiffness all reflect through a gear train as $1 / N^{2}$, so the optimum ratio for acceleration is the square root of the inertia ratio, and at it the motor's own inertia is half the total.
- Linearisation is about an **equilibrium** and in **deviation variables**; the constant term vanishes only because the operating point is a steady state.
- A linear model is valid over a stated band, and the band — not the equation — is the part worth writing down.
- Real plants are rarely first order: pole separation justifies a reduced model, and pole proximity to a flexible mode is what limits a servo's bandwidth.
- Interaction between two lags makes the pair more damped and slower than either alone, and is easily mistaken for dead time.
:::

## Exercises

::: exercise Reflected inertia {level=1 check="0.002"}
A load of $0.05\ \mathrm{kg\, m^{2}}$ is driven through a gear ratio of $5$. What inertia does the motor see?
::: solution
$0.05 / 25 = 0.002\ \mathrm{kg\, m^{2}}$.
:::
:::

::: exercise Screw {level=1 check="0.0159"}
A screw of $10\ \mathrm{mm}$ lead converts rotation to translation. What is the equivalent radius $p / 2 \pi$ in metres?
::: solution
$0.010 / 6.283 = 1.59 \times 10^{- 3}\ \mathrm{m}$.
:::
:::

::: exercise Time constant {level=1 check="200"}
A thermal system has a conductance of $50\ \mathrm{W / K}$ and a mass of $10\ \mathrm{kJ / K}$. What is its time constant in seconds?
::: solution
$10\,000 / 50 = 200\ \mathrm{s}$.
:::
:::

::: exercise Equilibrium {level=1 check="0"}
In the deviation-variable linearisation, what is the value of the zeroth-order term $u \left( x_0 , w_0 \right)$?
::: solution
Zero, because the operating point is an equilibrium.
:::
:::

::: exercise Gear ratio {level=2}
A motor with $5 \times 10^{- 6}\ \mathrm{kg\, m^{2}}$ of rotor inertia drives a $0.02\ \mathrm{kg\, m^{2}}$ load. Find the optimum gear ratio and the fraction of the total reflected inertia contributed by the rotor at that ratio.
::: solution
$$
N_{\text{opt}} = \sqrt{\frac{0.02}{5 \times 10^{- 6}}} = 63.2,
\qquad
\frac{J_L}{N^{2}} = \frac{0.02}{4000} = 5 \times 10^{- 6} = J_m ,
$$
so the rotor contributes exactly one half.
*Sanity.* The half-and-half result is the design rule, and it is worth restating in words: the gear ratio that maximises acceleration is the one that makes the load look as heavy as the motor. A ratio of $20$ instead of $63$ leaves the load looking fifty times heavier than the rotor and wastes most of the torque in accelerating it; a ratio of $200$ leaves the load looking weightless and puts the axis at the mercy of the gear mesh. Real designs compromise, because the optimum for acceleration is not the optimum for maximum speed, and because a ratio of $63$ in a single stage is not available — it is a $8:1$ planetary followed by an $8:1$ harmonic drive, and the second stage's compliance is then the plant.
:::
:::

::: exercise Linearisation {level=2}
Linearise the pendulum $\ddot{\theta} + \left( g / L \right) \sin \theta = 0$ about $\theta = 0$ and about $\theta = \pi$, and find the angle at which the small-angle period is one per cent long.
::: solution
$$
\sin \theta \approx \theta \ \text{about} \ 0 : \ddot{\theta} + \omega_0^{2} \theta = 0
\quad \text{(stable, } \omega_0 = \sqrt{g / L} \text{)} ,
$$
$$
\theta = \pi + \phi : \ddot{\phi} - \omega_0^{2} \phi = 0
\quad \text{(unstable, } \phi \propto e^{\omega_0 t} \text{)} .
$$
The period is $T / T_0 = 1 + \theta_0^{2} / 16$, so one per cent needs $\theta_0^{2} = 0.16$, $\theta_0 = 0.4\ \mathrm{rad} = 23^{\circ}$.
*Sanity.* The inverted position linearises to a **negative** stiffness, which is the mathematical signature of every system that must be actively held up — an inverted pendulum on a cart, a maglev suspension, an electrostatic actuator pulled past a third of its gap, and a column under load. In each case the plant has a right-half-plane pole before the controller is connected, and the controller's job is not to improve the response but to create a stable equilibrium where nature did not provide one.
:::
:::

::: exercise Motor {level=2}
For the motor of Example 4, find the steady-state speed for $12\ \mathrm{V}$ and the electrical and mechanical time constants.
::: solution
$$
\omega_{\infty} = \frac{V}{K} = \frac{12}{0.08} = 150\ \mathrm{rad / s} = 1430\ \mathrm{rev / min},
\qquad
\tau_e = \frac{L_a}{R_a} = 2.0\ \mathrm{ms}, \quad
\tau_m = \frac{J R_a}{K^{2}} = 7.8\ \mathrm{ms}.
$$
*Sanity.* The ratio $\tau_m / \tau_e = 3.9$ is modest, and it is worth knowing how wide the range of real machines is: a torque motor with an air-core winding has $\tau_e$ of a fraction of a millisecond and a very small $\tau_m$, a large steel-rotor motor has $\tau_e$ of tens of milliseconds and $\tau_m$ of seconds. The rule is that the electrical pole may be neglected only when it lies at least a decade above the frequency at which the loop is closed, and a servo designer who has not checked this finds the current loop oscillating at a frequency the mechanical model said was infinite.
:::
:::

::: exercise Two tanks {level=2}
For the interacting pair of Example 5 with $\tau = 100\ \mathrm{s}$, find the two time constants of the response and compare them with the non-interacting case.
::: solution
$$
\tau^{2} s^{2} + 3 \tau s + 1 = 0
\quad\Longrightarrow\quad
s = \frac{- 3 \pm \sqrt{5}}{2 \tau} = - 0.382 / \tau ,\ - 2.618 / \tau ,
$$
$$
\tau = 262\ \mathrm{s} \text{ and } 38.2\ \mathrm{s},
$$
against two $100\ \mathrm{s}$ poles for non-interacting tanks.
*Sanity.* The slow pole has moved out by a factor of $2.6$ and the fast one in by the same factor, because their **product** is fixed by the two tanks' storage and cannot be changed by the coupling — only their split. The practical consequence is that the loop must be tuned for the $262\ \mathrm{s}$ mode while the sensor noise is being generated by the $38\ \mathrm{s}$ one, and that a controller designed on the assumption of two equal lags is over-aggressive by a factor of two and a half.
:::
:::

::: exercise Modelling {level=3}
A loudspeaker driver of moving mass $M_{\text{ms}} = 15\ \mathrm{g}$, suspension compliance $C_{\text{ms}} = 0.25\ \mathrm{mm / N}$ and motor force factor $B l = 6\ \mathrm{T\, m}$ is mounted in an infinite baffle. Find its resonance and draw the electrical impedance near it.
::: solution
$$
f_s = \frac{1}{2 \pi} \sqrt{\frac{1}{M_{\text{ms}} C_{\text{ms}}}}
= \frac{1}{2 \pi} \sqrt{\frac{1}{0.015 \times 2.5 \times 10^{- 4}}} = 82.2\ \mathrm{Hz}.
$$
The mechanical resonance reflects into the electrical domain as a motional impedance
$$
Z_{\text{mot}} = \frac{\left( B l \right)^{2}}{Z_{\text{mech}}},
$$
so at $f_s$, where $Z_{\text{mech}}$ is minimal and resistive, $Z_{\text{mot}}$ is a **peak** in the impedance magnitude.
*Sanity.* This is the reason a loudspeaker's impedance curve has a peak at its resonance and why that peak is used to measure the box's air compliance and the driver's damping — the technique called **T/S parameter measurement** is nothing but a mechanical impedance measurement made electrically, and it is the clearest everyday demonstration of the impedance analogy. The same reflection appears in every electromechanical system: a piezoelectric actuator's impedance shows a dip at its antiresonance and a peak at its resonance, a microphone's output drops at the diaphragm's resonance, and an energy harvester's electrical damping is exactly the mechanical damping its impedance creates.
:::
:::

::: exercise Derivation {level=3}
Show that for any system whose damping force is proportional to velocity, the mechanical impedance of a mass–spring–damper is minimum at the undamped natural frequency, and derive the relation between the impedance minimum and the damping.
::: solution
$$
Z (s ) = M s + c + \frac{k}{s}
\quad\Longrightarrow\quad
Z (\mathrm{i} \omega ) = c + \mathrm{i} \left( M \omega - \frac{k}{\omega} \right) .
$$
The magnitude $\left| Z \right| = \sqrt{c^{2} + \left( M \omega - k / \omega \right)^{2}}$ is minimised when the reactance vanishes, at $\omega = \sqrt{k / M} = \omega_n$, where
$$
\left| Z \right|_{\min} = c, \qquad
Q = \frac{\omega_n M}{c} = \frac{1}{2 \zeta} .
$$
*Sanity.* The depth of the impedance dip — or peak, in the mobility — is a **direct measure of the damping**, and this is the basis of every resonance-based damping measurement: the half-power bandwidth of the impedance curve gives $2 \zeta$ without any reference to the mass or the stiffness. The same relation makes the loudspeaker's impedance peak a quality-control test for the glue in a surround, makes a piezoelectric transducer's admittance sweep a test of the adhesive bonding it to a structure, and makes a quartz crystal's series resonance a thermometer, because the crystal's $Q$ and its resonant frequency both depend on the load applied to its surface. A mechanical property read from an electrical curve is the analogy paying for itself.
:::
:::
