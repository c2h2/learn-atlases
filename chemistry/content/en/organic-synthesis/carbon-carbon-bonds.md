The carbon skeleton is what makes a molecule what it is. Functional groups can be interconverted, protected and adjusted in oxidation level ([[organic-synthesis/redox-in-synthesis]], [[organic-synthesis/protecting-groups]]), but sooner or later every synthesis must join carbon to carbon — and the choice of which bonds to form, and by what reaction, decides the shape of the whole route. In the language of [[organic-synthesis/retrosynthesis]], each C–C disconnection produces a nucleophilic and an electrophilic synthon, and our task is to find reliable synthetic equivalents for both, compatible with everything else in the molecule.

This chapter organises the main C–C bond-forming reactions by the kind of nucleophile they use. **Organometallic reagents** (organolithium, Grignard, organocerium and organocopper compounds) add to carbonyl groups and enones, with a balance between 1,2- and 1,4-addition that we can control. **Phosphorus and sulfur ylides and carbanions** turn carbonyl groups into alkenes (the Wittig and Horner–Wadsworth–Emmons reactions) or epoxides. **Enolates, enols and enamines** — the nucleophiles of [[organic-2/enols-enolates]] and [[organic-2/condensations]] — are alkylated, acylated and added to aldehydes and Michael acceptors, and we must control which enolate forms. Finally, **transition-metal cross-coupling** joins $sp^2$ carbons that classical polar chemistry cannot easily connect; its mechanism is developed in [[organometallics-catalysis/cross-coupling]] and alkene metathesis in [[organometallics-catalysis/metathesis-polymerisation]], so here we treat both as strategic tools.

## Organometallic nucleophiles {#sec-organometallic}

Organolithium and Grignard reagents ([[organometallics-catalysis/main-group-organometallics]]) are the most direct synthetic equivalents of carbanions. They add rapidly and irreversibly to aldehydes and ketones (giving secondary and tertiary alcohols), to esters (twice, giving tertiary alcohols), to nitriles (once, giving ketones after hydrolysis of the imine), to epoxides (at the less hindered carbon) and to carbon dioxide (giving carboxylic acids). Their limitations come from the same reactivity: they are strong bases, destroyed by any O–H, N–H or acidic C–H, and they enolise hindered or acidic ketones instead of adding to them.

Three modifications extend their range:

