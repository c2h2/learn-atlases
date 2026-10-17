Newton's second law is one sentence and an infinite number of arguments. $\sum \mathbf{F} = m \mathbf{a}$ is trivially true and trivially useless until you have drawn the forces, chosen the coordinates and written the accelerations, at which point it becomes a set of two or three simultaneous equations that a first-year student solves in a minute. The gap between the law and the answer is entirely filled by method, and the method has three parts: isolate the body, draw every force that acts on it and no force that it exerts on something else, and write the acceleration in the same coordinate system in which you resolved the forces.

Everything that goes wrong in particle kinetics goes wrong in one of those three steps. Students resolve a force along an axis that is not the axis along which they wrote the acceleration; they include the force the body exerts rather than the one it receives; they forget that a normal force is an unknown until the equations determine it and not something equal to $m g$; and they set $a_n = 0$ because the speed is constant, which is precisely the case in which $a_n$ is largest.

::: warning $N = mg$ is almost never true
The normal force is a **reaction** determined by the equations of motion, and it equals $m g$ only for a body on a horizontal surface with no vertical acceleration and no other vertical forces. On an incline it is $m g \cos \theta$; in a lift accelerating up it is $m \left( g + a \right)$; over a crest it is $m \left( g - v^{2} / \rho \right)$ and can be zero; in a vertical loop at the bottom it is $m \left( g + v^{2} / \rho \right)$; and with a rope pulling up at angle $\alpha$ it is $m g - T \sin \alpha$. Every one of these is a different formula, and the only way to get the right one is to write $\sum F_n = m a_n$ and let the algebra decide.
:::

## The equation and how to write it

