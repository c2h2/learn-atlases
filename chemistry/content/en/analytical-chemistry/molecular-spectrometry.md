Add a few drops of 1,10-phenanthroline to water containing a trace of iron(II), and an orange-red colour develops whose depth is proportional to the amount of iron: a solution containing $2\ \mathrm{mg\,dm^{-3}}$ of iron is a clear pale orange, and one containing $0.2\ \mathrm{mg\,dm^{-3}}$ is barely tinted to the eye but easily measured by a spectrophotometer. Measuring how much light a coloured (or ultraviolet-absorbing) solution absorbs is the oldest instrumental method of quantitative analysis and still among the most used: in clinical analysers, which run hundreds of enzymatic and colorimetric assays an hour; in water laboratories, for nitrate, phosphate and ammonia; in biochemistry, where every protein and nucleic-acid concentration starts with an absorbance at $280$ or $260\ \mathrm{nm}$; and as the commonest detector in liquid chromatography.

This chapter develops **quantitative molecular absorption spectrometry** in the ultraviolet and visible regions and its more sensitive relative, **molecular fluorescence**. We derive the Beer–Lambert law and the conditions under which it holds, explain what is inside a spectrometer and how its imperfections — finite bandwidth, stray light, noise — bend calibration lines and set the best range of absorbance, analyse mixtures by measuring at several wavelengths, and treat the fluorescence signal, its linear range and quenching. The electronic transitions that give rise to the spectra (π → π*, n → π*, charge-transfer and d–d bands) are explained in [[spectroscopy/electronic-spectroscopy]]; here we treat absorbance as a measurement, with the calibration statistics of [[analytical-chemistry/statistics-calibration]].

## The Beer–Lambert law

A beam of monochromatic radiation of radiant power $P_0$ enters a sample; a power $P$ emerges. Some of the photons have been absorbed by molecules of the analyte, which are promoted to excited electronic states and then (usually) lose the energy as heat.

