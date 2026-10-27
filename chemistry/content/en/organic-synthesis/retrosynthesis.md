Suppose you are asked to make 4-phenylbut-3-en-2-one, the pale yellow solid sold as "benzalacetone", or the bicyclic diketone that steroid chemists call the Wieland–Miescher ketone. Nobody will hand you a recipe. You know dozens of reactions from [[organic-1]] and [[organic-2]] — nucleophilic substitution, Grignard additions, aldol and Claisen condensations, Michael additions — but knowing reactions in the forward direction is not the same as knowing which ones to string together, in what order, starting from what. A chemistry student who tries to plan a synthesis by staring at the starting materials and asking "what could I do to this?" soon drowns in possibilities: each compound can undergo dozens of reactions, each product dozens more, and the tree of forward possibilities grows exponentially.

The solution, made systematic by Elias James Corey in the 1960s, is to **work backwards from the target**. Instead of asking what a starting material can become, we ask what the target could have been made from, one step before the end. Each backward step breaks a bond the target contains — a **disconnection** — and turns the target into simpler pieces. Repeating the process on each piece eventually leads to compounds that can be bought. Because every backward step must correspond to a reliable forward reaction, the analysis is anchored at each stage to chemistry that actually works. This chapter develops the language of **retrosynthetic analysis**: disconnections, synthons and their synthetic equivalents, functional-group interconversion, the polarity patterns that tell us which disconnections are "natural", and the strategic arithmetic — overall yield, convergence, atom economy — that decides between routes that would all work on paper. The rest of the course supplies the tools: oxidation and reduction ([[organic-synthesis/redox-in-synthesis]]), protecting groups ([[organic-synthesis/protecting-groups]]), carbon–carbon bond formation ([[organic-synthesis/carbon-carbon-bonds]]), pericyclic and stereoselective reactions, and their combination in [[organic-synthesis/total-synthesis]].

## Thinking backwards: disconnections and synthons {#sec-language}

We need a precise vocabulary, because a careless retrosynthesis mixes up imaginary fragments with real reagents.

