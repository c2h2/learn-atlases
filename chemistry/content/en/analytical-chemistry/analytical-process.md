A school reports that the water from one of its drinking fountains "contains lead". Is that a crisis or a curiosity? Every water supply contains *some* lead if you look hard enough; the question that matters is how much, compared with a limit — the World Health Organization guideline value is $10\ \mu\mathrm{g\,dm^{-3}}$ — and how sure we are of the number. To answer it a chemist must decide what exactly to measure (dissolved lead? total lead including particles? first-draw water after a night in the pipes, or water after flushing?), collect a sample that actually represents that, get the lead into a form an instrument can read without losing any or adding any, measure it against standards, and report a result with an uncertainty small enough to tell $8$ from $12\ \mu\mathrm{g\,dm^{-3}}$. Each of those steps can ruin the answer, and the most expensive instrument in the laboratory cannot rescue a badly chosen sample.

That chain of decisions is the **analytical process**, and it is the subject of this chapter. Analytical chemistry is often taught as a catalogue of techniques — titrations, spectrometers, chromatographs — and the rest of this course does cover them in depth. But a technique is only one link. Here we look at the whole chain: what question is being asked, what the sample is and how it is taken, how it is prepared, and what a reported number has to carry to be useful. Along the way we derive the three quantitative results that govern the early links: variances of sampling and measurement add, the number of particles a sample must contain follows from the binomial distribution, and repeated small extractions beat one large one. The laboratory skills behind it — the balance, volumetric glassware and standard solutions — are those of [[laboratory-methods/volumetric-technique]], and the language of uncertainty is that of [[laboratory-methods/measurement-uncertainty]].

## What analytical chemistry asks

