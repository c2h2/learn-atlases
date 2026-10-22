A few milligrams of white powder sit in a capillary tube, the heating block climbs past $120\,^{\circ}\mathrm{C}$, and suddenly the packed column of crystals glistens: a drop of liquid appears at $121\,^{\circ}\mathrm{C}$, and by $123\,^{\circ}\mathrm{C}$ nothing solid is left. You look up benzoic acid in the table of constants: $122\,^{\circ}\mathrm{C}$. Have you proved that your substance is benzoic acid? You have not — you have *supported* it, which is a different and more honest verb. Identification is a matching game played with numbers and their uncertainties: a pure compound carries a set of physical constants — melting point, boiling point, density, refractive index, optical rotation — and what you measure is compared, interval against interval, with what has been published. Each comparison strengthens or weakens a hypothesis; no single comparison proves anything, because different compounds share constants by coincidence, and identity is never proved by one number, only supported by several independent ones. The comparison itself is the subject of [[laboratory-methods/measurement-uncertainty]]: a measured melting point of $121\text{–}123\,^{\circ}\mathrm{C}$ against a literature value of $122\,^{\circ}\mathrm{C}$ is two intervals agreeing, and the whole craft of this chapter lies in knowing what each kind of agreement is worth.

Purity comes first. Every constant below is worthless on an impure sample — an impure solid melts low and wide, an impure liquid boils over a range and reads the wrong density — so the identification workflow always begins with purification and a purity check, not with measurement ([[laboratory-methods/separation-purification]], [[laboratory-methods/chromatography-basics]]). Only then do the constants become evidence, and only then does the question change from "what could this be?" to "what independent measurement would disagree if I were wrong?" That question, and the measurements that answer it, are what this chapter teaches.

## Melting point

