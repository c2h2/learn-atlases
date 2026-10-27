In the previous chapter we met a problem that no choice of reagent can solve: methyl 4-acetylbenzoate cannot have its ester reduced while its ketone survives, because every hydride that attacks esters attacks ketones faster. The same difficulty arises whenever a molecule contains two similar functional groups and we want to transform one of them but not the other — an amino acid whose amine must not react while its acid is activated, a sugar with five hydroxy groups of which only one is to be oxidised, a Grignard reagent that would destroy itself on any O–H or N–H in the same molecule. The general solution is to **protect** the group that must survive: convert it temporarily into a derivative that is inert to the coming conditions, carry out the transformation, and then **deprotect** to restore the original group.

Protecting groups are among the most practically important and the least glamorous tools in synthesis. Every protection costs two steps (on and off), each with a yield below 100 %, and adds mass, reagents and waste. A good synthetic plan therefore uses as few as possible and chooses them so that each can be removed under conditions that leave the others alone. This chapter surveys the main protecting groups for alcohols, diols, carbonyl compounds, amines and carboxylic acids, explains the mechanism of each installation and removal, quantifies selectivity and cost, and develops the central idea of **orthogonal protection** — the design principle that makes peptide synthesis, oligosaccharide synthesis and most long total syntheses possible.

## What a protecting group must do {#sec-criteria}

