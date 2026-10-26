Sodium is a soft metal that tarnishes in seconds in air and reacts with water. Chlorine is a choking yellow-green gas. Between them in the third row of the periodic table lie magnesium, aluminium, silicon, phosphorus and sulfur, and the character of the elements changes step by step across that row: metals, then a semi-metal, then non-metals, then the unreactive argon. One row down, potassium repeats sodium's chemistry more violently; one row up, lithium repeats it more gently. Mendeleev built his table in 1869 on exactly such repetitions, ordering the elements by atomic weight and placing chemically similar elements in the same column. He did not know why the pattern existed. This chapter supplies the reason.

The reason is the arrangement of electrons in the atom. [[general-chemistry-1/quantum-atom]] ended with the orbitals of hydrogen, labelled by $n$, $l$ and $m_l$, and with the warning that in any atom with more than one electron the orbitals of the same $n$ no longer have the same energy. Here we fill those orbitals with electrons, one atom after another, following three rules: an energy ordering (the aufbau principle), a capacity limit (the Pauli principle) and a rule for half-filled sets (Hund's rule). The result is the **electron configuration** of each element. Its outermost part, the **valence** configuration, repeats down each group, and that repetition is the periodic law. We then follow four properties — atomic radius, ionisation energy, electron affinity and electronegativity — across and down the table, and explain each trend by one idea: how strongly the nucleus holds the outermost electrons, given the electrons in between.

Energies of electrons in atoms are quoted in $\mathrm{kJ\,mol^{-1}}$ (per mole of atoms); $1\ \mathrm{eV}$ per atom is $96.485\ \mathrm{kJ\,mol^{-1}}$. Ionisation energies and electron affinities below are converted from the NIST Atomic Spectra Database, covalent radii are those of Cordero and co-workers (2008), ionic radii are Shannon's (1976) for six-coordinate ions, and electronegativities are on the Pauling scale.

## Many-electron atoms: shielding and penetration

The hydrogen atom has one electron and one proton. In lithium, the outermost electron is attracted by a nucleus of charge $+3e$, but it is also repelled by the two inner electrons, which spend most of their time closer to the nucleus. The inner electrons partly cancel, or **shield**, the nuclear charge, and the outer electron behaves roughly as if it were attracted by a smaller charge.

::: definition Effective nuclear charge {#def-zeff}
The **effective nuclear charge** $Z_\mathrm{eff}$ experienced by an electron is the nuclear charge number $Z$ reduced by the average shielding $S$ of the other electrons:

$$
Z_\mathrm{eff} = Z - S.
$$

$Z_\mathrm{eff}$ is a model quantity, not something measured directly. It summarises the net attraction an electron feels, and it is larger for an electron that spends more of its time close to the nucleus, inside the region occupied by the other electrons.
:::

How much of its time an electron spends near the nucleus depends on $l$ as well as on $n$. The radial distribution functions of hydrogen-like orbitals, plotted below, show it. A $2s$ electron has a small inner maximum close to the nucleus, inside the region occupied by $1s$; a $2p$ electron has none. We say the $2s$ orbital **penetrates** the $1s$ core more than $2p$ does. A penetrating electron is shielded less, feels a larger $Z_\mathrm{eff}$, and is bound more tightly. That is why, in every atom with more than one electron, $2s$ lies below $2p$, and why in general, for the same $n$,

$$
ns < np < nd < nf
$$

in energy.

::: widget plot
f: 4*x^2*exp(-2*x); x^2*(2-x)^2*exp(-x)/8; x^4*exp(-x)/24
x: 0, 15
y: 0, 0.6
labels: 1s; 2s; 2p
caption: Radial distribution functions $P(r) = r^{2}R(r)^{2}$ of the hydrogen $1s$, $2s$ and $2p$ orbitals, with the distance $r$ from the nucleus in units of the Bohr radius $a_0 = 52.9\ \mathrm{pm}$. Each curve gives the probability of finding the electron in a thin shell at radius $r$. The $2s$ curve has a small inner hump near $r = 0.76\,a_0$, well inside the $1s$ distribution, and a node at $r = 2a_0$; the $2p$ curve has no inner hump. In a many-electron atom, that inner hump lets a $2s$ electron feel more of the nuclear charge than a $2p$ electron, which places $2s$ lower in energy, although on average the $2s$ electron is slightly further out ($6a_0$ against $5a_0$).
:::

Shielding can be estimated with a set of empirical rules published by John Slater in 1930. They are a bookkeeping device that reproduces the trends, not a calculation from first principles; the honest calculation is the self-consistent field method of [[quantum-chemistry/many-electron-atoms]].

::: algorithm Slater's rules for the shielding constant {#alg-slater}
To estimate $S$ for a chosen electron:

1. Write the configuration in the groups $(1s)(2s,2p)(3s,3p)(3d)(4s,4p)(4d)(4f)(5s,5p)\ldots$, in that order.
2. Electrons in groups to the right of the chosen electron's group contribute nothing.
3. For an $s$ or $p$ electron: each other electron in the same group contributes $0.35$ (but $0.30$ within $1s$); each electron in the shell $n - 1$ contributes $0.85$; each electron in shells $n - 2$ and lower contributes $1.00$.
4. For a $d$ or $f$ electron: each other electron in the same group contributes $0.35$; every electron in groups to its left contributes $1.00$.
5. Sum the contributions to obtain $S$, and $Z_\mathrm{eff} = Z - S$.
:::

::: example Why potassium puts its last electron in 4s {#ex-slater}
(a) Estimate $Z_\mathrm{eff}$ for a $2p$ electron in oxygen and for the $3s$ electron in sodium. (b) In potassium, $Z = 19$, the nineteenth electron could in principle go into $4s$ or $3d$. Estimate $Z_\mathrm{eff}$ for each possibility and say which is more strongly bound.
::: solution
(a) Oxygen is $1s^{2}2s^{2}2p^{4}$. For one $2p$ electron, the other five electrons of the $(2s,2p)$ group contribute $5 \times 0.35 = 1.75$, and the two $1s$ electrons, in shell $n - 1$, contribute $2 \times 0.85 = 1.70$. So $S = 3.45$ and $Z_\mathrm{eff} = 8 - 3.45 = 4.55$.

Sodium is $1s^{2}2s^{2}2p^{6}3s^{1}$. The $3s$ electron has no partner in its group. The eight $n = 2$ electrons contribute $8 \times 0.85 = 6.80$ and the two $1s$ electrons, two shells down, contribute $2 \times 1.00 = 2.00$. So $S = 8.80$ and $Z_\mathrm{eff} = 11 - 8.80 = 2.20$. Of sodium's eleven protons, the outer electron "feels" only about two.

(b) The core of potassium is $1s^{2}2s^{2}2p^{6}3s^{2}3p^{6}$, eighteen electrons. If the last electron is $4s$: the eight $(3s,3p)$ electrons are in shell $n - 1$ and contribute $8 \times 0.85 = 6.80$; the ten electrons with $n \le 2$ contribute $10 \times 1.00 = 10.00$. So $S = 16.80$ and $Z_\mathrm{eff} = 2.20$. If the last electron is $3d$: all eighteen core electrons are in groups to its left and contribute $1.00$ each, so $S = 18.00$ and $Z_\mathrm{eff} = 1.00$.

A $4s$ electron feels about twice the effective charge of a $3d$ electron in potassium, so it is more strongly bound, and potassium is $[\mathrm{Ar}]\,4s^{1}$. The difference comes entirely from penetration: the rules give $3d$ no credit for getting inside the $n = 3$ core, because a $3d$ orbital, with no radial nodes, does not get inside it. Slater's numbers are rough — the measured ionisation energy of sodium corresponds to $Z_\mathrm{eff}$ nearer $1.8$ (see the exercises) — but the ordering they predict is right.
:::
:::

## The Pauli principle and Hund's rule

Energy ordering alone would put every electron into $1s$. Something stops that, and it is not electrostatic repulsion.

::: definition The Pauli exclusion principle {#def-pauli}
No two electrons in an atom can have the same set of four quantum numbers $(n, l, m_l, m_s)$. Consequently an orbital, fixed by $(n, l, m_l)$, holds at most two electrons, and if it holds two they have opposite spins, $m_s = +\tfrac12$ and $-\tfrac12$ (they are **paired**). A subshell with quantum number $l$ contains $2l + 1$ orbitals and therefore holds at most $2(2l + 1)$ electrons: $2$ for $s$, $6$ for $p$, $10$ for $d$, $14$ for $f$. A shell of principal quantum number $n$ holds at most $2n^{2}$.
:::

The Pauli principle is a fundamental law of quantum mechanics for electrons and all other particles of half-integer spin, not a consequence of anything in this course. It is the reason matter has volume: if electrons could all crowd into the lowest orbital, atoms would collapse to the size of $1s$ and there would be no chemistry of the kind we know.

::: definition Hund's rule {#def-hund}
When electrons occupy a set of orbitals of equal energy (a **degenerate** set, such as the three $2p$ orbitals), the lowest-energy arrangement places them in separate orbitals with parallel spins as far as possible, before any orbital receives a second electron. The ground state has the maximum number of unpaired electrons. Hund's rule is an empirical rule, derived from atomic spectra, for the ground state of the free atom.
:::

The physical reason is partly electrostatic: two electrons in different orbitals are, on average, further apart than two in the same orbital, and electrons with parallel spins tend to avoid each other (a quantum-mechanical effect called exchange), which lowers their mutual repulsion. Configurations are often drawn as orbital boxes. For nitrogen, $1s^{2}2s^{2}2p^{3}$, the three $2p$ electrons are $\uparrow\ \uparrow\ \uparrow$ in three separate boxes, not $\uparrow\downarrow\ \uparrow\ \ \,$. Nitrogen has three unpaired electrons, and oxygen, $2p^{4}$, has two: $\uparrow\downarrow\ \uparrow\ \uparrow$.

Unpaired electrons are measurable. A substance whose atoms or ions have unpaired electrons is **paramagnetic** — drawn into a magnetic field — and one with all electrons paired is **diamagnetic**, weakly repelled. Counting unpaired electrons from a configuration is therefore a prediction that can be checked with a magnet.

## Building up the periodic table

With an energy order and a capacity, electron configurations follow by adding one electron at a time.

::: algorithm The aufbau principle {#alg-aufbau}
To write the ground-state configuration of a neutral atom of atomic number $Z$:

1. Place $Z$ electrons into subshells in order of increasing energy. For neutral atoms the order is given, to a good approximation, by the **$(n + l)$ rule**: fill subshells in order of increasing $n + l$, and for equal $n + l$, in order of increasing $n$. This gives
$$
1s,\ 2s,\ 2p,\ 3s,\ 3p,\ 4s,\ 3d,\ 4p,\ 5s,\ 4d,\ 5p,\ 6s,\ 4f,\ 5d,\ 6p,\ 7s,\ 5f,\ 6d,\ 7p.
$$
2. Put at most $2$, $6$, $10$ or $14$ electrons in an $s$, $p$, $d$ or $f$ subshell (Pauli).
3. Within a partly filled subshell, occupy orbitals singly with parallel spins before pairing (Hund).
4. Write the configuration in order of $n$ (for example $[\mathrm{Ar}]\,3d^{6}4s^{2}$), using the symbol of the preceding noble gas in square brackets for the **core**.

The $(n + l)$ rule is empirical. It describes the order in which subshells *fill* as $Z$ increases across the table; it is not a fixed ordering of orbital energies within any one atom, and it has exceptions.
:::

The exceptions in the first transition series are chromium and copper. The rule predicts $[\mathrm{Ar}]\,3d^{4}4s^{2}$ for chromium and $[\mathrm{Ar}]\,3d^{9}4s^{2}$ for copper; the ground states are $[\mathrm{Ar}]\,3d^{5}4s^{1}$ and $[\mathrm{Ar}]\,3d^{10}4s^{1}$. The $4s$ and $3d$ subshells are so close in energy at this point that the balance of electron–electron repulsions decides, and a half-filled or filled $d$ subshell happens to win. More exceptions occur among the heavier transition metals, the lanthanoids and the actinoids. They are facts to be learned from data, not predictions of the simple scheme.

A second subtlety concerns ions. Once the $3d$ subshell is occupied, it lies *below* $4s$ in energy, so a transition-metal atom loses its $4s$ electrons first when it forms a cation. Iron is $[\mathrm{Ar}]\,3d^{6}4s^{2}$, but $\mathrm{Fe^{2+}}$ is $[\mathrm{Ar}]\,3d^{6}$, not $[\mathrm{Ar}]\,3d^{4}4s^{2}$, and $\mathrm{Fe^{3+}}$ is $[\mathrm{Ar}]\,3d^{5}$.

::: example Configurations and unpaired electrons {#ex-config}
Write ground-state configurations for sulfur, iron, $\mathrm{Fe^{3+}}$ and $\mathrm{Cl^{-}}$, and give the number of unpaired electrons in each.
::: solution
*Sulfur*, $Z = 16$: $1s^{2}2s^{2}2p^{6}3s^{2}3p^{4}$, or $[\mathrm{Ne}]\,3s^{2}3p^{4}$. Four electrons in three $3p$ orbitals: by Hund's rule, three go in singly and the fourth pairs, $\uparrow\downarrow\ \uparrow\ \uparrow$. Two unpaired electrons.

*Iron*, $Z = 26$: after $[\mathrm{Ar}]$ (eighteen electrons) the order is $4s$ then $3d$, so the remaining eight electrons give $4s^{2}3d^{6}$, written $[\mathrm{Ar}]\,3d^{6}4s^{2}$. Six electrons in five $3d$ orbitals: five singly, one paired, $\uparrow\downarrow\ \uparrow\ \uparrow\ \uparrow\ \uparrow$. Four unpaired electrons.

*$\mathrm{Fe^{3+}}$*: remove three electrons, the two $4s$ first and then one $3d$: $[\mathrm{Ar}]\,3d^{5}$. Five electrons in five $d$ orbitals, all singly occupied with parallel spins. Five unpaired electrons, the maximum possible for a $d$ subshell; iron(III) compounds are strongly paramagnetic. Removing three $3d$ electrons and keeping $4s^{2}$ would give $[\mathrm{Ar}]\,3d^{3}4s^{2}$, with three unpaired electrons, a prediction that magnetic measurements contradict.

*$\mathrm{Cl^{-}}$*: chlorine, $Z = 17$, is $[\mathrm{Ne}]\,3s^{2}3p^{5}$; the extra electron fills the $3p$ subshell, giving $[\mathrm{Ne}]\,3s^{2}3p^{6}$, the configuration of argon. No unpaired electrons. The noble-gas configuration of the common main-group ions, stated as a pattern in [[general-chemistry-1/formulas-nomenclature]], is this: $\mathrm{Na^{+}}$, $\mathrm{Mg^{2+}}$, $\mathrm{F^{-}}$ and $\mathrm{O^{2-}}$ are all $1s^{2}2s^{2}2p^{6}$, isoelectronic with neon.
:::
:::

### The shape of the table

The periodic table is the aufbau sequence laid out in rows. A new **period** (row) begins each time an electron enters a new principal shell, with an $ns$ electron, and ends when the $np$ subshell is full, at a noble gas. The lengths of the periods follow from the filling order and the subshell capacities:

| period | subshells filled | elements |
|---|---|---|
| 1 | $1s$ | $2$ |
| 2 | $2s,\ 2p$ | $2 + 6 = 8$ |
| 3 | $3s,\ 3p$ | $8$ |
| 4 | $4s,\ 3d,\ 4p$ | $2 + 10 + 6 = 18$ |
| 5 | $5s,\ 4d,\ 5p$ | $18$ |
| 6 | $6s,\ 4f,\ 5d,\ 6p$ | $2 + 14 + 10 + 6 = 32$ |
| 7 | $7s,\ 5f,\ 6d,\ 7p$ | $32$ |

Period 3 has eight elements, not eighteen, although the third shell can hold $2 \times 3^{2} = 18$ electrons: the $3d$ subshell is not filled until after $4s$, in period 4. The table is divided into **blocks** named after the subshell being filled: the $s$ block (groups 1 and 2, and helium), the $p$ block (groups 13 to 18), the $d$ block (groups 3 to 12, the transition metals) and the $f$ block (the lanthanoids and actinoids, usually printed below the main table to keep it narrow).

Elements in the same group have the same valence configuration with a different $n$: every group 1 element is $ns^{1}$, every group 17 element $ns^{2}np^{5}$. That is the electronic content of Mendeleev's columns. For main-group elements the number of valence electrons is the group number for groups 1 and 2 and the group number minus ten for groups 13 to 18.

## Periodic trends

Each of the following properties is governed by two things: the principal quantum number $n$ of the outermost electrons, which sets their typical distance from the nucleus, and the effective nuclear charge they feel. Across a period, $n$ is fixed and $Z_\mathrm{eff}$ rises, because each added proton is only partly shielded by an added electron in the same shell (Slater gives $0.35$ shielding against $1$ unit of extra charge, so $Z_\mathrm{eff}$ rises by about $0.65$ per element). Down a group, $n$ increases and $Z_\mathrm{eff}$ for the valence electrons changes only slowly.

### Atomic and ionic radius

An atom has no sharp edge, so its radius is defined operationally. The **covalent radius** is half the distance between two identical atoms joined by a single bond; the **metallic radius** is half the distance between neighbouring atoms in a metal; the **ionic radius** is a share of the distance between neighbouring ions in a crystal. The covalent radii of the period-2 elements fall steadily from lithium to fluorine — $128$, $96$, $84$, $76$, $71$, $66$ and $57\ \mathrm{pm}$ for $\mathrm{Li}$, $\mathrm{Be}$, $\mathrm{B}$, $\mathrm{C}$, $\mathrm{N}$, $\mathrm{O}$, $\mathrm{F}$ — because the same $n = 2$ shell is pulled in by a rising $Z_\mathrm{eff}$. Down group 1 they rise — $128$, $166$, $203$, $220$ and $244\ \mathrm{pm}$ for $\mathrm{Li}$, $\mathrm{Na}$, $\mathrm{K}$, $\mathrm{Rb}$, $\mathrm{Cs}$ — because each step adds a shell.

Ions follow the same logic. A cation is smaller than its parent atom, because it has lost its outermost shell or at least reduced the repulsion among the remaining electrons; an anion is larger. In an **isoelectronic series** — ions with the same number of electrons — the radius falls as the nuclear charge rises: $\mathrm{O^{2-}}$ $140\ \mathrm{pm}$, $\mathrm{F^{-}}$ $133\ \mathrm{pm}$, $\mathrm{Na^{+}}$ $102\ \mathrm{pm}$, $\mathrm{Mg^{2+}}$ $72\ \mathrm{pm}$, $\mathrm{Al^{3+}}$ $54\ \mathrm{pm}$, all ten-electron ions with $Z$ from $8$ to $13$.

### Ionisation energy

::: definition Ionisation energy {#def-ie}
The **first ionisation energy** $I_1$ of an element is the minimum energy needed to remove one electron from a gaseous atom in its ground state,

$$
\mathrm{X(g)} \rightarrow \mathrm{X^{+}(g)} + \mathrm{e^{-}(g)},
$$

usually quoted per mole of atoms. The **second ionisation energy** $I_2$ is the energy for $\mathrm{X^{+}(g)} \rightarrow \mathrm{X^{2+}(g)} + \mathrm{e^{-}(g)}$, and so on. Ionisation energies are always positive: removing an electron from a neutral atom always costs energy. Successive ionisation energies always increase, $I_1 < I_2 < I_3 < \cdots$, because each electron is removed from an increasingly positive ion.
:::

For hydrogen, $I_1 = 1312\ \mathrm{kJ\,mol^{-1}}$, the value calculated from the Bohr energy in [[general-chemistry-1/quantum-atom]]. For the first twenty elements the measured values are plotted below.

::: widget plot
f: 1312
x: 0, 21
y: 0, 2600
points: 1,1312; 2,2372; 3,520; 4,900; 5,801; 6,1086; 7,1402; 8,1314; 9,1681; 10,2081; 11,496; 12,738; 13,578; 14,787; 15,1012; 16,1000; 17,1251; 18,1521; 19,419; 20,590
labels: I_1(\mathrm{H})
caption: First ionisation energies (in $\mathrm{kJ\,mol^{-1}}$) of the elements $Z = 1$ (hydrogen) to $Z = 20$ (calcium), from the NIST Atomic Spectra Database. The horizontal line marks hydrogen's $1312\ \mathrm{kJ\,mol^{-1}}$. Each period starts with a sharp drop at an alkali metal ($Z = 3, 11, 19$) and climbs to a noble gas ($Z = 2, 10, 18$), with two small dips in each of periods 2 and 3: at boron and aluminium ($Z = 5, 13$), and at oxygen and sulfur ($Z = 8, 16$).
:::

The overall pattern follows from $Z_\mathrm{eff}$ and $n$. Across a period $I_1$ rises, from $520\ \mathrm{kJ\,mol^{-1}}$ for lithium to $2081\ \mathrm{kJ\,mol^{-1}}$ for neon, as the effective charge on the $n = 2$ electrons rises. At the start of the next period it collapses, to $496\ \mathrm{kJ\,mol^{-1}}$ for sodium, because the outermost electron is now in $n = 3$, further out and well shielded. Down a group $I_1$ falls: $520$, $496$ and $419\ \mathrm{kJ\,mol^{-1}}$ for lithium, sodium and potassium. Low ionisation energy is why the alkali metals are such strong reducing agents, and why reactivity with water increases down the group.

The two small dips are the configuration showing through. Boron ($800.6\ \mathrm{kJ\,mol^{-1}}$) is below beryllium ($899.5$) because its outermost electron is $2p$, which penetrates less than $2s$ and is less firmly held. Oxygen ($1313.9$) is below nitrogen ($1402.3$) because oxygen's fourth $2p$ electron must pair in an orbital already occupied, and the extra repulsion from its partner makes it easier to remove; nitrogen's half-filled $2p^{3}$ has no paired $p$ electron. The same two dips recur one period later, at aluminium and sulfur. These irregularities are the most direct evidence that the subshell structure is real.

::: example Successive ionisation energies of magnesium {#ex-successive}
The first three ionisation energies of magnesium are $737.7$, $1450.7$ and $7732.7\ \mathrm{kJ\,mol^{-1}}$. Explain the pattern, and compute the energy needed to convert one mole of gaseous magnesium atoms into $\mathrm{Mg^{2+}(g)}$.
::: solution
Magnesium is $[\mathrm{Ne}]\,3s^{2}$. The first two electrons come from $3s$. The second costs about twice the first ($1450.7/737.7 = 1.97$) because it is removed from a positive ion, $\mathrm{Mg^{+}}$, and no longer shielded by the other $3s$ electron. The third must come from the $2p$ subshell of the neon core, much closer to the nucleus and feeling a much larger effective charge: $I_3$ is $5.3$ times $I_2$. The jump marks the boundary between valence and core electrons. Magnesium forms $\mathrm{Mg^{2+}}$, never $\mathrm{Mg^{3+}}$, in its compounds, because no chemical bond could repay $7.7\ \mathrm{MJ\,mol^{-1}}$.

To form $\mathrm{Mg^{2+}(g)}$ from $\mathrm{Mg(g)}$ needs both of the first two steps:

$$
I_1 + I_2 = 737.7 + 1450.7 = 2188.4\ \mathrm{kJ\,mol^{-1}}.
$$

That is a large energy, and yet magnesium compounds contain $\mathrm{Mg^{2+}}$. The energy is repaid by the strong attraction between a doubly charged cation and its anions in the lattice, an accounting done with the Born–Haber cycle of [[bonding-structure/ionic-bonding]].
:::
:::

### Electron affinity

::: definition Electron affinity {#def-ea}
The **electron affinity** $E_\mathrm{ea}$ of an element is the energy released when an electron is added to a gaseous atom in its ground state,

$$
\mathrm{X(g)} + \mathrm{e^{-}(g)} \rightarrow \mathrm{X^{-}(g)}.
$$

It is positive when the anion is lower in energy than the atom and the electron, so that energy is released. The enthalpy change of the process, the **electron-gain enthalpy**, has (approximately) the opposite sign, $\Delta_\mathrm{eg}H \approx -E_\mathrm{ea}$. Texts differ in which of the two they tabulate, and so in the sign; always check the definition before comparing numbers.
:::

Electron affinities are smaller than ionisation energies and less regular. The halogens have the largest, because an added electron completes their $np$ subshell and feels a large $Z_\mathrm{eff}$: $E_\mathrm{ea}$ is $328$, $349$, $325$ and $295\ \mathrm{kJ\,mol^{-1}}$ for fluorine, chlorine, bromine and iodine. Oxygen ($141$) and carbon ($122$) are moderate. Atoms whose added electron would have to enter a new, poorly shielded subshell do not form stable gaseous anions at all: the noble gases, beryllium ($2s^{2}$, the electron would go into $2p$) and nitrogen (the electron would pair in the half-filled $2p^{3}$) all have negative or near-zero electron affinities.

Fluorine's value is below chlorine's, against the group trend. The fluorine atom is so small that an added electron is crowded among the seven already in the compact $n = 2$ shell, and the extra repulsion outweighs the larger nuclear attraction. Small first-row atoms often break their group's trend for the same reason; the anomalies of fluorine, oxygen and nitrogen chemistry are developed in [[main-group/periodic-trends]].

### Electronegativity

Ionisation energy and electron affinity are properties of isolated atoms. Chemists want a property of an atom *in a bond*: how strongly it pulls shared electrons towards itself.

::: definition Electronegativity {#def-en}
The **electronegativity** $\chi$ of an element is a measure of the power of its atoms in a molecule to attract shared electrons to themselves. It is not directly measurable; it is defined by a scale. On the **Pauling scale**, derived from bond energies, fluorine is the most electronegative element, $\chi = 3.98$, and caesium among the least, $\chi = 0.79$. Representative values: $\mathrm{H}$ $2.20$; $\mathrm{Li}$ $0.98$, $\mathrm{C}$ $2.55$, $\mathrm{N}$ $3.04$, $\mathrm{O}$ $3.44$, $\mathrm{F}$ $3.98$; $\mathrm{Na}$ $0.93$, $\mathrm{Cl}$ $3.16$; $\mathrm{K}$ $0.82$.
:::

Electronegativity rises across a period and falls down a group, for the same reasons as ionisation energy: a large $Z_\mathrm{eff}$ acting at a small distance pulls hard on electrons, whether they are an atom's own or shared with a neighbour. Robert Mulliken proposed an alternative definition, the average of the ionisation energy and the electron affinity, which makes that connection explicit and correlates well with Pauling's values. The difference in electronegativity between two bonded atoms decides how unevenly the bonding electrons are shared: large for $\mathrm{NaCl}$ ($3.16 - 0.93 = 2.23$, an ionic compound), moderate for $\mathrm{H{-}Cl}$ ($0.96$, a polar covalent bond), zero for $\mathrm{Cl{-}Cl}$. That continuum from ionic to covalent, mentioned in [[general-chemistry-1/formulas-nomenclature]], is the subject of [[bonding-structure/covalent-lewis]].

::: example Ordering four elements by size and electronegativity {#ex-trends}
Without looking up data, rank potassium, sodium, magnesium and chlorine (a) by atomic radius and (b) by electronegativity. Then check the predictions against the covalent radii ($\mathrm{K}$ $203$, $\mathrm{Na}$ $166$, $\mathrm{Mg}$ $141$, $\mathrm{Cl}$ $102\ \mathrm{pm}$) and Pauling electronegativities ($\mathrm{K}$ $0.82$, $\mathrm{Na}$ $0.93$, $\mathrm{Mg}$ $1.31$, $\mathrm{Cl}$ $3.16$), and say which pair of these elements forms the most ionic compound.
::: solution
Locate the elements first. Sodium, magnesium and chlorine are in period 3, in groups 1, 2 and 17; potassium is below sodium in period 4.

(a) Across period 3 the valence electrons stay in $n = 3$ while $Z_\mathrm{eff}$ rises, so the radius falls: $\mathrm{Na} > \mathrm{Mg} > \mathrm{Cl}$. Potassium has its valence electron in $n = 4$, a shell further out, so it is larger than sodium. The prediction is $\mathrm{K} > \mathrm{Na} > \mathrm{Mg} > \mathrm{Cl}$, and the radii, $203 > 166 > 141 > 102\ \mathrm{pm}$, agree.

(b) Electronegativity runs the other way: it rises across a period and falls down a group, so $\mathrm{K} < \mathrm{Na} < \mathrm{Mg} < \mathrm{Cl}$. The Pauling values, $0.82 < 0.93 < 1.31 < 3.16$, agree.

The most ionic compound is formed by the pair with the largest electronegativity difference, potassium and chlorine: $3.16 - 0.82 = 2.34$, against $2.23$ for $\mathrm{NaCl}$ and $1.85$ for $\mathrm{MgCl_2}$. The two rankings are mirror images because they have the same cause: an atom whose outer electrons feel a large effective charge at a small distance holds them tightly (small radius) and pulls on shared electrons strongly (high electronegativity). The trends are not a list of separate facts to memorise; they are one fact seen four ways.
:::
:::

::: warning Four misreadings of the trends {#warn-trends}
*"Atoms get bigger as they gain protons."* Across a period they get smaller: more protons pull the same shell in. Size increases only down a group, when a new shell is added. *"4s is always lower than 3d."* The $(n + l)$ rule describes the order of filling across the table. In a transition-metal atom or ion, once $3d$ is occupied, $4s$ electrons are the first to leave, so $\mathrm{Fe^{2+}}$ is $[\mathrm{Ar}]\,3d^{6}$. *"Electron affinity is negative for the halogens."* It is positive in the definition used here (energy released) and negative in the enthalpy convention; the physics is the same, so read the definition before the number. *"Noble-gas configurations are stable, so atoms want them."* An isolated sodium atom does not "want" to lose an electron; ionisation always costs energy. Ionic compounds form because the lattice energy repays the cost, not because the ions are low in energy on their own.
:::

::: quiz
Which atom or ion has the largest radius?
- [ ] $\mathrm{Na^{+}}$
- [ ] $\mathrm{F^{-}}$
- [x] $\mathrm{O^{2-}}$
- [ ] $\mathrm{Mg^{2+}}$
::: solution
All four have ten electrons, the configuration $1s^{2}2s^{2}2p^{6}$, so they form an isoelectronic series and the radius is set by the nuclear charge alone. Oxygen has the fewest protons, eight, holding ten electrons, so $\mathrm{O^{2-}}$ is the largest ($140\ \mathrm{pm}$); magnesium has twelve and $\mathrm{Mg^{2+}}$ is the smallest ($72\ \mathrm{pm}$).
:::
:::

::: history
Dmitri Mendeleev published his periodic system in 1869, ordering the elements by atomic weight, leaving gaps for undiscovered elements and predicting their properties; the discoveries of gallium (1875), scandium (1879) and germanium (1886) matched his predictions closely. Henry Moseley, in 1913–1914, showed from the X-ray spectra of the elements that the square root of the characteristic X-ray frequency rises linearly with a whole number, the nuclear charge, and that this atomic number, not the atomic weight, fixes an element's place; the few pairs Mendeleev had placed against the weight order, such as tellurium and iodine, were thereby vindicated. Niels Bohr, in the early 1920s, explained the lengths of the periods by the successive filling of electron shells. Wolfgang Pauli stated the exclusion principle in 1925, and Friedrich Hund formulated his rules for the ground states of atoms from atomic spectra in the same period. John Slater published his rules for screening constants in 1930, and Linus Pauling introduced his electronegativity scale, derived from bond energies, in 1932.
:::

## Where this leads

Electron configurations and effective nuclear charge are the explanation behind almost everything in the next stage of the curriculum. The charges of the common ions and the energies of forming them feed the lattice energies and Born–Haber cycles of [[bonding-structure/ionic-bonding]]; electronegativity differences decide the polarity of bonds in [[bonding-structure/covalent-lewis]]; the number of valence electrons sets the shapes of molecules in [[bonding-structure/vsepr]]. The main-group trends introduced here — and the anomalies of the first row and of the heavy elements — are developed element by element in [[main-group/periodic-trends]]. The $d$-electron counts and unpaired electrons of transition-metal ions are the starting point of [[coordination-chemistry/crystal-field-theory]] and [[coordination-chemistry/magnetism]]. And the rules used here as empirical recipes — shielding, penetration, the $(n + l)$ order, Hund's rule — are derived, with their limitations, in [[quantum-chemistry/many-electron-atoms]].

::: summary
- In a many-electron atom an electron feels an effective nuclear charge $Z_\mathrm{eff} = Z - S$; inner electrons shield, and penetrating orbitals ($s$ more than $p$, $p$ more than $d$) are shielded less, so within a shell $ns < np < nd$.
- The Pauli principle limits each orbital to two electrons of opposite spin, so subshells hold $2$, $6$, $10$ and $14$ electrons and a shell holds $2n^{2}$.
- Configurations are built by filling subshells in the $(n + l)$ order $1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, \ldots$ (an empirical rule with exceptions such as $\mathrm{Cr}$ and $\mathrm{Cu}$), with Hund's rule maximising unpaired spins in a degenerate set.
- Transition-metal atoms lose their $ns$ electrons before their $(n-1)d$ electrons when they form cations.
- The periodic table is the aufbau order in rows: periods of $2, 8, 8, 18, 18, 32, 32$ elements, and $s$, $p$, $d$ and $f$ blocks. Elements in a group share a valence configuration.
- Across a period $Z_\mathrm{eff}$ rises: radius falls; ionisation energy, electron affinity and electronegativity broadly rise. Down a group a shell is added: radius rises; ionisation energy and electronegativity fall.
- The dips in $I_1$ at groups 13 and 16, and the large jump between valence and core electrons in successive ionisation energies, are direct evidence for subshells and shells.
:::

## Exercises

::: exercise Unpaired electrons in phosphorus {#exr-p level=1 check="3"}
Write the ground-state electron configuration of phosphorus ($Z = 15$) and state how many unpaired electrons it has. (Enter the number of unpaired electrons.)
::: solution
$1s^{2}2s^{2}2p^{6}3s^{2}3p^{3}$, or $[\mathrm{Ne}]\,3s^{2}3p^{3}$. By Hund's rule the three $3p$ electrons occupy the three $3p$ orbitals singly with parallel spins, so there are $3$ unpaired electrons. Phosphorus is nitrogen's heavier analogue, with the same half-filled $np^{3}$ valence configuration.
:::
:::

::: exercise Counting a period {#exr-period4 level=1 check="18"}
How many elements are there in period 4 of the periodic table? Explain from the subshells filled. (Enter the number of elements.)
::: solution
Period 4 begins with $4s$ (potassium) and ends when $4p$ is full (krypton). In between, the $3d$ subshell fills. The capacities are $2 + 10 + 6 = 18$ electrons, so there are $18$ elements, from $Z = 19$ to $Z = 36$.
:::
:::

::: exercise Energy to ionise a gram of sodium {#exr-na-g level=1 check="21.6"}
The first ionisation energy of sodium is $495.8\ \mathrm{kJ\,mol^{-1}}$. How much energy is needed to ionise all the atoms in $1.000\ \mathrm{g}$ of gaseous sodium atoms to $\mathrm{Na^{+}(g)}$? Use $M(\mathrm{Na}) = 22.990\ \mathrm{g\,mol^{-1}}$. (Enter the energy in kJ, to three significant figures.)
::: solution
$n = 1.000/22.990 = 0.04350\ \mathrm{mol}$, so the energy is $0.04350 \times 495.8 = 21.6\ \mathrm{kJ}$. Ionisation energies are tabulated per mole of atoms, so the conversion is the same mass-to-amount step as in [[general-chemistry-1/atoms-and-moles]].
:::
:::

::: exercise Slater's rules for chlorine {#exr-cl-zeff level=2 check="6.10"}
Use Slater's rules to estimate the effective nuclear charge felt by a $3p$ electron in a chlorine atom. (Enter $Z_\mathrm{eff}$ to two decimal places.)
::: solution
Chlorine, $Z = 17$, is $1s^{2}2s^{2}2p^{6}3s^{2}3p^{5}$. For one $3p$ electron: the other six electrons of the $(3s,3p)$ group contribute $6 \times 0.35 = 2.10$; the eight $n = 2$ electrons contribute $8 \times 0.85 = 6.80$; the two $1s$ electrons contribute $2 \times 1.00 = 2.00$. So $S = 10.90$ and $Z_\mathrm{eff} = 17 - 10.90 = 6.10$. Compare sodium's $3s$ electron, $Z_\mathrm{eff} = 2.20$ from [[#ex-slater]]: across period 3 the effective charge on the valence electrons almost triples, which is why chlorine's ionisation energy ($1251\ \mathrm{kJ\,mol^{-1}}$) is two and a half times sodium's.
:::
:::

::: exercise A cobalt ion {#exr-co2 level=2 check="3"}
Write the ground-state configuration of cobalt ($Z = 27$) and of the ion $\mathrm{Co^{2+}}$. How many unpaired electrons does $\mathrm{Co^{2+}}$ have? (Enter the number of unpaired electrons.)
::: solution
Cobalt: $[\mathrm{Ar}]\,3d^{7}4s^{2}$. The cation loses its $4s$ electrons first, so $\mathrm{Co^{2+}}$ is $[\mathrm{Ar}]\,3d^{7}$. Seven electrons in five $d$ orbitals: five singly, then two paired, $\uparrow\downarrow\ \uparrow\downarrow\ \uparrow\ \uparrow\ \uparrow$. There are $3$ unpaired electrons, and $\mathrm{Co^{2+}}$ salts are paramagnetic. (In compounds the five $d$ orbitals are no longer all of equal energy, and some complexes of $\mathrm{Co^{2+}}$ have only one unpaired electron; that refinement is [[coordination-chemistry/crystal-field-theory]]. The free ion follows Hund's rule as written.)
:::
:::

::: exercise Identify the group {#exr-group level=2 check="3"}
The first four ionisation energies of an element in period 3 are $577.5$, $1816.7$, $2744.8$ and $11\,577\ \mathrm{kJ\,mol^{-1}}$. How many valence electrons does it have, and which element is it? (Enter the number of valence electrons.)
::: solution
Look for the large jump. The ratios of successive values are $1816.7/577.5 = 3.15$, $2744.8/1816.7 = 1.51$ and $11\,577/2744.8 = 4.22$. The largest jump is between $I_3$ and $I_4$, so three electrons are removed before the core is reached: the element has $3$ valence electrons and is in group 13. In period 3 that is aluminium, $[\mathrm{Ne}]\,3s^{2}3p^{1}$, which forms $\mathrm{Al^{3+}}$. The first ratio is also fairly large, because the first electron comes from $3p$ and the next two from the more penetrating $3s$.
:::
:::

::: exercise Effective charge from an ionisation energy {#exr-zeff-ie level=3 check="1.84"}
For a one-electron atom with nuclear charge $Z$, the Bohr model gives the ionisation energy from level $n$ as $I = (1312\ \mathrm{kJ\,mol^{-1}})\,Z^{2}/n^{2}$. Treat the $3s$ electron of sodium as a single electron moving in the field of an effective charge $Z_\mathrm{eff}$, and use the measured $I_1 = 495.8\ \mathrm{kJ\,mol^{-1}}$ to find $Z_\mathrm{eff}$. Compare the result with Slater's estimate and comment. (Enter $Z_\mathrm{eff}$ to three significant figures.)
::: hint
Replace $Z$ by $Z_\mathrm{eff}$, put $n = 3$, and solve for $Z_\mathrm{eff}$.
:::
::: solution
Setting $495.8 = 1312\,Z_\mathrm{eff}^{2}/3^{2}$ gives

$$
Z_\mathrm{eff} = 3\sqrt{\frac{495.8}{1312}} = 3\sqrt{0.37790} = 3 \times 0.61473 = 1.84.
$$

Slater's rules gave $2.20$ ([[#ex-slater]]). Both say that the outer electron of sodium feels only about two of the eleven nuclear charges, but they disagree in the second figure, and the disagreement is instructive. Neither number is "the" effective charge: the hydrogen-like formula assumes that the electron moves in a pure Coulomb field with a fixed principal quantum number, whereas a real $3s$ electron penetrates the core, where it feels much more than $Z_\mathrm{eff}$, and spends most of its time outside, where it feels less. Slater's rules were fitted to give reasonable orbital sizes and energies across many atoms, not to reproduce one ionisation energy. $Z_\mathrm{eff}$ is a model parameter, and its value depends on the model in which it is defined.
:::
:::

::: exercise The length of period 6 {#exr-period6 level=3 check="32"}
Using the Pauli principle, the allowed values of the quantum numbers from [[general-chemistry-1/quantum-atom]] and the $(n + l)$ filling rule, derive the number of elements in period 6. Explain why it is not $2 \times 6^{2} = 72$. (Enter the number of elements in period 6.)
::: hint
List the subshells with $n + l$ between that of $6s$ and that of $6p$, inclusive, in filling order.
:::
::: solution
A subshell with orbital quantum number $l$ has $2l + 1$ values of $m_l$, and by the Pauli principle holds $2(2l + 1)$ electrons: $2$, $6$, $10$ and $14$ for $s$, $p$, $d$, $f$. Period 6 starts when $6s$ begins to fill ($n + l = 6$) and ends when $6p$ is full ($n + l = 7$). The subshells filled in between, by the $(n + l)$ rule, are:

- $n + l = 6$: $4d$ ($n = 4$), $5p$ ($n = 5$), $6s$ ($n = 6$); of these, $4d$ and $5p$ were filled in period 5, so period 6 starts at $6s$.
- $n + l = 7$: $4f$ ($n = 4$), $5d$ ($n = 5$), $6p$ ($n = 6$), $7s$ ($n = 7$); period 6 takes $4f$, $5d$ and $6p$, and $7s$ begins period 7.

So period 6 fills $6s$, $4f$, $5d$, $6p$, holding $2 + 14 + 10 + 6 = 32$ electrons: $32$ elements, from caesium ($Z = 55$) to radon ($Z = 86$). The number $2n^{2} = 72$ would be the capacity of the whole shell $n = 6$, including $6d$, $6f$, $6g$ and $6h$ subshells that are never reached in period 6 (or, for $6f$ and beyond, in any known element). A period is not a shell: it collects the subshells of *different* shells that lie close together in energy, which is why the periodic table's row lengths are $2, 8, 8, 18, 18, 32, 32$ rather than $2, 8, 18, 32$.
:::
:::

::: exercise Ranking ionisation energies {#exr-rank level=3 check="7"}
Rank the first ionisation energies of $\mathrm{Be}$, $\mathrm{B}$, $\mathrm{C}$, $\mathrm{N}$ and $\mathrm{O}$ from lowest to highest without looking up data, explaining each placement in terms of configurations. Then identify the element with the highest value and give its atomic number. (Enter the atomic number of the element with the highest $I_1$.)
::: solution
The general trend across period 2 is upward, because $Z_\mathrm{eff}$ on the $n = 2$ electrons rises. Two configuration effects interrupt it. Boron, $2s^{2}2p^{1}$, loses a $2p$ electron, less penetrating than beryllium's $2s$, so $I_1(\mathrm{B}) < I_1(\mathrm{Be})$. Oxygen, $2p^{4}$, loses a paired $2p$ electron, so $I_1(\mathrm{O}) < I_1(\mathrm{N})$, where nitrogen's $2p^{3}$ has all three electrons unpaired. Carbon, $2p^{2}$, lies between: higher than beryllium because its $Z_\mathrm{eff}$ is larger, but lower than nitrogen and oxygen. The ranking is

$$
\mathrm{B} < \mathrm{Be} < \mathrm{C} < \mathrm{O} < \mathrm{N},
$$

which the data confirm: $800.6 < 899.5 < 1086.5 < 1313.9 < 1402.3\ \mathrm{kJ\,mol^{-1}}$. The highest is nitrogen, atomic number $7$. Notice that oxygen's dip is small — only $88\ \mathrm{kJ\,mol^{-1}}$ below nitrogen, and still far above carbon — because the pairing penalty is a modest correction to the steady rise in effective nuclear charge.
:::
:::
