Benzene was a scandal for forty years. Faraday had isolated it in 1825 and analysis gave the empirical formula CH — a compound of one carbon per hydrogen, far too hydrogen-poor for anything alkene-like, since alkenes are $\mathrm{C_nH_{2n}}$. Yet benzene adds hydrogen, it burns with a sooty flame, and it dissolves bromine without decolourising it. It undergoes substitution — one hydrogen replaced by one bromine, one hydrogen replaced by one nitro group — and every monosubstituted benzene ever made came in one form only, as if all six positions were identical. A chain of six carbons with three double bonds cannot do that; a ring can, and in 1865 Kekulé's ring explained everything except the one thing that mattered most: a ring of three double bonds should behave like three alkenes, and benzene behaves like none. The answer, which took until the 1930s and the new quantum mechanics, is that cyclic conjugation is not conjugation times three — it is a different kind of matter. This chapter makes the idea precise, gives you the counting rule that sorts rings into aromatic, antiaromatic and merely unsaturated, and shows you the ions and heterocycles that prove the rule was never about benzene alone.

## The evidence: how much more stable?

::: definition Aromaticity, antiaromaticity, nonaromaticity {#def-aromaticity}
A **aromatic** compound is a cyclic, planar, fully conjugated system whose $\pi$ electrons occupy a closed shell of bonding molecular orbitals, giving it extra thermodynamic stability (a **resonance** or **delocalisation energy**) and a characteristic reluctance to add: it prefers substitution, which preserves the ring. An **antiaromatic** compound is a cyclic, planar, fully conjugated system with $4n$ $\pi$ electrons, which leaves electrons in nonbonding or antibonding orbitals and makes it *less* stable than the open-chain analogue. A **nonaromatic** compound simply lacks one of the preconditions — usually planarity or continuous conjugation — and behaves like an ordinary alkene. The three words name three different experiments, not three grades of one property.
:::

The thermochemical evidence is a single subtraction. Hydrogenation of cyclohexene, one isolated double bond, releases $-119.7\ \mathrm{kJ\,mol^{-1}}$; hydrogenation of 1,3-cyclohexadiene releases $-231.8\ \mathrm{kJ\,mol^{-1}}$, twice the monoene less the $\approx 8\ \mathrm{kJ\,mol^{-1}}$ of ordinary conjugation. If benzene were "cyclohexa-1,3,5-triene" it should release three times the monoene value, $\approx -359\ \mathrm{kJ\,mol^{-1}}$. It releases $-208.4\ \mathrm{kJ\,mol^{-1}}$.

::: example The resonance energy of benzene {#ex-resonance-energy}
Using the hydrogenation data above — cyclohexene $-119.7$, benzene $-208.4\ \mathrm{kJ\,mol^{-1}}$ — calculate the resonance energy of benzene, and compare it with the $14.7\ \mathrm{kJ\,mol^{-1}}$ conjugation energy of buta-1,3-diene from [[organic-2/conjugation]]. (Enter the resonance energy as a positive number in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
The hypothetical triene would hydrogenate with $3 \times (-119.7) = -359.1\ \mathrm{kJ\,mol^{-1}}$; benzene actually gives $-208.4\ \mathrm{kJ\,mol^{-1}}$. The shortfall is $359.1 - 208.4 = 150.7$, so benzene is stabilised by $\approx 151\ \mathrm{kJ\,mol^{-1}}$ — ten times the conjugation energy of a single butadiene unit, and enough that benzene refuses addition reactions that would spend it. The comparison is the whole lesson in one number: six $\pi$ electrons in a ring are not three conjugated dienes; they are a closed shell.
:::
:::

The structural evidence points the same way. All six carbon–carbon bonds in benzene are $1.397\ \mathrm{\AA}$ — longer than the $1.34\ \mathrm{\AA}$ of an alkene, shorter than the $1.54\ \mathrm{\AA}$ of an alkane, and *equal to one another*, as X-ray and electron diffraction showed from the 1930s on. The magnetic evidence is the most spectacular and you will meet it again in the spectroscopy course: a ring of circulating $\pi$ electrons sustains a **ring current** in a magnetic field that reinforces the field outside the ring and cancels it inside, so benzene's protons resonate at $\delta\ 7.27$ — far downfield of any alkene — while protons placed *inside* larger aromatic rings resonate at negative shifts.

## The orbital picture: a ring of $p$ orbitals closes shells

::: proposition The benzene molecular orbitals and the Frost circle {#prop-benzene-mo}
Six parallel $p$ orbitals on a regular hexagon combine into six $\pi$ molecular orbitals whose energies are given by the **Frost circle**: inscribe the polygon with one vertex pointing down in a circle of radius $2\beta$ centred on $\alpha$, and the vertical positions of the vertices are the orbital energies. For benzene the levels are $\alpha+2\beta$ (one orbital, all in phase), a degenerate pair at $\alpha+\beta$, a degenerate pair at $\alpha-\beta$, and $\alpha-2\beta$ (all alternating). The six $\pi$ electrons fill the three lowest levels exactly — one closed bonding shell, a large gap to the LUMO pair, and every bonding orbital filled and no antibonding orbital occupied.
:::

::: widget plot
f: 2*s; s; s; -s; -s; -2*s
x: 0, 10
y: -2.6, 2.6
sliders: s=1:0.5:1.5:0.1
labels: \psi_1; \psi_2; \psi_3; \psi_4^{*}; \psi_5^{*}; \psi_6^{*}
caption: The six $\pi$ molecular-orbital energies of benzene in units of $\beta$ (slider $s$ scales the energy axis): one level at $\alpha+2\beta$, a degenerate pair at $\alpha+\beta$, a degenerate pair at $\alpha-\beta$, one at $\alpha-2\beta$ — the Frost-circle pattern for the hexagon. The six electrons fill the three levels above the line $\alpha=0$ and stop: closed shell, and a gap of $2\beta$ to the first empty pair. Slide $s$ and the pattern does not change — the shell structure is a property of the hexagon's symmetry, not of the energy scale, which is why "six $\pi$ electrons" is a magic number for every six-membered ring whatever its atoms.
:::

The same construction on other polygons is the engine of the whole subject. A triangle (cyclopropenyl) gives one low level and a degenerate pair above it; a square (cyclobutadiene) gives one low level, two degenerate levels *at* $\alpha$, and one high; a pentagon (cyclopentadienyl) gives one low level and two degenerate pairs; a heptagon (cycloheptatrienyl) gives one low level, three pairs. Fill them with different electron counts and the rule announces itself.

::: proposition Hückel's rule {#prop-huckel}
A planar, cyclic, fully conjugated (monocyclic) system is **aromatic** when it has $4n+2$ $\pi$ electrons ($n = 0, 1, 2, \ldots$: 2, 6, 10, 14, …) and **antiaromatic** when it has $4n$ ($4, 8, 12, \ldots$). The reason is the Frost circle: $4n+2$ electrons exactly fill the non-degenerate lowest level and an integer number of degenerate pairs — a closed shell — while $4n$ electrons leave a degenerate set half-filled, which is unstable and drives either distortion, diradical behaviour, or loss of planarity. The rule is an empirical summary of the orbital arithmetic, and it is stated for monocyclic systems; polycyclic and three-dimensional aromaticity need more machinery.
:::

::: example Count to aromatic {#ex-count}
Classify, with a one-clause reason: (a) cyclopropenyl cation $\mathrm{C_3H_3^+}$; (b) cyclobutadiene $\mathrm{C_4H_4}$; (c) cyclopentadienyl anion $\mathrm{C_5H_5^-}$; (d) cycloheptatrienyl (tropylium) cation $\mathrm{C_7H_7^+}$; (e) cyclooctatetraene $\mathrm{C_8H_8}$.
::: solution
(a) 2 $\pi$ electrons: $4(0)+2$ — aromatic, and the smallest of all. (b) 4 $\pi$ electrons: $4n$ — antiaromatic if planar, and it distorts to a rectangle and dimerises violently to escape. (c) 6 $\pi$ electrons (two double bonds plus the anion lone pair in the $p$ orbital): aromatic — this is why cyclopentadiene is unusually acidic. (d) 6 $\pi$ electrons (three double bonds plus the empty $p$ orbital): aromatic, which is why tropylium salts are isolable. (e) 8 $\pi$ electrons: $4n$, so planarity would be antiaromatic — and the molecule refuses to be planar, adopting a tub shape with localised double bonds, so it is nonaromatic and reacts like a polyalkene. Note the pattern: the electron count decides, and the molecule obeys.
:::
:::

::: warning Hückel's rule has preconditions {#warn-huckel-preconditions}
The rule counts electrons *after* you have checked three preconditions, and most wrong answers in examinations are failures of the checking, not of the counting. **Cyclic** and **fully conjugated**: cycloheptatriene itself is not aromatic — the $\mathrm{CH_2}$ carbon has no $p$ orbital and the circuit is broken; only its cation is. **Planar**: [10]annulene has $4(2)+2 = 10$ $\pi$ electrons and is not aromatic, because a planar ring would force two internal hydrogens to collide; it puckers and behaves as a pentene. [14]annulene and [18]annulene, where the interior can be cleared or the ring is large enough, *are* aromatic — the rule is about orbitals, but hydrogens vote too. And **aromatic does not mean "smells nice"**: the name is a historical accident from the odours of early benzene derivatives, and cyclopentadiene, the precursor of the aromatic cyclopentadienyl anion, smells of nothing pleasant at all.
:::

## Aromatic ions: the acidities that prove the rule

Hückel stated his rule in 1931; most of its famous examples had not been made. They arrived as ions, and the evidence was often a $\mathrm{p}K_\mathrm{a}$ value.

::: example Why cyclopentadiene is a "strong" hydrocarbon {#ex-cp-acidity}
Cyclopentadiene has $\mathrm{p}K_\mathrm{a} \approx 16$; propene (allylic $\mathrm{C{-}H}$) about 43; propane about 50. Explain the 27-unit gap between the first two, and say what base is needed to make the cyclopentadienyl anion in water.
::: solution
Removing $\mathrm{H^+}$ from propene gives an allyl anion delocalised over three carbons — stabilisation, but ordinary conjugation. Removing $\mathrm{H^+}$ from cyclopentadiene gives $\mathrm{C_5H_5^-}$: a planar ring, five $p$ orbitals, six $\pi$ electrons — a Hückel aromatic closed shell, with the charge shared equally over all five carbons. Aromaticity of the product is worth tens of $\mathrm{kJ\,mol^{-1}}$ of acidity, and $27$ $\mathrm{p}K_\mathrm{a}$ units is $27 \times 5.7 = 154\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$ — the same order as benzene's resonance energy, as it must be, since the anion is a six-electron aromatic in exactly the sense that benzene is. In water even hydroxide is too weak (the exercise set makes you compute how weak): alkoxides, hydride sources such as $\mathrm{NaH}$, or sodium metal deprotonate it, and the anion is stable enough to be isolated as salts.
:::
:::

::: widget newton
f: (x/(0.1-x))^2 - 0.01
x0: 0.01
x: 0, 0.1
caption: Newton's method finding the equilibrium concentration $x$ of cyclopentadienyl anion when $0.10\ \mathrm{mol\,dm^{-3}}$ cyclopentadiene meets $0.10\ \mathrm{mol\,dm^{-3}}$ hydroxide: the reaction $\mathrm{CpH + HO^- \rightleftharpoons Cp^- + H_2O}$ has $K = K_\mathrm{a}(\mathrm{CpH})/K_\mathrm{w} = 10^{-16}/10^{-14} = 0.01$, so $(x/(0.1-x))^2 = 0.01$ and $x = 0.0091\ \mathrm{mol\,dm^{-3}}$ — only $9\,\%$ deprotonation. Aromaticity makes cyclopentadiene the most acidic hydrocarbon of its size, and it is still a *weak acid*: aromatic stabilisation of an anion is a $150\ \mathrm{kJ\,mol^{-1}}$ gift, not a licence to protonate water.
:::

The cation side of the story is equally instructive. Treating cycloheptatriene with a hydride acceptor removes $\mathrm{H^-}$ (with its two electrons) from the $sp^3$ carbon and leaves six $\pi$ electrons over seven centres: the **tropylium cation**, whose salts — chloride, tetrafluoroborate — are ordinary crystalline solids, stable in water, with all seven C–C bonds equal ($1.38\ \mathrm{\AA}$) and all seven protons equivalent. In 1931 Hückel's rule had predicted a stable $\mathrm{C_7H_7^+}$; in the early 1950s Doering and Knox made its salts and the rule acquired its most quoted confirmation. The same logic makes the cyclopropenyl cation (2 $\pi$ electrons) isolable as triphenylcyclopropenium salts (Breslow, late 1950s) and predicts — correctly — that the cyclopentadienyl *cation* (4 $\pi$ electrons) and the cycloheptatrienyl *anion* (8 $\pi$ electrons) are antiaromatic and have never been made as simple species.

::: history
The chapter's evidence accumulated in four acts. In 1905 Richard **Willstätter** synthesised what he believed was cyclohexa-1,3,5-triene by a route that could not have produced anything else — and found it was a reactive triene, nothing like benzene; the paradox (which was really benzene's stability talking) was not resolved for a quarter century. In 1925 Robert **Robinson** proposed the **aromatic sextet**, counting six electrons as the unit of ring stability, a bookkeeping rule that anticipated the orbital shell by six years. In 1931 Erich **Hückel** derived the $4n+2$ condition from quantum mechanics, and Linus **Pauling** supplied the resonance-energy language in 1933. In the 1950s the rule's predictions were cashed out experimentally — tropylium salts by **Doering and Knox**, cyclopentadienyl anion salts by **Hafner**, cyclopropenium salts by **Breslow** — and in 1963 Klaus **Vogel's** [18]annulene, with its diatropic ring current (outer protons at $\delta\ 9.3$, inner at $\delta\ -3.0$), showed that aromaticity is a property of the electron count and not of the six carbons.
:::

## Antiaromaticity: the rule's dark twin

Antiaromaticity is rarer in the bottle than aromaticity for a simple reason: molecules avoid it. Cyclobutadiene, the $4\pi$ square, was sought from the 1900s; it dimerises within seconds above $35\ \mathrm{K}$ in the neat solid-free state, and only in the early 1990s did Günther Maier trap enough of it in an argon matrix at low temperature to record an IR spectrum. What is known of it fits the theory exactly: it is a *rectangle*, not a square (bond alternation $1.34$/$1.54\ \mathrm{\AA}$ is frozen in, because a square would have two electrons half-filling a degenerate pair — the Jahn–Teller distortion is the molecule's way of making the worst of a bad configuration), and its hydrogenation enthalpy is far more exothermic than four double bonds should give: antiaromaticity is *negative* stabilisation.

::: example Cyclooctatetraene: the molecule that refuses {#ex-cot}
Cyclooctatetraene has 8 $\pi$ electrons. Its X-ray structure shows alternating bond lengths ($1.34$ and $1.47\ \mathrm{\AA}$) and a tub conformation; it decolourises bromine and hydrogenates readily. Treatment with potassium metal gives $\mathrm{K_2C_8H_8}$, whose $^1\mathrm{H}$ NMR shows a *single* sharp proton signal and whose X-ray structure shows a planar octagon with eight equal bonds. Interpret both observations.
::: solution
The neutral molecule has $4n$ $\pi$ electrons, so planarity would make it antiaromatic; it escapes by puckering into a tub that breaks the orbital overlap, localising four ordinary double bonds — hence alkene chemistry and alternating bond lengths. The dianion has $8+2 = 10 = 4(2)+2$ $\pi$ electrons: now planarity is *rewarded*, the ring flattens to a regular octagon, all bonds equalise, and the single NMR signal is the ring-current-shifted resonance of ten equivalent protons. One molecule, two electron counts, two structures: the electron count is the boss, and the geometry follows.
:::
:::

::: quiz
Which species is aromatic?
- [x] The cyclopropenyl cation $\mathrm{C_3H_3^+}$ (2 $\pi$ electrons).
- [ ] Cyclobutadiene $\mathrm{C_4H_4}$ (4 $\pi$ electrons).
- [ ] Planar cyclooctatetraene $\mathrm{C_8H_8}$ (8 $\pi$ electrons).
- [ ] The cyclopentadienyl cation $\mathrm{C_5H_5^+}$ (4 $\pi$ electrons).
::: solution
Only the cyclopropenyl cation: $2 = 4(0)+2$ electrons in a planar, fully conjugated ring — the smallest Hückel system, $n=0$ included. The other three all have $4n$ electrons: cyclobutadiene and the cyclopentadienyl cation are antiaromatic if planar (the latter is never formed in solution chemistry for exactly this reason), and cyclooctatetraene avoids planarity altogether, so it is nonaromatic rather than antiaromatic — the distinction the warning block insisted on.
:::
:::

## Heteroaromatics and where the rule goes next

Replace a CH in an aromatic ring by a heteroatom and the rule survives, but you must count carefully — the question is always whether a lone pair sits *in* the $\pi$ system or *outside* it in an $sp^2$ orbital. Pyridine's nitrogen contributes one electron through its $p$ orbital and keeps its lone pair in the plane (that lone pair is why pyridine is basic); pyrrole's nitrogen contributes two, its lone pair being the $p$ orbital's pair (which is why pyrrole is not basic). Both are six-electron aromatics, and their very different chemistry — pyridine electron-poor, pyrrole electron-rich — is the subject of [[organic-2/heterocycles]]. Azulene, a fused $4n+4n+2$ hydrocarbon with a dipole moment of about $1.0\ \mathrm{D}$, is aromatic by transferring density to make a fused cyclopentadienyl-anion/cycloheptatrienyl-cation pair, and borazine, "inorganic benzene", is only weakly aromatic because polarising the electrons towards nitrogen costs more than delocalisation pays.

## Where this leads

Aromaticity is the reason benzene *substitutes* rather than adds, and the mechanism of that substitution — the arenium ion, whose formation costs aromaticity and whose deprotonation buys it back — is [[organic-2/aromatic-substitution]]. The same closed-shell logic explains why the carbonyl compounds of [[organic-2/carbonyl-addition]] add rather than substitute, and why cyclopentadiene's acidity, which you have just learned to compute, makes the cyclopentadienyl ligands of the organometallics course possible. The ring current is a magnetic phenomenon and belongs properly to the spectroscopy course; the Hückel molecular-orbital machinery behind the Frost circle is derived in [[quantum-chemistry/huckel-theory]]; and the frontier-orbital statement of "closed shell" is developed in [[bonding-structure/molecular-orbitals]].

::: summary
- Aromatic compounds are cyclic, planar, fully conjugated systems with $4n+2$ $\pi$ electrons: a closed bonding shell, a resonance energy (benzene: $\approx 151\ \mathrm{kJ\,mol^{-1}}$ from hydrogenation), equalised bonds, a ring current, and a preference for substitution over addition.
- The Frost circle turns the Hückel rule into geometry: $4n+2$ electrons fill the lowest level and whole degenerate pairs; $4n$ electrons half-fill a degenerate set.
- Antiaromatic $4n$ systems are *destabilised* and escape by distorting (cyclobutadiene's rectangle) or by losing planarity (cyclooctatetraene's tub); nonaromatic systems never had the circuit at all.
- The rule's preconditions — cyclic, fully conjugated, planar — must be checked before counting: cycloheptatriene and [10]annulene have the electron counts but not the structures.
- Aromatic ions are the rule's proof: cyclopentadiene's $\mathrm{p}K_\mathrm{a} \approx 16$ (aromatic anion), isolable tropylium salts (aromatic cation), and the never-observed cyclopentadienyl cation (antiaromatic).
- Heteroatoms count one or two electrons depending on whether their lone pair is in the $\pi$ system (pyrrole) or outside it (pyridine) — the key to the next two chapters.
:::

## Exercises

::: exercise Classify the ring {level=1}
Aromatic, antiaromatic, or nonaromatic: (a) benzene; (b) cycloheptatriene; (c) the tropylium cation; (d) the cyclopentadienyl anion; (e) 1,3,5-hexatriene.
::: solution
(a) Aromatic (6 $\pi$, planar, cyclic). (b) Nonaromatic — the $sp^3$ $\mathrm{CH_2}$ breaks the conjugation circuit. (c) Aromatic (6 $\pi$ over seven centres). (d) Aromatic (6 $\pi$ over five centres). (e) Nonaromatic — acyclic, however conjugated; "aromatic" requires a ring.
:::
:::

::: exercise Magic numbers {level=1 check="6"}
How many $\pi$ electrons does the cyclopentadienyl anion have? (Enter the number.)
::: solution
Six: four from the two $\pi$ bonds plus the lone pair left behind in the $p$ orbital on the deprotonated carbon. $6 = 4(1)+2$: a Hückel number, which is the entire reason for cyclopentadiene's anomalous acidity.
:::
:::

::: exercise Frost-circle bookkeeping {level=1}
For a planar regular hexagon of $p$ orbitals, how many $\pi$ molecular orbitals are bonding (below $\alpha$), and how many electrons close the shell?
::: solution
Three bonding orbitals (one at $\alpha+2\beta$, a pair at $\alpha+\beta$), holding six electrons. The closed shell at six is what makes the hexagon special; four or eight electrons would leave the degenerate pair at $\alpha+\beta$ or $\alpha-\beta$ partly filled.
:::
:::

::: exercise Resonance energy {level=2 check="151"}
Cyclohexene hydrogenates with $-119.7\ \mathrm{kJ\,mol^{-1}}$ and benzene with $-208.4\ \mathrm{kJ\,mol^{-1}}$. Calculate benzene's resonance energy. (Enter a positive number in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$3 \times 119.7 - 208.4 = 359.1 - 208.4 = 150.7 \approx 151\ \mathrm{kJ\,mol^{-1}}$. Note what the calculation assumes: that three isolated double bonds would hydrogenate additively, which the 1,3-cyclohexadiene data (conjugation worth only $\approx 8\ \mathrm{kJ\,mol^{-1}}$) makes a fair baseline. The remaining $151\ \mathrm{kJ\,mol^{-1}}$ is aromaticity, and it is why benzene hydrogenates only under forcing conditions while cyclohexene reacts in minutes.
:::
:::

::: exercise Which is more acidic, and by how much {level=2}
Fluorene ($\mathrm{p}K_\mathrm{a} \approx 23$) is far more acidic than biphenyl-$\mathrm{CH_2}$-type hydrocarbons of comparable structure without the five-membered ring closure. Explain with structures, and say whether the fluorenyl anion is aromatic by Hückel's rule.
::: solution
Deprotonation of fluorene's $\mathrm{CH_2}$ gives the fluorenyl anion: the carbanion lone pair enters the five-membered ring's circuit, and the central ring becomes a fused cyclopentadienyl anion — six $\pi$ electrons in the five-carbon ring, aromatic, with the charge delocalised into both benzene rings as well. Biphenyl-type analogues can delocalise the charge but cannot make an aromatic ring out of it. The ten-$\mathrm{p}K_\mathrm{a}$-unit gap ($57\ \mathrm{kJ\,mol^{-1}}$) is the aromatic stabilisation of the anion, smaller than cyclopentadiene's because the anion's charge is spread over a larger, less symmetric system.
:::
:::

::: exercise The tub and the octagon {level=2}
Predict the geometry and bond lengths of (a) neutral cyclooctatetraene, (b) its dianion, (c) its radical monoanion, given that planar $4n$ systems are antiaromatic and planar $4n+2$ systems aromatic.
::: solution
(a) Tub, alternating $1.34$/$1.47\ \mathrm{\AA}$: 8 $\pi$ electrons make planarity antiaromatic, so the molecule localises four double bonds. (b) Planar regular octagon, eight equal bonds near $1.40\ \mathrm{\AA}$: 10 $\pi$ electrons, aromatic, ring current included. (c) The awkward case: 9 $\pi$ electrons is neither Hückel number, so the dianion's planarity is not available to the radical anion — expect a flattened-but-distorted structure, and in practice the radical anion is fluxional between tub-like forms. The exercise's point: the rule is a two-valued statement about closed shells, and open-shell species fall between its verdicts.
:::
:::

::: exercise Basicity from electron bookkeeping {level=3}
Pyridine's conjugate acid has $\mathrm{p}K_\mathrm{a} = 5.2$; pyrrole's conjugate acid has $\mathrm{p}K_\mathrm{a} \approx 0.4$ and protonation occurs on carbon, not nitrogen. Explain both numbers from the lone-pair bookkeeping of this chapter, and predict whether pyrrole protonates at C2 or C3.
::: solution
Pyridine's lone pair lies in an $sp^2$ orbital in the ring plane, outside the six-electron $\pi$ system; protonating it costs the aromatic ring nothing, so pyridine is an ordinary weak base ($\mathrm{p}K_\mathrm{a}\ 5.2$, against $10.6$ for alkylammonium ions — the $sp^2$ nitrogen holds the pair tighter). Pyrrole's lone pair *is* two of its six $\pi$ electrons; protonating the nitrogen would remove that pair from the circuit and destroy the aromaticity — energetically desperate, so protonation happens instead at C2, where the resulting cation is still stabilised: the arenium-like intermediate from C2 attack has three resonance contributors (the positive charge can sit on N and on both adjacent carbons) against two for C3 attack. C2 it is — and the same three-contributor argument will reappear as the rule for electrophilic substitution of pyrrole in [[organic-2/heterocycles]].
:::
:::

::: exercise Design an aromatic ion {level=3 hint="Ask what each precursor would become: which ring, how many electrons in the circuit, and is that a Hückel number?"}
Suggest, with reasoning, whether each of the following can form an aromatic species on the stated treatment, and write the species: (a) cyclopropenone + strong acid; (b) tropolone (2-hydroxycyclohepta-2,4,6-trien-1-one) + base; (c) 5-bromocyclopenta-1,3-diene + $\mathrm{Ag^+}$ (an attempt at ionisation).
::: solution
(a) Yes: protonation of the carbonyl oxygen gives the contributor in which the ring carbon carries the positive charge — the cyclopropenyl cation, 2 $\pi$ electrons, aromatic. Cyclopropenones are unusually basic for ketones for exactly this reason. (b) Yes: deprotonation gives the tropolonate anion, in which the seven-carbon ring keeps a three-double-bond, 6 $\pi$-electron tropylium-type circuit while the negative charge is shared equally by the two oxygens — an aromatic ring with the charge parked outside the count. This is why tropolone is acidic ($\mathrm{p}K_\mathrm{a} \approx 7$) where ordinary alcohols sit near 16. (c) No: pulling bromide off with $\mathrm{Ag^+}$ would give the cyclopentadienyl *cation* — 4 $\pi$ electrons, antiaromatic — and the ionisation simply does not occur; failure to ionise where a normal allylic halide would is itself a diagnostic of antiaromaticity. The counting lesson running through all three: Hückel counts the electrons *in the cyclic circuit*; exocyclic oxygens donate or withdraw by resonance without joining the count.
:::
:::
