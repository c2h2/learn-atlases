The two previous chapters treated charges at rest and currents that never change. Each produced a pair of differential equations: $\nabla\cdot\mathbf E = \rho/\varepsilon_0$ and $\nabla\times\mathbf E = \mathbf 0$ for electrostatics, $\nabla\cdot\mathbf B = 0$ and $\nabla\times\mathbf B = \mu_0\mathbf J$ for magnetostatics. When fields change in time, two of the four equations change. Faraday's law of induction couples the curl of $\mathbf E$ to the rate of change of $\mathbf B$. And Ampère's law, as written, contradicts the conservation of charge; Maxwell's repair adds a term that couples the curl of $\mathbf B$ to the rate of change of $\mathbf E$. With that term the four equations become a closed dynamical theory whose solutions include light.

The introductory chapter [[magnetism/maxwell]] stated the equations and derived the wave equation. Here we take the equations as the starting point and extract their conservation laws. Energy is stored in the field with density $\frac12\varepsilon_0E^2 + B^2/2\mu_0$ and flows with the **Poynting vector** $\mathbf S = \mathbf E\times\mathbf B/\mu_0$. Momentum is stored with density $\mathbf S/c^2$ and flows with the **Maxwell stress tensor**. We shall see that the energy delivered to a resistor arrives through the empty space around the wire, not along it, and compute the force between two charges without ever looking at the charges. Finally, the potentials $V$ and $\mathbf A$ are generalised to time-dependent fields, and the gauge freedom met in [[electrodynamics/magnetostatics]] is used to turn Maxwell's equations into wave equations with sources, the form solved in [[electrodynamics/radiation]].

Faraday's law and inductance are as in [[magnetism/faraday]] and [[magnetism/inductance]]; the vector identities are those of [[math-methods/vector-calculus]]. We use $c = 2.99792458\times10^{8}\,\mathrm{m/s}$, $\varepsilon_0 = 8.8541878128\times10^{-12}\,\mathrm{F/m}$ and $\mu_0 = 1.25663706212\times10^{-6}\,\mathrm{N/A^2}$, with $\mu_0\varepsilon_0 = 1/c^2$.

## Charge conservation and the displacement current {#displacement}

Charge is conserved locally: if the charge in a volume $\mathcal V$ decreases, it is because current flows out through the boundary. In integral and differential form,

