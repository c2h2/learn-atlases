Integrating Newton's second law in **time** rather than in space gives the second great first integral of particle dynamics. Where work and energy trade force against distance and deliver speed as a function of position, impulse and momentum trade force against time and deliver the same information when the forces are impulsive — large, brief and unknown in magnitude. A hammer blow, a collision, a blast load, a rocket's thrust over a burn and the impact of a ball on a bat are all cases where the force history is unknowable and the integrated effect is everything.

The same integration applied to the **moment** of the equation gives angular momentum, and angular momentum is the more powerful of the two because it can be conserved when linear momentum is not: a planet's linear momentum is constantly changing, its angular momentum about the sun is exactly constant, and that single fact contains Kepler's second law, the vis-viva equation and the whole of orbital mechanics.

::: warning Momentum is conserved only in the direction in which no impulse acts
The statement "momentum is conserved" is not a law of a problem, it is a statement about a **direction**. A bullet striking a block suspended on a string conserves momentum horizontally during the impact, because the string's impulse is vertical; it does not conserve momentum vertically, because the string and the support deliver an impulse. A ball bouncing off a floor conserves horizontal momentum if the floor is smooth and does not conserve vertical momentum at all. Before writing $m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$, name the direction and say what impulse acts along it — and if the answer is "the pin, the wall, the ground", the equation is not available.
:::

## Linear impulse and momentum

