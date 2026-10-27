Tilt a jar of honey and a jar of water side by side. Both are liquids of similar density, and the ideal theory of [[continuum/ideal-flow]] treats them identically. Yet the water pours in a second and the honey takes a minute. The difference is **viscosity**, the internal friction that resists the sliding of one layer of fluid over another. Viscosity is why a river flows faster in the middle than at the banks, why blood needs a heart to push it, why a mist droplet falls slowly, and why a moving body feels drag — the answer to d'Alembert's paradox.

This chapter adds viscous stresses to Euler's equation and derives the **Navier–Stokes equation**. Its exact solutions are few but instructive: flow between sliding plates, flow down a pipe (the Hagen–Poiseuille law), and the slow motion of a sphere (Stokes' drag). Its scaling properties are even more useful. A single dimensionless number, the **Reynolds number**, decides whether viscosity dominates or is a small correction, and whether a flow is smooth or turbulent. At large Reynolds number, viscosity matters only in thin **boundary layers** next to walls, and their behaviour reconciles the ideal theory with the drag that every swimmer feels.

The ingredients are Cauchy's equation of motion from [[continuum/stress-strain]], the rate-of-strain tensor $e_{ij} = \frac12(\partial_iv_j + \partial_jv_i)$ and vorticity from [[continuum/fluid-kinematics]], and the isotropic-tensor argument of [[continuum/elasticity]]. Ordinary differential equations of the kind in [[math-methods/odes]] solve the exact flows.

## Newtonian viscosity {#newtonian}

Picture a thin layer of oil between two parallel plates, a distance $h$ apart, the lower one fixed and the upper one moved at speed $U$. Experiment shows that the force per unit area needed to keep the upper plate moving is proportional to $U/h$:

$$
\tau = \eta\,\frac{U}{h} .
$$

The constant $\eta$ is the **dynamic viscosity**, measured in $\mathrm{Pa\,s}$. Newton proposed the proportionality in the *Principia*, and fluids that obey it are called **Newtonian**. Water and air are Newtonian to high accuracy; blood, paint, ketchup and toothpaste are not.

To turn this into a law for general flows, we need a stress that depends on the velocity gradients. It must vanish for rigid motion — a fluid in uniform translation or rigid rotation is not being sheared, and feels no friction — so it depends on $\nabla\mathbf v$ only through the rate of strain $e_{ij}$, not the vorticity.

