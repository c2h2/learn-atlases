Copper conducts electricity about $10^{24}$ times better than fused quartz, and a slab of pure silicon sits almost exactly halfway between them on a logarithmic scale. More remarkably, the conductivity of silicon can be changed by a factor of more than a million by replacing one atom in a hundred thousand with phosphorus, it rises steeply with temperature where a metal's falls, and it responds to light. No classical picture of electrons bouncing around a solid explains any of this. The explanation, worked out between 1928 and 1931, is that electrons in a crystal can only have energies in certain **bands**, separated by forbidden **gaps**, and that what matters for conduction is how full those bands are.

This first chapter builds that picture, because every device in the course is described in its language. We start with the geometry of crystals and the diamond lattice of silicon, solve the Schrödinger equation for an electron in a periodic potential to see bands and gaps appear, and then learn the two ideas that make band theory usable by engineers: the **effective mass**, which lets an electron near a band edge be treated as a free particle with a modified mass, and the **hole**, which turns the behaviour of an almost-full band into that of a few positive particles. We finish with the classification of solids into metals, semiconductors and insulators, and the difference between direct and indirect gaps that decides whether a material can emit light efficiently.

The quantum mechanics we need — the time-independent Schrödinger equation and the particle in a box — is developed in the Physics atlas ([The Schrödinger equation](/learn/physics/lesson.php?c=quantum-1&l=schrodinger-equation), [Piecewise potentials](/learn/physics/lesson.php?c=quantum-1&l=piecewise-potentials)), and the chemistry of covalent bonds and hybrid orbitals in [Valence bond theory and hybridisation](/learn/chemistry/lesson.php?c=bonding-structure&l=valence-bond). Here we take only what the devices need.

## Crystal lattices

A **crystal** is a solid in which atoms are arranged in a pattern that repeats in all three directions. The repetition is what makes band theory possible, and it is also what makes semiconductor manufacturing possible: a single-crystal silicon wafer $300\,\mathrm{mm}$ across contains no grain boundaries at all, so every transistor on it sees the same material.

