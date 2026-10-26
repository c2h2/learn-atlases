Every reaction in this course is, in the end, either an acid–base reaction or a redox reaction, and the first half of that sentence does more work than most students expect. This chapter builds the acid–base machinery of the inorganic chemist in three layers: the Brønsted theory, extended from the aqueous acids of [[general-chemistry-2/acids-bases]] to the oxoacids and oxides of the whole table; the Lewis theory, which turns electron-pair donation into a general language for adducts, bridges and catalysis; and Pearson's hard-and-soft principle, the selectivity rule that tells you *which* base an acid will choose. Along the way we leave water behind — liquid ammonia, anhydrous hydrogen fluoride and the superacids show that "acid" and "base" are properties of a solvent system, not of a substance. The unifying idea is electrostatics at two scales: charge density (hard) versus polarisability (soft), and the number of electron-withdrawing groups hanging off an OH.

## Oxoacids: Pauling's rules

::: definition Oxoacid structure and notation {#def-oxoacid}
An **oxoacid** of an element $E$ is written $\mathrm{O_pE(OH)_q}$: $p$ terminal (double-bond-like) oxygens and $q$ hydroxyl groups, e.g. $\mathrm{HOCl}$ ($p = 0$, $q = 1$), chlorous acid $\mathrm{HOClO}$ ($p = 1$, $q = 1$), chloric acid $\mathrm{HOClO_2}$ ($p = 2$, $q = 1$), perchloric acid $\mathrm{HOClO_3}$ ($p = 3$, $q = 1$), sulfuric acid $\mathrm{(HO)_2SO_2}$ ($p = 2$, $q = 2$). Only the $\mathrm{O{-}H}$ protons are acidic: a proton bound directly to the central atom (the $\mathrm{P{-}H}$ hydrogens of $\mathrm{H_3PO_3}$, $\mathrm{HP(O)(OH)_2}$) does not ionise in water, because C–H and P–H bonds are weakly polar and their conjugate bases are unstabilised.
:::

::: proposition Pauling's rules for oxoacid strength {#prop-pauling-rules}
For an oxoacid $\mathrm{O_pE(OH)_q}$ the successive acidity constants obey, to useful accuracy,
$$
\mathrm{p}K_\mathrm{a1} \approx 8 - 5p, \qquad \mathrm{p}K_\mathrm{a(n+1)} \approx \mathrm{p}K_\mathrm{an} + 5 .
$$
Each terminal $\mathrm{E{=}O}$ group withdraws electron density inductively, polarising the $\mathrm{O{-}H}$ bond and — decisively — delocalising the negative charge of the conjugate base over more oxygens; each additional ionisation must create an anion with one more unit of charge, which costs about five $\mathrm{p}K_\mathrm{a}$ units. The rules are empirical, and they work: $\mathrm{HNO_2}$ ($p = 1$; predicted 3, observed 3.3), $\mathrm{H_3PO_4}$ ($p = 1$; 3, observed 2.15), $\mathrm{H_2SO_4}$ ($p = 2$; $-2$, observed about $-3$), $\mathrm{HClO_4}$ ($p = 3$; $-7$, fully dissociated).
:::

::: widget plot
f: 8 - 5*x
x: -0.5, 3.5
y: -12, 10
points: 0,7.5; 1,2.0; 2,-1; 3,-10
labels: \text{Pauling: } pK_{a1} = 8 - 5p
caption: First $\mathrm{p}K_\mathrm{a}$ of the chlorine oxoacids against the number $p$ of terminal oxygens: the line is Pauling's rule $8 - 5p$ (so $-2$ at $p = 2$ and $-7$ at $p = 3$), and the points are observed or estimated values ($\mathrm{HOCl}\ 7.5$, $\mathrm{HClO_2}\ 2.0$, $\mathrm{HClO_3}$ about $-1$, $\mathrm{HClO_4}$ about $-10$). The rule is excellent at $p = 0$ and $1$. Chloric acid lies about one unit *above* the line (slightly weaker than predicted) and perchloric acid about three units below it (stronger). The values for the two strong acids are estimates, because both are fully dissociated in water and cannot be measured there directly; the rule is most useful where measurement is easiest, for the weak and moderately strong acids.
:::

::: example The chlorine ladder {#ex-chlorine-oxoacids}
Rank $\mathrm{HOCl}$, $\mathrm{HClO_2}$, $\mathrm{HClO_3}$, $\mathrm{HClO_4}$ in acid strength and explain the order in one sentence each, using structures.
::: solution
$\mathrm{HOCl} < \mathrm{HClO_2} < \mathrm{HClO_3} < \mathrm{HClO_4}$, with $\mathrm{p}K_\mathrm{a}\ 7.5,\ 2.0$, and both remaining acids fully dissociated. $\mathrm{HOCl}$ is $\mathrm{HO{-}Cl}$: its conjugate base $\mathrm{OCl^-}$ localises the charge on one oxygen. Each terminal $\mathrm{E{=}O}$ group added to the chlorine is an electron-withdrawing group and a place to hide the charge: $\mathrm{ClO_2^-}$ spreads it over two oxygens, $\mathrm{ClO_3^-}$ over three, $\mathrm{ClO_4^-}$ over four — and a tetrahedral anion with the charge smeared over four equivalent oxygens is barely basic at all. Acidity here is conjugate-base stabilisation, and the oxo group is inorganic chemistry's favourite stabiliser.
:::
:::

::: widget newton
f: x^2 + 3.0e-8*x - 3.0e-10
method: newton
x0: 0.0001
caption: Newton's method solving the exact weak-acid equation $x^2 + K_\mathrm{a}x - K_\mathrm{a}c = 0$ for $x = [\mathrm{H_3O^+}]$ in $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HOCl}$ ($K_\mathrm{a} = 3.0\times10^{-8}$), starting from $x_0 = 10^{-4}$. The root is $x = 1.7\times10^{-5}\ \mathrm{mol\,dm^{-3}}$, $\mathrm{pH} = 4.76$: with $c/K_\mathrm{a} \approx 3\times10^{5}$ the square-root estimate $\sqrt{K_\mathrm{a}c}$ is right to three figures, as Pauling's weakest chlorine oxoacid makes a textbook-perfect weak acid.
:::

::: example The phosphorus trap: which protons count? {#ex-phosphorus-oxoacids}
The acids $\mathrm{H_3PO_4}$, $\mathrm{H_3PO_3}$ and $\mathrm{H_3PO_2}$ all "have three acidic hydrogens by formula". How many does each actually donate, and what are their approximate $\mathrm{p}K_\mathrm{a1}$ values?
::: solution
Structures decide: $\mathrm{(HO)_3PO}$ ($p = 1$) is triprotic with $\mathrm{p}K_\mathrm{a}\ 2.15,\ 7.20,\ 12.35$ — the spacings, $5.05$ and $5.15$, are Pauling's second rule almost exactly. $\mathrm{H_3PO_3}$ is really $\mathrm{HP(O)(OH)_2}$: **diprotic** ($\mathrm{p}K_\mathrm{a}\ 1.3,\ 6.7$), the P–H hydrogen never leaves. $\mathrm{H_3PO_2}$ is $\mathrm{H_2P(O)OH}$: **monoprotic** ($\mathrm{p}K_\mathrm{a} \approx 1$). A formula written $\mathrm{H}_n\mathrm{EO}_m$ hides the connectivity; $\mathrm{O_pE(OH)_q}$ shows it — which is why careful inorganic chemists prefer $\mathrm{HP(O)(OH)_2}$ to $\mathrm{H_3PO_3}$.
:::
:::

::: widget plot
f: 1/(1 + 10^(x - 2.15) + 10^(2*x - 9.35) + 10^(3*x - 21.70)); 10^(x - 2.15)/(1 + 10^(x - 2.15) + 10^(2*x - 9.35) + 10^(3*x - 21.70)); 10^(2*x - 9.35)/(1 + 10^(x - 2.15) + 10^(2*x - 9.35) + 10^(3*x - 21.70)); 10^(3*x - 21.70)/(1 + 10^(x - 2.15) + 10^(2*x - 9.35) + 10^(3*x - 21.70))
x: 0, 14
y: 0, 1.05
labels: \mathrm{H_3PO_4}; \mathrm{H_2PO_4^-}; \mathrm{HPO_4^{2-}}; \mathrm{PO_4^{3-}}
caption: Fractions of the four phosphate species against pH ($x$), from $\mathrm{p}K_\mathrm{a} = 2.15$, $7.20$, $12.35$. Each crossing of neighbouring curves at a fraction of $0.5$ is a $\mathrm{p}K_\mathrm{a}$, and the crossings are spaced by about five units — Pauling's second rule made visible. Because the spacing is so wide, at most two species matter at any pH, which is why phosphate buffers near pH 7 can be treated as a simple $\mathrm{H_2PO_4^-}/\mathrm{HPO_4^{2-}}$ pair. A diprotic acid such as $\mathrm{HP(O)(OH)_2}$ would show only three curves: the $\mathrm{P{-}H}$ hydrogen never comes off.
:::

::: warning Two famous exceptions to the rules {#warn-oxoacid-exceptions}
First, carbonic acid: $\mathrm{H_2CO_3}$ is $\mathrm{O_1C(OH)_2}$, $p = 1$, predicted $\mathrm{p}K_\mathrm{a} \approx 3$ — and the tabulated value is 6.35. The catch is that dissolved "$\mathrm{CO_2(aq)}$" is about 99.8 % true $\mathrm{CO_2}$ and only about 0.2 % $\mathrm{H_2CO_3}$: with a hydration ratio $[\mathrm{H_2CO_3}]/[\mathrm{CO_2}] \approx 1.7\times10^{-3}$, the apparent constant is the true one multiplied by that small fraction, so the *true* $\mathrm{p}K_\mathrm{a}$ of the molecule is about 3.6 (exercise [[#exr-carbonic]]; Pauling vindicated), while the *apparent* constant of the mixture is 6.35. Second, boric acid: $\mathrm{B(OH)_3}$, $p = 0$, predicted 8 — and it scores 9.24, close enough, but for a different reason: it is not a Brønsted acid at all but a **Lewis acid**, $\mathrm{B(OH)_3 + 2\,H_2O \rightleftharpoons B(OH)_4^- + H_3O^+}$, accepting hydroxide because boron's octet is incomplete. Rules are guides; structures are the law.
:::

## Binary hydrides, hydrohalic acids, and the leaving of water

Down a group, binary-acid strength broadly tracks the falling bond strength: $\mathrm{HF} < \mathrm{HCl} < \mathrm{HBr} < \mathrm{HI}$ ($\mathrm{p}K_\mathrm{a}\ 3.2,\ -6,\ -9,\ -10$) as the $\mathrm{H{-}E}$ bond weakens ($567, 431, 366, 299\ \mathrm{kJ\,mol^{-1}}$) and the anion grows and disperses charge. Across a period, polarity governs: $\mathrm{CH_4} \ll \mathrm{NH_3} < \mathrm{H_2O} < \mathrm{HF}$. The anomaly to be able to explain is HF's weakness among the strong hydrohalic acids.

::: example Why hydrofluoric acid is weak {#ex-hf-weak}
$\mathrm{H{-}F}$ is the most polar of the hydrogen halides — so why is HF the only weak one in water? Use standard thermodynamic data at $298\ \mathrm{K}$ ($\Delta_\mathrm{f}H^\circ$, $\Delta_\mathrm{f}G^\circ$ in $\mathrm{kJ\,mol^{-1}}$; $\mathrm{H^+(aq)}$ is zero by convention): $\mathrm{HF(aq)}$ $-320.1$, $-296.8$; $\mathrm{F^-(aq)}$ $-332.6$, $-278.8$; $\mathrm{HF(g)}$ $-271.1$, $-273.2$; $\mathrm{HCl(g)}$ $-92.3$, $-95.3$; $\mathrm{Cl^-(aq)}$ $-167.2$, $-131.2$.
::: solution
**The dissociation itself.** For $\mathrm{HF(aq)} \rightarrow \mathrm{H^+(aq)} + \mathrm{F^-(aq)}$:
$$
\Delta_\mathrm{r}H^\circ = -332.6 - (-320.1) = -12.6\ \mathrm{kJ\,mol^{-1}},\qquad
\Delta_\mathrm{r}G^\circ = -278.8 - (-296.8) = +18.0\ \mathrm{kJ\,mol^{-1}},
$$
so $T\Delta_\mathrm{r}S^\circ = \Delta_\mathrm{r}H^\circ - \Delta_\mathrm{r}G^\circ = -30.6\ \mathrm{kJ\,mol^{-1}}$ ($\Delta_\mathrm{r}S^\circ = -103\ \mathrm{J\,K^{-1}\,mol^{-1}}$), and $\mathrm{p}K_\mathrm{a} = \Delta_\mathrm{r}G^\circ/(RT\ln 10) = 18.0/5.708 = 3.16$, the measured value. The striking fact is the sign of $\Delta_\mathrm{r}H^\circ$: dissociation of aqueous HF is *exothermic*. Any explanation in terms of bond enthalpy alone — "the H–F bond is too strong to break" — is therefore incomplete. HF is weak because of the **entropy** term. Two ions are created, and the small, highly charged $\mathrm{F^-}$ (like $\mathrm{H_3O^+}$) orders the water around it far more strongly than the neutral, hydrogen-bonded HF molecule did; that ordering costs $30.6\ \mathrm{kJ\,mol^{-1}}$ at room temperature, more than the enthalpy gain.

**Comparison with HCl.** Undissociated $\mathrm{HCl(aq)}$ cannot be studied (it is fully dissociated), so compare both acids starting from the gas, $\mathrm{HX(g)} \rightarrow \mathrm{H^+(aq)} + \mathrm{X^-(aq)}$:

| | $\Delta_\mathrm{r}H^\circ$ | $\Delta_\mathrm{r}G^\circ$ | $T\Delta_\mathrm{r}S^\circ$ |
|---|---|---|---|
| HF | $-61.5$ | $-5.6$ | $-55.9$ |
| HCl | $-74.9$ | $-35.9$ | $-38.9$ |

(all in $\mathrm{kJ\,mol^{-1}}$). Of the $30.3\ \mathrm{kJ\,mol^{-1}}$ by which HCl is ahead in free energy, $13.4$ comes from enthalpy and $17.0$ from entropy. The enthalpy terms nearly cancel — the stronger $\mathrm{H{-}F}$ bond is largely paid for by the much more exothermic hydration of the small $\mathrm{F^-}$ — and the entropy cost of that same tight hydration tips the balance. Concentrated HF also forms $\mathrm{HF_2^-}$ (the three-centre bond of [[main-group/main-group-bonding]]), $\mathrm{HF + F^- \rightleftharpoons HF_2^-}$, which removes fluoride and makes concentrated hydrofluoric acid behave as a stronger acid than the dilute one. Acid strength is a free-energy cycle, not a single bond enthalpy — and its entropy terms are not small print.
:::
:::

## Oxides and hydroxides: a lifetime of an element's acidity

::: definition Acidic, amphoteric and basic oxides {#def-oxides}
An oxide is **basic** if it consumes acid ($\mathrm{MgO + 2\,H^+ \to Mg^{2+} + H_2O}$), **acidic** if it consumes base ($\mathrm{SO_3 + 2\,OH^- \to SO_4^{2-} + H_2O}$), **amphoteric** if it does both ($\mathrm{ZnO}$, $\mathrm{Al_2O_3}$, $\mathrm{SnO_2}$). The pattern is periodic: oxides become more acidic left-to-right across a period (basic $\mathrm{Na_2O}$ → amphoteric $\mathrm{Al_2O_3}$ → acidic $\mathrm{SO_3}$, $\mathrm{Cl_2O_7}$) and more acidic *up* a group and with *higher oxidation state* ($\mathrm{MnO}$ basic, $\mathrm{MnO_2}$ amphoteric, $\mathrm{Mn_2O_7}$ acidic — the anhydride of permanganic acid). In Lewis terms the two behaviours are opposite roles. A **basic** oxide is an electron-pair *donor*: its oxide ions, held by a large cation of low charge, are free to give a lone pair to a proton ($\mathrm{O^{2-} + H^+ \to OH^-}$). An **acidic** oxide is an electron-pair *acceptor*: its small, highly charged, electronegative central atom pulls density away from the oxygens and can itself accept a pair from a base — in $\mathrm{SO_3 + OH^- \to HSO_4^-}$ the hydroxide oxygen bonds to sulfur. The more electronegative and highly charged the central atom, the more acidic the oxide.
:::

Hydroxides follow the same rule read as $\mathrm{E{-}OH}$ versus $\mathrm{E \leftarrow OH}$: if $\mathrm{E}$ is electropositive the compound loses $\mathrm{OH^-}$ (a base, like $\mathrm{NaOH}$); if $\mathrm{E}$ is electronegative it loses $\mathrm{H^+}$ (an acid, like $\mathrm{HOCl}$); in between it does both, and that middle band — Be, Al, Zn, Sn, Pb, Cr(III) — is the amphoteric band you will meet again in qualitative analysis and in [[main-group/groups-13-14]].

## Lewis acids and bases

::: definition Lewis acids and bases {#def-lewis}
A **Lewis base** donates an electron pair to form a bond; a **Lewis acid** accepts one. Every Brønsted acid–base reaction is a Lewis one in disguise (the transferred proton is the electron-pair acceptor), but the Lewis definition reaches far beyond protons: $\mathrm{BF_3}$, $\mathrm{AlCl_3}$, $\mathrm{SiF_4}$, $\mathrm{SO_3}$, $\mathrm{Ag^+}$, and any main-group centre with an unfilled orbital or a low-lying $\sigma^*$ orbital. The adduct $\mathrm{F_3B{-}NH_3}$ is the prototype: dative, polar, and — as you now know from [[main-group/main-group-bonding]] — just the smallest case of curing an electron shortage.
:::

::: example The inverted Lewis acidity of the boron trihalides {#ex-bx3}
By inductive logic $\mathrm{BF_3}$ — with the most electronegative substituents — should be the strongest Lewis acid toward $\mathrm{NH_3}$. Experiment gives the opposite: $\mathrm{BF_3 < BCl_3 < BBr_3 < BI_3}$. Explain.
::: solution
$\mathrm{BX_3}$ is electron-deficient *and* its empty $2p$ orbital is partially filled by $\pi$ donation from the halide lone pairs — and fluorine, small and compact, is the best $\pi$ donor to boron's $2p$. $\mathrm{BF_3}$ arrives at the reaction already partly satisfied by π donation — in valence-bond language, resonance forms $\mathrm{F_2B^-{=}F^+}$ with a formal negative charge on boron and a positive one on the doubly bonded fluorine — and it must *give that up* (pyramidalise the boron and lose the π overlap) to bind ammonia. $\mathrm{BI_3}$, whose $5p$–$2p$ π overlap is poor, has less to lose. A second contribution is the energy needed to bend planar $\mathrm{BX_3}$ into the pyramidal adduct geometry, which is also largest for the fluoride. Moral: Lewis acidity is the *net* of σ-withdrawal and π-donation, and in the second period the π term is large enough to invert the inductive order.
:::
:::

::: example Why silicon takes six fluorides and carbon takes four {#ex-sif6}
$\mathrm{SiF_4 + 2\,F^- \to SiF_6^{2-}}$ is quantitative in solution (the basis of glass etching and of fluoride analysis); no $\mathrm{CF_6^{2-}}$ exists. Why?
::: solution
Not because silicon "has $d$ orbitals" — the argument of [[main-group/main-group-bonding]] applies: the two extra electron pairs occupy ligand-centred non-bonding combinations of the three-centre bonding scheme, exactly as in $\mathrm{SF_6}$, and the real enablers are **size** (six fluorides crowd comfortably around the larger silicon: $\mathrm{Si{-}F}\ 168\ \mathrm{pm}$ versus $\mathrm{C{-}F}\ 135\ \mathrm{pm}$) and **electrostatics** (the diffuse negative charge of $\mathrm{SiF_6^{2-}}$ is stable; around a tiny carbon, fluoride–fluoride repulsion in a six-coordinate cage is fatal). Coordination numbers in main-group chemistry are set by radius ratios and electron counts, not by the availability of $d$ orbitals — a sentence worth memorising precisely because the old textbooks memorised the wrong one.
:::
:::

## Hard and soft acids and bases

::: definition Hard and soft {#def-hsab}
A **hard** acid or base is small, non-polarisable, and holds its charge tight ($\mathrm{H^+}$, $\mathrm{Li^+}$, $\mathrm{Al^{3+}}$, $\mathrm{Fe^{3+}}$, $\mathrm{BF_3}$; bases $\mathrm{F^-}$, $\mathrm{OH^-}$, $\mathrm{H_2O}$, $\mathrm{CO_3^{2-}}$, $\mathrm{PO_4^{3-}}$, $\mathrm{NH_3}$). A **soft** one is large, polarisable, often with low charge and accessible $d$ electrons ($\mathrm{Ag^+}$, $\mathrm{Hg^{2+}}$, $\mathrm{Cu^+}$, $\mathrm{Tl^+}$, $\mathrm{I_2}$; bases $\mathrm{I^-}$, $\mathrm{HS^-}$, $\mathrm{RS^-}$, $\mathrm{CN^-}$, $\mathrm{CO}$, alkenes). Borderline cases ($\mathrm{Fe^{2+}}$, $\mathrm{Cu^{2+}}$, $\mathrm{SO_3^{2-}}$, pyridine) sit in between.
:::

::: proposition The HSAB principle {#prop-hsab}
Hard acids prefer hard bases and soft acids prefer soft bases, and the preference is thermodynamic: hard–hard combinations are stabilised mainly by electrostatics (charge–charge attraction, favoured by small, hard partners that cannot polarise), soft–soft by covalency (frontier-orbital interactions, favoured by large, polarisable partners whose electron clouds deform into each other). Mismatched pairs — hard acid with soft base — are the labile, reactive, transferable ones.
:::

::: example Silver halides: one column, four solubilities {#ex-agx}
$\mathrm{AgF}$ is freely soluble; $\mathrm{AgCl}$, $\mathrm{AgBr}$, $\mathrm{AgI}$ have solubility products $1.8\times10^{-10}$, $5\times10^{-13}$, $8\times10^{-17}$. Explain the order, and why the alkali halides show nothing like it.
::: solution
$\mathrm{Ag^+}$ is a soft acid ($4d^{10}$, polarisable); down the halide column the bases soften ($\mathrm{F^-}$ hard, $\mathrm{I^-}$ very soft). Soft–soft matching makes $\mathrm{AgI}$ strongly covalent — the extra lattice stability that Fajans' rules and the HSAB principle are two languages for — so it is the least soluble; $\mathrm{AgF}$, the mismatched pair, is the ionic, soluble one. Sodium, a hard acid, shows no such discrimination: $\mathrm{NaF}$ through $\mathrm{NaI}$ are all soluble, their differences set by ordinary lattice-versus-hydration arithmetic. Photographic fixer uses a soft *sulfur* donor to compete for silver: thiosulfate forms $\mathrm{[Ag(S_2O_3)_2]^{3-}}$ ($\beta_2 \approx 2.9\times10^{13}$), and the dissolution $\mathrm{AgX(s) + 2\,S_2O_3^{2-} \rightleftharpoons [Ag(S_2O_3)_2]^{3-} + X^-}$ has $K = K_\mathrm{sp}\beta_2$. That is about $5\times10^{3}$ for AgCl and $15$ for AgBr, so both dissolve readily, but only about $2\times10^{-3}$ for AgI: even in $1\ \mathrm{mol\,dm^{-3}}$ thiosulfate, AgI dissolves about ten times less than AgBr (exercise [[#exr-agi-fixer]]). Thiosulfate is soft, but iodide is a soft competitor too.
:::
:::

::: example Ambidentate bases: sulfite chooses {#ex-sulfite}
Sulfite $\mathrm{SO_3^{2-}}$ can bond through sulfur or through oxygen. Predict the products of (a) $\mathrm{SO_3^{2-} + H^+}$; (b) $\mathrm{SO_3^{2-} + CH_3I}$.
::: solution
(a) $\mathrm{H^+}$ is the archetypal hard acid: it takes the hard oxygen, giving $\mathrm{HSO_3^-}$ — and because O-protonation leaves the sulfur lone pair untouched, bisulfite goes on to add to carbonyl compounds *through sulfur*. (b) Methyl iodide is a soft electrophile (the polarisable $\mathrm{C{-}I}$ bond reacts at carbon through its $\sigma^*$ orbital): sulfur attacks, and the product is methanesulfonate, $\mathrm{CH_3SO_3^-}$, with a $\mathrm{C{-}S}$ bond — the Strecker sulfonate synthesis, which works for alkyl halides generally. (Methanesulfonic acid itself is made industrially by a different route, the oxidation of methanethiol or dimethyl disulfide.) One anion, two reagents, two different atoms bonded: the HSAB principle is a *predictive* rule, and this is a classic demonstration.
:::
:::

::: warning HSAB is a ranking principle, not an energy {#warn-hsab}
"Hard prefers hard, and soft prefers soft" has no number attached. It ranks *trends within a series* (AgF versus AgI, O- versus S-attack) and fails silently when other terms dominate. The silver example shows how. HSAB says thiosulfate (soft S donor) should pull $\mathrm{Ag^+}$ away from the hard fluoride and the borderline chloride — and it does — but it cannot say whether it wins against iodide, because both competitors are soft. Only the numbers, $K = K_\mathrm{sp}\beta_2$, decide: AgBr dissolves completely in ordinary fixer, AgI only partly. Two further cautions: solubility also contains lattice and hydration terms that have nothing to do with hardness, and HSAB is a statement about equilibria, so a product it favours may still form slowly or be overtaken by a faster route. Use HSAB to *choose which comparison to make*, then check the comparison against data; never to declare a reaction forbidden.
:::

## Non-aqueous solvents: acids and bases without water

::: definition Autoionisation, levelling and the solvent system {#def-autoionization}
Every polar solvent autoionises ($\mathrm{2\,H_2O \rightleftharpoons H_3O^+ + OH^-}$; $\mathrm{2\,NH_3 \rightleftharpoons NH_4^+ + NH_2^-}$; $\mathrm{2\,HF \rightleftharpoons H_2F^+ + F^-}$), and each defines its own neutral point and its own ceiling: **the strongest acid that can exist in a solvent is the solvated proton** ($\mathrm{H_3O^+}$, $\mathrm{NH_4^+}$, $\mathrm{H_2F^+}$) and **the strongest base is the solvated anion** ($\mathrm{OH^-}$, $\mathrm{NH_2^-}$, $\mathrm{F^-}$) — any stronger species is destroyed by the solvent itself (the *levelling effect*). Acids and bases stronger than the solvent's own ions are **superacids** and **superbases**, observable only in less basic media.
:::

::: example The base ladder in three solvents {#ex-levelling}
Where do $\mathrm{NaOH}$, $\mathrm{NaNH_2}$ and $\mathrm{NaH}$ sit in (a) water, (b) liquid ammonia, (c) DMSO?
::: solution
(a) In water all three are levelled to $\mathrm{OH^-}$: $\mathrm{NH_2^- + H_2O \to NH_3 + OH^-}$ is complete ($K$ of order $10^{20}$ or more, since $\mathrm{p}K_\mathrm{a}(\mathrm{NH_3})$ is usually quoted near 38, far above water's) and $\mathrm{H^- + H_2O \to H_2 + OH^-}$ (irreversible). Water cannot tell them apart. (b) In dry liquid ammonia the equilibrium $\mathrm{OH^- + NH_3 \rightleftharpoons H_2O + NH_2^-}$ lies to the left, so $\mathrm{OH^-}$ is a weak base and is not levelled up to $\mathrm{NH_2^-}$. $\mathrm{NH_2^-}$ is the ceiling; if water is present, it is $\mathrm{NH_2^-}$ that is levelled toward $\mathrm{OH^-}$. $\mathrm{NaNH_2}$ is therefore the strong base of ammonia chemistry, and $\mathrm{NaH}$, insoluble and heterogeneous, is used when a surface base is wanted. (c) In aprotic DMSO neither $\mathrm{OH^-}$ nor $\mathrm{NH_2^-}$ is levelled by solvent protons, and intrinsic basicities reappear: hydroxide becomes a superb nucleophile ("DMSO enhances basicity by solvating cations but not anions"), and the scale stretches by many $\mathrm{p}K_\mathrm{a}$ units. The same base is three different reagents in three beakers.
:::
:::

::: example Heavy water arithmetic {#ex-pd}
For $\mathrm{D_2O}$ at $25\ \mathrm{^\circ C}$, $\mathrm{p}K_\mathrm{w} = 14.87$. What is the pD of neutral heavy water, and why is $\mathrm{p}K_\mathrm{w}$ larger than in light water?
::: solution
Neutral means $[\mathrm{D_3O^+}] = [\mathrm{OD^-}]$, so $\mathrm{pD} = 14.87/2 = 7.43$ — neutral heavy water is "less acidic" than 7.00 by construction of the scale. Physically, the $\mathrm{O{-}D}$ bond has a lower zero-point energy than $\mathrm{O{-}H}$ (the doubled deuterium mass lowers the stretch frequency by about $\sqrt{2}$), so it is harder to break, and $\mathrm{D_3O^+}$ holds its extra proton tighter — both autoionisation steps cost more, and $\mathrm{p}K_\mathrm{w}$ rises by 0.87 units. The same zero-point logic makes every acid–base equilibrium involving D slightly less favourable and every reaction breaking an $\mathrm{O{-}H}$ bond measurably slower for D — the kinetic isotope effect quantified in [[main-group/hydrogen-s-block]].
:::
:::

At the top of the acid scale sit the **superacids**: $100\ \%$ $\mathrm{H_2SO_4}$ already levels everything weaker, but mixtures such as $\mathrm{HSO_3F \cdot SbF_5}$ (magic acid, $H_0$ about $-20$ to $-23$) and $\mathrm{HF \cdot SbF_5}$ (fluoroantimonic acid, $H_0$ near $-21$ when dilute in HF and estimated near $-28$ for the $1{:}1$ mixture) protonate hydrocarbons outright — chemistry impossible in water, where every acid stronger than $\mathrm{H_3O^+}$ is destroyed by the solvent within one molecular lifetime. At the top of the base scale, the amide and hydride salts of liquid ammonia and the alkali organyls occupy the territory the levelling effect forbids in water. Solvent choice is acid–base design.

::: quiz
Why is perchloric acid strong while hypochlorous acid is weak?
- [x] $\mathrm{ClO_4^-}$ spreads its charge over four equivalent oxygens; $\mathrm{OCl^-}$ localises it on one — conjugate-base stabilisation.
- [ ] Perchloric acid has a weaker H–O bond — bond enthalpy controls oxoacid strength.
- [ ] Perchloric acid has more oxygen atoms, so it donates more protons — strength is about proton count.
- [ ] Chlorine in $+7$ is more electronegative than in $+1$.
::: solution
Strength is the free energy of losing one proton, and it is set by how stable the anion is: four oxo groups delocalise $\mathrm{ClO_4^-}$'s charge far better than none delocalise $\mathrm{OCl^-}$'s. Proton count is irrelevant (phosphoric acid has three and is weak); bond enthalpy matters for binary acids, not oxoacids; and oxidation state is only a bookkeeping proxy for the real inductive effect of the oxo groups.
:::
:::

## Where this leads

The oxoacid and oxide patterns organise the survey chapters: the acid anhydrides and oxoacid ladders of nitrogen, phosphorus, sulfur and the halogens in [[main-group/groups-15-16]] and [[main-group/halogens-noble-gases]]; the amphoteric band (Be, Al, Zn) in [[main-group/groups-13-14]] and [[main-group/hydrogen-s-block]]. Lewis acidity is the language of the Friedel–Crafts and borane chemistries of the organic courses ([[organic-1/nucleophilic-substitution]]), of zeolite catalysis ([[materials-chemistry/porous-materials]]), and of the complex stabilities of [[coordination-chemistry/complex-stability]]. The solvent-system idea returns with liquid ammonia in [[main-group/hydrogen-s-block]], and the quantitative acid–base machinery you should keep sharpening is in [[general-chemistry-2/acids-bases]] and [[general-chemistry-2/buffers-titrations]].

::: history
Arrhenius defined acids as hydroxyl compounds that give $\mathrm{H^+}$ in water (1884) — a definition that explained aqueous neutralisation and immediately failed on ammonia and on anhydrous chemistry. In 1923, in two independent papers, Brønsted and Lowry made the proton the carrier and conjugate pairs the grammar, and in the same year Gilbert Lewis, in his monograph *Valence and the Structure of Atoms and Molecules*, proposed the electron-pair definition, which he developed fully in a 1938 paper in the *Journal of the Franklin Institute*. Pauling's empirical oxoacid rules (not to be confused with his 1929 rules for the structures of ionic crystals) turned acid strength into structure arithmetic. The solvent-system idea grew out of Edward Curtis Franklin's long study of liquid ammonia, begun in the 1890s, and was stated generally by Cady and Elsey in 1928; and in 1963 Ralph Pearson's *JACS* paper on hard and soft acids and bases gave chemists their first quantitative-feeling selectivity rule since the electronegativity scale. George Olah's superacid chemistry of the 1960s–70s — protonating alkanes, observing carbocations directly — won the 1994 Nobel Prize and proved that the levelling effect is a statement about solvents, not about acids.
:::

::: summary
- Oxoacid strength is conjugate-base stabilisation: Pauling's rules ($\mathrm{p}K_\mathrm{a1} \approx 8 - 5p$, spacings of 5) read it off the structure $\mathrm{O_pE(OH)_q}$, and only OH protons count.
- Binary-acid strength rises down a group and across a period. HF is weak not because of a large enthalpy cost — its dissociation in water is exothermic — but because of the entropy cost of tightly hydrating the small $\mathrm{F^-}$ ion.
- Basic oxides donate electron pairs (oxide ions); acidic oxides accept them at an electronegative, highly charged central atom. Acidity grows with electronegativity and oxidation state, and the amphoteric band sits between.
- Lewis acidity is electron-pair acceptance; competing π-donation can invert inductive expectations (the $\mathrm{BX_3}$ order), and coordination numbers are set by size and electrostatics, not $d$ orbitals.
- Hard–hard attraction is electrostatic, soft–soft covalent; the HSAB principle predicts solubility trends (AgI), reaction sites (sulfite S versus O) and the transferability of mismatched pairs.
- Solvents level: the strongest acid and base in any medium are its own autoionisation ions, so the same reagent changes strength with the solvent — and superacids exist only where the ceiling is higher.
:::

## Exercises

::: exercise Pauling predictions {level=1 check="3"}
Predict $\mathrm{p}K_\mathrm{a1}$ for arsenic acid, $\mathrm{H_3AsO_4}$ ($\mathrm{OAs(OH)_3}$), and for perbromic acid, $\mathrm{HBrO_4}$ ($\mathrm{HOBrO_3}$), and say what each prediction means experimentally. (Enter the predicted $\mathrm{p}K_\mathrm{a1}$ of arsenic acid.)
::: solution
$\mathrm{H_3AsO_4}$: $p = 1$, predicted $\mathrm{p}K_\mathrm{a1} = 8 - 5 = 3$ — a moderately weak acid; observed 2.2, and triprotic with spacings near 5 (observed 2.2, 6.9, 11.5; predicted 3, 8, 13). $\mathrm{HBrO_4}$: $p = 3$, predicted $-7$ — a strong acid, fully dissociated in water. (That perbromates were hard to prepare at all — they were first made only in 1968 — is a statement about the kinetics of reaching bromine(VII), not about the acid strength once made.)
:::
:::

::: exercise From free energy to $\mathrm{p}K_\mathrm{a}$ {level=1 check="7.52"}
For $\mathrm{HOCl(aq)} \rightleftharpoons \mathrm{H^+(aq)} + \mathrm{OCl^-(aq)}$ at $298.15\ \mathrm{K}$, $\Delta_\mathrm{r}G^\circ = +42.9\ \mathrm{kJ\,mol^{-1}}$. Find $\mathrm{p}K_\mathrm{a}$. (Enter it to two decimal places.)
::: solution
$\mathrm{p}K_\mathrm{a} = \Delta_\mathrm{r}G^\circ/(RT\ln 10)$, and $RT\ln 10 = 8.314 \times 298.15 \times 2.3026 = 5708\ \mathrm{J\,mol^{-1}}$. So $\mathrm{p}K_\mathrm{a} = 42\,900/5708 = 7.52$, i.e. $K_\mathrm{a} = 3.0\times10^{-8}$. Every $5.71\ \mathrm{kJ\,mol^{-1}}$ of free energy is one $\mathrm{p}K$ unit at room temperature — a conversion worth knowing by heart.
:::
:::

::: exercise Count the acidic hydrogens {level=1}
How many protons does each donate in water: $\mathrm{H_3PO_4}$, $\mathrm{H_3PO_2}$, $\mathrm{H_4P_2O_7}$ (diphosphoric acid, $\mathrm{(HO)_2(O)P{-}O{-}P(O)(OH)_2}$), $\mathrm{H_4P_2O_6}$ (hypophosphoric acid, $\mathrm{(HO)_2(O)P{-}P(O)(OH)_2}$)?
::: solution
Three, one, four, four: count $\mathrm{O{-}H}$ groups only. $\mathrm{H_3PO_2}$ is $\mathrm{H_2P(O)OH}$, with one OH and two $\mathrm{P{-}H}$; diphosphoric acid and hypophosphoric acid each have four OH groups and no $\mathrm{P{-}H}$ (they differ in having a $\mathrm{P{-}O{-}P}$ bridge or a direct $\mathrm{P{-}P}$ bond). The habit to build: never answer from the formula, always from the connectivity.
:::
:::

::: exercise Hard or soft? {level=1}
Classify each acid as hard or soft: $\mathrm{Al^{3+}}$, $\mathrm{Ag^+}$, $\mathrm{Fe^{3+}}$, $\mathrm{Hg^{2+}}$, $\mathrm{BF_3}$, $\mathrm{Tl^+}$; and each base: $\mathrm{F^-}$, $\mathrm{I^-}$, $\mathrm{S^{2-}}$, $\mathrm{PO_4^{3-}}$, $\mathrm{CO}$.
::: solution
Hard acids: $\mathrm{Al^{3+}}$, $\mathrm{Fe^{3+}}$ (small, high charge), $\mathrm{BF_3}$. Soft acids: $\mathrm{Ag^+}$, $\mathrm{Hg^{2+}}$, $\mathrm{Tl^+}$ (large, polarisable, filled $d$ shells). Hard bases: $\mathrm{F^-}$, $\mathrm{PO_4^{3-}}$ (charge on small F or O atoms). Soft bases: $\mathrm{I^-}$, $\mathrm{S^{2-}}$, $\mathrm{CO}$ (polarisable; CO binds through carbon to soft, low-oxidation-state metals — the carbonyls of Ni and Fe, never of Mg or Al).
:::
:::

::: exercise A textbook weak acid {level=2 check="4.76"}
Find the pH of $0.010\ \mathrm{mol\,dm^{-3}}$ hypochlorous acid ($K_\mathrm{a} = 3.0\times10^{-8}$) by solving the exact quadratic, and check whether the approximation $[\mathrm{H^+}] \approx \sqrt{K_\mathrm{a}c}$ was justified. (Enter the pH to two decimal places.)
::: solution
With $x = [\mathrm{H^+}]$, $x^2/(c - x) = K_\mathrm{a}$ gives $x^2 + K_\mathrm{a}x - K_\mathrm{a}c = 0$, so
$$
x = \frac{-K_\mathrm{a} + \sqrt{K_\mathrm{a}^2 + 4K_\mathrm{a}c}}{2} = 1.73\times10^{-5}\ \mathrm{mol\,dm^{-3}},\qquad \mathrm{pH} = 4.76.
$$
The approximation gives $\sqrt{3.0\times10^{-10}} = 1.73\times10^{-5}$ — identical to three figures, because only $0.17\ \%$ of the acid is ionised. (Water's own contribution, $\sim10^{-7}$, is also negligible.) The newton figure in the text solves the same equation iteratively.
:::
:::

::: exercise The true strength of carbonic acid {#exr-carbonic level=2 check="3.58"}
The apparent first acidity constant of "carbonic acid" is $\mathrm{p}K_\mathrm{a1,app} = 6.35$, defined with the total of dissolved $\mathrm{CO_2(aq)} + \mathrm{H_2CO_3}$ in the denominator. The hydration equilibrium $\mathrm{CO_2(aq) + H_2O \rightleftharpoons H_2CO_3}$ has $K_\mathrm{h} = 1.7\times10^{-3}$. Find the $\mathrm{p}K_\mathrm{a}$ of the molecule $\mathrm{H_2CO_3}$ itself. (Enter it to two decimal places.)
::: solution
$K_\mathrm{a,app} = [\mathrm{H^+}][\mathrm{HCO_3^-}]/([\mathrm{CO_2}] + [\mathrm{H_2CO_3}])$ and $K_\mathrm{a,true} = [\mathrm{H^+}][\mathrm{HCO_3^-}]/[\mathrm{H_2CO_3}]$. Since $[\mathrm{H_2CO_3}] = K_\mathrm{h}[\mathrm{CO_2}]$, the fraction of dissolved carbon present as $\mathrm{H_2CO_3}$ is $K_\mathrm{h}/(1 + K_\mathrm{h})$, and $K_\mathrm{a,app} = K_\mathrm{a,true}\,K_\mathrm{h}/(1 + K_\mathrm{h})$. Hence
$$
\mathrm{p}K_\mathrm{a,true} = 6.35 + \log_{10}\frac{1.7\times10^{-3}}{1.0017} = 6.35 - 2.77 = 3.58.
$$
Pauling's rule ($p = 1$) predicts 3; the real molecule is an ordinary moderately weak oxoacid, disguised by the fact that almost all dissolved $\mathrm{CO_2}$ is never hydrated.
:::
:::

::: exercise The boric acid trick {level=2}
Boric acid, $\mathrm{B(OH)_3}$, has $\mathrm{p}K_\mathrm{a} = 9.24$ but does not lose any of its own protons in the ordinary way. Write the equilibrium and explain why adding mannitol makes it strong enough to titrate with sodium hydroxide.
::: solution
$\mathrm{B(OH)_3 + 2\,H_2O \rightleftharpoons B(OH)_4^- + H_3O^+}$: the boron atom accepts hydroxide from water (Lewis acidity) and a proton is released from that water. The equilibrium is too unfavourable for a sharp endpoint. Mannitol has adjacent OH groups that form stable cyclic esters with the tetrahedral borate, removing $\mathrm{B(OH)_4^-}$ from the equilibrium; Le Chatelier pulls the reaction to the right and the apparent $\mathrm{p}K_\mathrm{a}$ falls by several units, to roughly 5. That is why mannitol (or glycerol) is added before titrating boric acid. Lewis acidity, complex formation and analytical practice in one equilibrium.
:::
:::

::: exercise Predict the site {level=2}
Predict, with reasoning, the site of reaction and the main product for: (a) $\mathrm{SCN^- + H^+}$; (b) $\mathrm{SCN^- + CH_3I}$; (c) $\mathrm{NO_2^-}$ with a primary alkyl iodide, and with a tertiary alkyl halide.
::: solution
(a) $\mathrm{H^+}$ is a hard acid and the harder end of thiocyanate is nitrogen: the free acid exists mainly as isothiocyanic acid, $\mathrm{HNCS}$. (b) Methyl iodide is a soft electrophile reacting at carbon through the $\mathrm{C{-}I}$ $\sigma^*$ orbital; the softer sulfur attacks, giving methyl thiocyanate $\mathrm{CH_3SCN}$. (c) Nitrite has two hard oxygen ends and a softer nitrogen. With a primary alkyl iodide, an $\mathrm{S_N2}$ substrate with a soft carbon centre, N-attack predominates and the main product is the nitroalkane $\mathrm{RNO_2}$, with the nitrite ester $\mathrm{RONO}$ as a significant by-product (this holds for both sodium and silver nitrite). With a tertiary halide the reaction has $\mathrm{S_N1}$ character: the electrophile is a carbocation, a hard, charge-controlled acid, and O-attack giving the nitrite ester takes over. HSAB ranks site preferences sensibly here, but the mechanism decides how hard the electrophile actually is.
:::
:::

::: exercise Amphoteric zinc {level=2}
Write equations for the dissolution of $\mathrm{ZnO}$ in (a) acid and (b) base, and explain why $\mathrm{ZnO}$ is amphoteric while $\mathrm{Na_2O}$ is only basic and $\mathrm{SO_3}$ only acidic.
::: solution
(a) $\mathrm{ZnO + 2\,H^+ \to Zn^{2+} + H_2O}$; (b) $\mathrm{ZnO + 2\,OH^- + H_2O \to [Zn(OH)_4]^{2-}}$. In (a) the oxide ion donates a pair to $\mathrm{H^+}$; in (b) the zinc centre accepts pairs from hydroxide. Zinc(II) is small and doubly charged, with electronegativity $1.65$ — mid-range — so it can play either role. Sodium is electropositive and its large, singly charged cation leaves the oxide ion free to act only as a donor. Sulfur(VI) is so electronegative and highly charged that $\mathrm{SO_3}$ acts only as an acceptor: $\mathrm{SO_3 + H_2O \to H_2SO_4}$, and in base $\mathrm{SO_3 + 2\,OH^- \to SO_4^{2-} + H_2O}$. Acidity of oxides is a continuum in the central atom's electronegativity and charge; amphoterism is the middle.
:::
:::

::: exercise Silver iodide in fixer {#exr-agi-fixer level=2 check="0.045"}
Using $K_\mathrm{sp}(\mathrm{AgI}) = 8.3\times10^{-17}$ and $\beta_2 = 2.9\times10^{13}$ for $\mathrm{[Ag(S_2O_3)_2]^{3-}}$, estimate the solubility of AgI in $1.00\ \mathrm{mol\,dm^{-3}}$ sodium thiosulfate, and compare AgBr ($K_\mathrm{sp} = 5.0\times10^{-13}$). Ignore the mono-complex and activity effects. (Enter the solubility of AgI in $\mathrm{mol\,dm^{-3}}$ to two significant figures.)
::: solution
For $\mathrm{AgI(s) + 2\,S_2O_3^{2-} \rightleftharpoons [Ag(S_2O_3)_2]^{3-} + I^-}$, $K = K_\mathrm{sp}\beta_2 = 8.3\times10^{-17} \times 2.9\times10^{13} = 2.4\times10^{-3}$. If $s$ mol of AgI dissolve per $\mathrm{dm^3}$, the complex and the iodide are each $s$ and the thiosulfate is $1.00 - 2s$:
$$
\frac{s^2}{(1.00 - 2s)^2} = K \quad\Longrightarrow\quad \frac{s}{1.00 - 2s} = \sqrt{K} = 0.0491 \quad\Longrightarrow\quad s = \frac{0.0491}{1 + 2(0.0491)} = 0.045\ \mathrm{mol\,dm^{-3}}.
$$
For AgBr, $K = 14.5$, $\sqrt{K} = 3.81$, and $s = 3.81/8.62 = 0.44\ \mathrm{mol\,dm^{-3}}$ — almost all the thiosulfate is used. So AgBr dissolves essentially completely, while AgI dissolves only about a tenth as well even in this concentrated fixer (and far less in a dilute one, since $s \approx \sqrt{K}\,[\mathrm{S_2O_3^{2-}}]$). The soft–soft $\mathrm{Ag{-}I}$ interaction competes seriously with the soft sulfur donor.
:::
:::

::: exercise Deriving Pauling's second rule {level=3 check="16"}
The second ionisation of a diprotic oxoacid is about five $\mathrm{p}K_\mathrm{a}$ units harder than the first. Model the extra cost as the Coulomb repulsion between the first negative charge and the departing proton's site, a distance $r \approx 300\ \mathrm{pm}$ apart, in a medium of effective relative permittivity $\varepsilon_\mathrm{eff}$, and estimate $\varepsilon_\mathrm{eff}$ at $298\ \mathrm{K}$. (Enter $\varepsilon_\mathrm{eff}$ to two significant figures.)
::: hint
Convert five $\mathrm{p}K$ units to a free energy with $\Delta G = 2.303RT\,\Delta\mathrm{p}K$, and use $N_\mathrm{A}e^2/(4\pi\varepsilon_0) = 1.389\times10^{5}\ \mathrm{kJ\,pm\,mol^{-1}}$.
:::
::: solution
Five $\mathrm{p}K_\mathrm{a}$ units at $298\ \mathrm{K}$ are $\Delta\Delta G = 5 \times 5.708 = 28.5\ \mathrm{kJ\,mol^{-1}}$. The point-charge interaction per mole is $N_\mathrm{A}e^2/(4\pi\varepsilon_0\varepsilon_\mathrm{eff}r) = (1.389\times10^{5}/300)/\varepsilon_\mathrm{eff} = 463/\varepsilon_\mathrm{eff}\ \mathrm{kJ\,mol^{-1}}$. Setting $463/\varepsilon_\mathrm{eff} = 28.5$ gives $\varepsilon_\mathrm{eff} = 16$. That is far below water's bulk value of 78, which is sensible: the two sites are only a few hundred picometres apart, mostly through the anion itself rather than through solvent, so the screening is weak. The model also predicts how the rule fails: when the two acidic groups are further apart (as in long-chain dicarboxylic acids), the $\mathrm{p}K_\mathrm{a}$ spacing shrinks well below 5.
:::
:::

::: exercise Design a solvent system {level=3}
You must titrate (i) a very weak base such as pyridine ($\mathrm{p}K_\mathrm{a}$ of the conjugate acid 5.2 in water) and (ii) a very weak acid such as phenol ($\mathrm{p}K_\mathrm{a}$ 10.0 in water) to sharp endpoints. Choose each solvent from water, glacial acetic acid, liquid ammonia and DMSO, and justify with the levelling concept.
::: hint
A weak base is easier to titrate in a solvent that is a *weaker base* than water (so the titrant acid is not levelled down to $\mathrm{H_3O^+}$) and a better proton donor; a weak acid is easier in a solvent that does not level strong bases down to $\mathrm{OH^-}$.
:::
::: solution
(i) Use **glacial acetic acid** with perchloric acid as titrant. Acetic acid is a much weaker base than water, so $\mathrm{HClO_4}$ is not levelled to a weak solvated proton: its solution contains the very strong acid $\mathrm{CH_3COOH_2^+}$ (with $\mathrm{HClO_4}$ largely as ion pairs), and pyridine is protonated essentially completely. The titration curve has a large, sharp break — the standard non-aqueous titration of weak organic bases such as alkaloids. (ii) Use a solvent that does not level strong bases: **DMSO** (aprotic, solvating cations well and anions poorly) lets a strong base such as a tetraalkylammonium hydroxide or an alkoxide act at full strength, and phenol (still weak there, $\mathrm{p}K_\mathrm{a}$ about 18 in DMSO) is deprotonated sharply because the base is so much stronger than in water. Liquid ammonia is also a basic, levelling-upward solvent in which phenol behaves as a strong acid, but it is far less convenient to handle. Water fails at both extremes because its own ions, $\mathrm{H_3O^+}$ and $\mathrm{OH^-}$, cap the strength of every acid and base titrant — the levelling effect turned from nuisance into design principle.
:::
:::
