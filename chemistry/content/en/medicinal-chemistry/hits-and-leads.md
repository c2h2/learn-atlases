Suppose a target has been chosen and validated ([[medicinal-chemistry/drug-targets]]). Now someone has to find a molecule that binds it. How large is the haystack? Estimates of the number of drug-like organic molecules — stable, made of C, H, N, O, S and halogens, with up to about 30 heavy atoms — run to the order of $10^{60}$ (Regine Bohacek and colleagues, 1996). The largest physical screening collections hold a few million compounds, and even the "make-on-demand" virtual catalogues that chemists can now search hold some $10^{10}$. Chemists do not search chemical space so much as sample tiny, carefully chosen corners of it. Where do the first active molecules — the **hits** — come from, how do we know they are real, and how do we decide which deserve the years of work that turn a hit into a **lead** and eventually a drug candidate?

This chapter follows the main routes: nature's own molecules, the systematic testing of large libraries by **high-throughput screening** (with the statistics that decide whether an assay can be trusted), the **fragment-based** approach that starts from very small, weakly binding molecules, and computational and DNA-encoded methods. Along the way we define the metrics — **ligand efficiency** and **lipophilic ligand efficiency** — that let chemists compare molecules of different sizes and avoid simply making their compounds bigger and greasier. The free-energy scale of binding used throughout is that of [[medicinal-chemistry/drug-binding]].

## Where hits come from

