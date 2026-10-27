In 1890 chemists knew four cobalt(III) chloride ammoniates and could not explain any of them. $\mathrm{CoCl_3\cdot 6NH_3}$ is yellow, $\mathrm{CoCl_3\cdot 5NH_3}$ purple, and $\mathrm{CoCl_3\cdot 4NH_3}$ comes in two forms, one green and one violet. Ammonia is a stable, saturated molecule and $\mathrm{CoCl_3}$ already has its "valence" satisfied, so what holds the extra ammonia, and why should a single formula exist as two different substances? Add silver nitrate to fresh solutions and the four compounds give up different fractions of their chlorine as silver chloride: all three chlorides from the yellow salt, two from the purple, only one from the green and the violet. Some chlorine is free in solution, and some is bound so tightly that silver cannot reach it.

Alfred Werner's answer, published in 1893, founded this course. The cobalt holds six groups in a fixed geometric arrangement around it: six ammonia molecules in the yellow salt, five ammonias and one chloride in the purple, four ammonias and two chlorides in the green and violet salts. Whatever is not inside this inner sphere is an ordinary ion. The green and violet salts are the two ways of arranging two chlorides on an octahedron. This chapter sets out Werner's picture in its modern form: what ligands are and how many atoms of each one bind, which coordination numbers and shapes occur and why, how complexes are named and written, and the many ways in which one formula can describe two or more different compounds. Everything later in the course (crystal field splitting, spectra, magnetism, stability, mechanisms) assumes that you can look at a formula, find the metal, its ligands, its oxidation state and its geometry, and list its isomers.

## Werner's coordination theory