::: definition Target, disconnection, synthon and synthetic equivalent {#def-disconnection}
The **target molecule** (TM) is the compound to be made. A **disconnection** is the imagined cleavage of a bond in the target, written with a double-shafted **retrosynthetic arrow** $\Rightarrow$ pointing from the target to the fragments and a wavy line or the label "dis" across the bond broken. It is the reverse of a bond-forming reaction. A disconnection of a polar bond is usually **heterolytic**: it produces two idealised charged fragments called **synthons** — one an electron-pair acceptor (a cation, the electrophilic synthon $a$) and one an electron-pair donor (an anion, the nucleophilic synthon $d$). A **synthetic equivalent** (or reagent) is a real compound that reacts as if it were the synthon. A disconnection is valid only if a reliable reaction exists that joins the synthetic equivalents to form the bond, with acceptable chemoselectivity, regioselectivity and stereoselectivity.
:::

The synthon is a bookkeeping device. The disconnection of the C–C bond between the carbinol carbon and the phenyl group of 2-phenylpropan-2-ol gives the synthons $\mathrm{Ph^-}$ and $\mathrm{(CH_3)_2C^+{-}OH}$. Neither exists as such. Their synthetic equivalents are phenylmagnesium bromide (in which the C–Mg bond is polarised so that carbon carries the negative end) and acetone (whose carbonyl carbon is electrophilic). The forward reaction is the Grignard addition of [[organic-2/carbonyl-addition]]. In words: the electron pair of the polar C–Mg bond attacks the carbonyl carbon; the C=O π bond breaks, and its electrons move onto oxygen to give a magnesium alkoxide; aqueous acid in the work-up then protonates the alkoxide oxygen to give the alcohol.

Not every bond is best disconnected at once. Often we first change one functional group into another *on paper* so that a known disconnection becomes available.

::: definition Functional-group interconversion and functional-group addition {#def-fgi}
A **functional-group interconversion** (FGI) is a retrosynthetic step that changes one functional group into another without changing the carbon skeleton — for example, an amine into an amide or nitro compound, an alcohol into a ketone, or an alkene into an alcohol — because the forward reaction (reduction, oxidation, elimination…) is reliable and the new group makes a disconnection possible. A **functional-group addition** (FGA) adds a group that the target lacks (for example a carbonyl group, later removed, or a double bond, later hydrogenated) for the same reason. Both are written with the retrosynthetic arrow labelled "FGI" or "FGA".
:::

For example, a secondary amine $\mathrm{R{-}CH_2{-}NH{-}R'}$ is awkward to disconnect directly, because alkylation of an amine with an alkyl halide over-alkylates. An FGI to the amide $\mathrm{R{-}CO{-}NH{-}R'}$ (forward: reduction with lithium aluminium hydride) gives a molecule whose C–N bond disconnects cleanly to an acyl chloride and an amine. A reductive amination ($\mathrm{RCHO + H_2NR'}$, then a hydride reducing agent) achieves the same goal in one operation and is discussed in [[organic-synthesis/redox-in-synthesis]].

### Where to cut first

Experience has distilled a short list of guidelines. They are heuristics, not laws, and a good synthesis sometimes violates one of them for a reason.

::: algorithm A retrosynthetic analysis {#alg-retro}
1. **Draw the target and identify its functional groups and stereocentres.** Number the carbon chain and note the relationships between heteroatoms (1,2-, 1,3-, 1,4- …; see [[#prop-dioxygen]]).
2. **Disconnect bonds to heteroatoms first** (C–O, C–N, C–S in esters, amides, ethers, acetals and amines): these bonds are formed by reliable polar reactions and their disconnection often reveals the carbon skeleton.
3. **Look for retrons** — structural patterns that signal a powerful reaction: a 1,3-dioxygenated chain or an α,β-unsaturated carbonyl (aldol or Claisen), a 1,5-dicarbonyl (Michael), a cyclohexenone (Robinson annulation), a cyclohexene (Diels–Alder), a biaryl (cross-coupling).
4. **Disconnect C–C bonds** at branch points and next to functional groups, using synthons of consonant polarity where possible ([[#def-polarity]]); use FGI or FGA to create the functional group a disconnection needs.
5. **Prefer disconnections that simplify most**: those that cut near the middle of the molecule (convergence, [[#prop-convergent]]), exploit symmetry, remove rings or stereocentres, or give commercially available fragments.
6. **Check every forward step** for chemoselectivity (will another group react?), regioselectivity and stereoselectivity; add protecting groups where needed ([[organic-synthesis/protecting-groups]]).
7. **Repeat on each fragment** until every branch ends in an available starting material; then write the synthesis forwards, with reagents and conditions, and count steps and overall yield.
:::

::: example An amide drug: paracetamol {#ex-paracetamol}
Paracetamol (acetaminophen) is $N$-(4-hydroxyphenyl)acetamide, $\mathrm{HO{-}C_6H_4{-}NH{-}CO{-}CH_3}$, a textbook analgesic. Propose a one-step disconnection, give the forward reaction with its mechanism in words, and calculate the atom economy of the forward step using acetic anhydride (molar masses: 4-aminophenol $109.13$, acetic anhydride $102.09$, paracetamol $151.16\ \mathrm{g\,mol^{-1}}$).
::: solution
**Disconnection.** Following guideline 2 of [[#alg-retro]], cut the amide C–N bond. The synthons are the aryl amine anion $\mathrm{HO{-}C_6H_4{-}NH^-}$ (donor) and the acylium cation $\mathrm{CH_3C^+{=}O}$ (acceptor). Synthetic equivalents: 4-aminophenol (the neutral amine is nucleophilic enough; the extra proton is lost later) and acetic anhydride, a convenient acylating agent less vigorous than acetyl chloride.

**Mechanism.** The lone pair on the amine nitrogen attacks one carbonyl carbon of acetic anhydride; the C=O π electrons move onto that oxygen, giving a tetrahedral intermediate with $\mathrm{N^+{-}H}$ and $\mathrm{O^-}$. The oxygen lone pair then re-forms the C=O π bond, and the bond to the central oxygen breaks, its electrons leaving with acetate. Finally acetate (or another base) removes a proton from the positively charged nitrogen, giving the neutral amide and acetic acid.

**Chemoselectivity.** The molecule has two nucleophiles, $\mathrm{NH_2}$ and the phenol OH. Nitrogen is the more nucleophilic (it is less electronegative and holds its lone pair less tightly), so with one equivalent of anhydride under mild conditions the amide forms selectively.

**Atom economy** (the fraction of the reactants' mass that ends up in the product, [[green-chemistry/green-metrics]]):
$$
\text{AE} = \frac{151.16}{109.13 + 102.09} = \frac{151.16}{211.22} = 71.6\,\%.
$$
The lost $28.4\,\%$ is the acetic acid by-product; with acetyl chloride the by-product would be HCl, which then has to be neutralised.
:::
:::

::: example Three Grignard disconnections {#ex-grignard}
Propose syntheses of 2-phenylbutan-2-ol, $\mathrm{PhC(OH)(CH_3)CH_2CH_3}$, by disconnecting each bond to the carbinol carbon. Which would you choose?
::: solution
A tertiary alcohol has three C–C bonds to the carbinol carbon, and each can be disconnected to a carbanion synthon (equivalent: a Grignard or organolithium reagent) and a ketone:

(a) Disconnect Ph–C: $\mathrm{PhMgBr}$ + butan-2-one, $\mathrm{CH_3COCH_2CH_3}$.

(b) Disconnect $\mathrm{CH_3CH_2}$–C: $\mathrm{CH_3CH_2MgBr}$ + acetophenone, $\mathrm{PhCOCH_3}$.

(c) Disconnect $\mathrm{CH_3}$–C: $\mathrm{CH_3MgBr}$ (or $\mathrm{CH_3Li}$) + propiophenone, $\mathrm{PhCOCH_2CH_3}$.

All three are one step from cheap commercial compounds, so the choice rests on practical points. Butan-2-one and acetophenone both have α-hydrogens, and a Grignard reagent can act as a base and enolise the ketone rather than add to it; this is a small problem for unhindered methyl ketones. Route (b) is commonly used. The product is racemic in every case, because the Grignard reagent attacks either face of the planar ketone equally ([[organic-synthesis/stereoselective-synthesis]] deals with controlling this). Note that an ester disconnection — two equivalents of a Grignard reagent added to an ester — is available only when *two* of the three groups are the same, which is not the case here.
:::
:::

## Polarity: consonant and dissonant patterns {#sec-polarity}

Disconnecting a C–C bond next to a carbonyl group is attractive because a carbonyl group polarises its neighbours. The carbonyl carbon is an electrophile (synthon $a^1$, the superscript counting the position from the heteroatom-bearing carbon, which is position 1). The α-carbon, via the enol or enolate, is a nucleophile ($d^2$). Through conjugation, the β-carbon of an α,β-unsaturated carbonyl is again an electrophile ($a^3$), as in Michael additions. The pattern alternates: a heteroatom confers acceptor character on odd positions and donor character on even positions of the chain to which it is attached.

::: definition Natural polarity, consonance and umpolung {#def-polarity}
Number the carbons of a chain outwards from a carbon bearing an oxygen or nitrogen functional group (that carbon is $1$). The **natural polarity** induced by the heteroatom makes odd-numbered carbons acceptor sites ($a^1$, $a^3$, $a^5$…) and even-numbered carbons donor sites ($d^2$, $d^4$…). In a molecule with two such groups, the pattern is **consonant** if the polarities required by both groups agree at every carbon, and **dissonant** if they conflict. **Umpolung** (German, "polarity inversion"; the term was popularised by Dieter Seebach) is any strategy in which a carbon is made to react with the opposite of its natural polarity — for example, an acyl carbon ($a^1$ by nature) reacting as a nucleophile ($d^1$).
:::

::: proposition The dioxygenation rule (empirical) {#prop-dioxygen}
For a carbon chain bearing two oxygen functional groups (carbonyl or hydroxy) on carbons $i$ and $j$, with $n = j - i + 1$ (the "1,$n$" relationship):

- if $n$ is **odd** (1,3- and 1,5-relationships), the polarity pattern is consonant and the target can be made by joining a natural donor and a natural acceptor — an **aldol** or **Claisen** reaction for 1,3, a **Michael** addition for 1,5;
- if $n$ is **even** (1,2-, 1,4- and 1,6-relationships), the pattern is dissonant and a disconnection between the functionalised carbons needs either an **umpolung** reagent (an acyl anion equivalent for 1,2 and 1,4; a homoenolate or α-carbonyl cation equivalent for 1,4) or a **reconnection** — the two groups are made together by cleaving a ring or double bond, e.g. ozonolysis of a cyclohexene for 1,6.

The rule is a heuristic about common reagents, not a law: it describes which disconnections are available with the classical donors (enolates, organometallics) and acceptors (carbonyls, enones, alkyl halides).
:::

::: proof Justification
Number the chain so that the two oxygen-bearing carbons are $1$ and $n$. Counted from the first group, carbon $m$ is an acceptor if $m$ is odd. Counted from the second group, the same carbon is position $n - m + 1$, so it is an acceptor if $n - m + 1$ is odd, that is, if $m$ and $n$ have the same parity. The two groups therefore agree at carbon $m$ exactly when "$m$ is odd" and "$m$ has the parity of $n$" are both true or both false — which holds for every $m$ if $n$ is odd and fails for every $m$ if $n$ is even. So for odd $n$ every bond between the groups can be disconnected into a natural donor and a natural acceptor, while for even $n$ every such disconnection produces one synthon of unnatural polarity. $\blacksquare$
:::

The proof is easiest to see on an example. In 4-hydroxybutan-2-one, $\mathrm{CH_3COCH_2CH_2OH}$, the carbonyl carbon C2 and the carbinol carbon C4 are in a 1,3-relationship. Disconnecting C3–C4 gives the enolate of acetone at C3 (a $d^2$ synthon relative to the ketone) and the cation $\mathrm{^+CH_2OH}$ at C4 (an $a^1$ synthon relative to the hydroxy group), whose synthetic equivalent is formaldehyde: an aldol reaction. Both groups "agree".

::: example A 1,3-pattern: benzalacetone by a crossed aldol {#ex-benzalacetone}
Disconnect 4-phenylbut-3-en-2-one, $\mathrm{PhCH{=}CHCOCH_3}$, and propose a forward synthesis. Explain why the crossed aldol works without a large amount of self-condensation.
::: solution
**FGI.** An α,β-unsaturated ketone is the dehydration product of a β-hydroxy ketone: $\mathrm{PhCH{=}CHCOCH_3 \Rightarrow PhCH(OH)CH_2COCH_3}$ (FGI, forward: elimination of water). The β-hydroxy ketone has a 1,3-relationship, consonant by [[#prop-dioxygen]].

**Disconnection.** Cut the C3–C4 bond (between the α-carbon and the carbinol carbon). Synthons: the enolate $\mathrm{^-CH_2COCH_3}$ and $\mathrm{PhCH^+{-}OH}$. Equivalents: acetone with a base (aqueous sodium hydroxide), and benzaldehyde.

**Forward mechanism** (the Claisen–Schmidt condensation, [[organic-2/condensations]]). Hydroxide removes an α-proton of acetone; the C–H electrons become the enolate C=C π bond (and, by resonance, a negative charge on oxygen). The enolate's α-carbon attacks the carbonyl carbon of benzaldehyde, the aldehyde π electrons moving onto oxygen to form an alkoxide, which is protonated by water. Hydroxide then removes the now doubly activated α-proton between the new C–O and the ketone, giving an enolate whose electrons expel hydroxide from the β-carbon (an E1cB elimination), forming the conjugated enone.

**Selectivity.** Benzaldehyde has no α-hydrogens, so it cannot form an enolate and can act only as the electrophile; it is also a more reactive electrophile than acetone, so the acetone enolate attacks benzaldehyde in preference to another acetone molecule. Dehydration is driven by conjugation of the new C=C with both the ring and the ketone, which makes the overall reaction essentially irreversible. Using excess acetone suppresses the second condensation at the other methyl group (which would give dibenzalacetone).
:::
:::

::: example A 1,5-pattern and a ring: the Wieland–Miescher ketone {#ex-wieland-miescher}
The Wieland–Miescher ketone, 8a-methyl-3,4,8,8a-tetrahydronaphthalene-1,6(2*H*,7*H*)-dione ($\mathrm{C_{11}H_{14}O_2}$, $M = 178.23\ \mathrm{g\,mol^{-1}}$), is a bicyclic enone–ketone used as a building block for steroids and terpenes. Carry out its retrosynthesis and calculate the atom economy of the overall forward process from 2-methylcyclohexane-1,3-dione ($126.16\ \mathrm{g\,mol^{-1}}$) and but-3-en-2-one (methyl vinyl ketone, MVK, $70.09\ \mathrm{g\,mol^{-1}}$).
::: solution
**Retron.** The target contains a cyclohexenone fused to a cyclohexanone at a quaternary carbon bearing a methyl group. A cyclohexenone is the retron of the **Robinson annulation** (Michael addition followed by intramolecular aldol condensation).

**Step 1 (FGI and aldol disconnection).** Hydrate the enone on paper to the β-hydroxy ketone, then disconnect the ring C=C bond as an aldol: the ring opens to a triketone, 2-methyl-2-(3-oxobutyl)cyclohexane-1,3-dione. The aldol bond joined the methyl ketone's terminal carbon (enolate, donor) to one ring carbonyl (acceptor) — a 1,3-relationship in the β-hydroxy ketone, consonant.

**Step 2 (Michael disconnection).** The triketone has a 1,5-relationship between the side-chain ketone and each ring carbonyl. Disconnect the bond between the ring's quaternary carbon and the side chain: synthons are the enolate of 2-methylcyclohexane-1,3-dione (donor, a very stabilised enolate because its negative charge is shared by two carbonyl groups) and the cation $\mathrm{^+CH_2CH_2COCH_3}$ (acceptor, $a^3$), whose equivalent is MVK.

**Forward.** Base deprotonates the dione at C2; the enolate carbon attacks the β-carbon of MVK, the C=C π electrons moving onto the carbonyl to form an enolate that is protonated on carbon. In the second stage (classically with pyrrolidine, or enantioselectively with L-proline, the Hajos–Parrish–Eder–Sauer–Wiechert reaction of [[organic-synthesis/stereoselective-synthesis]]), the methyl ketone forms an enamine or enolate that attacks a ring carbonyl intramolecularly to close the six-membered ring; dehydration gives the enone.

**Atom economy.** Overall: dione + MVK → product + $\mathrm{H_2O}$:
$$
\text{AE} = \frac{178.23}{126.16 + 70.09} = \frac{178.23}{196.25} = 90.8\,\%.
$$
Only water is lost. MVK is toxic and a lachrymator, and polymerises readily; it is handled in a fume cupboard with appropriate protective equipment, and work with it needs supervision and a risk assessment.
:::
:::

### Dissonant patterns and umpolung

Now take a 1,4-diketone such as 1-phenylpentane-1,4-dione, $\mathrm{PhCO{-}CH_2CH_2{-}COCH_3}$. Disconnecting the central C2–C3 bond gives either an enolate ($d^2$ for one ketone) plus a cation at the α-carbon of the other ketone (an $a^2$ synthon — dissonant), or the reverse. Disconnecting next to a carbonyl, between C1 and C2, gives the benzoyl anion $\mathrm{PhC^-{=}O}$ ($d^1$, unnatural) and $\mathrm{^+CH_2CH_2COCH_3}$ ($a^3$, natural — MVK again). Every option needs one synthon of unnatural polarity, exactly as [[#prop-dioxygen]] predicts.

Chemists have devised several synthetic equivalents for the **acyl anion** $\mathrm{RC^-{=}O}$:

- **1,3-Dithianes** (Corey and Seebach, 1965). An aldehyde is converted into its cyclic thioacetal with propane-1,3-dithiol. The C2–H between the two sulfur atoms is acidic enough ($\mathrm{p}K_\mathrm{a} \approx 31$) to be removed by butyllithium; the anion is alkylated by alkyl halides or adds to carbonyl compounds and epoxides, and the thioacetal is finally hydrolysed back to a ketone (with mercury(II) salts or, more benignly, with oxidative reagents such as $N$-bromosuccinimide or bis(trifluoroacetoxy)iodobenzene).
- **Cyanohydrin anions**: an O-protected cyanohydrin $\mathrm{RCH(OSiR_3)CN}$ is deprotonated α to the nitrile, alkylated, then unmasked to a ketone.
- **Nucleophilic catalysis**: cyanide ion (benzoin condensation, which makes 1,2-patterns) or a thiazolium or triazolium carbene (benzoin and **Stetter** reactions) adds to an aldehyde to give a nucleophilic intermediate in which the former carbonyl carbon is the donor.

::: example A 1,4-pattern by the Stetter reaction {#ex-stetter}
Propose a one-step synthesis of 1-phenylpentane-1,4-dione and describe how the catalyst inverts the polarity of benzaldehyde.
::: solution
**Disconnection.** Cut C1–C2: $d^1$ benzoyl anion + $a^3$ MVK. The **Stetter reaction** (Hermann Stetter, 1970s) provides the benzoyl anion equivalent catalytically: benzaldehyde + but-3-en-2-one with a catalytic thiazolium salt and a mild base (triethylamine).

**Mechanism in words.** (1) The base removes the acidic C2–H of the thiazolium ring, giving a nucleophilic carbene (an ylide), whose lone pair on C2 attacks the benzaldehyde carbonyl carbon; the C=O π electrons move onto oxygen. (2) A proton shifts from the former aldehyde carbon to the oxygen (via base), giving an enaminol, the **Breslow intermediate**, in which the former carbonyl carbon is now part of an electron-rich C=C bonded to nitrogen and sulfur — a donor. (3) That carbon attacks the β-carbon of MVK in a Michael addition; the MVK π electrons move to form an enolate. (4) Proton transfer to the enolate carbon gives a tetrahedral adduct, whose O–H proton is removed; the alkoxide re-forms the C=O bond, and the bond to the thiazolium C2 breaks, releasing the 1,4-diketone and regenerating the carbene catalyst.

Every atom of benzaldehyde and MVK ends up in the product (AE $= 100\,\%$). The 1,4-diketone is the classic precursor of furans, pyrroles and thiophenes by the Paal–Knorr synthesis ([[organic-2/heterocycles]]), which is why this disconnection matters.
:::
:::

**1,6-Patterns** are most easily made by **reconnection**: join the two ends of a 1,6-dicarbonyl on paper to form a cyclohexene; in the forward direction, ozonolysis (or another oxidative cleavage) of the cyclohexene unmasks both carbonyl groups at once. Cyclohexenes are, in turn, the retron of the Diels–Alder reaction ([[organic-synthesis/pericyclic]]), so a 1,6-dicarbonyl may be only two steps from simple dienes and dienophiles. Industrially, hexanedioic (adipic) acid for nylon-6,6 is made by oxidative cleavage of a six-membered ring (cyclohexanol/cyclohexanone with nitric acid), the same logic on a large scale.

::: quiz
Which of the following are reasonable synthetic equivalents of the acyl anion synthon $\mathrm{CH_3C^-{=}O}$?
- [x] 2-Lithio-2-methyl-1,3-dithiane, followed by hydrolysis of the thioacetal after the C–C bond has been formed
- [x] The anion of an O-silylated acetaldehyde cyanohydrin, $\mathrm{CH_3C^-(OSiR_3)CN}$, unmasked to the ketone afterwards
- [ ] The lithium enolate of acetone, $\mathrm{CH_2{=}C(OLi)CH_3}$
- [ ] Acetyl chloride, $\mathrm{CH_3COCl}$
::: solution
An acyl anion equivalent must deliver the acetyl *carbon* as a nucleophile. The lithiated dithiane and the protected cyanohydrin anion both carry a carbanion at the carbon that later becomes the carbonyl carbon. The acetone enolate is nucleophilic at the α-carbon ($d^2$), not the carbonyl carbon. Acetyl chloride is the equivalent of the acylium *cation*, $\mathrm{CH_3C^+{=}O}$ — the opposite polarity.
:::
:::

::: warning A synthon is not a reagent {#warn-synthon}
It is tempting to write $\mathrm{Ph^-}$ or $\mathrm{CH_3CO^+}$ as if they were things in a bottle, or to accept any disconnection because the two synthons "look right". Two errors follow. First, a synthon can have no practical equivalent: the synthon $\mathrm{^+CH_2COCH_3}$ (an $a^2$ cation) corresponds formally to an α-halo ketone, but α-halo ketones are strong lachrymators and react with enolates in several competing ways, so the disconnection is rarely the best choice. Second, a disconnection can correspond to a real reaction that fails on *this* substrate: a Grignard addition to a ketone that also carries an ester, an aldol between two enolisable partners of similar reactivity. Always name the real reagents and run through the forward reaction, checking every other functional group in the molecule, before accepting a disconnection.
:::

## Choosing between routes {#sec-strategy}

A retrosynthetic analysis rarely produces a single route. Two questions dominate the choice: how much material survives the sequence, and how much waste it generates.

### Yield arithmetic and convergence

::: proposition Overall yield of linear and convergent routes {#prop-convergent}
In a **linear** synthesis of $n$ steps with fractional yields $p_1, p_2, \ldots, p_n$, the overall yield is
$$
Y_\text{linear} = \prod_{i=1}^{n} p_i = p^n \quad\text{if every } p_i = p.
$$ {#eq-linear-yield}
In a **convergent** synthesis, fragments are made separately and joined later. The overall yield on any one starting material is the product of the yields along the path from it to the target, and the route is usually judged by its **longest linear sequence** (LLS). For a target made by joining two fragments of $k$ steps each in one final step (total $2k+1$ steps), $Y = p^{k+1}$, compared with $p^{2k+1}$ if the same $2k+1$ steps were done in a line.
:::

::: proof
Each step converts a fraction $p_i$ of its input into output, independently of the history of the material, so the fractions multiply along a path. In the convergent case, material that starts in fragment A passes through the $k$ steps of branch A and the coupling step, $k+1$ steps in all; it never passes through branch B. Its yield is therefore $p^{k+1}$, and the same for fragment B. In the linear case every atom of the target passes through all $2k+1$ steps. Since $0 < p < 1$, $p^{k+1} > p^{2k+1}$ for $k \geq 1$. $\blacksquare$
:::

Two consequences are worth stating plainly. First, **step count is brutal**: ten steps at an excellent $90\,\%$ each leave $0.9^{10} = 34.9\,\%$ of the material, and ten steps at $80\,\%$ leave $10.7\,\%$. Second, **convergence pays most in long routes**, because the exponent is roughly halved. It also lowers risk: if a late coupling fails, two short routes are easier to repeat than one long one, and the expensive intermediates are exposed to fewer steps.

::: widget plot
f: 100*p^x; 100*p^((x+1)/2)
x: 1, 25
y: 0, 100
sliders: p=0.85:0.5:0.99:0.01
labels: \text{linear}, 100p^{n}; \text{convergent (two equal halves)}, 100p^{(n+1)/2}
caption: Overall yield (per cent) against the total number of steps $n$, for a linear route and for a convergent route in which two equal fragments are joined in the last step ([[#eq-linear-yield]], [[#prop-convergent]]). Move the per-step yield $p$. At $p = 0.85$ a 15-step linear route delivers $8.7\,\%$ of the material, while the convergent version (longest linear sequence 8) delivers $27\,\%$. Raising $p$ from $0.85$ to $0.95$ matters even more than convergence: it is why process chemists fight for every per cent of yield in each step.
:::

::: example How much starting material? {#ex-mass}
A target ($M = 400\ \mathrm{g\,mol^{-1}}$) is made by a 7-step linear route in which each step gives $85\,\%$. (a) What is the overall yield? (b) An alternative makes two fragments in 3 steps each and couples them in a final step (also $85\,\%$ each). What is the yield along the longest linear sequence? (c) How many moles of the first starting material are needed per mole of target in each route?
::: solution
(a) $0.85^7 = 0.3206$, i.e. **32.1 %**.

(b) The longest linear sequence is $3 + 1 = 4$ steps: $0.85^4 = 0.5220$, i.e. **52.2 %**.

(c) Linear: $1/0.85^7 = 3.12\ \mathrm{mol}$ of the first starting material per mole of target. Convergent: $1/0.85^4 = 1.92\ \mathrm{mol}$ of *each* fragment's starting material. Even though the convergent route uses two starting materials, each is needed in smaller excess, and the costly late intermediates are made in fewer steps. Note that both routes contain seven operations; convergence changes the yield, not the amount of laboratory work.
:::
:::

When several routes branch and recombine, it helps to see the planning problem as a network. Because yields multiply, $-\ln Y = \sum_i (-\ln p_i)$: if each step is given the "cost" $-100\ln p_i$, the highest-yielding route is the path of lowest total cost, which a shortest-path algorithm finds.

::: widget graph
nodes: Target@4,2; A1@2,4; A2@0,4; SM-A@-2,4; B1@2,2; B2@0,2; SM-B@-2,2; C1@2,0; C2@0.7,0; C3@-0.6,0; SM-C@-2,0
edges: Target-A1:5; A1-A2:51; A2-SM-A:11; Target-B1:22; B1-B2:16; B2-SM-B:16; Target-C1:8; C1-C2:8; C2-C3:8; C3-SM-C:8
algorithm: dijkstra
start: Target
caption: Three routes to one target drawn as a retrosynthetic network. Each edge is one step, weighted by $-100\ln p$ where $p$ is its yield: $95\,\%$ → 5, $60\,\%$ → 51, $90\,\%$ → 11, $80\,\%$ → 22, $85\,\%$ → 16, $92\,\%$ → 8. Run Dijkstra's algorithm from the target: the distances to SM-A, SM-B and SM-C are 67, 54 and 32, corresponding to overall yields of about $e^{-0.67} = 51\,\%$, $e^{-0.54} = 58\,\%$ and $e^{-0.32} = 73\,\%$ (exactly $51.3$, $57.8$ and $71.6\,\%$ before rounding the weights). The four-step route C beats both three-step routes, because a single poor step (route A's $60\,\%$) costs more than an extra good one. Yield is not the only criterion, of course — cost, safety and waste count too.
:::

### Atom economy and waste

Yield measures how much product we obtain relative to the theoretical maximum. It says nothing about the mass of everything else that went into the flask. Barry Trost's **atom economy** (1991) measures the efficiency built into the *equation* of a route.

::: definition Atom economy {#def-atom-economy}
For a reaction or a sequence written as a balanced equation, the **atom economy** is
$$
\text{AE} = \frac{M(\text{desired product})}{\sum M(\text{all reactants in the stoichiometric equation})} \times 100\,\%.
$$ {#eq-ae}
Reagents that appear in the balanced equation count; catalysts and solvents do not. Atom economy is a property of the chosen chemistry and is independent of yield. Process chemists also use the **E-factor** (mass of waste per mass of product, including solvents and yield losses) and **process mass intensity**, discussed in [[green-chemistry/green-metrics]].
:::

Addition reactions (Diels–Alder, hydrogenation, Michael, Stetter) have $\text{AE} = 100\,\%$; condensations lose a small molecule; substitutions and eliminations lose a leaving group; reactions using stoichiometric reagents such as the Wittig reaction ([[organic-synthesis/carbon-carbon-bonds]]), which discards triphenylphosphine oxide ($278\ \mathrm{g\,mol^{-1}}$), can have low atom economy even when the yield is high.

::: example Two routes to ibuprofen {#ex-ibuprofen}
Ibuprofen, 2-[4-(2-methylpropyl)phenyl]propanoic acid ($\mathrm{C_{13}H_{18}O_2}$, $M = 206.28\ \mathrm{g\,mol^{-1}}$), is a textbook case of route choice. The original Boots route (1960s) took six steps from 2-methylpropylbenzene (isobutylbenzene): Friedel–Crafts acetylation, Darzens condensation with ethyl chloroacetate, hydrolysis and decarboxylation to an aldehyde, oxime formation, dehydration to a nitrile and hydrolysis. The BHC (Boots–Hoechst–Celanese) route of the early 1990s takes three: Friedel–Crafts acetylation with acetic anhydride (HF as catalyst and solvent, recycled), catalytic hydrogenation of the ketone to the alcohol, and palladium-catalysed carbonylation of the alcohol with carbon monoxide. Compare the atom economies, treating the stoichiometric reagents of the Boots route as acetic anhydride, ethyl chloroacetate, sodium ethoxide, $\mathrm{H_3O^+}$, hydroxylamine and two waters (sum of reactant masses $514.99\ \mathrm{g\,mol^{-1}}$).
::: solution
**Boots:** $\text{AE} = 206.28/514.99 = 40.1\,\%$. Most of the mass of the reagents leaves as acetic acid, sodium chloride, ethanol, carbon dioxide and ammonium salts.

**BHC:** the overall equation is
$$
\mathrm{C_{10}H_{14} + C_4H_6O_3 + H_2 + CO \rightarrow C_{13}H_{18}O_2 + CH_3CO_2H},
$$
with molar masses $134.22 + 102.09 + 2.02 + 28.01 = 266.34\ \mathrm{g\,mol^{-1}}$, so
$$
\text{AE} = \frac{206.28}{266.34} = 77.4\,\%,
$$
and the only by-product, acetic acid, is itself useful (counting it as a product would raise the figure to about $99\,\%$). The BHC route halves the number of steps and replaces stoichiometric reagents by catalysts (HF, Raney nickel or Pd/C, a palladium carbonylation catalyst). Retrosynthetically, its key move is to see the carboxylic acid as a carbonylation of a benzylic alcohol — a disconnection of the C–$\mathrm{CO_2H}$ bond to CO, which was unavailable to the original designers. New reactions create new disconnections.
:::
:::

### Other strategic considerations

Beyond yield and atom economy, a route is judged on:

- **Chemoselectivity and protecting groups.** Each protection and deprotection adds two steps; a route that avoids them by ordering the steps cleverly (for example, introducing a sensitive group last) is usually better ([[organic-synthesis/protecting-groups]]).
- **Stereochemistry.** A route that sets stereocentres early, under control, beats one that must separate isomers at the end ([[organic-synthesis/stereoselective-synthesis]]).
- **Availability, cost and safety of reagents.** A disconnection that requires a toxic, explosive or unstable reagent is a poor choice even if it is short.
- **Robustness and scalability.** Crystalline intermediates, reactions that tolerate traces of water and air, and steps that do not need chromatography make a route usable outside the research laboratory.

Corey grouped the guidelines of [[#alg-retro]] into five families of **strategy**: *transform-based* (seek the retron of a powerful reaction), *structure-goal* (aim for a particular starting material, such as a sugar or amino acid from the chiral pool), *topological* (choose the bonds whose disconnection simplifies the ring system most), *stereochemical* (remove stereocentres under stereocontrol) and *functional-group-based* (use the functional groups to guide disconnections). Good analyses use several at once.

::: history
Chemists made complex molecules long before anyone wrote down how they planned them; Robert Robinson's one-pot, biomimetic syntheses of 1917 and Robert Burns Woodward's syntheses of the 1940s and 1950s were planned by extraordinary intuition. Elias James Corey formalised the backward logic in a lecture published as "General methods for the construction of complex molecules" (*Pure and Applied Chemistry*, 1967), introducing the terms synthon and retrosynthetic analysis, and applied it in syntheses such as longifolene (1961) and the prostaglandins (1969). With W. Todd Wipke he showed in 1969 (*Science*) that the analysis could be coded as computer rules (the program later called LHASA). Corey and Dieter Seebach introduced lithiated 1,3-dithianes as acyl anion equivalents in 1965, and Seebach's 1979 review in *Angewandte Chemie* made "umpolung" a standard idea. Stuart Warren's *Organic Synthesis: The Disconnection Approach* (1982) brought the method into undergraduate teaching, and Corey and Xue-Min Cheng's *The Logic of Chemical Synthesis* (1989) set out the strategies in full. Corey received the 1990 Nobel Prize in Chemistry "for his development of the theory and methodology of organic synthesis". Since 2018, computer planners trained on millions of published reactions (for example the work of Marwin Segler, Mike Preuss and Mark Waller in *Nature*, and the Chematica/Synthia program of Bartosz Grzybowski's group) have revived Corey's 1969 idea at scale.
:::

## Where this leads

Every later chapter adds disconnections to the toolkit of [[#alg-retro]]. [[organic-synthesis/redox-in-synthesis]] provides the oxidation-level adjustments behind most FGIs; [[organic-synthesis/protecting-groups]] solves the chemoselectivity problems the guidelines flag; [[organic-synthesis/carbon-carbon-bonds]] extends the list of donor and acceptor synthons to Wittig reagents, enolates of every kind and cross-coupling partners (whose mechanism is in [[organometallics-catalysis/cross-coupling]]); [[organic-synthesis/pericyclic]] supplies the Diels–Alder retron; and [[organic-synthesis/total-synthesis]] shows how the arithmetic of [[#prop-convergent]] shapes the strategy of long syntheses. How we know that a proposed forward step works the way we drew it is the subject of [[organic-synthesis/mechanism-determination]].

::: summary
- Retrosynthetic analysis works backwards from the target: each **disconnection** ($\Rightarrow$) is the reverse of a reliable reaction and produces **synthons**, idealised ions realised by **synthetic equivalents**.
- **FGI** and **FGA** change functional groups on paper so that good disconnections become possible; disconnect bonds to heteroatoms first and look for retrons (enone → aldol, 1,5-dicarbonyl → Michael, cyclohexenone → Robinson, cyclohexene → Diels–Alder).
- A heteroatom gives odd carbons acceptor and even carbons donor character; **1,3- and 1,5-** dioxygenated patterns are consonant (aldol, Claisen, Michael), **1,2-, 1,4- and 1,6-** are dissonant and need **umpolung** (dithianes, cyanohydrins, carbene catalysis) or **reconnection** (ozonolysis of a ring).
- Overall yield is the product of step yields; **convergent** routes are judged by their longest linear sequence and roughly halve the exponent.
- **Atom economy** $= M(\text{product})/\sum M(\text{reactants})$ is fixed by the chosen chemistry: additions score 100 %, the Boots ibuprofen route 40 % and the BHC route 77 %.
- Check every proposed forward step for chemo-, regio- and stereoselectivity, and for reagent hazards, before accepting it.
:::

## Exercises

::: exercise Atom economy of aspirin {level=1 check="75.0"}
Aspirin (2-acetoxybenzoic acid, $180.16\ \mathrm{g\,mol^{-1}}$) is made from 2-hydroxybenzoic (salicylic) acid ($138.12\ \mathrm{g\,mol^{-1}}$) and acetic anhydride ($102.09\ \mathrm{g\,mol^{-1}}$). Calculate the atom economy. (Enter it in per cent, to three significant figures.)
::: solution
$\text{AE} = 180.16/(138.12 + 102.09) = 180.16/240.21 = 0.750 = 75.0\,\%$ ([[#eq-ae]]). The disconnection is of the ester C–O bond: phenol oxygen (donor) and acylium (acceptor). The by-product is acetic acid.
:::
:::

::: exercise A long linear route {level=1 check="21.6"}
A linear synthesis has 12 steps, each in $88\,\%$ yield. What is the overall yield? (Enter it in per cent, to three significant figures.)
::: solution
$0.88^{12} = 0.2157$, i.e. $21.6\,\%$ ([[#eq-linear-yield]]).
:::
:::

::: exercise Disconnecting a tertiary alcohol {level=1}
Give two different Grignard-based syntheses of 1,1-diphenylethan-1-ol, $\mathrm{Ph_2C(OH)CH_3}$, one of which uses an ester.
::: solution
(a) Disconnect a Ph–C bond: $\mathrm{PhMgBr}$ + acetophenone $\mathrm{PhCOCH_3}$, one equivalent. (b) Disconnect the $\mathrm{CH_3}$–C bond: $\mathrm{CH_3MgBr}$ + benzophenone $\mathrm{Ph_2CO}$. (c) Because two groups are identical, disconnect *both* Ph–C bonds: two equivalents of $\mathrm{PhMgBr}$ + an acetate ester such as ethyl acetate. The first equivalent adds to the ester carbonyl, the tetrahedral intermediate expels ethoxide to give acetophenone, and the second equivalent adds to that ketone (which is more reactive than the ester, so the reaction cannot be stopped at the ketone).
:::
:::

::: exercise Consonant or dissonant? {level=2}
Identify the 1,$n$-relationship and classify as consonant or dissonant: (a) 4-hydroxybutan-2-one; (b) 3-hydroxy-3-methylbutan-2-one; (c) hexane-2,5-dione; (d) heptane-2,6-dione. Suggest a key C–C disconnection for each consonant case.
::: solution
(a) Ketone C2, carbinol C4: 1,3, consonant — aldol of acetone enolate with formaldehyde (C3–C4 disconnection). (b) Ketone C2, carbinol C3: 1,2, dissonant (an α-hydroxy ketone; made e.g. by adding an acyl anion equivalent to acetone, or by α-oxidation of a ketone). (c) C2 and C5: 1,4, dissonant (Stetter-type umpolung, or hydrolysis of 2,5-dimethylfuran as a "reconnection"). (d) C2 and C6: 1,5, consonant — Michael addition of acetone enolate (or a stabilised equivalent such as ethyl acetoacetate, followed by decarboxylation) to MVK, cutting C3–C4.
:::
:::

::: exercise Starting material for 10 g {level=2 check="14.3"}
You need $10.0\ \mathrm{g}$ of a target ($M = 400\ \mathrm{g\,mol^{-1}}$) made by a 6-step linear route in which every step gives $80\,\%$. The first starting material has $M = 150\ \mathrm{g\,mol^{-1}}$ and is incorporated one-to-one. What mass of it do you need? (Enter the mass in grams, to three significant figures.)
::: solution
Target: $10.0/400 = 0.0250\ \mathrm{mol}$. Overall yield $0.8^6 = 0.2621$. Starting material: $0.0250/0.2621 = 0.0954\ \mathrm{mol}$, i.e. $0.0954 \times 150 = 14.3\ \mathrm{g}$. A convergent route with a longest linear sequence of 4 steps would need only $0.0250/0.8^4 \times 150 = 9.16\ \mathrm{g}$ of each fragment's starting material.
:::
:::

::: exercise A chalcone {level=2 check="92.0"}
Disconnect (*E*)-1,3-diphenylprop-2-en-1-one (chalcone, $\mathrm{PhCOCH{=}CHPh}$, $208.26\ \mathrm{g\,mol^{-1}}$), give the forward reaction, and calculate the atom economy from acetophenone ($120.15\ \mathrm{g\,mol^{-1}}$) and benzaldehyde ($106.12\ \mathrm{g\,mol^{-1}}$). (Enter the atom economy in per cent, to three significant figures.)
::: solution
FGI to the β-hydroxy ketone $\mathrm{PhCOCH_2CH(OH)Ph}$ (1,3, consonant), then disconnect C2–C3: acetophenone enolate + benzaldehyde, a Claisen–Schmidt condensation with aqueous NaOH in ethanol, exactly as in [[#ex-benzalacetone]]. Benzaldehyde cannot enolise, so it is the only electrophile; acetophenone is the only nucleophile; dehydration to the conjugated enone drives the reaction. $\text{AE} = 208.26/(120.15 + 106.12) = 208.26/226.27 = 92.0\,\%$; water is the only by-product.
:::
:::

::: exercise A 1,6-dicarbonyl by reconnection {level=3}
Propose a synthesis of 6-oxoheptanal, $\mathrm{CH_3CO(CH_2)_4CHO}$, from cyclohexanone.
::: hint
Join C1 and C6 on paper. What ring, and what substituent, do you get?
:::
::: solution
**Analysis.** The aldehyde carbon (C1) and ketone carbon (C6) are in a 1,6-relationship: dissonant. Reconnect them as a C=C double bond: the target is the ozonolysis product of **1-methylcyclohexene** (the methyl-bearing alkene carbon becomes the ketone, the CH alkene carbon the aldehyde). 1-Methylcyclohexene $\Rightarrow$ (FGI, dehydration) 1-methylcyclohexan-1-ol $\Rightarrow$ (Grignard disconnection) cyclohexanone + $\mathrm{CH_3MgBr}$.

**Forward.** (1) $\mathrm{CH_3MgBr}$ adds to cyclohexanone (the C–Mg electrons attack the carbonyl carbon, the π electrons go to oxygen; acid work-up protonates the alkoxide). (2) Acid-catalysed dehydration (e.g. phosphoric acid with distillation): the OH is protonated, water leaves to give a tertiary cation, and loss of a ring proton gives mainly the more substituted, endocyclic alkene, 1-methylcyclohexene (Zaitsev). (3) Ozonolysis at low temperature followed by a reductive work-up (dimethyl sulfide or triphenylphosphine) cleaves the C=C and gives 6-oxoheptanal; an oxidative work-up would give the keto acid instead. Ozone is toxic and ozonides are explosive, so the reaction is run cold, in solution, behind a shield, with the reductive work-up completed before concentration ([[organic-synthesis/redox-in-synthesis]]).
:::
:::

::: exercise An enamine route to a 1,4-diketone {level=3}
2-(2-Oxopropyl)cyclohexan-1-one, a 1,4-diketone, is to be made from cyclohexanone without using an α-halo ketone. Analyse the polarity of the target and propose a route using an alkylation followed by an oxidation. Explain why the alkylation is done through an enamine rather than the lithium enolate.
::: hint
A terminal alkene is a masked methyl ketone (Wacker oxidation).
:::
::: solution
**Polarity.** Ring C1 (ketone) and side-chain C2′ (ketone) are linked through ring C2 and side-chain C1′: a 1,4-relationship, dissonant. Disconnecting ring C2–C1′ needs either a $d^2$ ring enolate and an $a^2$ side-chain cation (α-halo ketone), or the reverse — both unnatural on one side.

**Solution by FGI.** Replace the side-chain ketone by its synthetic equivalent, a terminal alkene: $\mathrm{{-}CH_2COCH_3 \Rightarrow {-}CH_2CH{=}CH_2}$ (FGI; forward: **Wacker oxidation**, $\mathrm{PdCl_2}$ catalyst with CuCl and $\mathrm{O_2}$ in aqueous DMF, which converts a terminal alkene to a methyl ketone). Now 2-allylcyclohexanone disconnects at ring C2–C1′ into a natural $d^2$ ring enolate and an allyl cation, whose equivalent is allyl bromide — consonant.

**Forward.** (1) Cyclohexanone + pyrrolidine (acid catalyst, removing water) → the enamine. (2) Alkylation with allyl bromide: the nitrogen lone pair pushes into the C=C, whose β-carbon attacks the allylic carbon, displacing bromide ($\mathrm{S_N2}$), giving an iminium salt. (3) Aqueous hydrolysis of the iminium → 2-allylcyclohexanone. (4) Wacker oxidation → 2-(2-oxopropyl)cyclohexan-1-one.

**Why the enamine (Stork, 1963).** Enamines are neutral, mild nucleophiles: after one alkylation the iminium product is not nucleophilic, so dialkylation is suppressed, and the reaction needs no strong base. A lithium enolate can undergo proton exchange with the mono-alkylated ketone and give mixtures of mono- and dialkylated products. Allyl bromide is toxic and a lachrymator: it is used in a fume cupboard under supervision.
:::
:::

::: exercise Shortest path, highest yield {level=3 check="0.590"}
Show that choosing the route with the highest overall yield is equivalent to choosing the path of least total weight when each step is weighted by $-\ln p_i$. Then compare a five-step route with every step at $90\,\%$ with a three-step route at $80$, $70$ and $95\,\%$. (Enter the overall yield of the better route as a fraction, to three significant figures.)
::: solution
$Y = \prod p_i$, and $\ln$ is strictly increasing, so maximising $Y$ is the same as maximising $\ln Y = \sum \ln p_i$, i.e. minimising $\sum(-\ln p_i)$. Every weight is positive (because $p_i < 1$), which is the condition for Dijkstra's algorithm to be correct. Five steps at $0.90$: $0.9^5 = 0.590$ (total weight $5 \times 0.105 = 0.527$). Three steps: $0.80 \times 0.70 \times 0.95 = 0.532$ (weight $0.223 + 0.357 + 0.051 = 0.631$). The **longer route is better**, $Y = 0.590$. In practice the five-step route also costs more labour and solvent, and a real decision weighs these too.
:::
:::
