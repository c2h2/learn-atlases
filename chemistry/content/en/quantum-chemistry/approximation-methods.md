The hydrogen atom is the last system quantum chemistry solves exactly. Add a second electron — helium, the second-simplest atom — and the Schrödinger equation can no longer be separated: the repulsion $1/r_{12}$ ties the two electrons' coordinates together, and no change of variables unties them. Every atom past hydrogen, every molecule, every material is therefore an *approximate* problem, and the whole of practical quantum chemistry rests on two great strategies for approximating. The **variation method** asks you to guess a wavefunction with a tunable parameter and adjust the parameter to minimise the energy; the answer is guaranteed to lie above the truth, so improvement is monotone and honest. **Perturbation theory** starts from a problem you *can* solve and adds a small disturbance as a power series, correcting the energy and the wavefunction order by order. These are not classroom tricks: Hartree–Fock theory is the variation method with an orbital ansatz, Møller–Plesset and configuration-interaction methods are perturbation theory and its resummation, and density-functional theory carries the same variational logic with the density in place of the wavefunction. Learning the two methods on helium and hydrogen is learning, in miniature, the software that computes modern chemistry.

## Why approximations are needed

Write the exact electronic Hamiltonian for any system with more than one electron and the obstruction is always the same: the electron–repulsion terms $\sum_{i<j} e^{2}/4\pi\varepsilon_{0} r_{ij}$ couple the coordinates of different electrons, so the wavefunction is not a product of one-electron functions and the differential equation does not separate. Three responses are possible, and quantum chemistry uses all three. One, **mean-field**: replace the complicated correlated motion by each electron moving in the average field of the others — this is the orbital picture, and making it self-consistent is Hartree–Fock theory ([[computational-chemistry/hartree-fock]]). Two, **variation**: do not solve anything; *optimise* a trial wavefunction against the energy, which you can evaluate by integration. Three, **perturbation**: split the Hamiltonian into a solvable part and a small remainder, and expand in the remainder. The variation and perturbation methods are the subject of this lesson; the mean-field picture returns in [[quantum-chemistry/many-electron-atoms]] and again, fully self-consistently, in the computational course.

One fact organises everything below. The exact ground-state energy $E_0$ is a *minimum* — a lower bound that no physically admissible wavefunction can undercut — while perturbation theory produces a *series* that may converge quickly, slowly, or not at all. The two methods fail in opposite directions, which is why practitioners use them together and check one against the other.

## The variation principle

