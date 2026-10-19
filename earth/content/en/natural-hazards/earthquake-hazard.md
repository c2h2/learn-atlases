A great earthquake releases in seconds what a volcano spends centuries building, and does it under the places where millions of people sleep — which is why earthquake hazard is the atlas's purest lesson in the gap between physical knowledge (excellent: we can locate, size, date and model rupture to the metre) and social outcome (uneven: 1556 Shaanxi killed perhaps 830,000 in loess caves, 2010 Chile moved a magnitude-8.8 with hundreds of deaths, and the difference is not seismology but **code enforcement, land use and the four seconds of warning** between the fault and the city). This lesson is the earthquake as hazard: how we measure it (from Richter's ruler to the moment tensor), what the ground does to it (waves, basins, liquefaction), how the probability is assembled (PSHA, gaps, the Gutenberg-Richter law), and what society does back (codes, retrofit, early warning) — plus the one domain where seismology has no gift to offer: prediction, and the honest ethics of saying so.

## Measuring earthquakes

::: definition From Richter's ruler to the moment tensor {#def-measuring}
**Charles Richter's** 1935 local magnitude $M_L$ (the logarithm of the maximum seismogram amplitude, corrected for distance — each unit a factor of ten in amplitude, **32 in energy**) was a laboratory instrument that outlived its designer's intent: saturated at great distances and large events, it survives only in tabloid misuse ("the earthquake was an 8"). The physics arrived with **Kanamori and Hanks** (1977): the **seismic moment** $M_0 = \mu A D$ (rigidity × rupture area × mean slip — for a great subduction event, $30$ GPa × $50{,}000$ km² × 10 m ≈ $1.5\times10^{22}$ N m) and the **moment magnitude** $M_w = \tfrac{2}{3}(\log_{10} M_0 - 9.1)$, which does not saturate, is what "magnitude" now means, and re-sized the historical greats (1960 Valdivia 9.5 — the largest recorded; 1964 Alaska 9.2; 2004 Sumatra 9.1; 2011 Tohoku 9.0 — all subduction megathrusts, for the simple reason that the plate interface is the only fault surface large enough to slip hundreds of kilometres). The **Gutenberg-Richter law** $\log_{10} N = a - bM$ (b ≈ 1 globally: ten times as many earthquakes of each magnitude step, the scale-free fingerprint of a critical system — the **Bak, Tang and Wiesenfeld** self-organised-criticality interpretation and its contested successors) is the hazard analyst's spine: it converts a catalogue of small, well-recorded shocks into the probability of the large, unrecorded one. The **earthquake cycle** (elastic rebound — **Harry Fielding Reid's** 1911 synthesis of the 1906 San Francisco displacement, the strain accumulation on locked faults that makes the **seismic gap** concept (the 1857 Fort Tejon rupture's un-reloaded segments, the Cascadia gap's 1700 date, the Istanbul gap under the Marmara) the most dangerous sentence in applied seismology) and the **rate-and-state friction** framework (the **Dieterich and Ruina** school's earthquake-triggering physics, the basis of aftershock statistics) complete the source picture. The catalogue's modern instruments: the **global seismographic networks and the USGS/Global CMT catalogues** (every M5+ located in minutes, every M5.5+ with a full **moment tensor** — the fault plane, strike, dip, rake and slip that the **Dziewonski and the moment-tensor** school made routine), the **GPS and InSAR geodesy** (the interseismic locking map — the **Savage and the "locking depth" school**, the Sagami Trough's locked zone that sizes the Tokyo scenario), and the **finite-fault inversions** (the Tohoku 50-m slip patch imaged by joint seismic-geodetic modelling, the **ShakeOut** scenario method). The **b-value** itself is a hazard variable (low b — relatively fewer small quakes — marks the locked asperities of the Marmara and Cascadia, the **Wiemer and the "low-b asperity"** mapping), and the **energy budget** (radiated energy from the source spectrum, the Kanamori energy-to-moment ratio) separates the brittle shallow events from the slow and the deep — the taxonomy on which every hazard model's ground-motion selection now turns.
:::

::: example Sizing the unrecorded {#ex-moment}
A locked subduction segment 150 km along strike × 80 km down-dip is modelled to rupture with 6 m mean slip (μ = 30 GPa). Find the seismic moment and moment magnitude, and — using Gutenberg-Richter with b = 1 and the region's rate of **one M6+ earthquake per year** — estimate the mean recurrence of the modelled event.
::: solution
$M_0 = 3\times10^{10}\times(1.2\times10^{10})\times6 = 2.16\times10^{21}$ N m; $M_w = \tfrac{2}{3}(21.33-9.1) = 8.2$; the Gutenberg-Richter step from M6 to M8.2 is $10^{2.2} = 158\times$ rarer, so recurrence $\approx 158$ years — the **pairing of geodesy and statistics** that sizes every megacity scenario (Tokyo, Seattle, Kathmandu, Istanbul), and whose two weak links are honest: the slip assumed (the asperity may be smaller) and the b-law extrapolation (great events recur more regularly than the law's tail implies — the **Wiemer and the "characteristic earthquake"** correction of the Kagan-Molnar periodicity debate).
:::
:::

## What the ground does

::: definition Waves, sites and the amplification chain {#def-ground}
The earthquake's gift to the city is a **filter problem**: the same source, filtered by the path and the site, delivers wildly different shaking — and the filters are the hazard. **Body waves** (P at $V_p=\sqrt{(\lambda+2\mu)/\rho}$, S at $\sqrt{\mu/\rho}$ — the velocity jump across the core-mantle boundary that **Oldham** read in 1906 and **Gutenberg** measured to 2,900 km; **Inge Lehmann's** 1936 inner core from the P reflections) arrive first and second; **surface waves** (Love's horizontal shear, Rayleigh's rolling ellipse — the **1906 and 1911 Reid and Love** wave seismology) dominate distance and damage for shallow crustal events. **Site amplification** is the first filter: seismic energy trapping in soft sediments multiplies ground motion 2–6× at their resonant period — the quantified proof being **Mexico City 1985** (a magnitude-8.0 subduction event 350 km away, the lake-bed basin amplifying ~5× at 2 s period, the exact rhythm of the 6–15 storey buildings: 95 collapsed in the old lake district, none on the volcanic highland — the **Rosenblueth and the Mexico City code rewrite** that made site spectra law), the **1989 Loma Prieta Marina District** (the bay-mud liquefaction and the freeway collapse onto the Cypress structure), and every basin city from Tehran to Kathmandu whose microzonation maps the 2000s finally drew. **Liquefaction** is the second filter: saturated loose sands lose effective stress to their own shaking (the **1964 Niigata** apartment tilts and the **Seed and Idriss** liquefaction-triggering procedure of 1971 that codes now implement), sliding lateral spreads, buoying up gas stations, and — the 2011 Christchurch and 2018 Palu cases — destroying land value more completely than the shaking itself; the Japanese countermeasure industry (ground improvement, deep compaction, the gravel-drain fields) is the cheapest retrofit in the hazard catalogue where it applies. The **directivity and hanging-wall** filters (the fault-normal pulse that threw the 1995 Kobe elevated highways off their piers, the **Brune and the directivity** pulse documented in the 1999 Chi-Chi and 2016 Kumamoto records) and the **duration-sensitive** damage of tall, flexible structures (the 2018 and 2023 Türkiye long-period damage to mid-rise stock on soft soils) complete the chain from magnitude to loss — the chain that the **ground-motion prediction equations** (the **Abrahamson and the NGA-West and NGA-Subduction** families) now encode as probability distributions of intensity, and that the **scenario-shaking maps** (the USGS ShakeMaps, the **Wald and the "ShakeMap"** operational product) deliver within minutes as the first common picture of a disaster.
:::

::: example The Mexico City filter {#ex-site-amp}
A magnitude-8.0 subduction event 350 km away delivers rock-site peak acceleration 0.08 g at a lake-bed site whose fundamental period is 2.0 s. The basin amplifies 5× at that period. Find the surface acceleration, and explain in two sentences why the buildings that fell were 6–15 storeys and why the 1985 code's fix is a **period-matching** rule (avoid coincidence), not a strength rule.
::: solution
Surface acceleration $= 5\times0.08 = 0.4$ g **at the basin's 2 s period** — a narrow-band hammer swinging in rhythm; each storey has a natural period near 0.1 s per storey, so 6–15 storeys resonate at 0.6–1.5 s, close enough to the basin's 2 s (with higher-mode and nonlinear-soil broadening) to be shaken selectively — the "soft and tall in the lake district" death pattern; the code's fix is therefore **spectral**: design spectra that encode the basin's amplification peaks, so new buildings are pushed **off** the resonant band (stiffer, deeper, or base-isolated) rather than merely made stronger — the insight that turned seismic design from strength to **tuning**, the **Newmark and Hall** response-spectrum legacy (1950s–1960s, the University of Illinois school) applied to a city-scale filter.
:::
:::

## Hazard, codes and the prediction question

::: definition PSHA, gaps, codes, warning — and induced risk {#def-hazard-preparedness}
**Probabilistic seismic-hazard analysis** (**C. Allin Cornell**, 1968; the **Cornell and the "PSHA" framework**, the **McGuire and the "earthquake hazard and risk"** textbook) folds the four ingredients — source zones, the Gutenberg-Richter magnitude distribution, ground-motion prediction equations, and the site — into the **hazard curve** (annual probability of exceeding each intensity) and the **uniform hazard spectrum** that codes are written against (the 2-per-cent-in-50-year ground motion — a 1-in-2,475-year event — the "life-safety" target: codes are written to prevent **collapse**, not damage, the 1971 San Fernando and 1989 Loma Prieta lessons that made "no collapse" the explicit objective of the UBC-1994-to-ASCE-7 lineage and its global descendants). The **seismic-gap** logic (the **Ben-Menahem and the "seismic gaps"** synthesis, the **McCaffrey and the "locked zone"** geodesy) sizes the unruptured patches — Cascadia's January 26, 1700 (the Japanese orphan tsunami's **Satake and the "orphan tsunami"** dating, the dendrochronologically-fixed 1700 winter rupture), the Seattle fault, and the Marmara gap whose 250-year stress clock (the **Le Pichon and the "Marmara stress transfer"** from the 1999 Izmit earthquake) runs against Istanbul's 16 million — and the **time-dependent recurrence** models (**Reasenberg and the "earthquake triggering"**, the **Field and the UCERF** California forecast, whose 2023 UCERF3-ETM version includes triggered fault-to-fault rupture paths) that replaced the Poisson assumption where the data support it. **Codes and retrofit** are the hazard science cashed out: Japan's lineage from the **1923 Great Kantō** firestorm (105,000 dead; the fire-wind vortex that killed 38,000 in one open square — the **Kataoka and the "Great Kantō fire"** analysis) through the 1981 and 2000 codes to the **Kobe 1995** lesson (6,400 dead, the elevated highways and the unreinforced 1960s stock, the code revision and the **wooden-house retrofit campaign** whose slow uptake is the developed world's retrofit-paradox poster child), Chile's 1906-to-2010 code continuity (the **Pinochet-to-Bachelet technocratic institutions** — the university plan-check system that made the 2010 magnitude-8.8 survivable), New Zealand's **Christchurch 2010–2011** sequence (the CBD collapse, the **Royal Commission** findings on the code and the soil, the land-redemption decision that pre-paid the next event), and the **China 2008 Sichuan** contrast (the "tofu" school collapses and the 2009 school-safety regulation — the **Huang and the "school retrofit"** program, the fastest large-scale vulnerability reduction of the 2000s). **Earthquake early warning** (**Newmark's** 1949 "terminal alarm" proposal, the **Erdik and the Istanbul EEW** prototype, Japan's **JMA EEW** (2005–, the 2011 Tohoku 60-second public alert that stopped Shinkansen trains and hospital procedures), Mexico's **SAS** (1991–, the 2017 reactivation), the US **ShakeAlert** (2018–, the 2019 Ridgecrest and 2024 tests), and the **EEV and the "earthquake early warning"** global reviews) buys **seconds, not forecasts** — the automated-actions economics (the **Egli and the "economic value of EEW"** accounting: seconds of warning worth billions in grid, hospital and transit operations) that make it the cheapest large-scale risk technology since the cyclone shelter. **Induced seismicity** is the newest hazard term: the **Davis and the "Rocky Mountain Arsenal"** recognition, the wastewater-injection attribution of the **Oklahoma earthquake surge** (from ~2 to ~900 M3+ per year 2008–2015, the **Ellsworth and the "Oklahoma seismicity"** USGS-assessed cause — disposal wells, not fracking, the **Ellsworth and the "Oklahoma seismicity"** assessment), the **Basel 2006 and St Gallen** geothermal stimulations, the **Pohang 2017** EGS earthquake (the **Grigoli and the "Pohang"** attribution), and the **seismicity-rate traffic-light** regulations (the Oklahoma and Kansas injection-depth rules, the **0.001 per day** induced-risk thresholds of the 2020s) that now price energy and disposal decisions in earthquake risk — the one hazard term that is entirely, avoidably human.
:::

::: example The four-second economy {#ex-eew}
The 2011 Tohoku megathrust nucleated 130 km offshore; the JMA alert reached Tokyo ~4 seconds after the first P-wave detection 40 km from the trench (P at 6 km s⁻¹, S at 3.5 km s⁻¹). Find the warning time Tokyo received before the destructive S-wave arrived, and — using the **Egli and the "EEW economic value"** estimate that a nationwide 10-second average warning is worth ~$1 B yr⁻¹ in avoided operational losses — explain in two sentences why the hard part of EEW is not detection but **automation**.
::: solution
S-wave travel to Tokyo $\approx 130/3.5 = 37$ s; detection at ~7 s (40 km of P at 6 km s⁻¹ plus processing) leaves **~30 s** of public warning (the reported 4 s was the first raw alert; the public broadcast preceded the S arrival by tens of seconds) — enough to slow trains (the Shinkansen's 17 trains stopped without a single passenger injury), open the emergency brakes on factories, and pause the surgery, but **only if machines act**: 30 seconds is less than a human decision loop, so the value of EEW is unlocked only by pre-programmed automation (the **Egli accounting's** billions live in the grid trip, the elevator stop, the gas valve), and the liability, false-alarm and equity questions of letting machines act are the unsolved, human remainder — the prediction problem in its only solvable form.
:::
:::

## The aftershock calculus

::: example Omori's ledger {#ex-omori}
Aftershock rate follows the modified Omori law $n(t) = c/(t+p)^{p'}$; for the mainshock sequence use $c = 100$ day⁻¹·day and $p = p' = 1$ (so day 1 aftershocks number 100). Find the expected number of aftershocks on (a) day 10 and (b) day 100, and explain in two sentences why the **2016 Kaikōura** double rupture (M7.4 then M7.8 twelve hours later, on adjacent structures) and the **2023 Kahramanmaraş** doublet (M7.8 then M7.5 nine hours later) turned the law's largest uncertainty — "is this the mainshock?" — into an operational crisis for responders and for early-warning automation.
::: solution
Day 10: $100/10 = 10$ day⁻¹; day 100: $100/100 = 1$ day⁻¹ — the decay that lets re-entry schedules be written, **provided the first event was the largest**; the doublets broke that assumption (the second shock was larger, the "mainshock" label is retrospective, and the cumulative triggering — the **Reasenberg and the "triggered aftershock"** rate-and-state models, the **Toda and the "Coulomb stress transfer"** school whose calculations anticipated the 2016 Kaikōura second rupture on the adjacent fault years before it — means the first event's stress change **loaded** the second), so the operational rules now carry a "larger may follow" caveat (the USGS and GNS science advisories of 2016 and 2023), and the automation designed for a decaying sequence must tolerate a second, larger jolt — the statistical comfort of Omori's law purchased at the price of its one honest caveat.
:::
:::

::: widget plot
f: 2*(8.2-x)
x: 5, 8.2
y: 0, 7
labels: \log_{10}(\mathrm{relative\ rate})
caption: The Gutenberg-Richter law (b = 1) drawn as log relative rate against magnitude — a slope of minus one per magnitude, two log units (a factor of 100) more M6 events than M8, the scale-free ladder that lets a century of small-earthquake catalogues price the great one. The curve's straightness is the physics (criticality, the **Bak-Tang-Wiesenfeld** interpretation) and its breaks are the hazard (the characteristic magnitude of a finite fault, the b-value lows of locked asperities, the induced-seismicity swarms with their anomalous b > 1) — every seismic-risk number in the world rests on how far the line can be trusted upward.
:::

::: warning Magnitude is not hazard, hazard is not risk, prediction is not coming (and its absence is not negligence), "no collapse" is not "no damage", and induced seismicity is a choice
Five errors. **"A magnitude 8 is 10 times worse than a magnitude 7"**: the energy ratio is **32×** and the moment ratio **30×** — the logarithmic ladder that tabloids read linearly and engineers never do; and magnitude itself is only one hazard ingredient: the 2010 Haiti M7.0 (shallow, blind thrust, populated, unprepared) versus the 2013 offshore Pakistan M7.7 (similar size, a tenth the deaths at sea) differ by **geography and preparation**, not magnitude. **"The hazard map tells me my risk"**: the map is the hazard term only — risk multiplies in the exposure (the soft-storey apartments the map's city has built since the map was drawn) and vulnerability (the code vintage of every structure on it), and the 2015 Gorkha and 2023 Türkiye events were **vulnerability disasters inside mapped hazard zones** — the maps were right and the buildings were not. **"Seismologists should have predicted it"**: the honest consensus (the **Geller, the "earthquake prediction cannot be successfully predicted"** position of the 1990s–2010s, the **Lancet** editorial and the **VAN** episode's aftermath — the Greek electricity-method claims that failed blind tests, the **Lancet** editorial after the 2009 L'Aquila trial of the scientists — the **Commission and the "risk communication"** verdict that the crime was communication, not prediction) is that **short-term prediction has no demonstrated method**, the long-term probabilistic forecast is the real deliverable, and the L'Aquila trial's chilling of honest communication is the cautionary tale for every future uncertainty; the public investment that replaces prediction is **codes, retrofit, warning and insurance** — the four technologies that work without knowing the date. **"The building is code-compliant, so it's safe"**: codes are **life-safety** instruments (the 2-per-cent-in-50-year collapse prevention; the 2023 Türkiye and 2015 Gorkha lessons that **code-compliant is code-enforced**, and that mid-rise non-ductile stock and soft storeys are the killers), and the **functional loss** of the compliant building (the 2011 Christchurch hospital evacuations, the 2020 Petrolia and 2024 Ferndale hospital closures after moderate Humboldt events — the **California hospital seismic-safety program's** SB 195/SB 493 compliance saga, the state's own hospitals failing its own law) is the unbilled liability every hospital and school owner carries. **And "the Oklahoma earthquakes are bad luck"**: they are **waste disposal** — the injection-induced sequence (the **Ellsworth attribution**, the **USGS and the "induced seismicity"** framework) is the clearest case in history of a hazard created by an industrial practice and reduced by regulation (the 2016 rules cut the rate by half within years — the **Elliott and the "Oklahoma response"** monitoring), and the same physics now prices geothermal stimulation, enhanced recovery and disposal siting everywhere: **induced seismicity is the one earthquake hazard that is entirely optional**, which is why every occurrence is a governance story, not a natural one.
:::

::: history
Earthquake science begins with **the 1755 Lisbon earthquake's** three shocks, tsunami and fires (the **Pombaline** reconstruction — the first anti-seismic urban plan, the "box cage" — and the philosophical shock ran through Voltaire and Kant), and **Robert Mallet's** 1857 *Naples earthquake* (the first macroseismic map and the first scientific post-event survey). The instrument era: the **Milne and the Japanese seismoscope network** (1880s, the Tokyo school that made seismology a science), **Oldham's** 1906 core, **Reid's** 1911 elastic rebound after the San Francisco displacement, **Beno Gutenberg and Charles Richter's** 1930s California work (the magnitude scale, the global rate, the Gutenberg-Richter law of 1944, Gutenberg's 1954 *Internal Constitution of the Earth*), **Inge Lehmann's** 1936 inner core, and **Fusakichi Omori's** 1894 aftershock law. The engineering era: the **1906 and 1923** disasters (Japan's 1923 Great Kantō firestorm and the birth of Japanese seismic design), **Newmark and Hall's** response spectra (1950s), the **1971 San Fernando** (the hospital collapses that rewrote the codes' objective), the **1976 Tangshan** (the largest modern loss, the **China Earthquake Administration's** founding), the **1985 Mexico City** (the site-effect code rewrite), the **1989 Loma Prieta and 1995 Kobe** (the infrastructure failures that created traffic and retrofit policy), the **1994 Northridge** (the insurance crisis that created California's earthquake-authority market — the **Earthquake Authority's** 2000 retail program), and the **1999 Kocaeli and Chi-Chi** (the Turkish building-amnesty politics and the Taiwanese strong-motion records that rewrote directivity). The space-and-network era: **GPS geodesy and InSAR** (the locking maps, the **Simons and the "locking depth"** school), the **USArray and the global networks**, the **ShakeMap** operations, the **UCERF** forecasts (2008, 2015, 2023), the **2004 Sumatra and 2011 Tohoku** great events (the rupture-duration and slow-slip lessons, the **ShakeOut** scenario culture), and the **induced-seismicity** science (the **Healy and the "Rocky Mountain Arsenal"** 1966 experiment, the Oklahoma attribution of 2015, the Pohang findings of 2020) — the field now forecasting probability, warning in seconds, and regulating its own newest hazards, while the date remains, honestly and permanently, unknown.
:::

::: quiz
The moment magnitude $M_w$ was introduced because earlier magnitude scales:
- [ ] were measured in wrong units.
- [x] saturated for large earthquakes, underestimating great events.
- [ ] required ocean data.
- [ ] were based on intensity.
::: solution
Richter's $M_L$ and surface-wave magnitude stop growing when the fault dimensions exceed the calibration (the 1967 Kanamori and Hanks reformulation from seismic moment fixed it — the reason "the largest recorded earthquake" is a moment magnitude, 9.5, and why news reports of "Richter 8" for great events are doubly wrong).
:::
:::

::: summary
Earthquake hazard is measured in moment (μAD, the Kanamori-Hanks scale that sizes the greats), counted by the Gutenberg-Richter ladder (b ≈ 1, the statistics that price the unrecorded event from the recorded ones), and filtered by the ground (basin amplification, liquefaction, directivity — the Mexico City 5× and the Niigata liquefaction that turn magnitude into local intensity). The hazard is assembled probabilistically (Cornell's PSHA, the gap and geodetic-locking logic, UCERF's triggered-rupture forecasts), cashed out in codes written for collapse prevention (Japan's Kantō-to-Kobe lineage, Chile's continuity, China's school retrofit), and warned in seconds (the P-wave alerts whose value lives in automation). Prediction is not coming — the honest science is probability, warning and construction, and the L'Aquila trial's lesson is that uncertainty communicated well saves more than certainty faked. The newest term is the optional one: induced seismicity, the earthquake hazard that regulation can delete. The date is unknowable; the outcome is not; that asymmetry is the entire discipline in one sentence.
:::

::: exercise {level=1 check="32"}
Find the energy ratio between successive whole magnitudes.
::: solution
$10^{1.5} = 32$ — one magnitude step is 32× the energy, two is 1,000×.
:::
:::

::: exercise {level=1 check="100"}
With b = 1, find how many times more M6 than M8 earthquakes occur.
::: solution
$10^{2} = 100$ — the Gutenberg-Richter ladder's two-step ratio.
:::
:::

::: exercise {level=1 check="9.5"}
State the magnitude of the largest recorded earthquake (1960 Valdivia).
::: solution
**Mw 9.5** — the Valdivia megathrust, the event that forced the moment scale.
:::
:::

::: exercise {level=1 check="66"}
An S-wave arrives 8 s after the P-wave (Vp 6.1, Vs 3.5 km s⁻¹). Find the epicentral distance (km, nearest km).
::: solution
$d = 8/(1/3.5-1/6.1) = 8/0.1218 \approx 66$ km — the elementary locator's one-station estimate.
:::
:::

::: exercise {level=2 check="5"}
With b = 1 and 20 M6+ earthquakes per year, find the mean recurrence (years) of M8+ events.
::: solution
$20/100 = 0.2$ yr⁻¹ → **5 years** — the ladder's arithmetic, and why M8 recurrence estimates carry factor-of-three error bars.
:::
:::

::: exercise {level=2 check="0.4"}
A basin amplifies rock-site 0.08 g by 5×. Find the surface peak acceleration in g.
::: solution
$5\times0.08 = 0.4$ g — the Mexico City filter, the reason microzonation is code law.
:::
:::

::: exercise {level=3 check="7.5"}
Find Mw for M0 = 2×10²⁰ N m.
::: solution
$M_w = \tfrac{2}{3}(\log_{10}2\times10^{20}-9.1) = \tfrac{2}{3}(20.30-9.1) = 7.5$ — the 1989 Loma Prieta's moment, give or take.
:::
:::

::: exercise {level=3 check="30"}
For the Tohoku example (S at 3.5 km s⁻¹ over 130 km, detection 7 s after rupture), find the warning time (s) Tokyo received before S arrival.
::: solution
$130/3.5 - 7 = 37-7 = 30$ s — the four-second headline understated the real margin, and the entire value of the system lives in automating within it.
:::
:::