::: definition Coordination compound, ligand, coordination number {#def-complex}
A **coordination compound** contains a **complex**: a central metal atom or ion bonded to a surrounding set of molecules or ions, the **ligands**, each of which donates at least one electron pair through a **donor atom**. In Lewis terms (see [[main-group/inorganic-acids-bases]]) the metal is the acid and the ligands are bases, and the bond is a coordinate (dative) bond. The metal and its directly bonded ligands form the **inner (coordination) sphere**, written in square brackets; counter-ions and solvent outside the brackets form the **outer sphere**. The **coordination number** (CN) is the number of donor atoms bonded to the metal. It is not the number of ligands, because one ligand may bind through several atoms.
:::

Werner's language was "primary valence" for what we call the oxidation state and the ionic charge balance, and "secondary valence" for the coordination number. The four cobalt salts become

| old formula | Werner formula (modern) | colour | free $\mathrm{Cl^-}$ per Co | ions per formula unit |
|---|---|---|---|---|
| $\mathrm{CoCl_3\cdot6NH_3}$ | $\mathrm{[Co(NH_3)_6]Cl_3}$ | yellow | 3 | 4 |
| $\mathrm{CoCl_3\cdot5NH_3}$ | $\mathrm{[CoCl(NH_3)_5]Cl_2}$ | purple | 2 | 3 |
| $\mathrm{CoCl_3\cdot4NH_3}$ | *trans*-$\mathrm{[CoCl_2(NH_3)_4]Cl}$ | green | 1 | 2 |
| $\mathrm{CoCl_3\cdot4NH_3}$ | *cis*-$\mathrm{[CoCl_2(NH_3)_4]Cl}$ | violet | 1 | 2 |

The inner sphere of every complex is *kinetically* intact on the time scale of the silver chloride test. Cobalt(III) complexes exchange ligands over hours to days ([[coordination-chemistry/inorganic-mechanisms]]), which is why Werner could count chloride ions this way at all.

::: example Counting chloride with silver {#ex-werner-silver}
A $1.000\ \mathrm{g}$ sample of the purple salt $\mathrm{CoCl_3\cdot5NH_3}$ is dissolved in water and treated at once with excess silver nitrate at room temperature. What mass of silver chloride precipitates if Werner's formula is right? Use molar masses $M(\mathrm{CoCl_3\cdot5NH_3}) = 250.44\ \mathrm{g\,mol^{-1}}$ and $M(\mathrm{AgCl}) = 143.32\ \mathrm{g\,mol^{-1}}$.
::: solution
The amount of complex is $1.000/250.44 = 3.993\times10^{-3}\ \mathrm{mol}$. In $\mathrm{[CoCl(NH_3)_5]Cl_2}$ only the two outer-sphere chlorides are free:
$$
\mathrm{[CoCl(NH_3)_5]^{2+}(aq) + 2\,Cl^-(aq) + 2\,Ag^+(aq) \rightarrow [CoCl(NH_3)_5]^{2+}(aq) + 2\,AgCl(s)}
$$
so $n(\mathrm{AgCl}) = 2 \times 3.993\times10^{-3} = 7.986\times10^{-3}\ \mathrm{mol}$ and $m = 7.986\times10^{-3} \times 143.32 = 1.145\ \mathrm{g}$ (four significant figures, set by the sample mass). If all three chlorides were free the mass would be $1.717\ \mathrm{g}$, and if only one were free, $0.572\ \mathrm{g}$. The three hypotheses differ by 50 % and more, so even a nineteenth-century gravimetric analysis could tell them apart. The test must be done quickly and cold. Given hours, or heat, the coordinated chloride is slowly replaced by water and more AgCl appears, and the experiment then measures a rate rather than a structure.
:::
:::

Werner's second line of evidence was the **molar conductivity** of freshly made solutions, which rises with the number of ions a formula unit releases. With Arturo Miolati he measured a series of platinum(IV) ammine chlorides, from $\mathrm{PtCl_4\cdot6NH_3}$ (five ions, $\mathrm{[Pt(NH_3)_6]Cl_4}$) down to $\mathrm{PtCl_4\cdot2NH_3}$, which barely conducts because it is the neutral molecule $\mathrm{[PtCl_4(NH_3)_2]}$. He then went on past zero ammonia with $\mathrm{K[PtCl_5(NH_3)]}$ and $\mathrm{K_2[PtCl_6]}$, whose conductivities rise again as the complex becomes an anion.

::: widget regression
points: 0,0; 2,97; 2,109; 3,229; 3,256; 4,404; 5,523
degree: 1
residuals: true
x: -0.5, 5.5
y: -50, 600
caption: Molar conductivity ($y$, in $\mathrm{S\,cm^2\,mol^{-1}}$, dilute aqueous solution) of Werner and Miolati's platinum(IV) series against the number of ions per formula unit ($x$), as tabulated by Miessler, Fischer and Tarr: $\mathrm{[PtCl_4(NH_3)_2]}$ 0; $\mathrm{[PtCl_3(NH_3)_3]Cl}$ 97 and $\mathrm{K[PtCl_5(NH_3)]}$ 109 (two ions); $\mathrm{[PtCl_2(NH_3)_4]Cl_2}$ 229 and $\mathrm{K_2[PtCl_6]}$ 256 (three ions); $\mathrm{[PtCl(NH_3)_5]Cl_3}$ 404; $\mathrm{[Pt(NH_3)_6]Cl_4}$ 523. Salts with the same number of ions cluster together whether the complex is a cation or an anion, which is what Werner's theory requires. The points are not on a straight line: highly charged ions conduct more than in proportion to their number. Drag a point to see how strongly one bad measurement would pull the fit.
:::

## Ligands: donor atoms, denticity and chelation

::: definition Denticity, chelates, bridging and ambidentate ligands {#def-denticity}
The **denticity** of a ligand is the number of its donor atoms bonded to one metal: **monodentate** ($\mathrm{NH_3}$, $\mathrm{Cl^-}$, $\mathrm{H_2O}$), **bidentate** (ethane-1,2-diamine, oxalate), and so on up to **hexadentate** (EDTA⁴⁻). A polydentate ligand bonded through two or more atoms to the same metal forms a ring, and the complex is a **chelate** (Greek *chēlē*, a crab's claw). The angle donor–metal–donor within the ring is the **bite angle**. A **bridging** ligand, written with the prefix μ, bonds to two or more metals at once ($\mu$-$\mathrm{Cl}$, $\mu$-$\mathrm{OH}$, $\mu$-$\mathrm{O}$). An **ambidentate** ligand can bind through either of two different atoms: thiocyanate through S ($-\mathrm{SCN}$, thiocyanato-κ*S*) or N ($-\mathrm{NCS}$, thiocyanato-κ*N*), nitrite through N (nitro) or O (nitrito).
:::

The ligands below are the working vocabulary of the course. Learn their formulas, charges and abbreviations; nearly every later example uses them.

| ligand | formula | charge | donor atoms | denticity | name in a complex |
|---|---|---|---|---|---|
| water | $\mathrm{H_2O}$ | 0 | O | 1 | aqua |
| ammonia | $\mathrm{NH_3}$ | 0 | N | 1 | ammine |
| carbon monoxide | CO | 0 | C | 1 | carbonyl |
| chloride | $\mathrm{Cl^-}$ | $-1$ | Cl | 1 | chlorido |
| cyanide | $\mathrm{CN^-}$ | $-1$ | C | 1 | cyanido |
| hydroxide | $\mathrm{OH^-}$ | $-1$ | O | 1 | hydroxido |
| ethane-1,2-diamine (en) | $\mathrm{H_2NCH_2CH_2NH_2}$ | 0 | 2 N | 2 | ethane-1,2-diamine |
| oxalate (ox) | $\mathrm{C_2O_4^{2-}}$ | $-2$ | 2 O | 2 | oxalato |
| acetylacetonate (acac) | $\mathrm{CH_3COCHCOCH_3^-}$ | $-1$ | 2 O | 2 | acetylacetonato |
| 2,2′-bipyridine (bpy) | $\mathrm{C_{10}H_8N_2}$ | 0 | 2 N | 2 | 2,2′-bipyridine |
| 1,10-phenanthroline (phen) | $\mathrm{C_{12}H_8N_2}$ | 0 | 2 N | 2 | 1,10-phenanthroline |
| diethylenetriamine (dien) | $\mathrm{HN(CH_2CH_2NH_2)_2}$ | 0 | 3 N | 3 | |
| ethylenediaminetetraacetate (EDTA) | $\mathrm{[(O_2CCH_2)_2NCH_2]_2^{4-}}$ | $-4$ | 2 N, 4 O | 6 | |

Chelating ligands bind far more strongly than the equivalent set of monodentate ligands (the **chelate effect**, which is mainly an entropy effect and is quantified in [[coordination-chemistry/complex-stability]]). Five-membered chelate rings, as in en, ox and EDTA, are the most common. Their bite angle near $85^\circ$ fits the $90^\circ$ angles of an octahedron. Organic ligands that bind through a contiguous set of carbon atoms, such as ethene or the cyclopentadienyl ring, are described by their **hapticity** $\eta^n$ (the number of contiguous atoms bonded to the metal). They belong to [[organometallics-catalysis]].

::: definition Oxidation state and d-electron count {#def-dn}
The **oxidation state** of the metal in a complex is the charge it would carry if every ligand were removed with its donor pairs (closed shell): $\mathrm{Cl^-}$, $\mathrm{CN^-}$, $\mathrm{OH^-}$ count $-1$, $\mathrm{O^{2-}}$ counts $-2$, and $\mathrm{H_2O}$, $\mathrm{NH_3}$, CO, en count 0. Then
$$
\text{oxidation state of M} = (\text{charge of the complex}) - \sum (\text{ligand charges}).
$$
The **d-electron count** $n$ in $d^n$ is the group number of the metal (3–12) minus its oxidation state. For transition-metal ions the $(n+1)s$ electrons are always lost before the $(n)d$ electrons. For example $\mathrm{Fe}$ is $[\mathrm{Ar}]3d^64s^2$, but $\mathrm{Fe^{2+}}$ is $[\mathrm{Ar}]3d^6$ and $\mathrm{Fe^{3+}}$ is $[\mathrm{Ar}]3d^5$. In a complex, the $(n+1)s$ orbital lies above the $d$ orbitals.
:::

::: example Oxidation states and d counts {#ex-dn}
Find the oxidation state of the metal and its $d^n$ count in (a) $\mathrm{K_3[Fe(CN)_6]}$, (b) $\mathrm{[Cr(en)_3]Cl_3}$, (c) $\mathrm{[PtCl_2(NH_3)_2]}$, (d) $\mathrm{Na_2[Ni(CN)_4]}$, (e) $\mathrm{K[MnO_4]}$, (f) $\mathrm{[Ni(CO)_4]}$.
::: solution
(a) The complex anion is $\mathrm{[Fe(CN)_6]^{3-}}$ (three $\mathrm{K^+}$ outside). Then $x + 6(-1) = -3$, so $x = +3$: iron(III), group 8, $d^{8-3} = d^5$. (b) $\mathrm{[Cr(en)_3]^{3+}}$, en neutral: chromium(III), group 6, $d^3$. (c) Neutral complex, two chlorides: platinum(II), group 10, $d^8$. (d) $\mathrm{[Ni(CN)_4]^{2-}}$: $x - 4 = -2$, nickel(II), $d^8$. (e) $\mathrm{[MnO_4]^-}$: $x - 8 = -1$, manganese(VII), $d^0$. (f) Nickel(0), $d^{10}$: in a neutral metal complex the group number *is* the d count. Two counts come up again and again: $d^8$ complexes of Ni(II), Pd(II), Pt(II) and Au(III) are often square planar, and $d^{10}$ and $d^0$ ions have no crystal field stabilisation at all. Both facts follow in [[coordination-chemistry/crystal-field-theory]].
:::
:::

## Coordination numbers and geometries

Which coordination number a metal adopts depends on three things that pull in different directions. The first is **size**. A large metal ion ($\mathrm{La^{3+}}$, $\mathrm{U^{4+}}$, the second- and third-row metals) has room for more donor atoms than a small one, and a small ligand ($\mathrm{F^-}$, $\mathrm{H_2O}$) packs more densely than a bulky one ($\mathrm{PPh_3}$, $\mathrm{N(SiMe_3)_2^-}$). The second is **charge**. A highly charged metal attracts many ligands, but many anionic ligands repel one another. The third is **electron count**. The $d^8$ and $d^{10}$ configurations have characteristic preferences (square planar and tetrahedral or linear, respectively), which ligand field theory explains. Six is by far the most common coordination number, and octahedral complexes are the default case in the rest of the course.

::: proposition Shapes for each coordination number (empirical) {#prop-geometries}
For complexes of the d- and f-block metals, the observed geometries are, in rough order of frequency for each CN:

- **CN 2**: linear. Mostly $d^{10}$ ions: $\mathrm{[Ag(NH_3)_2]^+}$, $\mathrm{[CuCl_2]^-}$, $\mathrm{[Au(CN)_2]^-}$.
- **CN 3**: trigonal planar, with bulky ligands or $d^{10}$ ions: $\mathrm{[HgI_3]^-}$, $\mathrm{[Fe\{N(SiMe_3)_2\}_3]}$.
- **CN 4**: tetrahedral, or square planar for $d^8$ ions with strong-field ligands: tetrahedral $\mathrm{[CoCl_4]^{2-}}$, $\mathrm{[ZnCl_4]^{2-}}$, $\mathrm{[Ni(CO)_4]}$, $\mathrm{[MnO_4]^-}$; square planar $\mathrm{[PtCl_4]^{2-}}$, $\mathrm{[Ni(CN)_4]^{2-}}$, $\mathrm{[AuCl_4]^-}$.
- **CN 5**: trigonal bipyramidal ($\mathrm{[Fe(CO)_5]}$) or square pyramidal ($\mathrm{[VO(acac)_2]}$). The two are close in energy and interconvert easily.
- **CN 6**: octahedral, overwhelmingly. Trigonal prismatic is rare, with thiolate-type ligands or in solids ($\mathrm{[Re(S_2C_2Ph_2)_3]}$, $\mathrm{[W(CH_3)_6]}$, the metal sites of $\mathrm{MoS_2}$).
- **CN 7**: pentagonal bipyramid ($\mathrm{[UO_2F_5]^{3-}}$), capped octahedron or capped trigonal prism ($\mathrm{[NbF_7]^{2-}}$).
- **CN 8**: square antiprism ($\mathrm{[TaF_8]^{3-}}$) or dodecahedron ($\mathrm{[Mo(CN)_8]^{4-}}$ in some salts).
- **CN 9**: tricapped trigonal prism ($\mathrm{[ReH_9]^{2-}}$, $\mathrm{[Nd(OH_2)_9]^{3+}}$).
- **CN 10–12**: only large ions with small chelating ligands, mostly lanthanides and actinides: $\mathrm{[Ce(NO_3)_6]^{2-}}$, with six bidentate nitrates, is twelve-coordinate.

For $s$-block, $d^0$, $d^5$ (high-spin) and $d^{10}$ ions, which have no ligand field preference, the high-CN shapes are close to those that minimise ligand–ligand repulsion on a sphere (the Kepert model, the coordination-chemistry analogue of VSEPR in [[bonding-structure/vsepr]]). Metal d electrons that are *not* bonding pairs do not occupy "domains" the way main-group lone pairs do, so VSEPR itself does not apply to transition-metal complexes.
:::

::: example Which five-coordinate shape? The τ₅ parameter {#ex-tau5}
Five-coordinate structures are often in between the two ideal shapes. Addison and Reedijk (1984) defined
$$
\tau_5 = \frac{\beta - \alpha}{60^\circ},
$$
where $\beta \ge \alpha$ are the two largest donor–metal–donor angles. An ideal square pyramid has $\beta = \alpha = 180^\circ$ in the limit and so $\tau_5 = 0$. An ideal trigonal bipyramid has $\beta = 180^\circ$ (axial–axial) and $\alpha = 120^\circ$ (equatorial–equatorial), so $\tau_5 = 1$. A copper(II) complex has largest angles $176.4^\circ$ and $122.7^\circ$, and a second has $165^\circ$ and $135^\circ$. Describe each.
::: solution
First: $\tau_5 = (176.4 - 122.7)/60 = 53.7/60 = 0.895$. This is close to 1, so the complex is a slightly distorted trigonal bipyramid. Second: $\tau_5 = (165 - 135)/60 = 0.500$, exactly halfway. Neither label fits, and the right description is "intermediate geometry". The parameter is useful because five-coordinate complexes really do form a continuum. The **Berry pseudorotation**, in which two axial ligands of a trigonal bipyramid bend towards each other while two equatorial ones open out, passes through a square pyramid at its midpoint and exchanges axial and equatorial sites. Its barrier is often only a few $\mathrm{kJ\,mol^{-1}}$. This is why $\mathrm{[Fe(CO)_5]}$ shows a single $^{13}\mathrm{C}$ NMR signal at room temperature although it has two kinds of carbonyl.
:::
:::

::: example Werner's geometric argument {#ex-werner-geometry}
Werner had no X-ray crystallography. He argued for the octahedron by counting isomers. For a six-coordinate complex $\mathrm{MA_4B_2}$, how many isomers are expected for (a) a planar hexagon, (b) a trigonal prism, (c) an octahedron? What did the existence of exactly two forms of $\mathrm{[CoCl_2(NH_3)_4]^+}$ show, and what could it not show?
::: solution
Place the two B ligands and count the distinct relationships. (a) In a hexagon a pair of vertices can be adjacent (1,2), separated by one (1,3) or opposite (1,4): **three** isomers. (b) In a trigonal prism the two B can share a triangular face edge, lie along a vertical (rectangular-face) edge, or lie on the diagonal of a rectangular face: **three** isomers. (c) In an octahedron any two positions are either adjacent (*cis*, $90^\circ$) or opposite (*trans*, $180^\circ$): **two** isomers. Werner found two, and had the violet *cis* form, the "missing" isomer, by 1907. This was evidence against the hexagon and the prism, but negative evidence cannot be conclusive: a third isomer might simply not have been made. The decisive test came with chirality. An octahedral $\mathrm{M(AA)_3}$ or *cis*-$\mathrm{M(AA)_2B_2}$ is chiral, but its planar hexagonal analogue is not. Werner's resolution of *cis*-$\mathrm{[CoCl(NH_3)(en)_2]^{2+}}$ into enantiomers in 1911 settled the question.
:::
:::

## Naming and writing complexes

The rules below are the IUPAC recommendations (*Nomenclature of Inorganic Chemistry*, 2005, the "Red Book"). The main change from older books is that anionic ligands now end in *-ido* when the anion name ends in *-ide* (chlorido, cyanido, hydroxido, hydrido), where older books wrote chloro, cyano, hydroxo.

::: algorithm Naming a coordination compound {#alg-naming}
1. **Cation before anion**, as for any salt, whether the complex is the cation, the anion or both.
2. **Within the complex, ligands first, in alphabetical order** of their names, ignoring multiplying prefixes: "ammine" (a) comes before "chlorido" (c), and *tetra*aqua is sorted under "a".
3. **Multiplying prefixes**: di-, tri-, tetra-, penta-, hexa- for simple ligands; bis-, tris-, tetrakis- with parentheses for ligands whose names already contain a number or are complicated: tris(ethane-1,2-diamine), bis(2,2′-bipyridine).
4. **Ligand names**: anions end in -o (chlorido, cyanido, oxido, oxalato, nitrito-κ*N*); neutral ligands keep their names, except aqua ($\mathrm{H_2O}$), ammine ($\mathrm{NH_3}$), carbonyl (CO) and nitrosyl (NO).
5. **The metal**: its ordinary name in a cation or neutral complex; in an anionic complex add *-ate*, using the Latin stem where one exists (ferrate, cuprate, argentate, aurate, stannate, plumbate; but cobaltate, nickelate, chromate, platinate, zincate).
6. **The oxidation state** follows the metal in Roman numerals in parentheses, (III), or as the charge of the whole complex (the Ewens–Bassett number), (3−).
7. **Bridging ligands** get μ (μ-hydroxido), and the donor atom of an ambidentate ligand is shown by κ (thiocyanato-κ*N*). Stereodescriptors (*cis*, *trans*, *fac*, *mer*, Δ, Λ) are placed in front of the whole name.

In formulas the metal symbol comes first, followed by the ligands, all inside square brackets. IUPAC orders the ligands alphabetically by their formulas, so $\mathrm{[CoCl(NH_3)_5]^{2+}}$, but many books still write $\mathrm{[Co(NH_3)_5Cl]^{2+}}$. Both are understood.
:::

::: example Names to formulas and back {#ex-naming}
Name (a) $\mathrm{[CoCl(NH_3)_5]Cl_2}$, (b) $\mathrm{K_3[Fe(CN)_6]}$, (c) $\mathrm{[CrCl_2(H_2O)_4]Cl}$, (d) $\mathrm{[Co(en)_3]Cl_3}$, (e) $\mathrm{[Pt(NH_3)_4][PtCl_4]}$; and write the formula of (f) diamminesilver(I) chloride, (g) potassium trioxalatoferrate(III), (h) tetracarbonylnickel(0).
::: solution
(a) Pentaamminechloridocobalt(III) chloride: "ammine" before "chlorido", and the five is a prefix that does not affect the order. (b) Potassium hexacyanidoferrate(III), or hexacyanidoferrate(3−). The traditional name potassium ferricyanide is still common in laboratories. (c) Tetraaquadichloridochromium(III) chloride: aqua (a) before chlorido (c). (d) Tris(ethane-1,2-diamine)cobalt(III) chloride. The bracketed "tris" is needed because the ligand name contains numbers. (e) Tetraammineplatinum(II) tetrachloridoplatinate(II), **Magnus's green salt**: both ions are complexes, so cation first. (f) $\mathrm{[Ag(NH_3)_2]Cl}$. (g) $\mathrm{K_3[Fe(C_2O_4)_3]}$: three $2-$ oxalates and $\mathrm{Fe^{3+}}$ give a $3-$ anion and three potassium ions. This is the green, light-sensitive salt of the iron(III) oxalate actinometer and of cyanotype photography. (h) $\mathrm{[Ni(CO)_4]}$. As a safety note, nickel tetracarbonyl is a volatile and extremely toxic liquid, handled only in closed systems. Its formation and decomposition are the basis of the Mond process for refining nickel ([[coordination-chemistry/d-block-chemistry]]).
:::
:::

::: warning Charge, oxidation state and coordination number are three different numbers {#warn-numbers}
For $\mathrm{[Co(en)_3]^{3+}}$ the *charge* of the complex is $+3$, the *oxidation state* of cobalt is $+3$, the *number of ligands* is 3, and the *coordination number* is 6. Four numbers, two of them equal by coincidence. In $\mathrm{[Fe(CN)_6]^{4-}}$ the charge is $-4$ but iron is $+2$. In $\mathrm{[Ni(CO)_4]}$ the complex is neutral and nickel is zero. In $\mathrm{[Cu(H_2O)_6]^{2+}}$ the coordination number is 6 even though, because of the Jahn–Teller effect ([[coordination-chemistry/crystal-field-theory]]), two of the waters sit much further away than the other four. Always find the charge first (from the counter-ions), then the oxidation state (from the ligand charges), then the coordination number (from the denticities). Do not reuse one as another.
:::

## Isomerism

Two compounds with the same formula but different arrangements of atoms are **isomers**. Coordination compounds show every kind of isomerism that organic molecules show, and a few that only salts can show.

::: definition Structural isomers and stereoisomers {#def-isomers}
**Structural (constitutional) isomers** differ in which atoms are bonded to which. For complexes there are five kinds:

- **ionisation isomers** exchange a ligand with a counter-ion: $\mathrm{[CoBr(NH_3)_5]SO_4}$ (violet; gives $\mathrm{BaSO_4}$ with $\mathrm{Ba^{2+}}$) and $\mathrm{[Co(SO_4)(NH_3)_5]Br}$ (red; gives AgBr with $\mathrm{Ag^+}$);
- **hydrate (solvate) isomers** exchange coordinated water with lattice water: $\mathrm{[Cr(H_2O)_6]Cl_3}$ (violet), $\mathrm{[CrCl(H_2O)_5]Cl_2\cdot H_2O}$ (blue-green) and $\mathrm{[CrCl_2(H_2O)_4]Cl\cdot2H_2O}$ (dark green);
- **linkage isomers** differ in the donor atom of an ambidentate ligand: $\mathrm{[Co(NO_2)(NH_3)_5]^{2+}}$, nitrito-κ*N* (yellow), and $\mathrm{[Co(ONO)(NH_3)_5]^{2+}}$, nitrito-κ*O* (red);
- **coordination isomers** distribute ligands differently between a complex cation and a complex anion: $\mathrm{[Co(NH_3)_6][Cr(CN)_6]}$ and $\mathrm{[Cr(NH_3)_6][Co(CN)_6]}$;
- **ligand isomers** contain isomeric ligands, for example propane-1,2-diamine and propane-1,3-diamine.

**Stereoisomers** have the same bonds but different spatial arrangements. **Geometric isomers** (diastereomers) differ in the relative positions of ligands: *cis*/*trans* (adjacent or opposite), and for $\mathrm{MA_3B_3}$ *fac* (three like ligands on one face) and *mer* (three like ligands around a meridian). **Optical isomers** (enantiomers) are non-superimposable mirror images. For tris- and bis(chelate) octahedra the configuration is labelled **Δ** (right-handed helix) or **Λ** (left-handed helix) by looking down a threefold axis.
:::

The arrangements that count as "the same" are those related by a rotation of the whole complex. Counting isomers is therefore a problem about the rotation group of the shape. For a square-planar complex that group has eight elements: the identity, rotations by $90^\circ$, $180^\circ$ and $270^\circ$ about the axis through the metal perpendicular to the plane, and four $180^\circ$ flips about in-plane axes. Acting on the four corner positions, it is the dihedral group of the square, and you can explore its structure below.

::: widget cayley
group: D
n: 4
highlight: r^2
mode: table
caption: Multiplication table of the dihedral group of order 8, which is how the eight proper rotations of a square-planar complex act on its four ligand positions. Here $r$ is the $90^\circ$ rotation about the axis perpendicular to the plane, and the four $s$-type elements are the $180^\circ$ flips about the in-plane axes. The highlighted subgroup $\{e, r^2\}$ is the $180^\circ$ rotation. A *trans*-$\mathrm{MA_2B_2}$ arrangement is left unchanged by $e$, $r^2$ and the two flips through opposite corners (a stabiliser of order 4), so it can be drawn on labelled corners in $8/4 = 2$ ways. A *cis* arrangement is left unchanged only by $e$ and one flip through edge midpoints (order 2), so it can be drawn in $8/2 = 4$ ways. Together they account for all $\binom{4}{2} = 6$ placements of two A and two B. This table is used in [[#exr-burnside]] to count isomers to count isomers with Burnside's lemma.
:::

::: example Counting stereoisomers {#ex-stereo-count}
How many stereoisomers (counting enantiomers separately) are there of (a) square-planar $\mathrm{[PtCl_2(NH_3)_2]}$, (b) octahedral $\mathrm{[CoCl_3(NH_3)_3]}$, (c) $\mathrm{[Co(en)_3]^{3+}}$, (d) $\mathrm{[CoCl_2(en)_2]^+}$, (e) $\mathrm{[MA_2B_2C_2]}$, (f) tetrahedral $\mathrm{[ZnABCD]}$?
::: solution
(a) **Two**: *cis* and *trans*. The *cis* isomer is the anticancer drug cisplatin, and the *trans* isomer is inactive ([[coordination-chemistry/bioinorganic]]). Neither is chiral: the molecular plane is a mirror plane. (b) **Two**: *fac* (the three Cl mutually *cis*, on one face, $C_{3v}$) and *mer* (two Cl *trans* to each other, $C_{2v}$). (c) **Two**: Δ and Λ. The three chelate rings form a propeller, and a propeller has a handedness. (d) **Three**: *trans* (achiral, with a mirror plane through both chlorides and the metal) and *cis*, which is chiral and exists as Δ and Λ. Werner used the *cis* compounds of this type. (e) **Six**: five geometric isomers. In one, all three pairs are *trans*. In three, one pair is *trans* and the other two are *cis* (with A, B or C as the *trans* pair). In the last, all three pairs are *cis*, and this one is chiral and occurs as two enantiomers: $5 + 1 = 6$. (Check by brute force: of the $6!/(2!\,2!\,2!) = 90$ ways to place the ligands on labelled vertices, the 24 rotations of the octahedron leave exactly six orbits.) (f) **Two**: a tetrahedral metal with four different ligands is chiral exactly as a stereogenic carbon is. Such complexes are rarely resolved, because most tetrahedral complexes exchange ligands rapidly.
:::
:::

::: example A chiral complex with no carbon {#ex-hexol}
In 1914 Werner resolved the cation $\mathrm{[Co\{(\mu\text{-}OH)_2Co(NH_3)_4\}_3]^{6+}}$ ("hexol"), made only from cobalt, ammonia, water and hydroxide. Explain why it is chiral and why that result mattered.
::: solution
The central cobalt is octahedral and bonded to six bridging hydroxides, arranged as three $\mathrm{(\mu\text{-}OH)_2}$ pairs. Each pair, together with an outer $\mathrm{Co(NH_3)_4}$ unit, forms a four-membered ring that acts as a bidentate "chelate" towards the central cobalt. The central unit is therefore an $\mathrm{M(AA)_3}$ propeller, chiral as Δ or Λ exactly like $\mathrm{[Co(en)_3]^{3+}}$. In 1914 some chemists still argued that optical activity was a property of carbon compounds, and that Werner's resolved en complexes owed their activity to the carbon atoms of the ethane-1,2-diamine ligands, which are not themselves stereogenic. A completely inorganic chiral ion ended that argument. It showed that chirality is a property of three-dimensional arrangement, whatever the elements.
:::
:::

::: quiz
Which of these complexes can exist as a pair of enantiomers?
- [ ] square-planar *cis*-$\mathrm{[PtCl_2(NH_3)_2]}$
- [x] *cis*-$\mathrm{[CoCl_2(en)_2]^+}$
- [ ] *trans*-$\mathrm{[CoCl_2(en)_2]^+}$
- [x] $\mathrm{[Cr(ox)_3]^{3-}}$
- [ ] *fac*-$\mathrm{[CoCl_3(NH_3)_3]}$
::: solution
A complex is chiral when it has no improper symmetry element (no mirror plane, no inversion centre, no $S_n$ axis). Both bis(chelate) *cis* and tris(chelate) octahedra are propellers without mirror planes, so *cis*-$\mathrm{[CoCl_2(en)_2]^+}$ and $\mathrm{[Cr(ox)_3]^{3-}}$ are chiral (Δ and Λ). The *trans* isomer has a mirror plane containing Co and both Cl. Planar complexes always contain their own molecular plane as a mirror. The *fac* isomer has three mirror planes ($C_{3v}$).
:::
:::

::: warning Geometric isomers are not resonance forms or conformers {#warn-isomers}
*Cis*- and *trans*-$\mathrm{[CoCl_2(NH_3)_4]^+}$ are different compounds, with different colours, dipole moments and solubilities, that can be put in separate bottles. They interconvert only by breaking a Co–Cl bond, which for cobalt(III) takes hours. The same is **not** true of every metal. Complexes of labile ions such as $\mathrm{Ni^{2+}}$, $\mathrm{Cu^{2+}}$ or $\mathrm{Zn^{2+}}$ exchange ligands millions of times per second, and their "isomers" equilibrate in solution as fast as they form. Isomer counting tells you how many arrangements are *possible*. Whether they can be *isolated* is a question of kinetics, and [[coordination-chemistry/inorganic-mechanisms]] gives the rule for which metals are inert and which labile.
:::

## Where this leads

The ideas of this chapter are the grammar of the rest of the course. [[coordination-chemistry/crystal-field-theory]] explains why the octahedron dominates, why $d^8$ ions turn square planar, and why $\mathrm{[Cu(H_2O)_6]^{2+}}$ is distorted. [[coordination-chemistry/ligand-field-mo]] treats the metal–ligand bond with molecular orbitals built from the symmetry of each geometry (the point groups of [[quantum-chemistry/molecular-symmetry]]). Colour and magnetism, the observable properties that distinguished Werner's isomers, are explained in [[coordination-chemistry/spectra-of-complexes]] and [[coordination-chemistry/magnetism]]. The chelate effect and the stability of complexes are made quantitative in [[coordination-chemistry/complex-stability]], and the speed of the silver chloride test, inert cobalt(III) against labile nickel(II), is explained in [[coordination-chemistry/inorganic-mechanisms]]. Complexation as an analytical tool (EDTA titrations, masking, colorimetric reagents) appears in [[analytical-chemistry]], and the metal sites of proteins, which are coordination compounds with amino-acid side chains as ligands, in [[coordination-chemistry/bioinorganic]].

::: history
Coordination compounds were made long before anyone understood them. Prussian blue, the iron cyanide pigment, was made in Berlin in the early eighteenth century, and B. M. Tassaert observed the formation of an ammonia–cobalt compound in 1798. Through the nineteenth century the cobalt and platinum ammines were classified by colour (luteo, purpureo, praseo, violeo) and explained by the "chain theory" of Christian Wilhelm Blomstrand and Sophus Mads Jørgensen, who imagined the ammonias linked in chains, $\mathrm{Co{-}NH_3{-}NH_3{-}\ldots}$, by analogy with carbon. Jørgensen's experimental work was superb, and many of the compounds that later decided the argument were first made in his laboratory. Alfred Werner, then 26 years old and in Zürich, published his coordination theory in 1893 in the *Zeitschrift für anorganische Chemie*. Over the next two decades he and his students prepared the isomers his theory predicted: the violet *cis*-$\mathrm{[CoCl_2(NH_3)_4]^+}$ in 1907, the resolved chiral cobalt complexes in 1911 (with Victor King), and the carbon-free hexol in 1914, the year after he received the Nobel Prize in Chemistry, the first awarded for inorganic chemistry. The X-ray structures that confirmed the octahedron directly came only in the 1920s.
:::

::: summary
- A complex is a Lewis acid (the metal) bound to Lewis-base ligands through donor atoms. The inner sphere is written in brackets, and the coordination number counts donor atoms, not ligands.
- Find the charge from the counter-ions, the oxidation state by subtracting ligand charges, and the $d^n$ count as group number minus oxidation state (the $s$ electrons go first).
- Polydentate ligands form chelate rings; bridging ligands are labelled μ, and ambidentate ligands bind through either of two atoms (κ notation).
- CN 6 (octahedral) dominates; CN 4 is tetrahedral or, for $d^8$ ions with strong-field ligands, square planar; CN 5 forms a continuum measured by $\tau_5$. Large ions reach CN 8–12.
- IUPAC names list ligands alphabetically before the metal, use -ido/-o endings for anions and -ate for anionic complexes, and give the oxidation state in Roman numerals.
- Structural isomers (ionisation, hydrate, linkage, coordination) differ in connectivity; stereoisomers (*cis*/*trans*, *fac*/*mer*, Δ/Λ) differ in arrangement, and counting them is counting orbits of the rotation group.
- Isomers can be isolated only if the metal is substitutionally inert; counting gives the possibilities, kinetics decides what survives in the bottle.
:::

## Exercises

::: exercise Charges and counts {level=1 check="6"}
For $\mathrm{[Co(ox)_3]^{3-}}$ give the oxidation state of cobalt, its $d^n$ count, the number of ligands and the coordination number. (Enter the coordination number.)
::: solution
Oxalate is $\mathrm{C_2O_4^{2-}}$, so $x + 3(-2) = -3$ and $x = +3$: cobalt(III), group 9, $d^6$. There are three ligands, each bidentate through two oxygens, so the coordination number is $3 \times 2 = 6$ (octahedral). The name is trioxalatocobaltate(III).
:::
:::

::: exercise Name these {level=1}
Name: (a) $\mathrm{[Cu(NH_3)_4(H_2O)_2]SO_4}$, (b) $\mathrm{Na_2[Zn(OH)_4]}$, (c) $\mathrm{[Fe(H_2O)_6]Cl_3}$, (d) $\mathrm{K_2[PtCl_6]}$, (e) $\mathrm{[Ni(en)_3](ClO_4)_2}$.
::: solution
(a) Tetraamminediaquacopper(II) sulfate: ammine (am…) sorts before aqua (aq…). (b) Sodium tetrahydroxidozincate(II). (c) Hexaaquairon(III) chloride. (d) Potassium hexachloridoplatinate(IV). (e) Tris(ethane-1,2-diamine)nickel(II) perchlorate. (Perchlorate salts of complexes with organic ligands can be explosive when dry, which is why many laboratories now use other anions, for example tetrafluoroborate or triflate.)
:::
:::

::: exercise Silver chloride gravimetry {level=1 check="0.307"}
A $0.500\ \mathrm{g}$ sample of the green salt $\mathrm{CoCl_3\cdot4NH_3}$ ($M = 233.41\ \mathrm{g\,mol^{-1}}$) is dissolved and immediately treated with excess $\mathrm{AgNO_3}$. What mass of AgCl ($M = 143.32\ \mathrm{g\,mol^{-1}}$) forms? (Enter the mass in grams to three significant figures.)
::: solution
The green salt is *trans*-$\mathrm{[CoCl_2(NH_3)_4]Cl}$, with one free chloride per formula unit. Then $n = 0.500/233.41 = 2.142\times10^{-3}\ \mathrm{mol}$ and $m(\mathrm{AgCl}) = 2.142\times10^{-3} \times 143.32 = 0.307\ \mathrm{g}$.
:::
:::

::: exercise Which isomerism? {level=2}
Identify the type of isomerism relating each pair: (a) $\mathrm{[Co(NH_3)_5(NO_2)]Cl_2}$ (yellow) and $\mathrm{[Co(NH_3)_5(ONO)]Cl_2}$ (red); (b) $\mathrm{[Cr(NH_3)_6][Co(CN)_6]}$ and $\mathrm{[Co(NH_3)_6][Cr(CN)_6]}$; (c) $\mathrm{[PtCl_2(NH_3)_4]Br_2}$ and $\mathrm{[PtBr_2(NH_3)_4]Cl_2}$; (d) the two forms of $\mathrm{[CoCl_2(en)_2]Cl}$ that are not mirror images. Suggest one experiment to tell the members of pair (c) apart.
::: solution
(a) Linkage (N- versus O-bound nitrite). The red O-bound form converts slowly to the yellow N-bound one on standing, one of the earliest observed isomerisation reactions. (b) Coordination isomerism. (c) Ionisation isomerism. Add silver nitrate: the first salt gives cream AgBr and the second white AgCl. Or test with a little chlorine water and an organic solvent for free bromide. (d) Geometric (*cis* and *trans*) isomers, which are diastereomers. The *cis* isomer is itself a pair of enantiomers.
:::
:::

::: exercise Five-coordinate continuum {level=2 check="0.25"}
A nickel(II) complex has largest donor–Ni–donor angles of $171.0^\circ$ and $156.0^\circ$. Calculate $\tau_5$ and describe the geometry. (Enter $\tau_5$.)
::: solution
$\tau_5 = (171.0 - 156.0)/60 = 0.25$. This is nearer 0 than 1, so the complex is best described as a distorted square pyramid, about a quarter of the way along the Berry pathway towards a trigonal bipyramid.
:::
:::

::: exercise Conductivity and formulas {level=2}
Three compounds of empirical formula $\mathrm{PtCl_4\cdot nNH_3}$ have molar conductivities (in $\mathrm{S\,cm^2\,mol^{-1}}$) near 520, 230 and 0. Assign $n$ and write a coordination formula for each, assuming Pt(IV) is always six-coordinate.
::: solution
Pt(IV) needs four chlorides for charge balance, and the inner sphere holds six donors. Conductivity near 520 means five ions: $\mathrm{[Pt(NH_3)_6]Cl_4}$, $n = 6$. Near 230 means three ions: $\mathrm{[PtCl_2(NH_3)_4]Cl_2}$, $n = 4$. Zero means a neutral molecule: $\mathrm{[PtCl_4(NH_3)_2]}$, $n = 2$. Each step from $n = 6$ moves one chloride inside the sphere for every ammonia removed, keeping six donor atoms, exactly as in Werner's table.
:::
:::

::: exercise All the isomers of a mixed complex {level=2 check="2"}
Draw or describe all stereoisomers of $\mathrm{[CoCl_2(NH_3)_2(en)]^+}$ and state which are chiral. (Enter the number of chiral isomers, counting each enantiomer separately.)
::: hint
The en ligand must span two *cis* positions. Fix it in the equatorial plane and place the two chlorides.
:::
::: solution
With en occupying two adjacent equatorial positions, the remaining four positions are the other two equatorial sites (each *trans* to an en nitrogen) and the two axial sites. (i) Both Cl axial (*trans* to each other), both $\mathrm{NH_3}$ equatorial: a mirror plane contains Co, en and both $\mathrm{NH_3}$, so it is achiral. (ii) Both $\mathrm{NH_3}$ axial, both Cl equatorial: achiral, by the same argument. (iii) One Cl and one $\mathrm{NH_3}$ axial, the other Cl and $\mathrm{NH_3}$ equatorial: there is no mirror plane, and this isomer exists as two enantiomers. So there are four stereoisomers, three geometric isomers, and **two** chiral forms (one enantiomeric pair).
:::
:::

::: exercise Counting isomers with Burnside's lemma {#exr-burnside level=3 check="2"}
Burnside's lemma says that the number of distinct arrangements equals the average, over all symmetry operations $g$ of the group, of the number of arrangements left unchanged by $g$. Use the eight rotations of a square-planar complex (the group in the Cayley table above) to count the isomers of $\mathrm{MA_2B_2}$. Then explain, without calculation, why $\mathrm{MABCD}$ gives three. (Enter the number of $\mathrm{MA_2B_2}$ isomers.)
::: hint
Label the corners 1–4 in order. The identity fixes all $\binom{4}{2} = 6$ arrangements. A rotation fixes an arrangement only if every cycle of positions it permutes carries a single kind of ligand.
:::
::: solution
Cycle structures of the eight operations on the corners: identity (four 1-cycles) fixes 6. The $90^\circ$ and $270^\circ$ rotations (one 4-cycle) would need all four ligands equal, so they fix 0 each. The $180^\circ$ rotation, cycles (1 3)(2 4), needs A at 1 and 3 or at 2 and 4: it fixes 2. The two flips through opposite corners, e.g. (1)(3)(2 4), need 2 and 4 equal: if they are both A then 1 and 3 are both B, and vice versa, so each fixes 2. The two flips through edge midpoints, e.g. (1 2)(3 4), need 1 = 2 and 3 = 4: each fixes 2. Total fixed: $6 + 0 + 0 + 2 + 2 + 2 + 2 + 2 = 16$, and $16/8 = 2$ isomers (*cis* and *trans*). For MABCD no non-identity operation fixes anything (all four ligands differ), so the count is $4!/8 = 3$: the three distinct ways to choose which ligand is *trans* to A. Because the plane is a mirror, none of these isomers is chiral.
:::
:::

::: exercise Ruling out the trigonal prism {level=3}
For an $\mathrm{M(AA)_3}$ complex with a bidentate ligand that spans an edge, compare the number of stereoisomers expected for an octahedron and for a trigonal prism in which each chelate spans one of the three vertical (rectangular-face) edges. Explain how Werner's 1911 resolution of chiral cobalt(III) chelates discriminated between the two geometries, and why the trigonal prismatic $\mathrm{[Re(S_2C_2Ph_2)_3]}$ discovered in 1965 does not contradict him.
::: solution
**Octahedron**: the three chelates make a propeller about the $C_3$ axis, $D_3$ symmetry with no improper elements, so there are two enantiomers (Δ, Λ). **Trigonal prism** with chelates on the three vertical edges: the molecule has $D_{3h}$ symmetry, including the horizontal mirror plane that cuts every chelate through its middle, so it is achiral and has a single isomer. Observing optical activity in tris- and bis(chelate) cobalt(III) complexes, which persists because Co(III) does not racemise quickly, therefore excludes the prism for those compounds. Werner's argument concerns cobalt(III) ammines and en complexes. The rhenium dithiolene is a different case: the dithiolene ligands are planar, π-delocalised and bonded through sulfur, and the interligand S···S bonding interactions stabilise the prism. Geometry is a property of each compound, decided by its electrons and its ligands. The octahedron is the overwhelming rule, but not a law of nature.
:::
:::
