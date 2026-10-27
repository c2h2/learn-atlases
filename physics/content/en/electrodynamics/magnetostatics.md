Steady currents produce magnetic fields, and the introductory course computed those fields with the Biot–Savart law and Ampère's law: the field on the axis of a loop, around a wire, inside a solenoid ([[magnetism/biot-savart]]). This chapter does for magnetostatics what [[electrodynamics/electrostatics]] did for electrostatics. It turns the integral laws into differential equations, introduces a potential, and uses the potential to solve problems that symmetry alone cannot crack: the field far from any small current loop, the field of a permanent magnet, and the way field lines bend when they enter iron.

The structure is parallel to electrostatics, with two differences that run through everything. First, the magnetic field has zero divergence everywhere: there are no magnetic charges, so the potential must be a *vector* $\mathbf A$ with $\mathbf B = \nabla\times\mathbf A$, and that vector is not unique. The freedom to change it without changing $\mathbf B$, **gauge freedom**, first appears here and becomes central in [[electrodynamics/maxwell-equations]] and [[electrodynamics/relativistic-fields]]. Second, the leading term far from a localised current is a dipole, never a monopole. Magnetised matter is then described exactly as polarised matter was, with bound currents in place of bound charges, and with an auxiliary field $\mathbf H$ in place of $\mathbf D$.

We take $\mu_0 = 1.25663706212\times10^{-6}\,\mathrm{N/A^2}$ (CODATA 2018; $\mu_0/4\pi = 1.00000000055\times10^{-7}$, which we round to $10^{-7}$ in numerical work). The magnetic force law is that of [[magnetism/magnetic-force]].

## The Biot–Savart law and its differential form {#biot-savart}

A **steady current** is a flow of charge that does not change in time and does not pile up charge anywhere. In terms of the current density $\mathbf J$ (current per unit area normal to the flow), the continuity equation $\nabla\cdot\mathbf J = -\partial\rho/\partial t$ then gives $\nabla\cdot\mathbf J = 0$. Steady currents are the magnetic analogue of static charges.

