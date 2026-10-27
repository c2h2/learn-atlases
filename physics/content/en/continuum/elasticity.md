A seismometer in a quiet cellar records an earthquake as two distinct jolts. The first arrives, the ground settles, and some seconds later a second, usually larger, shaking begins. The delay grows by about eight seconds for every hundred kilometres to the source, and from three stations a seismologist can locate the epicentre within minutes. The two jolts are the two kinds of elastic wave that a solid can carry: a compression wave and a shear wave, travelling at different speeds. That there are exactly two, and what their speeds are, follows from one linear law between the stress and strain tensors of [[continuum/stress-strain]].

This chapter states that law for an isotropic solid, derives the relations between the four moduli an engineer measures — Young's modulus, Poisson's ratio, the shear modulus and the bulk modulus — and shows from energy why Poisson's ratio lies between $-1$ and $\frac12$. Substituting Hooke's law into Cauchy's equation of motion gives the Navier–Cauchy equation, whose plane-wave solutions are the P and S waves. We finish with the two classical structural problems, bending of a beam and twisting of a shaft, treated briefly as applications.

We use the notation of [[continuum/stress-strain]]: stress $\sigma_{ij}$, small strain $\varepsilon_{ij} = \frac12(\partial_iu_j + \partial_ju_i)$, summation over repeated indices, and Cauchy's equation $\rho\,\ddot u_i = \partial_j\sigma_{ij} + f_i$. All strains are small, as they are in metals and rocks below the yield point.

## Hooke's law for an isotropic solid {#hooke}

For a small enough deformation, any smooth relation between stress and strain is linear, $\sigma_{ij} = C_{ijkl}\varepsilon_{kl}$, if the unstrained state is free of stress. The **elastic tensor** $C_{ijkl}$ has $81$ components; symmetry of $\sigma$ and $\varepsilon$ and the existence of an energy cut that to $21$ for the least symmetric crystal. Most engineering materials — polycrystalline metals, glass, rock, rubber — are **isotropic** on scales large compared with their grains: there is no preferred direction, so rotating the strain simply rotates the stress. Then just two constants survive.

::: theorem Hooke's law for isotropic solids {#thm-hooke}
Suppose the stress is a linear function of the strain, $\boldsymbol\sigma = \mathcal C(\boldsymbol\varepsilon)$, and that the material is isotropic: $\mathcal C(R\boldsymbol\varepsilon R\T) = R\,\mathcal C(\boldsymbol\varepsilon)R\T$ for every orthogonal matrix $R$. Then there are constants $\lambda$ and $\mu$, the **Lamé coefficients**, such that

