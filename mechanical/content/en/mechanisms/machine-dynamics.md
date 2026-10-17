---
id: mechanisms/machine-dynamics
title: "Machine Dynamics: Flywheels and Balancing"
summary: "Equivalent inertia and torque, the turning-moment diagram, flywheel sizing and what a flywheel cannot do, two-plane balancing, and why a four-cylinder engine shakes at twice crankshaft speed."
translated: false
tags: ["flywheel", "balancing", "equivalent inertia", "shaking force", "primary and secondary", "ISO 1940"]
---

::: warning The torque is not the power divided by the speed
Every previous lesson in this course has computed accelerations from a given motion. This lesson computes the motion that a given torque produces — and the first thing you discover is that the answer is not what the nameplate says.

A $10\ \mathrm{kW}$ motor at $3000\ \mathrm{rev / min}$ does not deliver $31.8\ \mathrm{N \cdot m}$. It delivers $31.8\ \mathrm{N \cdot m}$ *on average*, and the linkage it drives asks for an oscillating torque that in the worked example of [[#sec-eqsys]] reaches $907\ \mathrm{N \cdot m}$ — **twenty-eight times the mean** — even when the output shaft turns at a perfectly constant speed. A press that punches $6000\ \mathrm{J}$ in $0.06\ \mathrm{s}$ does not need a $100\ \mathrm{kW}$ motor; it needs a $25\ \mathrm{kW}$ motor and $68\ \mathrm{kg \cdot m^2}$ of flywheel. And a four-cylinder car engine at $6000\ \mathrm{rev / min}$ throws $44.6\ \mathrm{kN}$ — four and a half tonnes — up and down the bodywork at $200\ \mathrm{Hz}$, with no unbalanced rotating mass anywhere in it.

All three facts come from the same two ideas: **that inertia has to be counted where it actually is rather than where the shaft is, and that a force which cannot be removed can often be made to point somewhere else.**
:::

## What you already know

- **Relative acceleration and the acceleration image** — from [[mechanisms/acceleration-analysis]], which is how you find the velocity and acceleration of every link's centre of mass as a function of crank angle. That ratio, not the absolute velocity, is what the whole of this lesson is built from.
- **Shaking force** — $F_{\mathrm{shake}} = - \sum m_i a_{Gi}$, derived in [[mechanisms/acceleration-analysis]] as the negative of the total mass-centre acceleration. Here it becomes the design objective rather than a by-product.
- **Work and energy for a rigid body** — $T = \frac{1}{2} J \omega^{2}$ and the principle of work and energy from [[dynamics/work-energy]], which is the only tool needed for a single-degree-of-freedom machine.
- **Torsional vibration and two-degree-of-freedom systems** — from [[vibrations/two-degrees-of-freedom]], because a flywheel and a motor armature are two inertias joined by a shaft, and the flywheel's moment of inertia is exactly the parameter that sets where their coupled natural frequency lands.
- **Contact and fatigue** — from [[materials-science/mechanical-properties]], because a flywheel is a rotating pressure vessel and its rim fails by hoop stress, and because a balancing quality grade is a statement about bearing load and therefore about fatigue life.

## Equivalent systems: one inertia, one torque {#sec-eqsys}

::: definition Equivalent inertia and equivalent torque {#def-eqsys}
A single-degree-of-freedom machine — a press, an engine, a sewing machine, a packaging table — has one coordinate $\theta$, and every velocity in it is proportional to $\dot\theta = \omega$. Write $v_{Gi} / \omega$ and $\omega_i / \omega$ for the velocity ratios of link $i$'s centre of mass and angular velocity. Then the machine is dynamically, at that instant, exactly equivalent to

$$
\boxed{ \; J_{\mathrm{eq}} ( \theta ) = \sum_i \left[ m_i \left( \frac{ v_{Gi} }{ \omega } \right)^{ 2 } + I_{Gi} \left( \frac{ \omega_i }{ \omega } \right)^{ 2 } \right] \; } \qquad \text{(about the input shaft)}
$$

$$
\boxed{ \; T_{\mathrm{eq}} ( \theta ) = \sum_i F_i \cdot \frac{ v_i }{ \omega } + \sum_i T_i \, \frac{ \omega_i }{ \omega } \; } \qquad \text{(on the input shaft, power-equivalent)}
$$

and the equation of motion is the **energy integral**, not $J \alpha = T$:

$$
\frac{ \mathrm{d} }{ \mathrm{d} \theta } \left[ \frac{ 1 }{ 2 } J_{\mathrm{eq}} ( \theta ) \, \omega^{ 2 } \right] = T_{\mathrm{drive}} ( \theta ) - T_{\mathrm{load}} ( \theta )
$$

**$J_{\mathrm{eq}}$ is a function of configuration, not a constant.** For a slider-crank it varies by a factor of nearly two over a revolution, and that variation is itself a torque.
:::

::: exercise Derivation: the $\tfrac{1}{2} \omega^{2} \, \mathrm{d} J_{ \mathrm{eq} } / \mathrm{d} \theta$ term {#deriv-dJ level=3}
::: solution
Differentiate the kinetic energy $K = \frac{1}{2} J_{\mathrm{eq}} ( \theta ) \omega^{2}$ with respect to time and set it equal to the instantaneous power:

$$
\frac{ \mathrm{d} K }{ \mathrm{d} t } = \frac{ 1 }{ 2 } J_{\mathrm{eq}} \, 2 \omega \dot\omega + \frac{ 1 }{ 2 } \omega^{ 2 } \frac{ \mathrm{d} J_{\mathrm{eq}} }{ \mathrm{d} \theta } \omega = T_{\mathrm{eq} }
$$

Divide by $\omega$ and write $\dot\theta$ for $\omega$:

$$
\boxed{ \; T_{\mathrm{eq}} = J_{\mathrm{eq}} \, \alpha + \frac{ 1 }{ 2 } \frac{ \mathrm{d} J_{\mathrm{eq}} }{ \mathrm{d} \theta } \omega^{ 2 } \; }
$$

**The second term is present even at constant speed.** It is the torque the drive must supply purely to accelerate the linkage's own mass distribution as it changes shape, and it is proportional to $\omega^{2}$ with no damping, no slip and no goodwill available to reduce it.

Two consequences that decide real designs:

1. **At constant speed the whole of $T_{\mathrm{eq}}$ is the $J$-gradient term**, and it is an oscillating torque at the crank frequency and its second harmonic. A motor rated on mean torque alone will run hot, because its copper loss goes as the *rms* current, and the rms of a $907\ \mathrm{N \cdot m}$ oscillation about a $32\ \mathrm{N \cdot m}$ mean is $908\ \mathrm{N \cdot m}$.
2. **The term grows as $\omega^{2}$ while the useful torque of most processes is roughly constant.** A linkage that is comfortable at $500\ \mathrm{rev / min}$ is not "a bit worse" at $3000$; it is a different machine, and the speed limit of a high-pressure reciprocating pump, a sewing machine or a printing press is set by this term and not by the strength of anything.
:::
:::

::: example Equivalent inertia of a slider-crank {#ex-ieq}
A slider-crank has crank $r = 100\ \mathrm{mm}$, rod $l = 400\ \mathrm{mm}$ ($\lambda = 0.25$), crank mass $2.0\ \mathrm{kg}$ with centre of mass $50\ \mathrm{mm}$ from the crankpin axis and $I_{G2} = 2.5 \times 10^{- 3}\ \mathrm{kg \cdot m^2}$, rod mass $4.0\ \mathrm{kg}$ modelled as uniform, and a $3.0\ \mathrm{kg}$ slide. Find $J_{\mathrm{eq}} ( \theta )$ about the crankshaft and the torque needed to turn it at a constant $3000\ \mathrm{rev / min}$.

**Answer.** $J_{\mathrm{eq}}$ swings between $20.83$ and $37.72\ \mathrm{g \cdot m^2}$ — a factor of $1.81$ — and the constant-speed torque has an amplitude of $907\ \mathrm{N \cdot m}$.

::: solution
With $\theta$ measured from top dead centre and $D = \sqrt{ 1 - \lambda^{ 2 } \sin^{ 2 } \theta }$, the velocity ratios are

$$
\frac{ v_{\mathrm{slide}} }{ r \omega } = \sin \theta + \frac{ \lambda^{ 2 } \sin \theta \cos \theta }{ D } \equiv u \ , \qquad \frac{ \omega_{\mathrm{rod}} }{ \omega } = \frac{ \lambda \cos \theta }{ D }
$$

and taking the rod's centre of mass at its midpoint, $\dfrac{ v_{G,\mathrm{rod}} }{ \omega } = \frac{r}{2} \sqrt{ ( u - \sin \theta )^{ 2 } + \cos^{ 2 } \theta }$. Collecting the four terms:

| $\theta$ | $0^{\circ}$ | $30^{\circ}$ | $60^{\circ}$ | $90^{\circ}$ | $180^{\circ}$ | $270^{\circ}$ |
|---|---|---|---|---|---|---|
| $J_{\mathrm{eq}}$, $\mathrm{g \cdot m^2}$ | 20.83 | 25.89 | 34.85 | 37.50 | 20.83 | 37.50 |

**The inertia is smallest at top and bottom dead centre and largest at mid-stroke**, which is exactly right: at the dead centres the slide is momentarily stationary and the rod is purely rotating about the crankpin, while at mid-stroke the slide is at full speed and the rod's centre of mass is moving fastest.

::: widget plot
title: Equivalent inertia of a slider-crank against crank angle
f: 1000*(0.0075+0.01*((sin(x*pi/180)+0.0625*sin(x*pi/180)*cos(x*pi/180)/sqrt(1-0.0625*pow(sin(x*pi/180),2)))-(sin(x*pi/180)))*((sin(x*pi/180)+0.0625*sin(x*pi/180)*cos(x*pi/180)/sqrt(1-0.0625*pow(sin(x*pi/180),2)))-(sin(x*pi/180)))+0.01*(cos(x*pi/180))*(cos(x*pi/180))+0.003333333*(cos(x*pi/180))*(cos(x*pi/180))/(1-0.0625*(sin(x*pi/180))*(sin(x*pi/180)))+0.03*(sin(x*pi/180)+0.0625*sin(x*pi/180)*cos(x*pi/180)/sqrt(1-0.0625*pow(sin(x*pi/180),2)))*(sin(x*pi/180)+0.0625*sin(x*pi/180)*cos(x*pi/180)/sqrt(1-0.0625*pow(sin(x*pi/180),2))))
x: 0, 360
y: 18, 40
caption: $J_{\mathrm{eq}} ( \theta )$ for the mechanism above, in $\mathrm{g \cdot m^2}$, where $S = \\sin \\theta$, $C = \\cos \\theta$, $D = \\sqrt{ 1 - \\lambda^2 S^2 }$ and $U = S + \\lambda^2 S C / D$. **The curve is not a sinusoid — it has a flat-topped double-hump shape, because the slide's contribution goes as $u^2$ and $u$ itself is skewed by the rod-length term.** The $1.81$ peak-to-trough ratio is typical: **a slider-crank presents a drive with an inertia that nearly doubles and halves twice per revolution, and no flywheel can fix that, because a flywheel adds a constant and this is a variation.**
:::

**The constant-speed torque.** At $\omega = 314.16\ \mathrm{rad / s}$ the $\frac{1}{2} ( \mathrm{d} J_{\mathrm{eq}} / \mathrm{d} \theta ) \omega^{ 2 }$ term peaks at

$$
T = \frac{ 1 }{ 2 } \times 18.4 \times 10^{- 3 } \times 314.16^{ 2 } = 907\ \mathrm{N \cdot m}
$$

against a mean torque of $31.8\ \mathrm{N \cdot m}$ if the machine is doing $10\ \mathrm{kW}$ of useful work. **The drive sees a torque swinging between $- 875$ and $+ 939\ \mathrm{N \cdot m}$ to deliver a steady $32$.** That is why high-speed presses use opposed slides $180^{\circ}$ out of phase — the two $J_{\mathrm{eq}}$ gradients then cancel almost exactly — and why a servo-driven press axis is selected on rms torque and peak torque rather than on power.
:::
:::

::: exercise Equivalent inertia at a gear ratio {#ex-geareq level=2 check="3.0"}
The mechanism above drives a load through a $1 : 1$ shaft, but a designer proposes putting the flywheel on a shaft geared up $10 : 1$ from the crank (so the flywheel turns ten times faster). If the flywheel has $J = 0.03\ \mathrm{kg \cdot m^2}$ about its own axis, what does it contribute to $J_{\mathrm{eq}}$ at the crankshaft, and by what factor does it reduce the $\pm 8.4\ \mathrm{g \cdot m^2}$ swing of $J_{\mathrm{eq}}$?

::: solution
Inertia reflects through a gear train as the **square** of the ratio:

$$
J_{\mathrm{eq, \, flywheel}} = J \times \left( \frac{ \omega_f }{ \omega_c } \right)^{ 2 } = 0.03 \times 100 = \boxed{ 3.0\ \mathrm{kg \cdot m^2} }
$$

and the swing of $J_{\mathrm{eq}}$ is unchanged in absolute terms — it is still $16.9\ \mathrm{g \cdot m^2}$ — but as a *fraction* it collapses from $1.81 : 1$ peak-to-trough to

$$
\frac{ 3000 + 37.7 }{ 3000 + 20.8 } = 1.0056 \ , \qquad \text{i.e. a } 0.56 \ \% \text{ variation instead of } 81 \ \%
$$

**which is the entire case for putting the flywheel on the high-speed shaft, and it is why every flywheel in every machine is on the fastest shaft available.** The same $0.03\ \mathrm{kg \cdot m^2}$ mounted directly on the crank would have contributed $0.03\ \mathrm{kg \cdot m^2}$ and changed nothing. **The lever rule for inertia is that a small mass spinning fast is worth its speed-ratio squared, and speed ratios are cheap while mass is not.** The penalty, taken up in [[#def-turning]], is that the rim stress goes as $v^{2}$ and the bearing load as $m r \omega^{2}$, so the high-speed shaft is also the shaft where the flywheel is most likely to fail.
:::
:::

## The turning-moment diagram

::: definition Turning-moment diagram and coefficient of speed fluctuation {#def-turning}
Plot the driving torque $T ( \theta )$ against crank angle over one cycle of the machine, together with the mean torque $T_m$ that would deliver the same work. The **turning-moment diagram** is that plot; the **fluctuation of energy** is the running integral of the difference,

$$
\Delta E ( \theta ) = \int_{ \theta_0 }^{ \theta } \left[ T ( \phi ) - T_m \right] \mathrm{d} \phi
$$

and $\Delta U = \Delta E_{ \max } - \Delta E_{ \min }$ is the **maximum fluctuation of energy** — the largest quantity of energy the machine must absorb and give back within a cycle. The **coefficient of speed fluctuation** is

$$
C_s = \frac{ \omega_{ \max } - \omega_{ \min } }{ \omega_{\mathrm{mean}} } \ , \qquad \omega_{\mathrm{mean}} = \frac{ \omega_{ \max } + \omega_{ \min } }{ 2 }
$$

Typical allowances, which are specifications rather than calculations and come from what the machine is for:

| Machine | $C_s$ | Why |
|---|---|---|
| Instrument clock, electrical generator set | $0.0005$–$0.005$ | Frequency regulation; $50\ \mathrm{Hz}$ means the shaft must not move |
| Machine tool, centrifuge, printing press | $0.005$–$0.02$ | Surface finish and registration |
| Car engine | $0.02$–$0.05$ | Nobody feels a $3\ \%$ torque ripple at $2000\ \mathrm{rev / min}$ |
| Riveting machine, punch press, shear | $0.10$–$0.20$ | The work is one blow; nothing cares what happens between blows |
| Crusher, hammer | $0.15$–$0.30$ | As above, and the flywheel is part of the tool |
:::

::: exercise Derivation: $I_f = \Delta U / ( \omega^{2} C_s )$ {#deriv-fly level=3}
::: solution
Between $\omega_{ \min }$ and $\omega_{ \max }$ the machine's kinetic energy changes by exactly the maximum fluctuation, and if the flywheel dominates the total inertia (which is the assumption, and the one to check afterwards):

$$
\Delta U = \frac{ 1 }{ 2 } I_f \left( \omega_{ \max }^{ 2 } - \omega_{ \min }^{ 2 } \right) = \frac{ 1 }{ 2 } I_f \left( \omega_{ \max } + \omega_{ \min } \right) \left( \omega_{ \max } - \omega_{ \min } \right) = \frac{ 1 }{ 2 } I_f \times 2 \omega_{\mathrm{mean}} \times C_s \omega_{\mathrm{mean}}
$$

$$
\boxed{ \; I_f = \frac{ \Delta U }{ \omega_{\mathrm{mean}}^{ 2 } \, C_s } \; } \qquad \text{and equivalently} \qquad \Delta U = I_f \omega_{\mathrm{mean}}^{ 2 } C_s = 2 K \, C_s
$$

**The last form, $\Delta U = 2 K C_s$ where $K$ is the stored kinetic energy, is the one to think with: the fractional speed change is half the fractional energy change.** To absorb $10\ \%$ of a cycle's energy at $C_s = 0.05$, the flywheel must be storing $200\ \%$ of it — which is why a flywheel that is big enough to smooth a punch press is also big enough to be the heaviest part of the machine, and why the only real way to make flywheels small is to raise $\omega$, since $I_f \propto 1 / \omega^{ 2 }$ at fixed $C_s$.

**Two cautions.** First, $I_f$ is the *additional* inertia referred to the shaft where $\omega$ is measured; if the machine's own moving parts already contribute a significant $J_{\mathrm{eq}}$, subtract it — and remember from [[#ex-ieq]] that $J_{\mathrm{eq}}$ is not constant. Second, the formula assumes the flywheel's inertia is a constant, so **a flywheel on the crank of a slider-crank is fighting a $\Delta J_{\mathrm{eq}}$ of the same order as itself**; on a geared-up shaft it is not, which is the practical content of [[#ex-geareq]].
:::
:::

::: example Flywheel for a single-cylinder generator set {#ex-1cyl}
A single-cylinder four-stroke engine, $500\ \mathrm{cm^3}$, b.m.e.p. $8\ \mathrm{bar}$, runs a generator at $3000\ \mathrm{rev / min}$. Model the expansion stroke as a half-sine of duration $180^{\circ}$ crank and neglect the pumping and compression loops. Find the required flywheel inertia for $C_s = 0.005$.

**Answer.** $\Delta U = 413\ \mathrm{J}$, $I_f = 0.84\ \mathrm{kg \cdot m^2}$ — about $21\ \mathrm{kg}$ of cast-iron rim at $400\ \mathrm{mm}$ mean diameter.

::: solution
Work per cycle $=$ b.m.e.p. $\times$ displacement $= 8 \times 10^{ 5 } \times 5 \times 10^{- 4 } = 400\ \mathrm{J}$, delivered once every $720^{\circ} = 4 \pi$ radians of crank, so

$$
T_m = \frac{ 400 }{ 4 \pi } = 31.83\ \mathrm{N \cdot m} \ , \qquad P = T_m \omega = 31.83 \times 314.16 = 10.0\ \mathrm{kW}
$$

A half-sine of duration $\pi$ and area $400$ has peak $T_p = 2 \times 400 / \pi = 254.6\ \mathrm{N \cdot m}$. It crosses the mean line where $254.6 \sin \theta = 31.83$, i.e. at $\theta = 7.18^{\circ}$ and $172.82^{\circ}$, and the energy above the mean line between those crossings is

$$
\Delta U = \int_{ 0.1253 }^{ 3.0163 } \! \left( 254.6 \sin \theta - 31.83 \right) \mathrm{d} \theta = \left[ - 254.6 \cos \theta - 31.83 \theta \right] = 413.3\ \mathrm{J}
$$

$$
I_f = \frac{ 413.3 }{ 314.16^{ 2 } \times 0.005 } = \frac{ 413.3 }{ 493.5 } = 0.837\ \mathrm{kg \cdot m^2}
$$

A thin rim of mean radius $0.20\ \mathrm{m}$ has $I = m r^{ 2 }$, so $m = 0.837 / 0.04 = 20.9\ \mathrm{kg}$. Rim speed $v = \omega r = 62.8\ \mathrm{m / s}$ and hoop stress $\sigma = \rho v^{ 2 } = 7200 \times 62.8^{ 2 } = 28.4\ \mathrm{MPa}$ — comfortable for flaky graphite cast iron, which is why flywheels are still cast.

::: widget plot
title: Turning-moment diagram and cumulative energy fluctuation
f: 254.6*sin(x*pi/180); 31.83
x: 0, 180
y: 0, 270
caption: The expansion-stroke torque (half-sine, peak $254.6\ \mathrm{N \cdot m}$) against the mean torque line at $31.83\ \mathrm{N \cdot m}$. **The peak-to-mean ratio is eight to one, and the engine spends $86 \ \%$ of the cycle below the mean line.** For a four-cylinder the same diagram has four humps a cycle and a peak-to-mean ratio nearer $1.6 : 1$, which is the whole reason multi-cylinder engines need small flywheels and single-cylinder ones do not.
:::

::: widget plot
title: Energy stored above and below the mean line, against crank angle
f: 254.6-254.6*cos(x*pi/180)-31.83*x*pi/180
x: 0, 180
y: -10, 430
caption: $\Delta E ( \theta ) = \int_0^ \theta ( T - T_m ) \, d \theta$ for the same stroke. **The flywheel's job is set by the vertical extent of this curve, not by the peak torque** — $\Delta U = 413\ \mathrm{J}$ is the distance from the dip at $7.2^{\circ}$ to the crest at $172.8^{\circ}$. Note that the curve is nearly zero at both ends: the engine gives back everything it took. **A designer who sizes a flywheel from the peak torque gets an answer proportional to $254.6$ instead of one proportional to $413$, and the two differ by a factor of more than three in this machine.**
:::

**What the neglected loops would do.** The compression stroke costs energy before the combustion stroke returns it, and the gas torque is not a half-sine but a sharp $180\ \mathrm{bar}$ spike followed by a long low tail. A realistic indicator diagram raises $\Delta U$ for this engine to roughly $600\ \mathrm{J}$ and moves the crest from $173^{\circ}$ to about $30^{\circ}$ after top dead centre. **The method does not change; only the accuracy does — and the accuracy is enough, because $C_s$ is itself a rounded specification.**
:::
:::

::: example Punch press: the flywheel is the machine {#ex-punch}
A punch exerts $300\ \mathrm{kN}$ over a $20\ \mathrm{mm}$ stroke. The crank runs at $200\ \mathrm{rev / min}$, one punch per revolution, and the punching occupies $0.06\ \mathrm{s}$ — $72^{\circ}$ of crank. Allow $C_s = 0.15$. Size the flywheel and the motor.

**Answer.** $I_f = 68\ \mathrm{kg \cdot m^2}$, a $274\ \mathrm{kg}$ rim at $1.0\ \mathrm{m}$ diameter, and a $25\ \mathrm{kW}$ motor where $100\ \mathrm{kW}$ would otherwise be needed.

::: solution
Work per punch $= 300 \times 10^{ 3 } \times 0.020 = 6000\ \mathrm{J}$, delivered in $0.06\ \mathrm{s}$ out of a $0.30\ \mathrm{s}$ cycle. **Peak power if the motor had to supply it directly: $6000 / 0.06 = 100\ \mathrm{kW}$.** Mean power: $6000 / 0.30 = 20\ \mathrm{kW}$.

Choose a $25\ \mathrm{kW}$ motor, which at $\omega = 20.94\ \mathrm{rad / s}$ gives a constant driving torque of $1194\ \mathrm{N \cdot m}$. During the punch the load torque is $6000 / 1.2566 = 4775\ \mathrm{N \cdot m}$, so the flywheel must supply

$$
\Delta U = ( 4775 - 1194 ) \times 1.2566 = 4500\ \mathrm{J}
$$

$$
I_f = \frac{ 4500 }{ 20.94^{ 2 } \times 0.15 } = \frac{ 4500 }{ 65.8 } = 68.4\ \mathrm{kg \cdot m^2}
$$

A thin rim of mean diameter $1.0\ \mathrm{m}$ needs $m = 68.4 / 0.5^{ 2 } = 274\ \mathrm{kg}$. Rim speed is only $10.5\ \mathrm{m / s}$, so the hoop stress is $0.79\ \mathrm{MPa}$ — **the flywheel is nowhere near its stress limit, which means it is a cheap, heavy, cast, slow machine, and that is exactly what a press flywheel should be.**

::: widget plot
title: Speed fluctuation against flywheel inertia, punch press
f: 4500/(438.4*x)
x: 10, 200
y: 0, 0.12
caption: $C_s = \Delta U / ( \omega^{ 2 } I_f )$ for $\Delta U = 4500\ \mathrm{J}$ at $200\ \mathrm{rev / min}$. **The curve is a rectangular hyperbola: halving the fluctuation doubles the mass.** At $68\ \mathrm{kg \cdot m^2}$ the design sits at $C_s = 0.15$; tightening to $C_s = 0.05$ would need $205\ \mathrm{kg \cdot m^2}$ and a $820\ \mathrm{kg}$ rim, and the only cheaper way to buy the same $C_s$ is to raise the speed, since $I_f \propto 1 / \omega^{ 2 }$. **This is why high-speed presses run their cranks at $600$–$1000\ \mathrm{rev / min}$ and their flywheels on a countershaft geared up again: the mass you save goes as the square of the speed you are willing to buy.**
:::
:::
:::

::: warning What a flywheel cannot do {#warn-flywheel}
A flywheel is an energy buffer with a fixed gain, and four things follow that are routinely assumed otherwise.

1. **It does not reduce the peak torque.** The punch still sees $4775\ \mathrm{N \cdot m}$ at the crank and $300\ \mathrm{kN}$ at the ram. The crankshaft, the gears, the frame and the bearings are all sized by that, and no quantity of flywheel changes them. **A flywheel reduces the peak *power* drawn from the supply, never the peak *force* in the machine.**
2. **It does not regulate speed; it limits the rate of speed change.** With the drive tripped, a flywheel-loaded press coasts. In an over-speed event it makes things worse, and this is why a press clutch and brake must be specified to stop the slide with the flywheel still at full speed — a much larger brake than the one that stops the motor.
3. **It cannot smooth what it does not store.** $C_s$ is set by $\Delta U$ against the *total* stored energy $K = \frac{1}{2} I \omega^{ 2 }$. A flywheel that is large in $\mathrm{kg \cdot m^2}$ but small in $K$ — because it turns slowly — does nothing, and the commonest sizing error in machine design is quoting $I$ without asking what $\omega$ it is at.
4. **It is a rotating pressure vessel and it will one day be tested.** A cast flywheel running at $v = 100\ \mathrm{m / s}$ stores $5\ \mathrm{kJ}$ per kilogram of rim; a $274\ \mathrm{kg}$ rim at $10.5\ \mathrm{m / s}$ stores $15\ \mathrm{kJ}$, which is a small hand grenade, and a flywheel that fails does so by throwing its own weight at the operator at the rim speed. **Every flywheel drawing carries a proof-spin requirement, and the number on it is not negotiable.**
:::

::: exercise Speed fluctuation of the generator set {level=1 check="0.005"}
The single-cylinder set of [[#ex-1cyl]] has $\Delta U = 413\ \mathrm{J}$ at $3000\ \mathrm{rev / min}$ and a flywheel of $I_f = 0.837\ \mathrm{kg \cdot m^2}$. What is $C_s$, and how many rev / min is that?

::: solution
$$
C_s = \frac{ \Delta U }{ I_f \omega^{ 2 } } = \frac{ 413.3 }{ 0.837 \times 314.16^{ 2 } } = \frac{ 413.3 }{ 82{,}580 } = \boxed{ 0.005 } \quad \Rightarrow \quad 0.005 \times 3000 = 15\ \mathrm{rev / min}
$$

**Fifteen revolutions per minute of ripple on a $3000\ \mathrm{rev / min}$ shaft, at twice mains frequency.** For a generator on a $50\ \mathrm{Hz}$ system the relevant limit is that the frequency must stay within $\pm 0.5\ \%$ in steady state, and $C_s = 0.005$ is exactly that — **which is the reason single-cylinder generating sets are heavy, and the reason a $10\ \mathrm{kW}$ set has a flywheel you could not lift on your own and a $10\ \mathrm{kW}$ electric motor does not have one at all.**
:::
:::

::: exercise Doubling the speed {#ex-doubling level=2 check="0.005"}
A machine tool's flywheel gives $C_s = 0.02$ at $1500\ \mathrm{rev / min}$. The plant engineer doubles the spindle speed to $3000\ \mathrm{rev / min}$ with the same flywheel and the same $\Delta U$ per cycle. What is the new $C_s$?

::: solution
$I_f \omega^{ 2 } C_s = \Delta U$ with $I_f$ and $\Delta U$ unchanged gives $C_s \propto 1 / \omega^{ 2 }$:

$$
C_s = 0.02 \times \left( \frac{ 1500 }{ 3000 } \right)^{ 2 } = \boxed{ 0.005 }
$$

**a fourfold improvement for the cost of the extra drive power — and this is the single most powerful lever in flywheel design, which is why the answer to "the machine shakes too much" is so often "run it faster" before it is ever "make the flywheel bigger."** The catch, and it is a real one, is that $\Delta U$ is not always unchanged: if the process is kinematic rather than energetic — a cam-driven indexer, a reciprocating pump with a fixed displacement per stroke — then doubling the speed doubles the *rate* but leaves the energy per cycle alone, and the formula holds. If instead the process torque is a fixed function of speed, as in a fan or a pump against a fixed system curve, $\Delta U$ rises with $\omega$ and the gain is only $\omega^{-1}$ or worse. **Check which one you have before you celebrate.**
:::
:::

## Balancing I: rotors, and why two planes are the minimum

::: definition Static and dynamic balance {#def-balance}
Attach to each disc $i$ of a rotor an **unbalance vector** $U_i = m_i r_i$, a plane polar vector of magnitude (mass $\times$ radius) at the angular position of the mass centre, and let $z_i$ be its axial position. Then

$$
\textbf{static balance:} \quad \boxed{ \; \sum_i U_i = 0 \; } \qquad \text{(no resultant centrifugal force)}
$$

$$
\textbf{dynamic balance:} \quad \boxed{ \; \sum_i U_i = 0 \quad \text{and} \quad \sum_i z_i U_i = 0 \; } \qquad \text{(no resultant force and no resultant couple)}
$$

Both are **vector** equations, so each is two scalar conditions, and dynamic balance is four conditions in all. **A long thin rotor that is statically balanced is not dynamically balanced: two equal masses in the same plane cancel, but the same two masses in different planes form a couple that reverses twice per revolution and is felt at the bearings as a moment, not a force.** That is why a balancing machine has two pickup transducers and not one, and why the correction is always made in two planes.
:::

::: exercise Derivation: the two-plane correction {#deriv-2plane level=3}
::: solution
Add correction unbalances $C_a$ and $C_b$ in planes $a$ and $b$. The two conditions become

$$
C_a + C_b = - \sum_i U_i \equiv - S \ , \qquad a \, C_a + b \, C_b = - \sum_i z_i U_i \equiv - M
$$

Two vector equations in two unknown vectors: four scalar equations in four unknowns, so the solution is unique and is

$$
\boxed{ \; C_b = \frac{ - M + a S }{ b - a } \ , \qquad C_a = - S - C_b \; }
$$

**Read the denominator.** The required correction is inversely proportional to the **separation of the correction planes**, and to nothing else about them. Move them closer together and the corrections blow up in direct proportion, while the residual unbalance after correction is exactly zero either way — **the machine will happily report a perfect balance achieved by a grotesque amount of correction, and the only thing that tells you the correction was unreasonable is the mass of it.**

The second thing to read is that $C_a$ and $C_b$ are complex: they have phases, and the phases are usually nowhere near the phases of the original unbalances. **A technician who corrects the magnitude at the right plane but at a phase $30^{\circ}$ out has made the rotor worse than before, and this is why trial-weight balancing on a machine that is not properly calibrated is worse than leaving it alone.**
:::
:::

::: example Two-plane correction of a two-disc rotor {#ex-2plane}
A rotor carries $U_1 = 0.100\ \mathrm{kg \cdot m}$ at $0^{\circ}$ in plane $z = 0$ and $U_2 = 0.080\ \mathrm{kg \cdot m}$ at $90^{\circ}$ in plane $z = 0.5\ \mathrm{m}$. Find the correction masses at radius $150\ \mathrm{mm}$ in planes (a) $z = 0.1$ and $0.4\ \mathrm{m}$, and (b) $z = 0.2$ and $0.3\ \mathrm{m}$.

**Answer.** (a) $0.906\ \mathrm{kg}$ at $168.7^{\circ}$ and $0.745\ \mathrm{kg}$ at $- 72.6^{\circ}$. (b) $2.267\ \mathrm{kg}$ and $2.083\ \mathrm{kg}$ — **three times as much, for exactly the same residual balance.**

::: solution
Work in complex numbers. $S = U_1 + U_2 = 0.100 + \mathrm{j} 0.080$, and taking moments about $z = 0$, $M = 0 \times U_1 + 0.5 \times U_2 = \mathrm{j} 0.040$.

**(a) Planes at $a = 0.1$, $b = 0.4$:**

$$
C_b = \frac{ - \mathrm{j} 0.040 + 0.1 ( 0.100 + \mathrm{j} 0.080 ) }{ 0.3 } = \frac{ 0.0100 - \mathrm{j} 0.0320 }{ 0.3 } = 0.03333 - \mathrm{j} 0.10667
$$

$$
\left| C_b \right| = 0.1118\ \mathrm{kg \cdot m} \ \text{at} \ - 72.6^{ \circ } \ , \qquad
C_a = - S - C_b = - 0.1333 + \mathrm{j} 0.0267 \ \Rightarrow \ \left| C_a \right| = 0.1360 \ \text{at} \ 168.7^{ \circ }
$$

Dividing by $r = 0.15\ \mathrm{m}$: **$m_a = 0.906\ \mathrm{kg}$, $m_b = 0.745\ \mathrm{kg}$.**

**(b) Planes at $a = 0.2$, $b = 0.3$:** the denominator halves, and

$$
C_b = \frac{ 0.0200 - \mathrm{j} 0.0240 }{ 0.1 } = 0.200 - \mathrm{j} 0.240 \ \Rightarrow \ \left| C_b \right| = 0.3124 \ , \qquad \left| C_a \right| = 0.3400
$$

**$m_a = 2.267\ \mathrm{kg}$, $m_b = 2.083\ \mathrm{kg}$ — a factor of $3.0$ more mass for the same residual unbalance of zero.**

**(c) For comparison, planes at $a = 0$ and $b = 0.6$, i.e. outside the mass planes:** $C_a = 0.1009$ at $- 172.4^{ \circ }$, $C_b = 0.0667$ at $- 90^{ \circ }$, giving $0.673$ and $0.444\ \mathrm{kg}$. **The best arrangement of the three, and $3.9$ times better than the worst.**

::: warning Where the correction planes are is a design decision, not a balancing decision
The rule follows from the $1 / ( b - a )$ in [[#deriv-2plane]] and is worth memorising because it is made once, on the drawing, and paid for at every balancing machine for the life of the product:

- **Put the correction planes as far apart as the bearing span allows**, and if the design permits, outside the planes of the masses being corrected.
- **Never let the correction planes fall between the mass planes if you can avoid it** — that is the geometry that makes $b - a$ small and the corrections enormous.
- **Design the rotor to be correctable.** Two machined bosses at the extreme ends, at a large radius, with the balancing procedure and the maximum drill depth printed on the drawing, cost nothing and are the difference between a $0.4\ \mathrm{kg}$ correction and a $4\ \mathrm{kg}$ one.
- **Prefer removing material to adding it.** A $0.9\ \mathrm{kg}$ balance weight is a $0.9\ \mathrm{kg}$ centrifugal load at the operating speed — $0.9 \times 0.15 \times \omega^{ 2 }$, which at $3000\ \mathrm{rev / min}$ is $8000\ \mathrm{N}$ — and it is also a weight that can come loose. Drilling a lightening hole is permanent, needs no adhesive, and cannot migrate.
:::
:::
:::

::: definition Balance quality grade, ISO 1940-1 {#def-ggrade}
The standard does not specify a force; it specifies a **specific unbalance**, the permissible residual $e_{\mathrm{per}} = U_{\mathrm{per}} / m$ in micrometres of eccentricity, and tabulates it against the service speed as a **grade** $G$:

$$
\boxed{ \; e_{\mathrm{per}} \left[ \mu \mathrm{m} \right] = \frac{ 1000 \, G }{ \omega } = \frac{ 9549 \, G }{ n \left[ \mathrm{rev / min} \right] } \; } \qquad U_{\mathrm{per}} = m \, e_{\mathrm{per}}
$$

**The grade number is a velocity.** $e_{\mathrm{per}} \omega = G\ \mathrm{mm / s}$ is the speed at which the rotor's mass centre travels round its orbit of radius $e_{\mathrm{per}}$ — so $G 2.5$ and $G 63$ differ by a factor of twenty-five in the speed of the wobble, not in the amount of metal.

| Grade $G$ | Typical rotor | $e_{\mathrm{per}}$ at $3000\ \mathrm{rev / min}$ |
|---|---|---|
| $G \ 0.4$ | Gravimeters, precision gyro rotors | $1.3\ \mu \mathrm{m}$ |
| $G \ 1$ | Grinding-machine spindles, armatures $< 1\ \mathrm{kg}$ | $3.2\ \mu \mathrm{m}$ |
| $G \ 2.5$ | Car crankshaft assemblies, machine-tool drives | $7.96\ \mu \mathrm{m}$ |
| $G \ 6.3$ | Assembled engines and compressors, turbine rotors, large motor armatures | $20.1\ \mu \mathrm{m}$ |
| $G \ 16$ | Car wheels with tyres, agricultural machinery | $51\ \mu \mathrm{m}$ |
| $G \ 40$ | Single- and two-cylinder engines, line shafts | $127\ \mu \mathrm{m}$ |
| $G \ 630$ | Locomotive driving wheels, heavy crankshafts | $2005\ \mu \mathrm{m}$ |
:::

::: example What a grade costs in metal {#ex-grade}
A $15\ \mathrm{kg}$ machine armature is balanced to $G \ 6.3$ for $3000\ \mathrm{rev / min}$ service. What residual unbalance is allowed, and what force does it produce at the bearings?

**Answer.** $U_{\mathrm{per}} = 301\ \mathrm{g \cdot mm}$, and $118\ \mathrm{N}$ of alternating bearing force.

::: solution
$$
e_{\mathrm{per}} = \frac{ 9549 \times 6.3 }{ 3000 } = 20.1\ \mu \mathrm{m} \ , \qquad
U_{\mathrm{per}} = 15 \times 20.1 \times 10^{- 6 } = 3.01 \times 10^{- 4 }\ \mathrm{kg \cdot m} = 301\ \mathrm{g \cdot mm}
$$

The alternating force on the supports at $\omega = 314.16\ \mathrm{rad / s}$ is

$$
F = U_{\mathrm{per}} \, \omega^{ 2 } = 3.01 \times 10^{- 4 } \times 98{,}696 = 29.7\ \mathrm{N} \ \text{(per plane pair; } 118\ \mathrm{N} \text{ if the whole allowance sits at one end)}
$$

**and $301\ \mathrm{g \cdot mm}$ is a startlingly small number: it is $30\ \mathrm{g}$ of solder at $10\ \mathrm{mm}$ radius, or one M6 steel socket-head cap screw at $15\ \mathrm{mm}$.** That is the whole difficulty of balancing. The tolerance is smaller than the fasteners that hold the rotor together, which is why the standard insists that the rotor be balanced **in the configuration it will run in** — with its key, its retaining ring, its cooling fan and its varnish — and why a rotor balanced before assembly is not balanced.

**Note also what the grade does not say.** It says nothing about the *resonance*. A rotor perfectly balanced at $3000\ \mathrm{rev / min}$ on a machine whose first critical is at $2800\ \mathrm{rev / min}$ will still shake, because the specification controls the force and the support's dynamic stiffness controls the response. **Balancing quality and vibration level are related but not the same thing, and a customer complaint about vibration is very often a support-stiffness problem that a balancing machine cannot touch.**
:::
:::

::: exercise Correction-plane spacing {level=2 check="3.0"}
For the rotor of [[#ex-2plane]], compute the total correction mass at $r = 150\ \mathrm{mm}$ for correction planes at $z = 0.2$ and $0.3\ \mathrm{m}$, and divide by the total for planes at $z = 0.1$ and $0.4\ \mathrm{m}$.

::: solution
From [[#ex-2plane]] the two cases give $2.267 + 2.083 = 4.350\ \mathrm{kg}$ and $0.906 + 0.745 = 1.651\ \mathrm{kg}$, so the ratio is

$$
\frac{ 4.350 }{ 1.651 } = \boxed{ 3.0 }
$$

**which is exactly the ratio of the plane separations, $0.30 / 0.10 = 3.0$ — not approximately, exactly, because the correction scales as $1 / ( b - a )$ and nothing else.** Both rotors leave the machine perfectly balanced. The first has $2.7\ \mathrm{kg}$ of extra metal spinning at $150\ \mathrm{mm}$ radius, adding $2.7 \times 0.15 \times \omega^{ 2 }$ to the bearing loads and lowering every natural frequency in the machine. **This is why "the balancing machine said it was fine" is not an engineering argument, and why the correction-plane positions belong on the manufacturing drawing where the shop cannot move them.**
:::
:::

## Balancing II: reciprocating masses, and the two-order problem

::: definition Primary and secondary inertia force {#def-primary}
A slider of reciprocating mass $m_R$ driven by a crank of radius $r$ and rod $l$ (write $n = l / r$) accelerates as

$$
a = r \omega^{ 2 } \left( \cos \theta + \frac{ \cos 2 \theta }{ n } + \cdots \right)
$$

so the inertia force the frame must react is the sum of two harmonics:

$$
\boxed{ \; F = \underbrace{ m_R r \omega^{ 2 } \cos \theta }_{ \textbf{primary} \; \equiv P } + \underbrace{ \frac{ m_R r \omega^{ 2 } }{ n } \cos 2 \theta }_{ \textbf{secondary} \; = P / n } \; }
$$

**The primary is what the reciprocating mass would experience if the rod were infinitely long; it is exactly the component, along the line of stroke, of the centrifugal force of the reciprocating mass imagined concentrated at the crankpin.** That single sentence is the whole theory of reciprocating balancing, and every result below follows from it.

**The secondary exists only because the rod is finite**, is smaller by the rod ratio $n$, and runs at **twice** crank speed. A short rod ($n = 3$) has a secondary a third of its primary; a long rod ($n = 6$) has a sixth. **This is why high-speed engines use long rods and short throws: not for the gas load, but because the secondary is what is left over after everything else has been balanced.**
:::

::: example A single cylinder, and what partial balancing means {#ex-single}
$m_R = 2.4\ \mathrm{kg}$, $r = 45\ \mathrm{mm}$, $l = 180\ \mathrm{mm}$ ($n = 4$), $3000\ \mathrm{rev / min}$, crankpin rotating mass $1.6\ \mathrm{kg}$. Find the unbalanced forces, and find the balance fraction that minimises the worst of them.

**Answer.** Primary $10.66\ \mathrm{kN}$, secondary $2.67\ \mathrm{kN}$, rotating $7.11\ \mathrm{kN}$; and the optimum balance fraction is $c = 0.5$, leaving a rotating residual of $5.33\ \mathrm{kN}$.

::: solution
$$
P = m_R r \omega^{ 2 } = 2.4 \times 0.045 \times 314.16^{ 2 } = 10{,}660\ \mathrm{N} \ , \qquad S = \frac{ P }{ n } = 2665\ \mathrm{N}
$$
$$
F_{\mathrm{rot}} = m_C r \omega^{ 2 } = 1.6 \times 0.045 \times 98{,}696 = 7106\ \mathrm{N}
$$

The rotating force is easy: put $m_{\mathrm{cw}} = m_C r / r_{\mathrm{cw}}$ in the crankweb opposite the pin and it is gone. **The reciprocating force cannot be cancelled by any rotating mass, because it oscillates along a line rather than rotating.** What a rotating counterweight of fraction $c$ does is this: it adds a rotating vector of magnitude $c P$, whose component along the stroke is $c P \cos \theta$ — cancelling $c$ of the primary — and whose component across the stroke is $c P \sin \theta$, which was not there before:

$$
F_{ \parallel } = ( 1 - c ) P \cos \theta \ , \qquad F_{ \perp } = c P \sin \theta
$$

**You have traded along-stroke shake for across-stroke shake, and the total never goes below $0.5 P$.** The magnitude of the resultant is $\sqrt{ ( 1 - c ) ^{ 2 } P^{ 2 } \cos^{ 2 } \theta + c^{ 2 } P^{ 2 } \sin^{ 2 } \theta }$, which swings between $c P$ and $ ( 1 - c ) P $; the worst case is minimised at $c = 0.5$, where the resultant becomes a **rotating** force of constant magnitude $P / 2 = 5330\ \mathrm{N}$.

**That is the locomotive solution, and it is a compromise forced by a bearing constraint, not by dynamics.** A locomotive cannot use two-plane balancing — the driving wheels are on rails, and the only place to put metal is in the crankwebs — so it accepts $c \approx 0.5$–$0.75$ and pays for it in **hammer blow**, the vertical component $c P \sin \theta$ that alternately loads and unloads the wheel against the rail. At $c = 0.6$ and $3000\ \mathrm{rev / min}$ that is $6396\ \mathrm{N}$ of cyclic vertical force; scale it to a locomotive's $8000\ \mathrm{kg}$ per coupled wheel and it is why the speed limit on 19th-century track was set by the suspension of the locomotive rather than by the curvature of the line, and why the inside cylinders of a steam locomotive were balanced with counterweights whose size was a matter of published controversy for fifty years.

**A road vehicle escapes all of this**, because its engine is mounted in a cradle that can be balanced in two planes and its wheels are not the bearing. It balances the primary fully ($c = 1$) and puts the resulting rotating force into two equal and opposite halves carried by two balance shafts — see [[#ex-ic4]]. **The Lanchester balancer does the same with rotating masses only: two counter-rotating weights, each of magnitude $P / 2$, phased so that their resultant lies along the line of stroke and equals $P$ against the primary. Their horizontal components cancel exactly, so no side force is created, and the primary disappears.** It was fitted to 1920s twin-cycle motorcycles and is fitted to some of them still.
:::
:::

::: theorem Which orders survive in an inline engine {#thm-inline}
For an inline engine with cranks at angles $\theta_i$ and cylinder centres at $z_i$, the four conditions are

$$
\sum_i \cos \theta_i = \sum_i \sin \theta_i = 0 \quad \text{(primary force)} \qquad \sum_i z_i \cos \theta_i = \sum_i z_i \sin \theta_i = 0 \quad \text{(primary couple)}
$$

and the same four with $2 \theta_i$ in place of $\theta_i$ for the secondary. **Because the secondary angles are doubled, cranks $180^{\circ}$ apart — which are the classic primary-cancelling pair — have secondaries that are $360^{\circ}$ apart, i.e. in phase.** Every arrangement that cancels a primary by putting cranks opposite each other therefore *doubles* its secondary instead of cancelling it.

**The inline four** ($\theta = 0 , 180 , 180 , 0$; $z = - 3 d , - d , + d , + 3 d$):

| Condition | Sum | Result |
|---|---|---|
| Primary force | $2 \cos \theta - 2 \cos \theta$ | $0$ ✓ |
| Primary couple | $- 3 d \cos \theta + d \cos \theta - d \cos \theta + 3 d \cos \theta$ | $0$ ✓ |
| Secondary force | $4 \cos 2 \theta$ | **$4 P / n$ — unbalanced** |
| Secondary couple | $4 \cos 2 \theta ( - 3 d - d + d + 3 d )$ | $0$ ✓ |

**So the inline four is fully balanced except for a single free force of $4 P / n$ oscillating along the line of cylinders at twice crank speed.** It has no unbalanced couple, no unbalanced rotating mass, and no primary shake of any kind — and it still shakes, which is the fact that took a century to explain and which is the reason the phrase "balance shaft" is on a bill of materials.
:::

::: example The inline-four secondary force and its balance shafts {#ex-ic4}
$m_R = 2.2\ \mathrm{kg}$ per cylinder, $r = 43\ \mathrm{mm}$, $l = 144\ \mathrm{mm}$ ($n = 3.35$), $6000\ \mathrm{rev / min}$. Find the secondary force, and the balance-shaft unbalance needed to cancel it.

**Answer.** $44.6\ \mathrm{kN}$ at $200\ \mathrm{Hz}$, needing $14.1\ \mathrm{g \cdot m}$ of unbalance on each of two counter-rotating shafts.

::: solution
$$
P = 2.2 \times 0.043 \times 628.3^{ 2 } = 37{,}347\ \mathrm{N \ per \ cylinder} \ , \qquad \frac{ P }{ n } = 11{,}152\ \mathrm{N}
$$

$$
F_{\mathrm{secondary}} = 4 \times 11{,}152 = 44{,}608\ \mathrm{N} \quad \text{at} \ 2 \times 6000 / 60 = 200\ \mathrm{Hz}
$$

**Forty-five tonnes of oscillating force, in an engine with no unbalanced rotating mass whatever.** On a $1200\ \mathrm{kg}$ car it would produce $37\ \mathrm{m / s^2 } = 3.8 \ g$ if the mounts were rigid, and even a well-isolated powertrain transmits enough of it to be felt in the steering wheel and heard as a drone in the interior panels at exactly $200\ \mathrm{Hz}$ — which is why "a droning noise at $2000\ \mathrm{rpm}$ that disappears at $1500$" is diagnosed by counting orders, not by listening.

Two counter-rotating shafts driven at $2 \omega$ with unbalance $m_b r_b$ each produce a resultant along one fixed line of magnitude $2 m_b r_b ( 2 \omega )^{ 2 } = 8 m_b r_b \omega^{ 2 }$. Setting that against $4 P / n$:

$$
m_b r_b = \frac{ P }{ 2 n \omega^{ 2 } } = \frac{ 37{,}347 }{ 2 \times 3.35 \times 394{,}784 } = 1.41 \times 10^{- 2 }\ \mathrm{kg \cdot m} = \boxed{ 14.1 \ \mathrm{g \cdot m} \ \text{per shaft} }
$$

— for instance $0.35\ \mathrm{kg}$ at $40\ \mathrm{mm}$, which is a shaft the size of a finger. **The unbalance is trivially small; the shafts, their silent-chain drive, their bearings, their phasing tolerance and their $1$–$1.5\ \%$ contribution to the engine's friction are not, and the whole assembly exists to cancel a force that is $1 / n$ of a force that has already been cancelled.**

::: widget plot
title: Reciprocating inertia force per cylinder, primary plus secondary
f: 37347*(cos(x*pi/180)+cos(2*x*pi/180)/3.349)
x: 0, 360
y: -45000, 45000
caption: $P \cos \theta + ( P / n ) \cos 2 \theta$ for one cylinder of the engine above, in newtons against crank angle. **The waveform is not a sinusoid: the secondary makes the peak at top dead centre $48.5\ \mathrm{kN}$ and the trough at bottom dead centre only $26.2\ \mathrm{kN}$, and it shifts the zero crossings off $90^{\circ}$ and $270^{\circ}$.** That asymmetry — bigger load on the crankshaft bearing on the combustion stroke than on the induction stroke — is a secondary effect in every sense, and it is one of the things a bearing-fatigue calculation has to carry.
:::

::: widget plot
title: Inline-four secondary force against engine speed
f: 4*37347/3.349*pow(x/6000,2)
x: 0, 7000
y: 0, 60000
caption: $4 ( P / n ) \propto \omega^{ 2 }$. **The secondary force is proportional to the square of engine speed and cannot be reduced by any amount of primary balancing** — it is the term that sets the rev limit of an unbalanced inline four long before gas dynamics or valve float do. Note the shape: at $3000\ \mathrm{rev / min}$ the force is $11.2\ \mathrm{kN}$, at $6000$ it is $44.6$, and at $7000$ it is $60.5$. **Doubling the speed quadruples the shake, which is the same $\omega^{ 2 }$ scaling that made the flywheel of [[#ex-doubling]] four times effective, and it is why "rev it more" is a genuine vibration-control strategy at low speed and a hopeless one at high.**
:::

**What the other layouts do.** The secondary problem is not peculiar to the four; it is a consequence of using opposed cranks to cancel a primary, and every layout is a different bargain:

| Layout | Primary force | Primary couple | Secondary force | Secondary couple |
|---|---|---|---|---|
| Inline 1 | ✗ | rocking | ✗ | rocking |
| Inline 2, cranks $180^{\circ}$ | ✓ | ✗ rocking | ✗ $2 P / n$ | ✗ |
| Inline 3 | ✓ | ✗ | ✓ | ✗ |
| **Inline 4** | **✓** | **✓** | **✗ $4 P / n$** | **✓** |
| Inline 6 | ✓ | ✓ | ✓ | ✓ |
| 90° V8, crossplane | ✓ | ✓ | ✓ | ✓ |
| 60° V6 | ✓ | ✓ | ✗ | ✗ |
| 45° V twin | partial | ✗ | partial | ✗ |

**The inline six is the only inline layout with all four conditions satisfied, and that — not the power, not the smoothness of the firing impulses, but the arithmetic of [[#thm-inline]] — is the whole reason the straight six was for sixty years the engine of a luxury car and the straight eight the engine of an airliner.** A $90^{\circ}$ V8 with a crossplane crank satisfies the same four conditions in half the length, which is why it replaced the straight eight everywhere weight mattered. **And the inline three, which satisfies both force conditions and neither couple condition, is the modern small-car answer: two balance shafts are cheaper than three more cylinders, and a three-cylinder engine's rocking couple can be cancelled by a pair of shafts that also cancel its secondary.**
:::
:::

::: exercise Balance-shaft unbalance for a press slide {level=3 check="33.8"}
A press slide of $450\ \mathrm{kg}$ reciprocating mass runs on a $150\ \mathrm{mm}$ throw at $240\ \mathrm{rev / min}$. What unbalance must each of two counter-rotating primary balance shafts carry to cancel the slide's primary force?

::: solution
Two counter-rotating shafts at crank speed with unbalance $m_b r_b$ each give a resultant of $2 m_b r_b \omega^{ 2 }$ along the line of stroke, so

$$
2 m_b r_b \omega^{ 2 } = m_R r \omega^{ 2 } \quad \Longrightarrow \quad m_b r_b = \frac{ m_R r }{ 2 } = \frac{ 450 \times 0.150 }{ 2 } = \boxed{ 33.8 \ \mathrm{kg \cdot m} \ \text{per shaft} }
$$

**Notice that $\omega$ cancels: the required unbalance is a purely geometric quantity, $m_R r / 2$, and it does not care how fast you run.** That is what makes this answer so much worse than the car engine's $14.1\ \mathrm{g \cdot m}$ — the same formula, but $m_R r$ is $67.5\ \mathrm{kg \cdot m}$ instead of $0.095$. **Thirty-four kilogrammetres per shaft is a balance shaft the size of the crankshaft, and no press designer builds one.** Instead the press frame is made massive enough that the resulting acceleration is small — $42.6\ \mathrm{kN}$ on a $6000\ \mathrm{kg}$ frame is $7.1\ \mathrm{m / s^2 }$, and the frame is anchored to a mass of concrete that makes the whole thing a foundation rather than a machine.

**The design lesson is in the two numbers side by side: balance shafts are the right answer when $m_R r$ is small and the wrong answer when it is large, and the crossover is around a few $\mathrm{kg \cdot m}$.** It is also why high-speed presses and high-speed sewing machines use short throws and long rods: $m_R r$ falls with the throw, the rod ratio $n$ rises, and both effects push the machine into the regime where balancing is a shaft rather than a foundation.
:::
:::

## The flywheel as a store: what it is for and where it beats a battery

::: definition Specific energy of a rotating store {#def-store}
A flywheel rim is a rotating pressure vessel. Write $v$ for rim speed; the hoop stress in a thin rim of density $\rho$ is $\sigma = \rho v^{ 2 }$, and the kinetic energy of a thin rim of mass $m$ is $K = \frac{ 1 }{ 2 } m v^{ 2 }$. Eliminate $v$:

$$
\boxed{ \; \frac{ K }{ m } = \frac{ \sigma }{ 2 \rho } \quad \text{(constant-strength rim, } \sigma = \text{allowable rim stress)} \; }
$$

**The mass of flywheel needed to store a given energy depends on the material's specific strength and on nothing else — not on the speed, not on the diameter, not on the inertia.** Speed and diameter are how you *reach* the stress; the stress is what you are actually buying.

| Material | Allowable $\sigma$ | $\rho$ | $K / m$ |
|---|---|---|---|
| Grey cast iron | $150\ \mathrm{MPa}$ | $7100$ | $10.6\ \mathrm{kJ / kg}$ |
| Nodular graphite iron | $300\ \mathrm{MPa}$ | $7100$ | $21.1\ \mathrm{kJ / kg}$ |
| Forged carbon steel | $400\ \mathrm{MPa}$ | $7800$ | $25.6\ \mathrm{kJ / kg}$ |
| $300\ \mathrm{M}$ steel | $1200\ \mathrm{MPa}$ | $7800$ | $76.9\ \mathrm{kJ / kg}$ |
| Ti-6Al-4V | $600\ \mathrm{MPa}$ | $4500$ | $66.7\ \mathrm{kJ / kg}$ |
| CFRP (epoxy) | $1500\ \mathrm{MPa}$ | $1800$ | $417\ \mathrm{kJ / kg}$ |
| **Lithium-ion cell** | — | — | $900\ \mathrm{kJ / kg}$ |
| **Supercapacitor** | — | — | $54\ \mathrm{kJ / kg}$ |

**The flywheel loses the energy-density argument by one to two orders of magnitude and wins the power argument by about the same margin.** A steel rim that stores $12.8\ \mathrm{kJ / kg}$ can give the whole of it back in one second, which is $12.8\ \mathrm{kW / kg}$; a lithium cell at $900\ \mathrm{kJ / kg}$ can safely take $1 \ C$, which is $0.9\ \mathrm{kW / kg}$. **And the flywheel can do it a million times, because nothing in it is consumed.**
:::

::: example How far a badly-placed flywheel is from an optimal one {#ex-store}
The punch-press flywheel of [[#ex-punch]] is $274\ \mathrm{kg}$ of cast iron storing $\Delta U / ( 2 C_s ) = 4500 / 0.30 = 15{,}000\ \mathrm{J}$. How much cast iron would an optimally stressed rim need?

**Answer.** $1.4\ \mathrm{kg}$ — the design is **190 times heavier than thermodynamics requires.**

::: solution
Set the rim speed to the allowable stress, $\sigma = \rho v^{ 2 }$:

$$
v = \sqrt{ \frac{ 150 \times 10^{ 6 } }{ 7200 } } = 144\ \mathrm{m / s } \ , \qquad
m = \frac{ 2 K }{ v^{ 2 } } = \frac{ 2 \times 15{,}000 }{ 20{,}833 } = 1.44\ \mathrm{kg}
$$

The design runs its rim at $10.5\ \mathrm{m / s }$ and $0.79\ \mathrm{MPa}$ — **a flywheel using $0.5\ \%$ of the material's capability.** That is not an error; it is an economic choice, and it is worth being explicit about what the $273\ \mathrm{kg}$ of extra iron is buying:

- **Cost per kilogram.** Sand-cast grey iron at $10.5\ \mathrm{m / s }$ costs the machine shop one pattern and one pour. Forged steel at $144\ \mathrm{m / s }$ costs a forging, a machining operation, a dynamic balance to $G 6.3$, and a containment ring.
- **Windage.** A rim at $144\ \mathrm{m / s }$ drags air round with it; for a $0.5\ \mathrm{m}$ disc that is several hundred watts of heating, which is why every serious flywheel runs in a vacuum vessel. At $10.5\ \mathrm{m / s }$ the windage is a few milliwatts and the "vessel" is a sheet-steel guard.
- **Bearing life.** The rim's centrifugal load is carried internally, as hoop stress, and the bearings see only the residual unbalance $U \omega^{ 2 }$ — which is why a slow flywheel on plain bearings runs for forty years, and why the balancing grade of a $274\ \mathrm{kg}$ rim matters far more than its strength.
- **Failure.** A rim that bursts at $144\ \mathrm{m / s }$ throws metal at $144\ \mathrm{m / s }$. At $10.5\ \mathrm{m / s }$ it is a heavy paperweight. **The speed of a flywheel is a safety specification before it is an efficiency one.**

**The honest summary is that a machine flywheel is sized by cost, space and safety, and only very loosely by $\sigma / 2 \rho$ — and that the enormous gap between the two is exactly the gap a battery drives through.** Where a flywheel is genuinely unbeatable is not energy but the corner of the graph where energy and power are both demanded many times a day: a $5\ \mathrm{MW}$ grid stabiliser that cycles every few seconds needs $10^{6}$ full-depth cycles, which is a flywheel and not a battery, and a $6\ \mathrm{MJ}$ kinetic recovery system on a racing car that must be recharged in $2\ \mathrm{s}$ is a flywheel and not a battery.
:::
:::

::: quiz
A machine's cycle requires $800\ \mathrm{J}$ more than the motor supplies during its working stroke, and gives it back afterwards. Two designs run the same machine at $1500$ and $3000\ \mathrm{rev / min}$ with the same $C_s$. The flywheel inertia at $1500\ \mathrm{rev / min}$ is:

- [ ] The same, because $\Delta U$ is the same
- [x] Four times as large, because $I_f \propto 1 / \omega^{ 2 }$
- [ ] Twice as large, because $I_f \propto 1 / \omega$
- [ ] Smaller, because the cycle is shorter

::: solution
**Four times as large.** $I_f = \Delta U / ( \omega^{ 2 } C_s )$ with $\Delta U$ and $C_s$ fixed gives $I_f \propto 1 / \omega^{ 2 }$, and halving the speed quadruples the inertia. **And because the rim mass for a given *stored energy* is $m = 2 K \rho / \sigma$ independent of speed, the extra inertia at low speed is bought entirely as extra diameter — which is why slow machines have flywheels you can walk behind and fast machines have flywheels you can hold.** The corollary is the design rule that the flywheel goes on the fastest shaft in the machine, and that the $1 : 10$ gear in [[#ex-geareq]] is worth more than twice its weight in iron.
:::
:::

::: quiz
A rotor leaves the balancing shop statically balanced and dynamically out. The supports therefore feel:

- [ ] A rotating force with no couple
- [x] A rotating couple with no resultant force
- [ ] A force at twice running speed
- [ ] Nothing, because static balance is what matters at low speed

::: solution
**A rotating couple with no resultant force.** $\sum U_i \ne 0$ is a force; $\sum U_i = 0$ with $\sum z_i U_i \ne 0$ is a pure couple, and a pure couple is what two equal and opposite unbalances in different planes produce. **It is felt as a rocking oscillation of the machine about its mounting rather than as a shaking of the mounting itself, which is why it is missed by a single vibration pickup placed at the wrong end of the machine and is the commonest cause of a "balanced" rotor that still vibrates.** The remedy is exactly the two-plane correction of [[#deriv-2plane]], and the diagnosis is exactly a second pickup.
:::
:::

## Design: the drive for a blanking press {#sec-design}

::: example Design exercise: 250 kN blanking press, 90 strokes / min {#ex-design level=4}
**Specification.** A blanking press cuts $250\ \mathrm{kN}$ over a $15\ \mathrm{mm}$ working stroke, $90$ strokes per minute, one revolution of the crank per stroke. The cutting occupies $100^{\circ}$ of crank angle. The slide and upper tooling have $380\ \mathrm{kg}$ of reciprocating mass on a $250\ \mathrm{mm}$ throw with a $500\ \mathrm{mm}$ rod. Frame mass $3500\ \mathrm{kg}$. Specify the motor, the flywheel and where to put it, and check the shaking force.

**Solution: the energy.** Work per stroke $= 250 \times 10^{ 3 } \times 0.015 = 3750\ \mathrm{J}$. Cycle $60 / 90 = 0.667\ \mathrm{s}$, so the **mean** power is $5.63\ \mathrm{kW}$ and the **peak** power, if the motor had to carry the cut alone, is $3750 / ( 0.667 \times 100 / 360 ) = 20.3\ \mathrm{kW}$. Take a $7.5\ \mathrm{kW}$ motor and let the flywheel carry the difference — a $2.7$-fold reduction in motor rating for the price of a disc of iron, which is the whole point of the exercise.

**Solution: the flywheel, and where to put it.** Mean torque at the $90\ \mathrm{rev / min}$ crank ($\omega_c = 9.425\ \mathrm{rad / s}$) is $5625 / 9.425 = 597\ \mathrm{N \cdot m}$; the cutting torque is $3750 / 1.745 = 2149\ \mathrm{N \cdot m}$ over $1.745\ \mathrm{rad}$, so

$$
\Delta U = ( 2149 - 597 ) \times 1.745 = 2709\ \mathrm{J} \ , \qquad
I_{\mathrm{reflected \ at \ crank}} = \frac{ 2709 }{ 9.425^{ 2 } \times 0.08 } = 381\ \mathrm{kg \cdot m^2 }
$$

$C_s = 0.08$ is generous for a press and appropriate here because the cut is short and the machine is stiff. **Referred to the crank, $381\ \mathrm{kg \cdot m^2 }$ is a $1524\ \mathrm{kg}$ rim at $1.0\ \mathrm{m}$ diameter.** Move it instead:

| Flywheel location | Speed | $I$ needed | Rim at $R$ | Mass | Rim stress |
|---|---|---|---|---|---|
| On the crank | $90\ \mathrm{rev / min}$ | $381\ \mathrm{kg \cdot m^2 }$ | $0.50\ \mathrm{m}$ | $1524\ \mathrm{kg}$ | $0.16\ \mathrm{MPa}$ |
| On a $4 : 1$ countershaft | $360\ \mathrm{rev / min}$ | $23.8\ \mathrm{kg \cdot m^2 }$ | $0.30\ \mathrm{m}$ | $264\ \mathrm{kg}$ | $0.92\ \mathrm{MPa}$ |
| **On the motor shaft** | $1500\ \mathrm{rev / min}$ | $1.37\ \mathrm{kg \cdot m^2 }$ | $0.15\ \mathrm{m}$ | $\mathbf{61\ \mathrm{kg}}$ | $4.0\ \mathrm{MPa}$ |

**Take the motor shaft.** The flywheel is a $0.3\ \mathrm{m}$ nodular-iron disc on the motor spindle, $61\ \mathrm{kg}$, at a rim stress $1 / 75$ of the material's capability, and the reduction from $1524\ \mathrm{kg}$ to $61\ \mathrm{kg}$ cost nothing but a speed ratio — **$I \propto 1 / \omega^{ 2 }$ and the ratio is squared, so a $16.7 : 1$ reduction in speed is a $280 : 1$ increase in required inertia, and the machine that puts its flywheel on the crank is paying for iron it does not need.** The rim stress rises from $0.16$ to $4.0\ \mathrm{MPa}$ and is still negligible; the bearing $p v$ and the windage are what actually get worse, and both are handled by putting the flywheel on its own shaft with its own bearings rather than on the motor overhang.

**Solution: the shaking force.** Primary $= m_R r \omega^{ 2 } = 380 \times 0.125 \times 9.425^{ 2 } = 4219\ \mathrm{N}$ at $1.5\ \mathrm{Hz}$; secondary $= 4219 / 4 = 1055\ \mathrm{N}$ at $3\ \mathrm{Hz}$. On a $3500\ \mathrm{kg}$ frame the primary gives $1.2\ \mathrm{m / s^2 } = 0.12 \ g$.

**Specify no balance shafts.** The balance-shaft unbalance required would be $m_R r / 2 = 23.8\ \mathrm{kg \cdot m}$ per shaft — a shaft as large as the crank — and it would be buying the cancellation of a force that produces $0.12 \ g$ at $1.5\ \mathrm{Hz}$ on a frame whose first bending mode is above $60\ \mathrm{Hz}$, so the transmissibility is $1 / ( 60 / 1.5 )^{ 2 } \approx 1 / 1600$. **The shaking force is not this machine's problem; the $250\ \mathrm{kN}$ static load, the frame's deflection under it, and the $0.08$ speed ripple during the cut are.** A designer who specified balance shafts here has balanced the term that was already small and left the term that dominates. **Check which term dominates before you buy anything — that check is free and it is most of the design.**

**Solution: what to check next.**
1. **The rms motor torque, not the mean.** The motor shaft sees $35.8\ \mathrm{N \cdot m}$ mean with a $93\ \mathrm{N \cdot m}$ swing during the cut; the rms over the cycle is $41.5\ \mathrm{N \cdot m}$, $16\ \%$ above mean, so a $7.5\ \mathrm{kW}$ motor runs at $87\ \%$ of rating rather than $75\ \%$. **Check the rms, then check the peak against the motor's breakdown torque, then check the belt against the peak.**
2. **The flywheel's own contribution to $J_{\mathrm{eq}}$.** $1.37\ \mathrm{kg \cdot m^2 }$ at the motor shaft is a constant, so it does not disturb the $J_{\mathrm{eq}}$ ripple of [[#ex-ieq]] — but the *slide's* contribution referred through the same $16.7 : 1$ is $380 \times 0.125^{ 2 } / 16.7^{ 2 } \times (\text{velocity ratio})^{ 2 }$, which is small. **At $90\ \mathrm{rev / min }$ the $J_{\mathrm{eq}}$ gradient torque is $\frac{ 1 }{ 2 } \times 0.02 \times 9.425^{ 2 } = 0.9\ \mathrm{N \cdot m}$ and can be ignored; at $1500$ it would be $246\ \mathrm{N \cdot m}$ and would be the whole design.**
3. **The clutch and brake.** The flywheel is upstream of the clutch on the motor shaft, so the clutch must transmit $2149\ \mathrm{N \cdot m}$ at the crank and the brake must stop the slide with the flywheel still spinning at $1500\ \mathrm{rev / min }$ — see [[#warn-flywheel]].
4. **The flywheel guard, with a proof test.** $61\ \mathrm{kg}$ at $23.6\ \mathrm{m / s }$ stores $17\ \mathrm{kJ}$.
:::

::: history
| | |
|---|---|
| **1788 — Watt's flywheel and governor** | The single-acting steam engine delivered its whole output on one stroke of one side of the piston, and Boulton and Watt's engines were sold with a flywheel as standard equipment and a governing system as an option. **The flywheel is not an accessory to the steam engine; it is what made the steam engine able to drive a mill, a pump or a loom instead of merely hammering them.** Watt's patent of that year covers the parallel motion and the governor together, and the flywheel is in the drawings. |
| **1850s–1864 — Fairbairn's flywheel failures** | William Fairbairn's Manchester works built engines whose cast-iron flywheels burst, and his systematic measurements of bursting speed on spinning cast-iron discs and rims established that $\sigma = \rho v^{ 2 }$ governs and that the casting's defects, not the iron's nominal strength, set the limit. **His conclusion — that a flywheel is a pressure vessel and must be treated as one — is the origin of every proof-spin requirement on every flywheel drawing since.** |
| **1904–1906 — Lanchester's balancer** | Frederick W. Lanchester, who had by then built and abandoned his own car, showed that the primary force of a reciprocating engine could be cancelled without introducing a side force by using two counter-rotating weights each of half the primary, and patented the device. His account is in *A Speedometer and a Tender for Automobiles and the Automobile of the Future* (1906). **The Lanchester balancer is still fitted to twin-cylinder motorcycle engines that cannot be balanced any other way.** |
| **c. 1910 — hammer-blow trials** | British railway trials around 1910 measured the cyclic vertical force that locomotive counterweights put on the rail, and established the empirical rule that hammer blow should be kept below a stated fraction of the wheel load at the intended maximum speed. **This is the first recorded instance of a balancing specification being written as a force limit rather than a mass limit, which is exactly the logic ISO 1940 would adopt sixty years later.** |
| **1950s–1980s — the flywheel bus** | Oerlikon in Switzerland ran flywheel-equipped trolleybuses from the 1950s, recovering braking energy into a spun-up wheel and returning it on acceleration; Mercedes-Benz ran a similar fleet in Wiesbaden from 1980 to 1987. **They failed on energy density, not on the flywheel: a flywheel bus needs a depot-sized charger at every stop, which is exactly the wrong trade when batteries are the alternative.** |
| **mid-1970s — the Yazaki shaft** | A counter-rotating balance-shaft patent of the mid-1970s, first taken into production on a Japanese passenger-car engine at the end of that decade, made the inline four's second-order force a purchasable component. **It is the clearest case in machine design of a theory — the $4 P / n$ of [[#thm-inline]] — sitting unexploited for sixty years because the shaft, its chain and its bearings were not worth the vibration until customers started complaining about it.** |
| **1973 — ISO 1940-1** | The International Organization for Standardization published the balance-quality grading of rotors, replacing a century of "balance it well" with a permissible eccentricity in micrometres tied to the service speed. **Its lasting effect was commercial rather than technical: it made balancing a measurable acceptance test with a number on it, which is the only form in which a shop floor will accept a dynamics requirement.** |
| **2011–2015 — flywheels in the grid and on the circuit** | A $20\ \mathrm{MW}$ flywheel frequency-regulation plant opened in New York State in 2011, running several hundred vacuum-sealed steel-rotor machines on magnetic bearings, and a German sports-prototype won Le Mans in 2015 with a several-megajoule carbon-fibre flywheel recovering braking energy in two seconds. **Both are applications a battery cannot serve, and both are applications of the same two lines of algebra: $K / m = \sigma / 2 \rho$ and $P / K = 1 / \tau$.** |
:::

::: summary
- **Inertia is counted where it is, not where the shaft is.** $J_{\mathrm{eq}} ( \theta ) = \sum [ m_i ( v_{Gi} / \omega )^{ 2 } + I_{Gi} ( \omega_i / \omega )^{ 2 } ]$, and it reflects through a gear train as the **square** of the ratio — which is why a flywheel belongs on the fastest shaft in the machine.
- **The equation of motion of a linkage is $T = J_{\mathrm{eq}} \alpha + \frac{ 1 }{ 2 } ( \mathrm{d} J_{\mathrm{eq} } / \mathrm{d} \theta ) \omega^{ 2 }$, and the second term is present at constant speed.** For a slider-crank it is $28$ times the mean torque at $3000\ \mathrm{rev / min }$, and it is why opposed slides are used at high speed.
- **A flywheel is sized by $\Delta U$, not by peak torque:** $I_f = \Delta U / ( \omega^{ 2 } C_s )$, with $C_s$ a specification ($0.005$ for a generator, $0.15$ for a press) and $\Delta U$ read off the turning-moment diagram as the vertical extent of the cumulative-energy curve.
- **A flywheel reduces peak power, never peak force.** The crank, gears and frame are sized by the peak torque, and the brake must stop the machine with the flywheel still at speed.
- **The mass of a flywheel for a given stored energy is $2 K \rho / \sigma$ and does not depend on speed.** Machine flywheels are far heavier than that because they are cheap, slow, unguarded and un-vacuummed — and that trade is usually the right one.
- **Dynamic balance needs two planes because it is four scalar conditions:** $\sum U_i = 0$ and $\sum z_i U_i = 0$. A statically balanced long rotor is dynamically out and feels like a rocking couple.
- **The correction mass scales as $1 / ( b - a )$, the separation of the correction planes.** Choosing them badly costs a factor of four in metal and nothing at all in residual balance — so the plane positions go on the drawing.
- **A balance grade is a velocity:** $e_{\mathrm{per}} \omega = G\ \mathrm{mm / s}$, so $e_{\mathrm{per}} = 9549 G / n$ micrometres. $G 6.3$ at $3000\ \mathrm{rev / min }$ is $20\ \mu \mathrm{m}$, which on a $15\ \mathrm{kg}$ rotor is $301\ \mathrm{g \cdot mm}$ — smaller than one bolt.
- **The primary inertia force $m_R r \omega^{ 2 }$ is the crankpin component of an imaginary rotating mass; the secondary is $1 / n$ of it at twice crank speed, and exists because the rod is finite.** Cancelling a primary with opposed cranks doubles its secondary.
- **The inline four is balanced in primary force, primary couple and secondary couple, and carries $4 P / n$ of free secondary force** — $44.6\ \mathrm{kN}$ at $6000\ \mathrm{rev / min }$ — which two shafts carrying $14.1\ \mathrm{g \cdot m }$ each will remove. **Whether to remove it is a cost decision, and on a $90\ \mathrm{rev / min }$ press the answer is no.**
:::

## Further reading

- **S. G. Taylor, *The Text Book of Balancing* (1951)** — the classic treatment of rigid-rotor balancing, still the clearest derivation of why two planes are necessary and of how a balancing machine actually separates the two corrections.
- **A. S. Vol'pert and S. B. Chernyak, *Dynamics of Machinery* (Mir, 1977; reprint 2020)** — the most complete treatment of equivalent systems, $J_{\mathrm{eq}} ( \theta )$, and the flywheel problem, with worked slider-crank examples of the kind used in [[#ex-ieq]].
- **V. Artobolevsky, *Mechanisms in Modern Engineering Design*, vols. I–V (Mir, 1971–75)** — an encyclopaedia of balance shafts, Lanchester balancers, flywheel arrangements and governor mechanisms, with drawings of production examples.
- **H. Rissez and the ISO TC 108 secretariat, ISO 1940-1:2003, *Mechanical vibration — Balance quality requirement for rotors in a constant (rigid) state*** — read the annexes, which explain the choice of grade and the relationship between $e_{\mathrm{per}}$ and the resulting bearing force far better than any textbook.
- **W. F. Milliken and D. L. Milliken, *Race Car Vehicle Dynamics* (SAE, 1995), chapter on powertrain vibration** — the practical treatment of engine mounting, order analysis and what happens to a vehicle's interior when a $200\ \mathrm{Hz}$ force meets a $190\ \mathrm{Hz}$ dash panel.
- **S. H. Crandall, D. C. Karnopp, E. F. Kurtz and D. C. Pridmore, *Dynamics of Mechanical and Electromechanical Systems* (McGraw-Hill, 1968)** — energy methods and the equivalent-inertia formulation, developed to the point where the $\frac{ 1 }{ 2 } \omega^{ 2 } \, \mathrm{d} J / \mathrm{d} \theta$ term is a natural consequence rather than a curiosity.
- **B. Paul, *Kinematics of Dynamics of Machines* (Ellis Horwood, 1979), chapters on balancing and flywheels** — a compact, rigorous derivation of the inline-engine results of [[#thm-inline]] and of the partial-balancing optimum $c = 0.5$.
