Mendeleev arranged the elements in 1869 by their chemistry, and the table he found repeats with periods of $2, 8, 8, 18, 18, 32, 32$. The noble gases close each period, the alkali metals open the next, and the ionisation energy rises across each row and collapses at the start of the next one. Nothing in the hydrogen spectrum hints at those numbers. They come from three ingredients that we now have: the hydrogen-like orbitals of [[quantum-1/hydrogen]], the Pauli principle of [[quantum-2/identical-particles]], and the fact that every electron in a many-electron atom moves in the field of the nucleus *screened* by all the others, which we met in the helium calculation of [[quantum-2/stationary-perturbation]].

The Hamiltonian of an atom with nuclear charge $Ze$ and $Z$ electrons, neglecting nuclear motion and all relativistic effects, is

$$
\hat H = \sum_{i=1}^{Z}\left[-\frac{\hbar^2}{2m}\nabla_i^2 - \frac{Ze^2}{4\pi\varepsilon_0r_i}\right] + \sum_{i<j}\frac{e^2}{4\pi\varepsilon_0\lvert\mathbf r_i - \mathbf r_j\rvert}.
$$ {#eq-atom}

It cannot be solved even for helium. The electron–electron repulsion is not small (for helium it is a third of the nuclear attraction), so perturbation theory in it is poor. This chapter follows the standard strategy instead. First replace the repulsion by an average central potential, so that each electron has its own orbital, and the atom is described by a **configuration** such as $1s^22s^22p^6$. Then treat what was left out, the non-central part of the repulsion and spin–orbit coupling, as perturbations that split each configuration into **terms** and **levels**, labelled by the term symbols chemists and spectroscopists use. Hund's rules then say which level is the ground state. The chemist's version of the same material is in the Chemistry Atlas lesson on [many-electron atoms](/learn/chemistry/lesson.php?c=quantum-chemistry&l=many-electron-atoms).

## The central-field approximation {#central-field}

Consider one electron in an atom. Near the nucleus, inside all the other electrons, it feels the full nuclear charge $Ze$. Far outside, it feels the nucleus screened by the other $Z - 1$ electrons: a net charge $+e$. In between the effective charge falls smoothly from $Z$ to $1$. If the other electrons' charge cloud is spherically symmetric on average, the electron moves in a central potential.

::: definition Central-field approximation {#def-central-field}
In the **central-field approximation** the Hamiltonian [[#eq-atom]] is replaced by

$$
\hat H_{\mathrm c} = \sum_{i=1}^{Z}\left[-\frac{\hbar^2}{2m}\nabla_i^2 + U(r_i)\right],
$$

where $U(r)$ is a single central potential with $U(r) \to -Ze^2/4\pi\varepsilon_0r$ as $r \to 0$ and $U(r) \to -e^2/4\pi\varepsilon_0r$ as $r \to \infty$. The remainder $\hat H - \hat H_{\mathrm c}$ is the **residual electrostatic interaction**. An **orbital** is an eigenstate $\phi_{nlm_lm_s} = R_{nl}(r)Y_l^{m_l}(\theta, \varphi)\chi_{m_s}$ of the one-electron Hamiltonian $-\frac{\hbar^2}{2m}\nabla^2 + U(r)$, with energy $\varepsilon_{nl}$.
:::

Because $U$ is central, the angular parts of the orbitals are the spherical harmonics of [[quantum-1/angular-momentum]], and we keep the labels $n$ and $l$, with $n \ge l + 1$ counting the radial nodes as $n - l - 1$, just as for hydrogen. What changes is the energy: hydrogen's degeneracy between different $l$ at the same $n$ is special to the pure $1/r$ potential, and in a screened potential $\varepsilon_{nl}$ depends on both $n$ and $l$. For each $(n, l)$ there are $2(2l+1)$ orbitals ($m_l$ and $m_s$), all degenerate in the central field. They form a **subshell**.

Since $\hat H_{\mathrm c}$ is a sum of identical one-electron Hamiltonians, its eigenstates are Slater determinants ([[quantum-2/identical-particles#def-slater]]) of orbitals, with energy $\sum\varepsilon_{nl}$ over the occupied orbitals. Specifying how many electrons are in each subshell gives the **configuration**.

### Why the energy depends on l: penetration

::: proposition Penetration orders the subshells {#prop-penetration}
In a screened potential $U(r)$ satisfying $-Ze^2/4\pi\varepsilon_0r \le U(r) \le -e^2/4\pi\varepsilon_0r$, the hydrogen-like ordering is modified so that, for the same $n$, orbitals of lower $l$ lie lower: $\varepsilon_{ns} < \varepsilon_{np} < \varepsilon_{nd} < \cdots$.
:::

::: proof
This is a proof sketch: a full proof needs comparison theorems for the radial equation. Here is the argument in first-order form, which is the essence. Write $U = -e^2/4\pi\varepsilon_0r + \delta U(r)$, where $\delta U \le 0$ is the extra attraction of the incompletely screened nucleus, and $\delta U$ is concentrated at small $r$ (it vanishes outside the core). To first order, $\varepsilon_{nl} = E_n + \langle nl\vert\delta U\vert nl\rangle$, with $E_n$ the hydrogen energy. Near the origin the hydrogen radial functions behave as $R_{nl} \propto r^l$, so the probability of being within a small radius $r_0$ of the nucleus scales as $r_0^{2l+3}$. Low-$l$ orbitals put more probability inside the core and feel more of the negative $\delta U$, so their energy is lowered more. The centrifugal barrier $\hbar^2l(l+1)/2mr^2$ is what keeps high-$l$ orbitals out.
:::

::: widget plot
f: x^2*(2/(3*sqrt(3)))^2*(1 - 2*x/3 + 2*x^2/27)^2*exp(-2*x/3); x^2*(8/(27*sqrt(6)))^2*(1 - x/6)^2*x^2*exp(-2*x/3); x^2*(4/(81*sqrt(30)))^2*x^4*exp(-2*x/3)
x: 0, 25
labels: 3s; 3p; 3d
caption: Radial probability densities $r^2\lvert R_{3l}\rvert^2$ for hydrogen's $n = 3$ orbitals, with $r$ in Bohr radii. All three have the same energy in hydrogen. The $3d$ curve has a single peak at $r = 9$ and almost nothing inside $r = 3$. The $3s$ curve has its main peak farther out, but notice its two small inner humps near $r \approx 0.7$ and $r \approx 4$: those are what reach inside the inner shells of a many-electron atom and see the unscreened nucleus. That penetration is why, in sodium, $3s$ is bound by $5.1\,\mathrm{eV}$ and $3d$ by only $1.5\,\mathrm{eV}$.
:::

The alkali atoms show penetration most cleanly. One valence electron moves outside a closed core of charge $+e$, so its levels are hydrogen-like at large $r$, and the effect of the core is captured by a **quantum defect** $\delta_l$: the energies fit

$$
\varepsilon_{nl} = -\frac{13.606\,\mathrm{eV}}{(n - \delta_l)^2},
$$ {#eq-defect}

with $\delta_l$ almost independent of $n$ and decreasing fast with $l$.

::: example Quantum defects of sodium {#ex-sodium}
Sodium's ionisation energy is $5.139\,\mathrm{eV}$, from the ground state $3s$, and its yellow D line at $589.6\,\mathrm{nm}$ comes from $3p_{1/2}\to3s$. Find the quantum defects $\delta_s$ and $\delta_p$, and predict the binding energy of $4s$ (measured: $1.948\,\mathrm{eV}$).
::: solution
For $3s$, [[#eq-defect]] gives $n - \delta_s = \sqrt{13.606/5.139} = 1.627$, so $\delta_s = 3 - 1.627 = 1.373$. The photon energy of the D line is $hc/\lambda = 1239.84\,\mathrm{eV\,nm}/589.59\,\mathrm{nm} = 2.103\,\mathrm{eV}$, so $3p$ is bound by $5.139 - 2.103 = 3.036\,\mathrm{eV}$, giving $n - \delta_p = \sqrt{13.606/3.036} = 2.117$ and $\delta_p = 0.883$.

If $\delta_s$ is independent of $n$, the $4s$ level has $n - \delta_s = 4 - 1.373 = 2.627$, and

$$
\varepsilon_{4s} = -\frac{13.606}{2.627^2}\,\mathrm{eV} = -1.97\,\mathrm{eV},
$$

within $0.03\,\mathrm{eV}$ of the measured value. The $s$ electron penetrates the $1s^22s^22p^6$ core so much that its binding is more than doubled compared with hydrogen's $n = 3$ ($1.51\,\mathrm{eV}$). For $3d$, $\delta_d \approx 0.01$: a $d$ electron in sodium is almost exactly hydrogenic.
:::
:::

### Self-consistent fields: Hartree and Hartree–Fock

Where does $U(r)$ come from? Douglas Hartree's answer (1928) is to make it **self-consistent**: each electron moves in the field of the nucleus plus the average charge of all the other electrons, computed from their own orbitals. That determines the orbitals, which determine the field, which determines the orbitals, and the calculation is iterated until it stops changing.

::: theorem Hartree equations {#thm-hartree}
Among product trial functions $\Psi = \phi_1(\mathbf r_1)\phi_2(\mathbf r_2)\cdots\phi_N(\mathbf r_N)$ with normalised orbitals, the expectation value of [[#eq-atom]] is stationary if and only if each orbital satisfies

$$
\left[-\frac{\hbar^2}{2m}\nabla^2 - \frac{Ze^2}{4\pi\varepsilon_0r} + \sum_{j\ne i}\int\frac{e^2\lvert\phi_j(\mathbf r')\rvert^2}{4\pi\varepsilon_0\lvert\mathbf r - \mathbf r'\rvert}\,\dd^3r'\right]\phi_i(\mathbf r) = \varepsilon_i\,\phi_i(\mathbf r).
$$ {#eq-hartree}
:::

::: proof
For the product state, with $\hat h = -\frac{\hbar^2}{2m}\nabla^2 - Ze^2/4\pi\varepsilon_0r$,

$$
\langle H\rangle = \sum_i\langle\phi_i\vert\hat h\vert\phi_i\rangle + \sum_{i<j}\int\!\!\int\frac{e^2\lvert\phi_i(\mathbf r)\rvert^2\lvert\phi_j(\mathbf r')\rvert^2}{4\pi\varepsilon_0\lvert\mathbf r - \mathbf r'\rvert}\,\dd^3r\,\dd^3r'.
$$

Vary $\phi_i^*$ by an arbitrary small $\delta\phi_i^*$, treating $\phi_i$ and $\phi_i^*$ as independent (the standard device for complex functions), with a Lagrange multiplier $\varepsilon_i$ for the constraint $\langle\phi_i\vert\phi_i\rangle = 1$. The variation of $\langle H\rangle - \sum_k\varepsilon_k\langle\phi_k\vert\phi_k\rangle$ is

$$
\int\delta\phi_i^*(\mathbf r)\left[\hat h\phi_i(\mathbf r) + \sum_{j\ne i}\int\frac{e^2\lvert\phi_j(\mathbf r')\rvert^2}{4\pi\varepsilon_0\lvert\mathbf r - \mathbf r'\rvert}\,\dd^3r'\,\phi_i(\mathbf r) - \varepsilon_i\phi_i(\mathbf r)\right]\dd^3r.
$$

This vanishes for every $\delta\phi_i^*$ if and only if the bracket is zero, which is [[#eq-hartree]].
:::

The Hartree product is not antisymmetric. Vladimir Fock and John Slater (1930) repeated the variation with a Slater determinant. The result, the **Hartree–Fock equations**, has an extra **exchange** term, the many-electron version of the exchange integral $K$ of [[quantum-2/identical-particles#thm-exchange]], acting only between orbitals of the same spin. It also removes the unphysical self-repulsion that the Hartree potential would contain if the sum included $j = i$. Hartree–Fock total energies are typically within about one per cent of the exact non-relativistic values (for helium, $-77.87\,\mathrm{eV}$ against $-79.0\,\mathrm{eV}$; compare the one-parameter variational result $-77.5\,\mathrm{eV}$). The remaining error, the **correlation energy**, comes from the electrons avoiding each other more than an average field allows, and it is the target of most of modern quantum chemistry.

::: remark Koopmans' theorem
In Hartree–Fock theory, the orbital energy $\varepsilon_i$ is approximately minus the energy needed to remove an electron from orbital $i$, if the other orbitals are not allowed to relax (Tjalling Koopmans, 1934). This gives a direct link between computed orbital energies and measured ionisation energies, and photoelectron spectra show peaks at the orbital energies of each subshell.
:::

## Shells and the periodic table {#periodic-table}

Fill the subshells in order of increasing energy, two electrons in each orbital with opposite spins, $2(2l+1)$ per subshell: this is the **aufbau** ("building-up") principle. The observed order of the subshells in neutral atoms is

$$
1s,\ 2s,\ 2p,\ 3s,\ 3p,\ 4s,\ 3d,\ 4p,\ 5s,\ 4d,\ 5p,\ 6s,\ 4f,\ 5d,\ 6p,\ 7s,\ 5f,\ 6d,\ 7p.
$$

A mnemonic, the **Madelung rule**, orders them by $n + l$, and for equal $n + l$ by $n$. It is an empirical summary, not a theorem, and it has exceptions. Penetration explains its main feature: $4s$ (with $n + l = 4$) penetrates the argon core and falls below $3d$ ($n + l = 5$), which hardly penetrates at all.

Now count. Each **period** of the table starts with a new $s$ subshell and ends when the following $p$ subshell is full:

| period | subshells filled | electrons | ends at |
|---|---|---|---|
| 1 | $1s$ | $2$ | He |
| 2 | $2s, 2p$ | $2 + 6 = 8$ | Ne |
| 3 | $3s, 3p$ | $8$ | Ar |
| 4 | $4s, 3d, 4p$ | $2 + 10 + 6 = 18$ | Kr |
| 5 | $5s, 4d, 5p$ | $18$ | Xe |
| 6 | $6s, 4f, 5d, 6p$ | $2 + 14 + 10 + 6 = 32$ | Rn |
| 7 | $7s, 5f, 6d, 7p$ | $32$ | Og |

The blocks of the table are the subshells being filled: two $s$ columns, six $p$ columns, ten $d$ columns (transition metals), fourteen $f$ columns (lanthanides and actinides). The chemistry of an element is set mostly by its outermost, partly filled subshell, because only those electrons are weakly bound enough to take part in bonds. That is why elements in the same column behave alike.

::: example Why lithium is reactive {#ex-lithium}
Lithium ($Z = 3$) has configuration $1s^22s$. Its first ionisation energy is $5.392\,\mathrm{eV}$, and that of helium is $24.587\,\mathrm{eV}$. Interpret both with an effective charge $Z_{\mathrm{eff}}$ in the hydrogen-like formula $E = -13.606\,\mathrm{eV}\,Z_{\mathrm{eff}}^2/n^2$.
::: solution
The third electron of lithium cannot join the first two in $1s$ (Pauli), so it goes into $2s$, with $n = 2$. Setting $13.606\,Z_{\mathrm{eff}}^2/4 = 5.392$ gives

$$
Z_{\mathrm{eff}} = 2\sqrt{\frac{5.392}{13.606}} = 1.26.
$$

Perfect screening by the two $1s$ electrons would give $Z_{\mathrm{eff}} = 1$; the excess $0.26$ is penetration of the $2s$ orbital inside the $1s$ core. For helium, each $1s$ electron is screened by the other only partially, and $13.606\,Z_{\mathrm{eff}}^2 = 24.587$ gives $Z_{\mathrm{eff}} = 1.34$ for the electron being removed. The large drop in ionisation energy from helium to lithium, a factor of $4.6$, is mainly the jump from $n = 1$ to $n = 2$ forced by the exclusion principle: it is the closure of the first shell.
:::
:::

::: warning Exceptions to the aufbau order
The filling order is a guide, not a law. Chromium is $[\mathrm{Ar}]\,3d^54s^1$ rather than $3d^44s^2$, and copper is $[\mathrm{Ar}]\,3d^{10}4s^1$ rather than $3d^94s^2$: the $3d$ and $4s$ energies are so close that the total-energy balance, including exchange (which favours half-filled and filled subshells), tips the other way. Worse, the order in which electrons are *removed* is not the reverse of the order in which they were added: iron is $[\mathrm{Ar}]\,3d^64s^2$, but $\mathrm{Fe}^{2+}$ is $[\mathrm{Ar}]\,3d^6$, not $3d^44s^2$. Once the nucleus is less screened, $3d$ drops below $4s$. Orbital energies depend on the configuration they are in.
:::

::: quiz
Potassium ($Z = 19$) is $[\mathrm{Ar}]\,4s^1$ rather than $[\mathrm{Ar}]\,3d^1$. Which explanation is right?
- [ ] The $4s$ orbital has a smaller average radius than $3d$.
- [x] The $4s$ orbital penetrates the argon core and feels a less screened nucleus, which outweighs its larger $n$.
- [ ] The Pauli principle forbids an electron in $3d$ while $4s$ is empty.
- [ ] $3d$ orbitals do not exist until $Z = 21$.
::: solution
The $4s$ orbital actually has a larger mean radius than $3d$, but it has small inner lobes that reach close to the nucleus, where screening is weak. The $3d$ orbital, held out by its centrifugal barrier, sees almost exactly a charge $+e$ and is nearly hydrogenic, with binding near $13.6/9 = 1.5\,\mathrm{eV}$. The Pauli principle allows any empty orbital to be occupied.
:::
:::

## Terms, levels and Hund's rules {#terms}

A configuration with a partly filled subshell is degenerate in the central-field approximation: carbon's $1s^22s^22p^2$ has $\binom62 = 15$ ways of placing two electrons in the six $2p$ spin-orbitals. Two perturbations split it.

1. The **residual electrostatic interaction** $\hat H - \hat H_{\mathrm c}$, typically a few eV for valence electrons. It commutes with the total orbital angular momentum $\hat{\mathbf L} = \sum_i\hat{\mathbf L}_i$ and the total spin $\hat{\mathbf S} = \sum_i\hat{\mathbf S}_i$ (it is a scalar and contains no spin), so by [[quantum-2/stationary-perturbation#lem-good]] states of definite $L$ and $S$ are good states, and the configuration splits into **terms** of definite $L$ and $S$.
2. **Spin–orbit coupling**, $\sum_i\xi(r_i)\hat{\mathbf L}_i\cdot\hat{\mathbf S}_i$, smaller in light atoms (meV to tenths of an eV). Within a term it acts like $A\,\hat{\mathbf L}\cdot\hat{\mathbf S}$ and splits the term into **levels** of definite total $J$, with $\hat{\mathbf J} = \hat{\mathbf L} + \hat{\mathbf S}$.

This ordering, residual electrostatic first, spin–orbit second, is **$LS$** or **Russell–Saunders coupling**. It is good for light atoms. In heavy atoms spin–orbit coupling, which grows roughly as $Z^4$ for inner electrons, can dominate, and one couples each electron's $\mathbf l_i$ and $\mathbf s_i$ to $\mathbf j_i$ first: **$jj$ coupling**.

::: definition Term symbol {#def-term}
A level in $LS$ coupling is labelled by the **term symbol**

$$
{}^{2S+1}L_J,
$$

where $L = 0, 1, 2, 3, \dots$ is written $S, P, D, F, \dots$ (capital letters for the whole atom), the superscript $2S+1$ is the **multiplicity**, and $J$ runs from $\lvert L - S\rvert$ to $L + S$. Each level ${}^{2S+1}L_J$ contains $2J + 1$ states ($M_J = -J, \dots, J$), and a term ${}^{2S+1}L$ contains $(2S+1)(2L+1)$ states in all.
:::

A completely filled subshell has $L = 0$ and $S = 0$ ([[#exr-closed]]), so closed shells contribute nothing to the angular momentum. Only the electrons in open subshells need to be counted. The noble gases, and the ground states of all atoms with only closed subshells (He, Be, Ne, Mg, ...) are ${}^1S_0$.

::: example The terms of a p² configuration {#ex-p2}
Find the terms of two equivalent $p$ electrons (same $n$), as in the ground configuration of carbon.
::: solution
Two $p$ electrons could give $L = 0, 1, 2$ and $S = 0, 1$: six candidate terms with $36$ states in all, far more than the $15$ available. The Pauli principle removes the excess. Count states by the maximum values of $M_L = m_{l1} + m_{l2}$ and $M_S = m_{s1} + m_{s2}$, listing only allowed pairs of distinct spin-orbitals.

The largest $M_L$ is $2$, reached only with both electrons in $m_l = 1$. Then their spins must be opposite, so $M_S = 0$. A term with $L = 2$ must therefore have $S = 0$: a ${}^1D$, which accounts for $5$ states ($M_L = -2, \dots, 2$, $M_S = 0$).

Next, $M_L = 1$ with $M_S = 1$: both spins up, $m_l = (1, 0)$. One such state exists, so there is a term with $L = 1$, $S = 1$: a ${}^3P$, with $3\times3 = 9$ states.

Total so far $5 + 9 = 14$, out of $15$. The last state has $M_L = 0$, $M_S = 0$: a ${}^1S$. So $p^2$ gives ${}^1S$, ${}^3P$ and ${}^1D$. The "missing" terms ${}^3S$, ${}^1P$, ${}^3D$ are the ones that would need a symmetric spatial state with a symmetric spin state. Including spin–orbit, ${}^3P$ splits into ${}^3P_0$, ${}^3P_1$, ${}^3P_2$; the others have $S = 0$ and give ${}^1S_0$ and ${}^1D_2$.
:::
:::

Which term is lowest? Friedrich Hund extracted the answer from spectra in 1925–27.

::: proposition Hund's rules {#prop-hund}
For the ground configuration of an atom in $LS$ coupling, with one open subshell:

1. The term with the largest total spin $S$ lies lowest.
2. Among terms of that $S$, the one with the largest $L$ lies lowest.
3. If the open subshell is less than half full, the level with the smallest $J = \lvert L - S\rvert$ lies lowest; if it is more than half full, the largest $J = L + S$ lies lowest.

These are empirical rules for ground states, with a physical explanation as follows. (1) A larger $S$ means a more symmetric spin state and so a more antisymmetric spatial state, keeping the electrons apart and lowering their repulsion: the exchange effect of [[quantum-2/identical-particles#thm-exchange]]. (2) A larger $L$ means the electrons circulate in the same sense, which also keeps them apart. (3) The spin–orbit constant $A$ of a term is positive for a less-than-half-filled shell and negative for a more-than-half-filled one, which behaves like a shell of positively charged holes.
:::

In practice, to find the ground term: place electrons in the $m_l$ values of the open subshell, starting from the largest $m_l$, putting one electron with spin up into each orbital before pairing any (rule 1); then $S = \sum m_s$ and $L = \lvert\sum m_l\rvert$ (rule 2), and choose $J$ by rule 3.

::: example Ground terms of carbon, nitrogen, oxygen and iron {#ex-hund}
Find the ground levels of C ($2p^2$), N ($2p^3$), O ($2p^4$) and Fe ($3d^6$).
::: solution
**Carbon**, $2p^2$: one up-spin electron each in $m_l = 1$ and $m_l = 0$. Then $S = 1$, $L = 1$, a ${}^3P$ term (consistent with [[#ex-p2]], where the other terms were singlets). The shell is less than half full, so $J = \lvert L - S\rvert = 0$: ground level ${}^3P_0$.

**Nitrogen**, $2p^3$: one up-spin electron in each of $m_l = 1, 0, -1$. $S = \frac32$, $L = 0$: ${}^4S_{3/2}$, with only one possible $J$.

**Oxygen**, $2p^4$: three up spins in $m_l = 1, 0, -1$ and a fourth, spin down, in $m_l = 1$. $S = 1$, $L = 1$: ${}^3P$. The shell is more than half full, so $J = L + S = 2$: ground level ${}^3P_2$.

**Iron**, $3d^6$ (the $4s^2$ is closed): five up spins fill $m_l = 2, \dots, -2$, contributing $\sum m_l = 0$, and the sixth, spin down, goes into $m_l = 2$. $S = 5\times\frac12 - \frac12 = 2$, $L = 2$: ${}^5D$. More than half full, so $J = 4$: ground level ${}^5D_4$. The four unpaired spins are why iron atoms carry a large magnetic moment.

All four agree with the measured ground levels.
:::
:::

::: quiz
What is the ground level of fluorine, $2p^5$?
- [ ] ${}^2P_{1/2}$
- [x] ${}^2P_{3/2}$
- [ ] ${}^1S_0$
- [ ] ${}^2S_{1/2}$
::: solution
Five $p$ electrons are one short of a closed shell, and behave as a single hole: $S = \frac12$, $L = 1$, a ${}^2P$ term. The shell is more than half full, so $J = L + S = \frac32$. The halogens all have ${}^2P_{3/2}$ ground states, and the alkali atoms, with one electron outside a closed shell, all have ${}^2S_{1/2}$.
:::
:::

### Fine structure in LS coupling

Within a term the spin–orbit interaction acts as $A\,\hat{\mathbf L}\cdot\hat{\mathbf S}$ with a constant $A$ for that term. Since $\hat{\mathbf L}\cdot\hat{\mathbf S} = \frac12(\hat J^2 - \hat L^2 - \hat S^2)$, the level energies are

$$
E_J = E_{\mathrm{term}} + \frac A2\bigl[J(J+1) - L(L+1) - S(S+1)\bigr]\hbar^2,
$$

and successive levels are separated by

$$
E_J - E_{J-1} = A\hbar^2J.
$$ {#eq-interval}

This is the **Landé interval rule**: the gap between neighbouring levels is proportional to the larger $J$.

::: example The sodium D doublet {#ex-sodium-d}
The two lines of the sodium D doublet are at $588.995\,\mathrm{nm}$ ($3p_{3/2}\to3s_{1/2}$) and $589.592\,\mathrm{nm}$ ($3p_{1/2}\to3s_{1/2}$). Find the fine-structure splitting of sodium's $3p$ term and compare with hydrogen's $n = 2$ splitting.
::: solution
The splitting is the difference of the photon energies:

$$
\Delta E = hc\left(\frac{1}{588.995\,\mathrm{nm}} - \frac{1}{589.592\,\mathrm{nm}}\right) = 1239.84\,\mathrm{eV\,nm}\times1.719\times10^{-6}\,\mathrm{nm^{-1}} = 2.13\times10^{-3}\,\mathrm{eV}.
$$

Hydrogen's $2p$ splitting was $4.53\times10^{-5}\,\mathrm{eV}$ in [[quantum-2/stationary-perturbation#ex-fine-n2]], nearly fifty times smaller. The sodium $3p$ electron penetrates the core and feels a strong, unscreened field $-\nabla U$ near the nucleus, and spin–orbit coupling depends on that field through $(1/r)\,\dd U/\dd r$. For a single electron the interval rule [[#eq-interval]] is trivially satisfied (there is only one interval), with $A\hbar^2 = \Delta E/J = 2.13\,\mathrm{meV}/\frac32 = 1.42\,\mathrm{meV}$.
:::
:::

::: widget plot
f: -(1 + (Z-1)*exp(-x/b))/x; -Z/x; -1/x
x: 0.05, 5
y: -30, 0
sliders: Z=11:2:30:1; b=0.3:0.05:1.5:0.05
labels: screened U(r); bare nucleus; fully screened
caption: A model screened potential $U(r) = -[1 + (Z-1)e^{-r/b}]/r$ in atomic units, against $r$ in Bohr radii, between the bare-nucleus curve $-Z/r$ and the fully screened $-1/r$. With $Z = 11$ (sodium) and $b = 0.3$, watch the screened curve leave the bare one within about $0.2$ Bohr radii and join $-1/r$ by about $2$. An orbital that spends even a little time at small $r$ samples the deep part of the well: that is penetration. Increase $b$ to make the core larger and the screening slower; the region where $l$-dependence comes from grows with it.
:::

::: history From Mendeleev to Hartree–Fock
Dmitri Mendeleev published his periodic table in 1869, leaving gaps for undiscovered elements. Henry Moseley's X-ray measurements (1913) showed that the ordering is by nuclear charge $Z$, not atomic weight. Niels Bohr's *Aufbauprinzip* (1921–22) built the table from electron shells using spectroscopic evidence, before quantum mechanics, and Wolfgang Pauli's exclusion principle (1925) explained why shells close. Henry Norris Russell and Frederick Saunders described $LS$ coupling in alkaline-earth spectra in 1925, and Friedrich Hund formulated his rules in 1925 and in his 1927 book on atomic and molecular spectra. Douglas Hartree introduced the self-consistent field in 1928; Vladimir Fock and John Slater antisymmetrised it in 1930. Erwin Madelung's $n + l$ rule appeared in 1936; Charlotte Moore's tables of atomic energy levels (from 1949), compiled at the National Bureau of Standards, gave the data against which all of this has been tested.
:::

## Where this leads {#leads}

Hartree–Fock theory and its successors are the starting point of computational chemistry, and the term symbols here label the states that atomic clocks, lasers and astronomical spectra use. The same scheme, with a different central potential, gives the nuclear shell model in [[particles/nuclear-structure]], whose "magic numbers" are the nuclear analogue of the noble gases. Hund's first rule, applied to the atoms of a crystal, gives the localised magnetic moments of [[condensed-matter/magnetism-superconductivity]]. In the next chapter, [[quantum-2/scattering]], we turn from bound states to the continuum: what happens when an electron, rather than being bound by an atom, is deflected by one.

::: summary
- The central-field approximation replaces electron–electron repulsion by an average central potential $U(r)$, from $-Ze^2/4\pi\varepsilon_0r$ near the nucleus to $-e^2/4\pi\varepsilon_0r$ far away. Orbitals keep the labels $n, l, m_l, m_s$, but $\varepsilon_{nl}$ depends on $l$.
- Low-$l$ orbitals penetrate the core and are bound more strongly; alkali levels fit $-13.606\,\mathrm{eV}/(n - \delta_l)^2$ with quantum defects $\delta_l$.
- Hartree's self-consistent field comes from the variational principle with a product state; Hartree–Fock adds antisymmetry and exchange. The remaining error is correlation.
- Filling subshells in the order $1s, 2s, 2p, 3s, 3p, 4s, 3d, \dots$ with $2(2l+1)$ electrons each gives periods of $2, 8, 8, 18, 18, 32, 32$.
- The residual repulsion splits a configuration into terms ${}^{2S+1}L$; spin–orbit coupling splits terms into levels $J$. Closed subshells have $L = S = 0$.
- Hund's rules: maximum $S$, then maximum $L$, then minimum $J$ for less than half-filled shells and maximum $J$ for more than half-filled. C is ${}^3P_0$, N ${}^4S_{3/2}$, O ${}^3P_2$, Fe ${}^5D_4$.
- Spin–orbit splittings obey the interval rule $E_J - E_{J-1} = AJ$ in $LS$ coupling, and grow rapidly with $Z$.
:::

## Exercises {#exercises}

::: exercise Capacity of a shell {level=1 check="32"}
How many electrons can the shell $n = 4$ hold, counting all its subshells?
::: solution
The subshells are $l = 0, 1, 2, 3$, each holding $2(2l+1)$ electrons: $2 + 6 + 10 + 14 = 32$. In general $\sum_{l=0}^{n-1}2(2l+1) = 2n^2$.
:::
:::

::: exercise States in a term {level=1 check="9"}
How many states does the ${}^3P$ term contain, and how are they distributed among its levels?
::: solution
$(2S+1)(2L+1) = 3\times3 = 9$. The levels are $J = 0, 1, 2$ with $2J+1 = 1, 3, 5$ states, and $1 + 3 + 5 = 9$.
:::
:::

::: exercise An effective charge for sodium {level=1 check="1.84"}
Sodium's $3s$ electron is bound by $5.139\,\mathrm{eV}$. Find the effective nuclear charge that a hydrogen-like $n = 3$ orbital would need to have this binding energy.
::: solution
$13.606\,Z_{\mathrm{eff}}^2/9 = 5.139$ gives $Z_{\mathrm{eff}} = 3\sqrt{5.139/13.606} = 1.84$. The ten core electrons do not screen eleven protons down to $1$ because the $3s$ orbital penetrates the core. The quantum-defect description of [[#ex-sodium]] is the same information: $Z_{\mathrm{eff}}/n = 1/(n - \delta)$.
:::
:::

::: exercise Ground levels by Hund's rules {level=2 check="4"}
Find the ground levels of titanium ($3d^24s^2$), cobalt ($3d^74s^2$) and nickel ($3d^84s^2$), and give the value of $J$ for nickel.
::: solution
**Ti**, $3d^2$: up spins in $m_l = 2, 1$. $S = 1$, $L = 3$: ${}^3F$, less than half full, $J = L - S = 2$: ${}^3F_2$.

**Co**, $3d^7$: five up spins with $\sum m_l = 0$, then two down spins in $m_l = 2, 1$. $S = \frac52 - 1 = \frac32$, $L = 3$: ${}^4F$, more than half full, $J = L + S = \frac92$: ${}^4F_{9/2}$.

**Ni**, $3d^8$: two holes, like $d^2$. $S = 1$, $L = 3$: ${}^3F$, more than half full, $J = 4$: ${}^3F_4$. All three agree with experiment.
:::
:::

::: exercise The interval rule in carbon {level=2 check="2"}
Carbon's ${}^3P$ levels lie at $0$, $16.40$ and $43.40\,\mathrm{cm^{-1}}$ above the ground level ${}^3P_0$. What ratio $(E_2 - E_1)/(E_1 - E_0)$ does the Landé interval rule predict, and how well is it obeyed?
::: solution
By [[#eq-interval]], $E_J - E_{J-1} \propto J$, so the ratio is $2/1 = 2$. The measured ratio is $(43.40 - 16.40)/16.40 = 1.65$. The deviation means the ${}^3P$ levels are not pure $LS$ states: spin–orbit coupling mixes ${}^3P_2$ with ${}^1D_2$ and ${}^3P_0$ with ${}^1S_0$, the levels with the same $J$, which is a second-order effect. The order (normal, with $J = 0$ lowest) follows Hund's third rule.
:::
:::

::: exercise The sodium doublet splitting {level=2 check="2.13"}
Using the wavelengths in [[#ex-sodium-d]], compute the sodium $3p$ fine-structure splitting in meV, and also express it as a wavenumber in $\mathrm{cm^{-1}}$.
::: solution
$\Delta E = 1239.84\,\mathrm{eV\,nm}\times(1/588.995 - 1/589.592)\,\mathrm{nm^{-1}} = 2.13\,\mathrm{meV}$. As a wavenumber, $1/\lambda_1 - 1/\lambda_2 = 1.719\times10^{-6}\,\mathrm{nm^{-1}} = 17.2\,\mathrm{cm^{-1}}$ (since $1\,\mathrm{nm^{-1}} = 10^{7}\,\mathrm{cm^{-1}}$).
:::
:::

::: exercise Closed shells carry no angular momentum {#exr-closed level=3}
Prove that a completely filled subshell $nl^{2(2l+1)}$ has $L = 0$ and $S = 0$.
::: solution
In a filled subshell every spin-orbital $(m_l, m_s)$ is occupied, so there is exactly one Slater determinant: the subshell is a single state. In it $M_L = \sum m_l = 2\sum_{m=-l}^{l}m = 0$ and $M_S = (2l+1)(\frac12 - \frac12) = 0$. The state has definite $L$ and $S$, because it is the only state of the configuration and the total-angular-momentum operators map the configuration's states into themselves, so it must be an eigenstate of $\hat L^2$ and $\hat S^2$. A state with $L > 0$ would belong to a multiplet of $2L+1 > 1$ states with different $M_L$, all in the same configuration; there are no others. Hence $L = 0$, and likewise $S = 0$.
:::
:::

::: exercise The terms of d² {level=3}
Find the terms of two equivalent $d$ electrons, and check that they account for all $\binom{10}{2}$ states.
::: hint
Proceed as in [[#ex-p2]]: tabulate the number of allowed states for each $(M_L, M_S)$ with $M_L, M_S \ge 0$, and peel off terms starting from the largest $M_L$.
:::
::: solution
The largest $M_L$ is $4$, with both electrons in $m_l = 2$, spins opposite: a ${}^1G$ ($9$ states). The largest $M_L$ with $M_S = 1$ is $3$ ($m_l = 2, 1$, spins up): a ${}^3F$ ($7\times3 = 21$ states). Count the states with $M_S = 0$ at each $M_L$: two electrons in distinct $(m_l, m_s)$ with $m_{s1} + m_{s2} = 0$. For $M_L = 2$ the pairs of $m_l$ are $(2,0)$ and $(1,1)$; $(2,0)$ gives two spin arrangements and $(1,1)$ gives one, so $3$ states. These are used by ${}^1G$ (one), ${}^3F$ (one, its $M_S = 0$ member) and a new term with $L = 2$, $S = 0$: ${}^1D$. With $M_S = 1$, $M_L = 1$: pairs $(2,-1)$ and $(1,0)$, two states, one for ${}^3F$ and one for a new ${}^3P$. With $M_S = 0$, $M_L = 0$: pairs $(2,-2)$, $(1,-1)$ with two spin arrangements each, and $(0,0)$ with one, so $5$ states, used by ${}^1G$, ${}^3F$, ${}^1D$, ${}^3P$ and one more, a ${}^1S$.

The terms are ${}^1S$, ${}^1D$, ${}^1G$, ${}^3P$, ${}^3F$, with $1 + 5 + 9 + 9 + 21 = 45 = \binom{10}{2}$ states. By Hund's rules ${}^3F$ is lowest, as found for titanium.
:::
:::

::: exercise Variational meaning of Hartree's orbital energies {level=3}
Show from [[#thm-hartree]] that the total Hartree energy is not the sum of the orbital energies: $\langle H\rangle = \sum_i\varepsilon_i - \sum_{i<j}J_{ij}$, where $J_{ij}$ is the Coulomb integral between orbitals $i$ and $j$. Explain the physical reason.
::: solution
Multiply [[#eq-hartree]] by $\phi_i^*$ and integrate: $\varepsilon_i = \langle\phi_i\vert\hat h\vert\phi_i\rangle + \sum_{j\ne i}J_{ij}$, with $J_{ij} = \int\!\!\int\lvert\phi_i\rvert^2\lvert\phi_j\rvert^2e^2/4\pi\varepsilon_0r_{12}$. Summing over $i$,

$$
\sum_i\varepsilon_i = \sum_i\langle\phi_i\vert\hat h\vert\phi_i\rangle + \sum_i\sum_{j\ne i}J_{ij} = \sum_i\langle\phi_i\vert\hat h\vert\phi_i\rangle + 2\sum_{i<j}J_{ij}.
$$

The expectation value from the proof of [[#thm-hartree]] contains each pair's repulsion once: $\langle H\rangle = \sum_i\langle\phi_i\vert\hat h\vert\phi_i\rangle + \sum_{i<j}J_{ij}$. Subtracting, $\langle H\rangle = \sum_i\varepsilon_i - \sum_{i<j}J_{ij}$. Each orbital energy includes the repulsion of that electron with all the others, so adding orbital energies counts every pair twice.
:::
:::
