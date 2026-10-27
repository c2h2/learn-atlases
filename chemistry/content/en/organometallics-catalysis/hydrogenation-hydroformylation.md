Adding hydrogen to a carbon–carbon double bond is one of the most exergonic simple reactions in organic chemistry — for ethene, $\Delta_\mathrm{r}G^\circ \approx -100\ \mathrm{kJ\,mol^{-1}}$ — and yet a mixture of ethene and hydrogen can be kept for years without reacting. The two molecules have nothing to say to each other: $\mathrm{H_2}$ has no lone pair and no low-lying empty orbital, and its direct, concerted addition to an alkene is forbidden by orbital symmetry. A transition metal changes the conversation. It can take $\mathrm{H_2}$ apart by oxidative addition, hold the alkene alongside, and stitch the pieces together by insertion and reductive elimination, then let go and start again. That sequence — a **catalytic cycle** — is the subject of this chapter.

We use two of the most studied cycles in chemistry. **Hydrogenation** with Wilkinson's catalyst, $\mathrm{[RhCl(PPh_3)_3]}$, taught chemists how to read a cycle from kinetics, and its chiral descendants made single-enantiomer drugs by the tonne and won the 2001 Nobel Prize. **Hydroformylation**, the addition of $\mathrm{H_2}$ and CO across an alkene to make aldehydes, is one of the largest homogeneous catalytic processes in industry. Both are assembled from the elementary steps of [[organometallics-catalysis/elementary-reactions]], and both are analysed with the rate-law machinery of [[kinetics/homogeneous-catalysis]].

## What a catalytic cycle is