::: definition Transmittance, absorbance and molar absorption coefficient {#def-absorbance}
The **transmittance** of a sample is $T = P/P_0$, and its **absorbance** is
$$
A = -\log_{10}T = \log_{10}\frac{P_0}{P} .
$$
In practice $P_0$ is the power transmitted by a **reference** (a cell containing the solvent and reagents but no analyte), so that losses by reflection at the cell windows and absorption by the solvent cancel. For a single absorbing species of amount concentration $c$ in a path length $b$, the **molar absorption coefficient** (formerly "molar absorptivity" or "extinction coefficient") is $\varepsilon = A/(bc)$, usually quoted in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$. It depends on the species, the wavelength, the solvent and temperature.
:::

::: proposition The Beer–Lambert law {#prop-beer-lambert}
For monochromatic radiation passing through a homogeneous, non-scattering solution in which the absorbing molecules act independently,
$$
A = \varepsilon\,b\,c ,
$$ {#eq-beer}
and for a mixture of non-interacting absorbers $A = b\sum_i\varepsilon_ic_i$: absorbances are additive.
:::

::: proof
Consider a thin slice of the solution of thickness $\dd x$ at depth $x$. Each absorbing molecule presents an effective cross-section $\sigma$ (an area) to the beam, and the number of molecules per unit area of the slice is $N_\mathrm{A}c\,\dd x$ (with $c$ in amount per volume). The fraction of the beam's photons absorbed in the slice is the fraction of its area blocked, $\sigma N_\mathrm{A}c\,\dd x$, provided the molecules do not shadow one another (dilute solution) and each absorbs independently. Hence
$$
\frac{\dd P}{P} = -\sigma N_\mathrm{A}c\,\dd x .
$$
Integrating from $x = 0$ ($P = P_0$) to $x = b$,
$$
\ln\frac{P}{P_0} = -\sigma N_\mathrm{A}c\,b, \qquad A = \log_{10}\frac{P_0}{P} = \frac{\sigma N_\mathrm{A}}{\ln10}\,bc = \varepsilon bc,
$$
with $\varepsilon = \sigma N_\mathrm{A}/\ln10$. For several species the blocked fractions add, so the exponents add. The assumptions — a single wavelength (one value of $\sigma$), no scattering, independent molecules, and a concentration that does not change the species present — are exactly the conditions whose failure causes the deviations discussed below.
:::

The cross-section interpretation gives a feel for the numbers. Strongly allowed π → π* bands of dyes have $\varepsilon \approx 10^4$–$10^5\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$, corresponding to $\sigma \approx 10^{-16}\ \mathrm{cm^2}$, close to the geometric size of the chromophore: such a molecule absorbs almost every photon that "hits" it. Forbidden transitions such as the d–d bands of hydrated transition-metal ions have $\varepsilon$ of $1$–$100$, and the n → π* band of a ketone about $10$–$30$. For quantitative trace work one therefore converts the analyte into an intensely absorbing complex or dye — iron(II) with 1,10-phenanthroline ($\varepsilon = 1.11\times10^{4}$ at $510\ \mathrm{nm}$), phosphate as molybdenum blue, nitrite as an azo dye (the Griess reaction), ammonia as indophenol blue.

::: example Iron by 1,10-phenanthroline {#ex-iron-phen}
$10.00\ \mathrm{cm^3}$ of a well water is treated with hydroxylamine (to reduce all iron to $\mathrm{Fe^{2+}}$), buffered, and mixed with 1,10-phenanthroline, then diluted to $100.0\ \mathrm{cm^3}$. In a $1.00\ \mathrm{cm}$ cell at $510\ \mathrm{nm}$, its absorbance against a reagent blank is $0.456$. Taking $\varepsilon = 1.11\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ for the tris(phenanthroline)iron(II) complex, find the iron concentration in the well water in $\mathrm{mg\,dm^{-3}}$.
::: solution
In the measured solution, from [[#eq-beer]],
$$
c = \frac{A}{\varepsilon b} = \frac{0.456}{1.11\times10^{4}\times1.00} = 4.11\times10^{-5}\ \mathrm{mol\,dm^{-3}} .
$$
The water was diluted tenfold, so it contained $4.11\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, i.e. $4.11\times10^{-4}\times55.845\times10^3 = 22.9\ \mathrm{mg\,dm^{-3}}$ of iron — a very iron-rich water. In routine work one would not rely on a literature $\varepsilon$: the slope of a calibration line measured on the same instrument under the same conditions replaces it, automatically allowing for the bandwidth and the reagent blank.
:::
:::

## Inside a spectrometer

A UV–visible spectrometer has four parts.

- **Source.** A deuterium lamp ($190$–$350\ \mathrm{nm}$) and a tungsten–halogen lamp ($350$–$1100\ \mathrm{nm}$), or a xenon flash lamp covering both.
- **Wavelength selector.** A **monochromator** (entrance slit, a diffraction grating that disperses the radiation by wavelength, exit slit) passes a narrow band of wavelengths. Its **spectral bandwidth** — the width at half height of the band transmitted, typically $0.5$–$2\ \mathrm{nm}$ — is set by the slit width and the dispersion of the grating. Simple photometers use filters instead, with bandwidths of $10$–$40\ \mathrm{nm}$.
- **Sample compartment.** Cuvettes of quartz (fused silica) for the UV, glass or plastic for the visible, usually with $1.000\ \mathrm{cm}$ path length.
- **Detector.** A photomultiplier tube (very sensitive, single channel), a silicon photodiode, or a **diode array** or CCD that records all wavelengths at once after dispersing the beam *behind* the sample.

In a **single-beam** instrument the reference and sample are measured one after the other, and drift of the source or detector between the two readings is an error. A **double-beam** instrument splits the beam with a rotating mirror (chopper) and measures reference and sample alternately many times a second, cancelling drift. **Diode-array** instruments record a whole spectrum in a fraction of a second, which makes them ideal as detectors for liquid chromatography and for kinetic measurements; their resolution is set by the number and spacing of the diodes.

## Deviations from the Beer–Lambert law

A calibration line of absorbance against concentration often bends at high absorbance. The bend is rarely a failure of [[#prop-beer-lambert]] itself; it is a failure of one of its assumptions.

**Chemical deviations.** If the analyte takes part in an equilibrium whose position depends on concentration, the species present change as $c$ changes. Dichromate in unbuffered solution, $\mathrm{Cr_2O_7^{2-}} + \mathrm{H_2O} \rightleftharpoons 2\,\mathrm{HCrO_4^-}$, shifts to the right on dilution, and the two ions have different spectra. Weak-acid indicators change their acid/base ratio as the total concentration changes unless the pH is buffered. The cure is chemical: buffer the pH, add excess reagent so that complex formation is complete, or measure at an **isosbestic point** — a wavelength at which two interconverting species have the same $\varepsilon$, so the absorbance depends only on their total.

**Real deviations.** At high concentration ($\gtrsim 0.01\ \mathrm{mol\,dm^{-3}}$) the molecules are close enough to perturb one another's charge distributions, and the refractive index of the solution changes; $\varepsilon$ then depends on $c$. These are genuine limits of the law, but they rarely matter in trace analysis.

**Instrumental deviations** are the most common. Two dominate.

::: proposition Effects of polychromatic radiation and stray light {#prop-deviations}
1. **Polychromatic radiation.** If the beam contains two wavelengths of equal power $P_0/2$ at which the analyte has molar absorption coefficients $\varepsilon_1 \ne \varepsilon_2$, the measured absorbance is
$$
A_\mathrm{app} = -\log_{10}\frac{10^{-\varepsilon_1bc} + 10^{-\varepsilon_2bc}}{2},
$$ {#eq-polychromatic}
which is always less than the average $\tfrac12(\varepsilon_1 + \varepsilon_2)bc$ and bends further below it as $c$ increases (a **negative deviation**).
2. **Stray light.** If a fraction $s$ of the reference power reaches the detector without passing through the sample (or at a wavelength the sample does not absorb), the measured absorbance of a sample of true absorbance $A$ is
$$
A_\mathrm{app} = -\log_{10}\frac{10^{-A} + s}{1 + s},
$$ {#eq-stray}
which approaches the ceiling $\log_{10}[(1+s)/s]$ as $A\to\infty$.
:::

::: proof
(1) The detector measures total power. The transmitted powers at the two wavelengths are $\tfrac12P_0\,10^{-\varepsilon_1bc}$ and $\tfrac12P_0\,10^{-\varepsilon_2bc}$, so $P/P_0 = \tfrac12(10^{-\varepsilon_1bc} + 10^{-\varepsilon_2bc})$, which gives [[#eq-polychromatic]]. Because $10^{-x}$ is a convex function, the mean of $10^{-x_1}$ and $10^{-x_2}$ is at least $10^{-(x_1+x_2)/2}$ (Jensen's inequality), with equality only when $x_1 = x_2$; taking $-\log_{10}$ reverses the inequality, so $A_\mathrm{app} \le \tfrac12(x_1 + x_2)$. The gap grows with $\lvert x_1 - x_2\rvert = \lvert\varepsilon_1 - \varepsilon_2\rvert bc$, i.e. with concentration.

(2) With stray power $sP_0$ added to both readings, the reference reads $P_0(1 + s)$ and the sample reads $P_0(10^{-A} + s)$. Their ratio gives [[#eq-stray]]. As $A\to\infty$, $10^{-A}\to0$ and $A_\mathrm{app}\to\log_{10}[(1+s)/s]$.
:::

::: widget plot
f: -log10((10^(-x) + s)/(1 + s)); x
x: 0, 4
y: 0, 4
sliders: s=0.001:0:0.02:0.0005
labels: A_\mathrm{app}; \text{ideal } A_\mathrm{app} = A
caption: Apparent absorbance against true absorbance $A$ ($x$) for a stray-light fraction $s$ set by the slider, from [[#eq-stray]]. With $s = 0.1\ \%$ (a good instrument), the curve departs visibly from the ideal line above $A \approx 2$ and levels off near $\log_{10}1001 = 3.0$; with $s = 1\ \%$ (a cheap filter photometer, or a good instrument working near the end of its range, where the source is weak) the ceiling falls to $2.0$ and readings above $A \approx 1$ are already low. Set $s = 0$ to recover the straight line: stray light, not the Beer–Lambert law, sets the upper end of most calibrations.
:::

::: example How much does stray light cost? {#ex-stray}
A spectrophotometer has $0.10\ \%$ stray light at the working wavelength. What absorbance does it display for samples of true absorbance $1.00$, $2.00$ and $3.00$?
::: solution
From [[#eq-stray]] with $s = 0.0010$:
$$
\begin{aligned}
A = 1.00:&\quad A_\mathrm{app} = -\log_{10}\frac{0.1000 + 0.0010}{1.0010} = 0.996, \\
A = 2.00:&\quad A_\mathrm{app} = -\log_{10}\frac{0.0100 + 0.0010}{1.0010} = 1.959, \\
A = 3.00:&\quad A_\mathrm{app} = -\log_{10}\frac{0.0010 + 0.0010}{1.0010} = 2.699 .
\end{aligned}
$$
The errors are $-0.4\ \%$, $-2.0\ \%$ and $-10\ \%$. At $A = 3$ only $0.1\ \%$ of the light gets through the sample — the same amount as the stray light — so the instrument cannot distinguish them. Calibrations should therefore stay below $A \approx 1.5$, and concentrated samples should be diluted rather than read high on a bent line.
:::
:::

The polychromatic deviation explains why measurements are made at an absorption **maximum**, where $\varepsilon$ changes little across the spectral bandwidth, and never on the steep side of a band. A rule of thumb is that the spectral bandwidth should be less than about a tenth of the width of the absorption band; for the broad bands of solutions in the visible ($\sim 50$–$100\ \mathrm{nm}$ wide), a $2\ \mathrm{nm}$ bandwidth is ample.

::: widget plot
f: -log10((10^(-x) + 10^(-r*x))/2); (1+r)*x/2
x: 0, 3
y: 0, 3
sliders: r=0.5:0.1:1:0.05
labels: A_\mathrm{app}; \text{expected } \tfrac12(\varepsilon_1+\varepsilon_2)bc
caption: Apparent absorbance for radiation of two wavelengths of equal power, from [[#eq-polychromatic]], against $x = \varepsilon_1bc$ (proportional to concentration); the slider sets the ratio $r = \varepsilon_2/\varepsilon_1$. The dashed comparison line is the straight calibration we would expect. With $r = 0.5$ the error is $-2\ \%$ at $x = 0.2$, $-9\ \%$ at $x = 1$ and $-16\ \%$ at $x = 2$. Slide $r$ to $1$ (measurement at a flat absorption maximum) and the curves coincide.
:::

### The best range of absorbance

Where on the calibration line is a measurement most precise? If the dominant noise is a constant uncertainty $\sigma_T$ in the transmittance reading (as for a thermal detector or a meter of fixed resolution), then very low absorbances are imprecise because $P$ and $P_0$ are nearly equal and their small difference is noisy, and very high absorbances are imprecise because $P$ is tiny.

::: proposition Relative concentration error for constant transmittance noise {#prop-photometric-error}
If the only error is a constant standard deviation $\sigma_T$ in $T$, the relative standard deviation of the concentration found from the Beer–Lambert law is
$$
\frac{\sigma_c}{c} = \frac{0.4343\,\sigma_T}{T\,\lvert\log_{10}T\rvert} = \frac{0.4343\,\sigma_T}{A\,10^{-A}},
$$ {#eq-photometric-error}
which is smallest at $A = 0.4343$ ($T = 36.8\ \%$).
:::

::: proof
From $c = -\log_{10}T/(\varepsilon b) = -\ln T/(\varepsilon b\ln10)$, $\dd c/\dd T = -1/(\varepsilon bT\ln10)$. Propagating a standard deviation $\sigma_T$,
$$
\frac{\sigma_c}{c} = \frac{\lvert\dd c/\dd T\rvert\,\sigma_T}{c} = \frac{\sigma_T/(\varepsilon bT\ln10)}{\lvert\ln T\rvert/(\varepsilon b\ln10)} = \frac{\sigma_T}{T\lvert\ln T\rvert} = \frac{0.4343\,\sigma_T}{T\lvert\log_{10}T\rvert} .
$$
To minimise, maximise $g(T) = -T\ln T$: $g'(T) = -\ln T - 1 = 0$ gives $T = e^{-1} = 0.368$, i.e. $A = \log_{10}e = 0.4343$.
:::

::: widget plot
f: 100*0.4343*sT/(x*10^(-x))
x: 0.02, 2.5
y: 0, 10
sliders: sT=0.005:0.001:0.02:0.001
labels: \sigma_c/c \ (\%)
caption: The relative standard deviation of concentration (in per cent) against absorbance $x$, from [[#eq-photometric-error]], for a constant transmittance noise $\sigma_T$ set by the slider (default $0.005$, i.e. $0.5\ \%T$). The minimum, $1.36\ \%$ for the default, lies at $A = 0.434$, and the error stays within a factor of two of it from about $A = 0.1$ to $A = 1.2$. Modern photomultiplier and photodiode instruments are limited more by photon (shot) noise, for which the optimum moves to higher absorbance (about $A = 0.87$) and the curve is flatter; either way, readings below $0.1$ and above $1.5$–$2$ are poor.
:::

## Analysis of mixtures

Because absorbances add, a mixture of $n$ absorbers can be analysed by measuring at $n$ (or more) wavelengths. For two components X and Y measured at $\lambda_1$ and $\lambda_2$ in the same cell,
$$
\begin{aligned}
A_1 &= \varepsilon_{\mathrm{X},1}bc_\mathrm{X} + \varepsilon_{\mathrm{Y},1}bc_\mathrm{Y},\\
A_2 &= \varepsilon_{\mathrm{X},2}bc_\mathrm{X} + \varepsilon_{\mathrm{Y},2}bc_\mathrm{Y},
\end{aligned}
$$ {#eq-mixture}
two linear equations in the two unknown concentrations. The determination is well conditioned when each component dominates at one of the wavelengths, so that the matrix of $\varepsilon$ values is far from singular. Modern practice measures the whole spectrum and fits it, by least squares, as a linear combination of the spectra of the pure components; this uses all the data and reveals, through the residuals, an unexpected component.

::: example A two-component mixture {#ex-mixture}
Two dyes X and Y have (in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$) $\varepsilon_{\mathrm{X}} = 1.20\times10^4$ and $\varepsilon_\mathrm{Y} = 2.0\times10^3$ at $\lambda_1$, and $\varepsilon_\mathrm{X} = 1.5\times10^3$ and $\varepsilon_\mathrm{Y} = 9.0\times10^3$ at $\lambda_2$. A mixture in a $1.00\ \mathrm{cm}$ cell gives $A_1 = 0.580$ and $A_2 = 0.470$. Find $c_\mathrm{X}$ and $c_\mathrm{Y}$.
::: solution
The equations [[#eq-mixture]] are
$$
\begin{aligned}
12\,000\,c_\mathrm{X} + 2\,000\,c_\mathrm{Y} &= 0.580,\\
1\,500\,c_\mathrm{X} + 9\,000\,c_\mathrm{Y} &= 0.470 .
\end{aligned}
$$
By Cramer's rule, the determinant is $12\,000\times9\,000 - 2\,000\times1\,500 = 1.050\times10^8$, and
$$
c_\mathrm{X} = \frac{0.580\times9\,000 - 2\,000\times0.470}{1.050\times10^8} = \frac{4\,280}{1.050\times10^8} = 4.08\times10^{-5}, \qquad c_\mathrm{Y} = \frac{12\,000\times0.470 - 1\,500\times0.580}{1.050\times10^8} = 4.54\times10^{-5}
$$
(both in $\mathrm{mol\,dm^{-3}}$). Check: $A_1 = 12\,000\times4.08\times10^{-5} + 2\,000\times4.54\times10^{-5} = 0.580$. If the two spectra were similar, the determinant would be small and small errors in the absorbances would produce large errors in the concentrations.
:::
:::

Absorbance is also used to follow titrations (a **spectrophotometric titration**, in which absorbance against volume gives two straight lines meeting at the end point) and to find the stoichiometry of complexes by the **method of continuous variation** (Job's method): solutions with a constant total concentration of metal and ligand but varying mole fraction are measured, and the absorbance of the complex peaks at the mole fraction corresponding to its formula.

::: warning Absorbance is not a property of the compound alone {#warn-absorbance}
It is common to treat a literature value of $\varepsilon$ as a constant of nature and to compute concentrations from a single reading. But $\varepsilon$ depends on wavelength, bandwidth, solvent, pH, temperature and (for complexes) the completeness of complex formation, and the *measured* absorbance also includes the blank and any stray light. A value of $\varepsilon$ from a table is a guide to sensitivity, not a calibration. Equally, a high absorbance is not a good absorbance: values above about $1.5$ are distorted by stray light, and a "linear" calibration that extends to $A = 2.5$ has almost always been fitted through a curve. Dilute the sample instead. And the reagent blank is not optional: many chromogenic reagents absorb a little at the analytical wavelength themselves.
:::

## Molecular fluorescence

A molecule excited by absorption of a photon can return to the ground state by several routes. After rapid vibrational relaxation to the lowest vibrational level of the first excited singlet state $\mathrm{S_1}$ (within picoseconds), it may emit a photon (**fluorescence**, lifetime typically nanoseconds), lose the energy as heat (**internal conversion**), or cross to a triplet state (**intersystem crossing**), from which slow emission is **phosphorescence**. Because the emitting level lies below the absorbing one, fluorescence occurs at longer wavelengths than the excitation (the **Stokes shift**). The fraction of absorbed photons that are re-emitted as fluorescence is the **fluorescence quantum yield** $\Phi_\mathrm{F}$.

Fluorescence is measured at right angles to the exciting beam, against a dark background. That is its great advantage over absorption: absorption spectrometry must detect a small difference between two large signals ($P_0$ and $P$), whereas fluorescence detects a small signal against nearly zero. Fluorescence methods are commonly $10^2$ to $10^4$ times more sensitive than absorption methods for the same compound, and they are also more selective, since both the excitation and the emission wavelength can be chosen.

::: proposition The fluorescence signal {#prop-fluorescence}
For excitation by monochromatic radiation of power $P_0$ in a dilute solution, the fluorescence power reaching the detector is
$$
F = k\,\Phi_\mathrm{F}\,P_0\left(1 - 10^{-\varepsilon bc}\right) \approx 2.303\,k\,\Phi_\mathrm{F}\,P_0\,\varepsilon bc \quad (\varepsilon bc \lesssim 0.05),
$$ {#eq-fluorescence}
where $k$ is the fraction of emitted photons collected (geometry, detector efficiency). Fluorescence is proportional to concentration only at low absorbance, and proportional to the excitation power.
:::

::: proof
The power absorbed is $P_0 - P = P_0(1 - 10^{-\varepsilon bc})$ from [[#eq-beer]]. A fraction $\Phi_\mathrm{F}$ of the absorbed photons is re-emitted (assuming the excitation and emission photons are counted on the same scale, or absorbing $k$ into units), and a fraction $k$ of these reaches the detector. For small $x = \varepsilon bc$, $10^{-x} = e^{-x\ln10} \approx 1 - x\ln10$, so $1 - 10^{-x} \approx 2.303x$, the linear form. The relative error of the linear form is about $1.15x$ for small $x$ (from the next term of the series), which reaches $5\ \%$ at $x \approx 0.045$.
:::

Above that small absorbance the signal falls below linearity, and at high concentrations it actually *decreases*: most of the exciting light is absorbed near the front window and never reaches the region viewed by the detector, and emitted light is reabsorbed if the absorption and emission bands overlap. These are **inner-filter effects**, and they make fluorescence calibrations useful only over the low-concentration range — which is where fluorescence is wanted anyway.

Fluorescence is also diminished by **quenching**: collision of the excited molecule with a quencher (dissolved oxygen, halide ions, heavy-atom compounds) removes its energy without emission.

::: proposition The Stern–Volmer equation {#prop-stern-volmer}
If a quencher Q deactivates the excited state by collision with rate constant $k_\mathrm{q}$, in competition with the unquenched decay of lifetime $\tau_0$, then
$$
\frac{F_0}{F} = 1 + K_\mathrm{SV}[\mathrm{Q}], \qquad K_\mathrm{SV} = k_\mathrm{q}\tau_0,
$$ {#eq-stern-volmer}
where $F_0$ and $F$ are the fluorescence intensities without and with the quencher.
:::

::: proof
Let the excited state $\mathrm{M^*}$ be formed at a constant rate $I_\mathrm{a}$ and decay by first-order processes with total rate constant $k_0 = 1/\tau_0$ (radiative rate $k_\mathrm{r}$ plus non-radiative), and by quenching at rate $k_\mathrm{q}[\mathrm{Q}][\mathrm{M^*}]$. In the steady state, $[\mathrm{M^*}] = I_\mathrm{a}/(k_0 + k_\mathrm{q}[\mathrm{Q}])$. The fluorescence intensity is $k_\mathrm{r}[\mathrm{M^*}]$, so
$$
\frac{F_0}{F} = \frac{k_0 + k_\mathrm{q}[\mathrm{Q}]}{k_0} = 1 + k_\mathrm{q}\tau_0[\mathrm{Q}] .
$$
The steady-state treatment is that of [[kinetics/photochemistry]].
:::

::: example A Stern–Volmer plot {#ex-stern-volmer}
The fluorescence of quinine in dilute sulfuric acid is measured with added chloride, giving the illustrative data $F_0/F = 1.00$, $1.21$, $1.42$, $1.62$ and $1.85$ at $[\mathrm{Cl^-}] = 0$, $0.010$, $0.020$, $0.030$ and $0.040\ \mathrm{mol\,dm^{-3}}$. Find $K_\mathrm{SV}$, and $k_\mathrm{q}$ if $\tau_0 = 19\ \mathrm{ns}$ (about the lifetime measured for quinine in dilute acid). What does this imply for the analysis of quinine in tonic water?
::: solution
A least-squares line of $F_0/F$ against $[\mathrm{Cl^-}]$ has slope $K_\mathrm{SV} = 21.1\ \mathrm{dm^3\,mol^{-1}}$ and intercept $0.998$ (close to the required $1$, supporting the model). Then
$$
k_\mathrm{q} = \frac{K_\mathrm{SV}}{\tau_0} = \frac{21.1}{1.9\times10^{-8}} = 1.1\times10^{9}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}},
$$
within an order of magnitude of the diffusion-controlled limit in water (roughly $10^{10}$), as expected for a collisional quencher. Practical consequence: hydrochloric acid must not be used to acidify quinine samples, and a sample containing even $0.01\ \mathrm{mol\,dm^{-3}}$ chloride loses about a sixth of its signal ($1/1.21 = 0.83$); quinine is determined in dilute sulfuric acid and calibrated against standards in the same medium.
:::
:::

Quenching is a nuisance for quantitative fluorescence, but it is also a sensing principle: oxygen sensors in bioreactors and blood-gas analysers measure the quenching of a luminescent ruthenium or platinum complex, and many fluorescent probes for metal ions work by switching quenching on or off when the ion binds.

::: quiz
A fluorescence calibration for a dye is linear up to $1\ \mu\mathrm{mol\,dm^{-3}}$, but a sample known to contain about $100\ \mu\mathrm{mol\,dm^{-3}}$ gives a reading *below* the $1\ \mu\mathrm{mol\,dm^{-3}}$ standard. The most likely explanation is:
- [ ] The dye has decomposed in the concentrated sample.
- [x] The inner-filter effect: at high absorbance the excitation is absorbed before it reaches the viewed region, so the signal falls.
- [ ] Stray light in the emission monochromator.
- [ ] The Stokes shift is concentration-dependent.
::: solution
[[#eq-fluorescence]] is linear only for $\varepsilon bc \lesssim 0.05$; at a hundred times the top of the linear range the solution absorbs most of the excitation near the entrance window, and the detector, viewing the centre of the cell, sees little emission. Reabsorption of emitted light adds to the effect. The cure is to dilute until the reading lies in the linear range; a quick test is that diluting a sample tenfold should reduce the signal tenfold.
:::
:::

## Where this leads

The same absorbance arithmetic, with atoms in a flame instead of molecules in a cuvette, is the basis of atomic absorption ([[analytical-chemistry/atomic-spectrometry]]). UV–visible absorbance and fluorescence are the commonest detectors in liquid chromatography ([[analytical-chemistry/chromatography]]). The origin of absorption bands, selection rules and the Franck–Condon principle are in [[spectroscopy/electronic-spectroscopy]]; the colours of transition-metal complexes in [[coordination-chemistry/spectra-of-complexes]]; the photophysics of excited states, including quenching kinetics, in [[kinetics/photochemistry]]. In biochemistry, the absorbance of proteins at $280\ \mathrm{nm}$ and of nucleic acids at $260\ \mathrm{nm}$ is the first measurement of almost every experiment ([[biochemistry/amino-acids-proteins]]).

::: history
Pierre Bouguer (*Essai d'optique sur la gradation de la lumière*, 1729) and Johann Heinrich Lambert (*Photometria*, 1760) found that the transmitted fraction of light falls exponentially with path length, and August Beer showed in 1852 that the same holds for concentration in solution. George Gabriel Stokes explained fluorescence as emission at longer wavelengths than the absorbed light in 1852, coining the word from fluorite. Otto Stern and Max Volmer published their analysis of fluorescence quenching in 1919. The first widely successful commercial UV–visible spectrophotometer, the Beckman DU, appeared in 1941, with a quartz prism monochromator and a photocell; Aminco's spectrophotofluorometer of the mid-1950s, developed with Robert Bowman at the US National Institutes of Health, did the same for fluorescence. Paul Job described the method of continuous variation in 1928.
:::

::: summary
- Absorbance $A = -\log_{10}T = \varepsilon bc$ for monochromatic radiation, dilute solution and independent, non-scattering absorbers; absorbances of non-interacting species add.
- A spectrometer combines a source, a wavelength selector of finite bandwidth, the cell and a detector; double-beam and diode-array designs reduce drift and record spectra rapidly.
- Chemical deviations come from concentration-dependent equilibria; instrumental deviations from polychromatic radiation (negative deviation) and stray light (a ceiling at $\log[(1+s)/s]$).
- For constant transmittance noise the best absorbance is $0.434$; keep calibrations between about $0.1$ and $1.5$, and measure at absorption maxima.
- Mixtures are analysed by solving $A_\lambda = b\sum_i\varepsilon_{i,\lambda}c_i$ at several wavelengths, best with whole-spectrum least squares.
- Fluorescence $F = k\Phi_\mathrm{F}P_0(1 - 10^{-\varepsilon bc})$ is linear only below $A \approx 0.05$; it is more sensitive and selective than absorption because it is measured against a dark background.
- Collisional quenching obeys $F_0/F = 1 + k_\mathrm{q}\tau_0[\mathrm{Q}]$; it is a source of matrix error and a sensing principle.
:::

## Exercises

::: exercise From transmittance to absorbance {level=1 check="0.456"}
A solution transmits $35.0\ \%$ of the incident light at its absorption maximum. What is its absorbance? (Enter $A$.)
::: solution
$A = -\log_{10}0.350 = 0.456$. Note the asymmetry of the scales: $10\ \%T$ is $A = 1$, $1\ \%T$ is $A = 2$, and $50\ \%T$ is $A = 0.301$.
:::
:::

::: exercise A molar absorption coefficient {level=1 check="14900"}
A $2.50\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ solution of a dye has an absorbance of $0.372$ in a $1.00\ \mathrm{cm}$ cell. Find $\varepsilon$, and the absorbance of a $1.00\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ solution in a $5.00\ \mathrm{cm}$ cell. (Enter $\varepsilon$ in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$.)
::: solution
$\varepsilon = 0.372/(1.00\times2.50\times10^{-5}) = 1.49\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$. In the longer cell, $A = 1.488\times10^4\times5.00\times1.00\times10^{-5} = 0.744$. Longer cells are a simple way to improve sensitivity for dilute samples, provided the blank is measured in the same cell.
:::
:::

::: exercise A relative quantum yield {level=1 check="0.402"}
A new fluorophore in ethanol (refractive index $1.360$) gives an integrated emission of $5.10\times10^5$ (arbitrary units) at an absorbance of $0.0480$. Under identical instrument settings, quinine sulfate in $0.5\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_2SO_4}$ (refractive index $1.333$; take the commonly used value $\Phi_\mathrm{F} = 0.546$) gives $7.82\times10^5$ at an absorbance of $0.0520$. Find $\Phi_\mathrm{F}$ of the new compound, using $\Phi = \Phi_\mathrm{ref}(F/F_\mathrm{ref})(A_\mathrm{ref}/A)(n^2/n_\mathrm{ref}^2)$. (Enter $\Phi_\mathrm{F}$.)
::: solution
The three ratios are $F/F_\mathrm{ref} = 5.10/7.82 = 0.6522$, $A_\mathrm{ref}/A = 0.0520/0.0480 = 1.0833$ and $(n/n_\mathrm{ref})^2 = (1.360/1.333)^2 = 1.0409$. Then $\Phi = 0.546\times0.6522\times1.0833\times1.0409 = 0.402$. Both absorbances are below $0.05$, so the linear form of [[#eq-fluorescence]] applies and the absorbed fractions are proportional to $A$; the refractive-index factor corrects for the different solid angle of emission collected from the two solvents.
:::
:::

::: exercise A mixture of two dyes {level=2 check="2.81"}
Using the $\varepsilon$ values of [[#ex-mixture]], a second mixture gives $A_1 = 0.395$ and $A_2 = 0.300$ in a $1.00\ \mathrm{cm}$ cell. Find $c_\mathrm{X}$ and $c_\mathrm{Y}$. (Enter $c_\mathrm{X}$ in units of $10^{-5}\ \mathrm{mol\,dm^{-3}}$.)
::: solution
With the same determinant, $1.050\times10^8$: $c_\mathrm{X} = (0.395\times9\,000 - 2\,000\times0.300)/1.050\times10^8 = 2\,955/1.050\times10^8 = 2.81\times10^{-5}\ \mathrm{mol\,dm^{-3}}$, and $c_\mathrm{Y} = (12\,000\times0.300 - 1\,500\times0.395)/1.050\times10^8 = 3\,007.5/1.050\times10^8 = 2.86\times10^{-5}\ \mathrm{mol\,dm^{-3}}$. Check at $\lambda_2$: $1\,500\times2.814\times10^{-5} + 9\,000\times2.864\times10^{-5} = 0.300$.
:::
:::

::: exercise Stray light at high absorbance {level=2 check="2.09"}
An instrument has $0.50\ \%$ stray light. What absorbance does it display for a sample of true absorbance $2.50$, and what is the maximum absorbance it can ever display? (Enter the displayed absorbance.)
::: solution
From [[#eq-stray]]: $A_\mathrm{app} = -\log_{10}[(10^{-2.50} + 0.0050)/1.0050] = -\log_{10}(0.008162/1.0050) = 2.09$, a $16\ \%$ error. The ceiling is $\log_{10}(1.005/0.005) = 2.30$.
:::
:::

::: exercise Quenching by oxygen {level=2 check="2.0"}
A fluorophore with $\tau_0 = 10\ \mathrm{ns}$ in an air-free solvent has half the intensity when a quencher is present at $0.050\ \mathrm{mol\,dm^{-3}}$. Find $k_\mathrm{q}$. (Enter $k_\mathrm{q}$ in units of $10^9\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$.)
::: solution
$F_0/F = 2.0 = 1 + K_\mathrm{SV}\times0.050$, so $K_\mathrm{SV} = 20\ \mathrm{dm^3\,mol^{-1}}$ and $k_\mathrm{q} = 20/1.0\times10^{-8} = 2.0\times10^{9}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$. For long-lived fluorophores, even the $\sim 0.3\ \mathrm{mmol\,dm^{-3}}$ of oxygen dissolved in air-saturated water quenches appreciably, which is why such samples are degassed.
:::
:::

::: exercise The optimum absorbance {level=3 check="0.4343"}
Derive [[#eq-photometric-error]] and show that the optimum is at $A = \log_{10}e$. Then show that if instead the noise in $P$ is proportional to $\sqrt{P}$ (shot noise, $\sigma_T = k\sqrt{T}$), the optimum moves to $A = 2\log_{10}e = 0.869$. (Enter the optimum absorbance for constant $\sigma_T$.)
::: hint
In the second case minimise $\sqrt{T}/(T\lvert\ln T\rvert) = 1/(\sqrt{T}\lvert\ln T\rvert)$, i.e. maximise $-\sqrt{T}\ln T$.
:::
::: solution
The first part is the proof of [[#prop-photometric-error]]: maximise $-T\ln T$, giving $T = e^{-1}$ and $A = \log_{10}e = 0.4343$. For shot noise, $\sigma_c/c = k\sqrt{T}/(T\lvert\ln T\rvert) = k/(\sqrt{T}\lvert\ln T\rvert)$. Maximise $h(T) = -T^{1/2}\ln T$: $h'(T) = -\tfrac12T^{-1/2}\ln T - T^{-1/2} = 0$ gives $\ln T = -2$, $T = e^{-2} = 0.135$, $A = 2\log_{10}e = 0.869$. The physics: when the noise itself shrinks as less light gets through, it pays to absorb more.
:::
:::

::: exercise How large is the polychromatic error? {level=3 check="-1.27"}
The bandpass of a filter photometer contains, in effect, two equal-power wavelengths at which the analyte's $\varepsilon$ is $2000$ and $1600\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$. For a $5.00\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ solution in a $1.00\ \mathrm{cm}$ cell, find the displayed absorbance and its percentage error relative to the expected $\tfrac12(\varepsilon_1 + \varepsilon_2)bc$. (Enter the error in per cent.)
::: solution
$\varepsilon_1bc = 1.000$ and $\varepsilon_2bc = 0.800$. From [[#eq-polychromatic]], $A_\mathrm{app} = -\log_{10}[(0.1000 + 0.1585)/2] = -\log_{10}0.12924 = 0.8886$. The expected value is $0.900$, so the error is $(0.8886 - 0.900)/0.900 = -1.27\ \%$. If the calibration standards bracket the sample closely, most of this error cancels; it matters when a calibration made at low concentration is extrapolated upwards.
:::
:::

::: exercise The linear range of fluorescence {level=3 check="0.045"}
Using [[#eq-fluorescence]], find the absorbance $x = \varepsilon bc$ at which the true fluorescence signal falls $5\ \%$ below the linear approximation, i.e. solve $(1 - 10^{-x})/(2.303x) = 0.95$. For a dye with $\varepsilon = 8.0\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ in a $1.00\ \mathrm{cm}$ cell, what concentration is that? (Enter $x$.)
::: hint
Expand $10^{-x} = e^{-2.303x}$ to second order for a first estimate, then refine numerically.
:::
::: solution
To second order, $(1 - e^{-u})/u \approx 1 - u/2$ with $u = 2.303x$; setting $1 - u/2 = 0.95$ gives $u = 0.10$, $x = 0.043$. The exact solution (Newton's method, or a calculator) is $x = 0.045$. For the dye, $c = 0.045/(8.0\times10^4\times1.00) = 5.6\times10^{-7}\ \mathrm{mol\,dm^{-3}}$ — the top of the linear range is well under a micromole per litre for strongly absorbing fluorophores, which is why fluorescence calibration ranges are low.
:::
:::
