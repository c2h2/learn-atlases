In 1827 the Danish pharmacist William Christopher Zeise boiled platinum(IV) chloride with ethanol, added potassium chloride, and obtained yellow crystals that contained a molecule of ethene bound to platinum: $\mathrm{K[PtCl_3(C_2H_4)]\cdot H_2O}$, Zeise's salt. Nobody could say how a saturated metal ion could hold an unsaturated hydrocarbon without destroying it, and the question waited 125 years for an answer. Today compounds with metal–carbon bonds are made by the tonne: every polyethylene bottle was grown on a titanium or chromium alkyl, almost every modern drug candidate passes through a palladium–aryl intermediate, and the acetic acid in industrial vinegar is made from methanol on a rhodium or iridium methyl complex. This course is about how those compounds are built, what they do, and how their elementary reactions combine into catalytic cycles.

This first chapter supplies the bookkeeping. We ask what an organometallic compound is, how polar its metal–carbon bond is, and — above all — how to **count electrons** around a transition metal so that we can predict which complexes are stable, which are reactive, and which have a vacant site waiting for a substrate. The counting rests on the molecular-orbital picture of [[coordination-chemistry/ligand-field-mo]], where the 18-electron rule was introduced for octahedral carbonyls; here we extend it to alkyls, hydrides, allyls, cyclopentadienyls, arenes and metal clusters, and learn where it fails.

## The metal–carbon bond

