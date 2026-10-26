The periodic table is the main-group chemist's periodic table of *causes*. Every reaction, structure and material in the chapters that follow — the violence of caesium on water, the inertness of nitrogen, the acidity of perchloric acid, the stability of lead(II) over lead(IV) — traces back to a handful of measurable quantities that vary smoothly across the table: how large an atom or ion is, how tightly it holds its electrons, how strongly it attracts shared ones, and how many of them it can afford to lose. This chapter makes those quantities precise, fixes their trends, and — just as importantly — catalogues the anomalies, because in main-group chemistry the anomalies (the weak F–F bond, the inert pair, gallium's unexpected smallness) are where the real physics shows. The trends themselves were first mapped in [[general-chemistry-1/periodicity]]; here we use them as working tools, and we learn to *calculate* with them rather than merely recite them.

## Sizes: the first trend

::: definition Radii of atoms and ions {#def-radii}
There is no such thing as "the radius of an atom" until a measurement convention is fixed. The **covalent radius** is half the distance between two identical atoms joined by a single bond ($r(\mathrm{C}) = 76\ \mathrm{pm}$ from $\mathrm{C{-}C}$ bond lengths), the **metallic radius** half the nearest-neighbour distance in the metal, and the **van der Waals radius** the closest non-bonded contact. An **ionic radius** is a fitted partition of an ion–ion distance in a crystal, and it depends on the coordination number and on the assumed partition — which is why radii are tabulated by coordination number (the values below are Shannon's for octahedral coordination). With that caveat the numbers are wonderfully transferable: $\mathrm{Li^+}\ 76$, $\mathrm{Na^+}\ 102$, $\mathrm{K^+}\ 138$, $\mathrm{Rb^+}\ 152$, $\mathrm{Cs^+}\ 167\ \mathrm{pm}$; $\mathrm{Mg^{2+}}\ 72$, $\mathrm{Ca^{2+}}\ 100$, $\mathrm{Sr^{2+}}\ 118$, $\mathrm{Ba^{2+}}\ 135\ \mathrm{pm}$; $\mathrm{O^{2-}}\ 140$, $\mathrm{F^-}\ 133$, $\mathrm{Cl^-}\ 181$, $\mathrm{S^{2-}}\ 184\ \mathrm{pm}$.
:::

Two rules organise the table of radii. **Down a group the radius increases**: each period adds a shell, and although the nuclear charge grows, the added inner electrons screen it almost perfectly. **Across a period the radius decreases**: electrons are added to the *same* shell while the nuclear charge rises, and same-shell electrons screen each other poorly, so the effective nuclear charge $Z_\mathrm{eff}$ felt by the outer electrons climbs and pulls them in. Cations are smaller than their parent atoms (the valence shell is gone and what remains feels a higher $Z_\mathrm{eff}$ per electron), anions larger (extra electron–electron repulsion in a filled shell); a useful book-keeping fact is that $\mathrm{M^+}$ is roughly isoelectronic with the preceding noble gas and about half the diameter of the atom.

::: example An isoelectronic series {#ex-isoelectronic}
Arrange $\mathrm{O^{2-}}$, $\mathrm{F^-}$, $\mathrm{Na^+}$, $\mathrm{Mg^{2+}}$ and $\mathrm{Al^{3+}}$ in order of size and explain the order quantitatively.
::: solution
All five have ten electrons — the neon configuration — so nothing changes in shielding *within* the series; only the nuclear charge changes, running $Z = 8, 9, 11, 12, 13$. Greater $Z$ at constant electron count pulls the same cloud in tighter, so the order is
$$
\mathrm{O^{2-}}\ (140) > \mathrm{F^-}\ (133) > \mathrm{Na^+}\ (102) > \mathrm{Mg^{2+}}\ (72) > \mathrm{Al^{3+}}\ (53.5)\ \mathrm{pm}.
$$
Note the arithmetic: raising the nuclear charge from 8 ($\mathrm{O^{2-}}$) to 13 ($\mathrm{Al^{3+}}$) shrinks the ion by a factor of $140/53.5 \approx 2.6$. An isoelectronic series is the cleanest demonstration that size is a battle between electron count and nuclear charge, and that the nucleus wins whenever it can add protons without adding shells.
:::
:::

::: example Why gallium is not bigger than aluminium {#ex-ga-al}
Aluminium and gallium are in the same group, yet the covalent radii are almost identical ($121$ and $122\ \mathrm{pm}$) and the metallic radius of gallium ($135\ \mathrm{pm}$) is *smaller* than aluminium's ($143\ \mathrm{pm}$). Why?
::: solution
Between Al ($Z = 13$) and Ga ($Z = 31$) the ten $3d$ electrons are added, and $d$ electrons screen the nuclear charge poorly (their radial distributions penetrate to the nucleus less than $s$ and $p$ of the same shell). The ten $3d$ electrons screen those extra protons poorly, so the $4p$ electron of gallium feels a higher $Z_\mathrm{eff}$ than a simple shell-counting argument allows — the **d-block contraction**. The other eight protons added between Al and Ga are well screened by $s$ and $p$ electrons. The same argument, with $4f$ electrons instead of $3d$, produces the **lanthanide contraction**, which makes $\mathrm{Zr^{4+}}$ ($72\ \mathrm{pm}$) and $\mathrm{Hf^{4+}}$ ($71\ \mathrm{pm}$) twins and makes thallium ($145\ \mathrm{pm}$) barely larger than indium ($142\ \mathrm{pm}$). Consequence to remember: down groups 13–16 the *sixth-period* element is anomalously similar in size to the fifth, and anomalously electronegative — chemistry this chapter will exploit repeatedly.
:::
:::

::: widget plot
f: 0.65*x - 4.95
x: 11, 17
y: 0, 8
labels: \text{Slater } Z_{\text{eff}} \text{ for a 3p electron}
caption: The effective nuclear charge felt by a 3p electron across period 3, from Slater's rules (see the proposition below): $Z_\mathrm{eff} = Z - [2(1.00) + 8(0.85) + (Z-11)(0.35)] = 0.65Z - 4.95$, rising from $2.20$ at sodium to $6.10$ at chlorine. The slope $0.65$ is the whole story of period-3 chemistry: each added proton is only 65 % screened by the electron added to the same shell, so atoms contract, ionisation energies climb and oxides change from basic ($\mathrm{Na_2O}$) to amphoteric ($\mathrm{Al_2O_3}$) to acidic ($\mathrm{SO_3}$) in seven steps.
:::

## Ionisation energies: how many electrons, and how hard

::: definition Successive ionisation energies {#def-ie}
The **first ionisation energy** $IE_1$ is the minimum energy for $\mathrm{M(g) \to M^+(g) + e^-(g)}$; the **second** $IE_2$ removes an electron from the cation, and so on. All are positive, and each is larger than the last, because removing an electron from an increasingly positive ion costs more. Representative values ($\mathrm{kJ\,mol^{-1}}$): $\mathrm{Li}\ 520$, $\mathrm{Na}\ 496$, $\mathrm{K}\ 419$, $\mathrm{Rb}\ 403$, $\mathrm{Cs}\ 376$; $\mathrm{Be}\ 900$, $\mathrm{B}\ 801$, $\mathrm{C}\ 1086$, $\mathrm{N}\ 1402$, $\mathrm{O}\ 1314$, $\mathrm{F}\ 1681$, $\mathrm{Ne}\ 2081$; $\mathrm{He}\ 2372$ (the largest of all).
:::

The group trend (down: smaller) and period trend (across: larger) follow directly from the size argument, with two systematic wrinkles: $IE_1(\mathrm{B}) < IE_1(\mathrm{Be})$ because boron's fifth electron enters a $2p$ orbital, higher in energy than the filled $2s$ subshell; and $IE_1(\mathrm{O}) < IE_1(\mathrm{N})$ because oxygen's fourth $2p$ electron must pair in an orbital and pays pairing repulsion. Both wrinkle the "smooth" trend by only a few per cent, but they are the evidence that subshell structure is real, and they repeat in every period.

The chemically decisive feature is not the smooth part but the **jumps**: $IE_2 \gg IE_1$ once a shell is breached. Magnesium costs $738$, $1451$, $7733\ \mathrm{kJ\,mol^{-1}}$ — the third ionisation breaks into the neon core, and no lattice or hydration energy repays that. The jump locates the valence, and hence the group, of an unknown element.

::: proposition Slater's rules {#prop-slater}
The effective nuclear charge felt by an electron can be estimated as $Z_\mathrm{eff} = Z - \sigma$, where the screening constant $\sigma$ is built by summing contributions: electrons in higher groups screen $0$; electrons in the same $(ns, np)$ group screen $0.35$ each (except $1s$, $0.30$); electrons in the $n-1$ shell screen $0.85$; electrons deeper still screen $1.00$. For $d$ and $f$ electrons the same-group contribution is $0.35$ and all inner electrons screen $1.00$.
:::

::: proof The slope of a period
Take a $3p$ electron in a period-3 atom. Slater's rules give $\sigma = 2(1.00) + 8(0.85) + (Z - 11)(0.35)$, so
$$
Z_\mathrm{eff} = Z - 8.80 - 0.35(Z - 11) = 0.65\,Z - 4.95 .
$$
The coefficient $0.65$ is $1 - 0.35$: within a shell, each added electron screens only 35 % of the proton added beside it, so $Z_\mathrm{eff}$ — and with it the binding energy, and against it the radius — drift linearly across the period with slope $0.65$ per element. A hydrogenic estimate $E \propto Z_\mathrm{eff}^2/n^{*2}$ then predicts $IE_1$ to rise by $(6.75/2.20)^2 \approx 9.4$ from Na ($Z_\mathrm{eff} = 2.20$) to Ar ($Z_\mathrm{eff} = 0.65\times 18 - 4.95 = 6.75$); the observed ratio is $1521/496 \approx 3.1$. The $6.10$ quoted for chlorine is not argon's. The discrepancy is the growing electron–electron repulsion the model ignores — but the *direction* of the period trend is Slater's, and that is enough to make predictions.
:::

::: example Identifying an element from its ionisation energies {#ex-ie-jump}
An element shows $IE = 578,\ 1817,\ 2745,\ 11578\ \mathrm{kJ\,mol^{-1}}$ (first to fourth). Which group is it in, and what formulas should its common compounds have?
::: solution
The first three ionisations are modest and grow smoothly; the fourth is more than four times the third. Three electrons are therefore valence electrons and the fourth comes from a core shell, so the element is in **group 13** (the numbers are aluminium's). Expect $\mathrm{E^+}$ and $\mathrm{E^{3+}}$ chemistry. $IE_1(\mathrm{Al}) = 578\ \mathrm{kJ\,mol^{-1}}$ is comparable to sodium's, so the lattice energy of a hypothetical $\mathrm{Al^+Cl^-}$ is not the unpaid bill. Solid $\mathrm{AlCl}$ is unknown because it disproportionates, $3\,\mathrm{AlCl} \to 2\,\mathrm{Al} + \mathrm{AlCl_3}$: the Born–Haber argument of [[bonding-structure/ionic-bonding]] applied to the $+3$ state, which wins.
:::
:::

::: quiz
Which pair breaks the smooth first-ionisation trend in period 2?
- [x] B and O — B ionises a fresh 2p electron; O pairs one, paying repulsion.
- [ ] Li and Be — both ionise 2s electrons.
- [ ] C and N — both follow the rising trend.
- [ ] N and F — both ionise unpaired-to-paired 2p electrons in order.
::: solution
Boron's electron configuration is $1s^2 2s^2 2p^1$: the $2p$ electron is easier to remove than beryllium's $2s$. Oxygen is $2p^4$: the first doubly-occupied $2p$ orbital suffers pairing repulsion, so oxygen ionises more easily than nitrogen's stable half-filled $2p^3$. Lithium and beryllium, carbon and nitrogen, nitrogen and fluorine all follow the rising trend.
:::
:::

## Electron affinity and electronegativity

::: definition Electron affinity {#def-ea}
The **first electron affinity** expressed as an enthalpy, $\Delta_\mathrm{ea}H_1$, is the enthalpy change for $\mathrm{X(g) + e^- \to X^-(g)}$; where the process is exothermic the value is negative, and tables that quote "electron affinity" as a positive number of kilojoules *released* are using the opposite sign — check before quoting. Values released ($\mathrm{kJ\,mol^{-1}}$): $\mathrm{F}\ 328$, $\mathrm{Cl}\ 349$, $\mathrm{Br}\ 325$, $\mathrm{I}\ 295$, $\mathrm{H}\ 73$, $\mathrm{O}\ 141$ (first), $\mathrm{S}\ 200$. Chlorine, not fluorine, has the most exothermic electron affinity: adding an electron to the compact $n = 2$ shell of fluorine forces it into a region of high electron–electron repulsion, an effect that vanishes as the shell grows down the group. Second electron affinities are always endothermic (charge pushed onto charge) — the $\mathrm{O^{2-}}$ story of [[bonding-structure/ionic-bonding]].
:::

::: definition Electronegativity and Pauling's scale {#def-en}
The **electronegativity** $\chi$ measures the tendency of an atom *in a molecule* to attract bonding electrons. Pauling defined the difference from bond enthalpies $D$ (in eV):
$$
\chi_\mathrm{A} - \chi_\mathrm{B} = \sqrt{D(\mathrm{A{-}B}) - \sqrt{D(\mathrm{A{-}A})\,D(\mathrm{B{-}B})}}\,,
$$
the square root of the extra stability a polar bond has over the average of the homonuclear ones — the electrostatic bonus of partial charges. Anchoring $\chi(\mathrm{H}) = 2.20$ gives the familiar scale: $\mathrm{F}\ 3.98$, $\mathrm{O}\ 3.44$, $\mathrm{Cl}\ 3.16$, $\mathrm{N}\ 3.04$, $\mathrm{C}\ 2.55$, $\mathrm{H}\ 2.20$, $\mathrm{Na}\ 0.93$, $\mathrm{Cs}\ 0.79$. Electronegativity increases up and to the right, tracking $Z_\mathrm{eff}$ divided by size.
:::

::: example Computing Pauling's electronegativity of chlorine {#ex-pauling-cl}
Using $D(\mathrm{H{-}H}) = 436$, $D(\mathrm{Cl{-}Cl}) = 243$, $D(\mathrm{H{-}Cl}) = 431\ \mathrm{kJ\,mol^{-1}}$, compute $\chi(\mathrm{Cl})$.
::: solution
Convert to electronvolts ($1\ \mathrm{eV} = 96.485\ \mathrm{kJ\,mol^{-1}}$): $D(\mathrm{H{-}H}) = 4.52$, $D(\mathrm{Cl{-}Cl}) = 2.52$, $D(\mathrm{H{-}Cl}) = 4.47\ \mathrm{eV}$. Then
$$
\chi(\mathrm{Cl}) - \chi(\mathrm{H}) = \sqrt{4.47 - \sqrt{4.52 \times 2.52}} = \sqrt{4.47 - 3.38} = \sqrt{1.09} = 1.04,
$$
so $\chi(\mathrm{Cl}) = 2.20 + 1.04 = 3.24$, close to the tabulated $3.16$ (the residual depends on which bond-enthalpy set and which averaging Pauling's descendants used). The same arithmetic with $D(\mathrm{F{-}F}) = 159$ and $D(\mathrm{H{-}F}) = 567\ \mathrm{kJ\,mol^{-1}}$ gives $\chi(\mathrm{F}) = 3.97$ — the scale's anchor of maximum. The exercise is worth doing once because it shows electronegativity is not a mystical property: it is bond enthalpy data, rearranged.
:::
:::

The difference $\Delta\chi$ predicts bond polarity: the **percent ionic character** is well approximated by $100\left[1 - \exp\!\left(-(\Delta\chi)^2/4\right)\right]$, which gives $3\ \%$ for $\mathrm{C{-}H}$ ($\Delta\chi = 0.35$), $32\ \%$ for $\mathrm{O{-}H}$ ($1.24$) and $55\ \%$ for $\mathrm{H{-}F}$ ($1.78$). No bond between unlike atoms is purely covalent; the ionic model of [[bonding-structure/ionic-bonding]] and the covalent model of [[bonding-structure/covalent-lewis]] are the two ends of one continuum, and main-group chemistry lives in between.

## Oxidation states and the inert pair

::: definition Oxidation state {#def-oxstate}
The **oxidation state** of an atom is the charge left on it after its bonds are assigned ionically — each bonding pair given to the more electronegative partner. It is a bookkeeping device, not a measured charge (in $\mathrm{CO_2}$ the carbon is formally $+4$ but carries little actual positive charge), and it must be distinguished from **formal charge**, which splits bonding pairs equally. For main-group elements the maximum oxidation state equals the group valence (group number in 13–17, counting $s + p$ electrons), and the common states differ from it by two.
:::

That last clause — states differing by two — is the **inert-pair effect**, the master pattern of heavier p-block chemistry.

::: definition The inert-pair effect {#def-inert-pair}
Down groups 13–15 the **lower oxidation state**, lower by two than the group valence, becomes progressively more stable: $\mathrm{Tl^+}$ beats $\mathrm{Tl^{3+}}$, $\mathrm{Pb^{2+}}$ beats $\mathrm{Pb^{4+}}$, $\mathrm{Bi^{3+}}$ beats $\mathrm{Bi^{5+}}$. It is not a group-17 trend: iodine(VII) is more stable than bromine(VII). The two electrons that "stay home" are the $ns^2$ pair — the **inert pair** — whose reluctance to bond grows down the group because poor $d$- and $f$-screening and relativistic contraction pull the $s$ orbital in (the $6s$ pair of thallium, lead and bismuth is measurably stabilised), while the $np$ electrons remain available.
:::

::: example Lead(II) versus lead(IV) {#ex-lead}
$\mathrm{PbO}$ is stable in air; $\mathrm{PbO_2}$ is a powerful oxidiser ($E^\circ(\mathrm{PbO_2, H^+/Pb^{2+}}) = +1.46\ \mathrm{V}$, enough to oxidise $\mathrm{Mn^{2+}}$ to $\mathrm{MnO_4^-}$). Explain, and predict the stable states of tin.
::: solution
Going from $\mathrm{Pb(II)}$ to $\mathrm{Pb(IV)}$ removes the $6s^2$ pair, so the bill is $IE_3 + IE_4$ (about $7160\ \mathrm{kJ\,mol^{-1}}$ for lead, about $6870$ for tin), not $IE_2 + IE_3$. Down group 14 that bill rises by a few hundred kilojoules and the $6p$ bonds that would repay it get longer and weaker. $\mathrm{Pb(IV)}$ compounds therefore *want* two electrons — they are oxidisers — and $\mathrm{Pb(II)}$ is the resting state. $E^\circ(\mathrm{PbO_2,\,H^+/Pb^{2+}}) = +1.46\ \mathrm{V}$ is a few tens of millivolts short of $E^\circ(\mathrm{MnO_4^-/Mn^{2+}}) = +1.51\ \mathrm{V}$; the purple test still works in hot concentrated nitric acid, where $a(\mathrm{Pb^{2+}})$ is kept low, but standard potentials alone do not quite allow it. Tin sits above lead: $\mathrm{Sn(IV)}$ (as in $\mathrm{SnO_2}$, $\mathrm{SnCl_4}$) is the stable state and $\mathrm{Sn^{2+}}$ is a mild **reductant** ($E^\circ(\mathrm{Sn^{4+}/Sn^{2+}}) = +0.15\ \mathrm{V}$, so $\mathrm{SnCl_2}$ reduces $\mathrm{Fe^{3+}}$ to $\mathrm{Fe^{2+}}$). The rule to carry away: within a group, oxidising power of the highest state *increases* downwards, reducing power of the lower state *decreases*.
:::
:::

::: warning The inert pair is a tendency, not a law {#warn-inert-pair}
It is tempting to "explain" $\mathrm{Tl(I)}$ stability by bond strengths alone. The bill for the inert pair, $IE_2 + IE_3$, is $4560\ \mathrm{kJ\,mol^{-1}}$ for aluminium and $4849\ \mathrm{kJ\,mol^{-1}}$ for thallium: the $6s$ pair costs about $290\ \mathrm{kJ\,mol^{-1}}$ more to remove, from poor shielding and relativistic contraction. Mean $\mathrm{M{-}Cl}$ bond enthalpies fall as well, from about $490\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{Al{-}Cl}$ to about $370$ for $\mathrm{Tl{-}Cl}$. Both the higher ionisation bill and the poorer bonds favour $\mathrm{Tl(I)}$. The effect can be overridden: $\mathrm{TlF_3}$ exists (small, hard fluoride makes strong bonds), and $\mathrm{TlI_3}$ is really $\mathrm{Tl^+(I_3^-)}$. Use the effect to rank stabilities, never to declare a compound impossible.
:::

## Diagonal relationships and the second-period personality

::: definition Diagonal relationships {#def-diagonal}
The small, highly charged first members of groups 1–2 resemble the element one period down and one group across: **Li–Mg**, **Be–Al**, **B–Si**. The reason is the ionic potential $z/r$. The radii are similar ($\mathrm{Li^+}\ 76\ \mathrm{pm}$, $\mathrm{Mg^{2+}}\ 72\ \mathrm{pm}$), but the charges are not: $z/r$ for $\mathrm{Mg^{2+}}$ is about twice that for $\mathrm{Li^+}$. What matches is the *chemistry* that high $z/r$ produces — partial covalency, thermal lability, the same solubility pattern — not a numerical equality of the two potentials.
:::

::: example Lithium, the magnesium impostor {#ex-li-mg}
Lithium is the only alkali metal that reacts with $\mathrm{N_2}$ directly ($\mathrm{6\,Li + N_2 \to 2\,Li_3N}$), that forms a normal oxide $\mathrm{Li_2O}$ rather than a peroxide or superoxide as the thermodynamic product, whose carbonate decomposes on heating ($\mathrm{Li_2CO_3 \to Li_2O + CO_2}$) and whose fluoride, phosphate and carbonate are sparingly soluble. Why?
::: solution
Every one of those is magnesium behaviour, and every one follows from a small cation of high ionic potential. $\mathrm{Li^+}$ is singly charged, not doubly charged; it is small enough that it polarises $\mathrm{N^{3-}}$ and $\mathrm{CO_3^{2-}}$ much as $\mathrm{Mg^{2+}}$ does. The high lattice energy of those small-cation salts overwhelms the hydration term and precipitates $\mathrm{LiF}$, $\mathrm{Li_3PO_4}$, $\mathrm{Li_2CO_3}$. The same $z/r$ logic makes beryllium hydroxide amphoteric like aluminium's and boric acid a weak oxoacid like silicic. Diagonal relationships are not coincidences to memorise — they are the periodic table read through electrostatics.
:::
:::

The second period of the p block adds its own personality, all traceable to one fact — no $d$ orbitals of the valence shell and very small size: second-period atoms **never exceed coordination number 4** (so there is no $\mathrm{CF_6^{2-}}$ to match $\mathrm{SiF_6^{2-}}$, and no pentavalent carbon), form the **strongest $\pi$ bonds** (the whole of carbon's double-bond chemistry, and nitrogen's $945\ \mathrm{kJ\,mol^{-1}}$ triple bond, are $2p$–$2p$ overlap). Carbon catenates best of its group; nitrogen and oxygen do not — sulfur's chains ($\mathrm{S_8}$, the polysulfanes) outrun oxygen's. They are also the members best able to satisfy spare coordination by hydrogen bonding. Chapters 2 and 6–8 of this course are largely the story of what happens when those four consequences are carried down each group.

## Where this leads

The size and energy data assembled here feed every later chapter: lattice and hydration enthalpies (the Born–Landé and Kapustinskii machinery of [[bonding-structure/ionic-bonding]]) decide s-block solubility in [[main-group/hydrogen-s-block]]; $Z_\mathrm{eff}$ and orbital size decide why heavier elements make three-centre bonds in [[main-group/main-group-bonding]]; the electronegativity of a central atom decides oxoacid strength in [[main-group/inorganic-acids-bases]]; and the inert pair decides which oxidation states are worth plotting in [[main-group/inorganic-redox]]. The quantum background — shielding, penetration, the ordering of $s$, $p$, $d$ — is in [[general-chemistry-1/quantum-atom]], and the thermochemistry of the cycles we cite is [[general-chemistry-1/thermochemistry]].

::: history
The periodic system began as pattern recognition: Mendeleev's 1869 table organised the elements by weight and valence and, decisively, left gaps whose occupants he predicted in detail. The physical explanation waited half a century — Moseley's X-ray measurements of 1913 made atomic *number* the ordering variable, and Slater's 1930 screening rules turned $Z_\mathrm{eff}$ into an arithmetic one could do at a desk. Pauling's electronegativity scale of 1932 folded bond enthalpies into the picture, and the modern catalogue of radii — Shannon's 1976 tables of ionic radii, Cordero's 2008 covalent radii — is the quiet empirical infrastructure under every prediction in this chapter. The anomalies kept arriving too: the lanthanide contraction was recognised in the 1920s, and the relativistic stabilisation of $6s$ orbitals, needed to close the inert-pair story quantitatively, only became standard textbook chemistry late in the twentieth century.
:::

::: summary
- Radii shrink across a period and grow down a group; in an isoelectronic series size is set by nuclear charge alone, and cations are small, anions large.
- Slater's rules give $Z_\mathrm{eff}$ with period slope $0.65$ per proton: the engine behind radii, ionisation energies and electronegativities.
- Ionisation energies jump when a core shell is breached — the jump identifies the group; small dips at B and O reveal subshell structure.
- Chlorine beats fluorine on electron affinity. Both atoms are $np^5$, so the added electron pairs in both; fluorine's compact $n = 2$ shell simply makes that repulsion larger.
- Electronegativity is bond enthalpy data rearranged; $\Delta\chi$ estimates bond polarity, and no bond between different atoms is purely covalent.
- The inert-pair effect stabilises the lower oxidation state, two below the group valence, down groups 13–15. Both the ionisation bill and the bond enthalpies move, and the highest state becomes a stronger oxidant down the group.
- Diagonal relationships (Li–Mg, Be–Al, B–Si) are ionic-potential matches; second-period elements are small, $\pi$-bonded, coordination-number-limited and exceptional.
:::

## Exercises

::: exercise Isoelectronic ordering {level=1}
Order $\mathrm{N^{3-}}$, $\mathrm{O^{2-}}$, $\mathrm{F^-}$, $\mathrm{Na^+}$, $\mathrm{Mg^{2+}}$ by ionic radius, largest first, and state the principle.
::: solution
All are neon-like ($10\ e^-$), so radius decreases monotonically with nuclear charge: $\mathrm{N^{3-}}\ (146) > \mathrm{O^{2-}}\ (140) > \mathrm{F^-}\ (133) > \mathrm{Na^+}\ (102) > \mathrm{Mg^{2+}}\ (72)\ \mathrm{pm}$. Constant electron count, rising $Z$: the cloud is held ever tighter.
:::
:::

::: exercise Group from ionisation energies {level=1 check="2"}
An element shows $IE = 590,\ 1145,\ 4912,\ 6491\ \mathrm{kJ\,mol^{-1}}$. Enter its group number.
::: solution
The big jump comes between the second and third ionisations ($1145 \to 4912$), so there are two valence electrons: **group 2** (the numbers are calcium's).
:::
:::

::: exercise Which is larger? {level=1}
For each pair, say which is larger and why: (a) $\mathrm{Cl^-}$ or $\mathrm{Cl}$; (b) $\mathrm{Na^+}$ or $\mathrm{Mg^{2+}}$; (c) $\mathrm{S^{2-}}$ or $\mathrm{Se^{2-}}$.
::: solution
(a) $\mathrm{Cl^-}$ ($181\ \mathrm{pm}$ vs $99\ \mathrm{pm}$ covalent): the added electron increases repulsion in the same shell. (b) $\mathrm{Na^+}$ ($102$ vs $72\ \mathrm{pm}$): isoelectronic, and Mg has one more proton. (c) $\mathrm{Se^{2-}}$: down the group a new shell is added and screening is nearly complete.
:::
:::

::: exercise Slater's rule for chlorine {level=2 check="6.1"}
Compute $Z_\mathrm{eff}$ for a $3p$ electron of chlorine ($Z = 17$) by Slater's rules. (Enter $Z_\mathrm{eff}$.)
::: solution
The $3p$ electron sees $Z - 11 = 6$ other electrons in the same $(3s, 3p)$ group, $8$ in the $n = 2$ shell and $2$ in the $1s$: $\sigma = 6(0.35) + 8(0.85) + 2(1.00) = 2.10 + 6.80 + 2.00 = 10.90$, so $Z_\mathrm{eff} = 17 - 10.90 = 6.10$. Compare the naive "17 − 10 core electrons = 7": Slater's partial same-shell screening brings the answer down by about one unit, and that one unit is most of the difference between a working model and a wrong one.
:::
:::

::: exercise Thallium's two faces {level=2}
$\mathrm{TlCl_3}$ is a strong oxidiser that decomposes to $\mathrm{TlCl}$ and $\mathrm{Cl_2}$, while $\mathrm{AlCl_3}$ is perfectly stable. Given $IE_2 + IE_3 = 4560\ \mathrm{kJ\,mol^{-1}}$ for Al and $4849\ \mathrm{kJ\,mol^{-1}}$ for Tl, and mean $\mathrm{M{-}Cl}$ bond enthalpies of about $490$ and $370\ \mathrm{kJ\,mol^{-1}}$, explain the difference.
::: solution
Both sides of the ledger move. Removing the inert pair costs about $290\ \mathrm{kJ\,mol^{-1}}$ more for thallium. The repayment is three $\mathrm{M{-}Cl}$ bonds, and those are weaker for thallium by about $120\ \mathrm{kJ\,mol^{-1}}$ each, a further deficit of order $360\ \mathrm{kJ\,mol^{-1}}$. Diffuse $6p$ orbitals overlap poorly, and the relativistically stabilised $6s^2$ pair would rather stay home, so $\mathrm{Tl(I)}$ wins and $\mathrm{Tl^{3+}}$ pulls electrons back from chloride. Aluminium's cheaper ionisation and shorter, stronger bonds tip the other way. The inert pair is both an ionisation effect and a bond-enthalpy effect.
:::
:::

::: exercise Electronegativity of fluorine {level=2 check="3.97"}
Using $D(\mathrm{H{-}H}) = 436$, $D(\mathrm{F{-}F}) = 159$, $D(\mathrm{H{-}F}) = 567\ \mathrm{kJ\,mol^{-1}}$ and $\chi(\mathrm{H}) = 2.20$, compute Pauling's electronegativity of fluorine. (Enter $\chi(\mathrm{F})$.)
::: solution
In eV: $4.52$, $1.65$, $5.88$. Then $\chi(\mathrm{F}) - 2.20 = \sqrt{5.88 - \sqrt{4.52 \times 1.65}} = \sqrt{5.88 - 2.73} = \sqrt{3.15} = 1.77$, so $\chi(\mathrm{F}) = 3.97$ — the tabulated value, reached from three bond enthalpies.
:::
:::

::: exercise Deriving the period trend {level=3}
Using the hydrogenic expression $IE \propto Z_\mathrm{eff}^2$ with Slater's $Z_\mathrm{eff}$ values for Li ($Z_\mathrm{eff} = 1.30$ for $2s$) and F ($Z_\mathrm{eff} = 5.20$), estimate $IE_1(\mathrm{F})/IE_1(\mathrm{Li})$ and compare with experiment ($1681/520 = 3.23$). Why does the model overshoot, and what fixes it qualitatively?
::: solution
The hydrogenic ratio is $(5.20/1.30)^2 = 16$, against an observed $3.2$. The model overshoots because it treats the removed electron as seeing a bare nucleus of charge $Z_\mathrm{eff}$, ignoring that the *remaining* electrons relax and re-screen as $Z$ grows, and that electron–electron repulsion in the increasingly crowded $2p$ subshell offsets part of the nuclear pull. Qualitatively, the virial theorem says the orbital energy tracks $Z_\mathrm{eff}^2$ only for a fixed orbital shape; in reality fluorine's $2p$ orbital is far more compact than the diffuse $2s$ orbital Slater's rules assign to lithium (lithium has no $2p$ electron), and the extra repulsion grows roughly linearly in the number of same-shell pairs. The honest use of Slater's rules is therefore *ranking and direction*, never quantitative prediction of energies — exactly how this chapter uses them.
:::
:::

::: exercise The lanthanide contraction in the lab {level=3}
Zirconium and hafnium occur together in every ore and are notoriously hard to separate, while zirconium and titanium (same group, one period up) separate easily. Ionic radii: $\mathrm{Ti^{4+}}\ 60.5$, $\mathrm{Zr^{4+}}\ 72$, $\mathrm{Hf^{4+}}\ 71\ \mathrm{pm}$. Explain both observations in terms of this chapter, and predict whether $\mathrm{HfO_2}$ or $\mathrm{ZrO_2}$ is the weaker base.
::: solution
Chemical similarity tracks ionic radius and charge: $\mathrm{Zr^{4+}}$ and $\mathrm{Hf^{4+}}$ differ by $1\ \mathrm{pm}$ because the fourteen $4f$ electrons between them screen the fourteen added protons so poorly (the lanthanide contraction), so their hydration energies, complex stabilities and salt solubilities are nearly identical and only the smallest physical differences (e.g. extraction kinetics) can separate them. $\mathrm{Ti^{4+}}$ is $12\ \mathrm{pm}$ smaller, so its chemistry — hydration enthalpy, hydrolysis, coordination preferences — differs enough for straightforward separation. For basicity, the smaller, more polarising cation makes the more covalent, weaker-basic oxide: $\mathrm{HfO_2}$ is marginally the weaker base (and marginally more covalent) than $\mathrm{ZrO_2}$ — a difference of a fraction of a pH unit, which is precisely why the separation problem is so hard.
:::
:::
