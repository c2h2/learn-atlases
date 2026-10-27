Why is copper a metal and diamond an insulator? Both are made of atoms whose electrons are bound with energies of a few electronvolts, both are crystals, and in both the atoms are close enough that their outer orbitals overlap. Yet the resistivity of diamond is more than twenty orders of magnitude larger than that of copper. The free-electron gas of [[condensed-matter/free-electrons]] cannot even ask this question: in it every material with conduction electrons conducts.

The answer is band theory, and it rests on one theorem. In a perfectly periodic potential, an electron's energy eigenstates are plane waves modulated by a function with the period of the lattice. That is Bloch's theorem, and it has two immediate consequences that the free gas lacks. First, an electron in a perfect crystal does not scatter off the ions at all, which explains the long mean free paths of pure metals. Second, the allowed energies form **bands** separated by **gaps**, and whether a solid conducts depends on whether its highest band is full or partly full.

We prove Bloch's theorem, then compute bands in two opposite limits. The **nearly-free-electron** model starts from plane waves and treats the lattice potential as a small perturbation; it shows that gaps open exactly where electron waves satisfy the Bragg condition of [[condensed-matter/crystals]]. The **tight-binding** model starts from atomic orbitals and lets electrons hop between neighbours; it shows how an atomic level spreads into a band. Effective masses, holes and the counting of states then decide between metal and insulator. We use the time-independent Schrödinger equation and the finite-barrier methods of [[quantum-1/piecewise-potentials]], degenerate perturbation theory from [[quantum-2/stationary-perturbation]], and the translation-operator language of [[quantum-1/formalism]].

## Bloch's theorem {#bloch}

Consider one electron in a potential with the periodicity of a Bravais lattice:

$$
H = \frac{\mathbf p^2}{2m} + U(\mathbf r), \qquad U(\mathbf r + \mathbf R) = U(\mathbf r) \quad \text{for all lattice vectors } \mathbf R.
$$ {#eq-periodic-h}

The potential $U$ is an average: it includes the attraction of the ions and the mean repulsion of the other electrons. Treating electrons one at a time in such a potential is the **independent-electron approximation**. It is remarkably good for simple metals and semiconductors, and its failures, such as Mott insulators, are part of modern research.

::: theorem Bloch's theorem {#thm-bloch}
The eigenstates of [[#eq-periodic-h]] can be chosen to have the form

$$
\psi_{n\mathbf k}(\mathbf r) = e^{i\mathbf k\cdot\mathbf r}\,u_{n\mathbf k}(\mathbf r), \qquad u_{n\mathbf k}(\mathbf r + \mathbf R) = u_{n\mathbf k}(\mathbf r),
$$ {#eq-bloch}

where $\mathbf k$ is a wavevector and $n$ is a band index. Equivalently, $\psi_{n\mathbf k}(\mathbf r + \mathbf R) = e^{i\mathbf k\cdot\mathbf R}\,\psi_{n\mathbf k}(\mathbf r)$ for every lattice vector $\mathbf R$.
:::

::: proof
For each lattice vector define the **translation operator** $T_{\mathbf R}$ by $(T_{\mathbf R}\psi)(\mathbf r) = \psi(\mathbf r + \mathbf R)$. Because $U$ is periodic and the kinetic energy is unchanged by a shift of origin, $T_{\mathbf R}H\psi = HT_{\mathbf R}\psi$ for every $\psi$: each translation commutes with $H$. Translations also commute with each other, $T_{\mathbf R}T_{\mathbf R'} = T_{\mathbf R + \mathbf R'} = T_{\mathbf R'}T_{\mathbf R}$. A set of mutually commuting operators that commute with $H$ can be diagonalised together with $H$, so we may choose eigenstates $\psi$ of $H$ that satisfy $T_{\mathbf R}\psi = c(\mathbf R)\psi$ for all $\mathbf R$.

The eigenvalues obey $c(\mathbf R + \mathbf R') = c(\mathbf R)c(\mathbf R')$, since applying the two translations in turn multiplies by both. Impose the Born–von Kármán boundary conditions: the crystal has $N_i$ cells along $\mathbf a_i$ and $\psi(\mathbf r + N_i\mathbf a_i) = \psi(\mathbf r)$. Then $c(\mathbf a_i)^{N_i} = 1$, so $c(\mathbf a_i) = e^{2\pi i m_i/N_i}$ for some integer $m_i$. With the reciprocal vectors $\mathbf b_j$ of [[condensed-matter/crystals]], which satisfy $\mathbf a_i\cdot\mathbf b_j = 2\pi\delta_{ij}$, define

$$
\mathbf k = \sum_j\frac{m_j}{N_j}\,\mathbf b_j,
$$

so that $c(\mathbf a_i) = e^{i\mathbf k\cdot\mathbf a_i}$. By the multiplicative property, for $\mathbf R = \sum n_i\mathbf a_i$,

$$
c(\mathbf R) = \prod_i c(\mathbf a_i)^{n_i} = e^{i\mathbf k\cdot\mathbf R}.
$$

So $\psi(\mathbf r + \mathbf R) = e^{i\mathbf k\cdot\mathbf R}\psi(\mathbf r)$. Finally put $u(\mathbf r) = e^{-i\mathbf k\cdot\mathbf r}\psi(\mathbf r)$; then $u(\mathbf r + \mathbf R) = e^{-i\mathbf k\cdot\mathbf r}e^{-i\mathbf k\cdot\mathbf R}e^{i\mathbf k\cdot\mathbf R}\psi(\mathbf r) = u(\mathbf r)$, which is [[#eq-bloch]]. For each $\mathbf k$ the periodic function $u$ satisfies a Schrödinger equation on a single cell, which has a discrete set of solutions labelled by $n$.
:::

The proof is the same argument that gave the phonon modes of [[condensed-matter/lattice-vibrations]] the form $e^{ikna}$: symmetry under translation forces eigenstates to pick up a phase on translation. The wavevector $\mathbf k$ takes $N = N_1N_2N_3$ distinct values in a primitive cell of the reciprocal lattice, one for each primitive cell of the crystal.

### Crystal momentum and the reduced zone

A Bloch state is not an eigenstate of momentum, since $u_{n\mathbf k}$ contains many Fourier components. The vector $\hbar\mathbf k$ is called the **crystal momentum**. It is conserved in a perfect crystal, but only up to a reciprocal lattice vector, because $\mathbf k$ and $\mathbf k + \mathbf G$ give the same phases $e^{i\mathbf k\cdot\mathbf R}$ and so describe the same set of states.

::: corollary Periodicity in k {#cor-periodic-k}
The labels may be chosen so that $\psi_{n,\mathbf k + \mathbf G} = \psi_{n\mathbf k}$ and $E_n(\mathbf k + \mathbf G) = E_n(\mathbf k)$ for every reciprocal lattice vector $\mathbf G$. All distinct states are obtained with $\mathbf k$ in the first Brillouin zone.
:::

::: proof
If $\psi$ satisfies $\psi(\mathbf r + \mathbf R) = e^{i\mathbf k\cdot\mathbf R}\psi(\mathbf r)$, then since $e^{i\mathbf G\cdot\mathbf R} = 1$ it also satisfies the condition with $\mathbf k + \mathbf G$. The set of eigenstates with Bloch wavevector $\mathbf k$ is therefore identical to the set with $\mathbf k + \mathbf G$, and labelling each set's members in order of increasing energy by $n = 1, 2, \dots$ gives the stated periodicity. Every $\mathbf k$ differs by some $\mathbf G$ from a point of the first Brillouin zone.
:::

So the electron spectrum is a set of continuous functions $E_n(\mathbf k)$, one for each band, defined on the Brillouin zone and periodic beyond it. A **band structure** diagram plots them along lines joining points of high symmetry in the zone. The Bloch states also carry current without decay. The mean velocity of an electron in state $n\mathbf k$ turns out to be

$$
\mathbf v_n(\mathbf k) = \frac1\hbar\,\nabla_{\mathbf k}E_n(\mathbf k),
$$ {#eq-band-velocity}

the group velocity of a wave packet built from the band. It is nonzero for a generic $\mathbf k$ even though the electron moves through a lattice of ions. A perfectly periodic potential, however strong, does not scatter: that is why resistivity comes from impurities and phonons, which break the periodicity, and not from the ions themselves.

## Nearly free electrons {#nfe}

Suppose the potential is weak. Then the eigenstates should be close to the plane waves $e^{i\mathbf k\cdot\mathbf r}$ with energies $\varepsilon_{\mathbf k} = \hbar^2k^2/2m$. Expand the periodic potential in its Fourier series over the reciprocal lattice,

$$
U(\mathbf r) = \sum_{\mathbf G}U_{\mathbf G}\,e^{i\mathbf G\cdot\mathbf r}, \qquad U_{-\mathbf G} = U_{\mathbf G}^*,
$$

and choose the zero of energy so that $U_0 = 0$. The potential connects the plane wave $\mathbf k$ only to the plane waves $\mathbf k - \mathbf G$, with matrix element $\langle\mathbf k - \mathbf G\rvert U\lvert\mathbf k\rangle = U_{-\mathbf G}$ (normalised plane waves in the box of volume $V$). This is the momentum-space version of Bloch's theorem: a Bloch state with wavevector $\mathbf k$ is a superposition of the plane waves $\mathbf k - \mathbf G$ for all $\mathbf G$.

To first order in $U$ the energy does not change at all, since $U_0 = 0$. To second order, non-degenerate perturbation theory gives

$$
E(\mathbf k) = \varepsilon_{\mathbf k} + \sum_{\mathbf G\neq0}\frac{\abs{U_{\mathbf G}}^2}{\varepsilon_{\mathbf k} - \varepsilon_{\mathbf k - \mathbf G}} + \dots,
$$

which is a small correction unless some denominator is small. It vanishes when $\varepsilon_{\mathbf k} = \varepsilon_{\mathbf k - \mathbf G}$, that is when $\abs{\mathbf k} = \abs{\mathbf k - \mathbf G}$: when $\mathbf k$ lies on the plane that perpendicularly bisects $\mathbf G$. That plane is a face of a Brillouin zone, and the condition $k^2 = (\mathbf k - \mathbf G)^2$ is precisely the Laue condition of [[condensed-matter/crystals]] for elastic scattering from $\mathbf k$ to $\mathbf k - \mathbf G$. The electron wave is Bragg-reflected by the lattice. There perturbation theory must be done with degenerate states.

::: theorem Gap at a zone boundary {#thm-nfe-gap}
Near a point $\mathbf k$ where only the two plane waves $\mathbf k$ and $\mathbf k - \mathbf G$ are nearly degenerate, the two band energies are

$$
E_\pm(\mathbf k) = \frac{\varepsilon_{\mathbf k} + \varepsilon_{\mathbf k - \mathbf G}}{2} \pm\sqrt{\Bigl(\frac{\varepsilon_{\mathbf k} - \varepsilon_{\mathbf k - \mathbf G}}{2}\Bigr)^2 + \abs{U_{\mathbf G}}^2}.
$$ {#eq-nfe}

On the zone face, where $\varepsilon_{\mathbf k} = \varepsilon_{\mathbf k - \mathbf G}$, the bands are split by a gap $E_+ - E_- = 2\abs{U_{\mathbf G}}$.
:::

::: proof
Restrict the Hamiltonian to the two-dimensional space spanned by $\lvert\mathbf k\rangle$ and $\lvert\mathbf k - \mathbf G\rangle$, the leading approximation of degenerate perturbation theory. Write the trial state as $c_1\lvert\mathbf k\rangle + c_2\lvert\mathbf k - \mathbf G\rangle$. The diagonal elements of $H$ are $\varepsilon_{\mathbf k}$ and $\varepsilon_{\mathbf k - \mathbf G}$, and the off-diagonal elements are $\langle\mathbf k\rvert U\lvert\mathbf k - \mathbf G\rangle = U_{\mathbf G}$ and its conjugate. The eigenvalue condition is

$$
\det\begin{pmatrix}\varepsilon_{\mathbf k} - E & U_{\mathbf G} \\ U_{\mathbf G}^* & \varepsilon_{\mathbf k - \mathbf G} - E\end{pmatrix} = (\varepsilon_{\mathbf k} - E)(\varepsilon_{\mathbf k - \mathbf G} - E) - \abs{U_{\mathbf G}}^2 = 0.
$$

This quadratic in $E$ has the roots [[#eq-nfe]], by completing the square. With $\varepsilon_{\mathbf k} = \varepsilon_{\mathbf k - \mathbf G}$ the square root reduces to $\abs{U_{\mathbf G}}$, and the two roots differ by $2\abs{U_{\mathbf G}}$. The neglected plane waves are far from degenerate and shift the energies only at second order in $U$.
:::

In one dimension, with lattice constant $a$ and $G = 2\pi/a$, the boundary is at $k = \pi/a$. There the two eigenstates are, for real $U_G < 0$ (an attractive potential concentrated on the ions), the standing waves $\cos(\pi x/a)$ with energy $\varepsilon - \abs{U_G}$ and $\sin(\pi x/a)$ with energy $\varepsilon + \abs{U_G}$. The cosine piles charge on the ions, where the potential is low; the sine piles it between them. The gap is the difference of potential energy between the two standing waves that a travelling wave is forced to become when it is Bragg-reflected.

::: widget plot
f: x^2; (abs(x) - 2)^2; (x^2 + (abs(x) - 2)^2)/2 - sqrt(((x^2 - (abs(x) - 2)^2)/2)^2 + U^2); (x^2 + (abs(x) - 2)^2)/2 + sqrt(((x^2 - (abs(x) - 2)^2)/2)^2 + U^2)
x: -1, 1
y: 0, 2.5
labels: free k²; free (k − G)²; band 1; band 2
sliders: U=0.15:0:0.5:0.01
caption: The two lowest nearly-free-electron bands of a one-dimensional crystal in the reduced zone, from [[#eq-nfe]]: $x = ka/\pi$, energies in units of the free-electron energy at the zone boundary, and $U = \abs{U_G}$ in the same units. Far from the boundary the bands hug the free parabolas. At $x = \pm1$ they repel, and the gap is exactly $2U$. Set $U = 0$ to see the free parabola folded back into the zone; then increase $U$ and watch the bands flatten at the boundary, where the group velocity vanishes.
:::

::: example A one-dimensional gap {#ex-nfe-gap}
A one-dimensional crystal has $a = 3.00\,\text{Å}$ and a lattice potential with Fourier coefficient $\abs{U_G} = 0.50\,\mathrm{eV}$ for $G = 2\pi/a$. Find the free-electron energy at the zone boundary, the energies at the bottom and top of the gap, and the fraction of the zone-boundary energy that the gap represents.
::: solution
At $k = \pi/a$,

$$
\varepsilon_{\pi/a} = \frac{\hbar^2}{2m}\Bigl(\frac{\pi}{a}\Bigr)^2 = 3.810\,\mathrm{eV\,\text{Å}^2}\times\Bigl(\frac{\pi}{3.00\,\text{Å}}\Bigr)^2 = 4.18\,\mathrm{eV},
$$

where $\hbar^2/2m = 3.810\,\mathrm{eV\,\text{Å}^2}$ is a number worth remembering. By [[#thm-nfe-gap]] the band edges are $4.18 - 0.50 = 3.68\,\mathrm{eV}$ and $4.18 + 0.50 = 4.68\,\mathrm{eV}$, and the gap is $1.00\,\mathrm{eV}$, about a quarter of the zone-boundary energy. A potential of half an electronvolt is small compared with the kinetic energy, so the two-wave approximation is reasonable, and yet it produces a gap the size of the gap of silicon. Gaps of that size, at the right place, are enough to turn a conductor into an insulator.
:::
:::

### An exact model: the Kronig–Penney comb

Perturbation theory assumes a weak potential. A model that can be solved for any strength makes the same point without that assumption. Let the potential be a comb of repulsive delta functions, $U(x) = \alpha\sum_n\delta(x - na)$ with $\alpha > 0$: a cartoon of ions as sharp scatterers, introduced in a square-barrier form by Ralph Kronig and William Penney in 1931.

::: proposition Kronig–Penney condition {#prop-kp}
For $E = \hbar^2q^2/2m > 0$, the delta comb has a Bloch eigenstate with wavevector $k$ if and only if

$$
\cos ka = \cos qa + P\,\frac{\sin qa}{qa}, \qquad P = \frac{m\alpha a}{\hbar^2}.
$$ {#eq-kp}

Energies for which the right-hand side lies outside $[-1, 1]$ are forbidden: they form the gaps.
:::

::: proof
Between the deltas the potential vanishes, so on $0 < x < a$ the solution is $\psi = Ae^{iqx} + Be^{-iqx}$. By [[#thm-bloch]], on $-a < x < 0$ it is $\psi(x) = e^{-ika}\psi(x + a) = e^{-ika}\bigl(Ae^{iq(x+a)} + Be^{-iq(x+a)}\bigr)$. At the delta at $x = 0$, $\psi$ is continuous and $\psi'$ jumps by $(2m\alpha/\hbar^2)\psi(0)$, as in [[quantum-1/piecewise-potentials]]. Continuity gives

$$
A + B = e^{-ika}\bigl(Ae^{iqa} + Be^{-iqa}\bigr),
$$

and the jump condition gives

$$
iq(A - B) - iqe^{-ika}\bigl(Ae^{iqa} - Be^{-iqa}\bigr) = \frac{2m\alpha}{\hbar^2}(A + B).
$$

These are two homogeneous linear equations for $A$ and $B$. Setting the determinant to zero and simplifying with $e^{ika} + e^{-ika} = 2\cos ka$ gives, after a page of algebra that [[#exr-kp]] asks for, $\cos ka = \cos qa + (m\alpha/\hbar^2q)\sin qa$, which is [[#eq-kp]]. Since $\abs{\cos ka}\le1$ for real $k$, an energy is allowed only if the right-hand side lies between $-1$ and $1$.
:::

::: widget plot
f: cos(x) + P*sin(x)/x; 1; -1
x: 0.01, 13
y: -2, 4
labels: cos qa + P sin(qa)/qa; +1; −1
sliders: P=3:0:15:0.1
caption: The right-hand side of the Kronig–Penney condition [[#eq-kp]] against $qa = a\sqrt{2mE}/\hbar$. Allowed bands are the ranges of $qa$ where the curve lies between the lines $\pm1$; the gaps are where it escapes. At $P = 0$ the curve is $\cos qa$ and there are no gaps. Raise $P$ and notice that the gaps open at $qa = \pi, 2\pi, 3\pi$, the zone boundaries, and widen, while the bands shrink towards the levels $qa = n\pi$ of isolated wells. Strong barriers give narrow bands: the bridge to the next section.
:::

::: quiz
In the nearly-free-electron model, where in $\mathbf k$-space do the energy gaps open?
- [ ] At $\mathbf k = 0$, where the electron is slowest.
- [x] On the Brillouin-zone faces, where $\abs{\mathbf k} = \abs{\mathbf k - \mathbf G}$ and the electron wave satisfies the Bragg condition.
- [ ] At the Fermi surface, wherever it lies.
- [ ] Uniformly throughout the zone, as a shift of every energy by $U_0$.
::: solution
The potential couples $\mathbf k$ to $\mathbf k - \mathbf G$, and the coupling matters only where the two free energies are equal, on the plane bisecting $\mathbf G$, which is a zone face. That is also where an electron wave is Bragg-reflected. The average potential $U_0$ shifts every energy equally and opens no gap. Gaps are fixed by the lattice, not by the Fermi surface, though when the two coincide the consequences are large.
:::
:::

## Tight binding {#tight-binding}

The opposite limit starts from isolated atoms. Each has a bound orbital $\phi(\mathbf r)$ with energy $\varepsilon_0$. Bring $N$ atoms together on a lattice and the orbitals begin to overlap; an electron on one atom can tunnel to a neighbour. In one dimension, build a Bloch state from the atomic orbitals $\phi_n(x) = \phi(x - na)$ by giving each a phase:

$$
\psi_k(x) = \frac{1}{\sqrt N}\sum_n e^{ikna}\,\phi_n(x).
$$ {#eq-lcao}

It satisfies $\psi_k(x + a) = e^{ika}\psi_k(x)$, so it has the Bloch form. This is a **linear combination of atomic orbitals**, the same idea that builds molecular orbitals in chemistry, and here translation symmetry fixes the coefficients.

::: proposition Tight-binding band {#prop-tb}
Assume the orbitals on different sites are orthogonal, and that the only nonzero matrix elements of $H$ between them are $\langle\phi_n\rvert H\lvert\phi_n\rangle = \varepsilon_0$ and $\langle\phi_{n\pm1}\rvert H\lvert\phi_n\rangle = -t$ with $t > 0$. Then [[#eq-lcao]] is an exact eigenstate with energy

$$
E(k) = \varepsilon_0 - 2t\cos ka.
$$ {#eq-tb}

The band has width $4t$, from $\varepsilon_0 - 2t$ at $k = 0$ to $\varepsilon_0 + 2t$ at $k = \pm\pi/a$.
:::

::: proof
Apply $H$ to $\phi_n$ and use the assumptions, which say that in the basis of orbitals $H$ has $\varepsilon_0$ on the diagonal and $-t$ connecting neighbours: $H\phi_n = \varepsilon_0\phi_n - t(\phi_{n+1} + \phi_{n-1})$. Then

$$
H\psi_k = \frac{1}{\sqrt N}\sum_n e^{ikna}\bigl[\varepsilon_0\phi_n - t\phi_{n+1} - t\phi_{n-1}\bigr].
$$

Shift the summation index in the second and third terms ($n+1\to n$, $n-1\to n$): the coefficient of $\phi_n$ becomes $\varepsilon_0e^{ikna} - te^{ik(n-1)a} - te^{ik(n+1)a} = e^{ikna}(\varepsilon_0 - 2t\cos ka)$. So $H\psi_k = (\varepsilon_0 - 2t\cos ka)\psi_k$. Periodic boundary conditions on a ring of $N$ atoms make the shift of index exact.
:::

The hopping $t$ is an overlap integral. It falls off exponentially with the distance between atoms, since the orbital tails do, and so does the width of the band. Deep core levels, with tiny orbitals, form bands so narrow that they are effectively still atomic levels; the outer valence orbitals form bands several electronvolts wide. Each atomic orbital gives one band of $N$ states (times two for spin). In three dimensions, for a simple cubic lattice with nearest-neighbour hopping, the same calculation gives

$$
E(\mathbf k) = \varepsilon_0 - 2t\bigl(\cos k_xa + \cos k_ya + \cos k_za\bigr),
$$ {#eq-tb3d}

a band of width $12t$.

::: intuition Two pictures, one band
The nearly-free model says: start with a continuous parabola and cut gaps into it at the zone boundaries. Tight binding says: start with sharp atomic levels and broaden each into a band. The Kronig–Penney figure interpolates between them as $P$ grows. Real solids sit somewhere in between, and the two pictures agree on the qualitative facts that matter: bands of $2N$ states, gaps between them, flat bands near the zone boundary and parabolic bands near their extremes. The chemist's version, with orbitals and bonding and antibonding combinations, is in Chemistry Atlas ([electronic structure of solids](/learn/chemistry/lesson.php?c=materials-chemistry&l=electronic-structure-solids)).
:::

## Effective mass and holes {#effective-mass}

Near the bottom of the tight-binding band, $\cos ka \approx 1 - \frac12(ka)^2$, so

$$
E(k) \approx \varepsilon_0 - 2t + ta^2k^2.
$$

This is a free-particle parabola $\hbar^2k^2/2m^*$ with a different mass. Near any band minimum, the same is true: a Taylor expansion of $E(k)$ starts with a quadratic.

::: definition Effective mass {#def-effective-mass}
At an extremum $\mathbf k_0$ of a band in one dimension, or along a principal axis of the curvature in three, the **effective mass** is

$$
\frac{1}{m^*} = \frac{1}{\hbar^2}\,\frac{\dd^2E}{\dd k^2}\bigg\rvert_{k_0}.
$$ {#eq-mstar}

Near $k_0$, $E(k)\approx E(k_0) + \hbar^2(k - k_0)^2/2m^*$.
:::

The effective mass matters because of how Bloch electrons respond to forces. Under a weak external force $\mathbf F$, such as $-e\mathbf E$, the crystal momentum changes as

$$
\hbar\deriv{\mathbf k}{t} = \mathbf F,
$$ {#eq-semiclassical}

the semiclassical equation of motion, whose derivation (by following a wave packet) is in Ashcroft and Mermin, chapter 12. Combine it with [[#eq-band-velocity]] in one dimension: $\dd v/\dd t = (1/\hbar)(\dd^2E/\dd k^2)(\dd k/\dd t) = F/m^*$. The electron accelerates as if it were a free particle of mass $m^*$. All the forces of the lattice, which are enormous, are absorbed into the shape of the band; only the external force appears explicitly. This is why the free-electron model works for metals with nearly parabolic bands, with $m$ replaced by $m^*$.

::: example Effective mass in a tight-binding band {#ex-tb-mass}
A tight-binding band has $t = 1.00\,\mathrm{eV}$ and $a = 3.00\,\text{Å}$. Find the effective mass at the bottom of the band in units of the free-electron mass, and the maximum band velocity.
::: solution
Differentiate [[#eq-tb]] twice: $\dd^2E/\dd k^2 = 2ta^2\cos ka$, which equals $2ta^2$ at $k = 0$. By [[#eq-mstar]], $m^* = \hbar^2/(2ta^2)$. Dividing by $m$,

$$
\frac{m^*}{m} = \frac{\hbar^2/2m}{ta^2} = \frac{3.810\,\mathrm{eV\,\text{Å}^2}}{(1.00\,\mathrm{eV})(9.00\,\text{Å}^2)} = 0.423.
$$

The electron is lighter than a free one: a wide band means easy hopping. The band velocity is $v = (1/\hbar)\,\dd E/\dd k = (2ta/\hbar)\sin ka$, largest at $ka = \pi/2$:

$$
v_\mathrm{max} = \frac{2ta}{\hbar} = \frac{2(1.602\times10^{-19})(3.00\times10^{-10})}{1.05457\times10^{-34}}\,\mathrm{m/s} = 9.1\times10^5\,\mathrm{m/s}.
$$

The order of magnitude matches the Fermi velocities of [[condensed-matter/free-electrons]]. At the top of the band, $k = \pi/a$, the second derivative is $-2ta^2$, and the effective mass is $-0.423\,m$: negative.
:::
:::

::: widget plot
f: -2*cos(x); -2 + x^2; 2 - (abs(x) - pi)^2
x: -pi, pi
y: -2.5, 2.5
piticks: true
labels: band E(k); parabola at the bottom; inverted parabola at the top
caption: The tight-binding band $E = -2t\cos ka$ in units with $t = a = 1$, with the parabola $-2 + k^2$ that defines the effective mass $m^* = \hbar^2/2ta^2$ at the bottom and the inverted parabola that defines the negative mass at the top. Follow the band from $k = 0$ to $k = \pi$: the slope, hence the velocity, rises and then falls back to zero at the zone boundary. An electron pushed steadily by a field moves along this curve, speeds up, slows down and reverses: a Bloch oscillation.
:::

A negative effective mass near the top of a band means that an electron there accelerates *against* the applied force. An electron pushed steadily by a constant field moves through the zone at a constant rate by [[#eq-semiclassical]], reaches the boundary, reappears at the opposite side (the same state, by [[#cor-periodic-k]]), and repeats, so its velocity oscillates. These are **Bloch oscillations**. Whether they can be seen is a question of time scales.

::: example Why a wire does not oscillate {#ex-bloch-osc}
An electron in a one-dimensional band of lattice constant $a = 3.00\,\text{Å}$ feels a field $E = 1.00\times10^7\,\mathrm{V/m}$, far above anything a metal wire can sustain. Find the Bloch period and compare it with the relaxation time $\tau = 2.5\times10^{-14}\,\mathrm s$ of copper at room temperature.
::: solution
By [[#eq-semiclassical]], $\abs{\dd k/\dd t} = eE/\hbar$. One full oscillation takes the electron across the whole zone, a distance $2\pi/a$ in $k$, so

$$
T_B = \frac{2\pi/a}{eE/\hbar} = \frac{h}{eEa} = \frac{6.62607\times10^{-34}}{(1.60218\times10^{-19})(1.00\times10^{7})(3.00\times10^{-10})}\,\mathrm s = 1.38\times10^{-12}\,\mathrm s.
$$

That is $55$ times $\tau$. The electron is scattered long before it reaches the zone boundary, so it only ever explores a tiny region of the band near its starting point, the Fermi sphere is merely shifted, and Ohm's law results. In ordinary wires, with fields of volts per metre, the ratio is a million times worse. Bloch oscillations have been observed only in systems engineered to reverse the inequality: semiconductor superlattices with periods of $10\,\mathrm{nm}$, and cold atoms in optical lattices, which have no impurities or phonons at all.
:::
:::

### Holes

Consider a band that is completely full except for one empty state $\mathbf k_e$. A full band carries no current: for each $\mathbf k$ there is a $-\mathbf k$ with opposite velocity, since $E(-\mathbf k) = E(\mathbf k)$ by time-reversal symmetry. The current of the nearly full band is therefore minus the current that the missing electron would carry:

$$
\mathbf j = -e\sum_{\text{occupied}}\mathbf v(\mathbf k) = -e\Bigl[\sum_\text{all}\mathbf v - \mathbf v(\mathbf k_e)\Bigr] = +e\,\mathbf v(\mathbf k_e).
$$

The band behaves as one particle of charge $+e$ moving with the velocity of the empty state: a **hole**. Since empty states collect near the top of a band, where $m^*$ is negative, the hole's response to a force, which involves the charge divided by the mass, is that of a positive charge with positive mass $\abs{m^*}$. This is how band theory explains the positive Hall coefficients of beryllium, magnesium and aluminium that the Drude model could not, and it is the language of [[condensed-matter/semiconductors]].

::: warning Effective mass is a property of a point in a band
The effective mass is not a property of the electron, and it is not one number for a material. It is defined at a band extremum by the curvature there, it can be negative, it can depend on direction (silicon's conduction-band minima have $m^*_\parallel = 0.92\,m$ and $m^*_\perp = 0.19\,m$), and away from extrema [[#eq-mstar]] varies with $\mathbf k$. Another common error is to treat crystal momentum as momentum: an electron Bragg-reflected at the zone boundary changes $\hbar\mathbf k$ by $\hbar\mathbf G$ while the crystal takes up the recoil.
:::

::: quiz
A band is completely full except for a few empty states near its maximum. Which statements are correct?
- [x] The band's current is that of a few positive carriers moving with the velocities of the empty states.
- [ ] The band carries no current, because it is almost full.
- [x] The carriers respond to fields as positive charges with positive mass.
- [ ] The carriers are positrons.
::: solution
A full band carries no current, so the nearly full band carries $+e$ times the velocities of the missing electrons, which is the hole picture. Near the band maximum the electron effective mass is negative; charge $+e$ with mass $+\abs{m^*}$ gives the same acceleration as $-e$ with mass $-\abs{m^*}$, so the holes behave as ordinary positive particles. They are not positrons: they are a collective description of the electrons that remain.
:::
:::

## Metals, insulators and semiconductors {#metals-insulators}

Everything now reduces to counting.

::: theorem States in a band {#thm-band-count}
In a crystal of $N$ primitive cells with Born–von Kármán boundary conditions, each band contains exactly $N$ Bloch wavevectors and holds $2N$ electrons, counting spin.
:::

::: proof
By the proof of [[#thm-bloch]], the allowed wavevectors are $\mathbf k = \sum_j(m_j/N_j)\mathbf b_j$ with integer $m_j$. By [[#cor-periodic-k]], wavevectors that differ by a reciprocal lattice vector label the same states, so we may restrict each $m_j$ to $0\le m_j < N_j$. That gives $N_1N_2N_3 = N$ distinct wavevectors. For each $\mathbf k$ and each band index $n$ there is one spatial state, and each spatial state accommodates two electrons of opposite spin.
:::

Now fill the bands with the valence electrons in order of energy. If the electrons exactly fill some bands and leave the rest empty, with a gap between, there is no way to change the state by a small amount: any change requires lifting an electron across the gap. An applied field cannot produce a current, and the solid is an **insulator**. If a band is partly filled, there are empty states immediately above the occupied ones, the Fermi surface lies inside the band, a field can shift the distribution, and the solid is a **metal**.

Since each band holds $2N$ electrons, a crystal with an *odd* number of valence electrons per primitive cell must have a partly filled band, and is a metal: the alkali metals, with one electron per atom on a bcc lattice, and the noble metals copper, silver and gold. A crystal with an *even* number may be an insulator, but need not be: in three dimensions the bands can overlap in energy, the top of one lying above the bottom of the next somewhere in the zone, and then both are partly filled. The divalent metals beryllium, magnesium, calcium and zinc are metals for this reason, with small pockets of electrons and holes. Diamond has two carbon atoms per primitive cell, eight valence electrons, and four completely filled bands separated by a gap of $5.5\,\mathrm{eV}$ from the empty ones: an insulator. Silicon is the same with a gap of $1.12\,\mathrm{eV}$. Small enough that a few electrons are thermally excited across it at room temperature, that gap makes silicon a **semiconductor**.

::: example Is sodium's Fermi sphere inside the zone? {#ex-na-sphere}
Sodium is bcc with $a = 4.29\,\text{Å}$ and one electron per atom. Compare the free-electron $k_F$ with the distance from the centre of the Brillouin zone to its nearest face.
::: solution
The conventional cube holds two atoms, so $n = 2/a^3$ and $k_F = (3\pi^2\cdot2/a^3)^{1/3} = (6\pi^2)^{1/3}/a = 3.898/a$. The reciprocal lattice of bcc is fcc (Exercise 4 of [[condensed-matter/crystals]]), whose shortest vectors are $\frac{2\pi}{a}(1,1,0)$, of length $2\sqrt2\pi/a$. The nearest zone face bisects it, at distance $\sqrt2\pi/a = 4.443/a$. The ratio is

$$
\frac{k_F}{\sqrt2\pi/a} = \frac{(6\pi^2)^{1/3}}{\sqrt2\,\pi} = 0.877,
$$

independent of $a$. The Fermi sphere of a monovalent bcc metal stays clear of the zone faces, where the gaps open, so the Fermi surface remains nearly spherical. That is why the free-electron model of [[condensed-matter/free-electrons]] works so well for sodium and potassium. With $a = 4.29\,\text{Å}$, $k_F = 9.09\times10^9\,\mathrm{m^{-1}}$ and $E_F = 3.14\,\mathrm{eV}$. For monovalent fcc metals the corresponding ratio, to the hexagonal faces, is $0.903$; copper's Fermi surface is pulled out to touch those faces in "necks", seen in de Haas–van Alphen experiments by Pippard in 1957.
:::
:::

::: application Band structures in practice
Real band structures are computed by solving the Schrödinger equation in the periodic potential self-consistently, most often with density-functional theory, and they are measured directly by angle-resolved photoemission, which ejects electrons with light and records their energy and momentum. A computed band structure answers whether a new compound is a metal, what its gap is, whether that gap is direct (absorbing light efficiently, as in gallium arsenide) or indirect (as in silicon), and what effective masses its carriers have. The independent-electron picture fails in materials with narrow $d$ or $f$ bands and strong repulsion: nickel oxide, with an odd number of electrons per cell, should be a metal by [[#thm-band-count]] and is a transparent insulator, a **Mott insulator**.
:::

::: history Bands and gaps
Felix Bloch proved his theorem in his 1928 doctoral thesis in Leipzig under Werner Heisenberg, with the aim of explaining why electrons in metals have such long mean free paths. Rudolf Peierls showed in 1929 that a nearly full band behaves as if it held positive carriers, explaining the anomalous Hall effect; Léon Brillouin introduced the zones that bear his name in 1930. Ralph Kronig and William Penney published their exactly solvable model in 1931. In the same year Alan Wilson, working with Heisenberg and Bloch's ideas, gave the band-theoretic distinction between metals and insulators, including the idea that a semiconductor is an insulator with a small gap. In 1937 Jan Hendrik de Boer and Evert Verwey pointed out that nickel oxide does not fit the scheme, and Nevill Mott and Rudolf Peierls suggested that the repulsion between electrons was the reason, opening the subject of strongly correlated electrons.
:::

## Where this leads {#leads}

Band theory is the language of the rest of solid-state physics. [[condensed-matter/semiconductors]] takes a filled valence band, an empty conduction band and a gap of about an electronvolt, adds electrons and holes with effective masses, and builds the p–n junction. In [[condensed-matter/magnetism-superconductivity]] the band picture of metals is the background against which the exchange interaction and the pairing of electrons act. The two-level repulsion behind [[#thm-nfe-gap]] is the degenerate perturbation theory of [[quantum-2/stationary-perturbation]], and periodicity in $\mathbf k$ reappears for photons in photonic crystals and for atoms in optical lattices.

::: summary
- Bloch's theorem: in a periodic potential, eigenstates are $e^{i\mathbf k\cdot\mathbf r}u_{n\mathbf k}(\mathbf r)$ with $u$ periodic; $\mathbf k$ is defined modulo $\mathbf G$, so bands $E_n(\mathbf k)$ live in the first Brillouin zone.
- A perfect periodic potential does not scatter Bloch electrons; resistance comes from impurities and phonons.
- Nearly free electrons: a weak potential opens gaps $2\abs{U_\mathbf G}$ exactly on zone faces, where the electron wave is Bragg-reflected.
- Tight binding: an atomic level broadens into a band $\varepsilon_0 - 2t\cos ka$ of width $4t$, set by the overlap between neighbours.
- The effective mass $\hbar^2/(\dd^2E/\dd k^2)$ governs the response to external forces through $\hbar\dot{\mathbf k} = \mathbf F$; near a band top it is negative, and an almost full band behaves as positive holes.
- Each band holds $2N$ electrons: filled bands with a gap make an insulator, partly filled bands a metal, and an odd number of electrons per cell guarantees a metal in the independent-electron picture.
:::

## Exercises {#exercises}

::: exercise A three-dimensional band width {level=1 check="12"}
For the simple cubic tight-binding band [[#eq-tb3d]], find the band width in units of $t$.
::: solution
The minimum is at $\mathbf k = 0$, where each cosine is $1$: $E = \varepsilon_0 - 6t$. The maximum is at the zone corner $\frac{\pi}{a}(1,1,1)$, where each cosine is $-1$: $E = \varepsilon_0 + 6t$. The width is $12t$, three times the one-dimensional value, because each atom has six neighbours instead of two. In general the width of a nearest-neighbour band is $2zt$ for $z$ neighbours.
:::
:::

::: exercise The zone-boundary energy {level=1 check="4.18"}
Find the free-electron energy, in eV, at the zone boundary $k = \pi/a$ of a one-dimensional crystal with $a = 3.00\,\text{Å}$.
::: solution
$\varepsilon = (\hbar^2/2m)(\pi/a)^2 = 3.810\times(3.1416/3.00)^2\,\mathrm{eV} = 3.810\times1.0966\,\mathrm{eV} = 4.18\,\mathrm{eV}$, as in [[#ex-nfe-gap]]. With $\hbar^2/2m = 3.810\,\mathrm{eV\,\text{Å}^2}$, energies of electrons with wavelengths of a few ångströms are a few eV, the natural energy scale of solids.
:::
:::

::: exercise Bloch oscillations in a superlattice {level=1 check="0.414"}
A semiconductor superlattice has period $d = 10.0\,\mathrm{nm}$, and a field of $1.00\times10^6\,\mathrm{V/m}$ is applied along it. Find the Bloch oscillation period $h/(eEd)$ in picoseconds.
::: solution
$$
T_B = \frac{h}{eEd} = \frac{6.62607\times10^{-34}}{(1.60218\times10^{-19})(1.00\times10^6)(1.00\times10^{-8})}\,\mathrm s = 4.14\times10^{-13}\,\mathrm s = 0.414\,\mathrm{ps}.
$$

The superlattice period is thirty times a lattice constant, which shortens $T_B$ by the same factor relative to a bulk crystal at the same field. Combined with high-quality material, in which electrons travel picoseconds between collisions, this made the oscillations observable, first by Feldmann and co-workers in 1992 through the terahertz radiation they emit.
:::
:::

::: exercise A heavier tight-binding mass {level=2 check="0.476"}
Find $m^*/m$ at the bottom of a one-dimensional tight-binding band with $t = 0.50\,\mathrm{eV}$ and $a = 4.00\,\text{Å}$.
::: solution
From [[#ex-tb-mass]], $m^*/m = (\hbar^2/2m)/(ta^2) = 3.810/(0.50\times16.0) = 0.476$. Halving $t$ alone would double the mass; the larger spacing works the same way. Narrow bands, from poorly overlapping orbitals, give heavy carriers, and in the extreme of $f$-electron "heavy-fermion" compounds, effective masses of hundreds of $m$ are measured.
:::
:::

::: exercise Sodium's Fermi sphere {level=2 check="0.877"}
Show that for any monovalent bcc metal $k_F$ divided by the distance to the nearest Brillouin-zone face is a pure number, and evaluate it.
::: solution
As in [[#ex-na-sphere]], $k_F = (6\pi^2)^{1/3}/a$ and the nearest face is at $\sqrt2\pi/a$. Their ratio $(6\pi^2)^{1/3}/(\sqrt2\pi) = 3.8978/4.4429 = 0.877$ does not depend on $a$, because both lengths scale as $1/a$ and the number of electrons per cell is fixed. The free-electron sphere fills about $50\%$ of the zone volume, as it must for one electron per atom when each band holds two.
:::
:::

::: exercise Metal or insulator? {level=2}
Use [[#thm-band-count]] to decide what the independent-electron band picture predicts for: (a) potassium (bcc, one atom per primitive cell, one valence electron); (b) germanium (diamond structure, two atoms per primitive cell, four valence electrons each); (c) calcium (fcc, one atom per cell, two valence electrons). Compare with experiment.
::: solution
(a) One electron per cell half-fills a band, so potassium must be a metal, as it is. (b) Eight electrons per cell can fill four bands; band calculations show a gap, $0.66\,\mathrm{eV}$ at room temperature, above the fourth, so germanium is a semiconductor. (c) Two electrons per cell could fill one band, but in three dimensions the first and second bands of calcium overlap in energy, so both are partly filled and calcium is a metal. Counting allows an insulator for an even number of electrons; it never guarantees one.
:::
:::

::: exercise E(k) = E(−k) and flat bands at the boundary {level=3}
Assuming $E(k) = E(-k)$ for a one-dimensional band, as follows from time-reversal symmetry, show that $\dd E/\dd k = 0$ at $k = \pi/a$ wherever $E$ is differentiable there.
::: solution
By [[#cor-periodic-k]], $E(k) = E(k - 2\pi/a)$. Combined with $E(k) = E(-k)$, this gives $E(\pi/a + q) = E(-\pi/a - q) = E(-\pi/a - q + 2\pi/a) = E(\pi/a - q)$. So $E$ is an even function of $q$ about the zone boundary. Differentiating at $q = 0$, $E'(\pi/a) = -E'(\pi/a)$, hence $E'(\pi/a) = 0$. The group velocity [[#eq-band-velocity]] vanishes there: Bloch states at the zone boundary are standing waves, as the nearly-free picture showed. The same argument applies at $k = 0$.
:::
:::

::: exercise Completing the Kronig–Penney derivation {#exr-kp level=3}
Starting from the two equations in the proof of [[#prop-kp]], derive [[#eq-kp]].
::: hint
Write the equations as $A(1 - e^{i(q-k)a}) + B(1 - e^{-i(q+k)a}) = 0$ and a similar one, then expand the determinant and collect $\cos$ terms.
:::
::: solution
Let $\beta = 2m\alpha/\hbar^2$. Continuity gives $A(1 - e^{i(q-k)a}) + B(1 - e^{-i(q+k)a}) = 0$. The jump condition gives $A\bigl[iq(1 - e^{i(q-k)a}) - \beta\bigr] + B\bigl[-iq(1 - e^{-i(q+k)a}) - \beta\bigr] = 0$. Write $X = 1 - e^{i(q-k)a}$ and $Y = 1 - e^{-i(q+k)a}$. The determinant condition is $X(-iqY - \beta) - Y(iqX - \beta) = 0$, i.e. $-2iqXY = \beta(X - Y)$. Now

$$
XY = 1 - e^{i(q-k)a} - e^{-i(q+k)a} + e^{-2ika} = e^{-ika}\bigl(2\cos ka - 2\cos qa\bigr),
$$

and $X - Y = e^{-i(q+k)a} - e^{i(q-k)a} = -2ie^{-ika}\sin qa$. Substituting, $-2iq\cdot2e^{-ika}(\cos ka - \cos qa) = -2i\beta e^{-ika}\sin qa$, so $\cos ka - \cos qa = (\beta/2q)\sin qa = (m\alpha/\hbar^2q)\sin qa$. With $P = m\alpha a/\hbar^2$, the right-hand side is $P\sin(qa)/(qa)$, which is [[#eq-kp]].
:::
:::

::: exercise Two-band velocity near the gap {level=3}
Using [[#eq-nfe]] in one dimension near $k = \pi/a$, write $k = \pi/a + q$ with $\abs q\ll\pi/a$, and show that $E_\pm \approx \varepsilon_{\pi/a} \pm\abs{U_G} + \hbar^2q^2/2m^*_\pm$ with $m/m^*_\pm = 1 \pm 2\varepsilon_{\pi/a}/\abs{U_G}$.
::: solution
With $G = 2\pi/a$, $\varepsilon_k = (\hbar^2/2m)(\pi/a + q)^2$ and $\varepsilon_{k-G} = (\hbar^2/2m)(\pi/a - q)^2$. Their mean is $\varepsilon_{\pi/a} + \hbar^2q^2/2m$, and half their difference is $(\hbar^2/2m)(2\pi q/a) = 2\sqrt{\varepsilon_{\pi/a}\,\hbar^2q^2/2m}$; call $\delta = \hbar^2q^2/2m$, so the half-difference squared is $4\varepsilon_{\pi/a}\delta$. Then

$$
E_\pm = \varepsilon_{\pi/a} + \delta \pm\sqrt{\abs{U_G}^2 + 4\varepsilon_{\pi/a}\delta} \approx \varepsilon_{\pi/a} \pm\abs{U_G} + \delta\Bigl(1 \pm\frac{2\varepsilon_{\pi/a}}{\abs{U_G}}\Bigr),
$$

using $\sqrt{U^2 + x}\approx U + x/2U$. Since $\delta = \hbar^2q^2/2m$, the coefficient gives $m/m^*_\pm = 1 \pm 2\varepsilon_{\pi/a}/\abs{U_G}$. For a small gap the masses are small: the upper band has a light positive mass and the lower band a light negative one. This is why narrow-gap semiconductors such as indium antimonide have very light carriers.
:::
:::
