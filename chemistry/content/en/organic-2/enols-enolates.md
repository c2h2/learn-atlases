Every chapter so far has attacked the carbonyl carbon from the outside. This chapter opens the second front: the carbon *next to* the carbonyl, the $\alpha$-carbon, whose hydrogens are acidic for structural reasons — and whose anion is a nucleophile at carbon, which is the single most important fact in organic synthesis. An alkyl anion does not exist; an enolate does, because the negative charge can stand on the oxygen where it belongs. Once the $\alpha$-carbon can carry electrons, the polarity of the carbonyl is reversed — **umpolung** — and carbon–carbon bonds form at positions no organometallic reagent could reach directly. Alkylation, halogenation, racemisation, the condensations of the next chapter, and the entire biosynthetic logic of fatty acids and steroids all run through the enolate.

## The alpha hydrogen: an acid hiding in a hydrocarbon

::: definition Keto, enol, enolate {#def-enol-enolate}
A carbonyl compound with at least one $\alpha$-hydrogen exists in equilibrium with its **enol** — the tautomer in which the $\alpha$-carbon has become an alkene carbon and the oxygen a hydroxyl ($\mathrm{C{=}C{-}OH}$, hence *ene* + *ol*). Tautomers are constitutional isomers interconverted by moving a proton and a $\pi$ bond; the enol is usually a minor component (acetone: about $2.5 \times 10^{-4}\ \%$ enol) but is the species that reacts with electrophiles under acidic conditions. Remove the $\alpha$-proton completely and you get the **enolate**: a resonance hybrid with the charge shared between $\alpha$-carbon (carbanion form, the nucleophilic one) and oxygen (oxyallyl/alkoxide form, where most of the charge actually sits). The enolate is an ambident nucleophile: it can bond through carbon or through oxygen, and choosing between them is a recurring theme.
:::

::: proposition Why alpha hydrogens are acidic {#prop-acidity}
Approximate $\mathrm{p}K_\mathrm{a}$ values: ketone $\alpha$-H $\approx 19$–$21$ (acetone 19.2), aldehyde $\approx 17$, ester $\approx 25$, 1,3-dicarbonyl $\approx 9$–$13$ (acetylacetone 9.0, diethyl malonate 13), versus alkane $\approx 50$ and alcohol $\mathrm{O{-}H}$ $\approx 16$. The enolate is stabilised because its charge is delocalised onto electronegative oxygen — the resonance form with charge on oxygen dominates, which is why enolates are drawn and mostly behave as oxygen anions that happen to react at carbon. Two structural consequences: the $\alpha$-carbon flattens toward $sp^2$ in the enolate (conjugation demands planarity), and the more electron-withdrawing and conjugated the anion's neighbourhood, the lower the $\mathrm{p}K_\mathrm{a}$ — hence 1,3-dicarbonyls, where the charge spreads over *two* carbonyls, are acidic enough for hydroxide to enolise them appreciably.
:::

::: example Hydroxide is not enough {#ex-acidity}
Acetone ($\mathrm{p}K_\mathrm{a}$ 19.2) with hydroxide ($\mathrm{p}K_\mathrm{a}$ of water 15.7): compute the equilibrium constant for enolisation and the enolate concentration when $1.0\ \mathrm{mol\,L^{-1}}$ acetone meets $1.0\ \mathrm{mol\,L^{-1}}$ hydroxide. What follows for synthesis?
::: solution
$K = 10^{15.7 - 19.2} = 3.2 \times 10^{-4}$. With $x$ the enolate (and water) concentration, $x^2/(1.0-x)^2 = 3.2\times10^{-4}$, so $x/(1-x) = 0.0178$ and $x = 0.017\ \mathrm{mol\,L^{-1}}$ — under two per cent enolate. The synthetic moral: hydroxide and alkoxide give only *catalytic* enolate, which is exactly right for reactions run in protic solvent (aldol additions, halogenation) but useless when the enolate must be the reagent. For full conversion use a base whose conjugate acid is far weaker: LDA (lithium diisopropylamide, conjugate acid diisopropylamine $\mathrm{p}K_\mathrm{a} \approx 36$) in THF at $-78\ \mathrm{^\circ C}$ enolises ketones irreversibly and completely — the workhorse enolising agent of the subject.
:::
:::

::: widget plot
f: 1/(1+10^(a-x)); 1/(1+10^(a+10-x))
x: 0, 14
y: -0.05, 1.1
sliders: a=9:4:14:1
labels: \text{1,3-dicarbonyl}; \text{simple ketone}
caption: Fraction of carbonyl compound present as enolate versus pH, from the Henderson–Hasselbalch ratio $[\mathrm{enolate}]/[\mathrm{acid}] = 10^{\mathrm{pH}-\mathrm{p}K_\mathrm{a}}$. Slider $a$ sets the 1,3-dicarbonyl's $\mathrm{p}K_\mathrm{a}$ (acetylacetone 9.0); the second curve sits ten $\mathrm{p}K_\mathrm{a}$ units higher, a simple ketone. The picture explains the whole reagent table of this chapter: at any achievable aqueous pH the simple ketone (upper curve, flat at zero) is never appreciably enolised by hydroxide — hence LDA in dry ether — while the 1,3-dicarbonyl crosses half-enolised near pH 9, so even carbonate or hydroxide suffices for its alkylation. Aqueous base is a pH of at most 14; $\mathrm{p}K_\mathrm{a}$ 20 chemistry lives outside water, in aprotic solvent with amide bases.
:::

## Making enolates on purpose: kinetic versus thermodynamic

::: proposition Two enolates, two temperatures {#prop-kin-thermo}
An unsymmetrical ketone can form two enolates. Which one you get depends on whether deprotonation is irreversible or reversible. **Kinetic control:** LDA at $-78\ \mathrm{^\circ C}$ removes the most accessible proton fastest — the less hindered $\alpha$-carbon — and the enolate, once formed, has no way back (no amine to protonate it at $-78\ \mathrm{^\circ C}$ on the timescale): you get the *less substituted* enolate. **Thermodynamic control:** a reversible base (alkoxide in the matching alcohol) at warmer temperature lets the two enolates equilibrate through the ketone, and the *more substituted* (more alkene-like, more stable) enolate accumulates. The two regimes are a clean example of [[organic-2/conjugation]]-style kinetic/thermodynamic reasoning applied to acidities instead of additions.
:::

::: example Which enolate, which product {#ex-keto-enolate}
2-Methylcyclohexanone is treated (a) with LDA, THF, $-78\ \mathrm{^\circ C}$, then methyl iodide; (b) with $\mathrm{NaOEt}$, EtOH, room temperature to warm, then methyl iodide. Give the major product of each.
::: solution
(a) Kinetic: LDA takes a proton from the *unsubstituted* $\alpha$-carbon (C6, bearing two hydrogens; C2 bears only one and sits next to the methyl), giving the less substituted enolate, which alkylates at carbon: 2,6-dimethylcyclohexanone. (b) Thermodynamic: reversible enolisation funnels into the more substituted enolate (the one with the double bond to C2, trisubstituted), and alkylation there gives 2,2-dimethylcyclohexanone. The methyl iodide traps whichever enolate is present, so the *base and temperature* — not the alkylating agent — decide the constitution. This is the synthetic version of the acidity argument: kinetic acidity is about how fast a proton is reached, thermodynamic acidity about how stable the anion is.
:::
:::

::: definition Ambident and the hard–soft choice {#def-ambident}
The enolate's two nucleophilic sites are chemically different: carbon is soft (charge spread over a larger volume), oxygen is hard (charge concentrated, electronegative). Alkylation with primary alkyl halides and tosylates occurs mainly at **carbon** — the soft–soft pairing with the polarisable $\mathrm{C{-}X}$ carbon — though some $O$-alkylation (enol ether) competes, worse with harder counter-cations ($\mathrm{Li^+}$ chelates oxygen and delivers alkyl to oxygen more). Silyl chlorides ($\mathrm{TMSCl}$) and acyl chlorides react at **oxygen** to give enol silyl ethers and enol esters, because silicon is the hard electrophile par excellence. Enol silyl ethers are not a detour but a strategy: they are neutral, isolable, and react with soft electrophiles (aldol chemistry, halogenation, epoxidation) through the carbon end, with the silicon as a removable handle.
:::

::: example Stabilised enolates: the acetoacetic ester route {#ex-aaa}
Give a synthesis of pentan-2-one from diethyl acetoacetate (the acetoacetic ester synthesis), and say why monoalkylation is easy here when direct ketone enolates over-alkylate.
::: solution
$\mathrm{NaOEt/EtOH}$, then ethyl bromide: ethoxide (matching alkoxide — no transesterification) removes the proton between the two carbonyls ($\mathrm{p}K_\mathrm{a}$ 11), the stabilised enolate alkylates at carbon, and the product, though now more substituted, is still far more acidic than ethanol, so it stays as an anion until workup — no second alkylation. Then aqueous acid, heat: the ester hydrolyses to the $\beta$-keto acid, which decarboxylates near $100\ \mathrm{^\circ C}$ through a six-membered cyclic transition state that delivers the proton to carbon as $\mathrm{CO_2}$ leaves, giving pentan-2-one. The acetoacetic ester synthesis makes substituted methyl ketones; the malonic ester synthesis ($\mathrm{CH_2(CO_2Et)_2}$, same sequence, decarboxylation of the 1,3-diacid) makes substituted acetic acids. Both work because the 1,3-dicarbonyl $\mathrm{p}K_\mathrm{a}$ of $\sim 11$ lets mild base generate the enolate *completely* as the stabilised anion — the one place in enolate chemistry where "too stable" is the point.
:::
:::

## Enols: the alpha carbon as a nucleophile towards electrophiles

::: proposition Alpha halogenation runs through the enol — and cannot be stopped {#prop-enol-halogenation}
Under acid, the enol (tiny concentration, huge reactivity) attacks $\mathrm{X_2}$ at carbon: the rate law is first order in ketone and acid, *zero* order in halogen — enol formation is rate-determining, a classic physical-organic result. Under base, halogenation is even faster, because the product $\alpha$-haloketone is *more* acidic than the starting ketone (the halogen's withdrawal): its proton is removed preferentially, the halogen is installed again, and again — so methyl ketones ($\mathrm{RCOCH_3}$) go all the way to $\mathrm{RCOCX_3}$, and hydroxide then substitutes at the carbonyl (hydroxide addition, $\mathrm{CX_3^-}$ ejection — a carboxylic-derivatives reaction in disguise) to give $\mathrm{RCO_2H}$ plus $\mathrm{HCX_3}$: the **haloform reaction**. Iodine version: yellow, antiseptic iodoform marks methyl ketones (and ethanol/acetaldehyde, which halogenate after oxidation) — the old iodoform test.
:::

::: example Haloform, atom by atom {#ex-haloform}
Acetophenone with excess iodine in aqueous $\mathrm{NaOH}$ gives a carboxylate and a yellow precipitate. Give the products, the balanced equation, and the mechanism's two halves.
::: solution
Benzoate ($\mathrm{PhCO_2^-}$) and iodoform ($\mathrm{CHI_3}$): $\mathrm{PhCOCH_3 + 3\,I_2 + 4\,NaOH \rightarrow PhCO_2Na + CHI_3 + 3\,NaI + 3\,H_2O}$. Half one — exhaustive halogenation: each $\mathrm{C{-}H}$ replaced by $\mathrm{C{-}I}$ makes the remaining $\alpha$-protons more acidic, so the enolate forms faster each round; three rounds, no stopping. Half two — the acyl substitution: hydroxide adds to the ketone carbonyl, and the tetrahedral intermediate ejects $\mathrm{CI_3^-}$ (the only carbanion good enough to leave, stabilised by three iodines), giving benzoic acid, which the base immediately deprotonates — the acid–base step that, as in saponification, makes the whole thing irreversible. The same logic explains why chlorination of acetone cannot be stopped at mono-chlorination under base, and why acid-catalysed halogenation *can* be: under acid the rate-determining step is enol formation, and the electron-withdrawing halogen *slows* enol formation in the product — the monohalogenated ketone enolises more slowly than the starting material, so the reaction stalls after one halogen.
:::
:::

::: warning Three traps at the alpha carbon {#warn-alpha}
**(1)** Chiral $\alpha$-centres do not survive base or acid: enolisation is planarisation, and reprotonation comes from either face — $(S)$-2-phenylbutanone racemises in either catalytic acid or catalytic base through the common planar enol/enolate. Stereochemistry at $\alpha$-carbons is conditional on *not* having acid, base, or light and air nearby. **(2)** Enolate anions of simple ketones are strong bases: with secondary or tertiary alkyl halides, $\mathrm{E2}$ elimination outruns alkylation — direct enolate alkylation is a primary-halide reaction, full stop (or use the silyl-ether/Mukaiyama route). **(3)** Enolisable ketones and strong base in the same flask with an *electrophilic carbonyl* present is a recipe for self-condensation — the enolate attacks the ketone it came from. That "disaster" is the aldol reaction, and it gets its own chapter next.
:::

::: quiz
2-Methylcyclohexanone is treated with $\mathrm{NaOEt}$ in EtOH at $50\ \mathrm{^\circ C}$, then with allyl bromide. Which enolate dominates before alkylation?
- [x] the more substituted enolate (double bond toward C2)
- [ ] the less substituted enolate (double bond toward C6)
- [ ] both equally — enolates do not equilibrate
- [ ] the thermodynamic product cannot be predicted
::: solution
The more substituted one: alkoxide in protic solvent at warm temperature means reversible deprotonation, and reversible means the equilibrium composition — the trisubstituted, more alkene-like enolate. (Kinetic, LDA/$-78\ \mathrm{^\circ C}$, would give the C6 enolate instead.) Enolates absolutely do equilibrate when the base is weak enough and warm enough — that is the whole content of thermodynamic control.
:::
:::

::: history
Controlling *which* enolate, and *which face* of it, was the standing problem of enolate chemistry until 1979–81, when David **Evans** attached the enolising substrate to a chiral auxiliary — his oxazolidin-2-thiones/oxazolidinones — and let the molecule do the choosing. The boron or titanium enolate of an imide derived from an Evans auxiliary is a single geometric isomer whose substituent blocks one face, so aldol and alkylation reactions deliver products with $>99:1$ diastereoselectivity by a drawn-out, chair-like transition state that undergraduates can literally draw. The "Evans aldol" turned enolate stereocontrol from luck into design, and the auxiliary — a simple ester linkage — unloads under mild lithium peroxide conditions. Enolate chemistry had spent thirty years learning to make enolates; Evans taught it to *aim* them.
:::

## Where this leads

Two enolates meeting one carbonyl is the aldol reaction, and two carbonyl compounds with a leaving group is the Claisen — the whole of [[organic-2/condensations]] is this chapter's nucleophile pointed at the previous chapters' electrophile. Enolate alkylation and acylation underlie the synthesis chapters of the organic-synthesis course; the enolate's biological twin, the enolate of a thioester, builds every fatty acid in a body; and the umpolung idea returns, in carbon-carbon bond disconnection, throughout [[organic-2/condensations]] and the medicinal chemistry of $\beta$-lactams ([[organic-2/heterocycles]]). The kinetic/thermodynamic framework is the same one built in [[organic-2/conjugation]].

::: summary
- The $\alpha$-C–H of a carbonyl is acidic ($\mathrm{p}K_\mathrm{a}$ 19–21 for ketones, 25 for esters, 9–13 for 1,3-dicarbonyls) because the enolate puts its charge on oxygen; the enol is the neutral, electrophile-reactive tautomer.
- Hydroxide enolises simple ketones only to about $2\ \%$ — fine for catalytic chemistry, useless for reagent quantities; LDA ($\mathrm{p}K_\mathrm{a}$ of amine $\approx 36$) in dry THF at $-78\ \mathrm{^\circ C}$ gives complete, irreversible enolisation.
- Unsymmetrical ketones: LDA/$-78\ \mathrm{^\circ C}$ gives the kinetic (less substituted) enolate; alkoxide/protic/warm gives the thermodynamic (more substituted) one — base and temperature, not the electrophile, choose.
- Enolates are ambident: soft electrophiles (primary $\mathrm{R{-}X}$) alkylate at carbon, hard ones ($\mathrm{Me_3SiCl}$, acyl groups) at oxygen; enol silyl ethers are storable, steerable enolates.
- 1,3-Dicarbonyl enolates (malonic, acetoacetic ester syntheses) alkylate cleanly with mild base and decarboxylate through a six-membered cyclic transition state — the classic route to substituted methyl ketones and acetic acids.
- Enol + $\mathrm{X_2}$: acid halogenation is zero-order in halogen and stops at mono; base halogenation accelerates itself to the haloform reaction; and any enolisation planarises and racemises $\alpha$-stereocentres.
:::

## Exercises

::: exercise Circle the acidic hydrogens {level=1}
How many distinct enolates can (a) cyclohexanone and (b) acetophenone form? Which $\alpha$-positions are involved in each?
::: solution
Cyclohexanone: both $\alpha$-positions are equivalent $\mathrm{CH_2}$ groups — one enolate. Acetophenone ($\mathrm{PhCOCH_3}$): only the methyl bears $\alpha$-hydrogens (the phenyl-bearing carbon has none) — one enolate, and unusually, no regiochemical choice at all. The lesson of these "easy" cases: no choice means no kinetic/thermodynamic problem, which is why they are the substrates of choice when only one enolate is wanted.
:::
:::

::: exercise Choose the base {level=1}
For complete enolisation of ethyl propanoate ($\mathrm{p}K_\mathrm{a} \approx 25$), choose between $\mathrm{NaOEt}$, LDA, and $\mathrm{NaOH}$, and justify.
::: solution
LDA. Hydroxide (conjugate acid 15.7) and ethoxide (16) are fifteen $\mathrm{p}K_\mathrm{a}$ units too weak — under $10^{-9}$ enolate at best; and ethoxide, while useless for *complete* enolisation, is the correct *catalytic* base for ester chemistry because it cannot transesterify (matching alkoxide). LDA ($\mathrm{p}K_\mathrm{a}$ 36) wins by eleven units — $10^{11}$-fold — and delivers the ester enolate quantitatively in THF at $-78\ \mathrm{^\circ C}$, which is exactly how ester enolates are made for directed aldol and acylation chemistry.
:::
:::

::: exercise Iodoform positives {level=1}
Which give a positive iodoform test (yellow $\mathrm{CHI_3}$): propanone, propanal, ethanol, propan-2-ol, pentan-3-one?
::: solution
Propanone (methyl ketone), ethanol (oxidised by hypoiodite to acetaldehyde, itself a methyl carbonyl), and propan-2-ol (oxidised to propanone). Not propanal (its $\alpha$-carbon is the carbonyl-adjacent $\mathrm{CH_2}$; the methyl is not on the carbonyl — no $\mathrm{COCH_3}$) and not pentan-3-one (two ethyls, no methyl directly on the carbonyl). The test reads $\mathrm{CH_3CO{-}}$ or the $\mathrm{CH_3CH(OH){-}}$ that halogenation can reach by oxidation.
:::
:::

::: exercise Kinetic versus thermodynamic, again {level=2}
2-Methylcyclohexanone, thermodynamic enolate, trapped with $\mathrm{D_2O}$ before any alkyl halide: give the product and its deuterium content. Why is this a cleaner experiment than alkylation?
::: solution
The thermodynamic enolate has its double bond between C1 and C2; quenching with $\mathrm{D_2O}$ puts one deuterium at C2, giving 2-methyl-2-deuteriocyclohexanone with the other $\alpha$-position (C6) untouched. (Repeated enolisation–quench cycles would eventually exchange both positions, since the C6 protons are also acidic, but a single quench of the pre-formed enolate installs exactly one D at C2.) Cleaner than alkylation because protonation is fast, irreversible, and free of elimination and polyalkylation side reactions — the isotopic label reports the enolate's structure without the alkylating agent's complications.
:::
:::

::: exercise Malonic ester synthesis {level=2}
Give a synthesis of 3-methylbutanoic acid from diethyl malonate, and say which base and why.
::: solution
Disconnect at the $\alpha$-carbon: the malonate carbon becomes the acid's $\alpha$-carbon, so the alkyl halide must supply $(\mathrm{CH_3})_2\mathrm{CHCH_2{-}}$ — isobutyl bromide, a primary halide (good for $\mathrm{S_N2}$). Sequence: $\mathrm{NaOEt/EtOH}$ (the matching alkoxide; the substrate's $\mathrm{p}K_\mathrm{a}$ of 13 means ethoxide enolises a useful fraction, and the product anion drives it), then isobutyl bromide; then aqueous acid, heat (hydrolysis of both esters, then decarboxylation of the 1,3-diacid) → 3-methylbutanoic acid. One alkyl group, one halide, one acid: malonic ester synthesis is substitution at an acetic-acid $\alpha$-carbon in disguise.
:::
:::

::: exercise Racemisation kinetics {level=2}
$(S)$-2-Methylcyclohexanone in $\mathrm{CH_3OH}$ with catalytic $\mathrm{NaOCH_3}$ loses optical activity completely; in pure $\mathrm{CH_3OH}$ without base it does not. Explain both, and say what the complete loss says about the intermediate.
::: solution
With methoxide, each enolisation–reprotonation cycle passes through a planar, achiral enolate: reprotonation at C2 occurs with equal probability from either face, giving both configurations, and repeated cycling drives the ratio to 1:1 — complete racemisation. Without base, the barrier to enolisation (uncatalysed $\alpha$-deprotonation, $\mathrm{p}K_\mathrm{a}$ 20 against methanol's 16) is insurmountable at room temperature, and the stereocentre sits still. Complete loss of rotation — not partial — says the intermediate is *achiral* (or rapidly equilibrating between enantiomeric forms): memory of configuration is destroyed at the moment of deprotonation, not at reprotonation.
:::
:::

::: exercise Decarboxylation's geometry {level=3}
3-Oxobutanoic acid decarboxylates at about $100\ \mathrm{^\circ C}$; butanoic acid needs soda-lime at red heat. Draw (in words) the transition state that makes the difference, and predict whether the $\mathrm{CO_2}$ loss is faster in hexane or in water.
::: solution
The $\beta$-keto acid holds its $\mathrm{CO_2H}$ over the ketone oxygen: a six-membered cyclic transition state in which the acid proton transfers to the ketone oxygen as the $\mathrm{C{-}C}$ bond breaks and the enol forms ($\mathrm{C{=}C{-}OH}$ plus $\mathrm{CO_2}$, then keto–enol tautomerism gives the ketone). Every bond made and broken is intramolecular and geometrically pre-arranged — a low-entropy, low-enthalpy pathway butanoic acid lacks (its anion, formed first at red heat, has nowhere to put the proton). Solvent: the transition state is nearly non-polar (neutral acid, neutral products, proton in flight), so the reaction is *faster in hexane* than in water — water stabilises the polar ground state (the hydrogen-bonded acid) more than the cyclic transition state. A classic, counterintuitive prediction from transition-state polarity.
:::
:::

::: exercise O or C {level=3 check="3" hint="Count the iodine molecules consumed per methyl ketone before the acyl substitution step"}
How many equivalents of $\mathrm{I_2}$ are consumed per equivalent of acetophenone in the iodoform reaction, before the final acyl-substitution step? Give the reasoning from the mechanism.
::: solution
**3.** Each round of base-promoted halogenation installs one iodine and regenerates an (even more acidic) $\alpha$-proton situation: $\mathrm{COCH_3 \rightarrow COCH_2I \rightarrow COCHI_2 \rightarrow COCI_3}$ — three iodinations, three $\mathrm{I_2}$. The fourth "step" is not an iodination but the hydroxide addition/$\mathrm{CI_3^-}$ ejection, which consumes no iodine (the fourth base equivalent goes to the carboxylic acid). The balanced equation's $3\,\mathrm{I_2}$ per acetophenone is the check: three for the halogenations, none for the substitution.
:::
:::
