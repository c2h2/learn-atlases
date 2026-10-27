In 1828 Friedrich Wöhler made urea from ammonium cyanate and showed that an "organic" compound could be made from inorganic starting materials. A century and a half later, Robert Burns Woodward and Albert Eschenmoser, with about a hundred co-workers over twelve years, completed vitamin B₁₂, a molecule with nine stereocentres on a corrin ring around a cobalt atom. Today chemists make molecules such as paclitaxel (Taxol), with its strained eight-membered ring and eleven stereocentres, and the anticancer drug eribulin, a simplified analogue of the marine natural product halichondrin B, is manufactured by a sequence of more than sixty steps. **Total synthesis** — the complete chemical synthesis of a complex natural product from simple, commercially available starting materials — has been the proving ground of organic chemistry for two centuries.

Why make a molecule that a sponge or a tree already makes? Historically, synthesis **proved structures**: before X-ray crystallography and NMR, a structure was not certain until it had been made. It still corrects misassigned structures today. Synthesis **supplies** compounds that nature provides only in tiny amounts, and makes **analogues** that nature does not make at all, so that biological activity can be studied and improved. Above all, it **drives the invention of methods**: many of the reactions of the previous chapters — the Woodward–Hoffmann rules, the Sharpless and Evans methods, much of cross-coupling and metathesis — were discovered or refined because a synthesis needed them. This final chapter asks how a complex synthesis is planned and judged. We define the measures (step count, longest linear sequence, ideality), survey the main strategic ideas (convergence, cascade and biomimetic reactions, symmetry, stereocontrol), and study landmark syntheses that show the tools of this course working together.

## Measuring a synthesis {#sec-measures}

