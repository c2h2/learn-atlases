The work–energy principle is the integral of Newton's second law along the path, and it converts a differential equation into an algebraic one. Where $\sum \mathbf{F} = m \mathbf{a}$ gives you the acceleration and then requires two integrations to reach a position, the energy equation gives you speed as a function of position in a single line — provided the forces do work you can compute and provided you do not need the time or the direction of the acceleration.

That proviso is the whole discipline of the method. Energy will not tell you the tension in a rod, the normal force on a track, the shape of a trajectory or how long anything took; it will tell you the speed at the bottom of a hill, the deflection of a spring and the height a projectile reaches. Knowing which question you are being asked, and therefore which principle to write down, is most of what solving a dynamics problem actually involves.

::: warning Energy is a scalar, and that is both its power and its limitation
The work–energy equation
$$
T_1 + \sum U_{1 \rightarrow 2} = T_2
$$
is **one** scalar equation. It cannot replace two or three components of $\sum \mathbf{F} = m \mathbf{a}$, and a problem that asks for a force needs a force equation even if energy has already given the speed. Two specific traps: the work of a force **perpendicular** to the motion is zero however large the force, so the normal force, the tension in an inextensible cable and the reaction at a pin do no work and never appear; and the work of friction is **not** path-independent, so it cannot be moved to the left-hand side as a potential energy.
:::

## Work, energy and power