::: definition Protecting group {#def-pg}
A **protecting group** (PG) is a group attached temporarily to a functional group to make it unreactive towards conditions it would otherwise not survive, and removed later to regenerate the original group. A useful protecting group: (1) is introduced selectively, in high yield, with readily available reagents; (2) is stable to all the conditions it must survive in between; (3) is removed selectively, in high yield, under conditions that do not affect the rest of the molecule; (4) introduces no new stereocentre (or the stereocentre does not matter); (5) is easy to separate from the product after removal; and, ideally, (6) is cheap and generates little waste.
:::

::: definition Orthogonal protecting groups {#def-orthogonal}
A set of protecting groups is **orthogonal** if each member can be removed by a set of conditions that leaves all the other members intact, in any order. Groups that are removed by the same kind of conditions at different rates (for example two silyl ethers, both cleaved by acid) are not orthogonal but **graduated**: they can be removed selectively only in one order, and only by controlling time and conditions ([[#prop-selective]]).
:::

The four main "keys" that open protecting groups are **acid**, **base or nucleophile**, **fluoride** (for silicon) and **reduction or oxidation** (hydrogenolysis, Pd(0), single-electron oxidants). Groups opened by different keys are normally orthogonal.

## Protecting alcohols {#sec-alcohols}

### Silyl ethers

Silyl ethers $\mathrm{R{-}O{-}SiR'_3}$ are the most widely used alcohol protecting groups. They are made from the alcohol and a silyl chloride (or the more reactive triflate) with a base. With *tert*-butyldimethylsilyl chloride (TBSCl, also written TBDMSCl), E. J. Corey and A. Venkateswarlu's conditions (1972) use imidazole in DMF. In words: the imidazole nitrogen lone pair attacks silicon, displacing chloride and forming a reactive silylimidazolium ion; the alcohol oxygen's lone pair then attacks silicon, the Si–N bond breaking with its electrons returning to the imidazole; a second imidazole removes the O–H proton. Substitution at silicon is fast despite the bulky groups because silicon is larger than carbon and can accommodate five groups in a trigonal-bipyramidal transition state or intermediate.

The size of the alkyl groups on silicon controls both how easily the ether forms and how easily it is cleaved.

| silyl group | abbreviation | relative stability to acid | relative stability to base |
|---|---|---|---|
| trimethylsilyl | TMS | 1 | 1 |
| triethylsilyl | TES | 64 | 10–100 |
| *tert*-butyldimethylsilyl | TBS (TBDMS) | 20 000 | ~20 000 |
| triisopropylsilyl | TIPS | 700 000 | 100 000 |
| *tert*-butyldiphenylsilyl | TBDPS | 5 000 000 | ~20 000 |

(Approximate relative rates of hydrolysis, inverted to give stabilities, as compiled in Wuts and Greene's *Protective Groups in Organic Synthesis*.) TMS ethers are too labile for most purposes; TBS is the workhorse; TIPS and TBDPS survive conditions that remove TBS. Bulk also gives **regioselectivity in protection**: TBSCl, and still more TBDPSCl and trityl chloride, react faster with primary than with secondary alcohols.

**Removal by fluoride.** Silyl ethers are cleaved by fluoride ion — tetrabutylammonium fluoride (TBAF) in THF, or HF–pyridine. The fluoride lone pair attacks silicon to give a pentacoordinate silicate anion; the Si–O bond then breaks, its electrons going to oxygen as an alkoxide, which is protonated on work-up. The driving force is the strength of the Si–F bond (mean bond enthalpy about $565\ \mathrm{kJ\,mol^{-1}}$, compared with about $450\ \mathrm{kJ\,mol^{-1}}$ for Si–O). Because fluoride is a key used by no other common protecting group, silyl ethers are orthogonal to most others. TBAF is basic, however, and can trigger elimination or acyl migration in sensitive substrates; buffering with acetic acid helps.

::: example Selective protection of a primary alcohol {#ex-tbs}
Butane-1,3-diol has a primary and a secondary hydroxy group. How would you protect only the primary one, and how would you then oxidise the secondary alcohol to a ketone without affecting the protected end?
::: solution
**Protection.** One equivalent of TBSCl with imidazole in DMF (or dichloromethane), at 0 °C to room temperature. The primary OH is less hindered, so it attacks the silylimidazolium ion faster; the product is 4-(*tert*-butyldimethylsilyloxy)butan-2-ol, $\mathrm{TBSO{-}CH_2CH_2CH(OH)CH_3}$, with a little bis-silyl ether (separated by chromatography). For higher selectivity, use the bulkier TBDPSCl or trityl chloride, which react with secondary alcohols much more slowly.

**Oxidation.** Swern or Dess–Martin oxidation ([[organic-synthesis/redox-in-synthesis]]) converts the secondary alcohol into the ketone; neither attacks a silyl ether. Avoid Jones reagent, whose aqueous sulfuric acid can cleave TBS ethers of primary alcohols. **Deprotection** with TBAF in THF then gives 4-hydroxybutan-2-one.
:::
:::

::: proposition Selective removal of graduated protecting groups {#prop-selective}
Suppose two protected groups A and B are cleaved under the same conditions by pseudo-first-order processes with rate constants $k_\mathrm{A} > k_\mathrm{B}$. When a fraction $f_\mathrm{A}$ of A remains, the fraction of B remaining is
$$
f_\mathrm{B} = f_\mathrm{A}^{\,k_\mathrm{B}/k_\mathrm{A}}.
$$ {#eq-selective}
In particular, removing $99\,\%$ of A ($f_\mathrm{A} = 0.01$) while losing no more than $1\,\%$ of B requires $k_\mathrm{A}/k_\mathrm{B} \geq \ln 0.01/\ln 0.99 \approx 460$.
:::

::: proof
First-order kinetics give $f_\mathrm{A} = e^{-k_\mathrm{A}t}$ and $f_\mathrm{B} = e^{-k_\mathrm{B}t}$ at the same time $t$. Eliminating $t = -\ln f_\mathrm{A}/k_\mathrm{A}$ gives $\ln f_\mathrm{B} = (k_\mathrm{B}/k_\mathrm{A})\ln f_\mathrm{A}$, which is [[#eq-selective]]. For the numerical condition, $f_\mathrm{B} \geq 0.99$ requires $(k_\mathrm{B}/k_\mathrm{A})\ln 0.01 \geq \ln 0.99$, i.e. $k_\mathrm{A}/k_\mathrm{B} \geq \ln 0.01/\ln 0.99 = 4.605/0.01005 = 458$. $\blacksquare$
:::

::: widget plot
f: exp(-x); exp(-x/s)
x: 0, 10
y: 0, 1
sliders: s=312:2:2000:1
labels: \text{faster-cleaved group A}; \text{slower-cleaved group B}
caption: Fraction of two silyl ethers remaining against $k_\mathrm{A}t$ under the same cleavage conditions, with selectivity $s = k_\mathrm{A}/k_\mathrm{B}$ ([[#eq-selective]]). The default, $s = 312$, is the ratio of the acid-stability figures for TBS and TES ($20\,000/64$): when $99\,\%$ of the TES ether has gone ($k_\mathrm{A}t = 4.6$), $98.5\,\%$ of the TBS ether remains. Lower $s$ to 10 or 20 — the kind of difference between two secondary TBS ethers in slightly different environments — and no reaction time gives a clean result. Graduated selectivity works only when the rate ratio is in the hundreds.
:::

::: example Removing TES in the presence of TBS {#ex-tes-tbs}
A molecule carries a TES ether and a TBS ether, both on secondary alcohols. Using the relative acid stabilities in the table, what fraction of the TBS ether survives mild acid treatment that removes $99\,\%$ of the TES ether? What would be a more reliable plan?
::: solution
The rate ratio is $k_\mathrm{TES}/k_\mathrm{TBS} = 20\,000/64 = 312$. By [[#eq-selective]], $f_\mathrm{TBS} = 0.01^{1/312} = e^{-4.605/312} = e^{-0.01476} = 0.985$: $98.5\,\%$ survives. This is good, but it depends on the two alcohols being similarly hindered; the table's ratios are averages and can shift by an order of magnitude with the environment. Such graduated removals are common (for example with pyridinium toluene-4-sulfonate in methanol, or dilute acetic acid), but an **orthogonal** pair — for example a TBS ether and a benzyl ether, removed by fluoride and by hydrogenolysis respectively — does not depend on rate ratios at all.
:::
:::

### Benzyl and related ethers

**Benzyl ethers** ($\mathrm{ROCH_2Ph}$, Bn) are made by the Williamson reaction: sodium hydride deprotonates the alcohol (H⁻ takes the proton, releasing $\mathrm{H_2}$), and the alkoxide's lone pair attacks the benzylic carbon of benzyl bromide in an $\mathrm{S_N2}$ reaction, displacing bromide. Benzyl ethers survive strong base, nucleophiles, hydrides, most oxidants and moderate acid; they are removed by **hydrogenolysis** ($\mathrm{H_2}$, Pd/C), which cleaves the benzylic C–O bond and gives the alcohol and toluene. The **4-methoxybenzyl** (PMB) ether can also be removed **oxidatively** with 2,3-dichloro-5,6-dicyano-1,4-benzoquinone (DDQ): the electron-rich arene transfers an electron to DDQ, the resulting radical cation loses a benzylic proton and a second electron to give an oxocarbenium ion stabilised by the methoxy group, and water adds to give a hemiacetal that falls apart to the alcohol and 4-methoxybenzaldehyde. A plain benzyl ether reacts with DDQ much more slowly, so PMB can be removed in the presence of Bn.

### Acetals and esters

**Acetal-type ethers** — tetrahydropyranyl (THP, from 3,4-dihydro-2*H*-pyran and an acid catalyst), methoxymethyl (MOM), and 2-(trimethylsilyl)ethoxymethyl (SEM) — are stable to base, nucleophiles and hydrides and are removed by aqueous acid. THP introduces a new stereocentre (the acetal carbon), so a chiral alcohol gives a mixture of diastereomers, complicating NMR spectra. Chloromethyl methyl ether, the classical MOM reagent, is a known human carcinogen; MOM ethers are now often made by other methods, such as acetal exchange with dimethoxymethane.

**Esters** — acetate (Ac), benzoate (Bz), pivalate (Piv, $\mathrm{(CH_3)_3CCO}$) — are made with the acid anhydride or chloride and a base (pyridine, often with catalytic 4-(dimethylamino)pyridine, DMAP) and removed by base (potassium carbonate in methanol, or hydroxide). They are stable to acid and oxidants, but not to hydrides or organometallics. The bulky pivalate resists hydrolysis far better than acetate.

### Diols

1,2- and 1,3-Diols are protected together as cyclic acetals. **Acetonides** (isopropylidene acetals, from acetone or 2,2-dimethoxypropane with acid) prefer 1,2-diols, forming five-membered 1,3-dioxolanes: in the six-membered 1,3-dioxane alternative one of the two methyl groups would have to sit axial, with a severe 1,3-diaxial interaction. **Benzylidene acetals** (from benzaldehyde) prefer 1,3-diols and six-membered 1,3-dioxanes, in which the single phenyl group sits equatorial. Benzylidene acetals can be opened **reductively** and regioselectively (DIBAL-H, or $\mathrm{NaBH_3CN}$ with HCl), leaving a benzyl ether on one oxygen and a free OH on the other — a way to differentiate the two hydroxy groups.

## Protecting carbonyl groups {#sec-carbonyl}

Aldehydes and ketones are protected as **acetals**, most often the cyclic 1,3-dioxolane from ethane-1,2-diol, which is stable to bases, nucleophiles, organometallics, hydrides and most oxidants, and is removed with aqueous acid.

::: example Protecting a ketone to reduce an ester {#ex-acetal}
Show how methyl 4-acetylbenzoate is converted into 1-[4-(hydroxymethyl)phenyl]ethan-1-one, and describe the mechanism of acetal formation step by step.
::: solution
**Plan.** (1) Ethane-1,2-diol, catalytic toluene-4-sulfonic acid, toluene, heating with a Dean–Stark trap to remove water: the ketone becomes its 2-methyl-1,3-dioxolane; the ester is unaffected. (2) $\mathrm{LiAlH_4}$ in THF reduces the ester to the primary alcohol; acetals have no electrophilic carbon and do not react. (3) Aqueous acid (dilute HCl in acetone or THF) hydrolyses the acetal, regenerating the ketone.

**Mechanism of acetal formation.** (a) The acid protonates the carbonyl oxygen (using one of its lone pairs), giving an oxocarbenium-like cation. (b) A hydroxy oxygen of the diol attacks the carbonyl carbon with its lone pair; the C=O π electrons move onto the protonated oxygen, giving a protonated hemiacetal; loss of a proton gives the neutral hemiacetal. (c) The hemiacetal OH is protonated and leaves as water, its C–O electrons departing with it; the lone pair of the ring-to-be oxygen (already bonded to carbon) pushes in to form a C=O⁺ double bond, an **oxocarbenium ion**. (d) The second hydroxy group of the diol attacks this cation intramolecularly, forming the five-membered ring; (e) loss of a proton gives the acetal. Every step is reversible; removing water (Dean–Stark) drives the equilibrium to the acetal, and adding excess water (deprotection) drives it back. The intramolecular closure in (d) and the favourable entropy of a cyclic acetal (two molecules give two, rather than three giving two) make dioxolanes form much more readily than acyclic dimethyl acetals.
:::
:::

**Thioacetals** (1,3-dithiolanes and dithianes, from thiols and a Lewis acid) are stable to aqueous acid as well, so they are orthogonal to oxygen acetals. They are removed with mercury(II) salts or oxidatively, and can be reduced directly to $\mathrm{CH_2}$ with Raney nickel. As we saw in [[organic-synthesis/retrosynthesis]], 1,3-dithianes also serve as acyl anion equivalents.

## Protecting amines {#sec-amines}

Amines are nucleophilic and (if primary or secondary) have acidic N–H bonds that destroy organometallics. They are usually protected as **carbamates**, $\mathrm{R_2N{-}CO{-}OR'}$, whose nitrogen lone pair is delocalised into the carbonyl group and so is neither basic nor nucleophilic. The choice of the alkoxy group $\mathrm{OR'}$ decides the key that opens it.

- **Boc** (*tert*-butoxycarbonyl), installed with di-*tert*-butyl dicarbonate ($\mathrm{Boc_2O}$). Removed by **acid** (trifluoroacetic acid, or HCl in dioxane). Mechanism: the carbamate carbonyl oxygen is protonated; the bond between the ester oxygen and the *tert*-butyl group breaks, its electrons staying on oxygen, releasing the stable *tert*-butyl cation (which loses a proton to give 2-methylpropene, or is captured by a scavenger); the resulting carbamic acid loses carbon dioxide, the C–N bond electrons moving onto nitrogen, to give the ammonium salt. Electron-rich side chains (indole, thioethers) can be alkylated by the *tert*-butyl cation, which is why scavengers such as water, triisopropylsilane or thioanisole are added.
- **Cbz** or **Z** (benzyloxycarbonyl, Max Bergmann and Leonidas Zervas, 1932), installed with benzyl chloroformate. Removed by **hydrogenolysis**: cleavage of the benzylic C–O bond gives toluene and the carbamic acid, which decarboxylates. Also cleaved by HBr in acetic acid.
- **Fmoc** (9-fluorenylmethoxycarbonyl, Louis Carpino, 1970), installed with Fmoc-Cl or Fmoc-OSu. Removed by **base**, typically piperidine in DMF, through an E1cB elimination (see the exercise below on Fmoc removal). Stable to acid.
- **Alloc** (allyloxycarbonyl), removed by **Pd(0)** with an allyl scavenger (morpholine, phenylsilane): oxidative addition of the allyl–O bond to palladium releases the carbamate.
- **Sulfonamides**: tosyl (Ts) is very robust (removed by dissolving metals or strong acid); 2- or 4-nitrobenzenesulfonyl (Ns, Tohru Fukuyama, 1995) is removed under mild conditions by a thiolate, via nucleophilic aromatic substitution on the electron-poor ring.

::: widget graph
nodes: Boc@0,4; tBu ester@0,3; Fmoc@0,2; Cbz@0,1; Bn ether@0,0; TBS@0,-1; Alloc@0,-2; PMB@0,-3; acid@4,3.5; base@4,2; H2/Pd@4,0.5; fluoride@4,-1; Pd(0)@4,-2; DDQ@4,-3
edges: Boc-acid; tBu ester-acid; Fmoc-base; Cbz-H2/Pd; Cbz-acid; Bn ether-H2/Pd; TBS-fluoride; TBS-acid; Alloc-Pd(0); PMB-DDQ; PMB-H2/Pd; PMB-acid
algorithm: none
caption: An orthogonality map. Protecting groups (left) are joined to the "keys" that remove them under standard conditions (right): acid (TFA or HCl), base (piperidine), hydrogenolysis ($\mathrm{H_2}$, Pd/C), fluoride (TBAF), Pd(0) with an allyl scavenger, and the oxidant DDQ. Two groups are **orthogonal** when they share no key ([[#def-orthogonal]]). Fmoc and Boc share none — the basis of Fmoc/*t*Bu peptide synthesis. Cbz is cleaved by strong acid (HBr/AcOH) as well as by hydrogenolysis, so it is only partly orthogonal to Boc; TBS ethers of primary alcohols are cleaved by strong aqueous acid as well as by fluoride. Drag the nodes to group the mutually orthogonal sets. The map simplifies reality: rates, not just keys, decide selectivity.
:::

::: example Mechanisms of Boc and Fmoc removal {#ex-boc-fmoc}
A dipeptide carries Boc on its N-terminus. A second dipeptide carries Fmoc. Write the products of treating the first with trifluoroacetic acid and the second with piperidine, and explain why the other group would survive each treatment.
::: solution
**Boc/TFA.** As described above: protonation of the carbonyl oxygen; heterolysis of the O–C(CH₃)₃ bond to give the *tert*-butyl cation (→ 2-methylpropene or a scavenger adduct); decarboxylation of the carbamic acid; the product is the peptide amine as its trifluoroacetate salt. An Fmoc carbamate is stable to acid because its 9-fluorenylmethyl group cannot form a stabilised cation easily (the C–O bond is to a primary carbon), so no ionisation path is available.

**Fmoc/piperidine.** The C9–H of the fluorene ring is unusually acidic ($\mathrm{p}K_\mathrm{a}$ about 23 in DMSO), because the resulting anion is a cyclopentadienyl-type aromatic anion within the fluorene system. Piperidine removes that proton, its lone pair taking the H⁺ while the C–H electrons form the carbanion. The carbanion's electron pair then forms a C=C bond to the adjacent $\mathrm{CH_2}$, breaking the $\mathrm{CH_2}$–O bond and expelling the carbamate anion (an E1cB elimination). The carbamate loses $\mathrm{CO_2}$ to give the free amine. The other product, dibenzofulvene, is a reactive Michael acceptor; excess piperidine adds to it, preventing it from alkylating the newly freed amine. A Boc carbamate has no acidic C–H positioned for elimination and is untouched by amine bases.
:::
:::

## Protecting carboxylic acids {#sec-acids}

Carboxylic acids are protected as esters, chosen by the key that removes them: **methyl or ethyl** esters (base hydrolysis, LiOH or NaOH), ***tert*-butyl** esters (acid, by the same cation mechanism as Boc), **benzyl** esters (hydrogenolysis), **allyl** esters (Pd(0)), and silyl esters (very labile, for temporary protection). In peptide chemistry the combination of Fmoc on nitrogen with *tert*-butyl esters and ethers on side chains, all acid-labile, is the standard **Fmoc/*t*Bu strategy**; the older Boc/benzyl strategy of Bruce Merrifield uses graduated acid lability (TFA removes Boc, liquid HF removes the benzyl-based groups) rather than true orthogonality.

## Strategy: orthogonality and the cost of protection {#sec-strategy}

::: algorithm Designing a protecting-group strategy {#alg-pg}
1. **List every functional group** in every intermediate and every set of conditions the route uses.
2. **Mark the conflicts**: each group that would react under conditions meant for another.
3. **Try to remove conflicts without protection**: reorder steps (introduce the sensitive group late), use a more chemoselective reagent, or carry a group in a latent form (a nitro group for an amine, an alkene for a ketone, an ester for an alcohol).
4. **For the remaining conflicts, choose protecting groups** stable to every condition between installation and removal ([[#def-pg]]), with keys that are orthogonal to each other and to the planned reactions ([[#def-orthogonal]]).
5. **Plan the removal order** and, where possible, remove several groups in one step at the end (global deprotection), or combine a deprotection with another transformation.
6. **Count the cost**: each group adds two steps; compare the overall yield with a protecting-group-free alternative.
:::

The cost is multiplicative. If a route needs $m$ protecting groups, each installed and removed in yields $p_\mathrm{on}$ and $p_\mathrm{off}$, the overall yield is multiplied by $(p_\mathrm{on}p_\mathrm{off})^m$, and $2m$ steps are added. Three protecting groups at $95\,\%$ per operation cost a factor $0.95^6 = 0.735$ — a quarter of the material — before any productive chemistry is done. This arithmetic, together with the waste generated, has driven a movement towards **protecting-group-free synthesis**, popularised by Reinhard Hoffmann (2006) and demonstrated by Phil Baran's group in syntheses of marine alkaloids (2007), in which chemoselective reactions and careful ordering of steps make protection unnecessary.

::: example Solid-phase peptide synthesis: the cumulative yield {#ex-spps}
In Fmoc solid-phase peptide synthesis, each residue is added by two operations — Fmoc removal and coupling of the next Fmoc-amino acid. If each operation is $99.0\,\%$ complete, what fraction of the resin-bound chains are the correct 20-residue peptide after 19 additions (38 operations)? What per-operation efficiency is needed for $90\,\%$?
::: solution
$0.990^{38} = 0.682$: only $68\,\%$ of chains are correct; the rest are deletion sequences missing one or more residues, which are hard to separate because they differ only slightly from the product. For $90\,\%$: $p^{38} = 0.90$, so $p = 0.90^{1/38} = e^{\ln 0.90/38} = e^{-0.002773} = 0.99723$, i.e. $99.7\,\%$ per operation. This is why each deprotection and coupling is driven to completion with excess reagents, monitored (for example by the UV absorbance of the dibenzofulvene–piperidine adduct released in each Fmoc removal), and repeated when incomplete. It is also why orthogonality matters so much here: a side-chain protecting group lost even $0.1\,\%$ per cycle would be lost from a few per cent of chains over a long synthesis.
:::
:::

::: quiz
A synthetic intermediate carries a TBS ether, a benzyl ether and a methyl ester. Which reagent removes **only** the benzyl ether?
- [x] $\mathrm{H_2}$, Pd/C, in ethyl acetate
- [ ] Tetrabutylammonium fluoride in THF
- [ ] Lithium hydroxide in aqueous THF
- [ ] DDQ in wet dichloromethane
::: solution
Hydrogenolysis cleaves the benzylic C–O bond and touches neither the silyl ether nor the ester. TBAF removes the TBS group; LiOH hydrolyses the methyl ester; DDQ removes PMB ethers rapidly but plain benzyl ethers only slowly, so it is not the reagent of choice. (If the molecule also had an alkene, hydrogenation would reduce it too — a conflict to note in step 2 of [[#alg-pg]].)
:::
:::

::: warning Protecting groups are not invisible {#warn-pg}
It is easy to treat a protecting group as a passive label. It is not. Bulky silyl groups change conformations and can block or direct reagents on nearby carbons; benzyl and PMB ethers coordinate Lewis acids and can participate in neighbouring-group reactions; acyl groups migrate between neighbouring hydroxy groups under basic or acidic conditions (acetyl migration in sugars and glycerol derivatives is notorious); THP adds a stereocentre; and Boc on nitrogen can be attacked by strong nucleophiles. Deprotection reagents have side effects too: TBAF is basic, TFA generates *tert*-butyl cations, hydrogenolysis reduces alkenes and nitro groups. Always run the conditions of every later step past every protecting group present, and expect the protected molecule to behave somewhat differently from the unprotected one.
:::

::: history
Protecting groups became indispensable with the synthesis of peptides and carbohydrates. Emil Fischer used acyl and acetal derivatives in his sugar and peptide work around 1900, and Max Bergmann and Leonidas Zervas introduced the benzyloxycarbonyl (Cbz, "Z") group in 1932, which made controlled peptide synthesis possible; Vincent du Vigneaud used it in the first synthesis of a peptide hormone, oxytocin (1953; Nobel Prize 1955). Louis Carpino introduced the Boc group (1957) and, with Grace Han, the Fmoc group (1970). Bruce Merrifield's solid-phase peptide synthesis (1963; Nobel Prize 1984) depended on graduated acid lability, and the Fmoc/*t*Bu strategy developed by Eric Atherton and Bob Sheppard in the late 1970s made it orthogonal. E. J. Corey and A. Venkateswarlu introduced the TBS group in 1972. Theodora Greene's *Protective Groups in Organic Synthesis* (1981; later editions with Peter Wuts) and Philip Kocieński's *Protecting Groups* (1994) became the standard references.
:::

## Where this leads

Protecting groups appear in almost every multistep synthesis: in the carbon–carbon bond formations of [[organic-synthesis/carbon-carbon-bonds]], where organometallics demand that all acidic protons be masked; in [[organic-synthesis/stereoselective-synthesis]], where a protecting group can steer a reagent to one face; and in the strategic planning of [[organic-synthesis/total-synthesis]], where the choice and timing of protecting groups often decides whether a long route succeeds. Peptide synthesis and protein chemistry ([[biochemistry/amino-acids-proteins]]) and the synthesis of peptide drugs ([[medicinal-chemistry/biologics]]) rest on the orthogonal strategies of this chapter.

::: summary
- A protecting group is installed and removed selectively and survives everything in between; every protection costs two steps and multiplies the yield by $p_\mathrm{on}p_\mathrm{off}$.
- Alcohols: silyl ethers (TMS < TES < TBS < TIPS, TBDPS in acid stability; removed by fluoride), benzyl ethers (hydrogenolysis; PMB also by DDQ), acetals (THP, MOM; acid), esters (base); diols as acetonides (1,2) or benzylidene acetals (1,3).
- Carbonyl groups: 1,3-dioxolanes (acid on and off, water removal drives formation); thioacetals for acid stability.
- Amines: carbamates opened by different keys — Boc (acid), Cbz (hydrogenolysis), Fmoc (base, E1cB), Alloc (Pd(0)); acids as methyl, *tert*-butyl, benzyl or allyl esters.
- **Orthogonal** groups are removed by different keys in any order; **graduated** groups by the same key at different rates, with $f_\mathrm{B} = f_\mathrm{A}^{k_\mathrm{B}/k_\mathrm{A}}$ — clean selectivity needs rate ratios in the hundreds.
- Plan with [[#alg-pg]]: first try to avoid protection by reordering steps or using latent functionality.
:::

## Exercises

::: exercise Graduated silyl ethers {level=1 check="35"}
Using the relative acid stabilities in the table, by what factor is a TBS ether hydrolysed faster than a TIPS ether under the same acidic conditions? (Enter the factor.)
::: solution
$700\,000/20\,000 = 35$. By [[#eq-selective]], removing $99\,\%$ of the TBS ether would leave $0.01^{1/35} = 87.7\,\%$ of the TIPS ether — not clean. TBS/TIPS differentiation by acid is unreliable; fluoride, which is more sensitive to steric bulk at silicon, or a different pair, is a better choice.
:::
:::

::: exercise Cumulative yield in peptide synthesis {level=1 check="74.0"}
A 31-residue peptide is made by Fmoc solid-phase synthesis with 30 cycles of deprotection and coupling (60 operations), each $99.5\,\%$ efficient. What percentage of chains have the correct sequence? (Enter the percentage to three significant figures.)
::: solution
$0.995^{60} = 0.740$, i.e. $74.0\,\%$ ([[#ex-spps]]).
:::
:::

::: exercise Pick the protecting group {level=1}
Suggest a protecting group for: (a) the OH of an alcohol that must survive a Grignard reaction and later be freed without acid; (b) a ketone that must survive $\mathrm{LiAlH_4}$; (c) an amine that must survive catalytic hydrogenation and be removed with acid; (d) a carboxylic acid that must survive aqueous base and be freed by hydrogenolysis.
::: solution
(a) A TBS ether (stable to organometallics, removed by TBAF). (b) A 1,3-dioxolane (ethane-1,2-diol, acid catalyst). (c) Boc (stable to $\mathrm{H_2}$/Pd, removed by TFA); Cbz would not do, because hydrogenolysis removes it. (d) A benzyl ester.
:::
:::

::: exercise Selective deprotection {level=2 check="0.933"}
Two protected alcohols are cleaved under the same conditions, with $k_\mathrm{A}/k_\mathrm{B} = 100$. What fraction of B remains when $99.9\,\%$ of A has been removed? (Enter the fraction to three significant figures.)
::: solution
$f_\mathrm{B} = f_\mathrm{A}^{k_\mathrm{B}/k_\mathrm{A}} = 0.001^{0.01} = e^{0.01\ln 0.001} = e^{-0.0691} = 0.933$ ([[#eq-selective]]). Pushing A from $99\,\%$ to $99.9\,\%$ removal costs B an extra few per cent: with $f_\mathrm{A} = 0.01$ we would have kept $95.5\,\%$.
:::
:::

::: exercise THP ethers and diastereomers {level=2}
Give the mechanism, in words, of the acid-catalysed formation of a THP ether from (*S*)-butan-2-ol and 3,4-dihydro-2*H*-pyran, and explain why the product shows two sets of NMR signals.
::: solution
The acid protonates the enol ether C=C of dihydropyran at C3 (the carbon remote from oxygen): the π electrons form the new C–H bond, and the ring oxygen's lone pair stabilises the positive charge on C2, giving an oxocarbenium ion. The alcohol's oxygen lone pair attacks C2; loss of the O–H proton gives the acetal, 2-(butan-2-yloxy)oxane. C2 of the ring becomes a new stereocentre, formed with no control, so the product is a roughly equal mixture of (2*R*) and (2*S*) acetals attached to the (*S*)-butyl group: **diastereomers**, which have different NMR spectra. (With a racemic alcohol, four stereoisomers form in two diastereomeric pairs.) This is a practical drawback of THP.
:::
:::

::: exercise Fmoc removal {level=2}
Explain why Fmoc removal is fast with piperidine but very slow with triethylamine, and why the dibenzofulvene by-product must be scavenged.
::: solution
Fmoc removal is an E1cB elimination whose first step is deprotonation of C9–H of the fluorene ([[#ex-boc-fmoc]]). Secondary amines such as piperidine are better bases kinetically for this proton transfer than hindered tertiary amines such as triethylamine (whose nitrogen is crowded by three ethyl groups), so the rate is much higher. More importantly, piperidine — a nucleophile — adds in a Michael fashion to dibenzofulvene (its lone pair attacks the exocyclic $\mathrm{CH_2}$, the C=C electrons forming a fluorenyl anion that is then protonated), giving a stable adduct. Without a nucleophilic scavenger, dibenzofulvene would react with the liberated N-terminal amine of the peptide, capping it permanently, or polymerise.
:::
:::

::: exercise Differentiating three hydroxy groups {level=3}
Starting from butane-1,2,4-triol, devise a sequence to obtain 4-(benzyloxy)butane-1,2-diol. Explain the ring-size selectivity you rely on.
::: hint
Which acetal prefers a 1,2-diol?
:::
::: solution
(1) **Acetonide**: 2,2-dimethoxypropane (or acetone), catalytic toluene-4-sulfonic acid. The 1,2-diol forms a five-membered 1,3-dioxolane; the alternative six-membered 1,3-dioxane from the 2,4-diol would place one acetonide methyl group axial with 1,3-diaxial interactions, so the dioxolane, 2-(2,2-dimethyl-1,3-dioxolan-4-yl)ethan-1-ol, dominates under equilibrating conditions. (2) **Benzylation** of the remaining primary OH: NaH (deprotonation, releasing $\mathrm{H_2}$), then benzyl bromide ($\mathrm{S_N2}$ at the benzylic carbon). Acetonides are stable to base. (3) **Acetonide removal**: aqueous acid (dilute HCl in methanol, or acetic acid–water), which hydrolyses the acetal (the reverse of [[#ex-acetal]]) and leaves the benzyl ether intact, giving 4-(benzyloxy)butane-1,2-diol. Had the 1,3-relationship been wanted, a benzylidene acetal (six-membered, phenyl equatorial) would be the choice.
:::
:::

::: exercise The break-even point for a protecting-group-free step {level=3 check="66.2"}
Route 1 protects three groups (three installations and three removals at $95\,\%$ each) so that the key step proceeds in $90\,\%$ yield. Route 2 omits all protection, and its key step suffers from side reactions. Below what yield of the key step is route 2 worse than route 1 (counting only these steps)? (Enter the yield in per cent, to three significant figures.)
::: solution
Route 1: $0.95^6 \times 0.90 = 0.735 \times 0.90 = 0.662$, i.e. $66.2\,\%$. Route 2 gives $p_\mathrm{key}$; it is worse only if $p_\mathrm{key} < 66.2\,\%$. Route 2 is also six steps shorter, with less waste and labour, so in practice it is preferred even when its yield is somewhat below the break-even point — and it avoids the risk that one of the six extra steps fails on a precious late intermediate.
:::
:::
