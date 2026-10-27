A routine pesticide-residue laboratory screens fruit and vegetables for several hundred pesticides in a single injection of about fifteen minutes. A toxicology laboratory confirms a drug in a urine sample with enough certainty to stand in court. An anti-doping laboratory distinguishes testosterone made by the body from testosterone taken as a drug. In each case a chromatograph separates the mixture in time, and a mass spectrometer, measuring the mass-to-charge ratio of ions formed from each compound, identifies and quantifies what emerges. Such combinations of a separation and a spectrometric detector, written with a hyphen — GC–MS, LC–MS, LC–MS/MS, GC–ICP-MS — are called **hyphenated techniques**. Neither half could do the job alone: the chromatograph cannot tell what a peak is, and the mass spectrometer, faced with a mixture of a thousand compounds at once, cannot tell which ion came from which.

This chapter explains how the two halves are joined and how the combination is used. We look at the interfaces and ion sources that turn a column effluent into gas-phase ions, the mass analysers and their resolving power and mass accuracy, and the acquisition modes — full scan, selected-ion monitoring and selected-reaction monitoring — that trade information for sensitivity. We then treat the two problems that dominate quantitative work: **matrix effects**, which make the same amount of analyte give different signals in different samples, and their cure, **isotope dilution** with isotopically labelled internal standards. The principles of mass spectrometry — ionisation, fragmentation, isotope patterns and the interpretation of spectra — are developed in [[spectroscopy/mass-spectrometry]]; the separations are those of [[analytical-chemistry/chromatography]]; and the calibration statistics are those of [[analytical-chemistry/statistics-calibration]].

## Joining a chromatograph to a mass spectrometer

The basic difficulty is pressure. A mass spectrometer's analyser works in a vacuum of about $10^{-3}$–$10^{-5}\ \mathrm{Pa}$, so that ions travel without colliding; a chromatograph delivers a stream of gas or liquid at atmospheric pressure or above.

**GC–MS** solves it easily. A capillary column carries about $1\ \mathrm{cm^3\,min^{-1}}$ of helium, which modern vacuum pumps remove without difficulty, so the column is led directly into the ion source through a heated transfer line. The standard ion source is **electron ionisation** (EI): molecules are bombarded with electrons of $70\ \mathrm{eV}$, forming molecular radical cations $\mathrm{M^{+\bullet}}$ that fragment in reproducible ways. Because EI spectra at $70\ \mathrm{eV}$ are nearly independent of the instrument, they can be matched against libraries of hundreds of thousands of reference spectra. Softer **chemical ionisation** (CI), with a reagent gas such as methane or ammonia, gives protonated molecules $[\mathrm{M+H}]^+$ with little fragmentation when the molecular mass is needed.

**LC–MS** is harder: a liquid flow of $0.2$–$1\ \mathrm{cm^3\,min^{-1}}$ becomes hundreds of cubic centimetres of vapour per minute. The breakthrough was ionisation at atmospheric pressure. In **electrospray ionisation** (ESI) the column effluent passes through a capillary held at a few kilovolts; the liquid is drawn into a cone and breaks into a mist of highly charged droplets, which shrink by evaporation (assisted by heated nitrogen) until the charge density forces ions into the gas phase. Ions are sampled through a small orifice into a series of differentially pumped stages. ESI is soft: it produces $[\mathrm{M+H}]^+$, $[\mathrm{M+Na}]^+$ or $[\mathrm{M-H}]^-$ from polar molecules, and multiply charged ions $[\mathrm{M}+z\mathrm{H}]^{z+}$ from proteins, bringing even large biomolecules within the $m/z$ range of ordinary analysers. **Atmospheric-pressure chemical ionisation** (APCI) vaporises the effluent in a heated tube and ionises it by ion–molecule reactions initiated by a corona discharge; it suits less polar, smaller molecules.

These sources impose conditions on the chromatography. Only volatile buffers (ammonium formate or acetate, formic or acetic acid) can be used for LC–MS; phosphate and other involatile salts would crust the source. Ion-pairing reagents and some surfactants suppress ionisation. And because ESI ionisation efficiency depends on everything else that reaches the droplet at the same moment, co-eluting matrix compounds change the analyte signal — the matrix effect discussed below.

## Mass analysers: resolving power and mass accuracy

The mass analyser separates ions by $m/z$. The common types differ in resolving power, mass accuracy, speed and the scan modes they allow.