::: definition Analyte, matrix, sample and interference {#def-analyte-matrix}
The **analyte** is the chemical species whose identity or amount we want (lead, glucose, a pesticide residue). The **sample** is the portion of material actually brought to the laboratory, and the **matrix** is everything in the sample other than the analyte — water, salts and organic matter in a river sample; protein, fat and bone in a food. An **interference** is any component, or effect of the matrix, that changes the measured signal for a given amount of analyte: by giving a signal of its own (a *spectral* or *additive* interference) or by changing the response to the analyte (a *matrix* or *multiplicative* effect). **Qualitative analysis** establishes which species are present; **quantitative analysis** establishes how much; **speciation analysis** distinguishes the chemical forms of an element (arsenite from arsenate, methylmercury from inorganic mercury), which often differ enormously in toxicity.
:::

The distinction between analyte and matrix matters because analytical methods are rarely *specific* — responding only to the analyte — and seldom even very *selective*. A measurement of "lead" by atomic spectrometry responds to lead atoms whatever compound they came from; a pH electrode responds a little to sodium ions; an ultraviolet absorbance at $260\ \mathrm{nm}$ responds to every aromatic compound in the solution. Much of analytical chemistry is the art of making a non-specific measurement behave as if it were specific: by separation, by masking, by calibrating in a matrix that resembles the sample, or by measuring the signal in a way the interferent cannot mimic.

Methods are also classified by how the signal relates to the amount. In an **absolute** (or *stoichiometric*) method the result follows from a mass or volume and a balanced equation alone: gravimetry weighs a precipitate of known formula, and titrimetry measures the volume of a standard reagent that reacts in known proportion ([[analytical-chemistry/classical-analysis]]). In a **relative** (or *instrumental*) method the signal — an absorbance, a current, a peak area — has to be calibrated against standards of known concentration, because its proportionality constant depends on the instrument, the day and the matrix ([[analytical-chemistry/statistics-calibration]]). Most modern measurements are relative, which is why calibration and reference materials take up so much of an analyst's attention.

### The analytical process as a sequence of decisions

::: algorithm The analytical process {#alg-analytical-process}
1. **Define the problem.** Agree with the person who needs the result what is to be measured (which analyte and which form of it), in what material, at what level, with what uncertainty, how quickly and for what decision. A result is *fit for purpose* when its uncertainty is small enough for that decision and no smaller than is worth paying for.
2. **Choose a method.** Match the method's figures of merit — selectivity, sensitivity, limit of detection, working range, precision, trueness, sample size, speed, cost — to the problem, preferring a validated or standard method where one exists.
3. **Plan and take the sample.** Decide where, when and how much material to collect so that it represents the whole (the *lot*), and how to preserve it (cooling, acidification, dark storage) until analysis.
4. **Prepare the sample.** Dry, grind and homogenise; dissolve or extract the analyte; remove or mask interferences; concentrate or dilute into the working range — all without losing analyte or adding contamination.
5. **Measure.** Calibrate the instrument with standards, run blanks, replicates and quality-control samples alongside the unknowns, and record every reading.
6. **Evaluate.** Convert signals into concentrations, correct for blanks and dilution factors, and estimate the uncertainty; check the quality-control results before believing the unknowns.
7. **Report and act.** State the result in the units the decision needs, with its uncertainty, the method, and any limitation; then the person who asked decides — and the decision may send you back to step 1.
:::

The order is logical, not always chronological: a good analyst thinks about step 6 before step 3, because the number of samples and replicates needed depends on the uncertainty to be reached. The rest of this chapter takes the steps that come before the instrument — sampling and preparation — and the step after it, reporting, because these are where the largest errors usually hide.

### Levels and units

::: definition Concentration units in trace analysis {#def-ppm}
For a solid, the **mass fraction** $w_\mathrm{B} = m_\mathrm{B}/m$ is quoted as a percentage ($\mathrm{g}$ per $100\ \mathrm{g}$), as $\mathrm{mg\,kg^{-1}}$ (one part per million by mass, "ppm"), or as $\mu\mathrm{g\,kg^{-1}}$ (one part per billion, "ppb", $1$ in $10^9$). For a dilute aqueous solution the **mass concentration** $\rho_\mathrm{B} = m_\mathrm{B}/V$ in $\mathrm{mg\,dm^{-3}}$ is numerically almost equal to ppm by mass, because $1\ \mathrm{dm^3}$ of dilute solution has a mass close to $1\ \mathrm{kg}$; likewise $\mu\mathrm{g\,dm^{-3}} \approx$ ppb. The amount concentration $c_\mathrm{B} = n_\mathrm{B}/V$ follows by dividing $\rho_\mathrm{B}$ by the molar mass. By convention, analytes are called **major** constituents at $1$–$100\ \%$, **minor** at $0.01$–$1\ \%$, **trace** below $0.01\ \%$ ($100\ \mathrm{ppm}$), and **ultratrace** below about $1\ \mathrm{ppb}$.
:::

The abbreviations ppm and ppb are discouraged by IUPAC and the SI brochure, because they hide whether the ratio is by mass, volume or amount (in gas analysis "ppm" usually means a *mole* fraction of $10^{-6}$, written $\mu\mathrm{mol\,mol^{-1}}$). Write units explicitly whenever there is any doubt; this course does. The level matters for method choice: titration and gravimetry are excellent for major constituents and useless at trace levels, while atomic and mass spectrometry reach ultratrace levels but become imprecise if pushed to measure a major constituent without heavy dilution.

::: example From instrument reading to mass fraction {#ex-soil-lead}
A dried soil test portion of $0.2503\ \mathrm{g}$ is digested in acid and the digest made up to $50.00\ \mathrm{cm^3}$. A $5.00\ \mathrm{cm^3}$ aliquot of this is diluted to $50.00\ \mathrm{cm^3}$ and measured by atomic spectrometry, reading $0.0832\ \mathrm{mg\,dm^{-3}}$ of lead. A reagent blank carried through the same steps reads $0.0012\ \mathrm{mg\,dm^{-3}}$. Find the mass fraction of lead in the dried soil in $\mathrm{mg\,kg^{-1}}$.
::: solution
Correct the reading for the blank first, because the blank went through exactly the same dilution: $0.0832 - 0.0012 = 0.0820\ \mathrm{mg\,dm^{-3}}$ in the measured solution. Undo the tenfold dilution ($5.00 \to 50.00\ \mathrm{cm^3}$): the digest contains $0.820\ \mathrm{mg\,dm^{-3}}$. The digest volume is $0.05000\ \mathrm{dm^3}$, so the mass of lead is
$$
m_\mathrm{Pb} = 0.820\ \mathrm{mg\,dm^{-3}} \times 0.05000\ \mathrm{dm^3} = 0.0410\ \mathrm{mg}.
$$
Divide by the test-portion mass, converting grams to kilograms:
$$
w_\mathrm{Pb} = \frac{0.0410\ \mathrm{mg}}{0.2503\times10^{-3}\ \mathrm{kg}} = 164\ \mathrm{mg\,kg^{-1}}.
$$
Three significant figures, limited by the blank-corrected reading ($0.0820$, three figures). Writing the whole calculation as one product — reading $\times$ dilution factor $\times$ volume $/$ mass — is the habit that prevents the commonest error in routine analysis, a forgotten or doubled dilution factor. Note also that the result refers to the *dried* soil; a result "as received" would be lower by the moisture fraction, and the report must say which.
:::
:::

## Sampling: the step that sets the floor

An instrument measures only what is put into it. If the $0.25\ \mathrm{g}$ in the digestion vessel does not represent the tonne of soil in the field, no amount of care afterwards will make the result right. Sampling error is often the largest single contribution to the uncertainty of a result, and it is the one that replicate measurements in the laboratory cannot reveal.

::: definition The sampling hierarchy {#def-sample-terms}
The **lot** (or *population*) is the whole body of material about which a decision is to be made — a lorry-load of ore, a lake, a production batch of tablets. A **gross sample** is the collection of **increments** taken from the lot; it is reduced in size, with grinding and mixing, to a **laboratory sample**, from which the analyst withdraws **test portions** for individual analyses. A sample is **representative** when its composition is an unbiased estimate of the lot's. In **random sampling** every part of the lot has an equal chance of selection; in **systematic sampling** increments are taken at regular intervals in space or time; in **stratified sampling** the lot is divided into recognisably different strata (layers of a stockpile, shifts of a production line) and each is sampled in proportion; a **composite sample** combines increments into one sample when only the average matters.
:::

Two kinds of non-uniformity make sampling hard. **Distributional heterogeneity** is segregation on a large scale: dense particles settle to the bottom of a container, a river is more polluted downstream of an outfall than upstream, the top of a tank differs from the bottom. Mixing reduces it, and stratified or random sampling averages over it. **Constitutional heterogeneity** is the fact that individual particles differ in composition — a grain of ore is either rich in mineral or barren — and it cannot be mixed away: even a perfectly random sample of a well-mixed powder fluctuates in composition because it contains a finite number of particles. Only taking more particles (a larger sample, or the same mass ground finer) reduces it.

### Sampling and measurement variances add

A result carries scatter from two independent sources: differences between samples taken from the lot (sampling) and differences between repeated measurements on one sample (measurement, including preparation). The arithmetic for combining them is the one you already know from propagation of uncertainty.

::: proposition Variances of sampling and measurement add {#prop-variance-sampling}
If the sampling error and the measurement error are independent, the overall variance of a single result is
$$
s_\mathrm{o}^2 = s_\mathrm{s}^2 + s_\mathrm{m}^2,
$$ {#eq-variance-add}
where $s_\mathrm{s}$ is the sampling standard deviation and $s_\mathrm{m}$ the measurement standard deviation. If $n_\mathrm{s}$ independent samples are each analysed $n_\mathrm{m}$ times and all results are averaged, the variance of the grand mean is
$$
s^2(\bar{x}) = \frac{s_\mathrm{s}^2}{n_\mathrm{s}} + \frac{s_\mathrm{m}^2}{n_\mathrm{s}\,n_\mathrm{m}} .
$$ {#eq-nested-variance}
:::

::: proof
Write one result as $x = \mu + e_\mathrm{s} + e_\mathrm{m}$, where $\mu$ is the lot's true value, $e_\mathrm{s}$ the deviation of this sample's composition from $\mu$ (mean zero, variance $\sigma_\mathrm{s}^2$) and $e_\mathrm{m}$ the measurement error (mean zero, variance $\sigma_\mathrm{m}^2$). For independent variables the variance of a sum is the sum of the variances, which gives [[#eq-variance-add]]. For the grand mean, sample $j$ contributes $\bar{x}_j = \mu + e_{\mathrm{s},j} + \frac{1}{n_\mathrm{m}}\sum_k e_{\mathrm{m},jk}$, whose variance is $\sigma_\mathrm{s}^2 + \sigma_\mathrm{m}^2/n_\mathrm{m}$ — the replicate measurements average out measurement error but leave the sample's own deviation untouched. Averaging $n_\mathrm{s}$ independent sample means divides that variance by $n_\mathrm{s}$:
$$
\mathrm{Var}(\bar{x}) = \frac{1}{n_\mathrm{s}}\left(\sigma_\mathrm{s}^2 + \frac{\sigma_\mathrm{m}^2}{n_\mathrm{m}}\right),
$$
which is [[#eq-nested-variance]] with the estimates $s$ in place of the $\sigma$. The two components can be separated from real data by a one-way analysis of variance on replicate analyses of several samples.
:::

The practical lesson is blunt. Repeating the measurement on one sample shrinks only the second term; the first stays at $s_\mathrm{s}^2$ however many replicates you run. When sampling dominates — and it usually does for solids and environmental material — the effort belongs in taking more samples, not in measuring one sample more carefully. A rough rule from [[#eq-variance-add]]: once $s_\mathrm{m} < s_\mathrm{s}/3$, improving the measurement changes the overall standard deviation by less than $5\ \%$, because $\sqrt{1 + 1/9} = 1.054$.

::: example Where to spend nine analyses {#ex-allocation}
For a batch of animal feed the relative sampling standard deviation of the protein content is $3.0\ \%$ and the relative measurement standard deviation $1.0\ \%$. The laboratory can afford nine analyses. Compare the relative standard deviation of the mean for (a) one sample analysed nine times, (b) nine samples analysed once each, (c) three samples analysed three times each.
::: solution
Apply [[#eq-nested-variance]] with $s_\mathrm{s} = 3.0$ and $s_\mathrm{m} = 1.0$ (in per cent):
$$
\begin{aligned}
\text{(a)}\ & n_\mathrm{s} = 1,\ n_\mathrm{m} = 9: & s &= \sqrt{9.0/1 + 1.0/9} = \sqrt{9.11} = 3.0\ \%,\\
\text{(b)}\ & n_\mathrm{s} = 9,\ n_\mathrm{m} = 1: & s &= \sqrt{9.0/9 + 1.0/9} = \sqrt{1.11} = 1.05\ \%,\\
\text{(c)}\ & n_\mathrm{s} = 3,\ n_\mathrm{m} = 3: & s &= \sqrt{9.0/3 + 1.0/9} = \sqrt{3.11} = 1.76\ \%.
\end{aligned}
$$
Plan (a) is almost useless: nine careful measurements of one sample tell you that sample's protein content to $0.33\ \%$ but the batch's only to $3\ \%$ — and the tight agreement among the nine replicates would *look* reassuring. Plan (b) is three times better for the same work. Real plans also weigh costs (collecting a sample may cost more than analysing one), which leads to the optimum allocation of [[#exr-cost-allocation]].
:::
:::

### How many particles a sample must contain

Constitutional heterogeneity can be quantified with a model simple enough to solve exactly. Picture a powder of two kinds of particle of the same size: a fraction $p$ (by number) are analyte-bearing, the rest are barren. A sample contains $n$ particles drawn at random. The number of analyte-bearing particles in it is then a random variable, and its spread is the sampling error.

::: proposition Sampling a particulate mixture {#prop-binomial-sampling}
If a sample of $n$ particles is drawn at random from a well-mixed lot in which a fraction $p$ of the particles contain the analyte, the number $k$ of analyte-bearing particles is binomially distributed with mean $np$ and standard deviation $\sqrt{np(1-p)}$. The relative standard deviation of the sample's analyte content is therefore
$$
\sigma_\mathrm{r} = \sqrt{\frac{1-p}{np}}, \qquad\text{so}\qquad n = \frac{1-p}{p\,\sigma_\mathrm{r}^2}
$$ {#eq-particles}
particles are needed to reach a chosen relative standard deviation $\sigma_\mathrm{r}$. The result assumes particles of equal size and analyte content and a lot much larger than the sample.
:::

::: proof
Each of the $n$ particles independently is analyte-bearing with probability $p$, so $k$ is a sum of $n$ independent Bernoulli variables, each with mean $p$ and variance $p(1-p)$. Means and (by independence) variances add: $\E[k] = np$ and $\Var(k) = np(1-p)$. The analyte content of the sample is proportional to $k$, so its relative standard deviation is
$$
\sigma_\mathrm{r} = \frac{\sqrt{np(1-p)}}{np} = \sqrt{\frac{1-p}{np}}.
$$
Solving for $n$ gives [[#eq-particles]]. (If the lot were not much larger than the sample, drawing without replacement would make $k$ hypergeometric and the variance smaller by the finite-population factor; for a field-scale lot this factor is indistinguishable from one.)
:::

::: widget plot
f: 100*sqrt((1-p)/(100000*x*p))
x: 0.5, 20
y: 0, 6
sliders: p=0.01:0.001:0.2:0.001
hlines: 1
labels: \text{relative sampling SD (\%)}
caption: The relative standard deviation (in per cent) of the analyte content of a sample from [[#eq-particles]], against the number of particles in the sample, $x$, in units of $10^5$ particles. The slider sets the fraction $p$ of analyte-bearing particles. At $p = 0.01$ the curve crosses the $1\ \%$ line (horizontal) at $x = 9.9$, i.e. about a million particles ([[#ex-grinding]]), and even two million leave $0.7\ \%$. The curve falls only as $1/\sqrt{n}$, so halving the error costs four times as many particles. Slide $p$ upward and the whole curve drops: a constituent carried by many particles is easy to sample; a rare one (gold grains, a few contaminated kernels in a shipment) is very hard.
:::

::: example Grinding before sampling {#ex-grinding}
A mineral powder contains $1.0\ \%$ (by number) of particles of an ore mineral. All particles are spheres of diameter $0.50\ \mathrm{mm}$ and density $2.7\ \mathrm{g\,cm^{-3}}$. (a) How many particles must a test portion contain for a relative sampling standard deviation of $1.0\ \%$? (b) What mass is that? (c) What mass is needed if the powder is first ground to $0.10\ \mathrm{mm}$?
::: solution
(a) From [[#eq-particles]] with $p = 0.010$ and $\sigma_\mathrm{r} = 0.010$:
$$
n = \frac{1 - 0.010}{0.010 \times (0.010)^2} = 9.9\times10^{5}\ \text{particles}.
$$

(b) One particle has volume $\tfrac{4}{3}\pi(0.025\ \mathrm{cm})^3 = 6.54\times10^{-5}\ \mathrm{cm^3}$ and mass $6.54\times10^{-5} \times 2.7 = 1.77\times10^{-4}\ \mathrm{g}$. The test portion must weigh $9.9\times10^5 \times 1.77\times10^{-4}\ \mathrm{g} = 1.7\times10^{2}\ \mathrm{g}$ — about $175\ \mathrm{g}$, far more than any digestion vessel holds.

(c) The particle count needed is unchanged, but each particle's mass scales with the cube of its diameter: a fivefold reduction in diameter divides the mass by $5^3 = 125$, so $175/125 = 1.4\ \mathrm{g}$. This is why laboratory samples are ground to a fine powder *before* the test portion is taken: grinding does not change the composition, but it multiplies the number of particles per gram.
:::
:::

Real powders have a spread of particle sizes and compositions, and Pierre Gy's sampling theory generalises [[#prop-binomial-sampling]] to them, with shape, size-distribution and liberation factors. A simpler empirical version, due to Ingamells, uses the observation that for a well-mixed material the product of test-portion mass $m$ and the square of the percentage relative sampling standard deviation $R$ is roughly constant:
$$
m R^2 = K_\mathrm{s}.
$$ {#eq-ingamells}
The **Ingamells sampling constant** $K_\mathrm{s}$ is the mass of test portion that gives a $1\ \%$ sampling standard deviation. It follows from [[#eq-particles]], because $n$ is proportional to $m$ and $R^2 \propto 1/n$. Measure $R$ once at one mass, from replicate test portions, and [[#eq-ingamells]] predicts the mass needed for any other target.

::: example Using the sampling constant {#ex-ingamells}
Replicate $1.00\ \mathrm{g}$ test portions of a ground rock give a relative sampling standard deviation of $4.0\ \%$ for gold (after the measurement contribution has been subtracted using [[#eq-variance-add]]). What test-portion mass gives $1.0\ \%$, and what mass gives $2.0\ \%$?
::: solution
$K_\mathrm{s} = mR^2 = 1.00\ \mathrm{g} \times (4.0)^2 = 16\ \mathrm{g}$. For $R = 1.0\ \%$, $m = 16/1.0^2 = 16\ \mathrm{g}$; for $R = 2.0\ \%$, $m = 16/2.0^2 = 4.0\ \mathrm{g}$. Gold is the classic difficult case: it occurs as sparse discrete grains, so $p$ in [[#eq-particles]] is tiny, and fire-assay laboratories routinely take tens of grams where a silicate analysis would take a tenth of a gram.
:::
:::

::: warning Precise replicates are not proof of a representative sample {#warn-replicates}
Running five replicate measurements on one test portion and finding that they agree within $0.5\ \%$ says that your *measurement* is precise. It says nothing about whether the test portion represents the lot: every replicate inherits the same sampling error, which is invisible within the set ([[#ex-allocation]], plan (a)). To see sampling error you must analyse several independently taken samples (or test portions), and compare their spread with the replicate spread. The same trap appears in time: three readings of one bottle of river water do not describe the river over a day. A second, related mistake is to treat a mean of subsamples taken *after* mixing a single scoop as several samples — they are replicates of one sample, not independent samples of the lot.
:::

### Preserving the sample

A sample begins to change the moment it is taken. Dissolved metals adsorb onto container walls (acidifying a water sample with nitric acid to $\mathrm{pH} < 2$ keeps them in solution); dissolved gases escape or enter (oxygen and carbon dioxide change the pH and redox state of groundwater within minutes, so these are measured in the field); micro-organisms consume nitrate, phosphate and organic analytes (cooling to about $4\ ^\circ\mathrm{C}$ and analysing quickly slows them); light decomposes some pesticides and vitamins (amber glass). The container itself can add analyte — glass leaches boron and sodium, and plastics can release phthalates and absorb non-polar organics. Each analyte has its own preservation rule, written into standard methods, and the **holding time** after which a preserved sample is no longer trusted.

## Preparing the sample

Most instruments want a homogeneous solution (or, for chromatography, a clean extract) with the analyte in a known volume and in the working range. Getting there usually takes longer than the measurement, and it is where analyte is lost or gained.

**Drying and homogenising.** Solids are dried to constant mass (or the water content is measured separately) so that results can be stated on a dry basis, then ground and mixed; the grinding equipment must not contaminate (tungsten carbide mills add tungsten and cobalt, steel mills add iron and chromium).

**Dissolution and decomposition.** Metals, alloys and many minerals dissolve in mineral acids. Organic matrices (food, tissue, plastic) are destroyed by *wet digestion* in hot nitric acid, often with hydrogen peroxide, in closed vessels heated by microwaves, which raises the boiling point under pressure and prevents losses of volatile elements such as mercury and arsenic. Silicates resist acids other than hydrofluoric acid, or are *fused* with a flux such as lithium metaborate at about $1000\ ^\circ\mathrm{C}$ and the cooled melt dissolved in dilute acid. *Dry ashing* — heating in a furnace to burn off organic matter — is simple but loses volatile elements.

Hazards here are serious and specific. Hydrofluoric acid penetrates skin and binds calcium in the tissue beneath, causing deep burns and systemic poisoning that may not hurt for hours; it is handled only with specific training, protective equipment and calcium gluconate gel at hand. Hot concentrated perchloric acid is a powerful oxidant that can react explosively with organic matter and forms shock-sensitive perchlorate deposits in ordinary ductwork, so it is used only after pre-oxidation with nitric acid and in a dedicated wash-down fume cupboard. Closed-vessel digestion depends on pressure-rated vessels and validated programmes. All of this is laboratory work under supervision and a written risk assessment, never improvised.

**Separation and preconcentration.** When the analyte is too dilute or the matrix interferes, the analyte is moved into a smaller, cleaner phase — by liquid–liquid extraction, solid-phase extraction onto a small cartridge of sorbent, precipitation, distillation or ion exchange. A $500\ \mathrm{cm^3}$ water sample whose analyte is collected on a cartridge and eluted in $5\ \mathrm{cm^3}$ has been concentrated a hundredfold, which lowers the effective detection limit by the same factor (if the blank does not rise with it).

### Liquid–liquid extraction, quantitatively

Extraction moves a solute between two immiscible liquids, usually water and an organic solvent. At equilibrium the solute divides between them in a ratio that depends on its affinity for each phase.

::: definition Distribution ratio {#def-distribution-ratio}
For a solute S shared between an aqueous phase and an immiscible organic phase, the **partition coefficient** is $K_\mathrm{D} = [\mathrm{S}]_\mathrm{org}/[\mathrm{S}]_\mathrm{aq}$ for a single chemical form at equilibrium. The **distribution ratio** $D$ is the ratio of the *total* analytical concentrations in all forms,
$$
D = \frac{c_\mathrm{org}}{c_\mathrm{aq}},
$$
and is the quantity that governs recovery. For a weak acid HA of which only the neutral form enters the organic phase, $D = K_\mathrm{D}\,[\mathrm{H^+}]/([\mathrm{H^+}] + K_\mathrm{a})$, so $D$ can be switched on and off with pH: it is close to $K_\mathrm{D}$ well below the $\mathrm{p}K_\mathrm{a}$ and falls tenfold per pH unit above it.
:::

::: proposition Repeated extraction {#prop-extraction}
If a volume $V_\mathrm{aq}$ of aqueous solution is extracted $n$ times with fresh portions of organic solvent of volume $V_\mathrm{org}$ each, and $D$ is constant, the fraction of solute remaining in the aqueous phase is
$$
q_n = \left(\frac{V_\mathrm{aq}}{V_\mathrm{aq} + D\,V_\mathrm{org}}\right)^{n}.
$$ {#eq-extraction}
For a fixed total volume of solvent, $q_n$ decreases as $n$ increases: several small extractions remove more solute than one large one.
:::

::: proof
Let the aqueous phase hold amount $N$ of solute before an extraction. At equilibrium the amounts in the two phases are $c_\mathrm{aq}V_\mathrm{aq}$ and $c_\mathrm{org}V_\mathrm{org} = D c_\mathrm{aq} V_\mathrm{org}$, and they add up to $N$. Hence $c_\mathrm{aq}(V_\mathrm{aq} + DV_\mathrm{org}) = N$, and the fraction left in water is
$$
q = \frac{c_\mathrm{aq}V_\mathrm{aq}}{N} = \frac{V_\mathrm{aq}}{V_\mathrm{aq} + DV_\mathrm{org}}.
$$
The organic layer is removed and fresh solvent added; the same fraction $q$ of what remains stays behind again, so after $n$ extractions the fraction is $q^n$, which is [[#eq-extraction]]. For the comparison, fix the total solvent volume $V$ and split it into $n$ portions $V/n$. With $a = DV/V_\mathrm{aq}$,
$$
q_n = \left(1 + \frac{a}{n}\right)^{-n},
$$
and $(1 + a/n)^n$ increases with $n$ towards $e^{a}$ (it is the compound-interest sequence of [Maths Atlas](/learn/maths/)), so $q_n$ decreases towards the limit $e^{-a}$. Splitting helps, but with diminishing returns: the limit $e^{-a}$ is never beaten.
:::

::: widget plot
f: (1/(1+D*30/100))^x; exp(-D*x*30/100)
x: 0, 6
y: 0, 1
sliders: D=3:0.5:20:0.5
labels: \text{fraction left after } n \text{ portions of } 30\ \mathrm{cm^3}; \text{limit } e^{-DV/V_\mathrm{aq}}
caption: The fraction of solute left in $100\ \mathrm{cm^3}$ of water after $x$ successive extractions with $30\ \mathrm{cm^3}$ portions of solvent, from [[#eq-extraction]], for the distribution ratio $D$ set by the slider (the curve is meaningful at whole numbers $x = n$). The second curve is $e^{-DV/V_\mathrm{aq}}$ with the same total volume $V = 30x\ \mathrm{cm^3}$: the limit reached if that total were split into infinitely many tiny portions. At $D = 3$ three portions leave $14.6\ \%$ behind; one $90\ \mathrm{cm^3}$ portion would leave $27\ \%$. Slide $D$ to $20$ and a single extraction already removes $86\ \%$ — for a solute that strongly prefers the solvent, the number of portions matters much less.
:::

::: example One large or three small extractions? {#ex-extraction}
An analyte with $D = 3.0$ is to be extracted from $100\ \mathrm{cm^3}$ of water with $90\ \mathrm{cm^3}$ of solvent in total. Compare one extraction with $90\ \mathrm{cm^3}$ and three with $30\ \mathrm{cm^3}$ each.
::: solution
One extraction: $q_1 = 100/(100 + 3.0\times 90) = 100/370 = 0.270$, so $27.0\ \%$ stays in the water and the recovery is $73.0\ \%$.

Three extractions: $q = 100/(100 + 3.0\times30) = 100/190 = 0.526$ each time, and $q_3 = 0.526^3 = 0.146$, so $14.6\ \%$ stays behind and the recovery is $85.4\ \%$.

Same solvent, same total volume, nearly half the loss. To reach $99\ \%$ recovery with $30\ \mathrm{cm^3}$ portions needs $n \ge \ln 0.01/\ln 0.526 = 7.2$, i.e. eight extractions — a strong hint that for a solute with $D = 3$ one should rather raise $D$ (adjust pH, add salt to the water, change solvent) than repeat the extraction endlessly.
:::
:::

## Quality: blanks, recoveries and reference materials

A result is only as trustworthy as the evidence that the procedure worked *on this occasion*. That evidence comes from samples of known composition run alongside the unknowns.

::: definition Blanks, spike recovery and reference materials {#def-blank-crm}
A **method (reagent) blank** contains everything except the sample and is carried through every step; its signal measures contamination from reagents, vessels and air, and is subtracted from sample signals. A **field blank** is analyte-free water taken to the sampling site and treated like a sample, to reveal contamination during collection and transport. A **spiked sample** is a portion of a real sample to which a known amount of analyte has been added; its **recovery**
$$
R = \frac{c_\mathrm{spiked} - c_\mathrm{unspiked}}{c_\mathrm{added}}\times 100\ \%
$$
tests whether the matrix suppresses or enhances the response, or whether analyte is lost in preparation. A **certified reference material** (CRM) is a material, as similar as possible to the samples, whose analyte content has been certified with a stated uncertainty by a recognised body (for example NIST in the United States, the European Commission's Joint Research Centre, or China's National Institute of Metrology); analysing it tests **trueness**. A result is **metrologically traceable** when it is linked to SI units through an unbroken, documented chain of calibrations, each with stated uncertainty.
:::

Recovery and reference materials answer different questions. A spike added to the sample as a dissolved salt may be recovered perfectly even when the native analyte, locked inside mineral grains, is only partly extracted by the digestion; a CRM of similar matrix catches that, a spike does not. Conversely a CRM may not resemble your particular sample. Good practice uses both, and plots the results on a control chart over time ([[analytical-chemistry/statistics-calibration]]) so that a slow drift is caught before it ruins a month of reports.

::: example Interpreting a recovery {#ex-recovery}
A river water sample gives $12.4\ \mu\mathrm{g\,dm^{-3}}$ of nickel. A second portion, spiked with $20.0\ \mu\mathrm{g\,dm^{-3}}$ (negligible volume change), gives $31.1\ \mu\mathrm{g\,dm^{-3}}$. A certified river-water reference material with $25.0 \pm 0.6\ \mu\mathrm{g\,dm^{-3}}$ nickel gives $23.6\ \mu\mathrm{g\,dm^{-3}}$ in the same run. What do these tell you?
::: solution
Recovery: $R = (31.1 - 12.4)/20.0 \times 100\ \% = 93.5\ \%$. The CRM reads $23.6/25.0 = 94.4\ \%$ of its certified value. Both point the same way: the method reads about $6\ \%$ low in this matrix — perhaps a matrix suppression of the signal, which [[analytical-chemistry/statistics-calibration]] treats with standard addition or an internal standard. Whether a $6\ \%$ bias matters depends on the purpose: many regulatory methods accept recoveries of roughly $80$–$120\ \%$ at trace levels, but a $6\ \%$ bias near a limit value could flip a decision. Do not "correct" the result by dividing by $0.935$ unless the method's procedure specifies recovery correction; report the recovery alongside the result. A significance test for whether the CRM difference is real (rather than scatter) is the subject of the next chapter.
:::
:::

## Choosing a method: fitness for purpose

With the problem defined, the choice of method is a matching exercise. The **figures of merit** are the method's measurable properties:

- **Trueness** (closeness of the mean of many results to the true value; its lack is *bias*) and **precision** (closeness of results to each other; repeatability within a run, reproducibility between laboratories). Together they make up **accuracy**, the closeness of a single result to the true value.
- **Selectivity**: the extent to which the method responds to the analyte and not to other components.
- **Sensitivity**: in the IUPAC sense, the slope of the calibration function — signal change per unit concentration. It is *not* the same as the limit of detection, although the two are related.
- **Limit of detection** and **limit of quantification**: the smallest concentration that can be distinguished from a blank, and the smallest that can be measured with acceptable precision ([[analytical-chemistry/statistics-calibration]]).
- **Working range**: the concentration interval over which the response is usable, from the limit of quantification to the onset of non-linearity or saturation.
- Practical properties: sample mass or volume needed, throughput, cost per sample, skill required, and the hazard and waste the method generates.

The best method is rarely the most sensitive one. Measuring the calcium in milk powder (about $1\ \%$ by mass) by an ultratrace technique would require dilutions of $10^5$ that each add uncertainty, while a complexometric titration does it to a few parts per thousand with a burette. Measuring the cadmium in the same powder (tens of $\mu\mathrm{g\,kg^{-1}}$) is impossible by titration and routine by mass spectrometry. Fitness for purpose also bounds the uncertainty from below in a useful way: a result for a factory's quality control may need $\pm 0.5\ \%$, while a screening survey of a thousand wells for arsenic is better served by a fast method with $\pm 20\ \%$ than by a slow method with $\pm 2\ \%$ applied to fifty wells.

::: quiz
A laboratory analyses one scoop of soil from a contaminated site eight times; the eight lead results have a relative standard deviation of $0.8\ \%$. The site manager concludes that the site's lead content is known to within about $1\ \%$. What is wrong?
- [ ] Nothing: eight replicates are plenty, and $0.8\ \%$ is a small relative standard deviation.
- [x] The replicates measure only the measurement precision; the sampling error of one scoop is invisible and probably much larger.
- [ ] The relative standard deviation should have been divided by $\sqrt{8}$, so the true uncertainty is $0.3\ \%$.
- [ ] Soil cannot be analysed for lead without a certified reference material, so the results are meaningless.
::: solution
All eight results share the same scoop, so they share its sampling error ([[#prop-variance-sampling]]). The site's spatial variability — often tens of per cent for contaminated land — never entered the data. Dividing by $\sqrt{8}$ would make the error of interpretation worse. A CRM would check trueness, which is valuable, but it would not address representativeness either. The cure is several independent samples from a planned sampling pattern.
:::
:::

## Reporting the result

A reported result is a message to someone who will act on it. It should state the measurand unambiguously ("total lead, after nitric acid digestion, in dried soil < 2 mm"), the value with its expanded uncertainty and the coverage factor ("$164 \pm 12\ \mathrm{mg\,kg^{-1}}$, $k = 2$"), the method, the dates of sampling and analysis, and any qualifier (a recovery outside the normal range, a sample received outside its holding time). Values below the limit of detection are reported as "less than" that limit (or with the limit stated), never as zero, and never simply left out of a data set, because doing so biases every mean computed from it. Significant figures follow the uncertainty: with $\pm 12$, the result $164$ is quoted to the unit, not as $163.80$.

Every step of [[#alg-analytical-process]] leaves a record — the sampling plan, chain-of-custody forms showing who held the sample when, the notebook, instrument files, calibration and quality-control data — so that the result can be reconstructed and defended. Accredited laboratories document all of this under ISO/IEC 17025, the international standard for the competence of testing and calibration laboratories, and take part in proficiency tests, in which many laboratories analyse portions of the same material and each is scored against the consensus. The ethics of the record, from the notebook to the final report, are the subject of [[laboratory-methods/reporting-integrity]].

## Where this leads

The statistics that turn readings into results with honest uncertainties — significance tests, calibration lines, standard addition, internal standards and limits of detection — are in [[analytical-chemistry/statistics-calibration]]. The extraction and solubility equilibria met here are developed systematically in [[analytical-chemistry/equilibria-in-analysis]], and they become the basis of the absolute methods of [[analytical-chemistry/classical-analysis]]. Sample preparation returns with every instrumental technique: acid digests for [[analytical-chemistry/atomic-spectrometry]], extracts and derivatives for [[analytical-chemistry/chromatography]], and isotope-labelled internal standards that correct for losses in preparation in [[analytical-chemistry/hyphenated-methods]]. Environmental monitoring — where sampling design often dominates the uncertainty — is taken up in [[environmental-chemistry]].

::: history
Systematic analysis as a discipline owes much to Carl Remigius Fresenius, whose *Anleitung zur qualitativen chemischen Analyse* (1841) and *Anleitung zur quantitativen chemischen Analyse* (1846) became standard teaching texts; in 1862 he founded the *Zeitschrift für analytische Chemie*, the first journal devoted to the field. The statistics of sampling came much later. Pierre Gy developed his theory of sampling particulate materials for the mining industry from the 1950s and set it out in *Sampling of Particulate Materials: Theory and Practice* (1979). C. O. Ingamells and P. Switzer proposed the sampling constant in *Talanta* in 1973. On the quality side, the international standard for the competence of testing laboratories, ISO/IEC 17025, was first published in 1999 (current edition 2017), and Eurachem's guide *The Fitness for Purpose of Analytical Methods* (1998; second edition 2014) gave the phrase "fit for purpose" its working definition in analytical chemistry.
:::

::: summary
- The analytical process runs from defining the problem through method choice, sampling, preparation, measurement and evaluation to a reported result; a result is fit for purpose when its uncertainty suits the decision it serves.
- Analyte, matrix and interference are the basic vocabulary; absolute methods (gravimetry, titrimetry) need only masses, volumes and stoichiometry, relative methods need calibration.
- Sampling and measurement variances add, $s_\mathrm{o}^2 = s_\mathrm{s}^2 + s_\mathrm{m}^2$; replicates on one sample reduce only the measurement term, so effort belongs in more samples when sampling dominates.
- For a particulate material, the binomial model gives $n = (1-p)/(p\sigma_\mathrm{r}^2)$ particles; grinding finer multiplies the particles per gram, and $mR^2 = K_\mathrm{s}$ scales the test-portion mass.
- Preparation (drying, digestion, extraction, preconcentration) must neither lose nor add analyte; $n$ small extractions leave $q_n = [V_\mathrm{aq}/(V_\mathrm{aq} + DV_\mathrm{org})]^n$ behind, better than one large one.
- Blanks, spike recoveries and certified reference materials, run with every batch, are the evidence that a result is true; traceability links it to the SI.
- Report the measurand, value, uncertainty, method and qualifiers; values below the detection limit are "less than", never zero.
:::

## Exercises

::: exercise Cadmium in rice {level=1 check="5"}
A $0.500\ \mathrm{g}$ test portion of rice flour is found to contain $2.5\ \mu\mathrm{g}$ of cadmium. Express the mass fraction in $\mathrm{mg\,kg^{-1}}$ and say whether it is a major, minor, trace or ultratrace constituent. (Enter the mass fraction in $\mathrm{mg\,kg^{-1}}$.)
::: solution
$w = 2.5\ \mu\mathrm{g}/0.500\ \mathrm{g} = 5.0\ \mu\mathrm{g\,g^{-1}} = 5.0\ \mathrm{mg\,kg^{-1}}$ (multiply numerator and denominator by $1000$). That is $5.0\times10^{-6}$, i.e. $5.0\times10^{-4}\ \%$, far below $0.01\ \%$ and above $1\ \mathrm{ppb}$: a trace constituent. (Such a value would be very high for rice: regulatory limits for cadmium in polished rice are of the order of $0.2$–$0.4\ \mathrm{mg\,kg^{-1}}$.)
:::
:::

::: exercise Undoing the dilutions {level=1 check="300"}
A $0.5000\ \mathrm{g}$ sample of a fertiliser is dissolved and made up to $100.0\ \mathrm{cm^3}$. A $5.00\ \mathrm{cm^3}$ aliquot is diluted to $50.00\ \mathrm{cm^3}$ and found to contain $0.150\ \mathrm{mg\,dm^{-3}}$ of zinc (blank negligible). Find the mass fraction of zinc in the fertiliser. (Enter it in $\mathrm{mg\,kg^{-1}}$ to three significant figures.)
::: solution
Undo the tenfold dilution: the stock solution holds $1.50\ \mathrm{mg\,dm^{-3}}$. In $0.1000\ \mathrm{dm^3}$ that is $0.150\ \mathrm{mg}$ of zinc, from $0.5000\ \mathrm{g} = 5.000\times10^{-4}\ \mathrm{kg}$ of sample:
$$
w = \frac{0.150\ \mathrm{mg}}{5.000\times10^{-4}\ \mathrm{kg}} = 300\ \mathrm{mg\,kg^{-1}} \;(0.0300\ \%).
$$
In one line: $0.150 \times (50.00/5.00) \times 0.1000/(5.000\times10^{-4}) = 300$.
:::
:::

::: exercise Vocabulary in context {level=1}
For the determination of nitrate in a lettuce, identify (a) the analyte, (b) the matrix, (c) one plausible interference for an ultraviolet absorbance method, and (d) whether the method is absolute or relative. Then name the sample, the laboratory sample and the test portion if 20 lettuces are bought from a market stall, five are chosen, chopped and blended together, and $2.0\ \mathrm{g}$ of the blend is extracted.
::: solution
(a) Nitrate ion, $\mathrm{NO_3^-}$. (b) Water, sugars, proteins, pigments, other ions — everything else in the lettuce. (c) Dissolved organic matter absorbing in the ultraviolet (an additive spectral interference); nitrite, which also absorbs near $210$–$220\ \mathrm{nm}$. (d) Relative: absorbance must be calibrated with nitrate standards. The lot is the stall's stock (20 lettuces); the five chosen lettuces are the gross sample; the blend is the laboratory sample (strictly, a composite); the $2.0\ \mathrm{g}$ is the test portion. If the five were chosen by convenience (the five on top), the sample may not be representative.
:::
:::

::: exercise How many extractions? {level=2 check="10"}
A solute with $D = 5.0$ is extracted from $50.0\ \mathrm{cm^3}$ of water with $10.0\ \mathrm{cm^3}$ portions of solvent. What is the smallest number of extractions that leaves less than $0.10\ \%$ in the water? (Enter the number of extractions.)
::: solution
Each extraction leaves $q = 50.0/(50.0 + 5.0 \times 10.0) = 0.500$. We need $0.500^n < 0.0010$, i.e. $n > \ln 0.0010/\ln 0.500 = 9.97$, so $n = 10$ (and $0.5^{10} = 9.8\times10^{-4}$, just under $0.10\ \%$). One $100\ \mathrm{cm^3}$ extraction with the same total solvent would leave $50/(50 + 500) = 9.1\ \%$.
:::
:::

::: exercise A rare particle {level=2 check="1.25"}
In a grain shipment, $0.20\ \%$ of the kernels (by number) are contaminated with a mycotoxin and the rest are clean. How many kernels must a sample contain for a relative sampling standard deviation of $2.0\ \%$ in the measured toxin content? Treat all contaminated kernels as equally contaminated. (Enter the number of kernels in millions, to three significant figures.)
::: solution
From [[#eq-particles]] with $p = 0.0020$ and $\sigma_\mathrm{r} = 0.020$:
$$
n = \frac{1 - 0.0020}{0.0020 \times 0.020^2} = \frac{0.998}{8.0\times10^{-7}} = 1.25\times10^{6}\ \text{kernels}.
$$
At about $0.04\ \mathrm{g}$ per kernel that is some $50\ \mathrm{kg}$ of grain — which is why mycotoxin sampling plans specify large aggregate samples that are ground and subsampled, and why real contamination (very uneven between kernels) makes the problem worse than this model suggests.
:::
:::

::: exercise Four samples, two analyses each {level=2 check="1.13"}
A material has relative sampling standard deviation $s_\mathrm{s} = 2.0\ \%$ and relative measurement standard deviation $s_\mathrm{m} = 1.5\ \%$. Find the relative standard deviation of the grand mean when four samples are each analysed twice. (Enter it in per cent to three significant figures.)
::: solution
From [[#eq-nested-variance]],
$$
s(\bar{x}) = \sqrt{\frac{2.0^2}{4} + \frac{1.5^2}{4\times 2}} = \sqrt{1.000 + 0.281} = \sqrt{1.281} = 1.13\ \%.
$$
Doubling the analyses (four samples, four analyses each) only reduces this to $\sqrt{1.000 + 0.141} = 1.07\ \%$; doubling the samples instead (eight, two each) gives $\sqrt{0.500 + 0.141} = 0.80\ \%$.
:::
:::

::: exercise Recovery from a spiked sample {level=1 check="93.5"}
A wastewater sample reads $12.4\ \mu\mathrm{g\,dm^{-3}}$ of copper; a portion spiked to add $20.0\ \mu\mathrm{g\,dm^{-3}}$ reads $31.1\ \mu\mathrm{g\,dm^{-3}}$. Find the spike recovery, and say what it does and does not prove. (Enter the recovery in per cent to three significant figures.)
::: solution
$R = (31.1 - 12.4)/20.0 \times 100\ \% = 93.5\ \%$. It shows that the measurement responds to *added, dissolved* copper in this matrix with about $6.5\ \%$ loss or suppression. It does not prove that the *native* copper (perhaps bound in particles or organic complexes) is fully released by the preparation; a matrix-matched certified reference material is the test for that.
:::
:::

::: exercise The optimum allocation {#exr-cost-allocation level=3 check="1.5"}
Collecting and preparing a sample costs $c_\mathrm{s}$ and each measurement costs $c_\mathrm{m}$, so a plan of $n_\mathrm{s}$ samples with $n_\mathrm{m}$ measurements each costs $C = n_\mathrm{s}c_\mathrm{s} + n_\mathrm{s}n_\mathrm{m}c_\mathrm{m}$. (a) Show that, for a fixed budget, the variance [[#eq-nested-variance]] is smallest when $n_\mathrm{m} = (s_\mathrm{m}/s_\mathrm{s})\sqrt{c_\mathrm{s}/c_\mathrm{m}}$. (b) Evaluate it for $s_\mathrm{s} = 2.0\ \%$, $s_\mathrm{m} = 1.5\ \%$, $c_\mathrm{s} = 40$ and $c_\mathrm{m} = 10$ (currency units), and say what you would do in practice. (Enter the optimum $n_\mathrm{m}$ to two significant figures.)
::: hint
Eliminate $n_\mathrm{s}$ using the budget, so that the variance becomes a function of $n_\mathrm{m}$ alone, and differentiate.
:::
::: solution
(a) From the budget, $n_\mathrm{s} = C/(c_\mathrm{s} + n_\mathrm{m}c_\mathrm{m})$. Substituting,
$$
V(n_\mathrm{m}) = \frac{1}{n_\mathrm{s}}\left(s_\mathrm{s}^2 + \frac{s_\mathrm{m}^2}{n_\mathrm{m}}\right) = \frac{1}{C}\left(c_\mathrm{s} + n_\mathrm{m}c_\mathrm{m}\right)\left(s_\mathrm{s}^2 + \frac{s_\mathrm{m}^2}{n_\mathrm{m}}\right) = \frac{1}{C}\left(c_\mathrm{s}s_\mathrm{s}^2 + c_\mathrm{m}s_\mathrm{m}^2 + n_\mathrm{m}c_\mathrm{m}s_\mathrm{s}^2 + \frac{c_\mathrm{s}s_\mathrm{m}^2}{n_\mathrm{m}}\right).
$$
Setting $\mathrm{d}V/\mathrm{d}n_\mathrm{m} = (c_\mathrm{m}s_\mathrm{s}^2 - c_\mathrm{s}s_\mathrm{m}^2/n_\mathrm{m}^2)/C = 0$ gives $n_\mathrm{m}^2 = c_\mathrm{s}s_\mathrm{m}^2/(c_\mathrm{m}s_\mathrm{s}^2)$, i.e. $n_\mathrm{m} = (s_\mathrm{m}/s_\mathrm{s})\sqrt{c_\mathrm{s}/c_\mathrm{m}}$; the second derivative $2c_\mathrm{s}s_\mathrm{m}^2/(Cn_\mathrm{m}^3) > 0$ confirms a minimum.

(b) $n_\mathrm{m} = (1.5/2.0)\sqrt{40/10} = 0.75 \times 2 = 1.5$. In practice $n_\mathrm{m}$ must be a whole number: compare $n_\mathrm{m} = 1$ and $2$ for the actual budget (they give nearly equal variance per unit cost here), and choose $2$ if duplicate measurements are also wanted as a check on gross errors. The formula says what intuition suggests: replicate measurements pay only when measurement is noisy compared with sampling, or when samples are expensive.
:::
:::

::: exercise Sizing a gold assay {level=3 check="5.12"}
Replicate $0.50\ \mathrm{g}$ test portions of a ground ore give a total relative standard deviation of $5.0\ \%$ for gold; the measurement alone contributes $1.4\ \%$. (a) Find the relative sampling standard deviation and the Ingamells constant. (b) What test-portion mass gives a sampling standard deviation of $1.5\ \%$? (c) Why might the laboratory prefer to grind the ore finer instead? (Enter the mass for (b) in grams to three significant figures.)
::: hint
Subtract the measurement variance from the total variance before using $mR^2 = K_\mathrm{s}$.
:::
::: solution
(a) By [[#eq-variance-add]], $s_\mathrm{s}^2 = 5.0^2 - 1.4^2 = 25.00 - 1.96 = 23.04$, so $s_\mathrm{s} = 4.80\ \%$. Then $K_\mathrm{s} = mR^2 = 0.50\ \mathrm{g} \times 23.04 = 11.5\ \mathrm{g}$.

(b) $m = K_\mathrm{s}/R^2 = 11.52/1.5^2 = 5.12\ \mathrm{g}$.

(c) A $5\ \mathrm{g}$ test portion may exceed what the dissolution and measurement steps handle well (more acid, more dissolved matrix, larger blanks). Grinding finer increases the number of gold grains per gram and so lowers $K_\mathrm{s}$ itself — by [[#ex-grinding]], the mass needed falls roughly with the cube of the particle size, provided the gold grains are actually liberated and broken up rather than smeared onto the mill or lost.
:::
:::

::: exercise Extraction controlled by pH {level=3 check="0.93"}
Benzoic acid ($\mathrm{p}K_\mathrm{a} = 4.20$; take $K_\mathrm{D} = 100$ between an organic solvent and water for the neutral molecule, an illustrative value) is extracted from $50.0\ \mathrm{cm^3}$ of aqueous solution with one $25.0\ \mathrm{cm^3}$ portion of solvent. Using $D = K_\mathrm{D}[\mathrm{H^+}]/([\mathrm{H^+}] + K_\mathrm{a})$ from [[#def-distribution-ratio]], find the fraction remaining in the water at pH $2.00$ and at pH $7.00$, and explain how this lets you separate benzoic acid from a neutral compound. (Enter the fraction remaining at pH $7.00$ to two significant figures.)
::: hint
Find $D$ at each pH first; then one extraction leaves $q = V_\mathrm{aq}/(V_\mathrm{aq} + DV_\mathrm{org})$.
:::
::: solution
$K_\mathrm{a} = 10^{-4.20} = 6.31\times10^{-5}$.

At pH $2.00$: $D = 100 \times 10^{-2}/(10^{-2} + 6.31\times10^{-5}) = 99.4$, so $q = 50.0/(50.0 + 99.4\times25.0) = 50.0/2535 = 0.020$: about $2\ \%$ remains and $98\ \%$ is extracted.

At pH $7.00$: $D = 100 \times 10^{-7}/(10^{-7} + 6.31\times10^{-5}) = 0.158$, so $q = 50.0/(50.0 + 0.158\times25.0) = 50.0/53.96 = 0.93$: $93\ \%$ stays in the water as benzoate.

The separation follows directly. Shake a solution of benzoic acid and a neutral compound (whose $D$ does not depend on pH) in solvent with water buffered at pH $7$ or above: the neutral compound goes into the solvent, the benzoate stays in the water. Then acidify the aqueous layer to pH $2$ and extract again: benzoic acid now moves into fresh solvent. This acid–base extraction is the standard clean-up step for acidic analytes before chromatography.
:::
:::
