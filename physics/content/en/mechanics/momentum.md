Two ice skaters push off from one another and drift apart. A hammer strikes a nail. A rocket, with nothing to push against but its own exhaust, gains speed. In each case the contact force is large, short-lived, and poorly known as a function of time. Newton's second law still holds, but integrating it over the unknown force is not a practical way to find that force. Integrating it over the short time is practical. The integral of the force is the **impulse**, and it equals the change in **momentum**.

If the impulses inside a system cancel, the total momentum does not change. That is the conservation law used on collisions. Kinetic energy is a different question: [[mechanics/work-energy]] already showed that kinetic friction, or a deformation that does not spring back, can change $K$ while the momentum sum still balances. This chapter keeps the two ledgers apart, derives the one-dimensional collision formulas, and ends with the rocket, where the mass of the object we are following is itself changing and $F = ma$ must not be copied down with an undefined $F$.

Take $g = 9.80\,\mathrm{m/s^2}$ when a weight is needed. Most of the collision arithmetic never uses it, which is part of the point: during a brief impact the impulse of the weight is negligible beside the impulse of the contact force.

## Momentum and impulse

::: definition Momentum {#def-momentum}
The **momentum** of a particle of mass $m$ and velocity $\mathbf{v}$ is the vector

$$
\mathbf{p} = m\mathbf{v}.
$$ {#eq-momentum}

The SI unit is the kilogram metre per second, $\mathrm{kg\,m/s}$. In one dimension the signed component $p = mv$ carries the direction: $v > 0$ and $v < 0$ give momenta of opposite sign.
:::

Momentum is not kinetic energy. Kinetic energy depends on $v^2$ and has no direction. Momentum depends on $\mathbf{v}$ and points the same way. Two particles of equal mass and opposite velocity have total momentum zero and total kinetic energy $mv^2$, not zero. Confusing the two is the mistake recorded at the end of the chapter.

Newton's second law, for constant mass, is $\mathbf{F}_{\mathrm{net}} = m\mathbf{a} = \deriv{\mathbf{p}}{t}$. The form with momentum is the one that survives a short, fierce force. Integrate both sides through the interval in which the force acts.

::: definition Impulse {#def-impulse}
The **impulse** of a force $\mathbf{F}$ from time $t_1$ to time $t_2$ is

$$
\mathbf{J} = \int_{t_1}^{t_2} \mathbf{F}\,\dd t.
$$ {#eq-impulse-def}

Impulse is a vector. Its SI unit, the newton second, is the same unit as momentum: $1\,\mathrm{N\cdot s} = 1\,\mathrm{kg\,m/s}$.
:::

::: theorem Impulse–momentum theorem {#thm-impulse}
Let a particle have constant mass $m$. The impulse of the net force on the particle from $t_1$ to $t_2$ equals the change in its momentum,

$$
\mathbf{J}_{\mathrm{net}} = \int_{t_1}^{t_2} \mathbf{F}_{\mathrm{net}}\,\dd t = \mathbf{p}(t_2) - \mathbf{p}(t_1) = \Delta\mathbf{p}.
$$ {#eq-impulse}
:::

::: proof
Constant mass is the hypothesis that lets $\mathbf{F}_{\mathrm{net}} = m\,\deriv{\mathbf{v}}{t} = \deriv{\mathbf{p}}{t}$, which is Newton's second law in an inertial frame, as in [[mechanics/newton-laws]]. Integrate from $t_1$ to $t_2$:

$$
\int_{t_1}^{t_2} \mathbf{F}_{\mathrm{net}}\,\dd t = \int_{t_1}^{t_2}\deriv{\mathbf{p}}{t}\,\dd t = \mathbf{p}(t_2) - \mathbf{p}(t_1).
$$

The same statement holds one component at a time. If several forces act, their impulses add, because integration is linear, and the sum equals $\Delta\mathbf{p}$. The impulse of one force alone equals $\Delta\mathbf{p}$ only when that force is the net force, or when the impulses of the others are negligible over the interval in question.
:::

A large force acting for a short time can transfer a perfectly ordinary momentum. The shape of $F(t)$ during the blow is often unknown. Only the area under the graph is fixed by the motion, because that area is $\Delta p$.

Consider a ball of mass $0.200\,\mathrm{kg}$ whose velocity changes from $-30.0\,\mathrm{m/s}$ to $+20.0\,\mathrm{m/s}$ during a contact lasting $2.00\times 10^{-3}\,\mathrm{s}$. The change in momentum is

$$
\Delta p = 0.200\big(20.0 - (-30.0)\big) = 0.200\times 50.0 = 10.0\,\mathrm{kg\,m/s}.
$$

The average contact force, in the forward direction, has magnitude $J/\Delta t = 10.0/(2.00\times 10^{-3}) = 5.00\times 10^3\,\mathrm{N}$. Over the same $2.00\,\mathrm{ms}$ the weight $mg = 0.200\times 9.80 = 1.96\,\mathrm{N}$ delivers an impulse of only

$$
mg\,\Delta t = 1.96\times 2.00\times 10^{-3} = 3.92\times 10^{-3}\,\mathrm{N\cdot s},
$$

about $0.04\%$ of $10.0\,\mathrm{N\cdot s}$. During the impact itself the weight's impulse may be dropped. After the impact, over a flight lasting a second, the weight's impulse is $1.96\,\mathrm{N\cdot s}$ and is no longer a small correction. "Negligible external impulse" is a statement about an interval, not a property of the force for all time.

::: intuition The area under the force graph
Plot the contact force against time. It may rise to thousands of newtons and fall again within a millisecond, with a shape that depends on how the surfaces deform. The impulse is the area of that spike. [[#thm-impulse]] says the area equals the change in momentum, whether or not you can draw the spike accurately. Measuring the velocities before and after is often easier than measuring the force, and it answers the question the area would have answered.
:::

::: quiz
A cart moves in the negative direction at constant speed. Its momentum is
- [ ] zero, because momentum is $mv^2$ and the two directions cancel inside the square
- [ ] positive, because mass is positive
- [x] negative, because velocity is signed and momentum is $mv$
- [ ] undefined, because a vector cannot be negative
::: solution
In one dimension the component $p = mv$ has the sign of $v$. Mass is positive, so a negative velocity means a negative momentum. Kinetic energy $K = \tfrac12 mv^2$ is where the square appears, and it is positive for both signs of $v$. Calling a component negative is not a difficulty for a vector: the component along a chosen axis may have either sign, and the vector itself points along that axis in the corresponding direction.
:::
:::

## Conservation of momentum

A system is a list of particles we have chosen to treat together. Forces between members of the list are **internal**. Forces from outside the list are **external**. The split depends on the list. The force between two skaters is internal to the two-skater system and external to either skater alone.

::: theorem Conservation of momentum {#thm-conservation}
Let a system consist of particles whose masses are constant. Suppose that, during a time interval, the net external force on the system is zero, and that the internal forces come in equal-and-opposite pairs acting along the line joining the particles (central forces, as required by Newton's third law in the form used here). Then the total momentum of the system is constant on that interval:

$$
\mathbf{P} = \sum_i m_i\mathbf{v}_i = \text{constant}.
$$ {#eq-mom-cons}
:::

::: proof
It is enough to write the argument for two particles; each additional pair of internal forces cancels in the same way. Let $\mathbf{F}_1^{\mathrm{ext}}$ and $\mathbf{F}_2^{\mathrm{ext}}$ be the external forces, and let $\mathbf{F}_{12}$ be the force on particle 1 due to particle 2, so the force on particle 2 due to particle 1 is $\mathbf{F}_{21}$. Newton's second law gives

$$
m_1\mathbf{a}_1 = \mathbf{F}_1^{\mathrm{ext}} + \mathbf{F}_{12}, \qquad m_2\mathbf{a}_2 = \mathbf{F}_2^{\mathrm{ext}} + \mathbf{F}_{21}.
$$

Add these equations:

$$
\deriv{}{t}(m_1\mathbf{v}_1 + m_2\mathbf{v}_2) = \mathbf{F}_1^{\mathrm{ext}} + \mathbf{F}_2^{\mathrm{ext}} + \mathbf{F}_{12} + \mathbf{F}_{21}.
$$

The third-law hypothesis is $\mathbf{F}_{21} = -\mathbf{F}_{12}$, with the two forces along the line joining the particles. The internal sum vanishes. The hypothesis that the net external force vanishes then gives $\deriv{\mathbf{P}}{t} = \mathbf{0}$, so $\mathbf{P}$ is constant.

The "along the line" part of the hypothesis is not required for this cancellation. Equal and opposite is enough for linear momentum. The central-force requirement is part of the third law we are assuming, and it becomes indispensable for angular momentum about a point, which is taken up in [[mechanics/angular-momentum]]. Stating it here keeps the hypothesis complete.
:::

Conservation is not a claim that every velocity stays the same. The skaters' velocities change. Their momentum changes are opposite, and the total does not change. Nor does conservation require the internal forces to be small. The larger they are, the more rapidly the individual momenta change, and the more exactly they still cancel in the sum, provided they remain an equal-and-opposite pair.

The external-force hypothesis is the one that fails in ordinary life if you choose the system badly. A nail driven into a fixed wall exerts a large force on the hammer during the blow. For the hammer alone, momentum is not conserved: the nail's impulse is external and is the whole point of the blow. For the hammer plus the wall plus the Earth, the forces at the nail are internal, and the momentum of that enormous system barely changes. In practice one computes the impulse on the hammer from $\Delta\mathbf{p}$ of the hammer, using [[#thm-impulse]], and does not pretend that the hammer's momentum was conserved.

Friction from a track, gravity, and a pivot are external when the system is only the colliding bodies. Over a long time they matter. Over a collision lasting a millisecond their impulse is often small beside the contact impulse, by the same arithmetic as the ball above. The standard collision model says: during the impact, neglect external impulses, conserve the momentum of the colliding bodies, and do not apply that conservation to the later interval in which friction brings them to rest.

## The centre of mass

The total momentum has a useful interpreter. It is the momentum the system would have if all of its mass moved with a single velocity, the velocity of the **centre of mass**.

::: definition Centre of mass {#def-cm}
For particles of masses $m_i$ at positions $\mathbf{r}_i$, with total mass $M = \sum_i m_i$, the **centre of mass** is

$$
\mathbf{R} = \frac{1}{M}\sum_i m_i\mathbf{r}_i.
$$ {#eq-cm}

In one dimension the same formula reads $X = (\sum_i m_i x_i)/M$.
:::

::: theorem Motion of the centre of mass {#thm-cm}
Let the masses be constant, and let the internal forces cancel in equal-and-opposite pairs as in [[#thm-conservation]]. Then the total momentum is

$$
\mathbf{P} = M\mathbf{v}_{\mathrm{cm}}, \qquad \mathbf{v}_{\mathrm{cm}} = \deriv{\mathbf{R}}{t},
$$ {#eq-pcm}

and the centre of mass accelerates exactly as a single particle of mass $M$ would under the net external force:

$$
M\mathbf{a}_{\mathrm{cm}} = \mathbf{F}_{\mathrm{ext}}.
$$ {#eq-acm}

If $\mathbf{F}_{\mathrm{ext}} = \mathbf{0}$, the centre of mass moves with constant velocity, which is [[#thm-conservation]] read at a single point.
:::

::: proof
Differentiate [[#eq-cm]]. Constant masses pass through the derivative:

$$
\mathbf{v}_{\mathrm{cm}} = \deriv{\mathbf{R}}{t} = \frac{1}{M}\sum_i m_i\mathbf{v}_i.
$$

Multiplying by $M$ gives $\mathbf{P} = \sum_i m_i\mathbf{v}_i = M\mathbf{v}_{\mathrm{cm}}$. Differentiate once more:

$$
M\mathbf{a}_{\mathrm{cm}} = \sum_i m_i\mathbf{a}_i = \sum_i\mathbf{F}_i.
$$

Split $\sum_i\mathbf{F}_i$ into external forces and internal pairs. Each internal pair sums to zero by the third-law hypothesis used in [[#thm-conservation]]. What remains is $\mathbf{F}_{\mathrm{ext}}$. If that vector is zero, $\mathbf{a}_{\mathrm{cm}} = \mathbf{0}$, so $\mathbf{v}_{\mathrm{cm}}$ is constant and therefore $\mathbf{P}$ is constant.
:::

The centre of mass is the balance point of the mass distribution. Two particles of masses $m_1$ and $m_2$ on the $x$-axis sit at $X = (m_1 x_1 + m_2 x_2)/(m_1 + m_2)$, closer to the heavier one. Collisions move the particles violently relative to each other and leave $X(t)$ unimpressed: if no external force acts, $X(t)$ continues in uniform motion, straight through the impact. That is often the easiest thing to compute, and the final velocities of a perfectly inelastic collision are simply this velocity, as the next section shows.

Internal forces can change the kinetic energy and can change how the mass is arranged around the centre of mass. They cannot change $M\mathbf{v}_{\mathrm{cm}}$. Any problem that asks "where is the system heading?" without asking "how is it rearranging itself?" is a centre-of-mass problem.

## Collisions in one dimension

Model a collision as two particles moving on a line. Write $u_1$ and $u_2$ for the velocities immediately before the impact and $v_1$ and $v_2$ for the velocities immediately after, signs included. Positive means the same chosen direction for every velocity in the problem. An unknown contact force acts for a short time. External impulses during that short time are neglected, so [[#thm-conservation]] gives

$$
m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2.
$$ {#eq-collision-mom}

One equation cannot determine two unknowns. A second relation describes how elastic the impact is, in the narrow sense of how the relative velocity behaves.

::: definition Coefficient of restitution {#def-restitution}
The **coefficient of restitution** $e$ of a one-dimensional collision is the number, with $0 \le e \le 1$, such that the relative velocity of separation equals $e$ times the relative velocity of approach:

$$
v_2 - v_1 = -e(u_2 - u_1) = e(u_1 - u_2).
$$ {#eq-restitution}

The two forms are identical. The first compares separation after the collision with approach before it, inserting a minus sign because those two relative velocities point oppositely when the particles bounce. The second form multiplies the incoming relative velocity $u_1 - u_2$ by $e$ and equates it to $v_2 - v_1$.
:::

Approach means the component of the relative velocity that is closing the gap. If particle 1 is to the left of particle 2 and the axis points to the right, they are approaching when $u_1 - u_2 > 0$. After an impact with $e > 0$ one then has $v_2 - v_1 > 0$: particle 2 pulls away to the right, or particle 1 falls behind, or both.

The value $e = 1$ is a **perfectly elastic** collision. The value $e = 0$ is **perfectly inelastic**: [[#eq-restitution]] forces $v_2 = v_1$, so the bodies move off with a common velocity. They need not look fused, but they share one velocity immediately afterwards. Values between $0$ and $1$ are the ordinary partial cases. A coefficient above $1$ would mean that the relative speed increased because some stored energy was released in the impact. This chapter keeps $0 \le e \le 1$.

::: theorem Final velocities in one dimension {#thm-velocities}
Assume [[#eq-collision-mom]] and [[#eq-restitution]], and write $M = m_1 + m_2$. The velocities immediately after the collision are

$$
\begin{aligned}
v_1 &= \frac{m_1 u_1 + m_2 u_2 - m_2 e(u_1 - u_2)}{M}, \\
v_2 &= \frac{m_1 u_1 + m_2 u_2 + m_1 e(u_1 - u_2)}{M}.
\end{aligned}
$$ {#eq-vfinal}
:::

::: proof
Solve the restitution rule for $v_2$:

$$
v_2 = v_1 + e(u_1 - u_2).
$$

Substitute into momentum conservation:

$$
\begin{aligned}
m_1 u_1 + m_2 u_2
&= m_1 v_1 + m_2\big(v_1 + e(u_1 - u_2)\big) \\
&= (m_1 + m_2)v_1 + m_2 e(u_1 - u_2).
\end{aligned}
$$

Hence

$$
v_1 = \frac{m_1 u_1 + m_2 u_2 - m_2 e(u_1 - u_2)}{m_1 + m_2}.
$$

Put this back into $v_2 = v_1 + e(u_1 - u_2)$. The extra term contributes $e(u_1 - u_2)$ with denominator $M$, which is $(m_1 + m_2)e(u_1 - u_2)/M$. Adding that to the numerator of $v_1$ cancels $-m_2 e(u_1 - u_2)$ and leaves $+m_1 e(u_1 - u_2)$:

$$
v_2 = \frac{m_1 u_1 + m_2 u_2 + m_1 e(u_1 - u_2)}{m_1 + m_2}.
$$
:::

::: corollary Perfectly inelastic collision {#cor-inelastic}
If $e = 0$, both bodies move at the centre-of-mass velocity

$$
v_1 = v_2 = \frac{m_1 u_1 + m_2 u_2}{m_1 + m_2} = v_{\mathrm{cm}}.
$$
:::

::: proof
Set $e = 0$ in [[#eq-vfinal]]. Both numerators reduce to $m_1 u_1 + m_2 u_2$, so $v_1 = v_2 = P/M$. By [[#eq-pcm]] that ratio is $v_{\mathrm{cm}}$.
:::

::: corollary Equal masses, elastic collision {#cor-exchange}
If $m_1 = m_2$ and $e = 1$, the velocities are exchanged: $v_1 = u_2$ and $v_2 = u_1$. In particular, if the target is at rest ($u_2 = 0$), the first particle stops and the second leaves with velocity $u_1$.
:::

::: proof
Let $m_1 = m_2 = m$ and $e = 1$. The common denominator is $2m$. The numerator of $v_1$ is

$$
m u_1 + m u_2 - m(u_1 - u_2) = m u_1 + m u_2 - m u_1 + m u_2 = 2m u_2,
$$

so $v_1 = u_2$. The numerator of $v_2$ is

$$
m u_1 + m u_2 + m(u_1 - u_2) = m u_1 + m u_2 + m u_1 - m u_2 = 2m u_1,
$$

so $v_2 = u_1$. Setting $u_2 = 0$ gives $v_1 = 0$ and $v_2 = u_1$.
:::

Elastic does not mean "the velocities are exchanged" unless the masses are equal. The first worked example has unequal masses and $e = 1$: both velocities change, and neither particle takes the other's initial velocity. What elastic does mean, for two bodies in one dimension, is that kinetic energy is conserved. The numerical examples confirm it in special cases; the following theorem is the general fact.

::: theorem Elastic collisions conserve kinetic energy {#thm-elastic}
Consider a one-dimensional collision of two particles with $e = 1$, constant masses, and negligible external impulse. The total kinetic energy after the collision equals the total kinetic energy before it.
:::

::: proof
Let $v_{\mathrm{cm}} = (m_1 u_1 + m_2 u_2)/M$ with $M = m_1 + m_2$. Momentum conservation keeps this value the same if it is recomputed from $v_1$ and $v_2$. Velocities relative to the centre of mass are

$$
\begin{aligned}
u_1^{*} &= u_1 - v_{\mathrm{cm}} = \frac{m_2}{M}(u_1 - u_2), \\
u_2^{*} &= u_2 - v_{\mathrm{cm}} = -\frac{m_1}{M}(u_1 - u_2).
\end{aligned}
$$

They satisfy $m_1 u_1^{*} + m_2 u_2^{*} = 0$ and $u_1^{*} - u_2^{*} = u_1 - u_2$. For $e = 1$, restitution says $v_2 - v_1 = u_1 - u_2$. The final relative velocities $v_i^{*} = v_i - v_{\mathrm{cm}}$ therefore obey the same two equations: their mass-weighted sum is zero, and $v_2^{*} - v_1^{*} = u_1 - u_2$. The unique solution is

$$
v_1^{*} = -u_1^{*}, \qquad v_2^{*} = -u_2^{*}.
$$

Each speed relative to the centre of mass is unchanged, so the kinetic energy measured in the centre-of-mass frame,

$$
K^{*} = \tfrac12 m_1 (u_1^{*})^2 + \tfrac12 m_2 (u_2^{*})^2,
$$

is the same before and after. The laboratory kinetic energy differs from $K^{*}$ by the centre-of-mass term. Expanding the squares and using $m_1 u_1^{*} + m_2 u_2^{*} = 0$,

$$
\begin{aligned}
K
&= \tfrac12 m_1(u_1^{*} + v_{\mathrm{cm}})^2 + \tfrac12 m_2(u_2^{*} + v_{\mathrm{cm}})^2 \\
&= K^{*} + (m_1 u_1^{*} + m_2 u_2^{*})v_{\mathrm{cm}} + \tfrac12 M v_{\mathrm{cm}}^2 \\
&= K^{*} + \tfrac12 M v_{\mathrm{cm}}^2.
\end{aligned}
$$

Both $K^{*}$ and $v_{\mathrm{cm}}$ are unchanged by the collision, so $K$ is unchanged. The same algebra with $e \neq 1$ replaces $v_i^{*} = -u_i^{*}$ by $v_i^{*} = -e\, u_i^{*}$, and $K^{*}$ is then multiplied by $e^2$. Kinetic energy is conserved only for $e = 1$.
:::

For $e = 0$ the loss has a compact form, proved as an exercise: the kinetic energy removed from the mechanical account is $\tfrac12\mu(u_1 - u_2)^2$, where $\mu = m_1 m_2/(m_1 + m_2)$ is the reduced mass. The bodies move together at $v_{\mathrm{cm}}$, and the kinetic energy of the motion relative to the centre of mass is entirely gone.

::: widget collision
m1: 2
m2: 1
u1: 3
u2: 0
e: 1
caption: Start at e = 1 and check the final velocities against the worked example, then lower e to 0 and watch the blocks move off together.
:::

The figure is the collision computed in the next two examples: $m_1 = 2\,\mathrm{kg}$, $m_2 = 1\,\mathrm{kg}$, $u_1 = 3\,\mathrm{m/s}$, $u_2 = 0$. At $e = 1$ the outgoing velocities are $1\,\mathrm{m/s}$ and $4\,\mathrm{m/s}$. At $e = 0$ both blocks move at $2\,\mathrm{m/s}$.

::: example An elastic collision {#ex-elastic}
A block of mass $m_1 = 2.00\,\mathrm{kg}$ and velocity $u_1 = 3.00\,\mathrm{m/s}$ strikes a block of mass $m_2 = 1.00\,\mathrm{kg}$ at rest. Take $e = 1$. Find the final velocities and compare the kinetic energies.
::: solution
Use [[#eq-vfinal]] with $u_2 = 0$ and $e = 1$. The denominator is $m_1 + m_2 = 3.00\,\mathrm{kg}$. The incoming relative velocity is $u_1 - u_2 = 3.00\,\mathrm{m/s}$.

$$
\begin{aligned}
v_1 &= \frac{2.00\times 3.00 + 1.00\times 0 - 1.00\times 1\times 3.00}{3.00} = \frac{6.00 - 3.00}{3.00} = 1.00\,\mathrm{m/s}, \\
v_2 &= \frac{2.00\times 3.00 + 0 + 2.00\times 1\times 3.00}{3.00} = \frac{6.00 + 6.00}{3.00} = 4.00\,\mathrm{m/s}.
\end{aligned}
$$

Check restitution: $v_2 - v_1 = 4.00 - 1.00 = 3.00\,\mathrm{m/s}$ and $e(u_1 - u_2) = 3.00\,\mathrm{m/s}$. Check momentum: before, $2.00\times 3.00 = 6.00\,\mathrm{kg\,m/s}$; after, $2.00\times 1.00 + 1.00\times 4.00 = 6.00\,\mathrm{kg\,m/s}$.

Kinetic energy before:

$$
K_i = \tfrac12\times 2.00\times (3.00)^2 = 9.00\,\mathrm{J}.
$$

Kinetic energy after:

$$
K_f = \tfrac12\times 2.00\times (1.00)^2 + \tfrac12\times 1.00\times (4.00)^2 = 1.00 + 8.00 = 9.00\,\mathrm{J}.
$$

The kinetic energy is unchanged, as [[#thm-elastic]] requires. The velocities were not exchanged: the masses are unequal. The target, initially at rest, leaves faster than the incoming block, and the incoming block continues forward at $1.00\,\mathrm{m/s}$.
:::
:::

::: example The same collision, perfectly inelastic {#ex-inelastic}
Repeat the previous collision with $e = 0$ instead of $e = 1$. Find the common final velocity and the kinetic energy that leaves the mechanical account.
::: solution
By [[#cor-inelastic]],

$$
v_1 = v_2 = \frac{2.00\times 3.00 + 1.00\times 0}{3.00} = \frac{6.00}{3.00} = 2.00\,\mathrm{m/s}.
$$

This is $v_{\mathrm{cm}}$. Momentum is $3.00\times 2.00 = 6.00\,\mathrm{kg\,m/s}$, the same as before the impact. The kinetic energy after the collision is

$$
K_f = \tfrac12\times (2.00 + 1.00)\times (2.00)^2 = \tfrac12\times 3.00\times 4.00 = 6.00\,\mathrm{J}.
$$

Before the collision, $K_i = 9.00\,\mathrm{J}$, as in [[#ex-elastic]]. The mechanical account has lost

$$
K_i - K_f = 9.00 - 6.00 = 3.00\,\mathrm{J}.
$$

Momentum conservation did not conserve kinetic energy. The $3.00\,\mathrm{J}$ left the mechanical ledger in the deformation of the bodies. It is not put back, because $e = 0$ means there is no rebound. The figure, with the slider at $e = 0$, shows the blocks moving off together at this common velocity.
:::
:::

::: example A partly elastic collision {#ex-partial}
Again take $m_1 = 2.00\,\mathrm{kg}$, $u_1 = 3.00\,\mathrm{m/s}$, $m_2 = 1.00\,\mathrm{kg}$ and $u_2 = 0$, now with $e = 0.500$. Find the final velocities and the loss of kinetic energy.
::: solution
The denominator is still $3.00\,\mathrm{kg}$, and $u_1 - u_2 = 3.00\,\mathrm{m/s}$.

$$
\begin{aligned}
v_1 &= \frac{6.00 - 1.00\times 0.500\times 3.00}{3.00} = \frac{6.00 - 1.50}{3.00} = \frac{4.50}{3.00} = 1.50\,\mathrm{m/s}, \\
v_2 &= \frac{6.00 + 2.00\times 0.500\times 3.00}{3.00} = \frac{6.00 + 3.00}{3.00} = 3.00\,\mathrm{m/s}.
\end{aligned}
$$

Restitution: $v_2 - v_1 = 1.50\,\mathrm{m/s}$ and $e(u_1 - u_2) = 0.500\times 3.00 = 1.50\,\mathrm{m/s}$. Momentum: $2.00\times 1.50 + 1.00\times 3.00 = 6.00\,\mathrm{kg\,m/s}$.

$$
\begin{aligned}
K_f &= \tfrac12\times 2.00\times (1.50)^2 + \tfrac12\times 1.00\times (3.00)^2 \\
&= 2.25 + 4.50 = 6.75\,\mathrm{J}.
\end{aligned}
$$

With $K_i = 9.00\,\mathrm{J}$, the loss is $9.00 - 6.75 = 2.25\,\mathrm{J}$. It sits between the elastic case, which loses nothing, and the perfectly inelastic case, which loses $3.00\,\mathrm{J}$. Lowering $e$ in the figure moves the outcome continuously from the first of these to the second.
:::
:::

::: example Equal masses exchange their velocities {#ex-exchange}
Two blocks, each of mass $1.00\,\mathrm{kg}$, collide elastically. Their velocities are $u_1 = 5.00\,\mathrm{m/s}$ and $u_2 = -2.00\,\mathrm{m/s}$. Find the final velocities and the kinetic energy.
::: solution
[[#cor-exchange]] applies directly because the masses are equal and $e = 1$: the velocities are exchanged,

$$
v_1 = u_2 = -2.00\,\mathrm{m/s}, \qquad v_2 = u_1 = 5.00\,\mathrm{m/s}.
$$

As a check, [[#eq-vfinal]] with $m_1 = m_2 = 1.00\,\mathrm{kg}$ gives the same pair. Momentum before is $1.00\times 5.00 + 1.00\times(-2.00) = 3.00\,\mathrm{kg\,m/s}$, and after it is $1.00\times(-2.00) + 1.00\times 5.00 = 3.00\,\mathrm{kg\,m/s}$.

$$
\begin{aligned}
K_i &= \tfrac12(5.00)^2 + \tfrac12(-2.00)^2 = 12.5 + 2.00 = 14.5\,\mathrm{J}, \\
K_f &= \tfrac12(-2.00)^2 + \tfrac12(5.00)^2 = 14.5\,\mathrm{J}.
\end{aligned}
$$

The square removes the sign of $u_2$, so the kinetic energy does not notice which way the second block was travelling, while the momentum does. If instead the target had been at rest, the corollary would have said that the first block stops and the second leaves at $5.00\,\mathrm{m/s}$.
:::
:::

::: quiz
Two lumps of clay collide and stick together on a frictionless track. Which statement is correct?
- [ ] Both momentum and kinetic energy are conserved, because the track is frictionless
- [ ] Kinetic energy is conserved and momentum is not, because the clay deforms
- [x] Momentum is conserved during the impact, and kinetic energy decreases
- [ ] Neither is conserved, because an inelastic collision violates Newton's third law
::: solution
Sticking means $e = 0$. External impulse is negligible during the brief impact on a frictionless track, so total momentum is constant and the common velocity is $v_{\mathrm{cm}}$. Unless the relative velocity was already zero, the kinetic energy of the motion about the centre of mass is lost from the mechanical account. The third law is what makes the internal impulses cancel; an inelastic collision does not repeal it. Deformation is why $e$ is zero, not why momentum would fail.
:::
:::

## Rockets

A rocket is not a collision between two fixed masses. The object whose speed we want is losing mass, and the mass it loses carries momentum away. Writing $F = ma$ with a changing $m$ and an unspecified $F$ does not say which force is meant, nor whether $m$ is inside the derivative. The momentum balance has to be written across a short interval, for a definite collection of matter.

Let $v$ be the forward velocity of the rocket and let $m(t)$ be the mass of the rocket, fuel included, at time $t$. Suppose that in a small interval $\dd t$ the rocket's mass changes by $\dd m$. The rocket is burning fuel, so $\dd m < 0$ and $\dd m/\dd t < 0$. The mass of gas released in that interval is $-\dd m > 0$. Let $v_{\mathrm{ex}} > 0$ be the exhaust speed relative to the rocket, directed backward. A parcel of gas released when the rocket's velocity is $v$ then has ground velocity $v - v_{\mathrm{ex}}$.

Assume no external force on the rocket-plus-the-gas-just-released, over this brief interval. Momentum at the beginning of the interval is $mv$. At the end, the rocket has mass $m + \dd m$ and velocity $v + \dd v$, and the gas has mass $-\dd m$ and velocity $v - v_{\mathrm{ex}}$. Neglect the second-order product $\dd m\,\dd v$. Conservation of momentum reads

$$
(m + \dd m)(v + \dd v) + (-\dd m)(v - v_{\mathrm{ex}}) = mv.
$$

Expand, cancel $mv$, and drop $\dd m\,\dd v$:

$$
m\,\dd v + v\,\dd m - v\,\dd m + v_{\mathrm{ex}}\,\dd m = 0,
$$

which is $m\,\dd v = -v_{\mathrm{ex}}\,\dd m$. Divide by $\dd t$:

$$
m\deriv{v}{t} = v_{\mathrm{ex}}\left(-\deriv{m}{t}\right).
$$ {#eq-rocket}

The quantity $-\dd m/\dd t$ is positive. The right-hand side is a positive thrust, and the rocket accelerates forward. Separating variables,

$$
\dd v = -v_{\mathrm{ex}}\frac{\dd m}{m}.
$$

Integrate from an initial speed $v_0$ at mass $m_0$ to a later speed $v$ at mass $m$, with $v_{\mathrm{ex}}$ constant:

$$
\begin{aligned}
v - v_0
&= -v_{\mathrm{ex}}\int_{m_0}^{m}\frac{\dd m'}{m'}
= -v_{\mathrm{ex}}\big(\ln m - \ln m_0\big)
= v_{\mathrm{ex}}\ln\frac{m_0}{m}.
\end{aligned}
$$

The increase in speed is Tsiolkovsky's equation,

$$
\Delta v = v_{\mathrm{ex}}\ln\frac{m_0}{m}.
$$ {#eq-tsiolkovsky}

The logarithm grows slowly. A large gain in speed costs a large mass ratio $m_0/m$, which is why rockets are built as stages. If a constant external force $\mathbf{F}_{\mathrm{ext}}$ acts, it contributes $\mathbf{F}_{\mathrm{ext}}$ on the right-hand side of the momentum balance and an extra $\mathbf{F}_{\mathrm{ext}}/m$ inside [[#eq-rocket]]. Gravity on a vertical rocket is the usual example. The force-free equation above is the one integrated here.

::: example A rocket in free space {#ex-rocket}
A rocket in free space has exhaust speed $v_{\mathrm{ex}} = 2.50\,\mathrm{km/s}$ relative to the rocket. It fires until its mass has fallen to a quarter of the initial mass. Find the increase in its speed.
::: solution
There is no external force, so [[#eq-tsiolkovsky]] applies. The mass ratio is $m_0/m = 4$, and $\ln 4 = 1.386294\ldots$.

$$
\Delta v = 2.50\times\ln 4 = 2.50\times 1.386294 = 3.46574\,\mathrm{km/s}.
$$

To three significant figures, $\Delta v = 3.47\,\mathrm{km/s}$. One further digit gives $3.466\,\mathrm{km/s}$. The rocket's final speed is this amount greater than its initial speed, in the forward direction. The exhaust, thrown backward relative to the rocket, carries the opposite momentum. Nothing in the derivation required an atmosphere to push against.
:::
:::

::: warning Momentum, kinetic energy, and external impulses
Conserving momentum does not conserve kinetic energy. The inelastic example lost $3.00\,\mathrm{J}$ while the momentum stayed at $6.00\,\mathrm{kg\,m/s}$, and [[#thm-elastic]] isolates $e = 1$ as the case in which the kinetic energy happens to be conserved as well. Momentum is a vector. In one dimension the sign of $mv$ is the direction; dropping a minus because a square root was involved in an energy calculation will assign a block the wrong way. An external impulse from a nail, a wall, or a pivot means the momentum of the colliding bodies alone is not conserved. The impulse–momentum theorem still applies to each body separately. Angular momentum about the pivot may be the conserved quantity instead; that argument is in [[mechanics/angular-momentum]].
:::

::: history Impact, restitution, and the rocket equation
Studies of elastic impact by John Wallis, Christopher Wren and Christiaan Huygens were presented to the Royal Society in 1668 and 1669. They established, for direct collisions, the rules that this chapter derives from momentum conservation together with $e = 1$: in particular, equal masses exchange their velocities. Isaac Newton, in the *Principia* (1687), discussed the relative speed after impact and treated the ratio of separation speed to approach speed as an experimental property of the bodies. That ratio is the coefficient of restitution. Konstantin Tsiolkovsky published the rocket equation in 1903. The derivation above is the modern momentum balance for a variable-mass vehicle; it is not obtained by writing $F = ma$ with a changing mass and an unnamed force.
:::

## Where this leads

Collisions in a plane need the same momentum law written as two components, and usually a statement about the line of impact; the scalar $e$ still governs only the relative velocity along that line. When the bodies are extended and can rotate, linear momentum is not the whole story. A blow that misses the centre of mass changes the angular momentum, and a body mounted on a pivot may have its linear momentum changed by the pivot while its angular momentum about the pivot is constant. Both extensions live in [[mechanics/angular-momentum]], after the rigid-body language of [[mechanics/rotation]] is available. The energy ledger of [[mechanics/work-energy]] remains the test for whether a given $e$ is plausible: $e = 1$ keeps $K$, $e = 0$ removes the centre-of-mass-frame contribution, and a computed $K_f$ larger than $K_i$ for a passive collision means a sign or an arithmetic error. The underlying force law, throughout, is still [[mechanics/newton-laws]].

::: summary
- Momentum $\mathbf{p} = m\mathbf{v}$ is a vector. In one dimension the sign of $mv$ is the direction of motion.
- For constant mass the impulse $\mathbf{J} = \int\mathbf{F}\,\dd t$ of the net force equals $\Delta\mathbf{p}$. A large force acting briefly can deliver a finite momentum.
- If the net external force on a system vanishes and internal forces cancel in central pairs by the third law, the total momentum is constant.
- The centre of mass is $\mathbf{R} = (\sum m_i\mathbf{r}_i)/M$. The total momentum is $M\mathbf{v}_{\mathrm{cm}}$, and $M\mathbf{a}_{\mathrm{cm}} = \mathbf{F}_{\mathrm{ext}}$.
- In a short one-dimensional collision, $m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$ when the external impulse is negligible. The restitution rule $v_2 - v_1 = e(u_1 - u_2)$ closes the problem for $0 \le e \le 1$.
- The outgoing velocities are the two quotients in [[#eq-vfinal]]. Equal masses with $e = 1$ exchange velocities. The case $e = 0$ leaves both bodies at $v_{\mathrm{cm}}$.
- For two bodies in one dimension, $e = 1$ conserves kinetic energy and $e = 0$ does not. Conserving momentum is not a reason to conserve $K$.
- With no external force, a rocket of exhaust speed $v_{\mathrm{ex}}$ satisfies $\Delta v = v_{\mathrm{ex}}\ln(m_0/m)$. The mass $m(t)$ in that formula is the rocket's mass, and $\dd m/\dd t$ is negative.
:::

## Exercises

::: exercise Momentum of a ball {#exr-ball level=1 check="6"}
A ball of mass $0.400\,\mathrm{kg}$ moves at $15.0\,\mathrm{m/s}$ in the positive direction. Find its momentum.
::: solution
By [[#def-momentum]],

$$
p = mv = 0.400\times 15.0 = 6.00\,\mathrm{kg\,m/s}.
$$

The momentum is $+6.00\,\mathrm{kg\,m/s}$. Had the velocity been $-15.0\,\mathrm{m/s}$, the momentum would have been $-6.00\,\mathrm{kg\,m/s}$ and the kinetic energy would have been the same.
:::
:::

::: exercise Impulse of a constant force {#exr-impulse level=1 check="2"}
A constant force of $25.0\,\mathrm{N}$ acts in a fixed direction for $0.0800\,\mathrm{s}$. Find the impulse of the force.
::: solution
The force does not vary, so the integral in [[#def-impulse]] is the product

$$
J = F\Delta t = 25.0\times 0.0800 = 2.00\,\mathrm{N\cdot s}.
$$

If this force is the net force on a particle, [[#thm-impulse]] says the particle's momentum changes by $2.00\,\mathrm{kg\,m/s}$ in the direction of the force. The problem does not give a mass, so it does not determine a velocity.
:::
:::

::: exercise Two lumps of clay {#exr-clay level=1 check="3/2"}
A lump of clay of mass $1.50\,\mathrm{kg}$ moving at $4.00\,\mathrm{m/s}$ strikes a lump of mass $2.50\,\mathrm{kg}$ at rest. They stick together. Find their common speed immediately after the impact. Neglect external impulses during the collision.
::: solution
Sticking means $e = 0$. [[#cor-inelastic]] gives

$$
v = \frac{1.50\times 4.00 + 2.50\times 0}{1.50 + 2.50} = \frac{6.00}{4.00} = 1.50\,\mathrm{m/s}.
$$

The common speed is $1.50\,\mathrm{m/s}$, in the direction of the incoming lump. Momentum is $6.00\,\mathrm{kg\,m/s}$ before and after.

Kinetic energy is not conserved. Before, $K_i = \tfrac12\times 1.50\times (4.00)^2 = 12.0\,\mathrm{J}$. After, $K_f = \tfrac12\times 4.00\times (1.50)^2 = 4.50\,\mathrm{J}$. The collision removes $7.50\,\mathrm{J}$ from the mechanical account. That is consistent with a perfectly inelastic impact and is not a failure of momentum conservation.
:::
:::

::: exercise An elastic collision with a moving target {#exr-moving-target level=2 check="7/2"}
A block of mass $3.00\,\mathrm{kg}$ and velocity $2.00\,\mathrm{m/s}$ collides elastically with a block of mass $1.00\,\mathrm{kg}$ and velocity $-1.00\,\mathrm{m/s}$. Find the final velocity of the lighter block.
::: solution
Here $e = 1$, $u_1 - u_2 = 2.00 - (-1.00) = 3.00\,\mathrm{m/s}$, and $M = 4.00\,\mathrm{kg}$. The numerator of $v_2$ in [[#eq-vfinal]] is

$$
m_1 u_1 + m_2 u_2 + m_1 e(u_1 - u_2) = 3.00\times 2.00 + 1.00\times(-1.00) + 3.00\times 1\times 3.00 = 6.00 - 1.00 + 9.00 = 14.0.
$$

Hence

$$
v_2 = \frac{14.0}{4.00} = 3.50\,\mathrm{m/s}.
$$

The lighter block's final velocity is $+3.50\,\mathrm{m/s}$. For completeness, the heavier block's final velocity is

$$
v_1 = \frac{6.00 - 1.00 - 1.00\times 3.00}{4.00} = \frac{2.00}{4.00} = 0.500\,\mathrm{m/s}.
$$

Momentum before and after is $3.00\times 2.00 + 1.00\times(-1.00) = 5.00\,\mathrm{kg\,m/s}$. Restitution gives $v_2 - v_1 = 3.00\,\mathrm{m/s} = u_1 - u_2$. Kinetic energy before is $\tfrac12\times 3.00\times 4.00 + \tfrac12\times 1.00 = 6.50\,\mathrm{J}$, and after it is $\tfrac12\times 3.00\times(0.500)^2 + \tfrac12\times(3.50)^2 = 0.375 + 6.125 = 6.50\,\mathrm{J}$.
:::
:::

::: exercise A mass ratio of e {#exr-rocket-e level=2 check="2"}
A rocket in free space has exhaust speed $2.00\,\mathrm{km/s}$ relative to the rocket. It burns fuel until the initial mass is $e$ times the final mass, where $e$ is the base of the natural logarithm. Find the increase in the rocket's speed, in $\mathrm{km/s}$.
::: hint
Tsiolkovsky's equation contains $\ln(m_0/m)$, and $\ln e = 1$. The symbol $e$ here is not a coefficient of restitution.
:::
::: solution
No external force acts, so [[#eq-tsiolkovsky]] gives

$$
\Delta v = v_{\mathrm{ex}}\ln\frac{m_0}{m} = 2.00\times\ln e = 2.00\times 1 = 2.00\,\mathrm{km/s}.
$$

The increase is $2.00\,\mathrm{km/s}$. The same exhaust speed with a mass ratio of $4$, as in [[#ex-rocket]], produces a larger $\Delta v$ because $\ln 4 > 1$. The logarithm, not a separate force law, is what converts the mass ratio into a speed.
:::
:::

::: exercise Velocity of the centre of mass {#exr-vcm level=2 check="-1/2"}
A particle of mass $2.00\,\mathrm{kg}$ has velocity $4.00\,\mathrm{m/s}$, and a particle of mass $6.00\,\mathrm{kg}$ has velocity $-2.00\,\mathrm{m/s}$, both on the same line. No external force acts. Find the velocity of the centre of mass.
::: solution
By [[#eq-pcm]], $v_{\mathrm{cm}} = P/M$. The total momentum and total mass are

$$
\begin{aligned}
P &= 2.00\times 4.00 + 6.00\times(-2.00) = 8.00 - 12.0 = -4.00\,\mathrm{kg\,m/s}, \\
M &= 2.00 + 6.00 = 8.00\,\mathrm{kg}.
\end{aligned}
$$

Hence

$$
v_{\mathrm{cm}} = \frac{-4.00}{8.00} = -0.500\,\mathrm{m/s}.
$$

The centre of mass moves at $-0.500\,\mathrm{m/s}$. Because the external force is zero, this velocity does not change if the two particles later collide, whatever the value of $e$. A perfectly inelastic collision would leave both particles at this same velocity.
:::
:::

::: exercise Kinetic energy lost when bodies stick {#exr-loss-proof level=3}
Two particles of masses $m_1$ and $m_2$ collide in one dimension and stick together ($e = 0$). External impulses during the collision are negligible. Prove that the loss of kinetic energy is

$$
K_i - K_f = \tfrac12\mu(u_1 - u_2)^2, \qquad \mu = \frac{m_1 m_2}{m_1 + m_2}.
$$

Check the formula against [[#ex-inelastic]].
::: hint
Write both kinetic energies using velocities relative to $v_{\mathrm{cm}}$. After the collision those relative velocities are zero. The identity $K = K^{*} + \tfrac12 M v_{\mathrm{cm}}^2$ from the proof of [[#thm-elastic]] is the shortest route.
:::
::: solution
Let $M = m_1 + m_2$ and $v_{\mathrm{cm}} = (m_1 u_1 + m_2 u_2)/M$. By [[#cor-inelastic]] the common final velocity is $v_{\mathrm{cm}}$, so the final kinetic energy is $K_f = \tfrac12 M v_{\mathrm{cm}}^2$ and the final centre-of-mass-frame kinetic energy is zero.

The initial centre-of-mass-frame velocities are those used in the proof of [[#thm-elastic]]:

$$
u_1^{*} = \frac{m_2}{M}(u_1 - u_2), \qquad u_2^{*} = -\frac{m_1}{M}(u_1 - u_2).
$$

Their contribution is

$$
\begin{aligned}
K^{*}
&= \tfrac12 m_1\left(\frac{m_2}{M}\right)^2 (u_1 - u_2)^2 + \tfrac12 m_2\left(\frac{m_1}{M}\right)^2 (u_1 - u_2)^2 \\
&= \tfrac12\frac{m_1 m_2}{M^2}(m_2 + m_1)(u_1 - u_2)^2 \\
&= \tfrac12\frac{m_1 m_2}{M}(u_1 - u_2)^2 \\
&= \tfrac12\mu(u_1 - u_2)^2.
\end{aligned}
$$

The expansion $K_i = K^{*} + \tfrac12 M v_{\mathrm{cm}}^2$ then gives $K_i - K_f = K^{*}$, which is the required loss. The hypotheses used are constant masses, $e = 0$, and negligible external impulse, so that the final velocity really is $v_{\mathrm{cm}}$.

In [[#ex-inelastic]], $m_1 = 2.00\,\mathrm{kg}$, $m_2 = 1.00\,\mathrm{kg}$ and $u_1 - u_2 = 3.00\,\mathrm{m/s}$. The reduced mass is $\mu = 2.00/3.00$, and

$$
\tfrac12\mu(u_1 - u_2)^2 = \tfrac12\times\frac{2.00}{3.00}\times 9.00 = 3.00\,\mathrm{J},
$$

which matches the loss computed there from $9.00\,\mathrm{J}$ and $6.00\,\mathrm{J}$.
:::
:::

::: exercise A ball rebounds from a wall {#exr-wall level=3 check="4.2"}
A ball of mass $0.200\,\mathrm{kg}$ hits a stationary wall head-on and rebounds. The speed of approach is $12.0\,\mathrm{m/s}$ and the coefficient of restitution is $0.750$. Treat the wall as fixed, so the ball–wall pair, with the wall omitted from the momentum sum, is not an isolated system. Find the magnitude of the impulse delivered to the ball by the wall.
::: hint
The impulse–momentum theorem applies to the ball whether or not its momentum is conserved. The wall being fixed means the rebound speed is $e$ times the approach speed. Take the approach direction as positive.
:::
::: solution
Take the incoming direction as positive, so $u = +12.0\,\mathrm{m/s}$. A fixed wall is the limit of a target with enormous mass and zero velocity. In that limit [[#eq-vfinal]] gives $v = -e u$ for the ball. With the numbers,

$$
v = -0.750\times 12.0 = -9.00\,\mathrm{m/s}.
$$

The ball's momentum changes by

$$
\Delta p = m(v - u) = 0.200\big(-9.00 - 12.0\big) = 0.200\times(-21.0) = -4.20\,\mathrm{kg\,m/s}.
$$

By [[#thm-impulse]] the impulse on the ball is $\Delta p$, so its magnitude is $4.20\,\mathrm{N\cdot s}$. The negative sign means the wall pushes the ball back against the incoming direction.

Momentum of the ball alone is not conserved: $mu = 2.40\,\mathrm{kg\,m/s}$ becomes $mv = -1.80\,\mathrm{kg\,m/s}$. The difference left through the wall into the Earth. Kinetic energy is also not conserved: $K_i = \tfrac12\times 0.200\times(12.0)^2 = 14.4\,\mathrm{J}$ and $K_f = \tfrac12\times 0.200\times(9.00)^2 = 8.10\,\mathrm{J}$. That decrease is expected for $e = 0.750 < 1$. Conserving the ball's momentum would have given the wrong rebound, and conserving its kinetic energy would have forced $e = 1$.
:::
:::