::: definition Newtonian fluid {#def-newtonian}
A fluid is **Newtonian** if its stress tensor is

$$
\sigma_{ij} = -p\,\delta_{ij} + 2\eta\Bigl(e_{ij} - \tfrac13e_{kk}\delta_{ij}\Bigr) + \zeta\,e_{kk}\,\delta_{ij} ,
$$ {#eq-newtonian}

with $e_{ij} = \frac12(\partial_iv_j + \partial_jv_i)$, $e_{kk} = \nabla\cdot\mathbf v$, and constants $\eta \ge 0$ (the **shear viscosity**) and $\zeta \ge 0$ (the **bulk viscosity**). Here $p$ is the thermodynamic pressure given by the equation of state. The ratio $\nu = \eta/\rho$ is the **kinematic viscosity**.
:::

The form of [[#eq-newtonian]] is forced by two assumptions: the viscous stress is a linear function of $e_{ij}$, and the fluid is isotropic. The argument is that of [[continuum/elasticity#thm-hooke]], with the strain replaced by the rate of strain: the viscous stress must be $\lambda'e_{kk}\delta_{ij} + 2\eta e_{ij}$, which is [[#eq-newtonian]] with $\zeta = \lambda' + \frac23\eta$. The split is the same as for elasticity. The shear viscosity resists changes of shape at the rate $e_{ij} - \frac13e_{kk}\delta_{ij}$; the bulk viscosity resists changes of volume, and is irrelevant in incompressible flow, where $e_{kk} = 0$. Positivity of $\eta$ and $\zeta$ is required by the second law of thermodynamics: the viscous stresses must convert kinetic energy into heat, never the reverse.

Typical values at $20\,^\circ\mathrm C$ and atmospheric pressure, from standard tables (Kaye and Laby; CRC Handbook):

| fluid | $\eta$ (Pa s) | $\rho$ (kg/m³) | $\nu$ (m²/s) |
|---|---|---|---|
| air | $1.81\times10^{-5}$ | $1.20$ | $1.51\times10^{-5}$ |
| water | $1.00\times10^{-3}$ | $998$ | $1.00\times10^{-6}$ |
| olive oil | $\approx 0.08$ | $910$ | $\approx 9\times10^{-5}$ |
| glycerol | $1.41$ | $1260$ | $1.12\times10^{-3}$ |
| honey | $\approx 10$ | $1400$ | $\approx 7\times10^{-3}$ |

Notice that air has a *larger* kinematic viscosity than water, fifteen times larger. In the equations of motion it is $\nu$, not $\eta$, that measures how quickly momentum diffuses, and air is in this sense the more viscous fluid. The viscosity of a gas rises with temperature, roughly as $\sqrt T$, because faster molecules carry momentum across layers faster ([[thermodynamics/kinetic-theory]] derives $\eta \approx \frac13\rho\bar v\lambda$). The viscosity of a liquid falls steeply with temperature, as warm honey shows.

## The Navier–Stokes equation {#navier-stokes}

::: theorem Navier–Stokes equation {#thm-ns}
For a Newtonian fluid with uniform $\eta$ and $\zeta$ in a gravitational field $\mathbf g$,

$$
\rho\Bigl(\pdv{\mathbf v}{t} + (\mathbf v\cdot\nabla)\mathbf v\Bigr) = -\nabla p + \eta\nabla^2\mathbf v + \Bigl(\zeta + \tfrac13\eta\Bigr)\nabla(\nabla\cdot\mathbf v) + \rho\mathbf g .
$$

If the flow is incompressible, $\nabla\cdot\mathbf v = 0$ and this reduces to

$$
\pdv{\mathbf v}{t} + (\mathbf v\cdot\nabla)\mathbf v = -\frac1\rho\nabla p + \nu\nabla^2\mathbf v + \mathbf g, \qquad \nabla\cdot\mathbf v = 0 .
$$ {#eq-ns}
:::

::: proof
Take the divergence of [[#eq-newtonian]] term by term. The pressure gives $-\partial_ip$. Since $2e_{ij} = \partial_iv_j + \partial_jv_i$,

$$
\partial_j(2\eta e_{ij}) = \eta\bigl(\partial_i\partial_jv_j + \partial_j\partial_jv_i\bigr) = \eta\,\partial_i(\nabla\cdot\mathbf v) + \eta\nabla^2v_i .
$$

The isotropic terms give $\partial_i\bigl[(\zeta - \frac23\eta)\nabla\cdot\mathbf v\bigr]$. Adding, $\partial_j\sigma_{ij} = -\partial_ip + \eta\nabla^2v_i + (\zeta + \frac13\eta)\partial_i(\nabla\cdot\mathbf v)$. Substituting into Cauchy's equation $\rho\,Dv_i/Dt = \partial_j\sigma_{ij} + \rho g_i$ gives the first equation; setting $\nabla\cdot\mathbf v = 0$ and dividing by $\rho$ gives [[#eq-ns]].
:::

The new term $\nu\nabla^2\mathbf v$ is a diffusion term. It says that each velocity component spreads through the fluid like heat, with diffusivity $\nu$: a layer moving faster than its neighbours drags them along and is slowed by them. Taking the curl of [[#eq-ns]] for constant $\rho$ removes the pressure and gravity, and gives the **vorticity equation**

$$
\frac{D\boldsymbol\omega}{Dt} = (\boldsymbol\omega\cdot\nabla)\mathbf v + \nu\nabla^2\boldsymbol\omega ,
$$ {#eq-vorticity}

in which the first term is the stretching and turning of vortex lines met in Kelvin's theorem, and the second their diffusion. With $\nu = 0$, vorticity can only be carried and stretched; with $\nu > 0$ it can also be created at walls and spread into the fluid.

The order of the differential equation has gone up from one to two, and one more boundary condition is needed. It is the **no-slip condition**: at a solid wall the fluid has the velocity of the wall, tangential component included. It is an experimental fact for ordinary liquids and gases, understood microscopically as the result of molecules that strike a rough wall leaving it in random directions. It fails only in rarefied gases and, slightly, for liquids on very smooth hydrophobic surfaces. The engineer's treatment of the equation, with its many forms and boundary conditions, is in the Mechanical Engineering Atlas lesson [The Navier–Stokes equations](/learn/mechanical/lesson.php?c=fluid-mechanics&l=navier-stokes).

## Exact solutions: Couette and Poiseuille {#exact}

The nonlinear term $(\mathbf v\cdot\nabla)\mathbf v$ vanishes identically for **unidirectional** flows, $\mathbf v = u(y, z, t)\,\mathbf e_x$: the velocity does not vary along the direction of flow, as incompressibility requires. Then [[#eq-ns]] is linear, and the classical solutions follow.

### Plane Couette and Poiseuille flow

Between plates at $y = 0$ and $y = h$, with steady flow $u(y)$ along $x$ and gravity neglected, the $y$-component of [[#eq-ns]] gives $\partial p/\partial y = 0$, and the $x$-component gives

$$
\eta\deriv{^2u}{y^2} = \pdv{p}{x} .
$$

The left side depends only on $y$ and the right side only on $x$, so both equal a constant $-G$, the imposed pressure drop per unit length. Integrating twice with no slip, $u(0) = 0$ and $u(h) = U$:

$$
u(y) = \frac{Uy}{h} + \frac{G}{2\eta}y(h - y) .
$$ {#eq-couette}

With $G = 0$ this is **Couette flow**, a linear profile with uniform shear stress $\eta U/h$, the experiment we started from. With $U = 0$ it is **plane Poiseuille flow**, a parabola with its maximum $Gh^2/8\eta$ at mid-channel. A journal bearing, where a rotating shaft is separated from its housing by a thin film of oil, is a Couette flow plus the pressure-driven part that the shaft's eccentricity generates — the lift that keeps the shaft off the metal.

::: widget plot
f: U*(1+x)/2 + P*(1-x^2)
x: -1, 1
y: -1, 2
sliders: U=1:-1:1:0.05; P=0:-1:1:0.05
caption: The velocity profile [[#eq-couette]] across a channel, with the walls at $-1$ and $+1$ on the horizontal axis, the upper wall moving at speed $U$ and a pressure-driven part of central strength $P$. With $P = 0$ you see pure Couette flow, a straight line. Set $U = 0$ and $P = 1$ for Poiseuille flow, a parabola. Now set $U = 1$ and drag $P$ negative: an adverse pressure gradient (pressure rising in the direction of motion) makes the fluid near the fixed wall flow *backwards* once $P < -0.25$. That reversal of flow next to a wall is the seed of boundary-layer separation.
:::

### Pipe flow

::: theorem Hagen–Poiseuille law {#thm-poiseuille}
In steady laminar flow of an incompressible Newtonian fluid through a straight circular pipe of radius $R$, driven by a pressure drop $\Delta p$ over a length $L$, the velocity profile is

$$
u(r) = \frac{\Delta p}{4\eta L}\bigl(R^2 - r^2\bigr),
$$ {#eq-poiseuille-profile}

and the volume flow rate is

$$
Q = \frac{\pi R^4\,\Delta p}{8\eta L} .
$$ {#eq-poiseuille}

The mean velocity is half the centre-line velocity, and the wall shear stress is $\tau_w = R\,\Delta p/2L$.
:::

::: proof
Take the flow along the axis $x$, with $\mathbf v = u(r)\,\mathbf e_x$. The radial and azimuthal components of [[#eq-ns]] give $\partial p/\partial r = \partial p/\partial\theta = 0$, so $p = p(x)$. The axial component, with the Laplacian of an axisymmetric function, is

$$
\frac{\eta}{r}\deriv{}{r}\Bigl(r\deriv{u}{r}\Bigr) = \deriv{p}{x} .
$$

As before, both sides equal a constant, $-\Delta p/L$. Multiply by $r/\eta$ and integrate:

$$
r\deriv{u}{r} = -\frac{\Delta p}{2\eta L}r^2 + A .
$$

The velocity must be finite on the axis, so $u'$ must be finite at $r = 0$, which forces $A = 0$. Integrating again, $u = -\frac{\Delta p}{4\eta L}r^2 + B$, and no slip at $r = R$ gives $B = \Delta pR^2/4\eta L$, which is [[#eq-poiseuille-profile]]. The flow rate is

$$
Q = \int_0^R u(r)\,2\pi r\,\dd r = \frac{2\pi\Delta p}{4\eta L}\Bigl[\frac{R^2r^2}{2} - \frac{r^4}{4}\Bigr]_0^R = \frac{\pi R^4\Delta p}{8\eta L} .
$$

The centre-line speed is $u(0) = \Delta pR^2/4\eta L$ and the mean speed is $Q/\pi R^2 = \Delta pR^2/8\eta L$, half of it. The wall shear stress is $\eta\abs{u'(R)} = \eta\cdot\frac{\Delta p}{2\eta L}R = R\Delta p/2L$.
:::

The fourth power of the radius is the striking feature. Halving the diameter of a pipe cuts the flow by a factor of sixteen at the same pressure drop. It explains why a partial narrowing of an artery is so serious, and why the body regulates blood flow by small changes of arteriole radius. Gotthilf Hagen measured the law in brass tubes in 1839, and Jean Léonard Marie Poiseuille, a physician studying blood flow, independently in glass capillaries in 1840–46; the derivation from the Navier–Stokes equation came in the following decades, notably from Eduard Hagenbach in 1860.

::: example Water in a narrow tube {#ex-tube}
Water ($\eta = 1.00\times10^{-3}\,\mathrm{Pa\,s}$) is driven through a tube of radius $1.00\,\mathrm{mm}$ and length $1.00\,\mathrm m$ by a pressure difference of $1.00\,\mathrm{kPa}$. Find the flow rate, the mean speed and the centre-line speed. Check that the flow is laminar.
::: solution
By [[#eq-poiseuille]],

$$
Q = \frac{\pi(1.00\times10^{-3})^4\times1000}{8\times1.00\times10^{-3}\times1.00} = \frac{\pi\times10^{-9}}{8\times10^{-3}} = 3.93\times10^{-7}\,\mathrm{m^3/s},
$$

about $24\,\mathrm{ml}$ per minute. The mean speed is $Q/\pi R^2 = 3.93\times10^{-7}/3.14\times10^{-6} = 0.125\,\mathrm{m/s}$, and the centre-line speed is twice that, $0.250\,\mathrm{m/s}$. The Reynolds number based on diameter, defined in the next section, is $\rho\bar u\,2R/\eta = 1000\times0.125\times0.00200/10^{-3} = 250$, far below the transition value of about $2000$, so the laminar solution is the one realised. At the same pressure gradient a tube of radius $1\,\mathrm{cm}$ would by [[#eq-poiseuille]] carry $10^4$ times more water at $100$ times the speed and a Reynolds number of $250\,000$ — the laminar solution would then not be observed at all.
:::
:::

::: warning The parabolic profile is not automatic
Equation [[#eq-poiseuille-profile]] describes **fully developed laminar** flow. Near a pipe entrance the profile is still developing, over a distance of roughly $0.06\,\mathrm{Re}$ diameters. Above a Reynolds number of about $2000$ the flow becomes turbulent, the profile is much flatter, and the pressure drop is far larger than [[#eq-poiseuille]] predicts, growing roughly as $Q^{1.75}$ instead of $Q$. Using the Hagen–Poiseuille law to size a water main or a ventilation duct gives answers that are wrong by an order of magnitude. The empirical laws of turbulent pipe flow are in the Mechanical Engineering Atlas lesson [Pipe flow](/learn/mechanical/lesson.php?c=fluid-mechanics&l=pipe-flow).
:::

## The Reynolds number and dynamical similarity {#reynolds}

Most flows cannot be solved exactly, but [[#eq-ns]] still tells us how their solutions scale. Let a flow be characterised by a length $L$ (the size of the body or pipe) and a speed $U$. Measure lengths in units of $L$, velocities in units of $U$, times in units of $L/U$ and pressure in units of $\rho U^2$: $\mathbf x = L\mathbf x^*$, $\mathbf v = U\mathbf v^*$, $t = (L/U)t^*$, $p = \rho U^2p^*$. Then, without gravity, [[#eq-ns]] becomes

$$
\pdv{\mathbf v^*}{t^*} + (\mathbf v^*\cdot\nabla^*)\mathbf v^* = -\nabla^*p^* + \frac{1}{\mathrm{Re}}\nabla^{*2}\mathbf v^*, \qquad \nabla^*\cdot\mathbf v^* = 0 ,
$$ {#eq-ns-dimensionless}

with a single parameter, the **Reynolds number**

$$
\mathrm{Re} = \frac{UL}{\nu} = \frac{\rho UL}{\eta} .
$$

::: theorem Dynamical similarity {#thm-similarity}
Two incompressible flows of Newtonian fluids without free surfaces, past geometrically similar bodies with similar boundary conditions, are described by the same dimensionless solution $\mathbf v^*(\mathbf x^*, t^*)$, $p^*(\mathbf x^*, t^*)$ if they have the same Reynolds number. In particular, the drag on the body has the form

$$
F = \rho U^2L^2\,f(\mathrm{Re})
$$

with the same function $f$ for every member of the family.
:::

::: proof
The dimensionless problem — [[#eq-ns-dimensionless]], no slip on the dimensionless body surface and $\mathbf v^* \to \mathbf e_x$ at infinity — contains no parameter other than $\mathrm{Re}$. Any two flows with equal $\mathrm{Re}$ therefore pose the same dimensionless problem and, whenever it has a unique solution (or the same physically realised one), have the same $\mathbf v^*$ and $p^*$. The force is the integral of the stress over the body, $F = \oint\sigma_{ij}n_j\,\dd A$; in dimensionless form the stress is $\rho U^2$ times a function of the dimensionless solution and the area is $L^2$ times a dimensionless area, so $F = \rho U^2L^2f(\mathrm{Re})$.
:::

The Reynolds number estimates the ratio of the inertial term to the viscous term: $\abs{(\mathbf v\cdot\nabla)\mathbf v} \sim U^2/L$ against $\abs{\nu\nabla^2\mathbf v} \sim \nu U/L^2$. Its range in nature is enormous:

| flow | $L$ | $U$ | $\mathrm{Re}$ |
|---|---|---|---|
| bacterium swimming in water | $2\,\mu\mathrm m$ | $30\,\mu\mathrm m/\mathrm s$ | $6\times10^{-5}$ |
| water in a $1\,\mathrm{mm}$ tube (above) | $2\,\mathrm{mm}$ | $0.125\,\mathrm{m/s}$ | $250$ |
| human swimmer | $2\,\mathrm m$ | $1\,\mathrm{m/s}$ | $2\times10^{6}$ |
| car on a motorway | $4\,\mathrm m$ | $30\,\mathrm{m/s}$ | $8\times10^{6}$ |

At small Reynolds number viscosity dominates and inertia is irrelevant: a bacterium that stops swimming coasts for less than a tenth of an atomic diameter. At large Reynolds number inertia dominates, but, as we shall see, viscosity cannot simply be dropped.

Similarity is the basis of every wind-tunnel and towing-tank test. Osborne Reynolds discovered its importance in 1883 by injecting a filament of dye into water flowing through glass pipes. Below a critical value of the number now named after him — about $2000$ with ordinary inlet disturbances, though he kept the flow laminar up to $12\,000$ with great care — the dye stayed a straight line. Above it, the filament broke up and the dye filled the pipe: the flow had become **turbulent**. Pipes of different diameters and water at different temperatures (hence viscosities) gave the same critical value of $\bar uD/\nu$, the first demonstration of dynamical similarity in a transition. Dimensional analysis in engineering practice is the subject of the Mechanical Engineering Atlas lesson [Dimensional analysis](/learn/mechanical/lesson.php?c=fluid-mechanics&l=dimensional-analysis).

::: quiz
A 1:5 scale model of a car is to be tested in a water tunnel so as to reproduce the Reynolds number of the full-size car at $25\,\mathrm{m/s}$ in air. Roughly what water speed is needed? ($\nu_{\mathrm{air}} \approx 15\,\nu_{\mathrm{water}}$.)
- [ ] $125\,\mathrm{m/s}$
- [ ] $5\,\mathrm{m/s}$
- [x] about $8\,\mathrm{m/s}$
- [ ] $25\,\mathrm{m/s}$
::: solution
Equal Reynolds numbers require $U_mL_m/\nu_w = U_pL_p/\nu_a$, so $U_m = U_p(L_p/L_m)(\nu_w/\nu_a) = 25\times5/15 = 8.3\,\mathrm{m/s}$. In air the model would need $125\,\mathrm{m/s}$, which is fast enough for compressibility to spoil the similarity; water's smaller kinematic viscosity makes the test feasible.
:::
:::

## Slow flow: Stokes drag {#stokes}

When $\mathrm{Re} \ll 1$ the inertial term can be dropped and [[#eq-ns]] becomes the linear **Stokes equation** $\nabla p = \eta\nabla^2\mathbf v$, $\nabla\cdot\mathbf v = 0$. The density has disappeared; by dimensional analysis the force on a body of size $a$ moving at speed $U$ can then only be proportional to $\eta aU$.

::: theorem Stokes' drag law {#thm-stokes}
A sphere of radius $a$ moving at constant speed $U$ through an unbounded viscous fluid at rest, in the limit $\mathrm{Re} = \rho Ua/\eta \to 0$, experiences the drag

$$
F = 6\pi\eta aU .
$$ {#eq-stokes}

Of this, one third ($2\pi\eta aU$) is the net pressure force and two thirds ($4\pi\eta aU$) the viscous shear stress on the surface.
:::

::: proof
*Sketch.* In the frame of the sphere, look for a solution of the Stokes equations with no slip on $r = a$ and $\mathbf v \to U\mathbf e_z$ far away. By linearity and symmetry the stream function has the form $\psi = \sin^2\theta\,f(r)$ (Stokes' axisymmetric stream function), and the Stokes equations reduce to a fourth-order Euler-type ODE for $f$, with power-law solutions $r^4, r^2, r, r^{-1}$. The far-field condition excludes $r^4$ and fixes the $r^2$ coefficient; no slip fixes the other two, giving

$$
\psi = \tfrac12U\sin^2\theta\Bigl(r^2 - \tfrac32ar + \tfrac12\frac{a^3}{r}\Bigr), \qquad p = p_\infty - \frac{3\eta Ua}{2r^2}\cos\theta .
$$

Integrating the pressure and the viscous stress over the sphere gives $2\pi\eta aU$ and $4\pi\eta aU$. The full calculation is in §20 of Landau and Lifshitz, *Fluid Mechanics*, and in chapter 7 of Acheson's *Elementary Fluid Dynamics*.
:::

Stokes published the result in 1851, in a paper on the damping of pendulums by air. It is accurate to about $10\,\%$ up to $\mathrm{Re} \approx 1$ (based on diameter); Oseen's correction of 1910 multiplies it by $1 + \frac38\mathrm{Re}_a$ with $\mathrm{Re}_a = \rho Ua/\eta$. The drag is linear in $U$, unlike the quadratic drag $\frac12C_D\rho U^2A$ of large bodies, and that linearity has made it one of the most used formulas in physics.

::: example A falling mist droplet {#ex-droplet}
A water droplet of radius $10.0\,\mu\mathrm m$ falls through still air ($\eta = 1.81\times10^{-5}\,\mathrm{Pa\,s}$, $\rho_a = 1.20\,\mathrm{kg/m^3}$). Find its terminal velocity and check that Stokes' law applies.
::: solution
At terminal velocity the weight minus the buoyancy balances the drag:

$$
\tfrac43\pi a^3(\rho_w - \rho_a)g = 6\pi\eta av_t, \qquad v_t = \frac{2(\rho_w - \rho_a)ga^2}{9\eta} .
$$ {#eq-terminal}

Substituting,

$$
v_t = \frac{2\times998.8\times9.80\times(1.00\times10^{-5})^2}{9\times1.81\times10^{-5}} = 1.20\times10^{-2}\,\mathrm{m/s},
$$

about $1.2\,\mathrm{cm/s}$. The Reynolds number based on diameter is $\rho_av_t\,2a/\eta = 1.20\times0.0120\times2.00\times10^{-5}/1.81\times10^{-5} = 0.016$, so Stokes' law is an excellent approximation. Because $v_t \propto a^2$, a droplet of $1\,\mu\mathrm m$ falls at $0.12\,\mathrm{mm/s}$ and is kept aloft indefinitely by the slightest updraught: this is why clouds float. Drizzle drops of $100\,\mu\mathrm m$ would by [[#eq-terminal]] fall at $1.2\,\mathrm{m/s}$, but at that size $\mathrm{Re} \approx 16$ and the true speed is lower, about $0.7\,\mathrm{m/s}$.
:::
:::

::: application Millikan's oil drops
In 1909–13 Robert Millikan measured the charge of the electron by watching oil droplets of radius about $1\,\mu\mathrm m$ in an electric field. He timed each drop falling freely to find its radius from [[#eq-terminal]], then timed it rising under the field to find its charge. For drops this small the mean free path of air, $0.07\,\mu\mathrm m$, is not negligible compared with $a$, and Millikan had to apply the Cunningham slip correction to Stokes' law, a few per cent. A residual error in his value of the air viscosity made his electron charge too small by about $0.6\,\%$, a discrepancy resolved in the 1930s. Sedimentation of particles by [[#eq-terminal]], and its diffusive counterpart through Einstein's relation $D = k_BT/6\pi\eta a$, also underlie Perrin's measurement of Avogadro's number and the ultracentrifuge.
:::

## Boundary layers {#boundary-layers}

At high Reynolds number, the viscous term in [[#eq-ns-dimensionless]] carries the small factor $1/\mathrm{Re}$, and it is tempting to drop it and return to Euler's equation. But dropping the highest derivative lowers the order of the equation, and the no-slip condition can no longer be satisfied. Ludwig Prandtl's insight of 1904 was that viscosity remains important in a thin layer next to the wall, across which the velocity rises from zero to the value given by the ideal theory. In that layer, the derivatives across it are large enough to make $\nu\nabla^2\mathbf v$ as big as the inertial terms.

### How thick is it?

First, how far does viscosity spread momentum in a time $t$? Start a flat plate suddenly into motion at speed $U$ along itself, in fluid at rest (**Stokes' first problem**). The flow is $u(y, t)\,\mathbf e_x$, and [[#eq-ns]] becomes the diffusion equation $\partial_tu = \nu\,\partial_y^2u$ with $u(0, t) = U$. Its solution is

$$
u(y, t) = U\operatorname{erfc}\Bigl(\frac{y}{2\sqrt{\nu t}}\Bigr),
$$

which depends on $y$ only through $y/\sqrt{\nu t}$. The moving layer thickens as $\sqrt{\nu t}$: a millimetre after one second in water, four millimetres in air.

::: widget plot
f: 1 - erf(x/(2*sqrt(t)))
x: 0, 10
y: 0, 1.05
sliders: t=1:0.1:20:0.1
caption: The velocity $u/U$ above a plate started impulsively at $t = 0$, against height $y$ in units where $\nu = 1$, for the time $t$ on the slider. Increase $t$ from $1$ to $4$: the profile keeps its shape but stretches by a factor of $2$, because the thickness grows as $\sqrt{\nu t}$. At $t = 1$ the fluid moves at a tenth of the plate's speed about $2.3$ units up; at $t = 16$ that point is at $9.3$, four times higher. Diffusion of momentum is slow over large distances: a layer ten times thicker takes a hundred times longer to form.
:::

Now return to a steady stream $U$ along a flat plate whose leading edge is at $x = 0$. A fluid particle at distance $x$ from the edge has been near the plate for a time of order $x/U$, so viscosity has spread the plate's influence a distance of order $\sqrt{\nu x/U}$. That is the boundary-layer thickness:

$$
\delta(x) \sim \sqrt{\frac{\nu x}{U}}, \qquad \frac{\delta}{x} \sim \frac{1}{\sqrt{\mathrm{Re}_x}}, \qquad \mathrm{Re}_x = \frac{Ux}{\nu} .
$$ {#eq-bl}

The same follows by balancing terms: inertia $u\,\partial_xu \sim U^2/x$ against viscosity $\nu\,\partial_y^2u \sim \nu U/\delta^2$. Heinrich Blasius, Prandtl's student, solved the resulting boundary-layer equations exactly in 1908 by a similarity transformation. The velocity reaches $99\,\%$ of $U$ at

$$
\delta_{99} \approx 4.9\sqrt{\frac{\nu x}{U}},
$$

and the wall shear stress is $\tau_w = 0.332\,\rho U^2/\sqrt{\mathrm{Re}_x}$. The laminar layer remains stable up to $\mathrm{Re}_x$ of a few hundred thousand on a smooth plate; beyond that it becomes turbulent and thickens faster.

::: example The boundary layer on a plate in a wind {#ex-plate}
Air at $10.0\,\mathrm{m/s}$ ($\nu = 1.50\times10^{-5}\,\mathrm{m^2/s}$, $\rho = 1.20\,\mathrm{kg/m^3}$) flows along a smooth flat plate $0.500\,\mathrm m$ long. Find the Reynolds number and the boundary-layer thickness at the trailing edge, and the friction drag per metre of width on one side.
::: solution
At the trailing edge $\mathrm{Re}_x = 10.0\times0.500/1.50\times10^{-5} = 3.33\times10^{5}$, so the layer is still laminar, if only just. Its thickness is

$$
\delta_{99} = 4.9\sqrt{\frac{1.50\times10^{-5}\times0.500}{10.0}} = 4.9\times8.66\times10^{-4} = 4.2\,\mathrm{mm},
$$

less than one per cent of the plate length: $\delta/x = 4.9/\sqrt{\mathrm{Re}_x} = 0.0085$. Integrating Blasius's wall stress $0.332\rho U^2(\nu/Ux)^{1/2}$ from $0$ to $L$ gives the drag per unit width $0.664\,\rho U^2L/\sqrt{\mathrm{Re}_L}$:

$$
D = \frac{0.664\times1.20\times100\times0.500}{\sqrt{3.33\times10^5}} = \frac{39.8}{577} = 0.0690\,\mathrm{N/m}.
$$

A tiny force — the friction drag of a thin plate is small. The drag of a bluff body comes mostly from separation, not from friction.
:::
:::

::: quiz
The wind over the plate of [[#ex-plate]] doubles to $20\,\mathrm{m/s}$. What happens to the laminar boundary-layer thickness at the trailing edge and to the friction drag?
- [ ] Thickness halves, drag doubles.
- [x] Thickness falls by a factor $\sqrt2$, drag rises by a factor $2\sqrt2$.
- [ ] Thickness is unchanged, drag quadruples.
- [ ] Thickness doubles, drag is unchanged.
::: solution
By [[#eq-bl]], $\delta \propto U^{-1/2}$, so it falls to $4.2/\sqrt2 = 3.0\,\mathrm{mm}$. The drag per unit width is $0.664\,\rho U^2L/\sqrt{\mathrm{Re}_L} \propto U^{3/2}$, so it rises by $2^{3/2} = 2.83$. The wall stress is roughly $\eta U/\delta \propto U^{3/2}$: the velocity jump $U$ doubles and the layer it occurs across gets thinner. Laminar friction therefore grows more slowly than the $U^2$ of pressure drag. (At $20\,\mathrm{m/s}$ the trailing-edge Reynolds number is $6.7\times10^5$, so in practice the rear of the layer may already be turbulent.)
:::
:::

### Separation and the resolution of d'Alembert's paradox

Outside the boundary layer, the pressure is that of the ideal flow, and it is transmitted unchanged across the thin layer (the $y$-momentum equation gives $\partial p/\partial y \approx 0$). On the front of a cylinder the ideal pressure falls in the direction of flow — a **favourable** gradient — and the layer stays thin and attached. Past the shoulder the pressure rises towards the rear stagnation point. The slow fluid near the wall, which has lost momentum to friction, is decelerated by this **adverse** gradient until it stops and reverses, as in the Couette–Poiseuille figure above with $P$ negative. The boundary layer then leaves the surface — it **separates** — and carries its vorticity into a broad wake. The pressure in the wake stays low, near its value at separation, so the front of the body is pushed harder than the back. That is pressure drag, and it is why a cylinder at $\mathrm{Re} = 10^4$ has $C_D \approx 1.2$, not zero.

Streamlining works by keeping the pressure rise on the rear gentle so that the layer stays attached: a well-shaped strut has a tenth of the drag of a cylinder of the same thickness. Turbulence in the boundary layer mixes fast fluid towards the wall and helps it resist separation, which is why a cylinder or sphere shows a sudden **drag crisis** — the drag coefficient falls by a factor of three to five — near $\mathrm{Re} \approx 3\times10^5$, and why golf balls are dimpled. The engineering of drag is treated in the Mechanical Engineering Atlas lesson [Boundary layers and drag](/learn/mechanical/lesson.php?c=fluid-mechanics&l=boundary-layers-drag).

## Turbulence, qualitatively {#turbulence}

Above a critical Reynolds number, steady laminar flows become unstable to small disturbances, and the flow becomes **turbulent**: irregular in space and time, with eddies of many sizes, and vastly more effective than molecular viscosity at mixing heat, mass and momentum. No general theory derives turbulence from [[#eq-ns]], and the existence and smoothness of its solutions in three dimensions is one of the Clay Millennium Problems. But one statistical result is famous and well confirmed.

In fully developed turbulence, energy is injected at the large scale $L$ of the flow — by a stirring spoon, a wind over hills — at a rate $\varepsilon$ per unit mass. Large eddies are unstable and break into smaller ones, which break into smaller ones still: an **energy cascade**, driven by vortex stretching in [[#eq-vorticity]]. Viscosity is negligible until the eddies are small enough for their own Reynolds number to be about $1$. Andrey Kolmogorov argued in 1941 that at scales between these two extremes, the statistics depend only on $\varepsilon$ and the wavenumber $k$. Dimensional analysis then fixes the energy spectrum (energy per unit mass per unit wavenumber, units $\mathrm{m^3/s^2}$):

$$
E(k) = C\,\varepsilon^{2/3}k^{-5/3},
$$ {#eq-kolmogorov}

with a universal constant $C \approx 1.5$ measured in experiments. The cascade ends at the **Kolmogorov scale**

$$
\eta_K = \Bigl(\frac{\nu^3}{\varepsilon}\Bigr)^{1/4},
$$

the only length that can be made from $\nu$ and $\varepsilon$. The ratio $L/\eta_K$ grows as $\mathrm{Re}^{3/4}$, so a direct numerical simulation of a turbulent flow needs about $\mathrm{Re}^{9/4}$ grid points — around $10^{16}$ for a car — which is why engineering computation models turbulence rather than resolving it ([[computation]]). The $-5/3$ law has been verified over several decades of wavenumber in tidal channels, the atmosphere and wind tunnels. Lewis Fry Richardson had described the cascade qualitatively in 1922.

::: example The smallest eddies {#ex-kolmogorov}
In the lower atmosphere on a windy day, turbulent dissipation is about $\varepsilon = 1\times10^{-3}\,\mathrm{W/kg}$. In a kitchen blender full of water it is about $10\,\mathrm{W/kg}$. Find the Kolmogorov scale in each.
::: solution
For air, $\nu = 1.5\times10^{-5}\,\mathrm{m^2/s}$, so $\nu^3 = 3.4\times10^{-15}$ and

$$
\eta_K = \Bigl(\frac{3.4\times10^{-15}}{1\times10^{-3}}\Bigr)^{1/4} = (3.4\times10^{-12})^{1/4} = 1.4\,\mathrm{mm}.
$$

For water, $\nu = 1.0\times10^{-6}$, $\nu^3 = 10^{-18}$, and $\eta_K = (10^{-19})^{1/4} = 1.8\times10^{-5}\,\mathrm m = 18\,\mu\mathrm m$. Atmospheric eddies range from kilometres down to millimetres; in the blender, from centimetres down to the size of a biological cell, which is why vigorous stirring can damage cell cultures.
:::
:::

::: history Navier, Stokes, Reynolds and Prandtl
Isaac Newton stated the linear law of fluid friction in Book II of the *Principia* (1687). Claude-Louis Navier derived the equation of viscous flow in 1822 from a model of molecular forces. Siméon Denis Poisson (1829) and Adhémar Barré de Saint-Venant (1843) gave other derivations, and George Gabriel Stokes, in 1845, gave the continuum derivation used here, from the assumption of a linear isotropic relation between stress and rate of strain; in 1851 he solved the slow flow past a sphere. Gotthilf Hagen (1839) and Jean Poiseuille (1840–46) measured laminar pipe flow. Osborne Reynolds's dye experiments of 1883 showed the transition to turbulence and the role of the dimensionless number; in 1895 he introduced the averaging of turbulent flows. Ludwig Prandtl presented the boundary layer at the Heidelberg International Congress of Mathematicians in 1904, in a paper of eight pages, and his student Heinrich Blasius solved the flat-plate layer in 1908. Andrey Kolmogorov published his theory of the inertial range in 1941.
:::

## Where this leads {#leads}

The Navier–Stokes equation with heat conduction added governs convection, and with the Coriolis force, the atmosphere and the oceans. Viscous damping of sound and water waves, the attenuation that sets how far a sound carries, follows from the same viscosity in [[continuum/waves-in-fluids]]. Kinetic theory derives $\eta$ from molecular collisions ([[thermodynamics/kinetic-theory]], [[statistical-mechanics]]), and numerical solution of [[#eq-ns]] is a major branch of [[computation]]; the engineering practice of computational fluid dynamics is the subject of a whole course in the Mechanical Engineering Atlas.

::: summary
- A Newtonian fluid has viscous stress $2\eta(e_{ij} - \frac13e_{kk}\delta_{ij}) + \zeta e_{kk}\delta_{ij}$, linear in the rate of strain; $\nu = \eta/\rho$ is the momentum diffusivity, and air's $\nu$ is fifteen times water's.
- Cauchy's equation then gives the Navier–Stokes equation $\partial_t\mathbf v + (\mathbf v\cdot\nabla)\mathbf v = -\nabla p/\rho + \nu\nabla^2\mathbf v + \mathbf g$, with no slip at walls.
- Couette flow is linear, Poiseuille flow parabolic; in a pipe $Q = \pi R^4\Delta p/8\eta L$, laminar only for $\mathrm{Re} \lesssim 2000$.
- Flows with the same Reynolds number $UL/\nu$ are similar; forces scale as $\rho U^2L^2f(\mathrm{Re})$.
- At $\mathrm{Re} \ll 1$ a sphere has drag $6\pi\eta aU$ and falls at $v_t = 2\Delta\rho\,ga^2/9\eta$.
- At $\mathrm{Re} \gg 1$ viscosity acts in boundary layers of thickness $\delta \approx 4.9\sqrt{\nu x/U}$ (Blasius); their separation in adverse pressure gradients causes pressure drag and resolves d'Alembert's paradox.
- Turbulence carries energy from large to small eddies, with Kolmogorov spectrum $E(k) \propto \varepsilon^{2/3}k^{-5/3}$ down to $\eta_K = (\nu^3/\varepsilon)^{1/4}$.
:::

## Exercises

::: exercise Shear stress in a bearing {level=1 check="300"}
A shaft turns inside a sleeve bearing. The oil film is $1.00\,\mathrm{mm}$ thick, its viscosity is $0.300\,\mathrm{Pa\,s}$, and the shaft surface moves at $1.00\,\mathrm{m/s}$. Treating the film as plane Couette flow, find the shear stress on the shaft in Pa.
::: solution
By [[#eq-couette]] with $G = 0$, the profile is linear and $\tau = \eta U/h = 0.300\times1.00/1.00\times10^{-3} = 300\,\mathrm{Pa}$. On a shaft of radius $25\,\mathrm{mm}$ and length $50\,\mathrm{mm}$ the friction torque is $\tau\times2\pi rl\times r = 300\times2\pi\times0.025\times0.050\times0.025 = 0.059\,\mathrm{N\,m}$.
:::
:::

::: exercise Reynolds number in a pipe {level=1 check="1e4"}
Water ($\nu = 1.00\times10^{-6}\,\mathrm{m^2/s}$) flows at a mean speed of $0.500\,\mathrm{m/s}$ in a pipe of diameter $2.00\,\mathrm{cm}$. Find the Reynolds number based on diameter. Is the flow laminar?
::: solution
$\mathrm{Re} = \bar uD/\nu = 0.500\times0.0200/1.00\times10^{-6} = 1.00\times10^{4}$. This is well above $2000$: the flow in a domestic water pipe is turbulent, and [[#eq-poiseuille]] does not apply.
:::
:::

::: exercise A bead in glycerol {level=1 check="2*1240*9.8*1e-6/(9*1.41)"}
A glass bead of radius $1.00\,\mathrm{mm}$ and density $2500\,\mathrm{kg/m^3}$ falls through glycerol ($\rho = 1260\,\mathrm{kg/m^3}$, $\eta = 1.41\,\mathrm{Pa\,s}$). Find its terminal velocity in m/s and check the Reynolds number.
::: solution
By [[#eq-terminal]], $v_t = 2\times(2500 - 1260)\times9.80\times(1.00\times10^{-3})^2/(9\times1.41) = 0.02430/12.69 = 1.92\times10^{-3}\,\mathrm{m/s}$, about $2\,\mathrm{mm/s}$. The Reynolds number based on diameter is $1260\times1.92\times10^{-3}\times2.00\times10^{-3}/1.41 = 3.4\times10^{-3}$, so Stokes' law holds. A falling-ball viscometer runs this calculation backwards to measure $\eta$; walls of the container must be at least ten radii away, or they add drag.
:::
:::

::: exercise A narrowed artery {level=2 check="0.8^4"}
An artery's radius is reduced by $20\,\%$ along part of its length. At a fixed pressure drop across that segment, by what factor is the Poiseuille flow rate through it multiplied? By what factor must the pressure drop rise to restore the original flow?
::: solution
By [[#eq-poiseuille]], $Q \propto R^4$ at fixed $\Delta p$, so the factor is $0.8^4 = 0.410$: a $20\,\%$ narrowing cuts the flow by $59\,\%$. To restore it, $\Delta p$ must rise by $1/0.410 = 2.44$. Blood is not exactly Newtonian and arteries are elastic and pulsatile, but the strong $R^4$ dependence survives and is why the body regulates flow through small arterioles.
:::
:::

::: exercise A boundary layer in water {level=2 check="4.9*sqrt(1e-6*0.2/1)*1000"}
Water ($\nu = 1.00\times10^{-6}\,\mathrm{m^2/s}$) flows at $1.00\,\mathrm{m/s}$ past a thin plate $20.0\,\mathrm{cm}$ long. Find the thickness $\delta_{99}$ at the trailing edge in millimetres, and the Reynolds number there.
::: solution
$\mathrm{Re}_x = 1.00\times0.200/10^{-6} = 2.00\times10^{5}$, laminar. Then $\delta_{99} = 4.9\sqrt{10^{-6}\times0.200/1.00} = 4.9\times4.47\times10^{-4} = 2.19\times10^{-3}\,\mathrm m = 2.2\,\mathrm{mm}$. Compare [[#ex-plate]]: the water layer is half as thick even though the plate is shorter and the flow slower, because water's kinematic viscosity is fifteen times smaller.
:::
:::

::: exercise Kolmogorov scale in the ocean {level=2 check="(1e-18/1e-8)^(1/4)*1000"}
In the deep ocean, turbulent dissipation rates are typically $\varepsilon = 1\times10^{-8}\,\mathrm{W/kg}$. With $\nu = 1.0\times10^{-6}\,\mathrm{m^2/s}$, find the Kolmogorov scale in millimetres.
::: solution
$\eta_K = (\nu^3/\varepsilon)^{1/4} = (10^{-18}/10^{-8})^{1/4} = (10^{-10})^{1/4} = 10^{-2.5}\,\mathrm m = 3.2\,\mathrm{mm}$. Oceanographers measure $\varepsilon$ by dropping probes that resolve velocity shear at this scale and computing the dissipation $\approx 7.5\,\nu\langle(\partial u/\partial z)^2\rangle$ for isotropic turbulence.
:::
:::

::: exercise Testing a model in a water tunnel {level=2 check="25*5/15"}
A car $4.5\,\mathrm m$ long travels at $25.0\,\mathrm{m/s}$ in air ($\nu_a = 1.5\times10^{-5}\,\mathrm{m^2/s}$). A 1:5 scale model is tested in water ($\nu_w = 1.0\times10^{-6}\,\mathrm{m^2/s}$, $\rho_w = 1000$, $\rho_a = 1.2\,\mathrm{kg/m^3}$). (a) Find the water speed in m/s for dynamical similarity. (b) If the model's drag is measured as $F_m$, what is the full-size drag?
::: solution
(a) Equal Reynolds numbers: $U_m = U_p\,(L_p/L_m)(\nu_w/\nu_a) = 25.0\times5\times(1/15) = 8.33\,\mathrm{m/s}$.

(b) By [[#thm-similarity]], $F/\rho U^2L^2$ is the same for both, so

$$
\frac{F_p}{F_m} = \frac{\rho_aU_p^2L_p^2}{\rho_wU_m^2L_m^2} = \frac{1.2}{1000}\times\Bigl(\frac{25.0}{8.33}\Bigr)^2\times25 = 1.2\times10^{-3}\times9.0\times25 = 0.27 .
$$

The full-size car feels about a quarter of the model's drag in water. The test must avoid cavitation and free-surface effects, which are outside the similarity argument.
:::
:::

::: exercise Couette flow between cylinders {level=3}
Fluid fills the gap between a cylinder of radius $R_1$ rotating at angular velocity $\Omega$ and a fixed concentric cylinder of radius $R_2 > R_1$. (a) Show that $v_\theta = Ar + B/r$ satisfies the azimuthal component of [[#eq-ns]], $\nabla^2v_\theta - v_\theta/r^2 = 0$, and find $A$ and $B$ from no slip. (b) The shear stress is $\sigma_{r\theta} = \eta\,r\,\dd(v_\theta/r)/\dd r$. Show that the torque per unit length transmitted across any cylinder $r$ in the gap is the same, $4\pi\eta\abs B$, and explain why it must be.
::: solution
(a) For $v_\theta(r)$ the azimuthal equation in steady flow reduces to $\frac{\dd}{\dd r}\bigl(\frac1r\frac{\dd}{\dd r}(rv_\theta)\bigr) = 0$, equivalent to the stated form. For $v_\theta = Ar$: $rv_\theta = Ar^2$, $\frac1r(rv_\theta)' = 2A$, derivative $0$. For $v_\theta = B/r$: $rv_\theta = B$, derivative $0$. So both, and their sum, are solutions. No slip: $AR_1 + B/R_1 = \Omega R_1$ and $AR_2 + B/R_2 = 0$. So $B = -AR_2^2$ and $A(R_1^2 - R_2^2) = \Omega R_1^2$, giving

$$
A = -\frac{\Omega R_1^2}{R_2^2 - R_1^2}, \qquad B = \frac{\Omega R_1^2R_2^2}{R_2^2 - R_1^2} .
$$

(b) $v_\theta/r = A + B/r^2$, so $\sigma_{r\theta} = \eta r(-2B/r^3) = -2\eta B/r^2$. The rigid-rotation part $Ar$ carries no stress, as a Newtonian fluid must. The torque per unit length on the fluid inside radius $r$ is $\sigma_{r\theta}\times2\pi r\times r = -4\pi\eta B$, independent of $r$. It must be: in steady flow the angular momentum of the fluid between two radii does not change, so the torques on its inner and outer surfaces must cancel. Measuring this torque at a known $\Omega$ is how a Couette viscometer determines $\eta$; at high $\Omega$ the flow becomes unstable to the Taylor vortices discovered by G. I. Taylor in 1923.
:::
:::

::: exercise Wall stress by a force balance {level=3}
Without solving any differential equation, prove that in any steady fully developed flow through a straight pipe of radius $R$ — laminar or turbulent — the mean wall shear stress is $\tau_w = R\,\Delta p/2L$. Then show that for laminar flow this gives the Darcy friction factor $f \equiv 8\tau_w/\rho\bar u^2 = 64/\mathrm{Re}$, with $\mathrm{Re} = 2R\bar u/\nu$.
::: solution
Take as control volume the fluid in a length $L$ of pipe. The flow is fully developed, so the momentum flux entering one end equals that leaving the other, and the flow is steady, so the momentum inside is constant. The net axial force on the fluid must therefore vanish. The pressure force is $\Delta p\,\pi R^2$ and the wall friction is $\tau_w\times2\pi RL$ in the opposite direction, so $\tau_w = R\Delta p/2L$. Nothing about the velocity profile was used; this is why the pressure drop in turbulent flow is a measure of the wall stress.

For laminar flow, [[#thm-poiseuille]] gives $\bar u = \Delta pR^2/8\eta L$, so $\Delta p/L = 8\eta\bar u/R^2$ and $\tau_w = 4\eta\bar u/R$. Then

$$
f = \frac{8\tau_w}{\rho\bar u^2} = \frac{32\eta}{\rho\bar uR} = \frac{64\eta}{\rho\bar u\,2R} = \frac{64}{\mathrm{Re}} .
$$

This is the laminar line of the Moody chart. In turbulent flow $f$ falls much more slowly with $\mathrm{Re}$ (roughly as $\mathrm{Re}^{-1/4}$ in smooth pipes, Blasius's empirical law of 1913), so at $\mathrm{Re} = 10^5$ the turbulent friction is about ten times the laminar value.
:::
:::
