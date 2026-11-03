Rub a balloon on a jumper and it sticks to the wall; walk across a nylon carpet in dry weather and a spark jumps from your finger to a door handle. The charges involved are tiny, a few nanocoulombs, yet the spark can reach $10\,\mathrm{kV}$, enough to destroy the gate oxide of an unprotected MOSFET. Electrostatics, the study of charges at rest and the fields they produce, explains both effects, and much of electrical engineering depends on it: the capacitance of every capacitor and cable, the insulation design of every high-voltage installation, the operation of touch screens, inkjet printers and electrostatic precipitators, and the distribution of charge that controls a transistor.

This chapter develops the static electric field from one experimental law. Coulomb's law gives the force between two point charges; superposition extends it to any distribution of charge. Gauss's law, an equivalent form of the same physics, gives the field in a few lines whenever the geometry is symmetric, and its differential form $\nabla\cdot\mathbf D = \rho_v$ is the first of Maxwell's equations. Finally the electric potential replaces the vector field by a scalar from which the field follows by differentiation, and connects field theory to the voltage of circuit theory. The physics is treated in more depth in the [Physics Atlas electrostatics course](/learn/physics/lesson.php?c=electrostatics&l=coulomb); we use the vector tools of [[electromagnetics/vector-analysis]] throughout.

## Coulomb's law and the electric field

Charge is measured in coulombs. It comes in two signs, it is conserved, and in ordinary matter it is quantised in units of the elementary charge $e = 1.602\,176\,634\times10^{-19}\,\mathrm C$ (exact since the 2019 redefinition of the SI). One coulomb is a large charge for electrostatics: the static charge on a balloon is of order $10^{-8}\,\mathrm C$.

::: theorem Coulomb's law {#thm-coulomb}
The force exerted by a point charge $Q_1$ at position $\mathbf r_1$ on a point charge $Q_2$ at position $\mathbf r_2$, both in vacuum, is