::: definition Biot–Savart law {#def-biot-savart}
The magnetic field of a steady, localised current density $\mathbf J$ is

$$
\mathbf B(\mathbf r) = \frac{\mu_0}{4\pi}\int\frac{\mathbf J(\mathbf r')\times(\mathbf r - \mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert^3}\,\dd\tau' .
$$ {#eq-biot-savart}

For a thin wire carrying current $I$, $\mathbf J\,\dd\tau'\to I\,\dd\mathbf l'$ and the integral runs along the wire.
:::

The law is an empirical statement, like Coulomb's law: it summarises the experiments of Biot, Savart and Ampère in 1820. Everything else in magnetostatics follows from it.

::: theorem Divergence and curl of a magnetostatic field {#thm-div-curl}
For a steady, localised current density, define

$$
\mathbf A(\mathbf r) = \frac{\mu_0}{4\pi}\int\frac{\mathbf J(\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' .
$$ {#eq-A-integral}

Then $\mathbf B = \nabla\times\mathbf A$, $\nabla\cdot\mathbf A = 0$, and

$$
\nabla\cdot\mathbf B = 0, \qquad \nabla\times\mathbf B = \mu_0\mathbf J .
$$ {#eq-ampere}
:::

::: proof
The derivatives act on $\mathbf r$, not on $\mathbf r'$. Since $\mathbf J(\mathbf r')$ does not depend on $\mathbf r$, the product rule $\nabla\times(f\mathbf J) = \nabla f\times\mathbf J$ and $\nabla(1/\lvert\mathbf r-\mathbf r'\rvert) = -(\mathbf r-\mathbf r')/\lvert\mathbf r-\mathbf r'\rvert^3$ give

$$
\nabla\times\frac{\mathbf J(\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert} = -\frac{(\mathbf r - \mathbf r')\times\mathbf J(\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert^3} = \frac{\mathbf J(\mathbf r')\times(\mathbf r-\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert^3}.
$$

Integrating over $\mathbf r'$ reproduces [[#eq-biot-savart]], so $\mathbf B = \nabla\times\mathbf A$, and then $\nabla\cdot\mathbf B = \nabla\cdot(\nabla\times\mathbf A) = 0$.

For the divergence of $\mathbf A$, use $\nabla(1/\lvert\mathbf r-\mathbf r'\rvert) = -\nabla'(1/\lvert\mathbf r-\mathbf r'\rvert)$:

$$
\nabla\cdot\mathbf A = \frac{\mu_0}{4\pi}\int\mathbf J\cdot\nabla\frac{1}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' = -\frac{\mu_0}{4\pi}\int\left[\nabla'\cdot\frac{\mathbf J}{\lvert\mathbf r-\mathbf r'\rvert} - \frac{\nabla'\cdot\mathbf J}{\lvert\mathbf r-\mathbf r'\rvert}\right]\dd\tau' .
$$

The second term vanishes because $\nabla'\cdot\mathbf J = 0$ for steady currents. The first is, by the divergence theorem, a surface integral over a surface enclosing all the currents, on which $\mathbf J = \mathbf 0$. So $\nabla\cdot\mathbf A = 0$.

Finally, $\nabla\times\mathbf B = \nabla\times(\nabla\times\mathbf A) = \nabla(\nabla\cdot\mathbf A) - \nabla^2\mathbf A = -\nabla^2\mathbf A$. Each Cartesian component of $\mathbf A$ is a Coulomb integral like [[electrodynamics/electrostatics#eq-coulomb-int]], with $\rho/\varepsilon_0$ replaced by $\mu_0J_i$, so $\nabla^2A_i = -\mu_0J_i$ by the same identity $\nabla^2(1/\lvert\mathbf r-\mathbf r'\rvert) = -4\pi\delta^3(\mathbf r-\mathbf r')$. Hence $\nabla\times\mathbf B = \mu_0\mathbf J$.
:::

Applying Stokes' theorem to $\nabla\times\mathbf B = \mu_0\mathbf J$ over any surface bounded by a closed loop gives **Ampère's law** in its integral form, $\oint\mathbf B\cdot\dd\mathbf l = \mu_0I_{\mathrm{enc}}$. The integral form is a calculating tool only when symmetry tells you that $\lvert\mathbf B\rvert$ is constant along a suitable loop; the differential form holds at every point regardless.

::: warning Ampère's law is a magnetostatic law
The derivation used $\nabla\cdot\mathbf J = 0$. If charge is accumulating somewhere, as on the plates of a charging capacitor, then $\nabla\cdot(\nabla\times\mathbf B) = 0$ is incompatible with $\nabla\cdot(\mu_0\mathbf J)\ne0$, and $\nabla\times\mathbf B = \mu_0\mathbf J$ is simply false. Maxwell's repair, the displacement current, is the first step of [[electrodynamics/maxwell-equations]]. Within this chapter currents are steady.
:::

## The vector potential and gauge freedom {#vector-potential}

In electrostatics the potential was unique up to a constant. The vector potential has much more freedom. Because the curl of a gradient vanishes, the transformation

$$
\mathbf A\to\mathbf A' = \mathbf A + \nabla\lambda
$$ {#eq-gauge}

leaves $\mathbf B = \nabla\times\mathbf A$ unchanged for any differentiable function $\lambda$. Such a change is a **gauge transformation**. The particular $\mathbf A$ of [[#eq-A-integral]] has zero divergence, and that choice can always be made.

::: definition Coulomb gauge and the vector Poisson equation {#def-coulomb-gauge}
A vector potential with $\nabla\cdot\mathbf A = 0$ is said to be in the **Coulomb gauge**. In that gauge Ampère's law $\nabla\times\mathbf B = \mu_0\mathbf J$ becomes

$$
\nabla^2\mathbf A = -\mu_0\mathbf J ,
$$ {#eq-vec-poisson}

three Poisson equations, one for each Cartesian component.
:::

Equation [[#eq-vec-poisson]] places magnetostatics on the footing of [[electrodynamics/electrostatics#eq-poisson]]: each Cartesian component $A_i$ obeys a scalar Poisson equation with source $\mu_0J_i$. All the theory of that chapter carries over, in particular the uniqueness theorem [[electrodynamics/electrostatics#thm-unique]] for each component with $\mathbf A\to\mathbf 0$ at infinity, and [[#eq-A-integral]] is the solution in all space. Note that "Cartesian" matters: in curvilinear coordinates $\nabla^2\mathbf A$ is not the scalar Laplacian applied to $A_r$, $A_\theta$, $A_\phi$ separately.

Two further facts are often more useful than [[#eq-A-integral]] itself. Stokes' theorem gives the flux through any surface $S$ bounded by a loop $C$ as

$$
\Phi_B = \int_S\mathbf B\cdot\dd\mathbf a = \oint_C\mathbf A\cdot\dd\mathbf l ,
$$ {#eq-flux-A}

so $\mathbf A$ is to magnetic flux what $\mathbf B$ is to current in Ampère's law. And in the Coulomb gauge, $\mathbf A$ tends to point along the currents that produce it, as [[#eq-A-integral]] shows: a vector potential "copies" its source.

::: example The vector potential of a uniform field {#ex-uniform-A}
Show that $\mathbf A = \tfrac12\mathbf B_0\times\mathbf r$ describes a uniform field $\mathbf B_0$, that it is in the Coulomb gauge, and that $\mathbf A' = B_0x\,\hat{\mathbf y}$ (for $\mathbf B_0 = B_0\hat{\mathbf z}$) describes the same field. Find the gauge function relating them.
::: solution
With $\mathbf B_0 = B_0\hat{\mathbf z}$, $\mathbf A = \tfrac12B_0\hat{\mathbf z}\times(x,y,z) = \tfrac12B_0(-y, x, 0)$. Then

$$
\nabla\times\mathbf A = \left(\partial_yA_z - \partial_zA_y,\ \partial_zA_x - \partial_xA_z,\ \partial_xA_y - \partial_yA_x\right) = \bigl(0, 0, \tfrac12B_0 + \tfrac12B_0\bigr) = B_0\hat{\mathbf z},
$$

and $\nabla\cdot\mathbf A = \partial_x(-\tfrac12B_0y) + \partial_y(\tfrac12B_0x) = 0$. For $\mathbf A' = (0, B_0x, 0)$, $\nabla\times\mathbf A' = (0, 0, \partial_x(B_0x)) = B_0\hat{\mathbf z}$ and $\nabla\cdot\mathbf A' = 0$ too. The difference is

$$
\mathbf A' - \mathbf A = \bigl(\tfrac12B_0y,\ \tfrac12B_0x,\ 0\bigr) = \nabla\left(\tfrac12B_0xy\right),
$$

so $\lambda = \tfrac12B_0xy$. This $\lambda$ is harmonic ($\nabla^2(xy) = 0$), which is why both potentials are in the Coulomb gauge: the Coulomb condition fixes $\mathbf A$ only up to the gradient of a harmonic function, and that residual freedom disappears only once we demand $\mathbf A\to\mathbf 0$ at infinity, which a uniform field cannot satisfy. The first form, the **symmetric gauge**, and the second, the **Landau gauge**, are both standard in the quantum theory of an electron in a magnetic field.
:::
:::

::: example The vector potential of a long solenoid {#ex-solenoid-A}
A long solenoid of radius $R$ with $n$ turns per unit length carries current $I$. Find $\mathbf A$ inside and outside.
::: solution
Inside, $\mathbf B = \mu_0nI\hat{\mathbf z}$, and outside $\mathbf B = \mathbf 0$ ([[magnetism/biot-savart]]). The currents run azimuthally, so $\mathbf A$ should too: $\mathbf A = A(s)\hat{\boldsymbol\phi}$, with $s$ the distance from the axis. Apply [[#eq-flux-A]] to a circle of radius $s$ centred on the axis. For $s<R$,

$$
A(s)\,2\pi s = \mu_0nI\,\pi s^2, \qquad A(s) = \frac{\mu_0nIs}{2}.
$$

For $s>R$ the enclosed flux is the whole flux $\mu_0nI\pi R^2$, so

$$
A(s) = \frac{\mu_0nIR^2}{2s}.
$$

Both forms have zero divergence, since $\nabla\cdot(A(s)\hat{\boldsymbol\phi}) = s^{-1}\partial_\phi A = 0$. Inside, this is the symmetric gauge of [[#ex-uniform-A]]. Outside, $\mathbf B = \mathbf 0$ but $\mathbf A\ne\mathbf 0$. Locally it is a pure gauge: $\mathbf A = \nabla\bigl(\Phi_B\phi/2\pi\bigr)$, with $\phi$ the azimuthal angle. Globally it is not, since $\phi$ is not single-valued and the line integral round the solenoid is the trapped flux $\Phi_B$. Classically a charge outside the solenoid feels no force. Quantum mechanically, the phase of an electron's wavefunction around the solenoid shifts by $e\Phi_B/\hbar$, the Aharonov–Bohm effect (1959), observed experimentally in 1960 and conclusively in 1986.
:::
:::

::: quiz
In a region of space, $\mathbf A = k(y\,\hat{\mathbf x} - x\,\hat{\mathbf y})$ with $k$ constant. Which statements are correct?
- [x] $\mathbf B = -2k\,\hat{\mathbf z}$, a uniform field.
- [ ] $\mathbf B = \mathbf 0$, because $\mathbf A$ has no $z$-component.
- [x] $\mathbf A$ satisfies the Coulomb gauge condition.
- [ ] Adding $\nabla(xyz)$ to $\mathbf A$ changes $\mathbf B$.
::: solution
The $z$-component of the curl is $\partial_xA_y - \partial_yA_x = -k - k = -2k$; the other components vanish. The divergence is $\partial_x(ky) + \partial_y(-kx) = 0$. Adding any gradient leaves the curl unchanged, by [[#eq-gauge]]; $\nabla(xyz) = (yz, xz, xy)$ has divergence $0$ as well, so even the Coulomb gauge survives that change.
:::
:::

## The magnetic dipole {#dipole}

Far from a localised current distribution, expand [[#eq-A-integral]] in powers of $r'/r$ exactly as the scalar potential was expanded in [[electrodynamics/electrostatics]]. For a single loop carrying current $I$,

$$
\mathbf A(\mathbf r) = \frac{\mu_0I}{4\pi}\oint\frac{\dd\mathbf l'}{\lvert\mathbf r-\mathbf r'\rvert} = \frac{\mu_0I}{4\pi}\sum_{l=0}^\infty\frac{1}{r^{l+1}}\oint(r')^lP_l(\cos\alpha)\,\dd\mathbf l' ,
$$

where $\alpha$ is the angle between $\mathbf r$ and $\mathbf r'$. The $l = 0$ term is $\frac{\mu_0I}{4\pi r}\oint\dd\mathbf l'$, and the integral of $\dd\mathbf l'$ round a closed loop is zero. *There is no magnetic monopole term.* Since any steady current distribution can be decomposed into closed loops, this holds in general.

::: theorem The magnetic dipole {#thm-mag-dipole}
For a loop carrying current $I$, define the **magnetic dipole moment** $\mathbf m = I\mathbf a$, where $\mathbf a = \tfrac12\oint\mathbf r'\times\dd\mathbf l'$ is the vector area of the loop (for a plane loop, its area times the unit normal given by the right-hand rule). The leading term of the vector potential at $r$ large compared with the loop is

$$
\mathbf A_{\mathrm{dip}}(\mathbf r) = \frac{\mu_0}{4\pi}\frac{\mathbf m\times\hat{\mathbf r}}{r^2},
$$ {#eq-A-dip}

and the corresponding field is

$$
\mathbf B_{\mathrm{dip}}(\mathbf r) = \frac{\mu_0}{4\pi}\frac{3(\mathbf m\cdot\hat{\mathbf r})\hat{\mathbf r} - \mathbf m}{r^3}.
$$ {#eq-B-dip}

For a general current density, $\mathbf m = \tfrac12\int\mathbf r'\times\mathbf J\,\dd\tau'$.
:::

::: proof
The $l = 1$ term is $\frac{\mu_0I}{4\pi r^2}\oint(\hat{\mathbf r}\cdot\mathbf r')\,\dd\mathbf l'$. A corollary of Stokes' theorem says that for a scalar function $T$, $\oint T\,\dd\mathbf l = \int_S\dd\mathbf a\times\nabla T$. Take $T(\mathbf r') = \hat{\mathbf r}\cdot\mathbf r'$, with $\hat{\mathbf r}$ fixed, so $\nabla'T = \hat{\mathbf r}$:

$$
\oint(\hat{\mathbf r}\cdot\mathbf r')\,\dd\mathbf l' = \int_S\dd\mathbf a'\times\hat{\mathbf r} = \mathbf a\times\hat{\mathbf r},
$$

where $\mathbf a = \int_S\dd\mathbf a'$ depends only on the boundary loop, and equals $\tfrac12\oint\mathbf r'\times\dd\mathbf l'$ (apply the same corollary componentwise, or check it for a plane polygon). Hence $\mathbf A = \frac{\mu_0}{4\pi r^2}I\mathbf a\times\hat{\mathbf r}$, which is [[#eq-A-dip]].

For the field, put $\mathbf m = m\hat{\mathbf z}$ at the origin. Then $\mathbf m\times\hat{\mathbf r} = m\sin\theta\,\hat{\boldsymbol\phi}$ and $\mathbf A = \frac{\mu_0m\sin\theta}{4\pi r^2}\hat{\boldsymbol\phi}$. The curl in spherical coordinates of a field with only an $A_\phi$ component is

$$
B_r = \frac{1}{r\sin\theta}\partial_\theta(\sin\theta\,A_\phi) = \frac{\mu_0}{4\pi}\frac{2m\cos\theta}{r^3}, \qquad B_\theta = -\frac1r\partial_r(rA_\phi) = \frac{\mu_0}{4\pi}\frac{m\sin\theta}{r^3}.
$$

These are the components of [[#eq-B-dip]], as one sees by writing $\mathbf m = m(\cos\theta\,\hat{\mathbf r} - \sin\theta\,\hat{\boldsymbol\theta})$.
:::

Away from the source, the magnetic dipole field has exactly the form of the electric dipole field [[electrodynamics/electrostatics#eq-dipole-field]], with $\mathbf p/\varepsilon_0\to\mu_0\mathbf m$. The two differ only at the source: between the plates of a tiny capacitor-like electric dipole the field points from $+$ to $-$, opposite to $\mathbf p$, while inside a tiny current loop the field points along $\mathbf m$. This is why the field inside a bar magnet runs from south to north and closes the loops of the outside field, and it is the reason that ferromagnets are described by current loops rather than by pairs of magnetic charges.

::: widget plot
f: 1/(1 + x^2)^1.5; 1/x^3
x: 0.2, 5
y: 0, 1.5
labels: loop, exact on axis; dipole approximation
caption: The field on the axis of a circular loop of radius $R$, in units of its value $\mu_0I/2R$ at the centre, against $z/R$. The exact result, $(1 + z^2/R^2)^{-3/2}$, is finite at the centre; the dipole formula [[#eq-B-dip]], $R^3/z^3$ in these units, diverges there. Read off where they agree: at $z = 2R$ the dipole formula is $40\%$ high, at $z = 5R$ only $6\%$, and the error falls off as $\tfrac32(R/z)^2$. The dipole description is the far field of any loop, whatever its shape.
:::

::: example The Earth's dipole moment {#ex-earth}
The Earth's surface field at the magnetic equator is about $3.0\times10^{-5}\,\mathrm{T}$. Treating the field as that of a dipole at the centre, estimate the magnetic moment of the Earth and the field at the magnetic poles. Take $R_\oplus = 6.371\times10^6\,\mathrm{m}$.
::: solution
At the equator, $\mathbf m\cdot\hat{\mathbf r} = 0$, and [[#eq-B-dip]] gives a field of magnitude $\mu_0m/(4\pi r^3)$, antiparallel to $\mathbf m$. Therefore

$$
m = \frac{4\pi R_\oplus^3B_{\mathrm{eq}}}{\mu_0} = \frac{(6.371\times10^{6})^3(3.0\times10^{-5})}{1.0\times10^{-7}} = 7.8\times10^{22}\,\mathrm{A\,m^2}.
$$

The accepted value is about $8.0\times10^{22}\,\mathrm{A\,m^2}$; the surface field at the equator varies from place to place by tens of per cent, because the field has non-dipole parts. At the poles $\mathbf m\cdot\hat{\mathbf r} = \pm m$ and the magnitude is $2\mu_0m/(4\pi r^3) = 2B_{\mathrm{eq}} = 6.0\times10^{-5}\,\mathrm{T}$, close to what is observed near the geomagnetic poles. The field at the equator points northward, which means $\mathbf m$ points southward: the Earth's geographic north is near a magnetic south pole of the dipole, which is why the north end of a compass needle is attracted to it.
:::
:::

::: example The orbital moment of an electron {#ex-bohr}
In the Bohr model of hydrogen, an electron moves on a circle of radius $a_0 = 5.29\times10^{-11}\,\mathrm{m}$ with angular momentum $L = \hbar$. Find the current, the magnetic moment, and the ratio $m/L$. Find also the field this current produces at the proton.
::: solution
An electron of speed $v$ on a circle of radius $a_0$ passes a given point $v/(2\pi a_0)$ times per second, so the current has magnitude $I = ev/(2\pi a_0)$. The loop has area $\pi a_0^2$, so

$$
m = I\pi a_0^2 = \frac{eva_0}{2} = \frac{e}{2m_e}(m_eva_0) = \frac{e}{2m_e}L .
$$

The ratio $m/L = e/(2m_e)$ is the classical **gyromagnetic ratio**; it does not depend on the radius or the speed, so it holds for any circular orbit and, by superposition, for any orbital motion. The electron is negative, so $\mathbf m = -(e/2m_e)\mathbf L$ points opposite to $\mathbf L$. With $L = \hbar$,

$$
m = \frac{e\hbar}{2m_e} = \frac{(1.602\times10^{-19})(1.0546\times10^{-34})}{2(9.109\times10^{-31})} = 9.274\times10^{-24}\,\mathrm{A\,m^2},
$$

the **Bohr magneton** $\mu_B$. The speed is $v = \hbar/(m_ea_0) = 2.19\times10^{6}\,\mathrm{m/s}$, so $I = 1.05\,\mathrm{mA}$, a large current for one electron. At the centre of the loop $B = \mu_0I/(2a_0) = 12.5\,\mathrm{T}$. That internal field, acting on the electron's own spin magnetic moment (also about one Bohr magneton, though with $g\approx2$), is the origin of fine structure in [[quantum-2]].
:::
:::

A dipole in an external field has energy $U = -\mathbf m\cdot\mathbf B$, feels a torque $\mathbf m\times\mathbf B$, and, in a non-uniform field, a force $\mathbf F = \nabla(\mathbf m\cdot\mathbf B)$ ([[magnetism/magnetic-force]]). The force is what the Stern–Gerlach experiment of 1922 measured, and its quantised outcomes are the subject of [[quantum-1]].

## Magnetised matter {#magnetisation}

Each atom of a material is a tiny current loop, from orbiting electrons and, more importantly in iron, from electron spin. In a field the loops tend to align, giving **paramagnetism**, and the field also changes the orbital motion, giving **diamagnetism**, an induced moment opposing the field. In ferromagnets neighbouring spins align spontaneously.

::: definition Magnetisation and bound currents {#def-magnetisation}
The **magnetisation** $\mathbf M$ is the magnetic dipole moment per unit volume, in $\mathrm{A/m}$. A magnetised body produces the same vector potential as the **bound currents**

$$
\mathbf J_b = \nabla\times\mathbf M \quad\text{(in the volume)}, \qquad \mathbf K_b = \mathbf M\times\hat{\mathbf n} \quad\text{(on the surface)},
$$ {#eq-bound-current}

where $\hat{\mathbf n}$ is the outward normal.
:::

The derivation parallels that of bound charge. Superposing [[#eq-A-dip]] with $\mathbf m\to\mathbf M\,\dd\tau'$,

$$
\mathbf A = \frac{\mu_0}{4\pi}\int\mathbf M(\mathbf r')\times\frac{\mathbf r-\mathbf r'}{\lvert\mathbf r-\mathbf r'\rvert^3}\,\dd\tau' = \frac{\mu_0}{4\pi}\int\mathbf M\times\nabla'\frac{1}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau'.
$$

The product rule $\nabla'\times(f\mathbf M) = f\nabla'\times\mathbf M - \mathbf M\times\nabla'f$ and the identity $\int_V\nabla\times\mathbf F\,\dd\tau = -\oint_S\mathbf F\times\dd\mathbf a$ turn this into

$$
\mathbf A = \frac{\mu_0}{4\pi}\int\frac{\nabla'\times\mathbf M}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' + \frac{\mu_0}{4\pi}\oint\frac{\mathbf M\times\hat{\mathbf n}'}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd a',
$$

which is [[#eq-A-integral]] for the currents [[#eq-bound-current]]. The picture: in a uniformly magnetised slab, adjacent atomic loops cancel inside, and only the unpaired edges at the surface survive as a sheet of current.

### The auxiliary field $\mathbf H$ {#H}

Ampère's law counts all currents: $\nabla\times\mathbf B = \mu_0(\mathbf J_f + \nabla\times\mathbf M)$, where $\mathbf J_f$ is the **free current** in wires. Collecting the curls,

$$
\mathbf H = \frac{\mathbf B}{\mu_0} - \mathbf M, \qquad \nabla\times\mathbf H = \mathbf J_f, \qquad \oint\mathbf H\cdot\dd\mathbf l = I_{f,\mathrm{enc}} .
$$ {#eq-H}

In a **linear** medium $\mathbf M = \chi_m\mathbf H$, so $\mathbf B = \mu_0(1+\chi_m)\mathbf H = \mu\mathbf H$, with **permeability** $\mu = \mu_0\mu_r$. Paramagnets have small positive $\chi_m$ (aluminium about $2\times10^{-5}$), diamagnets small negative $\chi_m$ (water about $-9\times10^{-6}$, bismuth about $-1.7\times10^{-4}$). Ferromagnets are not linear: $\mathbf M$ depends on the history of the sample (hysteresis), and a quoted "$\mu_r$" of a few thousand for soft iron is the slope of one branch of that curve.

The auxiliary field is to $\mathbf B$ what $\mathbf D$ was to $\mathbf E$, with the same warning. $\nabla\cdot\mathbf H = -\nabla\cdot\mathbf M$ need not vanish, so $\mathbf H$ is not fixed by the free current alone. A bar magnet has no free current at all and a large $\mathbf H$.

### Boundary conditions {#bc}

At a surface carrying a surface current density $\mathbf K$, a Gaussian pillbox and $\nabla\cdot\mathbf B = 0$ give continuity of the normal component, and an Amperian loop gives the jump in the tangential component. With $\hat{\mathbf n}$ the unit normal from medium 1 to medium 2,

$$
B_2^\perp = B_1^\perp, \qquad \mathbf B_2^\parallel - \mathbf B_1^\parallel = \mu_0\mathbf K\times\hat{\mathbf n}, \qquad \mathbf H_2^\parallel - \mathbf H_1^\parallel = \mathbf K_f\times\hat{\mathbf n}.
$$ {#eq-bc-B}

The vector potential is continuous across the surface (in the Coulomb gauge), while its normal derivative jumps by $-\mu_0\mathbf K$. Between two linear media with no free surface current, $B^\perp$ and $H^\parallel$ are continuous. If a field line makes angle $\theta_1$ with the normal in medium 1 and $\theta_2$ in medium 2,

$$
\frac{\tan\theta_2}{\tan\theta_1} = \frac{B_2^\parallel/B^\perp}{B_1^\parallel/B^\perp} = \frac{\mu_2H^\parallel}{\mu_1H^\parallel} = \frac{\mu_2}{\mu_1},
$$ {#eq-refraction-B}

so field lines leaving iron emerge almost exactly along the normal. That is why the pole pieces of an electromagnet shape the gap field: the iron surface is nearly a surface of constant magnetic scalar potential, as a conductor is in electrostatics.

::: example A current sheet {#ex-sheet}
The plane $z = 0$ carries a uniform surface current $\mathbf K = K\hat{\mathbf x}$. Find $\mathbf B$ on both sides and check [[#eq-bc-B]].
::: solution
By the Biot–Savart law, pairs of strips at $\pm y$ cancel any $z$-component, and a current along $x$ produces no $x$-component. So $\mathbf B = B(z)\hat{\mathbf y}$, with $B(-z) = -B(z)$ by reflection symmetry in the plane. Apply Ampère's law to a rectangle in the $yz$-plane with sides of length $\ell$ parallel to $y$ at heights $\pm z$. The enclosed current is $K\ell$ through the rectangle, and the circulation is $2B\ell$ in magnitude, so $\lvert B\rvert = \mu_0K/2$. The right-hand rule fixes the sign:

$$
\mathbf B = -\frac{\mu_0K}{2}\hat{\mathbf y}\ (z>0), \qquad \mathbf B = +\frac{\mu_0K}{2}\hat{\mathbf y}\ (z<0).
$$

With $\hat{\mathbf n} = \hat{\mathbf z}$ from below to above, $\mathbf B_2^\parallel - \mathbf B_1^\parallel = -\mu_0K\hat{\mathbf y}$, and $\mu_0\mathbf K\times\hat{\mathbf n} = \mu_0K\,\hat{\mathbf x}\times\hat{\mathbf z} = -\mu_0K\hat{\mathbf y}$, as [[#eq-bc-B]] says. The normal component is zero on both sides, so it is trivially continuous. The field is uniform on each side, independent of distance, just as the electric field of a charged plane is.
:::
:::

::: quiz
A field line passes from soft iron ($\mu_r = 2000$), where it makes $60^\circ$ with the surface normal, into air. There is no free surface current. Which is correct about the line in the air?
- [x] It is within a small fraction of a degree of the normal.
- [ ] It makes $60^\circ$ with the normal, since $\mathbf B$ is continuous.
- [ ] It is nearly tangential to the surface.
- [ ] Its tangential $\mathbf B$ is unchanged.
::: solution
By [[#eq-refraction-B]], $\tan\theta_{\mathrm{air}} = \tan60^\circ/2000 = 8.7\times10^{-4}$, so $\theta_{\mathrm{air}} = 0.05^\circ$. Only $B^\perp$ is continuous; $B^\parallel$ drops by the factor $\mu_r$, because $H^\parallel$ is what is continuous.
:::
:::

### The magnetic scalar potential and the uniformly magnetised sphere {#sphere}

Where there are no free currents, $\nabla\times\mathbf H = \mathbf 0$ and we may write $\mathbf H = -\nabla\Phi_M$. Then $\nabla\cdot\mathbf B = 0$ gives

$$
\nabla^2\Phi_M = \nabla\cdot\mathbf M ,
$$

which is the electrostatic problem with $\mathbf E\to\mathbf H$, $\mathbf P/\varepsilon_0\to\mathbf M$, and effective "magnetic charges" $\rho_M = -\nabla\cdot\mathbf M$ and $\sigma_M = \mathbf M\cdot\hat{\mathbf n}$. The charges are fictitious, but they make every electrostatic technique available.

::: example A uniformly magnetised sphere {#ex-magnet-sphere}
A sphere of radius $R$ has uniform magnetisation $\mathbf M = M\hat{\mathbf z}$ and no free current. Find $\mathbf H$ and $\mathbf B$ inside and outside, and evaluate $B$ inside for a neodymium magnet with $M = 1.0\times10^6\,\mathrm{A/m}$.
::: solution
Inside, $\nabla\cdot\mathbf M = 0$, so the only magnetic charge is $\sigma_M = M\cos\theta$ on the surface, and $\Phi_M$ is harmonic inside and outside. Take the $l = 1$ solutions of Laplace's equation that are regular at the origin and at infinity:

$$
\Phi_{\mathrm{in}} = C\,r\cos\theta, \qquad \Phi_{\mathrm{out}} = \frac{D\cos\theta}{r^2}.
$$

Continuity of $\Phi_M$ at $r = R$ gives $CR = D/R^2$. The surface charge produces a jump in the normal derivative, exactly as $\sigma/\varepsilon_0$ did for $V$: $-\partial_r\Phi_{\mathrm{out}} + \partial_r\Phi_{\mathrm{in}} = \sigma_M$ at $r = R$, that is

$$
\left(\frac{2D}{R^3} + C\right)\cos\theta = M\cos\theta .
$$

With $D = CR^3$ this gives $3C = M$, so $C = M/3$. Inside, $\mathbf H = -\nabla(Cz) = -\tfrac13\mathbf M$, uniform and opposite to the magnetisation (the **demagnetising field**), and

$$
\mathbf B_{\mathrm{in}} = \mu_0(\mathbf H + \mathbf M) = \frac{2}{3}\mu_0\mathbf M .
$$

Outside, $\Phi_{\mathrm{out}} = MR^3\cos\theta/(3r^2)$ is the potential of a dipole of moment $\mathbf m = \tfrac43\pi R^3\mathbf M$, the total moment of the sphere, and $\mathbf B = \mu_0\mathbf H$ is the dipole field [[#eq-B-dip]]. Check the boundary conditions: at the pole, $B_r^{\mathrm{out}} = \mu_0\cdot2D/R^3 = \tfrac23\mu_0M = B_r^{\mathrm{in}}$, so $B^\perp$ is continuous, as [[#eq-bc-B]] requires. For the magnet,

$$
B_{\mathrm{in}} = \tfrac23(4\pi\times10^{-7})(1.0\times10^{6}) = 0.84\,\mathrm{T}.
$$

The bound surface current $\mathbf K_b = \mathbf M\times\hat{\mathbf r} = M\sin\theta\,\hat{\boldsymbol\phi}$ is the same as that of a uniformly charged spinning spherical shell, which therefore has the same field (see the exercises).
:::
:::

A linear magnetic sphere in a uniform field is the dielectric sphere of [[electrodynamics/electrostatics]] in new clothes. Away from free currents $\mathbf H = -\nabla\Phi_M$, $\Phi_M$ is harmonic in each region, $\Phi_M$ is continuous, and continuity of $B^\perp = \mu H^\perp$ replaces continuity of $D^\perp = \varepsilon E^\perp$. The algebra is therefore identical with $\varepsilon_r\to\mu_r$, $\mathbf E\to\mathbf H$, and the field inside is uniform:

$$
\mathbf H_{\mathrm{in}} = \frac{3}{\mu_r+2}\mathbf H_0, \qquad \mathbf B_{\mathrm{in}} = \frac{3\mu_r}{\mu_r+2}\mathbf B_0 .
$$ {#eq-linear-sphere}

As $\mu_r\to\infty$, $\mathbf B_{\mathrm{in}}\to3\mathbf B_0$: the iron gathers field lines towards itself. A *shell* of high-permeability material does the opposite for the cavity inside it. The lines prefer to run round inside the metal, and the field in the hollow is reduced. Solving Laplace's equation for $\Phi_M$ in the three regions of a shell of inner radius $a$ and outer radius $b$ (Jackson §5.12) gives

$$
\frac{B_{\mathrm{in}}}{B_0} = \frac{9\mu_r}{(2\mu_r+1)(\mu_r+2) - 2(a/b)^3(\mu_r-1)^2}\approx\frac{9}{2\mu_r\bigl(1 - a^3/b^3\bigr)}\quad(\mu_r\gg1).
$$ {#eq-shield}

::: application Magnetic shielding
A mu-metal shell ($\mu_r\approx2\times10^4$) of radius $10.0\,\mathrm{cm}$ and thickness $1.0\,\mathrm{mm}$ has $1 - a^3/b^3 = 1 - 0.990^3 = 0.0297$, so [[#eq-shield]] gives $B_{\mathrm{in}}/B_0\approx9/(2\times2\times10^4\times0.0297) = 7.6\times10^{-3}$: the Earth's field inside is reduced to about $0.4\,\mu\mathrm{T}$. Nested shells multiply their factors, which is how the magnetically quiet rooms used for measurements of the neutron's electric dipole moment and for magnetoencephalography reach residual fields of nanotesla. Shielding of static magnetic fields needs permeability, not conductivity; a thin copper box does little at $50\,\mathrm{Hz}$, for reasons explained in [[electrodynamics/waves-in-media]].
:::

## Helmholtz coils {#helmholtz}

A practical use of the axial field: a pair of identical coaxial loops of radius $R$, carrying the same current in the same sense, produces a field near their midpoint that is remarkably uniform when their separation equals $R$. By symmetry the field on the axis is an even function of $z$ about the midpoint, so its first derivative vanishes there. The separation can be chosen to make the second derivative vanish too.

::: proposition Helmholtz condition {#prop-helmholtz}
For two coaxial loops of radius $R$ at $z = \pm d/2$, the axial field at the midpoint has $\partial_z^2B_z = 0$ if and only if $d = R$. The field there is then

$$
B_0 = \left(\frac45\right)^{3/2}\frac{\mu_0NI}{R}
$$ {#eq-helmholtz}

for coils of $N$ turns, and the first non-vanishing correction is of order $(z/R)^4$.
:::

::: proof
One loop at $z = 0$ produces $B(z) = \frac{\mu_0IR^2}{2}(R^2+z^2)^{-3/2}$ on its axis. Its second derivative is

$$
B''(z) = \frac{\mu_0IR^2}{2}\cdot 3\,(R^2+z^2)^{-7/2}\,(4z^2 - R^2),
$$

as differentiating $(R^2+z^2)^{-3/2}$ twice gives $-3(R^2+z^2)^{-5/2} + 15z^2(R^2+z^2)^{-7/2} = 3(4z^2-R^2)(R^2+z^2)^{-7/2}$. The pair's field at the midpoint is the sum of $B(z\mp d/2)$ at $z = 0$, and both terms have the same second derivative, $B''(d/2)$, by symmetry. This vanishes when $4(d/2)^2 = R^2$, that is $d = R$. Odd derivatives cancel by symmetry, so the next term is fourth order. At $d = R$ each loop contributes $\frac{\mu_0NIR^2}{2}(R^2 + R^2/4)^{-3/2} = \frac{\mu_0NI}{2R}(4/5)^{3/2}$, and doubling gives [[#eq-helmholtz]].
:::

::: widget plot
f: (1/(1 + (x - d/2)^2)^1.5 + 1/(1 + (x + d/2)^2)^1.5)/(2/(1 + d^2/4)^1.5)
x: -1.5, 1.5
y: 0, 1.4
sliders: d=1:0.2:2.5:0.05
labels: B(z)/B(0) for two coils
caption: The axial field of two coaxial loops of radius $R$, separated by $d$ (both in units of $R$), normalised to its value at the midpoint, against $z/R$. At $d = 1$, the Helmholtz spacing, the curve is flat to better than $0.02\%$ out to $z = 0.1R$ and $0.2\%$ out to $0.2R$. Drag $d$ above $1$ and a dip opens at the centre between two maxima near the coils; drag it below $1$ and the curve becomes a single peak. The flat top is the cancellation of the second derivative, leaving only a fourth-order term.
:::

::: example Helmholtz coils for a lab {#ex-helmholtz}
A pair of Helmholtz coils has radius $15.0\,\mathrm{cm}$ and $100$ turns each, and carries $2.00\,\mathrm{A}$. Find the field at the centre, and compare with one coil alone.
::: solution
By [[#eq-helmholtz]],

$$
B_0 = (0.8)^{3/2}\frac{(4\pi\times10^{-7})(100)(2.00)}{0.150} = (0.7155)(1.676\times10^{-3}) = 1.20\times10^{-3}\,\mathrm{T}.
$$

One coil alone, at its own centre, gives $\mu_0NI/(2R) = 8.38\times10^{-4}\,\mathrm{T}$. The pair gives $1.43$ times as much at the midpoint, not twice: each coil is $R/2$ away from the midpoint, where its axial field has fallen to $(4/5)^{3/2} = 0.716$ of its central value. The point of the arrangement is uniformity, not strength. Over a sphere of radius $0.1R = 1.5\,\mathrm{cm}$ about the centre the field varies by about one part in $10^4$, which is why such coils are used to cancel the Earth's field ($5\times10^{-5}\,\mathrm{T}$, needing only about $0.08\,\mathrm{A}$ here) around sensitive experiments.
:::
:::

::: history Currents and magnets, 1820–1865
In April 1820 Hans Christian Ørsted noticed that a current deflects a compass needle; his Latin pamphlet of July 1820 spread across Europe within weeks. In October 1820 Jean-Baptiste Biot and Félix Savart measured how the field of a long wire falls with distance, and the law that bears their names is the distillation of their experiments. André-Marie Ampère, starting the same autumn, studied the forces between currents, proposed that magnetism in matter is due to tiny circulating currents, and summarised his work in a memoir of 1826. Siméon Denis Poisson developed a theory of magnetised bodies with fictitious magnetic charges in 1824, the forerunner of the scalar potential used here. Michael Faraday's discovery of induction in 1831 led him to speak of an "electrotonic state" of matter near currents. James Clerk Maxwell gave that idea mathematical form as the vector potential in his papers of 1856 and 1861–62, and used it throughout *A Dynamical Theory of the Electromagnetic Field* (1865).
:::

## Where this leads {#leads}

In [[electrodynamics/maxwell-equations]] Ampère's law acquires the displacement current, and the vector potential and the scalar potential together describe time-dependent fields; gauge freedom then involves both, $\mathbf A\to\mathbf A + \nabla\lambda$ and $V\to V - \partial_t\lambda$. In [[electrodynamics/relativistic-fields]] $V/c$ and $\mathbf A$ combine into a single four-vector, and the magnetic field of a current is revealed as the electric field of moving charges seen from another frame. The magnetic moments of atoms and nuclei, and their energy $-\mathbf m\cdot\mathbf B$ in a field, are the starting point for the Zeeman effect and spin resonance in [[quantum-2]], and the origin of ferromagnetism, which no classical theory can explain, is a topic of [[condensed-matter]].

::: summary
- Steady currents have $\nabla\cdot\mathbf J = 0$; their field obeys $\nabla\cdot\mathbf B = 0$ and $\nabla\times\mathbf B = \mu_0\mathbf J$, derived from the Biot–Savart law.
- $\mathbf B = \nabla\times\mathbf A$; $\mathbf A$ is fixed only up to a gradient (gauge freedom). In the Coulomb gauge $\nabla\cdot\mathbf A = 0$ and $\nabla^2\mathbf A = -\mu_0\mathbf J$, solved by $\mathbf A = \frac{\mu_0}{4\pi}\int\mathbf J/\lvert\mathbf r-\mathbf r'\rvert\,\dd\tau'$.
- The line integral of $\mathbf A$ round a loop is the flux through it; outside a solenoid $\mathbf B = \mathbf 0$ but $\mathbf A\ne\mathbf 0$.
- There is no magnetic monopole term; far from a loop, $\mathbf A = \frac{\mu_0}{4\pi}\mathbf m\times\hat{\mathbf r}/r^2$ with $\mathbf m = I\mathbf a$, and $\mathbf B$ has the dipole form $\frac{\mu_0}{4\pi}[3(\mathbf m\cdot\hat{\mathbf r})\hat{\mathbf r} - \mathbf m]/r^3$.
- Magnetisation is equivalent to bound currents $\nabla\times\mathbf M$ and $\mathbf M\times\hat{\mathbf n}$; $\mathbf H = \mathbf B/\mu_0 - \mathbf M$ has curl $\mathbf J_f$; linear media have $\mathbf B = \mu\mathbf H$.
- At boundaries $B^\perp$ is continuous and $\mathbf B^\parallel$ jumps by $\mu_0\mathbf K\times\hat{\mathbf n}$; field lines leave high-permeability iron almost along the normal.
- A uniformly magnetised sphere has uniform $\mathbf B = \tfrac23\mu_0\mathbf M$ inside and a pure dipole field outside.
:::

## Exercises {#exercises}

::: exercise Helmholtz coils {level=1 check="1.20"}
Find the field at the centre, in mT, of a Helmholtz pair of radius $15.0\,\mathrm{cm}$ with $100$ turns per coil carrying $2.00\,\mathrm{A}$, without looking at [[#ex-helmholtz]]; then check.
::: solution
From [[#eq-helmholtz]], $B_0 = (4/5)^{3/2}\mu_0NI/R = 0.7155\times(4\pi\times10^{-7})(200)/(0.150) = 1.20\times10^{-3}\,\mathrm{T} = 1.20\,\mathrm{mT}$.
:::
:::

::: exercise A small bar magnet {level=1 check="25.0"}
A small magnet has dipole moment $1.00\,\mathrm{A\,m^2}$. Find the field, in mT, at $2.00\,\mathrm{cm}$ from its centre along its axis, treating it as a point dipole.
::: solution
On the axis $\mathbf m\cdot\hat{\mathbf r} = m$, so [[#eq-B-dip]] gives $B = \frac{\mu_0}{4\pi}\frac{2m}{r^3} = (10^{-7})\frac{2(1.00)}{(0.0200)^3} = 2.50\times10^{-2}\,\mathrm{T} = 25.0\,\mathrm{mT}$, along $\mathbf m$. A real magnet $2\,\mathrm{cm}$ long would not be a point dipole at this distance, and the true value would differ noticeably.
:::
:::

::: exercise The geodynamo's moment {level=1 check="7.76"}
Taking the equatorial surface field to be $3.00\times10^{-5}\,\mathrm{T}$ and $R_\oplus = 6.371\times10^{6}\,\mathrm{m}$, find the Earth's dipole moment in units of $10^{22}\,\mathrm{A\,m^2}$, to three significant figures.
::: solution
As in [[#ex-earth]], $m = 4\pi R_\oplus^3B_{\mathrm{eq}}/\mu_0 = R_\oplus^3B_{\mathrm{eq}}/(10^{-7}) = (2.586\times10^{20})(3.00\times10^{-5})/(10^{-7}) = 7.76\times10^{22}\,\mathrm{A\,m^2}$.
:::
:::

::: exercise Field lines leaving iron {level=2 check="0.0573"}
Inside a piece of iron with $\mu_r = 1000$ the field makes $45.0^\circ$ with the normal to its surface. There is no free surface current. Find the angle, in degrees, that the field makes with the normal just outside in air.
::: solution
By [[#eq-refraction-B]], $\tan\theta_{\mathrm{air}} = \tan\theta_{\mathrm{iron}}\,\mu_0/\mu = 1.000/1000 = 1.000\times10^{-3}$, so $\theta_{\mathrm{air}} = 0.0573^\circ$. The tangential $\mathbf H$ is continuous, so the tangential $\mathbf B$ in air is a thousand times smaller than in the iron, while the normal $\mathbf B$ is the same on both sides.
:::
:::

::: exercise The vector potential of a long wire {level=2}
Show that $\mathbf A = -\frac{\mu_0I}{2\pi}\ln\frac{s}{s_0}\,\hat{\mathbf z}$, with $s_0$ an arbitrary constant, gives the field of an infinite straight wire on the $z$-axis carrying current $I$ in the $+z$ direction. Why can [[#eq-A-integral]] not be used directly, and what does changing $s_0$ correspond to?
::: solution
In cylindrical coordinates, for $\mathbf A = A_z(s)\hat{\mathbf z}$, $\nabla\times\mathbf A = -\partial_sA_z\,\hat{\boldsymbol\phi}$. Here $\partial_sA_z = -\mu_0I/(2\pi s)$, so $\mathbf B = \frac{\mu_0I}{2\pi s}\hat{\boldsymbol\phi}$, the field of the wire. Also $\nabla\cdot\mathbf A = \partial_zA_z = 0$. The integral [[#eq-A-integral]] diverges logarithmically for an infinite wire, because the current is not localised: $\int_{-L}^{L}\dd z'/\sqrt{s^2+z'^2}\approx2\ln(2L/s)$. The divergent part is independent of $s$ and can be dropped, which is what $s_0$ does. Changing $s_0$ adds a constant vector to $\mathbf A$, which is the gradient of $\lambda = Cz$, a gauge transformation.
:::
:::

::: exercise A neodymium sphere {level=2 check="0.838"}
A sphere of NdFeB has uniform magnetisation $1.00\times10^{6}\,\mathrm{A/m}$. Find $B$ inside, in tesla, and $H$ inside. Then find $B$ just outside at a pole and at the equator.
::: solution
By [[#ex-magnet-sphere]], $B_{\mathrm{in}} = \tfrac23\mu_0M = \tfrac23(1.2566\times10^{-6})(1.00\times10^{6}) = 0.838\,\mathrm{T}$, along $\mathbf M$. $\mathbf H_{\mathrm{in}} = -\tfrac13\mathbf M$, magnitude $3.33\times10^{5}\,\mathrm{A/m}$, opposite to $\mathbf M$. Outside, the field is that of $\mathbf m = \tfrac43\pi R^3\mathbf M$: at the pole, $B = \frac{\mu_0}{4\pi}\frac{2m}{R^3} = \tfrac23\mu_0M = 0.838\,\mathrm{T}$, the same as inside, as continuity of $B^\perp$ requires. At the equator, $B = \frac{\mu_0}{4\pi}\frac{m}{R^3} = \tfrac13\mu_0M = 0.419\,\mathrm{T}$, pointing opposite to $\mathbf M$; just inside, $B^\parallel = 0.838\,\mathrm{T}$ along $\mathbf M$. The jump of $1.257\,\mathrm{T}$ is $\mu_0K_b$ with $K_b = M$ at the equator, as [[#eq-bc-B]] says.
:::
:::

::: exercise The centre of a square loop {level=1 check="56.6"}
A square loop of side $10.0\,\mathrm{cm}$ carries $5.00\,\mathrm{A}$. Use the Biot–Savart law to find the field at its centre, in $\mu\mathrm{T}$, and compare with a circular loop of the same area.
::: hint
A straight segment at perpendicular distance $d$ whose ends subtend angles $\theta_1$ and $\theta_2$ on either side of the perpendicular gives $\frac{\mu_0I}{4\pi d}(\sin\theta_1 + \sin\theta_2)$.
:::
::: solution
Each side is at distance $d = L/2$ from the centre and its ends subtend $45^\circ$ on each side, so it contributes $\frac{\mu_0I}{4\pi(L/2)}\cdot2\sin45^\circ = \frac{\sqrt2\,\mu_0I}{2\pi L}$, normal to the loop. All four sides add:

$$
B = \frac{2\sqrt2\,\mu_0I}{\pi L} = \frac{2\sqrt2\,(1.2566\times10^{-6})(5.00)}{\pi(0.100)} = 5.66\times10^{-5}\,\mathrm{T} = 56.6\,\mu\mathrm{T}.
$$

A circle of the same area has radius $R = L/\sqrt\pi = 5.64\,\mathrm{cm}$ and central field $\mu_0I/(2R) = 55.7\,\mu\mathrm{T}$, within $2\%$. Far away, both are dipoles with the same $m = IL^2$ and their fields become identical.
:::
:::

::: exercise A permalloy can {level=2 check="7.75"}
A spherical shield of outer radius $5.00\,\mathrm{cm}$ and thickness $2.00\,\mathrm{mm}$ is made of a material with $\mu_r = 5000$. Using the exact form of [[#eq-shield]], find $B_{\mathrm{in}}/B_0$ in units of $10^{-3}$, and compare with the approximate form. What does a solid iron sphere ($\mu_r = 5000$) do to the field inside it?
::: solution
Here $a/b = 4.80/5.00 = 0.960$ and $(a/b)^3 = 0.8847$. The denominator of [[#eq-shield]] is

$$
(10001)(5002) - 2(0.8847)(4999)^2 = 5.0025\times10^{7} - 4.4219\times10^{7} = 5.806\times10^{6},
$$

so $B_{\mathrm{in}}/B_0 = 9(5000)/(5.806\times10^{6}) = 7.75\times10^{-3}$. The approximate form gives $9/(2\times5000\times0.1153) = 7.81\times10^{-3}$, within $1\%$. A solid sphere instead concentrates the field: by [[#eq-linear-sphere]], $B_{\mathrm{in}} = 3(5000)/(5002)\,B_0 = 2.999\,B_0$.
:::
:::

::: exercise Reaching the Coulomb gauge {level=3}
Let $\mathbf A$ be any smooth vector potential for a field $\mathbf B$, with $\nabla\cdot\mathbf A$ localised. Prove that there is a gauge function $\lambda$ such that $\mathbf A' = \mathbf A + \nabla\lambda$ satisfies $\nabla\cdot\mathbf A' = 0$. Show that if $\mathbf A''$ is another potential for $\mathbf B$ in the Coulomb gauge, then $\mathbf A'' - \mathbf A' = \nabla\chi$ with $\chi$ harmonic, and deduce that the Coulomb-gauge potential is unique if it is required to vanish at infinity.
::: hint
For the first part you need $\nabla^2\lambda = -\nabla\cdot\mathbf A$, a Poisson equation. For the uniqueness, use the fact that a vector field with zero curl is a gradient on all of space, and the uniqueness theorem for Laplace's equation.
:::
::: solution
We need $\nabla\cdot\mathbf A + \nabla^2\lambda = 0$. Poisson's equation $\nabla^2\lambda = -f$ with localised $f = \nabla\cdot\mathbf A$ has the solution $\lambda(\mathbf r) = \frac{1}{4\pi}\int f(\mathbf r')/\lvert\mathbf r-\mathbf r'\rvert\,\dd\tau'$, the electrostatic formula with $\rho/\varepsilon_0\to f$. With this $\lambda$, $\nabla\cdot\mathbf A' = 0$, and $\nabla\times\mathbf A' = \nabla\times\mathbf A = \mathbf B$.

Now let $\mathbf A'$ and $\mathbf A''$ both be Coulomb-gauge potentials for $\mathbf B$. Their difference $\mathbf G$ has $\nabla\times\mathbf G = \mathbf 0$ on all of space, which is simply connected, so $\mathbf G = \nabla\chi$ for some $\chi$. Then $\nabla\cdot\mathbf G = \nabla^2\chi = 0$: $\chi$ is harmonic. If both potentials vanish at infinity, so does $\mathbf G$. Each Cartesian component $G_i = \partial_i\chi$ is itself harmonic (derivatives of harmonic functions are harmonic), tends to zero at infinity, and has no boundary in a finite region; by [[electrodynamics/electrostatics#thm-unique]] with zero data at infinity (or, directly, by the maximum principle that follows from [[electrodynamics/electrostatics#thm-mean]]), $G_i = 0$. So $\mathbf A'' = \mathbf A'$. The uniform-field example [[#ex-uniform-A]] shows that without the condition at infinity uniqueness fails.
:::
:::

::: exercise A spinning charged shell {level=3 check="23.3"}
A thin spherical shell of radius $R$ carries uniform surface charge density $\sigma$ and spins with angular velocity $\omega$ about the $z$-axis. Show that its surface current is that of a uniformly magnetised sphere with $M = \sigma\omega R$, and hence find $\mathbf B$ inside. Evaluate $B$ inside, in picotesla, for $R = 10.0\,\mathrm{cm}$, charged to $10.0\,\mathrm{kV}$, spinning at $50.0$ revolutions per second.
::: hint
The surface current is $\mathbf K = \sigma\mathbf v$, with $\mathbf v = \boldsymbol\omega\times\mathbf r$. Compare with $\mathbf K_b = \mathbf M\times\hat{\mathbf n}$.
:::
::: solution
At a point of the shell, $\mathbf v = \omega\hat{\mathbf z}\times R\hat{\mathbf r} = \omega R\sin\theta\,\hat{\boldsymbol\phi}$, so $\mathbf K = \sigma\omega R\sin\theta\,\hat{\boldsymbol\phi}$. A uniformly magnetised sphere has $\mathbf K_b = M\hat{\mathbf z}\times\hat{\mathbf r} = M\sin\theta\,\hat{\boldsymbol\phi}$ and no volume current, since $\nabla\times\mathbf M = \mathbf 0$. The currents agree if $M = \sigma\omega R$. The field depends only on the currents, by the Biot–Savart law, so by [[#ex-magnet-sphere]] the field inside is uniform:

$$
\mathbf B_{\mathrm{in}} = \tfrac23\mu_0\sigma\omega R\,\hat{\mathbf z}.
$$

(Inside the shell there is no magnetised material, so here $\mathbf B = \mu_0\mathbf H$; only $\mathbf B$ is meaningful for comparing the two systems.) For the numbers, a sphere at potential $V$ has $\sigma = \varepsilon_0V/R = (8.854\times10^{-12})(1.00\times10^{4})/(0.100) = 8.854\times10^{-7}\,\mathrm{C/m^2}$, and $\omega = 2\pi(50.0) = 314.2\,\mathrm{s^{-1}}$:

$$
B_{\mathrm{in}} = \tfrac23(1.2566\times10^{-6})(8.854\times10^{-7})(314.2)(0.100) = 2.33\times10^{-11}\,\mathrm{T} = 23.3\,\mathrm{pT}.
$$

About a millionth of the Earth's field. Henry Rowland first detected the magnetic field of moving charge on a rotating charged disc in 1876, showing that convection current and conduction current produce the same magnetism; the smallness of the effect is why that took a careful experiment.
:::
:::