::: definition Catalytic cycle, resting state, turnover number and frequency {#def-cycle}
A **catalytic cycle** is a closed sequence of elementary steps in which the catalyst (or a **precatalyst**-derived active species) is consumed in one step and regenerated in a later one, while substrates enter and products leave. The **resting state** is the catalyst-containing species present in highest concentration during turnover — usually the species *before* the highest barrier of the cycle. The **turnover number** (TON) is the number of moles of product formed per mole of catalyst before the catalyst is deactivated (or in a stated experiment); the **turnover frequency** (TOF) is the number of turnovers per unit time, $\mathrm{TOF} = v/[\mathrm{Cat}]_0$, usually quoted in $\mathrm{s^{-1}}$ or $\mathrm{h^{-1}}$ at stated conditions and conversion. A *precatalyst* is the compound added to the flask; it may need to lose a ligand, be reduced or be activated before it enters the cycle.
:::

Three rules make a proposed cycle believable. Every intermediate should have a sensible electron count — 16 or 18 for late metals, by Tolman's rule ([[organometallics-catalysis/organometallic-bonding#prop-16-18]]). Each step should be one of the known elementary steps, with the counts changing as [[organometallics-catalysis/elementary-reactions#prop-step-counts]] requires. And the cycle should explain the observed rate law, selectivity and isotope labelling. A cycle is a hypothesis, tested by kinetics and spectroscopy; the drawing is not the evidence.

::: example Turnover number and frequency {#ex-ton}
A hydrogenation of $0.250\ \mathrm{mol}$ of an alkene uses $25.0\ \mu\mathrm{mol}$ of a rhodium catalyst ($0.0100\ \mathrm{mol\,\%}$) and reaches full conversion in $2.00\ \mathrm{h}$. Find the TON and the average TOF in $\mathrm{h^{-1}}$ and $\mathrm{s^{-1}}$.
::: solution
$\mathrm{TON} = 0.250\ \mathrm{mol}/25.0\times10^{-6}\ \mathrm{mol} = 1.00\times10^{4}$. The average TOF is
$$
\mathrm{TOF} = \frac{1.00\times10^{4}}{2.00\ \mathrm{h}} = 5.00\times10^{3}\ \mathrm{h^{-1}} = \frac{5.00\times10^{3}}{3600\ \mathrm{s\,h^{-1}}} = 1.39\ \mathrm{s^{-1}}.
$$
Two caveats. The TON here is a *lower bound* on the catalyst's lifetime: the catalyst ran out of substrate, not of activity. And an average TOF over a whole run mixes fast early turnover with slower turnover as substrate is depleted; reported TOFs should be initial rates or should state the conversion at which they were measured.
:::
:::

## Wilkinson's catalyst

Chlorotris(triphenylphosphine)rhodium(I), $\mathrm{[RhCl(PPh_3)_3]}$, reported by Geoffrey Wilkinson's group in 1965–66, hydrogenates unhindered alkenes at room temperature and $1\ \mathrm{bar}$ of $\mathrm{H_2}$, leaving ketones, esters, nitriles and nitro groups untouched. It is a 16-electron square-planar Rh(I), $d^8$ complex ($9 + 6 + 1 = 16$). Jack Halpern's kinetic and spectroscopic studies in the 1970s showed that most of the hydrogenation flux does not pass through this complex at all, but through the far more reactive three-coordinate fragment formed by losing a phosphine.

The dominant cycle, in words, is as follows. Each step is labelled with its type and its count changes.

1. **Ligand dissociation.** $\mathrm{[RhCl(PPh_3)_3]}$ loses one $\mathrm{PPh_3}$ to give the 14-electron $\mathrm{[RhCl(PPh_3)_2]}$ (in solution probably weakly solvated). This step lies off the main cycle but controls how much of the rhodium is active.
2. **Oxidative addition of $\mathrm{H_2}$.** The concerted three-centre addition of $\mathrm{H_2}$ gives the *cis*-dihydride $\mathrm{[RhH_2Cl(PPh_3)_2]}$, Rh(III), $d^6$, 16 electrons. (OA to the 14-electron species is around $10^4$ times faster than to the parent 16-electron complex.)
3. **Alkene coordination.** The alkene binds at the vacant site cis to a hydride: $\mathrm{[RhH_2Cl(PPh_3)_2(alkene)]}$, 18 electrons.
4. **Migratory insertion (rate-determining).** The alkene inserts into a Rh–H bond, syn, giving an alkyl hydride $\mathrm{[RhH(alkyl)Cl(PPh_3)_2]}$, 16 electrons.
5. **Reductive elimination.** The alkyl and the remaining cis hydride couple to release the alkane and regenerate $\mathrm{[RhCl(PPh_3)_2]}$ (14 electrons), which re-enters at step 2.

Because both hydrogens are delivered from the metal to the same face of the alkene, the overall addition is **syn**: $\mathrm{D_2}$ adds to (*Z*)-but-2-ene to give *meso*-2,3-dideuteriobutane, and to (*E*)-but-2-ene to give the racemic *dl* pair. The catalyst is selective for less hindered alkenes (terminal > cis-disubstituted > trisubstituted) because the alkene must squeeze into a site flanked by two triphenylphosphines.

::: widget graph
nodes: RhClL3@0,2; RhClL2@2,3; H2RhClL2@4,2; H2RhClL2(alkene)@4,0; HRh(alkyl)ClL2@2,-1
edges: RhClL3>RhClL2; RhClL2>RhClL3; RhClL2>H2RhClL2:2; H2RhClL2>H2RhClL2(alkene):3; H2RhClL2(alkene)>HRh(alkyl)ClL2:4; HRh(alkyl)ClL2>RhClL2:5
algorithm: none
caption: The main hydrogenation cycle of Wilkinson's catalyst ($\mathrm{L = PPh_3}$), drawn as a directed reaction network. Edge weights are the step numbers in the text: 2 oxidative addition of $\mathrm{H_2}$, 3 alkene coordination, 4 migratory insertion (rate-determining), 5 reductive elimination of the alkane. The two-way link to $\mathrm{RhClL_3}$ is the phosphine dissociation equilibrium that sits outside the cycle and sets how much rhodium is in it; free phosphine pulls rhodium out of the cycle and slows the reaction. Electron counts round the cycle: 14, 16, 18, 16, 14 — every intermediate is unsaturated except the alkene–dihydride, which is where the slow step begins.
:::

### The rate law of a cycle with a dormant reservoir

::: proposition Rate law for a cycle fed by ligand dissociation {#prop-wilkinson-rate}
Suppose the precatalyst $\mathrm{CatL}$ is the resting state, in rapid equilibrium with the active species $\mathrm{Cat}$ by ligand loss, $\mathrm{CatL \rightleftharpoons Cat + L}$ ($K_\mathrm{d} = [\mathrm{Cat}][\mathrm{L}]/[\mathrm{CatL}]$); that $\mathrm{Cat}$ binds $\mathrm{H_2}$ and alkene S in further rapid pre-equilibria with constants $K_\mathrm{H}$ and $K_\mathrm{S}$ to form $\mathrm{CatH_2S}$; and that $\mathrm{CatH_2S}$ reacts in a rate-determining step with rate constant $k$, followed by fast steps that regenerate $\mathrm{Cat}$. If $\mathrm{CatL}$ holds nearly all the catalyst, the rate is
$$
v = \frac{k\,K_\mathrm{d}K_\mathrm{H}K_\mathrm{S}\,[\mathrm{Cat}]_0\,[\mathrm{H_2}][\mathrm{S}]}{[\mathrm{L}]}.
$$ {#eq-wilkinson-rate}
The reaction is first order in catalyst, in $\mathrm{H_2}$ and in alkene, and **inverse first order** in free ligand.
:::

::: proof
The pre-equilibria give $[\mathrm{Cat}] = K_\mathrm{d}[\mathrm{CatL}]/[\mathrm{L}]$ and $[\mathrm{CatH_2S}] = K_\mathrm{H}K_\mathrm{S}[\mathrm{Cat}][\mathrm{H_2}][\mathrm{S}]$. Catalyst conservation is $[\mathrm{Cat}]_0 = [\mathrm{CatL}] + [\mathrm{Cat}] + [\mathrm{CatH_2}] + [\mathrm{CatH_2S}] + \dots \approx [\mathrm{CatL}]$ when $\mathrm{CatL}$ is the resting state. Then
$$
v = k[\mathrm{CatH_2S}] = kK_\mathrm{H}K_\mathrm{S}\frac{K_\mathrm{d}[\mathrm{Cat}]_0}{[\mathrm{L}]}[\mathrm{H_2}][\mathrm{S}],
$$
which is [[#eq-wilkinson-rate]]. If any other species becomes comparable in concentration with $\mathrm{CatL}$ (for example at high $[\mathrm{H_2}]$, when the dihydride accumulates), the conservation sum acquires extra terms and the rate saturates; the general form is $v = k[\mathrm{Cat}]_0 \times (\text{fraction of catalyst in } \mathrm{CatH_2S})$, exactly as in the Michaelis–Menten algorithm of [[kinetics/homogeneous-catalysis]]. The derivation assumes all steps before the rate-determining one are fast and reversible. $\blacksquare$
:::

::: warning The complex you add is not the catalyst {#warn-precatalyst}
It is natural to draw a catalytic cycle starting from the compound in the bottle. For Wilkinson's catalyst, and for most phosphine-based catalysts, that compound is a **precatalyst** and a **reservoir**: it holds most of the metal in an inactive form and releases small amounts of the true catalyst. The species seen by NMR during a reaction is usually the resting state, not the species that turns over fastest — Halpern showed that the intermediates actually on the main cycle of Wilkinson hydrogenation are present at concentrations too low to observe. Conversely, a species that *can* be isolated and *does* hydrogenate may contribute almost nothing to the observed rate. Kinetics (orders in ligand and substrate) and independent rate measurements of each step are needed to identify the cycle; spectroscopy alone identifies only what accumulates.
:::

Thermodynamically, hydrogenation is strongly favourable. From NIST standard enthalpies of formation ($\Delta_\mathrm{f}H^\circ$: ethene $+52.4$, ethane $-84.0\ \mathrm{kJ\,mol^{-1}}$) and standard entropies ($S^\circ$: ethene $219.3$, ethane $229.1$, $\mathrm{H_2}$ $130.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$), $\Delta_\mathrm{r}H^\circ = -136.4\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = -120.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for $\mathrm{C_2H_4(g) + H_2(g) \rightarrow C_2H_6(g)}$, so $\Delta_\mathrm{r}G^\circ = -100.4\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$. The equilibrium lies far to the right until about $\Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ \approx 1130\ \mathrm{K}$, above which dehydrogenation takes over — the basis of steam cracking ([[green-chemistry/petrochemicals]]). The catalyst changes only the rate.

## Asymmetric hydrogenation

If the phosphines around rhodium are chiral, the two faces of a prochiral alkene are no longer equivalent, and hydrogenation can make one enantiomer selectively. William Knowles at Monsanto and Leopold Horner reported the first such rhodium catalysts in 1968, with modest selectivity; Henri Kagan's chelating diphosphine DIOP (1971) and Knowles's $P$-chiral DIPAMP (1970s) raised it to around $95\,\%$ ee for dehydroamino acids, and Monsanto used DIPAMP–rhodium to manufacture L-DOPA, a drug for Parkinson's disease. Ryoji Noyori's BINAP–ruthenium catalysts (1980s) extended asymmetric hydrogenation to a broad range of alkenes and ketones.

::: proposition Enantiomeric excess and the difference in activation energies {#prop-ee}
If the two enantiomeric products R and S are formed irreversibly by competing pathways from a common pool of rapidly interconverting intermediates (the Curtin–Hammett situation), with Gibbs energies of the two rate-determining transition states differing by $\Delta\Delta G^\ddagger = G^\ddagger_\mathrm{S} - G^\ddagger_\mathrm{R}$, then the enantiomeric ratio and excess are
$$
\mathrm{er} = \frac{[\mathrm{R}]}{[\mathrm{S}]} = e^{\Delta\Delta G^\ddagger/RT}, \qquad
\mathrm{ee} = \frac{[\mathrm{R}] - [\mathrm{S}]}{[\mathrm{R}] + [\mathrm{S}]} = \tanh\!\left(\frac{\Delta\Delta G^\ddagger}{2RT}\right).
$$ {#eq-ee}
The ratio depends only on the transition-state energy difference, not on the relative populations of the intermediates.
:::

::: proof
Let the two intermediates $\mathrm{I_R}$ and $\mathrm{I_S}$ interconvert rapidly with equilibrium constant $K = [\mathrm{I_S}]/[\mathrm{I_R}] = e^{-(G_\mathrm{S} - G_\mathrm{R})/RT}$, and react with rate constants $k_\mathrm{R} \propto e^{-(G^\ddagger_\mathrm{R} - G_\mathrm{R})/RT}$ and $k_\mathrm{S} \propto e^{-(G^\ddagger_\mathrm{S} - G_\mathrm{S})/RT}$ (Eyring, with identical prefactors). The product ratio is the ratio of rates,
$$
\frac{[\mathrm{R}]}{[\mathrm{S}]} = \frac{k_\mathrm{R}[\mathrm{I_R}]}{k_\mathrm{S}[\mathrm{I_S}]} = \frac{k_\mathrm{R}}{k_\mathrm{S}K} = \exp\!\left[\frac{-(G^\ddagger_\mathrm{R} - G_\mathrm{R}) + (G^\ddagger_\mathrm{S} - G_\mathrm{S}) - (G_\mathrm{R} - G_\mathrm{S})}{RT}\right] = e^{(G^\ddagger_\mathrm{S} - G^\ddagger_\mathrm{R})/RT}.
$$
The ground-state energies cancel. For the excess, write $\mathrm{er} = e^{2u}$ with $u = \Delta\Delta G^\ddagger/2RT$: $\mathrm{ee} = (\mathrm{er} - 1)/(\mathrm{er} + 1) = (e^{u} - e^{-u})/(e^{u} + e^{-u}) = \tanh u$. $\blacksquare$
:::

::: widget plot
f: 100*tanh(1000*x/(2*8.314*T))
x: 0, 20
y: 0, 100
sliders: T=298:200:400:1
labels: \text{ee}\,/\,\%
caption: Enantiomeric excess (per cent) against $\Delta\Delta G^\ddagger$ (in $\mathrm{kJ\,mol^{-1}}$), [[#eq-ee]], with the temperature on the slider. At $298\ \mathrm{K}$, $95\,\%$ ee needs $9.1\ \mathrm{kJ\,mol^{-1}}$ and $99\,\%$ ee needs $13.1\ \mathrm{kJ\,mol^{-1}}$ — the energy of a single weak hydrogen bond separates a mediocre catalyst from an excellent one. Raise the temperature and the curve flattens: the same $\Delta\Delta G^\ddagger$ gives less selectivity, which is why asymmetric reactions are often run cold, at the cost of rate.
:::

::: example What does 95 % ee cost? {#ex-ee}
An asymmetric hydrogenation gives $95.0\,\%$ ee at $25\,^\circ\mathrm{C}$. Find the enantiomeric ratio and $\Delta\Delta G^\ddagger$, and predict the ee at $100\,^\circ\mathrm{C}$ if $\Delta\Delta G^\ddagger$ is unchanged.
::: solution
$\mathrm{er} = (1 + 0.950)/(1 - 0.950) = 39.0$, i.e. $97.5 : 2.5$. Then
$$
\Delta\Delta G^\ddagger = RT\ln \mathrm{er} = (8.314)(298.15)\ln 39.0\ \mathrm{J\,mol^{-1}} = 9.08\ \mathrm{kJ\,mol^{-1}}.
$$
At $373.15\ \mathrm{K}$: $\mathrm{ee} = \tanh\big(9080/(2 \times 8.314 \times 373.15)\big) = \tanh(1.463) = 0.898$, i.e. about $90\,\%$ ee (er $\approx 18.7$). (In reality $\Delta\Delta G^\ddagger$ has enthalpic and entropic parts and need not be temperature-independent; the estimate shows the direction and size of the effect.)
:::
:::

The mechanism behind Knowles's selectivity held a surprise. With a chelating diphosphine, the prochiral enamide substrate — such as methyl (*Z*)-2-acetamidocinnamate — binds to the cationic rhodium through both its C=C bond and its amide oxygen, and it can do so with either face of the alkene, giving two diastereomeric catalyst–substrate adducts. Halpern and Clark Landis showed (1980s) that the **major** adduct, the one seen by NMR and in crystal structures, reacts with $\mathrm{H_2}$ hundreds of times more slowly than the **minor** one, and that the product comes overwhelmingly from the minor adduct. This "anti-lock-and-key" behaviour is exactly what [[#prop-ee]] permits: selectivity is decided at the transition states, not at the intermediates you can see.

::: example The minor diastereomer wins {#ex-anti-lock-key}
In an asymmetric hydrogenation the two diastereomeric catalyst–enamide adducts interconvert rapidly; the major one is $10$ times more abundant, but the minor one reacts with $\mathrm{H_2}$ $600$ times faster (illustrative values of the size Landis and Halpern measured). Which adduct gives the main product, and what is the ee?
::: solution
The rate of product formation from each adduct is its rate constant times its concentration. Taking the minor adduct's concentration as $1$ and the major's as $10$, with the major's rate constant as $1$ and the minor's as $600$: rate from minor $= 600 \times 1 = 600$, rate from major $= 1 \times 10 = 10$. The product ratio is $600 : 10 = 60 : 1$ in favour of the enantiomer derived from the **minor** adduct, and
$$
\mathrm{ee} = \frac{60 - 1}{60 + 1} = 0.967 = 96.7\,\%.
$$
The enantiomer you would have predicted from the dominant, observable complex is the minor product. Any attempt to rationalise selectivity from the structure of the resting state alone would get the answer backwards.
:::
:::

## Hydroformylation

Hydroformylation (the **oxo process**) adds $\mathrm{H}$ and $\mathrm{CHO}$ across an alkene:
$$
\mathrm{RCH{=}CH_2 + CO + H_2 \rightarrow RCH_2CH_2CHO\ (\text{linear}, n) \ \ \text{or}\ \ RCH(CHO)CH_3\ (\text{branched}, iso)}.
$$
Otto Roelen discovered it at Ruhrchemie in 1938 using cobalt catalysts, and its products — above all butanal from propene, hydrogenated to butanol or condensed to 2-ethylhexanol for plasticisers — are made at more than ten million tonnes a year. Every atom of the reactants ends up in the product: the atom economy is $100\,\%$ ([[green-chemistry/green-metrics]]). The industrial problem is **regioselectivity**: the linear aldehyde is usually wanted.

The cobalt cycle, proposed by Richard Heck and David Breslow in 1961, uses $\mathrm{[HCo(CO)_4]}$ (18 electrons) formed from $\mathrm{[Co_2(CO)_8]}$ and $\mathrm{H_2}$. In words:

1. **CO dissociation** from $\mathrm{[HCo(CO)_4]}$ gives the 16-electron $\mathrm{[HCo(CO)_3]}$.
2. **Alkene coordination** gives $\mathrm{[HCo(CO)_3(alkene)]}$ (18).
3. **1,2-Insertion** of the alkene into Co–H gives an alkyl, $\mathrm{[Co(CH_2CH_2R)(CO)_3]}$ (16); cobalt on the terminal carbon leads to the linear product, cobalt on the internal carbon to the branched one.
4. **CO coordination** (18), then **1,1-insertion** of CO into the Co–alkyl bond (alkyl migration) gives an acyl, $\mathrm{[Co\{C(O)CH_2CH_2R\}(CO)_3]}$ (16).
5. **Oxidative addition of $\mathrm{H_2}$** (Co(I) → Co(III), 18) — or, at high pressure, reaction with a second $\mathrm{[HCo(CO)_4]}$ — and **reductive elimination** of the aldehyde regenerate $\mathrm{[HCo(CO)_3]}$.

Cobalt needs high pressures (around $200$–$300\ \mathrm{bar}$) and temperatures ($110$–$180\,^\circ\mathrm{C}$) to keep $\mathrm{[HCo(CO)_4]}$ from decomposing, and gives linear : branched ratios of only about $3$–$4 : 1$. Wilkinson's group showed in the late 1960s that $\mathrm{[RhH(CO)(PPh_3)_3]}$ is far more active, working at a few bar and around $100\,^\circ\mathrm{C}$, and with a large excess of $\mathrm{PPh_3}$ it gives linear : branched ratios above $10 : 1$; this "low-pressure oxo" process was commercialised by Union Carbide, Davy and Johnson Matthey in 1976. In 1984 Ruhrchemie and Rhône-Poulenc introduced a version with the water-soluble sulfonated phosphine TPPTS, $\mathrm{P(C_6H_4SO_3Na\text{-}3)_3}$: the catalyst stays in water, the butanal forms a separate organic layer, and the rhodium is recovered by simply separating the phases.

::: example Selectivity as an energy difference {#ex-lb}
A rhodium–diphosphine catalyst gives a linear : branched aldehyde ratio of $19 : 1$ ($95\,\%$ linear) at $120\,^\circ\mathrm{C}$. Assuming the regiochemistry is fixed irreversibly at the alkene insertion step from a common alkene complex, what is $\Delta\Delta G^\ddagger$ between the two insertion transition states?
::: solution
The same Curtin–Hammett reasoning as [[#prop-ee]] applies to regioisomers: $\Delta\Delta G^\ddagger = RT\ln(19)$ with $T = 393.15\ \mathrm{K}$:
$$
\Delta\Delta G^\ddagger = (8.314)(393.15)(2.944)\ \mathrm{J\,mol^{-1}} = 9.62\ \mathrm{kJ\,mol^{-1}}.
$$
The linear insertion is favoured by about $10\ \mathrm{kJ\,mol^{-1}}$, a steric effect: in the transition state for the branched alkyl, the alkene substituent is pushed towards the bulky phosphines. (The assumption is not always safe: if β-hydride elimination returns the branched alkyl to the alkene faster than CO inserts, the regiochemistry is set later in the cycle, and the selectivity also depends on CO pressure.)
:::
:::

Ligands control both rate and selectivity, in ways the elementary steps explain. **Excess phosphine** pushes the equilibrium $\mathrm{[RhH(CO)(PPh_3)_3] \rightleftharpoons [RhH(CO)(PPh_3)_2] + PPh_3}$ to the left, slowing the reaction ([[#prop-wilkinson-rate]]) but ensuring that the species which inserts the alkene carries two bulky phosphines, which favours the linear alkyl. **Wide-bite-angle diphosphines** — BISBI, Xantphos, with P–Rh–P near $110$–$120^\circ$ — occupy two equatorial sites of the trigonal bipyramidal hydride complex, crowd the alkene and raise linear : branched ratios to $30 : 1$ or more (work of Casey, van Leeuwen and Kamer in the 1990s). **Higher CO pressure** speeds acyl formation but competes with alkene binding; **low CO pressure** allows β-hydride elimination and alkene isomerisation, so that internal alkenes can be converted to linear aldehydes by "isomerising hydroformylation".

::: quiz
In rhodium/$\mathrm{PPh_3}$ hydroformylation of propene, the rate is found to *decrease* as the concentration of free $\mathrm{PPh_3}$ is increased, while the linear : branched ratio *increases*. Which statement explains both observations?
- [x] Phosphine dissociation precedes the turnover-limiting steps, so free phosphine lowers the concentration of active species; the active species that remain carry more phosphine, which sterically favours the linear alkyl.
- [ ] Phosphine is a catalyst poison that destroys the rhodium irreversibly.
- [ ] Free phosphine reacts with propene to make the linear product directly.
- [ ] The rate decreases because phosphine increases the CO pressure.
::: solution
This is [[#prop-wilkinson-rate]] at work: an inverse dependence on free ligand signals a dissociative pre-equilibrium before the rate-determining step. Selectivity and activity are coupled through the same equilibrium — a trade-off that industrial processes manage by choosing the phosphine-to-rhodium ratio, and that wide-bite-angle chelates escape by holding the selectivity-determining ligands in place without needing a large excess.
:::
:::

## A carbonylation cycle: acetic acid from methanol

Hydroformylation inserts CO into a metal–alkyl bond made from an alkene. The largest-scale relative of that chemistry makes the alkyl from methanol instead. In the **Monsanto process** (discovered by James Roth and Frank Paulik in the late 1960s, in production from 1970) methanol and carbon monoxide combine to acetic acid, $\mathrm{CH_3OH + CO \rightarrow CH_3COOH}$, over a rhodium catalyst with iodide as an essential promoter. The iodide converts methanol into iodomethane, which is what the metal actually attacks. The cycle, in words:

1. **Activation of methanol (outside the metal cycle).** $\mathrm{CH_3OH + HI \rightarrow CH_3I + H_2O}$.
2. **Oxidative addition (rate-determining).** The square-planar 16-electron anion $\mathrm{[RhI_2(CO)_2]^-}$, Rh(I), $d^8$, attacks iodomethane by the $\mathrm{S_N2}$ route of [[organometallics-catalysis/elementary-reactions]]: the rhodium $d_{z^2}$ pair displaces iodide from carbon, and iodide then binds to rhodium, giving the octahedral 18-electron $\mathrm{[CH_3RhI_3(CO)_2]^-}$, Rh(III).
3. **Migratory insertion.** The methyl group migrates to an adjacent carbonyl, giving the 16-electron acetyl $\mathrm{[CH_3C(O)RhI_3(CO)]^-}$.
4. **CO coordination** restores 18 electrons.
5. **Reductive elimination** of acetyl iodide, $\mathrm{CH_3C(O)I}$, regenerates $\mathrm{[RhI_2(CO)_2]^-}$.
6. **Hydrolysis (outside the metal cycle).** $\mathrm{CH_3C(O)I + H_2O \rightarrow CH_3COOH + HI}$, returning the HI for step 1.

Two interlocking cycles — an organic iodide cycle and a rhodium cycle — share iodomethane and acetyl iodide. Because step 2 is rate-determining and every species before it is either in large excess or regenerated quickly, the rate law is remarkably simple: $v = k[\mathrm{Rh}][\mathrm{CH_3I}]$, first order in rhodium and in iodomethane and **zero order in CO and in methanol** over the working range. The **Cativa process** (BP, 1996) replaced rhodium by iridium: oxidative addition of iodomethane to $\mathrm{[IrI_2(CO)_2]^-}$ is very much faster (on the order of a hundred times, according to Peter Maitlis's kinetic studies), as expected for a $5d$ metal ([[organometallics-catalysis/organometallic-bonding]]), but the subsequent methyl migration is slower, so the rate-determining step moves, and promoters that remove an iodide from iridium (ruthenium carbonyl iodides) are needed to speed the migration. The same cycle, with the steps re-ranked, illustrates the general point: improving one step of a cycle only helps until another becomes the bottleneck.

::: example Rate and turnover in methanol carbonylation {#ex-monsanto}
A Monsanto-type reactor contains $1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ of rhodium and $1.0\ \mathrm{mol\,dm^{-3}}$ of iodomethane, and the rate law $v = k[\mathrm{Rh}][\mathrm{CH_3I}]$ holds with $k = 2.0\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ (an illustrative value) at the operating temperature. Find the rate, the TOF, and the mass of acetic acid ($M = 60.05\ \mathrm{g\,mol^{-1}}$) produced per cubic decimetre per hour. How would the rate change if the CO pressure were doubled?
::: solution
$v = (2.0)(1.0\times10^{-3})(1.0) = 2.0\times10^{-3}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. The turnover frequency is
$$
\mathrm{TOF} = \frac{v}{[\mathrm{Rh}]} = k[\mathrm{CH_3I}] = 2.0\ \mathrm{s^{-1}}.
$$
Per hour: $2.0\times10^{-3} \times 3600 = 7.2\ \mathrm{mol\,dm^{-3}\,h^{-1}}$, i.e. $7.2 \times 60.05 = 4.3\times10^{2}\ \mathrm{g}$ of acetic acid per cubic decimetre of reaction mixture per hour. Doubling the CO pressure leaves the rate **unchanged**: CO enters the cycle after the rate-determining oxidative addition, so it does not appear in the rate law (as long as there is enough CO to keep step 4 fast and to stabilise the rhodium against precipitation). The zero order in CO is a direct consequence of where CO enters the cycle.
:::
:::

## Other hydrogenation catalysts, briefly

Wilkinson's catalyst struggles with tri- and tetrasubstituted alkenes. **Cationic** catalysts with weakly bound ligands do better: Robert Crabtree's $\mathrm{[Ir(cod)(PCy_3)(py)]^+}$ (1977, cod = cycloocta-1,5-diene, py = pyridine) hydrogenates even tetrasubstituted alkenes, and its ability to bind a hydroxyl or carbonyl group of the substrate makes it **directed**: hydrogen is delivered to the face of the alkene syn to the coordinating group. Noyori's ruthenium catalysts with a diamine as well as a diphosphine hydrogenate ketones by an **outer-sphere** mechanism, in which a Ru–H hydride and an N–H proton are transferred together to the C=O group without the ketone binding to the metal — an example of **metal–ligand cooperation**. In each case the cycle is assembled from the same small set of steps, but the choice of which steps (inner- or outer-sphere, OA or heterolytic splitting of $\mathrm{H_2}$) is made by the ligand.

## Where this leads

The steps used here — dissociation, OA, insertion, RE — appear again with palladium in [[organometallics-catalysis/cross-coupling]], where the insertion partner is an aryl group and transmetallation replaces $\mathrm{H_2}$ addition. Repeated alkene insertion without hydrogen gives the polymers of [[organometallics-catalysis/metathesis-polymerisation]]. Hydrogenation on metal surfaces — the Sabatier hydrogenation of oils, the Horiuti–Polanyi mechanism — is the heterogeneous counterpart in [[organometallics-catalysis/heterogeneous-catalysis]], and the industrial context, from oxo alcohols to process metrics, is in [[green-chemistry/chemical-industry]] and [[green-chemistry/green-metrics]]. The stereochemistry of syn additions connects with [[organic-synthesis/stereoselective-synthesis]].

::: history
Otto Roelen discovered hydroformylation at Ruhrchemie in 1938 while studying Fischer–Tropsch chemistry. Richard Heck and David Breslow proposed the cobalt mechanism in 1961. John Osborn, Fred Jardine, John Young and Geoffrey Wilkinson described $\mathrm{[RhCl(PPh_3)_3]}$ as a homogeneous hydrogenation catalyst in 1965–66, and Wilkinson's group introduced rhodium–phosphine hydroformylation in 1968. William Knowles and Leopold Horner independently reported chiral rhodium–phosphine hydrogenation in 1968; Henri Kagan's DIOP followed in 1971 and Monsanto's L-DOPA process with DIPAMP in the 1970s. At Monsanto, too, James Roth and Frank Paulik developed the rhodium–iodide carbonylation of methanol, in production from 1970; BP's iridium-based Cativa process followed in 1996. The low-pressure rhodium oxo process started in 1976, the aqueous biphasic Ruhrchemie–Rhône-Poulenc process in 1984, and Noyori's BINAP–ruthenium hydrogenations in 1986–87. Jack Halpern's kinetic studies of the 1970s and his work with Clark Landis on the "major–minor" problem (1980s) established how cycles are deduced. Knowles and Noyori shared the 2001 Nobel Prize in Chemistry (with K. Barry Sharpless) for asymmetric catalysis.
:::

::: summary
- A catalytic cycle is a closed sequence of elementary steps with sensible (16/18) electron counts; TON counts turnovers per catalyst, TOF is $v/[\mathrm{Cat}]_0$; the resting state is the most abundant catalyst species, and the added complex is often only a precatalyst.
- Wilkinson hydrogenation runs mainly through $\mathrm{RhCl(PPh_3)_2}$: OA of $\mathrm{H_2}$, alkene binding, rate-determining insertion, RE. It is syn, selective for unhindered alkenes, and inverse first order in free $\mathrm{PPh_3}$.
- Rate laws of cycles follow from pre-equilibria and catalyst conservation, $v = k[\mathrm{Cat}]_0 \times$ (fraction in the reacting form); a dormant ligand-saturated reservoir gives inverse ligand orders.
- Enantio- and regioselectivity depend only on transition-state differences (Curtin–Hammett): $\mathrm{er} = e^{\Delta\Delta G^\ddagger/RT}$, $\mathrm{ee} = \tanh(\Delta\Delta G^\ddagger/2RT)$; $95\,\%$ ee at $298\ \mathrm{K}$ is $9.1\ \mathrm{kJ\,mol^{-1}}$.
- In asymmetric hydrogenation the minor, unobservable catalyst–substrate diastereomer can give the major product (anti-lock-and-key).
- Hydroformylation (Co: Heck–Breslow cycle; Rh/phosphine: low pressure) adds $\mathrm{H}$ and $\mathrm{CHO}$ with 100 % atom economy; linear selectivity rises with excess phosphine, wide bite angles and suitable CO pressure.
- Methanol carbonylation (Monsanto Rh, Cativa Ir) couples an iodide cycle to a metal cycle; rate-determining OA of $\mathrm{CH_3I}$ makes it zero order in CO and methanol, and changing the metal moves the rate-determining step.
:::

## Exercises

::: exercise Turnover frequency {level=1 check="1.39"}
A catalyst ($25.0\ \mu\mathrm{mol}$) converts $0.250\ \mathrm{mol}$ of substrate completely in $2.00\ \mathrm{h}$. What is the average TOF? (Enter the TOF in $\mathrm{s^{-1}}$.)
::: solution
$\mathrm{TON} = 0.250/25.0\times10^{-6} = 1.00\times10^{4}$; $\mathrm{TOF} = 1.00\times10^{4}/7200\ \mathrm{s} = 1.39\ \mathrm{s^{-1}}$, as in [[#ex-ton]].
:::
:::

::: exercise ee from an enantiomeric ratio {level=1 check="96.7"}
An asymmetric hydrogenation gives the two enantiomers in the ratio $60 : 1$. What is the ee? (Enter the ee in per cent, to three significant figures.)
::: solution
$\mathrm{ee} = (60 - 1)/(60 + 1) = 59/61 = 0.967 = 96.7\,\%$.
:::
:::

::: exercise Energy for 99 % ee {level=1 check="13.1"}
What $\Delta\Delta G^\ddagger$ is needed for $99.0\,\%$ ee at $298.15\ \mathrm{K}$? (Enter $\Delta\Delta G^\ddagger$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\mathrm{er} = 1.99/0.01 = 199$, and $\Delta\Delta G^\ddagger = RT\ln 199 = 8.314 \times 298.15 \times 5.293\ \mathrm{J\,mol^{-1}} = 13.1\ \mathrm{kJ\,mol^{-1}}$. Going from $95\,\%$ to $99\,\%$ ee costs only $4\ \mathrm{kJ\,mol^{-1}}$ more.
:::
:::

::: exercise Thermodynamics of hydrogenation {level=2 check="-100.4"}
Using $\Delta_\mathrm{f}H^\circ$(ethene) $= +52.4$, $\Delta_\mathrm{f}H^\circ$(ethane) $= -84.0\ \mathrm{kJ\,mol^{-1}}$ and $S^\circ$ = $219.32$ (ethene), $229.12$ (ethane), $130.68$ ($\mathrm{H_2}$) $\mathrm{J\,K^{-1}\,mol^{-1}}$, calculate $\Delta_\mathrm{r}G^\circ$ for the gas-phase hydrogenation of ethene at $298.15\ \mathrm{K}$. (Enter $\Delta_\mathrm{r}G^\circ$ in $\mathrm{kJ\,mol^{-1}}$, to one decimal place.)
::: solution
$\Delta_\mathrm{r}H^\circ = -84.0 - 52.4 = -136.4\ \mathrm{kJ\,mol^{-1}}$; $\Delta_\mathrm{r}S^\circ = 229.12 - 219.32 - 130.68 = -120.88\ \mathrm{J\,K^{-1}\,mol^{-1}}$; $\Delta_\mathrm{r}G^\circ = -136.4 - 298.15 \times (-0.12088) = -136.4 + 36.0 = -100.4\ \mathrm{kJ\,mol^{-1}}$. Strongly favourable; the catalyst is needed only for the rate.
:::
:::

::: exercise Regioselectivity in energy terms {level=2 check="9.62"}
A hydroformylation gives linear and branched aldehydes in the ratio $19 : 1$ at $393.15\ \mathrm{K}$. What is $\Delta\Delta G^\ddagger$ between the selectivity-determining transition states? (Enter $\Delta\Delta G^\ddagger$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta\Delta G^\ddagger = RT\ln 19 = 8.314 \times 393.15 \times 2.944\ \mathrm{J\,mol^{-1}} = 9.62\ \mathrm{kJ\,mol^{-1}}$ ([[#ex-lb]]).
:::
:::

::: exercise Inverse order in phosphine {level=2 check="0.5"}
A hydrogenation obeys [[#eq-wilkinson-rate]]. By what factor does the rate change when the concentration of free $\mathrm{PPh_3}$ is doubled, all else fixed? (Enter the factor.)
::: solution
The rate is proportional to $1/[\mathrm{L}]$: doubling $[\mathrm{L}]$ halves the rate, factor $0.5$. In practice an inverse first-order dependence on added phosphine is the experimental signature that a phosphine must dissociate before the turnover-limiting step.
:::
:::

::: exercise Saturation in hydrogen {level=3}
Extend [[#prop-wilkinson-rate]] to the case where the dihydride $\mathrm{CatH_2}$ (formed from Cat and $\mathrm{H_2}$ with constant $K_\mathrm{H}$) can accumulate, while $\mathrm{CatH_2S}$ stays minor. Show that
$$
v = \frac{kK_\mathrm{d}K_\mathrm{H}K_\mathrm{S}[\mathrm{Cat}]_0[\mathrm{H_2}][\mathrm{S}]}{[\mathrm{L}] + K_\mathrm{d} + K_\mathrm{d}K_\mathrm{H}[\mathrm{H_2}]},
$$
and describe how the order in $\mathrm{H_2}$ changes as the pressure rises. What would you see by NMR in each regime?
::: hint
Write all catalyst species in terms of $[\mathrm{Cat}]$ and sum them.
:::
::: solution
In terms of the free active species: $[\mathrm{CatL}] = [\mathrm{Cat}][\mathrm{L}]/K_\mathrm{d}$, $[\mathrm{CatH_2}] = K_\mathrm{H}[\mathrm{Cat}][\mathrm{H_2}]$, and $[\mathrm{CatH_2S}]$ negligible. Conservation:
$$
[\mathrm{Cat}]_0 = [\mathrm{Cat}]\left(\frac{[\mathrm{L}]}{K_\mathrm{d}} + 1 + K_\mathrm{H}[\mathrm{H_2}]\right) \Longrightarrow [\mathrm{Cat}] = \frac{K_\mathrm{d}[\mathrm{Cat}]_0}{[\mathrm{L}] + K_\mathrm{d} + K_\mathrm{d}K_\mathrm{H}[\mathrm{H_2}]}.
$$
Then $v = kK_\mathrm{H}K_\mathrm{S}[\mathrm{Cat}][\mathrm{H_2}][\mathrm{S}]$, which gives the stated expression. At low $\mathrm{H_2}$ pressure ($K_\mathrm{d}K_\mathrm{H}[\mathrm{H_2}] \ll [\mathrm{L}]$) the rate is first order in $\mathrm{H_2}$ and the resting state is $\mathrm{CatL}$ — the NMR spectrum shows mainly the phosphine-saturated precatalyst. At high pressure ($K_\mathrm{d}K_\mathrm{H}[\mathrm{H_2}] \gg [\mathrm{L}] + K_\mathrm{d}$) the denominator becomes proportional to $[\mathrm{H_2}]$, which cancels: $v \rightarrow kK_\mathrm{S}[\mathrm{Cat}]_0[\mathrm{S}]$, **zero order in $\mathrm{H_2}$**, first order in alkene, and independent of $[\mathrm{L}]$. The resting state is now the dihydride, whose characteristic high-field hydride signals appear in the $^{1}\mathrm{H}$ NMR spectrum. The change in order with pressure is the kinetic evidence that the resting state has shifted from before to after the $\mathrm{H_2}$ addition step.
:::
:::

::: exercise Deuterioformylation and the mechanism {level=3}
Hex-1-ene is hydroformylated with $\mathrm{[HCo(CO)_4]}$ under CO and $\mathrm{D_2}$ at low CO pressure. (a) Using the Heck–Breslow cycle, predict where deuterium appears in the linear aldehyde if every step after insertion is fast and irreversible. (b) At low CO pressure, deuterium is also found at C2 and C3 of recovered hex-1-ene and in the internal hexenes, and some 2-methylhexanal and 2-ethylpentanal form. Explain, describing the relevant steps in words. (c) Why does raising the CO pressure suppress these side reactions?
::: solution
(a) After the first turnover the catalyst is $\mathrm{[DCo(CO)_4]}$ (the hydride is replaced by deuteride through OA of $\mathrm{D_2}$ and RE of aldehyde). The alkene inserts into Co–D with cobalt on C1 and D on C2, giving $\mathrm{Co{-}CH_2CHD{-}C_4H_9}$; CO inserts (alkyl migration) to the acyl $\mathrm{Co{-}C(O)CH_2CHDC_4H_9}$; OA of $\mathrm{D_2}$ and RE deliver a D to the acyl carbon. The linear aldehyde is $\mathrm{C_4H_9CHD{-}CH_2{-}CDO}$, i.e. heptanal-1,3-$d_2$ (numbering from the CHO carbon): one D on the formyl carbon and one on the carbon that was C2 of the alkene.

(b) At low CO pressure the 16-electron alkyl $\mathrm{[Co(alkyl)(CO)_3]}$ waits for CO, and in the meantime it can undergo **β-hydride elimination**. From $\mathrm{Co{-}CH_2CHD{-}C_4H_9}$ the metal can remove H rather than D from C2, giving $\mathrm{CH_2{=}CD{-}C_4H_9}$ (deuterium at C2 of recovered alkene) and Co–H. Insertion in the Markovnikov sense gives the secondary alkyl, which can eliminate a C3 hydrogen to form hex-2-ene; repeated insertion–elimination moves the metal along the chain ("chain walking", [[organometallics-catalysis/elementary-reactions]]) and scatters deuterium over C1–C3 and beyond. When CO finally inserts into a secondary alkyl at C2 or C3, the branched aldehydes 2-methylhexanal and 2-ethylpentanal result.

(c) CO coordination and insertion compete with β-hydride elimination for the same 16-electron alkyl. Raising $p(\mathrm{CO})$ increases the rate of trapping the alkyl as an acyl (which cannot β-eliminate), so isomerisation and scrambling fall and the regiochemistry is fixed at the first insertion. The price is a slower overall rate, because high CO also competes with the alkene for the vacant site in step 2.
:::
:::
