A steel bracket, a concrete dam, a turbine blade and the rubber mount under an engine all obey the same three statements. Every small piece of material is in equilibrium; the strains are derived from a continuous displacement field, so the pieces still fit together after deformation; and the stress at a point depends only on the strain at that point. The first two were set up in [[solid-mechanics/stress-strain-3d]] and hold for any material. The third — the **constitutive law** — is what distinguishes steel from rubber, and for most engineering metals, ceramics, polymers below their glass transition and timber within its working range it is linear: double the strains and the stresses double. Put the three statements together and you have the **theory of linear elasticity**, a closed set of fifteen equations for fifteen unknown fields that predicts the stress everywhere in a body from its shape, its supports and its loads.

The elementary formulas of [[mechanics-of-materials/stress-strain]] and [[mechanics-of-materials/bending-stress]] — $\sigma = P/A$, $\sigma = My/I$, $\tau = Tr/J$ — are approximate solutions of this theory, each resting on a guessed deformation ("plane sections remain plane"). This chapter shows where those guesses come from and when they fail. It builds the generalised Hooke's law and the relations between the elastic constants; assembles the boundary-value problem and proves that its solution is unique; reduces the two-dimensional problems of plane stress and plane strain to a single fourth-order equation for the **Airy stress function**; and uses it to solve, exactly, a cantilever with an end load and a plate with a circular hole — the second of which gives the factor of three that sits behind every stress-concentration chart in machine design.

## The generalised Hooke's law

Take a cube of isotropic material — one whose properties do not depend on direction — and pull it along $x$ with a stress $\sigma_x$. It stretches by $\varepsilon_x = \sigma_x/E$ and contracts sideways by $\varepsilon_y = \varepsilon_z = -\nu\sigma_x/E$. Pull it along $y$ and $z$ as well and, because the response is linear, the three effects simply add. A shear stress $\tau_{xy}$ produces only the shear strain $\gamma_{xy} = \tau_{xy}/G$: in an isotropic solid there is no direction for a shear to "prefer", so it cannot cause stretching along the axes, and a normal stress cannot cause a change of the right angle between $x$ and $y$.

