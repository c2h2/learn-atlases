In the winter of 1898, the barque *Belgica* — the first ship to winter in Antarctic waters, a year earlier than anyone intended — lay pinned in ice off the Antarctic Peninsula while her crew scurvy-ridden and mad-eyed, and the young expedition doctor, **Frederick Cook**, and the first mate, **Roald Amundsen**, kept notes on the ice's every mood: the pressure ridges that walked at night with rifle-crack reports, the leads that opened like promises, the way the floe beneath them was not a floor but a raft over a sounding they could not fathom. Fifty thousand satellite images later, the notes read as field protocol for the most rapidly changing ecosystem on Earth. Sea ice is the climate system's mirror and its lid at once — reflecting half the Arctic's summer sun, insulating the ocean from air $30\ ^\circ\mathrm{C}$ colder than itself, salt-making the dense waters that ventilate the world's abyss, and hosting, in millimetre-wide brine channels, the most productive habitat in the polar ocean. It is also the component of the cryosphere whose decline is fastest, best measured, and most nearly certain in its projection: the Arctic's September ice cover has lost a third of its area since the satellite era began, and the first ice-free Arctic summer is now a question of decade, not century.

## Ice that grows from the top and dies from below

::: definition Thermodynamics of a freezing ocean {#def-ice-thermo}
Sea ice forms where the ocean surface loses heat faster than the mixed layer can replace it — at the **freezing point of seawater**, $-1.9\ ^\circ\mathrm{C}$ at 35 psu, depressed a further $0.075\ ^\circ\mathrm{C}$ per atmosphere of pressure (which is why the deep Weddell Sea freezes only after its surface layer is cold to hundreds of metres). Growth is **top-down and conduction-limited**: ice is a decent insulator ($k = 2.1\ \mathrm{W\,m^{-1}\,K^{-1}}$, a fifth of seawater's), so the heat escaping the ocean must cross the ice that already exists, and the growth rate falls as the inverse of thickness — **Stefan's law** (1889, derived from Antarctic ship data before the physics was understood),
$$
h \approx \left(\frac{2\, k\, \Delta T\, t}{\rho L}\right)^{1/2}, \qquad \rho L = 3.06\times10^{8}\ \mathrm{J\,m^{-3}},
$$
gives $1\ \mathrm{m}$ of ice in about four months of $-10\ ^\circ\mathrm{C}$ and shows why **90 per cent of the Arctic's ice is thinner than $1\ \mathrm{m}$ in late winter** where leads and snow-ice dominate, and why doubling final thickness needs quadrupling the cold. Three complications define real ice. **Leads** — fractures exposing open water — hold the pack warm from below, radiating $300\ \mathrm{W\,m^{-2}}$ locally, freezing over in days, and producing half the winter ice of the Arctic by some budgets. **Snow-ice**: when snow's weight depresses thin ice below the waterline, seawater floods the snow and freezes in place — a third of the Antarctic pack's thickness is snow-ice, invisible to thickness sensors that assume ice grows from air. And **brine**: freezing rejects salt into metre-scale channels of 60–100 psu brine that drain, freeze, and leave first-year ice at 5–10 psu after one summer — the desalination that makes the ice, its meltwater, and the **halocline** beneath it a permanent stratifying feature of the polar oceans.
:::

::: example Stefan's arithmetic {#ex-stefan}
How long, at a constant $-15\ ^\circ\mathrm{C}$ air temperature over ice with snow cover neglected, to grow (a) $0.5\ \mathrm{m}$ and (b) $2\ \mathrm{m}$ of ice? Why does the real Arctic pack average $1.3\ \mathrm{m}$ in March when Stefan's law over open water would allow $3\ \mathrm{m}$?
::: solution
From $h = \sqrt{2k\Delta T\, t/\rho L}$ with $\Delta T = 15$: $t = h^{2}\rho L/(2k\Delta T)$, so
$$
t(0.5) = \frac{0.25\times3.06\times10^{8}}{63} = 1.2\times10^{6}\ \mathrm{s} \approx 14\ \mathrm{days}, \qquad t(2) = 16\,t(0.5) \approx 225\ \mathrm{days}.
$$
The scaling is the answer: $t \propto h^{2}$, so the second half-metre costs fifteen times the first. Real ice falls short of the open-water ideal because the ice's own roof insulates it — a $5\ \mathrm{cm}$ snow cover halves the growth rate — because leads refreeze rather than thicken, and because the autumn ocean must first shed its summer heat. The $1.3\ \mathrm{m}$ average of the modern March pack is thus not a thermodynamic limit but a **climate state**: it was nearer $3\ \mathrm{m}$ in the 1950s submarine era, and the difference is the warmest, most legible line in the whole Arctic record.
:::
:::

::: widget plot
f: 1.7*sqrt(x/120)
x: 0, 240
y: 0, 2.6
labels: h\ (\mathrm{m})
caption: Stefan-law ice growth over $240$ days at $-15\ ^\circ\mathrm{C}$ — the square-root curve that makes ice a self-limiting blanket: fast in autumn, nearly stalled by spring. The same square root governs the seasonal melt of first-year ice and the refreeze of leads, and it is why a warmer, later-freezing Arctic does not merely grow thinner ice but **starts the season over**: thin ice insulates poorly, grows fast in response to cold snaps, and yet the autumn ocean's larger heat store — from the summer's open water — delays freeze-up more than the cold can repay.
:::

## The retreat

::: definition The satellite record {#def-retreat}
Since 1979, passive microwave radiometry has mapped sea-ice concentration through cloud and darkness, and the numbers are the cleanest large-scale climate observations in existence. The **September minimum** — the Arctic's annual confession — fell from $\sim 7.0\times10^{6}\ \mathrm{km^{2}}$ in 1979–80 to a record $4.72\times10^{6}$ in 2012, a loss of one third at $-12.2$ per decade, with the twelve lowest minima all occurring since 2010; March extent has fallen more slowly ($-5$ per cent per decade) because winter freeze-up is cold-limited, not ice-limited. Thickness tells the deeper story: submarine soundings of the 1950s–90s and ICESat (2003–09) and CryoSat-2 (2010–) radar altimetry show the **March mean thickness of the Arctic Ocean pack falling from about $3.1\ \mathrm{m}$ to $2.3\ \mathrm{m}$**, with the multi-year ice — old, deformed, thick ice that once filled the Canada Basin — retreating to a thin band north of Greenland and Ellesmere, its share of the pack falling from about a third to under a tenth. The geometry of the loss is mechanistic: first-year ice forms in autumn, melts in summer, and only survives by riding the anticyclonic Beaufort gyre long enough to thicken — and the **transpolar drift** now exports ice out of the Fram Strait at rates that in some winters exceed the replacement supply. The Southern Ocean, long an outlier of slight **increase** (the wind-driven, heat-sequestering Southern Ocean), joined the retreat in 2016 with three consecutive record lows through 2023, a regime change whose cause — sub-surface heat released upward, or the decadal swing of the winds, or both — is the fastest-moving question in the field.
:::

::: example The area budget of a lost summer {#ex-areabudget}
Take the 1980s September minimum as $7.0\times10^{6}\ \mathrm{km^{2}}$ and 2012's as $4.72\times10^{6}$. Convert the loss to (a) per cent, and (b) the extra summer solar energy absorbed by the extra open water (albedo $0.6$ for ice, $0.06$ for ocean; mean summer insolation $180\ \mathrm{W\,m^{-2}}$ over 90 days), and compare with the annual primary production energy of the world's oceans ($\sim 4\times10^{19}\ \mathrm{J}$).
::: solution
The loss is $2.28\times10^{6}\ \mathrm{km^{2}}$, $33$ per cent of the 1980s minimum. Extra absorption per square metre is $(0.60 - 0.06)\times180 = 97\ \mathrm{W\,m^{-2}}$, so over the lost area and season
$$
E = 97\times2.28\times10^{12}\times7.8\times10^{6} = 1.7\times10^{21}\ \mathrm{J},
$$
forty times the energy fixed by all the world's plants in a year, deposited as **ocean heat in the Arctic summer** — heat that delays next autumn's freeze-up, warms the incoming Atlantic water, and percolates into the atmosphere through the thin winter ice. That closed loop, ocean-heat-first rather than air-first, is the **Atlantic–Arctic amplification** mechanism in one calculation, and it explains why the Arctic's warming ($\sim 3$–$4\times$ global mean) outruns anything the global mean forcing alone would produce.
:::
:::

## Why the Arctic is the planet's fast lane

::: definition Arctic amplification {#def-amplification}
The Arctic warms three to four times faster than the globe, and the decomposition of that fact is settled more than its weighting. **Surface albedo feedback**: melting exposes ocean, ocean absorbs, more melting — the strongest single term in winter and summer alike, and now amplified by **darkening** (soot, dust, and the red snow of blooming *Chlamydomonas nivalis* algae on ice and snow). **Lapse-rate and cloud feedbacks**: the Arctic's stable stratification concentrates warming near the surface, and — the finding that reweighted the field in 2014 (**Pithan and Mauritsen**) — the clearest cloud feedback on Earth operates here: as sea ice retreats, the autumn atmosphere emits more longwave to the surface under ice-free, moister skies, warming the boundary layer exactly when freeze-up must begin. **Ocean heat storage and the Atlantic water layer**: the warm subsurface Atlantic layer that caps the Canada Basin is being eroded upward by storms and eddies, delivering heat to the underside of the ice at tens of $\mathrm{W\,m^{-2}}$ in autumn. **Attribution**: amplification is **forced** — it appears in every model run with observed greenhouse gases and correlates with the ice loss itself across models and observations — but its **pace** is partly internal: the recent slowdown of Atlantic meridional circulation and the Pacific's decadal modes modulate the rate by a decade either way. The projection consequence is the century's bluntest: under high emissions, models place the first September **ice-free** condition (conventionally under $10^{6}\ \mathrm{km^{2}}$) around the 2040s, and a practically ice-free September for the rest of the century; under deep cuts, the 2013–2022 ice state is roughly stabilisable — the Arctic's future is, uniquely among the great climate variables, still a policy choice with a visible deadline.
:::

::: example The lid and the heat it holds {#ex-lid}
The winter Arctic Ocean is $-1.9\ ^\circ\mathrm{C}$ at the surface and the air above it averages $-25\ ^\circ\mathrm{C}$ in January. With $1.3\ \mathrm{m}$ of ice ($k = 2.1$), find the upward heat flux, and explain why the same flux through **leads** (2 per cent of area, open water) dominates the winter heat budget of the pack.
::: solution
Through solid ice the conductive flux is $k\Delta T/h = 2.1\times23.1/1.3 = 37\ \mathrm{W\,m^{-2}}$ — the ice's steady leak. But open water in a lead loses heat by turbulence and radiation at $300\ \mathrm{W\,m^{-2}}$ or more, so leads covering just 2 per cent of the area return $0.02\times300 = 6\ \mathrm{W\,m^{-2}}$, a sixth of the solid-ice flux from two per cent of the area — and, crucially, concentrated in the **autumn freeze-up**, when the ocean's summer heat must escape. The lid metaphor is therefore exact: sea ice does not stop the ocean's heat loss so much as **schedule** it, and thinning the lid moves the schedule earlier, later, and larger — which is what the autumn warming of the Arctic, the winter surface-air warming over the ice-free Barents region that now exceeds $0.5\ ^\circ\mathrm{C}$ per decade, is measuring.
:::
:::

## Ice as habitat and salt-maker

::: definition The brine ecosystem and the halocline {#def-ecology-salt}
Sea ice is not frozen seawater but a **sponge of geometry**: as ice grows, brine is expelled into a network of centimetre-scale channels — salinities of 60–100 psu, temperatures to $-10\ ^\circ\mathrm{C}$ — and life follows the brine. **Ice algae** line the lower channels where light still reaches, producing the spring bloom **under** the ice, weeks before the open-water bloom, in densities up to $10^{8}$ cells per litre; the entire under-ice community — diatoms, ciliates, flagellates, the copepods and krill that graze the ice's sticky underside — is timed to it, and in the high Arctic and the Southern Ocean pack, this brine-flora production is the **start of the food web**: ice-algae carbon is found in the lipids of Arctic copepods one season later, in the condition of young polar cod, in the body condition of seabird chicks, and in the milk of Antarctic krill-eating whales. The physical-ecology coupling is brutal: earlier melt pushes the bloom earlier, out of sync with zooplankton reproduction — **match–mismatch**, the same mechanism as on land but with a hard physical deadline, since the ice itself is the habitat. On the physics side, the **salt flux** of freezing is a climate actor: forming a square metre of first-year ice rejects some $30\ \mathrm{kg}$ of salt, and in the coastal **polynyas** — wind-scoured ice-free harbours like the Ross Sea and Weddell Sea polynyas, the Cape Darnier region off East Antarctica, and the Sea of Okhotsk's Great Open Area — this production of cold, salty, dense water feeds the **Antarctic Bottom Water** that fills the world's abyss and ventilates the carbon it stores. The 1970s Weddell Sea polynya — a $10^{6}\ \mathrm{km^{2}}$ open hole that appeared three times and then shut for thirty years — reopened in 2017 and has recurred since, and whether that is a wind-regime swing or the halocline thinning under warming is one of the two or three most consequential open questions about the Southern Ocean's carbon sink.
:::

::: example Salt, ice and bottom water {#ex-saltflux}
A coastal polynya produces $1.5\ \mathrm{m}$ of new ice per winter over $20{,}000\ \mathrm{km^{2}}$. Find the salt flux in $\mathrm{kg\,s^{-1}}$ (take $30\ \mathrm{kg\,m^{-2}}$ per metre of ice, four-month winter), and the dense-water production it implies if the plume equilibrates at a salinity anomaly of $0.5\ \mathrm{psu}$ against ambient $34.3\ \mathrm{psu}$ water ($\rho = 1027\ \mathrm{kg\,m^{-3}}$).
::: solution
Salt $= 1.5\times30\times2\times10^{10} = 9\times10^{11}\ \mathrm{kg}$ over the season, a mean flux of $9\times10^{11}/1.04\times10^{7} = 8.7\times10^{4}\ \mathrm{kg\,s^{-1}}$. To carry that salt at $0.5$ parts per thousand means moving $9\times10^{11}/(0.0005\times1027) = 1.8\times10^{12}\ \mathrm{kg}$ of water, i.e. a dense-water production of
$$
Q = \frac{1.8\times10^{12}}{1.04\times10^{7}} = 1.7\times10^{5}\ \mathrm{kg\,s^{-1}} \approx 0.17\ \mathrm{Sv},
$$
a few per cent of the global Antarctic Bottom Water flux from one polynya. Multiply over the Antarctic coastal polynya system — a dozen of this size — and the sea-ice factory is plainly a **major contributor** to abyss ventilation: which is why the recent freshening and warming of Bottom Water, observed since the 2010s and consistent with a weakening salt factory, is treated as a sentinel of the whole overturning's future.
:::
:::

::: warning "Ice-free" does not mean what headlines say, the ozone hole is not why the ice went, and the Southern Ocean is not the Arctic's student
Five errors. **"Ice-free" is a convention** (under 1 million km² in September) — it does not mean open water at the Pole, and the first such years will still have metres-thick multi-year ice relics in the Lincoln Sea; conversely it will be **summer-ice-free for months** once crossed, which is the state that matters for shipping, methane, and the bears. **The ozone hole cooled nothing that mattered**: its wind effects (a positive SAM trend) *masked* some West Antarctic and peninsula warming — the Montreal Protocol's ozone recovery is projected to **unmask** it, an honest irony worth stating rather than hiding. **Southern Ocean decline is not Arctic-style thermodynamics**: until 2016 its extent barely trended while its **thickness, age structure and ecology** changed — the system is wind- and heat-transport-dominated, and the 2016–2023 lows may be a regime shift or a decadal swing; the honest position is uncertainty with a deadline (the next decade of observations will tell). **Sea-ice loss does not stop the Gulf Stream** — that claim conflates the halocline's freshening (real, measurable, a stabilising cap on deep mixing in the subpolar North Atlantic) with AMOC collapse (a separate, deeper, slower mechanism); the two are linked but the sentence "the Gulf Stream will stop because the Arctic melted" is not science. **And the ecological literature's "browning of the Arctic" is not speculation**: earlier ice-out shifts production from large lipid-rich ice-associated diatoms to small open-water phytoplankton, and the energy available to a cod, a chick, or a bowhead calf is measurably lower — the food-web consequence of ice loss is the climate impact with the fewest headlines and the most citations.
:::

::: history
**Josef Stefan** derived the conductive ice-growth law in 1889 from the Austro-Hungarian *Pola* expedition's Antarctic soundings — theory from ship data, decades before the physics was general — and **Fridtjof Nansen**'s *Fram* drift (1893–96) proved the ice itself a moving fluid medium, mapping the transpolar current from drift logs. The submarine era (1940s–90s) set the thickness baseline, and the winter moorings of **Hermann Melling** and colleagues first measured basal growth and ocean heat flux directly; the **SHEBA** programme (1997–98), which froze a ship into the Beaufort ice for a year, rewrote the Arctic energy budget, and **MOSAiC** (2019–20, the *Polarstern* year in the central Arctic — the largest polar expedition in history) is its climate-era successor. The satellite record began with **SMMR** (1978) and **SSM/I** (1987): **Josefino Comiso**'s analyses documented the multi-year-ice collapse, **Julienne Stroeve**'s 2007 paper first put an ice-free Arctic inside the projection horizon, **Ronald Kwok**'s altimetric atlases tracked the thinning through ICESat (2003–09), CryoSat-2 (2010–) and ICESat-2 (2018), and the Norwegian **N-ICE** and British under-ice programmes continue the physics beneath the remaining old ice.
:::


The ice–albedo feedback's climate context is in [[climate-system/feedbacks-sensitivity]] and [[climate-system/energy-budget]], the ocean mixed layer and halocline physics in [[oceanography/seawater]] and [[oceanography/overturning]], the sea-ice contribution to sea level (zero, and why) in [[oceanography/sea-level]], the Arctic amplification's attribution in [[climate-change/attribution]] and [[climate-change/observed-change]], the permafrost coastlines the lost ice exposes to storms in [[glaciology/permafrost]], and the observations in [[glaciology/observing-ice]] and [[remote-sensing/radar-lidar]].

::: quiz
Stefan's law says ice thickness grows as $\sqrt{t}$ because:
- [ ] air temperature falls as winter proceeds.
- [x] the existing ice insulates, so the heat flux — and growth rate — falls as $1/h$.
- [ ] the ocean's heat store runs out.
- [ ] snow cover thickens.
::: solution
Growth must conduct the ocean's heat **through the ice already grown**: flux $= k\Delta T/h$, so $dh/dt \propto 1/h$ and $h \propto \sqrt{t}$. The self-limiting blanket is why thin ice responds fast to cold snaps, why leads refreeze in days, and why the Arctic's winter ice cannot simply "catch up" — the lid it builds is the lid that slows its own making.
:::
:::

::: summary
- Sea ice grows top-down, conduction-limited (Stefan's law, $h \propto \sqrt{t}$), with leads and snow-ice supplying much of the real growth and brine rejection setting its salinity and its ecology.
- The satellite record: September Arctic extent down a third since 1979 ($-12\%$/decade), March thickness down from ~3.1 to ~2.3 m, multi-year ice nearly gone from the Atlantic-side basins; Southern Ocean regime change since 2016.
- Arctic amplification (3–4× global warming) is forced and decomposed: albedo, autumn clouds and longwave, ocean heat storage and the eroding Atlantic layer; first ice-free September ~2040s on high paths.
- The ice is the Arctic's lid and schedule-keeper for ocean heat loss; thinning reschedules the flux toward autumn, driving the fastest winter warming on the planet.
- Brine channels host the under-ice algae bloom that times the polar food web; polynya salt flux feeds Antarctic Bottom Water — the ice is an ecosystem and an abyss-ventilation factory.
- The retreat is the clearest forced signal in the cryosphere and one of the few whose end state is still open: the Arctic's summer is the century's most legible policy scoreboard.
:::

## Exercises

::: exercise Stefan growth time {level=1 check="84"}
At a constant $-10\ ^\circ\mathrm{C}$ ($k = 2.1$, $\rho L = 3.06\times10^{8}$), find the days needed to grow $1\ \mathrm{m}$ of ice, to the nearest day. (Enter the number.)
::: solution
$t = \rho L h^{2}/(2k\Delta T) = 3.06\times10^{8}/42 = 7.3\times10^{6}\ \mathrm{s} = 84$ days. Twelve weeks of $-10\ ^\circ\mathrm{C}$ for the first metre — which is why a late freeze-up costs the season's ice twice: less time to grow, and thinner ice to insulate with when the cold finally comes.
:::
:::

::: exercise Area loss {level=1 check="33"}
September extent fell from $7.0$ to $4.72\times10^{6}\ \mathrm{km^{2}}$. Find the percentage loss to the nearest integer.
::: solution
$(7.0 - 4.72)/7.0 = 33$ per cent — an area larger than France and Spain combined, gone from the summer Arctic within one human generation, in the single most-photographed satellite product ever made.
:::
:::

::: exercise Albedo energy {level=1 check="97"}
With ice albedo $0.6$ and ocean $0.06$, find the extra absorbed flux ($\mathrm{W\,m^{-2}}$) over open water at $180\ \mathrm{W\,m^{-2}}$ mean summer insolation. (Enter to the nearest integer.)
::: solution
$(0.60 - 0.06)\times180 = 97\ \mathrm{W\,m^{-2}}$ — a radiative forcing larger than any city's waste-heat flux, delivered exactly where the ice's absence lets it do the most work: into the mixed layer that must refreeze in autumn.
:::
:::

::: exercise Salt rejection {level=2 check="31"}
Forming $1\ \mathrm{m^{2}}$ of first-year ice (ice salinity $5\ \mathrm{psu}$ from water at $35\ \mathrm{psu}$, ice density $917\ \mathrm{kg\,m^{-3}}$) rejects how many kg of salt? (Enter to the nearest integer.)
::: solution
The ice retains $0.005\times917 = 4.6\ \mathrm{kg}$ of the $0.035\times1025\times1 \approx 35.9\ \mathrm{kg}$ in the parent water, rejecting $31\ \mathrm{kg\,m^{-2}}$. That salt, carried into the shelf boundary current as dense plumes, is the currency of bottom-water formation — and the reason a map of polynyas is, to a physical oceanographer, a map of the world's deep-ocean pumps.
:::
:::

::: exercise Lead fraction {level=2 check="6"}
Leads cover 2 per cent of the winter pack and lose $300\ \mathrm{W\,m^{-2}}$. Find the area-mean flux in $\mathrm{W\,m^{-2}}$.
::: solution
$0.02\times300 = 6\ \mathrm{W\,m^{-2}}$ — a fifth of the solid-ice leak from two per cent of the area, and the reason lead parameterisations (not ice thickness alone) set the autumn heat-loss timing in every sea-ice model.
:::
:::

::: exercise Ice-free extrapolation {level=2 check="47"}
If September extent falls linearly from $4.7\times10^{6}\ \mathrm{km^{2}}$ (2012) at $-80{,}000\ \mathrm{km^{2}\,yr^{-1}}$, find the year it crosses $1.0\times10^{6}$ (the "ice-free" threshold). (Enter the year to the nearest decade, e.g. 2060.)
::: solution
$(4.7 - 1.0)\times10^{6}/8\times10^{4} = 46$ years → $2012 + 46 \approx 2058$, i.e. about **2060**. The honest caveats: linear extrapolation of a nonlinear process both over- and under-shoots (the remaining ice is the thick, northern, hard-to-melt kind, which argues late; autumn ocean heat and albedo feedback argue early), and model medians cluster 2045–2060 under high emissions — the linear number is a sanity anchor, not a forecast.
:::
:::

::: exercise The square-root law {level=3 check="4"}
By what factor does the time to grow ice increase from $1\ \mathrm{m}$ to $2\ \mathrm{m}$ under Stefan's law?
::: solution
$t \propto h^{2}$: a factor of $4$. The quadratic is why the **age structure** of the pack matters more than its area: converting first-year ice to multi-year ice costs four times the winter, and a system that loses its old ice cannot rebuild thickness by merely having a cold year — the 2013 and 2014 "recovery" years, which restored area but not age, are the natural experiment.
:::
:::

::: exercise Halocline memory {level=3 check="36"}
The Canada Basin halocline (salinity anomaly $5\ \mathrm{psu}$ over a $50\ \mathrm{m}$ layer) is maintained by sea-ice brine and river runoff. If the effective freshwater supply is $0.2\ \mathrm{m\,yr^{-1}}$ per square metre, find the years needed to renew the halocline's freshwater content, to the nearest year. (Enter the number.)
::: solution
The freshwater content is $(5/35)\times50 = 7.1\ \mathrm{m}$ of fresh water per square metre; at $0.2\ \mathrm{m\,yr^{-1}}$ renewal takes $7.1/0.2 = 36$ years. The halocline is thus a **decadal-memory** feature: it thickened through the 1990s–2000s with more ice melt and river input, then thinned in the 2010s as ice export fell — a freshwater capacitor whose charge state decides how much storm mixing can deliver ocean heat to the ice, and whose 36-year renewal time is why "the halocline will recover if the ice recovers" is a multi-decade statement, not a yearly one.
:::
:::
