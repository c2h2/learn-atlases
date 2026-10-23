Two lessons ago the benzene ring refused addition because the price was aromaticity; the carbonyl group accepts addition because the price is merely a $\pi$ bond, and the purchase is worth it. The $\mathrm{C{=}O}$ double bond is the reverse of the $\mathrm{C{=}C}$ double bond in every way that matters: oxygen's electronegativity pulls the $\pi$ electrons off the carbon, so the carbon carries a partial positive charge and the oxygen a partial negative one. Alkenes chase electrophiles; carbonyls chase nucleophiles. Almost everything in the second half of this course — hydride reductions, organometallic carbon–carbon bond formation, the chemistry of carboxylic derivatives, the enolate chemistry of the next two chapters — is one reaction wearing different reagents: nucleophilic addition to the carbonyl carbon, with the oxygen as the electron sink that makes it possible. This chapter builds the general case: who attacks, how they attack, what the acid–base conditions must be, and where the equilibrium lies.

## Structure: an electrophile with a built-in handle

::: definition The polarised carbonyl {#def-carbonyl-pol}
In a carbonyl group the carbon is $sp^2$ (trigonal planar, angles near $120\ \mathrm{^\circ}$) and the $\pi$ bond is strongly polarised: the bonding $\pi$ orbital sits mostly on oxygen, the antibonding $\pi^*$ orbital — the LUMO, the orbital that accepts electrons — mostly on carbon, with its larger lobe on the carbon face. Consequences: the carbon is the electrophilic site (attacks by nucleophiles happen *at carbon*), the oxygen is the basic and nucleophilic site (protonation and silylation happen *at oxygen*), and the $\mathrm{C{=}O}$ bond is short ($121\ \mathrm{pm}$ in formaldehyde) and strongly dipolar ($2.3\ \mathrm{D}$ for formaldehyde, versus essentially zero for $\mathrm{C{=}C}$).
:::

::: proposition Addition is a geometry change, not just a bond change {#prop-sp2-sp3}
Nucleophilic addition converts the carbonyl carbon from $sp^2$ to $sp^3$: the nucleophile does not attack straight down the $\mathrm{C{=}O}$ axis (that path runs into the oxygen's electron cloud and cannot reach the $\pi^*$ lobe) but at the **Bürgi–Dunitz angle** of roughly $107\ \mathrm{^\circ}$ to the $\mathrm{C{=}O}$ bond, arriving at the carbon's face. The tetrahedral product puts four groups where three used to be, so the equilibrium constant of addition is a tug-of-war between the strong $\sigma$ bond made ($\mathrm{C{-}Nu}$, $\mathrm{O{-}H}$) and the crowded $\pi$ bond broken, modulated by electronics: electron-withdrawing groups on carbon make the carbon hungrier and the alkoxide product calmer, and both effects push the equilibrium toward addition. Planar $sp^2$ also means the two faces of the carbonyl are attackable, which is how aldehyde/ketone additions create new stereocentres — the subject of [[organic-1/stereochemistry]] turned synthetic.
:::

::: example Where the equilibrium actually sits {#ex-hydrates}
Hydration of carbonyls, $\mathrm{R_2C{=}O + H_2O \rightleftharpoons R_2C(OH)_2}$, spans ten million-fold across simple compounds: formaldehyde $K_\mathrm{hyd} \approx 2\times10^3$ (over $99.9\ \%$ hydrated in water), acetaldehyde $K_\mathrm{hyd} \approx 1$, propanone $K_\mathrm{hyd} \approx 1.4\times10^{-3}$, 2,2,2-trichloroethanal (chloral) $K_\mathrm{hyd} \approx 10^4$ (isolable as chloral hydrate), hexafluoropropanone $K_\mathrm{hyd} \approx 10^6$. Account for the order.
::: solution
Two levers, both read on the same diagram. **Sterics:** two groups become four at carbon, so replacing $\mathrm{H}$ by $\mathrm{CH_3}$ (acetaldehyde → propanone) costs crowding and drops $K$ by a thousand-fold. **Electronics:** three chlorines, or six fluorines, pull electron density inductively — they make the carbonyl carbon more positive (better electrophile) and stabilise the product gem-diol's oxyanion character in the transition state; the fluorines win the electronic argument outright, giving $K \approx 10^6$. Formaldehyde wins on sterics alone (two hydrogens, no alkyl donation); propanone loses on both counts. The general rule of this chapter in one line: *electron-poor, unhindered carbonyls add everything; electron-rich, hindered ketones add only the strongest nucleophiles.*
:::
:::

::: widget plot
f: a*exp(-((x-1.5)/0.4)^2) + b*exp(-((x-3.1)/0.4)^2); a*exp(-((x-1.5)/0.4)^2) + (b+22)*exp(-((x-3.1)/0.4)^2)
x: 0, 4.6
y: -10, 80
sliders: a=40:20:60:1; b=10:0:25:1
labels: \text{aldehyde}; \text{ketone}
caption: Schematic coordinate for nucleophilic addition to a carbonyl (arbitrary units): the first hump (slider $a$) is the nucleophile's arrival at the Bürgi–Dunitz angle, making the tetrahedral alkoxide; the second hump (slider $b$) is protonation of the alkoxide, usually trivially fast. The upper curve is a ketone: the same first hump, but the product well is shallower because the extra methyl group crowds the tetrahedral carbon and donates electron density to a carbon that was already electron-poor. Aldehyde versus ketone is mostly a product-depth story, which is why aldehydes are more reactive towards addition *and* more easily oxidised: both are consequences of the same shallow well.
:::

## The toolkit: five families of nucleophile

**Hydride.** $\mathrm{NaBH_4}$ delivers $\mathrm{H^-}$ to aldehydes and ketones in water or alcohol at room temperature and stops there; $\mathrm{LiAlH_4}$ is fiercer and also opens esters, acids and amides (their chemistry is [[organic-2/carboxylic-derivatives]]). Reduction is addition of $\mathrm{H^-}$ then protonation of the alkoxide: aldehyde → $1^\circ$ alcohol, ketone → $2^\circ$ alcohol.

**Organometallics.** Grignard reagents $\mathrm{RMgX}$ and organolithiums $\mathrm{RLi}$ are carbanion equivalents — the workhorses of carbon–carbon bond formation. They add to aldehydes and ketones irreversibly, and the product alkoxide, protonated on workup, is an alcohol: formaldehyde → $1^\circ$, any other aldehyde → $2^\circ$, ketone → $3^\circ$. They are destroyed by any proton source ($\mathrm{RMgX + H_2O \rightarrow RH + MgXOH}$), so the reaction runs in dry ether and the water comes last.

**Cyanide.** $\mathrm{HCN}$ (generated from $\mathrm{NaCN/KCN}$ plus acid, so that some free $\mathrm{CN^-}$ exists) adds reversibly to give **cyanohydrins**, $\mathrm{R_2C(OH)CN}$ — a hydroxyl and a nitrile on the same carbon, a hidden $\beta$-amino acid or $\alpha$-hydroxy acid after hydrolysis, and a one-carbon homologation.

**Water and alcohols.** Weak nucleophiles, but with acid catalysis they give gem-diols and, with alcohols, acetals — the subject of the next section and the course's first protecting group.

**Nitrogen nucleophiles.** Ammonia and its derivatives add, then eliminate water, to give $\mathrm{C{=}N}$ compounds: imines, oximes, hydrazones, semicarbazones. Addition–elimination at carbon, not simple addition, but the first step is the same.

::: example The Grignard map {#ex-grignard-map}
Give the carbonyl compound and the organometallic reagent for each target: (a) pentan-3-ol; (b) 2-phenylpropan-2-ol; (c) cyclohexylmethanol.
::: solution
Disconnect the $\mathrm{C{-}C}$ bond next to the carbinol carbon and read backwards: alcohol ← alkoxide ← addition. (a) $\mathrm{CH_3CH_2CH(OH)CH_2CH_3}$ is a $2^\circ$ alcohol with two different ethyl-bearing halves: propanal + $\mathrm{CH_3CH_2MgBr}$ (or, symmetrically, ethanal + $\mathrm{CH_3CH_2CH_2MgBr}$ — two answers, pick the cheaper pair). (b) $\mathrm{PhC(OH)(CH_3)_2}$ is $3^\circ$: propanone + $\mathrm{PhMgBr}$, then aqueous workup (a $3^\circ$ alcohol with two identical methyls must come from a ketone plus the third group as Grignard). (c) A $1^\circ$ alcohol with one more carbon than its ring: formaldehyde + cyclohexylmagnesium bromide — the formaldehyde trick is the only way Grignard chemistry reaches $1^\circ$ alcohols.
:::
:::

::: history
That nucleophiles arrive at an angle rather than head-on was established in 1970–73 by Hans-Hugo **Bürgi** and Jack **Dunitz**, who crystallised a charge-transfer complex of benzylideneaniline with tetracyanoethylene and let X-ray diffraction measure what a reaction looks like halfway to happening: the distance and angle at which the electron-poor alkene presses against the imine nitrogen were those of a nucleophile attacking $\mathrm{C{=}N}$ at about $107\ \mathrm{^\circ}$, not $180\ \mathrm{^\circ}$. The "Bürgi–Dunitz trajectory" became the textbook geometry of carbonyl attack, one of the rare cases where a crystal structure directly photographed a mechanism, and the foundation of a generation of stereochemical models for facial selectivity.
:::

## The acid–base switch: two mechanisms, one intermediate

::: proposition Strong nucleophiles come in base, weak ones in acid {#prop-acid-base-switch}
Addition has two limiting mechanisms. **Basic conditions:** the nucleophile attacks the neutral carbonyl, and the resulting alkoxide is protonated afterwards — the only option when the nucleophile is a strong base ($\mathrm{RMgX}$, $\mathrm{LiAlH_4}$, $\mathrm{HO^-}$), because acid would destroy it. **Acidic conditions:** the carbonyl oxygen is protonated first (protonation at oxygen, the basic site, not at carbon), and the resulting oxocarbenium ion — far more electrophilic than the neutral carbonyl — is trapped by a *weak* nucleophile ($\mathrm{H_2O}$, $\mathrm{ROH}$, amines), which is deprotonated to finish. Acid catalysis thus pairs a weak nucleophile with a supercharged electrophile; it fails exactly when the nucleophile is strong enough to need no help, and it is the reason acetals form in dry acid and hydrolyse in aqueous acid but ignore base entirely.
:::

::: example Acetal formation and its purpose {#ex-acetal}
Benzaldehyde dissolved in excess methanol with a trace of $\mathrm{H_2SO_4}$ gives the dimethyl acetal in high yield; the same solution made basic does nothing; the acetal returned to aqueous acid gives benzaldehyde back. Give the mechanism and the synthetic use.
::: solution
Acid puts a proton on the carbonyl oxygen; methanol attacks the activated carbon to give a protonated **hemiacetal**, loss of whose proton gives the neutral hemiacetal (this step is reversible and roughly thermoneutral — hemiacetals of simple aldehydes are usually too unstable to isolate). Then the real work: protonate the hemiacetal $\mathrm{OH}$, lose water to give a resonance-stabilised oxocarbenium ion ($\mathrm{PhCH^+ \leftrightarrow PhCH{=}O^+Me}$), and the second methanol traps it; deprotonation gives the acetal. Every step is reversible, so excess methanol (or removal of water) drives acetal formation, and flood of water drives hydrolysis — Le Chatelier, not new chemistry. Synthetic use: the acetal is an ether-like carbon with no electrophile and no $\mathrm{O{-}H}$, stable to base, hydride, and organometallics — so it *protects* the carbonyl while other parts of the molecule are attacked, and aqueous acid removes it afterwards. Aldehyde versus ketone again: ketone acetals form sluggishly (sterics) and are made with diols (cyclic acetals, entropy-assisted).
:::
:::

::: definition Imines and the pH optimum {#def-imines}
Nitrogen nucleophiles $\mathrm{RNH_2}$, $\mathrm{ROH_2N}$ (hydroxylamine), $\mathrm{R_2NNH_2}$ (hydrazines) add to carbonyls and then eliminate water: the product is a $\mathrm{C{=}N}$ compound — an **imine** ($\mathrm{R_2C{=}NR'}$), **oxime**, or **hydrazone** — via a carbinolamine intermediate. The rate is bell-shaped in pH: too acidic and the amine is protonated (no lone pair, no nucleophile); too basic and the carbinolamine's $\mathrm{OH}$ cannot leave as $\mathrm{OH^-}$ (elimination needs the $\mathrm{OH}$ protonated). The optimum sits near $\mathrm{pH} \approx 4\text{–}5$, where just enough free amine and just enough protonated $\mathrm{OH}$ coexist. Hydrazones and semicarbazones are crystalline, sharp-melting derivatives — the classical identification of unknown aldehydes and ketones — and imine formation is the first act of almost all biological carbonyl chemistry, from transamination to glycolysis.
:::

::: warning Three ways to pick the wrong conditions {#warn-conditions}
**(1)** Never run a Grignard or $\mathrm{LiAlH_4}$ reaction in a protic solvent: one equivalent of $\mathrm{O{-}H}$ per molecule kills the reagent instantly ($\mathrm{p}K_\mathrm{a}$ of the alkane conjugate acid $\approx 50$ — the acid–base reaction outruns any addition). **(2)** Protonation happens at oxygen, not carbon: students who draw $\mathrm{C}$-protonated carbonyls under acid catalysis have drawn a carbocation when the oxocarbenium was free. **(3)** Weak nucleophiles need acid, but *too much* acid protonates the nucleophile to death (amines) or the wrong atom; the bell-shaped pH profile of imine formation is the general lesson — catalysis is a trade, and every trade has an optimum.
:::

::: quiz
A ketone is to be converted to its dimethyl acetal. Which set of conditions works?
- [x] methanol with a catalytic amount of dry $\mathrm{HCl}$
- [ ] methanol with catalytic $\mathrm{NaOMe}$
- [ ] methanol with catalytic $\mathrm{NaH}$
- [ ] aqueous acid, then dry-out
::: solution
Dry acid: protonation of oxygen activates the carbonyl towards weak methanol, and anhydrous conditions push the reversible equilibrium to the acetal. Base cannot activate the carbonyl (methoxide is a fine nucleophile but the hemiacetal's $\mathrm{OH}$ cannot leave as $\mathrm{OH^-}$ — no leaving group, no acetal). Aqueous acid is the hydrolysis direction: water is the solvent and wins.
:::
:::

::: example How far does cyanohydrin formation go? {#ex-cyanohydrin}
Ethanal at $0.10\ \mathrm{mol\,L^{-1}}$ is treated with HCN so that cyanide addition reaches an equilibrium constant $K = 100$ for $\mathrm{CH_3CHO + HCN \rightleftharpoons CH_3CH(OH)CN}$ (concentrations in $\mathrm{mol\,L^{-1}}$, both reagents starting at $0.10\ \mathrm{mol\,L^{-1}}$). Find the equilibrium concentration of cyanohydrin.
::: solution
With $x$ the product concentration, $K = [\mathrm{product}]/([\mathrm{aldehyde}][\mathrm{HCN}]) = x/((0.10-x)(0.10-x))$. So $x = 100(0.10-x)^2$; writing $u = 0.10 - x$ for the unreacted concentration of each reagent gives $100u^2 + u - 0.10 = 0$, hence $u = (-1 + \sqrt{41})/200 = 0.0270$ and $x = 0.073\ \mathrm{mol\,L^{-1}}$ — $73\ \%$ conversion. The same equation solved as a root-finding problem is the widget below. Note the mechanism's fingerprint: cyanohydrin formation is reversible (depolymerising acetone cyanohydrin is a laboratory HCN source), and it is base-catalysed in the sensible direction — $\mathrm{CN^-}$ attacks, the alkoxide grabs a proton from HCN, chain-propagating — which is why the reaction needs a touch of base and stalls in strong acid (no free $\mathrm{CN^-}$).
:::
:::

::: widget newton
f: x/((0.10-x)*(0.10-x)) - 100
x0: 0.05
x: 0, 0.10
caption: Newton iteration for the cyanohydrin equilibrium $x/(0.10-x)^2 = 100$ from the example above: the function is $K(x) - 100$, and the root near $x = 0.073\ \mathrm{mol\,L^{-1}}$ is the equilibrium concentration of cyanohydrin. The other mathematical root ($x > 0.10$) is unphysical — concentrations cannot go negative — a reminder that equilibrium algebra has roots the chemistry refuses. Start from $x_0 = 0.05$ and watch the iteration lock on.
:::

## Faces: which side of the plane gets attacked

The carbonyl carbon is planar, so every addition that creates a stereocentre can in principle go two ways. With an achiral aldehyde or ketone and an achiral reagent the two faces are enantiotopic and the product is racemic — the reaction has no way to prefer one, and no experiment on the reaction alone will ever break the tie. The interesting case is a *chiral* carbonyl compound, where the two faces are diastereotopic and the reagent can read the difference. The model is the same geometry as everywhere else in this chapter: the nucleophile arrives along the Bürgi–Dunitz trajectory, roughly perpendicular to the $\mathrm{C{=}O}$ bond, and it chooses the approach that keeps it furthest from the largest substituent on the adjacent stereocentre. In the **Felkin–Anh** picture the neighbouring group is oriented with its largest substituent perpendicular to the carbonyl (out of the way of the incoming nucleophile), and attack falls beside the *smallest* — a hydrogen if one is available. The selectivities are modest (often $2\text{–}10 : 1$) but systematic, and they are the reason asymmetric induction, enzyme catalysis, and the whole of [[organic-2/condensations]]' stereochemical chapters have a geometric rather than mystical explanation. Enzymes solve the problem absolutely: a chiral binding pocket presents only one face, which is why biology gets away with one enantiomer of every sugar and amino acid.

## Where this leads

Addition to aldehydes and ketones is the prologue; the drama of the next chapter is that carboxylic derivatives *also* add, but their tetrahedral intermediate has a leaving group, so addition collapses back or forward into **substitution** — [[organic-2/carboxylic-derivatives]] is the whole story of that difference. The same tetrahedral intermediate, deprotonated at carbon instead of protonated at oxygen, becomes enolate chemistry: [[organic-2/enols-enolates]] and then [[organic-2/condensations]]. Imines return as the electrophile of reductive amination and enzyme catalysis in [[organic-2/amines]]. The orbital picture used here — LUMO coefficients, trajectory arguments — is developed in [[bonding-structure/molecular-orbitals]] and pays off in facial-selectivity models throughout [[organic-1/stereochemistry]].

::: summary
- The carbonyl is a polarised $\pi$ bond: carbon is electrophilic (attack at carbon, at the Bürgi–Dunitz angle of $\sim 107\ \mathrm{^\circ}$), oxygen is the basic site (protonation at oxygen).
- Addition converts $sp^2$ to $sp^3$; the equilibrium favours addition when the carbon is electron-poor and unhindered — from hexafluoropropanone ($K_\mathrm{hyd} \approx 10^6$) down to simple ketones ($K_\mathrm{hyd} \sim 10^{-3}$).
- The reagent families: hydride ($\mathrm{NaBH_4}$ mild, $\mathrm{LiAlH_4}$ fierce), organometallics (irreversible C–C formation, anhydrous, alcohol after workup: $\mathrm{HCHO} \to 1^\circ$, $\mathrm{RCHO} \to 2^\circ$, $\mathrm{R_2CO} \to 3^\circ$), cyanide (reversible, cyanohydrins), water/alcohol (acid-catalysed), amines (addition–elimination to $\mathrm{C{=}N}$).
- Two mechanisms: strong nucleophiles attack the neutral carbonyl in base and protonate afterwards; weak nucleophiles need the oxygen protonated first, and acid catalysis fails when the nucleophile is too strong to survive it.
- Acetals form reversibly in dry acid, ignore base, and hydrolyse in aqueous acid — the definition of a protecting group for carbonyls.
- Imine/oxime/hydrazone formation is fastest near $\mathrm{pH} \approx 4\text{–}5$: the bell-shaped profile is the general signature of acid–base cooperation, and its two failure modes are the two halves of the warning above.
:::

## Exercises

::: exercise Reagent to product {level=1}
Give the product of propanone with: (a) $\mathrm{NaBH_4}$, then water; (b) $\mathrm{CH_3MgBr}$, then aqueous acid; (c) $\mathrm{HCN}$, catalytic $\mathrm{KCN}$.
::: solution
(a) Propan-2-ol (hydride addition, alkoxide protonation). (b) 2-methylpropan-2-ol — a $3^\circ$ alcohol from ketone + Grignard, new $\mathrm{C{-}C}$ bond to the methyl. (c) 2-hydroxy-2-methylpropanenitrile, the cyanohydrin (reversible; the product is the acetone cyanohydrin used as an HCN carrier).
:::
:::

::: exercise Which site is which {level=1}
For each, say whether reaction occurs at carbon or oxygen of the carbonyl: (a) $\mathrm{CH_3MgBr}$; (b) $\mathrm{H_2SO_4}$ (catalytic protonation); (c) $\mathrm{NaBH_4}$; (d) $\mathrm{Me_3SiCl}$ with base.
::: solution
(a) Carbon (nucleophile attacks the electrophilic carbon). (b) Oxygen (protonation at the basic site). (c) Carbon (hydride adds to carbon; the alkoxide oxygen is protonated afterwards by the solvent). (d) Oxygen (silylation of the oxygen lone pair — the same site preference as protonation, silicon being the electrophilic partner).
:::
:::

::: exercise True or false, with reasons {level=1}
(a) Aldehydes are more reactive than ketones towards nucleophilic addition. (b) Acid catalysis speeds the addition of $\mathrm{CH_3Li}$ to ketones. (c) Acetals are stable to aqueous $\mathrm{NaOH}$.
::: solution
(a) True — less steric crowding at carbon and less electron donation into an already-positive carbon; both make the aldehyde's addition well deeper. (b) False — $\mathrm{CH_3Li}$ is far too strong a base; acid would protonate and destroy it (methane) faster than any addition; it adds to the *neutral* carbonyl under aprotic, anhydrous conditions. (c) True — acetals need acid to open (no leaving group can depart as $\mathrm{OH^-}$ or $\mathrm{RO^-}$ from an ether-like carbon under basic conditions); base is the solvent in which acetals protect.
:::
:::

::: exercise Design the Grignard {level=2}
Give two carbonyl/reagent disconnections for 1-phenylpropan-1-ol and choose between them on practical grounds.
::: solution
The carbinol carbon bears $\mathrm{Ph}$, $\mathrm{H}$, $\mathrm{CH_2CH_3}$: it is $2^\circ$, so either half could be the Grignard. Route 1: benzaldehyde + $\mathrm{CH_3CH_2MgBr}$. Route 2: propanal + $\mathrm{PhMgBr}$. Both are chemically sound; practical grounds favour route 1 slightly (propanal is volatile, b.p. $49\ \mathrm{^\circ C}$, and enolises more readily; benzaldehyde is a stable liquid and cannot enolise — no $\alpha$-hydrogens, so no competing deprotonation of the electrophile by the basic Grignard). The check for competence: does either partner have $\alpha$-hydrogens that the other's basicity would attack? Here route 2's propanal does — a real, if modest, side reaction.
:::
:::

::: exercise Protect, attack, unmask {level=2}
4-Oxopentanal bears both an aldehyde and a ketone. Give a sequence that reacts a Grignard reagent with the ketone *only*, leaving the aldehyde as the aldehyde at the end.
::: solution
Protect the aldehyde selectively as its cyclic acetal: ethane-1,2-diol, trace acid — five-membered cyclic acetals of *aldehydes* form preferentially, and the ketone is both slower and sterically disfavoured. Then add the Grignard to the free ketone (anhydrous ether; the acetal carbon is ether-like, inert), work up aqueously. Finally hydrolyse the acetal with aqueous acid: the diol leaves via the oxocarbenium, water traps it, and the aldehyde returns. Order is the whole answer: unprotected, the Grignard would attack the aldehyde preferentially (aldehydes are the better electrophile), so the "unreactive" group must be disguised before the "reactive" one is attacked.
:::
:::

::: exercise The pH optimum, quantified {level=2}
Imine formation from aniline ($\mathrm{p}K_\mathrm{a}$ of $\mathrm{PhNH_3^+} = 4.6$) is run at $\mathrm{pH}\ 2$, $4.5$, and $9$. Rank the rates and explain, given that the free amine is the nucleophile and that the elimination step needs acid.
::: solution
$\mathrm{pH}\ 4.5 > \mathrm{pH}\ 2 \approx \mathrm{pH}\ 9$ (both extremes slow, for opposite reasons). At $\mathrm{pH}\ 2$, $\mathrm{pH} = \mathrm{p}K_\mathrm{a} - 2.6$ means roughly $99.7\ \%$ of the aniline is $\mathrm{PhNH_3^+}$ — no lone pair, no nucleophile: addition stalls. At $\mathrm{pH}\ 9$ the amine is fully free, but the carbinolamine's $\mathrm{OH}$ cannot leave as $\mathrm{OH^-}$ and there is too little acid to protonate it: elimination stalls. Near $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$, free amine and available protons coexist — the bell curve's maximum sits near the amine's $\mathrm{p}K_\mathrm{a}$, which is why "buffer around $\mathrm{pH}\ 4\text{–}5$" is the recipe.
:::
:::

::: exercise Cyanohydrin bookkeeping {level=3 check="0.073" hint="Set up K = x/(0.10-x)^2, substitute u = 0.10-x, and solve the quadratic; the unit is mol L^-1"}
Propanone cyanohydrin formation is run from $0.10\ \mathrm{mol\,L^{-1}}$ propanone and $0.10\ \mathrm{mol\,L^{-1}}$ HCN with $K = 100$ (same stoichiometry and units as the example). Give the equilibrium concentration of cyanohydrin in $\mathrm{mol\,L^{-1}}$.
::: solution
$K = x/(0.10-x)^2 = 100$. With $u = 0.10 - x$ (the unreacted concentration of each reagent): $0.10 - u = 100u^2$, i.e. $100u^2 + u - 0.10 = 0$, so $u = (-1 + \sqrt{1 + 40})/200 = 0.0270$ and $x = 0.073\ \mathrm{mol\,L^{-1}}$. Check: $0.073/(0.027)^2 = 100.1$. The other quadratic root gives $u < 0$, i.e. more than complete conversion — the chemistry refuses it.
:::
:::

::: exercise Mechanistic forensics {level=3}
Acetal hydrolysis in $\mathrm{H_2^{18}O}$ returns carbonyl oxygen containing $^{18}\mathrm{O}$, and the reaction is first order in acetal and first order in $\mathrm{H^+}$. What do these two facts say about the mechanism, and which step is rate-determining?
::: solution
The label says where the bonds broke and reformed: in the product carbonyl, the oxygen is water's, not the acetal's — both acetal oxygens leave as methanol, and the incoming water (bearing $^{18}\mathrm{O}$) becomes the carbonyl oxygen via the oxocarbenium ion. That is only possible if a $\mathrm{C{-}OMe}$ bond breaks *before* the new $\mathrm{C{-}O}$ bond to water forms: an oxocarbenium intermediate must exist between the two events. The rate law $k[\mathrm{acetal}][\mathrm{H^+}]$ then fixes the sequence: fast pre-equilibrium protonation of one acetal oxygen, then rate-determining unimolecular loss of methanol from the conjugate acid to give the oxocarbenium — the same A-1 logic as $\mathrm{S_N1}$, with the oxocarbenium as the cation. Water capture and proton transfers afterwards are fast and invisible to the kinetics.
:::
:::