::: definition Generalised Hooke's law for an isotropic solid {#def-hooke}
For a linear elastic, isotropic material with Young's modulus $E$, Poisson's ratio $\nu$ and shear modulus $G$, the strains produced by a general state of stress together with a uniform temperature change $\Delta T$ (coefficient of thermal expansion $\alpha$) are
$$
\begin{aligned}
\varepsilon_x &= \frac{1}{E}\bigl[\sigma_x - \nu(\sigma_y + \sigma_z)\bigr] + \alpha\,\Delta T, &
\gamma_{yz} &= \frac{\tau_{yz}}{G},\\
\varepsilon_y &= \frac{1}{E}\bigl[\sigma_y - \nu(\sigma_z + \sigma_x)\bigr] + \alpha\,\Delta T, &
\gamma_{zx} &= \frac{\tau_{zx}}{G},\\
\varepsilon_z &= \frac{1}{E}\bigl[\sigma_z - \nu(\sigma_x + \sigma_y)\bigr] + \alpha\,\Delta T, &
\gamma_{xy} &= \frac{\tau_{xy}}{G}.
\end{aligned}
$$ {#eq-hooke}
Here $\gamma_{ij}$ are the engineering shear strains, twice the tensor components $\varepsilon_{ij}$. In tensor notation, with $\delta_{ij}$ the Kronecker delta,
$$
\varepsilon_{ij} = \frac{1+\nu}{E}\,\sigma_{ij} - \frac{\nu}{E}\,\sigma_{kk}\,\delta_{ij} + \alpha\,\Delta T\,\delta_{ij}.
$$
:::

The tensor form says the shear part needs $(1+\nu)/E = 1/(2G)$ for consistency with $\gamma_{xy} = 2\varepsilon_{xy} = \tau_{xy}/G$, so only **two** of $E$, $\nu$, $G$ are independent:

$$
G = \frac{E}{2(1+\nu)}.
$$ {#eq-G}

This is not an extra assumption but a consequence of isotropy. A quick proof: a state of pure shear $\tau$ in the $xy$ axes is, in axes at $45°$, tension $\tau$ on one diagonal and compression $-\tau$ on the other ([[mechanics-of-materials/stress-transformation]]). Hooke's law in the rotated axes gives a diagonal strain $(\tau + \nu\tau)/E$, and the strain transformation says this equals $\gamma_{xy}/2$; hence $\gamma_{xy} = 2(1+\nu)\tau/E$.

### Inverting the law: the Lamé constants

Solving [[#eq-hooke]] for the stresses (set $\Delta T = 0$ for now) gives the form used in the field equations. Adding the three normal-strain equations shows that the **volumetric strain** $e = \varepsilon_x + \varepsilon_y + \varepsilon_z$ — the fractional change of volume, to first order — depends only on the mean stress:

$$
e = \frac{1-2\nu}{E}\,(\sigma_x + \sigma_y + \sigma_z) = \frac{\sigma_m}{K},
\qquad \sigma_m = \tfrac13(\sigma_x + \sigma_y + \sigma_z), \qquad K = \frac{E}{3(1-2\nu)}.
$$ {#eq-bulk}

::: definition Lamé constants and the bulk modulus {#def-lame}
The **Lamé constants** $\lambda$ and $\mu$ are defined by the inverse of Hooke's law,
$$
\sigma_{ij} = \lambda\, e\,\delta_{ij} + 2\mu\,\varepsilon_{ij},
\qquad\text{e.g.}\quad
\sigma_x = \lambda e + 2\mu\varepsilon_x,\quad \tau_{xy} = \mu\gamma_{xy},
$$ {#eq-lame}
so that $\mu = G$ and
$$
\lambda = \frac{E\nu}{(1+\nu)(1-2\nu)}, \qquad
K = \lambda + \tfrac23\mu = \frac{E}{3(1-2\nu)}, \qquad
E = \frac{\mu(3\lambda + 2\mu)}{\lambda + \mu}, \qquad
\nu = \frac{\lambda}{2(\lambda + \mu)}.
$$
The **bulk modulus** $K$ relates mean stress to volume change, $\sigma_m = K e$. Any two of $E, \nu, G, K, \lambda$ determine the rest.
:::

To check the expression for $\lambda$: from [[#eq-hooke]], $\varepsilon_x = [(1+\nu)\sigma_x - \nu\cdot 3\sigma_m]/E$, so $\sigma_x = \frac{E}{1+\nu}\varepsilon_x + \frac{3\nu}{1+\nu}\sigma_m = 2G\varepsilon_x + \frac{3\nu K}{1+\nu}e$, and $\frac{3\nu K}{1+\nu} = \frac{E\nu}{(1+\nu)(1-2\nu)} = \lambda$.

::: proposition Bounds on Poisson's ratio {#prop-nu-bounds}
If an isotropic linear elastic material stores positive strain energy in every deformation, then $G > 0$ and $K > 0$, and consequently
$$
-1 < \nu < \tfrac12 .
$$
:::

::: proof
The strain energy density of a linear elastic solid is $U_0 = \tfrac12\sigma_{ij}\varepsilon_{ij}$ (the work done by the stresses on the way from zero, see [[solid-mechanics/energy-methods]]). Split the strain into a volumetric part and a **deviatoric** part, $\varepsilon_{ij} = \tfrac13 e\,\delta_{ij} + \varepsilon'_{ij}$ with $\varepsilon'_{kk} = 0$. With [[#eq-lame]], $\sigma_{ij} = K e\,\delta_{ij} + 2G\varepsilon'_{ij}$, and the cross terms vanish because $\delta_{ij}\varepsilon'_{ij} = \varepsilon'_{kk} = 0$:
$$
U_0 = \tfrac12 K e^2 + G\,\varepsilon'_{ij}\varepsilon'_{ij}.
$$
A pure volume change ($\varepsilon' = 0$, $e \ne 0$) gives $U_0 = \tfrac12 K e^2$, which is positive only if $K > 0$; a pure distortion ($e = 0$) gives $U_0 = G\varepsilon'_{ij}\varepsilon'_{ij}$, positive only if $G > 0$. Now $G = E/[2(1+\nu)] > 0$ and $K = E/[3(1-2\nu)] > 0$. Their ratio $K/G = 2(1+\nu)/[3(1-2\nu)]$ must be positive, which requires $1 + \nu$ and $1 - 2\nu$ to have the same sign; both negative is impossible ($\nu < -1$ and $\nu > \tfrac12$ at once), so both are positive: $-1 < \nu < \tfrac12$. With $G > 0$ this also makes $E > 0$.
:::

Real materials sit well inside the bounds: metals have $\nu \approx 0.27$–$0.35$, glass and ceramics $0.2$–$0.25$, cork about $0$ (which is why it seals a bottle without bulging), and rubber $0.499\ldots$ — so nearly incompressible that $K$ is three orders of magnitude larger than $G$. Engineered foams and lattices with $\nu < 0$ (auxetics) widen when stretched. The figure shows how sharply $K$ and $\lambda$ blow up near $\nu = \tfrac12$.

::: widget plot
f: 1/(2*(1+x)); 1/(3*(1-2*x)); x/((1+x)*(1-2*x))
x: -0.9, 0.49
y: -2, 6
labels: G/E; K/E; \lambda/E
hlines: 0
vlines: 0.3
caption: The elastic constants $G$, $K$ and $\lambda$ divided by $E$ as functions of Poisson's ratio $\nu$ (horizontal axis). The dashed line marks a typical metal, $\nu = 0.3$, where $G \approx 0.38E$ and $K \approx 0.83E$. Move towards $\nu = 0.5$ and watch $K/E$ and $\lambda/E$ diverge: a nearly incompressible material such as rubber resists volume change almost rigidly while shearing easily. Towards $\nu = -1$, $G$ grows and $K$ falls; note also that $\lambda$ is negative for $\nu < 0$.
:::

::: example Elastic constants of structural steel {#ex-constants}
Structural steel has $E = 200\,\mathrm{GPa}$ and $\nu = 0.30$. Find $G$, $\lambda$ and $K$, and the "constrained modulus" $M = \lambda + 2\mu$ that relates stress to strain when a bar is compressed with its sides held rigidly.
::: solution
$$
\begin{aligned}
G = \mu &= \frac{E}{2(1+\nu)} = \frac{200}{2.6}\,\mathrm{GPa} = 76.9\,\mathrm{GPa},\\
\lambda &= \frac{E\nu}{(1+\nu)(1-2\nu)} = \frac{200 \times 0.30}{1.30 \times 0.40}\,\mathrm{GPa} = 115.4\,\mathrm{GPa},\\
K &= \frac{E}{3(1-2\nu)} = \frac{200}{1.2}\,\mathrm{GPa} = 166.7\,\mathrm{GPa},\\
M &= \lambda + 2\mu = 115.4 + 153.8 = 269.2\,\mathrm{GPa}.
\end{aligned}
$$
Checks: $K = \lambda + \tfrac23\mu = 115.4 + 51.3 = 166.7\,\mathrm{GPa}$ ✓, and $\nu = \lambda/[2(\lambda+\mu)] = 115.4/384.6 = 0.300$ ✓. The constrained modulus is 35 % higher than $E$: a bar that cannot expand sideways is stiffer, because part of the load is now carried by the volume change, which the material resists with $K$. For rubber ($\nu \to 0.5$) the same ratio becomes enormous, which is why a thin rubber pad bonded between steel plates is soft in shear but very stiff in compression — the principle of laminated elastomeric bridge bearings.
:::
:::

::: example Volume change of a loaded block {#ex-volume}
A $100\,\mathrm{mm}$ aluminium cube ($E = 70\,\mathrm{GPa}$, $\nu = 1/3$) carries $\sigma_x = 80\,\mathrm{MPa}$, $\sigma_y = -40\,\mathrm{MPa}$, $\sigma_z = -20\,\mathrm{MPa}$ with no shear. Find the three normal strains and the change of volume.
::: solution
From [[#eq-hooke]] with $E = 70\,000\,\mathrm{MPa}$:
$$
\begin{aligned}
\varepsilon_x &= \frac{80 - \tfrac13(-40 - 20)}{70\,000} = \frac{100}{70\,000} = 1.429\times10^{-3},\\
\varepsilon_y &= \frac{-40 - \tfrac13(-20 + 80)}{70\,000} = \frac{-60}{70\,000} = -0.857\times10^{-3},\\
\varepsilon_z &= \frac{-20 - \tfrac13(80 - 40)}{70\,000} = \frac{-33.3}{70\,000} = -0.476\times10^{-3}.
\end{aligned}
$$
The volumetric strain is $e = (1.429 - 0.857 - 0.476)\times10^{-3} = 0.0952\times10^{-3}$. Check with [[#eq-bulk]]: $K = 70/(3 \times \tfrac13)\,\mathrm{GPa} = 70\,\mathrm{GPa}$, $\sigma_m = (80 - 40 - 20)/3 = 6.67\,\mathrm{MPa}$, $e = 6.67/70\,000 = 0.0952\times10^{-3}$ ✓. The volume change is $\Delta V = eV = 0.0952\times10^{-3} \times 10^{6}\,\mathrm{mm^3} = 95\,\mathrm{mm^3}$ — less than a tenth of a cubic millimetre per cubic centimetre, even though each individual strain is over ten times larger. Large distortions at nearly constant volume are typical whenever the stresses have mixed signs.
:::
:::

::: warning Hooke's law is three-dimensional even when the load is not
The most common error in elasticity is to write $\varepsilon_x = \sigma_x/E$ when other normal stresses are present, or $\sigma_z = 0$ when the material is prevented from expanding in $z$. A thick plate, a shaft pressed into a hub, a weld cooling between rigid parts — all have a lateral constraint that creates stress in a direction with no applied load. Write all three normal strains, decide for each direction whether the *stress* or the *strain* is known (free surface: stress zero; rigid constraint: strain zero), and solve. A fully constrained block heated by $\Delta T$, for instance, has $e = 0$ and therefore a hydrostatic stress $\sigma = -E\alpha\,\Delta T/(1-2\nu)$, not $-E\alpha\,\Delta T$.
:::

## The boundary-value problem of elasticity

Collect the field equations for a body occupying a region $V$ with boundary $S$, loaded by body forces $\mathbf{b}$ (per unit volume, for example gravity $\rho\mathbf{g}$) and by tractions on part of its surface:

- **Equilibrium** (3 equations): $\partial\sigma_{ij}/\partial x_j + b_i = 0$, for example $\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y + \partial\tau_{xz}/\partial z + b_x = 0$.
- **Strain–displacement** (6 equations): $\varepsilon_{ij} = \tfrac12(\partial u_i/\partial x_j + \partial u_j/\partial x_i)$.
- **Hooke's law** (6 equations): [[#eq-lame]].

The unknowns are 6 stresses, 6 strains and 3 displacements: fifteen equations, fifteen unknowns. Compatibility does not appear as a separate equation because the strains are *defined* from a displacement field; it reappears when the problem is solved in terms of stresses or strains alone.

::: definition Boundary conditions {#def-bcs}
On each part of the surface $S$ (outward unit normal $\mathbf{n}$) one of the following is prescribed in each direction:

- **traction** conditions $\sigma_{ij}n_j = \bar t_i$ on $S_t$ — a free surface has $\bar{\mathbf{t}} = \mathbf{0}$, a surface under pressure $p$ has $\bar{\mathbf{t}} = -p\,\mathbf{n}$;
- **displacement** conditions $u_i = \bar u_i$ on $S_u$ — a welded or clamped face has $\bar{\mathbf{u}} = \mathbf{0}$;
- **mixed** conditions — for example a frictionless roller support, where the normal displacement and the tangential traction are zero.

The problem is **well posed** when exactly one condition is given for each component at each surface point.
:::

### Navier's equations

Substituting the strain–displacement relations into Hooke's law, and the result into equilibrium, removes stresses and strains and leaves three equations for the three displacement components.

::: proposition Navier's displacement equations {#prop-navier}
In a homogeneous, isotropic linear elastic body with body force $\mathbf{b}$, the displacement field satisfies
$$
(\lambda + \mu)\,\nabla(\nabla\cdot\mathbf{u}) + \mu\,\nabla^2\mathbf{u} + \mathbf{b} = \mathbf{0}.
$$ {#eq-navier}
:::

::: proof
Assume small strains, a homogeneous material (constant $\lambda$, $\mu$) and static equilibrium. From [[#eq-lame]] and $\varepsilon_{ij} = \tfrac12(u_{i,j} + u_{j,i})$, where a comma denotes differentiation,
$$
\sigma_{ij} = \lambda\,u_{k,k}\,\delta_{ij} + \mu\,(u_{i,j} + u_{j,i}).
$$
Differentiate with respect to $x_j$ and sum over $j$:
$$
\sigma_{ij,j} = \lambda\,u_{k,ki} + \mu\,u_{i,jj} + \mu\,u_{j,ij}
= (\lambda + \mu)\,u_{j,ji} + \mu\,u_{i,jj},
$$
using $u_{k,ki} = u_{j,ji}$ (rename the dummy index) and the equality of mixed partial derivatives. Here $u_{j,j} = \nabla\cdot\mathbf{u} = e$ and $u_{i,jj} = (\nabla^2\mathbf{u})_i$. Inserting into $\sigma_{ij,j} + b_i = 0$ gives [[#eq-navier]].
:::

Navier's equations are the natural formulation when displacements are prescribed and the starting point of almost every numerical method: the finite element method of [[finite-element-method/weak-forms]] solves their weak form. When tractions are prescribed everywhere, it is often easier to work with stresses, and then the six compatibility equations of [[solid-mechanics/stress-strain-3d]], rewritten in stresses through Hooke's law, become the **Beltrami–Michell equations**; with no body force they read $(1+\nu)\nabla^2\sigma_{ij} + \partial^2\sigma_{kk}/\partial x_i\partial x_j = 0$. The Airy stress function below is the two-dimensional version of this route.

### Uniqueness and Saint-Venant's principle

Two facts make it legitimate to find elasticity solutions by inspired guessing. The first is that any field satisfying all the equations is *the* answer.

::: theorem Uniqueness of the elastic solution {#thm-unique}
For a linear elastic body whose strain energy density is positive definite, the boundary-value problem with prescribed body forces, tractions on $S_t$ and displacements on $S_u$ has at most one stress field. If $S_u$ prevents rigid-body motion, the displacement field is unique as well; if $S_u$ is empty, it is unique up to a rigid-body motion.
:::

::: proof
Suppose $\mathbf{u}^{(1)}$ and $\mathbf{u}^{(2)}$ both solve the problem, and let $\mathbf{w} = \mathbf{u}^{(1)} - \mathbf{u}^{(2)}$ with strains $\varepsilon_{ij}$ and stresses $\sigma_{ij}$. Because the equations are linear, $\mathbf{w}$ solves the problem with **zero** body force, zero traction on $S_t$ and zero displacement on $S_u$. Consider the integral $\int_S \sigma_{ij}n_j w_i\,dS$. On $S_t$ the traction $\sigma_{ij}n_j$ is zero; on $S_u$ the displacement $w_i$ is zero; so the integral vanishes. By the divergence theorem,
$$
0 = \int_S \sigma_{ij}n_j w_i\,dS = \int_V (\sigma_{ij}w_i)_{,j}\,dV
= \int_V \sigma_{ij,j}\,w_i\,dV + \int_V \sigma_{ij}w_{i,j}\,dV.
$$
The first volume integral is zero by equilibrium with no body force. In the second, $\sigma_{ij}$ is symmetric, so $\sigma_{ij}w_{i,j} = \sigma_{ij}\varepsilon_{ij} = 2U_0$. Hence $\int_V 2U_0\,dV = 0$. With $U_0 \ge 0$ everywhere and zero only when the strain is zero, $\varepsilon_{ij} = 0$ throughout $V$, and so $\sigma_{ij} = 0$: the two stress fields are equal. Zero strain everywhere means $\mathbf{w}$ is a rigid-body motion, which the supports on $S_u$ remove if they are sufficient.
:::

The second fact concerns the boundary conditions that are *not* satisfied exactly. An exact solution needs the traction at every point of the loaded surface; in practice we know only the resultant force and moment that a bolt or a weld applies.

::: remark Saint-Venant's principle
If a system of forces acting on a small part of the surface of an elastic body is replaced by a statically equivalent system (same resultant force and moment) on the same part, the stresses change appreciably only near that part — within a distance of about the largest dimension of the loaded area. Saint-Venant stated it in 1855 to justify his torsion solutions; it is a principle, confirmed by countless solutions and experiments and proved rigorously only for special cases. It is the reason a beam formula is accurate one beam depth away from a support or a point load, and wrong right next to it.
:::

## Plane stress and plane strain

Many bodies are effectively two-dimensional. A thin plate loaded in its own plane cannot develop significant stress through its thickness, because both faces are free: this is **plane stress**, $\sigma_z = \tau_{xz} = \tau_{yz} = 0$. A long dam, a tunnel lining or a long pipe loaded uniformly along its length cannot deform along its length: this is **plane strain**, $\varepsilon_z = \gamma_{xz} = \gamma_{yz} = 0$. In both cases the in-plane fields depend only on $x$ and $y$.

::: definition Plane stress and plane strain {#def-plane}
In **plane stress**, $\sigma_z = 0$ and the in-plane Hooke's law is
$$
\varepsilon_x = \frac{\sigma_x - \nu\sigma_y}{E}, \qquad
\varepsilon_y = \frac{\sigma_y - \nu\sigma_x}{E}, \qquad
\gamma_{xy} = \frac{2(1+\nu)}{E}\,\tau_{xy}, \qquad
\varepsilon_z = -\frac{\nu}{E}(\sigma_x + \sigma_y).
$$
In **plane strain**, $\varepsilon_z = 0$, which requires the out-of-plane stress
$$
\sigma_z = \nu(\sigma_x + \sigma_y),
$$ {#eq-sigz}
and the in-plane law becomes
$$
\varepsilon_x = \frac{1-\nu^2}{E}\Bigl(\sigma_x - \frac{\nu}{1-\nu}\sigma_y\Bigr), \qquad
\varepsilon_y = \frac{1-\nu^2}{E}\Bigl(\sigma_y - \frac{\nu}{1-\nu}\sigma_x\Bigr), \qquad
\gamma_{xy} = \frac{2(1+\nu)}{E}\,\tau_{xy}.
$$
The two laws have the same form: **a plane-strain problem is solved by the plane-stress formulas with $E$ and $\nu$ replaced by**
$$
E' = \frac{E}{1-\nu^2}, \qquad \nu' = \frac{\nu}{1-\nu}.
$$ {#eq-plane-swap}
:::

The plane-strain law follows by putting $\varepsilon_z = 0$ in [[#eq-hooke]] to get [[#eq-sigz]], and substituting $\sigma_z$ into the expression for $\varepsilon_x$: $E\varepsilon_x = \sigma_x - \nu\sigma_y - \nu^2(\sigma_x + \sigma_y) = (1-\nu^2)\sigma_x - \nu(1+\nu)\sigma_y$, which is the stated form. The shear term is unchanged because $2(1+\nu')/E' = 2(1+\nu)/E$ — check it in [[#ex-plane-proof]].

Plane stress and plane strain are the two ends of a range: a thin plate is close to plane stress, a thick one is close to plane strain in its interior and plane stress at its faces. The distinction matters greatly in [[solid-mechanics/fracture-mechanics]], where the through-thickness constraint at a crack tip changes the fracture toughness.

## The Airy stress function

In two dimensions with no body force, equilibrium reads

$$
\frac{\partial\sigma_x}{\partial x} + \frac{\partial\tau_{xy}}{\partial y} = 0, \qquad
\frac{\partial\tau_{xy}}{\partial x} + \frac{\partial\sigma_y}{\partial y} = 0.
$$

G. B. Airy noticed that both are satisfied identically by deriving the three stresses from one function. The cost is that compatibility, which equilibrium knows nothing about, now becomes a condition on that function.

::: theorem The Airy stress function and the biharmonic equation {#thm-airy}
In plane stress or plane strain with no body forces, let
$$
\sigma_x = \frac{\partial^2\phi}{\partial y^2}, \qquad
\sigma_y = \frac{\partial^2\phi}{\partial x^2}, \qquad
\tau_{xy} = -\frac{\partial^2\phi}{\partial x\,\partial y}.
$$ {#eq-airy}
Then equilibrium is satisfied for every smooth $\phi(x, y)$, and the strains are compatible if and only if
$$
\nabla^4\phi = \frac{\partial^4\phi}{\partial x^4} + 2\frac{\partial^4\phi}{\partial x^2\,\partial y^2} + \frac{\partial^4\phi}{\partial y^4} = 0 .
$$ {#eq-biharmonic}
The equation contains no elastic constant: for a simply connected body with traction boundary conditions, the in-plane stresses do not depend on $E$ or $\nu$.
:::

::: proof
**Equilibrium.** $\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y = \phi_{,yyx} - \phi_{,xyy} = 0$ and $\partial\tau_{xy}/\partial x + \partial\sigma_y/\partial y = -\phi_{,xyx} + \phi_{,xxy} = 0$, by equality of mixed derivatives.

**Compatibility.** In two dimensions the only non-trivial compatibility equation ([[solid-mechanics/stress-strain-3d]]) is
$$
\frac{\partial^2\varepsilon_x}{\partial y^2} + \frac{\partial^2\varepsilon_y}{\partial x^2} = \frac{\partial^2\gamma_{xy}}{\partial x\,\partial y}.
$$
It follows from $\varepsilon_x = u_{,x}$, $\varepsilon_y = v_{,y}$, $\gamma_{xy} = u_{,y} + v_{,x}$ (both sides equal $u_{,xyy} + v_{,yxx}$), and conversely it guarantees, in a simply connected region, that a single-valued displacement field exists. Insert the plane-stress Hooke's law and [[#eq-airy]]:
$$
\varepsilon_x = \frac{\phi_{,yy} - \nu\phi_{,xx}}{E}, \qquad
\varepsilon_y = \frac{\phi_{,xx} - \nu\phi_{,yy}}{E}, \qquad
\gamma_{xy} = -\frac{2(1+\nu)}{E}\,\phi_{,xy}.
$$
Then
$$
\frac{1}{E}\bigl(\phi_{,yyyy} - \nu\phi_{,xxyy} + \phi_{,xxxx} - \nu\phi_{,xxyy}\bigr) = -\frac{2(1+\nu)}{E}\,\phi_{,xxyy},
$$
and the terms in $\nu$ cancel, leaving $\phi_{,xxxx} + 2\phi_{,xxyy} + \phi_{,yyyy} = 0$. For plane strain replace $E$, $\nu$ by $E'$, $\nu'$ of [[#eq-plane-swap]]; the constants cancel in the same way, so [[#eq-biharmonic]] holds in both cases. Since neither the field equation nor traction boundary conditions contain $E$ or $\nu$, neither do the stresses (for a simply connected body; a body with holes needs extra conditions for single-valued displacements, which can bring $\nu$ back in).
:::

The constant-free result is what made **photoelasticity** possible: a stress pattern measured in a transparent plastic model holds for the steel part of the same shape. In polar coordinates $(r, \theta)$, which suit holes and discs, the same theorem reads

$$
\sigma_r = \frac{1}{r}\frac{\partial\phi}{\partial r} + \frac{1}{r^2}\frac{\partial^2\phi}{\partial\theta^2}, \qquad
\sigma_\theta = \frac{\partial^2\phi}{\partial r^2}, \qquad
\tau_{r\theta} = -\frac{\partial}{\partial r}\Bigl(\frac{1}{r}\frac{\partial\phi}{\partial\theta}\Bigr),
\qquad
\nabla^2 = \frac{\partial^2}{\partial r^2} + \frac{1}{r}\frac{\partial}{\partial r} + \frac{1}{r^2}\frac{\partial^2}{\partial\theta^2}.
$$ {#eq-airy-polar}

::: algorithm The inverse (semi-inverse) method {#alg-semi-inverse}
1. From the loading and the beam or plate theory you expect to be nearly right, guess the form of one stress component (for example $\sigma_x$ linear in $y$ for a beam).
2. Integrate [[#eq-airy]] to find the corresponding form of $\phi$, with unknown functions or polynomial coefficients.
3. Impose $\nabla^4\phi = 0$ to restrict those coefficients.
4. Impose the traction conditions on the long boundaries exactly, and on short ends only through resultant forces and moments (Saint-Venant's principle).
5. If needed, find the displacements by integrating the strains, and fix the rigid-body terms with the support conditions.
:::

Polynomials are the simplest trial functions: any polynomial of degree three or less is biharmonic, and a quadratic $\phi = \tfrac12(a x^2 + 2b\,xy + c\,y^2)$ gives a uniform stress state $\sigma_x = c$, $\sigma_y = a$, $\tau_{xy} = -b$. Higher degrees must have their coefficients related by [[#eq-biharmonic]].

### The cantilever with an end load

Take a cantilever of length $L$, depth $h = 2c$ and thickness $b$, with $x$ along the axis measured from the free end, $y$ upwards from the centroidal axis, and a downward end load $P$ applied at $x = 0$ as a shear traction over the end face; the beam is built in at $x = L$. The free-body diagram of the part between the free end and a section at $x$ shows the load $P$ downward at $x = 0$, and on the cut face an upward resultant shear $P$ and a hogging moment $Px$. Beam theory suggests $\sigma_x = Pxy/I$, with $I = bh^3/12 = 2bc^3/3$: zero at the free end, growing linearly, tension on top.

::: example The exact cantilever solution {#ex-cantilever}
Find the Airy function that gives $\sigma_x = Pxy/I$ with free upper and lower surfaces, the stresses, and the deflection of the loaded end when the built-in end has its axis horizontal and its cross-section at the centroid vertical, $\partial u/\partial y = 0$. Evaluate for a steel beam with $P = 10\,\mathrm{kN}$, $L = 1.0\,\mathrm{m}$, $h = 0.20\,\mathrm{m}$, $b = 0.05\,\mathrm{m}$, $E = 200\,\mathrm{GPa}$, $\nu = 0.3$.
::: solution
**Stress function.** Stresses are forces per unit area; the thickness $b$ enters only through $I = bh^3/12$. From $\phi_{,yy} = Pxy/I$, $\phi = Pxy^3/(6I) + f(x)\,y + g(x)$. The upper and lower surfaces carry no normal load, so $\sigma_y = \phi_{,xx} = f''(x)\,y + g''(x) = 0$ for all $y$: $f$ and $g$ are linear, and $g$ contributes no stress. Writing $f = a_1 x$ (a constant in $f$ gives no stress either),
$$
\phi = \frac{Pxy^3}{6I} + a_1 xy, \qquad \nabla^4\phi = 0 \text{ (every term is at most cubic in each variable and } \phi_{,xxyy} = 0).
$$
Then $\tau_{xy} = -\phi_{,xy} = -Py^2/(2I) - a_1$. The surfaces $y = \pm c$ are free of shear, so $a_1 = -Pc^2/(2I)$, and
$$
\sigma_x = \frac{Pxy}{I}, \qquad \sigma_y = 0, \qquad \tau_{xy} = \frac{P}{2I}(c^2 - y^2).
$$
The end-face shear integrates to $b\int_{-c}^{c}\tfrac{P}{2I}(c^2 - y^2)\,dy = \tfrac{Pb}{2I}\cdot\tfrac{4c^3}{3} = P$ ✓. So the elementary bending and shear formulas are *exact* — provided the load at the free end is distributed parabolically. Any other distribution with resultant $P$ changes the stresses only near the end.

**Displacements.** Plane stress, $\varepsilon_x = u_{,x} = Pxy/(EI)$, $\varepsilon_y = v_{,y} = -\nu Pxy/(EI)$, $\gamma_{xy} = u_{,y} + v_{,x} = P(c^2 - y^2)/(2GI)$. Integrating the first two,
$$
u = \frac{Px^2y}{2EI} + F(y), \qquad v = -\frac{\nu Pxy^2}{2EI} + H(x).
$$
Substitute in the shear strain and separate the terms in $x$ from those in $y$:
$$
\Bigl[\frac{Px^2}{2EI} + H'(x)\Bigr] + \Bigl[F'(y) - \frac{\nu Py^2}{2EI} + \frac{Py^2}{2GI}\Bigr] = \frac{Pc^2}{2GI}.
$$
Each bracket must be a constant, $d$ and $e$ with $d + e = Pc^2/(2GI)$. Integrating, $H = -Px^3/(6EI) + dx + h_0$ and $F = \nu Py^3/(6EI) - Py^3/(6GI) + ey + k_0$. Support conditions at $x = L$, $y = 0$: $u = 0$ gives $k_0 = 0$; $\partial u/\partial y = 0$ gives $PL^2/(2EI) + e = 0$, so $e = -PL^2/(2EI)$ and $d = PL^2/(2EI) + Pc^2/(2GI)$; $v = 0$ gives $h_0 = PL^3/(6EI) - dL$. The deflection of the loaded end's centroid is therefore
$$
v(0,0) = h_0 = -\frac{PL^3}{3EI} - \frac{Pc^2L}{2GI} = -\Bigl(\frac{PL^3}{3EI} + \frac{3PL}{2AG}\Bigr), \qquad A = bh.
$$
The first term is the beam-theory deflection; the second is **shear deformation**, which beam theory leaves out.

**Numbers.** $I = 0.05 \times 0.2^3/12 = 3.333\times10^{-5}\,\mathrm{m^4}$, $A = 0.01\,\mathrm{m^2}$, $G = 76.9\,\mathrm{GPa}$:
$$
\frac{PL^3}{3EI} = \frac{10^4 \times 1^3}{3 \times 2\times10^{11} \times 3.333\times10^{-5}} = 0.500\,\mathrm{mm}, \qquad
\frac{3PL}{2AG} = \frac{3 \times 10^4 \times 1}{2 \times 0.01 \times 7.69\times10^{10}} = 0.0195\,\mathrm{mm}.
$$
Total $0.520\,\mathrm{mm}$. The maximum bending stress is $PLc/I = 30\,\mathrm{MPa}$ at the root and the maximum shear stress $3P/(2A) = 1.5\,\mathrm{MPa}$ on the axis.

**Sanity check.** The ratio of the two deflection terms is $\frac{3PL/(2AG)}{PL^3/(3EI)} = \frac{3}{4}(1+\nu)\Bigl(\frac{h}{L}\Bigr)^2 = 0.75 \times 1.3 \times 0.04 = 0.039$: shear adds 3.9 % for a span of five depths, and the correction falls as the square of the depth-to-span ratio — the precise sense in which Euler–Bernoulli theory is a slender-beam theory.
:::
:::

::: widget plot
f: 0.75*(1+nu)/x^2
x: 1, 20
y: 0, 0.5
sliders: nu=0.3:0:0.5:0.01
hlines: 0.05
caption: Ratio of shear deflection to bending deflection for the end-loaded cantilever, $\tfrac34(1+\nu)(h/L)^2$, against the span-to-depth ratio $L/h$. Above the dashed 5 % line beam theory underestimates the deflection noticeably: that happens for $L/h$ below about 5 for metals. Move the slider: Poisson's ratio enters through $E/G = 2(1+\nu)$, and the curve barely changes — geometry, not material, decides when a beam is "deep". (For composite sandwich beams, whose $E/G$ can exceed 50, the correction is far larger; see [[solid-mechanics/composites]].)
:::

The same method solves a simply supported beam under a uniform load $w$ (Timoshenko and Goodier, *Theory of Elasticity*). With span $L$, depth $h$ and $y$ measured *downward* from the centroid there, the bending stress at mid-span acquires a cubic correction,
$$
\sigma_x = \frac{M y}{I} + \frac{w}{2I}\Bigl(\frac{2y^3}{3} - \frac{2c^2y}{5}\Bigr),
$$
whose value at the extreme fibre is a fraction $\tfrac{4}{15}(h/L)^2$ of the beam-theory stress: 1.7 % for $L/h = 4$, negligible for ordinary beams. The same solution also contains a transverse stress $\sigma_y$ that falls from $-w$ (per unit width) on the loaded face to zero on the other, which no beam theory has.

## A plate with a circular hole

A hole of radius $a$ in a wide plate under uniform tension $\sigma$ along $x$ is the founding problem of stress concentration. Far away the stress is uniform; at the hole the material must carry the load around a gap. Using the polar form [[#eq-airy-polar]] and writing the far-field stress in polar components — $\sigma_r = \tfrac{\sigma}{2}(1 + \cos2\theta)$, $\tau_{r\theta} = -\tfrac{\sigma}{2}\sin2\theta$ at large $r$ — the problem splits into an axisymmetric part and a part varying as $\cos2\theta$. Each is solved with a stress function built from the biharmonic functions $r^2$, $\ln r$, $r^4\cos2\theta$, $r^2\cos2\theta$, $\cos2\theta$ and $r^{-2}\cos2\theta$; fixing the constants so that the hole is traction-free and the far field is recovered gives

$$
\phi = \frac{\sigma}{4}\bigl(r^2 - 2a^2\ln r\bigr) - \frac{\sigma}{4}\Bigl(r^2 - 2a^2 + \frac{a^4}{r^2}\Bigr)\cos2\theta .
$$

::: proposition Kirsch's solution {#prop-kirsch}
In an infinite plate (plane stress or plane strain) with a traction-free circular hole of radius $a$, under uniform tension $\sigma$ along $\theta = 0$ at infinity,
$$
\begin{aligned}
\sigma_r &= \frac{\sigma}{2}\Bigl(1 - \frac{a^2}{r^2}\Bigr) + \frac{\sigma}{2}\Bigl(1 - \frac{4a^2}{r^2} + \frac{3a^4}{r^4}\Bigr)\cos2\theta,\\
\sigma_\theta &= \frac{\sigma}{2}\Bigl(1 + \frac{a^2}{r^2}\Bigr) - \frac{\sigma}{2}\Bigl(1 + \frac{3a^4}{r^4}\Bigr)\cos2\theta,\\
\tau_{r\theta} &= -\frac{\sigma}{2}\Bigl(1 + \frac{2a^2}{r^2} - \frac{3a^4}{r^4}\Bigr)\sin2\theta.
\end{aligned}
$$ {#eq-kirsch}
On the hole boundary $\sigma_\theta = \sigma(1 - 2\cos2\theta)$, which is $3\sigma$ at $\theta = \pm90°$ and $-\sigma$ at $\theta = 0°, 180°$: the **stress concentration factor** is $K_t = 3$.
:::

::: proof
The function $\phi$ above is a sum of terms each of which is biharmonic ($\nabla^2 r^2 = 4$, $\nabla^2\ln r = 0$, and for $f(r)\cos2\theta$ the operator gives $f'' + f'/r - 4f/r^2$, which annihilates $r^2$ and $r^{-2}$ and maps $r^0 = 1$ to $-4/r^2$, itself harmonic when multiplied by $\cos2\theta$). Applying [[#eq-airy-polar]] term by term gives [[#eq-kirsch]]; for instance $\sigma_\theta = \phi_{,rr} = \tfrac{\sigma}{4}(2 + 2a^2/r^2) - \tfrac{\sigma}{4}(2 + 6a^4/r^4)\cos2\theta$. **Boundary conditions.** At $r = a$: $\sigma_r = 0 + \tfrac{\sigma}{2}(1 - 4 + 3)\cos2\theta = 0$ and $\tau_{r\theta} = -\tfrac{\sigma}{2}(1 + 2 - 3)\sin2\theta = 0$, so the hole is free. As $r \to \infty$: $\sigma_r \to \tfrac{\sigma}{2}(1 + \cos2\theta)$, $\sigma_\theta \to \tfrac{\sigma}{2}(1 - \cos2\theta)$, $\tau_{r\theta} \to -\tfrac{\sigma}{2}\sin2\theta$, which are exactly the polar components of the uniform stress $\sigma_x = \sigma$ (by the transformation equations with angle $\theta$). By [[#thm-unique]] this is the solution. On the hole, $\sigma_\theta(a,\theta) = \tfrac{\sigma}{2}\cdot2 - \tfrac{\sigma}{2}\cdot4\cos2\theta = \sigma(1 - 2\cos2\theta)$.
:::

Along the transverse axis ($\theta = 90°$, $\cos2\theta = -1$) the hoop stress decays as

$$
\sigma_\theta = \sigma\Bigl(1 + \frac{a^2}{2r^2} + \frac{3a^4}{2r^4}\Bigr),
\qquad
\sigma_r = \frac{3\sigma}{2}\Bigl(\frac{a^2}{r^2} - \frac{a^4}{r^4}\Bigr).
$$ {#eq-kirsch-axis}

::: widget plot
f: 1 + 1/(2*x^2) + 3/(2*x^4); 1.5*(1/x^2 - 1/x^4)
x: 1, 5
y: 0, 3.2
labels: \sigma_\theta/\sigma; \sigma_r/\sigma
hlines: 1
caption: Stresses along the line through the centre of the hole perpendicular to the load, against $r/a$. The hoop stress starts at $3\sigma$ on the hole edge and falls to within 22 % of the remote value at $r = 2a$ and within 10 % at $r \approx 2.67a$. The concentration is local: its extent scales with the hole radius, not with the plate. The radial stress is zero at the edge (free surface), peaks at $0.375\sigma$ at $r = \sqrt2\,a$ and dies away. Under the hoop-stress curve, the extra load carried near the hole balances exactly the load that the hole itself cannot carry.
:::

::: example Stresses near a bolt hole {#ex-kirsch}
A wide steel strap carrying a remote tensile stress $\sigma = 100\,\mathrm{MPa}$ has a $20\,\mathrm{mm}$ diameter hole (unloaded). Find the peak stress, the stress at the edge of the hole on the load axis, the hoop stress $10\,\mathrm{mm}$ from the edge on the transverse axis, and how far from the centre the hoop stress first falls to within 10 % of $\sigma$.
::: solution
Here $a = 10\,\mathrm{mm}$. On the hole edge, $\sigma_\theta = \sigma(1 - 2\cos2\theta)$: at $\theta = 90°$, $\sigma_\theta = 3\sigma = 300\,\mathrm{MPa}$ (peak tension); at $\theta = 0°$, $\sigma_\theta = -\sigma = -100\,\mathrm{MPa}$ — the edge on the load axis is in *compression*, because the hole ovalises and its ends are pushed inward.

At $10\,\mathrm{mm}$ from the edge, $r = 2a$, and [[#eq-kirsch-axis]] gives
$$
\sigma_\theta = 100\,\Bigl(1 + \frac18 + \frac{3}{32}\Bigr) = 100 \times 1.21875 = 121.9\,\mathrm{MPa}.
$$
For the 10 % point, set $q = a^2/r^2$ and solve $1 + q/2 + 3q^2/2 = 1.1$, that is $1.5q^2 + 0.5q - 0.1 = 0$, giving $q = 0.1407$ and $r = a/\sqrt{q} = 2.67a = 26.7\,\mathrm{mm}$, about $17\,\mathrm{mm}$ from the edge.

Sanity check: the plate must still carry the remote load across the section through the hole. Integrating the excess $\sigma_\theta - \sigma$ along the transverse axis from $a$ to $\infty$ gives $\sigma(a/2 + a/2) = \sigma a$ on each side, exactly the load $\sigma a$ that the missing material would have carried ✓. A peak of $300\,\mathrm{MPa}$ exceeds the yield stress of mild steel ($\approx 250\,\mathrm{MPa}$), so under static load a small region at the hole yields while the rest stays elastic; under fatigue loading, $K_t = 3$ is what the designer must reckon with ([[machine-design/fatigue]]).
:::
:::

Because the problem is linear, solutions superpose. Remote biaxial stresses $\sigma_1$ along $\theta = 0$ and $\sigma_2$ along $\theta = 90°$ give, on the hole boundary,

$$
\sigma_\theta(a,\theta) = \sigma_1 + \sigma_2 - 2(\sigma_1 - \sigma_2)\cos2\theta .
$$ {#eq-kirsch-biaxial}

Equal biaxial tension ($\sigma_1 = \sigma_2$, as in a spherical pressure vessel wall) gives $K_t = 2$; pure shear ($\sigma_2 = -\sigma_1$, as in a shaft in torsion) gives a peak of $4\sigma_1$, which is why a transverse hole is so damaging in a torsion shaft.

::: widget plot
f: 1 + k - 2*(1 - k)*cos(2x)
x: 0, pi
y: -4, 4
sliders: k=0:-1:1:0.05
piticks: true
hlines: 0
caption: Hoop stress around the edge of the hole, divided by $\sigma_1$, against the angle $\theta$ from the $\sigma_1$ direction, for a remote stress ratio $k = \sigma_2/\sigma_1$. At $k = 0$ (uniaxial) the curve runs between $-1$ and $3$. Slide to $k = 1$ (equal biaxial) and the stress is a uniform $2\sigma_1$ all round; slide to $k = -1$ (pure shear) and the peaks reach $\pm4$. Note where the maximum sits: always at $\theta = 90°$, at right angles to the larger stress.
:::

::: quiz
A thin plate with a small circular hole is loaded by remote stresses $\sigma_x = 60\,\mathrm{MPa}$ and $\sigma_y = 60\,\mathrm{MPa}$. Which statements are true?
- [ ] The peak stress at the hole is $180\,\mathrm{MPa}$.
- [x] The hoop stress is $120\,\mathrm{MPa}$ at every point of the hole edge.
- [x] The result is the same whether the plate is steel or aluminium.
- [ ] The result changes if the plate is thick, because plane strain applies.
::: solution
With $\sigma_1 = \sigma_2 = 60\,\mathrm{MPa}$, [[#eq-kirsch-biaxial]] gives $\sigma_\theta = 120\,\mathrm{MPa}$ independent of $\theta$. The value $3\sigma$ applies only to uniaxial tension. The Kirsch stresses contain no elastic constant (the hole carries no net force, so the extra single-valuedness conditions do not bring $\nu$ back), and they hold in plane stress and plane strain (only the out-of-plane stress $\sigma_z = \nu(\sigma_r + \sigma_\theta)$ of plane strain is added), so neither the material nor the thickness changes the in-plane result.
:::
:::

::: example Proof of the plane-strain substitution {#ex-plane-proof}
Show that substituting $E' = E/(1-\nu^2)$ and $\nu' = \nu/(1-\nu)$ in the plane-stress Hooke's law reproduces the plane-strain law exactly, including the shear relation, and evaluate $E'$ and $\nu'$ for steel ($E = 200\,\mathrm{GPa}$, $\nu = 0.3$).
::: solution
Normal strain: $\varepsilon_x = (\sigma_x - \nu'\sigma_y)/E' = \frac{1-\nu^2}{E}\bigl(\sigma_x - \frac{\nu}{1-\nu}\sigma_y\bigr)$, which is the plane-strain form of [[#def-plane]]. Shear: $\frac{2(1+\nu')}{E'} = \frac{2(1-\nu^2)}{E}\cdot\frac{1-\nu+\nu}{1-\nu} = \frac{2(1-\nu^2)}{E(1-\nu)} = \frac{2(1+\nu)}{E}$ ✓, so $G$ is unchanged, as it must be — preventing the $z$-strain cannot change the response to an in-plane shear, which produces no $z$-strain anyway.

For steel, $E' = 200/(1 - 0.09) = 219.8\,\mathrm{GPa}$ and $\nu' = 0.3/0.7 = 0.429$. Sanity check: in plane strain the material appears stiffer (the $z$-constraint helps carry load) and appears to have a larger Poisson's ratio (the lateral expansion that cannot happen in $z$ is pushed into the plane). Both limits behave correctly: $\nu \to 0$ gives $E' = E$, $\nu' = 0$ and no difference between the two states.
:::
:::

::: history
The equations of linear elasticity took shape in Paris in the 1820s. Claude-Louis Navier presented a memoir on the equilibrium and motion of elastic solids to the Académie des Sciences in 1821, deriving displacement equations from a molecular model that contained a single elastic constant (equivalent to fixing $\nu = \tfrac14$). Augustin-Louis Cauchy introduced the stress and strain tensors in 1822 and, with a continuum argument, obtained the isotropic law with two constants; the long "rari-constant" versus "multi-constant" dispute about whether one constant could suffice was settled by measurements that gave Poisson's ratios well away from $\tfrac14$. Gabriel Lamé's *Leçons sur la théorie mathématique de l'élasticité des corps solides* (1852), the first book on the subject, gave the constants $\lambda$ and $\mu$ their place. Adhémar Barré de Saint-Venant's 1855 memoir on the torsion of prisms introduced the semi-inverse method and the principle that bears his name. George Biddell Airy, the Astronomer Royal, introduced the stress function in a paper on the strains in the interior of beams published in the *Philosophical Transactions* in 1863, and Ernst Gustav Kirsch published the solution for the plate with a circular hole in 1898 in the journal of the Verein Deutscher Ingenieure — the first quantitative stress-concentration factor. Stephen Timoshenko's *Theory of Elasticity* (1934; with J. N. Goodier from the 1951 edition) collected these solutions in the form engineers still learn them.
:::

## Where this leads

Every later chapter of this course is a special solution of the equations assembled here. [[solid-mechanics/thick-cylinders-discs]] solves them for axisymmetric bodies — Lamé's problem — and [[solid-mechanics/plates]] reduces them, with Kirchhoff's kinematic assumption, to a biharmonic equation for the deflection that mirrors [[#eq-biharmonic]]. [[solid-mechanics/energy-methods]] recasts the whole boundary-value problem as the minimisation of an energy, which leads directly to the finite element method of [[finite-element-method/plane-elements]], where the plane-stress and plane-strain constitutive matrices of this chapter are used unchanged. [[solid-mechanics/fracture-mechanics]] starts from the limit of the hole solution as the hole flattens into a crack, and [[solid-mechanics/composites]] replaces the two isotropic constants by the four or five of an orthotropic sheet.

::: summary
- An isotropic linear elastic solid has two independent constants; $G = E/[2(1+\nu)]$, $K = E/[3(1-2\nu)]$, $\lambda = E\nu/[(1+\nu)(1-2\nu)]$, $\mu = G$. Positive strain energy requires $-1 < \nu < \tfrac12$; $K \to \infty$ as $\nu \to \tfrac12$.
- Hooke's law is three-dimensional: a lateral constraint creates stress in an unloaded direction ($\sigma_z = \nu(\sigma_x + \sigma_y)$ in plane strain).
- Elasticity is 15 equations (equilibrium, strain–displacement, Hooke) in 15 unknowns with traction, displacement or mixed boundary conditions; eliminating stresses gives Navier's equations $(\lambda+\mu)\nabla(\nabla\cdot\mathbf{u}) + \mu\nabla^2\mathbf{u} + \mathbf{b} = \mathbf{0}$.
- The solution is unique (Kirchhoff's argument from positive strain energy), so any field satisfying all equations is the answer; Saint-Venant's principle lets end conditions be met only in resultant.
- Plane-strain problems are solved by plane-stress formulas with $E' = E/(1-\nu^2)$, $\nu' = \nu/(1-\nu)$.
- The Airy function ($\sigma_x = \phi_{,yy}$, $\sigma_y = \phi_{,xx}$, $\tau_{xy} = -\phi_{,xy}$) satisfies equilibrium; compatibility requires $\nabla^4\phi = 0$, an equation free of elastic constants.
- The end-loaded cantilever solution confirms $\sigma = My/I$ and adds a shear deflection $3PL/(2AG)$, a fraction $\tfrac34(1+\nu)(h/L)^2$ of the bending deflection.
- Kirsch: a circular hole under uniaxial tension has $K_t = 3$ ($-\sigma$ on the load axis); biaxial stresses give $\sigma_\theta = \sigma_1 + \sigma_2 - 2(\sigma_1 - \sigma_2)\cos2\theta$ on the edge; the disturbance dies out within a few radii.
:::

## Exercises

::: exercise Shear modulus {level=1 check="80"}
An alloy steel has $E = 200\,\mathrm{GPa}$ and $\nu = 0.25$. Find its shear modulus $G$. (Enter $G$ in GPa.)
::: hint
Use $G = E/[2(1+\nu)]$.
:::
::: solution
$G = 200/(2 \times 1.25) = 80\,\mathrm{GPa}$. For the same material $\lambda = 200 \times 0.25/(1.25 \times 0.5) = 80\,\mathrm{GPa}$ as well — $\nu = 0.25$ is exactly the value for which $\lambda = \mu$, Navier's original one-constant solid — and $K = 200/1.5 = 133.3\,\mathrm{GPa}$.
:::
:::

::: exercise Volumetric strain {level=1 check="125"}
A block with $E = 200\,\mathrm{GPa}$, $\nu = 0.25$ carries $\sigma_x = 100\,\mathrm{MPa}$, $\sigma_y = -50\,\mathrm{MPa}$, $\sigma_z = 0$. Find $\varepsilon_x$, $\varepsilon_y$, $\varepsilon_z$ and the volumetric strain $e$. (Enter $e$ in microstrain, $10^{-6}$.)
::: solution
With $E = 200\,000\,\mathrm{MPa}$: $\varepsilon_x = [100 - 0.25(-50)]/200\,000 = 562.5\times10^{-6}$; $\varepsilon_y = [-50 - 0.25(100)]/200\,000 = -375\times10^{-6}$; $\varepsilon_z = -0.25(100 - 50)/200\,000 = -62.5\times10^{-6}$. Sum: $e = 125\times10^{-6}$. Check: $e = (1-2\nu)(\sigma_x+\sigma_y+\sigma_z)/E = 0.5 \times 50/200\,000 = 125\times10^{-6}$ ✓.
:::
:::

::: exercise Hoop stress near a hole {level=1 check="97.5"}
A wide plate under uniaxial tension $\sigma = 80\,\mathrm{MPa}$ has a small circular hole of radius $a$. Find the hoop stress on the transverse axis at a distance $a$ from the edge of the hole (that is, at $r = 2a$). (Enter the stress in MPa.)
::: solution
From [[#eq-kirsch-axis]] at $r = 2a$: $\sigma_\theta = 80(1 + \tfrac18 + \tfrac{3}{32}) = 80 \times 1.21875 = 97.5\,\mathrm{MPa}$.
:::
:::

::: exercise Out-of-plane stress in plane strain {level=2 check="48"}
In the interior of a thick welded plate the strain through the thickness is zero. At one point the in-plane stresses are $\sigma_x = 120\,\mathrm{MPa}$, $\sigma_y = 40\,\mathrm{MPa}$, $\tau_{xy} = 0$, and $\nu = 0.3$. Find $\sigma_z$, then compare the von Mises equivalent stress with the value you would get by wrongly assuming plane stress. (Enter $\sigma_z$ in MPa.)
::: solution
$\sigma_z = \nu(\sigma_x + \sigma_y) = 0.3 \times 160 = 48\,\mathrm{MPa}$. The von Mises stress $\sigma_\text{vM} = \sqrt{\tfrac12[(\sigma_x-\sigma_y)^2 + (\sigma_y-\sigma_z)^2 + (\sigma_z-\sigma_x)^2]}$ is $\sqrt{\tfrac12(80^2 + 8^2 + 72^2)} = 76.3\,\mathrm{MPa}$ in plane strain, against $\sqrt{120^2 - 120\times40 + 40^2} = 105.8\,\mathrm{MPa}$ if $\sigma_z = 0$. The through-thickness constraint makes the stress state more hydrostatic and *delays* yielding — the same constraint that makes thick sections more prone to brittle fracture.
:::
:::

::: exercise An admissible stress function {level=2 check="-6"}
Find the value of $\alpha$ for which $\phi = x^4 + \alpha\,x^2y^2 + y^4$ is an Airy stress function, then write down the stresses. (Enter $\alpha$.)
::: solution
$\partial^4\phi/\partial x^4 = 24$, $\partial^4\phi/\partial x^2\partial y^2 = 4\alpha$, $\partial^4\phi/\partial y^4 = 24$. So $\nabla^4\phi = 24 + 8\alpha + 24 = 0$ gives $\alpha = -6$. Then $\sigma_x = \phi_{,yy} = 12y^2 - 12x^2$, $\sigma_y = \phi_{,xx} = 12x^2 - 12y^2$, $\tau_{xy} = -\phi_{,xy} = 24xy$ (in units consistent with $\phi$). Check equilibrium: $\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y = -24x + 24x = 0$ ✓. Note $\phi = \operatorname{Re}(z^4)$ with $z = x + iy$: real parts of analytic functions are harmonic, hence biharmonic.
:::
:::

::: exercise Hole under biaxial stress {level=2 check="400"}
A circular access hole is cut in a plate carrying remote principal stresses $\sigma_1 = 150\,\mathrm{MPa}$ and $\sigma_2 = 50\,\mathrm{MPa}$. Find the maximum and minimum hoop stress on the edge of the hole and where they occur. (Enter the maximum in MPa.)
::: solution
From [[#eq-kirsch-biaxial]], $\sigma_\theta = 200 - 200\cos2\theta\ \mathrm{MPa}$. Maximum at $\theta = 90°$ (on the line through the centre at right angles to $\sigma_1$): $\sigma_\theta = 3\sigma_1 - \sigma_2 = 400\,\mathrm{MPa}$. Minimum at $\theta = 0°$: $3\sigma_2 - \sigma_1 = 0$. The second stress *reduces* the peak, from $450\,\mathrm{MPa}$ for $\sigma_1$ alone.
:::
:::

::: exercise When is a cantilever deep? {level=2 check="15"}
A short steel bracket ($\nu = 0.25$) is a rectangular cantilever with an end load and span-to-depth ratio $L/h = 2.5$. Using the elasticity solution of [[#ex-cantilever]], by what percentage does the shear deflection add to the beam-theory deflection? (Enter the percentage.)
::: solution
Ratio $= \tfrac34(1+\nu)(h/L)^2 = 0.75 \times 1.25 \times 0.4^2 = 0.15$, so shear adds $15\,\%$. For such a stubby member the stress distribution near the support is also far from linear (the root is within one depth of the load), so both deflection and stresses from beam theory should be treated as estimates; a two-dimensional finite element model is the usual next step.
:::
:::

::: exercise Thermal stress in a constrained block {level=3 check="-240"}
(a) Show from [[#eq-hooke]] that a block of isotropic material held so that it cannot deform in any direction, and heated uniformly by $\Delta T$, develops the hydrostatic stress $\sigma = -E\alpha\,\Delta T/(1-2\nu)$. (b) Evaluate it for $E = 200\,\mathrm{GPa}$, $\alpha = 12\times10^{-6}\,\mathrm{K^{-1}}$, $\nu = 0.25$, $\Delta T = 50\,\mathrm{K}$. (c) Compare with a bar constrained only axially. (Enter the stress in (b) in MPa.)
::: solution
(a) By symmetry $\sigma_x = \sigma_y = \sigma_z = \sigma$ and no shear. Each strain is zero: $0 = [\sigma - \nu(2\sigma)]/E + \alpha\Delta T$, so $\sigma(1-2\nu) = -E\alpha\Delta T$ and $\sigma = -E\alpha\Delta T/(1-2\nu)$. (b) $\sigma = -200\,000 \times 12\times10^{-6} \times 50/0.5 = -240\,\mathrm{MPa}$ (compression). (c) A bar constrained only axially has $\sigma_y = \sigma_z = 0$ and $\sigma_x = -E\alpha\Delta T = -120\,\mathrm{MPa}$: full three-dimensional constraint doubles the stress for $\nu = 0.25$, and the factor $1/(1-2\nu)$ grows without bound for nearly incompressible materials — a sealed, completely filled rubber or liquid-filled component heated in a rigid housing develops very high pressure.
:::
:::

::: exercise Navier's equations in one dimension {level=3}
A tall column of height $H$ with density $\rho$ stands on a rigid base. Its sides are constrained so that only the vertical displacement $w(z)$ is non-zero (a soil layer is the usual example; $z$ is measured upward from the base). (a) Reduce [[#eq-navier]] to an ordinary differential equation for $w(z)$. (b) Solve it with $w(0) = 0$ and a free top. (c) Find the vertical and horizontal stresses at the base, and evaluate them for $H = 10\,\mathrm{m}$, $\rho = 2000\,\mathrm{kg/m^3}$, $\nu = 0.3$, $g = 9.81\,\mathrm{m/s^2}$.
::: solution
(a) With $\mathbf{u} = (0, 0, w(z))$: $\nabla\cdot\mathbf{u} = w'$, so $\nabla(\nabla\cdot\mathbf{u}) = (0,0,w'')$ and $\nabla^2\mathbf{u} = (0,0,w'')$. The body force is $b_z = -\rho g$. Navier: $(\lambda + 2\mu)w'' - \rho g = 0$.
(b) Integrate: $w' = \rho g z/(\lambda + 2\mu) + C_1$. The free top has $\sigma_z = (\lambda + 2\mu)w' = 0$ at $z = H$, so $C_1 = -\rho g H/(\lambda + 2\mu)$; with $w(0) = 0$, $w = -\dfrac{\rho g}{\lambda + 2\mu}\Bigl(Hz - \dfrac{z^2}{2}\Bigr)$, downward settlement.
(c) $\sigma_z = (\lambda + 2\mu)w' = -\rho g(H - z)$ — the weight of the column above, as equilibrium alone demands. The horizontal stress is $\sigma_x = \sigma_y = \lambda w' = \dfrac{\lambda}{\lambda + 2\mu}\sigma_z = \dfrac{\nu}{1-\nu}\sigma_z$. At the base, $\sigma_z = -2000 \times 9.81 \times 10 = -196.2\,\mathrm{kPa}$ and $\sigma_x = (0.3/0.7)(-196.2) = -84.1\,\mathrm{kPa}$. The ratio $\nu/(1-\nu)$ is the elastic "earth pressure at rest" coefficient; real soils are not linear elastic and geotechnical practice uses empirical values, but the structure of the result is the one Navier's equations give.
:::
:::

::: exercise Design: relieving a stress concentration {level=3}
A $10\,\mathrm{mm}$ thick steel tie plate, $200\,\mathrm{mm}$ wide, carries a steady tensile force of $200\,\mathrm{kN}$ and must have a passage for a $16\,\mathrm{mm}$ cable through its centre. Using the results of this chapter, compare (i) a $20\,\mathrm{mm}$ circular hole, (ii) an elliptical slot $40\,\mathrm{mm}$ long and $20\,\mathrm{mm}$ wide with its long axis along the load, and (iii) the same slot across the load. For an elliptical hole with semi-axis $a$ across the load and $b$ along it, Inglis (1913) found $K_t = 1 + 2a/b$ in an infinite plate. Recommend a layout and say what else you would check.
::: solution
Remote stress: $\sigma = 200\,000/(200 \times 10) = 100\,\mathrm{MPa}$. The plate is ten hole diameters wide, so the infinite-plate results are a reasonable first estimate (finite-width charts would raise $K_t$ slightly and should be used in the final design).
(i) Circle: $K_t = 3$, peak $300\,\mathrm{MPa}$. (ii) Slot along the load: $a = 10\,\mathrm{mm}$, $b = 20\,\mathrm{mm}$, $K_t = 1 + 2(10/20) = 2$, peak $200\,\mathrm{MPa}$. (iii) Slot across the load: $a = 20$, $b = 10$, $K_t = 5$, peak $500\,\mathrm{MPa}$.
Recommendation: orient any elongated opening with its long axis along the load, and give it generous end radii; option (ii) passes the cable with the lowest peak stress. For a steady load and a ductile steel, local yielding at the hole edge is tolerable and the net-section stress ($200\,000/[(200 - 20) \times 10] = 111\,\mathrm{MPa}$ for (i) and (ii)) governs static strength; if the load fluctuates, the peak elastic stress governs fatigue and option (ii) is clearly better. Further checks: finite-width correction, edge finish of the cut (a flame-cut edge has its own notches), and whether a grommet or the cable could load the hole edge. The calculation teaches the principle; a real tie is designed to the applicable structural or machine-design code.
:::
:::
