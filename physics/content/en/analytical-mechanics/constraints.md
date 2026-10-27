A bead threaded on a circular wire, a pendulum bob on a rigid rod, a block that must stay on the surface of a wedge: in each case the body is not free to go wherever Newton's second law alone would send it. Something holds it to a curve or a surface. That something exerts a force, and the force is the awkward part of the problem. Its size is not given in advance. It adjusts itself, instant by instant, to whatever value keeps the body on the wire, and you only learn that value after you have solved the motion.

Newton's method, applied in Cartesian coordinates, makes you carry these unknown **constraint forces** through the whole calculation: write $m\mathbf{a} = \mathbf{F} + \mathbf{N}$ for every particle, add the equations of constraint, and eliminate. For a single bead that is tolerable. For a double pendulum, a spinning top or a linkage of five rods it is a mess, and most of the mess concerns forces you never wanted to know.

This chapter builds the alternative. We count how many numbers are really needed to say where the system is, choose those numbers as coordinates, and then find a principle, due to d'Alembert, in which the constraint forces drop out automatically because they do no work in any displacement the constraints allow. From that principle we derive Lagrange's equations, the working tool of the rest of the course. At the end we show how to get the constraint forces back, when you do want them, with Lagrange multipliers.

The prerequisites are Newton's laws ([[mechanics/newton-laws]]), work and potential energy ([[mechanics/work-energy]]), and partial derivatives and the chain rule in several variables ([[math-methods/vector-calculus]]). Throughout, $g = 9.80\,\mathrm{m/s^2}$.

## Configuration, constraints and degrees of freedom {#configuration}

Consider a system of $N$ particles with masses $m_1, \dots, m_N$ and position vectors $\mathbf{r}_1, \dots, \mathbf{r}_N$. To say where the system is at one instant you need $3N$ numbers, the Cartesian components of all the positions. That list is the **configuration** of the system, and the set of all configurations allowed at time $t$ is the **configuration space**.

A constraint is a condition that restricts the configuration. The most useful kind is an equation.