::: definition Work and kinetic energy {#def-work}
The work done by a force as its point of application moves from $1$ to $2$ is
$$
U_{1 \rightarrow 2} = \int_1^2 \mathbf{F} \cdot \mathrm{d} \mathbf{r} .
$$
For the standard forces:
$$
U_{\text{weight}} = - mg \left( z_2 - z_1 \right), \quad
U_{\text{spring}} = - \tfrac{1}{2} k \left( s_2^{2} - s_1^{2} \right), \quad
U_{\text{const. force}} = F d \cos \alpha ,
$$
and the kinetic energy is $T = \tfrac{1}{2} m v^{2}$. The **work–energy principle** is
$$
T_1 + \sum U_{1 \rightarrow 2} = T_2 .
$$
**Power** is the rate of work,
$$
P = \mathbf{F} \cdot \mathbf{v} = \mathbf{M} \cdot \boldsymbol{\omega} = \frac{\mathrm{d} U}{\mathrm{d} t} ,
$$
so a force of $1\ \mathrm{kN}$ moving at $1\ \mathrm{m / s}$ is $1\ \mathrm{kW}$ whatever the mass or the acceleration.
:::

::: proof The work–energy principle {#proof-work-energy}
Take the tangential equation of motion $\sum F_t = m \, \mathrm{d} v / \mathrm{d} t$ and multiply by the displacement $\mathrm{d} s = v \, \mathrm{d} t$:
$$
\sum F_t \, \mathrm{d} s = m v \, \mathrm{d} v = \mathrm{d} \left( \tfrac{1}{2} m v^{2} \right) .
$$
Integrating from state 1 to state 2,
$$
\int_1^2 \sum F_t \, \mathrm{d} s = \tfrac{1}{2} m v_2^{2} - \tfrac{1}{2} m v_1^{2} .
$$
The left side is the total work, since $\mathbf{F} \cdot \mathrm{d} \mathbf{r} = F_t \, \mathrm{d} s$; forces with no tangential component contribute nothing, which is why normal forces, pin reactions and the tension of an inextensible cable over a fixed pulley drop out automatically.

*Note what the proof assumes.* Only that the mass is constant and that the equation of motion holds in an inertial frame. It says nothing about the nature of the forces, so it is valid for friction, for drag, for time-varying forces and for forces that depend on velocity. What it cannot do is recover the **vector** information lost in the dot product: two very different force systems producing the same net work produce the same final speed and completely different accelerations.
:::

::: example Spring deflection under impact {#ex-spring-impact}
A $20\ \mathrm{kg}$ collar is dropped from a height of $100\ \mathrm{mm}$ onto a spring of stiffness $4\ \mathrm{kN / m}$. Find the maximum deflection. What changes if the collar is lowered gently onto the spring, and if it is released just touching it?
::: solution
Take the datum at the collar's initial position and let $\delta$ be the maximum deflection. The collar falls $h + \delta$ and the spring takes up $\tfrac{1}{2} k \delta^{2}$, with zero kinetic energy at both ends:
$$
m g \left( h + \delta \right) = \tfrac{1}{2} k \delta^{2}
\quad\Longrightarrow\quad
k \delta^{2} - 2 m g \delta - 2 m g h = 0 ,
$$
$$
\delta = \frac{m g + \sqrt{ \left( m g \right)^{2} + 2 k m g h}}{k}
= \frac{196.2 + \sqrt{38\,490 + 156\,960}}{4000} = 0.1596\ \mathrm{m} = 160\ \mathrm{mm}.
$$
**Lowered gently:** the deflection is the static value $\delta_{\text{st}} = m g / k = 49.1\ \mathrm{mm}$.
**Released just touching** ($h = 0$): $\delta = 2 m g / k = 98.1\ \mathrm{mm} = 2 \delta_{\text{st}}$.

*Check.* At maximum deflection the spring force is $4000 \times 0.1596 = 638\ \mathrm{N}$ against a weight of $196\ \mathrm{N}$, a ratio of $3.25$. The collar is then accelerating upwards at $\left( 638 - 196 \right) / 20 = 22.1\ \mathrm{m / s^{2}}$, more than twice $g$ — which is exactly what it must be, since it has to be brought up from rest again. $\checkmark$

*Sanity.* The factor of two between "lowered gently" and "released from touching" is the reason a bolted joint tightened to a torque carries a very different preload from one loaded by a falling weight, and the reason a spring supporting a load must be designed for **twice** the static deflection if the load can ever be dropped onto it. The $160\ \mathrm{mm}$ of the dropped case is $3.25$ times the static deflection, and had the drop height been $1\ \mathrm{m}$ instead of $0.1\ \mathrm{m}$ it would be $10.4$ times. Impact design is therefore not a matter of adding a safety margin to a static calculation but of recognising that the multiplier grows as $\sqrt{h}$ without limit — which is why a lifting beam is never allowed to be loaded by a slack strop taken up suddenly, and why the standard says the load must be picked up smoothly.
:::
:::

::: widget plot
f: (196.2+sqrt(38494+1569.6*x))/4
x: 0, 400
y: 50, 300
labels: \text{maximum spring deflection } \left( \mathrm{mm} \right)
caption: Maximum deflection of the $4\ \mathrm{kN / m}$ spring under a $20\ \mathrm{kg}$ collar dropped from $x\ \mathrm{mm}$, against the drop height. The curve starts at $98\ \mathrm{mm}$ — twice the static deflection, for zero drop height — and rises as $\sqrt{h}$, reaching $253\ \mathrm{mm}$ at a drop of $400\ \mathrm{mm}$. The **square-root** shape is the reason a small increase in drop height is treated so seriously in lifting operations and so lightly in static design: doubling the height from $100$ to $200\ \mathrm{mm}$ raises the deflection from $160$ to $198\ \mathrm{mm}$, and the peak spring force rises with it.
:::

## Conservative forces, potential and stability

::: definition Conservative forces and potential energy {#def-potential}
A force is **conservative** if its work is path-independent, equivalently if its work round every closed path is zero. Then there is a potential energy $V$ with
$$
F_x = - \frac{\partial V}{\partial x}, \qquad
U_{1 \rightarrow 2} = - \left( V_2 - V_1 \right),
$$
and the **conservation of mechanical energy** holds:
$$
T_1 + V_1 = T_2 + V_2 .
$$
Weight and spring force are conservative; a constant force $F$ has $V = - F x$; friction, drag and an applied torque that is not a function of position are not.
:::

::: proposition Equilibrium and stability from the potential {#prop-stability}
A system with one degree of freedom is in equilibrium where
$$
\frac{\mathrm{d} V}{\mathrm{d} q} = 0 ,
$$
and the equilibrium is **stable** if $\mathrm{d}^{2} V / \mathrm{d} q^{2} > 0$, **unstable** if $< 0$, and **neutral** if the second derivative vanishes while higher even-order terms decide. For small oscillations about a stable equilibrium the natural frequency is
$$
\omega_n = \sqrt{\frac{1}{m_{\text{eff}}} \frac{\mathrm{d}^{2} V}{\mathrm{d} q^{2}} } .
$$
:::

::: example Particle in a potential {#ex-potential}
A particle is constrained to the $x$-axis and subject to a conservative force with potential $V \left( x \right) = x^{3} - 3 x$ joules, $x$ in metres. Find the equilibria and their stability, and describe the motion for total energies of $- 1.5$, $+ 2.0$ and $+ 2.5\ \mathrm{J}$.
::: solution
$$
\frac{\mathrm{d} V}{\mathrm{d} x} = 3 x^{2} - 3 = 0 \quad\Longrightarrow\quad x = \pm 1 ,
$$
$$
\frac{\mathrm{d}^{2} V}{\mathrm{d} x^{2}} = 6 x
\quad\Longrightarrow\quad
\begin{cases} x = + 1: & V = - 2\ \mathrm{J}, \; V'' = + 6 > 0 \;\text{stable} \ x = - 1: & V = + 2\ \mathrm{J}, \; V'' = - 6 < 0 \;\text{unstable} \end{cases}
$$
**$E = - 1.5\ \mathrm{J}$:** the particle is trapped in the well at $x = + 1$, oscillating between the two roots of $x^{3} - 3 x = - 1.5$, namely $x = 0.597$ and $x = 1.302$. It cannot reach $x < 0.597$ because $V$ there exceeds $E$.
**$E = + 2.0\ \mathrm{J}$:** the particle can reach the top of the barrier at $x = - 1$ asymptotically; this is the **separatrix**, and the period tends to infinity as $E$ approaches it.
**$E = + 2.5\ \mathrm{J}$:** the particle passes over the barrier and escapes to $x \rightarrow - \infty$, since $V \rightarrow - \infty$; if it comes from $- \infty$ it slows, climbs the barrier, and is reflected back if $E < 2$.

*Sanity.* The picture — a well, a barrier, a separatrix, escape — is the picture of every one-degree-of-freedom conservative system: a molecule in a Lennard-Jones well, a pendulum below and above the horizontal, a mass on a snap-through buckle, a rocket below and above escape velocity. Reading a $V \left( q \right)$ curve is a skill worth more than the algebra that produced it, because the curve answers the qualitative questions — is it stable, can it escape, what is the critical energy — without a single integration.
:::
:::

::: proof Force from a potential, and the stability criterion {#proof-from-potential}
If the work is path-independent, define
$$
V \left( \mathbf{r} \right) = - \int_{\mathbf{r}_0}^{\mathbf{r}} \mathbf{F} \cdot \mathrm{d} \mathbf{r} ,
$$
with the integral taken along any path. Then for a displacement $\mathrm{d} \mathbf{r}$,
$$
\mathrm{d} V = - \mathbf{F} \cdot \mathrm{d} \mathbf{r}
= - \left( F_x \, \mathrm{d} x + F_y \, \mathrm{d} y + F_z \, \mathrm{d} z \right) ,
$$
and since $\mathrm{d} V = \left( \partial V / \partial x \right) \mathrm{d} x + \cdots$, comparison gives
$$
\mathbf{F} = - \nabla V .
$$
Path-independence requires the mixed partials to agree, so $\partial F_x / \partial y = \partial F_y / \partial x$ and its cyclic partners, that is $\nabla \times \mathbf{F} = \mathbf{0}$ — the test for a conservative force.

**Stability.** For one degree of freedom, expand about an equilibrium $q_0$ where $V' \left( q_0 \right) = 0$:
$$
V \left( q \right) = V \left( q_0 \right) + \tfrac{1}{2} V'' \left( q_0 \right) \left( q - q_0 \right)^{2} + \cdots ,
$$
so the energy integral $T + V = E$ becomes
$$
\tfrac{1}{2} m_{\text{eff}} \dot{q}^{2} + \tfrac{1}{2} V'' \left( q_0 \right) \left( q - q_0 \right)^{2} = \text{constant} .
$$
If $V'' > 0$ this is the energy integral of a simple harmonic oscillator with $\omega_n^{2} = V'' / m_{\text{eff}}$, and the motion is bounded: the equilibrium is **stable**. If $V'' < 0$ the "spring" is negative, the solution is exponential, and the equilibrium is **unstable**. If $V'' = 0$ the quadratic term carries no information and the sign of the first non-vanishing even-order derivative decides — which is why a flat-topped potential is called **neutral** only when every derivative vanishes, as it does for a particle on a horizontal plane.
:::

::: example Spring-launched plunger {#ex-plunger}
A $3\ \mathrm{kg}$ component is launched up a $25^{\circ}$ chute by a spring of stiffness $1.2\ \mathrm{kN / m}$ released from a compression $\delta$. The kinetic friction coefficient is $0.22$ and the component must travel $600\ \mathrm{mm}$ along the chute before stopping. Find $\delta$, and the speed at which it leaves the spring.
::: solution
Take the state at maximum compression and the state at the point of stopping. The spring does work $\tfrac{1}{2} k \delta^{2}$, gravity $- m g \sin\theta \left( s + \delta \right)$ and friction $- \mu m g \cos\theta \left( s + \delta \right)$, where $s = 0.6\ \mathrm{m}$ is the travel **after** leaving the spring. Both end states have zero kinetic energy:
$$
\tfrac{1}{2} k \delta^{2} = \left( m g \sin\theta + \mu m g \cos\theta \right) \left( s + \delta \right) ,
$$
$$
600 \delta^{2} = \left( 29.43 \times 0.4226 + 0.22 \times 29.43 \times 0.9063 \right) \left( 0.6 + \delta \right)
= 18.31 \left( 0.6 + \delta \right) ,
$$
$$
600 \delta^{2} - 18.31 \delta - 10.99 = 0
\quad\Longrightarrow\quad
\delta = \frac{18.31 + \sqrt{335 + 26\,366}}{1200} = 0.151\ \mathrm{m}.
$$
**Speed on leaving the spring.** Apply the energy equation between maximum compression and the natural length, over a distance $\delta$:
$$
\tfrac{1}{2} m v^{2} = \tfrac{1}{2} k \delta^{2} - 20.06 \delta
= 0.5 \times 1200 \times 0.02293 - 18.31 \times 0.1514 = 13.76 - 2.77 = 10.99\ \mathrm{J},
$$
$$
v = \sqrt{2 \times 10.99 / 3} = 2.71\ \mathrm{m / s}.
$$
*Check.* The remaining $18.31 \times 0.6 = 10.99\ \mathrm{J}$ is exactly dissipated over the $600\ \mathrm{mm}$ run, bringing the component to rest as required. $\checkmark$

*Sanity.* Note that the spring must supply $13.8\ \mathrm{J}$ of which only $11.0\ \mathrm{J}$, $80$ per cent, reaches the travel — the rest is spent pushing the component up the incline while the spring is still acting. That is why a pneumatic or spring stop is nearly always **over-travelled** in the design sense and why the practical way to set the stroke is to specify the terminal condition and solve for the compression, as here, rather than to guess a compression and check. It is also why a real feeder has an adjustable mechanical stop rather than an adjustable spring preload: the answer is far more sensitive to $\delta$ than to $k$, since $\partial \delta / \partial s \approx 0.11$ while a $10$ per cent error in $k$ moves the required compression by only $5$ per cent.
:::
:::

::: example Belt conveyor starting load {#ex-belt-energy}
A belt conveyor $120\ \mathrm{m}$ long carries $40\ \mathrm{kg / m}$ of material and has an empty-line resistance of $180\ \mathrm{N}$ per metre of belt at any speed. It runs at $2.5\ \mathrm{m / s}$ up a $12\ \mathrm{m}$ lift. Find the driving power at steady speed, and the extra power needed to bring the $1500\ \mathrm{kg}$ belt-and-load system up to speed in $8\ \mathrm{s}$.
::: solution
**Steady power.** The resistive force is
$$
F = 180 \times 120 + 40 \times 9.81 \times 120 \times \sin\theta, \qquad
\sin\theta = \frac{12}{120} = 0.1 ,
$$
$$
F = 21\,600 + 4709 = 26\,309\ \mathrm{N}, \qquad
P = F v = 26\,309 \times 2.5 = 65.8\ \mathrm{kW}.
$$
**Acceleration.** The kinetic energy to be supplied is
$$
\Delta T = \tfrac{1}{2} \times 1500 \times 2.5^{2} = 4688\ \mathrm{J},
$$
delivered over $8\ \mathrm{s}$ at an average rate of $586\ \mathrm{W}$, but the **peak** at the end of the run is
$$
P_{\text{acc}} = \frac{2 \Delta T}{t} = 1172\ \mathrm{W} = 1.2\ \mathrm{kW}.
$$
**Total** $65.8 + 1.2 = 67.0\ \mathrm{kW}$ at the belt, or $67.0 / 0.9 = 74.4\ \mathrm{kW}$ at the motor shaft with $90$ per cent drive efficiency.

*Sanity.* The acceleration term is $1.8$ per cent of the steady load and can be ignored — which is the general rule for long conveyors, where the running resistance over hundreds of metres dwarfs the kinetic energy of the line. The opposite is true of a **short** high-speed line: a $2\ \mathrm{m}$ packaging conveyor with $20\ \mathrm{kg}$ of product at $3\ \mathrm{m / s}$ carries $90\ \mathrm{J}$ of kinetic energy against a friction load of a few newtons, so its acceleration term dominates and its motor is sized on the start, not the run. Getting that ratio backwards is a common and expensive error, and it is why conveyor motors are rated on the steady load with a service factor while packaging-machine motors are rated on the worst-case acceleration.
:::
:::

## Power and its losses

::: example Vehicle power {#ex-vehicle-power}
A car of mass $1400\ \mathrm{kg}$ has $C_D = 0.32$, frontal area $2.1\ \mathrm{m^{2}}$ and a rolling-resistance coefficient of $0.012$. Find the power to the wheels on a $5$ per cent grade at $50$ and at $130\ \mathrm{km / h}$, taking $\rho = 1.2\ \mathrm{kg / m^{3}}$.
::: solution
The three resisting forces are
$$
F_r = \mu_r m g \cos \theta = 0.012 \times 1400 \times 9.81 \times 0.9988 = 165\ \mathrm{N},
$$
$$
F_g = m g \sin \theta = 1400 \times 9.81 \times 0.05 = 687\ \mathrm{N},
$$
$$
F_a = \tfrac{1}{2} \rho C_D A v^{2} = 0.403 \, v^{2} .
$$
**At $50\ \mathrm{km / h}$** ($13.9\ \mathrm{m / s}$): $F_a = 78\ \mathrm{N}$, total $929\ \mathrm{N}$,
$$
P = 929 \times 13.9 = 12.9\ \mathrm{kW}.
$$
**At $130\ \mathrm{km / h}$** ($36.1\ \mathrm{m / s}$): $F_a = 526\ \mathrm{N}$, total $1377\ \mathrm{N}$,
$$
P = 1377 \times 36.1 = 49.7\ \mathrm{kW}.
$$
*Sanity.* The speed ratio is $2.6$ and the power ratio $3.85$. Rolling and grade together cost $9.5\ \mathrm{kW}$ at both speeds, so the extra $40\ \mathrm{kW}$ at $130\ \mathrm{km / h}$ is almost entirely aerodynamic, and aerodynamic drag grows as $v^{3}$ in power. That is the arithmetic behind every fuel-economy figure: a car that does $6\ \mathrm{l / 100\ km}$ at $90\ \mathrm{km / h}$ does about $8.5$ at $130$, and the reason is not the engine but the $v^{3}$. It is also why an electric car's range collapses on a motorway and barely changes in traffic, and why a ship's powering goes as $v^{3}$ too — with the additional cruelty that the wave-making component grows faster still.
:::
:::

::: example Hoist motor sizing {#ex-hoist-power}
A hoist raises a $2500\ \mathrm{kg}$ cage at a steady $1.2\ \mathrm{m / s}$ with an acceleration of $1.0\ \mathrm{m / s^{2}}$ at the start. The rope-and-drum efficiency is $92$ per cent and the motor efficiency $90$ per cent. Size the motor.
::: solution
**Starting condition** governs:
$$
F = m \left( g + a \right) = 2500 \times 10.81 = 27.0\ \mathrm{kN},
$$
$$
P_{\text{rope}} = F v = 27\,025 \times 1.2 = 32.4\ \mathrm{kW},
$$
$$
P_{\text{motor output}} = \frac{32.4}{0.92} = 35.3\ \mathrm{kW}, \qquad
P_{\text{electrical input}} = \frac{35.3}{0.90} = 39.2\ \mathrm{kW}.
$$
**Cruising condition:** $F = 24.5\ \mathrm{kN}$, $P_{\text{rope}} = 29.4\ \mathrm{kW}$, motor output $32.0\ \mathrm{kW}$.

*Sanity.* A $37\ \mathrm{kW}$ motor would be selected on the **starting** load, but a hoist motor is not sized on the continuous rating alone: the acceleration lasts a few seconds and a motor may be overloaded by $50$ to $100$ per cent for that long, so a $30\ \mathrm{kW}$ continuous motor with a $1.75$ service factor is often correct. The duty class — S3 with a $40$ per cent duty cycle in this case — is what determines the choice, and a motor selected on the steady running load will trip on the first start of every cycle. That mismatch between a thermal rating and a peak mechanical load is one of the most common sizing errors in drive engineering, and it is why hoist, crane and press motors carry duty-class markings that a pump motor does not need.
:::
:::

::: warning Energy methods silently assume the reference frame
Kinetic energy is not Galilean-invariant: $\tfrac{1}{2} m v^{2}$ depends on the frame, and so does the work done. The work–energy equation is nevertheless valid in any **inertial** frame, but the numbers differ between them, and a common error is to mix frames — measuring the velocity relative to a moving belt while measuring the displacement relative to the ground. The work integral $\int \mathbf{F} \cdot \mathrm{d} \mathbf{r}$ uses the displacement of the point of application **in the same frame as the velocity in $T$**. This matters most for friction: the heat generated at a sliding contact is $\mu N$ times the **relative** slip, which is frame-independent, whereas the work of friction on a single body is $\mu N$ times its displacement in your chosen frame, which is not. When in doubt, work in the ground frame and check the answer against a case you can do in your head.
:::

::: history
The idea that something is conserved through mechanical motion runs from Leibniz's *vis viva* $m v^{2}$ of 1686, fought over against the Cartesians who held $m v$ to be the true quantity of motion, through d'Alembert's principle of 1743 and the principle of least action of Maupertuis and Euler, to Coriolis's 1829 demonstration that $\tfrac{1}{2} m v^{2}$ — not $m v^{2}$ — is the right measure for engineering purposes, and Poncelet's coining of the term *travail de la force* for work in 1826. The word **energy** in its modern sense is Thomas Young's, 1807, and the explicit statement of conservation came in the 1840s with Mayer, Joule and Helmholtz, whose 1847 paper *Über die Erhaltung der Kraft* unified the mechanical, thermal, chemical and electrical forms. **Potential energy** as a term is Rankine's, 1853, and the stability criterion $\mathrm{d}^{2} V / \mathrm{d} q^{2} > 0$ goes back to Lagrange's *Mécanique analytique* of 1788, with the rigorous treatment of the marginal cases due to Dirichlet and, for continuous systems, to the energy methods of Rayleigh's *Theory of Sound* of 1877. The **power** of a machine was quantified by Watt's horses around 1770 and standardised as the horsepower of $33\,000\ \mathrm{ft\,lb / min}$ in 1782; the SI watt, one joule per second, dates from 1882.
:::

## Where this leads

The time integral of the same equation gives [[dynamics/impulse-momentum]], and the two together handle impact. Energy methods for rigid bodies, where rotational kinetic energy appears, are in [[dynamics/rigid-body-energy-momentum]], the small-oscillation result is developed in [[vibrations/free-vibration]], and the potential-energy approach to a continuous system is the basis of [[solid-mechanics/energy-methods]].

::: summary
- $T_1 + \sum U_{1 \rightarrow 2} = T_2$ is one scalar equation: it gives speed against position and nothing else.
- Forces perpendicular to the motion do no work; friction and drag do work that cannot be written as a potential.
- For conservative systems $T + V$ is constant, and $F = - \partial V / \partial q$.
- Equilibrium is where $\mathrm{d} V / \mathrm{d} q = 0$; stability is decided by the sign of $\mathrm{d}^{2} V / \mathrm{d} q^{2}$, and the curvature also gives the natural frequency.
- Power is $\mathbf{F} \cdot \mathbf{v}$; size a motor on the worst **instantaneous** load, not the average, and check the duty class.
- A load dropped onto a spring deflects it at least twice the static deflection, and by $\sqrt{h}$ more for a drop height $h$.
:::

::: quiz
A block slides from rest down two frictionless ramps of the same vertical height but different lengths and angles. Which statement is true at the bottom?
- [ ] The steeper ramp gives the greater speed
- [x] Both give the same speed, but the steeper ramp takes less time
- [ ] Both give the same speed and the same time
- [ ] The longer ramp gives the greater speed, because the force acts longer
::: solution
Both give the same speed, $v = \sqrt{2 g h}$, but the steeper ramp takes less time. Energy fixes the **speed** and nothing else: the work of gravity is $m g h$ whatever the path, so the final kinetic energy and hence the speed are the same. The **time** is not fixed by energy and depends on the whole history of the acceleration — which is why the classical demonstration that the speed at the bottom of a frictionless chute is independent of its shape cannot be proved by energy alone and needs $\sum F_t = m \dot{v}$ integrated along the arc. The brachistochrone is the extreme case: of all frictionless paths between two points the cycloid gives the shortest time, while every one of them gives the same speed.
:::
:::

## Exercises

::: exercise Work of a force {level=1 check="24"}
A force $\mathbf{F} = \left( 3 x, 2 y^{2} \right)\ \mathrm{N}$ acts on a particle that moves from $\left( 0, 0 \right)$ to $\left( 2, 3 \right)\ \mathrm{m}$ along a straight line. Find the work.
::: solution
Along the line $y = 1.5 x$, $\mathrm{d} y = 1.5 \, \mathrm{d} x$:
$$
U = \int_0^2 \left[ 3 x + 2 \left( 1.5 x \right)^{2} \times 1.5 \right] \mathrm{d} x
= \int_0^2 \left( 3 x + 6.75 x^{2} \right) \mathrm{d} x
= \left[ 1.5 x^{2} + 2.25 x^{3} \right]_0^2 = 6 + 18 = 24\ \mathrm{J}.
$$
*Note.* The answer to enter is $24\ \mathrm{J}$. The force **is** conservative, since $F_x = 3x$ depends only on $x$ and $F_y = 2y^{2}$ only on $y$, so a potential $V = -1.5 x^{2} - \tfrac{2}{3} y^{3}$ exists and the work is path-independent. Verify this on the two-segment path $\left(0,0\right) \rightarrow \left(2,0\right) \rightarrow \left(2,3\right)$: the first segment contributes $\int_0^2 3x \, \mathrm{d}x = 6\ \mathrm{J}$ and the second $\int_0^3 2y^{2} \, \mathrm{d}y = 18\ \mathrm{J}$, totalling $24\ \mathrm{J}$ as required.
:::
:::

::: exercise Conservation of energy {level=1 check="20.4"}
A $2\ \mathrm{kg}$ ball is thrown straight up at $20\ \mathrm{m / s}$. How high does it go, neglecting drag?
::: solution
$h = v^{2} / \left( 2 g \right) = 400 / 19.62 = 20.4\ \mathrm{m}$.

:::
:::

::: exercise Spring {level=1 check="3.16"}
A spring of stiffness $500\ \mathrm{N / m}$ is compressed $200\ \mathrm{mm}$ and released against a $2\ \mathrm{kg}$ mass on a frictionless surface. Find the launch speed.
::: solution
$$
v = \sqrt{\frac{k \delta^{2}}{m}} = \sqrt{\frac{500 \times 0.04}{2}} = 3.16\ \mathrm{m / s}.
$$

:::
:::

::: exercise Power {level=2}
A pump delivers $20\ \mathrm{l / s}$ of water to a height of $35\ \mathrm{m}$ through a pipe in which the friction loss is $8\ \mathrm{m}$. If the pump efficiency is $72$ per cent and the motor's $93$ per cent, find the electrical power drawn.
::: solution
The head is $43\ \mathrm{m}$ and the mass flow $20\ \mathrm{kg / s}$:
$$
P_{\text{water}} = 20 \times 9.81 \times 43 = 8437\ \mathrm{W},
$$
$$
P_{\text{electrical}} = \frac{8437}{0.72 \times 0.93} = 12\,600\ \mathrm{W} = 12.6\ \mathrm{kW}.
$$
*Sanity.* Note that the friction loss is $8 / 43 = 19$ per cent of the total head, so halving it by doubling the pipe diameter would save $2.4\ \mathrm{kW}$ continuously — about $21\ \mathrm{MWh}$ a year, which is why pump-pipe sizing is an optimisation and not a matter of following the cheapest first cost.
:::
:::

::: exercise Stability {level=2}
A bead of mass $m$ slides on a smooth circular hoop of radius $R$ rotating about a vertical diameter at constant $\omega$. Find the equilibrium positions and their stability, and the critical speed.
::: solution
With $\theta$ measured from the downward vertical, the effective potential in the rotating frame — gravity plus the centrifugal potential — is
$$
V \left( \theta \right) = m g R \left( 1 - \cos \theta \right) - \tfrac{1}{2} m \omega^{2} R^{2} \sin^{2} \theta ,
$$
$$
\frac{\mathrm{d} V}{\mathrm{d} \theta} = m g R \sin \theta - m \omega^{2} R^{2} \sin \theta \cos \theta
= m g R \sin \theta \left( 1 - \frac{\omega^{2} R}{g} \cos \theta \right) = 0 ,
$$
so either $\sin \theta = 0$, giving $\theta = 0$ and $\pi$, or
$$
\cos \theta = \frac{g}{\omega^{2} R} .
$$
The second solution exists only for $\omega^{2} > g / R$, and
$$
\left. \frac{\mathrm{d}^{2} V}{\mathrm{d} \theta^{2}} \right|_{\theta = 0} = m g R \left( 1 - \frac{\omega^{2} R}{g} \right) ,
$$
so the bottom becomes **unstable** at the critical speed
$$
\omega_{\text{cr}} = \sqrt{\frac{g}{R}} .
$$
*Sanity.* This is the **bead-on-a-rotating-hoop** bifurcation, and it is the textbook example of a supercritical pitchfork: below $\sqrt{g / R}$ the bead sits at the bottom, above it the bead climbs to an angle $\cos \theta = g / \omega^{2} R$ and the two new equilibria are stable. For $R = 0.2\ \mathrm{m}$ the critical speed is $7.0\ \mathrm{rad / s}$, or $67\ \mathrm{rpm}$. The same equation governs the whirling of a shaft, the buckling of a column under a follower load and the onset of the "tea-leaf" motion in a rotating cup, and the qualitative behaviour — a stable state losing stability and two new stable states appearing smoothly — is what makes it a **supercritical** bifurcation rather than a snap-through.
:::
:::

::: exercise Vertical circle {level=2}
A bead slides on a smooth circular wire of radius $0.6\ \mathrm{m}$ in a vertical plane. Find the minimum speed at the bottom for the bead to complete the circle, and the speed at the top.
::: solution
For a bead **on a wire** (which can push as well as pull) the minimum condition is merely that it reaches the top, so $v_{\text{top}} \rightarrow 0$:
$$
v_{\text{bottom}} = \sqrt{2 g \times 2 R} = \sqrt{4 \times 9.81 \times 0.6} = 4.85\ \mathrm{m / s}.
$$
For a **pendulum on a string** the tension must not vanish at the top, requiring $v_{\text{top}} = \sqrt{g R} = 2.43\ \mathrm{m / s}$ and
$$
v_{\text{bottom}} = \sqrt{v_{\text{top}}^{2} + 4 g R} = \sqrt{5 g R} = 5.42\ \mathrm{m / s}.
$$
*Sanity.* The factor $\sqrt{5}$ versus $\sqrt{4}$ is the difference between a rigid rod and a flexible string, and it is the reason a roller-coaster loop is not a circle: on a circular loop the entry at the bottom is at $\sqrt{5 g R}$ and the normal force there is $6 m g$, which is unbearable, whereas a clothoid loop spreads the curvature and holds the load near $3 m g$ throughout. The $6 m g$ figure is also why a bucket of water swung overhead requires $\sqrt{g R}$ at the top and not merely a nonzero speed — the water cannot push back on the bucket.
:::
:::

::: exercise Design {level=3}
A railway wagon of mass $15\ \mathrm{t}$ rolling free at $3\ \mathrm{km / h}$ is brought to rest by a spring buffer. Design the buffer so that the maximum deceleration does not exceed $0.4\ g$ and find the required stiffness and maximum compression. Then check the same buffer against a wagon at $6\ \mathrm{km / h}$.
::: solution
**Stiffness from the deceleration limit.** At maximum compression $k \delta_{\max} = m a_{\max}$, and energy gives $\tfrac{1}{2} k \delta_{\max}^{2} = \tfrac{1}{2} m v^{2}$. Combining,
$$
\delta_{\max} = \frac{v}{\omega_n}, \qquad
\omega_n = \frac{v}{\delta_{\max}}, \qquad
a_{\max} = \omega_n^{2} \delta_{\max} = \frac{v^{2}}{\delta_{\max}} ,
$$
$$
\delta_{\max} = \frac{v^{2}}{a_{\max}} = \frac{0.833^{2}}{0.4 \times 9.81} = 0.177\ \mathrm{m},
$$
$$
k = \frac{m a_{\max}}{\delta_{\max}} = \frac{15\,000 \times 3.924}{0.177} = 333\ \mathrm{kN / m}.
$$
**At $6\ \mathrm{km / h}$** the natural frequency is unchanged at $\omega_n = \sqrt{k / m} = 4.71\ \mathrm{rad / s}$, so
$$
\delta_{\max} = \frac{v}{\omega_n} = \frac{1.667}{4.71} = 0.354\ \mathrm{m}, \qquad
a_{\max} = \omega_n v = 7.85\ \mathrm{m / s^{2}} = 0.80\ g .
$$
*Note.* With a **linear** spring both the compression and the force are proportional to $v$, so doubling the impact speed doubles the load on the wagon frame while the **energy** to be absorbed quadruples — which means the stroke must double as well. That is the wrong scaling for a buffer, because the design case is a heavy wagon at low speed and the accidental case is a light wagon at high speed, and a linear spring either over-travels or over-loads depending on which you design for.

**Remedy.** A real buffer is **not** linear. A conical Bellevuss spring, a friction ring or a hydro-pneumatic unit gives a nearly **constant** force over the stroke, for which
$$
\delta = \frac{m v^{2}}{2 F_{\max}},
$$
so the stroke grows as $v^{2}$ while the force stays exactly at the plateau value and can be capped by a relief valve. Railway buffing gear is designed to a **buffing diagram** — force against compression, with a plateau — and the wagon's frame is designed for the plateau force, not for a spring rate. That is also why modern freight cars use hydraulic cushioning gear rather than a simple spring, and why the buffer stroke on a modern wagon is $450$ to $650\ \mathrm{mm}$ rather than the $150\ \mathrm{mm}$ of a linear spring of the same capacity.
:::
:::

::: exercise Derivation {level=3}
Derive the escape velocity from a planet of mass $M$ and radius $R$ by the energy method, then find the maximum height reached by a projectile fired vertically from the surface at $8\ \mathrm{km / s}$, taking $g m = 3.986 \times 10^{14}\ \mathrm{m^{3} / s^{2}}$ and $R = 6371\ \mathrm{km}$. Why does the constant-$g$ answer fail?
::: solution
**Escape velocity.** With $V \left( r \right) = - G M m / r$,
$$
\tfrac{1}{2} m v_e^{2} - \frac{G M m}{R} = 0
\quad\Longrightarrow\quad
v_e = \sqrt{\frac{2 G M}{R}} = \sqrt{2 g R} = 11.19\ \mathrm{km / s},
$$
using $g = G M / R^{2}$ in the second form.

**Maximum height at $8\ \mathrm{km / s}$.** Setting the velocity to zero at $r_{\max}$,
$$
\frac{v_0^{2}}{2} - \frac{G M}{R} = - \frac{G M}{r_{\max}}
\quad\Longrightarrow\quad
\frac{1}{r_{\max}} = \frac{1}{R} - \frac{v_0^{2}}{2 G M} ,
$$
$$
\frac{1}{r_{\max}} = 1.5696 \times 10^{- 7} - 8.028 \times 10^{- 8}
= 7.668 \times 10^{- 8} \ \mathrm{m^{- 1}},
$$
$$
r_{\max} = 1.3041 \times 10^{7}\ \mathrm{m}, \qquad
h = r_{\max} - R = 6670\ \mathrm{km}.
$$
**Why constant $g$ fails.** The constant-$g$ estimate gives $h = v_0^{2} / \left( 2 g \right) = 3240\ \mathrm{km}$, less than half the correct value, because it assumes the weight stays at its surface value while the projectile climbs a distance comparable to the planet's radius. At $r = 2 R$ the gravity is a quarter of $g$, and the work done against it over that distance is correspondingly less than $m g R$. The error is $51$ per cent at $8\ \mathrm{km / s}$ and grows without limit as $v_0$ approaches $v_e$, at which the correct answer becomes infinite and the constant-$g$ answer is a finite $6370\ \mathrm{km}$.

*Comment.* The rule of thumb is that constant $g$ is acceptable while $h \lesssim 0.02 R$, that is for $v_0 \lesssim 1.6\ \mathrm{km / s}$. Above that the $1 / r$ form must be used, and the energy equation is the shortest way to it — which is one of the clearest illustrations of why the energy method exists at all: the same answer costs one line here and a numerical integration in $\mathbf{F} = m \mathbf{a}$.
:::
:::
