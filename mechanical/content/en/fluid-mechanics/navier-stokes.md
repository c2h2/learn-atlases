The Navier–Stokes equations are Newton's second law applied to a fluid element whose surface forces are assumed proportional to the **rate of strain** and not to the displacement. That one constitutive assumption — stated by Newton in the *Principia* of **1687**, given its tensor form by **Stokes** in **1845** — is the whole of the difficulty and the whole of the subject, because it converts a kinematic statement into a differential equation that nobody has proved solvable in three dimensions and that nature appears to solve, badly and turbulently, everywhere.

The equations are worth learning as objects in their own right and not as a formal step between [[fluid-mechanics/control-volume-analysis|control volumes]] and [[computational-fluid-dynamics]], for three reasons: **every exact solution you will ever use is one of them**, they tell you **exactly which terms you are neglecting** when you invoke Bernoulli or boundary-layer or creeping-flow theory, and the vorticity equation that falls out of them is the single most useful qualitative tool in the subject.

::: warning Seven Navier–Stokes errors that are invisible until the code diverges
**Taking the "Laplacian of the components" in curvilinear coordinates.** In Cartesian coordinates $\left( \nabla^2 \mathbf{V} \right)_x = \nabla^2 u$, but in cylindrical coordinates
$$
\left( \nabla^2 \mathbf{V} \right)_r = \nabla^2 v_r - \frac{v_r}{r^2} - \frac{2}{r^2} \frac{\partial v_{\theta}}{\partial \theta}
$$
**and the two extra terms are not optional.** A derivation of pipe flow that writes $\mu \nabla^2 v_z$ for the axial component gets away with it, because $v_z$ is the component along an axis of symmetry; the same shortcut applied to $v_{\theta}$ in a vortex loses the $v_\theta / r^2$ term and predicts $v_\theta = A \ln r + B$ instead of the correct combination $A r + B / r$. **Assuming the viscous term is $\mu \nabla^2 \mathbf{V}$ for a compressible fluid.** For a Newtonian fluid it is
$$
\nabla \cdot \boldsymbol{\tau} = \mu \nabla^2 \mathbf{V} + \left( \mu + \tfrac{1}{3} \mu_v \right) \nabla \left( \nabla \cdot \mathbf{V} \right)
$$
and the second term is **zero only for a constant-viscosity incompressible fluid**. In a boundary layer with strong wall cooling, in a shock wave and in an acoustic wave the term matters, and the **bulk viscosity** $\mu_v$ is not zero — for air at $20\ {}^{\circ}\mathrm{C}$ it is about $1.1 \times 10^{- 5}\ \mathrm{Pa\, s}$, roughly **$0.6\ \mu$**, and for carbon dioxide it is orders of magnitude larger than $\mu$. **Stokes's hypothesis that $\mu_v = 0$ is a convenience and not a law.** **Applying no-slip at a gas–liquid interface.** The correct conditions at an interface are **continuity of tangential velocity and of tangential stress**, and at a clean water–air interface the tangential stress is small, so the water surface is close to **shear-free**, not no-slip. **A clean-water surface behaves like a free surface, while a surfactant film can immobilise it so that it behaves more like a wall** — which is why bubble rise speeds and surface-wave damping depend on how clean the water is. **Forgetting that the equations are written for a specific frame.** In a rotating frame the Coriolis and centrifugal terms must be added, and the Coriolis term $2 \rho \boldsymbol{\Omega} \times \mathbf{V}$ is **not** a gradient and cannot be absorbed into the pressure. A weather-prediction code that omits it makes the large-scale wind blow straight down the pressure gradient instead of roughly along the isobars — about $90^{\circ}$ from the observed direction — and a turbomachinery code that omits it in a **rotating** frame gets the blade loading and the secondary flows wrong. **Dropping the unsteady term and calling the flow steady because the boundary conditions are.** The flow past a cylinder at $\mathrm{Re} = 200$ has steady inflow and a **periodic** wake; the flow in a manifold has steady inlet and an unstable global mode; and the flow in a hot-water pipe with $1\ \mathrm{Hz}$ valve dither has an oscillating Stokes layer of thickness $\sqrt{2 \nu / \omega} \approx 0.4\ \mathrm{mm}$ at the wall. **Steady boundary conditions do not imply a steady solution**, and the check is the eigenvalue problem, not the boundary conditions. **Using a Newtonian constitutive law for a fluid that is not one.** Blood, polymer solutions, clays, paints, mud, cement paste, drilling fluids, whipped cream and molten plastics are not Newtonian. **A few tens of parts per million of a long-chain polymer can cut a pipe's turbulent friction by up to about $70\ \%$** (the Toms effect), and a Newtonian Navier–Stokes code cannot reproduce it because the viscosity is a functional of the deformation history and not a number. **The warning is not that non-Newtonian flow is exotic but that the word "fluid" in the equation's name is a claim, and it is frequently false.** **Believing the solution because it converged.** A two-dimensional incompressible Navier–Stokes solution at $\mathrm{Re} = 10^{7}$ over a bluff body is a **steady** solution of an **unstable** problem, and it converges beautifully. The equations are right; the answer is not a flow. **Every CFD result must be checked against the flow's stability, not only against the residuals.**
:::

## The equations

::: definition The stress tensor and the constitutive law {#def-stress}
**The Cauchy stress relation.** The surface force per unit area on a plane of normal $\mathbf{n}$ is
$$
\mathbf{t}^{(n)} = \boldsymbol{\tau} \cdot \mathbf{n}, \qquad
\boldsymbol{\tau} = - p \mathbf{I} + \boldsymbol{\tau}'
$$
where $p$ is the **thermodynamic** pressure and $\boldsymbol{\tau}'$ the **deviatoric (viscous)** stress. Symmetry of $\boldsymbol{\tau}$ follows from the angular-momentum balance and removes six of the nine components.
**The Newtonian constitutive law.** The most general linear, isotropic relation between $\boldsymbol{\tau}'$ and the rate-of-strain tensor $\mathbf{S}$:
$$
\boxed{ \boldsymbol{\tau}' = 2 \mu \mathbf{S} + \lambda \left( \nabla \cdot \mathbf{V} \right) \mathbf{I}, \qquad
S_{ij} = \tfrac{1}{2} \left( \frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i} \right), \qquad
\lambda = \mu_v - \tfrac{2}{3} \mu }
$$
**In index notation**
$$
\tau_{ij} = - p \delta_{ij} + 2 \mu S_{ij} + \lambda S_{kk} \delta_{ij}
$$
**For a constant-viscosity incompressible fluid** $\nabla \cdot \mathbf{V} = 0$ and
$$
\tau_{ij} = - p \delta_{ij} + \mu \left( \frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i} \right)
$$
**The number that makes the bulk viscosity worth knowing.** The **acoustic attenuation** of a gas contains the factor $\tfrac{4}{3} \mu + \mu_v$, and for $\mathrm{CO_2}$ at atmospheric pressure and room temperature the measured attenuation is **many times** the classical Stokes–Kirchhoff value computed with $\mu_v = 0$. **The discrepancy is the bulk viscosity, and it is a molecular-relaxation effect**: the vibrational modes of the linear triatomic molecule cannot follow the compression, and the entropy produced in the lag is the extra attenuation. Monatomic gases have $\mu_v = 0$ exactly, because they have no internal modes.
:::

