Hold your breath and do the arithmetic: half a litre of air contains about $10^{22}$ molecules — roughly as many as there are stars in the observable universe — and of those, only some $2\times10^{16}$ are carbon dioxide, a few hundred thousand methane, and a few billion ozone, the difference between a habitable planet and a sterile one. The story of atmospheric chemistry is the story of those minorities: how a gas at one part in a million can carry as much greenhouse forcing as a gas at four hundred, why the sky's self-cleaning detergent — a radical with a one-second lifetime, present at a few molecules per cubic centimetre — decides how long the methane and the pollutants last, and how the discovery that the atmosphere is a **chemical reactor**, not a museum of gases, took from Lavoisier's balance to the ozone hole to finally stick. Every number in this lesson is a residence-time calculation away from a policy argument, because in atmospheric chemistry, abundance is never more than the quotient of a source and a sink.

## The recipe for air

::: definition Composition and the mass of the atmosphere {#def-composition}
Dry air is $78.08$ per cent $\mathrm{N_2}$, $20.95$ per cent $\mathrm{O_2}$, $0.93$ per cent Ar and $0.06$ per cent $\mathrm{CO_2}$ by volume — with the minorities that matter: $\mathrm{N_2O}$ at $336$ ppb, methane at $1920$ ppb, ozone $10$–$50$ ppb at the surface and much more in the stratosphere, and the chlorofluorocarbons in the tens to hundreds of parts per **trillion**. The whole package weighs $5.15\times10^{18}\ \mathrm{kg}$ — a column of $P/g = 10{,}330\ \mathrm{kg\,m^{-2}}$, a mean molar mass of $28.97\ \mathrm{g\,mol^{-1}}$ (set by the nitrogen-oxygen mix, and measurable to four digits by the balance and the gravimeter independently, one of physics' tidier confirmations), and a vertical scale height $H = RT/Mg \approx 8.5\ \mathrm{km}$ that makes pressure fall by a factor of $e$ every kilometre of altitude near the surface. Two of the numbers have fingerprints of origin: the argon is **radiogenic** ($^{40}\mathrm{Ar}$ from $^{40}\mathrm{K}$ decay in the rocks, which is why the atmosphere's argon is heavy and the Sun's is light), and the oxygen is **biological** — the free $\mathrm{O_2}$ is a state of the system maintained by photosynthesis against a geological demand for reductants, and its rise 2.4 billion years ago is the largest pollution event in Earth history ([[earth-history/oxygen-proterozoic]]). Water vapour, excluded from "dry air", is the variable ingredient — $0$ to $4$ per cent, $9$ days of residence — whose absence from the list is a bookkeeping convention, not a statement of insignificance.
:::

::: example The mass of a trace gas {#ex-tracemass}
Find the mass of atmospheric $\mathrm{CO_2}$ at $420$ ppm, and of methane at $1920$ ppb. (Total moles of air: $1.78\times10^{20}\ \mathrm{mol}$.)
::: solution
Moles of $\mathrm{CO_2} = 420\times10^{-6}\times1.78\times10^{20} = 7.5\times10^{16}\ \mathrm{mol}$, mass $7.5\times10^{16}\times44 = 3.3\times10^{18}\ \mathrm{g} = 3300\ \mathrm{Gt\,CO_2}$ — the familiar $890\ \mathrm{GtC}$ in a different dress. Methane: $1.92\times10^{-6}\times1.78\times10^{20}\times16\ \mathrm{g} = 5.5\times10^{15}\ \mathrm{g} = 5500\ \mathrm{Tg}$, about a **twentieth** of the carbon dioxide's mass but, molecule for molecule, eighty times its grip over a century. The conversion between mixing ratios and masses — multiply mole fraction by total moles, then by molecular weight — is the one calculation every atmospheric chemist does reflexively, because sources and sinks are quoted in tonnes while the air reports only ratios.
:::
:::

::: widget plot
f: 1013*exp(-x/8.5)
x: 0, 30
y: 0, 1050
labels: p\ (\mathrm{hPa})
caption: Pressure against altitude for an isothermal atmosphere with the $8.5$-km scale height — the exponential that confines ninety per cent of the air's mass to the lower third of the troposphere and makes the stratosphere's chemistry happen in a vacuum by surface standards. The same exponential is why a mountaintop observatory (Mauna Loa sits above half the mass of the troposphere) samples cleaner air with fewer molecules to correct for, and why the ozone layer, at 20 km where the pressure is 55 hPa, holds its maximum **concentration** in air a fiftieth as dense as the surface.
:::

## Residence time: abundance is a quotient

::: proposition $\tau = M/F$ and the meaning of a lifetime {#prop-residence}
For any trace gas, the **residence (or lifetime) time** $\tau = M/F$ — reservoir divided by total flux — is the atmosphere's single most explanatory number. Carbon dioxide's gross residence time against its enormous exchange fluxes is $\sim 4$ years; methane's, against oxidation by the hydroxyl radical OH, is $9$; nitrous oxide's, against stratospheric photolysis and soil uptake, is $120$; a CFC-11's, against UV photolysis in the ozone layer, is $45$; sulphur dioxide's, against oxidation and rain, is **days**. Three consequences organise the field. **Well-mixed versus short-lived**: gases with $\tau$ longer than a year are globally mixed and belong to the atmosphere as a whole (CO₂, N₂O, CH₄ — the Kyoto long-lifers), while short-lived species (days to weeks: ozone, aerosols, SO₂, DMS) are regional, uneven, and their impacts are **where they are made**. **The GWP hierarchy**: a gas's 100-year global warming potential scales with its radiative efficiency and its lifetime — methane's 28, nitrous oxide's 265, CFC-12's 10 200 — which is why a molecule designed to be chemically **inert** (the CFCs' virtue as refrigerants) turned out to be a climate crime: inertness means the stratosphere is the only sink, and the stratosphere is where ozone lives. **And the policy asymmetry**: cutting a short-lived species changes the climate **fast** (the black-carbon and methane strategies of the 2020s buy decades of cooling at the cost of a single decade's emissions), while CO₂, whose perturbation lifetime is centuries because the ocean's buffer resists, requires **net zero**, not merely less. The residence-time table is, in effect, the periodic table of climate policy.
:::

::: example Methane's ledger {#ex-ch4ledger}
The methane burden is $5500\ \mathrm{Tg}$ and its sinks total $580\ \mathrm{Tg\,yr^{-1}}$ (OH oxidation $510$, soils $30$, stratosphere $15$, chlorine in the marine boundary layer $25$). Find the lifetime, and the burden that would result if emissions rose to $620\ \mathrm{Tg\,yr^{-1}}$ and stayed there.
::: solution
$\tau = 5500/580 = 9.5$ years. At emissions of $620\ \mathrm{Tg\,yr^{-1}}$ the new steady burden is $620\times9.5 = 5900\ \mathrm{Tg}$ — but the approach is exponential with that same 9.5-year time constant, so **most** of the adjustment happens within three decades. This is methane's dual personality: the second-largest greenhouse forcing after CO₂, and simultaneously the **fastest lever** in the climate system — emissions cut in half today would return the burden near its pre-2020 value by the 2050s, a turnaround no CO₂ policy can offer on any timescale short of a millennium.
:::
:::

## The minor species and their sources

::: definition Who makes what {#def-sources}
The trace-gas budget is a map of biology, geology and industry. **Methane**: wetlands (the largest natural source, $\sim 150\ \mathrm{Tg\,yr^{-1}}$, and the one that grows with warmth), rice and ruminants, fossil leaks and landfills — its isotopes ($^{13}\mathrm{C}$) and its ethane co-measurements now apportion the recent growth decisively to **biogenic** sources, a finding with diet-and-agriculture implications. **Nitrous oxide**: microbial nitrification and denitrification, doubled by nitrogen fertiliser — the fertilizer age's second climate gift (after reactive nitrogen itself, [[biogeochemistry/nitrogen]]). **Carbon monoxide**: incomplete combustion and the atmospheric oxidation of methane and isoprene — which is why CO, a pollution marker, peaks over fire continents in fire season. **Sulphur dioxide**: volcanoes, ship fuel oil, coal, and the ocean's **DMS** — the phytoplankton sulphur that seeds cloud condensation nuclei and, in the **CLAW** hypothesis (Charlton, Lovelock, Andreae and Warren, 1987), couples ocean fertility to Earth's albedo (a feedback whose strength is still contested, its existence not). **Isoprene and terpenes** from forests: $10^{15}\ \mathrm{g\,yr^{-1}}$ of hydrocarbons that make the continents' share of secondary organic aerosol and, with NOx, rural ozone. **Sea salt, dust, black carbon**: the aerosol precursors with days-long lives. And the **industrials**: the CFCs, HFCs, SF₆ (lifetime 3200 years, GWP 23 500 — the longest-lived greenhouse gas ever mass-produced) and the "forever" PFAS whose atmospheric branch is now a measured flux. The inventory discipline — bottom-up emission factors versus top-down inversions from the observation network — is where the numbers are actually made, and where the disagreements (wetland sensitivity, fossil leak rates, Asian NOx) become the literature's arguments.
:::

::: example The Dobson unit and the column {#ex-dobson}
Total ozone is reported in Dobson units (DU): $1\ \mathrm{DU} = 2.69\times10^{16}$ molecules per $\mathrm{cm^{2}}$ of vertical column. Find the column for a normal $300\ \mathrm{DU}$, and the **equivalent thickness** at surface conditions ($2.7\times10^{19}$ molecules cm⁻³) — the number Dobson invented the unit around.
::: solution
Column $= 300\times2.69\times10^{16} = 8.1\times10^{18}$ molecules $\mathrm{cm^{-2}}$. Spread at surface density the layer would be $8.1\times10^{18}/2.7\times10^{19} = 0.30\ \mathrm{cm}$ — **three millimetres**, which is the entire planetary shield against biologically lethal ultraviolet, thinner than a coin and worth more than every mine in the Sahara. The exercise is the whole lesson of stratospheric chemistry in one division: the important gases are thin, and thin things break — which is what happened over Halley Bay in 1985 ([[atmospheric-chemistry/stratospheric-ozone]]).
:::
:::

## Measuring the mixture

::: definition From Dobson's batteries to the inversion {#def-measuring}
Atmospheric chemistry is an observational science that invented its own instruments. **G. M. B. Dobson** built portable spectrophotometers in the 1920s, walked them around the world, and left the only pre-satellite global record of any atmospheric chemical — the ozone column, still measured at a dozen of his original stations. **Robert Bunsen and Gustav Kirchhoff**'s spectroscopy (1859) grew into the differential optical absorption (DOAS, MAX-DOAS) networks that read NO₂, SO₂, HCHO and O₄ from scattered sunlight and fly on satellites (TROPOMI's daily global NO₂ maps, which showed the Wuhan lockdown in real time in 2020). **Charles David Keeling**'s manometric CO₂ programme (1958–) established the continuous flask-and-tower discipline now extended to methane, CO, O₂ and isotopes by the global flask network and the ICOS/NOAA towers; **inversion modelling** — estimating surface fluxes by fitting the observed concentrations with transport models, the top-down method that settled the methane-is-biogenic question — is the discipline's signature synthesis, and its 2010s successor is **high-resolution inverse modelling from space**: TROPOMI and the GHGSat/Carbon Mapper constellations now find and quantify individual methane super-emitters, turning a global budget argument into a list of addresses. The lesson for the student of every science that measures small things: the instruments Dobson and Keeling built outlasted the theories they were built to test, and the discipline's greatest controversies (the ozone trend, the methane growth pause 2000–2006 and restart 2007–) were settled not by better models but by **longer records**.
:::

::: example A column from space {#ex-tropomi}
A TROPOMI-like instrument measures a $\mathrm{NO_2}$ tropospheric column of $2\times10^{15}$ molecules $\mathrm{cm^{-2}}$ over a city of $2000\ \mathrm{km^{2}}$, with an air lifetime against removal of $6$ hours. Estimate the city's $\mathrm{NO_x}$ emission rate in $\mathrm{mol\,day^{-1}}$ and in tonnes of N per year.
::: solution
At steady state, emissions = inventory$/\tau$. The column is per square centimetre, so the inventory over the city is $2\times10^{15}\times2\times10^{12} = 4\times10^{27}$ molecules (the area is $2000\ \mathrm{km^{2}} = 2\times10^{12}\ \mathrm{cm^{2}}$), and with $\tau = 6\ \mathrm{h}$ the daily emission is $4\times10^{27}/0.25 = 1.6\times10^{28}$ molecules $= 2.7\times10^{4}\ \mathrm{mol\,day^{-1}}$, i.e.
$$
2.7\times10^{4}\times14\ \mathrm{g} = 370\ \mathrm{kg\,N\,day^{-1}} \approx 140\ \mathrm{t\,N\,yr^{-1}},
$$
squarely in the range of measured $\mathrm{NO_x}$ inventories for a large city. The exercise is the actual method: satellite inversions are **steady-state bookkeeping**, and every term — the column (clouds and aerosols bias it low), the lifetime (6 hours in summer photochemistry, days in winter), the steady-state assumption (a weekend dip violates it) — carries its own paper's worth of uncertainty, which is why operational emission products quote error bars as wide as their central values.
:::
:::

::: warning ppm is not weight, lifetime is not fate, and the atmosphere's books do not balance by accident
Five errors. **"400 ppm sounds small, so it cannot matter"**: ppm is a **mole ratio**, and 420 ppm of a 10 330 kg column is 3300 Gt of a gas with infrared bands at exactly the wavelength where Earth emits — ratios, not weights, are the atmosphere's natural units, and the conversion is one multiplication away. **"A short lifetime means no problem"**: short-lived species are the air's **local** killers (ozone episodes, PM2.5) and, in the case of black carbon on snow and methane, among the fastest levers on Arctic warming — lifetime sets **where** and **how fast** a perturbation acts, not whether it acts. **"Natural sources mean natural is to blame"**: the wetlands' methane is real and growing, but the preindustrial burden was stable for 18 000 years; the doubling since 1800 requires a **net** source increase, and isotope and δ¹³C data place it in both fossil and biogenic sectors — the natural cycle amplifies, it does not initiate. **"The atmosphere self-cleans, so emissions are fine"**: OH has capacity limits — CO and methane compete for it, so raising them **lengthens their own lifetimes** (a positive feedback measured since the 1990s), and the chlorine from a decade of banned CFC production will outlast every policy that banned it. **And "the budget closes" is a result, not a default**: the fossil-fuel CO₂ budget balances only because the airborne fraction is **pinned** by the atmospheric measurement and the residual absorbs the errors of every other term — when the residual trends (as it did in the 1990s and 2010s), the sinks are changing, and the books have to be reopened.
:::

::: history
The air's discovery is a century of gases: **Daniel Rutherford** isolated nitrogen (1772), **Joseph Priestley** and **Carl Wilhelm Scheele** oxygen (1772–74), **Henry Cavendish** hydrogen and, crucially, showed "phlogisticated air" was five parts in a hundred of something unaccountable — the trail to argon. **Lord Rayleigh and William Ramsay** found argon (1894) by the discrepancy between chemical and atmospheric nitrogen density, one of science's great accidents; The theoretical photochemistry begins with **G. M. B. Dobson**'s ozone spectrophotometry (1920s) and **Sydney Chapman**'s ozone-cycle mechanism (1930), and **Robert Bunsen and Gustav Kirchhoff**'s spectroscopy (1859) is the ancestor of every DOAS and satellite sounder. **Charles David Keeling**'s continuous CO₂ record (1958–) and **Ralph Keeling**'s oxygen extension, the **Global Atmosphere Watch** flask network (WMO), the **Total Ozone Mapping Spectrometer** (1978–) and the **IPCC/UNEP** assessment cycle complete the observational edifice; the **Montreal Protocol** (1987) remains the one treaty that measured its own success from orbit.
:::

The chemistry these numbers feed is in [[atmospheric-chemistry/photochemistry]] (the reactor), [[atmospheric-chemistry/oxidising-power]] (OH and the self-cleaning capacity), [[atmospheric-chemistry/stratospheric-ozone]] (the thin shield), [[atmospheric-chemistry/aerosols]] (the scatterers and cloud-seeders), the carbon cycle context in [[climate-system/carbon-climate]], the nitrogen sources in [[biogeochemistry/nitrogen]], the sulphur and DMS cycle in [[biogeochemistry/phosphorus-sulfur]], the greenhouse-gas radiative physics in [[climate-system/energy-budget]], and the oxygen history in [[earth-history/oxygen-proterozoic]].

::: quiz
The atmospheric lifetime of a trace gas is defined as:
- [ ] the time since it was emitted.
- [x] the reservoir mass divided by the total removal flux.
- [ ] the time for half of it to decay.
- [ ] its chemical half-life against OH only.
::: solution
$\tau = M/F$: at steady state it is also the average time a molecule spends in the air. The definition matters because it is **system** property, not molecule property — methane's lifetime is set by the global OH abundance, so anything that changes OH (CO, NOx, water vapour) changes methane's lifetime and therefore its burden, without any change in emissions.
:::
:::

::: summary
- Dry air is N₂ + O₂ + Ar + CO₂ with minorities at ppb–ppt that carry disproportionate climate and chemistry; the whole column weighs 10 330 kg m⁻² and its scale height is 8.5 km.
- Residence time τ = M/F organises everything: 4 years (CO₂ gross), 9 (CH₄), 120 (N₂O), 45 (CFC-11), days (SO₂, ozone) — and it sets the GWP hierarchy and the policy asymmetry between fast and slow levers.
- Sources are biological, geological and industrial; the isotope and co-species data apportion them, and top-down inversions audit the bottom-up inventories.
- The ozone column is three millimetres thick at surface density — the whole UV shield — which is why thin things break.
- The discipline is instrument-led: Dobson's batteries, Keeling's flasks, TROPOMI's pixels; long records, not clever models, settle the arguments.
- Ratios not weights; lifetime is where-and-when, not whether; and the budget's closure is a measured result, never an assumption.
:::

## Exercises

::: exercise Column mass {level=1 check="10330"}
Find the mass of the atmospheric column per square metre from $P = 101\,325\ \mathrm{Pa}$ and $g = 9.81\ \mathrm{m\,s^{-2}}$, in kg to the nearest ten. (Enter the number.)
::: solution
$P/g = 101{,}325/9.81 = 10{,}330\ \mathrm{kg\,m^{-2}}$ — the weight of a small car of air over every square metre, and the conversion factor between every concentration and every tonne in this course.
:::
:::

::: exercise CO₂ mass {level=1 check="3300"}
Find the mass of atmospheric CO₂ at $420$ ppm in Gt, to the nearest hundred. (Total moles $1.78\times10^{20}$; $M_{\mathrm{CO_2}} = 44\ \mathrm{g\,mol^{-1}}$.)
::: solution
$420\times10^{-6}\times1.78\times10^{20}\times44 = 3.3\times10^{18}\ \mathrm{g} = 3300\ \mathrm{Gt}$ — $890\ \mathrm{GtC}$ wearing CO₂'s clothes, and the number against which every annual emission inventory (about 6 per cent of it per year) is spent.
:::
:::

::: exercise Methane burden {level=1 check="5500"}
Find the mass of atmospheric methane at $1920$ ppb, in Tg to the nearest hundred. ($M_{\mathrm{CH_4}} = 16\ \mathrm{g\,mol^{-1}}$.)
::: solution
$1.92\times10^{-6}\times1.78\times10^{20}\times16 = 5.5\times10^{15}\ \mathrm{g} = 5500\ \mathrm{Tg}$ — small enough to fit in a cube 1.7 km on a side, large enough, at 28 times CO₂'s per-gram clout over a century, to be the second-largest climate forcing humanity has added.
:::
:::

::: exercise Methane lifetime {level=2 check="9.5"}
Burden $5700\ \mathrm{Tg}$, total sinks $600\ \mathrm{Tg\,yr^{-1}}$. Find the lifetime in years to one decimal.
::: solution
$\tau = 5700/600 = 9.5$ years. Note what the number is **not**: not the time for emissions to stop mattering (the burden adjusts exponentially, 95 per cent within three lifetimes), and not a constant (OH changes with climate, and models disagree about whether a warmer atmosphere's OH rises enough to keep methane's lifetime steady — a rare case where the atmosphere's detergent strength is itself a climate question).
:::
:::

::: exercise Dobson column {level=2 check="8.1"}
Find the ozone column in molecules $\mathrm{cm^{-2}}$ for $300\ \mathrm{DU}$, expressed as $\times10^{18}$ to one decimal. (Enter the coefficient.)
::: solution
$300\times2.69\times10^{16} = 8.1\times10^{18}$ molecules $\mathrm{cm^{-2}}$. Every satellite ozone product is this multiplication in reverse, and the 1985 anomaly that revealed the ozone hole — a spring column of 110 DU over Halley — was this number having fallen by two-thirds in a decade.
:::
:::

::: exercise Scale height {level=2 check="8.5"}
Find the pressure scale height of air at $288\ \mathrm{K}$ ($M = 0.02897\ \mathrm{kg\,mol^{-1}}$, $g = 9.81$), in km to one decimal.
::: solution
$H = RT/Mg = 8.314\times288/(0.02897\times9.81) = 8.5\ \mathrm{km}$. The number explains why the tropopause (at $\sim 2H$) caps most pollution, why the ozone layer sits where UV photolysis and transport balance rather than where air is dense, and why aircraft cabins are pressurised to $\sim 2.4$ km even when flying at $3H$.
:::
:::

::: exercise Everest pressure {level=3 check="360"}
Using $p = p_0\,e^{-z/H}$ with $H = 8.5\ \mathrm{km}$, find the pressure at the summit of Everest ($8.85\ \mathrm{km}$) in hPa to the nearest ten. (Enter the number.)
::: solution
$p = 1013\times e^{-1.04} = 1013\times0.354 = 359\ \mathrm{hPa}$, about $360$ — a third of sea level, hence the "death zone" above $8\ \mathrm{km}$ where the oxygen partial pressure no longer sustains consciousness for long. The real atmosphere's scale height grows with temperature, which is why the same altitude is less hypoxic over the warm tropics (where the tropopause is 17 km high) than over the cold polar regions.
:::
:::

::: exercise The longest gas {level=3 check="23500"}
SF₆ has a lifetime of $3200$ years and a 100-year GWP of $23{,}500$. Find its GWP-weighted forcing per tonne relative to CO₂ over $100$ years, and explain why its tiny burden ($\sim 25{,}000\ \mathrm{t}$) still earns it a monitoring line in every emissions inventory. (Enter the GWP.)
::: solution
The GWP **is** the 100-year forcing ratio: $23{,}500$ times CO₂ per tonne. With a burden of only $25{,}000\ \mathrm{t}$ its total forcing is small ($25{,}000\times23{,}500/10^{6} \approx 0.6\ \mathrm{GtCO_2e}$), but its lifetime means every tonne emitted is permanent on human timescales and its growth is **additive forever** — the textbook case that GWP-based policy and lifetime-based policy are different policies, and that a molecule can be simultaneously negligible in mass and unbounded in consequence.
:::
:::
