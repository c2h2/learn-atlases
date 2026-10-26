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
caption: First $\mathrm{p}K_\mathrm{a}$ of the chlorine oxoacids against the number $p$ of terminal oxygens: the line is Pauling's rule $8 - 5p$ (so $-2$ at $p = 2$ and $-7$ at $p = 3$), and the points are observed values ($\mathrm{HOCl}\ 7.5$, $\mathrm{HClO_2}\ 2.0$, $\mathrm{HClO_3}$ about $-1$, $\mathrm{HClO_4}$ about $-10$). The rule is excellent at $p = 0$–$1$. Chloric acid sits at or slightly above the line, so the rule does not underestimate it; only perchloric acid is clearly stronger than $8 - 5p$.
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
Structures decide: $\mathrm{(HO)_3PO}$ ($p = 1$) is triprotic with $\mathrm{p}K_\mathrm{a}\ 2.15,\ 7.20,\ 12.35$ — the successive $+5$ spacings are Pauling's second rule to within a tenth. $\mathrm{H_3PO_3}$ is really $\mathrm{HP(O)(OH)_2}$: **diprotic** ($\mathrm{p}K_\mathrm{a}\ 1.3,\ 6.7$), the P–H hydrogen never leaves. $\mathrm{H_3PO_2}$ is $\mathrm{H_2P(O)OH}$: **monoprotic** ($\mathrm{p}K_\mathrm{a} \approx 1$). Formula $\mathrm{H_nE}$ tells you nothing; $\mathrm{O_pE(OH)_q}$ tells you everything — which is why inorganic chemists never write $\mathrm{H_3PO_3}$.
:::
:::