::: definition The Navier–Stokes equations {#def-ns}
**Momentum, in vector form**, for a constant-viscosity incompressible fluid:
$$
\boxed{ \rho \left[ \frac{\partial \mathbf{V}}{\partial t} + \left( \mathbf{V} \cdot \nabla \right) \mathbf{V} \right]
= - \nabla p + \mu \nabla^2 \mathbf{V} + \rho \mathbf{g} }
\qquad \text{with} \qquad
\nabla \cdot \mathbf{V} = 0
$$
**Four equations for four unknowns** $\left( u, v, w, p \right)$. **The system is closed** and there is nothing else to assume — which is the sense in which "the equations are solved" and "the flow is understood" are different statements.
**In index notation** (the form every CFD code implements):
$$
\frac{\partial u_i}{\partial t} + u_j \frac{\partial u_i}{\partial x_j}
= - \frac{1}{\rho} \frac{\partial p}{\partial x_i} + \nu \frac{\partial^2 u_i}{\partial x_j \partial x_j} + g_i,
\qquad
\frac{\partial u_j}{\partial x_j} = 0
$$
**The rotational form**, obtained with the identity $\left( \mathbf{V} \cdot \nabla \right) \mathbf{V} = \boldsymbol{\omega} \times \mathbf{V} + \nabla \left( V^2 / 2 \right)$:
$$
\frac{\partial \mathbf{V}}{\partial t} + \boldsymbol{\omega} \times \mathbf{V} + \nabla \left( \frac{V^2}{2} \right)
= - \frac{1}{\rho} \nabla p + \nu \nabla^2 \mathbf{V} \quad \text{(incompressible, constant } \mu \text{)}
$$
**The Lamb vector** $\mathbf{L} = \boldsymbol{\omega} \times \mathbf{V}$ is what remains when the irrotational part is absorbed into a **total** head $H = p / \rho + V^2 / 2 + g z$:
$$
\frac{\partial \mathbf{V}}{\partial t} = - \nabla H + \boldsymbol{\omega} \times \mathbf{V} + \nu \nabla^2 \mathbf{V}
$$
**The reading.** **Pressure gradients and body forces drive the flow; vorticity turns it; viscosity diffuses it.** A flow with no vorticity anywhere has $\mathbf{V} = - \nabla \phi$ and satisfies $\partial \mathbf{V} / \partial t = - \nabla \left( H \right)$, which is the unsteady Bernoulli equation — and the whole of potential-flow theory is the statement that $\boldsymbol{\omega} = 0$ is preserved by the equations when it is present initially and the boundaries are not generating any.
**The boundary conditions, which are part of the problem.**
$$
\begin{array}{l l l}
\text{Solid wall, viscous} & \mathbf{V} = \mathbf{V}_{\mathrm{wall}} & \text{no slip and no penetration} \\
\text{Solid wall, inviscid} & \mathbf{V} \cdot \mathbf{n} = 0 & \text{no penetration only} \\
\text{Free surface} & p = p_a,\ \mathbf{V} \cdot \mathbf{n} = 0,\ \boldsymbol{\tau} \cdot \mathbf{n} \parallel \mathbf{n} & \text{kinematic and dynamic} \\
\text{Symmetry plane} & \partial / \partial n = 0\ \text{for tangential } V,\ V_n = 0 & \\
\text{Inlet} & \mathbf{V} \text{ prescribed} & \\
\text{Outlet} & p \text{ prescribed, } \partial \mathbf{V} / \partial n = 0 & \text{or } \mathbf{V} \text{ prescribed} \\
\text{Far field} & \mathbf{V} \to \mathbf{V}_{\infty} &
\end{array}
$$
**The number that makes the boundary conditions the hard part.** Second-order in space, the viscous equations need **two** conditions per velocity component; the inviscid equations need **one**. **A no-slip condition cannot be imposed on an Euler solver**, and the difference is not a numerical inconvenience but the reason d'Alembert's paradox survives: the inviscid problem with a slip wall has a solution with zero drag, and the viscous problem with a no-slip wall has one with a finite drag, and **the limit $\mu \to 0$ is not uniform**.
:::

::: definition Vorticity, circulation and what viscosity does {#def-vort}
**The vorticity equation.** Taking the curl of the momentum equation, using $\nabla \times \nabla p \equiv 0$ for a barotropic fluid and $\nabla \times \nabla \left( V^2 / 2 \right) \equiv 0$:
$$
\boxed{ \frac{D \boldsymbol{\omega}}{D t} = \left( \boldsymbol{\omega} \cdot \nabla \right) \mathbf{V} + \nu \nabla^2 \boldsymbol{\omega} }
\qquad \text{(incompressible, constant } \mu \text{, no body-force curl)}
$$
**Three mechanisms and no others:** vorticity is **transported** by the flow, **stretched and tilted** by the velocity gradient, and **diffused** by viscosity. **There is no source term** — vorticity is created only at boundaries where no-slip acts, or by baroclinic generation $\nabla \rho \times \nabla p \ne 0$ when the fluid is not barotropic.
**The baroclinic term.** For a non-barotropic fluid the curl of $- \nabla p / \rho$ does not vanish:
$$
\left[ \nabla \times \left( - \frac{1}{\rho} \nabla p \right) \right] = \frac{\nabla \rho \times \nabla p}{\rho^2}
$$
**and this is the source of all circulation in a stratified or heated fluid** — sea breezes, the thermal wind and the vorticity generated where a flame front crosses a pressure gradient. **A barotropic, inviscid flow that starts irrotational stays irrotational; everything else in fluid mechanics is a violation of one of those three words.**
**Kelvin's circulation theorem.** For an inviscid, barotropic fluid with a conservative body force,
$$
\frac{D \Gamma}{D t} = 0
$$
**and the consequence is the topological statement that a material circuit carries its circulation for ever** — which is why a wing's starting vortex is shed rather than annihilated, and why aircraft trailing vortices persist long enough that air-traffic rules impose a minimum spacing between a heavy aircraft and the one following it.
**The diffusion of vorticity.** Where convection is negligible the equation is $\partial \boldsymbol{\omega} / \partial t = \nu \nabla^2 \boldsymbol{\omega}$ — **the heat equation**, with $\nu$ the thermal diffusivity of rotation. **The penetration depth after a time $t$ is $\delta \sim \sqrt{\nu t}$**, and the reason a vortex shed from an airfoil's tip survives a kilometre of flight is that $\sqrt{\nu t}$ over the ten seconds of flight is $\sqrt{1.5 \times 10^{- 5} \times 10} = 12\ \mathrm{mm}$ — **the vortex core is only a centimetre wider than when it was born**, and the reason it nevertheless decays over minutes is the secondary flow it induces in itself, not diffusion.
**The Reynolds number, from the equations.** Nondimensionalising with $U, L$:
$$
\underbrace{\frac{\partial \mathbf{V}^{*}}{\partial t^{*}} + \left( \mathbf{V}^{*} \cdot \nabla^{*} \right) \mathbf{V}^{*}}_{\text{inertia}}
= - \nabla^{*} p^{*} + \frac{1}{\mathrm{Re}} \nabla^{*2} \mathbf{V}^{*} + \frac{1}{\mathrm{Fr}^2} \hat{\mathbf{g}},
\qquad
\mathrm{Re} = \frac{U L}{\nu}, \quad \mathrm{Fr} = \frac{U}{\sqrt{g L}}
$$
**The number that makes the limit singular.** As $\mathrm{Re} \to \infty$ the equations **lose their highest derivative**, and a boundary layer of thickness $\delta \sim L / \sqrt{\mathrm{Re}}$ forms in which the neglected terms are not negligible. **This is why the inviscid limit is not an approximation but a different problem**, and why Prandtl's 1904 boundary layer is the only route between them.
:::

::: widget plot
f: exp(-x)*cos(6.2832*0.25 - x); exp(-x)
x: 0, 4
y: -0.6, 1.05
labels: u/U = exp(-y/delta) cos(omega t - y/delta) at omega t = pi/2; envelope exp(-y/delta)
caption: Stokes' second problem — a flat plate oscillating sinusoidally in its own plane at frequency $\omega$ in a fluid otherwise at rest. The disturbance penetrates to a depth $\delta = \sqrt{2 \nu / \omega}$ and decays as $e^{- y / \delta}$ while **lagging in phase by $y / \delta$ radians**, so the fluid at $y = \pi \delta$ is half a cycle behind the plate and moving the **wrong way** — the negative lobe between $\pi \delta$ and $2 \pi \delta$ in the snapshot. **There is no steady state**: the flow is periodic at every depth after one or two periods, and the time-averaged streaming is second order in the amplitude. The curve is the exact solution $u / U = e^{- \eta} \cos \left( \omega t - \eta \right)$, $\eta = y / \delta$, at $\omega t = \pi / 2$. **The number that makes this a design case and not an exercise:** for a heartbeat at $1.2\ \mathrm{Hz}$ in blood with $\nu = 3.3 \times 10^{- 6}\ \mathrm{m^2 / s}$, $\delta = 0.94\ \mathrm{mm}$ against an aortic radius of $10\ \mathrm{mm}$, so the **Womersley number** $\alpha = R \sqrt{\omega / \nu} = 15.1$ and the velocity profile is **flat with boundary layers** rather than parabolic — the reason pulsatile flow in large arteries cannot be computed from Poiseuille's law.
:::

## Exact solutions

::: definition The unidirectional flows {#def-exact}
**The class.** A flow with $\mathbf{V} = \left( u \left( y, t \right), 0, 0 \right)$ and $\partial p / \partial x$ a function of $t$ only. Continuity is satisfied identically, the convective term vanishes because $\partial u / \partial x = 0$, and the $x$-momentum equation collapses to
$$
\rho \frac{\partial u}{\partial t} = - \frac{\partial p}{\partial x} + \mu \frac{\partial^2 u}{\partial y^2}
$$
— a **one-dimensional diffusion equation with a source** — **and every member of the class is an integral of it.**
**Steady plane Couette flow.** $\partial p / \partial x = 0$, plates at $y = 0$ and $y = h$, the upper moving at $U$:
$$
u = U \frac{y}{h}, \qquad \tau_w = \mu \frac{U}{h}, \qquad
P = \tau_w U = \frac{\mu U^2}{h} \quad \left[ \mathrm{W / m^2} \right]
$$
**The worked case.** Two plates $2\ \mathrm{mm}$ apart with $U = 3\ \mathrm{m / s}$ and an oil of $\mu = 0.1\ \mathrm{Pa\, s}$ over $0.5\ \mathrm{m^2}$:
$$
\tau_w = 0.1 \times \frac{3}{0.002} = 150\ \mathrm{Pa}, \qquad
F = 75\ \mathrm{N}, \qquad P = 225\ \mathrm{W}
$$
**The number that makes a viscometer out of this.** The Couette geometry measures $\mu$ by measuring $F$ at a known $U$, and the reason a **rotating** Couette is used rather than a sliding one is that the sliding type has end effects and a finite plate, while the annulus has neither. **The gap must be small compared with the radius** — at a gap-to-radius ratio of $0.1$ the curvature correction to $\tau_w$ is $10\ \%$, and the reason a precision rheometer runs at $0.02$ is that the correction is then $2\ \%$ and calculable.
**Steady plane Poiseuille flow.** $U = 0$, $\partial p / \partial x = - G$:
$$
u = \frac{G}{2 \mu} y \left( h - y \right), \qquad
\bar{u} = \frac{G h^2}{12 \mu}, \qquad
u_{\max} = \tfrac{3}{2} \bar{u}, \qquad
\tau_w = \frac{G h}{2}
$$
**Steady circular Poiseuille (Hagen–Poiseuille) flow.**
$$
u = \frac{1}{4 \mu} \left( - \frac{d p}{d x} \right) \left( R^2 - r^2 \right), \qquad
\boxed{ Q = - \frac{\pi R^4}{8 \mu} \frac{d p}{d x} = \frac{\pi D^4 \Delta p}{128 \mu L} }
$$
$$
\bar{u} = \frac{1}{2} u_{\max}, \qquad
\tau_w = \frac{\Delta p\, R}{2 L}, \qquad
\mathrm{Re} = \frac{\rho \bar{u} D}{\mu}, \qquad
f = \frac{64}{\mathrm{Re}}
$$
**The worked case.** Oil of $\mu = 0.3\ \mathrm{Pa\, s}$ and $\rho = 890\ \mathrm{kg / m^3}$ through $30\ \mathrm{m}$ of $25\ \mathrm{mm}$ bore at $\Delta p = 1\ \mathrm{MPa}$:
$$
Q = \frac{\pi \times 0.025^4 \times 10^6}{128 \times 0.3 \times 30} = \frac{1.227 \times 10^{- 6} \times 10^6}{1{,}152} = 1.065 \times 10^{- 3}\ \mathrm{m^3 / s} = 3.83\ \mathrm{m^3 / h}
$$
$$
\bar{u} = 2.17\ \mathrm{m / s}, \qquad
\mathrm{Re} = \frac{890 \times 2.17 \times 0.025}{0.3} = 161 \ll 2{,}300 \quad \checkmark\ \text{laminar}
$$
**The number that makes the fourth power the whole design.** **Doubling the bore multiplies the flow by sixteen at the same pressure, or cuts the pressure by a factor of sixteen at the same flow.** A hydraulic system whose flow is short by $20\ \%$ can be fixed by a $5\ \%$ increase in bore and nothing else — and the reason a hydraulic designer's first question is "what is the smallest orifice in the line" is that $Q \propto D^4$ makes the smallest bore the whole of the resistance.
**The combined Couette–Poiseuille flow.** A moving plate with a pressure gradient:
$$
u = \frac{G h^2}{2 \mu} \frac{y}{h} \left( 1 - \frac{y}{h} \right) + U \left( 1 - \frac{y}{h} \right)
$$
(the plate at $y = 0$ moving at $U$, the plate at $y = h$ fixed). **The flow reverses near the stationary wall when the pressure gradient is adverse** ($G < 0$) **and** $\left| G \right| h^2 / \left( 2 \mu U \right) > 1$, because the wall shear there, $\mu \left( \partial u / \partial y \right)_{y = h} = - G h / 2 - \mu U / h$, then changes sign. **This is the simplest model of separation in a lubricant film or a diffuser: an adverse pressure gradient strong enough to overcome the shear-driven flow next to a wall.**
**The film down an inclined wall.** A gravity-driven film of thickness $h$ at an angle $\beta$, with a shear-free surface:
$$
u = \frac{\rho g \sin \beta}{\mu} \left( h y - \frac{y^2}{2} \right), \qquad
\Gamma = \frac{\rho^2 g \sin \beta\, h^3}{3 \mu}, \qquad
h = \left( \frac{3 \mu \Gamma}{\rho^2 g \sin \beta} \right)^{1 / 3}
$$
**The worked case.** A falling-film evaporator carrying $\Gamma = 0.05\ \mathrm{kg / m\, s}$ of water at $100\ {}^{\circ}\mathrm{C}$ ($\mu = 2.82 \times 10^{- 4}$, $\rho = 958$) vertically:
$$
h = \left( \frac{3 \times 2.82 \times 10^{- 4} \times 0.05}{958^2 \times 9.81} \right)^{1 / 3}
= \left( 4.70 \times 10^{- 12} \right)^{1 / 3} = 1.68 \times 10^{- 4}\ \mathrm{m} = 0.168\ \mathrm{mm}
$$
**The number that makes a falling-film evaporator work.** The **thermal resistance of a laminar film is about $h / k$, so the film thickness sets the heat-transfer coefficient**, and the reason the device runs at the lowest wetting rate that still covers the tube is that the coefficient scales as $k / h \propto \Gamma^{-1/3}$ — doubling the flow thickens the film by $26\ \%$ and **lowers** the film coefficient by about $21\ \%$.
:::

::: definition Creeping flow {#def-creep}
**The equations at $\mathrm{Re} \ll 1$.** The inertia terms are dropped and the momentum equation becomes **linear**:
$$
\mu \nabla^2 \mathbf{V} = \nabla p, \qquad \nabla \cdot \mathbf{V} = 0
$$
**The Stokeslet**, the fundamental solution — the velocity field of a point force $\mathbf{F}$:
$$
u_i = \frac{F_j}{8 \pi \mu} \left( \frac{\delta_{ij}}{r} + \frac{x_i x_j}{r^3} \right), \qquad
p = \frac{F_j x_j}{4 \pi r^3}
$$
**The velocity decays as $1 / r$ and the pressure as $1 / r^2$** — far slower than a three-dimensional potential flow's $1 / r^2$ — and the consequence is **Stokes's paradox**: the two-dimensional creeping-flow problem around a cylinder has **no solution**, because the $1 / r$ far field makes the neglected inertia term grow without bound however small $\mathrm{Re}$ is. **The fix is Oseen's equation**, which linearises the convective term about the free stream and gives the **Oseen correction**
$$
F_D = 3 \pi \mu U D \left( 1 + \frac{3}{8} \mathrm{Re} \right)
$$
**valid to $\mathrm{Re} \approx 1$ and the reason a sedimentation calculation at $\mathrm{Re} = 1$ is wrong by $38\ \%$ if Stokes's law is used.**
**The sphere.**
$$
\boxed{ F_D = 3 \pi \mu U D }
\qquad
C_D = \frac{24}{\mathrm{Re}}, \qquad
u_r = \frac{2}{9} \frac{\left( \rho_s - \rho \right) g R^2}{\mu}
$$
**The worked case: a settling grain.** A $0.05\ \mathrm{mm}$ grain of very fine sand ($\rho_s = 2{,}650$) in water at $20\ {}^{\circ}\mathrm{C}$; with $D = 2 R$ the settling formula is $u_r = \left( \rho_s - \rho \right) g D^2 / \left( 18 \mu \right)$:
$$
u_r = \frac{\left( 2{,}650 - 998 \right) \times 9.81 \times \left( 5 \times 10^{- 5} \right)^2}{18 \times 1.002 \times 10^{- 3}}
= \frac{4.052 \times 10^{- 5}}{1.804 \times 10^{- 2}} = 2.25 \times 10^{- 3}\ \mathrm{m / s}
$$
$$
\mathrm{Re} = \frac{998 \times 2.25 \times 10^{- 3} \times 5 \times 10^{- 5}}{1.002 \times 10^{- 3}} = 0.112 < 1 \quad \checkmark
$$
**The number that makes the check mandatory.** At $\mathrm{Re} = 0.112$ the Oseen correction is $1 + 3 \mathrm{Re} / 8 = 1.042$, so Stokes's law understates the drag by about $4\ \%$ and overstates the settling velocity by about the same. **A $0.1\ \mathrm{mm}$ grain gives a Stokes velocity of $9.0\ \mathrm{mm / s}$ at $\mathrm{Re} \approx 0.9$, where the Oseen factor is already $1.34$**, and the reason a sediment-transport calculation uses an empirical settling law such as **Ferguson and Church**'s and not Stokes's is that natural sands are mostly in the transition.
**The number that makes a hydrometer and a centrifuge work.** For a $10\ \mu\mathrm{m}$ silt particle the settling velocity is $90\ \mu\mathrm{m / s}$ — **about $8\ \mathrm{m}$ a day** — and finer clay particles settle a hundred times slower still, which is why a water-treatment clarifier has a retention time of hours, why particles are flocculated before settling, and why a **tube settler**, a stack of inclined tubes a few centimetres across, works: it cuts the distance a particle must fall before reaching a surface from metres to centimetres.
**The mobility of a suspension.** Einstein's result (**1906**, with the coefficient corrected in **1911**) for the viscosity of a dilute suspension of rigid spheres,
$$
\frac{\mu_{\mathrm{eff}}}{\mu} = 1 + 2.5 \phi
$$
**is exact in the limit $\phi \to 0$** and gives $1.75$ at $\phi = 0.3$; at that concentration the particle interactions it neglects already matter, and the Krieger–Dougherty law $\mu_{\mathrm{eff}} / \mu = \left( 1 - \phi / \phi_m \right)^{- 2.5 \phi_m}$ with random close packing $\phi_m = 0.64$ gives $\left( 1 - 0.3 / 0.64 \right)^{- 1.6} = 2.75$ — and diverges as $\phi \to \phi_m$, which is why a concentrated ceramic slip is a paste.
:::

## Worked cases

::: example Deriving a flow from the equations {#ex-derive}
Derive the velocity profile, the flow rate and the wall stress for steady laminar flow in an **annulus** of inner radius $\kappa R$ and outer radius $R$ driven by a pressure gradient $G$, find the radius of maximum velocity, and evaluate the wall stresses and the flow rate (as a fraction of the full-pipe flow) for $\kappa = 0.5$.
::: solution
**The $z$-momentum equation.** With $\mathbf{V} = \left( 0, 0, u \left( r \right) \right)$, continuity is satisfied identically, the convective terms vanish, and the Laplacian of the **axial** component in cylindrical coordinates is the scalar one because the axis of symmetry is along $z$:
$$
\frac{1}{r} \frac{d}{d r} \left( r \frac{d u}{d r} \right) = \frac{1}{\mu} \frac{d p}{d z} = - \frac{G}{\mu}
$$
**The integration.**
$$
r \frac{d u}{d r} = - \frac{G r^2}{2 \mu} + C_1
\quad \Rightarrow \quad
u = - \frac{G r^2}{4 \mu} + C_1 \ln r + C_2
$$
**The boundary conditions** $u \left( \kappa R \right) = u \left( R \right) = 0$:
$$
C_1 = \frac{G R^2 \left( 1 - \kappa^2 \right)}{4 \mu \ln \left( 1 / \kappa \right)}, \qquad
C_2 = \frac{G R^2}{4 \mu} - C_1 \ln R
$$
**collected as**
$$
\boxed{ u \left( r \right) = \frac{G R^2}{4 \mu} \left[ 1 - \left( \frac{r}{R} \right)^2 + \frac{1 - \kappa^2}{\ln \left( 1 / \kappa \right)} \ln \left( \frac{r}{R} \right) \right] }
$$
**The flow rate.**
$$
Q = \frac{\pi G R^4}{8 \mu} \left[ \left( 1 - \kappa^4 \right) - \frac{\left( 1 - \kappa^2 \right)^2}{\ln \left( 1 / \kappa \right)} \right]
$$
**The checks.** As $\kappa \to 0$ the bracket tends to $1$ and $Q$ becomes the circular-pipe result ✓. As $\kappa \to 1$ with gap $b = \left( 1 - \kappa \right) R$, expanding in $\varepsilon = 1 - \kappa$ gives a bracket $\to \tfrac{4}{3} \varepsilon^3$, so $Q \to \pi G R^4 \varepsilon^3 / \left( 6 \mu \right) = G \left( 2 \pi R \right) b^3 / \left( 12 \mu \right)$, the plane-slot result for a slot of width $2 \pi R$ ✓.
**The wall stresses and the radius of maximum velocity.** From $u(r)$,
$$
\tau_{r z} = - \mu \frac{d u}{d r} = \frac{G}{2} \left[ r - \frac{\lambda^2 R^2}{r} \right], \qquad
\lambda^2 = \frac{1 - \kappa^2}{2 \ln \left( 1 / \kappa \right)}
$$
The shear vanishes, and the velocity is a maximum, at $r = \lambda R$. At the walls
$$
\left| \tau_{\mathrm{outer}} \right| = \frac{G R}{2} \left( 1 - \lambda^2 \right), \qquad
\left| \tau_{\mathrm{inner}} \right| = \frac{G R}{2 \kappa} \left( \lambda^2 - \kappa^2 \right)
$$
**The numbers for** $\kappa = 0.5$: $\ln 2 = 0.693$, $\lambda^2 = 0.75 / 1.386 = 0.541$, $\lambda = 0.736$:
$$
\left| \tau_{\mathrm{outer}} \right| = 0.459\, \frac{G R}{2}, \qquad
\left| \tau_{\mathrm{inner}} \right| = \frac{0.541 - 0.25}{0.5}\, \frac{G R}{2} = 0.582\, \frac{G R}{2}
$$
**The inner wall carries $1.27$ times the stress of the outer**, and the maximum velocity sits at $r = 0.736 R$, inside the middle of the gap ($0.75 R$) — the profile leans towards the inner wall, whose smaller circumference must carry its share of the load at a higher stress. **Force check:** the shear forces on the two walls per unit length must balance the pressure force on the annular area, $2 \pi R \left| \tau_{\mathrm{outer}} \right| + 2 \pi \kappa R \left| \tau_{\mathrm{inner}} \right| = G \pi R^2 \left( 1 - \kappa^2 \right)$; in units of $\pi G R^2$ this is $0.459 + 0.5 \times 0.582 = 0.750 = 1 - 0.25$ ✓.
**The flow rate.**
$$
\frac{Q}{Q_{\mathrm{pipe}}} = \left( 1 - \kappa^4 \right) - \frac{\left( 1 - \kappa^2 \right)^2}{\ln \left( 1 / \kappa \right)} = 0.9375 - \frac{0.5625}{0.6931} = 0.126
$$
**Removing the central quarter of the area cuts the flow to an eighth.** The core is where a pipe's velocity is highest, and the inner wall adds a second no-slip surface; this is why the annulus of a double-pipe heat exchanger needs a much larger pressure drop per unit flow than its open area suggests.
*Sanity.* The logarithmic term is the $C_1 \ln r$ solution of the homogeneous equation, the **two-dimensional source** solution, and it is present because the annulus has an inner wall. **In a full pipe the constant $C_1$ must vanish to keep the velocity finite at $r = 0$, and that single requirement is the whole difference between the two problems.**
:::
:::

::: example Stokes' first problem and a quench {#ex-stokes1}
A steel strip at $900\ {}^{\circ}\mathrm{C}$ is plunged into an oil bath at $60\ {}^{\circ}\mathrm{C}$. Treat the oil as an infinite medium and the interface as an isothermal step, and find the thermal-boundary-layer thickness after $10\ \mathrm{s}$, the instantaneous heat flux, and the total energy extracted per unit area. Then do the same for the **velocity** field, taking the strip's withdrawal speed as $0.8\ \mathrm{m / s}$.
::: solution
**The thermal problem.** With $T - T_{\infty} = \left( T_w - T_{\infty} \right) \operatorname{erfc} \left( y / 2 \sqrt{\alpha t} \right)$:
$$
\delta_T \approx 4 \sqrt{\alpha t}
$$
For an oil with $k = 0.13\ \mathrm{W / m\, K}$, $\rho = 880$, $c_p = 2{,}000$, $\alpha = 7.39 \times 10^{- 8}\ \mathrm{m^2 / s}$:
$$
\delta_T = 4 \sqrt{7.39 \times 10^{- 8} \times 10} = 4 \times 8.60 \times 10^{- 4} = 3.44\ \mathrm{mm}
$$
$$
q_w = \frac{k \left( T_w - T_{\infty} \right)}{\sqrt{\pi \alpha t}}
= \frac{0.13 \times 840}{\sqrt{\pi \times 7.39 \times 10^{- 7}}} = \frac{109.2}{1.524 \times 10^{- 3}} = 71.7\ \mathrm{kW / m^2}
$$
$$
\frac{Q}{A} = 2 \left( T_w - T_{\infty} \right) \sqrt{\frac{k \rho c_p t}{\pi}}
= 2 \times 840 \times \sqrt{\frac{0.13 \times 880 \times 2000 \times 10}{\pi}} = 1{,}680 \times 853 = 1.43\ \mathrm{MJ / m^2}
$$
**The number that makes a quench tank's size a heat problem.** $1.43\ \mathrm{MJ}$ per square metre of strip, on both faces, with strip entering at $0.8\ \mathrm{m / s}$ (each metre of strip spending ten seconds in the bath) is
$$
\dot{Q} = 2 \times 1.43 \times 10^6 \times 0.8 = 2.29\ \mathrm{MW\ per\ metre\ of\ strip\ width}
$$
**and the reason an oil quench line has a cooling loop rated in megawatts is this number.** For comparison, a $2\ \mathrm{mm}$ strip cooling from $900\ {}^{\circ}\mathrm{C}$ to $60\ {}^{\circ}\mathrm{C}$ gives up $490 \times 7{,}850 \times 0.002 \times 840 = 6.5\ \mathrm{MJ / m^2}$ of strip, so in the first ten seconds the semi-infinite-oil model extracts about $2 \times 1.43 / 6.5 = 44\ \%$ of it; beyond that the model fails, because the strip's own temperature has fallen well below $900\ {}^{\circ}\mathrm{C}$.
**The velocity problem.** Stokes' first problem gives $u / U = \operatorname{erfc} \left( y / 2 \sqrt{\nu t} \right)$ and a momentum-layer thickness
$$
\delta = 4 \sqrt{\nu t}
$$
For the oil with $\nu = 6.0 \times 10^{- 5}\ \mathrm{m^2 / s}$:
$$
\delta = 4 \sqrt{6.0 \times 10^{- 5} \times 10} = 4 \times 0.0245 = 98\ \mathrm{mm}
$$
**The Prandtl number is $\mathrm{Pr} = \nu / \alpha = 812$, so $\delta / \delta_T = \sqrt{\mathrm{Pr}} = 28.5$** — **the velocity field penetrates twenty-eight times deeper than the temperature field**, and the thermal layer sits deep inside a much thicker layer of oil that the strip drags along with it, so the strip's motion, not the natural convection appropriate to a stationary surface, controls how the hot oil next to it is renewed.
**The shear on the strip.**
$$
\tau_w = \mu \frac{U}{\sqrt{\pi \nu t}} = \frac{\rho \nu U}{\sqrt{\pi \nu t}}
= \frac{880 \times 6.0 \times 10^{- 5} \times 0.8}{\sqrt{\pi \times 6.0 \times 10^{- 4}}} = \frac{0.04224}{0.04342} = 0.97\ \mathrm{Pa}
$$
**Under a pascal** — on both faces of a $1\ \mathrm{m}$-wide, $2\ \mathrm{mm}$-thick strip it adds a tension of about $1.9\ \mathrm{N}$ per metre of immersed length, a stress of about $1\ \mathrm{kPa}$ per metre, negligible against a flow stress of order $100\ \mathrm{MPa}$, which is why the strip's tension is set by the drive rolls and not by the quench drag.
*Sanity.* The reason the two penetration depths are $\sqrt{\nu t}$ and $\sqrt{\alpha t}$ and not both $\sqrt{\nu t}$ is that **momentum and heat diffuse at different rates**, and the ratio $\sqrt{\mathrm{Pr}}$ is the analogue of the hydrodynamic-to-thermal boundary-layer thickness ratio in steady flow. **For liquid metals $\mathrm{Pr} \ll 1$ and the heat penetrates far deeper than the motion; for oils $\mathrm{Pr} \gg 1$ and the reverse.**
:::
:::

::: example Stability of a rotating flow {#ex-taylor}
Two cylinders of radii $0.10$ and $0.20\ \mathrm{m}$ carry a glycerin-like fluid ($\nu = 1.2 \times 10^{- 3}\ \mathrm{m^2 / s}$). Test the **Rayleigh centrifugal stability criterion** for (a) the inner cylinder at $10\ \mathrm{rad / s}$ and the outer at rest, and (b) the inner at $10$ and the outer at $5\ \mathrm{rad / s}$, and find the critical speed for case (a).
::: solution
**The criterion.** For an inviscid rotating flow the specific angular momentum is $r V_{\theta}$, and Rayleigh's **1917** result is that the flow is stable to axisymmetric disturbance if and only if
$$
\frac{d}{d r} \left( r^4 \Omega^2 \right) \ge 0 \quad \text{everywhere}
$$
**The Couette solution.** $\Omega = A + B / r^2$, so $r^4 \Omega^2 = \left( A r^2 + B \right)^2$ and
$$
\frac{d}{d r} \left( r^4 \Omega^2 \right) = 4 A r \left( A r^2 + B \right)
$$
**Case (a).** $\Omega \left( 0.1 \right) = 10$, $\Omega \left( 0.2 \right) = 0$:
$$
A + \frac{B}{0.01} = 10, \qquad A + \frac{B}{0.04} = 0
\quad \Rightarrow \quad B \left( 100 - 25 \right) = 10
\quad \Rightarrow \quad B = 0.1333, \quad A = - 3.333
$$
$$
\left. \frac{d}{d r} \left( r^4 \Omega^2 \right) \right|_{r = 0.15} = 4 \times \left( - 3.333 \right) \times 0.15 \times \left[ - 3.333 \times 0.0225 + 0.1333 \right]
= - 2.0 \times 0.0583 = - 0.117 < 0
$$
**Unstable.** The angular-momentum distribution has a maximum inside the gap, and the flow breaks into **Taylor vortices** — counter-rotating tori stacked along the axis, of axial wavelength approximately equal to the gap.
**Case (b).** $\Omega \left( 0.1 \right) = 10$, $\Omega \left( 0.2 \right) = 5$:
$$
B \left( 100 - 25 \right) = 10 - 5 = 5 \quad \Rightarrow \quad B = 0.0667, \quad A = 3.333
$$
$$
A r^2 + B = 3.333 r^2 + 0.0667 > 0 \quad \text{for all } r, \qquad A > 0
$$
**Stable everywhere.** The criterion is satisfied because the outer cylinder carries more angular momentum per unit mass ($\Omega_o r_o^2 = 0.2$) than the inner ($\Omega_i r_i^2 = 0.1$), and in the inviscid theory no amount of rotation at that ratio destabilises it — the reason Couette viscometers that rotate the **outer** cylinder stay laminar to much higher speeds than those that rotate the inner one.
**The critical speed for case (a).** Viscosity **raises** the threshold: the inviscid criterion says case (a) is unstable at any speed, but a disturbance must also overcome viscous damping. For a **narrow** gap with the outer cylinder at rest the classical result is a critical **Taylor number**
$$
T a = \frac{\Omega_i^2 r_i d^3}{\nu^2} \approx 1{,}708
\quad \text{(narrow gap, outer cylinder at rest)}
$$
With $r_i = 0.10$, $d = 0.10$, $\nu = 1.2 \times 10^{- 3}$ it would give
$$
\Omega_{i, c} = \sqrt{\frac{1{,}708 \times \left( 1.2 \times 10^{- 3} \right)^2}{0.10 \times 0.10^3}}
= \sqrt{\frac{2.460 \times 10^{- 3}}{1.0 \times 10^{- 4}}} = \sqrt{24.6} = 5.0\ \mathrm{rad / s}
$$
**but the gap here is not narrow** ($d / r_i = 1.0$), and for a wide gap the stability boundary must be computed numerically. For radius ratio $\eta = r_i / r_o = 0.5$ the computed critical inner-cylinder Reynolds number is $\mathrm{Re}_{i, c} \approx 68$, with $\mathrm{Re}_i = \Omega_i r_i d / \nu$:
$$
\Omega_{i, c} = \frac{68 \times 1.2 \times 10^{- 3}}{0.10 \times 0.10} = 8.2\ \mathrm{rad / s}, \qquad
\mathrm{Re}_i \left( 10\ \mathrm{rad / s} \right) = \frac{10 \times 0.10 \times 0.10}{1.2 \times 10^{- 3}} = 83.3 > 68 \quad \Rightarrow \quad \text{unstable}
$$
**The critical speed is about $8.2\ \mathrm{rad / s}$, so case (a) at $10\ \mathrm{rad / s}$ is just past onset** and will show Taylor vortices; the narrow-gap formula, used outside its range, would have put the threshold at $5\ \mathrm{rad / s}$. **The number that makes a rheometer's range a stability limit:** above $\mathrm{Re}_{i, c}$ the measured torque rises above the laminar value because of the secondary circulation, and a viscometer that rotates its inner cylinder must keep its gap Reynolds number below the critical value for its geometry.
*Sanity.* The inviscid criterion says "unstable" and the viscous one says "unstable only above $8.2\ \mathrm{rad / s}$" because viscosity **damps the circulation** that the centrifugal instability would create. **Rayleigh's inviscid criterion is a necessary condition for this instability, not a sufficient one**, and it is still taught because it identifies **which** flows can be destabilised at all — case (b) never (to axisymmetric disturbances), case (a) above a threshold.
:::
:::

::: example The stress tensor at a point {#ex-stress}
A flow has $\mathbf{V} = \left( x^2 y,\ - x y^2,\ 0 \right)$ in SI units with lengths in metres, and a fluid of $\mu = 0.05\ \mathrm{Pa\, s}$ and a local pressure of $200\ \mathrm{kPa}$. Find the stress tensor at $\left( 1, 2, 0 \right)$, the principal stresses, and the maximum shear stress.
::: solution
**The check first.**
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 2 x y - 2 x y = 0 \quad \checkmark\ \text{incompressible}
$$
**The rate-of-strain tensor.**
$$
S_{xx} = \frac{\partial u}{\partial x} = 2 x y = 4, \qquad
S_{yy} = \frac{\partial v}{\partial y} = - 2 x y = - 4, \qquad
S_{zz} = 0
$$
$$
S_{xy} = \tfrac{1}{2} \left( \frac{\partial u}{\partial y} + \frac{\partial v}{\partial x} \right)
= \tfrac{1}{2} \left( x^2 - y^2 \right) = \tfrac{1}{2} \left( 1 - 4 \right) = - 1.5
$$
**The stress tensor** (with $\nabla \cdot \mathbf{V} = 0$, so $\lambda$ does not enter):
$$
\boldsymbol{\tau} = - p \mathbf{I} + 2 \mu \mathbf{S}
= \begin{pmatrix} - 200{,}000 + 0.1 \times 4 & 0.1 \times \left( - 1.5 \right) & 0 \\ 0.1 \times \left( - 1.5 \right) & - 200{,}000 - 0.4 & 0 \\ 0 & 0 & - 200{,}000 \end{pmatrix}
= \begin{pmatrix} - 199{,}999.6 & - 0.15 & 0 \\ - 0.15 & - 200{,}000.4 & 0 \\ 0 & 0 & - 200{,}000 \end{pmatrix}
$$
**The principal stresses.** The $z$-direction is already principal with $\sigma_3 = - 200{,}000\ \mathrm{Pa}$. In the $x$–$y$ plane:
$$
\sigma_{1,2} = \frac{\tau_{xx} + \tau_{yy}}{2} \pm \sqrt{\left( \frac{\tau_{xx} - \tau_{yy}}{2} \right)^2 + \tau_{xy}^2}
= - 200{,}000 \pm \sqrt{0.16 + 0.0225} = - 200{,}000 \pm 0.427
$$
$$
\sigma_1 = - 199{,}999.57, \qquad \sigma_2 = - 200{,}000.43, \qquad \sigma_3 = - 200{,}000.00\ \mathrm{Pa}
$$
**The maximum shear stress.**
$$
\tau_{\max} = \frac{\sigma_1 - \sigma_2}{2} = 0.427\ \mathrm{Pa}
$$
**The reading.** The **pressure is $200\ \mathrm{kPa}$ and the viscous stress is $0.4\ \mathrm{Pa}$** — a ratio of $5 \times 10^5$. **The principal stresses are, to five significant figures, all equal to $- p$, and the entire viscous effect is in the third decimal place.** This is why a flush wall pressure tap reads the local pressure essentially without viscous error, and why a tap with a **burr** on its edge is in error: the error is not viscous, it is the pressure field distorted by the geometry.
**Normal stresses in a Newtonian fluid.** Here $\tau_{xx} - \tau_{yy} = 2 \mu \left( S_{xx} - S_{yy} \right) = 0.8\ \mathrm{Pa}$ is nonzero because the flow is locally **extensional**: the fluid is stretched along one direction and compressed along the other. In a **simple shear** flow, by contrast, a Newtonian fluid has $S_{xx} = S_{yy} = 0$ and hence zero normal-stress difference $N_1 = \tau_{xx} - \tau_{yy}$, which is why a measurable $N_1$ in a rheometer's shear flow is the signature of a non-Newtonian (viscoelastic) fluid. **The same symbol means different things in the two settings, and the only defence is to write down the flow in which it is measured.**
:::
:::

::: history
**Newton** proposed in the *Principia* (**1687**, Book II, Section IX) that the resistance arising from the "lack of slipperiness" of a fluid is proportional to the velocity with which its parts are separated — the linear stress–rate-of-strain idea, stated in words. **Euler** wrote the inviscid equations of motion in **1755** (published 1757). **Navier** added a viscous term in a memoir read in **1822**, derived from a model of molecular forces; **Cauchy**, **Poisson** and **Saint-Venant** reached equivalent forms in the following two decades by different routes; and **Stokes** in **1845** derived the equations from continuum assumptions alone, adopting the hypothesis that the mean normal stress equals the pressure — the $\mu_v = 0$ assumption that bears his name and that does not hold for polyatomic gases. **The exact solutions followed**: **Hagen** published his pipe-flow measurements in **1839** and **Poiseuille**, a physician interested in blood flow, published his capillary-tube experiments in **1840–41**; **Stokes** obtained the drag on a slowly moving sphere and the flow near an oscillating plane in his **1851** paper on the internal friction of fluids and the motion of pendulums; **Hiemenz** found the stagnation-point solution in his **1911** Göttingen dissertation under **Prandtl**. **Couette** built his rotating-cylinder viscometer in **1890**, **Rayleigh** gave the inviscid centrifugal stability criterion in **1917**, and **G. I. Taylor**'s **1923** paper combined theory and experiment to predict and observe the vortices that bear his name. **The existence and smoothness problem for the three-dimensional equations is one of the seven Millennium Prize Problems announced by the Clay Mathematics Institute in 2000, with a prize of one million dollars, and remains unsolved.**
:::

::: quiz
Couette flow between a fixed lower plate and an upper plate moving at $U$ is opposed by an **adverse** pressure gradient $\mathrm{d}p / \mathrm{d}x > 0$, and the gradient is increased until the wall shear on the *lower* plate is exactly zero. At that setting:

- [ ] The flow reverses somewhere in the channel
- [x] The velocity gradient at the lower wall is zero; any stronger adverse pressure gradient makes $\partial u / \partial y$ negative there, and that is the onset of separation
- [ ] The viscosity vanishes at the wall
- [ ] The profile becomes symmetric about the centreline

::: solution
**The profile meets the lower wall with zero slope.** $\tau_w = \mu ( \partial u / \partial y )_{y = 0 } = 0$ means the shear the moving plate would have imposed is exactly cancelled by the adverse pressure gradient's own contribution to the slope, so the fluid next to the wall is neither dragged forward nor held back. The flow does not yet reverse anywhere. Push the pressure gradient a little harder and $\partial u / \partial y$ at the wall goes negative: fluid next to the wall runs backwards, the streamlines leave the surface, and **that is Prandtl's criterion for separation: zero wall shear under an adverse pressure gradient.** Diffusers, compressor stators, wing stall and the shape of a boat's stern are all engineering management of that one condition — which is why conical diffusers are typically limited to an included angle of only about $7$–$10^{\circ}$.
:::
:::

## Where this leads

The nondimensionalisation of these equations is [[fluid-mechanics/dimensional-analysis]]; the simplification in which the $\mathrm{Re}^{-1}$ term is retained only in a thin wall layer is [[fluid-mechanics/boundary-layers-drag]]; the simplification in which the inertia terms are dropped is the lubrication theory behind [[machine-design]]'s bearings and [[manufacturing]]'s metal-forming; the discretisation of the same four equations is [[computational-fluid-dynamics]]; and the equations with an added species equation and a reaction-rate source are [[propulsion]]'s combustor and [[aerodynamics]]'s high-temperature gas.

::: summary
- The constitutive law — stress proportional to rate of strain — is the whole content of "Newtonian", and $\mu_v = 0$ is Stokes's hypothesis and not a fact.
- Four equations, four unknowns, two boundary conditions per velocity component: the inviscid limit is a different problem and not an approximation.
- In curvilinear coordinates the viscous term is the **vector** Laplacian, not the scalar Laplacian of the components.
- Vorticity is transported, stretched and diffused, and created only at walls or by $\nabla \rho \times \nabla p$.
- The unidirectional class reduces to a one-dimensional diffusion equation and contains Couette, Poiseuille, the film and the oscillating plate.
- $Q \propto D^4$ is the strongest scaling in engineering fluid mechanics.
- Creeping flow is linear, has a $1/r$ far field, fails in two dimensions, and gives $F = 3\pi\mu U D$.
- In many flows the viscous normal stresses are a tiny fraction of the pressure (about $2 \times 10^{-6}$ in the worked stress example), which is why wall pressure taps work and why viscometry needs careful instruments.
:::

## Exercises

::: exercise Couette stress {level=1 check="150"}
Give the wall shear stress in pascals for two plates $2\ \mathrm{mm}$ apart with the upper moving at $3\ \mathrm{m/s}$ in a fluid of $\mu = 0.1\ \mathrm{Pa \cdot s}$.
::: solution
$\tau_w = \mu U / h = 0.1 \times 3 / 0.002 = 150\ \mathrm{Pa}$.
:::
:::

::: exercise Pipe flow {level=1 check="1.065"}
Give the flow rate in litres per second for oil of $\mu = 0.3\ \mathrm{Pa \cdot s}$ through $30\ \mathrm{m}$ of $25\ \mathrm{mm}$ bore at $\Delta p = 1\ \mathrm{MPa}$.
::: solution
$Q = \pi D^4 \Delta p / (128 \mu L) = 1.065 \times 10^{-3}\ \mathrm{m^3 / s} = 1.065\ \mathrm{L / s}$.
:::
:::

::: exercise Stokes drag {level=1 check="9.42"}
Give the drag in micronewtons on a $1\ \mathrm{mm}$ sphere moving at $10\ \mathrm{mm/s}$ in oil of $\mu = 0.1\ \mathrm{Pa \cdot s}$.
::: solution
$F = 3 \pi \mu U D = 3 \pi \times 0.1 \times 0.01 \times 0.001 = 9.42 \times 10^{-6}\ \mathrm{N} = 9.42\ \mu\mathrm{N}$.
:::
:::

::: exercise Stokes layer {level=1 check="1.43"}
Give the penetration depth in millimetres of an oscillating plate at $1\ \mathrm{Hz}$ in a fluid of $\nu = 6.4 \times 10^{-6}\ \mathrm{m^2/s}$.
::: solution
$\delta = \sqrt{2 \nu / \omega} = \sqrt{2 \times 6.4 \times 10^{-6} / 6.283} = \sqrt{2.037 \times 10^{-6}} = 1.427\ \mathrm{mm}$.
:::
:::

::: exercise Reynolds number {level=1 check="161"}
Give the Reynolds number for the $25\ \mathrm{mm}$ oil-pipe flow of mean velocity $2.17\ \mathrm{m/s}$ at $\rho = 890\ \mathrm{kg/m^3}$ and $\mu = 0.3\ \mathrm{Pa \cdot s}$.
::: solution
$\mathrm{Re} = 890 \times 2.17 \times 0.025 / 0.3 = 161$.
:::
:::

::: exercise Annulus {level=1 check="0.736"}
For laminar flow in an annulus with inner-to-outer radius ratio $\kappa = 0.5$, give the radius of maximum velocity as a fraction of the outer radius $R$.
::: solution
The shear vanishes at $r = \lambda R$ with $\lambda^2 = (1 - \kappa^2) / (2 \ln (1/\kappa)) = 0.75 / (2 \times 0.6931) = 0.541$, so $r / R = \lambda = 0.736$ — slightly inside the middle of the gap ($0.75$), towards the inner wall.
:::
:::

::: exercise Film {level=1 check="0.168"}
Give the film thickness in millimetres of a falling film of water at $100\ {}^{\circ}\mathrm{C}$ carrying $\Gamma = 0.05\ \mathrm{kg / m\, s}$ vertically ($\mu = 2.82 \times 10^{-4}\ \mathrm{Pa \cdot s}$, $\rho = 958\ \mathrm{kg/m^3}$).
::: solution
$h = \left( 3 \mu \Gamma / \left( \rho^2 g \right) \right)^{1/3} = \left( 4.23 \times 10^{-5} / 9.003 \times 10^{6} \right)^{1/3} = \left( 4.70 \times 10^{-12} \right)^{1/3} = 1.68 \times 10^{-4}\ \mathrm{m} = 0.168\ \mathrm{mm}$.
:::
:::

::: exercise Vorticity {level=2 check="-5"}
For the field $\mathbf{V} = (x^2 y, -x y^2, 0)$, give the $z$-component of vorticity at $(1, 2, 0)$ and state whether the flow is rotational. (Enter the vorticity in $\mathrm{s^{-1}}$.)
::: solution
$$
\zeta_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = - y^2 - x^2 = - 4 - 1 = - 5\ \mathrm{s^{- 1}}
$$
**Rotational**: $\zeta_z = -(x^2 + y^2)$ is nonzero everywhere except at the origin. **The reading.** A flow can satisfy continuity exactly and still be rotational; the two are independent properties, and this field is a valid incompressible flow with a vorticity field that must be transported and diffused by the equations.
:::
:::

::: exercise Oseen correction {level=2}
A $0.6\ \mathrm{mm}$ sand grain of density $2{,}650\ \mathrm{kg/m^3}$ settles in water at $20\ {}^{\circ}\mathrm{C}$. Give the Stokes settling velocity and the Reynolds number, and state whether Stokes's law applies.
::: solution
$$
u_r = \frac{\left( \rho_s - \rho \right) g D^2}{18 \mu} = \frac{\left( 2{,}650 - 998 \right) \times 9.81 \times \left( 6 \times 10^{- 4} \right)^2}{18 \times 1.002 \times 10^{- 3}}
= \frac{5.83 \times 10^{- 3}}{1.804 \times 10^{- 2}} = 0.323\ \mathrm{m / s}
$$
$$
\mathrm{Re} = \frac{998 \times 0.323 \times 6 \times 10^{- 4}}{1.002 \times 10^{- 3}} = 193
$$
**Stokes's law does not apply** — it needs $\mathrm{Re} \lesssim 0.1$ for errors of a few per cent (the Oseen factor is $1 + 3 \mathrm{Re} / 8$), and here $\mathrm{Re}$ is two hundred. Iterating a drag law valid in the transition, such as **Schiller–Naumann**, $C_D = \left( 24 / \mathrm{Re} \right) \left( 1 + 0.15\, \mathrm{Re}^{0.687} \right)$, with $u_r = \sqrt{4 \left( \rho_s - \rho \right) g D / \left( 3 C_D \rho \right)}$, converges to $u_r \approx 0.095\ \mathrm{m / s}$ at $\mathrm{Re} \approx 57$ ($C_D \approx 1.44$): **Stokes's law overstates the settling velocity by a factor of about $3.4$.**
:::
:::

::: exercise Derivation {level=3}
Derive the vorticity equation for an incompressible, constant-viscosity fluid with a conservative body force, and show that the vortex-stretching term vanishes in two-dimensional flow.
::: solution
**Start from the momentum equation** divided by $\rho$:
$$
\frac{\partial \mathbf{V}}{\partial t} + \left( \mathbf{V} \cdot \nabla \right) \mathbf{V} = - \frac{1}{\rho} \nabla p + \nu \nabla^2 \mathbf{V} + \mathbf{g}, \qquad \mathbf{g} = - \nabla \chi
$$
**Use the identity** $\left( \mathbf{V} \cdot \nabla \right) \mathbf{V} = \nabla \left( V^2 / 2 \right) - \mathbf{V} \times \boldsymbol{\omega}$:
$$
\frac{\partial \mathbf{V}}{\partial t} + \nabla \left( \frac{V^2}{2} \right) - \mathbf{V} \times \boldsymbol{\omega} = - \nabla \left( \frac{p}{\rho} + \chi \right) + \nu \nabla^2 \mathbf{V}
$$
**Take the curl.** The curl of any gradient vanishes, and $\nabla \times \mathbf{V} = \boldsymbol{\omega}$:
$$
\frac{\partial \boldsymbol{\omega}}{\partial t} - \nabla \times \left( \mathbf{V} \times \boldsymbol{\omega} \right) = \nu \nabla^2 \boldsymbol{\omega}
$$
**Expand the double-curl term** with $\nabla \times \left( \mathbf{A} \times \mathbf{B} \right) = \left( \mathbf{B} \cdot \nabla \right) \mathbf{A} - \left( \mathbf{A} \cdot \nabla \right) \mathbf{B} + \mathbf{A} \left( \nabla \cdot \mathbf{B} \right) - \mathbf{B} \left( \nabla \cdot \mathbf{A} \right)$, with $\mathbf{A} = \mathbf{V}$ and $\mathbf{B} = \boldsymbol{\omega}$, and using $\nabla \cdot \boldsymbol{\omega} = \nabla \cdot \left( \nabla \times \mathbf{V} \right) \equiv 0$ and $\nabla \cdot \mathbf{V} = 0$:
$$
\nabla \times \left( \mathbf{V} \times \boldsymbol{\omega} \right) = \left( \boldsymbol{\omega} \cdot \nabla \right) \mathbf{V} - \left( \mathbf{V} \cdot \nabla \right) \boldsymbol{\omega}
$$
$$
\boxed{ \frac{\partial \boldsymbol{\omega}}{\partial t} + \left( \mathbf{V} \cdot \nabla \right) \boldsymbol{\omega} = \left( \boldsymbol{\omega} \cdot \nabla \right) \mathbf{V} + \nu \nabla^2 \boldsymbol{\omega} }
$$
**The two-dimensional case.** With $\mathbf{V} = \left( u \left( x, y, t \right), v \left( x, y, t \right), 0 \right)$ the vorticity has only a $z$-component, $\boldsymbol{\omega} = \left( 0, 0, \zeta \right)$, and
$$
\left( \boldsymbol{\omega} \cdot \nabla \right) \mathbf{V} = \zeta \frac{\partial}{\partial z} \left( u, v, 0 \right) = \mathbf{0}
$$
because nothing varies in $z$. **The stretching term vanishes identically**, and the equation for $\zeta$ becomes a pure **scalar transport–diffusion** equation:
$$
\frac{\partial \zeta}{\partial t} + u \frac{\partial \zeta}{\partial x} + v \frac{\partial \zeta}{\partial y} = \nu \nabla^2 \zeta
$$
**The consequence is the single deepest structural difference between two- and three-dimensional turbulence.** In two dimensions $\int \zeta^2 dA$ — the **enstrophy** — can only decrease, and in three dimensions the stretching term can create it without limit. **Two-dimensional turbulence therefore has a forward enstrophy cascade and an inverse energy cascade to larger scales at the same time, whereas three-dimensional turbulence cascades energy forward to small scales by vortex stretching**; and one reason the Earth's weather organises into a few giant vortices while the turbulence behind a laboratory grid does not is that the atmosphere is thin and strongly stratified and rotating, so it behaves nearly two-dimensionally at large scales.
*Sanity.* The reason $\nabla \cdot \boldsymbol{\omega} \equiv 0$ matters is that it is the statement that **vortex lines cannot end**, and it is the same identity that makes $\nabla \cdot \mathbf{B} = 0$ in magnetostatics. **The vorticity equation has the same form as the induction equation for a magnetic field in a conducting fluid**, which is why **Alfvén**'s frozen-in-flux theorem is the magnetic analogue of **Helmholtz**'s and **Kelvin**'s theorems that vortex lines move with an inviscid fluid.
:::
:::

::: exercise Design {level=3}
Specify the complete hydraulic design of a **viscometric** (Couette) rheometer for measuring a drilling mud from $1$ to $200\ \mathrm{Pa \cdot s}$ and from $0.1$ to $1{,}000\ \mathrm{s^{-1}}$, and state the acceptance tests.
::: solution
**The geometry.** A coaxial-cylinder (Couette) geometry is chosen over a cone-and-plate because a mud's solid particles jam in the cone's gap of a few tens of micrometres near the apex, while a cup-and-bob gap of millimetres is many particle diameters wide, and because the cup holds a large, representative sample and resists evaporation and settling better than an open plate.
$$
\begin{array}{l c l}
\text{Outer cup radius} & R_o = 22.5\ \mathrm{mm} & \\
\text{Inner bob radius} & R_i = 18.5\ \mathrm{mm} & \\
\text{Gap} & d = 4.0\ \mathrm{mm}, \quad \eta = R_i / R_o = 0.822 \\
\text{Gap ratio} & d / R_i = 0.216 & \text{wide gap: curvature correction needed} \\
\text{Bob immersed length} & L = 60\ \mathrm{mm} & \\
\text{Sheared volume} & 2 \pi R_i L d = 27.9\ \mathrm{cm^3} & \\
\text{Bob moment of inertia} & \approx 3 \times 10^{- 6}\ \mathrm{kg\, m^2} & \text{thin-walled aluminium bob}
\end{array}
$$
**The shear-rate range.** With the narrow-gap estimate $\dot{\gamma} \approx \Omega_i R_i / d$:
$$
\Omega_{i, \max} = \frac{1{,}000 \times 0.004}{0.0185} = 216\ \mathrm{rad / s} = 2{,}065\ \mathrm{rpm}, \qquad
\Omega_{i, \min} = 0.0216\ \mathrm{rad / s} = 0.21\ \mathrm{rpm}
$$
**a dynamic range of $10^4$ in speed**, and the reason a rheometer's motor and encoder are specified by their **low-speed** linearity and not their maximum rpm. At $\eta = 0.822$ the gap is not narrow: for a Newtonian fluid the exact shear rate at the bob is $2 \Omega_i R_o^2 / \left( R_o^2 - R_i^2 \right) = 6.17\, \Omega_i$, a third higher than $\Omega_i R_i / d = 4.63\, \Omega_i$, so the software must apply the curvature correction (and, for a non-Newtonian mud, a further correction for the shape of the flow curve).
**The torque range.** At $\dot{\gamma} = 1{,}000\ \mathrm{s^{-1}}$ and $\mu = 1\ \mathrm{Pa\, s}$:
$$
\tau_w = 1{,}000\ \mathrm{Pa}, \qquad
T = \tau_w \times 2 \pi R_i L \times R_i = 1{,}000 \times 6.974 \times 10^{- 3} \times 0.0185 = 0.129\ \mathrm{N\, m}
$$
At $\dot{\gamma} = 0.1\ \mathrm{s^{-1}}$ and $\mu = 200\ \mathrm{Pa\, s}$:
$$
\tau_w = 20\ \mathrm{Pa}, \qquad T = 2.58 \times 10^{- 3}\ \mathrm{N\, m}
$$
At the highest viscosity and highest shear rate ($200\ \mathrm{Pa\, s}$, $1{,}000\ \mathrm{s^{-1}}$) the stress would be $200\ \mathrm{kPa}$ and the torque $25.8\ \mathrm{N\, m}$ — far beyond a laboratory rheometer, so that corner of the range must be dropped or measured with a smaller bob. **The number that sets the instrument's floor.** The **lowest** torque is at $\mu = 1\ \mathrm{Pa\, s}$ and $\dot{\gamma} = 0.1\ \mathrm{s^{-1}}$: $\tau_w = 0.1\ \mathrm{Pa}$ and $T = 0.1 \times 6.974 \times 10^{- 3} \times 0.0185 = 1.3 \times 10^{- 5}\ \mathrm{N\, m} = 13\ \mu\mathrm{N\, m}$, so a torque resolution of $0.1\ \mu\mathrm{N\, m}$ or better is needed for $1\ \%$ accuracy there, and the mud's **yield stress**, found by extrapolating the flow curve downward, is sensitive to any torque bias at the low end. **The instrument's specification should be read as a torque floor and a speed ceiling, and the "shear rate range" printed on the brochure is the intersection of the two.**
**The stability check.** At the maximum speed with the **lowest** viscosity in the range, $\mu = 1\ \mathrm{Pa\, s}$, $\rho = 1{,}050$:
$$
\mathrm{Re}_i = \frac{\rho \Omega_i R_i d}{\mu} = \frac{1{,}050 \times 216 \times 0.0185 \times 0.004}{1} = 16.8
$$
**against a critical value of roughly** $\mathrm{Re}_{i, c} \approx \sqrt{1{,}708 / \left( d / R_i \right)} = \sqrt{1{,}708 / 0.216} \approx 90$ from the narrow-gap Taylor-number estimate — stable. **But a thin water-based sample of $0.01\ \mathrm{Pa\, s}$** at the same speed gives $\mathrm{Re}_i = 1{,}680$, far above the limit, and the reason a rheometer's software should **refuse** to run above a computed $\mathrm{Re}_i$ is that the resulting torque rise is smooth and looks like shear-thickening.
**The secondary-flow and end effects.**
$$
\begin{array}{l l}
\text{Secondary (Taylor) vortices} & \text{torque rises above laminar once } \mathrm{Re}_i > \mathrm{Re}_{i, c} \\
\text{End effects (finite bob)} & \text{corrected by the } 1 / L \text{ extrapolation with three lengths} \\
\text{Free-surface meniscus} & \text{a constant torque bias, removed by a zero run} \\
\text{Secondary circulation from the cup's bottom} & \text{eliminated by a guard ring} \\
\text{Wall slip on a yield-stress fluid} & \text{the dominant error; addressed by a vane geometry}
\end{array}
$$
**Why a vane.** For a mud with a significant yield stress, **wall slip can make a smooth bob unreliable** — a slip layer forms at the bob and the measured torque reflects that layer, not the bulk. A **vane-in-cup** geometry (four to six thin blades) measures the bulk because the material fails **internally** on the cylindrical surface swept by the blade tips, radius $R_v$; assuming a uniform stress $\tau_y$ on the side and on both ends of that cylinder,
$$
T_y = 2 \pi R_v^2 L \tau_y + 2 \times \tfrac{2}{3} \pi R_v^3 \tau_y = 2 \pi R_v^2 L \tau_y \left( 1 + \frac{2 R_v}{3 L} \right)
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Calibration} & \text{certified Newtonian standards near } 1 \text{ and } 100\ \mathrm{Pa\, s},\ \pm 1\ \% \text{ over the whole range} \\
\text{Inertia correction} & \text{verified by a step test; } < 0.5\ \% \text{ at } 100\ \mathrm{s^{-1}} \\
\text{Gap sensitivity} & \text{three gaps, torque constant to } \pm 1\ \% \\
\text{Repeatability} & \pm 2\ \% \text{ on a sheared-and-rested mud, six replicates} \\
\text{Thixotropy} & \text{a documented rest time and a ramped, not stepped, shear protocol}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE INSTRUMENT SHALL BE CALIBRATED AGAINST CERTIFIED NEWTONIAN STANDARDS AT THE TORQUE AND SPEED OF THE INTENDED MEASUREMENT AND NOT AT A SINGLE CONVENIENT POINT."** **"THE GAP REYNOLDS NUMBER SHALL BE DISPLAYED DURING THE MEASUREMENT AND THE DATA FLAGGED IF IT EXCEEDS THE CRITICAL VALUE FOR THE GEOMETRY."** **"FOR ANY FLUID THAT SHOWS WALL SLIP THE VANE GEOMETRY SHALL BE USED FOR THE YIELD STRESS."** **"THE GAP, THE IMMERSED LENGTH, THE TEMPERATURE AND THE PRE-SHEAR HISTORY SHALL BE REPORTED WITH EVERY DATA POINT."**
*Design comment.* The general rule is that **a rheometer does not measure viscosity; it measures a torque and a speed and infers a viscosity through a geometry correction, and the correction is where the errors are** — which is why two laboratories measuring the same mud can disagree substantially with both instruments in calibration.
:::
:::
