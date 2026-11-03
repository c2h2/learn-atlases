The previous chapter placed charges in empty space. Real fields live in matter: in the copper of a cable, where charges move freely; in the polyethylene between its conductors, where they can only shift slightly; in the silicon of a chip, the oxide of a gate, the ceramic of a capacitor. Matter responds to a field, and the response changes the field. A conductor rearranges its charges until the field inside it is zero; a dielectric polarises and weakens the field for a given charge, which is why filling a capacitor with ceramic multiplies its capacitance by a factor of ten to several thousand.

This chapter builds the engineering models of that response. We start with moving charge, current density and Ohm's law in point form, which give resistance from geometry. Then we look at conductors in electrostatic equilibrium, at polarisation and permittivity, and at the boundary conditions that fields obey at interfaces between different materials. Those ingredients give capacitance, the central quantity of the chapter, for parallel plates, coaxial cables and spheres, and the energy stored in the electric field. The fields and Gauss's law come from [[electromagnetics/electrostatics]]; for a physics treatment of the same topics see [capacitance](/learn/physics/lesson.php?c=electrostatics&l=capacitance) and [current](/learn/physics/lesson.php?c=electrostatics&l=current) in the Physics Atlas.

## Current, current density and conductivity

**Current** is the rate at which charge crosses a surface, $I = \mathrm dQ/\mathrm dt$, measured in amperes. To describe how current is distributed inside a conductor we need a field.