::: definition Melting point {#def-melting-point}
The **melting point** of a pure crystalline solid is the temperature at which its solid and liquid phases coexist in equilibrium at $101.3\ \mathrm{kPa}$. In the laboratory it is reported as a **melting range**: the temperatures recorded from the first drop of liquid to complete clearing of the solid. A pure compound melts **sharply** — a range of $1$–$2\,^{\circ}\mathrm{C}$ centred on its literature value — and both the position of the range and its breadth are information: the position speaks to identity, the breadth to purity.
:::

The literature value is itself a measurement, made by someone who purified the compound, read it slowly, and published the number; treat it as an interval of perhaps $\pm 1\,^{\circ}\mathrm{C}$ about a tabulated figure, not as gospel. The technique that earns the right to compare against it is small and exacting. Grind the dry solid to a fine powder and draw it into a thin-walled capillary to a depth of $1$–$2\ \mathrm{mm}$ — more powder than that cannot equalise in temperature and broadens the range. The capillary is sharp glass: round its open end shut in a flame before filling, or use a tube sold pre-sealed, and discard it into the sharps container, never the waste bin, when finished. Mount it in an electrically heated block or an oil bath — both surfaces hot enough to burn, and the oil must stay below its flash point — and ramp the temperature slowly: $1$–$2\,^{\circ}\mathrm{C}\,\mathrm{min^{-1}}$ as you approach the expected point. Fast ramps read high, because the sample inside the capillary lags behind the sensor that reports the temperature, and the melting itself absorbs heat; a quick scan is a screening tool, a slow ramp is a measurement.

::: proposition Melting-point depression {#prop-depression}
A soluble impurity both **lowers** and **broadens** the melting range of a compound. For a dilute ideal solution of impurity 2 in compound 1 — the impurity soluble in the liquid but excluded from the solid — the depression of the liquidus is
$$
\Delta T \approx K\,x_2,
\qquad
K = \frac{R\,T_\mathrm{f}^{2}}{\Delta_\mathrm{fus}H_\mathrm{m}},
$$
where $x_2$ is the mole fraction of impurity and $T_\mathrm{f}$, $\Delta_\mathrm{fus}H_\mathrm{m}$ are the melting point and molar enthalpy of fusion of the pure compound. The constant $K$ is typically $50$–$150\ \mathrm{K}$ for organic compounds — about $72\ \mathrm{K}$ for benzoic acid ($T_\mathrm{f} = 395.4\ \mathrm{K}$, $\Delta_\mathrm{fus}H_\mathrm{m} = 18.0\ \mathrm{kJ\,mol^{-1}}$) — so a mole percent of dissolved impurity costs roughly a degree, and a few mole percent cost several degrees. The relation holds for dilute ideal solutions only; it is the same freezing-point depression that [[general-chemistry-2/liquids-solutions]] develops for solvents, read from the solid side.
:::

::: proof Why an impurity lowers *and* broadens {#proof-depression}
Melting occurs where the chemical potentials of the solid and the liquid become equal at $101.3\ \mathrm{kPa}$. For the pure compound that happens at one temperature, $T_\mathrm{f}$, where $\mu_1(\mathrm{s}) = \mu_1^{*}(\mathrm{l})$. Add a soluble impurity and the liquid becomes a solution, in which component 1 has
$$
\mu_1(\mathrm{l}) = \mu_1^{*}(\mathrm{l}) + RT\ln x_1,
$$
with $x_1 < 1$: the entropy of mixing pulls the chemical potential of the liquid *down*, while the solid — pure, the impurity is excluded from its lattice — is unmoved. At $T_\mathrm{f}$ the liquid is now more stable than the solid, so the solid melts; equilibrium is restored only by going colder. Quantitatively, requiring $\mu_1(\mathrm{s}) = \mu_1^{*}(\mathrm{l}) + RT\ln x_1$ at the new temperature and integrating the Gibbs–Helmholtz relation between $T_\mathrm{f}$ and $T$ with $\Delta_\mathrm{fus}H_\mathrm{m}$ taken constant gives
$$
\ln x_1 = -\frac{\Delta_\mathrm{fus}H_\mathrm{m}}{R}\left(\frac{1}{T} - \frac{1}{T_\mathrm{f}}\right).
$$
For dilute impurity, $\ln x_1 = \ln(1 - x_2) \approx -x_2$, and $\frac{1}{T} - \frac{1}{T_\mathrm{f}} = \frac{T_\mathrm{f} - T}{T\,T_\mathrm{f}} \approx \frac{\Delta T}{T_\mathrm{f}^{2}}$, so $\Delta T \approx \left(R\,T_\mathrm{f}^{2}/\Delta_\mathrm{fus}H_\mathrm{m}\right)x_2$ — the proposition. The broadening comes from the same equation read the other way: as the temperature rises, more liquid forms, the impurity concentrates into that shrinking liquid, $x_1$ falls further, and the equilibrium temperature falls with it. Solid and solution therefore coexist not at a point but along a **liquidus** line, from the eutectic temperature up to complete clearing — and a melting *range* of $4$–$5\,^{\circ}\mathrm{C}$ where $1$–$2\,^{\circ}\mathrm{C}$ was expected is that liquidus revealing your impurity for you.
:::

::: widget plot
f: t0 - a*x
x: 0, 0.3
y: 80, 130
sliders: t0=122:100:160:1; a=100:20:200:5
labels: \text{melting point}
caption: The liquidus line of a dilute mixture: melting point against mole fraction $x$ of a soluble impurity, for a compound whose pure melting point $t_0$ is set by the slider. The line slopes down at a rate set by the constant $a$ — about $100\ \mathrm{K}$ per unit mole fraction for many organics — so a few mole percent of dissolved impurity cost several degrees. In the real experiment the same depression comes with a broadened range, and it is the breadth as much as the drop that tells you the sample is not pure.
:::

The same thermodynamics turns the melting point into a test of *identity*, not just purity: the **mixed melting point**. Grind your sample with about half its mass of authentic material of the suspected compound and melt the mixture. If the two are the same substance, the mixture is not a mixture at all — it is still pure compound, and the sharp range sits unchanged at the literature value. If they are different, each is a soluble impurity in the other, and [[#prop-depression]] guarantees a depressed, broadened range. One number cannot tell you *which* compound you have; a mixed melting point can tell you whether two samples are the same compound, and that negative power is what makes it valuable.

::: example Which candidate survives? {#ex-melting-point-candidates}
A dry white solid melts sharply at $121\text{–}123\,^{\circ}\mathrm{C}$. A table of candidates offers benzoic acid (literature $122\,^{\circ}\mathrm{C}$), naphthalene ($80\,^{\circ}\mathrm{C}$) and urea ($133\,^{\circ}\mathrm{C}$). Which survives, and what has the melting point actually established?
::: solution
Compare intervals. The measured range $121\text{–}123\,^{\circ}\mathrm{C}$ agrees with benzoic acid's $122\,^{\circ}\mathrm{C}$ within reading error; it is $40$ degrees above naphthalene and $10$ below urea, and no impurity depresses a melting point by $40$ degrees while keeping the range sharp — a mixture would melt low *and* wide. Only benzoic acid survives. But read carefully what has happened: one constant has *eliminated* two candidates and *supported* a third. Sharpness at the literature value says "pure, and consistent with benzoic acid" — it does not exclude the compounds that also melt near $122\,^{\circ}\mathrm{C}$, of which there are several (aspirin melts at $122\text{–}123\,^{\circ}\mathrm{C}$). The next measurements must be independent ones.
:::
:::

::: example A mixed melting point separates twins {#ex-mixed-melting-point}
Two unknowns, A and B, are both dry white crystalline solids, and each melts sharply at $122\text{–}123\,^{\circ}\mathrm{C}$. A student grinds equal masses of A and B together and the mixture melts at $115\text{–}120\,^{\circ}\mathrm{C}$. Are A and B the same compound?
::: solution
They are different compounds, and the mixture has said so. If A and B were one and the same substance, grinding them together would change nothing: the "mixture" would be pure compound, and the range would stay sharp at $122\text{–}123\,^{\circ}\mathrm{C}$. Instead the range has fallen by several degrees and widened to $5\,^{\circ}\mathrm{C}$ — depression *and* broadening, the exact signature of [[#prop-depression]]: each compound is a soluble impurity in the other, and the pair now melts along a liquidus between its eutectic and its clearing point. (One plausible reading: A is benzoic acid and B is aspirin, whose literature melting points coincide at $122\text{–}123\,^{\circ}\mathrm{C}$ — a coincidence that a single melting point could never expose and a mixed melting point exposes in five minutes.)
:::
:::

::: quiz
A dry white solid melts sharply at exactly its literature melting point. This:
- [ ] proves the compound is that substance, since two independent measurements agree.
- [x] is consistent with the compound being that substance, but does not prove it, because different compounds can share a melting point.
- [ ] proves the compound is pure but says nothing about what it is.
- [ ] means the literature value must be wrong.
::: solution
Consistent, not proved. Pairs of different compounds do share melting points — benzoic acid and aspirin both melt at $122\text{–}123\,^{\circ}\mathrm{C}$, and isomers routinely share constants more closely than that — so a single matching constant is a hint, not a verdict. The sharpness does support purity, so the option about purity is half right, but a sharp literature-value melting point supports *both* statements at once and proves neither. The remedy is not more of the same measurement but different ones: a mixed melting point with authentic material, then a spectrum ([[#warn-melting-not-proof]]).
:::
:::

## Boiling point, density and refractive index

For liquids the constants change but the logic does not. A liquid's **boiling point** is the temperature at which its vapour pressure equals the external pressure — not a property of the liquid alone but of the liquid on *that day, at that barometric pressure* ([[general-chemistry-2/liquids-solutions]]). The Clausius–Clapeyron slope $\mathrm{d}T/\mathrm{d}p = RT^{2}/(\Delta_\mathrm{vap}H_\mathrm{m}\,p)$ works out to roughly $0.3\ ^{\circ}\mathrm{C}$ per $\mathrm{kPa}$ for typical organic liquids, so a $10\ \mathrm{kPa}$ swing in the weather — ordinary — moves ethanol's boiling point by nearly $3\ ^{\circ}\mathrm{C}$. A boiling point reported without its pressure is not a constant at all; correct it to $101.3\ \mathrm{kPa}$ with a pressure–boiling-point nomograph before comparing with the table, and report both the observed and corrected values. Boiling points are also the least discriminating of the liquid constants: they are hard to read to better than about $1\ ^{\circ}\mathrm{C}$, and far more compounds share a boiling point than share a melting point.

**Density** $\rho = m/V$ is more honest, because both $m$ and $V$ can be measured well. Weigh a **pycnometer** (a small flask with a capillary-stoppered ground joint, calibrated to contain a stated volume at a stated temperature), fill, drain, weigh again, and divide; or deliver a calibrated pipette of liquid onto a balance and treat the pipette volume as the $V$. Report with the temperature, since liquids expand as they warm: $\rho = 0.789\ \mathrm{g\,cm^{-3}}$ at $20\ ^{\circ}\mathrm{C}$, with the uncertainty budget of [[laboratory-methods/measurement-uncertainty]] behind it.

::: definition Refraction and refractive index {#def-refraction}
Light slows in a medium, and the **refractive index** $n = c/v$ measures how much; a ray crossing a boundary between media of index $n_1$ and $n_2$ is bent according to **Snell's law**,
$$
n_1\sin\theta_1 = n_2\sin\theta_2,
$$
with $\theta$ measured from the normal. Because $n$ depends on wavelength and temperature, it is reported with both stated: the sodium D line ($589\ \mathrm{nm}$) at $20\ ^{\circ}\mathrm{C}$, written $n_\mathrm{D}^{20} = 1.4741$. An **Abbé refractometer** measures it on one or two drops: a film of liquid between two prisms, a hand-held instrument read against a calibrated scale in a minute. Refractive index is the workhorse liquid constant because it is precise to four or five significant figures from a tiny sample — and correspondingly purity-sensitive: a single drop's worth of a dense dissolved impurity moves the fourth figure.
:::

Density and refractive index together make a powerful pair: they respond to different molecular properties (packing and intermolecular forces; polarisability), so two liquids rarely share both. They are also the two constants you can measure on a few drops without destroying the sample.

::: example A colourless liquid from two constants {#ex-liquid-identification}
A dry colourless liquid reads $n_\mathrm{D}^{20} = 1.447$ and $\rho = 1.489\ \mathrm{g\,cm^{-3}}$ at $20\ ^{\circ}\mathrm{C}$. The candidate table reads: dichloromethane ($n_\mathrm{D}^{20} = 1.424$, $\rho = 1.326\ \mathrm{g\,cm^{-3}}$), chloroform ($1.447$, $1.489$), water ($1.333$, $0.998$), toluene ($1.497$, $0.867$). Identify it, and say how strong the identification is.
::: solution
Both measured constants match chloroform exactly at the precision of the measurements: $n_\mathrm{D}^{20}$ is wrong by $0.023$ for dichloromethane (fifty times the reading error), and no other candidate is close on either count. Two independent constants agreeing is evidence, not proof — the honest next step is a third, independent measurement that would disagree if the assignment were wrong: the boiling point at the day's pressure, corrected to $101.3\ \mathrm{kPa}$, should sit near $61\ ^{\circ}\mathrm{C}$ (dichloromethane would give $40\ ^{\circ}\mathrm{C}$), or a spectrum should show chloroform's pattern. Note also what the match assumes: the sample is dry and pure, since a dense dissolved impurity could drag both constants toward this pair of values from somewhere else.
:::
:::

## Optical rotation

::: definition Specific rotation {#def-rotation}
A compound whose molecules are **chiral** rotates the plane of **plane-polarised** light as it passes through a solution (or the neat liquid). The observed angle $\alpha$ is proportional to path length and to the number of molecules in the beam, so the **specific rotation** normalises them away:
$$
[\alpha]^{T}_{\mathrm{D}} = \frac{\alpha}{l\,c},
$$
with $\alpha$ the observed rotation in degrees, $l$ the tube length in **decimetres** and $c$ the concentration in $\mathrm{g\,mL^{-1}}$. Report the temperature, the wavelength (conventionally the sodium D line), the solvent and the concentration, because all four are part of the number: $[\alpha]^{20}_\mathrm{D} = +66.5\ (\mathrm{c}\ 1.00,\ \mathrm{H_2O})$. The two **enantiomers** of a compound rotate by equal magnitudes in opposite directions, so the sign reports *which hand* you have — relative to the literature, never absolutely: $(+)$ and $(-)$ do not map onto any fixed structural descriptor. A **racemate** reads zero, its two halves cancelling exactly, which is why rotation measures enantiomeric composition as well as identity.
:::

::: history Handedness, sorted by hand {#hist-pasteur}
In 1848 the twenty-five-year-old Louis Pasteur, a young lecturer in chemistry at Strasbourg, was handed the problem of the tartrates: salts of tartaric acid from wine barrels rotated polarised light, but the "paratartaric acid" (racemic acid) found in wine dregs had the same composition and rotated nothing. Under a magnifying lens, sorting crystals of the sodium ammonium salt one by one, Pasteur found two kinds that were mirror images of each other — and, dissolving each kind separately, that their solutions rotated the plane of polarised light equally and oppositely. The racemate, he had shown, was a mixture of equal and opposite halves: the first resolution of **enantiomers**, and the birth of molecular handedness, settled with a lens, tweezers and a **polarimeter** — the direct ancestor of the tube-and-prism instrument in any teaching laboratory today. For a century afterwards, before infrared, NMR and mass spectrometry existed, optical rotation was among the strongest physical evidence a chemist could bring to the question "what is this molecule?", and specific rotations remain the reported fingerprint of chiral natural products and drugs.
:::

::: example Measuring a specific rotation {#ex-specific-rotation}
A student dissolves $0.40\ \mathrm{g}$ of a dry chiral solid in enough solvent to make $10.0\ \mathrm{mL}$ of solution and measures a rotation of $\alpha = +4.8^{\circ}$ in a $1.0\ \mathrm{dm}$ tube at $20\ ^{\circ}\mathrm{C}$ with the D line. Compute the specific rotation, and interpret it against a literature value of $+120^{\circ}$ for the compound.
::: solution
The concentration is $c = 0.40\ \mathrm{g} / 10.0\ \mathrm{mL} = 0.040\ \mathrm{g\,mL^{-1}}$, so
$$
[\alpha]^{20}_\mathrm{D} = \frac{\alpha}{l\,c} = \frac{+4.8^{\circ}}{1.0\ \mathrm{dm} \times 0.040\ \mathrm{g\,mL^{-1}}} = +120^{\circ}.
$$
The observed value matches the literature value in sign and magnitude: the sample is consistent with the compound in its enantiomerically pure form. The reading also carries two negatives-in-waiting: had the sample been the *other* enantiomer the tube would have read $-4.8^{\circ}$, and a racemate would have read $0^{\circ}$ regardless of how perfectly the solid matched on every other constant. Rotation, like the other constants, is reported with its uncertainty — here the $1.0\ \mathrm{dm}$ tube and the two-figure $\alpha$ cap the result at about two figures, which is exactly enough to distinguish $+120^{\circ}$ from $0^{\circ}$ or from $-120^{\circ}$.
:::
:::

## Qualitative chemical tests

Physical constants say *which compound*; qualitative tests say *which functional groups*, and they do it with a spot plate and a few drops. The logic is a decision tree, not a single test: each reaction answers a yes/no question that prunes the candidate list, and the questions are asked in an order that makes sense for the sample in front of you. The standard sieve at teaching scale:

- **Flame test.** A clean nichrome wire in a blue flame with a chloride: sodium colours the flame a persistent yellow, copper a green edge. Crude, but quick for ions.
- **2,4-Dinitrophenylhydrazine (2,4-DNP).** A yellow-to-orange precipitate with the reagent (dissolved in strong acid) marks a **carbonyl** — aldehyde or ketone. The reagent is strongly acidic and stains; one drop of each is the whole experiment.
- **Tollens' reagent.** A silver mirror (or grey precipitate) on a clean tube marks an **aldehyde**. Tollens' must be made fresh in the quantity needed, and whatever is left destroyed with dilute acid immediately after use — **never** stored or left standing, because the deposits it forms on standing can explode.
- **Bromine water.** Orange bromine water, shaken with the liquid *in the fume cupboard* (bromine is toxic and corrosive, and its vapour does the deciding for you): decolourised at once in the dark by an **alkene**, which adds bromine across the double bond.
- **Iron(III) chloride.** A drop of neutral aqueous $\mathrm{FeCl_3}$: an intense violet marks a **phenol** (and other strongly chelating enols), from the iron(III)–phenoxide complex.
- **Carbonates.** A spatula-tip of solid in dilute hydrochloric acid: brisk effervescence of carbon dioxide marks a **carbonate**.
- **Solubility.** The first classification costs nothing: which of water, dilute acid and dilute sodium hydrogencarbonate the substance dissolves in separates acids from neutrals and small polar molecules from large nonpolar ones.

Every one of these is a test-tube or spot-plate operation on the smallest safe quantities, run after the hazards of each reagent have been read up and assessed — practical identification work is done under supervision and under a risk assessment, exactly as every other experiment in this atlas ([[laboratory-methods/lab-safety]]).

::: example Choosing the test that decides {#ex-choosing-tests}
Give one chemical test that distinguishes (a) cyclohexane from cyclohexene; (b) ethanoic acid from ethyl ethanoate. State the expected observation for each compound.
::: solution
(a) Bromine water, in the dark: cyclohexene decolourises the orange solution at once by addition across the double bond, while cyclohexane leaves it orange. (A flame test or density would also differ, but bromine water is the test that answers the structural question.) (b) A few grains of sodium hydrogencarbonate, or dilute hydrochloric acid versus water: ethanoic acid fizzes with hydrogencarbonate — it is stronger than carbonic acid and drives it out of solution as $\mathrm{CO_2}$ — and dissolves in water, while ethyl ethanoate, a neutral ester, shows no effervescence and only slight solubility. Note the pattern being learned: the chosen test must target the *difference* between the candidates (a C=C; an acid stronger than carbonic), not merely some property on which they happen to differ.
:::
:::

## The identification workflow

::: algorithm Identification from physical constants {#alg-identification}
1. **Dry and purify.** Recrystallise or distil until the sample is what you think it is ([[laboratory-methods/separation-purification]]). A constant measured on a wet or impure sample is not a bad measurement; it is a measurement of a different substance.
2. **Check purity before identity.** One spot on a TLC plate, and/or a sharp melting range; a liquid that boils over $5\ ^{\circ}\mathrm{C}$ is not one compound ([[laboratory-methods/chromatography-basics]]). If this step fails, go back to step 1 — every constant below is worthless until it passes.
3. **Measure the constants that suit the state.** Solid: melting point, then a mixed melting point with authentic material. Liquid: boiling point at the stated pressure (corrected to $101.3\ \mathrm{kPa}$), density, and $n_\mathrm{D}^{20}$. Chiral: specific rotation.
4. **Compare each with the literature as interval against interval**, with your measurement uncertainty and the literature value's own scatter ([[laboratory-methods/measurement-uncertainty]]).
5. **Weigh the verdict honestly.** One matching constant is a hint; two independent matching constants are evidence; a mixed melting point that refuses to depress, or a spectrum that matches, is the clincher ([[spectroscopy/nmr-principles]], [[spectroscopy/mass-spectrometry]]).
6. **Label, record and store.** Record every number with its uncertainty and its source in the notebook; never return a characterised unknown to the shared reagent shelf.
:::

::: warning One matching constant never proves identity {#warn-melting-not-proof}
Benzoic acid and aspirin share a melting point; isomers share refractive indices and densities by coincidence; two of the three candidates in a table can agree with your solid to the degree and still be wrong. The habit that keeps this from fooling you is a single question, asked after every match: *what independent measurement would disagree if I were wrong?* If the answer is "nothing I have done", you have a hint, not an identification — so make that measurement: the mixed melting point, the second constant, the spectrum. And the warning has a social half: your characterised unknown is now a claim about the world, so never return it to the shared reagent shelf, where the next student will trust a label you wrote.
:::

## Where this leads

Everything in this chapter rests on the purification of [[laboratory-methods/separation-purification]] and the purity check of [[laboratory-methods/chromatography-basics]]: constants are meaningless before them. The reporting of constants with their uncertainties and literature citations is the subject of [[laboratory-methods/reporting-integrity]], and the interval arithmetic behind every comparison is [[laboratory-methods/measurement-uncertainty]]. The modern clinchers — the measurements that turn "consistent with" into "identified" — are the spectra: hydrogen and carbon NMR in [[spectroscopy/nmr-principles]], the molecular mass and fragmentation pattern in [[spectroscopy/mass-spectrometry]], and the functional-group fingerprint in [[spectroscopy/vibrational-spectroscopy]], which does in a minute what the qualitative-test decision tree used to. The pressure dependence of boiling points, and the colligative logic behind melting-point depression, are worked out in [[general-chemistry-2/liquids-solutions]].

::: summary
- A pure compound has a set of physical constants; identification compares each measured constant, as an interval, with the published value — and no single constant proves identity.
- A pure crystalline solid melts sharply ($1$–$2\ ^{\circ}\mathrm{C}$) at its literature point; a soluble impurity lowers *and* broadens the range, with $\Delta T \approx K x_2$ and $K$ of order $100\ \mathrm{K}$ per unit mole fraction.
- Read melting points slowly ($1$–$2\ ^{\circ}\mathrm{C}\,\mathrm{min^{-1}}$ near the point): fast ramps read high because the sample lags the sensor.
- A mixed melting point that stays sharp supports "same compound"; one that depresses proves "different compounds" — the most valuable single number in solid identification.
- For liquids: boiling point only means something with its pressure (correct to $101.3\ \mathrm{kPa}$); density and refractive index $n_\mathrm{D}^{20}$ are precise, purity-sensitive and need only a few drops.
- Optical rotation $[\alpha]^{T}_\mathrm{D} = \alpha/(l\,c)$ reports the chiral compound and its handedness; enantiomers rotate equally and oppositely, a racemate not at all.
- Qualitative tests (2,4-DNP, Tollens', bromine water, iron(III) chloride, carbonates, solubility) form a decision tree run at microscale with hazards assessed first; Tollens' is made fresh and destroyed after use, never stored.
- Workflow: purify, check purity, measure the constants that suit the state, compare with uncertainties — one match is a hint, two are evidence, a mixed melting point or a spectrum is the clincher.
:::

## Exercises

::: exercise Depressed and wide: pure or impure? {level=1}
A solid whose literature melting point is $122\text{–}123\,^{\circ}\mathrm{C}$ is recovered from a recrystallisation and melts at $118\text{–}122\,^{\circ}\mathrm{C}$. Does the wide, depressed range mean the compound is impure or that it is pure? Give the thermodynamic reason, and one mundane alternative explanation worth ruling out first.
::: solution
Impure — or at least not dry. The range is both depressed (begins $4$ degrees early) and broadened ($4\ ^{\circ}\mathrm{C}$ wide where $1$–$2\ ^{\circ}\mathrm{C}$ is expected), and [[#prop-depression]] says a soluble impurity does exactly both: it lowers the liquidus by $\Delta T \approx K x_2$ and, because the impurity concentrates into the melting liquid, equilibrium persists over a span of temperature. A pure compound cannot melt wide. The mundane alternative: residual solvent or water *is* an impurity — a poorly dried sample behaves exactly like a dirty one — so the first remedy is to dry it to constant mass and re-run the capillary before invoking a foreign compound.
:::
:::

::: exercise Specific rotation {level=1 check="-31.6"}
A student dissolves $0.500\ \mathrm{g}$ of a chiral solid in solvent and makes up to $10.0\ \mathrm{mL}$, then measures $\alpha = -1.58^{\circ}$ in a $1.00\ \mathrm{dm}$ tube at $20\ ^{\circ}\mathrm{C}$ with the sodium D line. Compute the specific rotation. (Enter the specific rotation in degrees; it is negative.)
::: solution
$c = 0.500/10.0 = 0.0500\ \mathrm{g\,mL^{-1}}$, so
$$
[\alpha]^{20}_\mathrm{D} = \frac{\alpha}{l\,c} = \frac{-1.58^{\circ}}{1.00\ \mathrm{dm} \times 0.0500\ \mathrm{g\,mL^{-1}}} = -31.6^{\circ}.
$$
The negative sign is part of the result: the sample is the levorotatory enantiomer, and a literature comparison must be against a value reported for the same solvent, temperature and wavelength.
:::
:::

::: exercise One test, two compounds {level=1}
Name a single chemical test that distinguishes propanal from propanone, and state the observation for each. Why does 2,4-DNP *not* distinguish them?
::: solution
Tollens' reagent, freshly made: propanal, an aldehyde, reduces it to a silver mirror (or grey silver), while propanone, a ketone, does nothing. 2,4-DNP fails as the distinguishing test because it answers a different question — it marks the carbonyl group, which *both* compounds have, and would give its orange precipitate with either. The test that distinguishes must target the difference (the easily oxidised aldehyde C–H), not the shared functional group. Safety as ever: Tollens' in a spot-plate quantity, made fresh and destroyed with dilute acid immediately after the experiment.
:::
:::

::: exercise How much impurity? {level=2 check="0.04"}
A compound whose pure melting point is $122.0\ ^{\circ}\mathrm{C}$ is found to melt with its clearing point depressed by $4.0\ \mathrm{K}$. Using $\Delta T = K x_2$ with $K = 100\ \mathrm{K}$, estimate the mole fraction of soluble impurity. (Enter the mole fraction as a decimal.)
::: solution
$x_2 = \Delta T / K = 4.0/100 = 0.040$: about $4\ \%$ of the molecules present are impurity. The crudeness is worth seeing: a $4$-degree melting point — an unmistakable one at the bench — corresponds to only a few mole percent, which is why "melts at the right temperature" and "pure" are not synonyms, and why purification is step one of [[#alg-identification]]. (The estimate assumes an ideal dilute solution and that the impurity is excluded from the solid; with a heavy impurity the *mass* percent could be several times the mole percent.)
:::
:::

::: exercise Density from a filled flask {level=2 check="0.789"}
An empty, dry pycrometer of $50.00\ \mathrm{cm^3}$ capacity weighs $18.236\ \mathrm{g}$; filled with a colourless liquid at $20\ ^{\circ}\mathrm{C}$ and stoppered it weighs $57.686\ \mathrm{g}$. Compute the density and identify the liquid from the table: cyclohexane ($0.779\ \mathrm{g\,cm^{-3}}$), ethanol ($0.789$), water ($0.998$), dichloromethane ($1.326$). (Enter the density in $\mathrm{g\,cm^{-3}}$.)
::: solution
The liquid's mass is $57.686 - 18.236 = 39.450\ \mathrm{g}$, so
$$
\rho = \frac{m}{V} = \frac{39.450\ \mathrm{g}}{50.00\ \mathrm{cm^3}} = 0.789\ \mathrm{g\,cm^{-3}},
$$
which matches ethanol. The identification is a *hint*, not a verdict: density is one constant, and the honest next measurement is $n_\mathrm{D}^{20}$ (ethanol $1.361$, cyclohexane $1.426$ — the pair the density nearly confused are far apart in refraction) or the boiling point. Note also the interval arithmetic: the balance is uncertain in the fourth decimal place and the pycrometer's calibration in the third figure of the volume, so the density is honest to about three figures — enough to separate ethanol from cyclohexane, but only just.
:::
:::

::: exercise Why fast ramps read high {level=2}
A student cranks the melting-point apparatus at $10\ ^{\circ}\mathrm{C}\,\mathrm{min^{-1}}$ and records a compound's melting point $5$ degrees above its literature value, with a wide range. The compound may well be pure. Explain, from the direction of heat flow and the location of the sensor, why a fast ramp biases the reading *high* and broadens the range.
::: solution
Heat flows from the block, through the sensor and the capillary wall, into the sample — so the sample is always the *coldest* thing in the circuit, and the sensor reports its own temperature, not the sample's. While heating, that difference is proportional to the heating rate: at $10\ ^{\circ}\mathrm{C}\,\mathrm{min^{-1}}$ the sample can trail the sensor by several degrees. When the sample finally reaches its true melting point, the sensor is already several degrees higher, and it reads high; the range broadens because different parts of a thick column of powder reach the melting temperature at different times, and because melting itself absorbs heat and holds the sample back while the sensor races on. At $1$–$2\ ^{\circ}\mathrm{C}\,\mathrm{min^{-1}}$ the lag shrinks below a degree and the reading — and its sharpness — become trustworthy. The lesson generalises to any measurement with a sensor and a sample: the instrument reads where the sensor is, and you are paid in accuracy for every minute of slow ramping.
:::
:::

::: exercise Design an identification {level=3}
You are handed a dry, colourless liquid, about $2\ \mathrm{cm^3}$, with no label. Design the full identification: which measurements, in what order, and with what decision rule at each stage. Say explicitly what result would *falsify* your leading hypothesis at the point you commit to it.
::: hint
Order the measurements by how much they cost and how much they assume: purity first (a liquid that boils over a wide range, or leaves a residue, or shows two spots, is not one compound and no constant means anything); then the constants that need only a drop (refraction, density); then the ones that consume sample (boiling point); then one independent structural check. Falsification means naming the measurement that would disagree if you were wrong — and doing it.
:::
::: solution
(1) Purity: measure $n_\mathrm{D}^{20}$ and observe a small distillation or a TLC spot — a single compound gives one spot and constants that do not drift with fraction; if impure, purify first ([[#alg-identification]]). (2) Two drop-scale constants: $n_\mathrm{D}^{20}$ and $\rho$ at $20\ ^{\circ}\mathrm{C}$; take the candidate list down to whatever matches both within uncertainty. (3) Boiling point at the barometric pressure of the day, corrected to $101.3\ \mathrm{kPa}$; this is a third independent constant and it also confirms dryness (a sharp boiling range). (4) One structural check independent of all three numbers: a qualitative test aimed at the difference between the surviving candidates (bromine water for a C=C, 2,4-DNP for a carbonyl, solubility in dilute acid or hydrogencarbonate for amines and acids), or, best, an IR or NMR spectrum. (5) Report every constant with its uncertainty and the source of the literature values. Falsification, concretely: if the constants point to chloroform, then a boiling point near $40\ ^{\circ}\mathrm{C}$ (dichloromethane) or a $^{1}\mathrm{H}$ NMR singlet near $\delta = 7.3$ versus no matching signal would disagree with the assignment — so measure the boiling point and take the spectrum *before* writing the name on the bottle. If everything agrees, the identification is supported; if any one measurement disagrees, the hypothesis is dead and step 1 starts again.
:::
:::

::: exercise The three-candidate puzzle {level=3}
Unknown X is a dry white solid melting sharply at $122\text{–}123\,^{\circ}\mathrm{C}$. Candidates: benzoic acid ($122\ ^{\circ}\mathrm{C}$), aspirin ($122\text{–}123\ ^{\circ}\mathrm{C}$), mandelic acid ($119\text{–}121\ ^{\circ}\mathrm{C}$). Mixed melting points: X + benzoic acid melts at $122\text{–}123\,^{\circ}\mathrm{C}$; X + aspirin melts at $112\text{–}120\,^{\circ}\mathrm{C}$. Identify X and explain each observation. What would X + mandelic acid have shown, and does the puzzle need that experiment?
::: solution
X is benzoic acid. The mixture with authentic benzoic acid is not a mixture at all — same compound plus same compound is still pure compound — so the range stays sharp at $122\text{–}123\,^{\circ}\mathrm{C}$ ([[#prop-depression]] in reverse: with $x_2 = 0$, $\Delta T = 0$). The mixture with aspirin depresses to $112\text{–}120\,^{\circ}\mathrm{C}$ and broadens: aspirin is a soluble impurity in benzoic acid, so the pair melts along a liquidus, and X cannot be aspirin. Mandelic acid's own literature point ($119\text{–}121\ ^{\circ}\mathrm{C}$) already sits below X's sharp range, and had the mixture been run it would have depressed and broadened like the aspirin one — different compounds, each an impurity in the other. The puzzle does not *need* that third experiment: the two mixed results have eliminated aspirin and confirmed identity with benzoic acid. But a careful report would run it anyway, because "no depression" is the load-bearing observation and one confirmation of it is thin — and would finish with a spectrum, since a mixed melting point proves "same as the bottle I mixed it with", and the bottle's own label is a literature value you have not audited ([[#warn-melting-not-proof]]).
:::
:::
