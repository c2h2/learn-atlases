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
Aluminium and gallium are in the same group, yet their covalent radii are almost identical ($121$ and $122\ \mathrm{pm}$), their first ionisation energies are the same to within $1\ \mathrm{kJ\,mol^{-1}}$ ($578$ and $579$), and gallium is the *more* electronegative of the two ($1.81$ against $1.61$ on Pauling's scale). Going down a group should make an atom larger and more easily ionised. Why does it fail here?
::: solution
Between Al ($Z = 13$) and Ga ($Z = 31$) eighteen protons are added. Eight of them are matched by the $3s$, $3p$ and $4s$ electrons of a normal shell, which screen well. The other ten are matched by the $3d$ electrons, and $d$ electrons screen poorly: their radial distributions are concentrated in the same region as the $4s$ and $4p$ valence electrons rather than inside them, so they do not sit "between" the nucleus and the valence shell. Gallium's $4p$ electron therefore feels a higher $Z_\mathrm{eff}$ than shell counting suggests — the **d-block contraction** — and the expected increase in size and decrease in ionisation energy is cancelled. The same argument, with fourteen $4f$ electrons instead of ten $3d$, produces the **lanthanide contraction**, which makes $\mathrm{Zr^{4+}}$ ($72\ \mathrm{pm}$) and $\mathrm{Hf^{4+}}$ ($71\ \mathrm{pm}$) almost twins and makes thallium ($145\ \mathrm{pm}$ covalent radius) barely larger than indium ($142\ \mathrm{pm}$). Consequence to remember: the element just after a newly filled $d$ or $f$ subshell (Ga, Ge, As, Se after the $3d$ series; Tl, Pb, Bi after the $4f$ and $5d$) is smaller and holds its electrons more tightly than a smooth group trend predicts — chemistry this chapter will use repeatedly.
:::
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
The coefficient $0.65$ is $1 - 0.35$: within a shell, each added electron screens only 35 % of the proton added beside it, so $Z_\mathrm{eff}$ — and with it the binding energy, and against it the radius — drift linearly across the period with slope $0.65$ per element. A hydrogenic estimate $E \propto Z_\mathrm{eff}^2/n^{*2}$ then predicts $IE_1$ to rise by $(6.75/2.20)^2 \approx 9.4$ from Na ($Z_\mathrm{eff} = 2.20$) to Ar ($Z_\mathrm{eff} = 0.65\times 18 - 4.95 = 6.75$); the observed ratio is $1521/496 \approx 3.1$. (Chlorine's value, $6.10$, is one step earlier on the same line.) The discrepancy is the growing electron–electron repulsion the model ignores — but the *direction* of the period trend is Slater's, and that is enough to make predictions.
:::

We can test Slater's numbers directly. If the outermost electron were hydrogen-like with principal quantum number $n = 3$, its ionisation energy would be $IE = 13.606\ \mathrm{eV} \times (Z_\mathrm{eff}/3)^2$; turning that round, each measured $IE_1$ defines an "observed" effective charge $Z_\mathrm{eff} = 3\sqrt{IE_1/13.606\ \mathrm{eV}}$. The figure compares the two.

::: widget plot
f: 0.65*x - 4.95; 0.1825*x - 0.170
x: 10.5, 18.5
y: 0, 7
points: 11,1.84; 12,2.25; 13,1.99; 14,2.32; 15,2.63; 16,2.62; 17,2.93; 18,3.23
labels: \text{Slater: } 0.65Z - 4.95; \text{least-squares line through the points}
caption: Effective nuclear charge across period 3 ($x$ is the atomic number $Z$, Na = 11 to Ar = 18). The steep line is Slater's estimate for the outermost electron. The dots are the effective charges inferred from measured first ionisation energies ($495.8$, $737.7$, $577.5$, $786.5$, $1011.8$, $999.6$, $1251.2$, $1520.6\ \mathrm{kJ\,mol^{-1}}$) with the hydrogen-like formula $Z_\mathrm{eff} = 3\sqrt{IE_1/13.606\ \mathrm{eV}}$, and the shallow line is their least-squares fit (slope $0.18$ per element). Two lessons are visible. First, the direction is right but Slater's rules overstate the slope by more than a factor of three, because a hydrogen-like energy ignores the repulsion between the electron being removed and the others in its shell. Second, the dips at aluminium ($3p^1$) and sulfur ($3p^4$) are the subshell and pairing effects described in the text; no smooth screening rule can produce them.
:::

::: example Identifying an element from its ionisation energies {#ex-ie-jump}
An element shows $IE = 578,\ 1817,\ 2745,\ 11578\ \mathrm{kJ\,mol^{-1}}$ (first to fourth). Which group is it in, and what formulas should its common compounds have?
::: solution
The first three ionisations are modest and grow smoothly; the fourth is more than four times the third. Three electrons are therefore valence electrons and the fourth comes from a core shell, so the element is in **group 13** (the numbers are aluminium's). Expect $\mathrm{E^{3+}}$ compounds — $\mathrm{AlCl_3}$, $\mathrm{Al_2O_3}$. Why not $\mathrm{E^+}$, when $IE_1$ alone is only a little more than sodium's? Because a hypothetical solid $\mathrm{Al^+Cl^-}$ is unstable with respect to disproportionation, $3\,\mathrm{AlCl} \to 2\,\mathrm{Al} + \mathrm{AlCl_3}$: the extra ionisation energy of the $+3$ state is more than repaid by the far larger lattice (or bond) energy of the triply charged ion, the Born–Haber argument of [[bonding-structure/ionic-bonding]]. Monomeric $\mathrm{AlCl}$ exists only as a high-temperature gas.
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
Convert to electronvolts ($1\ \mathrm{eV} = 96.485\ \mathrm{kJ\,mol^{-1}}$): $D(\mathrm{H{-}H}) = 4.519$, $D(\mathrm{Cl{-}Cl}) = 2.519$, $D(\mathrm{H{-}Cl}) = 4.467\ \mathrm{eV}$. Then
$$
\chi(\mathrm{Cl}) - \chi(\mathrm{H}) = \sqrt{4.467 - \sqrt{4.519 \times 2.519}} = \sqrt{4.467 - 3.374} = \sqrt{1.093} = 1.05,
$$
so $\chi(\mathrm{Cl}) = 2.20 + 1.05 = 3.25$ (carrying unrounded values), close to the tabulated $3.16$ (the residual depends on which bond-enthalpy set and which averaging Pauling's descendants used). The same arithmetic with $D(\mathrm{F{-}F}) = 159$ and $D(\mathrm{H{-}F}) = 567\ \mathrm{kJ\,mol^{-1}}$ gives $\chi(\mathrm{F}) = 3.97$ — the scale's anchor of maximum. The exercise is worth doing once because it shows electronegativity is not a mystical property: it is bond enthalpy data, rearranged.
:::
:::

The difference $\Delta\chi$ predicts bond polarity: the **percent ionic character** is well approximated by $100\left[1 - \exp\!\left(-(\Delta\chi)^2/4\right)\right]$, which gives $3\ \%$ for $\mathrm{C{-}H}$ ($\Delta\chi = 0.35$), $32\ \%$ for $\mathrm{O{-}H}$ ($1.24$) and $55\ \%$ for $\mathrm{H{-}F}$ ($1.78$). This formula is Pauling's empirical interpolation, not a law, and it can be checked against experiment. A diatomic molecule with charges $\pm\delta e$ a distance $r$ apart has dipole moment $\mu = \delta e r$; a fully ionic $\mathrm{H^+X^-}$ at the same bond length would have $\mu_\mathrm{ion} = e r$, which is $4.803\ \mathrm{D}$ per $100\ \mathrm{pm}$. The ratio $\mu/\mu_\mathrm{ion}$ is a measured "ionic character".

::: widget plot
f: 100*(1 - exp(-x^2/4))
x: 0, 2.5
y: 0, 80
points: 1.78,41.5; 0.96,18.1; 0.76,12.2; 0.46,5.8
labels: \text{Pauling: } 100[1 - e^{-(\Delta\chi)^2/4}]
caption: Percent ionic character against electronegativity difference $\Delta\chi$. The curve is Pauling's formula; the dots are the hydrogen halides, with ionic character $100\,\mu/(e r)$ from measured dipole moments and bond lengths: HF ($1.826\ \mathrm{D}$, $91.7\ \mathrm{pm}$: $41.5\ \%$), HCl ($1.109\ \mathrm{D}$, $127.5\ \mathrm{pm}$: $18.1\ \%$), HBr ($0.827\ \mathrm{D}$, $141.4\ \mathrm{pm}$: $12.2\ \%$) and HI ($0.448\ \mathrm{D}$, $160.9\ \mathrm{pm}$: $5.8\ \%$). The trend is right and the heavier halides sit close to the curve, but HF falls well below it ($41.5$ against $54.7\ \%$). A dipole moment is not just a pair of point charges: the lone pairs on fluorine and the distortion of the bonding density contribute dipoles of their own, so "ionic character" is a model quantity and different definitions give different numbers.
:::

No bond between unlike atoms is purely covalent; the ionic model of [[bonding-structure/ionic-bonding]] and the covalent model of [[bonding-structure/covalent-lewis]] are the two ends of one continuum, and main-group chemistry lives in between.

## Oxidation states and the inert pair

::: definition Oxidation state {#def-oxstate}
The **oxidation state** of an atom is the charge left on it after its bonds are assigned ionically — each bonding pair given to the more electronegative partner. It is a bookkeeping device, not a measured charge (in $\mathrm{CO_2}$ the carbon is formally $+4$ but carries little actual positive charge), and it must be distinguished from **formal charge**, which splits bonding pairs equally. For main-group elements the maximum oxidation state equals the number of valence $s + p$ electrons: the group number for groups 1 and 2, and the group number minus ten for groups 13–17 in the IUPAC 1–18 numbering (so $+3$ for aluminium, $+5$ for phosphorus, $+7$ for chlorine). For the heavier p-block elements the common lower states differ from this maximum by two.
:::

That last clause — states differing by two — is the **inert-pair effect**, the master pattern of heavier p-block chemistry.

::: definition The inert-pair effect {#def-inert-pair}
Down groups 13–15 the **lower oxidation state**, lower by two than the group valence, becomes progressively more stable: $\mathrm{Tl^+}$ beats $\mathrm{Tl^{3+}}$, $\mathrm{Pb^{2+}}$ beats $\mathrm{Pb^{4+}}$, $\mathrm{Bi^{3+}}$ beats $\mathrm{Bi^{5+}}$. It is not a group-17 trend: iodine(VII) is more stable than bromine(VII). The two electrons that "stay home" are the $ns^2$ pair — the **inert pair** — whose reluctance to bond grows down the group because poor $d$- and $f$-screening and relativistic contraction pull the $s$ orbital in (the $6s$ pair of thallium, lead and bismuth is measurably stabilised), while the $np$ electrons remain available.
:::

::: example Lead(II) versus lead(IV) {#ex-lead}
$\mathrm{PbO}$ is stable in air; $\mathrm{PbO_2}$ is a powerful oxidiser, $E^\circ(\mathrm{PbO_2,H^+/Pb^{2+}}) = +1.46\ \mathrm{V}$, and a classical qualitative test for manganese boils a manganese(II) solution with $\mathrm{PbO_2}$ in concentrated nitric acid to produce the purple of $\mathrm{MnO_4^-}$ ($E^\circ(\mathrm{MnO_4^-/Mn^{2+}}) = +1.51\ \mathrm{V}$). Explain why lead(IV) is an oxidant, why the test works although $1.46 < 1.51$, and predict the stable states of tin.
::: solution
Going from $\mathrm{Pb(II)}$ to $\mathrm{Pb(IV)}$ removes the $6s^2$ pair, so the bill is $IE_3 + IE_4$: about $7160\ \mathrm{kJ\,mol^{-1}}$ for lead against about $6870$ for tin. From tin to lead that bill rises by roughly $290\ \mathrm{kJ\,mol^{-1}}$, while the bonds that would repay it get longer and weaker. $\mathrm{Pb(IV)}$ compounds therefore *want* two electrons — they are oxidisers — and $\mathrm{Pb(II)}$ is the resting state. For the manganese test the overall reaction is
$$
5\,\mathrm{PbO_2} + 2\,\mathrm{Mn^{2+}} + 4\,\mathrm{H^+} \rightarrow 5\,\mathrm{Pb^{2+}} + 2\,\mathrm{MnO_4^-} + 2\,\mathrm{H_2O},
$$
with $E^\circ_\mathrm{cell} = 1.46 - 1.51 = -0.05\ \mathrm{V}$: slightly unfavourable under *standard* conditions. Two things rescue it. The reaction consumes four protons, so concentrated acid pushes it forward (the Nernst term contains $[\mathrm{H^+}]^{-4}$); and the eye needs only a tiny concentration of the intensely coloured $\mathrm{MnO_4^-}$, so a small extent of reaction is enough. When two potentials are this close, conditions decide — never read a $0.05\ \mathrm{V}$ difference as a verdict. Tin sits above lead: $\mathrm{Sn(IV)}$ (as in $\mathrm{SnO_2}$, $\mathrm{SnCl_4}$) is the stable state and $\mathrm{Sn^{2+}}$ is a mild **reductant** ($E^\circ(\mathrm{Sn^{4+}/Sn^{2+}}) = +0.15\ \mathrm{V}$, so $\mathrm{SnCl_2}$ reduces $\mathrm{Fe^{3+}}$ to $\mathrm{Fe^{2+}}$). The rule to carry away: within a group, oxidising power of the highest state *increases* downwards, reducing power of the lower state *decreases*.
:::
:::

::: warning The inert pair is a tendency, not a law {#warn-inert-pair}
It is tempting to "explain" $\mathrm{Tl(I)}$ stability by a single cause. In fact two terms move together. The bill for the inert pair, $IE_2 + IE_3$, is $4562\ \mathrm{kJ\,mol^{-1}}$ for aluminium and $4849\ \mathrm{kJ\,mol^{-1}}$ for thallium: the $6s$ pair costs about $290\ \mathrm{kJ\,mol^{-1}}$ more to remove, from poor shielding and relativistic contraction. And the bonds that must repay the bill are weaker: the mean $\mathrm{Al{-}Cl}$ bond enthalpy in gaseous $\mathrm{AlCl_3}$ is about $426\ \mathrm{kJ\,mol^{-1}}$ (exercise [[#ex-alcl-mean]]), whereas thallium(III) chloride is so weakly bound that it loses chlorine on gentle warming and no reliable gas-phase value exists. Both the higher ionisation bill and the poorer bonds favour $\mathrm{Tl(I)}$. The effect can be overridden: $\mathrm{TlF_3}$ exists (small, hard fluoride makes strong bonds), and $\mathrm{TlI_3}$ is really $\mathrm{Tl^+(I_3^-)}$. Use the effect to rank stabilities, never to declare a compound impossible.
:::

## Diagonal relationships and the second-period personality

::: definition Diagonal relationships {#def-diagonal}
The small, highly charged first members of groups 1, 2 and 13 resemble the element one period down and one group across: **Li–Mg**, **Be–Al**, **B–Si**. The reason is the ionic potential $z/r$. The radii are similar ($\mathrm{Li^+}\ 76\ \mathrm{pm}$, $\mathrm{Mg^{2+}}\ 72\ \mathrm{pm}$), but the charges are not: $z/r$ for $\mathrm{Mg^{2+}}$ is about twice that for $\mathrm{Li^+}$. What matches is the *chemistry* that high $z/r$ produces — partial covalency, thermal lability, the same solubility pattern — not a numerical equality of the two potentials.
:::

::: example Lithium, the magnesium impostor {#ex-li-mg}
Lithium is the only alkali metal that reacts with $\mathrm{N_2}$ directly ($\mathrm{6\,Li + N_2 \to 2\,Li_3N}$), that forms a normal oxide $\mathrm{Li_2O}$ rather than a peroxide or superoxide as the thermodynamic product, whose carbonate decomposes on heating ($\mathrm{Li_2CO_3 \to Li_2O + CO_2}$) and whose fluoride, phosphate and carbonate are sparingly soluble. Why?
::: solution
Every one of those is magnesium behaviour, and every one follows from a small cation of high ionic potential. $\mathrm{Li^+}$ carries only one charge, but it is so small that its polarising power approaches that of $\mathrm{Mg^{2+}}$, and it distorts large anions such as $\mathrm{N^{3-}}$ and $\mathrm{CO_3^{2-}}$ in the same way. (Its preference for the oxide over the peroxide is the same effect: a small cation gains most lattice energy with the small $\mathrm{O^{2-}}$ ion.) The high lattice energy of those small-cation salts overwhelms the hydration term and precipitates $\mathrm{LiF}$, $\mathrm{Li_3PO_4}$, $\mathrm{Li_2CO_3}$. The same $z/r$ logic makes beryllium hydroxide amphoteric like aluminium's and boric acid a weak oxoacid like silicic. Diagonal relationships are not coincidences to memorise — they are the periodic table read through electrostatics.
:::
:::

The second period of the p block adds its own personality, traceable mainly to very small size and compact $2p$ orbitals. (It is *not* a matter of missing $d$ orbitals: as [[main-group/main-group-bonding]] shows, the heavier elements do not use theirs either.) Three consequences recur. First, second-period atoms **rarely form more than four two-centre bonds**: there is no room to pack more ligands round a $77\ \mathrm{pm}$ carbon, so there is no $\mathrm{CF_6^{2-}}$ to match $\mathrm{SiF_6^{2-}}$. Higher coordination does occur when bonding is multicentre — boron is six-coordinate in the icosahedral boranes and in $\mathrm{B_{12}H_{12}^{2-}}$ (five boron neighbours plus one hydrogen), and carbon reaches five or six neighbours in carboranes. Second, they form the **strongest $\pi$ bonds**: carbon's double-bond chemistry and nitrogen's $945\ \mathrm{kJ\,mol^{-1}}$ triple bond rest on short-range $2p$–$2p$ overlap. Third, catenation is element-specific: carbon chains are unrivalled, but nitrogen and oxygen chains are weak (lone-pair repulsion across short $\mathrm{N{-}N}$ and $\mathrm{O{-}O}$ bonds), so sulfur's rings and chains ($\mathrm{S_8}$, the polysulfanes) outrun oxygen's. Nitrogen, oxygen and fluorine are also the atoms that form strong hydrogen bonds. Much of the survey chapters is the story of these consequences carried down each group.

## Where this leads

The size and energy data assembled here feed every later chapter: lattice and hydration enthalpies (the Born–Landé and Kapustinskii machinery of [[bonding-structure/ionic-bonding]]) decide s-block solubility in [[main-group/hydrogen-s-block]]; $Z_\mathrm{eff}$ and orbital size decide why heavier elements make three-centre bonds in [[main-group/main-group-bonding]]; the electronegativity of a central atom decides oxoacid strength in [[main-group/inorganic-acids-bases]]; and the inert pair decides which oxidation states are worth plotting in [[main-group/inorganic-redox]]. The quantum background — shielding, penetration, the ordering of $s$, $p$, $d$ — is in [[general-chemistry-1/quantum-atom]], and the thermochemistry of the cycles we cite is [[general-chemistry-1/thermochemistry]].

::: history
The periodic system began as pattern recognition: Mendeleev's 1869 table organised the elements by weight and valence and, decisively, left gaps whose occupants he predicted in detail. The physical explanation waited half a century — Moseley's X-ray measurements of 1913 made atomic *number* the ordering variable, and Slater's 1930 screening rules turned $Z_\mathrm{eff}$ into an arithmetic one could do at a desk. Pauling's electronegativity scale of 1932 folded bond enthalpies into the picture, and the modern catalogue of radii — Shannon's 1976 tables of ionic radii, Cordero's 2008 covalent radii — is the quiet empirical infrastructure under every prediction in this chapter. The anomalies kept arriving too: the lanthanide contraction was named by Victor Goldschmidt in the 1920s, and the relativistic stabilisation of $6s$ orbitals, needed to close the inert-pair story quantitatively, only became standard textbook chemistry late in the twentieth century.
:::

::: summary
- Radii shrink across a period and grow down a group; in an isoelectronic series size is set by nuclear charge alone, and cations are small, anions large.
- Slater's rules give $Z_\mathrm{eff}$ with period slope $0.65$ per proton: the engine behind radii, ionisation energies and electronegativities.
- Ionisation energies jump when a core shell is breached — the jump identifies the group; small dips at B and O reveal subshell structure.
- Chlorine beats fluorine on electron affinity: the electron added to fluorine's compact $n = 2$ shell suffers more repulsion. Percent ionic character estimated from $\Delta\chi$ is a rough guide; dipole moments give the measured values.
- Electronegativity is bond enthalpy data rearranged; $\Delta\chi$ estimates bond polarity, and no bond between different atoms is purely covalent.
- The highest oxidation state of a main-group element equals its number of valence $s + p$ electrons (group number − 10 for groups 13–17). The inert-pair effect stabilises the state two lower down groups 13–15: the ionisation bill rises and the bond enthalpies fall, so the highest state becomes a stronger oxidant down the group.
- Diagonal relationships (Li–Mg, Be–Al, B–Si) are matches in polarising power; second-period elements are small, strongly $\pi$-bonded and limited to four two-centre bonds — because of size, not because they lack $d$ orbitals.
:::

## Exercises

::: exercise Isoelectronic ordering {level=1}
Order $\mathrm{N^{3-}}$, $\mathrm{O^{2-}}$, $\mathrm{F^-}$, $\mathrm{Na^+}$, $\mathrm{Mg^{2+}}$ by ionic radius, largest first, and state the principle.
::: solution
All are neon-like ($10\ e^-$), so radius decreases monotonically with nuclear charge: $\mathrm{N^{3-}}\ (146) > \mathrm{O^{2-}}\ (140) > \mathrm{F^-}\ (133) > \mathrm{Na^+}\ (102) > \mathrm{Mg^{2+}}\ (72)\ \mathrm{pm}$ (the $\mathrm{N^{3-}}$ value is for four-coordination, the others for six). Constant electron count, rising $Z$: the cloud is held ever tighter.
:::
:::

::: exercise Group from ionisation energies {level=1 check="2"}
An element shows $IE = 590,\ 1145,\ 4912,\ 6491\ \mathrm{kJ\,mol^{-1}}$. Enter its group number.
::: solution
The big jump comes between the second and third ionisations ($1145 \to 4912$, a factor of $4.3$), so there are two valence electrons: **group 2** (the numbers are calcium's).
:::
:::

::: exercise Which is larger? {level=1}
For each pair, say which is larger and why: (a) $\mathrm{Cl^-}$ or $\mathrm{Cl}$; (b) $\mathrm{Na^+}$ or $\mathrm{Mg^{2+}}$; (c) $\mathrm{S^{2-}}$ or $\mathrm{Se^{2-}}$.
::: solution
(a) $\mathrm{Cl^-}$ ($181\ \mathrm{pm}$ ionic against $99\ \mathrm{pm}$ covalent for the atom): the added electron increases repulsion in the same shell at the same nuclear charge. (b) $\mathrm{Na^+}$ ($102$ against $72\ \mathrm{pm}$): isoelectronic, and Mg has one more proton. (c) $\mathrm{Se^{2-}}$: down the group a new shell is added and screening by the inner shells is nearly complete.
:::
:::

::: exercise Slater's rule for chlorine {level=2 check="6.1"}
Compute $Z_\mathrm{eff}$ for a $3p$ electron of chlorine ($Z = 17$) by Slater's rules. (Enter $Z_\mathrm{eff}$.)
::: solution
The $3p$ electron sees $Z - 11 = 6$ other electrons in the same $(3s, 3p)$ group, $8$ in the $n = 2$ shell and $2$ in the $1s$: $\sigma = 6(0.35) + 8(0.85) + 2(1.00) = 2.10 + 6.80 + 2.00 = 10.90$, so $Z_\mathrm{eff} = 17 - 10.90 = 6.10$. Compare the naive "17 − 10 core electrons = 7": Slater's partial screening by the inner shell brings the answer down by about one unit.
:::
:::

::: exercise Electronegativity of fluorine {level=2 check="3.97"}
Using $D(\mathrm{H{-}H}) = 436$, $D(\mathrm{F{-}F}) = 159$, $D(\mathrm{H{-}F}) = 567\ \mathrm{kJ\,mol^{-1}}$ and $\chi(\mathrm{H}) = 2.20$, compute Pauling's electronegativity of fluorine. (Enter $\chi(\mathrm{F})$ to two decimal places.)
::: solution
In eV: $4.519$, $1.648$, $5.877$. Then $\chi(\mathrm{F}) - 2.20 = \sqrt{5.877 - \sqrt{4.519 \times 1.648}} = \sqrt{5.877 - 2.729} = \sqrt{3.148} = 1.774$, so $\chi(\mathrm{F}) = 3.97$ — the tabulated $3.98$ to within rounding, reached from three bond enthalpies.
:::
:::

::: exercise Ionic character from a dipole moment {level=2 check="18.1"}
Hydrogen chloride has dipole moment $\mu = 1.109\ \mathrm{D}$ and bond length $127.5\ \mathrm{pm}$ ($1\ \mathrm{D} = 3.336\times10^{-30}\ \mathrm{C\,m}$, $e = 1.602\times10^{-19}\ \mathrm{C}$). Compute the percent ionic character $100\,\mu/(er)$ and compare it with Pauling's formula for $\Delta\chi = 0.96$. (Enter the percent ionic character from the dipole moment.)
::: solution
A full charge separation would give $\mu_\mathrm{ion} = er = (1.602\times10^{-19}\ \mathrm{C})(1.275\times10^{-10}\ \mathrm{m}) = 2.043\times10^{-29}\ \mathrm{C\,m} = 6.12\ \mathrm{D}$. Then $100 \times 1.109/6.12 = 18.1\ \%$. Pauling's formula gives $100\left[1 - \exp(-0.96^2/4)\right] = 20.6\ \%$: close, as the figure in the text shows for all the heavier hydrogen halides. Three significant figures are justified by the data.
:::
:::

::: exercise Mean Al–Cl bond enthalpy {#ex-alcl-mean level=2 check="426"}
From $\Delta_\mathrm{f}H^\circ(\mathrm{AlCl_3,g}) = -584.6$, $\Delta_\mathrm{f}H^\circ(\mathrm{Al,g}) = +330.0$ and $\Delta_\mathrm{f}H^\circ(\mathrm{Cl,g}) = +121.3\ \mathrm{kJ\,mol^{-1}}$ (standard tables, 298 K), find the mean $\mathrm{Al{-}Cl}$ bond enthalpy in gaseous monomeric $\mathrm{AlCl_3}$. (Enter it in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
Atomisation, $\mathrm{AlCl_3(g)} \rightarrow \mathrm{Al(g)} + 3\,\mathrm{Cl(g)}$, has
$$
\Delta_\mathrm{r}H^\circ = 330.0 + 3(121.3) - (-584.6) = 1278.5\ \mathrm{kJ\,mol^{-1}},
$$
which is the enthalpy of three $\mathrm{Al{-}Cl}$ bonds, so the mean is $1278.5/3 = 426\ \mathrm{kJ\,mol^{-1}}$. Note the reference state: this is the planar *monomer* in the gas. Solid aluminium chloride and the $\mathrm{Al_2Cl_6}$ dimer contain bridging chlorides and would give different numbers per bond — always check which species a tabulated mean bond enthalpy refers to.
:::
:::

::: exercise Thallium's two faces {level=2}
$\mathrm{TlCl_3}$ is a strong oxidiser that loses chlorine on warming to give $\mathrm{TlCl}$, while $\mathrm{AlCl_3}$ is thermally robust. Given $IE_2 + IE_3 = 4562\ \mathrm{kJ\,mol^{-1}}$ for Al and $4849\ \mathrm{kJ\,mol^{-1}}$ for Tl, and the mean Al–Cl bond enthalpy of the previous exercise, explain the difference.
::: solution
Both sides of the ledger move. Removing the inert pair costs about $290\ \mathrm{kJ\,mol^{-1}}$ more for thallium. The repayment is two extra $\mathrm{M{-}Cl}$ bonds (in the gas) or the extra lattice energy of a triply charged ion (in the solid), and both are smaller for the large thallium atom: its bonds to chlorine are longer and weaker than aluminium's $426\ \mathrm{kJ\,mol^{-1}}$ bonds, and the lattice energy of a salt falls as the cation grows. So $\mathrm{Tl^{3+}}$ pulls electrons back from chloride and $\mathrm{Tl(I)}$ wins, while aluminium's cheaper ionisation and stronger bonds tip the balance the other way. The inert pair is both an ionisation effect and a bond-enthalpy effect.
:::
:::

::: exercise Deriving the period trend {level=3 check="16"}
Using the hydrogenic expression $IE \propto Z_\mathrm{eff}^2$ (at fixed $n$) with Slater's $Z_\mathrm{eff}$ values for Li ($1.30$, for the $2s$ electron) and F ($5.20$, for a $2p$ electron), estimate $IE_1(\mathrm{F})/IE_1(\mathrm{Li})$ and compare with experiment ($1681/520 = 3.23$). Why does the model overshoot, and what fixes it qualitatively? (Enter the predicted ratio.)
::: hint
Check the two $Z_\mathrm{eff}$ values from the proposition first: lithium's $2s$ electron is screened by two $1s$ electrons at $0.85$ each; fluorine's $2p$ electron by six other $n = 2$ electrons at $0.35$ and two $1s$ electrons at $0.85$. Then think about what happens to the energy of the electrons that *remain*.
:::
::: solution
Lithium: $3 - 2(0.85) = 1.30$; fluorine: $9 - 6(0.35) - 2(0.85) = 5.20$. The hydrogenic ratio is $(5.20/1.30)^2 = 16$, against an observed $3.2$. The model overshoots because it treats the removed electron as an independent particle in the field of a fixed charge $Z_\mathrm{eff}$. An ionisation energy is really a difference between the energies of the atom and the ion: when one of fluorine's seven $n = 2$ electrons leaves, the other six lose a repulsive partner and relax downward in energy, which partly pays for the ionisation. The more same-shell electrons there are, the larger this relief, so the model's overshoot grows across the period (the figure in the text shows the same thing for period 3). Slater's rules are therefore a tool for *ranking and direction*, not for quantitative energies — which is how this chapter uses them.
:::
:::

::: exercise The lanthanide contraction in the lab {level=3}
Zirconium and hafnium occur together in every ore and are notoriously hard to separate, while zirconium and titanium (same group, one period up) separate easily. Ionic radii: $\mathrm{Ti^{4+}}\ 60.5$, $\mathrm{Zr^{4+}}\ 72$, $\mathrm{Hf^{4+}}\ 71\ \mathrm{pm}$. Explain both observations in terms of this chapter, predict whether $\mathrm{TiO_2}$ or $\mathrm{ZrO_2}$ is the more basic oxide, and say whether the same reasoning can rank $\mathrm{ZrO_2}$ and $\mathrm{HfO_2}$.
::: hint
Separation methods exploit differences in hydration, complex formation and solubility, all of which depend on charge and radius. Basicity of an oxide falls as the polarising power ($z/r$) of the cation rises.
:::
::: solution
Chemical similarity tracks charge and radius. $\mathrm{Zr^{4+}}$ and $\mathrm{Hf^{4+}}$ have the same charge and differ by $1\ \mathrm{pm}$, because the fourteen $4f$ electrons added between them screen the fourteen extra protons so poorly (the lanthanide contraction) that the expected growth in size is cancelled. Their hydration energies, complex stabilities and salt solubilities are therefore nearly identical, and industrial separation needs many-stage solvent extraction that exploits small differences in complex formation. $\mathrm{Ti^{4+}}$ is $11.5\ \mathrm{pm}$ smaller, so its chemistry differs enough for straightforward separation. For basicity: $z/r$ is $4/60.5 = 0.066$ for titanium and $4/72 = 0.056\ \mathrm{pm^{-1}}$ for zirconium, so $\mathrm{Ti^{4+}}$ polarises oxide more strongly and $\mathrm{TiO_2}$ is the more covalent, more acidic (amphoteric) oxide; **$\mathrm{ZrO_2}$ is the more basic**. For zirconium against hafnium the radius argument gives no usable answer: a $1\ \mathrm{pm}$ difference is within the uncertainty of the radii themselves. Hafnium(IV) oxide is usually described as very slightly *more* basic than zirconium's, a difference that comes from details of bonding the simple $z/r$ model cannot resolve — a reminder of where a trend argument stops being informative.
:::
:::