::: definition Holonomic constraint {#def-holonomic}
A constraint on a system of $N$ particles is **holonomic** if it can be written as an equation

$$
f(\mathbf{r}_1, \dots, \mathbf{r}_N, t) = 0
$$ {#eq-holonomic}

between the positions and possibly the time. It is **scleronomic** if $f$ does not depend explicitly on $t$, and **rheonomic** if it does. A constraint that cannot be written in the form [[#eq-holonomic]], for instance an inequality or a relation between velocities that cannot be integrated to a relation between positions, is **nonholonomic**.
:::

A simple pendulum of length $\ell$ swinging in the $xy$-plane, with the pivot at the origin, obeys the scleronomic constraints $z = 0$ and $x^2 + y^2 - \ell^2 = 0$. A bead on a hoop that is being spun about a vertical diameter at angular velocity $\omega$ obeys a rheonomic constraint, because the plane of the hoop, and so the equation of the wire, changes with time. A gas molecule in a box obeys the inequality "stay inside the box", which is nonholonomic; so does a particle sliding on the outside of a sphere, which is held by $\abs{\mathbf{r}} \ge R$ and can leave.

If there are $k$ independent holonomic constraints, the configuration is pinned to a subset of $\R^{3N}$ described by $3N - k$ free parameters.

::: definition Degrees of freedom and generalised coordinates {#def-gen-coords}
A system of $N$ particles subject to $k$ independent holonomic constraints has $n = 3N - k$ **degrees of freedom**. A set of **generalised coordinates** is a list of $n$ real numbers $q_1, \dots, q_n$ such that every position can be written as a smooth function

$$
\mathbf{r}_i = \mathbf{r}_i(q_1, \dots, q_n, t), \qquad i = 1, \dots, N,
$$ {#eq-transformation}

for which every choice of the $q_j$ (in some open set) satisfies all the constraints automatically, and every allowed configuration near a given one arises from exactly one choice of the $q_j$.
:::

The phrase "satisfies all the constraints automatically" is the whole point. For the plane pendulum the angle $\phi$ from the downward vertical is a generalised coordinate: $x = \ell\sin\phi$, $y = -\ell\cos\phi$, $z = 0$, and every value of $\phi$ gives a point on the circle. The constraint is no longer an equation to be imposed. It is built into the description.

Generalised coordinates need not be lengths. They can be angles, as for the pendulum, or the amplitude of a mode of vibration, as in [[analytical-mechanics/small-oscillations]]. They need not be orthogonal. What they must do is label configurations one-to-one, at least locally: polar angles on a sphere fail at the poles, which is a defect of the chart, not of the physics.

::: example Counting degrees of freedom {#ex-dof}
Find the number of degrees of freedom, and a set of generalised coordinates, for (a) a double pendulum moving in a vertical plane, (b) a rigid body moving freely in space, and (c) a bead on a circular hoop of radius $R$ that is forced to spin about its vertical diameter with constant angular velocity $\omega$.
::: solution
(a) Two bobs give $3N = 6$ coordinates. The constraints are $z_1 = 0$ and $z_2 = 0$ (motion in a plane), $x_1^2 + y_1^2 = \ell_1^2$ (the upper rod) and $(x_2 - x_1)^2 + (y_2 - y_1)^2 = \ell_2^2$ (the lower rod). These four are independent, so $n = 6 - 4 = 2$. The angles $\phi_1$ and $\phi_2$ that the two rods make with the downward vertical are generalised coordinates:

$$
x_1 = \ell_1\sin\phi_1,\quad y_1 = -\ell_1\cos\phi_1,\quad x_2 = x_1 + \ell_2\sin\phi_2,\quad y_2 = y_1 - \ell_2\cos\phi_2.
$$

(b) A rigid body has a huge number of particles, but its configuration is fixed once we know where three of its points are, provided they are not collinear. Three points give $9$ coordinates, and rigidity fixes the three mutual distances, so $n = 9 - 3 = 6$. Every further particle adds $3$ coordinates and $3$ distance constraints to the first three points, so the count does not change. Three coordinates of the centre of mass and three angles that describe the orientation (for example the Euler angles of [[analytical-mechanics/rigid-bodies]]) are a standard choice.

(c) One particle gives $3$ coordinates. The bead must lie on a sphere of radius $R$ centred at the centre of the hoop, and on the plane of the hoop, which at time $t$ contains the vertical axis and makes angle $\omega t$ with the $xz$-plane. Two constraints, one of them rheonomic, leave $n = 1$. The angle $\theta$ of the bead measured from the bottom of the hoop is a generalised coordinate, with

$$
\mathbf{r} = \bigl(R\sin\theta\cos\omega t,\; R\sin\theta\sin\omega t,\; -R\cos\theta\bigr).
$$

The explicit time in this formula is the signature of a rheonomic constraint. The hoop is driven by a motor, and the motor does work on the bead, a fact that will matter when we ask whether the energy of the bead is conserved.
:::
:::

### Velocities in generalised coordinates

Differentiate [[#eq-transformation]] with respect to time, using the chain rule:

$$
\mathbf{v}_i = \deriv{\mathbf{r}_i}{t} = \sum_{j=1}^{n} \pdv{\mathbf{r}_i}{q_j}\,\dot q_j + \pdv{\mathbf{r}_i}{t}.
$$ {#eq-velocity}

The numbers $\dot q_j$ are the **generalised velocities**. The velocity of each particle is linear in them, with coefficients that depend on the $q$'s and on $t$, plus a term from any explicit time dependence. Two identities follow at once, and they carry the whole derivation of Lagrange's equations.

::: lemma Two identities for generalised velocities {#lem-dots}
Treat $\mathbf{v}_i$ in [[#eq-velocity]] as a function of the independent variables $q_1, \dots, q_n, \dot q_1, \dots, \dot q_n, t$. Then, for each $j$,

$$
\pdv{\mathbf{v}_i}{\dot q_j} = \pdv{\mathbf{r}_i}{q_j}
\qquad\text{and}\qquad
\deriv{}{t}\left(\pdv{\mathbf{r}_i}{q_j}\right) = \pdv{\mathbf{v}_i}{q_j}.
$$ {#eq-dots}
:::

::: proof
In [[#eq-velocity]] the coefficients $\partial\mathbf{r}_i/\partial q_k$ and the term $\partial\mathbf{r}_i/\partial t$ depend on $q$ and $t$ only. Differentiating with respect to $\dot q_j$ therefore picks out the coefficient of $\dot q_j$, which is the first identity. It is sometimes called "cancellation of the dots".

For the second, $\partial\mathbf{r}_i/\partial q_j$ is itself a function of $q_1, \dots, q_n, t$, so its total time derivative along the motion is, by the chain rule,

$$
\deriv{}{t}\left(\pdv{\mathbf{r}_i}{q_j}\right) = \sum_{k} \frac{\partial^2 \mathbf{r}_i}{\partial q_k\,\partial q_j}\,\dot q_k + \frac{\partial^2\mathbf{r}_i}{\partial t\,\partial q_j}.
$$

On the other hand, differentiating [[#eq-velocity]] with respect to $q_j$ gives

$$
\pdv{\mathbf{v}_i}{q_j} = \sum_k \frac{\partial^2\mathbf{r}_i}{\partial q_j\,\partial q_k}\,\dot q_k + \frac{\partial^2\mathbf{r}_i}{\partial q_j\,\partial t}.
$$

The two expressions agree because mixed second partial derivatives of a twice continuously differentiable function are equal.
:::

The kinetic energy $T = \sum_i \frac12 m_i \mathbf{v}_i\cdot\mathbf{v}_i$ becomes, by [[#eq-velocity]], a function $T(q, \dot q, t)$ that is a polynomial of degree two in the generalised velocities. When the transformation does not depend on $t$, the linear and constant terms vanish and $T = \frac12\sum_{j,k} M_{jk}(q)\,\dot q_j\dot q_k$ is a quadratic form in $\dot q$ with a symmetric, positive-definite matrix $M(q)$. For the pendulum, $T = \frac12 m\ell^2\dot\phi^2$; for the bead on the spinning hoop, $T = \frac12 mR^2(\dot\theta^2 + \omega^2\sin^2\theta)$, where the term without a $\dot\theta$ is the kinetic energy of being carried round by the hoop.

::: quiz
A particle moves on the surface of a sphere whose radius is made to grow with time as $R(t) = R_0 + ut$. How many degrees of freedom does it have, and what kind of constraint holds it?
- [ ] Three degrees of freedom; the constraint is nonholonomic because the radius changes.
- [x] Two degrees of freedom; the constraint is holonomic and rheonomic.
- [ ] Two degrees of freedom; the constraint is holonomic and scleronomic.
- [ ] One degree of freedom, because the radial motion is prescribed and the angles are not independent.
::: solution
The constraint is the single equation $x^2 + y^2 + z^2 - (R_0 + ut)^2 = 0$, a relation between positions and time, so it is holonomic, and it is rheonomic because $t$ appears explicitly. One constraint on three coordinates leaves $3 - 1 = 2$ degrees of freedom, for example the polar and azimuthal angles $\theta$ and $\phi$. The radius is prescribed, not free, and the two angles can still be chosen independently.
:::
:::

## Virtual displacements and ideal constraints {#virtual}

The constraint forces adjust themselves to keep the system on the allowed configurations. To make them disappear from the equations we need to look only at displacements that respect the constraints, and we need a physical assumption about how constraint forces act.

::: definition Virtual displacement {#def-virtual}
A **virtual displacement** of a system with generalised coordinates $q_j$ is an infinitesimal change of configuration made at a fixed instant $t$ and consistent with the constraints at that instant:

$$
\delta\mathbf{r}_i = \sum_{j=1}^n \pdv{\mathbf{r}_i}{q_j}\,\delta q_j,
$$ {#eq-virtual}

where the $\delta q_j$ are arbitrary and independent infinitesimals. There is no $\partial\mathbf{r}_i/\partial t$ term, because time is held fixed.
:::

The word "virtual" signals that the displacement need not be one the system actually makes. For the bead on the spinning hoop, the actual displacement in a time $\dd t$ includes the sideways motion $R\sin\theta\,\omega\,\dd t$ as the hoop turns. The virtual displacement freezes the hoop and moves the bead along the wire. That distinction is what makes the next assumption true even for moving constraints.

Write the total force on particle $i$ as $\mathbf{F}_i + \mathbf{N}_i$, where $\mathbf{F}_i$ is the **applied force** (gravity, springs, anything given by a force law) and $\mathbf{N}_i$ is the **constraint force** (the normal force of a surface, the tension of a rigid rod, the force of the wire on the bead).

::: definition Ideal constraints {#def-ideal}
The constraints are **ideal** (or **workless**) if the constraint forces do no total work in every virtual displacement:

$$
\sum_{i=1}^N \mathbf{N}_i\cdot\delta\mathbf{r}_i = 0 \qquad\text{for all virtual displacements } \delta\mathbf{r}_i.
$$ {#eq-ideal}
:::

This is a physical hypothesis, not a theorem. It is true for the cases that define the subject. A smooth surface pushes along its normal and the virtual displacement is tangent to it. A rigid rod joining two particles exerts equal and opposite forces along the rod, and a rigid displacement changes the two positions so that the component of the displacement along the rod is the same at both ends, so the two works cancel. A wheel that rolls without slipping has a contact point that is momentarily at rest, so the friction force there does no virtual work. Sliding friction is not ideal: a block sliding on a rough surface feels a tangential force, and a tangential virtual displacement does work against it. Such a force must be counted among the applied forces, as a generalised force in the sense below.

For a moving constraint, ideal does not mean that the constraint force does no *actual* work. The wire on the spinning hoop pushes the bead sideways and does real work on it, supplied by the motor. It still does no work in a virtual displacement along the frozen wire, and that is all [[#eq-ideal]] asks.

### Statics: the principle of virtual work

Before dynamics, consider equilibrium. If every particle is at rest and stays at rest, then $\mathbf{F}_i + \mathbf{N}_i = 0$ for every $i$, and so $\sum_i (\mathbf{F}_i + \mathbf{N}_i)\cdot\delta\mathbf{r}_i = 0$. If the constraints are ideal, the constraint forces drop out and

$$
\sum_{i=1}^N \mathbf{F}_i\cdot\delta\mathbf{r}_i = 0 \qquad\text{for all virtual displacements.}
$$ {#eq-virtual-work}

This is the **principle of virtual work**: in equilibrium, the applied forces do no work in any virtual displacement. It is how engineers analyse a mechanism without computing the force in every joint. The converse also holds for ideal constraints, starting from rest: if [[#eq-virtual-work]] holds, the configuration is an equilibrium.

::: example A block on an incline balanced by a hanging mass {#ex-incline}
A block of mass $m_1 = 4.00\,\mathrm{kg}$ rests on a smooth incline at $30.0^\circ$ to the horizontal. A light inextensible string runs from the block, parallel to the incline, over a smooth light pulley at the top, to a hanging mass $m_2$. Use the principle of virtual work to find the value of $m_2$ for equilibrium.
::: solution
The system has one degree of freedom. Let $s$ be the distance the block has moved up the incline from some reference position; because the string is inextensible, the hanging mass has moved down by the same $s$. A virtual displacement is a change $\delta s$.

The applied forces are the two weights. In the virtual displacement the block rises by $\delta s\sin 30.0^\circ$, so its weight does work $-m_1 g\sin 30.0^\circ\,\delta s$. The hanging mass descends by $\delta s$, so its weight does work $+m_2 g\,\delta s$. The normal force of the incline, the tension and the force at the pulley are constraint forces and do no total virtual work: the normal force is perpendicular to the displacement, and the tension does $+T\,\delta s$ on the block and $-T\,\delta s$ on the hanging mass.

The principle of virtual work [[#eq-virtual-work]] gives

$$
\bigl(m_2 g - m_1 g\sin 30.0^\circ\bigr)\,\delta s = 0 \quad\text{for every }\delta s,
\qquad\text{so}\qquad m_2 = m_1\sin 30.0^\circ = (4.00)(0.500) = 2.00\,\mathrm{kg}.
$$

The tension never appeared. In Newton's method we would have written two equations, $T = m_1 g\sin 30.0^\circ$ and $T = m_2 g$, and eliminated $T$; the principle does the elimination in advance.
:::
:::

## D'Alembert's principle and Lagrange's equations {#dalembert}

The principle of virtual work is about equilibrium. D'Alembert's idea was to turn dynamics into statics by treating $-m_i\mathbf{a}_i$ as one more force, the "reversed effective force". Newton's second law for particle $i$ reads $\mathbf{F}_i + \mathbf{N}_i - m_i\mathbf{a}_i = 0$, which looks like an equilibrium of three forces.

::: theorem D'Alembert's principle {#thm-dalembert}
If the constraints are ideal, the motion of the system satisfies

$$
\sum_{i=1}^N \bigl(\mathbf{F}_i - m_i\mathbf{a}_i\bigr)\cdot\delta\mathbf{r}_i = 0
$$ {#eq-dalembert}

for every virtual displacement $\delta\mathbf{r}_i$ at every instant.
:::

::: proof
For each particle, Newton's second law gives $\mathbf{F}_i + \mathbf{N}_i - m_i\mathbf{a}_i = 0$. Take the dot product with $\delta\mathbf{r}_i$ and sum over $i$:

$$
\sum_i \bigl(\mathbf{F}_i - m_i\mathbf{a}_i\bigr)\cdot\delta\mathbf{r}_i + \sum_i \mathbf{N}_i\cdot\delta\mathbf{r}_i = 0.
$$

The second sum vanishes by the definition of ideal constraints, [[#eq-ideal]].
:::

D'Alembert's principle contains no constraint forces. Its defect is that the $\delta\mathbf{r}_i$ are not independent, since they are tied together by the constraints. The cure is to express everything in generalised coordinates, where the $\delta q_j$ are independent.

::: definition Generalised force {#def-gen-force}
The **generalised force** conjugate to the coordinate $q_j$ is

$$
Q_j = \sum_{i=1}^N \mathbf{F}_i\cdot\pdv{\mathbf{r}_i}{q_j},
$$ {#eq-gen-force}

so that the virtual work of the applied forces is $\sum_i \mathbf{F}_i\cdot\delta\mathbf{r}_i = \sum_j Q_j\,\delta q_j$.
:::

If $q_j$ is a length along which a force pushes, $Q_j$ is that force. If $q_j$ is an angle about an axis, $Q_j$ is the torque about that axis, because a rotation $\delta\phi$ moves a point at distance $\rho$ from the axis by $\rho\,\delta\phi$. The product $Q_j q_j$ always has the dimensions of work.

When the applied forces come from a potential energy, $\mathbf{F}_i = -\nabla_i V(\mathbf{r}_1, \dots, \mathbf{r}_N, t)$, the chain rule turns [[#eq-gen-force]] into

$$
Q_j = -\sum_i \nabla_i V\cdot\pdv{\mathbf{r}_i}{q_j} = -\pdv{V}{q_j},
$$ {#eq-gen-force-pot}

where on the right $V$ has been written as a function of the $q$'s and $t$ through [[#eq-transformation]].

::: theorem Lagrange's equations {#thm-lagrange}
Let a system of particles have ideal holonomic constraints and generalised coordinates $q_1, \dots, q_n$, and let $T(q, \dot q, t)$ be its kinetic energy. Then the motion satisfies, for each $j = 1, \dots, n$,

$$
\deriv{}{t}\left(\pdv{T}{\dot q_j}\right) - \pdv{T}{q_j} = Q_j.
$$ {#eq-lagrange-T}

If in addition the applied forces derive from a potential $V(q, t)$, then with the **Lagrangian** $L = T - V$,

$$
\deriv{}{t}\left(\pdv{L}{\dot q_j}\right) - \pdv{L}{q_j} = 0.
$$ {#eq-lagrange}
:::

::: proof
Insert [[#eq-virtual]] into d'Alembert's principle [[#eq-dalembert]]. The applied-force part is $\sum_j Q_j\,\delta q_j$ by [[#def-gen-force]]. The inertial part is

$$
\sum_i m_i\mathbf{a}_i\cdot\delta\mathbf{r}_i = \sum_j\left(\sum_i m_i\mathbf{a}_i\cdot\pdv{\mathbf{r}_i}{q_j}\right)\delta q_j.
$$

Rewrite the bracket with the product rule, writing $\mathbf{a}_i = \dd\mathbf{v}_i/\dd t$:

$$
\sum_i m_i\deriv{\mathbf{v}_i}{t}\cdot\pdv{\mathbf{r}_i}{q_j} = \deriv{}{t}\left(\sum_i m_i\mathbf{v}_i\cdot\pdv{\mathbf{r}_i}{q_j}\right) - \sum_i m_i\mathbf{v}_i\cdot\deriv{}{t}\left(\pdv{\mathbf{r}_i}{q_j}\right).
$$

Now use the two identities of [[#lem-dots]], replacing $\partial\mathbf{r}_i/\partial q_j$ by $\partial\mathbf{v}_i/\partial\dot q_j$ in the first sum and $\dd(\partial\mathbf{r}_i/\partial q_j)/\dd t$ by $\partial\mathbf{v}_i/\partial q_j$ in the second:

$$
\deriv{}{t}\left(\sum_i m_i\mathbf{v}_i\cdot\pdv{\mathbf{v}_i}{\dot q_j}\right) - \sum_i m_i\mathbf{v}_i\cdot\pdv{\mathbf{v}_i}{q_j}
= \deriv{}{t}\left(\pdv{T}{\dot q_j}\right) - \pdv{T}{q_j},
$$

because $\partial(\frac12 m_i\mathbf{v}_i\cdot\mathbf{v}_i)/\partial x = m_i\mathbf{v}_i\cdot\partial\mathbf{v}_i/\partial x$ for any variable $x$. D'Alembert's principle has become

$$
\sum_{j=1}^n\left[Q_j - \deriv{}{t}\left(\pdv{T}{\dot q_j}\right) + \pdv{T}{q_j}\right]\delta q_j = 0.
$$

The constraints are holonomic and the $q_j$ are generalised coordinates, so the $\delta q_j$ can be chosen independently. Choosing all of them zero except one shows that each bracket vanishes, which is [[#eq-lagrange-T]].

If $Q_j = -\partial V/\partial q_j$ with $V$ independent of the velocities, then $\partial V/\partial\dot q_j = 0$, so $\partial T/\partial\dot q_j = \partial L/\partial\dot q_j$, and moving $-\partial V/\partial q_j$ to the left gives [[#eq-lagrange]].
:::

Look at what was used: Newton's second law, the hypothesis that the constraints are ideal, the chain rule and the independence of the $\delta q_j$. Nothing else. Lagrange's equations are Newton's law projected onto the directions the constraints allow, written in coordinates where the projection is automatic. There are exactly $n$ of them, one per degree of freedom, and none mentions a constraint force.

In practice the method has four steps. Choose generalised coordinates. Write $T$ and $V$ in terms of them. Form $L = T - V$. Apply [[#eq-lagrange]] once for each coordinate. The only place where physical insight is needed is the first two steps, and the most common error, by far, is a wrong kinetic energy.

::: warning The kinetic energy must be computed in an inertial frame
$T$ in [[#thm-lagrange]] is $\sum\frac12 m_i v_i^2$ with $\mathbf{v}_i$ the velocity relative to an inertial frame. For the bead on the spinning hoop, writing $T = \frac12 mR^2\dot\theta^2$, the kinetic energy relative to the hoop, loses the term $\frac12 mR^2\omega^2\sin^2\theta$ and with it the whole effect of the rotation. If you prefer to work in a rotating or accelerating frame, you must add the fictitious forces by hand as generalised forces. The cleaner route is to write the inertial velocity in terms of the generalised coordinates, as [[#eq-velocity]] does, and let the formalism produce the centrifugal and Coriolis terms.
:::

::: example The Atwood machine from d'Alembert's principle {#ex-atwood}
Masses $m_1 = 3.00\,\mathrm{kg}$ and $m_2 = 2.00\,\mathrm{kg}$ hang from the ends of a light inextensible string over a smooth light pulley. Find the acceleration of $m_1$ using Lagrange's equations.
::: solution
Measure $x$ downward from the pulley to $m_1$. Inextensibility puts $m_2$ at depth $\ell - x$, where $\ell$ is the constant length of string. One degree of freedom, coordinate $x$.

The kinetic energy is $T = \frac12 m_1\dot x^2 + \frac12 m_2\dot x^2$, since $m_2$ moves with speed $\abs{\dot x}$ too. With the potential energy measured from the pulley and $x$ downward, $V = -m_1 g x - m_2 g(\ell - x)$. So

$$
L = \tfrac12(m_1 + m_2)\dot x^2 + m_1 g x + m_2 g(\ell - x).
$$

Then $\partial L/\partial\dot x = (m_1 + m_2)\dot x$ and $\partial L/\partial x = (m_1 - m_2)g$, and [[#eq-lagrange]] gives

$$
(m_1 + m_2)\ddot x = (m_1 - m_2)g, \qquad \ddot x = \frac{m_1 - m_2}{m_1 + m_2}\,g = \frac{1.00}{5.00}(9.80) = 1.96\,\mathrm{m/s^2}.
$$

The heavier mass accelerates downward at $1.96\,\mathrm{m/s^2}$. The tension, a constraint force, never entered. If it is wanted, it can be recovered from Newton's law for one mass, or more systematically from the method of [[#multipliers]].
:::
:::

### A rheonomic example: the bead on a spinning hoop

The bead of [[#ex-dof]](c) is the standard example in which Lagrange's method earns its keep. The rotation is imposed, the wire pushes the bead sideways in a way nobody wants to compute, and yet the equation of motion comes out in three lines.

::: example The bead on a spinning hoop {#ex-hoop}
A bead of mass $m$ slides without friction on a circular hoop of radius $R$ that is driven to rotate about its vertical diameter with constant angular velocity $\omega$. Let $\theta$ be the angle of the bead from the bottom of the hoop. Find the equation of motion and the equilibrium positions, and evaluate them for $R = 0.200\,\mathrm{m}$ and $\omega = 10.0\,\mathrm{rad/s}$.
::: solution
Differentiate the position $\mathbf{r} = (R\sin\theta\cos\omega t, R\sin\theta\sin\omega t, -R\cos\theta)$ from [[#ex-dof]]:

$$
\mathbf{v} = \bigl(R\dot\theta\cos\theta\cos\omega t - R\omega\sin\theta\sin\omega t,\; R\dot\theta\cos\theta\sin\omega t + R\omega\sin\theta\cos\omega t,\; R\dot\theta\sin\theta\bigr).
$$

Squaring and adding, the cross terms cancel and

$$
T = \tfrac12 mR^2\bigl(\dot\theta^2 + \omega^2\sin^2\theta\bigr), \qquad V = -mgR\cos\theta.
$$

The first term is motion along the wire; the second is motion of the wire. With $L = T - V$,

$$
\pdv{L}{\dot\theta} = mR^2\dot\theta, \qquad \pdv{L}{\theta} = mR^2\omega^2\sin\theta\cos\theta - mgR\sin\theta,
$$

and Lagrange's equation is

$$
\ddot\theta = \sin\theta\left(\omega^2\cos\theta - \frac{g}{R}\right).
$$ {#eq-hoop}

Equilibria are the constant solutions, where the right-hand side vanishes: $\sin\theta = 0$, giving the bottom $\theta = 0$ and the top $\theta = \pi$, or $\cos\theta = g/(R\omega^2)$. The last pair exists only if $g/(R\omega^2) \le 1$, that is, only if $\omega$ exceeds the critical value $\omega_c = \sqrt{g/R}$.

For $R = 0.200\,\mathrm{m}$, $\omega_c = \sqrt{9.80/0.200} = \sqrt{49.0} = 7.00\,\mathrm{rad/s}$. At $\omega = 10.0\,\mathrm{rad/s}$ the hoop spins faster than that, and

$$
\cos\theta_0 = \frac{9.80}{(0.200)(10.0)^2} = 0.490, \qquad \theta_0 = \pm 60.7^\circ.
$$

Which equilibria are stable? Near $\theta = 0$, [[#eq-hoop]] becomes $\ddot\theta \approx (\omega^2 - g/R)\theta$. Below the critical speed the coefficient is negative and the bottom is stable, with small oscillations of angular frequency $\sqrt{g/R - \omega^2}$. Above it the coefficient is positive and the bottom is unstable: a small displacement grows, and the bead climbs to $\theta_0$, about which it oscillates. The frequency of those oscillations is computed in [[analytical-mechanics/small-oscillations]].
:::
:::

The equation of motion [[#eq-hoop]] can be written as $\ddot\theta = -\dd U/\dd\theta$ with the **effective potential**

$$
U(\theta) = -\frac{g}{R}\cos\theta - \frac12\omega^2\sin^2\theta,
$$

per unit $mR^2$. The first term is gravity; the second is the centrifugal potential of the rotating frame. Minima of $U$ are stable equilibria.

::: widget plot
f: -(9.8/0.2)*cos(x) - 0.5*w^2*sin(x)^2
x: -pi, pi
y: -110, 60
sliders: w=5:0:14:0.1
piticks: true
caption: The effective potential $U(\theta)$ per unit $mR^2$ for the bead of the worked example, with $R = 0.2\,\mathrm{m}$ and $w$ the spin rate in rad/s. At $w = 5$ there is a single well at the bottom, $\theta = 0$. Drag $w$ slowly upward and watch the bottom of the well flatten at $w = 7$, the critical speed $\sqrt{g/R}$; above it the bottom becomes a hump and two new wells move out towards $\pm\pi/2$. At $w = 10$ they sit at $\pm 1.06\,\mathrm{rad}$, the $60.7^\circ$ of the example.
:::

This is the simplest example of a **bifurcation**: as a parameter passes a critical value, one stable equilibrium becomes unstable and gives birth to two new stable ones. The symmetric state, bead at the bottom, survives as a solution but is no longer the one you see. We meet the same mathematics again in [[analytical-mechanics/chaos]].

::: remark Energy is not conserved here
The Lagrangian of the spinning hoop does not depend explicitly on time, even though the constraint does, so a conserved quantity exists. It is not $T + V$. The motor does work on the bead whenever the bead moves outward, because the wire must then push it sideways to keep up with the rotation. The quantity that is conserved, $\frac12 mR^2\dot\theta^2 - \frac12 mR^2\omega^2\sin^2\theta - mgR\cos\theta$, has the centrifugal term with the opposite sign from $T$. [[analytical-mechanics/lagrangian]] explains which function is conserved and why.
:::

## Constraint forces and Lagrange multipliers {#multipliers}

Sometimes the constraint force is the thing you want. A roller-coaster designer needs the normal force, not just the motion; a particle sliding on a sphere leaves the surface exactly when the normal force falls to zero. Lagrange's method can deliver these forces too. The trick is to keep one coordinate more than the number of degrees of freedom, so that the constraint is not built in, and to impose it with a multiplier.

Suppose the coordinates $q_1, \dots, q_n$ are not all independent but satisfy one holonomic constraint $G(q_1, \dots, q_n, t) = 0$. The derivation of [[#thm-lagrange]] up to its last step still holds: d'Alembert's principle still says that

$$
\sum_{j=1}^n \Bigl(\mathcal{E}_j - Q_j\Bigr)\,\delta q_j = 0, \qquad \mathcal{E}_j = \deriv{}{t}\pdv{T}{\dot q_j} - \pdv{T}{q_j},
$$

but now only for those $\delta q$ that respect the constraint, $\sum_j (\partial G/\partial q_j)\,\delta q_j = 0$. We can no longer conclude that each bracket vanishes.

::: theorem Lagrange's equations with a multiplier {#thm-multiplier}
Let the coordinates $q_1, \dots, q_n$ be subject to one holonomic constraint $G(q, t) = 0$ with $\nabla_q G \ne 0$, and let all other constraints be built into the coordinates and ideal. Then there is a function $\lambda(t)$ such that

$$
\deriv{}{t}\left(\pdv{L}{\dot q_j}\right) - \pdv{L}{q_j} = \lambda\,\pdv{G}{q_j}, \qquad j = 1, \dots, n,
$$ {#eq-multiplier}

and $\lambda\,\partial G/\partial q_j$ is the generalised force of the constraint $G = 0$ in the direction of $q_j$.
:::

::: proof
At a fixed instant write $\mathbf{c} = (\mathcal{E}_j - Q_j)_j$ and $\mathbf{g} = (\partial G/\partial q_j)_j$, vectors in $\R^n$. D'Alembert's principle says $\mathbf{c}\cdot\boldsymbol{\delta} = 0$ for every $\boldsymbol{\delta}$ with $\mathbf{g}\cdot\boldsymbol{\delta} = 0$. Decompose $\mathbf{c} = \lambda\mathbf{g} + \mathbf{c}_\perp$ with $\lambda = (\mathbf{c}\cdot\mathbf{g})/(\mathbf{g}\cdot\mathbf{g})$ and $\mathbf{c}_\perp\cdot\mathbf{g} = 0$. Then $\boldsymbol{\delta} = \mathbf{c}_\perp$ is an allowed displacement, so $0 = \mathbf{c}\cdot\mathbf{c}_\perp = \abs{\mathbf{c}_\perp}^2$, and $\mathbf{c}_\perp = 0$. Hence $\mathbf{c} = \lambda\mathbf{g}$, which is [[#eq-multiplier]] once $Q_j = -\partial V/\partial q_j$ is absorbed into $L$.

For the interpretation, note that if we dropped the constraint $G = 0$ and replaced it by an extra applied force, that force would have to supply exactly the generalised force $\mathcal{E}_j - Q_j$ in each coordinate to reproduce the motion. That is $\lambda\,\partial G/\partial q_j$.
:::

The argument is the same linear algebra as constrained optimisation in several variables, where a gradient orthogonal to every allowed direction must be a multiple of the constraint gradient; see [constrained extrema in the Maths Atlas](/learn/maths/lesson.php?c=multivariable&l=extrema). With several constraints $G_1 = 0, \dots, G_k = 0$ there is one multiplier for each, and the right-hand side of [[#eq-multiplier]] becomes $\sum_a \lambda_a\,\partial G_a/\partial q_j$. The $n$ equations [[#eq-multiplier]] together with the constraint equations determine the $n$ coordinates and the multipliers.

If $G$ is chosen as "distance from the surface minus zero", so that $\partial G/\partial q$ is the unit normal in that coordinate, then $\lambda$ is the normal force itself. Choosing $G$ with a different normalisation rescales $\lambda$ and leaves the force $\lambda\nabla G$ unchanged.

::: example Leaving the surface of a sphere {#ex-sphere}
A small particle of mass $m$ starts from rest at the top of a smooth fixed sphere of radius $R$, is nudged, and slides down. Using polar coordinates $(r, \theta)$ in the vertical plane of the motion, with $\theta$ measured from the upward vertical, find the normal force as a function of $\theta$ and the angle at which the particle leaves the sphere.
::: solution
Keep both $r$ and $\theta$ and impose the constraint $G = r - R = 0$ with a multiplier. The kinetic and potential energies are

$$
T = \tfrac12 m\bigl(\dot r^2 + r^2\dot\theta^2\bigr), \qquad V = mgr\cos\theta.
$$

With $\partial G/\partial r = 1$ and $\partial G/\partial\theta = 0$, [[#eq-multiplier]] gives

$$
m\ddot r - mr\dot\theta^2 + mg\cos\theta = \lambda, \qquad \deriv{}{t}\bigl(mr^2\dot\theta\bigr) - mgr\sin\theta = 0.
$$

Because $\partial G/\partial r = 1$, $\lambda$ is the radial (outward) force of the constraint: the normal force $N$. On the sphere $r = R$ and $\dot r = \ddot r = 0$, so

$$
N = \lambda = mg\cos\theta - mR\dot\theta^2.
$$

The second equation can be integrated with energy conservation, which holds because the constraint is fixed and ideal: $\frac12 mR^2\dot\theta^2 + mgR\cos\theta = mgR$, so $mR\dot\theta^2 = 2mg(1 - \cos\theta)$. Substituting,

$$
N = mg\cos\theta - 2mg(1 - \cos\theta) = mg(3\cos\theta - 2).
$$

At the top $N = mg$, as it must be for a particle at rest. The normal force decreases as the particle speeds up, and it reaches zero at

$$
\cos\theta = \frac23, \qquad \theta = 48.2^\circ.
$$

A surface can push but not pull, so the constraint is really the inequality $r \ge R$. Once $N$ would become negative, the particle leaves the sphere and flies off as a projectile, having fallen a height $R(1 - \cos\theta) = R/3$ below the top. The multiplier told us precisely when the holonomic description stops being valid.
:::
:::

::: intuition Why the multiplier is a force
In [[#eq-multiplier]] the left-hand side is what the equations of motion would demand if the coordinates were free. If the system obeyed them with $\lambda = 0$, it would generally drift off the constraint surface $G = 0$. The term $\lambda\nabla G$ points perpendicular to that surface, so it cannot change the motion along the surface; it can only push the system back onto it. That is what a workless constraint force does, and the multiplier measures how hard it has to push.
:::

## Nonholonomic constraints {#nonholonomic}

Not every constraint reduces the number of coordinates. The classic counterexample is a coin, or a thin vertical disc of radius $R$, rolling without slipping on a horizontal plane. Its configuration is given by the position $(x, y)$ of the contact point, the heading angle $\phi$ of the disc's plane, and the rolling angle $\psi$ through which it has turned about its axle. Rolling without slipping says the contact point is instantaneously at rest, which means

$$
\dot x = R\dot\psi\cos\phi, \qquad \dot y = R\dot\psi\sin\phi.
$$ {#eq-rolling}

These are relations between velocities. They cannot be integrated to relations between the coordinates: by rolling and steering you can bring the disc to any position, any heading and any rolling angle. Roll forward a distance $d$, turn by $\alpha$, roll back $d$, turn back by $-\alpha$; the heading and rolling angle are restored, but the contact point has moved sideways. A car being parallel-parked does exactly this. All four coordinates remain free, but only two velocities are, so the disc has two degrees of freedom in its velocities and four in its configuration. Such a system is called **nonholonomic**, and [[#thm-lagrange]] does not apply as it stands, because the $\delta q_j$ allowed by [[#eq-rolling]] are not independent.

Constraints of the form $\sum_j a_{j}(q, t)\,\dot q_j + a_0(q, t) = 0$ can still be handled with multipliers: the virtual displacements satisfy $\sum_j a_j\,\delta q_j = 0$, and the argument of [[#thm-multiplier]] gives $\mathcal{E}_j - Q_j = \lambda\,a_j$. Holonomic constraints are the special case $a_j = \partial G/\partial q_j$. Inequality constraints, like the particle on the sphere, are handled by solving with the equality and checking the sign of the multiplier.

::: history From d'Alembert to Lagrange
Jean le Rond d'Alembert stated his principle in the *Traité de dynamique* of 1743, in the form that the "lost forces", the difference between the applied forces and those that would produce the actual motion, must be in equilibrium under the constraints. Johann Bernoulli had formulated the principle of virtual velocities for statics in a letter to Pierre Varignon in 1717. Joseph-Louis Lagrange combined the two in the *Mécanique analytique* (Paris, 1788), where dynamics is derived from the single equation we have written as [[#eq-dalembert]], expressed in arbitrary coordinates, with multipliers for the constraints. The preface boasts that the book contains no figures, only algebraic operations. The terms "holonomic" and "nonholonomic" are much later; they were introduced by Heinrich Hertz in *Die Prinzipien der Mechanik* (1894).
:::

## Where this leads {#leads}

[[analytical-mechanics/lagrangian]] derives the same equations [[#eq-lagrange]] from a variational principle, Hamilton's principle of stationary action, which does not mention virtual displacements at all and which generalises to fields and to quantum mechanics. There we also connect symmetries of $L$ to conservation laws. [[analytical-mechanics/central-forces]], [[analytical-mechanics/rigid-bodies]] and [[analytical-mechanics/small-oscillations]] are applications in which the right choice of generalised coordinates makes a hard problem tractable. [[analytical-mechanics/hamiltonian]] replaces the $n$ second-order equations by $2n$ first-order ones.

The skill to take from this chapter is the first step of every problem that follows: count the degrees of freedom, choose coordinates that build in the constraints, and write the kinetic energy in an inertial frame.

::: summary
- A holonomic constraint is an equation $f(\mathbf{r}_1, \dots, \mathbf{r}_N, t) = 0$; $k$ independent ones leave $n = 3N - k$ degrees of freedom. A rheonomic constraint depends explicitly on time.
- Generalised coordinates $q_1, \dots, q_n$ label the allowed configurations one-to-one and satisfy the constraints automatically.
- A virtual displacement is made at fixed time and respects the constraints. Ideal constraints do no work in any virtual displacement; sliding friction is not ideal.
- D'Alembert's principle $\sum(\mathbf{F}_i - m_i\mathbf{a}_i)\cdot\delta\mathbf{r}_i = 0$ contains no constraint forces.
- With generalised forces $Q_j = \sum_i\mathbf{F}_i\cdot\partial\mathbf{r}_i/\partial q_j$ it becomes Lagrange's equations $\frac{\dd}{\dd t}\frac{\partial T}{\partial\dot q_j} - \frac{\partial T}{\partial q_j} = Q_j$, and for conservative forces $\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q_j} - \frac{\partial L}{\partial q_j} = 0$ with $L = T - V$.
- $T$ must be the kinetic energy relative to an inertial frame, written in the generalised coordinates.
- Constraint forces are recovered by keeping a redundant coordinate and adding $\lambda\,\partial G/\partial q_j$; the multiplier is the force of the constraint, and its sign tells you when an inequality constraint lets go.
- Velocity constraints such as rolling without slipping may be nonholonomic: they restrict the velocities without reducing the number of coordinates.
:::

## Exercises {#exercises}

::: exercise A rigid dumbbell {level=1 check="5"}
Two point masses are joined by a light rigid rod and move freely in three-dimensional space. How many degrees of freedom does the system have?
::: solution
Two particles give $3 \times 2 = 6$ Cartesian coordinates. The rod imposes one holonomic, scleronomic constraint, $\abs{\mathbf{r}_1 - \mathbf{r}_2} = \ell$. So $n = 6 - 1 = 5$. A convenient set of generalised coordinates is the three components of the centre-of-mass position and the two polar angles $(\theta, \phi)$ that give the direction of the rod. Rotation of the dumbbell about its own axis is not a degree of freedom, because point masses on the axis do not move when it turns.
:::
:::

::: exercise A rigid triangle in a plane {level=1 check="3"}
Three point masses are joined in a triangle by three light rigid rods and slide on a horizontal table. How many degrees of freedom does the system have?
::: solution
Three particles in a plane have $2 \times 3 = 6$ coordinates. The three rods fix the three side lengths, giving three independent constraints. So $n = 6 - 3 = 3$: two coordinates for the position of one vertex (or of the centre of mass) and one angle for the orientation. This is the planar version of the count in [[#ex-dof]](b).
:::
:::

::: exercise Generalised force in polar coordinates {level=1 check="8"}
A particle in the plane at $(x, y) = (2.00\,\mathrm{m}, 0)$ feels a force $\mathbf{F} = (3.00, 4.00)\,\mathrm{N}$. Using polar coordinates $(r, \theta)$ as generalised coordinates, find $Q_r$ in newtons and $Q_\theta$ in newton-metres. Give $Q_\theta$ as your answer.
::: solution
With $\mathbf{r} = (r\cos\theta, r\sin\theta)$,

$$
\pdv{\mathbf{r}}{r} = (\cos\theta, \sin\theta) = \hat{\mathbf{r}}, \qquad \pdv{\mathbf{r}}{\theta} = (-r\sin\theta, r\cos\theta) = r\hat{\boldsymbol{\theta}}.
$$

By [[#eq-gen-force]], $Q_r = \mathbf{F}\cdot\hat{\mathbf{r}}$, the radial component of the force, and $Q_\theta = r\,\mathbf{F}\cdot\hat{\boldsymbol{\theta}} = xF_y - yF_x$, the torque about the origin. At the point $(2.00, 0)$ we have $r = 2.00\,\mathrm{m}$ and $\theta = 0$, so

$$
Q_r = 3.00\,\mathrm{N}, \qquad Q_\theta = (2.00)(4.00) - (0)(3.00) = 8.00\,\mathrm{N\,m}.
$$

The generalised force conjugate to an angle is a torque, and $Q_\theta\,\delta\theta$ has the units of work.
:::
:::

::: exercise The tension in the Atwood machine {level=2 check="23.52"}
For the Atwood machine of [[#ex-atwood]], with $m_1 = 3.00\,\mathrm{kg}$ and $m_2 = 2.00\,\mathrm{kg}$, use the depths $x_1$ and $x_2$ of the two masses below the pulley as coordinates, impose $G = x_1 + x_2 - \ell = 0$ with a Lagrange multiplier, and find the tension in newtons.
::: hint
Each mass gives one equation of the form [[#eq-multiplier]]. Subtract them to find the acceleration, then substitute back to find $\lambda$. Decide from the sign which force $\lambda$ represents.
:::
::: solution
The Lagrangian is $L = \frac12 m_1\dot x_1^2 + \frac12 m_2\dot x_2^2 + m_1 g x_1 + m_2 g x_2$, and $\partial G/\partial x_1 = \partial G/\partial x_2 = 1$. Equations [[#eq-multiplier]] read

$$
m_1\ddot x_1 - m_1 g = \lambda, \qquad m_2\ddot x_2 - m_2 g = \lambda.
$$

The constraint gives $\ddot x_2 = -\ddot x_1$. Divide each equation by its mass: $\ddot x_1 = g + \lambda/m_1$ and $-\ddot x_1 = g + \lambda/m_2$. Adding the two removes the acceleration,

$$
\lambda\left(\frac{1}{m_1} + \frac{1}{m_2}\right) = -2g, \qquad \lambda = -\frac{2m_1m_2 g}{m_1 + m_2} = -\frac{2(3.00)(2.00)(9.80)}{5.00} = -23.52\,\mathrm{N}.
$$

The generalised constraint force on $m_1$ in the direction of increasing $x_1$ (downward) is $\lambda\,\partial G/\partial x_1 = \lambda$, which is negative: the string pulls each mass upward with force $\abs{\lambda}$. The tension is $T = 23.52\,\mathrm{N}$, which lies between the two weights $19.6\,\mathrm{N}$ and $29.4\,\mathrm{N}$, as it must. The acceleration is $\ddot x_1 = g + \lambda/m_1 = 9.80 - 7.84 = 1.96\,\mathrm{m/s^2}$, agreeing with [[#ex-atwood]].
:::
:::

::: exercise The critical speed of a hoop {level=2 check="sqrt(39.2)"}
A bead slides on a smooth hoop of radius $0.250\,\mathrm{m}$ spinning about its vertical diameter. Find, in $\mathrm{rad/s}$, the spin rate above which the bottom of the hoop is no longer a stable equilibrium. For a spin rate of $5.00\,\mathrm{rad/s}$, find the period of small oscillations about the bottom.
::: solution
From [[#eq-hoop]], near $\theta = 0$ we have $\ddot\theta \approx -(g/R - \omega^2)\theta$, which is simple harmonic motion if $g/R > \omega^2$ and exponential growth if $g/R < \omega^2$. The critical spin rate is

$$
\omega_c = \sqrt{\frac{g}{R}} = \sqrt{\frac{9.80}{0.250}} = \sqrt{39.2} = 6.26\,\mathrm{rad/s}.
$$

At $\omega = 5.00\,\mathrm{rad/s}$ the angular frequency of small oscillations is $\sqrt{39.2 - 25.0} = \sqrt{14.2} = 3.77\,\mathrm{rad/s}$, so the period is $2\pi/3.77 = 1.67\,\mathrm{s}$. Without rotation the period would be $2\pi/6.26 = 1.00\,\mathrm{s}$. The rotation softens the restoring force, and at $\omega_c$ the period becomes infinite.
:::
:::

::: exercise Leaving the sphere with a push {level=2 check="5/6"}
In [[#ex-sphere]], suppose the particle is given an initial speed $v_0$ at the top, with $v_0^2 = gR/2$. Find $\cos\theta$ at the point where it leaves the sphere.
::: solution
The normal force is still $N = mg\cos\theta - mR\dot\theta^2$ from the multiplier equation. Energy conservation now reads

$$
\tfrac12 mR^2\dot\theta^2 + mgR\cos\theta = \tfrac12 mv_0^2 + mgR,
\qquad\text{so}\qquad mR\dot\theta^2 = \frac{mv_0^2}{R} + 2mg(1 - \cos\theta).
$$

Then $N = mg(3\cos\theta - 2) - mv_0^2/R$, which vanishes when

$$
\cos\theta = \frac23 + \frac{v_0^2}{3gR} = \frac23 + \frac16 = \frac56.
$$

The particle leaves earlier, at about $33.6^\circ$, because it starts with some of the speed that the curvature cannot hold. If $v_0^2 \ge gR$ it leaves at once: then $N \le 0$ already at the top.
:::
:::

::: exercise A pendulum with a moving support {level=2}
The pivot of a simple pendulum of length $\ell$ and mass $m$ is made to move horizontally as $x_s(t) = a\cos\Omega t$. Using the angle $\phi$ from the downward vertical, find the Lagrangian and the equation of motion. Interpret the extra term.
::: hint
Write the bob's position as the pivot position plus $(\ell\sin\phi, -\ell\cos\phi)$, differentiate, and keep every term.
:::
::: solution
The bob is at $x = a\cos\Omega t + \ell\sin\phi$, $y = -\ell\cos\phi$, so

$$
\dot x = -a\Omega\sin\Omega t + \ell\dot\phi\cos\phi, \qquad \dot y = \ell\dot\phi\sin\phi,
$$

$$
T = \tfrac12 m\bigl(\ell^2\dot\phi^2 - 2a\Omega\ell\dot\phi\cos\phi\sin\Omega t + a^2\Omega^2\sin^2\Omega t\bigr), \qquad V = -mg\ell\cos\phi.
$$

Then $\partial L/\partial\dot\phi = m\ell^2\dot\phi - ma\Omega\ell\cos\phi\sin\Omega t$, whose time derivative is

$$
m\ell^2\ddot\phi + ma\Omega\ell\dot\phi\sin\phi\sin\Omega t - ma\Omega^2\ell\cos\phi\cos\Omega t,
$$

and $\partial L/\partial\phi = ma\Omega\ell\dot\phi\sin\phi\sin\Omega t - mg\ell\sin\phi$. The terms in $\dot\phi\sin\phi\sin\Omega t$ cancel in Lagrange's equation, leaving

$$
\ddot\phi + \frac{g}{\ell}\sin\phi = \frac{a\Omega^2}{\ell}\cos\Omega t\,\cos\phi.
$$

The right-hand side is the fictitious force $-m\ddot x_s = ma\Omega^2\cos\Omega t$ of the accelerating pivot frame, projected on the direction of motion of the bob, which brings the factor $\cos\phi$. Lagrange's method produced it without any discussion of non-inertial frames, because $T$ was written in the inertial frame. The term $\frac12 ma^2\Omega^2\sin^2\Omega t$ depends only on time and contributes nothing.
:::
:::

::: exercise Lagrange's equations for conservative forces {level=3}
Starting from the identities of [[#lem-dots]] and assuming the applied forces are $\mathbf{F}_i = -\nabla_i V$ with $V$ depending only on positions and time, prove that $Q_j = -\partial V/\partial q_j$, and hence that [[#eq-lagrange-T]] implies [[#eq-lagrange]]. Then show by an example that the conclusion fails for a force of the form $\mathbf{F} = -b\mathbf{v}$, and say what replaces it.
::: hint
For the first part, $V(q, t) = V(\mathbf{r}_1(q, t), \dots, \mathbf{r}_N(q, t), t)$; differentiate with the chain rule. For the second, compute $Q$ for a particle on a line with $\mathbf{F} = -b\dot x\,\hat{\mathbf{x}}$.
:::
::: solution
Define $\tilde V(q, t) = V(\mathbf{r}_1(q, t), \dots, \mathbf{r}_N(q, t), t)$. By the chain rule,

$$
\pdv{\tilde V}{q_j} = \sum_i \nabla_i V\cdot\pdv{\mathbf{r}_i}{q_j} = -\sum_i\mathbf{F}_i\cdot\pdv{\mathbf{r}_i}{q_j} = -Q_j.
$$

Because $\tilde V$ does not depend on the $\dot q_j$, $\partial(T - \tilde V)/\partial\dot q_j = \partial T/\partial\dot q_j$. Hence

$$
\deriv{}{t}\pdv{(T - \tilde V)}{\dot q_j} - \pdv{(T - \tilde V)}{q_j} = \deriv{}{t}\pdv{T}{\dot q_j} - \pdv{T}{q_j} + \pdv{\tilde V}{q_j} = Q_j - Q_j = 0,
$$

using [[#eq-lagrange-T]] in the last step. This is [[#eq-lagrange]].

For a particle on the $x$-axis with a drag force $F = -b\dot x$, the generalised force is $Q_x = -b\dot x$. It is not $-\partial V/\partial x$ for any function $V(x, t)$, because it depends on the velocity, and no velocity-independent potential can produce a force that reverses when the velocity reverses. Lagrange's equation must be used in the form [[#eq-lagrange-T]], or as $\frac{\dd}{\dd t}\frac{\partial L}{\partial\dot q} - \frac{\partial L}{\partial q} = Q$ with $L$ built from the conservative forces and $Q$ the non-conservative remainder: here $m\ddot x = -b\dot x$. A linear drag can also be included through Rayleigh's dissipation function $\mathcal{F} = \frac12 b\dot x^2$, with $Q = -\partial\mathcal{F}/\partial\dot x$. Magnetic forces are the exception: they depend on velocity but come from a velocity-dependent potential, as shown in [[analytical-mechanics/lagrangian]].
:::
:::

::: exercise The rolling disc is nonholonomic {level=3}
For the vertical disc of [[#nonholonomic]], prove that there is no function $f(x, y, \phi, \psi)$ with $\nabla f \neq 0$ that is constant along every motion obeying [[#eq-rolling]], with $\dot\phi$ and $\dot\psi$ arbitrary. Conclude that the rolling constraints cannot be replaced by holonomic ones.
::: hint
If $f$ is constant along every allowed motion, then $\dot f = f_x\dot x + f_y\dot y + f_\phi\dot\phi + f_\psi\dot\psi = 0$ for all allowed velocities. Use the freedom in $\dot\phi$ and $\dot\psi$, then compare mixed partial derivatives.
:::
::: solution
Suppose $f$ is constant along every motion satisfying [[#eq-rolling]]. Along such a motion,

$$
0 = \dot f = f_x R\dot\psi\cos\phi + f_y R\dot\psi\sin\phi + f_\phi\dot\phi + f_\psi\dot\psi.
$$

Since $\dot\phi$ and $\dot\psi$ can be chosen independently at any configuration, the coefficients of each must vanish everywhere:

$$
f_\phi = 0, \qquad f_\psi + R\bigl(f_x\cos\phi + f_y\sin\phi\bigr) = 0.
$$

The first says $f$ does not depend on $\phi$, so $f_x$, $f_y$ and $f_\psi$ do not depend on $\phi$ either. Fix $(x, y, \psi)$. The second equation then says that $A + B\cos\phi + C\sin\phi = 0$ for every $\phi$, with constants $A = f_\psi$, $B = Rf_x$ and $C = Rf_y$. Putting $\phi = 0$, $\pi/2$ and $\pi$ gives $A + B = 0$, $A + C = 0$ and $A - B = 0$, so $A = B = C = 0$. Hence $f_x = f_y = f_\psi = 0$, and with $f_\phi = 0$ as well, $\nabla f = 0$ everywhere, contrary to hypothesis.

So no non-trivial function of the configuration is conserved by the rolling motion. If the constraints were holonomic, the motion would stay on a level set of each constraint function, which would then be such an $f$. Hence the constraints are nonholonomic, and every configuration near a given one can be reached by rolling and steering, as the parallel-parking argument suggested.
:::
:::
