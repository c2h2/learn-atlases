All the synchronous generators of an interconnected power system turn in lock-step, each rotor held at a definite angle relative to the others by the electromagnetic torques that the network exerts on it. A fault suddenly removes much of that torque: the turbines keep driving, the electrical output collapses, and the rotors near the fault accelerate. When the fault is cleared, the electrical torque returns, but the rotors have gained speed and angle. Either they swing back and settle into a new equilibrium, or they swing too far, **lose synchronism**, "slip poles" and must be tripped, possibly starting a cascade that blacks out a region. Whether a system survives a given disturbance is the question of **power system stability**.

This chapter treats **rotor-angle stability** of synchronous machines. We derive the **swing equation**, which governs the motion of a rotor, and combine it with the power–angle characteristic of [[electric-machines/synchronous-machines]] and [[power-systems/line-models]]. Linearising gives **small-signal stability** and the natural frequency of electromechanical oscillations. For large disturbances the **equal-area criterion** answers the stability question for one machine against an infinite bus without solving any differential equation, and yields the **critical clearing angle and time**, which link stability to the speed of protection. We then integrate the swing equation numerically, as is done for real systems, and discuss how stability is improved in practice. The transient reactance of [[power-systems/symmetrical-faults]] provides the machine model.

## Classes of stability

The IEEE/CIGRE classification distinguishes three kinds of stability:

- **Rotor-angle stability**: the ability of synchronous machines to remain in synchronism. It is divided into **small-signal** stability (small disturbances, such as load fluctuations, analysed by linearisation; instability appears as growing oscillations) and **transient** stability (large disturbances such as faults, analysed with the nonlinear equations over the first few seconds).
- **Frequency stability**: the ability to hold frequency after a severe imbalance between generation and load, treated with load–frequency control in [[power-systems/economic-dispatch-control]].
- **Voltage stability**: the ability to maintain acceptable voltages, related to the maximum loadability (the nose curve) of [[power-systems/power-system-structure]].

Inverter-based resources have added **converter-driven** and **resonance** stability classes, mentioned in [[power-systems/protection-smart-grid]]. Here we concentrate on rotor angles.

## The swing equation

Consider a synchronous generator with a combined rotor and turbine moment of inertia $J$, driven by a mechanical torque $T_m$ and opposed by the electromagnetic torque $T_e$. Let $\theta_m$ be the mechanical angle of the rotor relative to a fixed reference.

