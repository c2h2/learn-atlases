Kinematics is the geometry of motion without its causes, and in fluid mechanics it is the lesson in which you learn a new language. A fluid has no identity — you cannot point at "the same water" twice — so the description of its motion must be chosen between **following the parcels** and **watching the places**, and the choice turns out to change the form of every equation that comes after [[fluid-mechanics/fluid-properties|fluid-properties]] and [[statics]].

The reason the subject repays the effort is that **almost every hard problem in fluid mechanics is a kinematics problem in disguise**. Whether a flow separates, whether a wing stalls, whether a pump cavitates at its eye, whether a smoke plume goes turbulent and whether a panel method will converge are all decided by the velocity field's geometry — its streamlines, its vorticity, its strain and its circulation — long before any force is computed.

::: warning Seven kinematics errors that make the rest of the course wrong
**Confusing the pathline with the streamline.** They coincide only in **steady** flow, and the difference is not academic: in a periodically reversing tide the streaklines drawn by a harbour's dye trail are **closed loops** while the streamlines sweep across the bay, and a pollutant-spill trajectory computed from a snapshot of the velocity field is wrong by the whole tidal excursion. **Differentiating a field at a fixed point and calling it the acceleration of a parcel.** The material derivative is
$$
\frac{D \mathbf{V}}{D t} = \frac{\partial \mathbf{V}}{\partial t} + \left( \mathbf{V} \cdot \nabla \right) \mathbf{V}
$$
and the second term — the **convective** acceleration — is present in **steady** flow and is usually the larger. Fluid in a steady nozzle accelerates at $10\ g$ while nothing at any point changes with time, and a reader trained on rigid-body dynamics looks for the unsteady term, finds zero, and concludes nothing is happening. **Assuming a velocity field is incompressible because it looks smooth.** Continuity is a statement about **divergence**, and $\mathbf{V} = \left( x^{2}, y^{2}, 0 \right)$ is smooth, steady and two-dimensional and violates continuity by $2 x + 2 y$. Every velocity field must be tested, and the test takes ten seconds. **Setting $\nabla \times \mathbf{V} = 0$ and then using a velocity profile with shear.** A uniform stream has zero vorticity; a boundary layer, a pipe's Poiseuille profile and a free vortex's core all have vorticity, and the free vortex is the trap — its vorticity is zero **everywhere except at the origin**, where it is infinite, and the circulation is nonzero. An irrotational analysis of a vortex is correct everywhere and misses the whole of its structure. **Applying Bernoulli across a streamline in a rotational flow.** The constant in $p / \rho + V^{2} / 2 + g z$ is **the same on every streamline only if the flow is irrotational**, and in a pipe's fully developed profile, a turbine's wake and an atmospheric boundary layer it is not. Using a free-stream Bernoulli constant at a wall gives a pressure that is wrong by an amount of order $\tfrac{1}{2} \rho U^{2}$, which is the whole of the pressure difference you were trying to measure. **Adding two potential flows and forgetting the singularity you created.** A source plus a uniform stream has a stagnation point at which the velocity is **zero** and the pressure is the stagnation pressure; a source plus a sink plus a uniform stream has two. A doublet at a corner produces an infinite velocity, and a panel method that puts a collocation point on a panel edge rather than at its centre reads that infinity as an answer. **Treating the stream function as though it were a potential.** $\phi$ and $\psi$ are conjugate: the velocity is $\nabla \phi$ and is **perpendicular** to $\nabla \psi$. A student who differentiates $\psi$ with the wrong sign gets a flow rotated by ninety degrees, and because the streamlines of many textbook examples are symmetric the error is invisible until the drag comes out sideways.
:::

## Describing a flow

