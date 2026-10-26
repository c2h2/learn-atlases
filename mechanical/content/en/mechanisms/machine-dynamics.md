::: warning The torque is not the power divided by the speed
Every previous lesson in this course has computed accelerations from a given motion. This lesson computes the motion that a given torque produces — and the first thing you discover is that the answer is not what the nameplate says.

A $10\ \mathrm{kW}$ motor at $3000\ \mathrm{rev / min}$ does not deliver $31.8\ \mathrm{N \cdot m}$. It delivers $31.8\ \mathrm{N \cdot m}$ *on average*, and the linkage it drives asks for an oscillating torque that in the worked example of [[#sec-eqsys]] reaches about $3400\ \mathrm{N \cdot m}$ — **over a hundred times the mean** — even when the output shaft turns at a perfectly constant speed. A press that punches $6000\ \mathrm{J}$ in $0.06\ \mathrm{s}$ does not need a $100\ \mathrm{kW}$ motor; it needs a motor of about $20$–$25\ \mathrm{kW}$ and $73\ \mathrm{kg \cdot m^2}$ of flywheel. And a four-cylinder car engine at $6000\ \mathrm{rev / min}$ shakes its mounts with a free force of $44.6\ \mathrm{kN}$ — the weight of four and a half tonnes — at $200\ \mathrm{Hz}$, with no unbalanced rotating mass anywhere in it.

All three facts come from the same two ideas: **that inertia has to be counted where it actually is rather than where the shaft is, and that a force which cannot be removed can often be made to point somewhere else.**
:::

## What you already know

- **Relative acceleration and the acceleration image** — from [[mechanisms/acceleration-analysis]], which is how you find the velocity and acceleration of every link's centre of mass as a function of crank angle. Divided by the crank speed, those velocities become **velocity ratios** that depend on position only, and this lesson is built on them.
- **Shaking force** — $F_{\mathrm{shake}} = - \sum m_i a_{Gi}$, derived in [[mechanisms/acceleration-analysis]] as the negative of the total mass-centre acceleration. Here it becomes the design objective rather than a by-product.
- **Work and energy for a rigid body** — $T = \frac{1}{2} J \omega^{2}$ and the principle of work and energy from [[dynamics/work-energy]], which is the only tool needed for a single-degree-of-freedom machine.
- **Torsional vibration and two-degree-of-freedom systems** — from [[vibrations/two-degrees-of-freedom]], because a flywheel and a motor armature are two inertias joined by a shaft, and the flywheel's moment of inertia is exactly the parameter that sets where their coupled natural frequency lands.
- **Strength and fatigue** — from [[materials-science/mechanical-properties]], because a flywheel rim is loaded by hoop stress like a pressure vessel, and because residual unbalance is a cyclic bearing load and therefore a fatigue-life question.

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

**$J_{\mathrm{eq}}$ is a function of configuration, not a constant.** For the slider-crank of [[#ex-ieq]] it varies by a factor of almost four over a revolution, and that variation is itself a torque.
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

**The second term is present even at constant speed.** It is the torque the drive must supply purely to accelerate and decelerate the linkage's own masses as the mechanism changes shape, and it is proportional to $\omega^{2}$.

Two consequences that decide real designs:

1. **At constant speed the whole of the inertia part of $T_{\mathrm{eq}}$ is the $J$-gradient term**, an oscillating torque with zero mean; for a slider-crank, whose $J_{\mathrm{eq}}$ repeats every half revolution, its fundamental is at twice the crank frequency. A motor rated on mean torque alone will run hot, because its copper loss goes as the *rms* current, and in [[#ex-ieq]] the rms of the gradient torque is about $2100\ \mathrm{N \cdot m}$ against a useful mean of $32\ \mathrm{N \cdot m}$.
2. **The term grows as $\omega^{2}$ while the useful torque of most processes is roughly constant.** A linkage that is comfortable at $500\ \mathrm{rev / min}$ carries 36 times the inertia torque at $3000$, and in high-speed linkage machinery this term, rather than the process load, often sets the drive rating and the speed limit.
:::
:::

::: example Equivalent inertia of a slider-crank {#ex-ieq}
A slider-crank has crank $r = 100\ \mathrm{mm}$, rod $l = 400\ \mathrm{mm}$ ($\lambda = 0.25$), crank mass $2.0\ \mathrm{kg}$ with centre of mass $50\ \mathrm{mm}$ from the crankpin axis and $I_{G2} = 2.5 \times 10^{- 3}\ \mathrm{kg \cdot m^2}$, rod mass $4.0\ \mathrm{kg}$ modelled as uniform, and a $3.0\ \mathrm{kg}$ slide. Find $J_{\mathrm{eq}} ( \theta )$ about the crankshaft and the torque needed to turn it at a constant $3000\ \mathrm{rev / min}$.

**Answer.** $J_{\mathrm{eq}}$ swings between $20.8$ and $80.3\ \mathrm{g \cdot m^2}$ — a factor of $3.85$ — and the constant-speed torque has an amplitude of $3420\ \mathrm{N \cdot m}$.

::: solution
With $\theta$ measured from top dead centre and $D = \sqrt{ 1 - \lambda^{ 2 } \sin^{ 2 } \theta }$, the velocity ratios are

$$
\frac{ v_{\mathrm{slide}} }{ r \omega } = \sin \theta + \frac{ \lambda^{ 2 } \sin \theta \cos \theta }{ D } \equiv u \ , \qquad \frac{ \omega_{\mathrm{rod}} }{ \omega } = \frac{ \lambda \cos \theta }{ D }
$$

and taking the rod's centre of mass at its midpoint, its velocity is the average of the crankpin velocity and the slide velocity, $\dfrac{ v_{G,\mathrm{rod}} }{ \omega } = \frac{r}{2} \sqrt{ ( u + \sin \theta )^{ 2 } + \cos^{ 2 } \theta }$. The crank contributes a constant $I_{G2} + m_2 ( 0.05 )^{2} = 7.5\ \mathrm{g \cdot m^2}$ about the shaft, the rod $m_{\mathrm{rod}} ( v_{G,\mathrm{rod}} / \omega )^{2} + ( m_{\mathrm{rod}} l^{2} / 12 ) ( \omega_{\mathrm{rod}} / \omega )^{2}$, and the slide $m_{\mathrm{slide}} r^{2} u^{2}$. Collecting the terms:

| $\theta$ | $0^{\circ}$ | $30^{\circ}$ | $60^{\circ}$ | $90^{\circ}$ | $120^{\circ}$ | $150^{\circ}$ | $180^{\circ}$ | $270^{\circ}$ |
|---|---|---|---|---|---|---|---|---|
| $J_{\mathrm{eq}}$, $\mathrm{g \cdot m^2}$ | 20.83 | 40.97 | 73.47 | 77.50 | 54.26 | 30.06 | 20.83 | 77.50 |

The maximum, $80.3\ \mathrm{g \cdot m^2}$, is at $\theta = 78^{\circ}$. **The inertia is smallest at the dead centres and largest near mid-stroke**, which is exactly right: at the dead centres the slide is momentarily stationary and the rod swings about the wrist pin, while near mid-stroke the slide is at full speed and the rod is almost translating with it. (Check at $90^{\circ}$: $u = 1$, the rod translates at $r \omega$ and does not rotate, so $J_{\mathrm{eq}} = 7.5 + ( 4.0 + 3.0 ) \times 0.1^{2} \times 10^{3} = 77.5\ \mathrm{g \cdot m^2}$.)

::: widget plot
title: Equivalent inertia of a slider-crank against crank angle
f: 1000*(0.0075+0.01*((sin(x*pi/180)+0.0625*sin(x*pi/180)*cos(x*pi/180)/sqrt(1-0.0625*pow(sin(x*pi/180),2)))+(sin(x*pi/180)))*((sin(x*pi/180)+0.0625*sin(x*pi/180)*cos(x*pi/180)/sqrt(1-0.0625*pow(sin(x*pi/180),2)))+(sin(x*pi/180)))+0.01*(cos(x*pi/180))*(cos(x*pi/180))+0.003333333*(cos(x*pi/180))*(cos(x*pi/180))/(1-0.0625*(sin(x*pi/180))*(sin(x*pi/180)))+0.03*(sin(x*pi/180)+0.0625*sin(x*pi/180)*cos(x*pi/180)/sqrt(1-0.0625*pow(sin(x*pi/180),2)))*(sin(x*pi/180)+0.0625*sin(x*pi/180)*cos(x*pi/180)/sqrt(1-0.0625*pow(sin(x*pi/180),2))))
x: 0, 360
y: 15, 85
caption: $J_{\mathrm{eq}} ( \theta )$ for the mechanism above, in $\mathrm{g \cdot m^2}$. **The curve repeats every half revolution and is not a sinusoid: its humps lean towards top dead centre, because the slide's contribution goes as $u^2$ and $u$ itself is skewed by the rod-length term.** A flywheel adds a constant to this curve: it reduces the *relative* variation of $J_{\mathrm{eq}}$ (see [[#ex-geareq]]), but it does nothing to the gradient torque $\frac{1}{2} \omega^{2} \, \mathrm{d} J_{\mathrm{eq}} / \mathrm{d} \theta$ that the linkage demands at constant speed.
:::

**The constant-speed torque.** At $\omega = 314.16\ \mathrm{rad / s}$ the $\frac{1}{2} ( \mathrm{d} J_{\mathrm{eq}} / \mathrm{d} \theta ) \omega^{ 2 }$ term peaks at

$$
T = \frac{ 1 }{ 2 } \times 69.4 \times 10^{- 3 } \times 314.16^{ 2 } = 3420\ \mathrm{N \cdot m}
$$

(the steepest slope of $J_{\mathrm{eq}}$, $69.4\ \mathrm{g \cdot m^2 / rad}$, occurs at $\theta = 37^{\circ}$), against a mean torque of $31.8\ \mathrm{N \cdot m}$ if the machine is doing $10\ \mathrm{kW}$ of useful work. **The drive sees a torque swinging between about $- 3390$ and $+ 3460\ \mathrm{N \cdot m}$ to deliver a steady $32$**, with an rms of about $2100\ \mathrm{N \cdot m}$. Two identical mechanisms on one shaft would not help if phased $180^{\circ}$ apart — $J_{\mathrm{eq}}$ repeats every half turn, so their gradients would add — but phased $90^{\circ}$ apart they cancel the dominant second harmonic. And a servo-driven axis of this kind is selected on rms and peak torque rather than on power.

**Sanity check.** $3420\ \mathrm{N \cdot m}$ is plausible: the slide alone ($3\ \mathrm{kg}$) and the rod ($4\ \mathrm{kg}$) reach peak accelerations of order $r \omega^{2} ( 1 + \lambda ) = 0.1 \times 314^{2} \times 1.25 \approx 12\,300\ \mathrm{m/s^2}$, i.e. inertia forces of tens of kilonewtons acting on a $0.1\ \mathrm{m}$ crank.
:::
:::

::: exercise Equivalent inertia at a gear ratio {#ex-geareq level=2 check="3.0"}
The mechanism above drives a load through a $1 : 1$ shaft, but a designer proposes putting the flywheel on a shaft geared up $10 : 1$ from the crank (so the flywheel turns ten times faster). If the flywheel has $J = 0.03\ \mathrm{kg \cdot m^2}$ about its own axis, what does it contribute to $J_{\mathrm{eq}}$ at the crankshaft, and what then is the peak-to-trough ratio of the total $J_{\mathrm{eq}}$ (in $\mathrm{kg \cdot m^2}$ for the first part)?

::: solution
Inertia reflects through a gear train as the **square** of the ratio:

$$
J_{\mathrm{eq, \, flywheel}} = J \times \left( \frac{ \omega_f }{ \omega_c } \right)^{ 2 } = 0.03 \times 100 = \boxed{ 3.0\ \mathrm{kg \cdot m^2} }
$$

and the swing of $J_{\mathrm{eq}}$ is unchanged in absolute terms — it is still $59.5\ \mathrm{g \cdot m^2}$ — but as a *fraction* it collapses from $3.85 : 1$ peak-to-trough to

$$
\frac{ 3000 + 80.3 }{ 3000 + 20.8 } = 1.020 \ , \qquad \text{i.e. a } 2.0 \ \% \text{ variation instead of } 285 \ \%
$$

**which is the case for putting the flywheel on a high-speed shaft.** The same $0.03\ \mathrm{kg \cdot m^2}$ mounted directly on the crank would have contributed only $30\ \mathrm{g \cdot m^2}$, less than the linkage itself. **A small inertia spinning fast is worth its speed ratio squared, and speed ratios are cheap while mass is not.** The penalty, taken up in [[#warn-flywheel]], is that rim stress goes as $v^{2}$ and the stored energy and the force from any residual unbalance grow with speed too, so a fast flywheel needs more care in balancing and guarding.
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
| Electrical generator set | $0.002$–$0.005$ | Frequency and voltage steadiness |
| Machine tools, spinning and weaving machinery | $0.01$–$0.03$ | Surface finish, thread and registration quality |
| Pumps, compressors | $0.03$–$0.05$ | Little sensitivity to speed ripple |
| Punch press, shear, riveter | $0.1$–$0.2$ | The work is one blow; the slowdown during the blow is accepted |
| Crusher, hammer | about $0.2$ | As above, and the flywheel is part of the tool |

The values are indicative ranges of the kind tabulated in machine-design texts; each industry has its own figures.
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

**The last form, $\Delta U = 2 K C_s$ where $K$ is the stored kinetic energy, is the one to think with: the fractional speed change is half the fractional energy change.** To absorb an energy fluctuation $\Delta U$ at $C_s = 0.05$, the flywheel must store $K = \Delta U / ( 2 \times 0.05 ) = 10 \, \Delta U$ — which is why a press flywheel is often the heaviest part of the machine, and why the effective way to make flywheels small is to raise $\omega$, since $I_f \propto 1 / \omega^{ 2 }$ at fixed $C_s$.

**Two cautions.** First, $I_f$ is the *additional* inertia referred to the shaft where $\omega$ is measured; if the machine's own moving parts already contribute a significant $J_{\mathrm{eq}}$, subtract it — and remember from [[#ex-ieq]] that $J_{\mathrm{eq}}$ is not constant. Second, the formula assumes the flywheel's inertia is a constant, so **a flywheel on the crank of a slider-crank is fighting a $\Delta J_{\mathrm{eq}}$ of the same order as itself**; on a geared-up shaft it is not, which is the practical content of [[#ex-geareq]].
:::
:::

::: example Flywheel for a single-cylinder generator set {#ex-1cyl}
A single-cylinder four-stroke engine, $500\ \mathrm{cm^3}$, b.m.e.p. $8\ \mathrm{bar}$, runs a generator at $3000\ \mathrm{rev / min}$. Model the expansion stroke as a half-sine of duration $180^{\circ}$ crank and neglect the pumping and compression loops. Find the required flywheel inertia for $C_s = 0.005$.

**Answer.** $\Delta U = 305\ \mathrm{J}$, $I_f = 0.62\ \mathrm{kg \cdot m^2}$ — about $15\ \mathrm{kg}$ of cast-iron rim at $400\ \mathrm{mm}$ mean diameter.

::: solution
Work per cycle $=$ b.m.e.p. $\times$ displacement $= 8 \times 10^{ 5 } \times 5 \times 10^{- 4 } = 400\ \mathrm{J}$, delivered once every $720^{\circ} = 4 \pi$ radians of crank, so

$$
T_m = \frac{ 400 }{ 4 \pi } = 31.83\ \mathrm{N \cdot m} \ , \qquad P = T_m \omega = 31.83 \times 314.16 = 10.0\ \mathrm{kW}
$$

A half-sine $T_p \sin \theta$ over $0 \le \theta \le \pi$ has area $2 T_p$, so $T_p = 400 / 2 = 200\ \mathrm{N \cdot m}$. It crosses the mean line where $200 \sin \theta = 31.83$, i.e. at $\theta = 9.16^{\circ}$ and $170.84^{\circ}$ ($0.1598$ and $2.9818\ \mathrm{rad}$). The cumulative energy $\Delta E$ has its minimum at the first crossing and its maximum at the second (after the stroke it falls linearly back to zero over the remaining $540^{\circ}$), so the maximum fluctuation is the area above the mean line:

$$
\Delta U = \int_{ 0.1598 }^{ 2.9818 } \! \left( 200 \sin \theta - 31.83 \right) \mathrm{d} \theta = 2 \times 200 \cos 9.16^{\circ} - 31.83 \times 2.8220 = 394.9 - 89.8 = 305.1\ \mathrm{J}
$$

$$
I_f = \frac{ 305.1 }{ 314.16^{ 2 } \times 0.005 } = \frac{ 305.1 }{ 493.5 } = 0.618\ \mathrm{kg \cdot m^2}
$$

A thin rim of mean radius $0.20\ \mathrm{m}$ has $I = m r^{ 2 }$, so $m = 0.618 / 0.04 = 15.5\ \mathrm{kg}$. Rim speed $v = \omega r = 62.8\ \mathrm{m / s}$ and hoop stress $\sigma = \rho v^{ 2 } = 7200 \times 62.8^{ 2 } = 28.4\ \mathrm{MPa}$ — acceptable for grey cast iron with a sensible safety factor, which is why small engine flywheels are still cast.

**Sanity check.** $\Delta U = 305\ \mathrm{J}$ is $76\ \%$ of the $400\ \mathrm{J}$ cycle work, as it should be when nearly all the work arrives in one stroke out of four.

::: widget plot
title: Turning-moment diagram and cumulative energy fluctuation
f: 200*sin(x*pi/180); 31.83
x: 0, 180
y: 0, 220
caption: The expansion-stroke torque (half-sine, peak $200\ \mathrm{N \cdot m}$) against the mean torque line at $31.83\ \mathrm{N \cdot m}$. **The peak-to-mean ratio is $6.3$, and the engine spends $78 \ \%$ of its $720^{\circ}$ cycle below the mean line.** For a four-cylinder engine in the same idealised model the four half-sines join into a continuous $| \sin |$ wave with a peak-to-mean ratio of $\pi / 2 = 1.57$, which is why multi-cylinder engines need much smaller flywheels than single-cylinder ones.
:::

::: widget plot
title: Energy stored above and below the mean line, against crank angle
f: 200-200*cos(x*pi/180)-31.83*x*pi/180
x: 0, 180
y: -10, 320
caption: $\Delta E ( \theta ) = \int_0^ \theta ( T - T_m ) \, d \theta$ for the same stroke. **The flywheel's job is set by the vertical extent of this curve, not by the peak torque** — $\Delta U = 305\ \mathrm{J}$ is the height from the dip ($- 2.5\ \mathrm{J}$ at $9.2^{\circ}$) to the crest ($302.5\ \mathrm{J}$ at $170.8^{\circ}$). At $180^{\circ}$ the curve stands at $300\ \mathrm{J}$; over the next $540^{\circ}$, with no gas torque, the flywheel gives that energy back and $\Delta E$ falls linearly to zero at $720^{\circ}$.
:::

**What the neglected loops would do.** The compression stroke takes energy out of the flywheel just before the expansion stroke, and the real gas torque is not a half-sine but a sharp peak shortly after top dead centre followed by a falling tail. Both effects deepen the dip and raise $\Delta U$ above the half-sine estimate, so a real design is computed from a measured or simulated cylinder-pressure diagram. **The method does not change; only the input does.**
:::
:::

::: example Punch press: the flywheel is the machine {#ex-punch}
A punch exerts $300\ \mathrm{kN}$ over a $20\ \mathrm{mm}$ stroke. The crank runs at $200\ \mathrm{rev / min}$, one punch per revolution, and the punching occupies $0.06\ \mathrm{s}$ — $72^{\circ}$ of crank. Allow $C_s = 0.15$. Size the flywheel and the motor.

**Answer.** $I_f = 73\ \mathrm{kg \cdot m^2}$, a $292\ \mathrm{kg}$ rim at $1.0\ \mathrm{m}$ mean diameter, and a motor delivering a mean $20\ \mathrm{kW}$ (a $25\ \mathrm{kW}$ rating gives margin) where $100\ \mathrm{kW}$ would otherwise be needed.

::: solution
Work per punch $= 300 \times 10^{ 3 } \times 0.020 = 6000\ \mathrm{J}$, delivered in $0.06\ \mathrm{s}$ out of a $0.30\ \mathrm{s}$ cycle. **Peak power if the motor had to supply it directly: $6000 / 0.06 = 100\ \mathrm{kW}$.** Mean power: $6000 / 0.30 = 20\ \mathrm{kW}$.

In steady running the motor must supply the mean torque, $T_m = 6000 / 2 \pi = 955\ \mathrm{N \cdot m}$ at $\omega = 20.94\ \mathrm{rad / s}$ ($20\ \mathrm{kW}$); a $25\ \mathrm{kW}$ motor is chosen for margin, but in steady state it still delivers only the mean. During the punch the load torque is $6000 / 1.2566 = 4775\ \mathrm{N \cdot m}$, so the flywheel must supply

$$
\Delta U = ( 4775 - 955 ) \times 1.2566 = 4800\ \mathrm{J}
$$

which is simply the punch energy less what the motor delivers during the $72^{\circ}$ of punching, $6000 \times ( 1 - 72 / 360 )$. Then

$$
I_f = \frac{ 4800 }{ 20.94^{ 2 } \times 0.15 } = \frac{ 4800 }{ 65.8 } = 73.0\ \mathrm{kg \cdot m^2}
$$

A thin rim of mean diameter $1.0\ \mathrm{m}$ needs $m = 73.0 / 0.5^{ 2 } = 292\ \mathrm{kg}$. Rim speed is only $10.5\ \mathrm{m / s}$, so the hoop stress is $0.79\ \mathrm{MPa}$ — **the flywheel is nowhere near its stress limit, which means it is a cheap, heavy, cast, slow machine, and that is exactly what a press flywheel should be.**

::: widget plot
title: Speed fluctuation against flywheel inertia, punch press
f: 4800/(438.6*x)
x: 20, 250
y: 0, 0.6
caption: $C_s = \Delta U / ( \omega^{ 2 } I_f )$ for $\Delta U = 4800\ \mathrm{J}$ at $200\ \mathrm{rev / min}$. **The curve is a rectangular hyperbola: halving the fluctuation doubles the inertia.** At $73\ \mathrm{kg \cdot m^2}$ the design sits at $C_s = 0.15$; tightening to $C_s = 0.05$ would need $219\ \mathrm{kg \cdot m^2}$, an $875\ \mathrm{kg}$ rim at the same diameter. The cheaper way to buy a smaller $C_s$ is to put the flywheel on a faster shaft, since $I_f \propto 1 / \omega^{ 2 }$ — which is why presses usually carry their flywheel on the motor-side shaft of a reduction drive (see [[#sec-design]]).
:::
:::
:::

::: warning What a flywheel cannot do {#warn-flywheel}
A flywheel is an energy buffer with a fixed gain, and four things follow that are routinely assumed otherwise.

1. **It does not reduce the peak torque.** The punch still sees $4775\ \mathrm{N \cdot m}$ at the crank and $300\ \mathrm{kN}$ at the ram. The crankshaft, the gears, the frame and the bearings are all sized by that, and no quantity of flywheel changes them. **A flywheel reduces the peak *power* drawn from the supply, never the peak *force* in the machine.**
2. **It does not regulate speed; it limits the rate of speed change.** The mean speed is set by the motor (or by a governor); the flywheel only smooths the fluctuation within a cycle. With the drive tripped, a flywheel-loaded press keeps coasting with all its stored energy, which is why a press clutch and brake must be able to stop the slide with the flywheel still at full speed.
3. **It cannot smooth what it does not store.** $C_s$ is set by $\Delta U$ against the *total* stored energy, $C_s = \Delta U / ( 2 K )$ with $K = \frac{1}{2} I \omega^{ 2 }$. An inertia that is large in $\mathrm{kg \cdot m^2}$ but turns slowly stores little, so quoting $I$ without saying at what $\omega$ — that is, on which shaft — is a common sizing error.
4. **It stores energy that must be contained.** A rim running at $v = 100\ \mathrm{m / s}$ stores $v^{2} / 2 = 5\ \mathrm{kJ}$ per kilogram of rim; the $292\ \mathrm{kg}$ press rim at $10.5\ \mathrm{m / s}$ stores $16\ \mathrm{kJ}$. A flywheel that bursts releases its fragments at roughly rim speed, so flywheels are designed with a generous margin on burst speed, guarded, and — for fast ones — spin-tested.
:::

::: exercise Speed fluctuation of the generator set {level=1 check="0.005"}
The single-cylinder set of [[#ex-1cyl]] has $\Delta U = 305\ \mathrm{J}$ at $3000\ \mathrm{rev / min}$ and a flywheel of $I_f = 0.618\ \mathrm{kg \cdot m^2}$. What is $C_s$ (as a decimal), and what speed swing in rev / min is that?

::: solution
$$
C_s = \frac{ \Delta U }{ I_f \omega^{ 2 } } = \frac{ 305.1 }{ 0.618 \times 314.16^{ 2 } } = \frac{ 305.1 }{ 61{,}000 } = \boxed{ 0.005 } \quad \Rightarrow \quad 0.005 \times 3000 = 15\ \mathrm{rev / min}
$$

**Fifteen revolutions per minute of ripple on a $3000\ \mathrm{rev / min}$ shaft — $\pm 0.25\ \%$ about the mean — repeating once per engine cycle, i.e. every two revolutions ($25\ \mathrm{Hz}$).** For a $50\ \mathrm{Hz}$ alternator that is a cyclic frequency and voltage ripple of $\pm 0.125\ \mathrm{Hz}$, which is why single-cylinder generating sets carry comparatively large flywheels, while an electric motor of the same power, with a smooth torque, needs none.
:::
:::

::: exercise Doubling the speed {#ex-doubling level=2 check="0.005"}
A machine tool's flywheel gives $C_s = 0.02$ at $1500\ \mathrm{rev / min}$. The plant engineer doubles the spindle speed to $3000\ \mathrm{rev / min}$ with the same flywheel and the same $\Delta U$ per cycle. What is the new $C_s$?

::: solution
$I_f \omega^{ 2 } C_s = \Delta U$ with $I_f$ and $\Delta U$ unchanged gives $C_s \propto 1 / \omega^{ 2 }$:

$$
C_s = 0.02 \times \left( \frac{ 1500 }{ 3000 } \right)^{ 2 } = \boxed{ 0.005 }
$$

**a fourfold improvement — speed is the most powerful lever in flywheel design.** The catch is that $\Delta U$ is not always unchanged. If the process demands a fixed energy per cycle — a press stroke, a pump with a fixed displacement and pressure — then doubling the speed doubles the *rate* but leaves the energy per cycle alone, and the result holds. But if the cyclic torque is inertial or grows with speed — the gradient torque of a linkage, which goes as $\omega^{2}$ — then $\Delta U$ per cycle grows as $\omega^{2}$ too and $C_s$ does not improve at all. **Check which one you have before you celebrate.**
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

**Read the denominator.** The required correction is inversely proportional to the **separation of the correction planes** $b - a$. Move them closer together and the corrections grow roughly in inverse proportion, while the residual unbalance after correction is zero either way — **a balancing machine will report a perfect balance achieved with a large amount of correction mass, and only the size of the correction shows that the planes were badly chosen.**

The second thing to read is that $C_a$ and $C_b$ are complex: they have phases, and the phases are usually not those of the original unbalances. A correction of the right magnitude placed with a phase error $\delta$ leaves a residual of $2 \sin ( \delta / 2 )$ times the original: about half at $30^{\circ}$, and as much as before at $60^{\circ}$. **Phase accuracy matters as much as magnitude, which is why balancing needs a properly calibrated phase reference.**
:::
:::

::: example Two-plane correction of a two-disc rotor {#ex-2plane}
A rotor carries $U_1 = 0.100\ \mathrm{kg \cdot m}$ at $0^{\circ}$ in plane $z = 0$ and $U_2 = 0.080\ \mathrm{kg \cdot m}$ at $90^{\circ}$ in plane $z = 0.5\ \mathrm{m}$. Find the correction masses at radius $150\ \mathrm{mm}$ in planes (a) $z = 0.1$ and $0.4\ \mathrm{m}$, and (b) $z = 0.2$ and $0.3\ \mathrm{m}$.

**Answer.** (a) $0.906\ \mathrm{kg}$ at $168.7^{\circ}$ and $0.745\ \mathrm{kg}$ at $- 72.6^{\circ}$. (b) $2.267\ \mathrm{kg}$ at $151.9^{\circ}$ and $2.083\ \mathrm{kg}$ at $- 50.2^{\circ}$ — **$2.6$ times as much, for exactly the same residual balance.**

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
C_b = \frac{ 0.0200 - \mathrm{j} 0.0240 }{ 0.1 } = 0.200 - \mathrm{j} 0.240 \ \Rightarrow \ \left| C_b \right| = 0.3124 \ , \qquad C_a = - 0.300 + \mathrm{j} 0.160 \ \Rightarrow \ \left| C_a \right| = 0.3400
$$

**$m_a = 2.267\ \mathrm{kg}$, $m_b = 2.083\ \mathrm{kg}$ — $2.6$ times the total mass of case (a) for the same residual unbalance of zero.**

**(c) For comparison, planes at $a = 0$ and $b = 0.6$, i.e. spanning both mass planes:** $C_a = 0.1009$ at $- 172.4^{ \circ }$, $C_b = 0.0667$ at $- 90^{ \circ }$, giving $0.673$ and $0.444\ \mathrm{kg}$, total $1.117\ \mathrm{kg}$. **The best arrangement of the three, needing $3.9$ times less mass than the worst.**

::: warning Where the correction planes are is a design decision, not a balancing decision
The rule follows from the $1 / ( b - a )$ in [[#deriv-2plane]] and is worth memorising because it is made once, on the drawing, and paid for at every balancing machine for the life of the product:

- **Put the correction planes as far apart as the bearing span allows**, and if the design permits, outside the planes of the masses being corrected.
- **Avoid closely spaced correction planes between the mass planes** — that is the geometry that makes $b - a$ small and the corrections large.
- **Design the rotor to be correctable.** Machined correction surfaces near the ends, at a large radius, with the balancing procedure and the maximum drill depth on the drawing, cost little and keep the correction masses small.
- **Removing material is often preferred to adding it.** An added weight must be retained against its own centrifugal force — a $0.9\ \mathrm{kg}$ weight at $0.15\ \mathrm{m}$ and $3000\ \mathrm{rev / min}$ pulls with $0.9 \times 0.15 \times 314.16^{ 2 } = 13.3\ \mathrm{kN}$ — whereas a drilled hole cannot come loose.
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
| $G \ 0.4$ | Gyroscopes, spindles of precision grinders | $1.3\ \mu \mathrm{m}$ |
| $G \ 1$ | Grinding-machine drives, small armatures with special requirements | $3.2\ \mu \mathrm{m}$ |
| $G \ 2.5$ | Gas and steam turbines, turbo-compressors, machine-tool drives | $7.96\ \mu \mathrm{m}$ |
| $G \ 6.3$ | Fans, pumps, flywheels, general electric-motor armatures, machine-tool parts | $20.1\ \mu \mathrm{m}$ |
| $G \ 16$ | Cardan and propeller shafts, parts of agricultural and crushing machinery | $51\ \mu \mathrm{m}$ |
| $G \ 40$ | Car wheels and rims | $127\ \mu \mathrm{m}$ |
| $G \ 630$ | Crankshaft drives of large, rigidly mounted engines | $2005\ \mu \mathrm{m}$ |

The examples follow the classic table of ISO 1940-1 (now ISO 21940-11); consult the standard for a particular rotor.
:::

::: example What a grade costs in metal {#ex-grade}
A $15\ \mathrm{kg}$ machine armature is balanced to $G \ 6.3$ for $3000\ \mathrm{rev / min}$ service. What residual unbalance is allowed, and what force does it produce at the bearings?

**Answer.** $U_{\mathrm{per}} = 301\ \mathrm{g \cdot mm}$, and at most $29.7\ \mathrm{N}$ of rotating force on the supports.

::: solution
$$
e_{\mathrm{per}} = \frac{ 9549 \times 6.3 }{ 3000 } = 20.1\ \mu \mathrm{m} \ , \qquad
U_{\mathrm{per}} = 15 \times 20.1 \times 10^{- 6 } = 3.01 \times 10^{- 4 }\ \mathrm{kg \cdot m} = 301\ \mathrm{g \cdot mm}
$$

The alternating force on the supports at $\omega = 314.16\ \mathrm{rad / s}$ is

$$
F = U_{\mathrm{per}} \, \omega^{ 2 } = 3.01 \times 10^{- 4 } \times 98{,}696 = 29.7\ \mathrm{N}
$$

shared between the two bearings (the permissible residual is usually split between the two correction planes). **And $301\ \mathrm{g \cdot mm}$ is a startlingly small number: it is $30\ \mathrm{g}$ at $10\ \mathrm{mm}$ radius, or $20\ \mathrm{g}$ — a couple of small screws — at $15\ \mathrm{mm}$.** That is the whole difficulty of balancing. The tolerance is comparable with the parts that are assembled onto the rotor, which is why a rotor should be balanced **in the configuration it will run in** — with its key, its fan and its fittings — or the effect of each added part accounted for.

**Note also what the grade does not say.** It says nothing about *resonance*. A rotor balanced to its grade but running at $3000\ \mathrm{rev / min}$ on supports with a natural frequency near $2800\ \mathrm{rev / min}$ will still vibrate strongly, because the grade limits the exciting force while the support's dynamic stiffness sets the response. **Balance quality and vibration level are related but not the same thing.**
:::
:::

::: exercise Correction-plane spacing {level=2 check="2.63"}
For the rotor of [[#ex-2plane]], compute the total correction mass at $r = 150\ \mathrm{mm}$ for correction planes at $z = 0.2$ and $0.3\ \mathrm{m}$, and divide by the total for planes at $z = 0.1$ and $0.4\ \mathrm{m}$ (give the ratio to two decimal places).

::: solution
From [[#ex-2plane]] the two cases give $2.267 + 2.083 = 4.350\ \mathrm{kg}$ and $0.906 + 0.745 = 1.651\ \mathrm{kg}$, so the ratio is

$$
\frac{ 4.350 }{ 1.651 } = \boxed{ 2.63 }
$$

**close to, but not equal to, the ratio of the plane separations, $0.30 / 0.10 = 3.0$**: the $1 / ( b - a )$ factor dominates, but the numerator $- M + a S$ also changes with the plane positions. Both rotors leave the machine perfectly balanced. The closely spaced one carries $2.7\ \mathrm{kg}$ more correction mass at $150\ \mathrm{mm}$ radius — more metal, larger opposed corrections that bend the rotor internally, and more to come loose. **This is why the correction-plane positions belong on the manufacturing drawing.**
:::
:::

## Balancing II: reciprocating masses, and the two-order problem

::: definition Primary and secondary inertia force {#def-primary}
A slider of reciprocating mass $m_R$ driven by a crank of radius $r$ and rod $l$ (write $n = l / r$) accelerates as

$$
a = r \omega^{ 2 } \left( \cos \theta + \frac{ \cos 2 \theta }{ n } + \cdots \right)
$$

(the series is truncated after the second harmonic, an excellent approximation for $n \ge 3$), so the inertia force the frame must react is the sum of two harmonics:

$$
\boxed{ \; F = \underbrace{ m_R r \omega^{ 2 } \cos \theta }_{ \textbf{primary} \; \equiv P } + \underbrace{ \frac{ m_R r \omega^{ 2 } }{ n } \cos 2 \theta }_{ \textbf{secondary} \; = P / n } \; }
$$

**The primary is what the reciprocating mass would experience if the rod were infinitely long; it is exactly the component, along the line of stroke, of the centrifugal force of the reciprocating mass imagined concentrated at the crankpin.** Most results below follow from that picture.

**The secondary exists only because the rod is finite**, is smaller by the rod ratio $n$, and runs at **twice** crank speed. A short rod ($n = 3$) has a secondary a third of its primary; a long rod ($n = 6$) has a sixth. A longer rod reduces the secondary, at the cost of a taller, heavier engine — one of the compromises behind every choice of rod ratio.
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

**You have traded along-stroke shake for across-stroke shake, and the worst case never goes below $0.5 P$.** The magnitude of the resultant is $\sqrt{ ( 1 - c ) ^{ 2 } P^{ 2 } \cos^{ 2 } \theta + c^{ 2 } P^{ 2 } \sin^{ 2 } \theta }$, which swings between $c P$ and $ ( 1 - c ) P $; the worst case is minimised at $c = 0.5$, where the resultant becomes a **rotating** force of constant magnitude $P / 2 = 5330\ \mathrm{N}$.

**That is the steam-locomotive compromise.** A locomotive with horizontal cylinders can only put balance weights in its driving wheels, so it balances a fraction of the reciprocating mass — typically around $40$–$50\ \%$ — and pays for it in **hammer blow**, the vertical component $c P \sin \theta$ of the wheel counterweights, which alternately loads and unloads the wheel against the rail and grows with the square of speed. (For the small engine of this example at $c = 0.6$ the cross-stroke amplitude would be $0.6 \times 10.66 = 6.4\ \mathrm{kN}$.)

**The full cure uses rotating masses only: two counter-rotating weights at crank speed, each of unbalance $m_R r / 2$, phased so that their components along the line of stroke add to cancel the primary while their components across it cancel each other.** No side force is created, and the primary disappears. Primary balance shafts of this kind are used on some single-cylinder engines; the same principle at twice crank speed cancels secondary forces, as in [[#ex-ic4]].
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

**So the inline four is fully balanced except for a single free force of $4 P / n$ oscillating along the cylinder axis at twice crank speed.** It has no unbalanced couple, no unbalanced rotating mass and no primary shake of any kind — and it still shakes, which is why many larger inline fours carry a pair of balance shafts.
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

**An oscillating force equal to the weight of four and a half tonnes, in an engine with no unbalanced rotating mass whatever.** Applied to a rigidly mounted $1200\ \mathrm{kg}$ car it would give $44\,608 / 1200 = 37\ \mathrm{m / s^2} = 3.8 \, g$; real engine mounts isolate most of it, but enough is transmitted to be felt and heard as a vibration at second engine order — $200\ \mathrm{Hz}$ at $6000\ \mathrm{rev / min}$, $67\ \mathrm{Hz}$ at $2000$ — which is how such complaints are diagnosed: by order, not by absolute frequency.

Two counter-rotating shafts driven at $2 \omega$ with unbalance $m_b r_b$ each produce a resultant along one fixed line of magnitude $2 m_b r_b ( 2 \omega )^{ 2 } = 8 m_b r_b \omega^{ 2 }$. Setting that against $4 P / n$:

$$
m_b r_b = \frac{ P }{ 2 n \omega^{ 2 } } = \frac{ 37{,}347 }{ 2 \times 3.35 \times 394{,}784 } = 1.41 \times 10^{- 2 }\ \mathrm{kg \cdot m} = \boxed{ 14.1 \ \mathrm{g \cdot m} \ \text{per shaft} }
$$

— for instance $0.35\ \mathrm{kg}$ at $40\ \mathrm{mm}$. **The unbalance is small; the cost is in the shafts, their drive, their bearings, their phasing tolerance and their friction**, all to cancel a force that is $1 / n$ of the (already cancelled) primary.

::: widget plot
title: Reciprocating inertia force per cylinder, primary plus secondary
f: 37347*(cos(x*pi/180)+cos(2*x*pi/180)/3.349)
x: 0, 360
y: -45000, 45000
caption: $P \cos \theta + ( P / n ) \cos 2 \theta$ for one cylinder of the engine above, in newtons against crank angle. **The waveform is not a sinusoid: the secondary makes the peak at top dead centre $48.5\ \mathrm{kN}$ and the trough at bottom dead centre only $26.2\ \mathrm{kN}$, and it shifts the zero crossings off $90^{\circ}$ and $270^{\circ}$.** The larger inertia force at top dead centre is one of the loads a connecting-rod and bearing calculation has to carry, especially at top dead centre of the exhaust stroke, where there is no gas pressure to oppose it.
:::

::: widget plot
title: Inline-four secondary force against engine speed
f: 4*37347/3.349*pow(x/6000,2)
x: 0, 7000
y: 0, 60000
caption: $4 ( P / n ) \propto \omega^{ 2 }$. **The secondary force is proportional to the square of engine speed and cannot be reduced by any amount of primary balancing.** At $3000\ \mathrm{rev / min}$ the force is $11.2\ \mathrm{kN}$, at $6000$ it is $44.6$, and at $7000$ it is $60.7$. **Doubling the speed quadruples the shake** — the same $\omega^{ 2 }$ scaling as in [[#ex-doubling]], but here working against the designer.
:::

**What the other layouts do.** The secondary problem is not peculiar to the four; it is a consequence of using opposed cranks to cancel a primary, and every layout is a different bargain:

| Layout | Primary force | Primary couple | Secondary force | Secondary couple |
|---|---|---|---|---|
| Inline 1 | ✗ $P$ | — | ✗ $P / n$ | — |
| Inline 2, cranks $180^{\circ}$ | ✓ | ✗ rocking | ✗ $2 P / n$ | ✓ |
| Inline 3, cranks $120^{\circ}$ | ✓ | ✗ | ✓ | ✗ |
| **Inline 4** | **✓** | **✓** | **✗ $4 P / n$** | **✓** |
| Inline 6 | ✓ | ✓ | ✓ | ✓ |

(V engines follow from the same sums applied to two cylinder banks; a $90^{\circ}$ crossplane V8, for instance, has a primary couple that rotates with the crank and can therefore be cancelled entirely by crankshaft counterweights, and no secondary force or couple.)

**The inline six satisfies all four primary and secondary conditions of [[#thm-inline]]**, which, together with its even firing, is why the straight six has a reputation for smoothness. **The inline three satisfies both force conditions but neither couple condition:** its primary rocking couple, which rotates with the crank, is usually reduced with crankshaft counterweights and, where needed, a single balance shaft running at crank speed.
:::
:::

::: exercise Balance-shaft unbalance for a press slide {level=3 check="33.8"}
A press slide of $450\ \mathrm{kg}$ reciprocating mass runs on a $150\ \mathrm{mm}$ throw at $240\ \mathrm{rev / min}$. (Take the crank radius as $r = 150\ \mathrm{mm}$.) What unbalance, in $\mathrm{kg \cdot m}$, must each of two counter-rotating primary balance shafts carry to cancel the slide's primary force?

::: solution
Two counter-rotating shafts at crank speed with unbalance $m_b r_b$ each give a resultant of $2 m_b r_b \omega^{ 2 }$ along the line of stroke, so

$$
2 m_b r_b \omega^{ 2 } = m_R r \omega^{ 2 } \quad \Longrightarrow \quad m_b r_b = \frac{ m_R r }{ 2 } = \frac{ 450 \times 0.150 }{ 2 } = \boxed{ 33.8 \ \mathrm{kg \cdot m} \ \text{per shaft} }
$$

**Notice that $\omega$ cancels: the required unbalance is a purely geometric quantity, $m_R r / 2$, and it does not depend on speed.** Compare the car engine's $14.1\ \mathrm{g \cdot m}$ (a secondary balancer for four cylinders needs $m_R r / ( 2 n )$ per shaft): here $m_R r$ is $67.5\ \mathrm{kg \cdot m}$ instead of $0.095$. **Thirty-four kilogram-metres per shaft is a counterweight comparable with the crankshaft itself.** At $240\ \mathrm{rev / min}$ the force it would cancel is $450 \times 0.150 \times 25.13^{2} = 42.6\ \mathrm{kN}$, which on a $6000\ \mathrm{kg}$ frame gives $7.1\ \mathrm{m / s^2}$ if unrestrained; the usual answer at this speed is a heavy frame bolted to a massive foundation, while high-speed presses use dynamic balancers (counter-moving masses) because the force grows as $\omega^{2}$.

**The design lesson: balance shafts or balancers are the natural answer when $m_R r$ is small or the speed is high, and a heavy frame and foundation when $m_R r$ is large and the speed is low.**
:::
:::

## The flywheel as a store: what it is for and where it beats a battery

::: definition Specific energy of a rotating store {#def-store}
A flywheel rim is a rotating pressure vessel. Write $v$ for rim speed; the hoop stress in a thin rim of density $\rho$ is $\sigma = \rho v^{ 2 }$, and the kinetic energy of a thin rim of mass $m$ is $K = \frac{ 1 }{ 2 } m v^{ 2 }$. Eliminate $v$:

$$
\boxed{ \; \frac{ K }{ m } = \frac{ \sigma }{ 2 \rho } \quad \text{(constant-strength rim, } \sigma = \text{allowable rim stress)} \; }
$$

**For a rim run at its allowable stress, the mass needed to store a given energy depends only on the material's specific strength — not on the speed, the diameter or the inertia separately.** Speed and diameter are how you *reach* the stress; the stress is what you are actually buying. (Solid discs and real shapes store less per kilogram than a thin rim, by a shape factor below one.)

| Material | Design stress $\sigma$ (illustrative) | $\rho$, $\mathrm{kg/m^3}$ | $K / m$ |
|---|---|---|---|
| Grey cast iron | $150\ \mathrm{MPa}$ | $7200$ | $10.4\ \mathrm{kJ / kg}$ |
| Nodular graphite iron | $300\ \mathrm{MPa}$ | $7100$ | $21.1\ \mathrm{kJ / kg}$ |
| Forged carbon steel | $400\ \mathrm{MPa}$ | $7800$ | $25.6\ \mathrm{kJ / kg}$ |
| $300\ \mathrm{M}$ steel | $1200\ \mathrm{MPa}$ | $7800$ | $76.9\ \mathrm{kJ / kg}$ |
| Ti-6Al-4V | $600\ \mathrm{MPa}$ | $4500$ | $66.7\ \mathrm{kJ / kg}$ |
| CFRP (epoxy) | $1500\ \mathrm{MPa}$ | $1800$ | $417\ \mathrm{kJ / kg}$ |
| **Lithium-ion cell** (about $250\ \mathrm{Wh / kg}$) | — | — | $\approx 900\ \mathrm{kJ / kg}$ |
| **Supercapacitor** (about $5$–$10\ \mathrm{Wh / kg}$) | — | — | $\approx 20$–$35\ \mathrm{kJ / kg}$ |

**A metal flywheel loses the energy-density argument to a lithium cell by more than an order of magnitude, and can win the power argument by a similar margin.** A steel rim storing $25.6\ \mathrm{kJ / kg}$ can give all of it back in one second, which is $25.6\ \mathrm{kW / kg}$ of rim; a lithium cell at $900\ \mathrm{kJ / kg}$ discharged at $1 \, C$ (in one hour) delivers $0.25\ \mathrm{kW / kg}$. **And a flywheel tolerates a very large number of full charge–discharge cycles, because no chemistry is consumed.**
:::

::: example How far a badly-placed flywheel is from an optimal one {#ex-store}
The punch-press flywheel of [[#ex-punch]] is $292\ \mathrm{kg}$ of cast iron storing $K = \Delta U / ( 2 C_s ) = 4800 / 0.30 = 16{,}000\ \mathrm{J}$. How much cast iron would a thin rim stressed to $150\ \mathrm{MPa}$ need?

**Answer.** $1.5\ \mathrm{kg}$ — the design is **about 190 times heavier than the material's strength requires.**

::: solution
Set the rim speed to the allowable stress, $\sigma = \rho v^{ 2 }$:

$$
v = \sqrt{ \frac{ 150 \times 10^{ 6 } }{ 7200 } } = 144\ \mathrm{m / s } \ , \qquad
m = \frac{ 2 K }{ v^{ 2 } } = \frac{ 2 \times 16{,}000 }{ 20{,}833 } = 1.54\ \mathrm{kg}
$$

The design runs its rim at $10.5\ \mathrm{m / s }$ and $0.79\ \mathrm{MPa}$ — **a flywheel using $0.5\ \%$ of the material's capability.** That is not an error; it is an economic choice, and it is worth being explicit about what the $290\ \mathrm{kg}$ of extra iron is buying:

- **Cost.** A sand-cast grey-iron rim at $10.5\ \mathrm{m / s }$ needs one pattern and one pour. A rim at $144\ \mathrm{m / s }$ needs a high-integrity forging or composite, precise balancing and a containment.
- **Windage.** Aerodynamic loss rises steeply with rim speed (roughly as $v^{3}$), so high-speed storage flywheels run in a vacuum; at $10.5\ \mathrm{m / s }$ windage is negligible and the enclosure is a sheet-steel guard.
- **Bearings.** The rim's centrifugal load is carried internally, as hoop stress; the bearings see the weight and the residual unbalance force $U \omega^{ 2 }$, both modest at low speed.
- **Failure.** A rim that bursts at $144\ \mathrm{m / s }$ throws fragments at about that speed. At $10.5\ \mathrm{m / s }$ the hazard is far smaller. **The speed of a flywheel is a safety specification before it is an efficiency one.**

**The summary is that a machine flywheel is sized by cost, space and safety, and only loosely by $\sigma / 2 \rho$.** Energy-storage flywheels — grid frequency regulation, kinetic-energy recovery in vehicles — sit at the other extreme: fast composite or high-strength-steel rotors in vacuum, chosen where energy must be taken in and given out at high power many times over.
:::
:::

::: quiz
A machine's cycle requires $800\ \mathrm{J}$ more than the motor supplies during its working stroke, and gives it back afterwards. Two designs run the same machine at $1500$ and $3000\ \mathrm{rev / min}$ with the same $C_s$. The flywheel inertia at $1500\ \mathrm{rev / min}$ is:

- [ ] The same, because $\Delta U$ is the same
- [x] Four times as large, because $I_f \propto 1 / \omega^{ 2 }$
- [ ] Twice as large, because $I_f \propto 1 / \omega$
- [ ] Smaller, because the cycle is shorter

::: solution
**Four times as large.** $I_f = \Delta U / ( \omega^{ 2 } C_s )$ with $\Delta U$ and $C_s$ fixed gives $I_f \propto 1 / \omega^{ 2 }$, and halving the speed quadruples the inertia. The stored energy needed, $K = \Delta U / ( 2 C_s )$, is the same in both designs; but at the lower speed a rim of practical diameter runs far below its allowable stress, so the extra inertia is paid for in mass and diameter. **The corollary is the design rule that the flywheel belongs on a fast shaft**, as in [[#ex-geareq]] and [[#sec-design]].
:::
:::

::: quiz
A rotor leaves the balancing shop statically balanced and dynamically out. The supports therefore feel:

- [ ] A rotating force with no couple
- [x] A rotating couple with no resultant force
- [ ] A force at twice running speed
- [ ] Nothing, because static balance is what matters at low speed

::: solution
**A rotating couple with no resultant force.** $\sum U_i \ne 0$ is a force; $\sum U_i = 0$ with $\sum z_i U_i \ne 0$ is a pure couple, and a pure couple is what two equal and opposite unbalances in different planes produce. **The two bearings are pushed in opposite directions, so the machine rocks rather than translating; a single-plane (static) balancing check cannot detect it.** The remedy is the two-plane correction of [[#deriv-2plane]], and the diagnosis needs measurements at both bearings.
:::
:::

## Design: the drive for a blanking press {#sec-design}

::: example Design exercise: 250 kN blanking press, 90 strokes / min {#ex-design level=4}
**Specification.** A blanking press cuts $250\ \mathrm{kN}$ over a $15\ \mathrm{mm}$ working stroke, $90$ strokes per minute, one revolution of the crank per stroke. The cutting occupies $100^{\circ}$ of crank angle. The slide and upper tooling have $380\ \mathrm{kg}$ of reciprocating mass on a $250\ \mathrm{mm}$ stroke (crank radius $125\ \mathrm{mm}$) with a $500\ \mathrm{mm}$ rod. The motor runs at $1500\ \mathrm{rev / min}$. Frame mass $3500\ \mathrm{kg}$. Specify the motor, the flywheel and where to put it, and check the shaking force.

**Solution: the energy.** Work per stroke $= 250 \times 10^{ 3 } \times 0.015 = 3750\ \mathrm{J}$. Cycle $60 / 90 = 0.667\ \mathrm{s}$, so the **mean** power is $5.63\ \mathrm{kW}$ and the **peak** power, if the motor had to carry the cut alone, is $3750 / ( 0.667 \times 100 / 360 ) = 20.3\ \mathrm{kW}$. Take a $7.5\ \mathrm{kW}$ motor and let the flywheel carry the difference — a $2.7$-fold reduction in motor rating for the price of a disc of iron.

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

**Take the motor-speed shaft.** The flywheel is a nodular-iron rim of $0.15\ \mathrm{m}$ mean radius, $61\ \mathrm{kg}$, at a rim stress about $1 / 75$ of a $300\ \mathrm{MPa}$ design stress, and the reduction from $1524\ \mathrm{kg}$ to $61\ \mathrm{kg}$ cost nothing but a speed ratio — **$I \propto 1 / \omega^{ 2 }$, so a $16.7 : 1$ speed ratio divides the required inertia by $278$.** (The mass falls by less, $25 : 1$, because the faster rim is also smaller.) The rim stress rises from $0.16$ to $4.0\ \mathrm{MPa}$ and is still negligible; in practice the flywheel is usually carried on its own shaft and bearings (often as the large pulley of the belt drive) rather than overhung on the motor.

**Solution: the shaking force.** Primary $= m_R r \omega^{ 2 } = 380 \times 0.125 \times 9.425^{ 2 } = 4219\ \mathrm{N}$ at $1.5\ \mathrm{Hz}$; secondary $= 4219 / 4 = 1055\ \mathrm{N}$ at $3\ \mathrm{Hz}$. On a free $3500\ \mathrm{kg}$ frame the primary would give $1.2\ \mathrm{m / s^2 } = 0.12 \, g$; bolted to a foundation, it is a $4.2\ \mathrm{kN}$ alternating load on the anchor bolts.

**Specify no balance shafts.** The balance-shaft unbalance required would be $m_R r / 2 = 23.8\ \mathrm{kg \cdot m}$ per shaft — a counterweight as large as the crank's — to cancel a $4.2\ \mathrm{kN}$ force at $1.5\ \mathrm{Hz}$, far below any structural resonance of the frame, which therefore responds quasi-statically. **The shaking force is not this machine's problem; the $250\ \mathrm{kN}$ process load, the frame's deflection under it, and the speed drop during the cut are.** Check which term dominates before you buy anything.

**Solution: what to check next.**
1. **The rms motor torque, not just the mean.** The mean motor torque is $5625 / 157.08 = 35.8\ \mathrm{N \cdot m}$, $75\ \%$ of the $7.5\ \mathrm{kW}$ motor's rated $47.7\ \mathrm{N \cdot m}$. With an ideal flywheel the motor torque would stay at the mean; without one it would have to supply the cutting torque $2149 / 16.67 = 129\ \mathrm{N \cdot m}$ for $100^{\circ}$ of each cycle, an rms of $129 \sqrt{ 100 / 360 } = 68\ \mathrm{N \cdot m}$. A real induction motor, whose torque rises as it slows, lies between the two, so **check the rms torque against the rating and the peak against the motor's breakdown torque.**
2. **The slide's own $J_{\mathrm{eq}}$.** Referred to the crank, the slide contributes $m_R r^{2} u^{2} = 5.94\, u^{2}\ \mathrm{kg \cdot m^2}$, whose steepest slope is $7.5\ \mathrm{kg \cdot m^2 / rad}$; at $90\ \mathrm{rev / min }$ the gradient torque of [[#deriv-dJ]] therefore peaks at $\frac{ 1 }{ 2 } \times 7.5 \times 9.425^{ 2 } = 333\ \mathrm{N \cdot m}$ at the crank — about $15\ \%$ of the cutting torque, worth including in the turning-moment diagram but not design-changing. It grows as $\omega^{2}$, so a faster press would have to take it seriously.
3. **The clutch and brake.** The flywheel is on the motor side of the clutch, so the clutch must transmit the cutting torque ($2149\ \mathrm{N \cdot m}$ referred to the crank) and the brake must stop the slide with the flywheel still spinning at $1500\ \mathrm{rev / min }$ — see [[#warn-flywheel]].
4. **The flywheel guard.** $61\ \mathrm{kg}$ at $23.6\ \mathrm{m / s }$ stores $\frac{1}{2} \times 61 \times 23.6^{2} = 17\ \mathrm{kJ}$.
:::

::: history
| | |
|---|---|
| **1781–1788 — Boulton & Watt rotative engines** | Watt's 1781 patent for the sun-and-planet gear let the beam engine turn a shaft, and the rotative engines that followed drove mills through a heavy flywheel that carried them between power strokes. In 1788 Watt added the centrifugal (conical-pendulum) governor, suggested by Boulton — the first widely used speed regulator, and a reminder that a flywheel smooths speed within a cycle while a governor controls the mean. |
| **1907 — Lanchester's balance shaft** | Frederick W. Lanchester invented and patented the balance shaft: two shafts carrying equal eccentric weights, turning in opposite directions at twice engine speed, which cancel the second-order free force of an inline four. |
| **1920s — the Bridge Stress Committee** | The British government's Bridge Stress Committee investigated the effect of locomotive hammer blow on railway bridges, and its findings encouraged better balancing of the reciprocating parts of steam locomotives. |
| **1953 — the gyrobus** | Oerlikon's flywheel-powered gyrobus entered commercial service in October 1953 between Yverdon-les-Bains and Grandson in Switzerland, recharging its flywheel through roof booms at stops. |
| **1975 — balance shafts in production** | Mitsubishi's Astron 80 inline-four, introduced in 1975, put Lanchester's twin balance shafts into volume production, with one shaft mounted higher than the other to counter a second-order rolling couple as well. |
| **2003 — ISO 1940-1** | The international balance-quality standard for rigid rotors, specifying permissible residual unbalance through the grade $G = e_{\mathrm{per}} \omega$; it has since been replaced by ISO 21940-11. |
| **2011–2012 — flywheels for the grid and the track** | Beacon Power's $20\ \mathrm{MW}$ flywheel frequency-regulation plant at Stephentown, New York, was built to come on line in 2011, and in 2012 the Audi R18 e-tron quattro, using a flywheel energy store supplied by Williams, won the Le Mans 24 Hours. |
:::

::: summary
- **Inertia is counted where it is, not where the shaft is.** $J_{\mathrm{eq}} ( \theta ) = \sum [ m_i ( v_{Gi} / \omega )^{ 2 } + I_{Gi} ( \omega_i / \omega )^{ 2 } ]$, and it reflects through a gear train as the **square** of the ratio — which is why a flywheel belongs on a fast shaft.
- **The equation of motion of a linkage is $T = J_{\mathrm{eq}} \alpha + \frac{ 1 }{ 2 } ( \mathrm{d} J_{\mathrm{eq} } / \mathrm{d} \theta ) \omega^{ 2 }$, and the second term is present at constant speed.** For the example slider-crank at $3000\ \mathrm{rev / min}$ it peaks at over a hundred times the mean useful torque.
- **A flywheel is sized by $\Delta U$, not by peak torque:** $I_f = \Delta U / ( \omega^{ 2 } C_s )$, with $C_s$ a specification ($0.005$ for a generator set, $0.15$ for a press) and $\Delta U$ read off the turning-moment diagram as the vertical extent of the cumulative-energy curve.
- **A flywheel reduces peak power, never peak force.** The crank, gears and frame are sized by the peak torque, and the brake must stop the machine with the flywheel still at speed.
- **The mass of a thin rim for a given stored energy, at its allowable stress, is $2 K \rho / \sigma$ and does not depend on speed.** Machine flywheels are far heavier than that because they are cheap, slow and safe — and that trade is usually the right one.
- **Dynamic balance needs two planes because it is four scalar conditions:** $\sum U_i = 0$ and $\sum z_i U_i = 0$. A statically balanced long rotor can still carry an unbalanced couple.
- **The correction mass scales roughly as $1 / ( b - a )$, the separation of the correction planes.** Choosing them badly cost a factor of $3.9$ in metal in the example and nothing at all in residual balance — so the plane positions go on the drawing.
- **A balance grade is a velocity:** $e_{\mathrm{per}} \omega = G\ \mathrm{mm / s}$, so $e_{\mathrm{per}} = 9549 G / n$ micrometres. $G 6.3$ at $3000\ \mathrm{rev / min }$ is $20\ \mu \mathrm{m}$, which on a $15\ \mathrm{kg}$ rotor is $301\ \mathrm{g \cdot mm}$.
- **The primary inertia force $m_R r \omega^{ 2 } \cos \theta$ is the along-stroke component of an imaginary rotating mass at the crankpin; the secondary is $1 / n$ of it at twice crank speed, and exists because the rod is finite.** Cancelling a primary with opposed cranks puts the secondaries in phase.
- **The inline four is balanced in primary force, primary couple and secondary couple, and carries $4 P / n$ of free secondary force** — $44.6\ \mathrm{kN}$ at $6000\ \mathrm{rev / min }$ — which two shafts carrying $14.1\ \mathrm{g \cdot m }$ each will remove. **Whether to remove it is a cost decision, and on a $90\ \mathrm{rev / min }$ press the answer is no.**
:::

## Further reading

- **R. L. Norton, *Design of Machinery*, 5th ed. (McGraw-Hill, 2012)** — dynamic force analysis, flywheels, shaking forces, and the balancing of linkages and multi-cylinder engines, with many worked examples.
- **J. J. Uicker, G. R. Pennock and J. E. Shigley, *Theory of Machines and Mechanisms*, 5th ed. (Oxford University Press, 2017)** — equivalent systems, the turning-moment diagram and flywheel sizing, and rotor and engine balancing.
- **B. Paul, *Kinematics and Dynamics of Planar Machinery* (Prentice-Hall, 1979)** — a rigorous treatment of the dynamics of single-degree-of-freedom machines, including the configuration-dependent equivalent inertia.
- **S. H. Crandall, D. C. Karnopp, E. F. Kurtz and D. C. Pridmore-Brown, *Dynamics of Mechanical and Electromechanical Systems* (McGraw-Hill, 1968)** — energy methods and the equivalent-inertia formulation, from which the $\frac{ 1 }{ 2 } \omega^{ 2 } \, \mathrm{d} J / \mathrm{d} \theta$ term follows naturally.
- **I. I. Artobolevsky, *Mechanisms in Modern Engineering Design* (Mir)** — a multi-volume catalogue of mechanisms, including balancing devices and flywheel arrangements.
- **ISO 21940-11, *Mechanical vibration — Rotor balancing — Part 11: Procedures and tolerances for rotors with rigid behaviour*** — the current form of the ISO 1940-1 balance-quality grades; the explanatory annexes on choosing a grade are worth reading.
