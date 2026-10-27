Air and water have small viscosities. In the flow round a car at motorway speed, the viscous stresses are some ten thousand times smaller than the pressure differences that the motion produces. It is tempting to drop viscosity altogether and study an **ideal fluid**, one whose stress is a pure pressure. That model, worked out by Euler in the 1750s, is one of the great successes of mathematical physics. It explains why a pitot tube measures airspeed, why a spinning ball swerves, why a wing lifts and how much, why a whirlpool speeds up as it narrows, and why a smoke ring persists.

It also predicts, as d'Alembert discovered in 1752 to his dismay, that a body moving steadily through an ideal fluid feels no drag at all. A submarine would need no engine once moving. The paradox is not a mistake in the algebra; it is a correct theorem about a model that leaves out something essential near the surface of the body. Seeing exactly what the ideal theory gets right, and exactly where it fails, is the aim of this chapter. The cure, Prandtl's boundary layer, belongs to [[continuum/viscous-flow]].

We use the kinematics of [[continuum/fluid-kinematics]] — material derivative, continuity, vorticity $\boldsymbol\omega = \nabla\times\mathbf v$, circulation $\Gamma$ — and Cauchy's equation of motion $\rho\,D\mathbf v/Dt = \nabla\cdot\boldsymbol\sigma + \mathbf f$ from [[continuum/stress-strain]]. Complex variables, used in the section on potential flow, are reviewed in [[math-methods/complex-methods]].

## Euler's equation {#euler}