::: definition Principle of impulse and momentum {#def-impulse}
Integrating $\sum \mathbf{F} = m \mathbf{a}$ from $t_1$ to $t_2$,
$$
m \mathbf{v}_1 + \sum \int_{t_1}^{t_2} \mathbf{F} \, \mathrm{d}t = m \mathbf{v}_2 ,
$$
the **linear impulse** $\int \mathbf{F} \, \mathrm{d}t$ being a vector with units of $\mathrm{N \, s}$. For a system of particles the internal forces cancel in pairs and
$$
\sum m_i \mathbf{v}_{i1} + \sum \int \mathbf{F}^{\text{ext}} \, \mathrm{d}t = \sum m_i \mathbf{v}_{i2} .
$$
If the external impulse in some direction vanishes, the momentum in that direction is **conserved**. During an impact the weight and other bounded forces contribute an impulse $O(\Delta t)$ which vanishes with the impact duration, so momentum is conserved through the impact even when the bodies are not free.
:::

::: definition Coefficient of restitution {#def-restitution}
For two bodies colliding directly,
$$
e = \frac{\text{relative speed of separation}}{\text{relative speed of approach}}
= \frac{v_2 - v_1}{u_1 - u_2}, \qquad 0 \le e \le 1 .
$$
$e = 1$ is perfectly elastic, $e = 0$ perfectly plastic. For **oblique** impact the definition applies to the components **along the line of impact** only; the components perpendicular to it are unchanged if the surfaces are smooth. The kinetic energy lost in a direct central impact is
$$
\Delta T = \frac{1}{2} \frac{m_1 m_2}{m_1 + m_2} \left( 1 - e^{2} \right) \left( u_1 - u_2 \right)^{2} ,
$$
which is zero only when $e = 1$ and greatest when $e = 0$.
:::

::: proof Energy loss in a direct impact {#proof-impact-loss}
Solve momentum conservation and the restitution equation together:
$$
m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2, \qquad v_2 - v_1 = e \left( u_1 - u_2 \right) .
$$
Writing $\Delta v = v_1 - u_1$ for the change of the first body and eliminating $v_2$,
$$
v_1 = u_1 - \frac{m_2 \left( 1 + e \right)}{m_1 + m_2} \left( u_1 - u_2 \right) , \qquad
v_2 = u_2 + \frac{m_1 \left( 1 + e \right)}{m_1 + m_2} \left( u_1 - u_2 \right) .
$$
Substituting into $T_1 - T_2$ and collecting, using $\mu = m_1 m_2 / \left( m_1 + m_2 \right)$ for the **reduced mass**,
$$
T_1 - T_2 = \tfrac{1}{2} \mu \left( 1 - e^{2} \right) \left( u_1 - u_2 \right)^{2} .
$$
Two consequences follow immediately. The loss depends only on the **relative** speed and the reduced mass, so it is the same whether a $1\ \mathrm{kg}$ mass at $10\ \mathrm{m / s}$ hits a stationary $1\ \mathrm{kg}$ mass or two masses approach each other at $5\ \mathrm{m / s}$ each. And the loss is **never** zero unless $e = 1$: no real collision of finite duration conserves kinetic energy exactly, because the deformation that transmits the contact force is always partly inelastic.
:::

::: example Ballistic pendulum {#ex-ballistic}
A $10\ \mathrm{g}$ bullet is fired into a $4\ \mathrm{kg}$ block resting on a $30^{\circ}$ chute and becomes embedded. The block slides $600\ \mathrm{mm}$ up the chute before stopping, with $\mu_k = 0.25$. Find the bullet's speed.
::: solution
**Phase 1 — impact, momentum along the chute.** The normal impulse and the component of weight along the chute are both negligible over the few milliseconds of impact:
$$
m_b u \cos 30^{\circ} = \left( m_b + m_B \right) V .
$$
**Phase 2 — sliding, energy.** The deceleration is
$$
a = g \left( \sin 30^{\circ} + \mu_k \cos 30^{\circ} \right)
= 9.81 \left( 0.5 + 0.2165 \right) = 7.03\ \mathrm{m / s^{2}},
$$
$$
V = \sqrt{2 a s} = \sqrt{2 \times 7.03 \times 0.6} = 2.90\ \mathrm{m / s}.
$$
**Back to phase 1:**
$$
u = \frac{\left( 4.01 \right) \times 2.898}{0.01 \times \cos 30^{\circ}} = 1340\ \mathrm{m / s}.
$$
*Check.* The bullet's initial kinetic energy is $\tfrac{1}{2} \times 0.01 \times 1340^{2} = 8980\ \mathrm{J}$, the block-bullet system after impact has $\tfrac{1}{2} \times 4.01 \times 2.898^{2} = 16.9\ \mathrm{J}$ — an efficiency of $0.19$ per cent. That is not an error: a perfectly plastic impact between a light fast body and a heavy slow one destroys almost all the energy, since the loss is $\tfrac{1}{2} \mu \left( u_1 - u_2 \right)^{2}$ with $\mu \approx m_b$. $\checkmark$

*Sanity.* The $99.8$ per cent energy loss is exactly why a **ballistic pendulum** works as a measuring instrument and why it was the standard method of measuring muzzle velocity from Robins's *New Principles of Gunnery* in 1742 until electronic chronographs arrived in the 1930s: the velocity follows from momentum, which is conserved, and is quite independent of how much energy is destroyed. Any attempt to do the same measurement by energy would require knowing the deformation work of the bullet in the block, which is precisely what cannot be measured. That separation — momentum survives where energy does not — is the practical reason the two principles are taught separately.
:::
:::

::: widget plot
f: 17143*(1-x*x)
x: 0, 1
y: 0, 20000
labels: \text{energy lost in coupling } \left( \mathrm{J} \right)
caption: Kinetic energy destroyed when a $20\ \mathrm{t}$ wagon at $3\ \mathrm{m / s}$ couples with a $15\ \mathrm{t}$ wagon at $1\ \mathrm{m / s}$, against the coefficient of restitution $x$ of the coupler. The loss falls from $17.1\ \mathrm{kJ}$ at $x = 0$ to zero at $x = 1$, and it goes as $1 - x^{2}$, so a coupler at $x = 0.5$ still destroys $75$ per cent of the inelastic loss. The curve is the reason railway draft gears are deliberately made **inelastic**: the $17\ \mathrm{kJ}$ has to go somewhere, and a hydraulic or friction-ring gear that dissipates it over $100\ \mathrm{mm}$ of stroke keeps the coupler force below $200\ \mathrm{kN}$, whereas an elastic gear returns it as a recoil that slams the wagons apart again.
:::

## Angular impulse and momentum

::: definition Angular momentum about a point {#def-angular-momentum}
For a particle about a fixed point $O$,
$$
\mathbf{H}_O = \mathbf{r} \times m \mathbf{v}, \qquad
\sum \mathbf{M}_O = \dot{\mathbf{H}}_O ,
$$
and integrating,
$$
\left( \mathbf{H}_O \right)_1 + \sum \int_{t_1}^{t_2} \mathbf{M}_O \, \mathrm{d}t = \left( \mathbf{H}_O \right)_2 .
$$
For a **central force**, directed along $\mathbf{r}$, the moment about the centre vanishes and $\mathbf{H}_O$ is constant in both magnitude and direction.
:::

::: proof Kepler's second law from angular momentum {#proof-kepler}
With $\mathbf{F} = f(r) \, \mathbf{e}_r$ the moment about $O$ is $\mathbf{r} \times \mathbf{F} = \mathbf{0}$, so
$$
\mathbf{H}_O = \mathbf{r} \times m \mathbf{v} = \text{constant vector} .
$$
The constancy of the **direction** means $\mathbf{r}$ and $\mathbf{v}$ always lie in the plane perpendicular to $\mathbf{H}_O$: the motion is **plane**. For the magnitude, the area swept by $\mathbf{r}$ in $\mathrm{d}t$ is
$$
\mathrm{d}A = \tfrac{1}{2} r^{2} \, \mathrm{d}\theta ,
$$
so
$$
\frac{\mathrm{d}A}{\mathrm{d}t} = \tfrac{1}{2} r^{2} \dot{\theta}
= \frac{1}{2 m} \left| \mathbf{r} \times m \mathbf{v} \right|
= \frac{H_O}{2 m} = \text{constant} ,
$$
which is Kepler's second law. Note what the proof used: only that the force is **central**. It did not use the inverse-square form, so the equal-areas law holds for any central force — for a harmonic central force as much as for gravity — and Kepler's first law, the ellipse, is the part that needs $1 / r^{2}$.
:::

::: example Mass pulled in on a string {#ex-string-hole}
A $0.5\ \mathrm{kg}$ mass slides on a smooth horizontal table attached to a string that passes through a hole at the centre. It moves in a circle of radius $300\ \mathrm{mm}$ at $4\ \mathrm{rad / s}$. The string is pulled down until the radius is $150\ \mathrm{mm}$. Find the new angular speed, the tension then, and the work done by the hand.
::: solution
**Angular momentum.** The tension passes through the hole, so its moment about the hole is zero and
$$
m v_1 r_1 = m v_2 r_2
\quad\Longrightarrow\quad
v_{\theta 2} = v_{\theta 1} \frac{r_1}{r_2}
= \left( 4 \times 0.3 \right) \times \frac{0.3}{0.15} = 2.40\ \mathrm{m / s},
$$
$$
\omega_2 = \frac{v_{\theta 2}}{r_2} = \frac{2.40}{0.15} = 16.0\ \mathrm{rad / s} = 153\ \mathrm{rpm}.
$$
**Tension.**
$$
T = \frac{m v_{\theta 2}^{2}}{r_2} = \frac{0.5 \times 2.40^{2}}{0.15} = 19.2\ \mathrm{N}.
$$
**Work done by the hand.**
$$
U = \Delta T = \tfrac{1}{2} m \left( v_2^{2} - v_1^{2} \right)
= \tfrac{1}{2} \times 0.5 \times \left( 2.40^{2} - 1.20^{2} \right) = 1.08\ \mathrm{J}.
$$
*Check.* Halving the radius quadruples $\omega$, quarters the period, doubles the speed and quadruples the kinetic energy — and the hand supplies exactly the fourfold increase, $1.08\ \mathrm{J}$ against the initial $0.36\ \mathrm{J}$. $\checkmark$

*Sanity.* Angular momentum is conserved while **energy is not**, and the difference is the work of the pulling force, which acts along the very displacement it causes. This is the mechanism of the contracting figure-skater, of the tornado that spins up as its radius collapses, of a collapsing gas cloud forming a disc, and of a diver tightening on a somersault — in every case $\omega \propto 1 / r^{2}$, so a modest reduction in radius produces a large increase in spin rate, and the energy to do it comes from the muscles that pull the mass inward. It is also why a collapsing cloud **must** flatten: angular momentum cannot be shed, so the collapse proceeds perpendicular to the axis and not along it, which is the origin of every disc in astronomy.
:::
:::

## Impact applications

::: example Rail wagon coupling {#ex-coupling}
A $20\ \mathrm{t}$ wagon rolling at $3\ \mathrm{m / s}$ catches up a $15\ \mathrm{t}$ wagon moving in the same direction at $1\ \mathrm{m / s}$, and the two couple. Find the common velocity and the energy destroyed. If the draft gear absorbs the energy over $120\ \mathrm{mm}$ of stroke, find the mean coupler force.
::: solution
**Common velocity.**
$$
V = \frac{20 \times 3 + 15 \times 1}{20 + 15} = \frac{75}{35} = 2.143\ \mathrm{m / s}.
$$
**Energy destroyed.**
$$
T_1 = \tfrac{1}{2} \left( 20\,000 \times 3^{2} + 15\,000 \times 1^{2} \right) = 97.5\ \mathrm{kJ},
$$
$$
T_2 = \tfrac{1}{2} \times 35\,000 \times 2.143^{2} = 80.4\ \mathrm{kJ}, \qquad
\Delta T = 17.1\ \mathrm{kJ}.
$$
**Mean force.**
$$
F = \frac{17\,143}{0.120} = 143\ \mathrm{kN}.
$$
*Check.* Using the reduced-mass formula, $\mu = 20 \times 15 / 35 = 8.571\ \mathrm{t}$ and
$$
\Delta T = \tfrac{1}{2} \times 8571 \times 2^{2} = 17\,143\ \mathrm{J}. \checkmark
$$

*Sanity.* The relative speed is only $2\ \mathrm{m / s}$, a brisk walk, and the destroyed energy is enough to lift the heavier wagon $87\ \mathrm{mm}$ vertically. That is why shunting is dangerous and why a coupler is a fatigue-critical component: $143\ \mathrm{kN}$ is a **mean**, and a rigid coupler with no cushioning produces a peak several times higher and a stress wave that reflects from the draft sill and cracks the casting. The whole of railway draft-gear design is the reduction of that peak by stretching the $17\ \mathrm{kJ}$ over the longest stroke the clearance allows — which is also why modern freight wagons have $450\ \mathrm{mm}$ of buffer stroke where nineteenth-century ones had $60$.
:::
:::

::: example Bouncing ball {#ex-bounce}
A ball is dropped from $2\ \mathrm{m}$ onto a horizontal floor with $e = 0.85$. Find the height of the first rebound, the total distance travelled before coming to rest and the total time.
::: solution
**First rebound.** With $u = \sqrt{2 g h} = 6.264\ \mathrm{m / s}$ and $v = e u$,
$$
h_1 = e^{2} h = 0.7225 \times 2 = 1.445\ \mathrm{m}.
$$
**Total distance.** The sum $h + 2 h_1 + 2 h_2 + \cdots$ is a geometric series,
$$
d = h + 2 h \frac{e^{2}}{1 - e^{2}} = h \, \frac{1 + e^{2}}{1 - e^{2}}
= 2 \times \frac{1.7225}{0.2775} = 12.4\ \mathrm{m}.
$$
**Total time.**
$$
t = \sqrt{\frac{2 h}{g}} \, \frac{1 + e}{1 - e}
= 0.639 \times \frac{1.85}{0.15} = 7.88\ \mathrm{s}.
$$
*Check.* Both sums converge because $e < 1$, and both blow up as $e \rightarrow 1$, which is right: a perfectly elastic ball never stops. $\checkmark$

*Sanity.* The ball travels $12.4\ \mathrm{m}$ while falling $2\ \mathrm{m}$, and the bounces occupy $7.88\ \mathrm{s}$ in a geometric series whose last terms are microseconds — the classic case of an infinite number of events in a finite time, which is physically cut off when the contact time of the last bounces becomes comparable to the material's own vibration period. The formula $t = \sqrt{2 h / g} \left( 1 + e \right) / \left( 1 - e \right)$ is used to measure $e$ by timing rather than by height, because a stopwatch on the total time is far more repeatable than a ruler on a rebound height, and it is the standard undergraduate determination of restitution.
:::
:::

::: example Oblique impact with a wall {#ex-oblique}
A ball strikes a smooth vertical wall at $20\ \mathrm{m / s}$ in a direction making $30^{\circ}$ with the **normal** to the wall. If $e = 0.7$, find the speed and direction after impact and the fraction of kinetic energy lost.
::: solution
Resolve into normal and tangential components. The wall is smooth, so the tangential component is unchanged and only the normal component is affected:
$$
u_n = 20 \cos 30^{\circ} = 17.32, \qquad u_t = 20 \sin 30^{\circ} = 10.00\ \mathrm{m / s},
$$
$$
v_n = e u_n = 12.12\ \mathrm{m / s}, \qquad v_t = 10.00\ \mathrm{m / s},
$$
$$
v = \sqrt{12.12^{2} + 10.00^{2}} = 15.72\ \mathrm{m / s}, \qquad
\phi = \tan^{-1} \frac{10.00}{12.12} = 39.5^{\circ} \ \text{from the normal},
$$
$$
\frac{\Delta T}{T} = 1 - \left( \frac{15.72}{20} \right)^{2} = 38.3\ \text{per cent}.
$$
*Sanity.* The angle **increases** from $30^{\circ}$ to $39.5^{\circ}$: the wall eats the normal component and leaves the tangential, so the ball leaves more glancing than it arrived. The extreme case is a soft ball thrown nearly normally at a wall, which rebounds nearly along the wall — the reason a tennis ball hit into a wall at a shallow angle comes back at a much steeper one than the mirror angle, and the reason squash players must allow for it. Note also that the energy loss is $38$ per cent while $e^{2} = 0.49$; the loss is **not** $1 - e^{2}$ of the total energy but $1 - e^{2}$ of the **normal** component, and here the normal component is $75$ per cent of the total.
:::
:::

::: example Pile driver {#ex-pile}
A $500\ \mathrm{kg}$ ram falls $1.2\ \mathrm{m}$ onto a $200\ \mathrm{kg}$ pile and does not rebound. Find the energy delivered to the pile and the penetration per blow against a soil resistance of $800\ \mathrm{kN}$.
::: solution
**Ram speed at impact:** $u = \sqrt{2 \times 9.81 \times 1.2} = 4.85\ \mathrm{m / s}$.
**Common velocity** (momentum, weight impulse negligible):
$$
V = \frac{500 \times 4.852}{700} = 3.466\ \mathrm{m / s}.
$$
**Energy before and after:**
$$
T_1 = \tfrac{1}{2} \times 500 \times 4.852^{2} = 5886\ \mathrm{J}, \qquad
T_2 = \tfrac{1}{2} \times 700 \times 3.466^{2} = 4204\ \mathrm{J},
$$
so the transfer efficiency is $4204 / 5886 = 71.4$ per cent — the theoretical maximum for a perfectly plastic blow with this mass ratio, equal to $m_{\text{ram}} / \left( m_{\text{ram}} + m_{\text{pile}} \right)$.
**Penetration.** With the pile's weight assisting,
$$
\delta = \frac{T_2}{R - W} = \frac{4204}{800\,000 - 700 \times 9.81} = 5.30\ \mathrm{mm \ per \ blow}.
$$
*Check.* The efficiency formula gives $500 / 700 = 0.714$ independently of the drop height, which is right: a heavier ram always delivers a greater fraction of its energy, which is the whole content of the engineering maxim "a heavy slow blow beats a light fast one". $\checkmark$

*Sanity.* The $71.4$ per cent is the **upper bound** from rigid-body impact; a real pile driver delivers $60$ to $70$ per cent of the ram's energy at best, because the pile head and the dolly compress elastically and part of that elastic wave is reflected as tension that does no useful work. The wave-equation theory of pile driving, developed from Smith's 1960 discrete-element model, replaces this rigid-body argument entirely for bearing piles, and it predicts something the present analysis cannot: that the **energy** delivered, not the force, governs penetration, and that a pile which "refuses" at $2\ \mathrm{mm}$ per blow may be driven by a shorter, faster stroke rather than a bigger one. That is why modern specification language talks about blows per millimetre and ram stroke together, and why driving a pile with too heavy a ram can shatter the head without advancing it.
:::
:::

::: warning Through an impact, use momentum — never energy
The instinct to write "energy before equals energy after" at a collision is the single most common error in dynamics. Energy is conserved overall — it becomes heat and permanent deformation — but it is **not** conserved as kinetic energy, and the amount lost is unknown until the impact is over. Momentum, by contrast, is conserved exactly in any direction along which no external impulse acts, and it is conserved **whether or not** you know $e$. The correct procedure is always: momentum through the impact, energy after the impact. A useful check is the limit $e = 0$, in which the two bodies must leave with a common velocity; if your formula gives anything else, the signs are wrong.
:::

::: history
The **principle of conservation of momentum** in collision is Descartes's, 1644, in imperfect form, corrected and demonstrated experimentally by Wren, Wallis and Huygens before it was announced to the Royal Society in 1668 and put on a firm experimental footing by Robins. **Impact** as an engineering problem begins with Robins's ballistic pendulum of 1742, described in *New Principles of Gunnery*, which measured muzzle velocity by the swing of a block of wood and settled at the same time the resistance of air to projectiles; the coefficient of restitution is due to the experiments of Hutton and of Ampère on falling balls around 1800, and its modern treatment as a material property is due to Rittinger's 1886 impact tests on minerals, which founded the whole of comminution engineering. **Angular momentum** and its conservation appear in Euler's 1749 treatment of rigid bodies; the identification of the equal-areas law with central forces generally, rather than with gravity specifically, is a consequence of the calculus of variations as applied by Maupertuis and Euler in the 1740s. The **wave-equation theory of pile driving** is Smith's discrete-element model of 1960, made routine by the Pile Driving Analyzer of Pile Dynamics in 1973, and it is one of the few places in geotechnical engineering where a dynamic rather than a static analysis is standard practice.
:::

## Where this leads

The energy counterpart is [[dynamics/work-energy]], and the two together solve impact with friction. Angular momentum for a rigid body rather than a particle is in [[dynamics/rigid-body-kinetics]] and its three-dimensional form, with the gyroscopic terms, in [[dynamics/three-dimensional-dynamics]]. Orbital applications of the central-force result are developed in [[orbital-mechanics/two-body-problem]], and impact of a rigid body about a fixed axis in [[dynamics/rigid-body-energy-momentum]].

::: summary
- $m \mathbf{v}_1 + \sum \int \mathbf{F} \, \mathrm{d}t = m \mathbf{v}_2$: impulse and momentum is the time integral of Newton's law and the tool for unknown, brief forces.
- Momentum is conserved **in a direction**, not absolutely; name the direction and check what impulse acts along it.
- Through an impact use momentum; after it use energy. Kinetic energy is never conserved in a real collision.
- $e$ applies to the components **along the line of impact**; smooth surfaces leave the tangential components alone.
- The energy destroyed in a direct impact is $\tfrac{1}{2} \mu \left( 1 - e^{2} \right) \left( u_1 - u_2 \right)^{2}$, set by the reduced mass and the relative speed.
- For a central force angular momentum is conserved in magnitude **and** direction, which gives plane motion and equal areas in equal times.
:::

::: quiz
Two identical carts roll on a level frictionless track. Cart $A$ carries a large flat plate of steel and cart $B$ carries a large bag of wet clay; both carts and loads have the same total mass, and $A$ rolls at $u$ into stationary $B$. In which case does the combined pair move off faster?
- [ ] The steel case, because the collision is more nearly elastic
- [ ] The clay case, because the clay absorbs energy
- [x] Both alike, at $u / 2$
- [ ] Neither moves off; the momentum is destroyed
::: solution
Both alike, at $u / 2$. The velocity after a perfectly inelastic coupling follows from momentum alone, $V = m u / 2 m = u / 2$, and is completely independent of how much kinetic energy is destroyed or where it goes. What the clay changes is the **force** and the **duration** of the contact, not the final velocity: the same impulse is delivered over a longer time and a lower peak. This is the single most useful separation in impact mechanics, and it is why a crash structure is designed against force and time while a trajectory calculation only ever needs momentum. It is also why a $100\ \mathrm{km / h}$ collision with a rigid wall and one with an identical oncoming car at $100\ \mathrm{km / h}$ are not the same as a $200\ \mathrm{km / h}$ collision into a wall — the momentum change and the energy dissipation are both doubled, not quadrupled, per car.
:::
:::

## Exercises

::: exercise Impulse {level=1 check="48"}
A $2\ \mathrm{kg}$ ball moving at $6\ \mathrm{m / s}$ is brought to rest in $0.25\ \mathrm{s}$. Find the average force.
::: solution
$F = m v / t = 2 \times 6 / 0.25 = 48\ \mathrm{N}$.
*Note.* The answer to enter is $48\ \mathrm{N}$.
:::
:::

::: exercise Direct impact {level=1 check="0.25"}
Two equal smooth spheres, one at rest, collide directly with $e = 1$. What fraction of the incoming kinetic energy does the struck sphere receive?
::: solution
All of it: with $e = 1$ and equal masses the first stops dead and the second leaves with the full speed, so the fraction is $1$. For $e = 0$ they move together at half the speed and the struck sphere receives $\tfrac{1}{4}$ of the energy.
*Note.* The answer to enter is the $e = 0$ fraction, $0.25$.
:::
:::

::: exercise Angular momentum {level=1 check="4.0"}
A particle moves under a central force. At one instant it is at $r = 0.4\ \mathrm{m}$ with a transverse velocity of $10\ \mathrm{m / s}$. What is its transverse velocity at $r = 1.0\ \mathrm{m}$?
::: solution
$v_\theta = 10 \times 0.4 / 1.0 = 4.0\ \mathrm{m / s}$.
:::
:::

::: exercise Oblique impact {level=2}
A ball is dropped from a height of $1.5\ \mathrm{m}$ and rebounds to $0.9\ \mathrm{m}$. Find $e$ and the fraction of energy lost.
::: solution
$$
e = \sqrt{\frac{0.9}{1.5}} = 0.775, \qquad
\frac{\Delta T}{T} = 1 - e^{2} = 1 - 0.60 = 40\ \text{per cent}.
$$
*Sanity.* Note that $e$ is the square root of the height ratio, so a $40$ per cent energy loss shows up as only a $30$ per cent loss of height. This is why a rebound test looks more encouraging than it is, and why a specification for a sports surface quotes force reduction rather than rebound height.
:::
:::

::: exercise Two-stage impact {level=2}
Three identical smooth balls lie in a row on a smooth table, $A$ and $B$ touching and $C$ a little away. $A$ is struck at $u$ and hits $B$; $B$ then hits $C$. If $e = 0.9$ for each impact, find the final speeds.
::: solution
**First impact.** With equal masses and $e = 0.9$,
$$
v_A = u \, \frac{1 - e}{2} = 0.05 u, \qquad
v_B = u \, \frac{1 + e}{2} = 0.95 u .
$$
**Second impact.** $B$ at $0.95 u$ strikes $C$ at rest:
$$
v_B' = 0.95 u \times 0.05 = 0.0475 u, \qquad
v_C = 0.95 u \times 0.95 = 0.9025 u .
$$
**Final:** $v_C = 0.9025 u$, and since $A$ at $0.05 u$ is now **faster** than $B$ at $0.0475 u$ and behind it, a third impact follows, giving $v_A' = 0.0476 u$ and $v_B'' = 0.0499 u$.
*Sanity.* The chain multiplies the loss: after two impacts the last ball carries $81$ per cent of the original energy rather than $90$ per cent, and after $n$ impacts the fraction is $\left[ \left( 1 + e \right) / 2 \right]^{2 n}$. This is why Newton's cradle with many balls loses its click so quickly and why a line of billiard balls transmits a break so badly — the loss compounds geometrically along the chain, which is also the reason a train's in-train forces die out along the length of a long rake of coupled wagons.
:::
:::

::: exercise Rocket thrust {level=2}
A rocket of initial mass $400\ \mathrm{kg}$ ejects gas at $2500\ \mathrm{m / s}$ relative to itself at $3\ \mathrm{kg / s}$. Find the initial acceleration vertically upwards, and the velocity after $60\ \mathrm{s}$ of vertical flight neglecting drag and the variation of $g$.
::: solution
**Thrust:** $T = \dot{m} v_e = 3 \times 2500 = 7500\ \mathrm{N}$.
**Initial acceleration:**
$$
a = \frac{T - m g}{m} = \frac{7500 - 400 \times 9.81}{400} = 8.94\ \mathrm{m / s^{2}} .
$$
**Velocity (Tsiolkovsky):**
$$
v = v_e \ln \frac{m_0}{m_0 - \dot{m} t} - g t
= 2500 \ln \frac{400}{400 - 180} - 9.81 \times 60
= 2500 \times 0.5978 - 589 = 906\ \mathrm{m / s}.
$$
*Sanity.* The gravity loss is $589\ \mathrm{m / s}$ of the $1495\ \mathrm{m / s}$ ideal, a $28$ per cent penalty for burning vertically for a minute. That is why a launch vehicle turns down-range within the first minute rather than climbing straight up: the gravity loss is $g t$ whatever the trajectory's shape, but the **time** to orbit is minimised by accelerating horizontally as soon as the atmosphere allows.
:::
:::

::: exercise Design {level=3}
A drop hammer of mass $1200\ \mathrm{kg}$ falls $1.8\ \mathrm{m}$ onto a forging and does not rebound, $e = 0$. Find the energy delivered to the work, the mean forging force if the die closes $12\ \mathrm{mm}$, and the anvil mass needed if the anvil's rebound velocity is not to exceed $0.05\ \mathrm{m / s}$.
::: solution
**Speed at impact:** $u = \sqrt{2 \times 9.81 \times 1.8} = 5.943\ \mathrm{m / s}$.
**Energy available:** $T_1 = \tfrac{1}{2} \times 1200 \times 5.943^{2} = 21\,190\ \mathrm{J}$.
**Energy delivered to the work** (anvil taken as effectively fixed by its guides during the blow):
$$
F_{\text{mean}} = \frac{21\,190}{0.012} = 1.77\ \mathrm{MN}.
$$
**Anvil mass.** Treating the anvil as a free body and requiring its rebound not to exceed $0.05\ \mathrm{m / s}$, the momentum given to it is at most $M \times 0.05$, and momentum conservation in the blow gives the hammer-plus-anvil velocity
$$
V = \frac{1200 \times 5.943}{1200 + M} \le 0.05
\quad\Longrightarrow\quad
M \ge \frac{1200 \times 5.943}{0.05} - 1200 = 141\,400\ \mathrm{kg}.
$$
*Sanity.* The requirement of $141\ \mathrm{t}$ of anvil for a $1.2\ \mathrm{t}$ hammer is the reason a forging hammer sits on a separate massive block from its foundation — an anvil block of $50$ to $150$ times the ram mass, isolated on timber or spring pads so that the blow's impulse does not reach the building. It is also why counter-blow hammers, in which two rams of equal and opposite momentum strike the work between them, need no anvil at all: the total momentum is zero, so nothing has to be absorbed, and a counter-blow machine of half the ram mass delivers the same energy with a fraction of the foundation.
:::
:::

::: exercise Derivation {level=3}
Derive the common-velocity and restitution formulas for a direct central impact, and from them the energy loss. Hence show that a body striking a fixed rigid wall loses all its kinetic energy when $e = 0$, and explain why this does not contradict momentum conservation.
::: solution
**Solution of the two equations.** From
$$
m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2, \qquad v_2 - v_1 = e \left( u_1 - u_2 \right) \equiv e u ,
$$
substitute $v_2 = v_1 + e u$:
$$
m_1 u_1 + m_2 u_2 = \left( m_1 + m_2 \right) v_1 + m_2 e u
\quad\Longrightarrow\quad
v_1 = u_1 - \frac{m_2 \left( 1 + e \right)}{m_1 + m_2} u ,
$$
using $m_1 u_1 + m_2 u_2 - m_2 e u = \left( m_1 + m_2 \right) u_1 - m_2 \left( 1 + e \right) u$. Similarly
$$
v_2 = u_2 + \frac{m_1 \left( 1 + e \right)}{m_1 + m_2} u .
$$
**Energy loss.** With $\mu = m_1 m_2 / \left( m_1 + m_2 \right)$,
$$
T_1 - T_2 = \tfrac{1}{2} m_1 \left( u_1^{2} - v_1^{2} \right) + \tfrac{1}{2} m_2 \left( u_2^{2} - v_2^{2} \right)
= \tfrac{1}{2} \mu \left( 1 - e^{2} \right) u^{2} .
$$
**The wall.** A fixed wall is the limit $m_2 \rightarrow \infty$, in which $\mu \rightarrow m_1$ and $u \rightarrow u_1$, giving $T_1 - T_2 = \tfrac{1}{2} m_1 u_1^{2} \left( 1 - e^{2} \right)$ — the whole of it when $e = 0$.

**Why momentum is not contradicted.** Momentum is conserved for the **system**, but the wall is attached to the Earth, so the correct $m_2$ is the mass of the Earth, $5.97 \times 10^{24}\ \mathrm{kg}$. The Earth's recoil velocity is then
$$
V = \frac{m_1 u_1}{M_E} = \frac{1 \times 10}{5.97 \times 10^{24}} = 1.7 \times 10^{- 24}\ \mathrm{m / s},
$$
and its kinetic energy $\tfrac{1}{2} M_E V^{2} = 8.5 \times 10^{- 24}\ \mathrm{J}$ — negligible, because the energy carried by a body of momentum $p$ is $p^{2} / 2 M$, which vanishes as $M$ grows while $p$ stays fixed. Momentum can be transferred to an arbitrarily massive body with an arbitrarily small energy transfer, which is exactly what a support, a wall or a foundation does, and it is why "the wall takes the momentum but not the energy" is not a paradox but the ordinary behaviour of a constraint.
:::
:::
