Most of the reactions in this course join or modify pieces while leaving the carbon skeleton as it was. Some of the most powerful transformations in synthesis do the opposite: they **reorganise the skeleton itself**. A carbocation finds a more stable arrangement by shifting a neighbouring group with its bonding pair; an oxime becomes an amide by moving a carbon from carbon to nitrogen; a ketone ring contracts or expands by one atom; a carbene slips into a C=C bond to make a three-membered ring; a radical bites back onto an alkene five atoms away and closes a ring. These reactions involve reactive intermediates — carbocations, carbenes, nitrenes and radicals — that live for nanoseconds or less and that, in earlier courses, appeared mainly as sources of unwanted by-products. Here we learn to use them deliberately.

The chapter has three parts. First, **cationic and related 1,2-shifts**: the Wagner–Meerwein and pinacol rearrangements, and the migrations to electron-deficient nitrogen (Beckmann, Hofmann, Curtius) and oxygen (Baeyer–Villiger, met in [[organic-synthesis/redox-in-synthesis]]), plus the Favorskii ring contraction. Second, **carbenes, carbenoids and nitrenes**: cyclopropanation, insertion and the Wolff rearrangement. Third, **radical reactions** as synthetic tools: tin hydride chain reactions, radical cyclisations and their kinetics, and the modern alternatives. The evidence for these intermediates — trapping, labelling, stereochemistry and radical clocks — comes from [[organic-synthesis/mechanism-determination]], and the basics of radical chain reactions from [[organic-1/radical-reactions]].

## 1,2-Shifts to electron-deficient centres {#sec-shifts}