::: definition Ideal fluid {#def-ideal}
A fluid is **ideal** (or inviscid) if the stress tensor is isotropic at every point, even in motion: $\sigma_{ij} = -p\,\delta_{ij}$. The scalar $p(\mathbf x, t)$ is the **pressure**. At a solid boundary moving with velocity $\mathbf U$ the fluid cannot pass through the wall, $\mathbf v\cdot\mathbf n = \mathbf U\cdot\mathbf n$, but it may slip along it.
:::

The boundary condition is weaker than for a real fluid, which sticks to walls. That loss of one condition is the mathematical root of d'Alembert's paradox.

::: theorem Euler's equation {#thm-euler}
In an ideal fluid with body force density $\rho\mathbf g$,

$$
\rho\Bigl(\pdv{\mathbf v}{t} + (\mathbf v\cdot\nabla)\mathbf v\Bigr) = -\nabla p + \rho\mathbf g .
$$ {#eq-euler}

Together with the continuity equation $\partial_t\rho + \nabla\cdot(\rho\mathbf v) = 0$ and a relation between $p$ and $\rho$ — for instance $\rho = \text{const}$ — it determines the flow.
:::

::: proof
With $\sigma_{ij} = -p\,\delta_{ij}$, $\partial_j\sigma_{ij} = -\partial_ip$. Substitute in Cauchy's equation and write the acceleration as the material derivative of [[continuum/fluid-kinematics]].
:::

Each term is a force per unit volume. A pressure gradient pushes fluid from high to low pressure, gravity pulls it down, and their resultant is what accelerates it. With $\mathbf v = 0$, [[#eq-euler]] is the hydrostatic law $\nabla p = \rho\mathbf g$ of [[mechanics/fluids]]. For an incompressible fluid there are four unknowns ($p$ and three velocity components) and four equations (three components of [[#eq-euler]] and $\nabla\cdot\mathbf v = 0$). The pressure is then not given by any equation of state; it takes whatever value is needed to keep the flow divergence-free.

::: example The pressure gradient in a nozzle {#ex-nozzle-p}
In the nozzle of the previous chapter, water has acceleration $80.0\,\mathrm{m/s^2}$ along the axis at the exit. What pressure gradient produces it? Neglect gravity along the horizontal axis.
::: solution
The axial component of [[#eq-euler]] is $\rho a_x = -\partial p/\partial x$. So

$$
\pdv{p}{x} = -\rho a_x = -1000\times80.0 = -8.00\times10^{4}\,\mathrm{Pa/m},
$$

a drop of $0.8\,\mathrm{bar}$ per metre, or $8\,\mathrm{kPa}$ over the last ten centimetres. The pressure falls in the direction of flow, and the fluid accelerates towards the low pressure. A steady flow speeds up only where the pressure falls along it.
:::
:::

::: example The rotating bucket {#ex-bucket}
A cylindrical bucket of water spins about its vertical axis at angular velocity $\Omega$ until the water rotates rigidly with it. Find the pressure in the water and the shape of the free surface. How much higher is the surface at $r = 10.0\,\mathrm{cm}$ than on the axis, for $\Omega = 10.0\,\mathrm{rad/s}$?
::: solution
In rigid rotation $\mathbf v = \Omega r\,\hat{\boldsymbol\theta}$, steady, and each particle moves in a circle, so its acceleration is centripetal: $\mathbf a = -\Omega^2r\,\hat{\mathbf r}$. With $\mathbf g = -g\hat{\mathbf z}$, the components of [[#eq-euler]] are

$$
-\rho\Omega^2r = -\pdv{p}{r}, \qquad 0 = -\pdv{p}{z} - \rho g .
$$

Integrating, $p = p_0 + \frac12\rho\Omega^2r^2 - \rho gz$, where $p_0$ is the pressure on the axis at $z = 0$. The free surface is where $p$ equals atmospheric pressure; choose $z = 0$ at its lowest point, so $p_0 = p_{\mathrm{atm}}$, and the surface is the paraboloid

$$
z = \frac{\Omega^2r^2}{2g}.
$$

At $r = 0.100\,\mathrm m$ and $\Omega = 10.0\,\mathrm{rad/s}$, $z = 100\times0.0100/19.6 = 5.10\,\mathrm{cm}$. Newton used the curved surface of a spinning bucket as evidence that rotation is absolute; for us it is a check that [[#eq-euler]] needs the full acceleration, not $\partial\mathbf v/\partial t$, which is zero here.
:::
:::

### The Lamb form

The convective acceleration can be rewritten using the identity $\mathbf v\times(\nabla\times\mathbf v) = \nabla(\frac12\abs{\mathbf v}^2) - (\mathbf v\cdot\nabla)\mathbf v$, so that

$$
(\mathbf v\cdot\nabla)\mathbf v = \nabla\bigl(\tfrac12v^2\bigr) - \mathbf v\times\boldsymbol\omega .
$$

Suppose the body force is conservative, $\mathbf g = -\nabla\Phi$ (for uniform gravity $\Phi = gz$), and the fluid is **barotropic**: the density is a function of the pressure alone. Then $\nabla p/\rho = \nabla h$ with $h(p) = \int\dd p/\rho(p)$, which is $p/\rho$ for an incompressible fluid and the specific enthalpy for an isentropic gas. Euler's equation becomes

$$
\pdv{\mathbf v}{t} - \mathbf v\times\boldsymbol\omega = -\nabla\Bigl(\tfrac12v^2 + h + \Phi\Bigr).
$$ {#eq-lamb}

This form makes the two great theorems of ideal flow almost immediate.

## Bernoulli's theorem {#bernoulli}

::: theorem Bernoulli's theorem {#thm-bernoulli}
In an ideal barotropic fluid with conservative body force:

1. If the flow is **steady**, the **Bernoulli function** $H = \frac12v^2 + h + \Phi$ is constant along each streamline (and along each vortex line). For an incompressible fluid in uniform gravity,

$$
\tfrac12\rho v^2 + p + \rho gz = \text{const along a streamline}.
$$ {#eq-bernoulli}

2. If the flow is **irrotational**, $\mathbf v = \nabla\phi$, then, steady or not,

$$
\pdv{\phi}{t} + \tfrac12v^2 + h + \Phi = C(t)
$$ {#eq-bernoulli-unsteady}

throughout the fluid, with $C$ depending on time only. In steady irrotational flow $H$ is the same constant everywhere.
:::

::: proof
(1) With $\partial_t\mathbf v = 0$, [[#eq-lamb]] says $\nabla H = \mathbf v\times\boldsymbol\omega$. The right side is perpendicular to $\mathbf v$ and to $\boldsymbol\omega$. Hence $\mathbf v\cdot\nabla H = 0$, so $H$ does not change along a streamline, and likewise $\boldsymbol\omega\cdot\nabla H = 0$ along a vortex line.

(2) If $\boldsymbol\omega = 0$ and $\mathbf v = \nabla\phi$, then $\partial_t\mathbf v = \nabla(\partial_t\phi)$, and [[#eq-lamb]] reads $\nabla\bigl(\partial_t\phi + \frac12v^2 + h + \Phi\bigr) = 0$. A function whose gradient vanishes in a connected region depends on time only.
:::

Every hypothesis matters. Bernoulli's equation is an energy statement — kinetic energy plus the work done by pressure plus potential energy is conserved by a fluid particle — and it fails wherever energy is dissipated: in a boundary layer, behind a sudden expansion, in a hydraulic jump. In the rotating bucket, the flow is steady and ideal but rotational, with $\omega = 2\Omega$, and $H$ differs between streamlines: on the free surface $H = \frac12\Omega^2r^2 + gz + p_{\mathrm{atm}}/\rho = \Omega^2r^2 + p_{\mathrm{atm}}/\rho$, which grows with $r$.

::: warning Bernoulli across streamlines
Equation [[#eq-bernoulli]] relates two points on the *same* streamline. Applying it between points on different streamlines is justified only if the flow is irrotational, or if all streamlines come from a region of uniform $H$, such as a uniform stream far upstream. A second error is to apply it through a pump, a turbine or a fan, which add or remove energy, or across a region of separated, turbulent flow. A third is to use it for a gas at high speed with $\rho$ constant; for $\mathrm{Ma} > 0.3$ the compressible form, with $h$ the enthalpy, is needed.
:::

::: example A pitot-static tube {#ex-pitot}
A pitot-static tube on a light aircraft has a forward-facing hole, where the air is brought to rest, and side holes, where the air passes at the flight speed. The pressure difference is $2.00\,\mathrm{kPa}$ and the air density at altitude is $1.00\,\mathrm{kg/m^3}$. Find the airspeed, and estimate the error from treating the air as incompressible.
::: solution
The streamline that ends on the forward hole comes from far ahead, where the speed is $v$ and the pressure $p_\infty$; at the hole the speed is zero and the pressure is the **stagnation pressure** $p_0$. Height differences are negligible. By [[#eq-bernoulli]], $p_0 = p_\infty + \frac12\rho v^2$, and the side holes read $p_\infty$ because the flow past them is nearly undisturbed. So

$$
v = \sqrt{\frac{2(p_0 - p_\infty)}{\rho}} = \sqrt{\frac{2\times2000}{1.00}} = 63.2\,\mathrm{m/s},
$$

about $123$ knots. For compressibility: decelerating the air raises its density by $\Delta\rho = \Delta p/c^2$ to first order, where $c^2 = \dd p/\dd\rho$ is the square of the sound speed (see [[continuum/waves-in-fluids]]). Then

$$
\frac{\Delta\rho}{\rho} = \frac{\frac12\rho v^2}{\rho c^2} = \frac12\mathrm{Ma}^2 .
$$

With $c \approx 330\,\mathrm{m/s}$ at altitude, $\mathrm{Ma} = 0.19$ and $\Delta\rho/\rho \approx 0.018$. The compressible correction to the speed is of order $\frac18\mathrm{Ma}^2 \approx 0.5\,\%$, negligible here and significant for an airliner. This is the estimate $\Delta\rho/\rho \approx \frac12\mathrm{Ma}^2$ promised in [[continuum/fluid-kinematics]].
:::
:::

::: quiz
Air flows over the curved top of a wing faster than under its flat bottom. A popular explanation says this is because air parcels that separate at the leading edge must meet again at the trailing edge, so the upper parcel must go faster along its longer path. What is wrong with this?
- [ ] Nothing; it is the standard explanation of lift.
- [x] No law requires the parcels to meet; in fact the upper parcel arrives at the trailing edge well before the lower one.
- [ ] Bernoulli's equation does not apply above a wing.
- [ ] The air under the wing moves faster than the air above.
::: solution
There is no "equal transit time" principle. Smoke-pulse photographs in wind tunnels show that air passing above a lifting wing reaches the trailing edge first, by a wide margin. The speed difference is a consequence of the circulation round the wing, fixed by the Kutta condition as explained below. Bernoulli's equation then correctly converts the speed difference into the pressure difference that gives the lift. The faulty explanation also predicts far too little lift, and none at all for a symmetric wing at an angle of attack or a flat sail.
:::
:::

## Kelvin's circulation theorem {#kelvin}

The second consequence of [[#eq-lamb]] concerns vorticity, and it is the deeper of the two.

::: theorem Kelvin's circulation theorem {#thm-kelvin}
In an ideal barotropic fluid with conservative body force, the circulation round any closed material curve $C(t)$, moving with the fluid, is constant in time:

$$
\frac{D\Gamma}{Dt} = \frac{D}{Dt}\oint_{C(t)}\mathbf v\cdot\dd\mathbf l = 0 .
$$
:::

::: proof
Label the points of the curve by a parameter $s \in [0, 1]$ that moves with the fluid, so the curve at time $t$ is $\mathbf x(s, t)$ with $\mathbf x(0, t) = \mathbf x(1, t)$, and $\partial_t\mathbf x(s, t) = \mathbf v$. Then $\Gamma = \int_0^1\mathbf v\cdot\partial_s\mathbf x\,\dd s$, and, differentiating at fixed $s$,

$$
\frac{D\Gamma}{Dt} = \int_0^1\frac{D\mathbf v}{Dt}\cdot\pdv{\mathbf x}{s}\,\dd s + \int_0^1\mathbf v\cdot\pdv{\mathbf v}{s}\,\dd s .
$$

The second integral is $\int_0^1\partial_s(\frac12v^2)\,\dd s = 0$, since the curve is closed. By Euler's equation in the barotropic form, $D\mathbf v/Dt = -\nabla(h + \Phi)$, so the first integral is $-\int_0^1\partial_s(h + \Phi)\,\dd s = 0$ for the same reason. Hence $D\Gamma/Dt = 0$.
:::

Each hypothesis has a physical meaning. Viscosity diffuses vorticity and violates the theorem; a non-barotropic fluid, in which density depends on temperature as well as pressure, generates vorticity where surfaces of constant pressure and constant density cross — this is how sea breezes start — and a non-conservative force such as the Coriolis force in a non-inertial frame changes the circulation too.

::: corollary Persistence of irrotational flow {#cor-irrotational}
Under the hypotheses of [[#thm-kelvin]], a flow that is irrotational at one instant remains irrotational. In particular, any flow of an ideal fluid that starts from rest, or comes from a uniform stream, is irrotational for all time.
:::

::: proof
If $\boldsymbol\omega = 0$ everywhere at $t = 0$, the circulation round every closed material curve is zero then, by Stokes' theorem, and remains zero by [[#thm-kelvin]]. If $\boldsymbol\omega \neq 0$ at some later point, choose a small material circle there perpendicular to $\boldsymbol\omega$: its circulation is approximately $\abs{\boldsymbol\omega}$ times its area, not zero. This contradiction shows $\boldsymbol\omega$ stays zero.
:::

Helmholtz, in 1858, had found the vortex theorems that Kelvin's result packages. Vortex lines move with the fluid. The circulation round a vortex tube — its **strength** — is the same at every section and does not change in time. So when a vortex tube is stretched, its cross-section shrinks and its vorticity grows in proportion: an ice skater pulling in her arms. This **vortex stretching** concentrates the vorticity of a draining bath into a narrow whirlpool and, in three-dimensional turbulence, drives the cascade of energy to small scales described in [[continuum/viscous-flow]].

::: example Spinning up a tornado {#ex-tornado}
A column of air in a thunderstorm rotates with speed $10.0\,\mathrm{m/s}$ at its edge, radius $1.00\,\mathrm{km}$. Updraughts stretch it vertically and it contracts, conserving its circulation, to a radius of $100\,\mathrm m$. Treating the column as a Rankine core (rigid rotation inside the edge) and neglecting friction, find the final edge speed, and the factor by which the vorticity and the length of the column change if the air is incompressible.
::: solution
Take a material circle round the edge of the column. By [[#thm-kelvin]] its circulation $\Gamma = 2\pi rv$ is constant:

$$
2\pi(1000)(10.0) = 2\pi(100)\,v_{\mathrm{f}}, \qquad v_{\mathrm{f}} = 100\,\mathrm{m/s}.
$$

The core's vorticity is $\omega = \Gamma/\pi r^2$ (circulation divided by area), so it grows by $(1000/100)^2 = 100$, from $2\times10/1000 = 0.0200\,\mathrm{s^{-1}}$ to $2.00\,\mathrm{s^{-1}}$. If the air is incompressible, the volume $\pi r^2\ell$ of the column is constant, so its length grows by the same factor of $100$: vorticity is proportional to stretching, as Helmholtz's theorems require. Real tornadoes reach such speeds, though friction near the ground and the non-barotropic thermodynamics of the storm make the story more complicated; the essential mechanism, concentration of existing vorticity by stretching, is this one.
:::
:::

::: quiz
A smoke ring travels across a still room for several metres without spreading much. According to the ideal theory, why does it persist?
- [ ] Its vorticity is continually regenerated by the pressure gradient.
- [x] Its vortex lines move with the air and its circulation is conserved, so the ring cannot simply dissolve; only viscosity slowly diffuses it.
- [ ] Smoke is heavier than air and holds the ring together.
- [ ] Bernoulli's equation keeps the pressure inside the ring constant.
::: solution
By [[#thm-kelvin]] and Helmholtz's theorems, the vortex lines forming the ring are material lines and the circulation round the core is fixed. In an ideal fluid the ring would last forever; in air, viscosity diffuses the core over a time of order $a^2/\nu$, which for a core of radius $1\,\mathrm{cm}$ is about $7\,\mathrm s$, and turbulent mixing shortens this. Kelvin was so impressed by the permanence of vortex rings that in 1867 he proposed atoms were knotted vortex rings in the ether — a wrong theory that started the mathematical study of knots.
:::
:::

## Potential flow {#potential}

By [[#cor-irrotational]], the flow of an ideal incompressible fluid past a body, started from rest or from a uniform stream, is irrotational. Then $\mathbf v = \nabla\phi$ for a **velocity potential** $\phi$, and incompressibility gives Laplace's equation:

$$
\nabla^2\phi = 0, \qquad \pdv{\phi}{n} = \mathbf U\cdot\mathbf n \text{ on the body}, \qquad \nabla\phi \to \mathbf v_\infty \text{ far away}.
$$ {#eq-laplace}

The problem has become linear. Nonlinearity has not vanished — it is in the pressure, $p = p_\infty + \frac12\rho(v_\infty^2 - v^2)$, which is computed afterwards from Bernoulli's theorem — but the velocity field can be built by superposition.

In two dimensions, an incompressible irrotational flow has both a potential and a stream function, and the pair satisfies the Cauchy–Riemann equations $\partial_x\phi = \partial_y\psi = u$, $\partial_y\phi = -\partial_x\psi = v$. So $w = \phi + i\psi$ is an analytic function of $z = x + iy$, the **complex potential**, and

$$
\deriv{w}{z} = u - iv .
$$

Every analytic function is a flow. The elementary ones are:

| $w(z)$ | flow |
|---|---|
| $Uz$ | uniform stream of speed $U$ along $x$ |
| $\dfrac{m}{2\pi}\ln z$ | source of volume flux $m$ per unit depth at the origin |
| $-\dfrac{i\kappa}{2\pi}\ln z$ | line vortex, anticlockwise circulation $\kappa$ |
| $\dfrac{\mu}{z}$ | doublet: a source and sink merged, strength $\mu$ |

### Flow past a circular cylinder

Add a doublet to a uniform stream:

$$
w(z) = U\Bigl(z + \frac{a^2}{z}\Bigr), \qquad \phi = U\Bigl(r + \frac{a^2}{r}\Bigr)\cos\theta, \qquad \psi = U\Bigl(r - \frac{a^2}{r}\Bigr)\sin\theta .
$$ {#eq-cylinder}

The stream function vanishes on $r = a$, so the circle is a streamline and can be replaced by a solid cylinder: no fluid crosses it. Far away $w \approx Uz$, the uniform stream. Laplace's equation with these boundary conditions has a unique solution up to the circulation, so [[#eq-cylinder]] is *the* irrotational flow past a cylinder without circulation. The velocity components are

$$
v_r = \pdv{\phi}{r} = U\Bigl(1 - \frac{a^2}{r^2}\Bigr)\cos\theta, \qquad v_\theta = \frac1r\pdv{\phi}{\theta} = -U\Bigl(1 + \frac{a^2}{r^2}\Bigr)\sin\theta .
$$

On the surface, $v_r = 0$ and $v_\theta = -2U\sin\theta$. The fluid is at rest at the front and rear stagnation points $\theta = \pi$ and $\theta = 0$, and moves at twice the free-stream speed over the top and bottom. By Bernoulli's theorem, applicable everywhere since the flow is irrotational, the surface pressure is

$$
p(\theta) = p_\infty + \tfrac12\rho U^2\bigl(1 - 4\sin^2\theta\bigr), \qquad C_p \equiv \frac{p - p_\infty}{\frac12\rho U^2} = 1 - 4\sin^2\theta .
$$ {#eq-cp}

::: widget slopefield
f: (-2*x*y/(x^2+y^2)^2)/(1-(x^2-y^2)/(x^2+y^2)^2)
x: -3, 3
y: -2, 2
points: -3, 0.15; -3, 0.5; -3, 1; -3, 1.6; -3, -0.15; -3, -0.5; -3, -1; -3, -1.6
caption: Streamlines of the potential flow [[#eq-cylinder]] past a cylinder of radius $a = 1$, with the stream coming from the left at $U = 1$; ignore the arrows inside the unit circle, which belong to the fictitious flow inside. The seeded streamlines divide and close up again symmetrically. Notice that the pattern is the same in front and behind: this fore–aft symmetry is the whole of d'Alembert's paradox. Notice also how the streamlines crowd over the top and bottom, where the speed reaches $2U$. Click near the front stagnation point $(-1, 0)$ to see how slowly the direction changes there.
:::

## D'Alembert's paradox {#dalembert}

::: theorem D'Alembert's paradox for the cylinder {#thm-dalembert}
In the steady potential flow [[#eq-cylinder]], the net force per unit length on the cylinder is zero: no drag and no lift.
:::

::: proof
The outward normal is $\hat{\mathbf r} = (\cos\theta, \sin\theta)$ and the force on the cylinder per unit length is $-\oint p\,\hat{\mathbf r}\,a\,\dd\theta$. The constant $p_\infty + \frac12\rho U^2$ integrates to zero against $\cos\theta$ and $\sin\theta$. What remains is

$$
D = 2\rho U^2a\int_0^{2\pi}\sin^2\theta\cos\theta\,\dd\theta = 0, \qquad L = 2\rho U^2a\int_0^{2\pi}\sin^3\theta\,\dd\theta = 0 ,
$$

the first because $\sin^2\theta\cos\theta = \frac13\,\dd(\sin^3\theta)/\dd\theta$ integrates to zero over a period, the second because $\sin^3\theta$ is odd about $\theta = \pi$. The pressure is the same at $\theta$ and $\pi - \theta$ (front–back symmetry), which kills the drag, and at $\theta$ and $-\theta$ (top–bottom symmetry), which kills the lift.
:::

The result is general. For *any* body moving at constant velocity through an unbounded ideal incompressible fluid at rest at infinity, in steady irrotational flow, the drag is zero. A proof sketch: the potential of the disturbance decays like a dipole, $\phi \sim r^{-2}$ in three dimensions, so the velocity perturbation decays as $r^{-3}$. Apply momentum conservation to the fluid between the body and a large sphere. The momentum flux and pressure force through the sphere are of order $r^{-3}\times r^2 \to 0$, so the force on the body must vanish. In energy terms: the body's work against a drag would have to go somewhere, but a steady potential flow carries no energy away to infinity and has nowhere to dissipate it. (Full proofs are in chapter 6 of Batchelor's *Introduction to Fluid Dynamics* and §11 of Landau and Lifshitz, *Fluid Mechanics*.)

Real flows past bluff bodies look nothing like [[#eq-cylinder]] behind the body. In a real fluid, the thin layer next to the wall where the fluid sticks loses energy to viscosity; on the rear half of the cylinder, where [[#eq-cp]] has the pressure rising towards the rear stagnation point, this slow fluid cannot climb the pressure hill, the flow separates, and a broad wake of low pressure forms behind the body. The pressure at the back never recovers to the front value, and that difference is the drag. The ideal theory is excellent on the front of the body and wrong in the wake.

::: widget plot
f: 1 - (2*sin(x) + G)^2
x: 0, 2pi
y: -9, 1.5
sliders: G=0:-3:3:0.1
piticks: true
caption: Surface pressure coefficient $C_p = (p - p_\infty)/\frac12\rho U^2$ on a cylinder against the polar angle $\theta$ ($\theta = 0$ is the rear, $\theta = \pi$ the front, $\theta = \pi/2$ the top), for circulation parameter $G = \Gamma/2\pi aU$. At $G = 0$ the curve is symmetric about $\pi/2$ (front–back) and about $\pi$ (top–bottom), and the force vanishes. Increase $G$: the suction on top ($\theta$ near $\pi/2$) deepens and the bottom ($\theta$ near $3\pi/2$) loses its suction, so the cylinder is pushed up — Kutta–Joukowski lift. The curve stays symmetric about $\pi/2$, so there is still no drag. The stagnation points, where $C_p = 1$, slide together underneath and merge at $G = 2$.
:::

## Lift: the Kutta–Joukowski theorem {#lift}

A cylinder in an ideal fluid can carry circulation. Add a line vortex to [[#eq-cylinder]]:

$$
w(z) = U\Bigl(z + \frac{a^2}{z}\Bigr) + \frac{i\Gamma}{2\pi}\ln z ,
$$ {#eq-cylinder-circ}

which, by the table, adds a *clockwise* circulation $\Gamma$ round the cylinder. The circle $r = a$ is still a streamline, since $\operatorname{Im}(i\ln z) = \ln r$ is constant on it, and the flow is still irrotational outside the cylinder. The surface velocity becomes

$$
v_\theta(a, \theta) = -2U\sin\theta - \frac{\Gamma}{2\pi a} .
$$

On top ($\theta = \pi/2$) the two terms add and the fluid moves faster; underneath they partly cancel. The stagnation points are where $\sin\theta = -\Gamma/4\pi Ua$, both on the lower half; they merge at the bottom when $\Gamma = 4\pi Ua$.

::: theorem Kutta–Joukowski theorem for the cylinder {#thm-kj}
In the flow [[#eq-cylinder-circ]] the force per unit length on the cylinder has zero component along the stream and a component

$$
L = \rho U\Gamma
$$ {#eq-kj}

perpendicular to it — upward for a stream in the $+x$ direction and clockwise circulation.
:::

::: proof
By Bernoulli's theorem, $p = p_\infty + \frac12\rho(U^2 - v_\theta^2)$ on the surface, with

$$
v_\theta^2 = 4U^2\sin^2\theta + \frac{2U\Gamma}{\pi a}\sin\theta + \Bigl(\frac{\Gamma}{2\pi a}\Bigr)^2 .
$$

The vertical force per unit length is $L = -\oint p\sin\theta\,a\,\dd\theta = \frac12\rho a\oint v_\theta^2\sin\theta\,\dd\theta$, the constant terms integrating to zero against $\sin\theta$. Of the three terms in $v_\theta^2$, the first gives $\oint\sin^3\theta\,\dd\theta = 0$ and the third $\oint\sin\theta\,\dd\theta = 0$. The middle one gives

$$
L = \frac12\rho a\cdot\frac{2U\Gamma}{\pi a}\int_0^{2\pi}\sin^2\theta\,\dd\theta = \frac{\rho U\Gamma}{\pi}\cdot\pi = \rho U\Gamma .
$$

The drag is $\frac12\rho a\oint v_\theta^2\cos\theta\,\dd\theta$, and every term is a product of $\cos\theta$ with a power of $\sin\theta$ or a constant, each of which integrates to zero over a period.
:::

Martin Kutta (1902) and Nikolai Joukowski (1906) showed that [[#eq-kj]] holds for a two-dimensional body of *any* shape in a uniform stream: the lift per unit span is $\rho U\Gamma$, whatever the profile, where $\Gamma$ is the circulation round any curve enclosing the body. The general proof uses Blasius's contour-integral formula for the force and the residue theorem; it is in chapter 4 of Acheson's *Elementary Fluid Dynamics*.

### Where the circulation comes from

Potential theory allows any value of $\Gamma$. For a wing with a sharp trailing edge, all values but one make the flow go round the sharp edge with infinite speed. The **Kutta condition** selects the one circulation for which the flow leaves the trailing edge smoothly. For a thin wing of chord $c$ at a small angle of attack $\alpha$ it gives $\Gamma = \pi Uc\,\alpha$, so the lift coefficient is

$$
C_L = \frac{L}{\frac12\rho U^2c} = 2\pi\alpha ,
$$ {#eq-thin-airfoil}

with $\alpha$ in radians — confirmed by experiment to within about ten per cent up to the stall. Physically the circulation is created by viscosity, acting in the thin layer at the trailing edge when the wing starts to move. By Kelvin's theorem the total circulation of a large material curve enclosing the wing and its wake stays zero, so an equal and opposite **starting vortex** is shed from the trailing edge and left behind on the runway. Prandtl's laboratory in Göttingen filmed it in the 1920s. The details of wings of finite span, with their trailing vortices and induced drag, are developed in the Mechanical Engineering Atlas lessons [Potential flow](/learn/mechanical/lesson.php?c=aerodynamics&l=potential-flow) and [Thin-airfoil theory](/learn/mechanical/lesson.php?c=aerodynamics&l=thin-airfoil-theory).

::: example Lift on a light aircraft {#ex-aircraft}
A light aircraft of mass $1000\,\mathrm{kg}$ has a rectangular wing of span $10.0\,\mathrm m$ and chord $1.50\,\mathrm m$. It flies level at $50.0\,\mathrm{m/s}$ in air of density $1.20\,\mathrm{kg/m^3}$. Find the circulation round the wing, the lift coefficient, and the angle of attack predicted by thin-airfoil theory. Ignore end effects.
::: solution
In level flight the lift balances the weight, $L = mg = 1000\times9.80 = 9800\,\mathrm N$, or $980\,\mathrm{N/m}$ per unit span. By [[#eq-kj]],

$$
\Gamma = \frac{L/b}{\rho U} = \frac{980}{1.20\times50.0} = 16.3\,\mathrm{m^2/s}.
$$

The lift coefficient is

$$
C_L = \frac{L}{\frac12\rho U^2S} = \frac{9800}{0.5\times1.20\times2500\times15.0} = 0.436 ,
$$

and [[#eq-thin-airfoil]] gives $\alpha = C_L/2\pi = 0.0693\,\mathrm{rad} = 3.97^\circ$. The circulation corresponds to a speed difference between upper and lower surfaces of about $\Gamma/c \approx 11\,\mathrm{m/s}$, roughly $\pm5\,\mathrm{m/s}$ about the flight speed. A real wing of this aspect ratio, $6.7$, needs a few degrees more, because its trailing vortices induce a downwash that reduces the effective angle of attack.
:::
:::

::: application The Magnus effect
A spinning cylinder or ball drags fluid round with it through viscosity, creating a circulation; the Kutta–Joukowski theorem then gives a sideways force. Heinrich Gustav Magnus demonstrated it with rotating cylinders in 1852, and it is why topspin makes a tennis ball dip and sidespin makes a football curve. Anton Flettner's rotor ship *Buckau* crossed the Atlantic in 1926 driven by two tall spinning cylinders, and modern rotor sails are fitted to some cargo ships to save fuel. The force is roughly $\rho U\Gamma$ per unit length, with $\Gamma$ a fraction of $2\pi a\times$(surface speed), the fraction depending on Reynolds number and spin rate.
:::

::: history From Bernoulli to Kutta
Daniel Bernoulli's *Hydrodynamica* (1738) related pressure and speed in flow from a vessel, using conservation of "live force" (energy); it did not contain the equation in today's form. Jean le Rond d'Alembert, in an essay submitted for a Berlin Academy prize in 1749 and published in 1752, wrote early partial differential equations of fluid motion and found that the resistance of a symmetric body in an ideal fluid vanishes. Leonhard Euler gave the general equations of ideal flow, and Bernoulli's integral from them, in memoirs written in 1755 and published in 1757. Hermann von Helmholtz published the vortex theorems in 1858; William Thomson, Lord Kelvin, the circulation theorem in 1869, in a paper on vortex atoms. The connection between circulation and lift was found independently by Frederick Lanchester in Britain, Martin Kutta in Germany (1902) and Nikolai Joukowski in Russia (1906).
:::

## Where this leads {#leads}

The ideal theory is correct away from walls and wakes, and it has to be completed by viscosity close to walls. [[continuum/viscous-flow]] adds the viscous stress, derives the Navier–Stokes equation, and explains with Prandtl's boundary layer why Euler's theory works where it does and fails where it does. Linearised about a state of rest, Euler's equation gives sound waves, and with a free surface it gives water waves — both in [[continuum/waves-in-fluids]], where the potential-flow methods of this chapter are used again. The elementary steady-flow Bernoulli equation of [[mechanics/fluids]] is the special case [[#eq-bernoulli]]; the engineering applications — venturi meters, flow from tanks, siphons — are worked in the Mechanical Engineering Atlas lesson [The Bernoulli equation](/learn/mechanical/lesson.php?c=fluid-mechanics&l=bernoulli).

::: summary
- An ideal fluid has $\sigma_{ij} = -p\,\delta_{ij}$, and Cauchy's equation becomes Euler's equation $\rho\,D\mathbf v/Dt = -\nabla p + \rho\mathbf g$, with slip allowed at walls.
- For a barotropic fluid with conservative forces, $H = \frac12v^2 + h + \Phi$ is constant along streamlines in steady flow, and everywhere (with $\partial_t\phi$ added) in irrotational flow; between different streamlines of a rotational flow, $H$ varies.
- Kelvin's theorem: the circulation round a material loop is conserved; hence flows started from rest stay irrotational, and vortex lines are carried with the fluid.
- Incompressible irrotational flow has $\nabla^2\phi = 0$; in 2D, $w = \phi + i\psi$ is analytic with $w'(z) = u - iv$.
- Flow past a cylinder: surface speed $2U\abs{\sin\theta}$, $C_p = 1 - 4\sin^2\theta$, and zero force — d'Alembert's paradox, resolved by viscous separation.
- With circulation, the lift per unit span is $\rho U\Gamma$ for any 2D body; the Kutta condition fixes $\Gamma$ for a wing, giving $C_L \approx 2\pi\alpha$.
:::

## Exercises

::: exercise A pitot tube in water {level=1 check="sqrt(2*5000/1000)"}
A pitot tube in a river records a stagnation pressure $5.00\,\mathrm{kPa}$ above the static pressure. Find the speed of the water in m/s.
::: solution
By [[#eq-bernoulli]] along the stagnation streamline, $\frac12\rho v^2 = 5000\,\mathrm{Pa}$, so $v = \sqrt{2\times5000/1000} = \sqrt{10} = 3.16\,\mathrm{m/s}$. Water is $830$ times denser than air, so the same pressure difference means a much smaller speed than in [[#ex-pitot]].
:::
:::

::: exercise Suction on top of a cylinder {level=1 check="-180"}
Air of density $1.20\,\mathrm{kg/m^3}$ flows at $10.0\,\mathrm{m/s}$ past a long cylinder. According to potential flow, what is $p - p_\infty$ (in Pa) at the top of the cylinder?
::: solution
At $\theta = \pi/2$, [[#eq-cp]] gives $C_p = 1 - 4 = -3$, so $p - p_\infty = -3\times\frac12\times1.20\times(10.0)^2 = -180\,\mathrm{Pa}$. Measurements on a real cylinder at this speed give a minimum $C_p$ of about $-1.2$, near $\theta = 70^\circ$ from the front, because the flow separates before reaching the top: the ideal theory overestimates the suction.
:::
:::

::: exercise A spinning bowl {level=1 check="(4*pi)^2*0.15^2/(2*9.8)"}
A bowl of soup of radius $15.0\,\mathrm{cm}$ is spun at $2.00$ revolutions per second until it rotates rigidly. How much higher, in metres, is the surface at the rim than on the axis?
::: solution
$\Omega = 2\pi\times2.00 = 4\pi = 12.57\,\mathrm{rad/s}$. From [[#ex-bucket]], $\Delta z = \Omega^2r^2/2g = 157.9\times0.0225/19.6 = 0.181\,\mathrm m$. The soup would need a bowl at least $18\,\mathrm{cm}$ deep, which is why soup is not spun at two revolutions per second.
:::
:::

::: exercise Merging stagnation points {level=2 check="4*pi"}
For the cylinder with circulation [[#eq-cylinder-circ]], find the value of $\Gamma/(Ua)$ at which the two stagnation points merge on the surface. Where are the stagnation points for $\Gamma = 2\pi Ua$?
::: solution
The surface stagnation points satisfy $v_\theta = 0$, that is $\sin\theta = -\Gamma/4\pi Ua$. Two solutions exist for $\Gamma/4\pi Ua < 1$; they merge at $\theta = -\pi/2$ (the bottom) when $\Gamma/(Ua) = 4\pi$. For larger $\Gamma$ the stagnation point leaves the surface and lies in the fluid below the cylinder, with closed streamlines circulating round it. For $\Gamma = 2\pi Ua$, $\sin\theta = -\frac12$, so $\theta = -30^\circ$ and $\theta = -150^\circ$ ($210^\circ$): both $30^\circ$ below the horizontal, at the rear and front.
:::
:::

::: exercise Wing loading {level=2 check="2*700*9.8/(1.2*60^2*16*2*pi)"}
A glider of mass $700\,\mathrm{kg}$ has a wing area of $16.0\,\mathrm{m^2}$. Using $C_L = 2\pi\alpha$, find the angle of attack, in radians, needed for level flight at $60.0\,\mathrm{m/s}$ in air of density $1.20\,\mathrm{kg/m^3}$.
::: solution
$C_L = 2mg/\rho U^2S = 2\times6860/(1.20\times3600\times16.0) = 13720/69120 = 0.1985$, so $\alpha = C_L/2\pi = 0.0316\,\mathrm{rad} = 1.81^\circ$. At half the speed the lift coefficient must be four times larger, $0.79$, and the angle of attack $7.2^\circ$: slow flight needs a steep angle, and the stall, at roughly $15^\circ$ for a typical profile, sets the minimum speed.
:::
:::

::: exercise When is air incompressible? {level=2 check="343*sqrt(0.1)"}
Using the estimate $\Delta\rho/\rho \approx \frac12\mathrm{Ma}^2$ and a sound speed of $343\,\mathrm{m/s}$, find the speed (in m/s) at which the density of air brought to rest at a stagnation point rises by $5\,\%$.
::: solution
$\frac12\mathrm{Ma}^2 = 0.05$ gives $\mathrm{Ma} = \sqrt{0.1} = 0.316$, so $v = 343\times0.316 = 108\,\mathrm{m/s}$, about $390\,\mathrm{km/h}$. This is the origin of the rule of thumb that flows below $\mathrm{Ma} \approx 0.3$ may be treated as incompressible: the density changes are then below about $5\,\%$, and the pressure–speed relation is accurate to about $2\,\%$.
:::
:::

::: exercise The Rankine half-body {level=2}
A source of strength $m$ (volume flux per unit depth) is placed at the origin in a uniform stream $U$ along $x$, so $w = Uz + (m/2\pi)\ln z$. Find the stagnation point, and show that the streamline through it, which separates fluid from the source and from the stream, approaches the half-width $m/2U$ far downstream.
::: solution
$w'(z) = U + m/2\pi z$ vanishes at $z = -m/2\pi U$: the stagnation point is on the negative $x$-axis at distance $m/2\pi U$ upstream of the source. The stream function is $\psi = Ur\sin\theta + m\theta/2\pi$. At the stagnation point, $\theta = \pi$ and $r\sin\theta = 0$, so $\psi = m/2$. The dividing streamline is $Uy + m\theta/2\pi = m/2$. Far downstream $\theta \to 0$, so $y \to m/2U$ on the upper branch (and $-m/2U$ on the lower). The total width $m/U$ is exactly what is needed for the stream at speed $U$ to carry away the source's flux $m$, as mass conservation requires. The dividing streamline can be replaced by a solid body: this is the flow past the nose of a long blunt object, such as a bridge pier or the front of a pitot tube.
:::
:::

::: exercise Kelvin's theorem and starting from rest {level=3}
Show from [[#eq-bernoulli-unsteady]] that if an ideal incompressible fluid at rest is set into motion by an impulsive movement of a body, the velocity potential just afterwards is $\phi = -\Pi/\rho$, where $\Pi$ is the **impulsive pressure** (the time integral of the pressure during the impulse). Explain why this, together with [[#cor-irrotational]], means that the flow immediately after a sudden start is the potential flow, even round a body with sharp edges.
::: hint
Integrate the unsteady Bernoulli equation over a short interval $\delta t$ during which $p$ is very large but $v$ remains finite.
:::
::: solution
During the impulse, $\frac12v^2$ and $\Phi$ stay bounded while $p$ is of order $\Pi/\delta t$. Integrate [[#eq-bernoulli-unsteady]] (with $h = p/\rho$) from $t = 0$, when $\phi = 0$, to $t = \delta t$:

$$
\phi(\delta t) + \int_0^{\delta t}\Bigl(\tfrac12v^2 + \Phi\Bigr)\dd t + \frac1\rho\int_0^{\delta t}p\,\dd t = \int_0^{\delta t}C\,\dd t .
$$

As $\delta t \to 0$ the second term vanishes, the third tends to $\Pi/\rho$, and the right side is a spatially uniform constant that can be absorbed into $\phi$. So $\phi = -\Pi/\rho$. Since the fluid was at rest, it was irrotational; by [[#cor-irrotational]] it is irrotational afterwards, so $\mathbf v = \nabla\phi$ with $\nabla^2\phi = 0$ and the body boundary condition: the potential flow, sharp edges included. The infinite velocities at a sharp edge are then smoothed by viscosity within a short time, shedding the starting vortex and setting up the Kutta circulation; in an exactly ideal fluid this never happens, which is why the Kutta condition must be imposed as an extra physical principle.
:::
:::

::: exercise No pressure minimum inside the fluid {level=3}
Prove that in a steady irrotational flow of an incompressible ideal fluid without body forces, the pressure cannot have a strict local minimum at an interior point of the fluid. Deduce that the lowest pressure — where cavitation would start in water — is always on a boundary.
::: hint
Show that $\nabla^2(\abs{\nabla\phi}^2) = 2\sum_{i,j}(\partial_i\partial_j\phi)^2 \ge 0$, and use the maximum principle for subharmonic functions.
:::
::: solution
By [[#thm-bernoulli]], $p = C - \frac12\rho q$ with $q = \abs{\nabla\phi}^2 = \partial_k\phi\,\partial_k\phi$. Compute

$$
\nabla^2q = \partial_i\partial_i(\partial_k\phi\,\partial_k\phi) = 2\,\partial_i\partial_k\phi\,\partial_i\partial_k\phi + 2\,\partial_k\phi\,\partial_k(\partial_i\partial_i\phi) = 2\sum_{i,k}(\partial_i\partial_k\phi)^2 ,
$$

since $\nabla^2\phi = 0$. So $\nabla^2q \ge 0$: $q$ is subharmonic. A subharmonic function obeys the mean-value inequality: $q(\mathbf x_0)$ is at most the average of $q$ over any sphere centred at $\mathbf x_0$ and lying in the fluid (differentiate the spherical average with respect to the radius and use the divergence theorem; the derivative is the integral of $\nabla^2q \ge 0$ over the ball). If $\mathbf x_0$ were a strict local maximum, $q$ would be smaller than $q(\mathbf x_0)$ everywhere on a small sphere round it, and so would its average — a contradiction. So $q$ has no strict interior maximum. Therefore $p$ has no strict interior minimum. On any bounded part of the flow the minimum pressure is attained on the boundary — the surface of a body or a free streamline — which is where cavitation bubbles first appear on ship propellers and pump impellers.
:::
:::
