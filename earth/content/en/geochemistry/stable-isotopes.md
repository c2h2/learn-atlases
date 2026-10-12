Stable isotope geochemistry rests on one quantum-mechanical fact: a molecule containing a heavy isotope has slightly lower vibrational zero-point energy, and therefore a slightly stronger bond and a slightly lower vapour pressure, than the molecule containing the light isotope. Every application of the method — the palaeothermometer, the ice-volume curve, the tracer of methanogenesis, the altimeter, the proof that the atmosphere oxidised 2.4 billion years ago — follows from that few millielectronvolts of energy, from the fact that the resulting fractionations scale as the **inverse square of absolute temperature**, and from the fact that **kinetic** processes express the same effect with a different and much larger magnitude.

## Notation, fractionation and the two limits

::: definition Delta notation and fractionation factors {#def-delta}
Isotope compositions are reported as deviations, in **parts per thousand (per mil, ‰)**, from an international standard:
$$
\delta^{18}\mathrm{O} = \left[\frac{(^{18}\mathrm{O}/^{16}\mathrm{O})_{\mathrm{sample}}}{(^{18}\mathrm{O}/^{16}\mathrm{O})_{\mathrm{standard}}} - 1\right]\times1000 \quad [\text{‰}],
$$
with the standards **VSMOW** for hydrogen and oxygen ($^{18}\mathrm{O}/^{16}\mathrm{O} = 1/500$, $\delta^{18}\mathrm{O} = 0$ for standard mean ocean water), **V-PDB** for carbon and oxygen in carbonates, **AIR** for nitrogen, **V-CDT** for sulphur, and **V-PDB** again for strontium-independent work. Between two phases in equilibrium the **fractionation factor** is
$$
\alpha_{\mathrm{A-B}} = \frac{R_{\mathrm{A}}}{R_{\mathrm{B}}}, \qquad
\varepsilon_{\mathrm{A-B}} = (\alpha_{\mathrm{A-B}} - 1)\times1000 \approx 1000\ln\alpha_{\mathrm{A-B}} \quad [\text{‰}],
$$
and for small fractionations $\delta_{\mathrm{A}} - \delta_{\mathrm{B}} \approx \varepsilon_{\mathrm{A-B}}$. The two facts that organise the whole subject are that **the fractionation scales inversely with the square of absolute temperature**,
$$
1000\ln\alpha \propto \frac{1}{T^{2}} \quad (\text{Bigeleisen--Mayer}),
$$
so that isotope fractionations are large at low temperature and vanish at high temperature, and that the fractionation scales with the **relative mass difference** $\Delta m/m$, so that for a given element the sulphur isotope effects are smaller than the oxygen effects, and the iron isotope effects smaller still, while hydrogen — where $\Delta m/m = 1$ — has fractionations of hundreds of per mil and is by far the most sensitive.
:::

::: definition Equilibrium versus kinetic fractionation {#def-kinetic}
An **equilibrium** fractionation is a thermodynamic property: it is the same whether the reaction goes forward or backward, it is achieved only if the phases exchange to completion, and it is small, of order the $1/T^2$ expression above. A **kinetic** fractionation is a rate effect: a molecule containing the light isotope reacts, diffuses and evaporates **faster**, and the fractionation is therefore expressed only when the reaction is **irreversible** and the product escapes. Kinetic fractionations are typically **five to fifty times larger** than equilibrium fractionations and they carry a diagnostic signature: they follow the **Rayleigh distillation** law, in which the residual reactant becomes progressively enriched in the heavy isotope as the reaction proceeds,
$$
R = R_0 f^{\alpha-1}, \qquad \delta = \delta_0 + \varepsilon\ln f,
$$
where $f$ is the fraction of reactant remaining and $\varepsilon$ is the kinetic enrichment factor for the **product minus reactant**. The classic examples, with their enrichment factors, are
$$
\begin{array}{lcl}
\text{photosynthetic CO}_2\ \text{fixation (C3 plants)} & & \varepsilon \approx -19\ \text{to}\ -22\ ‰ \\
\text{C4 photosynthesis} & & \varepsilon \approx -5\ \text{to}\ -10\ ‰ \\
\text{bacterial sulphate reduction (open system)} & & \varepsilon \approx -20\ \text{to}\ -46\ ‰ \\
\text{methanogenesis (CO}_2\ \text{reduction)} & & \varepsilon \approx -60\ \text{to}\ -110\ ‰ \\
\text{denitrification} & & \varepsilon \approx -20\ \text{to}\ -30\ ‰ \\
\text{evaporation of water (kinetic, humidity-dependent)} & & \varepsilon \approx +10\ \text{to}\ +14\ ‰
\end{array}
$$
and the reason isotope data are interpreted rather than merely measured is that **a given isotope composition can be produced by either mechanism**, so the equilibrium or kinetic origin must be established from the geology, from the **multiple-isotope** system, or from the fact that a Rayleigh array is exponential in $f$ whereas an equilibrium array is not.
:::

::: example A Rayleigh rain-out {#ex-rayleigh}
A mass of moist air with $\delta^{18}\mathrm{O} = 0$ ‰ is rained out progressively. Taking a liquid–vapour fractionation of $\varepsilon_{l-v} = +10$ ‰, find the isotopic composition of the vapour, of the instantaneous rain, and of the accumulated rain after 70 per cent of the water has been removed.
::: solution
For the residual vapour, $f = 0.30$ and $\alpha_{l-v} = 1.010$:
$$
\delta_v = \delta_0 + 1000(\alpha-1)\ln f = 0 + 10\ln 0.30 = -12.0\ \text{‰},
$$
and the rain falling at that instant is enriched by the fractionation,
$$
\delta_l = \delta_v + \varepsilon = -12.0 + 10 = -2.0\ \text{‰}.
$$
The **accumulated** rain is obtained from the mass balance $R_0 = f R_v + (1-f)R_{L}$, which gives
$$
\delta_{L} \approx \delta_0 + 1000\ln\left(\frac{1-f^{\alpha}}{1-f}\right)
   = 1000\ln\left(\frac{1-0.30^{1.010}}{0.70}\right) = 1000\ln(1.0051) = +5.1\ \text{‰}.
$$
The vapour has fallen by 12 ‰, the last rain is at $-2$ ‰ and the **average** of all the rain that has fallen is $+5$ ‰.

This is the whole of the **continental effect** in isotope hydrology. Because rain is removed progressively and the vapour becomes ever more depleted, precipitation becomes systematically more depleted **inland, at higher altitude and at lower temperature**, and the accumulated rain at the end of a storm or at the end of a transect is far less depleted than the vapour it came from. The numbers explain three observations that matter in practice: why a single storm's early rain is the most enriched and why the "amount effect" makes tropical rainfall more depleted in high-rainfall months; why the mean $\delta^{18}\mathrm{O}$ of global precipitation is about $-4$ ‰ rather than the $-12$ ‰ of the residual vapour; and why **groundwater recharged in a cold glacial climate** records the isotopic composition of the **accumulated** precipitation and not of the last storm, which is why palaeoclimate interpretation of groundwater requires an **annual** rather than an event-weighted signal.
:::
:::

::: widget plot
f: 10*ln(x)
x: 0.05, 1
y: -30, 1
labels: \delta^{18}\text{O}
caption: The Rayleigh distillation curve $\delta = \delta_0 + \varepsilon\ln f$ for the residual water vapour, with $\varepsilon = +10$ ‰. The curve is **concave and unbounded downward**, so the isotopic depletion of precipitation is greatest at the **start** of rain-out and increases only slowly thereafter — the reason the $\delta^{18}\mathrm{O}$ of precipitation falls steeply over the first few hundred kilometres inland and then flattens, and the reason the "altitude effect" is strongest on the windward side of a mountain range. The same functional form describes the isotopic evolution of a evaporating brine, of a methane pool being consumed by anaerobic oxidation, and of a nitrate pool being consumed by denitrification, and in every case the **slope of $\delta$ against $\ln f$ gives the enrichment factor** and therefore identifies the process.
:::

## The systems and what they record

::: definition Hydrogen and oxygen: water as a tracer {#def-water}
Because 99.9 per cent of the hydrogen and oxygen in a natural water is in the H$_2$O molecule, the $\delta^{18}\mathrm{O}$ and $\delta^{2}\mathrm{H}$ of water are a **physical fingerprint of its history**, set by evaporation, by the temperature of condensation and by the mixing of sources. Meteoric waters around the world fall on the **global meteoric water line**
$$
\delta^{2}\mathrm{H} = 8\,\delta^{18}\mathrm{O} + 10 ,
$$
whose slope of 8 is the equilibrium fractionation ratio for the two systems and whose intercept, the **deuterium excess** $d = \delta^{2}\mathrm{H} - 8\delta^{18}\mathrm{O}$, is set by the **kinetic** conditions of evaporation at the source and is therefore a palaeoclimate variable in its own right, sensitive to sea-surface temperature, relative humidity and the moisture-source region. The three uses are: **palaeothermometry from ice**, where the $\delta^{18}\mathrm{O}$ and $\delta^{2}\mathrm{O}$ of polar ice are calibrated against temperature at $0.67$ ‰ K$^{-1}$ for $\delta^{18}\mathrm{O}$ and give the Antarctic and Greenland records; **palaeoaltimetry**, where the $\delta^{2}\mathrm{H}$ of hydrated minerals — the structural hydroxyl of biotite, muscovite and volcanic glass — records the isotopic composition of meteoric water at the time of growth, whose decline with elevation gives the uplift history of the Tibetan Plateau and the Colorado Plateau; and **hydrology**, where the same two variables separate recharge sources, quantify evaporation and date groundwater by its tritium, $^{14}\mathrm{C}$ and $^{39}\mathrm{Ar}$ contents.
:::

::: definition Carbon, oxygen and the carbonate record {#def-carbonate}
The carbon isotope composition of the exogenic carbon cycle is a **mass balance on the organic carbon reservoir**. Mantle carbon is $-5$ ‰, marine carbonate is $0$ ‰ by definition of the PDB standard, and organic carbon is $-25$ ‰, so **any excursion in the $\delta^{13}\mathrm{C}$ of carbonate records a change in the ratio of organic carbon to carbonate being buried**, and a negative excursion records either the addition of isotopically light carbon or a fall in organic carbon burial. The oxygen isotope composition of a carbonate is the product of **two** controls that must be separated: the **temperature** of precipitation, through the equilibrium carbonate–water fractionation, and the **$\delta^{18}\mathrm{O}$ of the water**, which in the ocean is controlled by global ice volume. The two are separated by pairing $\delta^{18}\mathrm{O}$ with an **independent thermometer** — Mg/Ca, the U/K' ratio, the clumped-isotope $\Delta_{47}$ temperature, or the faunal assemblage — and the resulting **residual** is the ice-volume signal that underpins the entire benthic foraminiferal $\delta^{18}\mathrm{O}$ stratigraphy and its orbital tuning. The **clumped-isotope** thermometer, which measures the excess abundance of $^{13}\mathrm{C}$–$^{18}\mathrm{O}$ bonds in the same carbonate molecule ($\Delta_{47}$, about 0.09 ‰ at 25 °C falling to about 0.055 ‰ at 90 °C), is the first carbonate thermometer that is **independent of the water composition**, and it has therefore rewritten the temperature of the Cretaceous ocean, of diagenetic cements and of hydrothermal systems.
:::

::: example A Cretaceous sea-surface temperature {#ex-paleoT}
A well-preserved Turonian inoceramid from a palaeolatitude of 60° S has $\delta^{18}\mathrm{O} = -4.0$ ‰ (PDB). Using the palaeotemperature relation
$$
T(^\circ\mathrm{C}) = 16.9 - 4.38(\delta_c - \delta_w) + 0.10(\delta_c - \delta_w)^2
$$
with $\delta_c$ in ‰ PDB and $\delta_w$ in ‰ SMOW, find the sea-surface temperature for (a) an ice-free ocean with $\delta_w = -1.0$ ‰ and (b) a seawater $\delta_w = +1.0$ ‰, and interpret the difference.
::: solution
**(a)** $\delta_c - \delta_w = -4.0 - (-1.0) = -3.0$:
$$
T = 16.9 + 13.14 + 0.90 = 30.9\ ^\circ\mathrm{C}.
$$
**(b)** $\delta_c - \delta_w = -4.0 - 1.0 = -5.0$:
$$
T = 16.9 + 21.90 + 2.50 = 41.3\ ^\circ\mathrm{C}.
$$
A sea-surface temperature of **31 °C at 60° S** is already 8 °C warmer than any modern ocean surface, and 41 °C exceeds the thermal tolerance of most marine life. This is the **equable climate problem** of the mid-Cretaceous: the oxygen isotope data require either frost-free polar conditions with sea-surface temperatures of 20–30 °C at 60–90° latitude, or a seawater $\delta^{18}\mathrm{O}$ very different from the assumed value, or a diagenetic or vital-effect bias in the carbonate.

The three escape routes are actively debated. The **seawater** route argues that an ice-free ocean with intensified low-latitude evaporation and a different high-latitude hydrological cycle could carry a $\delta^{18}\mathrm{O}$ of $+1$ to $+2$ ‰ at high latitude, which alone removes 10 °C from the answer. The **diagenesis** route notes that inoceramid prisms are aragonite and are notoriously recrystallised, and that a 1 ‰ shift in $\delta^{18}\mathrm{O}$ from burial cement is worth 4 °C; the test is the **clumped-isotope** temperature, which is unaffected by the water composition and which on well-preserved material gives 15–20 °C at high latitude — supporting a **lower-temperature, higher-$\delta^{18}\mathrm{O}$ seawater** interpretation. The **vital effect** route notes that different taxa fractionate differently and that the calibration must be made on the same or a closely related taxon.

The lesson generalises to every carbonate palaeothermometer: **$\delta^{18}\mathrm{O}$ alone gives a temperature only if the water composition is known, and gives the water composition only if the temperature is known.** The clumped isotope, the Mg/Ca and the U/K' ratios are the three ways of breaking the degeneracy, and no palaeotemperature estimate published without one of them, or without an independent argument for the water composition, should be taken at face value.
:::
:::

::: example Mass-dependent and mass-independent sulphur {#ex-d33s}
An Archaean barite has $\delta^{34}\mathrm{S} = -2.0$ ‰ and $\delta^{33}\mathrm{S} = +0.90$ ‰. A modern marine sulphate has $\delta^{34}\mathrm{S} = +21.0$ ‰ and $\delta^{33}\mathrm{S} = +10.80$ ‰. Compute $\Delta^{33}\mathrm{S}$ for both and interpret.
::: solution
For a mass-dependent process the per-mil deviations are related by the ratio of the mass differences,
$$
\Delta^{33}\mathrm{S} = \delta^{33}\mathrm{S} - 0.515\,\delta^{34}\mathrm{S},
$$
so that $\Delta^{33}\mathrm{S} = 0$ for any mass-dependent fractionation however large. For the modern sulphate,
$$
\Delta^{33}\mathrm{S} = 10.80 - 0.515\times21.0 = 10.80 - 10.82 = -0.02\ \text{‰},
$$
which is zero within the analytical precision of 0.02 ‰. For the Archaean barite,
$$
\Delta^{33}\mathrm{S} = 0.90 - 0.515\times(-2.0) = 0.90 + 1.03 = +1.93\ \text{‰},
$$
which is **one hundred times** the analytical precision and cannot be produced by any equilibrium or kinetic fractionation, because every chemical reaction scales its heavy-isotope enrichment by the same 0.515 factor.

The only known process that breaks the scaling is the **photolysis of SO$_2$ by ultraviolet light of wavelength below 220 nm**, which is a **nuclear-volume (isotope-selective) effect** on the absorption cross-section rather than a mass-dependent one, and which requires that the ultraviolet radiation reach the lower atmosphere. In an atmosphere with an ozone layer, ultraviolet-C is absorbed high up and the reaction does not proceed; in an anoxic atmosphere it proceeds, and the resulting sulphur species carry a large, variable $\Delta^{33}\mathrm{S}$ that is inherited by the sulphates and sulphides that precipitate from them.

The stratigraphic consequence is the single cleanest line of evidence in Precambrian geochemistry. $\Delta^{33}\mathrm{S}$ is **large and variable** ($\pm 1$ to $\pm 7$ ‰) in every sediment older than 2.45 Ga, becomes **abruptly zero** between 2.49 and 2.45 Ga, and stays at zero — with small reversals to $\pm 0.3$ ‰ between 2.31 and 2.09 Ga, during which mass-independent fractionation briefly returned — for the rest of the Proterozoic. The 2.45-Ga horizon is therefore a **date for the permanent establishment of an ozone layer**, and hence of a critical threshold in atmospheric oxygen, and it is independent of every other proxy for oxygenation. The reversals at 2.31–2.09 Ga are read as **oscillations** in which methanogen-derived methane suppressed the ozone layer transiently, and their absence after 2.05 Ga marks the final stabilisation of the oxidising atmosphere.
:::
:::

::: definition Sulphur, and the mass-independent exception {#def-sulfur}
Sulphur has four stable isotopes, and its isotope geochemistry is built on two ratios carrying completely different information. The **mass-dependent** ratio $\delta^{34}\mathrm{S}$ ranges from about $-40$ ‰ in bacterial pyrite to $+21$ ‰ in modern seawater sulphate, and the 60-per-mil amplitude of the **bacterial sulphate reduction** fractionation makes $\delta^{34}\mathrm{S}$ the definitive tracer of microbial sulphate reduction in sediments, of the sulphide source in ore deposits, and of the size of the **pyrite sulphur burial** flux that controls atmospheric oxygen through the reaction $\mathrm{CH_2O} \to$ organic matter and $\mathrm{SO_4^{2-}} \to \mathrm{pyrite}$, both of which leave oxygen behind. The **mass-independent** ratio $\Delta^{33}\mathrm{S} = \delta^{33}\mathrm{S} - 0.515\,\delta^{34}\mathrm{S}$ is something entirely different: it is non-zero only where a process **violates the mass-dependent scaling**, and the only known natural process that does so is the **photochemical photolysis of SO$_2$ by ultraviolet light** in an atmosphere **transparent to UV-C**, which requires an ozone layer to be absent. Mass-independent sulphur is therefore a **direct proxy for the absence of a permanent oxidising ozone layer**, and its disappearance from the sedimentary record at 2.45 Ga is the single most direct evidence for the **Great Oxidation Event**, while its reappearance in small amounts at 2.31–2.09 Ga records the transient, oscillating state of the earliest atmosphere.
:::

::: example Mass balance of a carbon isotope excursion {#ex-cie}
The onset of the Palaeocene–Eocene thermal maximum is marked by a $-3$ ‰ shift in the $\delta^{13}\mathrm{C}$ of marine carbonate. Taking the ocean–atmosphere inorganic carbon reservoir as $38{,}000$ Gt C at $\delta^{13}\mathrm{C} = 0$ ‰ and the injected carbon as methane-derived with $\delta^{13}\mathrm{C} = -25$ ‰, find the mass of carbon added.
::: solution
Isotope mass balance on the combined reservoir:
$$
M\delta_0 + m\delta_a = (M+m)\delta_1,
$$
$$
38{,}000\times 0 + m(-25) = (38{,}000+m)(-3),
$$
$$
-25m = -114{,}000 - 3m, \qquad -22m = -114{,}000, \qquad m = 5{,}180\ \mathrm{Gt\ C}.
$$
The excursion therefore requires the injection of about **5200 Gt of carbon** — equivalent to a layer of methane hydrate 10 m thick over the deep-sea floor, or about 1.4 times the entire modern fossil-fuel reservoir.

Three features of the calculation are the substance of the interpretation. The result is **linear in the assumed end-member composition**: if the injected carbon was at $-60$ ‰ (methane oxidised in the sediment) the required mass falls to 2300 Gt C, and if it was at $-15$ ‰ (thermogenic carbon or bulk organic matter) it rises to 9500 Gt C, so the excursion's amplitude constrains the carbon mass only to a factor of four. The result is **linear in the reservoir size**, so an excursion recorded in a **freshwater** or **lacustrine** reservoir of 500 Gt C requires only 70 Gt C, which is why the same excursion has wildly different mass estimates in different archives. And the calculation is a **one-box, instantaneous** balance: the real excursion has a **shape** — a rapid negative onset, a flat or recovering body, and a recovery over 100–200 kyr — and the shape, combined with the **osmium, mercury and boron** records from the same horizon, is what distinguishes a single injection from a sustained input and what makes the carbon-cycle **modelling** of the event possible.

The same arithmetic underlies the modern comparison: the 400 Gt C of fossil-fuel carbon already released, at $\delta^{13}\mathrm{C} = -25$ ‰, has lowered the atmospheric $\delta^{13}\mathrm{C}$ by about 2 ‰ against a pre-industrial reservoir of 600 Gt C, and the **Suess effect** is the same mass balance run with a much smaller reservoir and a much lighter end-member.
:::
:::

::: warning A stable isotope ratio is never a single-variable measurement
The single most common error in the interpretation of a stable isotope ratio is to treat it as a measurement of one variable. **Oxygen in carbonate** is a function of temperature, of water composition, of the carbonate species precipitated, of the vital effect of the organism and of the diagenetic history, and no single one of these can be eliminated without a second, independent measurement — which is why the phrase "the $\delta^{18}\mathrm{O}$ palaeothermometer" is shorthand for a **system** of at least two thermometers. **Carbon in carbonate** records the dissolved inorganic carbon $\delta^{13}\mathrm{C}$, the **respiratory** carbon added by soil CO$_2$ in a freshwater or soil-carbonate system (which can depress the value by 5–10 ‰ with no change in the global carbon cycle), the **species** precipitated, and the degree of recrystallisation, and a "negative carbon isotope excursion" in a continental section may record nothing more than the development of a soil. **Sulphur in pyrite** records the isotope composition of the **sulphate**, the **degree of completion** of bacterial reduction (an open system gives $-40$ ‰, a closed system gives the sulphate value by Rayleigh distillation as the sulphate runs out), and **secondary exchange** with pore-water sulphide during diagenesis and metamorphism, which can reset $\delta^{34}\mathrm{S}$ by tens of per mil without changing the mineral's texture. **Hydrogen in a hydrated mineral** records the meteoric water at the time of **growth**, not at the time of the tectonic event being dated, and a biotite that grew at 400 °C in a metamorphic rock has an oxygen and hydrogen isotope composition set at that temperature and reset only if it is later heated above its closure temperature. And **all isotope data are subject to the "vital effect" and to the "vital-effect calibration problem"**: the same species precipitating at the same temperature in the same water can differ by 1–2 ‰ between individuals, and the calibration must be made on the same taxon, from the same environment, or the temperature error is 8 °C. The discipline is to state the **phase, the standard, the fractionation equation and its temperature, the calibration material, the diagenetic tests performed, and the second independent proxy** for every isotope-based interpretation, and to treat a single isotope ratio as a **hypothesis about a process** rather than a measurement of a variable.
:::

::: history
**Urey** (Urey) predicted the isotope-exchange effects in 1947 and, with **Bigeleisen** (Bigeleisen), calculated the first equilibrium fractionation factors; **Epstein** (Epstein) and **Lowenstam** (Lowenstam) published the first oxygen-isotope palaeothermometer on a shell in 1953, and **Urey** gave the famous 1952 *Geochimica et Cosmochimica Acta* paper "The thermodynamic properties and isotopic fractionation of compounds". **Craig** (Craig) established the SMOW and PDB standards and the global meteoric water line in 1961, **Dansgaard** (Dansgaard) the ice-core isotope record in 1964, and **Lorius** (Lorius) and **Jouzel and Petit** (Jouzel) the Antarctic temperature reconstruction. **Clayton, Gross and Maynard** (Clayton) built the equilibrium fractionation database and the **three-isotope sulphur plot** in 1957, **Thode and Peterson** (Thode) established the bacterial sulphate-reduction fractionation in 1954, and **Kaplan, Rittenberg, Nissenbaum and Nielsen** (Kaplan) the sulphur isotope biogeochemistry. **Veizer** (Veizer) built the Phanerozoic seawater isotope curve, **Algeo, Shen and Knoll** (Algeo) the mass-extinction isotope record, and **Clayton and Kump** (Kump) the equable-climate synthesis. **Farquhar, Bao and Thiemens** (Thiemens) discovered mass-independent sulphur fractionation in Archean samples in 2000 and **Pavlov and Kasting** (Kasting) gave the photochemical interpretation the same year; **Johnston** (Johnston), **Planavsky, Lyons and Reinhard** (Lyons) and **Crowe** (Crowe) refined the 2.45-Ga and 2.31-Ga records. **Ghosh, Affek, Hren and Eiler** (Eiler) developed **clumped-isotope** thermometry from 2007, and **Tripati, Elder and Dettman** (Tripati) applied it to palaeoaltimetry and to the terrestrial record. **Hoefs** (Hoefs) and **Nielsen** (Nielsen) wrote the standard sulphur and hydrogen isotope reviews, and **Clark and Fritz** (Fritz) the isotope-hydrology synthesis.
:::

## Where this leads

The Rayleigh equation and its use in weathering are in [[geochemistry/weathering-chemistry]], the isotope composition of water and the hydrological cycle are in [[hydrology/groundwater-flow]] and [[hydrology/contaminant-transport]], the carbonate and ice records are in [[palaeoclimate/proxies]] and [[palaeoclimate/ocean-sediments]], the oxygenation of the atmosphere is in [[earth-history/oxygen-proterozoic]] and [[earth-history/early-earth]], the ore-deposit applications are in [[earth-resources/magmatic-hydrothermal]] and [[earth-resources/sedimentary-ores]], the clumped-isotope and palaeoaltimetric applications are in [[structural-geology/orogens]] and [[geomorphology/landscape-evolution]], and the radiogenic counterparts are in [[geochemistry/radiogenic-tracers]].

::: quiz
A ground-water sample plots **below** the global meteoric water line, with a deuterium excess of $-6$ ‰, on a $\delta^{2}\mathrm{H}$ against $\delta^{18}\mathrm{O}$ diagram. What does that indicate?
- [ ] Recharge at a much colder temperature than present.
- [x] Evaporation under low humidity, which enriches $^{18}$O relative to $^{2}$H and raises the deuterium excess.
- [ ] A deep mantle source.
- [ ] Mixing with seawater.
::: solution
Evaporative enrichment moves a water **along a slope of about 5** in $\delta^{2}$H against $\delta^{18}$O space, well below the equilibrium slope of 8, so an evaporated water plots **below and to the right** of the meteoric water line with a **low** deuterium excess. A point far to the **right** with a **high** deuterium excess instead indicates vapour that evaporated from a **warm, dry** source region — a continental moisture source rather than an oceanic one — which is the standard reading of the high deuterium excess in glacial-age ice and of the "deuterium excess" palaeoclimate record. Mixing with seawater moves a sample along a mixing line toward $\delta^{18}$O of 0 with **no** change in slope, and a mantle water plots on the meteoric line with a magmatic $\delta^{18}$O of about $+6$ ‰ in the mineral it is hosted in.
:::
:::

::: summary
- Isotope fractionation is a zero-point-energy effect that scales as $1/T^2$ and as $\Delta m/m$; hydrogen is by far the most sensitive system.
- Equilibrium fractionations are small, symmetric and temperature-dependent; kinetic fractionations are large, irreversible and follow the Rayleigh law $\delta = \delta_0 + \varepsilon\ln f$.
- The $\delta^{18}$O and $\delta^{2}$H of water are a physical tracer of evaporation, condensation temperature and mixing, and the deuterium excess is a separate variable.
- A carbonate $\delta^{18}$O records temperature and water composition together; only a second, independent thermometer can separate them.
- A carbonate $\delta^{13}$C is a mass balance on the organic carbon cycle, and an excursion's amplitude converts to a carbon mass only when the end-member composition is known.
- Mass-independent sulphur fractionation requires a UV-transparent, ozone-free atmosphere, and its disappearance dates the Great Oxidation Event.
:::

## Exercises

::: exercise Per mil arithmetic {level=1 check="20"}
A carbonate has $^{13}\mathrm{C}/^{12}\mathrm{C} = 0.0112596$ and the PDB standard is 0.0112372. Find $\delta^{13}\mathrm{C}$.
::: solution
$\delta^{13}\mathrm{C} = (0.0112596/0.0112372 - 1)\times1000 = (1.001993-1)\times1000 = +20$ ‰. Per mil, not per cent: a common error of a factor of ten, and the reason isotope data are always quoted with the standard named.
:::
:::

::: exercise The temperature dependence {level=1 check="2.5"}
An equilibrium fractionation is 10 ‰ at 300 K. Estimate it at 600 K.
::: solution
Fractionations scale as $1/T^2$, so $10\times(300/600)^2 = 10/4 = 2.5$ ‰ — approximately 2–3 ‰. This is why isotope thermometry is precise at low temperature and hopeless above 600 °C, and why the isotope compositions of high-grade metamorphic rocks and of igneous minerals record their **formation** rather than their metamorphism.
:::
:::

::: exercise Rayleigh distillation {level=1 check="51"}
A nitrate pool with $\delta^{15}\mathrm{N} = +5$ ‰ is 90 per cent consumed by denitrification with $\varepsilon = -20$ ‰. Find the $\delta^{15}\mathrm{N}$ of the remaining nitrate.
::: solution
$\delta = 5 + (-20)\ln(0.10) = 5 + (-20)(-2.303) = 5 + 46 = 51$ ‰. The residual pool becomes extremely enriched, which is why the nitrate at the end of a denitrifying aquifer or oxygen-minimum zone carries a very heavy nitrogen isotope signature and why the **isotope composition of the product**, not just of the reactant, must be measured to identify the process.
:::
:::

::: exercise The meteoric water line {level=1 check="14"}
A groundwater has $\delta^{18}\mathrm{O} = -8.0$ ‰ and $\delta^{2}\mathrm{H} = -50$ ‰. Find its deuterium excess.
::: solution
$d = \delta^{2}\mathrm{H} - 8\delta^{18}\mathrm{O} = -50 - 8(-8.0) = -50 + 64 = +14$ ‰. A value near 10 is the global mean for precipitation; 14 indicates a moisture source with a warm, dry sea-surface or a substantial continental recycling component, and values below 5 indicate an oceanic source in high humidity.
:::
:::

::: exercise A palaeothermometer {level=2 check="14.7"}
A fossil shell has $\delta^{18}\mathrm{O} = +0.5$ ‰ (PDB) and the water had $\delta^{18}\mathrm{O} = 0$ ‰ (SMOW). Use $T = 16.9 - 4.38\Delta + 0.10\Delta^2$ to find the temperature.
::: solution
$\Delta = 0.5$, so $T = 16.9 - 2.19 + 0.025 = 14.7$ °C — about 15 °C. The same shell at $-1.5$ ‰ would give 33 °C, so a 2 ‰ analytical or diagenetic uncertainty is worth nearly 20 °C, which is why the **replication** of carbonate isotope data (typically 8–20 individual shells) and the **petrographic screening** for recrystallisation are not optional.
:::
:::

::: exercise A carbon isotope mass balance {level=2 check="2000"}
Redo the Palaeocene–Eocene carbon-mass calculation with a methane end-member of $\delta^{13}\mathrm{C} = -60$ ‰.
::: solution
$-60m = -3(38{,}000+m)$, so $-57m = -114{,}000$ and $m = 2000$ Gt C. A factor of 2.5 change in the end-member composition produces a factor of 2.5 change in the required carbon mass, which is the single largest uncertainty in every carbon-isotope-excursion interpretation.
:::
:::

::: exercise Ice volume from oxygen isotopes {level=3 check="105"}
Assume that glacial ice has a mean $\delta^{18}\mathrm{O}$ of $-35$ ‰ and the interglacial ocean of 0 ‰ with a volume of $1.37\times10^{9}$ km³. Find the volume of water transferred to the ice sheets when the ocean's $\delta^{18}\mathrm{O}$ rises by 1.0 ‰, and the corresponding sea-level fall on an ocean area of $3.61\times10^{8}$ km².
::: solution
Mass balance: $0 = (V_o - V_i)(+1.0) + V_i(-35)$, so
$$
1.37\times10^{9} = V_i(1.0 + 35) = 36V_i, \qquad V_i = 3.8\times10^{7}\ \mathrm{km^3}.
$$
The sea-level fall is
$$
\frac{3.8\times10^{7}}{3.61\times10^{8}} = 0.105\ \mathrm{km} = 105\ \mathrm{m}.
$$
So **1 ‰ of seawater $\delta^{18}\mathrm{O}$ is worth about 100 m of eustatic sea level**, and the 1.8 ‰ difference between the late-Quaternary glacial and interglacial benthic $\delta^{18}\mathrm{O}$ corresponds to about 180 m of ice — close to the 120 m of the last glacial maximum once the 0.4–0.6 ‰ deep-water **temperature** component of the benthic signal is removed. The calibration is the foundation of the entire **isotope stratigraphy** and of the orbital tuning of the Quaternary, and its weakness is the assumption of a constant $-35$ ‰ mean ice composition, which varies with the geography of the ice sheets and is a 20 per cent systematic uncertainty on every ice-volume number.
:::
:::

::: exercise Kinetic isotope effects and productivity {level=3 check="-27"}
A lake's dissolved inorganic carbon has $\delta^{13}\mathrm{C} = -8$ ‰ and is 95 per cent consumed by C3 aquatic photosynthesis with an enrichment factor of $\varepsilon_p = -19$ ‰. Find the $\delta^{13}\mathrm{C}$ of the **residual dissolved inorganic carbon** and of the organic carbon formed **at that moment**, and explain why a closed-basin lacustrine carbonate is heavier than an open-lake one at the same productivity.
::: solution
The residual dissolved inorganic carbon follows the Rayleigh law with $f = 0.05$:
$$
\delta_{DIC} = -8 + 1000\ln\alpha\times\ln f \;\to\; -8 - (-19)\ln(1/0.05) = -8 + 19\times3.00 = +49\ \text{‰},
$$
using $\delta = \delta_0 - \varepsilon_p\ln(1/f)$ for the residual reactant when the product is removed. The organic carbon formed at that instant is lighter by the fractionation,
$$
\delta_p = \delta_{DIC} + \varepsilon_p = 49 - 19 = +30\ \text{‰}.
$$
The **cumulative** organic carbon, by contrast, is fixed at $\delta_0 + \varepsilon_p = -8 - 19 = -27$ ‰ no matter how far the reaction proceeds, because in a Rayleigh process with complete removal the **integrated** product has the composition of the initial reactant shifted by the fractionation.

The interpretation follows directly. In a **closed** basin where photosynthesis consumes most of the dissolved inorganic carbon, the residual carbon pool becomes extremely heavy, so the **carbonate** precipitated from it becomes extremely heavy — values of $+5$ to $+15$ ‰ are common in saline lakes — while the **organic** carbon stays at $-27$ ‰. In an **open** lake, where the dissolved inorganic carbon is continuously replenished from soil CO$_2$ and the atmosphere, both stay near their source values. A heavy lacustrine carbonate is therefore evidence for a **closed hydrology and a high utilisation of carbon**, not simply for high productivity, and the two are separated by measuring the **organic** carbon from the same horizon: if the organic $\delta^{13}$C is also heavy, the source changed; if the organic stays at $-27$ ‰ while the carbonate rises, it is the Rayleigh effect.
:::
:::

