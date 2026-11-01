The motor chosen in [[robot-arm-design/joint-actuators]] makes about $2\,\mathrm{N\,m}$ at a few thousand revolutions per minute; the shoulder it drives needs $180\,\mathrm{N\,m}$ at a few radians per second. Between them sits a **reducer**, and it does far more than multiply torque. It multiplies the motor's inertia by the square of its ratio, so that the motor rotor can outweigh the link in the dynamics. It adds backlash and a soft, nonlinear spring, so that the joint angle under load is not the motor angle divided by the ratio. It loses power in friction, which decides whether a person can push the arm away by hand. And it is often the part that limits the joint's life and its tolerance of a collision. This chapter compares the three reducer families used in arm joints — **planetary**, **cycloidal** and **strain-wave** — then looks at the low-ratio alternative, the **quasi-direct drive**, and ends with a selection procedure applied to the shoulder of the example arm. The geometry, forces and rating of involute gears are in [[machine-design/gear-design]] and gear trains in [[mechanisms/gear-trains]]; here the reducer is a component with a ratio, a stiffness curve, an efficiency and a life.

## What a joint reducer must do {#sec-reducer-requirements}

Industrial arms commonly use joint ratios between about $50$ and $200$; collaborative arms about $50$ to $160$ in each joint; legged robots and some force-controlled arms $6$ to $10$. Whatever the ratio, the reducer of a robot joint is asked for an unusual combination of properties:

- **Zero or very small backlash and lost motion**, because any free play at a shoulder appears magnified by the reach at the tool ([[robot-arm-design/arm-specification]]): one arcminute at $0.9\,\mathrm m$ is $0.26\,\mathrm{mm}$.
- **High torsional stiffness**, so that the joint does not wind up under the payload and so that the joint's natural frequency, which limits the servo bandwidth ([[robot-arm-design/joint-control]]), is high.
- **High torque density and a hollow centre**, so that the joint is small and light and the cables can pass through.
- **Tolerance of moment loads**, since the reducer's output usually carries the link through an integrated output bearing.
- **High momentary torque** for emergency stops and collisions, and a long life under the actual duty cycle.

No single type is best at all of these, which is why arms often mix them: cycloidal or strain-wave units in the large joints, strain-wave or planetary units in the wrist.

## Planetary reducers {#sec-planetary}

A planetary (epicyclic) stage has a central **sun** gear, three or more **planets** meshing with it and with an internally toothed **ring**, and a **carrier** holding the planet axles. With the ring fixed, sun input and carrier output, it is the most compact way to get a ratio of about $3$ to $10$ from spur or helical gears, and the load is shared among the planets.

