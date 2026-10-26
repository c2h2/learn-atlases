A carbon-fibre-reinforced epoxy ply is about as stiff as steel along its fibres and about as stiff as a stiff plastic across them; its strength across the fibres is a fortieth of its strength along them; and it weighs a fifth as much as steel. Used where the loads are known — a wing skin, a wind-turbine blade spar, a pressure vessel wound with fibres along the stress directions, a racing-car monocoque, a bicycle frame — it gives structures of unmatched stiffness and strength for their weight. Used carelessly, it gives parts that warp when they come out of the mould, twist when they are pulled, crack inside at a fraction of their expected load, or come apart between their layers.

All of these behaviours follow from one fact: a fibre composite is **anisotropic**, and the designer, by choosing the direction of each ply, chooses the anisotropy. This chapter develops the mechanics needed to do that: the stiffness of a single ply from its fibres and matrix, the ply's stress–strain law in its own axes and in any other direction, **classical laminate theory**, which combines plies into a laminate and predicts its in-plane and bending stiffness and the coupling between them, and the **failure criteria** used to predict when the first ply fails. It extends the isotropic Hooke's law of [[solid-mechanics/linear-elasticity]] and the Kirchhoff plate kinematics of [[solid-mechanics/plates]]; the materials themselves are described in [[materials-science/material-families]].

**Conventions.** Ply (material) axes: 1 along the fibres, 2 across them in the plane of the ply, 3 through the thickness. Laminate axes $x, y$; the ply angle $\theta$ is measured anticlockwise from $x$ to the fibre direction. Engineering shear strain $\gamma$ is used throughout. Laminates are described by their stacking sequence from one face: $[0/90]_s$ means $0, 90, 90, 0$ (s = symmetric).

## Micromechanics: a ply from fibres and matrix

A unidirectional ply is a bundle of parallel fibres (diameter about $5$–$20\ \mu\mathrm{m}$) bonded by a polymer matrix, with fibre volume fraction $V_f$ typically $0.5$–$0.65$ and $V_m = 1 - V_f$.

