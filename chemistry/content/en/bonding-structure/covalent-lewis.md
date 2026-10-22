Two hydrogen atoms, far apart, ignore each other; pushed together, they do something no ionic model can explain — they *share* their electrons and become a molecule, $\mathrm{H_2}$, that is $436\ \mathrm{kJ\,mol^{-1}}$ lower in energy than the separated atoms. Neither atom donates: they have identical ionisation energies, so electron transfer would cost more than it gains. What forms instead is a **covalent bond**, a shared electron pair held simultaneously by two nuclei. The idea is simple to state and enormous in reach: nearly all molecular structure — water, DNA, polyethylene, aspirin — is an arrangement of shared pairs, and the language chemists invented to draw them, Lewis structures, is the working shorthand of the whole subject. This lesson builds that language from the energy curve of $\mathrm{H_2}$ upward: how to count electrons, how to draw them, how to judge one drawing against another with formal charge, and where the rules break.

## The covalent bond

Follow the energy as two H atoms approach. At large separation nothing happens. As the distance shrinks below a few hundred picometres, each electron begins to feel *both* nuclei, and the energy falls: the shared pair sits between the nuclei, screening them from each other's repulsion and being attracted by both at once. Below the equilibrium distance the nuclei see each other too clearly and the energy climbs steeply. The curve has a minimum — a real molecule — at $74\ \mathrm{pm}$, and the depth of the well, $436\ \mathrm{kJ\,mol^{-1}}$, is the bond dissociation enthalpy of $\mathrm{H_2}$.

