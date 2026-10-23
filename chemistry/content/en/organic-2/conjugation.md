A single carbon–carbon double bond is a local affair: two carbons share a $\pi$ bond, and the electrons in it belong, more or less, to those two carbons alone. Bring two double bonds close enough together — separated by exactly one single bond — and something qualitatively new happens. The $\pi$ systems stop being neighbours and start being one system: electrons that "belonged" to one pair of carbons find themselves shared by four, the single bond in the middle shortens, the molecule absorbs light at longer wavelengths, its heat of hydrogenation falls below what two isolated alkenes would give, and its addition reactions branch into two products whose ratio you can dial with the thermometer. This is **conjugation**, and it is the first of the two great ideas of this course — the idea that makes benzene, aromaticity, carbonyl chemistry and the colours of dyes and vision intelligible. This chapter builds the idea in its simplest home, the conjugated diene, and with it the most important pair of concepts in all of mechanistic organic chemistry: kinetic and thermodynamic control.

## The allyl system: three carbons, one electron pair

The smallest conjugated system has three carbons and two $\pi$ electrons spread over them. Remove a hydride from propene at the methyl carbon and you do not get an ordinary primary cation next to a double bond; you get the **allyl cation**, in which the empty orbital and the $\pi$ bond are adjacent $p$ orbitals on three consecutive carbons, and the two $\pi$ electrons occupy an orbital covering all three.