::: definition Resolving power and mass accuracy {#def-resolving-power}
The **resolving power** of a mass analyser at a peak of mass-to-charge ratio $m/z$ is $R = m/\Delta m$, where $\Delta m$ is the full width of the peak at half maximum (FWHM definition). Two peaks of similar height separated by $\Delta m$ are just distinguishable when $R \approx m/\Delta m$. The **mass accuracy** of a measurement is the difference between the measured and the theoretical (exact) mass, usually expressed in parts per million:
$$
\delta = \frac{m_\mathrm{measured} - m_\mathrm{theoretical}}{m_\mathrm{theoretical}}\times10^6\ \mathrm{ppm} .
$$
**Nominal-mass** (unit-resolution) instruments resolve adjacent integer masses; **high-resolution, accurate-mass** (HRAM) instruments resolve ions of the same nominal mass and measure exact masses to a few ppm or better.
:::

- The **quadrupole** mass filter passes ions of one $m/z$ at a time through four parallel rods carrying combined RF and DC voltages. It has unit resolution, is robust and inexpensive, and is the standard analyser for routine GC–MS and LC–MS.
- The **triple quadrupole** (QqQ) has two mass-filtering quadrupoles separated by a collision cell. The first selects a **precursor** ion, which is fragmented by collisions with argon or nitrogen in the cell (collision-induced dissociation), and the third selects a **product** ion. This is **tandem mass spectrometry** (MS/MS).
- The **time-of-flight** (TOF) analyser accelerates a packet of ions to the same kinetic energy and measures their flight times along a field-free tube; since $\tfrac12mv^2 = zeU$, lighter ions arrive first, with $t \propto \sqrt{m/z}$. TOF records complete spectra thousands of times per second, with resolving powers of about $10^4$–$10^5$ and mass accuracy of a few ppm.
- The **Orbitrap** traps ions orbiting a central spindle electrode; their axial oscillation frequency, $\omega \propto \sqrt{z/m}$, is measured as an image current and Fourier-transformed into a spectrum, giving resolving powers above $10^5$ and sub-ppm to few-ppm mass accuracy. Fourier-transform ion cyclotron resonance instruments, which use the cyclotron frequency in a strong magnetic field, go higher still.

Mass accuracy is powerful because exact masses are not integers. The mass defect of each nucleus (from its binding energy) gives every elemental formula a characteristic exact mass: $\mathrm{C_{17}H_{19}NO_3}$ and $\mathrm{C_{18}H_{23}NO_2}$ both have nominal mass $285$ but exact neutral masses differing by $0.036\ \mathrm{u}$, which an instrument with $R = 20\,000$ and $5\ \mathrm{ppm}$ accuracy distinguishes easily. A measured exact mass within a few ppm, together with the isotope pattern, usually narrows the elemental formula of a small molecule to a handful of candidates.

## Acquisition modes: information against sensitivity

A mass spectrometer coupled to a chromatograph records spectra repeatedly as the peaks elute. A chromatographic peak lasts a few seconds; to define its shape for quantification needs about $10$–$20$ measurements across it, so each **cycle** of the analyser must take well under a second. How that cycle time is spent decides what the experiment can do.

- In **full-scan** mode, a quadrupole steps through the whole $m/z$ range (say $50$–$550$) in each cycle, recording complete spectra. The sum of all ion currents in each spectrum, plotted against time, is the **total ion chromatogram** (TIC); the current at one chosen $m/z$, extracted from the stored spectra, is an **extracted-ion chromatogram** (EIC). Full scan is essential for identifying unknowns.
- In **selected-ion monitoring** (SIM), the quadrupole jumps between a few chosen $m/z$ values characteristic of the target analytes and spends the whole cycle on them. No spectra are recorded, but each chosen ion is measured for much longer, and the signal-to-noise ratio rises.
- In **selected-reaction monitoring** (SRM, also called multiple-reaction monitoring, MRM) on a triple quadrupole, the first quadrupole selects the analyte's precursor ion and the third one of its product ions. A co-eluting matrix compound must now have both the same precursor mass *and* a fragment of the same mass to interfere, so the chemical background almost vanishes. SRM is the standard for trace quantification of targeted compounds in complex matrices — drugs in plasma, pesticides in food, mycotoxins in grain.

::: proposition Signal-to-noise gain from longer dwell times {#prop-dwell}
If ion arrival at the detector is a Poisson process with mean rate $r$ (ions per second) and the noise is dominated by counting statistics, the number of ions counted in a dwell time $\tau$ has mean $r\tau$ and standard deviation $\sqrt{r\tau}$, so the signal-to-noise ratio is
$$
\frac{S}{N} = \sqrt{r\tau} .
$$ {#eq-dwell}
Spending a cycle time $T_\mathrm{c}$ on $n$ ions instead of on $M$ mass channels raises the dwell time per ion by $M/n$ and the signal-to-noise ratio by $\sqrt{M/n}$.
:::

::: proof
For a Poisson process the count $X$ in an interval of length $\tau$ has $\E[X] = r\tau$ and $\Var(X) = r\tau$ (the variance of a Poisson variable equals its mean). The signal is the mean count and the noise its standard deviation, so $S/N = r\tau/\sqrt{r\tau} = \sqrt{r\tau}$. In full scan over $M$ channels each channel receives a dwell $T_\mathrm{c}/M$ per cycle; in SIM on $n$ ions each receives $T_\mathrm{c}/n$. The ratio of $S/N$ is $\sqrt{(T_\mathrm{c}/n)/(T_\mathrm{c}/M)} = \sqrt{M/n}$. (When chemical background, not counting noise, dominates, as it often does in single-stage MS of complex samples, the gain is smaller; SRM attacks the background itself.)
:::

::: widget plot
f: sqrt(500/x)
x: 1, 50
y: 0, 25
labels: \text{S/N gain over full scan}
caption: The signal-to-noise gain of selected-ion monitoring over a full scan of $500$ mass channels in the same cycle time, from [[#eq-dwell]], against the number of ions monitored ($x$). Monitoring four ions gives a gain of about $11$; monitoring fifty, still about $3$. The gain is real only while counting statistics limit the noise; in a dirty matrix the chemical background at the chosen $m/z$ is measured just as efficiently as the analyte, which is why tandem MS (SRM) is used for the most demanding work.
:::

::: example Full scan or SIM? {#ex-sim}
A GC–MS scans $m/z$ $50$–$549$ ($500$ channels) in a $0.50\ \mathrm{s}$ cycle. An analyte's principal ion arrives at $2.0\times10^4$ ions per second at the top of its peak. (a) How many ions are counted for that $m/z$ per cycle in full scan, and with what relative standard deviation? (b) Repeat for SIM of four ions with the same cycle.
::: solution
(a) Dwell per channel: $0.50/500 = 1.0\ \mathrm{ms}$. Counts: $2.0\times10^4\times1.0\times10^{-3} = 20$; relative standard deviation $1/\sqrt{20} = 22\ \%$.

(b) Dwell per ion: $0.50/4 = 125\ \mathrm{ms}$. Counts: $2500$; relative standard deviation $1/\sqrt{2500} = 2.0\ \%$. The signal-to-noise ratio improves by $\sqrt{125} = 11.2$, in agreement with [[#prop-dwell]]. The price is that nothing outside the four chosen $m/z$ values is recorded: an unexpected contaminant goes unseen.
:::
:::

## Identification: retention, ions and isotope patterns

Identification in hyphenated methods rests on several independent pieces of evidence, each of which can fail alone:

1. **Retention time** (or retention index) matching that of a reference standard measured in the same run, within a narrow tolerance;
2. the **mass spectrum** (full scan) or the presence of **several characteristic ions** or transitions (SIM, SRM) — typically at least two;
3. the **ratios** of those ions' intensities matching the reference within a stated tolerance (for example, EU guidance for pesticide residues accepts ion ratios within $\pm30\ \%$ relative of the reference);
4. for accurate-mass instruments, the **exact mass** within a few ppm and the **isotope pattern**.

Isotope patterns are especially informative for chlorine and bromine. Chlorine is $75.76\ \%$ $^{35}\mathrm{Cl}$ and $24.24\ \%$ $^{37}\mathrm{Cl}$; bromine is $50.69\ \%$ $^{79}\mathrm{Br}$ and $49.31\ \%$ $^{81}\mathrm{Br}$ (IUPAC representative isotopic compositions). An ion containing $n$ chlorine atoms therefore shows a cluster of peaks two mass units apart whose intensities follow a binomial distribution.

::: widget distribution
dist: binomial
params: n=2, p=0.2424
caption: The isotope pattern of an ion containing $n$ chlorine atoms is the binomial distribution of the number $k$ of $^{37}\mathrm{Cl}$ atoms, with $p = 0.2424$ the abundance of $^{37}\mathrm{Cl}$; the peak for $k$ heavy atoms lies at $\mathrm{M} + 2k$. For $n = 2$ the relative intensities are $100 : 64 : 10$ (M : M+2 : M+4). Increase $n$ to $6$ (hexachlorobenzene) and the most intense peak moves to M+2 or M+4; set $p = 0.4931$ for bromine and the pattern becomes nearly symmetric ($1:1$ for one Br, $1:2:1$ for two). Carbon-13 ($1.1\ \%$ per carbon) adds a smaller M+1 pattern on top.
:::

::: example Recognising two chlorines {#ex-isotope-pattern}
A peak in a GC–MS full scan shows ions at $m/z$ $146$, $148$ and $150$ with relative intensities $100$, $64$ and $10$. How many chlorine atoms does the ion contain? Predict the intensities for one and for three chlorine atoms.
::: solution
For $n$ chlorines the intensities are proportional to $\binom{n}{k}q^{n-k}p^k$ with $q = 0.7576$, $p = 0.2424$, so the ratio of successive peaks to the first is a power series in $p/q = 0.3200$. For $n = 1$: $100 : 32$. For $n = 2$: $100 : 2\times32.0 : 32.0^2/100 = 100 : 64.0 : 10.2$ — the observed pattern. For $n = 3$: $100 : 3\times32.0 : 3\times(0.320)^2\times100 : (0.320)^3\times100 = 100 : 96 : 31 : 3.3$. The ion contains two chlorines; $m/z = 146$ with $\mathrm{Cl_2}$ is consistent with $\mathrm{C_6H_4Cl_2^{+\bullet}}$, the molecular ion of a dichlorobenzene. Which isomer it is must be decided by retention time, since the three dichlorobenzenes give almost identical EI spectra.
:::
:::

## Matrix effects

In electrospray, analyte ions compete with everything else in the droplet for the limited surface charge and for access to the droplet surface. Co-eluting compounds from the sample — salts, phospholipids from plasma, pigments and sugars from food — can therefore **suppress** (or occasionally **enhance**) the ionisation of the analyte. The signal from a given amount of analyte then depends on the sample, and a calibration made in solvent gives biased results. APCI and EI are much less affected, but not immune.

::: definition Matrix effect {#def-matrix-effect}
The **matrix effect** is quantified by comparing the response $B$ of the analyte spiked into a blank sample extract *after* extraction with its response $A$ in pure solvent at the same concentration:
$$
\mathrm{ME} = \left(\frac{B}{A} - 1\right)\times100\ \% .
$$
Negative values indicate suppression, positive values enhancement. Comparing the response of analyte spiked *before* extraction with $B$ gives the **recovery** of the extraction alone; the product of the two is the overall **process efficiency**.
:::

::: example Ion suppression in a plasma extract {#ex-matrix-effect}
A drug at $10\ \mathrm{ng\,cm^{-3}}$ gives a peak area of $1.21\times10^6$ in solvent and $8.42\times10^5$ when spiked into a protein-precipitated plasma extract. Calculate the matrix effect, and the bias if unknown samples were quantified against solvent standards without correction.
::: solution
$\mathrm{ME} = (8.42\times10^5/1.21\times10^6 - 1)\times100\ \% = (0.696 - 1)\times100\ \% = -30\ \%$. A plasma sample containing $10\ \mathrm{ng\,cm^{-3}}$ would be reported as about $7.0\ \mathrm{ng\,cm^{-3}}$. Worse, the suppression varies from patient to patient (different lipid contents) and along the chromatogram (phospholipids elute in characteristic regions), so it cannot be corrected with a single factor. Remedies, in rough order of preference: an isotope-labelled internal standard that co-elutes with the analyte and is suppressed equally; better sample clean-up (solid-phase extraction, phospholipid removal); chromatographic changes that move the analyte away from the suppressing region; dilution of the extract; matrix-matched calibration; standard addition.
:::
:::

::: warning An internal standard is only as good as its resemblance to the analyte {#warn-internal-standard}
An internal standard corrects for matrix effects only if it experiences them identically, which requires that it co-elute with the analyte and ionise in the same way. A structural analogue that elutes thirty seconds later can sit in a quite different suppression environment and make the correction worse rather than better. Even a deuterium-labelled standard can be separated slightly from the unlabelled analyte by reversed-phase chromatography (deuterated compounds are often a little less retained), and if it elutes on the edge of a suppression zone the two will not be suppressed equally; $^{13}\mathrm{C}$- or $^{15}\mathrm{N}$-labelled standards co-elute more exactly. Labelled standards must also be free of unlabelled material, and their label must not be lost by exchange (deuterium on oxygen or nitrogen exchanges with solvent protons; deuterium on carbon usually does not). Finally, the internal standard corrects only for what happens after it is added — it must be added to the sample at the very start of preparation to correct for extraction losses.
:::

## Isotope dilution

The most accurate quantitative method in chemical analysis adds to the sample a known amount of the analyte itself in an isotopically altered form — the **spike** — and measures, by mass spectrometry, the ratio of the two isotopic forms in the blend. Once sample and spike are mixed and equilibrated, any subsequent loss affects both forms equally, so recovery, matrix effects and drift cancel. **Isotope-dilution mass spectrometry** (IDMS) is recognised as a primary ratio method by the international metrology community and is used to certify reference materials and to set reference values in clinical chemistry.

For organic analytes, the labelled internal standard (with, say, three $^{13}\mathrm{C}$ or several deuterium atoms) has a different mass from the analyte, and their ions are measured separately. If the isotopic distributions do not overlap, the calculation is simply that of an internal standard with a response factor near $1$: $c_x = c_\mathrm{IS}\,(A_x/A_\mathrm{IS})/\mathrm{RRF}$, where the relative response factor $\mathrm{RRF}$ is found from a calibration. For elements, where the analyte and spike consist of the same isotopes in different proportions, the calculation must account for every isotope in both.

::: proposition The isotope-dilution equation {#prop-idms}
A sample contains $n_x$ moles of an element whose isotopes $a$ and $b$ have amount fractions (abundances) $a_x$ and $b_x$. A spike of $n_y$ moles with abundances $a_y$ and $b_y$ (enriched in $b$) is added and equilibrated. If the blend's measured amount ratio $R = n(a)/n(b)$ has been corrected for instrumental mass bias, then
$$
n_x = n_y\,\frac{Rb_y - a_y}{a_x - Rb_x} .
$$ {#eq-idms}
The relative uncertainty of $n_x$ is the relative uncertainty of $R$ multiplied by the **error magnification factor**
$$
f(R) = R\left(\frac{b_y}{Rb_y - a_y} + \frac{b_x}{a_x - Rb_x}\right),
$$
which has its minimum at $R = \sqrt{(a_x/b_x)(a_y/b_y)}$, the geometric mean of the isotope ratios of sample and spike.
:::

::: proof
In the blend, the amount of isotope $a$ is $n_xa_x + n_ya_y$ and that of $b$ is $n_xb_x + n_yb_y$. Hence
$$
R = \frac{n_xa_x + n_ya_y}{n_xb_x + n_yb_y} \quad\Rightarrow\quad R\,n_xb_x + R\,n_yb_y = n_xa_x + n_ya_y \quad\Rightarrow\quad n_x(a_x - Rb_x) = n_y(Rb_y - a_y),
$$
which is [[#eq-idms]]. Only a ratio is measured, so losses after equilibration, which remove $a$ and $b$ in proportion, leave $R$ unchanged. For the uncertainty, differentiate $\ln n_x = \ln n_y + \ln(Rb_y - a_y) - \ln(a_x - Rb_x)$:
$$
\frac{\partial\ln n_x}{\partial\ln R} = R\,\frac{\partial\ln n_x}{\partial R} = R\left(\frac{b_y}{Rb_y - a_y} + \frac{b_x}{a_x - Rb_x}\right) = f(R),
$$
so $u(n_x)/n_x = f(R)\,u(R)/R$. Write $R_x = a_x/b_x$ and $R_y = a_y/b_y$, with $R_y < R < R_x$; then $f = R/(R - R_y) + R/(R_x - R)$. Setting $\dd f/\dd R = 0$ gives $-R_y/(R - R_y)^2 + R_x/(R_x - R)^2 = 0$, i.e. $(R_x - R)/(R - R_y) = \sqrt{R_x/R_y}$, whose solution is $R = \sqrt{R_xR_y}$. At the extremes — a blend dominated by sample ($R\to R_x$) or by spike ($R\to R_y$) — $f$ diverges, because $R$ then hardly changes with $n_x$.
:::

::: widget plot
f: x*(0.995/(x*0.995-0.003) + 0.241/(0.524-x*0.241))
x: 0.01, 2.1
y: 0, 6
vlines: 0.081
caption: The error magnification factor $f(R)$ of [[#prop-idms]] for lead with a $^{206}\mathrm{Pb}$ spike ($a = {}^{208}\mathrm{Pb}$, $b = {}^{206}\mathrm{Pb}$; sample abundances $a_x = 0.524$, $b_x = 0.241$; spike $a_y = 0.003$, $b_y = 0.995$), against the blend ratio $R = n(^{208}\mathrm{Pb})/n(^{206}\mathrm{Pb})$ ($x$). The minimum, $f = 1.08$, lies at $R = \sqrt{2.174\times0.00302} = 0.081$ (vertical line); the curve is flat over a wide range, so $R$ between about $0.03$ and $0.5$ costs little, but blends close to the natural ratio $2.17$ (too little spike) magnify the ratio uncertainty enormously. In practice, other uncertainty sources (detector dead time, mass bias at very unequal ratios) favour ratios nearer $1$, a compromise between magnification and measurement quality.
:::

::: example Lead by isotope dilution {#ex-idms}
To $1.000\ \mathrm{g}$ of a sediment, $50.0\ \mathrm{nmol}$ of lead spike enriched in $^{206}\mathrm{Pb}$ ($^{208}\mathrm{Pb}$ $0.30\ \%$, $^{206}\mathrm{Pb}$ $99.5\ \%$) is added. After digestion, equilibration and ICP-MS measurement, the mass-bias-corrected ratio $^{208}\mathrm{Pb}/^{206}\mathrm{Pb}$ in the blend is $0.400$. The sample's own lead, measured separately, has $^{208}\mathrm{Pb}$ $52.4\ \%$ and $^{206}\mathrm{Pb}$ $24.1\ \%$. Find the lead content of the sediment in $\mu\mathrm{g\,g^{-1}}$ ($M(\mathrm{Pb}) = 207.2\ \mathrm{g\,mol^{-1}}$; use this as an approximation for the sample's lead).
::: solution
From [[#eq-idms]] with $a = {}^{208}\mathrm{Pb}$, $b = {}^{206}\mathrm{Pb}$:
$$
n_x = 50.0\ \mathrm{nmol}\times\frac{0.400\times0.995 - 0.003}{0.524 - 0.400\times0.241} = 50.0\times\frac{0.395}{0.4276} = 46.2\ \mathrm{nmol}.
$$
Mass: $46.2\times10^{-9}\times207.2 = 9.57\times10^{-6}\ \mathrm{g}$, so the sediment contains $9.57\ \mu\mathrm{g\,g^{-1}}$ of lead. The sample's isotopic composition had to be measured because lead's composition varies in nature (it is partly radiogenic, from uranium and thorium decay) — a fact exploited in tracing sources of lead pollution. The error magnification at $R = 0.400$ is $1.23$, so a $0.2\ \%$ ratio uncertainty contributes about $0.25\ \%$ to the result.
:::
:::

::: quiz
Why does isotope dilution correct for an incomplete extraction, while an external calibration does not?
- [ ] Because the mass spectrometer detects isotopes more sensitively than other detectors do.
- [x] Because once the spike has equilibrated with the analyte, losses remove both forms in the same proportion, and only their ratio is measured.
- [ ] Because the spike increases the total amount of analyte, so the losses are a smaller fraction.
- [ ] Because isotopically labelled compounds are not lost during extraction.
::: solution
The measured quantity is a ratio, and any process after equilibration that does not distinguish isotopes — incomplete extraction, adsorption, evaporation losses, ion suppression, a drop in sensitivity — changes numerator and denominator alike. The essential condition is equilibration: the spike must be in the same chemical form and environment as the analyte before any loss occurs. A spike added after an incomplete digestion of a refractory mineral would not correct for the analyte still locked inside it.
:::
:::

## Speciation: chromatography with element-specific detection

The toxicity and mobility of an element depend on its chemical form. Arsenobetaine, the main arsenic compound in fish, is practically non-toxic, while inorganic arsenite and arsenate are carcinogens; methylmercury accumulates in food chains in a way inorganic mercury does not; chromium(VI) is far more hazardous than chromium(III). A total-element result from [[analytical-chemistry/atomic-spectrometry]] cannot tell them apart. **Speciation analysis** couples a separation — HPLC (often ion-exchange) for arsenic species, GC after derivatisation for organomercury and organotin compounds — to an ICP-MS, which detects the element in each eluting species with high sensitivity and largely independently of its chemical form. **Species-specific isotope dilution**, with isotopically enriched forms of the individual species, then corrects for losses and for interconversion of species during preparation.

## Choosing and validating a hyphenated method

| question | typical choice |
|---|---|
| volatile, thermally stable organics; unknown identification | GC–MS (EI, full scan, library search) |
| targeted volatile residues at trace level | GC–MS/MS (SRM) |
| polar, involatile or thermally labile targets (drugs, pesticides, mycotoxins) | LC–MS/MS (ESI, SRM) with labelled internal standards |
| screening for unknowns or very many targets | LC–HRMS (TOF or Orbitrap, accurate mass) |
| element species | HPLC–ICP-MS or GC–ICP-MS |

Validation follows [[analytical-chemistry/statistics-calibration]] with additions specific to MS: the matrix effect is measured in several independent lots of blank matrix; identification criteria (retention, ion ratios, mass accuracy) are fixed in advance; carry-over is checked by injecting a blank after the highest standard; and the stability of the analyte in the matrix and in the autosampler is established. Mass spectrometers are complex instruments with high-voltage supplies, vacuum systems and heated sources, and LC–MS solvents are flammable; these are run under the laboratory's general risk assessment like any other instrument.

## Where this leads

The interpretation of mass spectra — fragmentation rules, rearrangements, the nitrogen rule and isotope patterns of other elements — is developed in [[spectroscopy/mass-spectrometry]] and applied to structure determination in [[spectroscopy/structure-problems]]. LC–MS/MS of drugs and metabolites is the analytical backbone of the pharmacokinetic studies in [[medicinal-chemistry/pharmacokinetics]], and the same methods monitor pollutants in [[environmental-chemistry/environmental-monitoring]] and [[environmental-chemistry/pollutants-fate]]. Proteomics — the identification and quantification of thousands of proteins by LC–MS/MS of their peptides — builds on [[biochemistry/amino-acids-proteins]].

::: history
Roland Gohlke and Fred McLafferty at the Dow Chemical Company coupled a gas chromatograph to a time-of-flight mass spectrometer in the mid-1950s, the first GC–MS. Ragnar Ryhage's jet separator and the effusion separator of J. Throck Watson and Klaus Biemann (both 1964) removed most of the carrier gas from packed-column effluents, and fused-silica capillary columns coupled directly to the source made GC–MS routine by the 1980s. Electrospray ionisation was demonstrated for gas-phase ions by Malcolm Dole in 1968 and developed into an analytical source for large molecules by John Fenn and co-workers in the 1980s; Fenn shared the 2002 Nobel Prize in Chemistry with Koichi Tanaka for soft ionisation of biological macromolecules. Richard Yost and Christie Enke built the first triple-quadrupole mass spectrometer in 1978. Alexander Makarov invented the Orbitrap, which was commercialised in 2005. Isotope dilution dates back to George de Hevesy's radioactive tracer work of the 1910s and 1920s and was put on a mass-spectrometric footing in the 1940s–50s; it is now the basis of the highest-order reference methods in clinical chemistry and elemental analysis.
:::

::: summary
- Hyphenated techniques combine separation in time (GC, LC) with identification by mass (MS); neither alone handles complex mixtures.
- GC couples directly to EI sources, whose reproducible spectra are searched in libraries; LC needs atmospheric-pressure ionisation (ESI, APCI), volatile buffers and attention to matrix effects.
- Resolving power $R = m/\Delta m$ and mass accuracy (ppm) define what an analyser can distinguish; quadrupoles give unit resolution, TOF and Orbitrap analysers accurate masses.
- Full scan identifies; SIM raises signal-to-noise by $\sqrt{M/n}$ under counting statistics; SRM on a triple quadrupole removes chemical background and is the standard for trace targeted quantification.
- Identification combines retention time, several ions and their ratios, exact mass and isotope patterns (binomial for Cl and Br).
- Matrix effects $\mathrm{ME} = (B/A - 1)\times100\ \%$ bias ESI results; co-eluting isotope-labelled internal standards correct them.
- Isotope dilution $n_x = n_y(Rb_y - a_y)/(a_x - Rb_x)$ measures only a ratio, cancelling losses after equilibration; the error magnification is smallest near $R = \sqrt{R_xR_y}$.
:::

## Exercises

::: exercise Mass accuracy {level=1 check="-2.0"}
An ion with a theoretical $m/z$ of $304.1549$ is measured at $304.1543$. Find the mass error in ppm. (Enter it to two significant figures.)
::: solution
$\delta = (304.1543 - 304.1549)/304.1549\times10^6 = -0.0006/304.1549\times10^6 = -2.0\ \mathrm{ppm}$. Typical acceptance windows for accurate-mass identification are $\pm5\ \mathrm{ppm}$.
:::
:::

::: exercise Resolving power {level=1 check="30000"}
What resolving power (FWHM) is needed to separate two ions at $m/z$ $300.1000$ and $300.1100$? (Enter $R$.)
::: solution
$R = m/\Delta m = 300.10/0.0100 = 3.0\times10^4$. A TOF or Orbitrap instrument provides this; a quadrupole ($R \approx 300$ here) does not.
:::
:::

::: exercise One chlorine {level=1 check="0.320"}
Using the IUPAC abundances $75.76\ \%$ $^{35}\mathrm{Cl}$ and $24.24\ \%$ $^{37}\mathrm{Cl}$, find the intensity ratio $\mathrm{M+2}/\mathrm{M}$ for an ion containing one chlorine atom (ignoring other elements). (Enter the ratio to three significant figures.)
::: solution
$24.24/75.76 = 0.320$, i.e. about $3:1$ for M : M+2 — the signature of a single chlorine. The $^{13}\mathrm{C}$ contribution to M+2 (from two $^{13}\mathrm{C}$ atoms) is small for small molecules.
:::
:::

::: exercise Quantification with a labelled internal standard {level=2 check="22.3"}
A plasma sample is spiked with a $^{13}\mathrm{C_6}$-labelled internal standard at $20.0\ \mathrm{ng\,cm^{-3}}$. After extraction, the LC–MS/MS peak areas are $4.15\times10^5$ (analyte transition) and $3.62\times10^5$ (internal standard). The relative response factor from calibration is $1.03$. Find the analyte concentration. (Enter it in $\mathrm{ng\,cm^{-3}}$ to three significant figures.)
::: solution
$c_x = c_\mathrm{IS}(A_x/A_\mathrm{IS})/\mathrm{RRF} = 20.0\times(4.15/3.62)/1.03 = 20.0\times1.1464/1.03 = 22.3\ \mathrm{ng\,cm^{-3}}$. Any loss during extraction or suppression during ionisation affects analyte and internal standard equally and cancels in the ratio.
:::
:::

::: exercise Measuring a matrix effect {level=2 check="-30"}
Verify the matrix effect of [[#ex-matrix-effect]], and find the process efficiency if the response of analyte spiked into plasma *before* extraction is $7.66\times10^5$. (Enter the matrix effect in per cent, to two significant figures.)
::: solution
$\mathrm{ME} = (8.42/12.1 - 1)\times100 = -30\ \%$. Recovery $= 7.66\times10^5/8.42\times10^5 = 91.0\ \%$. Process efficiency $= 7.66\times10^5/1.21\times10^6 = 63.3\ \%$, which equals $0.696\times0.910$. Separating the two effects tells the analyst where to work: here the extraction is good, and the problem is ionisation suppression.
:::
:::

::: exercise Two chlorines {level=2 check="10.2"}
Derive the relative intensities of the M, M+2 and M+4 peaks of an ion with two chlorine atoms, with M set to $100$. (Enter the M+4 intensity.)
::: solution
The probabilities of $0$, $1$ and $2$ heavy atoms are $q^2$, $2pq$ and $p^2$ with $q = 0.7576$, $p = 0.2424$: $0.5740$, $0.3673$ and $0.0588$. Relative to M: $100 : 64.0 : 10.2$. The cluster is a quick visual fingerprint; for three chlorines it is $100 : 96 : 31 : 3.3$.
:::
:::

::: exercise An isotope-dilution calculation {level=3 check="9.57"}
Derive [[#eq-idms]] from the amounts of the two isotopes in the blend. Then verify [[#ex-idms]]: find the lead mass fraction of the sediment. Finally, state which way the result would be biased if the mass-bias correction were omitted and the instrument measured $^{208}\mathrm{Pb}/^{206}\mathrm{Pb}$ $1\ \%$ too high. (Enter the lead content in $\mu\mathrm{g\,g^{-1}}$ to three significant figures.)
::: hint
In [[#eq-idms]], $R$ appears in the numerator with a positive sign and in the denominator with a negative sign.
:::
::: solution
The derivation is the proof of [[#prop-idms]]. Numerically, $n_x = 50.0\times(0.3980 - 0.003)/(0.524 - 0.0964) = 50.0\times0.3950/0.4276 = 46.19\ \mathrm{nmol}$, i.e. $46.19\times10^{-9}\times207.2\ \mathrm{g} = 9.57\ \mu\mathrm{g}$ in $1.000\ \mathrm{g}$: $9.57\ \mu\mathrm{g\,g^{-1}}$. With $R$ $1\ \%$ too high ($0.404$), $n_x = 50.0\times(0.4020 - 0.003)/(0.524 - 0.09736) = 50.0\times0.3990/0.4266 = 46.76\ \mathrm{nmol}$: the result would be $1.2\ \%$ high, the ratio error multiplied by $f(0.400) = 1.23$. Mass bias of this size is normal in ICP-MS, which is why it is corrected by measuring a reference material of certified isotopic composition.
:::
:::

::: exercise The gain from SIM {level=3 check="11.2"}
Using [[#prop-dwell]], find the signal-to-noise gain of SIM on four ions over a full scan of $500$ channels in the same cycle time. Then explain why, in a heavily contaminated extract, the observed gain might be only two or three, and how SRM would help. (Enter the theoretical gain to three significant figures.)
::: solution
Gain $= \sqrt{M/n} = \sqrt{500/4} = \sqrt{125} = 11.2$. In a dirty extract, the noise at the chosen $m/z$ is dominated by ions from co-eluting matrix compounds of the same nominal mass (chemical noise), which SIM measures just as efficiently as the analyte: the background rises with dwell time as fast as the signal, so the ratio improves much less than the counting-statistics estimate. SRM requires an interferent to share both the precursor mass and a product-ion mass with the analyte, which few do, so the chemical background falls dramatically and the detection limit improves by orders of magnitude.
:::
:::
