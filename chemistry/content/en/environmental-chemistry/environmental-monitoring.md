In the 1960s the geochemist Clair Patterson set out to measure the lead in ocean water and in the ice of Greenland, and found that almost every published value was wrong — not by a few per cent, but by factors of ten to a hundred, because laboratories, reagents, sampling bottles and the analysts themselves were contaminated with lead from petrol and paint. When he built an ultra-clean laboratory and followed every atom of lead from the sample to the detector, the true concentrations turned out to be far lower than anyone had thought, and the difference between ancient and modern ice proved that industrial lead had polluted the whole hemisphere. The episode is the founding lesson of environmental analysis: at trace levels, the number you report is only as good as the chain of procedures behind it — the sampling design, the container, the preservation, the blank, the calibration, the quality control and the uncertainty statement.

Every number quoted in the earlier lessons of this course — the $424.6\ \mathrm{ppm}$ of $\mathrm{CO_2}$, the Dobson units over Antarctica, the $\mathrm{\mu g\,m^{-3}}$ of $\mathrm{PM_{2.5}}$, the nanograms of PFAS per litre — comes from such a chain. This lesson is about building it. It assumes the analytical methods themselves, treated in [[analytical-chemistry]]: calibration and detection limits ([[analytical-chemistry/statistics-calibration]]), atomic spectrometry ([[analytical-chemistry/atomic-spectrometry]]), chromatography ([[analytical-chemistry/chromatography]]) and hyphenated mass spectrometric methods ([[analytical-chemistry/hyphenated-methods]]). Here we add what is specific to the environment: matrices that vary in space and time, analytes at the edge of detectability, and results that feed into regulatory decisions.

## Why monitor, and what to decide first

Environmental monitoring serves several purposes, and each implies a different design:

- **Compliance**: does this water, air or effluent meet a legal limit? The statistics must address a decision with stated error rates.
- **Trend detection**: is ozone-depleting chlorine falling, is lake pH recovering, is $\mathrm{CO_2}$ rising faster? The measurements must be comparable over decades, so calibration scales and methods must be traceable and stable.
- **Exposure and risk assessment**: what concentrations do people and ecosystems actually encounter?
- **Source attribution and process understanding**: where does this pollutant come from, how is it transformed?