::: theorem The variation principle {#thm-variation}
For any normalised trial wavefunction $\psi$ (satisfying the boundary conditions and the symmetries of the problem), the expectation value of the Hamiltonian obeys
$$
\langle H \rangle = \int \psi^{*} \hat{H} \psi \, \mathrm{d}\tau \;\ge\; E_0 ,
$$
where $E_0$ is the exact ground-state energy. Equality holds if and only if $\psi$ is the exact ground-state wavefunction.
:::

::: proof
Let the exact eigenfunctions of $\hat H$ be $\phi_n$ with energies $E_0 \le E_1 \le E_2 \le \cdots$, and expand the trial function $\psi = \sum_n c_n \phi_n$ with $\sum_n |c_n|^2 = 1$. Because the $\phi_n$ are eigenfunctions,
$$
\langle H \rangle = \sum_n |c_n|^2 E_n \;\ge\; E_0 \sum_n |c_n|^2 = E_0 ,
$$
since every $E_n \ge E_0$. The difference $\langle H \rangle - E_0 = \sum_n |c_n|^2 (E_n - E_0)$ is a sum of non-negative terms and vanishes only when $c_n = 0$ for every $n$ with $E_n > E_0$ — that is, only when $\psi$ is the ground state itself.
:::

The practical content of [[#thm-variation]] is that it converts quantum mechanics into *optimisation*: choose a trial function $\psi(\alpha)$ with a parameter $\alpha$, compute $E(\alpha) = \langle \psi | \hat H | \psi \rangle$ (the normalisation integral included), minimise, and you have an energy that can only be too high. Improving the trial function can never make the answer worse — the error falls as the *square* of the wavefunction error, so even crude wavefunctions give tolerable energies.

::: example The box from above: $\psi = x(L-x)$ {#ex-box-variational}
No exact solution needed: approximate the ground state of a particle in a one-dimensional box of length $L$ with the simplest function that vanishes at both walls, $\psi = x(L-x)$, and compare with $E_1 = \pi^{2}\hbar^{2}/2mL^{2}$.
::: solution
With $\psi' = L - 2x$,
$$
E = \frac{\int_0^L \tfrac{1}{2}\hbar^{2} (\psi')^{2}\,\mathrm{d}x}{\int_0^L \psi^{2}\,\mathrm{d}x}
= \frac{\tfrac{1}{2}\hbar^{2} \cdot L^{3}/3}{L^{5}/30} = \frac{5\hbar^{2}}{mL^{2}} .
$$
Against the exact $E_1 = (\pi^{2}/2)\,\hbar^{2}/mL^{2} = 4.935\,\hbar^{2}/mL^{2}$ this is high by a factor $5/4.935 = 1.013$ — one and a third per cent, from a function with only the right zeros. For an electron in a $1.00\ \mathrm{nm}$ box the exact $E_1$ is $0.376\ \mathrm{eV}$ and the estimate $0.381\ \mathrm{eV}$. The lesson is the recurring one: the energy is forgiving of wavefunction error.
:::
:::

::: example The harmonic oscillator with a Gaussian {#ex-ho-gaussian}
Try the Gaussian $\psi = e^{-\alpha x^{2}/2}$ (any $\alpha > 0$) on $\hat H = -\frac{\hbar^{2}}{2m}\frac{\mathrm{d}^{2}}{\mathrm{d}x^{2}} + \tfrac{1}{2} m \omega^{2} x^{2}$ and minimise over $\alpha$.
::: solution
For the normalised Gaussian $|\psi|^{2} \propto e^{-\alpha x^{2}}$ one has $\langle x^{2} \rangle = 1/2\alpha$, and integrating the kinetic term by parts ($\int \psi(-\psi'')\,\mathrm{d}x = \int (\psi')^{2}\,\mathrm{d}x = \tfrac{\alpha}{2}\int\psi^{2}\,\mathrm{d}x$) gives
$$
E(\alpha) = \frac{\hbar^{2}\alpha}{4m} + \frac{m\omega^{2}}{4\alpha}, \qquad
\frac{\mathrm{d}E}{\mathrm{d}\alpha} = \frac{\hbar^{2}}{4m} - \frac{m\omega^{2}}{4\alpha^{2}} = 0 \;\Longrightarrow\; \alpha^{*} = \frac{m\omega}{\hbar}.
$$
At the optimum $E = \hbar\omega/4 + \hbar\omega/4 = \tfrac{1}{2}\hbar\omega$ — the exact zero-point energy. The trial space *contained* the exact answer, so the variation method found it; the kinetic and potential halves balancing each other is the virial theorem announcing itself.
:::
:::

::: warning What the variation principle does and does not promise {#warn-variation}
Three qualifications turn the guarantee into a tool. First, $\langle H \rangle \ge E_0$ holds only over trial functions with the *correct boundary conditions*: a Gaussian tried on a box does not vanish at the walls, and its naive energy can undercut $E_0$ — the theorem's hypothesis, not the theorem, has failed. Second, if your trial function has the symmetry of an *excited* state, the minimum you find bounds the lowest level *of that symmetry*, not $E_0$: the variation method never finds a state of a symmetry it cannot represent. Third, the energy is right to first order in the wavefunction error but the wavefunction itself is right only to zeroth — energies from variational calculations look better than the wavefunctions that produced them, which matters when you compute properties other than $E$.
:::

## Helium: the classic variational calculation

Helium's ground state is the benchmark. In atomic units ($\hbar = m_e = e = 4\pi\varepsilon_0 = 1$; $1\ \mathrm{E_h} = 27.2114\ \mathrm{eV}$) the Hamiltonian for nuclear charge $Z = 2$ is
$$
\hat{H} = -\tfrac{1}{2}\nabla_1^{2} - \frac{Z}{r_1} -\tfrac{1}{2}\nabla_2^{2} - \frac{Z}{r_2} + \frac{1}{r_{12}} .
$$
Drop $1/r_{12}$ and you have two independent hydrogen-like ions with $E^{(0)} = 2 \times \left(-Z^{2}/2\right) = -4\ \mathrm{E_h} = -108.85\ \mathrm{eV}$. The repulsion expectation value between two unscaled $1s$ orbitals is exactly $5Z/8 = 1.25\ \mathrm{E_h} = 34.01\ \mathrm{eV}$, so the naive energy is $-2.75\ \mathrm{E_h} = -74.83\ \mathrm{eV}$ — far too high (the exact non-relativistic value is $-2.9037\ \mathrm{E_h} = -79.01\ \mathrm{eV}$). The physical diagnosis is obvious: each electron *screens* the nucleus from the other, so both should occupy *more diffuse* orbitals than the unscaled $1s$.

::: example Helium with a scaled nuclear charge {#ex-helium-variation}
Take the product trial function $\psi = \left(\zeta^{3}/\pi\right) \exp\!\left[-\zeta\left(r_1 + r_2\right)\right]$ of two hydrogen-like $1s$ orbitals with an effective charge $\zeta$ as the variational parameter, and find the optimum.
::: solution
The three expectation values for hydrogen-like orbitals of charge $\zeta$ are $\langle -\tfrac{1}{2}\nabla^{2} \rangle = \zeta^{2}/2$ per electron, $\langle -Z/r \rangle = -Z\zeta$ per electron, and $\langle 1/r_{12} \rangle = 5\zeta/8$. Hence
$$
E(\zeta) = \zeta^{2} - 2Z\zeta + \tfrac{5}{8}\zeta \quad (\text{in } \mathrm{E_h}), \qquad
\frac{\mathrm{d}E}{\mathrm{d}\zeta} = 2\zeta - 2Z + \tfrac{5}{8} = 0 \;\Longrightarrow\; \zeta^{*} = Z - \tfrac{5}{16} = 1.6875 .
$$
Each electron screens the other by $5/16$ of a proton — the first quantitative number for *shielding*, which reappears as Slater's rules in [[quantum-chemistry/many-electron-atoms]]. The energy is $E(\zeta^{*}) = -\zeta^{*2} = -2.8477\ \mathrm{E_h} = -77.49\ \mathrm{eV}$: better than the naive $-74.83\ \mathrm{eV}$, still $1.5\ \mathrm{eV}$ above the exact $-79.01\ \mathrm{eV}$. The first ionisation energy follows as $E(\mathrm{He}) - E(\mathrm{He}^{+}) = -2.8477 + 2 = -0.8477\ \mathrm{E_h} = 23.07\ \mathrm{eV}$ against the experimental $24.58\ \mathrm{eV}$ — too low, because the variational He energy is too high while the $\mathrm{He}^{+}$ energy is exact.
:::
:::

:::widget plot
f: x^2 - 2*Z*x + 5*x/8
x: 0.5, 2.5
y: -3.2, 0.5
sliders: Z=2:1:10:1
labels: \text{E(}\zeta\text{)/E_h}
caption: The helium variational energy $E(\zeta) = \zeta^{2} - 2Z\zeta + \tfrac{5}{8}\zeta$ against the effective charge $\zeta$ (in atomic units). The parabola's minimum sits at $\zeta^{*} = Z - 5/16$, here $1.6875$ for $Z = 2$: each electron shields $5/16$ of a unit of nuclear charge from the other. Slide `Z` to see the minimum track $Z - 5/16$ for other hydrogen-like two-electron ions ($\mathrm{Li^{+}}$, $\mathrm{Be^{2+}}$), whose correlation error shrinks relative to the total energy as $Z$ grows.
:::

::: quiz
A student minimises $\langle H \rangle$ over trial functions and obtains $-2.86\ \mathrm{E_h}$ for helium, below the variational value $-2.8477\ \mathrm{E_h}$ but above the exact $-2.9037\ \mathrm{E_h}$. What has the student done?
- [x] Nothing wrong: any trial function gives an energy above the exact one, and a *better* trial function gives a *lower* upper bound — $-2.86\ \mathrm{E_h}$ is simply a tighter bound than the scaled-charge result.
- [ ] Made an arithmetic error, because $-2.8477\ \mathrm{E_h}$ is the true ground-state energy.
- [ ] Broken the variation principle, which forbids energies below the best previous bound.
- [ ] Used a trial function of excited-state symmetry, which can dip below the ground-state bound.
::: solution
The variation principle bounds the energy from *above* by the exact $E_0$, not from above by any previous estimate: better trial functions must give lower energies, marching down towards $-2.9037\ \mathrm{E_h}$ and never past it. Hylleraas pushed exactly this march to six decimal places in 1929 by adding the interelectronic distance $r_{12}$ to the trial function — the first demonstration that the missing $1.5\ \mathrm{eV}$ is *electron correlation*, physics no product of orbitals can capture ([[computational-chemistry/electron-correlation]]).
:::
:::

## The linear variation method and the secular equation

One-parameter guesses do not scale to molecules. The *linear* variation method fixes a finite set of basis functions $\{\phi_i\}$ — atomic orbitals, say — and varies the *coefficients* in
$$
\psi = \sum_{i=1}^{n} c_i \phi_i , \qquad
E = \frac{\sum_{ij} c_i^{*} c_j H_{ij}}{\sum_{ij} c_i^{*} c_j S_{ij}}, \qquad
H_{ij} = \int \phi_i^{*} \hat{H} \phi_j\,\mathrm{d}\tau, \quad S_{ij} = \int \phi_i^{*} \phi_j\,\mathrm{d}\tau .
$$

::: proposition The secular equations {#prop-secular}
Minimising $E$ with respect to the coefficients gives the generalised eigenvalue problem
$$
\mathbf{H}\mathbf{c} = E \mathbf{S}\mathbf{c} ,
$$
which has non-trivial solutions only where the **secular determinant** vanishes, $\det\left(\mathbf{H} - E\mathbf{S}\right) = 0$. For an orthonormal basis ($\mathbf{S} = \mathbf{I}$) the energies are simply the eigenvalues of the Hamiltonian matrix, and the $n$ roots interleave the $n$ lowest exact levels of the corresponding symmetry: $E_1 \ge \tilde{E}_1 \ge \tilde{E}_2 \ge E_2 \cdots$ (the interlacing theorem).
:::

::: proof
Set $\partial E / \partial c_i^{*} = 0$ with the quotient rule. The numerator contributes $\sum_j H_{ij} c_j$, the denominator contributes $E \sum_j S_{ij} c_j$, and rearranging gives $\sum_j \left(H_{ij} - E S_{ij}\right) c_j = 0$ for every $i$ — a homogeneous linear system, solvable for non-zero $\mathbf c$ exactly when $\det(\mathbf{H} - E\mathbf{S}) = 0$. The interlacing property follows because the trial space is an $n$-dimensional subspace of the full Hilbert space: the minimax (Courant–Fischer) characterisation of eigenvalues, applied inside and outside the subspace, forces each exact level to bracket its approximate counterpart.
:::

For a two-dimensional basis the secular determinant is quadratic and its roots deserve to be memorised, because they are the mathematics behind every "two interacting configurations" picture in chemistry.

::: example Two interacting levels: avoided crossing {#ex-two-level}
An orthonormal pair of basis states has $H_{11} = -2.00\ \mathrm{E_h}$, $H_{22} = -1.00\ \mathrm{E_h}$ and coupling $H_{12} = -0.50\ \mathrm{E_h}$. Find the two variational energies and the composition of the lower one.
::: solution
For $\mathbf{S} = \mathbf{I}$ the roots are
$$
E_{\pm} = \frac{H_{11} + H_{22}}{2} \pm \sqrt{\left(\frac{H_{11} - H_{22}}{2}\right)^{2} + H_{12}^{2}}
= -1.50 \pm \sqrt{0.25 + 0.25} = -1.50 \pm 0.707 ,
$$
so $E_- = -2.207\ \mathrm{E_h}$ and $E_+ = -0.793\ \mathrm{E_h}$. Both levels move: the lower drops $0.207\ \mathrm{E_h}$ below $H_{11}$ and the upper rises $0.207\ \mathrm{E_h}$ above $H_{22}$ — **level repulsion**, and the reason avoided crossings are avoided. The lower state's coefficients satisfy $(H_{11} - E_-)c_1 + H_{12} c_2 = 0$, giving $c_2/c_1 = 0.50/0.793 = 0.63$: mostly $\phi_1$ with $29\ \%$ of $\phi_2$'s probability mixed in. When $H_{11} = H_{22}$ (degenerate basis states) the mixing becomes $50/50$ whatever the coupling — degeneracy is the amplifier of configuration interaction, and the whole of hybridisation and of benzene's $e_{1g}$ pair lives on that fact.
:::
:::

:::widget plot
f: sqrt((x/2)^2 + c^2); -sqrt((x/2)^2 + c^2)
x: -4, 4
y: -3, 3
sliders: c=0.5:0:2:0.1
labels: \text{upper root}; \text{lower root}
caption: The two roots $E_{\pm} = \pm\sqrt{(\Delta/2)^{2} + H_{12}^{2}}$ of a two-level secular problem against the unperturbed separation $\Delta = H_{11} - H_{22}$, with coupling `c` $= H_{12}$ on the slider (energies in units of $|H_{12}|$ at $\Delta = 0$). At $\Delta = 0$ the levels are split by $2|H_{12}|$ and the states are $50/50$ mixtures; far from resonance the curves relax to the unperturbed straight lines and the mixing vanishes like $H_{12}/\Delta$. Perturbation theory is the far-from-resonance limit of this exact result — which is exactly why it fails near $\Delta = 0$.
:::

## Perturbation theory

Perturbation theory assumes the Hamiltonian splits as $\hat{H} = \hat{H}^{0} + \lambda \hat{H}'$, where $\hat{H}^{0}$ is solvable and $\hat{H}'$ is small, and expands the exact energy and wavefunction in powers of the bookkeeping parameter $\lambda$ (set to $1$ at the end).

::: proposition The perturbation expansions {#prop-perturbation}
If $\hat{H}^{0}\phi_n^{0} = E_n^{0}\phi_n^{0}$ with non-degenerate, normalised $\phi_n^{0}$, and $\langle \phi_0^{0} | \phi_0 \rangle = 1$, then the ground-state energy of $\hat{H}^{0} + \lambda\hat{H}'$ is
$$
E_0 = E_0^{0} + \lambda \underbrace{\langle \phi_0^{0} | \hat{H}' | \phi_0^{0} \rangle}_{E^{(1)}}
+ \lambda^{2} \underbrace{\sum_{k \ne 0} \frac{\left| \langle \phi_k^{0} | \hat{H}' | \phi_0^{0} \rangle \right|^{2}}{E_0^{0} - E_k^{0}}}_{E^{(2)}} + \cdots
$$
The first-order correction is the *unperturbed*-wavefunction expectation value of the perturbation; the second-order correction is a sum over all other states, each term the squared coupling divided by the energy *denominator* — and, for the ground state, every denominator is negative, so $E^{(2)} \le 0$ always.
:::

::: proof
Insert $E_0 = E^{(0)} + \lambda E^{(1)} + \lambda^{2} E^{(2)} + \cdots$ and $\phi_0 = \phi_0^{0} + \lambda \phi^{(1)} + \cdots$ into $(\hat{H}^{0} + \lambda \hat{H}')\phi_0 = E_0 \phi_0$ and collect powers of $\lambda$. Order $\lambda^{0}$ is the unperturbed equation. Order $\lambda^{1}$:
$$
\left(\hat{H}^{0} - E^{(0)}\right) \phi^{(1)} = \left(E^{(1)} - \hat{H}'\right) \phi_0^{0} .
$$
Project onto $\langle \phi_0^{0} |$: the left side vanishes (Hermiticity), leaving $E^{(1)} = \langle \phi_0^{0} | \hat{H}' | \phi_0^{0} \rangle$. Projecting the same equation onto $\langle \phi_k^{0} |$ instead gives the first-order *wavefunction*, $\phi^{(1)} = \sum_{k\ne0} \frac{\langle \phi_k^{0} | \hat{H}' | \phi_0^{0} \rangle}{E_0^{0} - E_k^{0}} \phi_k^{0}$. Order $\lambda^{2}$ projected onto $\langle \phi_0^{0} |$ then gives $E^{(2)} = \langle \phi_0^{0} | \hat{H}' | \phi^{(1)} \rangle$, which is the sum-over-states formula above.
:::

::: example The quartic oscillator {#ex-quartic}
Add an anharmonicity $\hat{H}' = \lambda x^{4}$ to the harmonic oscillator and correct the ground-state energy to second order in $\lambda$.
::: solution
Work in units $\hbar = m = \omega = 1$, so $x = (a + a^{\dagger})/\sqrt{2}$ and $E_v^{0} = v + \tfrac{1}{2}$. Because $x^{4}$ changes $v$ by $0, \pm 2, \pm 4$, only $v = 2$ and $v = 4$ couple to the ground state: $\langle 0 | x^{4} | 0 \rangle = \tfrac{3}{4}$, $\langle 2 | x^{4} | 0 \rangle = 3/\sqrt{2}$, $\langle 4 | x^{4} | 0 \rangle = \sqrt{3/2}$. Hence
$$
E_0 = \tfrac{1}{2} + \tfrac{3}{4}\lambda - \left[\frac{(3/\sqrt{2})^{2}}{2} + \frac{(\sqrt{3/2})^{2}}{4}\right]\lambda^{2} + \cdots
= \tfrac{1}{2} + \tfrac{3}{4}\lambda - \tfrac{21}{8}\lambda^{2} + \cdots
$$
Restoring units: $E_0 = \tfrac{1}{2}\hbar\omega + \tfrac{3}{4}\lambda\left(\frac{\hbar}{m\omega}\right)^{2} - \tfrac{21}{8}\frac{\lambda^{2}}{\hbar\omega}\left(\frac{\hbar}{m\omega}\right)^{3}$. Numerical check at $\lambda = 0.01$: the series gives $0.507237$ and direct diagonalisation of the Hamiltonian in a large basis gives $0.507256$ — the second-order term is already worth $2.6 \times 10^{-4}$, a fifth of the first-order shift. Note the structure you will see all your career: the first-order energy is a mean value, the second-order is *negative* and set by couplings divided by energy gaps.
:::
:::

::: example The Stark effect of hydrogen's ground state {#ex-stark-1s}
A hydrogen atom in its $1s$ state sits in a uniform electric field of strength $\mathcal{E}$; the perturbation is $\hat{H}' = e\mathcal{E} z$. Find the leading energy correction and evaluate it at $\mathcal{E} = 10^{8}\ \mathrm{V\,m^{-1}}$.
::: solution
The first-order correction vanishes by parity: $|\psi_{1s}|^{2}$ is even while $z$ is odd, so $\langle 1s | z | 1s \rangle = 0$ — a ground state with no permanent dipole has no linear Stark effect. The second-order sum $\sum_{k\ne 1s} \frac{|\langle k | e\mathcal{E} z | 1s \rangle|^{2}}{E_{1s} - E_k}$ converges rapidly; its closed form is
$$
E^{(2)} = -\frac{9}{4} a_0^{3} \mathcal{E}_{\mathrm{au}}^{2}\ \mathrm{E_h} = -\tfrac{1}{2}\alpha \mathcal{E}^{2}, \qquad \alpha = \frac{9}{2} a_0^{3} = 7.42 \times 10^{-41}\ \mathrm{C^{2}\,m^{2}\,J^{-1}} \ \ (\alpha / 4\pi\varepsilon_0 = 0.667 \times 10^{-30}\ \mathrm{m^{3}}),
$$
the textbook static polarisability of the hydrogen atom. The single largest term is the $2p$ state: with $\langle 2p_0 | z | 1s \rangle = 128\sqrt{2}\,a_0/243 = 0.745\,a_0$ and $E_2 - E_1 = \tfrac{3}{8}\ \mathrm{E_h}$ it contributes $-1.48\,\mathcal{E}_{\mathrm{au}}^{2}$, sixty-six per cent of the total — one low-lying, strongly coupled state dominates, exactly as the denominators of [[#prop-perturbation]] suggest. At $\mathcal{E} = 10^{8}\ \mathrm{V\,m^{-1}}$ (a strong laboratory field; $1$ atomic unit $= 5.14 \times 10^{11}\ \mathrm{V\,m^{-1}}$) the shift is $-2.3 \times 10^{-6}\ \mathrm{eV}$ — small, as advertised, because the field is $2 \times 10^{-4}$ atomic units and the correction is quadratic in it.
:::
:::

::: warning First-order energy, first-order wavefunction, and the degeneracy trap {#warn-perturbation}
Two errors recur. First, $E^{(1)} = \langle \phi^{0} | \hat{H}' | \phi^{0} \rangle$ is computed with the *unperturbed* wavefunction; the wavefunction itself is corrected at first order, and properties that depend on the corrected wavefunction (dipole moments, polarisabilities) are therefore *second*-order properties — which is why the Stark shift above is quadratic. Second, and more dangerous: every denominator in $\phi^{(1)}$ and $E^{(2)}$ is an energy *gap*, so a degenerate or nearly degenerate state $\phi_k^{0}$ makes the expansion diverge. The cure is not to patch the formula but to change the method: diagonalise $\hat{H}'$ within the degenerate subspace first (degenerate perturbation theory), which is nothing but a small secular problem [[#prop-secular]]. Near-degeneracy is the same trap in disguise — the two-level widget above shows perturbation theory relaxing to the truth only far from resonance.
:::

## When perturbation theory fails: the linear Stark effect of $n = 2$ hydrogen

The $n = 2$ manifold of hydrogen is fourfold degenerate ($2s, 2p_0, 2p_{\pm 1}$), and the field couples $2s$ and $2p_0$ with matrix element $\langle 2s | e\mathcal{E} z | 2p_0 \rangle = 3 e a_0 \mathcal{E}$ while the $m = \pm 1$ states are uncoupled. Diagonalising the $2 \times 2$ block $\begin{pmatrix} 0 & -3ea_0\mathcal{E} \\ -3ea_0\mathcal{E} & 0 \end{pmatrix}$ (the $2s$–$2p$ degeneracy makes the diagonal zero) gives shifts $0, 0, \pm 3 e a_0 \mathcal{E}$: a *linear* Stark effect, first order in the field, where naive non-degenerate theory predicted nothing but a quadratic shift. At $\mathcal{E} = 10^{8}\ \mathrm{V\,m^{-1}}$ the split components lie $15.9\ \mathrm{meV}$ apart — a thousand times the $1s$ quadratic shift, because the $n = 2$ levels are degenerate and the atom has a permanent dipole *in the right basis* ($2s \pm 2p_0$). Hydrogen's famous linear Stark effect, the reason its spectral lines smear in weak fields, is degenerate perturbation theory in one page.

## Where this leads

The linear variation method with atomic-orbital bases is the doorway to the chemical bond: apply it to $\mathrm{H_2^+}$ with two $1s$ functions and you derive the bonding and antibonding molecular orbitals, complete with the overlap matrix $\mathbf{S} \ne \mathbf{I}$, in [[quantum-chemistry/chemical-bond-qm]]. The scaled-charge result $\zeta^{*} = Z - 5/16$ generalises to the empirical shielding rules of [[quantum-chemistry/many-electron-atoms]]. Let the basis grow to thousands of functions and the optimisation become self-consistent, and you are at [[computational-chemistry/hartree-fock]]; treat the part of the electron repulsion the orbitals miss as a perturbation and you are at [[computational-chemistry/electron-correlation]]; keep the variational logic but vary the density instead of the wavefunction and you are at [[computational-chemistry/density-functional-theory]]. The two methods of this lesson are not a prelude to the computational course — they *are* it, at human scale.

::: history
Both methods were older than quantum mechanics. Lord Rayleigh showed in 1877 that the natural frequency of a vibrating system is bounded from below by trial shapes inserted into an energy ratio, and Walther Ritz turned the same observation into a computational method for elasticity in 1909 — when Schrödinger recast wave mechanics as an eigenvalue problem in 1926 he explicitly used this Rayleigh–Ritz variational form, and the first scaled-charge calculations on helium appeared that same year. The sum-over-states structure of second-order perturbation theory descends from Kramers's 1924 dispersion theory, with its coupling-squared-over-energy-gap terms intact. The decisive experiment for the *method* was Hylleraas's 1929 variational treatment of helium with the interelectronic distance $r_{12}$ built into the trial function: it beat every orbital product and located the residual error as electron correlation, the target that configuration interaction and coupled-cluster theory still chase. Dirac's 1929 paper on the quantum mechanics of many-electron systems then put the variation method and the self-consistent field in their modern antisymmetric form.
:::

::: summary
- Only hydrogen-like systems are exact; everything else is approximation, and the two master strategies are variation (optimise, guaranteed upper bound) and perturbation (expand in a small disturbance).
- The variation principle $\langle H \rangle \ge E_0$ follows from expanding the trial function in exact eigenstates; the energy error is second order in the wavefunction error, so crude functions give good energies.
- Helium with $\psi \propto e^{-\zeta(r_1 + r_2)}$ gives $\zeta^{*} = Z - 5/16 = 1.6875$, $E = -2.8477\ \mathrm{E_h} = -77.49\ \mathrm{eV}$ against the exact $-79.01\ \mathrm{eV}$: shielding of $5/16$ of a proton per electron, and a $1.5\ \mathrm{eV}$ correlation error.
- The linear variation method turns the Schrödinger equation into $\mathbf{H}\mathbf{c} = E\mathbf{S}\mathbf{c}$; its roots interleave the exact levels, and the two-level roots $E_{\pm} = \bar{H} \pm \sqrt{(\Delta/2)^{2} + H_{12}^{2}}$ explain level repulsion and $50/50$ mixing at degeneracy.
- Perturbation theory: $E^{(1)} = \langle \phi^{0} | \hat{H}' | \phi^{0} \rangle$; $E^{(2)}$ is a sum of squared couplings over negative energy gaps, hence always negative for a ground state.
- The hydrogen $1s$ Stark effect is quadratic, $E^{(2)} = -\tfrac{9}{4} a_0^{3}\mathcal{E}_{\mathrm{au}}^{2}$, defining the polarisability $\alpha = \tfrac{9}{2} a_0^{3}$; the $n = 2$ Stark effect is *linear* because degeneracy must be diagonalised first.
- Degeneracy (or near-degeneracy) breaks non-degenerate perturbation theory — energy denominators blow up — and the repair is always the same: a small secular problem in the degenerate subspace.
:::

## Exercises

::: exercise The box estimate {level=1 check="5"}
For the trial function $\psi = x(L - x)$ in a box of length $L$, compute $\langle H \rangle$ in units of $\hbar^{2} m^{-1} L^{-2}$. (Enter the number.)
::: solution
$\langle H \rangle = \frac{\frac{1}{2}\hbar^{2}\int_0^L (L-2x)^{2}\,\mathrm{d}x}{\int_0^L x^{2}(L-x)^{2}\,\mathrm{d}x} = \frac{\frac{1}{2}\hbar^{2} \cdot L^{3}/3}{L^{5}/30} = 5\,\hbar^{2}/mL^{2}$, so enter $5$. This is $1.013$ times the exact $\pi^{2}/2 = 4.935$ (in the same units).
:::
:::

::: exercise The Gaussian optimum {level=1 check="0.5"}
For the trial function $\psi = e^{-\alpha x^{2}/2}$ on the harmonic oscillator, the variational energy is $E(\alpha) = \hbar^{2}\alpha/4m + m\omega^{2}/4\alpha$. Give the minimum in units of $\hbar\omega$. (Enter the number.)
::: solution
$\alpha^{*} = m\omega/\hbar$ gives $E_{\min} = \hbar\omega/4 + \hbar\omega/4 = 0.5\,\hbar\omega$ — the exact zero-point energy, because the exact ground state is a Gaussian.
:::
:::

::: exercise Helium's first-order repulsion {level=1 check="34.0"}
Two unscaled hydrogen-like $1s$ electrons on a nucleus with $Z = 2$ have $\langle 1/r_{12} \rangle = 5Z/8$ atomic units. Convert this first-order correction to electron volts. (Enter it in $\mathrm{eV}$.)
::: solution
$5Z/8 = 1.25\ \mathrm{E_h} \times 27.2114\ \mathrm{eV\,E_h^{-1}} = 34.0\ \mathrm{eV}$. Added to $E^{(0)} = -108.85\ \mathrm{eV}$ this gives $-74.8\ \mathrm{eV}$, still $4.2\ \mathrm{eV}$ above the exact $-79.0\ \mathrm{eV}$ — the orbitals must relax (screen) before the energy is competitive.
:::
:::

::: exercise A crude effective charge {level=2 check="-77.5"}
Evaluate the helium variational energy $E(\zeta) = \zeta^{2} - 4\zeta + \tfrac{5}{8}\zeta\ \mathrm{E_h}$ at $\zeta = 1.70$. (Enter it in $\mathrm{eV}$.)
::: solution
$E(1.70) = 2.89 - 6.80 + 1.0625 = -2.8475\ \mathrm{E_h} = -77.48\ \mathrm{eV} \approx -77.5\ \mathrm{eV}$ — within $0.01\ \mathrm{eV}$ of the optimum at $\zeta^{*} = 1.6875$, because a parabola is flat at its minimum: the energy is insensitive to parameter error to first order, the variational method's forgiving side.
:::
:::

::: exercise Solve a secular determinant {level=2 check="-2.21"}
Two orthonormal configurations have $H_{11} = -2.00\ \mathrm{E_h}$, $H_{22} = -1.00\ \mathrm{E_h}$, $H_{12} = -0.50\ \mathrm{E_h}$. Give the lower variational root. (Enter it in $\mathrm{E_h}$.)
::: solution
$\det\begin{pmatrix} -2 - E & -0.5 \\ -0.5 & -1 - E \end{pmatrix} = 0$: $E_{\pm} = -1.50 \pm \sqrt{0.25 + 0.25} = -1.50 \pm 0.707$, so $E_- = -2.21\ \mathrm{E_h}$. The lower root lies below both diagonal elements — the variational energy of a mixed state always undercuts the best unmixed one.
:::
:::

::: exercise First-order quartic shift {level=2 check="0.75"}
For $\hat{H}' = \lambda x^{4}$ on a harmonic oscillator, give $E_0^{(1)}$ in units of $\lambda \left(\hbar / m\omega\right)^{2}$. (Enter the number.)
::: solution
$E_0^{(1)} = \lambda \langle 0 | x^{4} | 0 \rangle = \lambda \cdot \tfrac{3}{4}\left(\hbar/m\omega\right)^{2}$, so enter $0.75$. (In units $\hbar = m = \omega = 1$, $\langle 0 | x^{4} | 0 \rangle = 3\langle x^{2}\rangle^{2} = 3/4$ by Wick's theorem, or by applying $(a + a^{\dagger})^{4}$.)
:::
:::

::: exercise Derive the second-order formula {level=3}
Starting from $(\hat{H}^{0} + \lambda \hat{H}')(\phi^{0} + \lambda\phi^{(1)} + \cdots) = (E^{(0)} + \lambda E^{(1)} + \cdots)(\phi^{0} + \lambda\phi^{(1)} + \cdots)$, derive $E^{(2)} = \sum_{k\ne0} |\langle \phi_k^{0} | \hat{H}' | \phi_0^{0} \rangle|^{2} / (E_0^{0} - E_k^{0})$ and show $E^{(2)} \le 0$ for a ground state. Where exactly is non-degeneracy used?
::: solution
Order $\lambda^{1}$: $(\hat{H}^{0} - E^{(0)})\phi^{(1)} = (E^{(1)} - \hat{H}')\phi^{0}$. Project onto $\langle\phi_k^{0}|$, $k \ne 0$: $(E_k^{0} - E_0^{0})\langle\phi_k^{0}|\phi^{(1)}\rangle = -\langle\phi_k^{0}|\hat{H}'|\phi_0^{0}\rangle$, so the expansion coefficients of $\phi^{(1)}$ are $\langle\phi_k^{0}|\hat{H}'|\phi_0^{0}\rangle/(E_0^{0} - E_k^{0})$. Order $\lambda^{2}$ projected onto $\langle\phi_0^{0}|$: $E^{(2)} = \langle\phi_0^{0}|\hat{H}'|\phi^{(1)}\rangle$, which is the stated sum. For a ground state $E_0^{0} - E_k^{0} < 0$ for every $k$, and the numerators are squared moduli, so $E^{(2)} \le 0$. Non-degeneracy is used in dividing by $E_k^{0} - E_0^{0}$: if any $E_k^{0} = E_0^{0}$ the coefficient $\langle\phi_k^{0}|\phi^{(1)}\rangle$ is undetermined and the expansion collapses — the signal to diagonalise within the degenerate subspace instead.
:::
:::

::: exercise The linear Stark splitting {level=3 check="31.7"}
In the $n = 2$ manifold of hydrogen the field couples $2s$ and $2p_0$ with $\langle 2s | e\mathcal{E} z | 2p_0 \rangle = 3 e a_0 \mathcal{E}$. Diagonalise the $2 \times 2$ block, and compute the separation of the two shifted components at $\mathcal{E} = 1.00 \times 10^{8}\ \mathrm{V\,m^{-1}}$. (Enter it in $\mathrm{meV}$.)
::: solution
The block $\begin{pmatrix} 0 & -3ea_0\mathcal{E} \\ -3ea_0\mathcal{E} & 0 \end{pmatrix}$ has eigenvalues $\pm 3 e a_0 \mathcal{E}$ (with eigenvectors $(2s \pm 2p_0)/\sqrt{2}$, permanent dipoles $\mp 3 e a_0$), while $2p_{\pm1}$ stay at zero. Separation $= 6 e a_0 \mathcal{E} = 6 \times 5.292 \times 10^{-11}\ \mathrm{m} \times 1.00 \times 10^{8}\ \mathrm{V\,m^{-1}} = 3.17 \times 10^{-2}\ \mathrm{eV} = 31.7\ \mathrm{meV}$. Linear in the field — a thousand times the $1s$ quadratic shift at the same field strength — because the degenerate $2s$ and $2p$ states mix at first order.
:::
:::

::: exercise The first-order wavefunction is orthogonal {level=3}
Prove that the intermediate normalisation $\langle \phi_0^{0} | \phi_0 \rangle = 1$ forces $\langle \phi_0^{0} | \phi^{(1)} \rangle = 0$, and explain why the first-order correction to a *property* operator $\hat{A}$ (with no first-order expectation value) is $\langle \phi^{0} | \hat{A} | \phi^{(1)} \rangle + \text{c.c.}$ — a first-order-wavefunction, second-order-looking quantity. What does this say about computing dipole moments to first order in a field?
::: solution
Expand $\langle \phi_0 | \phi_0 \rangle = 1$ as $\langle \phi^{0} + \lambda\phi^{(1)} + \cdots | \phi^{0} + \lambda\phi^{(1)} + \cdots \rangle$; order $\lambda^{0}$ gives $\langle\phi^{0}|\phi^{0}\rangle = 1$ and order $\lambda^{1}$ gives $\langle\phi^{0}|\phi^{(1)}\rangle + \langle\phi^{(1)}|\phi^{0}\rangle = 2\,\mathrm{Re}\,\langle\phi^{0}|\phi^{(1)}\rangle = 0$, and the phase convention makes it exactly zero. Then $\langle \hat{A} \rangle = \langle\phi^{0}|\hat{A}|\phi^{0}\rangle + \lambda\left(\langle\phi^{(1)}|\hat{A}|\phi^{0}\rangle + \langle\phi^{0}|\hat{A}|\phi^{(1)}\rangle\right) + \cdots$: if the unperturbed expectation vanishes, the leading property is *linear in* $\phi^{(1)}$, i.e. linear in the perturbation. For a dipole in a field, $\phi^{(1)} \propto \mathcal{E}$, so the induced dipole is proportional to $\mathcal{E}$ and the energy, being $\tfrac{1}{2}\alpha\mathcal{E}^{2}$, is quadratic — the factor $\tfrac{1}{2}$ between induced moment and energy is the same bookkeeping as $E^{(2)}$ versus $\phi^{(1)}$.
:::
:::
