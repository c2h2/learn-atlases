A polyethylene carrier bag and a block of paraffin wax are made of the same atoms bonded in the same way: long saturated chains of $\mathrm{CH_2}$ groups. Yet the wax crumbles under a fingernail and melts in a warm hand, while the bag stretches to several times its length before it tears and survives boiling water. The difference is length. A wax molecule holds twenty to forty carbon atoms; a chain in the bag holds tens of thousands. Once molecules are that long they entangle with one another like cooked spaghetti, and properties appear that no small molecule has: rubbery elasticity, drawing into fibres, solutions thousands of times more viscous than the solvent, and a glass transition instead of a sharp melting point. That chemistry is the subject of this course, and it starts with a question that small-molecule chemistry never asks. When a sample is not made of identical molecules, *what is its molar mass?*

A sample of a synthetic polymer always contains chains of many different lengths. A bottle of benzene holds one molecular species; a bottle of polystyrene holds millions of them. The chains may also differ in the order in which their units are joined, in the spatial arrangement of their substituents, and in how they branch. This chapter sets up the language of polymer structure. We cover repeat units and the degree of polymerisation, how polymers are named, the regiochemistry and stereochemistry of chains (*tacticity*), and the averages, especially the number-average and weight-average molar masses and their ratio, the *dispersity*, that replace the single molar mass of a pure compound. Every later chapter uses these ideas. The kinetics of [[polymer-chemistry/step-growth]] and [[polymer-chemistry/radical-polymerisation]] predicts the averages, [[polymer-chemistry/polymer-characterisation]] measures them, and [[polymer-chemistry/polymer-properties]] explains why they control strength, melt viscosity and the glass transition.

## Chains, repeat units and the degree of polymerisation

The word *polymer* comes from the Greek *poly* (many) and *meros* (part). A polymer molecule, or **macromolecule**, is built by repeatedly joining small molecules called **monomers**. What the chain is made of is described by its **constitutional repeating unit**, the smallest group of atoms whose repetition builds the chain.