::: definition Organometallic compound {#def-organometallic}
An **organometallic compound** contains at least one direct bond between a metal (or a metalloid such as boron or silicon, by convention) and a carbon atom of an organic group. Metal carbonyls such as $\mathrm{[Ni(CO)_4]}$ and cyanide complexes have M–C bonds and are usually counted as organometallic; metal alkoxides $\mathrm{M{-}OR}$ and amine complexes, whose organic group is attached through oxygen or nitrogen, are not. The number of contiguous ligand atoms bound to the metal is the **hapticity**, written $\eta^n$ ("eta-$n$"): an ethene bound side-on is $\eta^2$, an allyl bound through all three carbons is $\eta^3$, a planar cyclopentadienyl ring bound through all five carbons is $\eta^5$. A ligand that bridges $k$ metal atoms is written $\mu_k$ (simply $\mu$ for two).
:::

The metal–carbon bond spans the full range from nearly ionic to nearly covalent, and its polarity controls almost everything about its chemistry. Carbon has a Pauling electronegativity of $2.55$; lithium has $0.98$, magnesium $1.31$, zinc $1.65$, boron $2.04$, silicon $1.90$, palladium $2.20$ and platinum $2.28$. In every case carbon is the negative end of the bond, so an organometallic group behaves as a *carbanion equivalent*: it is a nucleophile and a base. Pauling's empirical formula for the ionic character of a bond between atoms of electronegativity difference $\Delta\chi$,
$$
\text{ionic character} = 1 - e^{-(\Delta\chi)^2/4},
$$ {#eq-pauling-ionic}
is crude, but it orders the reagents correctly: C–Li about $46\,\%$, C–Mg $32\,\%$, C–Al $20\,\%$, C–Zn $18\,\%$, C–Si $10\,\%$, C–B $6\,\%$ and C–Pd only $3\,\%$. Organolithium compounds attack almost any electrophile, including the ether solvents they are kept in; Grignard reagents add to ketones but not to most esters at low temperature; organozinc and organoboron compounds need a catalyst or an activator before they react with a carbonyl group at all; tetramethylsilane is so unreactive that it is the reference compound of NMR spectroscopy. The trend is the subject of [[organometallics-catalysis/main-group-organometallics]].

::: widget plot
f: 100*(1 - exp(-x^2/4))
x: 0, 2
y: 0, 70
points: 1.57, 46.0; 1.24, 31.9; 0.94, 19.8; 0.90, 18.3; 0.65, 10.0; 0.51, 6.3; 0.35, 3.0
labels: \text{ionic character }/\,\%
caption: Pauling's ionic character, $100\,[1 - e^{-(\Delta\chi)^2/4}]$ per cent, against the electronegativity difference $\Delta\chi$ between carbon ($2.55$) and the metal. The marked points are, from right to left, C–Li, C–Mg, C–Al, C–Zn, C–Si, C–B and C–Pd. The curve is an empirical estimate, not a measurement — real organolithium compounds are aggregates whose bonding is shared among several lithium atoms — but the order it gives, Li > Mg > Al > Zn > Si > B > Pd, is the order of nucleophilic reactivity found in the laboratory.
:::

### Thermodynamic and kinetic stability

For the main-group elements, M–C bonds get weaker down a group. The mean bond enthalpies of the group 14 tetramethyls are roughly $358$ (C–C, in neopentane), $311$ (Si–C), $249$ (Ge–C), $217$ (Sn–C) and $152\ \mathrm{kJ\,mol^{-1}}$ (Pb–C) (values as compiled in Elschenbroich's *Organometallics*): the larger, more diffuse valence orbitals of the heavy atoms overlap less well with carbon $2sp^3$. Tetraethyllead was used as an anti-knock additive precisely because its weak Pb–C bonds break in the engine to give ethyl radicals. For the transition metals the trend is reversed — $5d$ metals form stronger M–C (and M–H) bonds than $3d$ metals — because the $5d$ orbitals are more extended and overlap better, a consequence of relativistic expansion that also explains why platinum and iridium complexes are so often isolable when their nickel and cobalt analogues are not.

For many years it was believed that transition-metal alkyls were *thermodynamically* unstable, because so few simple ones could be isolated: $\mathrm{Ti(CH_2CH_3)_4}$ could not be isolated, and tetramethyltitanium decomposes well below room temperature. Geoffrey Wilkinson's group showed in the early 1970s that the problem is *kinetic*. Typical M–C bond enthalpies (roughly $150$–$300\ \mathrm{kJ\,mol^{-1}}$) are comparable with those of main-group alkyls; what destroys most transition-metal alkyls is an easy low-energy decomposition pathway, above all **β-hydride elimination** ([[organometallics-catalysis/elementary-reactions]]), in which a hydrogen on the carbon β to the metal is transferred to a vacant site on the metal and an alkene is released. Alkyls that have no β-hydrogen — methyl, benzyl, neopentyl $\mathrm{CH_2C(CH_3)_3}$, (trimethylsilyl)methyl $\mathrm{CH_2Si(CH_3)_3}$ — or whose β-hydrogen cannot reach the metal, are far more robust: hexamethyltungsten, $\mathrm{[W(CH_3)_6]}$, was made by Shortland and Wilkinson in 1973, and tetrabenzylzirconium is a commercial chemical. Stability, in organometallic chemistry, almost always means *the absence of a cheap pathway*, not a deep thermodynamic well.

::: warning "Stable" usually means kinetically stable {#warn-stability}
It is tempting to read the isolability of a compound as a statement about bond strength. For organometallic compounds this is usually wrong. Diethylzinc and trimethylaluminium have perfectly respectable M–C bonds, yet they ignite in air, because oxidation to the metal oxide and carbon dioxide is enormously exergonic and has a low barrier. Hexamethyltungsten survives at room temperature not because W–C bonds are strong but because a methyl group has no β-hydrogen to eliminate. Whenever you meet a statement that a compound is "stable", ask: stable to what (heat, air, water, light), and is the stability thermodynamic or kinetic?
:::

## Ligands as L, X and Z: the covalent bond classification

To count electrons we need a consistent way to say how many electrons each ligand brings. Two schemes are in use, and they give the same total if each is applied consistently.

::: definition L, X and Z ligands {#def-lxz}
In the **covalent bond classification** (Malcolm Green, 1995) every metal–ligand interaction is assigned to one of three classes, according to how many electrons the *neutral* ligand contributes to the bond:

- an **L** ligand donates a lone pair (or a bonding pair) to the metal: a two-electron dative bond, $\mathrm{M \leftarrow L}$. Examples: $\mathrm{CO}$, $\mathrm{PR_3}$, $\mathrm{NH_3}$, $\mathrm{H_2O}$, an $\eta^2$-alkene, $\mathrm{H_2}$ in a dihydrogen complex, an N-heterocyclic carbene.
- an **X** ligand is a one-electron radical when neutral, and forms a normal two-electron covalent bond with one electron from the metal and one from the ligand: $\mathrm{H}$, $\mathrm{CH_3}$, $\mathrm{Ph}$, $\mathrm{Cl}$, $\mathrm{OR}$, an $\eta^1$-allyl, an acyl $\mathrm{C(O)R}$.
- a **Z** ligand is a Lewis acid that accepts a pair of electrons *from* the metal: $\mathrm{BR_3}$, $\mathrm{AlCl_3}$. Z ligands are rare and add no electrons to the count.

Polyhapto ligands are combinations: $\eta^3$-allyl is **LX** (three electrons), $\eta^5$-cyclopentadienyl $\mathrm{C_5H_5}$ (Cp) is **L₂X** (five), $\eta^6$-benzene is **L₃** (six), an $\eta^4$-diene is **L₂** (four). A linear nitrosyl $\mathrm{M{-}N{\equiv}O}$ behaves as **LX** (three electrons), a bent nitrosyl as **X** (one).
:::

The alternative, **ionic** method imagines every X ligand removed as a closed-shell anion — hydride $\mathrm{H^-}$, methanide $\mathrm{CH_3^-}$, chloride $\mathrm{Cl^-}$, cyclopentadienide $\mathrm{C_5H_5^-}$ (an aromatic six-π-electron anion) — each donating *two* electrons, and the metal left with the corresponding positive oxidation state. This is the method of the counting algorithm of [[coordination-chemistry/ligand-field-mo]], and it has the advantage of giving the oxidation state and the $d^n$ configuration directly. The covalent method is quicker and avoids having to decide whether, say, NO is $\mathrm{NO^+}$ or $\mathrm{NO^-}$. Both rest on the same four quantities.

::: definition Valence electron count, oxidation state, $d^n$ and coordination number {#def-counts}
For a complex $\mathrm{[M L_\ell X_x]^{q}}$ of a metal in group $g$ of the periodic table (so that the neutral metal atom has $g$ valence electrons: $g = 6$ for Cr, Mo, W; $8$ for Fe, Ru, Os; $10$ for Ni, Pd, Pt), with $\ell$ L-type and $x$ X-type interactions and overall charge $q$:

- the **valence electron count** is $\mathrm{VE} = g + 2\ell + x - q$;
- the **oxidation state** is $\mathrm{OS} = x + q$;
- the **$d$-electron count** is $n = g - \mathrm{OS}$, giving the configuration $d^n$;
- the **coordination number** is $\mathrm{CN} = \ell + x$, counting each L and X interaction (so $\eta^5$-Cp contributes 3 and $\eta^6$-benzene 3).

Each metal–metal bond adds one electron to the count of *each* metal it joins (the two metals share a covalent pair, so each is treated as an X ligand of the other, without changing the oxidation state by convention).
:::

::: proposition The ionic and covalent counts agree {#prop-count-agree}
For any complex $\mathrm{[ML_\ell X_x]^q}$, counting electrons by the ionic method (X ligands as two-electron anions, metal in oxidation state $x + q$) gives the same valence electron count as the covalent method, $\mathrm{VE} = g + 2\ell + x - q$.
:::

::: proof
In the ionic method each X ligand is removed as $\mathrm{X^-}$, taking with it one electron from the metal. A complex of overall charge $q$ therefore contains a metal ion of charge $x + q$, which is the oxidation state. That ion has $g - (x + q)$ valence electrons, all of them $d$ electrons for a transition metal (the $(n+1)s$ level lies above $(n)d$ in an ion). The ligands then donate two electrons each: $2\ell$ from the L ligands and $2x$ from the anions $\mathrm{X^-}$. The total is
$$
\mathrm{VE}_\text{ionic} = \big[g - (x + q)\big] + 2\ell + 2x = g + 2\ell + x - q = \mathrm{VE}_\text{covalent}.
$$
The two methods differ only in which partner is said to "own" the electrons of each M–X bond; the total in the valence shell of the metal is a property of the molecule, not of the bookkeeping. The same algebra shows $n = g - \mathrm{OS}$ is the number of non-bonding (or π-bonding) $d$ electrons left on the metal once every M–X bond is assigned to the ligand.
:::

::: algorithm Counting electrons by the covalent (neutral-ligand) method {#alg-covalent-count}
1. Write the metal's group number $g$ (its number of valence electrons as a neutral atom).
2. Classify every ligand as L, X, or a combination (LX, L₂X, L₃ …) from [[#def-lxz]]; count $\ell$ and $x$.
3. Add one electron for each metal–metal bond.
4. Subtract the overall charge: $\mathrm{VE} = g + 2\ell + x - q$ (plus metal–metal bonds).
5. Find $\mathrm{OS} = x + q$ and $d^n$ with $n = g - \mathrm{OS}$; check that the oxidation state is chemically reasonable.
6. Compare $\mathrm{VE}$ with 18 (or 16 for square-planar $d^8$, [[#prop-16-18]]): a lower count signals a coordinatively unsaturated, potentially reactive complex.
:::

::: example Six counts {#ex-six-counts}
Count the valence electrons and give the oxidation state and $d^n$ of: (a) $\mathrm{[Fe(\eta^5\text{-}C_5H_5)(CO)_2(CH_3)]}$; (b) $\mathrm{[RhCl(PPh_3)_3]}$ (Wilkinson's catalyst); (c) $\mathrm{[Ti(\eta^5\text{-}C_5H_5)_2Cl_2]}$; (d) $\mathrm{[IrCl(CO)(PPh_3)_2]}$ (Vaska's complex); (e) $\mathrm{[W(CH_3)_6]}$; (f) the cobaltocenium ion $\mathrm{[Co(\eta^5\text{-}C_5H_5)_2]^+}$.
::: solution
Use $\mathrm{VE} = g + 2\ell + x - q$ and $\mathrm{OS} = x + q$.

(a) Fe, $g = 8$. Cp is L₂X; two CO are L; $\mathrm{CH_3}$ is X. So $\ell = 4$, $x = 2$, $q = 0$: $\mathrm{VE} = 8 + 8 + 2 = 18$. $\mathrm{OS} = +2$, $d^6$. This "FpMe" complex is a classic air-stable 18-electron alkyl.

(b) Rh, $g = 9$; three $\mathrm{PPh_3}$ (L), one Cl (X): $\mathrm{VE} = 9 + 6 + 1 = 16$. Rh(I), $d^8$, square planar: a 16-electron complex, as expected for $d^8$.

(c) Ti, $g = 4$; two Cp (L₂X each) and two Cl: $\ell = 4$, $x = 4$, $\mathrm{VE} = 4 + 8 + 4 = 16$. Ti(IV), $d^0$. Early transition metals in high oxidation states very often have fewer than 18 electrons: there are no $d$ electrons to fill the remaining orbitals, and steric crowding prevents more ligands from binding.

(d) Ir, $g = 9$; CO and two $\mathrm{PPh_3}$ (L), Cl (X): $\mathrm{VE} = 9 + 6 + 1 = 16$. Ir(I), $d^8$, square planar.

(e) W, $g = 6$; six $\mathrm{CH_3}$ (X): $\mathrm{VE} = 6 + 6 = 12$. W(VI), $d^0$. A 12-electron complex that survives because none of its ligands has a β-hydrogen ([[#warn-stability]]).

(f) Co, $g = 9$; two Cp: $\ell = 4$, $x = 2$, $q = +1$: $\mathrm{VE} = 9 + 8 + 2 - 1 = 18$. Co(III), $d^6$. Neutral cobaltocene has 19 electrons and is a strong reducing agent precisely because losing one electron gives this 18-electron cation.
:::
:::

::: warning Oxidation states are formal {#warn-formal-os}
The oxidation state is a bookkeeping device defined by [[#def-counts]], not a charge on the metal. In $\mathrm{[W(CH_3)_6]}$ tungsten is "W(VI)", but there is nothing like a $\mathrm{W^{6+}}$ ion in the molecule: the W–C bonds are almost non-polar, and computed atomic charges on the tungsten are small. Likewise "Fe(−II)" in $\mathrm{[Fe(CO)_4]^{2-}}$ does not mean that iron carries two negative charges — most of the charge is spread onto the carbonyl oxygens by back-donation. Use the formal oxidation state and $d^n$ count for what they are good for: predicting magnetism, geometry and which elementary reactions are possible (a $d^0$ metal cannot undergo oxidative addition). Do not use them to estimate charges, and do not mix the ionic and covalent methods within one count (counting Cp as five electrons *and* the metal in its ionic oxidation state double-counts one electron).
:::

## Why eighteen? The rule and its exceptions

The main-group octet rule has a transition-metal analogue. A transition-metal atom has nine valence orbitals — one $(n+1)s$, three $(n+1)p$ and five $nd$ — and, just as the octet fills the four $s$ and $p$ orbitals of a second-row atom, eighteen electrons fill all nine.

::: proposition The 18-electron rule (empirical) {#prop-18e-general}
Stable, isolable complexes of low-valent transition metals in groups 6–10 carrying strong σ-donor and π-acceptor ligands (CO, phosphines, alkenes, Cp, arenes, hydride, alkyls) usually have a valence electron count of **18**. Complexes with fewer electrons are **coordinatively unsaturated** and tend to bind further ligands; complexes with more electrons tend to lose a ligand or an electron. The rule is **empirical**: it is an observed regularity with a molecular-orbital rationale, and it has many well-understood exceptions.
:::

::: proof Molecular-orbital rationale
Let the metal bind $m$ ligands ($m \le 9$), each through one σ-donor orbital. The $m$ ligand orbitals combine with $m$ of the nine metal valence orbitals to give $m$ bonding and $m$ antibonding molecular orbitals; for a good σ donor the bonding MOs are low in energy and the antibonding MOs are high. The remaining $9 - m$ metal orbitals have no σ partner and are **non-bonding** — in an octahedral complex these are the three $t_{2g}$ orbitals ($m = 6$, $9 - m = 3$). If the ligands are π acceptors, these non-bonding orbitals overlap with empty ligand $\pi^*$ orbitals and are *lowered* in energy, becoming weakly bonding. The low-lying levels are therefore the $m$ σ-bonding MOs and the $9 - m$ non-bonding or π-bonding MOs: $m + (9 - m) = 9$ orbitals, holding
$$
2m + 2(9 - m) = 18
$$
electrons, independently of $m$. Fewer electrons leave a low-lying orbital empty (a site for an incoming ligand's lone pair); more electrons must occupy a σ-antibonding orbital, which weakens metal–ligand bonds and favours ligand loss. The argument fails whenever one of the "non-bonding" orbitals is pushed high in energy (next proposition), or when the σ-antibonding orbitals are not high (weak-field ligands such as water and halides, for which counts from 12 to 22 are common, as in [[coordination-chemistry/ligand-field-mo]]), or when the metal is so electropositive and its $d$ orbitals so high that the ligands cannot all fit around it (early transition metals, lanthanides).
:::

::: proposition The 16-electron rule for square-planar $d^8$ complexes (empirical) {#prop-16-18}
Square-planar complexes of $d^8$ metals — Rh(I), Ir(I), Ni(II), Pd(II), Pt(II), Au(III) — are stable with **16** valence electrons. C. A. Tolman's "16 and 18 electron rule" (1972) states that diamagnetic organometallic complexes of the transition metals exist in significant concentration only if they have 16 or 18 valence electrons, and that their elementary reactions proceed through intermediates with 16 or 18 electrons. Like its parent, this is an empirical generalisation.
:::

::: proof Rationale
In a square-planar complex ($m = 4$) the four σ-donor orbitals point along $\pm x$ and $\pm y$. The metal $s$, $p_x$, $p_y$ and $d_{x^2-y^2}$ orbitals are used in σ bonding; the $d_{xy}$, $d_{xz}$, $d_{yz}$ and $d_{z^2}$ orbitals are non-bonding (or π-bonding) and hold the eight $d$ electrons. The ninth valence orbital, $p_z$, points perpendicular to the plane, has no ligand to overlap with and, being a $(n+1)p$ orbital, lies well above the $d$ set. It is therefore effectively *not* a low-lying orbital: only eight low-lying orbitals are available, and they hold $2 \times 8 = 16$ electrons. The empty $p_z$ is exactly the orbital through which a fifth ligand attacks a square-planar complex — which is why 16-electron $d^8$ complexes are both stable and reactive, the combination a catalyst needs.
:::

The 16/18 alternation is the rhythm of homogeneous catalysis. A 16-electron complex binds a substrate to become 18-electron; an 18-electron complex loses a ligand to open a site. The table below lists the families that obey and that ignore the rules.

| complex | VE | comment |
|---|---|---|
| $\mathrm{[Cr(CO)_6]}$, $\mathrm{[Fe(CO)_5]}$, $\mathrm{[Ni(CO)_4]}$ | 18 | the binary carbonyls of even-group metals |
| $\mathrm{[Fe(\eta^5\text{-}C_5H_5)_2]}$, $\mathrm{[Cr(\eta^6\text{-}C_6H_6)_2]}$ | 18 | ferrocene, dibenzenechromium |
| $\mathrm{[Mn_2(CO)_{10}]}$, $\mathrm{[Co_2(CO)_8]}$ | 18 per metal | odd-electron fragments pair up through M–M bonds |
| $\mathrm{[V(CO)_6]}$ | 17 | paramagnetic; too crowded to dimerise |
| $\mathrm{[Co(\eta^5\text{-}C_5H_5)_2]}$, $\mathrm{[Ni(\eta^5\text{-}C_5H_5)_2]}$ | 19, 20 | electrons in antibonding orbitals; easily oxidised |
| $\mathrm{[RhCl(PPh_3)_3]}$, $\mathrm{[PtCl_4]^{2-}}$ | 16 | square-planar $d^8$ |
| $\mathrm{[Ti(\eta^5\text{-}C_5H_5)_2Cl_2]}$, $\mathrm{[W(CH_3)_6]}$ | 16, 12 | $d^0$ early metals: too few electrons, too little room |

::: quiz
Which of the following complexes would you expect to be coordinatively unsaturated — that is, to bind an added CO or phosphine readily?
- [x] $\mathrm{[Rh(H)(CO)(PPh_3)_2]}$
- [ ] $\mathrm{[Mo(CO)_6]}$
- [x] $\mathrm{[Pt(PPh_3)_3]}$
- [ ] $\mathrm{[Mn(\eta^5\text{-}C_5H_5)(CO)_3]}$
::: solution
$\mathrm{[RhH(CO)(PPh_3)_2]}$: $9 + 2\times 3 + 1 = 16$ (Rh(I), $d^8$) — the active hydroformylation catalyst of [[organometallics-catalysis/hydrogenation-hydroformylation]], which adds CO or an alkene. $\mathrm{[Pt(PPh_3)_3]}$: $10 + 6 = 16$, a $d^{10}$ complex that is not square planar (trigonal planar) and readily binds a fourth ligand or loses one. $\mathrm{[Mo(CO)_6]}$: $6 + 12 = 18$. $\mathrm{[CpMn(CO)_3]}$: $7 + 5 + 6 = 18$. The two 18-electron complexes substitute only after a ligand has dissociated, and slowly.
:::
:::

## Polyhapto ligands and hapticity changes

Hydrocarbon ligands can change the number of atoms bound to the metal, and every change in hapticity is a change in the electron count. This flexibility is one of the most important sources of reactivity in organometallic chemistry: a ligand that "slips" from $\eta^5$ to $\eta^3$ frees two electrons' worth of room on the metal without leaving it.

| ligand | bound as | class | electrons (covalent) | electrons (ionic, as anion or neutral) |
|---|---|---|---|---|
| alkyl, aryl, H, Cl | $\eta^1$ | X | 1 | 2 ($\mathrm{R^-}$, $\mathrm{H^-}$, $\mathrm{Cl^-}$) |
| CO, $\mathrm{PR_3}$, alkene | $\eta^1$ / $\eta^2$ | L | 2 | 2 |
| allyl $\mathrm{C_3H_5}$ | $\eta^1$ / $\eta^3$ | X / LX | 1 / 3 | 2 / 4 ($\mathrm{C_3H_5^-}$) |
| butadiene | $\eta^4$ | L₂ | 4 | 4 |
| cyclopentadienyl | $\eta^5$ | L₂X | 5 | 6 ($\mathrm{C_5H_5^-}$) |
| benzene | $\eta^6$ | L₃ | 6 | 6 |
| cycloheptatrienyl $\mathrm{C_7H_7}$ | $\eta^7$ | L₃X | 7 | 6 ($\mathrm{C_7H_7^+}$) |
| nitrosyl, linear / bent | $\eta^1$ | LX / X | 3 / 1 | 2 ($\mathrm{NO^+}$) / 2 ($\mathrm{NO^-}$) |

::: example An allyl ligand changes its hapticity {#ex-allyl-slip}
Sodium pentacarbonylmanganate, $\mathrm{Na[Mn(CO)_5]}$, reacts with allyl chloride to give $\mathrm{[Mn(\eta^1\text{-}C_3H_5)(CO)_5]}$. On gentle heating this loses one molecule of CO to give $\mathrm{[Mn(\eta^3\text{-}C_3H_5)(CO)_4]}$. Count both complexes and explain why CO is lost.
::: solution
In $\mathrm{[Mn(\eta^1\text{-}C_3H_5)(CO)_5]}$ the allyl group is bound through its $\mathrm{CH_2}$ carbon only, as an X ligand; its $\mathrm{C{=}C}$ double bond dangles free. Mn has $g = 7$: $\mathrm{VE} = 7 + 5\times 2 + 1 = 18$, Mn(I), $d^6$. On heating, one CO dissociates, leaving a 16-electron $\mathrm{[Mn(\eta^1\text{-}C_3H_5)(CO)_4]}$; the pendant double bond moves in and occupies the vacant site, converting the allyl from X to LX. The product has $\mathrm{VE} = 7 + 4 \times 2 + 3 = 18$ again, still Mn(I). The η¹ → η³ conversion is driven by entropy (one molecule becomes two, and CO escapes as a gas) and by the chelate-like stability of the three-carbon ligand. The two complexes are distinguished by $^{1}\mathrm{H}$ NMR: the η¹-allyl shows a vinyl group, whereas the η³-allyl shows a central CH and two pairs of terminal protons, *syn* and *anti* to the central hydrogen.
:::
:::

The same logic explains the famous **indenyl effect**. The indenyl ligand, a cyclopentadienyl fused to a benzene ring, can slip from $\eta^5$ to $\eta^3$ far more easily than Cp, because in the $\eta^3$ form the benzo ring regains its full aromaticity. A complex like $\mathrm{[Rh(\eta^5\text{-}C_9H_7)(CO)_2]}$ therefore substitutes CO by an associative mechanism — the incoming ligand binds while the ring slips, keeping the count at 18 — and does so many orders of magnitude faster than its Cp analogue. We return to it in [[organometallics-catalysis/elementary-reactions]].

## σ donors, π acceptors and the synergic bond

The ligands in the table above are not equally good at satisfying a metal. Ligands that only donate — $\mathrm{NH_3}$, $\mathrm{H_2O}$, alkyls, hydride — are **σ donors**. Ligands such as CO, isocyanides $\mathrm{CNR}$, phosphines, alkenes and arenes are σ donors *and* **π acceptors**: besides donating a pair of electrons into an empty metal σ orbital, they possess empty orbitals of π symmetry (the $\pi^*$ orbitals of CO and alkenes, the P–C $\sigma^*$ orbitals of phosphines) that accept electron density from filled metal $d$ orbitals. The two interactions reinforce each other. σ donation makes the metal electron-rich, which makes it a better π donor; π back-donation removes the charge that σ donation piles onto a low-valent metal, so the metal can accept more σ density. This **synergic** bond, first described for alkenes by Michael Dewar (1951) and by Joseph Chatt and Leonard Duncanson (1953), is what lets metals in oxidation states 0 or even negative — $\mathrm{Ni(0)}$ in $\mathrm{[Ni(CO)_4]}$, $\mathrm{Fe(-II)}$ in $\mathrm{[Fe(CO)_4]^{2-}}$ — exist at all.

Back-donation is also why the 18-electron rule works best with π acceptors: back-bonding lowers the $9 - m$ "non-bonding" orbitals of the proof of [[#prop-18e-general]], making them genuinely bonding and widening the gap above them. The details — infrared signatures, Tolman's electronic and steric parameters, the metallacyclopropane limit of alkene binding, Fischer and Schrock carbenes — are the subject of [[organometallics-catalysis/ligands-complexes]].

## Metal–metal bonds and clusters

Odd-electron fragments can reach 18 by sharing electrons with one another. Two 17-electron $\mathrm{Mn(CO)_5}$ fragments combine to $\mathrm{[Mn_2(CO)_{10}]}$ with an unbridged Mn–Mn bond; two 17-electron $\mathrm{Co(CO)_4}$ fragments give $\mathrm{[Co_2(CO)_8]}$. Larger aggregates — **clusters** — follow the same logic, at least while they are small.

::: proposition Metal–metal bonds in a cluster obeying the 18-electron rule {#prop-mm-bonds}
For a cluster of $N$ metal atoms with total valence electron count $V$ (the sum of the metal group numbers, plus the ligand electrons, minus the charge, with no metal–metal bonds included), if every metal attains 18 electrons by forming two-centre, two-electron metal–metal bonds, the number of such bonds is
$$
B = \frac{18N - V}{2}.
$$ {#eq-mm-bonds}
:::

::: proof
Each metal–metal bond is a shared electron pair. When we count electrons metal by metal, a bond between metals $i$ and $j$ adds one electron to the count of $i$ and one to the count of $j$ ([[#def-counts]]), so summed over all metals each bond adds $2$ to the total. If every metal has 18, the sum of the individual counts is $18N$; it equals the electrons present without metal–metal bonds, $V$, plus $2B$. Hence $18N = V + 2B$ and $B = (18N - V)/2$. The derivation assumes localised two-centre bonds and that every metal reaches exactly 18, which is reasonable for clusters of up to four or five metals and fails for larger, delocalised ones.
:::

::: example Cluster skeletons from electron counts {#ex-clusters}
Predict the number of metal–metal bonds and the metal skeleton of (a) $\mathrm{[Fe_3(CO)_{12}]}$, (b) $\mathrm{[Co_4(CO)_{12}]}$ and (c) $\mathrm{[Rh_6(CO)_{16}]}$, whose six rhodium atoms are known from X-ray diffraction to form an octahedron.
::: solution
(a) $V = 3 \times 8 + 12 \times 2 = 48$; $B = (54 - 48)/2 = 3$. Three metals joined by three bonds form a **triangle**, as observed (two of the twelve carbonyls bridge one Fe–Fe edge in the solid; the count is unchanged because a bridging CO is still a two-electron L ligand shared between metals).

(b) $V = 4 \times 9 + 24 = 60$; $B = (72 - 60)/2 = 6$. Four atoms joined by six bonds: every pair is bonded, a **tetrahedron**, as observed.

(c) $V = 6 \times 9 + 16 \times 2 = 86$; $B = (108 - 86)/2 = 11$. But an octahedron has **12** edges, all of which are Rh–Rh bonding distances. The localised-bond count fails. Large clusters are better described by delocalised skeletal bonding, as in the boranes of [[main-group/groups-13-14]]: the **polyhedral skeletal electron pair theory** (Wade–Mingos rules) predicts that a *closo* octahedral cluster of transition metals has $14N + 2 = 86$ valence electrons — exactly the count found. The 18-electron rule is a tool for mononuclear complexes and small clusters, and its failure here is information, not error: it tells us the bonding has become delocalised.
:::
:::

### The isolobal analogy

Roald Hoffmann's **isolobal analogy** (Nobel lecture, 1982) connects organometallic fragments to organic ones. Two fragments are **isolobal** if their frontier orbitals have the same number, symmetry, approximate energy and shape, and contain the same number of electrons. A methyl radical $\mathrm{CH_3}$ has one singly occupied $sp^3$-like orbital pointing away from the hydrogens; it is one electron short of an octet. The fragment $\mathrm{Mn(CO)_5}$ — an octahedron with one ligand removed — has one singly occupied hybrid orbital pointing at the vacant site and is one electron short of 18. They are isolobal, written $\mathrm{CH_3} \leftrightarrow \mathrm{Mn(CO)_5}$, and indeed both dimerise (ethane; $\mathrm{[Mn_2(CO)_{10}]}$) and both form $\mathrm{H{-}CH_3}$ / $\mathrm{H{-}Mn(CO)_5}$ and the mixed $\mathrm{CH_3{-}Mn(CO)_5}$. In the same way $\mathrm{CH_2} \leftrightarrow \mathrm{Fe(CO)_4}$ (two orbitals, two electrons short) and $\mathrm{CH} \leftrightarrow \mathrm{Co(CO)_3}$ (three orbitals, three electrons short). The rule of thumb: a fragment that is $k$ electrons short of 18 behaves like an organic fragment $k$ electrons short of 8.

::: example An organometallic tetrahedrane {#ex-isolobal}
The cluster $\mathrm{[Co_3(CO)_9(\mu_3\text{-}CCH_3)]}$ contains a triangle of cobalt atoms capped on one face by a $\mathrm{C{-}CH_3}$ group. Show that it is isolobal with tetrahedrane, $\mathrm{C_4H_4}$ (as its tetramethyl derivative), and check each cobalt's electron count.
::: solution
Each $\mathrm{Co(CO)_3}$ fragment has $9 + 6 = 15$ electrons, three short of 18, with three frontier orbitals: isolobal with $\mathrm{CH}$, which has five electrons, three short of an octet. The capping group $\mathrm{C{-}CH_3}$ is itself a CR fragment with three frontier orbitals. Replacing three CH (or CR) vertices of tetrahedrane by three $\mathrm{Co(CO)_3}$ vertices gives $\mathrm{[Co_3(CO)_9(CR)]}$ — a "tetrahedrane" with three metal corners. Check: each cobalt has $9 + 3\times2$ (CO) $+ 2$ (two Co–Co bonds) $+ 1$ (one bond to the capping carbon) $= 18$. The capping carbon makes three bonds to cobalt and one to $\mathrm{CH_3}$, four in all, like any $sp^3$ carbon. The analogy predicted the cluster's structure from organic chemistry, and the same reasoning explains why $\mathrm{[Co_4(CO)_{12}]}$ (four $\mathrm{Co(CO)_3}$ vertices) is a tetrahedron like $\mathrm{C_4R_4}$.
:::
:::

::: widget graph
nodes: Co1@0,0; Co2@2,0; Co3@1,1.7; C@1,0.6; CH3@1,-1.2
edges: Co1-Co2; Co2-Co3; Co3-Co1; C-Co1; C-Co2; C-Co3; C-CH3
algorithm: none
caption: The skeleton of $\mathrm{[Co_3(CO)_9(\mu_3\text{-}CCH_3)]}$ (the nine terminal carbonyls, three on each cobalt, are omitted). Each node is a vertex of a distorted tetrahedron — three $\mathrm{Co(CO)_3}$ fragments and one CR fragment, each with three frontier orbitals — joined by six two-electron bonds, just as the four CH vertices of tetrahedrane are joined by six C–C bonds. Drag the nodes: the connectivity, not the drawing, carries the electron count. Counting edges at a cobalt node gives three skeletal bonds, which with nine electrons from the metal and six from its carbonyls makes 18.
:::

## Where this leads

The counting rules of this chapter are used on every page that follows. [[organometallics-catalysis/main-group-organometallics]] takes the polar end of the M–C bond spectrum — lithium, magnesium, zinc, boron, silicon — where reactivity is governed by polarity and aggregation rather than by electron counts. [[organometallics-catalysis/ligands-complexes]] examines the ligands one by one and introduces the infrared, steric and electronic measures chemists use to choose them. [[organometallics-catalysis/elementary-reactions]] classifies reactions by what they do to the counts — oxidative addition adds two to the oxidation state, the electron count and the coordination number — and the catalytic cycles of [[organometallics-catalysis/hydrogenation-hydroformylation]], [[organometallics-catalysis/cross-coupling]] and [[organometallics-catalysis/metathesis-polymerisation]] are sequences of 16- and 18-electron species. The symmetry arguments behind the molecular orbitals are in [[quantum-chemistry/molecular-symmetry]], and the cluster rules connect with the boranes of [[main-group/groups-13-14]].

::: history
Zeise's salt (1827) was the first organometallic compound of a transition metal, and Edward Frankland's diethylzinc (1849), made while he was trying to isolate the "ethyl radical", was the first main-group alkyl; Frankland coined the word *organometallic* and drew from these compounds the idea of valence. Ludwig Mond, Carl Langer and Friedrich Quincke discovered tetracarbonylnickel in 1890 when carbon monoxide attacked nickel valves, and Mond turned the volatility of $\mathrm{[Ni(CO)_4]}$ into a nickel-refining process. Irving Langmuir pointed out in 1921 that the stable carbonyls give the metal the electron count of the next noble gas, and Nevil Sidgwick's "effective atomic number" rule (1927) generalised the observation. The modern subject began with ferrocene: Thomas Kealy and Peter Pauson reported $\mathrm{Fe(C_5H_5)_2}$ in *Nature* in 1951 (and Samuel Miller, John Tebboth and John Tremaine independently in 1952), and in 1952 Geoffrey Wilkinson, Myron Rosenblum, Mark Whiting and Robert Woodward, and independently Ernst Otto Fischer and Wolfgang Pfab, proposed the sandwich structure. Fischer and Wilkinson shared the 1973 Nobel Prize in Chemistry. Chadwick Tolman formulated the 16 and 18 electron rule in 1972, Roald Hoffmann set out the isolobal analogy in his 1982 Nobel lecture, and Malcolm Green published the covalent bond classification in 1995.
:::

::: summary
- The M–C bond is polarised towards carbon; its ionic character falls from Li and Mg through Zn and B to the late transition metals, and nucleophilic reactivity falls with it.
- Many transition-metal alkyls are *kinetically* unstable through β-hydride elimination; alkyls without β-hydrogens ($\mathrm{CH_3}$, $\mathrm{CH_2Ph}$, $\mathrm{CH_2CMe_3}$, $\mathrm{CH_2SiMe_3}$) are robust.
- Ligands are L (two-electron donors), X (one-electron, radical-like) or Z (acceptors); polyhapto ligands combine them (η³-allyl LX, η⁵-Cp L₂X, η⁶-arene L₃).
- For $\mathrm{[ML_\ell X_x]^q}$: $\mathrm{VE} = g + 2\ell + x - q$, $\mathrm{OS} = x + q$, $d^n$ with $n = g - \mathrm{OS}$; ionic and covalent counting agree when used consistently.
- The 18-electron rule (16 for square-planar $d^8$) is empirical, rationalised by nine low-lying valence orbitals (eight when $p_z$ is unused); it works for low-valent metals with π-acceptor ligands and fails for $d^0$ early metals, weak-field complexes and large clusters.
- Hapticity changes (η¹ ⇌ η³ allyl, η⁵ ⇌ η³ indenyl) change the electron count and open coordination sites without losing the ligand.
- In small clusters the number of M–M bonds is $(18N - V)/2$; isolobal fragments ($\mathrm{CH_3} \leftrightarrow \mathrm{Mn(CO)_5}$, $\mathrm{CH} \leftrightarrow \mathrm{Co(CO)_3}$) let organic structures predict organometallic ones.
:::

## Exercises

::: exercise A half-sandwich arene complex {level=1 check="18"}
Count the valence electrons of $\mathrm{[Mo(\eta^6\text{-}C_6H_6)(CO)_3]}$. (Enter the valence electron count.)
::: solution
Mo has $g = 6$; η⁶-benzene is L₃ (6 electrons); three CO give 6. $\mathrm{VE} = 6 + 6 + 6 = 18$, Mo(0), $d^6$. The $\mathrm{M(CO)_3}$ "piano stool" is the arene analogue of half of $\mathrm{[Mo(CO)_6]}$: benzene takes the place of three carbonyls.
:::
:::

::: exercise Bis(allyl)nickel {level=1 check="16"}
Count the valence electrons of $\mathrm{[Ni(\eta^3\text{-}C_3H_5)_2]}$. (Enter the valence electron count.)
::: solution
Ni has $g = 10$; each η³-allyl is LX (3 electrons): $\mathrm{VE} = 10 + 3 + 3 = 16$. Oxidation state: $x = 2$, so Ni(II), $d^8$ — a 16-electron $d^8$ complex, as expected. Bis(allyl)nickel is a reactive, air-sensitive compound used as a source of "naked" nickel.
:::
:::

::: exercise The nonahydridorhenate ion {level=1 check="7"}
The ion $\mathrm{[ReH_9]^{2-}}$ has nine hydride ligands. Find the oxidation state of rhenium and the valence electron count. (Enter the oxidation state of Re.)
::: solution
Re is in group 7. With $x = 9$ and $q = -2$: $\mathrm{OS} = x + q = 9 - 2 = +7$, so Re(VII), $d^0$. $\mathrm{VE} = 7 + 9 - (-2) = 18$. A nine-coordinate 18-electron complex: all nine metal valence orbitals are used in σ bonds to hydrogen, the limiting case $m = 9$ of the proof of [[#prop-18e-general]].
:::
:::

::: exercise Ionic character of the C–Al bond {level=1 check="20"}
Using Pauling electronegativities $\chi(\mathrm{C}) = 2.55$ and $\chi(\mathrm{Al}) = 1.61$ and [[#eq-pauling-ionic]], estimate the percentage ionic character of the Al–C bond in trimethylaluminium. (Enter the percentage to two significant figures.)
::: solution
$\Delta\chi = 0.94$, $(\Delta\chi)^2/4 = 0.2209$, $e^{-0.2209} = 0.8018$, so the ionic character is $1 - 0.8018 = 0.198$, i.e. about **20 %**. Between C–Zn ($18\,\%$) and C–Mg ($32\,\%$): trialkylaluminiums are more reactive than dialkylzincs but less than Grignard reagents, and like both they are pyrophoric when neat.
:::
:::

::: exercise Triruthenium dodecacarbonyl {level=2 check="3"}
How many Ru–Ru bonds does $\mathrm{[Ru_3(CO)_{12}]}$ contain if every ruthenium obeys the 18-electron rule? (Enter the number of bonds.)
::: solution
$V = 3 \times 8 + 12 \times 2 = 48$; $B = (3 \times 18 - 48)/2 = 3$: a triangle of Ru atoms, each carrying four terminal carbonyls. Each Ru: $8 + 8 + 2 = 18$. (Unlike its iron analogue, $\mathrm{[Ru_3(CO)_{12}]}$ has no bridging carbonyls; the larger metal triangle makes bridging less favourable.)
:::
:::

::: exercise A five-metal cluster {level=2 check="9"}
The osmium cluster $\mathrm{[Os_5(CO)_{16}]}$ is neutral with only terminal carbonyls. How many Os–Os bonds does [[#prop-mm-bonds]] predict, and which polyhedron with five vertices has that many edges? (Enter the number of bonds.)
::: solution
$V = 5 \times 8 + 16 \times 2 = 72$, $B = (5 \times 18 - 72)/2 = (90 - 72)/2 = 9$. A **trigonal bipyramid** has 9 edges (three in the equatorial triangle and six from the two apices), and that is the observed skeleton of $\mathrm{[Os_5(CO)_{16}]}$. A square pyramid, with 8 edges, would need 74 electrons.
:::
:::

::: exercise Isolobal fragments {level=2 check="2"}
The fragment $\mathrm{Rh(\eta^5\text{-}C_5H_5)(CO)}$ is often described as isolobal with $\mathrm{CH_2}$. How many electrons short of 18 is it? Explain the analogy and predict the structure of $\mathrm{[\{CpRh(CO)\}_2(\mu\text{-}CH_2)]}$. (Enter the number of electrons short of 18.)
::: solution
Rh: $9 + 5$ (Cp) $+ 2$ (CO) $= 16$, so the fragment is **2** electrons short of 18. It has two frontier orbitals — the ones that would point at the two missing ligand positions if the Cp is regarded as occupying three sites of an octahedron — and two electrons in them, exactly like singlet $\mathrm{CH_2}$, which is two short of an octet with two frontier orbitals. Thus $\mathrm{CpRh(CO)} \leftrightarrow \mathrm{CH_2}$, and just as two $\mathrm{CH_2}$ make ethene and three make cyclopropane, compounds such as $\mathrm{[\{CpRh(CO)\}_2(\mu\text{-}CH_2)]}$ — a dimetallacyclopropane with a Rh–Rh bond and a bridging methylene — are the organometallic analogues of cyclopropane. Each Rh: $9 + 5 + 2 + 1$ (Rh–Rh) $+ 1$ (Rh–$\mathrm{CH_2}$) $= 18$.
:::
:::

::: exercise Linear and bent nitrosyls {level=3}
(a) Show that $\mathrm{[Co(CO)_3(NO)]}$ obeys the 18-electron rule only if NO is linear (a three-electron LX ligand), and identify the binary carbonyl with which it is isoelectronic. (b) In the square-pyramidal complex $\mathrm{[IrCl_2(NO)(PPh_3)_2]}$ the nitrosyl occupies the apical site and the Ir–N–O angle is about $123^\circ$. Count the electrons treating NO as bent (one-electron X) and as linear (LX), and explain why the complex chooses the bent form.
::: hint
For (b), count both ways and compare with 18. A bent NO has a lone pair on nitrogen and a double bond to oxygen, like an organic nitroso compound.
:::
::: solution
(a) Linear NO (LX, 3 electrons): $\mathrm{VE} = 9 + 3 \times 2 + 3 = 18$. Bent NO (X, 1 electron) would give 16, and a tetrahedral $d^{10}$-like complex with 16 electrons would be expected to bind another ligand, which it does not. Replacing NO by CO and Co by Ni (one more proton, one fewer electron from the ligand) gives $\mathrm{[Ni(CO)_4]}$: the two molecules are isoelectronic, both tetrahedral and both 18-electron. In ionic language NO is $\mathrm{NO^+}$, isoelectronic with CO, and Co is Co(−I), $d^{10}$, like Ni(0).

(b) With bent NO (X): $\ell = 2$, $x = 3$ (two Cl and NO), $\mathrm{VE} = 9 + 4 + 3 = 16$, Ir(III), $d^6$. With linear NO (LX): $\mathrm{VE} = 9 + 4 + 2 + 3 = 18$, which in ionic language is Ir(I), $d^8$, with $\mathrm{NO^+}$. The linear form looks better by the 18-electron rule, but look at where the last pair of electrons would go. In a square pyramid the four basal ligands push $d_{x^2-y^2}$ high, and a $d^8$ metal must place its fourth pair in $d_{z^2}$, which points straight at the apical ligand and is σ-antibonding with it. Bending the NO lets that pair leave the metal and become a lone pair on nitrogen (an $sp^2$ nitrogen, as in an organic nitroso compound $\mathrm{R{-}N{=}O}$): the metal becomes $d^6$, the antibonding orbital empties, and the complex is a 16-electron Ir(III) species. The nitrosyl is an electron reservoir that switches between three and one electrons as the metal requires, and the M–N–O angle (near $180^\circ$ for linear, near $120^\circ$ for bent) is a structural readout of the choice; ν(NO) also falls markedly in the bent form.
:::
:::

::: exercise When the 18-electron rule meets a bigger cluster {level=3 check="12"}
$\mathrm{[Os_6(CO)_{18}]}$ is a neutral cluster with only terminal carbonyls. (a) Use [[#eq-mm-bonds]] to predict the number of Os–Os bonds. (b) Its structure is a *bicapped tetrahedron* (a tetrahedron with two of its faces capped by further metal atoms). Count the edges of that polyhedron. (c) Compare with $\mathrm{[Rh_6(CO)_{16}]}$ ([[#ex-clusters]]) and explain why two six-metal clusters differ in their skeletons. (Enter the number of Os–Os bonds.)
::: hint
A capping atom on a triangular face makes three new bonds.
:::
::: solution
(a) $V = 6 \times 8 + 18 \times 2 = 84$; $B = (6 \times 18 - 84)/2 = (108 - 84)/2 = 12$.

(b) The tetrahedron has 6 edges; each of the two capping atoms adds 3 bonds to the face it sits on: $6 + 3 + 3 = 12$ edges. The localised count agrees exactly with the observed structure.

(c) $\mathrm{[Rh_6(CO)_{16}]}$ has 86 electrons, two more than $\mathrm{[Os_6(CO)_{18}]}$, and the localised count gives 11 bonds — but its octahedron has 12 edges. The two clusters are both "six metals", yet a bicapped tetrahedron is built from fused triangles in which two-centre bonds along each edge are a good description, whereas a closed octahedron has a single cage orbital system best described by delocalised skeletal electron pairs: Wade–Mingos counting gives $14N + 2 = 86$ for a *closo* octahedron, while a bicapped tetrahedron is the same polyhedron as a *capped* trigonal bipyramid, whose count is that of the parent *closo* trigonal bipyramid plus $12$ for the cap: $14 \times 5 + 2 + 12 = 84$. The skeletal electron count, not the number of metals, selects the polyhedron, and the 18-electron rule succeeds only when the bonding stays localised.
:::
:::
