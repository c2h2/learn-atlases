A sample of petrol contains several hundred hydrocarbons; a blood plasma extract may contain a drug, its three metabolites and a thousand endogenous compounds; an essential oil has a hundred terpenes differing only in the position of a double bond. No spectrometer can measure one compound in such a mixture reliably — the signals overlap. The solution, used in almost every analytical laboratory, is to separate first and measure afterwards. **Chromatography** separates the components of a mixture by passing them in a moving phase over a stationary phase, where each component is held back to an extent that depends on its affinity for the stationary phase. A modern gas chromatograph resolves several hundred compounds in an hour; a liquid chromatograph coupled to a detector measures a drug in plasma at nanograms per millilitre.

The idea, and the simplest forms — thin-layer, paper and column chromatography, the retention factor $R_\mathrm{F}$ and the link between partition and retention — are in [[laboratory-methods/chromatography-basics]]. This chapter builds the quantitative theory used in instrumental chromatography: retention described by the retention factor and selectivity; band broadening described by the plate height and the van Deemter equation; and **resolution**, which combines them and tells us what to change when two peaks overlap. We then look at the two major instrumental techniques, gas chromatography and high-performance liquid chromatography, their columns and detectors, and how peaks become quantitative results.

## Retention

In column chromatography a sample is injected as a narrow band at the head of the column; the mobile phase carries it through; and a detector at the outlet records a **chromatogram**, a signal against time with a peak for each separated component. A compound that does not interact with the stationary phase at all emerges at the **dead time** (hold-up time) $t_\mathrm{M}$, the time the mobile phase takes to cross the column. A retained compound emerges later, at its **retention time** $t_\mathrm{R}$; the difference $t_\mathrm{R}' = t_\mathrm{R} - t_\mathrm{M}$ is the **adjusted retention time**, the time it spends in the stationary phase.

