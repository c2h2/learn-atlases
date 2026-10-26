Load a steel bar in tension past its yield point and something qualitatively new happens. The stress hardly rises, the strain runs on to ten or a hundred times its elastic value, and when the load is removed the bar does not come back: it keeps a permanent set. Every chapter so far has assumed that this never happens. Yet it happens routinely and usefully — in sheet-metal forming and forging, in the autofrettage of high-pressure tubing, at the root of every notch in a ductile part, and in a steel-framed building or a crane girder overloaded beyond its elastic limit, which does not fall down at first yield but redistributes moment until a whole mechanism of plastic hinges has formed. Designing for that final collapse load, with a suitable factor, is the basis of **plastic design** of steel structures.

This chapter develops the theory of plasticity for metals at the level needed for design: the **yield criteria** that say when a general three-dimensional stress state causes yielding, the **flow rule** that says in which direction plastic strain then develops, the **hardening** that changes the criterion as plastic strain accumulates, elastic–plastic **bending and torsion**, and the **limit analysis** of beams and frames, which finds collapse loads with remarkably little calculation. The microscopic origin of plasticity — the motion of dislocations — is the subject of [[materials-science/dislocations-strengthening]]; here we treat the material as a continuum.

**Conventions.** Tension positive. $\sigma_Y$ is the tensile yield strength and $\tau_Y$ the yield strength in pure shear. Principal stresses are ordered $\sigma_1 \ge \sigma_2 \ge \sigma_3$. Bending moments are sagging-positive; at a plastic hinge the moment has magnitude $M_p$.

## Idealised material behaviour

A real stress–strain curve has an elastic line, a yield point (sometimes with a drop, in mild steel), a plateau or a gradually rising hardening curve, and eventually necking. For structural calculations it is replaced by an idealisation.

