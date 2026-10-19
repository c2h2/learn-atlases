The atmosphere cleans itself, and the detergent is a radical that survives for a second at a concentration of one part in a trillion — hydroxyl, OH, whose global abundance, $10^{6}$ molecules per cubic centimetre averaged through the sunlit troposphere, is small enough to fit in a thimble and large enough to decide how long methane, carbon monoxide, solvent vapours and industrial halocarbons stay in the air. Before 1971 the oxidising capacity of the troposphere was assumed to be its dilution; **Jack Levy** then calculated that trace amounts of OH, made where ozone meets water vapour and sunlight, must run the chemistry of the whole lower atmosphere, and the field has spent fifty years confirming, calibrating and — most recently — worrying about him. Confirming: laser-induced fluorescence now counts OH photons directly, and the methyl chloroform clock, run for four decades by the AGAGE network, has weighed the global oxidant field with an accuracy no model predicted. Worrying: the clock shows the detergent's growth stalled in the 2000s, its growth in the 1990s was driven by pollution itself, and the atmosphere's self-cleaning capacity — the service it provides to every emission inventory on Earth — is now understood as a variable of the climate system, not a constant of nature.

## The engine's budget

::: definition Sources and sinks of OH {#def-oh-budget}
Tropospheric OH is made in three ways and destroyed in one. The dominant source (roughly two-thirds) is the ozone–water route: $\mathrm{O_3} + h\nu (\lambda < 320\ \mathrm{nm}) \rightarrow \mathrm{O}(^1\mathrm{D})$ (quantum yield 0.6), $\mathrm{O}(^1\mathrm{D}) + \mathrm{H_2O} \rightarrow 2\,\mathrm{OH}$ — which is why OH peaks in the hot, wet, high-UV tropics and over polluted air with plenty of ozone (the paradox that the global oxidant maximum sits over South and East Asia, where pollution supplies ozone and the monsoon supplies vapour). The morning source, **HONO photolysis** ($\mathrm{HONO} + h\nu \rightarrow \mathrm{OH}$, $J \sim 10^{-3}\ \mathrm{s^{-1}}$), ignites OH an hour before the ozone route can start, and its strength — the "missing HONO" problem of every urban campaign — sets the timing of the day's photochemistry. The night source is the ozonolysis of alkenes, which makes $\mathrm{O}(^1\mathrm{D})$ without sunlight and keeps a candle of OH burning over forests after dark. The sink is simple: OH reacts with what is in the air, and globally **carbon monoxide claims about 60 per cent, methane 35 per cent, the rest shared by VOCs, hydrogen and the halocarbons** — so the engine's fuel is also its brake: more CO or methane means less OH, longer lifetimes, and more of everything. The steady-state abundance, $[\mathrm{OH}] = P/L$, is thus set by the very pollutants it removes — the defining nonlinearity of tropospheric chemistry.
:::

::: example The engine's throughput {#ex-throughput}
Global mean $[\mathrm{OH}] = 10^{6}\ \mathrm{cm^{-3}}$, air $2.5\times10^{19}\ \mathrm{cm^{-3}}$, tropospheric column $2.1\times10^{25}\ \mathrm{air\,cm^{-2}}$. Find the column of OH and the global oxidation flux of CO ($k = 1.5\times10^{-13}\ \mathrm{cm^{3}\,s^{-1}}$, CO at 100 ppb), and compare with the surface CO source ($900\ \mathrm{Tg\,yr^{-1}}$).
::: solution
The column of OH is the mean mixing ratio times the air column: $100\times10^{-12}\times2.1\times10^{25} = 2.1\times10^{15}\ \mathrm{cm^{-2}}$. The CO loss frequency is $k[\mathrm{OH}] = 1.5\times10^{-13}\times10^{6} = 1.5\times10^{-7}\ \mathrm{s^{-1}}$, a lifetime of $6.7\times10^{6}\ \mathrm{s} = 2.1$ months. The global CO burden is $100\times10^{-9}\times(2.1\times10^{25}\times5.1\times10^{18})\times28\times1.66\times10^{-24} = 500\ \mathrm{Tg}$, so the OH sink is $500/0.175 \approx 2900\ \mathrm{Tg\,yr^{-1}}$... the comparison shows the **total** CO source (fossil, biomass, ocean, plus the large secondary source made by methane and VOC oxidation aloft) balances the OH sink within the factor-of-two errors of both inventories — the classic demonstration that OH is not a free parameter: get it wrong by 30 per cent and the CO budget visibly fails, which is why CO is called a standing constraint on the oxidant field alongside methyl chloroform.
:::
:::

## Measuring the invisible

::: definition The methyl chloroform clock {#def-mcf}
Hydroxyl was too reactive to weigh directly for twenty years after Levy's prediction, so the field built a clock out of chemistry: **methyl chloroform** (1,1,1-trichloroethane, MCF), an industrial solvent with no natural source, no ocean sink worth naming, and destruction almost entirely by OH. Its atmospheric decline is therefore a **direct reading of global OH**: $1/\tau_{\mathrm{obs}} = 1/\tau_{\mathrm{OH}} + 1/\tau_{\mathrm{strat}} + 1/\tau_{\mathrm{soil}}$, the stratospheric term constrained by circulation models and the soil term bounded small, so the observed lifetime against OH — about 5.6 years — is the inverse of the mean $[\mathrm{OH}]$ to within the transport model's accuracy. The AGAGE flask network, running since 1987 under **Ronald Prinn**'s leadership, has read the clock for four decades, and its verdicts are field-defining: OH **grew roughly 1 per cent per year through the 1990s** (driven by CO and NOx from Asian industrialisation — pollution making the detergent that destroys pollution), **stalled in the 2000s** as aerosols scattered the photolysis photons and NOx chemistry shifted; and the clock itself carries a systematic, because MCF's oxidation products feed back on OH, so the raw clock **underestimates** the true oxidant field by 10–20 per cent — a correction every trend paper now carries. Direct measurement arrived with **laser-induced fluorescence** (LIF): aircraft and balloon lasers resonantly excite OH and count its fluorescence, brought to quantitative rigour by **J. G. Anderson**'s early systems and, for the troposphere, by **Paul Wennberg**'s calibration programme, whose intercomparisons still define the measurement standard. And the frontier method is **total OH reactivity** — scrub the known OH and watch what the air destroys — whose persistent 10–30 per cent "missing reactivity" over forests and cities says the atmosphere is still making oxidant-consuming chemicals we have not named.
:::

::: example Reading the clock {#ex-mcfclock}
MCF's observed total loss frequency is $0.20\ \mathrm{yr^{-1}}$; the stratospheric sink contributes $0.05\ \mathrm{yr^{-1}}$ and soils $0.03\ \mathrm{yr^{-1}}$. Find the lifetime against OH, and if the clock's product feedback means the true OH loss frequency is 15 per cent higher, find the corrected lifetime.
::: solution
$1/\tau_{\mathrm{OH}} = 0.20 - 0.05 - 0.03 = 0.12\ \mathrm{yr^{-1}}$, so the raw clock reads $\tau_{\mathrm{OH}} = 8.3\ \mathrm{yr}$... with the correction, $0.138\ \mathrm{yr^{-1}}$ and $7.2$ years — a **15 per cent higher** [OH] than the raw clock reads. The exercise is the whole method in two subtractions: a solvent invented for degreasing, banned by the Montreal Protocol, became the most precise global chemical instrument ever built, and its reading still moves by tenths of a per cent per year — the rate at which the atmosphere's self-cleaning capacity changes.
:::
:::

::: widget plot
f: 280*exp(-(x-1994)/8)
x: 1994, 2024
y: 0, 300
labels: \mathrm{MCF}\ (\mathrm{ppt})
caption: The methyl chloroform decline — from its 1994 peak of 280 ppt toward zero at a 5.6-year lifetime, the curve that has weighed global OH for a generation. The curve's small wobbles are the signal: the wobble's slope is the OH trend, its hemispheric asymmetry is the source geography, and the fact that the curve keeps falling **faster than emissions alone allow** is the proof that the sink is real, global, and measured.
:::

## Oxidising power and its trends

::: definition The oxidant family and its capacity {#def-oxidising-power}
OH is about 90 per cent of the troposphere's oxidation capacity, but the **oxidising power** is a family: ozone (the bulk of the remainder, and the sole oxidant of the darkest hours), the nitrate radical NO₃ (the night's workhorse in NOx-rich air, building organic nitrates and nocturnal aerosol), the halogen atoms (Cl atoms, a hundred times more reactive than OH toward alkanes, now recognised as a major marine-boundary-layer oxidant of methane, DMS and ozone itself where sea-salt aerosol and bromine chemistry run hot), and the stratospheric intrusions of O₃ that punctuate clean-air records. The family's capacity is **not fixed**: the 1990s–2000s history (OH rising with Asian CO and NOx, then plateauing) shows the oxidant field tracking human emissions with a gain that models reproduce only when they get aerosol optical depth and isoprene right. The **future** is where the argument lives: most chemistry–climate models project OH rising 5–15 per cent by 2100 (more NOx and CO in developing pathways, more water vapour everywhere), which would shorten methane's lifetime and **dampen** the carbon–climate feedback — a negative feedback of policy importance — while the same models make OH sensitive to the 2020s' great uncontrolled experiment: **China's clean air**, whose SO₂ cut (down 60 per cent since 2013) lifted photolysis rates and, with it, eastern China's OH — an unintended consequence being read right now by the observation network the Montreal Protocol built.
:::

::: example The methane–OH handshake {#ex-handshake}
If methane emissions doubled and the extra methane consumed enough OH to lower global [OH] by 5 per cent, by what per cent above the linear expectation is the new equilibrium burden?
::: solution
Lifetime is inversely proportional to [OH], so a 5 per cent OH cut lengthens it by $1/0.95 = 5.3$ per cent, and the steady-state burden rises by the same: the feedback **adds 5 per cent to the doubling**, a small but strictly positive feedback on methane itself. The same arithmetic runs in reverse for the future: a projected 10 per cent OH rise would erase a tenth of methane's burden at constant emissions — meaning a tenth of methane's forcing is cancellable by chemistry alone, and meaning that **methane's lifetime is not a constant of nature but a function of the oxidant field the emitting world builds**.
:::
:::

## Competition, chlorine and the frontier

::: definition Who else cleans, and what gets missed {#def-competition}
Because OH is shared, every oxidation is a **competition**: CO is the global thermostat of OH (its 60 per cent share means the fire-and-fossil CO record is an OH record), hydrogen competes next, and the VOCs' reactivity — not their mass — decides who burns first, which is why methane, the atmosphere's most abundant reactive carbon, is oxidised reluctantly (its C–H bond is the strongest in the business) and lives nine years while isoprene lives an hour. The **chlorine atom** is the competition's wildcard: formed from sea-salt and bromine chemistry over coasts and the marine boundary layer, it is 10–100 times more reactive than OH toward alkanes and DMS, and its recognition as a global methane sink (a few per cent, but growing with sea-salt emissions) is one of the 2010s' quiet paradigm shifts — as is the corollary that **short-lived chlorine and bromine species**, uncounted by the Montreal Protocol because they never reach the stratosphere, are major boundary-layer oxidants whose emissions (solvents, flame retardants, "unregulated substances") are now on the assessment agenda. And the frontier is the **missing reactivity**: at forest sites and in cities, total OH reactivity measurements find 10–30 per cent of the OH destruction unaccounted for by measured species — unmeasured isoprene second- and third-generation products chief among them — meaning the oxidation chains that make secondary organic aerosol and ozone are still partly unwritten, and the atmosphere's detergent keeps finding work we cannot yet name.
:::

::: example Missing reactivity {#ex-missingreact}
At a forest site the measured total OH reactivity is $12\ \mathrm{s^{-1}}$; measured species (isoprene, monoterpenes, CO, NO₂, and 40 oxidation products) account for $8.5\ \mathrm{s^{-1}}$. Find the missing fraction, and if the gap is closed entirely by an unmeasured isoprene oxidation product at $2\times10^{9}\ \mathrm{molecules\,cm^{-3}}$, find its OH rate constant and name its likely chemistry class.
::: solution
Missing $= 3.5/12 = 29$ per cent. The implied rate constant is $k = 3.5/2\times10^{9} = 1.75\times10^{-9}\ \mathrm{cm^{3}\,s^{-1}}$ — collision-limited, the signature of **carbonyl oxides (Criegee intermediates) and highly oxygenated molecules (HOMs)**, the autoxidation products that are the actual nucleation and aerosol-growth agents of clean forests. The exercise is the current research frontier in one division: the missing reactivity is not a measurement error but **unexplored chemistry**, and it is exactly the chemistry that turns a forest's breath into cloud condensation nuclei.
:::
:::

::: warning OH is not the atmosphere's immune system, it cannot be "tipped", methyl chloroform is not a perfect clock, and clean air has oxidant consequences
Five errors. **"OH will collapse if we emit enough"**: the engine has strong negative feedbacks — less OH means longer-lived methane and CO, whose increased abundances restore OH production through the ozone–water route, and no model or record shows a runaway; the honest statement is that the oxidant field **shifts by tens of per cent**, with real lifetime consequences, not that it fails. **"Methyl chloroform gives OH exactly"**: the clock assumes known stratospheric circulation (which is accelerating, a correction that grows with time), negligible ocean exchange (nearly true), and no product feedback (false by 10–20 per cent) — the raw clock and the corrected clock disagree about the 2000s trend, and the disagreement is the paper. **"Cleaner air is chemically free"**: SO₂ cuts change photolysis and hence OH; NOx cuts change the NO₂ photostationary state and hence ozone and OH; aerosol cuts change the UV field — China's clean-air programme is the largest **oxidant experiment in history**, and its results (more OH, faster solvent removal, ozone responses of both signs) are arriving as we read them. **"The missing reactivity is a calibration problem"**: it has survived three decades of better instruments; it is chemistry — autoxidation, Criegee branching, halogen recycling — and treating it as noise biases every secondary-aerosol and ozone forecast that uses the mechanisms. **And "oxidising power protects the climate" is half-true**: more OH removes methane (good) but also makes **ozone** from the same NOx and CO (bad, and ozone is itself a greenhouse gas and a poison) — the atmosphere's detergent is not a service with a sign; it is a reaction network whose goods and harms must be counted species by species.
:::

::: history
**Jack Levy** (1971) predicted that trace OH must dominate tropospheric oxidation — a two-page paper that founded the field's central concept; **Paul Crutzen** established the NOx–HOx cycles that make ozone both pollutant and oxidant, the first of three Nobel-adjacent careers built on radicals (chemistry, 1995, with Molina and Rowland). The measurement era splits into two lineages: **James G. Anderson**'s rocket- and aircraft-borne laser-induced fluorescence, beginning in the 1970s, which proved OH could be counted photon by photon, and **Paul Wennberg**'s calibration school at Caltech, whose 2000s intercomparisons resolved a decade's worth of disagreement about the atmospheric OH measurement standard and revealed the primary-VOC reactions that had biased it. The global clock is **Ronald Prinn**'s AGAGE network (1987–), whose methyl-chloroform readings turned OH from a model output into a measured quantity with a trend — and a trend that changed sign, the 1990s rise and 2000s stagnation that **Jos Lelieveld** and colleagues' oxidising-capacity syntheses made central questions of atmospheric chemistry. The self-cleaning atmosphere, in other words, is a 50-year-old idea that became a 40-year-old measurement and is now a live indicator — one whose 2020s reading is being written by a chemistry experiment no one designed: the rapid clean-up of East Asian air, whose oxidant consequences the clock will report before the epidemiology does.
:::

::: quiz
The global mean tropospheric OH burden is measured primarily by:
- [ ] direct satellite UV spectroscopy of the OH radical.
- [x] the decline of methyl chloroform, whose only major sink is OH.
- [ ] surface flux-tower measurements.
- [ ] radiosonde humidity soundings.
::: solution
Methyl chloroform — an industrial solvent with no natural source and one sink — acts as a global OH clock read by the AGAGE network (with a 10–20 per cent product-feedback correction). Satellite OH columns exist but are too uncertain to carry the global budget; flux towers cannot see the radical's global work.
:::
:::

::: summary
The atmosphere's oxidising power is a radical budget: OH made from ozone plus water (two-thirds), HONO at dawn, ozonolysis at night; destroyed by CO (60 per cent), methane (35 per cent) and the rest — an engine whose fuel is its brake and whose abundance is set by the pollutants it removes. Methyl chloroform turned the global oxidant field into a measurement: OH rose about 1 per cent per year through the 1990s, stagnated in the 2000s, and carries a 10–20 per cent clock correction that is itself a research literature. Direct LIF measurement, total reactivity's missing 10–30 per cent, and chlorine's rise as a boundary-layer oxidant have made the oxidant family richer and less certain. The oxidising capacity is now a variable of the Earth system: damped by its own feedbacks, shifted by aerosol and clean air, projected to rise this century, and shortening methane's lifetime even as we lengthen our dependence on it. The atmosphere cleans itself; the question of atmospheric chemistry is what it charges us for the service.
:::

::: exercise {level=1 check="2.1"}
Find the lifetime of carbon monoxide against OH oxidation at global mean $[\mathrm{OH}] = 10^{6}\ \mathrm{cm^{-3}}$, $k = 1.5\times10^{-13}\ \mathrm{cm^{3}\,s^{-1}}$, in months.
::: solution
$\tau = 1/(1.5\times10^{-7}\ \mathrm{s^{-1}}) = 6.7\times10^{6}\ \mathrm{s} = 2.1$ months — the reason CO is a boundary-layer tracer and its gradient an OH sensor.
:::
:::

::: exercise {level=1 check="60"}
For methyl chloroform, what percentage of its total atmospheric loss frequency ($0.20\ \mathrm{yr^{-1}}$) is reaction with OH ($0.12\ \mathrm{yr^{-1}}$)?
::: solution
$0.12/0.20 = 60$ per cent — the reason the clock is only as good as the stratospheric and soil corrections subtracted from the remainder.
:::
:::

::: exercise {level=1 check="7.1"}
If MCF's total loss frequency were $0.22\ \mathrm{yr^{-1}}$ with stratospheric loss $0.06\ \mathrm{yr^{-1}}$ and soil loss $0.02\ \mathrm{yr^{-1}}$, find the raw OH lifetime in years.
::: solution
$1/\tau_{\mathrm{OH}} = 0.22-0.06-0.02 = 0.14$, so $\tau_{\mathrm{OH}} = 1/0.14 = 7.1$ years.
:::
:::

::: exercise {level=2 check="8.7"}
If NOx reductions cut OH production 8 per cent in a polluted region, find the percentage increase in the local burden of a solvent whose only sink is OH, at constant emissions.
::: solution
Lifetime and burden scale as $1/[\mathrm{OH}]$: $1/0.92 = 1.087$, an increase of **8.7 per cent** — the reason air-quality rules that cut NOx must be screened for solvent and PAN side-effects.
:::
:::

::: exercise {level=2 check="1.7e-9"}
At a coastal site the missing OH reactivity is $2.4\ \mathrm{s^{-1}}$ and the candidate halogenated volatile is $1.4\times10^{9}\ \mathrm{cm^{-3}}$. Find its implied OH rate constant in $\mathrm{cm^{3}\,s^{-1}}$ (two significant figures, e.g. 1.2e-9).
::: solution
$k = 2.4/1.4\times10^{9} = 1.7\times10^{-9}\ \mathrm{cm^{3}\,s^{-1}}$ — within a factor of two of the collision limit, chemically plausible for an oxygenated or halogenated short-lived species, and exactly the class the Montreal Protocol does not yet count.
:::
:::

::: exercise {level=3 check="1.053"}
Methane emissions rise 50 per cent and [OH] falls 5 per cent as a result. By what factor does the equilibrium methane burden exceed the value implied by the emissions rise alone (i.e. the burden relative to $1.5\times$ baseline)?
::: solution
The OH feedback multiplies by $1/0.95 = 1.053$: the burden is 5.3 per cent above the linear expectation — a small positive feedback, applied repeatedly in carbon-cycle models, that is one reason the airborne fraction of reactive gases is not constant.
:::
:::

::: exercise {level=1 check="0.3"}
A pollutant's only sink is reaction with OH ($k = 2\times10^{-11}\ \mathrm{cm^{3}\,s^{-1}}$). Find its lifetime in days (one decimal) at coastal $[\mathrm{OH}] = 2\times10^{6}\ \mathrm{cm^{-3}}$.
::: solution
$\tau = 1/(4\times10^{-5}\ \mathrm{s^{-1}}) = 2.5\times10^{4}\ \mathrm{s} = 0.29$ days, i.e. **0.3 days** — a day-cycler, the class whose oxidation makes ozone downwind and whose climate impact depends on where it is emitted.
:::
:::

::: exercise {level=3 check="-0.11"}
A model projects [OH] rising 12 per cent by 2100 while methane emissions stay constant. Find the resulting fractional change in methane burden (signed, two decimals).
::: solution
Burden scales as $1/1.12 = 0.893$: the burden falls about 11 per cent, a change of $-0.11$ — the chemistry–climate feedback that partially self-limits the methane forcing, and the reason GWP values carry chemistry uncertainty.
:::
:::