::: definition Inertia constant {#def-inertia}
The **inertia constant** $H$ of a machine is its stored kinetic energy at synchronous speed divided by its rated apparent power:
$$
H = \frac{\tfrac12J\omega_{sm}^2}{S_{\text{rated}}}\quad(\mathrm{MJ/MVA}\text{, i.e. seconds}),
$$ {#eq-h}
where $\omega_{sm}$ is the synchronous mechanical speed. It is the time for which the stored energy could supply rated power. Typical values: $2$ to $4\,\mathrm s$ for hydro units, $4$ to $9\,\mathrm s$ for steam and gas turbine-generators, and $1$ to $2\,\mathrm s$ for synchronous condensers and motors.
:::

Unlike $J$, which varies over orders of magnitude with machine size, $H$ lies in a narrow band, just like per-unit impedances. To convert $H$ to a system base, multiply by $S_{\text{rated}}/S_b$.

::: theorem Swing equation {#thm-swing}
Let $\delta$ be the electrical angle of the rotor relative to a reference rotating at synchronous speed $\omega_s$ (rad/s, electrical). In per unit on the machine's base, neglecting the small change of speed in the conversion between torque and power,
$$
\frac{2H}{\omega_s}\,\frac{\mathrm d^2\delta}{\mathrm dt^2} = P_m - P_e - D\frac{\mathrm d\delta}{\mathrm dt},
$$ {#eq-swing}
where $P_m$ is the mechanical input power, $P_e$ the electrical output power, and $D\ge0$ a damping coefficient that lumps damper-winding and load effects. Equivalently, with $M = 2H/\omega_s$, $M\ddot\delta = P_a$, the **accelerating power**.
:::

::: proof
Newton's law for rotation is $J\,\mathrm d^2\theta_m/\mathrm dt^2 = T_m - T_e$. Write $\theta_m = \omega_{sm}t + \delta_m$, so that $\mathrm d^2\theta_m/\mathrm dt^2 = \mathrm d^2\delta_m/\mathrm dt^2$. Multiply by the speed $\omega_m\approx\omega_{sm}$ to turn torques into powers: $J\omega_{sm}\ddot\delta_m = P_m - P_e$. Divide by $S_{\text{rated}}$ and use [[#eq-h]], $J\omega_{sm} = 2HS_{\text{rated}}/\omega_{sm}$:
$$
\frac{2H}{\omega_{sm}}\ddot\delta_m = P_m - P_e\quad(\text{per unit}).
$$
For a machine with $p$ poles the electrical angle is $\delta = (p/2)\delta_m$ and $\omega_s = (p/2)\omega_{sm}$, so $\ddot\delta_m/\omega_{sm} = \ddot\delta/\omega_s$, giving [[#eq-swing]] without damping. Damper windings produce a torque roughly proportional to slip speed $\dot\delta$, which we add as $-D\dot\delta$.
:::

Since $\omega_s = 2\pi f$, the coefficient $2H/\omega_s$ is often written $H/(\pi f)$. With $\delta$ in electrical degrees instead of radians, it becomes $H/(180f)$.

::: remark Coherent machines
Machines in the same plant, or swinging together in one area, can be combined into one equivalent machine whose $H$ (on a common base) is the sum of theirs. Two machines swinging against each other reduce to a single equation for their relative angle $\delta_{12} = \delta_1 - \delta_2$ with an equivalent inertia $M_1M_2/(M_1 + M_2)$, so the one-machine–infinite-bus analysis below also describes the oscillation between two areas.
:::

### The one-machine–infinite-bus system

For the first second or so after a disturbance, the field flux linkage changes little, and the generator is well represented by the **classical model**: a constant voltage $E'$ behind the transient reactance $X_d'$. With the generator connected through a network of total transfer reactance $X$ (including $X_d'$) to an infinite bus at voltage $V$,
$$
P_e = \frac{E'V}{X}\sin\delta = P_{\max}\sin\delta,
$$ {#eq-pe}
with $\delta$ now the angle of $E'$ relative to the infinite bus. This is the power–angle law of [[electric-machines/synchronous-machines]] and [[power-systems/line-models]]. A fault or a switching operation changes $X$, and therefore $P_{\max}$, suddenly, while $\delta$, a mechanical angle, can only change continuously.

::: example Power–angle curves of a generator with two lines {#ex-smib}
A generator ($H = 5\,\mathrm s$, $X_d' = 0.30\,\mathrm{pu}$, $50\,\mathrm{Hz}$) is connected through a transformer ($0.20\,\mathrm{pu}$) and two parallel lines (each $0.40\,\mathrm{pu}$) to an infinite bus at $V = 1.0\,\mathrm{pu}$. It delivers $P_m = 0.8\,\mathrm{pu}$ with $E' = 1.15\,\mathrm{pu}$. Find the power–angle curves and initial angle (a) before any fault, (b) during a three-phase fault at the middle of one line, and (c) after that line has been disconnected.
::: solution
(a) $X = 0.30 + 0.20 + 0.40\parallel0.40 = 0.70$; $P_{\max} = 1.15/0.70 = 1.643\,\mathrm{pu}$. The operating angle is $\delta_0 = \arcsin(0.8/1.643) = 29.1^\circ$.

(b) Let A be the high-voltage bus after the transformer and F the fault point, earthed, $0.2\,\mathrm{pu}$ from A and from the infinite bus B. Eliminating node A from the network ($E'$–A: $0.5$; A–B: $0.4$; A–F: $0.2$; F–B: $0.2$, F at zero potential) gives a transfer reactance between $E'$ and B of $1.90\,\mathrm{pu}$ (by a star–delta transformation: the products of the three reactances meeting at A, $0.5\times0.4 + 0.4\times0.2 + 0.2\times0.5 = 0.38$, divided by the reactance opposite the $E'$–B branch, $0.2$). So $P_{\max,\text{fault}} = 1.15/1.90 = 0.605\,\mathrm{pu}$. Some power still flows past a fault in the middle of a line.

(c) With the faulted line removed, $X = 0.30 + 0.20 + 0.40 = 0.90$ and $P_{\max} = 1.278\,\mathrm{pu}$. The new equilibrium is at $\arcsin(0.8/1.278) = 38.8^\circ$.
:::
:::

## Small-signal stability

Let the machine operate at an equilibrium $\delta_0$ with $P_m = P_{\max}\sin\delta_0$, and consider a small deviation $\Delta\delta$. Linearising $P_e$ about $\delta_0$, $P_e\approx P_m + P_s\Delta\delta$, where
$$
P_s = \left.\frac{\mathrm dP_e}{\mathrm d\delta}\right|_{\delta_0} = P_{\max}\cos\delta_0
$$ {#eq-sync-coefficient}
is the **synchronising power coefficient**.

::: theorem Small-signal swing dynamics {#thm-small-signal}
Small deviations obey
$$
\frac{2H}{\omega_s}\Delta\ddot\delta + D\Delta\dot\delta + P_s\Delta\delta = 0,
$$ {#eq-linear-swing}
a damped oscillator with undamped natural frequency and damping ratio
$$
\omega_n = \sqrt{\frac{\omega_sP_s}{2H}},\qquad \zeta = \frac D2\sqrt{\frac{\omega_s}{2HP_s}}.
$$ {#eq-wn}
The equilibrium is stable if $P_s > 0$ and $D > 0$, i.e. if $\delta_0 < 90^\circ$ on the rising part of the power–angle curve; at $\delta_0 > 90^\circ$ it is unstable.
:::

::: proof
Substitute $\delta = \delta_0 + \Delta\delta$ into [[#eq-swing]] and use $P_e(\delta_0 + \Delta\delta) = P_e(\delta_0) + P_s\Delta\delta + O(\Delta\delta^2)$ with $P_e(\delta_0) = P_m$. Dropping second-order terms gives [[#eq-linear-swing]]. Dividing by $2H/\omega_s$ puts it in the standard form $\ddot x + 2\zeta\omega_n\dot x + \omega_n^2x = 0$, from which [[#eq-wn]] follows. The characteristic roots $-\zeta\omega_n\pm\omega_n\sqrt{\zeta^2 - 1}$ have negative real parts exactly when $\omega_n^2 > 0$ and $\zeta > 0$; if $P_s < 0$ one root is real and positive.
:::

For the system of [[#ex-smib]], $P_s = 1.643\cos29.1^\circ = 1.435\,\mathrm{pu}$ and $\omega_n = \sqrt{314.16\times1.435/10} = 6.71\,\mathrm{rad/s}$, i.e. $1.07\,\mathrm{Hz}$. Such **local modes**, a plant swinging against the rest of the system, lie between about $0.7$ and $2\,\mathrm{Hz}$; **inter-area modes**, in which large groups of machines swing against each other over weak ties, lie between $0.1$ and $0.7\,\mathrm{Hz}$. Their natural damping is small, and fast-acting voltage regulators can even make it negative; the **power system stabiliser** (PSS) adds a damping signal to the excitation system to correct this.

::: widget phaseplane
f: y
g: 31.416*(P - 1.278*sin(x)) - D*y
x: -1, 4
y: -8, 8
sliders: P=0.8:0:1.25:0.01; D=0.5:0:3:0.1
caption: Phase portrait of the swing equation after the fault of [[#ex-smib]] has been cleared: $x = \delta$ (rad) and $y = \mathrm d\delta/\mathrm dt$ (rad/s) for $H = 5\,\mathrm s$, $50\,\mathrm{Hz}$ and $P_{\max} = 1.278$; $D$ is a damping coefficient per unit of $\mathrm d\delta/\mathrm dt$. Click to start trajectories. The stable equilibrium near $\delta = 0.68$ is a spiral; the unstable one near $\delta = 2.47$ is a saddle, and the trajectories through it (the separatrices) bound the region of attraction. A clearing state $(\delta_c, \dot\delta_c)$ inside that region returns to equilibrium; outside it, the rotor slips a pole. Raise $P$ towards $1.278$: the two equilibria approach and the region shrinks to nothing.
:::

## Transient stability and the equal-area criterion

For a large disturbance the linearisation fails, and we need the nonlinear swing equation. For a single machine against an infinite bus, energy reasoning gives the answer without solving it.

::: theorem Equal-area criterion {#thm-equal-area}
Consider a lossless machine ($D = 0$) initially at rest relative to the infinite bus at angle $\delta_0$. After a disturbance, the rotor angle reaches a maximum $\delta_{\max}$ (and then swings back) if and only if, for some $\delta_{\max}$ not beyond the post-disturbance unstable equilibrium,
$$
\int_{\delta_0}^{\delta_{\max}}\bigl(P_m - P_e(\delta)\bigr)\,\mathrm d\delta = 0.
$$ {#eq-equal-area}
Graphically, the **accelerating area** $A_1$, where $P_m > P_e$, must be matched by an equal **decelerating area** $A_2$, where $P_e > P_m$, before $\delta$ passes the angle at which $P_e$ falls back below $P_m$. If the available decelerating area is smaller than $A_1$, the machine loses synchronism.
:::

::: proof
Write [[#eq-swing]] with $D = 0$ as $\ddot\delta = \frac{\omega_s}{2H}(P_m - P_e)$. Multiply both sides by $2\dot\delta$: the left side is $\frac{\mathrm d}{\mathrm dt}(\dot\delta^2)$, and the right side is $\frac{\omega_s}{H}(P_m - P_e)\frac{\mathrm d\delta}{\mathrm dt}$. Integrating in time from the start of the disturbance, when $\dot\delta = 0$ and $\delta = \delta_0$,
$$
\dot\delta^2 = \frac{\omega_s}{H}\int_{\delta_0}^{\delta}\bigl(P_m - P_e(u)\bigr)\,\mathrm du.
$$
The rotor stops accelerating relative to the bus, and turns back, when $\dot\delta = 0$ again, i.e. when the integral returns to zero. This is possible only if the integral can reach zero while $P_m - P_e$ is negative, that is before $\delta$ passes the point beyond the peak where $P_e$ falls back below $P_m$: past it the integrand is positive again and $\dot\delta$ can no longer reach zero. The integral is the signed area between the $P_m$ line and the $P_e$ curve.
:::

The relation $\dot\delta^2 = \frac{\omega_s}{H}\int(P_m - P_e)\,\mathrm d\delta$ is an energy balance: the accelerating area is kinetic energy (relative to synchronous speed) stored in the rotor, and the decelerating area is the energy the network can absorb after the fault.

### Critical clearing angle and time

Suppose the fault changes $P_e$ from $P_{\max,1}\sin\delta$ (pre-fault) to $P_{\max,2}\sin\delta$ (during the fault), and clearing changes it to $P_{\max,3}\sin\delta$ (post-fault). The largest clearing angle for which the machine remains stable is the **critical clearing angle** $\delta_{cr}$, at which the decelerating area just suffices up to $\delta_m = \pi - \arcsin(P_m/P_{\max,3})$, the post-fault unstable equilibrium.

::: theorem Critical clearing angle {#thm-critical-angle}
With the notation above,
$$
\cos\delta_{cr} = \frac{P_m(\delta_m - \delta_0) + P_{\max,3}\cos\delta_m - P_{\max,2}\cos\delta_0}{P_{\max,3} - P_{\max,2}}.
$$ {#eq-critical-angle}
For a fault that reduces the electrical power to zero ($P_{\max,2} = 0$), the angle grows as $\delta(t) = \delta_0 + \frac{\omega_sP_m}{4H}t^2$ during the fault, and the **critical clearing time** is
$$
t_{cr} = \sqrt{\frac{4H(\delta_{cr} - \delta_0)}{\omega_sP_m}}.
$$ {#eq-critical-time}
:::

::: proof
Set $A_1 = A_2$ at the limit:
$$
\int_{\delta_0}^{\delta_{cr}}(P_m - P_{\max,2}\sin\delta)\,\mathrm d\delta = \int_{\delta_{cr}}^{\delta_m}(P_{\max,3}\sin\delta - P_m)\,\mathrm d\delta.
$$
Evaluating, $P_m(\delta_{cr} - \delta_0) + P_{\max,2}(\cos\delta_{cr} - \cos\delta_0) = P_{\max,3}(\cos\delta_{cr} - \cos\delta_m) - P_m(\delta_m - \delta_{cr})$. Collecting the $\cos\delta_{cr}$ terms gives [[#eq-critical-angle]]. If $P_{\max,2} = 0$, the swing equation during the fault is $\ddot\delta = \omega_sP_m/(2H)$, a constant, so $\delta = \delta_0 + \frac{\omega_sP_m}{4H}t^2$; setting $\delta = \delta_{cr}$ gives [[#eq-critical-time]]. When $P_{\max,2}\ne0$ there is no closed form and the time must be found by integrating the swing equation.
:::

::: widget plot
f: 1.643*sin(x); 0.8; 1.278*sin(x); 0
x: 0, pi
y: 0, 1.8
piticks: true
shade: 0.5086, 1.1094
between: true
vlines: 0.5086; 1.1094; 2.4652
labels: P_e\ \text{pre-fault}; P_m; P_e\ \text{post-fault}; P_e\ \text{during fault}
caption: Equal areas for the sending-end fault of [[#ex-ccl]]. Before the fault the machine runs at $\delta_0 = 29.1^\circ$ on the upper curve. During the fault $P_e = 0$, and the shaded area between $P_m = 0.8$ and zero, from $\delta_0$ to the critical clearing angle $\delta_{cr} = 63.6^\circ$, is the accelerating area $A_1$. After clearing the machine follows the post-fault curve, and the region between it and $P_m$ from $\delta_{cr}$ to $\delta_m = 141.2^\circ$ (third vertical line) is the largest decelerating area $A_2$: at the critical clearing angle the two are exactly equal.
:::

::: example Critical clearing time for a sending-end fault {#ex-ccl}
In the system of [[#ex-smib]], a three-phase fault occurs on one line right at the high-voltage bus (so that $P_e = 0$ during the fault) and is cleared by opening that line. Find the critical clearing angle and time.
::: solution
$\delta_0 = 29.14^\circ = 0.5086\,\mathrm{rad}$; $P_{\max,2} = 0$; $P_{\max,3} = 1.278$, so $\delta_m = 180^\circ - 38.76^\circ = 141.24^\circ = 2.4652\,\mathrm{rad}$. From [[#eq-critical-angle]],
$$
\cos\delta_{cr} = \frac{0.8(2.4652 - 0.5086) + 1.278\cos141.24^\circ}{1.278} = \frac{1.5653 - 0.9969}{1.278} = 0.4448,
$$
so $\delta_{cr} = 63.6^\circ = 1.109\,\mathrm{rad}$. From [[#eq-critical-time]],
$$
t_{cr} = \sqrt{\frac{4\times5\times(1.109 - 0.5086)}{314.16\times0.8}} = 0.219\,\mathrm s,
$$
about eleven cycles at $50\,\mathrm{Hz}$. A numerical integration confirms it: clearing at $0.209\,\mathrm s$, the angle peaks at $120^\circ$ and swings back; clearing at $0.229\,\mathrm s$, it passes $\delta_m$ and increases without limit.
:::
:::

::: example A fault in the middle of the line {#ex-midline}
Repeat [[#ex-ccl]] for a fault at the middle of the line, where $P_{\max,2} = 0.605\,\mathrm{pu}$ ([[#ex-smib]]).
::: solution
[[#eq-critical-angle]] now gives
$$
\cos\delta_{cr} = \frac{0.8\times1.9566 + 1.278\cos141.24^\circ - 0.605\cos29.14^\circ}{1.278 - 0.605} = \frac{1.5653 - 0.9969 - 0.5285}{0.673} = 0.0592,
$$
so $\delta_{cr} = 86.6^\circ$. No closed form gives the time; integrating $\ddot\delta = 31.42(0.8 - 0.605\sin\delta)$ from $\delta_0$ at rest until $\delta = 86.6^\circ$ gives $t_{cr} = 0.389\,\mathrm s$. The power that flows past a remote fault slows the acceleration and nearly doubles the time available to clear it: faults close to a generating station are the most severe for stability.
:::
:::

::: warning Radians, degrees and the time constant
In [[#eq-swing]] with $\omega_s$ in rad/s, $\delta$ must be in **radians**; in the equal-area integrals the term $P_m(\delta_m - \delta_0)$ also needs radians, while the cosines can be evaluated in degrees. Mixing them (writing $P_m\times(141.2 - 29.1)$) inflates that term by a factor of $57$. Also, $H$ must be on the same MVA base as $P_m$ and $P_e$: a $5\,\mathrm s$ machine of $500\,\mathrm{MVA}$ has $H = 25\,\mathrm s$ on a $100\,\mathrm{MVA}$ base.
:::

::: quiz
Which change makes a generator *more* transiently stable for a given fault?
- [ ] Increasing its output $P_m$
- [ ] Reducing its inertia constant $H$
- [x] Clearing the fault faster
- [ ] Weakening the network by opening a parallel line before the fault
::: solution
Faster clearing reduces the accelerating area $A_1$ and leaves more decelerating area. Higher $P_m$ raises $\delta_0$ and increases $A_1$ while shrinking $A_2$; lower $H$ makes the rotor accelerate faster, reducing the critical clearing time ($t_{cr}\propto\sqrt H$); a weaker network lowers all the $P_{\max}$ values.
:::
:::

## Numerical solution of the swing equations

The equal-area criterion applies only to one machine against an infinite bus (or two machines). Real systems have hundreds of machines, detailed models of their excitation and governors, and loads that vary with voltage, so their stability is studied by **time-domain simulation**: numerical integration of the swing equations of all machines together with the algebraic network equations.

::: algorithm Transient stability simulation (classical model) {#alg-transient}
1. Solve the pre-fault power flow ([[power-systems/power-flow]]). Convert loads to constant admittances. For each generator compute $\mathbf E_i' = \mathbf V_i + jX_{di}'\mathbf I_i$; its magnitude stays constant and its angle is the initial $\delta_i$.
2. Form reduced admittance matrices, by eliminating all buses except the generator internal nodes, for the pre-fault, during-fault and post-fault networks. The electrical power of generator $i$ is $P_{ei} = \sum_kE_i'E_k'\abs{Y_{ik}}\cos(\theta_{ik} - \delta_i + \delta_k)$, the power-flow equation [[power-systems/power-flow#eq-pf]] applied at the internal nodes.
3. Integrate $\dot\delta_i = \Delta\omega_i$, $\frac{2H_i}{\omega_s}\Delta\dot\omega_i = P_{mi} - P_{ei} - D_i\Delta\omega_i$ through the fault period with the during-fault matrix, then switch to the post-fault matrix at the clearing time and continue for a few seconds (a modified Euler, Runge–Kutta or implicit trapezoidal method with a step of about half a cycle).
4. Examine the **swing curves** $\delta_i(t) - \delta_{\text{ref}}(t)$: the system is stable if all relative angles remain bounded and oscillate back.
:::

Industrial programs replace the classical model by detailed machine models with excitation systems, governors and stabilisers, and use the implicit trapezoidal rule to handle the stiffness of the combined differential–algebraic equations. The **critical clearing time** is found by repeated simulation with increasing clearing times.

::: example Choosing the maximum safe output {#ex-design-output}
The generator of [[#ex-smib]] is protected by relays and breakers that clear a close-in fault in $0.10\,\mathrm s$ (primary protection); if the primary breaker fails, back-up protection clears it in $0.15\,\mathrm s$. What is the largest output $P_m$ (with $E'$ unchanged) for which the plant remains stable for a sending-end fault cleared by (a) primary, (b) back-up protection?
::: solution
For each trial $P_m$, compute $\delta_0 = \arcsin(P_m/1.643)$, $\delta_m = \pi - \arcsin(P_m/1.278)$, $\delta_{cr}$ from [[#eq-critical-angle]] with $P_{\max,2} = 0$, and $t_{cr}$ from [[#eq-critical-time]]. The critical clearing time falls with output: $0.327\,\mathrm s$ at $P_m = 0.6$, $0.219\,\mathrm s$ at $0.8$, $0.171\,\mathrm s$ at $0.9$, $0.125\,\mathrm s$ at $1.0\,\mathrm{pu}$. Solving $t_{cr}(P_m) = t_{\text{clear}}$ numerically:

(a) $t_{cr} = 0.10\,\mathrm s$ at $P_m = 1.054\,\mathrm{pu}$ (with $\delta_0 = 39.9^\circ$, $\delta_{cr} = 49.4^\circ$, $\delta_m = 124.5^\circ$).

(b) $t_{cr} = 0.15\,\mathrm s$ at $P_m = 0.947\,\mathrm{pu}$.

Planning criteria usually require stability for the back-up clearing time, so the plant's output under this network condition would be limited to about $0.94\,\mathrm{pu}$, leaving a small margin for model uncertainty. Faster breakers, a third line, or a lower-reactance transformer would raise the limit.
:::
:::

## Improving stability

Stability limits often determine how much power can be transferred over a corridor, so considerable engineering goes into raising them.

- **Fast fault clearing.** Modern relays and breakers clear transmission faults in $3$ to $5$ cycles ($60$ to $100\,\mathrm{ms}$), which is the single most effective measure.
- **Single-pole switching and auto-reclosing.** Most faults are single-phase and transient (an arc that extinguishes when de-energised); opening only the faulted phase keeps the other two transferring power, and reclosing after about half a second restores the line.
- **Higher system voltage, parallel lines and series compensation** reduce $X$ and raise all the $P_{\max}$ values.
- **Fast excitation systems** raise $E'$ during and after the fault, increasing the decelerating area; **power system stabilisers** restore damping that fast excitation can remove.
- **Fast valving** of steam turbines, **braking resistors** switched in at the generator terminals, and in emergencies **generator tripping** reduce the accelerating power.
- **HVDC and FACTS** controllers can modulate power quickly to damp oscillations.

::: history
Stability became a practical limitation in the 1920s, when long lines connected remote hydro plants to cities. R. D. Evans and C. F. Wagner of Westinghouse published systematic stability studies from 1926, and laboratory "miniature systems" and network analysers were used to study them; the equal-area criterion was in use by the late 1920s and is set out in O. G. C. Dahl's *Electric Power Circuits* (1938) and Edward W. Kimbark's *Power System Stability* (1948). Swing curves were computed by hand, point by point, until digital computers took over in the late 1950s and 1960s. Francisco P. deMello and Charles Concordia explained in 1969 how fast voltage regulators reduce the damping of rotor oscillations, which led to the widespread use of power system stabilisers. Instability played a part in many large blackouts, including the North American Northeast blackout of 9 November 1965.
:::

## Where this leads

The frequency of the system as a whole, governed by the average of the swing equations of all machines, is controlled by governors and automatic generation control in [[power-systems/economic-dispatch-control]]; the "$H$" of this chapter reappears there as the system inertia that determines how fast frequency falls after a generator trips. The clearing times that decide stability are those achieved by protection, the subject of [[power-systems/protection-smart-grid]], where we also see how the replacement of synchronous machines by inverter-based generation reduces system inertia. For multi-machine dynamics, detailed machine models and modal analysis, see Kundur's *Power System Stability and Control*.

::: summary
- Rotor-angle stability is the ability of synchronous machines to stay in synchronism; small-signal stability concerns small disturbances (oscillations), transient stability large ones (faults).
- The swing equation is $\frac{2H}{\omega_s}\ddot\delta = P_m - P_e - D\dot\delta$, with inertia constant $H$ = stored energy/rated MVA (typically $2$–$9\,\mathrm s$).
- With the classical model, $P_e = (E'V/X)\sin\delta$; faults and switching change $X$ abruptly while $\delta$ changes continuously.
- Linearised, the rotor oscillates at $\omega_n = \sqrt{\omega_sP_{\max}\cos\delta_0/(2H)}$, about $0.5$–$2\,\mathrm{Hz}$; operation must be on the rising side of the curve.
- Equal-area criterion: a single machine is transiently stable if the decelerating area available after clearing at least equals the accelerating area; this gives the critical clearing angle, and for $P_e = 0$ during the fault, $t_{cr} = \sqrt{4H(\delta_{cr} - \delta_0)/(\omega_sP_m)}$.
- Multi-machine systems are studied by numerical integration; stability is improved by fast clearing, reclosing, stronger networks, fast excitation with stabilisers, and HVDC/FACTS control.
:::

## Exercises

::: exercise Stored energy {level=1 check="6*800"}
A $800\,\mathrm{MVA}$ turbine-generator has $H = 6\,\mathrm s$. Find its stored kinetic energy at synchronous speed in MJ.
::: solution
$W = HS = 6\times800 = 4800\,\mathrm{MJ}$.
:::
:::

::: exercise Changing the base of H {level=1 check="4*250/100"}
A $250\,\mathrm{MVA}$ hydro unit has $H = 4\,\mathrm s$ on its rating. Find $H$ on a $100\,\mathrm{MVA}$ system base.
::: solution
$H_{\text{sys}} = 4\times250/100 = 10\,\mathrm s$: the stored energy, $1000\,\mathrm{MJ}$, is the same; only the base changes.
:::
:::

::: exercise Natural frequency {level=1 check="sqrt(2*pi*60*1.2/(2*4))/(2*pi)"}
A $60\,\mathrm{Hz}$ machine with $H = 4\,\mathrm s$ operates with a synchronising power coefficient $P_s = 1.2\,\mathrm{pu}$ per radian. Find its natural frequency of oscillation in Hz.
::: solution
$\omega_n = \sqrt{376.99\times1.2/8} = 7.52\,\mathrm{rad/s}$, so $f_n = 1.20\,\mathrm{Hz}$.
:::
:::

::: exercise Steady-state limit with a margin {level=2 check="asin(0.8)*180/pi"}
A machine with $P_{\max} = 2.0\,\mathrm{pu}$ must keep a steady-state margin so that its output is at most $80\,\%$ of $P_{\max}$. At that limit, what is its load angle in degrees, and by what factor is the synchronising coefficient lower than at no load?
::: solution
$\sin\delta_0 = 0.8$, so $\delta_0 = 53.1^\circ$; $P_s = 2\cos53.1^\circ = 1.2$, i.e. $0.6$ of its no-load value of $2.0$. The oscillation frequency is lower by $\sqrt{0.6} = 0.77$.
:::
:::

::: exercise Critical clearing angle with no change in network {level=2 check="acos((pi-2*asin(0.5))*0.5-cos(asin(0.5)))*180/pi"}
A machine with $P_m = 0.5P_{\max}$ suffers a fault that reduces $P_e$ to zero; after clearing, the network is restored to its pre-fault state ($P_{\max,3} = P_{\max,1}$). Find the critical clearing angle in degrees.
::: solution
With $P_{\max,3} = P_{\max}$ and $P_m = 0.5P_{\max}$: $\delta_0 = 30^\circ$, $\delta_m = 150^\circ$. [[#eq-critical-angle]] with $P_{\max,2} = 0$ and everything divided by $P_{\max}$: $\cos\delta_{cr} = 0.5(\delta_m - \delta_0) + \cos\delta_m = 0.5\times2.0944 - 0.8660 = 0.1812$, so $\delta_{cr} = 79.6^\circ$. (In general $\cos\delta_{cr} = (\pi - 2\delta_0)\sin\delta_0 - \cos\delta_0$ for this case.)
:::
:::

::: exercise Critical clearing time {level=2 check="sqrt(4*3*(79.56-30)*pi/180/(2*pi*50*0.5*1.5))"}
In the previous exercise, $P_{\max} = 1.5\,\mathrm{pu}$, $H = 3\,\mathrm s$ and $f = 50\,\mathrm{Hz}$. Find the critical clearing time in seconds.
::: solution
$P_m = 0.75\,\mathrm{pu}$; $\delta_{cr} - \delta_0 = (79.56 - 30)^\circ = 0.8650\,\mathrm{rad}$. $t_{cr} = \sqrt{4\times3\times0.8650/(314.16\times0.75)} = \sqrt{0.04406} = 0.210\,\mathrm s$.
:::
:::

::: exercise Two machines swinging together {level=2}
Two machines with $H_1 = 5\,\mathrm s$ and $H_2 = 3\,\mathrm s$ (same base, same frequency) are connected by a lossless tie, with $P_e = P_{\max}\sin\delta_{12}$ flowing from 1 to 2. Show that the relative angle obeys a single swing equation with equivalent inertia $H_{\text{eq}} = H_1H_2/(H_1 + H_2)$, and evaluate it.
::: solution
$\frac{2H_1}{\omega_s}\ddot\delta_1 = P_{m1} - P_e$ and $\frac{2H_2}{\omega_s}\ddot\delta_2 = P_{m2} + P_e$. Then $\ddot\delta_{12} = \ddot\delta_1 - \ddot\delta_2 = \frac{\omega_s}2\bigl(\frac{P_{m1} - P_e}{H_1} - \frac{P_{m2} + P_e}{H_2}\bigr)$. Multiplying by $\frac{2}{\omega_s}\frac{H_1H_2}{H_1 + H_2}$ gives $\frac{2H_{\text{eq}}}{\omega_s}\ddot\delta_{12} = \frac{H_2P_{m1} - H_1P_{m2}}{H_1 + H_2} - P_e$, a single-machine swing equation with $H_{\text{eq}} = 15/8 = 1.875\,\mathrm s$ and an equivalent mechanical power. If machine 2 is very large ($H_2\to\infty$), $H_{\text{eq}}\to H_1$: the infinite bus.
:::
:::

::: exercise Stability after reclosing {level=3}
For the system of [[#ex-smib]], suppose the faulted line is reclosed successfully (the fault having been transient), so that after clearing the pre-fault network is restored. Find the critical clearing angle for a sending-end fault, and explain why the result is larger than that of [[#ex-ccl]].
::: hint
Use [[#eq-critical-angle]] with $P_{\max,3} = P_{\max,1} = 1.643$.
:::
::: solution
$\delta_m = 180^\circ - 29.14^\circ = 150.86^\circ = 2.6330\,\mathrm{rad}$. $\cos\delta_{cr} = \bigl[0.8(2.6330 - 0.5086) + 1.643\cos150.86^\circ\bigr]/1.643 = (1.6995 - 1.4352)/1.643 = 0.1609$, so $\delta_{cr} = 80.7^\circ$, compared with $63.6^\circ$ when the line stays out. With the stronger post-fault network the decelerating area is larger, so more acceleration can be tolerated. (In reality reclosing takes several hundred milliseconds, so the post-fault period with one line out comes first; the calculation shows the benefit of keeping the network intact, which is what single-pole switching achieves.)
:::
:::

::: exercise Integrating the swing equation by hand {level=3}
For the sending-end fault of [[#ex-ccl]], integrate the swing equation with time steps of $0.05\,\mathrm s$ during the fault using the exact constant-acceleration solution, and show that clearing at $0.20\,\mathrm s$ leaves the machine stable while clearing at $0.25\,\mathrm s$ does not.
::: hint
During the fault, $\delta(t) = \delta_0 + \frac{\omega_sP_m}{4H}t^2$, with the second term in radians when $t$ is in seconds.
:::
::: solution
$\frac{\omega_sP_m}{4H} = 314.16\times0.8/20 = 12.566\,\mathrm{rad/s^2}$. At $t = 0.05$, $0.10$, $0.15$, $0.20$, $0.25\,\mathrm s$ the angle is $\delta_0 + 0.0314$, $0.1257$, $0.2827$, $0.5027$, $0.7854\,\mathrm{rad}$, i.e. $30.9^\circ$, $36.3^\circ$, $45.3^\circ$, $57.9^\circ$, $74.1^\circ$. Clearing at $0.20\,\mathrm s$ happens at $57.9^\circ < \delta_{cr} = 63.6^\circ$: stable. Clearing at $0.25\,\mathrm s$ happens at $74.1^\circ > \delta_{cr}$: unstable, since the accelerating area then exceeds the available decelerating area. Consistent with $t_{cr} = 0.219\,\mathrm s$.
:::
:::
