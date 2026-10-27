Water pours steadily from a garden hose through a nozzle. Nothing about the flow changes from one second to the next: a pressure gauge or a speed probe at any fixed point reads a constant. Yet each drop of water speeds up as it passes through the nozzle, so each drop is accelerating, and something must be pushing it. Steady does not mean unaccelerated. Sorting this out needs a precise language for motion in a continuum, in which "the velocity at a point" and "the velocity of a piece of fluid" are different things that happen to share a number at each instant.

A fluid, unlike the elastic solid of [[continuum/elasticity]], has no preferred reference shape. A drop of ink in a glass of water is stretched into a filament and then a sheet; after a minute of stirring, particles that began side by side may be a glass-width apart. Displacement from a reference state is therefore a useless variable. What matters is the velocity field, and this chapter is about the geometry of velocity fields: how to compute the acceleration of the fluid from it, how to draw it, what it says about local rotation, and how mass is conserved as the fluid moves. No forces appear yet; they enter in [[continuum/ideal-flow]] and [[continuum/viscous-flow]].

The prerequisites are the vector calculus of [[math-methods/vector-calculus]] — gradient, divergence, curl — and the theorems of Gauss and Stokes from [[math-methods/integral-theorems]]. The steady-flow continuity equation $Av = \text{const}$ of [[mechanics/fluids]] will be recovered as a special case.

## Two descriptions of motion {#descriptions}

There are two natural ways to describe a flow, and every result in fluid mechanics is easiest in one of them.