::: proposition Ratio of a planetary stage {#prop-planetary}
For a planetary stage with sun of $Z_s$ teeth and ring of $Z_r$ teeth, the angular velocities of sun, ring and carrier satisfy Willis's relation
$$
\frac{\omega_s - \omega_c}{\omega_r - \omega_c} = -\frac{Z_r}{Z_s}.
$$ {#eq-willis}
With the ring fixed ($\omega_r = 0$), sun input and carrier output, the reduction ratio is
$$
N = \frac{\omega_s}{\omega_c} = 1 + \frac{Z_r}{Z_s}.
$$ {#eq-planetary-ratio}
:::

::: proof
Observed from the carrier, the planet axles are fixed and the stage is an ordinary gear train: sun to planet (external mesh, reversing) and planet to ring (internal mesh, not reversing), so the sun and ring turn in opposite directions with speed ratio $Z_r/Z_s$, the planet's tooth count cancelling. Relative to the carrier their speeds are $\omega_s - \omega_c$ and $\omega_r - \omega_c$, which gives [[#eq-willis]]. Setting $\omega_r = 0$: $\omega_s - \omega_c = (Z_r/Z_s)\,\omega_c$, so $\omega_s/\omega_c = 1 + Z_r/Z_s$. (Assembly also requires $Z_r = Z_s + 2Z_p$ for planets of $Z_p$ teeth on the same module, and $(Z_s + Z_r)/n$ an integer for $n$ equally spaced planets.)
:::

A sun of $12$ teeth and a ring of $60$ gives $N = 6$; two such stages in series give $36$, three give $216$. Each stage costs length, mass and a mesh of backlash and friction, so planetary reducers in arms rarely exceed two or three stages, and joints that need $100{:}1$ usually use another type.

Their strengths are high efficiency (typically $94\text{–}97\,\%$ per stage at rated load), back-drivability at moderate ratios, low cost and wide availability. Their weakness is backlash: involute gears need clearance between the teeth to run, and precision planetary gearheads (as of 2026) typically quote $1$ to $5$ arcmin, standard ones $10$ arcmin or more. Preloaded, split or spring-loaded planets reduce it at the cost of friction. Planetaries are therefore common in wrists of small arms, in low-ratio quasi-direct drives and as the first stage of a two-stage cycloidal reducer.

## Cycloidal reducers {#sec-cycloidal}

A cycloidal reducer replaces involute teeth with a **disc** whose rim is an epitrochoid with $Z_c$ lobes, rolling inside a ring of $Z_c + 1$ cylindrical **pins**. An eccentric on the input shaft drives the disc round in a small circle; because the disc has one lobe fewer than there are pins, each turn of the eccentric makes the disc roll backwards by one lobe. Holes in the disc engage pins on the output flange, which pick up the disc's slow rotation and ignore its wobble. Two discs $180°$ apart balance the eccentric forces.

::: proposition Ratio of a single cycloidal stage {#prop-cycloidal}
With the pin ring fixed, eccentric input and output taken from the disc's rotation, a disc of $Z_c$ lobes in a ring of $Z_c + 1$ pins gives
$$
N = \frac{\omega_{\text{in}}}{\omega_{\text{out}}} = -Z_c ,
$$ {#eq-cycloidal-ratio}
the minus sign meaning that output and input turn in opposite directions.
:::

::: proof
The disc rolls without slipping on the pin circle, so, as in the planetary analysis, take the eccentric as the "carrier". Relative to the eccentric, disc and pin ring behave as an internal gear pair with $Z_c$ and $Z_c + 1$ teeth, which turn in the same direction with speed ratio $(Z_c + 1)/Z_c$: $(\omega_d - \omega_e)/(\omega_p - \omega_e) = (Z_c + 1)/Z_c$. With $\omega_p = 0$: $\omega_d = \omega_e - \omega_e(Z_c + 1)/Z_c = -\omega_e/Z_c$.
:::

A disc of $39$ lobes in $40$ pins gives $39{:}1$ in one stage. Many lobes are in contact at once — in theory about half of them share the load — and the contacts are rolling between convex and concave surfaces, so cycloidal reducers are stiff, tolerate shock loads well (momentary and emergency-stop torque ratings are typically several times the rated torque) and have very small lost motion, typically about one arcminute. The two-stage version used in the large joints of industrial arms adds a spur or planetary first stage that drives two or three eccentric crankshafts; its ratio is $N = 1 + (Z_2/Z_1)Z_p$, with $Z_2/Z_1$ the first-stage ratio and $Z_p$ the number of pins, giving ratios of about $30$ to $200$ with a large hollow centre and an integrated output bearing that carries the link's moment load. Efficiency is typically $75\text{–}90\,\%$; the units are heavier than strain-wave reducers of the same torque.

## Strain-wave (harmonic) reducers {#sec-strain-wave}

The strain-wave reducer has three parts. The **wave generator** is an elliptical cam fitted with a thin flexible ball bearing. The **flexspline** is a thin-walled steel cup (or hat) with external teeth on its open rim; the wave generator, pressed inside, deforms the rim into an ellipse. The **circular spline** is a rigid ring with internal teeth, two more than the flexspline, which meshes with the flexspline only near the ends of the ellipse's major axis. As the wave generator turns, the zones of engagement travel round, and the flexspline advances by two teeth relative to the circular spline per revolution of the wave generator.

::: proposition Ratio of a strain-wave reducer {#prop-strain-wave}
With $Z_f$ teeth on the flexspline and $Z_c = Z_f + 2$ on the circular spline, wave-generator input:
$$
\begin{aligned}
N &= -\frac{Z_f}{Z_c - Z_f} = -\frac{Z_f}{2} &&\text{(circular spline fixed, flexspline output)},\\
N &= \frac{Z_c}{Z_c - Z_f} = \frac{Z_c}{2} &&\text{(flexspline fixed, circular spline output)}.
\end{aligned}
$$ {#eq-strain-wave-ratio}
:::

::: proof
The wave generator plays the role of the carrier, and relative to it the flexspline and circular spline mesh as an internal pair: $(\omega_f - \omega_w)/(\omega_c - \omega_w) = Z_c/Z_f$. With the circular spline fixed, $\omega_f = \omega_w(1 - Z_c/Z_f) = -\omega_w(Z_c - Z_f)/Z_f$, so $N = \omega_w/\omega_f = -Z_f/(Z_c - Z_f)$. With the flexspline fixed, $-\omega_w = (Z_c/Z_f)(\omega_c - \omega_w)$, so $\omega_c = \omega_w(Z_c - Z_f)/Z_c$ and $N = Z_c/(Z_c - Z_f)$, same direction.
:::

A flexspline of $200$ teeth gives $100{:}1$ in one stage; standard ratios run from about $30$ to $160$. The reducer has a large hollow centre, few parts, low mass and — because the teeth are preloaded by the elliptical deformation and about $30\,\%$ of them are engaged at once — essentially zero backlash. These properties made it the reducer of choice for compact arms, collaborative arms and space mechanisms.

Its weaknesses come from the flexing. The **torsional stiffness is relatively low and nonlinear**, rising with load as more teeth come into contact; the **efficiency** varies strongly with speed, load, temperature and lubricant, from around $85\,\%$ at rated load to well under $50\,\%$ at light load or low temperature; there is a **hysteresis** loop in the torque–twist curve; there is a small **transmission error**, typically of the order of an arcminute with a twice-per-revolution pattern of the wave generator, which shows up as a vibration source at the frequency $2\times$ the wave-generator speed; and an overload makes the teeth jump (**ratcheting**), which damages the reducer. The wave-generator bearing usually sets the life.

::: example A 100:1 joint three ways {#ex-three-ways}
Find tooth counts that give a reduction of exactly $100$ with (a) a strain-wave reducer, (b) a two-stage cycloidal reducer, (c) planetary stages, and compare the number of meshes the torque passes through.
::: solution
(a) Strain-wave, circular spline fixed: $\lvert N\rvert = Z_f/2 = 100$ needs $Z_f = 200$, $Z_c = 202$. One flexing mesh with many teeth engaged.

(b) Two-stage cycloidal: $N = 1 + (Z_2/Z_1)Z_p = 100$ needs $(Z_2/Z_1)Z_p = 99$, e.g. $Z_p = 33$ pins and a first stage of $Z_2/Z_1 = 3$ (say $16$ and $48$ teeth). Two stages: one spur mesh at high speed and low torque, then the cycloidal contacts.

(c) Planetary: $100 = 5\times5\times4$, three stages, e.g. sun $18$ / ring $72$ ($N = 5$) twice and sun $24$ / ring $72$ ($N = 4$) once. Three meshes in series, each with its own backlash; the last stage carries the full $180\,\mathrm{N\,m}$.

*Comparison*: the strain-wave and cycloidal designs reach $100{:}1$ in one or two compact stages with negligible backlash; the planetary needs three stages, is longer and accumulates backlash — though its efficiency ($0.96^3 \approx 0.88$) would still beat the other two. This is why planetaries are used at low ratios and the other two at high ratios.
:::
:::

## Torsional stiffness, lost motion and hysteresis {#sec-stiffness}

Load a reducer's output with the input locked, increase the torque to the rated value, reverse to minus the rated value and return, and record the twist. The result is a loop like the one in the figure below. Catalogues describe it with a few numbers.

::: definition Torsional stiffness, lost motion and hysteresis loss {#def-stiffness}
For a reducer with locked input, the curve of output twist $\theta$ against output torque $T$ has:
- **backlash**: free play with no torque, from clearance between the teeth (essentially zero in preloaded strain-wave and cycloidal units);
- **lost motion**: the twist at a small stated torque (typically $\pm3\,\%$ of rated), which combines backlash with the very soft initial region of contact;
- **hysteresis loss**: the width of the loop at zero torque after loading in each direction to rated torque, caused by friction in the meshes and bearings;
- **torsional stiffness**: the slope $\mathrm dT/\mathrm d\theta$, usually given piecewise-linear as $K_1$ for $0 \le T \le T_1$, $K_2$ for $T_1 < T \le T_2$, and $K_3$ above $T_2$, with $K_1 < K_2 < K_3$ for strain-wave reducers. The twist at torque $T$ then follows by adding the segments:
$$
\theta(T) = \frac{\min(T, T_1)}{K_1} + \frac{\max\bigl(\min(T, T_2) - T_1,\,0\bigr)}{K_2} + \frac{\max(T - T_2,\,0)}{K_3}.
$$ {#eq-twist}
:::

::: widget plot
title: Torque–twist curve of a strain-wave reducer
f: 3437.75*sign(x)*(min(abs(x),29)/54000 + max(min(abs(x),108) - 29, 0)/78000 + max(abs(x) - 108, 0)/100000) + h/2; 3437.75*sign(x)*(min(abs(x),29)/54000 + max(min(abs(x),108) - 29, 0)/78000 + max(abs(x) - 108, 0)/100000) - h/2
x: -200, 200
y: -10, 10
sliders: h=0.8:0:3:0.1
labels: \text{unloading};\ \text{loading}
caption: Output twist (arcmin) against output torque (N·m) for the illustrative stiffness values of [[#ex-windup]] ($K_1$, $K_2$, $K_3$ with breakpoints at 29 and 108 N·m), with a hysteresis band of width $h$ arcmin. The joint angle under load follows the lower branch while the torque rises and the upper one while it falls. Notice the steeper slope (lower stiffness) near zero torque: a lightly loaded joint is the softest, so the lowest natural frequency of a strain-wave joint is often found at light load. Widen $h$ to see how hysteresis makes the joint angle depend on the direction of approach.
:::

::: example Wind-up of the shoulder under the payload {#ex-windup}
Suppose the shoulder of the example arm of [[robot-arm-design/arm-specification]] uses a strain-wave reducer with (illustrative values of the order found in catalogues for a reducer of this torque class) $K_1 = 5.4\times10^4$, $K_2 = 7.8\times10^4$, $K_3 = 1.0\times10^5\,\mathrm{N\,m/rad}$, $T_1 = 29$ and $T_2 = 108\,\mathrm{N\,m}$. Find the twist at the static gravity torque of $95.2\,\mathrm{N\,m}$, the resulting tip displacement at $0.9\,\mathrm m$, the change when the $5\,\mathrm{kg}$ payload is removed ($\tau_g = 51.0\,\mathrm{N\,m}$), and the lowest natural frequency of the arm swinging on this joint.
::: solution
*Twist at full load*, by [[#eq-twist]]:
$$
\theta = \frac{29}{5.4\times10^4} + \frac{95.2 - 29}{7.8\times10^4} = 5.37\times10^{-4} + 8.49\times10^{-4} = 1.39\times10^{-3}\,\mathrm{rad}\ (4.8\ \text{arcmin}).
$$
Tip displacement $0.9\times1.39\times10^{-3} = 1.25\,\mathrm{mm}$.

*Without payload*: $\theta = 5.37\times10^{-4} + (51.0 - 29)/7.8\times10^4 = 8.19\times10^{-4}\,\mathrm{rad}$, tip $0.74\,\mathrm{mm}$. Picking up the payload therefore drops the tip by $0.51\,\mathrm{mm}$ — ten times the repeatability specification — unless the controller measures the twist (output encoder) or compensates it from a stiffness model.

*Natural frequency*: about the operating point the secant stiffness is $95.2/1.39\times10^{-3} = 6.9\times10^4\,\mathrm{N\,m/rad}$, and the tangent stiffness $K_2 = 7.8\times10^4$. With the link inertia $7.03\,\mathrm{kg\,m^2}$ swinging on this spring (motor side held rigidly by the servo), $f = \frac{1}{2\pi}\sqrt{7.8\times10^4/7.03} = 16.8\,\mathrm{Hz}$; near zero torque, on $K_1$, it is $14.0\,\mathrm{Hz}$.

*Sanity check*: lowest structural modes of $10\text{–}20\,\mathrm{Hz}$ and millimetre-scale sag under full payload are typical of lightweight arms of this size, and are why their position loops are tuned to a few hertz and why calibration includes joint compliance ([[robot-arm-design/calibration]]). The reducer is usually the softest element in the joint, but not the only one: [[robot-arm-design/links-and-structure]] adds the links and bearings to the budget.
:::
:::

::: warning Rated stiffness is not the joint's stiffness
The catalogue stiffness describes the reducer alone, clamped on a rigid test rig. In the joint, its input sees the motor's servo stiffness (finite, and zero above the servo bandwidth), its output flange sits on the joint's output bearing and housing, and its mounting bolts and the housing itself twist. Measured joint stiffness is commonly well below the reducer value. Measure the assembled joint — lock the motor, apply known torques at the output with weights on a lever, and read the output encoder or a dial gauge — before trusting a deflection or natural-frequency prediction.
:::

## Efficiency and back-drivability {#sec-efficiency}

The **forward efficiency** $\eta_f$ of a reducer is the ratio of output to input power when the motor drives the load. The **backward efficiency** $\eta_b$ applies when the load drives the motor — when a person pushes the arm, the arm is lowered under gravity, or the joint decelerates. Because the losses are mostly friction proportional to the transmitted load, $\eta_b$ is lower than $\eta_f$, and if the friction is large enough $\eta_b$ falls to zero: the reducer is **self-locking** (as a worm gear of small lead angle is, [[machine-design/gear-design]]). Robot reducers are not self-locking, but many are hard to back-drive. Catalogues quote a **back-driving torque**: the output torque needed to start turning the input with the motor unpowered.

The torque a person must apply to move an unpowered joint is the back-driving torque of the reducer plus the motor's cogging and friction multiplied by $N$, and the inertia they feel is the link inertia plus $N^2J_m$.

::: proposition What the output sees through a reducer {#prop-reflected}
A motor with rotor inertia $J_m$ and friction torque $T_{f,m}$, driving through an ideal reducer of ratio $N$, appears at the output as an inertia and friction torque
$$
J_{\text{refl}} = N^2J_m,\qquad T_{f,\text{refl}} = N\,T_{f,m},
$$ {#eq-reflected}
while a motor torque $T_m$ becomes an output torque $\eta NT_m$ in forward drive.
:::

::: proof
The motor angle is $\theta_m = N\theta$. The rotor's kinetic energy is $\tfrac12J_m\dot\theta_m^2 = \tfrac12(N^2J_m)\dot\theta^2$, which is the kinetic energy of an inertia $N^2J_m$ turning at the output speed. A friction torque $T_{f,m}$ dissipates power $T_{f,m}\dot\theta_m = (NT_{f,m})\dot\theta$, which is the dissipation of a torque $NT_{f,m}$ at the output speed. With losses in the reducer, a fraction $\eta$ of the motor power $T_m\dot\theta_m$ reaches the output, giving $\eta NT_m$.
:::

The squares make a large difference. A frameless motor of rotor inertia $1.2\times10^{-4}\,\mathrm{kg\,m^2}$ reflects $1.2\,\mathrm{kg\,m^2}$ through $N = 100$ — a sixth of the whole outstretched arm of [[robot-arm-design/arm-specification]] — but only $0.0097\,\mathrm{kg\,m^2}$ through $N = 9$. Reflected inertia matters for three reasons: it absorbs motor torque during acceleration, it is part of the effective mass that strikes an obstacle or a person in a collision ([[robot-arm-design/arm-safety]]), and, because it is coupled to the link through the reducer's spring, it forms the two-mass resonance of [[robot-arm-design/joint-control]].

## Quasi-direct drives {#sec-qdd}

A **quasi-direct drive** (QDD) uses a large-diameter, high-torque motor with a single low-ratio stage, typically a planetary of $6$ to $10$. Its attractions all follow from [[#eq-reflected]]: reflected inertia and friction are small, so the joint is **transparent** — the motor current is a good measure of the output torque, external forces can be sensed without a torque sensor, the joint can be back-driven easily, and impacts are absorbed by the motor rather than the gear teeth. Legged robots use QDD joints for exactly these reasons, as do haptic devices and some research and low-cost arms.

The price is torque. With $N = 9$ the shoulder of the example arm would need $180/9 = 20\,\mathrm{N\,m}$ peak and about $14\,\mathrm{N\,m}$ continuous from the motor — ten times the motor of [[robot-arm-design/joint-actuators]], hence much heavier — and, worse, holding the arm against gravity would dissipate $(T/K_m)^2$ with a $T$ ten times larger, which only a much larger $K_m$, i.e. a much larger motor, can afford. QDD is therefore attractive where gravity torques are small compared with the dynamic and contact torques: legs (which unload between steps), light arms, and the distal joints of arms with gravity balancing.

::: example Geared or quasi-direct shoulder? {#ex-qdd}
Compare two ways of driving the shoulder of the example arm: (A) the motor of [[robot-arm-design/joint-actuators]] ($K_m = 0.35\,\mathrm{N\,m/\sqrt W}$, $J_m = 1.2\times10^{-4}\,\mathrm{kg\,m^2}$, friction $0.02\,\mathrm{N\,m}$) with $N = 100$; (B) a large QDD motor ($K_m = 1.5\,\mathrm{N\,m/\sqrt W}$, $J_m = 1.0\times10^{-3}\,\mathrm{kg\,m^2}$, friction $0.02\,\mathrm{N\,m}$) with $N = 9$. For each, find the copper loss holding the gravity torque of $95.2\,\mathrm{N\,m}$ (ignore reducer losses when holding), the motor friction felt at the joint, and the reflected motor inertia expressed as an equivalent mass at the tool $0.9\,\mathrm m$ away.
::: solution
*Holding loss*: (A) $T_m = 0.952\,\mathrm{N\,m}$, $P = (0.952/0.35)^2 = 7.4\,\mathrm W$. (B) $T_m = 10.6\,\mathrm{N\,m}$, $P = (10.6/1.5)^2 = 50\,\mathrm W$ — seven times more, even with a motor of four times the $K_m$ (and several times the mass).

*Friction at the joint* ($NT_{f,m}$): (A) $2.0\,\mathrm{N\,m}$ plus the strain-wave reducer's own back-driving torque, which is typically much larger; (B) $0.18\,\mathrm{N\,m}$ plus a small planetary loss. A person at the tool would feel a few newtons in (B) and tens of newtons in (A).

*Equivalent mass at the tool* ($N^2J_m/r^2$): (A) $1.2/0.81 = 1.48\,\mathrm{kg}$; (B) $0.081/0.81 = 0.10\,\mathrm{kg}$.

*Conclusion*: QDD wins on transparency and collision mass, loses heavily on holding heat and motor mass. For an arm whose shoulder spends most of its time holding a load against gravity, the geared joint is the rational choice unless gravity is balanced by springs or counterweights.
:::
:::

::: quiz
Which change to a joint makes it easier for a person to push the unpowered arm out of the way?
- [ ] Doubling the gear ratio and halving the motor size
- [x] Halving the gear ratio and keeping the same motor
- [ ] Replacing a planetary stage with a strain-wave stage of the same ratio
- [ ] Increasing the reducer's torsional stiffness
::: solution
By [[#eq-reflected]], the friction and inertia felt at the output scale with $N$ and $N^2$, so halving $N$ halves the reflected friction and quarters the reflected inertia. A strain-wave stage at the same ratio usually has *lower* efficiency than a planetary (harder to back-drive). Stiffness affects how much the joint twists, not how hard it is to turn.
:::
:::

## Rated torque, momentary torque and life {#sec-rating}

Reducer catalogues give several torque limits, and each corresponds to a different failure:

- **Rated torque** $T_r$: the torque at which the reducer reaches its **rated life** $L_r$ (typically several thousand to tens of thousands of hours) at the **rated input speed** $n_r$; it is normally the life of a bearing (the wave-generator bearing, the crankshaft bearings) or the surface fatigue of the teeth.
- **Peak (repeated) torque**: the limit for the accelerations and decelerations of normal cycles.
- **Average torque limit**: the largest cubic-mean torque (below) allowed continuously.
- **Momentary torque**: a limit for rare events — emergency stops, collisions — that may occur a limited number of times in the reducer's life; exceeding it risks tooth breakage or, in strain-wave units, ratcheting.

Life under a varying duty cycle is estimated, as for rolling bearings ([[machine-design/bearings]]), from a **cubic mean torque** weighted by the number of revolutions at each torque. For a cycle of segments $j$ at output torque $\lvert T_j\rvert$, input speed $n_j$ and duration $t_j$:
$$
T_{av} = \left(\frac{\sum_j n_jt_j\lvert T_j\rvert^3}{\sum_j n_jt_j}\right)^{1/3},\qquad n_{av} = \frac{\sum_j n_jt_j}{\sum_j t_j},\qquad L \approx L_r\left(\frac{T_r}{T_{av}}\right)^3\frac{n_r}{n_{av}} .
$$ {#eq-reducer-life}
This form, used in strain-wave and cycloidal catalogues (some use exponents slightly different from 3), is an empirical rating relation inherited from the $L_{10}$ life of rolling bearings: it gives the life reached or exceeded by $90\,\%$ of units, not a guarantee. Segments at zero speed carry no weight, because a stationary bearing does not accumulate fatigue cycles — but holding still under load can cause other damage (false brinelling under vibration) and must stay within the static and average limits.

::: example Selecting the shoulder reducer {#ex-select}
For the shoulder of the example arm: peak output torque $180\,\mathrm{N\,m}$ (with margin), joint speed $3.14\,\mathrm{rad/s}$, motor of [[robot-arm-design/joint-actuators]] with peak torque $2.25\,\mathrm{N\,m}$, rotor inertia $J_m = 1.2\times10^{-4}\,\mathrm{kg\,m^2}$ and maximum speed $5000\,\mathrm{rev/min}$; link inertia $7.03\,\mathrm{kg\,m^2}$, gravity torque $95.2\,\mathrm{N\,m}$, required acceleration $6.0\,\mathrm{rad/s^2}$. The cycle of [[robot-arm-design/arm-specification]] has output torques $137$, $95.2$, $53.0\,\mathrm{N\,m}$ for $0.3$, $0.4$, $0.3\,\mathrm s$ at mean joint speeds $1.57$, $3.14$, $1.57\,\mathrm{rad/s}$, then $1.0\,\mathrm s$ at rest. A strain-wave candidate with $N = 100$, efficiency $0.80$, has (illustrative) rated torque $T_r = 100\,\mathrm{N\,m}$ at $n_r = 2000\,\mathrm{rev/min}$ for $L_r = 7000\,\mathrm h$, peak repeated torque above $180\,\mathrm{N\,m}$. Check the ratio, the acceleration and the life.
::: solution
*Speed*: $N \le (5000\times2\pi/60)/3.14 = 524/3.14 = 167$; $N = 100$ gives the joint $5.2\,\mathrm{rad/s}$ at motor top speed — margin for the bus-voltage limit of [[robot-arm-design/joint-actuators]].

*Acceleration*, with reflected inertia: the available joint acceleration from the horizontal is
$$
\alpha = \frac{\eta NT_{m,\text{pk}} - \tau_g}{N^2J_m + J_L} = \frac{0.80\times100\times2.25 - 95.2}{1.20 + 7.03} = \frac{84.8}{8.23} = 10.3\,\mathrm{rad/s^2} \;>\; 6.0 . \checkmark
$$
For comparison, $N = 50$ gives $(90 - 95.2)/(0.30 + 7.03) < 0$: the motor could not even hold the arm. The ratio is set from below by gravity and from above by speed.

*Life*: input speeds $n = 100\times\omega\times60/2\pi$: $1500$, $3000$, $1500\,\mathrm{rev/min}$, and $0$ at rest. Then
$$
T_{av} = \left(\frac{1500(0.3)137.4^3 + 3000(0.4)95.2^3 + 1500(0.3)53.0^3}{1500(0.3) + 3000(0.4) + 1500(0.3)}\right)^{1/3} = 102.6\,\mathrm{N\,m},
$$
$n_{av} = (450 + 1200 + 450)/2.0 = 1050\,\mathrm{rev/min}$, and
$$
L \approx 7000\left(\frac{100}{102.6}\right)^3\frac{2000}{1050} = 12\,400\,\mathrm h .
$$
At two shifts ($\approx 4000\,\mathrm h$ a year of running) that is about three years — too short for an industrial product, though the cycle is pessimistic (arm horizontal throughout). The next size up, typically with roughly double the rated torque, would give about eight times the life by the cube law, at the cost of mass and inertia. The momentary torque in an emergency stop must also be checked: braking the arm from full speed in, say, $0.1\,\mathrm s$ needs $7.03\times31 + 95 \approx 320\,\mathrm{N\,m}$ — well above the peak repeated torque, so it must be within the momentary rating, or the stop must be made softer.

*Sanity check*: life is controlled by the cube of torque, so a $10\,\%$ error in the mass estimate is a $30\,\%$ error in life — another reason to iterate the mass budget.
:::
:::

::: widget plot
title: Available shoulder acceleration against gear ratio
f: (0.8*x*T - 95.2)/(x^2*Jm/10000 + 7.03); 6 + 0*x
x: 20, 300
y: -5, 20
sliders: T=2.25:1:4:0.05; Jm=1.2:0.2:5:0.1
labels: \ddot q_{\max}\ (\mathrm{rad/s^2}); \text{required}
vlines: 167
caption: Acceleration available at the shoulder of [[#ex-select]], lifting from the horizontal, against gear ratio $N$, for a motor of peak torque $T$ (N·m) and rotor inertia $J_m$ (in units of $10^{-4}\,\mathrm{kg\,m^2}$), with reducer efficiency 0.8. Below about $N = 53$ the motor cannot even hold the arm; at high ratios the reflected inertia $N^2J_m$ eats the torque. The vertical line is the speed limit $N = 167$ and the flat line the required $6\,\mathrm{rad/s^2}$: the usable window is where the curve is above the flat line and left of the vertical one. Increase $J_m$ to see the window close.
:::

## Comparing and choosing {#sec-compare}

| property (typical, as of 2026) | precision planetary | cycloidal (incl. two-stage) | strain-wave |
|---|---|---|---|
| ratio per stage | 3–10 | 30–200 (two-stage); 10–100 (single) | 30–160 |
| backlash / lost motion | 1–10 arcmin backlash | ≈ 1 arcmin lost motion | ≈ 0 backlash; < 1 arcmin lost motion |
| torsional stiffness | moderate | high | lower, nonlinear |
| efficiency at rated load | 94–97 % per stage | 75–90 % | 60–85 %, strongly load- and temperature-dependent |
| back-drivability | good at low ratio | poor to moderate | poor to moderate |
| shock tolerance | moderate | high | limited (ratcheting) |
| mass, size, hollow bore | light; small bore | heavier; large bore | lightest; large bore |
| typical joints | wrists, QDD, first stage | base, shoulder, elbow of industrial arms | all joints of compact and collaborative arms |

::: algorithm Selecting a joint reducer {#alg-select}
1. From the joint requirement, fix the **ratio window**: $N \le \omega_{m,\max}/\dot q_{\max}$ (speed, with margin for the bus voltage), and $N$ large enough that $\eta NT_{m,\text{pk}}$ covers the peak torque including the reflected-inertia term $N^2J_m\ddot q$ and that $\eta NT_{m,\text{cont}}$ covers the rms torque.
2. Choose the **type** from the table: shock loads and stiffness favour cycloidal, mass and compactness favour strain-wave, transparency and back-drivability favour low-ratio planetary.
3. Choose the **size**: peak repeated torque above the cycle peaks; momentary torque above emergency-stop and collision torques; average torque limit above $T_{av}$.
4. Check **life** with [[#eq-reducer-life]] under realistic cycles.
5. Check **stiffness and lost motion** against the tip budget ([[robot-arm-design/arm-specification]], [[robot-arm-design/links-and-structure]]) and the lowest natural frequency against the intended servo bandwidth ([[robot-arm-design/joint-control]]).
6. Check the **output bearing**'s moment capacity against the link loads, and the efficiency and heat at the rms speed and torque.
7. Update the joint mass and inertia, and iterate with the actuator choice.
:::

::: history
Planetary gear trains are ancient — the Antikythera mechanism of the second or first century BC contains epicyclic gearing — and their kinematics was put on a systematic footing by Robert Willis in *Principles of Mechanism* (1841). The cycloidal speed reducer was developed in the 1920s by the German engineer Lorenz Braren, whose design was licensed widely and is still made in essentially the same form. Strain-wave gearing was invented by C. Walton Musser in the 1950s and patented in 1959; it flew on the Apollo lunar roving vehicle and was fitted to Victor Scheinman's Stanford Arm in 1969. The two-stage cycloidal reducers that dominate the large joints of industrial arms appeared in the 1980s, when electric industrial robots needed stiff, compact, shock-tolerant joints with low lost motion. Quasi-direct-drive joints were popularised in the 2010s by legged robots built at MIT and elsewhere, which needed transparent, impact-tolerant actuators.
:::

::: summary
- Ratios: planetary $1 + Z_r/Z_s$ per stage; cycloidal $-Z_c$ (single stage), $1 + (Z_2/Z_1)Z_p$ (two-stage); strain-wave $-Z_f/2$ (circular spline fixed).
- Planetary: efficient, back-drivable, cheap, but backlash and low ratio per stage. Cycloidal: stiff, shock-tolerant, ~1 arcmin, heavier. Strain-wave: light, compact, zero backlash, but low and nonlinear stiffness, variable efficiency, ratcheting.
- Torque–twist curves have lost motion, hysteresis and piecewise stiffness $K_1 < K_2 < K_3$; wind-up under payload can be millimetres at the tip and the lowest joint mode $10\text{–}20\,\mathrm{Hz}$ in lightweight arms.
- Through a reducer the output sees $N^2J_m$ and $NT_{f,m}$: high ratios hide the link from the motor but make the joint hard to back-drive and heavy in collisions.
- Quasi-direct drives ($N \approx 6\text{–}10$) are transparent and robust to impact but need big motors and suffer under gravity loads.
- Size by peak, momentary and average torque; estimate life with the cubic-mean torque, $L \approx L_r(T_r/T_{av})^3(n_r/n_{av})$; iterate with the motor and mass budgets.
:::

## Exercises

::: exercise Two-stage planetary {level=1 check="25"}
A planetary gearhead has two identical stages, each with a sun of $18$ teeth and a ring of $72$ teeth (ring fixed, sun in, carrier out). What is the overall ratio, and how many teeth do the planets have? (Enter the overall ratio $N$.)
::: solution
Per stage $1 + 72/18 = 5$; overall $5^2 = 25$. The planets have $(72 - 18)/2 = 27$ teeth, and with three planets $(18 + 72)/3 = 30$ is an integer, so they can be equally spaced.
:::
:::

::: exercise Ratio of a strain-wave reducer {level=1 check="80"}
A strain-wave reducer has a flexspline of $160$ teeth. With the circular spline fixed, what is the magnitude of the ratio from wave generator to flexspline? (Enter $\lvert N\rvert$.)
::: solution
$\lvert N\rvert = Z_f/2 = 160/2 = 80$, the flexspline turning opposite to the wave generator. With the flexspline fixed and the circular spline ($162$ teeth) as output, the ratio would be $162/2 = 81$, same direction.
:::
:::

::: exercise Reflected inertia {level=1 check="1.296"}
A motor with rotor inertia $8.0\times10^{-5}\,\mathrm{kg\,m^2}$ drives a joint through a $120{:}1$ reducer whose own input-side inertia (wave generator or sun and input shaft) is $1.0\times10^{-5}\,\mathrm{kg\,m^2}$. What inertia do they add at the joint? (Enter it in kg·m², to three decimal places.)
::: solution
$N^2(J_m + J_r) = 14\,400\times9.0\times10^{-5} = 1.296\,\mathrm{kg\,m^2}$. The reducer's input parts turn at motor speed and are reflected with the same $N^2$, so they must not be forgotten: here they add $0.144\,\mathrm{kg\,m^2}$.
:::
:::

::: exercise Cycloidal ratio {level=2 check="121"}
A two-stage cycloidal reducer has a first stage of ratio $Z_2/Z_1 = 3$ and a pin ring with $40$ pins. Find its overall ratio. (Enter $N$.)
::: solution
$N = 1 + (Z_2/Z_1)Z_p = 1 + 3\times40 = 121$.
:::
:::

::: exercise Twist at a light load {level=2 check="3.21"}
Using the stiffness data of [[#ex-windup]], find the twist of the reducer at an output torque of $60\,\mathrm{N\,m}$. (Enter the twist in arcmin, to two decimal places.)
::: solution
$\theta = 29/5.4\times10^4 + (60 - 29)/7.8\times10^4 = 5.370\times10^{-4} + 3.974\times10^{-4} = 9.345\times10^{-4}\,\mathrm{rad}$; times $3437.75\,\mathrm{arcmin/rad}$ this is $3.21\,\mathrm{arcmin}$. Note that the first $29\,\mathrm{N\,m}$ cause more than half the twist: the softest region is near zero torque.
:::
:::

::: exercise Life under a lighter cycle {level=2 check="61700"}
In [[#ex-select]], suppose a realistic set of poses lowers the cubic-mean torque to $T_{av} = 60\,\mathrm{N\,m}$ at the same mean input speed of $1050\,\mathrm{rev/min}$. Estimate the life. (Enter $L$ in hours, to three significant figures.)
::: solution
$L = 7000\times(100/60)^3\times2000/1050 = 7000\times4.630\times1.905 = 61\,700\,\mathrm h$, five times the pessimistic estimate: the cube law makes life very sensitive to the assumed loads, so realistic duty cycles are worth the effort.
:::
:::

::: exercise Natural frequency and ratio {level=3}
A joint with link inertia $J_L$ and reducer stiffness $k$ is driven by a motor of inertia $J_m$ through ratio $N$. Model the motor side as free (no servo stiffness). Show that the joint's torsional natural frequency is $\omega = \sqrt{k\,(1/J_L + 1/(N^2J_m))}$, and evaluate it for $J_L = 7.03\,\mathrm{kg\,m^2}$, $k = 7.8\times10^4\,\mathrm{N\,m/rad}$, $J_m = 1.2\times10^{-4}\,\mathrm{kg\,m^2}$ and $N = 100$. Compare with the value in [[#ex-windup]], which held the motor side fixed, and explain which is relevant when.
::: solution
Refer the motor to the output: inertia $N^2J_m$ at angle $\theta_m/N$. Two inertias joined by a spring $k$ with no ground have the non-zero natural frequency $\omega^2 = k(1/J_1 + 1/J_2)$ (from the equations $J_1\ddot x_1 = -k(x_1 - x_2)$, $J_2\ddot x_2 = k(x_1 - x_2)$, the relative coordinate obeys $\ddot x_r = -k(1/J_1 + 1/J_2)x_r$). Numbers: $1/7.03 + 1/1.20 = 0.142 + 0.833 = 0.976$; $\omega = \sqrt{7.8\times10^4\times0.976} = 276\,\mathrm{rad/s}$, $f = 43.9\,\mathrm{Hz}$. With the motor held rigidly, $f = 16.8\,\mathrm{Hz}$ ([[#ex-windup]]). The fixed-motor frequency (the "anti-resonance" seen from the motor) applies when the servo is stiff at that frequency; the free-motor frequency (the resonance) is what the velocity loop sees above its bandwidth. Both appear in the motor-side frequency response — see [[robot-arm-design/joint-control]].
:::
:::

::: exercise Ratio window for a wrist joint {level=3 check="62.8"}
A wrist joint must reach $10\,\mathrm{rad/s}$ and deliver $12\,\mathrm{N\,m}$ peak (gravity $4\,\mathrm{N\,m}$ included) while accelerating an output inertia of $0.05\,\mathrm{kg\,m^2}$ at $160\,\mathrm{rad/s^2}$. Its motor has peak torque $0.30\,\mathrm{N\,m}$, rotor inertia $1.0\times10^{-5}\,\mathrm{kg\,m^2}$ and maximum speed $6000\,\mathrm{rev/min}$; reducer efficiency $0.75$. Find the largest ratio allowed by speed, the smallest allowed by torque (including reflected inertia), and say whether a window exists. (Enter the largest ratio, to one decimal place.)
::: solution
*Speed*: $\omega_{m,\max} = 6000\times2\pi/60 = 628.3\,\mathrm{rad/s}$, so $N \le 62.8$.
*Torque*: need $0.75\,N\times0.30 \ge 4 + (0.05 + N^2\times10^{-5})\times160$, i.e. $0.225N \ge 12 + 0.0016N^2$. The quadratic $0.0016N^2 - 0.225N + 12 \le 0$ has roots $N = [0.225 \pm \sqrt{0.0506 - 0.0768}]/0.0032$; the discriminant is negative, so **no** ratio satisfies it: even at the best ratio the motor cannot supply $12\,\mathrm{N\,m}$ plus its own reflected inertia. The best ratio, $N = 0.225/0.0032 = 70$ (inertia matching), is also above the speed limit. A larger motor is needed — e.g. $0.45\,\mathrm{N\,m}$ peak gives $0.3375N \ge 12 + 0.0016N^2$, satisfied for $45.3 \le N \le 165.7$, and with the speed limit the window $45.3 \le N \le 62.8$; a $50{:}1$ strain-wave unit would do.
:::
:::

::: exercise Choosing reducers for a collaborative arm {level=3}
A 7-axis collaborative arm with a $7\,\mathrm{kg}$ payload must be hand-guidable, detect collisions from motor current, keep the effective mass in a collision low, and achieve ±0.05 mm repeatability. Discuss the choice of reducer type and ratio for the shoulder and for the wrist joints, including the role of joint torque sensors or dual encoders.
::: solution
A good answer: Repeatability and compactness argue for strain-wave reducers in all joints (zero backlash, light, hollow), ratios around $100$–$160$ at shoulder and elbow and $100$ at the wrist. But such ratios make the joints hard to back-drive and hide external forces in reducer friction (variable with temperature and load), so current-based collision detection and hand-guiding become crude; the common remedy is a joint torque sensor at the reducer output (strain gauges on a flexure), or a dual-encoder deflection measurement using the reducer's own compliance as the sensor (cheaper but nonlinear and hysteretic). Reflected motor inertia $N^2J_m$ dominates the effective mass of the distal joints in a collision; keeping $N$ lower in the shoulder (cycloidal or planetary-plus-strain-wave at $\approx 50$) with a larger motor reduces it but raises the gravity heat load, so gravity compensation by springs may be considered. A QDD design at $N \approx 8$ would give the best transparency but the shoulder gravity torque (several hundred N·m with a $7\,\mathrm{kg}$ payload at a $\approx 0.8\,\mathrm m$ reach) would need a very heavy motor. The answer should end with a defensible split, e.g. strain-wave plus torque sensors throughout, with the reasoning above.
:::
:::