::: definition The two descriptions and the material derivative {#def-describe}
$$
\begin{array}{l l l}
\text{Description} & \text{Independent variables} & \text{Tracks} \\
\text{Lagrangian} & \left( \mathbf{a}, t \right),\ \mathbf{a} = \text{parcel label} & \text{individual parcels} \\
\text{Eulerian} & \left( x, y, z, t \right) & \text{fixed points in space}
\end{array}
$$
**The material (substantial, total) derivative.** For any property $f \left( x, y, z, t \right)$:
$$
\boxed{ \frac{D f}{D t} = \frac{\partial f}{\partial t} + u \frac{\partial f}{\partial x}
+ v \frac{\partial f}{\partial y} + w \frac{\partial f}{\partial z}
= \frac{\partial f}{\partial t} + \mathbf{V} \cdot \nabla f }
$$
**The acceleration field.**
$$
\mathbf{a} = \frac{D \mathbf{V}}{D t} = \underbrace{\frac{\partial \mathbf{V}}{\partial t}}_{\text{local}}
+ \underbrace{\left( \mathbf{V} \cdot \nabla \right) \mathbf{V}}_{\text{convective}}
$$
**The worked case: a converging nozzle.** An idealised one-dimensional contraction with
$$
u \left( x \right) = U_0 \left( 1 + \frac{x}{L} \right), \qquad v = w = 0, \qquad 0 \le x \le L
$$
has **zero** local acceleration and a convective acceleration
$$
a_x = u \frac{\partial u}{\partial x} = \frac{U_0^{2}}{L} \left( 1 + \frac{x}{L} \right)
$$
For $U_0 = 2\ \mathrm{m / s}$ and $L = 0.5\ \mathrm{m}$: $a_x$ rises from $8\ \mathrm{m / s^{2}}$ at the inlet to $16\ \mathrm{m / s^{2}}$ at the exit — **$1.6\ g$ in a steady flow**, produced entirely by the fluid moving to a place where the velocity is different.
**The number that makes a Venturi's throat a cavitation problem.** Scaling: $a \sim U^{2} / L$, so halving the throat length **doubles** the acceleration and the pressure gradient that drives it. For $U = 20\ \mathrm{m / s}$ and $L = 20\ \mathrm{mm}$ the acceleration is $20{,}000\ \mathrm{m / s^{2}} = 2{,}000\ g$, and the pressure gradient needed is $\rho a = 20\ \mathrm{MPa / m}$ — a drop of $0.4\ \mathrm{MPa}$, four atmospheres, across the $20\ \mathrm{mm}$ throat entry, which is why a short, fast throat reaches the vapour pressure of water so easily.
**The four line types.**
$$
\begin{array}{l l l}
\text{Pathline} & d \mathbf{r} / d t = \mathbf{V} \left( \mathbf{r}, t \right) & \text{one parcel's history} \\
\text{Streakline} & \text{locus of all parcels that passed a fixed point} & \text{a smoke wisp, a dye trail} \\
\text{Streamline} & d \mathbf{r} \times \mathbf{V} = 0, \quad d x / u = d y / v = d z / w & \text{tangent to the instantaneous velocity} \\
\text{Timeline} & \text{a marked set of adjacent parcels} & \text{its deformation gives the strain rate}
\end{array}
$$
**All four coincide in steady flow**, and the fact that a streamline cannot be crossed by fluid is what makes the streamline a natural boundary for a control volume.
**The worked case: an unsteady field where they differ.** $\mathbf{V} = \left( a t - b y,\ b x,\ 0 \right)$ with $a, b$ constants: at any instant the streamlines are circles centred at $\left( 0, a t / b \right)$, while the pathlines are **trochoids** (cycloid-like curves) drifting in the $y$ direction at the mean speed $a / b$, and a dye released at a point traces yet another curve, its streakline. **A single snapshot of an unsteady velocity field therefore says nothing reliable about where fluid goes.**
:::

::: definition Continuity {#def-continuity}
$$
\boxed{ \frac{\partial \rho}{\partial t} + \nabla \cdot \left( \rho \mathbf{V} \right) = 0 }
\qquad \Longleftrightarrow \qquad
\frac{D \rho}{D t} + \rho \, \nabla \cdot \mathbf{V} = 0
$$
**For a constant-density fluid** this reduces to
$$
\nabla \cdot \mathbf{V} = 0
\quad \Longleftrightarrow \quad
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0
$$
**The integral form**, for a fixed control volume:
$$
\frac{\partial}{\partial t} \int_{CV} \rho\, dV + \oint_{CS} \rho \mathbf{V} \cdot d\mathbf{A} = 0
$$
**The one-dimensional reduction that is used a thousand times a day:**
$$
\rho_1 V_1 A_1 = \rho_2 V_2 A_2, \qquad Q = V A
$$
**The test that must be applied to every field.** Is $\mathbf{V} = \left( 2 x^{2} + y^{2} + z^{2} - 3 y - 3 z,\ 2 y^{2} + x^{2} + z^{2} - 3 x - 3 z,\ 2 z^{2} + y^{2} + x^{2} - 3 x - 3 y \right)$ continuous?
$$
\frac{\partial u}{\partial x} = 4 x, \quad
\frac{\partial v}{\partial y} = 4 y, \quad
\frac{\partial w}{\partial z} = 4 z
\quad \Rightarrow \quad \nabla \cdot \mathbf{V} = 4 \left( x + y + z \right) \ne 0
$$
**No**, and the field is not a possible incompressible flow anywhere except on the plane $x + y + z = 0$. **The same field is a valid flow for a fluid whose density is changing as $D \rho / D t = - 4 \rho \left( x + y + z \right)$**, which is the sense in which continuity is a **law** and not a property of the fluid.
**The area–velocity relation for a duct.** With $A \left( x \right)$ and $V \left( x \right) = Q / A$:
$$
\frac{1}{V} \frac{d V}{d x} = - \frac{1}{A} \frac{d A}{d x}
$$
**The number that decides a wind tunnel's contraction ratio.** A $10\ \mathrm{m}$ diameter settling chamber feeding a $1\ \mathrm{m}$ test section raises the velocity a hundredfold, and the contraction length needed to keep the flow attached to the contraction walls — with a smooth profile such as the fifth-order polynomial of **Bell and Mehta** — is set by the requirement that $d \left( \tfrac{1}{2} \rho V^{2} \right) / d x$ not exceed the boundary layer's ability to negotiate it. **A wind tunnel's contraction is a kinematics problem and its turbulence level is the answer.**
:::

## The two scalar functions

::: definition The stream function {#def-psi}
**Two-dimensional incompressible flow.** Continuity is satisfied identically by defining
$$
u = \frac{\partial \psi}{\partial y}, \qquad v = - \frac{\partial \psi}{\partial x}
\qquad \Longleftrightarrow \qquad
\mathbf{V} = \nabla \times \left( \psi \hat{\mathbf{k}} \right)
$$
and the lines $\psi = $ constant are the **streamlines**, with the **volume flow rate between two of them equal to the difference in $\psi$**:
$$
Q_{1 \to 2} = \psi_2 - \psi_1
$$
**In plane polar coordinates**
$$
v_r = \frac{1}{r} \frac{\partial \psi}{\partial \theta}, \qquad
v_{\theta} = - \frac{\partial \psi}{\partial r}
$$
**The building blocks.**
$$
\begin{array}{l c c l}
\text{Flow} & \phi & \psi & \text{Velocity} \\
\text{Uniform } U \text{ along } x & U x = U r \cos \theta & U r \sin \theta = U y & \left( U, 0 \right) \\
\text{Source } m \text{ at origin} & \dfrac{m}{2 \pi} \ln r & \dfrac{m}{2 \pi} \theta & v_r = \dfrac{m}{2 \pi r} \\
\text{Sink } - m & - \dfrac{m}{2 \pi} \ln r & - \dfrac{m}{2 \pi} \theta & \text{inward} \\
\text{Vortex } \Gamma & \dfrac{\Gamma}{2 \pi} \theta & - \dfrac{\Gamma}{2 \pi} \ln r & v_{\theta} = \dfrac{\Gamma}{2 \pi r} \\
\text{Doublet } \mu \text{ facing } - x & \dfrac{\mu \cos \theta}{2 \pi r} & - \dfrac{\mu \sin \theta}{2 \pi r} & \text{decays as } 1 / r^{2}
\end{array}
$$
**The worked case: stagnation (corner) flow.** $\psi = x y$ gives
$$
u = \frac{\partial \psi}{\partial y} = x, \qquad v = - \frac{\partial \psi}{\partial x} = - y
$$
Continuity: $\partial u / \partial x + \partial v / \partial y = 1 - 1 = 0$ ✓. Vorticity: $\partial v / \partial x - \partial u / \partial y = 0$ ✓ **irrotational**. Streamlines $x y = $ constant are rectangular hyperbolae, and the origin is a **stagnation point**. The velocity on the wall $y = 0$ is $u = x$, so the flow **accelerates linearly away from the wall's nose** — this is the idealisation of the flow at a wing's leading edge and at the nose of a pitot tube, and the associated pressure gradient $d p / d x = - \rho u\, du / d x = - \rho x$ is a **favourable** gradient that keeps the boundary layer attached.
**The number that makes a stagnation-point heat transfer solvable.** Because $u_e \left( x \right) = C x$ is a member of the Falkner–Skan family $u_e \propto x^{m}$ for which the boundary-layer equations admit **similar** solutions (here the Hiemenz flow of **1911**, an exact solution of the Navier–Stokes equations), the stagnation point has an exact viscous solution — the starting point of stagnation-point and impingement heat-transfer correlations.
:::

::: definition The velocity potential and circulation {#def-phi}
**Irrotational flow.** Where $\nabla \times \mathbf{V} = 0$ a **velocity potential** exists with
$$
\mathbf{V} = \nabla \phi
\quad \Longleftrightarrow \quad
u = \frac{\partial \phi}{\partial x}, \quad v = \frac{\partial \phi}{\partial y}
$$
and continuity gives **Laplace's equation**
$$
\nabla^{2} \phi = 0
$$
**The Cauchy–Riemann relations**, which make $\phi$ and $\psi$ an analytic pair and the whole of classical aerodynamics a chapter of complex-variable theory:
$$
\frac{\partial \phi}{\partial x} = \frac{\partial \psi}{\partial y} = u, \qquad
\frac{\partial \phi}{\partial y} = - \frac{\partial \psi}{\partial x} = v, \qquad
W \left( z \right) = \phi + i \psi, \qquad \frac{d W}{d z} = u - i v
$$
**The two families of curves — $\phi = $ constant and $\psi = $ constant — meet at right angles**, and the resulting **flow net** is a graphical solver that was the state of the art until **1950** and is still the fastest way to see whether a numerical mesh is sane.
**Circulation.**
$$
\Gamma = \oint_C \mathbf{V} \cdot d \mathbf{s} = \iint_S \left( \nabla \times \mathbf{V} \right) \cdot \mathbf{n}\, dA
$$
**The evaluation for a free vortex** $v_\theta = \Gamma / \left( 2 \pi r \right)$ around a circle of radius $r$:
$$
\Gamma_{\mathrm{circ}} = v_{\theta} \times 2 \pi r = \frac{\Gamma}{2 \pi r} \times 2 \pi r = \Gamma
$$
**independent of $r$**, while the vorticity $\nabla \times \mathbf{V}$ is zero at every point of the path. **The circulation is a property of the region enclosed, not of the path, and a region containing a singularity is not simply connected** — which is the precise statement that lets an irrotational flow carry lift.
**The number that makes an airfoil possible.** A cylinder in an inviscid, irrotational stream has **zero** drag and **zero** lift (d'Alembert's paradox of **1752**); add a vortex of circulation $\Gamma$ and the lift per unit span is
$$
\boxed{ L' = \rho U_{\infty} \Gamma } \qquad \text{(Kutta--Joukowski, 1902--1906)}
$$
For $\rho = 1.225$, $U = 60\ \mathrm{m / s}$ and $\Gamma = 12\ \mathrm{m^{2} / s}$: $L' = 882\ \mathrm{N / m}$ of span. **A twenty-four metre wing at $882\ \mathrm{N / m}$ carries $21{,}200\ \mathrm{N}$ — a light aircraft — and all the aerodynamics of the last century is the question of what sets $\Gamma$.**
:::

::: widget plot
f: 1-4*pow(sin(x*pi/180),2); -1.2
x: 0, 180
y: -3.2, 1.2
labels: Cp on a cylinder, potential flow; Cp on a real cylinder at Re = 1e5
caption: The surface pressure coefficient $C_p = \left( p - p_{\infty} \right) / \left( \tfrac{1}{2} \rho U_{\infty}^{2} \right) = 1 - \left( v_{\theta} / U_{\infty} \right)^{2}$ against the angular position on a circular cylinder in a uniform stream. The potential-flow curve follows from $v_{\theta} = - 2 U_{\infty} \sin \theta$, is **symmetric fore and aft**, and gives zero drag by integration — d'Alembert's paradox in one line. The flat line at $C_p = - 1.2$ is roughly the measured base pressure on the **rear** of a real cylinder at a Reynolds number of $10^{5}$, where the laminar boundary layer separates at $\theta \approx 80^{\circ}$. **The gap between the two curves over the rear half is the pressure drag.** Making the boundary layer turbulent — by roughness, or by reaching the drag crisis near $\mathrm{Re} \approx 3 \times 10^{5}$ — delays separation to beyond $100^{\circ}$, raises the base pressure and cuts the drag coefficient from about $1.2$ to about $0.3$, which is why a golf ball has dimples.
:::

## Superposition and its uses

::: definition Canonical potential flows {#def-canonical}
**The cylinder.** A doublet of strength $\mu = 2 \pi U a^{2}$ at the origin in a uniform stream gives
$$
\psi = U \left( r - \frac{a^{2}}{r} \right) \sin \theta, \qquad
v_r = U \left( 1 - \frac{a^{2}}{r^{2}} \right) \cos \theta, \qquad
v_{\theta} = - U \left( 1 + \frac{a^{2}}{r^{2}} \right) \sin \theta
$$
On the surface $r = a$: $v_r = 0$ ✓ and $v_{\theta} = - 2 U \sin \theta$, so the **maximum surface velocity is twice the stream speed** at $\theta = 90^{\circ}$ and the pressure coefficient is
$$
C_p = 1 - 4 \sin^{2} \theta
$$
**The stagnation points are at $\theta = 0$ and $\pi$**, and $C_p = 1$ there.
**The cylinder with circulation.** Adding a vortex moves the stagnation points to
$$
\sin \theta = - \frac{\Gamma}{4 \pi U a}
$$
and when $\Gamma > 4 \pi U a$ **they leave the surface** and merge into a single stagnation point in the flow off the cylinder. The lift is $L' = \rho U \Gamma$ and the drag remains **zero** — the paradox survives lift.
**The Rankine half-body.** A source of strength $m$ in a uniform stream:
$$
\psi = U r \sin \theta + \frac{m}{2 \pi} \theta, \qquad
r_{\mathrm{stag}} = \frac{m}{2 \pi U} \ \text{at}\ \theta = \pi
$$
and the body's half-thickness far downstream is
$$
h = \frac{m}{2 U}, \qquad \text{total width} = \frac{m}{U} = 2 h
$$
**The number that sizes a pitot-probe support and an antenna mast.** The half-body is the shape of a **blunt-nosed strut** in an inviscid fluid, and the distance from the source to the nose is $h / \pi$ — so the body's asymptotic **half-thickness is $\pi \approx 3.14$ times the source-to-nose distance**, and its nose radius is $0.48\ h$.
**The Rankine oval.** A source–sink pair of strength $\pm m$ separated by $2 a$ in a stream $U$. Writing $l = m / \left( \pi U a \right)$, the half-length and half-thickness are
$$
\frac{L}{2 a} = \sqrt{1 + l}, \qquad
\frac{B}{2 a} = \beta \quad \text{where} \quad \beta = l \arctan \left( \frac{1}{\beta} \right)
$$
and the length-to-thickness ratio follows:
$$
\begin{array}{l c c c c}
l = m / \left( \pi U a \right) & 0.5 & 1.0 & 2.0 & 5.0 \\
B / \left( 2 a \right) & 0.54 & 0.86 & 1.31 & 2.16 \\
L / B & 2.28 & 1.64 & 1.33 & 1.13
\end{array}
$$
**The number that makes a body's slenderness a design variable.** The peak surface velocity of a Rankine oval rises as the body thickens — $1 + l / \left( 1 + \beta^{2} \right)$, about $1.39\ U$ at $L / B = 2.3$ and $1.74\ U$ at $L / B = 1.33$ — so a **blunter** body has a **higher** peak suction and cavitates or separates first, which is why a hydrofoil's thickness is limited by the cavitation number and not by its strength.
**The source in a wall.** A source of strength $m$ a distance $a$ from a plane wall is the same as a source plus its image, and the resulting flow has a stagnation point at the wall and a **displacement** of the streamlines that is the model for a **bluff-body's** influence on a nearby wall — the **wall correction** that makes a wind-tunnel model's blockage correction
$$
\frac{\Delta U}{U} \approx \frac{\pi^{2}}{8} \left( \frac{d}{H} \right)^{2}
$$
**The number that must be applied to every wind-tunnel result.** A model of diameter $d = 0.03\ \mathrm{m}$ in a tunnel of height $H = 0.3\ \mathrm{m}$ gives $\Delta U / U = \left( \pi^{2} / 8 \right) \times 0.01 = 1.23\ \%$, and the associated **dynamic-pressure** error is $2.5\ \%$ — larger than the aerodynamic effect a typical experiment is trying to measure. **Blockage correction is not a refinement; it is the first thing done to a wind-tunnel number.**
:::

::: definition Deformation and rotation {#def-deform}
**The decomposition of the velocity-gradient tensor** (Helmholtz's theorem):
$$
\frac{\partial u_i}{\partial x_j} = e_{ij} + \omega_{ij}, \qquad
e_{ij} = \tfrac{1}{2} \left( \frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i} \right), \qquad
\omega_{ij} = \tfrac{1}{2} \left( \frac{\partial u_i}{\partial x_j} - \frac{\partial u_j}{\partial x_i} \right)
$$
**The three rotation components and the vorticity.**
$$
\omega_z = \tfrac{1}{2} \left( \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} \right), \qquad
\zeta_z = 2 \omega_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}
$$
**The rate of angular (shear) deformation.**
$$
\dot{\gamma}_{xy} = \frac{\partial u}{\partial y} + \frac{\partial v}{\partial x} = 2 e_{xy}
$$
**Note that $\dot{\gamma}_{xy} = 0$ and $2 \omega_z = 0$ are different conditions**: the first says the element keeps its right angles, the second says it does not rotate.
**The two linear strain rates** $\dot{\varepsilon}_{xx} = \partial u / \partial x$, $\dot{\varepsilon}_{yy} = \partial v / \partial y$, and continuity for an incompressible fluid is $\dot{\varepsilon}_{xx} + \dot{\varepsilon}_{yy} + \dot{\varepsilon}_{zz} = 0$ — **the volume does not change, so the three normal strain rates sum to zero.**
**The worked case: a simple shear** $\mathbf{V} = \left( k y, 0, 0 \right)$:
$$
\dot{\varepsilon}_{xx} = 0, \quad \dot{\varepsilon}_{yy} = 0, \quad
\dot{\gamma}_{xy} = k, \qquad
\omega_z = - \frac{k}{2}, \quad \zeta_z = - k
$$
**A pure shear is rotational**, which surprises everyone the first time: a fluid element in a Couette flow **rotates** as it translates, at half the vorticity.
**The worked case: a free vortex** $v_\theta = C / r$:
$$
\zeta_z = \frac{1}{r} \frac{\partial \left( r v_{\theta} \right)}{\partial r} = \frac{1}{r} \frac{\partial C}{\partial r} = 0
\quad \left( r > 0 \right)
$$
**irrotational**, even though every fluid element is going round a circle. The resolution is that the element **deforms** — it stretches tangentially and shrinks radially at exactly the rate that keeps it from rotating. **A free-vortex fluid element is like a car going round a roundabout while its wheels turn freely: it goes round the centre without spinning about its own.**
**The worked case: a forced vortex** $v_\theta = \Omega r$:
$$
\zeta_z = \frac{1}{r} \frac{\partial \left( \Omega r^{2} \right)}{\partial r} = 2 \Omega
$$
**every element rotates at $\Omega$, and the vorticity is twice the rotation rate** — the factor of two that trips every examination and every interview.
**The number that makes vorticity a design quantity.** In a turbine cascade a large share of the loss is associated with the **secondary (streamwise) vorticity** generated where the endwall boundary layers are turned by the blades, and designers measure it with five-hole-probe traverses of all three velocity components across the exit plane.
:::

## Worked cases

::: example Testing a velocity field {#ex-field}
Determine whether each field is (i) a possible incompressible flow and (ii) irrotational, and where both hold, find the stream function and the potential:
$\mathbf{V}_1 = \left( 2 x y,\ - y^{2} - 2 x z,\ 0 \right)$, $\mathbf{V}_2 = \left( x^{2} - y^{2},\ - 2 x y,\ 0 \right)$, $\mathbf{V}_3 = \left( - y,\ x,\ 0 \right)$.
::: solution
**Field 1.**
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z}
= 2 y + \left( - 2 y \right) + 0 = 0 \quad \checkmark \ \text{continuous}
$$
$$
\zeta_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = - 2 z - 2 x \ne 0
\quad \Rightarrow \quad \text{rotational}
$$
**A stream function exists** (the flow is two-dimensional and continuous):
$$
\psi = \int u\, d y = x y^{2} + f \left( x \right), \qquad
v = - \frac{\partial \psi}{\partial x} = - y^{2} - f' \left( x \right) = - y^{2} - 2 x z
$$
**which requires $f' = 2 x z$ — impossible, since $f$ may depend only on $x$.** **The field is not two-dimensional** despite $w = 0$, because $v$ depends on $z$. **The trap: $w = 0$ does not make a flow two-dimensional; $\partial / \partial z = 0$ does.** Field 1 is a valid three-dimensional incompressible flow with no stream function.
**Field 2.**
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 2 x - 2 x = 0 \quad \checkmark
\qquad
\zeta_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = - 2 y - \left( - 2 y \right) = 0
$$
**continuous and irrotational**, so both scalar functions exist. The stream function:
$$
\psi = \int u\, d y = \int \left( x^{2} - y^{2} \right) d y = x^{2} y - \frac{y^{3}}{3} + f \left( x \right)
$$
$$
v = - \frac{\partial \psi}{\partial x} = - 2 x y - f' \left( x \right) = - 2 x y
\quad \Rightarrow \quad f' = 0
$$
$$
\boxed{ \psi = x^{2} y - \frac{y^{3}}{3}, \qquad \phi = \frac{x^{3}}{3} - x y^{2} }
$$
where $\phi$ follows from $\partial \phi / \partial x = x^{2} - y^{2}$ and checks with $\partial \phi / \partial y = - 2 x y = v$.
**Field 3.** $\mathbf{V} = \left( - y, x, 0 \right)$:
$$
\nabla \cdot \mathbf{V} = 0 \quad \checkmark, \qquad
\zeta_z = 1 - \left( - 1 \right) = 2
$$
**continuous, rotational, a rigid-body rotation at unit rate.** $\psi = - \left( x^{2} + y^{2} \right) / 2 = - r^{2} / 2$, so the streamlines are **circles**, and no potential exists.
**The reading.** The three fields cover the useful cases: continuous-and-irrotational (2), continuous-and-rotational (1 and 3); a field that fails the continuity test is not an incompressible flow at all. **The single most useful habit in kinematics is to compute $\nabla \cdot \mathbf{V}$ and $\nabla \times \mathbf{V}$ before doing anything else**, because they tell you which of the two scalar functions you are allowed to use and therefore which solution method is available.
*Sanity.* Field 2 is the complex potential $W = z^{3} / 3$, whose derivative $z^{2} = \left( x^{2} - y^{2} \right) + 2 i x y = u - i v$ gives $u = x^{2} - y^{2}$, $v = - 2 x y$ — the flow in a $60^{\circ}$ corner. Changing the sign of $v$ to $\mathbf{V} = \left( x^{2} - y^{2}, 2 x y \right)$ gives $\nabla \cdot \mathbf{V} = 4 x$ and $\zeta_z = 4 y$: **one sign turns a potential flow into a field that is neither continuous nor irrotational**, which is the arithmetic version of the reason a sign error in a panel code is so destructive.
:::
:::

::: example A flow net by hand {#ex-flownet}
Estimate the seepage under a concrete dam with a $6\ \mathrm{m}$ head difference, a floor slab $2\ \mathrm{m}$ long upstream and $4\ \mathrm{m}$ long downstream, using a flow net of $4$ flow channels and $12$ potential drops, and find the uplift pressure at the dam's toe.
::: solution
**The flow-net discharge relation.** For a net of $N_f$ flow channels and $N_d$ equipotential drops made of curvilinear squares,
$$
q = k\, h\, \frac{N_f}{N_d} \quad \left[ \mathrm{m^{3} / s\ per\ metre\ length} \right]
$$
With $k = 2 \times 10^{- 4}\ \mathrm{m / s}$ (a medium sand), $h = 6\ \mathrm{m}$, $N_f = 4$, $N_d = 12$:
$$
q = 2 \times 10^{- 4} \times 6 \times \frac{4}{12} = 4.0 \times 10^{- 4}\ \mathrm{m^{3} / s\ per\ m}
$$
**$1.44\ \mathrm{m^{3}}$ per hour per metre of dam**, which is the number that sizes the drainage gallery's pump.
**The uplift.** The head drops by $6 / 12 = 0.5\ \mathrm{m}$ at each equipotential line. Under the dam's floor the flow net gives, say, $7$ drops between the upstream and downstream ends:
$$
h_{\mathrm{toe}} = 6 - 7 \times 0.5 = 2.5\ \mathrm{m} \text{ of head above the downstream level}
$$
**The uplift force per metre of dam**, taking the base as $8\ \mathrm{m}$ long and the pressure distribution as linear from $6\ \mathrm{m}$ at the heel to $2.5\ \mathrm{m}$ at the toe:
$$
u_{\mathrm{mean}} = \frac{6 + 2.5}{2} = 4.25\ \mathrm{m}, \qquad
U = 9.81 \times 4.25 \times 8 = 333.5\ \mathrm{kN / m}
$$
**against a dam weight of typically $1{,}800\ \mathrm{kN / m}$** — the uplift is **$18\ \%$** of the stabilising weight and reduces the base's effective stress and the overturning resistance by the same fraction.
**The number that makes a drainage curtain worth drilling.** A line of drainage holes at the toe relieves the head there to near the tailwater, and the mean uplift falls to $\left( 6 + 0.5 \right) / 2 = 3.25\ \mathrm{m}$:
$$
U = 9.81 \times 3.25 \times 8 = 255\ \mathrm{kN / m}
$$
**a $78\ \mathrm{kN / m}$ reduction in uplift**, and the reason most modern gravity dams have a drainage gallery.
**The exit gradient, which is the failure mode.** The hydraulic gradient at the downstream toe is $\Delta h / \Delta s$ where $\Delta s$ is the last flow-net square's length. If the last square is $0.6\ \mathrm{m}$ long,
$$
i_e = \frac{0.5}{0.6} = 0.83
$$
**against a critical gradient for a quartz sand ($G_s = 2.65$, void ratio $e = 0.6$) of $i_c = \left( G_s - 1 \right) / \left( 1 + e \right) = 1.65 / 1.6 = 1.03$** — a factor of safety of only $1.24$, well below the factor of $3$ or more usually required. **At a factor below one the toe boils**, and the remedy is a weighted filter at the toe or a longer seepage path.
*Sanity.* The reason the flow net works at all is that seepage in a saturated soil is governed by $\nabla^{2} h = 0$, which is **Laplace's equation in the same form as potential flow** — so the entire apparatus of $\phi$ and $\psi$ transfers, with the head $h$ in place of $\phi / k$ and the stream function in place of $\psi k$.
:::
:::

::: example A vortex and a wing {#ex-lift}
A wing of $12\ \mathrm{m}$ span and $2\ \mathrm{m}$ chord flies at $60\ \mathrm{m / s}$ at sea level. The bound circulation is estimated at $\Gamma = 12\ \mathrm{m^{2} / s}$. Find the lift, the circulation's distribution in the wake, the induced drag, and the downwash.
::: solution
**The lift, from Kutta–Joukowski.** With $\rho = 1.225\ \mathrm{kg / m^{3}}$:
$$
L' = \rho U \Gamma = 1.225 \times 60 \times 12 = 882\ \mathrm{N / m}
$$
**The total lift**, taking the circulation as uniform over the span (which it is not):
$$
L = 882 \times 12 = 10.6\ \mathrm{kN}
$$
**The lift coefficient.** With $S = 12 \times 2 = 24\ \mathrm{m^{2}}$ and $q = \tfrac{1}{2} \times 1.225 \times 3{,}600 = 2{,}205\ \mathrm{Pa}$:
$$
C_L = \frac{10{,}600}{2{,}205 \times 24} = 0.200
$$
**The circulation's wake.** Helmholtz's theorems require that a vortex line cannot end in the fluid, so the bound vortex of strength $\Gamma$ at each station must be **continued** — the classical model is a **horseshoe vortex** whose two trailing legs each have the full strength $\Gamma$, and the lifting-line model replaces them with a **sheet** of trailing vortices of strength $d \Gamma / d y$ per unit span.
**The downwash at the wing.** For an elliptic loading of total circulation $\Gamma_0$ and span $b$:
$$
w = - \frac{\Gamma_0}{2 b} = - \frac{12}{2 \times 12} = - 0.50\ \mathrm{m / s}
$$
**The induced angle and the induced drag.**
$$
\alpha_i = \frac{w}{U} = \frac{0.50}{60} = 0.00833\ \mathrm{rad} = 0.48^{\circ}
$$
$$
D_i = L \sin \alpha_i \approx L \alpha_i = 10{,}600 \times 0.00833 = 88\ \mathrm{N}
$$
$$
C_{D,i} = \frac{C_L^{2}}{\pi e A_R} = \frac{0.2^{2}}{\pi \times 1.0 \times 6} = 0.00212, \qquad
D_i = 0.00212 \times 2{,}205 \times 24 = 112\ \mathrm{N}
$$
**The $27\ \%$ discrepancy between the two estimates is the assumption of uniform circulation** in the first, and the fact that the elliptic value is the **minimum** induced drag for a given lift.
**The number that makes a winglet worth buying.** The induced drag is $88$ to $112\ \mathrm{N}$ against a total cruise drag of perhaps $900\ \mathrm{N}$ — **$10$ to $12\ \%$** — and a winglet recovers part of it. **The winglet is a kinematic device: it does not change the airfoil; it changes the spanwise distribution of the shed vorticity and so the downwash at the wing.**
**The tip vortex's strength and its hazard.** The full circulation is shed at the tip, and the vortex's tangential velocity at a distance $r$ from the core, in the **Scully** model with a core radius $r_c = 0.05\ b = 0.6\ \mathrm{m}$:
$$
v_{\theta} = \frac{\Gamma}{2 \pi} \frac{r}{r^{2} + r_c^{2}}
\quad \Rightarrow \quad v_{\theta,\max} = \frac{\Gamma}{4 \pi r_c} = \frac{12}{4 \pi \times 0.6} = 1.59\ \mathrm{m / s}
$$
**at the core edge**, and $1.40\ \mathrm{m / s}$ at $r = 1\ \mathrm{m}$. **A heavy transport's circulation is tens of times larger**, its tip vortices induce tangential velocities of tens of metres per second, and that is why air-traffic control imposes wake-turbulence separation minima between aircraft, graded by weight category.
*Sanity.* The reason the lift is $\rho U \Gamma$ and not $\rho U^{2} \Gamma$ is dimensional: $\left[ \rho U \Gamma \right] = \mathrm{kg \cdot m^{- 3} \cdot m \cdot s^{- 1} \cdot m^{2} \cdot s^{- 1}} = \mathrm{kg \cdot m \cdot s^{- 2}}$ per unit span, which is a force per metre. **The Kutta–Joukowski result is a statement about momentum flux through a contour and contains no information about the body's shape** — which is why the same formula gives the lift of a cylinder, an oval and an airfoil, and why the shape's whole contribution is hidden in the value of $\Gamma$.
:::
:::

::: example A contraction's acceleration {#ex-contraction}
A wind tunnel's settling chamber of $3.0\ \mathrm{m}$ diameter feeds a $0.6\ \mathrm{m}$ test section through a $4.0\ \mathrm{m}$ long contraction with the Bell–Mehta profile. Find the area ratio, the velocity and acceleration along the centreline, and the pressure gradient at the throat.
::: solution
**The area ratio and the velocity.**
$$
\frac{A_{\mathrm{sc}}}{A_{\mathrm{ts}}} = \left( \frac{3.0}{0.6} \right)^{2} = 25, \qquad
V_{\mathrm{ts}} = 25\, V_{\mathrm{sc}}
$$
For a test-section speed of $40\ \mathrm{m / s}$ the settling chamber runs at $1.6\ \mathrm{m / s}$, which is slow enough that the screens in it are efficient and the honeycomb's turning loss is negligible.
**The centreline velocity from the area law.** With the fifth-order diameter distribution
$$
D \left( x \right) = D_{\mathrm{ts}} + \left( D_{\mathrm{sc}} - D_{\mathrm{ts}} \right) \left( 1 - 10 \xi^{3} + 15 \xi^{4} - 6 \xi^{5} \right), \qquad \xi = \frac{x}{L}
$$
the profile has **zero slope and zero curvature at both ends** — the condition that keeps the boundary layer from seeing a sudden change in curvature, and the polynomial form recommended by Bell and Mehta.
**The acceleration.** From $V \left( x \right) = V_{\mathrm{ts}} \left( D_{\mathrm{ts}} / D \left( x \right) \right)^{2}$:
$$
a_x = V \frac{d V}{d x} = - \frac{2 V_{\mathrm{ts}}^{2}}{D} \frac{d D}{d x} \left( \frac{D_{\mathrm{ts}}}{D} \right)^{4}
$$
At both ends $d D / d x = 0$ by construction, so the acceleration is zero at the inlet and at the throat; in between it peaks where the velocity is already high but the wall is still converging. Evaluating the formula along the profile, the maximum is at $x \approx 3.35\ \mathrm{m}$, where $V \approx 31\ \mathrm{m / s}$ and
$$
a_{x,\max} \approx 950\ \mathrm{m / s^{2}} \approx 97\ g
$$
**The pressure gradient** there:
$$
\frac{d p}{d x} = - \rho a_x = - 1.225 \times 950 = - 1{,}170\ \mathrm{Pa / m}
$$
**against the $101\ \mathrm{kPa}$ of absolute pressure** — a favourable gradient of about $1.2\ \%$ of an atmosphere per metre, which a boundary layer negotiates without difficulty. **The failure mode is the opposite: an adverse gradient of the same magnitude separates the layer**, which is why a diffuser's angle is limited to $7^{\circ}$ and a nozzle's contraction can be at $20^{\circ}$.
**The number that sets the tunnel's turbulence level.** The contraction **decays** the turbulence entering it: the axial velocity fluctuation falls as $1 / \left( A_{\mathrm{sc}} / A_{\mathrm{ts}} \right) = 1 / 25$ and the transverse components as $1 / \sqrt{25} = 1 / 5$, so a settling chamber with $2\ \%$ turbulence delivers
$$
u'_{\mathrm{sc}} = 0.02 \times 1.6 = 0.032\ \mathrm{m / s}
\quad \xrightarrow{\ \times 1 / 25\ }\quad
u'_{\mathrm{ts}} = 1.28 \times 10^{- 3}\ \mathrm{m / s}
\quad \Rightarrow \quad \frac{u'}{U} = \frac{1.28 \times 10^{- 3}}{40} = 0.003\ \%
$$
**a factor of twenty-five reduction in the absolute fluctuation** and of $625$ in the relative intensity; even allowing $0.05\ \%$ for the boundary layers and the fan, the intensity falls by a factor of forty. This is why the contraction ratio is the first number chosen for a low-speed tunnel.
*Sanity.* The acceleration is about $97\ g$ while the pressure gradient is only $1.2\ \mathrm{kPa / m}$ because the density is $1.225\ \mathrm{kg / m^{3}}$ — **the same acceleration in water would need about $950\ \mathrm{kPa / m}$**.
:::
:::

::: history
**The Eulerian description** is **Euler**'s of **1755**, and the notation $D / D t$ for the derivative following a particle was introduced by **Stokes** in **1845**. **The stream function** goes back to **Lagrange** (**1781**) for plane flow and to **Stokes** (**1842**) for axisymmetric flow; the velocity potential also appears in Lagrange's work and was named by **Helmholtz** in **1858**. **Rankine** (**1864–1871**) built the method of sources and sinks that produces the Rankine oval and still fills the middle chapter of every aerodynamics text. **Complex-variable methods** entered fluid mechanics with the free-streamline theory of **Helmholtz** (**1868**) and **Kirchhoff** (**1869**) and were extended by **Rayleigh** in the **1870s**; **Milne-Thomson**'s *Theoretical Hydrodynamics* (**1938**) is a classic statement of the technique and is still readable. **Helmholtz's three vortex theorems** are of **1858**, and the third — that a vortex filament cannot end in the fluid — is the topological statement that makes a wing's trailing vortices, a tornado's funnel and a smoke ring's closed loop the same phenomenon. **The Kutta–Joukowski theorem** was published by **Kutta** in **1902** and independently by **Joukowsky** in **1906**, and the **boundary layer** that reconciles it with d'Alembert's paradox is **Prandtl**'s paper to the **1904** mathematical congress at Heidelberg — eight pages, and the birth of modern fluid mechanics. **Bell and Mehta**'s design study of fifth-order contraction profiles for small low-speed tunnels is a NASA report of **1988**.
:::

::: quiz
A plane flow has velocity potential $\phi = K ( x^{ 2 } - y^{ 2 } )$ and streamfunction $\psi = 2 K x y$. A small square of fluid released in the first quadrant will:

- [ ] Rotate, because the streamlines $x y = $ const are curved
- [x] Stretch along $x$ and flatten along $y$ with no rotation and no change of area — the flow is irrotational and incompressible, so the motion is pure strain
- [ ] Translate along $x$, because $\nabla \phi$ is a velocity
- [ ] Do nothing, because the flow is steady

::: solution
**Pure strain.** $u = \partial \phi / \partial x = 2 K x$, $v = - 2 K y$, so $\partial u / \partial x = 2 K$, $\partial v / \partial y = - 2 K$ — the volume dilation is zero — and the vorticity is $\omega_z = \partial v / \partial x - \partial u / \partial y = 0 - 0 = 0$. **The point being tested is the first option: curved streamlines do not imply rotation.** This is one of the most durable misconceptions in the subject. A potential vortex $\psi = K \ln r$ has circular streamlines and zero vorticity everywhere except at the origin, and a fluid element going round it deforms continuously without rotating, stretching tangentially and shrinking radially. **Rotation is the average angular velocity of two perpendicular material lines (the vorticity is twice it), not the curvature of the path**, and the distinction is the reason a wing's trailing vortex sheet carries all the flow's rotation while the flow around the wing itself is treated as potential.
:::
:::

## Where this leads

The material derivative is the left-hand side of [[fluid-mechanics/navier-stokes]]; the stream function and potential are the unknowns of [[fluid-mechanics/dimensional-analysis]]'s similarity arguments and of every panel and potential-flow code in [[aerodynamics]]; the circulation is the quantity that [[aerodynamics]]'s lifting-line theory solves for and [[propulsion]]'s blade-element method integrates; and the flow net is the same Laplace equation that [[heat-transfer]]'s conduction shapes and [[manufacturing]]'s seepage-under-dam problems solve.

::: summary
- The Eulerian description watches places and the Lagrangian watches parcels; the bridge is the material derivative $D / Dt = \partial / \partial t + \mathbf{V} \cdot \nabla$, and its convective term is present in steady flow.
- Pathlines, streaklines and streamlines coincide only in steady flow.
- Continuity is $\partial \rho / \partial t + \nabla \cdot (\rho \mathbf{V}) = 0$; for a constant-density fluid, $\nabla \cdot \mathbf{V} = 0$, and every velocity field must be tested against it.
- A stream function exists for any two-dimensional incompressible flow and its level curves are streamlines; a potential exists only where the flow is irrotational. Where both exist they are a Cauchy–Riemann pair.
- Circulation is a property of the region enclosed, not of the path: a free vortex is irrotational everywhere and still carries circulation.
- Superposition of uniform streams, sources, sinks, vortices and doublets generates the cylinder, the half-body and the oval — and the blockage correction that must be applied to every wind-tunnel number.
- Vorticity is twice the rotation rate of a fluid element; a forced vortex has vorticity $2\Omega$ and a free vortex has none.
- $L' = \rho U \Gamma$ says nothing about the body's shape, and everything depends on what sets $\Gamma$.
:::

## Exercises

::: exercise Continuity {level=1 check="0"}
Give the value of $\nabla \cdot \mathbf{V}$ for $\mathbf{V} = (2x,\; -3y,\; z)$.
::: solution
$\partial u / \partial x + \partial v / \partial y + \partial w / \partial z = 2 - 3 + 1 = 0$, so the field **is** a possible incompressible flow.
:::
:::

::: exercise Convective acceleration {level=1 check="16"}
Give the exit acceleration in metres per second squared of the nozzle $u = U_0(1 + x/L)$ with $U_0 = 2\ \mathrm{m/s}$ and $L = 0.5\ \mathrm{m}$.
::: solution
$a_x = u\, \partial u / \partial x = U_0^2 (1 + x/L) / L$; at $x = L$: $a_x = 2 \times 4 / 0.5 = 16\ \mathrm{m / s^{2}}$.
:::
:::

::: exercise Vorticity {level=1 check="2"}
Give the $z$-component of vorticity for the rigid-rotation field $\mathbf{V} = (-y, x, 0)$.
::: solution
$\zeta_z = \partial v / \partial x - \partial u / \partial y = 1 - (-1) = 2$.
:::
:::

::: exercise Cylinder {level=1 check="-3"}
Give the pressure coefficient at the shoulder of a circular cylinder in a potential stream, where the surface speed is $2U$.
::: solution
$C_p = 1 - (2)^2 = -3$.
:::
:::

::: exercise Kutta–Joukowski {level=1 check="882"}
Give the lift per metre of span in newtons for $\rho = 1.225\ \mathrm{kg/m^3}$, $U = 60\ \mathrm{m/s}$ and $\Gamma = 12\ \mathrm{m^2/s}$.
::: solution
$L' = 1.225 \times 60 \times 12 = 882\ \mathrm{N/m}$.
:::
:::

::: exercise Downwash {level=1 check="0.5"}
Give the downwash in metres per second at the wing of an elliptically loaded wing of $12\ \mathrm{m}$ span with a root circulation of $12\ \mathrm{m^2/s}$.
::: solution
$w = \Gamma_0 / (2b) = 12 / 24 = 0.5\ \mathrm{m/s}$.
:::
:::

::: exercise Area ratio {level=1 check="25"}
Give the contraction ratio of a wind tunnel with a $3.0\ \mathrm{m}$ settling chamber and a $0.6\ \mathrm{m}$ test section.
::: solution
$(3.0 / 0.6)^2 = 25$.
:::
:::

::: exercise Stream function {level=2}
A flow has $\psi = x^2 - y^2$. Give the velocity components and state whether a velocity potential exists.
::: solution
$$
u = \frac{\partial \psi}{\partial y} = - 2 y, \qquad v = - \frac{\partial \psi}{\partial x} = - 2 x
$$
$$
\zeta_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = - 2 - \left( - 2 \right) = 0
$$
**irrotational, so a potential exists.** From $u = \partial \phi / \partial x = - 2 y$ and $v = \partial \phi / \partial y = - 2 x$:
$$
\phi = - 2 x y + C
$$
**The reading.** $\phi = - 2xy$ and $\psi = x^{2} - y^{2}$ are a Cauchy–Riemann pair, and the flow is a **stagnation flow rotated by $45^{\circ}$**. The streamlines of $\psi$ are rectangular hyperbolae with asymptotes $y = \pm x$, and the lines $\phi = $ constant are the conjugate hyperbolae — the two families cross at right angles, which is the flow net in its simplest form.
:::
:::

::: exercise Half-body {level=2}
A source of strength $m = 8\ \mathrm{m^{2} / s}$ sits in a uniform stream of $4\ \mathrm{m / s}$. Give the distance from the source to the stagnation point and the half-body's asymptotic half-thickness.
::: solution
$$
r_{\mathrm{stag}} = \frac{m}{2 \pi U} = \frac{8}{2 \pi \times 4} = 0.318\ \mathrm{m}, \qquad
h = \frac{m}{2 U} = \frac{8}{8} = 1.0\ \mathrm{m}
$$
**The asymptotic half-thickness is $\pi = 3.14$ times the source-to-nose distance**, and the full asymptotic width $m / U = 2\ \mathrm{m}$ equals $2 h$ — the check that the arithmetic is right.
:::
:::

::: exercise Derivation {level=3}
Derive the two-dimensional continuity equation from a control volume, then show that the stream function satisfies it identically, and obtain the relation between the stream function and the flow rate between two streamlines.
::: solution
**The control volume.** Take a rectangle $\delta x \times \delta y$ of unit depth. The net mass efflux is
$$
\left[ \frac{\partial \left( \rho u \right)}{\partial x} \delta x + \frac{\partial \left( \rho v \right)}{\partial y} \delta y \right] \times 1
$$
and the rate of mass decrease inside is $- \partial \rho / \partial t \times \delta x \delta y$. Equating and dividing by $\delta x \delta y$:
$$
\frac{\partial \rho}{\partial t} + \frac{\partial \left( \rho u \right)}{\partial x} + \frac{\partial \left( \rho v \right)}{\partial y} = 0
$$
**For constant $\rho$** this is $\partial u / \partial x + \partial v / \partial y = 0$.
**The stream function satisfies it identically.** Substituting $u = \partial \psi / \partial y$, $v = - \partial \psi / \partial x$:
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y}
= \frac{\partial^{2} \psi}{\partial x \partial y} - \frac{\partial^{2} \psi}{\partial y \partial x} = 0
$$
**for any twice-differentiable $\psi$** — which is the sense in which the stream function "satisfies continuity identically" and the reason a two-dimensional incompressible problem has **one** unknown and not two.
**The flow rate between two streamlines.** Consider the quadrilateral formed by two streamlines $\psi_1$, $\psi_2$ and two curves joining them at $A$ and $B$. Since **no fluid crosses a streamline**, the flux out across $AB$ equals the flux along the two streamlines, and computing the flux across a path from $A$ to $B$:
$$
\dot{Q}_{A \to B} = \int_A^B \left( u\, d y - v\, d x \right)
= \int_A^B \left( \frac{\partial \psi}{\partial y} d y + \frac{\partial \psi}{\partial x} d x \right)
= \int_A^B d \psi = \psi_B - \psi_A
$$
$$
\boxed{ \dot{Q}_{1 \to 2} = \psi_2 - \psi_1 }
$$
**The path is arbitrary**, because the integrand is an exact differential — which is the same statement, in the other language, as continuity.
**The sign convention.** With $u = \partial \psi / \partial y$ and $v = - \partial \psi / \partial x$ the flow is **in the direction of increasing $\psi$ with $\psi$ on the left**, and a reader who adopts the opposite convention (many British texts use $u = - \partial \psi / \partial y$) must reverse every sign in this lesson. **The two conventions are both in current use and the only defence is to state which one you are using on the first page of any report.**
*Sanity.* The reason the same $\psi$ gives the flow rate **and** the streamline geometry is that both are statements of mass conservation, and the reason the derivation is worth doing once is that it explains why a **flow net drawn with equal $\Delta \psi$ and equal $\Delta \phi$** consists of curvilinear **squares**: the two conditions $\Delta \psi = u \Delta n$ and $\Delta \phi = u \Delta s$ give $\Delta n / \Delta s = 1$ when the increments are equal. **The square is not an aesthetic convention; it is the numerical statement that the mesh is correctly proportioned**, and a flow net whose cells are not squares is not a solution of Laplace's equation.
:::
:::

::: exercise Design {level=3}
Specify the kinematic design basis — velocity field, turbulence level, uniformity, blockage, test-section boundary layers and measurement — for a closed-circuit subsonic wind tunnel with a $2\ \mathrm{m} \times 1.5\ \mathrm{m}$ test section at up to $80\ \mathrm{m / s}$, and state the acceptance tests.
::: solution
**The circuit and its area ratios.**
$$
\begin{array}{l c c l}
\text{Test section} & 2.0 \times 1.5\ \mathrm{m} & 3.0\ \mathrm{m^{2}} & 80\ \mathrm{m / s} \\
\text{Settling chamber} & 6.0 \times 4.5\ \mathrm{m} & 27.0\ \mathrm{m^{2}} & 8.9\ \mathrm{m / s},\ A_r = 9 \\
\text{Second throat} & 4.0 \times 3.0\ \mathrm{m} & 12.0\ \mathrm{m^{2}} & 20\ \mathrm{m / s} \\
\text{Diffuser outlet} & 7.0 \times 5.25\ \mathrm{m} & 36.75\ \mathrm{m^{2}} & 6.5\ \mathrm{m / s} \\
\text{Fan} & 5.5\ \mathrm{m}\ \text{diameter} & & 12.5\ \mathrm{m / s}\ \text{axial}
\end{array}
$$
**The contraction.** A ratio of $9$ divides the axial fluctuation by $9$ and the axial turbulence intensity by $81$; the fifth-order profile over a $6.0\ \mathrm{m}$ length (linear ratio $3$) gives, by the same evaluation as in the worked example, a maximum centreline acceleration of
$$
a_{\max} \approx 1{,}900\ \mathrm{m / s^{2}} \approx 194\ g
$$
and a pressure gradient of $1.225 \times 1{,}900 = 2.3\ \mathrm{kPa / m}$, **favourable**, which the boundary layer accepts. **The contraction's job is to make the flow fast, straight and quiet, and its length is set by the second one.**
**The turbulence budget.**
$$
\begin{array}{l c}
\text{Settling-chamber grid turbulence} & 3\ \% \\
\text{Contraction decay } \left( A_r = 9 \right) & \times 1 / 9 \\
\text{Test-section boundary-layer contribution} & 0.04\ \% \\
\text{Fan blade-passing, filtered by the second throat} & 0.03\ \% \\
\hline
\text{Predicted test-section } u' / U \text{ (in quadrature)} & 0.06\ \%
\end{array}
$$
**The number that decides the settling screens.** The contraction turns the $3\ \%$ entering it into $3 / 81 = 0.037\ \%$, and the honeycomb and screens upstream are what bring the flow down to that $3\ \%$ in the first place — their open area and wire diameter are the tunnel's most important dimensions after the contraction ratio.
**The boundary layers in the test section.** The displacement thickness at the end of a $3\ \mathrm{m}$ long test section at $80\ \mathrm{m / s}$, with a trip at the contraction exit giving a turbulent layer from $x = 0$:
$$
\delta^{*} \approx 0.020 \left( \frac{\nu}{U x} \right)^{1 / 7} x
= 0.020 \times \left( \frac{1.5 \times 10^{- 5}}{80 \times 3} \right)^{1 / 7} \times 3 = 0.020 \times 0.0935 \times 3 = 5.6\ \mathrm{mm}
$$
**The effective blockage of the empty test section is $2 \times 5.6 / 1{,}500 = 0.75\ \%$** on the height, and the **solid** blockage limit for a model is set by keeping its velocity correction below $2\ \%$:
$$
\frac{\Delta U}{U} \approx \frac{\pi^{2}}{8} \left( \frac{d}{H} \right)^{2} \le 0.02
\quad \Rightarrow \quad \frac{d}{H} \le 0.127 \quad \Rightarrow \quad d \le 190\ \mathrm{mm}
$$
**A model whose maximum dimension exceeds $190\ \mathrm{mm}$ needs a closed test section with adaptive walls or a slotted one**, and the correction must be applied before the data are reduced.
**The measurement plan.**
$$
\begin{array}{l l l}
\text{Hot wire} & \text{single, then X-array} & \text{the } 0.06\ \% \text{ turbulence needs a } 0.01\ \% \text{ noise floor} \\
\text{Five-hole probe} & \text{traverse of the full section} & \text{the } \pm 0.2^{\circ} \text{ flow-angle uniformity} \\
\text{Pitot-static rake} & \text{nine positions} & \text{the } \pm 0.3\ \% \text{ dynamic-pressure uniformity} \\
\text{Pressure-sensitive paint} & \text{on the model} & \text{a whole-field check on the panel code} \\
\text{Schlieren} & \text{two orthogonal views} & \text{the boundary-layer trip's effectiveness}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Empty-section uniformity} & \pm 0.3\ \%\ \text{of } q \text{ over the central } 80\ \% \\
\text{Flow angularity} & \pm 0.2^{\circ} \text{ in both planes} \\
\text{Axial turbulence} & \le 0.10\ \% \text{ at } 60\ \mathrm{m / s} \\
\text{Static-pressure drift} & \le 2\ \mathrm{Pa / h} \\
\text{Long-term repeatability} & \pm 0.1\ \%\ \text{of } C_p \text{ over thirty days}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE TURBULENCE LEVEL SHALL BE MEASURED WITH A CALIBRATED HOT WIRE AND NOT INFERRED FROM A PITOT TUBE, AND SHALL BE REPORTED AS A SPECTRUM AND NOT A SINGLE NUMBER."** **"THE CONTRACTION RATIO, THE SETTLING-SCREEN PRESSURE-DROP RATIO AND THE HONEYCOMB LENGTH-TO-DIAMETER RATIO SHALL BE STATED ON THE NAMEPLATE."** **"THE EMPTY-TEST-SECTION PRESSURE GRADIENT SHALL BE MEASURED AND REPORTED FOR EACH OF THE FIVE TEST-SECTION LINERS."** **"THE BLOCKAGE-CORRECTION METHOD AND ITS VALID RANGE SHALL BE AGREED BEFORE THE FIRST MODEL IS BUILT."**
*Design comment.* The general rule is that **a wind tunnel is a turbulence-producing machine that has been persuaded to stop**, and that its specification is a list of the mechanisms by which it fails to be quiet rather than a list of its speeds — which is why two tunnels of identical size and speed can differ by a factor of ten in what they are good for.
:::
:::