::: definition Lagrangian and Eulerian descriptions {#def-descriptions}
In the **Lagrangian** description each fluid particle is labelled by its position $\mathbf a$ at a reference time $t = 0$, and the motion is the map $\mathbf x = \mathbf X(\mathbf a, t)$ giving where that particle is at time $t$. Its velocity is $\partial\mathbf X/\partial t$ at fixed $\mathbf a$.

In the **Eulerian** description we record, at each fixed point $\mathbf x$ in space and each time $t$, the velocity $\mathbf v(\mathbf x, t)$ of whatever particle happens to be at $\mathbf x$ then. The two are linked by

$$
\pdv{\mathbf X}{t}(\mathbf a, t) = \mathbf v\bigl(\mathbf X(\mathbf a, t), t\bigr).
$$ {#eq-link}
:::

A drifting weather balloon reports Lagrangian data; a fixed anemometer reports Eulerian data. Given the Eulerian field, the Lagrangian motion is found by solving the ordinary differential equation [[#eq-link]] for each starting point. Eulerian fields are what the equations of fluid dynamics are written for, because they are fields on a fixed space in which derivatives can be taken. The Lagrangian picture is what Newton's laws are written for, because Newton's second law applies to a fixed piece of matter. The bridge between them is the material derivative.

A flow is **steady** if $\mathbf v$ does not depend on $t$ at fixed $\mathbf x$. Steadiness is an Eulerian notion, and it is frame-dependent: the flow past a ship moving at constant velocity is steady seen from the ship and unsteady seen from the shore.

## The material derivative {#material}

Let $F(\mathbf x, t)$ be any Eulerian field: temperature, density, a component of velocity. Follow one particle. The value of $F$ it experiences is $F(\mathbf X(\mathbf a, t), t)$, and its rate of change is the derivative at fixed label $\mathbf a$.

::: theorem Material derivative {#thm-material}
The rate of change of $F$ following a fluid particle is

$$
\frac{DF}{Dt} \equiv \pdv{}{t}F\bigl(\mathbf X(\mathbf a, t), t\bigr)\Big|_{\mathbf a} = \pdv{F}{t} + (\mathbf v\cdot\nabla)F,
$$ {#eq-material}

where on the right the derivatives are Eulerian, evaluated at $\mathbf x = \mathbf X(\mathbf a, t)$. In particular the acceleration of the fluid particle at $\mathbf x$ is

$$
\mathbf a = \frac{D\mathbf v}{Dt} = \pdv{\mathbf v}{t} + (\mathbf v\cdot\nabla)\mathbf v .
$$ {#eq-acceleration}
:::

::: proof
By the chain rule for the composite function $t \mapsto F(X_1(\mathbf a, t), X_2(\mathbf a, t), X_3(\mathbf a, t), t)$,

$$
\pdv{}{t}F\bigl(\mathbf X(\mathbf a, t), t\bigr) = \pdv{F}{t} + \pdv{F}{x_j}\pdv{X_j}{t} = \pdv{F}{t} + v_j\pdv{F}{x_j},
$$

using [[#eq-link]] in the last step. Applying this to each component $F = v_i$ gives [[#eq-acceleration]].
:::

The first term, $\partial F/\partial t$, is the **local** rate of change, seen by a fixed observer. The second, $(\mathbf v\cdot\nabla)F$, is the **convective** (or advective) rate of change: the particle moves through a non-uniform field, and in a time $\dd t$ it travels $\mathbf v\,\dd t$ to where $F$ is different by $(\mathbf v\,\dd t\cdot\nabla)F$. In the hose nozzle the local term is zero and the convective term is the whole acceleration.

The convective acceleration $(\mathbf v\cdot\nabla)\mathbf v$ is *quadratic* in the velocity. This single nonlinearity is the source of nearly everything difficult in fluid mechanics, turbulence included. It has nothing to do with the forces; it is pure kinematics.

::: example Acceleration in a nozzle {#ex-nozzle}
In a converging nozzle the flow speed along the axis is modelled as $u(x) = U(1 + x/L)$ for $0 \le x \le L$, with $U = 2.00\,\mathrm{m/s}$ and $L = 0.100\,\mathrm m$, and the flow is steady. Find the acceleration of the water at the entrance and at the exit.
::: solution
The flow is steady, so $\partial u/\partial t = 0$, and along the axis [[#eq-acceleration]] reduces to

$$
a = u\deriv{u}{x} = U\Bigl(1 + \frac{x}{L}\Bigr)\cdot\frac{U}{L} = \frac{U^2}{L}\Bigl(1 + \frac{x}{L}\Bigr).
$$

At the entrance, $x = 0$: $a = (2.00)^2/0.100 = 40.0\,\mathrm{m/s^2}$. At the exit, $x = L$: $a = 80.0\,\mathrm{m/s^2}$, eight times $g$, although every gauge in the nozzle reads a constant. In [[continuum/ideal-flow]] we shall see that a pressure gradient along the nozzle supplies the force. A check on units: $U^2/L$ is a speed squared over a length, an acceleration.
:::
:::

::: example Weather by advection {#ex-advection}
A meteorologist reports a north–south temperature gradient: it gets colder towards the north by $3.0\,\mathrm K$ per $100\,\mathrm{km}$. A steady wind of $10\,\mathrm{m/s}$ blows from the north. If each parcel of air keeps its own temperature, how fast does the temperature change at a fixed weather station?
::: solution
Take $y$ northward. Then $\partial T/\partial y = -3.0\,\mathrm K/10^5\,\mathrm m = -3.0\times10^{-5}\,\mathrm{K/m}$, and a wind *from* the north has $v_y = -10\,\mathrm{m/s}$. The parcels keep their temperature, so $DT/Dt = 0$ and [[#eq-material]] gives

$$
\pdv{T}{t} = -\mathbf v\cdot\nabla T = -(-10)(-3.0\times10^{-5}) = -3.0\times10^{-4}\,\mathrm{K/s},
$$

which is $-1.1\,\mathrm K$ per hour. The station cools although no parcel of air does: colder air is simply being carried in. Real forecasts add the $DT/Dt$ from sunshine, cloud and adiabatic expansion of rising air, but advection is usually the largest term on a time scale of hours.
:::
:::

::: warning Steady is not the same as unaccelerated
A steady flow has $\partial\mathbf v/\partial t = 0$, not $D\mathbf v/Dt = 0$. Every steady flow with curved streamlines, or with speed varying along them, has accelerating fluid. Conversely, a uniform flow whose speed is ramped up everywhere at the same rate has $(\mathbf v\cdot\nabla)\mathbf v = 0$ and $D\mathbf v/Dt = \partial\mathbf v/\partial t$. Writing Newton's second law as $\rho\,\partial\mathbf v/\partial t = \mathbf F$ — forgetting the convective term — is the classic error, and it predicts that nothing in a steady flow feels a net force.
:::

## Streamlines, pathlines and streaklines {#lines}

Three families of curves are used to picture a flow, and they coincide only when the flow is steady.

::: definition Streamlines, pathlines, streaklines {#def-lines}
At a fixed instant $t$, a **streamline** is a curve everywhere tangent to $\mathbf v(\cdot, t)$: parametrised by $s$, it solves $\dd\mathbf x/\dd s = \mathbf v(\mathbf x, t)$ with $t$ held fixed. Equivalently, in two dimensions, $\dd y/\dd x = v_y/v_x$.

A **pathline** is the trajectory of a single fluid particle over time: the solution of $\dd\mathbf x/\dd t = \mathbf v(\mathbf x, t)$.

A **streakline** at time $t$ is the curve formed by all particles that have passed through a given fixed point $\mathbf x_0$ at earlier times — what you see if dye is injected continuously at $\mathbf x_0$.
:::

::: proposition Steady flow {#prop-steady}
If the flow is steady, the streamline through $\mathbf x_0$, the pathline of the particle at $\mathbf x_0$ at any time, and the streakline from $\mathbf x_0$ are the same curve.
:::

::: proof
For steady $\mathbf v$, the pathline equation $\dd\mathbf x/\dd t = \mathbf v(\mathbf x)$ is the streamline equation with the parameter $s$ renamed $t$, so the pathline through $\mathbf x_0$ traces the streamline through $\mathbf x_0$. Every particle that passes $\mathbf x_0$ then follows this same curve, only shifted in time, so the streakline from $\mathbf x_0$ lies along it too.
:::

In an unsteady flow they differ, often dramatically. Smoke from a chimney in a gusty wind traces a streakline, and its wiggles are not the shape of the instantaneous streamlines. Photographs of flow made with long exposures of tracer particles show pathlines.

::: example A flapping flow {#ex-flapping}
A two-dimensional flow has $v_x = U$ and $v_y = V\cos\omega t$, uniform in space but oscillating in time. Find the streamlines at time $t$, the pathline of the particle at the origin at $t = 0$, and the streakline at time $t$ of dye released continuously from the origin since $t = 0$.
::: solution
*Streamlines.* At fixed $t$ the velocity is the same at every point, so the streamlines are parallel straight lines with slope $\dd y/\dd x = (V/U)\cos\omega t$. The one through the origin is $y = (V/U)x\cos\omega t$. They swing back and forth as $t$ changes.

*Pathline.* Integrate $\dot x = U$, $\dot y = V\cos\omega t$ from the origin: $x = Ut$, $y = (V/\omega)\sin\omega t$. Eliminating $t$,

$$
y = \frac{V}{\omega}\sin\frac{\omega x}{U},
$$

a sine wave of wavelength $2\pi U/\omega$ — no streamline looks like this at any instant.

*Streakline.* The particle released from the origin at time $\tau$ is, at time $t \ge \tau$, at $x = U(t - \tau)$, $y = (V/\omega)(\sin\omega t - \sin\omega\tau)$. Eliminating $\tau = t - x/U$,

$$
y = \frac{V}{\omega}\Bigl[\sin\omega t - \sin\Bigl(\omega t - \frac{\omega x}{U}\Bigr)\Bigr], \qquad 0 \le x \le Ut ,
$$

another sine wave of the same wavelength, but one that travels downstream at speed $U$ as $t$ increases and always passes through the origin. Three different curves for one flow.
:::
:::

::: widget plot
f: sin(x); sin(T) - sin(T - x); cos(T)*x
x: 0, 12
y: -2.5, 2.5
sliders: T=6:0:12:0.1
labels: pathline of the particle released at t = 0; streakline at time T; streamline through the origin at time T
caption: The flapping flow of [[#ex-flapping]] with $U = V = \omega = 1$. The pathline is fixed. Drag the time $T$: the streamline through the origin swings between slopes $+1$ and $-1$, while the streakline (dye released from the origin, meaningful only for $x \le T$) travels downstream like a wave on a flag. At $T = 0$ or any multiple of $2\pi$ the streakline is the mirror image of the pathline; at no time does any streamline look like either. Put a wiggle in a steady stream and streamlines stop being a picture of where the fluid goes.
:::

::: quiz
Smoke leaves a factory chimney on a day when the wind direction is slowly veering. A photograph shows the plume curving to the left. What does the shape of the plume show?
- [ ] The streamlines at the moment of the photograph.
- [ ] The pathline of a single puff of smoke.
- [x] A streakline: the present positions of all the smoke released from the chimney top.
- [ ] All three, since they always coincide.
::: solution
Continuously released smoke marks the particles that have passed the chimney top at all earlier times, which is the definition of a streakline in [[#def-lines]]. Because the wind is changing, the flow is unsteady and [[#prop-steady]] does not apply: the instantaneous streamlines may be nearly straight, the path of one puff is a different curve again, and the plume's bend records the history of the wind.
:::
:::

### The stream function

In a two-dimensional flow with $\nabla\cdot\mathbf v = 0$ — which, as we shall see, means incompressible — there is a single scalar from which both velocity components follow.

::: theorem Stream function {#thm-stream}
Let $\mathbf v = (u, v)$ be a smooth two-dimensional velocity field with $\partial_xu + \partial_yv = 0$ in a simply connected region. Then there is a function $\psi(x, y)$, the **stream function**, with

$$
u = \pdv{\psi}{y}, \qquad v = -\pdv{\psi}{x}.
$$ {#eq-stream}

The streamlines are the curves $\psi = \text{const}$, and the volume flow rate (per unit depth) across any curve from a point $A$ to a point $B$ is $\psi(B) - \psi(A)$.
:::

::: proof
The condition $\partial_x u = \partial_y(-v)$ says that the 1-form $u\,\dd y - v\,\dd x$ is closed, so in a simply connected region it is exact: $\dd\psi = u\,\dd y - v\,\dd x$ for some $\psi$, which is [[#eq-stream]]. Along a streamline, $\dd y/\dd x = v/u$, so $\dd\psi = u\,\dd y - v\,\dd x = 0$: $\psi$ is constant. Across a curve element $(\dd x, \dd y)$ the normal (rotated clockwise) is $(\dd y, -\dd x)$, and the volume crossing per unit time is $u\,\dd y - v\,\dd x = \dd\psi$. Integrating from $A$ to $B$ gives $\psi(B) - \psi(A)$, independent of the curve.
:::

Closely spaced streamlines therefore mean fast flow, and widely spaced ones slow flow: the flux between neighbouring contours is fixed. This is the two-dimensional version of $Av = \text{const}$.

::: example Stagnation-point flow {#ex-stagnation}
The flow $u = \alpha x$, $v = -\alpha y$ with $\alpha > 0$ describes fluid approaching a wall at $y = 0$ from above and turning aside. Find the stream function, the streamlines, the acceleration and the pathlines.
::: solution
The divergence is $\alpha - \alpha = 0$. Integrating $\partial\psi/\partial y = \alpha x$ gives $\psi = \alpha xy + g(x)$, and $-\partial\psi/\partial x = -\alpha y - g'(x)$ must equal $-\alpha y$, so $g$ is a constant, which we drop: $\psi = \alpha xy$. The streamlines $xy = \text{const}$ are rectangular hyperbolas with the axes as asymptotes. The origin, where $\mathbf v = 0$, is a **stagnation point**.

The flow is steady, so the acceleration is convective only:

$$
\mathbf a = (\mathbf v\cdot\nabla)\mathbf v = \Bigl(\alpha x\pdv{}{x} - \alpha y\pdv{}{y}\Bigr)(\alpha x, -\alpha y) = (\alpha^2x, \alpha^2y).
$$

It points directly away from the stagnation point and grows linearly with distance. Fluid coming down the $y$-axis is decelerated ($a_y = \alpha^2 y > 0$ while $v_y < 0$); fluid leaving along the $x$-axis is accelerated.

The pathline from $(x_0, y_0)$ solves $\dot x = \alpha x$, $\dot y = -\alpha y$: $x = x_0e^{\alpha t}$, $y = y_0e^{-\alpha t}$. Then $xy = x_0y_0$, the same hyperbola, as [[#prop-steady]] requires. A particle on the $y$-axis never reaches the wall: it approaches the stagnation point exponentially slowly.
:::
:::

::: widget slopefield
f: -y/x
x: -3, 3
y: -3, 3
points: 0.3, 3; -0.3, 3; 1, 2; -1, 2; 2, 1.5
caption: Direction field of the streamlines $\dd y/\dd x = v/u = -y/x$ of the stagnation-point flow of [[#ex-stagnation]]. The seeded curves are hyperbolas $xy = \text{const}$; click anywhere to grow another. Imagine a wall along the $x$-axis: fluid comes down from above and is turned aside. Notice that the direction field alone cannot tell you which way along a curve the fluid moves, nor how fast. The spacing of the streamlines does: where the hyperbolas crowd together near the axes far from the origin, the flow is fast, and near the stagnation point it is slow.
:::

## Conservation of mass {#continuity}

Mass is neither created nor destroyed. Fix a region $V$ in space (a **control volume**) with boundary $S$ and outward normal $\mathbf n$. The mass inside can change only because fluid crosses $S$. In a time $\dd t$ the fluid crossing a surface element $\dd A$ fills a slanted cylinder of volume $\mathbf v\cdot\mathbf n\,\dd A\,\dd t$, so the outward mass flux is $\rho\mathbf v\cdot\mathbf n$ per unit area.

::: theorem Continuity equation {#thm-continuity}
If $\rho$ and $\mathbf v$ are continuously differentiable, conservation of mass in every control volume,

$$
\deriv{}{t}\int_V\rho\,\dd V = -\oint_S\rho\,\mathbf v\cdot\mathbf n\,\dd A ,
$$

is equivalent to the local **continuity equation**

$$
\pdv{\rho}{t} + \nabla\cdot(\rho\mathbf v) = 0, \qquad\text{equivalently}\qquad \frac{D\rho}{Dt} + \rho\,\nabla\cdot\mathbf v = 0 .
$$ {#eq-continuity}
:::

::: proof
The region is fixed, so the time derivative passes inside the integral. The divergence theorem converts the flux:

$$
\int_V\Bigl(\pdv{\rho}{t} + \nabla\cdot(\rho\mathbf v)\Bigr)\dd V = 0 .
$$

This holds for every region, and the integrand is continuous, so it vanishes everywhere (the argument is the one used for Cauchy's equation in [[continuum/stress-strain]]). Conversely the local equation integrates back to the global one. The second form follows from $\nabla\cdot(\rho\mathbf v) = \mathbf v\cdot\nabla\rho + \rho\nabla\cdot\mathbf v$ and [[#eq-material]].
:::

The second form says that the density of a particle decreases at the fractional rate $\nabla\cdot\mathbf v$. The divergence of the velocity is the rate of expansion of a fluid element, the time-derivative analogue of the volume strain $\varepsilon_{kk} = \nabla\cdot\mathbf u$ of [[continuum/stress-strain]].

::: definition Incompressible flow {#def-incompressible}
A flow is **incompressible** if the density of every fluid particle is constant, $D\rho/Dt = 0$. By [[#eq-continuity]] this is equivalent to

$$
\nabla\cdot\mathbf v = 0 .
$$ {#eq-incompressible}
:::

Incompressibility is a property of the flow, not only of the fluid. Air is very compressible, yet the flow of air round a car is incompressible to a few per cent. The density changes produced by a flow of speed $v$ are of order $\Delta\rho/\rho \approx \frac12\mathrm{Ma}^2$, where $\mathrm{Ma} = v/c$ is the **Mach number** and $c$ the speed of sound (this estimate is derived in [[continuum/ideal-flow]]). At $100\,\mathrm{m/s}$ in air, $\mathrm{Ma} = 0.29$ and $\Delta\rho/\rho \approx 0.04$. The usual rule of thumb treats flows with $\mathrm{Ma} < 0.3$ as incompressible. An incompressible flow need not have uniform density: in the ocean, salt water and fresh water each keep their density as they move, and the layers slide over one another with $\nabla\cdot\mathbf v = 0$.

::: example Steady flow in a pipe of varying section {#ex-pipe}
Derive the one-dimensional continuity equation for steady flow along a pipe whose cross-section $A(x)$ varies slowly, and apply it to water ($\rho$ constant) entering a nozzle of diameter $20.0\,\mathrm{mm}$ at $1.50\,\mathrm{m/s}$ and leaving through a diameter of $8.00\,\mathrm{mm}$.
::: solution
Take as control volume the part of the pipe between sections $x_1$ and $x_2$. The flow is steady, so the mass inside is constant and the net outflow vanishes. No fluid crosses the walls; on the end sections, if the velocity is nearly uniform across the pipe, the outward fluxes are $-\rho_1v_1A_1$ and $+\rho_2v_2A_2$. So $\rho_1v_1A_1 = \rho_2v_2A_2$: the mass flow rate $\dot m = \rho vA$ is the same at every section.

For water, $\rho$ cancels and $vA$ is constant:

$$
v_2 = v_1\frac{A_1}{A_2} = 1.50\times\Bigl(\frac{20.0}{8.00}\Bigr)^2 = 1.50\times6.25 = 9.38\,\mathrm{m/s}.
$$

The volume flow rate is $vA = 1.50\times\pi(0.0100)^2 = 4.71\times10^{-4}\,\mathrm{m^3/s}$, about $28\,$litres per minute. This is the relation used in [[mechanics/fluids]]; here it is a consequence of [[#thm-continuity]] applied to a particular control volume.
:::
:::

## Moving volumes: the Reynolds transport theorem {#rtt}

Newton's second law is about a fixed body of matter, a **material volume** $V(t)$ whose boundary moves with the fluid. To apply it in Eulerian terms we need to differentiate integrals over such moving regions. The key is a formula for how a small volume changes.

::: lemma Euler's expansion formula {#lem-jacobian}
Let $J(\mathbf a, t) = \det\bigl(\partial X_i/\partial a_j\bigr)$ be the Jacobian of the flow map, the ratio of the volume of a small material element at time $t$ to its volume at $t = 0$. Then

$$
\frac{DJ}{Dt} = J\,\nabla\cdot\mathbf v .
$$ {#eq-jacobian}
:::

::: proof
Write $F_{ij} = \partial X_i/\partial a_j$. Differentiating at fixed $\mathbf a$ and using [[#eq-link]] and the chain rule,

$$
\pdv{F_{ij}}{t} = \pdv{}{a_j}v_i\bigl(\mathbf X(\mathbf a, t), t\bigr) = \pdv{v_i}{x_k}F_{kj} .
$$

The derivative of a determinant is $\partial_t\det F = \det F\,\tr(F^{-1}\partial_tF)$ (Jacobi's formula), and here $F^{-1}\partial_tF = F^{-1}(\nabla\mathbf v)F$, whose trace equals $\tr(\nabla\mathbf v) = \nabla\cdot\mathbf v$. So $\partial_tJ = J\,\nabla\cdot\mathbf v$.
:::

::: theorem Reynolds transport theorem {#thm-rtt}
For a smooth field $F(\mathbf x, t)$ and a material volume $V(t)$ with boundary $S(t)$,

$$
\deriv{}{t}\int_{V(t)}F\,\dd V = \int_{V(t)}\Bigl(\frac{DF}{Dt} + F\,\nabla\cdot\mathbf v\Bigr)\dd V = \int_{V(t)}\pdv{F}{t}\,\dd V + \oint_{S(t)}F\,\mathbf v\cdot\mathbf n\,\dd A .
$$ {#eq-rtt}
:::

::: proof
Change variables to the labels: $\dd V = J\,\dd^3a$, and the moving region $V(t)$ becomes the fixed region $V(0)$ in label space. Then the derivative can be taken inside:

$$
\deriv{}{t}\int_{V(0)}F\bigl(\mathbf X(\mathbf a, t), t\bigr)J\,\dd^3a = \int_{V(0)}\Bigl(\frac{DF}{Dt}J + F\frac{DJ}{Dt}\Bigr)\dd^3a = \int_{V(t)}\Bigl(\frac{DF}{Dt} + F\nabla\cdot\mathbf v\Bigr)\dd V,
$$

by [[#lem-jacobian]]. For the second form, $DF/Dt + F\nabla\cdot\mathbf v = \partial_tF + \nabla\cdot(F\mathbf v)$, and the divergence theorem turns the last term into the surface integral.
:::

The second form has a plain reading: the integral over the moving volume changes because $F$ changes at each point, and because the boundary sweeps through space, gaining $F\,\mathbf v\cdot\mathbf n\,\dd A$ per unit time where it moves outward. Two corollaries are used constantly.

::: corollary Mass-weighted integrals {#cor-mass}
If mass is conserved, then for any field $G$,

$$
\deriv{}{t}\int_{V(t)}\rho\,G\,\dd V = \int_{V(t)}\rho\,\frac{DG}{Dt}\,\dd V .
$$

With $G = 1$ the mass of every material volume is constant; with $G = v_i$ the rate of change of momentum of a material volume is $\int\rho\,a_i\,\dd V$. In an incompressible flow, with $F = 1$, the volume of every material region is constant.
:::

::: proof
Apply [[#eq-rtt]] with $F = \rho G$: the integrand is $\rho\,DG/Dt + G\bigl(D\rho/Dt + \rho\nabla\cdot\mathbf v\bigr)$, and the bracket vanishes by [[#eq-continuity]]. For the last statement, [[#eq-rtt]] with $F = 1$ gives $\dd V/\dd t = \int\nabla\cdot\mathbf v\,\dd V = 0$.
:::

This closes the gap left in the proof of Cauchy's equation in [[continuum/stress-strain]]: the rate of change of momentum of a material body is the integral of density times acceleration. Engineers apply [[#eq-rtt]] to fixed control volumes with inflow and outflow — the forces on a pipe bend, the thrust of a jet — as developed in the Mechanical Engineering Atlas lesson [Control-volume analysis](/learn/mechanical/lesson.php?c=fluid-mechanics&l=control-volume-analysis).

::: quiz
In which of these flows is the volume of every material region constant?
- [x] $\mathbf v = (y, x, 0)$
- [ ] $\mathbf v = (x, y, 0)$
- [x] $\mathbf v = (-\Omega y, \Omega x, 0)$
- [ ] $\mathbf v = (x^2, 0, 0)$
::: solution
By [[#cor-mass]] the material volumes are preserved exactly when $\nabla\cdot\mathbf v = 0$. The divergences are $0$, $2$, $0$ and $2x$. The first is a pure straining flow (stretching along $x = y$, squeezing along $x = -y$), the third a rigid rotation; both preserve volume. The second is a uniform expansion, and the fourth expands where $x > 0$ and compresses where $x < 0$.
:::
:::

## Rotation and deformation: vorticity {#vorticity}

Near a point $\mathbf x$, the velocity is $\mathbf v(\mathbf x + \mathbf r) \approx \mathbf v(\mathbf x) + (\nabla\mathbf v)\mathbf r$, with $(\nabla\mathbf v)_{ij} = \partial v_i/\partial x_j$. Split the velocity gradient into symmetric and antisymmetric parts, exactly as the displacement gradient was split in [[continuum/stress-strain]]:

$$
\pdv{v_i}{x_j} = e_{ij} + \frac12\bigl(\partial_jv_i - \partial_iv_j\bigr), \qquad e_{ij} = \frac12\bigl(\partial_jv_i + \partial_iv_j\bigr).
$$ {#eq-decomp}

The symmetric part $e_{ij}$ is the **rate-of-strain tensor**: its diagonal entries are rates of stretching of line elements, its off-diagonal entries half the rates of decrease of right angles, and its trace is $\nabla\cdot\mathbf v$. The antisymmetric part is a rigid rotation, which can be written $\frac12\boldsymbol\omega\times\mathbf r$ in terms of a vector.

::: definition Vorticity and circulation {#def-vorticity}
The **vorticity** is $\boldsymbol\omega = \nabla\times\mathbf v$. The **circulation** round a closed curve $C$ is

$$
\Gamma_C = \oint_C\mathbf v\cdot\dd\mathbf l .
$$

By Stokes' theorem, for any surface $\Sigma$ spanning $C$, $\Gamma_C = \int_\Sigma\boldsymbol\omega\cdot\mathbf n\,\dd A$: circulation is the flux of vorticity. A flow with $\boldsymbol\omega = 0$ everywhere is **irrotational**.
:::

::: theorem Vorticity is twice the local angular velocity {#thm-spin}
Relative to its centre, a small fluid element moves with velocity $\mathbf e\,\mathbf r + \frac12\boldsymbol\omega\times\mathbf r$. The first term deforms the element without rotating its principal axes of strain rate; the second rotates the element rigidly with angular velocity $\frac12\boldsymbol\omega$. In two dimensions, $\frac12\omega_z$ is the average of the angular velocities of all material line elements through the point.
:::

::: proof
The antisymmetric matrix $A_{ij} = \frac12(\partial_jv_i - \partial_iv_j)$ has $A_{12} = \frac12(\partial_2v_1 - \partial_1v_2) = -\frac12\omega_3$, and similarly for the other entries, so $A\mathbf r = \frac12\boldsymbol\omega\times\mathbf r$ — a rigid rotation with angular velocity $\frac12\boldsymbol\omega$. The symmetric part has three orthogonal eigenvectors; a line element along one of them is only stretched, $\dot{\mathbf r} = \lambda\mathbf r$, and so its direction changes only through the rotation term.

For the two-dimensional average, take a line element at angle $\theta$, $\mathbf r = r(\cos\theta, \sin\theta)$. Its angular velocity is $\dot\theta = (\mathbf r\times\dot{\mathbf r})_z/r^2$ with $\dot{\mathbf r} = (\nabla\mathbf v)\mathbf r$:

$$
\dot\theta = \partial_xv_y\cos^2\theta + (\partial_yv_y - \partial_xv_x)\sin\theta\cos\theta - \partial_yv_x\sin^2\theta .
$$

The averages of $\cos^2\theta$, $\sin^2\theta$ and $\sin\theta\cos\theta$ over a full turn are $\frac12$, $\frac12$ and $0$, so the mean is $\frac12(\partial_xv_y - \partial_yv_x) = \frac12\omega_z$.
:::

A tiny paddle wheel carried along by the flow, with vanes in many directions, turns at the average rate, $\frac12\omega$. That is the operational meaning of vorticity. It is a local property and has little to do with whether the streamlines are curved, as the examples show.

::: example Three flows, three vorticities {#ex-three}
Compute the vorticity and the circulation round a circle of radius $R$ centred on the origin for (a) rigid rotation $\mathbf v = \Omega(-y, x)$, (b) the simple shear flow $\mathbf v = (\dot\gamma y, 0)$, and (c) the **line vortex** $\mathbf v = \dfrac{\kappa}{2\pi r}\hat{\boldsymbol\theta}$.
::: solution
(a) $\omega_z = \partial_x(\Omega x) - \partial_y(-\Omega y) = 2\Omega$: twice the angular velocity, as [[#thm-spin]] says. The speed on the circle is $\Omega R$, so $\Gamma = 2\pi R\cdot\Omega R = 2\pi\Omega R^2$, which is $\omega_z$ times the area $\pi R^2$, as Stokes' theorem requires.

(b) $\omega_z = 0 - \partial_y(\dot\gamma y) = -\dot\gamma$. The streamlines are straight, yet the flow is rotational: a paddle wheel in it turns clockwise, because the fluid above it moves faster than the fluid below. The rate of strain has $e_{xy} = \frac12\dot\gamma$. Round the circle, $\Gamma = \oint\dot\gamma y\,\dd x = -\dot\gamma\pi R^2$ (parametrise $x = R\cos\phi$, $y = R\sin\phi$: $\int_0^{2\pi}\dot\gamma R\sin\phi(-R\sin\phi)\,\dd\phi = -\pi\dot\gamma R^2$), again $\omega_z\times$ area.

(c) In polar coordinates $\omega_z = \frac1r\partial_r(rv_\theta) - \frac1r\partial_\theta v_r = \frac1r\partial_r(\kappa/2\pi) = 0$ for $r > 0$. The streamlines are circles, yet a paddle wheel carried round does not turn: the faster inner fluid rotates it one way and the curvature of the path rotates it the other way by the same amount. The circulation round any circle centred on the axis is nevertheless $2\pi R\cdot\kappa/2\pi R = \kappa$, independent of $R$. Stokes' theorem is not violated: the velocity is singular at $r = 0$, where all the vorticity is concentrated, and the region inside the circle is not one on which $\mathbf v$ is smooth. The constant $\kappa$ is called the **strength** of the vortex.
:::
:::

::: warning Curved streamlines do not mean vorticity
Circular streamlines are compatible with zero vorticity (the line vortex), and straight streamlines with non-zero vorticity (shear flow). Vorticity measures local spin of fluid elements, not the shape of their paths. The water spiralling into a plughole is close to a line vortex outside a small core and is nearly irrotational there; the water in a stirred cup that has spun up to rigid rotation is the opposite.
:::

::: remark The Rankine vortex
Real vortices — bathtub drains, tornadoes, the trailing vortices of an aircraft — have a core. The simplest model, due to Rankine, is rigid rotation $v_\theta = \Omega r$ for $r < a$ joined to a line vortex $v_\theta = \Omega a^2/r$ for $r > a$. All the vorticity, $2\Omega$, lies in the core; the circulation round any circle outside it is $2\pi\Omega a^2$, the core's vorticity times its area. The speed is greatest at the edge of the core, which is why the damage path of a tornado is concentrated in a ring.
:::

::: history Euler, Lagrange, Helmholtz and Reynolds
Leonhard Euler set out the field description of a fluid, the equation of continuity and the acceleration $\partial_t\mathbf v + (\mathbf v\cdot\nabla)\mathbf v$ in his memoir *Principes généraux du mouvement des fluides*, written in 1755 and published in 1757; Jean le Rond d'Alembert had obtained a form of the continuity equation in 1752. The description by particle labels, now called Lagrangian, was also used by Euler; Joseph-Louis Lagrange gave it prominence in his *Mécanique analytique* of 1788. George Gabriel Stokes, in 1845, decomposed the motion near a point into translation, rotation and pure straining. Hermann von Helmholtz founded the theory of vorticity in 1858, and William Thomson (later Lord Kelvin) introduced the term *circulation* in his paper on vortex motion of 1869. The transport theorem is named after Osborne Reynolds, who stated it in 1903.
:::

## Where this leads {#leads}

The kinematics is now in place. [[continuum/ideal-flow]] adds forces: with $\sigma_{ij} = -p\,\delta_{ij}$, Cauchy's equation of motion becomes Euler's equation, which with [[#eq-continuity]] determines the flow; Bernoulli's theorem and Kelvin's theorem on the conservation of circulation follow. [[continuum/viscous-flow]] adds stresses proportional to the rate of strain $e_{ij}$ of [[#eq-decomp]], which gives the Navier–Stokes equation. The continuity equation reappears whenever any conserved quantity is carried by a flow — charge in [[electrodynamics]], probability in quantum mechanics ([[quantum-1]]), phase-space density in Liouville's theorem of [[analytical-mechanics/hamiltonian]] — and the Lagrangian and Eulerian views are the two ways of solving it numerically ([[computation]]). The engineering treatment of the same material is the Mechanical Engineering Atlas lesson [Fluid kinematics](/learn/mechanical/lesson.php?c=fluid-mechanics&l=fluid-kinematics).

::: summary
- The Eulerian velocity field $\mathbf v(\mathbf x, t)$ and the Lagrangian motion $\mathbf X(\mathbf a, t)$ are linked by $\partial_t\mathbf X = \mathbf v(\mathbf X, t)$.
- The rate of change following a particle is $DF/Dt = \partial_tF + (\mathbf v\cdot\nabla)F$; the acceleration $\partial_t\mathbf v + (\mathbf v\cdot\nabla)\mathbf v$ is non-zero in most steady flows.
- Streamlines, pathlines and streaklines coincide in steady flow and differ otherwise; in 2D incompressible flow, streamlines are contours of the stream function, and the flux between two of them is the difference of $\psi$.
- Mass conservation is $\partial_t\rho + \nabla\cdot(\rho\mathbf v) = 0$; incompressible flow means $\nabla\cdot\mathbf v = 0$, a good approximation for $\mathrm{Ma} \lesssim 0.3$.
- The Reynolds transport theorem differentiates integrals over moving material volumes; with mass conservation, $\frac{\dd}{\dd t}\int\rho G\,\dd V = \int\rho\,DG/Dt\,\dd V$.
- The velocity gradient is a rate of strain plus a rigid spin at angular velocity $\frac12\boldsymbol\omega$, where $\boldsymbol\omega = \nabla\times\mathbf v$; circulation is the flux of vorticity.
- Vorticity is not curvature of streamlines: a line vortex is irrotational outside its axis, a shear flow is rotational.
:::

## Exercises

::: exercise Material derivative {level=1 check="9"}
In the flow $\mathbf v = (2x, -y, 0)\,\mathrm{s^{-1}}$ (coordinates in metres), the concentration of a dye is $c(x, y, t) = x^2y + 3t$ in some units. Find $Dc/Dt$ at the point $(1, 2)$ at $t = 0$.
::: solution
The local rate is $\partial c/\partial t = 3$. The gradient is $\nabla c = (2xy, x^2) = (4, 1)$ at $(1, 2)$, and the velocity there is $(v_x, v_y) = (2x, -y) = (2, -2)$. By [[#eq-material]],

$$
\frac{Dc}{Dt} = 3 + (2)(4) + (-2)(1) = 3 + 8 - 2 = 9 .
$$

The convective part, $6$, is twice the local part: a sensor riding with the fluid sees the concentration rise three times as fast as a fixed sensor at the same point.
:::
:::

::: exercise Acceleration at a point {level=1 check="4*sqrt(2)"}
For the stagnation-point flow of [[#ex-stagnation]] with $\alpha = 2.00\,\mathrm{s^{-1}}$, find the magnitude of the acceleration (in $\mathrm{m/s^2}$) of the fluid at the point $(1.00, 1.00)\,\mathrm m$.
::: solution
From [[#ex-stagnation]], $\mathbf a = \alpha^2(x, y) = 4.00\times(1.00, 1.00)\,\mathrm{m/s^2}$, so $\abs{\mathbf a} = 4.00\sqrt2 = 5.66\,\mathrm{m/s^2}$. The velocity there is $(2.00, -2.00)\,\mathrm{m/s}$, perpendicular to the acceleration: the particle is turning without changing speed at this instant, since $\mathbf v\cdot\mathbf a = 0$.
:::
:::

::: exercise Completing an incompressible field {level=1 check="-6"}
A steady two-dimensional flow has $u = 3x^2 - 3y^2$ and $v = kxy$. Find the constant $k$ for which the flow is incompressible.
::: solution
By [[#eq-incompressible]], $\partial_xu + \partial_yv = 6x + kx = 0$ for all $x$, so $k = -6$. The stream function is then $\psi = 3x^2y - y^3$ (check: $\partial_y\psi = 3x^2 - 3y^2 = u$ and $-\partial_x\psi = -6xy = v$). This is the flow into a corner of angle $60^\circ$, since $\psi = r^3\sin3\theta$ vanishes on $\theta = 0$ and $\theta = \pi/3$.
:::
:::

::: exercise Flow rate between streamlines {level=2 check="7.5"}
For the stagnation-point flow $\psi = \alpha xy$ with $\alpha = 1.50\,\mathrm{s^{-1}}$, find the volume flow rate per unit depth (in $\mathrm{m^2/s}$) passing between the streamline through $(1.00, 2.00)\,\mathrm m$ and the streamline through $(2.00, 3.50)\,\mathrm m$.
::: solution
By [[#thm-stream]] the flow rate is the difference of the stream function values, whatever curve joins the two points:

$$
\psi_1 = 1.50\times1.00\times2.00 = 3.00\,\mathrm{m^2/s}, \qquad \psi_2 = 1.50\times2.00\times3.50 = 10.5\,\mathrm{m^2/s},
$$

so $Q = 10.5 - 3.00 = 7.50\,\mathrm{m^2/s}$. As a check, cross between the two streamlines along the line $x = 1.00\,\mathrm m$. The first streamline meets it at $y = 2.00$, and the second, $xy = 10.5/1.50 = 7.00$, at $y = 7.00$. The flux through this segment is $\int u\,\dd y = \alpha x\,\Delta y = 1.50\times1.00\times5.00 = 7.50\,\mathrm{m^2/s}$, the same answer, as it must be for any path between the two streamlines.
:::
:::

::: exercise Time to approach a stagnation point {level=2 check="log(10)/0.5"}
In the stagnation-point flow with $\alpha = 0.500\,\mathrm{s^{-1}}$, a particle starts at $(0.100, 1.00)\,\mathrm m$. How long, in seconds, does it take to reach $y = 0.100\,\mathrm m$, and where is it then?
::: solution
From [[#ex-stagnation]], $y = y_0e^{-\alpha t}$, so $t = \alpha^{-1}\ln(y_0/y) = 2.00\ln10 = 4.61\,\mathrm s$. Then $x = x_0e^{\alpha t} = 0.100\times10 = 1.00\,\mathrm m$; the particle is at $(1.00, 0.100)$, on the same hyperbola $xy = 0.100\,\mathrm{m^2}$. Each further factor of $10$ closer to the wall takes another $4.61\,\mathrm s$, so the particle never arrives.
:::
:::

::: exercise A Rankine vortex {level=2 check="2*pi*2*0.05^2"}
A Rankine vortex has a core of radius $a = 5.00\,\mathrm{cm}$ rotating rigidly at $\Omega = 2.00\,\mathrm{rad/s}$. Find the circulation (in $\mathrm{m^2/s}$) round a circle of radius $20.0\,\mathrm{cm}$ centred on the axis, the fluid speed there, and the vorticity inside and outside the core.
::: solution
Outside the core $v_\theta = \Omega a^2/r$, so on $r = 0.200\,\mathrm m$, $v_\theta = 2.00\times0.0025/0.200 = 0.0250\,\mathrm{m/s}$ and $\Gamma = 2\pi rv_\theta = 2\pi\Omega a^2 = 2\pi\times2.00\times0.00250 = 0.0314\,\mathrm{m^2/s}$. The vorticity is $2\Omega = 4.00\,\mathrm{s^{-1}}$ inside the core and zero outside, and $\Gamma$ equals $4.00\times\pi a^2 = 0.0314\,\mathrm{m^2/s}$, as Stokes' theorem requires. The speed is largest at the edge of the core, $\Omega a = 0.100\,\mathrm{m/s}$.
:::
:::

::: exercise Compressing a gas {level=2 check="4.8"}
Gas in a cylinder of length $L$ is compressed by a piston moving at speed $V$ towards the closed end at $x = 0$, so that, at the instant considered, the velocity is $v_x = -Vx/L$ throughout. With $V = 2.00\,\mathrm{m/s}$, $L = 0.500\,\mathrm m$ and density $\rho = 1.20\,\mathrm{kg/m^3}$ (uniform), find the rate $D\rho/Dt$ at which the density of each gas particle increases, in $\mathrm{kg\,m^{-3}\,s^{-1}}$. Is $\partial\rho/\partial t$ the same?
::: solution
The divergence is $\partial v_x/\partial x = -V/L = -4.00\,\mathrm{s^{-1}}$. By the second form of [[#eq-continuity]],

$$
\frac{D\rho}{Dt} = -\rho\,\nabla\cdot\mathbf v = 1.20\times4.00 = 4.80\,\mathrm{kg\,m^{-3}\,s^{-1}}.
$$

Because the density is uniform, $\nabla\rho = 0$ and the convective term vanishes, so $\partial\rho/\partial t$ is also $4.80$. This is the same as the global statement that the mass $\rho AL$ is constant while $L$ shrinks: $\dot\rho/\rho = -\dot L/L = V/L$.
:::
:::

::: exercise Dilatation of a material element {level=3}
Using [[#lem-jacobian]], show that in the flow $\mathbf v = (\beta x, \beta y, -2\beta z)$ the volume of every material element is constant, and in the flow $\mathbf v = \beta(x, y, z)$ it grows like $e^{3\beta t}$. Then verify the second result directly by finding the flow map $\mathbf X(\mathbf a, t)$ and its Jacobian.
::: solution
For the first flow $\nabla\cdot\mathbf v = \beta + \beta - 2\beta = 0$, so $DJ/Dt = 0$ and $J = 1$: an axisymmetric straining flow that stretches elements radially and squashes them along $z$, at constant volume. For the second, $\nabla\cdot\mathbf v = 3\beta$, so $DJ/Dt = 3\beta J$ with $J(0) = 1$, giving $J = e^{3\beta t}$.

Directly: $\dot X_i = \beta X_i$ gives $X_i = a_ie^{\beta t}$, so $\partial X_i/\partial a_j = e^{\beta t}\delta_{ij}$ and $J = \det = e^{3\beta t}$, in agreement. By [[#eq-continuity]], the density of each particle falls as $\rho_0e^{-3\beta t}$: this is the kinematics of the expanding universe in comoving coordinates, with $\beta$ playing the part of the Hubble rate.
:::
:::

::: exercise The paddle wheel in a line vortex {level=3}
In the line vortex $v_\theta = \kappa/2\pi r$, consider two short material line elements through the point $(r, 0)$, one along $\hat{\mathbf r}$ and one along $\hat{\boldsymbol\theta}$. Compute the rate of rotation of each, and show that their average is $\frac12\omega_z = 0$, while the element along $\hat{\boldsymbol\theta}$ alone rotates at the rate $v_\theta/r$ at which the point is carried round the axis.
::: hint
Work in Cartesian coordinates at the point $(r, 0)$, where $\hat{\mathbf r} = \mathbf e_x$ and $\hat{\boldsymbol\theta} = \mathbf e_y$, with $u = -\kappa y/2\pi(x^2 + y^2)$ and $v = \kappa x/2\pi(x^2 + y^2)$. The rate of rotation of an element along $\mathbf e_x$ is $\partial_xv$, and of one along $\mathbf e_y$ is $-\partial_yu$.
:::
::: solution
Write $k = \kappa/2\pi$. Then $u = -ky/(x^2 + y^2)$ and $v = kx/(x^2 + y^2)$. At $(r, 0)$:

$$
\pdv{v}{x} = k\frac{(x^2 + y^2) - 2x^2}{(x^2 + y^2)^2} = -\frac{k}{r^2}, \qquad \pdv{u}{y} = -k\frac{(x^2 + y^2) - 2y^2}{(x^2 + y^2)^2} = -\frac{k}{r^2} .
$$

The element along $\mathbf e_x$ (radial) rotates at $\partial_xv = -k/r^2$: clockwise, because its outer end moves round more slowly than its inner end. The element along $\mathbf e_y$ (tangential) rotates at $-\partial_yu = +k/r^2$: anticlockwise, at exactly the angular speed $v_\theta/r = k/r^2$ with which the point goes round the axis — it stays tangent to its circle. The average is $\frac12(-k/r^2 + k/r^2) = 0 = \frac12\omega_z$, in agreement with [[#thm-spin]] and [[#ex-three]]. A paddle wheel with one radial and one tangential vane is pushed equally hard in opposite senses and does not turn; it is carried round the axis keeping its orientation fixed, like a compass needle.
:::
:::