- **Organocerium reagents**, made by transmetallation of an organolithium with anhydrous cerium(III) chloride (Tsuneo Imamoto, 1980s), are much less basic but still nucleophilic, and add cleanly to easily enolised ketones.
- **Weinreb amides**, $N$-methoxy-$N$-methylamides (Steven Nahm and Steven Weinreb, 1981), react with exactly one equivalent of an organometallic to give ketones, solving the over-addition problem of esters.
- **Organocuprates**, $\mathrm{R_2CuLi}$ (Henry Gilman's reagents), add to the β-carbon of α,β-unsaturated carbonyl compounds rather than to the carbonyl carbon.

::: example A ketone from a Weinreb amide {#ex-weinreb}
Make 1-phenylbutan-1-one (butyrophenone) from $N$-methoxy-$N$-methylbenzamide and explain why the reaction stops at the ketone, whereas methyl benzoate with propylmagnesium bromide gives a tertiary alcohol.
::: solution
**Reaction.** $\mathrm{PhCON(OMe)Me}$ + $\mathrm{CH_3CH_2CH_2MgBr}$ (about one equivalent) in THF at 0 °C, then aqueous acid: $\mathrm{PhCOCH_2CH_2CH_3}$.

**Mechanism.** The C–Mg bond electrons attack the amide carbonyl carbon and the C=O π electrons move onto oxygen, giving a tetrahedral alkoxide. Magnesium binds both this alkoxide oxygen and the N-methoxy oxygen in a **five-membered chelate**. The chelate is stable at the reaction temperature: the alkoxide cannot push its electrons back to expel $\mathrm{^-N(OMe)Me}$ while magnesium holds it, so no ketone exists in the flask while organometallic reagent is present. On aqueous work-up the chelate is protonated, and the neutral tetrahedral intermediate collapses — the O–H oxygen's lone pair re-forms C=O and $\mathrm{HN(OMe)Me}$ leaves — releasing the ketone after the Grignard reagent has been destroyed.

**Ester comparison.** With methyl benzoate the tetrahedral intermediate collapses at once (methoxide is a good leaving group and there is no chelate), giving butyrophenone *in the presence of* Grignard reagent. The ketone is more electrophilic than the ester, so it is attacked faster than the remaining ester, and the product is 4-phenylheptan-4-ol.
:::
:::

### 1,2- versus 1,4-addition

An α,β-unsaturated carbonyl compound has two electrophilic sites: the carbonyl carbon (1,2-addition) and the β-carbon (1,4- or conjugate addition, [[organic-2/conjugation]]).

::: proposition Regioselectivity of additions to enones (empirical) {#prop-12-14}
Nucleophiles that add **irreversibly** and are **hard** — small, highly charged, with their reactivity dominated by charge (organolithiums, Grignard reagents, lithium aluminium hydride) — usually attack the carbonyl carbon of an enone (1,2-addition, kinetic control), which carries the larger positive charge. **Soft** nucleophiles — polarisable, with reactivity governed by orbital overlap (organocuprates, thiolates, enolates of 1,3-dicarbonyl compounds, enamines) — and nucleophiles that add **reversibly** (cyanide, amines, stabilised enolates under equilibrating conditions) give mainly 1,4-addition, either because the β-carbon has the larger LUMO coefficient or because the 1,4-adduct, which keeps the strong C=O bond, is thermodynamically favoured. The rule is empirical; steric hindrance at either site, Lewis acids and solvent can change the outcome.
:::

::: example Methyl lithium or dimethylcuprate? {#ex-cuprate}
Predict the products of cyclohex-2-en-1-one with (a) methyllithium, then aqueous work-up; (b) lithium dimethylcuprate, then aqueous work-up; (c) lithium dimethylcuprate, then allyl bromide.
::: solution
(a) **1,2-Addition**: the C–Li electrons attack the carbonyl carbon, the π electrons going to oxygen; work-up protonates the alkoxide: **1-methylcyclohex-2-en-1-ol**.

(b) **1,4-Addition**: the cuprate's copper(I) coordinates the C=C, and a methyl group is delivered to the β-carbon (C3) — mechanistically via a copper(III) intermediate that undergoes reductive elimination. The C=C π electrons move to form the C2=C1 enolate, its negative charge on oxygen. Protonation of the lithium enolate on carbon during work-up gives **3-methylcyclohexan-1-one**.

(c) The lithium enolate formed in (b) is itself a nucleophile, generated regiospecifically at C2. Instead of protonating it, add an electrophile: the enolate's C2 attacks the allylic carbon of allyl bromide ($\mathrm{S_N2}$), displacing bromide. The product is **2-allyl-3-methylcyclohexan-1-one**, mainly as the *trans* isomer, because the allyl bromide approaches the enolate face opposite to the newly introduced methyl group. This "conjugate addition–enolate trapping" makes two C–C bonds in one operation and was used, for example, in Gilbert Stork's and Ryoji Noyori's three-component syntheses of prostaglandins.
:::
:::

## Olefination: making C=C from C=O {#sec-olefination}

### The Wittig reaction

Georg Wittig's reaction (1954) converts an aldehyde or ketone into an alkene using a **phosphonium ylide**, $\mathrm{Ph_3P^+{-}C^-HR}$ ($\mathrm{Ph_3P{=}CHR}$). The ylide is made from triphenylphosphine and an alkyl halide (an $\mathrm{S_N2}$ reaction giving a phosphonium salt), then deprotonated by a strong base (butyllithium, sodium hexamethyldisilazide) for simple alkyl groups, or by a mild base for ylides stabilised by a conjugated ester or ketone.

The mechanism, for lithium-free conditions, is now understood as follows. The ylide carbanion and the carbonyl carbon form a C–C bond while the carbonyl oxygen bonds to phosphorus, in a single asynchronous [2+2] cycloaddition giving a four-membered ring, the **oxaphosphetane**. The ring then fragments in a retro-[2+2] step: the P–C and C–O ring bonds break, the C–C bond becomes a C=C double bond, and the oxygen stays on phosphorus as triphenylphosphine oxide. The formation of the very strong P=O bond (well over $500\ \mathrm{kJ\,mol^{-1}}$) drives the reaction.

The **stereochemistry** depends on the ylide:

- **Non-stabilised ylides** (R = alkyl) react rapidly and irreversibly, through an early, puckered transition state in which the substituents avoid each other in a way that favours the *cis*-oxaphosphetane: they give mainly (*Z*)-alkenes, especially with aldehydes in the absence of lithium salts.
- **Stabilised ylides** (R = $\mathrm{CO_2Et}$, COR, CN) react more slowly through later transition states, and give mainly (*E*)-alkenes.
- **Semi-stabilised ylides** (R = aryl, vinyl) give mixtures.

### Horner–Wadsworth–Emmons and related reactions

The **Horner–Wadsworth–Emmons** (HWE) reaction uses the carbanion of a phosphonate ester, $\mathrm{(EtO)_2P(O)CH^-CO_2Et}$, generated with NaH or a milder base (lithium chloride with DBU, the Masamune–Roush conditions). The phosphonate carbanion is more nucleophilic than the corresponding phosphonium ylide; it adds to the aldehyde to give an alkoxide, which closes to an oxaphosphetane and fragments to the alkene and a dialkyl phosphate anion. Because the addition is reversible and the intermediates equilibrate, the **(*E*)-alkene** is formed with high selectivity. The phosphate by-product is water-soluble — a great practical advantage over triphenylphosphine oxide, which often has to be removed by chromatography. W. Clark Still and Cesare Gennari (1983) found that phosphonates with electron-poor trifluoroethoxy groups, with potassium bases and a crown ether, give (*Z*)-enoates instead, because elimination becomes faster than equilibration.

Other olefinations complete the toolkit: the **Julia–Kocieński** reaction of heteroaryl sulfones (*E*-selective), the **Peterson** elimination of β-silyl alcohols (either geometry, depending on acid or base), titanium methylidenes (Tebbe and Petasis reagents) for methylenation of esters and hindered ketones, and **alkene metathesis** ([[organometallics-catalysis/metathesis-polymerisation]]), which forms C=C bonds between two alkenes, including in rings (ring-closing metathesis) of almost any size.

::: example Two routes to ethyl cinnamate {#ex-olefination}
Ethyl (*E*)-3-phenylprop-2-enoate (ethyl cinnamate) can be made from benzaldehyde by a Wittig reaction with $\mathrm{Ph_3P{=}CHCO_2Et}$ or by an HWE reaction with triethyl phosphonoacetate and NaH. Compare the stereoselectivity, practicality and atom economy (excluding the base) of the HWE route, and compute the atom economy of the methylenation of benzaldehyde to styrene with $\mathrm{Ph_3P{=}CH_2}$. Molar masses: benzaldehyde $106.12$, triethyl phosphonoacetate $224.19$, ethyl cinnamate $176.21$, $\mathrm{Ph_3P{=}CH_2}$ $276.32$, styrene $104.15\ \mathrm{g\,mol^{-1}}$.
::: solution
**Selectivity.** Both reagents are stabilised (by the ester), so both give mainly the (*E*)-alkene; the HWE reaction is usually more selective, typically well above 90:10.

**Practicality.** The HWE by-product, sodium diethyl phosphate, washes out with water; $\mathrm{Ph_3PO}$ ($278.29\ \mathrm{g\,mol^{-1}}$) from the Wittig route is a crystalline solid that often co-elutes with products.

**Atom economy, HWE.**
$$
\text{AE} = \frac{176.21}{106.12 + 224.19} = \frac{176.21}{330.31} = 53.3\,\%.
$$
**Atom economy, Wittig methylenation.**
$$
\text{AE} = \frac{104.15}{106.12 + 276.32} = \frac{104.15}{382.44} = 27.2\,\%.
$$
Nearly three-quarters of the reactant mass of the Wittig methylenation ends up as triphenylphosphine oxide. Catalytic alternatives (metathesis, or Wittig reactions with catalytic phosphine and a silane reductant) are attractive for this reason ([[green-chemistry/green-metrics]]).
:::
:::

## Enolates: controlling where and how {#sec-enolates}

Enolates are the most versatile carbon nucleophiles: they are alkylated by alkyl halides, acylated by esters and acyl chlorides (Claisen), and add to aldehydes (aldol) and to enones (Michael). The synthetic challenges are to make **one** enolate when a ketone could give two, to stop at **mono**alkylation, to favour **C**- over **O**-alkylation, and — for aldols — to control the stereochemistry ([[organic-synthesis/stereoselective-synthesis]]).

### Kinetic and thermodynamic enolates

An unsymmetrical ketone such as 2-methylcyclohexan-1-one can be deprotonated at C2 (the more substituted α-carbon, giving the tetrasubstituted enolate) or at C6 (less substituted, giving the trisubstituted enolate).

::: definition Kinetic and thermodynamic enolates {#def-kinetic-enolate}
The **kinetic enolate** is the one formed faster — usually by removal of the more accessible, less hindered α-proton — under conditions where deprotonation is fast, complete and irreversible: a strong, bulky, non-nucleophilic base (lithium diisopropylamide, LDA, whose conjugate acid has $\mathrm{p}K_\mathrm{a} \approx 36$), a slight excess of base, low temperature ($-78\ ^\circ\mathrm{C}$) and an aprotic solvent (THF). The **thermodynamic enolate** is the more stable one — usually the more substituted, as for alkenes — and predominates under conditions that allow equilibration: a weaker base or a slight excess of ketone (which transfers protons between enolates), protic solvents, higher temperature or longer times.
:::

::: proposition Product ratio under kinetic and thermodynamic control {#prop-control}
If two products P₁ and P₂ form from a common reactant by competing irreversible steps with activation Gibbs energies differing by $\Delta\Delta G^\ddagger = \Delta G^\ddagger_2 - \Delta G^\ddagger_1$, the product ratio is
$$
\frac{[\mathrm{P_1}]}{[\mathrm{P_2}]} = \exp\!\left(\frac{\Delta\Delta G^\ddagger}{RT}\right) \quad\text{(kinetic control)}.
$$ {#eq-kinetic-ratio}
If P₁ and P₂ interconvert rapidly, the ratio is fixed by their Gibbs energy difference $\Delta G^\circ = G^\circ_2 - G^\circ_1$: $[\mathrm{P_1}]/[\mathrm{P_2}] = \exp(\Delta G^\circ/RT)$ (thermodynamic control). The fraction of P₁ is $1/(1 + e^{-\Delta/RT})$ in either case.
:::

::: proof
Under kinetic control both products form from the same reactant at rates $k_1[\mathrm{R}]$ and $k_2[\mathrm{R}]$, so $\mathrm{d}[\mathrm{P_1}]/\mathrm{d}[\mathrm{P_2}] = k_1/k_2$ at every moment and, integrating from zero, $[\mathrm{P_1}]/[\mathrm{P_2}] = k_1/k_2$. Transition-state theory, $k_i = (k_\mathrm{B}T/h)e^{-\Delta G^\ddagger_i/RT}$, gives $k_1/k_2 = e^{(\Delta G^\ddagger_2 - \Delta G^\ddagger_1)/RT}$. Under thermodynamic control the products are in equilibrium, $K = [\mathrm{P_2}]/[\mathrm{P_1}] = e^{-\Delta G^\circ/RT}$. The fraction of P₁ is $r/(1 + r)$ with $r$ the ratio, which equals $1/(1 + r^{-1})$. $\blacksquare$
:::

::: widget plot
f: 100/(1 + exp(-1000*x/(8.314*195))); 100/(1 + exp(-1000*x/(8.314*298)))
x: 0, 15
y: 50, 100
labels: T = 195\ \mathrm{K}\ (-78\,^\circ\mathrm{C}); T = 298\ \mathrm{K}\ (25\,^\circ\mathrm{C})
points: 7.46, 99; 5.45, 90
caption: Percentage of the favoured product against the free-energy difference (in $\mathrm{kJ\,mol^{-1}}$) between the competing transition states (kinetic control) or products (thermodynamic control), at $-78\ ^\circ\mathrm{C}$ and at $25\ ^\circ\mathrm{C}$ ([[#eq-kinetic-ratio]]). A 99:1 kinetic enolate ratio at $-78\ ^\circ\mathrm{C}$ needs only $\Delta\Delta G^\ddagger = 7.5\ \mathrm{kJ\,mol^{-1}}$; a 90:10 equilibrium at $25\ ^\circ\mathrm{C}$ corresponds to $5.4\ \mathrm{kJ\,mol^{-1}}$ (the marked points). Small energy differences, a few kilojoules — a fraction of a typical hydrogen bond — decide the outcome, and lowering the temperature amplifies them. The same curve describes diastereoselectivity and enantioselectivity in [[organic-synthesis/stereoselective-synthesis]].
:::

::: example Alkylating 2-methylcyclohexanone at either side {#ex-enolate-regio}
Show how 2-methylcyclohexan-1-one can be methylated (a) at C6, to give 2,6-dimethylcyclohexan-1-one, and (b) at C2, to give 2,2-dimethylcyclohexan-1-one. With LDA at $-78\ ^\circ\mathrm{C}$ the kinetic ratio of the C6 to the C2 enolate is about 99:1; under equilibrating conditions at room temperature it is about 10:90. What free-energy differences do these ratios imply?
::: solution
(a) **Kinetic enolate**: add the ketone to LDA (1.05 equivalents) in THF at $-78\ ^\circ\mathrm{C}$. The bulky amide removes a C6 proton (the $\mathrm{CH_2}$ is less hindered than the C2–H beside the methyl group): the N lone pair takes the proton, the C–H electrons form the C=C of the enolate, the C=O π electrons go onto oxygen, which binds lithium. Then iodomethane: the enolate carbon C6 attacks the methyl carbon, displacing iodide ($\mathrm{S_N2}$). Product: 2,6-dimethylcyclohexan-1-one (*cis*/*trans* mixture). From [[#eq-kinetic-ratio]], $\Delta\Delta G^\ddagger = RT\ln 99 = 8.314 \times 195.15 \times 4.595\ \mathrm{J\,mol^{-1}} = 7.5\ \mathrm{kJ\,mol^{-1}}$.

(b) **Thermodynamic enolate**: generate the enolate with a slight deficiency of base, or a weaker base at room temperature, so that unreacted ketone shuttles protons and the enolates equilibrate. The more substituted, tetrasubstituted enolate (C1=C2) predominates, $\Delta G^\circ = RT\ln 9 = 8.314 \times 298.15 \times 2.197\ \mathrm{J\,mol^{-1}} = 5.4\ \mathrm{kJ\,mol^{-1}}$. A cleaner way to use it is to trap the equilibrated enolate as its trimethylsilyl enol ether (Herbert House's method), purify that, and regenerate the specific lithium enolate with methyllithium before adding iodomethane. Alkylation at C2 gives 2,2-dimethylcyclohexan-1-one. Even under kinetic control, some polyalkylation can occur because the product ketone exchanges protons with the remaining enolate; using exactly one equivalent of a strong base and a reactive alkylating agent minimises this.
:::
:::

### Stabilised enolates and their equivalents

A 1,3-dicarbonyl compound — diethyl malonate ($\mathrm{p}K_\mathrm{a} \approx 13$ in water) or ethyl acetoacetate ($\approx 11$) — is fully deprotonated by an alkoxide, and its enolate is a soft, selective nucleophile that is mono-alkylated cleanly. After alkylation, hydrolysis and decarboxylation remove the "activating" ester. This is the **malonic ester** synthesis of carboxylic acids and the **acetoacetic ester** synthesis of methyl ketones, the synthetic equivalents of the synthons $\mathrm{^-CH_2CO_2H}$ and $\mathrm{^-CH_2COCH_3}$.

::: example A malonic ester synthesis {#ex-malonate}
Prepare 3-phenylpropanoic acid from diethyl malonate and benzyl bromide. Describe the mechanism of the decarboxylation.
::: solution
(1) Sodium ethoxide in ethanol deprotonates diethyl malonate at the central $\mathrm{CH_2}$ (the conjugate base is stabilised by both carbonyl groups). (2) The enolate carbon attacks the benzylic carbon of benzyl bromide, displacing bromide, giving diethyl benzylmalonate. (3) Aqueous hydroxide hydrolyses both esters (addition–elimination at each carbonyl); acidification gives benzylmalonic acid. (4) On heating, a **β-dicarboxylic acid decarboxylates** through a six-membered cyclic transition state: the O–H hydrogen of one carboxyl group is transferred to the carbonyl oxygen of the other; at the same time the C–C bond between the central carbon and that carboxyl carbon breaks, its electrons moving to form a C=C bond to the remaining carbonyl carbon, and carbon dioxide leaves. The product is the enol of 3-phenylpropanoic acid, which tautomerises to the acid. Overall, $\mathrm{PhCH_2Br}$ has been joined to the synthon $\mathrm{^-CH_2CO_2H}$.
:::
:::

**Enamines** (Gilbert Stork, 1954–63) are neutral enolate equivalents made from a ketone and a secondary amine; they are alkylated by reactive alkyl halides and add to Michael acceptors, and the resulting iminium ion is hydrolysed back to the ketone ([[organic-synthesis/retrosynthesis]]). **Silyl enol ethers** react with aldehydes in the presence of Lewis acids (the **Mukaiyama aldol**, 1973) and with enones (the Mukaiyama–Michael reaction), allowing crossed aldol reactions between partners that would otherwise self-condense.

## Cross-coupling as a strategic tool {#sec-coupling}

The polar reactions above join an $sp^3$ or carbonyl carbon to a nucleophile. Bonds between two $sp^2$ carbons — aryl–aryl, aryl–vinyl, vinyl–vinyl — are difficult to make that way, because aryl and vinyl halides do not undergo $\mathrm{S_N2}$ reactions. **Palladium-catalysed cross-coupling** fills this gap. Its mechanism (oxidative addition, transmetallation, reductive elimination), ligand design and kinetics are treated in [[organometallics-catalysis/cross-coupling]]; what matters for planning is:

- **The disconnection.** A biaryl, styrene, diene, aryl alkyne or aryl amine disconnects at the bond to the ring into an organic halide (or triflate) and an organometallic (boronic acid for Suzuki, organozinc for Negishi, organotin for Stille, terminal alkyne for Sonogashira, alkene for Heck, amine for Buchwald–Hartwig).
- **Functional-group tolerance.** Suzuki couplings tolerate ketones, esters, nitriles, nitro groups, free OH and NH, and water — groups that would destroy a Grignard reagent. This often removes the need for protecting groups.
- **Chemoselectivity between halides.** The order of oxidative addition, I > OTf ≈ Br ≫ Cl, allows sequential couplings on polyhalogenated rings.
- **Stereospecificity.** Vinyl halides and vinylboron reagents couple with retention of alkene geometry, so the geometry set earlier (for example by hydroboration of an alkyne) is carried into the product.
- **Regulatory and cost aspects.** Residual palladium in pharmaceuticals is limited (ICH Q3D), so couplings are often placed early, or followed by metal removal.

::: example Why a Suzuki coupling and not a Grignard {#ex-suzuki-strategy}
Plan a synthesis of 1-([1,1′-biphenyl]-4-yl)ethan-1-one (4-acetylbiphenyl). Explain why a Grignard-based biaryl synthesis would be a poor choice.
::: solution
**Disconnection.** Break the aryl–aryl bond: 4-bromoacetophenone + phenylboronic acid (or bromobenzene + 4-acetylphenylboronic acid). Forward: a Pd(0) catalyst with a phosphine ligand, aqueous potassium carbonate, an organic co-solvent, gentle heating. 4-Bromoacetophenone is a good substrate: the electron-withdrawing acetyl group accelerates oxidative addition of the C–Br bond.

**Why not a Grignard?** An aryl Grignard reagent made from 4-bromoacetophenone would attack its own ketone (or another molecule's), so the ketone would have to be protected as an acetal first, then deprotected — two extra steps. Using phenylmagnesium bromide with a 4-halophenyl ketone would also attack the ketone. Grignard-based biaryl couplings (Kumada) need a catalyst anyway and tolerate few functional groups. The Suzuki reaction tolerates the ketone, uses air-stable, low-toxicity boron reagents and needs no protection — a protecting-group-free route ([[organic-synthesis/protecting-groups]]).
:::
:::

::: algorithm Choosing a C–C bond-forming reaction {#alg-cc}
1. **Classify the bond to be made** by the hybridisation of its two carbons and the functional groups nearby (the dioxygenation pattern of [[organic-synthesis/retrosynthesis#prop-dioxygen]]).
2. **$sp^3$ next to a carbonyl (α-carbon)**: enolate alkylation (kinetic or thermodynamic, [[#def-kinetic-enolate]]), malonate/acetoacetate equivalents, enamines.
3. **Carbonyl carbon to a new group**: organometallic addition (RLi, RMgX; $\mathrm{CeCl_3}$ for enolisable ketones; Weinreb amides for ketones); aldol with a preformed enolate or silyl enol ether.
4. **β-Carbon of an enone**: cuprate or other soft nucleophile (Michael), [[#prop-12-14]]; consider trapping the resulting enolate.
5. **C=C from C=O**: Wittig (non-stabilised → *Z*), HWE (→ *E*), Still–Gennari (→ *Z* enoates), Julia–Kocieński; or metathesis from two alkenes.
6. **$sp^2$–$sp^2$ or $sp^2$–$sp$**: cross-coupling (Suzuki first choice; Negishi, Stille, Sonogashira, Heck).
7. **Rings**: intramolecular versions of all the above, Robinson annulation, Diels–Alder ([[organic-synthesis/pericyclic]]), ring-closing metathesis, radical cyclisation ([[organic-synthesis/rearrangements-radicals]]).
8. **Check compatibility** with every other group present, and prefer the option that avoids protecting groups.
:::

::: widget graph
nodes: RLi / RMgX@0,4; R2CuLi@0,3; enolate@0,2; P ylide@0,1; ArB(OH)2@0,0; aldehyde/ketone@4,4; enone β-C@4,3; alkyl halide@4,2; aryl halide@4,0
edges: RLi / RMgX-aldehyde/ketone; R2CuLi-enone β-C; R2CuLi-alkyl halide; enolate-aldehyde/ketone; enolate-enone β-C; enolate-alkyl halide; P ylide-aldehyde/ketone; ArB(OH)2-aryl halide
algorithm: none
caption: A map of reliable nucleophile–electrophile pairings for C–C bond formation. Left: carbon nucleophiles (organolithium and Grignard reagents, cuprates, enolates and their equivalents, phosphorus ylides and phosphonate anions, organoboron reagents); right: carbon electrophiles. Each edge is a dependable reaction: carbonyl addition, conjugate addition, alkylation, aldol, Michael, Wittig/HWE olefination, Suzuki coupling (with a Pd catalyst). Missing edges are as instructive as present ones: Grignard reagents add to enones mainly 1,2 and are poor at displacing alkyl halides; aryl halides do not react with enolates or Grignard reagents without a transition-metal catalyst (or a strongly activated ring). Drag the nodes to group the reactions by the bond they form.
:::

::: quiz
Which conditions favour formation of the **less substituted** (kinetic) enolate of 2-methylcyclohexan-1-one?
- [x] LDA (1.05 equivalents) in THF at −78 °C, ketone added to the base
- [ ] Sodium ethoxide in ethanol at reflux
- [ ] A slight excess of ketone over LDA, warmed to room temperature for several hours
- [ ] Potassium *tert*-butoxide in *tert*-butanol at room temperature
::: solution
Kinetic control requires rapid, irreversible, complete deprotonation by a strong hindered base at low temperature in an aprotic solvent, with no excess of ketone to shuttle protons. Ethoxide and *tert*-butoxide in their alcohols are not strong enough to deprotonate completely, and the protic solvent equilibrates the enolates; excess ketone at room temperature also allows equilibration to the more substituted (thermodynamic) enolate.
:::
:::

::: warning "Carbanion" reagents are bases first {#warn-basicity}
It is tempting to read $\mathrm{RMgBr}$ or $\mathrm{RLi}$ as "R⁻" and add it to whatever electrophile the disconnection requires. But these reagents are among the strongest bases in organic chemistry: the conjugate acids of simple alkyl anions have $\mathrm{p}K_\mathrm{a}$ values above 45. Any proton more acidic than that — an alcohol, amine, terminal alkyne, carboxylic acid, or the α-proton of an easily enolised ketone — will be removed faster than addition can occur, destroying one equivalent of reagent and often the substrate's reactivity. Before proposing an organometallic addition, list every acidic proton in the molecule; either protect it, use excess reagent knowingly (a dianion strategy), or switch to a less basic nucleophile (organocerium, organozinc, a boronic acid in a cross-coupling, a stabilised enolate).
:::

::: history
Victor Grignard discovered organomagnesium halides in 1900 (Nobel Prize 1912). Henry Gilman prepared lithium dimethylcuprate in 1952, and Herbert House and Elias J. Corey and Gary Posner developed cuprates as synthetic reagents in the 1960s. Georg Wittig and Ulrich Schöllkopf reported the olefination in 1954 (Wittig shared the 1979 Nobel Prize with Herbert C. Brown); Leopold Horner (1958) and William Wadsworth and William Emmons (1961) introduced the phosphonate variant. Gilbert Stork's enamine alkylation (1954, full paper 1963), Herbert House's studies of enolate regiochemistry and silyl enol ethers (1960s), Teruaki Mukaiyama's Lewis-acid-mediated aldol of silyl enol ethers (1973) and Steven Nahm and Steven Weinreb's amides (1981) gave enolate and acyl chemistry its modern precision. Palladium cross-coupling, recognised by the 2010 Nobel Prize to Richard Heck, Ei-ichi Negishi and Akira Suzuki, and metathesis, recognised in 2005 (Yves Chauvin, Robert Grubbs, Richard Schrock), completed the modern C–C toolkit.
:::

## Where this leads

Controlling *where* bonds form is half the story; controlling their three-dimensional arrangement is the other. The aldol, alkylation and conjugate addition reactions of this chapter return in [[organic-synthesis/stereoselective-synthesis]], with the Zimmerman–Traxler model for aldol stereochemistry, chiral auxiliaries for enolate alkylation and asymmetric catalysis. Concerted C–C bond formations — the Diels–Alder reaction and the Claisen and Cope rearrangements — are the subject of [[organic-synthesis/pericyclic]], and radical C–C bond formation of [[organic-synthesis/rearrangements-radicals]]. In [[organic-synthesis/total-synthesis]] we see how the choice of key C–C disconnections shapes the strategy of an entire synthesis.

::: summary
- Organolithium and Grignard reagents add to C=O; use $\mathrm{CeCl_3}$ for enolisable ketones and Weinreb amides (stable chelated tetrahedral intermediate) to stop at ketones.
- Hard, irreversible nucleophiles add 1,2 to enones; soft ones (cuprates, stabilised enolates, thiolates) add 1,4 (empirical); cuprate addition can be followed by enolate trapping.
- Wittig: non-stabilised ylides → (*Z*)-alkenes, stabilised → (*E*); HWE → (*E*) with a water-soluble by-product; Still–Gennari → (*Z*); Wittig methylenation has an atom economy of only about 27 %.
- Kinetic enolates (LDA, −78 °C) form at the less substituted α-carbon, thermodynamic enolates at the more substituted; product ratios follow $\exp(\Delta\Delta G/RT)$, so a few kJ mol⁻¹ decide the outcome.
- Malonate, acetoacetate, enamine and silyl enol ether chemistry provide selective, mild enolate equivalents.
- Cross-coupling ([[organometallics-catalysis/cross-coupling]]) makes $sp^2$–$sp^2$ bonds with broad functional-group tolerance and often removes the need for protection.
:::

## Exercises

::: exercise Atom economy of a Wittig methylenation {level=1 check="27.2"}
Calculate the atom economy of benzaldehyde ($106.12\ \mathrm{g\,mol^{-1}}$) + $\mathrm{Ph_3P{=}CH_2}$ ($276.32\ \mathrm{g\,mol^{-1}}$) → styrene ($104.15\ \mathrm{g\,mol^{-1}}$) + $\mathrm{Ph_3PO}$. (Enter the atom economy in per cent, to three significant figures.)
::: solution
$104.15/(106.12 + 276.32) = 104.15/382.44 = 0.272 = 27.2\,\%$ ([[#ex-olefination]]).
:::
:::

::: exercise A thermodynamic enolate ratio {level=1 check="5.4"}
Two enolates equilibrate at $298.15\ \mathrm{K}$ in a 90:10 ratio. What is the Gibbs energy difference between them? (Enter it in $\mathrm{kJ\,mol^{-1}}$ to two significant figures.)
::: solution
$\Delta G^\circ = RT\ln 9 = 8.314 \times 298.15 \times 2.197\ \mathrm{J\,mol^{-1}} = 5.4\ \mathrm{kJ\,mol^{-1}}$ ([[#prop-control]]).
:::
:::

::: exercise Three nucleophiles, one enone {level=1}
Give the major product of but-3-en-2-one (methyl vinyl ketone) with (a) phenylmagnesium bromide, (b) lithium diphenylcuprate, (c) the sodium enolate of diethyl malonate (catalytic ethoxide), each followed by aqueous work-up.
::: solution
(a) 1,2-Addition: 2-phenylbut-3-en-2-ol, $\mathrm{CH_2{=}CH{-}C(OH)(CH_3)Ph}$. (b) 1,4-Addition: 4-phenylbutan-2-one, $\mathrm{PhCH_2CH_2COCH_3}$. (c) Michael addition of the soft, stabilised enolate: diethyl 2-(3-oxobutyl)propanedioate, $\mathrm{(EtO_2C)_2CH{-}CH_2CH_2COCH_3}$ ([[#prop-12-14]]).
:::
:::

::: exercise Atom economy of an HWE reaction {level=2 check="53.3"}
Calculate the atom economy, excluding the base, of benzaldehyde ($106.12$) + triethyl phosphonoacetate ($224.19$) → ethyl cinnamate ($176.21\ \mathrm{g\,mol^{-1}}$). (Enter the atom economy in per cent, to three significant figures.)
::: solution
$176.21/(106.12 + 224.19) = 176.21/330.31 = 53.3\,\%$. The by-product is diethyl phosphate (as its sodium salt once the base is included), which is water-soluble.
:::
:::

::: exercise Temperature and kinetic selectivity {level=2 check="27"}
A kinetic enolate ratio is 99:1 at $195.15\ \mathrm{K}$. Assuming $\Delta\Delta G^\ddagger$ is independent of temperature, what ratio would be obtained at $273.15\ \mathrm{K}$ (still under kinetic control)? (Enter the ratio $x$ in $x$:1, to two significant figures.)
::: solution
$\Delta\Delta G^\ddagger = RT\ln 99 = 8.314 \times 195.15 \times 4.595 = 7456\ \mathrm{J\,mol^{-1}}$. At $273.15\ \mathrm{K}$: ratio $= \exp(7456/(8.314 \times 273.15)) = \exp(3.283) = 27$, i.e. about 27:1 ($96\,\%$). Warming the deprotonation to 0 °C costs selectivity even before any equilibration sets in.
:::
:::

::: exercise An acetoacetic ester synthesis {level=2}
Prepare hexan-2-one from ethyl acetoacetate, naming the reagents and describing each step in words.
::: solution
Hexan-2-one is $\mathrm{CH_3CO{-}CH_2{-}CH_2CH_2CH_3}$: disconnecting the C3–C4 bond gives the synthon $\mathrm{^-CH_2COCH_3}$ (equivalent: the enolate of ethyl acetoacetate) and a propyl cation (equivalent: 1-bromopropane). (1) Sodium ethoxide in ethanol removes the acidic C2–H of ethyl acetoacetate, giving the stabilised enolate. (2) 1-Bromopropane: the enolate carbon attacks the $\mathrm{CH_2Br}$ carbon, displacing bromide, giving ethyl 2-acetylpentanoate. (3) Aqueous hydroxide saponifies the ester; acidification gives the β-keto acid. (4) Heating decarboxylates it through the six-membered cyclic transition state (O–H hydrogen to the ketone oxygen, C–C bond breaking, $\mathrm{CO_2}$ leaving), giving the enol of hexan-2-one, which tautomerises to the ketone.
:::
:::

::: exercise Two routes to a cinnamate {level=3}
Ethyl (*E*)-3-(4-acetylphenyl)prop-2-enoate is wanted. Propose (a) a Heck route and (b) an HWE route, identify the chemoselectivity issue in each, and say which you would choose.
::: hint
In (b), the phosphonate must choose between an aldehyde and a ketone in 4-acetylbenzaldehyde.
:::
::: solution
(a) **Heck**: 4-bromoacetophenone + ethyl acrylate, Pd(OAc)₂/phosphine, triethylamine, heat. Oxidative addition into C–Br (accelerated by the acetyl group), syn insertion of the acrylate with aryl to the terminal $\mathrm{CH_2}$, syn β-hydride elimination giving the (*E*)-cinnamate, base-assisted regeneration of Pd(0) ([[organometallics-catalysis/cross-coupling]]). The ketone is untouched; the only issue is residual palladium and the cost of the catalyst. (b) **HWE**: 4-acetylbenzaldehyde + triethyl phosphonoacetate with a mild base (LiCl/DBU, Masamune–Roush). The phosphonate anion reacts much faster with the aldehyde (less hindered, more electrophilic) than with the ketone, so the aldehyde is olefinated selectively, with high *E* selectivity; but a strong base such as NaH could enolise the methyl ketone and cause aldol side reactions, which is why the milder conditions are chosen. Both routes are good; the Heck route uses a cheaper, more available starting material, while the HWE route avoids palladium. A process chemist would decide on cost of starting materials and on metal-residue requirements.
:::
:::

::: exercise Why the Claisen condensation needs a full equivalent of base {level=3 check="5.3"}
The Claisen condensation of ethyl acetate is unfavourable at the stage of the neutral β-keto ester, but is driven to completion by deprotonation of the product (ethyl acetoacetate, $\mathrm{p}K_\mathrm{a} \approx 10.7$) by ethoxide (ethanol, $\mathrm{p}K_\mathrm{a} \approx 16$). Calculate $\log_{10}K$ for the deprotonation step, explain why a stoichiometric amount of base is needed, and predict what happens with ethyl 2-methylpropanoate, whose Claisen product has no α-hydrogen between the carbonyl groups. (Enter $\log_{10}K$ to two significant figures.)
::: solution
For $\mathrm{EtO^- + HA \rightleftharpoons EtOH + A^-}$, $\log_{10}K = \mathrm{p}K_\mathrm{a}(\mathrm{EtOH}) - \mathrm{p}K_\mathrm{a}(\mathrm{HA}) = 16 - 10.7 = 5.3$, so $K \approx 2\times10^{5}$. The condensation itself (enolate addition to the ester, loss of ethoxide) is thermodynamically uphill or roughly balanced; the final deprotonation of the doubly activated C–H pulls the whole sequence of equilibria to the product side. Because the product ends up as its enolate, each molecule consumes one equivalent of ethoxide — a catalytic amount would be used up after a few per cent conversion. Acidic work-up then gives the neutral β-keto ester. Ethyl 2-methylpropanoate would give ethyl 2,2,4-trimethyl-3-oxopentanoate, which has **no** acidic hydrogen between the carbonyl groups: nothing drives the equilibrium, and with ethoxide the reaction fails (the retro-Claisen dominates). A stronger base that deprotonates the ester completely and irreversibly (for example triphenylmethylsodium, or LDA followed by an acyl chloride) is needed instead.
:::
:::