::: definition Polymer, repeat unit and degree of polymerisation {#def-repeat-unit}
A **polymer** is a substance made of macromolecules: molecules of high relative molar mass whose structure consists essentially of many repetitions of units derived from molecules of low molar mass. The **constitutional repeating unit** (CRU) is the smallest constitutional unit whose repetition describes the chain. In vinyl polymers it is usually the **monomer unit** $-\mathrm{CH_2{-}CHX}-$; in condensation polymers it may contain the residues of two monomers.

The **degree of polymerisation** $X$ of a chain is the number of monomer units it contains. For a chain of molar mass $M$ built from units of molar mass $M_0$, ignoring the end groups,
$$
X = \frac{M}{M_0}.
$$ {#eq-dp}
Polymers with $X$ of roughly 10 or fewer are called **oligomers**. Commodity plastics have $X$ of $10^{3}$ to $10^{5}$.
:::

The end groups matter for chemistry: they are where chains react, and in [[polymer-chemistry/step-growth]] counting them is how the reaction is followed. For the mass of a long chain, though, they are negligible. Two end groups on a chain of a thousand units change $M$ by about a tenth of a percent. We include end groups only for oligomers or when they are being measured (end-group analysis, [[#ex-end-group]]).

Chains also differ in **architecture**:

- **Linear** chains have two ends and no branch points (high-density polyethylene is nearly linear).
- **Branched** chains carry side chains. *Short* branches of a few carbons, as in low-density polyethylene (LDPE) and linear low-density polyethylene (LLDPE), break up crystallinity. *Long* branches comparable in length to the backbone change the melt rheology.
- **Star**, **comb** and **dendritic** architectures have many arms joined at a core or along a backbone.
- **Networks** (crosslinked polymers) are joined into one giant molecule that spans the sample. They swell in solvents but do not dissolve, and they do not flow when heated. Vulcanised rubber and epoxy resins are networks.

The traditional industrial split into **thermoplastics** (linear or branched, soften and flow on heating, can be remoulded) and **thermosets** (networks, set irreversibly when cured) is a statement about architecture. It is one reason recycling thermosets is so hard; [[polymer-chemistry/functional-polymers]] looks at chemistry designed to get round it.

::: example Degree of polymerisation of three commodity polymers {#ex-dp}
A polystyrene has $M = 2.50\times10^{5}\ \mathrm{g\,mol^{-1}}$, a polyethylene has $M = 1.40\times10^{5}\ \mathrm{g\,mol^{-1}}$ and a poly(vinyl chloride) has $M = 6.25\times10^{4}\ \mathrm{g\,mol^{-1}}$. Find the degree of polymerisation of each, and the number of backbone carbon atoms in the polyethylene chain.
::: solution
The monomer-unit molar masses, from IUPAC standard atomic weights ($\mathrm{C} = 12.011$, $\mathrm{H} = 1.008$, $\mathrm{Cl} = 35.45$), are:

- styrene unit $\mathrm{C_8H_8}$: $8(12.011) + 8(1.008) = 104.15\ \mathrm{g\,mol^{-1}}$;
- ethylene unit $\mathrm{C_2H_4}$: $28.05\ \mathrm{g\,mol^{-1}}$;
- vinyl chloride unit $\mathrm{C_2H_3Cl}$: $62.50\ \mathrm{g\,mol^{-1}}$.

Then from [[#eq-dp]]:
$$
X_\text{PS} = \frac{2.50\times10^{5}}{104.15} = 2.40\times10^{3},\qquad
X_\text{PE} = \frac{1.40\times10^{5}}{28.05} = 4.99\times10^{3},\qquad
X_\text{PVC} = \frac{6.25\times10^{4}}{62.50} = 1.00\times10^{3}.
$$
Each ethylene unit adds two backbone carbons, so the polyethylene chain has about $2\times4.99\times10^{3} \approx 1.00\times10^{4}$ carbons in its backbone. That is about 300 times a paraffin wax molecule. The masses are given to three significant figures, so the answers are too. The end groups (two H atoms or initiator fragments) change nothing at this precision.
:::
:::

## Naming polymers

Two naming systems are in use, and you need to read both.

**Source-based names** say which monomer the polymer was made from: poly + the monomer name, with the monomer name in parentheses if it has more than one word or contains a locant. Examples are polyethylene, polystyrene, poly(vinyl chloride), poly(methyl methacrylate) and poly(ethylene terephthalate). These are the names used in industry and in most of the literature, and IUPAC accepts them.

**Structure-based names** (IUPAC) name the constitutional repeating unit as a bivalent group, written in a preferred direction, so that the name describes the chain whatever it was made from. Polyethylene becomes *poly(methylene)*, because the smallest repeating unit is $-\mathrm{CH_2}-$. Polystyrene is *poly(1-phenylethylene)*, PVC is *poly(1-chloroethylene)*, poly(methyl methacrylate) is *poly[1-(methoxycarbonyl)-1-methylethylene]*, and poly(ethylene terephthalate) is *poly(oxyethyleneoxyterephthaloyl)*. Structure-based names are unambiguous where source-based names are not. Poly(vinyl alcohol) is a good example: it cannot be made from "vinyl alcohol", which is the unstable enol of acetaldehyde, and is actually made by hydrolysing poly(vinyl acetate).

The polyamides keep a numerical shorthand. **Nylon-6,6** is made from a diamine with six carbons (hexane-1,6-diamine) and a diacid with six carbons (hexanedioic acid, adipic acid). Its repeat unit, $-\mathrm{NH(CH_2)_6NH{-}CO(CH_2)_4CO}-$, contains both residues. **Nylon-6** is made from one monomer with six carbons, caprolactam, and has repeat unit $-\mathrm{NH(CH_2)_5CO}-$. The numbers count carbons, not repeat units.

| polymer | abbreviation | monomer unit | structure-based name |
|---|---|---|---|
| polyethylene | PE | $-\mathrm{CH_2CH_2}-$ | poly(methylene) |
| polypropylene | PP | $-\mathrm{CH_2CH(CH_3)}-$ | poly(1-methylethylene) |
| polystyrene | PS | $-\mathrm{CH_2CH(C_6H_5)}-$ | poly(1-phenylethylene) |
| poly(vinyl chloride) | PVC | $-\mathrm{CH_2CHCl}-$ | poly(1-chloroethylene) |
| poly(methyl methacrylate) | PMMA | $-\mathrm{CH_2C(CH_3)(CO_2CH_3)}-$ | poly[1-(methoxycarbonyl)-1-methylethylene] |
| poly(tetrafluoroethylene) | PTFE | $-\mathrm{CF_2CF_2}-$ | poly(difluoromethylene) |
| poly(ethylene terephthalate) | PET | $-\mathrm{OCH_2CH_2O{-}CO{-}C_6H_4{-}CO}-$ | poly(oxyethyleneoxyterephthaloyl) |
| nylon-6,6 | PA66 | $-\mathrm{NH(CH_2)_6NH{-}CO(CH_2)_4CO}-$ | poly[imino(1,6-dioxohexane-1,6-diyl)iminohexane-1,6-diyl] |

## Constitution and configuration along the chain

Writing $-\mathrm{CH_2CHX}-$ hides three structural questions. They matter because each changes how chains pack, and so whether the polymer crystallises.

**Regiochemistry.** A vinyl monomer $\mathrm{CH_2{=}CHX}$ has two different ends: the unsubstituted $\mathrm{CH_2}$ (the *tail*) and the substituted $\mathrm{CHX}$ (the *head*). A radical or ion almost always adds to the $\mathrm{CH_2}$ end. This gives the more stable, substituted active centre ($\mathrm{\sim CH_2{-}\dot{C}HX}$) and avoids steric clash at the substituted carbon. Repeated, this gives a **head-to-tail** chain, $-\mathrm{CH_2CHX{-}CH_2CHX}-$, with substituents on alternate carbons (1,3 placement). Occasional "wrong-way" additions give **head-to-head** ($-\mathrm{CHX{-}CHX}-$) and **tail-to-tail** ($-\mathrm{CH_2{-}CH_2}-$) links. They make up about 1% of the units in polystyrene and more in poly(vinyl fluoride) and poly(vinylidene fluoride), whose small fluorine substituent gives little steric preference. Head-to-head links are weak points. In PVC, the irregular structures that arise from wrong-way additions and transfer reactions are among the labile sites where dehydrochlorination starts when the polymer is heated, which is why PVC needs heat stabilisers.

**Geometric isomerism in polydienes.** A conjugated diene such as buta-1,3-diene can add through both double bonds (*1,4-addition*), leaving a backbone double bond $-\mathrm{CH_2CH{=}CHCH_2}-$ that is *cis* or *trans*, or through one double bond only (*1,2-addition*), leaving a pendant vinyl group. In isoprene (2-methylbuta-1,3-diene) the 3,4-adduct also occurs. Nature makes the two pure 1,4 isomers. **Natural rubber** from *Hevea brasiliensis* is essentially 100% *cis*-1,4-polyisoprene, an elastomer with a glass transition near $-70\ ^\circ\mathrm{C}$. **Gutta-percha** is *trans*-1,4-polyisoprene: it crystallises easily, is hard at room temperature, and was used to insulate the first submarine telegraph cables. The same atoms with a different double-bond geometry give a rubber in one case and a hard plastic in the other.

**Stereochemistry: tacticity.** In a head-to-tail vinyl polymer every $\mathrm{CHX}$ carbon is a **stereocentre**: its four substituents are H, X and two chain segments of different length. (The carbon is stereogenic but not usefully chiral. Far from the chain ends the two segments look alike, so a long chain does not rotate polarised light measurably. What matters is the *relative* configuration of neighbouring centres.) Draw the backbone as a zigzag in the plane of the page. Each X then points either towards you or away from you.

::: definition Tacticity, dyads and triads {#def-tacticity}
The **tacticity** of a vinyl polymer is the regularity of the relative configuration of successive stereocentres along the chain.

- A **dyad** is a pair of neighbouring stereocentres. It is **meso** ($m$) if the two substituents lie on the same side of the planar zigzag, and **racemo** ($r$) if they lie on opposite sides.
- A **triad** is three neighbouring stereocentres, described by two successive dyads: **isotactic** $mm$, **heterotactic** $mr$ (equivalent to $rm$), and **syndiotactic** $rr$.
- An **isotactic** polymer has all dyads $m$ (all substituents on one side). A **syndiotactic** polymer has all dyads $r$ (alternating sides). An **atactic** polymer has a random sequence of $m$ and $r$.

Longer sequences (tetrads $mmm$, $mmr$, $rmr$, $mrm$, $rrm$, $rrr$; pentads; …) are defined in the same way. The fractions of $n$-ads are measured by NMR spectroscopy, because nuclei in $mm$, $mr$ and $rr$ environments have different chemical shifts.
:::

Tacticity is not a detail. Atactic polystyrene, the material of disposable cups and packaging foam, is an amorphous glass: its random sequence of configurations cannot pack into a lattice. Syndiotactic polystyrene, made with metallocene catalysts, crystallises and melts near $270\ ^\circ\mathrm{C}$. Atactic polypropylene is a soft, sticky material of little value. Isotactic polypropylene, made by Ziegler–Natta catalysis ([[polymer-chemistry/controlled-polymerisation]]), is a crystalline thermoplastic melting near $165\ ^\circ\mathrm{C}$ and one of the two largest-volume plastics in the world. The difference is just the relative configuration of neighbouring methyl-bearing carbons, the same kind of stereochemistry that [[organic-1/stereochemistry]] treats for small molecules, repeated thousands of times.

### Statistics of stereosequences

How is an $mm$ triad fraction of 0.04 interpreted? If the configuration of each newly added unit is decided only by the dyad it forms with the chain end, and the probability of forming an $m$ dyad is the same at every step, then the chain is a sequence of independent trials. This **Bernoullian** model fits many radical polymerisations, where the chain end is a planar radical with little memory of the stereochemistry further back.

::: proposition Bernoullian triad statistics {#prop-bernoulli}
Suppose each new dyad is formed independently, *meso* with probability $P_m$ and *racemo* with probability $1 - P_m$. Then the triad fractions are
$$
(mm) = P_m^2,\qquad (mr) = 2P_m(1-P_m),\qquad (rr) = (1-P_m)^2,
$$ {#eq-bernoulli}
and they satisfy the test relation
$$
4\,(mm)(rr) = (mr)^2 .
$$ {#eq-bernoulli-test}
Whatever the model, the dyad fraction can be recovered from the triads as $(m) = (mm) + \tfrac12(mr)$.
:::

::: proof
A triad is two successive dyads. Under the Bernoullian assumption the two are independent, so the probability of $m$ followed by $m$ is $P_m\cdot P_m$, and of $r$ followed by $r$ is $(1-P_m)^2$. A heterotactic triad can arise as $mr$ or as $rm$. These two sequences are the same triad read in opposite directions along the chain, and NMR does not distinguish them, so their probabilities add: $P_m(1-P_m) + (1-P_m)P_m = 2P_m(1-P_m)$. The three fractions sum to $(P_m + 1 - P_m)^2 = 1$, as they must. Multiplying, $(mm)(rr) = P_m^2(1-P_m)^2 = \tfrac14\,[2P_m(1-P_m)]^2 = \tfrac14(mr)^2$, which is [[#eq-bernoulli-test]].

For the dyad fraction, count the dyads inside the triads. Each $mm$ triad has two $m$ dyads, each $mr$ triad has one, and each triad has two dyads in all, so $(m) = [2(mm) + (mr)]/2 = (mm) + \tfrac12(mr)$. This counting does not use the Bernoullian assumption. It holds for any long chain, because every interior dyad is shared by exactly two overlapping triads. $\blacksquare$
:::

The Bernoullian model is the simplest of several. If the configuration of the incoming unit depends on the configuration of the *last dyad* (a penultimate effect, common in ionic and coordination polymerisation where a counter-ion or catalyst site "remembers" the chain end), the statistics are **first-order Markovian**, with two conditional probabilities $P_{m/r}$ and $P_{r/m}$, and [[#eq-bernoulli-test]] fails. Chiral catalyst sites that impose their own preference regardless of the chain end give **enantiomorphic-site** statistics, in which stereoerrors appear as isolated $mrrm$ pentads rather than as single $r$ dyads. The pattern of errors is therefore evidence for the mechanism of stereocontrol, a point taken up in [[polymer-chemistry/controlled-polymerisation]].

::: widget plot
f: x^2; 2*x*(1-x); (1-x)^2
x: 0, 1
y: 0, 1
labels: (mm); (mr); (rr)
points: 0.22, 0.0484; 0.22, 0.3432; 0.22, 0.6084
vlines: 0.22
caption: Bernoullian triad fractions against the probability $P_m$ of forming a *meso* dyad ([[#prop-bernoulli]]). The isotactic triad $(mm) = P_m^2$ rises from 0 to 1, the syndiotactic $(rr) = (1-P_m)^2$ falls, and the heterotactic $(mr) = 2P_m(1-P_m)$ peaks at $0.5$ for an ideally atactic chain with $P_m = 0.5$. Even then, half the triads are heterotactic, not a third: "random" does not mean "equal shares". The marked points are the radical-PMMA example of [[#ex-pmma]] at $P_m = 0.22$. A chain with $P_m$ near 0 or 1 is stereoregular and can crystallise. Near $0.5$ it is atactic and amorphous.
:::

::: example Tacticity of radical PMMA from NMR {#ex-pmma}
In the $^1\mathrm{H}$ NMR spectrum of poly(methyl methacrylate), the $\alpha$-methyl protons give three resonances whose shifts depend on the triad: about $1.2$ (mm), $1.0$ (mr) and $0.85\ \mathrm{ppm}$ (rr) in $\mathrm{CDCl_3}$. A sample made by radical polymerisation at $60\ ^\circ\mathrm{C}$ gives relative integrals $(mm) : (mr) : (rr) = 0.04 : 0.36 : 0.60$ (representative values; real radical PMMA lies close to these). Find the dyad fraction $(m)$, and test whether the triads are consistent with Bernoullian statistics.
::: solution
The dyad fraction, by the counting of [[#prop-bernoulli]], is
$$
(m) = (mm) + \tfrac12(mr) = 0.04 + 0.18 = 0.22 .
$$
If the chain is Bernoullian with $P_m = 0.22$, [[#eq-bernoulli]] predicts
$$
(mm) = 0.22^2 = 0.048,\qquad (mr) = 2(0.22)(0.78) = 0.343,\qquad (rr) = 0.78^2 = 0.608 .
$$
The observed values $0.04,\ 0.36,\ 0.60$ agree to within about $0.01$ to $0.02$, which is about the precision with which overlapping NMR signals can be integrated. The test relation gives $4(mm)(rr) = 4(0.04)(0.60) = 0.096$ against $(mr)^2 = 0.130$. These differ by about 30%, but $(mm)$ is a small number measured with a large relative error: changing it from 0.040 to 0.054 would close the gap. The data are consistent with Bernoullian propagation and do not justify a more complicated model. Chemically, the result says that radical PMMA is *predominantly syndiotactic* ($(r) = 0.78$). Placing the bulky ester and methyl groups on alternate sides relieves steric strain at the propagating radical. Because the preference is only about 3.5 : 1, the polymer is still atactic in the practical sense and is the amorphous glass known as Perspex or Plexiglas.
:::
:::

::: warning Tacticity is not optical activity, and it is not set by $R$/$S$ labels {#warn-tacticity}
It is tempting to describe an isotactic chain as "all-$R$" and a syndiotactic one as "alternating $R,S$". Do not. The CIP priorities of the two chain segments at a stereocentre depend on which segment is longer or on what lies at its far end, so the descriptor of a stereocentre can change with its position in the chain even when the local geometry is identical. Tacticity is defined by *relative* configuration, *meso* or *racemo* between neighbours, which needs no CIP ranking. Likewise an isotactic vinyl polymer is not measurably optically active, even though all its stereocentres have the same relative configuration. Each stereocentre sits between two long, almost identical segments, so the chain is very close to a *meso* object. Optical activity in polymers comes from a helical conformation held by a bulky side group or from chiral substituents, not from tacticity alone.
:::

## Molar-mass averages and dispersity

Now to the question we started with. A synthetic polymer is a mixture of chains of different lengths. Let $N_i$ be the number of molecules (or $n_i$ the amount, in moles) with molar mass $M_i$, and let $w_i$ be the mass of those molecules, so $w_i \propto n_iM_i$. The distribution can be summarised by its averages, and the averages depend on how each chain is weighted.

::: definition Number-, weight- and z-average molar masses; dispersity {#def-averages}
For a polymer whose species $i$ has molar mass $M_i$ and amount $n_i$ (mass $w_i = n_iM_i$):

- the **number-average molar mass** is the total mass divided by the total amount,
$$
\bar{M}_\mathrm{n} = \frac{\sum_i n_iM_i}{\sum_i n_i} = \frac{\sum_i w_i}{\sum_i w_i/M_i};
$$ {#eq-mn}
- the **weight-average (mass-average) molar mass** weights each chain by its mass,
$$
\bar{M}_\mathrm{w} = \frac{\sum_i w_iM_i}{\sum_i w_i} = \frac{\sum_i n_iM_i^2}{\sum_i n_iM_i};
$$ {#eq-mw}
- the **z-average molar mass** is the next average in the sequence,
$$
\bar{M}_\mathrm{z} = \frac{\sum_i n_iM_i^3}{\sum_i n_iM_i^2};
$$
- the **dispersity** is $Đ = \bar{M}_\mathrm{w}/\bar{M}_\mathrm{n}$.

The number- and weight-average degrees of polymerisation are $\bar{X}_\mathrm{n} = \bar{M}_\mathrm{n}/M_0$ and $\bar{X}_\mathrm{w} = \bar{M}_\mathrm{w}/M_0$. A sample whose molecules all have the same molar mass is **uniform** (older term: monodisperse). One with a spread of molar masses is **non-uniform** (polydisperse).
:::

Think of the averages as answers to different questions. Pick a *molecule* at random from the bottle and ask its expected molar mass: the answer is $\bar{M}_\mathrm{n}$. Pick a *repeat unit* (or a gram of material) at random and ask the molar mass of the chain it belongs to: the answer is $\bar{M}_\mathrm{w}$. Long chains hold more units, so they are picked more often in the second experiment, and $\bar{M}_\mathrm{w}$ is pulled towards the long chains. Many properties follow one average rather than the other. Colligative properties (osmotic pressure, freezing-point depression) count molecules and give $\bar{M}_\mathrm{n}$. Light scattering is dominated by the largest molecules and gives $\bar{M}_\mathrm{w}$. Melt viscosity scales roughly as $\bar{M}_\mathrm{w}^{3.4}$, and tensile strength and brittleness follow $\bar{M}_\mathrm{n}$, since a low-mass tail plasticises and weakens a polymer. [[polymer-chemistry/polymer-characterisation]] treats the measurements.

::: proposition Dispersity is at least one {#prop-dispersity}
For any distribution of molar masses,
$$
Đ - 1 = \frac{\bar{M}_\mathrm{w}}{\bar{M}_\mathrm{n}} - 1 = \frac{\sigma_\mathrm{n}^2}{\bar{M}_\mathrm{n}^2} \;\ge\; 0,
$$ {#eq-dispersity}
where $\sigma_\mathrm{n}^2 = \sum_i n_i(M_i - \bar{M}_\mathrm{n})^2/\sum_i n_i$ is the variance of the *number* distribution. Hence $\bar{M}_\mathrm{w} \ge \bar{M}_\mathrm{n}$, with equality if and only if the sample is uniform. In the same way $\bar{M}_\mathrm{z} \ge \bar{M}_\mathrm{w}$.
:::

::: proof
Let $\langle\cdot\rangle$ be an average over molecules, weighted by number: $\langle M\rangle = \sum n_iM_i/\sum n_i = \bar{M}_\mathrm{n}$ and $\langle M^2\rangle = \sum n_iM_i^2/\sum n_i$. Dividing numerator and denominator of [[#eq-mw]] by $\sum n_i$ gives
$$
\bar{M}_\mathrm{w} = \frac{\langle M^2\rangle}{\langle M\rangle}
\qquad\Longrightarrow\qquad
\frac{\bar{M}_\mathrm{w}}{\bar{M}_\mathrm{n}} = \frac{\langle M^2\rangle}{\langle M\rangle^2}.
$$
The variance of the number distribution is $\sigma_\mathrm{n}^2 = \langle M^2\rangle - \langle M\rangle^2$. Dividing by $\langle M\rangle^2$:
$$
\frac{\sigma_\mathrm{n}^2}{\bar{M}_\mathrm{n}^2} = \frac{\langle M^2\rangle}{\langle M\rangle^2} - 1 = Đ - 1 .
$$
A variance is a sum of squares with positive weights, so it is $\ge 0$, and it is zero only if every $M_i$ equals the mean, which means the sample is uniform. For $\bar{M}_\mathrm{z} \ge \bar{M}_\mathrm{w}$, repeat the argument with the *mass* distribution in place of the number distribution. With mass weights $w_i \propto n_iM_i$, $\bar{M}_\mathrm{w}$ is the mean and $\bar{M}_\mathrm{z} = \sum w_iM_i^2/\sum w_iM_i$ is the ratio $\langle M^2\rangle_w/\langle M\rangle_w$, so $\bar{M}_\mathrm{z}/\bar{M}_\mathrm{w} - 1 = \sigma_\mathrm{w}^2/\bar{M}_\mathrm{w}^2 \ge 0$. $\blacksquare$
:::

[[#eq-dispersity]] gives the dispersity a meaning. $\sqrt{Đ - 1}$ is the **relative standard deviation** of the chain-length distribution, counted by molecules. A "narrow" polymer with $Đ = 1.04$, typical of living anionic polystyrene, has a relative spread of $\sqrt{0.04} = 20\%$. A step-growth polymer with $Đ = 2$ has a relative spread of $100\%$: its standard deviation equals its mean.

::: example Averages of a three-component mixture {#ex-three}
A sample contains $1.0\ \mathrm{mol}$ of chains with $M = 10\,000\ \mathrm{g\,mol^{-1}}$, $2.0\ \mathrm{mol}$ with $M = 50\,000\ \mathrm{g\,mol^{-1}}$ and $1.0\ \mathrm{mol}$ with $M = 100\,000\ \mathrm{g\,mol^{-1}}$. Calculate $\bar{M}_\mathrm{n}$, $\bar{M}_\mathrm{w}$, $\bar{M}_\mathrm{z}$ and $Đ$.
::: solution
Tabulate $n_i$, $n_iM_i$, $n_iM_i^2$ and $n_iM_i^3$, working in units of $10^{4}\ \mathrm{g\,mol^{-1}}$ to keep the numbers small:

| $M_i/10^4$ | $n_i$ | $n_iM_i$ | $n_iM_i^2$ | $n_iM_i^3$ |
|---|---|---|---|---|
| $1$ | $1$ | $1$ | $1$ | $1$ |
| $5$ | $2$ | $10$ | $50$ | $250$ |
| $10$ | $1$ | $10$ | $100$ | $1000$ |
| total | $4$ | $21$ | $151$ | $1251$ |

Then
$$
\bar{M}_\mathrm{n} = \frac{21}{4} = 5.25,\qquad
\bar{M}_\mathrm{w} = \frac{151}{21} = 7.190,\qquad
\bar{M}_\mathrm{z} = \frac{1251}{151} = 8.285
$$
in units of $10^{4}\ \mathrm{g\,mol^{-1}}$, that is $\bar{M}_\mathrm{n} = 5.25\times10^{4}$, $\bar{M}_\mathrm{w} = 7.19\times10^{4}$ and $\bar{M}_\mathrm{z} = 8.28\times10^{4}\ \mathrm{g\,mol^{-1}}$, and
$$
Đ = \frac{7.190}{5.25} = 1.37 .
$$
The averages are in the order $\bar{M}_\mathrm{n} < \bar{M}_\mathrm{w} < \bar{M}_\mathrm{z}$, as [[#prop-dispersity]] requires. Each higher average leans further towards the $100\,000$ fraction. That fraction is a quarter of the molecules but $10/21 = 48\%$ of the mass.
:::
:::

::: example Blending equal masses of two narrow fractions {#ex-blend}
Equal masses of two essentially uniform polystyrenes, $M = 1.0\times10^{4}$ and $M = 1.0\times10^{5}\ \mathrm{g\,mol^{-1}}$, are blended. Find $\bar{M}_\mathrm{n}$, $\bar{M}_\mathrm{w}$ and $Đ$ of the blend.
::: solution
Use the mass-fraction forms of [[#eq-mn]] and [[#eq-mw]] with $w_1 = w_2 = \tfrac12$:
$$
\bar{M}_\mathrm{n} = \frac{1}{\dfrac{0.5}{1.0\times10^{4}} + \dfrac{0.5}{1.0\times10^{5}}} = \frac{1}{5.5\times10^{-5}} = 1.8\times10^{4}\ \mathrm{g\,mol^{-1}},
$$
$$
\bar{M}_\mathrm{w} = 0.5\,(1.0\times10^{4}) + 0.5\,(1.0\times10^{5}) = 5.5\times10^{4}\ \mathrm{g\,mol^{-1}},
\qquad
Đ = \frac{5.5\times10^{4}}{1.82\times10^{4}} = 3.0 .
$$
Two individually uniform components give a dispersity of 3, broader than any single conventional polymerisation would produce. $\bar{M}_\mathrm{n}$ is a *harmonic* mean of the components weighted by mass, and it lies close to the smaller component, because by number the blend is $10/11$ short chains. $\bar{M}_\mathrm{w}$ is an ordinary mass-weighted mean. This asymmetry is what the next warning is about.
:::
:::

::: warning Averages of blends do not average simply {#warn-blend}
When two polymers are blended, the weight-average of the blend is the mass-weighted mean of the components' weight-averages, $\bar{M}_\mathrm{w} = \sum_k w_k\bar{M}_{\mathrm{w},k}$. The number-average is **not** the mass-weighted mean of the components' number-averages. It is the mass-weighted *harmonic* mean, $1/\bar{M}_\mathrm{n} = \sum_k w_k/\bar{M}_{\mathrm{n},k}$, because what adds is the number of moles, $w_k/\bar{M}_{\mathrm{n},k}$. The arithmetic average of the $\bar{M}_\mathrm{n}$ values overestimates the blend's $\bar{M}_\mathrm{n}$, sometimes by a factor of two or more ([[#ex-blend]]). A related trap: a small mass of low-molar-mass material, such as residual monomer, oligomers or plasticiser, has an outsized effect on $\bar{M}_\mathrm{n}$ and almost none on $\bar{M}_\mathrm{w}$. One percent by mass of styrene ($104\ \mathrm{g\,mol^{-1}}$) in a polystyrene of $\bar{M}_\mathrm{n} = 10^{5}$ more than halves the measured $\bar{M}_\mathrm{n}$.
:::

## Model distributions

The averages summarise a distribution, but the distribution itself is set by the chemistry that made the polymer. Two model distributions come up throughout this course, and it pays to know them in detail.

::: definition The most probable (Flory) distribution {#def-flory}
A polymer has the **most probable** or **Flory distribution** if the number fraction of chains containing $x$ units is
$$
N_x = (1-p)\,p^{x-1}, \qquad x = 1, 2, 3, \dots,
$$ {#eq-flory-number}
with a single parameter $0 \le p < 1$. The corresponding mass fraction is
$$
W_x = \frac{xN_x}{\sum_x xN_x} = x(1-p)^2p^{x-1}.
$$ {#eq-flory-weight}
:::

The Flory distribution comes from a simple random process. A chain is built by a sequence of steps, each of which either *continues* (probability $p$) or *stops* (probability $1-p$), independently of how long the chain already is. The probability that a chain stops after exactly $x$ units is $p^{x-1}(1-p)$: $x-1$ continuations and one stop. This is the geometric distribution of probability theory. In [[polymer-chemistry/step-growth]], $p$ is the *extent of reaction* of functional groups, and the distribution is exact for an ideal linear polycondensation. In [[polymer-chemistry/radical-polymerisation]], $p$ is the probability of propagation rather than termination, and the same distribution describes chains terminated by disproportionation or transfer.

::: proposition Averages of the most probable distribution {#prop-flory-averages}
For the distribution [[#eq-flory-number]],
$$
\bar{X}_\mathrm{n} = \frac{1}{1-p},\qquad
\bar{X}_\mathrm{w} = \frac{1+p}{1-p},\qquad
Đ = 1 + p \;\longrightarrow\; 2 \quad (p \to 1),
$$ {#eq-flory-averages}
and $\bar{X}_\mathrm{z} = \dfrac{1 + 4p + p^2}{(1-p)(1+p)}$, so that $\bar{X}_\mathrm{z} : \bar{X}_\mathrm{w} : \bar{X}_\mathrm{n} \to 3 : 2 : 1$ for long chains.
:::

::: proof
We need the moments $S_k = \sum_{x\ge1} x^kp^{x-1}$ for $k = 0, 1, 2, 3$. Start from the geometric series $S_0 = \sum_{x\ge1}p^{x-1} = 1/(1-p)$. Differentiating $\sum_{x\ge 0} p^x = 1/(1-p)$ with respect to $p$ gives
$$
S_1 = \sum_{x\ge1} x\,p^{x-1} = \frac{1}{(1-p)^2}.
$$
Multiply by $p$ and differentiate again: $\sum x^2p^{x-1} = \dfrac{\mathrm{d}}{\mathrm{d}p}\left[\dfrac{p}{(1-p)^2}\right] = \dfrac{1+p}{(1-p)^3} = S_2$. Once more, $S_3 = \dfrac{\mathrm{d}}{\mathrm{d}p}\left[\dfrac{p(1+p)}{(1-p)^3}\right] = \dfrac{1 + 4p + p^2}{(1-p)^4}$ (expand the quotient-rule numerator: $(1+2p)(1-p) + 3p(1+p) = 1 + 4p + p^2$). The number fractions carry a common factor $(1-p)$, which cancels from every ratio of moments, so
$$
\bar{X}_\mathrm{n} = \frac{S_1}{S_0} = \frac{1}{1-p},\qquad
\bar{X}_\mathrm{w} = \frac{S_2}{S_1} = \frac{1+p}{1-p},\qquad
\bar{X}_\mathrm{z} = \frac{S_3}{S_2} = \frac{1+4p+p^2}{(1+p)(1-p)} .
$$
The dispersity is $\bar{X}_\mathrm{w}/\bar{X}_\mathrm{n} = 1+p$. As $p \to 1$, the ratios $\bar{X}_\mathrm{z}/\bar{X}_\mathrm{n} \to 6/2 = 3$ and $\bar{X}_\mathrm{w}/\bar{X}_\mathrm{n} \to 2$. Finally, $\sum_x xN_x = (1-p)S_1 = 1/(1-p)$, which gives the normalisation of [[#eq-flory-weight]]. $\blacksquare$
:::

The most surprising feature of the Flory distribution is visible in the figure. By *number*, the most abundant species is always the monomer: $N_x$ falls steadily from $x = 1$. By *mass*, the distribution has a broad maximum near $x \approx \bar{X}_\mathrm{n}$ (exactly at $x = -1/\ln p \approx 1/(1-p)$). A polycondensate of $\bar{X}_\mathrm{n} = 100$ has more molecules of monomer than of any other single length, yet those monomer molecules are a negligible fraction of its mass.

::: widget plot
f: 100*(1-p)*p^(x-1); 100*x*(1-p)^2*p^(x-1)
x: 1, 600
y: 0, 2.2
sliders: p=0.99:0.98:0.998:0.001
labels: \text{number fraction }N_x\ (\%); \text{mass fraction }W_x\ (\%)
caption: The most probable (Flory) distribution [[#eq-flory-number]] and [[#eq-flory-weight]] in percent, against chain length $x$, with the continuation probability $p$ on the slider. The number distribution (first curve) always decreases from $x = 1$: monomer is the commonest species. The mass distribution has its maximum at $x = -1/\ln p \approx \bar{X}_\mathrm{n}$ and a long tail to high $x$, which is why $\bar{X}_\mathrm{w} = (1+p)/(1-p)$ is about twice $\bar{X}_\mathrm{n}$. Move $p$ from $0.99$ towards $0.998$ and both curves flatten and stretch: the distribution keeps its shape on the scale of $\bar{X}_\mathrm{n}$ and its relative width ($Đ \to 2$) never narrows.
:::

The other limiting case is the **Poisson distribution**. If every chain starts at the same instant and grows by adding monomer at the same average rate, with no termination or transfer, then after an average of $\nu$ additions the number of units added to a chain is Poisson-distributed: $N_x = e^{-\nu}\nu^{x-1}/(x-1)!$ for a chain of $x = 1 + (\text{additions})$ units. Its averages are $\bar{X}_\mathrm{n} = \nu + 1$ and
$$
Đ = 1 + \frac{\nu}{(\nu+1)^2} \approx 1 + \frac{1}{\bar{X}_\mathrm{n}},
$$ {#eq-poisson}
so the dispersity approaches 1 as the chains grow. This is the ideal of **living polymerisation** ([[polymer-chemistry/controlled-polymerisation]]): fast initiation, no termination, and chains that are equal because they are the same age. The Flory and Poisson distributions represent two ways of growing chains. Chains that grow by random coupling and stopping are broad ($Đ \to 2$). Chains that grow by orderly addition are narrow ($Đ \to 1$). Real polymerisations lie between these limits or, through branching, coupling or changing conditions, beyond 2.

::: example How broad is a polycondensate? {#ex-flory}
A linear polyester is made to $p = 0.99$ (99% of its functional groups have reacted) and has the most probable distribution. The repeat unit has $M_0 = 192\ \mathrm{g\,mol^{-1}}$ (the PET unit, $\mathrm{C_{10}H_8O_4}$, treating each structural unit of the Flory distribution as one repeat unit for simplicity). Find $\bar{X}_\mathrm{n}$, $\bar{X}_\mathrm{w}$, $\bar{M}_\mathrm{n}$, $\bar{M}_\mathrm{w}$ and $Đ$. What is the number fraction of unreacted single units, and their mass fraction?
::: solution
From [[#eq-flory-averages]] with $p = 0.99$:
$$
\bar{X}_\mathrm{n} = \frac{1}{0.01} = 100,\qquad \bar{X}_\mathrm{w} = \frac{1.99}{0.01} = 199,\qquad Đ = 1.99 .
$$
So $\bar{M}_\mathrm{n} = 100 \times 192 = 1.92\times10^{4}\ \mathrm{g\,mol^{-1}}$ and $\bar{M}_\mathrm{w} = 199 \times 192 = 3.82\times10^{4}\ \mathrm{g\,mol^{-1}}$. The single units have number fraction $N_1 = 1 - p = 0.010$, so 1% of the molecules are monomer, more than for any other length. Their mass fraction is $W_1 = 1\cdot(1-p)^2 = 1.0\times10^{-4}$, only 0.01% of the mass. (In the real two-monomer polyester the "units" are half repeat units and the bookkeeping changes by a factor of two. The shape of the distribution does not; see [[polymer-chemistry/step-growth]].)
:::
:::

::: example End-group analysis {#ex-end-group}
A sample of poly(ethylene glycol), $\mathrm{HO(CH_2CH_2O)_nH}$, is titrated for hydroxyl end groups and found to contain $0.500\ \mathrm{mmol}$ of $\mathrm{OH}$ per gram. Assuming every chain carries exactly two hydroxyl groups, find $\bar{M}_\mathrm{n}$ and $\bar{X}_\mathrm{n}$. Why does end-group analysis give the *number*-average?
::: solution
Each chain carries two OH groups, so the amount of chains per gram is $0.500/2 = 0.250\ \mathrm{mmol\,g^{-1}} = 2.50\times10^{-4}\ \mathrm{mol\,g^{-1}}$. The number-average molar mass is the mass per mole of chains:
$$
\bar{M}_\mathrm{n} = \frac{1}{2.50\times10^{-4}\ \mathrm{mol\,g^{-1}}} = 4.00\times10^{3}\ \mathrm{g\,mol^{-1}} .
$$
The repeat unit $\mathrm{CH_2CH_2O}$ has $M_0 = 2(12.011) + 4(1.008) + 15.999 = 44.05\ \mathrm{g\,mol^{-1}}$, and the end groups $\mathrm{H} + \mathrm{OH}$ add $18.02\ \mathrm{g\,mol^{-1}}$, so
$$
\bar{X}_\mathrm{n} = \frac{4000 - 18.02}{44.05} = 90.4 .
$$
End-group analysis counts *chains*: each chain contributes the same number of ends whatever its length. Total mass divided by number of chains is, by definition [[#eq-mn]], the number-average. The method works only while ends are numerous enough to measure. Above about $\bar{M}_\mathrm{n} \approx 2\times10^{4}$ the end-group concentration becomes too small to titrate or integrate by NMR accurately, and colligative or chromatographic methods take over.
:::
:::

::: quiz
A polymer sample is found to have $\bar{M}_\mathrm{n} = 50\,000$ and $\bar{M}_\mathrm{w} = 50\,000\ \mathrm{g\,mol^{-1}}$ within experimental error. Which statement is correct?
- [ ] The sample must have the most probable distribution with $p$ close to 1.
- [x] The sample is uniform (all chains have the same length) to within the measurement error, since $Đ - 1$ is the squared relative standard deviation of the chain lengths.
- [ ] The z-average must then be larger than $50\,000$, because $\bar{M}_\mathrm{z} > \bar{M}_\mathrm{w}$ always.
- [ ] Nothing can be concluded, because the two averages are measured by different methods.
::: solution
By [[#prop-dispersity]], $Đ - 1 = \sigma_\mathrm{n}^2/\bar{M}_\mathrm{n}^2$, so $\bar{M}_\mathrm{w} = \bar{M}_\mathrm{n}$ means a zero variance: a uniform sample. A Flory distribution has $Đ = 1 + p$, which is close to 2 for long chains, not 1. The inequality $\bar{M}_\mathrm{z} \ge \bar{M}_\mathrm{w}$ is not strict: for a uniform sample all averages coincide. The averages are indeed measured by different methods, but that does not stop us comparing them. In practice, $Đ$ below about 1.02 is about the best that living anionic polymerisation achieves for synthetic chains. Only biology, with proteins of exact sequence, makes truly uniform macromolecules.
:::
:::

::: history
The word *polymer* goes back to **Jöns Jacob Berzelius**, who in the early 1830s used "polymeric" for compounds with the same empirical formula but different molar masses, such as ethylene and butene. For the next ninety years, natural rubber, cellulose and proteins were widely thought to be **colloidal aggregates** of small molecules held together by secondary forces. **Hermann Staudinger** argued the opposite in his 1920 paper "Über Polymerisation" (*Berichte der Deutschen Chemischen Gesellschaft* 53, 1073): polystyrene, polyoxymethylene and rubber are long chains of units joined by ordinary covalent bonds. He coined the term *Makromolekül* in 1922 and defended it against strong opposition through the 1920s, using hydrogenation experiments (hydrogenated rubber did not lose its colloidal character, so that character was not due to the double bonds) and viscosity measurements. He received the Nobel Prize in Chemistry in 1953. **Wallace Carothers**' systematic work on condensation polymers at DuPont from 1928 ([[polymer-chemistry/step-growth]]) made the chain picture undeniable. The stereochemistry of chains became a practical subject when **Giulio Natta** made crystalline isotactic polypropylene in 1954 with Ziegler-type catalysts and introduced the words *isotactic*, *syndiotactic* and *atactic*. In 1960 **Frank Bovey** and **George Tiers** showed that proton NMR distinguishes the triads of PMMA (*Journal of Polymer Science* 44, 173), founding the analysis of [[#ex-pmma]]. The term **dispersity** and symbol Đ were recommended by IUPAC in 2009 (Stepto, *Pure and Applied Chemistry* 81, 351) to replace "polydispersity index".
:::

## Where this leads

The rest of the course is about where these distributions come from and what they do. [[polymer-chemistry/step-growth]] derives the Flory distribution from the kinetics of polycondensation and shows how branching monomers create networks. [[polymer-chemistry/radical-polymerisation]] turns rate constants into $\bar{X}_\mathrm{n}$ through the kinetic chain length, and [[polymer-chemistry/controlled-polymerisation]] shows how living systems approach the Poisson limit and how catalysts fix tacticity. Sequence statistics return, with two different monomers in place of two configurations, in [[polymer-chemistry/copolymerisation]]. For how a single long chain occupies space, its coil size and its interactions with solvent, see [[polymer-chemistry/polymer-solutions]]. The probability ideas used here (the geometric and Poisson distributions, means and variances) are treated in Maths Atlas ([/learn/maths/](/learn/maths/)).

::: summary
- A polymer is a population of macromolecules built from repeat units. The degree of polymerisation $X = M/M_0$ counts units, and commodity plastics have $X \approx 10^{3}$–$10^{5}$. Architecture (linear, branched, star, network) decides whether a polymer flows (thermoplastic) or sets (thermoset).
- Source-based names (polystyrene) say what a polymer was made from. IUPAC structure-based names (poly(1-phenylethylene)) describe the repeat unit unambiguously. Nylon numbers count carbons in the monomers.
- Vinyl polymers are mostly head-to-tail. Dienes give *cis*-1,4, *trans*-1,4 and 1,2 units (natural rubber versus gutta-percha). Tacticity, the relative configuration of neighbours as *meso* ($m$) or *racemo* ($r$) dyads, decides whether a chain can crystallise.
- Bernoullian statistics give $(mm) = P_m^2$, $(mr) = 2P_m(1-P_m)$, $(rr) = (1-P_m)^2$, with the test $4(mm)(rr) = (mr)^2$. Triad fractions from NMR test the mechanism of stereocontrol.
- $\bar{M}_\mathrm{n}$ weights chains by number (colligative methods, end groups). $\bar{M}_\mathrm{w}$ weights them by mass (light scattering). $Đ = \bar{M}_\mathrm{w}/\bar{M}_\mathrm{n} = 1 + \sigma_\mathrm{n}^2/\bar{M}_\mathrm{n}^2 \ge 1$.
- When blending, $\bar{M}_\mathrm{w}$ averages arithmetically by mass but $\bar{M}_\mathrm{n}$ averages harmonically, and a little low-molar-mass material drags $\bar{M}_\mathrm{n}$ down sharply.
- The most probable (Flory) distribution $N_x = (1-p)p^{x-1}$ has $\bar{X}_\mathrm{n} = 1/(1-p)$ and $Đ = 1 + p \to 2$. The Poisson distribution of living polymerisation has $Đ \approx 1 + 1/\bar{X}_\mathrm{n} \to 1$.
:::

## Exercises

::: exercise Degree of polymerisation of PVC {level=1 check="1000"}
A poly(vinyl chloride) sample has $\bar{M}_\mathrm{n} = 62\,500\ \mathrm{g\,mol^{-1}}$. Calculate its number-average degree of polymerisation, ignoring end groups. (Enter $\bar{X}_\mathrm{n}$.)
::: solution
The monomer unit $\mathrm{C_2H_3Cl}$ has $M_0 = 2(12.011) + 3(1.008) + 35.45 = 62.50\ \mathrm{g\,mol^{-1}}$. So $\bar{X}_\mathrm{n} = 62\,500/62.50 = 1.00\times10^{3}$. A thousand units per chain, on average.
:::
:::

::: exercise Dispersity of a two-component mixture {level=1 check="1.25"}
A sample contains equal *numbers* of chains of molar mass $20\,000$ and $60\,000\ \mathrm{g\,mol^{-1}}$. Calculate its dispersity. (Enter $Đ$.)
::: solution
With $n_1 = n_2 = 1$: $\bar{M}_\mathrm{n} = (20\,000 + 60\,000)/2 = 40\,000$. $\bar{M}_\mathrm{w} = (20\,000^2 + 60\,000^2)/(20\,000 + 60\,000) = (4\times10^{8} + 3.6\times10^{9})/8\times10^{4} = 50\,000\ \mathrm{g\,mol^{-1}}$. So $Đ = 50\,000/40\,000 = 1.25$. Check: the number distribution has standard deviation $20\,000$, and $(20\,000/40\,000)^2 = 0.25 = Đ - 1$, as [[#eq-dispersity]] requires.
:::
:::

::: exercise Heterotactic triads {level=1 check="0.375"}
A vinyl polymer follows Bernoullian statistics with $P_m = 0.25$. What fraction of its triads is heterotactic? (Enter $(mr)$ as a fraction.)
::: solution
$(mr) = 2P_m(1-P_m) = 2(0.25)(0.75) = 0.375$. The other triads are $(mm) = 0.0625$ and $(rr) = 0.5625$, and the three sum to 1.
:::
:::

::: exercise Number-average of a blend {level=2 check="36400"}
$2.0\ \mathrm{g}$ of polymer A ($\bar{M}_\mathrm{n} = 20\,000$, $\bar{M}_\mathrm{w} = 40\,000\ \mathrm{g\,mol^{-1}}$) is blended with $3.0\ \mathrm{g}$ of polymer B ($\bar{M}_\mathrm{n} = 80\,000$, $\bar{M}_\mathrm{w} = 120\,000\ \mathrm{g\,mol^{-1}}$). Find $\bar{M}_\mathrm{n}$, $\bar{M}_\mathrm{w}$ and $Đ$ of the blend. (Enter $\bar{M}_\mathrm{n}$ in $\mathrm{g\,mol^{-1}}$, to three significant figures.)
::: hint
Moles add, masses add. Work out the amount of chains in each component.
:::
::: solution
The mass fractions are $w_A = 0.40$ and $w_B = 0.60$. The amount of chains per gram of blend is $0.40/20\,000 + 0.60/80\,000 = 2.0\times10^{-5} + 7.5\times10^{-6} = 2.75\times10^{-5}\ \mathrm{mol\,g^{-1}}$, so
$$
\bar{M}_\mathrm{n} = \frac{1}{2.75\times10^{-5}} = 3.64\times10^{4}\ \mathrm{g\,mol^{-1}} .
$$
The weight-average is the mass-weighted mean: $\bar{M}_\mathrm{w} = 0.40(40\,000) + 0.60(120\,000) = 8.80\times10^{4}\ \mathrm{g\,mol^{-1}}$. Then $Đ = 88\,000/36\,364 = 2.42$. The naive mass-weighted mean of the two $\bar{M}_\mathrm{n}$ values, $56\,000$, overestimates the blend's $\bar{M}_\mathrm{n}$ by more than 50%.
:::
:::

::: exercise Dispersity of a long polycondensate {level=2 check="1.995"}
An ideal linear step-growth polymer has the most probable distribution with $\bar{X}_\mathrm{n} = 200$. What is its dispersity? (Enter $Đ$.)
::: solution
$\bar{X}_\mathrm{n} = 1/(1-p) = 200$ gives $p = 0.995$, and $Đ = 1 + p = 1.995$. For any reasonably long Flory polymer, $Đ$ is within a fraction of a percent of 2.
:::
:::

::: exercise Dispersity of a Poisson polymer {level=2 check="1.019"}
A living polymerisation starts all chains simultaneously, and each chain adds on average $\nu = 50$ monomer units to its initiating unit, giving a Poisson distribution. Show that $\bar{X}_\mathrm{n} = \nu + 1$ and $\bar{X}_\mathrm{w} = (\nu^2 + 3\nu + 1)/(\nu + 1)$, and evaluate $Đ$. (Enter $Đ$ to four significant figures.)
::: hint
If $k$ is Poisson with mean $\nu$, then $\langle k\rangle = \nu$ and $\langle k^2\rangle = \nu + \nu^2$. The chain length is $x = k + 1$.
:::
::: solution
With $x = k + 1$: $\langle x\rangle = \nu + 1$, and $\langle x^2\rangle = \langle k^2\rangle + 2\langle k\rangle + 1 = \nu^2 + 3\nu + 1$. So $\bar{X}_\mathrm{n} = \nu + 1$ and $\bar{X}_\mathrm{w} = \langle x^2\rangle/\langle x\rangle = (\nu^2 + 3\nu + 1)/(\nu+1)$. The dispersity is
$$
Đ = \frac{\nu^2 + 3\nu + 1}{(\nu+1)^2} = 1 + \frac{\nu}{(\nu+1)^2} = 1 + \frac{50}{2601} = 1.019 .
$$
For $\bar{X}_\mathrm{n} = 51$ the relative standard deviation is $\sqrt{0.0192} = 14\%$, and it keeps shrinking as $1/\sqrt{\bar{X}_\mathrm{n}}$ while the chains grow.
:::
:::

::: exercise Residual monomer and the number-average {level=3 check="9440"}
A polystyrene with $\bar{M}_\mathrm{n} = 1.00\times10^{5}\ \mathrm{g\,mol^{-1}}$ contains 1.00% by mass of unreacted styrene ($M = 104.15\ \mathrm{g\,mol^{-1}}$), which is counted along with the polymer by a colligative measurement. (a) What $\bar{M}_\mathrm{n}$ does the measurement report? (b) By what fraction is $\bar{M}_\mathrm{w}$ changed? (c) Comment on what this means for methods that measure $\bar{M}_\mathrm{n}$. (Enter the apparent $\bar{M}_\mathrm{n}$ of part (a) in $\mathrm{g\,mol^{-1}}$, to three significant figures.)
::: solution
(a) Per gram of sample there are $0.99/1.00\times10^{5} = 9.90\times10^{-6}\ \mathrm{mol}$ of polymer chains and $0.01/104.15 = 9.60\times10^{-5}\ \mathrm{mol}$ of styrene. The total is $1.059\times10^{-4}\ \mathrm{mol\,g^{-1}}$, so
$$
\bar{M}_\mathrm{n}^\text{app} = \frac{1}{1.059\times10^{-4}} = 9.44\times10^{3}\ \mathrm{g\,mol^{-1}} .
$$
One percent of monomer by mass cuts the apparent $\bar{M}_\mathrm{n}$ by a factor of about ten, because by number the sample is now 91% styrene molecules.

(b) The weight-average is the mass-weighted mean, $\bar{M}_\mathrm{w} = 0.99\,\bar{M}_{\mathrm{w},\text{poly}} + 0.01(104)$. That is a 1% decrease (less the negligible $1\ \mathrm{g\,mol^{-1}}$ the monomer contributes): $\bar{M}_\mathrm{w}$ hardly notices the monomer.

(c) Any $\bar{M}_\mathrm{n}$ measurement (osmometry, end groups, colligative properties) is only as good as the removal of low-molar-mass species. Samples are reprecipitated before measurement, and membrane osmometry uses membranes that let small molecules through, so they do not contribute. The reported dispersity of an unpurified sample is meaningless.
:::
:::

::: exercise Higher averages of the Flory distribution {level=3 check="1.50"}
Using the moments derived in [[#prop-flory-averages]], show that for the most probable distribution $\bar{X}_\mathrm{z}/\bar{X}_\mathrm{w} = (1 + 4p + p^2)/(1+p)^2$. Evaluate this ratio for $p = 0.99$, and explain in words why it is close to $3/2$ while $\bar{X}_\mathrm{w}/\bar{X}_\mathrm{n}$ is close to 2. (Enter $\bar{X}_\mathrm{z}/\bar{X}_\mathrm{w}$ to three significant figures.)
::: hint
Divide $\bar{X}_\mathrm{z} = S_3/S_2$ by $\bar{X}_\mathrm{w} = S_2/S_1$.
:::
::: solution
From the proof, $\bar{X}_\mathrm{z} = (1+4p+p^2)/[(1+p)(1-p)]$ and $\bar{X}_\mathrm{w} = (1+p)/(1-p)$. Dividing,
$$
\frac{\bar{X}_\mathrm{z}}{\bar{X}_\mathrm{w}} = \frac{1+4p+p^2}{(1+p)^2} .
$$
At $p = 0.99$: numerator $1 + 3.96 + 0.9801 = 5.9401$, denominator $1.99^2 = 3.9601$, ratio $1.4999 \to 1.50$. As $p \to 1$ the ratio tends to $6/4 = 3/2$. In words, $\bar{X}_\mathrm{z}/\bar{X}_\mathrm{w} - 1$ is the squared relative spread of the *mass* distribution, $\bar{X}_\mathrm{w}/\bar{X}_\mathrm{n} - 1$ is that of the *number* distribution, and the two distributions have different shapes. The continuous limit of the Flory number distribution is an exponential, with relative variance 1. The mass distribution $W_x \propto x\,e^{-x/\bar{X}_\mathrm{n}}$ is a gamma distribution of shape 2, whose relative variance is $1/2$. Weighting by mass suppresses the short-chain excess that makes the number distribution so broad.
:::
:::
