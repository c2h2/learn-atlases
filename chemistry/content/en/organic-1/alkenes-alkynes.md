Every double bond you built in [[organic-1/elimination]] is a store of reactive electron density, and this chapter is about spending the store. The two bonds of a $\mathrm{C{=}C}$ are unequal: the $\sigma$ framework holds the molecule together, while the $\pi$ bond — a diffuse cloud above and below the internuclear axis — is exposed, polarisable and weak, about $266\ \mathrm{kJ\,mol^{-1}}$ against the $\sigma$ bond's $348$ ([[organic-1/organic-structures]]). Chemistry follows from the inequality. Where an alkane offers only tight $\mathrm{C{-}H}$ and $\mathrm{C{-}C}$ $\sigma$ bonds and does nothing in the dark at room temperature, an alkene offers its loosely held pair to anything electron-poor, and the reaction that follows — **electrophilic addition** — is the defining reaction of the functional group. The plan is to learn one mechanism deeply (protonation to a carbocation, capture by an anion) and then watch it branch: Markovnikov's rule and its physical basis in cation stability; the rearrangements that betray the cation's reality; hydration by three routes with three different answers; the bromonium ion that forces *anti* addition; hydrogenation and the heat-of-hydrogenation ladder that measures alkene stability in $\mathrm{kJ\,mol^{-1}}$; oxidation that dihydroxylates, cleaves and epoxidises; and the alkynes, where the same chemistry happens twice and a terminal $\mathrm{C{-}H}$ adds an acidity twist ([[organic-1/acidity-mechanism]]). One mechanism, many consequences — that is the shape of this chapter.

## The double bond as a nucleophile