::: definition Lattice, basis and unit cell {#def-lattice}
A **Bravais lattice** is an infinite set of points $\mathbf R = n_1\mathbf a_1 + n_2\mathbf a_2 + n_3\mathbf a_3$, where $n_1, n_2, n_3$ are integers and $\mathbf a_1, \mathbf a_2, \mathbf a_3$ are three linearly independent **primitive vectors**. A crystal is obtained by placing an identical group of atoms, the **basis**, at every lattice point. A **unit cell** is a volume that fills all space without gaps or overlaps when translated by the lattice vectors; a **primitive cell** contains exactly one lattice point, and a **conventional cell** is a larger cell chosen to display the symmetry (for cubic crystals, a cube of side $a$, the **lattice constant**).
:::

Three cubic lattices matter for us. The **simple cubic** lattice has points at the corners of a cube. The **body-centred cubic** (bcc) lattice adds a point at the centre of each cube. The **face-centred cubic** (fcc) lattice adds a point at the centre of each face. Counting the points that belong to one conventional cube — a corner point is shared by eight cubes, a face point by two — gives $1$, $2$ and $4$ points per cube respectively.

### The diamond lattice of silicon

Silicon, germanium and diamond carbon all crystallise in the **diamond structure**: an fcc lattice with a basis of two identical atoms, one at the lattice point and one displaced by $\tfrac14(a, a, a)$ along the body diagonal. Equivalently, it is two interpenetrating fcc lattices offset by a quarter of the body diagonal. Each atom sits at the centre of a regular tetrahedron formed by its four nearest neighbours, which is exactly the geometry of the four $sp^3$ hybrid orbitals of a group-IV atom: each of the four bonds is a shared pair of electrons, one from each atom. Gallium arsenide and most III–V compounds have the same geometry with the two basis sites occupied by different atoms; that is the **zinc-blende** structure.

The conventional cube of the diamond structure contains $4$ fcc lattice points with $2$ atoms each, so **8 atoms**. With the lattice constant of silicon at room temperature, $a = 5.431\,\text{Å}$, we can find the number of atoms per unit volume, a number we shall use constantly.

::: example Atom density and mass density of silicon {#ex-atom-density}
Find the number of silicon atoms per cubic centimetre and the density of silicon, given $a = 5.431\,\text{Å}$ and the molar mass $28.09\,\mathrm{g/mol}$. What is the distance between nearest neighbours?
::: solution
The cube has volume $a^3 = (5.431\times10^{-8}\,\mathrm{cm})^3 = 1.602\times10^{-22}\,\mathrm{cm^3}$ and contains $8$ atoms, so

$$
N_{\text{Si}} = \frac{8}{a^3} = \frac{8}{1.602\times10^{-22}\,\mathrm{cm^3}} = 4.99\times10^{22}\,\mathrm{cm^{-3}}.
$$

The mass density is the number density times the mass of one atom:

$$
\rho = \frac{4.99\times10^{22}\,\mathrm{cm^{-3}}\times 28.09\,\mathrm{g/mol}}{6.022\times10^{23}\,\mathrm{mol^{-1}}} = 2.33\,\mathrm{g/cm^3},
$$

which agrees with the measured value. A nearest neighbour lies a quarter of the way along the body diagonal, at distance $\tfrac{\sqrt3}{4}a = 0.433\times5.431\,\text{Å} = 2.35\,\text{Å}$; this is the Si–Si bond length.
:::
:::

Remember $5\times10^{22}\,\mathrm{cm^{-3}}$. When we dope silicon with $10^{16}$ phosphorus atoms per cubic centimetre, we are replacing about one atom in five million: the crystal is chemically almost perfect, yet its conductivity changes by a factor of about $10^5$.

### Planes and directions

Devices are built on wafers cut along particular crystal planes, and properties such as the mobility of carriers at a surface and the quality of an oxide depend on the plane. Planes are labelled by **Miller indices** $(hkl)$: take the intercepts of the plane with the three cube axes in units of $a$, take reciprocals, and clear fractions to the smallest integers. The cube face perpendicular to the $x$ axis is $(100)$, the plane cutting the $x$ and $y$ axes at $a$ and parallel to $z$ is $(110)$, and the plane cutting all three axes at $a$ is $(111)$. A direction is written $[hkl]$; in a cubic crystal the direction $[hkl]$ is perpendicular to the plane $(hkl)$. Families of equivalent planes and directions are written $\{100\}$ and $\langle100\rangle$.

::: application Why CMOS wafers are (100)
Almost all CMOS is built on $(100)$ wafers. The $(100)$ surface has the fewest dangling bonds per unit area, so the silicon–SiO$_2$ interface grown on it has the lowest density of interface traps (several times lower than on $(111)$), which gives stable threshold voltages and high channel mobility. On a $(100)$ surface each surface atom bonds to two neighbours below it; the number of atoms per unit area on that face of the conventional cube is $2/a^2 = 6.78\times10^{14}\,\mathrm{cm^{-2}}$. Bipolar processes once preferred $(111)$, and FinFETs, whose channels run along the vertical sidewalls of fins, see $(110)$ surfaces on the sidewalls when the fins are aligned with the usual $\langle110\rangle$ wafer flat.
:::

## Electrons in a periodic potential

An electron in a crystal moves in the electrostatic potential of all the nuclei and all the other electrons. Treating the other electrons as a smooth average (the **one-electron approximation**), the potential energy $V(\mathbf r)$ has the periodicity of the lattice: $V(\mathbf r + \mathbf R) = V(\mathbf r)$ for every lattice vector $\mathbf R$. That single fact has a striking consequence for the wavefunctions.

::: theorem Bloch's theorem {#thm-bloch}
The eigenstates of the one-electron Hamiltonian $H = -\dfrac{\hbar^2}{2m_0}\nabla^2 + V(\mathbf r)$ with a lattice-periodic potential can be chosen in the form

$$
\psi_{n\mathbf k}(\mathbf r) = e^{j\mathbf k\cdot\mathbf r}\,u_{n\mathbf k}(\mathbf r), \qquad u_{n\mathbf k}(\mathbf r + \mathbf R) = u_{n\mathbf k}(\mathbf r),
$$ {#eq-bloch}

a plane wave times a function with the period of the lattice. Equivalently, $\psi(\mathbf r + \mathbf R) = e^{j\mathbf k\cdot\mathbf R}\psi(\mathbf r)$. The **wave vector** $\mathbf k$ labels the state, and $n$ labels the **band**.
:::

(We write $j$ for $\sqrt{-1}$, as everywhere in this atlas; physics books write $i$.)

::: proof
Let $T_{\mathbf R}$ be the operator that translates a function by $\mathbf R$: $(T_{\mathbf R}\psi)(\mathbf r) = \psi(\mathbf r + \mathbf R)$. Because $V$ is periodic and the Laplacian is unchanged by translation, $T_{\mathbf R}$ commutes with $H$, and all the translations commute with each other. Commuting operators have a common set of eigenfunctions, so we can choose eigenstates of $H$ that are also eigenstates of every $T_{\mathbf R}$: $T_{\mathbf R}\psi = c(\mathbf R)\psi$. Two successive translations give $c(\mathbf R_1 + \mathbf R_2) = c(\mathbf R_1)c(\mathbf R_2)$, and normalisability over a large crystal with periodic boundary conditions forces $\abs{c} = 1$. The only continuous solutions of this functional equation with modulus one are $c(\mathbf R) = e^{j\mathbf k\cdot\mathbf R}$ for some vector $\mathbf k$. Then $u(\mathbf r) = e^{-j\mathbf k\cdot\mathbf r}\psi(\mathbf r)$ satisfies $u(\mathbf r + \mathbf R) = e^{-j\mathbf k\cdot(\mathbf r+\mathbf R)}e^{j\mathbf k\cdot\mathbf R}\psi(\mathbf r) = u(\mathbf r)$.
:::

Two consequences follow at once. First, $\mathbf k$ is only defined up to a **reciprocal lattice vector** $\mathbf G$ (one with $e^{j\mathbf G\cdot\mathbf R} = 1$ for all $\mathbf R$), so all distinct states are found with $\mathbf k$ in one primitive cell of the reciprocal lattice, the **first Brillouin zone**. In one dimension with period $a$, that is $-\pi/a < k \le \pi/a$. Second, a Bloch state is not scattered by the perfect periodic lattice: it is a stationary state that extends through the whole crystal. Electrons in a perfect crystal would conduct with no resistance at all. Resistance comes from departures from periodicity — lattice vibrations, impurities, defects — and we take it up in [[semiconductor-devices/carrier-transport]].

### The Kronig–Penney model

To see bands appear, solve a model simple enough to do by hand: a one-dimensional row of identical, very thin, very high barriers at $x = 0, \pm a, \pm 2a, \dots$, each modelled as a delta function $S\,\delta(x - na)$ of strength $S$ (in $\mathrm{J\,m}$). Between barriers the electron is free.

::: theorem Kronig–Penney condition {#thm-kp}
For the periodic delta-function potential $V(x) = S\sum_n \delta(x - na)$, a state of energy $E = \hbar^2\alpha^2/(2m_0) > 0$ exists with Bloch wave vector $k$ if and only if

$$
\cos ka = \cos\alpha a + P\,\frac{\sin\alpha a}{\alpha a}, \qquad P = \frac{m_0 S a}{\hbar^2}.
$$ {#eq-kp}

Because $\abs{\cos ka} \le 1$, energies for which the right-hand side has magnitude greater than $1$ are **forbidden**: no state exists there.
:::

::: proof
In $0 < x < a$ write $\psi = A\sin\alpha x + B\cos\alpha x$. Bloch's theorem gives the solution in $-a < x < 0$ as $\psi(x) = e^{-jka}\psi(x + a) = e^{-jka}[A\sin\alpha(x+a) + B\cos\alpha(x+a)]$. At the barrier at $x = 0$ the wavefunction is continuous, and integrating the Schrödinger equation across the delta function shows that its slope jumps by $\psi'(0^+) - \psi'(0^-) = (2m_0S/\hbar^2)\psi(0)$. Write $c = \cos\alpha a$, $s = \sin\alpha a$. Continuity gives $B = e^{-jka}(As + Bc)$, so $A = B(e^{jka} - c)/s$. The slope condition gives

$$
\alpha A(1 - e^{-jka}c) + \alpha e^{-jka}Bs = \frac{2m_0S}{\hbar^2}B.
$$

Substituting $A$ and multiplying out, $(e^{jka} - c)(1 - e^{-jka}c) + e^{-jka}s^2 = e^{jka} + e^{-jka}(c^2+s^2) - 2c = 2\cos ka - 2c$. So $\alpha(2\cos ka - 2c)/s = 2m_0S/\hbar^2$, which rearranges to $\cos ka = \cos\alpha a + (m_0S/\hbar^2\alpha)\sin\alpha a$; this is [[#eq-kp]] with $P = m_0Sa/\hbar^2$.
:::

The barrier strength enters only through the dimensionless number $P$. If $P = 0$ (no barriers), [[#eq-kp]] reads $\cos ka = \cos\alpha a$, so $\alpha = k$ (up to a reciprocal lattice vector) and $E = \hbar^2k^2/2m_0$: the free electron, with every energy allowed. As $P$ grows, the function $\cos\alpha a + P\sin(\alpha a)/\alpha a$ overshoots $\pm1$ just above each $\alpha a = n\pi$, and gaps open there — exactly at the Brillouin-zone boundaries $k = n\pi/a$, where the free-electron wave satisfies the Bragg condition and is reflected back by the lattice.

::: widget plot
f: cos(x) + P*sin(x)/x
x: 0.01, 4pi
y: -3, 6
piticks: true
hlines: 1; -1
sliders: P=4.71:0:15:0.01
labels: \cos\alpha a + P\,\frac{\sin\alpha a}{\alpha a}
caption: The right-hand side of the Kronig–Penney condition against $\alpha a$ (horizontal axis, proportional to $\sqrt E$). Allowed energies are where the curve lies between the two lines $\pm1$; elsewhere there are no states. Start at $P = 3\pi/2 \approx 4.71$ and read off the first band, roughly $0.72\pi < \alpha a < \pi$. Increase $P$: the bands shrink towards the points $\alpha a = n\pi$ (isolated atomic levels). Reduce $P$ to zero: the gaps close and every energy is allowed, as for a free electron.
:::

::: example Bands and gaps of a Kronig–Penney crystal {#ex-kp}
Take $a = 0.5\,\mathrm{nm}$ and $P = 3\pi/2$. Find the energy ranges of the first two allowed bands and the first gap, in electronvolts.
::: solution
Solving $\abs{\cos x + P\sin x/x} = 1$ numerically (bisection, or the figure) with $x = \alpha a$ gives the band edges

$$
\text{band 1: } 2.251 \le \alpha a \le \pi, \qquad \text{band 2: } \tfrac{3\pi}{2} \le \alpha a \le 2\pi .
$$

The upper edges $\alpha a = n\pi$ are exact, since there $\sin\alpha a = 0$ and $\cos\alpha a = \pm1$; the edge at $3\pi/2$ is exact for this particular $P$, because there $\cos\alpha a = 0$ and $P\sin\alpha a/\alpha a = (3\pi/2)(-1)/(3\pi/2) = -1$.

The energy is $E = \hbar^2\alpha^2/2m_0 = E_1(\alpha a/\pi)^2$ with

$$
E_1 = \frac{\hbar^2\pi^2}{2m_0a^2} = \frac{(1.0546\times10^{-34})^2\pi^2}{2(9.109\times10^{-31})(0.5\times10^{-9})^2}\,\mathrm{J} = 2.410\times10^{-19}\,\mathrm{J} = 1.504\,\mathrm{eV}.
$$

So band 1 runs from $1.504\times(2.251/\pi)^2 = 0.772\,\mathrm{eV}$ to $1.504\,\mathrm{eV}$; band 2 from $1.504\times1.5^2 = 3.38\,\mathrm{eV}$ to $1.504\times 4 = 6.02\,\mathrm{eV}$; and the first gap is $3.38 - 1.50 = 1.88\,\mathrm{eV}$ wide. Below $0.772\,\mathrm{eV}$ there are no states at all: the lowest state is pushed up by the barriers, as in a particle in a box.
:::
:::

### Bands from atoms

The same bands can be reached from the opposite direction. Start with $N$ isolated silicon atoms, each with its $3s$ and $3p$ levels, and bring them together. When the atoms are far apart, the $N$ copies of each level are degenerate. As their orbitals begin to overlap, each level splits into $N$ closely spaced levels — just as two coupled pendulums have two normal-mode frequencies instead of one — and for $N \approx 10^{22}$ the levels form a quasi-continuous band. In silicon the $s$ and $p$ levels mix into $sp^3$ hybrids, and at the actual atomic spacing they split into two bands separated by a gap: a lower band built from **bonding** combinations of the hybrids, and an upper band built from **antibonding** combinations. Each band has room for $4N$ electrons (counting spin), and the $4N$ valence electrons of $N$ silicon atoms exactly fill the bonding band. The filled band is the **valence band**, the empty one the **conduction band**. This is the solid-state version of the molecular-orbital picture of [Metallic bonding and band theory](/learn/chemistry/lesson.php?c=bonding-structure&l=metallic-bonding).

::: proposition Counting states in a band {#prop-count}
In a crystal of $N$ primitive cells with periodic boundary conditions, each band contains exactly $N$ allowed values of $\mathbf k$, hence $2N$ electron states including spin.
:::

::: proof
In one dimension, with $N$ cells of length $a$ and the condition $\psi(x + Na) = \psi(x)$, Bloch's theorem requires $e^{jkNa} = 1$, so $k = 2\pi m/(Na)$ for integer $m$. The first Brillouin zone has length $2\pi/a$ and so contains $(2\pi/a)/(2\pi/Na) = N$ values. In three dimensions the same argument applies along each primitive direction, giving $N_1N_2N_3 = N$ values in the zone. Each $\mathbf k$ holds two electrons of opposite spin.
:::

Silicon has two atoms per primitive cell, hence eight valence electrons per cell: enough to fill exactly four bands. That is why it is not a metal.

## Effective mass and group velocity

Near the bottom of a band the energy is a smooth function $E(\mathbf k)$ with a minimum. A wave packet built from Bloch states near $\mathbf k$ moves with the **group velocity**

$$
\mathbf v = \frac{1}{\hbar}\nabla_{\mathbf k}E(\mathbf k),
$$ {#eq-vgroup}

and under an external force $\mathbf F$ (from an applied electric field, not from the lattice) its wave vector changes as $\hbar\,\mathrm d\mathbf k/\mathrm dt = \mathbf F$. The lattice forces are already included in $E(\mathbf k)$. In one dimension, differentiating [[#eq-vgroup]] gives the acceleration

$$
\frac{\mathrm dv}{\mathrm dt} = \frac1\hbar\frac{\mathrm d^2E}{\mathrm dk^2}\frac{\mathrm dk}{\mathrm dt} = \frac{1}{\hbar^2}\frac{\mathrm d^2E}{\mathrm dk^2}\,F,
$$

which is Newton's law with a modified mass.

::: definition Effective mass {#def-effmass}
The **effective mass** of an electron at wave vector $k$ in a band $E(k)$ is

$$
m^* = \hbar^2\left(\frac{\mathrm d^2E}{\mathrm dk^2}\right)^{-1}.
$$ {#eq-effmass}

Near a band minimum at $k_0$, where $E \approx E_c + \hbar^2(k - k_0)^2/(2m^*)$, the electron responds to applied forces like a free particle of mass $m^*$. In three dimensions $1/m^*$ becomes a tensor $\frac{1}{\hbar^2}\partial^2E/\partial k_i\partial k_j$.
:::

The effective mass is large where the band is flat (strongly bound electrons, little overlap between neighbouring atoms) and small where the band is sharply curved. It can even be negative: near the top of a band, $\mathrm d^2E/\mathrm dk^2 < 0$, and an electron there accelerates *against* the applied force, because the lattice reflects it more strongly as its energy rises towards the gap.

::: example Effective mass in a tight-binding band {#ex-tight-binding}
In a simple model of a band built from overlapping atomic orbitals (the tight-binding model), $E(k) = E_0 - 2t\cos ka$, where $t > 0$ is the overlap energy. Take $t = 1\,\mathrm{eV}$ and $a = 0.3\,\mathrm{nm}$. Find (a) the band width, (b) the effective mass at the band bottom, (c) the largest group velocity in the band.
::: solution
(a) $E$ ranges from $E_0 - 2t$ at $k = 0$ to $E_0 + 2t$ at $k = \pm\pi/a$, so the band is $4t = 4\,\mathrm{eV}$ wide.

(b) $\mathrm d^2E/\mathrm dk^2 = 2ta^2\cos ka$, which is $2ta^2$ at $k = 0$. By [[#eq-effmass]],

$$
m^* = \frac{\hbar^2}{2ta^2} = \frac{(1.0546\times10^{-34}\,\mathrm{J\,s})^2}{2(1.602\times10^{-19}\,\mathrm J)(0.3\times10^{-9}\,\mathrm m)^2} = 3.86\times10^{-31}\,\mathrm{kg} = 0.42\,m_0 .
$$

(c) $v = \hbar^{-1}\,\mathrm dE/\mathrm dk = (2ta/\hbar)\sin ka$, largest at $ka = \pi/2$:

$$
v_{\max} = \frac{2ta}{\hbar} = \frac{2(1.602\times10^{-19})(0.3\times10^{-9})}{1.0546\times10^{-34}}\,\mathrm{m/s} = 9.1\times10^{5}\,\mathrm{m/s}.
$$

At $k = \pi/2a$ the curvature is zero and the effective mass is infinite; beyond it the effective mass is negative, reaching $-0.42\,m_0$ at the zone boundary.
:::
:::

::: widget plot
f: -2*t*cos(x); -2*t + t*x^2; 2*t*sin(x)
x: -pi, pi
y: -5, 5
piticks: true
sliders: t=1:0.2:2:0.05
labels: E(k); \text{parabola, } m^*; \hbar v(k)/a
caption: A tight-binding band $E(k) = -2t\cos ka$ (in units with $a = 1$, energies in eV), the effective-mass parabola that fits its bottom, and the group velocity $v \propto \mathrm dE/\mathrm dk$. Near $k = 0$ the parabola is excellent; by $\lvert k\rvert \approx 1$ it overestimates the energy. Notice that the velocity is largest in the middle of the band and falls to zero at the zone edges $\pm\pi$, where the electron is a standing wave. Increasing $t$ widens the band and makes the parabola steeper: stronger overlap means a smaller effective mass.
:::

::: quiz
An electron sits near the **top** of an otherwise empty band, where $E(k) \approx E_v - \hbar^2k^2/(2m)$ with $m > 0$. An electric field exerts a force $F$ on it in the $+x$ direction. Which way does its velocity change?
- [ ] In the $+x$ direction, like a free electron
- [x] In the $-x$ direction, because its effective mass there is $-m$
- [ ] It does not change, because a band edge has zero velocity
- [ ] It depends on the sign of the electron's charge only
::: solution
Here $\mathrm d^2E/\mathrm dk^2 = -\hbar^2/m$, so $m^* = -m$ and $\mathrm dv/\mathrm dt = F/m^* = -F/m$. The force increases $k$ (as always, $\hbar\dot k = F$), but on this part of the band a larger $k$ means a smaller (more negative) velocity. This negative mass is what the idea of a hole makes intuitive.
:::
:::

### Holes

Consider a band that is completely full. Every state $\mathbf k$ is occupied together with the state $-\mathbf k$, and because $E(\mathbf k) = E(-\mathbf k)$ (time-reversal symmetry) their velocities are opposite.

::: proposition A full band carries no current {#prop-full-band}
A completely filled band contributes no electric current, with or without an applied field.
:::

::: proof
The current density of the electrons in a band is $\mathbf J = -\dfrac{q}{V}\sum_{\text{occupied }\mathbf k}\mathbf v(\mathbf k)$, where $V$ is the crystal volume. Since $E(\mathbf k) = E(-\mathbf k)$, the velocity $\mathbf v = \hbar^{-1}\nabla_{\mathbf k}E$ is odd, $\mathbf v(-\mathbf k) = -\mathbf v(\mathbf k)$, and the sum over all $\mathbf k$ in the zone is zero. An applied field shifts every $\mathbf k$ at the same rate, but the zone is periodic, so a full band remains full (states leaving at one zone boundary re-enter at the opposite one) and the sum remains zero.
:::

Now remove one electron, from state $\mathbf k_e$. The current is that of the full band (zero) minus the contribution of the missing electron:

$$
\mathbf J = 0 - \left(-\frac{q}{V}\mathbf v(\mathbf k_e)\right) = +\frac{q}{V}\mathbf v(\mathbf k_e).
$$

The almost-full band therefore carries the current of a single **positive** charge $+q$ moving with the velocity of the empty state. Near the top of the valence band the missing electron has negative effective mass $-m_p^*$; a positive charge with positive mass $m_p^*$ responds to fields in exactly the same way. This fictitious particle is the **hole**. It is not a bookkeeping trick: the Hall effect in p-type silicon has the sign expected of positive carriers, which classical theory could not explain.

::: warning Holes live at the top of the valence band
In a band diagram, electron energy increases upwards, so a hole's energy increases **downwards**. Electrons in the conduction band "fall" to lower energy and collect at the bottom of the band; holes in the valence band "float" up and collect at the top. When a field tilts the bands, electrons roll downhill and holes bubble uphill — opposite directions in space, but both carry current in the direction of the field. Forgetting that hole energy is measured downwards is the most common error in reading band diagrams.
:::

## Metals, semiconductors and insulators

Whether a solid conducts depends on whether its highest occupied band is full.

::: definition Metal, semiconductor and insulator {#def-classes}
At absolute zero, a **metal** has a partly filled band, so empty states lie immediately above the highest occupied ones and an arbitrarily small field can change the electrons' distribution in $\mathbf k$ and drive a current. A **semiconductor** or **insulator** has its bands either completely full or completely empty; the highest full band (the **valence band**, top edge $E_v$) is separated from the lowest empty band (the **conduction band**, bottom edge $E_c$) by the **band gap** $E_g = E_c - E_v$. The distinction between the two is one of degree: materials with $E_g$ of up to about $3$–$4\,\mathrm{eV}$, in which thermal excitation and doping produce useful numbers of carriers, are called semiconductors.
:::

At a temperature $T > 0$ thermal energy $kT$ (about $0.0259\,\mathrm{eV}$ at $300\,\mathrm K$) excites a few electrons across the gap. As we shall find in [[semiconductor-devices/carrier-statistics]], the number excited is proportional to roughly $e^{-E_g/2kT}$: for silicon that factor is about $4\times10^{-10}$, for diamond about $10^{-46}$. This exponential is what separates semiconductors from insulators, and it is why the conductivity of a pure semiconductor rises rapidly with temperature. A few materials, such as bismuth and graphite, have bands that overlap slightly and are called **semimetals**.

| material | $E_g$ at $300\,\mathrm K$ (eV) | gap | typical use |
|---|---|---|---|
| Ge | $0.66$ | indirect | early transistors, infrared detectors |
| Si | $1.12$ | indirect | integrated circuits, solar cells, power devices |
| GaAs | $1.42$ | direct | microwave transistors, infrared LEDs and lasers |
| 4H-SiC | $3.26$ | indirect | high-voltage power devices |
| GaN | $3.4$ | direct | blue and white LEDs, power and RF transistors |
| diamond | $5.5$ | indirect | heat spreaders, research devices |
| SiO$_2$ | $\approx 9$ | — | gate and isolation dielectric |

::: example Absorption edge of silicon and germanium {#ex-cutoff}
A photon can lift an electron across the gap only if its energy $h\nu = hc/\lambda$ is at least $E_g$. Find the longest wavelength absorbed by band-to-band transitions in silicon, germanium and GaAs, and decide which can detect the $1550\,\mathrm{nm}$ light used in optical-fibre links.
::: solution
The cut-off wavelength is $\lambda_c = hc/E_g$. With $hc = 1.240\,\mathrm{eV\,\mu m}$,

$$
\lambda_c(\text{Si}) = \frac{1.240}{1.12}\,\mathrm{\mu m} = 1.107\,\mathrm{\mu m}, \quad \lambda_c(\text{Ge}) = \frac{1.240}{0.66} = 1.88\,\mathrm{\mu m}, \quad \lambda_c(\text{GaAs}) = \frac{1.240}{1.42} = 0.873\,\mathrm{\mu m}.
$$

A $1550\,\mathrm{nm}$ photon has energy $1.240/1.55 = 0.800\,\mathrm{eV}$, less than the gaps of silicon and GaAs, so both are transparent to it; germanium absorbs it. In practice fibre-optic receivers use InGaAs ($E_g = 0.75\,\mathrm{eV}$, $\lambda_c = 1.65\,\mathrm{\mu m}$) or germanium grown on silicon. Silicon photodiodes are used for visible and near-infrared light up to about $1.1\,\mathrm{\mu m}$.
:::
:::

### Temperature dependence of the gap

As a crystal is heated, the lattice expands and the atoms vibrate more strongly, and both effects shrink the band gap slightly. An empirical fit that works well for most semiconductors is the **Varshni relation**

$$
E_g(T) = E_g(0) - \frac{\alpha T^2}{T + \beta}.
$$ {#eq-varshni}

For silicon, $E_g(0) = 1.170\,\mathrm{eV}$, $\alpha = 4.73\times10^{-4}\,\mathrm{eV/K}$ and $\beta = 636\,\mathrm K$, which gives $E_g(300\,\mathrm K) = 1.170 - 0.0455 = 1.125\,\mathrm{eV}$. Near room temperature the gap falls by about $0.27\,\mathrm{meV}$ per kelvin. Bandgap voltage references in integrated circuits, which produce about $1.2\,\mathrm V$ almost independently of temperature, are built around the extrapolated gap $E_g(0)$; they are treated in [[electronics-2]].

## Real band structures: direct and indirect gaps

In three dimensions $E(\mathbf k)$ is plotted along lines between high-symmetry points of the Brillouin zone: $\Gamma$ (the centre, $\mathbf k = 0$), $X$ (the centre of a square face, along $\langle100\rangle$) and $L$ (the centre of a hexagonal face, along $\langle111\rangle$). Two features of the result matter for devices.

::: definition Direct and indirect band gaps {#def-direct}
A semiconductor has a **direct gap** if the minimum of the conduction band and the maximum of the valence band occur at the same wave vector, and an **indirect gap** if they occur at different wave vectors.
:::

In **GaAs** both extrema are at $\Gamma$. The conduction band there is strongly curved, with $m_n^* = 0.067\,m_0$, which is why GaAs electrons are so mobile. In **silicon** the valence-band maximum is at $\Gamma$, but the conduction-band minimum lies along each of the six $\langle100\rangle$ directions, about $85\,\%$ of the way to the zone boundary $X$. There are therefore six equivalent conduction-band **valleys**, and around each minimum the constant-energy surfaces are ellipsoids of revolution, with a heavy **longitudinal** mass $m_l = 0.98\,m_0$ along the valley axis and a light **transverse** mass $m_t = 0.19\,m_0$ in the two perpendicular directions. The valence band of silicon has two branches that touch at $\Gamma$, the **heavy-hole** and **light-hole** bands, so holes too come with two masses.

The direct–indirect distinction decides how a material interacts with light. A photon with energy near $1\,\mathrm{eV}$ has wave vector $2\pi/\lambda \approx 6\times10^{6}\,\mathrm{m^{-1}}$, a thousand times smaller than the zone-boundary value $\pi/a \approx 6\times10^{9}\,\mathrm{m^{-1}}$. A photon can therefore drive only **vertical** transitions in a band diagram, with $\mathbf k$ essentially unchanged. In a direct-gap material an electron at the bottom of the conduction band can drop straight into a hole at the top of the valence band and emit a photon. In an indirect-gap material it must also give up or absorb a large momentum, which requires a lattice vibration (a **phonon**) to take part at the same time; that three-body process is a thousand or more times less likely. That is why LEDs and lasers are made from direct-gap GaAs, InGaAs, InGaN and their relatives, and why silicon, despite its absorption of visible light, is a very poor light emitter. The consequences for LEDs and photodetectors appear in [[semiconductor-devices/diodes-photonic-devices]].

::: intuition One average mass for each purpose
Calculations with six anisotropic valleys and two kinds of holes would be tiresome, so device physics uses averaged masses. For counting states, the six ellipsoids are replaced by one spherical band with the same total density of states, the **density-of-states effective mass** $m_{dn}^* = 6^{2/3}(m_lm_t^2)^{1/3}$. For transport, a field along $x$ accelerates electrons in two valleys with mass $m_l$ and in four with mass $m_t$, and averaging $1/m$ gives the **conductivity effective mass** $3/(1/m_l + 2/m_t)$. The two averages differ by a factor of four in silicon; using the wrong one is a classic error. You will compute both in an exercise.
:::

::: quiz
Why is silicon a poor material for light-emitting diodes, although it absorbs visible light strongly?
- [ ] Its band gap is too small to emit visible photons.
- [x] Its gap is indirect, so radiative recombination needs a phonon as well as a photon and is very slow.
- [ ] It has too few free electrons at room temperature.
- [ ] Its photons are reabsorbed because the lattice constant is too large.
::: solution
In silicon the conduction-band minimum and valence-band maximum are at different $\mathbf k$. A photon carries almost no momentum, so an electron cannot fall straight into a hole by emitting a photon alone; a phonon must supply the momentum difference. Absorption of a photon with energy well above the gap can still happen through direct transitions at other points of the zone (or with phonon help), which is why silicon absorbs visible light. Emission, which starts from electrons at the band minimum, is the process that suffers.
:::
:::

::: history
Felix Bloch proved the theorem that bears his name in his 1928 doctoral thesis under Heisenberg in Leipzig, explaining why electrons can travel long distances through a metal. Ralph Kronig and William Penney published their exactly solvable periodic model in 1931. In the same year Alan Herries Wilson, working in Cambridge and Leipzig, used band theory to explain the difference between metals, insulators and semiconductors and introduced the idea of conduction by thermally excited electrons and by vacancies in a nearly full band, the holes later named by Heisenberg and made precise by Peierls. The crystal structure of diamond had been determined by William Henry and William Lawrence Bragg in 1913, one of the first structures solved by X-ray diffraction. Detailed band structures of silicon and germanium, with their multiple conduction-band valleys, were established in the mid-1950s by cyclotron-resonance experiments, notably by Dresselhaus, Kip and Kittel.
:::

## Where this leads

With bands, effective masses and holes in hand, the next step is to count how many electrons and holes there are at a given temperature and doping. That needs the density of states near the band edges and Fermi–Dirac statistics, which are the subject of [[semiconductor-devices/carrier-statistics]]; the effective masses found here reappear there as the effective densities of states $N_c$ and $N_v$. The conductivity mass and the scattering that breaks the perfect periodicity of Bloch's theorem lead to mobility in [[semiconductor-devices/carrier-transport]]. The direct or indirect nature of the gap returns in [[semiconductor-devices/diodes-photonic-devices]] and in the [[photonics]] course. A fuller treatment of band theory, including the nearly-free-electron model and real band calculations, is in [Band structure](/learn/physics/lesson.php?c=condensed-matter&l=band-structure) and [Semiconductors](/learn/physics/lesson.php?c=condensed-matter&l=semiconductors) in the Physics atlas.

::: summary
- Crystals are a Bravais lattice plus a basis; silicon has the diamond structure (fcc with a two-atom basis), $a = 5.431\,\text{Å}$, $8$ atoms per cube and $5.0\times10^{22}\,\mathrm{atoms/cm^3}$.
- In a periodic potential the electron states are Bloch waves $e^{j\mathbf k\cdot\mathbf r}u_{n\mathbf k}(\mathbf r)$ ([[#thm-bloch]]); energies form bands $E_n(\mathbf k)$ separated by gaps, which open at the Brillouin-zone boundaries ([[#thm-kp]]).
- Each band holds $2N$ electrons for $N$ primitive cells; silicon's eight valence electrons per cell fill four bands exactly, leaving a gap of $1.12\,\mathrm{eV}$ to the conduction band.
- Near a band edge an electron behaves like a free particle with effective mass $m^* = \hbar^2/(\mathrm d^2E/\mathrm dk^2)$ and velocity $\hbar^{-1}\,\mathrm dE/\mathrm dk$.
- A full band carries no current; a nearly full band behaves as a few positive holes with positive mass, whose energy increases downwards in a band diagram.
- Metals have partly filled bands; semiconductors and insulators have a gap between a full valence band and an empty conduction band, distinguished by its size.
- In direct-gap materials (GaAs, GaN) electrons and holes recombine by emitting light efficiently; in indirect-gap materials (Si, Ge) a phonon must take part, so they emit light poorly.
:::

## Exercises

::: exercise Germanium atom density {level=1 check="8/(5.658e-10)^3"}
Germanium has the diamond structure with $a = 5.658\,\text{Å}$. Find the number of atoms per cubic metre (enter in $\mathrm{m^{-3}}$) and its density, given the molar mass $72.63\,\mathrm{g/mol}$.
::: solution
$N = 8/a^3 = 8/(5.658\times10^{-10}\,\mathrm m)^3 = 4.42\times10^{28}\,\mathrm{m^{-3}} = 4.42\times10^{22}\,\mathrm{cm^{-3}}$. Density: $4.42\times10^{22}\times72.63/6.022\times10^{23} = 5.33\,\mathrm{g/cm^3}$.
:::
:::

::: exercise Band gap from an LED colour {level=1 check="1.240/0.470"}
A blue LED emits at $470\,\mathrm{nm}$. Assuming the photon energy equals the band gap of the emitting layer, find $E_g$ in electronvolts.
::: solution
$E_g = hc/\lambda = 1.240\,\mathrm{eV\,\mu m}/0.470\,\mathrm{\mu m} = 2.64\,\mathrm{eV}$, typical of the InGaN quantum wells in blue LEDs.
:::
:::

::: exercise Silicon gap at 400 K {level=1 check="1.170-4.73e-4*400^2/(400+636)"}
Use the Varshni relation with the silicon parameters given in the text to find $E_g$ at $400\,\mathrm K$, in electronvolts. By how much has the absorption edge moved from its $300\,\mathrm K$ value of $1.107\,\mathrm{\mu m}$?
::: solution
$E_g(400) = 1.170 - 4.73\times10^{-4}\times160\,000/1036 = 1.170 - 0.0730 = 1.097\,\mathrm{eV}$. The cut-off wavelength becomes $1.240/1.097 = 1.130\,\mathrm{\mu m}$; with the Varshni value at $300\,\mathrm K$ ($1.1245\,\mathrm{eV}$, $\lambda_c = 1.103\,\mathrm{\mu m}$) the edge has moved about $28\,\mathrm{nm}$ towards longer wavelengths.
:::
:::

::: exercise Surface atom densities {level=2}
Count the atoms belonging to the $(100)$ and $(110)$ faces of the conventional silicon cube that lie in those planes, and find the surface densities in $\mathrm{cm^{-2}}$. (The $(110)$ plane through two opposite edges of the cube is a rectangle $a \times \sqrt2 a$ containing $4$ atoms.)
::: solution
On a $(100)$ cube face the atoms of the face lie at the four corners (each shared by four faces, total $1$) and at the face centre ($1$), so $2$ atoms in area $a^2$: $2/a^2 = 2/(5.431\times10^{-8})^2 = 6.78\times10^{14}\,\mathrm{cm^{-2}}$. The $(110)$ rectangle has area $\sqrt2a^2$ and $4$ atoms: $4/(\sqrt2a^2) = 9.59\times10^{14}\,\mathrm{cm^{-2}}$. The $(110)$ plane is denser, but each of its atoms has a different bonding geometry; what matters for the oxide interface is the number of dangling bonds, which is lowest on $(100)$.
:::
:::

::: exercise Free electrons in the Kronig–Penney model {level=2}
(a) Show that for $P = 0$ the Kronig–Penney condition gives $E = \hbar^2k^2/2m_0$ when $k$ is allowed to range over all real numbers (the "extended zone"). (b) Show that for $P \to \infty$ the allowed energies shrink to the levels $E_n = n^2\pi^2\hbar^2/(2m_0a^2)$ of a particle in a box of width $a$, and explain why.
::: solution
(a) With $P = 0$, $\cos ka = \cos\alpha a$, so $\alpha a = \pm ka + 2\pi n$. Taking the branch $\alpha = \abs{k}$ in the extended zone gives $E = \hbar^2\alpha^2/2m_0 = \hbar^2k^2/2m_0$; folding back into the first zone just relabels the same states.

(b) Divide [[#eq-kp]] by $P$: $\sin(\alpha a)/\alpha a = (\cos ka - \cos\alpha a)/P \to 0$, so only $\alpha a = n\pi$ survives (for $n \ge 1$), giving $E_n = \hbar^2n^2\pi^2/(2m_0a^2)$ for every $k$: flat bands. Infinitely strong barriers isolate each cell, so the electron is confined to a box of width $a$ and cannot hop to its neighbours; the bands have zero width, like the levels of isolated atoms.
:::
:::

::: exercise Velocity and mass across a band {level=2 check="pi/2/0.3e-9"}
For the tight-binding band of [[#ex-tight-binding]], at what wave vector $k$ (in $\mathrm{m^{-1}}$, positive) is the effective mass infinite? Describe the sign of $m^*$ on either side.
::: solution
$m^* = \hbar^2/(2ta^2\cos ka)$ is infinite where $\cos ka = 0$, at $k = \pi/(2a) = \pi/(0.6\times10^{-9}) = 5.24\times10^{9}\,\mathrm{m^{-1}}$. For $\abs{k} < \pi/2a$ the mass is positive (the electron accelerates along the force), for $\pi/2a < \abs{k} \le \pi/a$ it is negative. The velocity, $(2ta/\hbar)\sin ka$, is maximum exactly where the mass is infinite.
:::
:::

::: exercise Effective masses of silicon {level=3}
The conduction band of silicon has six ellipsoidal valleys with $m_l = 0.98\,m_0$ and $m_t = 0.19\,m_0$. (a) Show that a single ellipsoid has the same density of states as a sphere of mass $(m_lm_t^2)^{1/3}$, and hence find the density-of-states mass of all six valleys, $m_{dn}^* = 6^{2/3}(m_lm_t^2)^{1/3}$. (b) Find the conductivity effective mass $m_{cn}^* = 3/(1/m_l + 2/m_t)$, and explain where the formula comes from.
::: hint
(a) The volume in $\mathbf k$-space inside an ellipsoid $E = \frac{\hbar^2}{2}\left(\frac{k_1^2}{m_l} + \frac{k_2^2 + k_3^2}{m_t}\right)$ is that of a sphere scaled by $\sqrt{m_l}\,m_t$ compared with unit mass. The density of states of a spherical band goes as $m^{3/2}$.
:::
::: solution
(a) Substituting $k_1 = \sqrt{m_l}\,\kappa_1$, $k_{2,3} = \sqrt{m_t}\,\kappa_{2,3}$ turns the ellipsoid into a sphere $E = \hbar^2\kappa^2/2$ with Jacobian $\sqrt{m_l}\,m_t = (m_lm_t^2)^{1/2}$. A spherical band of mass $m$ has $k$-space volume proportional to $m^{3/2}$ below a given energy, so the ellipsoid counts like a sphere with $m^{3/2} = (m_lm_t^2)^{1/2}$, i.e. $m = (m_lm_t^2)^{1/3}$. Six valleys multiply the number of states by $6 = (6^{2/3})^{3/2}$, so $m_{dn}^* = 6^{2/3}(m_lm_t^2)^{1/3} = 3.30\times(0.98\times0.19^2)^{1/3}m_0 = 3.30\times0.328\,m_0 = 1.08\,m_0$.

(b) A field along $[100]$ accelerates the electrons in the two valleys on the $k_x$ axis with mass $m_l$ and those in the four other valleys with $m_t$. The current is proportional to the average of $1/m$ over the valleys, which are equally populated: $\langle 1/m\rangle = \frac13(1/m_l + 2/m_t)$. Hence $m_{cn}^* = 3/(1/0.98 + 2/0.19)\,m_0 = 3/(1.020 + 10.526)\,m_0 = 0.26\,m_0$. The two masses differ by a factor of about four: counting states is dominated by the heavy direction, conduction by the light ones.
:::
:::

::: exercise Hole current from a missing electron {level=3}
A band has $E(k) = E_0 - 2t\cos ka$ and is full except for one empty state at $k_e$. (a) Show that the total crystal momentum $\sum\hbar k$ of the electrons is $-\hbar k_e$. (b) Show that a force $F$ on every electron changes $k_e$ at the rate $\hbar\dot k_e = F$, and that the current of the band changes as if a particle of charge $+q$, velocity $v(k_e)$ and mass $-m^*(k_e)$ were present. (c) Explain why holes are useful only near the top of the band.
::: solution
(a) Summed over the full band, $\sum\hbar k = 0$ because the allowed $k$ are symmetric. Removing the electron at $k_e$ leaves $-\hbar k_e$. (This is why the hole is assigned wave vector $k_h = -k_e$.)

(b) Every electron obeys $\hbar\dot k = F = -q\mathcal E$, and the empty state moves along with them because the occupation of each state is carried with its $k$. The current is $J = +(q/L)v(k_e)$ (from the argument after [[#prop-full-band]]), so $\dot J = (q/L)\dot v = (q/L)F/m^*(k_e)$. Writing $F = -q\mathcal E$, $\dot J = (q/L)(q\mathcal E)/(-m^*)$: this is the acceleration of a charge $+q$ under the field $\mathcal E$ with mass $-m^*$, positive near the band top where $m^* < 0$.

(c) Near the top of the band $-m^*$ is positive and nearly constant ($\hbar^2/2ta^2$ for this band), so the hole is a well-behaved particle with fixed positive mass. Deep inside the band $-m^*$ varies and changes sign at $k = \pi/2a$, and the description loses its simplicity; in a real semiconductor the empty states are always within a few $kT$ of the valence-band maximum, so the simple picture applies.
:::
:::

::: exercise Choosing a photodetector material {level=2}
Which of Si, Ge, GaAs and InGaAs ($E_g = 0.75\,\mathrm{eV}$) can detect (a) $850\,\mathrm{nm}$ light from a VCSEL in a data-centre link, (b) $1310\,\mathrm{nm}$ light in a fibre link? Give the photon energies.
::: solution
(a) $E = 1.240/0.850 = 1.46\,\mathrm{eV}$. This exceeds the gaps of Si ($1.12$), Ge ($0.66$), GaAs ($1.42$, only just) and InGaAs, so all four absorb it; silicon and GaAs photodiodes are used. (b) $E = 1.240/1.310 = 0.947\,\mathrm{eV}$, below the gaps of Si and GaAs, so only Ge and InGaAs absorb it.
:::
:::
