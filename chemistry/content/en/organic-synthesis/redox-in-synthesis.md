Methyl 4-acetylbenzoate has two carbonyl groups, a ketone and an ester. Sodium borohydride reduces the ketone and leaves the ester untouched; lithium aluminium hydride reduces both; and no common hydride reduces the ester while sparing the ketone. Oxidation poses the mirror-image problems: a primary alcohol can be taken to the aldehyde or past it to the carboxylic acid, an alkene can be epoxidised, dihydroxylated or cleaved, and a molecule with two alkenes or two alcohols needs a reagent that chooses between them. Most of the steps in a real synthesis are not carbon–carbon bond formations at all but such **adjustments of oxidation level**, and a large part of the skill of synthesis is choosing, from a crowded catalogue of oxidants and reductants, the one that does exactly what is needed and nothing else.

This chapter organises that catalogue. We begin with a bookkeeping device — the oxidation level of a carbon atom — that tells us at a glance whether a proposed functional-group interconversion ([[organic-synthesis/retrosynthesis#def-fgi]]) needs an oxidant, a reductant or neither. We then work through the main oxidations (alcohols, alkenes, ketones) and reductions (hydride reagents, catalytic hydrogenation, dissolving metals, deoxygenation), describing each mechanism step by step, and quantify the central problem of stopping at an intermediate oxidation level. Throughout, the guiding idea is **chemoselectivity**: the preferential reaction of one functional group in the presence of others.

## Oxidation levels {#sec-levels}

::: definition Oxidation level of a carbon atom {#def-level}
The **oxidation level** of a carbon atom in an organic compound is the number of its bonds to atoms more electronegative than carbon (O, N, halogens, S), counting a double bond twice and a triple bond three times. Bonds to carbon and to hydrogen do not count. In practice:

| level | examples (the carbon concerned) |
|---|---|
| 0 | alkane C–H carbon |
| 1 | alcohol, ether, alkyl halide, amine |
| 2 | aldehyde, ketone, acetal, imine, *gem*-dihalide |
| 3 | carboxylic acid, ester, amide, acyl chloride, nitrile, orthoester |
| 4 | carbon dioxide, carbonate, urea, isocyanate carbon |

Alkenes and alkynes are conventionally assigned the level of their hydration products: each carbon of an alkene shares one "level" (an alkene is at the level of an alcohol, an alkyne at that of a ketone).
:::

::: proposition Oxidation levels and the need for a redox reagent {#prop-levels}
A functional-group interconversion that keeps every carbon at the same oxidation level (ester ⇄ amide ⇄ nitrile ⇄ acid; ketone ⇄ acetal ⇄ imine; alcohol ⇄ halide ⇄ ether) can be accomplished by substitution, addition or elimination with polar, non-redox reagents. An interconversion that changes the total oxidation level of the carbon skeleton by $\Delta L$ requires an oxidant ($\Delta L > 0$) or reductant ($\Delta L < 0$) delivering $|\Delta L|$ two-electron equivalents per molecule, for example $|\Delta L|$ hydride ions.
:::

::: proof
The oxidation level is a formal count of the electrons that carbon has given up to electronegative partners, in pairs. Substitution of one heteroatom by another (O for Cl, N for O), and addition or elimination of water or alcohols across a C=X bond, replace a C–heteroatom bond by another C–heteroatom bond, so the count does not change and no electrons need to be supplied or removed. Replacing a C–heteroatom bond by a C–H bond (hydride delivery) or creating a new C–heteroatom bond in place of C–H (hydride or proton-plus-two-electron removal) changes the count by one per bond, which requires a two-electron reductant or oxidant. When a C–C bond is formed from an organometallic and a carbonyl compound (a Grignard addition), the carbonyl carbon falls by one level, and the carbon that was bonded to the electropositive metal is formally oxidised: the organometallic is itself the two-electron reductant, so no separate redox reagent appears. $\blacksquare$
:::

So the reduction of an ester ($\mathrm{RCO_2R'}$, level 3) to a primary alcohol ($\mathrm{RCH_2OH}$, level 1) needs **two** hydride equivalents; ester to aldehyde, one; nitrile to amine, two (level 3 to level 1). And a carboxylic acid to an amide needs *no* redox reagent at all, only activation. Counting levels prevents a common error in planning: proposing a "hydrolysis" or "substitution" that is in fact a reduction.

## Oxidising alcohols {#sec-alcohols}

Primary alcohols are oxidised to aldehydes and on to carboxylic acids; secondary alcohols to ketones; tertiary alcohols resist oxidation, because they have no C–H on the carbinol carbon. In almost every method, the key step is the same: the alcohol oxygen becomes attached to an electron-poor atom (Cr, S, I, N, Ru), and then a base removes the carbinol C–H proton while the electron-poor atom accepts the electron pair of the bond to oxygen — an **elimination across C–O**.

- **Chromium(VI)**: Jones reagent ($\mathrm{CrO_3}$ in aqueous sulfuric acid–acetone) takes primary alcohols to acids; pyridinium chlorochromate (PCC, Corey, 1975) in dichloromethane stops at the aldehyde, because in the absence of water no aldehyde hydrate forms to be oxidised further. Chromium(VI) compounds are toxic and carcinogenic and generate heavy-metal waste, so they have largely been replaced.
- **Activated dimethyl sulfoxide**: the **Swern oxidation** (Daniel Swern, 1978) uses DMSO activated by oxalyl chloride at $-78\ ^\circ\mathrm{C}$, then triethylamine. It is mild, metal-free and stops at the aldehyde. By-products are dimethyl sulfide (foul-smelling), carbon monoxide (toxic) and carbon dioxide, so it is run in a fume cupboard.
- **Hypervalent iodine**: **Dess–Martin periodinane** (DMP, 1983) oxidises alcohols at room temperature, in neutral conditions, often in minutes. Its precursor 2-iodoxybenzoic acid (IBX) is impact-sensitive when dry, so both are handled with care and on small scale.
- **Nitroxyl catalysis**: TEMPO (2,2,6,6-tetramethylpiperidin-1-oxyl) with sodium hypochlorite as the terminal oxidant (Anelli conditions) oxidises primary alcohols to aldehydes catalytically, and is used on industrial scale; the active oxidant is the oxoammonium cation.
- **Ruthenium**: tetrapropylammonium perruthenate (TPAP) with $N$-methylmorpholine $N$-oxide (NMO) as co-oxidant (Steven Ley and William Griffith, 1987).
- **Manganese dioxide** oxidises only **allylic and benzylic** alcohols, a valuable chemoselectivity: a saturated alcohol in the same molecule is untouched.
- **Aldehyde to acid**: the **Pinnick oxidation** (sodium chlorite, $\mathrm{NaClO_2}$, buffered, with 2-methylbut-2-ene to scavenge the hypochlorous acid by-product) converts even sensitive aldehydes into acids.

::: example The Swern oxidation, step by step {#ex-swern}
Describe the mechanism of the Swern oxidation of 3-phenylpropan-1-ol to 3-phenylpropanal and explain why the temperature must be kept low until the base is added.
::: solution
1. **Activation.** An oxygen lone pair of DMSO attacks a carbonyl carbon of oxalyl chloride; the C=O π electrons go onto oxygen and then return, expelling chloride. This gives an acyloxysulfonium ion, $\mathrm{Me_2S^+{-}O{-}CO{-}COCl}$. Chloride attacks the positively charged sulfur, the S–O bond breaks and the oxalyl fragment falls apart into $\mathrm{CO}$, $\mathrm{CO_2}$ and chloride: the product is chlorodimethylsulfonium chloride, $\mathrm{Me_2S^+Cl\ Cl^-}$.
2. **Alcohol addition.** The alcohol oxygen's lone pair attacks sulfur, displacing chloride; loss of the O–H proton gives an alkoxysulfonium ion, $\mathrm{RCH_2O{-}S^+Me_2}$.
3. **Ylide formation and elimination.** Triethylamine removes a proton from one S–methyl group (made acidic by the adjacent $\mathrm{S^+}$), giving a sulfur ylide, $\mathrm{RCH_2O{-}S^+(Me){-}CH_2^-}$. The carbanion then removes the carbinol hydrogen intramolecularly through a five-membered cyclic transition state: the C–H electrons form the new C=O π bond and the O–S bond breaks, its electrons going to sulfur. The products are the aldehyde $\mathrm{PhCH_2CH_2CHO}$ and dimethyl sulfide.

**Temperature.** The chlorosulfonium and alkoxysulfonium intermediates decompose above about $-60\ ^\circ\mathrm{C}$ (the alkoxysulfonium ion can undergo a Pummerer-type rearrangement to a methylthiomethyl ether, a by-product), so the activation and alcohol addition are done at $-78\ ^\circ\mathrm{C}$ and the mixture warmed only after the base has triggered the desired elimination. No water is present at any stage, so no aldehyde hydrate forms and over-oxidation to the acid cannot occur.
:::
:::

### Stopping at the aldehyde

Over-oxidation is a quantitative problem: the aldehyde is formed from the alcohol and consumed by further oxidation at the same time.

::: proposition The intermediate of consecutive first-order reactions {#prop-consecutive}
For $\mathrm{A} \xrightarrow{k_1} \mathrm{B} \xrightarrow{k_2} \mathrm{C}$ with pseudo-first-order rate constants $k_1 \neq k_2$ and $[\mathrm{A}]_0$ initially, $[\mathrm{B}]_0 = [\mathrm{C}]_0 = 0$,
$$
\frac{[\mathrm{B}](t)}{[\mathrm{A}]_0} = \frac{k_1}{k_2 - k_1}\left(e^{-k_1t} - e^{-k_2t}\right),
$$ {#eq-consec}
which is greatest at $t_\mathrm{max} = \ln(k_2/k_1)/(k_2 - k_1)$, where
$$
\frac{[\mathrm{B}]_\mathrm{max}}{[\mathrm{A}]_0} = r^{\,r/(1-r)}, \qquad r = \frac{k_2}{k_1}.
$$ {#eq-bmax}
:::

::: proof
$\mathrm{d}[\mathrm{A}]/\mathrm{d}t = -k_1[\mathrm{A}]$ gives $[\mathrm{A}] = [\mathrm{A}]_0e^{-k_1t}$. Then $\mathrm{d}[\mathrm{B}]/\mathrm{d}t + k_2[\mathrm{B}] = k_1[\mathrm{A}]_0e^{-k_1t}$; multiplying by the integrating factor $e^{k_2t}$ and integrating from $0$ with $[\mathrm{B}]_0 = 0$ gives [[#eq-consec]]. Setting $\mathrm{d}[\mathrm{B}]/\mathrm{d}t = 0$: $k_1e^{-k_1t} = k_2e^{-k_2t}$, so $e^{(k_2-k_1)t} = k_2/k_1$ and $t_\mathrm{max} = \ln r/(k_2 - k_1)$. At that time $e^{-k_2t} = (k_1/k_2)e^{-k_1t}$, so $[\mathrm{B}]/[\mathrm{A}]_0 = \frac{k_1}{k_2 - k_1}e^{-k_1t}(1 - k_1/k_2) = (k_1/k_2)e^{-k_1t_\mathrm{max}}$. With $k_1t_\mathrm{max} = \ln r/(r - 1)$, $e^{-k_1t_\mathrm{max}} = r^{-1/(r-1)}$, and $[\mathrm{B}]_\mathrm{max}/[\mathrm{A}]_0 = r^{-1}\,r^{-1/(r-1)} = r^{-r/(r-1)} = r^{r/(1-r)}$. $\blacksquare$
:::

::: widget plot
f: exp(-x); 1/(r - 1)*(exp(-x) - exp(-r*x)); 1 - exp(-x) - 1/(r - 1)*(exp(-x) - exp(-r*x))
x: 0, 8
y: 0, 1
sliders: r=0.1:0.02:5:0.01
labels: \text{alcohol A}; \text{aldehyde B}; \text{acid C}
caption: Fractions of alcohol, aldehyde and acid against dimensionless time $k_1t$ for consecutive oxidation ([[#eq-consec]]), with $r = k_2/k_1$ the ratio of the rate constants for over-oxidation and for the first oxidation. With $r = 0.1$ (a reagent such as PCC in dry dichloromethane, or a Swern oxidation, for which $r$ is effectively zero) the aldehyde peaks at $77\,\%$; with $r = 2$ it never exceeds $25\,\%$. Because the aldehyde hydrate formed in water is oxidised much faster than the alcohol, aqueous oxidants have large $r$ — which is why Jones reagent takes primary alcohols all the way to acids, and why aldehyde-selective methods work in the absence of water.
:::

::: example How much aldehyde? {#ex-bmax}
An aqueous oxidant oxidises a primary alcohol with $k_1$, and its aldehyde with $k_2$. Find the maximum fraction of aldehyde and the time at which it occurs when (a) $k_2 = 0.10\,k_1$ and (b) $k_2 = 10\,k_1$.
::: solution
(a) $r = 0.10$: $[\mathrm{B}]_\mathrm{max}/[\mathrm{A}]_0 = 0.10^{0.10/0.90} = 0.10^{0.1111} = 0.774$, i.e. $77\,\%$, at $k_1t_\mathrm{max} = \ln(0.10)/(0.10 - 1) = 2.56$. Stopping the reaction at the right time gives a useful yield, but some alcohol remains and some acid has formed.

(b) $r = 10$: $[\mathrm{B}]_\mathrm{max}/[\mathrm{A}]_0 = 10^{-10/9} = 0.077$, i.e. $7.7\,\%$, at $k_1t_\mathrm{max} = \ln 10/9 = 0.256$. Practically all the aldehyde is oxidised as soon as it forms: the method makes acids, not aldehydes. Selectivity for an intermediate oxidation level requires a reagent for which $k_2 \ll k_1$, and no timing can rescue a poor ratio.
:::
:::

::: widget plot
f: 100*exp(x*ln(10)*10^x/(1 - 10^x))
x: -3, 2
y: 0, 100
labels: \text{maximum aldehyde (\%)}
points: -1, 77.4; 0.30103, 25; 1, 7.74
vlines: 0
caption: The best attainable yield of the intermediate, $100\,r^{r/(1-r)}$ per cent ([[#eq-bmax]]), against $\log_{10} r$, where $r = k_2/k_1$. The marked points are $r = 0.1$ ($77\,\%$), $r = 2$ ($25\,\%$) and $r = 10$ ($7.7\,\%$); at $r = 1$ (the vertical line) the limit is $1/e = 37\,\%$. To reach $90\,\%$ you need $r$ below about $0.029$, and $99\,\%$ needs $r$ below about $0.0016$: practical aldehyde syntheses rely on reagents or conditions (anhydrous media, a reagent that cannot attack the aldehyde) for which over-oxidation is essentially switched off.
:::

## Oxidising alkenes and ketones {#sec-alkenes}

**Epoxidation.** Peroxycarboxylic acids, most commonly 3-chloroperoxybenzoic acid (mCPBA), transfer an oxygen atom to an alkene in one concerted step (the Prilezhaev reaction). In words: the alkene π electrons attack the terminal, electrophilic peroxide oxygen; simultaneously the weak O–O bond breaks, its electrons moving to form the carboxylic C=O; the former carbonyl oxygen's lone pair takes the peroxy acid's O–H proton; and the O–H bond electrons return to the oxygen being transferred, forming its second C–O bond. The cyclic "butterfly" transition state delivers both C–O bonds to the same face, so the reaction is **stereospecific**: a *cis*-alkene gives a *cis*-epoxide. The peracid is an electrophile, so electron-rich (more substituted) alkenes react faster: tetrasubstituted > trisubstituted > disubstituted > monosubstituted, and electron-poor enones need nucleophilic epoxidation (alkaline hydrogen peroxide, attacking the β-carbon first). Pure mCPBA is shock-sensitive; it is sold mixed with the acid and water for safety.

**Dihydroxylation.** Osmium tetroxide adds to alkenes in a concerted [3+2] cycloaddition giving a cyclic osmate ester, which is hydrolysed to the *syn*-1,2-diol. Because $\mathrm{OsO_4}$ is volatile and highly toxic (it can damage the cornea), it is used in catalytic amounts with a stoichiometric co-oxidant, NMO (the Upjohn procedure, 1976), which re-oxidises Os(VI) to Os(VIII). The asymmetric version (Sharpless) is in [[organic-synthesis/stereoselective-synthesis]]. *Anti*-diols come from epoxidation followed by acid-catalysed ring opening with water, which attacks from the face opposite the epoxide oxygen.

**Oxidative cleavage.** **Ozonolysis** cleaves C=C to two carbonyl groups. Ozone adds across the double bond (a 1,3-dipolar cycloaddition) to give a primary ozonide (1,2,3-trioxolane), which fragments into a carbonyl compound and a carbonyl oxide; these recombine with the opposite orientation to give the secondary ozonide (1,2,4-trioxolane). A reductive work-up (dimethyl sulfide, triphenylphosphine, zinc–acetic acid) gives aldehydes and ketones; an oxidative work-up (hydrogen peroxide) gives carboxylic acids from the aldehyde fragments; sodium borohydride gives alcohols. Ozonides and peroxidic by-products are explosive when concentrated, so ozonolyses are run cold, in solution, and the work-up is completed before evaporation. Catalytic $\mathrm{OsO_4}$ with sodium periodate (Lemieux–Johnson) achieves the same cleavage via the diol.

**Wacker oxidation.** A terminal alkene is converted into a methyl ketone by catalytic palladium(II) chloride, with copper(II) chloride and oxygen to re-oxidise palladium. Water attacks the palladium-coordinated alkene at the more substituted carbon (Markovnikov), and β-hydride elimination followed by tautomerisation gives the ketone; this is a reliable way to unmask a methyl ketone that was carried through a synthesis as an alkene ([[organic-synthesis/retrosynthesis]]).

**Baeyer–Villiger oxidation.** Peracids (or hydrogen peroxide with a Lewis acid) convert ketones into esters, cyclic ketones into lactones. Mechanism in words: the peracid's terminal O–H oxygen adds to the carbonyl carbon (acid-catalysed), the C=O π electrons going onto oxygen, giving a tetrahedral peroxy hemiacetal, the **Criegee intermediate**. Then, in the key step, one carbonyl substituent migrates from carbon to the adjacent peroxide oxygen, carrying its bonding pair, as the weak O–O bond breaks and carboxylate leaves; the oxygen of the former carbonyl pushes its lone pair in to re-form C=O. The migrating group moves with its configuration **retained**, and groups that best stabilise positive charge migrate fastest.

::: proposition Migratory aptitude in the Baeyer–Villiger reaction (empirical) {#prop-aptitude}
The group that migrates from carbon to oxygen in the Baeyer–Villiger reaction is, in approximate order of decreasing aptitude: tertiary alkyl > cyclohexyl ≈ secondary alkyl ≈ benzyl ≈ phenyl > primary alkyl > methyl. Aldehydes usually give carboxylic acids (hydrogen migrates), except electron-rich aryl aldehydes, which give formate esters (aryl migrates; the Dakin reaction). The migrating carbon keeps its configuration. The order is empirical; it reflects the ability of the migrating group to bear partial positive charge in the transition state, modified by stereoelectronic requirements (the migrating bond must be anti-periplanar to the breaking O–O bond).
:::

::: example Regiochemistry of the Baeyer–Villiger reaction {#ex-bv}
Predict the products of mCPBA with (a) 2-methylcyclohexan-1-one, (b) 1-phenylethan-1-one (acetophenone) and (c) 1-cyclohexylethan-1-one. Name each product.
::: solution
(a) The secondary ring carbon C2 (bearing the methyl) migrates in preference to the primary ring carbon C6, so oxygen is inserted between C1 and C2: **7-methyloxepan-2-one** (a seven-membered lactone with the methyl on the carbon next to the ring oxygen). Retention of configuration means that an enantiomerically pure ketone gives an enantiomerically pure lactone.

(b) Phenyl migrates rather than methyl: **phenyl acetate**, $\mathrm{CH_3CO{-}OPh}$.

(c) Secondary cyclohexyl migrates rather than methyl: **cyclohexyl acetate**, $\mathrm{CH_3CO{-}O{-}C_6H_{11}}$. Hydrolysing such an ester completes the conversion of a methyl ketone into an alcohol with retention — a useful FGI.
:::
:::

## Reductions {#sec-reductions}

### Hydride reagents

Metal hydrides deliver $\mathrm{H^-}$ to electrophilic carbon. Their selectivity follows two factors: how readily the reagent gives up hydride (Al–H bonds are more polar and reactive than B–H bonds), and whether a Lewis-acidic metal activates the carbonyl oxygen.

| reagent | reduces readily | usually inert | notes |
|---|---|---|---|
| $\mathrm{NaBH_4}$ (in MeOH, EtOH) | aldehydes, ketones, acyl chlorides | esters, acids, amides, nitriles, alkenes | four hydrides per B; mild, tolerant |
| $\mathrm{NaBH_4/CeCl_3}$ (Luche) | ketones 1,2 (also enones, 1,2) | — | gives allylic alcohols from enones |
| $\mathrm{LiAlH_4}$ (in ether, THF) | almost all polar C=O, C≡N; esters, acids, amides (to amines), epoxides | isolated alkenes | reacts violently with water and alcohols, releasing $\mathrm{H_2}$ |
| DIBAL-H, $i\mathrm{Bu_2AlH}$ | esters → aldehydes at $-78\ ^\circ\mathrm{C}$; nitriles → aldehydes | — | one hydride; Lewis-acidic Al |
| $\mathrm{LiBH_4}$ | esters, aldehydes, ketones | acids, amides | Li⁺ activates the ester |
| $\mathrm{BH_3{\cdot}THF}$ | carboxylic acids, amides; alkenes (hydroboration) | esters, nitro | electrophilic reagent: attacks electron-rich C=O |
| $\mathrm{NaBH_3CN}$, $\mathrm{NaBH(OAc)_3}$ | iminium ions (reductive amination) | aldehydes, ketones (slow at pH 6–7) | $\mathrm{NaBH_3CN}$ can release HCN with acid |
| L-Selectride, $\mathrm{LiBH(}s\mathrm{Bu)_3}$ | hindered ketones, from the less hindered face | — | bulky: axial alcohols from cyclohexanones |

The mechanism of a borohydride reduction, in words: a B–H bond of $\mathrm{BH_4^-}$ donates its electron pair (with the hydrogen) to the carbonyl carbon, forming the new C–H bond; the C=O π electrons move onto oxygen, giving an alkoxide that bonds to boron (or is protonated by the alcohol solvent). Each borohydride can deliver all four hydrides in turn. With $\mathrm{LiAlH_4}$ and an ester, the first hydride gives a tetrahedral intermediate that expels alkoxide to form the aldehyde; the aldehyde is more electrophilic than the ester and is immediately reduced by a second hydride to the primary alkoxide, so the aldehyde cannot be isolated. With DIBAL-H at $-78\ ^\circ\mathrm{C}$, the aluminium first coordinates the ester carbonyl oxygen (Lewis acid–base), then delivers its single hydride; the resulting tetrahedral aluminium hemiacetal is **stable at low temperature** and collapses to the aldehyde only on aqueous work-up, after the remaining reagent has been destroyed.

The **electrophilic** reductant borane shows the reverse selectivity. It coordinates first to the most Lewis-basic oxygen: the carboxylic acid forms an acyloxyborane with loss of $\mathrm{H_2}$, and the activated carbonyl is reduced intramolecularly. Esters, whose carbonyl oxygen is less basic, react slowly. So $\mathrm{BH_3}$ reduces an acid in the presence of an ester, while $\mathrm{LiBH_4}$ reduces the ester in the presence of the acid (as its unreactive carboxylate).

::: example A chemoselective reduction and a lactone {#ex-levulinate}
Ethyl 4-oxopentanoate (ethyl levulinate, a biomass-derived chemical) is treated with sodium borohydride in ethanol, and the crude product is warmed with a trace of acid. Predict the products. Could you reduce the ester and keep the ketone?
::: solution
$\mathrm{NaBH_4}$ reduces the ketone (level 2 → 1) and leaves the ester (level 3) alone: the product is ethyl 4-hydroxypentanoate. With acid, the new hydroxy group's oxygen attacks the ester carbonyl intramolecularly (a five-membered ring forms: the OH is on C4 and the ester carbon is C1), giving a tetrahedral intermediate that expels ethanol: **5-methyloxolan-2-one** ($\gamma$-valerolactone), a solvent and fuel additive. Reducing the ester while keeping the ketone is not possible directly — every hydride that reduces esters reduces ketones faster. The solution is to **protect** the ketone as an acetal (stable to $\mathrm{LiAlH_4}$), reduce the ester, then remove the acetal with aqueous acid ([[organic-synthesis/protecting-groups]]). This is the general rule: when the more reactive of two groups is the one you want to keep, protect it.
:::
:::

::: example Stoichiometry of a borohydride reduction {#ex-nabh4}
What is the minimum mass of sodium borohydride ($M = 37.83\ \mathrm{g\,mol^{-1}}$) needed to reduce $10.0\ \mathrm{g}$ of cyclohexanone ($98.14\ \mathrm{g\,mol^{-1}}$) to cyclohexanol? Why is more used in practice?
::: solution
Cyclohexanone: $10.0/98.14 = 0.1019\ \mathrm{mol}$, needing $0.1019\ \mathrm{mol}$ of hydride ($\Delta L = -1$, [[#prop-levels]]). Each $\mathrm{BH_4^-}$ supplies four, so $0.1019/4 = 0.02547\ \mathrm{mol}$, i.e. $0.02547 \times 37.83 = 0.964\ \mathrm{g}$. In practice 0.5–1 molar equivalent of $\mathrm{NaBH_4}$ (2–4 times the minimum) is used, because the reagent reacts slowly with the alcohol solvent (releasing hydrogen), and the later hydrides of the partly alkoxylated borohydrides transfer more slowly. The hydrogen released means the reaction must be vented and kept away from ignition sources.
:::
:::

### Catalytic hydrogenation, dissolving metals and deoxygenation

**Catalytic hydrogenation** ($\mathrm{H_2}$ with Pd/C, $\mathrm{PtO_2}$ or Raney nickel) adds hydrogen *syn* across C=C and C≡C bonds, and reduces nitro groups to amines, imines to amines, and (more slowly) aromatic rings and ketones. Its chemoselectivity is tuned by the catalyst: **Lindlar's catalyst** (Pd on calcium carbonate poisoned with lead and quinoline) stops alkynes at the *cis*-alkene; Pd/C cleaves benzylic C–O and C–N bonds (**hydrogenolysis**, used to remove benzyl protecting groups); homogeneous catalysts discriminate by steric hindrance and coordinating groups ([[organometallics-catalysis/hydrogenation-hydroformylation]]). Hydrogen gas is extremely flammable and dry Pd/C can ignite solvents, so hydrogenations are set up under inert gas with appropriate equipment.

**Dissolving-metal reductions** use alkali metals in liquid ammonia: alkynes give *trans*-alkenes (via a radical anion, protonation, a second electron and a vinyl anion that adopts the *trans* geometry), and the **Birch reduction** converts benzene rings into cyclohexa-1,4-dienes (electron-donating substituents end up on a remaining double bond, electron-withdrawing ones on an $sp^3$ carbon). These involve reactive metals and a cryogenic, toxic solvent and are carried out only with specific training and equipment.

**Deoxygenation** of a ketone or aldehyde to $\mathrm{CH_2}$ ($\Delta L = -2$): the **Wolff–Kishner** reduction (hydrazine and potassium hydroxide at high temperature, via the hydrazone, whose deprotonation and loss of $\mathrm{N_2}$ gives a carbanion that is protonated) works under strongly basic conditions; the **Clemmensen** reduction (zinc amalgam, HCl) under strongly acidic ones; and the **thioacetal–Raney nickel** method under neutral ones. Choosing between them is a chemoselectivity decision: which other groups survive base, acid or nickel?

::: algorithm Choosing a redox reagent {#alg-reagent}
1. **Write the oxidation level of every carbon** that changes ([[#def-level]]) to see what the step must do and how many equivalents are needed.
2. **List every other functional group** in the molecule and how each would respond to candidate oxidants or reductants (use the table above).
3. **Choose the mildest reagent that does the job**, preferring catalytic methods and benign by-products; for intermediate levels, choose a reagent with $k_2 \ll k_1$ ([[#prop-consecutive]]).
4. **Check the conditions** (acidic, basic, aqueous, temperature) against acid-, base- and water-sensitive groups.
5. **If no reagent is selective enough, reorder the steps** (do the reduction before the sensitive group is installed) **or protect** the competing group.
:::

::: quiz
Which reagent converts methyl 4-oxocyclohexane-1-carboxylate into methyl 4-hydroxycyclohexane-1-carboxylate in one step?
- [x] Sodium borohydride in methanol at 0 °C
- [ ] Lithium aluminium hydride in THF, then aqueous work-up
- [ ] DIBAL-H (1 equivalent) at −78 °C
- [ ] Borane–THF
::: solution
Only the ketone should be reduced (level 2 → 1), leaving the ester (level 3). $\mathrm{NaBH_4}$ reduces ketones rapidly and esters very slowly. $\mathrm{LiAlH_4}$ would reduce both, giving the diol. DIBAL-H attacks the ketone too, and its purpose is ester → aldehyde, not ketone selectivity. Borane is an electrophilic reductant that reduces ketones only slowly and is chosen for acids and amides.
:::
:::

::: warning "Oxidation" in organic chemistry is not just adding oxygen {#warn-oxidation}
Students often classify reactions by whether oxygen appears. That fails both ways. Dehydrogenation of cyclohexene to benzene, or of an alcohol to a ketone, is an oxidation with no oxygen added; conversion of an alkene to an alkyl bromide by HBr involves a C–Br bond but no change in oxidation level (one carbon goes up, the other down); and hydration of an alkene adds oxygen but is not an oxidation at all — the alkene and the alcohol are at the same level ([[#def-level]]). Similarly, the epoxide and the *anti*-diol made from it are at the same level, so the ring opening needs no redox reagent. Count bonds to heteroatoms, not oxygen atoms.
:::

::: history
Chromium-based oxidations dominated the early twentieth century: Ewart Jones and co-workers introduced the "Jones reagent" in the 1940s, Lewis Sarett the chromium trioxide–pyridine complex in 1953, and E. J. Corey and J. William Suggs PCC in 1975. The search for milder, metal-free oxidants produced the DMSO-based methods — Kornblum (1957), Pfitzner–Moffatt (1963) and Kenji Omura and Daniel Swern's oxalyl chloride activation (1978) — and Daniel Dess and James Martin's periodinane (1983). Adolf von Baeyer and Victor Villiger reported the peracid oxidation of ketones in 1899, and Nikolai Prilezhaev the epoxidation of alkenes by peroxy acids in 1909. On the reduction side, Hermann Irving Schlesinger and Herbert C. Brown discovered sodium borohydride during wartime research (published 1953), and lithium aluminium hydride was reported by Finholt, Bond and Schlesinger in 1947; Brown's hydroboration earned him a share of the 1979 Nobel Prize. Paul Sabatier's catalytic hydrogenation over nickel (Nobel Prize 1912, with Victor Grignard) and Arthur Birch's dissolving-metal reduction of arenes (1944) completed the basic toolkit.
:::

## Where this leads

The redox FGIs of this chapter appear in almost every synthesis that follows. Protecting groups ([[organic-synthesis/protecting-groups]]) solve the cases where no reagent is selective enough, as in [[#ex-levulinate]]. The enantioselective versions of epoxidation, dihydroxylation and ketone reduction are in [[organic-synthesis/stereoselective-synthesis]], and the Baeyer–Villiger reaction reappears among the rearrangements of [[organic-synthesis/rearrangements-radicals]]. Catalytic versions and their green-chemistry advantages are discussed in [[organometallics-catalysis/hydrogenation-hydroformylation]] and [[green-chemistry/green-principles]].

::: summary
- The **oxidation level** of a carbon (bonds to heteroatoms) shows whether an FGI needs a redox reagent and how many two-electron equivalents: ester → alcohol needs two hydrides, acid → amide none.
- Alcohol oxidations (Swern, Dess–Martin, TEMPO/bleach, TPAP, PCC; $\mathrm{MnO_2}$ for allylic/benzylic) work by attaching oxygen to an electron-poor atom and eliminating the carbinol C–H; anhydrous conditions stop at the aldehyde.
- For consecutive oxidation the maximum aldehyde fraction is $r^{r/(1-r)}$ with $r = k_2/k_1$: selectivity comes from the reagent, not from timing.
- Alkene oxidations: concerted, stereospecific epoxidation (electron-rich alkenes faster), *syn*-dihydroxylation with catalytic $\mathrm{OsO_4}$/NMO, ozonolysis with reductive or oxidative work-up, Wacker oxidation to methyl ketones.
- The Baeyer–Villiger reaction inserts O next to the carbonyl on the side of the better migrating group (tertiary > secondary ≈ aryl > primary > methyl, empirical), with retention.
- Hydride selectivity: $\mathrm{NaBH_4}$ (aldehydes, ketones) < $\mathrm{LiBH_4}$ (adds esters) < $\mathrm{LiAlH_4}$ (nearly everything); DIBAL-H stops esters at aldehydes at $-78\ ^\circ\mathrm{C}$; electrophilic $\mathrm{BH_3}$ prefers acids and amides.
- When no reagent can distinguish the groups, reorder the steps or protect.
:::

## Exercises

::: exercise Counting hydride equivalents {level=1 check="2"}
How many hydride equivalents are needed to reduce a nitrile $\mathrm{RC{\equiv}N}$ to a primary amine $\mathrm{RCH_2NH_2}$? (Enter the number.)
::: solution
The nitrile carbon has three bonds to nitrogen (level 3); in $\mathrm{RCH_2NH_2}$ it has one (level 1). $\Delta L = -2$, so two hydride equivalents ([[#prop-levels]]); $\mathrm{LiAlH_4}$ or catalytic hydrogenation achieves it.
:::
:::

::: exercise Mass of reducing agent {level=1 check="0.964"}
Calculate the minimum mass of $\mathrm{NaBH_4}$ ($37.83\ \mathrm{g\,mol^{-1}}$) to reduce $10.0\ \mathrm{g}$ of cyclohexanone ($98.14\ \mathrm{g\,mol^{-1}}$), assuming all four hydrides are used. (Enter the mass in grams to three significant figures.)
::: solution
$10.0/98.14/4 \times 37.83 = 0.964\ \mathrm{g}$ ([[#ex-nabh4]]).
:::
:::

::: exercise Pick the reagent {level=1}
Choose a reagent for each conversion: (a) cyclohexanol → cyclohexanone; (b) oct-1-en-3-ol → oct-1-en-3-one, leaving the C=C; (c) hex-2-yne → (*Z*)-hex-2-ene; (d) methyl benzoate → benzaldehyde; (e) 4-nitrobenzoic acid → 4-nitrobenzyl alcohol.
::: solution
(a) Any alcohol oxidant: PCC, Swern, DMP, TEMPO/NaOCl, or Jones (ketones do not over-oxidise). (b) $\mathrm{MnO_2}$ (allylic alcohol, selective) or DMP/Swern; avoid peracids and osmium, which attack the alkene. (c) $\mathrm{H_2}$, Lindlar catalyst (*syn* addition, stops at the alkene). (d) DIBAL-H, one equivalent, $-78\ ^\circ\mathrm{C}$, then aqueous work-up. (e) $\mathrm{BH_3{\cdot}THF}$: electrophilic borane reduces the acid and leaves the nitro group; $\mathrm{LiAlH_4}$ would attack the nitro group too.
:::
:::

::: exercise The best possible aldehyde yield {level=2 check="0.854"}
An oxidation of a primary alcohol has $k_2/k_1 = 0.050$ for over-oxidation of the aldehyde. What is the maximum fraction of aldehyde attainable? (Enter it as a fraction to three significant figures.)
::: solution
$[\mathrm{B}]_\mathrm{max}/[\mathrm{A}]_0 = r^{r/(1-r)} = 0.050^{0.050/0.950} = 0.050^{0.05263} = e^{0.05263 \ln 0.050} = e^{-0.1577} = 0.854$, reached at $k_1t = \ln(0.05)/(0.05 - 1) = 3.15$ ([[#eq-bmax]]).
:::
:::

::: exercise Baeyer–Villiger predictions {level=2}
Predict the major product of mCPBA with (a) 4-*tert*-butylcyclohexan-1-one, (b) 3,3-dimethylbutan-2-one (pinacolone), (c) 4-methoxybenzaldehyde. Explain each using [[#prop-aptitude]].
::: solution
(a) The two ring carbons adjacent to C=O are equivalent secondary carbons; either migrates, giving **5-*tert*-butyloxepan-2-one**. The *tert*-butyl group is far from the reacting centre and is not involved. (b) *tert*-Butyl (tertiary) migrates in preference to methyl: ***tert*-butyl acetate**, $\mathrm{CH_3CO{-}OC(CH_3)_3}$. (c) The electron-rich aryl group migrates in preference to hydrogen (the para-methoxy oxygen stabilises the positive charge on the migrating carbon by donating its lone pair through the ring): **4-methoxyphenyl formate**, which is hydrolysed to 4-methoxyphenol. Benzaldehyde itself gives mainly benzoic acid.
:::
:::

::: exercise A lactone from a keto ester {level=2}
Write the full mechanism, in words, for the formation of $\gamma$-valerolactone from ethyl 4-oxopentanoate in [[#ex-levulinate]], naming each electron movement.
::: solution
**Reduction.** The B–H bond of borohydride donates its electron pair to the ketone carbonyl carbon (C4), forming C–H; the C=O π electrons move onto oxygen, giving an alkoxide, which takes a proton from ethanol to give the secondary alcohol. The ester is untouched. **Lactonisation (acid-catalysed).** A proton adds to the ester carbonyl oxygen (one of its lone pairs), making the carbonyl carbon more electrophilic. A lone pair on the C4 hydroxy oxygen attacks the carbonyl carbon (C1), forming a five-membered ring, while the C=O π electrons move onto the protonated oxygen, giving a neutral OH. Proton transfers move a proton from the ring oxygen (now positively charged) to the ethoxy oxygen. The OH lone pair then re-forms the C=O π bond and the bond to the protonated ethoxy group breaks, releasing ethanol; loss of a proton from the carbonyl oxygen gives the neutral lactone. The five-membered ring forms rapidly because the intramolecular reaction has a favourable entropy.
:::
:::

::: exercise Three products from one keto ester {level=3}
Starting from methyl 4-acetylbenzoate, $\mathrm{CH_3CO{-}C_6H_4{-}CO_2CH_3}$, give short sequences to make (a) methyl 4-(1-hydroxyethyl)benzoate, (b) 1-[4-(hydroxymethyl)phenyl]ethan-1-one, (c) 4-ethylbenzoic acid. Explain the selectivity issue in each.
::: hint
In (b) the group to be reduced is the less reactive one.
:::
::: solution
(a) $\mathrm{NaBH_4}$, methanol, 0 °C: the ketone is reduced, the ester is not. (b) The ester must be reduced while the more reactive ketone survives — impossible directly. Protect the ketone as its 1,3-dioxolane (ethane-1,2-diol, catalytic toluene-4-sulfonic acid, removal of water); reduce the ester with $\mathrm{LiAlH_4}$ (acetals are inert to hydride); then remove the acetal with aqueous acid (which leaves the benzylic primary alcohol intact under mild conditions) ([[organic-synthesis/protecting-groups]]). (c) Deoxygenate the ketone to $\mathrm{CH_2}$: the Wolff–Kishner reduction (hydrazine, KOH, high-boiling diol, heat) converts the aryl ketone into the ethyl group and, under the same strongly basic conditions, saponifies the methyl ester; acidification gives 4-ethylbenzoic acid in one operation. (Alternatively, catalytic hydrogenolysis over Pd/C in acid reduces aryl ketones to $\mathrm{CH_2}$ via the benzylic alcohol, followed by ester hydrolysis.) Hydrazine is toxic and a suspected carcinogen; the reaction is done in a fume cupboard with supervision.
:::
:::

::: exercise Directed versus electronic epoxidation {level=3}
Geraniol, (*E*)-3,7-dimethylocta-2,6-dien-1-ol, has two trisubstituted alkenes, C2=C3 (allylic to the OH) and C6=C7. Predict the major monoepoxide formed with (a) one equivalent of mCPBA, (b) catalytic vanadyl acetylacetonate with *tert*-butyl hydroperoxide. Explain.
::: hint
Which alkene is more electron-rich? Which can the metal reach while bonded to the alcohol?
:::
::: solution
(a) mCPBA is an electrophile; both alkenes are trisubstituted, but the C2=C3 bond is slightly deactivated by the inductive electron withdrawal of the nearby C–O bond. Epoxidation occurs mainly at the remote **6,7-double bond**, giving 6,7-epoxygeraniol. (b) Vanadium(V) binds the allylic alcohol as an alkoxide and the hydroperoxide on the same metal; the peroxide oxygen is delivered intramolecularly to the nearest alkene, **C2=C3**, with very high selectivity (Sharpless and Michaelson, 1973), giving 2,3-epoxygeraniol. The 6,7-alkene, too far away to reach the metal-bound oxidant, is untouched. The contrast illustrates the two main sources of chemoselectivity: intrinsic electronic reactivity, and **directed** delivery by a functional group. The enantioselective version (Sharpless–Katsuki epoxidation) is developed in [[organic-synthesis/stereoselective-synthesis]].
:::
:::