$$
\deriv{}{t}\int_{\mathcal V}\rho\,\dd\tau = -\oint_{\partial\mathcal V}\mathbf J\cdot\dd\mathbf a, \qquad \frac{\partial\rho}{\partial t} + \nabla\cdot\mathbf J = 0 .
$$ {#eq-continuity}

The differential form follows from the integral form by the divergence theorem, because the volume is arbitrary. This **continuity equation** is not an extra assumption beyond what is known experimentally: no process has ever been observed to create or destroy net charge.

Now take the divergence of the magnetostatic Ampère law $\nabla\times\mathbf B = \mu_0\mathbf J$. The left side is the divergence of a curl, identically zero. The right side is $-\mu_0\,\partial\rho/\partial t$ by [[#eq-continuity]], which is not zero while a capacitor charges. Ampère's law cannot be right for changing fields. Maxwell's resolution adds to $\mathbf J$ the quantity whose divergence restores consistency. Gauss's law, $\rho = \varepsilon_0\nabla\cdot\mathbf E$, holds at every instant, so

$$
\nabla\cdot\left(\mathbf J + \varepsilon_0\frac{\partial\mathbf E}{\partial t}\right) = \nabla\cdot\mathbf J + \frac{\partial\rho}{\partial t} = 0 .
$$

::: definition Displacement current {#def-displacement}
The **displacement current density** is $\mathbf J_d = \varepsilon_0\,\partial\mathbf E/\partial t$. The **Ampère–Maxwell law** is

$$
\nabla\times\mathbf B = \mu_0\mathbf J + \mu_0\varepsilon_0\frac{\partial\mathbf E}{\partial t} .
$$ {#eq-ampere-maxwell}
:::

The added term is not forced by consistency alone: any divergence-free addition would also do. It is the simplest one, and its consequences, above all the existence of electromagnetic waves travelling at $1/\sqrt{\mu_0\varepsilon_0}$, were confirmed by Hertz. Its size is tiny in most circuits. In copper at $1\,\mathrm{GHz}$, the ratio of displacement to conduction current is $\omega\varepsilon_0/\sigma\approx10^{-9}$, so inside metals it can always be dropped. In empty space it is the only current there is, and that is where it matters.

::: example The magnetic field inside a charging capacitor {#ex-capacitor}
A parallel-plate capacitor with circular plates of radius $R = 5.00\,\mathrm{cm}$ is charged by a steady current $I = 1.00\,\mathrm{A}$. Neglecting fringing, find $B$ between the plates as a function of the distance $s$ from the axis, and its value at the rim.
::: solution
Between the plates the field is uniform, $E = \sigma/\varepsilon_0 = Q/(\varepsilon_0\pi R^2)$, so

$$
\varepsilon_0\frac{\partial E}{\partial t} = \frac{1}{\pi R^2}\deriv{Q}{t} = \frac{I}{\pi R^2}.
$$

The total displacement current through the gap, $I_d = \varepsilon_0\,\dot E\,\pi R^2 = I$, equals the conduction current in the wires: the current is continuous through the capacitor if displacement current is counted. By symmetry $\mathbf B$ is azimuthal. Integrating [[#eq-ampere-maxwell]] over a disc of radius $s$ parallel to the plates and applying Stokes' theorem, with no conduction current through the disc,

$$
B\cdot2\pi s = \mu_0\varepsilon_0\frac{\partial E}{\partial t}\pi s^2 = \mu_0I\frac{s^2}{R^2} \quad(s\le R), \qquad B\cdot2\pi s = \mu_0I \quad(s\ge R).
$$

So $B = \mu_0Is/(2\pi R^2)$ inside and $B = \mu_0I/(2\pi s)$ outside: exactly the field of a wire of radius $R$ carrying $I$ uniformly. At the rim,

$$
B = \frac{\mu_0I}{2\pi R} = \frac{(4\pi\times10^{-7})(1.00)}{2\pi(0.0500)} = 4.00\times10^{-6}\,\mathrm{T}.
$$

The rate of change of the electric field needed to produce this is $\dot E = I/(\varepsilon_0\pi R^2) = 1.44\times10^{13}\,\mathrm{V\,m^{-1}\,s^{-1}}$, which is why the effect was not discovered by accident. It was first measured directly in the twentieth century; the indirect evidence, electromagnetic waves, came first.
:::
:::

::: widget plot
f: min(x, 1/x); 1/x
x: 0, 4
y: 0, 2
labels: B in the capacitor gap; B of a thin wire
caption: The field $B$ against distance $s$ from the axis, in units where the plate radius $R$ is $1$ and $\mu_0I/2\pi R$ is $1$. Inside the gap $B$ grows linearly with $s$, because a larger loop encloses more displacement current; outside it falls as $1/s$, matching the field of the wire that feeds the capacitor (the second curve) for $s > R$. Notice that nothing distinguishes the region outside the gap from the region outside the wire: a magnetometer at $s > R$ cannot tell whether the current through its loop is carried by electrons or by a changing electric field.
:::

## Maxwell's equations {#equations}

With the displacement current, the laws of electromagnetism are complete.

::: definition Maxwell's equations {#def-maxwell}
In vacuum, with charge density $\rho$ and current density $\mathbf J$ as sources,

$$
\begin{aligned}
\nabla\cdot\mathbf E &= \frac{\rho}{\varepsilon_0}, &\qquad \nabla\times\mathbf E &= -\frac{\partial\mathbf B}{\partial t},\\
\nabla\cdot\mathbf B &= 0, &\qquad \nabla\times\mathbf B &= \mu_0\mathbf J + \mu_0\varepsilon_0\frac{\partial\mathbf E}{\partial t}.
\end{aligned}
$$ {#eq-maxwell}

Together with the **Lorentz force** $\mathbf F = q(\mathbf E + \mathbf v\times\mathbf B)$ they constitute classical electrodynamics. In matter, with free charge $\rho_f$ and free current $\mathbf J_f$, and with $\mathbf D = \varepsilon_0\mathbf E + \mathbf P$ and $\mathbf H = \mathbf B/\mu_0 - \mathbf M$,

$$
\nabla\cdot\mathbf D = \rho_f, \qquad \nabla\times\mathbf E = -\frac{\partial\mathbf B}{\partial t}, \qquad \nabla\cdot\mathbf B = 0, \qquad \nabla\times\mathbf H = \mathbf J_f + \frac{\partial\mathbf D}{\partial t}.
$$ {#eq-maxwell-matter}
:::

In matter, a changing polarisation is a current: $\mathbf J_p = \partial\mathbf P/\partial t$ is the motion of bound charge, and it is part of $\partial\mathbf D/\partial t$. The two homogeneous equations (those without sources) are the same in vacuum and in matter.

::: proposition Maxwell's equations imply charge conservation {#prop-continuity}
If $\mathbf E$ and $\mathbf B$ satisfy [[#eq-maxwell]], then $\rho$ and $\mathbf J$ satisfy the continuity equation [[#eq-continuity]]. Likewise, $\nabla\cdot\mathbf B = 0$ at all times if it holds at one instant.
:::

::: proof
Take the divergence of the Ampère–Maxwell law. The left side vanishes, so $0 = \mu_0\nabla\cdot\mathbf J + \mu_0\varepsilon_0\,\partial_t(\nabla\cdot\mathbf E) = \mu_0(\nabla\cdot\mathbf J + \partial_t\rho)$, using Gauss's law. For the second claim, take the divergence of Faraday's law: $\partial_t(\nabla\cdot\mathbf B) = -\nabla\cdot(\nabla\times\mathbf E) = 0$, so $\nabla\cdot\mathbf B$ is constant in time.
:::

So the two divergence equations are, in a sense, initial conditions: the curl equations evolve the fields, and they preserve Gauss's law and $\nabla\cdot\mathbf B = 0$ once these hold. Counting confirms that the system is well posed: six field components, six evolution equations.

The boundary conditions across an interface follow from the integral forms exactly as in statics, because the time-derivative terms are integrated over a pillbox or loop of vanishing size and drop out. With $\hat{\mathbf n}$ pointing from medium 1 to medium 2,

| field | condition |
|---|---|
| normal $\mathbf D$ | $D_2^\perp - D_1^\perp = \sigma_f$ |
| normal $\mathbf B$ | $B_2^\perp = B_1^\perp$ |
| tangential $\mathbf E$ | $\mathbf E_2^\parallel = \mathbf E_1^\parallel$ |
| tangential $\mathbf H$ | $\mathbf H_2^\parallel - \mathbf H_1^\parallel = \mathbf K_f\times\hat{\mathbf n}$ |

These four conditions are what fix reflection and refraction in [[electrodynamics/waves-in-media]].

In empty space, taking the curl of Faraday's law and substituting the Ampère–Maxwell law gives $\nabla^2\mathbf E = \mu_0\varepsilon_0\,\partial_t^2\mathbf E$, and the same for $\mathbf B$: waves with speed $1/\sqrt{\mu_0\varepsilon_0}$. With the CODATA values above this is $2.99792458\times10^{8}\,\mathrm{m/s}$; today the agreement is built into the SI, with $c$ exact since 1983 and $\mu_0$ a measured quantity since 2019, but in 1862 it was Maxwell's discovery that light is an electromagnetic wave. The derivation is in [[magnetism/maxwell]].

::: quiz
Which of Maxwell's equations would have to change if magnetic monopoles were discovered?
- [x] $\nabla\cdot\mathbf B = 0$ would acquire a magnetic charge density.
- [x] Faraday's law would acquire a magnetic current density.
- [ ] Gauss's law for $\mathbf E$.
- [ ] None: monopoles are already allowed.
::: solution
A magnetic charge density $\rho_m$ would be the source of $\nabla\cdot\mathbf B$. Its conservation would then require, by the same argument that gave the displacement current, a magnetic current term in $\nabla\times\mathbf E$: take the divergence of Faraday's law and compare with $\partial_t\nabla\cdot\mathbf B$. The equations for $\mathbf E$'s divergence and $\mathbf B$'s curl would be untouched. Searches have found no monopoles; Dirac showed in 1931 that if even one exists, electric charge must be quantised.
:::
:::

## Energy: Poynting's theorem {#poynting}

The force on a charge $q$ moving with velocity $\mathbf v$ does work at the rate $\mathbf F\cdot\mathbf v = q\mathbf E\cdot\mathbf v$, since the magnetic force is perpendicular to $\mathbf v$. For a continuous distribution the rate of work per unit volume is $\mathbf J\cdot\mathbf E$. Maxwell's equations let us write this entirely in terms of the fields.

::: theorem Poynting's theorem {#thm-poynting}
Define the **energy density** and the **Poynting vector**

$$
u = \frac{\varepsilon_0}{2}E^2 + \frac{1}{2\mu_0}B^2, \qquad \mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B .
$$ {#eq-u-S}

Then at every point

$$
\frac{\partial u}{\partial t} + \nabla\cdot\mathbf S = -\mathbf J\cdot\mathbf E ,
$$ {#eq-poynting}

and for any fixed volume $\mathcal V$ with boundary $\partial\mathcal V$,

$$
\deriv{W_{\mathrm{mech}}}{t} = -\deriv{}{t}\int_{\mathcal V}u\,\dd\tau - \oint_{\partial\mathcal V}\mathbf S\cdot\dd\mathbf a ,
$$

where $\dd W_{\mathrm{mech}}/\dd t = \int_{\mathcal V}\mathbf J\cdot\mathbf E\,\dd\tau$ is the rate at which the field does work on the charges in $\mathcal V$.
:::

::: proof
Solve the Ampère–Maxwell law for the current, $\mathbf J = \mu_0^{-1}\nabla\times\mathbf B - \varepsilon_0\,\partial_t\mathbf E$, and dot with $\mathbf E$:

$$
\mathbf J\cdot\mathbf E = \frac{1}{\mu_0}\mathbf E\cdot(\nabla\times\mathbf B) - \varepsilon_0\mathbf E\cdot\frac{\partial\mathbf E}{\partial t}.
$$

The product rule for the divergence of a cross product is $\nabla\cdot(\mathbf E\times\mathbf B) = \mathbf B\cdot(\nabla\times\mathbf E) - \mathbf E\cdot(\nabla\times\mathbf B)$. With Faraday's law, $\mathbf B\cdot(\nabla\times\mathbf E) = -\mathbf B\cdot\partial_t\mathbf B$, so

$$
\mathbf E\cdot(\nabla\times\mathbf B) = -\mathbf B\cdot\frac{\partial\mathbf B}{\partial t} - \nabla\cdot(\mathbf E\times\mathbf B).
$$

Substitute, and use $\mathbf E\cdot\partial_t\mathbf E = \frac12\partial_t(E^2)$ and $\mathbf B\cdot\partial_t\mathbf B = \frac12\partial_t(B^2)$:

$$
\mathbf J\cdot\mathbf E = -\frac{\partial}{\partial t}\left(\frac{\varepsilon_0}{2}E^2 + \frac{1}{2\mu_0}B^2\right) - \frac{1}{\mu_0}\nabla\cdot(\mathbf E\times\mathbf B),
$$

which is [[#eq-poynting]]. Integrating over $\mathcal V$, taking the time derivative outside the integral (the volume is fixed), and applying the divergence theorem to the last term gives the integral form.
:::

The theorem is a local conservation law of the same shape as [[#eq-continuity]], with a sink: energy in the field decreases either because it flows out through the boundary or because it is handed to the charges. In a linear medium the same derivation, with [[#eq-maxwell-matter]] and $\mathbf J_f$ in place of $\mathbf J$, gives $\mathbf S = \mathbf E\times\mathbf H$ and $u = \frac12(\mathbf E\cdot\mathbf D + \mathbf B\cdot\mathbf H)$.

::: example Where a resistor's energy comes from {#ex-wire}
A long straight wire of radius $a$ and resistance per unit length $r$ carries a steady current $I$. Find the Poynting vector at its surface and the total power flowing into a length $L$.
::: solution
The current is steady, so the fields are static, and $\partial u/\partial t = 0$. Inside the wire $\mathbf E = (Ir)\hat{\mathbf z}$, uniform along the wire, and tangential $\mathbf E$ is continuous, so just outside the surface $\mathbf E$ has the same axial component. The magnetic field at the surface is $\mathbf B = \frac{\mu_0I}{2\pi a}\hat{\boldsymbol\phi}$. Then

$$
\mathbf S = \frac{1}{\mu_0}(Ir)\hat{\mathbf z}\times\frac{\mu_0I}{2\pi a}\hat{\boldsymbol\phi} = \frac{I^2r}{2\pi a}(\hat{\mathbf z}\times\hat{\boldsymbol\phi}) = -\frac{I^2r}{2\pi a}\hat{\mathbf s},
$$

pointing radially *into* the wire. Over the cylindrical surface of length $L$ and area $2\pi aL$ the inward flux is

$$
P = \frac{I^2r}{2\pi a}\cdot2\pi aL = I^2(rL) = I^2R ,
$$

exactly the Joule heating. By [[#thm-poynting]] with $\partial_t u = 0$, the power delivered to the charges in the wire equals the inward flux of $\mathbf S$. The energy does not travel down the inside of the wire with the electrons. It flows through the space around the circuit, from the battery, where $\mathbf S$ points outward, to the resistor, where it points inward. For a $1\,\mathrm{m}$ length of wire of radius $0.500\,\mathrm{mm}$ carrying $2.00\,\mathrm{A}$ with $10.0\,\mathrm{V}$ across it, $S = 6.37\,\mathrm{kW/m^2}$ at the surface, and $S\times2\pi aL = 20.0\,\mathrm{W} = VI$.
:::
:::

::: example Power down a coaxial cable {#ex-coax}
A coaxial cable has an inner conductor of radius $a$ and an outer conductor of radius $b$. The inner conductor is at potential $V$ relative to the outer and carries current $I$ along $+\hat{\mathbf z}$, returning along the outer conductor. Treat the conductors as perfect and the fields as static. Find $\mathbf S$ between the conductors and the total power transmitted.
::: solution
Between the conductors, Gauss's law gives a radial field $E = \lambda/(2\pi\varepsilon_0s)$, and $V = \int_a^bE\,\dd s = (\lambda/2\pi\varepsilon_0)\ln(b/a)$, so $\mathbf E = \frac{V}{s\ln(b/a)}\hat{\mathbf s}$. Ampère's law gives $\mathbf B = \frac{\mu_0I}{2\pi s}\hat{\boldsymbol\phi}$. Since $\hat{\mathbf s}\times\hat{\boldsymbol\phi} = \hat{\mathbf z}$,

$$
\mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B = \frac{VI}{2\pi s^2\ln(b/a)}\hat{\mathbf z},
$$

along the cable, in the insulating space between the conductors. The power through the annulus is

$$
P = \int_a^b\frac{VI}{2\pi s^2\ln(b/a)}2\pi s\,\dd s = \frac{VI}{\ln(b/a)}\int_a^b\frac{\dd s}{s} = VI .
$$

The circuit formula $P = VI$ is the flux of the Poynting vector. Nothing flows inside perfect conductors, where $\mathbf E = \mathbf 0$; with finite conductivity a small axial $\mathbf E$ appears in the metal, $\mathbf S$ acquires a radial component, and the energy flowing into the walls is the resistive loss of [[#ex-wire]].
:::
:::

::: example Filling a capacitor with energy {#ex-cap-energy}
For the capacitor of [[#ex-capacitor]], with plate separation $d$, show that the Poynting vector at the rim of the gap accounts for the rate of increase of the stored energy.
::: solution
At the rim $s = R$, $\mathbf E = E\hat{\mathbf z}$ and $\mathbf B = \frac{\mu_0I}{2\pi R}\hat{\boldsymbol\phi}$. Then $\mathbf S = \frac{EI}{2\pi R}(\hat{\mathbf z}\times\hat{\boldsymbol\phi}) = -\frac{EI}{2\pi R}\hat{\mathbf s}$: energy flows into the gap through its open sides. Through the cylindrical side of area $2\pi Rd$, the inward power is $EId = VI$, with $V = Ed$ the voltage across the plates. The stored energy is $U = \frac12CV^2$ with $C\,\dd V/\dd t = I$, so $\dd U/\dd t = CV\,\dd V/\dd t = VI$. The field energy inside the gap is $u\,\pi R^2d$ with $u = \frac12\varepsilon_0E^2$ (the magnetic energy, quadratic in $I$, is constant for constant $I$), and its rate of change is $\varepsilon_0E\dot E\,\pi R^2d = EId$, the same. The energy enters from the side, not through the wires and plates.
:::
:::

For a plane wave $\mathbf E = E_0\cos(kz - \omega t)\hat{\mathbf x}$, $\mathbf B = (E_0/c)\cos(kz - \omega t)\hat{\mathbf y}$, the two energy densities are equal, $\frac12\varepsilon_0E^2 = B^2/2\mu_0$, and $\mathbf S = cu\,\hat{\mathbf z}$: the energy moves at $c$. The time-averaged flux, the **intensity**, is $I = \langle S\rangle = \frac12c\varepsilon_0E_0^2$.

::: widget wave
A: 1
B: 1
k: 2
w: 3
caption: Two waves of equal amplitude travelling in opposite directions, here one component of $\mathbf E$. Their sum is a standing wave, like the field in front of a mirror: press play and notice that the nodes do not move. Each travelling wave carries intensity $\frac12c\varepsilon_0E_0^2$, in opposite directions, so the average Poynting vector of the standing wave is zero. Energy still moves: it sloshes back and forth between the antinodes of $\mathbf E$ and those of $\mathbf B$, which are a quarter wavelength apart and a quarter period out of step, and $\mathbf S$ oscillates about zero. Set the second amplitude to $0$ to recover a single wave carrying energy steadily to the right.
:::

::: example Sunlight {#ex-sunlight}
The solar intensity above the atmosphere at the Earth's distance is $1361\,\mathrm{W/m^2}$. Find the amplitudes of $\mathbf E$ and $\mathbf B$, treating sunlight as a single plane wave.
::: solution
From $I = \frac12c\varepsilon_0E_0^2$,

$$
E_0 = \sqrt{\frac{2I}{c\varepsilon_0}} = \sqrt{\frac{2(1361)}{(2.998\times10^8)(8.854\times10^{-12})}} = 1.01\times10^{3}\,\mathrm{V/m},
$$

and $B_0 = E_0/c = 3.38\times10^{-6}\,\mathrm{T}$, about a fifteenth of the Earth's static field. Sunlight is not a single plane wave (it is incoherent and unpolarised), so these are effective root-mean-square amplitudes multiplied by $\sqrt2$, but the energy bookkeeping is right.
:::
:::

## Momentum and the Maxwell stress tensor {#stress}

Fields carry momentum as well as energy. To find it, compute the total electromagnetic force on the charges in a volume and write it, using Maxwell's equations, entirely in terms of the fields.

::: theorem Momentum conservation and the stress tensor {#thm-stress}
Define the **Maxwell stress tensor**

$$
T_{ij} = \varepsilon_0\left(E_iE_j - \tfrac12\delta_{ij}E^2\right) + \frac{1}{\mu_0}\left(B_iB_j - \tfrac12\delta_{ij}B^2\right).
$$ {#eq-stress}

The Lorentz force density $\mathbf f = \rho\mathbf E + \mathbf J\times\mathbf B$ satisfies

$$
f_i = \sum_j\partial_jT_{ij} - \mu_0\varepsilon_0\frac{\partial S_i}{\partial t},
$$

so the total force on the charges in a fixed volume $\mathcal V$ is

$$
\mathbf F = \oint_{\partial\mathcal V}\overleftrightarrow{\mathbf T}\cdot\dd\mathbf a - \deriv{}{t}\int_{\mathcal V}\mathbf g\,\dd\tau, \qquad \mathbf g = \mu_0\varepsilon_0\mathbf S = \frac{\mathbf S}{c^2}.
$$ {#eq-momentum}

The vector $\mathbf g$ is the **momentum density** of the field, and $-\overleftrightarrow{\mathbf T}$ is its momentum flux.
:::

::: proof
Eliminate the sources with Gauss's law and the Ampère–Maxwell law, $\rho = \varepsilon_0\nabla\cdot\mathbf E$ and $\mathbf J = \mu_0^{-1}\nabla\times\mathbf B - \varepsilon_0\partial_t\mathbf E$:

$$
\mathbf f = \varepsilon_0(\nabla\cdot\mathbf E)\mathbf E + \frac{1}{\mu_0}(\nabla\times\mathbf B)\times\mathbf B - \varepsilon_0\frac{\partial\mathbf E}{\partial t}\times\mathbf B .
$$

By the product rule and Faraday's law, $\partial_t(\mathbf E\times\mathbf B) = \partial_t\mathbf E\times\mathbf B - \mathbf E\times(\nabla\times\mathbf E)$, so the last term is $-\varepsilon_0\partial_t(\mathbf E\times\mathbf B) - \varepsilon_0\mathbf E\times(\nabla\times\mathbf E)$. Add the term $\mu_0^{-1}(\nabla\cdot\mathbf B)\mathbf B$, which is zero, to make the expression symmetric between $\mathbf E$ and $\mathbf B$:

$$
\mathbf f = \varepsilon_0\bigl[(\nabla\cdot\mathbf E)\mathbf E - \mathbf E\times(\nabla\times\mathbf E)\bigr] + \frac{1}{\mu_0}\bigl[(\nabla\cdot\mathbf B)\mathbf B - \mathbf B\times(\nabla\times\mathbf B)\bigr] - \varepsilon_0\frac{\partial}{\partial t}(\mathbf E\times\mathbf B).
$$

The identity $\mathbf E\times(\nabla\times\mathbf E) = \frac12\nabla(E^2) - (\mathbf E\cdot\nabla)\mathbf E$ gives, in components,

$$
\bigl[(\nabla\cdot\mathbf E)\mathbf E + (\mathbf E\cdot\nabla)\mathbf E - \tfrac12\nabla(E^2)\bigr]_i = \sum_j\partial_j\bigl(E_iE_j - \tfrac12\delta_{ij}E^2\bigr),
$$

and the same for $\mathbf B$. Since $\varepsilon_0\mathbf E\times\mathbf B = \mu_0\varepsilon_0\mathbf S$, this is the stated local law. Integrating over $\mathcal V$ and applying the divergence theorem to $\partial_jT_{ij}$ gives [[#eq-momentum]].
:::

The diagonal entries of $T_{ij}$ are pressures and tensions. For a field along $\hat{\mathbf z}$, $T_{zz} = +\frac12\varepsilon_0E^2$ and $T_{xx} = T_{yy} = -\frac12\varepsilon_0E^2$: field lines behave as if under tension along their length and pushing each other apart sideways, which was exactly Faraday's intuition. A static conductor surface feels an outward pressure $\frac12\varepsilon_0E^2 = \sigma^2/2\varepsilon_0$, the electrostatic pressure of [[electrostatics/capacitance]].

::: example Repulsion of two hemispheres {#ex-hemisphere}
A thin spherical shell of radius $R$ carries total charge $Q$ uniformly. Use the stress tensor to find the force with which the northern hemisphere is pushed away from the southern one. Evaluate for $Q = 1.00\,\mu\mathrm{C}$ and $R = 10.0\,\mathrm{cm}$.
::: solution
The fields are static, so $\mathbf g$ is constant and the force on the charges inside a closed surface is $\oint\overleftrightarrow{\mathbf T}\cdot\dd\mathbf a$. Choose a surface enclosing the northern hemisphere and nothing else: the equatorial plane $z = 0$, closed by a hemisphere at infinity. On the hemisphere at infinity $T\sim1/r^4$ and the area $\sim r^2$, so it contributes nothing.

On the equatorial plane, the outward normal of the enclosed region is $-\hat{\mathbf z}$. For $s<R$, inside the shell, $\mathbf E = \mathbf 0$. For $s>R$, $\mathbf E = \frac{Q}{4\pi\varepsilon_0s^2}\hat{\mathbf s}$ lies in the plane, so $E_z = 0$ and $T_{zz} = -\frac12\varepsilon_0E^2$. The $z$-component of the force is

$$
F_z = \int T_{zz}\,(-1)\,\dd a = \frac{\varepsilon_0}{2}\int_R^\infty\left(\frac{Q}{4\pi\varepsilon_0s^2}\right)^2 2\pi s\,\dd s = \frac{Q^2}{16\pi\varepsilon_0}\int_R^\infty\frac{\dd s}{s^3} = \frac{Q^2}{32\pi\varepsilon_0R^2}.
$$

The force is positive, upward: the hemispheres repel. Numerically,

$$
F = \frac{(1.00\times10^{-6})^2}{32\pi(8.854\times10^{-12})(0.100)^2} = 0.112\,\mathrm{N}.
$$

As a check, the outward pressure on the shell is $\sigma^2/2\varepsilon_0$ with $\sigma = Q/4\pi R^2$; its $z$-component integrated over the hemisphere is the pressure times the projected area $\pi R^2$, which gives the same $Q^2/(32\pi\varepsilon_0R^2)$. The stress tensor found the force from the field on a plane that does not even touch the charges.
:::
:::

For a plane wave the momentum density is $g = u/c$, and momentum flows at $c$ along $\hat{\mathbf k}$. An absorbing surface facing the wave receives momentum per unit area per unit time $\langle S\rangle/c$, the **radiation pressure**; a perfect reflector receives twice that. For sunlight at the Earth, $1361/c = 4.54\,\mu\mathrm{Pa}$. Small, but it shapes comet tails and is used to steer spacecraft.

::: example Radiation pressure as a Lorentz force {#ex-mirror}
A plane wave $E_0\cos(kz - \omega t)\hat{\mathbf x}$ in $z<0$ falls normally on a perfect conductor filling $z>0$. Find the surface current on the conductor and show that the magnetic force on it gives the pressure $2\langle S\rangle/c$.
::: solution
Tangential $\mathbf E$ must vanish at $z = 0$, so there is a reflected wave $-E_0\cos(kz + \omega t)\hat{\mathbf x}$, whose magnetic field, for propagation along $-\hat{\mathbf z}$, is $(E_0/c)\cos(kz + \omega t)\hat{\mathbf y}$. At the surface the total magnetic field is $\mathbf B = (2E_0/c)\cos\omega t\,\hat{\mathbf y}$ on the vacuum side and zero inside. By the boundary condition on tangential $\mathbf H$, with the normal $-\hat{\mathbf z}$ from metal to vacuum, the surface current is

$$
\mathbf K = \frac{2E_0}{\mu_0c}\cos\omega t\,\hat{\mathbf x}.
$$

A current sheet feels the average of the fields on its two sides, $\frac12(2E_0/c)\cos\omega t\,\hat{\mathbf y}$, so the force per unit area is

$$
\mathbf K\times\mathbf B_{\mathrm{avg}} = \frac{2E_0^2}{\mu_0c^2}\cos^2\omega t\,(\hat{\mathbf x}\times\hat{\mathbf y}) = 2\varepsilon_0E_0^2\cos^2\omega t\,\hat{\mathbf z},
$$

into the conductor. Its time average is $\varepsilon_0E_0^2 = 2\cdot\frac12c\varepsilon_0E_0^2/c = 2\langle S\rangle/c$. The pressure of light on a mirror is the magnetic force on the currents the light induces, which is the stress tensor's answer seen from the side of the charges.
:::
:::

::: remark Angular momentum in static fields
The field also stores angular momentum, with density $\mathbf r\times\mathbf g$. It can be non-zero even when nothing moves: a charge near a magnetic dipole has $\mathbf E\times\mathbf B\ne\mathbf 0$ around it. If the magnet's current is switched off, the induced electric field exerts a torque on the charge, and mechanical angular momentum appears, taken from the field. This is the "Feynman disc paradox" (*The Feynman Lectures on Physics*, vol. II, §17-4); without field angular momentum the system would violate the conservation of angular momentum.
:::

## Potentials and gauges {#potentials}

For time-dependent fields, $\nabla\cdot\mathbf B = 0$ still allows $\mathbf B = \nabla\times\mathbf A$. But $\mathbf E$ is no longer curl-free. Substituting into Faraday's law,

$$
\nabla\times\left(\mathbf E + \frac{\partial\mathbf A}{\partial t}\right) = \mathbf 0 ,
$$

so the bracket is a gradient, which we call $-\nabla V$.

::: definition Potentials of a time-dependent field {#def-potentials}
The fields are given in terms of the **scalar potential** $V$ and **vector potential** $\mathbf A$ by

$$
\mathbf B = \nabla\times\mathbf A, \qquad \mathbf E = -\nabla V - \frac{\partial\mathbf A}{\partial t} .
$$ {#eq-potentials}

The **gauge transformation**

$$
\mathbf A\to\mathbf A + \nabla\lambda, \qquad V\to V - \frac{\partial\lambda}{\partial t},
$$ {#eq-gauge}

with $\lambda(\mathbf r, t)$ any differentiable function, leaves $\mathbf E$ and $\mathbf B$ unchanged.
:::

The invariance is direct: $\nabla\times\nabla\lambda = \mathbf 0$, and $-\nabla(-\partial_t\lambda) - \partial_t(\nabla\lambda) = \mathbf 0$. With [[#eq-potentials]], the two homogeneous Maxwell equations hold automatically. The other two become equations for the potentials. Gauss's law gives

$$
\nabla^2V + \frac{\partial}{\partial t}(\nabla\cdot\mathbf A) = -\frac{\rho}{\varepsilon_0},
$$ {#eq-gauss-pot}

and the Ampère–Maxwell law, with $\nabla\times(\nabla\times\mathbf A) = \nabla(\nabla\cdot\mathbf A) - \nabla^2\mathbf A$, gives

$$
\left(\nabla^2\mathbf A - \frac{1}{c^2}\frac{\partial^2\mathbf A}{\partial t^2}\right) - \nabla\left(\nabla\cdot\mathbf A + \frac{1}{c^2}\frac{\partial V}{\partial t}\right) = -\mu_0\mathbf J .
$$ {#eq-ampere-pot}

These are coupled, and gauge freedom exists to uncouple them.

### The Coulomb gauge {#coulomb-gauge}

Choosing $\nabla\cdot\mathbf A = 0$, as in magnetostatics, reduces [[#eq-gauss-pot]] to Poisson's equation, $\nabla^2V = -\rho/\varepsilon_0$, solved by the instantaneous Coulomb integral. The vector potential then satisfies a wave equation whose source is $\mu_0\mathbf J$ minus a gradient term involving $V$. This gauge is convenient when there are no sources in the region of interest (then $V = 0$ and $\mathbf A$ alone describes radiation) and in non-relativistic quantum mechanics.

::: warning The Coulomb-gauge potential is instantaneous, but nothing physical is
In the Coulomb gauge $V(\mathbf r, t)$ responds at once to a change in $\rho$ anywhere in the universe. This does not violate causality, because $V$ is not observable. The field $\mathbf E = -\nabla V - \partial_t\mathbf A$ also contains $\partial_t\mathbf A$, and the instantaneous part of $\partial_t\mathbf A$ cancels the instantaneous part of $\nabla V$ exactly, leaving an $\mathbf E$ that propagates at $c$. Do not draw physical conclusions from the value of a potential at one point in one gauge.
:::

### The Lorenz gauge {#lorenz-gauge}

The second bracket in [[#eq-ampere-pot]] suggests a better choice.

::: definition Lorenz gauge {#def-lorenz}
Potentials satisfying

$$
\nabla\cdot\mathbf A + \frac{1}{c^2}\frac{\partial V}{\partial t} = 0
$$ {#eq-lorenz}

are in the **Lorenz gauge**. In this gauge [[#eq-gauss-pot]] and [[#eq-ampere-pot]] become the inhomogeneous wave equations

$$
\Box V = -\frac{\rho}{\varepsilon_0}, \qquad \Box\mathbf A = -\mu_0\mathbf J, \qquad \Box = \nabla^2 - \frac{1}{c^2}\frac{\partial^2}{\partial t^2}.
$$ {#eq-wave-pot}
:::

The substitution is immediate for $\mathbf A$. For $V$, use [[#eq-lorenz]] to replace $\nabla\cdot\mathbf A$ by $-c^{-2}\partial_tV$ in [[#eq-gauss-pot]]. All four components now obey the same equation with their own source, the potentials are decoupled, and the structure is manifestly the same in every inertial frame, which [[electrodynamics/relativistic-fields]] makes explicit.

::: proposition The Lorenz gauge can always be reached {#prop-lorenz}
Given any potentials $(V, \mathbf A)$ for fields $(\mathbf E, \mathbf B)$, there is a gauge function $\lambda$ such that the transformed potentials satisfy [[#eq-lorenz]]. The remaining freedom is a gauge function obeying $\Box\lambda = 0$.
:::

::: proof
Let $L = \nabla\cdot\mathbf A + c^{-2}\partial_tV$ for the given potentials. After [[#eq-gauge]],

$$
L' = \nabla\cdot(\mathbf A + \nabla\lambda) + \frac{1}{c^2}\frac{\partial}{\partial t}\left(V - \frac{\partial\lambda}{\partial t}\right) = L + \nabla^2\lambda - \frac{1}{c^2}\frac{\partial^2\lambda}{\partial t^2} = L + \Box\lambda .
$$

We need $\Box\lambda = -L$, an inhomogeneous wave equation for $\lambda$ with a known source. It always has solutions; the retarded integral of [[electrodynamics/radiation]] supplies one for any reasonable $L$. Two solutions differ by a solution of $\Box\lambda = 0$, and any such $\lambda$ preserves the condition $L' = 0$.
:::

::: example One field, two gauges {#ex-gauge}
Show that $V = -E_0x$, $\mathbf A = \mathbf 0$ and $V' = 0$, $\mathbf A' = -E_0t\,\hat{\mathbf x}$ describe the same field, find the gauge function, and say which gauges each pair satisfies.
::: solution
For the first pair, $\mathbf E = -\nabla(-E_0x) = E_0\hat{\mathbf x}$ and $\mathbf B = \mathbf 0$. For the second, $\mathbf E = -\partial_t(-E_0t\,\hat{\mathbf x}) = E_0\hat{\mathbf x}$ and $\mathbf B = \nabla\times\mathbf A' = \mathbf 0$, since $\mathbf A'$ does not depend on position. The same uniform static field. We need $\nabla\lambda = -E_0t\,\hat{\mathbf x}$ and $-\partial_t\lambda = 0 - (-E_0x) = E_0x$. The function $\lambda = -E_0xt$ satisfies both. Both pairs have $\nabla\cdot\mathbf A = 0$ and $\partial_tV = 0$, so both are in the Coulomb gauge and in the Lorenz gauge; $\Box\lambda = \nabla^2(-E_0xt) - c^{-2}\partial_t^2(-E_0xt) = 0$, as [[#prop-lorenz]] requires for a transformation between two Lorenz-gauge potentials. A static field can be described by a time-dependent potential, which is one more reason not to read physics off the potentials alone.
:::
:::

::: quiz
In the Lorenz gauge, which statements are correct?
- [x] Each Cartesian component of $\mathbf A$, and $V$, satisfies an inhomogeneous wave equation.
- [ ] The potentials are unique.
- [x] Static potentials in the Lorenz gauge also satisfy the Coulomb gauge.
- [ ] $V$ responds instantaneously to changes in $\rho$.
::: solution
By [[#eq-wave-pot]] the four potentials obey $\Box\phi = -(\text{source})$. They are not unique: any $\lambda$ with $\Box\lambda = 0$ may be added, by [[#prop-lorenz]]. For static potentials $\partial_tV = 0$, so [[#eq-lorenz]] reduces to $\nabla\cdot\mathbf A = 0$. The wave equation propagates changes at $c$; the instantaneous response belongs to the Coulomb gauge.
:::
:::

::: history Maxwell's synthesis
Michael Faraday discovered electromagnetic induction in 1831 and pictured the space around magnets and currents as filled with lines of force under tension. James Clerk Maxwell, then at King's College London, introduced the displacement current in "On Physical Lines of Force" (1861–62), using a mechanical model of the ether, and noticed that the speed of transverse waves in his model agreed with the measured speed of light. "A Dynamical Theory of the Electromagnetic Field" (1865) rebuilt the theory without the mechanical model, and *A Treatise on Electricity and Magnetism* (1873) set it out at length, in terms of potentials and in quaternion and component notation. In 1867 the Danish physicist Ludvig Lorenz independently formulated electrodynamics with retarded potentials satisfying the condition now named after him (it is often misattributed to Hendrik Lorentz). John Henry Poynting published his theorem on the flow of energy in 1884, and Oliver Heaviside, who found it independently at about the same time, reduced Maxwell's equations to the four vector equations used today in papers of 1884–85. Heinrich Hertz generated and detected electromagnetic waves in 1887–88, confirming Maxwell's prediction. Pyotr Lebedev (1900) and Ernest Fox Nichols and Gordon Hull (1901) measured the pressure of light.
:::

## Where this leads {#leads}

[[electrodynamics/waves-in-media]] solves Maxwell's equations in matter for plane waves, applies the boundary conditions of this chapter to derive reflection and refraction, and follows Poynting's vector into conductors, where it decays within a skin depth. [[electrodynamics/radiation]] solves the wave equations [[#eq-wave-pot]] with the retarded Green's function and uses Poynting's theorem on a large sphere to compute the power radiated by accelerated charges. In [[electrodynamics/relativistic-fields]], $(V/c, \mathbf A)$ becomes a four-vector, the Lorenz condition becomes the vanishing four-divergence $\partial_\mu A^\mu = 0$, and the energy density, Poynting vector and stress tensor combine into the electromagnetic energy–momentum tensor. Gauge invariance, a convenience here, becomes the organising principle of the Standard Model in [[particles]].

::: summary
- Charge conservation, $\partial_t\rho + \nabla\cdot\mathbf J = 0$, is incompatible with $\nabla\times\mathbf B = \mu_0\mathbf J$; the displacement current $\varepsilon_0\,\partial_t\mathbf E$ restores consistency and makes the current continuous through a capacitor.
- Maxwell's equations plus the Lorentz force are the whole of classical electrodynamics; in matter, $\mathbf D$ and $\mathbf H$ absorb the bound charges and currents, and the boundary conditions are the static ones.
- Poynting's theorem $\partial_tu + \nabla\cdot\mathbf S = -\mathbf J\cdot\mathbf E$, with $u = \frac12\varepsilon_0E^2 + B^2/2\mu_0$ and $\mathbf S = \mathbf E\times\mathbf B/\mu_0$, is local energy conservation; energy reaches a resistor through the surrounding space.
- Fields carry momentum density $\mathbf g = \mathbf S/c^2$, and the Maxwell stress tensor gives the force on charges as a surface integral of the fields; a plane wave exerts pressure $\langle S\rangle/c$ on an absorber.
- Time-dependent fields have potentials $\mathbf B = \nabla\times\mathbf A$, $\mathbf E = -\nabla V - \partial_t\mathbf A$, fixed only up to the gauge transformation $\mathbf A\to\mathbf A + \nabla\lambda$, $V\to V - \partial_t\lambda$.
- The Coulomb gauge $\nabla\cdot\mathbf A = 0$ makes $V$ instantaneous; the Lorenz gauge $\nabla\cdot\mathbf A + c^{-2}\partial_tV = 0$ turns Maxwell's equations into four wave equations $\Box V = -\rho/\varepsilon_0$, $\Box\mathbf A = -\mu_0\mathbf J$.
:::

## Exercises {#exercises}

::: exercise A laser pointer {level=1 check="2190"}
A $5.00\,\mathrm{mW}$ laser beam has a uniform circular cross-section of diameter $1.00\,\mathrm{mm}$. Find the amplitude of its electric field in $\mathrm{V/m}$, and the force it exerts on an absorbing screen.
::: solution
The intensity is $I = P/A = (5.00\times10^{-3})/(\pi(0.500\times10^{-3})^2) = 6.37\times10^{3}\,\mathrm{W/m^2}$. Then

$$
E_0 = \sqrt{\frac{2I}{c\varepsilon_0}} = \sqrt{\frac{2(6366)}{(2.998\times10^{8})(8.854\times10^{-12})}} = 2.19\times10^{3}\,\mathrm{V/m}.
$$

The force on an absorber is $P/c = (5.00\times10^{-3})/(2.998\times10^{8}) = 1.67\times10^{-11}\,\mathrm{N}$.
:::
:::

::: exercise Displacement current in a metal {level=1 check="9.33"}
In copper ($\sigma = 5.96\times10^{7}\,\mathrm{S/m}$) carrying a current at frequency $1.00\,\mathrm{GHz}$, find the ratio of the amplitudes of the displacement current density and the conduction current density, in units of $10^{-10}$. Take the permittivity of the metal's bound charges as $\varepsilon_0$.
::: solution
With $\mathbf J = \sigma\mathbf E$ and $\mathbf E\propto\cos\omega t$, the displacement current density $\varepsilon_0\partial_t\mathbf E$ has amplitude $\omega\varepsilon_0E$, so the ratio is

$$
\frac{\omega\varepsilon_0}{\sigma} = \frac{2\pi(1.00\times10^{9})(8.854\times10^{-12})}{5.96\times10^{7}} = 9.33\times10^{-10}.
$$

The displacement current inside a good conductor is negligible even at microwave frequencies. Outside the conductor it is everything.
:::
:::

::: exercise Pulling capacitor plates together {level=1 check="0.443"}
The field between the plates of a parallel-plate capacitor is $1.00\times10^{6}\,\mathrm{V/m}$ and each plate has area $0.100\,\mathrm{m^2}$. Using the stress tensor, find the force between the plates in newtons.
::: solution
Enclose one plate in a box whose face in the gap is parallel to the plate. Outside the capacitor the field is zero; in the gap $\mathbf E$ is normal to the face, so $T_{nn} = \frac12\varepsilon_0E^2$ on that face, a tension pulling the plate towards the field region. The force is

$$
F = \tfrac12\varepsilon_0E^2A = \tfrac12(8.854\times10^{-12})(1.00\times10^{6})^2(0.100) = 0.443\,\mathrm{N},
$$

attractive. Equivalently, $F = Q^2/(2\varepsilon_0A)$, the familiar result from the energy method.
:::
:::

::: exercise When is seawater a conductor? {level=2 check="888"}
Seawater has $\sigma\approx4.0\,\mathrm{S/m}$ and $\varepsilon_r\approx81$. Find the frequency, in MHz, at which conduction and displacement current densities have equal amplitude in it.
::: solution
In a medium with permittivity $\varepsilon = \varepsilon_r\varepsilon_0$, the displacement current density is $\varepsilon\,\partial_t\mathbf E$, with amplitude $\omega\varepsilon E$. Equality with $\sigma E$ requires

$$
f = \frac{\sigma}{2\pi\varepsilon_r\varepsilon_0} = \frac{4.0}{2\pi(81)(8.854\times10^{-12})} = 8.88\times10^{8}\,\mathrm{Hz} = 888\,\mathrm{MHz}.
$$

Below this, seawater behaves as a conductor, which is why submarines communicate at very low frequencies and why radar does not penetrate the sea. The consequences for attenuation are worked out in [[electrodynamics/waves-in-media]].
:::
:::

::: exercise A solar sail {level=2 check="9.08"}
A perfectly reflecting sail of area $1.00\,\mathrm{km^2}$ faces the Sun at the Earth's distance, where the intensity is $1361\,\mathrm{W/m^2}$. The sail and its payload have mass $1000\,\mathrm{kg}$. Find the acceleration, in $\mathrm{mm/s^2}$.
::: solution
A perfect reflector at normal incidence reverses the momentum of the light, so the pressure is $2I/c = 2(1361)/(2.998\times10^{8}) = 9.08\times10^{-6}\,\mathrm{Pa}$. The force is $9.08\times10^{-6}\times1.00\times10^{6} = 9.08\,\mathrm{N}$, and the acceleration $9.08\times10^{-3}\,\mathrm{m/s^2} = 9.08\,\mathrm{mm/s^2}$. Over a year that is a speed change of about $290\,\mathrm{km/s}$, if it could be sustained, which is why sails are taken seriously for missions that cannot carry propellant.
:::
:::

::: exercise Poynting's theorem for a plane wave {level=2}
For $\mathbf E = E_0\cos(kz - \omega t)\hat{\mathbf x}$ and $\mathbf B = (E_0/c)\cos(kz - \omega t)\hat{\mathbf y}$ in vacuum, with $\omega = ck$, verify [[#eq-poynting]] directly, and show that the momentum density is $u/c$.
::: solution
Write $\phi = kz - \omega t$. Then $u = \frac12\varepsilon_0E_0^2\cos^2\phi + \frac{1}{2\mu_0}\frac{E_0^2}{c^2}\cos^2\phi = \varepsilon_0E_0^2\cos^2\phi$, using $1/(\mu_0c^2) = \varepsilon_0$. The Poynting vector is $\mathbf S = \frac{1}{\mu_0}\frac{E_0^2}{c}\cos^2\phi\,\hat{\mathbf z} = c\varepsilon_0E_0^2\cos^2\phi\,\hat{\mathbf z} = cu\,\hat{\mathbf z}$. Now

$$
\frac{\partial u}{\partial t} = \varepsilon_0E_0^2\cdot2\cos\phi\sin\phi\cdot\omega, \qquad \nabla\cdot\mathbf S = c\varepsilon_0E_0^2\cdot(-2\cos\phi\sin\phi)\cdot k ,
$$

and their sum vanishes because $\omega = ck$, as [[#eq-poynting]] requires with $\mathbf J = \mathbf 0$. The momentum density is $\mathbf g = \mathbf S/c^2 = (u/c)\hat{\mathbf z}$. The relation $g = u/c$ is that of a massless particle, $p = E/c$, which is what a photon is.
:::
:::

::: exercise Energy flowing into a solenoid {level=2}
A long solenoid of radius $R$ and $n$ turns per unit length carries a current $I(t)$ that increases slowly. Use Faraday's law to find the induced electric field at the inner surface of the windings, and show that the inward Poynting flux through a length $\ell$ equals the rate of increase of the magnetic energy inside.
::: solution
Inside, $B = \mu_0nI$ along the axis. Faraday's law on a circle of radius $R$ gives $E\cdot2\pi R = -\pi R^2\dot B$, so $\mathbf E = -\frac{R}{2}\mu_0n\dot I\,\hat{\boldsymbol\phi}$ (opposing the current, by Lenz's law). Then

$$
\mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B = \frac{1}{\mu_0}\left(-\frac{R\mu_0n\dot I}{2}\right)(\mu_0nI)\,(\hat{\boldsymbol\phi}\times\hat{\mathbf z}) = -\frac{\mu_0n^2RI\dot I}{2}\hat{\mathbf s},
$$

radially inward. Through the area $2\pi R\ell$ the inward power is $\pi R^2\ell\,\mu_0n^2I\dot I$. The magnetic energy inside is $\frac{B^2}{2\mu_0}\pi R^2\ell = \frac12\mu_0n^2I^2\pi R^2\ell$, whose rate of increase is the same. In circuit language this is $LI\dot I = \frac{\dd}{\dd t}(\frac12LI^2)$ with $L = \mu_0n^2\pi R^2\ell$: the work done against the back emf enters the solenoid as field energy through its sides.
:::
:::

::: exercise Potentials of a plane wave {level=2}
Show that $V = 0$, $\mathbf A = \frac{E_0}{\omega}\sin(kz - \omega t)\hat{\mathbf x}$ with $\omega = ck$ produce the plane wave $\mathbf E = E_0\cos(kz - \omega t)\hat{\mathbf x}$, $\mathbf B = (E_0/c)\cos(kz - \omega t)\hat{\mathbf y}$, and that they satisfy both the Coulomb and the Lorenz conditions. Then apply the gauge transformation with $\lambda = \frac{E_0}{\omega k}\cos(kz - \omega t)$ and say which condition survives.
::: solution
Write $\phi = kz - \omega t$. Then $\mathbf E = -\partial_t\mathbf A = -\frac{E_0}{\omega}\cos\phi\,(-\omega)\hat{\mathbf x} = E_0\cos\phi\,\hat{\mathbf x}$, and the curl of $A_x(z,t)\hat{\mathbf x}$ is $\partial_zA_x\,\hat{\mathbf y} = \frac{E_0k}{\omega}\cos\phi\,\hat{\mathbf y} = \frac{E_0}{c}\cos\phi\,\hat{\mathbf y}$. Since $A_x$ does not depend on $x$, $\nabla\cdot\mathbf A = 0$, and $V = 0$, so both conditions hold.

After the transformation, $\nabla\lambda = -\frac{E_0}{\omega}\sin\phi\,\hat{\mathbf z}$ and $\partial_t\lambda = \frac{E_0}{k}\sin\phi$, so

$$
\mathbf A' = \frac{E_0}{\omega}\sin\phi\,(\hat{\mathbf x} - \hat{\mathbf z}), \qquad V' = -\frac{E_0}{k}\sin\phi .
$$

The fields are unchanged: $-\nabla V' - \partial_t\mathbf A' = E_0\cos\phi\,\hat{\mathbf z} + E_0\cos\phi\,(\hat{\mathbf x} - \hat{\mathbf z}) = E_0\cos\phi\,\hat{\mathbf x}$. Now $\nabla\cdot\mathbf A' = -\frac{E_0k}{\omega}\cos\phi\neq0$, so the Coulomb condition fails, but

$$
\nabla\cdot\mathbf A' + \frac{1}{c^2}\frac{\partial V'}{\partial t} = -\frac{E_0k}{\omega}\cos\phi + \frac{E_0\omega}{c^2k}\cos\phi = 0
$$

because $\omega = ck$. The Lorenz condition survives, as [[#prop-lorenz]] predicts: $\lambda$ satisfies $\Box\lambda = -(k^2 - \omega^2/c^2)\lambda = 0$. The new potentials have a longitudinal part and a scalar part that cancel in $\mathbf E$; they are the gauge modes that quantum electrodynamics must take care not to count as photons.
:::
:::

::: exercise Coulomb's law from the stress tensor {level=3 check="22.5"}
Two charges $q$ are at $z = \pm d$. Using the stress tensor on the plane $z = 0$, find the force on the upper charge and show that it agrees with Coulomb's law. Evaluate it in $\mu\mathrm{N}$ for $q = 1.00\,\mathrm{nC}$ and $d = 1.00\,\mathrm{cm}$.
::: hint
On the midplane the $z$-components of the two fields cancel. You will need $\int_0^\infty u\,\dd u/(u + d^2)^3 = 1/(2d^2)$.
:::
::: solution
At a point in the plane $z = 0$ at distance $s$ from the axis, each charge produces a field of magnitude $q/(4\pi\varepsilon_0(s^2+d^2))$. The $z$-components cancel and the in-plane components add, giving $\mathbf E = \frac{2qs}{4\pi\varepsilon_0(s^2+d^2)^{3/2}}\hat{\mathbf s}$. Then $E_z = 0$ and $T_{zz} = -\frac12\varepsilon_0E^2$. Enclose the upper half-space; its outward normal on the plane is $-\hat{\mathbf z}$, and the hemisphere at infinity contributes nothing. So

$$
F_z = \frac{\varepsilon_0}{2}\int_0^\infty\frac{4q^2s^2}{(4\pi\varepsilon_0)^2(s^2+d^2)^3}2\pi s\,\dd s = \frac{q^2}{4\pi\varepsilon_0}\int_0^\infty\frac{s^3\,\dd s}{(s^2+d^2)^3}.
$$

With $u = s^2$, $\int_0^\infty s^3\,\dd s/(s^2+d^2)^3 = \frac12\int_0^\infty u\,\dd u/(u+d^2)^3 = 1/(4d^2)$. Hence $F_z = q^2/(4\pi\varepsilon_0(2d)^2)$, upward, which is Coulomb's repulsion at separation $2d$. Numerically, $F = (8.988\times10^9)(1.00\times10^{-18})/(0.0200)^2 = 2.25\times10^{-5}\,\mathrm{N} = 22.5\,\mu\mathrm{N}$.
:::
:::

::: exercise Uniqueness for Maxwell's equations {level=3}
In a fixed region $\mathcal V$ of vacuum, the sources $\rho$ and $\mathbf J$ are given for $t\ge0$. Prove that the fields in $\mathcal V$ for $t > 0$ are uniquely determined by their values at $t = 0$ together with the tangential component of $\mathbf E$ on the boundary $\partial\mathcal V$ for $t\ge0$.
::: hint
Apply Poynting's theorem to the difference of two solutions.
:::
::: solution
Let $(\mathbf E_1, \mathbf B_1)$ and $(\mathbf E_2, \mathbf B_2)$ be two solutions with the same sources, initial values and tangential $\mathbf E$ on the boundary. By linearity, the differences $\mathbf E = \mathbf E_1 - \mathbf E_2$, $\mathbf B = \mathbf B_1 - \mathbf B_2$ satisfy Maxwell's equations with $\rho = 0$, $\mathbf J = \mathbf 0$, vanish at $t = 0$, and have $\hat{\mathbf n}\times\mathbf E = \mathbf 0$ on $\partial\mathcal V$. Poynting's theorem for the difference fields, with no current, gives

$$
\deriv{}{t}\int_{\mathcal V}u\,\dd\tau = -\oint_{\partial\mathcal V}\frac{1}{\mu_0}(\mathbf E\times\mathbf B)\cdot\hat{\mathbf n}\,\dd a = -\oint_{\partial\mathcal V}\frac{1}{\mu_0}(\hat{\mathbf n}\times\mathbf E)\cdot\mathbf B\,\dd a = 0,
$$

using the cyclic property of the triple product. So the energy of the difference fields is constant, and it is zero at $t = 0$. Since $u = \frac12\varepsilon_0E^2 + B^2/2\mu_0$ is a sum of non-negative continuous terms, $\int u\,\dd\tau = 0$ forces $\mathbf E = \mathbf 0$ and $\mathbf B = \mathbf 0$ throughout $\mathcal V$ for all $t\ge0$. (Specifying tangential $\mathbf B$ instead of tangential $\mathbf E$ on the boundary works equally well.) This is the dynamical counterpart of [[electrodynamics/electrostatics#thm-unique]], with energy playing the role of $\int\lvert\nabla W\rvert^2$.
:::
:::