::: definition Equations of motion {#def-eom}
For a particle of mass $m$,
$$
\sum \mathbf{F} = m \mathbf{a} .
$$
In the three coordinate systems of [[dynamics/particle-kinematics]] this becomes:

- **Rectangular:** $\sum F_x = m \ddot{x}$, $\sum F_y = m \ddot{y}$. Use when the acceleration has fixed directions.
- **Normal–tangential:** $\sum F_t = m \dot{v}$, $\sum F_n = m v^{2} / \rho$, $\sum F_z = 0$. Use when the path is known.
- **Polar:** $\sum F_r = m \left( \ddot{r} - r \dot{\theta}^{2} \right)$, $\sum F_\theta = m \left( r \ddot{\theta} + 2 \dot{r} \dot{\theta} \right)$. Use when the force is central, that is directed along $r$, because then $\sum F_\theta = 0$ integrates immediately to angular momentum conservation.

The **free-body diagram** shows the body isolated with every external force acting **on** it: weight through the centre, contacts as a normal force plus a friction force along the surface, cables as tensions along the cable away from the body, springs as $k \delta$ along their axis. The **kinetic diagram** shows $m \mathbf{a}$ in the chosen components. The two diagrams are the two sides of the equation, and drawing both is not busywork — it is the calculation.
:::

::: proof Equations of motion in normal–tangential form {#proof-nt-eom}
Substitute $\mathbf{a} = \dot{v} \mathbf{e}_t + \left( v^{2} / \rho \right) \mathbf{e}_n$ into $\sum \mathbf{F} = m \mathbf{a}$ and resolve on the two orthogonal directions:
$$
\sum F_t = m \dot{v} = m v \frac{\mathrm{d} v}{\mathrm{d} s}, \qquad
\sum F_n = \frac{m v^{2}}{\rho} .
$$
The tangential equation integrates directly to the work–energy relation, since
$$
\int_{s_1}^{s_2} \sum F_t \, \mathrm{d} s = \int_{v_1}^{v_2} m v \, \mathrm{d} v
= \tfrac{1}{2} m v_2^{2} - \tfrac{1}{2} m v_1^{2} ,
$$
which is the reason the energy method of the next lesson is not an independent principle but a first integral of the tangential equation. The normal equation involves no derivative at all and is therefore an **algebraic** equation for the normal force or the radius, given the speed: it is the equation you write when you want the tension in a cable, the load on a bearing or the speed at which something leaves a surface.
:::

::: example Block on an incline {#ex-incline}
A crate slides down a $20^{\circ}$ chute with a kinetic friction coefficient of $0.30$. Find the acceleration. Then find the coefficient for which it slides at constant speed, and the angle at which it begins to slide from rest if $\mu_s = 0.40$.
::: solution
Resolve along the chute ($t$) and normal to it ($n$), with $a_n = 0$:
$$
\sum F_n: \quad N - m g \cos 20^{\circ} = 0 \quad\Longrightarrow\quad N = 0.9397 \, m g ,
$$
$$
\sum F_t: \quad m g \sin 20^{\circ} - 0.30 N = m a ,
$$
$$
a = g \left( \sin 20^{\circ} - 0.30 \cos 20^{\circ} \right)
= 9.81 \left( 0.3420 - 0.2819 \right) = 0.590\ \mathrm{m / s^{2}} .
$$
**Constant speed** requires $a = 0$, so $\mu_k = \tan 20^{\circ} = 0.364$.
**Impending motion** requires $\tan \theta = \mu_s = 0.40$, so $\theta = 21.8^{\circ}$.

*Check.* The mass cancels, as it must: a crate and a piano slide down the same chute at the same rate. $\checkmark$

*Sanity.* The three numbers are the whole of chute, hopper and conveyor design. A chute must be steeper than $\tan^{-1} \mu_s$ to start and steeper than $\tan^{-1} \mu_k$ to keep going, and because $\mu_s > \mu_k$ there is a band of angles in which material starts and stops repeatedly — the stick-slip that makes a hopper surge and a brake squeal. That band is $20^{\circ}$ to $21.8^{\circ}$ here, which is why a hopper designed on the running angle alone ratchets, and why the standard remedy is a liner whose friction is both low and stable rather than merely low.
:::
:::

::: example Atwood machine {#ex-atwood}
Two masses of $10\ \mathrm{kg}$ and $6\ \mathrm{kg}$ are connected by a light inextensible cable over a frictionless pulley. Find the acceleration and the cable tension. Then find the force on the pulley support.
::: solution
Both masses have the same acceleration magnitude $a$; take the $10\ \mathrm{kg}$ mass moving down.
$$
10 g - T = 10 a, \qquad T - 6 g = 6 a ,
$$
adding,
$$
a = g \, \frac{10 - 6}{10 + 6} = 9.81 \times 0.25 = 2.45\ \mathrm{m / s^{2}},
$$
$$
T = 6 \left( g + a \right) = 6 \times 12.26 = 73.6\ \mathrm{N}.
$$
**Support force.** The pulley carries two cable legs each at $73.6\ \mathrm{N}$, so
$$
R = 2 T = 147.2\ \mathrm{N}.
$$
*Check.* $T = 2 g m_1 m_2 / \left( m_1 + m_2 \right) = 2 \times 9.81 \times 60 / 16 = 73.6\ \mathrm{N}$. $\checkmark$ And $R = 147.2\ \mathrm{N}$ is **less** than the total weight of $157.0\ \mathrm{N}$, because the heavier mass is accelerating down: the support of an accelerating system carries less than the static weight.

*Sanity.* That last point is not a curiosity, it is the operating principle of a **differential** or **free-fall** torsion balance, in which the apparent weight of an accelerating mass is measured to determine $G$, and it is why a person in a broken lift is not "weightless until they hit the bottom" in any useful sense but does genuinely register zero on a scale. It is also why a crane's load indicator reads low during hoist-up deceleration and high during hoist-up acceleration, and why a well-designed hoist sizes its load cell on the dynamic load, which can be $1.5$ times the static weight at the moment the cable takes up.
:::
:::

::: widget plot
f: 9.81*(10-6)/(10+6)*x
x: 0, 1
y: 0, 3
labels: \text{acceleration } \left( \mathrm{m/s^2} \right)
caption: Acceleration of the Atwood machine against the mass imbalance fraction $x = \left( m_1 - m_2 \right) / \left( m_1 + m_2 \right)$. The relation is exactly linear, $a = g x$, so a $10$–$6\ \mathrm{kg}$ pair at $x = 0.25$ accelerates at a quarter of gravity. The linearity is the reason an Atwood machine was used for two centuries as the classroom demonstration of uniformly accelerated motion: by making the two masses nearly equal the acceleration can be made arbitrarily small and the timing made accurate with a water clock, which is exactly what Atwood did in 1784.
:::

## Systems of particles

::: theorem Motion of a system's mass centre {#thm-mass-centre}
For a system of particles of total mass $M$ and mass centre $G$,
$$
\sum \mathbf{F}^{\text{ext}} = M \mathbf{a}_G ,
$$
where $\sum \mathbf{F}^{\text{ext}}$ is the resultant of the **external** forces only. Internal forces do not appear, and the mass centre moves as though the whole mass were concentrated there and all external forces applied to it.
:::

::: proof
Sum $\sum \mathbf{F}_i = m_i \mathbf{a}_i$ over all particles:
$$
\sum_i \mathbf{F}_i^{\text{ext}} + \sum_i \sum_{j \ne i} \mathbf{F}_{ij}
= \sum_i m_i \ddot{\mathbf{r}}_i
= \frac{\mathrm{d}^{2}}{\mathrm{d} t^{2}} \sum_i m_i \mathbf{r}_i
= M \ddot{\mathbf{r}}_G .
$$
By Newton's third law the internal forces occur in equal and opposite pairs, $\mathbf{F}_{ij} = - \mathbf{F}_{ji}$, so their double sum vanishes identically — and it vanishes whether or not they are central, so no assumption about their direction is needed. What remains is the stated result.
:::

## Central forces and constrained paths

::: example Leaving the surface {#ex-leave-sphere}
A small block slides from rest at the top of a fixed smooth sphere of radius $R$. At what angle does it leave the surface, and how far below the centre does it land?
::: solution
**Tangential equation** along the sphere, with $\theta$ from the top and $v \, \mathrm{d} v / \mathrm{d} s = g \sin \theta$, $\mathrm{d} s = R \mathrm{d} \theta$:
$$
v \frac{\mathrm{d} v}{R \mathrm{d} \theta} = g \sin \theta
\quad\Longrightarrow\quad
v^{2} = 2 g R \left( 1 - \cos \theta \right) .
$$
**Normal equation:**
$$
m g \cos \theta - N = \frac{m v^{2}}{R}
\quad\Longrightarrow\quad
N = m g \left( 3 \cos \theta - 2 \right) .
$$
**Separation** at $N = 0$:
$$
\cos \theta = \frac{2}{3} \quad\Longrightarrow\quad
\theta = 48.2^{\circ}, \qquad
v = \sqrt{\frac{2 g R}{3}} .
$$
The block leaves at a height $R \cos \theta = 0.667 R$ above the centre, having fallen $0.333 R$ of the sphere's radius.

*Sanity.* The answer $\cos \theta = 2 / 3$ is independent of $R$, of $g$ and of $m$, which is a strong hint that it is right and a strong hint that it is fragile: it depends on the sphere being **smooth** and the block starting from **rest at the very top**. With friction the block leaves later, at about $53^{\circ}$ for $\mu = 0.1$; if it is given an initial push it leaves earlier; and if it is a **ball** rather than a block, rolling changes the answer to $\cos \theta = 10 / 17$, because some of the potential energy goes into rotation and less into speed. Snow leaves a ski jump at roughly this angle, which is why the take-off is rounded and why a ski jumper's trajectory is designed to meet the slope at a shallow relative angle rather than to follow it.
:::
:::

::: example Conical pendulum and governor {#ex-conical}
A conical governor has two $2\ \mathrm{kg}$ balls on $300\ \mathrm{mm}$ arms pivoted at the spindle axis. At what speed does the arm take a $30^{\circ}$ angle, and what is the arm tension then?
::: solution
The radius is $r = 0.3 \sin 30^{\circ} = 0.15\ \mathrm{m}$. Resolving vertically and horizontally,
$$
T \cos 30^{\circ} = m g, \qquad T \sin 30^{\circ} = m \omega^{2} r ,
$$
$$
\tan 30^{\circ} = \frac{\omega^{2} r}{g}
\quad\Longrightarrow\quad
\omega = \sqrt{\frac{g \tan 30^{\circ}}{r}}
= \sqrt{\frac{9.81 \times 0.5774}{0.15}} = 6.14\ \mathrm{rad / s} = 58.7\ \mathrm{rpm},
$$
$$
T = \frac{m g}{\cos 30^{\circ}} = \frac{19.62}{0.8660} = 22.7\ \mathrm{N}.
$$
*Check.* The general result for a conical pendulum of arm length $L$ is $\omega = \sqrt{g / \left( L \cos \theta \right)}$, which here gives $\sqrt{9.81 / \left( 0.3 \times 0.866 \right)} = 6.14\ \mathrm{rad / s}$. $\checkmark$

*Sanity.* Note that $\omega$ depends on the **vertical height** $h = L \cos \theta$ above the ball and not on the mass: a Watt governor runs at the same speed whether its balls are lead or brass, and its speed is $\sqrt{g / h}$, which for a $250\ \mathrm{mm}$ height is $6.26\ \mathrm{rad / s}$ or $60\ \mathrm{rpm}$. That is why a governor's arms are long — a taller governor runs slower and is therefore more stable — and why the height, not the angle, is the design variable. It is also why a Watt governor cannot hold a speed well: the sensitivity $\mathrm{d} \omega / \mathrm{d} h = - \omega / \left( 2 h \right)$ is fixed by geometry and cannot be tuned, which is the reason it was replaced by the centrifugal flyball governor with a spring, whose characteristic can be made as flat as the engine's load variation requires.
:::
:::

## Combined sliding and turning

::: proposition The friction circle {#prop-friction-circle}
A tyre, a shoe or a block on the point of slipping can develop a total friction force of $\mu N$ in **any** direction in the contact plane. If it must simultaneously corner and brake, the two components are limited not by $\mu N$ each but by their vector sum:
$$
\sqrt{a_t^{2} + a_n^{2}} \le \mu g ,
$$
so the available lateral acceleration when braking at $\alpha \mu g$ is
$$
a_{n, \max} = \mu g \sqrt{1 - \alpha^{2}} .
$$
Plotting $a_t$ against $a_n$ gives the **friction circle**, and any combination outside it is a skid.
:::

::: example Braking while cornering {#ex-friction-circle}
A car has $\mu = 0.8$ and corners on a flat road of $60\ \mathrm{m}$ radius. Find the maximum speed if it corners at constant speed, and if it brakes at $0.6 \ g$ at the same time.
::: solution
**Steady cornering:**
$$
v = \sqrt{\mu g r} = \sqrt{0.8 \times 9.81 \times 60} = 21.7\ \mathrm{m / s} = 78\ \mathrm{km / h}.
$$
**Braking while cornering.** With $a_t = 0.6 \times 9.81 = 5.886\ \mathrm{m / s^{2}}$,
$$
a_n \le \sqrt{ \left( 0.8 g \right)^{2} - 5.886^{2} }
= \sqrt{61.54 - 34.65} = 5.19\ \mathrm{m / s^{2}},
$$
$$
v = \sqrt{a_n r} = \sqrt{5.19 \times 60} = 17.6\ \mathrm{m / s} = 63\ \mathrm{km / h}.
$$
*Sanity.* Braking at $75$ per cent of the maximum possible deceleration costs $19$ per cent of the cornering speed. The consequence is the single most important piece of driving physics and the most widely disbelieved: **you cannot brake your way out of a corner you entered too fast**, because the braking steals the very friction you need to turn. The correct action is to brake in a straight line before the corner, then release and turn, then accelerate — which is the "slow in, fast out" rule stated in terms of a circle of force. The same arithmetic governs a forklift's rated load at a given turning radius, a crane's slew-and-lift combined duty and a train's speed through a curve while braking.
:::
:::

::: example Conveyor incline {#ex-conveyor-slip}
Boxes of mass $50\ \mathrm{kg}$ with $\mu_s = 0.35$ against rubber are carried up a $15^{\circ}$ incline. The belt starts from rest and must reach $0.8\ \mathrm{m / s}$; find the maximum starting acceleration for no slip, and check $a = 1.5\ \mathrm{m / s^{2}}$.
::: solution
The box must be accelerated up the slope by friction alone, which must also hold it against the downslope component of weight:
$$
F_{\text{req}} = m \left( a + g \sin 15^{\circ} \right), \qquad
F_{\text{avail}} = \mu_s m g \cos 15^{\circ} ,
$$
$$
a \le g \left( \mu_s \cos 15^{\circ} - \sin 15^{\circ} \right)
= 9.81 \left( 0.3381 - 0.2588 \right) = 0.778\ \mathrm{m / s^{2}} .
$$
At $a = 1.5\ \mathrm{m / s^{2}}$ the required friction is $50 \times \left( 1.5 + 2.539 \right) = 202\ \mathrm{N}$ against $166\ \mathrm{N}$ available, so the boxes **slip**.

**Remedies.** Reduce $a$ to $0.78\ \mathrm{m / s^{2}}$, giving a $1.0\ \mathrm{s}$ run-up; or reduce the incline to $10^{\circ}$, which raises the limit to $1.60\ \mathrm{m / s^{2}}$; or profile the belt.
*Sanity.* Note how sensitive the answer is to the incline: going from $15^{\circ}$ to $10^{\circ}$ more than doubles the allowable acceleration, from $0.78$ to $1.60\ \mathrm{m / s^{2}}$, because $\mu \cos \theta - \sin \theta$ falls steeply as $\theta$ approaches $\tan^{-1} \mu = 19.3^{\circ}$, beyond which no acceleration at all is possible and the box slides even at rest. That is why a belt conveyor's practical limit is about $18^{\circ}$ for ordinary goods and why steeper lifts use cleats, pockets or a bucket elevator.
:::
:::

::: warning Free-body diagrams are not sketches
Three rules, violated constantly. **One body at a time:** if two bodies are in contact, draw two diagrams, and the contact forces appear in both, equal and opposite. **Forces on the body only:** the force the crate exerts on the wall does not appear on the crate's diagram. **Unknowns are unknowns:** do not set $N = m g$ or $T = m g$ before the equations have been written, and in particular never assume a rope is taut or a body is in contact — solve, and if the force comes out negative, the contact has been lost. Two further habits save most of the errors: put the axes on the diagram so the acceleration components and the force resolutions visibly agree, and check the answer in a limit — $\mu = 0$, $\theta = 0$, $m_1 = m_2$, $v = 0$ — where the physics is obvious.
:::

::: history
Newton stated the three laws in the *Principia* of 1687 in Latin and in the language of "quantity of motion" rather than of force, and the modern form $\sum \mathbf{F} = m \mathbf{a}$ is due to Euler, who wrote it as a vector equation in 1750 and, more importantly for engineering, extended it to a system of particles as $\sum \mathbf{F}^{\text{ext}} = M \mathbf{a}_G$ in the same year and to a rigid body in 1755. The **unit** problem dominated the nineteenth century: with $F$, $m$, $a$ related by a constant whose value depends on the units, British engineers used the pound-force and the pound-mass interchangeably and produced the $g_c$ factor that still appears in American textbooks, while the metric system's resolution — the newton defined as the unit of force rather than the kilogram-force — was agreed at the Electrical Standards Congress of 1881 and did not reach British schoolbooks until the 1960s. The **free-body diagram** as a formal method is a nineteenth-century pedagogical invention, appearing in the works of Rankine and of the American text-writers Kane and Byerly in the 1870s and 1880s; before that, problems were solved by direct geometric argument. The **friction circle** is a construction of the tyre and road engineering of the 1920s, formalised from Coulomb friction by the French road-engineering school and made a household idea by the racing line literature of the 1960s.
:::

## Where this leads

Integrating the tangential equation gives [[dynamics/work-energy]], and integrating the force in time gives [[dynamics/impulse-momentum]]. The same equations applied to a rigid body rather than a particle are in [[dynamics/rigid-body-kinetics]], the rotating-frame version in [[dynamics/three-dimensional-dynamics]], and the treatment of a body as a particle at its mass centre is what justifies [[vibrations/free-vibration]].

::: summary
- Draw the free-body diagram and the kinetic diagram, in the **same** coordinate system, before writing any equation.
- The normal force is an unknown determined by $\sum F_n = m a_n$; $N = m g$ is a special case, not a rule.
- On a known path use $\sum F_t = m \dot{v}$ and $\sum F_n = m v^{2} / \rho$; the tangential equation is the work–energy theorem in disguise.
- For a central force, polar coordinates with $\sum F_\theta = 0$ give angular momentum conservation immediately.
- Friction is a **circle**, not a pair of independent limits: braking and cornering share the same $\mu N$.
- Check every answer in a limit, and check that a negative contact force is interpreted as separation rather than as a mistake.
:::

::: quiz
A helium balloon is tied to the floor of a lorry at rest with the windows shut. The lorry accelerates forwards. Which way does the balloon lean?
- [ ] Backwards, like everything else
- [x] Forwards
- [ ] Straight up, unchanged
- [ ] Sideways, depending on the acceleration
::: solution
Forwards. When the lorry accelerates at $a$, the air inside is pressed to the back with a horizontal pressure gradient $\partial p / \partial x = - \rho a$, so the buoyant force on the balloon has a forward horizontal component $\rho V a$. The balloon's own horizontal equation is $\rho V a = m v \dot{}$, giving it a forward acceleration $a \rho V / m$ — and since the balloon plus helium is lighter than the air it displaces, $\rho V > m$, it accelerates forwards **faster** than the lorry and swings forward. A suspended weight, for which $m \gg \rho V$, swings back. This is the same physics as the pendulum bob in an accelerating frame, and it is why a bubble in a spirit level moves **uphill**: the liquid, being heavier, goes down.
:::
:::

## Exercises

::: exercise Lift {level=1 check="409"}
A $60\ \mathrm{kg}$ person stands on a scale in a lift accelerating downwards at $3\ \mathrm{m / s^{2}}$. What does the scale read, in newtons?
::: solution
$N = m \left( g - a \right) = 60 \times 6.81 = 409\ \mathrm{N}$, equivalent to a mass of $41.7\ \mathrm{kg}$.
*Note.* The answer to enter is $409\ \mathrm{N}$. A scale reads the normal force, not the weight, and in a lift accelerating down at $g$ it reads zero.
:::
:::

::: exercise Normal–tangential {level=1 check="14.0"}
A motorcyclist goes over the top of a hill of radius $20\ \mathrm{m}$ at $15\ \mathrm{m / s}$. What is the normal force on a $80\ \mathrm{kg}$ rider plus $20\ \mathrm{kg}$ machine?
::: solution
$$
N = m \left( g - \frac{v^{2}}{\rho} \right) = 100 \left( 9.81 - \frac{225}{20} \right)
= 100 \left( 9.81 - 11.25 \right) = - 144\ \mathrm{N}.
$$
The negative sign means the machine has **left the ground**: the speed exceeds $\sqrt{g \rho} = 14.0\ \mathrm{m / s}$.
*Note.* The answer to enter is the speed at which the normal force vanishes, $14.0\ \mathrm{m / s}$.
:::
:::

::: exercise Atwood limit {level=1 check="9.81"}
In the Atwood machine of Example 4, what does the acceleration approach as $m_2 \rightarrow 0$?
::: solution
$a \rightarrow g m_1 / m_1 = g = 9.81\ \mathrm{m / s^{2}}$, and the tension approaches zero: the heavy mass is in free fall.
:::
:::

::: exercise Conical pendulum {level=2}
A $0.5\ \mathrm{kg}$ mass on a $500\ \mathrm{mm}$ string swings as a conical pendulum at $120\ \mathrm{rpm}$. Find the angle of the string and the tension.
::: solution
$\omega = 12.57\ \mathrm{rad / s}$, and $\cos \theta = g / \left( \omega^{2} L \right)$:
$$
\cos \theta = \frac{9.81}{12.57^{2} \times 0.5} = 0.1242
\quad\Longrightarrow\quad
\theta = 82.9^{\circ}, \qquad
T = \frac{m g}{\cos \theta} = \frac{4.905}{0.1242} = 39.5\ \mathrm{N}.
$$
*Sanity.* The string is nearly horizontal, which is what happens whenever $\omega^{2} L$ greatly exceeds $g$: no matter how fast you spin it, a conical pendulum can never reach $90^{\circ}$, because the tension's vertical component would then have to vanish while still balancing the weight.
:::
:::

::: exercise Friction circle {level=2}
A truck corners on a flat $40\ \mathrm{m}$ radius with $\mu = 0.7$. It must also climb a $5$ per cent grade at constant speed. Find the maximum speed.
::: solution
The grade costs part of the friction budget in the tangential direction. At constant speed the required tractive force is $m g \sin \theta \approx 0.05 \, m g$, so
$$
a_n \le \sqrt{ \left( 0.7 g \right)^{2} - \left( 0.05 g \right)^{2} }
= g \sqrt{0.49 - 0.0025} = 0.698 \times 9.81 = 6.85\ \mathrm{m / s^{2}},
$$
$$
v = \sqrt{6.85 \times 40} = 16.6\ \mathrm{m / s} = 59.6\ \mathrm{km / h}.
$$
*Sanity.* The grade costs only $0.4$ per cent of the cornering speed, because $\sqrt{0.49 - 0.0025}$ is barely less than $0.7$. The general rule is that a small tangential demand costs almost nothing in the lateral direction — the loss goes as $\alpha^{2}$, not $\alpha$ — so it is the **large** braking or driving force that destroys the cornering, and a steady climb is nearly free.
:::
:::

::: exercise System of particles {level=2}
Two blocks of $8\ \mathrm{kg}$ and $4\ \mathrm{kg}$ rest side by side on a smooth horizontal surface, in contact. A horizontal force of $60\ \mathrm{N}$ is applied to the $8\ \mathrm{kg}$ block. Find the acceleration and the contact force. Then repeat with the force on the $4\ \mathrm{kg}$ block.
::: solution
**Together:** $a = 60 / 12 = 5.0\ \mathrm{m / s^{2}}$.
**Contact force, force on the $8\ \mathrm{kg}$:** the $4\ \mathrm{kg}$ block is driven only by the contact force, so $C = 4 \times 5 = 20\ \mathrm{N}$.
**Force on the $4\ \mathrm{kg}$ block:** the $8\ \mathrm{kg}$ block is then driven only by the contact, so $C = 8 \times 5 = 40\ \mathrm{N}$.
*Sanity.* The acceleration is the same in both cases — the system's mass centre responds only to external force, $\sum F_{\text{ext}} = M a_G$ — but the internal contact force doubles. This is the whole content of the "two bodies, one equation" method: the system equation gives the acceleration and the isolation of one body gives the internal force, and the internal force depends on **which** body you push. It is why a bolted joint nearest the applied load is the most highly loaded, why a stack of blocks pushed from one end has a linearly varying internal force, and why a train's coupler nearest the locomotive carries the whole train.
:::
:::

::: exercise Design {level=3}
A mine hoist raises an $8\ \mathrm{t}$ cage on a cable whose breaking load is $400\ \mathrm{kN}$. The hoist must reach $12\ \mathrm{m / s}$ from rest within a distance of $30\ \mathrm{m}$, and the code requires a minimum factor of safety of $9.0$ on the breaking load for a dynamically loaded hoisting rope. Check the design and find the maximum permissible acceleration.
::: solution
**Kinematics.** $a = v^{2} / \left( 2 s \right) = 144 / 60 = 2.40\ \mathrm{m / s^{2}}$.
**Cable tension at the start**, when the cage is accelerating up from the bottom of the shaft:
$$
T = m \left( g + a \right) = 8000 \times 12.21 = 97.7\ \mathrm{kN}.
$$
**Factor of safety** $= 400 / 97.7 = 4.1$, against the required $9.0$. **The design fails.**
**Maximum permissible tension** $= 400 / 9 = 44.4\ \mathrm{kN}$, which is less than the static weight of $78.5\ \mathrm{kN}$: no acceleration, and indeed no hoisting at all, is possible with this cable.

**Remedies.** A cable of $700\ \mathrm{kN}$ breaking load gives $\text{F.S.} = 700 / 97.7 = 7.2$, still short; $900\ \mathrm{kN}$ gives $9.2$ and passes. Alternatively reduce the acceleration: with a $900\ \mathrm{kN}$ cable the acceleration limit is
$$
a = \frac{900 / 9}{8} - 9.81 = 12.50 - 9.81 = 2.69\ \mathrm{m / s^{2}} > 2.40 . \checkmark
$$
*Design comment.* The governing case is **starting from rest at the bottom of the shaft**, when the tension is greatest and the cage is least likely to be guided. Two effects the simple calculation misses make it worse: the cable's own weight, which for a $400\ \mathrm{m}$ shaft at $1.2\ \mathrm{kg / m}$ adds $4.7\ \mathrm{kN}$ at the top and none at the bottom, and the **dynamic overshoot** when the cable takes up the slack, which can double the tension momentarily and is the reason a modern hoist has a torque-limiting drive and a load-limiter rather than relying on the motor's rating. The factor of safety of $9$ on a rope rather than the $3$ used for a steel structure exists because a rope's strength is a statistical property of a few hundred wires, degrades with wear and corrosion in ways that are hard to inspect, and fails without warning.
:::
:::

::: exercise Derivation {level=3}
Derive the equation of motion of a particle of mass $m$ sliding inside a fixed smooth hemispherical bowl of radius $R$, find the reaction as a function of position, and show that the motion is simple harmonic for small oscillations with the same period as a simple pendulum of length $R$. What changes if the bowl is rough?
::: solution
With $\theta$ measured from the bottom of the bowl, the tangential equation is
$$
m R \ddot{\theta} = - m g \sin \theta
\quad\Longrightarrow\quad
\ddot{\theta} + \frac{g}{R} \sin \theta = 0 ,
$$
and the normal equation, with the centre of curvature at the bowl's centre, is
$$
N - m g \cos \theta = \frac{m v^{2}}{R}
\quad\Longrightarrow\quad
N = m g \cos \theta + \frac{m v^{2}}{R} .
$$
For small angles $\sin \theta \approx \theta$, giving
$$
\ddot{\theta} + \omega_n^{2} \theta = 0, \qquad
\omega_n = \sqrt{\frac{g}{R}}, \qquad
\tau = 2 \pi \sqrt{\frac{R}{g}} ,
$$
identical to a simple pendulum of length $R$, because the bowl's surface supplies exactly the constraint force a rigid string would and the particle is at a fixed distance $R$ from the centre either way.

**Reaction at the bottom**, released from angle $\theta_0$: energy gives $v^{2} = 2 g R \left( 1 - \cos \theta_0 \right)$, so
$$
N_{\text{bottom}} = m g + 2 m g \left( 1 - \cos \theta_0 \right)
= m g \left( 3 - 2 \cos \theta_0 \right) .
$$
Released from the horizontal this is $3 m g$ — three times the weight, at the point where the speed is greatest and the surface is flat.

**With friction** the tangential equation becomes $m R \ddot{\theta} = - m g \sin \theta - \mu N \, \text{sgn} \left( \dot{\theta} \right)$, and because $N$ contains $v^{2} / R$ the damping term is **not** proportional to velocity. The motion is no longer simple harmonic, the period becomes amplitude-dependent even beyond the usual $\theta_0^{2} / 16$ correction, and the amplitude decays by a fixed amount per cycle rather than exponentially — Coulomb damping, whose decay is linear in time. The particle also comes to rest not at the bottom but within a dead band $\left| \tan \theta \right| < \mu$ about it, which is why a rough bowl is a poor oscillator and why a precision pendulum is suspended from a knife edge rather than rolled in a trough.
:::
:::
