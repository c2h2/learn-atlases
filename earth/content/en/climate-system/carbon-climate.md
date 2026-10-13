In 1958, on a volcano in the middle of the Pacific, **Charles David Keeling** began measuring the air's carbon dioxide because he needed a calibration gas for Antarctic work and the baseline annoyed him. Fifty years of the curve he started — rising, saw-toothed by the breathing of the northern forests, higher every year than any point in at least two million years — turned the carbon cycle from a geochemical curiosity into the central accounting discipline of environmental science. The discipline has one governing fact: the atmosphere is a small, fast reservoir in a neighbourhood of huge, slow ones, and every question about future CO₂ — how high, how fast, how long, who is to blame — reduces to the fluxes in and out of that small reservoir and the chemistry that decides how much the neighbours will absorb.

## The carbon ledger

::: definition Reservoirs and fluxes {#def-ledger}
The active carbon cycle, in petagrams of carbon ($1\ \mathrm{PgC} = 1\ \mathrm{GtC}$; $1\ \mathrm{ppm} = 2.12\ \mathrm{PgC}$): the atmosphere holds $870$ (410 ppm in the 2020s), the land's living and dead biomass $2000$–$3000$ (vegetation $\sim 500$, soils $1500$–$2400$, permafrost a vulnerable $\sim 1400$ of it), the surface ocean $\sim 1000$, and the intermediate and deep ocean $37{,}000$ — with fossil sediments holding thousands more, of which the economically recoverable fraction is $\sim 1000$. The gross flows are enormous: the ocean breathes $\sim 90\ \mathrm{PgC\,yr^{-1}}$ in each direction, the land's photosynthesis and respiration $\sim 120$ each, and the human addition — $9.4$ from fossil fuels and cement plus $\sim 1.1$ from land use in the 2020s — is only a tenth of the natural flows. Yet the perturbation is not small, because the natural flows nearly cancel: the human addition is $45$ per cent of the atmosphere's **net** natural exchange, and it accumulates. The pre-industrial-to-present budget: emissions $\sim 690\ \mathrm{PgC}$ since 1850, atmospheric rise $\sim 270$, ocean sink $\sim 175$, land sink $\sim 160$ — the **airborne fraction** has held near $45 \pm 5$ per cent for seven decades, and the ocean and land have, so far, absorbed the rest at rates that have kept pace with emissions, which is a fact about the past, not a promise about the future.
:::

::: example The airborne fraction and the budget {#ex-budget}
In the 2020s, emissions are $10.5\ \mathrm{PgC\,yr^{-1}}$ and the atmospheric increase averages $2.5\ \mathrm{ppm\,yr^{-1}}$. Find the airborne fraction, and if the ocean and land together take up $5.6\ \mathrm{PgC\,yr^{-1}}$, check the budget. Why does the airborne fraction tell us more about the future than either sink alone?
::: solution
The atmosphere gains $2.5\times2.12 = 5.3\ \mathrm{PgC\,yr^{-1}}$, an airborne fraction of $5.3/10.5 = 50$ per cent in this particular year-pair (the long-term mean is $45$ per cent). The budget closes: $10.5 = 5.3 + 5.6$ to within the residual that absorbs the errors of all four terms. The airborne fraction is the number that matters because it is the **ratio of two large, compensating uncertainties**: the ocean and land sinks are each estimated to only $\pm 0.5\ \mathrm{PgC\,yr^{-1}}$, but their sum is pinned by the atmospheric measurement, and it is the sum — not the partition — that decides how much of a stated emission budget stays in the air. Every remaining-carbon-budget calculation for a temperature target rests on this single robust ratio.
:::
:::

::: widget plot
f: 316+0.35*x+0.02*x*x+3*sin(2*pi*x)
x: 0, 62
y: 305, 425
labels: \mathrm{CO_2}\ (\mathrm{ppm})
caption: A schematic of the Keeling curve at Mauna Loa, 1960–2022: the quadratic rise from $316$ to $\sim 420\ \mathrm{ppm}$ and the $\pm 3\ \mathrm{ppm}$ seasonal saw — the northern hemisphere's photosynthesis drawing the air down each summer — that is large enough to be measured from space as the planet's "green-up". The curve's two features are the carbon cycle in one picture: the trend is the fossil emission the sinks have not caught, and the sawtooth is the living land, breathing. The fact that the sawtooth amplitude has **grown** by about 20 per cent since 1960 is itself a climate signal: warmer summers amplify both photosynthesis and respiration.
:::

## The ocean's buffer: why the sea will not take our carbon

::: proposition The Revelle factor and the ocean's stinginess {#prop-revelle}
Seawater is not a bucket but a buffer: dissolved $\mathrm{CO_2}$ exists 90 per cent as bicarbonate and carbonate ions, and adding $\mathrm{CO_2}$ shifts the carbonate equilibrium, so the partial pressure rises **much more** than the added amount. The **Revelle factor** measures the stinginess,
$$
R = \left(\frac{\partial \ln p\mathrm{CO_2}}{\partial \ln \mathrm{DIC}}\right)_{T,\,A,\,C} \approx 10\text{–}15\ \ (\text{surface ocean mean} \approx 12),
$$
where DIC is dissolved inorganic carbon: a 1 per cent increase in surface DIC raises $p\mathrm{CO_2}$ by 12 per cent, against the factor-of-one a non-buffered solvent would give. The consequence is the cycle's great asymmetry: the surface ocean holds more carbon than the atmosphere but will absorb an anthropogenic increment only grudgingly — if only the mixed layer equilibrated, it would take barely a tenth of what we emit and the airborne fraction would approach 90 per cent. What saves us is not chemistry but **circulation**: the physical pump carries absorbed carbon to the deep ocean, where $37{,}000\ \mathrm{PgC}$ sit at a lower Revelle factor and vast capacity, and the **biological pump** of sinking particles does the rest — the ocean's $\sim 2.7\ \mathrm{PgC\,yr^{-1}}$ uptake is a **circulation phenomenon**, and it is therefore limited by the slowest overturning, not by the fastest surface exchange. The same chemistry that makes the ocean a slow sink makes it an acid: the emitted carbon has already fallen the surface pH by $0.11$ units — a 30 per cent rise in hydrogen ion — and the carbonate ions the pH rise consumes are the ones shell-building organisms from pteropods to oysters to the coral reef system itself must supersaturate their fluids with; the aragonite saturation horizon has risen hundreds of metres since pre-industrial time, and the century's projections put surface Arctic waters undersaturated in the 2060s.
:::

::: example What the Revelle factor costs {#ex-revelle}
The surface ocean's DIC is $2000\ \mu\mathrm{mol\,kg^{-1}}$. If it absorbs $100\ \mathrm{PgC}$ into a mixed layer of $3.6\times10^{16}\ \mathrm{m^{2}}$ and $70\ \mathrm{m}$ depth, by what factor does its $p\mathrm{CO_2}$ rise ($R = 12$)? What does that imply for further uptake?
::: solution
The added carbon is $100\times10^{15}\ \mathrm{g}/12 = 8.33\times10^{15}\ \mathrm{mol}$ into a volume $2.5\times10^{18}\ \mathrm{m^{3}}$, i.e. $\Delta\mathrm{DIC} = 33\ \mu\mathrm{mol\,kg^{-1}}$, a fractional increase of $33/2000 = 1.7$ per cent. With $R = 12$,
$$
\frac{\Delta p\mathrm{CO_2}}{p\mathrm{CO_2}} = 12\times1.7\% = 20\ \mathrm{per\ cent}.
$$
A 20 per cent rise in the sea's own $p\mathrm{CO_2}$ against the atmosphere's 50 per cent rise since 1750 means the mixed layer is well on the way to **rejection** of further carbon: the gradient that drives uptake is halved by the sea's own response. This is why the ocean's fractional uptake has already begun to decline with the slowing of the physical pumps, and why "the ocean will absorb it" is not a disposal option but a temporary subsidy with a chemistry-determined expiry.
:::
:::

## The land and the isotope fingerprint

::: definition The land sink and the Suess fingerprints {#def-land-sink}
The land's gross flows are huge and nearly balanced — photosynthesis (GPP) $\sim 120\ \mathrm{PgC\,yr^{-1}}$, respiration and fire nearly the same — and the net sink of $\sim 3\ \mathrm{PgC\,yr^{-1}}$ is a thin sliver of coincidence: CO₂ fertilisation (the direct effect of higher $p\mathrm{CO_2}$ on water-use efficiency and growth) adds more than nitrogen limitation, climate stress and land use subtract, and the sign of the balance is a young-forest effect that ages out. The sink is real and it is measured by three independent methods that agree: forest inventories counting trees, eddy-flux towers measuring the exchange, and — the referee — the **isotopic fingerprints**. Fossil carbon carries no $^{14}\mathrm{C}$ (decayed away) and is light in $^{13}\mathrm{C}$ ($\delta^{13}\mathrm{C} \approx -25\permil$ against the air's $-6.5\permil$), so burning it dilutes both ratios in the atmosphere at rates that can be calculated from the emission total: the observed decline in $\delta^{13}\mathrm{C}$ (the **Suess effect**, $-1.9\permil$ since pre-industrial samples, after correction for the ocean's exchange) and the collapse of the $^{14}\mathrm{C}/^{12}\mathrm{C}$ ratio (before the bomb pulse of the 1960s overprinted it) confirm that the CO₂ rise is **ours**, and the parallel fall in atmospheric oxygen — one mole of O₂ per mole of carbon burned, measured to per-mil precision from flasks since 1989 — closes the redox book. The isotopes are the reason the attribution of the CO₂ rise to fossil fuels is as secure as the attribution of the warming to the CO₂.
:::

::: example Reading the Suess effect {#ex-suess}
Atmospheric $\delta^{13}\mathrm{C}$ has fallen $1.2\permil$ since 1850 (corrected for ocean exchange). With pre-industrial $\delta^{13}\mathrm{C} = -6.5\permil$ and fossil carbon at $-25\permil$, estimate the fraction of the present atmospheric CO₂ that is fossil-derived, and compare with the airborne fraction of cumulative emissions ($270/690 = 39$ per cent).
::: solution
Two-end-member mixing: the mixture's composition is the mole-weighted mean, so
$$
-7.7 = f_{\mathrm{ff}}\times(-25) + (1 - f_{\mathrm{ff}})\times(-6.5) \;\Longrightarrow\; f_{\mathrm{ff}} = \frac{1.2}{18.5} = 6.5\ \mathrm{per\ cent} .
$$
The apparent discrepancy with the 39 per cent airborne fraction is the isotope lesson: the atmosphere has **exchanged** its carbon with the ocean and the biosphere, which are themselves becoming isotopically lighter as they absorb fossil carbon — the $^{13}\mathrm{C}$ inventory of the combined atmosphere-ocean-land system records the full $39$ per cent, while the air alone, being the well-mixed tip of a larger reservoir, shows the diluted $6.5$ per cent. The same arithmetic with $^{14}\mathrm{C}$ ("radiocarbon bomb dating of the air") measures the **turnover rate** of the exchange that causes the dilution — the two isotopes together give the amount and the speed.
:::
:::

## Removal: the commitment curve

::: definition The timescales of CO₂ removal {#def-removal}
A pulse of fossil carbon leaves the atmosphere in three acts. The first is fast and incomplete: within a decade the ocean surface and the land take up perhaps a third, but the ocean's surface layer then **warms and stratifies against further uptake** and the Revelle factor bites — the airborne fraction stabilises near a quarter. The second act is circulation: over $200$–$1000$ years, the deep ocean — 30 times the atmosphere's inventory — equilibrates and absorbs most of the remainder, at the pace of the overturning, which is why the "adjustment time" of fossil CO₂ is centuries even though the "residence time" of an individual molecule is four years. The third act is chemistry: the dissolving carbonate of the sea floor neutralises the acid the CO₂ made, restoring the buffer over $10^{4}$–$10^{5}$ years, and only then can the last tenth leave. The consequence is the century's most under-communicated number: **for every ton emitted, a quarter to a third is still in the air after a thousand years**, and half after a century — the "tail" that makes climate change an intergenerational commitment rather than a weather-scale problem, that gives ocean acidification its own multi-millennial inertia, and that makes the reverse of the Keeling curve a much slower curve than the forward one. The same asymmetry runs through the temperature: because the ocean's heat uptake lags, the warming commitment at constant emissions is real, and the zero-emissions commitment — the temperature the world settles to after emissions stop — is the number policy actually has to hit.
:::

::: example The commitment arithmetic {#ex-commit}
With the remaining carbon budget for 1.5 °C from 2020 estimated at $500\ \mathrm{GtCO_2}$ and emissions at $37\ \mathrm{GtCO_2\,yr^{-1}}$, find the exhaustion year at current rates, and, given a TCRE of $0.45\ ^\circ\mathrm{C}$ per $1000\ \mathrm{GtCO_2}$, the warming already committed by the $\sim 2500\ \mathrm{GtCO_2}$ emitted since 1870.
::: solution
$500/37 = 13.5$ years — exhaustion in the mid-2030s at unchanged emissions. The committed warming from cumulative emissions is $0.45\times2500/1000 = 1.1\ ^\circ\mathrm{C}$, consistent with the $\sim 1.2\ ^\circ\mathrm{C}$ observed, and the linearity of the calculation — warming proportional to **cumulative** carbon, not to concentration or to annual rate — is the single most important property of the carbon-climate system for policy: it converts every emissions pathway into a total, every total into a temperature, and every delay into a subtraction from a budget that does not negotiate.
:::
:::

::: warning Residence time is not adjustment time, the sink is not a service contract, and the carbon cycle is not a stock market
Five errors. **The four-year "residence time" of atmospheric CO₂ is quoted against gross exchange fluxes** ($870/210$) and says nothing about how fast a **perturbation** leaves — the perturbation's adjustment time is centuries, because the gross fluxes nearly cancel and the remainder is what we add; confusing the two is the most common carbon-cycle error in public debate. **The land and ocean sinks are responses, not promises**: they have kept a roughly constant fraction so far, but a constant **fraction** of rising emissions is a rising uptake that the physics may not sustain — the Amazon's sink has already fallen by a third since the 1990s and the southern ocean's has plateaued. **Permafrost and wetland carbon are not "ticking time bombs" on century timescales**: the vulnerable $\sim 1400\ \mathrm{PgC}$ thaws over centuries to millennia, and the honest fear is a persistent multiplier on the trajectory, not a cliff. **The carbon cycle is not a market with offsets at par**: a tonne stored in a forest is a tonne with a residence time of decades and a fire risk; a tonne of geological storage is a tonne with a residence time of millennia; the cycle prices them at zero and the policy that prices them at par is, in carbon terms, wrong. **And "CO₂ is 0.04 per cent" is not a measurement of influence**: $420$ molecules per million that set the infrared window are the difference between an icehouse and a hothouse — the Earth's own palaeoclimate record, in which 180 and 280 ppm are the ice-age and interglacial thermostats, is the refutation.
:::

::: history
The chemistry of the cycle begins with **Joseph Black**'s discovery of "fixed air" (1754) and **Nicolas-Théodore de Saussure**'s measurements of plant uptake of it (1804). **Hans E. Suess** — co-discoverer of radiocarbon with **Willard Libby**'s programme — identified the $^{13}\mathrm{C}$ decline in the air in 1955, and **Roger Revelle** and **Hans Suess**'s 1957 paper on the ocean's carbonate buffer set the factor that bears Revelle's name and asked the question the carbon cycle has been answering since: why the sea had not, and would not, take our carbon. **Charles David Keeling**'s continuous records from Mauna Loa and the South Pole, begun in 1958 and published from 1960, proved the rise was global, fossil and continuing; the atmospheric-bomb-pulse $^{14}\mathrm{C}$ programme of the 1960s turned the cycle into a traced experiment, and **Ralph Keeling**'s atmospheric-oxygen programme from 1989 closed the redox budget. The **GLOBAL CARBON PROJECT** has audited the annual budget since 2006, and the **Orbiting Carbon Observatory-2** (2014–) has been mapping the sinks from space.
:::

The ocean's carbonate chemistry is developed in [[oceanography/ocean-chemistry]] and its biology in [[oceanography/productivity]], the land's photosynthetic engine and its nutrient controls in [[biogeochemistry/production-decomposition]], [[biogeochemistry/nitrogen]] and [[biogeochemistry/phosphorus-sulfur]], the permafrost reservoir in [[glaciology/permafrost]], the deep-time version of the cycle in [[biogeochemistry/carbon-deep-time]] and [[earth-history/oxygen-proterozoic]], the emissions and budget arithmetic in [[climate-change/emissions-budgets]] and [[climate-change/attribution]], the palaeo-CO₂ records in [[palaeoclimate/ice-cores]], and the cycle's feedbacks in [[climate-system/feedbacks-sensitivity]].

::: quiz
The "residence time" of atmospheric CO₂ (about 4 years against gross fluxes) and its "adjustment time" (centuries) differ because
- [ ] the gross fluxes are poorly measured.
- [x] the gross fluxes nearly cancel, so a perturbation is removed only by their small residual.
- [ ] photosynthesis is slower than respiration.
- [ ] the ocean surface warms.
::: solution
A molecule turns over in four years, but the **excess** turns over in centuries: the ocean and land take up and give back $\sim 90$ and $\sim 120\ \mathrm{PgC\,yr^{-1}}$ in nearly equal measure, and only the few per cent imbalance removes the anthropogenic perturbation — at the pace, ultimately, of the deep-ocean circulation. The distinction is the most misquoted number in the climate debate.
:::
:::

::: summary
- The atmosphere is a small, fast reservoir (870 PgC) exchanging huge but nearly cancelling fluxes with the ocean (38,000 PgC) and land (~2500 PgC); the human addition (~10 PgC yr⁻¹) is small against the flows and huge against the residual.
- The airborne fraction has held near 45 per cent for seven decades; the ocean and land sinks have so far kept pace with emissions, which is a fact about the past.
- The Revelle factor (~12) makes seawater a stingy absorber: the ocean's uptake is a circulation-driven subsidy, not a chemical right, and its cost is acidification — pH already down 0.11 units.
- The land sink is a young-forest, fertilisation-driven sliver of coincidence that ages out; isotopes (¹³C, ¹⁴C, O₂) prove the CO₂ rise is fossil and measure the sinks independently.
- Removal runs on three clocks — decades (surface exchange), centuries (overturning), 10⁵ years (carbonate neutralisation): a quarter to a third of every tonne remains after a millennium.
- Warming scales with **cumulative** CO₂ (TCRE ≈ 0.45 °C per 1000 GtCO₂), which converts every emissions pathway into a budget and every delay into a subtraction.
:::

## Exercises

::: exercise ppm to petagrams {level=1 check="890"}
Convert $420\ \mathrm{ppm}$ to petagrams of carbon ($1\ \mathrm{ppm} = 2.12\ \mathrm{PgC}$). (Enter the PgC figure.)
::: solution
$420\times2.12 = 890\ \mathrm{PgC}$. The conversion factor — the mass fraction of the whole atmosphere per millionth — is why every CO₂ number in this lesson can be checked against every other: emissions, sinks and the curve itself are the same ledger in different currencies.
:::
:::

::: exercise Airborne fraction {level=1 check="45"}
Emissions $10.7\ \mathrm{PgC\,yr^{-1}}$, atmospheric increase $4.8\ \mathrm{PgC\,yr^{-1}}$. Find the airborne fraction in per cent. (Enter the number.)
::: solution
$4.8/10.7 = 45$ per cent. The stability of this ratio across seven decades of rising emissions — the sinks keeping exact proportional pace — is one of the most remarkable and least explained facts in environmental science, and its possible breakdown is the central uncertainty of the next century's carbon cycle.
:::
:::

::: exercise Gross residence time {level=1 check="4"}
Find the residence time of atmospheric CO₂ against the gross land + ocean exchange of $210\ \mathrm{PgC\,yr^{-1}}$ (atmosphere $870\ \mathrm{PgC}$), in years. (Enter to the nearest integer.)
::: solution
$870/210 = 4$ years. A molecule's address changes every four years; the **population's** excess takes centuries to shrink, because the 210 flows in and out nearly cancel. Every public argument about "CO₂ lasting 100 000 years" or "only 5 years" is this distinction being lost.
:::
:::

::: exercise Revelle arithmetic {level=2 check="36"}
By what per cent does surface-ocean $p\mathrm{CO_2}$ rise if DIC rises 3 per cent ($R = 12$)? (Enter the number.)
::: solution
$12\times3 = 36$ per cent. The buffer amplifies the partial-pressure response twelvefold — which is why the sea rejects anthropogenic carbon so quickly at the surface and why its real uptake depends on the slow delivery of carbon to the deep ocean's vast, cold, low-Revelle interior.
:::
:::

::: exercise Suess mixing {level=2 check="6"}
Air's $\delta^{13}\mathrm{C}$ has fallen $1.1\permil$ from $-6.5\permil$; fossil carbon is $-25\permil$. Find the fossil fraction of the air's carbon, in per cent, to the nearest integer. (Enter the number.)
::: solution
$f = 1.1/18.5 = 6$ per cent. The air's own dilution — its carbon has mixed with an ocean and biosphere that are themselves becoming light — is why the isotope records of the **whole** Earth system, not the air alone, are needed to count the emitted carbon; the $^{14}\mathrm{C}$ and $\mathrm{O_2}$ records supply the missing exchanges.
:::
:::

::: exercise Ocean acidification {level=2 check="30"}
Surface-ocean pH has fallen from 8.19 to 8.08. Find the percentage increase in hydrogen ion concentration. (Enter the number.)
::: solution
$10^{0.11} - 1 = 29$ per cent, about 30. A "tenths of a pH unit" phrasing hides the hydrogen-ion scale: the ocean has become a third more corrosive to shell-building at the same total carbonate chemistry, and the organisms that must pump carbonate ions against the gradient feel it first — pteropods in the Southern Ocean and the larval oysters of the US Pacific coast already do.
:::
:::

::: exercise The mixed-layer rejection {level=3 check="91"}
If only the surface ocean (1000 PgC, $R = 12$) equilibrated with the atmosphere (870 PgC), equal $\Delta p\mathrm{CO_2}$ requires $\Delta C_a/870 = R\,\Delta C_o/1000$. Derive the airborne fraction $\Delta C_a/(\Delta C_a+\Delta C_o)$ and evaluate it in per cent. (Enter the number.)
::: solution
From the equal-partial-pressure condition, $\Delta C_a/\Delta C_o = 870\times12/1000 = 10.4$, and the airborne fraction is $10.4/11.4 = 91$ per cent. The observed 45 per cent is therefore **proof** that the deep ocean and the land are doing the extra work, and it is the cleanest demonstration that the ocean sink is a circulation-subsidised service whose durability depends on the overturning, not on the surface chemistry that this calculation shows to be nearly hopeless on its own.
:::
:::

::: exercise The budget clock {level=3 check="13.5"}
From 2020, the remaining 1.5 °C budget is $500\ \mathrm{GtCO_2}$ and emissions $37\ \mathrm{GtCO_2\,yr^{-1}}$. Find the years to exhaustion at constant emissions (to one decimal), and explain why a linear decline to zero over the same horizon uses only half the budget.
::: solution
At constant emissions: $500/37 = 13.5$ years. A linear decline to zero over $t$ years emits $E_0 t/2$, so the same budget lasts $2\times13.5 = 27$ years — the arithmetic of "net zero by 2050": the target date is set not by the annual rate at any moment but by the **area under the curve**, which is why early steep cuts buy disproportionately: the budget is an integral, and the climate, being cumulative, is the most integral-limited constraint humanity has ever negotiated with.
:::
:::