$$
\sigma_{ij} = \lambda\,\varepsilon_{kk}\,\delta_{ij} + 2\mu\,\varepsilon_{ij}.
$$ {#eq-hooke}
:::

::: proof
Work in the principal frame of a given strain, where $\boldsymbol\varepsilon = \diag(\varepsilon_1, \varepsilon_2, \varepsilon_3)$. Let $R = \diag(-1, 1, 1)$, the reflection in the plane $x_1 = 0$. Then $R\boldsymbol\varepsilon R\T = \boldsymbol\varepsilon$, so isotropy gives $\boldsymbol\sigma = R\boldsymbol\sigma R\T$. But $(R\boldsymbol\sigma R\T)_{12} = -\sigma_{12}$ and $(R\boldsymbol\sigma R\T)_{13} = -\sigma_{13}$, so $\sigma_{12} = \sigma_{13} = 0$. The reflection in $x_2 = 0$ gives $\sigma_{23} = 0$. Thus the principal axes of strain are principal axes of stress.

By linearity, in this frame each principal stress is a linear combination of the principal strains: $\sigma_1 = a\varepsilon_1 + b\varepsilon_2 + b'\varepsilon_3$, and similarly for $\sigma_2, \sigma_3$. The rotation by $90^\circ$ about $x_1$ swaps axes $2$ and $3$ and leaves axis $1$ alone; isotropy then forces $b = b'$. Rotations that permute all three axes show that the same $a$ and $b$ serve for every principal stress. So

$$
\sigma_k = a\,\varepsilon_k + b(\varepsilon_1 + \varepsilon_2 + \varepsilon_3 - \varepsilon_k) = (a - b)\varepsilon_k + b\,\varepsilon_{ll}.
$$

Put $2\mu = a - b$ and $\lambda = b$. Then $\boldsymbol\sigma = \lambda\,(\tr\boldsymbol\varepsilon)I + 2\mu\boldsymbol\varepsilon$ in the principal frame. Both sides of this matrix identity transform the same way under rotations, so it holds in every frame, which is [[#eq-hooke]].
:::

The law splits cleanly into a volume part and a shape part. Write $\varepsilon_{ij} = \frac13\varepsilon_{kk}\delta_{ij} + e_{ij}$ with $e_{ij}$ traceless. Then [[#eq-hooke]] becomes

$$
\sigma_{ij} = K\,\varepsilon_{kk}\,\delta_{ij} + 2\mu\,e_{ij}, \qquad K = \lambda + \tfrac23\mu .
$$ {#eq-hooke-split}

The mean pressure $p = -\frac13\sigma_{kk} = -K\varepsilon_{kk}$ responds only to the change of volume, through the **bulk modulus** $K$. The deviatoric stress responds only to the change of shape, through the **shear modulus** $\mu$, which engineers call $G$.

## The four moduli {#moduli}

Nobody measures $\lambda$ directly. The laboratory tests are a tension test, a torsion test and a compression under pressure, and each defines a modulus.

::: definition Engineering moduli {#def-moduli}
In **uniaxial tension**, $\sigma_{xx} = \sigma$ with all other stresses zero, the **Young's modulus** $E$ and **Poisson's ratio** $\nu$ are defined by $\varepsilon_{xx} = \sigma/E$ and $\varepsilon_{yy} = \varepsilon_{zz} = -\nu\,\varepsilon_{xx}$. In **simple shear**, $\sigma_{xy} = \tau$, the **shear modulus** is $G = \tau/(2\varepsilon_{xy})$. Under **hydrostatic pressure**, $\sigma_{ij} = -p\,\delta_{ij}$, the **bulk modulus** is $K = -p/(\Delta V/V)$.
:::

::: theorem Relations between the moduli {#thm-moduli}
For an isotropic solid obeying [[#eq-hooke]],

$$
G = \mu, \qquad K = \lambda + \tfrac23\mu, \qquad E = \frac{\mu(3\lambda + 2\mu)}{\lambda + \mu}, \qquad \nu = \frac{\lambda}{2(\lambda + \mu)},
$$

and conversely

$$
G = \frac{E}{2(1 + \nu)}, \qquad K = \frac{E}{3(1 - 2\nu)}, \qquad \lambda = \frac{E\nu}{(1 + \nu)(1 - 2\nu)} .
$$ {#eq-moduli}

The inverse of Hooke's law is

$$
\varepsilon_{ij} = \frac{1 + \nu}{E}\,\sigma_{ij} - \frac{\nu}{E}\,\sigma_{kk}\,\delta_{ij}.
$$ {#eq-hooke-inverse}
:::

::: proof
*Shear.* With only $\sigma_{xy} = \tau$ non-zero, [[#eq-hooke]] has $\varepsilon_{kk} = 0$ (the trace of $\boldsymbol\sigma$ is $(3\lambda + 2\mu)\varepsilon_{kk}$, and it vanishes), so $\tau = 2\mu\varepsilon_{xy}$ and $G = \mu$.

*Bulk.* Taking the trace of [[#eq-hooke]] gives $\sigma_{kk} = (3\lambda + 2\mu)\varepsilon_{kk}$. Under pressure $\sigma_{kk} = -3p$ and $\varepsilon_{kk} = \Delta V/V$, so $K = \lambda + \frac23\mu$.

*Inverse law.* From the trace, $\varepsilon_{kk} = \sigma_{kk}/(3\lambda + 2\mu)$. Substituting back,

$$
\varepsilon_{ij} = \frac{1}{2\mu}\Bigl(\sigma_{ij} - \frac{\lambda}{3\lambda + 2\mu}\sigma_{kk}\delta_{ij}\Bigr).
$$

*Tension.* With only $\sigma_{xx} = \sigma$: $\varepsilon_{xx} = \frac{\sigma}{2\mu}\bigl(1 - \frac{\lambda}{3\lambda + 2\mu}\bigr) = \frac{\sigma(\lambda + \mu)}{\mu(3\lambda + 2\mu)}$, which gives $E$; and $\varepsilon_{yy} = -\frac{\lambda\sigma}{2\mu(3\lambda + 2\mu)}$, so $\nu = -\varepsilon_{yy}/\varepsilon_{xx} = \frac{\lambda}{2(\lambda + \mu)}$.

*Converse.* From the formulae for $E$ and $\nu$, $1 + \nu = \frac{3\lambda + 2\mu}{2(\lambda + \mu)}$, so $\frac{E}{2(1 + \nu)} = \mu$. Also $1 - 2\nu = \frac{\mu}{\lambda + \mu}$, so $\frac{E}{3(1 - 2\nu)} = \frac{3\lambda + 2\mu}{3} = K$, and $\lambda = K - \frac23 G$ simplifies to the stated form. Finally $\frac{1}{2\mu} = \frac{1 + \nu}{E}$ and $\frac{\lambda}{2\mu(3\lambda + 2\mu)} = \frac{\nu}{E}$, which turns the inverse law into [[#eq-hooke-inverse]].
:::

So two numbers determine all the others. Typical values at room temperature, from standard handbook tables (Kaye and Laby; ASM), are below; density is included for later.

| material | $E$ (GPa) | $\nu$ | $G$ (GPa) | $K$ (GPa) | $\rho$ (kg/m³) |
|---|---|---|---|---|---|
| structural steel | $210$ | $0.29$ | $81$ | $167$ | $7850$ |
| aluminium | $70$ | $0.34$ | $26$ | $73$ | $2700$ |
| soft rubber | $0.002$ | $0.4998$ | $0.0007$ | $\approx 2$ | $1100$ |

The rubber line deserves a second look. Rubber is a thousand times easier to stretch than to compress: its long-chain molecules uncoil readily, which changes shape, but packing them closer means pushing atoms together, which is as hard as in a liquid. With $K \gg G$, [[#eq-moduli]] gives $\nu \to \frac12$ and $E \to 3G$. A material with $\nu = \frac12$ is **incompressible**: by [[#eq-hooke-inverse]], $\varepsilon_{kk} = \frac{1 - 2\nu}{E}\sigma_{kk} = 0$ for every stress.

::: intuition Why moduli are tens of gigapascals
A modulus is a stress, that is an energy per unit volume. In a solid held together by bonds of energy $U_0$ between atoms a distance $a$ apart, the only energy density available is of order $U_0/a^3$. With $U_0 \approx 1\,\mathrm{eV}$ and $a \approx 0.25\,\mathrm{nm}$ this is $1.6\times10^{-19}/(2.5\times10^{-10})^3 \approx 10\,\mathrm{GPa}$, and a few electronvolts of cohesive energy per atom push it towards $100\,\mathrm{GPa}$: the right range for metals and ceramics. Rubber falls outside the estimate because its shear stiffness is not energetic at all. It is entropic, of order $nk_BT$ with $n$ the density of cross-links, which is why rubber, unlike steel, gets *stiffer* when warmed. The same estimate says that a perfect crystal should yield at a shear stress of order $G/10$. Real metals yield at around $G/1000$, because dislocations let planes of atoms slip one row at a time; the elastic theory of this chapter stops where they start to move.
:::

::: example A loaded aluminium wire {#ex-wire}
An aluminium wire of length $2.00\,\mathrm m$ and diameter $1.00\,\mathrm{mm}$ hangs vertically and carries a load of $50.0\,\mathrm N$. Using $E = 70\,\mathrm{GPa}$ and $\nu = 0.34$, find the stress, the extension and the decrease of diameter. Neglect the weight of the wire.
::: solution
The cross-section is $A = \frac{\pi}{4}(1.00\times10^{-3})^2 = 7.854\times10^{-7}\,\mathrm{m^2}$, so the stress is

$$
\sigma = \frac{50.0}{7.854\times10^{-7}} = 6.37\times10^{7}\,\mathrm{Pa} = 63.7\,\mathrm{MPa},
$$

below the yield stress of common aluminium alloys. The axial strain is $\varepsilon_{xx} = \sigma/E = 6.366\times10^{7}/7.0\times10^{10} = 9.09\times10^{-4}$, and the extension is

$$
\Delta L = \varepsilon_{xx}L = 9.09\times10^{-4}\times2.00\,\mathrm m = 1.82\,\mathrm{mm}.
$$

The lateral strain is $-\nu\varepsilon_{xx} = -3.09\times10^{-4}$, so the diameter shrinks by $3.09\times10^{-4}\times1.00\,\mathrm{mm} = 0.31\,\mu\mathrm m$. The volume changes by $\varepsilon_{kk} = (1 - 2\nu)\varepsilon_{xx} = 0.32\times9.09\times10^{-4} = 2.9\times10^{-4}$: stretching a metal wire increases its volume slightly, because $\nu < \frac12$.
:::
:::

::: warning Young's modulus is not the stiffness of every test
$E$ is the ratio of stress to strain *only* when the sides are free to contract. If the lateral strains are prevented — a thin layer of rubber bonded between steel plates, rock deep in the crust, a solid ahead of a compression wave — the axial stress for a given axial strain is set by $\lambda + 2\mu$, the **P-wave** (or constrained) modulus. For steel $\lambda + 2\mu = 275\,\mathrm{GPa}$, $31\,\%$ more than $E$. For rubber it is about $2\,\mathrm{GPa}$, a thousand times $E$: that is why rubber bearings under bridges are soft in shear yet barely compress under the weight of the deck.
:::

::: theorem Bounds on Poisson's ratio {#thm-bounds}
The strain energy density of an isotropic solid is

$$
W = \tfrac12\sigma_{ij}\varepsilon_{ij} = \mu\,e_{ij}e_{ij} + \tfrac12K(\varepsilon_{kk})^2 .
$$ {#eq-energy}

The unstrained state is stable — $W > 0$ for every non-zero strain — if and only if $\mu > 0$ and $K > 0$. Equivalently $E > 0$ and $-1 < \nu < \frac12$.
:::

::: proof
The work done on a unit volume as the strain is raised slowly from $0$ to $\varepsilon_{ij}$ is $\int\sigma_{ij}\,\dd\varepsilon_{ij}$. Since $\sigma_{ij}$ is linear in $\varepsilon$ with a coefficient tensor symmetric under exchange of the pairs $(ij)$ and $(kl)$ — as [[#eq-hooke]] is — the integral is $\frac12\sigma_{ij}\varepsilon_{ij}$. Using [[#eq-hooke-split]] and $e_{ii} = 0$,

$$
\sigma_{ij}\varepsilon_{ij} = \bigl(K\varepsilon_{kk}\delta_{ij} + 2\mu e_{ij}\bigr)\bigl(\tfrac13\varepsilon_{ll}\delta_{ij} + e_{ij}\bigr) = K(\varepsilon_{kk})^2 + 2\mu e_{ij}e_{ij},
$$

which is $2W$. The deviatoric part and the trace can be chosen independently. A pure dilation ($e = 0$, $\varepsilon_{kk} \neq 0$) has $W > 0$ iff $K > 0$; a pure shape change ($\varepsilon_{kk} = 0$, $e \neq 0$, with $e_{ij}e_{ij} > 0$) has $W > 0$ iff $\mu > 0$. Conversely, if both are positive then both terms are non-negative and they cannot both vanish for a non-zero strain.

From [[#eq-moduli]], $3K(1 - 2\nu) = E = 2G(1 + \nu)$, so $\nu = \frac{3K - 2G}{2(3K + G)}$. As $K/G$ runs over $(0, \infty)$ this runs from $-1$ (when $K/G \to 0$) to $\frac12$ (when $K/G \to\infty$), and it is a strictly increasing function of $K/G$. Then $E = 2G(1 + \nu) > 0$. Conversely, $E > 0$ and $-1 < \nu < \frac12$ give $G = E/2(1 + \nu) > 0$ and $K = E/3(1 - 2\nu) > 0$.
:::

Nearly all natural materials have $0.2 < \nu < 0.5$. Negative values, called **auxetic**, occur in some foams with re-entrant cells and in a few crystals: stretched, they get fatter.

::: quiz
Cork has a Poisson's ratio close to zero. What does that mean for a cork pushed into the neck of a bottle?
- [ ] It cannot be compressed at all.
- [x] Compressing it along its axis hardly widens it, so it does not jam in the neck as it is pushed.
- [ ] Its Young's modulus must be zero.
- [ ] Its bulk modulus is infinite.
::: solution
$\nu = 0$ means the lateral strain is zero in uniaxial loading. A rubber stopper, with $\nu \approx \frac12$, bulges sideways when pushed and binds against the glass; cork does not. From [[#eq-moduli]] with $\nu = 0$, $K = E/3$ and $G = E/2$, both finite. Cork owes this to its closed cells, whose walls buckle instead of pushing outward.
:::
:::

## The Navier–Cauchy equation {#navier}

Substituting Hooke's law into Cauchy's equation of motion gives a closed equation for the displacement. With uniform $\lambda$ and $\mu$,

$$
\partial_j\sigma_{ij} = \lambda\,\partial_i(\partial_ku_k) + \mu\,\partial_j(\partial_iu_j + \partial_ju_i) = (\lambda + \mu)\,\partial_i(\nabla\cdot\mathbf u) + \mu\,\nabla^2u_i .
$$

::: theorem Navier–Cauchy equation {#thm-navier}
For a homogeneous isotropic elastic solid with small displacements,

$$
\rho\,\pdv{^2\mathbf u}{t^2} = (\lambda + \mu)\,\nabla(\nabla\cdot\mathbf u) + \mu\,\nabla^2\mathbf u + \mathbf f .
$$ {#eq-navier}
:::

The vector identity $\nabla^2\mathbf u = \nabla(\nabla\cdot\mathbf u) - \nabla\times(\nabla\times\mathbf u)$ gives the alternative form $\rho\ddot{\mathbf u} = (\lambda + 2\mu)\nabla(\nabla\cdot\mathbf u) - \mu\nabla\times(\nabla\times\mathbf u) + \mathbf f$, which already hints at the two wave speeds. Boundary conditions prescribe $\mathbf u$ on clamped surfaces and the traction $\sigma_{ij}n_j$ on loaded or free ones; with them, [[#eq-navier]] has a unique solution in statics (Kirchhoff's uniqueness theorem, which follows from $W > 0$).

### A static solution: the pressurised cavity

Before the waves, one static problem shows how [[#eq-navier]] is used. A spherical cavity of radius $a$ in a large block of solid is filled with gas at pressure $p$; far away the solid is unstressed. Find the displacement and the stresses.

By symmetry the displacement is radial, $\mathbf u = u(r)\,\hat{\mathbf r}$. Such a field is a gradient, so $\nabla\times\mathbf u = 0$, and the curl–curl form of [[#eq-navier]] with $\ddot{\mathbf u} = 0$ and $\mathbf f = 0$ reduces to $(\lambda + 2\mu)\nabla(\nabla\cdot\mathbf u) = 0$. So the dilatation is a constant,

$$
\nabla\cdot\mathbf u = \frac{1}{r^2}\deriv{}{r}\bigl(r^2u\bigr) = 3A, \qquad u(r) = Ar + \frac{B}{r^2}.
$$

The displacement must vanish at infinity, so $A = 0$. For a radial field the strains in spherical coordinates are $\varepsilon_{rr} = u'$ and $\varepsilon_{\theta\theta} = \varepsilon_{\phi\phi} = u/r$; with $u = B/r^2$ these are $-2B/r^3$ and $B/r^3$, whose sum vanishes. Hooke's law [[#eq-hooke]] then gives

$$
\sigma_{rr} = 2\mu\varepsilon_{rr} = -\frac{4\mu B}{r^3}, \qquad \sigma_{\theta\theta} = \sigma_{\phi\phi} = \frac{2\mu B}{r^3}.
$$

The boundary condition at the cavity wall is that the traction on the solid equals the gas pressure pushing on it: $\sigma_{rr}(a) = -p$. So $B = pa^3/4\mu$, and

$$
u(r) = \frac{pa^3}{4\mu r^2}, \qquad \sigma_{rr} = -p\frac{a^3}{r^3}, \qquad \sigma_{\theta\theta} = \frac{p}{2}\frac{a^3}{r^3}.
$$ {#eq-cavity}

Three features are worth noticing. Only the shear modulus appears: the solid around the cavity changes shape but not volume, because a field $B\hat{\mathbf r}/r^2$ has zero divergence. The hoop stress $\sigma_{\theta\theta}$ is *tensile* — a pressurised hole stretches the material around it — and at the wall it is half the pressure. And the stresses die off as $r^{-3}$, so a cavity a few radii away from another hardly feels it. For a $1.00\,\mathrm{cm}$ cavity in steel at $p = 100\,\mathrm{MPa}$, the wall moves out by $pa/4\mu = 10^{8}\times0.0100/(4\times8.14\times10^{10}) = 3.1\,\mu\mathrm m$. Volcanologists use the same solution, corrected for the free surface of the ground (the Mogi model of 1958), to infer the pressure change in a magma chamber from the uplift measured above it.

### Elastic waves

::: theorem P and S waves {#thm-waves}
In an unbounded homogeneous isotropic solid without body force, a plane wave $\mathbf u = \mathbf a\,F(\mathbf n\cdot\mathbf x - ct)$, with unit propagation direction $\mathbf n$, polarisation $\mathbf a \neq 0$ and twice-differentiable $F$ not linear, solves [[#eq-navier]] if and only if either

1. $\mathbf a \parallel \mathbf n$ (longitudinal) and $c = c_P = \sqrt{(\lambda + 2\mu)/\rho}$, or
2. $\mathbf a \perp \mathbf n$ (transverse) and $c = c_S = \sqrt{\mu/\rho}$.

Moreover the dilatation $\theta = \nabla\cdot\mathbf u$ of any solution obeys the wave equation with speed $c_P$, and the rotation $\nabla\times\mathbf u$ obeys it with speed $c_S$.
:::

::: proof
For the plane wave, $\partial_j u_i = a_in_jF'$, so $\nabla\cdot\mathbf u = (\mathbf a\cdot\mathbf n)F'$, $\nabla(\nabla\cdot\mathbf u) = (\mathbf a\cdot\mathbf n)\mathbf n F''$, $\nabla^2\mathbf u = \mathbf aF''$ and $\ddot{\mathbf u} = c^2\mathbf aF''$. Equation [[#eq-navier]] becomes

$$
\bigl[(\rho c^2 - \mu)\,\mathbf a - (\lambda + \mu)(\mathbf a\cdot\mathbf n)\,\mathbf n\bigr]F'' = 0 .
$$

Since $F''$ is not identically zero, the bracket vanishes. Dot it with $\mathbf n$: $(\rho c^2 - \lambda - 2\mu)(\mathbf a\cdot\mathbf n) = 0$. If $\mathbf a\cdot\mathbf n \neq 0$, then $\rho c^2 = \lambda + 2\mu$, and the bracket becomes $(\lambda + \mu)[\mathbf a - (\mathbf a\cdot\mathbf n)\mathbf n] = 0$; for $\lambda + \mu \neq 0$ (true whenever $\nu > -1$, since $\lambda + \mu = \mu/(1 - 2\nu)$) this means $\mathbf a \parallel \mathbf n$. If $\mathbf a\cdot\mathbf n = 0$, the bracket is $(\rho c^2 - \mu)\mathbf a = 0$, so $\rho c^2 = \mu$. Conversely, each case makes the bracket vanish.

For the general statement, take the divergence of [[#eq-navier]] with $\mathbf f = 0$. Since $\nabla\cdot\nabla^2\mathbf u = \nabla^2(\nabla\cdot\mathbf u)$,

$$
\rho\ddot\theta = (\lambda + \mu)\nabla^2\theta + \mu\nabla^2\theta = (\lambda + 2\mu)\nabla^2\theta .
$$

Taking the curl kills the gradient term and gives $\rho\,\partial_t^2(\nabla\times\mathbf u) = \mu\nabla^2(\nabla\times\mathbf u)$.
:::

A P wave (primary) compresses and rarefies the material, like sound in air, and moves the ground back and forth along the ray. An S wave (secondary) shears it, moving the ground across the ray, and has no counterpart in a fluid: with $\mu = 0$ there is no restoring force against shear, $c_S = 0$, and the P speed reduces to the sound speed $\sqrt{K/\rho}$ of [[continuum/waves-in-fluids]]. In terms of Poisson's ratio,

$$
\frac{c_P}{c_S} = \sqrt{\frac{\lambda + 2\mu}{\mu}} = \sqrt{\frac{2(1 - \nu)}{1 - 2\nu}} ,
$$ {#eq-ratio}

which exceeds $\sqrt2$ for every $\nu$ between $0$ and $\frac12$, and diverges as $\nu \to \frac12$.

::: widget plot
f: sqrt(2*(1-x)/(1-2*x)); 2*(1+x)
x: -0.95, 0.49
y: 0, 8
labels: c_P/c_S; E/G
caption: The speed ratio $c_P/c_S$ of [[#eq-ratio]] and the modulus ratio $E/G = 2(1 + \nu)$ as Poisson's ratio $\nu$ runs over its allowed range. Read off $\nu = 0.25$, a good average for crustal rock: $c_P/c_S = \sqrt3 = 1.73$. Steel ($\nu = 0.29$) gives $1.84$. Move towards $\nu = 0.5$ and watch the ratio shoot up: in rubber or water-saturated mud the shear wave is far slower than the compression wave. At the auxetic end the ratio falls towards $\sqrt{4/3} = 1.15$ as $\nu \to -1$, but never below it: a P wave always outruns an S wave.
:::

::: example Elastic waves in steel {#ex-steel-waves}
Compute $c_P$ and $c_S$ for structural steel ($E = 210\,\mathrm{GPa}$, $\nu = 0.29$, $\rho = 7850\,\mathrm{kg/m^3}$) and compare with the measured ultrasonic speeds of about $5.9\,\mathrm{km/s}$ and $3.2\,\mathrm{km/s}$.
::: solution
By [[#eq-moduli]],

$$
\mu = \frac{210}{2\times1.29} = 81.4\,\mathrm{GPa}, \qquad \lambda = \frac{210\times0.29}{1.29\times0.42} = 112.4\,\mathrm{GPa},
$$

so $\lambda + 2\mu = 275.2\,\mathrm{GPa}$. Then

$$
c_P = \sqrt{\frac{2.752\times10^{11}}{7850}} = 5.92\,\mathrm{km/s}, \qquad c_S = \sqrt{\frac{8.14\times10^{10}}{7850}} = 3.22\,\mathrm{km/s},
$$

within about one per cent of the measured values, which is as well as $E$ and $\nu$ for "steel" are known. Ultrasonic flaw detectors run this calculation backwards: they time a pulse across a part of known thickness and use the echo from a crack. The speed of a compression pulse along a *thin* rod is different again, $\sqrt{E/\rho} = 5.17\,\mathrm{km/s}$, because a thin rod's sides are free to bulge ([[#exr-rod]] makes the comparison for aluminium).
:::
:::

::: example Elastic moduli of granite from wave speeds {#ex-granite}
Laboratory measurements on a granite sample of density $2650\,\mathrm{kg/m^3}$ give $c_P = 5.80\,\mathrm{km/s}$ and $c_S = 3.30\,\mathrm{km/s}$. Find its shear modulus, Poisson's ratio, Young's modulus and bulk modulus.
::: solution
The two speeds give the two Lamé combinations directly, by [[#thm-waves]]:

$$
\mu = \rho c_S^2 = 2650\times(3300)^2 = 28.9\,\mathrm{GPa}, \qquad \lambda + 2\mu = \rho c_P^2 = 2650\times(5800)^2 = 89.1\,\mathrm{GPa},
$$

so $\lambda = 89.1 - 57.7 = 31.4\,\mathrm{GPa}$. Poisson's ratio follows either from [[#thm-moduli]] or by inverting [[#eq-ratio]]: with $r = (c_P/c_S)^2 = 3.089$,

$$
\nu = \frac{r - 2}{2(r - 1)} = \frac{1.089}{4.178} = 0.261 .
$$

Then $E = 2\mu(1 + \nu) = 2\times28.9\times1.261 = 72.8\,\mathrm{GPa}$ and $K = \lambda + \frac23\mu = 31.4 + 19.2 = 50.7\,\mathrm{GPa}$. Granite is about as stiff in tension as aluminium, and a third as stiff as steel. Moduli obtained this way are called **dynamic** moduli. They usually exceed the **static** moduli from a slow loading test on the same rock, because a slow test also closes microcracks that a small, fast wave barely disturbs; the difference is itself used to estimate the crack density.
:::
:::

::: quiz
A large earthquake on the far side of the Earth is recorded at a station $150^\circ$ of arc away. The direct S wave would have had to cross the outer core. What does the station see?
- [ ] A direct S wave, delayed because the core is dense.
- [x] No direct S wave through the core; core-crossing arrivals are compressional, since a liquid has $\mu = 0$.
- [ ] Only S waves, because P waves are absorbed by liquids.
- [ ] Nothing at all, since no elastic wave crosses a liquid.
::: solution
By [[#thm-waves]] a medium with zero shear modulus supports only the longitudinal wave, with $c = \sqrt{K/\rho}$. P waves cross the liquid outer core (more slowly than in the mantle above it, which bends them and creates the P shadow zone), but S waves cannot. Some energy arriving at the core boundary as an S wave is converted to a P wave, crosses the core, and may convert back to S in the solid inner core or mantle, but a direct shear wave through the outer core does not exist.
:::
:::

::: remark Surface waves and crystals
A free surface supports a third kind of wave, discovered by Lord Rayleigh in 1885, confined to a depth of about a wavelength and travelling slightly slower than $c_S$ — at $0.919\,c_S$ when $\nu = \frac14$. Rayleigh waves arrive after the S wave, decay with distance more slowly than body waves because they spread over a surface rather than a volume, and do most of the damage in an earthquake. In an anisotropic crystal, by contrast, there are three plane waves for each direction, with speeds that depend on the direction; a cubic crystal already needs three elastic constants rather than two, and its speeds are the long-wavelength slopes of the acoustic phonon branches.
:::

### Seismology

The Earth is the largest elastic body we can experiment on. In the upper continental crust typical speeds are $c_P \approx 6.0\,\mathrm{km/s}$ and $c_S \approx 3.5\,\mathrm{km/s}$, a ratio of $1.71$, close to the $\sqrt3$ of a solid with $\nu = \frac14$. Speeds rise with depth as the rock is compressed, reaching about $13.7\,\mathrm{km/s}$ for P and $7.3\,\mathrm{km/s}$ for S at the base of the mantle.

::: example Locating an earthquake {#ex-quake}
A seismometer records the S wave from a local earthquake $20.0\,\mathrm s$ after the P wave. Taking $c_P = 6.00\,\mathrm{km/s}$ and $c_S = 3.50\,\mathrm{km/s}$ along the path, how far away is the source?
::: solution
If the distance is $d$, the arrival times are $d/c_P$ and $d/c_S$, so

$$
\Delta t = d\left(\frac{1}{c_S} - \frac{1}{c_P}\right), \qquad d = \frac{c_Pc_S}{c_P - c_S}\,\Delta t = \frac{6.00\times3.50}{2.50}\,\Delta t = (8.40\,\mathrm{km/s})\,\Delta t .
$$

With $\Delta t = 20.0\,\mathrm s$, $d = 168\,\mathrm{km}$. This is the rule of thumb "eight kilometres per second of S–P delay" used at observatories. One station gives a circle of possible epicentres; three give a point. For distant earthquakes the rays curve through faster deep rock and one uses tabulated travel-time curves instead.
:::
:::

::: widget plot
f: x/a; x/b
x: 0, 600
y: 0, 200
sliders: a=6:4:9:0.1; b=3.5:2:5:0.1
labels: P arrival (s); S arrival (s)
caption: Arrival times in seconds of the P wave (speed $a$ km/s) and the S wave (speed $b$ km/s) against distance in kilometres. The vertical gap between the lines is the S–P delay, and it grows in proportion to distance. At the opening values, read the gap at $168\,\mathrm{km}$: it is $20\,\mathrm s$, as in [[#ex-quake]]. Slow the S wave down (as in wet sediment, where $\nu$ is near $\frac12$) and the same delay now means a much nearer source — which is why local velocity models matter for earthquake location.
:::

::: application The liquid core
S waves from a large earthquake are not received at stations more than about $103^\circ$ of arc from the epicentre, and P waves are weak or absent between about $103^\circ$ and $142^\circ$. Richard Oldham interpreted the anomaly in 1906 as a core; Beno Gutenberg located its boundary at a depth near $2900\,\mathrm{km}$ in 1913; Harold Jeffreys argued in 1926 that it is liquid, because [[#thm-waves]] says a medium with $\mu = 0$ carries no S waves. Inge Lehmann found in 1936 that P waves arriving in the shadow zone had been reflected from a solid inner core. Seismic tomography today maps three-dimensional speed variations of a few per cent in the mantle, the signature of temperature differences that drive plate tectonics.
:::

## Bending and torsion, briefly {#beams}

Two deformations dominate structural engineering, and both follow from Hooke's law plus a geometric assumption.

**Bending.** A slender beam along $x$ bends in the $xz$-plane with a small deflection $w(x)$. The Euler–Bernoulli assumption is that cross-sections stay plane and perpendicular to the bent axis. Then a fibre at height $z$ above the **neutral axis** has strain $\varepsilon_{xx} = -z\,w''(x)$, and since the sides are free, $\sigma_{xx} = E\varepsilon_{xx} = -Ezw''$. The net force on the section vanishes when $z$ is measured from the centroid, and the bending moment is

$$
M = -\int_A z\,\sigma_{xx}\,\dd A = EI\,w''(x), \qquad I = \int_A z^2\,\dd A .
$$ {#eq-beam}

The **second moment of area** $I$ is $bh^3/12$ for a rectangle of width $b$ and depth $h$. The cubic dependence on depth is why joists are set on edge and why an I-beam puts its material far from the neutral axis. For a cantilever clamped at $x = 0$ with a force $F$ at the free end $x = L$, the moment is $M(x) = F(L - x)$ in magnitude, and integrating $EIw'' = F(L - x)$ twice with $w(0) = w'(0) = 0$ gives

$$
w(x) = \frac{F x^2(3L - x)}{6EI}, \qquad w(L) = \frac{FL^3}{3EI}.
$$ {#eq-cantilever}

**Torsion.** A circular shaft of radius $R$ and length $L$ twisted by a torque $T$ through an angle $\phi$: each cross-section rotates rigidly, so the material at radius $r$ is sheared by $\gamma = r\phi/L$ (engineering strain, $2\varepsilon_{x\theta}$). The shear stress is $\tau = G\gamma$ and the torque is

$$
T = \int_A r\tau\,\dd A = \frac{GJ\phi}{L}, \qquad J = \int_A r^2\,\dd A = \frac{\pi R^4}{2}.
$$ {#eq-torsion}

The largest shear stress, at the surface, is $\tau_{\max} = TR/J$. Coulomb used this law in 1784 in his torsion balance, and Cavendish's measurement of $G$ relied on the same small torsional stiffness.

::: example A steel ruler as a cantilever {#ex-ruler}
A steel ruler $25.0\,\mathrm{mm}$ wide and $1.00\,\mathrm{mm}$ thick is clamped to a bench with $L = 300\,\mathrm{mm}$ overhanging. A force of $0.500\,\mathrm N$ is applied at the tip. Find the tip deflection and the largest bending stress ($E = 210\,\mathrm{GPa}$).
::: solution
The second moment of area is

$$
I = \frac{bh^3}{12} = \frac{0.0250\times(1.00\times10^{-3})^3}{12} = 2.083\times10^{-12}\,\mathrm{m^4}.
$$

By [[#eq-cantilever]],

$$
w(L) = \frac{0.500\times(0.300)^3}{3\times2.10\times10^{11}\times2.083\times10^{-12}} = \frac{0.0135}{1.3125} = 1.03\times10^{-2}\,\mathrm m = 10.3\,\mathrm{mm}.
$$

The largest moment is at the clamp, $M = FL = 0.150\,\mathrm{N\,m}$, and the largest stress is at the surfaces, $z = \pm h/2$:

$$
\sigma_{\max} = \frac{M h/2}{I} = \frac{0.150\times5.00\times10^{-4}}{2.083\times10^{-12}} = 36.0\,\mathrm{MPa}.
$$

The deflection is $3\,\%$ of the length, so the small-slope theory is adequate, and the stress is far below yield. Notice that the ruler laid flat, as here, is only $h^2/b^2 = 1/625$ times as stiff as the same ruler stood on edge — try it.
:::
:::

Real beams, shafts, plates and pressure vessels, with their failure criteria, are the subject of the Mechanical Engineering Atlas lessons [Beam deflection](/learn/mechanical/lesson.php?c=mechanics-of-materials&l=beam-deflection), [Torsion](/learn/mechanical/lesson.php?c=mechanics-of-materials&l=torsion) and [Linear elasticity](/learn/mechanical/lesson.php?c=solid-mechanics&l=linear-elasticity), which develop them from the designer's side.

::: history From Hooke to Navier
Robert Hooke published his law in 1678, in *De Potentia Restitutiva*, as the solution of an anagram he had posted two years earlier: *ut tensio, sic vis* — as the extension, so the force. It referred to springs and wires, not to a material constant. Thomas Young introduced the modulus that bears his name in his 1807 *Lectures on Natural Philosophy*, though in a form that depended on the specimen. The general equations of an elastic solid were derived by Claude-Louis Navier in a memoir read in 1821 and published in 1827, from a molecular model that produced only one elastic constant. Cauchy's continuum treatment of 1822–28 gave two constants for an isotropic body, and George Green in 1839 derived the elastic tensor from an energy function, settling the number of constants in favour of Cauchy. Poisson showed in 1829 that an elastic solid carries two kinds of wave with different speeds — almost eighty years before Oldham identified them in seismograms.
:::

## Where this leads {#leads}

Everything here is linear in the strain; plasticity, fracture and the large strains of rubber are beyond it, and are treated in the Mechanical Engineering Atlas. The P and S waves of a continuum are the long-wavelength limit of the acoustic phonons of a crystal lattice, whose discreteness and anisotropy appear in [[condensed-matter]]. The variational form of elasticity, with the energy [[#eq-energy]] as a Lagrangian density, connects to [[analytical-mechanics]], and solving [[#eq-navier]] numerically on a grid is one of the problems in [[computation]]. In the next chapters the same Cauchy equation is applied to fluids, for which $\mu = 0$ at rest and the stress depends on the rate of strain: [[continuum/fluid-kinematics]].

::: summary
- An isotropic linear elastic solid obeys $\sigma_{ij} = \lambda\varepsilon_{kk}\delta_{ij} + 2\mu\varepsilon_{ij}$; equivalently $\boldsymbol\sigma = K(\tr\boldsymbol\varepsilon)I + 2G\,\mathbf e$ separates volume and shape changes.
- Any two of $E, \nu, G, K$ determine the rest: $G = E/2(1 + \nu)$, $K = E/3(1 - 2\nu)$.
- Positive strain energy requires $G > 0$ and $K > 0$, hence $-1 < \nu < \frac12$; $\nu \to \frac12$ is incompressibility, where $E \to 3G$.
- The Navier–Cauchy equation $\rho\ddot{\mathbf u} = (\lambda + \mu)\nabla(\nabla\cdot\mathbf u) + \mu\nabla^2\mathbf u + \mathbf f$ governs small elastic motion.
- Its plane waves are longitudinal at $c_P = \sqrt{(\lambda + 2\mu)/\rho}$ and transverse at $c_S = \sqrt{\mu/\rho}$; in steel $5.9$ and $3.2\,\mathrm{km/s}$, in the crust about $6.0$ and $3.5\,\mathrm{km/s}$.
- Fluids carry no S waves; their absence through the outer core shows it is liquid.
- Beams bend with $M = EIw''$ and shafts twist with $T = GJ\phi/L$.
:::

## Exercises

::: exercise Stretching a steel wire {level=1 check="1"}
A steel wire ($E = 210\,\mathrm{GPa}$) of length $3.00\,\mathrm m$ and cross-section $0.500\,\mathrm{mm^2}$ carries a load of $35.0\,\mathrm N$. Find its extension in millimetres.
::: solution
The stress is $\sigma = 35.0/(0.500\times10^{-6}) = 7.00\times10^{7}\,\mathrm{Pa}$, the strain is $\sigma/E = 7.00\times10^7/2.10\times10^{11} = 3.33\times10^{-4}$, and the extension is

$$
\Delta L = 3.33\times10^{-4}\times3.00\,\mathrm m = 1.00\times10^{-3}\,\mathrm m = 1.00\,\mathrm{mm}.
$$
:::
:::

::: exercise Shear modulus of aluminium {level=1 check="70/2.68"}
Using $E = 70\,\mathrm{GPa}$ and $\nu = 0.34$, find the shear modulus of aluminium in GPa.
::: solution
By [[#eq-moduli]], $G = E/2(1 + \nu) = 70/2.68 = 26.1\,\mathrm{GPa}$. A torsion test on an aluminium rod measures this number directly, and comparing it with $E$ from a tension test is the standard way to determine $\nu$.
:::
:::

::: exercise Steel at the bottom of the ocean {level=1 check="-6e-4"}
A steel block ($E = 210\,\mathrm{GPa}$, $\nu = 0.29$) is lowered into an ocean trench where the pressure is $100\,\mathrm{MPa}$. Find its fractional volume change $\Delta V/V$.
::: solution
The bulk modulus is $K = E/3(1 - 2\nu) = 210/(3\times0.42) = 166.7\,\mathrm{GPa}$. Then

$$
\frac{\Delta V}{V} = -\frac{p}{K} = -\frac{1.00\times10^{8}}{1.667\times10^{11}} = -6.0\times10^{-4}.
$$

Each linear dimension shrinks by a third of this, $2.0\times10^{-4}$. Water, with $K = 2.2\,\mathrm{GPa}$, is compressed by $4.5\,\%$ at the same pressure, so the block actually gains buoyancy relative to the surrounding water.
:::
:::

::: exercise S–P delay {level=2 check="7.3*12/(sqrt(3)-1)" #exr-sp}
A seismograph records an S–P delay of $12.0\,\mathrm s$ from an earthquake whose waves travel through rock with $c_P = 7.30\,\mathrm{km/s}$ and Poisson's ratio $\nu = 0.25$. Find the distance in kilometres.
::: solution
For $\nu = 0.25$, [[#eq-ratio]] gives $c_P/c_S = \sqrt{1.5/0.5} = \sqrt3$, so $c_S = 7.30/\sqrt3 = 4.215\,\mathrm{km/s}$. As in [[#ex-quake]],

$$
d = \frac{c_Pc_S}{c_P - c_S}\,\Delta t = \frac{c_P}{\sqrt3 - 1}\,\Delta t = \frac{7.30\times12.0}{0.7321} = 119.7\,\mathrm{km},
$$

about $120\,\mathrm{km}$. These deeper, faster rocks give about $10\,\mathrm{km}$ per second of delay rather than the $8.4$ of the upper crust.
:::
:::

::: exercise Bar speed and P speed {level=2 check="sqrt(70e9/2700)" #exr-rod}
For aluminium ($E = 70\,\mathrm{GPa}$, $\nu = 0.34$, $\rho = 2700\,\mathrm{kg/m^3}$), compute the speed in m/s of a long-wavelength compression pulse along a thin rod, $\sqrt{E/\rho}$, and compare it with $c_P$. Explain the difference.
::: solution
$\sqrt{E/\rho} = \sqrt{7.0\times10^{10}/2700} = 5092\,\mathrm{m/s}$, about $5.09\,\mathrm{km/s}$. For the bulk P wave, $\lambda + 2\mu = E(1 - \nu)/(1 + \nu)(1 - 2\nu) = 70\times0.66/(1.34\times0.32) = 107.7\,\mathrm{GPa}$, so $c_P = \sqrt{1.077\times10^{11}/2700} = 6317\,\mathrm{m/s}$. In a thin rod the wavelength is much larger than the diameter and the sides are free, so the material is in uniaxial *stress* and the stiffness is $E$. In a bulk wave the material is in uniaxial *strain* and the stiffness is $\lambda + 2\mu$. The measured values for aluminium, about $5.0$ and $6.3\,\mathrm{km/s}$, confirm the distinction.
:::
:::

::: exercise Twisting a shaft {level=2 check="4.48"}
A solid steel shaft of radius $10.0\,\mathrm{mm}$ and length $1.00\,\mathrm m$ carries a torque of $100\,\mathrm{N\,m}$. With $E = 210\,\mathrm{GPa}$ and $\nu = 0.29$, find the angle of twist in degrees and the largest shear stress.
::: solution
The shear modulus is $G = 210/2.58 = 81.4\,\mathrm{GPa}$ and $J = \pi R^4/2 = \pi(0.0100)^4/2 = 1.571\times10^{-8}\,\mathrm{m^4}$. By [[#eq-torsion]],

$$
\phi = \frac{TL}{GJ} = \frac{100\times1.00}{8.14\times10^{10}\times1.571\times10^{-8}} = 0.0782\,\mathrm{rad} = 4.48^\circ .
$$

The largest shear stress is $TR/J = 100\times0.0100/1.571\times10^{-8} = 63.7\,\mathrm{MPa}$, at the surface. The surface shear strain is $\gamma = R\phi/L = 7.8\times10^{-4}$, small, as the theory requires, even though the twist angle is visible to the eye.
:::
:::

::: exercise A clamped rail on a hot day {level=1 check="-75.6"}
A steel rail ($E = 210\,\mathrm{GPa}$, thermal expansion coefficient $\alpha = 12\times10^{-6}\,\mathrm{K^{-1}}$) is welded continuously and anchored so that it cannot change length. It was laid stress-free and is then heated by $30\,\mathrm K$. Treating it as a bar in uniaxial stress, find the axial stress in MPa (negative for compression).
::: solution
Free expansion would give strain $\alpha\Delta T = 3.6\times10^{-4}$. The anchors hold the total strain at zero, so the elastic strain must be $-\alpha\Delta T$, and with the sides free

$$
\sigma = -E\alpha\Delta T = -2.10\times10^{11}\times12\times10^{-6}\times30 = -7.56\times10^{7}\,\mathrm{Pa} = -75.6\,\mathrm{MPa}.
$$

The answer is independent of the length of the rail. A compressive stress of this size can make a track buckle sideways on a hot day, which is why continuous rail is laid pre-tensioned at a "stress-free temperature" chosen near the summer mean.
:::
:::

::: exercise A gas bubble in steel {level=2 check="0.768"}
A spherical pore of radius $5.00\,\mathrm{mm}$ deep inside a steel casting ($E = 210\,\mathrm{GPa}$, $\nu = 0.29$) contains gas at $50.0\,\mathrm{MPa}$. Using [[#eq-cavity]], find the radial displacement of the pore wall in micrometres, and the hoop stress at the wall and at a distance $10.0\,\mathrm{mm}$ from the centre.
::: solution
The shear modulus is $\mu = E/2(1 + \nu) = 81.4\,\mathrm{GPa}$. At the wall, [[#eq-cavity]] gives

$$
u(a) = \frac{pa}{4\mu} = \frac{5.00\times10^{7}\times5.00\times10^{-3}}{4\times8.14\times10^{10}} = 7.68\times10^{-7}\,\mathrm m = 0.768\,\mu\mathrm m.
$$

The hoop stress is $\sigma_{\theta\theta} = \frac{p}{2}(a/r)^3$: $25.0\,\mathrm{MPa}$ of tension at the wall, and $25.0/8 = 3.1\,\mathrm{MPa}$ at twice the radius. The largest shear stress at the wall is $\frac12(\sigma_{\theta\theta} - \sigma_{rr}) = \frac12(25 + 50) = 37.5\,\mathrm{MPa} = \frac34p$, which is the quantity to compare with the yield criterion of the metal. The result does not depend on Poisson's ratio except through $\mu$.
:::
:::

::: exercise Rubber in shear {level=2 check="2/3"}
A soft rubber has $E = 2.00\,\mathrm{MPa}$ and bulk modulus $K = 2.0\,\mathrm{GPa}$. Find its shear modulus in MPa and its Poisson's ratio to four decimal places.
::: solution
From $E = 3K(1 - 2\nu)$, $1 - 2\nu = E/3K = 2.00\times10^{6}/6.0\times10^{9} = 3.33\times10^{-4}$, so $\nu = 0.4998$. Then $G = E/2(1 + \nu) = 2.00/2.9997 = 0.667\,\mathrm{MPa}$, which is $E/3$ to four figures. For any nearly incompressible material, $E \approx 3G$, and Poisson's ratio is too close to $\frac12$ to be a useful input; one specifies $G$ and $K$ instead.
:::
:::

::: exercise Constrained compression {level=3}
A thin rubber pad of thickness $h$ is bonded between two rigid steel plates, so that its lateral strains are zero, and it is compressed by a pressure $\sigma$ on the plates. (a) Show that the vertical strain is $\varepsilon_{zz} = -\sigma/(\lambda + 2\mu)$ and find the lateral stresses. (b) Show that $(\lambda + 2\mu)/E = (1 - \nu)/(1 + \nu)(1 - 2\nu)$ and evaluate it for steel ($\nu = 0.29$) and for the rubber of the previous exercise.
::: solution
(a) With $\varepsilon_{xx} = \varepsilon_{yy} = 0$, [[#eq-hooke]] gives $\sigma_{zz} = (\lambda + 2\mu)\varepsilon_{zz}$ and $\sigma_{xx} = \sigma_{yy} = \lambda\varepsilon_{zz}$. With $\sigma_{zz} = -\sigma$, $\varepsilon_{zz} = -\sigma/(\lambda + 2\mu)$, and the plates exert lateral stresses $\sigma_{xx} = \sigma_{yy} = -\lambda\sigma/(\lambda + 2\mu) = -\frac{\nu}{1 - \nu}\sigma$ to prevent bulging.

(b) From [[#eq-moduli]], $\lambda + 2\mu = \frac{E\nu}{(1 + \nu)(1 - 2\nu)} + \frac{E}{1 + \nu} = \frac{E[\nu + 1 - 2\nu]}{(1 + \nu)(1 - 2\nu)} = \frac{E(1 - \nu)}{(1 + \nu)(1 - 2\nu)}$. For steel: $0.71/(1.29\times0.42) = 1.31$. For the rubber, $\nu = 0.49983$: $0.50017/(1.49983\times3.33\times10^{-4}) \approx 1.0\times10^{3}$. The bonded rubber pad is a thousand times stiffer in compression than a free rubber block, while still being as soft in shear — the principle of laminated elastomeric bridge bearings.
:::
:::

::: exercise Energy of a shear wave {level=3}
For the transverse plane wave $\mathbf u = a\cos(kx - \omega t)\,\mathbf e_y$ with $\omega = c_Sk$, compute the kinetic energy density $\frac12\rho\abs{\dot{\mathbf u}}^2$ and the strain energy density $W$ of [[#eq-energy]], and prove that their averages over a period are equal. Do the same for the longitudinal wave $\mathbf u = a\cos(kx - \omega t)\,\mathbf e_x$ with $\omega = c_Pk$.
::: hint
For the S wave only $\varepsilon_{xy}$ is non-zero and $\varepsilon_{kk} = 0$. For the P wave only $\varepsilon_{xx}$ is non-zero; compute $\frac12\sigma_{ij}\varepsilon_{ij}$ directly from [[#eq-hooke]].
:::
::: solution
*S wave.* $\dot u_y = a\omega\sin(kx - \omega t)$, so the kinetic energy density is $\frac12\rho a^2\omega^2\sin^2(kx - \omega t)$. The only strain is $\varepsilon_{xy} = \varepsilon_{yx} = \frac12\partial_xu_y = -\frac12ak\sin(kx - \omega t)$, with zero trace, so $e_{ij} = \varepsilon_{ij}$ and $W = \mu(\varepsilon_{xy}^2 + \varepsilon_{yx}^2) = \frac12\mu a^2k^2\sin^2(kx - \omega t)$. Since $\rho\omega^2 = \rho c_S^2k^2 = \mu k^2$, the two densities are equal at every point and instant, and so are their averages, $\frac14\mu a^2k^2$.

*P wave.* $\dot u_x = a\omega\sin(kx - \omega t)$, kinetic energy density $\frac12\rho a^2\omega^2\sin^2$. The only strain is $\varepsilon_{xx} = -ak\sin(kx - \omega t)$; by [[#eq-hooke]], $\sigma_{xx} = (\lambda + 2\mu)\varepsilon_{xx}$, and the other stresses multiply zero strains. So $W = \frac12\sigma_{xx}\varepsilon_{xx} = \frac12(\lambda + 2\mu)a^2k^2\sin^2$, and $\rho\omega^2 = (\lambda + 2\mu)k^2$ makes it equal to the kinetic density. Equipartition between kinetic and potential energy in a travelling wave is the continuum version of the result for the stretched string in [[oscillations/travelling-waves]].
:::
:::
