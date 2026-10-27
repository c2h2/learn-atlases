Ask an organic chemist to make a carbon–carbon bond and the first reagent that comes to mind is still the one Victor Grignard found in 1900: an alkyl or aryl halide stirred with magnesium turnings in dry ether, giving a solution that adds to aldehydes, ketones, esters, nitriles and carbon dioxide. Grignard reagents, organolithiums, organozincs, organocuprates, organoboranes and organosilanes are the **main-group organometallic reagents**, and together they let a chemist deliver a carbon nucleophile with almost any desired combination of reactivity and selectivity — from organolithiums that deprotonate benzene to boronic acids so tame that they can be weighed in air and coupled in water.

The previous chapter, [[organometallics-catalysis/organometallic-bonding]], showed that the polarity of the M–C bond falls steadily from lithium to boron and silicon. This chapter follows that single idea through the reagents. Three questions organise it: *how polar is the bond* (which sets reactivity and basicity); *what is the reagent actually like in solution* (most of these compounds are aggregates or equilibrium mixtures, and the species you write is rarely the species that reacts); and *how is a reactive reagent tamed* — by changing the metal (transmetallation), by adding a ligand, or by choosing a reagent that needs a catalyst. Because the most reactive members are pyrophoric, the chapter also explains what makes them dangerous. It builds on the carbonyl chemistry of [[organic-2/carbonyl-addition]] and the group 13 and 14 chemistry of [[main-group/groups-13-14]].

## A scale of reactivity