::: definition The covalent bond, electron pairs and the octet {#def-covalent-bond}
A **covalent bond** is the attraction of a shared pair of electrons to two nuclei at once, drawn as a line ($\mathrm{H–H}$) or a pair of dots ($\mathrm{H{:}H}$). Electrons drawn as belonging to a bond are **bonding pairs**; electrons drawn as two dots on a single atom are **lone pairs** (non-bonding pairs). The **octet rule** is the empirical observation, due to G. N. Lewis, that main-group atoms bond so as to surround themselves with eight valence electrons (two for hydrogen and helium): each bond contributes two electrons to the count of *both* atoms it joins. The octet rule is a bookkeeping rule of extraordinary reliability for C, N, O and the halogens — and it has documented exceptions, which we meet below.
:::

The quantum mechanics behind the curve — why a *pair* of electrons, and why does pairing lower the energy — is the exchange interaction treated in [[quantum-chemistry/chemical-bond-qm]] and, in chemical language, in [[bonding-structure/valence-bond]]. For now the chemical picture suffices: a covalent bond is a shared pair, it has a definite length (the position of the well minimum) and a definite strength (its depth), and it is *directed*, unlike the non-directional ionic attraction of [[bonding-structure/ionic-bonding]].

::: widget plot
f: d*(1-exp(-0.0194*(x-74)))*(1-exp(-0.0194*(x-74))) - d
sliders: d=436:200:600:10
x: 40, 160
y: -500, 400
labels: \text{H--H potential (Morse form)}
caption: The potential energy of $\mathrm{H_2}$ against internuclear distance, drawn in the Morse form $V(x) = D\left(1 - e^{-a(x-x_0)}\right)^2 - D$ with the well depth $D$ on the slider (default $436\ \mathrm{kJ\,mol^{-1}}$, the experimental dissociation enthalpy). The minimum sits at $x_0 = 74\ \mathrm{pm}$: below it the curve rises steeply (nucleus–nucleus repulsion), above it the curve flattens toward zero (the atoms no longer feel each other). Slide $D$ and notice what does *not* move: the minimum stays at $74\ \mathrm{pm}$. Well depth and well position are largely independent properties — which is why bond energies and bond lengths are tabulated separately, and why a deeper bond is not necessarily a shorter one across different elements.
:::

**Lewis dot conventions.** Write the element symbol surrounded by its valence electrons as dots, paired before doubled-up (N gets three singles and a pair; O two pairs and two singles; the halogens three pairs and a single). Shared pairs go between symbols, lone pairs stay outside. Every line is two electrons; every atom should end with an octet (a duet for H). These conventions, together with the counting rules below, let you draw essentially all of first-year structural chemistry.

## Constructing Lewis structures

::: algorithm Lewis structures, step by step {#alg-lewis}
**Input:** molecular formula (with connectivity if given, or inferred: least electronegative atom central, H and F always terminal). **Output:** a Lewis structure with formal charges assigned.
1. **Count valence electrons.** Sum group electrons for all atoms; add one per negative charge, subtract one per positive charge.
2. **Build the skeleton.** Connect atoms with single bonds; subtract $2$ electrons per bond from the count.
3. **Complete the octets of the outer atoms** (H stops at 2), subtracting as you go.
4. **Give any leftover electrons to the central atom.** If the central atom now has an octet, stop. If it has fewer than eight, convert a lone pair from a neighbouring atom into a second or third bond.
5. **Check formal charges** (see below). If a structure with the same skeleton has formal charges closer to zero, or puts negative charge on the more electronegative atom, prefer it.
6. **Sanity-check the total:** the formal charges must add to the charge of the species, and the electrons drawn must equal the count from step 1.
:::

::: example The carbonate ion, $\mathrm{CO_3^{2-}}$ {#ex-carbonate}
Draw the Lewis structure of $\mathrm{CO_3^{2-}}$.
::: solution
**Count:** C contributes $4$, each O contributes $6$, and the $2-$ charge adds $2$: $4 + 3\times 6 + 2 = 24$ valence electrons. **Skeleton:** carbon central (least electronegative, and H never central), three C–O single bonds: $24 - 6 = 18$ left. **Outer octets:** three lone pairs on each O uses all $18$. **Central atom:** carbon now has only $6$ electrons — two bonds short of an octet. **Convert:** take one lone pair from one oxygen and make it a second bond to carbon, giving one $\mathrm{C=O}$ and two $\mathrm{C–O}$: carbon has $8$, every oxygen has $8$, and $24$ electrons are drawn. **Formal charges:** carbon $4 - 0 - 4 = 0$; double-bonded O $6 - 4 - 2 = 0$; each single-bonded O $6 - 6 - 1 = -1$. Total $-2$ ✓.

Which oxygen carries the double bond? Nothing in the counting prefers one, and experiment decides: all three C–O bonds in carbonates are *identical*, $129\ \mathrm{pm}$ long. The answer is resonance — three equivalent contributors whose average is the real ion — taken up in [[#prop-resonance]].
:::
:::

::: example The hydronium ion, $\mathrm{H_3O^+}$ {#ex-hydronium}
Draw the Lewis structure of $\mathrm{H_3O^+}$ and locate its charge.
::: solution
**Count:** $6$ (O) $+ 3\times 1$ (H) $- 1$ (for the $+$ charge) $= 8$ electrons. **Skeleton:** three O–H bonds use $6$; hydrogen takes no lone pairs, so the remaining $2$ go on oxygen as one lone pair. Oxygen has three bonds and one lone pair — an octet; each H has its duet. **Formal charges:** each H $1 - 0 - 1 = 0$; oxygen $6 - 2 - 3 = +1$. The positive charge lives on the oxygen, and the lone pair is the reason $\mathrm{H_3O^+}$ is a base in its own right: that pair is where a proton would attach to make $\mathrm{H_4O^{2+}}$ — which does not happen in water, because putting two positive charges on one small atom is far too expensive. The same three-bonds-one-lone-pair pattern makes ammonia, $\mathrm{NH_3}$, neutral with its pair free to bond a proton, becoming $\mathrm{NH_4^+}$: in ammonium, nitrogen has four bonds, no lone pair, and formal charge $5 - 0 - 4 = +1$.
:::
:::

## Formal charge

Lewis structures are bookkeeping, and bookkeeping needs a balance sheet.

::: proposition Formal charge {#prop-formal-charge}
The **formal charge** of an atom in a Lewis structure is
$$
FC = V - N_\text{nb} - \tfrac{1}{2}N_\text{b} \;=\; V - (\text{non-bonding electrons}) - (\text{number of bonds}),
$$
where $V$ is the number of valence electrons of the free neutral atom, $N_\text{nb}$ the electrons drawn as lone pairs on the atom, and $N_\text{b}$ the electrons drawn in bonds around it (so each bond contributes $1$). Formal charge is *not* a partial charge or a prediction of where electrons actually are: it is the charge an atom would have if every bond were split equally. Used as a comparison tool it is remarkably good: structures with formal charges closest to zero, and with any negative formal charge on the more electronegative atom, are the dominant contributors to the real molecule.
:::

::: proof The formal charges sum to the charge of the species {#proof-formal-charge}
Sum the definition over all atoms $A$ in the species:
$$
\sum_A FC_A = \sum_A V_A - \sum_A N_{\text{nb},A} - \tfrac{1}{2}\sum_A N_{\text{b},A}.
$$
The first sum is the total valence electrons of the free neutral atoms, $V_\text{tot}$. The second is the total number of non-bonding electrons drawn, $N_\text{nb}$. For the third, each bond is shared by exactly two atoms and contributes $2$ bonding electrons to each of their counts, so $\sum_A N_{\text{b},A} = 2 \times (2 \times \text{number of bonds}) = 2N_\text{b}^\text{tot}$ where $N_\text{b}^\text{tot}$ is the total number of bonding electrons; hence $\tfrac12 \sum_A N_{\text{b},A} = N_\text{b}^\text{tot}$. Therefore
$$
\sum_A FC_A = V_\text{tot} - \left(N_\text{nb}^\text{tot} + N_\text{b}^\text{tot}\right) = V_\text{tot} - N_\text{tot},
$$
and $N_\text{tot}$, the electrons actually drawn, is $V_\text{tot}$ minus the charge of the ion (one electron added per negative charge). So $\sum_A FC_A$ equals the charge of the species. The proof is exactly the equal-sharing assumption: formal charges are what the bookkeeping gives when bonding electrons are split $50{:}\,50$, and the balance sheet must close.
:::

::: example Sulfur dioxide and the expanded-octet question {#ex-so2}
Two Lewis structures compete for $\mathrm{SO_2}$ ($18$ valence electrons): (a) $\mathrm{O{=}S{-}O}$ with one lone pair on S, one double and one single bond; (b) $\mathrm{O{=}S{=}O}$ with one lone pair on S and two double bonds. Compute the formal charges and judge.
::: solution
Sulfur has $V = 6$, oxygen $V = 6$. Structure (a): S has $2$ non-bonding electrons and $3$ bonds: $FC = 6 - 2 - 3 = +1$; double-bonded O: $6 - 4 - 2 = 0$; single-bonded O: $6 - 6 - 1 = -1$. Total $0$ ✓, but two atoms carry formal charge. Structure (b): S has $2$ non-bonding electrons and $4$ bonds: $FC = 6 - 2 - 4 = 0$; both O: $0$. All formal charges zero, so the textbook rule "minimise formal charge" prefers (b) — at the cost of putting $10$ electrons on sulfur. The modern view is more honest: high-level calculations show the S–O bonds are strongly polarised with little double-bond character beyond what (a) already contains, and the "extra" stabilisation of (b) is better described as ionic contribution ($\mathrm{S^+O^-}$ resonance) than as genuine $3d$-orbital participation. Both structures are legitimate bookkeeping; the lesson is that formal-charge rules rank *drawings*, not molecules.
:::
:::

::: example SF$_6$ and the expanded octet {#ex-sf6}
Draw $\mathrm{SF_6}$ and $\mathrm{PCl_5}$ and state what the octet rule says about them.
::: solution
$\mathrm{SF_6}$: $6 + 6\times 7 = 42$ valence electrons. Six S–F bonds use $12$; completing the six fluorine octets uses the remaining $30$; sulfur is left with *six bonds and no lone pairs* — $12$ electrons around it. $\mathrm{PCl_5}$: $5 + 5\times 7 = 40$; five bonds ($10$ electrons) plus five chlorine octets ($30$) leaves phosphorus with $10$. Both formally **exceed the octet** — third-period and heavier elements are drawn with 10, 12 or more electrons ("expanded octet", "hypervalency"), which is allowed by the bookkeeping because the valence shell of period 3 has $3d$ orbitals of the right symmetry to accept them. The caveat, stated honestly: modern bonding analysis finds $d$-orbitals contribute very little; the extra stability of $\mathrm{SF_6}$ over an octet-only picture is better described by *three-centre bonds* — electron pairs shared over three atoms at once — and by ionic contributions ($\mathrm{S^+F^-}$ character), not by six ordinary two-electron bonds to $3d$ hybrids. At textbook level the expanded-octet drawing is correct bookkeeping and excellent prediction; just do not mistake the drawing for the mechanism.
:::
:::

## Resonance

::: proposition Resonance and the hybrid {#prop-resonance}
When a single Lewis structure cannot place multiple bonds and lone pairs so as to give all atoms their best formal charges, several structures — **resonance contributors** — share the same atomic positions and differ only in electron placement. The real molecule is **not** any one contributor and **not** an equilibrium mixture of them: it is a single quantum-mechanical species, the **resonance hybrid**, whose electrons are delocalised over all the contributors at once. Consequences are observable: bond lengths and bond orders become intermediate and equalised. In the carbonate ion all three C–O bonds measure $129\ \mathrm{pm}$ — between the $\mathrm{C–O}$ single bond of methanol ($143\ \mathrm{pm}$) and the $\mathrm{C{=}O}$ double bond of carbonyl compounds ($120$–$122\ \mathrm{pm}$) — and each bond has bond order $1\tfrac{1}{3}$, the average of one double and two singles over three equivalent contributors.
:::

::: warning Resonance arrows are not equilibrium arrows — and the octet rule is not a law {#warn-resonance}
Two notation traps and one conceptual one. First, resonance contributors are connected by a double-headed arrow, $\mathrm{\leftrightarrow}$, and represent *one molecule*; equilibrium uses harpoons $\rightleftharpoons$ and represents *different molecules interconverting*. Writing the carbonate contributors with $\rightleftharpoons$ claims the double bond hops between oxygens in time — experiment says it does not: every bond is identical, always. Second, moving electrons never moves atoms: contributors that require atoms to change position are tautomers (a different topic), not resonance. Third, the octet rule is an empirical bookkeeping rule, not a law of nature: it works because eight electrons fill the four $s$ and $p$ valence orbitals of period-2 atoms, and it fails exactly where that counting fails — with fewer than eight, with odd numbers, and with the heavier elements.
:::

## Exceptions to the octet rule

**Incomplete octets.** Electron-deficient molecules of the lightest elements stop short of eight. $\mathrm{BeCl_2}$ ($16$ valence electrons) puts only four on beryllium, $\mathrm{Cl{-}Be{-}Cl}$; $\mathrm{BF_3}$ ($24$) puts six on boron, with an empty orbital that makes it a Lewis acid — it accepts a lone pair (from $\mathrm{NH_3}$, say) precisely to complete its octet. Boron's octet-deficiency is the whole of its organic and inorganic chemistry.

**Odd-electron molecules.** An odd total cannot be paired. Nitric oxide, $\mathrm{NO}$ ($11$ valence electrons), and nitrogen dioxide, $\mathrm{NO_2}$ ($17$), carry a single unpaired electron — they are **free radicals**, and their chemistry (NO as a signalling molecule, $\mathrm{NO_2}$ in smog chemistry) is radical chemistry. $\mathrm{NO_2}$ sidesteps its odd electron partly by dimerising to colourless $\mathrm{N_2O_4}$, pairing up.

**Expanded octets.** Third-period and heavier atoms are drawn with 10–12 valence electrons ($\mathrm{PCl_5}$, $\mathrm{SF_6}$, $\mathrm{ClF_4^-}$, phosphate's five bonds to P), with the modern caveat of [[#ex-sf6]]: the bookkeeping works, the $d$-orbital story is largely wrong, and three-centre bonding is the deeper explanation.

**Judging dominant contributors.** When several valid structures exist, rank them: (i) formal charges closest to zero dominate; (ii) among equals, negative formal charge on the more electronegative atom dominates; (iii) structures placing like charges on adjacent atoms are disfavoured; (iv) more covalent bonds (an octet on every period-2 atom) outweighs all other considerations — never break an octet on carbon, nitrogen, oxygen or fluorine to spare a formal charge.

## Bond order, bond length and bond energy

The **bond order** is the number of shared pairs between two atoms: $1$ for a single bond, $2$ for a double, $3$ for a triple, and a fraction for delocalised bonds (carbonate: $1\tfrac13$; benzene's C–C: $1\tfrac12$). Three facts tie the chapter together. Bond order, length and energy are linked: going from C–C to C=C to C≡C, the length falls ($154$, $134$, $120\ \mathrm{pm}$) and the energy rises ($348$, $612$, $837\ \mathrm{kJ\,mol^{-1}}$) — more shared electrons pull the nuclei closer and hold them tighter. The relation is inverse but *not* proportional: a triple bond is not three times a single bond, because the extra pairs go into $\pi$ orbitals that overlap less well than the $\sigma$ bond they join. And bond energies are *bond-specific*: the $413\ \mathrm{kJ\,mol^{-1}}$ of a C–H bond is not the same in methane and in acetaldehyde, which is why tabulated values are *mean* bond enthalpies and calculations with them are estimates.

::: widget plot
f: 348*(1-exp(-0.021*(x-154)))*(1-exp(-0.021*(x-154))) - 348; 612*(1-exp(-0.021*(x-134)))*(1-exp(-0.021*(x-134))) - 612; 837*(1-exp(-0.021*(x-120)))*(1-exp(-0.021*(x-120))) - 837
x: 100, 200
y: -950, 300
labels: \text{C--C single}; \text{C=C double}; \text{C}\equiv\text{C triple}
caption: Morse-shaped potential wells for the carbon–carbon single, double and triple bonds, with experimental minima ($154\ \mathrm{pm}$, $348\ \mathrm{kJ\,mol^{-1}}$), ($134\ \mathrm{pm}$, $612\ \mathrm{kJ\,mol^{-1}}$) and ($120\ \mathrm{pm}$, $837\ \mathrm{kJ\,mol^{-1}}$). Read the pattern straight off the picture: higher bond order means a well that is both deeper and further left — shorter and stronger together. Note the well *widths* are similar: the force constant (curvature at the minimum) grows less dramatically than the depth, which is why triple-bond stretching frequencies rise only from about $1000$ to $2100\ \mathrm{cm^{-1}}$ rather than by the factor three the depths would suggest.
:::

::: example Hydrogenating ethene with mean bond enthalpies {#ex-bond-enthalpy}
Estimate $\Delta_\mathrm{r}H$ for $\mathrm{H_2C{=}CH_2(g) + H_2(g) \to H_3C{-}CH_3(g)}$ from mean bond enthalpies: $\mathrm{C{=}C}\ 612$, $\mathrm{H–H}\ 436$, $\mathrm{C–C}\ 348$, $\mathrm{C–H}\ 413\ \mathrm{kJ\,mol^{-1}}$.
::: solution
List what breaks and what forms, counting only what *changes*. Broken: one $\mathrm{C{=}C}$ ($612$) and one $\mathrm{H–H}$ ($436$): $+1048\ \mathrm{kJ\,mol^{-1}}$. Formed: one $\mathrm{C–C}$ ($348$) and two new $\mathrm{C–H}$ bonds ($2 \times 413 = 826$): $-1174\ \mathrm{kJ\,mol^{-1}}$. (The four C–H bonds already in ethene are unchanged and cancel.)
$$
\Delta_\mathrm{r}H \approx 1048 - 1174 = -126\ \mathrm{kJ\,mol^{-1}}.
$$
The experimental value from standard enthalpies of formation ($\Delta_\mathrm{f}H^\circ$: $\mathrm{C_2H_4}$, $+52.3$; $\mathrm{C_2H_6}$, $-84.7\ \mathrm{kJ\,mol^{-1}}$) is $-137\ \mathrm{kJ\,mol^{-1}}$ — the estimate is $8\ \%$ low, typical. Mean bond enthalpies are gas-phase averages over many compounds; they are a first estimate and a way of *thinking*, not a source of precise numbers.
:::
:::

::: warning Mean bond enthalpies are averages — know when they fail {#warn-mean-bond-enthalpies}
Three limits. (i) *Gas phase only*: bond enthalpies refer to isolated molecules; a reaction in solution carries enthalpies of solvation that can swamp the difference (the same hydrogenation in a liquid-phase calorimeter gives a different number). (ii) *Averages*: the tabulated $\mathrm{C–H}$ value of $413\ \mathrm{kJ\,mol^{-1}}$ is a mean over dozens of compounds; the actual bond in methane is $439$, and the benzylic C–H is far weaker — reactions that make or break unusually strong or weak bonds defeat the estimate. (iii) *Not state functions per molecule*: the method assumes bond-additivity, so it degrades when resonance stabilisation differs between reactant and product — hydrogenating benzene, for instance, underestimates the endothermic penalty because the tabulated "three C=C" picture ignores aromaticity. Use mean bond enthalpies to estimate and to reason; use formation enthalpies to decide.
:::

::: quiz
Nitrous oxide, $\mathrm{N_2O}$ ($16$ valence electrons, skeleton N–N–O), has three plausible contributors. Which is the dominant one?
- [x] $\mathrm{N{\equiv}N^{{+}}{-}O^{{-}}}$: the negative formal charge sits on oxygen, the most electronegative atom.
- [ ] $\mathrm{{^-}N{=}N^{+}{=}O}$: it has the most bonds.
- [ ] $\mathrm{N{\equiv}O^{+}{-}N^{-}}$: it places the triple bond on the terminal nitrogen.
- [ ] All three contribute equally — $\mathrm{N_2O}$ is a resonance hybrid like carbonate.
::: solution
Formal charges: in $\mathrm{N{\equiv}N{-}O}$ the terminal N is $5-2-3 = 0$, the central N is $5-0-4 = +1$, the O is $6-6-1 = -1$; in $\mathrm{N{=}N{=}O}$ the terminal N is $-1$ and the O is $0$. Both have the same formal-charge magnitudes, so rule (ii) decides: negative charge belongs on oxygen, and $\mathrm{N{\equiv}N{-}O}$ dominates (the third structure, with O central and a positive N anion, is far worse). Experiment agrees: the N–N distance, $113\ \mathrm{pm}$, lies just above an N≡N triple bond ($110\ \mathrm{pm}$), and the N–O, $119\ \mathrm{pm}$, sits between double and single — the hybrid is mostly triple-single. Equal contribution would require equivalent atoms, as in carbonate; here the atoms differ.
:::
:::

::: history
In 1916 Gilbert N. Lewis, building on his cubical-atom model of 1902, published "The Atom and the Molecule" in the *Journal of the American Chemical Society*: atoms bond by transferring or — the new idea — *sharing* electron pairs, and they do so to complete shells of eight. Irving Langmuir, who had coined neither term but quickly owned the subject, generalised the picture in 1919, introducing the words **covalent** and **octet rule**, tying bond strength to electron density between nuclei, and extending the model to aromatic systems. The quantum-mechanical justification arrived in 1927 with Heitler and London's treatment of $\mathrm{H_2}$, and the synthesis came in 1939 with Linus Pauling's *The Nature of the Chemical Bond*, which fused Lewis's bookkeeping, quantum mechanics and diffraction data into one quantitative theory with bond order, bond length and electronegativity as its working tools. The dot diagrams you drew today are, with almost no change, the diagrams Lewis drew a century ago — the rarest fate in science: a notation that outlived every theory meant to replace it.
:::

## Where this leads

Lewis structures are the input to every later model in this course. Shape comes next: [[bonding-structure/vsepr]] turns electron pairs into three-dimensional geometry, and [[bonding-structure/valence-bond]] explains that geometry with hybrid orbitals and $\sigma$/$\pi$ bonds. The failures of the pairing picture — the paramagnetism of $\mathrm{O_2}$, the colour of iodine vapour — are resolved in [[bonding-structure/molecular-orbitals]], and the forces *between* the molecules you can now draw are [[bonding-structure/intermolecular-forces]]. Naming and formula-writing conventions for the structures drawn here are in [[general-chemistry-1/formulas-nomenclature]], and the quantum theory of the electron-pair bond is [[quantum-chemistry/chemical-bond-qm]].

::: summary
- A covalent bond is a shared electron pair attracted to two nuclei; the $\mathrm{H_2}$ well ($74\ \mathrm{pm}$, $436\ \mathrm{kJ\,mol^{-1}}$) is the prototype, and bond length and bond energy are its two measured signatures.
- Lewis bookkeeping: count valence electrons (add for anions, subtract for cations), build the skeleton, fill octets, convert lone pairs to multiple bonds if the central atom is short.
- Formal charge $FC = V - N_\text{nb} - N_\text{bonds}$ assumes equal sharing; the formal charges always sum to the charge of the species.
- Dominant contributors have formal charges closest to zero, with negative formal charge on the more electronegative atom.
- Resonance contributors differ only in electrons; the real molecule is one hybrid with averaged, equalised bonds (carbonate: three identical $129\ \mathrm{pm}$ bonds, bond order $1\tfrac13$).
- The octet rule is empirical bookkeeping: it fails for incomplete octets ($\mathrm{BF_3}$, $\mathrm{BeCl_2}$), odd-electron species ($\mathrm{NO}$, $\mathrm{NO_2}$) and expanded octets ($\mathrm{SF_6}$, better described by three-centre bonding).
- Higher bond order means shorter, stronger bonds; mean bond enthalpies estimate reaction enthalpies to about $10\ \%$ — gas phase only.
:::

## Exercises

::: exercise Nitrate ion {level=1}
Draw the Lewis structure of the nitrate ion, $\mathrm{NO_3^-}$, assign formal charges, and state how many resonance contributors it has.
::: solution
Valence electrons: $5 + 3\times 6 + 1 = 24$. Three N–O single bonds ($6$ electrons), complete the oxygen octets ($18$): nitrogen has only $6$, so convert one oxygen's lone pair into an N=O double bond. Formal charges: N $5 - 0 - 4 = +1$; double-bonded O $0$; each single-bonded O $6 - 6 - 1 = -1$; total $-1$ ✓. Three equivalent contributors (the double bond may sit on any oxygen), so the real ion has three equal bonds of order $1\tfrac13$ — isoelectronic with carbonate.
:::
:::

::: exercise Counting electrons {level=1}
How many valence electrons are drawn in the Lewis structures of (a) $\mathrm{SO_4^{2-}}$, (b) $\mathrm{HCN}$, (c) $\mathrm{NO_2^+}$, (d) $\mathrm{NH_4^+}$? Give the electron count around the central atom in each.
::: solution
(a) $6 + 4\times 6 + 2 = 32$; sulfur carries four $\sigma$ bonds (eight electrons in the simple octet drawing; ten or twelve if S=O double bonds are drawn). (b) $1 + 4 + 5 = 10$; the structure is $\mathrm{H{-}C{\equiv}N}$: with one lone pair on N, carbon has four bonds (eight electrons), nitrogen an octet. (c) $5 + 2\times 6 - 1 = 16$; $\mathrm{O{=}N^{+}{=}O}$, nitrogen with two double bonds and no lone pairs — eight electrons, isoelectronic with $\mathrm{CO_2}$. (d) $5 + 4 - 1 = 8$; nitrogen with four bonds, no lone pairs, formal charge $+1$.
:::
:::

::: exercise Carbon monoxide {level=1}
Draw the Lewis structure of carbon monoxide, $\mathrm{CO}$ (ten valence electrons), assign formal charges, and explain why the structure is uncomfortable.
::: solution
With a lone pair on each atom and a triple bond, $\mathrm{:C{\equiv}O:}$, both atoms have octets: C $4 - 2 - 3 = -1$, O $6 - 2 - 3 = +1$. The molecule is neutral but the formal charges are $-1$ on carbon and $+1$ on oxygen — the *wrong way round* by electronegativity. This is the octet bookkeeping working perfectly and predicting badly: the true dipole is small, with the negative end on oxygen, and CO's chemistry (bonding to metals through its carbon lone pair) follows the formal-charge picture more than the electronegativity picture. A useful first lesson in why one drawing is not the molecule.
:::
:::

::: exercise A mean-bond-enthalpy estimate {level=2 check="-103"}
Estimate $\Delta_\mathrm{r}H$ for the first chlorination step $\mathrm{CH_4(g) + Cl_2(g) \to CH_3Cl(g) + HCl(g)}$ from mean bond enthalpies: $\mathrm{C–H}\ 413$, $\mathrm{Cl–Cl}\ 243$, $\mathrm{C–Cl}\ 328$, $\mathrm{H–Cl}\ 431\ \mathrm{kJ\,mol^{-1}}$. (Enter $\Delta_\mathrm{r}H$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
Broken: one C–H and one Cl–Cl: $413 + 243 = 656\ \mathrm{kJ\,mol^{-1}}$. Formed: one C–Cl and one H–Cl: $328 + 431 = 759\ \mathrm{kJ\,mol^{-1}}$.
$$
\Delta_\mathrm{r}H \approx 656 - 759 = -103\ \mathrm{kJ\,mol^{-1}}.
$$
Exothermic, as every hydrogen-abstraction/chlorination pair in the radical chain mechanism turns out to be — which is why the reaction runs once initiated.
:::
:::

::: exercise Judge the contributors {level=2}
Two Lewis structures of isocyanic acid, $\mathrm{HNCO}$, can be written $\mathrm{H{-}N{=}C{=}O}$ and $\mathrm{H{-}N{-}C{\equiv}O}$ (with lone pairs completing octets). Compute the formal charges on N, C and O in each and identify the dominant contributor.
::: solution
In $\mathrm{H{-}N{=}C{=}O}$: nitrogen has three bonds (one to H, a double bond to C) and one lone pair: $FC = 5 - 2 - 3 = 0$; carbon has four bonds: $4 - 0 - 4 = 0$; oxygen has two bonds and two lone pairs: $6 - 4 - 2 = 0$. Every formal charge is zero. In $\mathrm{H{-}N{-}C{\equiv}O}$: nitrogen has two single bonds and two lone pairs: $5 - 4 - 2 = -1$; carbon has four bonds: $0$; oxygen has one triple bond and one lone pair: $6 - 2 - 3 = +1$. The second structure therefore separates charge, putting a positive formal charge on the most electronegative atom. The first structure, with all formal charges zero, dominates — and indeed the real molecule (isocyanic/fulminic acid chemistry aside) keeps cumulative double bonds wherever the atoms allow. The exercise's point: formal charges decide between structures that both satisfy the octet rule.
:::
:::

::: exercise Formal charges in hydrogen carbonate {level=2}
Assign the formal charges in the dominant Lewis structure of the hydrogen carbonate (bicarbonate) ion, $\mathrm{HCO_3^-}$, and state which oxygen atoms share the charge.
::: solution
$4 + 1 + 3\times 6 + 1 = 24$ valence electrons. Skeleton: C central, bonded to three O, one of which carries the H. With one C=O, two C–O, and the O–H: formal charges are C $4-0-4 = 0$; carbonyl O $0$; the O–H oxygen $6-4-2 = 0$; the remaining single-bonded O $6-6-1 = -1$. Total $-1$ ✓. The $-1$ is shared by the two oxygens *not* bearing hydrogen — the double bond resonates between the C=O and the other C–O — which is why both deprotonations of carbonic acid give ions with two equivalent C–O bonds and why the proton sits on oxygen.
:::
:::

::: exercise Thiosulfate, fully analysed {level=3}
Thiosulfate, $\mathrm{S_2O_3^{2-}}$, has the skeleton $\mathrm{O_3S{-}S}$ (central sulfur bonded to three oxygens and to the terminal sulfur). Draw the dominant Lewis structure with formal charges, and explain the textbook statement that "the two sulfur atoms have oxidation states $-2$ and $+6$ while the average is $+2$".
::: solution
Valence electrons: $2\times 6 + 3\times 6 + 2 = 32$. A good low-formal-charge structure: central S with two S=O double bonds, one S–O single bond, and one S–S single bond (six bonds, no lone pairs on central S); terminal S with three lone pairs. Formal charges: central S $6 - 0 - 6 = 0$; double-bonded O's $0$; single-bonded O $6 - 6 - 1 = -1$; terminal S $6 - 6 - 1 = -1$. Total $-2$ ✓, and the two negative formal charges sit on the terminal S and on oxygen — consistent with thiosulfate binding metals through the terminal sulfur (it is the soft, sulfide-like end). For oxidation states, assign the bonding electrons by electronegativity: each O takes $-2$ (total $-6$), and the S–S bond splits equally, so the terminal S is $-2$-like (sulfide) and the central S carries $+6$ (sulfate-like): $(-2) + (+6) + 3(-2) = -2$ ✓. The average, $+2$, is what a redox titration with iodine (tetrathionate formation) measures — the two sulfurs are spectroscopically and chemically distinct, and the exercise is the whole difference between formal charge, oxidation state and reality in one ion.
:::
:::

::: exercise Bond enthalpies versus formation enthalpies {level=3 check="-126"}
For the hydrogenation $\mathrm{H_2C{=}CH_2(g) + H_2(g) \to H_3C{-}CH_3(g)}$: (a) estimate $\Delta_\mathrm{r}H$ from mean bond enthalpies ($\mathrm{C{=}C}\ 612$, $\mathrm{H–H}\ 436$, $\mathrm{C–C}\ 348$, $\mathrm{C–H}\ 413\ \mathrm{kJ\,mol^{-1}}$); (b) compute the exact value from $\Delta_\mathrm{f}H^\circ(\mathrm{C_2H_4}) = +52.3$ and $\Delta_\mathrm{f}H^\circ(\mathrm{C_2H_6}) = -84.7\ \mathrm{kJ\,mol^{-1}}$; (c) explain the sign and size of the discrepancy. (Enter your answer to part (a) in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
(a) Broken $612 + 436 = 1048$; formed $348 + 2\times 413 = 1174$; $\Delta_\mathrm{r}H \approx -126\ \mathrm{kJ\,mol^{-1}}$. (b) $\Delta_\mathrm{r}H = -84.7 - 52.3 - 0 = -137\ \mathrm{kJ\,mol^{-1}}$. (c) The estimate is $11\ \mathrm{kJ\,mol^{-1}}$ ($8\ \%$) too small. The reason is built into the method: the tabulated $\mathrm{C{=}C}$ mean enthalpy is an average over many alkenes, and the $\mathrm{C–H}$ mean is dominated by $sp^3$ compounds, so replacing a real alkene $\pi$ bond (weaker than the average suggests once the product's two new C–H bonds are formed in ethane's particular environment) with averages slightly under-cancels. The discrepancy is a warning, not a failure: mean bond enthalpies get hydrogenations right to within about $10\ \%$, and when a reaction's answer matters, formation enthalpies — which contain every environmental detail — are the court of appeal.
:::
:::
