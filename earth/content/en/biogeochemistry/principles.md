A planet that breathes is an accounting problem. The carbon in your body has been atmospheric CO₂, a leaf, a fish, a glacier and a volcano — and the books that track where it has been, where it is, and how fast the pages turn are the science of **biogeochemistry**: the study of the elements' cycles through the Earth system, written in the language of reservoirs, fluxes, and the stoichiometry that couples them to life. The discipline's central realisation — seen by **Vladimir Vernadsky** in 1926 when he declared the biosphere a geological force, and made quantitative a generation later by **Alfred Redfield** and the oceanographic school that followed him — is that life is a **chemical engine** whose waste products restructure the atmosphere and ocean, and that the elements move through it in fixed ratios that make biology legible from chemistry. This lesson is the bookkeeping: reservoirs and fluxes, residence times and steady states, the Redfield ratio and its exceptions, and the isotope tracers that let us watch the human perturbation in the act.

## Reservoirs, fluxes, residence times

::: definition The accountant's toolkit {#def-bg-bookkeeping}
Every cycle is a set of **reservoirs** (masses $M_i$, e.g. atmosphere 875 GtC as CO₂ at 415 ppm, where 1 ppm = 2.12 GtC; vegetation ~450; soils and peat ~1,500–2,400; the ocean's dissolved inorganic carbon 38,000, of which 90 per cent sits in the deep; marine sediments ~150 million; fossil reserves ~500 extractable, ~10,000 in the ground) connected by **fluxes** ($F_{ij}$, e.g. photosynthesis 123 GtC yr⁻¹, respiration ~120, ocean uptake ~9 out and 9 in, fossil emissions ~10, land-use ~1). The fundamental law is mass balance, $dM_i/dt = \sum F_{\mathrm{in}} - \sum F_{\mathrm{out}}$, and its two governing concepts: the **residence time** $\tau = M/F$ (for the atmosphere's CO₂ against photosynthesis, $875/123 \approx 7$ years — the turnover of the fast cycle, and emphatically **not** the time a perturbation persists, a confusion that has misled a thousand headlines), and **steady state** (the preindustrial approximation that all $dM/dt \approx 0$, which the human cycle has destroyed: the atmosphere now gains ~5 GtC yr⁻¹, the ocean ~2.7, the land ~3, from ~11 emitted, an imbalance that closes only because the **airborne fraction** — the ~44 per cent that stays aloft, rising slightly with time as sinks lag — is less than one). The toolkit's three subtleties: **timescale hierarchy** (the fast biological cycle turns carbon in years, the carbonate compensation depth in 10⁴ yr, silicate weathering in 10⁵–10⁶ — which is why the fossil carbon we emit is a **perturbation on the slow cycle's clock**: a pulse decays with a tail that outlives civilisations, the "pulse 100,000-year" result of the carbon-cycle models); **the pump problem** (the ocean's 30-fold carbon excess over equilibrium with today's atmosphere is maintained by the biological pump and the temperature/solubility geometry — the cycles are not independent accounts but one coupled system); and **stoichiometry** (elements move in fixed ratios — the next section — so measuring one element's cycle constrains the others). The discipline's modern triumph is that the budget **closes**: emissions minus airborne equals the sum of the ocean and land sinks, measured independently (the ocean by shipboard carbon repeats and surveys, the land by forest inventories and flux towers), to within the error bars — the most audited experiment in the history of the Earth sciences, and the foundation under every emissions budget in the climate-change course.
:::

::: example The atmospheric carbon budget, closed {#ex-budget}
Fossil emissions 10.0 GtC yr⁻¹, land-use 1.1, atmospheric growth 5.2, ocean uptake 2.7. Find the land sink and the airborne fraction, and if emissions fall 4 per cent per year while sinks keep their current **fractional** efficiency, explain in one sentence why atmospheric CO₂ still rises for decades.
::: solution
Land sink $= 11.1 - 5.2 - 2.7 = 3.2$ GtC yr⁻¹; airborne fraction $= 5.2/11.1 = 0.47$, the observed ~45–50 per cent of recent decades. CO₂ keeps rising because the airborne fraction is **less than one but greater than zero**: even at rapidly falling emissions, the atmosphere accumulates until emissions drop below the sink capacity (~2–3 GtC yr⁻¹ and falling as the ocean and land saturate) — the difference between "stabilising emissions" and "stabilising climate" is the whole subject of the climate-change course, and it is arithmetic before it is policy.
:::
:::

## Stoichiometry: Redfield's ratios and the energy beneath

::: definition C:N:P and the electron economy {#def-redfield}
In 1934 **Alfred Redfield**, a Norwegian oceanographer turned fisheries scientist on the Dana expeditions, noticed that the nitrogen:phosphorus ratio of deep ocean water (16:1), of river export, and of marine plankton were the same number — and drew the inference that made biogeochemistry a quantitative science: **phytoplankton build their bodies to a fixed recipe, and the ocean's chemistry obeys it**. The canonical ratio, C:N:P = 106:16:1 (with Si for diatoms' shells and Fe as the enzyme catalyst), means the cycles are **coupled by stoichiometry**: a mole of phosphorus exported from the surface carries 106 moles of carbon down with it, the deep sea's nutrient gradient (N and P and CO₂ all increasing with depth in the same proportions) is biology's signature written in the water column, and the **limiting nutrient** concept — whichever element runs out first controls productivity, Liebig's law of the minimum applied to the sea — organises the ocean's fertility map (high-nitrate low-chlorophyll zones where iron is missing: the equatorial Pacific, subarctic, Southern Ocean — the **John Martin** "give me a half-tanker of iron" provinces, whose iron-fertilisation experiments SEEDS, SOIREE, Eisen, LOHAFEX delivered partial blooms and much nuance about whether carbon is actually sequestered). The deeper layer beneath the ratios is **energetics**: life is an electron economy — photosynthesis-to-respiration is a cascade of redox reactions, each with a free-energy yield that determines which metabolisms are possible where — and the elemental cycles are **the electron transport chain of the biosphere**: carbon is the electron backbone, nitrogen the redox shuttle (its +5 to −3 range powers most anaerobic metabolisms), phosphorus the energy currency (ATP) and memory molecule (DNA), sulfur and iron the electron carriers in oxygen's absence. The ratios have exceptions that prove the rule — cyanobacteria fix N₂ when nitrogen limits (relaxing N:P), diatoms silicify (decoupling Si), and the Redfield ratio itself varies with temperature, light and species (the 2010s meta-analyses: 13–23 for N:P in surface waters) — but the first-order statement stands: **the ocean is a stirred reactor with a biological recipe, and the recipe is written in the deep water**.
:::

::: example The stoichiometry of a dead zone {#ex-deadzone}
A fertilised river exports dissolved inorganic nitrogen at 8 µM with phosphorus at 0.3 µM to a coastal sea. Using Redfield (16:1), find which nutrient is in excess and by how much, and compute the oxygen demand (mol O₂ per mol C, ~1:1 for organic matter respiration) if all the nitrogen is used to make and then rot biomass.
::: solution
Redfield demand for 8 µM N is 0.5 µM P — the water carries only 0.3, so **phosphorus limits** and 0.3 µM P supports $0.3\times106 = 32$ µM of C (the excess N, $8-0.3\times16 = 3.2$ µM, accumulates or denitrifies); respiring that carbon consumes ~32 µM O₂ — enough (seawater holds ~250 µM O₂) to strip a third of the oxygen and cross the hypoxia threshold (<64 µM) that kills mobile fauna: the **Gulf of Mexico dead zone**, the Baltic's, and the growing list of them are Redfield's ratio applied to fertilizer, the cleanest example on Earth of stoichiometry as public health.
:::
:::

## Tracers: watching the perturbation

::: definition Isotopes as fingerprints {#def-tracers}
The human experiment is diagnosed with **isotope fingerprints** because every carbon source has a signature. Fossil fuel is **¹³C-poor** (δ¹³C ≈ −25 ‰, from C3 plants) and **¹⁴C-dead** (radiocarbon decayed away over millions of years); biomass burning is ¹³C-poor but ¹⁴C-modern; the ocean's signal is mass-dependent fractionation. Burning the first therefore **dilutes** both atmospheric isotopes while CO₂ rises — the **Suess effect** (the δ¹³C decline of ~1.9 ‰ since 1850, and the ¹⁴C decline from fossil dilution, both matching the emissions history quantitatively: the isotopic proof, complete by the 1980s, that the CO₂ rise is **from combustion and not from the ocean or respiration**, which would carry different or opposite isotope signs). The **bomb pulse** (nuclear testing doubled atmospheric ¹⁴C by 1963, and its decline since measures the **total** carbon-cycle uptake rate — the sum of ocean and land mixing — independently of the CO₂ budget, and gives the "exchange timescale" of the surface carbon system directly) is the largest isotope experiment ever run and one of the most productive. The **oxygen–carbon coincidence** closes the case: atmospheric O₂ has fallen in exact stoichiometric proportion to fossil carbon burned (the O₂:N₂ decline of ~100 per meg per year matches the combustion deficit after accounting for the land sink's O₂ release), and **Δ¹³C of atmospheric CO₂** plus **δ¹³C of ocean DIC** plus **the airborne fraction** plus **the ocean's anthropogenic CO₂ inventories** (the transient-tracer work and the GLODAP global ocean survey's ~175 GtC of fossil carbon stored since 1850, ~26 per cent of emissions, measured on ships) form an over-determined system that closes on the same answer from four directions: **~45 per cent airborne, ~26 per cent ocean, ~30 per cent land, and the land's share is real but increasingly vulnerable** (the flux-tower and satellite record of the 2010s–2020s showing the Amazon's eastern dieback and fire regime turning a sink toward source — the question of whether the land sink is ending is the carbon-cycle question of the coming decades). The tracer method generalises to every cycle in this course: ¹⁵N for nitrification and denitrification, ⁸⁷Sr/⁸⁶Sr for weathering fluxes, δ³⁴S and δ⁷Li for redox and weathering intensity — biogeochemistry's answer to the experimentalist's objection that you cannot run a control planet.
:::

::: example The Suess arithmetic {#ex-suess}
Preindustrial air: CO₂ 280 ppm, δ¹³C −6.5 ‰. Fossil carbon: δ¹³C −25 ‰, ¹⁴C-dead. If all 145 ppm of the rise to today's 425 ppm were fossil and stayed in the air, find the expected δ¹³C of the mixture; then repeat for 45 per cent airborne (65 ppm retained) and compare with the observed ~−11 ‰.
::: solution
Mass balance: $\delta = (280\times(-6.5) + 145\times(-25))/425 = -12.8$ ‰ if all the emitted carbon stayed in the air unprocessed. The observed ~−10.8 ‰ is **isotopically heavier** because the airborne fraction is less than one — the emitted carbon that left the atmosphere (into ocean and biosphere) took its −25 ‰ with it, leaving a smaller dilution: with 45 per cent airborne, $(280\times(-6.5)+65\times(-25))/345 = -10.0$ ‰, within error of observation. The exercise is the isotope budget's core logic: **the Suess effect measures the airborne fraction in a second, independent currency** — and the agreement of the two currencies is why the carbon budget is called closed.
:::
:::

## What life leaves out: appropriation and the categories of cycle

::: definition Gaseous and sedimentary cycles, and the human share of photosynthesis {#def-appropriation}
The textbook taxonomy sorts cycles by their dominant reservoir: **gaseous cycles** (carbon, nitrogen, oxygen, sulfur in its reactive fraction) circulate through the atmosphere, couple the hemispheres, and respond to perturbation in years-to-centuries; **sedimentary cycles** (phosphorus, calcium, the metals, silicon in its long limb) circulate through rock, with residence times in their active reservoirs of 10⁴–10⁸ years, which makes their perturbations — mining and fertilizer P, the metal smelts' half-cycle acceleration — effectively **irreversible on human timescales** because the exit is geological. The distinction is the atlas's quiet structural argument: the carbon problem is fast and (in principle) fixable, the phosphorus problem is slow and (in practice) permanent, and the same tonne of intervention means opposite things in the two systems. The human condition in all cycles is **appropriation**: the 1986 **Vitousek, Ehrlich, Ehrlich, Nutt and Woodwell** quantification — that humanity then used 32–40 per cent of terrestrial net primary production — has climbed to roughly **half of accessible NPP** in the modern accounting (crops, rangeland harvest, wood, and the fossil fraction), and the same occupation-by-conversion logic runs through every cycle in this course: half of accessible reactive nitrogen is now industrially fixed, a third of ice-free land is cultivated, the rivers' sediment and phosphorus fluxes are half-trapped by dams, and the biosphere's chemical engine runs increasingly for us and against its own previous bookkeeping. The pedagogical use of the number is not doom but **scale**: when half of photosynthesis is already spoken for, "solve climate with trees" is an arithmetic impossibility, and "feed 10 billion without breaking nitrogen and phosphorus" is the same problem wearing its other hat — the course's later lessons are, in order, the stories of those hats.
:::

::: example The appropriation ledger {#ex-npp}
Global terrestrial NPP is ~56 GtC yr⁻¹, of which ~40 GtC is "accessible" to human use; humanity currently uses ~19 GtC yr⁻¹. Find the human share of total and of accessible NPP, and the accessible share if bioenergy crops claim a further 5 GtC.
::: solution
$19/56 = 34$ per cent of total, $19/40 = 48$ per cent of accessible NPP; adding 5 GtC of bioenergy takes the accessible share to $24/40 = 60$ per cent — leaving the remaining 40 per cent of accessible photosynthesis to run fisheries, forests, soils, and the entire nutrient and water bookkeeping of a living planet. The exercise is the course's constraint in one division: **every biogeochemical solution is a claim on the same 40**, which is why the honest climate-agriculture-biodiversity literature is a literature of trade-offs, not portfolios.
:::
:::

::: widget plot
f: -6.5-4.3/(1+exp(-0.045*(x-1995)))
x: 1850, 2020
y: -14, -6
labels: \delta^{13}\mathrm{C}\ (\permil)
caption: The Suess effect in tree rings and air — δ¹³C of atmospheric CO₂ falling from −6.5 ‰ toward −10.8 ‰ as ¹³C-poor fossil carbon dilutes the atmosphere, the curve's shape tracking the emissions history itself. The decline is the fingerprint that convicts combustion: no natural source combines this much carbon with this isotope signature, and the match between the dilution arithmetic and the measurements is the carbon cycle's most elegant proof.
:::

::: warning Residence time is not persistence, the budget closes but is not safe, Redfield is a tendency not a law, and the land sink is a partner not a servant
Five errors. **"CO₂'s residence time is 5 years, so the problem solves itself"**: τ = M/F describes the **turnover of the reservoir's existing stock** through the fast cycle, not the decay of a perturbation — the 5-year exchange recycles every molecule many times while the **excess** (the imbalance between gross fluxes) persists for centuries-to-millennia because the slow sinks (carbonate compensation, weathering) are small; the same CO₂ molecule may leave the air in months while the **extra** carbon stays for 100,000 years. **"The budget closes, so the sinks are dependable"**: closure is an accounting identity over the last 60 years, not a contract — the Amazon's drying, the boreal fire regime, and the ocean's solubility pump weakening under stratification are all candidate sink failures, and the airborne fraction's slight upward trend (0.44 ± 0.06, rising ~0.5 per cent per decade) is the first hint of the contract's fine print. **"Redfield's ratio is universal"**: it is a **mean** with named exceptions (N₂ fixers relax N limitation, diatoms decouple silicon, the deep Pacific's N:P of 10–12 records a century of debate about whether the ratio is regulated toward 16 by the fixers' feedback — the **N₂-fixer regulation hypothesis**, now the field's best-supported answer to how the ocean keeps its ratios) — and the exceptions are where the climate-relevant surprises live. **"We can fertilise the ocean/land to take it all back"**: the land sink already does ~3 GtC yr⁻¹ for free and may be turning; ocean iron fertilisation delivered small, short-lived carbon export in six experiments and raises the deep-water-oxygen and acidification debts (the same stoichiometry that sequesters carbon respires it into depth, deoxygenating the same water it enriches); the honest number for "how much can we manage" is a fraction of emissions, not the whole. **And "the cycles are balanced so emissions don't matter"**: the preindustrial balance is the **baseline**, and the human flux (~11 GtC yr⁻¹ to the active surface system) is now **ten times the natural land-use flux of the preindustrial Holocene** and comparable to the entire fast biological cycle's imbalance scale — the cycles are not broken, they are **outrun**, and the difference between those words is the difference between adaptation and geology.
:::

::: history
The cycle idea predates its arithmetic: **Lavoisier**'s respiration-as-combustion (1770s), **Saussure**'s carbon-cycle experiments with plants and air (1804), and **Fourier and Tyndall**'s greenhouse spectroscopy set the stage; **Vernadsky**'s 1926 *Biosphère* made life a geochemical force in words the West read late; **G. Evelyn Hutchinson** made lake chemistry quantitative in the 1940s. **Alfred Redfield**'s 1934 ratio (and the 1958 *Science* essay that defended it) is the field's keystone; The modern carbon-cycle synthesis owes its architecture to **Wallace Broecker**'s "brisk breeze, perpetual traffic" of the surface ocean (1974) and his tracer and box-model school, **Bert Bolin**'s pioneering carbon-cycle models, and the complementary revolutions of **Klaus Hasselmann** and **C. D. Keeling** — the Keeling curve (1958–, Mauna Loa's 415-ppm present) and Hasselmann's carbon-cycle inverse modelling that first attributed the rise to humans (1979, the paper that got the 2021 Nobel). The isotope toolkit: **Hans Suess**'s fossil-dilution effect (1955), the bomb-pulse science of the 1960s–70s (**Revelle and Suess**'s 1957 ocean-uptake prediction, **Munnich and Vogel**'s bomb-¹⁴C uptake measurements), **Charles David Keeling**'s ¹³C decline and the ¹⁴C dead-carbon confirmation of the 1970s–80s; the modern measurement enterprise: the global flask and flux-tower networks (**FLUXNET**), the ocean survey program (**GLODAP**, the CLIVAR repeat sections), the satellite solar-induced-fluorescence era (2010s–), and the **Global Carbon Project**'s annual budgets (2006–) that make the Earth's books a public, audited document — the closest thing the planetary-scale science has to a double-entry ledger, and the one every climate negotiation is finally argued over.
:::

::: quiz
The atmospheric CO₂ "residence time" of ~5 years refers to:
- [ ] how long emitted CO₂ stays before it can be removed.
- [x] the turnover time of the reservoir through the fast exchange fluxes, not the decay of an excess.
- [ ] the lifetime of the molecular CO₂ bond.
- [ ] the adjustment time of climate.
::: solution
τ = M/F with F the gross fast flux (photosynthesis, ocean exchange) — individual molecules cycle in years, but the **perturbation** (the imbalance) persists on the slow-sink timescale (centuries–millennia). Confusing the two is the most common carbon-cycle error in public debate.
:::
:::

::: summary
Biogeochemistry is the Earth system's double-entry bookkeeping: reservoirs (875 GtC in the air, 38,000 in the sea, 1,500 in soils), fluxes (a 123-GtC photosynthetic engine, a 10-GtC human one), residence times that measure turnover and not persistence, and a stoichiometry (Redfield's 106:16:1) that couples the elements to each other and to energy. The human perturbation is diagnosed by isotope fingerprints — the Suess dilution of ¹³C and ¹⁴C, the bomb pulse's uptake clock, the oxygen decline — that close the carbon budget from four independent directions: ~45 per cent airborne, ~26 ocean, ~30 land, with the land's share now the system's most anxious line item. The discipline's two great lessons for everything after this course: the cycles are **coupled** (you cannot perturb carbon without moving nitrogen, phosphorus and oxygen), and the timescales are **layered** (the fast cycle's 5-year clock and the slow cycle's 100,000-year tail are both true, and policy lives in the gap).
:::

::: exercise {level=1 check="2.12"}
Find the mass of carbon (GtC) in 1 ppm of atmospheric CO₂ (air = 2.13×10¹⁵ tonnes... use: dry air 5.12×10¹⁸ kg, M_CO₂/M_air = 44/29, carbon fraction 12/44).
::: solution
$5.12\times10^{18}\times10^{-6}\times(12/29) = 2.12\times10^{12}$ kg = **2.12 GtC** per ppm — the conversion factor behind every carbon number in this atlas.
:::
:::

::: exercise {level=1 check="7.1"}
Find the residence time (years) of atmospheric CO₂ against the gross photosynthetic flux (M = 875 GtC, F = 123 GtC yr⁻¹).
::: solution
$875/123 = 7.1$ years — turnover, not persistence, and the most misquoted number in climate science.
:::
:::

::: exercise {level=1 check="0.47"}
Find the airborne fraction for emissions of 11.1 and atmospheric growth of 5.2 GtC yr⁻¹.
::: solution
$5.2/11.1 = 0.47$ — just under half, the share civilisation has been unable to hand to the ocean and land.
:::
:::

::: exercise {level=1 check="16"}
State the Redfield N:P ratio.
::: solution
**16:1** — the number Redfield found in plankton, rivers and deep water, and the spine of nutrient-limitation science.
:::
:::

::: exercise {level=2 check="0.5"}
Redfield (16:1): find the phosphorus (µM) required to fully use 8 µM of nitrogen.
::: solution
$8/16 = 0.5$ µM — and when the water carries less (as fertilised coastal seas do), nitrogen is in excess and denitrification or hypoxia disposes of it.
:::
:::

::: exercise {level=2 check="32"}
If 0.3 µM phosphorus limits production (Redfield C:P = 106:1), find the organic carbon produced, in µM.
::: solution
$0.3\times106 = 32$ µM C — whose respiration consumes ~32 µM O₂, the dead-zone arithmetic of the worked example.
:::
:::

::: exercise {level=3 check="10.0"}
With 65 ppm of airborne fossil carbon (δ¹³C −25 ‰) added to 280 ppm at −6.5 ‰, find the mixture's δ¹³C (absolute value, one decimal).
::: solution
$(280\times6.5 + 65\times25)/345 = (1820+1625)/345 = 10.0$ ‰ (negative) — the Suess prediction for a 45-per-cent-airborne world, matching observation and closing the isotopic budget.
:::
:::

::: exercise {level=3 check="26"}
The ocean has taken ~175 GtC of the ~670 GtC emitted since 1850. Find the ocean's percentage share.
::: solution
$175/670 \approx 26$ per cent — the GLODAP number, measured on research vessels, and the reason "the ocean is not a bottomless sink" is a measurement, not a model output.
:::
:::