::: definition Retention factor, partition coefficient and selectivity {#def-retention}
For a solute distributed between a stationary phase (volume $V_\mathrm{S}$) and a mobile phase (volume $V_\mathrm{M}$) in the column, the **partition coefficient** is $K = c_\mathrm{S}/c_\mathrm{M}$, the ratio of its equilibrium concentrations. The **retention factor** (capacity factor) is the ratio of the amounts in the two phases,
$$
k = \frac{n_\mathrm{S}}{n_\mathrm{M}} = K\frac{V_\mathrm{S}}{V_\mathrm{M}} = \frac{K}{\beta},
$$
where $\beta = V_\mathrm{M}/V_\mathrm{S}$ is the **phase ratio**. For two solutes with $k_2 > k_1$, the **selectivity factor** (separation factor) is $\alpha = k_2/k_1 = K_2/K_1 > 1$.
:::

::: proposition Retention time and retention factor {#prop-retention-time}
If partition equilibrium is established rapidly everywhere in the column, a solute's band moves at the fraction $1/(1+k)$ of the mobile-phase velocity, so that
$$
t_\mathrm{R} = t_\mathrm{M}(1 + k), \qquad k = \frac{t_\mathrm{R} - t_\mathrm{M}}{t_\mathrm{M}} .
$$ {#eq-retention}
:::

::: proof
A solute molecule moves only while it is in the mobile phase, and then at the mobile-phase velocity $u$. At equilibrium, the fraction of the solute in the mobile phase at any instant is $n_\mathrm{M}/(n_\mathrm{M} + n_\mathrm{S}) = 1/(1+k)$. By the ergodic argument — the fraction of molecules in the mobile phase at one instant equals the fraction of time one molecule spends there over a long period — each molecule spends a fraction $1/(1+k)$ of its time moving at $u$, so the band's average velocity is $u/(1+k)$. The column length is $L = ut_\mathrm{M} = [u/(1+k)]\,t_\mathrm{R}$, which gives [[#eq-retention]].
:::

Retention factors between about $1$ and $10$ are the useful range: below $1$ the compound elutes too close to the dead time to be separated from other weakly retained compounds; above $10$–$20$ the analysis is slow and the peaks are broad and low. Selectivity is the chemistry of the separation: $\alpha$ depends on the stationary phase, the mobile phase (in liquid chromatography) and the temperature, and it is $\alpha$, more than anything else, that decides whether two compounds can be separated at all.

## Band broadening and plate height

A band injected as a narrow plug arrives at the detector spread out into a roughly Gaussian peak. The spreading comes from several random processes, each of which adds variance to the band's position. The measure of a column's efficiency is how little it spreads the band in proportion to the distance travelled.

::: definition Plate number and plate height {#def-plates}
For a Gaussian peak of standard deviation $\sigma$ (in time) eluting at $t_\mathrm{R}$, the **plate number** is
$$
N = \left(\frac{t_\mathrm{R}}{\sigma}\right)^2 = 5.545\left(\frac{t_\mathrm{R}}{w_{1/2}}\right)^2 = 16\left(\frac{t_\mathrm{R}}{w_\mathrm{b}}\right)^2,
$$ {#eq-plates}
where $w_{1/2} = 2\sqrt{2\ln2}\,\sigma = 2.355\sigma$ is the width at half height and $w_\mathrm{b} = 4\sigma$ the width at the base (between the intersections of the tangents at the inflection points with the baseline). The **plate height** (height equivalent to a theoretical plate) is $H = L/N$, the column length per plate; in length units, $H = \sigma_L^2/L$, the variance of the band per unit length travelled. A small $H$ means an efficient column.
:::

The language of "plates" comes from the analogy with distillation columns, in which each plate is an equilibrium stage; in chromatography it is just a measure of variance per length, and it is useful because the variances of independent broadening processes add.

::: proposition The van Deemter equation {#prop-van-deemter}
For a packed or open-tubular column, the plate height depends on the linear velocity $u$ of the mobile phase approximately as
$$
H = A + \frac{B}{u} + Cu,
$$ {#eq-van-deemter}
where $A$ describes **multiple paths** (eddy diffusion) through a packed bed ($A \approx 2\lambda d_\mathrm{p}$ for particles of diameter $d_\mathrm{p}$, with $\lambda$ a packing factor of order $1$; $A = 0$ for an open tube), $B = 2\gamma D_\mathrm{M}$ describes **longitudinal diffusion** of the solute in the mobile phase (diffusion coefficient $D_\mathrm{M}$, $\gamma \le 1$ an obstruction factor), and $C$ describes **resistance to mass transfer** between and within the phases, proportional to $d_\mathrm{p}^2/D_\mathrm{M}$ (and to $d_\mathrm{f}^2/D_\mathrm{S}$ for a stationary film of thickness $d_\mathrm{f}$). $H$ has a minimum
$$
H_\mathrm{min} = A + 2\sqrt{BC} \quad\text{at}\quad u_\mathrm{opt} = \sqrt{B/C} .
$$ {#eq-optimum}
:::

::: proof
Each mechanism contributes an independent variance per unit length, so $H = \sum_i H_i$. *Longitudinal diffusion*: while the band is in the column for a time $t = L/u_\mathrm{band}$, solute diffuses along the axis, adding a variance $\sigma_L^2 = 2Dt$ (the Einstein relation for a random walk). The relevant time is that spent in the mobile phase, $L/u$, so $\sigma_L^2 = 2\gamma D_\mathrm{M}L/u$ and $H = \sigma_L^2/L = 2\gamma D_\mathrm{M}/u = B/u$. *Multiple paths*: in a packed bed, molecules follow channels of different length; if each molecule takes $L/d_\mathrm{p}$ random steps of length of order $d_\mathrm{p}$, forward or backward relative to the average, the variance is of order $(L/d_\mathrm{p})d_\mathrm{p}^2 = Ld_\mathrm{p}$, independent of $u$, so $H \approx 2\lambda d_\mathrm{p} = A$. *Mass transfer*: molecules take a finite time to diffuse in and out of the stationary phase or stagnant pores; during that time the mobile phase carries their neighbours ahead by a distance proportional to $u$ times the exchange time ($\propto d^2/D$). A random walk with step length $\ell \propto ud^2/D$ taken at a rate $\propto D/d^2$ for the time spent in the column $\propto L/u$ gives a variance $\propto (L/u)(D/d^2)(ud^2/D)^2 = Lud^2/D$, so $H = Cu$ with $C \propto d^2/D$. Adding the three gives [[#eq-van-deemter]]. Setting $\dd H/\dd u = -B/u^2 + C = 0$ gives $u_\mathrm{opt} = \sqrt{B/C}$, and substituting, $H_\mathrm{min} = A + B\sqrt{C/B} + C\sqrt{B/C} = A + 2\sqrt{BC}$.
:::

::: widget plot
f: A + B/x + C*x; A + 0*x; B/x; C*x
x: 0.05, 5
y: 0, 30
sliders: A=2:0:10:0.1; B=4:0.5:20:0.5; C=2:0.1:10:0.1
labels: H; A \text{ (multiple paths)}; B/u \text{ (longitudinal diffusion)}; Cu \text{ (mass transfer)}
caption: The van Deemter curve [[#eq-van-deemter]]: plate height $H$ (in $\mu\mathrm{m}$) against mobile-phase linear velocity $u$ (in $\mathrm{mm\,s^{-1}}$), with its three terms. The defaults ($A = 2\ \mu\mathrm{m}$, $B = 4\ \mu\mathrm{m\,mm\,s^{-1}}$, $C = 2\ \mu\mathrm{m\,s\,mm^{-1}}$) are typical of a liquid chromatography column packed with $3\ \mu\mathrm{m}$ particles; the minimum is $7.7\ \mu\mathrm{m}$ at $1.4\ \mathrm{mm\,s^{-1}}$. Smaller particles lower $A$ and especially $C$ (which scales with $d_\mathrm{p}^2$), so the minimum falls and the curve flattens on the right — the reason sub-$2\ \mu\mathrm{m}$ particles permit fast separations. In gas chromatography, $D_\mathrm{M}$ is about $10^4$ times larger, so $B$ is much larger and the optimum lies at tens of centimetres per second.
:::

::: example Column efficiency from a chromatogram {#ex-efficiency}
On a $15.0\ \mathrm{cm}$ HPLC column, a peak elutes at $t_\mathrm{R} = 8.25\ \mathrm{min}$ with a width at half height of $0.110\ \mathrm{min}$. Find $N$ and $H$, and compare $H$ with the particle diameter of $3.0\ \mu\mathrm{m}$.
::: solution
From [[#eq-plates]],
$$
N = 5.545\left(\frac{8.25}{0.110}\right)^2 = 5.545\times5625 = 3.12\times10^{4},\qquad H = \frac{L}{N} = \frac{150\ \mathrm{mm}}{3.12\times10^4} = 4.8\ \mu\mathrm{m}.
$$
That is $1.6$ particle diameters. A well-packed column operated near its optimum velocity gives $H \approx 2$–$3\,d_\mathrm{p}$ (a **reduced plate height** $h = H/d_\mathrm{p}$ of $2$–$3$), so this column is performing very well. Measuring at half height is preferred because it is less affected by peak tailing and by the difficulty of drawing tangents.
:::
:::

Not all peaks are Gaussian. **Tailing** (an extended trailing edge) arises from strong adsorption sites — for basic analytes, ionised residual silanol groups on silica — and from overloaded or damaged columns; **fronting** from overloading a column whose isotherm curves the other way. Both degrade resolution and quantification, and the asymmetry factor of a peak is a routine system-suitability check.

## Resolution

Two peaks are separated if the distance between their maxima is large compared with their widths.

::: proposition The resolution equation {#prop-resolution}
The **resolution** of two adjacent peaks is
$$
R_\mathrm{s} = \frac{t_{\mathrm{R}2} - t_{\mathrm{R}1}}{\tfrac12(w_{\mathrm{b}1} + w_{\mathrm{b}2})} .
$$
For two peaks of similar width on a column of $N$ plates it can be written as the **Purnell equation**
$$
R_\mathrm{s} = \frac{\sqrt{N}}{4}\cdot\frac{\alpha - 1}{\alpha}\cdot\frac{k_2}{1 + k_2},
$$ {#eq-purnell}
which separates the three factors that control resolution: efficiency $N$, selectivity $\alpha$ and retention $k$. $R_\mathrm{s} = 1.0$ means about $2\ \%$ overlap of equal Gaussian peaks; $R_\mathrm{s} = 1.5$ ("baseline resolution") leaves about $0.1\ \%$.
:::

::: proof
Take the base width of the second peak as representative of both: $\tfrac12(w_{\mathrm{b}1} + w_{\mathrm{b}2}) \approx w_{\mathrm{b}2} = 4t_{\mathrm{R}2}/\sqrt{N}$ from [[#eq-plates]]. Using [[#eq-retention]], $t_{\mathrm{R}2} - t_{\mathrm{R}1} = t_\mathrm{M}(k_2 - k_1)$ and $t_{\mathrm{R}2} = t_\mathrm{M}(1 + k_2)$. Then
$$
R_\mathrm{s} = \frac{t_\mathrm{M}(k_2 - k_1)}{4t_\mathrm{M}(1+k_2)/\sqrt{N}} = \frac{\sqrt{N}}{4}\cdot\frac{k_2 - k_1}{1 + k_2} = \frac{\sqrt{N}}{4}\cdot\frac{k_2 - k_1}{k_2}\cdot\frac{k_2}{1 + k_2},
$$
and $(k_2 - k_1)/k_2 = 1 - 1/\alpha = (\alpha - 1)/\alpha$. For equal Gaussian peaks $R_\mathrm{s}$ is the separation in units of $4\sigma$; the overlap of the tails beyond the midpoint is $\Phi(-2R_\mathrm{s})$ for each peak, which is $2.3\ \%$ at $R_\mathrm{s} = 1$ and $0.13\ \%$ at $1.5$.
:::

::: widget plot
f: exp(-x^2/2); h*exp(-(x-4*R)^2/2); exp(-x^2/2) + h*exp(-(x-4*R)^2/2)
x: -4, 12
y: 0, 1.6
sliders: R=1:0.25:2.5:0.05; h=1:0.1:1:0.05
labels: \text{peak 1}; \text{peak 2}; \text{detector signal}
caption: Two Gaussian peaks of equal width ($\sigma = 1$ on the horizontal time axis) separated by $4R_\mathrm{s}\sigma$, with the slider setting the resolution $R_\mathrm{s}$ and the relative height $h$ of the second peak. At $R_\mathrm{s} = 0.5$ the signal shows a single lumpy peak; at $1.0$ two maxima with a deep valley; at $1.5$ the signal returns to baseline between them. Shrink the second peak to $h = 0.1$ and see how much more resolution a small peak beside a large one needs before its area can be measured reliably.
:::

The Purnell equation is a recipe for method development. **Efficiency** enters only as $\sqrt{N}$: doubling the column length doubles $N$ (and the analysis time) but raises $R_\mathrm{s}$ only by $\sqrt{2} = 1.41$. **Retention** enters through $k/(1+k)$, which rises steeply from $k = 0$ to about $k = 5$ and then flattens: increasing $k$ beyond about $5$–$10$ buys little resolution and costs time. **Selectivity** is the most powerful lever: going from $\alpha = 1.05$ to $\alpha = 1.10$ nearly doubles $(\alpha-1)/\alpha$, which would take four times the plates to match. A change of stationary phase, of mobile-phase solvent or pH, or of temperature, is therefore usually the first thing to try.

::: example Plates needed for a difficult pair {#ex-plates-needed}
Two isomers have $\alpha = 1.050$ and $k_2 = 5.0$. How many plates are needed for $R_\mathrm{s} = 1.5$? What if a different stationary phase raised $\alpha$ to $1.10$ at the same $k$?
::: solution
Rearranging [[#eq-purnell]],
$$
N = 16R_\mathrm{s}^2\left(\frac{\alpha}{\alpha - 1}\right)^2\left(\frac{1 + k_2}{k_2}\right)^2 = 16\times2.25\times\left(\frac{1.050}{0.050}\right)^2\times\left(\frac{6.0}{5.0}\right)^2 = 16\times2.25\times441\times1.44 = 2.29\times10^4 .
$$
With $\alpha = 1.10$: $(1.10/0.10)^2 = 121$ instead of $441$, so $N = 6.3\times10^3$ — a column a quarter as long, and an analysis a quarter as long. A $15\ \mathrm{cm}$ column like that of [[#ex-efficiency]] (about $3\times10^4$ plates) handles the first case; a $5\ \mathrm{cm}$ column handles the second.
:::
:::

::: example Reading a chromatogram {#ex-chromatogram}
An unretained marker elutes at $1.20\ \mathrm{min}$; two compounds elute at $5.40$ and $5.90\ \mathrm{min}$ with base widths $0.30$ and $0.32\ \mathrm{min}$. Find $k_1$, $k_2$, $\alpha$, $R_\mathrm{s}$ and the plate number from the second peak; then check $R_\mathrm{s}$ with [[#eq-purnell]].
::: solution
From [[#eq-retention]]: $k_1 = (5.40 - 1.20)/1.20 = 3.50$ and $k_2 = (5.90 - 1.20)/1.20 = 3.92$, so $\alpha = 3.92/3.50 = 1.119$. Resolution: $R_\mathrm{s} = 0.50/(\tfrac12\times0.62) = 1.61$. Plates: $N = 16(5.90/0.32)^2 = 5.4\times10^3$. Purnell: $R_\mathrm{s} = (\sqrt{5439}/4)(0.119/1.119)(3.92/4.92) = 18.44\times0.1064\times0.797 = 1.56$, in reasonable agreement with the direct value; the small difference comes from approximating both widths by the second.
:::
:::

## Gas chromatography

In **gas chromatography** (GC) the mobile phase is an inert carrier gas (helium, hydrogen or nitrogen) and the stationary phase is a liquid film or a solid adsorbent. The sample must be volatile and thermally stable — roughly, molar masses below about $500\ \mathrm{g\,mol^{-1}}$ and boiling points below $400$–$450\ ^\circ\mathrm{C}$; polar compounds such as acids, sugars and amino acids are made volatile by **derivatisation** (silylation, methylation, acylation).

Modern GC uses **open-tubular (capillary) columns**: fused-silica tubes $0.1$–$0.53\ \mathrm{mm}$ in internal diameter and $10$–$60\ \mathrm{m}$ long, with a $0.1$–$5\ \mu\mathrm{m}$ film of a cross-linked polysiloxane or poly(ethylene glycol) on the wall. With no packing, $A = 0$ and the pressure drop is small, so columns can be long and $N$ reaches $10^5$ or more. The stationary phase sets selectivity, on the principle "like dissolves like": a non-polar poly(dimethylsiloxane) separates largely by boiling point, while a polar poly(ethylene glycol) ("wax") phase retains alcohols and other hydrogen-bonding compounds strongly. Sample is introduced through a heated **split/splitless injector**: for concentrated samples only a fraction enters the column (split mode); for trace analysis the whole sample is transferred (splitless).

Temperature is the main variable controlling retention in GC, because $\ln K$ varies linearly with $1/T$ (a van 't Hoff relation): retention times typically halve for every $15$–$30\ \mathrm{K}$ rise. For mixtures spanning a range of volatilities, **temperature programming** — raising the column temperature during the run — elutes the volatile compounds at low temperature, where they are well separated, and the heavy ones later without excessive broadening, giving peaks of similar width across the chromatogram.

Retention times depend on column dimensions, flow and temperature, so they are transferred between laboratories as **retention indices**, which place a compound on a scale defined by the $n$-alkanes.

::: definition The Kováts retention index {#def-kovats}
Under isothermal conditions, if a compound's adjusted retention time $t_\mathrm{R}'$ lies between those of the $n$-alkanes with $n$ and $n + 1$ carbon atoms, its **retention index** is
$$
I = 100\left[n + \frac{\log t_\mathrm{R}'(\text{compound}) - \log t_\mathrm{R}'(n)}{\log t_\mathrm{R}'(n+1) - \log t_\mathrm{R}'(n)}\right] .
$$
By definition, the $n$-alkane with $n$ carbon atoms has $I = 100n$ on every stationary phase. The logarithmic interpolation reflects the linear dependence of $\log t_\mathrm{R}'$ on carbon number within a homologous series. (With temperature programming, retention times rather than their logarithms are interpolated linearly.)
:::

::: example A retention index {#ex-kovats}
On a poly(dimethylsiloxane) column at constant temperature, the adjusted retention times are $4.20\ \mathrm{min}$ for $n$-hexane, $7.50\ \mathrm{min}$ for $n$-heptane and $5.90\ \mathrm{min}$ for an unknown. Find the retention index of the unknown.
::: solution
$$
I = 100\left[6 + \frac{\log5.90 - \log4.20}{\log7.50 - \log4.20}\right] = 100\left[6 + \frac{0.1476}{0.2518}\right] = 100\times6.586 = 659 .
$$
Retention indices are reproducible to a few units between laboratories using the same phase, and libraries of indices on standard phases are used alongside mass spectra to identify compounds; a compound whose mass spectrum matches a library entry but whose retention index differs by $50$ units is probably not that compound.
:::
:::

**GC detectors.** The **flame ionisation detector** (FID) burns the column effluent in a hydrogen–air flame; organic compounds produce ions (through $\mathrm{CH}$ radicals and chemi-ionisation) collected as a current roughly proportional to the number of carbon atoms. It is sensitive (picograms of carbon per second), linear over about $10^7$, and responds to almost all organic compounds but not to water, air or carbon dioxide, which makes it the workhorse detector. The **thermal conductivity detector** responds to everything, including permanent gases, but is less sensitive. The **electron-capture detector** (ECD) uses a radioactive $\beta$ source ($^{63}\mathrm{Ni}$) to produce a standing current that is reduced by compounds that capture electrons — halogenated compounds above all — and is used for organochlorine pesticides and polychlorinated biphenyls at femtogram levels. Element-selective detectors respond to nitrogen and phosphorus (NPD) or sulfur. And the **mass spectrometer**, the most informative detector, is the subject of [[analytical-chemistry/hyphenated-methods]].

## High-performance liquid chromatography

In **high-performance liquid chromatography** (HPLC) the mobile phase is a liquid pumped at high pressure through a column packed with small particles, typically porous silica of $1.7$–$5\ \mu\mathrm{m}$ diameter with a chemically bonded stationary phase. HPLC handles what GC cannot: involatile, polar, ionic, thermally labile and large molecules — most pharmaceuticals, biomolecules, dyes and polymers.

The dominant mode is **reversed-phase** chromatography: a non-polar stationary phase (octadecyl, "C18", chains bonded to silica) with a polar mobile phase (water mixed with acetonitrile or methanol). Retention increases with the hydrophobicity of the solute and decreases as the organic fraction of the mobile phase increases; as a rule of thumb, $\log k$ falls roughly linearly with the volume fraction of organic modifier, by about a factor of two to three for every $10\ \%$ increase. The mobile phase is therefore the main variable in HPLC, as temperature is in GC. For ionisable analytes, the pH of the (buffered) mobile phase controls the fraction ionised and hence retention — the $\alpha$ functions of [[analytical-chemistry/equilibria-in-analysis]] at work. **Gradient elution**, in which the organic fraction increases during the run, is the liquid-phase counterpart of temperature programming. Other modes include **normal-phase** chromatography (polar stationary phase, non-polar solvents), **hydrophilic interaction** chromatography (HILIC) for very polar compounds, **ion-exchange** and **ion chromatography** for inorganic ions and amino acids (with a suppressor and conductivity detection), and **size-exclusion** chromatography, which separates polymers and proteins by size and is used to determine molar-mass distributions ([[polymer-chemistry/polymer-characterisation]]).

The trend in HPLC has been to smaller particles. Since $A \propto d_\mathrm{p}$ and $C \propto d_\mathrm{p}^2$, halving $d_\mathrm{p}$ roughly halves $H_\mathrm{min}$ and moves $u_\mathrm{opt}$ to higher velocity, allowing shorter columns and faster runs at the same resolution. The cost is pressure: by Darcy's law the pressure drop across a packed bed is proportional to $uL\eta/d_\mathrm{p}^2$, so sub-$2\ \mu\mathrm{m}$ particles require pumps rated to $100\ \mathrm{MPa}$ or more (**ultra-high-performance** LC, UHPLC). Superficially porous ("core–shell") particles, with a solid core and a thin porous shell, shorten the diffusion path and achieve much of the same gain at lower pressure.

**HPLC detectors.** The **UV–visible absorbance detector**, often a diode array that records a full spectrum every fraction of a second, is the most common; it obeys the Beer–Lambert law of [[analytical-chemistry/molecular-spectrometry]] in a flow cell of about $10\ \mathrm{mm}$ path and a few microlitres volume, and the spectra across a peak test whether it is pure. **Fluorescence** detectors are more sensitive and selective for fluorescent or derivatised analytes. The **refractive-index** detector is universal but insensitive and incompatible with gradients; **evaporative light-scattering** and **charged-aerosol** detectors are near-universal for non-volatile analytes. **Electrochemical** detectors oxidise or reduce analytes at an electrode ([[analytical-chemistry/electroanalytical]]), and the mass spectrometer is again the most powerful.

::: warning Peak area is not amount {#warn-response}
It is tempting to read a chromatogram as a composition: if one peak has twice the area of another, there must be twice as much of that compound. Only for a detector whose response factor is the same for all compounds is that true, and almost none is. A UV detector's response is proportional to $\varepsilon$ at the chosen wavelength, which can differ by orders of magnitude between compounds; an FID responds roughly in proportion to carbon number but much less to carbons bearing oxygen or halogens; an ECD can differ by a factor of a million. Quantification needs calibration with each analyte, preferably with an internal standard ([[analytical-chemistry/statistics-calibration#def-internal-standard]]). Two further cautions: a single symmetric peak is not proof of a single compound (co-elution is common; check with a second column, a different wavelength or a mass spectrum), and area, not height, is the robust measure when peak widths vary.
:::

## From peaks to results

Quantitative chromatography integrates each peak and relates the area to concentration through a calibration. The **external standard** method calibrates with standards injected separately; it relies on reproducible injection volumes, which modern autosamplers deliver (about $0.2$–$0.5\ \%$ relative). The **internal standard** method adds a known amount of a non-interfering compound to every sample and standard and uses area ratios, which cancels variation in injection volume and, if the internal standard is added before sample preparation, losses during extraction. For complex samples, **standard addition** corrects for matrix effects in the detector. A **system-suitability** test before each run — resolution of a critical pair, plate number, peak asymmetry and the repeatability of replicate injections — checks that the column and instrument are fit for the purpose of that day's analysis.

::: quiz
Two peaks are only partly resolved ($R_\mathrm{s} = 0.9$) with $k_2 = 2$ on a reversed-phase column. Which single change is most likely to give baseline resolution efficiently?
- [ ] Double the column length.
- [ ] Increase the flow rate to sharpen the peaks.
- [x] Change the organic modifier (for example from methanol to acetonitrile) or the pH to change $\alpha$.
- [ ] Inject a larger volume so that the peaks are bigger.
::: solution
Doubling the length gives $R_\mathrm{s} = 0.9\times\sqrt{2} = 1.27$: not baseline resolution, and twice the time. Increasing flow beyond the optimum *raises* $H$ through the $Cu$ term and lowers resolution. Larger injections broaden peaks. Changing selectivity — the solvent's hydrogen-bonding and dipolar character differ between methanol and acetonitrile, and pH changes the ionisation of acidic and basic solutes — alters $\alpha$, which [[#eq-purnell]] shows is the most effective lever. (Lowering the solvent strength to increase $k_2$ from $2$ towards $5$ would also help, raising $k/(1+k)$ from $0.67$ to $0.83$.)
:::
:::

## Where this leads

Coupling GC and HPLC to mass spectrometry — and quantification with isotope-labelled internal standards — is the subject of [[analytical-chemistry/hyphenated-methods]]. Preparative and flash column chromatography for purification are in [[laboratory-methods/separation-purification]]. Size-exclusion chromatography of polymers is treated in [[polymer-chemistry/polymer-characterisation]], and the GC and LC analysis of pollutants in [[environmental-chemistry/environmental-monitoring]]. The thermodynamics of partition that underlies $K$ is that of [[thermodynamics/mixtures]].

::: history
Mikhail Tsvet separated plant pigments on columns of calcium carbonate and named the method chromatography in papers of 1906. Archer Martin and Richard Synge introduced partition chromatography and the plate theory in 1941 (Nobel Prize 1952), and in the same paper suggested that the mobile phase could be a gas; Anthony James and Martin realised gas–liquid chromatography in 1952. J. J. van Deemter, F. J. Zuiderweg and A. Klinkenberg published their plate-height equation in 1956. Marcel Golay introduced open-tubular columns in 1957, and Raymond Dandeneau and Ernest Zerenner of Hewlett-Packard the flexible fused-silica capillary column in 1979. Ervin Kováts proposed his retention index in 1958. James Lovelock invented the electron-capture detector in the late 1950s. High-performance liquid chromatography grew from the work of Csaba Horváth, J. F. K. Huber, J. J. Kirkland and others in the late 1960s, and Hamish Small and co-workers introduced ion chromatography with conductimetric detection in 1975.
:::

::: summary
- Retention: $t_\mathrm{R} = t_\mathrm{M}(1+k)$ with retention factor $k = K/\beta$; selectivity $\alpha = k_2/k_1$; useful $k$ values lie between about $1$ and $10$.
- Efficiency: $N = (t_\mathrm{R}/\sigma)^2 = 5.545(t_\mathrm{R}/w_{1/2})^2$, $H = L/N$; good packed columns give $H \approx 2$–$3\,d_\mathrm{p}$.
- The van Deemter equation $H = A + B/u + Cu$ adds the variances of multiple paths, longitudinal diffusion and mass transfer; $H_\mathrm{min} = A + 2\sqrt{BC}$ at $u_\mathrm{opt} = \sqrt{B/C}$.
- Resolution $R_\mathrm{s} = (\sqrt{N}/4)[(\alpha-1)/\alpha][k_2/(1+k_2)]$: efficiency enters as a square root, so selectivity is the strongest lever; $R_\mathrm{s} = 1.5$ is baseline resolution.
- GC separates volatile compounds on capillary columns; temperature controls retention, retention indices transfer identifications, and FID, ECD and MS are the main detectors.
- Reversed-phase HPLC separates by hydrophobicity, with mobile-phase composition and pH as the main variables; smaller particles give faster separations at higher pressure.
- Quantification needs calibration for each analyte — detector response factors differ — ideally with an internal standard and a system-suitability check.
:::

## Exercises

::: exercise Retention factor {level=1 check="8.0"}
A compound elutes at $12.6\ \mathrm{min}$ on a column with a dead time of $1.40\ \mathrm{min}$. Find $k$, and the fraction of its time the compound spends in the mobile phase. (Enter $k$.)
::: solution
$k = (12.6 - 1.40)/1.40 = 8.0$. The fraction of time in the mobile phase is $1/(1 + k) = 0.11$. A $k$ of $8$ is at the upper end of the useful range; a slightly stronger mobile phase would shorten the analysis.
:::
:::

::: exercise Plate number from base width {level=1 check="9800"}
A peak at $t_\mathrm{R} = 10.40\ \mathrm{min}$ has a base width of $0.42\ \mathrm{min}$. Find $N$. (Enter $N$ to two significant figures.)
::: solution
$N = 16(10.40/0.42)^2 = 16\times613.2 = 9.8\times10^3$. Base widths are harder to measure precisely than half-height widths, which is why the second form of [[#eq-plates]] is preferred.
:::
:::

::: exercise Resolution of a pair {level=1 check="1.34"}
Peaks at $9.85$ and $10.40\ \mathrm{min}$ have base widths $0.40$ and $0.42\ \mathrm{min}$. Find $R_\mathrm{s}$. Is the pair baseline-resolved? (Enter $R_\mathrm{s}$.)
::: solution
$R_\mathrm{s} = 0.55/(\tfrac12\times0.82) = 1.34$. Not quite baseline resolution ($1.5$); for peaks of similar size the overlap is under $1\ \%$, but for a small peak beside a large one the area of the small peak would be unreliable.
:::
:::

::: exercise A Kováts index {level=2 check="659"}
Verify the calculation of [[#ex-kovats]], and predict the adjusted retention time of a compound with $I = 680$ on the same column. (Enter the index of the unknown in [[#ex-kovats]].)
::: solution
$I = 100[6 + (\log5.90 - \log4.20)/(\log7.50 - \log4.20)] = 100[6 + 0.14760/0.25181] = 658.6$, i.e. $659$. For $I = 680$: $\log t_\mathrm{R}' = \log4.20 + 0.80\times0.25181 = 0.62325 + 0.20145 = 0.82470$, so $t_\mathrm{R}' = 6.68\ \mathrm{min}$.
:::
:::

::: exercise The cost of a longer column {level=2 check="1.41"}
A separation gives $R_\mathrm{s} = 1.00$ in $12\ \mathrm{min}$. If the column length is doubled at the same linear velocity, what resolution is obtained and how long does the run take? (Enter the new $R_\mathrm{s}$.)
::: solution
$N$ doubles and $R_\mathrm{s} \propto \sqrt{N}$, so $R_\mathrm{s} = 1.41$; retention times double, so the run takes $24\ \mathrm{min}$ — and the column back-pressure doubles too. Doubling the length is the expensive way to gain resolution.
:::
:::

::: exercise Optimum flow from van Deemter coefficients {level=2 check="2.0"}
A column has $A = 1.5\ \mu\mathrm{m}$, $B = 6.0\ \mu\mathrm{m\,mm\,s^{-1}}$ and $C = 1.5\ \mu\mathrm{m\,s\,mm^{-1}}$. Find $u_\mathrm{opt}$ and $H_\mathrm{min}$. (Enter $u_\mathrm{opt}$ in $\mathrm{mm\,s^{-1}}$.)
::: solution
From [[#eq-optimum]], $u_\mathrm{opt} = \sqrt{6.0/1.5} = 2.0\ \mathrm{mm\,s^{-1}}$ and $H_\mathrm{min} = 1.5 + 2\sqrt{6.0\times1.5} = 1.5 + 6.0 = 7.5\ \mu\mathrm{m}$. Running at twice the optimum velocity gives $H = 1.5 + 1.5 + 6.0 = 9.0\ \mu\mathrm{m}$, only $20\ \%$ worse, for half the analysis time — which is why columns are often run somewhat above $u_\mathrm{opt}$, especially with small particles whose curves are flat on the high-velocity side.
:::
:::

::: exercise An internal-standard calibration {level=2 check="3.08"}
A standard containing $2.00\ \mathrm{mg\,dm^{-3}}$ of analyte and $1.00\ \mathrm{mg\,dm^{-3}}$ of internal standard gives an area ratio (analyte/IS) of $1.20$. A sample spiked to $1.00\ \mathrm{mg\,dm^{-3}}$ of IS gives an area ratio of $1.85$. Find the analyte concentration. (Enter it in $\mathrm{mg\,dm^{-3}}$.)
::: solution
Response factor $F = (1.20/2.00)/(1.00/1.00) = 0.600$. Then $[\mathrm{X}] = 1.85\times1.00/0.600 = 3.08\ \mathrm{mg\,dm^{-3}}$. The result lies above the single standard, so a multi-point calibration spanning it would be better practice.
:::
:::

::: exercise Plates for a target resolution {level=3 check="13800"}
Derive [[#eq-purnell]] from the definitions, and use it to find the number of plates needed to separate a pair with $\alpha = 1.10$ and $k_2 = 3.0$ with $R_\mathrm{s} = 2.0$ (a margin for real samples). (Enter $N$ to three significant figures.)
::: hint
Rearrange to $N = 16R_\mathrm{s}^2[\alpha/(\alpha-1)]^2[(1+k_2)/k_2]^2$.
:::
::: solution
The derivation is the proof of [[#prop-resolution]]. Then $N = 16\times4.0\times(1.10/0.10)^2\times(4.0/3.0)^2 = 64\times121\times1.778 = 1.38\times10^4$. A $10\ \mathrm{cm}$ column of $3\ \mu\mathrm{m}$ particles at $H = 7\ \mu\mathrm{m}$ gives about $1.4\times10^4$ plates — just enough.
:::
:::

::: exercise Smaller particles {level=3 check="1.70"}
A method uses a $15\ \mathrm{cm}$ column of $5\ \mu\mathrm{m}$ particles and gives $R_\mathrm{s} = 1.20$ for the critical pair at the optimum velocity. Assuming the reduced plate height $h = H/d_\mathrm{p}$ at the optimum is the same for all particle sizes, what resolution does a $15\ \mathrm{cm}$ column of $2.5\ \mu\mathrm{m}$ particles give, and by what factor does the pressure rise if it is run at its own optimum velocity (which scales as $1/d_\mathrm{p}$)? (Enter the new $R_\mathrm{s}$.)
::: hint
$N = L/(hd_\mathrm{p})$; pressure $\propto uL\eta/d_\mathrm{p}^2$.
:::
::: solution
Halving $d_\mathrm{p}$ at constant $h$ halves $H$ and doubles $N$, so $R_\mathrm{s} = 1.20\times\sqrt{2} = 1.70$ — baseline resolution. The optimum velocity doubles (it scales as $D_\mathrm{M}/d_\mathrm{p}$), which halves the analysis time; and the pressure, $\propto u/d_\mathrm{p}^2$, rises by $2\times4 = 8$. A method running at $25\ \mathrm{MPa}$ would need $200\ \mathrm{MPa}$, beyond many UHPLC pumps; in practice one shortens the column instead, trading some of the resolution gain for a large saving in time and pressure.
:::
:::