$$
\mathbf F_2 = \frac{Q_1Q_2}{4\pi\epsilon_0R_{12}^2}\,\mathbf a_{12}, \qquad \mathbf R_{12} = \mathbf r_2 - \mathbf r_1,\quad \mathbf a_{12} = \frac{\mathbf R_{12}}{R_{12}},
$$ {#eq-coulomb}

where $\epsilon_0 = 8.854\times10^{-12}\,\mathrm{F/m}$ is the **permittivity of free space** and $1/(4\pi\epsilon_0) = 8.988\times10^9\,\mathrm{m/F}$. Like charges repel; unlike charges attract.
:::

The law is experimental: it states that the force is along the line joining the charges, proportional to each charge and inversely proportional to the square of the distance. The inverse-square dependence has been tested to extraordinary precision; laboratory tests of the kind first done by Cavendish limit any exponent $2+\delta$ to $\abs{\delta}$ below about $10^{-15}$. Since 2019 $\epsilon_0$ is a measured constant rather than a defined one, but its value is unchanged to ten significant figures.

::: example Force between two charges {#ex-force}
A charge $Q_1 = 5\,\mathrm{\mu C}$ sits at the origin and $Q_2 = -2\,\mathrm{\mu C}$ at $(3, 4, 0)\,\mathrm{cm}$. Find the force on $Q_2$.
::: solution
$\mathbf R_{12} = 0.03\,\mathbf a_x + 0.04\,\mathbf a_y\,\mathrm m$, so $R_{12} = 0.05\,\mathrm m$ and $\mathbf a_{12} = 0.6\,\mathbf a_x + 0.8\,\mathbf a_y$. Then

$$
\frac{Q_1Q_2}{4\pi\epsilon_0R_{12}^2} = \frac{(8.988\times10^9)(5\times10^{-6})(-2\times10^{-6})}{0.05^2} = -35.95\,\mathrm N,
$$

and $\mathbf F_2 = -35.95(0.6\,\mathbf a_x + 0.8\,\mathbf a_y) = -21.6\,\mathbf a_x - 28.8\,\mathbf a_y\,\mathrm N$. The negative sign means the force points from $Q_2$ back towards $Q_1$: attraction. Microcoulomb charges a few centimetres apart exert forces of tens of newtons, which is why such charges are rare outside high-voltage equipment.
:::
:::

Rather than speak of forces between pairs of charges, we say that a charge sets up a field throughout space and that other charges respond to the field where they are.

::: definition Electric field intensity {#def-efield}
The **electric field intensity** $\mathbf E$ at a point is the force per unit charge on a small positive test charge placed there, $\mathbf E = \mathbf F/Q_t$, in the limit of a vanishing test charge (so that it does not disturb the sources). Its unit is the newton per coulomb, which equals the volt per metre ($\mathrm{V/m}$). The field of a point charge $Q$ at $\mathbf r'$ is

$$
\mathbf E(\mathbf r) = \frac{Q}{4\pi\epsilon_0\abs{\mathbf r-\mathbf r'}^2}\,\frac{\mathbf r-\mathbf r'}{\abs{\mathbf r-\mathbf r'}} .
$$ {#eq-point-field}
:::

Throughout electromagnetics we keep the convention that **primed** coordinates $\mathbf r'$ locate the source and unprimed coordinates $\mathbf r$ the point where the field is evaluated. Because forces add as vectors, so do fields: the field of several charges is the vector sum of their individual fields. This **superposition principle** holds because the equations of electrostatics in vacuum are linear.

::: widget vectorfield
P: (x-1)/((x-1)^2 + y^2 + 0.02)^(3/2) + q*(x+1)/((x+1)^2 + y^2 + 0.02)^(3/2)
Q: y/((x-1)^2 + y^2 + 0.02)^(3/2) + q*y/((x+1)^2 + y^2 + 0.02)^(3/2)
x: -3, 3
y: -2.5, 2.5
streamlines: true
sliders: q=-1:-2:2:0.1
caption: The field of a unit positive charge at $(1, 0)$ and a charge $q$ at $(-1, 0)$, by superposition. At $q = -1$ you see the dipole: field lines leave the positive charge and end on the negative one. Set $q = +1$: the lines repel and a **null point** (zero field) appears midway. For $q = -2$ notice that some lines from the positive charge escape to infinity while the rest end on the larger negative charge.
:::

### Continuous charge distributions

Charge on real objects is spread out. We describe it by densities: a **volume charge density** $\rho_v$ in $\mathrm{C/m^3}$, a **surface charge density** $\rho_s$ in $\mathrm{C/m^2}$ on thin sheets or conductor surfaces, and a **line charge density** $\rho_L$ in $\mathrm{C/m}$ on thin wires. Each small piece of charge $\mathrm dQ = \rho_v\,\mathrm dv'$ (or $\rho_s\,\mathrm dS'$, or $\rho_L\,\mathrm dl'$) acts as a point charge, and superposition becomes integration:

$$
\mathbf E(\mathbf r) = \int\frac{\rho_v(\mathbf r')\,(\mathbf r-\mathbf r')}{4\pi\epsilon_0\abs{\mathbf r-\mathbf r'}^3}\,\mathrm dv' .
$$ {#eq-coulomb-integral}

This is a vector integral: the integrand's direction changes from one source point to another, so in practice we resolve it into Cartesian components (see the warning in [[electromagnetics/vector-analysis]]) and use symmetry to see in advance which components cancel.

::: example The field of an infinite line charge {#ex-line-coulomb}
A straight line along the $z$-axis carries a uniform charge density $\rho_L$. Find $\mathbf E$ at distance $\rho$ from it.
::: solution
By symmetry the field can depend only on $\rho$ and can have no $\phi$-component (rotating the line about its axis changes nothing) and no $z$-component (for every element at $+z'$ above the field point there is one at $-z'$ below whose $z$-components cancel). So $\mathbf E = E_\rho\,\mathbf a_\rho$, and we put the field point at $(\rho, 0, 0)$. An element $\rho_L\,\mathrm dz'$ at $(0,0,z')$ is at distance $\sqrt{\rho^2 + z'^2}$ and contributes the radial component

$$
\mathrm dE_\rho = \frac{\rho_L\,\mathrm dz'}{4\pi\epsilon_0(\rho^2 + z'^2)}\cdot\frac{\rho}{\sqrt{\rho^2+z'^2}} .
$$

With $z' = \rho\tan\alpha$, $\mathrm dz' = \rho\sec^2\alpha\,\mathrm d\alpha$ and $\rho^2 + z'^2 = \rho^2\sec^2\alpha$,

$$
E_\rho = \frac{\rho_L}{4\pi\epsilon_0\rho}\int_{-\pi/2}^{\pi/2}\cos\alpha\,\mathrm d\alpha = \frac{\rho_L}{2\pi\epsilon_0\rho} .
$$ {#eq-line-field}

The field falls as $1/\rho$, more slowly than a point charge's $1/r^2$, because more and more of the line contributes as we move away. A line charge of $1\,\mathrm{nC/m}$ produces $18.0\,\mathrm{V/m}$ at $1\,\mathrm m$.
:::
:::

::: example On the axis of a ring {#ex-ring}
A thin ring of radius $a = 5\,\mathrm{cm}$ in the $xy$-plane, centred on the origin, carries total charge $Q = 10\,\mathrm{nC}$ spread uniformly. Find $\mathbf E$ on the axis at $z = 12\,\mathrm{cm}$, and the height at which the axial field is greatest.
::: solution
Every element of the ring is at the same distance $\sqrt{a^2+z^2}$ from the field point $(0,0,z)$. The radial components cancel in pairs from opposite sides, and each element contributes the fraction $z/\sqrt{a^2+z^2}$ of its field along $\mathbf a_z$. Adding all the elements,

$$
\mathbf E = \frac{Qz}{4\pi\epsilon_0(a^2+z^2)^{3/2}}\,\mathbf a_z .
$$

At $z = 0.12\,\mathrm m$: $a^2 + z^2 = 0.0025 + 0.0144 = 0.0169\,\mathrm{m^2}$, whose $3/2$ power is $0.13^3 = 2.197\times10^{-3}\,\mathrm{m^3}$, so

$$
E_z = \frac{(8.988\times10^9)(10\times10^{-9})(0.12)}{2.197\times10^{-3}} = 4.91\,\mathrm{kV/m} .
$$

The field is zero at the centre (by symmetry) and tends to zero far away, so it has a maximum in between. Setting $\mathrm dE_z/\mathrm dz = 0$ gives $(a^2+z^2) - 3z^2 = 0$, so $z = a/\sqrt2 = 3.54\,\mathrm{cm}$, where $E_z = 13.8\,\mathrm{kV/m}$. Far from the ring, $z\gg a$, the field becomes $Q/(4\pi\epsilon_0z^2)$: it looks like a point charge.
:::
:::

Letting a ring grow into a disc of charge and then into an infinite plane gives one more standard result: an infinite sheet with uniform surface density $\rho_s$ produces a uniform field of magnitude

$$
E = \frac{\rho_s}{2\epsilon_0}
$$ {#eq-sheet}

on each side, directed away from the sheet if $\rho_s > 0$. It does not depend on distance at all. Two parallel sheets with opposite charges $\pm\rho_s$ produce $\rho_s/\epsilon_0$ between them and zero outside: the idealised parallel-plate capacitor.

## Electric flux density and Gauss's law

Faraday found experimentally that when a charged body is enclosed in a conducting shell, the charge induced on the shell is equal and opposite to the enclosed charge, whatever material fills the space between them. This suggested a "flux" that starts on positive charge and ends on negative charge, independent of the medium.

::: definition Electric flux density {#def-d}
In vacuum the **electric flux density** (or **displacement**) is $\mathbf D = \epsilon_0\mathbf E$, measured in $\mathrm{C/m^2}$. The **electric flux** through a surface $S$ is $\Psi = \int_S\mathbf D\cdot\mathrm d\mathbf S$, in coulombs. In a dielectric $\mathbf D = \epsilon\mathbf E$ with the material's permittivity $\epsilon$ ([[electromagnetics/conductors-dielectrics]]).
:::

For a point charge $Q$, $\mathbf D = Q\,\mathbf a_r/(4\pi r^2)$, and the total flux through a sphere of any radius centred on the charge is $D\times4\pi r^2 = Q$. One coulomb of charge produces one coulomb of flux. The remarkable fact is that the same is true for any closed surface.

::: theorem Gauss's law {#thm-gauss}
The electric flux out of any closed surface equals the total charge enclosed:

$$
\oint_S\mathbf D\cdot\mathrm d\mathbf S = Q_{\text{enc}} = \int_V\rho_v\,\mathrm dv .
$$ {#eq-gauss}

By the divergence theorem ([[electromagnetics/vector-analysis#thm-divergence]]) the equivalent point form is

$$
\nabla\cdot\mathbf D = \rho_v .
$$ {#eq-gauss-point}
:::

::: proof
Consider first a single point charge $Q$ at the origin and an arbitrary closed surface $S$. An element $\mathrm d\mathbf S$ at distance $r$ receives flux $\mathbf D\cdot\mathrm d\mathbf S = Q\,(\mathbf a_r\cdot\mathrm d\mathbf S)/(4\pi r^2)$. The quantity $\mathbf a_r\cdot\mathrm d\mathbf S/r^2$ is the **solid angle** $\mathrm d\Omega$ subtended by the element at the charge. If $S$ encloses the charge, the solid angles of all its elements add up to the full $4\pi$ steradians (where the surface folds back, the extra pieces cancel in sign), so the flux is $Q$. If $S$ does not enclose the charge, each cone from the charge cuts $S$ an even number of times with alternating signs, and the total solid angle is $0$. By superposition the flux of any distribution is the sum of the fluxes of its elements, which is the enclosed charge. Applying the divergence theorem to an arbitrary small volume then gives $\int_V(\nabla\cdot\mathbf D - \rho_v)\,\mathrm dv = 0$ for every $V$, hence [[#eq-gauss-point]].
:::

Gauss's law is true for every closed surface, but it is a useful tool for *finding* $\mathbf D$ only when symmetry tells us the direction of $\mathbf D$ and lets us choose a **Gaussian surface** on which $D$ is constant and normal to the surface (or tangential, contributing nothing). There are three such symmetries: spherical (point charges, spheres), cylindrical (lines, coaxial cables) and planar (sheets, slabs).

::: algorithm Using Gauss's law {#alg-gauss}
1. Identify the symmetry and deduce the direction of $\mathbf D$ and the coordinate it depends on.
2. Choose a closed surface through the field point on which $\mathbf D\cdot\mathrm d\mathbf S$ is either $D\,\mathrm dS$ with $D$ constant or zero.
3. Compute the enclosed charge $Q_{\text{enc}}$.
4. Solve $D\times(\text{area where } \mathbf D\parallel\mathrm d\mathbf S) = Q_{\text{enc}}$ for $D$, then $\mathbf E = \mathbf D/\epsilon_0$.
:::

::: example A non-uniform sphere of charge {#ex-gauss-sphere}
A sphere of radius $a$ contains charge density $\rho_v = \rho_0\,r/a$ (zero outside). Find $\mathbf D$ everywhere and check the result with $\nabla\cdot\mathbf D = \rho_v$.
::: solution
The charge distribution depends only on $r$, so $\mathbf D = D_r(r)\,\mathbf a_r$. Take a sphere of radius $r$ as Gaussian surface; the flux through it is $4\pi r^2D_r$.

*Inside* ($r < a$):

$$
Q_{\text{enc}} = \int_0^r\frac{\rho_0r'}{a}\,4\pi r'^2\,\mathrm dr' = \frac{\pi\rho_0r^4}{a}, \qquad D_r = \frac{Q_{\text{enc}}}{4\pi r^2} = \frac{\rho_0r^2}{4a} .
$$

*Outside* ($r > a$): all the charge $Q = \pi\rho_0a^3$ is enclosed, and $D_r = \rho_0a^3/(4r^2)$, the field of a point charge $Q$ at the centre.

The two expressions agree at $r = a$ (both give $\rho_0a/4$), as they must, since there is no surface charge. **Check:** inside, $\nabla\cdot\mathbf D = r^{-2}\,\partial(r^2\cdot\rho_0r^2/(4a))/\partial r = r^{-2}\cdot\rho_0r^3/a = \rho_0r/a = \rho_v$; outside, $r^2D_r$ is constant, so the divergence is zero. Both are correct.
:::
:::

::: widget plot
f: if(x < 1, x^2/4, 1/(4x^2)); if(x < 1, x/3, 1/(3x^2))
x: 0, 3
y: 0, 0.4
labels: \rho_v \propto r; \rho_v\ \text{uniform}
vlines: 1
caption: Radial flux density $D_r$ (in units of $\rho_0a$) against $r/a$ for the non-uniform sphere of [[#ex-gauss-sphere]] and for a uniform sphere with the same peak density $\rho_0$. Inside, $D_r$ grows as $r^2$ or $r$; outside, both fall as $1/r^2$, the point-charge law. The kink at $r = a$ is real: $D_r$ is continuous but its slope jumps where the charge density jumps.
:::

::: example The coaxial cable {#ex-coax}
A coaxial cable has an inner conductor of radius $a$ and an outer conductor of inner radius $b$. The inner conductor carries charge $+\rho_L$ per unit length on its surface and the outer one $-\rho_L$. Find $\mathbf E$ in all regions.
::: solution
The symmetry is cylindrical: $\mathbf D = D_\rho(\rho)\,\mathbf a_\rho$. Take as Gaussian surface a closed cylinder of radius $\rho$ and length $L$, coaxial with the cable. Its end caps contribute nothing ($\mathbf D$ is parallel to them), and its side contributes $2\pi\rho LD_\rho$.

- $\rho < a$: no charge is enclosed (the charge on a conductor sits on its surface; see [[electromagnetics/conductors-dielectrics]]), so $\mathbf E = \mathbf 0$.
- $a < \rho < b$: $Q_{\text{enc}} = \rho_LL$, so $D_\rho = \rho_L/(2\pi\rho)$ and $\mathbf E = \dfrac{\rho_L}{2\pi\epsilon_0\rho}\,\mathbf a_\rho$, the line-charge field [[#eq-line-field]] found in one line.
- $\rho > b$: $Q_{\text{enc}} = \rho_LL - \rho_LL = 0$, so $\mathbf E = \mathbf 0$.

The field is confined to the space between the conductors. This **self-shielding** is the reason coaxial cable is used for signals that must neither radiate nor pick up interference.
:::
:::

::: warning Gauss's law always holds, but rarely helps
A Gaussian surface must be closed, and Gauss's law gives the *total* flux, not the field. If the charge has no symmetry (a finite line, a square plate, two point charges), $\mathbf D$ varies over every surface you might choose and the integral cannot be "unwrapped" into $D$ times an area. Then you must use the Coulomb integral [[#eq-coulomb-integral]], the potential, or a numerical method. Do not divide the enclosed charge by $4\pi r^2$ unless the field really is spherically symmetric.
:::

::: quiz
A point charge $Q$ sits at the centre of a cube. What is the electric flux through one face?
- [ ] $Q$
- [x] $Q/6$
- [ ] $Q/(4\pi)$
- [ ] It cannot be found, because $\mathbf D$ is not constant over a face.
::: solution
The total flux through the closed cube is $Q$ by Gauss's law, and by symmetry each of the six faces receives the same share, so each gets $Q/6$. Gauss's law cannot give $\mathbf D$ at a point on the face (it is not constant there), but symmetry still gives the flux.
:::
:::

## The electric potential

Moving a charge against an electric field requires work. Because the electrostatic field has a special property, that work depends only on where the charge starts and ends, and we can assign to every point a single number, the potential.

::: definition Potential difference and potential {#def-potential}
The **potential difference** $V_{AB}$ between points $A$ and $B$ is the work per unit charge done by an external agent in moving a test charge from $B$ to $A$ against the field:

$$
V_{AB} = V_A - V_B = -\int_B^A\mathbf E\cdot\mathrm d\mathbf l ,
$$ {#eq-vab}

measured in volts (joules per coulomb). The **potential** $V(\mathbf r)$ is the potential difference between $\mathbf r$ and a chosen reference point of zero potential, usually infinity for bounded charge distributions and ground in circuits.
:::

The definition makes sense only if the integral does not depend on the path. For a point charge, $\mathbf E\cdot\mathrm d\mathbf l = \dfrac{Q}{4\pi\epsilon_0r^2}\,\mathrm dr$ along any path, because only the radial part of $\mathrm d\mathbf l$ contributes, so

$$
V_{AB} = -\int_{r_B}^{r_A}\frac{Q}{4\pi\epsilon_0r^2}\,\mathrm dr = \frac{Q}{4\pi\epsilon_0}\left(\frac1{r_A} - \frac1{r_B}\right),
$$

which depends only on the end points. With the reference at infinity, the **potential of a point charge** is $V = Q/(4\pi\epsilon_0r)$. By superposition this extends to any static charge distribution.

::: theorem The electrostatic field is conservative {#thm-conservative}
For any static charge distribution,

$$
\oint_C\mathbf E\cdot\mathrm d\mathbf l = 0 \quad\text{for every closed path } C, \qquad\text{equivalently}\qquad \nabla\times\mathbf E = \mathbf 0 \quad\text{and}\quad \mathbf E = -\nabla V,
$$ {#eq-conservative}

where the potential of a distribution with reference at infinity is

$$
V(\mathbf r) = \int\frac{\rho_v(\mathbf r')}{4\pi\epsilon_0\abs{\mathbf r-\mathbf r'}}\,\mathrm dv' .
$$ {#eq-v-integral}
:::

::: proof
For a single point charge, the line integral between two points depends only on their distances from the charge, as just shown, so the integral round a closed path, which returns to its starting distance, is zero. The field of a distribution is a superposition of point-charge fields, and line integrals are linear, so the closed-path integral of the total field is zero as well. By Stokes's theorem ([[electromagnetics/vector-analysis#thm-stokes]]), zero circulation round every small loop means zero curl. Defining $V$ by [[#eq-vab]] with a fixed reference, the change in $V$ along a short step is $\mathrm dV = -\mathbf E\cdot\mathrm d\mathbf l$; comparing with $\mathrm dV = \nabla V\cdot\mathrm d\mathbf l$ ([[electromagnetics/vector-analysis#def-gradient]]) for every $\mathrm d\mathbf l$ gives $\mathbf E = -\nabla V$. The integral [[#eq-v-integral]] is the superposition of point-charge potentials.
:::

The scalar integral [[#eq-v-integral]] is usually much easier than the vector integral [[#eq-coulomb-integral]]: there are no components to resolve. Find $V$, then differentiate. Kirchhoff's voltage law is [[#eq-conservative]] applied to a circuit: the voltages round any loop sum to zero because the field is conservative. (We shall see in [[electromagnetics/induction-inductance]] that a changing magnetic field breaks this, and KVL with it.)

::: example Work in the field of a point charge {#ex-work}
A charge $Q = 1\,\mathrm{nC}$ is fixed at the origin. How much work must be done to move a charge $q = 3\,\mathrm{nC}$ from $r = 0.5\,\mathrm m$ to $r = 0.2\,\mathrm m$?
::: solution
The potential difference between the final point $A$ ($r_A = 0.2\,\mathrm m$) and the initial point $B$ ($r_B = 0.5\,\mathrm m$) is

$$
V_{AB} = \frac{Q}{4\pi\epsilon_0}\left(\frac1{0.2} - \frac1{0.5}\right) = (8.988\times10^9)(10^{-9})(5 - 2) = 26.96\,\mathrm V .
$$

The work is $W = qV_{AB} = (3\times10^{-9})(26.96) = 8.09\times10^{-8}\,\mathrm J = 80.9\,\mathrm{nJ}$, positive because we push like charges together. The path does not matter: going straight in or spiralling round costs the same.
:::
:::

::: widget contour
f: ln(((x + 1)^2 + y^2 + 0.001)/((x - 1)^2 + y^2 + 0.001)) + k*y
x: -3, 3
y: -2.5, 2.5
levels: 20
gradient: true
point: 0, 1
sliders: k=0:-1:1:0.1
caption: Equipotentials of two parallel line charges $+\rho_L$ at $x = 1$ and $-\rho_L$ at $x = -1$ (the potential $\propto\ln(\rho_-/\rho_+)$, in arbitrary units), the cross-section of a two-wire transmission line. The equipotentials are circles, which is why a pair of round wires can be analysed exactly. The slider $k$ adds a uniform field along $-\mathbf a_y$: watch the circles distort as an external field is superimposed.
:::

### The electric dipole

Two equal and opposite charges $\pm Q$ separated by a small distance $d$ form an **electric dipole**, with **dipole moment** $\mathbf p = Q\mathbf d$ pointing from $-Q$ to $+Q$. Molecules, polarised atoms in a dielectric and small antennas all behave as dipoles. With the dipole at the origin along $\mathbf a_z$, the potential at a point at distance $r\gg d$ is

$$
V = \frac{Q}{4\pi\epsilon_0}\left(\frac1{r_+} - \frac1{r_-}\right) \approx \frac{Q\,d\cos\theta}{4\pi\epsilon_0r^2} = \frac{\mathbf p\cdot\mathbf a_r}{4\pi\epsilon_0r^2},
$$ {#eq-dipole}

because $r_- - r_+ \approx d\cos\theta$ and $r_+r_-\approx r^2$. Taking the gradient in spherical coordinates,

$$
\mathbf E = \frac{p}{4\pi\epsilon_0r^3}\bigl(2\cos\theta\,\mathbf a_r + \sin\theta\,\mathbf a_\theta\bigr).
$$

The dipole potential falls as $1/r^2$ and its field as $1/r^3$, faster than a single charge because the two charges nearly cancel at large distance.

::: example Designing a high-voltage coaxial conductor {#ex-coax-design}
A cylindrical high-voltage bushing has an earthed outer cylinder of inner radius $b = 10\,\mathrm{mm}$ and an inner conductor at $V_0 = 10\,\mathrm{kV}$, with air between them. Air breaks down at roughly $3\,\mathrm{MV/m}$. Choose the radius $a$ of the inner conductor to minimise the peak field, and check whether the design is safe.
::: solution
From [[#ex-coax]], $E = \rho_L/(2\pi\epsilon_0\rho)$. The voltage between the conductors is

$$
V_0 = -\int_b^a\frac{\rho_L}{2\pi\epsilon_0\rho}\,\mathrm d\rho = \frac{\rho_L}{2\pi\epsilon_0}\ln\frac ba ,
$$

so $\rho_L/(2\pi\epsilon_0) = V_0/\ln(b/a)$ and $E(\rho) = V_0/(\rho\ln(b/a))$. The field is greatest at the surface of the inner conductor:

$$
E_{\max} = \frac{V_0}{a\ln(b/a)} .
$$

A very thin inner wire concentrates the field ($a\to0$); a very fat one leaves almost no gap ($\ln(b/a)\to0$). Between them, minimise $E_{\max}$ by maximising $f(a) = a\ln(b/a)$: $f'(a) = \ln(b/a) - 1 = 0$, so $\ln(b/a) = 1$ and

$$
a = \frac be = \frac{10}{2.718} = 3.68\,\mathrm{mm}, \qquad E_{\max} = \frac{V_0}{a} = \frac{eV_0}{b} = \frac{2.718\times10^4}{0.01} = 2.72\,\mathrm{MV/m} .
$$

That is only about $10\,\%$ below the breakdown field, too small a margin for a real design (humidity, surface roughness and altitude all lower the breakdown strength). The engineer would enlarge $b$, use a solid or gas insulation with higher strength (sulfur hexafluoride at a few bar withstands well over $10\,\mathrm{MV/m}$), or lower the rated voltage. For comparison, $a = 1\,\mathrm{mm}$ gives $E_{\max} = 4.34\,\mathrm{MV/m}$ and would arc.
:::
:::

::: quiz
At a certain point the potential is zero. What can you say about the electric field there?
- [ ] It must be zero.
- [x] It can be anything; zero potential says nothing about the field at that point.
- [ ] It must point towards lower potential, so it is impossible for $V$ to be zero.
- [ ] It is zero only if the reference is at infinity.
::: solution
The field is the negative gradient of $V$, which depends on how $V$ changes nearby, not on its value at the point. Midway between $+Q$ and $-Q$ the potential is zero but the field is large and points from $+Q$ to $-Q$; midway between two equal charges $+Q$ the field is zero but the potential is not. The value of $V$ also depends on the arbitrary choice of reference, while $\mathbf E$ does not.
:::
:::

::: application Electrostatic discharge
A person walking across a carpet can charge to $10$–$15\,\mathrm{kV}$. The human body has a capacitance of the order of $100\,\mathrm{pF}$, so the stored energy $\tfrac12CV^2$ is about $5$–$11\,\mathrm{mJ}$, delivered in a spark lasting of the order of $100\,\mathrm{ns}$ with peak currents of several amperes. The thin gate oxide of a MOSFET breaks down at a few volts, which is why integrated circuits have protection diodes on every pin and are tested to standards such as the human-body model of JEDEC/ESDA JS-001 and the system-level test of IEC 61000-4-2, and why assembly lines use earthed wrist straps and conductive floors.
:::

::: history
Charles-Augustin de Coulomb reported his torsion-balance measurements of electric repulsion to the French Academy of Sciences in 1785, and Henry Cavendish had already established the inverse-square law in the 1770s with a more precise null experiment on concentric spheres, which he never published; Maxwell edited his notes in 1879. The flux form of the law is due to Carl Friedrich Gauss, who formulated it in 1835 although it was published only in 1867, after his death. Michael Faraday's ice-pail experiments of 1843 showed that the charge induced on an enclosing conductor equals the enclosed charge, the observation behind the concept of displacement flux. The potential function had been introduced for gravitation by Lagrange and Laplace; George Green gave it its name and its systematic use in electricity in his self-published *Essay* of 1828.
:::

## Where this leads

The static field of charges in vacuum is the first piece of electromagnetics. In [[electromagnetics/conductors-dielectrics]] charges move in conductors and polarise dielectrics, and the field and potential of this chapter yield the capacitance and stored energy of real structures. In [[electromagnetics/boundary-value-problems]] we turn $\nabla\cdot\mathbf D = \rho_v$ and $\mathbf E = -\nabla V$ into Poisson's equation, which can be solved when the charge is not known in advance but the potentials of electrodes are. Gauss's law, in the form [[#eq-gauss-point]], is the first of [[electromagnetics/maxwells-equations]], and it survives unchanged when the fields vary in time.

::: summary
- Coulomb's law [[#eq-coulomb]] gives the inverse-square force between point charges; with $1/(4\pi\epsilon_0) = 8.988\times10^9\,\mathrm{m/F}$.
- The electric field $\mathbf E$ (in $\mathrm{V/m}$) is force per unit charge; fields of distributions follow by superposition, as an integral over source points.
- Standard fields: point charge $Q/(4\pi\epsilon_0r^2)$, infinite line $\rho_L/(2\pi\epsilon_0\rho)$, infinite sheet $\rho_s/(2\epsilon_0)$.
- Gauss's law $\oint\mathbf D\cdot\mathrm d\mathbf S = Q_{\text{enc}}$, or $\nabla\cdot\mathbf D = \rho_v$, holds always; it gives $\mathbf D$ directly only for spherical, cylindrical or planar symmetry.
- The electrostatic field is conservative: $\nabla\times\mathbf E = \mathbf 0$, $\mathbf E = -\nabla V$, and $V_{AB} = -\int_B^A\mathbf E\cdot\mathrm d\mathbf l$ is path-independent; this is the basis of KVL.
- The scalar potential integral is usually easier than the vector field integral: find $V$, then differentiate.
- In a coaxial geometry $E_{\max} = V_0/(a\ln(b/a))$, minimised at $b/a = e$.
:::

## Exercises

::: exercise Two nanocoulombs {level=1 check="1e-18/(4*pi*8.854187817e-12*1e-4)"}
Find the magnitude of the force, in newtons, between two charges of $1\,\mathrm{nC}$ each, $1\,\mathrm{cm}$ apart in air.
::: solution
$F = (8.988\times10^9)(10^{-9})^2/(0.01)^2 = 8.99\times10^{-5}\,\mathrm N$, about the weight of a $9\,\mathrm{mg}$ mass.
:::
:::

::: exercise Field of a line charge {level=1 check="2e-9/(2*pi*8.854187817e-12*0.5)"}
An infinitely long wire carries $2\,\mathrm{nC/m}$. Find the field magnitude in $\mathrm{V/m}$ at $50\,\mathrm{cm}$ from it.
::: solution
By [[#eq-line-field]], $E = \rho_L/(2\pi\epsilon_0\rho) = 2\times10^{-9}/(2\pi\times8.854\times10^{-12}\times0.5) = 71.9\,\mathrm{V/m}$.
:::
:::

::: exercise A charged plane {level=1 check="1e-6/(2*8.854187817e-12)"}
A large flat sheet carries $\rho_s = 1\,\mathrm{\mu C/m^2}$. What is the field magnitude near it, in $\mathrm{V/m}$?
::: solution
$E = \rho_s/(2\epsilon_0) = 10^{-6}/(1.771\times10^{-11}) = 5.65\times10^4\,\mathrm{V/m} = 56.5\,\mathrm{kV/m}$ on either side, pointing away from the sheet.
:::
:::

::: exercise Potential at the centre of a square {level=2 check="2*1e-9/(4*pi*8.854187817e-12*sqrt(2)/2)"}
Charges of $+1\,\mathrm{nC}$ sit at three corners of a square of side $1\,\mathrm m$ and $-1\,\mathrm{nC}$ at the fourth. Find the potential at the centre, in volts, with zero at infinity.
::: solution
Each corner is $\sqrt2/2 = 0.7071\,\mathrm m$ from the centre. Potentials add as scalars: $V = (8.988\times10^9)(1 + 1 + 1 - 1)\times10^{-9}/0.7071 = 25.4\,\mathrm V$. (The field at the centre is not zero: the two positive charges on one diagonal cancel, but the positive and negative charges on the other diagonal add.)
:::
:::

::: exercise A uniformly charged cylinder {level=2}
An infinitely long cylinder of radius $a$ contains uniform volume charge density $\rho_0$. Use Gauss's law to find $\mathbf E$ inside and outside, and verify $\nabla\cdot\mathbf D = \rho_v$ in both regions.
::: solution
Use a coaxial Gaussian cylinder of radius $\rho$ and length $L$. Inside, $Q_{\text{enc}} = \rho_0\pi\rho^2L$, so $2\pi\rho LD_\rho = \rho_0\pi\rho^2L$ and $D_\rho = \rho_0\rho/2$, $\mathbf E = (\rho_0\rho/2\epsilon_0)\,\mathbf a_\rho$. Outside, $Q_{\text{enc}} = \rho_0\pi a^2L$ and $D_\rho = \rho_0a^2/(2\rho)$, the field of a line charge $\rho_L = \rho_0\pi a^2$. Check: inside, $\rho^{-1}\partial(\rho\cdot\rho_0\rho/2)/\partial\rho = \rho_0$; outside, $\rho D_\rho$ is constant, so the divergence is $0$.
:::
:::

::: exercise On the axis of a disc {level=2 check="10e-9/(2*8.854187817e-12)*(1 - 1/sqrt(2))"}
A disc of radius $a$ in the plane $z = 0$ carries uniform surface charge $\rho_s$. Show that on its axis $V = \dfrac{\rho_s}{2\epsilon_0}\left(\sqrt{z^2+a^2} - z\right)$ for $z > 0$, find $E_z$, and evaluate $E_z$ in $\mathrm{V/m}$ for $\rho_s = 10\,\mathrm{nC/m^2}$, $a = 10\,\mathrm{cm}$, $z = 10\,\mathrm{cm}$.
::: hint
Divide the disc into rings of radius $\rho'$ and width $\mathrm d\rho'$; every point of a ring is at distance $\sqrt{z^2+\rho'^2}$.
:::
::: solution
A ring carries $\mathrm dQ = \rho_s2\pi\rho'\,\mathrm d\rho'$, so

$$
V = \int_0^a\frac{\rho_s2\pi\rho'\,\mathrm d\rho'}{4\pi\epsilon_0\sqrt{z^2+\rho'^2}} = \frac{\rho_s}{2\epsilon_0}\Bigl[\sqrt{z^2+\rho'^2}\Bigr]_0^a = \frac{\rho_s}{2\epsilon_0}\left(\sqrt{z^2+a^2} - z\right).
$$

By symmetry $\mathbf E$ on the axis is along $\mathbf a_z$, and $E_z = -\partial V/\partial z = \dfrac{\rho_s}{2\epsilon_0}\left(1 - \dfrac{z}{\sqrt{z^2+a^2}}\right)$. (Differentiating $V$ along the axis is legitimate here only because symmetry already guarantees $E_x = E_y = 0$ on it.) Numerically $\rho_s/(2\epsilon_0) = 564.7\,\mathrm{V/m}$ and $1 - 1/\sqrt2 = 0.2929$, so $E_z = 165\,\mathrm{V/m}$. As $a\to\infty$ the result tends to the sheet field [[#eq-sheet]].
:::
:::

::: exercise Charge density from a potential {level=2 check="-8*8.854187817e-12"}
In a vacuum region the potential is $V = 2x^2y - 5z$ volts (coordinates in metres). Find $\mathbf E$ and the volume charge density, in $\mathrm{C/m^3}$, at $(1, 2, 0)$.
::: solution
$\mathbf E = -\nabla V = -4xy\,\mathbf a_x - 2x^2\,\mathbf a_y + 5\,\mathbf a_z$, which at $(1,2,0)$ is $-8\,\mathbf a_x - 2\,\mathbf a_y + 5\,\mathbf a_z\,\mathrm{V/m}$. Then $\rho_v = \nabla\cdot\mathbf D = \epsilon_0\nabla\cdot\mathbf E = \epsilon_0(-4y) = -8\epsilon_0 = -7.08\times10^{-11}\,\mathrm{C/m^3}$ at the point.
:::
:::

::: exercise A finite line charge {level=3 check="1e-9/(2*pi*8.854187817e-12*1)/sqrt(2)"}
A straight segment of length $L$ along the $z$-axis, from $-L/2$ to $L/2$, carries uniform density $\rho_L$. Show that on its perpendicular bisector at distance $\rho$

$$
E_\rho = \frac{\rho_L}{2\pi\epsilon_0\rho}\,\frac{L/2}{\sqrt{\rho^2 + (L/2)^2}} ,
$$

and evaluate it in $\mathrm{V/m}$ for $\rho_L = 1\,\mathrm{nC/m}$, $L = 2\,\mathrm m$, $\rho = 1\,\mathrm m$. Check the limits $L\to\infty$ and $L\ll\rho$.
::: hint
Repeat [[#ex-line-coulomb]], integrating $\alpha$ only between $\pm\alpha_0$ with $\tan\alpha_0 = L/(2\rho)$.
:::
::: solution
As in [[#ex-line-coulomb]], $E_\rho = \dfrac{\rho_L}{4\pi\epsilon_0\rho}\displaystyle\int_{-\alpha_0}^{\alpha_0}\cos\alpha\,\mathrm d\alpha = \dfrac{\rho_L}{2\pi\epsilon_0\rho}\sin\alpha_0$, and $\sin\alpha_0 = (L/2)/\sqrt{\rho^2 + (L/2)^2}$. Numerically $\rho_L/(2\pi\epsilon_0\rho) = 17.98\,\mathrm{V/m}$ and $\sin\alpha_0 = 1/\sqrt2$, so $E_\rho = 12.7\,\mathrm{V/m}$. As $L\to\infty$, $\sin\alpha_0\to1$ and we recover [[#eq-line-field]]. For $L\ll\rho$, $\sin\alpha_0\approx L/(2\rho)$ and $E_\rho\approx\rho_LL/(4\pi\epsilon_0\rho^2)$, the field of a point charge $Q = \rho_LL$.
:::
:::

::: exercise The dipole field {level=3}
Starting from the exact potential of charges $+Q$ at $z = d/2$ and $-Q$ at $z = -d/2$, derive [[#eq-dipole]] for $r\gg d$ and the dipole field. At what angle $\theta$ is the field of a dipole perpendicular to the radius vector, and in which direction does it point there?
::: hint
Expand $r_\pm = \sqrt{r^2 \mp rd\cos\theta + d^2/4}$ to first order in $d/r$.
:::
::: solution
By the law of cosines $r_\pm^2 = r^2 \mp rd\cos\theta + d^2/4$, so to first order $1/r_\pm \approx (1/r)(1 \pm (d/2r)\cos\theta)$. Then $1/r_+ - 1/r_- \approx d\cos\theta/r^2$ and $V\approx Qd\cos\theta/(4\pi\epsilon_0r^2)$. The gradient gives $E_r = -\partial V/\partial r = 2p\cos\theta/(4\pi\epsilon_0r^3)$ and $E_\theta = -r^{-1}\partial V/\partial\theta = p\sin\theta/(4\pi\epsilon_0r^3)$. The field is perpendicular to $\mathbf a_r$ where $E_r = 0$, that is at $\theta = 90^\circ$, in the equatorial plane. There $\mathbf E = p/(4\pi\epsilon_0r^3)\,\mathbf a_\theta$, and since $\mathbf a_\theta = -\mathbf a_z$ at $\theta = 90^\circ$, the field points opposite to $\mathbf p$, from the $+Q$ side to the $-Q$ side, parallel to the dipole axis.
:::
:::
