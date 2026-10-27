In 1953 Karl Ziegler's group in Mülheim found that a mixture of titanium tetrachloride and triethylaluminium turns ethene into high-molar-mass polyethylene at atmospheric pressure and room temperature — conditions under which the established high-pressure process gave nothing at all. A year later Giulio Natta in Milan used the same kind of catalyst to polymerise propene into a crystalline, high-melting plastic in which every methyl group points the same way. Their catalysts now make well over a hundred million tonnes of polyolefins a year. In the 1950s and 1960s, too, chemists at several oil companies noticed a stranger reaction over molybdenum and tungsten catalysts: propene turned into a mixture of ethene and but-2-ene, as if the two halves of its double bond had been cut and re-joined with a partner's. That reaction — **alkene metathesis** — went on to transform ring synthesis, polymer chemistry and the manufacture of speciality alkenes.

Both reactions are catalytic cycles of a transition metal bonded to carbon, and both are run by the elementary steps of [[organometallics-catalysis/elementary-reactions]] with one addition: the **[2+2] cycloaddition** of a metal–carbon double bond to an alkene. This chapter explains how metathesis works, how its equilibria are steered, how Ziegler–Natta and metallocene catalysts grow polymer chains one insertion at a time, what fixes the chain length and its distribution, and how the symmetry of a catalyst decides the tacticity of polypropylene. It builds on the carbene ligands of [[organometallics-catalysis/ligands-complexes]] and the cycle analysis of [[organometallics-catalysis/hydrogenation-hydroformylation]].

## Alkene metathesis: the Chauvin mechanism

