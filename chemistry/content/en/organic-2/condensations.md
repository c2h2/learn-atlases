The previous chapter armed carbon with electrons; this chapter points it at carbon. A **condensation** is a bond-forming reaction that pays for itself by losing a small molecule — water, or an alkoxide — and the two great condensations of carbonyl chemistry are the same two-step idea run twice: an enolate (the chapter's nucleophile) attacks a carbonyl (the course's electrophile), and the adduct eliminates. Aldol gives $\beta$-hydroxy carbonyls and, after dehydration, $\alpha,\beta$-unsaturated ones; Claisen gives 1,3-dicarbonyls, the very compounds whose acidity made the last chapter work. Between them they build the carbon skeletons of polyketides, steroids, and half of the molecules in a medicinal chemistry paper, and they do it with a logic so clean that a year of synthesis reduces to two disconnections.

## The aldol: enolate finds aldehyde

::: definition The aldol reaction {#def-aldol}
An enolate adds to an aldehyde or ketone to give an alkoxide, which is protonated to a **$\beta$-hydroxy carbonyl compound** — an "aldol" (aldehyde + alcohol, the name from the first example). The new bond joins the $\alpha$-carbon of the donor to the carbonyl carbon of the acceptor; everything else is spectator. Under base the reaction is catalytic in hydroxide or alkoxide (the product's $\alpha$-H is more acidic than the alcohol solvent, so the product often leaves as its own anion); under acid it runs through the neutral enol attacking a protonated carbonyl. The reverse reaction — retro-aldol — is a real pathway, not a formality: it is how sugars are dismantled in metabolism and why aldol equilibria are so often substrate-dependent.
:::

::: proposition Aldehydes go, ketones sulk, heat finishes the job {#prop-aldol-eq}
Aldol addition is reversible with an equilibrium set by sterics: two molecules become one, and a new $\mathrm{C{-}C}$ bond must pay for lost $\mathrm{C{=}O}$ $\pi$ bond and new crowding. For acetaldehyde the equilibrium constant is about $10^3\ \mathrm{L\,mol^{-1}}$ — a $1\ \mathrm{mol\,L^{-1}}$ solution is $98\ \%$ aldol; for acetone it is about $2\times10^{-4}\ \mathrm{L\,mol^{-1}}$ — $0.02\ \%$ at the same concentration, five million-fold worse, because the product is a crowded ketone-ketone pair. Heat changes the calculus: the aldol dehydrates (E1cb under base: deprotonation first, then hydroxide expulsion — hydroxide is a poor leaving group, but E1cb only pays for the expulsion after the anion is already there) to the **$\alpha,\beta$-unsaturated carbonyl**, whose conjugation makes the overall condensation irreversible. Dehydration also *drives* unfavourable additions: Le Chatelier's partner in every aldol synthesis is the enone's thermodynamic envy.
:::

::: example Acetaldehyde doubles {#ex-aldol-acetaldehyde}
Acetaldehyde with dilute base at room temperature gives 3-hydroxybutanal; on heating, but-2-enal (crotonaldehyde). Give both mechanisms in words and compute the fraction of aldehyde present as aldol at $1.0\ \mathrm{mol\,L^{-1}}$ ($K = 10^3\ \mathrm{L\,mol^{-1}}$).
::: solution
Base removes an $\alpha$-proton (tiny steady concentration of enolate); the enolate attacks a second acetaldehyde at carbon (curly arrow from $\alpha$-C to carbonyl C, $\pi$ electrons to oxygen); the alkoxide deprotonates water or ethanol to give the aldol and regenerate the catalyst. Heating: hydroxide deprotonates the *other* $\alpha$-position (between the carbonyl and the carbinol — the most acidic proton in the molecule), and the resulting enolate ejects $\mathrm{HO^-}$ in an E1cb step to give the conjugated enal. Equilibrium: with $x$ the aldol concentration, $K = x/(1-2x)^2 = 10^3$; solving (the widget iterates it) gives $x = 0.489\ \mathrm{mol\,L^{-1}}$, i.e. $97.8\ \%$ of the acetaldehyde is bound as aldol. The same equation with $K = 2\times10^{-4}$ for acetone gives $x = 2\times10^{-4}\ \mathrm{mol\,L^{-1}}$ — the five-million-fold gap between an aldehyde and a ketone, in one line of algebra.
:::
:::

::: widget newton
f: x/((1-2*x)*(1-2*x)) - 1000
x0: 0.4
x: 0, 0.5
caption: Newton iteration for the aldol equilibrium $x/(1-2x)^2 = 10^3$ of the example ($2\,\mathrm{CH_3CHO} \rightleftharpoons \mathrm{aldol}$, starting from $1.0\ \mathrm{mol\,L^{-1}}$ aldehyde): the root $x = 0.489\ \mathrm{mol\,L^{-1}}$ means $97.8\ \%$ of the aldehyde sits as aldol at equilibrium. The far root near $x = 0.5$ is the mathematical twin Newton will climb to from too-high starting values — it would require more aldol than there are aldehyde molecules, and the iteration's sensitivity to $x_0$ is a fair picture of how sensitive aldol syntheses are to conditions.
:::

::: example Crossed aldols done right {#ex-crossed-aldol}
Benzaldehyde has no $\alpha$-hydrogen. Predict the products of (a) benzaldehyde + excess acetaldehyde, base, warm; (b) benzaldehyde + acetone (2 equivalents), base; and name the strategy.
::: solution
(a) One equivalent of acetaldehyde condenses with one of benzaldehyde: the enolate of acetaldehyde attacks benzaldehyde (which cannot enolise, so it can only be the acceptor), and dehydration gives the conjugated enal $\mathrm{PhCH{=}CHCHO}$, cinnamaldehyde — the cinnamon aldehyde. (b) Acetone has two $\alpha$-positions and condenses twice: dibenzalacetone, $\mathrm{PhCH{=}CHCOCH{=}CHPh}$, the classic undergraduate synthesis whose yellow crystals and extended conjugation are the point. The strategy — pair an enolisable donor with a *non-enolisable* acceptor (benzaldehyde, formaldehyde, benzophenone) so only one partner can form an enolate and the crossed product is the only product — is the **crossed (mixed, directed) aldol**, and its strictest form is the Claisen–Schmidt condensation (aromatic aldehyde + ketone/aldehyde to the cinnamaldehyde-type enone).
:::
:::

## The Claisen: the ester that acylates itself

::: proposition The Claisen condensation and its one strict requirement {#prop-claisen}
An ester with $\alpha$-hydrogens, treated with alkoxide *matching its own alkoxy group*, condenses to a **$\beta$-keto ester**: enolate attacks a second ester molecule, the tetrahedral intermediate ejects alkoxide (acyl substitution, not addition — the leaving group is why esters give substitution products where aldehydes give alcohols), and the reaction would be a thermodynamic shambles — esters are poor electrophiles, alkoxide a poor leaving group — except for the final act: the $\beta$-keto ester product ($\mathrm{p}K_\mathrm{a} \approx 11$) is instantly deprotonated by the alkoxide present, and that acid–base step is the thermodynamic engine. Consequences: the ester needs *two* $\alpha$-hydrogens (the product must retain one to be deprotonated); a *full equivalent* of base is consumed, not catalytic; and the reaction only works when the product anion is much more stable than the base's conjugate acid — which is why ethanol's alkoxide ($\mathrm{p}K_\mathrm{a}$ 16) can pull an 11 off a 1,3-dicarbonyl but never off a simple ester.
:::

::: example Ethyl acetate to acetoacetic ester {#ex-claisen}
Write the Claisen condensation of ethyl acetate with $\mathrm{NaOEt/EtOH}$ and its workup, and explain why the product is deprotonated before it is ever protonated.
::: solution
$2\,\mathrm{CH_3CO_2Et} \rightarrow \mathrm{^-CH_2COCH_2CO_2Et}$ (as the sodium salt) $+ \mathrm{EtO^-}$, then $\mathrm{H_3O^+}$ workup gives acetoacetic ester $\mathrm{CH_3COCH_2CO_2Et}$. Mechanism: ethoxide removes an $\alpha$-proton (equilibrium, tiny enolate concentration — fine, the enolate is consumed downstream); the enolate attacks the carbonyl of a second ester; the tetrahedral intermediate collapses, ejecting ethoxide; and now the arithmetic: the product has a proton between two carbonyls ($\mathrm{p}K_\mathrm{a}$ 11) and the flask is full of ethoxide (conjugate acid $\mathrm{p}K_\mathrm{a}$ 16), so deprotonation runs $10^5$-fold downhill and pulls every earlier, uphill step along behind it. Remove that last proton-transfer and the Claisen of ethyl acetate is endergonic — which is exactly why formate, carbonate, benzoate and oxalate esters (no $\alpha$-H, cannot self-condense) are the *acceptors* in crossed Claisens with LDA-generated enolates.
:::
:::

::: definition Dieckmann and the intramolecular option {#def-dieckmann}
The **Dieckmann condensation** is the intramolecular Claisen: a diester treated with matching alkoxide cyclises to a cyclic $\beta$-keto ester, five- and six-membered rings forming readily (the same ring-size preference as every intramolecular reaction). Diethyl adipate (hexanedioate) gives ethyl 2-oxocyclopentane-1-carboxylate — a five-membered ring, because the *enolate carbon of one ester attacks the carbonyl carbon of the other*, counting the atoms in the ring formed. The product's ring proton between the two carbonyls is as acidic as ever, so the same full-equivalent-of-base rule applies, and the product is the entry ticket to substituted cyclopentanones and cyclohexanones after alkylation and hydrolysis/decarboxylation.
:::

::: example Ring size from the mechanism {#ex-dieckmann}
Diethyl hexanedioate (adipate) with $\mathrm{NaOEt}$ gives a five-membered cyclic $\beta$-keto ester; diethyl heptanedioate (pimelate) gives a six-membered one. Derive both ring sizes from the mechanism.
::: solution
Number the chain from one ester carbonyl: adipate is C1–C6, pimelate C1–C7. The enolate forms at an $\alpha$-carbon (C2) and attacks the *other* ester's carbonyl carbon — C6 in adipate, C7 in pimelate — because that is the only electrophilic carbon available besides its own. The ring is the atoms between and including the two bonded carbons: C2–C3–C4–C5–C6 for adipate (five), C2–C3–C4–C5–C6–C7 for pimelate (six). The attacked carbonyl becomes the ring ketone; the *attacking* ester keeps its $\mathrm{CO_2Et}$ as the 1-substituent — hence ethyl 2-oxocyclopentane-1-carboxylate and ethyl 2-oxocyclohexane-1-carboxylate. The rule of thumb falls out of the mechanism, not a table: count from enolate carbon to attacked carbonyl carbon along the chain.
:::
:::

## Reading condensations backwards

::: example The intramolecular aldol, designed {#ex-intramolecular-aldol}
Hexane-2,5-dione with aqueous base gives 3-methylcyclopent-2-en-1-one. Give the mechanism and explain why the five-membered ring wins over the alternative.
::: solution
Number the diketone $\mathrm{CH_3COCH_2CH_2COCH_3}$ as C1–C6. Base removes a proton from a terminal methyl (C1); that enolate attacks the *other* ketone carbonyl (C5) intramolecularly, and the new bond C1–C5 closes a five-membered ring (atoms C1–C5). In the ring: C2 is the surviving ketone, and C5 is the carbinol carbon, bearing the OH and the C6 methyl. Dehydration is E1cb: the proton at C1 — $\alpha$ to the C2 ketone *and* adjacent to the C5 hydroxyl — is the most acidic in the molecule; removing it and expelling hydroxide from C5 puts the double bond between C1 and C5, conjugated with the C2 carbonyl. Renumbered as an enone (C2 → C1), that is exactly 3-methylcyclopent-2-en-1-one: carbonyl, then the endocyclic double bond, then the methyl on the $\beta$-carbon. The alternative closures are worse in kind, not degree: the only other intramolecular attack would be an $\alpha$-carbon on its *own* carbonyl (a three-membered ring, absurd), and intermolecular aldol would oligomerise. Five-membered ring plus conjugated enone: the tether does the choosing, and the dehydration confirms it.
:::
:::

::: warning The aldol mess, and how to avoid it {#warn-aldol-mess}
Mix one enolisable aldehyde with base and you accept every product: self-addition, double addition, dehydration, retro-scrambling — fine if that is the synthesis, chaos if it is not. The three escapes: (1) **directed aldol** — LDA, $-78\ \mathrm{^\circ C}$, pre-form the donor enolate, then add the acceptor (which must be non-enolisable or added last and in the dark about its own acidity); (2) **the enamine** — Stork's solution: a secondary amine (pyrrolidine, morpholine) converts the ketone to an enamine, a neutral, mono-enolisable nucleophile that alkylates and acylates and is hydrolysed back in water; (3) **intramolecularity** — a diketone has no choice but to cyclise, which is why ring syntheses favour the tethered version. And remember the equilibrium of the proposition: ketone aldols need removal of product (Soxhlet extraction, Dean–Stark water removal) or the drive of dehydration, or they simply do not happen.
:::

::: quiz
Which pair gives a single crossed aldol product cleanly?
- [x] LDA enolate of acetone, then benzaldehyde, then warm
- [ ] acetaldehyde + propanal, NaOH
- [ ] acetone + acetaldehyde, NaOH
- [ ] benzaldehyde + formaldehyde, NaOH
::: solution
Pre-forming the acetone enolate with LDA and adding benzaldehyde (no $\alpha$-H, cannot self-condense) gives one crossed product, dehydrating to benzylideneacetone. Two enolisable aldehydes (options two and three) give four products minimum. Benzaldehyde and formaldehyde have no $\alpha$-hydrogen between them — neither can form an enolate, so nothing happens (they would need a Cannizzaro or crossed-Cannizzaro route instead).
:::
:::

::: history
The aldol reaction is older than the enolate. In 1872 Charles-Adolphe **Wurtz** found that acetaldehyde, stirred with dilute base, doubles into a new substance of twice the carbon count, and named it *aldol* for its two functional groups — two decades before anyone would have countenanced a carbanion, and three before the carbonyl's structure itself was settled. The mechanism waited on the physical-organic school of the 1930s–50s — the Ingold tradition that established the carbanion, the reversibility of the addition, and the E1cb elimination — while synthesis raced ahead of understanding: Robert **Robinson**'s annulations of the 1920s–30s built rings by aldol logic with no enolates in the picture, and the directed aldols of the 1960s–70s finally gave chemists the full control Wurtz had stumbled into. Aldol chemistry is the proof that a reaction can be useful for eighty years before it is understood, and more useful still after.
:::

## Where this leads

The 1,3-dicarbonyls this chapter makes are the substrates of the previous chapter's mild enolate chemistry — the two chapters form one machine, and its output, the $\alpha,\beta$-unsaturated carbonyl, is the electrophile of the *next* reaction in the sequence: conjugate (Michael) addition of an enolate to an enone, the 1,5-dicarbonyl disconnection, and the Robinson annulation that fuses rings. Enolate alkylation and acylation complete the menu in [[organic-2/enols-enolates]]; imine condensations (mannich, reductive amination) belong to [[organic-2/amines]]; and the heteroaromatic syntheses of [[organic-2/heterocycles]] are condensations with nitrogen in the cast. The equilibrium thinking is [[organic-2/conjugation]]'s, once more.

::: summary
- Aldol = enolate + carbonyl → $\beta$-hydroxy carbonyl; condensation = the same plus E1cb dehydration to the conjugated $\alpha,\beta$-unsaturated carbonyl.
- Aldol addition is reversible and sterically decided: aldehydes sit far on the product side ($K \sim 10^3$ for acetaldehyde), ketones far back ($K \sim 10^{-4}$ for acetone); dehydration rescues the unfavourable cases.
- Crossed aldols are clean only when one partner cannot enolise (benzaldehyde, formaldehyde) or when the donor enolate is pre-formed (LDA, or Stork's enamines).
- Claisen = enolate + ester with alkoxide ejection → $\beta$-keto ester; it demands two $\alpha$-hydrogens and a full equivalent of matching alkoxide because the product's deprotonation ($\mathrm{p}K_\mathrm{a}$ 11) is the thermodynamic engine.
- Dieckmann is the intramolecular Claisen: diesters cyclise to five- and six-membered cyclic $\beta$-keto esters; ring size is counted from enolate carbon to attacked carbonyl carbon.
- Intramolecular aldols beat intermolecular mess because tethers enforce proximity; the product is whichever enone can conjugate — thermodynamics again choosing the ring.
:::

## Exercises

::: exercise Aldol products {level=1}
Give the aldol addition product (before dehydration) of (a) propanal; (b) butan-2-one (one equivalent, self-aldol at the methyl side).
::: solution
(a) 3-Hydroxy-2-methylpentanal: propanal's enolate (at C2, the $\alpha$-carbon) attacks another propanal's carbonyl (C1), so the product carries the new $\mathrm{C{-}C}$ between donor-C2 and acceptor-C1, with the acceptor's OH at C3 and its ethyl as the 3-substituent. (b) 4-Hydroxy-4-methylhexan-2-one: the methyl-side enolate $\mathrm{{}^-CH_2COCH_2CH_3}$ attacks the carbonyl carbon of a second butan-2-one, giving $\mathrm{CH_3COCH_2C(OH)(CH_3)CH_2CH_3}$. The methyl side is the usual donor under kinetic conditions; the more substituted enolate (ethyl side) would give the alternative regiochemistry.
:::
:::

::: exercise Claisen eligibility {level=1}
Which of these self-Claisen cleanly in $\mathrm{NaOEt/EtOH}$: ethyl propanoate, ethyl 2-methylpropanoate, ethyl benzoate, ethyl acetate? Explain each.
::: solution
Ethyl acetate: yes (two $\alpha$-H; the textbook case). Ethyl propanoate: yes — its $\alpha$-carbon is a $\mathrm{CH_2}$ with two hydrogens, and it Claisens to ethyl 2-methyl-3-oxopentanoate. Ethyl 2-methylpropanoate: no — one $\alpha$-H only; the product could not be deprotonated, so the thermodynamic engine stalls (it is instead a good *acceptor* for LDA-generated enolates). Ethyl benzoate: no $\alpha$-H at all — acceptor only. The rule: two $\alpha$-hydrogens to be a donor, zero to be a clean acceptor.
:::
:::

::: exercise Condensation or addition? {level=1}
Say which word fits and why: (a) ethyl acetate + ethoxide → acetoacetic ester; (b) acetaldehyde + dilute base, cold → 3-hydroxybutanal.
::: solution
(a) Condensation: the product loses ethanol (alkoxide from the tetrahedral intermediate) — bond formed, small molecule expelled. (b) Addition: nothing is lost; the aldol *adduct* is the product (dehydration to the enal would be the condensation, and needs heat). The word "condensation" requires the leaving small molecule; "aldol addition" is the step before it.
:::
:::

::: exercise Retrosynthetic aldol {level=2}
Disconnect the enone $\mathrm{PhCH{=}CHCOCH_3}$ (but-1-en-3-one backbone with phenyl) into its aldol precursors, and give conditions.
::: solution
The enone's $\beta$-carbon is the former acceptor carbonyl carbon: break the $\mathrm{C_\alpha{=}C_\beta}$ bond — donor = methyl ketone side (acetone's enolate? the $\mathrm{COCH_3}$ with $\alpha$-CH2), acceptor = benzaldehyde. Conditions: benzaldehyde + acetone (excess, as solvent, to favour mono-condensation), $\mathrm{NaOH}$, ethanol, warm — the Claisen–Schmidt recipe giving $\mathrm{PhCH{=}CHCOCH_3}$ (benzalacetone). The excess acetone suppresses the second condensation (which would give dibenzalacetone).
:::
:::

::: exercise Chalcone {level=2}
Chalcone is $\mathrm{PhCH{=}CHCOPh}$. Give its synthesis and explain why acetophenone rather than benzaldehyde forms the enolate.
::: solution
Benzaldehyde (no $\alpha$-H, acceptor) + acetophenone (methyl ketone, donor), $\mathrm{NaOH/EtOH}$, warm: the Claisen–Schmidt condensation giving the conjugated enone (chalcone, the "beta-methylstyryl ketone" of the old literature). Acetophenone forms the enolate because it has $\alpha$-hydrogens; benzaldehyde has none, so under the same base it can only be electrophile. The product's conjugation (enone + two phenyls) drives the dehydration irreversibly — which is why chalcones crystallise out of ethanol in teaching labs as the yellow solid they are.
:::
:::

::: exercise Dieckmann design {level=2}
Give the diester and the base for the synthesis of 2-methylcyclopentanone via a Dieckmann condensation and one alkylation.
::: solution
Dieckmann of diethyl adipate ($\mathrm{EtO_2C(CH_2)_4CO_2Et}$) with $\mathrm{NaOEt/EtOH}$ gives ethyl 2-oxocyclopentane-1-carboxylate; deprotonate that $\beta$-keto ester ($\mathrm{p}K_\mathrm{a}$ 11 — carbonate or ethoxide suffices), methylate with methyl iodide, then hydrolyse and decarboxylate (aqueous acid, heat) → 2-methylcyclopentanone. The acetoacetate-type sequence works on a ring exactly as it does on a chain: the cyclic $\beta$-keto ester is a 2-substitutable synthon for the enolate of the ketone after decarboxylation.
:::
:::

::: exercise Equilibrium engineering {level=3 check="0.0002" hint="Solve x/(1-2x)^2 = 2e-4 by successive approximation; the unit is mol L^-1"}
For acetone self-aldol ($K = 2\times10^{-4}\ \mathrm{L\,mol^{-1}}$), compute the aldol concentration at equilibrium from $1.0\ \mathrm{mol\,L^{-1}}$ acetone, and explain how industry still makes mesityl oxide (the dehydration product) from acetone in good yield.
::: solution
$x = K(1-2x)^2$; with $x$ tiny, $x \approx 2\times10^{-4}\ \mathrm{mol\,L^{-1}}$ — the addition is hopeless on paper. Mesityl oxide nevertheless forms because the aldol *dehydrates* (to mesityl oxide, then onward to phorone and mesitylene under acid), and each downstream step removes the aldol from the equilibrium: the overall sequence aldol → enone → conjugated dienone is thermodynamically downhill even though its first rung is uphill. Continuous removal of product (distillation of the water-forming condensate) turns a $10^{-4}$ equilibrium into a preparative route — the same Le Chatelier logic as Fischer esterification, one carbon-class over.
:::
:::

::: exercise Mechanism, both directions {level=3}
The retro-aldol is a real reaction: fructose-1,6-bisphosphate cleaves to two trioses in glycolysis. Write the arrow-pushing in words for a generic retro-aldol under base, and say what makes the biological cleavage fast despite aldol addition being favoured for aldehydes.
::: solution
Reverse of addition: base removes the $\alpha$-proton of the $\beta$-hydroxy carbonyl (the one between carbonyl and carbinol), and the resulting enolate's electron pair pushes the $\mathrm{C_\alpha{-}C_\beta}$ bond out onto $\mathrm{C_\beta}$, expelling the alkoxide leaving group — the retro of the aldol addition, E1cb-shaped. Biology's acceleration: aldolase uses a lysine ammonium to form a Schiff base (iminium) with the substrate's ketone, so the developing carbanion of the retro-aldol is stabilised as an enamine, and the iminium makes the cleavage far easier than any hydroxide could; the two triose products are then released by hydrolysis and swept onward by the next enzymes of glycolysis. The lesson is the chapter's: the aldol is an equilibrium, and biology runs it backwards by coupling — covalent (iminium) catalysis plus product removal, the same two levers available in the flask.
:::
:::