::: definition Idealised elastic–plastic materials {#def-ideal}
- **Elastic–perfectly plastic:** $\sigma = E\varepsilon$ for $\lvert\sigma\rvert < \sigma_Y$; at $\lvert\sigma\rvert = \sigma_Y$ the material flows at constant stress; unloading is elastic with slope $E$.
- **Rigid–perfectly plastic:** the elastic strains are neglected entirely; no deformation below $\sigma_Y$, unrestricted flow at $\sigma_Y$. Used for collapse loads and metal-forming estimates, where plastic strains dwarf elastic ones.
- **Linear hardening:** after yield the stress rises with slope $E_t$ (the tangent modulus), $\sigma = \sigma_Y + E_t(\varepsilon - \sigma_Y/E)$.

In every model the total strain splits into elastic and plastic parts, $\varepsilon = \varepsilon^e + \varepsilon^p$, with $\sigma = E\varepsilon^e$; on unloading only $\varepsilon^e$ is recovered.
:::

Mild structural steel, with its long yield plateau (a strain of 10–20 times the yield strain before hardening begins), is very close to elastic–perfectly plastic over the range that matters for structures. That is why limit analysis, built on that idealisation, works so well for steel frames.

## Yield criteria

In a tensile test yielding starts at $\sigma = \sigma_Y$. What about a shaft in combined bending and torsion, or the bore of a thick cylinder where $\sigma_r$, $\sigma_\theta$, $\sigma_z$ are all non-zero? We need a rule $f(\boldsymbol\sigma) = 0$, the **yield surface**, separating elastic states ($f < 0$) from yielding ($f = 0$). For an isotropic material it can depend only on the principal stresses. Two experimental facts about metals simplify it further: yielding is **insensitive to hydrostatic pressure** (Bridgman's high-pressure experiments showed that superimposing pressures of the order of the yield stress hardly changes it), and yield in tension and compression occur at the same magnitude of stress. So $f$ depends only on the stress **deviator** of [[solid-mechanics/stress-strain-3d]].

::: definition Tresca and von Mises yield criteria {#def-criteria}
**Tresca (maximum shear stress):** yielding occurs when the maximum shear stress reaches the value it has at yield in a tensile test,
$$
\tau_{\max} = \frac{\sigma_1 - \sigma_3}{2} = \frac{\sigma_Y}{2}.
$$
**Von Mises (maximum distortion energy, or $J_2$):** yielding occurs when the second invariant of the stress deviator reaches its value at yield in a tensile test,
$$
\sigma_{\mathrm{vM}} = \sqrt{3J_2} = \sqrt{\tfrac12\left[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2\right]} = \sigma_Y .
$$
In terms of components, $\sigma_{\mathrm{vM}}^2 = \tfrac12\left[(\sigma_x - \sigma_y)^2 + (\sigma_y - \sigma_z)^2 + (\sigma_z - \sigma_x)^2\right] + 3(\tau_{xy}^2 + \tau_{yz}^2 + \tau_{zx}^2)$.
:::

::: proposition Von Mises as a distortion-energy criterion {#prop-distortion}
For an isotropic linear-elastic material, the strain energy per unit volume splits into a volumetric part and a distortional part,
$$
U_0 = \frac{\sigma_m^2}{2K} + \frac{J_2}{2G}, \qquad \sigma_m = \tfrac13(\sigma_1 + \sigma_2 + \sigma_3),
$$
where $K$ is the bulk modulus and $G$ the shear modulus. The von Mises criterion is therefore equivalent to: yielding begins when the distortional energy $J_2/2G$ reaches its value at yield in a tensile test, $\sigma_Y^2/6G$.
:::

::: proof
Write $\sigma_{ij} = \sigma_m\delta_{ij} + s_{ij}$ and, correspondingly, $\varepsilon_{ij} = \tfrac13e\,\delta_{ij} + e_{ij}$ with $e$ the volumetric strain and $e_{ij}$ the deviatoric strain. Hooke's law for an isotropic material ([[solid-mechanics/linear-elasticity]]) separates into $\sigma_m = Ke$ and $s_{ij} = 2Ge_{ij}$. The energy density is $U_0 = \tfrac12\sigma_{ij}\varepsilon_{ij}$; the cross terms vanish because $s_{ii} = e_{ii} = 0$, so
$$
U_0 = \tfrac12\sigma_m e + \tfrac12s_{ij}e_{ij} = \frac{\sigma_m^2}{2K} + \frac{s_{ij}s_{ij}}{4G} = \frac{\sigma_m^2}{2K} + \frac{J_2}{2G},
$$
using $J_2 = \tfrac12s_{ij}s_{ij}$. In a tensile test at yield, $\sigma_1 = \sigma_Y$, $\sigma_2 = \sigma_3 = 0$, and $J_2 = \tfrac16[\sigma_Y^2 + 0 + \sigma_Y^2] = \sigma_Y^2/3$. Equating $J_2$ to $\sigma_Y^2/3$ gives $3J_2 = \sigma_Y^2$, the von Mises criterion. (Equivalently, it is a criterion on the octahedral shear stress, $\tau_{\mathrm{oct}} = \sqrt{2J_2/3}$.)
:::

The two criteria agree in uniaxial tension by construction and differ most in **pure shear** ($\sigma_1 = \tau$, $\sigma_2 = 0$, $\sigma_3 = -\tau$): Tresca predicts $\tau_Y = \sigma_Y/2 = 0.5\sigma_Y$, von Mises $\tau_Y = \sigma_Y/\sqrt3 = 0.577\sigma_Y$, 15.5 % higher. Careful tests on thin tubes in combined tension and torsion (Taylor and Quinney, 1931) and in combined tension and internal pressure (Lode, 1926) showed that most ductile metals lie closer to von Mises. Tresca remains popular because it is piecewise linear, slightly conservative, and simple to use by hand when the principal stresses are known.

### Geometry of the yield surface

In principal-stress space both criteria are prisms with their axes along the line $\sigma_1 = \sigma_2 = \sigma_3$ — infinite in that direction because hydrostatic stress does not cause yield. Cut by the plane perpendicular to that line (the **π-plane**), von Mises is a circle and Tresca a regular hexagon inscribed in it. In **plane stress** ($\sigma_3 = 0$) the prisms are cut obliquely: von Mises becomes the ellipse $\sigma_1^2 - \sigma_1\sigma_2 + \sigma_2^2 = \sigma_Y^2$, and Tresca a hexagon whose vertices are at $(\pm\sigma_Y, 0)$, $(0, \pm\sigma_Y)$ and $\pm(\sigma_Y, \sigma_Y)$, inscribed in the ellipse.

::: widget plot
f: (x + sqrt(4 - 3x^2))/2; (x - sqrt(4 - 3x^2))/2; if(abs(x) <= 1, if(x < 0, 1 + x, 1), 0/0); if(abs(x) <= 1, if(x < 0, -1, x - 1), 0/0); -x
x: -1.4, 1.4
y: -1.4, 1.4
equal: true
labels: \text{von Mises}; \text{von Mises}; \text{Tresca}; \text{Tresca}; \text{pure shear } \sigma_2 = -\sigma_1
caption: Plane-stress yield loci in the $(\sigma_1/\sigma_Y, \sigma_2/\sigma_Y)$ plane; the third principal stress is zero. Inside the curves the material is elastic. The two criteria touch at the six hexagon vertices — uniaxial tension or compression and equal biaxial tension or compression — and differ most along the pure-shear line, where Tresca yields at $\sigma_1 = 0.5\sigma_Y$ and von Mises at $0.577\sigma_Y$. Note that in equal biaxial tension (a spherical pressure vessel) both predict yield at $\sigma_Y$, not earlier: the out-of-plane principal stress $0$ is what the shear acts against.
:::

::: example Yield of a tube in tension and torsion {#ex-tube-yield}
A thin-walled steel tube ($\sigma_Y = 250\ \mathrm{MPa}$) carries an axial stress $\sigma = 150\ \mathrm{MPa}$ and a torsional shear stress $\tau = 80\ \mathrm{MPa}$. Find the factor of safety against first yield by each criterion. If the loads are increased proportionally until yield, in what ratio do the plastic shear and axial strain increments start (von Mises with the associated flow rule, below)?
::: solution
The principal stresses are $\sigma_{1,3} = \sigma/2 \pm\sqrt{(\sigma/2)^2 + \tau^2}$ and $\sigma_2 = 0$, so $\sigma_1 - \sigma_3 = \sqrt{\sigma^2 + 4\tau^2}$, and from the component formula $\sigma_{\mathrm{vM}} = \sqrt{\sigma^2 + 3\tau^2}$:
$$
\text{Tresca: } \sqrt{150^2 + 4\times80^2} = 219.3\ \mathrm{MPa},\ n = \frac{250}{219.3} = 1.14; \qquad
\text{von Mises: } \sqrt{150^2 + 3\times80^2} = 204.2\ \mathrm{MPa},\ n = 1.22 .
$$
Flow direction: the Prandtl–Reuss rule (proposition below) gives plastic strain increments proportional to the deviator, $d\varepsilon^p_x = d\lambda\,s_x = d\lambda\,\tfrac23\sigma$ and $d\gamma^p_{xy} = 2\,d\varepsilon^p_{xy} = 2\,d\lambda\,\tau$, so
$$
\frac{d\gamma^p}{d\varepsilon^p_x} = \frac{3\tau}{\sigma} = \frac{3\times80}{150} = 1.6 .
$$
Sanity check: in pure shear Tresca is 15.5 % more conservative than von Mises; here, with a mixture of tension and shear, the difference is $219.3/204.2 = 1.074$, between the uniaxial value (1.0) and the pure-shear value (1.155), as it must be.
:::
:::

## Plastic flow and hardening

A yield criterion says *when* plastic flow starts; a **flow rule** says *how* it proceeds. Two experimental facts about metals guide the choice: plastic deformation is (almost) **volume-preserving**, and the principal axes of the plastic strain increment coincide with those of the stress.

::: proposition Lévy–Mises and Prandtl–Reuss flow rules {#prop-flow}
For a von Mises material, the plastic strain increments are proportional to the stress deviator:
$$
d\varepsilon^p_{ij} = d\lambda\,s_{ij}, \qquad d\lambda \ge 0,
$$
with $d\lambda = 0$ unless the stress is on the yield surface and remains there. Equivalently, $d\boldsymbol\varepsilon^p$ is **normal** to the yield surface, $d\varepsilon^p_{ij} = d\lambda\,\partial f/\partial\sigma_{ij}$ with $f = J_2 - k^2$. The total strain increment is the elastic increment from Hooke's law plus $d\varepsilon^p_{ij}$ (Prandtl–Reuss); when elastic strains are neglected it is $d\varepsilon_{ij} = d\lambda\,s_{ij}$ (Lévy–Mises). Consequences: (i) $d\varepsilon^p_{kk} = 0$ (no plastic volume change); (ii) in uniaxial tension, $d\varepsilon^p_2 = d\varepsilon^p_3 = -\tfrac12d\varepsilon^p_1$ — a plastic Poisson's ratio of $\tfrac12$.
:::

::: proof
The flow rule is a constitutive postulate, justified by experiment and by Drucker's stability postulate, so what can be shown are its consequences. Normality: $\partial J_2/\partial\sigma_{ij} = s_{ij}$ (differentiate $J_2 = \tfrac12s_{kl}s_{kl}$ and use $\partial s_{kl}/\partial\sigma_{ij} = \delta_{ik}\delta_{jl} - \tfrac13\delta_{kl}\delta_{ij}$, the second term dropping out because $s_{kk} = 0$). (i) $d\varepsilon^p_{kk} = d\lambda\,s_{kk} = 0$. (ii) In uniaxial tension $s_1 = \tfrac23\sigma$, $s_2 = s_3 = -\tfrac13\sigma$, so $d\varepsilon^p_2/d\varepsilon^p_1 = -\tfrac12$. The non-negativity of $d\lambda$ expresses the fact that plastic work $\sigma_{ij}d\varepsilon^p_{ij} = d\lambda\,s_{ij}s_{ij} = 2J_2\,d\lambda$ is dissipated, never recovered.
:::

Under continued straining most metals **harden**: the stress needed for further flow rises. Two simple models describe how the yield surface changes:

- **Isotropic hardening:** the surface expands uniformly; the current yield stress depends on the accumulated equivalent plastic strain $\bar\varepsilon^p = \int\sqrt{\tfrac23d\varepsilon^p_{ij}d\varepsilon^p_{ij}}$. It predicts that a bar pre-strained in tension to stress $\sigma_1 > \sigma_Y$ then yields in compression at $-\sigma_1$.
- **Kinematic hardening:** the surface keeps its size and translates in stress space. A bar pre-strained in tension to $\sigma_1$ yields in reverse at $\sigma_1 - 2\sigma_Y$, i.e. *earlier* than the original compressive yield. This is the **Bauschinger effect**, observed in real metals, and it is essential for modelling cyclic loading, ratcheting and low-cycle fatigue.

Real metals show a combination, and finite element programs offer both.

::: warning Use the yield criterion with the full stress state — and do not apply it to brittle materials
Two errors are common. (1) Checking yield with in-plane stresses only: in plane stress the third principal stress is zero and must be included in Tresca ([[solid-mechanics/stress-strain-3d]]), and in thick sections the out-of-plane stress is not zero at all — a notch root in a thick plate is close to plane strain, where $\sigma_3 = \nu(\sigma_1 + \sigma_2)$ raises the stress needed to yield. (2) Applying Tresca or von Mises to brittle materials (cast iron, ceramics, glass, concrete) or to soils: these fail at the maximum principal stress or by pressure-sensitive criteria (Mohr–Coulomb, Drucker–Prager), and their tensile and compressive strengths differ greatly. Von Mises and Tresca are for ductile metals and similar materials whose yield is insensitive to hydrostatic pressure.
:::

## Elastic–plastic bending

A rectangular beam of an elastic–perfectly plastic material is bent by an increasing moment. Plane sections still remain plane — that is kinematics, independent of the material — so the strain is linear through the depth, $\varepsilon = \kappa y$. While the beam is elastic, $\sigma = E\kappa y$. When the extreme fibres reach $\varepsilon_Y = \sigma_Y/E$, at the curvature $\kappa_Y$, the beam carries the **yield moment** $M_Y$. Beyond that, the outer fibres flow at constant stress $\sigma_Y$ while an elastic core, of half-depth $y_e = \varepsilon_Y/\kappa$, shrinks.

::: proposition Moment–curvature relation of a rectangular section {#prop-mkappa}
For a rectangular section $b\times h$ of elastic–perfectly plastic material,
$$
M_Y = \frac{\sigma_Ybh^2}{6}, \qquad M_p = \frac{\sigma_Ybh^2}{4} = 1.5\,M_Y,
$$
and for curvatures beyond first yield
$$
\frac{M}{M_Y} = \frac32\left[1 - \frac13\left(\frac{\kappa_Y}{\kappa}\right)^2\right], \qquad \kappa \ge \kappa_Y .
$$
The **plastic moment** $M_p = \sigma_YZ_p$ is approached asymptotically as $\kappa \to \infty$. The ratio $\alpha = M_p/M_Y = Z_p/Z_e$ is the **shape factor**; it is $1.5$ for a rectangle, $16/3\pi = 1.70$ for a solid circle, and about $1.10$–$1.20$ for rolled I-sections bent about their major axis.
:::

::: proof
With an elastic core $\lvert y\rvert \le y_e$ and plastic zones beyond,
$$
M = 2b\left[\int_0^{y_e}\sigma_Y\frac{y}{y_e}\,y\,dy + \int_{y_e}^{h/2}\sigma_Y\,y\,dy\right] = 2b\sigma_Y\left[\frac{y_e^2}{3} + \frac{h^2}{8} - \frac{y_e^2}{2}\right] = \sigma_Yb\left[\frac{h^2}{4} - \frac{y_e^2}{3}\right].
$$
At first yield $y_e = h/2$, giving $M_Y = \sigma_Ybh^2/6$; as $y_e \to 0$, $M \to \sigma_Ybh^2/4 = M_p$. Since $y_e = \varepsilon_Y/\kappa$ and $h/2 = \varepsilon_Y/\kappa_Y$, $y_e = (h/2)(\kappa_Y/\kappa)$, and substituting gives $M = \frac{\sigma_Ybh^2}{4}\left[1 - \frac13\left(\frac{\kappa_Y}{\kappa}\right)^2\right] = \frac32M_Y\left[1 - \frac13(\kappa_Y/\kappa)^2\right]$. In general, the fully plastic stress distribution has $+\sigma_Y$ on one side of the **equal-area axis** and $-\sigma_Y$ on the other (zero net force), so $M_p = \sigma_Y(A_1\bar y_1 + A_2\bar y_2) = \sigma_YZ_p$, with $Z_p$ the plastic section modulus.
:::

::: widget plot
f: if(x <= 1, x, 1.5*(1 - 1/(3x^2))); if(x <= 1, x, a*(1 - (a - 1)/(a*x^2)))
x: 0, 6
y: 0, 1.8
sliders: a=1.15:1:1.7:0.01
labels: \text{rectangle } (\alpha = 1.5); \text{approximate section with shape factor } \alpha
hlines: 1; 1.5
caption: Moment against curvature, both divided by their first-yield values, for an elastic–perfectly plastic rectangular beam (exact) and a simple interpolation for a section of shape factor $\alpha$ set by the slider (1.15 is typical of an I-beam). The curves are straight until first yield at $(1, 1)$, then bend over towards the plastic moment $\alpha M_Y$. At a curvature of only $3\kappa_Y$ the rectangle already carries 96 % of $M_p$: a short length of beam near the peak moment acts like a hinge that rotates at constant moment — the **plastic hinge** used in limit analysis.
:::

### Residual stresses

Unloading is elastic. If a rectangular beam is bent to $M_p$ and released, the elastic unloading subtracts $\sigma = M_py/I$ — a linear distribution reaching $\pm1.5\sigma_Y$ at the surfaces — from the fully plastic $\pm\sigma_Y$ distribution. The beam is left with **residual stresses**: $\mp0.5\sigma_Y$ at the surfaces (compression where the loading caused tension) and $\pm\sigma_Y$ just either side of the neutral axis, in self-equilibrium with zero net force and moment, together with a permanent curvature. Residual stresses of this kind are how springback in sheet bending, the benefit of shot peening and the strengthening of autofrettaged tubes are explained.

### Elastic–plastic torsion

The same argument for a solid circular shaft of radius $c$ with shear yield stress $\tau_Y$ gives a yield torque $T_Y = \pi c^3\tau_Y/2$ (from $\tau = Tr/J$ at $r = c$) and a fully plastic torque
$$
T_p = \int_0^c\tau_Y\,r\,2\pi r\,dr = \frac{2\pi c^3\tau_Y}{3} = \frac43T_Y .
$$
For a thin-walled tube, $T_p/T_Y \to 1$: all the material is already at nearly the same stress when yield begins, and there is no reserve. The shape factor measures how much material near the neutral axis is idle at first yield.

::: example Bending a rectangular bar {#ex-rect}
A steel bar $20\ \mathrm{mm}$ wide and $60\ \mathrm{mm}$ deep ($\sigma_Y = 250\ \mathrm{MPa}$, $E = 200\ \mathrm{GPa}$) is bent about its major axis. Find $M_Y$, $M_p$, the moment when the elastic core is $30\ \mathrm{mm}$ deep, and the residual surface stress after unloading from $M_p$.
::: solution
$$
M_Y = \frac{250\times20\times60^2}{6} = 3.00\times10^{6}\ \mathrm{N\,mm} = 3.00\ \mathrm{kN\,m}, \qquad M_p = \frac{250\times20\times60^2}{4} = 4.50\ \mathrm{kN\,m}.
$$
With a core $30\ \mathrm{mm}$ deep, $y_e = 15\ \mathrm{mm}$ and $\kappa_Y/\kappa = y_e/(h/2) = 0.5$:
$$
M = \frac32\times3.00\times\left(1 - \frac{0.25}{3}\right) = 4.125\ \mathrm{kN\,m},
$$
at a curvature $\kappa = 2\kappa_Y = 2\times\frac{\sigma_Y/E}{h/2} = 2\times\frac{1.25\times10^{-3}}{30\ \mathrm{mm}} = 8.33\times10^{-5}\ \mathrm{mm^{-1}}$ (radius $12\ \mathrm{m}$).

Unloading from $M_p$: the elastic surface stress removed is $M_p/Z_e = 4.50\times10^{6}/(20\times60^2/6) = 375\ \mathrm{MPa} = 1.5\sigma_Y$, so the residual stress at the surface is $250 - 375 = -125\ \mathrm{MPa}$ on the side that was in tension. Sanity check: this residual is below $\sigma_Y$ in magnitude, so the elastic unloading assumption holds (unloading would have to reach $2\sigma_Y$ of reversal before reverse yielding, for a non-Bauschinger material).
:::
:::

## Limit analysis

Consider a statically indeterminate beam of elastic–perfectly plastic material under increasing load. When the peak moment reaches $M_p$, a plastic hinge forms there — but the structure does not collapse, because the other supports can still carry extra load. The moment redistributes to less-stressed sections until enough hinges have formed to turn the structure into a **mechanism**. The load at that point is the **collapse (limit) load**. Remarkably, it can be found without following the elastic–plastic history, using two theorems.

::: theorem Bound theorems of limit analysis {#thm-bounds}
For a structure of rigid– (or elastic–) perfectly plastic material under loads increasing in proportion to a factor $\lambda$:

**Lower-bound (static) theorem.** If a distribution of bending moments can be found that is in equilibrium with the loads $\lambda_s\mathbf{P}$ and nowhere exceeds $M_p$ in magnitude, then $\lambda_s \le \lambda_c$: the structure will not collapse at that load.

**Upper-bound (kinematic) theorem.** For any assumed mechanism of plastic hinges, the load factor $\lambda_k$ obtained by equating the work done by the loads to the energy dissipated in the hinges, $\lambda_k\sum P_i\delta_i = \sum M_p\lvert\theta_j\rvert$, satisfies $\lambda_k \ge \lambda_c$.

**Uniqueness.** If a mechanism is found whose moment distribution is in equilibrium and satisfies $\lvert M\rvert \le M_p$ everywhere, its load factor is the collapse load factor $\lambda_c$.
:::

::: proof
Both bounds follow from the principle of virtual work ([[solid-mechanics/energy-methods]]), which for a beam states that for any moment field $M$ in equilibrium with loads $\mathbf{P}$ and any compatible displacement field with hinge rotations $\theta_j$, $\sum P_i\delta_i = \sum M(x_j)\,\theta_j$ (the rigid segments do no internal work).

Let the true collapse state have load factor $\lambda_c$, collapse mechanism with deflections $\delta^c_i$ and hinge rotations $\theta^c_j$, and moments $M^c$ with $M^c\theta^c_j = M_p\lvert\theta^c_j\rvert$ at each hinge.

Upper bound: for an assumed mechanism $(\delta_i, \theta_j)$, apply virtual work with the true collapse moments: $\lambda_c\sum P_i\delta_i = \sum M^c(x_j)\theta_j \le \sum M_p\lvert\theta_j\rvert = \lambda_k\sum P_i\delta_i$, since $\lvert M^c\rvert \le M_p$ everywhere. With $\sum P_i\delta_i > 0$, $\lambda_c \le \lambda_k$.

Lower bound: apply virtual work to the safe moment field $M^s$ (load $\lambda_s$) and the true collapse mechanism: $\lambda_s\sum P_i\delta^c_i = \sum M^s(x_j)\theta^c_j \le \sum M_p\lvert\theta^c_j\rvert = \lambda_c\sum P_i\delta^c_i$, so $\lambda_s \le \lambda_c$.

Uniqueness: such a mechanism gives both $\lambda \ge \lambda_c$ (it is a mechanism) and $\lambda \le \lambda_c$ (it is safe). The theorems assume perfect plasticity, small deflections at collapse (no change of geometry), proportional loading and no instability; they ignore the effect of axial and shear force on $M_p$.
:::

::: algorithm Collapse load by the mechanism method {#alg-mechanism}
1. Identify possible hinge locations: supports with moment restraint, points of concentrated load, joints where members meet, and the points of zero shear (maximum moment) under distributed load.
2. List the independent mechanisms (beam, sway, joint) and their combinations.
3. For each mechanism, give a small rotation $\theta$, compute the deflections under the loads and the hinge rotations, and solve the work equation for $\lambda$.
4. Take the smallest $\lambda$ as the candidate collapse load.
5. Check it statically: draw the moment diagram for that mechanism and confirm $\lvert M\rvert \le M_p$ everywhere. If the check fails, a mechanism with a lower $\lambda$ exists.
:::

::: example Collapse loads of beams under a central point load {#ex-beams}
A beam of span $L$ with plastic moment $M_p$ carries a single point load $P$ at mid-span. Find the collapse load (a) if it is simply supported at both ends; (b) if both ends are fully fixed (built in). Evaluate for $L = 4\ \mathrm{m}$ and $M_p = 60\ \mathrm{kN\,m}$, and compare (b) with the load at first hinge formation.
::: solution
(a) Simply supported: one hinge, at mid-span, makes a mechanism. Let each half rotate by $\theta$: the load moves $L\theta/2$, the hinge rotates $2\theta$. Work: $P\,L\theta/2 = M_p\,2\theta$, so
$$
P_c = \frac{4M_p}{L} = \frac{4\times60}{4} = 60\ \mathrm{kN}.
$$
The structure is statically determinate, so collapse occurs as soon as the peak moment $PL/4$ reaches $M_p$ — the same result.

(b) Fixed–fixed: three hinges are needed, at both supports and at mid-span. With each half rotating by $\theta$, the support hinges rotate $\theta$ each and the central hinge $2\theta$:
$$
P\frac{L\theta}{2} = M_p(\theta + 2\theta + \theta) = 4M_p\theta \quad\Rightarrow\quad P_c = \frac{8M_p}{L} = \frac{8\times60}{4} = 120\ \mathrm{kN}.
$$
Static check: the moment diagram is the free (simply supported) diagram, peak $P_cL/4 = 2M_p$, shifted down by the fixing moments $M_p$; it is $-M_p$ at the ends and $+M_p$ at mid-span, and linear between: never more than $M_p$. ✓ So $P_c = 8M_p/L$ exactly.

First hinge: elastically, a fixed–fixed beam under a central load has end moments $-PL/8$ and central moment $+PL/8$; they are equal, so the end and centre hinges form simultaneously at $PL/8 = M_p$, $P = 8M_p/L$. In this particular case there is no redistribution reserve; the plastic advantage of the fixed–fixed beam over the elastic design (which would stop at $M_Y$) is entirely the shape factor. Compare (a) and (b): fixing the ends doubles the collapse load.
:::
:::

::: example Propped cantilever and fixed–fixed beam under uniform load {#ex-udl}
Find the collapse intensity $w_c$ of a uniformly distributed load on a beam of span $L$ and plastic moment $M_p$ (a) built in at both ends; (b) built in at one end and simply supported at the other (a propped cantilever).
::: solution
(a) Hinges at both ends and mid-span. Each half rotates $\theta$; the centre deflects $L\theta/2$ and the load's work is $w\times$ (area swept) $= w\cdot\tfrac12L\cdot\tfrac{L\theta}{2} = wL^2\theta/4$. Internal work $4M_p\theta$, so $w_c = 16M_p/L^2$. (Static check as before: free moment $wL^2/8 = 2M_p$ shifted by $M_p$. ✓)

(b) Hinges at the fixed end and at an unknown distance $a$ from the propped end. If the segment next to the prop rotates by $\theta$, the sagging hinge deflects $a\theta$, and the other segment (length $L - a$) rotates $\phi = a\theta/(L - a)$. Work:
$$
w\cdot\frac{L\,a\theta}{2} = M_p\phi + M_p(\theta + \phi) = M_p\theta\left(1 + \frac{2a}{L - a}\right) \quad\Rightarrow\quad w = \frac{2M_p}{La}\cdot\frac{L + a}{L - a}.
$$
This is an upper bound for every $a$; the collapse load is its minimum. Setting $dw/da = 0$: $\frac{d}{da}\left[\frac{L + a}{a(L - a)}\right] = 0$ gives $a^2 + 2La - L^2 = 0$, $a = (\sqrt2 - 1)L = 0.414L$, and
$$
w_c = \frac{2\sqrt2}{(\sqrt2 - 1)(2 - \sqrt2)}\frac{M_p}{L^2} = (6 + 4\sqrt2)\frac{M_p}{L^2} = 11.66\frac{M_p}{L^2}.
$$
Sanity checks: $11.66$ lies between the simply supported value $8$ and the fixed–fixed value $16$; a guess of $a = L/2$ gives $w = 12M_p/L^2$, only 3 % above the true value — upper bounds are forgiving, which is what makes the mechanism method practical.
:::
:::

::: example Collapse of a portal frame {#ex-portal}
A fixed-base portal frame has columns $4\ \mathrm{m}$ high, a beam of span $6\ \mathrm{m}$, and the same plastic moment $M_p = 200\ \mathrm{kN\,m}$ in all members. It carries a horizontal load $50\lambda\ \mathrm{kN}$ at the top of the left column and a vertical load $100\lambda\ \mathrm{kN}$ at mid-span. Find the collapse load factor $\lambda_c$.
::: solution
Possible hinges: the two column bases (A, E), the two beam–column joints (B, D), and mid-span (C). Three mechanisms (rotation $\theta$):
- **Beam** (hinges B, C, D; rotations $\theta$, $2\theta$, $\theta$): $100\lambda\times3\theta = 4M_p\theta$, $\lambda = 800/300 = 2.67$.
- **Sway** (hinges A, B, D, E; each $\theta$): $50\lambda\times4\theta = 4M_p\theta$, $\lambda = 800/200 = 4.00$.
- **Combined** = beam + sway, with the hinge at B cancelling (rotations A $\theta$, C $2\theta$, D $2\theta$, E $\theta$): $50\lambda\times4\theta + 100\lambda\times3\theta = 6M_p\theta$, $\lambda = 1200/500 = 2.40$.

The combined mechanism gives the lowest value, $\lambda = 2.40$ (horizontal load $120\ \mathrm{kN}$, vertical $240\ \mathrm{kN}$). Static check: with the moments at the hinges equal to $\pm M_p$ in the senses of the mechanism ($M_A = -200$, $M_C = +200$, $M_D = -200$, $M_E = +200\ \mathrm{kN\,m}$, positive for tension on the inside of the frame), the beam-mechanism equilibrium equation $-M_B + 2M_C - M_D = 100\lambda\times3 = 720$ gives $M_B = -120\ \mathrm{kN\,m}$, and the sway equation $-M_A + M_B - M_D + M_E = 50\lambda\times4 = 480$ gives the same $M_B = -120\ \mathrm{kN\,m}$. Since $\lvert M_B\rvert < M_p$, the moment field is safe and $\lambda_c = 2.40$ by the uniqueness theorem.
:::
:::

::: application Plastic design and its limits
Plastic (limit-state) design of steel frames, pioneered in Britain by John Baker's group at Cambridge and adopted in codes from the 1950s, sizes members so that the factored loads are below the collapse load. It makes better use of indeterminate structures than elastic design, because moment redistribution lets every critical section reach $M_p$. It requires that the hinges can actually rotate: the sections must be compact enough not to buckle locally before reaching $M_p$ (the section classes of Eurocode 3), the members must be restrained against lateral–torsional buckling, and the material must be ductile. For repeated or cyclic loads, collapse is not the only concern: if each cycle produces more plastic strain, the structure may **ratchet** (accumulate deformation) or fail by low-cycle fatigue. Melan's **shakedown** theorem gives the condition under which, after some initial yielding, residual stresses develop that keep all later cycles elastic: a structure shakes down if any time-independent self-equilibrated residual stress field exists which, added to the elastic stresses of every load in the cycle, nowhere violates yield. Pressure-vessel codes use shakedown limits — commonly expressed as a limit of $2\sigma_Y$ on the elastic range of primary-plus-secondary stress — for exactly this reason.
:::

## Fully plastic thick cylinder

The same thinking applies to continua. A thick cylinder under internal pressure ([[solid-mechanics/thick-cylinders-discs]]) first yields at the bore at $p_Y = \tfrac{\sigma_Y}{2}(1 - a^2/b^2)$ (Tresca). As the pressure rises, a plastic zone spreads outward, and collapse occurs when it reaches the outside.

::: proposition Collapse pressure of a thick cylinder {#prop-cylinder}
For a cylinder $a \le r \le b$ of rigid– or elastic–perfectly plastic Tresca material (with $\sigma_z$ the intermediate principal stress), the internal pressure at which the whole wall is plastic is
$$
p_c = \sigma_Y\ln\frac ba .
$$
:::

::: proof
In the plastic zone, with $\sigma_\theta > \sigma_z > \sigma_r$, Tresca requires $\sigma_\theta - \sigma_r = \sigma_Y$. Radial equilibrium $d\sigma_r/dr = (\sigma_\theta - \sigma_r)/r$ then gives $d\sigma_r/dr = \sigma_Y/r$, so $\sigma_r = \sigma_Y\ln r + C$. When the plastic zone reaches $r = b$, the condition $\sigma_r(b) = 0$ gives $\sigma_r = \sigma_Y\ln(r/b)$, and $\sigma_r(a) = -p$ gives $p_c = \sigma_Y\ln(b/a)$. Unlike the first-yield pressure, it grows without bound as $b/a$ increases — logarithmically.
:::

For $b/a = 2$: $p_c = 0.693\sigma_Y$, against first yield at $0.375\sigma_Y$, a reserve factor of 1.85. Pressurising a tube partway into this range and releasing it leaves compressive residual hoop stress at the bore — **autofrettage**.

::: history
Henri Tresca's experiments on the flow of metals under high pressure, reported to the French Academy from 1864, gave the maximum-shear-stress criterion; Barré de Saint-Venant (1870) and Maurice Lévy (1871) wrote the first equations of plastic flow. The distortion-energy criterion was proposed by Maksymilian Huber in 1904 and independently by Richard von Mises in 1913. Gábor Kazinczy's tests on fixed-ended steel beams in 1914 showed that collapse required several plastic hinges, the founding observation of limit analysis. W. Lode (1926) and G. I. Taylor and H. Quinney (1931) carried out the combined-stress tests on thin tubes that distinguished between the criteria and supported the flow rule; Ludwig Prandtl (1924) and A. Reuss (1930) added the elastic strains to the flow rule. Ernst Melan proved the shakedown theorem in 1938, and D. C. Drucker, W. Prager and H. J. Greenberg gave general proofs of the bound theorems in 1952.
:::

::: quiz
A material obeys von Mises. In pure shear it yields at $\tau_Y$. What is $\tau_Y/\sigma_Y$?
- [ ] $0.5$
- [x] $1/\sqrt3 \approx 0.577$
- [ ] $1$
::: solution
In pure shear the principal stresses are $\tau, 0, -\tau$, so $\sigma_{\mathrm{vM}} = \sqrt{\tfrac12(\tau^2 + \tau^2 + 4\tau^2)} = \sqrt3\tau$. Yield at $\sqrt3\tau_Y = \sigma_Y$. Tresca would give $0.5$.
:::
:::

::: quiz
A fixed–fixed beam carries a central point load. Elastically, the end moments are $PL/8$ and the central moment $PL/8$. What is the collapse load?
- [ ] $4M_p/L$
- [ ] $6M_p/L$
- [x] $8M_p/L$
- [ ] $16M_p/L$
::: solution
Three hinges (two ends, centre) with rotations $\theta$, $2\theta$, $\theta$; work equation $P(L/2)\theta = 4M_p\theta$, $P_c = 8M_p/L$. The value $4M_p/L$ is for a simply supported beam; $16M_p/L^2$ is the fixed–fixed beam under a uniformly distributed load (in force per unit length).
:::
:::

::: summary
- Metals yield independently of hydrostatic stress and equally in tension and compression; yield criteria depend on the stress deviator.
- Tresca: $\sigma_1 - \sigma_3 = \sigma_Y$. Von Mises: $\sqrt{3J_2} = \sigma_Y$, the distortion-energy criterion. They differ most in pure shear (0.5 vs $0.577\sigma_Y$).
- Flow rule: $d\varepsilon^p_{ij} = d\lambda\,s_{ij}$ — normal to the yield surface, volume-preserving. Hardening is isotropic, kinematic (Bauschinger) or both.
- Bending: $M_p = \sigma_YZ_p$; shape factor $Z_p/Z_e$ is 1.5 for a rectangle, about 1.1–1.2 for I-sections. Unloading leaves residual stresses. Torsion of a solid shaft: $T_p = \tfrac43T_Y$.
- Limit analysis: lower bound from any safe equilibrium moment field, upper bound from any mechanism; equal when both are satisfied.
- Collapse loads (span $L$): simply supported, central $P$: $4M_p/L$; fixed–fixed, central $P$: $8M_p/L$; fixed–fixed, UDL: $16M_p/L^2$; propped cantilever, UDL: $11.66M_p/L^2$.
- Thick cylinder (Tresca): fully plastic at $p_c = \sigma_Y\ln(b/a)$; first yield at $\tfrac{\sigma_Y}{2}(1 - a^2/b^2)$.
:::

## Exercises

::: exercise Plastic moment of a bar {level=1 check="4.5"}
Find the plastic moment of a rectangular bar $20\ \mathrm{mm}$ wide and $60\ \mathrm{mm}$ deep with $\sigma_Y = 250\ \mathrm{MPa}$, bent about its major axis. (Enter $M_p$ in kN m.)
::: solution
$M_p = \sigma_Ybh^2/4 = 250\times20\times3600/4 = 4.5\times10^{6}\ \mathrm{N\,mm} = 4.5\ \mathrm{kN\,m}$.
:::
:::

::: exercise Von Mises stress {level=1 check="100"}
A point on a shaft surface has a bending stress of $50\ \mathrm{MPa}$ and a torsional shear stress of $50\ \mathrm{MPa}$. Find the von Mises equivalent stress. (Enter it in MPa.)
::: solution
$\sigma_{\mathrm{vM}} = \sqrt{\sigma^2 + 3\tau^2} = \sqrt{2500 + 7500} = 100\ \mathrm{MPa}$. (Tresca equivalent: $\sqrt{\sigma^2 + 4\tau^2} = 111.8\ \mathrm{MPa}$.)
:::
:::

::: exercise Collapse of a built-in beam {level=1 check="120"}
A beam built in at both ends has span $4\ \mathrm{m}$ and plastic moment $60\ \mathrm{kN\,m}$, and carries a single point load at mid-span. Find the collapse load. (Enter it in kN.)
::: solution
$P_c = 8M_p/L = 8\times60/4 = 120\ \mathrm{kN}$ ([[#ex-beams]]).
:::
:::

::: exercise Plastic moment of an I-section {level=2 check="461"}
A welded I-section has flanges $200\times20\ \mathrm{mm}$ and a web $360\times10\ \mathrm{mm}$ (overall depth $400\ \mathrm{mm}$), of steel with $\sigma_Y = 250\ \mathrm{MPa}$. Find $M_p$ about the major axis and the shape factor. (Enter $M_p$ in kN m.)
::: solution
The equal-area axis is the axis of symmetry. $Z_p = 2\left[200\times20\times190 + 10\times180\times90\right] = 2(760\,000 + 162\,000) = 1.844\times10^{6}\ \mathrm{mm^3}$, so $M_p = 250\times1.844\times10^{6} = 4.61\times10^{8}\ \mathrm{N\,mm} = 461\ \mathrm{kN\,m}$. Elastic: $I = (200\times400^3 - 190\times360^3)/12 = 3.279\times10^{8}\ \mathrm{mm^4}$, $Z_e = I/200 = 1.640\times10^{6}\ \mathrm{mm^3}$; shape factor $1.844/1.640 = 1.12$.
:::
:::

::: exercise Residual stress after full plasticity {level=2 check="125"}
A rectangular beam of steel with $\sigma_Y = 250\ \mathrm{MPa}$ is bent to its full plastic moment and then unloaded elastically. Find the magnitude of the residual stress at the surface. (Enter it in MPa.)
::: solution
The elastic unloading stress at the surface is $M_p/Z_e = 1.5\sigma_Y = 375\ \mathrm{MPa}$, so the residual is $\lvert\sigma_Y - 1.5\sigma_Y\rvert = 0.5\sigma_Y = 125\ \mathrm{MPa}$ (compressive on the side that was in tension). Near the neutral axis the residual is $\sigma_Y = 250\ \mathrm{MPa}$, reversing sign across it.
:::
:::

::: exercise Plastic torque of a shaft {level=2}
A solid steel shaft of radius $20\ \mathrm{mm}$ has $\tau_Y = 150\ \mathrm{MPa}$. Find $T_Y$ and $T_p$, and the torque when the elastic core has radius $10\ \mathrm{mm}$.
::: solution
$T_Y = \pi c^3\tau_Y/2 = \pi\times8000\times150/2 = 1.885\ \mathrm{kN\,m}$; $T_p = 2\pi c^3\tau_Y/3 = 2.513\ \mathrm{kN\,m}$. With an elastic core of radius $\rho = 10\ \mathrm{mm}$: $T = \int_0^\rho\tau_Y\frac r\rho\,2\pi r^2\,dr + \int_\rho^c\tau_Y\,2\pi r^2\,dr = \frac{2\pi\tau_Y}{3}\left(c^3 - \frac{\rho^3}{4}\right) = \frac43T_Y\left[1 - \frac14\left(\frac\rho c\right)^3\right] = 2.513\times(1 - 0.03125) = 2.435\ \mathrm{kN\,m}$ — already 97 % of $T_p$.
:::
:::

::: exercise Collapse of a two-span beam {level=3}
A continuous beam of uniform section ($M_p$) has two equal spans $L$, simply supported at the three supports, and carries a point load $P$ at the middle of each span. (a) Find the collapse load by the mechanism method. (b) Find the elastic moment at the central support (use [[mechanics-of-materials/beam-deflection]] or energy methods) and hence the load at first hinge formation. (c) What is the ratio of collapse load to first-hinge load?
::: solution
(a) Mechanism in one span: hinges at the central support (rotation $\theta$) and under the load (rotation $2\theta$); the end support provides no hinge. Work: $P(L\theta/2) = M_p(\theta + 2\theta)$, so $P_c = 6M_p/L$. By symmetry both spans collapse together. Static check: support moment $-M_p$, span moment $PL/4 - M_p/2 = 1.5M_p - 0.5M_p = M_p$ under the load. ✓
(b) Elastically, the central support moment of a two-span beam with central point loads is $-3PL/16$ and the moment under each load is $+5PL/32$. The larger is $3PL/16$, so the first hinge forms at the support at $P_1 = 16M_p/(3L) = 5.33M_p/L$.
(c) $P_c/P_1 = 6/5.33 = 1.125$: redistribution adds 12.5 % on top of the shape factor (which is already included in using $M_p$ for the first hinge).
:::
:::

::: exercise Elastic or plastic design for a crane girder? {level=3}
A crane runway girder carries a moving wheel load that passes thousands of times a year. A colleague proposes plastic design to save steel. Discuss whether limit analysis is the right basis, considering: the number of load cycles and shakedown, fatigue at welded details, deflection limits for the crane, lateral–torsional buckling, and the classification of the section. What checks would you insist on?
::: solution
A good answer recognises that collapse under a single application of the factored load is only one limit state. For moving, repeated loads: (1) the girder must **shake down** — after first loading, subsequent passes must be elastic, otherwise plastic strain accumulates (incremental collapse) or alternates (low-cycle fatigue); the shakedown load can be well below the collapse load for moving loads. (2) High-cycle **fatigue** at welds (stiffener ends, flange-to-web welds under wheels) is usually the governing criterion for crane girders and is checked with elastic stress ranges against detail categories in the fatigue part of the design code; plastic design does not help and may hurt by raising stress ranges. (3) **Deflection** limits for crane operation are serviceability checks made elastically. (4) Plastic hinges require compact (class 1) sections, lateral restraint, and adequate rotation capacity; runway girders often have long unrestrained lengths and are prone to lateral–torsional buckling under eccentric wheel loads. Conclusion: use elastic design for fatigue and serviceability, check ultimate capacity (which may use plastic section resistance for a class 1 section) and check shakedown if plastic resistance is relied on; follow the applicable crane-supporting-structure standards, and have the design checked by a qualified engineer.
:::
:::
