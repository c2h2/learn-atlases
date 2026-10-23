Ethanol and dimethyl ether share the formula $\mathrm{C_2H_6O}$ and almost nothing else: ethanol boils at $351\,\mathrm{K}$, mixes with water and intoxicates, while dimethyl ether boils at $248\,\mathrm{K}$, a gas that dissolves only sparingly. The difference is connectivity — in ethanol the oxygen carries a hydrogen ($\mathrm{CH_3CH_2{-}OH}$), in dimethyl ether it is wedged between two carbons ($\mathrm{CH_3{-}O{-}CH_3}$). One bond, $\mathrm{O{-}H}$ versus $\mathrm{C{-}O}$, decides boiling point, solubility and reactivity; the reactions that make and break those bonds are this chapter, closing the circle through the strained epoxides.

## Structure, hydrogen bonding and physical properties

::: definition Alcohols, ethers and epoxides {#def-alcohol-ether}
An **alcohol** has a hydroxy group $\mathrm{-OH}$ bonded to an $sp^3$ carbon; according to how many carbons that carbon carries, the alcohol is **primary** ($1^\circ$), **secondary** ($2^\circ$) or **tertiary** ($3^\circ$) — propan-1-ol, propan-2-ol and 2-methylpropan-2-ol are the three classes. An **ether** has an oxygen bonded to two carbons, $\mathrm{R{-}O{-}R'}$; when the oxygen closes a three-membered ring with the two carbons it joins, the compound is an **epoxide** (oxirane), the strained and exceptionally reactive subclass of cyclic ethers. Phenols ($\mathrm{Ar{-}OH}$) are *not* alcohols: the ring changes the chemistry completely, as [[organic-1/acidity-mechanism]] showed.
:::

One intermolecular force dominates. The $\mathrm{O{-}H}$ bond is strongly polarised and its hydrogen small and bare enough to press against a lone pair on a neighbouring oxygen: alcohols **hydrogen-bond** to each other, and a hydrogen bond ($\approx 20\,\mathrm{kJ\,mol^{-1}}$) costs far more to break than the dispersion forces in an alkane or ether of similar mass.

| compound | class | $M\,/\mathrm{g\,mol^{-1}}$ | b.p. / $\mathrm{K}$ |
|---|---|---|---|
| propane | alkane | $44.1$ | $231$ |
| butane | alkane | $58.1$ | $273$ |
| dimethyl ether | ether | $46.1$ | $248$ |
| ethanol | $1^\circ$ alcohol | $46.1$ | $351$ |
| propan-2-ol | $2^\circ$ alcohol | $60.1$ | $356$ |
| propan-1-ol | $1^\circ$ alcohol | $60.1$ | $370$ |
| ethoxyethane (diethyl ether) | ether | $74.1$ | $308$ |
| butan-1-ol | $1^\circ$ alcohol | $74.1$ | $391$ |

::: widget plot
f: 108 + 2.8*x
x: 40, 80
y: 200, 400
points: 44,231; 46,351; 46,248; 58,273; 60,370; 60,356; 72,309; 74,391; 74,308
labels: \text{alkanes}
caption: Boiling points of small alkanes, ethers and alcohols against molar mass; the line is the alkane trend. Alcohols sit $60$–$100\,\mathrm{K}$ above it, hydrogen-bonded throughout the liquid; ethers sit on it, accepting hydrogen bonds but unable to donate them. Branching lowers the alcohols (propan-2-ol below propan-1-ol) by shrinking the dispersion contact area.
:::

The same hydrogen bonding explains solubility: the first three alcohols are miscible with water, and each added $\mathrm{CH_2}$ roughly halves the solubility — butan-1-ol already dissolves only to about $1\,\mathrm{mol\,dm^{-3}}$. Ethers, acceptors but not donors, are superb solvents — the standard media for the organometallic chemistry below.

**Methanol** itself is only mildly toxic; its metabolites are not: alcohol dehydrogenase oxidises it to methanal and then methanoate, which disrupts mitochondrial respiration, the damage concentrated in the optic nerve; the clinical antidote floods the enzyme with competing ethanol. **Ethylene glycol**, $\mathrm{HOCH_2CH_2OH}$, is sweet-tasting and deadly the same way — oxidised to ethanedioic acid, whose calcium salt crystallises in the kidneys. Both carry the GHS skull-and-crossbones acute-toxicity classification.

::: example Rank without a table {#ex-bp-rank}
Rank propan-1-ol, propan-2-ol, ethoxyethane and butane in order of increasing boiling point, and explain the two compounds that cannot hydrogen-bond to themselves.
::: solution
Butane (dispersion only) is lowest at $273\,\mathrm{K}$; ethoxyethane is heavier and polar, so it boils higher at $308\,\mathrm{K}$, yet with no $\mathrm{O{-}H}$ it cannot donate a hydrogen bond, sitting $60$–$80\,\mathrm{K}$ below its isomeric alcohols. Propan-2-ol ($356\,\mathrm{K}$) boils below propan-1-ol ($370\,\mathrm{K}$): the branched chain is rounder, with less surface for dispersion contacts. Order: butane $<$ ethoxyethane $<$ propan-2-ol $<$ propan-1-ol. Donors beat acceptors; within a class branching lowers.
:::
:::

## Acidity of alcohols: alkoxides as reagents

Alcohols are weak acids — weak enough to have been invisible in the substitution chapter, strong enough that their conjugate bases are among the most useful reagents in synthesis. The tabulated ladder (course values):

| acid | $\mathrm{p}K_\mathrm{a}$ | conjugate base |
|---|---|---|
| phenol | $10.0$ | phenoxide |
| water | $15.7$ | hydroxide |
| ethanol | $16$ | ethoxide |
| propan-2-ol | $17$ | isopropoxide |
| 2-methylpropan-2-ol | $18$ | *tert*-butoxide |
| ethyne | $25$ | acetylide |
| hydrogen, $\mathrm{H_2}$ | $35$ | hydride |
| ammonia | $38$ | amide |

::: proposition Alcohols are weak acids; alkoxides are strong bases and good nucleophiles {#prop-alcohol-acidity}
Alcohols deprotonate at $\mathrm{p}K_\mathrm{a} \approx 16$–$18$ — about as acidic as water, weaker than phenol (which wins by resonance). Two consequences of the equilibrium rule. **(1)** No alkoxide survives in water: *tert*-butoxide is protonated by water with $K_\mathrm{eq} = 10^{18 - 15.7} = 2\times10^{2}$, ethoxide with $K_\mathrm{eq} \approx 2$ in the same direction — in water every alkoxide becomes hydroxide. **(2)** To *make* one you need a base whose conjugate acid is far weaker: hydride ($K_\mathrm{eq} = 10^{35 - 16} = 10^{19}$, the $\mathrm{H_2}$ escaping as a gas) or amide ($10^{22}$). The alkoxide is at once a strong base and a good anionic nucleophile — it substitutes primary halides by $\mathrm{S_N2}$ and eliminates from everything else, as [[organic-1/elimination]] prescribes. Bulk sharpens the difference: *tert*-butoxide is a poor nucleophile and a superbly selective base.
:::

::: example The pH of an alkoxide solution {#ex-alkoxide-ph}
Sodium ethoxide, $0.010\,\mathrm{mol\,dm^{-3}}$, is dissolved in water. What is the pH? For ethoxide, $K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a}(\mathrm{ethanol})$.
::: solution
$K_\mathrm{b} = 10^{-14}/10^{-16} = 10^{2}$ — enormous, because ethanol is such a weak acid. Solving $x^{2}/(0.010 - x) = 100$ gives $x = 0.009999\,\mathrm{mol\,dm^{-3}}$: protonation is essentially complete, exactly as proposition [[#prop-alcohol-acidity]] predicted, so $[\mathrm{HO^-}]$ equals the analytical concentration, $\mathrm{pOH} = 2.00$ and $\mathrm{pH} = 12.00$. Sodium ethoxide in water *is* sodium hydroxide, stoichiometrically.
:::
:::

::: example Choosing a base to make ethoxide {#ex-choose-ethoxide}
Decide, with equilibrium constants, whether hydroxide, hydride ($\mathrm{NaH}$), amide ($\mathrm{NaNH_2}$) or acetylide ($\mathrm{HC{\equiv}C^-}$) converts ethanol to ethoxide "to completion" (take that to mean $K_\mathrm{eq} > 10^{3}$).
::: solution
Each reaction is $\mathrm{CH_3CH_2OH + B^- \rightleftharpoons CH_3CH_2O^- + HB}$ with $K_\mathrm{eq} = 10^{\mathrm{p}K_\mathrm{a}(\mathrm{HB}) - 16}$. Hydroxide: $K_\mathrm{eq} = 10^{15.7 - 16} = 0.5$ — a coin-flip, useless for preparation. Hydride: $K_\mathrm{eq} = 10^{35 - 16} = 10^{19}$, and the $\mathrm{H_2}$ bubbles out — the standard choice. Amide: $K_\mathrm{eq} = 10^{38 - 16} = 10^{22}$, overkill but complete. Acetylide: the acid on the left is ethanol ($16$), on the right ethyne ($25$), so $K_\mathrm{eq} = 10^{16 - 25} = 10^{-9}$: acetylide is *destroyed* by ethanol. The equilibrium runs towards the weaker acid.
:::
:::

## Preparing alcohols

Three routes dominate. **Hydration of alkenes** ([[organic-1/alkenes-alkynes]]): aqueous acid adds $\mathrm{H}$ and $\mathrm{OH}$ Markovnikov through a carbocation (rearrangements possible); hydroboration–oxidation adds them anti-Markovnikov, with no cation and no rearrangement. **Reduction of carbonyl compounds**: $\mathrm{NaBH_4}$ and $\mathrm{LiAlH_4}$ deliver hydride to the polarised $\mathrm{C{=}O}$ carbon, and protonation of oxygen gives the alcohol; $\mathrm{NaBH_4}$ is mild, usable in alcohol, and stops at aldehydes and ketones, while $\mathrm{LiAlH_4}$ also reduces esters and acids but is destroyed by water, so it runs in dry ether. **Grignard addition**: $\mathrm{RMgX}$ carries a carbon that behaves as $\mathrm{R^{\delta-}}$ — a carbanion equivalent whose conjugate acid has $\mathrm{p}K_\mathrm{a} \approx 50$; it adds to carbonyl carbons, building a $\mathrm{C{-}C}$ bond (formaldehyde $\rightarrow 1^\circ$, aldehyde $\rightarrow 2^\circ$, ketone $\rightarrow 3^\circ$) and is quenched instantly by any $\mathrm{O{-}H}$ — dry glassware, and alcohols as products, never solvent. The mechanism belongs to [[organic-2/carbonyl-addition]].

::: algorithm Choosing a disconnection to an alcohol {#alg-alcohol-disconnection}
Work backwards in order. **(1) Locate the carbinol carbon** (bearing $\mathrm{OH}$) and classify it $1^\circ$, $2^\circ$ or $3^\circ$. **(2) Try C–C disconnections**: a $3^\circ$ alcohol disconnects up to three ways to ketone + $\mathrm{RMgX}$, a $2^\circ$ to aldehyde + $\mathrm{RMgX}$, a $1^\circ$ to formaldehyde + $\mathrm{RMgX}$; reject any Grignard carrying $\mathrm{-OH}$, $\mathrm{-NH}$, $\mathrm{-SH}$ or a carbonyl group, because those destroy it. **(3) Try reduction**: if replacing a $\mathrm{C{-}H}$ or $\mathrm{C{-}C}$ bond on the carbinol carbon by a $\pi$ bond to O gives a carbonyl compound of the same skeleton, choose $\mathrm{NaBH_4}$ (aldehyde/ketone stage) or $\mathrm{LiAlH_4}$ (ester or acid stage, dry). **(4) Try hydration**: acid catalysis for Markovnikov, hydroboration–oxidation for anti-Markovnikov. **(5) Check the fine print**: rearrangements rule acid-catalysed hydration in or out; Grignard routes need every other group proton-free.
:::

::: example Two disconnections for one alcohol {#ex-grignard-plan}
Propose two Grignard routes to 2-methylbutan-2-ol, $\mathrm{(CH_3)_2C(OH)CH_2CH_3}$, and say why a route from 3-hydroxybutan-2-one plus methylmagnesium bromide would fail.
::: solution
Cleave one of the three groups on the carbinol carbon. **(a)** Cleave an ethyl: propanone + ethylmagnesium bromide, then aqueous work-up. **(b)** Cleave a methyl: butan-2-one + methylmagnesium bromide. Two of the three substituents are identical, so only two distinct pairs exist. The proposed route fails on the fine print: 3-hydroxybutan-2-one carries an $\mathrm{O{-}H}$, and the Grignard reagent — a base whose conjugate acid has $\mathrm{p}K_\mathrm{a} \approx 50$ — is quenched by it ($K_\mathrm{eq} \approx 10^{50-16} = 10^{34}$) far faster than it adds to the carbonyl.
:::
:::

## Turning OH into a leaving group

::: warning Hydroxide does not leave — and "oxidation" is not about oxygen {#warn-oh-leaving}
Three misconceptions this section exists to kill. **(1)** *Alcohols substitute because $\mathrm{OH}$ can leave.* $\mathrm{HO^-}$ sits at the bottom of the leaving-group table of [[organic-1/nucleophilic-substitution]] (conjugate-acid $\mathrm{p}K_\mathrm{a} = 15.7$): it never departs an $sp^3$ carbon on its own. Activate first — protonate so the leaving group is neutral water, or convert to a sulfonate ester whose anion spreads its charge over three oxygens. **(2)** *Tosylation inverts or racemises the carbon.* Neither: $\mathrm{TsCl}$ reacts at oxygen, the $\mathrm{C{-}O}$ bond is never broken, and configuration is retained; the inversion comes later, at the $\mathrm{S_N2}$ step. **(3)** *"Oxidation" means reacting with $\mathrm{O_2}$.* It means losing electron density at carbon — gaining bonds to electronegative atoms or losing $\mathrm{C{-}H}$; the oxidants here are oxygen-free salts like dichromate(VI).
:::

**Protonation and HX.** Concentrated hydrohalic acids convert alcohols to halides: $\mathrm{R{-}OH + HX \rightarrow R{-}X + H_2O}$. Tertiary alcohols go by $\mathrm{S_N1}$ — the free cation means rearrangements and racemisation are possible; primary alcohols go by $\mathrm{S_N2}$, clean and unrearranged. **Sulfonate esters.** *p*-Toluenesulfonyl chloride ($\mathrm{TsCl}$) in pyridine replaces the $\mathrm{O{-}H}$ hydrogen by the sulfonyl group, giving a tosylate $\mathrm{R{-}OTs}$ with the $\mathrm{C{-}O}$ bond and stereocentre untouched — activation with **retention**; nucleophiles then displace the superb tosylate leaving group (conjugate-acid $\mathrm{p}K_\mathrm{a} \approx -3$) by $\mathrm{S_N2}$, with inversion. **$\mathrm{PBr_3}$ and $\mathrm{SOCl_2}$** turn primary and secondary alcohols into bromides and chlorides in one flask, with inversion at carbon in the standard $\mathrm{PBr_3}$ case.

::: example A double-inversion relay {#ex-double-inversion}
(*R*)-Butan-2-ol is treated with $\mathrm{TsCl}$ in pyridine; the isolated intermediate is then stirred with $\mathrm{NaBr}$ in DMF. Give the intermediate and the product, each with its descriptor, and say where inversion did and did not occur.
::: solution
Step 1 touches the oxygen only: the intermediate is (***R***)-butan-2-yl 4-methylbenzenesulfonate — retention at carbon, because the $\mathrm{C{-}O}$ bond never broke. Step 2 is textbook $\mathrm{S_N2}$: bromide attacks C2 from the face opposite the sulfonate, which departs with the bond pair — inversion. The attached bromine inherits priority 1 from the oxygen it replaced, so the descriptor flips with the geometry: the product is (***S***)-2-bromobutane. Retention, then inversion — overall inversion, every step a rule from [[organic-1/nucleophilic-substitution]].
:::
:::

## Oxidation of alcohols

The honest definition of oxidation in organic chemistry is bookkeeping at carbon: count each bond to a more electronegative atom as $+1$ and each bond to hydrogen as $-1$ ($\mathrm{C{-}C}$ bonds count zero). Oxidation raises the number, reduction lowers it, and no $\mathrm{O_2}$ need be near the flask.

::: proposition The oxidation ladder of alcohols {#prop-oxidation-ladder}
Alcohol oxidation removes the $\mathrm{O{-}H}$ proton and, from the carbinol carbon, a $\mathrm{C{-}H}$: **$1^\circ$ alcohols oxidise first to aldehydes and then to carboxylic acids; $2^\circ$ alcohols oxidise to ketones and stop; $3^\circ$ alcohols do not oxidise**, because the carbinol carbon carries no hydrogen to remove. The aldehyde stop-over is a matter of conditions: strong aqueous oxidants such as acidified dichromate(VI) oxidise not the aldehyde itself but its *hydrate*, the gem-diol formed by adding water across the $\mathrm{C{=}O}$, so in water the reaction runs to the acid; anhydrous oxidants such as pyridinium chlorochromate (PCC) never let the hydrate form, and the aldehyde is the isolated product. Each rung is a two-electron oxidation: ethanol's carbinol carbon runs $-1 \rightarrow +1 \rightarrow +3$.
:::

::: example The bookkeeping, worked {#ex-ox-bookkeeping}
Assign the oxidation state of the functionalised carbon in (a) $\mathrm{CH_3CH_2OH}$, $\mathrm{CH_3CHO}$, $\mathrm{CH_3COOH}$; (b) propan-2-ol, propanone; (c) 2-methylpropan-2-ol, and use the numbers to explain why propanone resists further oxidation while ethanal does not.
::: solution
(a) Ethanol's carbinol carbon: one bond to O, two to H: $-1$. Ethanal: two bonds to O, one to H: $+1$. Ethanoic acid: three bonds to O: $+3$. Each rung is $+2$ — a two-electron oxidation. (b) Propan-2-ol: $0$; propanone: $+2$. (c) 2-Methylpropan-2-ol: $+1$, and there is no $\mathrm{C{-}H}$ to lose — the first step of every alcohol oxidation is unavailable, the structural reason tertiary alcohols are inert. Propanone resists one rung higher for the same reason — its carbonyl carbon has no hydrogen either — while ethanal keeps its $\mathrm{C{-}H}$ and climbs on.
:::
:::

## Ethers

::: proposition The Williamson ether synthesis {#prop-williamson}
An ether is assembled by $\mathrm{S_N2}$: an alkoxide $\mathrm{RO^-}$ displaces a halide or sulfonate from a second fragment, $\mathrm{R'{-}X + RO^- \rightarrow R'{-}OR + X^-}$. Because the step is $\mathrm{S_N2}$, the **halide must be methyl or primary** (secondary works slowly and competes with E2; tertiary never works — the alkoxide meets it as a base and the product is the alkene of [[organic-1/elimination]]). The disconnection rule: put the *less hindered* fragment on the halide and the more substituted one on the oxygen. The rival method — acid-catalysed condensation of two primary alcohols — is again $\mathrm{S_N2}$-like and a temperature race: lower favours the ether, higher favours dehydration to the alkene. Ethers are remarkably inert — the standard *solvents* for bases, hydrides and Grignard reagents; only hot concentrated halogen acids cleave them.
:::

::: example Designing a Williamson synthesis {#ex-williamson-design}
How would you prepare (a) 1-methoxybutane and (b) 2-methoxy-2-methylpropane (MTBE, the fuel additive) by the Williamson route? For each, say what goes wrong with the "obvious" alternative disconnection.
::: solution
(a) Both disconnections work here, because both candidate halides are methyl or primary: methoxide + 1-bromobutane, or butoxide + bromomethane; the first is usual because 1-bromobutane is cheap. (b) The obvious disconnection — *tert*-butyl bromide + methoxide — fails completely: tertiary halide plus strong base gives E2, and the product is 2-methylpropene. Reverse it: methyl halide (methyl cannot eliminate) + *tert*-butoxide, $\mathrm{(CH_3)_3CO^- + CH_3I \rightarrow (CH_3)_3C{-}O{-}CH_3}$. The rule of proposition [[#prop-williamson]]: the hindered fragment rides on the oxygen.
:::
:::

::: quiz
You need ethyl propyl ether, $\mathrm{CH_3CH_2CH_2OCH_2CH_3}$, by the Williamson synthesis. Which pair of reagents is best?
- [ ] Propan-2-olate + bromoethane, because secondary alkoxides are the most nucleophilic.
- [x] Ethoxide + 1-bromopropane, because the halide should be the primary (least hindered) fragment and this pairing uses a small nucleophile with an unhindered halide.
- [ ] 1-Bromopropane + ethanol (no base), because the alcohol is a strong enough nucleophile.
- [ ] 2-Bromopropane + sodium ethoxide, because secondary halides are the most reactive in $\mathrm{S_N2}$.
::: solution
Option 2: an anionic nucleophile plus a primary halide is the $\mathrm{S_N2}$ recipe, and it joins exactly the target's two skeletons. Option 1 builds the wrong skeleton — propan-2-olate + bromoethane gives ethyl isopropyl ether. Option 3 fails because neutral ethanol is far too weak a nucleophile. Option 4 combines a secondary halide with a strong base, and E2 wins: propene, not ether — the failure mode of proposition [[#prop-williamson]].
:::
:::

::: history
In 1850 Alexander **Williamson** published the synthesis that bears his name — heating an alkoxide with an alkyl halide — the first hint that substitution at saturated carbon has its own rules; he was correcting Charles **Wurtz**, whose slightly earlier work on ethers (and the sodium coupling of halides that still carries his name) had shown that alkyl groups migrate onto oxygen. In 1859 Wurtz also prepared the first epoxide, ethylene oxide, from ethylene chlorohydrin and base — the same intramolecular closure taught in every course since. A century later ethylene oxide became an industrial giant: oxidised ethylene on silver catalysts feeds the million-tonne manufacture of poly(ethylene glycol) by ring-opening polymerisation, while the gas's direct uses (sterilant, fumigant) were curtailed as its classification as a human carcinogen (IARC Group 1) was established. The modern echo is K. Barry **Sharpless**'s 1980s asymmetric epoxidation of allylic alcohols — making one epoxide enantiomer on purpose — honoured with half of the 2001 Nobel Prize in Chemistry.
:::

::: widget graph
nodes: alkane; alkene; alcohol; halide; ether; epoxide; carbonyl; alkoxide
edges: alkane>halide; alkene>alcohol; halide>alcohol; alcohol>halide; alcohol>alkene; alcohol>ether; halide>ether; alcohol>carbonyl; alcohol>alkoxide; alkoxide>ether; alkene>epoxide; epoxide>alcohol
caption: The functional-group interconversion network of the first course: nodes are classes, directed edges are reactions — alkane$\rightarrow$halide ([[organic-1/radical-reactions]]); alkene$\rightarrow$alcohol (hydration); halide$\rightarrow$alcohol ($\mathrm{S_N2}$ on hydroxide); alcohol$\rightarrow$halide (HX, $\mathrm{PBr_3}$); alcohol$\rightarrow$alkene ([[organic-1/elimination]]); alcohol$\rightarrow$ether and halide$\rightarrow$ether (Williamson); alcohol$\rightarrow$carbonyl (oxidation); alcohol$\rightarrow$alkoxide (NaH); alkene$\rightarrow$epoxide (peracid); epoxide$\rightarrow$alcohol (ring opening).
:::

## Epoxides: strained rings, generous reactivity

::: definition Epoxides and their formation {#def-epoxide}
An **epoxide** (oxirane) is an ether whose oxygen and two carbons form a three-membered ring: the $\mathrm{C{-}O{-}C}$ angle is forced to about $60^\circ$ against a tetrahedral preference of $109.5^\circ$, and the ring strain — tabulated at about $113\,\mathrm{kJ\,mol^{-1}}$ for oxirane itself — is stored driving force released on ring opening. Two standard formations, both from alkenes ([[organic-1/alkenes-alkynes]]). **Peracid epoxidation**: $\mathrm{RCO_3H}$ transfers an O atom to the double bond in one concerted step, both new $\mathrm{C{-}O}$ bonds forming on the same face — *syn* and stereospecific. **Halohydrin closure**: add $\mathrm{X_2}$ with water (halonium ion opened by water at the more substituted carbon, anti), then base — the alkoxide performs an intramolecular $\mathrm{S_N2}$, displacing halide; the two steps net to anti addition of oxygen.
:::

::: proposition Epoxide ring opening: conditions choose the carbon {#prop-epoxide-opening}
Epoxides react with nucleophiles under either regime, and the two give opposite regiochemistry on unsymmetrical epoxides. **Basic conditions** ($\mathrm{Nu^-}$: hydroxide, alkoxide, amine): the nucleophile performs an $\mathrm{S_N2}$ attack at the **less substituted** ring carbon — sterics decide — with inversion at that carbon; the alkoxide product is protonated by the solvent. **Acidic conditions** ($\mathrm{ROH}$ with catalysing strong acid): the epoxide oxygen is protonated first, and the nucleophile attacks the **more substituted** carbon, which bears the greater share of the positive charge in the transition state (partial carbocation character, but no free cation — no rearrangement, and still inversion at the attacked carbon). Water in acid opens the ring to a *trans* (anti) **1,2-diol**.
:::

::: warning Epoxide regiochemistry flips with the conditions {#warn-epoxide-regio}
The single most-missed sign-change in first-course organic chemistry: *the same unsymmetrical epoxide opens at opposite ends depending on whether the solution is basic or acidic.* Under basic conditions the nucleophile is fully formed and sterics rule — it attacks the less hindered carbon, and "the more substituted carbon is more electrophilic" gives the wrong product. Under acidic conditions the nucleophile is neutral and weak, the epoxide is protonated, and electronics rule — the more substituted carbon carries the charge and is attacked, and "less hindered wins" is again wrong. Both regimes share one stereochemical fact: attack comes from the face opposite the $\mathrm{C{-}O}$ bond being broken, so the attacked carbon inverts and the new groups end up *anti*. And epoxides are not "just ethers": diethyl ether survives sodium ethoxide; the strained epoxide reacts, relief of $113\,\mathrm{kJ\,mol^{-1}}$ of strain paying the way.
:::

::: example One epoxide, two products {#ex-epoxide-regio}
Predict the major product of 1,2-epoxybutane with (a) $\mathrm{NaOCH_3}$ in methanol and (b) methanol containing a little sulfuric acid. Name each product and identify the carbon attacked.
::: solution
The epoxide carbons are C1 (the $\mathrm{CH_2}$ end, primary) and C2 (secondary, bearing the ethyl group). **(a)** Basic: methoxide attacks the less hindered C1 by $\mathrm{S_N2}$; the ring oxygen stays on C2 and is protonated by methanol. Product: $\mathrm{CH_3OCH_2CH(OH)CH_2CH_3}$, **1-methoxybutan-2-ol**. **(b)** Acidic: the protonated epoxide puts most of the positive charge on C2; neutral methanol attacks C2, and the ring oxygen ends up as the C1 alcohol. Product: $\mathrm{HOCH_2CH(OCH_3)CH_2CH_3}$, **2-methoxybutan-1-ol**. Same atoms, opposite connectivity — the flip of warning [[#warn-epoxide-regio]] — and in both cases the nucleophile arrived anti to the departing $\mathrm{C{-}O}$ bond.
:::
:::

One safety note: the simplest epoxide is also the most dangerous. Ethylene oxide boils at $284\,\mathrm{K}$ — a gas at room temperature — is extremely flammable, and is classified as a human carcinogen (IARC Group 1) and a mutagen, its alkylating reactivity being exactly the ring-opening chemistry above performed on DNA. Use is confined to closed systems; the larger epoxides here are volatile flammable liquids handled in a fume cupboard.

## Where this leads

This chapter is where the first course's chapters meet: the alkenes of [[organic-1/alkenes-alkynes]] feed alcohols in, [[organic-1/elimination]] takes them back out, and the machinery of [[organic-1/nucleophilic-substitution]] runs every interconversion between. The reductions and Grignard additions promised here are dissected in [[organic-2/carbonyl-addition]], the acid terminus of the oxidation ladder becomes its own chemistry in [[organic-2/carboxylic-derivatives]], and amine analogues return throughout [[organic-2/amines]]. Synthesis problems from here are walks on the interconversion graph.

::: summary
- Alcohols are $1^\circ/2^\circ/3^\circ$ by the carbinol carbon; ethers join two carbons through oxygen; epoxides are strained cyclic ethers ($\approx 113\,\mathrm{kJ\,mol^{-1}}$). Ethanol ($351\,\mathrm{K}$) and dimethyl ether ($248\,\mathrm{K}$) are $\mathrm{C_2H_6O}$ isomers $103\,\mathrm{K}$ apart because only alcohols donate hydrogen bonds.
- Alcohols deprotonate near $\mathrm{p}K_\mathrm{a} = 16$–$18$; alkoxides are strong bases and good nucleophiles, cannot survive in water, and are made with $\mathrm{NaH}$ ($K_\mathrm{eq} = 10^{19}$, $\mathrm{H_2}$ escapes) or amide bases.
- Alcohols come from alkene hydration (Markovnikov via cation, anti-Markovnikov by hydroboration), carbonyl reduction ($\mathrm{NaBH_4}$ mild, $\mathrm{LiAlH_4}$ water-sensitive) and Grignard addition, which builds $\mathrm{C{-}C}$ bonds but is destroyed by any $\mathrm{O{-}H}$.
- $\mathrm{HO^-}$ never leaves an $sp^3$ carbon: activate by protonation ($\mathrm{S_N1}$ for $3^\circ$ with rearrangement risk, $\mathrm{S_N2}$ for $1^\circ$) or by sulfonate-ester formation — tosylation occurs with retention at carbon, and the subsequent $\mathrm{S_N2}$ displacement inverts.
- Oxidation is C–H/O bookkeeping: $1^\circ \rightarrow$ aldehyde $\rightarrow$ acid (aqueous strong oxidants run through the hydrate; anhydrous PCC stops at the aldehyde), $2^\circ \rightarrow$ ketone, $3^\circ$ inert for want of a carbinol $\mathrm{C{-}H}$.
- Williamson ether synthesis is $\mathrm{S_N2}$: alkoxide plus methyl or primary halide, never tertiary (E2 wins); acid-catalysed condensation of primary alcohols competes with alkene formation on temperature.
- Epoxides open at the less substituted carbon under basic conditions and the more substituted under acidic (partial cation character), always with anti addition; hydrolysis gives anti 1,2-diols.
- Hazards at class level: methanol and ethylene glycol are toxic through their oxidation metabolites (methanoate; ethanedioate); ethylene oxide is a flammable, carcinogenic gas — closed systems only.
:::

## Exercises

::: exercise Ether isomers {level=1 check="3"}
How many acyclic ether constitutional isomers have the molecular formula $\mathrm{C_4H_{10}O}$? (Enter the number.)
::: solution
Three: 1-methoxypropane, 2-methoxypropane and ethoxyethane. Split the four carbons across the oxygen as $1+3$ (straight or branched propyl) or $2+2$: three ethers; the rest of the $\mathrm{C_4H_{10}O}$ isomers are alcohols.
:::
:::

::: exercise pH of a tert-butoxide solution {level=1 check="12"}
Sodium *tert*-butoxide, $0.010\,\mathrm{mol\,dm^{-3}}$, is dissolved in water. Given $\mathrm{p}K_\mathrm{a}$(2-methylpropan-2-ol) $= 18$, what is the pH? (Enter the pH.)
::: solution
$K_\mathrm{b} = 10^{-14}/10^{-18} = 10^{4}$: protonation by water is complete, $[\mathrm{HO^-}] = 0.010\,\mathrm{mol\,dm^{-3}}$ and $\mathrm{pH} = 12.00$ — the same answer as for ethoxide (example [[#ex-alkoxide-ph]]): any base stronger than hydroxide is levelled to hydroxide by water.
:::
:::

::: exercise Oxidation-state step {level=1 check="2"}
What is the change in oxidation state of the functionalised carbon when propan-2-ol is oxidised to propanone? (Enter the number of electrons lost, a positive integer.)
::: solution
Propan-2-ol's carbinol carbon: one bond to O, one to H $\rightarrow 0$. Propanone: two bonds to O $\rightarrow +2$. The change is $+2$: every alcohol $\rightarrow$ carbonyl step is a two-electron oxidation, matching the ladder of example [[#ex-ox-bookkeeping]].
:::
:::

::: exercise Hydroxide versus ethanol {level=2 check="0.5"}
Use the equilibrium rule to compute $K_\mathrm{eq}$ for $\mathrm{CH_3CH_2OH + NaOH \rightleftharpoons CH_3CH_2O^-\,Na^+ + H_2O}$, with $\mathrm{p}K_\mathrm{a}$ values $16$ (ethanol) and $15.7$ (water). (Enter $K_\mathrm{eq}$.)
::: solution
$K_\mathrm{eq} = 10^{15.7 - 16} = 10^{-0.3} = 0.5$. The equilibrium sits on the side of the *weaker acid* — ethanol is the weaker acid, so hydroxide leaves most of it protonated. A $0.5$ is not a preparation; this is why $\mathrm{NaH}$, not $\mathrm{NaOH}$, is the bottle you reach for.
:::
:::

::: exercise Alkoxide in water, quantitatively {level=2 check="200"}
Compute $K_\mathrm{eq}$ for $\mathrm{(CH_3)_3CO^- + H_2O \rightleftharpoons (CH_3)_3COH + HO^-}$ with $\mathrm{p}K_\mathrm{a}$ values $18$ (2-methylpropan-2-ol) and $15.7$ (water). What does the number say about "potassium *tert*-butoxide in water"? (Enter $K_\mathrm{eq}$.)
::: solution
$K_\mathrm{eq} = 10^{18 - 15.7} = 10^{2.3} = 2\times10^{2}$. Two hundred-fold in favour of hydroxide: potassium *tert*-butoxide cannot exist in water as such — the solution is potassium hydroxide plus *tert*-butanol — alkoxide chemistry is alkoxide-*in-alcohol* chemistry.
:::
:::

::: exercise Predict the products {level=2}
Give the major organic product: (a) 1-bromobutane + sodium methoxide in methanol; (b) 2-bromo-2-methylpropane + sodium methoxide in methanol; (c) but-1-ene, 1. $\mathrm{RCO_3H}$, 2. aqueous acid.
::: solution
(a) Methyl butyl ether, $\mathrm{CH_3OCH_2CH_2CH_2CH_3}$: primary halide + strong nucleophile = Williamson $\mathrm{S_N2}$. (b) 2-Methylpropene: tertiary halide + strong base = E2, exactly the failure mode of proposition [[#prop-williamson]]. (c) Butane-1,2-diol: peracid gives 1,2-epoxybutane (syn O transfer), aqueous acid hydrolyses it to the *anti* 1,2-diol; for a terminal epoxide the two regimes of warning [[#warn-epoxide-regio]] converge on the same diol.
:::
:::

::: exercise Hydride arithmetic {level=3}
For $\mathrm{CH_3CH_2OH + NaH \rightarrow CH_3CH_2O^-Na^+ + H_2}$ take $\mathrm{p}K_\mathrm{a}(\mathrm{H_2}) = 35$, $\mathrm{p}K_\mathrm{a}(\mathrm{ethanol}) = 16$ at $298\ \mathrm{K}$. Compute $K_\mathrm{eq}$ and $\Delta_\mathrm{r}G^\circ$, and explain precisely what the escaping $\mathrm{H_2}$ adds to what the equilibrium number already says.
::: solution
$K_\mathrm{eq} = 10^{35 - 16} = 10^{19}$. With $R = 8.314\ \mathrm{J\,mol^{-1}\,K^{-1}}$: $\Delta_\mathrm{r}G^\circ = -RT\ln K_\mathrm{eq} = -8.314 \times 298 \times 19 \times 2.303 = -1.08\times10^{5}\ \mathrm{J\,mol^{-1}} \approx -108\ \mathrm{kJ\,mol^{-1}}$. That number describes a *closed* vessel at equilibrium. The gas changes the bookkeeping: $\mathrm{H_2}$ leaves the solution as bubbles, the reverse reaction never finds its partner, and the conversion runs to completion in practice — Le Chatelier in its open-system form.
:::
:::

::: exercise Three products from one alkene {level=3}
Starting from but-1-ene and any inorganic or one-carbon reagents, propose syntheses of (a) butane-1,2-diol, (b) 1-methoxybutan-2-ol and (c) 2-methoxybutan-1-ol. Justify each regiochemical outcome.
::: solution
Common first step: but-1-ene + $\mathrm{RCO_3H}$ $\rightarrow$ 1,2-epoxybutane (concerted syn O transfer; the halohydrin route — $\mathrm{Br_2/H_2O}$ then base — also works). **(a)** Aqueous acid (or base): ring opening by water then protonation gives butane-1,2-diol; with a terminal epoxide both regimes deliver the same diol. **(b)** $\mathrm{NaOCH_3/CH_3OH}$: basic $\mathrm{S_N2}$ at the less hindered C1 — 1-methoxybutan-2-ol. **(c)** $\mathrm{CH_3OH}$ with catalysing acid: protonated epoxide, attack at the more substituted C2 — 2-methoxybutan-1-ol. The pair (b)/(c) is the regiochemical flip of proposition [[#prop-epoxide-opening]] on one substrate; both products form with anti stereochemistry at the attacked carbon.
:::
:::