::: warning Two famous exceptions to the rules {#warn-oxoacid-exceptions}
First, carbonic acid: $\mathrm{H_2CO_3}$ is $\mathrm{O_1C(OH)_2}$, $p = 1$, predicted $\mathrm{p}K_\mathrm{a} \approx 3$ — and the tabulated value is 6.35. The catch is that dissolved "$\mathrm{CO_2(aq)}$" is about 99.8 % true $\mathrm{CO_2}$ and only about 0.2 % $\mathrm{H_2CO_3}$: the gap $6.35 - 3.6 = 2.75$ means $[\mathrm{H_2CO_3}]/[\mathrm{CO_2}] = 10^{-2.75} \approx 0.0018$. The *true* $\mathrm{p}K_\mathrm{a}$ of the molecule is 3.6 (Pauling vindicated), while the *apparent* constant of the mixture is 6.35. Second, boric acid: $\mathrm{B(OH)_3}$, $p = 0$, predicted 8 — and it does score 9.24, but for the wrong reason: it is not a Brønsted acid at all but a **Lewis acid**, $\mathrm{B(OH)_3 + 2\,H_2O \rightleftharpoons B(OH)_4^- + H_3O^+}$, accepting hydroxide because boron's octet is incomplete. Rules are guides; structures are the law.
:::

## Binary hydrides, hydrohalic acids, and the leaving of water

Down a group, binary-acid strength is governed by bond strength: $\mathrm{HF} < \mathrm{HCl} < \mathrm{HBr} < \mathrm{HI}$ ($\mathrm{p}K_\mathrm{a}\ 3.2,\ -6,\ -9,\ -10$) as the $\mathrm{H{-}E}$ bond weakens ($567, 431, 366, 299\ \mathrm{kJ\,mol^{-1}}$) and the anion grows and disperses charge. Across a period, polarity governs: $\mathrm{CH_4} \ll \mathrm{NH_3} < \mathrm{H_2O} < \mathrm{HF}$. The anomaly to be able to explain is HF's weakness among the strong hydrohalic acids.

::: example Why hydrofluoric acid is weak {#ex-hf-weak}
$\mathrm{H{-}F}$ is the most polar of the hydrogen halides — so why is HF the only weak one in water?
::: solution
Dissociation is a thermodynamic race: break $\mathrm{H{-}X}$ (endothermic), attach the electron, and hydrate $\mathrm{H_3O^+}$ and $\mathrm{X^-}$ (exothermic). HF pays the higher bond bill ($567$ against $431\ \mathrm{kJ\,mol^{-1}}$ for HCl), but the extra hydration of $\mathrm{F^-}$ ($-515$ against $-363$) is $152\ \mathrm{kJ\,mol^{-1}}$ and more than cancels that $136\ \mathrm{kJ\,mol^{-1}}$ bond gap. The cycle still loses for two other reasons. Chlorine's electron affinity is higher by about $21\ \mathrm{kJ\,mol^{-1}}$ ($349$ against $328$), and undissociated HF is strongly hydrogen-bonded, so the acid that has to be taken apart is not a free HF molecule. Concentrated HF also binds $\mathrm{F^-}$ as $\mathrm{HF_2^-}$ (the symmetric three-centre bond of [[main-group/main-group-bonding]]), which makes the concentrated acid behave as a stronger acid than the dilute one. Acid strength is a cycle, not a single bond enthalpy.
:::
:::

## Oxides and hydroxides: a lifetime of an element's acidity

::: definition Acidic, amphoteric and basic oxides {#def-oxides}
An oxide is **basic** if it consumes acid ($\mathrm{MgO + 2\,H^+ \to Mg^{2+} + H_2O}$), **acidic** if it consumes base ($\mathrm{SO_3 + 2\,OH^- \to SO_4^{2-} + H_2O}$), **amphoteric** if it does both ($\mathrm{ZnO}$, $\mathrm{Al_2O_3}$, $\mathrm{PbO_2}$). The pattern is periodic: oxides become more acidic left-to-right across a period (basic $\mathrm{Na_2O}$ → amphoteric $\mathrm{Al_2O_3}$ → acidic $\mathrm{SO_3}$, $\mathrm{Cl_2O_7}$) and more acidic *up* a group and with *higher oxidation state* ($\mathrm{MnO}$ basic, $\mathrm{Mn_2O_3}$ amphoteric, $\mathrm{Mn_2O_7}$ acidic — permanganic anhydride). The mechanism is the same in both directions: a small, highly charged central cation polarises oxide ions so strongly that the oxide prefers to donate electron pairs to a base rather than accept them — high electronegativity of the formal cation makes an acidic oxide.
:::

Hydroxides follow the same rule read as $\mathrm{E{-}OH}$ versus $\mathrm{E \leftarrow OH}$: if $\mathrm{E}$ is electropositive the compound loses $\mathrm{OH^-}$ (a base, like $\mathrm{NaOH}$); if $\mathrm{E}$ is electronegative it loses $\mathrm{H^+}$ (an acid, like $\mathrm{HOCl}$); in between it does both, and that middle band — Be, Al, Zn, Sn, Pb, Cr(III) — is the amphoteric band you will meet again in qualitative analysis and in [[main-group/groups-13-14]].

## Lewis acids and bases

::: definition Lewis acids and bases {#def-lewis}
A **Lewis base** donates an electron pair to form a bond; a **Lewis acid** accepts one. Every Brønsted acid is a Lewis acid (the proton is the acceptor), but the Lewis definition reaches far beyond protons: $\mathrm{BF_3}$, $\mathrm{AlCl_3}$, $\mathrm{SiF_4}$, $\mathrm{SO_3}$, $\mathrm{Ag^+}$, and any main-group centre with an unfilled orbital or a low-lying $\sigma^*$ orbital. The adduct $\mathrm{F_3B{-}NH_3}$ is the prototype: dative, polar, and — as you now know from [[main-group/main-group-bonding]] — just the smallest case of curing an electron shortage.
:::

::: example The inverted Lewis acidity of the boron trihalides {#ex-bx3}
By inductive logic $\mathrm{BF_3}$ — with the most electronegative substituents — should be the strongest Lewis acid toward $\mathrm{NH_3}$. Experiment gives the opposite: $\mathrm{BF_3 < BCl_3 < BBr_3 < BI_3}$. Explain.
::: solution
$\mathrm{BX_3}$ is electron-deficient *and* its empty $2p$ orbital is partially filled by $\pi$ donation from the halide lone pairs — and fluorine, small and compact, is the best $\pi$ donor to boron's $2p$. $\mathrm{BF_3}$ arrives at the reaction already half-satisfied by back-donation ($\mathrm{F_2B{=}F^-}$-type resonance), and it must *give that up* to bind ammonia; $\mathrm{BI_3}$, whose $5p$–$2p$ overlap is negligible, comes hungry. The adduct-formation enthalpies differ by tens of $\mathrm{kJ\,mol^{-1}}$ in the observed direction. Moral: Lewis acidity is the *net* of σ-withdrawal and π-donation, and in the second period the π term is large enough to invert the inductive order.
:::
:::

::: example Why silicon takes six fluorides and carbon takes four {#ex-sif6}
$\mathrm{SiF_4 + 2\,F^- \to SiF_6^{2-}}$ is quantitative in solution (the basis of glass etching and of fluoride analysis); no $\mathrm{CF_6^{2-}}$ exists. Why?
::: solution
Not because silicon "has $d$ orbitals" — the argument of [[main-group/main-group-bonding]] applies: the sixth and eighth electrons go into three-centre bonding combinations spread over the whole $\mathrm{SiF_6}$ unit, and the real enablers are **size** (six fluorides crowd comfortably around the larger silicon: $\mathrm{Si{-}F}\ 168\ \mathrm{pm}$ versus $\mathrm{C{-}F}\ 135\ \mathrm{pm}$) and **electrostatics** (the diffuse negative charge of $\mathrm{SiF_6^{2-}}$ is stable; around a tiny carbon, fluoride–fluoride repulsion in a six-coordinate cage is fatal). Coordination numbers in main-group chemistry are set by radius ratios and electron counts, not by the availability of $d$ orbitals — a sentence worth memorising precisely because the old textbooks memorised the wrong one.
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
$\mathrm{Ag^+}$ is a soft acid ($4d^{10}$, polarisable); down the halide column the bases soften ($\mathrm{F^-}$ hard, $\mathrm{I^-}$ very soft). Soft–soft matching makes $\mathrm{AgI}$ strongly covalent — the extra lattice stability that Fajans' rules and the HSAB principle are two languages for — so it is the least soluble; $\mathrm{AgF}$, the mismatched pair, is the ionic, soluble one. Sodium, a hard acid, shows no such discrimination: $\mathrm{NaF}$ through $\mathrm{NaI}$ are all soluble, their differences set by ordinary lattice-versus-hydration arithmetic. Photographic fixer exploits the same soft $\mathrm{S}$-donor: thiosulfate dissolves $\mathrm{AgCl}$ and $\mathrm{AgBr}$ readily, because $K_\mathrm{sp}\beta_2$ is large. $\mathrm{AgI}$ ($K_\mathrm{sp} \sim 8\times10^{-17}$) is only marginal — $K \approx K_\mathrm{sp}\beta_2 \sim 10^{-3}$ — so the soft–soft pair is barely moved, not freely dissolved.
:::
:::

::: example Ambidentate bases: sulfite chooses {#ex-sulfite}
Sulfite $\mathrm{SO_3^{2-}}$ can bond through sulfur or through oxygen. Predict the products of (a) $\mathrm{SO_3^{2-} + H^+}$; (b) $\mathrm{SO_3^{2-} + CH_3I}$.
::: solution
(a) $\mathrm{H^+}$ is the archetypal hard acid: it takes the hard oxygen, giving $\mathrm{HSO_3^-}$ — and because O-protonation leaves the sulfur lone pair untouched, bisulfite goes on to add to carbonyl compounds *through sulfur*. (b) Methyl iodide is a soft electrophile (the polarisable $\mathrm{C{-}I}$ bond reacts at carbon through its $\sigma^*$): sulfur attacks, and the product is the methylsulfonate $\mathrm{CH_3SO_3^-}$ — S–C bonded, industrially the entry to methanesulfonic acid and its detergents. One anion, two reagents, two different atoms bonded: the HSAB principle is a *predictive* rule, and this is its classic demonstration.
:::
:::

::: warning HSAB is a ranking principle, not an energy {#warn-hsab}
"Hard prefers hard, and soft prefers soft" has no number attached: it ranks *trends within a series* (AgF versus AgI, O- versus S-donation) and it fails silently when other terms dominate — solubility also contains lattice and hydration enthalpies, kinetics also guards thermodynamic preferences ($\mathrm{AgI}$ dissolves in thiosulfate only because complex formation pays the bill), and borderline cases are genuinely borderline. Use HSAB to *choose which comparison to make*, then check the comparison against data; never to declare a reaction forbidden.
:::

## Non-aqueous solvents: acids and bases without water

::: definition Autoionisation, levelling and the solvent system {#def-autoionization}
Every polar solvent autoionises ($\mathrm{2\,H_2O \rightleftharpoons H_3O^+ + OH^-}$; $\mathrm{2\,NH_3 \rightleftharpoons NH_4^+ + NH_2^-}$; $\mathrm{2\,HF \rightleftharpoons H_2F^+ + F^-}$), and each defines its own neutral point and its own ceiling: **the strongest acid that can exist in a solvent is the solvated proton** ($\mathrm{H_3O^+}$, $\mathrm{NH_4^+}$, $\mathrm{H_2F^+}$) and **the strongest base is the solvated anion** ($\mathrm{OH^-}$, $\mathrm{NH_2^-}$, $\mathrm{F^-}$) — any stronger species is destroyed by the solvent itself (the *levelling effect*). Acids and bases stronger than the solvent's own ions are **superacids** and **superbases**, observable only in less basic media.
:::

::: example The base ladder in three solvents {#ex-levelling}
Where do $\mathrm{NaOH}$, $\mathrm{NaNH_2}$ and $\mathrm{NaH}$ sit in (a) water, (b) liquid ammonia, (c) DMSO?
::: solution
(a) In water all three are levelled to $\mathrm{OH^-}$: $\mathrm{NH_2^- + H_2O \to NH_3 + OH^-}$ ($K \sim 10^{22}$, since $38 - 15.7 = 22.3$ for $\mathrm{p}K_\mathrm{a}(\mathrm{NH_3}) \approx 38$ against water's 15.7) and $\mathrm{H^- + H_2O \to H_2 + OH^-}$ (irreversible). Water cannot tell them apart. (b) In dry liquid ammonia the equilibrium $\mathrm{OH^- + NH_3 \rightleftharpoons H_2O + NH_2^-}$ lies to the left, so $\mathrm{OH^-}$ is a weak base and is not levelled up to $\mathrm{NH_2^-}$. $\mathrm{NH_2^-}$ is the ceiling; if water is present, it is $\mathrm{NH_2^-}$ that is levelled toward $\mathrm{OH^-}$. $\mathrm{NaNH_2}$ is therefore the strong base of ammonia chemistry, and $\mathrm{NaH}$, insoluble and heterogeneous, is used when a surface base is wanted. (c) In aprotic DMSO neither $\mathrm{OH^-}$ nor $\mathrm{NH_2^-}$ is levelled by solvent protons, and intrinsic basicities reappear: hydroxide becomes a superb nucleophile ("DMSO enhances basicity by solvating cations but not anions"), and the scale stretches by many $\mathrm{p}K_\mathrm{a}$ units. The same base is three different reagents in three beakers.
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
Arrhenius defined acids as hydroxyl compounds that give $\mathrm{H^+}$ in water (1884) — a definition that explained aqueous neutralisation and immediately failed on ammonia and on anhydrous chemistry. In 1923, in two independent papers, Brønsted and Lowry made the proton the carrier and conjugate pairs the grammar, and in the same year Gilbert Lewis, in a monograph on valence, proposed the electron-pair definition that his 1938 *Chemical Reviews* survey made famous. Pauling's oxoacid rules (1929) turned acid strength into structure arithmetic; the solvent-system chemistry of liquid ammonia and anhydrous hydrogen fluoride was worked out by Franklin (from 1900), by Cady and the Jander school through the 1930s; and in 1963 Ralph Pearson's *JACS* paper on hard and soft acids and bases gave chemists their first quantitative-feeling selectivity rule since the electronegativity scale. George Olah's superacid chemistry of the 1960s–70s — protonating alkanes, observing carbocations directly — won the 1994 Nobel Prize and proved that the levelling effect is a statement about solvents, not about acids.
:::

::: summary
- Oxoacid strength is conjugate-base stabilisation: Pauling's rules ($\mathrm{p}K_\mathrm{a1} \approx 8 - 5p$, spacings of 5) read it off the structure $\mathrm{O_pE(OH)_q}$, and only OH protons count.
- Binary-acid strength rises down a group (bond weakening dominates) and across a period (polarity dominates); HF is weak because chlorine's higher electron affinity and the hydrogen bonding of undissociated HF outweigh the extra hydration of $\mathrm{F^-}$.
- Oxide acidity grows with the electronegativity and oxidation state of the central atom; the amphoteric band sits between the metal and non-metal oxides.
- Lewis acidity is electron-pair acceptance; competing π-donation can invert inductive expectations (the $\mathrm{BX_3}$ order), and coordination numbers are set by size and electrostatics, not $d$ orbitals.
- Hard–hard attraction is electrostatic, soft–soft covalent; the HSAB principle predicts solubility trends (AgI), reaction sites (sulfite S versus O) and the transferability of mismatched pairs.
- Solvents level: the strongest acid and base in any medium are its own autoionisation ions, so the same reagent changes strength with the solvent — and superacids exist only where the ceiling is higher.
:::

## Exercises

::: exercise Pauling predictions {level=1}
Predict $\mathrm{p}K_\mathrm{a1}$ for $\mathrm{H_3AsO_4}$ ($\mathrm{OAs(OH)_3}$) and for $\mathrm{HBrO_4}$ ($\mathrm{HOBrO_3}$), and state what each prediction means experimentally.
::: solution
$\mathrm{H_3AsO_4}$: $p = 1$, predicted 3 — a weak acid, observed 2.2, and triprotic with spacings near 5 (observed 2.2, 6.9, 11.5). $\mathrm{HBrO_4}$: $p = 3$, predicted $-7$ — fully dissociated. The acid is perbromic acid, not perchloric; its salts, the perbromates, are kinetically stubborn to prepare, which is a different story — thermodynamic strength says nothing about rate.
:::
:::

::: exercise Count the acidic hydrogens {level=1}
How many protons does each donate in water: $\mathrm{H_3PO_4}$, $\mathrm{H_3PO_2}$, $\mathrm{H_4P_2O_7}$ (pyrophosphoric, $\mathrm{(HO)_2(O)P{-}O{-}P(O)(OH)_2}$), $\mathrm{H_4P_2O_6}$ (hypophosphoric, $\mathrm{(HO)_2(O)P{-}P(O)(OH)_2}$)?
::: solution
Three, one, four, four: count $\mathrm{O{-}H}$ groups only. $\mathrm{H_3PO_2}$ is $\mathrm{H_2P(O)OH}$ (one OH); pyrophosphoric has four OH; hypophosphoric acid is $\mathrm{H_4P_2O_6}$, with four OH and no $\mathrm{P{-}H}$. ($\mathrm{H_4P_2O_5}$ is diphosphorous acid, a different molecule; a drawing $\mathrm{H_2P(O){-}P(O)H_2}$ would be $\mathrm{H_4P_2O_2}$ and would have no OH at all.) The habit to build: never answer from the formula, always from the connectivity.
:::
:::

::: exercise Hard or soft? {level=1}
Classify each acid as hard or soft: $\mathrm{Al^{3+}}$, $\mathrm{Ag^+}$, $\mathrm{Fe^{3+}}$, $\mathrm{Hg^{2+}}$, $\mathrm{BF_3}$, $\mathrm{Tl^+}$; and each base: $\mathrm{F^-}$, $\mathrm{I^-}$, $\mathrm{S^{2-}}$, $\mathrm{PO_4^{3-}}$, $\mathrm{CO}$.
::: solution
Hard acids: $\mathrm{Al^{3+}}$, $\mathrm{Fe^{3+}}$ (small, high charge), $\mathrm{BF_3}$ (hard through its fluorines). Soft: $\mathrm{Ag^+}$, $\mathrm{Hg^{2+}}$, $\mathrm{Tl^+}$ (large, $d^{10}$, polarisable). Hard bases: $\mathrm{F^-}$, $\mathrm{PO_4^{3-}}$ (charge on small O/F). Soft: $\mathrm{I^-}$, $\mathrm{S^{2-}}$, $\mathrm{CO}$ (polarisable; CO binds through carbon to soft metals — the carbonyls of Ni and Fe, not of Mg).
:::
:::

::: exercise The boric acid trick {level=2}
Boric acid is $\mathrm{B(OH)_3}$ — a molecule full of $\mathrm{O{-}H}$ bonds, yet none of them is donated as $\mathrm{H^+}$ in the ordinary way; instead it titrates sharply with base and has $\mathrm{p}K_\mathrm{a} = 9.24$. Write the equilibrium and explain why adding mannitol strengthens it by several $\mathrm{p}K_\mathrm{a}$ units.
::: solution
$\mathrm{B(OH)_3 + 2\,H_2O \rightleftharpoons B(OH)_4^- + H_3O^+}$: it is a Lewis acid consuming hydroxide, and the "acidity" is the price of that reaction. Mannitol's two adjacent OH groups chelate the tetrahedral boron, forming a stable cyclic boronate ester; Le Chatelier pulls the equilibrium right, the effective hydroxide affinity rises, and the apparent $\mathrm{p}K_\mathrm{a}$ falls to about 5–6 — which is exactly why mannitol is added before titrating boric acid with standard base. Lewis acidity, complex formation and analytical practice in one equilibrium.
:::
:::

::: exercise Predict the site {level=2}
Predict, with reasoning, the site of reaction (and the product) for: (a) $\mathrm{SCN^- + H^+}$; (b) $\mathrm{SCN^- + CH_3I}$; (c) $\mathrm{NO_2^- + CH_3I}$.
::: solution
(a) $\mathrm{H^+}$ is a hard acid and the harder end of thiocyanate is nitrogen: the isolable neutral acid is the N-bonded isothiocyanic acid $\mathrm{HNCS}$ (attack at sulfur is faster but reversible, and the product isomerises). (b) Methyl iodide is a soft electrophile reacting at carbon through the $\mathrm{C{-}I}$ $\sigma^*$ orbital: sulfur attacks, and the product is the thiocyanate ester $\mathrm{CH_3SCN}$. (c) Nitrite has hard O ends and a borderline N end; with methyl iodide and ionic nitrite in polar aprotic medium N-attack predominates, giving nitromethane $\mathrm{CH_3NO_2}$, silver nitrite raises the share of the nitrite ester $\mathrm{CH_3ONO}$, but with methyl iodide the main product is still nitromethane for both sodium and silver nitrite. Oxygen alkylation becomes the main path for tertiary halides, not for $\mathrm{CH_3I}$. Counter-cation and medium shift the ratio; they do not hand methyl iodide cleanly to oxygen. That is the honest limit of HSAB: it ranks site preferences, it does not overrule mechanisms.
:::
:::

::: exercise Amphoteric zinc {level=2}
Write equations for the dissolution of $\mathrm{ZnO}$ in (a) acid and (b) base, and use the $\mathrm{E{-}OH}$/$\mathrm{E \leftarrow OH}$ scheme to explain why $\mathrm{ZnO}$ is amphoteric while $\mathrm{Na_2O}$ is only basic and $\mathrm{SO_3}$ only acidic.
::: solution
(a) $\mathrm{ZnO + 2\,H^+ \to Zn^{2+} + H_2O}$; (b) $\mathrm{ZnO + 2\,OH^- + H_2O \to [Zn(OH)_4]^{2-}}$. Zinc(II) is small and $2+$ with a $d^{10}$ shell — its electronegativity (1.65) sits mid-range, so $\mathrm{Zn{-}OH}$ is comparably willing to leave as $\mathrm{OH^-}$ or to hold on and lose $\mathrm{H^+}$ depending on the partner. Sodium is electropositive: $\mathrm{Na{-}OH}$ ionises as hydroxide, full stop. Sulfur(VI) is so electronegative that $\mathrm{O{-}S}$ bonds leave the oxide as part of an anion and any water present is deprotonated — $\mathrm{SO_3 + H_2O \to H^+ + HSO_4^-}$. Acidity of hydroxides is a continuum in the central atom's electronegativity; amphoterism is the middle.
:::
:::

::: exercise Deriving Pauling's second rule {level=3}
The second ionisation of a diprotic oxoacid is about five $\mathrm{p}K_\mathrm{a}$ units harder. Model the extra cost as the Coulomb repulsion between the first negative charge and the second, separated by $r \approx 3\ \mathrm{\AA}$ in a medium of effective relative permittivity $\varepsilon_\mathrm{eff}$, and estimate $\varepsilon_\mathrm{eff}$.
::: solution
Five $\mathrm{p}K_\mathrm{a}$ units at $298\ \mathrm{K}$ are $\Delta\Delta G = 5 \times 5.71 = 28.6\ \mathrm{kJ\,mol^{-1}}$. The point-charge repulsion is $E = e^2/(4\pi\varepsilon_0 \varepsilon_\mathrm{eff} r)$; with $e^2/4\pi\varepsilon_0 = 1.389\times10^{5}\ \mathrm{kJ\,pm\,mol^{-1}}$ and $r = 300\ \mathrm{pm}$, $E = 463/\varepsilon_\mathrm{eff}\ \mathrm{kJ\,mol^{-1}}$. Setting $463/\varepsilon_\mathrm{eff} = 28.6$ gives $\varepsilon_\mathrm{eff} \approx 16$. That is a sensible effective permittivity for a charge pair at the surface of a hydrated oxoanion — partly screened by the delocalising oxo framework, partly by interfacial water — so Pauling's "+5" is, physically, one unit of charge repelling another through a low-dielectric biological-scale environment. The model also predicts the rule's failure mode: if the two charges can separate further (bridged pyrophosphates) or screen better, the spacing shrinks below 5.
:::
:::

::: exercise Design a solvent system {level=3}
You must titrate (i) a very weak base such as pyridine, and (ii) a very weak acid such as phenol, to sharp endpoints. Choose each solvent from water, glacial acetic acid, liquid ammonia and DMSO, and justify with the levelling concept.
::: solution
(i) A weak base is titrated as a base in an **acidic solvent below water's proton ceiling**: glacial acetic acid ($\mathrm{p}K_\mathrm{a} \approx 4.8$ as solvent-acid, autoionising to $\mathrm{CH_3COOH_2^+}$ and acetate) protonates pyridine far more completely than water does, so its conjugate acid appears much stronger and perchloric acid in acetic acid gives a sharp endpoint — the standard non-aqueous titration of alkaloids. (ii) A weak acid needs a **basic solvent**: liquid ammonia levels phenol's acidity upward (its $\mathrm{NH_2^-}$/solvent-proton pair is a far higher base ceiling than water's), and DMSO, which solvates cations but not anions, stretches the acid scale so that phenol ($\mathrm{p}K_\mathrm{a}\ 18$ in DMSO against 10 in water) becomes titratable with a strong base. Water is the wrong medium for both extremes because its own ions bracket everything between $\mathrm{H_3O^+}$ and $\mathrm{OH^-}$ — the levelling effect turned from nuisance into design principle.
:::
:::