::: definition Hit, lead and candidate {#def-hit}
A **hit** is a compound whose activity against the target in a primary assay has been confirmed on retesting, with a concentration–response curve and evidence that it acts on the target rather than on the assay. A **lead** is a hit, or a series of related hits, with the potency, selectivity, physicochemical properties and synthetic tractability that make it worth optimising, and a structure–activity relationship showing that it can be improved. A **candidate** is a single optimised compound chosen for preclinical development ([[medicinal-chemistry/drug-development]]). The definitions are working conventions of the pharmaceutical industry; the thresholds (for example micromolar potency for a hit, sub-micromolar for a lead) vary between organisations and targets.
:::

### Natural products

For most of history, medicines were natural products, and natural products remain an extraordinary source of leads. Evolution has selected them for binding biological macromolecules: they are often rich in stereocentres and rings, poor in flat aromatic systems, and occupy regions of chemical space that synthetic libraries rarely visit. Analyses by David Newman and Gordon Cragg of all new medicines approved from 1981 to 2019 found that a large fraction of small-molecule drugs — between a quarter and a half, depending on whether synthetic molecules modelled on a natural product are counted — are natural products, their semisynthetic derivatives or their mimics.

The examples are famous. Penicillin came from a mould (Alexander Fleming, 1928), and the statins from fungal metabolites ([[medicinal-chemistry/drug-case-studies]]). Artemisinin, the antimalarial endoperoxide sesquiterpene lactone, was isolated from *Artemisia annua* in 1972 by Tu Youyou's group, guided by a fourth-century Chinese text describing a cold-water extract of the plant; she shared the 2015 Nobel Prize in Physiology or Medicine. Paclitaxel (Taxol), from the bark of the Pacific yew, stabilises microtubules; its structure was reported by Monroe Wall and Mansukh Wani in 1971. Ciclosporin, an immunosuppressant from a soil fungus, made organ transplantation routine. The difficulty with natural products is supply and synthesis: many are made in tiny amounts by organisms that cannot be farmed, and their complex structures make analogue synthesis hard — paclitaxel is now made by semisynthesis from a precursor in the needles of the European yew, or by plant-cell fermentation.

### Starting from what is already known

Many projects start from the target's natural ligand or from an existing drug. James Black and Robin Ganellin's $\mathrm{H_2}$-antagonist project at Smith Kline & French began from histamine itself: systematic modification of the imidazole and side chain led, through burimamide and metiamide, to cimetidine (marketed from 1976), the first drug to block gastric acid secretion by a receptor mechanism. Camille Wermuth named the related strategy of starting from an old drug's *side* effect "selective optimisation of side activities" (SOSA): the side activity becomes the main one, and the starting molecule is already known to be safe and drug-like. The serendipitous discovery that sildenafil, developed for angina, had a pronounced effect on erectile function is a well-known example of a side activity becoming an indication.

### Phenotypic screening

Instead of testing compounds against a purified target, one can test them on cells or organisms and look for the desired change in **phenotype** — bacteria killed, a cancer cell line stopped from dividing, a protein redistributed in a cell. The target is identified afterwards (if at all). David Swinney and Jason Anthony found in 2011 that, among first-in-class drugs approved by the FDA between 1999 and 2008, more had come from phenotypic screening than from target-based approaches. Phenotypic screens can find mechanisms nobody predicted; their cost is the difficulty of knowing *why* a compound works.

## High-throughput screening

**High-throughput screening** (HTS) tests a library of typically $10^5$–$10^6$ compounds, one concentration each (often $10\ \mu\mathrm{mol\,dm^{-3}}$), in miniaturised assays in plates of 384 or 1536 wells, handled by robots. The readout — fluorescence, luminescence, absorbance, a radioactive count — is compared with positive controls (full inhibition) and negative controls (no compound). The whole campaign succeeds only if the assay separates actives from inactives reliably, in the presence of plate-to-plate drift, pipetting error and a million chances for a false alarm.

::: proposition The Z′-factor {#prop-zprime}
Let the positive and negative controls of an assay give signals with means $\mu_\mathrm{p}$, $\mu_\mathrm{n}$ and standard deviations $\sigma_\mathrm{p}$, $\sigma_\mathrm{n}$. Define the **separation band** as the gap between the points three standard deviations inside each control mean, $\lvert\mu_\mathrm{p} - \mu_\mathrm{n}\rvert - 3(\sigma_\mathrm{p} + \sigma_\mathrm{n})$. The **Z′-factor** is the separation band as a fraction of the dynamic range $\lvert\mu_\mathrm{p} - \mu_\mathrm{n}\rvert$:
$$
Z' = 1 - \frac{3(\sigma_\mathrm{p} + \sigma_\mathrm{n})}{\lvert\mu_\mathrm{p} - \mu_\mathrm{n}\rvert}.
$$ {#eq-zprime}
If the signals are normally distributed, $Z' > 0$ means that the $\pm 3\sigma$ bands of the two controls do not overlap, so fewer than about 0.14 % of each control population fall beyond its band towards the other. By convention (Zhang, Chung and Oldenburg, 1999) an assay with $Z' \geq 0.5$ is considered excellent for screening; $Z' = 1$ is an ideal assay with no noise.
:::

::: proof
For a normal distribution, a fraction $\tfrac12\operatorname{erfc}(3/\sqrt 2) = 0.00135$ of values lies more than $3\sigma$ above the mean, and the same below. The positive-control band therefore ends at $\mu_\mathrm{p} - 3\sigma_\mathrm{p}$ (taking $\mu_\mathrm{p} > \mu_\mathrm{n}$) and the negative-control band at $\mu_\mathrm{n} + 3\sigma_\mathrm{n}$; the bands are separated by a gap of width $(\mu_\mathrm{p} - \mu_\mathrm{n}) - 3(\sigma_\mathrm{p} + \sigma_\mathrm{n})$, and they fail to overlap exactly when this width is positive. Dividing by the range gives [[#eq-zprime]], which is positive under the same condition. The scale makes the statistic independent of the units of the signal, so that assays of different kinds can be compared; the constant 3 is a convention, not a derivation from the screen's size.
:::

::: example Is the assay good enough? {#ex-zprime}
In a fluorescence assay, uninhibited (negative-control) wells give a mean of 100 units with $\sigma = 5$, and fully inhibited (positive-control) wells a mean of 10 with $\sigma = 4$. Find $Z'$. A test compound gives 70 units; what percentage inhibition is that?
::: solution
By [[#eq-zprime]], $Z' = 1 - 3(5 + 4)/(100 - 10) = 1 - 27/90 = 0.70$: an excellent assay. Percentage inhibition is measured on the scale between the controls: $100 \times (100 - 70)/(100 - 10) = 33\ \%$. The negative-control noise is $5/90 = 5.6\ \%$ of the range, so a single well at 33 % lies about six standard deviations from the uninhibited mean and would be called active — but it must still be retested.
:::
:::

### False positives: statistics and chemistry

A screen of a million compounds is a million statistical tests. If a compound is declared active when its signal lies more than three standard deviations from the negative-control mean, a fraction 0.00135 of *inactive* compounds will cross the threshold by chance alone.

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: 3
b: 6
caption: The distribution of assay signals (in standard deviations from the mean of inactive compounds) under the null hypothesis that a compound has no effect. The shaded tail beyond $3\sigma$ holds a probability of $0.00135$; in a screen of $10^6$ inactive compounds it contains about 1350 of them. Move the threshold $a$ to 4 and the tail falls to $3\times10^{-5}$ (about 32 compounds) — at the price of missing genuine weak actives.
:::

::: example How many of the "hits" are real? {#ex-ppv}
A library of $10^{6}$ compounds contains 100 genuine actives, each of which the assay detects with probability 0.90 at a $3\sigma$ threshold. What fraction of the compounds that cross the threshold are genuine actives?
::: solution
True positives: $100 \times 0.90 = 90$. False positives: $(10^6 - 100) \times 0.00135 = 1350$. The positive predictive value is $90/(90 + 1350) = 0.063$: only about 6 % of the primary hits are real. This is Bayes's theorem at work: when true actives are rare, even a good assay produces mostly false alarms. Retesting in duplicate helps — two independent chance excursions are rarer than one — and every hit must then be confirmed by a full concentration–response curve and by an independent assay using a different readout.
:::
:::

Chance is only one source of false positives; chemistry supplies more. Some compounds fluoresce or quench fluorescence; some are redox cyclers that generate hydrogen peroxide in reducing buffers; some are reactive electrophiles that modify any protein; some chelate metals. Jonathan Baell and Georgina Holloway catalogued recurring culprits in 2010 as **PAINS** (pan-assay interference compounds) — rhodanines, quinones, catechols, certain enones among them. Brian Shoichet's group showed in 2002 that many screening hits are **aggregators**: at micromolar concentrations they form colloidal particles that sequester and partially denature enzymes, giving inhibition that is non-specific, steep and abolished by a little non-ionic detergent. Aggregation is so common that a detergent counter-screen is standard.

### Confirming a hit

A confirmed hit has a concentration–response curve, usually fitted to the four-parameter logistic function
$$
y = y_\mathrm{min} + \frac{y_\mathrm{max} - y_\mathrm{min}}{1 + ([\mathrm{I}]/\mathrm{IC_{50}})^{n_\mathrm{H}}},
$$ {#eq-logistic}
an empirical form whose Hill coefficient $n_\mathrm{H}$ is close to 1 for a simple 1 : 1 inhibitor. A curve much steeper than this ($n_\mathrm{H} \geq 2$) is a warning sign — of aggregation, of covalent or tight-binding behaviour, or of denaturation.

::: widget plot
f: 100/(1 + 10^(n*(x - p))); 100/(1 + 10^(x - p))
x: -9, -3
y: 0, 105
sliders: p=-6:-8:-4:0.1; n=1:0.5:4:0.1
labels: \text{Hill slope } n; \text{reference, slope } 1
hlines: 50
caption: Percentage of enzyme activity remaining against $x = \log_{10}([\mathrm{I}]/\mathrm{mol\,dm^{-3}})$, from [[#eq-logistic]] with $\log_{10}\mathrm{IC_{50}} = p$. A well-behaved 1 : 1 inhibitor ($n = 1$) needs an 81-fold range of concentration to go from 90 % to 10 % activity. Raise $n$ to 3 and the same change happens over a factor of about 4 — the "cliff" typical of an aggregator, which is inactive below its critical aggregation concentration and inhibits almost completely above it.
:::

Beyond the curve, hits are confirmed with **biophysical** methods that see binding directly: surface plasmon resonance (kinetics, [[medicinal-chemistry/drug-binding]]), isothermal titration calorimetry, ligand- or protein-observed NMR, thermal-shift assays and, best of all, a crystal structure of the complex. The compound is resynthesised or repurchased and its identity and purity checked by LC–MS and NMR, because a surprising number of screening "hits" turn out to be impurities or decomposition products.

## Measuring quality: ligand efficiency

Hits differ in size, and size buys affinity: other things being equal, a bigger molecule makes more contacts. Comparing a $10\ \mu\mathrm{mol\,dm^{-3}}$ hit of 15 heavy atoms with a $100\ \mathrm{nmol\,dm^{-3}}$ hit of 40 heavy atoms by potency alone would pick the larger one — which may be the poorer starting point, since optimisation almost always adds atoms and a drug should stay within the property limits of [[medicinal-chemistry/pharmacokinetics#def-ro5]].

::: definition Ligand efficiency and lipophilic ligand efficiency {#def-le}
The **ligand efficiency** of a compound with $N_\mathrm{HA}$ non-hydrogen ("heavy") atoms is its binding free energy per heavy atom (Andrew Hopkins, Colin Groom and Alexander Alex, 2004):
$$
\mathrm{LE} = \frac{-\Delta_\mathrm{b}G^\circ}{N_\mathrm{HA}} = \frac{RT\ln 10\;\mathrm{p}K_\mathrm{d}}{N_\mathrm{HA}} \approx \frac{1.36\,\mathrm{p}K_\mathrm{d}}{N_\mathrm{HA}}\ \mathrm{kcal\,mol^{-1}} = \frac{5.71\,\mathrm{p}K_\mathrm{d}}{N_\mathrm{HA}}\ \mathrm{kJ\,mol^{-1}}\ \ (298\ \mathrm{K}),
$$ {#eq-le}
where $\mathrm{p}K_\mathrm{d}$ may be replaced by $\mathrm{p}K_\mathrm{I}$ or, approximately, by $\mathrm{pIC_{50}}$. The **lipophilic ligand efficiency** (Paul Leeson and Brian Springthorpe, 2007) is $\mathrm{LLE} = \mathrm{p}K_\mathrm{d} - \log P$ (or $\log D$). Both are **empirical** metrics. By convention LE is quoted in $\mathrm{kcal\,mol^{-1}}$ per heavy atom, and values of about $0.3$ or more (about $1.25\ \mathrm{kJ\,mol^{-1}}$) are considered good; for an oral drug, LLE values of 5 or more are considered desirable.
:::

The threshold 0.3 has a simple origin. A drug-sized molecule of 38 heavy atoms (molar mass about $500\ \mathrm{g\,mol^{-1}}$) with LE = 0.3 has $\mathrm{p}K_\mathrm{d} = 0.3 \times 38/1.36 = 8.4$, a typical potency for a drug. A hit that starts with LE well below 0.3 will need to become more efficient as it grows — something that rarely happens — if it is to reach nanomolar potency without exceeding the size limit. LLE addresses the second inflation: potency gained by adding lipophilicity, which tends to come with poor solubility, high metabolic clearance, promiscuous off-target binding and toxicity. An LLE of 5 means, for example, a $\mathrm{p}K_\mathrm{d}$ of 8 at $\log P = 3$.

::: example Comparing a fragment and a lead {#ex-le}
A fragment of 12 heavy atoms binds with $K_\mathrm{d} = 200\ \mu\mathrm{mol\,dm^{-3}}$; a lead derived from it has 36 heavy atoms and $K_\mathrm{d} = 5.0\ \mathrm{nmol\,dm^{-3}}$. Calculate the ligand efficiency of each at $298\ \mathrm{K}$, in $\mathrm{kJ\,mol^{-1}}$ and in $\mathrm{kcal\,mol^{-1}}$ per heavy atom.
::: solution
Fragment: $\mathrm{p}K_\mathrm{d} = -\log(2.0\times10^{-4}) = 3.70$, $-\Delta_\mathrm{b}G^\circ = 5.71 \times 3.70 = 21.1\ \mathrm{kJ\,mol^{-1}}$, $\mathrm{LE} = 21.1/12 = 1.76\ \mathrm{kJ\,mol^{-1}}$ $= 0.42\ \mathrm{kcal\,mol^{-1}}$ per heavy atom. Lead: $\mathrm{p}K_\mathrm{d} = 8.30$, $-\Delta_\mathrm{b}G^\circ = 47.4\ \mathrm{kJ\,mol^{-1}}$, $\mathrm{LE} = 1.32\ \mathrm{kJ\,mol^{-1}}$ $= 0.31\ \mathrm{kcal\,mol^{-1}}$ per heavy atom. The lead is 40 000 times more potent but less efficient: the 24 atoms added contributed $(47.4 - 21.1)/24 = 1.10\ \mathrm{kJ\,mol^{-1}}$ each, less than the fragment's average. This is typical — small fragments have the highest LE values, because a few atoms in the best positions do most of the work — and it is why size-dependent versions of LE have been proposed.
:::
:::

::: widget plot
f: a*x/1.364; 0.3*x/1.364
x: 0, 50
y: 0, 14
sliders: a=0.4:0.2:0.6:0.01
labels: \mathrm{p}K_\mathrm{d}\ \text{at LE} = a; \text{LE} = 0.3
points: 12,3.7; 36,8.3; 38,8.4
caption: The $\mathrm{p}K_\mathrm{d}$ needed to maintain a given ligand efficiency (in $\mathrm{kcal\,mol^{-1}}$ per heavy atom) as heavy atoms $x$ are added, from [[#eq-le]] rearranged: $\mathrm{p}K_\mathrm{d} = \mathrm{LE}\cdot N_\mathrm{HA}/1.364$. The points are the fragment and lead of [[#ex-le]] and a 38-atom drug at LE = 0.3. A compound below the LE = 0.3 line at 38 atoms cannot be a nanomolar drug without breaking the size guidelines. Notice how quickly the lines climb: at 50 heavy atoms LE = 0.3 already demands $\mathrm{p}K_\mathrm{d} = 11$.
:::

::: warning Efficiency metrics are guides, not physical constants {#warn-le}
Ligand efficiency divides a logarithmic quantity, whose zero depends on the arbitrary choice of standard state $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$, by an atom count. Changing the standard state to $1\ \mathrm{mmol\,dm^{-3}}$ would change every LE value, and by more for small molecules — so comparisons of LE between molecules of very different size are partly an artefact of convention. Atoms are also not equal: a chlorine and a fluorine count the same. Used to compare compounds of similar size in one series, or to flag inefficient growth, LE and LLE are valuable; treated as quantities to be maximised for their own sake, they mislead.
:::

## Fragment-based discovery

Fragment-based drug discovery (FBDD) turns the efficiency argument into a strategy. Instead of screening a million drug-sized molecules, one screens a thousand or so very small ones — "fragments" — at high concentration, accepts very weak binding, and then grows the efficient binders into leads under the guidance of crystal structures.

Why should small molecules be a better place to start? Michael Hann, Andrew Leach and Gavin Harper gave a simple model in 2001: the probability that a random molecule matches a binding site *exactly* falls steeply with its complexity, because every extra feature must fit as well, while the probability of a *detectable* interaction rises with complexity. Simple molecules are therefore more likely to bind in a way that is all "right", if weakly. And far fewer molecules are needed to sample fragment space well: Jean-Louis Reymond's enumeration GDB-11 (2007) found only about $2.6\times10^{7}$ possible molecules of up to 11 heavy atoms (C, N, O and F) against $10^{60}$ or so drug-sized ones, so a library of $10^3$ fragments covers its space far better than $10^6$ compounds cover theirs.

::: definition The rule of three (empirical) {#def-ro3}
Miles Congreve and colleagues at Astex (2003) observed that good fragment hits usually have molar mass below $300\ \mathrm{g\,mol^{-1}}$, at most 3 hydrogen-bond donors, at most 3 acceptors and calculated $\log P$ at most 3 (with, as later suggested, at most 3 rotatable bonds and polar surface area at most $60\ \text{Å}^2$). Like the rule of five, this **empirical** "rule of three" describes successful past examples; it is used to design fragment libraries, not to predict binding.
:::

Fragments bind with $K_\mathrm{d}$ values from about $10\ \mu\mathrm{mol\,dm^{-3}}$ to $10\ \mathrm{mmol\,dm^{-3}}$ — too weak for most biochemical assays — so they are detected biophysically: by protein-observed NMR (the "SAR by NMR" method of Stephen Fesik and colleagues at Abbott, 1996, which watches amide chemical shifts of the $^{15}\mathrm{N}$-labelled protein move as a fragment binds), ligand-observed NMR, surface plasmon resonance, thermal shift and, above all, X-ray crystallography of protein crystals soaked in fragment solutions. The crystal structure shows exactly where and how each fragment binds, and that is what makes the weak hit useful.

From there, fragments are optimised by **growing** (adding atoms that reach adjacent sub-pockets, ideally keeping LE), **merging** (combining features of overlapping fragments) or **linking** (joining two fragments that bind in adjacent sites). Linking promises the biggest jump, because binding free energies add.

::: proposition Free energy of linking two fragments {#prop-linking}
Let fragments A and B bind adjacent sites of a protein independently with dissociation constants $K_\mathrm{A}$ and $K_\mathrm{B}$, and let them be joined by a linker into a molecule A–B that binds both sites at once with $K_\mathrm{AB}$. Then
$$
\Delta G_\mathrm{AB} = \Delta G_\mathrm{A} + \Delta G_\mathrm{B} + \Delta G_\mathrm{link}, \qquad K_\mathrm{AB} = \frac{K_\mathrm{A}K_\mathrm{B}}{E_\mathrm{M}},
$$ {#eq-linking}
with all $\Delta G$ standard binding free energies, and where $E_\mathrm{M} = c^\circ\exp(-\Delta G_\mathrm{link}/RT)$, the **effective molarity** of the second fragment once the first is bound, collects the entropy saved by linking and the strain, misplacement and interactions of the linker. Ideal linking ($\Delta G_\mathrm{link} \approx 0$, $E_\mathrm{M} \approx 1\ \mathrm{mol\,dm^{-3}}$) would give $K_\mathrm{AB} = K_\mathrm{A}K_\mathrm{B}/c^\circ$.
:::

::: proof
Free energy is a state function, so we may reach the complex $\mathrm{P{\cdot}(A{-}B)}$ from the separate species by any path. Bind A ($\Delta G_\mathrm{A}$), bind B in its adjacent site ($\Delta G_\mathrm{B}$, unchanged if the two sites are independent), then form the covalent link between the two bound fragments. The free energy of this last, intramolecular step, relative to the corresponding change for linking A and B free in solution (which is the same for the free and bound forms of the ligand and so cancels in the binding free energy), defines $\Delta G_\mathrm{link}$. Summing gives the first equation. Writing each $\Delta G = RT\ln(K/c^\circ)$ and exponentiating, $K_\mathrm{AB}/c^\circ = (K_\mathrm{A}/c^\circ)(K_\mathrm{B}/c^\circ)\exp(\Delta G_\mathrm{link}/RT)$, which is the second equation with $E_\mathrm{M}$ as defined. The physical content, emphasised by William Jencks in 1981, is that a large unfavourable term — the loss of overall translational and rotational entropy on binding — is paid twice by the separate fragments but only once by the linked molecule; this saving makes $\Delta G_\mathrm{link}$ potentially negative, and $E_\mathrm{M}$ can in principle exceed $1\ \mathrm{mol\,dm^{-3}}$.
:::

::: example Linking two fragments {#ex-linking}
Two fragments bind adjacent sites with $K_\mathrm{A} = 1.0\ \mathrm{mmol\,dm^{-3}}$ and $K_\mathrm{B} = 0.50\ \mathrm{mmol\,dm^{-3}}$. The best linked compound has $K_\mathrm{AB} = 1.0\ \mu\mathrm{mol\,dm^{-3}}$. Find the effective molarity and $\Delta G_\mathrm{link}$ at $298\ \mathrm{K}$, and the affinity that ideal linking would have given.
::: solution
By [[#eq-linking]], $E_\mathrm{M} = K_\mathrm{A}K_\mathrm{B}/K_\mathrm{AB} = (1.0\times10^{-3})(5.0\times10^{-4})/(1.0\times10^{-6}) = 0.50\ \mathrm{mol\,dm^{-3}}$. The binding free energies are $\Delta G_\mathrm{A} = RT\ln(10^{-3}) = -17.1$, $\Delta G_\mathrm{B} = -18.8$ and $\Delta G_\mathrm{AB} = -34.2\ \mathrm{kJ\,mol^{-1}}$, so $\Delta G_\mathrm{link} = -34.2 - (-17.1 - 18.8) = +1.7\ \mathrm{kJ\,mol^{-1}}$. Ideal linking would have given $K_\mathrm{AB} = 5\times10^{-7}\ \mathrm{mol\,dm^{-3}}$, only twice better. Getting a millimolar and a sub-millimolar fragment to a micromolar compound is a large gain (a thousandfold over the better fragment), but in practice linkers rarely achieve $E_\mathrm{M} \gg 1\ \mathrm{mol\,dm^{-3}}$, because a linker that preserves both binding modes exactly without strain is hard to find. That is why growing is more common than linking.
:::
:::

The approach has produced several medicines. Vemurafenib, an inhibitor of the V600E mutant of the kinase BRAF approved in 2011 for melanoma, was the first: Plexxikon's scientists grew it from a 7-azaindole fragment that bound the kinase hinge region, guided by crystal structures. Venetoclax (2016), the BCL-2 inhibitor mentioned in [[medicinal-chemistry/drug-targets]], descends from two fragments found by SAR by NMR that bound adjacent sites in the groove of the related protein BCL-xL and were linked and then extensively optimised.

## Computational and encoded libraries

**Virtual screening** docks large libraries of computer-generated molecules into a protein structure and ranks them by a scoring function ([[medicinal-chemistry/structure-based-design]]). The libraries can be enormous because nothing needs to be made until the end: "make-on-demand" collections of molecules synthesisable in one or two steps from stock building blocks now exceed $10^{10}$ compounds, and docking campaigns of hundreds of millions to billions of molecules have found potent ligands for GPCRs and enzymes. **Ligand-based** virtual screening instead searches for molecules similar to a known active, by fingerprints of substructures or by three-dimensional shape and pharmacophore matching ([[medicinal-chemistry/structure-activity]]).

**DNA-encoded libraries** (DELs), proposed by Sydney Brenner and Richard Lerner in 1992, combine synthesis with a barcode. Each building block added in a split-and-pool synthesis is recorded by ligating a short DNA sequence to the growing molecule, so that a single tube can contain $10^8$–$10^{10}$ different DNA-tagged compounds. The mixture is incubated with the immobilised target, unbound compounds are washed away, and the DNA tags of the binders are amplified by PCR and sequenced to reveal their structures.

::: example The arithmetic of split-and-pool {#ex-del}
A DNA-encoded library is built in three cycles, each using 1000 different building blocks; after each cycle the pooled material is split into 1000 portions for the next. How many compounds does the library contain, and how many separate reactions are needed? If the library is screened with $10^{-15}$ mol of total compound, roughly how many molecules of each member are present?
::: solution
Number of compounds: $1000^3 = 1.0\times10^{9}$. Reactions: only $3 \times 1000 = 3000$, because each reaction is applied to a pool containing every product of the previous cycles; this is the economy of split-and-pool combinatorial chemistry. Copies per member: $(10^{-15}\ \mathrm{mol})(6.022\times10^{23}\ \mathrm{mol^{-1}})/10^{9} = 6.0\times10^{-1}$ — fewer than one on average. In practice far larger amounts are used, so that each member is present in about $10^5$–$10^6$ copies, but the calculation shows why DEL screening relies on PCR amplification: each compound is present in femtomolar to attomolar amounts, and only the DNA tag makes its detection possible.
:::
:::

## From hit to lead

The **hit-to-lead** phase turns a list of confirmed hits into one or two lead series. Its logic is triage: discard what cannot work as early and as cheaply as possible.

::: algorithm Hit triage and hit-to-lead {#algo-triage}
1. **Confirm activity**: retest from fresh solid, full concentration–response, Hill slope near 1, activity unaffected by detergent.
2. **Confirm mechanism**: an orthogonal assay with a different readout, biophysical evidence of binding to the target, and where possible a crystal structure.
3. **Remove liabilities**: flag PAINS and reactive groups, check purity and identity, check selectivity against close homologues and frequent-hitter panels.
4. **Cluster** hits into chemical series and look for a structure–activity relationship among near neighbours (analogues bought or made quickly): a series in which small changes give coherent changes in activity is optimisable; a singleton with flat SAR often is not.
5. **Assess properties**: ligand efficiency and LLE, solubility, permeability, metabolic stability in liver microsomes, early safety flags (hERG, cytotoxicity).
6. **Choose leads**: one or a few series with potency, efficiency, tractable synthesis and room for improvement in every parameter that falls short, and with intellectual property that can be protected.
:::

::: quiz
A screening hit has $\mathrm{IC_{50}} = 2\ \mu\mathrm{mol\,dm^{-3}}$ and a Hill coefficient of 3.2, and its activity disappears when 0.01 % Triton X-100 is added to the buffer. What is the most likely explanation?
- [ ] It is a highly cooperative allosteric inhibitor that should be prioritised.
- [x] It forms colloidal aggregates that inhibit the enzyme non-specifically.
- [ ] It is a covalent inhibitor, which explains the steep curve.
- [ ] The detergent denatures the enzyme, so the result is uninterpretable.
::: solution
A very steep curve that is abolished by a small amount of non-ionic detergent is the signature of aggregation-based inhibition (McGovern, Shoichet and colleagues, 2002). Detergent at this concentration disrupts the colloids without harming most enzymes — which is checked with control inhibitors. A covalent inhibitor would show time-dependence, not detergent sensitivity.
:::
:::

::: history
Early drug discovery screened natural extracts and dyes in animals: Paul Ehrlich's team tested hundreds of arsenicals before finding salvarsan (1909–1910), and Gerhard Domagk's discovery of Prontosil (1935) came from screening azo dyes in infected mice. Alexander Fleming observed the antibacterial mould in 1928, and Howard Florey and Ernst Chain's Oxford team purified penicillin and showed its effect in 1940. Monroe Wall and Mansukh Wani reported the structure of paclitaxel in 1971, and Tu Youyou's group isolated artemisinin in 1972. James Black and Robin Ganellin's rational modification of histamine produced cimetidine in the early 1970s. Robotic high-throughput screening grew up in the pharmaceutical industry in the late 1980s and 1990s alongside combinatorial chemistry; Ji-Hu Zhang, Thomas Chung and Kevin Oldenburg published the Z′-factor in 1999. Sydney Brenner and Richard Lerner proposed DNA-encoded chemistry in 1992. Stephen Fesik's group introduced SAR by NMR in 1996, Michael Hann and colleagues the complexity model in 2001, Miles Congreve and colleagues the rule of three in 2003, and Andrew Hopkins and colleagues ligand efficiency in 2004. Vemurafenib, approved in 2011, was the first marketed drug derived from a fragment screen.
:::

## Where this leads

A lead is a starting point. [[medicinal-chemistry/structure-activity]] describes the systematic modification of leads — pharmacophores, bioisosteres and quantitative structure–activity relationships — and [[medicinal-chemistry/structure-based-design]] the use of protein structures to guide that modification, including docking for virtual screening. The pharmacokinetic properties checked during triage are those of [[medicinal-chemistry/pharmacokinetics]]. The statistics of screening draw on hypothesis testing and Bayes's theorem; Maths Atlas (`/learn/maths/`) covers both, and the treatment of measurement uncertainty in [[analytical-chemistry/statistics-calibration]] applies directly to assay data.

::: summary
- Hits come from natural products, known ligands and drugs, phenotypic screens, high-throughput screens of $10^5$–$10^6$ compounds, fragment screens, virtual screening and DNA-encoded libraries; chemical space (about $10^{60}$ drug-like molecules) can only be sampled.
- An assay's quality is summarised by $Z' = 1 - 3(\sigma_\mathrm{p} + \sigma_\mathrm{n})/\lvert\mu_\mathrm{p} - \mu_\mathrm{n}\rvert$; $Z' \geq 0.5$ is excellent.
- When actives are rare, most primary hits are false positives (Bayes); hits must be confirmed by concentration–response, orthogonal assays and biophysics, and checked for PAINS and aggregation (steep Hill slopes, detergent sensitivity).
- Ligand efficiency $\mathrm{LE} = -\Delta_\mathrm{b}G^\circ/N_\mathrm{HA} \approx 1.36\,\mathrm{p}K_\mathrm{d}/N_\mathrm{HA}\ \mathrm{kcal\,mol^{-1}}$ and $\mathrm{LLE} = \mathrm{p}K_\mathrm{d} - \log P$ are empirical metrics that guard against gaining potency through size and lipophilicity; LE ≈ 0.3 and LLE ≈ 5 are common targets.
- Fragment-based discovery screens small molecules (empirical rule of three) at high concentration by biophysical methods and grows, merges or links them using crystal structures; linking gives $K_\mathrm{AB} = K_\mathrm{A}K_\mathrm{B}/E_\mathrm{M}$.
- Hit-to-lead is triage: confirm, remove liabilities, find a series with coherent SAR and good properties.
:::

## Exercises

::: exercise Ligand efficiency {level=1 check="0.4"}
A hit with 25 heavy atoms has $K_\mathrm{d} = 50\ \mathrm{nmol\,dm^{-3}}$. Calculate its ligand efficiency at $298\ \mathrm{K}$. (Enter LE in $\mathrm{kcal\,mol^{-1}}$ per heavy atom, to one significant figure.)
::: solution
$\mathrm{p}K_\mathrm{d} = -\log(5.0\times10^{-8}) = 7.30$. By [[#eq-le]], $\mathrm{LE} = 1.364 \times 7.30/25 = 0.40\ \mathrm{kcal\,mol^{-1}}$ per heavy atom ($1.67\ \mathrm{kJ\,mol^{-1}}$). A very efficient hit.
:::
:::

::: exercise Lipophilic ligand efficiency {level=1 check="5.5"}
Compound A has $\mathrm{pIC_{50}} = 8.0$ and $\log D = 3.5$; compound B has $\mathrm{pIC_{50}} = 7.0$ and $\log D = 1.5$. Calculate the LLE of each and say which is the better starting point by this criterion. (Enter the higher LLE.)
::: solution
$\mathrm{LLE_A} = 8.0 - 3.5 = 4.5$; $\mathrm{LLE_B} = 7.0 - 1.5 = 5.5$. Compound B is tenfold less potent but makes better use of its lipophilicity; its potency is more likely to come from specific interactions, and it leaves more room to add lipophilic groups during optimisation.
:::
:::

::: exercise Z′ of a marginal assay {level=1 check="0.34"}
An assay's controls give $\mu_\mathrm{n} = 60$, $\sigma_\mathrm{n} = 8$ and $\mu_\mathrm{p} = 10$, $\sigma_\mathrm{p} = 3$. Calculate $Z'$ and comment. (Enter $Z'$ to two significant figures.)
::: solution
$Z' = 1 - 3(8 + 3)/(60 - 10) = 1 - 33/50 = 0.34$. The assay is usable but marginal ($0 < Z' < 0.5$): it will produce many false positives and negatives. Most of the problem lies in the noise of the negative control, which should be addressed first.
:::
:::

::: exercise Finding at least one hit {level=2 check="0.632"}
Suppose actives occur at random in a library with a frequency of 1 in $10^{5}$. If you screen $10^{5}$ compounds and detect every active, what is the probability of finding at least one? (Use the Poisson approximation. Enter the probability to three significant figures.)
::: solution
The expected number of actives is $\lambda = 10^5 \times 10^{-5} = 1$. The Poisson probability of none is $e^{-1} = 0.368$, so the probability of at least one is $1 - e^{-1} = 0.632$. Screening twice as many compounds raises it to $1 - e^{-2} = 0.865$. Libraries of $10^6$ are used not because a hit is guaranteed, but to have several independent series to choose from.
:::
:::

::: exercise The cost of size {level=2 check="11"}
What $\mathrm{p}K_\mathrm{d}$ would a compound of 50 heavy atoms need in order to have a ligand efficiency of $0.30\ \mathrm{kcal\,mol^{-1}}$ per heavy atom at $298\ \mathrm{K}$? Comment on what this implies. (Enter $\mathrm{p}K_\mathrm{d}$ to two significant figures.)
::: solution
From [[#eq-le]], $\mathrm{p}K_\mathrm{d} = \mathrm{LE}\cdot N_\mathrm{HA}/1.364 = 0.30 \times 50/1.364 = 11$. A $K_\mathrm{d}$ of $10^{-11}\ \mathrm{mol\,dm^{-3}}$ is rare for small molecules, and measuring it needs specialised methods. Large molecules almost inevitably have lower LE; for them, LE thresholds are relaxed and other measures (LLE, properties) matter more.
:::
:::

::: exercise Growing a fragment efficiently {level=2 check="5.6"}
A fragment with 10 heavy atoms binds with $\mathrm{p}K_\mathrm{d} = 3.5$. If six atoms are added and LE is maintained exactly, what $\mathrm{p}K_\mathrm{d}$ should the grown compound have? (Enter $\mathrm{p}K_\mathrm{d}$ to two significant figures.)
::: solution
At constant LE, $\mathrm{p}K_\mathrm{d}$ is proportional to $N_\mathrm{HA}$: $\mathrm{p}K_\mathrm{d} = 3.5 \times 16/10 = 5.6$. The fragment's LE is $1.364 \times 3.5/10 = 0.48\ \mathrm{kcal\,mol^{-1}}$ per heavy atom, so the six new atoms must contribute $0.48 \times 6 = 2.9\ \mathrm{kcal\,mol^{-1}}$ ($12\ \mathrm{kJ\,mol^{-1}}$) between them — a little over 100-fold in affinity.
:::
:::

::: exercise Fragment linking from first principles {level=3}
(a) Using [[#prop-linking]], show that if two fragments each with $\mathrm{p}K_\mathrm{d} = 3$ are linked ideally ($E_\mathrm{M} = 1\ \mathrm{mol\,dm^{-3}}$), the product has $\mathrm{p}K_\mathrm{d} = 6$, and that its ligand efficiency equals the average of the fragments' if the linker adds no heavy atoms. (b) A linker of three heavy atoms is used and the product has $\mathrm{p}K_\mathrm{d} = 5$. If each fragment has 10 heavy atoms, compare the LE of the fragments and the product, and find $E_\mathrm{M}$. (c) Explain physically why $E_\mathrm{M}$ could in principle exceed $1\ \mathrm{mol\,dm^{-3}}$.
::: hint
In logarithmic form, [[#eq-linking]] reads $\mathrm{p}K_\mathrm{AB} = \mathrm{p}K_\mathrm{A} + \mathrm{p}K_\mathrm{B} + \log_{10}(E_\mathrm{M}/c^\circ)$.
:::
::: solution
(a) $\mathrm{p}K_\mathrm{AB} = 3 + 3 + \log 1 = 6$. With no added atoms, $N_\mathrm{HA}(\mathrm{AB}) = N_\mathrm{A} + N_\mathrm{B}$ and $-\Delta G_\mathrm{AB} = -\Delta G_\mathrm{A} - \Delta G_\mathrm{B}$, so $\mathrm{LE_{AB}} = (N_\mathrm{A}\mathrm{LE_A} + N_\mathrm{B}\mathrm{LE_B})/(N_\mathrm{A} + N_\mathrm{B})$, the atom-weighted average.

(b) Fragments: $\mathrm{LE} = 1.364 \times 3/10 = 0.41$ each. Product: $1.364 \times 5/23 = 0.30\ \mathrm{kcal\,mol^{-1}}$ per heavy atom. $\log(E_\mathrm{M}/c^\circ) = 5 - 6 = -1$, so $E_\mathrm{M} = 0.10\ \mathrm{mol\,dm^{-3}}$; $\Delta G_\mathrm{link} = +5.7\ \mathrm{kJ\,mol^{-1}}$. The linked compound is a hundredfold more potent than either fragment, yet less efficient, because the linker is imperfect and adds atoms that make no contacts.

(c) Each separately bound fragment pays the large entropic cost of losing its own overall translation and rotation on binding; the linked molecule pays it only once. If the linker holds both fragments in exactly their bound positions without strain and without losing interactions, this saving makes $\Delta G_\mathrm{link}$ negative, so $E_\mathrm{M} > 1\ \mathrm{mol\,dm^{-3}}$ — "superadditivity". Effective molarities of $10^{2}$ or more are known for intramolecular reactions, but linkers usually lose some of the saving to residual flexibility and imperfect geometry.
:::
:::

::: exercise Replicates and false positives {level=3 check="0.978"}
In the screen of [[#ex-ppv]], all compounds that cross the $3\sigma$ threshold are retested once, independently, with the same threshold. (a) Assuming that false positives are purely random noise (independent between tests) and that each genuine active is again detected with probability 0.90, what fraction of the compounds active in both tests are genuine? (b) Repeat the calculation if 20 of the inactive compounds are reproducible artefacts (interference compounds or aggregators) that cross the threshold in every test. (Enter the fraction for part (a) to three significant figures.)
::: hint
Count genuine actives passing both tests ($100 \times 0.90^2$) and inactives passing both by chance ($(10^6 - 100) \times 0.00135^2$).
:::
::: solution
(a) Genuine actives passing twice: $100 \times 0.81 = 81$. Inactives passing twice by chance: $999\,900 \times (0.00135)^2 = 999\,900 \times 1.822\times10^{-6} = 1.82$. The fraction genuine is $81/(81 + 1.82) = 0.978$, up from 0.063 after a single test.

(b) The artefacts pass both tests, while the remaining $999\,880$ inactives still contribute 1.82 chance double-passes: the fraction genuine is $81/(81 + 1.82 + 20) = 0.788$. Replicates remove noise, not artefacts. Because interference compounds, aggregators and reactive molecules give the same false signal every time, only orthogonal assays with a different readout, detergent counter-screens and biophysical binding measurements remove them.
:::
:::