::: definition Alkene metathesis and the Chauvin mechanism {#def-metathesis}
**Alkene (olefin) metathesis** is the catalysed redistribution of alkylidene fragments between alkenes: $\mathrm{R^1CH{=}CHR^1 + R^2CH{=}CHR^2 \rightleftharpoons 2\,R^1CH{=}CHR^2}$. In the mechanism proposed by Yves Chauvin and Jean-Louis Hérisson in 1971, the active catalyst is a **metal alkylidene** $\mathrm{L_nM{=}CHR}$. In each turnover:

1. an alkene coordinates to the metal, cis to the alkylidene;
2. the M=C bond and the C=C bond undergo a **[2+2] cycloaddition** to form a four-membered **metallacyclobutane**, with no change in the metal's oxidation state;
3. the metallacyclobutane undergoes **cycloreversion** along the *other* pair of opposite bonds, releasing a new alkene and leaving a new alkylidene on the metal;
4. the new alkylidene repeats the process with another alkene.

Every step is reversible, so metathesis on its own establishes an equilibrium among all the alkenes present; useful reactions are driven by removing a product (often ethene) or by releasing ring strain.
:::

Chauvin's evidence was the distribution of products in cross-metathesis of cyclic and acyclic alkenes, which could not be explained by the then-popular "pairwise" mechanism (a cyclobutane-like exchange of two alkenes on the metal) but followed naturally from a chain carried by a metal carbene. Thomas Katz and Robert Grubbs confirmed it with labelling studies in the mid-1970s, and Schrock's isolation of well-defined alkylidenes that perform metathesis settled the question.

For the [2+2] step to be easy, the metal must accommodate the metallacyclobutane, which means a high-oxidation-state, $d^0$ metal (Mo(VI), W(VI), Re(VII)) or a ruthenium(II) centre with a vacant site. Two families of well-defined catalysts are used:

- **Schrock catalysts**, molybdenum and tungsten imido alkylidenes such as $\mathrm{[Mo(NAr)(CHCMe_2Ph)(OR)_2]}$ (Ar = 2,6-diisopropylphenyl, OR a bulky fluorinated alkoxide; Schrock, 1990). They are extremely active and tunable through the alkoxides, including chiral versions for enantioselective metathesis, but they are sensitive to air, water and many polar functional groups — the oxophilic $d^0$ metal binds aldehydes and alcohols.
- **Grubbs catalysts**, ruthenium alkylidenes. The first generation, $\mathrm{[RuCl_2(PCy_3)_2({=}CHPh)]}$ (1995), tolerates water, alcohols, acids and air for short periods; the second generation (1999) replaces one phosphine by an N-heterocyclic carbene, greatly increasing activity. The **Hoveyda–Grubbs** variants carry a chelating isopropoxybenzylidene that makes them robust and recoverable.

For Grubbs catalysts the mechanism begins with **dissociation** of a phosphine to give a 14-electron alkylidene, which binds the alkene. The second-generation catalyst initiates *more slowly* than the first (phosphine loss is slower), but once initiated its NHC-bearing 14-electron species prefers to bind alkene rather than recapture phosphine, so it turns over far more often per initiation — a trade-off between initiation and propagation, analysed by Grubbs's group with exactly the dissociative kinetics of [[organometallics-catalysis/elementary-reactions#prop-dissociative]].

::: widget graph
nodes: M=CHR@0,2; M=CHR(alkene)@2,3; metallacycle@4,2; M=CHR'(alkene)@2,0; M=CHR'@0,0
edges: M=CHR>M=CHR(alkene):1; M=CHR(alkene)>metallacycle:2; metallacycle>M=CHR'(alkene):3; M=CHR'(alkene)>M=CHR':4; metallacycle>M=CHR(alkene); M=CHR'(alkene)>metallacycle
algorithm: none
caption: The Chauvin cycle for one productive metathesis event, drawn as a directed network. Step 1: an alkene $\mathrm{R'CH{=}CHR''}$ binds to the alkylidene $\mathrm{M{=}CHR}$; step 2: [2+2] cycloaddition to the metallacyclobutane; step 3: cycloreversion along the other diagonal, giving coordinated $\mathrm{RCH{=}CHR''}$ and the new alkylidene $\mathrm{M{=}CHR'}$; step 4: the product alkene leaves. The unlabelled back-arrows mark that the cycloaddition and cycloreversion are reversible: a metallacyclobutane can always split the way it was formed (a non-productive, "degenerate" event). Every catalyst-containing species keeps the metal in the same oxidation state.
:::

## Steering an equilibrium: RCM, CM, ROMP and ADMET

Because metathesis is reversible and nearly thermoneutral for unstrained alkenes (the same kinds of C=C bonds are broken and made), the outcome is set by entropy, by strain and by removing products. Four modes of reaction are distinguished.

- **Ring-closing metathesis** (RCM): a diene forms a cycloalkene and ethene. The release of a gaseous molecule makes $\Delta S > 0$, and removing ethene drives the reaction to completion. Five- to seven-membered rings close easily; macrocycles need high dilution.
- **Cross-metathesis** (CM): two different alkenes exchange partners. Selectivity is achieved by choosing partners of different reactivity (one that readily homodimerises and one that does not).
- **Ring-opening metathesis polymerisation** (ROMP): a strained cycloalkene (norbornene, cyclooctene, dicyclopentadiene) opens into a polymer with the C=C bonds in the backbone; the release of ring strain makes $\Delta H < 0$.
- **Acyclic diene metathesis** (ADMET): an α,ω-diene polymerises by repeated cross-metathesis with loss of ethene.

RCM and ADMET start from the same kind of molecule. Whether a diene closes a ring or polymerises is decided by concentration.

::: proposition Cyclisation against oligomerisation: effective molarity {#prop-em}
For a diene that can either react intramolecularly (ring closing, first order in diene, rate constant $k_\text{intra}$) or intermolecularly (chain extension, second order, rate constant $k_\text{inter}$), the ratio of rates at diene concentration $c$ is
$$
\frac{v_\text{intra}}{v_\text{inter}} = \frac{k_\text{intra}}{k_\text{inter}\,c} = \frac{\mathrm{EM}}{c},
\qquad \mathrm{EM} \equiv \frac{k_\text{intra}}{k_\text{inter}},
$$ {#eq-em}
and the fraction of events that close a ring is $\mathrm{EM}/(\mathrm{EM} + c)$. The **effective molarity** EM has units of concentration; it is the concentration of a second molecule at which inter- and intramolecular reactions would be equally fast. The same ratio of equilibrium constants governs the thermodynamic ring–chain equilibrium when metathesis is reversible.
:::

::: proof
Both processes consume the reactive chain end (on the catalyst) and differ only in what it meets. The intramolecular partner is attached to the same molecule, so its rate is $k_\text{intra}[\text{diene–catalyst}]$, independent of $c$; the intermolecular partner is another diene, so its rate is $k_\text{inter}[\text{diene–catalyst}]\,c$. The ratio cancels the catalyst-bound concentration and gives [[#eq-em]]. The fraction of ring closure is $v_\text{intra}/(v_\text{intra} + v_\text{inter}) = \mathrm{EM}/(\mathrm{EM} + c)$. In the thermodynamic case, $K_\text{intra}$ (dimensionless) and $K_\text{inter}$ (concentration$^{-1}$) give the same structure with $\mathrm{EM} = K_\text{intra}/K_\text{inter}$; this is the basis of the Jacobson–Stockmayer theory of ring–chain equilibria. The effective molarity falls steeply for rings of more than about seven atoms, because a long chain rarely finds its own end ([[polymer-chemistry/step-growth]]). $\blacksquare$
:::

::: widget plot
f: e/(e + x)
x: 0, 0.5
y: 0, 1
sliders: e=0.05:0.001:1:0.001
labels: \text{fraction of ring closure}
caption: Fraction of metathesis events that close the ring, $\mathrm{EM}/(\mathrm{EM} + c)$, against the diene concentration $c$ (in $\mathrm{mol\,dm^{-3}}$), [[#eq-em]], with the effective molarity on the slider. For a five- or six-membered ring EM is large (often above $1\ \mathrm{mol\,dm^{-3}}$) and RCM wins at any practical concentration; for a 14-membered macrocycle EM may be $0.01$–$0.05\ \mathrm{mol\,dm^{-3}}$, and only high dilution prevents oligomers. Set EM to $0.05$ and read off $91\,\%$ cyclisation at $0.005\ \mathrm{mol\,dm^{-3}}$ but only $9\,\%$ at $0.5$.
:::

::: example Ring-closing a macrocycle {#ex-rcm}
A diene designed to close a 16-membered lactone by RCM has an effective molarity of $0.050\ \mathrm{mol\,dm^{-3}}$ with a second-generation Grubbs catalyst. (a) What fraction of reaction events close the ring at $c = 0.0050$ and at $0.50\ \mathrm{mol\,dm^{-3}}$? (b) Describe the first turnover of the catalyst on the diene, step by step. (c) Why is the reaction run under a slow stream of nitrogen or under reduced pressure?
::: solution
(a) From [[#prop-em]], at $c = 0.0050$: $0.050/(0.050 + 0.0050) = 0.909$, so $91\,\%$ ring closure. At $c = 0.50$: $0.050/(0.050 + 0.50) = 0.091$, only $9\,\%$ — most of the diene would form oligomers by ADMET.

(b) The precatalyst $\mathrm{[RuCl_2(NHC)(PCy_3)(=CHPh)]}$ loses $\mathrm{PCy_3}$ to give the 14-electron $\mathrm{[RuCl_2(NHC)(=CHPh)]}$. One terminal alkene of the diene binds; [2+2] cycloaddition forms a ruthenacyclobutane; cycloreversion releases styrene and leaves the ruthenium alkylidene on the substrate's terminal carbon, $\mathrm{Ru{=}CH{-}(chain)}$. That alkylidene now meets the diene's other terminal alkene — on the same molecule, in the ring-closing event — and a second cycloaddition gives a metallacyclobutane fused to the forming macrocycle; cycloreversion releases the cyclic alkene and leaves the methylidene $\mathrm{Ru{=}CH_2}$. The methylidene reacts with a new diene to give ethene and a new substrate alkylidene, and the cycle continues; ethene is the by-product of every turnover after the first.

(c) Ethene is volatile. Sweeping it out removes a product, so the reversible reaction is pulled towards the cyclic alkene (Le Chatelier), and it also prevents the methylidene from carrying out non-productive ethene exchanges and from decomposing (ruthenium methylidenes are the least stable species in the cycle).
:::
:::

ROMP is driven the other way, by strain. Its thermodynamics is that of any chain polymerisation, with an important consequence: a **ceiling temperature**.

::: proposition The ceiling temperature of a ring-opening polymerisation {#prop-ceiling}
For the propagation equilibrium $\mathrm{P_n + M \rightleftharpoons P_{n+1}}$ with standard enthalpy and entropy of polymerisation $\Delta H_\mathrm{p}^\circ < 0$ and $\Delta S_\mathrm{p}^\circ < 0$ (monomer at $1\ \mathrm{mol\,dm^{-3}}$ standard state), polymer and monomer are in equilibrium when the monomer concentration is
$$
[\mathrm{M}]_\mathrm{e} = c^\circ \exp\!\left(\frac{\Delta H_\mathrm{p}^\circ}{RT} - \frac{\Delta S_\mathrm{p}^\circ}{R}\right),
$$
and polymerisation of monomer at concentration $[\mathrm{M}]$ is possible only below the **ceiling temperature**
$$
T_\mathrm{c} = \frac{\Delta H_\mathrm{p}^\circ}{\Delta S_\mathrm{p}^\circ + R\ln([\mathrm{M}]/c^\circ)}.
$$
:::

::: proof
For a long chain, adding one monomer changes the polymer's activity negligibly, so the equilibrium constant of propagation is $K = c^\circ/[\mathrm{M}]_\mathrm{e}$. With $\Delta G_\mathrm{p}^\circ = -RT\ln K = \Delta H_\mathrm{p}^\circ - T\Delta S_\mathrm{p}^\circ$,
$$
\ln\frac{[\mathrm{M}]_\mathrm{e}}{c^\circ} = \frac{\Delta G_\mathrm{p}^\circ}{RT} = \frac{\Delta H_\mathrm{p}^\circ}{RT} - \frac{\Delta S_\mathrm{p}^\circ}{R}.
$$
Polymerisation proceeds only while $[\mathrm{M}] > [\mathrm{M}]_\mathrm{e}$. Setting $[\mathrm{M}]_\mathrm{e} = [\mathrm{M}]$ and solving for $T$ gives $T_\mathrm{c}$. Above $T_\mathrm{c}$ the $-T\Delta S$ term outweighs the enthalpy released and depolymerisation is favoured. Highly strained monomers (norbornene, with a large negative $\Delta H_\mathrm{p}$) have ceiling temperatures far above any working temperature; nearly unstrained cyclohexene has $\Delta H_\mathrm{p} \approx 0$ and does not undergo ROMP. $\blacksquare$
:::

::: example A low-strain monomer {#ex-ceiling}
A moderately strained cycloalkene has $\Delta H_\mathrm{p}^\circ = -20\ \mathrm{kJ\,mol^{-1}}$ and $\Delta S_\mathrm{p}^\circ = -70\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (illustrative values of the size found for cyclopentene). Find $T_\mathrm{c}$ for $1.0\ \mathrm{mol\,dm^{-3}}$ monomer, and the equilibrium monomer concentration at $25\,^\circ\mathrm{C}$ and at $0\,^\circ\mathrm{C}$.
::: solution
At $[\mathrm{M}] = c^\circ$ the logarithm vanishes: $T_\mathrm{c} = (-20\,000)/(-70) = 286\ \mathrm{K}$ ($13\,^\circ\mathrm{C}$). At $298.15\ \mathrm{K}$:
$$
[\mathrm{M}]_\mathrm{e} = \exp\!\left(\frac{-20\,000}{8.314 \times 298.15} + \frac{70}{8.314}\right) = \exp(-8.068 + 8.420) = e^{0.352} = 1.42\ \mathrm{mol\,dm^{-3}},
$$
higher than the monomer concentration, so a $1.0\ \mathrm{mol\,dm^{-3}}$ solution will not polymerise at room temperature. At $273.15\ \mathrm{K}$, $[\mathrm{M}]_\mathrm{e} = \exp(-8.806 + 8.420) = 0.68\ \mathrm{mol\,dm^{-3}}$: polymerisation proceeds until only $0.68\ \mathrm{mol\,dm^{-3}}$ of monomer remains, about $32\,\%$ conversion. Low-strain ROMP is run cold and concentrated (or in bulk), and an active catalyst left in the polymer can depolymerise it on warming.
:::
:::

## Ziegler–Natta and metallocene polymerisation

Metathesis catalysts make C=C bonds; polymerisation catalysts consume them. A Ziegler–Natta catalyst forms a **titanium alkyl with a vacant site**, and polyethylene grows by repeated alkene insertion into the Ti–C bond.

::: definition The Cossee–Arlman mechanism {#def-cossee}
In the mechanism proposed by Piet Cossee and Edward Arlman (1964), the active site is a coordinatively unsaturated transition-metal alkyl — on heterogeneous $\mathrm{TiCl_3}$/$\mathrm{MgCl_2}$ catalysts, a titanium atom at a crystal edge with one chloride vacancy, alkylated by the aluminium co-catalyst. Each propagation step is (1) **coordination** of the alkene at the vacant site cis to the growing chain, followed by (2) **1,2-migratory insertion** of the alkene into the M–C bond through a four-centre transition state, which lengthens the chain by two carbons and regenerates a vacant site where the chain used to be. Chain growth stops (chain transfer) by **β-hydride elimination** to the metal or to monomer, by **transfer to aluminium** (exchange of the polymer chain for an alkyl), or by **σ-bond metathesis with $\mathrm{H_2}$**, which is used industrially to control molar mass.
:::

The homogeneous counterparts are the **metallocene catalysts**. Hansjörg Sinn and Walter Kaminsky found in 1980 that partially hydrolysed trimethylaluminium, **methylaluminoxane** (MAO), activates $\mathrm{Cp_2ZrCl_2}$ to an extraordinarily active ethene polymerisation catalyst. MAO alkylates the zirconium and then abstracts a methyl anion, giving the cation $\mathrm{[Cp_2ZrCH_3]^+}$ with a weakly coordinating counter-anion. This species is $d^0$ and has only $4 + 10 + 1 - 1 = 14$ valence electrons, with two vacant orbitals: one binds the alkene, the other is the site into which the chain is transferred after insertion. As a $d^0$ metal it cannot back-donate, so alkenes bind weakly and insert rapidly. (Like the trialkylaluminiums from which it is made, MAO is pyrophoric and water-reactive; the hazards are those described in [[organometallics-catalysis/main-group-organometallics#warn-pyrophoric]].)

### Chain length and its distribution

::: proposition Degree of polymerisation with chain transfer {#prop-xn}
For a single-site catalyst at steady state with propagation rate constant $k_\mathrm{p}$ (first order in monomer at the active site) and chain-transfer processes with pseudo-first-order rate constants $k_{\beta}$ (β-hydride elimination to the metal, independent of monomer), $k_\mathrm{trM}[\mathrm{M}]$ (transfer to monomer) and $k_\mathrm{H}[\mathrm{H_2}]^{a}$ (hydrogenolysis), the number-average degree of polymerisation is
$$
\frac{1}{X_\mathrm{n}} = \frac{k_\beta + k_\mathrm{trM}[\mathrm{M}] + k_\mathrm{H}[\mathrm{H_2}]^{a}}{k_\mathrm{p}[\mathrm{M}]} = \frac{k_\beta}{k_\mathrm{p}[\mathrm{M}]} + \frac{k_\mathrm{trM}}{k_\mathrm{p}} + \frac{k_\mathrm{H}[\mathrm{H_2}]^{a}}{k_\mathrm{p}[\mathrm{M}]},
$$ {#eq-mayo}
an organometallic form of the Mayo equation (the order $a$ in hydrogen is found experimentally, commonly between ½ and 1).
:::

::: proof
Each active site alternates between growing a chain and releasing one. A chain grows by one monomer at rate $k_\mathrm{p}[\mathrm{M}]$ and is terminated at total rate $k_\text{tr} = k_\beta + k_\mathrm{trM}[\mathrm{M}] + k_\mathrm{H}[\mathrm{H_2}]^{a}$; every transfer leaves the site active, so the number of chains made per site per unit time is $k_\text{tr}$ and the number of monomers consumed is $k_\mathrm{p}[\mathrm{M}]$. The number-average length of the chains released is the ratio
$$
X_\mathrm{n} = \frac{k_\mathrm{p}[\mathrm{M}]}{k_\text{tr}},
$$
which on inversion gives [[#eq-mayo]]. (Equivalently: the probability that a given chain end adds monomer rather than transferring is $p = k_\mathrm{p}[\mathrm{M}]/(k_\mathrm{p}[\mathrm{M}] + k_\text{tr})$, and $X_\mathrm{n} = 1/(1-p) \approx k_\mathrm{p}[\mathrm{M}]/k_\text{tr}$ for long chains.) The derivation assumes a single kind of site and constant monomer concentration. $\blacksquare$
:::

::: proposition The Schulz–Flory distribution {#prop-flory}
For a single-site catalyst in which each chain end adds monomer with constant probability $p$ and transfers with probability $1 - p$, the number fraction of chains of length $n$ is $x_n = (1-p)p^{n-1}$ and the weight fraction is $w_n = n(1-p)^2p^{n-1}$. The averages are $X_\mathrm{n} = 1/(1-p)$ and $X_\mathrm{w} = (1+p)/(1-p)$, so the **dispersity** is
$$
Đ = \frac{X_\mathrm{w}}{X_\mathrm{n}} = 1 + p \approx 2 \quad\text{for long chains}.
$$
A **living** polymerisation with fast initiation and no transfer gives instead a Poisson distribution, with $Đ = 1 + \nu/(\nu+1)^2 \approx 1 + 1/X_\mathrm{n}$, where $\nu$ is the average number of monomers added per chain.
:::

::: proof
A chain of exactly $n$ units has made $n - 1$ successive additions (probability $p^{n-1}$) and then one transfer (probability $1 - p$), which gives $x_n$; the factors sum to $1$ as a geometric series. Then $X_\mathrm{n} = \sum n x_n = (1-p)\sum n p^{n-1} = (1-p)/(1-p)^2 = 1/(1-p)$, and $X_\mathrm{w} = \sum n^2x_n/\sum nx_n = (1-p)^2\sum n^2p^{n-1}$; using $\sum_{n\ge1} n^2p^{n-1} = (1+p)/(1-p)^3$ gives $X_\mathrm{w} = (1+p)/(1-p)$, and the ratio is $1 + p$. The weight fraction is $w_n = nx_n/X_\mathrm{n} = n(1-p)^2p^{n-1}$. The Poisson result is derived in [[polymer-chemistry/controlled-polymerisation]]. $\blacksquare$
:::

::: widget plot
f: x*(1/a)^2*(1 - 1/a)^(x - 1)
x: 1, 2000
y: 0, 0.0015
sliders: a=300:50:1000:10
labels: w_n\ \text{(Schulz–Flory, }X_\mathrm{n} = a\text{)}
caption: The Schulz–Flory weight fraction $w_n = n(1-p)^2p^{n-1}$ against chain length $n$, with $p = 1 - 1/X_\mathrm{n}$ and $X_\mathrm{n}$ set by the slider. The maximum lies at $n \approx X_\mathrm{n}$ and the long tail to high $n$ makes $X_\mathrm{w} \approx 2X_\mathrm{n}$: dispersity 2 is the signature of a single kind of active site with random transfer. Multi-site heterogeneous Ziegler–Natta catalysts superpose several such curves with different $X_\mathrm{n}$ and give dispersities of 4–8; a living ROMP, by contrast, would show a narrow peak with $Đ$ close to 1.
:::

::: example Controlling polyethylene molar mass with hydrogen {#ex-hydrogen}
A metallocene catalyst at fixed ethene concentration propagates at $k_\mathrm{p}[\mathrm{M}] = 1.0\times10^{3}\ \mathrm{s^{-1}}$ per site; β-hydride transfer occurs at $k_\beta = 0.050\ \mathrm{s^{-1}}$, transfer to monomer is negligible, and with the chosen hydrogen pressure $k_\mathrm{H}[\mathrm{H_2}]^{a} = 0.15\ \mathrm{s^{-1}}$. Find $X_\mathrm{n}$ and $M_\mathrm{n}$ with and without hydrogen ($M(\mathrm{C_2H_4}) = 28.05\ \mathrm{g\,mol^{-1}}$), and the expected $M_\mathrm{w}$.
::: solution
With hydrogen, from [[#eq-mayo]],
$$
X_\mathrm{n} = \frac{1.0\times10^{3}}{0.050 + 0.15} = 5.0\times10^{3}, \qquad M_\mathrm{n} = 5.0\times10^{3} \times 28.05 = 1.4\times10^{5}\ \mathrm{g\,mol^{-1}}.
$$
Without hydrogen, $X_\mathrm{n} = 1.0\times10^{3}/0.050 = 2.0\times10^{4}$ and $M_\mathrm{n} = 5.6\times10^{5}\ \mathrm{g\,mol^{-1}}$. A single-site catalyst gives a Schulz–Flory distribution, so $M_\mathrm{w} \approx 2M_\mathrm{n}$: $2.8\times10^{5}$ and $1.1\times10^{6}\ \mathrm{g\,mol^{-1}}$ respectively. Hydrogen is the manufacturer's molar-mass dial: by σ-bond metathesis with the Zr–polymer bond it releases a saturated chain and a Zr–H that inserts ethene to start a new chain, without changing the number of active sites. The two end groups differ: β-hydride transfer leaves a vinyl end group on the released chain, hydrogenolysis a saturated one — a distinction visible by $^{1}\mathrm{H}$ NMR.
:::
:::

### Stereochemistry: tacticity from catalyst symmetry

Propene inserts with the methyl group on the carbon that does *not* bond to the metal (**1,2-insertion**), creating a stereocentre at every second carbon of the chain. If successive stereocentres have the same configuration the polymer is **isotactic**; if they alternate, **syndiotactic**; if random, **atactic**. Isotactic polypropylene crystallises and melts near $165\,^\circ\mathrm{C}$; atactic polypropylene is a soft, sticky amorphous material. The catalyst decides which forms, through one of two mechanisms of stereocontrol: **chain-end control** (the last stereocentre of the chain influences the next insertion) or **enantiomorphic site control** (the chirality of the active site chooses the face of each incoming propene).

Metallocenes made site control rational. In an *ansa*-metallocene the two cyclopentadienyl-type rings are linked by a bridge (such as $\mathrm{CH_2CH_2}$ or $\mathrm{Me_2Si}$) that prevents their rotation, so the shape of the catalyst is fixed. Each insertion moves the chain to the site previously occupied by the alkene (the chain "migrates"), so the two coordination sites are used alternately.

- A **$C_2$-symmetric** *rac*-ansa-metallocene (for example *rac*-ethylenebis(indenyl)zirconium dichloride) has two **homotopic** sites, related by the $C_2$ axis: both select the *same* propene face, so every insertion produces the same configuration — **isotactic** polypropylene (John Ewen, 1984; Kaminsky and Hans Brintzinger, 1985).
- A **$C_\mathrm{s}$-symmetric** catalyst (Ewen's $\mathrm{[Me_2C(Cp)(fluorenyl)]ZrCl_2}$, 1988) has two **enantiotopic** sites, mirror images of each other: they select *opposite* propene faces, and because the chain alternates between them, the configurations alternate — **syndiotactic** polypropylene.
- An achiral $C_{2v}$ catalyst such as $\mathrm{Cp_2ZrCl_2}$ cannot discriminate the faces, and gives **atactic** polymer (apart from weak chain-end control at low temperature).
- The meso ($C_\mathrm{s}$, mirror plane containing both sites) isomer of an ansa-metallocene has two identical but non-selective sites and also gives atactic polymer.

::: example Predicting tacticity {#ex-tacticity}
Predict the tacticity of polypropylene made by (a) *rac*-$\mathrm{[Me_2Si(2\text{-}methylindenyl)_2]ZrCl_2}$/MAO, (b) its *meso* isomer, and (c) $\mathrm{[Me_2C(Cp)(fluorenyl)]ZrCl_2}$/MAO. Explain in terms of site symmetry and chain migration.
::: solution
(a) The *rac* isomer is $C_2$-symmetric: the two coordination sites are interconverted by the $C_2$ axis and are therefore identical in their chirality. Each prefers the same enantioface of propene (the face that puts the methyl group away from the indenyl six-membered ring). After each insertion the chain moves to the other site, but because both sites have the same preference, every new stereocentre has the same configuration: **isotactic**.
(b) The *meso* isomer has a mirror plane that contains the Zr and bisects the ligand framework, relating the two indenyls; each site lies on the plane and is itself achiral, so it does not discriminate between the propene faces: **atactic**.
(c) The $C_\mathrm{s}$ complex has a mirror plane that passes between the two sites and reflects one into the other: the sites are enantiotopic. One prefers the *re* face, the other the *si* face. Since chain migration makes the catalyst use the sites alternately, the configurations alternate: **syndiotactic**. If an occasional insertion happens *without* site alternation ("back-skip" of the chain), a stereo-error appears — such errors, counted by $^{13}\mathrm{C}$ NMR pentad analysis, were key evidence for the chain-migration mechanism.
:::
:::

::: warning Tacticity is not decided by the monomer {#warn-tacticity}
It is a common misconception that propene "wants" to form one tacticity, or that isotactic polymer simply forms because it is more stable. Polymer tacticity is a **kinetic** product of the catalyst: the energy difference between the two transition states for the two propene enantiofaces, at each insertion, determines the configuration (the Curtin–Hammett reasoning of [[organometallics-catalysis/hydrogenation-hydroformylation#prop-ee]] applied a few thousand times per chain). Switch from a $C_2$ to a $C_\mathrm{s}$ catalyst and the same monomer gives a different polymer; raise the temperature and the selectivity of each step falls, and with it the stereoregularity and the melting point.
:::

::: quiz
A single-site metallocene catalyst gives polyethylene with $Đ = 2.0$; a heterogeneous Ziegler–Natta catalyst gives $Đ = 6$ under the same conditions. What is the most likely explanation?
- [x] The heterogeneous catalyst has several kinds of active site with different ratios of propagation to transfer, each producing its own Schulz–Flory distribution.
- [ ] The metallocene is a living catalyst with no chain transfer.
- [ ] The heterogeneous catalyst polymerises by a radical mechanism.
- [ ] Hydrogen was absent in the metallocene reaction.
::: solution
A single kind of site with random transfer gives the Schulz–Flory distribution and $Đ = 1 + p \approx 2$ ([[#prop-flory]]). Superposing distributions with different $X_\mathrm{n}$ broadens the overall distribution, so $Đ \gg 2$ diagnoses multiple sites. A living catalyst would give $Đ$ close to 1, not 2; Ziegler–Natta catalysts polymerise by insertion, not radicals; and hydrogen changes $X_\mathrm{n}$ but not the shape of a single-site distribution.
:::
:::

## Where this leads

Ruthenium and molybdenum metathesis catalysts appear in [[organic-synthesis/carbon-carbon-bonds]] and [[organic-synthesis/total-synthesis]], where RCM has become a standard way to close medium and large rings. ROMP and living polymerisation are developed further in [[polymer-chemistry/controlled-polymerisation]], and the connection between chain microstructure, tacticity and properties in [[polymer-chemistry/polymer-structure]] and [[polymer-chemistry/polymer-properties]]. The heterogeneous Ziegler–Natta and Phillips chromium catalysts, supported on $\mathrm{MgCl_2}$ and silica, belong to the surface chemistry of [[organometallics-catalysis/heterogeneous-catalysis]], and the industrial scale of polyolefin production is in [[green-chemistry/petrochemicals]].

::: history
Karl Ziegler's discovery of low-pressure polyethylene with $\mathrm{TiCl_4/AlEt_3}$ (1953) and Giulio Natta's isotactic polypropylene (1954) earned them the 1963 Nobel Prize in Chemistry; J. Paul Hogan and Robert Banks had found the Phillips chromium-on-silica catalyst in 1951. Piet Cossee and Edward Arlman proposed the insertion mechanism in 1964. Hansjörg Sinn and Walter Kaminsky discovered MAO activation of metallocenes in 1980; John Ewen (1984) and Kaminsky and Hans Brintzinger (1985) made isotactic polypropylene with chiral ansa-metallocenes, and Ewen syndiotactic polypropylene with a $C_\mathrm{s}$ catalyst in 1988. On the metathesis side, Robert Banks and Grant Bailey at Phillips described the "olefin disproportionation" of propene in 1964, Nissim Calderon coined the name metathesis in 1967, and Yves Chauvin and Jean-Louis Hérisson proposed the metal-carbene mechanism in 1971. Richard Schrock's molybdenum imido alkylidenes (1990) and Robert Grubbs's ruthenium catalysts (1992 onwards; the first-generation catalyst in 1995 and the NHC second generation in 1999) made the reaction routine. Chauvin, Grubbs and Schrock shared the 2005 Nobel Prize in Chemistry.
:::

::: summary
- Alkene metathesis proceeds by the Chauvin mechanism: a metal alkylidene and an alkene form a metallacyclobutane by [2+2] cycloaddition, which splits the other way to give a new alkene and alkylidene; every step is reversible.
- Schrock (Mo, W imido alkylidenes) catalysts are very active but sensitive; Grubbs (Ru) catalysts tolerate air, water and polar groups and initiate by phosphine dissociation.
- RCM is driven by ethene loss and favoured at concentrations below the effective molarity (ring fraction $\mathrm{EM}/(\mathrm{EM} + c)$); ROMP is driven by ring strain and limited by the ceiling temperature $T_\mathrm{c} = \Delta H_\mathrm{p}^\circ/(\Delta S_\mathrm{p}^\circ + R\ln[\mathrm{M}]/c^\circ)$.
- Ziegler–Natta and metallocene catalysts grow chains by the Cossee–Arlman mechanism: alkene coordination at a vacant site and cis migratory insertion; $[\mathrm{Cp_2ZrMe}]^+$ (14 electrons, $d^0$), formed with MAO, is the archetypal active species.
- $1/X_\mathrm{n} = (\text{sum of transfer rates})/(k_\mathrm{p}[\mathrm{M}])$; hydrogen lowers molar mass by σ-bond metathesis. Single-site catalysts give Schulz–Flory distributions with $Đ \approx 2$; multi-site catalysts give broader ones; living polymerisation gives $Đ \approx 1 + 1/X_\mathrm{n}$.
- Catalyst symmetry sets tacticity by enantiomorphic site control with chain migration: $C_2$ → isotactic, $C_\mathrm{s}$ (enantiotopic sites) → syndiotactic, achiral sites → atactic.
:::

## Exercises

::: exercise Count a metathesis catalyst {level=1 check="14"}
After phosphine dissociation, the first-generation Grubbs catalyst gives $\mathrm{[RuCl_2(PCy_3)(=CHPh)]}$. Count its valence electrons, treating the benzylidene as a two-electron L-type (Fischer-like) ligand. (Enter the count.)
::: solution
Ru, $g = 8$; two Cl (X, 2), $\mathrm{PCy_3}$ (L, 2), the alkylidene as an L ligand (2): $\mathrm{VE} = 8 + 2 + 2 + 2 = 14$, Ru(II) in this formalism. The 14-electron species binds an alkene (16), which then forms the metallacyclobutane. (Treating the alkylidene as X₂ gives Ru(IV) and the same total, 14.)
:::
:::

::: exercise Products of cross-metathesis {level=1}
Give the products of metathesis of (a) propene alone; (b) diethyl 2,2-diallylmalonate, $\mathrm{(EtO_2C)_2C(CH_2CH{=}CH_2)_2}$, at high dilution; (c) norbornene with a Grubbs catalyst.
::: solution
(a) Ethene and but-2-ene (as an *E*/*Z* mixture): $2\,\mathrm{CH_3CH{=}CH_2 \rightleftharpoons CH_2{=}CH_2 + CH_3CH{=}CHCH_3}$ — the original Phillips "triolefin" reaction. (b) Ring-closing metathesis to diethyl cyclopent-3-ene-1,1-dicarboxylate and ethene. (c) ROMP to polynorbornene (polynorbornenylene): poly(1,3-cyclopentylenevinylene), with cyclopentane rings linked by C=C bonds in the backbone.
:::
:::

::: exercise Molar mass from transfer rates {level=1 check="20000"}
A single-site catalyst propagates at $k_\mathrm{p}[\mathrm{M}] = 1.0\times10^{3}\ \mathrm{s^{-1}}$ and transfers only by β-hydride elimination at $0.050\ \mathrm{s^{-1}}$. What is $X_\mathrm{n}$? (Enter $X_\mathrm{n}$.)
::: solution
$X_\mathrm{n} = 1.0\times10^{3}/0.050 = 2.0\times10^{4}$; for polyethylene $M_\mathrm{n} = 2.0\times10^{4} \times 28.05 = 5.6\times10^{5}\ \mathrm{g\,mol^{-1}}$.
:::
:::

::: exercise Effective molarity at work {level=2 check="0.53"}
A diene closes a ring by RCM with $\mathrm{EM} = 0.010\ \mathrm{mol\,dm^{-3}}$. Below what concentration must the reaction be run so that at least $95\,\%$ of events close the ring? (Enter the maximum concentration in $\mathrm{mmol\,dm^{-3}}$, to two significant figures.)
::: solution
From [[#prop-em]], $\mathrm{EM}/(\mathrm{EM} + c) \ge 0.95$ rearranges to $c \le \mathrm{EM}\,(1 - 0.95)/0.95 = \mathrm{EM}/19$. With $\mathrm{EM} = 0.010\ \mathrm{mol\,dm^{-3}}$, $c \le 5.3\times10^{-4}\ \mathrm{mol\,dm^{-3}} = 0.53\ \mathrm{mmol\,dm^{-3}}$. Such dilutions are typical of macrocyclisations; slow addition of the diene to the catalyst solution keeps the instantaneous concentration low without needing enormous solvent volumes.
:::
:::

::: exercise Dispersity of a single-site catalyst {level=2 check="1.998"}
For a Schulz–Flory distribution with $X_\mathrm{n} = 500$, calculate the dispersity exactly. (Enter $Đ$ to four significant figures.)
::: solution
$p = 1 - 1/X_\mathrm{n} = 0.998$, and $Đ = 1 + p = 1.998$ ([[#prop-flory]]). For long chains $Đ \to 2$.
:::
:::

::: exercise Equilibrium monomer and ceiling temperature {level=2 check="286"}
A cycloalkene has $\Delta H_\mathrm{p}^\circ = -20\ \mathrm{kJ\,mol^{-1}}$ and $\Delta S_\mathrm{p}^\circ = -70\ \mathrm{J\,K^{-1}\,mol^{-1}}$. What is its ceiling temperature at a monomer concentration of $1.0\ \mathrm{mol\,dm^{-3}}$? (Enter $T_\mathrm{c}$ in kelvin.)
::: solution
$T_\mathrm{c} = \Delta H_\mathrm{p}^\circ/\Delta S_\mathrm{p}^\circ = 20\,000/70 = 286\ \mathrm{K}$ ([[#ex-ceiling]]); at higher monomer concentration (bulk) $T_\mathrm{c}$ rises, because $R\ln([\mathrm{M}]/c^\circ) > 0$ makes the denominator less negative.
:::
:::

::: exercise Derive the Mayo form with transfer to aluminium {level=3}
In Ziegler–Natta polymerisation, chains are also transferred to the aluminium co-catalyst, $\mathrm{M{-}P_n + AlR_3 \rightarrow M{-}R + R_2Al{-}P_n}$, at rate $k_\mathrm{Al}[\mathrm{AlR_3}]$ per chain. (a) Add this to [[#eq-mayo]] and show how $1/X_\mathrm{n}$ depends on $[\mathrm{AlR_3}]$ at fixed monomer concentration. (b) How could a plot of $1/X_\mathrm{n}$ against $[\mathrm{AlR_3}]$ be used to measure $k_\mathrm{Al}/k_\mathrm{p}$? (c) If chain transfer to aluminium is fast and reversible (chains swap back and forth between Al and the metal many times during their growth), the polymer can become much narrower than Schulz–Flory. Explain qualitatively.
::: hint
For (c), think about whether all chains get the same chance to grow when they swap rapidly between dormant (Al-bound) and active (metal-bound) states.
:::
::: solution
(a) Adding the new transfer term to the numerator:
$$
\frac{1}{X_\mathrm{n}} = \frac{k_\beta + k_\mathrm{trM}[\mathrm{M}] + k_\mathrm{H}[\mathrm{H_2}]^a + k_\mathrm{Al}[\mathrm{AlR_3}]}{k_\mathrm{p}[\mathrm{M}]},
$$
so at fixed $[\mathrm{M}]$ and $[\mathrm{H_2}]$, $1/X_\mathrm{n}$ is linear in $[\mathrm{AlR_3}]$ with slope $k_\mathrm{Al}/(k_\mathrm{p}[\mathrm{M}])$.
(b) Measure $X_\mathrm{n}$ (by size-exclusion chromatography or end-group NMR) at several aluminium concentrations, plot $1/X_\mathrm{n}$ against $[\mathrm{AlR_3}]$; the slope times $[\mathrm{M}]$ gives $k_\mathrm{Al}/k_\mathrm{p}$, and the intercept gives the other transfer contributions.
(c) If chains exchange between the transition metal (where they grow) and aluminium (where they are dormant) rapidly compared with the overall polymerisation time, every chain spends on average the same fraction of time on the active metal and so adds monomer at the same average rate; chains are not "terminated" but merely parked. All chains then start at about the same time and grow in parallel, as in a living polymerisation, and the distribution narrows towards Poisson-like ($Đ$ approaching 1). This is the principle of **coordinative chain-transfer polymerisation** and of "chain shuttling" between two catalysts used to make olefin block copolymers. Irreversible transfer to aluminium, in contrast, just ends chains and keeps $Đ \approx 2$.
:::
:::

::: exercise A metathesis mechanism problem {level=3}
A Grubbs catalyst $\mathrm{[Ru]{=}CHPh}$ is mixed with (*Z*)-cyclooctene and a small amount of (*Z*)-hex-3-ene. (a) Describe, step by step, how the first ring-opening event occurs and what the chain end looks like afterwards. (b) What is the role of the hex-3-ene, and how does its amount control the molar mass? (c) At long reaction times, the polymer contains macrocyclic oligomers and its backbone C=C bonds become largely (*E*). Explain both observations.
::: solution
(a) The 14-electron alkylidene (after phosphine loss) binds cyclooctene; [2+2] cycloaddition forms a ruthenacyclobutane fused to the eight-membered ring; cycloreversion along the other diagonal opens the ring, giving a new alkylidene $\mathrm{[Ru]{=}CH(CH_2)_6CH{=}CHPh}$: the chain end carries the ruthenium alkylidene, and the other end is capped by the original benzylidene group. Each subsequent cyclooctene inserts eight carbons and one C=C bond into the growing chain, driven by release of ring strain.
(b) Hex-3-ene is a **chain-transfer agent**. Cross-metathesis of the growing alkylidene with hex-3-ene caps the chain with a $\mathrm{CHCH_2CH_3}$ (propylidene) end and creates a new $\mathrm{[Ru]{=}CHCH_2CH_3}$, which starts a new chain. Because all steps are reversible, the system approaches an equilibrium in which the number of chains is fixed by the number of chain-transfer-agent molecules; the average degree of polymerisation is roughly the ratio of cyclooctene units to hex-3-ene molecules. More transfer agent, shorter chains.
(c) Metathesis is reversible, so the active alkylidene at a chain end can also react with a C=C bond in its *own* backbone ("back-biting"), cutting out a macrocycle — the ring–chain equilibrium of [[#prop-em]], which leaves a population of cyclic oligomers. Backbone C=C bonds are likewise exchanged by secondary metathesis, and since each exchange can re-form the bond with either geometry, the configurations approach thermodynamic equilibrium, where the less strained (*E*) double bonds predominate. Both observations are signs that the reaction has moved from kinetic to thermodynamic control.
:::
:::
