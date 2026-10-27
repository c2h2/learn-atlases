Orbitals are the chemist's working language — we fill them with electrons, draw their shapes, and talk about HOMOs and LUMOs — but the exact wavefunction of a many-electron molecule has no orbitals in it at all. It is a single function of every electron's coordinates at once. The **Hartree–Fock method** is the precise statement of what the orbital picture means, and the best that it can do. It asks: if the wavefunction must be a single antisymmetrised product of one-electron functions (a Slater determinant), which orbitals give the lowest energy? The answer is a set of coupled equations in which each electron moves in the average field of all the others, and because that field depends on the orbitals being sought, the equations must be solved *self-consistently*. Hartree–Fock typically recovers more than $99\ \%$ of the total energy of a molecule; the missing fraction of a per cent, the **correlation energy**, is about the size of chemical bond energies, which is why Hartree–Fock is both indispensable and insufficient. This lesson derives the Hartree–Fock equations, turns them into the matrix equations that programs solve, and works through two complete calculations — $\mathrm{H_2}$ and $\mathrm{HeH^{+}}$ in a minimal basis — whose every number you can reproduce.

Throughout we use **atomic units**: $\hbar = m_e = e = 4\pi\varepsilon_0 = 1$, so energies are in hartree ($1\ \mathrm{E_h} = 27.2114\ \mathrm{eV} = 2625.50\ \mathrm{kJ\,mol^{-1}}$) and lengths in bohr ($1\ a_0 = 0.529177\ \mathrm{\AA}$). The electronic Hamiltonian for $N$ electrons at fixed nuclei ([[quantum-chemistry/chemical-bond-qm]]) is
$$
\hat H = \sum_{i=1}^{N} \hat h(i) + \sum_{i<j} \frac{1}{r_{ij}}, \qquad \hat h(i) = -\tfrac{1}{2}\nabla_i^{2} - \sum_A \frac{Z_A}{r_{iA}} .
$$ {#eq-hamiltonian}
The one-electron operator $\hat h$ is the kinetic energy plus attraction to all nuclei; the electron repulsion $1/r_{ij}$ is the term that prevents the problem from separating.

## Slater determinants

Electrons are fermions, so the wavefunction must change sign when the coordinates (space and spin) of any two electrons are exchanged. A simple product of orbitals does not do this; an antisymmetrised product does, and the determinant is the compact way to write it ([[quantum-chemistry/many-electron-atoms]] introduces it for atoms).

::: definition Spin orbitals and Slater determinants {#def-slater}
A **spin orbital** $\chi(\mathbf{x}) = \psi(\mathbf{r})\,\sigma(\omega)$ is a spatial orbital $\psi$ times a spin function $\sigma = \alpha$ or $\beta$, with $\mathbf{x} = (\mathbf{r}, \omega)$. Given $N$ orthonormal spin orbitals, the **Slater determinant**
$$
\Phi(\mathbf{x}_1, \dots, \mathbf{x}_N) = \frac{1}{\sqrt{N!}}
\begin{vmatrix}
\chi_1(\mathbf{x}_1) & \chi_2(\mathbf{x}_1) & \cdots & \chi_N(\mathbf{x}_1) \\
\chi_1(\mathbf{x}_2) & \chi_2(\mathbf{x}_2) & \cdots & \chi_N(\mathbf{x}_2) \\
\vdots & \vdots & & \vdots \\
\chi_1(\mathbf{x}_N) & \chi_2(\mathbf{x}_N) & \cdots & \chi_N(\mathbf{x}_N)
\end{vmatrix}
$$
is normalised and antisymmetric: exchanging two electrons exchanges two rows and changes the sign. If two spin orbitals are equal, two columns are equal and $\Phi = 0$ — the Pauli principle. We abbreviate it $\lvert\chi_1\chi_2\cdots\chi_N\rangle$.
:::

Antisymmetry has a consequence beyond Pauli exclusion. For two electrons of the *same* spin in a determinant, the probability density of finding both at the same point is zero, and it is reduced nearby: each electron is surrounded by a **Fermi hole** from which other same-spin electrons are excluded. Electrons of *opposite* spin, by contrast, are uncorrelated in a single determinant — the probability of finding one is independent of where the other is. This asymmetry is the root of everything Hartree–Fock gets wrong.

::: widget contour
f: (sin(pi*x)*sin(2*pi*y) - s*sin(2*pi*x)*sin(pi*y))^2
x: 0, 1
y: 0, 1
levels: 16
gradient: false
point: 0.3, 0.7
sliders: s=1:-1:1:0.05
caption: The pair density of two electrons in a one-dimensional box (positions $x_1 = x$, $x_2 = y$, box length $1$) occupying the two lowest orbitals $\sin\pi x$ and $\sin 2\pi x$. With $s = 1$ this is the same-spin determinant, $\lvert\phi_1(x_1)\phi_2(x_2) - \phi_2(x_1)\phi_1(x_2)\rvert^{2}$: it vanishes along the whole diagonal $x_1 = x_2$ — the Fermi hole. With $s = 0$ it is a simple Hartree product, with no hole: the electrons ignore each other. ($s = -1$ is the symmetric combination appropriate for bosons, which *pile up* on the diagonal.)
:::

The energy of a single determinant can be written in terms of one- and two-electron integrals over the orbitals. We use **chemists' notation** for two-electron integrals over spatial orbitals,
$$
(ij|kl) = \iint \psi_i^{*}(\mathbf{r}_1)\psi_j(\mathbf{r}_1)\,\frac{1}{r_{12}}\,\psi_k^{*}(\mathbf{r}_2)\psi_l(\mathbf{r}_2)\,\mathrm{d}\mathbf{r}_1\,\mathrm{d}\mathbf{r}_2 ,
$$
in which the first pair of indices belongs to electron 1 and the second to electron 2.

::: proposition Energy of a Slater determinant {#prop-det-energy}
For a determinant of orthonormal spin orbitals $\chi_1, \dots, \chi_N$,
$$
E = \langle\Phi|\hat H|\Phi\rangle = \sum_{i} h_{ii} + \frac{1}{2}\sum_{i}\sum_{j}\left(J_{ij} - K_{ij}\right),
$$
where $h_{ii} = \langle\chi_i|\hat h|\chi_i\rangle$, the **Coulomb integral** $J_{ij} = (ii|jj)$ is the classical repulsion between the charge clouds $\lvert\chi_i\rvert^{2}$ and $\lvert\chi_j\rvert^{2}$, and the **exchange integral** $K_{ij} = (ij|ji)$ is non-zero only when $\chi_i$ and $\chi_j$ have the same spin. For a closed-shell molecule with $N/2$ doubly occupied spatial orbitals $\psi_a$,
$$
E = 2\sum_{a}^{N/2} h_{aa} + \sum_{a}^{N/2}\sum_{b}^{N/2}\left(2J_{ab} - K_{ab}\right).
$$ {#eq-closed-shell-energy}
:::

::: proof
Write $\Phi = \sqrt{N!}\,\hat{\mathcal A}\,\Pi$, where $\Pi = \chi_1(\mathbf{x}_1)\cdots\chi_N(\mathbf{x}_N)$ is the simple product and $\hat{\mathcal A} = (N!)^{-1}\sum_P (-1)^{p}\hat P$ is the antisymmetriser, a sum over all permutations with parity $p$. The Hamiltonian is symmetric under permutations, so it commutes with $\hat{\mathcal A}$, and $\hat{\mathcal A}^{2} = \hat{\mathcal A}$. Hence $\langle\Phi|\hat H|\Phi\rangle = N!\,\langle\Pi|\hat H\hat{\mathcal A}|\Pi\rangle = \sum_P (-1)^{p}\langle\Pi|\hat H|\hat P\Pi\rangle$. For a one-electron term $\hat h(1)$ only the identity permutation survives, because any permutation moves some electron $k \neq 1$ into a different orthogonal orbital and the overlap of that electron's coordinates vanishes; summing over electrons gives $\sum_i h_{ii}$. For a two-electron term $1/r_{12}$ the identity and the single transposition of electrons $1$ and $2$ survive, giving $(ii|jj)$ and $-(ij|ji)$ respectively for the pair of orbitals $\chi_i, \chi_j$ occupied by those electrons. Summing over pairs $i < j$ gives $\sum_{i<j}(J_{ij} - K_{ij}) = \tfrac{1}{2}\sum_{ij}(J_{ij} - K_{ij})$, where the $i = j$ terms may be added because $J_{ii} = K_{ii}$. For a closed shell each spatial orbital carries an $\alpha$ and a $\beta$ electron: every pair of spatial orbitals contributes four Coulomb terms but only two exchange terms (same spin), which gives the factor $2J_{ab} - K_{ab}$.
:::

Two features of this formula carry physics. The term $J_{ii} - K_{ii} = 0$ means that **an electron does not repel itself** — the self-interaction in the Coulomb sum is cancelled exactly by exchange, a property that approximate density functionals lose ([[computational-chemistry/density-functional-theory]]). And the exchange terms, always positive integrals entering with a minus sign, *lower* the energy of same-spin pairs: they are the energetic face of the Fermi hole, and the origin of Hund's first rule.

::: example The helium atom as one determinant {#ex-he-det}
The helium ground state $\lvert 1s\alpha\ 1s\beta\rvert$, with hydrogen-like $1s$ orbitals of charge $\zeta$, has $h_{11} = \zeta^{2}/2 - 2\zeta$ and $J_{11} = 5\zeta/8$ (in $\mathrm{E_h}$). Use [[#eq-closed-shell-energy]] to write $E(\zeta)$, and compare with the variational result of [[quantum-chemistry/approximation-methods]].
::: solution
With one doubly occupied orbital, $E = 2h_{11} + 2J_{11} - K_{11} = 2h_{11} + J_{11}$ (since $K_{11} = J_{11}$), so
$$
E(\zeta) = \zeta^{2} - 4\zeta + \tfrac{5}{8}\zeta ,
$$
identical to the scaled-charge variational energy. Its minimum at $\zeta = 27/16$ is $-2.8477\ \mathrm{E_h}$. The *Hartree–Fock limit* for helium, obtained by letting the radial shape of the $1s$ orbital vary freely, is $-2.86168\ \mathrm{E_h}$; the exact non-relativistic energy is $-2.90372\ \mathrm{E_h}$. The remaining $0.0420\ \mathrm{E_h} = 1.14\ \mathrm{eV}$ is helium's correlation energy, and no choice of orbital shape can recover it.
:::
:::

## The Hartree–Fock equations

We now ask for the *best* determinant: the orthonormal orbitals that minimise $E$ in [[#prop-det-energy]]. By the variation principle ([[quantum-chemistry/approximation-methods]]) the result is an upper bound to the true ground-state energy.

::: proposition The Hartree–Fock equations {#prop-hf-equations}
The orbitals that make the energy of a single determinant stationary, subject to orthonormality, can be chosen to satisfy the one-electron eigenvalue equations
$$
\hat f\,\chi_i = \varepsilon_i\,\chi_i , \qquad \hat f = \hat h + \sum_{j}^{N}\left(\hat J_j - \hat K_j\right),
$$
where the **Fock operator** $\hat f$ contains the Coulomb operator $\hat J_j\chi(\mathbf{x}_1) = \left[\int \lvert\chi_j(\mathbf{x}_2)\rvert^{2} r_{12}^{-1}\,\mathrm{d}\mathbf{x}_2\right]\chi(\mathbf{x}_1)$ — the electrostatic potential of electron $j$'s charge cloud — and the non-local exchange operator $\hat K_j\chi(\mathbf{x}_1) = \left[\int \chi_j^{*}(\mathbf{x}_2)\chi(\mathbf{x}_2) r_{12}^{-1}\,\mathrm{d}\mathbf{x}_2\right]\chi_j(\mathbf{x}_1)$. The **orbital energies** are $\varepsilon_i = h_{ii} + \sum_j(J_{ij} - K_{ij})$, and the total energy is
$$
E_\mathrm{HF} = \sum_i \varepsilon_i - \frac{1}{2}\sum_{ij}\left(J_{ij} - K_{ij}\right) \;\neq\; \sum_i \varepsilon_i .
$$
:::

::: proof
Minimise $\mathcal L = E - \sum_{ij}\lambda_{ji}\left(\langle\chi_i|\chi_j\rangle - \delta_{ij}\right)$ with Lagrange multipliers $\lambda_{ji}$ for the orthonormality constraints. Vary one orbital, $\chi_k \to \chi_k + \delta\chi_k$. In $E$ the one-electron term changes by $\langle\delta\chi_k|\hat h|\chi_k\rangle + \text{c.c.}$, and the two-electron terms involving $k$ change by $\sum_j\left(\langle\delta\chi_k|\hat J_j - \hat K_j|\chi_k\rangle + \text{c.c.}\right)$ — the factor $\tfrac{1}{2}$ disappears because $k$ appears in both indices of the double sum. Setting $\delta\mathcal L = 0$ for arbitrary $\delta\chi_k$ gives $\hat f\chi_k = \sum_j\lambda_{jk}\chi_j$. The matrix $\lambda$ is Hermitian, and a unitary transformation of the occupied orbitals among themselves leaves the determinant (and so $E$ and $\hat f$) unchanged apart from a phase; choosing the transformation that diagonalises $\lambda$ gives the **canonical** form $\hat f\chi_i = \varepsilon_i\chi_i$. Projecting onto $\chi_i$ gives $\varepsilon_i$. Adding the $\varepsilon_i$ counts every electron–electron repulsion twice (once in each partner's orbital energy), so half of the two-electron sum must be subtracted to recover $E$.
:::

The Fock operator depends on the occupied orbitals, which are its own eigenfunctions. The equations are therefore nonlinear and are solved by iteration: guess orbitals, build $\hat f$, solve for new orbitals, rebuild $\hat f$, and repeat until the orbitals that generate the field are the ones the field produces. This is the **self-consistent field** (SCF).

The orbital energies have a direct physical interpretation.

::: theorem Koopmans' theorem {#thm-koopmans}
Let $\Phi$ be the Hartree–Fock determinant of an $N$-electron system, and let $\Phi_i^{N-1}$ be the $(N - 1)$-electron determinant obtained by deleting spin orbital $\chi_i$ *without changing the others*. Then
$$
E(\Phi_i^{N-1}) - E(\Phi) = -\varepsilon_i .
$$
Thus $-\varepsilon_i$ approximates the ionisation energy from orbital $i$, and for a virtual orbital $a$, $-\varepsilon_a$ approximates the electron affinity for adding an electron to it.
:::

::: proof
By [[#prop-det-energy]], the energy of $\Phi$ minus that of $\Phi_i^{N-1}$ consists of every term containing index $i$: $h_{ii}$, and the two-electron terms $\tfrac{1}{2}\sum_j (J_{ij} - K_{ij}) + \tfrac{1}{2}\sum_j (J_{ji} - K_{ji}) = \sum_j(J_{ij} - K_{ij})$. Their sum is exactly $\varepsilon_i$ by [[#prop-hf-equations]], so $E(\Phi) - E(\Phi_i^{N-1}) = \varepsilon_i$. The same argument with an added virtual spin orbital gives the affinity statement.
:::

Koopmans' ionisation energies neglect two effects that act in opposite directions. **Orbital relaxation** — the remaining electrons contract towards the hole — lowers the energy of the ion, so Koopmans values are too large; the **loss of correlation** energy on removing an electron raises the ion's energy relative to the neutral, which makes Koopmans values too small. For valence ionisations of closed-shell molecules the two errors partly cancel and Koopmans' theorem is often good to about $1\ \mathrm{eV}$; for core ionisations relaxation dominates and errors are $10$–$20\ \mathrm{eV}$; and Koopmans electron affinities are poor because the two errors then add.

## The Roothaan–Hall equations

The Hartree–Fock equations are integro-differential equations. For atoms they can be solved numerically on a radial grid, but for molecules the practical route, due to Roothaan and to Hall in 1951, is to expand each spatial orbital in a fixed set of $K$ basis functions $\phi_\mu$ (usually atom-centred, as described in [[computational-chemistry/basis-sets]]):
$$
\psi_i = \sum_{\mu=1}^{K} C_{\mu i}\,\phi_\mu .
$$
This turns the operator equation into a matrix equation, exactly as the linear variation method turns the Schrödinger equation into a secular problem.

::: proposition The Roothaan–Hall equations {#prop-roothaan}
For a closed-shell molecule with orbitals expanded in a basis $\{\phi_\mu\}$, the Hartree–Fock equations become the generalised matrix eigenvalue problem
$$
\mathbf{F}\mathbf{C} = \mathbf{S}\mathbf{C}\boldsymbol{\varepsilon},
$$
where $S_{\mu\nu} = \langle\phi_\mu|\phi_\nu\rangle$ is the overlap matrix, $\boldsymbol\varepsilon$ is the diagonal matrix of orbital energies, and the **Fock matrix** is
$$
F_{\mu\nu} = H^\mathrm{core}_{\mu\nu} + \sum_{\lambda\sigma} P_{\lambda\sigma}\left[(\mu\nu|\sigma\lambda) - \tfrac{1}{2}(\mu\lambda|\sigma\nu)\right], \qquad P_{\lambda\sigma} = 2\sum_{a}^{N/2} C_{\lambda a} C^{*}_{\sigma a},
$$
with $H^\mathrm{core}_{\mu\nu} = \langle\phi_\mu|\hat h|\phi_\nu\rangle$ and $\mathbf{P}$ the **density matrix**. The electronic energy is $E_\mathrm{el} = \tfrac{1}{2}\sum_{\mu\nu}P_{\nu\mu}\left(H^\mathrm{core}_{\mu\nu} + F_{\mu\nu}\right)$, and the total energy adds the nuclear repulsion $V_\mathrm{NN}$.
:::

::: proof
For closed shells, summing the Fock operator over the two spins of each spatial orbital gives $\hat f = \hat h + \sum_a^{N/2}(2\hat J_a - \hat K_a)$ acting on spatial orbitals. Insert the expansion of $\psi_i$ into $\hat f\psi_i = \varepsilon_i\psi_i$ and project onto $\phi_\mu$: $\sum_\nu\langle\phi_\mu|\hat f|\phi_\nu\rangle C_{\nu i} = \varepsilon_i\sum_\nu S_{\mu\nu}C_{\nu i}$, which is $\mathbf{F}\mathbf{C} = \mathbf{S}\mathbf{C}\boldsymbol\varepsilon$ with $F_{\mu\nu} = \langle\phi_\mu|\hat f|\phi_\nu\rangle$. Expanding the occupied orbitals inside $\hat J_a$ and $\hat K_a$ gives
$\langle\phi_\mu|2\hat J_a - \hat K_a|\phi_\nu\rangle = \sum_{\lambda\sigma} C_{\lambda a}C_{\sigma a}^{*}\left[2(\mu\nu|\sigma\lambda) - (\mu\lambda|\sigma\nu)\right]$, and summing over $a$ with the definition of $\mathbf{P}$ gives the stated $F_{\mu\nu}$. The energy formula is [[#eq-closed-shell-energy]] rewritten in the basis: $2\sum_a h_{aa} = \sum_{\mu\nu}P_{\nu\mu}H^\mathrm{core}_{\mu\nu}$, and $\sum_{ab}(2J_{ab} - K_{ab}) = \tfrac{1}{2}\sum_{\mu\nu}P_{\nu\mu}(F_{\mu\nu} - H^\mathrm{core}_{\mu\nu})$.
:::

The basis makes the method *computable*, but also *approximate* in a new way: with a finite basis the orbitals can only be as flexible as the basis allows, and the energy approaches the **Hartree–Fock limit** only as the basis approaches completeness. The quantity that dominates the cost is the set of two-electron integrals $(\mu\nu|\lambda\sigma)$, of which there are about $K^{4}/8$ distinct ones. Conventional Hartree–Fock therefore scales formally as $K^{4}$; integral screening (most integrals between distant functions are negligible) brings the effective scaling for large molecules down towards $K^{2}$, and density fitting and linear-scaling methods further still.

::: algorithm The self-consistent field procedure {#alg-scf}
1. Specify the molecule (nuclear coordinates, charges, number of electrons) and the basis set. Compute $\mathbf{S}$, $\mathbf{H}^\mathrm{core}$, the two-electron integrals $(\mu\nu|\lambda\sigma)$ and $V_\mathrm{NN}$.
2. Form an orthogonalising matrix, e.g. $\mathbf{X} = \mathbf{S}^{-1/2}$, so that $\mathbf{X}^{\dagger}\mathbf{S}\mathbf{X} = \mathbf{I}$.
3. Guess the density matrix $\mathbf{P}$ (the simplest guess is $\mathbf{P} = \mathbf{0}$, which makes the first Fock matrix equal to $\mathbf{H}^\mathrm{core}$; better guesses superpose atomic densities).
4. Build $\mathbf{F}$ from $\mathbf{P}$ and the integrals.
5. Transform, $\mathbf{F}' = \mathbf{X}^{\dagger}\mathbf{F}\mathbf{X}$, diagonalise $\mathbf{F}'\mathbf{C}' = \mathbf{C}'\boldsymbol\varepsilon$, and back-transform $\mathbf{C} = \mathbf{X}\mathbf{C}'$.
6. Occupy the $N/2$ lowest orbitals (the *aufbau* choice) and form a new $\mathbf{P}$.
7. If the energy and density matrix have changed by less than thresholds (say $10^{-8}\ \mathrm{E_h}$ and $10^{-6}$), stop; otherwise return to step 4. Convergence is accelerated by extrapolating the Fock matrix from previous iterations (Pulay's DIIS method).
:::

## A complete calculation: $\mathrm{H_2}$ in a minimal basis

The smallest non-trivial case is $\mathrm{H_2}$ at $R = 1.4\ a_0$ (close to its equilibrium bond length) with one $1s$-type function on each atom. We use the STO-3G basis of [[computational-chemistry/basis-sets]], in which each function is a fixed combination of three Gaussians fitted to a Slater $1s$ orbital with exponent $\zeta = 1.24$. Symmetry does much of the work: the two orbitals must be the bonding and antibonding combinations, so no iteration is needed — but every Hartree–Fock ingredient appears.

::: example Hartree–Fock for $\mathrm{H_2}$ {#ex-h2-hf}
For STO-3G $\mathrm{H_2}$ at $R = 1.4\ a_0$, the integrals over the basis functions $\phi_1$ (on atom A) and $\phi_2$ (on B) are, in atomic units: $S_{12} = 0.6593$; $H^\mathrm{core}_{11} = -1.1204$, $H^\mathrm{core}_{12} = -0.9584$; $(11|11) = 0.7746$, $(11|22) = 0.5697$, $(21|11) = 0.4441$, $(21|21) = 0.2970$. Find the occupied orbital, its orbital energy, and the total energy.
::: solution
By symmetry the occupied orbital is $\sigma_g = (\phi_1 + \phi_2)/\sqrt{2(1 + S_{12})}$ and the virtual $\sigma_u = (\phi_1 - \phi_2)/\sqrt{2(1 - S_{12})}$; with $2(1 + S_{12}) = 3.3186$ the coefficients are $C_{1g} = C_{2g} = 0.5489$. The one-electron energy of $\sigma_g$ is
$$
h_{gg} = \frac{H_{11} + H_{12}}{1 + S_{12}} = \frac{-1.1204 - 0.9584}{1.6593} = -1.2528\ \mathrm{E_h}.
$$
The Coulomb self-repulsion of $\sigma_g$ follows by expanding $(\sigma_g\sigma_g|\sigma_g\sigma_g)$ into the sixteen basis-function integrals, which by symmetry reduce to
$$
J_{gg} = \frac{(11|11) + (11|22) + 2(21|21) + 4(21|11)}{2(1 + S_{12})^{2}} = \frac{0.7746 + 0.5697 + 0.5941 + 1.7764}{5.5067} = 0.6746\ \mathrm{E_h}.
$$
The orbital energy is $\varepsilon_g = h_{gg} + 2J_{gg} - K_{gg} = h_{gg} + J_{gg} = -0.5782\ \mathrm{E_h}$, and the electronic energy is $E_\mathrm{el} = 2h_{gg} + J_{gg} = -1.8310\ \mathrm{E_h}$. Adding $V_\mathrm{NN} = 1/1.4 = 0.7143\ \mathrm{E_h}$,
$$
E_\mathrm{HF} = -1.1167\ \mathrm{E_h}.
$$
For comparison the Hartree–Fock limit at this geometry is $-1.1336\ \mathrm{E_h}$ and the exact energy $-1.1745\ \mathrm{E_h}$: the minimal basis costs $0.017\ \mathrm{E_h}$, correlation another $0.041\ \mathrm{E_h}$. The virtual orbital energy, from the same algebra with $\sigma_u$, is $\varepsilon_u = +0.6703\ \mathrm{E_h}$.
:::
:::

::: example Koopmans' ionisation energy of $\mathrm{H_2}$ {#ex-koopmans-h2}
Use the result of [[#ex-h2-hf]] to estimate the ionisation energy of $\mathrm{H_2}$, and compare with the measured adiabatic value of $15.43\ \mathrm{eV}$.
::: solution
By [[#thm-koopmans]], $I \approx -\varepsilon_g = 0.5782\ \mathrm{E_h} \times 27.2114\ \mathrm{eV\,E_h^{-1}} = 15.73\ \mathrm{eV}$. This is a *vertical* ionisation energy (fixed nuclei at $R = 1.4\ a_0$), which lies somewhat above the adiabatic value because $\mathrm{H_2^{+}}$ has a longer bond; the photoelectron band of $\mathrm{H_2}$ peaks near $16.0\ \mathrm{eV}$. The agreement is good partly by luck: relaxation is absent for a one-electron ion, but basis-set error and the neglect of correlation in $\mathrm{H_2}$ both enter. Note also that $-\varepsilon_u = -0.67\ \mathrm{E_h}$ predicts a *negative* electron affinity of $-18\ \mathrm{eV}$: $\mathrm{H_2^{-}}$ is unbound, but a number of that size shows how unreliable virtual orbital energies are.
:::
:::

## When symmetry does not fix the orbitals: $\mathrm{HeH^{+}}$

In a heteronuclear molecule the mixing of the two basis functions is not determined by symmetry, and the SCF iterations are genuine. $\mathrm{HeH^{+}}$, isoelectronic with $\mathrm{H_2}$, is the classic case (it is worked in full by Szabo and Ostlund).

::: example SCF iterations for $\mathrm{HeH^{+}}$ {#ex-heh-scf}
Take $\mathrm{HeH^{+}}$ at $R = 1.4632\ a_0$ with an STO-3G function on each atom ($\zeta_\mathrm{He} = 2.0925$, $\zeta_\mathrm{H} = 1.24$). The integrals are $S_{12} = 0.4508$; $H^\mathrm{core}_{11} = -2.6527$, $H^\mathrm{core}_{22} = -1.7318$, $H^\mathrm{core}_{12} = -1.3472$; $(11|11) = 1.3072$, $(22|22) = 0.7746$, $(11|22) = 0.6057$, $(21|11) = 0.4373$, $(21|22) = 0.3118$, $(21|21) = 0.1773$ (function 1 on He). Follow the SCF of [[#alg-scf]] from $\mathbf{P} = \mathbf{0}$.
::: solution
With $\mathbf{P} = \mathbf{0}$ the first Fock matrix is $\mathbf{H}^\mathrm{core}$; diagonalising it in the orthogonalised basis gives a "core" orbital with energy $-2.674\ \mathrm{E_h}$, mostly on helium. Building $\mathbf{P}$ from it and iterating gives

| iteration | $E_\mathrm{el}/\mathrm{E_h}$ | $\varepsilon_1/\mathrm{E_h}$ |
|---|---|---|
| 1 | $-4.141860$ | $-1.50463$ |
| 2 | $-4.226488$ | $-1.58810$ |
| 3 | $-4.227519$ | $-1.59673$ |
| 4 | $-4.227526$ | $-1.59740$ |
| converged | $-4.227526$ | $-1.59745$ |

The energy converges much faster than the orbital energy: by iteration 4 it is correct to $10^{-6}\ \mathrm{E_h}$, as the variational principle leads us to expect (errors in $E$ are second order in errors in the orbitals). The converged occupied orbital is $\psi_1 = 0.8019\,\phi_\mathrm{He} + 0.3368\,\phi_\mathrm{H}$, and the total energy is $E_\mathrm{el} + V_\mathrm{NN} = -4.227526 + 2/1.4632 = -2.860662\ \mathrm{E_h}$. A Mulliken analysis ([[#exr-mulliken]]) assigns $1.53$ electrons to helium and $0.47$ to hydrogen: the positive charge is shared almost equally, slightly more of it on hydrogen, as the higher ionisation energy of He ($24.6$ against $13.6\ \mathrm{eV}$) suggests.
:::
:::

::: widget plot
f: 2*(cos(x)^2*(-2.65274) + sin(x)^2*(-1.73183) + 2*cos(x)*sin(x)*(-1.34721))/(1 + 0.45077*sin(2*x)) + (cos(x)^4*1.30715 + sin(x)^4*0.77461 + 2*cos(x)^2*sin(x)^2*0.60570 + 4*cos(x)^2*sin(x)^2*0.17727 + 4*cos(x)^3*sin(x)*0.43728 + 4*cos(x)*sin(x)^3*0.31179)/(1 + 0.45077*sin(2*x))^2 + 1.36687
x: -0.6, 1.8
y: -3, -1
points: 0.3976, -2.8607
labels: E(\theta)/\mathrm{E_h}
tangent: 0.9
caption: The energy of the $\mathrm{HeH^{+}}$ determinant when the occupied orbital is $\psi \propto \cos\theta\,\phi_\mathrm{He} + \sin\theta\,\phi_\mathrm{H}$, using the integrals of [[#ex-heh-scf]]. At $\theta = 0$ both electrons sit on helium ($-2.631\ \mathrm{E_h}$), at $\theta = \pi/2$ both on the proton ($-1.322\ \mathrm{E_h}$). The minimum, marked, is at $\theta = 0.398$ with $E = -2.8607\ \mathrm{E_h}$ — exactly the converged SCF result. The SCF procedure is one way of finding this minimum; drag the tangent to see that the Hartree–Fock solution is where the slope (the off-diagonal Fock matrix element between occupied and virtual orbitals) vanishes.
:::

The figure's lesson generalises. A Hartree–Fock solution is a stationary point of the energy with respect to *rotations* that mix occupied and virtual orbitals, and the condition for stationarity is the vanishing of the occupied–virtual block of the Fock matrix. Seen from the side of the wavefunction, it has a famous consequence.

::: theorem Brillouin's theorem {#thm-brillouin}
Let $\Phi_0$ be the converged Hartree–Fock determinant and $\Phi_i^{a}$ the singly excited determinant in which occupied spin orbital $\chi_i$ is replaced by virtual $\chi_a$. Then
$$
\langle\Phi_i^{a}|\hat H|\Phi_0\rangle = \langle\chi_a|\hat f|\chi_i\rangle = 0 .
$$
Singly excited determinants do not mix directly with the Hartree–Fock reference.
:::

::: proof
By the Slater–Condon rules (the same permutation argument as in [[#prop-det-energy]], applied to two determinants differing in one spin orbital), $\langle\Phi_i^{a}|\hat H|\Phi_0\rangle = h_{ai} + \sum_j\left[(ai|jj) - (aj|ji)\right] = \langle\chi_a|\hat f|\chi_i\rangle$. Since $\chi_i$ is an eigenfunction of $\hat f$, $\hat f\chi_i = \varepsilon_i\chi_i$, and $\langle\chi_a|\chi_i\rangle = 0$, the matrix element vanishes. Equivalently, the first-order change in the energy when the determinant is rotated to $\Phi_0 + \eta\,\Phi_i^{a}$ is $2\eta\langle\Phi_i^{a}|\hat H|\Phi_0\rangle$, which must vanish at a stationary point.
:::

Brillouin's theorem is why the leading corrections to Hartree–Fock in configuration interaction and perturbation theory come from *double* excitations ([[computational-chemistry/electron-correlation]]).

## Restricted, unrestricted, and the dissociation problem

For closed-shell molecules near equilibrium, the **restricted** Hartree–Fock (RHF) ansatz — the same spatial orbital for the $\alpha$ and $\beta$ electron of each pair — is natural. For open-shell systems there are two choices. **Unrestricted** Hartree–Fock (UHF) gives $\alpha$ and $\beta$ electrons different spatial orbitals; this lowers the energy and allows spin polarisation, but the determinant is no longer an eigenfunction of $\hat S^{2}$ and is "contaminated" by higher spin states. **Restricted open-shell** HF (ROHF) keeps doubly occupied orbitals common and has a pure spin state, at a slightly higher energy.

The restriction matters most when bonds break. In the RHF determinant of $\mathrm{H_2}$, $\sigma_g^{2}$ expands into atomic functions as
$$
\lvert\sigma_g\alpha\,\sigma_g\beta\rvert \propto \underbrace{\left[\phi_\mathrm{A}(1)\phi_\mathrm{B}(2) + \phi_\mathrm{B}(1)\phi_\mathrm{A}(2)\right]}_{\text{covalent, H + H}} + \underbrace{\left[\phi_\mathrm{A}(1)\phi_\mathrm{A}(2) + \phi_\mathrm{B}(1)\phi_\mathrm{B}(2)\right]}_{\text{ionic, H}^{+}\text{H}^{-}} ,
$$
times the singlet spin function — always $50\ \%$ ionic, whatever the bond length. At large $R$ this is wrong: the molecule should dissociate to two neutral atoms, and the ionic terms raise the energy far above $2E(\mathrm{H})$.

| $R/a_0$ | RHF $/\mathrm{E_h}$ | UHF $/\mathrm{E_h}$ | exact in basis (full CI) $/\mathrm{E_h}$ |
|---|---|---|---|
| $1.4$ | $-1.1167$ | $-1.1167$ | $-1.1373$ |
| $2.0$ | $-1.0492$ | $-1.0492$ | $-1.0885$ |
| $3.0$ | $-0.8853$ | $-0.9510$ | $-0.9852$ |
| $4.0$ | $-0.7611$ | $-0.9358$ | $-0.9438$ |
| $6.0$ | $-0.6451$ | $-0.9332$ | $-0.9334$ |
| $\infty$ | $-0.5459$ | $-0.9332$ | $-0.9332$ |

(STO-3G, computed with the integrals of [[#ex-h2-hf]] at each $R$; $2E(\mathrm{H}) = -0.9332\ \mathrm{E_h}$ in this basis.) Near equilibrium UHF collapses to RHF. Beyond a critical distance (the Coulson–Fischer point, between $2.0$ and $2.5\ a_0$ here) a lower UHF solution appears with the $\alpha$ electron localised on one atom and the $\beta$ electron on the other; it dissociates correctly, but at large $R$ it is an equal mixture of singlet and triplet ($\langle\hat S^{2}\rangle \to 1$). Neither single determinant is right in the intermediate region; the correct description needs more than one determinant, which is *static correlation* ([[computational-chemistry/electron-correlation]]).

::: warning A lower energy is not always a better wavefunction {#warn-uhf}
It is tempting to believe that the UHF solution, being lower in energy, is always preferable. For stretched bonds and diradicals it gives better energies but a spin-contaminated wavefunction — check $\langle\hat S^{2}\rangle$ against $S(S + 1)$ (zero for a singlet, $0.75$ for a doublet). Properties sensitive to spin (hyperfine couplings, singlet–triplet gaps) can be badly wrong. Conversely, an RHF solution may be *unstable*: a lower solution of lower symmetry or broken spin may exist, and SCF convergence to a stationary point does not guarantee a minimum in orbital space. Programs provide a "stability analysis" — the orbital-rotation analogue of checking the Hessian at a stationary point ([[computational-chemistry/potential-energy-surfaces#prop-stationary]]).
:::

::: quiz
Which statement about Hartree–Fock theory is correct?
- [ ] The Hartree–Fock energy equals the sum of the occupied orbital energies.
- [ ] Hartree–Fock neglects electron repulsion, treating electrons as independent.
- [x] Hartree–Fock includes the exchange correlation between same-spin electrons exactly (within a single determinant), but treats opposite-spin electrons as moving independently in each other's average field.
- [ ] In the complete-basis-set limit, Hartree–Fock gives the exact energy.
::: solution
The sum of orbital energies double-counts repulsion ([[#prop-hf-equations]]). Repulsion is included, but only as an average (the Coulomb operator) plus exchange. The determinant builds in the Fermi hole for same-spin pairs; opposite-spin electrons have no correlation hole. Even with a complete basis Hartree–Fock reaches only the Hartree–Fock limit, above the exact energy by the correlation energy.
:::
:::

## What Hartree–Fock gets right and wrong

With a good basis set, Hartree–Fock typically gives

- **equilibrium geometries** of organic molecules within about $0.01$–$0.02\ \mathrm{\AA}$ (bonds generally slightly too short, because the missing correlation would mix in antibonding character);
- **vibrational frequencies** about $10\ \%$ too high, for the same reason;
- **dipole moments** often $10$–$20\ \%$ too large;
- **reaction energies** of isogyric reactions (those conserving the number of electron pairs) reasonably well, but **bond dissociation energies** very poorly: the HF limit binds $\mathrm{N_2}$ by only about half its experimental $D_e$, and $\mathrm{F_2}$ is not bound at all;
- **barrier heights** too high, often by $40$–$80\ \mathrm{kJ\,mol^{-1}}$;
- **no dispersion**: the London attraction between closed-shell molecules is a pure correlation effect, so Hartree–Fock binds rare-gas dimers and $\pi$-stacked aromatics not at all.

The common thread is that correlation energy changes when the number or the pairing of electrons changes, and Hartree–Fock contains none of it. The total correlation energy is small as a fraction ($0.04\ \mathrm{E_h}$ out of $1.17$ for $\mathrm{H_2}$; about $0.37\ \mathrm{E_h}$ out of $76.4$ for water), but it is of the same size as chemical energy differences, and its changes are what chemistry is made of.

## Where this leads

The Roothaan–Hall equations require a basis set, whose choice is the subject of [[computational-chemistry/basis-sets]]. The Hartree–Fock determinant is the reference on which configuration interaction, Møller–Plesset perturbation theory and coupled-cluster theory build ([[computational-chemistry/electron-correlation]]). The Kohn–Sham equations of density functional theory ([[computational-chemistry/density-functional-theory]]) have exactly the same SCF structure — a Fock-like matrix, a density matrix, self-consistent iteration — with the exchange operator replaced, wholly or in part, by an exchange–correlation potential. And the Hückel method of [[quantum-chemistry/huckel-theory]] can now be seen for what it is: a Roothaan–Hall calculation with an empirical, non-self-consistent Fock matrix.

::: history
Douglas Hartree introduced the self-consistent field for atoms in 1928, solving numerically for each electron in the averaged field of the others, though his product wavefunctions were not antisymmetric. In 1930 Vladimir Fock, and independently John Slater, showed that antisymmetrising the wavefunction as a determinant adds the exchange terms; Slater had introduced the determinant itself in 1929. Tjalling Koopmans published his theorem on orbital energies and ionisation energies in 1934. Clemens Roothaan and George Hall independently derived the matrix form of the closed-shell equations in 1951, making molecular calculations possible on the computers then appearing; Roothaan's open-shell theory followed in 1960, and John Pople and Robert Nesbet formulated the unrestricted equations in 1954. Léon Brillouin's theorem dates from 1934. Hartree–Fock calculations on molecules of chemical interest became routine with the Gaussian-basis programs of the 1970s, of which Pople's Gaussian 70 was the first widely distributed.
:::

::: summary
- Hartree–Fock finds the single Slater determinant with the lowest energy; antisymmetry builds in the Pauli principle and the Fermi hole for same-spin electrons.
- The energy of a determinant is $\sum_i h_{ii} + \tfrac{1}{2}\sum_{ij}(J_{ij} - K_{ij})$; self-interaction cancels because $J_{ii} = K_{ii}$.
- Minimising it gives $\hat f\chi_i = \varepsilon_i\chi_i$ with $\hat f = \hat h + \sum_j(\hat J_j - \hat K_j)$; the equations are nonlinear and solved self-consistently, and $E_\mathrm{HF} \neq \sum_i\varepsilon_i$.
- Koopmans' theorem: $-\varepsilon_i$ approximates a vertical ionisation energy (relaxation and correlation errors partly cancel); virtual orbital energies are poor affinities.
- In a basis the equations become $\mathbf{FC} = \mathbf{SC}\boldsymbol\varepsilon$, with $\mathbf{F}$ built from the density matrix and $\sim K^{4}/8$ two-electron integrals.
- Minimal-basis $\mathrm{H_2}$ at $1.4\ a_0$: $\varepsilon_g = -0.5782\ \mathrm{E_h}$, $E_\mathrm{HF} = -1.1167\ \mathrm{E_h}$; $\mathrm{HeH^{+}}$: $-2.8607\ \mathrm{E_h}$ after a few SCF cycles.
- Brillouin's theorem: single excitations do not mix with the HF reference. RHF fails at bond dissociation; UHF dissociates correctly but is spin-contaminated. The missing correlation energy is small in total but chemically decisive.
:::

## Exercises

::: exercise The helium determinant {level=1 check="-2.75"}
For unscaled hydrogen-like $1s$ orbitals on helium ($\zeta = Z = 2$), $h_{11} = -2.00\ \mathrm{E_h}$ and $J_{11} = 1.25\ \mathrm{E_h}$. Give the energy of the determinant $\lvert 1s\alpha\ 1s\beta\rvert$. (Enter it in $\mathrm{E_h}$.)
::: solution
$E = 2h_{11} + 2J_{11} - K_{11} = 2h_{11} + J_{11} = -4.00 + 1.25 = -2.75\ \mathrm{E_h}$. Allowing the orbital to contract less ($\zeta = 1.6875$) lowers this to $-2.8477\ \mathrm{E_h}$, and full radial freedom gives the HF limit $-2.8617\ \mathrm{E_h}$.
:::
:::

::: exercise Koopmans for $\mathrm{H_2}$ {level=1 check="15.73"}
The occupied orbital energy of STO-3G $\mathrm{H_2}$ at $1.4\ a_0$ is $-0.57820\ \mathrm{E_h}$. Estimate the vertical ionisation energy. (Enter it in $\mathrm{eV}$ to four significant figures.)
::: solution
$I \approx 0.57820 \times 27.2114\ \mathrm{eV} = 15.73\ \mathrm{eV}$ ([[#thm-koopmans]]).
:::
:::

::: exercise Counting integrals {level=1 check="12753775"}
Real two-electron integrals have the eightfold permutational symmetry $(\mu\nu|\lambda\sigma) = (\nu\mu|\lambda\sigma) = (\mu\nu|\sigma\lambda) = (\lambda\sigma|\mu\nu) = \cdots$. How many distinct integrals are there for $K = 100$ basis functions? (Enter the exact number.)
::: hint
There are $M = K(K + 1)/2$ distinct pairs $\mu\nu$, and the integral is symmetric in the two pairs.
:::
::: solution
$M = 100 \times 101/2 = 5050$ distinct pairs, and $M(M + 1)/2 = 5050 \times 5051/2 = 12\,753\,775$ distinct integrals, close to $K^{4}/8 = 1.25\times10^{7}$. Stored as 8-byte numbers they occupy about $100\ \mathrm{MB}$; for $K = 1000$ the figure is $10^{11}$ integrals and close to $1\ \mathrm{TB}$, which is why large calculations recompute integrals on the fly ("direct SCF") rather than store them.
:::
:::

::: exercise The total energy is not the sum of orbital energies {level=2 check="-1.831"}
For STO-3G $\mathrm{H_2}$ at $1.4\ a_0$, $\varepsilon_g = -0.5782\ \mathrm{E_h}$ and $h_{gg} = -1.2528\ \mathrm{E_h}$. Use $E_\mathrm{el} = \sum_a(h_{aa} + \varepsilon_a)$ (sum over doubly occupied spatial orbitals) to compute the electronic energy, and compare with $2\varepsilon_g$. (Enter $E_\mathrm{el}$ in $\mathrm{E_h}$.)
::: solution
For a closed shell, $E_\mathrm{el} = \sum_a^{N/2}(h_{aa} + \varepsilon_a)$, which follows from [[#eq-closed-shell-energy]] and $\varepsilon_a = h_{aa} + \sum_b(2J_{ab} - K_{ab})$. Here $E_\mathrm{el} = -1.2528 - 0.5782 = -1.831\ \mathrm{E_h}$, whereas $2\varepsilon_g = -1.1564\ \mathrm{E_h}$ is too high by $J_{gg} = 0.6746\ \mathrm{E_h}$ — the double-counted repulsion.
:::
:::

::: exercise The HF energy of $\mathrm{H_2}$ from integrals {level=2 check="-1.1167"}
Using the integrals of [[#ex-h2-hf]], compute $h_{gg}$ and $J_{gg}$ and hence the total Hartree–Fock energy of $\mathrm{H_2}$ at $R = 1.4\ a_0$, including nuclear repulsion. (Enter $E_\mathrm{HF}$ in $\mathrm{E_h}$ to four decimal places.)
::: solution
$h_{gg} = (-1.1204 - 0.9584)/1.6593 = -1.2528$; $J_{gg} = 3.7148/5.5067 = 0.6746$; $E_\mathrm{el} = 2(-1.2528) + 0.6746 = -1.8310$; $E_\mathrm{HF} = -1.8310 + 0.7143 = -1.1167\ \mathrm{E_h}$.
:::
:::

::: exercise Mulliken populations in $\mathrm{HeH^{+}}$ {level=2 check="1.53" #exr-mulliken}
The converged occupied orbital of STO-3G $\mathrm{HeH^{+}}$ is $\psi_1 = 0.8019\,\phi_\mathrm{He} + 0.3368\,\phi_\mathrm{H}$, with $S_{12} = 0.4508$. The Mulliken gross population on helium is $q_\mathrm{He} = 2\left(c_\mathrm{He}^{2} + c_\mathrm{He}c_\mathrm{H}S_{12}\right)$, sharing the overlap population equally between the atoms. Compute $q_\mathrm{He}$ and check that the populations add to $2$. (Enter $q_\mathrm{He}$.)
::: solution
$q_\mathrm{He} = 2(0.6431 + 0.8019 \times 0.3368 \times 0.4508) = 2(0.6431 + 0.1217) = 1.53$, and $q_\mathrm{H} = 2(0.1134 + 0.1217) = 0.47$; the sum is $2.00$ because $\psi_1$ is normalised ($c_1^{2} + c_2^{2} + 2c_1c_2S = 1$). Helium thus carries a net charge of $+0.47$ and hydrogen $+0.53$. Mulliken charges depend strongly on the basis set and should be used only for trends within one basis.
:::
:::

::: exercise The RHF dissociation limit {level=3 check="-0.546"}
Show that as $R \to \infty$ the RHF energy of $\mathrm{H_2}$ in a minimal basis tends to $2E(\mathrm{H}) + \tfrac{1}{2}(11|11)$, where $(11|11)$ is the one-centre repulsion integral, and evaluate it for STO-3G ($E(\mathrm{H}) = -0.46658\ \mathrm{E_h}$ with $\zeta = 1.24$, $(11|11) = 0.7746\ \mathrm{E_h}$). (Enter the limit in $\mathrm{E_h}$.)
::: solution
As $R \to \infty$, $S_{12} \to 0$, $H_{12} \to 0$, the two-centre integrals $(21|11)$ and $(21|21)$ vanish and $(11|22) \to 1/R \to 0$, while $H_{11} \to E(\mathrm{H})$ plus an attraction to the distant proton that cancels against $V_\mathrm{NN}$ and $(11|22)$. Then $h_{gg} \to E(\mathrm{H})$ and $J_{gg} \to \tfrac{1}{2}(11|11)$, so $E \to 2E(\mathrm{H}) + \tfrac{1}{2}(11|11) = -0.93316 + 0.38730 = -0.546\ \mathrm{E_h}$. The excess $\tfrac{1}{2}(11|11) = 0.387\ \mathrm{E_h} = 10.5\ \mathrm{eV}$ is the cost of the $50\ \%$ ionic character: half of the time both electrons are on one atom, paying the one-centre repulsion $(11|11)$.
:::
:::

::: exercise Derive the closed-shell Fock matrix for $\mathrm{H_2}$ {level=3 check="-0.578"}
In the minimal basis with $\mathbf{P} = \frac{1}{1 + S_{12}}\begin{pmatrix}1 & 1 \\ 1 & 1\end{pmatrix}$, show that $F_{11} = H_{11} + \frac{1}{1 + S_{12}}\left[\tfrac{1}{2}(11|11) + (11|22) + (21|11) - \tfrac{1}{2}(21|21)\right]$, evaluate $F_{11}$ and $F_{12}$, and obtain $\varepsilon_g = (F_{11} + F_{12})/(1 + S_{12})$. (Enter $\varepsilon_g$ in $\mathrm{E_h}$ to three decimal places.)
::: solution
With all $P_{\lambda\sigma} = 1/(1 + S_{12}) = 0.60266$, $F_{11} = H_{11} + P\sum_{\lambda\sigma}\left[(11|\sigma\lambda) - \tfrac{1}{2}(1\lambda|\sigma 1)\right]$. The four Coulomb terms are $(11|11) + (11|22) + 2(11|12)$ and the four exchange terms $\tfrac{1}{2}\left[(11|11) + (12|21) + 2(11|21)\right]$ (using real-orbital symmetry); their difference is $\tfrac{1}{2}(11|11) + (11|22) + (21|11) - \tfrac{1}{2}(21|21) = 0.3873 + 0.5697 + 0.4441 - 0.1485 = 1.2526$, so $F_{11} = -1.1204 + 0.60266 \times 1.2526 = -0.3655$. For $F_{12}$ the Coulomb terms are $(12|11) + (12|22) + (12|12) + (12|21) = 2(21|11) + 2(21|21)$ and the exchange terms $\tfrac{1}{2}\left[(11|12) + (11|22) + (12|12) + (12|22)\right] = (21|11) + \tfrac{1}{2}(11|22) + \tfrac{1}{2}(21|21)$, so $F_{12} = H_{12} + P\left[(21|11) + \tfrac{3}{2}(21|21) - \tfrac{1}{2}(11|22)\right] = -0.9584 + 0.60266 \times (0.4441 + 0.4455 - 0.2848) = -0.5939$. Then $\varepsilon_g = (-0.3655 - 0.5939)/1.6593 = -0.578\ \mathrm{E_h}$, in agreement with [[#ex-h2-hf]].
:::
:::

::: exercise Spin contamination at dissociation {level=3 check="1"}
At large $R$ the UHF determinant of $\mathrm{H_2}$ is $\lvert\phi_\mathrm{A}\alpha\ \phi_\mathrm{B}\beta\rvert$. Writing it as a combination of the singlet and the $M_S = 0$ triplet, find $\langle\hat S^{2}\rangle$ in units of $\hbar^{2}$. (Enter the number.)
::: solution
$\lvert\phi_\mathrm{A}\alpha\,\phi_\mathrm{B}\beta\rvert = \tfrac{1}{\sqrt 2}\left({}^{1}\Psi + {}^{3}\Psi_0\right)$, where ${}^{1}\Psi \propto [\phi_\mathrm{A}\phi_\mathrm{B} + \phi_\mathrm{B}\phi_\mathrm{A}](\alpha\beta - \beta\alpha)$ and ${}^{3}\Psi_0 \propto [\phi_\mathrm{A}\phi_\mathrm{B} - \phi_\mathrm{B}\phi_\mathrm{A}](\alpha\beta + \beta\alpha)$ (for non-overlapping $\phi_\mathrm{A}, \phi_\mathrm{B}$). Hence $\langle\hat S^{2}\rangle = \tfrac{1}{2}(0) + \tfrac{1}{2}(1 \times 2) = 1$. The exact singlet has $0$; the UHF value $1$ signals maximal contamination, and is the diagnostic to look for in a stretched-bond UHF calculation.
:::
:::