::: proposition Rule of mixtures {#prop-rom}
If fibres and matrix are both linear-elastic and perfectly bonded,
(a) along the fibres, where both constituents share the same strain (**iso-strain**, Voigt),
$$
E_1 = E_fV_f + E_mV_m, \qquad \nu_{12} = \nu_fV_f + \nu_mV_m ;
$$
(b) across the fibres, approximating fibres and matrix as layers in series that carry the same stress (**iso-stress**, Reuss),
$$
\frac{1}{E_2} = \frac{V_f}{E_f} + \frac{V_m}{E_m}, \qquad \frac{1}{G_{12}} = \frac{V_f}{G_f} + \frac{V_m}{G_m}.
$$
:::

::: proof
(a) Under a load $P$ along the fibres, plane sections stay plane, so fibres and matrix have the same strain $\varepsilon_1$. Forces add: $P = \sigma_fA_f + \sigma_mA_m = (E_fV_f + E_mV_m)\,\varepsilon_1A$, so $E_1 = P/(A\varepsilon_1) = E_fV_f + E_mV_m$. The lateral contraction is the volume-weighted average of the constituents' contractions, which gives $\nu_{12}$. (b) Under a transverse stress, the series model gives each phase the same stress $\sigma_2$; the deformations add over the thicknesses $V_f$ and $V_m$ of a unit length, $\varepsilon_2 = \sigma_2(V_f/E_f + V_m/E_m)$, which is the Reuss result; the shear modulus follows identically.
:::

The longitudinal result is accurate to a few per cent: it is the **upper (Voigt) bound** on the stiffness, and the iso-strain assumption is nearly exact along the fibres. The transverse result is a **lower (Reuss) bound** and underestimates $E_2$ and $G_{12}$, because the real stress field between round fibres is not in series. Semi-empirical formulas such as the Halpin–Tsai equations, with a fitted reinforcing parameter, or tests on the actual ply, are used for the transverse properties in practice.

::: example Glass/epoxy ply {#ex-rom}
E-glass fibres ($E_f = 72\ \mathrm{GPa}$, $\nu_f = 0.22$) in epoxy ($E_m = 3.5\ \mathrm{GPa}$, $\nu_m = 0.35$) at $V_f = 0.6$. Estimate $E_1$, $E_2$ and $\nu_{12}$.
::: solution
$$
E_1 = 72(0.6) + 3.5(0.4) = 44.6\ \mathrm{GPa}, \qquad \frac{1}{E_2} = \frac{0.6}{72} + \frac{0.4}{3.5} = 0.1226\ \mathrm{GPa^{-1}}\ \Rightarrow\ E_2 = 8.2\ \mathrm{GPa},
$$
$$
\nu_{12} = 0.22(0.6) + 0.35(0.4) = 0.27 .
$$
Sanity checks: $E_1$ is dominated by the fibres (97 % of it comes from them), $E_2$ by the matrix: even with 60 % fibres the transverse modulus is little more than twice the resin's. The Halpin–Tsai formula with the commonly used parameter $\xi = 2$ gives $E_2 \approx 14.9\ \mathrm{GPa}$; measured transverse moduli of glass/epoxy at this fibre fraction typically lie between these estimates, which is why design uses measured ply data.
:::
:::

## The orthotropic ply

A unidirectional ply has three mutually perpendicular planes of symmetry: it is **orthotropic**. In its own axes, normal stresses produce no shear strains and vice versa. For a thin ply in plane stress ($\sigma_3 = \tau_{13} = \tau_{23} = 0$), four independent constants describe it: $E_1$, $E_2$, $\nu_{12}$ and $G_{12}$.

::: definition Ply compliance and reduced stiffness {#def-Q}
In ply axes the plane-stress Hooke's law of an orthotropic ply is
$$
\begin{bmatrix}\varepsilon_1\\ \varepsilon_2\\ \gamma_{12}\end{bmatrix} =
\begin{bmatrix} 1/E_1 & -\nu_{21}/E_2 & 0\\ -\nu_{12}/E_1 & 1/E_2 & 0\\ 0 & 0 & 1/G_{12}\end{bmatrix}
\begin{bmatrix}\sigma_1\\ \sigma_2\\ \tau_{12}\end{bmatrix},
\qquad
\begin{bmatrix}\sigma_1\\ \sigma_2\\ \tau_{12}\end{bmatrix} = \mathbf{Q}\begin{bmatrix}\varepsilon_1\\ \varepsilon_2\\ \gamma_{12}\end{bmatrix},
$$
where $\nu_{12}$ is the contraction in direction 2 per unit strain in direction 1. The compliance matrix is symmetric, which gives the **reciprocal relation** $\nu_{21}/E_2 = \nu_{12}/E_1$. Its inverse, the **reduced stiffness matrix**, has
$$
Q_{11} = \frac{E_1}{1 - \nu_{12}\nu_{21}}, \quad Q_{22} = \frac{E_2}{1 - \nu_{12}\nu_{21}}, \quad Q_{12} = \frac{\nu_{12}E_2}{1 - \nu_{12}\nu_{21}}, \quad Q_{66} = G_{12}, \quad Q_{16} = Q_{26} = 0 .
$$
:::

Symmetry of the compliance matrix is not an extra assumption: it follows from the existence of a strain energy function, as in [[solid-mechanics/energy-methods]] (Betti's reciprocal theorem applied to a ply). It means $\nu_{21}$ is small for a stiff fibre ply: pulling across the fibres hardly shortens the stiff fibres.

### Off-axis plies

In a laminate, plies point in different directions, so each ply's law must be expressed in laminate axes. Stresses and strains transform with the rotation formulas of [[solid-mechanics/stress-strain-3d]], with the factor $\tfrac12$ on engineering shear strain.

::: theorem Transformed stiffness and off-axis modulus {#thm-qbar}
For a ply at angle $\theta$ (with $c = \cos\theta$, $s = \sin\theta$), the stresses and strains in laminate axes are related by $\boldsymbol\sigma_{xy} = \bar{\mathbf{Q}}\,\boldsymbol\varepsilon_{xy}$ with
$$
\begin{aligned}
\bar Q_{11} &= Q_{11}c^4 + 2(Q_{12} + 2Q_{66})s^2c^2 + Q_{22}s^4,\\
\bar Q_{22} &= Q_{11}s^4 + 2(Q_{12} + 2Q_{66})s^2c^2 + Q_{22}c^4,\\
\bar Q_{12} &= (Q_{11} + Q_{22} - 4Q_{66})s^2c^2 + Q_{12}(s^4 + c^4),\\
\bar Q_{66} &= (Q_{11} + Q_{22} - 2Q_{12} - 2Q_{66})s^2c^2 + Q_{66}(s^4 + c^4),\\
\bar Q_{16} &= (Q_{11} - Q_{12} - 2Q_{66})sc^3 + (Q_{12} - Q_{22} + 2Q_{66})s^3c,\\
\bar Q_{26} &= (Q_{11} - Q_{12} - 2Q_{66})s^3c + (Q_{12} - Q_{22} + 2Q_{66})sc^3 .
\end{aligned}
$$
The Young's modulus in the $x$-direction of a ply at angle $\theta$ is
$$
\frac{1}{E_x(\theta)} = \frac{c^4}{E_1} + \left(\frac{1}{G_{12}} - \frac{2\nu_{12}}{E_1}\right)s^2c^2 + \frac{s^4}{E_2}.
$$ {#eq-Ex}
:::

::: proof
Apply a uniaxial stress $\sigma_x$ to the ply. By the transformation equations, the stresses in ply axes are $\sigma_1 = \sigma_xc^2$, $\sigma_2 = \sigma_xs^2$, $\tau_{12} = -\sigma_xsc$. The ply-axis strains follow from the compliance: $\varepsilon_1 = \sigma_x(c^2/E_1 - \nu_{12}s^2/E_1)$, $\varepsilon_2 = \sigma_x(s^2/E_2 - \nu_{12}c^2/E_1)$ (using $\nu_{21}/E_2 = \nu_{12}/E_1$), $\gamma_{12} = -\sigma_xsc/G_{12}$. Transform back: $\varepsilon_x = \varepsilon_1c^2 + \varepsilon_2s^2 - \gamma_{12}sc$, which is
$$
\varepsilon_x = \sigma_x\left[\frac{c^4}{E_1} - \frac{2\nu_{12}s^2c^2}{E_1} + \frac{s^4}{E_2} + \frac{s^2c^2}{G_{12}}\right],
$$
and $E_x = \sigma_x/\varepsilon_x$ is [[#eq-Ex]]. The $\bar Q_{ij}$ are obtained in the same way, writing $\boldsymbol\sigma_{xy} = \mathbf{T}^{-1}\boldsymbol\sigma_{12} = \mathbf{T}^{-1}\mathbf{Q}\boldsymbol\varepsilon_{12}$ and $\boldsymbol\varepsilon_{12} = \mathbf{R}\mathbf{T}\mathbf{R}^{-1}\boldsymbol\varepsilon_{xy}$, where $\mathbf{T}$ is the stress transformation matrix and $\mathbf{R} = \diag(1, 1, 2)$ converts tensor to engineering shear strain; multiplying out gives the expressions listed.
:::

The terms $\bar Q_{16}$ and $\bar Q_{26}$ are new: in an off-axis ply, a normal stress produces a **shear strain**. Pull a $30^\circ$ ply along $x$ and it shears as well as stretches — the **extension–shear coupling** that makes off-axis tensile tests difficult and that laminate design aims to cancel.

::: widget plot
f: 1/(cos(x*pi/180)^4/E1 + (1/G - 2*0.28/E1)*sin(x*pi/180)^2*cos(x*pi/180)^2 + sin(x*pi/180)^4/E2)
x: 0, 90
y: 0, 200
sliders: E1=181:30:250:1; E2=10.3:3:20:0.1; G=7.17:2:30:0.1
labels: E_x(\theta)\ \text{(GPa)}
caption: Young's modulus of a unidirectional ply loaded at angle $\theta$ (degrees) to its fibres, from [[#eq-Ex]], with $\nu_{12} = 0.28$. The starting values are typical of carbon/epoxy. The modulus collapses within the first $15^\circ$: a fibre misalignment of $10^\circ$ costs 40 % of the stiffness. Now set the values to a glass/epoxy-like ply with a low shear modulus ($E_1 = 39$, $E_2 = 8.6$, $G = 3$): the curve dips *below* $E_2$ beyond about $46^\circ$, with a minimum of $7.9\ \mathrm{GPa}$ near $60^\circ$ — when $1/G_{12}$ is large enough, the off-axis ply is softest not across the fibres but at an intermediate angle, where it deforms mainly by shear of the matrix.
:::

::: example Stiffness of a carbon/epoxy ply on and off axis {#ex-ply}
A carbon/epoxy ply has $E_1 = 181\ \mathrm{GPa}$, $E_2 = 10.3\ \mathrm{GPa}$, $\nu_{12} = 0.28$, $G_{12} = 7.17\ \mathrm{GPa}$ (values typical of a standard-modulus carbon/epoxy, as tabulated by Tsai and Hahn). Find $\nu_{21}$, the reduced stiffness $\mathbf{Q}$, and the modulus $E_x$ of the ply at $15^\circ$ and $45^\circ$ to the load.
::: solution
$\nu_{21} = \nu_{12}E_2/E_1 = 0.28\times10.3/181 = 0.0159$; $1 - \nu_{12}\nu_{21} = 0.99554$. Then
$$
\mathbf{Q} = \begin{bmatrix} 181.8 & 2.90 & 0\\ 2.90 & 10.35 & 0\\ 0 & 0 & 7.17\end{bmatrix}\ \mathrm{GPa}.
$$
From [[#eq-Ex]] with $1/G_{12} - 2\nu_{12}/E_1 = 0.1395 - 0.0031 = 0.1364\ \mathrm{GPa^{-1}}$:
at $15^\circ$ ($c^2 = 0.9330$, $s^2 = 0.0670$): $1/E_x = 0.8705/181 + 0.1364\times0.0625 + 0.00449/10.3 = 0.01377$, $E_x = 72.6\ \mathrm{GPa}$;
at $45^\circ$: $1/E_x = 0.25/181 + 0.1364\times0.25 + 0.25/10.3 = 0.05975$, $E_x = 16.7\ \mathrm{GPa}$.

A $15^\circ$ misalignment loses 60 % of the axial stiffness, and the main contributor is the shear term — the matrix shear compliance $1/G_{12}$. Sanity check: $E_x(0) = E_1$ and $E_x(90^\circ) = E_2$ come out of [[#eq-Ex]] directly, and $Q_{11}$ exceeds $E_1$ by only 0.4 % because $\nu_{12}\nu_{21}$ is tiny.
:::
:::

## Classical laminate theory

A laminate is a stack of plies bonded together. Classical laminate theory (CLT) treats it as a thin plate in the sense of [[solid-mechanics/plates]]: the Kirchhoff assumptions apply to the whole stack, so the strain varies linearly through the thickness even though the stiffness jumps from ply to ply.

::: theorem The ABD relations {#thm-abd}
Let the laminate occupy $-h/2 \le z \le h/2$, with ply $k$ between $z_{k-1}$ and $z_k$ and transformed stiffness $\bar{\mathbf{Q}}_k$. With mid-plane strains $\boldsymbol\varepsilon^0 = (\varepsilon^0_x, \varepsilon^0_y, \gamma^0_{xy})$ and curvatures $\boldsymbol\kappa = (\kappa_x, \kappa_y, \kappa_{xy})$, so that $\boldsymbol\varepsilon(z) = \boldsymbol\varepsilon^0 + z\boldsymbol\kappa$, the force and moment resultants per unit width are
$$
\begin{bmatrix}\mathbf{N}\\ \mathbf{M}\end{bmatrix} = \begin{bmatrix}\mathbf{A} & \mathbf{B}\\ \mathbf{B} & \mathbf{D}\end{bmatrix}\begin{bmatrix}\boldsymbol\varepsilon^0\\ \boldsymbol\kappa\end{bmatrix},
$$ {#eq-abd}
with
$$
\mathbf{A} = \sum_k\bar{\mathbf{Q}}_k(z_k - z_{k-1}), \qquad \mathbf{B} = \frac12\sum_k\bar{\mathbf{Q}}_k(z_k^2 - z_{k-1}^2), \qquad \mathbf{D} = \frac13\sum_k\bar{\mathbf{Q}}_k(z_k^3 - z_{k-1}^3).
$$
$\mathbf{A}$ is the in-plane (extensional) stiffness, $\mathbf{D}$ the bending stiffness and $\mathbf{B}$ the **coupling** between them.
:::

::: proof
The resultants are $\mathbf{N} = \int_{-h/2}^{h/2}\boldsymbol\sigma\,dz$ and $\mathbf{M} = \int_{-h/2}^{h/2}\boldsymbol\sigma\,z\,dz$. Within ply $k$, $\boldsymbol\sigma = \bar{\mathbf{Q}}_k(\boldsymbol\varepsilon^0 + z\boldsymbol\kappa)$ with $\bar{\mathbf{Q}}_k$ constant, so
$$
\mathbf{N} = \sum_k\bar{\mathbf{Q}}_k\left[\boldsymbol\varepsilon^0\!\int_{z_{k-1}}^{z_k}\!dz + \boldsymbol\kappa\!\int_{z_{k-1}}^{z_k}\!z\,dz\right], \qquad
\mathbf{M} = \sum_k\bar{\mathbf{Q}}_k\left[\boldsymbol\varepsilon^0\!\int_{z_{k-1}}^{z_k}\!z\,dz + \boldsymbol\kappa\!\int_{z_{k-1}}^{z_k}\!z^2\,dz\right],
$$
and the integrals give the stated sums. Assumptions: perfect bonding (no slip between plies), Kirchhoff kinematics (no transverse shear deformation, valid for thin laminates), plane stress in each ply, linear elasticity. For a homogeneous isotropic plate, $\mathbf{B} = \mathbf{0}$ and $\mathbf{D} = \mathbf{Q}h^3/12$, recovering the plate rigidity $D$.
:::

The structure of $\mathbf{A}$, $\mathbf{B}$ and $\mathbf{D}$ depends on the stacking sequence in ways the designer controls:

- **Symmetric** laminates (each ply mirrored about the mid-plane) have $\mathbf{B} = \mathbf{0}$: in-plane loads cause no bending and vice versa. Because $z_k^2 - z_{k-1}^2$ has opposite signs for mirror-image plies, their contributions to $\mathbf{B}$ cancel. Almost all practical laminates are symmetric, because an unsymmetric laminate also **warps when it cools after curing** — thermal strains couple into curvature just as mechanical ones do.
- **Balanced** laminates (every $+\theta$ ply matched by a $-\theta$ ply of the same thickness) have $A_{16} = A_{26} = 0$: no extension–shear coupling in the plane. Since $\bar Q_{16}$ and $\bar Q_{26}$ are odd in $\theta$, they cancel in the sum for $\mathbf{A}$. They do not, in general, cancel in $\mathbf{D}$ unless the $\pm\theta$ pairs are at mirror positions, so a balanced symmetric laminate can still have bending–twisting coupling $D_{16}$, $D_{26}$.
- **Quasi-isotropic** laminates, such as $[0/\pm45/90]_s$ or $[0/\pm60]_s$, have an $\mathbf{A}$ matrix with the form of an isotropic material: equal in-plane stiffness in every direction.

Effective engineering constants for in-plane loading of a symmetric laminate follow from the inverse $\mathbf{a} = \mathbf{A}^{-1}$: $E_x = 1/(a_{11}h)$, $\nu_{xy} = -a_{12}/a_{11}$, $G_{xy} = 1/(a_{66}h)$.

::: algorithm Laminate analysis {#alg-clt}
1. For each ply, compute $\mathbf{Q}$ from $E_1, E_2, \nu_{12}, G_{12}$ and $\bar{\mathbf{Q}}_k$ at its angle.
2. Find the interface coordinates $z_k$ from the stacking sequence and ply thickness, measured from the mid-plane.
3. Assemble $\mathbf{A}$, $\mathbf{B}$, $\mathbf{D}$.
4. Solve [[#eq-abd]] for $\boldsymbol\varepsilon^0$ and $\boldsymbol\kappa$ under the applied $\mathbf{N}$, $\mathbf{M}$.
5. For each ply, compute the strains $\boldsymbol\varepsilon^0 + z\boldsymbol\kappa$ at its top and bottom, transform them to ply axes, and find the ply stresses $\sigma_1, \sigma_2, \tau_{12}$ with $\mathbf{Q}$.
6. Apply a failure criterion to each ply ([[#def-failure]]).
:::

::: example Cross-ply and angle-ply laminates {#ex-laminates}
Using the ply of [[#ex-ply]] with ply thickness $0.125\ \mathrm{mm}$, find the in-plane engineering constants $E_x$, $\nu_{xy}$, $G_{xy}$ of (a) $[0/90]_s$, (b) $[\pm45]_s$ and (c) the quasi-isotropic $[0/\pm45/90]_s$.
::: solution
(a) $[0/90]_s$, $h = 0.5\ \mathrm{mm}$. Two $0^\circ$ and two $90^\circ$ plies, so $\mathbf{A}/h$ is the average of $\mathbf{Q}$ and $\bar{\mathbf{Q}}(90^\circ)$ (which swaps $Q_{11}$ and $Q_{22}$):
$$
\frac{\mathbf{A}}{h} = \begin{bmatrix} 96.08 & 2.90 & 0\\ 2.90 & 96.08 & 0\\ 0 & 0 & 7.17\end{bmatrix}\ \mathrm{GPa},
$$
giving $E_x = 96.0\ \mathrm{GPa}$, $\nu_{xy} = 0.030$, $G_{xy} = 7.17\ \mathrm{GPa}$. Half the fibres point along $x$, so $E_x$ is about half of $E_1$, but the shear stiffness is only the matrix-dominated $G_{12}$.

(b) $[+45/-45/-45/+45]$: $\bar Q_{11}(45^\circ) = \tfrac14(Q_{11} + 2Q_{12} + 4Q_{66} + Q_{22}) = 56.66\ \mathrm{GPa}$, $\bar Q_{12} = 42.32$, $\bar Q_{66} = 46.59\ \mathrm{GPa}$; the $\bar Q_{16}$ terms cancel between $+45$ and $-45$. Inverting: $E_x = 25.1\ \mathrm{GPa}$, $\nu_{xy} = 0.75$, $G_{xy} = 46.6\ \mathrm{GPa}$. The shear stiffness is six and a half times that of the cross-ply, because shear in $x$–$y$ is tension and compression along $\pm45^\circ$ — along the fibres. This is why the skins of torsion boxes and drive shafts use $\pm45^\circ$ plies.

(c) $[0/45/-45/90]_s$: $E_x = E_y = 69.7\ \mathrm{GPa}$, $\nu_{xy} = 0.296$, $G_{xy} = 26.9\ \mathrm{GPa}$, and indeed $E_x/[2(1 + \nu_{xy})] = 26.9\ \mathrm{GPa}$, the isotropic relation. Sanity check: a quasi-isotropic carbon laminate has about the stiffness of aluminium ($70\ \mathrm{GPa}$) at about 57 % of its density — the real weight advantage of carbon is smaller than the ply's $E_1$ suggests, unless the plies can be aligned with the loads.
:::
:::

::: warning Unsymmetric and unbalanced laminates do unexpected things
A two-ply $[0/90]$ laminate has $\mathbf{B} \ne \mathbf{0}$: with the ply above and $0.125\ \mathrm{mm}$ plies, $B_{11} = -B_{22} = -1.34\ \mathrm{kN}$ (units of force: $\mathrm{N\,mm}$ per mm). Pull it in $x$ and it curls ($\kappa_x \ne 0$); cure it at $120\ ^\circ\mathrm{C}$ and it comes out of the mould as a saddle. An unbalanced laminate ($[0/30]_s$, say) shears when pulled, so a tension test grips it unevenly and a structure built from it twists. Both couplings are occasionally used deliberately (aeroelastic tailoring of wings and blades), but by accident they cause distortion, residual stresses and misleading test results. Check $\mathbf{B} = \mathbf{0}$ and $A_{16} = A_{26} = 0$ before anything else — and remember that symmetry and balance in the *design* are lost if a ply is laid at the wrong angle or dropped in manufacture.
:::

## Failure of a ply and of a laminate

A unidirectional ply has five basic strengths: $X_t$ and $X_c$ along the fibres in tension and compression, $Y_t$ and $Y_c$ across them, and $S$ in in-plane shear. They differ enormously: for typical carbon/epoxy $X_t \approx 1500\ \mathrm{MPa}$ but $Y_t \approx 40\ \mathrm{MPa}$. A failure criterion combines them into a prediction for any combined stress state $(\sigma_1, \sigma_2, \tau_{12})$ in ply axes.

::: definition Ply failure criteria {#def-failure}
**Maximum stress:** the ply fails when any one of
$$
\sigma_1 = X_t\ (\text{or } -X_c), \quad \sigma_2 = Y_t\ (\text{or } -Y_c), \quad \lvert\tau_{12}\rvert = S
$$
is reached; the governing term also identifies the failure mode (fibre, transverse matrix or shear).

**Tsai–Hill:** an interactive criterion adapted from Hill's anisotropic yield criterion,
$$
\left(\frac{\sigma_1}{X}\right)^2 - \frac{\sigma_1\sigma_2}{X^2} + \left(\frac{\sigma_2}{Y}\right)^2 + \left(\frac{\tau_{12}}{S}\right)^2 = 1,
$$
with $X$ and $Y$ taken as the tensile or compressive strengths according to the signs of $\sigma_1$ and $\sigma_2$.

**Tsai–Wu:** a quadratic tensor polynomial with linear terms that distinguish tension and compression,
$$
F_1\sigma_1 + F_2\sigma_2 + F_{11}\sigma_1^2 + F_{22}\sigma_2^2 + F_{66}\tau_{12}^2 + 2F_{12}\sigma_1\sigma_2 = 1,
$$
with $F_1 = \frac{1}{X_t} - \frac{1}{X_c}$, $F_{11} = \frac{1}{X_tX_c}$, $F_2 = \frac{1}{Y_t} - \frac{1}{Y_c}$, $F_{22} = \frac{1}{Y_tY_c}$, $F_{66} = \frac{1}{S^2}$, and the interaction term commonly estimated as $F_{12} = -\tfrac12\sqrt{F_{11}F_{22}}$.

These are **empirical** criteria, fitted to uniaxial and shear strengths; their accuracy under combined stress varies with material and mode, and international comparisons (the World-Wide Failure Exercises) have shown that none is reliable for every case.
:::

For a ply loaded at angle $\theta$ to its fibres by uniaxial stress $\sigma_x$, the ply-axis stresses are $\sigma_1 = \sigma_xc^2$, $\sigma_2 = \sigma_xs^2$, $\tau_{12} = -\sigma_xsc$. The maximum stress criterion gives the **off-axis strength** as the smallest of $X_t/c^2$, $Y_t/s^2$ and $S/(sc)$, and Tsai–Hill gives
$$
\frac{1}{\sigma_x^2} = \frac{c^4}{X^2} + \left(\frac{1}{S^2} - \frac{1}{X^2}\right)s^2c^2 + \frac{s^4}{Y^2}.
$$

::: widget plot
f: min(1500/cos(x*pi/180)^2, min(40/sin(x*pi/180)^2, 68/(sin(x*pi/180)*cos(x*pi/180)))); 1/sqrt(cos(x*pi/180)^4/1500^2 + (1/68^2 - 1/1500^2)*sin(x*pi/180)^2*cos(x*pi/180)^2 + sin(x*pi/180)^4/40^2)
x: 0, 90
y: 0, 1600
labels: \text{maximum stress}; \text{Tsai–Hill}
caption: Tensile strength of a unidirectional carbon/epoxy ply loaded at angle $\theta$ (degrees) to its fibres ($X_t = 1500$, $Y_t = 40$, $S = 68\ \mathrm{MPa}$). The maximum-stress curve has corners where the failure mode changes — fibre failure for the first few degrees, then shear, then transverse tension beyond about $60^\circ$ — while Tsai–Hill is smooth and lower where two stresses interact. Both show the essential fact: the strength falls to a fifth of $X_t$ within $15^\circ$. Off-axis tests on real plies generally fall close to the smooth curve.
:::

::: example First-ply failure of a cross-ply laminate {#ex-fpf}
The $[0/90]_s$ laminate of [[#ex-laminates]] ($h = 0.5\ \mathrm{mm}$) carries a tensile force $N_x$ per unit width. With the strengths $X_t = 1500$, $Y_t = 40$, $S = 68\ \mathrm{MPa}$, find the load at first-ply failure by the maximum-stress criterion, and identify which ply fails and how.
::: solution
Following [[#alg-clt]]: inverting $\mathbf{A}$ gives, per unit $N_x$ (in $\mathrm{N/mm}$), $\varepsilon^0_x = 2.084\times10^{-5}$ and $\varepsilon^0_y = -6.28\times10^{-7}$; there is no curvature ($\mathbf{B} = 0$) and no shear.

$0^\circ$ plies: $\sigma_1 = Q_{11}\varepsilon_x + Q_{12}\varepsilon_y = 3.786\ \mathrm{MPa}$ and $\sigma_2 = 0.054\ \mathrm{MPa}$ per $\mathrm{N/mm}$.
$90^\circ$ plies (ply axis 1 along $y$): $\sigma_1 = -0.054\ \mathrm{MPa}$, $\sigma_2 = Q_{12}\varepsilon_y + Q_{22}\varepsilon_x = 0.2137\ \mathrm{MPa}$ per $\mathrm{N/mm}$.

Maximum stress: the $90^\circ$ plies reach $\sigma_2 = Y_t = 40\ \mathrm{MPa}$ at $N_x = 40/0.2137 = 187\ \mathrm{N/mm}$; the $0^\circ$ plies would reach $X_t$ only at $1500/3.786 = 396\ \mathrm{N/mm}$. First-ply failure is **transverse matrix cracking of the $90^\circ$ plies** at $N_x = 187\ \mathrm{N/mm}$ — an average laminate stress of $374\ \mathrm{MPa}$. (Tsai–Hill gives the same value, $187\ \mathrm{N/mm}$, because $\sigma_1$ in those plies is tiny.)

Sanity check and interpretation: the cracked $90^\circ$ plies no longer carry transverse load, but the laminate does not fail — the $0^\circ$ plies carry almost all of $N_x$ anyway (their stress is 18 times that of the $90^\circ$ plies). Ultimate failure is near $396\ \mathrm{N/mm}$. Whether first-ply failure is acceptable depends on the application: in a fuel tank or pressure vessel the matrix cracks are leak paths, and in fatigue they grow into delaminations; design allowables normally keep service loads below first-ply failure, and thermal residual stresses from curing (ignored here) lower it further.
:::
:::

### Delamination and free edges

Classical laminate theory predicts only in-plane stresses. At a free edge of a laminate — the edge of a hole, a cut-out or a coupon — the plies, which would contract sideways by different amounts under load (their $\nu_{xy}$ differ), are forced to deform together by the bond, and **interlaminar stresses** $\sigma_z$, $\tau_{xz}$, $\tau_{yz}$ arise in a boundary layer about one laminate thickness wide. They can exceed the weak through-thickness strength of the resin and start **delamination**, the characteristic failure of laminates, which is also caused by impacts that leave little visible damage on the surface. Delamination growth is analysed with the fracture mechanics of [[solid-mechanics/fracture-mechanics]] — the energy release rate measured in double cantilever beam tests — and stacking sequences are chosen to reduce free-edge tension (for example by placing $\pm45^\circ$ plies on the outside).

::: application Designing with laminates
Practical composite design follows rules of thumb grounded in this chapter: use symmetric, balanced laminates; include at least about 10 % of the plies in each of the $0^\circ$, $\pm45^\circ$ and $90^\circ$ directions so that no load direction is matrix-dominated; avoid more than a few identical plies stacked together (thick blocks of the same angle crack and delaminate more readily); place $\pm45^\circ$ plies at the surfaces for damage tolerance and buckling. Allowables come from extensive coupon and element testing that accounts for environment (hot–wet conditions reduce matrix-dominated strengths), impact damage and scatter, and aircraft and pressure-vessel composites are certified to the applicable regulations and codes with that test evidence.
:::

::: history
The bounds behind the rule of mixtures go back to Woldemar Voigt (1889), who averaged stiffnesses under uniform strain, and András Reuss (1929), who averaged compliances under uniform stress. Rodney Hill's 1948 criterion for the yielding of anisotropic metals was adapted to fibre composites by V. D. Azzi and S. W. Tsai in 1965 (the Tsai–Hill criterion), and S. W. Tsai and E. M. Wu proposed their tensor-polynomial criterion in 1971. The coupling between stretching and bending in unsymmetric laminates was analysed by E. Reissner and Y. Stavsky in 1961, and R. B. Pipes and N. J. Pagano computed the interlaminar stresses at free edges in 1970. High-strength carbon fibres from polyacrylonitrile were developed at the Royal Aircraft Establishment, Farnborough, in the early 1960s by William Watt, Leslie Phillips and William Johnson, which made carbon-fibre composites practical for structures.
:::

::: quiz
Which laminate has no coupling between in-plane loads and bending, and no extension–shear coupling?
- [ ] $[0/90]$
- [ ] $[0/30]_s$
- [x] $[0/\pm45/90]_s$
- [ ] $[+45/-45]$
::: solution
$[0/\pm45/90]_s$ is symmetric ($\mathbf{B} = 0$) and balanced ($A_{16} = A_{26} = 0$). $[0/90]$ and $[+45/-45]$ are unsymmetric ($\mathbf{B} \ne 0$); $[0/30]_s$ is symmetric but unbalanced ($A_{16} \ne 0$).
:::
:::

::: quiz
A cross-ply laminate is loaded in tension along its $0^\circ$ fibres. Which plies fail first, and how?
- [ ] The $0^\circ$ plies, by fibre fracture.
- [x] The $90^\circ$ plies, by transverse matrix cracking.
- [ ] Both together, by delamination.
::: solution
The $90^\circ$ plies see the laminate strain across their fibres, and their transverse strength $Y_t$ is tiny, so they crack first ([[#ex-fpf]]) at a load well below the fibre-failure load of the $0^\circ$ plies.
:::
:::

::: summary
- A unidirectional ply is orthotropic: four in-plane constants $E_1$, $E_2$, $\nu_{12}$, $G_{12}$, with $\nu_{21}/E_2 = \nu_{12}/E_1$.
- Rule of mixtures: $E_1 = E_fV_f + E_mV_m$ (accurate); $1/E_2 = V_f/E_f + V_m/E_m$ (a lower bound).
- Off-axis plies: $\bar{\mathbf{Q}}(\theta)$ has extension–shear coupling terms $\bar Q_{16}$, $\bar Q_{26}$; $E_x(\theta)$ falls steeply with misalignment, dominated by the matrix shear compliance.
- Classical laminate theory: $\mathbf{N} = \mathbf{A}\boldsymbol\varepsilon^0 + \mathbf{B}\boldsymbol\kappa$, $\mathbf{M} = \mathbf{B}\boldsymbol\varepsilon^0 + \mathbf{D}\boldsymbol\kappa$. Symmetric $\Rightarrow \mathbf{B} = 0$; balanced $\Rightarrow A_{16} = A_{26} = 0$; quasi-isotropic layups have isotropic $\mathbf{A}$.
- Ply failure: maximum stress (identifies the mode), Tsai–Hill and Tsai–Wu (interactive). First-ply failure is usually transverse cracking of plies whose fibres are across the load; ultimate failure is fibre-dominated.
- Free edges and impacts cause interlaminar stresses and delamination, analysed by fracture mechanics.
:::

## Exercises

::: exercise Longitudinal modulus {level=1 check="117"}
Carbon fibres with $E_f = 230\ \mathrm{GPa}$ are embedded in a resin with $E_m = 4\ \mathrm{GPa}$ at $V_f = 0.5$. Estimate $E_1$. (Enter it in GPa.)
::: solution
$E_1 = 230(0.5) + 4(0.5) = 117\ \mathrm{GPa}$. (The fibres' own transverse modulus is much lower than $230\ \mathrm{GPa}$, so the Reuss formula with $E_f = 230\ \mathrm{GPa}$ would overestimate $E_2$.)
:::
:::

::: exercise Reciprocal Poisson's ratio {level=1 check="0.02"}
A ply has $E_1 = 150\ \mathrm{GPa}$, $E_2 = 10\ \mathrm{GPa}$ and $\nu_{12} = 0.3$. Find $\nu_{21}$. (Enter the number.)
::: solution
$\nu_{21} = \nu_{12}E_2/E_1 = 0.3\times10/150 = 0.02$. A transverse stress of $10\ \mathrm{MPa}$ ($\varepsilon_2 = 10^{-3}$) causes a fibre-direction strain of only $-2\times10^{-5}$.
:::
:::

::: exercise Tsai–Hill for a matrix-dominated stress {level=1 check="40"}
A ply with $Y_t = 40\ \mathrm{MPa}$ and $S = 50\ \mathrm{MPa}$ carries $\sigma_2 = 24\ \mathrm{MPa}$ and $\sigma_1 = 0$. What shear stress $\tau_{12}$ will cause failure by the Tsai–Hill criterion? (Enter it in MPa.)
::: solution
$(24/40)^2 + (\tau/50)^2 = 1$ gives $(\tau/50)^2 = 0.64$, $\tau = 40\ \mathrm{MPa}$. The maximum stress criterion would allow $50\ \mathrm{MPa}$: interaction lowers the strength.
:::
:::

::: exercise Off-axis strength at 45° {level=2 check="80"}
A unidirectional ply with $X_t = 1500$, $Y_t = 40$ and $S = 68\ \mathrm{MPa}$ is loaded in uniaxial tension at $45^\circ$ to its fibres. Find the failure stress by the maximum-stress criterion, and the mode. (Enter the stress in MPa.)
::: solution
At $45^\circ$: $\sigma_1 = \sigma_2 = \sigma_x/2$, $\lvert\tau_{12}\rvert = \sigma_x/2$. Limits: $\sigma_x = 2X_t = 3000$, $2Y_t = 80$, $2S = 136\ \mathrm{MPa}$. The smallest is $80\ \mathrm{MPa}$: transverse tension. Tsai–Hill gives $69\ \mathrm{MPa}$, because the transverse and shear stresses interact.
:::
:::

::: exercise A cross-ply A matrix {level=2}
For the ply of [[#ex-ply]] and $0.2\ \mathrm{mm}$ plies, compute $\mathbf{A}$ for $[0/90/0]$ (three plies, symmetric), and find $E_x$ and $E_y$ of the laminate. Why are they different?
::: solution
$h = 0.6\ \mathrm{mm}$; two $0^\circ$ plies ($0.4\ \mathrm{mm}$) and one $90^\circ$ ($0.2\ \mathrm{mm}$): $A_{11} = 181.81(0.4) + 10.35(0.2) = 74.79\ \mathrm{kN/mm}$, $A_{22} = 10.35(0.4) + 181.81(0.2) = 40.50\ \mathrm{kN/mm}$, $A_{12} = 2.897(0.6) = 1.74\ \mathrm{kN/mm}$, $A_{66} = 7.17(0.6) = 4.30\ \mathrm{kN/mm}$ (using GPa × mm = kN/mm). Then $E_x = (A_{11} - A_{12}^2/A_{22})/h = (74.79 - 0.075)/0.6 = 124.5\ \mathrm{GPa}$ and $E_y = (A_{22} - A_{12}^2/A_{11})/h = (40.50 - 0.040)/0.6 = 67.4\ \mathrm{GPa}$. Two-thirds of the fibres point along $x$.
:::
:::

::: exercise Bending stiffness depends on stacking order {level=2}
Compare $D_{11}$ for $[0/90]_s$ and $[90/0]_s$ made of the ply of [[#ex-ply]] with $0.125\ \mathrm{mm}$ plies, and explain the result. Do the two laminates have the same $\mathbf{A}$?
::: solution
$z$-coordinates: $-0.25, -0.125, 0, 0.125, 0.25\ \mathrm{mm}$. Outer plies contribute $\tfrac13\times2\times(0.25^3 - 0.125^3) = 9.115\times10^{-3}\ \mathrm{mm^3}$, inner plies $\tfrac13\times2\times0.125^3 = 1.302\times10^{-3}\ \mathrm{mm^3}$. $[0/90]_s$: $D_{11} = 181.81(9.115\times10^{-3}) + 10.35(1.302\times10^{-3}) = 1.671\ \mathrm{kN\,mm}$ ($= 1671\ \mathrm{N\,mm}$). $[90/0]_s$: $D_{11} = 10.35(9.115\times10^{-3}) + 181.81(1.302\times10^{-3}) = 0.331\ \mathrm{kN\,mm}$, five times less. The $\mathbf{A}$ matrices are identical — the same plies in a different order — but bending stiffness weights each ply by its distance from the mid-plane squared, as in a sandwich panel. For bending about $y$, put the $0^\circ$ plies outside.
:::
:::

::: exercise Derive the off-axis shear coupling {level=3}
(a) For a ply at angle $\theta$ under uniaxial $\sigma_x$, show that the shear strain in laminate axes is $\gamma_{xy} = \sigma_x\,sc\left[\left(\frac{2}{E_1} + \frac{2\nu_{12}}{E_1} - \frac{1}{G_{12}}\right)c^2 - \left(\frac{2}{E_2} + \frac{2\nu_{12}}{E_1} - \frac{1}{G_{12}}\right)s^2\right]$. (b) Evaluate the ratio $\gamma_{xy}/\varepsilon_x$ for the ply of [[#ex-ply]] at $\theta = 30^\circ$. (c) Explain why this coupling makes an off-axis tension test with rigid grips give a misleading modulus.
::: solution
(a) From the proof of [[#thm-qbar]], $\varepsilon_1 = \sigma_x(c^2 - \nu_{12}s^2)/E_1$, $\varepsilon_2 = \sigma_x(s^2/E_2 - \nu_{12}c^2/E_1)$, $\gamma_{12} = -\sigma_xsc/G_{12}$. The laminate-axis shear strain is $\gamma_{xy} = 2sc(\varepsilon_1 - \varepsilon_2) + (c^2 - s^2)\gamma_{12}$. Substituting and collecting the $c^2$ and $s^2$ terms (using $c^2 - s^2$ and $c^2 + s^2 = 1$) gives the stated expression.
(b) At $30^\circ$: $c^2 = 0.75$, $s^2 = 0.25$, $sc = 0.4330$. In $\mathrm{GPa^{-1}}$: $2/E_1 + 2\nu_{12}/E_1 - 1/G_{12} = 0.01105 + 0.00309 - 0.13947 = -0.12533$; $2/E_2 + 2\nu_{12}/E_1 - 1/G_{12} = 0.19417 + 0.00309 - 0.13947 = 0.05779$. So $\gamma_{xy}/\sigma_x = 0.4330[-0.12533(0.75) - 0.05779(0.25)] = -0.04696\ \mathrm{GPa^{-1}}$, while $\varepsilon_x/\sigma_x = 1/E_x(30^\circ) = 1/28.78 = 0.03475\ \mathrm{GPa^{-1}}$. The ratio is $\gamma_{xy}/\varepsilon_x = -1.35$: the ply shears more than it stretches.
(c) Rigid grips prevent the shear, introducing shear forces and bending moments at the grips; the specimen bends into an S-shape, the stress is not uniform, and the apparent modulus is too high. Long specimens or oblique-tabbed grips are used to reduce the effect.
:::
:::

::: exercise Choosing a layup for a drive shaft {level=3}
A carbon/epoxy tube is to replace a steel automotive drive shaft. It must transmit a torque (shear stress in the tube wall) and must have a first bending natural frequency above the maximum running speed, which requires a high axial modulus. Using the results of [[#ex-laminates]] for guidance, propose a layup, estimate its axial and shear moduli with CLT, and discuss the other design issues: the joints to metal end fittings, buckling of the thin wall under torsion, impact damage and the hot–wet environment.
::: solution
A good answer recognises the conflict: torsion wants $\pm45^\circ$ plies (high $G_{xy}$), the critical speed wants $0^\circ$ plies (high $E_x$, since the natural frequency scales with $\sqrt{E/\rho}$). A layup such as $[\pm45/0_2/\pm45]$-type, symmetric and balanced, with perhaps 40–50 % $0^\circ$ plies, gives (with the ply above, by CLT) an $E_x$ around 100 GPa and a $G_{xy}$ of 25–30 GPa — compare steel's 210 and 80 GPa, at one-fifth of the density, so $E/\rho$ is two to three times that of steel and a one-piece shaft can replace a two-piece steel shaft with a centre bearing. Other issues: a few $90^\circ$ (hoop) plies resist torsional buckling and crushing of the thin wall; the bonded or press-fitted joint to steel yokes is usually the weakest part and must be tested; thermal expansion mismatch at the joint; low-velocity impact (stones) causes delamination that is hard to see; hot–wet conditioning lowers the matrix-dominated shear strength that the $\pm45^\circ$ plies rely on; and fatigue under reversed torsion. The design is verified by coupon, component and vehicle tests.
:::
:::