::: definition Current density {#def-j}
The **current density** $\mathbf J$ (in $\mathrm{A/m^2}$) is the vector whose flux through a surface is the current through it:

$$
I = \int_S\mathbf J\cdot\mathrm d\mathbf S .
$$

If charge of volume density $\rho_v$ moves with velocity $\mathbf v$, then $\mathbf J = \rho_v\mathbf v$ (**convection current density**).
:::

Charge is conserved: if a net current flows out of a closed surface, the charge inside must decrease at the same rate.

::: theorem Continuity equation {#thm-continuity}
For any closed surface $S$ enclosing volume $V$,

$$
\oint_S\mathbf J\cdot\mathrm d\mathbf S = -\frac{\mathrm d}{\mathrm dt}\int_V\rho_v\,\mathrm dv, \qquad\text{equivalently}\qquad \nabla\cdot\mathbf J = -\frac{\partial\rho_v}{\partial t} .
$$ {#eq-continuity}
:::

::: proof
The left-hand integral is the rate at which charge leaves $V$ and the right-hand side the rate at which the charge inside decreases; conservation of charge says they are equal. For a fixed volume the time derivative may be taken inside the integral, and the divergence theorem turns the surface integral into $\int_V\nabla\cdot\mathbf J\,\mathrm dv$. Since $\int_V(\nabla\cdot\mathbf J + \partial\rho_v/\partial t)\,\mathrm dv = 0$ for every volume, the integrand vanishes.
:::

For steady currents, $\partial\rho_v/\partial t = 0$ and $\nabla\cdot\mathbf J = 0$: what flows into any region flows out. Applied to a small surface around a circuit node, this is **Kirchhoff's current law**.

In a metal the charge carriers are free electrons. An applied field accelerates them, collisions with the lattice scatter them, and the net effect is a mean **drift velocity** proportional to the field, $\mathbf v_d = -\mu_e\mathbf E$, where $\mu_e$ is the electron **mobility**. With electron density $n$, the current density is $\mathbf J = -ne\mathbf v_d = ne\mu_e\mathbf E$.

::: theorem Ohm's law in point form {#thm-ohm}
In a linear, isotropic conductor

$$
\mathbf J = \sigma\mathbf E ,
$$ {#eq-ohm-point}

where $\sigma$ is the **conductivity** in siemens per metre ($\mathrm{S/m}$); its reciprocal $1/\sigma$ is the resistivity in $\Omega\,\mathrm m$. For a metal $\sigma = ne\mu_e$; for a semiconductor with electrons and holes $\sigma = e(n\mu_n + p\mu_p)$.
:::

The conductivities of engineering materials span more than twenty orders of magnitude:

| material | $\sigma$ ($\mathrm{S/m}$, near $20\,^\circ\mathrm C$) |
|---|---|
| silver | $6.3\times10^{7}$ |
| copper (annealed) | $5.8\times10^{7}$ |
| aluminium | $3.8\times10^{7}$ |
| stainless steel | about $1.4\times10^{6}$ |
| sea water | about $4$ |
| intrinsic silicon | about $4\times10^{-4}$ |
| glass, polyethylene, PTFE | $10^{-12}$ to $10^{-16}$ |

For a uniform conductor of length $L$ and cross-section $A$ carrying current $I$, the field is uniform, $V = EL$ and $I = JA = \sigma EA$, so

$$
R = \frac VI = \frac{L}{\sigma A} .
$$ {#eq-resistance}

For a non-uniform geometry we assume a voltage, find $\mathbf E$, integrate $\mathbf J = \sigma\mathbf E$ over a cross-section to get $I$, and divide.

::: example Current in a house wire {#ex-drift}
A copper conductor of cross-section $1.5\,\mathrm{mm^2}$ carries $10\,\mathrm A$. Copper has about $8.5\times10^{28}$ free electrons per cubic metre. Find the current density, the electric field in the copper, the drift speed of the electrons and the resistance of $1\,\mathrm{km}$ of the conductor.
::: solution
$J = I/A = 10/(1.5\times10^{-6}) = 6.67\times10^6\,\mathrm{A/m^2}$. The field is $E = J/\sigma = 6.67\times10^6/5.8\times10^7 = 0.115\,\mathrm{V/m}$, so a $10\,\mathrm m$ run drops $1.15\,\mathrm V$. The drift speed is

$$
v_d = \frac{J}{ne} = \frac{6.67\times10^6}{(8.5\times10^{28})(1.602\times10^{-19})} = 4.9\times10^{-4}\,\mathrm{m/s},
$$

about half a millimetre per second. The resistance of $1\,\mathrm{km}$ is $R = 1000/(5.8\times10^7\times1.5\times10^{-6}) = 11.5\,\Omega$. The electrons crawl, yet a lamp lights the instant the switch closes: the signal travels as an electromagnetic wave guided by the wires ([[electromagnetics/transmission-lines]]), at a large fraction of the speed of light, not with the electrons.
:::
:::

## Conductors in electrostatic equilibrium

Put a conductor in an external field. Its free charges move until they produce a field that cancels the applied one inside the metal; once they stop moving, $\mathbf J = \mathbf 0$ and hence $\mathbf E = \mathbf 0$ throughout the conductor. How fast does that happen? Combining the continuity equation, Ohm's law and Gauss's law in a uniform conductor of permittivity $\epsilon$,

$$
\frac{\partial\rho_v}{\partial t} = -\nabla\cdot(\sigma\mathbf E) = -\frac{\sigma}{\epsilon}\rho_v \quad\Longrightarrow\quad \rho_v(t) = \rho_v(0)\,e^{-t/\tau}, \qquad \tau = \frac{\epsilon}{\sigma} .
$$ {#eq-relaxation}

The **relaxation time** $\tau$ is about $1.5\times10^{-19}\,\mathrm s$ for copper (the simple model is not accurate on such short time scales, but the conclusion that metals neutralise their interior almost instantly is). For a good insulator such as fused quartz it can be days.

::: proposition Properties of a conductor in electrostatic equilibrium {#prop-conductor}
1. $\mathbf E = \mathbf 0$ and $\rho_v = 0$ inside the conductor; any net charge resides on its surface.
2. The whole conductor, including its surface, is an equipotential.
3. Just outside the surface, $\mathbf E$ is normal to it, and $D_n = \rho_s$, where $\rho_s$ is the local surface charge density.
:::

::: proof
(1) With $\mathbf E = \mathbf 0$, Gauss's law in point form gives $\rho_v = \epsilon\nabla\cdot\mathbf E = 0$. (2) The potential difference between any two points is the line integral of $\mathbf E$ along a path within the conductor, which is zero. (3) A tangential component of $\mathbf E$ at the surface would drive a surface current, so it is zero in equilibrium; and a Gaussian "pillbox" straddling the surface, with faces of area $\Delta S$ just inside and just outside, encloses charge $\rho_s\Delta S$ and has flux $D_n\Delta S$ through the outer face only, so $D_n = \rho_s$.
:::

Charge is densest where the surface is most sharply curved. For two spheres of radii $a$ and $b$ connected by a long wire (so at the same potential $V$), the charges are $Q_a = 4\pi\epsilon_0aV$ and $Q_b = 4\pi\epsilon_0bV$, and their surface fields are $V/a$ and $V/b$: the smaller sphere has the stronger field. That is why lightning conductors are pointed, why high-voltage equipment has rounded **corona rings**, and why breakdown starts at sharp edges.

::: quiz
A hollow, uncharged metal box contains no charges inside its cavity. It is placed in a strong external field. What is the field inside the cavity?
- [ ] The same as outside, because the metal is thin.
- [ ] Reduced, but not zero, near the walls facing the external field.
- [x] Zero everywhere in the cavity.
- [ ] Zero only at the centre of the box.
::: solution
The cavity is surrounded by an equipotential (the metal). Inside a charge-free region bounded by a single equipotential, the potential is constant (this follows from the uniqueness theorem of [[electromagnetics/boundary-value-problems]]), so $\mathbf E = \mathbf 0$. The induced surface charges on the outside of the box rearrange so as to cancel the external field everywhere inside. This is the **Faraday cage**; for static fields it works perfectly, whatever the shape of the box.
:::
:::

## Dielectrics and polarisation

In an insulator the charges are bound. An applied field cannot move them far, but it displaces the electron cloud of each atom slightly against the nucleus (**electronic polarisation**), stretches ionic bonds (**ionic polarisation**) and partially aligns molecules that already have a dipole moment, such as water (**orientational polarisation**). Each atom or molecule becomes a small dipole.

::: definition Polarisation, susceptibility and permittivity {#def-polarisation}
The **polarisation** $\mathbf P$ of a material is its dipole moment per unit volume, in $\mathrm{C/m^2}$. The electric flux density in matter is defined as

$$
\mathbf D = \epsilon_0\mathbf E + \mathbf P .
$$ {#eq-d-def}

In a **linear, isotropic** dielectric $\mathbf P = \chi_e\epsilon_0\mathbf E$ with **electric susceptibility** $\chi_e$, so that

$$
\mathbf D = \epsilon_0(1 + \chi_e)\mathbf E = \epsilon_r\epsilon_0\mathbf E = \epsilon\mathbf E ,
$$ {#eq-d-eps}

where $\epsilon_r = 1 + \chi_e$ is the **relative permittivity** (dielectric constant) and $\epsilon = \epsilon_r\epsilon_0$ the **permittivity**.
:::

Why is this the useful definition? A non-uniform polarisation leaves uncompensated **bound charge**, of volume density $\rho_b = -\nabla\cdot\mathbf P$, and at the surface of a polarised body a bound surface charge $\rho_{sb} = \mathbf P\cdot\mathbf a_n$. Gauss's law for the *total* charge reads $\nabla\cdot(\epsilon_0\mathbf E) = \rho_v + \rho_b = \rho_v - \nabla\cdot\mathbf P$, which rearranges to

$$
\nabla\cdot\mathbf D = \rho_v ,
$$

with $\rho_v$ now the **free** charge only: the charge we place on electrodes and can control. The bound charge has been absorbed into $\mathbf D$. Gauss's law of [[electromagnetics/electrostatics#thm-gauss]] therefore holds unchanged in matter, provided $Q_{\text{enc}}$ means free charge.

| material | $\epsilon_r$ (low frequency) | dielectric strength ($\mathrm{MV/m}$, typical) |
|---|---|---|
| air (sea level) | $1.0006$ | $3$ |
| PTFE (Teflon) | $2.1$ | $60$ |
| polyethylene | $2.25$ | $20$–$50$ |
| FR-4 circuit board | about $4.3$–$4.7$ | about $20$ |
| silicon dioxide | $3.9$ | about $1000$ (thin films) |
| silicon | $11.7$ | about $30$ |
| distilled water | $80$ | — |
| barium titanate ceramics | $10^3$ to $10^4$ | about $3$–$10$ |

The **dielectric strength** is the field at which the material breaks down and conducts. Both columns are typical values: permittivity depends on frequency, temperature and composition (FR-4 is a glass–epoxy laminate whose $\epsilon_r$ is specified by the manufacturer for each grade and frequency), and breakdown depends strongly on thickness, purity and the duration of the stress.

::: warning Free and bound charge
In $\nabla\cdot\mathbf D = \rho_v$ the charge is the free charge only; in $\nabla\cdot(\epsilon_0\mathbf E) = \rho_{\text{total}}$ it is free plus bound. Mixing them, for example using $\mathbf E = Q/(4\pi\epsilon_0r^2)$ inside a dielectric with $Q$ the free charge, overestimates the field by the factor $\epsilon_r$. Work with $\mathbf D$ and free charge, then divide by the local $\epsilon$.
:::

## Boundary conditions

Fields change abruptly where materials meet. Two integral laws fix how: the electrostatic field is conservative, and $\mathbf D$ obeys Gauss's law with free charge.

::: theorem Electrostatic boundary conditions {#thm-bc}
At the interface between medium 1 and medium 2, with unit normal $\mathbf a_n$ pointing from 2 into 1 and free surface charge density $\rho_s$ on the interface,

$$
E_{t1} = E_{t2}, \qquad D_{n1} - D_{n2} = \rho_s .
$$ {#eq-bc}

In particular, at a charge-free interface between two dielectrics, $\epsilon_1E_{n1} = \epsilon_2E_{n2}$.
:::

::: proof
**Tangential.** Take a small rectangular loop with two sides of length $\Delta w$ parallel to the interface, one in each medium, and two sides of length $\Delta h\to0$ crossing it. By [[electromagnetics/electrostatics#thm-conservative]] the circulation of $\mathbf E$ is zero; as $\Delta h\to0$ only the long sides contribute, giving $E_{t1}\Delta w - E_{t2}\Delta w = 0$.

**Normal.** Take a pillbox with faces of area $\Delta S$ in each medium and height $\Delta h\to0$. The flux through the curved side vanishes in the limit; the flux out of the faces is $(D_{n1} - D_{n2})\Delta S$, and the enclosed free charge is $\rho_s\Delta S$.
:::

With a conductor as medium 2, $\mathbf E_2 = \mathbf D_2 = \mathbf 0$ and the conditions reduce to [[#prop-conductor]]: $E_t = 0$ and $D_n = \rho_s$ just outside.

At a dielectric interface the field lines bend. If $\theta_1$ and $\theta_2$ are the angles between $\mathbf E$ and the normal in the two media, then $E_1\sin\theta_1 = E_2\sin\theta_2$ and $\epsilon_1E_1\cos\theta_1 = \epsilon_2E_2\cos\theta_2$; dividing,

$$
\frac{\tan\theta_1}{\tan\theta_2} = \frac{\epsilon_1}{\epsilon_2} .
$$ {#eq-refraction}

Lines entering a higher-permittivity material bend away from the normal, and flux tends to concentrate in it.

::: example Fields across a dielectric interface {#ex-interface}
The region $z < 0$ has $\epsilon_{r1} = 2$ and $z > 0$ has $\epsilon_{r2} = 5$, with no free surface charge on the plane $z = 0$. Just below the interface $\mathbf E_1 = 3\,\mathbf a_x + 4\,\mathbf a_z\,\mathrm{kV/m}$. Find $\mathbf E_2$ just above, and the angles to the normal.
::: solution
The tangential component is continuous: $E_{x2} = 3\,\mathrm{kV/m}$. The normal component of $\mathbf D$ is continuous: $\epsilon_{r1}E_{z1} = \epsilon_{r2}E_{z2}$, so $E_{z2} = 2\times4/5 = 1.6\,\mathrm{kV/m}$. Hence

$$
\mathbf E_2 = 3\,\mathbf a_x + 1.6\,\mathbf a_z\,\mathrm{kV/m}.
$$

The angles from the normal are $\theta_1 = \arctan(3/4) = 36.9^\circ$ and $\theta_2 = \arctan(3/1.6) = 61.9^\circ$. Check with [[#eq-refraction]]: $\tan\theta_1/\tan\theta_2 = 0.75/1.875 = 0.4 = 2/5$. The field is weaker in the high-permittivity medium ($3.40$ against $5.00\,\mathrm{kV/m}$) and closer to tangential.
:::
:::

::: widget plot
f: atan(r*tan(x))*180/pi; x*180/pi
x: 0, 1.55
y: 0, 90
sliders: r=2.5:0.1:10:0.1
labels: \theta_2; \theta_1
caption: Angle of the field line from the normal on the far side of a dielectric interface, $\theta_2$ (degrees), against the angle of incidence $\theta_1$ (radians), for permittivity ratio $r = \epsilon_2/\epsilon_1$. The straight line is $\theta_2 = \theta_1$ (no interface). For $r > 1$ the lines bend away from the normal; set $r < 1$ to see them bend towards it. Normal ($\theta_1 = 0$) and grazing lines are not bent.
:::

## Capacitance

Two conductors carrying equal and opposite charges $\pm Q$ have a potential difference $V$ between them. Because the equations of electrostatics are linear, doubling $Q$ doubles every field and so doubles $V$: the ratio is fixed by the geometry and the dielectric.

::: definition Capacitance {#def-capacitance}
The **capacitance** of a pair of conductors with charges $+Q$ and $-Q$ and potential difference $V$ is

$$
C = \frac QV = \frac{\oint_S\epsilon\mathbf E\cdot\mathrm d\mathbf S}{-\int_-^+\mathbf E\cdot\mathrm d\mathbf l} ,
$$

in farads, where $S$ encloses the positive conductor and the path runs from the negative to the positive conductor.
:::

::: algorithm Computing capacitance {#alg-capacitance}
1. Place charges $\pm Q$ (or $\pm\rho_L$ per unit length) on the conductors.
2. Find $\mathbf D$ by Gauss's law, then $\mathbf E = \mathbf D/\epsilon$ in each dielectric region.
3. Integrate $\mathbf E$ from one conductor to the other to find $V$.
4. $C = Q/V$; the charge cancels. (Alternatively, assume $V$, solve Laplace's equation for the potential, and find $Q$ from $\rho_s = D_n$ on a conductor; see [[electromagnetics/boundary-value-problems]].)
:::

The three classical geometries follow at once. **Parallel plates** of area $A$ and separation $d$, neglecting fringing at the edges: $E = \rho_s/\epsilon = Q/(\epsilon A)$, $V = Ed$, so

$$
C = \frac{\epsilon A}{d} .
$$ {#eq-c-plates}

**Coaxial** conductors of radii $a < b$ and length $L$: from [[electromagnetics/electrostatics#ex-coax-design]] with $\epsilon_0\to\epsilon$, $V = (\rho_L/2\pi\epsilon)\ln(b/a)$, so

$$
C = \frac{2\pi\epsilon L}{\ln(b/a)} .
$$ {#eq-c-coax}

**Concentric spheres** of radii $a < b$: $V = (Q/4\pi\epsilon)(1/a - 1/b)$, so $C = 4\pi\epsilon ab/(b-a)$; letting $b\to\infty$, an **isolated sphere** has $C = 4\pi\epsilon a$.

::: example Capacitance of a coaxial cable {#ex-rg58}
A common $50\,\Omega$ coaxial cable has a solid inner conductor of diameter $0.90\,\mathrm{mm}$ and a polyethylene dielectric ($\epsilon_r = 2.25$) of diameter $2.95\,\mathrm{mm}$, inside the braided outer conductor. Find its capacitance per metre.
::: solution
$a = 0.45\,\mathrm{mm}$, $b = 1.475\,\mathrm{mm}$, so $\ln(b/a) = \ln 3.278 = 1.187$. By [[#eq-c-coax]],

$$
\frac CL = \frac{2\pi(2.25)(8.854\times10^{-12})}{1.187} = 1.05\times10^{-10}\,\mathrm{F/m} = 105\,\mathrm{pF/m}.
$$

Datasheets for this type of cable (RG-58) quote about $100\,\mathrm{pF/m}$; the braid makes the effective outer radius slightly larger than the dielectric radius. A $10\,\mathrm m$ cable therefore loads a source with about $1\,\mathrm{nF}$ at low frequencies, which is one reason a $10{:}1$ oscilloscope probe is used for high-impedance circuits.
:::
:::

When a capacitor contains several dielectric layers, the layers in series (stacked between the plates) share the same $D$ and their voltages add; layers side by side share the same $E$ and their charges add. Thus two layers of thicknesses $d_1$, $d_2$ stacked between plates of area $A$ give

$$
C = \frac{A}{d_1/\epsilon_1 + d_2/\epsilon_2},
$$

the series combination of $\epsilon_1A/d_1$ and $\epsilon_2A/d_2$.

::: example An air gap in solid insulation {#ex-air-gap}
Two plates $10\,\mathrm{mm}$ apart are insulated by a solid slab of $\epsilon_r = 5$, but the slab is only $9\,\mathrm{mm}$ thick and a $1\,\mathrm{mm}$ air gap remains. With $15\,\mathrm{kV}$ applied, find the field in each layer. Air breaks down at roughly $3\,\mathrm{MV/m}$.
::: solution
The flux density $D$ is the same in both layers (normal component continuous, no free charge at the interface), so $E_{\text{air}} = \epsilon_rE_{\text{solid}}$. The voltages add:

$$
V = E_{\text{air}}d_{\text{air}} + E_{\text{solid}}d_{\text{solid}} = E_{\text{air}}\left(d_{\text{air}} + \frac{d_{\text{solid}}}{\epsilon_r}\right),
$$

so $E_{\text{air}} = 15\times10^3/(10^{-3} + 1.8\times10^{-3}) = 5.36\,\mathrm{MV/m}$ and $E_{\text{solid}} = 1.07\,\mathrm{MV/m}$.

With no gap the solid would carry a uniform $1.5\,\mathrm{MV/m}$, comfortably within its strength. With the gap, the thin layer of air carries $5.36\,\mathrm{kV}$ of the $15\,\mathrm{kV}$ at a field far above what air can withstand, and it breaks down. Repeated **partial discharges** in such voids erode the solid insulation and are a leading cause of failure in high-voltage cables and machine windings; manufacturers test for them, and design to exclude voids.
:::
:::

::: widget plot
f: if(x < g, 1/(g + (1 - g)/er), 1/(er*(g + (1 - g)/er))); 1
x: 0, 1
y: 0, 6
sliders: g=0.1:0.01:0.9:0.01; er=5:1:20:0.5
labels: E/E_0; E_0
caption: Field across a parallel-plate gap (position as a fraction of the gap) with an air layer of relative thickness $g$ next to a solid of permittivity $\epsilon_r$, normalised to the field $E_0 = V/d$ with no solid. Make the air layer thin and the permittivity high: the air field approaches $\epsilon_r$ times $E_0$, while the solid is almost unstressed. Thin voids in good insulation are the dangerous case.
:::

::: quiz
A parallel-plate capacitor is charged to $Q$ and disconnected from the source. A slab of dielectric with $\epsilon_r = 4$ is then slid in to fill the gap completely. What happens to the voltage between the plates?
- [ ] It rises by a factor $4$.
- [x] It falls by a factor $4$.
- [ ] It stays the same, because the charge is unchanged.
- [ ] It falls by a factor $2$.
::: solution
With the source disconnected the free charge $Q$ is fixed, so $D = Q/A$ is fixed. The field $E = D/\epsilon$ drops by a factor $4$, and so does $V = Ed$. Equivalently $C$ rises by $4$ and $V = Q/C$ falls by $4$. (Had the source stayed connected, $V$ would stay fixed and the charge would rise fourfold instead.)
:::
:::

## Energy in the electric field

Charging a capacitor takes work: each increment of charge $\mathrm dq$ is moved through the existing voltage $v = q/C$. The total is $W = \int_0^Q(q/C)\,\mathrm dq = Q^2/(2C) = \tfrac12CV^2$. Where is this energy stored? The answer of field theory is: in the field, spread through the dielectric.

::: theorem Electrostatic energy {#thm-energy}
The energy needed to assemble a static charge distribution, or equivalently the energy stored in its field, is

$$
W_E = \frac12\int\rho_vV\,\mathrm dv = \frac12\int_{\text{all space}}\mathbf D\cdot\mathbf E\,\mathrm dv ,
$$ {#eq-we}

so that the field holds energy with density $w_E = \tfrac12\mathbf D\cdot\mathbf E = \tfrac12\epsilon E^2$ in $\mathrm{J/m^3}$.
:::

::: proof
Build the distribution by bringing in charge from infinity in small increments, scaling all densities together as $\lambda\rho_v$ with $\lambda$ rising from $0$ to $1$. At stage $\lambda$ the potential everywhere is $\lambda V$ (by linearity), and adding $\mathrm d\lambda\,\rho_v\,\mathrm dv$ at each point costs $\lambda V\rho_v\,\mathrm d\lambda\,\mathrm dv$. Integrating $\lambda$ from $0$ to $1$ gives $W_E = \tfrac12\int\rho_vV\,\mathrm dv$. Now replace $\rho_v$ by $\nabla\cdot\mathbf D$ and use the identity $\nabla\cdot(V\mathbf D) = V\nabla\cdot\mathbf D + \mathbf D\cdot\nabla V$:

$$
W_E = \frac12\int\nabla\cdot(V\mathbf D)\,\mathrm dv - \frac12\int\mathbf D\cdot\nabla V\,\mathrm dv = \frac12\oint_{S_\infty}V\mathbf D\cdot\mathrm d\mathbf S + \frac12\int\mathbf D\cdot\mathbf E\,\mathrm dv .
$$

For a bounded distribution $V\propto1/r$ and $D\propto1/r^2$ far away, while the surface area grows as $r^2$, so the surface integral vanishes as the surface recedes to infinity.
:::

For the parallel-plate capacitor, $w_E = \tfrac12\epsilon E^2$ is uniform and the volume is $Ad$, so $W_E = \tfrac12\epsilon(V/d)^2Ad = \tfrac12(\epsilon A/d)V^2 = \tfrac12CV^2$, as it must be. The energy formula is also a second route to capacitance: compute $W_E$ from the field, then $C = 2W_E/V^2$.

::: example Designing a film capacitor {#ex-film-design}
Design a $1\,\mathrm{\mu F}$ capacitor rated for $1\,\mathrm{kV}$ DC using polypropylene film ($\epsilon_r = 2.2$). Polypropylene breaks down at several hundred $\mathrm{MV/m}$; use a conservative working field of $100\,\mathrm{MV/m}$. Find the film thickness, the electrode area, the stored energy and the energy per unit volume of dielectric.
::: solution
The working field fixes the thickness: $d = V/E = 1000/10^8 = 10\,\mathrm{\mu m}$. The area follows from [[#eq-c-plates]]:

$$
A = \frac{Cd}{\epsilon} = \frac{(10^{-6})(10^{-5})}{(2.2)(8.854\times10^{-12})} = 0.513\,\mathrm{m^2}.
$$

Half a square metre is impractical as a flat plate, so the film is metallised and wound into a roll; a strip $3\,\mathrm{cm}$ wide must be $0.513/0.03 = 17.1\,\mathrm m$ long. (Winding two metallised films puts dielectric on both sides of each electrode, which doubles the capacitance per unit length, so about $8.6\,\mathrm m$ of each film suffices.) The stored energy is $\tfrac12CV^2 = \tfrac12(10^{-6})(10^6) = 0.5\,\mathrm J$, and the energy density is

$$
w_E = \tfrac12\epsilon E^2 = \tfrac12(2.2)(8.854\times10^{-12})(10^8)^2 = 9.74\times10^4\,\mathrm{J/m^3},
$$

about $0.1\,\mathrm{J/cm^3}$. Multiplying by the dielectric volume $Ad = 5.13\,\mathrm{cm^3}$ gives $0.5\,\mathrm J$ again. Because $w_E\propto\epsilon E^2$, the dielectric strength matters even more than the permittivity for energy storage.
:::
:::

### Resistance from capacitance

A capacitor whose dielectric has a small conductivity $\sigma$ also conducts. If the dielectric is uniform, the same field pattern carries both the flux and the leakage current, so

$$
RC = \frac{\int\mathbf E\cdot\mathrm d\mathbf l}{\int\sigma\mathbf E\cdot\mathrm d\mathbf S}\cdot\frac{\int\epsilon\mathbf E\cdot\mathrm d\mathbf S}{\int\mathbf E\cdot\mathrm d\mathbf l} = \frac\epsilon\sigma ,
$$ {#eq-rc}

independent of geometry: the self-discharge time of a capacitor is the relaxation time [[#eq-relaxation]] of its dielectric. Any capacitance formula gives a resistance formula; for example a coaxial cable with leaky insulation has leakage conductance $G = 2\pi\sigma L/\ln(b/a)$, one of the four line parameters of [[electromagnetics/transmission-lines]].

::: application Capacitive touch screens
A projected-capacitance touch screen has a grid of transparent indium-tin-oxide electrodes under the cover glass. The controller measures the mutual capacitance at each crossing of a row and a column electrode, a fraction of a picofarad. A finger is a conductor connected to a large capacitance (the body), and when it approaches it diverts some of the field lines that would have run from row to column, reducing their mutual capacitance by a small fraction. Scanning all crossings many times a second locates several fingers at once. The same physics, field lines terminating on the nearest conductor, governs the parasitic capacitance between adjacent tracks on a circuit board.
:::

::: history
The Leyden jar, a glass jar coated with metal foil inside and out, was invented independently by Ewald von Kleist in 1745 and Pieter van Musschenbroek in Leiden in 1746; it was the first capacitor. Benjamin Franklin showed around 1749 that its charge resides in the glass rather than in the water or metal. Michael Faraday measured the effect of different insulators in 1837, introducing the "specific inductive capacity" (our relative permittivity) and the word "dielectric". Georg Ohm published his law of conduction in 1827 in *Die galvanische Kette, mathematisch bearbeitet*, and Gustav Kirchhoff stated the current and voltage laws in 1845. The polarisation picture of dielectrics was developed by Ottaviano Mossotti (from 1846) and Rudolf Clausius (1879), whose relation links the permittivity to the polarisability of the molecules.
:::

## Where this leads

Capacitance, resistance and stored energy are the circuit parameters that field theory supplies. In [[electromagnetics/boundary-value-problems]] we compute them for geometries without enough symmetry for Gauss's law, by solving Laplace's equation. The magnetic counterparts, inductance and magnetic energy, follow in [[electromagnetics/magnetostatics]] and [[electromagnetics/induction-inductance]]. The boundary conditions of [[#thm-bc]] are extended to time-varying fields in [[electromagnetics/maxwells-equations]], where conductivity and permittivity combine into a single complex permittivity, and the capacitance and conductance per unit length computed here become two of the four parameters of [[electromagnetics/transmission-lines]]. Device physics, where $\sigma = e(n\mu_n + p\mu_p)$ is controlled by doping and fields, is the subject of [[semiconductor-devices]].

::: summary
- Current density $\mathbf J$ (in $\mathrm{A/m^2}$) obeys the continuity equation $\nabla\cdot\mathbf J = -\partial\rho_v/\partial t$; steady currents satisfy $\nabla\cdot\mathbf J = 0$, which is KCL.
- Ohm's law in point form is $\mathbf J = \sigma\mathbf E$; a uniform conductor has $R = L/(\sigma A)$.
- In equilibrium a conductor has $\mathbf E = \mathbf 0$ inside, is an equipotential, and has $E_t = 0$, $D_n = \rho_s$ at its surface; charge relaxes in a time $\epsilon/\sigma$.
- In a dielectric $\mathbf D = \epsilon_0\mathbf E + \mathbf P = \epsilon\mathbf E$ and $\nabla\cdot\mathbf D$ equals the free charge density.
- Boundary conditions: $E_{t1} = E_{t2}$ and $D_{n1} - D_{n2} = \rho_s$; field lines refract as $\tan\theta_1/\tan\theta_2 = \epsilon_1/\epsilon_2$.
- Capacitance $C = Q/V$: $\epsilon A/d$ for plates, $2\pi\epsilon L/\ln(b/a)$ for coax, $4\pi\epsilon a$ for an isolated sphere.
- Electric energy is stored in the field with density $\tfrac12\epsilon E^2$; for a uniform lossy dielectric $RC = \epsilon/\sigma$.
:::

## Exercises

::: exercise An aluminium conductor {level=1 check="100/(3.77e7*2.5e-6)"}
Find the resistance, in ohms, of $100\,\mathrm m$ of aluminium wire of cross-section $2.5\,\mathrm{mm^2}$ ($\sigma = 3.77\times10^7\,\mathrm{S/m}$).
::: solution
$R = L/(\sigma A) = 100/(3.77\times10^7\times2.5\times10^{-6}) = 1.06\,\Omega$.
:::
:::

::: exercise A small parallel-plate capacitor {level=1 check="4*8.854187817e-12*4e-4/1e-4"}
Plates of area $4\,\mathrm{cm^2}$ are separated by $0.1\,\mathrm{mm}$ of a dielectric with $\epsilon_r = 4$. Find the capacitance in farads, neglecting fringing.
::: solution
$C = \epsilon_r\epsilon_0A/d = 4(8.854\times10^{-12})(4\times10^{-4})/10^{-4} = 1.42\times10^{-10}\,\mathrm F = 142\,\mathrm{pF}$.
:::
:::

::: exercise Polarisation {level=1 check="8.854187817e-12*2*1e5"}
A dielectric with $\epsilon_r = 3$ carries a uniform field of $100\,\mathrm{kV/m}$. Find the polarisation, in $\mathrm{C/m^2}$.
::: solution
$P = \chi_e\epsilon_0E = (\epsilon_r - 1)\epsilon_0E = 2(8.854\times10^{-12})(10^5) = 1.77\times10^{-6}\,\mathrm{C/m^2}$.
:::
:::

::: exercise The capacitance of the Earth {level=2 check="4*pi*8.854187817e-12*6.371e6"}
Treat the Earth as an isolated conducting sphere of radius $6371\,\mathrm{km}$. Find its capacitance in farads, and the charge that would raise its potential by $1\,\mathrm{MV}$.
::: solution
$C = 4\pi\epsilon_0a = 4\pi(8.854\times10^{-12})(6.371\times10^6) = 7.09\times10^{-4}\,\mathrm F = 709\,\mathrm{\mu F}$. The charge is $Q = CV = 709\,\mathrm C$. A planet has the capacitance of a modest electrolytic capacitor: capacitance grows only linearly with size.
:::
:::

::: exercise Relaxation in sea water {level=2 check="81*8.854187817e-12/4"}
Sea water has $\sigma\approx4\,\mathrm{S/m}$ and $\epsilon_r\approx81$ at low frequencies. Find its charge relaxation time in seconds. Above roughly what frequency would you expect sea water to stop behaving as a good conductor?
::: solution
$\tau = \epsilon/\sigma = 81(8.854\times10^{-12})/4 = 1.79\times10^{-10}\,\mathrm s$. Conduction dominates over polarisation while the period is much longer than $\tau$, i.e. for $\omega\tau\ll1$, below about $1/(2\pi\tau)\approx0.9\,\mathrm{GHz}$. (This ratio $\sigma/\omega\epsilon$ reappears as the loss tangent in [[electromagnetics/plane-waves]].)
:::
:::

::: exercise Energy in a coaxial cable {level=2 check="0.5*2*pi*2.25*8.854187817e-12/log(1.475/0.45)*100^2"}
The cable of [[#ex-rg58]] is charged to $100\,\mathrm V$. Find the energy stored per metre, in joules, (a) from $\tfrac12CV^2$, (b) by integrating $\tfrac12\epsilon E^2$ over the dielectric.
::: solution
(a) $W' = \tfrac12(1.054\times10^{-10})(100)^2 = 5.27\times10^{-7}\,\mathrm{J/m}$.

(b) $E = V/(\rho\ln(b/a))$, so per metre

$$
W' = \int_a^b\frac12\epsilon\frac{V^2}{\rho^2\ln^2(b/a)}\,2\pi\rho\,\mathrm d\rho = \frac{\pi\epsilon V^2}{\ln^2(b/a)}\ln\frac ba = \frac12\cdot\frac{2\pi\epsilon}{\ln(b/a)}V^2,
$$

which is $\tfrac12C'V^2$ again.
:::
:::

::: exercise Surface charge on a conductor {level=2 check="2.25*8.854187817e-12*100/(0.45e-3*log(1.475/0.45))"}
For the cable of [[#ex-rg58]] at $100\,\mathrm V$, find the surface charge density on the inner conductor, in $\mathrm{C/m^2}$, and check that multiplying it by the circumference gives $C'V$.
::: solution
At $\rho = a$, $E = V/(a\ln(b/a)) = 100/(0.45\times10^{-3}\times1.187) = 1.872\times10^5\,\mathrm{V/m}$, and $\rho_s = D_n = \epsilon E = 2.25(8.854\times10^{-12})(1.872\times10^5) = 3.73\times10^{-6}\,\mathrm{C/m^2}$. Multiplying by $2\pi a = 2.827\times10^{-3}\,\mathrm m$ gives $1.05\times10^{-8}\,\mathrm{C/m}$, equal to $C'V = (1.054\times10^{-10})(100)$.
:::
:::

::: exercise A two-wire line {level=3}
Two parallel wires of radius $a$ have centres a distance $D\gg a$ apart, in a medium of permittivity $\epsilon$. Treating them as line charges $\pm\rho_L$ on their axes, show that the capacitance per unit length is approximately $C' = \pi\epsilon/\ln(D/a)$. Evaluate it for $a = 0.5\,\mathrm{mm}$, $D = 10\,\mathrm{mm}$ in air.
::: hint
By superposition of [[electromagnetics/electrostatics#eq-line-field]], the potential of a line charge is $-(\rho_L/2\pi\epsilon)\ln\rho$ plus a constant. Evaluate the total potential on the surface of each wire.
:::
::: solution
The potential of the pair at a point at distances $\rho_+$ and $\rho_-$ from the two axes is $V = (\rho_L/2\pi\epsilon)\ln(\rho_-/\rho_+)$. On the surface of the positive wire, $\rho_+ = a$ and $\rho_-\approx D$, so $V_+\approx(\rho_L/2\pi\epsilon)\ln(D/a)$; by symmetry $V_- = -V_+$. Thus $V = V_+ - V_- = (\rho_L/\pi\epsilon)\ln(D/a)$ and $C' = \rho_L/V = \pi\epsilon/\ln(D/a)$. (The exact result, from the circular equipotentials in the figure of [[electromagnetics/electrostatics]], replaces $\ln(D/a)$ by $\operatorname{arccosh}(D/2a)$.) Numerically $C' = \pi(8.854\times10^{-12})/\ln20 = 9.29\,\mathrm{pF/m}$, an order of magnitude below a coaxial cable.
:::
:::

::: exercise Self-discharge {level=3 check="2.2*8.854187817e-12/1e-16"}
Show that [[#eq-rc]] holds for a parallel-plate capacitor with a uniform dielectric of conductivity $\sigma$, and use it to find the self-discharge time constant, in seconds, of the film capacitor of [[#ex-film-design]] if the polypropylene has $\sigma = 10^{-16}\,\mathrm{S/m}$. What leakage resistance does that correspond to?
::: solution
For plates, $R = d/(\sigma A)$ and $C = \epsilon A/d$, so $RC = \epsilon/\sigma$. With the numbers, $\tau = (2.2)(8.854\times10^{-12})/10^{-16} = 1.95\times10^5\,\mathrm s$, a little over two days, and $R = \tau/C = 1.95\times10^{11}\,\Omega$. In practice the leakage of film capacitors is set by surface paths and the end connections as much as by the bulk film, and is quoted as an insulation resistance–capacitance product in seconds, exactly this $RC$.
:::
:::
