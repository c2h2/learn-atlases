A computational fluid dynamics (CFD) code is, at bottom, a machine for keeping accounts. It divides a region of space into many small cells and, for each cell, balances what flows in, what flows out, what is produced inside and what is stored — of mass, of momentum, of energy. Everything else in this course (the difference formulas, the stability limits, the pressure-correction algorithms, the turbulence models) is technique for doing that bookkeeping accurately and efficiently. So we begin with the accounts themselves: the conservation laws of fluid mechanics, written first for a finite region (the form a finite-volume code actually uses) and then for a point (the form a finite-difference code and a mathematician use). We then ask the question that decides how any of these equations can be solved numerically: *how does information travel* in the solution? The answer — elliptic, parabolic or hyperbolic behaviour — tells us which boundary conditions are needed, whether we can march in time or space, and why some flows are easy and others treacherous.

You have met the Navier–Stokes equations in [[fluid-mechanics/navier-stokes]] and the conduction equation in [[heat-transfer/steady-conduction]]. Here we recast them in the single "transport equation" form that CFD codes are built around, and study their mathematical character. The partial-differential-equation background is in Maths Atlas ([PDE course](/learn/maths/lesson.php?c=pde&l=heat-equation)).

## The control-volume balance

Picture a fixed region $V$ of space — a box in a pipe, a cell around a turbine blade — with closed surface $S$ and outward unit normal $\mathbf{n}$. Fluid streams through it with velocity $\mathbf{u}(\mathbf{x}, t)$. Any extensive quantity carried by the fluid (mass, momentum, energy, a dissolved species) can only change inside $V$ for three reasons: it is carried across $S$ by the flow (**convection**), it crosses $S$ by molecular action without net mass motion (**diffusion**: viscous stress, heat conduction, molecular diffusion), or it is created or destroyed inside $V$ (**sources**: body forces, heat release, chemical reaction).