::: definition Data quality objectives {#def-dqo}
**Data quality objectives** (DQOs) are the qualitative and quantitative statements, fixed *before* sampling, of what decision the data will support and how good they must be to support it: the target analytes and matrices, the spatial and temporal boundaries of the population sampled, the action level (e.g. a regulatory limit), the tolerable probabilities of false positive and false negative decisions, and from these the required detection limit, precision, bias and number of samples. The concept, formalised by the US EPA, is general practice in environmental programmes. It turns "measure as much as possible" into "measure what is needed to decide".
:::

## Sampling

Most of the uncertainty in an environmental result usually arises before the sample reaches the laboratory. The concentration of lead in a field varies from metre to metre; nitrate in a river varies with discharge and season; $\mathrm{NO_2}$ next to a road varies over minutes and tens of metres. A sample is a few grams or millilitres representing tonnes or cubic kilometres, and the first question is whether it is **representative** of the population about which a statement will be made.

Sampling designs include **random** sampling (every location or time equally likely; unbiased but can leave gaps), **systematic** sampling on a grid or at fixed intervals (good coverage, but can alias periodic variation), **stratified** sampling (the population divided into strata — soil types, depths, seasons — each sampled separately), and **judgemental** sampling (at suspected hot spots; useful for finding contamination but not for estimating a mean). **Composite** samples pool several increments to estimate a mean economically, at the cost of information about variability. Continuous monitors give time series; passive samplers (diffusion tubes for $\mathrm{NO_2}$, polyethylene sheets for hydrophobic organics in water) integrate over days to weeks.

::: proposition Number of samples to estimate a mean {#prop-sample-size}
To estimate a population mean $\mu$ with a margin of error no larger than $E$ at confidence level $1 - \alpha$, when the sampling standard deviation (between samples, including analytical error) is $\sigma$, approximately
$$
n = \left(\frac{z_{1-\alpha/2}\,\sigma}{E}\right)^2,
$$
rounded up, where $z_{1-\alpha/2} = 1.96$ for $95\ \%$ confidence. Written in relative terms with coefficient of variation $\mathrm{CV} = \sigma/\mu$ and relative margin $e = E/\mu$, $n = (z\,\mathrm{CV}/e)^2$. Conditions: independent samples, approximately normal sample mean (central limit theorem), $\sigma$ known from a pilot study; for small $n$ replace $z$ by Student's $t$ and iterate. Spatially correlated data need geostatistical methods instead.
:::

::: proof Width of the confidence interval {#proof-sample-size}
The mean of $n$ independent samples has standard error $\sigma/\sqrt{n}$ and is approximately normal, so $\bar{x} \pm z_{1-\alpha/2}\sigma/\sqrt{n}$ covers $\mu$ with probability $1 - \alpha$ ([[analytical-chemistry/statistics-calibration]]; on Maths Atlas, [confidence intervals](/learn/maths/)). Requiring the half-width $z\sigma/\sqrt{n} \leq E$ and solving for $n$ gives the result. The quadratic dependence is the practical message: halving the margin of error needs four times as many samples, and a heterogeneous site (large CV) can need very many.
:::

::: example How many soil samples? {#ex-sample-size}
A pilot survey of a former industrial site finds that lead concentrations in topsoil have a coefficient of variation of $30\ \%$ between sampling points. How many samples are needed to estimate the site mean within $\pm10\ \%$ at $95\ \%$ confidence? What if the CV were $60\ \%$?
::: solution
$n = (1.96\times0.30/0.10)^2 = 5.88^2 = 34.6$, so **$35$ samples**. With $\mathrm{CV} = 60\ \%$ the number quadruples to $139$. Since $n$ is large, using $z$ rather than $t$ is adequate (with $t_{0.975,34} = 2.03$, $n$ becomes $37$). In practice, contaminated sites are rarely homogeneous: lead may be concentrated near a former smelter building. Stratifying the site into zones — and sampling each with its own design — gives a better estimate for the same effort, and answers the question that actually matters for risk management: *where* are the hot spots?
:::
:::

### Containers, preservation and holding times

Between collection and analysis, a sample can gain or lose analyte by sorption on container walls, volatilisation, precipitation, microbial degradation, photolysis or contamination. Standard methods therefore prescribe containers and preservation: water for **trace metals** is collected in acid-cleaned polyethylene or fluoropolymer bottles, filtered through $0.45\ \mathrm{\mu m}$ membranes if "dissolved" metals are wanted (an operational definition that includes colloids) and acidified with ultrapure nitric acid to pH below $2$, which keeps metals in solution and stops biological activity; **volatile organic compounds** go into glass vials with no headspace, septum-sealed and cooled; **trace organics** into solvent-rinsed amber glass, cooled to about $4\ \mathrm{°C}$ and extracted within days; **nutrients** are cooled or frozen; samples for **PFAS** must avoid fluoropolymer equipment, which can contaminate them. Each analysis has a maximum **holding time** after which results are not considered valid. Field records — location, time, temperature, conditions, chain of custody — are part of the result.

## Trace analysis: detection, blanks and enrichment

::: definition Limits of detection and quantification {#def-lod}
The **limit of detection** (LOD) is the smallest concentration that can be distinguished from zero with stated confidence. A common operational definition, consistent with IUPAC recommendations when false-positive and false-negative rates are both about $5\ \%$ and the blank standard deviation is well characterised, is
$$
\mathrm{LOD} = \frac{3\,s_\text{blank}}{b},
$$
where $s_\text{blank}$ is the standard deviation of replicate blank (or very low-level) measurements and $b$ the calibration slope (signal per unit concentration). The **limit of quantification** (LOQ), below which results are not reported as numbers, is commonly $10\,s_\text{blank}/b$, where the relative standard deviation is about $10\ \%$. Environmental methods often quote a **method detection limit** determined by carrying low-level spiked samples through the entire procedure, which includes the variability of extraction and clean-up, not just the instrument.
:::

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: 1.645
b: 6
caption: The distribution of blank results in units of the blank standard deviation. The shaded area beyond $1.645\,\sigma$ is the $5\ \%$ chance that a blank is reported as "detected" (a false positive). Move $\mu$ to $3.29$ (a true concentration at the detection limit in the strict Currie sense) and keep the shading from $1.645$: $95\ \%$ of such samples are detected. The familiar "$3s$" rule sits close to this; the derivation and the decision limits are developed in [[analytical-chemistry/statistics-calibration]].
:::

::: example A detection limit for cadmium in river water {#ex-lod}
Ten procedural blanks for cadmium by ICP-MS give signal ratios (analyte to internal standard) with a standard deviation of $0.0035$; the calibration slope is $0.0250$ per $\mathrm{\mu g\,dm^{-3}}$. Find the LOD and LOQ, and decide whether the method is fit for checking an environmental quality standard of $0.08\ \mathrm{\mu g\,dm^{-3}}$ (the EU annual-average EQS for dissolved cadmium in the softest waters under Directive 2008/105/EC, as amended).
::: solution
$\mathrm{LOD} = 3\times0.0035/0.0250 = 0.42\ \mathrm{\mu g\,dm^{-3}}$ and $\mathrm{LOQ} = 10\times0.0035/0.0250 = 1.4\ \mathrm{\mu g\,dm^{-3}}$. Both exceed the standard of $0.08\ \mathrm{\mu g\,dm^{-3}}$ several-fold: the method cannot tell whether the water complies. EU rules for water monitoring (Directive 2009/90/EC) require the LOQ to be at most $30\ \%$ of the standard, i.e. $0.024\ \mathrm{\mu g\,dm^{-3}}$ here — a factor of $60$ below this method. Improvements would come from a lower blank (cleaner reagents and labware, a clean laboratory), preconcentration, or a more sensitive instrument mode. The point generalises: detection limits must be set by the decision (the DQO), not by the instrument's specification sheet.
:::
:::

**Blanks** reveal contamination and bias. A **field blank** (clean water taken to the site, exposed to the sampling procedure and returned) detects contamination from sampling equipment and handling; a **trip blank** (never opened) detects contamination in transport and storage, important for VOCs; a **method blank** (reagents carried through the laboratory procedure) detects laboratory contamination. For ubiquitous analytes — lead, zinc, phthalates, siloxanes, PFAS — the blank, not the instrument, usually sets the detection limit, which is why Patterson's lesson about clean procedures remains central.

**Preconcentration** lowers detection limits by moving analyte from a large sample into a small extract: liquid–liquid extraction into a solvent (efficient for compounds with high $K_\mathrm{ow}$, by the partitioning of [[environmental-chemistry/pollutants-fate]]), **solid-phase extraction** (SPE) on a cartridge of sorbent followed by elution with a small solvent volume, purge-and-trap or headspace sampling for volatiles, and chelating resins for trace metals in sea water. The **enrichment factor** is the ratio of concentrations in extract and sample, $\mathrm{EF} = (V_\text{sample}/V_\text{extract})\times\text{recovery}$. Recovery is measured with spiked samples and, better, corrected internally by adding isotopically labelled analogues before extraction.

### Isotope dilution

::: proposition Isotope dilution mass spectrometry {#prop-idms}
Let an element (or compound) have two measurable isotopes (or isotopologues) A and B. The sample contains an unknown amount $n_x$ with isotope amount fractions $a_x$, $b_x$; a **spike** of known amount $n_y$, enriched in B, has fractions $a_y$, $b_y$. After the spike is mixed and equilibrated with the sample, the measured amount ratio in the blend is $R_\mathrm{b} = n(\mathrm{A})/n(\mathrm{B})$. Then
$$
n_x = n_y\,\frac{a_y - R_\mathrm{b}\,b_y}{R_\mathrm{b}\,b_x - a_x} .
$$
Because only a *ratio* is measured after equilibration, losses during subsequent sample preparation and drifts in instrument sensitivity cancel. Conditions: complete isotopic equilibration of spike and sample, ratios corrected for mass bias, no isobaric interferences.
:::

::: proof Mass balance of two isotopes {#proof-idms}
In the blend, $n(\mathrm{A}) = a_xn_x + a_yn_y$ and $n(\mathrm{B}) = b_xn_x + b_yn_y$. Their ratio is the measured $R_\mathrm{b}$:
$$
R_\mathrm{b}(b_xn_x + b_yn_y) = a_xn_x + a_yn_y
\quad\Longrightarrow\quad
n_x(R_\mathrm{b}b_x - a_x) = n_y(a_y - R_\mathrm{b}b_y),
$$
which gives the result. Once the spike has mixed with the analyte, any later loss removes A and B in the same proportion, leaving $R_\mathrm{b}$ unchanged — the reason isotope dilution is regarded as a primary ratio method and is used to certify reference materials.
:::

::: example Copper in sea water by isotope dilution {#ex-idms}
Natural copper is $69.15\ \%$ $^{63}\mathrm{Cu}$ and $30.85\ \%$ $^{65}\mathrm{Cu}$ (IUPAC). A sea-water sample is spiked with $1.00\ \mathrm{nmol}$ of copper enriched to $99.0\ \%$ $^{65}\mathrm{Cu}$ ($1.0\ \%$ $^{63}\mathrm{Cu}$), equilibrated, preconcentrated on a chelating resin and measured by ICP-MS, giving a mass-bias-corrected ratio $n(^{63}\mathrm{Cu})/n(^{65}\mathrm{Cu}) = 1.00$. How much copper was in the sample?
::: solution
With A $= {}^{63}\mathrm{Cu}$, B $= {}^{65}\mathrm{Cu}$: $a_x = 0.6915$, $b_x = 0.3085$, $a_y = 0.010$, $b_y = 0.990$, $R_\mathrm{b} = 1.00$. By [[#prop-idms]],
$$
n_x = 1.00\ \mathrm{nmol}\times\frac{0.010 - 1.00\times0.990}{1.00\times0.3085 - 0.6915} = 1.00\times\frac{-0.980}{-0.383} = 2.56\ \mathrm{nmol} .
$$
If the sample volume was $0.500\ \mathrm{dm^3}$, the concentration is $5.1\ \mathrm{nmol\,dm^{-3}}$ (about $0.33\ \mathrm{\mu g\,dm^{-3}}$), a typical coastal value. Had $40\ \%$ of the copper been lost on the resin, the result would not change. The best precision is obtained when $R_\mathrm{b}$ is near the geometric mean of the sample and spike ratios, which guides the choice of spike amount.
:::
:::

## Measuring the atmosphere

Air-quality monitoring networks use automatic analysers built on the chemistry of earlier lessons:

- **Ozone** by **UV photometry**: the absorption of the mercury line at $253.7\ \mathrm{nm}$ in a cell alternately filled with sample air and ozone-scrubbed air, interpreted with the Beer–Lambert law and the absorption cross section $\sigma = 1.1476\times10^{-17}\ \mathrm{cm^2}$ (the conventional value in ISO 13964); it is the reference method in the EU and US.
- **Nitrogen oxides** by **chemiluminescence**: $\mathrm{NO + O_3 \rightarrow NO_2^* + O_2}$, $\mathrm{NO_2^* \rightarrow NO_2 + }h\nu$ ($600$–$3000\ \mathrm{nm}$), the light being proportional to $[\mathrm{NO}]$; $\mathrm{NO_2}$ is measured as the increase in signal after passing the air over a heated molybdenum converter that reduces it to $\mathrm{NO}$.
- **Sulfur dioxide** by **UV fluorescence** at about $214\ \mathrm{nm}$ excitation; **carbon monoxide** and **carbon dioxide** by **non-dispersive infrared** absorption (at $4.6$ and $4.3\ \mathrm{\mu m}$), and greenhouse gases at background stations increasingly by **cavity ring-down spectroscopy**, whose effective path lengths of kilometres give the precision needed.
- **Particulate matter** by **gravimetry** (weighing filters at controlled temperature and humidity — the reference method, e.g. EN 12341 in Europe) and by automatic equivalent methods (beta-ray attenuation, oscillating microbalances, optical counters), which must be shown to agree with the reference.
- **Volatile organic compounds** by gas chromatography after adsorption on sorbent tubes or in canisters; **composition of particles** by ion chromatography, thermal–optical analysis of organic and elemental carbon, and aerosol mass spectrometry.

Long-term global records rest on networks with common calibration scales: the WMO Global Atmosphere Watch programme maintains reference scales for $\mathrm{CO_2}$, $\mathrm{CH_4}$, $\mathrm{N_2O}$ and other gases (with NOAA's Global Monitoring Laboratory acting as central calibration laboratory for several), and sets network **compatibility goals** — of order $0.1\ \mathrm{ppm}$ for $\mathrm{CO_2}$ and $2\ \mathrm{ppb}$ for $\mathrm{CH_4}$ in the northern hemisphere — small enough to detect regional fluxes against the global background. The AGAGE network measures halocarbons with GC–MS; ozone columns come from Dobson and Brewer spectrophotometers on the ground and from satellite spectrometers, which also map tropospheric $\mathrm{NO_2}$, $\mathrm{SO_2}$, formaldehyde and methane from space.

::: example The precision needed by an ozone photometer {#ex-photometer}
A UV photometer has a cell of length $38\ \mathrm{cm}$. What fractional change in transmitted intensity corresponds to $40\ \mathrm{ppb}$ of ozone at $298\ \mathrm{K}$ and $1\ \mathrm{atm}$ ($n_\text{air} = 2.46\times10^{19}\ \mathrm{cm^{-3}}$)?
::: solution
$[\mathrm{O_3}] = 40\times10^{-9}\times2.46\times10^{19} = 9.85\times10^{11}\ \mathrm{cm^{-3}}$. The optical depth is
$$
\tau = \sigma[\mathrm{O_3}]L = 1.1476\times10^{-17}\times9.85\times10^{11}\times38 = 4.3\times10^{-4},
$$
so $I/I_0 = e^{-\tau} = 0.99957$: forty parts per billion of ozone dims the lamp by only $0.043\ \%$. To resolve $1\ \mathrm{ppb}$, the instrument must measure intensity ratios to about $1\times10^{-5}$. This is achieved by alternating sample and zero air every few seconds (so that lamp drift cancels in the ratio), stabilising the lamp and cell temperature, and averaging. Because the method relies only on $\sigma$, $L$, $T$ and $p$, it is nearly an absolute method, and national standard photometers are compared internationally with the reference photometer at the Bureau International des Poids et Mesures.
:::
:::

::: warning A "NO₂" monitor may not be measuring only NO₂ {#warn-interferences}
Every method has an operational definition, and the instrument reports what it responds to, not what its label says. The molybdenum converter of a chemiluminescence $\mathrm{NO_x}$ analyser reduces not only $\mathrm{NO_2}$ but also part of PAN, nitric acid, organic nitrates and nitrous acid to $\mathrm{NO}$; in aged air far from sources, "$\mathrm{NO_2}$" can be overestimated substantially (photolytic converters, which are specific to $\mathrm{NO_2}$, avoid this). Gravimetric $\mathrm{PM_{2.5}}$ loses semi-volatile ammonium nitrate ([[environmental-chemistry/particulates-acid-deposition]]); "dissolved" metals include colloids that passed the $0.45\ \mathrm{\mu m}$ filter; a total organic carbon analyser measures whatever oxidises. When data from different methods or periods are combined — and especially when a trend is claimed — check that the definitions and known interferences are the same.
:::

## Quality assurance and quality control

**Quality assurance** (QA) is the system — documented procedures, training, accreditation (to ISO/IEC 17025 for testing laboratories), audits — that makes results reliable; **quality control** (QC) is the set of measurements made alongside the samples to show that a particular batch of results is in control. Typical QC elements are:

- **Certified reference materials** (CRMs) — natural matrices (river water, estuarine sediment, urban dust) with certified concentrations and uncertainties, traceable to SI units, analysed to check bias;
- **matrix spikes** — samples with a known added amount, to measure recovery in the actual matrix;
- **duplicates** — repeated samples and analyses, to measure precision;
- **control charts** — results for a stable control sample plotted against time, with **warning limits** at $\pm2s$ and **action limits** at $\pm3s$ about the long-term mean (a Shewhart chart); a point outside the action limits, or a run of points on one side of the mean, signals that the method has gone out of control;
- **proficiency testing** — inter-laboratory comparisons in which each laboratory's result $x$ is scored against an assigned value $X$ by $z = (x - X)/\sigma_\mathrm{p}$, where $\sigma_\mathrm{p}$ is a target standard deviation; $\lvert z\rvert \leq 2$ is satisfactory, $2 < \lvert z\rvert < 3$ questionable and $\lvert z\rvert \geq 3$ unsatisfactory (ISO 13528).

::: widget regression
points: 0,0.002; 0.5,0.0145; 1,0.027; 2,0.052; 5,0.126; 10,0.249
degree: 1
residuals: true
x: -0.5, 11
y: -0.01, 0.27
caption: A calibration line for cadmium by ICP-MS, signal ratio against standard concentration in $\mathrm{\mu g\,dm^{-3}}$, with residuals. The slope (about $0.025$ per $\mathrm{\mu g\,dm^{-3}}$) is the $b$ of [[#ex-lod]]. Drag the lowest standards: near the detection limit the residuals are dominated by blank variability, which is why the LOD is estimated from replicate blanks rather than from the scatter of the whole line, and why calibration standards should bracket the concentrations of interest (a line dominated by a $10\ \mathrm{\mu g\,dm^{-3}}$ standard says little about $0.05\ \mathrm{\mu g\,dm^{-3}}$).
:::

## Uncertainty and decisions

::: definition Measurement uncertainty {#def-uncertainty}
The **standard uncertainty** $u$ of a result is its uncertainty expressed as a standard deviation. Independent contributions — sampling, sub-sampling, extraction recovery, calibration, the reference standard's purity, instrument repeatability — combine in quadrature (for a result that is a product or quotient of the inputs, in relative terms):
$$
\frac{u_\mathrm{c}(y)}{y} = \left[\sum_i\left(\frac{u(x_i)}{x_i}\right)^2\right]^{1/2},
$$
following the *Guide to the Expression of Uncertainty in Measurement* (GUM, JCGM 100:2008) and the EURACHEM/CITAC guide *Quantifying Uncertainty in Analytical Measurement*. The **expanded uncertainty** $U = ku_\mathrm{c}$, with coverage factor $k = 2$, defines an interval expected to contain the value of the measurand with about $95\ \%$ probability. Correlated inputs require covariance terms.
:::

Whether a result "exceeds a limit" is then a statistical decision. A result of $9.0\ \mathrm{\mu g\,dm^{-3}}$ with $U = 1.0\ \mathrm{\mu g\,dm^{-3}}$ against a limit of $10\ \mathrm{\mu g\,dm^{-3}}$ is compatible both with compliance and, marginally, with non-compliance. Regulations and contracts therefore need a **decision rule**: for example, that non-compliance is declared only when the result minus $U$ exceeds the limit (giving the benefit of the doubt to the operator), or that compliance is declared only when the result plus $U$ is below it (giving the benefit of the doubt to the environment). Which rule is used is a policy choice, and EURACHEM/CITAC guidance (*Use of Uncertainty Information in Compliance Assessment*) sets out the options; the chemist's task is to state the result and its uncertainty clearly enough that the rule can be applied.

::: example Combining uncertainty components {#ex-uncertainty}
A determination of a pesticide in groundwater has relative standard uncertainties of $2.0\ \%$ (calibration), $3.0\ \%$ (extraction recovery correction), $1.5\ \%$ (volume and mass measurements) and $4.0\ \%$ (between-sample sampling variability). Find the combined and expanded relative uncertainties. The result is $0.090\ \mathrm{\mu g\,dm^{-3}}$ against a limit of $0.10\ \mathrm{\mu g\,dm^{-3}}$ (the EU drinking-water parametric value for an individual pesticide, Directive (EU) 2020/2184). Is compliance demonstrated under a rule that requires $x + U \leq$ limit?
::: solution
$u_\mathrm{c}/y = (2.0^2 + 3.0^2 + 1.5^2 + 4.0^2)^{1/2}\ \% = (4 + 9 + 2.25 + 16)^{1/2}\ \% = 31.25^{1/2}\ \% = 5.6\ \%$, and $U = 2\times5.6 = 11\ \%$ (relative). For $x = 0.090$, $U = 0.010\ \mathrm{\mu g\,dm^{-3}}$, so $x + U = 0.100$: exactly at the limit — compliance is just demonstrated (to the precision of the numbers), and any further sample would be prudent. Two lessons: sampling variability is the largest single component, so better sampling would help more than better instruments; and the largest term dominates the sum in quadrature — halving the smallest component ($1.5\ \%$) would hardly change $u_\mathrm{c}$.
:::
:::

::: quiz
A laboratory reports $z = -2.8$ in a proficiency test for nitrate in river water. What should it conclude?
- [ ] The result is satisfactory, since $\lvert z\rvert < 3$.
- [x] The result is questionable: it lies between $2$ and $3$ standard deviations below the assigned value, so the laboratory should investigate possible bias (calibration, standards, matrix effects) even though it is not formally unsatisfactory.
- [ ] The assigned value is wrong.
- [ ] The laboratory's precision is too good.
::: solution
Under ISO 13528 conventions, $2 < \lvert z\rvert < 3$ is a warning signal. A single questionable score can occur by chance about $5\ \%$ of the time, but a negative sign suggests a low bias — for example a degraded calibration standard or incomplete conversion in a reduction step — and repeated warnings with the same sign indicate a systematic problem.
:::
:::

## Monitoring and regulation

Monitoring is where chemistry meets law. Regulations specify not only limits but how compliance is assessed: the EU Ambient Air Quality Directives (2008/50/EC, and its recast (EU) 2024/2881) prescribe reference methods, minimum numbers and siting of monitoring stations, data-capture requirements and data-quality objectives for uncertainty; the EU Water Framework Directive (2000/60/EC) and its daughter directives set environmental quality standards and, through Directive 2009/90/EC, minimum performance criteria for analytical methods; the US EPA publishes approved methods (for example EPA Methods 533 and 537.1 for PFAS in drinking water by LC–MS/MS). International programmes — WMO GAW for atmospheric composition, the Stockholm Convention's Global Monitoring Plan for POPs, the AMAP programme in the Arctic — use harmonised methods to assess global trends and the effectiveness of treaties. The neutral principle is that data used for decisions must be **fit for purpose, traceable and accompanied by their uncertainty**; the decisions themselves are for the regulatory process.

Monitoring has also repeatedly discovered problems that no one had predicted: the Antarctic ozone hole in a long-running Dobson record ([[environmental-chemistry/stratospheric-ozone]]), the unexpected rise in CFC-11 emissions from atmospheric measurements after 2012, the presence of PFAS in the blood of populations worldwide. Long, stable, well-calibrated records are the scientific infrastructure on which environmental chemistry rests.

::: history
Clair Patterson's clean-laboratory measurements of lead (1965 onwards), together with his isotopic proof of the age of the Earth (1956), showed that contamination control is a precondition of trace analysis. Charles Keeling's Mauna Loa record (from 1958) established the standard of calibrated, continuous atmospheric monitoring. James Lovelock's electron-capture detector (1957) made it possible to measure halocarbons at parts per trillion, and in 1971–72 he measured CFC-11 from the North Atlantic to Antarctica aboard the research ship *Shackleton* (published in *Nature*, 1973), showing it had accumulated worldwide. Lloyd Currie's paper on limits of detection (*Analytical Chemistry*, 1968) gave the statistical basis of detection decisions. The *Guide to the Expression of Uncertainty in Measurement* was published by ISO and partner bodies in 1993 (current edition JCGM 100:2008).
:::

## Where this leads

The analytical techniques — atomic spectrometry, chromatography and hyphenated mass spectrometry — are treated in [[analytical-chemistry]], with the statistics of calibration and detection in [[analytical-chemistry/statistics-calibration]] and the planning of an analysis in [[analytical-chemistry/analytical-process]]. Spectroscopic principles of remote sensing are in [[spectroscopy/electronic-spectroscopy]] and [[spectroscopy/vibrational-spectroscopy]]. Monitoring data feed back into every earlier chapter of this course — the residence times of [[environmental-chemistry/earth-system-chemistry]], the ozone records of [[environmental-chemistry/stratospheric-ozone]], the carbon budget of [[environmental-chemistry/greenhouse-gases]] — and into the design of cleaner processes in [[green-chemistry]].

::: summary
- Define the decision first: data quality objectives fix analytes, action levels, error rates, detection limits and numbers of samples.
- Sampling usually dominates uncertainty; designs are random, systematic, stratified or judgemental, and $n = (z\sigma/E)^2$ samples estimate a mean to within $\pm E$.
- Containers, preservation (acidification for metals, cooling, no headspace for VOCs) and holding times protect the sample; field, trip and method blanks reveal contamination, which often sets the detection limit.
- $\mathrm{LOD} \approx 3s_\text{blank}/b$ and $\mathrm{LOQ} \approx 10s_\text{blank}/b$; the LOQ must be well below the regulatory limit (EU water rules: at most $30\ \%$ of the standard).
- Preconcentration (SPE, extraction, purge-and-trap) lowers detection limits; isotope dilution, $n_x = n_y(a_y - R_\mathrm{b}b_y)/(R_\mathrm{b}b_x - a_x)$, corrects for losses because only a ratio is measured.
- Air monitors rely on UV photometry (ozone), chemiluminescence ($\mathrm{NO_x}$), UV fluorescence ($\mathrm{SO_2}$), NDIR and cavity ring-down (CO, $\mathrm{CO_2}$, $\mathrm{CH_4}$) and gravimetry (PM); each has an operational definition and known interferences.
- QC uses CRMs, spikes, duplicates, control charts ($\pm2s$ warning, $\pm3s$ action) and proficiency tests ($\lvert z\rvert \leq 2$ satisfactory); uncertainties combine in quadrature, $U = 2u_\mathrm{c}$, and compliance needs an explicit decision rule.
:::

## Exercises

::: exercise A detection limit {level=1 check="0.60"}
Replicate blanks for nitrite by a colorimetric method have a standard deviation of $0.0040$ absorbance units; the calibration slope is $0.020$ absorbance units per $\mathrm{\mu g\,dm^{-3}}$ of nitrite-N. Find the LOD by the $3s$ criterion. (Enter the LOD in $\mathrm{\mu g\,dm^{-3}}$, to two significant figures.)
::: solution
$\mathrm{LOD} = 3\times0.0040/0.020 = 0.60\ \mathrm{\mu g\,dm^{-3}}$; the LOQ would be $2.0\ \mathrm{\mu g\,dm^{-3}}$.
:::
:::

::: exercise Enrichment by solid-phase extraction {level=1 check="1800"}
A $1000\ \mathrm{cm^3}$ water sample is passed through an SPE cartridge, which is eluted to a final extract of $0.50\ \mathrm{cm^3}$, with $90\ \%$ recovery of the analyte. What is the enrichment factor? (Enter the factor, to two significant figures.)
::: solution
$\mathrm{EF} = (1000/0.50)\times0.90 = 2000\times0.90 = 1800$. A method with an instrumental LOD of $1\ \mathrm{\mu g\,dm^{-3}}$ in the extract therefore reaches about $0.6\ \mathrm{ng\,dm^{-3}}$ in the water — provided the procedural blank is correspondingly low.
:::
:::

::: exercise A proficiency-test score {level=1 check="1.6"}
A laboratory reports $52\ \mathrm{\mu g\,dm^{-3}}$ of zinc for a test sample with assigned value $48\ \mathrm{\mu g\,dm^{-3}}$ and target standard deviation $2.5\ \mathrm{\mu g\,dm^{-3}}$. Find $z$ and classify the result. (Enter $z$.)
::: solution
$z = (52 - 48)/2.5 = 1.6$, satisfactory ($\lvert z\rvert \leq 2$).
:::
:::

::: exercise How many water samples? {level=2 check="25"}
Nitrate in a set of private wells has a coefficient of variation of $50\ \%$. How many wells must be sampled to estimate the mean within $\pm20\ \%$ at $95\ \%$ confidence ($z = 1.96$)? (Enter the number of samples.)
::: solution
$n = (1.96\times0.50/0.20)^2 = 4.9^2 = 24.01$, rounded up to $25$. With $t$ instead of $z$ ($t_{0.975,24} = 2.06$), $n = 26.5 \to 27$, a small correction at this size.
:::
:::

::: exercise Isotope dilution {level=2 check="1.76"}
Repeat [[#ex-idms]] for a measured blend ratio $n(^{63}\mathrm{Cu})/n(^{65}\mathrm{Cu}) = 0.80$, with the same $1.00\ \mathrm{nmol}$ spike. (Enter $n_x$ in nmol, to three significant figures.)
::: solution
$n_x = 1.00\times(0.010 - 0.80\times0.990)/(0.80\times0.3085 - 0.6915) = (0.010 - 0.792)/(0.2468 - 0.6915) = (-0.782)/(-0.4447) = 1.76\ \mathrm{nmol}$. Less copper in the sample means the blend is closer to the spike ratio ($0.0101$); the result is most precise when the blend ratio is intermediate between sample ($2.24$) and spike ratios on a logarithmic scale.
:::
:::

::: exercise Expanded uncertainty {level=2 check="11"}
Independent relative standard uncertainties in a determination are $2.0\ \%$, $3.0\ \%$, $1.5\ \%$ and $4.0\ \%$. What is the expanded relative uncertainty with $k = 2$? (Enter $U$ as a percentage, to two significant figures.)
::: solution
$u_\mathrm{c} = \sqrt{4 + 9 + 2.25 + 16}\ \% = 5.6\ \%$; $U = 2u_\mathrm{c} = 11\ \%$ (as in [[#ex-uncertainty]]).
:::
:::

::: exercise The detection limit of an ozone photometer {level=3 check="0.093"}
(a) For a UV photometer with cell length $L$, show that the smallest detectable ozone number density is $n_\text{min} \approx \delta/(\sigma L)$, where $\delta$ is the smallest resolvable fractional change in transmitted intensity ($\delta \ll 1$). (b) With $\sigma = 1.1476\times10^{-17}\ \mathrm{cm^2}$, $L = 38\ \mathrm{cm}$ and $\delta = 1.0\times10^{-6}$, find the corresponding mixing ratio at $298\ \mathrm{K}$ and $1\ \mathrm{atm}$ ($n_\text{air} = 2.46\times10^{19}\ \mathrm{cm^{-3}}$). (c) Name two ways of lowering it. (Enter the mixing ratio in ppb, to two significant figures.)
::: solution
(a) $I/I_0 = e^{-\sigma nL} \approx 1 - \sigma nL$ for small optical depth, so the fractional change is $\sigma nL$; setting it equal to $\delta$ gives $n_\text{min} = \delta/(\sigma L)$. (b) $n_\text{min} = 1.0\times10^{-6}/(1.1476\times10^{-17}\times38) = 2.29\times10^{9}\ \mathrm{cm^{-3}}$, i.e. $2.29\times10^{9}/2.46\times10^{10} = 0.093\ \mathrm{ppb}$. (c) Lengthen the optical path (multipass cells, or cavity-enhanced methods with effective paths of kilometres), or improve the intensity-ratio precision by averaging longer, stabilising the lamp and detector, and alternating sample and zero air more rapidly. A shorter wavelength nearer the Hartley-band peak would add little, since $253.7\ \mathrm{nm}$ is already close to it.
:::
:::

::: exercise A decision rule {level=3 check="9.0"}
A laboratory's expanded relative uncertainty for a metal in effluent is $11.2\ \%$ ($k = 2$), proportional to the result. The permit limit is $10.0\ \mathrm{\mu g\,dm^{-3}}$, and the regulator's decision rule is that compliance is demonstrated only if $x + U \leq$ limit. (a) What is the largest measured value $x$ that demonstrates compliance? (b) Under the alternative rule "non-compliance is declared only if $x - U >$ limit", what is the smallest value that demonstrates non-compliance? (c) Comment on the "grey zone" between them. (Enter the answer to (a) in $\mathrm{\mu g\,dm^{-3}}$, to two significant figures.)
::: solution
(a) $x(1 + 0.112) \leq 10.0$, so $x \leq 8.99 \approx 9.0\ \mathrm{\mu g\,dm^{-3}}$. (b) $x(1 - 0.112) > 10.0$, so $x > 11.3\ \mathrm{\mu g\,dm^{-3}}$. (c) Results between $9.0$ and $11.3$ demonstrate neither compliance nor non-compliance with $95\ \%$ confidence. The width of the grey zone is set by the measurement uncertainty, so reducing $U$ (better sampling, more replicates, isotope dilution) narrows it; which party bears the risk inside it is fixed by the choice of decision rule, a regulatory rather than a chemical question.
:::
:::

::: exercise A control chart {level=2 check="53.6"}
A control sample has a long-term mean of $50.0\ \mathrm{\mu g\,dm^{-3}}$ and standard deviation $1.2\ \mathrm{\mu g\,dm^{-3}}$. Find the upper warning and action limits of a Shewhart chart. A new batch gives $53.0\ \mathrm{\mu g\,dm^{-3}}$ for the control sample: what should be done? (Enter the upper action limit in $\mathrm{\mu g\,dm^{-3}}$, to three significant figures.)
::: solution
Upper warning limit $50.0 + 2\times1.2 = 52.4$; upper action limit $50.0 + 3\times1.2 = 53.6\ \mathrm{\mu g\,dm^{-3}}$. The value $53.0$ lies between them: the batch can be accepted, but the result is a warning — if the next control value is also beyond a warning limit (two of three, by common rules), the method is out of control and the batch must be investigated and re-analysed.
:::
:::
