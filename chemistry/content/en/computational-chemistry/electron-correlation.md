Hartree–Fock theory gets more than $99\ \%$ of the energy of a molecule right and still fails at chemistry. It binds $\mathrm{F_2}$ not at all, puts barriers tens of kilojoules per mole too high, and gives no attraction whatever between two argon atoms. The missing piece is **electron correlation**: in reality the motion of each electron depends instantaneously on where the others are, while in a single Slater determinant opposite-spin electrons move independently in an average field. This lesson develops the three main families of methods that put correlation back — configuration interaction, Møller–Plesset perturbation theory and coupled-cluster theory — and the concepts needed to choose between them: size consistency, the hierarchy of cost and accuracy, and the distinction between dynamic and static correlation. All three are built on the Hartree–Fock determinant of [[computational-chemistry/hartree-fock]] and its virtual orbitals, so the basis-set considerations of [[computational-chemistry/basis-sets]] apply with full force.

## The correlation energy

::: definition Correlation energy {#def-correlation-energy}
The **correlation energy** of a state (Löwdin's definition) is
$$
E_\mathrm{corr} = E_\mathrm{exact} - E_\mathrm{HF},
$$
where $E_\mathrm{exact}$ is the exact non-relativistic Born–Oppenheimer energy and $E_\mathrm{HF}$ is the Hartree–Fock limit (complete basis). By the variation principle $E_\mathrm{corr} < 0$. In a finite basis one also speaks of the correlation energy *in that basis*, $E_\mathrm{FCI} - E_\mathrm{HF}$, where FCI is the exact solution within the basis (defined below).
:::

The correlation energy of helium is $-2.90372 - (-2.86168) = -0.04204\ \mathrm{E_h} = -1.14\ \mathrm{eV}$; for $\mathrm{H_2}$ at equilibrium it is $-0.0408\ \mathrm{E_h}$; for water it is about $-0.37\ \mathrm{E_h}$, or roughly $-0.04\ \mathrm{E_h}$ per electron pair, about $100\ \mathrm{kJ\,mol^{-1}}$ per pair. Its *changes* are what matter. When a bond breaks, two paired electrons separate and their correlation energy is lost; this is why Hartree–Fock underbinds. When two molecules approach, the correlated fluctuations of their electron clouds produce the dispersion attraction, which Hartree–Fock lacks entirely.

Physically, two kinds of correlation are distinguished, though they shade into each other:

- **Dynamic correlation**: the short-range avoidance of electrons, the **Coulomb hole** around each electron that a mean field cannot carve out. It is spread over very many small contributions from excited configurations and requires large basis sets with high angular momentum (the interelectronic cusp of [[computational-chemistry/basis-sets]]).
- **Static** (non-dynamic, or strong) **correlation**: the failure of a single determinant even as a qualitative description, when two or more configurations are nearly degenerate — stretched bonds, diradicals, many transition-metal compounds, the $\pi$ system of ozone. It is carried by a few large contributions.

## Configuration interaction

The Hartree–Fock calculation in a basis of $K$ spatial functions produces $2K$ spin orbitals: $N$ occupied, $2K - N$ virtual. Replacing occupied spin orbitals by virtual ones generates **excited determinants**: singles $\Phi_i^{a}$, doubles $\Phi_{ij}^{ab}$, triples, and so on. These determinants together form a complete basis for $N$-electron wavefunctions in this orbital space.

::: definition Configuration interaction {#def-ci}
The **configuration-interaction** (CI) wavefunction is a linear combination of the reference determinant and excited determinants,
$$
\Psi_\mathrm{CI} = c_0\Phi_0 + \sum_{ia}c_i^{a}\Phi_i^{a} + \sum_{i<j,\,a<b}c_{ij}^{ab}\Phi_{ij}^{ab} + \sum_{i<j<k,\,a<b<c}c_{ijk}^{abc}\Phi_{ijk}^{abc} + \cdots,
$$
with coefficients found by the linear variation method: the lowest eigenvalue of the Hamiltonian matrix $H_{IJ} = \langle\Phi_I|\hat H|\Phi_J\rangle$ in the space of determinants. Including *all* determinants gives **full CI** (FCI), the exact solution in the given basis; truncating after doubles gives **CISD** (or CID without singles).
:::

Because CI is a linear variation method ([[quantum-chemistry/approximation-methods]]), every truncated CI energy is an upper bound to the FCI energy, and FCI in a complete basis is exact. FCI is therefore the benchmark against which approximate methods are judged — but it is almost never affordable. For $N$ electrons in $K$ spatial orbitals with $M_S = 0$ there are $\binom{K}{N/2}^{2}$ determinants:

| system | $K$, $N$ | FCI determinants |
|---|---|---|
| $\mathrm{H_2}$, minimal basis | $2$, $2$ | $4$ |
| CAS of $6$ electrons in $6$ orbitals | $6$, $6$ | $400$ |
| water, cc-pVDZ, frozen $1s$ core | $23$, $8$ | $7.8\times10^{7}$ |
| water, cc-pVDZ, all electrons | $24$, $10$ | $1.8\times10^{9}$ |
| benzene, cc-pVDZ | $114$, $42$ | $1.9\times10^{45}$ |

Not all matrix elements are non-zero. The Slater–Condon rules (the generalisation of [[computational-chemistry/hartree-fock#prop-det-energy]]) show that $\hat H$ couples only determinants differing by at most two spin orbitals, because it contains at most two-electron operators. Brillouin's theorem ([[computational-chemistry/hartree-fock#thm-brillouin]]) adds that singles do not couple directly to the Hartree–Fock reference. The leading correction to $\Phi_0$ therefore comes from double excitations: they describe pairs of electrons simultaneously leaving their orbitals to avoid each other.

::: example Full CI for minimal-basis $\mathrm{H_2}$ {#ex-h2-fci}
In STO-3G $\mathrm{H_2}$ at $R = 1.4\ a_0$ the orbitals are $\sigma_g$ (occupied) and $\sigma_u$ (virtual). By symmetry the only singlet $\Sigma_g^{+}$ determinants are $\Phi_0 = \lvert\sigma_g\bar\sigma_g\rvert$ and the double excitation $\Phi_2 = \lvert\sigma_u\bar\sigma_u\rvert$. The matrix elements are $\langle\Phi_0|\hat H|\Phi_0\rangle = E_\mathrm{HF,el} = -1.8310\ \mathrm{E_h}$, $\langle\Phi_2|\hat H|\Phi_2\rangle = -1.8310 + 2\Delta$ with $2\Delta = 1.5773\ \mathrm{E_h}$, and $\langle\Phi_0|\hat H|\Phi_2\rangle = K_{gu} = (gu|ug) = 0.1813\ \mathrm{E_h}$. Find the FCI energy and wavefunction.
::: solution
Measured from $E_\mathrm{HF}$, the $2 \times 2$ secular problem is $\begin{pmatrix}0 & K \\ K & 2\Delta\end{pmatrix}$, whose lower root is
$$
E_\mathrm{corr} = \Delta - \sqrt{\Delta^{2} + K^{2}} = 0.78864 - \sqrt{0.62196 + 0.03285} = -0.02056\ \mathrm{E_h}.
$$
The FCI total energy is $-1.1167 - 0.0206 = -1.1373\ \mathrm{E_h}$. The eigenvector is $\Psi = 0.9936\,\Phi_0 - 0.1127\,\Phi_2$: the reference still dominates ($98.7\ \%$ weight), and the small admixture of $\sigma_u^{2}$ puts electrons on opposite ends of the bond more often than the Hartree–Fock wavefunction does — left–right correlation. The exact correlation energy of $\mathrm{H_2}$ is $-0.0408\ \mathrm{E_h}$; the minimal basis captures only half of it, because two orbitals cannot represent the Coulomb hole.
:::
:::

::: widget plot
f: x - sqrt(x^2 + K^2); -K^2/(2*x)
x: 0.02, 1.5
y: -0.6, 0.02
sliders: K=0.18:0.02:0.4:0.005
labels: \text{exact } \Delta - \sqrt{\Delta^2 + K^2}; \text{second order } -K^2/2\Delta
vlines: 0.789
caption: Correlation energy (in $\mathrm{E_h}$) from a reference coupled to one doubly excited determinant with coupling $K$, against the half-gap $\Delta$; the vertical line marks $\mathrm{H_2}$ at $1.4\ a_0$ in STO-3G. At large $\Delta$ (well-separated configurations, dynamic correlation) second-order perturbation theory agrees with the exact result. As $\Delta \to 0$ — a bond stretched until $\sigma_g$ and $\sigma_u$ become degenerate — the exact value tends to the finite $-K$ while the perturbative estimate diverges: static correlation defeats perturbation theory.
:::

### Size consistency

Truncated CI has a serious flaw, best seen on two molecules that do not interact.

::: definition Size consistency and size extensivity {#def-size-consistency}
A method is **size-consistent** if, for two subsystems A and B at infinite separation, it gives $E(\mathrm{A\cdots B}) = E(\mathrm{A}) + E(\mathrm{B})$. It is **size-extensive** if its energy scales correctly (linearly) with the number of particles for a uniform system, such as a chain of $n$ identical non-interacting molecules. Hartree–Fock (with appropriate reference), MP$n$, coupled-cluster and full CI are size-extensive; truncated CI (CISD and its relatives) is not.
:::

::: example CID is not size-consistent {#ex-cid-size}
Two STO-3G $\mathrm{H_2}$ molecules are infinitely far apart. Each has the $2 \times 2$ problem of [[#ex-h2-fci]]. Compare $2E_\mathrm{corr}(\mathrm{H_2})$ with the CID correlation energy of the pair.
::: solution
CID for the pair includes the reference, the double excitation on molecule A, and the double on molecule B (each with diagonal energy $2\Delta$ and coupling $K$ to the reference, and no coupling to each other). The *simultaneous* double excitation on both molecules is a quadruple excitation of the combined system and is excluded. The $3 \times 3$ matrix $\begin{pmatrix}0 & K & K \\ K & 2\Delta & 0 \\ K & 0 & 2\Delta\end{pmatrix}$ has lowest eigenvalue
$$
E_\mathrm{CID} = \Delta - \sqrt{\Delta^{2} + 2K^{2}} = 0.78864 - \sqrt{0.62196 + 0.06571} = -0.04061\ \mathrm{E_h},
$$
whereas $2E_\mathrm{corr}(\mathrm{H_2}) = -0.04112\ \mathrm{E_h}$. CID is in error by $0.51\ \mathrm{mE_h}$ ($1.3\ \mathrm{kJ\,mol^{-1}}$) for just two molecules, and the error grows with system size: for $n$ molecules $E_\mathrm{CID} = \Delta - \sqrt{\Delta^{2} + nK^{2}}$, which grows only as $\sqrt{n}$ rather than as $n$. The fraction of the correlation energy recovered by CISD tends to zero for large systems. The missing quadruple — the product of two independent doubles — is exactly what coupled-cluster theory restores.
:::
:::

A popular empirical patch is the **Davidson correction**, $\Delta E_\mathrm{Q} \approx (1 - c_0^{2})E_\mathrm{corr}^\mathrm{CISD}$, which estimates the effect of quadruple excitations from the weight of the reference in the CISD wavefunction. It is a rule of thumb, not a derivation, but it removes most of the size-consistency error in multireference CI.

## Møller–Plesset perturbation theory

Perturbation theory ([[quantum-chemistry/approximation-methods]]) is the natural alternative to CI when the reference is good. The trick, due to Møller and Plesset (1934), is the choice of the unperturbed Hamiltonian.

::: proposition Møller–Plesset partitioning {#prop-mp-partition}
Take $\hat H^{(0)} = \sum_i\hat f(i)$, the sum of Fock operators, and $\hat V = \hat H - \hat H^{(0)}$ (the **fluctuation potential**: the true electron repulsion minus its Hartree–Fock average). Then every Slater determinant built from canonical HF orbitals is an eigenfunction of $\hat H^{(0)}$ with eigenvalue equal to the sum of its occupied orbital energies, and
$$
E^{(0)} + E^{(1)} = E_\mathrm{HF} .
$$
The first correction to the Hartree–Fock energy is therefore of second order.
:::

::: proof
Since $\hat f\chi_p = \varepsilon_p\chi_p$ and a determinant is an antisymmetrised product, $\sum_i\hat f(i)$ acting on any determinant built from canonical orbitals gives $\sum_{p\,\in\,\text{occupied}}\varepsilon_p$ times the determinant. For the reference, $E^{(0)} = \sum_i\varepsilon_i$. The first-order energy is $E^{(1)} = \langle\Phi_0|\hat V|\Phi_0\rangle = \langle\Phi_0|\hat H|\Phi_0\rangle - \sum_i\varepsilon_i = E_\mathrm{HF} - \sum_i\varepsilon_i$, using [[computational-chemistry/hartree-fock#prop-hf-equations]]. Their sum is $E_\mathrm{HF}$.
:::

::: proposition The MP2 energy {#prop-mp2}
The second-order Møller–Plesset correlation energy is
$$
E^{(2)}_\mathrm{MP2} = \sum_{i<j}\sum_{a<b}\frac{\left\lvert\langle ij\|ab\rangle\right\rvert^{2}}{\varepsilon_i + \varepsilon_j - \varepsilon_a - \varepsilon_b},
$$
where $\langle ij\|ab\rangle = \langle ij|ab\rangle - \langle ij|ba\rangle$ is the antisymmetrised two-electron integral over spin orbitals (physicists' notation, $\langle ij|ab\rangle = (ia|jb)$). For a closed-shell molecule with spatial orbitals,
$$
E^{(2)}_\mathrm{MP2} = \sum_{ij}^{\mathrm{occ}}\sum_{ab}^{\mathrm{virt}}\frac{(ia|jb)\left[2(ia|jb) - (ib|ja)\right]}{\varepsilon_i + \varepsilon_j - \varepsilon_a - \varepsilon_b} .
$$
Every term is negative, so $E^{(2)} < 0$.
:::

::: proof
Second-order Rayleigh–Schrödinger theory gives $E^{(2)} = \sum_{I \neq 0}\lvert\langle\Phi_I|\hat V|\Phi_0\rangle\rvert^{2}/(E_0^{(0)} - E_I^{(0)})$. Because $\hat H^{(0)}$ is diagonal in determinants, $\langle\Phi_I|\hat V|\Phi_0\rangle = \langle\Phi_I|\hat H|\Phi_0\rangle$ for $I \neq 0$. Singles give zero by Brillouin's theorem; triples and higher give zero by the Slater–Condon rules. For a double $\Phi_{ij}^{ab}$ the matrix element is $\langle ab\|ij\rangle$ and the denominator is $E_0^{(0)} - E_{ij}^{ab(0)} = \varepsilon_i + \varepsilon_j - \varepsilon_a - \varepsilon_b$. Summing the spin cases for a closed shell gives the spatial-orbital form. Each denominator is negative (occupied orbital energies lie below virtual ones) and each numerator non-negative.
:::

::: example MP2 for minimal-basis $\mathrm{H_2}$ {#ex-h2-mp2}
With $\varepsilon_g = -0.5782\ \mathrm{E_h}$, $\varepsilon_u = +0.6703\ \mathrm{E_h}$ and $(gu|gu) = K_{gu} = 0.1813\ \mathrm{E_h}$, evaluate $E^{(2)}$ and compare with the FCI correlation energy.
::: solution
With one occupied and one virtual spatial orbital, the closed-shell formula has the single term $i = j = g$, $a = b = u$:
$$
E^{(2)} = \frac{K_{gu}\left(2K_{gu} - K_{gu}\right)}{2\varepsilon_g - 2\varepsilon_u} = \frac{K_{gu}^{2}}{2(\varepsilon_g - \varepsilon_u)} = \frac{(0.18126)^{2}}{2(-1.24847)} = -0.01316\ \mathrm{E_h}.
$$
MP2 recovers $64\ \%$ of the FCI correlation energy in this basis ($-0.02056\ \mathrm{E_h}$). It underestimates because its denominator $2(\varepsilon_u - \varepsilon_g) = 2.497\ \mathrm{E_h}$ is the difference of *orbital* energies, larger than the true excitation energy $2\Delta = 1.577\ \mathrm{E_h}$ of [[#ex-h2-fci]]; in larger basis sets MP2 typically recovers $90$–$95\ \%$ of the dynamic correlation energy, often with some overshoot.
:::
:::

MP2 is the cheapest correlated method: after the $K^{5}$ transformation of integrals to the molecular-orbital basis, the sum costs about $o^{2}v^{2}$ operations for $o$ occupied and $v$ virtual orbitals. With density fitting (the "RI" approximation), MP2 is routine for molecules of a hundred atoms. It is size-extensive, captures dispersion (though it often overestimates it for $\pi$-stacked systems), and gives good geometries. Higher orders (MP3, MP4) are more expensive and the series is not guaranteed to converge; for many molecules it oscillates or diverges, so going to higher MP orders is not a systematic route to accuracy. Spin-component-scaled MP2 (SCS-MP2), which scales the opposite-spin and same-spin parts by empirical factors ($1.2$ and $1/3$), improves reaction energies at no extra cost.

::: warning Perturbation theory is not variational, and it fails at near-degeneracy {#warn-mp2}
MP2 energies are *not* upper bounds: nothing stops $E_\mathrm{HF} + E^{(2)}$ from falling below the exact energy. When the gap between occupied and virtual orbitals closes, as it does when a bond is stretched, the denominators in [[#prop-mp2]] shrink and the correction blows up. For STO-3G $\mathrm{H_2}$ at $R = 10\ a_0$, RHF gives $-0.5960\ \mathrm{E_h}$ and $E^{(2)} = -0.5682\ \mathrm{E_h}$, so MP2 predicts $-1.1642\ \mathrm{E_h}$ — far *below* the exact $-0.9332\ \mathrm{E_h}$ for two separated hydrogen atoms. Always check whether the reference is adequate before trusting perturbation theory; diagnostics such as the weight of the reference in a CCSD or CASSCF wavefunction, or a small HOMO–LUMO gap, are warning signs.
:::

## Coupled-cluster theory

Coupled-cluster (CC) theory solves the size-consistency problem of CI by writing the wavefunction as an *exponential*.

::: definition Coupled-cluster wavefunction {#def-cc}
The **coupled-cluster** wavefunction is
$$
\Psi_\mathrm{CC} = e^{\hat T}\Phi_0, \qquad \hat T = \hat T_1 + \hat T_2 + \hat T_3 + \cdots,
$$
where $\hat T_1\Phi_0 = \sum_{ia}t_i^{a}\Phi_i^{a}$ and $\hat T_2\Phi_0 = \sum_{i<j,\,a<b}t_{ij}^{ab}\Phi_{ij}^{ab}$ generate single and double excitations with **amplitudes** $t$. Truncating $\hat T = \hat T_1 + \hat T_2$ gives **CCSD**. The amplitudes are found not variationally but by projecting the Schrödinger equation $e^{-\hat T}\hat He^{\hat T}\Phi_0 = E\Phi_0$ onto the excited determinants, and the energy is $E_\mathrm{CC} = \langle\Phi_0|e^{-\hat T}\hat He^{\hat T}|\Phi_0\rangle$.
:::

Expanding the exponential, $e^{\hat T_2} = 1 + \hat T_2 + \tfrac{1}{2}\hat T_2^{2} + \cdots$, shows that even CCD contains quadruple, hextuple and higher excitations — but only as *products* of doubles, with no new parameters. These "disconnected" products are exactly what the independent pairs of [[#ex-cid-size]] need. For two non-interacting systems $\hat T = \hat T_\mathrm{A} + \hat T_\mathrm{B}$ and $e^{\hat T} = e^{\hat T_\mathrm{A}}e^{\hat T_\mathrm{B}}$, so the wavefunction factorises and the energy is additive: coupled-cluster theory is size-extensive at every truncation level. Because the projected equations are not variational, CC energies are not strict upper bounds, but in practice they are rarely far below FCI when the reference is good.

For two-electron systems, CCSD is identical to FCI (no excitation beyond doubles exists), so CCSD for minimal-basis $\mathrm{H_2}$ reproduces [[#ex-h2-fci]] exactly.

CCSD recovers most of the dynamic correlation but leaves out triple excitations, which contribute several $\mathrm{kJ\,mol^{-1}}$ to reaction energies. Full CCSDT costs $o^{3}v^{5}$ per iteration and is rarely affordable. The **CCSD(T)** method (Raghavachari, Trucks, Pople and Head-Gordon, 1989) adds a non-iterative estimate of the triples from perturbation theory, using the converged CCSD amplitudes, at a one-off cost scaling as $o^{3}v^{4}$. With large basis sets and CBS extrapolation ([[computational-chemistry/basis-sets#prop-cbs]]) it typically reproduces experimental atomisation energies, reaction energies and barrier heights of small, single-reference molecules to about $4\ \mathrm{kJ\,mol^{-1}}$ ("chemical accuracy"), which has earned it the label "gold standard" of quantum chemistry.

| method | formal scaling | variational? | size-extensive? | typical use |
|---|---|---|---|---|
| HF | $K^{4}$ | yes | yes | reference |
| MP2 | $K^{5}$ | no | yes | geometries, dispersion, large molecules |
| CISD | $K^{6}$ | yes | no | rarely, small systems |
| CCSD | $K^{6}$ | no | yes | dynamic correlation |
| CCSD(T) | $K^{7}$ | no | yes | benchmark energies |
| FCI | exponential | yes | yes | tiny benchmarks |

::: example What does $K^{7}$ scaling mean? {#ex-scaling}
A CCSD(T) single-point energy on a molecule takes $10$ hours. Estimate the time for a molecule twice as large with the same type of basis set, and the size of molecule that could be treated in the same $10$ hours with a computer $100$ times faster.
::: solution
Doubling the size doubles $K$, so the time grows by $2^{7} = 128$: about $1280$ hours, or $53$ days. With a computer $100$ times faster, the affordable size grows by $100^{1/7} = 1.93$ — less than a factor of two. This brutal scaling is why local correlation methods such as DLPNO-CCSD(T), which exploit the short range of dynamic correlation to reach near-linear scaling, have made coupled-cluster calculations on molecules of hundreds of atoms possible, at the price of thresholds that must be controlled.
:::
:::

::: widget plot
f: n*log10(x/10); 5*log10(x/10); 4*log10(x/10)
x: 10, 200
y: -1, 10
sliders: n=7:3:8:1
labels: \log_{10}(t/t_0)\ \text{for } K^n; K^5\ (\mathrm{MP2}); K^4\ (\mathrm{HF})
caption: The growth of computational cost, $\log_{10}(t/t_0)$ against the number of basis functions $K$, relative to a calculation with $K = 10$. Each unit on the vertical axis is a factor of ten in time. With $n = 7$ (CCSD(T)) going from $K = 10$ to $K = 200$ costs a factor of $10^{9}$; with $n = 4$ (Hartree–Fock) only $1.6\times10^{5}$. Change $n$ to compare CCSD ($6$) and CCSDT ($8$).
:::

::: quiz
For which of these problems is single-reference CCSD(T) most likely to be unreliable?
- [ ] The atomisation energy of methane.
- [ ] The barrier for $\mathrm{H + H_2} \rightarrow \mathrm{H_2 + H}$ near the transition state.
- [x] The potential energy curve of $\mathrm{N_2}$ at three times its equilibrium bond length.
- [ ] The binding energy of the water dimer.
::: solution
At large separation the six electrons of the $\mathrm{N_2}$ triple bond become nearly degenerate (static correlation), the RHF reference is qualitatively wrong, and the perturbative triples correction can even make the curve turn over unphysically. Methane, the water dimer and the near-symmetric $\mathrm{H_3}$ transition state are well described by a single determinant (the $\mathrm{H_3}$ barrier is a classic case CCSD(T) handles well).
:::
:::

## Static correlation and multireference methods

When several configurations are nearly degenerate, the wavefunction must contain them all from the start. The H$_2$ molecule shows this at dissociation: as $R \to \infty$, $\sigma_g$ and $\sigma_u$ become degenerate, and the exact wavefunction tends to
$$
\Psi \to \frac{1}{\sqrt{2}}\left(\lvert\sigma_g\bar\sigma_g\rvert - \lvert\sigma_u\bar\sigma_u\rvert\right),
$$
an equal mixture of two determinants, which cancels the ionic terms of the RHF determinant ([[computational-chemistry/hartree-fock]]) and leaves the covalent Heitler–London function. No single determinant, and no perturbation series built on one, can reach this.

The standard tool is the **complete active space self-consistent field** (CASSCF) method: choose an *active space* of $n$ electrons in $m$ orbitals — CAS($n$,$m$) — that contains the nearly degenerate orbitals (for a bond, its bonding and antibonding orbitals), perform full CI within it, and optimise the orbitals simultaneously. CASSCF captures static correlation and dissociates bonds correctly. It does not capture dynamic correlation, which is added afterwards by multireference perturbation theory (CASPT2, NEVPT2) or multireference CI. The choice of active space is the art of the method: it must include all strongly correlated orbitals but cannot exceed about $18$ electrons in $18$ orbitals for conventional FCI solvers, since the number of determinants grows combinatorially. Density-matrix renormalisation group (DMRG) and selected-CI methods extend the reach to larger active spaces.

::: example Static correlation in stretched $\mathrm{H_2}$ {#ex-stretched-h2}
In STO-3G $\mathrm{H_2}$ at $R = 6.0\ a_0$, RHF gives $-0.6451\ \mathrm{E_h}$, the $2 \times 2$ FCI gives $-0.9334\ \mathrm{E_h}$, and MP2 gives $E^{(2)} = -0.2530\ \mathrm{E_h}$. Compare the three, and explain why CASSCF(2,2) is exact here.
::: solution
The "correlation energy" in this basis is now $-0.9334 - (-0.6451) = -0.2883\ \mathrm{E_h}$, fourteen times its value at equilibrium; it is almost entirely static. MP2 gives $-0.6451 - 0.2530 = -0.8981\ \mathrm{E_h}$, still $35\ \mathrm{mE_h}$ ($92\ \mathrm{kJ\,mol^{-1}}$) too high, and at larger $R$ it overshoots and diverges ([[#warn-mp2]]). The FCI wavefunction at this distance is close to the $50{:}50$ mixture shown above. CAS(2,2) includes exactly the two orbitals $\sigma_g$, $\sigma_u$ and both electrons — which, in a minimal basis, is the whole problem — so it coincides with FCI. In a larger basis, CASSCF(2,2) would give the correct dissociation curve shape but miss the dynamic correlation, which CASPT2 would add.
:::
:::

## Choosing a method

A practical summary, for closed-shell molecules near equilibrium:

1. **Geometries and frequencies**: DFT with a dispersion correction ([[computational-chemistry/density-functional-theory]]) or MP2 with a triple-zeta basis.
2. **Reaction and conformational energies**: CCSD(T) single points at DFT geometries, with CBS extrapolation or F12 methods; DLPNO-CCSD(T) for larger systems.
3. **Weak interactions**: CCSD(T)/CBS as benchmark; dispersion-corrected DFT or SCS-MP2 for production.
4. **Bond breaking, diradicals, excited states with multiconfigurational character, many transition-metal problems**: CASSCF followed by CASPT2 or NEVPT2, or MRCI; check single-reference diagnostics first.

The hierarchy HF $\to$ MP2 $\to$ CCSD $\to$ CCSD(T) $\to$ CCSDT $\to \cdots \to$ FCI, combined with the basis-set hierarchy cc-pVDZ $\to$ cc-pVTZ $\to \cdots$, defines a two-dimensional map that converges systematically to the exact answer. This systematic improvability is the great virtue of wavefunction methods compared with density functional theory, whose functionals have no such ladder of guaranteed convergence.

## Where this leads

Density functional theory ([[computational-chemistry/density-functional-theory]]) takes a different route to correlation: rather than expanding the wavefunction, it models the exchange–correlation energy as a functional of the density, at the cost of a Hartree–Fock calculation. Double-hybrid functionals borrow the MP2 expression of [[#prop-mp2]] for part of their correlation energy. CCSD(T) energies are the reference data for fitting force fields ([[computational-chemistry/molecular-mechanics]]) and machine-learned potentials, and the accurate barriers they give feed transition-state theory ([[kinetics/transition-state-theory]]).

::: history
Egil Hylleraas showed in 1929 that including $r_{12}$ in the helium wavefunction recovers the energy that orbital products miss, and Eugene Wigner (1934) introduced the term correlation energy for the electron gas; Per-Olov Löwdin gave the modern definition in a 1959 review. Christian Møller and Milton Plesset published their perturbation partitioning in 1934, but it was little used until John Pople, Rodney Bartlett and co-workers made MP2 and MP4 practical in the 1970s. Configuration interaction was the dominant correlated method of the 1960s and 1970s. Coupled-cluster theory came from nuclear physics (Fritz Coester and Hermann Kümmel, 1958–60) and was brought into chemistry by Jiří Čížek in 1966 and developed by Josef Paldus; George Purvis and Rodney Bartlett implemented CCSD in 1982, and Krishnan Raghavachari, Gary Trucks, Pople and Martin Head-Gordon proposed CCSD(T) in 1989. Björn Roos and co-workers introduced CASSCF in 1980 and CASPT2 in 1990.
:::

::: summary
- The correlation energy $E_\mathrm{exact} - E_\mathrm{HF}$ is about $-0.04\ \mathrm{E_h}$ per electron pair; its changes control bond energies, barriers and dispersion.
- CI expands the wavefunction in excited determinants and is variational; full CI is exact in the basis but grows combinatorially. Doubles dominate because of Brillouin's theorem.
- Truncated CI is not size-consistent: CID for two separated $\mathrm{H_2}$ molecules misses $0.51\ \mathrm{mE_h}$ in STO-3G, and the recovered fraction tends to zero for large systems.
- Møller–Plesset theory uses $\hat H^{(0)} = \sum\hat f$; $E_\mathrm{MP2} = \sum\lvert\langle ij\|ab\rangle\rvert^{2}/(\varepsilon_i + \varepsilon_j - \varepsilon_a - \varepsilon_b)$ is cheap ($K^{5}$) and size-extensive but not variational, and diverges as gaps close.
- Coupled-cluster theory, $\Psi = e^{\hat T}\Phi_0$, is size-extensive at every truncation; CCSD(T) with large basis sets gives about $4\ \mathrm{kJ\,mol^{-1}}$ accuracy for single-reference molecules at $K^{7}$ cost.
- Static correlation (near-degeneracy, bond breaking) needs multireference methods such as CASSCF, with dynamic correlation added by CASPT2 or NEVPT2.
- Wavefunction methods form a systematically improvable hierarchy in both method and basis set.
:::

## Exercises

::: exercise Helium's correlation energy {level=1 check="-1.144"}
The exact non-relativistic energy of helium is $-2.90372\ \mathrm{E_h}$ and its Hartree–Fock limit is $-2.86168\ \mathrm{E_h}$. Give the correlation energy in electron volts. (Enter it in $\mathrm{eV}$ to four significant figures.)
::: solution
$E_\mathrm{corr} = -2.90372 + 2.86168 = -0.04204\ \mathrm{E_h} = -0.04204 \times 27.2114\ \mathrm{eV} = -1.144\ \mathrm{eV}$.
:::
:::

::: exercise An active space {level=1 check="400"}
How many determinants with $M_S = 0$ are there in a CAS(6,6) active space (six electrons in six spatial orbitals)? (Enter the number.)
::: solution
Three $\alpha$ electrons in six orbitals: $\binom{6}{3} = 20$ ways; likewise for $\beta$. Total $20^{2} = 400$. A CAS(14,14) has $\binom{14}{7}^{2} = 3432^{2} \approx 1.18\times10^{7}$, and CAS(18,18) about $2.4\times10^{9}$ — the practical limit of conventional solvers.
:::
:::

::: exercise Scaling {level=1 check="1280"}
An MP2 calculation takes $5$ minutes and a CCSD(T) calculation $10$ hours on the same molecule. Assuming formal scaling ($K^{5}$ and $K^{7}$), how many hours would the CCSD(T) calculation take for a molecule twice as large? (Enter the time in hours.)
::: solution
$10\ \mathrm{h} \times 2^{7} = 1280\ \mathrm{h}$. The MP2 calculation would take $5 \times 2^{5} = 160$ minutes. The gap between the methods widens by $2^{2} = 4$ with each doubling.
:::
:::

::: exercise A two-configuration problem {level=2 check="-0.0206"}
A closed-shell reference is coupled with matrix element $K = 0.1813\ \mathrm{E_h}$ to one doubly excited determinant lying $2\Delta = 1.5773\ \mathrm{E_h}$ higher. Compute the correlation energy from the $2 \times 2$ secular problem. (Enter it in $\mathrm{E_h}$ to three significant figures.)
::: solution
$E_\mathrm{corr} = \Delta - \sqrt{\Delta^{2} + K^{2}} = 0.78865 - \sqrt{0.62197 + 0.03287} = 0.78865 - 0.80922 = -0.0206\ \mathrm{E_h}$ ([[#ex-h2-fci]]).
:::
:::

::: exercise MP2 from orbital energies {level=2 check="-0.0132"}
For minimal-basis $\mathrm{H_2}$, $\varepsilon_g = -0.5782$, $\varepsilon_u = 0.6703$ and $K_{gu} = 0.1813\ \mathrm{E_h}$. Evaluate $E^{(2)} = K_{gu}^{2}/2(\varepsilon_g - \varepsilon_u)$. (Enter it in $\mathrm{E_h}$ to three significant figures.)
::: solution
$E^{(2)} = 0.03287/(2 \times -1.2485) = -0.0132\ \mathrm{E_h}$, about $64\ \%$ of the FCI value in this basis.
:::
:::

::: exercise The size-consistency error {level=2 check="1.34"}
Using [[#ex-cid-size]], express the CID size-consistency error for two separated STO-3G $\mathrm{H_2}$ molecules, $E_\mathrm{CID}(\text{pair}) - 2E_\mathrm{FCI}(\mathrm{H_2})$ with $E_\mathrm{CID} = -0.040614$ and $2E_\mathrm{FCI} = -0.041123\ \mathrm{E_h}$ (correlation parts), in $\mathrm{kJ\,mol^{-1}}$. (Enter the error.)
::: solution
$-0.040614 + 0.041123 = 0.000510\ \mathrm{E_h} \times 2625.5\ \mathrm{kJ\,mol^{-1}} = 1.34\ \mathrm{kJ\,mol^{-1}}$. Positive: CID gives a pair that is *less* stable than two separate molecules, an unphysical "interaction" between molecules that are infinitely far apart.
:::
:::

::: exercise MP2 at dissociation {level=3 check="-1.164"}
For STO-3G $\mathrm{H_2}$ at $R = 10.0\ a_0$, the RHF energy is $-0.5960\ \mathrm{E_h}$, the orbital energies differ by $\varepsilon_u - \varepsilon_g = 0.1001\ \mathrm{E_h}$, and $K_{gu} = 0.3373\ \mathrm{E_h}$. Compute the MP2 total energy, compare it with the exact limit $-0.9332\ \mathrm{E_h}$, and explain the result. (Enter $E_\mathrm{MP2}$ in $\mathrm{E_h}$ to three decimal places.)
::: solution
$E^{(2)} = -(0.3373)^{2}/(2 \times 0.1001) = -0.1138/0.2002 = -0.5683\ \mathrm{E_h}$, so $E_\mathrm{MP2} = -0.5960 - 0.5683 = -1.164\ \mathrm{E_h}$, which is $0.231\ \mathrm{E_h}$ *below* the exact energy of two hydrogen atoms in this basis. As $R \to \infty$ the gap $\varepsilon_u - \varepsilon_g$ goes to zero while $K_{gu}$ tends to a constant, so $E^{(2)}$ diverges. The variational FCI result, $\Delta - \sqrt{\Delta^{2} + K^{2}}$, instead tends smoothly to $-K$ — the widget in this lesson shows both behaviours.
:::
:::

::: exercise The Davidson correction {level=3 check="-0.0244"}
A CISD calculation on a molecule gives a correlation energy of $-0.2500\ \mathrm{E_h}$ with a reference coefficient $c_0 = 0.950$. Estimate the quadruples correction with Davidson's formula, and explain why the correction grows with molecular size. (Enter $\Delta E_\mathrm{Q}$ in $\mathrm{E_h}$.)
::: solution
$\Delta E_\mathrm{Q} = (1 - c_0^{2})E_\mathrm{corr}^\mathrm{CISD} = (1 - 0.9025)(-0.2500) = -0.0244\ \mathrm{E_h}$ ($-64\ \mathrm{kJ\,mol^{-1}}$). For a larger molecule with more electron pairs the reference weight $c_0^{2}$ falls (in the limit of many independent pairs it tends to zero), so the correction grows, mirroring the growing size-consistency error of CISD. The formula can be motivated by the independent-pair model of [[#ex-cid-size]], where the missing disconnected quadruples have weight of order $(1 - c_0^{2})$, but it is an empirical estimate.
:::
:::

::: exercise Coupled cluster factorises {level=3}
For two non-interacting systems A and B, with $\hat H = \hat H_\mathrm{A} + \hat H_\mathrm{B}$ and reference $\Phi_0 = \Phi_\mathrm{A}\Phi_\mathrm{B}$, show that the CCD wavefunction $e^{\hat T_2}\Phi_0$ with $\hat T_2 = \hat T_\mathrm{A} + \hat T_\mathrm{B}$ factorises into $(e^{\hat T_\mathrm{A}}\Phi_\mathrm{A})(e^{\hat T_\mathrm{B}}\Phi_\mathrm{B})$ and that the energy is additive. Which term in $e^{\hat T_2}$ supplies the simultaneous double excitation missing from CID?
::: solution
$\hat T_\mathrm{A}$ and $\hat T_\mathrm{B}$ act on different sets of orbitals and commute, so $e^{\hat T_\mathrm{A} + \hat T_\mathrm{B}} = e^{\hat T_\mathrm{A}}e^{\hat T_\mathrm{B}}$ and the wavefunction is a product. Then $e^{-\hat T}\hat He^{\hat T} = e^{-\hat T_\mathrm{A}}\hat H_\mathrm{A}e^{\hat T_\mathrm{A}} + e^{-\hat T_\mathrm{B}}\hat H_\mathrm{B}e^{\hat T_\mathrm{B}}$, and both the amplitude equations and the energy expression separate, giving $E = E_\mathrm{A} + E_\mathrm{B}$ with each $E_\mathrm{X}$ the CCD energy of the isolated system. The simultaneous double excitation comes from the cross term $\hat T_\mathrm{A}\hat T_\mathrm{B}$ in $\tfrac{1}{2}\hat T_2^{2} = \tfrac{1}{2}(\hat T_\mathrm{A}^{2} + 2\hat T_\mathrm{A}\hat T_\mathrm{B} + \hat T_\mathrm{B}^{2})$: a disconnected quadruple excitation with amplitude $t_\mathrm{A}t_\mathrm{B}$, fixed by the doubles rather than being a new parameter.
:::
:::