::: definition Electrophilic addition {#def-electrophilic-addition}
**Electrophilic addition** is the reaction in which a $\pi$ bond donates its electron pair to an **electrophile** and the two former double-bond carbons each end up bonded to a new substituent:
$$
\mathrm{C{=}C + E{-}Nu \rightarrow E{-}C{-}C{-}Nu}
$$
The $\pi$ bond is the **nucleophile** (the Lewis base, the electron pair on offer); $\mathrm{E{-}Nu}$ is the electrophile, whose bond breaks as the two new $\sigma$ bonds form. The prototype has $\mathrm{E = H}$ and $\mathrm{Nu}$ a halide, but the same pattern covers hydration, halogenation, hydrogenation and oxidation.
:::

The arithmetic of why addition happens at all is the arithmetic of [[organic-1/organic-structures]]: adding $\mathrm{HBr}$ across a $\mathrm{C{=}C}$ breaks one $\pi$ bond ($266\ \mathrm{kJ\,mol^{-1}}$) and one $\mathrm{H{-}Br}$ bond ($366$) and forms one $\mathrm{C{-}H}$ ($413$) and one $\mathrm{C{-}Br}$ ($285$), so $\Delta H \approx (266 + 366) - (413 + 285) = -66\ \mathrm{kJ\,mol^{-1}}$. A weak $\pi$ bond plus a reagent $\sigma$ bond is traded for two stronger $\sigma$ bonds, and almost every addition in this chapter is exothermic for exactly that reason. Substitution has no comparable entry: a bare alkene carries no leaving group, and a vinylic $\mathrm{C{-}H}$ is far too strong ($\approx 460\ \mathrm{kJ\,mol^{-1}}$) to break on its own. Addition is what double bonds do.

In the curly-arrow grammar of [[organic-1/acidity-mechanism]] the prototype runs in two steps. **Step 1:** the $\pi$ electrons attack the proton of $\mathrm{HBr}$; the $\mathrm{H{-}Br}$ bond breaks and bromide leaves. One carbon gains the hydrogen, the other is left electron-poor — a **carbocation**. **Step 2:** a lone pair on bromide drops into the empty $p$ orbital of the cation, and the alkyl bromide is born. Step 1 is the **rate-determining step**: it destroys a stabilised $\pi$ bond and manufactures a high-energy cation, so it is endergonic and slow, while step 2 is a fast cation–anion combination. You have seen this shape before — step 1 is the ionisation of [[organic-1/nucleophilic-substitution]], and everything true of carbocations there is true here.

::: example HBr plus propene: mechanism and thermochemistry {#ex-hbr-propene}
Write the mechanism for $\mathrm{HBr + CH_3CH{=}CH_2}$ and estimate $\Delta H$ from mean bond enthalpies ($\pi$: $266$; $\mathrm{H{-}Br}$: $366$; $\mathrm{C{-}H}$: $413$; $\mathrm{C{-}Br}$: $285\ \mathrm{kJ\,mol^{-1}}$). Which constitutional isomer dominates?
::: solution
Step 1: *the $\pi$ bond attacks the proton of $\mathrm{HBr}$; the $\mathrm{H{-}Br}$ bond breaks to bromide.* Protonation can go two ways: hydrogen on the middle carbon gives the primary cation $\mathrm{CH_3CH_2CH_2^{+}}$; hydrogen on a terminal carbon gives the secondary cation $\mathrm{CH_3CH^{+}CH_3}$. Step 2: *bromide attacks the cationic carbon.* The secondary-cation path wins overwhelmingly (why, in a moment), so the product is 2-bromopropane, $\mathrm{CH_3CHBrCH_3}$, with only a trace of 1-bromopropane. Thermochemistry: bonds broken $266 + 366 = 632$; bonds formed $413 + 285 = 698$; $\Delta H \approx 632 - 698 = -66\ \mathrm{kJ\,mol^{-1}}$ — exothermic, exactly as the $\pi$-for-$\sigma$ trade promises.
:::
:::

::: proposition Markovnikov's rule {#prop-markovnikov}
**Markovnikov's rule** (empirical, 1869): when a reagent $\mathrm{H{-}X}$ adds to an unsymmetrical alkene, the hydrogen attaches to the double-bond carbon that already carries **more hydrogens** — the less substituted one — and $\mathrm{X}$ goes to the more substituted carbon. The physical basis is not a law about hydrogen at all but a fact about **carbocation stability**: protonation proceeds through the more stable carbocation, and the more stable cation forms faster. Cation stability runs $\mathrm{R_3C^{+}} > \mathrm{R_2CH^{+}} > \mathrm{RCH_2^{+}} \gg \mathrm{CH_3^{+}}$, because alkyl groups stabilise an electron-poor carbon inductively and by hyperconjugation — donation of adjacent $\mathrm{C{-}H}$ $\sigma$ electrons into the empty $p$ orbital. The rule is an empirical generalisation about one mechanism: it fails when the mechanism changes (radical additions, [[organic-1/radical-reactions]]) or when the intermediate rearranges ([[#def-rearrangement]]).
:::

Why does the more stable cation form faster? Hammond's postulate ([[organic-1/acidity-mechanism]]) answers. Step 1 is strongly endergonic, so its transition state is **late** — close in energy, and therefore in structure, to the carbocation it produces. Anything that stabilises the cation stabilises the transition state leading to it by nearly as much, so the path through the secondary cation has the lower barrier and dominates. Regiochemistry here is a matter of **kinetic control**: the product ratio is set by a difference of transition-state energies $\Delta\Delta G^{\ddagger}$, not by product stabilities. The Boltzmann factor converts one into the other — at $\mathrm{298\ K}$,
$$
\frac{[\text{major}]}{[\text{minor}]} \;=\; e^{\,\Delta\Delta G^{\ddagger}/RT},
$$
so a barrier difference of only $7.3\ \mathrm{kJ\,mol^{-1}}$ — under one $\mathrm{p}K_\mathrm{a}$ unit's worth of free energy — already gives a $19:1$ mixture, $95\,\%$ of one isomer. Regioselectivity is cheap in energy.

::: widget newton
f: exp(-x/2.4788) - 5/95
x0: 7
x: 0, 20
caption: Newton's method solving $e^{-x/RT} = 5/95$ for the transition-state energy gap $x$ (in $\mathrm{kJ\,mol^{-1}}$, with $RT = 2.4788\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{298\ K}$) that makes an addition $95\,\%$ regioselective: the root is $x = 7.30\ \mathrm{kJ\,mol^{-1}}$. A nudge of $7\ \mathrm{kJ\,mol^{-1}}$ at the transition state buys twenty-to-one at the product stage, which is why small carbocation-stability differences produce large product ratios — and why a $2\ \mathrm{kJ\,mol^{-1}}$ difference, well within the scatter of mean bond enthalpies, already means $97:3$ against.
:::

::: warning What Markovnikov's rule really says {#warn-markovnikov}
Three misconceptions, each expensive. **(1)** *"The rule is about where H goes."* The rule is a mnemonic; the mechanism is "protonate so as to make the more stable carbocation." State the mechanism and the rule follows — and so do its exceptions. **(2)** *"Carbocations sit still."* They do not: a cation will pull a hydride or an alkyl group off the neighbouring carbon — a **1,2-shift** — if doing so upgrades it, so the product predicted by naive application of the rule can be the wrong product; see [[#def-rearrangement]] and the examples that follow. If your mechanism draws a secondary cation next to a tertiary or quaternary carbon, expect rearrangement. **(3)** *"Anti-Markovnikov addition is Markovnikov's rule run backwards."* You cannot reverse the regiochemistry by reversing the arrows: the same ionic mechanism always funnels through the more stable cation. Anti-Markovnikov products require a *different mechanism* — a radical chain (HBr with peroxides, [[organic-1/radical-reactions]]) or a boron-mediated pathway with no cation anywhere — in which something other than cation stability decides where the new bond forms.
:::

::: quiz
Which addition to an alkene proceeds with anti-Markovnikov regiochemistry?
- [ ] HBr added in the dark, ionic conditions.
- [x] Hydroboration–oxidation: $\mathrm{BH_3}$, then $\mathrm{H_2O_2,\ HO^-}$.
- [ ] Acid-catalysed hydration.
- [ ] Addition of $\mathrm{Br_2}$.
::: solution
Hydroboration is concerted — no carbocation is ever formed — and boron joins the less substituted, less hindered carbon, so the $\mathrm{OH}$ that replaces it ends up anti-Markovnikov. Options 1 and 3 run through carbocations and obey the rule. Option 4 adds $\mathrm{Br}$ and $\mathrm{Br}$: there is no hydrogen to place, so the question of Markovnikov does not arise — the two carbons are distinguished by stereochemistry, not regiochemistry.
:::
:::

## Carbocations rearrange

::: definition 1,2-Shifts and rearrangement {#def-rearrangement}
A **rearrangement** of a carbocation is the migration of a $\sigma$ bond, with its electron pair, from the neighbouring carbon into the empty $p$ orbital, so that the positive charge moves to the carbon that lost the bond. The migrating group — a hydrogen (**1,2-hydride shift**) or an alkyl group (**1,2-methyl shift**, and so on) — moves with its bonding pair, so charge is conserved and no atoms are lost. The driving force is the stability ladder $\mathrm{3^\circ > 2^\circ \gg 1^\circ}$: a shift that upgrades the cation is fast, one that would downgrade it does not happen. Only *adjacent* (1,2) shifts compete, because the migrating group must reach the empty orbital next door.
:::

Rearrangements are not an embarrassment to the cation mechanism — they are its best evidence. A species that will grab a hydrogen off its own neighbour to become more stable is a species that is really there, and product mixtures that no single application of Markovnikov's rule predicts are the fingerprint of intermediates with a life of their own. The two shifts to watch for are the same upgrade in two costumes: hydride moves when the neighbour has a hydrogen, alkyl moves when it does not.

::: example A hydride shift: 3-methylbut-1-ene plus HCl {#ex-rearrange-hydride}
$\mathrm{(CH_3)_2CHCH{=}CH_2 + HCl}$ gives mainly 2-chloro-2-methylbutane, not 2-chloro-3-methylbutane. Explain with a mechanism.
::: solution
Protonation at C1 (the less substituted carbon takes the hydrogen, Markovnikov) puts the charge at C2: the secondary cation $\mathrm{CH_3CH^{+}CH(CH_3)_2}$. That cation sits beside a tertiary carbon bearing a hydrogen, so a **1,2-hydride shift** follows at once: the hydrogen on C3 migrates with its bonding electrons to C2, and the charge moves to C3, now three-coordinate and tertiary, $\mathrm{CH_3CH_2C^{+}(CH_3)_2}$ — a $2^\circ \rightarrow 3^\circ$ upgrade. Chloride capture at C3 gives 2-chloro-2-methylbutane. The unrearranged Markovnikov chloride is the minor product: the rule was right about the protonation and silent about the second act.
:::
:::

::: example A methyl shift: 3,3-dimethylbut-1-ene plus HBr {#ex-rearrange-methyl}
$\mathrm{(CH_3)_3CCH{=}CH_2 + HBr}$ gives mainly 2-bromo-2,3-dimethylbutane. Where does the rearrangement come from?
::: solution
Markovnikov protonation puts $\mathrm{H}$ on C1 and the charge at C2 — a secondary cation sitting next to a **quaternary** carbon, the worst possible neighbour for an unrearranged cation, because the neighbour carries no hydrogen to shift. A **methyl** group migrates instead, with its bonding pair, from C3 to C2; the charge moves to C3, which becomes tertiary: $\mathrm{(CH_3)_2C^{+}CH(CH_3)_2}$, the 2,3-dimethylbutan-2-yl cation. Bromide capture gives 2-bromo-2,3-dimethylbutane. The naive rule predicted 2-bromo-3,3-dimethylbutane, which would require leaving a secondary cation next door to a quaternary carbon — a situation the molecule refuses to sit in.
:::
:::

::: algorithm Predicting electrophilic addition products {#alg-addition-products}
**(1)** Locate the $\pi$ bond and split the reagent into its electrophilic and nucleophilic ends ($\mathrm{H}$ then $\mathrm{X}$; $\mathrm{Br}$ then $\mathrm{Br}$; $\mathrm{B}$ then $\mathrm{OH}$). **(2)** Add the electrophile to the alkene carbon that leaves the **more stable carbocation** on the other carbon — this one instruction *is* Markovnikov's rule. For concerted additions (hydroboration, hydrogenation, halogenation through a halonium ion) skip to step 4 with the reaction's own rule. **(3)** Inspect the cation for **rearrangement**: if a 1,2-hydride or 1,2-alkyl shift upgrades it ($2^\circ \rightarrow 3^\circ$, or past a strained ring), take the rearranged cation. **(4)** Combine the nucleophile with the cationic carbon; a planar cation is attacked on either face. **(5)** Apply the reaction's **stereochemistry** — *syn*, *anti* or unrestricted (the table below collects them). **(6)** Check the bookkeeping: addition incorporates the whole reagent, so the product formula is alkene plus reagent, and name the product from the structure, not from the rule.
:::

## Hydration: making alcohols from alkenes

**Acid-catalysed hydration** is the prototype with water as nucleophile. In words: protonation of the $\pi$ bond gives the Markovnikov carbocation; a water molecule attacks the cation; a second water removes the extra proton and the catalyst is regenerated. Read the steps backwards and you have the E1 elimination of [[organic-1/elimination]] — hydration *is* the microscopic reverse of acid-catalysed elimination, so the reaction is an equilibrium, and by Le Chatelier dilute acid favours the alcohol while concentrated acid and heat drive elimination back on. Everything true of the cation mechanism applies: Markovnikov regiochemistry, and rearrangement whenever a shift can upgrade the intermediate.

**Oxymercuration** exists to get the same Markovnikov alcohol *without* the cation. Conceptually: instead of a proton, the alkene attacks a mercury(II) carboxylate, and the metal bridges both carbons as a cyclic **mercurinium ion** — a bridged intermediate with no free cation, so no rearrangement is possible; water attacks the more substituted carbon (where the bridge is looser and the positive charge more developed), and a second reagent replaces the carbon–mercury bond with a carbon–hydrogen bond. Net result: Markovnikov water, unrearranged. The trade-off is the mercury salt itself, which is acutely toxic to aquatic life and handled only as waste to be collected, never poured away.

**Hydroboration–oxidation** solves the opposite problem — anti-Markovnikov hydration — by refusing the cation entirely. Diborane or borane $\mathrm{BH_3}$ (flammable gas, supplied as a sealed solution; a Lewis acid with an empty orbital on boron) adds across the double bond in a single **concerted** step: boron and hydrogen arrive on the same face (*syn*) through a compact four-centre transition state. Boron goes to the **less substituted** carbon for two reinforcing reasons — it is less hindered there, and in the transition state the more substituted carbon bears the partial positive charge, which it stabilises better. No cation means no rearrangement. Oxidation with hydrogen peroxide in base then replaces the $\mathrm{C{-}B}$ bond with a $\mathrm{C{-}OH}$ bond, keeping the configuration at carbon. Net: **anti-Markovnikov, *syn* hydration**.

::: example Two alcohols from one alkene {#ex-hydroboration}
1-Methylcyclohexene can be converted to 1-methylcyclohexan-1-ol or to *trans*-2-methylcyclohexan-1-ol. Give the two sets of conditions and explain the regiochemistry and stereochemistry of each.
::: solution
**1-Methylcyclohexan-1-ol:** dilute aqueous acid. Protonation at C2 gives the tertiary cation at C1 — Markovnikov, and the tertiary cation needs no rearranging; water attacks, and loss of a proton gives the tertiary alcohol. The product carbon carries two identical ring arms, so it is not a stereocentre and no stereochemistry need be specified.
***trans*-2-Methylcyclohexan-1-ol:** $\mathrm{BH_3}$, then $\mathrm{H_2O_2,\ HO^-}$. Boron adds to the less substituted C2 and hydrogen to C1, both on the same face (*syn*); oxidation replaces B by OH with retention, so the OH and the new hydrogen on C1 are *cis* — which puts the OH *trans* to the methyl group on C1. Anti-Markovnikov regiochemistry, *syn* addition, no rearrangement: all three signatures of the boron route in a single product.
:::
:::

## Halogenation: the bromonium ion

Chlorine and bromine add straight across the double bond, and the observation is the one already recorded in [[organic-1/organic-structures]]: the brown colour of bromine disappears in the dark, which is the test for unsaturation at the bench. (Bromine is a volatile, corrosive lachrymator whose vapour the fume cupboard exists to contain — a hazard to read about here and to respect in the laboratory.) A plain ionic mechanism — halogen as electrophile, free carbocation, halide capture — would predict *syn* and *anti* addition in roughly equal amounts and rearrangements when the cation can upgrade. Neither is observed. Addition is cleanly **anti**, and no rearrangement ever appears.

::: proposition The halonium-ion mechanism {#prop-halonium}
Addition of $\mathrm{Br_2}$ or $\mathrm{Cl_2}$ to an alkene proceeds through a **cyclic halonium ion**: the $\pi$ bond attacks one halogen of $\mathrm{Br{-}Br}$, displacing halide, and that same halogen closes a three-membered ring to *both* carbons with its lone pairs. The bridged ion has no free carbocation, so **(i)** no rearrangement is possible, and **(ii)** the halide ion can attack only from the face opposite the bridge — **anti addition**. In an unsymmetrical alkene the more substituted carbon bears more of the positive charge (the bridge is looser at that end), which is why external nucleophiles open the ring preferentially at the more substituted carbon.
:::

::: example Stereochemistry of bromination: but-2-ene {#ex-bromination-stereo}
Predict the products of $\mathrm{Br_2}$ addition to (a) (*E*)-but-2-ene and (b) (*Z*)-but-2-ene.
::: solution
Anti addition to a symmetric alkene puts one bromine on each carbon, on opposite faces. **(a)** From the *E* isomer, anti addition gives $(2R,3S)$-2,3-dibromobutane — the **meso** compound, whose two halves are mirror images ([[organic-1/stereochemistry]]). **(b)** From the *Z* isomer, anti addition gives the $(2R,3R)$ and $(2S,3S)$ pair — the racemate. The two geometrical isomers of the alkene give diastereomerically different products: that is what *stereospecific* means, and it is exactly what the bridged ion demands. A free, planar carbocation would rotate and scramble the two outcomes together.
:::
:::

Run the same reaction in **water** instead of an inert solvent and the nucleophile that opens the halonium ring is water, not halide — water is the solvent and wins on sheer numbers. It attacks the more substituted carbon of the bridge, deprotonation follows, and the product is a **halohydrin**: $\mathrm{X}$ and $\mathrm{OH}$ on adjacent carbons, added *anti*, with the $\mathrm{OH}$ on the more substituted carbon. The outcome looks Markovnikov, but it is enforced by the electronics of the bridged ion, not by a free cation. Halohydrins are also the entry ramp to epoxides in [[organic-1/alcohols-ethers]].

::: history
Vladimir **Markovnikov** stated his rule in 1869, in a Kazan study of the addition of hydrogen iodide to the amylene (pentene) mixtures then in fashion; he worked in the tradition of Zaytsev, whose elimination rule this chapter mirrors in reverse. Why the additions are so clean — anti, unrearranged — waited on the mechanistic programme of the 1930s, in which **Robinson** and **Ingold** (the same Ingold of the substitution kinetics behind [[organic-1/nucleophilic-substitution]]) learned to read stereochemistry as evidence and established the bridged halonium ions that reconcile anti addition with the absence of rearrangement. The other great addition of the century belongs to Herbert C. **Brown**: hydroboration, developed from the 1950s onwards from borane chemistry he pursued for decades, delivered anti-Markovnikov alcohols with no carbocation anywhere in the mechanism, and earned him — shared with Georg Wittig — the 1979 Nobel Prize in Chemistry.
:::

## Hydrogenation and the stability ladder

Hydrogen adds across the double bond on the surface of palladium, platinum or nickel. Both hydrogen atoms are delivered from the metal, and therefore to the same face: catalytic hydrogenation is ***syn*** addition. The reaction is heterogeneous — alkene and hydrogen adsorb, react and desorb — and it is strongly exothermic. The hazards are those of the reagents, not the mechanism: hydrogen is extremely flammable, and finely divided metal catalysts can ignite when they dry out.

::: proposition The heat-of-hydrogenation ladder {#prop-stability-ladder}
Heats of hydrogenation (standard tabulated data, $\mathrm{kJ\,mol^{-1}}$, all exothermic): ethene $-137$; propene $-125$, 1-butene $-127$; *cis*-but-2-ene $-120$, *trans*-but-2-ene $-116$; 2-methylpropene $-119$; 2-methylbut-2-ene $-113$. Because isomeric alkenes hydrogenate to the same alkane, their heats measure their relative energies: **the more alkyl-substituted the double bond, the more stable the alkene**, and within the disubstituted class the *E* isomer is more stable than the *Z* (here by $4\ \mathrm{kJ\,mol^{-1}}$). The ladder runs tetrasubstituted $<$ trisubstituted $<$ disubstituted $<$ monosubstituted $<$ ethene in energy — roughly $8$–$10\ \mathrm{kJ\,mol^{-1}}$ of stability per alkyl substituent, the same hyperconjugative donation that stabilises carbocations.
:::

::: widget plot
f: 135 - 8*x
x: -0.2, 3.4
y: 105, 142
points: 0,137; 1,125; 1,127; 2,120; 2,116; 2,119; 3,113
labels: \text{least-squares guide}
caption: Magnitudes of heats of hydrogenation ($-\Delta H$ in $\mathrm{kJ\,mol^{-1}}$) against the number of alkyl substituents on the double bond: ethene (0); propene and 1-butene (1); *cis*- and *trans*-but-2-ene and 2-methylpropene (2); 2-methylbut-2-ene (3). The least-squares guide $135 - 8x$ makes the ladder explicit — each alkyl group buys about $8\ \mathrm{kJ\,mol^{-1}}$ of alkene stability — while the scatter within the disubstituted row is the *E*/*Z* and geminal-versus-vicinal story. Remember the scale runs downwards as stability runs upwards: a smaller heat of hydrogenation means a more stable alkene.
:::

::: example Isomer energies from Hess's law {#ex-hydrogenation-hess}
Use the data of proposition [[#prop-stability-ladder]] to find $\Delta H$ for (a) *cis*-but-2-ene $\rightarrow$ *trans*-but-2-ene; and (b) estimate the heat of hydrogenation of *trans*-but-2-ene from mean bond enthalpies ($\pi$: $266$; $\mathrm{H{-}H}$: $436$; $\mathrm{C{-}H}$: $413\ \mathrm{kJ\,mol^{-1}}$) and compare.
::: solution
**(a)** Both isomers hydrogenate to butane, so Hess's law lets us subtract the thermochemical equations: $\Delta H = (-120) - (-116) = -4\ \mathrm{kJ\,mol^{-1}}$ for the *cis* $\rightarrow$ *trans* isomerisation. The *trans* isomer sits $4\ \mathrm{kJ\,mol^{-1}}$ lower — the two methyl groups are further apart, and the heat of hydrogenation is the balance that says so. **(b)** Hydrogenation breaks the $\pi$ bond and the $\mathrm{H{-}H}$ bond ($266 + 436 = 702$) and forms two $\mathrm{C{-}H}$ bonds ($2 \times 413 = 826$): $\Delta H \approx -124\ \mathrm{kJ\,mol^{-1}}$, against the measured $-116$. Mean bond enthalpies land within the expected few per cent and, as always, slightly overstate the exothermicity of a stabilised alkene.
:::
:::

## Oxidation: diols, cleavage and epoxides

Cold, dilute, alkaline **potassium manganate(VII)** adds two hydroxyl groups across the double bond, on the same face — ***syn* dihydroxylation** to a *vic*-diol — with the purple colour discharging to brown manganese dioxide, the visual signal of the test. The chemistry is a cyclic manganate ester formed in one step (which is why both oxygens arrive together) and hydrolysed afterwards; the oxidant itself is a strong oxidiser and a stain, handled at hazard-class level. Under harsher, hot conditions the same oxidant cleaves the bond outright — which is the crude cousin of the clean probe below.

A **peroxycarboxylic acid** $\mathrm{RCO_3H}$ transfers a single oxygen atom to the $\pi$ bond in one concerted step, giving an **epoxide**: a three-membered cyclic ether. Oxygen is delivered to one face, so the two new $\mathrm{C{-}O}$ bonds form *syn*, and the strained ring stores the rest of the old $\pi$ bond as reactivity — epoxides are opened by nucleophiles in the substitution chemistry of [[organic-1/alcohols-ethers]].

**Ozonolysis** is the scission probe. Ozone $\mathrm{O_3}$ — generated in situ from oxygen as needed, because it is toxic and must never be stored or concentrated — adds to the $\pi$ bond, and a reductive workup (zinc, or dimethyl sulfide) breaks the $\mathrm{C{=}C}$ completely and caps each former alkene carbon with a carbonyl oxygen. Every fragment is therefore a half of the alkene, read backwards from its $\mathrm{C{=}O}$.

::: example Structure from fragments {#ex-ozonolysis}
An unknown hydrocarbon $\mathrm{C_7H_{14}}$ takes up one equivalent of $\mathrm{H_2}$ over palladium and, on ozonolysis with reductive workup, gives propanone and butan-2-one in a $1:1$ ratio. Propose the structure.
::: solution
One equivalent of hydrogen: one double bond, acyclic. Ozonolysis cuts the $\mathrm{C{=}C}$ and caps each end with oxygen, so run the reaction backwards: strip the two carbonyl oxygens and join the carbonyl carbons with a double bond. Propanone contributes the $\mathrm{(CH_3)_2C{=}}$ half; butan-2-one contributes $\mathrm{{=}C(CH_3)CH_2CH_3}$. The alkene is **2,3-dimethylpent-2-ene**, $\mathrm{(CH_3)_2C{=}C(CH_3)CH_2CH_3}$ — $\mathrm{C_7H_{14}}$, consistent with the hydrogen uptake. A tetrasubstituted double bond, which is why it sits low on the stability ladder and cleaves more cleanly than it adds. Had the unknown given a single product twice, the alkene would have been symmetric — the reasoning of exercise [[#exr-ozonolysis-set]].
:::
:::

## Alkynes: two additions and a terminal C–H

An alkyne carries two $\pi$ bonds, so everything this chapter has said happens twice — with one twist at each end. Addition of one equivalent of $\mathrm{HX}$ gives a vinyl halide by Markovnikov protonation; a second equivalent adds again, and the second addition also follows the rule because the cation stabilised by the halogen's lone pairs is the one that forms — the two halogens end up on the **same carbon** (a geminal dihalide). Hydrogenation adds two equivalents of $\mathrm{H_2}$ to the alkane; partial hydrogenation on a poisoned catalyst delivers both hydrogens *syn* and stops at the *Z* alkene, and the *E* alkene is reached by the alternative reduction — the geometry vocabulary of [[organic-1/stereochemistry]] deciding which product a synthesis gets. Addition to alkynes is slower than to alkenes: the vinyl cation of the first step puts the positive charge on an $sp$ carbon, and $sp$ orbitals hold electrons so tightly that the cation is far more reluctant than any of the $sp^2$ cations above.

Hydration follows the same fork as the alkenes. Markovnikov hydration of a terminal alkyne (mercury-catalysed, conceptually, and with the same toxicity warning as oxymercuration) first gives an **enol**, $\mathrm{C{=}C{-}OH}$, which tautomerises — a proton and a double bond changing partners — to the **methyl ketone**. Hydroboration–oxidation runs anti-Markovnikov, putting the enol's OH on the terminal carbon, and the tautomer is then the **aldehyde**. Enol–keto tautomerism is a preview of the carbonyl chemistry of the second course ([[organic-2/carbonyl-addition]]).

The twist at the other end is acidity. The terminal $\mathrm{C{-}H}$ of an alkyne has $\mathrm{p}K_\mathrm{a} \approx 25$ — the orbital factor of [[organic-1/acidity-mechanism]], $50\,\%$ s character holding the conjugate-base lone pair close to the nucleus — so strong bases such as amide convert terminal alkynes into **acetylides**, and acetylides are nucleophiles that displace halide from primary halides by the $\mathrm{S_N2}$ mechanism of [[organic-1/nucleophilic-substitution]], building a new carbon–carbon bond. Alkyne alkylation is the first place in this course where a $\mathrm{C{-}C}$ bond is made to order, and it is the reason the chapter ends with synthesis rather than with a list.

## What adds where, from which face

| reaction | what adds | regiochemistry | stereochemistry |
|---|---|---|---|
| $\mathrm{HX}$ ($\mathrm{HCl}$, $\mathrm{HBr}$, $\mathrm{HI}$) | $\mathrm{H}$, then $\mathrm{X}$ | Markovnikov; rearrangements possible | unrestricted (planar cation) |
| $\mathrm{H_2O,\ H^+}$ | $\mathrm{H}$, then $\mathrm{OH}$ | Markovnikov; rearrangements possible | unrestricted |
| 1. $\mathrm{Hg(OAc)_2,\ H_2O}$; 2. $\mathrm{NaBH_4}$ | $\mathrm{H}$, then $\mathrm{OH}$ | Markovnikov; no rearrangement | unrestricted |
| 1. $\mathrm{BH_3}$; 2. $\mathrm{H_2O_2,\ HO^-}$ | $\mathrm{H}$, then $\mathrm{OH}$ | anti-Markovnikov; no rearrangement | *syn* |
| $\mathrm{Br_2}$ or $\mathrm{Cl_2}$ | $\mathrm{X}$, then $\mathrm{X}$ | — (identical groups) | *anti* |
| $\mathrm{Br_2}$ or $\mathrm{Cl_2}$ in $\mathrm{H_2O}$ | $\mathrm{X}$, then $\mathrm{OH}$ | $\mathrm{OH}$ on the more substituted carbon | *anti* |
| $\mathrm{H_2}$, Pd/C | $\mathrm{H}$, then $\mathrm{H}$ | — | *syn* |
| cold dilute $\mathrm{KMnO_4}$ | $\mathrm{OH}$, then $\mathrm{OH}$ | — | *syn* |
| $\mathrm{RCO_3H}$, then $\mathrm{H_3O^+}$ | O; then $\mathrm{OH}$ and $\mathrm{OH}$ | — | epoxidation *syn*; ring opening *anti* |
| 1. $\mathrm{O_3}$; 2. $\mathrm{Zn}$ or $\mathrm{Me_2S}$ | cleaves $\mathrm{C{=}C}$ to two $\mathrm{C{=}O}$ | — | — |

Three questions ask the whole table. *What are the two new bonds?* — read the reagent as $\mathrm{E{-}Nu}$. *Which carbon gets which?* — regiochemistry: cation stability for the ionic additions, steric approach for boron, bridge electronics for the halonium. *From which face?* — stereochemistry: *syn* when the two bonds form at once or on a metal surface, *anti* when a bridged ion forces backside attack, unrestricted when a free planar cation decides nothing. Answer those three for any row and the product draws itself.

## Where this leads

Hydration and halohydrin formation are two of the preparations of alcohols that [[organic-1/alcohols-ethers]] systematises, and the epoxides previewed above are opened there by the substitution chemistry of [[organic-1/nucleophilic-substitution]]. The anti-Markovnikov addition of HBr we deferred is the radical chain of [[organic-1/radical-reactions]], where fishhook arrows replace curly ones and peroxides turn the rule inside out. The enols and tautomers glimpsed at the alkyne end of this chapter become the main subject of [[organic-2/carbonyl-addition]]. Every addition here is the microscopic reverse of the eliminations of [[organic-1/elimination]] — read the two chapters facing each other and the mechanism half of the course is one chapter, not two. The stereochemical vocabulary the table leans on (*syn*, *anti*, meso, racemic, *E*/*Z*) is built in [[organic-1/stereochemistry]].

::: summary
- The $\pi$ bond is a nucleophile: addition trades one weak $\pi$ bond ($266\ \mathrm{kJ\,mol^{-1}}$) plus a reagent $\sigma$ bond for two stronger $\sigma$ bonds, so electrophilic additions are exothermic (HBr across $\mathrm{C{=}C}$: about $-66\ \mathrm{kJ\,mol^{-1}}$).
- Markovnikov's rule is empirical; its mechanism is "protonate to the more stable carbocation," justified by Hammond's postulate — a late, cation-like transition state means cation stability *is* barrier height, and $7.3\ \mathrm{kJ\,mol^{-1}}$ of $\Delta\Delta G^{\ddagger}$ buys $95:5$.
- Carbocation intermediates rearrange by 1,2-hydride and 1,2-alkyl shifts whenever a shift upgrades $2^\circ \rightarrow 3^\circ$; rearranged products are the evidence that the cation is real and the limit of the naive rule.
- Three hydrations, three answers: acid-catalysed (Markovnikov, reversible, rearranges), oxymercuration (Markovnikov, no rearrangement, bridged mercurinium), hydroboration–oxidation (anti-Markovnikov, *syn*, no cation at all).
- Halogenation goes through a cyclic halonium ion: *anti* addition, never rearranges, and in water the halohydrin forms with $\mathrm{OH}$ on the more substituted carbon.
- Heats of hydrogenation measure alkene stability: more substituted means more stable (about $8\ \mathrm{kJ\,mol^{-1}}$ per alkyl group), *E* beats *Z*, and catalytic hydrogenation is *syn*.
- Oxidation branches: cold dilute $\mathrm{KMnO_4}$ gives *syn* diols, peracids give epoxides, and ozonolysis cleaves the $\mathrm{C{=}C}$ to carbonyls — a structural probe read backwards from the fragments.
- Alkynes add twice (geminal dihalides; Markovnikov hydration to methyl ketones via enols, anti-Markovnikov hydroboration to aldehydes) and their terminal $\mathrm{C{-}H}$ ($\mathrm{p}K_\mathrm{a} \approx 25$) makes acetylides for carbon–carbon bond construction.
:::

## Exercises

::: exercise Enthalpy of HCl addition {level=1 check="-54"}
Estimate $\Delta H$ for the addition of $\mathrm{HCl}$ across a $\mathrm{C{=}C}$ double bond from mean bond enthalpies ($\pi$: $266$; $\mathrm{H{-}Cl}$: $431$; $\mathrm{C{-}H}$: $413$; $\mathrm{C{-}Cl}$: $338\ \mathrm{kJ\,mol^{-1}}$). (Enter $\Delta H$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
Bonds broken: $266 + 431 = 697$. Bonds formed: $413 + 338 = 751$. $\Delta H \approx 697 - 751 = -54\ \mathrm{kJ\,mol^{-1}}$. Exothermic, like every addition of the $\pi$-for-$\sigma$ type; the $\mathrm{H{-}Cl}$ bond is stronger than $\mathrm{H{-}Br}$, which is why the addition of $\mathrm{HCl}$ is somewhat less exothermic than that of $\mathrm{HBr}$ ($-66$).
:::
:::

::: exercise Stability from the ladder {level=1 check="4"}
Heats of hydrogenation are $-120\ \mathrm{kJ\,mol^{-1}}$ for *cis*-but-2-ene and $-116\ \mathrm{kJ\,mol^{-1}}$ for *trans*-but-2-ene. By how many $\mathrm{kJ\,mol^{-1}}$ is the *trans* isomer the more stable? (Enter the number.)
::: solution
Both isomers hydrogenate to butane, so the difference of the heats is the energy gap: $120 - 116 = 4\ \mathrm{kJ\,mol^{-1}}$. The *trans* isomer releases $4$ less on the way to the same product, so it started $4$ lower.
:::
:::

::: exercise Regioselectivity from a barrier gap {level=1 check="95"}
An addition proceeds through two competing transition states differing by $\Delta\Delta G^{\ddagger} = 7.3\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{298\ K}$. What percentage of the major isomer is expected? Take $RT = 2.479\ \mathrm{kJ\,mol^{-1}}$. (Enter the percentage.)
::: solution
Ratio $= e^{7.3/2.479} = e^{2.945} = 19.0$, so the major isomer is $19.0/20.0 = 95\,\%$. This is the arithmetic of the newton widget in the text: $7.3\ \mathrm{kJ\,mol^{-1}}$ at the transition state is $95:5$ in the flask.
:::
:::

::: exercise Enthalpy of bromination {level=2 check="-111"}
Estimate $\Delta H$ for the addition of $\mathrm{Br_2}$ across a $\mathrm{C{=}C}$ double bond from mean bond enthalpies ($\pi$: $266$; $\mathrm{Br{-}Br}$: $193$; $\mathrm{C{-}Br}$: $285\ \mathrm{kJ\,mol^{-1}}$). (Enter $\Delta H$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
Bonds broken: $266 + 193 = 459$. Bonds formed: $2 \times 285 = 570$. $\Delta H \approx 459 - 570 = -111\ \mathrm{kJ\,mol^{-1}}$. The weak $\mathrm{Br{-}Br}$ bond makes halogen addition more exothermic than hydrogen-halide addition — and the reaction still needs no light or heat, which is why the bromine test works in the dark.
:::
:::

::: exercise Predict with rearrangement {level=2}
Predict the major product of $\mathrm{HBr}$ addition to 3-methylpent-1-ene, $\mathrm{CH_2{=}CHCH(CH_3)CH_2CH_3}$, and describe the mechanism in words.
::: solution
Protonation at C1 (Markovnikov) gives the secondary cation $\mathrm{CH_3CH^{+}CH(CH_3)CH_2CH_3}$, which sits next to a tertiary carbon bearing a hydrogen. A 1,2-hydride shift upgrades the charge to C3, tertiary: $\mathrm{CH_3CH_2C^{+}(CH_3)CH_2CH_3}$. Bromide capture at C3 gives **3-bromo-3-methylpentane** as the major product. The unrearranged 2-bromo-3-methylpentane is minor; both products together are the signature of a cation that rearranged faster than it was captured.
:::
:::

::: exercise Choose your hydration {level=2}
Give conditions to convert 2-methylpropene into (a) 2-methylpropan-2-ol and (b) 2-methylpropan-1-ol, and explain why each route gives its product.
::: solution
**(a)** Dilute aqueous acid (or the oxymercuration sequence if rearrangement were a worry — here it is not, since the tertiary cation cannot upgrade). Protonation gives the tertiary cation at the central carbon; water attacks there: Markovnikov, the tertiary alcohol. **(b)** $\mathrm{BH_3}$, then $\mathrm{H_2O_2,\ HO^-}$. Boron adds to a terminal $\mathrm{CH_2}$ — less hindered, and the partial positive charge in the transition state sits on the more substituted carbon — and oxidation replaces B by OH: anti-Markovnikov, the primary alcohol. The same alkene, the same net addition of water, opposite regiochemistry: the mechanism, not the reagent label, decides.
:::
:::

::: exercise Ozonolysis set {level=3 #exr-ozonolysis-set}
Three unknowns, each a single acyclic alkene, give the following carbonyl products on ozonolysis with reductive workup. Deduce each alkene: (a) $\mathrm{C_4H_8}$ gives ethanal only; (b) $\mathrm{C_6H_{12}}$ gives propanone only; (c) $\mathrm{C_5H_{10}}$ gives ethanal and propanone.
::: solution
Run the cleavage backwards in every case: join the carbonyl carbons with a double bond and discard the oxygens. **(a)** Two identical halves — the alkene is symmetric: but-2-ene, $\mathrm{CH_3CH{=}CHCH_3}$ (the data cannot say *E* or *Z*). **(b)** Two propanone halves: 2,3-dimethylbut-2-ene, $\mathrm{(CH_3)_2C{=}C(CH_3)_2}$. **(c)** One $\mathrm{CH_3CH{=}}$ half and one $\mathrm{{=}C(CH_3)_2}$ half: 2-methylbut-2-ene, $\mathrm{CH_3CH{=}C(CH_3)_2}$. Each answer has the stated formula, which is the check: count carbons across the fragments before you commit.
:::
:::

::: exercise Three products from one alkene {level=3}
For 1-methylcyclopentene, propose a one- or two-step route to each of: (a) 1-methylcyclopentan-1-ol; (b) *trans*-2-methylcyclopentan-1-ol; (c) 1,2-dibromo-1-methylcyclopentane. State the regiochemical and stereochemical reason each route gives its product.
::: solution
**(a)** Dilute aqueous acid: Markovnikov protonation puts the tertiary cation at C1, water attacks there; the carbinol carbon bears two identical ring arms, so no stereochemistry is specified. **(b)** $\mathrm{BH_3}$, then $\mathrm{H_2O_2,\ HO^-}$: boron to the less substituted C2, hydrogen to C1, *syn* and unrearranged; oxidation with retention puts OH *trans* to the methyl (cis to the new H on C1). **(c)** $\mathrm{Br_2}$: the bromonium ion bridges C1 and C2 and bromide attacks from the opposite face, so the two bromines are *anti* (trans on the ring), with the more substituted carbon bearing its bromine from the bridge-opening step. Three reagents, three different answers from one alkene — regiochemistry and stereochemistry, not memory, generate all three.
:::
:::
