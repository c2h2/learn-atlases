Nitrogen enters carbon chemistry as ammonia's organic children: amines. They are the basic, nucleophilic, fishy-smelling half of biomolecules — every protein carries one at its N-terminus, every neurotransmitter from dopamine to serotonin is one, and adrenaline names a molecule with an amine in it. This chapter covers the three things an amine chapter must cover: why amines are bases (and why aniline is a thousand-million-fold weaker one), how to make them without the over-alkylation mess, and the diazonium ion — the most reactive species in this course, an aromatic ring with a permanent invitation to leave, which turns aniline into a factory for every other benzene derivative.

## Structure and basicity: nitrogen's lone pair in context

::: definition Amines, pyramidal and flipping {#def-amine-structure}
Amines are $\mathrm{RNH_2}$ (primary), $\mathrm{R_2NH}$ (secondary), $\mathrm{R_3N}$ (tertiary), and quaternary ammonium salts $\mathrm{R_4N^+}$. Nitrogen is $sp^3$-pyramidal with the lone pair in the fourth position, and — for all except bridged and strained cases — the pyramid inverts through a planar ($sp^2$-like) transition state about $10^{10}$ times a second at room temperature ($\Delta G^{\ddagger} \approx 25\ \mathrm{kJ\,mol^{-1}}$ for ammonia), so simple chiral amines cannot be resolved: the two enantiomers fold into each other faster than any bottle can hold them. Quaternary ammonium salts, with four different groups and no lone pair, are configurationally stable — chiral without a stereogenic carbon.
:::

::: proposition What makes an amine basic {#prop-basicity}
Basicity is the stability of the lone pair versus its protonated form. Alkyl groups raise $\mathrm{p}K_\mathrm{a}$ of the conjugate acid (ammonium 9.25; methylamine 10.6; simple alkylamines 10–11) by induction and solvation. Aryl amines collapse: aniline's conjugate acid has $\mathrm{p}K_\mathrm{a}$ 4.6, a factor of $10^6$ weaker base, because the lone pair donates into the ring in the free amine (stabilised there) and that donation is lost on protonation — resonance stabilises the base, not the acid, and does the opposite of what a base wants. Ring substituents obey the aromatic-substitution logic exactly: electron-withdrawing groups at ortho/para positions of aniline drop the $\mathrm{p}K_\mathrm{a}$ further (4-nitroaniline 1.0 — the nitro group pulls the lone pair through the ring), donors raise it (4-methoxyaniline 5.3). Heteroaromatics split: pyridine's lone pair sits in an $sp^2$ orbital outside the aromatic sextet, basic but held tight ($\mathrm{p}K_\mathrm{a}$ 5.2); pyrrole's lone pair *is* the aromatic sextet, and protonating it destroys aromaticity — pyrrole is a ten-thousand-fold weaker base than aniline and protonates on carbon given the chance.
:::

::: example Rank the bases {#ex-basicity-order}
Order for aqueous basicity: ammonia, cyclohexylamine, aniline, 4-nitroaniline, pyridine, guanidine ($\mathrm{p}K_\mathrm{a}$ of conjugate acid 13.6).
::: solution
By conjugate-acid $\mathrm{p}K_\mathrm{a}$: guanidine 13.6 $>$ cyclohexylamine 10.6 $>$ ammonia 9.25 $>$ pyridine 5.2 $>$ aniline 4.6 $>$ 4-nitroaniline 1.0. Guanidine wins because protonation gives the guanidinium cation, whose charge is shared by three nitrogens — protonation *gains* resonance energy, the exact inversion of aniline's tragedy. Cyclohexylamine is a plain aliphatic amine (alkyl donation, no ring to leak into); pyridine is $sp^2$-tight; aniline and 4-nitroaniline are resonance-deactivated in proportion to the ring's electron appetite. The lesson generalises: locate the lone pair — if protonation keeps or gains resonance, the amine is strong; if protonation forfeits resonance, it is weak.
:::
:::

::: example How much is protonated at pH 7.4? {#ex-protonation}
A drug candidate has an aliphatic amine with conjugate-acid $\mathrm{p}K_\mathrm{a}$ 10.0. What fraction is unprotonated (membrane-crossing) in blood of $\mathrm{pH}\ 7.4$?
::: solution
$[\mathrm{BH^+}]/[\mathrm{B}] = 10^{\mathrm{pH}-\mathrm{p}K_\mathrm{a}} = 10^{-2.6} = 2.5\times10^{-3}$, so the unprotonated fraction is $1/(1+398) = 0.25\ \%$. Nine hundred and ninety-seven of every thousand molecules ride the bloodstream as ammonium ions — water-soluble, membrane-impermeant — and the tiny free-base fraction is what crosses membranes and reaches receptors; the same equilibrium re-sets in each compartment. This is why basic drugs concentrate (ion-trap) in acidic urine and why "add a basic amine" is medicinal chemistry's first move for solubility: the plot below shows how brutally the fraction tracks pH.
:::
:::

::: widget plot
f: 1/(1+10^(x-a)); 1/(1+10^(x-(a-6)))
x: 0, 14
y: -0.05, 1.1
sliders: a=10:4:12:1
labels: \text{alkylamine}; \text{arylammonium}
caption: Fraction protonated ($\mathrm{RNH_3^+}$) versus pH for an ammonium ion of $\mathrm{p}K_\mathrm{a}$ set by slider $a$ (alkylamine, 10–11) and one six units lower (arylammonium, aniline-type 4.6). The Henderson–Hasselbalch curve is a switch: each amine is essentially fully protonated two pH units below its $\mathrm{p}K_\mathrm{a}$ and fully free above it. Slide $a$ and watch the alkylamine's switch sit right of blood pH 7.4 (protonated in the body) while the arylamine's sits left (neutral) — the difference between a water-soluble drug salt and a membrane-permeant aromatic amine, drawn as two curves.
:::

## Making amines: four routes and an over-alkylation problem

::: proposition Direct alkylation fails; activation-based routes do not {#prop-amine-synthesis}
Ammonia plus an alkyl halide gives an amine that is *more* nucleophilic than the ammonia that made it (alkyl donation), which alkylates again and again — the reaction stops at the statistical soup of primary, secondary, tertiary and quaternary. The four escapes each dodge that trap differently. **Excess ammonia** (large, alcoholic, sealed tube): statistics favour first alkylation. **Acylation–reduction**: ammonia or an amine + acyl chloride → amide, then $\mathrm{LiAlH_4}$ reduces $\mathrm{C{=}O}$ to $\mathrm{CH_2}$ — the acyl group is a monofunctionalising handle (the amide nitrogen has no second acylation because amides are not nucleophilic), and the product is a clean $1^\circ$, $2^\circ$ or $3^\circ$ amine. **Reductive amination**: carbonyl compound + amine, which condense to the imine (chapter on carbonyl addition), reduced in the same flask by $\mathrm{NaBH_3CN}$ (mild enough to leave the carbonyl alone at $\mathrm{pH}\ 5$) or catalytic hydrogenation — the best general route, because the electrophile is a carbonyl, not an alkyl halide, and over-alkylation is self-limited by imine stoichiometry. **Nitrile reduction**: $\mathrm{RCN} \rightarrow \mathrm{RCH_2NH_2}$ ($\mathrm{LiAlH_4}$ or $\mathrm{H_2}$/catalyst) — one carbon homologation from a halide via cyanide, and the aromatic companion, **nitro reduction** ($\mathrm{ArNO_2} \rightarrow \mathrm{ArNH_2}$: $\mathrm{Fe/HCl}$, $\mathrm{SnCl_2}$, or $\mathrm{H_2/Pd}$), which is how all anilines arrive, straight out of [[organic-2/aromatic-substitution]].
:::

::: example Reductive amination, designed {#ex-reductive-amination}
Give reductive-amination syntheses of (a) $N$-methyl-1-phenylethan-1-amine; (b) the tertiary amine $\mathrm{PhCH_2N(CH_3)CH_2CH_3}$.
::: solution
(a) Benzaldehyde + methylamine $\rightarrow$ the imine $\mathrm{PhCH{=}NCH_3}$ in situ; then $\mathrm{NaBH_3CN}$, $\mathrm{pH}\ 5$ → the amine. (b) The target's three groups on nitrogen are $\mathrm{CH_2Ph}$, $\mathrm{CH_3}$, $\mathrm{C_2H_5}$, so build the tertiary amine by two reductive-amination cycles. Cycle one: benzaldehyde + methylamine → imine, $\mathrm{NaBH_3CN}$ → $N$-methylbenzylamine, a secondary amine. Cycle two: this secondary amine + acetaldehyde → an iminium ion (secondary amines condense to iminium ions, not neutral imines), $\mathrm{PhCH_2N(CH_3){-}CH^+CH_3 \leftrightarrow PhCH_2N^+(CH_3){=}CHCH_3}$, and $\mathrm{NaBH_3CN}$ delivers hydride to the former carbonyl carbon, converting it into a $\mathrm{CH_2}$ and installing the ethyl group: $\mathrm{PhCH_2N(CH_3)CH_2CH_3}$. Each cycle installs exactly one carbon chain — the carbonyl carbon becomes the $\mathrm{CH}$ or $\mathrm{CH_2}$ bonded to nitrogen — so benzaldehyde supplies the $\mathrm{CH_2Ph}$ and acetaldehyde the ethyl, and no quaternary salt ever forms because there is no alkyl halide in the flask.
:::
:::

::: history
The first synthetic antibiotic was an amine — or rather a dye that the body quietly converted into one. In 1932 Gerhard **Domagk** reported that Prontosil, a red azo dye, protected mice against streptococci; in 1935 the Pasteur Institute team of Daniel **Bovet** — Jacques **Tréfouël**, Federico **Nitti** and Jacqueline Bovet — showed that the dye was a prodrug, cleaved in the body to sulfanilamide, a simple aromatic amine that mimics the bacterial growth factor p-aminobenzoic acid and blocks folate synthesis. Sulfa drugs cut wartime mortality from infected wounds dramatically, launched the antibiotic era, and taught medicinal chemistry its founding trick: a drug can be a disguise, and the amine — the group that makes molecules recognisable to enzymes — is where the disguise is worn. Bovet took the 1957 Nobel Prize; Domagk's came in 1939, the year the war the sulfas were meant to lose began.
:::

## The diazonium ion: aniline's second career

::: proposition Diazonium salts: make cold, use warm, lose nitrogen {#prop-diazonium}
Primary aromatic amines + nitrous acid (generated from $\mathrm{NaNO_2}$ in aqueous mineral acid) at $0\text{–}5\ \mathrm{^\circ C}$ give **arenediazonium ions** $\mathrm{ArN_2^+}$; aliphatic primary amines give the same ions only fleetingly — they fall apart at once through aryl-like cations into rearranged, scrambled mixtures (synthetic deamination: the amino group as a traceless placeholder). The aromatic ion survives cold because its positive charge is shared with nitrogen's triple bond and the ring, but it is still an electrophile with $\mathrm{N_2}$ — the best leaving group in chemistry — attached, and this is the whole point. Substitutions run by ionic (Sandmeyer) or radical (Gomberg–Bachmann, Sandmeyer variants) pathways: $\mathrm{CuCl}$, $\mathrm{CuBr}$, $\mathrm{CuCN}$ install $\mathrm{Cl}$, $\mathrm{Br}$, $\mathrm{CN}$; $\mathrm{KI}$ installs I without copper; warming with water installs OH (via the cation, so rearrangements and by-products appear); $\mathrm{HBF_4}$ precipitates the tetrafluoroborate, which on heating gives $\mathrm{ArF}$ (Schiemann) — fluorobenzene, unreachable by any Friedel–Crafts logic. Azo coupling: diazonium ions are mild enough electrophiles that activated rings (phenols, arylamines, at mildly basic pH) attack *their* terminal nitrogen, giving coloured $\mathrm{Ar{-}N{=}N{-}Ar'}$ dyes — the azo dyes, and the chemistry behind every diazonium test strip for phenols. Secondary amines + nitrous acid give $N$-nitrosamines ($\mathrm{R_2N{-}N{=}O}$), neutral, fat-soluble, and famously carcinogenic after metabolic activation — the nitrosamine problem of cured meats and, in 2020, of several sartan drugs.
:::

::: example The diazonium detour {#ex-sandmeyer}
Give a synthesis of 1-bromo-3-chlorobenzene from aniline, and explain why no direct route works.
::: solution
The two halogens sit *meta*, and halogens are ortho/para directors — so no sequence of direct electrophilic substitutions on a halobenzene can ever build this skeleton. The meta relationship must be established while a meta director is on the ring, and the only useful meta-directing handle that can later become a halogen is the nitro group, via its amine. Route: aniline $\rightarrow$ diazotise ($\mathrm{NaNO_2/HCl}$) and reduce with hypophosphorous acid ($\mathrm{H_3PO_2}$) $\rightarrow$ benzene (the amino group's first job: leaving as $\mathrm{N_2}$); nitrate ($\mathrm{HNO_3/H_2SO_4}$) $\rightarrow$ nitrobenzene; chlorinate ($\mathrm{Cl_2/FeCl_3}$) $\rightarrow$ 1-chloro-3-nitrobenzene — the nitro group's meta direction is the load-bearing step; reduce ($\mathrm{Fe/HCl}$) $\rightarrow$ 3-chloroaniline; diazotise, then $\mathrm{CuBr}$ (Sandmeyer) $\rightarrow$ 1-bromo-3-chlorobenzene. The amino group's superpower is not only that $\mathrm{NH_2}$ becomes $\mathrm{Cl}$, $\mathrm{Br}$, $\mathrm{I}$, $\mathrm{CN}$, $\mathrm{OH}$ or $\mathrm{F}$ on demand — it is that an amine can be *uninstalled* and *reinstalled as a different group*, letting the nitro group do the meta-directing and the diazonium do the replacing.
:::
:::

::: example An azo dye, quantitatively {#ex-azo-dye}
Methyl orange is made from sulfanilic acid (4-aminobenzenesulfonic acid), sodium nitrite, hydrochloric acid, and $N,N$-dimethylaniline. Give the two steps and say which ring is the electrophile and which the nucleophile.
::: solution
Step 1: sulfanilic acid + $\mathrm{NaNO_2/HCl}$ at $0\ \mathrm{^\circ C}$ → the diazonium salt (the sulfonic acid keeps it water-soluble). Step 2: add $N,N$-dimethylaniline — the *nucleophile*, its strongly donating $\mathrm{NMe_2}$ group activating the ring toward attack at the diazonium nitrogen (para to $\mathrm{NMe_2}$, the position open) — azo coupling gives the red zwitterionic dye, orange in acid when the azo nitrogen protonates. Electrophile: the diazonium (terminal N is the acceptor atom); nucleophile: the activated ring. The coupling is electrophilic aromatic substitution with an unusual electrophile — the same $\mathrm{S_EAr}$ skeleton of the aromatic-substitution chapter, and the reason azo dyes are made in ice baths at slightly basic pH for phenols (phenoxide, more nucleophilic) and mildly acidic for arylamines.
:::
:::

::: warning Three amine hazards {#warn-amine-traps}
**(1)** Direct alkylation of ammonia or amines over-alkylates — if the synthesis says "$\mathrm{RBr}$, $\mathrm{NH_3}$", expect the mixture; if it says "reductive amination" or "acylation–reduction", expect a product. **(2)** Diazonium solutions explode when dry: make them cold, use them cold-to-warm in solution, never isolate unless the procedure says otherwise (the $\mathrm{BF_4^-}$ salt for Schiemann is the deliberate exception, and it is filtered and used wet). **(3)** $N$-nitrosamines form wherever secondary amines meet nitrite (stomach chemistry, cured food, drug-substance impurities — the sartan recalls of 2018–19); a secondary amine in a process route is a nitrosamine risk assessment, full stop.
:::

::: quiz
Which reagent sequence converts aniline to fluorobenzene?
- [x] $\mathrm{NaNO_2/HCl}$, $0\ \mathrm{^\circ C}$; then $\mathrm{HBF_4}$, isolate, warm
- [ ] $\mathrm{NaNO_2/HCl}$, $0\ \mathrm{^\circ C}$; then $\mathrm{CuF}$
- [ ] $\mathrm{F_2}$ at low temperature
- [ ] $\mathrm{NaNO_2/HCl}$; then $\mathrm{KF}$ in water
::: solution
The Schiemann reaction: diazotise, precipitate the sparingly soluble diazonium tetrafluoroborate, and warm — it decomposes to $\mathrm{ArF}$ with $\mathrm{BF_3}$ and $\mathrm{N_2}$. There is no useful "$\mathrm{CuF}$" Sandmeyer, and $\mathrm{F_2}$ destroys rings; aqueous fluoride on a diazonium gives phenols, not fluorides.
:::
:::

## Where this leads

The amine's lone pair is the nucleophile of the Mannich and Strecker reactions of the synthesis course, the basic site that tunes drug solubility (the plot above), and the handle for resolution — enantiomeric amines become separable diastereomeric salts with tartrate or camphorsulfonate, the classical resolution that still makes single-enantiomer drugs. Amines and their diazonium derivatives feed the azo and heteroaromatic chemistry of [[organic-2/heterocycles]]; imine chemistry returns in enzyme catalysis and in [[organic-2/condensations]]; and the nitro group's placeholder logic — install, then transform — is the aromatic-substitution chapter's most-used corollary, [[organic-2/aromatic-substitution]].

::: summary
- Amines are pyramidal, inversion-flipping bases; quaternary ammonium salts are configurationally stable and chiral without carbon stereocentres.
- Basicity reads the lone pair's fate: alkyl amines $\mathrm{p}K_\mathrm{a} \approx 10$–$11$; anilines lose $10^6$-fold to ring resonance (4-nitroaniline 1.0); pyridine is $sp^2$-tight (5.2), pyrrole is not basic at all; guanidine is superbasic because its cation gains resonance.
- Protonation state is a Henderson–Hasselbalch switch: a $\mathrm{p}K_\mathrm{a}$ 10 amine is $99.6\ \%$ ammonium at blood pH — the basis of drug solubility, permeation, and ion trapping.
- Four clean syntheses dodge over-alkylation: excess ammonia, acylation–reduction, reductive amination (the best), and nitrile/nitro reduction (the aromatic route).
- Arenediazonium ions ($\mathrm{ArN_2^+}$, $0\text{–}5\ \mathrm{^\circ C}$) replace $\mathrm{N_2}$ with $\mathrm{Cl}$, $\mathrm{Br}$, $\mathrm{I}$, $\mathrm{CN}$, $\mathrm{OH}$, $\mathrm{F}$ (Schiemann) or couple to azo dyes; aliphatic diazonium ions scramble — synthetic deamination.
- Secondary amines + nitrite give nitrosamines: handle them as the carcinogen they are.
:::

## Exercises

::: exercise Classify and rank {level=1}
Classify each amine as $1^\circ$, $2^\circ$, $3^\circ$ or quaternary, and rank the first three by basicity: ethylamine, diethylamine, triethylamine, tetraethylammonium bromide.
::: solution
Ethylamine $1^\circ$, diethylamine $2^\circ$, triethylamine $3^\circ$, tetraethylammonium bromide quaternary (a salt, no lone pair, not a base at all). Basicity in water: diethylamine (11.0) $>$ ethylamine (10.6) $\approx$ triethylamine (10.7) — the three are close because alkyl donation raises basicity while bulk and reduced solvation of the ammonium pull it back; the ordering is the classic aqueous compromise, not a clean induction series.
:::
:::

::: exercise Nitro to amine {level=1}
Give two reagent sets for reducing 4-nitrotoluene to $p$-toluidine, and one functional group that survives $\mathrm{H_2/Pd}$ and one that does not.
::: solution
$\mathrm{Fe/HCl}$ then base workup, or $\mathrm{H_2}$ (1–3 atm), $\mathrm{Pd/C}$. A nitro group is reduced cleanly in the presence of esters and alcohols; a benzyl or allyl group (hydrogenolysis) and a halogen on the ring (hydrodehalogenation, especially iodine and bromine) do not survive catalytic hydrogenation — choose $\mathrm{Fe/HCl}$ or $\mathrm{SnCl_2}$ when those are present.
:::
:::

::: exercise Which amine, which route {level=1}
Choose among direct alkylation with excess ammonia, acylation–reduction, and reductive amination for: (a) heptan-1-amine from 1-bromohexane? — from 1-bromopentane plus one carbon? answer the simple version: from 1-bromohexane; (b) diphenylamine $\mathrm{Ph_2NH}$ from aniline; (c) tripropylamine from propylamine.
::: solution
(a) Direct alkylation with *flooded* excess ammonia — the one case statistics handles, ammonia being cheap and easy to use in ten-fold excess; the nitrile route would add a carbon and give the wrong chain. (b) Acylation–reduction: aniline + benzoyl chloride → benzanilide (amides are not nucleophilic, so no second acylation), then $\mathrm{LiAlH_4}$ reduces the carbonyl to $\mathrm{CH_2}$ → $\mathrm{Ph_2NH}$. (c) Reductive amination, twice: propylamine + propanal → iminium, reduce → dipropylamine; propanal again, reduce → tripropylamine. Direct alkylation in any of the three gives the statistical soup.
:::
:::

::: exercise Meta by amine logic {level=2}
Give a synthesis of 3-bromoaniline from benzene, and say which step's directing effect makes the whole thing work.
::: solution
Benzene $\rightarrow$ nitrate ($\mathrm{HNO_3/H_2SO_4}$) → nitrobenzene $\rightarrow$ brominate ($\mathrm{Br_2/FeBr_3}$) → 1-bromo-3-nitrobenzene (the nitro group's meta direction is the load-bearing step) $\rightarrow$ reduce ($\mathrm{Fe/HCl}$, or $\mathrm{H_2/Pd}$ with care) → 3-bromoaniline. Reversing the order (brominate, then nitrate) gives ortho/para bromonitrobenzenes — the same two-step pair as the aromatic-substitution chapter's exercise, now with the reduction as the third act.
:::
:::

::: exercise Diazonium menu {level=2}
From 4-bromoaniline, give conditions for each product: (a) 1-bromo-4-iodobenzene; (b) 4-bromophenol; (c) 4-bromobenzonitrile; (d) 1-bromo-4-fluorobenzene.
::: solution
All start $\mathrm{NaNO_2/HCl}$ (or $\mathrm{HBF_4}$ for d), $0\text{–}5\ \mathrm{^\circ C}$. (a) then $\mathrm{KI}$ solution, warm — iodine needs no copper. (b) then water, warm — via the aryl cation, so expect some tar; dilute acid, slow warm. (c) then $\mathrm{CuCN}$ (Sandmeyer; the Cu(I) route — and mind the cyanide safety). (d) $\mathrm{NaNO_2/HBF_4}$, precipitate the $\mathrm{BF_4^-}$ salt, dry carefully, warm — Schiemann. The amino group has become I, OH, CN, F without ever touching the ring's other positions.
:::
:::

::: exercise Resolution {level=2}
Racemic 1-phenylethan-1-amine must be delivered as the $(S)$-enantiomer. Give the classical resolution and explain why it works when direct distillation or chromatography of the enantiomers fails.
::: solution
Treat the racemate with one equivalent of an enantiopure acid — $(R,R)$- or $(S,S)$-tartaric acid, or camphorsulfonic acid — in a solvent where the two diastereomeric salts differ in solubility; crystallise the less soluble salt repeatedly (fractional crystallisation), liberate the free amine with base, extract. It works because enantiomers have identical physical properties in achiral environments (distillation and silica are achiral), while diastereomeric *salts* are different compounds with different lattices, solubilities, and melting points — the chiral acid converts an unresolvable pair into a separable one, and is recovered in the mother liquor. The same trick, run on scale, still ships single-enantiomer drugs.
:::
:::

::: exercise Deamination forensics {level=3}
Pentan-1-amine with nitrous acid gives a mixture of pentan-2-ol, pentan-3-ol, and rearranged products, with little pentan-1-ol. Explain, and say what synthetic use the mess still has.
::: solution
The aliphatic diazonium ion loses $\mathrm{N_2}$ as, or just before, water attacks: the pentyl cation forms at C1, then hydride-shifts down the chain (C1 → C2 → C3) faster than capture, so water traps the equilibrium mixture of secondary cations — alcohols at C2 and C3, plus alkenes from elimination and any skeletal rearrangements the cation fancies. The synthetic use: **synthetic deamination** — the amino group, made from a ketone by reductive amination, can be removed with rearrangement information, and in rigid ring systems the cation can be trapped before it rearranges, letting $\mathrm{NH_2}$ serve as a placeholder for H or OH at positions that radicals and anions refuse. The mess is the mechanism's signature, exactly as benzyne scrambling was.
:::
:::

::: exercise Ion trapping, quantified {level=3 check="99.7" hint="Use [BH+]/[B] = 10^(pH - pKa); the answer is a percentage"}
A weak base with conjugate-acid $\mathrm{p}K_\mathrm{a}$ 8.0 is in plasma ($\mathrm{pH}\ 7.4$) and in urine ($\mathrm{pH}\ 5.4$). What percentage is protonated in urine, and why does acidifying urine speed the drug's clearance?
::: solution
For a base, $[\mathrm{BH^+}]/[\mathrm{B}] = 10^{\mathrm{p}K_\mathrm{a}-\mathrm{pH}}$. Urine: $10^{8.0-5.4} = 10^{2.6} = 398$, so the protonated fraction is $398/399 = 99.7\ \%$. Plasma: $10^{8.0-7.4} = 10^{0.6} = 4.0$, so $4.0/5.0 = 80\ \%$ protonated. Acidifying urine converts the free-base fraction into the charged ammonium, which cannot cross back through the tubule membrane: the drug is trapped in the bladder and cleared — ion trapping, the same equation as the earlier example, run in reverse to save lives in overdose clinics.
:::
:::
