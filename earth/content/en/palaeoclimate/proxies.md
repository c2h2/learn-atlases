A thermometer is an instrument; a foraminifer shell, a pine tree, a stalagmite and a cubic kilometre of glacier ice are thermometers too — built without engineers, calibrated against physics, and reading out a climate that no human recorded. **Palaeoclimate** is the science of those instruments, and **proxies** are their sensing elements: measurable properties of archived material that vary with the environment that formed them. The discipline's entire credibility rests on a deceptively simple workflow — find an archive with (i) a physical mechanism linking property to climate, (ii) a chronology, however crude, and (iii) a way to test the link against the instrument record where the two overlap — and its entire literature is the art of honouring that workflow against the archives' treacheries: vital effects, diagenesis, time-averaging, non-analogue climates, and the seductive space-for-time shortcut that mistakes a gradient across landscape for a change through history. This lesson is the toolkit; the courses that follow (ocean sediments, ice cores, deep time, the Holocene) are what the toolkit built.

## The logic of a proxy

::: definition Proxies, calibration, and the test of the instrument era {#def-proxy-logic}
A **proxy** is a measured variable $x$ (isotope ratio, ring width, pollen percentage, alkenone unsaturation) held to track a climate variable $T$ through a **physical mechanism** — the fractionation of isotopes at different temperatures, the biochemistry of a plant adjusting its membranes to grow in cold water, the physics of snow densification. The mechanism earns the proxy its validity; the **calibration** earns it numbers: regress $x$ against $T$ in the modern world (network regression, core-top sediments, culture experiments for the biochemical indices), hold back independent sites to **verify** skill, and state the uncertainty honestly — which for most proxies means an standard error of several degrees on a single point, beat down to fractions of a degree only by averaging across many records. The three standing traps are worth naming early. **Space-for-time substitution**: inferring that a pollen assemblage's change *through time* at one site equals the change *across space* today — valid only if species track climate as they did, which non-analogue vegetation (the closed spruce forests of glacial Illinois, no modern analogue anywhere) violates; the field's transfer functions (CLIMAP's 1981 synthesis being the famous first) are unrepentant space-for-time machinery, defended by verification and attacked by philosophers ever since. **Time-averaging**: every archive low-passes its signal — bioturbation smears centimetres of sediment across millennia, a 20-year tree records a 20-year mean — so abrupt events are attenuated by the archive's own physics, and "absence of evidence" in a smeared record is not evidence of absence. **The divergence problem**: tree-ring *width* in high-latitude dense networks stopped tracking summer temperature after ~1950 (the effect that made "trees good for the past, unreliable for the present" a serious literature rather than an insult), a warning that calibration periods are not forever and that every proxy must be re-checked against the instrument era it claims to extend. The discipline's answer to its own doubts is **replication and hierarchy**: a reconstruction from one core is an anecdote; from a network with mechanism, chronology and verification, it is physics — the same evidential logic that made the hockey-stick debates, for all their heat, a story of the method working.
:::

::: example Calibrating a thermometer made of sapwood {#ex-calibration}
A network of 400 sites gives ring density vs June–August temperature: $\hat{T} = 12 + 0.02\,\mathrm{density\ index}$, residual scatter $\sigma = 1.8$ °C. A fossil series averages 25 rings to an index of 46. Find the temperature estimate, its standard error for that single mean, and how many independent such means you would need for a 0.2 °C standard error on their average.
::: solution
$\hat{T} = 12 + 0.02\times46 = 12.9$ °C with standard error 1.8 °C (the scatter of single points dominates; averaging 25 rings reduces measurement noise, not climate scatter, if the years are truly what you are estimating). For the network average: $n = (1.8/0.2)^{2} = 81$ independent means — the arithmetic behind every "we cored 300 trees" methods section, and the reason reconstructions speak in multi-decadal means: the noise is irreducible per year, and only replication, across trees and across sites, buys the tenth of a degree.
:::
:::

## The isotope foundation

::: definition δ notation and the two great fractionations {#def-isotopes}
Palaeoclimate speaks in **delta values**: $\delta = \left(R_{\mathrm{sample}}/R_{\mathrm{standard}} - 1\right)\times1000$ in per mille, where $R$ is a heavy-to-light isotope ratio ($^{18}\mathrm{O}/^{16}\mathrm{O}$, D/H, $^{13}\mathrm{C}/^{12}\mathrm{C}$) against a standard (VSMOW for water isotopes, VPDB for carbon) — so δ¹⁸O = −30 ‰ in a polar snow means the water is 3 per cent depleted in ¹⁸O relative to the ocean it evaporated from. Two fractionations do almost all the work. **(1) The hydrological fractionation**: evaporation prefers light water, condensation strips heavy water out first, and each successive storm downwind or poleward is therefore isotopically lighter — which makes polar ice a **paleothermometer** (colder air holds less moisture, more distillation, more depletion: Dansgaard's empirical slope, ~0.6–0.7 ‰ δ¹⁸O per °C over Greenland, is the most-used number in ice-core science) and makes the same isotope, preserved in carbonates, a mixed thermometer-**and**-ice-volume signal (glacial δ¹⁸O of foraminifera is ~2 ‰ heavier than Holocene: ~1 ‰ from deep-water temperature, ~1 ‰ from the¹⁸O-enriched ocean left behind when glaciers locked up light water — the IMBIE deep-sea stack's whole interpretive art is separating these). **(2) The photosynthetic fractionation**: Rubisco and diffusion discriminate against ¹³C, C3 plants record ~−25 ‰, C4 plants ~−12 ‰, and marine phytoplankton's discrimination varies with dissolved CO₂ — so δ¹³C maps vegetation (the C4 expansion of the late Miocene, the C3/C4 ratio that dates the monsoon's aridification), records the carbon cycle's perturbations (every carbon-cycle injection carries a negative δ¹³C excursion — the fingerprint that identifies PETM and PETM-like events as carbon-cycle events rather than mere warmings), and, in the boron and δ¹³C of planktonic shells, even constrains past atmospheric CO₂ itself. The general rule the isotope geochemists live by: **no proxy without a mechanism, no number without a calibration, no reconstruction without a chronology** — the three tests that organize every archive below.
:::

::: example Reading temperature out of a stalagmite {#ex-delta}
A speleothem calcite has δ¹⁸O = +21.0 ‰ on the VSMOW scale and the palaeo-dripwater is estimated at −9.0 ‰ VSMOW. Using the calcite–water fractionation $\Delta = 32.4 - 0.24\,T$ (Δ and δ in ‰, T in °C), find the cave temperature.
::: solution
$\Delta = \delta_{\mathrm{calcite}} - \delta_{\mathrm{water}} = 21.0 - (-9.0) = 30.0$ ‰, so $T = (32.4 - 30.0)/0.24 = 10$ °C. Two cautions the exercise teaches: the sample's δ value is meaningless without the **water's** δ value (the reason speleothem δ¹⁸O is read as a *change*, not an absolute temperature, while corals and foraminifera with known-seawater δ¹⁸O can be thermometers in absolute terms), and the fractionation equation is a calibration — swap in the wrong standard scale (PDB versus VSMOW differ by ~31 ‰ for carbonates) and the cave comes out molten or frozen.
:::
:::

## The archive zoo

::: definition Biological, cave and lake, physical and human archives {#def-archive-zoo}
**Trees** (dendrochronology, founded by **A. E. Douglass**, who proved rings could date by cross-matching and carried tree rings into archaeology): annual resolution, absolute chronologies running 12,000+ years by overlapping living trees to subfossil wood; ring *width* for moisture and (in the high-latitude moisture-limited zone) warmth, maximum latewood **density** for summer temperature (the proxy behind **Keith Briffa**'s high-density networks), and the isotopes in cellulose for humidity; the price is short, patchy, land-dominated coverage and the divergence problem. **Pollen** (the quantitative tradition of **Faegri and Iversen**): wind-pollen rain is regionally representative, the taxa are identifiable to species level in many families, and transfer functions turn percentage curves into temperature and precipitation with ~1–2 °C skill on millennial means — the backbone of Quaternary vegetation-climate science, blind (like all terrestrial archives) to the oceans that drive the climate. **Marine and lake microfossils**: foraminifera (calcite tests: δ¹⁸O, Mg/Ca, δ⁴⁴/⁴⁸Li, and assemblages), diatoms (silica, the lakes and the sea, salinity and ice), radiolarians, ostracods, chironomids (head capsules; the shallow-lake summer-temperature workhorse of the Arctic, skill ~1 °C), and the **alkenones** — long-chain ketones that haptophyte algae tune for membrane fluidity, whose unsaturation index $U^{K'}_{37}$ is a liquid-evaporation thermometer of startling precision (±0.5 °C on single cores) and the basis of most Cenozoic sea-surface temperature curves (their discovery by **Brassell, Eglinton and colleagues** in 1978 created the field). **Speleothems** (the isotope revolution of the 2000s): laminated calcite, U–Th dated to a few decades' precision through 600 kyr, δ¹⁸O tracking moisture source and amount, trace elements and fluid inclusions adding seasonality — the archives that moved abrupt-change detection from ice into the continents, at the cost of a δ¹⁸O signal that mixes rain-rate, source and route and must be read site by site. **Ice sheets** (the next lesson's subject), **lake sediments** (varved lakes: annual laminations as the continental analogue of tree rings; the Salton Sea, Huron, and the African rift lakes), **corals** (annual bands, U-Th, δ¹⁸O and Sr/Ca at *seasonal* resolution — the only archive that reads ENSO directly in the fossil), **boreholes** (the temperature logs of kilometres of continental rock, the slowest thermometer on Earth and the only one that integrates decades-centuries without biology), and **human archives** (written harvest and freeze records — the Chinese chronicles, the European chronicles, the Icelandic annals — whose hard centuries are the calibration data of the last-two-millennia lesson). No single archive spans the range; the discipline's strength is **multiproxy convergence** — when ice, mud, cave, tree and document independently point the same way, palaeoclimate stops being interpretation and becomes measurement.
:::

::: example An age model from a sediment core {#ex-agemodel}
A lake core has a dated tephra at 2.0 m (14C age 8,000 yr) and the surface is modern; assume constant sedimentation between. Find the age of a sample at 0.5 m, and the age resolution (years per mm of sampling) if you sample at 2 mm intervals.
::: solution
Sedimentation rate $= 2.0\ \mathrm{m}/8000\ \mathrm{yr} = 0.25\ \mathrm{mm\,yr^{-1}}$; the 0.5 m sample lies $1.5\ \mathrm{m}$ above the tephra $= 6000$ yr older than the surface, so its age is $8000 - 6000 = 2000$ yr. Resolution: 2 mm at 0.25 mm yr⁻¹ is **8 years per sample** — fine for centuries-scale events, hopeless for a single decade, and the bioturbated top few centimetres will smear even that: the exercise is why every paper prints its age model and its sampling resolution before it prints a climate curve.
:::
:::

## Reading the carbon gas itself

::: definition CO₂ proxies and the thermometer problem {#def-co2-proxies}
The hardest palaeoclimate numbers are the ones the discipline most wants: past atmospheric CO₂ and past absolute temperature, each because its proxies are weakest exactly where they are most needed. **CO₂ proxies** come in three families. **Stomatal frequency**: leaves develop fewer stomata per unit area as CO₂ rises — a physiological calibration possible in any botany lab and measurable on fossil cuticles — so deep-time CO₂ curves exist for the Devonian through the Neogene wherever leaves are preserved, with the caveats that the response saturates at high CO₂ and species-specific offsets demand careful botanical identification. **Boron isotopes** (δ¹¹B of foraminiferal calcite): seawater borate's δ¹¹B is a direct function of pH, and pH together with an alkalinity estimate gives CO₂ — the only chemical thermometer for the gas, the basis of the Cenozoic CO₂ curve and of the ocean-acidification analogue for today, limited by the need to reconstruct past seawater carbonate chemistry (the same degeneracy that haunts the pH–alkalinity system today, run in reverse on million-year cores). **Palaeobotanical and paleosol carbonate** (δ¹³C and leaf-margin mass-balance) fill the terrestrial gaps. The **thermometer problem** is its twin: the absolute thermometers — clumped isotopes (Δ₄₇, the temperature-dependent bonding of ¹³C–¹⁸O into the same carbonate molecule, invented by **Ghosh and Eiler** in 2006 and now a real geothermometer with diagenesis caveats), the Mg/Ca and Li/Ca ratios, the TEX₈₆ membrane-lipid index, and the fish-otolith and bioapatite oxygen ratios — each carries systematic offsets, vital effects and calibration debates, and their disagreements at the hot end (were tropical Cretaceous oceans 5 °C warmer than they look, or was the water isotopically heavy?) are the active frontier. The methodological moral the whole lesson carries forward: **treat every proxy as an instrument with a calibration curve, a noise floor, and a failure regime** — and treat any single number that changes a textbook as a hypothesis awaiting its second archive.
:::

::: example Stomata as a CO₂ dial {#ex-stomata}
A ginkgo cultivar develops stomatal index $S = 20 - 0.008\,C$ (C in ppm, valid 200–800 ppm) and a fossil Ginkgo leaf from the PETM (56 Ma) has S = 8. Estimate its CO₂, and explain why the estimate is quoted with a factor, not a sigma.
::: solution
$C = (20-8)/0.008 = 1500$ ppm — beyond the calibration's 800 ppm ceiling, so the number is an **extrapolation**, and the honest statement is "≥800 ppm, plausibly 1000–2000." The exercise is the whole thermometer problem in one subtraction: physiology calibrates beautifully in the range it evolved in, deep-time climates live outside that range, and the discipline's answer is not to pretend precision but to stack independent proxies (stomata, boron, isotope mass balance) until their overlap brackets the answer.
:::
:::

::: widget plot
f: 1/(1+exp(0.034*(x-29.5)))
x: -2, 32
y: 0, 1
labels: U37
caption: The alkenone thermometer — $U^{K'}_{37} = (1+e^{0.034(T-29.5)})^{-1}$, the haptophytes' membrane-fluidity dial measured by gas chromatography and calibrated in culture and core-tops. Between roughly −1 and 30 °C the index moves smoothly from 0.9 to 0.1; outside that range the organism's dial saturates, and the proxy, like all dials, must be used where it was built to work.
:::

::: warning Proxies are not thermometers, replication is not proof, convergence is not mechanism, and the chronology is the weakest link
Five errors. **"The δ¹⁸O of this shell *is* the temperature"**: it is a variable with two controls (water δ¹⁸O and fractionation) plus vital effects, diagenesis, and species-specific offsets; the marine isotope stack works because the *global* ice-volume signal dwarfs the noise at orbital periods, not because any single shell is a thermometer — the unit of palaeoclimate is the population, not the specimen. **"More proxies = better reconstruction"**: correlated errors — the same monsoon, the same ENSO, the same dating method — do not average away; the hockey-stick-era lesson was not "more cores" but **network design**: replication across independent archives with independent chronologies. **"When proxies disagree, average them"**: disagreement is data — a tree saying wet where a speleothem says dry is either a seasonality difference (trees grow in spring, caves drip in monsoon) or a signal-to-noise failure, and the mature literature now reads *patterns of disagreement* (the "seasonality puzzle" of Holocene temperature reconstructions versus models) as its own discovery. **"The date is good enough"**: most palaeoclimate's biggest error budget is chronology, not proxy — a 500-year age-model error turns a 200-year lead-lag into a 700-year one and can invert cause and effect; the field's great advances (U-Th in caves, wiggle-matching in ice, Bayesian age models in mud) are dating advances wearing climate clothes. **And "the calibration period is the limit of the possible"**: the divergence problem warned that trees stopped tracking; the corollary is that some past states (Eocene, PETM) live **outside** every modern calibration — beyond the alkenone dial's range, beyond the transfer functions' nearest analogues — where palaeoclimate must fall back on mechanism-based isotope theory, and where its answers are correspondingly humbler and its need for the model comparison correspondingly greater.
:::

::: history
The archive idea is older than the instrument: **Lamarck** noted fossils' climate meaning at 1800, **Louis Agassiz** read glacial striae and erratics into an ice-age Earth in the 1830s–40s against fierce resistance, and the **Milanković** mechanism (1920s, this course's orbital-cycles lesson) supplied the theory before the evidence existed to test it. The evidence came from the physics of the 20th century: **Urey**'s 1947 prediction that isotope fractionation is temperature-dependent, **Epstein and Mayeda**'s measurement of it in carbonates the same decade, **Dansgaard**'s routine ice-core δ¹⁸O profiling from the 1950s and his 1960s discovery of the temperature relation and the abrupt-event stratigraphy of Greenland, and **Cesare Emiliani**'s 1950–55 foraminiferal isotope stratigraphy, which turned deep-sea cores into the ice-age chronicle Milanković had predicted. **Lennart von Post**'s pollen diagrams (1910s Sweden) and **Faegri and Iversen**'s textbook made vegetation history quantitative; **Douglass** made trees absolute; **Brassell, Eglinton and colleagues**' 1978 alkenone discovery made molecules thermometers; the **CLIMAP** project's 1981 transfer-function atlas made the whole globe of the last ice age a synoptic map. The methodological turn of the 1990s–2000s — verification statistics, Bayesian age models, U-Th-dated speleothems, and the reconstruction-network debates that began with Mann, Bradley and Hughes — converted palaeoclimate from a collection of clever readings into an observational science with error bars, and the one whose error bars now matter to every climate model's future.
:::

::: quiz
The "divergence problem" in dendroclimatology refers to:
- [ ] tree rings disagreeing with ice cores on glacial periods.
- [x] ring width and density ceasing to track summer temperature after ~1950 in some high-latitude networks.
- [ ] trees growing taller in a CO₂-enriched atmosphere.
- [ ] radiocarbon calibration curves diverging from tree rings.
::: solution
In parts of the circumpolar North, ring width stopped tracking the instrumental warming after mid-century (likely causes: drought stress, humidity-cloud changes, and possibly pollution effects on photosynthesis) — so the density-based and early-period data are used with care, and the episode stands as the field's standing caution that calibrations are period-bound. (Radiocarbon–tree-ring disagreement is a separate, solved story — the calibration curves themselves.)
:::
:::

::: summary
Proxies are natural instruments: isotope fractionations (hydrological, photosynthetic, mineral) and biological functionings (rings, pollen, alkenones, tests) that record temperature, water and carbon, readable only through mechanism, calibration against the modern world, and a chronology. The archive zoo — trees, pollen, microfossils, alkenones, speleothems, ice, lake varves, corals, boreholes, chronicles — covers different spans, resolutions and domains, and no single archive suffices; the discipline's evidential strength is multiproxy convergence with independent errors, and its standing cautions are space-for-time, time-averaging, divergence, and the chronology that is almost always the weakest link. From Agassiz's erratics to Dansgaard's ice to Brassell's molecules, the history is one of turning clever readings into measurements — so that the instrument era, barely 150 years long, can be set in context by archives 500 million years deep.
:::

::: exercise {level=1 check="-10"}
Find δ¹⁸O (‰, nearest integer) for a sample with R/Rstd = 0.990.
::: solution
$(0.990-1)\times1000 = -10$ ‰ — the per mille bookkeeping that is palaeoclimate's native arithmetic.
:::
:::

::: exercise {level=1 check="2000"}
In the age-model example (tephra at 2.0 m dated 8,000 yr, constant rate), find the age at 0.5 m depth in years.
::: solution
Rate 0.25 mm yr⁻¹; 1.5 m above the tephra is 6,000 yr younger: age $= 2000$ years.
:::
:::

::: exercise {level=1 check="8"}
Same core: find the temporal resolution (years) of a 2 mm sample.
::: solution
$2\ \mathrm{mm} / 0.25\ \mathrm{mm\,yr^{-1}} = 8$ years per sample — adequate for centuries, blind to decades.
:::
:::

::: exercise {level=1 check="2.1"}
Dansgaard's slope over Greenland is ~0.7 ‰ per °C. Find the δ¹⁸O change (‰, magnitude) for a −3 °C cooling.
::: solution
$0.7\times3 = 2.1$ ‰ of depletion — colder air distils its moisture drier, and the ice writes the arithmetic.
:::
:::

::: exercise {level=2 check="3.5"}
State the δ¹⁸O shift (‰) for a 5 °C cooling at Dansgaard's 0.7 ‰ °C⁻¹.
::: solution
$3.5$ ‰ — and note the sign: colder means *more negative* δ¹⁸O in polar precipitation.
:::
:::

::: exercise {level=2 check="15.3"}
The foraminiferal Mg/Ca palaeothermometer: $\mathrm{Mg/Ca} = 0.38\,e^{0.09T}$. Find T (°C, one decimal) for Mg/Ca = 1.50.
::: solution
$T = \ln(1.50/0.38)/0.09 = \ln(3.95)/0.09 = 1.373/0.09 = 15.3$ °C — and note why Mg/Ca and δ¹⁸O are used together: one needs the other to separate temperature from ice volume.
:::
:::

::: exercise {level=3 check="81"}
Find the number of independent reconstruction means (σ = 1.8 °C each) needed for a 0.2 °C standard error on their average.
::: solution
$n = (1.8/0.2)^{2} = 81$ — the replication arithmetic behind every network figure in the field.
:::
:::

::: exercise {level=3 check="0.5"}
A transfer function has modern-dataset skill σ = 4 °C; a reconstruction averages 64 core-tops. Find the standard error on the mean estimate (°C).
::: solution
$4/\sqrt{64} = 0.5$ °C — the core-top averaging that makes CLIMAP's ice-age SST maps, with all their space-for-time baggage, statistically serious even where philosophically contested.
:::
:::
