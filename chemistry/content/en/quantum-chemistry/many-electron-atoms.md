Add a single electron to hydrogen and the exact solution is lost. The helium atom, three bodies and four coordinates, cannot be separated into one-electron problems because each electron feels the other's instantaneous position; no change of variables unties them. And yet the periodic table — its shell structure, its chemical families, the fact that oxygen is divalent and neon is inert — emerges from this unsolvable problem with complete regularity. The reconciliation is one of the great intellectual achievements of 1920s quantum mechanics: a set of *approximations* so well chosen that the chemistry of a hundred elements follows from a handful of principles. Three of them dominate this lesson: the **orbital approximation** (each electron moves in an averaged field), the **Pauli principle** (the wavefunction changes sign under exchange of any two electrons), and the **variational and perturbative machinery** you will master in [[quantum-chemistry/approximation-methods]]. We build up from helium, the testing ground for every atomic approximation, to the term symbols that organise atomic spectra.

## Helium: the first two-electron atom

The non-relativistic Hamiltonian for helium, with the nucleus fixed at the origin (the Born–Oppenheimer step is trivial for an atom), is

$$
\hat H = -\frac{\hbar^{2}}{2m_\mathrm{e}}\nabla_1^{2} -\frac{\hbar^{2}}{2m_\mathrm{e}}\nabla_2^{2}
-\frac{2e^{2}}{4\pi\varepsilon_0 r_1} -\frac{2e^{2}}{4\pi\varepsilon_0 r_2}
+\frac{e^{2}}{4\pi\varepsilon_0 r_{12}} .
$$ {#eq-he-hamiltonian}

::: definition The exact helium Hamiltonian {#def-he-hamiltonian}
Equation [[#eq-he-hamiltonian]] contains two one-electron operators — kinetic energy and nuclear attraction for each electron — plus the **electron-repulsion term** $e^{2}/4\pi\varepsilon_0 r_{12}$, where $r_{12}$ is the instantaneous separation of the two electrons. The first four terms are sums of independent hydrogen-like operators; the fifth couples the coordinates of the two electrons and makes the equation inseparable. Every approximation for every many-electron atom consists of replacing that coupling by something tractable and then correcting for what was lost.
:::

The crudest tractable choice is to delete the repulsion term entirely: each electron then occupies a hydrogen-like $1s$ orbital of the bare helium ion, $\psi = 1s(1)\,1s(2)$, and the energy is simply twice the hydrogenic $1s$ energy at $Z = 2$.

:::example The product wavefunction and the size of the problem {#ex-he-product}
Using $E_{1s} = -Z^{2}\times 13.60\ \mathrm{eV}$ per electron, compute the energy of the product wavefunction $\psi = 1s(1)1s(2)$ for helium, compare it with the experimental value obtained from the two ionisation energies ($24.59 + 54.42\ \mathrm{eV}$, NIST), and estimate the first-order effect of the repulsion by treating $e^{2}/4\pi\varepsilon_0 r_{12}$ as a perturbation with the result $\langle r_{12}^{-1}\rangle = \tfrac{5}{8}Z$ in atomic units.
::: solution
The product energy is $2\times(-4\times13.60\ \mathrm{eV}) = -108.8\ \mathrm{eV}$, against the experimental $-79.0\ \mathrm{eV}$: ignoring repulsion overbinds by $30\ \mathrm{eV}$, nearly 40 per cent. Restoring the repulsion to first order adds $+\tfrac{5}{8}Z$ Hartree $= +1.25\times27.21\ \mathrm{eV} = +34.0\ \mathrm{eV}$, giving $-108.8 + 34.0 = -74.8\ \mathrm{eV}$ — within $4.2\ \mathrm{eV}$, about 5 per cent, of experiment. The remaining $4.2\ \mathrm{eV}$ is the **correlation energy**: the energy the atom gains because each electron moves in the *instantaneous* field of the other, not the average, and the two avoid each other slightly better than an uncorrelated product allows. A wavefunction that recovers even a fraction of it is already better than the independent-particle picture; recovering all of it is the programme of [[computational-chemistry/electron-correlation]].
:::
:::

::: warning The product wavefunction is not yet antisymmetric {#warn-product-not-antisym}
Two errors are hiding in $\psi = 1s(1)1s(2)$ and they must not be conflated. The first is physical: it ignores electron correlation, as just shown. The second is formal: it is not a legitimate two-electron wavefunction at all until it is made antisymmetric under particle exchange, because electrons are fermions. For the helium ground state the two errors happen to be separable — antisymmetrising the product with opposite-spin electrons changes nothing in the spatial part — but for excited configurations and for molecules antisymmetry reshuffles the energies themselves. Never treat the orbital product as the final word.
:::

## Spin and the Pauli principle

::: definition Electron spin {#def-spin}
The Stern–Gerlach experiment (1922) showed that silver atoms split into *two* beams in an inhomogeneous magnetic field, and Uhlenbeck and Goudsmit (1925) interpreted the result as an intrinsic angular momentum of the electron with quantum number $s = \tfrac{1}{2}$: **spin**. Its projection takes only two values, $m_s = \pm\tfrac{1}{2}$, written with the spin functions $\alpha$ (up, $m_s = +\tfrac{1}{2}$) and $\beta$ (down, $m_s = -\tfrac{1}{2}$). Spin has no classical analogue and no coordinate-space wavefunction: a one-electron state is a **spin-orbital** $\chi(\mathbf{r}, m_s) = \phi(\mathbf{r})\,\sigma(m_s)$, an orbital $\phi$ multiplied by a spin function $\sigma \in \{\alpha, \beta\}$.
:::

::: definition Pauli exclusion principle {#def-pauli}
The total wavefunction of any system of electrons must **change sign under exchange of the complete coordinates (space and spin) of any two electrons**: $\Psi(\ldots i \ldots j \ldots) = -\Psi(\ldots j \ldots i \ldots)$. A one-electron state specified by a complete set of quantum numbers is therefore unique: no two electrons in an atom can share all four quantum numbers $n, l, m_l, m_s$ — the exclusion principle in its familiar spectroscopic form.
:::

The compact way to build antisymmetric functions is the **Slater determinant**. For two electrons in spin-orbitals $\chi_a$ and $\chi_b$,

$$
\Psi(1,2) = \frac{1}{\sqrt{2}}
\begin{vmatrix}
\chi_a(1) & \chi_b(1) \\
\chi_a(2) & \chi_b(2)
\end{vmatrix}
= \frac{1}{\sqrt{2}}\bigl[\chi_a(1)\chi_b(2) - \chi_b(1)\chi_a(2)\bigr],
$$ {#eq-slater-det}

and if $\chi_a = \chi_b$ the determinant vanishes — exclusion is built in, not imposed. For the helium ground state, $\chi_a = 1s\alpha$ and $\chi_b = 1s\beta$, and [[#eq-slater-det]] factorises: the spatial part is the symmetric product $1s(1)1s(2)$ and the spin part the antisymmetric **singlet** $[\alpha(1)\beta(2) - \beta(1)\alpha(2)]/\sqrt{2}$. That is why two electrons *can* share the $1s$ orbital — they are distinguished by spin — and why they cannot share a third: the determinant with three columns in two spin-orbitals is zero. This single fact generates the shell structure of the periodic table.

Antisymmetry has a physical consequence with no classical counterpart. If two electrons have *parallel* spins, the spatial wavefunction is antisymmetric and vanishes when the electrons coincide: they move with an **exchange hole** around each other and their mutual repulsion is reduced. In helium's excited $1s\,2s$ configuration the triplet state (parallel spins) lies about $0.8\ \mathrm{eV}$ below the singlet (antiparallel) purely because of this exchange effect — the same physics, as you will see in [[quantum-chemistry/chemical-bond-qm]], that makes the hydrogen bond possible.

## Building the periodic table

::: proposition The aufbau principle {#prop-aufbau}
In the orbital approximation the ground-state configuration of an atom is built by placing electrons into the lowest available spin-orbitals, two per spatial orbital with paired spins, subject to the Pauli principle. The orbital ordering follows the empirical $n + \ell$ rule: orbitals with smaller $n + \ell$ lie lower, and for equal $n + \ell$ the smaller $n$ lies lower — giving $1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d < 5p < 6s < 4f \ldots$ The rule is a summary of computed and measured orbital energies, not a theorem; its exceptions are discussed below.
:::

Filling in order reproduces the periods 2, 8, 8, 18, 18, 32 of the periodic table and the chemical families: the alkali metals end each block with a single $s$ electron, the halogens lack one $p$ electron, the noble gases close a shell. Two families of exceptions deserve the name. Chromium is $[\mathrm{Ar}]\,3d^{5}4s^{1}$, not $3d^{4}4s^{2}$, and copper is $[\mathrm{Ar}]\,3d^{10}4s^{1}$, not $3d^{9}4s^{2}$ (with niobium, molybdenum, silver and gold behaving similarly): the energy cost of promoting an $s$ electron into the $d$ shell is repaid by the exchange stabilisation of a half-filled or filled $d$ subshell, and by the reduced $s$–$d$ repulsion. The lesson is that configurations are *results*, not rules — the atom takes whatever arrangement minimises the energy.

:::example Configurations of the first-row transition metals and their ions {#ex-configurations}
Write the ground-state configurations of Fe ($Z = 26$), and of the ions $\mathrm{Fe^{2+}}$ and $\mathrm{Fe^{3+}}$. Which orbital is ionised from, and why is that not the highest-energy orbital of the neutral atom?
::: solution
Iron is $[\mathrm{Ar}]\,3d^{6}4s^{2}$. Ionisation removes the $4s$ electrons first: $\mathrm{Fe^{2+}} = [\mathrm{Ar}]\,3d^{6}$ and $\mathrm{Fe^{3+}} = [\mathrm{Ar}]\,3d^{5}$. The apparent paradox — the $3d$ orbital is filled *after* the $4s$ in the neutral atom, yet ionised *before* it — resolves once you accept that orbital energies depend on the occupation: the $3d$ orbital is compact and poorly screened, so it drops sharply below the $4s$ as nuclear charge accumulates and as $d$ electrons are added. In the neutral atom $4s$ is marginally lower and fills first; in the cation $3d$ is far lower and the $4s$ electron is the outermost, easiest to remove. The same logic explains why scandium and yttrium lose their $d$ electron to give $d^{0}$ ions.
:::
:::

## Shielding and penetration

For hydrogen, energy depends on $n$ alone; for every other atom it depends on $n$ *and* $\ell$ as well, and the culprit is the $1/r_{12}$ term of equation [[#eq-he-hamiltonian]]. An electron in a $2s$ orbital has a small but crucial lobe of its radial distribution *inside* the $1s$ shell (see [[quantum-chemistry/hydrogen-atom]]), where it feels nearly the full nuclear charge; the $2p$ electron, with its centrifugal barrier keeping it out of the nucleus, is screened almost completely by the $1s$ pair. This **penetration** difference — not any additional force — is why $2s$ lies below $2p$, why subshell structure exists at all, and, magnified across the $3d$–$4s$ boundary, why the first transition series begins where it does.

::: algorithm Slater's rules {#alg-slater}
Estimate the **shielding constant** $\sigma$ for an electron of interest and hence $Z_\mathrm{eff} = Z - \sigma$, where the electron is treated as hydrogenic with energy $E \approx -Z_\mathrm{eff}^{2}\,(13.60\ \mathrm{eV})/n^{*2}$:
1. Write the configuration in the groups $(1s)\,(2s,2p)\,(3s,3p)\,(3d)\,(4s,4p)\,(4d)\,(4f)\,(5s,5p)\ldots$
2. Electrons in groups to the *right* of the chosen electron's group contribute nothing.
3. For an $ns$ or $np$ electron: each *other* electron in the same group contributes $0.35$ ($0.30$ in the $1s$ group); each electron in the $n-1$ shell contributes $0.85$; each electron in shells $n-2$ or lower contributes $1.00$.
4. For an $nd$ or $nf$ electron: every electron to the left contributes $1.00$; each other electron in the same group contributes $0.35$.
5. Then $Z_\mathrm{eff} = Z - \sigma$.
:::

:::example Why potassium is $[Ar]\,4s^1$ and not $[Ar]\,3d^1$ {#ex-ks-zeff}
Apply Slater's rules to the $4s$ and to the $3d$ electron of potassium ($Z = 19$, configuration $1s^{2}2s^{2}2p^{6}3s^{2}3p^{6}4s^{1}$), and decide which orbital is lower. Repeat for calcium's $4s$ and for both electrons of scandium's $3d$ and $4s$.
::: solution
For K's $4s$ electron: the eight $n-1$ electrons ($3s,3p$) contribute $8\times0.85 = 6.80$ and the ten inner electrons contribute $10\times1.00 = 10.00$, so $\sigma = 16.80$ and $Z_\mathrm{eff}(4s) = 19 - 16.80 = 2.20$. For a K $3d$ electron every electron lies to its left, so $\sigma = 18\times1.00 = 18.00$ and $Z_\mathrm{eff}(3d) = 1.00$. The $4s$ electron penetrates the argon core and feels more than twice the charge: $4s$ lies far below $3d$, and potassium is $[Ar]\,4s^{1}$. Calcium's $4s$ gains a little from its partner: $\sigma = 0.35 + 6.80 + 10.00 = 17.15$, $Z_\mathrm{eff} = 2.85$. In scandium the rules give $Z_\mathrm{eff}(3d) = 21 - 18 = 3.00$ and $Z_\mathrm{eff}(4s) = 21 - (0.35 + 9\times0.85 + 10.00) = 3.00$ — a tie. The tie is the rules breaking down, not physics: full calculations put the occupied $3d$ below $4s$ from scandium onwards, which is why scandium chemistry is $3d^{1}$ and why the $3d$ series contracts across the period.
:::
:::

:::widget plot
f: 0.65*x - 10.65; 0.15*x - 0.15
x: 19, 30
y: 0, 10
labels: \text{3d electron}, \text{4s electron}
caption: Slater $Z_\mathrm{eff}$ for the $3d$ and $4s$ electrons of the neutral first-row transition metals, from the rules of [[#alg-slater]] with configurations $3d^{k}4s^{2}$: $Z_\mathrm{eff}(3d) = Z - 18 - 0.35(k-1) = 0.65Z - 10.65$ and $Z_\mathrm{eff}(4s) = Z - [0.35 + 0.85(8+k) + 10] = 0.15Z - 0.15$ with $k = Z - 20$. The $3d$ electron, unscreened within its own shell, feels the nuclear charge almost two and a half times faster than the diffuse $4s$; the lines cross at scandium, where the rules predict a tie and the real atom puts $3d$ below $4s$. The $3d$ contraction across the series — the same physics behind the lanthanide contraction — is visible as the steep line.
:::

The first ionisation energies across period 2 (CRC Handbook values: Li $520$, Be $899$, B $801$, C $1086$, N $1402$, O $1314$, F $1681$, Ne $2081\ \mathrm{kJ\,mol^{-1}}$) rise overall, as $Z_\mathrm{eff}$ climbs, but with two dips that are fingerprints of subshell structure.

:::example The boron and oxygen dips {#ex-ie-anomaly}
Explain why boron's first ionisation energy ($801\ \mathrm{kJ\,mol^{-1}}$) is *below* beryllium's ($899$) and oxygen's ($1314$) below nitrogen's ($1402$), when $Z_\mathrm{eff}$ increases monotonically across the period.
::: solution
Boron's outermost electron is the first $2p$ electron, which is raised in energy relative to $2s$ by its poorer penetration of the $1s$ core — removing it relieves the atom of a *higher*-energy electron, so despite the larger nuclear charge the ionisation energy falls. Nitrogen's configuration is $2p^{3}$ with one electron in each $p$ orbital, all spins parallel and mutually stabilised by exchange; oxygen is $2p^{4}$, and the fourth $p$ electron must pair in an already-occupied orbital, paying a pairing (and extra repulsion) energy of roughly $1\ \mathrm{eV}$. Ionising oxygen removes an electron *from a pair*, relieving that cost, and the relief outweighs the increased $Z_\mathrm{eff}$. The same pair-breaking argument explains why $\mathrm{N^{+}}$ is harder to ionise than $\mathrm{O^{+}}$ would suggest and why half-filled subshells recur as stability motifs throughout the lesson.
:::
:::

:::warning Slater's rules are a model, not a measurement {#warn-slater}
Slater's rules are an empirical recipe (Slater, 1930) good to perhaps two significant figures, and $Z_\mathrm{eff}$ itself is not an observable: different definitions — Slater's, Clementi–Raimondi's from orbital energies, Müller–Blackman's from ionisation energies — disagree in the second digit. Quote $Z_\mathrm{eff} = 2.20$, never $2.2000$; never treat agreement of two Slater values (as for scandium above) as a physical degeneracy; and never use the rules to settle an ordering they were fitted to reproduce. Their value is qualitative: they make penetration and contraction *computable* so you can argue with numbers instead of adjectives.
:::

## Term symbols: the quantum numbers of whole atoms

When several electrons are present, the good quantum numbers are no longer the individual $m_{l_i}, m_{s_i}$ but the *totals*. In the light atoms of this course, **LS (Russell–Saunders) coupling** applies: electrostatic repulsion dominates spin–orbit coupling, so $\hat{L} = \sum_i \hat{\ell}_i$ and $\hat{S} = \sum_i \hat{s}_i$ are approximately conserved, with $J$ from $\hat{J} = \hat{L} + \hat{S}$.

::: definition Atomic term symbols {#def-term-symbols}
An atomic state is labelled $^{2S+1}L_{J}$, where $L$ is written as a capital letter S, P, D, F, $\ldots$ for $L = 0, 1, 2, 3, \ldots$, $S$ is the total spin quantum number, $2S+1$ the **spin multiplicity**, and $J$ runs from $|L - S|$ to $L + S$ in steps of one (so when $L = 0$ the only level is $J = S$). A *term* is a level of given $L, S$; a *level* is a term with $J$ specified; each level holds $2J + 1$ states. Example: the sodium D lines are the transitions $3s\ \,^{2}\mathrm{S}_{1/2} \rightarrow 3p\ \,^{2}\mathrm{P}_{1/2,\,3/2}$ at $589.6$ and $589.0\ \mathrm{nm}$ — the fine-structure splitting of a single orbital configuration into two levels $17\ \mathrm{cm^{-1}}$ apart.
:::

A configuration splits into terms because the Pauli principle deletes most of the naive combinations of one-electron states. The $2p^{2}$ configuration of carbon offers the standard count: six spin-orbitals ($m_l = +1, 0, -1$ each with $\alpha, \beta$) taken two at a time give $\binom{6}{2} = 15$ **microstates**, and the terms must account for exactly fifteen states: $^{1}\mathrm{S}$ (1 state) $+\ ^{3}\mathrm{P}$ ($3 \times 3 = 9$ states) $+\ ^{1}\mathrm{D}$ (5 states) $= 15$.

::: proposition Hund's rules {#prop-hund}
For the ground term of a configuration: (i) the term of **greatest spin multiplicity** lies lowest (exchange stabilisation of parallel spins); (ii) among terms of equal multiplicity, the one of **greatest $L$** lies lowest (electrons with larger orbital angular momentum avoid each other more effectively); (iii) for the level within the ground term, $J = |L - S|$ if the subshell is **less than half-full** and $J = L + S$ if **more than half-full** (the spin–orbit coupling constant changes sign at half-filling). Hund's rules are empirical regularities of exceptional reliability for ground states.
:::

:::example Ground terms of the light p-block {#ex-ground-terms}
Derive the ground levels of C ($2p^{2}$), N ($2p^{3}$), O ($2p^{4}$) and F ($2p^{5}$).
::: solution
Carbon: the largest $S$ available to $p^{2}$ is $S = 1$ (the triplet), and within triplets the Pauli principle permits only $L = 1$ (the $^{3}\mathrm{D}$ would need two electrons in the same $m_l$ with parallel spin): the ground term is $^{3}\mathrm{P}$, and with the subshell less than half-full Hund's rule (iii) gives $J = |1-1| = 0$: $\mathrm{C}\ ^{3}\mathrm{P}_{0}$. Nitrogen: $S = \tfrac{3}{2}$ forces $L = 0$ (all three $m_l$ occupied once), giving $^{4}\mathrm{S}_{3/2}$. Oxygen is more than half-full — equivalent by the hole picture to two $p$ holes, so the terms are again $^{3}\mathrm{P}$, $^{1}\mathrm{D}$, $^{1}\mathrm{S}$, but now rule (iii) selects $J = 1 + 1 = 2$: $\mathrm{O}\ ^{3}\mathrm{P}_{2}$. Fluorine has a single hole: $^{2}\mathrm{P}_{3/2}$. Note the pattern the spectra confirm: carbon and oxygen share a term but not a $J$; the whole $^{3}\mathrm{P}$ triplet of oxygen spans only $227\ \mathrm{cm^{-1}}$, comparable to $kT = 207\ \mathrm{cm^{-1}}$ at room temperature, which is why ground-state oxygen is effectively a thermally mixed triplet.
:::
:::

::: quiz
The excited configuration $1s\,2p$ of helium gives a singlet and a triplet term. Which lies lower, and why?
- [x] The triplet: parallel spins keep the electrons apart through the exchange hole, lowering their repulsion — the same effect as Hund's first rule.
- [ ] The singlet: antiparallel spins allow the electrons to share space, increasing nuclear screening.
- [ ] They are exactly degenerate: the electrostatic Hamiltonian contains no spin terms.
- [ ] Whichever has the larger $J$, by Hund's third rule.
::: solution
The triplet states lie below their singlet partners — by about $0.8\ \mathrm{eV}$ in the $1s\,2s$ case and about $0.2\ \mathrm{eV}$ for $1s\,2p$. The Hamiltonian is indeed spin-free — but antisymmetry ties spin to *space*, and the spatial part of a triplet keeps the electrons apart (option 1). Option 3 is the classic trap: no spin in the Hamiltonian, yet spin-dependent energies, because of the Pauli principle. Historically the two families of helium lines (orthohelium and parahelium) were a puzzle precisely because transitions between families are so weak — spin changes are disfavoured.
:::
:::

## Where this leads

The orbital approximation made quantitative — each electron in the self-consistent field of the nucleus and the *averaged* cloud of the others, antisymmetry imposed by a determinant, the field iterated until stable — is the **Hartree–Fock method**, developed from Hartree's 1928 scheme by Fock and by Slater in 1929–30 and taken up in full in [[computational-chemistry/hartree-fock]]; the correlation energy left over, the $4.2\ \mathrm{eV}$ of helium, is the subject of [[computational-chemistry/electron-correlation]]. The two approximation methods you are about to learn in [[quantum-chemistry/approximation-methods]] are exactly the tools used above — first-order perturbation theory for helium's repulsion, the variation principle for better orbitals — and the exchange physics of the Pauli principle returns as the engine of bonding in [[quantum-chemistry/chemical-bond-qm]]. The periodic trends this lesson explains quantitatively are the ones catalogued qualitatively in [[general-chemistry-1/periodicity]]; the term symbols are the language of [[spectroscopy/electronic-spectroscopy]] and of atomic clocks.

::: history
Henry Moseley measured the $K_\alpha$ X-ray lines of the elements in 1913–14 and found $\sqrt{\nu} \propto (Z - 1)$: the periodic table is ordered by nuclear charge, and the "shielding" of one electron by another entered chemistry as a measurable number before it was a theory. Wolfgang Pauli stated the exclusion principle in 1925 to explain the periods and the anomalous Zeeman effect; George Uhlenbeck and Samuel Goudsmit proposed electron spin the same year, and the two together explained the alkali doublets. Werner Heisenberg showed in 1928 that the "exchange force" aligning spins in ferromagnets is the same electrostatic-plus-Pauli effect that splits helium's terms — spin alignment as an illusion of antisymmetry. John Slater published his shielding rules in 1930, and Condon and Shortley's 1935 *Theory of Atomic Spectra* fixed the term-symbol notation and the angular-momentum algebra every atom physicist still uses.
:::

::: summary
- The electron-repulsion term $e^{2}/4\pi\varepsilon_0 r_{12}$ makes every many-electron atom inseparable; helium's exact energy is $-79.0\ \mathrm{eV}$ against $-108.8\ \mathrm{eV}$ for an uncorrelated product and $-74.8\ \mathrm{eV}$ to first order — the $4.2\ \mathrm{eV}$ gap is correlation energy.
- Electrons are fermions: the total wavefunction is antisymmetric under exchange, built compactly as a Slater determinant; the Pauli principle is the determinant vanishing when two spin-orbitals coincide.
- Parallel spins carry an exchange hole that lowers repulsion — the origin of Hund's first rule, of helium's triplet–singlet splittings, and ultimately of the covalent bond.
- The aufbau principle with the $n + \ell$ ordering reproduces the periodic table; chromium and copper show that configurations are energy minimisations, not rules, and cations ionise $4s$ before $3d$.
- Subshell structure ($E$ depends on $\ell$) comes from penetration: Slater's rules turn penetration into $Z_\mathrm{eff}$, explaining $4s$ before $3d$ in potassium ($2.20$ vs $1.00$) and the $3d$ contraction — but they are empirical and only two-digit accurate.
- Ionisation-energy trends carry fingerprints of pairing: the boron dip is penetration, the oxygen dip is pair-breaking.
- Whole atoms are labelled $^{2S+1}L_{J}$; microstate counting (15 for $p^{2}$) fixes the terms, and Hund's rules fix the ground level: C $^{3}\mathrm{P}_{0}$, N $^{4}\mathrm{S}_{3/2}$, O $^{3}\mathrm{P}_{2}$.
:::

## Exercises

::: exercise Configurations {level=1}
Write the ground-state electron configurations of arsenic ($Z = 33$), molybdenum ($Z = 42$) and the palladium atom ($Z = 46$, which is diamagnetic).
::: solution
Arsenic: $[\mathrm{Ar}]\,3d^{10}4s^{2}4p^{3}$. Molybdenum follows chromium: $[\mathrm{Ar}]\,3d^{5}4s^{1}$ (half-filled $d$ plus exchange). Palladium is the famous exception $[\mathrm{Kr}]\,4d^{10}$ — the $5s$ electrons are promoted to complete the $4d$ subshell, which is why Pd is diamagnetic and why it so readily forms Pd(0) complexes.
:::
:::

::: exercise Slater for chlorine {level=1 check="6.10"}
Use Slater's rules to find $Z_\mathrm{eff}$ for a $3p$ electron of chlorine ($Z = 17$). (Enter the dimensionless value.)
::: solution
Groups $(1s)^{2}(2s,2p)^{8}(3s,3p)^{7}$. Other electrons in the $n = 3$ group: $6\times0.35 = 2.10$; the $n-1$ shell: $8\times0.85 = 6.80$; the $1s$ pair: $2\times1.00 = 2.00$. Total $\sigma = 10.90$, so $Z_\mathrm{eff} = 17 - 10.90 = 6.10$.
:::
:::

::: exercise Slater for potassium {level=1 check="2.20"}
Use Slater's rules to find $Z_\mathrm{eff}$ for the $4s$ electron of potassium ($Z = 19$). (Enter the dimensionless value.)
::: solution
The eight $3s,3p$ electrons contribute $8\times0.85 = 6.80$ and the ten inner electrons $10.00$, so $\sigma = 16.80$ and $Z_\mathrm{eff} = 19 - 16.80 = 2.20$ — more than twice the $3d$ value of $1.00$, which is why the $4s$ fills first.
:::
:::

::: exercise Helium to first order {level=2 check="-74.8"}
Using the unperturbed product energy $-108.8\ \mathrm{eV}$ and the first-order repulsion correction $\langle r_{12}^{-1}\rangle = \tfrac{5}{8}Z$ atomic units with $1\ \mathrm{Ha} = 27.21\ \mathrm{eV}$, compute the first-order estimate of helium's ground-state energy. (Enter it in eV.)
::: solution
The correction is $+\tfrac{5}{8}\times2\ \mathrm{Ha} = +1.25\ \mathrm{Ha} = +34.0\ \mathrm{eV}$, giving $-108.8 + 34.0 = -74.8\ \mathrm{eV}$. The error against the experimental $-79.0\ \mathrm{eV}$ is $+4.2\ \mathrm{eV}$, the correlation energy plus the imperfection of the unscaled orbitals.
:::
:::

::: exercise The scandium tie {level=2}
Slater's rules give $Z_\mathrm{eff}(3d) = Z_\mathrm{eff}(4s) = 3.00$ for scandium. What does the real atom do, and what does that say about the limits of the rules?
::: solution
Spectroscopy puts scandium's $3d$ electron well below the $4s$ (the $3d$–$4s$ separation is about $1.4\ \mathrm{eV}$, and scandium's chemistry is $3d^{1}4s^{2}$ with ionisation from $4s$). The rules tie because rule 4 assigns every left-hand electron a full $1.00$ screening of the $3d$ electron, ignoring that the $3d$ radial maximum lies *inside* much of the $4s$ density. The tie is an artefact of a two-parameter recipe; the physics — penetration and the contraction of $3d$ across the series — survives, but only the full orbital calculation (or experiment) settles the ordering.
:::
:::

::: exercise Terms of helium's excited configurations {level=2}
List the terms arising from the configurations $1s\,2s$ and $1s\,2p$ of helium, and order each configuration's terms by energy.
::: solution
$1s\,2s$: $S = 0$ or $1$ with $L = 0$, giving $^{1}\mathrm{S}_{0}$ and $^{3}\mathrm{S}_{1}$; the triplet lies lower by the exchange argument ($1s\,2s\ ^{3}\mathrm{S}_{1}$ is helium's metastable state, $19.82\ \mathrm{eV}$ above the ground state). $1s\,2p$: $L = 1$, so $^{1}\mathrm{P}_{1}$ and $^{3}\mathrm{P}_{0,1,2}$; again the triplet lies lower, and within it the levels are nearly equally spaced and nearly unsplit (spin–orbit coupling in helium is tiny). Configurations with one electron in $1s$ and one elsewhere always give singlet–triplet pairs — the two-family spectrum of old quantum mechanics.
:::
:::

::: exercise Derive the p² terms {level=3}
Enumerate the fifteen microstates of the $2p^{2}$ configuration by their $(M_L, M_S)$ values and derive the terms $^{1}\mathrm{S}$, $^{3}\mathrm{P}$, $^{1}\mathrm{D}$ from the table.
::: solution
Tabulate each allowed pair of spin-orbitals (no doubled spin-orbital) by $M_L = m_{l_1} + m_{l_2}$ and $M_S = m_{s_1} + m_{s_2}$. The corners $M_L = \pm 2$ occur only with $M_S = 0$ (two electrons in $m_l = \pm1$ paired): five states with $M_L = -2, \ldots, +2$, all $M_S = 0$ — that is $^{1}\mathrm{D}$. The remaining states include $M_S = \pm 1$ entries with $M_L = -1, 0, +1$: a $3 \times 3$ block of nine states — that is $^{3}\mathrm{P}$. What is left is one state at $M_L = 0, M_S = 0$: $^{1}\mathrm{S}$. Total $5 + 9 + 1 = 15$, and no Pauli-allowed state is left over, so the term list is complete. Hund's rules then pick $^{3}\mathrm{P}$ (largest $S$), $L = 1$ (only triplet option), $J = 0$ (less than half-full): the ground level is $^{3}\mathrm{P}_{0}$, as the carbon spectrum confirms.
:::
:::

::: exercise Helium by the variation method {level=3 check="1.69"}
Replace the nuclear charge $Z = 2$ in both $1s$ orbitals by a variational parameter $Z'$ (the second electron screens the first). The energy in atomic units is $E(Z') = Z'^{2} - 2ZZ' + \tfrac{5}{8}Z'$ with $Z = 2$. Minimise and give the best $Z'$. (Enter $Z'$, dimensionless.)
::: solution
$E(Z') = Z'^{2} - 3.375Z'$, so $\mathrm{d}E/\mathrm{d}Z' = 2Z' - 3.375 = 0$ gives $Z' = 1.6875 \approx 1.69$: each electron sees about $84\ \%$ of the bare charge. The energy is $E = -1.6875^{2}\ \mathrm{Ha} = -2.848\ \mathrm{Ha} = -77.5\ \mathrm{eV}$ — better than first-order perturbation theory ($-74.8\ \mathrm{eV}$) and within $1.5\ \mathrm{eV}$ of experiment, because the scaled orbitals shrink to balance nuclear attraction against repulsion. This is the variation principle in its simplest form, and the template for every orbital optimisation in [[quantum-chemistry/approximation-methods]] and beyond.
:::
:::