The M–C polarity estimated in [[organometallics-catalysis/organometallic-bonding#eq-pauling-ionic]] translates into a scale of practical reactivity:

| reagent | typical form | adds to ketones? | adds to esters? | tolerates | needs |
|---|---|---|---|---|---|
| $\mathrm{RLi}$ | aggregates $(\mathrm{RLi})_n$ | fast, $-78\,^\circ\mathrm{C}$ | yes (often twice) | almost nothing protic | inert atmosphere |
| $\mathrm{RMgX}$ | Schlenk mixture | fast | yes, twice | ethers, tertiary amines | inert atmosphere |
| $\mathrm{R_2Zn}$, $\mathrm{RZnX}$ | monomer/aggregate | slowly or with a catalyst | rarely | esters, nitriles, ketones | catalyst or Lewis acid |
| $\mathrm{R_2CuLi}$ | cuprate cluster | 1,4 to enones | slowly | ketones at low T | low temperature |
| $\mathrm{R_3B}$, $\mathrm{RB(OH)_2}$ | monomer | no | no | water, air (boronic acids), most groups | base + Pd catalyst |
| $\mathrm{R_4Si}$, $\mathrm{RSiMe_3}$ | monomer | no (unless activated) | no | nearly everything | fluoride or Lewis acid |

Reading down the table, carbanion character falls and **functional-group tolerance** rises. The skill of using these reagents is choosing the most reactive one that will not attack anything else in the molecule — or, more often today, choosing an unreactive one (zinc, boron, tin, silicon) and letting a palladium catalyst do the work ([[organometallics-catalysis/cross-coupling]]).

The basicity of an organometallic is the basicity of its carbanion. Alkanes have $\mathrm{p}K_\mathrm{a}$ values around $50$ on the extended aqueous scale, benzene about $43$, diisopropylamine about $36$, terminal alkynes about $25$, ketones about $19$–$20$ and water $15.7$ (approximate values, as tabulated in Clayden, Greeves and Warren). An alkyllithium will therefore deprotonate anything more acidic than an alkane, with an equilibrium constant of $10^{\Delta \mathrm{p}K_\mathrm{a}}$, and this is the reason organometallic reagents must be kept away from water, alcohols and even terminal alkynes unless deprotonation is the aim.

::: example Making LDA and using it {#ex-lda}
(a) Estimate the equilibrium constant for $\mathrm{BuLi + HN(}i\mathrm{Pr)_2 \rightarrow BuH + LiN(}i\mathrm{Pr)_2}$ (lithium diisopropylamide, LDA). (b) Why is LDA, rather than butyllithium, used to convert a ketone into its lithium enolate?
::: solution
(a) The proton moves from diisopropylamine ($\mathrm{p}K_\mathrm{a} \approx 36$) to the butyl anion, whose conjugate acid butane has $\mathrm{p}K_\mathrm{a} \approx 50$. For $\mathrm{HA + B^- \rightarrow A^- + HB}$, $K = K_\mathrm{a}(\mathrm{HA})/K_\mathrm{a}(\mathrm{HB}) = 10^{\mathrm{p}K_\mathrm{a}(\mathrm{HB}) - \mathrm{p}K_\mathrm{a}(\mathrm{HA})}$, so
$$
K \approx 10^{50 - 36} = 10^{14}.
$$
The reaction is quantitative (and irreversible in practice, since butane escapes as a gas).

(b) LDA is still basic enough to deprotonate a ketone completely ($K \approx 10^{36-20} = 10^{16}$), but its nitrogen is flanked by two isopropyl groups and is too hindered to add to the carbonyl carbon. Butyllithium is both a strong base and a small, powerful nucleophile, and it would add to the ketone to give a tertiary alkoxide. The combination "strong base, poor nucleophile" is exactly what [[organic-2/enols-enolates]] requires for kinetic enolate formation.
:::
:::

## Organolithium compounds: aggregation and reactivity

Organolithium compounds are made from alkyl halides and lithium metal, $\mathrm{RX + 2\,Li \rightarrow RLi + LiX}$, or by lithium–halogen exchange and deprotonation. They are not monomers. The small $\mathrm{Li^+}$ ion, with only two electrons in its valence shell and strong electrostatic attraction for the carbanion, is satisfied only when several carbanions surround it.

::: definition Aggregation state {#def-aggregation}
An organolithium compound exists in solution as **aggregates** $(\mathrm{RLi})_n$ in which each carbanion carbon bridges two or three lithium atoms by electron-deficient multicentre bonds, as in the diborane of [[main-group/groups-13-14]]. Methyllithium crystallises as a **tetramer**, a distorted cube with alternating Li and C corners (a $\mathrm{Li_4}$ tetrahedron with a methyl group capping each face). Butyllithium is a **hexamer** in hydrocarbon solvents and mainly a **tetramer** in diethyl ether; in tetrahydrofuran (THF) tetramers and dimers are in equilibrium. Donor solvents and chelating amines such as $N,N,N',N'$-tetramethylethane-1,2-diamine (TMEDA) bind to lithium, break up the aggregates, and greatly increase reactivity. The **aggregation number** $n$ is measured by cryoscopy, by $^{6}\mathrm{Li}$ and $^{13}\mathrm{C}$ NMR (the $^{13}\mathrm{C}$–$^{6}\mathrm{Li}$ coupling pattern tells how many lithium atoms each carbon touches) and by X-ray crystallography.
:::

Aggregation matters kinetically because the aggregate is usually *not* the species that reacts. If a small fraction of the reagent dissociates into a more reactive monomer or dimer, and only that fraction reacts, the rate depends on a fractional power of the total organolithium concentration.

::: proposition Fractional orders from deaggregation {#prop-deaggregation}
Suppose an organolithium is present almost entirely as the aggregate $\mathrm{A}_n = (\mathrm{RLi})_n$, in rapid equilibrium with a small concentration of a reactive monomer,
$$
(\mathrm{RLi})_n \rightleftharpoons n\,\mathrm{RLi}, \qquad K_\mathrm{d} = \frac{[\mathrm{RLi}]^n}{[(\mathrm{RLi})_n]},
$$
and that the monomer reacts with substrate S in a rate-determining step, $v = k[\mathrm{RLi}][\mathrm{S}]$. Then, with $c_\mathrm{RLi}$ the total (formal) concentration of organolithium,
$$
v = k\left(\frac{K_\mathrm{d}\, c_\mathrm{RLi}}{n}\right)^{1/n}[\mathrm{S}],
$$ {#eq-fractional-order}
so the reaction is of order $1/n$ in organolithium. More generally, if an $n$-mer is in equilibrium with a reactive $m$-mer, the order is $m/n$.
:::

::: proof
Because the monomer concentration is small, almost all the lithium is in the aggregate: $c_\mathrm{RLi} \approx n[(\mathrm{RLi})_n]$. The pre-equilibrium gives $[\mathrm{RLi}]^n = K_\mathrm{d}[(\mathrm{RLi})_n] = K_\mathrm{d}\,c_\mathrm{RLi}/n$, so $[\mathrm{RLi}] = (K_\mathrm{d} c_\mathrm{RLi}/n)^{1/n}$. Substituting into $v = k[\mathrm{RLi}][\mathrm{S}]$ gives [[#eq-fractional-order]]. For an $m$-mer, $[(\mathrm{RLi})_m]^{n} = K'\,[(\mathrm{RLi})_n]^{m}$ by the same argument, hence $[(\mathrm{RLi})_m] \propto c_\mathrm{RLi}^{m/n}$ and the order is $m/n$. The derivation holds only while the reactive species is a minor component; when it becomes the major one the order tends to 1. This is the organolithium analogue of the half-order dimer resting state of [[kinetics/homogeneous-catalysis]].
:::

::: example An order of one quarter {#ex-quarter-order}
The initial rate of addition of an organolithium to an aryl ketone in diethyl ether at $-78\,^\circ\mathrm{C}$ is measured at fixed ketone concentration:

| $c_\mathrm{RLi}\,/\,\mathrm{mol\,dm^{-3}}$ | 0.10 | 0.40 | 1.6 |
|---|---|---|---|
| relative initial rate | 1.00 | 1.41 | 2.00 |

Find the order in organolithium and interpret it.
::: solution
Between the first and last runs the concentration rises by a factor of $16$ and the rate by a factor of $2.00$:
$$
\text{order} = \frac{\ln 2.00}{\ln 16} = \frac{0.693}{2.773} = 0.250.
$$
The middle point agrees ($4^{0.25} = 1.41$). An order of $1/4$ is the signature of a **tetramer** resting state in equilibrium with a small amount of reactive **monomer** ([[#prop-deaggregation]] with $n = 4$). It does not mean a quarter of a molecule reacts. Adding TMEDA, which shifts the equilibrium towards smaller aggregates, would be expected both to speed the reaction and to raise the order towards $1$.
:::
:::

::: widget plot
f: x^(1/n); x
x: 0, 4
y: 0, 4
sliders: n=4:1:6:1
labels: \text{rate} \propto c^{1/n}\ \text{(}n\text{-mer resting state)}; \text{first order (monomer)}
caption: Relative rate against total organolithium concentration (both in arbitrary units) when an $n$-mer is the resting state and a monomer reacts, compared with a first-order reaction. Move $n$ from 1 to 6: the larger the aggregate, the flatter the curve, and above unit concentration a fourfold or sixfold increase in reagent buys only a modest increase in rate. Practical consequence: adding more butyllithium is an inefficient way to speed a sluggish reaction; adding a deaggregating donor (THF, TMEDA) is far more effective.
:::

## Grignard reagents and the Schlenk equilibrium

A Grignard reagent forms on the surface of magnesium metal. Electron transfer from the metal to the carbon–halogen $\sigma^*$ orbital breaks the C–X bond to give an alkyl radical and a surface-bound halide; the radical recombines with surface magnesium(I) to give $\mathrm{RMgX}$, solvated by two ether molecules. (The radical intermediate is why cyclising radical "clocks" such as the hex-5-enyl group partly rearrange during Grignard formation.) In solution, however, the formula $\mathrm{RMgX}$ describes only one member of an equilibrium mixture.

::: definition The Schlenk equilibrium {#def-schlenk}
Organomagnesium halides in ether solution redistribute their organic groups and halides,
$$
2\,\mathrm{RMgX} \rightleftharpoons \mathrm{R_2Mg} + \mathrm{MgX_2}, \qquad K_\mathrm{S} = \frac{[\mathrm{R_2Mg}][\mathrm{MgX_2}]}{[\mathrm{RMgX}]^2},
$$
where each species is solvated (and can also dimerise through halide bridges). $K_\mathrm{S}$ depends on R, X, the solvent and the temperature. Adding 1,4-dioxane precipitates $\mathrm{MgX_2(dioxane)}$ and drives the equilibrium completely to the right, which is how halide-free dialkylmagnesium solutions are made.
:::

::: proposition Speciation in the Schlenk equilibrium {#prop-schlenk}
If a solution is prepared with total magnesium concentration $c_0$ (all as $\mathrm{RMgX}$ formally) and reaches the Schlenk equilibrium with constant $K_\mathrm{S}$, the fraction of magnesium present as $\mathrm{RMgX}$ is
$$
f_\mathrm{RMgX} = \frac{1}{1 + 2\sqrt{K_\mathrm{S}}},
$$
and the fractions as $\mathrm{R_2Mg}$ and as $\mathrm{MgX_2}$ are each $\sqrt{K_\mathrm{S}}/(1 + 2\sqrt{K_\mathrm{S}})$, independent of $c_0$ (neglecting aggregation).
:::

::: proof
Let $y$ be the equilibrium concentration of $\mathrm{R_2Mg}$; by stoichiometry $[\mathrm{MgX_2}] = y$ and $[\mathrm{RMgX}] = c_0 - 2y$. Then $K_\mathrm{S} = y^2/(c_0 - 2y)^2$; both sides are squares of positive quantities, so $y/(c_0 - 2y) = \sqrt{K_\mathrm{S}}$ and
$$
y = \frac{\sqrt{K_\mathrm{S}}\,c_0}{1 + 2\sqrt{K_\mathrm{S}}}, \qquad [\mathrm{RMgX}] = c_0 - 2y = \frac{c_0}{1 + 2\sqrt{K_\mathrm{S}}}.
$$
Dividing by $c_0$ gives the fractions, and they sum to $1$. Because the reaction has the same number of molecules on each side, the concentration cancels: dilution does not shift the equilibrium. $\blacksquare$
:::

::: widget plot
f: 1/(1 + 2*sqrt(x)); sqrt(x)/(1 + 2*sqrt(x))
x: 0, 10
y: 0, 1
labels: \text{fraction of Mg as RMgX}; \text{fraction as }\mathrm{R_2Mg}\text{ (and as }\mathrm{MgX_2}\text{)}
caption: Speciation of a Grignard solution as a function of the Schlenk constant $K_\mathrm{S}$ ([[#prop-schlenk]]). At $K_\mathrm{S} = 0.25$ exactly half the magnesium is $\mathrm{RMgX}$; for a statistical redistribution of groups ($K_\mathrm{S} = 0.25$ is the value for random scrambling of R and X between magnesium centres) the "Grignard reagent" is already only half Grignard reagent. Large $K_\mathrm{S}$, favoured by more strongly coordinating solvents and bulky groups, drives the mixture towards $\mathrm{R_2Mg + MgX_2}$.
:::

The Schlenk mixture is one reason why Grignard additions have complicated kinetics, and why the same nominal reagent can behave differently in diethyl ether and THF. For synthesis the important facts are simpler. The carbanion carbon attacks the electrophilic carbonyl carbon; magnesium, a Lewis acid, coordinates the carbonyl oxygen and activates it.

::: example Triphenylmethanol from methyl benzoate {#ex-grignard}
Methyl benzoate reacts with two equivalents of phenylmagnesium bromide in ether; aqueous acid work-up gives triphenylmethanol. (a) Describe the mechanism step by step. (b) What is the theoretical yield from $5.00\ \mathrm{g}$ of methyl benzoate, and what percentage yield corresponds to $7.65\ \mathrm{g}$ of purified product? Molar masses: $\mathrm{C_8H_8O_2}$ $136.15\ \mathrm{g\,mol^{-1}}$, $\mathrm{C_{19}H_{16}O}$ $260.34\ \mathrm{g\,mol^{-1}}$.
::: solution
(a) **Step 1:** the ester carbonyl oxygen coordinates to magnesium. **Step 2:** the electron pair of the C–Mg bond of a second (or the same) $\mathrm{PhMgBr}$ attacks the carbonyl carbon; the C=O π bond breaks and its electrons move onto oxygen, giving a tetrahedral magnesium alkoxide. **Step 3:** the oxygen lone pair re-forms the C=O π bond and methoxide leaves as $\mathrm{MeOMgBr}$, giving benzophenone. Because a ketone is *more* electrophilic than an ester, it does not survive: **step 4:** a second phenyl carbanion adds to benzophenone in the same way to give the magnesium salt of triphenylmethoxide. **Step 5 (work-up):** aqueous acid protonates the alkoxide to triphenylmethanol and dissolves the magnesium salts. This is why an ester consumes two equivalents of a Grignard reagent and gives a tertiary alcohol with two identical groups ([[organic-2/carboxylic-derivatives]]).

(b) Amount of ester: $5.00/136.15 = 0.03672\ \mathrm{mol}$. One mole of ester gives one mole of alcohol, so the theoretical yield is
$$
0.03672\ \mathrm{mol} \times 260.34\ \mathrm{g\,mol^{-1}} = 9.56\ \mathrm{g},
$$
and the percentage yield is $7.65/9.56 = 80.0\,\%$. (This preparation is a standard teaching experiment, done only under supervision and after a risk assessment: diethyl ether is extremely flammable and forms explosive peroxides on storage, and the reaction must be kept free of water, which destroys the reagent.)
:::
:::

## Tamer metals: zinc, copper, and transmetallation

Zinc, copper, boron, tin and silicon reagents are usually made *from* lithium or magnesium reagents by **transmetallation**, the exchange of organic groups and halides between two metals:
$$
2\,\mathrm{RMgX} + \mathrm{ZnCl_2} \rightarrow \mathrm{R_2Zn} + 2\,\mathrm{MgXCl}, \qquad
2\,\mathrm{RLi} + \mathrm{CuI} \rightarrow \mathrm{Li[R_2Cu]} + \mathrm{LiI}.
$$
The empirical rule is that **the organic group moves to the less electropositive metal and the halide to the more electropositive one**. The driving force is mainly the formation of the more ionic metal halide (lithium and magnesium halides have large lattice and solvation energies), while the more covalent M–C bond (Zn–C, Cu–C, B–C) loses less than the ionic one gains. Transmetallation runs "downhill" from Li and Mg towards Zn, Cu, B, Sn and Si, and it is also the step that hands an organic group to palladium in a cross-coupling cycle.

**Organozinc reagents** were the first organometallics of all (Frankland's diethylzinc of 1849) and returned to prominence because they tolerate esters, nitriles and ketones. Zinc enolates formed from α-bromoesters and zinc metal add to aldehydes (the Reformatsky reaction); the zinc carbenoid $\mathrm{ICH_2ZnI}$ from diiodomethane and a zinc–copper couple adds $\mathrm{CH_2}$ stereospecifically to alkenes (the Simmons–Smith cyclopropanation, 1958); and dialkylzincs add to aldehydes only in the presence of a catalytic amino alcohol, a reaction that Ryoji Noyori made enantioselective in 1986 and which shows a remarkable *non-linear effect* because the catalyst forms dimeric zinc aggregates.

**Organocuprates**, $\mathrm{Li[R_2Cu]}$ (Gilman reagents, 1952), are soft nucleophiles. With an α,β-unsaturated ketone they add to the β-carbon (**conjugate** or 1,4-addition), whereas an organolithium adds directly to the carbonyl carbon (1,2-addition). The mechanism is thought to involve a copper(I)–alkene π-complex and oxidative addition to a copper(III) β-cuprio enolate, from which reductive elimination forms the new C–C bond — a main-group reagent behaving like a transition-metal catalyst.

::: example 1,2 versus 1,4 {#ex-cuprate}
Predict the products of cyclohex-2-en-1-one with (a) methyllithium, then aqueous work-up, and (b) lithium dimethylcuprate, then aqueous work-up. Explain the difference.
::: solution
(a) Methyllithium is a hard, highly reactive nucleophile with a strongly polarised C–Li bond. It attacks the carbon with the largest positive charge, the carbonyl carbon: the π electrons of C=O move to oxygen, giving a lithium alkoxide that is protonated on work-up to **1-methylcyclohex-2-en-1-ol** (1,2-addition, a tertiary allylic alcohol).

(b) The cuprate's Cu–C bonds are much less polar, and copper(I), a $d^{10}$ metal, binds to the C=C double bond of the enone. A methyl group is delivered to the β-carbon (C3): the C=C π electrons shift to form the enolate C=C bond and the C=O π electrons move onto oxygen, giving a lithium enolate. Aqueous work-up protonates the enolate at carbon (via the enol) to **3-methylcyclohexan-1-one** (1,4-addition). The difference is the classic contrast between charge-controlled (hard) and orbital-controlled (soft) attack; the enolate formed in (b) can also be trapped by an alkyl halide to make two C–C bonds in one operation.
:::
:::

## Organoboron compounds and hydroboration

Boron is electron-deficient: a trialkylborane $\mathrm{R_3B}$ has a vacant $p$ orbital and only six valence electrons. Its B–C bonds are nearly non-polar ([[organometallics-catalysis/organometallic-bonding#eq-pauling-ionic]] gives about 6 % ionic character), so organoboranes are not carbon nucleophiles. Their chemistry is that of a Lewis acid that can accept a nucleophile and then let one of its alkyl groups **migrate** from boron to an adjacent atom. They are made above all by **hydroboration**, the addition of a B–H bond across an alkene, discovered by Herbert C. Brown in 1956.

::: proposition Regio- and stereochemistry of hydroboration–oxidation {#prop-hydroboration}
Hydroboration of an alkene by $\mathrm{BH_3}$ (as its THF or dimethyl sulfide complex) or by a dialkylborane $\mathrm{R_2BH}$ is a concerted **syn addition**: boron and hydrogen add to the same face of the double bond, with boron on the **less substituted** carbon. Oxidation of the resulting organoborane by alkaline hydrogen peroxide replaces the C–B bond by a C–O bond with **retention of configuration**. The overall result is the *anti-Markovnikov, syn* addition of water. These are empirical regularities with a clear mechanistic origin; regioselectivity is high but not complete for $\mathrm{BH_3}$ (about 94:6 for a terminal alkyl alkene, as reported by Brown) and nearly complete for hindered boranes such as 9-borabicyclo[3.3.1]nonane (9-BBN).
:::

::: proof Mechanistic explanation
**Hydroboration.** The alkene π electrons donate into the empty $p$ orbital of boron while, in the same four-centre transition state, the B–H bonding pair moves to the alkene carbon that is not becoming bonded to boron. Because both new bonds form on one face in a single step, the addition is syn. In the transition state, electron density has flowed from the alkene to boron, leaving a partial positive charge on the carbon receiving the hydride; that charge is better stabilised on the *more substituted* carbon (as in a carbocation), so hydrogen goes there and boron goes to the less substituted, less hindered carbon. Steric repulsion between the boron's substituents and the alkene substituents reinforces the same preference, which is why bulky boranes are more selective.

**Oxidation.** The hydroperoxide anion $\mathrm{HOO^-}$, formed from $\mathrm{H_2O_2}$ and hydroxide, adds its lone pair to the empty $p$ orbital of boron, giving a tetrahedral borate. One alkyl group then migrates, with its bonding pair, from boron to the adjacent oxygen while hydroxide departs from that oxygen (the O–O bond breaks). The migrating carbon moves *with its electron pair and without inverting*, like the migrating group in a Baeyer–Villiger oxidation, so its configuration is retained. Repetition for all three groups and hydrolysis of the borate ester releases the alcohol. $\blacksquare$
:::

::: example Hydroboration of 1-methylcyclohexene {#ex-hydroboration}
Predict the product of 1-methylcyclohexene with $\mathrm{BH_3\cdot THF}$ followed by $\mathrm{H_2O_2}$ and aqueous NaOH, including its relative stereochemistry.
::: solution
Boron adds to the less substituted alkene carbon, C2, and hydrogen to C1 (the carbon carrying the methyl group), both from the same face. If boron and the new hydrogen arrive from the top face, the methyl group on C1 is pushed to the bottom face: methyl and boron end up *trans*. Oxidation replaces boron by OH with retention, so OH and $\mathrm{CH_3}$ are *trans* on adjacent carbons. The product is ***trans*-2-methylcyclohexan-1-ol**, formed as a racemate (the borane attacks both faces equally; a chiral borane such as diisopinocampheylborane would make it enantioselective). Acid-catalysed hydration of the same alkene would instead give 1-methylcyclohexan-1-ol (Markovnikov): the two methods are complementary.
:::
:::

Organoboranes undergo many other 1,2-migrations from boron to carbon, oxygen and nitrogen, but their greatest modern role is as **boronic acids** $\mathrm{RB(OH)_2}$ and esters — air- and water-stable, of low toxicity, easily purified — in the palladium-catalysed **Suzuki–Miyaura** coupling of [[organometallics-catalysis/cross-coupling]], where a base converts them into anionic boronates that transmetallate to palladium.

## Organosilicon and organotin compounds

The Si–C bond is strong (mean bond enthalpy about $311\ \mathrm{kJ\,mol^{-1}}$ in $\mathrm{Si(CH_3)_4}$) and only about 10 % ionic. Tetraalkylsilanes are as unreactive as alkanes, and organosilicon chemistry is the chemistry of what silicon does to its *neighbours*. Two effects dominate.

First, silicon forms very strong bonds to oxygen and fluorine (Si–O about $450$–$500\ \mathrm{kJ\,mol^{-1}}$, Si–F about $580\ \mathrm{kJ\,mol^{-1}}$, approximate mean values), so reactions that convert Si–C into Si–O or Si–F are strongly downhill. Fluoride ion removes silyl protecting groups and activates organosilanes for coupling; the **Peterson olefination** (1968) converts a β-hydroxyalkylsilane into an alkene by eliminating a silanol, *anti* under acid and *syn* under base, so both alkene isomers can be made from one diastereomer.

Second, a C–Si σ bond is a good electron donor by **hyperconjugation**, because it is high in energy and polarised towards carbon.

::: proposition The β-silicon effect {#prop-beta-silicon}
A silyl group stabilises a positive charge on the carbon **β** to it (two bonds away, $\mathrm{R_3Si{-}C{-}C^+}$) much more than on the α-carbon. The stabilisation is largest when the C–Si bond is aligned **parallel** to the empty $p$ orbital of the cation (antiperiplanar to a leaving group in the transition state) and nearly vanishes when the two are orthogonal. In solvolysis, a β-trimethylsilyl group held antiperiplanar to the leaving group accelerates ionisation by factors of the order of $10^{12}$ relative to hydrogen (J. B. Lambert's cyclohexyl systems).
:::

::: proof Explanation
The cation's empty $p$ orbital can accept electron density from an adjacent filled σ orbital that lies in the same plane. A C–Si bonding orbital is higher in energy than a C–H or C–C orbital (silicon is less electronegative than carbon) and has a larger coefficient on carbon, so its overlap and energy match with the empty $p$ orbital are better and the two-orbital stabilisation is larger. Overlap varies as the cosine of the dihedral angle between the C–Si bond and the $p$ orbital axis, so the stabilisation (proportional to the square of the overlap) falls as $\cos^2\theta$ and vanishes at $90^\circ$; this angular dependence is the experimental fingerprint that distinguishes hyperconjugation from an inductive effect. An α-silyl group, attached directly to the cationic carbon, cannot donate in this way and is actually slightly destabilising. $\blacksquare$
:::

::: example How large is the β-silicon effect? {#ex-beta-silicon}
Convert a rate acceleration of $10^{12}$ at $298\ \mathrm{K}$ into a difference in Gibbs energies of activation, and explain how allylsilanes exploit it.
::: solution
From transition-state theory, $k_1/k_2 = \exp(\Delta\Delta G^\ddagger/RT)$, so
$$
\Delta\Delta G^\ddagger = RT \ln 10^{12} = (8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})(27.63) = 68.5\ \mathrm{kJ\,mol^{-1}}.
$$
A transition-state stabilisation of about $68\ \mathrm{kJ\,mol^{-1}}$ is as large as many entire activation barriers. In an **allylsilane**, $\mathrm{CH_2{=}CH{-}CH_2SiMe_3}$, an electrophile E⁺ adds to the terminal carbon: the C=C π electrons attack E⁺ and the positive charge develops on the carbon β to silicon, stabilised by the parallel C–Si bond. The C–Si bonding pair then moves to form a new C=C bond, expelling $\mathrm{Me_3Si^+}$ (captured by a nucleophile). The net result is allylation of the electrophile with transposition of the double bond — the Hosomi–Sakurai reaction (1976), in which a Lewis-acid-activated aldehyde or ketone is the electrophile.
:::
:::

The silicone industry rests on the **Rochow–Müller direct process** (1940s), in which methyl chloride reacts with silicon in the presence of a copper catalyst at about $300\,^\circ\mathrm{C}$ to give mainly dichlorodimethylsilane, $\mathrm{(CH_3)_2SiCl_2}$; hydrolysis gives poly(dimethylsiloxane) chains ([[main-group/groups-13-14]]). Platinum-catalysed **hydrosilylation**, the addition of Si–H across C=C, crosslinks silicone rubbers and is one of the largest homogeneous catalytic processes by volume.

**Organotin** compounds ($\mathrm{R_4Sn}$, $\mathrm{R_3SnX}$) have weaker, more reactive Sn–C bonds and were once the default reagents for radical chemistry ($\mathrm{Bu_3SnH}$) and for Stille coupling. Trialkyltin compounds are, however, **acutely toxic and ecotoxic** (tributyltin antifouling paints devastated mollusc populations and were banned from ships' hulls by the International Maritime Organization's AFS Convention, which entered into force in 2008), and tin residues are hard to remove from products; modern practice prefers boron, silicon and zinc reagents wherever possible.

## Hazards of reactive organometallic reagents

::: warning Pyrophoric and water-reactive reagents {#warn-pyrophoric}
Several of the reagents in this chapter are among the most hazardous chemicals in a synthetic laboratory, and it is a mistake to treat them as ordinary solutions. ***tert*-Butyllithium**, neat **trialkylaluminiums** ($\mathrm{AlMe_3}$, $\mathrm{AlEt_3}$), **diethylzinc** and concentrated **alkyllithium** solutions are **pyrophoric**: they ignite spontaneously on contact with air (GHS hazard statement H250, flame pictogram GHS02), because oxidation of a polar M–C bond is fast and very exothermic and the hydrocarbon solvent or alkane released then burns. They also **react violently with water** and alcohols, liberating flammable alkanes that may ignite (H260), and they and their hydrolysis products are **corrosive** to skin and eyes (H314, GHS05). Grignard reagents and dilute butyllithium are less dramatic but still water-reactive and flammable, usually dissolved in extremely flammable ethers that can form explosive peroxides. Organotin compounds are acutely toxic. For these reasons such reagents are used only by trained workers under direct supervision, with a specific risk assessment, under an inert atmosphere in a fume cupboard, with flame-resistant laboratory coats and eye protection, away from water and incompatible materials, and with appropriate fire-fighting means at hand (water must never be used on a metal-alkyl fire). This chapter describes their chemistry; it is not a guide to handling them.
:::

::: quiz
A chemist needs to add a methyl group to the ketone carbonyl of a molecule that also contains a methyl ester. Which reagent is most likely to react selectively at the ketone at low temperature?
- [ ] methyllithium in excess at room temperature
- [ ] methylmagnesium bromide in excess under reflux
- [x] one equivalent of methylmagnesium bromide at $-78\,^\circ\mathrm{C}$, or a less reactive methyl reagent activated by a Lewis acid
- [ ] lithium dimethylcuprate
::: solution
Ketones are more electrophilic than esters, so a controlled amount of a moderately reactive reagent at low temperature can discriminate between them; an excess of a very reactive reagent at higher temperature attacks both (and adds twice to the ester, [[#ex-grignard]]). Less reactive methyl reagents (methyltitanium or cerium reagents, or organozincs with a Lewis acid) are even more selective. A cuprate does not add 1,2 to a saturated ketone efficiently; its strength is conjugate addition.
:::
:::

## Where this leads

The polar reagents of this chapter supply the organic groups that transition-metal catalysts manipulate. Transmetallation from zinc, boron, tin, silicon and magnesium to palladium is the middle step of the Negishi, Suzuki, Stille, Hiyama and Kumada couplings ([[organometallics-catalysis/cross-coupling]]); triethylaluminium and methylaluminoxane are the co-catalysts that alkylate titanium and zirconium in Ziegler–Natta and metallocene polymerisation ([[organometallics-catalysis/metathesis-polymerisation]]). The enolate and carbonyl chemistry that organolithium and Grignard reagents enable is developed in [[organic-2/enols-enolates]] and [[organic-synthesis/carbon-carbon-bonds]], and the boron and silicon chemistry connects with [[main-group/groups-13-14]].

::: history
Edward Frankland made diethylzinc in 1849 while trying to isolate the ethyl radical, and used it to add alkyl groups to other elements. Philippe Barbier showed in 1899 that magnesium could replace zinc in additions to ketones, and his student Victor Grignard published the preparation of separate organomagnesium halide solutions in 1900; Grignard shared the 1912 Nobel Prize in Chemistry with Paul Sabatier. Wilhelm Schlenk and his son Wilhelm Schlenk Jr reported the equilibrium that bears their name in 1929, and Karl Ziegler and Heinz Colonius made organolithium compounds simply from alkyl halides and lithium metal in 1930. Lithium–halogen exchange was found independently by Georg Wittig (1938) and Henry Gilman (1939), and Gilman's lithium dialkylcuprates appeared in 1952. Eugene Rochow and, independently, Richard Müller discovered the direct process for methylchlorosilanes in the 1940s; Herbert C. Brown and B. C. Subba Rao described hydroboration in 1956, and Brown shared the 1979 Nobel Prize with Georg Wittig. Howard Simmons and Ronald Smith published their cyclopropanation in 1958, Donald Peterson his olefination in 1968, and Akira Hosomi and Hideki Sakurai the allylsilane reaction in 1976.
:::

::: summary
- Main-group M–C bonds are polarised towards carbon; reactivity, basicity and air- and water-sensitivity fall from Li and Mg through Zn and Cu to B, Sn and Si, while functional-group tolerance rises.
- Organolithiums are aggregates (MeLi tetramer; BuLi hexamer in hydrocarbons, tetramer in ether); when a minor deaggregated species reacts, the order in organolithium is fractional, $1/n$ or $m/n$.
- Grignard solutions are Schlenk mixtures $2\,\mathrm{RMgX} \rightleftharpoons \mathrm{R_2Mg + MgX_2}$; the fraction of RMgX is $1/(1 + 2\sqrt{K_\mathrm{S}})$, independent of concentration.
- Transmetallation moves organic groups towards the less electropositive metal; zinc and copper reagents are milder and more selective, and cuprates add 1,4 to enones.
- Hydroboration–oxidation is a syn, anti-Markovnikov hydration with retention at carbon; boronic acids are the stable partners of Suzuki coupling.
- Silicon stabilises β-carbocations by hyperconjugation (up to $\sim 10^{12}$ in rate, $\sim 68\ \mathrm{kJ\,mol^{-1}}$), the basis of allylsilane chemistry; strong Si–O and Si–F bonds drive Peterson eliminations and fluoride activation.
- t-BuLi, trialkylaluminiums and diethylzinc are pyrophoric and water-reactive (H250, H260, H314); organotins are toxic. They are handled only with training, supervision and a risk assessment.
:::

## Exercises

::: exercise Hexamer kinetics {level=1 check="1.59"}
A reaction of butyllithium in hexane shows an order of $1/6$ in butyllithium. By what factor does the initial rate increase when the butyllithium concentration is raised sixteenfold? (Enter the factor to three significant figures.)
::: solution
The rate is proportional to $c^{1/6}$, so the factor is $16^{1/6} = 1.59$. A hexameric resting state (as in hydrocarbon solvents) with a reactive monomer makes the rate remarkably insensitive to the amount of reagent.
:::
:::

::: exercise A Grignard yield {level=1 check="6.80"}
Acetone ($2.90\ \mathrm{g}$, $M = 58.08\ \mathrm{g\,mol^{-1}}$) reacts with an excess of phenylmagnesium bromide, and acidic work-up gives 2-phenylpropan-2-ol ($M = 136.19\ \mathrm{g\,mol^{-1}}$). What is the theoretical yield? (Enter the mass in grams.)
::: solution
$n(\text{acetone}) = 2.90/58.08 = 0.04993\ \mathrm{mol}$; one phenyl group adds to the ketone, so $n(\text{product}) = 0.04993\ \mathrm{mol}$ and the theoretical mass is $0.04993 \times 136.19 = 6.80\ \mathrm{g}$. A ketone takes one equivalent, an ester two.
:::
:::

::: exercise Deprotonating an alkyne {level=1 check="18"}
Phenyllithium (conjugate acid benzene, $\mathrm{p}K_\mathrm{a} \approx 43$) is added to a terminal alkyne ($\mathrm{p}K_\mathrm{a} \approx 25$). Estimate $\log_{10} K$ for the proton transfer. (Enter $\log_{10} K$.)
::: solution
$\log_{10} K = \mathrm{p}K_\mathrm{a}(\text{benzene}) - \mathrm{p}K_\mathrm{a}(\text{alkyne}) = 43 - 25 = 18$. The alkyne is deprotonated completely to a lithium acetylide, a useful nucleophile in its own right. (Approximate $\mathrm{p}K_\mathrm{a}$ values; the conclusion is insensitive to the exact numbers.)
:::
:::

::: exercise Schlenk speciation {level=2 check="0.333"}
For a Grignard reagent in THF with $K_\mathrm{S} = 1.0$, what fraction of the magnesium is present as $\mathrm{RMgX}$? (Enter the fraction to three significant figures.)
::: solution
From [[#prop-schlenk]], $f_\mathrm{RMgX} = 1/(1 + 2\sqrt{1.0}) = 1/3 = 0.333$; a third each is $\mathrm{R_2Mg}$ and $\mathrm{MgX_2}$. The answer does not depend on the total concentration.
:::
:::

::: exercise Selectivity of a hindered borane {level=2 check="11.4"}
A hindered dialkylborane hydroborates a terminal alkene with 99:1 regioselectivity at $298\ \mathrm{K}$. Assuming both regiochemistries come from the same ground state, what is the difference in Gibbs energies of activation between the two pathways? (Enter $\Delta\Delta G^\ddagger$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
The product ratio equals the ratio of rate constants: $\Delta\Delta G^\ddagger = RT\ln 99 = (8.314)(298.15)(4.595)\ \mathrm{J\,mol^{-1}} = 11.4\ \mathrm{kJ\,mol^{-1}}$. For comparison, $\mathrm{BH_3}$'s 94:6 corresponds to only $6.8\ \mathrm{kJ\,mol^{-1}}$: modest energy differences make large selectivity differences, because selectivity is exponential in $\Delta\Delta G^\ddagger$.
:::
:::

::: exercise Choose a reagent {level=2}
For each transformation choose a suitable organometallic reagent and give the product: (a) cyclohexanone to 1-butylcyclohexan-1-ol; (b) cyclohex-2-en-1-one to 3-butylcyclohexan-1-one; (c) oct-1-ene to octan-1-ol; (d) benzaldehyde to 1-phenylbut-3-en-1-ol without using a Grignard reagent.
::: solution
(a) Butylmagnesium bromide or butyllithium, 1,2-addition, then aqueous work-up. (b) Lithium dibutylcuprate (or catalytic copper with $\mathrm{BuMgBr}$): conjugate addition to the β-carbon, then protonation of the enolate. (c) Hydroboration with $\mathrm{BH_3\cdot THF}$ or 9-BBN, then $\mathrm{H_2O_2/NaOH}$: boron and then OH on the terminal carbon (anti-Markovnikov). (d) Allyltrimethylsilane with a Lewis acid such as $\mathrm{TiCl_4}$ (Hosomi–Sakurai): the aldehyde, activated by the Lewis acid, is attacked by the terminal carbon of the allylsilane; the β-silyl cation loses $\mathrm{Me_3Si^+}$, and work-up gives the homoallylic alcohol $\mathrm{PhCH(OH)CH_2CH{=}CH_2}$.
:::
:::

::: exercise A dimer from a tetramer {level=3 check="1.41"}
In THF an organolithium exists mainly as a tetramer, $\mathrm{A_4}$, in rapid equilibrium with a small amount of dimer $\mathrm{A_2}$, $\mathrm{A_4 \rightleftharpoons 2\,A_2}$, and only the dimer reacts with an electrophile E in the rate-determining step. (a) Derive the rate law in terms of the total organolithium concentration $c$. (b) By what factor does the rate rise when $c$ is doubled? (Enter the factor to three significant figures.)
::: hint
Write $K = [\mathrm{A_2}]^2/[\mathrm{A_4}]$ and $c \approx 4[\mathrm{A_4}]$.
:::
::: solution
(a) With most of the lithium in the tetramer, $[\mathrm{A_4}] \approx c/4$. The pre-equilibrium gives $[\mathrm{A_2}] = (K[\mathrm{A_4}])^{1/2} = (Kc/4)^{1/2}$, and
$$
v = k[\mathrm{A_2}][\mathrm{E}] = k\left(\frac{Kc}{4}\right)^{1/2}[\mathrm{E}],
$$
half order in total organolithium (the $m/n = 2/4$ case of [[#prop-deaggregation]]). (b) $2^{1/2} = 1.41$. Note that a quarter-order and a half-order law would both be "fractional"; the exact value distinguishes a monomer from a dimer as the reactive species, which is why such kinetic measurements, combined with $^{6}\mathrm{Li}$ NMR of the aggregates, are central to the study of organolithium mechanisms.
:::
:::

::: exercise Stereochemistry of the Peterson olefination {level=3}
A single diastereomer of the β-hydroxysilane $\mathrm{Me_3Si{-}CH(R^1){-}CH(OH){-}R^2}$ is divided into two portions. One is treated with acid, the other with potassium hydride (a base). The two portions give opposite alkene isomers, (*E*) and (*Z*). Explain mechanistically, describing each step in words, why acid and base give opposite stereochemistry.
::: hint
Under base the alkoxide attacks silicon intramolecularly; under acid the hydroxyl leaves as water. Think about which geometry each step requires.
:::
::: solution
**Base (syn elimination).** Potassium hydride removes the O–H proton to give a potassium alkoxide. The alkoxide oxygen's lone pair attacks the adjacent silicon atom, forming a four-membered ring containing Si, C, C and O (a 1,2-oxasiletanide, with five-coordinate silicon). This ring can form only when O and Si are **syn** (on the same side, roughly eclipsed) about the C–C bond. The ring then collapses: the C–Si and C–O bonds break together, the C–Si bonding electrons form the new C=C π bond, and $\mathrm{Me_3SiO^-}$ leaves. Because O and Si departed from the same side, the elimination is syn.

**Acid (anti elimination).** Acid protonates the hydroxyl group, turning it into a good leaving group ($\mathrm{H_2O}$). The C–Si bond, acting as a hyperconjugative donor ([[#prop-beta-silicon]]), pushes its electrons into the C–O σ* orbital as water leaves; this requires the C–Si bond to be **antiperiplanar** to the C–O bond. The C–Si electrons form the C=C π bond and $\mathrm{Me_3Si^+}$ is captured by water or the counter-ion. The elimination is anti.

For a given diastereomer, the syn-periplanar and anti-periplanar conformations place $\mathrm{R^1}$ and $\mathrm{R^2}$ on the same side in one case and on opposite sides in the other, so the two conditions give opposite alkene geometries. The Peterson reaction is thus a stereodivergent route to either alkene from one precursor, and the strength of the Si–O bond formed in the base pathway is its thermodynamic driving force.
:::
:::
