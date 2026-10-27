The wavefunction of a molecule with $N$ electrons depends on $3N$ spatial coordinates (plus spins): for benzene, $126$ of them. Yet the Hamiltonian contains only one- and two-body operators, and every quantity of chemical interest — energy, geometry, dipole moment — can be obtained from much less information than the full wavefunction. **Density functional theory** (DFT) takes this to its logical extreme. It proves that the ground-state energy is a *functional of the electron density* $\rho(\mathbf{r})$, a function of just three variables, whatever the number of electrons. The proof is exact; the catch is that the functional is unknown and must be approximated. Since the 1990s approximate functionals have become good enough, and their cost — essentially that of a Hartree–Fock calculation — low enough, that DFT is now the most widely used method in computational chemistry and materials science, from catalyst design to the band gaps of semiconductors. This lesson proves the Hohenberg–Kohn theorems, derives the Kohn–Sham equations that make DFT practical, builds the hierarchy of exchange–correlation approximations, and explains where they fail and why.

Atomic units are used throughout ([[computational-chemistry/hartree-fock]]).

## The density as basic variable

::: definition Electron density {#def-density}
For an $N$-electron wavefunction $\Psi(\mathbf{x}_1, \dots, \mathbf{x}_N)$ the **electron density** is
$$
\rho(\mathbf{r}) = N\int\lvert\Psi(\mathbf{r}\omega_1, \mathbf{x}_2, \dots, \mathbf{x}_N)\rvert^{2}\,\mathrm{d}\omega_1\,\mathrm{d}\mathbf{x}_2\cdots\mathrm{d}\mathbf{x}_N ,
$$
the probability density of finding *any* electron at $\mathbf{r}$, normalised so that $\int\rho\,\mathrm{d}\mathbf{r} = N$. It is an observable (measured by X-ray diffraction), non-negative, decays exponentially at large distance as $e^{-2\sqrt{2I}\,r}$ with $I$ the first ionisation energy, and has cusps at the nuclei satisfying $\partial\bar\rho/\partial r = -2Z_A\bar\rho$ (where $\bar\rho$ is the spherical average about nucleus $A$).
:::

The density already contains the information that fixes the Hamiltonian, at least for molecules: the cusps locate the nuclei and their slopes give the nuclear charges, while the integral gives $N$. Since $\hat H$ is determined by the nuclear positions, charges and $N$, the density determines $\hat H$, and with it everything else. Hohenberg and Kohn turned this observation into a theorem valid for any external potential.

Write the electronic Hamiltonian as $\hat H = \hat T + \hat V_\mathrm{ee} + \sum_i v(\mathbf{r}_i)$, where $\hat T$ and $\hat V_\mathrm{ee}$ are the same for every $N$-electron system and the **external potential** $v(\mathbf{r})$ (for a molecule, $-\sum_A Z_A/\lvert\mathbf{r} - \mathbf{R}_A\rvert$) carries all the specifics. The energy contributed by $v$ is $\int v\rho\,\mathrm{d}\mathbf{r}$, a simple functional of the density.

## The Hohenberg–Kohn theorems

::: theorem First Hohenberg–Kohn theorem {#thm-hk1}
For a system of interacting electrons with a non-degenerate ground state, the external potential $v(\mathbf{r})$ is determined, up to an additive constant, by the ground-state density $\rho_0(\mathbf{r})$. Consequently the Hamiltonian, the ground-state wavefunction and every ground-state property are functionals of $\rho_0$.
:::

::: proof
Suppose two potentials $v$ and $v'$, differing by more than a constant, gave the same ground-state density $\rho_0$. Their Hamiltonians $\hat H$ and $\hat H'$ have ground states $\Psi$ and $\Psi'$, which are different (if $\Psi = \Psi'$, subtracting the two Schrödinger equations would give $\sum_i[v(\mathbf{r}_i) - v'(\mathbf{r}_i)]\Psi = (E - E')\Psi$, forcing $v - v'$ to be constant). By the variation principle, using $\Psi'$ as a trial function for $\hat H$,
$$
E_0 < \langle\Psi'|\hat H|\Psi'\rangle = \langle\Psi'|\hat H'|\Psi'\rangle + \langle\Psi'|\hat H - \hat H'|\Psi'\rangle = E_0' + \int\left[v(\mathbf{r}) - v'(\mathbf{r})\right]\rho_0(\mathbf{r})\,\mathrm{d}\mathbf{r},
$$
the strict inequality holding because $\Psi'$ is not the non-degenerate ground state of $\hat H$. Exchanging the roles of the primed and unprimed systems gives
$$
E_0' < E_0 + \int\left[v'(\mathbf{r}) - v(\mathbf{r})\right]\rho_0(\mathbf{r})\,\mathrm{d}\mathbf{r}.
$$
Adding the two inequalities gives $E_0 + E_0' < E_0' + E_0$, a contradiction. So no two potentials differing by more than a constant share a ground-state density.
:::

