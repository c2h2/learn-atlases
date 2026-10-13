On the fifth of December 1952, a cold anticyclone settled over London, the city's coal fires made smoke that could not rise, and within four days the "pea-souper" had reduced visibility to a few feet, cancelled the Derby at Kempton, filled the mortuaries, and — as epidemiologists established half a century later — killed on the order of **ten thousand or more** people beyond the normal toll of that winter. The Clean Air Act that followed four years later was the world's first serious attempt to regulate what a city breathes; the US Clean Air Act of 1970 and the creation of the EPA made air-quality law a science of standards, monitoring networks and cost–benefit analysis; and in 2013, watching its own cities reach AQIs in the hazardous range on live television, the People's Republic of China declared a "battle against pollution" whose monitoring-and-enforcement machinery has since cut national PM2.5 by roughly 40 per cent in a decade — the fastest improvement in public health any country has achieved this century. Between those poles sits the subject of air-quality science: the daily interface of AQI numbers and sensor dots, the exposure–response curves that convert micrograms into lives, the indoor stove that remains the world's most lethal "appliance," and the frontier where climate change is re-opening cases we had closed — fire smoke, pollen, and ozone that obeys temperature before it obeys policy.

## Measuring what people breathe

::: definition Pollutants, monitors, sensors, satellites {#def-aqi-system}
Regulated "criteria" air pollutants are a short list with long histories: **PM2.5 and PM10** (mass concentrations of inhalable particles, measured by reference methods — filter weighing, tapered-element-oscillation microbalances, light scattering with hygroscopic-control — at networks like the US CSN/IMPROVE and China's 2000-station state-controlled network), **ozone** (UV photometry, the reference the whole photochemistry chapter hangs on), **NO₂ and NOx** (chemiluminescence and, increasingly, low-cost electrochemical and satellite columns — the Tropomi satellite famously caught NO₂ falling over industrial regions during the 2020 lockdowns), **SO₂** (fluorescence; and from space, the spectacular OMI and Tropomi plumes of every smelter and coal plant on Earth), **CO**, and the lead legacy of tetraethyl. The **Air Quality Index** compresses this chemistry into a single daily number by piecewise-linear breakpoints on the worst single pollutant: US AQI 0–50 good, 51–100 moderate, 101–150 "unhealthy for sensitive groups," 151–290 unhealthy–very-unhealthy, 300+ hazardous; the breakpoints are anchored to concentrations at which epidemiology sees effects (AQI 100 for PM2.5 is 35 µg m⁻³ 24-h — seven times the WHO 2021 guideline of 5 µg m⁻³ annual, a gap that is itself the policy debate). The 2010s revolution is the **low-cost sensor** (PurpleAir and its cousins: $30 laser-scattering particle counters now numbering in the hundreds of thousands worldwide) and **satellite-derived PM2.5** (the Atmospheric Composition Analysis Group's annual global maps, fusing AOD, land-use regression and chemistry models to estimate exposure everywhere, the dataset behind most global burden numbers). Both are beautiful for exposure science and hazardous for compliance: sensors drift, respond to humidity, and cannot be trusted uncalibrated — the standing lesson that **more measurements do not replace a reference network; they relocate the need for one**, because every citizen dataset must be tied to the mass standards the law is written against.
:::

::: example Reading the AQI {#ex-aqi}
A city's day: PM2.5 = 55 µg m⁻³ (24-h), O₃ 8-h max = 118 ppb, NO₂ 1-h max = 90 ppb. Using US breakpoints (PM2.5 35→100, 55.4→150; O₃ 70→100, 85→150 ppb; NO₂ 100 ppb→100 for the 1-h), find the day's AQI category.
::: solution
PM2.5 of 55 sits at the top of the 101–150 band (AQI ≈ 148); the 118 ppb ozone exceeds even the 151–200 band's floor (AQI ≈ 175); NO₂ is moderate. The reported AQI is the **maximum**: ~175, **"Unhealthy"** — the lesson being that an AQI day is decided by its worst pollutant, that ozone and particles can independently make the same day hazardous, and that the "sensitive groups" bands exist because asthmatics, children, the elderly and outdoor workers reach the exposure–response curve's steep part first.
:::
:::

## The burden

::: definition Exposure–response, mortality, indoor air, justice {#def-burden}
The quantitative core of air-quality science is the **exposure–response function**: the epidemiological slope, pooled from cohort studies of millions (the American Cancer Society and Six Cities cohorts and their successors, the pooled ESRI analyses, and an expanding literature from Africa and Asia), between long-term PM2.5 and mortality from ischaemic heart disease, stroke, COPD, lung cancer and lower-respiratory infection — roughly a **6–10 per cent increase in non-accidental mortality per 10 µg m⁻³** of chronic exposure, with no safe threshold detected down to the cleanest places on the monitoring grid (the "supralinear" shape — steeper at low concentration, flattening at high — is the finding that makes cleanup in clean countries pay disproportionately in lives). Applying the curve to global exposure gives the number now standard in public-health arithmetic: ambient PM2.5 contributes on the order of **4–5 million premature deaths per year**, household air pollution from solid and liquid cooking fuels another **2–3 million**, and the combined air-pollution burden — ahead of lead and alcohol among environmental risks, behind only tobacco and hypertension among all risks — falls **90 per cent on low- and middle-income countries**. The indoor half is the world's most unequal pollution problem: two-plus billion people cooking with wood, dung, charcoal or kerosene, exposures in a single kitchen equivalent to living in an AQI of several hundred, the burden concentrated on women and infants, and the solution — the LPG, biogas and electric-cooking transitions now underway (India's Ujjwala scheme reached tens of millions of households; Rwanda's is the fastest on record) — among the cheapest large health interventions available, with the caveats that gas leaks methane and stoves must actually replace the three-stone fire to count. The distribution within rich countries is the **environmental-justice** literature's subject: highways, ports, freight corridors and legacy redlining place minority and low-income communities at a few µg m⁻³ and several ppb NO₂ of persistent excess — the "cancer alley" of Louisiana's petrochemical river road being its most cited emblem — and the same geography now shows up in life-expectancy maps, making air quality the field where chemistry, urban planning and ethics share a concentration field.
:::

::: example Converting micrograms into lives {#ex-burden-calc}
A metro area of 10 million people lowers its annual PM2.5 from 30 to 20 µg m⁻³. Using 7 per cent mortality increase per 10 µg m⁻³ (log-linear), find the fractional reduction in pollution-attributable mortality and the lives saved per year if baseline non-accidental mortality is 8 per 1000 person-years.
::: solution
The attributable fraction scales as $e^{0.007\,\Delta C}$: dropping 10 µg m⁻³ cuts pollution-related excess mortality by $1-e^{-0.07} \approx 6.7$ per cent of its excess; total deaths are $10^{7}\times0.008 = 80{,}000$/yr, of which the excess attributable to the 30→20 span is $80{,}000\times(1-1/1.073) \approx 5{,}400$, so the cut saves roughly **360 lives per year** — a number the cost–benefit machinery then prices, and the reason a decade of steady policy beats a decade of dramatic episodes.
:::
:::

## The other half: indoor air

::: definition The kitchen as an exposure chamber {#def-indoor}
The typical narrative treats the outdoors as "the air" and the indoors as shelter; exposure science reverses the fractions — people in all settings spend the large majority of time indoors, and in the solid-fuel world the kitchen delivers the single largest pollutant exposures most humans experience. The physics is a source–ventilation balance, $C = Q/(\lambda V)$: a kerosene lamp or three-stone fire emits PM2.5 at grams per hour into a room ventilated at one or two air changes per hour, and the steady concentration lands in the hundreds-to-thousands of µg m⁻³ — an AQI of 500+ sustained through evening cooking and the sleep that follows in the same room. The pollutant cocktail is complete (PM, CO, NO₂, benzene, ultrafine particles, and — where tobacco or incense or mothballs add to the stove — a regulated carcinogen inventory), and the receptors are skewed: women and children under five, whose risks (lower-respiratory infection in the young, COPD and lung cancer in adult women, adverse birth outcomes) define the household burden. The intervention ladder is ordered by physics: **elimination** (electric and LPG cooking, district heating — the Ujjwala and Rwanda cases, with the caveats that LPG leakage adds methane and that stoves must displace, not supplement, the fire), **ventilation** (chimneys, hoods, kitchen separation — the interventions with the best evidence-to-cost ratio where fuels must stay), and the dead end: **improved biomass stoves**, whose decade of field trials showed real reductions at the burner rarely translate to personal-exposure reductions, because exposure is determined by the room, the cooking practices and the fuel-wood moisture, not the stove's certification plate — the most instructive failure in modern exposure science, and the reason the WHO indoor guidelines are written in units of *personal exposure* rather than stove performance. The rich-world indoor chapter is different but not empty: radon (the second cause of lung cancer, a soil gas that accumulates in basements and whose distribution is a literal map of the granite beneath the city), secondhand smoke (whose elimination by law is one of the era's largest measured health gains), gas stoves and NO₂ (the 2022–2023 US meta-analysis that put gas-stove-attributable childhood asthma in the millions-of-cases-per-year range globally and reignited a regulation fight), and the mould, VOC and ventilation deficits of energy-retrofitted housing — the reminder that "indoor air quality" is a first-world problem list as much as a third-world one.
:::

::: example The kerosene lamp room {#ex-indoor}
A 30 m³ room (ventilation 1.5 h⁻¹) burns two kerosene lamps emitting 1.2 g h⁻¹ of PM2.5 together. Find the steady-state concentration, and the air changes needed to hold it below 100 µg m⁻³.
::: solution
$C = Q/(\lambda V) = 1.2/(1.5\times30) = 0.027\ \mathrm{g\,m^{-3}} = 27{,}000\ \mathrm{\mu g\,m^{-3}}$ — three orders of magnitude above the target. Holding $100\ \mu\mathrm{g\,m^{-3}} = 10^{-4}\ \mathrm{g\,m^{-3}}$ would need $\lambda = 1.2/(10^{-4}\times30) = 400$ air changes per hour — physically absurd in a dwelling: **no ventilation strategy fixes a pollution source** at these strengths, which is the entire case — written in one division — for elimination (electricity, LPG, sealed burners) over dilution, and for why "open the window" is not a public-health intervention against a kitchen-scale source.
:::
:::

## The policy revolution and its arithmetic

::: definition From smokeless zones to cap-and-trade to Beijing blue {#def-policy}
Air-quality law has three generations, each invented in a crisis. **First generation — smoke control**: the UK Clean Air Acts of 1956 and 1968 (smokeless zones, chimney height, "smokeless" fuels) after London 1952, and the US state codes before 1970; these attacked **source concentration** (what burns, in what inverse-temperature bowl) and worked by taking the black out of the sky. **Second generation — standards and technology forcing**: the US Clean Air Act of 1970 (National Ambient Air Quality Standards, the EPA, and — the radical part — citizen suits and state implementation plans), the founding of California's CARB and the catalyst mandate that forced three-way catalytic converters onto cars from 1975, the Montreal-Protocol-style ozone protocols, and the **Acid Rain Program's** cap-and-trade (the subject of [[atmospheric-chemistry/acid-deposition]]); this generation attacked **per-source emission factors**, and its arithmetic is the most cited in environmental economics: the EPA's own reviews put the Clean Air Act's monetised benefits at roughly **30 times its costs**, with mortality reduction dominating the benefit column. **Third generation — integrated and transboundary**: the EU's national-emission-c ceilings, China's 2013–2023 campaign (real-time public monitoring, elimination of coal in major-city heating, steel and power ultra-low-emission retrofits, regional emergency response when the northern plain's autumn inversion arrives — national PM2.5 down ~40 per cent, Beijing's winter smog season measurably shorter and shallower, and the "Beijing blue" of WeChat photos the empirical proof), Delhi's contested and leaky version (odd–even driving, stubble-burning fines, smog towers as theatre), and London's **ULEZ** — a daily charge on polluting vehicles that cut central-London NOx roughly in half and became Britain's most contested, most imitated urban policy. The cross-cutting lesson is **Dieselgate** (2015): Volkswagen's defeat devices, cheating NOx tests by factors of five to forty on the road, revealed that regulation governs the *test*, not the world, and forced the real-driving-emissions (RDE) testing era — while doing nothing to the deeper truth that traffic NO₂, ultrafine particles and brake and tyre wear remain the hardest urban pollutants to remove, because they live in the one source category (millions of small moving sources) that no cap-and-trade has ever capped.
:::

::: example The benefits–cost ratio {#ex-bcr}
The EPA's 2011 retrospective put the Clean Air Act's 1970–2020 monetised benefits at ~$30 trillion against costs of ~$1.5 trillion (roughly 20:1, 30:1 in the mortality-inclusive central case). If a mid-sized country with 60 million people considers a package cutting PM2.5 by 4 µg m⁻³, uses a benefit of $30,000 per statistical-life-year, and values lives as 15 life-years per premature death averted among 20,000 annual air-pollution deaths, find the benefit and whether a $6 billion programme passes.
::: solution
$2\times10^{4}$ deaths $	imes$ 15 life-years = $3\times10^{5}$ life-years, times $\$3\times10^{4}$ per life-year = **$9 billion** — the programme passes at 1.5:1, and the example shows the structure of every air-quality decision: benefits are diffuse, statistical and in lives; costs are concentrated, immediate and in dollars, which is why the field runs on benefit–cost arithmetic and why the arithmetic keeps coming out in favour of cleanup.
:::
:::

::: widget plot
f: 25+70*exp(-(x-2013)/7)
x: 2013, 2023
y: 0, 120
labels: \mathrm{Beijing}\ \mathrm{PM2.5}\ (\mu\mathrm{g\,m^{-3}})
caption: Beijing's annual-mean PM2.5 trajectory through the campaign decade — from ~95 µg m⁻³ in 2013 toward the low 40s, still above China's own 35 µg m⁻³ standard and eight times the WHO guideline, but the largest single-city air-quality improvement in history. The curve is the third-generation policy model made visible: coal bans, retrofits, enforcement and public data, and a population watching live dashboards that the government itself built.
:::

::: warning AQI is not health, "post-scarcity" air is not clean air, sensors are not monitors, and the climate is re-opening the case
Five errors. **"AQI 100 means safe, 99 means dangerous"**: the index is a communication device built on breakpoints; the exposure–response curve is smooth, supralinear, and threshold-free — the bands are policy furniture on an epidemiological slope, and the WHO 2021 guidelines sit **below** most national standards precisely because the standards are attainable, not harmless. **"Our air is clean now"**: by WHO 2021 levels (PM2.5 annual 5 µg m⁻³), almost no city on Earth is clean, and the residual exposure in rich countries concentrates exactly where political power is thinnest — the justice literature's point is not that rich-country air is dangerous in the 1952 sense but that its last microns are unevenly distributed and still measurable in life expectancy. **"A $30 sensor network beats a monitoring station"**: it beats it in spatial coverage and exposure science, and loses in every legal and health-effect application until calibrated against reference instruments in the humidity regime in question — the mature pattern is hybrid networks, with the reference stations spending a growing share of their time auditing the crowd. **"Wildfire smoke is the new smoking"**: it is a serious and growing exposure (tens of millions of Americans now breathe AQI-hazardous air some days, and smoke PM is arguably more toxic per µg than urban PM — the epidemiology is active), but the framing understates the still-dominant sources (combustion for transport, heat, industry and cooking, plus household air globally) and lets emitters of the climate driver off the policy hook that smoke PM shares with them. **And "air quality is a solved problem in the rich world"**: NO₂ at curbsides, ultrafine and non-exhaust traffic particles, ozone's meteorological revenge (each heat wave and fire adds ppb faster than a decade of NOx cuts removes them in the Mountain West), and the pollen–allergy load of a CO₂-fertilised, warmer growing season all say the solved chapters are closed only in the textbooks.
:::

::: history
The field's origin stories are disaster and epidemiology: **Donora** (1948) and the **London Great Smog** (1952) created the first clean-air laws, and the **Donora Tracker Study** (1948–51, the US Public Health Service's mobile laboratory) invented the science of episode attribution. The regulatory revolution runs through the UK **Clean Air Acts** (1956, 1968), California's motor-control-board (1960) and the **Motor Vehicle Air Pollution Control Act** (1965), the **US Clean Air Act 1970** with its NAAQS, EPA and citizen suits, the **1990 Amendments** (acid-title cap-and-trade, the 117 hazardous air pollutants, reformulated gasoline), and the EU's successive Large Combustion Plant and National Emission Ceilings directives. The measurement lineage runs from filter gravimetry and the US **National Air Monitoring Strategy** to the IMPROVE visibility network (1999), the Aeronet sunphotometers, Tropomi's orbital NO₂ and SO₂ eyes (2017–), and the PurpleAir crowd. The epidemiological case was built cohort by cohort — the **Six Cities Study** (Harvard, Dockery and colleagues, 1993) and the **ACS cohort** (Pope and colleagues, 1995), whose findings survived every challenge and became the basis of the modern no-threshold curves — and the global arithmetic by the **Global Burden of Disease** enterprise, whose 2010–2020 assessments made air pollution a top-three global mortality risk and pushed the WHO's 2021 guideline revision, the first in 16 years, which lowered the PM2.5 annual limit by a factor of 2.5 on the strength of the very cohorts the industry had spent decades litigating.
:::

::: quiz
The WHO 2021 PM2.5 annual guideline (5 µg m⁻³) is primarily based on:
- [ ] the detection limit of reference monitors.
- [x] cohort evidence of mortality down to the cleanest monitored populations, with no threshold.
- [ ] the cost of meeting it in high-income countries.
- [ ] the natural background over oceans only.
::: solution
The guideline is health-based by design: the exposure–response curves show effects — and steeper-than-linear effects — down to ~5 µg m⁻³, the cleanest levels with enough cohort data to constrain risk. Attainability enters through the interim targets, not the guideline itself; national standards, by contrast, are health information filtered through feasibility.
:::
:::

::: summary
Air-quality science is the atmosphere's public-health discipline: a criteria-pollutant list measured by reference networks and now by sensor crowds and satellites, compressed into AQI numbers that communicate a smooth, threshold-free epidemiology; a burden of millions of lives per year, concentrated in the indoor kitchens of the poor and the curb-side blocks of the rich; and a policy science with three generations of instruments — smoke control, technology-forcing standards and markets, integrated campaigns — whose flagship results (the US Clean Air Act at ~30:1 benefit–cost, China's 40 per cent decade, London's ULEZ halving NOx) prove that air is the environment's most tractable problem when political will exists. The frontier is entanglement: wildfire smoke and heat re-opening the ozone and PM cases, pollen seasons lengthening, justice mapping the last microns, and the sensor revolution relocating who gets to know what the air is. The 1952 lesson endures in both directions: air kills fast when it is bad and slowly when it is merely unclean, and every µg removed pays in lives.
:::

::: exercise {level=1 check="100"}
In the US AQI, what PM2.5 24-hour concentration (µg m⁻³) marks the boundary between "moderate" and "unhealthy for sensitive groups"?
::: solution
**35 µg m⁻³** = AQI 100 — seven times the WHO 2021 annual guideline, the gap that is the policy debate in one number.
:::
:::

::: exercise {level=1 check="9"}
Find the ratio of a city's annual PM2.5 of 45 µg m⁻³ to the WHO 2021 guideline.
::: solution
$45/5 = 9$ — ninefold, the exposure of a typical mid-size polluted city, and the reason the WHO revision was a political event as much as a scientific one.
:::
:::

::: exercise {level=1 check="7"}
Using the 6–10 per cent range per 10 µg m⁻³, state the mid-point percentage increase in chronic mortality per 10 µg m⁻³.
::: solution
**7 per cent** per 10 µg m⁻³ — the slope that converts every concentration map into a mortality map.
:::
:::

::: exercise {level=1 check="90"}
What percentage of the global ambient-plus-household air-pollution burden falls on low- and middle-income countries?
::: solution
**90 per cent** — the geography of the burden, tracking where cooking fuels, coal, and the fastest-growing vehicle fleets live.
:::
:::

::: exercise {level=2 check="6.7"}
Find the percentage reduction in excess mortality when chronic PM2.5 falls 10 µg m⁻³ with a 7 per cent-per-10 log-linear slope ($1-e^{-0.07}$, one decimal).
::: solution
$1-e^{-0.07} = 6.7$ per cent of the excess attributable across that concentration span — small fractions of large numbers, which is how air policy earns its benefit–cost ratios.
:::
:::

::: exercise {level=2 check="7"}
Dieselgate: a car emitted 0.70 g km⁻¹ of NOx on the road against a 0.10 g km⁻¹ limit (the worst tested configurations reached higher). Find the exceedance factor.
::: solution
$0.70/0.10 = 7$ — the factor that turned a certification cheat into five million recalled cars, a criminal settlement, and the real-driving-emissions test era.
:::
:::

::: exercise {level=3 check="9"}
Using $2\times10^{4}$ deaths/yr, 15 life-years per death averted and $3\times10^{4}$ per life-year, find the annual benefit in billions of dollars.
::: solution
$2\times10^{4}\times15\times3\times10^{4} = 9\times10^{9}$ — **$9 billion**, against a $6 billion programme: the arithmetic every air-quality appraisal runs, and the reason the field keeps winning on numbers while losing on headlines.
:::
:::

::: exercise {level=3 check="1.5"}
Find the benefit–cost ratio of the previous exercise's programme ($9 billion benefit, $6 billion cost).
::: solution
$9/6 = 1.5$ — comfortably positive even under conservative valuation, and the reason the EPA's full retrospective, which counts decades and all pollutants, came out near 30:1.
:::
:::