::: definition Step, longest linear sequence and overall yield {#def-lls}
A **step** is one reaction (or one-pot sequence of reactions) followed by isolation or work-up of an intermediate. The **step count** of a synthesis is the total number of steps from commercially available starting materials. The **longest linear sequence** (LLS) is the largest number of steps through which any one atom of the target passes, i.e. the longest path in the synthetic tree from a commercial starting material to the target. The **overall yield** is usually quoted along the LLS, as the product of the yields of its steps ([[organic-synthesis/retrosynthesis#prop-convergent]]). A **formal synthesis** stops at an intermediate that has previously been converted into the target by others; a **relay synthesis** uses material obtained by degrading the natural product to complete part of the route.
:::

Step count matters because yields multiply and because each step costs time, solvent and purification. But steps are not all equal. James Hendrickson (1975) defined an **ideal synthesis** as one that uses only **construction reactions** (those forming skeletal C–C bonds), starting from compounds that already have the right functional groups, with no functional-group adjustments, no protection and no oxidation-level changes that are later reversed. Tanja Gaich and Phil Baran (2010) made this quantitative.

::: definition Percentage ideality {#def-ideality}
For a synthesis of $N$ steps, of which $n_\mathrm{c}$ are **construction** reactions (skeletal C–C or C–heteroatom bond formation) and $n_\mathrm{sr}$ are **strategic redox** reactions (oxidations or reductions that directly install a functional group present in the target, with the correct oxidation state), the percentage ideality is
$$
\text{ideality} = \frac{n_\mathrm{c} + n_\mathrm{sr}}{N} \times 100\,\%.
$$ {#eq-ideality}
Non-strategic steps are protections, deprotections, functional-group interconversions that do not change the skeleton or set a final oxidation state, and redox steps that are later undone. Ideality is a heuristic measure of efficiency; like atom economy, it ignores yield, cost and safety.
:::

::: example Scoring a route {#ex-ideality}
A 12-step synthesis contains six C–C bond-forming steps, two oxidations that install the target's final ketone and alcohol, two protections, one deprotection and one reduction of an ester to an aldehyde that is immediately used in an olefination. Calculate its ideality. Which steps would a more ideal route try to remove?
::: solution
Construction steps: 6. Strategic redox: 2 (both set final oxidation states). The ester-to-aldehyde reduction prepares a group for the next construction step but is not itself strategic — the oxidation level has been changed only to enable the olefination — so it counts as non-strategic, along with the two protections and the deprotection. Ideality $= (6 + 2)/12 \times 100\,\% = 66.7\,\%$ ([[#eq-ideality]]). A better route would avoid the protecting groups by ordering steps so that the sensitive groups are introduced after the conflicting reactions ([[organic-synthesis/protecting-groups#alg-pg]]), and would bring the olefination partner in at the aldehyde oxidation level from the start (for example from a commercial aldehyde or by a direct method such as a DIBAL-H reduction of a Weinreb amide used in a combined step).
:::
:::

::: widget plot
f: 1/p^x; 1/q^x
x: 1, 40
y: 0, 100
sliders: p=0.9:0.7:0.99:0.01; q=0.8:0.5:0.99:0.01
labels: \text{per-step yield } p; \text{per-step yield } q
caption: The **material multiplier** $1/p^n$ — moles of first starting material needed per mole of target — against the length $n$ of the longest linear sequence, for two per-step yields $p$ and $q$. With $p = 0.90$ a 20-step sequence needs 8.2 mol of starting material per mole of product; with $q = 0.80$ the same length needs 87 mol, and a 25-step sequence 265 mol. This exponential is why a long synthesis that works on milligram scale is unusable for supply, and why process routes to medicines have short longest linear sequences, high-yielding steps and crystalline intermediates. It is also the strongest argument for convergence: halving the LLS takes the square root of the multiplier.
:::

## Strategic ideas {#sec-strategy}

Beyond the basic algorithm of [[organic-synthesis/retrosynthesis#alg-retro]], several strategic ideas recur in the best syntheses.

- **Convergence.** Make large fragments separately and join them late ([[organic-synthesis/retrosynthesis#prop-convergent]]). Reliable fragment couplings — cross-couplings, Nozaki–Hiyama–Kishi reactions, HWE olefinations, esterifications and macrolactonisations, metathesis — are the hinges of convergent syntheses.
- **Key reactions that build complexity.** A Diels–Alder reaction, a polyene cyclisation, a radical or cationic cascade or a $[3,3]$ shift may form several bonds, rings and stereocentres in one step ([[organic-synthesis/pericyclic]], [[organic-synthesis/rearrangements-radicals]]). Planning often starts by recognising the retron of such a reaction in the target.
- **Biomimetic synthesis.** Reproducing in the flask a step that nature uses — the cation-initiated polyene cyclisations that make steroids and terpenes, the oxidative couplings of phenols, the intramolecular Diels–Alder reactions proposed in some biosyntheses.
- **Symmetry and two-directional synthesis.** A target with hidden symmetry can be made by elaborating both ends of a symmetrical intermediate at once, halving the number of operations.
- **Stereochemical strategy.** Decide early how each stereocentre will be set — chiral pool, auxiliary, catalyst or substrate control — and in what order, so that each new centre can be controlled by the previous ones ([[organic-synthesis/stereoselective-synthesis]]).
- **Protecting-group minimisation and redox economy** (Baran, Hoffmann; "step economy", Paul Wender): avoid steps that do not build the target.
- **Function-oriented and diverted synthesis** (Wender; Samuel Danishefsky): when the aim is biological activity, make simpler analogues that keep the essential features (the "pharmacophore"), or branch from a late intermediate to make many analogues.

::: algorithm Planning a total synthesis {#alg-total}
1. **Analyse the target**: ring system, stereocentres, functional groups, sensitive features (strained rings, labile esters, conjugated polyenes), symmetry, and any biosynthetic clues.
2. **Identify strategic bonds and key reactions**: disconnections that simplify the ring system most, reveal retrons of complexity-building reactions, and split the molecule into fragments of similar size.
3. **Plan the stereochemical sequence**: which stereocentres can be set by available methods, which can relay control to their neighbours, and where the absolute configuration comes from.
4. **Order the steps** so that sensitive groups appear late and conflicts are minimised; choose protecting groups and their removal sequence ([[organic-synthesis/protecting-groups#alg-pg]]).
5. **Evaluate the plan**: LLS, expected overall yield, ideality, availability and hazards of reagents. Compare alternatives.
6. **Test the riskiest steps first** on model compounds, and keep fall-back disconnections in reserve: most syntheses are re-planned several times as unexpected chemistry is encountered.
:::

## Case studies {#sec-cases}

The following syntheses are classics of the field, discussed in detail in Nicolaou and Sorensen's *Classics in Total Synthesis*. We concentrate on their strategy rather than on reagents and conditions.

### Reserpine (Woodward, 1956): a Diels–Alder reaction sets the stage

Reserpine, an indole alkaloid from *Rauvolfia* species once widely used to treat high blood pressure, has six stereocentres, five of them on its E ring. Woodward's insight was that a **Diels–Alder reaction** between 1,4-benzoquinone and methyl (*E*)-penta-2,4-dienoate would form a *cis*-fused bicyclic adduct with three contiguous stereocentres in the correct relative configuration, as dictated by the suprafacial, endo-selective cycloaddition ([[organic-synthesis/pericyclic#ex-endo]]). The rigid, folded bicyclic framework then served as a template: reagents attacked from its convex face, so that further stereocentres were installed by substrate control. Later, the ring system was cleaved and reorganised to create the E ring with all its substituents in place before it was joined to the indole-containing part.

::: example Stereocentres from a Diels–Alder reaction {#ex-reserpine}
Explain why the Diels–Alder adduct of 1,4-benzoquinone and methyl (*E*)-penta-2,4-dienoate has three new stereocentres with a defined relative configuration, and why a bicyclic intermediate is useful for setting further stereocentres.
::: solution
**New stereocentres.** The quinone C=C (dienophile) adds to C2 and C5 of the dienoate (which carries the ester at C1 attached to C2, and C5 at the terminal $\mathrm{CH_2}$). The two ring-fusion carbons (former quinone CH carbons) become stereocentres, as does the diene carbon that carries the ester group. Suprafacial addition to the dienophile makes the ring fusion necessarily *cis* (both hydrogens from the quinone C=C remain on the same face). The *endo* orientation — the quinone carbonyls beneath the diene in the transition state — fixes the relationship between the ring fusion and the ester-bearing carbon: by the endo rule, the ester (an "outside" substituent of the (*E*)-diene) ends up *cis* to the endo substituents of the dienophile — the quinone ring carbons — and therefore on the face opposite to the ring-fusion hydrogens. So three stereocentres form in one step, with their relative configuration fixed by mechanism.

**Bicyclic control.** The *cis*-fused bicyclic system is folded like a half-open book. Reagents approaching its remaining double bonds and carbonyl groups attack from the open, convex face rather than the concave face, so new stereocentres are set relative to the existing ones with high selectivity — a predictable way to install the remaining E-ring stereocentres before the ring is unfolded.
:::
:::

### Prostaglandin F₂α (Corey, 1969): a branch-point intermediate

Prostaglandins are hormone-like lipids with a cyclopentane ring bearing two side chains *trans* to each other and up to four stereocentres. Corey's route was built around a single, versatile intermediate, now called the **Corey lactone** (or, after oxidation, the Corey aldehyde), from which several prostaglandins could be made — an early example of a "branch-point" strategy. In outline:

1. A **Diels–Alder reaction** of a 5-substituted cyclopentadiene with 2-chloroacrylonitrile (a "ketene equivalent", since the chloronitrile carbon is later hydrolysed to a ketone) built a bicyclo[2.2.1]heptane with the substituent and new bonds in a defined relationship.
2. Conversion to the bicyclic ketone and a **Baeyer–Villiger oxidation** inserted oxygen, with retention at the migrating carbon, to give a lactone ([[organic-synthesis/redox-in-synthesis#prop-aptitude]]).
3. Hydrolysis and **iodolactonisation** (the carboxylate attacking an iodonium ion formed on the ring alkene, from the face opposite to the iodine) set two further stereocentres and formed the γ-lactone.
4. Radical **deiodination** with tributyltin hydride ([[organic-synthesis/rearrangements-radicals]]) and adjustment of protecting groups and oxidation levels gave the Corey aldehyde.
5. The lower side chain was attached by an **HWE olefination** (giving the (*E*)-enone), and the upper side chain by a **Wittig reaction** with a non-stabilised ylide (giving the (*Z*)-alkene), after reduction of the lactone to the lactol with DIBAL-H ([[organic-synthesis/carbon-carbon-bonds]]).

The route shows nearly every theme of this course: pericyclic construction, a rearrangement with retention, a stereospecific cyclisation, radical reduction, chemoselective hydride reduction, and two complementary olefinations chosen for their alkene geometry. Its main weakness, the reduction of the C15 ketone to the (*S*)-alcohol with modest selectivity, later stimulated Corey's development of the enantioselective CBS reduction ([[organic-synthesis/stereoselective-synthesis]]).

::: widget graph
nodes: diene@0,4; chloroacrylonitrile@2,4; DA adduct@1,3; bicyclic ketone@1,2; lactone@1,1; iodolactone@1,0; Corey aldehyde@1,-1; phosphonate@3,-1; enone@1,-2; lactol@1,-3; ylide@3,-3; PGF2α@1,-4
edges: diene>DA adduct; chloroacrylonitrile>DA adduct; DA adduct>bicyclic ketone; bicyclic ketone>lactone; lactone>iodolactone; iodolactone>Corey aldehyde; Corey aldehyde>enone; phosphonate>enone; enone>lactol; lactol>PGF2α; ylide>PGF2α
algorithm: topo
caption: The skeleton of Corey's 1969 prostaglandin F₂α synthesis as a directed acyclic graph (protecting-group and oxidation-level steps between the main intermediates are merged into single arrows). Inputs are the substituted cyclopentadiene, 2-chloroacrylonitrile, the HWE phosphonate for the lower side chain and the phosphonium ylide for the upper one. Run the topological sort: it lists one valid order in which the steps can be carried out, and shows that the two side-chain reagents can be prepared at any time before they are needed — a mildly convergent route around a linear core. The Corey aldehyde is the branch point from which other prostaglandins were made by changing the side-chain reagents.
:::

### Progesterone (W. S. Johnson, 1971): a biomimetic polyene cyclisation

In nature, the four rings of steroids are formed from the acyclic triterpene oxidosqualene in a single enzymatic cascade of cation–alkene additions. Gilbert Stork and Albert Eschenmoser had independently proposed (1955) that such cyclisations proceed through chair-like conformations and that *trans* alkenes give *trans*-fused rings. William S. Johnson's laboratory turned this into a laboratory method. In the progesterone synthesis, an acyclic precursor carrying a cyclopentenol at one end (the cation initiator), two *trans*-trisubstituted alkenes in the middle and an alkyne at the other end (the terminator) was treated with acid. Ionisation of the allylic alcohol gave an allylic cation; each alkene in turn attacked the cation formed by the previous step, closing three new rings in one operation with the correct *trans*-anti-*trans* ring fusions, and the alkyne closed the five-membered D ring, capturing the last cation as a vinyl cation that was trapped by the solvent system and later revealed as the acetyl side chain of progesterone. Ozonolysis and an intramolecular aldol condensation then completed the A ring.

::: example How a polyene cascade controls stereochemistry {#ex-polyene}
Explain, using the Stork–Eschenmoser hypothesis, why a *trans*-alkene in a polyene cyclisation leads to a *trans* ring fusion, and why the reaction can form several stereocentres with one relative configuration.
::: solution
In the cascade, a cation adds to the nearest alkene through a chair-like transition state; the alkene's π electrons form the new C–C bond, and the positive charge moves to the alkene's other (more substituted) carbon, which then becomes the electrophile for the next alkene. Addition to the alkene is effectively *anti* across the double bond: the cation attacks one face of the alkene and the next alkene, held by the chain on the opposite face, attacks the new cation from that face. For a *trans*-disubstituted (or trisubstituted) alkene in a chair, the substituents at the two alkene carbons end up equatorial and on opposite faces — that is, the two hydrogens or alkyl groups at the new ring junction are *trans*. Because each new ring forms in a chair whose geometry is dictated by the alkene geometry and by the previous ring, the relative configuration of every new stereocentre is fixed: with all-*trans* alkenes the result is the all-*trans*-anti ring fusion of natural steroids. The only stereochemical decision not fixed by mechanism is the absolute configuration, which follows the configuration of the initiating cyclopentenol (one stereocentre controls all the others: *substrate control at a distance*). Johnson's 1971 synthesis used racemic material and so gave racemic progesterone; using an enantioenriched initiator gives one enantiomer.
:::
:::

### Quinine: synthesis as proof, and the burden of proof

Quinine, the antimalarial alkaloid from cinchona bark, has a long synthetic history. In 1944 Woodward and William von Eggers Doering made a compound, quinotoxine, which Paul Rabe and Karl Kindler had reported converting into quinine in 1918. The Woodward–Doering work was therefore a **formal synthesis**, dependent on a 1918 transformation that had been described only briefly. Gilbert Stork published the first fully stereoselective total synthesis of quinine in 2001 and questioned whether the 1918 conversion had worked as described; in 2007–08 Aaron Smith and Robert Williams repeated the Rabe–Kindler procedure from the original description and showed that it does give quinine, validating the formal synthesis. The episode illustrates a general point: a synthesis claim stands on the reproducibility of every step, including those in older literature, and on characterisation of the final product against authentic material.

### Taxol and the problem of supply

Paclitaxel (Taxol), isolated from the bark of the Pacific yew and approved as an anticancer drug in 1992, could not be supplied from bark without destroying many trees. Robert Holton's and K. C. Nicolaou's groups both reported total syntheses in 1994, Nicolaou's by a convergent route joining two six-membered ring fragments and closing the eight-membered ring with a McMurry coupling, Holton's by a linear route from a terpene of the chiral pool. Neither was practical for production: supply came from **semisynthesis** from 10-deacetylbaccatin III, extracted from the needles of the renewable European yew, and later from **plant-cell fermentation**. Total synthesis instead contributed understanding of structure–activity relationships and new methods. By contrast, the halichondrin analogue **eribulin** (Eisai, approved in 2010) is made entirely by synthesis, building on Yoshito Kishi's total synthesis of halichondrin B (1992) and its use of the Nozaki–Hiyama–Kishi coupling, because no natural source could supply it.

::: example A short synthesis of a terpene fragrance {#ex-terpineol}
α-Terpineol, 2-(4-methylcyclohex-3-en-1-yl)propan-2-ol, is a monoterpene alcohol with a lilac scent. Propose a two-step racemic synthesis from 2-methylbuta-1,3-diene (isoprene) and methyl prop-2-enoate (methyl acrylate), and evaluate it by the measures of this chapter.
::: solution
**Retrosynthesis.** The tertiary alcohol $\mathrm{{-}C(CH_3)_2OH}$ disconnects (two identical methyl groups) to an ester plus two equivalents of $\mathrm{CH_3MgBr}$ ([[organic-synthesis/retrosynthesis#ex-grignard]]). The ester, methyl 4-methylcyclohex-3-ene-1-carboxylate, is a cyclohexene — the Diels–Alder retron — with the methyl and ester in a 1,4 ("*para*") relationship, as expected from a 2-substituted diene and a monosubstituted dienophile ([[organic-synthesis/pericyclic]]).

**Forward.** (1) Isoprene + methyl acrylate, heated (or with a Lewis acid catalyst for higher "*para*" selectivity and lower temperature): methyl 4-methylcyclohex-3-ene-1-carboxylate. The methyl donor at C2 of the diene enlarges the HOMO coefficient at C1, which bonds to the acrylate's β-carbon (largest LUMO coefficient), placing the ester 1,4 to the methyl. (2) Excess methylmagnesium bromide: the first equivalent adds to the ester carbonyl and expels methoxide, giving the methyl ketone, which is attacked faster by the second equivalent; acid work-up gives racemic α-terpineol.

**Evaluation.** Two steps, both construction reactions: ideality $100\,\%$. Atom economy of the Diels–Alder step $100\,\%$. The product is racemic; natural α-terpineol occurs as both enantiomers, so for fragrance use the racemate is acceptable. An enantioselective version could use a chiral Lewis acid catalyst in step 1 ([[organic-synthesis/stereoselective-synthesis]]). (Industrially, α-terpineol is made from pinene, a chiral-pool terpene, by acid-catalysed hydration — a cationic ring opening — which illustrates that the "best" route depends on the cheapest available feedstock.)
:::
:::

::: quiz
A synthesis makes fragment A in 9 steps and fragment B in 6 steps, joins them, and then takes 4 more steps to the target. Which statements are true?
- [x] The longest linear sequence is 14 steps (9 + 1 coupling + 4).
- [x] The total step count is 20.
- [ ] The overall yield should be quoted along fragment B's branch, because it is shorter.
- [ ] The synthesis would be more convergent if fragment B were made in 3 steps and fragment A in 12.
::: solution
LLS $= 9 + 1 + 4 = 14$; total $= 9 + 6 + 1 + 4 = 20$. The overall yield is conventionally quoted along the LLS (the longest branch). Making the fragments more unequal (12 and 3) lengthens the LLS to 17 and makes the route *less* convergent; convergence is greatest when fragments are of similar complexity and the coupling is late.
:::
:::

::: warning A synthesis is only as good as its structure proof and its reproducibility {#warn-claims}
Two cautions apply to every synthesis claim. First, **the target's structure may be wrong**: many natural products have been misassigned, and the synthesis of the proposed structure then gives a compound whose spectra do not match. A famous case is hexacyclinol, whose originally proposed structure was claimed to have been synthesised in 2006; Scott Rychnovsky predicted by NMR calculations that the structure was wrong, and John Porco's group synthesised the revised structure, confirmed by X-ray crystallography, later that year. Comparison of the synthetic and natural materials — NMR, optical rotation, chromatography — is part of the proof. Second, **a claim depends on every step**, including steps borrowed from the literature (as in formal and relay syntheses), so full experimental details and characterisation data must be reported. Step counts and ideality are useful measures, but a short synthesis that cannot be repeated is worth less than a long one that can.
:::

::: history
Wöhler's urea (1828) and Hermann Kolbe's synthesis of acetic acid from carbon disulfide (1845) showed that organic compounds could be made from inorganic ones; William Henry Perkin's attempt to make quinine in 1856 produced the dye mauveine instead and founded the synthetic dye industry. Emil Fischer synthesised glucose and its isomers around 1890 (Nobel Prize 1902), and Robert Robinson's work on alkaloids and steroids earned him the 1947 Nobel Prize. Robert Burns Woodward transformed the field with syntheses of quinine (formal, 1944, with Doering), cholesterol and cortisone (1951), reserpine (1956), chlorophyll (1960) and vitamin B₁₂ (with Eschenmoser, completed 1972), and received the 1965 Nobel Prize "for his outstanding achievements in the art of organic synthesis". William S. Johnson's biomimetic polyene cyclisations (1960s–70s), E. J. Corey's systematic retrosynthesis and syntheses of prostaglandins, ginkgolide and many others (Nobel Prize 1990), Yoshito Kishi's halichondrin work, and the Taxol syntheses of Holton and Nicolaou (1994) marked later milestones. K. C. Nicolaou and Erik Sorensen's *Classics in Total Synthesis* (1996), with later volumes (2003, with Scott Snyder; 2011, with Jason Chen), records these and many other syntheses.
:::

## Where this leads

Total synthesis is where the course comes together: retrosynthetic planning ([[organic-synthesis/retrosynthesis]]), mechanistic understanding ([[organic-synthesis/mechanism-determination]]), redox and protecting-group tactics, C–C bond formation, pericyclic, stereoselective and radical methods. Its methods feed directly into medicinal chemistry, where analogues of natural products are made and optimised ([[medicinal-chemistry/structure-activity]], [[medicinal-chemistry/drug-case-studies]]), and into process chemistry, where routes are redesigned for safety, cost and sustainability ([[green-chemistry/green-metrics]], [[green-chemistry/chemical-industry]]). Computational planning and automated synthesis, the modern heirs of Corey's LHASA program, are changing how routes are found — but every proposal still has to be tested in the flask.

::: summary
- Total synthesis proves and corrects structures, supplies scarce compounds and analogues, and drives the invention of new reactions.
- A synthesis is measured by its step count, **longest linear sequence**, overall yield along the LLS, and **ideality** $= (n_\mathrm{c} + n_\mathrm{sr})/N$; material requirements grow as $1/p^n$.
- Strategic ideas: convergence, complexity-building key reactions (Diels–Alder, cascades, $[3,3]$ shifts), biomimetic steps, symmetry, a planned stereochemical sequence, minimal protection and redox economy, function-oriented design.
- Woodward's reserpine used a Diels–Alder adduct as a stereochemical template; Corey's prostaglandin synthesis built a branch-point intermediate with pericyclic, rearrangement, radical and olefination steps; Johnson's progesterone used a biomimetic polyene cascade controlled by alkene geometry and chair transition states.
- Formal and relay syntheses depend on earlier transformations (quinine, 1944; validated 2008); supply of Taxol came from semisynthesis, while eribulin is made entirely by synthesis.
- Every claim rests on matching synthetic and natural material and on reproducible experimental detail.
:::

## Exercises

::: exercise Percentage ideality {level=1 check="66.7"}
A 12-step synthesis has six construction steps and two strategic redox steps. What is its percentage ideality? (Enter it to three significant figures.)
::: solution
$(6 + 2)/12 \times 100 = 66.7\,\%$ ([[#eq-ideality]], [[#ex-ideality]]).
:::
:::

::: exercise Longest linear sequence {level=1 check="12"}
Fragment A takes 7 steps, fragment B 9 steps; they are coupled in one step and the target is reached after two further steps. What is the LLS? (Enter the number of steps.)
::: solution
The longest branch is B: $9 + 1 + 2 = 12$ steps ([[#def-lls]]). The total step count is $7 + 9 + 1 + 2 = 19$.
:::
:::

::: exercise Overall yield along the LLS {level=1 check="14.2"}
If every step of a 12-step longest linear sequence proceeds in $85\,\%$ yield, what is the overall yield? (Enter the percentage to three significant figures.)
::: solution
$0.85^{12} = 0.142$, i.e. $14.2\,\%$.
:::
:::

::: exercise Material multiplier {level=2 check="8.2"}
How many moles of the first starting material are needed per mole of target for a 20-step linear sequence with $90\,\%$ per step? (Enter the number to two significant figures.)
::: solution
$1/0.9^{20} = 1/0.1216 = 8.2$. With a convergent route of LLS 12 at the same yield, $1/0.9^{12} = 3.5$ mol of each fragment's starting material would be needed.
:::
:::

::: exercise Reading Corey's prostaglandin route {level=2}
For each of the following steps of Corey's prostaglandin F₂α synthesis, name the reaction class and state the stereochemical or chemoselective principle it relies on: (a) the Diels–Alder reaction with 2-chloroacrylonitrile; (b) the Baeyer–Villiger oxidation; (c) the iodolactonisation; (d) the HWE reaction; (e) the Wittig reaction for the upper side chain.
::: solution
(a) $[4+2]$ cycloaddition: suprafacial addition defines the relative configuration of the bicyclic framework; 2-chloroacrylonitrile serves as a ketene equivalent (ketenes themselves give [2+2] adducts). (b) Baeyer–Villiger: the more substituted (secondary, bridgehead) carbon migrates with retention, inserting O regioselectively. (c) Electrophilic cyclisation: iodine forms an iodonium ion on one face of the alkene, and the carboxylate attacks from the opposite face (anti addition), forming the five-membered lactone with defined stereochemistry. (d) HWE olefination with a stabilised phosphonate: (*E*)-enone. (e) Wittig with a non-stabilised ylide under salt-free conditions: (*Z*)-alkene, as in natural prostaglandins ([[organic-synthesis/carbon-carbon-bonds]]).
:::
:::

::: exercise Formal synthesis {level=2}
Explain the difference between a total, formal and relay synthesis, using quinine as an example, and say why the 2008 work of Smith and Williams mattered.
::: solution
A **total synthesis** goes from commercial starting materials to the target with every step carried out (or at least described and reproducible). A **formal synthesis** reaches a known intermediate that others have converted into the target, and relies on their report for the remaining steps. A **relay synthesis** uses an intermediate obtained by degrading the natural product to test or complete later steps. Woodward and Doering's 1944 work reached quinotoxine, relying on Rabe and Kindler's 1918 conversion of quinotoxine into quinine — a formal synthesis. Because the 1918 description was brief and was not repeated for decades, Stork (2001) questioned whether the route had ever been completed. Smith and Williams repeated the Rabe–Kindler sequence and obtained quinine, showing that the formal synthesis was valid. The episode shows that a formal synthesis is only as secure as the literature step it relies on.
:::
:::

::: exercise A two-step terpene synthesis {level=3}
Analyse the synthesis of α-terpineol in [[#ex-terpineol]] in more detail: (a) explain the regiochemistry of the Diels–Alder step with frontier-orbital coefficients; (b) explain why exactly two equivalents (in practice a slight excess) of $\mathrm{CH_3MgBr}$ are consumed; (c) suggest how the product could be obtained as a single enantiomer.
::: hint
Which carbon of isoprene carries the largest HOMO coefficient?
:::
::: solution
(a) The methyl donor at C2 of isoprene raises the HOMO and enlarges its coefficient at C1 (the terminus adjacent to the substituted carbon). Methyl acrylate's LUMO has its largest coefficient on the β-carbon (the terminal $\mathrm{CH_2}$). Bonding between these two atoms places the ester-bearing carbon next to C4 of the diene, so in the product ring the methyl-bearing alkene carbon and the ester-bearing carbon are 1,4 — the "*para*" product, methyl 4-methylcyclohex-3-ene-1-carboxylate ([[organic-synthesis/pericyclic]]). Lewis acids, which enlarge the LUMO coefficient difference, increase the selectivity. (b) The first equivalent adds to the ester and the tetrahedral intermediate expels methoxide, giving the methyl ketone; the ketone is more electrophilic than the ester and consumes the second equivalent to give the tertiary alkoxide. Any acidic impurity (water, alcohol) consumes extra reagent, so a slight excess is used. (c) Options: an asymmetric Diels–Alder reaction with a chiral Lewis acid catalyst or a chiral auxiliary on the acrylate (an Evans oxazolidinone acrylamide, removed afterwards — then the Grignard step would be applied to the corresponding ester); or a kinetic resolution of racemic α-terpineol (or of the intermediate acid) with a lipase or by crystallisation of diastereomeric salts ([[organic-synthesis/stereoselective-synthesis]]).
:::
:::

::: exercise Convergent planning with numbers {level=3 check="0.149"}
Fragment A is made in 8 steps at $85\,\%$ each; fragment B in 5 steps at $90\,\%$ each. They are coupled in $75\,\%$ yield, and three further steps at $90\,\%$ each complete the target. Calculate the overall yield based on fragment A's starting material, and compare it with the yield based on B's. Which fragment's route would you try to improve first, and why? (Enter the overall yield based on A as a fraction, to three significant figures.)
::: solution
Based on A: $0.85^8 \times 0.75 \times 0.90^3 = 0.2725 \times 0.75 \times 0.729 = 0.149$. Based on B: $0.90^5 \times 0.75 \times 0.90^3 = 0.5905 \times 0.75 \times 0.729 = 0.323$. Fragment A's branch is both the longest and the lowest-yielding: it determines the LLS (12 steps) and requires $1/0.149 = 6.7$ mol of its starting material per mole of target, against $3.1$ mol for B. Improving A — raising its step yields, shortening it, or redistributing complexity so that some of A's steps move into B — gives the largest gain. The coupling step (75 %) is shared by both branches and is also a prime target, since every improvement there helps both.
:::
:::