::: definition Generic transport equation {#def-transport}
Let $\phi$ be a quantity per unit mass (for example $\phi = 1$ for mass, $\phi = u$ for $x$-momentum, $\phi = c_p T$ for thermal energy), $\rho$ the density, $\Gamma$ a diffusion coefficient in $\mathrm{kg\,m^{-1}\,s^{-1}}$ and $S_\phi$ a source per unit volume. The **integral transport equation** for a fixed control volume $V$ with surface $S$ is
$$
\frac{\mathrm{d}}{\mathrm{d}t}\int_V \rho\phi\,\mathrm{d}V \;+\; \oint_S \rho\phi\,\mathbf{u}\cdot\mathbf{n}\,\mathrm{d}S \;=\; \oint_S \Gamma\,\nabla\phi\cdot\mathbf{n}\,\mathrm{d}S \;+\; \int_V S_\phi\,\mathrm{d}V,
$$ {#eq-integral}
read as: rate of increase inside $+$ net convective outflow $=$ net diffusive inflow $+$ production. Where the fields are smooth, the **differential (conservative) form** is
$$
\frac{\partial (\rho\phi)}{\partial t} + \nabla\cdot(\rho\mathbf{u}\phi) = \nabla\cdot(\Gamma\nabla\phi) + S_\phi .
$$ {#eq-transport}
The four terms are called the **unsteady**, **convection**, **diffusion** and **source** terms.
:::

The diffusion term has a plus sign on the right because Fourier's and Fick's laws send the flux *down* the gradient: the diffusive flux is $-\Gamma\nabla\phi$, so the net diffusive inflow through $S$ is $-\oint(-\Gamma\nabla\phi)\cdot\mathbf{n}\,\mathrm{d}S$.

::: proposition From the integral to the differential form {#prop-integral-to-differential}
If $\rho$, $\phi$, $\mathbf{u}$, $\Gamma$ and $S_\phi$ are continuously differentiable and [[#eq-integral]] holds for *every* fixed control volume in the flow, then [[#eq-transport]] holds at every point.
:::

::: proof
Because $V$ is fixed, the time derivative passes inside the volume integral. The divergence (Gauss) theorem converts each surface integral to a volume integral: $\oint_S \rho\phi\,\mathbf{u}\cdot\mathbf{n}\,\mathrm{d}S = \int_V \nabla\cdot(\rho\mathbf{u}\phi)\,\mathrm{d}V$ and $\oint_S \Gamma\nabla\phi\cdot\mathbf{n}\,\mathrm{d}S = \int_V\nabla\cdot(\Gamma\nabla\phi)\,\mathrm{d}V$. Collecting everything on one side,
$$
\int_V \left[\frac{\partial(\rho\phi)}{\partial t} + \nabla\cdot(\rho\mathbf{u}\phi) - \nabla\cdot(\Gamma\nabla\phi) - S_\phi\right]\mathrm{d}V = 0 \quad\text{for every } V.
$$
Call the bracket $R(\mathbf{x}, t)$; it is continuous. If $R(\mathbf{x}_0, t) > 0$ at some point, continuity makes $R > 0$ in a small ball around $\mathbf{x}_0$, and integrating over that ball gives a positive number, a contradiction; likewise for $R < 0$. Hence $R \equiv 0$. The assumptions used were differentiability (for Gauss's theorem) and the arbitrariness of $V$.
:::

The proof is short, but notice what it *needs*: smoothness. Across a shock wave or a contact surface the fields jump, the divergence theorem in this form fails, and only the integral statement [[#eq-integral]] survives. This is the first reason why CFD is so attached to the integral form: the **finite volume method** ([[computational-fluid-dynamics/finite-volume-diffusion]]) applies [[#eq-integral]] directly to each cell, and therefore conserves mass, momentum and energy exactly at the discrete level, whatever the smoothness of the solution.

## The equations of fluid flow as transport equations

Three choices of $\phi$ give the equations a CFD code solves for a single-phase Newtonian fluid.

::: proposition Mass, momentum and energy in transport form {#prop-ns}
For a Newtonian fluid with dynamic viscosity $\mu$, thermal conductivity $k$ and body force per unit mass $\mathbf{g}$:

**Continuity** ($\phi = 1$, $\Gamma = 0$, $S = 0$):
$$
\frac{\partial\rho}{\partial t} + \nabla\cdot(\rho\mathbf{u}) = 0 .
$$ {#eq-continuity}
**Momentum** ($\phi = u_i$): with the viscous stress $\tau_{ij} = \mu\left(\partial u_i/\partial x_j + \partial u_j/\partial x_i\right) - \tfrac{2}{3}\mu\,(\nabla\cdot\mathbf{u})\,\delta_{ij}$,
$$
\frac{\partial(\rho u_i)}{\partial t} + \nabla\cdot(\rho\mathbf{u}u_i) = -\frac{\partial p}{\partial x_i} + \frac{\partial \tau_{ij}}{\partial x_j} + \rho g_i .
$$ {#eq-momentum}
For constant $\rho$ and $\mu$ this reduces to
$$
\nabla\cdot\mathbf{u} = 0,\qquad
\rho\left(\frac{\partial\mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u}\right) = -\nabla p + \mu\nabla^2\mathbf{u} + \rho\mathbf{g}.
$$ {#eq-incompressible}
**Thermal energy** for an incompressible fluid with constant $c_p$ and $k$, negligible viscous dissipation and a volumetric heat source $\dot q$:
$$
\rho c_p\left(\frac{\partial T}{\partial t} + \mathbf{u}\cdot\nabla T\right) = k\nabla^2 T + \dot q .
$$ {#eq-energy}
:::

::: proof
Continuity is [[#eq-transport]] with $\phi = 1$: mass has no diffusion flux relative to the mass-averaged velocity and no source. For momentum, Newton's second law for the material in $V$ says the rate of change of momentum inside plus the net outflow of momentum equals the total force. Surface forces are $\oint_S \boldsymbol{\sigma}\cdot\mathbf{n}\,\mathrm{d}S$ with stress tensor $\sigma_{ij} = -p\delta_{ij} + \tau_{ij}$ (the Newtonian constitutive law with Stokes's hypothesis of zero bulk viscosity, derived in [[fluid-mechanics/navier-stokes]]); the body force is $\int_V \rho\mathbf{g}\,\mathrm{d}V$. The divergence theorem turns the surface force into $\int_V \partial\sigma_{ij}/\partial x_j\,\mathrm{d}V$, and the argument of [[#prop-integral-to-differential]] gives [[#eq-momentum]]. With $\rho$ constant, [[#eq-continuity]] becomes $\nabla\cdot\mathbf{u} = 0$; then the dilatation term in $\tau_{ij}$ vanishes and, with $\mu$ constant,
$$
\frac{\partial\tau_{ij}}{\partial x_j} = \mu\frac{\partial^2 u_i}{\partial x_j\partial x_j} + \mu\frac{\partial}{\partial x_i}\left(\frac{\partial u_j}{\partial x_j}\right) = \mu\nabla^2 u_i .
$$
Finally $\nabla\cdot(\rho\mathbf{u}u_i) = \rho u_i\nabla\cdot\mathbf{u} + \rho\,\mathbf{u}\cdot\nabla u_i = \rho\,\mathbf{u}\cdot\nabla u_i$, which gives [[#eq-incompressible]]. For energy, take $\phi = c_pT$ with Fourier's law $\mathbf{q} = -k\nabla T$, so $\Gamma = k/c_p$; the same continuity step removes $\rho c_p T\,\nabla\cdot\mathbf{u}$, and neglecting viscous heating and pressure work (valid at low Mach number) leaves [[#eq-energy]].
:::

Look at how much is hidden in the word "Newtonian". The momentum equation is a transport equation for $u_i$ with $\Gamma = \mu$ — but its "source" contains the pressure gradient, and pressure has no transport equation of its own in incompressible flow. That single fact generates an entire lesson of this course, [[computational-fluid-dynamics/pressure-velocity]]. The convection term $\nabla\cdot(\rho\mathbf{u}u_i)$ is *quadratic* in the unknown velocity — the nonlinearity behind turbulence and behind the need for iteration even in steady laminar flow.

::: example Counting unknowns and equations {#ex-counting}
A three-dimensional, unsteady, compressible flow of air (a perfect gas) is to be computed. List the unknown fields and the equations, and check that the system is closed. Repeat for incompressible flow of water with no heat transfer.
::: solution
**Compressible air.** Unknown fields: $\rho$, $u$, $v$, $w$, $p$, $T$ — six functions of $(x, y, z, t)$. Equations: continuity (1), three momentum components (3), energy (1) and the equation of state $p = \rho R T$ with $R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$ (1): six. The transport coefficients $\mu(T)$ and $k(T)$ are given by property laws (Sutherland's law, for example), so they add no unknowns.

**Incompressible water.** Unknowns $u$, $v$, $w$, $p$ — four. Equations: $\nabla\cdot\mathbf{u} = 0$ (1) and three momentum components (3): four. The system is closed, but notice its odd structure: there are three evolution equations for three velocity components and *one constraint* with no time derivative, and $p$ appears in no equation of its own. Pressure is whatever it must be for the velocity field to stay divergence-free.

Sanity check: in both cases the number of scalar equations equals the number of scalar unknowns, and energy decouples from the incompressible momentum equations when properties are constant — temperature can be computed afterwards as a passive scalar.
:::
:::

### Conservative and non-conservative forms

Equation [[#eq-transport]] has the convective term inside a divergence, $\nabla\cdot(\rho\mathbf{u}\phi)$; this is the **conservative** (or divergence) form. Expanding it and subtracting $\phi$ times continuity gives the **non-conservative** (or advective) form
$$
\rho\left(\frac{\partial\phi}{\partial t} + \mathbf{u}\cdot\nabla\phi\right) = \nabla\cdot(\Gamma\nabla\phi) + S_\phi ,
$$ {#eq-nonconservative}
because $\partial(\rho\phi)/\partial t + \nabla\cdot(\rho\mathbf{u}\phi) = \phi\left[\partial\rho/\partial t + \nabla\cdot(\rho\mathbf{u})\right] + \rho\left(\partial\phi/\partial t + \mathbf{u}\cdot\nabla\phi\right)$ and the first bracket vanishes. For smooth exact solutions the two forms are identical. For *discretised* equations they are not: a scheme built on the conservative form, with each face flux computed once and used with opposite signs by the two cells sharing the face, telescopes — summing over all cells, interior fluxes cancel and the total of $\phi$ changes only by what crosses the outer boundary. A scheme built on the non-conservative form has no such property, and it can converge to a solution with a shock in the wrong place.

::: warning A non-conservative scheme can be consistent and still wrong
It is tempting to think that any consistent discretisation of [[#eq-nonconservative]] will do, since it is "the same equation". For smooth flows it will, to within truncation error. Across a shock, however, Lax and Wendroff (1960) showed that a conservative scheme that converges converges to a *weak solution* with the correct jump conditions (the Rankine–Hugoniot relations); a non-conservative scheme may converge to a discontinuity with the wrong speed and strength. Use the conservative form whenever discontinuities, strong gradients or long-time integrals of conserved quantities matter — which in CFD is nearly always.
:::

## Dimensionless groups and the balance of terms

Before discretising an equation it pays to know which of its terms matter. Scale the incompressible momentum equation with a length $L$, a velocity $U$, a time $L/U$ and a pressure $\rho U^2$: with starred dimensionless variables,
$$
\frac{\partial\mathbf{u}^*}{\partial t^*} + (\mathbf{u}^*\cdot\nabla^*)\mathbf{u}^* = -\nabla^* p^* + \frac{1}{\mathrm{Re}}\nabla^{*2}\mathbf{u}^*,
\qquad \mathrm{Re} = \frac{\rho U L}{\mu} = \frac{UL}{\nu}.
$$ {#eq-nondim}
The same scaling of [[#eq-energy]] produces the **Péclet number** $\mathrm{Pe} = UL/\alpha = \mathrm{Re}\,\mathrm{Pr}$, where $\alpha = k/(\rho c_p)$ is the thermal diffusivity and $\mathrm{Pr} = \nu/\alpha$ the Prandtl number. Both numbers are ratios of convective to diffusive transport. When they are large — and in engineering they almost always are — convection dominates over most of the domain and diffusion matters only in thin layers near walls and in shear layers. That is precisely the combination that makes CFD hard: the equations behave nearly hyperbolically in the bulk and parabolically in the layers, and the layers are thin compared with the domain.

::: example Which terms matter? {#ex-reynolds}
Water ($\nu = 1.0\times10^{-6}\ \mathrm{m^2/s}$, $\mathrm{Pr} = 7.0$) flows at a mean speed $U = 2.0\ \mathrm{m/s}$ through a pipe of diameter $D = 50\ \mathrm{mm}$. Compute $\mathrm{Re}_D$ and $\mathrm{Pe}_D$, and estimate the ratio of the time for momentum to diffuse across the pipe to the time for the fluid to travel one diameter.
::: solution
$$
\mathrm{Re}_D = \frac{UD}{\nu} = \frac{2.0 \times 0.050}{1.0\times10^{-6}} = 1.0\times10^{5},\qquad
\mathrm{Pe}_D = \mathrm{Re}_D\,\mathrm{Pr} = 7.0\times10^{5}.
$$
The convective time is $t_c = D/U = 0.025\ \mathrm{s}$; the viscous diffusion time is $t_\nu = D^2/\nu = 2500\ \mathrm{s}$. Their ratio is $t_\nu/t_c = UD/\nu = \mathrm{Re}_D = 10^5$ — the Reynolds number *is* this ratio of times. Laminar diffusion alone would need about $40$ minutes to spread momentum across the pipe while the fluid passes a diameter in $25\ \mathrm{ms}$; in reality the flow is turbulent ($\mathrm{Re}_D \gg 2300$) and turbulent mixing does the spreading, a matter for [[computational-fluid-dynamics/turbulence-modelling]].

Sanity check: the units cancel in both ratios, and the very large Péclet number means heat, which diffuses seven times more slowly than momentum in water, is even more convection-dominated.
:::
:::

## How information travels: classification

Here is the central idea of this lesson. A numerical method is a rule that computes the solution at a point from the solution at neighbouring points. That rule must respect the way the *exact* solution depends on its surroundings. In steady heat conduction a change of temperature anywhere on the boundary is felt everywhere inside at once. In transient conduction a change now affects the future but never the past. In a supersonic stream a disturbance is felt only inside a downstream Mach cone. These three behaviours are called **elliptic**, **parabolic** and **hyperbolic**, and the names come from a simple algebraic test.

::: definition Second-order linear PDEs in two variables {#def-classification}
The equation
$$
A\,\phi_{xx} + B\,\phi_{xy} + C\,\phi_{yy} + (\text{lower-order terms}) = 0,
$$ {#eq-second-order}
with coefficients $A, B, C$ that may depend on $x$ and $y$ (but not on second derivatives of $\phi$), is called at a given point
- **elliptic** if $B^2 - 4AC < 0$,
- **parabolic** if $B^2 - 4AC = 0$,
- **hyperbolic** if $B^2 - 4AC > 0$.

The **characteristic directions** are the directions $\mathrm{d}y/\mathrm{d}x$ satisfying
$$
A\left(\frac{\mathrm{d}y}{\mathrm{d}x}\right)^2 - B\,\frac{\mathrm{d}y}{\mathrm{d}x} + C = 0 ;
$$ {#eq-characteristics}
there are two real ones for a hyperbolic equation, one for a parabolic equation and none for an elliptic equation.
:::

The names echo the conic $Ax^2 + Bxy + Cy^2 = 1$, which is an ellipse, parabola or hyperbola according to the same sign test. Why do characteristics matter? Along a characteristic curve the PDE does not determine the second derivatives of $\phi$ from data on the curve — derivatives can jump across it. Characteristics are therefore the paths along which discontinuities and disturbances propagate.

::: proposition Characteristics as curves of indeterminacy {#prop-characteristics}
Suppose $\phi$, $\phi_x$ and $\phi_y$ are known along a curve $y = y(x)$, and [[#eq-second-order]] holds. The second derivatives $\phi_{xx}$, $\phi_{xy}$, $\phi_{yy}$ on the curve are uniquely determined unless the slope $m = \mathrm{d}y/\mathrm{d}x$ satisfies [[#eq-characteristics]].
:::

::: proof
Along the curve, the chain rule gives the changes of the known first derivatives:
$$
\mathrm{d}(\phi_x) = \phi_{xx}\,\mathrm{d}x + \phi_{xy}\,\mathrm{d}y, \qquad
\mathrm{d}(\phi_y) = \phi_{xy}\,\mathrm{d}x + \phi_{yy}\,\mathrm{d}y .
$$
Together with the PDE these are three linear equations for the three second derivatives:
$$
\begin{pmatrix} A & B & C \\ \mathrm{d}x & \mathrm{d}y & 0 \\ 0 & \mathrm{d}x & \mathrm{d}y \end{pmatrix}
\begin{pmatrix} \phi_{xx} \\ \phi_{xy} \\ \phi_{yy} \end{pmatrix}
=
\begin{pmatrix} -(\text{lower-order}) \\ \mathrm{d}(\phi_x) \\ \mathrm{d}(\phi_y) \end{pmatrix}.
$$
The solution is unique if and only if the determinant is nonzero. Expanding along the first row, the determinant is $A\,\mathrm{d}y^2 - B\,\mathrm{d}x\,\mathrm{d}y + C\,\mathrm{d}x^2$; dividing by $\mathrm{d}x^2$ it vanishes exactly when $A m^2 - Bm + C = 0$. This quadratic in $m$ has two, one or no real roots according to whether $B^2 - 4AC$ is positive, zero or negative.
:::

The three model equations of CFD are the prototypes.

- **Laplace and Poisson**, $\phi_{xx} + \phi_{yy} = f$: $A = C = 1$, $B = 0$, discriminant $-4$, **elliptic**. Steady conduction, potential flow, the stream function of two-dimensional flow and — crucially — the pressure equation of incompressible flow. The solution at every interior point depends on the *whole* boundary; boundary conditions are needed on a closed boundary, and the problem cannot be marched: all unknowns must be solved for simultaneously ([[computational-fluid-dynamics/linear-solvers]]).
- **Heat equation**, $\phi_t = \alpha\phi_{xx}$: with $y = t$, $A = \alpha$, $B = C = 0$, discriminant $0$, **parabolic**. The single characteristic is $t = \text{const}$: a disturbance is felt everywhere instantly but only *forward* in time. One initial condition and boundary conditions on the sides are needed; the solution is **marched** in time.
- **Wave equation**, $\phi_{tt} = c^2\phi_{xx}$: $A = -c^2$ (for $x$), $C = 1$ (for $t$), discriminant $4c^2 > 0$, **hyperbolic**, with characteristics $x \pm ct = \text{const}$. Information travels at finite speed $c$; the solution at $(x, t)$ depends only on initial data in the interval $[x - ct, x + ct]$, its **domain of dependence**.

::: widget heat
equation: heat
f: if(x < 1, 0, if(x < 2, 1, 0))
L: pi
k: 0.5
boundary: dirichlet
caption: Parabolic behaviour. A block of heat in the middle of a bar with both ends held at zero spreads and decays. Press play and watch the *edges* of the profile: the smallest disturbance reaches the ends of the bar immediately — the heat equation has infinite signal speed — yet nothing ever runs backwards in time. Sharp corners are smoothed at once, which is why parabolic problems are forgiving to discretise.
:::

::: widget heat
equation: wave
f: if(x < 1, 0, if(x < 2, 1, 0))
L: pi
k: 0.5
boundary: dirichlet
caption: Hyperbolic behaviour. The same initial block on a string, now obeying the wave equation with speed $c = 0.5$. It splits into two half-height pulses moving left and right at exactly $c$, keeping their sharp edges until they reflect from the fixed ends. Information travels along characteristics $x \pm ct = \text{const}$ at finite speed, and discontinuities are *carried*, not smoothed — the property that makes convection-dominated flows hard to compute accurately.
:::

::: example Classifying and drawing characteristics {#ex-classify}
Classify $\phi_{xx} + 4\phi_{xy} + 3\phi_{yy} = 0$ and find its characteristic directions.
::: solution
$A = 1$, $B = 4$, $C = 3$, so $B^2 - 4AC = 16 - 12 = 4 > 0$: **hyperbolic** everywhere. The characteristic slopes solve $m^2 - 4m + 3 = 0$, i.e. $(m-1)(m-3) = 0$, so $m = 1$ and $m = 3$. The characteristics are the two families of straight lines $y - x = \text{const}$ and $y - 3x = \text{const}$.

Check by transformation: with $\xi = y - x$ and $\eta = y - 3x$, the chain rule gives $\phi_x = -\phi_\xi - 3\phi_\eta$, $\phi_y = \phi_\xi + \phi_\eta$, and substituting into the PDE every pure second derivative cancels, leaving $-4\phi_{\xi\eta} = 0$. Its general solution $\phi = F(\xi) + G(\eta)$ is two arbitrary waves travelling along the two families — exactly the hyperbolic picture.
:::
:::

### Systems of first-order equations

The Euler and Navier–Stokes equations are not single second-order equations but *systems* of first-order equations. The generalisation is this: write a one-dimensional system as $\partial\mathbf{U}/\partial t + \mathbf{A}\,\partial\mathbf{U}/\partial x = \mathbf{0}$; it is **hyperbolic** if the matrix $\mathbf{A}$ has real eigenvalues and a full set of eigenvectors. The eigenvalues are the propagation speeds of the characteristic waves.

::: proposition Characteristic speeds of the one-dimensional Euler equations {#prop-euler-speeds}
For inviscid one-dimensional flow of a perfect gas with velocity $u$ and speed of sound $c = \sqrt{\gamma R T}$, the Euler equations are hyperbolic with characteristic speeds
$$
\lambda_1 = u - c,\qquad \lambda_2 = u,\qquad \lambda_3 = u + c .
$$ {#eq-euler-eigen}
:::

::: proof
Use the primitive variables $\mathbf{U} = (\rho, u, p)^{\mathsf{T}}$. Continuity is $\rho_t + u\rho_x + \rho u_x = 0$; momentum is $u_t + u u_x + p_x/\rho = 0$; and for isentropic changes of a fluid particle (inviscid, non-conducting) the energy equation becomes $p_t + u p_x + \rho c^2 u_x = 0$, using $c^2 = (\partial p/\partial\rho)_s$. Hence
$$
\mathbf{A} = \begin{pmatrix} u & \rho & 0 \\ 0 & u & 1/\rho \\ 0 & \rho c^2 & u \end{pmatrix},\qquad
\det(\mathbf{A} - \lambda\mathbf{I}) = (u - \lambda)\left[(u-\lambda)^2 - c^2\right].
$$
The roots are $\lambda = u$ and $\lambda = u \pm c$, all real and distinct when $c > 0$, so there are three independent eigenvectors and the system is hyperbolic.
:::

The physical meaning is direct: entropy (and any passive marker) is carried with the flow at speed $u$, and two acoustic waves run at $u \pm c$ relative to the ground. When the flow is subsonic ($u < c$) one wave runs upstream, so a subsonic inflow boundary must leave one quantity free to be set by the interior and a subsonic outflow boundary must prescribe one; when the flow is supersonic all three waves run downstream and every quantity is fixed at the inlet, none at the outlet. The rule is general: **the number of boundary conditions to impose at a boundary equals the number of characteristics entering the domain there.** Imposing more makes the problem over-determined and causes spurious reflections; imposing fewer makes it under-determined.

::: example Boundary conditions for a subsonic duct {#ex-euler-bc}
Air at $T = 300\ \mathrm{K}$ ($\gamma = 1.4$, $R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$) flows along a duct at $u = 100\ \mathrm{m/s}$. Find the three characteristic speeds and the number of boundary conditions needed at the inlet and the outlet of an inviscid one-dimensional calculation. How does the answer change at $u = 500\ \mathrm{m/s}$?
::: solution
$c = \sqrt{\gamma R T} = \sqrt{1.4 \times 287 \times 300} = 347.2\ \mathrm{m/s}$, so
$$
\lambda_1 = 100 - 347.2 = -247.2\ \mathrm{m/s},\quad \lambda_2 = 100\ \mathrm{m/s},\quad \lambda_3 = 447.2\ \mathrm{m/s}.
$$
At the **inlet** (left end), characteristics with $\lambda > 0$ enter: two of them, so two conditions are imposed there (typically total pressure and total temperature). At the **outlet** (right end), characteristics with $\lambda < 0$ enter: one, so one condition (typically static pressure). Total $2 + 1 = 3$, one per equation, as it must be for a well-posed problem.

At $u = 500\ \mathrm{m/s}$ ($\mathrm{Ma} = 1.44$) all three speeds are positive ($152.8$, $500$, $847.2\ \mathrm{m/s}$): three conditions at the inlet, none at the outlet, where everything is extrapolated from inside. Sanity check: a supersonic stream cannot "hear" its exit, which is why a supersonic wind-tunnel test section is unaffected by small changes of back pressure.
:::
:::

### Mixed and changing type

Real flow equations rarely have one type everywhere. The classic example is steady, small-disturbance compressible potential flow, which for a perturbation potential $\varphi$ in a stream of Mach number $M_\infty$ is
$$
(1 - M_\infty^2)\,\varphi_{xx} + \varphi_{yy} = 0 .
$$ {#eq-small-disturbance}
Here $A = 1 - M_\infty^2$, $B = 0$, $C = 1$ and $B^2 - 4AC = -4(1 - M_\infty^2)$: **elliptic** for subsonic flow and **hyperbolic** for supersonic flow, with characteristic slopes $\mathrm{d}y/\mathrm{d}x = \pm 1/\sqrt{M_\infty^2 - 1}$ — the Mach lines. A transonic aerofoil has both types in one flow field, a subsonic elliptic region with an embedded supersonic hyperbolic pocket closed by a shock, and the numerical schemes that first computed such flows (Murman and Cole, 1971) switched between central and upwind differences according to the local type.

::: example Mach lines {#ex-mach}
For [[#eq-small-disturbance]], classify the equation at $M_\infty = 0.6$ and $M_\infty = 2.0$, and in the supersonic case find the angle between the Mach lines and the free stream.
::: solution
At $M_\infty = 0.6$: $1 - M_\infty^2 = 0.64 > 0$, so $B^2 - 4AC = -2.56 < 0$, **elliptic**. A disturbance at the aerofoil is felt everywhere, upstream included (that is why streamlines curve *ahead* of a subsonic body).

At $M_\infty = 2.0$: $1 - M_\infty^2 = -3$, so $B^2 - 4AC = 12 > 0$, **hyperbolic**. The characteristic slopes are $\pm 1/\sqrt{3} = \pm 0.577$, at an angle $\mu = \arctan(1/\sqrt{3}) = 30.0^\circ$ to the stream. This is the Mach angle $\mu = \arcsin(1/M_\infty) = \arcsin 0.5 = 30.0^\circ$, as it must be. A disturbance is felt only inside the downstream wedge bounded by these lines.
:::
:::

### The incompressible Navier–Stokes equations

The unsteady incompressible equations [[#eq-incompressible]] are of mixed character. The momentum equations are parabolic in time (diffusion) with a hyperbolic flavour (convection). The constraint $\nabla\cdot\mathbf{u} = 0$ has no time derivative at all; take the divergence of the momentum equation and it becomes an equation for the pressure.

::: proposition The pressure Poisson equation {#prop-ppe}
For incompressible flow with constant $\rho$ and $\mu$ and a conservative (or zero) body force, the pressure satisfies
$$
\nabla^2 p = -\rho\,\frac{\partial u_i}{\partial x_j}\frac{\partial u_j}{\partial x_i}
$$ {#eq-ppe}
(summation over $i$ and $j$), an elliptic equation.
:::

::: proof
Take $\partial/\partial x_i$ of the $i$-th component of the momentum equation $\rho(\partial_t u_i + u_j\partial_j u_i) = -\partial_i p + \mu\nabla^2 u_i + \rho g_i$ and sum over $i$. The unsteady term gives $\rho\,\partial_t(\partial_i u_i) = 0$, the viscous term $\mu\nabla^2(\partial_i u_i) = 0$, and $\partial_i g_i = 0$ for a uniform gravity field. The convective term gives $\rho\,\partial_i(u_j\partial_j u_i) = \rho(\partial_i u_j)(\partial_j u_i) + \rho u_j\partial_j(\partial_i u_i) = \rho(\partial_i u_j)(\partial_j u_i)$. What remains is $\rho(\partial_i u_j)(\partial_j u_i) = -\nabla^2 p$. The operator is the Laplacian, which is elliptic.
:::

This proposition explains why even a "marching" unsteady incompressible solver must, at every time step, solve an elliptic problem over the whole domain. Physically, sound travels infinitely fast in an incompressible fluid: a change of pressure anywhere is felt everywhere at once. The steady boundary-layer equations, by contrast, lose the streamwise diffusion term and become **parabolic in the streamwise direction** — they can be marched from leading edge to trailing edge, which is why boundary-layer codes were practical decades before full Navier–Stokes solvers.

::: example Pressure in a stagnation-point flow {#ex-stagnation}
The plane stagnation-point flow $u = ax$, $v = -ay$ with $a = 2.0\ \mathrm{s^{-1}}$ carries air of density $\rho = 1.2\ \mathrm{kg/m^3}$. Verify continuity, evaluate the right-hand side of [[#eq-ppe]], and check it against the pressure field from Bernoulli's equation.
::: solution
$\partial u/\partial x + \partial v/\partial y = a - a = 0$: continuity holds. The velocity-gradient tensor has $\partial u/\partial x = a$, $\partial v/\partial y = -a$ and zero off-diagonal entries, so
$$
\frac{\partial u_i}{\partial x_j}\frac{\partial u_j}{\partial x_i} = a^2 + a^2 = 2a^2,\qquad
\nabla^2 p = -2\rho a^2 = -2 \times 1.2 \times 2.0^2 = -9.6\ \mathrm{Pa/m^2}.
$$
The flow is irrotational, so Bernoulli holds everywhere: $p = p_0 - \tfrac{1}{2}\rho(u^2 + v^2) = p_0 - \tfrac{1}{2}\rho a^2(x^2 + y^2)$, whose Laplacian is $-\tfrac{1}{2}\rho a^2(2 + 2) = -2\rho a^2$. The two agree. Sanity check: pressure is greatest at the stagnation point and falls as the fluid accelerates away — a negative Laplacian means a pressure maximum.
:::
:::

## Well-posed problems and boundary conditions

A mathematical problem is **well posed** in Hadamard's sense if a solution exists, is unique, and depends continuously on the data. A CFD calculation of an ill-posed problem cannot converge to anything meaningful, however fine the mesh: small errors in the data are amplified without bound. Matching boundary conditions to the type of the equation is the practical way to guarantee well-posedness:

| type | prototype | data needed | numerical strategy |
|---|---|---|---|
| elliptic | $\nabla^2\phi = f$ | one condition ($\phi$, $\partial\phi/\partial n$ or a combination) on the whole closed boundary | simultaneous solution of all unknowns (iterative or direct solvers) |
| parabolic | $\phi_t = \alpha\nabla^2\phi$ | initial condition plus conditions on the spatial boundary for all $t$ | march in time; each step may be explicit or need an elliptic-type solve |
| hyperbolic | $\phi_{tt} = c^2\phi_{xx}$ or $\mathbf{U}_t + \mathbf{A}\mathbf{U}_x = 0$ | initial data plus one condition per *incoming* characteristic | march along the characteristic direction; upwind information |

The classic ill-posed problem is the "backward heat equation" — computing the temperature distribution that *led* to a measured one. High-wavenumber errors grow like $e^{\alpha k^2 t}$, without bound as $k\to\infty$, so no grid refinement helps. The forward problem damps them like $e^{-\alpha k^2 t}$, which is why parabolic problems feel so benign.

::: remark Why a single CFD code can solve all types
A general-purpose finite-volume code does not test the type of its equations. It treats every problem as unsteady (or pseudo-unsteady) and iterates. What keeps it out of trouble is that its discretisations are built to mimic the physical direction of information transfer: upwind-biased convection schemes respect the hyperbolic part ([[computational-fluid-dynamics/convection-diffusion]]); implicit diffusion and pressure equations respect the elliptic part ([[computational-fluid-dynamics/pressure-velocity]]); and the boundary conditions chosen by the user — velocity inlet, pressure outlet, wall — are chosen so that the right number of quantities is specified on each boundary.
:::

::: widget vectorfield
P: a*x
Q: -y
x: -2, 2
y: -2, 2
sliders: a=0.5:0:2:0.1
streamlines: true
shade: divergence
caption: The velocity field $u = ax$, $v = -y$ with $a$ set by the slider; the shading is $\nabla\cdot\mathbf{u} = a - 1$. Only at $a = 1$ is the field divergence-free and therefore a possible incompressible flow (the stagnation flow of the example above). For $a > 1$ every small box loses more fluid than it gains and density must fall; for $a < 1$ it accumulates fluid. An incompressible solver's whole job is to find the pressure that keeps this shading at zero in every cell.
:::

::: quiz
A steady, two-dimensional supersonic jet exhausts into still air through a nozzle; the solution is computed with the inviscid steady Euler equations. Which statement about the numerical problem is correct?
- [ ] It is elliptic, so boundary conditions are needed all round the domain including the downstream boundary.
- [x] In the supersonic region it is hyperbolic in the streamwise direction, so the solution can be marched downstream from the nozzle exit and nothing is imposed at a supersonic outflow.
- [ ] It is parabolic, because it is steady.
- [ ] Its type depends on the Reynolds number.
::: solution
Steady supersonic inviscid flow behaves like [[#eq-small-disturbance]] with $M > 1$: hyperbolic with Mach lines as characteristics, all leaning downstream. Information cannot travel upstream, so the solution may be marched in the streamwise direction and an outflow boundary takes no conditions. "Steady" does not make an equation parabolic, and the Euler equations contain no Reynolds number.
:::
:::

::: quiz
Why does the incompressible pressure field require an elliptic solve at every time step, even in an explicit unsteady code?
- [ ] Because the momentum equation is elliptic.
- [ ] Because the time step is too large.
- [x] Because the divergence-free constraint has no time derivative; taking the divergence of the momentum equation gives a Poisson equation for pressure, whose solution at each point depends on the whole domain.
- [ ] Because pressure is a conserved quantity.
::: solution
Continuity in incompressible flow is a constraint, not an evolution equation. The pressure that enforces it satisfies [[#eq-ppe]], an elliptic equation. Physically, the speed of sound is infinite, so a pressure disturbance is felt everywhere instantly.
:::
:::

::: history
The differential equations of viscous flow were obtained by Claude-Louis Navier in a memoir presented to the French Academy in 1822 (published in 1827) and, from a continuum argument close to the modern one, by George Gabriel Stokes in 1845. The idea of solving them — or any field equations — by replacing derivatives with differences was first pursued systematically by Lewis Fry Richardson, who computed the stresses in a masonry dam by finite differences (*Philosophical Transactions of the Royal Society A*, 1911) and then attempted a numerical weather forecast by hand, published as *Weather Prediction by Numerical Process* (1922). Jacques Hadamard's notion of a well-posed problem (1902) and the classification of second-order equations into elliptic, parabolic and hyperbolic types became the framework in which every later numerical method was analysed. The first numerical solution of the Navier–Stokes equations for flow past a body is usually credited to Alexander Thom, who computed the steady flow past a circular cylinder at low Reynolds number by hand (*Proceedings of the Royal Society A*, 1933).
:::

::: summary
- Every equation a CFD code solves is a balance: unsteady $+$ convection $=$ diffusion $+$ source, [[#eq-transport]]; the integral form [[#eq-integral]] holds even across discontinuities, the differential form only where fields are smooth.
- Continuity, momentum and energy are transport equations with $\phi = 1$, $u_i$ and $c_pT$; incompressible momentum has the pressure gradient as a "source" and no equation for pressure.
- Conservative discretisations telescope and conserve exactly; non-conservative ones can put shocks in the wrong place.
- $\mathrm{Re} = UL/\nu$ and $\mathrm{Pe} = UL/\alpha$ measure convection against diffusion; large values mean thin diffusive layers in a convection-dominated bulk.
- A second-order equation is elliptic, parabolic or hyperbolic as $B^2 - 4AC$ is negative, zero or positive; characteristics are the curves along which disturbances travel.
- Elliptic problems need data on the whole boundary and a simultaneous solution; parabolic and hyperbolic problems are marched; hyperbolic boundaries take one condition per incoming characteristic.
- The 1D Euler equations have speeds $u$, $u \pm c$; the incompressible pressure obeys an elliptic Poisson equation [[#eq-ppe]].
:::

## Exercises

::: exercise Classify a constant-coefficient equation {level=1 check="-8"}
Classify $3\phi_{xx} + 2\phi_{xy} + \phi_{yy} = 0$. (Enter the value of the discriminant $B^2 - 4AC$.)
::: solution
$A = 3$, $B = 2$, $C = 1$: $B^2 - 4AC = 4 - 12 = -8 < 0$, so the equation is elliptic everywhere and has no real characteristics. Data are needed on a closed boundary.
:::
:::

::: exercise Mach angle {level=1 check="41.81"}
Find the angle between the Mach lines of [[#eq-small-disturbance]] and the free stream at $M_\infty = 1.5$. (Enter the angle in degrees to two decimal places.)
::: solution
$\mu = \arcsin(1/M_\infty) = \arcsin(0.6667) = 41.81^\circ$. Equivalently the characteristic slope is $1/\sqrt{M_\infty^2 - 1} = 1/\sqrt{1.25} = 0.8944$ and $\arctan 0.8944 = 41.81^\circ$.
:::
:::

::: exercise Reynolds number of a car {level=1 check="9e6"}
A car of length $L = 4.5\ \mathrm{m}$ travels at $U = 30\ \mathrm{m/s}$ in air with $\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$. Compute the Reynolds number based on length, and say what it implies about the flow near the body surface. (Enter $\mathrm{Re}_L$.)
::: solution
$\mathrm{Re}_L = UL/\nu = 30 \times 4.5/1.5\times10^{-5} = 9.0\times10^{6}$. Viscous effects are confined to thin boundary layers (of the order of $0.37\,L\,\mathrm{Re}_L^{-1/5} \approx 7\ \mathrm{cm}$ at the rear for a turbulent layer), which will need fine mesh layers near the surface while the bulk flow is nearly inviscid.
:::
:::

::: exercise Characteristic speeds of a fast stream {level=2 check="-16.94"}
Air at $T = 250\ \mathrm{K}$ ($\gamma = 1.4$, $R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$) flows at $u = 300\ \mathrm{m/s}$. Find the three characteristic speeds of the 1D Euler equations and the number of boundary conditions at the inlet and outlet. (Enter the smallest characteristic speed in m/s to two decimal places.)
::: solution
$c = \sqrt{1.4 \times 287 \times 250} = 316.94\ \mathrm{m/s}$, so the speeds are $u - c = -16.94\ \mathrm{m/s}$, $u = 300\ \mathrm{m/s}$, $u + c = 616.94\ \mathrm{m/s}$. The flow is just subsonic ($\mathrm{Ma} = 0.947$): two conditions at the inlet, one at the outlet. Note how slowly the upstream-running acoustic wave moves; near $\mathrm{Ma} = 1$ information takes a very long time to travel upstream, and time-marching solvers converge slowly there.
:::
:::

::: exercise Pressure in solid-body rotation {level=2 check="200000"}
Water ($\rho = 1000\ \mathrm{kg/m^3}$) rotates as a rigid body with $u = -\Omega y$, $v = \Omega x$, $\Omega = 10\ \mathrm{rad/s}$. Evaluate $\nabla^2 p$ from [[#eq-ppe]] and confirm it with the known pressure field $p = p_0 + \tfrac{1}{2}\rho\Omega^2(x^2 + y^2)$. (Enter $\nabla^2 p$ in $\mathrm{Pa/m^2}$.)
::: solution
$\partial u/\partial x = 0$, $\partial u/\partial y = -\Omega$, $\partial v/\partial x = \Omega$, $\partial v/\partial y = 0$. The double sum is $(\partial_x u)^2 + 2(\partial_y u)(\partial_x v) + (\partial_y v)^2 = 0 + 2(-\Omega)(\Omega) + 0 = -2\Omega^2$, so $\nabla^2 p = 2\rho\Omega^2 = 2 \times 1000 \times 100 = 2.0\times10^{5}\ \mathrm{Pa/m^2}$. The given field has $\nabla^2 p = \tfrac{1}{2}\rho\Omega^2 \times 4 = 2\rho\Omega^2$, in agreement. A positive Laplacian means a pressure minimum, on the axis — the vortex core.
:::
:::

::: exercise A hyperbolic equation's characteristics {level=2 check="-0.5"}
Show that $2\phi_{xx} - 5\phi_{xy} + 2\phi_{yy} = 0$ is hyperbolic and find its characteristic slopes $\mathrm{d}y/\mathrm{d}x$. (Enter the slope with the smaller magnitude.)
::: solution
$B^2 - 4AC = 25 - 16 = 9 > 0$: hyperbolic. [[#eq-characteristics]] gives $2m^2 + 5m + 2 = 0$, so $m = (-5 \pm 3)/4$, i.e. $m = -0.5$ and $m = -2$. The characteristics are the lines $y + x/2 = \text{const}$ and $y + 2x = \text{const}$.
:::
:::

::: exercise Conservative form of the Burgers equation {level=2}
The inviscid Burgers equation is $u_t + u u_x = 0$. (a) Write it in conservative form $u_t + f(u)_x = 0$. (b) A discontinuity separates $u_L = 2$ (left) from $u_R = 0$ (right). Using the integral form over a control volume that straddles the jump, show that it moves at speed $s = [f]/[u]$ and evaluate $s$. (c) Show that the non-conservative form multiplied by $u$, $(u^2/2)_t + (u^3/3)_x = 0$, predicts a different speed, and explain which is right.
::: solution
(a) $u u_x = (u^2/2)_x$, so $f(u) = u^2/2$.

(b) Take a control volume $[a, b]$ containing the jump at $x = X(t)$. The integral form says $\frac{\mathrm{d}}{\mathrm{d}t}\int_a^b u\,\mathrm{d}x = f(u(a)) - f(u(b))$. With $u = u_L$ for $x < X$ and $u_R$ for $x > X$, the left side is $\dot X(u_L - u_R)$, so $s = \dot X = (f_L - f_R)/(u_L - u_R) = (2 - 0)/(2 - 0) = 1$.

(c) The same argument with "conserved variable" $u^2/2$ and flux $u^3/3$ gives $s = (8/3 - 0)/(2 - 0) = 4/3$. Both forms are equivalent for smooth solutions, but they conserve different quantities across a jump. Which is right is decided by the physics — what is actually conserved. If $u$ is the conserved quantity, $s = 1$; a scheme discretising the wrong conservative form, or no conservative form, converges to the wrong shock speed. This is the content of the warning in this lesson.
:::
:::

::: exercise Pressure equation with gravity and variable viscosity {level=3}
Repeat the derivation of [[#eq-ppe]] for incompressible flow when $\mu$ varies in space (for example because of temperature) and gravity is uniform. Which extra term appears? Is the pressure equation still elliptic?
::: solution
With variable $\mu$ the viscous term is $\partial_j\left[\mu(\partial_j u_i + \partial_i u_j)\right]$. Taking $\partial_i$ and summing, $\partial_i\partial_j\left[\mu(\partial_j u_i + \partial_i u_j)\right] = 2\,\partial_i\partial_j(\mu\,S_{ij})$ with $S_{ij}$ the strain-rate tensor; this no longer vanishes when $\nabla\mu \ne 0$. The result is
$$
\nabla^2 p = -\rho\,(\partial_i u_j)(\partial_j u_i) + 2\,\partial_i\partial_j(\mu S_{ij}),
$$
and uniform gravity still contributes nothing ($\partial_i g_i = 0$); it is absorbed into a hydrostatic pressure. The operator acting on $p$ is still the Laplacian, so the equation remains elliptic; only the right-hand side changes. (If $\rho$ varies too, the operator becomes $\nabla\cdot(\rho^{-1}\nabla p)$, still elliptic.)
:::
:::

::: exercise Choosing the solution strategy {level=3}
For each of the following, state the mathematical type of the governing equations, the data required on each boundary, and whether the computation can be marched (in time or space) or must be solved simultaneously: (a) steady laminar flow in a lid-driven square cavity; (b) the steady laminar boundary layer on a flat plate; (c) start-up transient of heat conduction in a turbine disc; (d) steady supersonic flow over a wedge downstream of its attached oblique shock. Then, as an open design question, propose a sensible computational domain and boundary conditions for (a) and (d), justifying the placement of each boundary.
::: solution
(a) Steady incompressible Navier–Stokes: elliptic overall (recirculation carries information in all directions, pressure is elliptic). Velocity on all four walls (no slip; moving lid). Solved simultaneously by iteration. The domain is the cavity itself; no artificial boundaries are needed, but pressure is fixed only up to a constant, so one reference value must be set.

(b) Boundary-layer equations: parabolic in $x$. Inflow profile at the leading edge, no slip at the wall, free-stream velocity at the edge, nothing at the downstream end. Marched in $x$.

(c) Transient conduction: parabolic in time. Initial temperature everywhere plus a thermal condition on every surface for all $t$ (temperature, flux or convection). Marched in time, each step being an elliptic solve if implicit.

(d) Steady supersonic Euler: hyperbolic in $x$. Everything is fixed on the supersonic inflow; tangency on the wedge surface; nothing at the outflow. Marched downstream. For (d) the inflow boundary must be upstream of the shock and the outflow can be anywhere downstream because no information returns; for (a) none of these issues arise. A good answer also notes that for elliptic external flows (subsonic aerofoils) the artificial far-field boundary must be placed many chords away — commonly tens of chords — because disturbances there are felt at the body.
:::
:::