::: definition Conjugation and the allyl system {#def-conjugation}
A system is **conjugated** when a $p$ orbital — in a $\pi$ bond, in an empty orbital, in a singly occupied orbital, or holding a lone pair — lies adjacent to another $p$ orbital so that they overlap side-on and the electrons in them are delocalised over more than two atoms. The **allyl system** $\mathrm{CH_2{=}CH{-}CH_2}$ with two, one or zero electrons in the third $p$ orbital is the prototype, giving respectively the allyl **anion**, **radical** and **cation**: three parallel $p$ orbitals combine to give three molecular orbitals, and the electrons occupy the lowest available. A **conjugated diene** is the neutral four-carbon case: two $\pi$ bonds separated by exactly one $\sigma$ bond, as in buta-1,3-diene $\mathrm{CH_2{=}CH{-}CH{=}CH_2}$.
:::

The language of resonance ([[organic-1/organic-structures]]) describes the allyl cation as a hybrid of two equivalent structures with the positive charge on C1 or on C3. The hybrid is not an average that flickers between the two; it is a single molecule whose electrostatic potential shows half a positive charge at each terminus and whose two carbon–carbon bonds are equal in length ($1.39\ \mathrm{\AA}$, between alkene $1.34$ and alkane $1.54$). Resonance is the bookkeeping; the molecular orbitals are the reality, and for the allyl system the molecular orbitals are easy to write down.

::: proposition The allyl molecular orbitals {#prop-allyl-mo}
Three parallel $p$ orbitals combine to give three $\pi$ molecular orbitals: $\psi_1$, bonding between all adjacent pairs (no node perpendicular to the bond axis beyond the molecular plane); $\psi_2$, nonbonding, with a node through the central carbon, so its density sits only on the two termini; and $\psi_3^{*}$, strongly antibonding, with two nodes. The allyl cation has two $\pi$ electrons and puts them both in $\psi_1$; the radical adds one electron to $\psi_2$; the anion pairs it up. In all three species the frontier orbitals sit on the terminal carbons: the HOMO of the anion and the LUMO of the cation have large, equal coefficients at C1 and C3 and zero coefficient at C2.
:::

That last sentence is the whole reactivity of allylic systems in one line: whatever reacts, reacts at the ends, and the middle carbon is a spectator. It also explains the classic observation that substitution at either end of an allyl system gives the same product mixture.

::: example Two leaving groups, one cation, two products {#ex-allyl-mixture}
Both 3-chlorobut-1-ene ($\mathrm{CH_2{=}CH{-}CHCl{-}CH_3}$) and 1-chlorobut-2-ene (crotyl chloride, $\mathrm{CH_3{-}CH{=}CH{-}CH_2Cl}$) solvolise in aqueous acetone far faster than the corresponding saturated chlorides, and both give the same two alcohols in the same ratio. What is the intermediate, and what are the two alcohols?
::: solution
Ionisation of either chloride gives the *same* allyl cation, $\mathrm{CH_2{=}CH{-}\overset{+}{C}H{-}CH_3 \leftrightarrow\, ^{+}CH_2{-}CH{=}CH{-}CH_3}$: in the first case the charge starts at C3 and in the second at C1 of one and the same delocalised system. Water can then capture the cation at either terminus. Attack at the secondary terminus gives but-3-en-2-ol, $\mathrm{CH_2{=}CH{-}CH(OH){-}CH_3}$; attack at the primary terminus gives but-2-en-1-ol, $\mathrm{HOCH_2{-}CH{=}CH{-}CH_3}$. Both chlorides give both alcohols, in the same ratio, because both run through one intermediate — the diagnostic of a common cation. The rate acceleration relative to saturated chlorides is the kinetic signature of the same delocalisation: the ionisation transition state is allyl-cation-like and is stabilised by it just as the intermediate is.
:::
:::

The same delocalisation shows up in thermochemistry. The allylic $\mathrm{C{-}H}$ bond dissociation enthalpy in propene is $369\ \mathrm{kJ\,mol^{-1}}$ against $423\ \mathrm{kJ\,mol^{-1}}$ for a primary $\mathrm{C{-}H}$ in propane: the radical product is stabilised by $54\ \mathrm{kJ\,mol^{-1}}$ of delocalisation. This is why $N$-bromosuccinimide brominates allylic positions selectively ([[organic-1/radical-reactions]]), and why cracking, combustion and autoxidation attack molecules first next to their double bonds.

## Buta-1,3-diene: four carbons, four orbitals

::: definition Conjugated, isolated and cumulated dienes {#def-diene-classes}
Dienes with two double bonds come in three geometries. In a **conjugated diene** the double bonds are separated by one single bond ($\mathrm{C{=}C{-}C{=}C}$), so the $p$ orbitals run continuously around the four-carbon unit; buta-1,3-diene is the parent. In an **isolated diene** two or more $sp^3$ carbons intervene ($\mathrm{C{=}C{-}C{-}C{=}C}$) and the $\pi$ bonds behave independently, as in penta-1,4-diene. In a **cumulated diene** (an allene) the double bonds share a carbon ($\mathrm{C{=}C{=}C}$), and its two $\pi$ bonds lie in perpendicular planes. Only the conjugated class has a continuous $\pi$ system and the properties that come with it.
:::

Buta-1,3-diene's four $p$ orbitals combine into four $\pi$ molecular orbitals. Fill the lowest two with the four $\pi$ electrons and read off the consequences: the HOMO ($\psi_2$) has terminal coefficients of the same sign, so the two ends of the molecule are orbitally connected — a reagent bonding to C1 leaves between C2 and C3 a bond that is already $\pi$-like; the LUMO ($\psi_3^{*}$) has its largest coefficients at the termini too. The central C2–C3 bond is $1.46\ \mathrm{\AA}$ rather than the $1.54\ \mathrm{\AA}$ of an $sp^3$–$sp^3$ bond: it has partial double-bond character, and rotation about it therefore costs $\approx 25\ \mathrm{kJ\,mol^{-1}}$ instead of the usual $12$.

::: proposition The butadiene levels and the conjugation energy {#prop-butadiene-mo}
Within the simplest $\pi$-molecular-orbital treatment the four $\pi$ orbitals of buta-1,3-diene lie, in increasing energy, at $\alpha+1.62\beta$, $\alpha+0.62\beta$, $\alpha-0.62\beta$ and $\alpha-1.62\beta$ (with $\beta$ the negative resonance integral), and the four electrons fill the bonding pair $\psi_1,\psi_2$. The total $\pi$ energy, $2(\alpha+1.62\beta)+2(\alpha+0.62\beta)=4\alpha+4.48\beta$, exceeds that of two isolated $\pi$ bonds ($4\alpha+4\beta$) by $0.48\beta$; since $\beta$ is negative this is a stabilisation — the **conjugation energy**, measured thermochemically at about $15\ \mathrm{kJ\,mol^{-1}}$.
:::

::: example Measuring conjugation by hydrogenation {#ex-hydrogenation}
Standard enthalpies of hydrogenation are $-126.8\ \mathrm{kJ\,mol^{-1}}$ for but-1-ene, $-253.6\ \mathrm{kJ\,mol^{-1}}$ for penta-1,4-diene (an isolated diene: exactly twice the but-1-ene value) and $-238.9\ \mathrm{kJ\,mol^{-1}}$ for buta-1,3-diene. Find the conjugation energy of buta-1,3-diene and comment on its size.
::: solution
The conjugation energy is the shortfall: $-253.6 - (-238.9) = -14.7$, i.e. buta-1,3-diene is **$14.7\ \mathrm{kJ\,mol^{-1}}$ more stable** than a molecule with two independent double bonds. Two comments. First, the number is real but modest — conjugation is not a dramatic bond-strength effect at this size, and it is worth remembering when benzene's far larger stabilisation appears in [[organic-2/aromaticity]]. Second, the comparison is made honest by penta-1,4-diene, whose hydrogenation really is twice that of but-1-ene: isolated double bonds are additive, so the shortfall of the conjugated diene is a property of conjugation and not of the measurement.
:::
:::

One structural consequence deserves a moment's attention because it returns constantly: rotation about the central single bond gives two planar conformers, **s-*cis** and **s-*trans** (the $s$ specifies the *single* bond). The s-*trans* form is more stable by about $4\ \mathrm{kJ\,mol^{-1}}$ — the chain ends are further apart — but the s-*cis* form is the one that reacts in ring-forming reactions, because only there are the two ends close enough to bond to the same partner. A diene locked s-*trans*, as in most cyclic dienes, is correspondingly sluggish in exactly those reactions.

::: example How much of the reactive conformer is there? {#ex-scis}
The s-*cis* conformer of buta-1,3-diene lies about $4\ \mathrm{kJ\,mol^{-1}}$ above the s-*trans* conformer. What fraction of molecules occupies the reactive s-*cis* form in an equilibrium mixture at $25\ \mathrm{^\circ C}$?
::: solution
The equilibrium constant (s-*trans* $\rightarrow$ s-*cis*) is $K = e^{-\Delta G^\circ/RT} = e^{-4000/(8.314\times298.15)} = e^{-1.61} = 0.199$, so the s-*cis* fraction is $0.199/(1+0.199) = 0.17$, about $17\,\%$. Nearly one molecule in six is in the reactive conformation at any moment, which is why "only the s-*cis* form reacts" sits perfectly comfortably with "dienes cyclise readily at room temperature" — the reaction drains the s-*cis* pool, and the s-*trans* form refills it.
:::
:::

## Addition of HBr: one proton, two products

Add one equivalent of HBr to buta-1,3-diene and the proton adds to a terminal carbon, because that choice puts the positive charge on an allylic system rather than on an unstabilised primary carbon. The product of this first step is the allyl cation $\mathrm{CH_3{-}\overset{+}{C}H{-}CH{=}CH_2 \leftrightarrow CH_3{-}CH{=}CH{-}\overset{+}{C}H_2}$, and bromide can close on either electrophilic terminus.

::: definition 1,2- and 1,4-addition {#def-12-14}
**1,2-Addition** is addition of the two new groups to adjacent atoms of the original diene: bromide attacks C2 of the allyl cation, and the product is 3-bromobut-1-ene, $\mathrm{CH_3CHBrCH{=}CH_2}$, with the remaining double bond where the inner one was. **1,4-Addition** (conjugate addition) is addition to the two ends of the conjugated system: bromide attacks C4, the product is 1-bromobut-2-ene, $\mathrm{CH_3CH{=}CHCH_2Br}$, and a new $\pi$ bond has appeared between C2 and C3. Both products arise from one intermediate; which one you get is decided not by the mechanism but by the competition between two rate constants and, if the steps are reversible, two equilibrium constants.
:::

The experimental facts are the syllabus of this chapter:

| temperature | 3-bromobut-1-ene (1,2) | 1-bromobut-2-ene (1,4) |
|---|---|---|
| $-80\ \mathrm{^\circ C}$ | $80\,\%$ | $20\,\%$ |
| $40\ \mathrm{^\circ C}$ | $20\,\%$ | $80\,\%$ |

::: definition Kinetic and thermodynamic control {#def-kin-thermo}
A reaction is under **kinetic control** when the product ratio equals the ratio of the forward rate constants, $k_{1,2}/k_{1,4}$ — which is what happens when the product-forming step is irreversible: the product that forms faster wins, whatever its stability. It is under **thermodynamic control** when the product-forming step is reversible and the products equilibrate: the ratio is then the equilibrium constant $K = e^{-\Delta G^\circ/RT}$, and the more stable product wins, whatever its speed. The switch between them is reversibility — supplied in practice by temperature and time, since higher temperature activates the reversal.
:::

The two products of HBr addition are a textbook case. The 1,2-product has the *less* stable alkene (monosubstituted, against the disubstituted alkene of the 1,4-product), yet it forms faster: at low temperature, when the bromide has no chance to leave again, the ratio reports the rates. The 1,4-product is more stable by about $3.6\ \mathrm{kJ\,mol^{-1}}$ (example [[#ex-ddg]] extracts this from the $40\ \mathrm{^\circ C}$ ratio), and at $40\ \mathrm{^\circ C}$ ionisation of the $\mathrm{C{-}Br}$ bond back to the allyl cation is fast enough on the reaction timescale for the mixture to equilibrate and the stable product to accumulate.

::: proposition Why the kinetic product is the 1,2-product {#prop-why-12}
Two effects make $k_{1,2} > k_{1,4}$. **Charge control:** in the unsymmetrical allyl cation $\mathrm{CH_3{-}\overset{+}{C}H{-}CH{=}CH_2 \leftrightarrow CH_3CH{=}CH{-}\overset{+}{C}H_2}$ the more substituted contributor places the charge on a secondary carbon and contributes more to the hybrid, so the larger share of positive charge sits at C2, where electrostatics also give the larger orbital coefficient for capture. **Proximity:** the bromide that has just delivered the proton to C1 is still sitting next to C2 as a contact ion pair, and capture within the pair is faster than diffusion to C4. Proximity is the larger effect at low temperature, and it fades as the ion pair separates.
:::

::: widget plot
f: a*exp(-((x-1.6)/0.4)^2) + c*exp(-((x-3.1)/0.4)^2); a*exp(-((x-1.6)/0.4)^2) + d*exp(-((x-3.1)/0.4)^2)
x: 0, 4.5
y: -5, 60
sliders: a=40:25:55:1; c=30:15:45:1; d=42:25:55:1
labels: \text{1,2-pathway}; \text{1,4-pathway}
caption: Schematic reaction coordinate for HBr addition to buta-1,3-diene (energies in arbitrary units). The shared first hump (slider $a$) is the ionisation to the allyl cation; the second humps are the two closures — the 1,2-transition state (slider $c$) lies below the 1,4 (slider $d$). Both curves return to the baseline at the right, but the true product levels lie below the starting materials, with the 1,4-product the deeper well by $3.6\ \mathrm{kJ\,mol^{-1}}$. The picture is the whole chapter in one frame: the kinetic product is whichever lies beyond the lower second hump, the thermodynamic product whichever sits in the deeper well, and nothing in the diagram says the two have to be the same compound.
:::

::: example The thermodynamic difference, extracted {#ex-ddg}
At $40\ \mathrm{^\circ C}$ the product mixture from HBr and buta-1,3-diene equilibrates at $80\,\%$ 1,4-product and $20\,\%$ 1,2-product. Calculate $\Delta G^\circ$ for the interconversion 1,2-product $\rightarrow$ 1,4-product. (Enter $\Delta G^\circ$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
The equilibrium constant is $K = 0.80/0.20 = 4.0$, so
$$
\Delta G^\circ = -RT\ln K = -8.314\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 313.15\ \mathrm{K} \times \ln 4.0 = -3.61\ \mathrm{kJ\,mol^{-1}}.
$$
The 1,4-product is more stable by $3.6\ \mathrm{kJ\,mol^{-1}}$ — a small number, which is exactly why a $120\ \mathrm{K}$ change of temperature can flip the ratio: $RT$ at $40\ \mathrm{^\circ C}$ is $2.6\ \mathrm{kJ\,mol^{-1}}$, so a few $\mathrm{kJ\,mol^{-1}}$ of stability is a factor of a few, not a foregone conclusion.
:::
:::

::: warning Three things kinetic and thermodynamic control are not {#warn-kin-thermo}
**(1)** "The kinetic product is the 1,2-product" is a fact about *this* reaction, not a definition. If one product's transition state is both lower *and* its well deeper, it wins at every temperature and there is nothing to control. **(2)** Thermodynamic control does not mean "higher temperature makes the more stable product form faster" — it means the steps have become *reversible*; the stable product accumulates because the unstable one keeps falling back through the same allyl cation. A reaction whose products cannot ionise back is under kinetic control even at $400\ \mathrm{^\circ C}$. **(3)** The labels are not a moral ranking: under kinetic control the *less* stable product is not a failure or an impurity, it is the correct answer to a different question ("what forms fastest?"), and low-temperature trapping of kinetic products is a deliberate, standard technique — lithium enolates in [[organic-2/enols-enolates]] are generated and captured exactly this way.
:::

::: quiz
Buta-1,3-diene is treated with one equivalent of DBr at $-80\ \mathrm{^\circ C}$, under conditions where the products do not equilibrate. Which description gives the major product?
- [x] D on C1 and Br on C2: the kinetic 1,2-adduct.
- [ ] D on C1 and Br on C4: the thermodynamic 1,4-adduct.
- [ ] D on C2 and Br on C3: addition across the central bond.
- [ ] Equal amounts of 1,2- and 1,4-adduct, because the allyl cation is symmetrical.
::: solution
The kinetic product dominates at $-80\ \mathrm{^\circ C}$: D adds to the terminal carbon C1 to give the more substituted allyl cation, and bromide is captured at the adjacent C2 before the ion pair separates — the 1,2-adduct. The last option is the trap: the *parent* allyl cation $\mathrm{C_3H_5^+}$ is symmetrical, but methyl substitution breaks the symmetry, placing more charge at C2 and making the two termini chemically different.
:::
:::

::: history
The word "conjugation" is a survivor: in the 1880s it meant salts in which two basic groups "conjugated" with one acid, and its modern $\pi$-system sense was fixed only in the 1920s through the work of Robert **Robinson**, whose concept of the **vinylogous series** showed that a double bond transmits the properties of a carbonyl or a lone pair across single bonds — conjugation as a communication channel. The quantum account came at once: John C. **Slater** solved the three- and four-carbon problems in 1931, the same year Erich **Hückel** generalised them, and Linus **Pauling** translated the whole subject into resonance language in 1931–1933, giving organic chemists the two equivalent vocabularies they still use. The experimental backbone is the precision calorimetry of the Kistiakowsky laboratory in the 1930s, whose heats of hydrogenation — buta-1,3-diene, $-238.9\ \mathrm{kJ\,mol^{-1}}$ — are still the numbers textbooks quote.
:::

## Where conjugation leads

Conjugation is not a special topic; it is the default condition of most interesting molecules. An $\alpha,\beta$-unsaturated carbonyl compound — but-2-enal, cyclohex-2-enone — is a conjugated four-electron system polarised towards oxygen, and that polarisation creates *two* electrophilic sites, the carbonyl carbon and the $\beta$-carbon; the choice between 1,2- and 1,4-addition of nucleophiles to such systems is one of the most useful selectivity decisions in synthesis and is developed in [[organic-2/condensations]]. Cyclic conjugation of six electrons is benzene, and the whole of [[organic-2/aromaticity]] follows from asking why that number is special. Conjugation over tens of centres is the $\pi$ system of $\beta$-carotene, whose HOMO–LUMO gap falls in the visible and whose colour is conjugation you can see; the quantitative treatment of absorption belongs to the spectroscopy course. The mathematical machinery — Hückel theory in full — is worked out in [[quantum-chemistry/huckel-theory]], and the orbital bookkeeping assumed here is developed in [[bonding-structure/molecular-orbitals]].

::: summary
- Conjugation is the side-on overlap of adjacent $p$ orbitals; it delocalises $\pi$ electrons beyond two atoms, shortens the intervening single bond and stabilises the molecule.
- The allyl system's three molecular orbitals place the frontier coefficients on the terminal carbons, which is why allylic reactions happen at the ends and why either allylic leaving group gives the same product mixture.
- Buta-1,3-diene's four $\pi$ electrons fill two bonding orbitals; the conjugation energy is $\approx 15\ \mathrm{kJ\,mol^{-1}}$, measured against isolated-diene models by heats of hydrogenation.
- s-*cis* and s-*trans* diene conformers interconvert more slowly than ordinary single bonds ($\approx 25\ \mathrm{kJ\,mol^{-1}}$); the s-*cis* form is the reactive one in ring-forming reactions.
- HX addition to a conjugated diene runs through one allyl cation and gives both the 1,2- and the 1,4-adduct: at $-80\ \mathrm{^\circ C}$ the ratio is kinetic (80:20 for 1,2), at $40\ \mathrm{^\circ C}$ thermodynamic (80:20 for 1,4).
- Kinetic control means the product ratio equals a rate ratio (irreversible steps); thermodynamic control means it equals an equilibrium constant (reversible steps); reversibility, not temperature alone, is the switch.
- The 1,2-product forms faster because of charge control at the more substituted allyl terminus and because the counter-ion is already there; the 1,4-product is more stable because its alkene is more substituted.
:::

## Exercises

::: exercise Classify the diene {level=1}
Classify each diene as conjugated, isolated or cumulated: (a) hexa-1,5-diene; (b) hexa-1,3-diene; (c) hexa-1,2-diene; (d) the diene unit of but-2-enal.
::: solution
(a) Isolated — two $sp^3$ carbons between the double bonds. (b) Conjugated — one single bond between them. (c) Cumulated — an allene, the double bonds share C2. (d) Conjugated, and polarised: the $\mathrm{C{=}C}$ $\pi$ bond is conjugated with the $\mathrm{C{=}O}$ $\pi$ bond, which is what makes but-2-enal an "$\alpha,\beta$-unsaturated carbonyl compound".
:::
:::

::: exercise Nodes {level=1 check="3"}
How many nodes perpendicular to the $p$-orbital axis does the highest antibonding $\pi$ orbital $\psi_4^{*}$ of buta-1,3-diene have? (Enter the number.)
::: solution
Three. In a linear polyene the $k$-th molecular orbital has $k-1$ nodes: $\psi_1$ none (all in phase), $\psi_2$ one, $\psi_3$ two, $\psi_4^{*}$ three — every adjacent pair out of phase. Nodes cost kinetic energy, which is why they order the levels.
:::
:::

::: exercise Which bond is shorter {level=1}
In buta-1,3-diene, compare the C1–C2 and C2–C3 bond lengths with the $1.54\ \mathrm{\AA}$ of an ethane-type single bond, and say which conformer is more stable.
::: solution
C1–C2 is a true $\pi$ bond at $1.34\ \mathrm{\AA}$. C2–C3 is a single bond with partial double-bond character from conjugation, $1.46\ \mathrm{\AA}$ — shorter than $1.54\ \mathrm{\AA}$ but longer than a double bond. The s-*trans* conformer is more stable by about $4\ \mathrm{kJ\,mol^{-1}}$; the s-*cis* conformer, though less abundant, is the one geometrically set out for ring-forming reactions.
:::
:::

::: exercise Equilibrium composition from the gap {level=2 check="81"}
For the interconversion 1,2-product $\rightarrow$ 1,4-product, $\Delta G^\circ = -3.6\ \mathrm{kJ\,mol^{-1}}$. What percentage of 1,4-product does an equilibrating mixture contain at $25\ \mathrm{^\circ C}$? (Enter the percentage.)
::: solution
$K = e^{-\Delta G^\circ/RT} = e^{3600/(8.314\times298.15)} = e^{1.45} = 4.3$, so the 1,4-fraction is $4.3/(4.3+1) = 0.81$: $81\,\%$. The same small gap that gave 80:20 at $40\ \mathrm{^\circ C}$ gives 81:19 at $25\ \mathrm{^\circ C}$ — the equilibrium ratio of a few $\mathrm{kJ\,mol^{-1}}$ depends only weakly on temperature; it is the *rate* of equilibration, not the ratio, that the thermometer really controls.
:::
:::

::: exercise Predict the products {level=2}
One equivalent of HBr is added to buta-1,3-diene. (a) Draw both products and label each 1,2 or 1,4. (b) Which dominates at $-80\ \mathrm{^\circ C}$? (c) Which dominates after equilibration at $40\ \mathrm{^\circ C}$? (d) Say in one clause why the thermodynamic product has the more stable alkene.
::: solution
(a) 3-Bromobut-1-ene, $\mathrm{CH_3CHBrCH{=}CH_2}$ (1,2) and 1-bromobut-2-ene, $\mathrm{CH_3CH{=}CHCH_2Br}$ (1,4, the $E$ isomer). (b) The 1,2-product, under kinetic control. (c) The 1,4-product, under thermodynamic control. (d) Its double bond carries two carbon substituents against one, and alkyl groups stabilise alkenes by hyperconjugation — the order of alkene stabilities established in [[organic-1/alkenes-alkynes]] is the whole explanation.
:::
:::

::: exercise Kinetic selectivity from barriers {level=2}
For some diene–HX addition the two product-forming steps have $\Delta G^{\ddagger}_{1,2} - \Delta G^{\ddagger}_{1,4} = -2.2\ \mathrm{kJ\,mol^{-1}}$ (the 1,2-pathway is faster) with equal pre-exponential factors. What 1,2:1,4 ratio does kinetic control give at $-80\ \mathrm{^\circ C}$?
::: solution
$\dfrac{k_{1,2}}{k_{1,4}} = e^{-\Delta\Delta G^{\ddagger}/RT} = e^{2200/(8.314\times193.15)} = e^{1.37} = 3.9$, i.e. about 80:20 — the observed ratio. The point of the arithmetic: a barrier difference of $2.2\ \mathrm{kJ\,mol^{-1}}$, less than $kT$ per molecule, already moves the product ratio by a factor of four. Selectivity in solution chemistry lives on very small energies.
:::
:::

::: exercise Finding the crossover {level=3}
Suppose the 1,4-closure has the larger pre-exponential factor, $A_{1,2}/A_{1,4} = 1/3$, while the 1,2-pathway has the lower activation energy, $E_{\mathrm{a},1,4} - E_{\mathrm{a},1,2} = 2.2\ \mathrm{kJ\,mol^{-1}}$. At what temperature do the two rate constants become equal, and which pathway is kinetic below that temperature?
::: solution
Set $A_{1,2}e^{-E_{1,2}/RT} = A_{1,4}e^{-E_{1,4}/RT}$: then $\dfrac{A_{1,2}}{A_{1,4}} = e^{-(E_{1,4}-E_{1,2})/RT}$, so $\ln 3 = \dfrac{2200}{8.314\,T}$ and $T = \dfrac{2200}{8.314\times1.0986} = 241\ \mathrm{K}$, about $-32\ \mathrm{^\circ C}$. Below it the exponential advantage of the lower barrier dominates and the 1,2-pathway is kinetic; above it the exponential factors converge and the larger $A$-factor of the 1,4-closure takes over. Kinetic control can change hands with temperature — one more reason the labels name experiments, not essences.
:::
:::

::: exercise A mechanism, written honestly {level=3 hint="Protonate so as to make the most stable allyl cation; then ask which terminus bears the larger share of positive charge, and which product has the more substituted alkene."}
2-Methylbuta-1,3-diene (isoprene) treated with one equivalent of HBr at $-80\ \mathrm{^\circ C}$ gives mainly 3-bromo-3-methylbut-1-ene, while the product of equilibration is 1-bromo-3-methylbut-2-ene. Explain both selectivities: show the protonation choice, the allyl cation, and the two closures, and say why protonation occurs at C1.
::: solution
Protonation at the terminal C1 of $\mathrm{CH_2{=}C(CH_3){-}CH{=}CH_2}$ puts the charge at C2, tertiary and allylic: $\mathrm{(CH_3)_2\overset{+}{C}{-}CH{=}CH_2 \leftrightarrow (CH_3)_2C{=}CH{-}\overset{+}{C}H_2}$. Any other protonation gives a secondary or primary cation without full allylic delocalisation, so C1 is where the proton goes — the first step chooses *which cation to make*, and it chooses the tertiary allylic one. Closure at C2, the tertiary terminus, is the fast one: that contributor dominates the hybrid, so C2 bears the larger share of positive charge, and the bromide delivered to C1 is still in the ion pair beside C2. The product is the 1,2-adduct 3-bromo-3-methylbut-1-ene, whose alkene is monosubstituted. Closure at C4 gives the 1,4-adduct 1-bromo-3-methylbut-2-ene, whose alkene is trisubstituted and therefore several $\mathrm{kJ\,mol^{-1}}$ lower; on warming, both bromides ionise back through the same cation and the trisubstituted alkene accumulates. Kinetic: tertiary charge plus proximity. Thermodynamic: alkene substitution. One cation, two questions, two answers.
:::
:::