The theorem says that the map from potential to density is invertible. It is an existence statement: it does not say *how* to obtain $v$ or $\Psi$ from $\rho$. Its practical consequence is that the energy can be written as
$$
E_v[\rho] = F[\rho] + \int v(\mathbf{r})\rho(\mathbf{r})\,\mathrm{d}\mathbf{r}, \qquad F[\rho] = \langle\Psi[\rho]|\hat T + \hat V_\mathrm{ee}|\Psi[\rho]\rangle ,
$$ {#eq-hk-functional}
where the **universal functional** $F[\rho]$ is the same for all systems — atoms, molecules, solids — because $\hat T$ and $\hat V_\mathrm{ee}$ are.

::: theorem Second Hohenberg–Kohn theorem (variation principle for the density) {#thm-hk2}
For any trial density $\tilde\rho$ that is non-negative, integrates to $N$ and is the ground-state density of some external potential,
$$
E_v[\tilde\rho] \geq E_v[\rho_0] = E_0 ,
$$
with equality only for the true ground-state density $\rho_0$ of $v$.
:::

::: proof
By the first theorem $\tilde\rho$ determines a potential $\tilde v$ and a ground-state wavefunction $\tilde\Psi$. Using $\tilde\Psi$ as a trial function for the Hamiltonian with potential $v$,
$$
\langle\tilde\Psi|\hat H|\tilde\Psi\rangle = F[\tilde\rho] + \int v\tilde\rho\,\mathrm{d}\mathbf{r} = E_v[\tilde\rho] \geq E_0
$$
by the ordinary variation principle, with equality only if $\tilde\Psi$ is the ground state of $\hat H$, i.e. $\tilde\rho = \rho_0$.
:::

The requirement that $\tilde\rho$ come from some potential ("$v$-representability") is awkward, because it is not known which densities qualify. Levy's **constrained search** (1979) removes it: define $F[\rho] = \min_{\Psi\to\rho}\langle\Psi|\hat T + \hat V_\mathrm{ee}|\Psi\rangle$, the minimum over all antisymmetric wavefunctions that yield $\rho$. This is defined for any reasonable density, handles degenerate ground states, and makes the minimisation $E_0 = \min_\rho\{F[\rho] + \int v\rho\}$ a two-step version of the ordinary variation principle.

### Orbital-free functionals and why they fail

If $F[\rho]$ were known explicitly, the ground state of any molecule would follow by minimising a functional of one three-dimensional function. The oldest attempt is the **Thomas–Fermi** model (1927), which takes the kinetic energy of the uniform electron gas locally,
$$
T_\mathrm{TF}[\rho] = C_\mathrm{F}\int\rho^{5/3}\,\mathrm{d}\mathbf{r}, \qquad C_\mathrm{F} = \tfrac{3}{10}(3\pi^{2})^{2/3} = 2.8712,
$$
and the classical Coulomb (Hartree) energy $J[\rho] = \tfrac{1}{2}\iint\rho(\mathbf{r})\rho(\mathbf{r}')/\lvert\mathbf{r} - \mathbf{r}'\rvert\,\mathrm{d}\mathbf{r}\,\mathrm{d}\mathbf{r}'$ for the repulsion.

::: example Thomas–Fermi kinetic energy of the hydrogen atom {#ex-tf-hydrogen}
Evaluate $T_\mathrm{TF}$ for the exact hydrogen density $\rho = e^{-2r}/\pi$ and compare with the exact kinetic energy $0.5\ \mathrm{E_h}$.
::: solution
$\int\rho^{5/3}\,\mathrm{d}\mathbf{r} = \pi^{-5/3}\,4\pi\int_0^{\infty}r^{2}e^{-10r/3}\,\mathrm{d}r = 4\pi^{-2/3}\cdot\frac{2}{(10/3)^{3}} = 0.2160\,\pi^{-2/3} = 0.10070$, so $T_\mathrm{TF} = 2.8712 \times 0.10070 = 0.289\ \mathrm{E_h}$, only $58\ \%$ of the exact value. (The spin-polarised form, appropriate for one electron, is larger by $2^{2/3}$: $0.459\ \mathrm{E_h}$, still $8\ \%$ too low.) For a one-electron system the exact kinetic energy is given by the von Weizsäcker functional $T_\mathrm{W} = \tfrac{1}{8}\int\lvert\nabla\rho\rvert^{2}/\rho\,\mathrm{d}\mathbf{r}$ ([[#exr-vw]]). Kinetic energy depends on the *shape* of the orbitals, especially on gradients and shell structure, which a local function of $\rho$ cannot capture; Teller proved in 1962 that Thomas–Fermi theory binds no molecule at all.
:::
:::

## The Kohn–Sham equations

Kohn and Sham's insight (1965) was to stop trying to write the kinetic energy as an explicit functional of the density, and to compute most of it exactly from orbitals instead.

Imagine a fictitious system of $N$ **non-interacting** electrons moving in an effective potential $v_\mathrm{s}(\mathbf{r})$ chosen so that their ground-state density equals the true density $\rho$. Its ground state is a single Slater determinant of orbitals $\phi_i$, with
$$
\rho(\mathbf{r}) = \sum_{i}^{N}\lvert\phi_i(\mathbf{r})\rvert^{2}, \qquad T_\mathrm{s}[\rho] = \sum_i\left\langle\phi_i\left|-\tfrac{1}{2}\nabla^{2}\right|\phi_i\right\rangle .
$$
$T_\mathrm{s}$ is not the true kinetic energy, but it is close (it contains all the shell structure that Thomas–Fermi misses), and it is computed exactly.

::: definition Exchange–correlation energy {#def-exc}
Write the universal functional as
$$
F[\rho] = T_\mathrm{s}[\rho] + J[\rho] + E_\mathrm{xc}[\rho],
$$
which *defines* the **exchange–correlation energy** $E_\mathrm{xc}[\rho] = (T - T_\mathrm{s}) + (V_\mathrm{ee} - J)$: the kinetic correlation energy plus all non-classical electron–electron interaction (exchange, Coulomb correlation, and the correction for self-interaction contained in $J$). Its functional derivative $v_\mathrm{xc}(\mathbf{r}) = \delta E_\mathrm{xc}/\delta\rho(\mathbf{r})$ is the **exchange–correlation potential**. It is usual to split $E_\mathrm{xc} = E_\mathrm{x} + E_\mathrm{c}$, with $E_\mathrm{x}$ defined as the Hartree–Fock-like exchange energy of the Kohn–Sham determinant.
:::

All the unknown physics is now in $E_\mathrm{xc}$, which is much smaller than $T$ or $V_\mathrm{ee}$ and more amenable to approximation.

::: proposition The Kohn–Sham equations {#prop-ks}
Minimising $E[\rho] = T_\mathrm{s}[\rho] + J[\rho] + E_\mathrm{xc}[\rho] + \int v\rho\,\mathrm{d}\mathbf{r}$ over orthonormal orbitals gives
$$
\left[-\tfrac{1}{2}\nabla^{2} + v_\mathrm{s}(\mathbf{r})\right]\phi_i = \varepsilon_i\phi_i, \qquad
v_\mathrm{s}(\mathbf{r}) = v(\mathbf{r}) + \int\frac{\rho(\mathbf{r}')}{\lvert\mathbf{r} - \mathbf{r}'\rvert}\,\mathrm{d}\mathbf{r}' + v_\mathrm{xc}(\mathbf{r}),
$$
with $\rho = \sum_i\lvert\phi_i\rvert^{2}$ over the $N$ lowest orbitals. The total energy is
$$
E = \sum_i\varepsilon_i - J[\rho] + E_\mathrm{xc}[\rho] - \int v_\mathrm{xc}\rho\,\mathrm{d}\mathbf{r}.
$$
If $E_\mathrm{xc}$ were exact, the Kohn–Sham density and energy would be exact.
:::

::: proof
Vary $\phi_k^{*}$ with Lagrange multipliers for orthonormality, as in [[computational-chemistry/hartree-fock#prop-hf-equations]]. The kinetic term gives $-\tfrac{1}{2}\nabla^{2}\phi_k$. Every other term depends on the orbitals only through $\rho$, and $\delta\rho(\mathbf{r})/\delta\phi_k^{*}(\mathbf{r}') = \phi_k(\mathbf{r})\delta(\mathbf{r} - \mathbf{r}')$, so by the chain rule each contributes its functional derivative times $\phi_k$: $\delta J/\delta\rho$ is the Hartree potential, $\delta E_\mathrm{xc}/\delta\rho = v_\mathrm{xc}$ and $\delta(\int v\rho)/\delta\rho = v$. Diagonalising the multipliers gives the canonical equations. For the energy, $\sum_i\varepsilon_i = T_\mathrm{s} + \int v_\mathrm{s}\rho = T_\mathrm{s} + \int v\rho + 2J + \int v_\mathrm{xc}\rho$; solving for $T_\mathrm{s}$ and substituting gives the stated formula.
:::

The Kohn–Sham equations have exactly the structure of the Hartree–Fock equations, with the non-local exchange operator replaced by the local potential $v_\mathrm{xc}$. In a basis they become $\mathbf{F}^\mathrm{KS}\mathbf{C} = \mathbf{SC}\boldsymbol\varepsilon$, solved by the SCF procedure of [[computational-chemistry/hartree-fock#alg-scf]]; the exchange–correlation matrix elements are evaluated by numerical quadrature on an atom-centred grid. The formal cost is the same as Hartree–Fock ($K^{3}$–$K^{4}$), but the result contains correlation. That combination is the whole reason for DFT's success.

What do the Kohn–Sham orbitals and eigenvalues mean? They are the orbitals of the fictitious non-interacting system, not physical objects; but they usually resemble Hartree–Fock orbitals and are used in the same way for qualitative bonding analysis. One eigenvalue has an exact meaning: for the exact functional, the highest occupied eigenvalue equals minus the first ionisation energy, $\varepsilon_\mathrm{HOMO} = -I$, because it governs the asymptotic decay of the density. Other eigenvalues have no rigorous interpretation, and approximate functionals violate even the HOMO condition badly, as the next example shows.

## The local density approximation

The first and simplest approximation to $E_\mathrm{xc}$ borrows from the one system where it is known accurately: the **uniform electron gas**, with constant density $\rho$ and a uniform positive background. Its exchange energy per electron is known exactly (Dirac, 1930), and its correlation energy per electron was computed by quantum Monte Carlo (Ceperley and Alder, 1980) and fitted to analytic forms (Vosko, Wilk and Nusair, 1980; Perdew and Wang, 1992).

::: definition Local density approximation {#def-lda}
In the **local density approximation** (LDA) each volume element contributes the exchange–correlation energy of a uniform gas of the local density:
$$
E_\mathrm{xc}^\mathrm{LDA}[\rho] = \int\rho(\mathbf{r})\,\epsilon_\mathrm{xc}^\mathrm{unif}\!\left(\rho(\mathbf{r})\right)\mathrm{d}\mathbf{r}, \qquad
E_\mathrm{x}^\mathrm{LDA} = -C_\mathrm{x}\int\rho^{4/3}\,\mathrm{d}\mathbf{r}, \quad C_\mathrm{x} = \tfrac{3}{4}\left(\tfrac{3}{\pi}\right)^{1/3} = 0.7386 .
$$
For spin-polarised systems (the **local spin-density approximation**, LSDA) exchange is evaluated separately for each spin: $E_\mathrm{x}^\mathrm{LSDA} = -2^{1/3}C_\mathrm{x}\int(\rho_\alpha^{4/3} + \rho_\beta^{4/3})\,\mathrm{d}\mathbf{r}$.
:::

The power $4/3$ in the exchange term is not arbitrary; it is forced by a scaling law that the exact exchange energy obeys.

::: proposition Uniform scaling of the exchange energy {#prop-scaling}
For the scaled density $\rho_\lambda(\mathbf{r}) = \lambda^{3}\rho(\lambda\mathbf{r})$ (which keeps $N$ fixed and compresses the system by $\lambda$), the exact exchange energy satisfies $E_\mathrm{x}[\rho_\lambda] = \lambda E_\mathrm{x}[\rho]$. The only local functional of the form $\int f(\rho)\,\mathrm{d}\mathbf{r}$ with this property is $f(\rho) \propto \rho^{4/3}$.
:::

::: proof
Scaling all coordinates of a Slater determinant by $\lambda$ multiplies the orbitals by $\lambda^{3/2}$ (to preserve normalisation) and $1/r_{12}$ by $\lambda$; the exchange integrals $K_{ij}$ therefore scale as $\lambda$, and so does $E_\mathrm{x}$. For a local functional, $\int f(\lambda^{3}\rho(\lambda\mathbf{r}))\,\mathrm{d}\mathbf{r} = \lambda^{-3}\int f(\lambda^{3}\rho(\mathbf{u}))\,\mathrm{d}\mathbf{u}$. Requiring this to equal $\lambda\int f(\rho)\,\mathrm{d}\mathbf{u}$ for every density requires $f(\lambda^{3}\rho) = \lambda^{4}f(\rho)$, i.e. $f$ homogeneous of degree $4/3$ in $\rho$: $f = c\rho^{4/3}$. The constant $c = -C_\mathrm{x}$ comes from the uniform gas. The same argument gives $\rho^{5/3}$ for the kinetic energy, which scales as $\lambda^{2}$.
:::

::: example LDA exchange for the hydrogen atom {#ex-lda-h}
For the exact hydrogen density $\rho = e^{-2r}/\pi$, compute the LSDA exchange energy and compare it with the exact exchange energy, which for a one-electron system must cancel the Hartree self-repulsion $J = 5/16\ \mathrm{E_h}$.
::: solution
$\int\rho^{4/3}\,\mathrm{d}\mathbf{r} = \pi^{-4/3}\,4\pi\int_0^{\infty}r^{2}e^{-8r/3}\,\mathrm{d}r = 4\pi^{-1/3}\cdot\frac{2}{(8/3)^{3}} = 0.42188\,\pi^{-1/3} = 0.28805$. With the electron fully spin-polarised ($\rho_\alpha = \rho$, $\rho_\beta = 0$),
$$
E_\mathrm{x}^\mathrm{LSDA} = -2^{1/3} \times 0.73856 \times 0.28805 = -0.2680\ \mathrm{E_h}.
$$
The exact exchange is $-J = -0.3125\ \mathrm{E_h}$, so LSDA underestimates its magnitude by $14\ \%$. Worse, the LSDA correlation energy of this density is not zero but $-0.0222\ \mathrm{E_h}$ (Perdew–Wang parameterisation), whereas a single electron has no correlation. The net **self-interaction error** is $J + E_\mathrm{x} + E_\mathrm{c} = 0.3125 - 0.2680 - 0.0222 = +0.0223\ \mathrm{E_h}$: the electron partly repels itself. Self-consistent LSDA gives $E(\mathrm{H}) = -0.4787\ \mathrm{E_h}$ instead of $-0.5$.
:::
:::

::: example Kohn–Sham LDA for helium {#ex-lda-he}
A self-consistent Kohn–Sham calculation on a numerical radial grid (spin-unpolarised, Slater exchange plus Perdew–Wang correlation) gives for helium: $E = -2.8345\ \mathrm{E_h}$, $T_\mathrm{s} = 2.7674$, $J = 1.9959$, $E_\mathrm{x} = -0.8617$, $E_\mathrm{c} = -0.1111\ \mathrm{E_h}$, and $\varepsilon_{1s} = -0.5703\ \mathrm{E_h}$. With exchange only, $E = -2.7236\ \mathrm{E_h}$. Compare with Hartree–Fock ($-2.8617$), the exact energy ($-2.9037$), the exact exchange energy of the HF density ($-1.0257\ \mathrm{E_h}$), and the ionisation energy ($24.59\ \mathrm{eV}$).
::: solution
- The LDA total energy is $0.069\ \mathrm{E_h}$ above the exact value, but it is the result of large cancelling errors: LDA exchange is too small in magnitude by $0.164\ \mathrm{E_h}$ (compare $-0.862$ with $-1.026$), while LDA correlation, $-0.111\ \mathrm{E_h}$, is more than *twice* helium's true correlation energy ($-0.042\ \mathrm{E_h}$). The errors in exchange and correlation partly cancel — a systematic feature of LDA, which works because the *exchange–correlation hole* it models satisfies the exact sum rule even though its separate parts do not.
- Exchange-only LDA ($-2.724$) is far worse than Hartree–Fock ($-2.862$), which has exact exchange.
- The HOMO eigenvalue gives $-\varepsilon_{1s} = 0.5703\ \mathrm{E_h} = 15.5\ \mathrm{eV}$, against the exact $I = 24.59\ \mathrm{eV}$: a $37\ \%$ error. The LDA potential decays exponentially instead of as $-1/r$ (self-interaction again), so the outermost electron is too weakly bound. LDA *total-energy differences* ($\Delta$SCF: $E(\mathrm{He^{+}}) - E(\mathrm{He})$) give a much better ionisation energy than the eigenvalue.
:::
:::

LDA is remarkably good for solids and gives reasonable geometries, but it **overbinds** molecules by typically $100$–$150\ \mathrm{kJ\,mol^{-1}}$ in atomisation energies, far too much for chemistry. Real molecular densities are far from uniform, and the remedy is to let the functional depend on how fast the density changes.

## Jacob's ladder: GGA, meta-GGA, hybrids

Perdew's metaphor of **Jacob's ladder** arranges functionals in rungs by the ingredients they use, each rung adding information and (one hopes) accuracy:

| rung | ingredients | examples |
|---|---|---|
| 1. LDA | $\rho$ | SVWN, PW92 |
| 2. GGA | $\rho$, $\nabla\rho$ | BLYP, PBE, BP86 |
| 3. meta-GGA | $\rho$, $\nabla\rho$, $\tau = \tfrac{1}{2}\sum_i\lvert\nabla\phi_i\rvert^{2}$ | TPSS, SCAN, r²SCAN, M06-L |
| 4. hybrid | + exact (HF-like) exchange | B3LYP, PBE0, M06-2X, ωB97X |
| 5. double hybrid | + virtual orbitals (MP2-like correlation) | B2PLYP, DSD-PBEP86 |

**Generalised gradient approximations** (GGAs) write the exchange energy as LDA exchange multiplied by an **enhancement factor** depending on the dimensionless reduced gradient $s = \lvert\nabla\rho\rvert/[2(3\pi^{2})^{1/3}\rho^{4/3}]$:
$$
E_\mathrm{x}^\mathrm{GGA} = -C_\mathrm{x}\int\rho^{4/3}F_\mathrm{x}(s)\,\mathrm{d}\mathbf{r}.
$$
In PBE (Perdew, Burke and Ernzerhof, 1996), $F_\mathrm{x}(s) = 1 + \kappa - \kappa/(1 + \mu s^{2}/\kappa)$, with $\mu = 0.2195$ fixed by the gradient expansion of the correlation energy and $\kappa = 0.804$ by the Lieb–Oxford bound on the exchange energy. Becke's B88 exchange instead contains one parameter fitted to the exchange energies of rare-gas atoms. GGAs reduce LDA's overbinding by an order of magnitude, to errors of about $20$–$40\ \mathrm{kJ\,mol^{-1}}$ in atomisation energies.

::: widget plot
f: 1 + k - k/(1 + 0.2195*x^2/k); 1
x: 0, 4
y: 0.9, 2.0
sliders: k=0.804:0.2:1.5:0.004
labels: F_x^{\mathrm{PBE}}(s); \text{LDA}
hlines: 1.804
caption: The PBE exchange enhancement factor $F_\mathrm{x}(s)$ against the reduced gradient $s$. At $s = 0$ (uniform gas) it equals $1$ and PBE reduces to LDA; in regions where the density changes rapidly — the outer parts of atoms and the bonding regions, typically $s \approx 1$–$3$ — exchange is enhanced (by $17\ \%$ at $s = 1$), which lowers the energy of atoms more than that of molecules and so cures most of LDA's overbinding. The ceiling $1 + \kappa$ enforces the Lieb–Oxford bound; increasing $\kappa$ (revPBE uses $1.245$) changes the large-$s$ behaviour.
:::

**Hybrid functionals** mix in a fraction of exact exchange computed from the Kohn–Sham orbitals as in Hartree–Fock. Becke's argument (1993) came from the adiabatic connection: at zero electron–electron interaction the exact exchange–correlation energy *is* the exact exchange, so some exact exchange belongs in the functional. The most widely used functional in chemistry is B3LYP,
$$
E_\mathrm{xc}^\mathrm{B3LYP} = (1 - a_0)E_\mathrm{x}^\mathrm{LSDA} + a_0E_\mathrm{x}^\mathrm{HF} + a_\mathrm{x}\Delta E_\mathrm{x}^\mathrm{B88} + (1 - a_\mathrm{c})E_\mathrm{c}^\mathrm{VWN} + a_\mathrm{c}E_\mathrm{c}^\mathrm{LYP},
$$
with $a_0 = 0.20$, $a_\mathrm{x} = 0.72$, $a_\mathrm{c} = 0.81$, three empirical parameters fitted to thermochemical data. PBE0 instead uses $25\ \%$ exact exchange with PBE and no fitted parameters. **Range-separated hybrids** (CAM-B3LYP, ωB97X) use exact exchange mainly at long range, which corrects the asymptotic potential and greatly improves charge-transfer excitations and HOMO energies. Hybrids typically reach $10$–$20\ \mathrm{kJ\,mol^{-1}}$ for atomisation energies and are the default for molecular thermochemistry; the exact-exchange term makes them more expensive than GGAs, especially with plane-wave basis sets.

::: quiz
Which property of a functional is guaranteed to improve as one climbs Jacob's ladder?
- [ ] The total energy becomes an upper bound to the exact energy.
- [ ] Every chemical property becomes more accurate.
- [x] None is guaranteed: higher rungs have more ingredients and usually perform better on average, but there is no systematic convergence to the exact functional.
- [ ] The cost decreases.
::: solution
Unlike the wavefunction hierarchy of [[computational-chemistry/electron-correlation]], DFT approximations are not variational with respect to the exact energy (an approximate functional can give energies below the exact one) and do not form a convergent sequence. Higher rungs satisfy more exact constraints and fit more data, but particular properties can get worse. Benchmarking against reliable reference data is essential.
:::
:::

## Self-interaction and delocalisation error

The self-interaction error of [[#ex-lda-h]] is not merely an atomic curiosity. Consider a system with a *fractional* number of electrons, $N_0 + \delta$ with $0 < \delta < 1$, understood as an ensemble. Perdew, Parr, Levy and Balduz showed in 1982 that the exact energy is a straight line between the integers,
$$
E(N_0 + \delta) = (1 - \delta)E(N_0) + \delta E(N_0 + 1),
$$
with a derivative discontinuity at each integer. Approximate semilocal functionals give instead a *convex* curve lying below the straight line: they favour fractional charges, spreading electrons too thinly. This **delocalisation error** causes characteristic failures: dissociation of $\mathrm{H_2^{+}}$ into two half-protons with $\tfrac{1}{2}$ electron each at too low an energy; barriers that are too low (transition states, with stretched, delocalised bonds, are over-stabilised); charge-transfer complexes with too much charge transferred; and band gaps of semiconductors that are far too small.

::: widget plot
f: -2 - 0.9037*(x - 1); -2 - 0.9037*(x - 1) - c*(x - 1)*(2 - x)/2
x: 1, 2
y: -3.0, -1.8
sliders: c=0.6:0:1.2:0.01
labels: \text{exact (linear)}; \text{approximate functional (convex)}
caption: Energy against electron number between $\mathrm{He^{+}}$ ($N = 1$, $-2.0\ \mathrm{E_h}$) and $\mathrm{He}$ ($N = 2$, $-2.9037\ \mathrm{E_h}$). The exact curve is a straight line whose slope is $-I$. A semilocal functional (schematically, with curvature `c`) gives a convex curve whose endpoint slope $\mathrm{d}E/\mathrm{d}N = \varepsilon_\mathrm{HOMO}$ at $N = 2$ is too shallow by $c/2$ — the reason the LDA HOMO of helium underestimates the ionisation energy in [[#ex-lda-he]]. Hartree–Fock errs in the opposite direction (concave), which is why hybrids, mixing the two, can be nearly straight.
:::

::: warning Kohn–Sham eigenvalues are not excitation energies {#warn-gap}
The HOMO–LUMO gap of a semilocal Kohn–Sham calculation is *not* an estimate of the fundamental gap $I - A$, nor of the optical gap. Even with the exact functional, the Kohn–Sham gap differs from $I - A$ by the derivative discontinuity of $E_\mathrm{xc}$, which semilocal functionals lack. For silicon, LDA gives a Kohn–Sham gap of about $0.5\ \mathrm{eV}$ against the measured $1.17\ \mathrm{eV}$; for many oxides the error is larger still. Use $\Delta$SCF energy differences, range-separated or other hybrid functionals, many-body ($GW$) methods, or time-dependent DFT for excitation energies, and treat orbital-energy gaps only as qualitative indicators.
:::

## Dispersion

London dispersion arises from correlated fluctuations of electrons on distant fragments; it falls off as $-C_6/R^{6}$ and is a non-local correlation effect. Semilocal functionals, which see only the density at each point and its immediate neighbourhood, cannot produce it: at separations where the densities of two argon atoms do not overlap, LDA and GGA interaction energies simply vanish, and many GGAs are even repulsive at van der Waals distances. Since dispersion controls the structures of molecular crystals, the folding of biomolecules, the binding of drugs and the adsorption of molecules on surfaces, this omission is serious. The pragmatic remedy (Grimme's D2, D3, D4 corrections) adds an atom–atom pairwise term,
$$
E_\mathrm{disp} = -\sum_{A<B}\sum_{n=6,8}s_n\frac{C_n^{AB}}{R_{AB}^{n}}f_\mathrm{damp}(R_{AB}),
$$
with coefficients $C_6^{AB}$ computed from time-dependent DFT polarisabilities (in D3 they depend on the coordination environment of each atom), and a damping function $f_\mathrm{damp}$ that switches the correction off at short range, where the functional already describes the interaction and the $R^{-6}$ expansion diverges. The scaling parameters $s_n$ and the damping parameters are fitted separately for each functional. Non-local correlation functionals (vdW-DF, VV10) build dispersion into the functional itself.

::: example Dispersion in the argon dimer {#ex-disp-ar}
The $C_6$ coefficient of the argon dimer is $64.3\ \mathrm{E_h}\,a_0^{6}$. Evaluate the undamped $-C_6/R^{6}$ energy at the equilibrium separation $R_e = 3.76\ \mathrm{\AA}$ and compare with the well depth, $1.18\ \mathrm{kJ\,mol^{-1}}$. What does a GGA without correction predict?
::: solution
$R_e = 3.76/0.529177 = 7.105\ a_0$, and $R_e^{6} = 1.287\times10^{5}\ a_0^{6}$, so
$$
-\frac{C_6}{R^{6}} = -\frac{64.3}{1.287\times10^{5}}\ \mathrm{E_h} = -5.00\times10^{-4}\ \mathrm{E_h} = -1.31\ \mathrm{kJ\,mol^{-1}}.
$$
The $C_6$ term alone is slightly larger than the whole binding energy; at $R_e$ the higher dispersion terms ($C_8$, $C_{10}$) add further attraction, and Pauli repulsion cancels the excess. A GGA such as PBE binds the argon dimer by only a small fraction of the true value, at a separation that is too long, and revPBE or BLYP give essentially no minimum at all. With a D3 correction the binding energy and distance become close to experiment.
:::
:::

::: widget plot
f: -c6*0.529177^6*2625.5/x^6; -c6*0.529177^6*2625.5/x^6/(1 + exp(-d*(x/r0 - 1)))
x: 2.5, 7
y: -6, 0.5
sliders: c6=64.3:20:150:0.1; d=20:5:40:1; r0=3.2:2.5:4.2:0.01
labels: -C_6/R^6\ (\mathrm{kJ\,mol^{-1}}); \text{damped}
vlines: 3.76
caption: The dispersion energy of two argon atoms against separation in ångström: the bare $-C_6/R^{6}$ with $C_6 = 64.3\ \mathrm{E_h}\,a_0^{6}$, and the same term multiplied by a Fermi-type damping function $1/[1 + e^{-d(R/R_0 - 1)}]$ of the kind used in Grimme's D2 correction. The bare term diverges at short range; the damped term is switched off inside $R_0$, where the functional already accounts for the overlapping densities. Move $R_0$ and $d$ to see how strongly the correction near equilibrium (vertical line) depends on the damping — which is why damping parameters are fitted for each functional.
:::

## DFT in practice

A few points separate good DFT practice from bad.

- **Choose the functional for the problem**, guided by benchmarks such as Goerigk and Grimme's GMTKN55 database: for general main-group thermochemistry and kinetics, a dispersion-corrected hybrid or double hybrid (for example ωB97X-V, PBE0-D3, B3LYP-D3 at minimum, or DSD-PBEP86-D3); for transition-metal chemistry, compare several functionals because spin-state energetics depend strongly on the fraction of exact exchange; for solids, PBE, PBEsol or SCAN with hybrid corrections for band gaps.
- **Always add dispersion** unless the functional includes it.
- **Converge the integration grid**: exchange–correlation integrals are computed numerically, and coarse grids cause noise in energies, spurious imaginary frequencies and errors in meta-GGAs especially.
- **Basis sets** converge faster than for correlated methods; triple-zeta quality (def2-TZVP) is usually adequate, with diffuse functions for anions ([[computational-chemistry/basis-sets]]).
- **Beware strong correlation**: DFT with standard functionals inherits the single-determinant form of Kohn–Sham theory and can fail for diradicals and stretched bonds; broken-symmetry calculations are a pragmatic but imperfect fix.

Typical accuracies of good hybrid functionals are $10$–$20\ \mathrm{kJ\,mol^{-1}}$ for reaction energies and barriers, $0.01\ \mathrm{\AA}$ for bond lengths and a few per cent for vibrational frequencies — worse than CCSD(T), but at a cost that allows hundreds of atoms, and with forces that make geometry optimisation and ab initio molecular dynamics routine.

## Where this leads

Kohn–Sham DFT is the electronic-structure engine for most applied work: geometry optimisation and transition states ([[computational-chemistry/potential-energy-surfaces]]), ab initio molecular dynamics ([[computational-chemistry/molecular-dynamics]]), the quantum region of QM/MM models and solvation calculations ([[computational-chemistry/solvation-qmmm]]), and the band structures of solids and catalytic surfaces ([[materials-chemistry]], [[organometallics-catalysis]]). Time-dependent DFT extends the theory to excitation energies and UV–visible spectra ([[spectroscopy]]).

::: history
Llewellyn Thomas (1927) and Enrico Fermi (1928) proposed the first density functional model of the atom, and Paul Dirac added the local exchange term in 1930. John Slater's 1951 "$X\alpha$" approximation to Hartree–Fock exchange, local in the density, anticipated LDA. Pierre Hohenberg and Walter Kohn proved their theorems in 1964, and Kohn and Lu Jeu Sham published the Kohn–Sham equations in 1965. Mel Levy's constrained-search formulation followed in 1979, and David Ceperley and Berni Alder's quantum Monte Carlo study of the electron gas (1980) gave the correlation energies used in every LDA. Axel Becke's 1988 exchange functional and Chengteh Lee, Weitao Yang and Robert Parr's correlation functional (LYP, 1988) made gradient-corrected DFT accurate enough for chemistry, and Becke's 1993 hybrid led to B3LYP. Perdew, Burke and Ernzerhof's PBE appeared in 1996. Walter Kohn shared the 1998 Nobel Prize in Chemistry with John Pople, "for his development of the density-functional theory". Stefan Grimme's empirical dispersion corrections (2004, 2006, D3 in 2010) made dispersion-corrected DFT standard practice.
:::

::: summary
- The first Hohenberg–Kohn theorem: the ground-state density determines the external potential, hence everything; the second: the energy functional is minimised by the true density.
- The universal functional $F[\rho]$ is unknown; orbital-free approximations such as Thomas–Fermi fail because kinetic energy depends on orbital shape.
- Kohn–Sham theory computes the non-interacting kinetic energy $T_\mathrm{s}$ exactly from orbitals and puts the unknown physics into $E_\mathrm{xc}$; the equations have Hartree–Fock structure and cost.
- LDA takes $E_\mathrm{xc}$ from the uniform electron gas, with exchange $-C_\mathrm{x}\int\rho^{4/3}$ forced by scaling; it overbinds molecules and its errors in exchange and correlation partly cancel.
- GGAs add the density gradient, meta-GGAs the kinetic-energy density, hybrids a fraction of exact exchange (B3LYP $20\ \%$, PBE0 $25\ \%$); there is no guaranteed convergence up Jacob's ladder.
- Self-interaction and delocalisation errors make HOMO energies too high ($15.5$ instead of $24.6\ \mathrm{eV}$ for He in LDA), barriers too low and band gaps too small.
- Dispersion is missing from semilocal functionals and must be added (D3, D4, VV10).
:::

## Exercises

::: exercise The exchange constant {level=1 check="0.7386"}
Evaluate $C_\mathrm{x} = \tfrac{3}{4}(3/\pi)^{1/3}$. (Enter it to four significant figures.)
::: solution
$3/\pi = 0.95493$, whose cube root is $0.98475$; $C_\mathrm{x} = 0.75 \times 0.98475 = 0.7386$.
:::
:::

::: exercise LSDA exchange of a hydrogen atom {level=1 check="-0.268"}
Using $\int\rho^{4/3}\,\mathrm{d}\mathbf{r} = 0.28805$ for the hydrogen density, compute the fully spin-polarised LSDA exchange energy $-2^{1/3}C_\mathrm{x}\int\rho^{4/3}$. (Enter it in $\mathrm{E_h}$ to three significant figures.)
::: solution
$-1.25992 \times 0.73856 \times 0.28805 = -0.268\ \mathrm{E_h}$, against the exact $-0.3125\ \mathrm{E_h}$.
:::
:::

::: exercise B3LYP exact exchange {level=1 check="-1.8"}
For a molecule, a B3LYP calculation gives the exact-exchange energy of its Kohn–Sham determinant as $E_\mathrm{x}^\mathrm{HF} = -9.0\ \mathrm{E_h}$. How much does the exact-exchange term contribute to the B3LYP exchange–correlation energy? (Enter it in $\mathrm{E_h}$.)
::: solution
$a_0E_\mathrm{x}^\mathrm{HF} = 0.20 \times (-9.0) = -1.8\ \mathrm{E_h}$; the other $80\ \%$ of the "LSDA" exchange and the B88 gradient correction supply the rest.
:::
:::

::: exercise Scaling to $\mathrm{He^{+}}$ {level=2 check="-0.536"}
The density of a hydrogen-like ion of charge $Z$ is the hydrogen density scaled by $\lambda = Z$. Use [[#prop-scaling]] to give the LSDA exchange energy of $\mathrm{He^{+}}$, and compare with the exact exchange. (Enter $E_\mathrm{x}^\mathrm{LSDA}$ in $\mathrm{E_h}$.)
::: solution
LDA exchange scales linearly: $E_\mathrm{x}^\mathrm{LSDA}(\mathrm{He^{+}}) = 2 \times (-0.2680) = -0.536\ \mathrm{E_h}$. The exact exchange, $-J = -5Z/16 = -0.625\ \mathrm{E_h}$, scales the same way, so the relative error ($14\ \%$) is the same for every one-electron ion — a consequence of both obeying the same scaling law.
:::
:::

::: exercise Dispersion at short range {level=2 check="-5.09"}
For two argon atoms with $C_6 = 64.3\ \mathrm{E_h}\,a_0^{6}$, evaluate the undamped $-C_6/R^{6}$ at $R = 3.00\ \mathrm{\AA}$. (Enter it in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$R = 5.669\ a_0$, $R^{6} = 3.32\times10^{4}\ a_0^{6}$, so $-C_6/R^{6} = -1.937\times10^{-3}\ \mathrm{E_h} = -5.09\ \mathrm{kJ\,mol^{-1}}$ — four times the true well depth, at a distance where the atoms actually repel strongly. Hence the need for damping.
:::
:::

::: exercise The Kohn–Sham energy expression {level=2 check="-2.8344"}
For the LDA helium calculation of [[#ex-lda-he]], the components are $T_\mathrm{s} = 2.7674$, $E_\mathrm{ne} = \int v\rho = -6.6249$, $J = 1.9959$, $E_\mathrm{x} = -0.8617$ and $E_\mathrm{c} = -0.1111\ \mathrm{E_h}$. Compute the total energy, and check how far the result is from satisfying the virial relation $E = -T$. (Enter $E$ in $\mathrm{E_h}$ to four decimal places.)
::: solution
$E = T_\mathrm{s} + E_\mathrm{ne} + J + E_\mathrm{x} + E_\mathrm{c} = 2.7674 - 6.6249 + 1.9959 - 0.8617 - 0.1111 = -2.8344\ \mathrm{E_h}$ (the unrounded components give $-2.83445\ \mathrm{E_h}$). $-T_\mathrm{s} = -2.7674$ differs from $E$ by $0.067\ \mathrm{E_h}$; in exact Kohn–Sham theory the virial theorem holds for the *true* kinetic energy $T = T_\mathrm{s} + T_\mathrm{c}$, and the kinetic correlation energy $T_\mathrm{c}$ is hidden inside $E_\mathrm{xc}$, so $E \neq -T_\mathrm{s}$ is expected.
:::
:::

::: exercise The von Weizsäcker functional {level=3 check="0.5" #exr-vw}
Show that for any one-electron system with real orbital $\phi = \sqrt{\rho}$, the kinetic energy equals $T_\mathrm{W} = \tfrac{1}{8}\int\lvert\nabla\rho\rvert^{2}/\rho\,\mathrm{d}\mathbf{r}$, and evaluate it for the hydrogen ground state. (Enter $T_\mathrm{W}$ in $\mathrm{E_h}$.)
::: solution
$T = \tfrac{1}{2}\int\lvert\nabla\phi\rvert^{2}$ (integrating by parts), and $\nabla\sqrt\rho = \nabla\rho/2\sqrt\rho$, so $T = \tfrac{1}{8}\int\lvert\nabla\rho\rvert^{2}/\rho$. For $\rho = e^{-2r}/\pi$, $\lvert\nabla\rho\rvert = 2\rho$, so $T_\mathrm{W} = \tfrac{1}{8}\int 4\rho\,\mathrm{d}\mathbf{r} = \tfrac{1}{2}\int\rho = 0.5\ \mathrm{E_h}$, exact. For many-electron systems $T_\mathrm{W}$ is only a lower bound to $T_\mathrm{s}$.
:::
:::

::: exercise Curvature and the HOMO {level=3 check="0.668"}
Suppose an approximate functional gives exact energies for $\mathrm{He^{+}}$ and $\mathrm{He}$ but, between them, the convex curve $E(1 + t) = E_\mathrm{line}(t) - \tfrac{c}{2}t(1 - t)$. Show that $\mathrm{d}E/\mathrm{d}N$ at $N = 2$ from below is $-I + c/2$, and find the curvature $c$ (in $\mathrm{E_h}$) that would make $-\varepsilon_\mathrm{HOMO} = 0.5703\ \mathrm{E_h}$ when $I = 0.9037\ \mathrm{E_h}$. (Enter $c$.)
::: solution
$E_\mathrm{line}$ has slope $-I$. Differentiating $-\tfrac{c}{2}(t - t^{2})$ gives $-\tfrac{c}{2}(1 - 2t)$, which at $t = 1$ is $+c/2$. By Janak's theorem the HOMO eigenvalue is this slope, so $\varepsilon_\mathrm{HOMO} = -I + c/2$, i.e. $c = 2(I + \varepsilon_\mathrm{HOMO}) = 2(0.9037 - 0.5703) = 0.668\ \mathrm{E_h}$. (In real LDA the endpoint energies are not exact, so this is a model; it shows how a modest curvature produces a large HOMO error.)
:::
:::