::: definition 1,2-Shift {#def-shift}
A **1,2-shift** (or [1,2]-sigmatropic shift to an electron-deficient centre) is the migration of a group G — hydrogen (a hydride shift), alkyl, aryl or vinyl — together with its bonding electron pair, from one atom to an adjacent atom that is electron-deficient (a carbocation, a nitrenium-like or carbene centre, or an atom from which a leaving group is departing). In the transition state the migrating group bridges the two atoms through a three-centre, two-electron bond. The atom it leaves becomes the new electron-deficient centre (often stabilised by an adjacent lone pair, as in an oxocarbenium ion).
:::

::: proposition Stereochemistry of 1,2-shifts (empirical generalisation) {#prop-shift-stereo}
In concerted 1,2-shifts to electron-deficient carbon, nitrogen or oxygen: (1) the migrating group moves **with retention of its configuration**, because it never leaves the bonding electron pair and is transferred across one face; (2) the migrating group is the one **anti-periplanar** to the departing leaving group (or to the empty orbital of a preformed cation), so that the σ bond being broken can overlap with the σ* or empty p orbital that receives it; (3) when the migration is concerted with departure of the leaving group, the **terminus** is inverted. Groups that best stabilise partial positive charge migrate most readily (roughly aryl ≈ H > tertiary > secondary > primary alkyl > methyl), but stereoelectronic alignment overrides intrinsic aptitude.
:::

::: proof Justification
The migrating group G is attached to atom C1 by a σ bond and moves to the adjacent electron-deficient atom C2. Orbital overlap is maximal when the C1–G bond lies parallel to the empty p orbital on C2 (or anti to the C2–X bond whose σ* orbital is being populated): this is the anti-periplanar requirement. Along the way G is bonded simultaneously to C1 and C2 by a three-centre bond using the same lobe of G's orbital, so G is transferred suprafacially and its own configuration is unchanged — confirmed experimentally by migrating enantioenriched *sec*-butyl and similar groups in the Wolff, Curtius, Hofmann and Baeyer–Villiger reactions, which proceed with complete retention. At C2, G arrives on the face opposite to the departing group (backside, as in $\mathrm{S_N2}$), so if C2 is a stereocentre and the departure is concerted, C2 inverts. $\blacksquare$
:::

### Wagner–Meerwein and pinacol rearrangements

When a carbocation forms next to a carbon bearing hydrogen or alkyl groups, a 1,2-shift can convert it into a more stable cation. These **Wagner–Meerwein** shifts explain the skeletal rearrangements of terpenes and steroids — the conversion of isoborneol into camphene, the biosynthesis of lanosterol — and the mixtures that plague $\mathrm{S_N1}$ and E1 reactions of secondary substrates ([[organic-1/nucleophilic-substitution]]).

The **pinacol rearrangement** is the synthetically most useful version. A 1,2-diol treated with acid loses water from one carbon to give a carbocation; a group on the neighbouring carbinol carbon migrates; and the resulting cation is stabilised as a protonated ketone by the oxygen lone pair.

::: example The pinacol rearrangement {#ex-pinacol}
Describe the mechanism of the acid-catalysed rearrangement of 2,3-dimethylbutane-2,3-diol (pinacol) to 3,3-dimethylbutan-2-one (pinacolone), and predict the product from 2-methyl-1,1-diphenylpropane-1,2-diol.
::: solution
**Pinacol.** (1) A lone pair of one hydroxy oxygen takes a proton from the acid. (2) The C–$\mathrm{OH_2^+}$ bond breaks heterolytically, its electrons leaving with water, giving a tertiary carbocation. (3) A methyl group on the adjacent carbinol carbon migrates with its bonding pair to the cationic carbon, through a three-centre transition state; the positive charge moves to the carbon that lost the methyl, where it is immediately stabilised by the adjacent oxygen's lone pair, forming a C=O⁺–H (protonated ketone). (4) Loss of the proton from oxygen gives 3,3-dimethylbutan-2-one. The driving force is the formation of the strong C=O bond: the oxocarbenium ion is much more stable than the tertiary carbocation.

**2-Methyl-1,1-diphenylpropane-1,2-diol**, $\mathrm{Ph_2C(OH){-}C(OH)(CH_3)_2}$. Two cations could form. Ionisation at C1 gives the **diphenylmethyl-type cation**, stabilised by delocalisation into both rings, much more stable than the tertiary cation at C2 — so water leaves from C1. A methyl group then migrates from C2 to C1 (no other group on C2 can: C2 carries two methyls and OH), and C2 becomes the carbonyl carbon: **3,3-diphenylbutan-2-one**, $\mathrm{CH_3CO{-}CPh_2{-}CH_3}$. The rule: first decide which cation forms (the more stable one); only then ask which group migrates.
:::
:::

The **semipinacol** rearrangement achieves the same result under milder conditions by placing a leaving group (a sulfonate, or an epoxide opened by a Lewis acid) on one carbon of a β-hydroxy compound. Ring expansions follow when the migrating bond is part of a ring: in the **Tiffeneau–Demjanov** reaction a 1-(aminomethyl)cycloalkanol is diazotised with nitrous acid, nitrogen leaves from the primary diazonium ion, and a ring C–C bond migrates to give the next larger cycloalkanone.

### Migration to nitrogen: Beckmann, Hofmann, Curtius

**Beckmann rearrangement.** Oximes ($\mathrm{R_2C{=}NOH}$) are converted by acids or by activation of the OH (sulfonyl chlorides, $\mathrm{PCl_5}$, cyanuric chloride) into amides. The OH group is converted into a leaving group; as it departs from nitrogen, the group **anti** to it migrates from carbon to nitrogen; water then attacks the resulting nitrilium ion, and tautomerisation gives the amide. Because the oxime geometry decides which group moves, (*E*)- and (*Z*)-oximes give different amides.

**Hofmann and Curtius rearrangements.** In the Hofmann rearrangement a primary amide is treated with bromine and base: N-bromination, deprotonation and loss of bromide trigger migration of the alkyl group from the carbonyl carbon to nitrogen, giving an **isocyanate** ($\mathrm{R{-}N{=}C{=}O}$). In the Curtius rearrangement an acyl azide loses nitrogen on gentle heating, again with concerted migration to give the isocyanate. The isocyanate is hydrolysed to a primary amine with one carbon fewer (via the carbamic acid, which loses $\mathrm{CO_2}$), or trapped by an alcohol as a carbamate (for example by *tert*-butanol to give a Boc-protected amine directly). Both proceed with **retention** at the migrating carbon. Acyl azides and many low-molecular-mass organic azides are explosive; modern procedures generate them in solution from the acid with diphenylphosphoryl azide and use them without isolation, on small scale or in flow, after a risk assessment.

::: example Caprolactam by the Beckmann rearrangement {#ex-beckmann}
Cyclohexanone oxime is converted industrially into hexano-6-lactam (ε-caprolactam), the monomer of nylon-6. Describe the mechanism and explain why the ring expands.
::: solution
(1) In strong acid (oleum in the classical process), the oxime oxygen is protonated (or sulfonated), turning OH into a good leaving group. (2) The C–C bond of the ring that is anti to the leaving group migrates from carbon to nitrogen as water departs: the bonding pair of that ring bond moves to nitrogen, the N–O bond breaks with its electrons leaving on oxygen, and a cyclic **nitrilium ion** (seven-membered ring containing $\mathrm{C{\equiv}N^+}$) forms. Because a ring bond migrates, nitrogen is inserted into the ring, which grows from six to seven atoms. (3) Water's lone pair attacks the nitrilium carbon; loss of a proton gives the imidic acid (the iminol tautomer). (4) Tautomerisation (proton from O to N) gives the amide, caprolactam. For cyclohexanone oxime both ring carbons are equivalent, so the oxime geometry does not matter. The industrial process produces several million tonnes per year; its main drawback, the ammonium sulfate formed on neutralising the acid, has led to vapour-phase processes over solid acid (zeolite) catalysts ([[green-chemistry/chemical-industry]]).
:::
:::

### The Favorskii rearrangement

An α-halo ketone with an α′-hydrogen reacts with an alkoxide or hydroxide to give a rearranged ester or acid. With 2-chlorocyclohexan-1-one and methoxide, the product is methyl cyclopentanecarboxylate — a **ring contraction**. In words: methoxide removes the α′-proton (on the carbon on the other side of the carbonyl), giving an enolate; the enolate carbon displaces chloride intramolecularly from the α-carbon, closing a strained **cyclopropanone**; methoxide adds to the cyclopropanone carbonyl, giving a tetrahedral alkoxide; this re-forms C=O by breaking one of the cyclopropane bonds — the one that leaves the more stable carbanion, which is immediately protonated by methanol. α-Halo ketones are lachrymators and skin irritants, handled in a fume cupboard.

## Carbenes, carbenoids and nitrenes {#sec-carbenes}

::: definition Carbenes and carbenoids {#def-carbene}
A **carbene** is a neutral species $\mathrm{R_2C\colon}$ with a divalent carbon bearing two non-bonding electrons. In a **singlet** carbene both electrons are paired in an $sp^2$-like orbital, leaving an empty p orbital (so it is both nucleophilic and electrophilic, and reacts in concerted steps); in a **triplet** carbene the two electrons are unpaired in different orbitals (diradical behaviour, stepwise reactions). Methylene, $\mathrm{CH_2}$, has a triplet ground state; carbenes with π-donor substituents (dihalocarbenes, N-heterocyclic carbenes) have singlet ground states. A **carbenoid** is a metal-bound species that transfers a carbene unit without free carbene being formed (the Simmons–Smith reagent $\mathrm{ICH_2ZnI}$; rhodium(II) carbenes from diazo compounds). The nitrogen analogue $\mathrm{RN\colon}$ is a **nitrene**.
:::

**Cyclopropanation.** Singlet carbenes and carbenoids add to alkenes in one concerted step, so the addition is **stereospecific** — a *cis*-alkene gives a *cis*-disubstituted cyclopropane — whereas triplet carbenes, which add stepwise through a diradical that can rotate, give mixtures (Philip Skell's criterion, 1956). Useful sources: **dichlorocarbene** from chloroform and concentrated aqueous sodium hydroxide under phase-transfer catalysis (deprotonation of $\mathrm{CHCl_3}$, then loss of chloride from $\mathrm{CCl_3^-}$, an α-elimination); the **Simmons–Smith** reagent from diiodomethane and a zinc–copper couple or diethylzinc (the Furukawa modification); and **metal carbenes** from diazo compounds such as ethyl diazoacetate with rhodium(II) or copper catalysts. Diazo compounds are toxic and potentially explosive, and diazomethane in particular is a highly toxic, explosive gas; such reagents are used only in specialised conditions or replaced by safer alternatives such as (trimethylsilyl)diazomethane, itself acutely toxic by inhalation.

::: example Stereospecific and directed cyclopropanation {#ex-simmons-smith}
Predict the products of (a) (*Z*)-hex-3-ene and (b) cyclohex-2-en-1-ol with the Simmons–Smith reagent, and explain the stereochemistry.
::: solution
(a) The zinc carbenoid delivers $\mathrm{CH_2}$ to both alkene carbons at once through a "butterfly" transition state: the alkene π electrons attack the $\mathrm{CH_2}$ carbon as the C–I bond breaks (iodide moving onto zinc), and the C–Zn bond electrons form the second new C–C bond. Both bonds form on the same face, so the *cis* relationship of the ethyl groups is retained: ***cis*-1,2-diethylcyclopropane**.

(b) The zinc atom coordinates the hydroxy oxygen, and the carbenoid is delivered to the face of the alkene on the **same side as the OH**: the product is mainly ***cis*-bicyclo[4.1.0]heptan-2-ol** (the cyclopropane *syn* to the hydroxy group), with high diastereoselectivity (Simmons and Smith; directed versions by Winstein). As with the vanadium and titanium epoxidations, a hydroxy group can steer a reagent ([[organic-synthesis/stereoselective-synthesis]]).
:::
:::

**C–H insertion.** Rhodium(II) carboxylate catalysts convert diazo carbonyl compounds into electrophilic metal carbenes that insert into C–H bonds, often intramolecularly to form five-membered rings, with retention at the carbon that is functionalised (Huw Davies and others have developed enantioselective intermolecular versions).

**The Wolff rearrangement.** An α-diazo ketone, on heating, irradiation or with silver(I), loses $\mathrm{N_2}$ with concerted migration of the group on the carbonyl carbon to the former diazo carbon, giving a **ketene**, which adds water, alcohols or amines to give carboxylic acids, esters or amides. Combined with the formation of the diazo ketone from an acyl chloride, it constitutes the **Arndt–Eistert homologation** (one-carbon chain extension of a carboxylic acid), used, for example, to make β-amino acids from α-amino acids with retention of configuration. Ring-contracting Wolff rearrangements of cyclic diazo ketones make strained rings.

## Radicals as synthetic tools {#sec-radicals}

Radical reactions have advantages that complement polar chemistry: radicals are uncharged, so they are little affected by solvent; they tolerate free OH and NH groups and many other functional groups; they react readily at hindered and tertiary centres, which are poor substrates for $\mathrm{S_N2}$; and their intramolecular additions to alkenes make rings rapidly, even when the ring closure creates a quaternary carbon. Their reactivity is controlled through **chain reactions**: the radical concentration is kept tiny, so radical–radical termination is rare, and each radical reacts with a non-radical to give a new radical.

### Tin hydride chemistry and the radical chain

The classic system uses tributyltin hydride, $\mathrm{Bu_3SnH}$, with a small amount of initiator (azobisisobutyronitrile, AIBN, which loses $\mathrm{N_2}$ on heating to give 2-cyanopropan-2-yl radicals). For the reduction of an alkyl bromide RBr to RH:

1. **Initiation.** The initiator radical abstracts the hydrogen atom from $\mathrm{Bu_3Sn{-}H}$ (the weak Sn–H bond, about $310\ \mathrm{kJ\,mol^{-1}}$, breaks homolytically, one electron going to each partner), giving the tributylstannyl radical $\mathrm{Bu_3Sn^\bullet}$.
2. **Propagation, step 1.** $\mathrm{Bu_3Sn^\bullet}$ abstracts the bromine atom from RBr: the C–Br bond breaks homolytically, one electron pairing with the tin radical's electron to form Sn–Br, the other remaining on carbon as the alkyl radical $\mathrm{R^\bullet}$.
3. **Propagation, step 2.** $\mathrm{R^\bullet}$ abstracts a hydrogen atom from $\mathrm{Bu_3SnH}$, forming R–H and regenerating $\mathrm{Bu_3Sn^\bullet}$, which continues the chain.
4. **Termination.** Occasionally two radicals combine.

The same chain removes other groups: in the **Barton–McCombie deoxygenation** (Derek Barton and Stuart McCombie, 1975), an alcohol is converted into a thiocarbonyl derivative (a xanthate or thiocarbonylimidazolide); the tin radical adds to the sulfur, the C–O bond fragments to give the alkyl radical and a stable carbonyl compound, and the alkyl radical is reduced by $\mathrm{Bu_3SnH}$. Organotin compounds are toxic and their residues hard to remove from products, so silanes (tris(trimethylsilyl)silane, TTMSS), catalytic tin with a stoichiometric borohydride, and **photoredox catalysis** (from 2008, with visible-light-absorbing ruthenium, iridium or organic dyes that transfer single electrons, developed by David MacMillan, Tehshik Yoon, Corey Stephenson and others) are now preferred.

### Radical cyclisation and its kinetics

If the radical $\mathrm{R^\bullet}$ contains an alkene suitably placed, it can add intramolecularly before it meets a tin hydride molecule. The hex-5-en-1-yl radical cyclises rapidly, and almost exclusively in the **5-*exo*-trig** mode — forming a five-membered ring with the radical outside it, the cyclopentylmethyl radical — rather than 6-*endo*-trig to the cyclohexyl radical (about 98:2), even though the cyclohexyl radical is more stable. The preference is stereoelectronic: the radical must approach the alkene carbon at about $107^\circ$ (as for nucleophilic attack on C=O), which a five-atom tether achieves more easily for the nearer carbon (Athelstan Beckwith's guidelines, 1970s–80s, which parallel Jack Baldwin's rules of 1976 for polar ring closures).

::: proposition Competition between cyclisation and reduction {#prop-clock}
Let a radical $\mathrm{R^\bullet}$ either cyclise (first-order rate constant $k_\mathrm{c}$) or be reduced by $\mathrm{Bu_3SnH}$ (second-order rate constant $k_\mathrm{H}$). If the tin hydride concentration is effectively constant (pseudo-first-order conditions, or slow addition of tin hydride), the ratio of cyclised to uncyclised products is
$$
\frac{[\text{cyclised}]}{[\text{uncyclised}]} = \frac{k_\mathrm{c}}{k_\mathrm{H}[\mathrm{Bu_3SnH}]}.
$$ {#eq-clock}
If $k_\mathrm{c}$ is known (a **radical clock**), measuring the ratio gives $k_\mathrm{H}$, and vice versa.
:::

::: proof
Each radical $\mathrm{R^\bullet}$ formed has two fates; the probability that it cyclises is $k_\mathrm{c}/(k_\mathrm{c} + k_\mathrm{H}[\mathrm{Bu_3SnH}])$ and that it is reduced is $k_\mathrm{H}[\mathrm{Bu_3SnH}]/(k_\mathrm{c} + k_\mathrm{H}[\mathrm{Bu_3SnH}])$, independent of the radical's history. (The cyclised radical is then reduced too, but that does not change the branching.) The ratio of the two probabilities is [[#eq-clock]]. When $[\mathrm{Bu_3SnH}]$ changes during the reaction, the ratio at each moment is given by the instantaneous concentration, and the overall ratio is obtained by integration. $\blacksquare$
:::

For the hex-5-enyl radical at $25\ ^\circ\mathrm{C}$, $k_\mathrm{c} = 2.3\times10^{5}\ \mathrm{s^{-1}}$, and the rate constant for hydrogen-atom transfer from $\mathrm{Bu_3SnH}$ to a primary alkyl radical is $k_\mathrm{H} = 2.4\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ (Chatgilialoglu, Ingold and Scaiano, 1981). Cyclisation is therefore favoured only when $[\mathrm{Bu_3SnH}]$ is well below $k_\mathrm{c}/k_\mathrm{H} \approx 0.1\ \mathrm{mol\,dm^{-3}}$.

::: widget plot
f: 100*k/(k + 2.4*x)
x: 0, 0.2
y: 0, 100
sliders: k=0.23:0.01:10:0.01
labels: \text{cyclised product (\%)}
vlines: 0.005; 0.1
caption: Percentage of cyclised product against the tin hydride concentration (in $\mathrm{mol\,dm^{-3}}$), from [[#eq-clock]] with $k_\mathrm{H} = 2.4\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ and $k_\mathrm{c} = k \times 10^{6}\ \mathrm{s^{-1}}$. The default, $k = 0.23$, is the hex-5-enyl radical at $25\ ^\circ\mathrm{C}$: at $0.1\ \mathrm{mol\,dm^{-3}}$ only half the radicals cyclise, but at $0.005\ \mathrm{mol\,dm^{-3}}$ (left line) $95\,\%$ do. This is why radical cyclisations are run at high dilution or with the tin hydride added slowly by syringe pump. Faster clocks (raise $k$: the cyclopropylmethyl radical opens with $k_\mathrm{c} \approx 10^{8}\ \mathrm{s^{-1}}$) are almost immune to reduction, while slow cyclisations (6-*exo* closures are about 40 times slower than 5-*exo*) need very low hydride concentrations.
:::

::: example Planning a radical cyclisation {#ex-cyclisation}
6-Bromohex-1-ene is treated with $\mathrm{Bu_3SnH}$ and AIBN. Predict the two main products and their ratio when the tin hydride concentration is held at (a) $0.10$ and (b) $0.010\ \mathrm{mol\,dm^{-3}}$ (25 °C rate constants as above). What would you do to obtain more than 95 % cyclisation?
::: solution
The stannyl radical abstracts Br, giving the hex-5-en-1-yl radical. It either abstracts H from $\mathrm{Bu_3SnH}$ (giving **hex-1-ene**) or cyclises 5-*exo* (the radical carbon adds to C5 of the alkene; one electron of the π bond pairs with the radical's electron to form the new C–C bond, and the other electron is left on C6, now a primary radical outside the ring), giving the cyclopentylmethyl radical, which is reduced to **methylcyclopentane**.

(a) Ratio $= 2.3\times10^{5}/(2.4\times10^{6} \times 0.10) = 0.96$: about 49 % methylcyclopentane, 51 % hex-1-ene.

(b) Ratio $= 2.3\times10^{5}/(2.4\times10^{6} \times 0.010) = 9.6$: about 91 % methylcyclopentane.

For more than 95 % (ratio above 19), $[\mathrm{Bu_3SnH}] < 2.3\times10^{5}/(19 \times 2.4\times10^{6}) = 5.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$: add the tin hydride slowly (syringe pump) to a dilute solution of the bromide, or use catalytic $\mathrm{Bu_3SnCl}$ with sodium cyanoborohydride as the stoichiometric reductant, which keeps the tin hydride concentration low throughout. (The ratio of the two fates is independent of the bromide concentration, since both steps follow formation of the same radical.)
:::
:::

Radical cyclisations shine in **cascade** reactions. Dennis Curran's synthesis of the triquinane hirsutene (1985) closed two five-membered rings in one tandem radical cyclisation: a primary radical cyclised 5-*exo* onto an alkene, and the new radical cyclised 5-*exo* again onto an alkyne, giving a vinyl radical that was reduced by tin hydride. The cascade built the linearly fused tricyclic skeleton with correct relative stereochemistry in one operation. Radicals also add intermolecularly to electron-poor alkenes (the **Giese reaction**), and atom-transfer radical additions and cyclisations use halogen transfer instead of hydride to propagate the chain.

::: widget graph
nodes: Bu3Sn•@0,2; R-Br@2,4; R•@4,2; cyclised R'•@4,0; R'-H@2,-1; Bu3SnH@0,0; R-H@6,3
edges: Bu3Sn•>R•:1; R-Br>R•; R•>cyclised R'•:2; cyclised R'•>R'-H:3; Bu3SnH>R'-H; R'-H>Bu3Sn•; R•>R-H:4
algorithm: none
caption: The propagation steps of a tin hydride radical cyclisation as a directed network. Step 1: $\mathrm{Bu_3Sn^\bullet}$ abstracts bromine from R–Br, giving the radical $\mathrm{R^\bullet}$. Step 2: $\mathrm{R^\bullet}$ cyclises ($k_\mathrm{c}$) to $\mathrm{R'^\bullet}$. Step 3: $\mathrm{R'^\bullet}$ abstracts H from $\mathrm{Bu_3SnH}$, giving the cyclised product R′–H and regenerating $\mathrm{Bu_3Sn^\bullet}$, which closes the chain. Step 4 is the competing branch: $\mathrm{R^\bullet}$ is reduced before it cyclises, giving R–H (and also regenerating the tin radical, not drawn). The competition at the node $\mathrm{R^\bullet}$ — first-order cyclisation against second-order reduction — is what [[#prop-clock]] quantifies.
:::

::: algorithm Designing a reaction through a reactive intermediate {#alg-intermediate}
1. **Identify the intermediate** that the conditions will generate (carbocation from acid and an alcohol or alkene; carbene from a diazo compound or α-elimination; radical from a halide, xanthate or photoredox step).
2. **List its possible fates**: for a cation, 1,2-shifts, elimination, capture by nucleophiles; for a carbene, cyclopropanation, insertion, Wolff rearrangement; for a radical, cyclisation, fragmentation, atom transfer, reduction.
3. **Estimate the relative rates** using known clocks and selectivity rules (cation stability and migratory aptitude, [[#prop-shift-stereo]]; 5-*exo* over 6-*endo*; [[#prop-clock]]).
4. **Adjust the conditions** to favour the desired fate: concentration of trapping agent, temperature, Lewis acid, catalyst.
5. **Check stereochemistry**: retention of migrating groups, anti-periplanar alignment, stereospecific carbene addition, and the chair-like transition states of radical cyclisations.
6. **Review hazards** of the precursors (diazo compounds, azides, organotin reagents) and choose the safest equivalent.
:::

::: quiz
In the Beckmann rearrangement of the (*E*)-oxime of acetophenone (phenyl *anti* to OH), which product forms?
- [x] $N$-Phenylacetamide (acetanilide), $\mathrm{CH_3CONHPh}$
- [ ] $N$-Methylbenzamide, $\mathrm{PhCONHCH_3}$
- [ ] Benzonitrile and methanol
- [ ] Acetophenone and hydroxylamine only
::: solution
The group anti to the departing leaving group migrates to nitrogen ([[#prop-shift-stereo]]). In the (*E*)-oxime the phenyl group is anti to OH, so phenyl migrates: the nitrilium ion $\mathrm{CH_3C{\equiv}N^+Ph}$ is attacked by water and tautomerises to acetanilide. Methyl migration would give $N$-methylbenzamide, from the (*Z*)-oxime. Hydrolysis back to the ketone can compete in aqueous acid but is not the rearrangement product.
:::
:::

::: warning Carbocations rearrange whether you want them to or not {#warn-rearrange}
Whenever a reaction passes through a carbocation, ask whether a 1,2-shift can give a more stable cation. The acid-catalysed hydration of 3,3-dimethylbut-1-ene gives mainly 2,3-dimethylbutan-2-ol, not 3,3-dimethylbutan-2-ol, because the secondary cation undergoes a methyl shift to the tertiary cation before water attacks. Friedel–Crafts alkylation of benzene with 1-chloropropane gives mainly isopropylbenzene (cumene). Neopentyl systems ionise with simultaneous methyl migration. The remedy in synthesis is to avoid free cations where rearrangement would be harmful — use $\mathrm{S_N2}$ conditions, Friedel–Crafts acylation followed by reduction instead of alkylation, or oxymercuration and hydroboration instead of acid-catalysed hydration — or, conversely, to design the substrate so that the rearrangement you want is the fastest pathway.
:::

::: history
Rudolph Fittig observed the conversion of pinacol into pinacolone in 1860, and Georg Wagner (1899) and Hans Meerwein (1914–1922) explained terpene skeletal rearrangements; Meerwein's proposal of a carbocation intermediate in the camphene hydrochloride rearrangement (1922) was one of the founding ideas of physical organic chemistry. Ernst Otto Beckmann discovered his rearrangement in 1886, August Wilhelm von Hofmann his in 1881, Theodor Curtius his in 1890, Ludwig Wolff his in 1902 and Alexei Favorskii his in 1894. Howard Simmons and Ronald Smith reported the zinc carbenoid cyclopropanation in 1958, and William von Eggers Doering and Philip Skell clarified carbene spin and stereochemistry in the 1950s. Moses Gomberg's triphenylmethyl radical (1900) proved that carbon radicals exist; the synthetic use of radical chains with tin hydrides grew from the 1960s (Henry Kuivila) and was made predictable by Athelstan Beckwith's cyclisation studies, Keith Ingold's absolute rate constants and Derek Barton's deoxygenation (1975). Dennis Curran's tandem radical cyclisations (1985) and Gilbert Stork's vinyl radical cyclisations showed that radicals could build complex polycyclic natural products.
:::

## Where this leads

Cationic cyclisations and rearrangements are central to the biosynthesis and laboratory synthesis of terpenes and steroids, the subject of the polyene cyclisation case study in [[organic-synthesis/total-synthesis]]. Radical clocks and the kinetic methods behind them are discussed in [[kinetics/chain-reactions]], radical polymerisation in [[polymer-chemistry/radical-polymerisation]], and metal carbenes in [[organometallics-catalysis/metathesis-polymerisation]]. The Baeyer–Villiger oxidation, the oxygen analogue of the Beckmann rearrangement, was treated in [[organic-synthesis/redox-in-synthesis]].

::: summary
- In 1,2-shifts a group migrates with its electron pair to an adjacent electron-deficient centre; it is the group anti-periplanar to the leaving group, and it keeps its configuration.
- Pinacol rearrangement: first the more stable cation forms, then a neighbouring group migrates, giving a carbonyl; ring versions (semipinacol, Tiffeneau–Demjanov) expand or contract rings.
- Migration to nitrogen: Beckmann (oxime → amide; anti group migrates; caprolactam), Hofmann and Curtius (amide or acyl azide → isocyanate → amine with one carbon fewer, retention); Favorskii (α-halo ketone → ester via cyclopropanone; ring contraction).
- Singlet carbenes and carbenoids (Simmons–Smith, Rh(II) carbenes) cyclopropanate stereospecifically and can be directed by OH; the Wolff rearrangement gives ketenes (Arndt–Eistert homologation). Diazo compounds and azides are serious hazards.
- Radical chains (initiation, propagation, termination) with $\mathrm{Bu_3SnH}$ or safer alternatives reduce halides and xanthates and drive 5-*exo*-trig cyclisations.
- Cyclised : uncyclised $= k_\mathrm{c}/(k_\mathrm{H}[\mathrm{Bu_3SnH}])$; for hex-5-enyl ($k_\mathrm{c} = 2.3\times10^{5}\ \mathrm{s^{-1}}$) keep $[\mathrm{Bu_3SnH}]$ below about $5\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ for 95 % cyclisation.
:::

## Exercises

::: exercise A radical clock ratio {level=1 check="1.9"}
For the hex-5-enyl radical at $25\ ^\circ\mathrm{C}$ ($k_\mathrm{c} = 2.3\times10^{5}\ \mathrm{s^{-1}}$; $k_\mathrm{H} = 2.4\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$), what is the ratio of methylcyclopentane to hex-1-ene at $[\mathrm{Bu_3SnH}] = 0.050\ \mathrm{mol\,dm^{-3}}$? (Enter the ratio to two significant figures.)
::: solution
$2.3\times10^{5}/(2.4\times10^{6} \times 0.050) = 2.3\times10^{5}/1.2\times10^{5} = 1.9$ ([[#eq-clock]]).
:::
:::

::: exercise Benzopinacol {level=1}
Predict the product of treating 1,1,2,2-tetraphenylethane-1,2-diol (benzopinacol) with acid, and describe the key step.
::: solution
Protonation of either OH and loss of water give the triphenyl-substituted carbocation $\mathrm{Ph_2C^+{-}C(OH)Ph_2}$, stabilised by two phenyl rings. A phenyl group on the neighbouring carbon migrates with its bonding pair to the cationic carbon; the positive charge moves to the carbinol carbon and is stabilised by the oxygen lone pair; loss of the proton gives **1,2,2,2-tetraphenylethan-1-one** (benzopinacolone, $\mathrm{Ph_3C{-}CO{-}Ph}$).
:::
:::

::: exercise A Beckmann rearrangement and a medicine {level=1}
The (*E*)-oxime of 1-(4-hydroxyphenyl)ethan-1-one (aryl group anti to OH) undergoes a Beckmann rearrangement. What is the product?
::: solution
The aryl group anti to OH migrates to nitrogen, giving $N$-(4-hydroxyphenyl)acetamide — **paracetamol**. This Beckmann route (Hoechst-Celanese) is an industrial alternative to the acetylation of 4-aminophenol ([[organic-synthesis/retrosynthesis#ex-paracetamol]]).
:::
:::

::: exercise Hydride concentration for 95 % cyclisation {level=2 check="0.0050"}
What is the maximum constant $\mathrm{Bu_3SnH}$ concentration that still gives at least $95\,\%$ cyclisation of the hex-5-enyl radical at $25\ ^\circ\mathrm{C}$? (Enter the concentration in $\mathrm{mol\,dm^{-3}}$, to two significant figures.)
::: solution
95 % cyclised means a ratio of $95/5 = 19$: $[\mathrm{Bu_3SnH}] = k_\mathrm{c}/(19k_\mathrm{H}) = 2.3\times10^{5}/(19 \times 2.4\times10^{6}) = 5.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ ([[#ex-cyclisation]]).
:::
:::

::: exercise Stereospecific cyclopropanation {level=2}
Predict the products of (a) (*E*)-but-2-ene with dichlorocarbene (from $\mathrm{CHCl_3}$, NaOH, phase-transfer catalyst) and (b) (*Z*)-but-2-ene with triplet methylene generated photochemically in the gas phase. Explain the difference in stereochemistry.
::: solution
(a) Dichlorocarbene is a ground-state singlet; it adds in one concerted step to both carbons from the same face, retaining the alkene geometry: ***trans*-1,1-dichloro-2,3-dimethylcyclopropane** (racemic). (b) A triplet carbene adds to one carbon first, giving a 1,3-diradical whose two unpaired electrons have parallel spins and cannot immediately pair to form the second bond; before spin inversion allows ring closure, rotation about the former C=C bond occurs, so a mixture of *cis*- and *trans*-1,2-dimethylcyclopropane forms. Stereospecificity is Skell's test for singlet versus triplet carbenes.
:::
:::

::: exercise The Favorskii ring contraction {level=2}
Give the mechanism, naming every electron movement, of the conversion of 2-chlorocyclohexan-1-one into methyl cyclopentanecarboxylate with sodium methoxide in methanol.
::: solution
(1) Methoxide removes a proton from C6 (the α′-carbon), the C–H electrons forming the enolate C=C (C1=C6) with negative charge on oxygen. (2) The enolate's C6 attacks C2 from the back, the C2–Cl bond breaking with chloride leaving, closing a cyclopropanone fused to a five-membered ring (bicyclo[3.1.0]hexan-6-one). (3) Methoxide's lone pair attacks the strained cyclopropanone carbonyl carbon, the π electrons moving onto oxygen. (4) The alkoxide's lone pair re-forms C=O, and one of the two cyclopropane bonds to the former carbonyl carbon breaks, its electrons going to carbon as a carbanion (the two bonds are equivalent here); the carbanion is protonated by methanol. The ring has lost one carbon to the ester: **methyl cyclopentanecarboxylate**.
:::
:::

::: exercise Deriving the clock equation with consumption of hydride {level=3}
In a radical cyclisation run with an initial tin hydride concentration $[\mathrm{H}]_0$ and substrate concentration $[\mathrm{S}]_0 = [\mathrm{H}]_0$, the hydride is consumed as the reaction proceeds (one molecule per product molecule). Show that $\mathrm{d}U/\mathrm{d}C = k_\mathrm{H}[\mathrm{H}]/k_\mathrm{c}$, where $U$ and $C$ are the concentrations of uncyclised and cyclised product, and explain qualitatively why the overall ratio $C/U$ is larger than $k_\mathrm{c}/(k_\mathrm{H}[\mathrm{H}]_0)$.
::: hint
Each radical has two competing fates; both products consume one hydride.
:::
::: solution
At any moment radicals are formed at some rate $v$, and each radical cyclises with probability $p_\mathrm{c} = k_\mathrm{c}/(k_\mathrm{c} + k_\mathrm{H}[\mathrm{H}])$ or is reduced directly with probability $1 - p_\mathrm{c}$ (the steady-state radical concentration cancels). So $\mathrm{d}C/\mathrm{d}t = vp_\mathrm{c}$ and $\mathrm{d}U/\mathrm{d}t = v(1 - p_\mathrm{c})$, giving $\mathrm{d}U/\mathrm{d}C = (1 - p_\mathrm{c})/p_\mathrm{c} = k_\mathrm{H}[\mathrm{H}]/k_\mathrm{c}$. Because $[\mathrm{H}] = [\mathrm{H}]_0 - (C + U)$ falls as the reaction proceeds, $\mathrm{d}U/\mathrm{d}C$ decreases, and later in the reaction a larger fraction of radicals cyclise. The integrated ratio therefore exceeds the initial value $k_\mathrm{c}/(k_\mathrm{H}[\mathrm{H}]_0)$; precise rate measurements use a large excess of hydride (so $[\mathrm{H}] \approx [\mathrm{H}]_0$) or integrate the expression exactly. This is the reasoning behind using "radical clocks" to calibrate rate constants (Beckwith, Ingold).
:::
:::

::: exercise An amine by the Curtius rearrangement {level=3}
Convert (*S*)-2-methylbutanoic acid into (*S*)-butan-2-amine. Explain why the configuration is retained, and identify the main hazard and how modern procedures manage it.
::: hint
The stereocentre is the carbon that migrates.
:::
::: solution
**Sequence.** (1) Treat the acid with diphenylphosphoryl azide and triethylamine (the carboxylate attacks phosphorus, displacing azide; azide then attacks the activated acyl carbon, displacing diphenyl phosphate), forming the acyl azide in solution. (2) Warm gently: the acyl azide loses $\mathrm{N_2}$ — the N–N bond to the departing dinitrogen breaks with its electrons going to the remaining nitrogen while the *sec*-butyl group migrates with its bonding pair from the carbonyl carbon to that nitrogen — in one concerted step, giving (*S*)-2-isocyanatobutane. (3) Trap the isocyanate with *tert*-butanol (the alcohol oxygen attacks the isocyanate carbon) to give the Boc-protected amine, then remove Boc with acid ([[organic-synthesis/protecting-groups]]); or hydrolyse the isocyanate directly with aqueous acid (via the carbamic acid, which loses $\mathrm{CO_2}$). Product: (*S*)-butan-2-amine. **Retention**: the migrating carbon never becomes free; it moves with its bonding pair across one face ([[#prop-shift-stereo]]), so the spatial arrangement of its other three substituents is unchanged. The CIP descriptor stays *S* because the priority order (N > ethyl > methyl > H, replacing C(=O) > ethyl > methyl > H) is unchanged. **Hazard**: acyl azides are potentially explosive and hydrazoic acid, which can form in acid, is highly toxic and explosive; modern procedures never isolate the acyl azide, keep it in dilute solution, work on small scale or in continuous flow (small inventory at any moment), and follow a written risk assessment.
:::
:::

::: exercise Ring expansion by the Tiffeneau–Demjanov reaction {level=3}
1-(Aminomethyl)cyclohexan-1-ol reacts with nitrous acid (from sodium nitrite and aqueous acid, at 0 °C) to give cycloheptanone. Propose a mechanism and explain why the ring bond migrates rather than the hydroxy group being lost.
::: solution
(1) Nitrous acid forms the nitrosonium ion $\mathrm{NO^+}$; the primary amine's lone pair attacks it, and after proton transfers and loss of water, the primary **diazonium ion** $\mathrm{R{-}CH_2{-}N_2^+}$ forms. (2) Dinitrogen, an exceptionally good leaving group, departs from the $\mathrm{CH_2}$ carbon; concerted with its departure, a ring C–C bond on the neighbouring carbinol carbon (anti-periplanar to the C–N bond) migrates with its electron pair to the $\mathrm{CH_2}$ carbon, avoiding a primary carbocation. The ring now contains seven carbons, and the positive charge sits on the former carbinol carbon, stabilised by the hydroxy oxygen's lone pair as a protonated ketone. (3) Loss of the proton gives **cycloheptanone**. The hydroxy group is not lost because the electron-deficient centre is generated on the *adjacent* carbon; the OH then plays the role of the "push" that makes the migration favourable (the semipinacol pattern), and the formation of C=O drives the reaction. Nitrous acid decomposes to toxic nitrogen oxides, and diazonium salts must not be isolated; the reaction is run cold, in solution, in a fume cupboard.
:::
:::
