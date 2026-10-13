In the summer of 1943, plant workers in Los Angeles began going home with smarting eyes and bleeding lungs, and the military-industry blamed the smog on the DuPont butadiene works — until the works evacuated and the smog stayed. It took a decade, a chemist named **Arie Haagen-Smit** (who identified ozone as the culprit in 1950, then the reactive hydrocarbons that made it), and the peculiar geometry of the Los Angeles basin — sunlight, inversions, and 1950s traffic without controls — for the world to learn the lesson of photochemical smog: that sunlight is a **reagent**, that clean-ish air (ozone is not emitted, it is manufactured), and that the two largest sources of a deadly pollutant were the sun and the automobile. The chemistry Haagen-Smit found is now the best-quantified reaction network in the science — hundreds of reactions, rate constants to a few per cent, quantum yields to millisecond — and it is the working model of what "chemical mechanism" means: a handful of radicals at parts-per-trillion, driven by photons, deciding the fate of everything else.

## Sunlight as a reagent

::: proposition Photolysis and the photostationary state {#prop-photostationary}
A molecule that absorbs a photon of the right wavelength may break, and the **photolysis frequency** $J$ ($\mathrm{s^{-1}}$) — the convolution of absorption cross-section, quantum yield and the actinic flux, computed to within tens of per cent for the hundred-odd species that photolyse in the troposphere — is the sun's turn-over rate for that species. The founding reaction of urban chemistry is nitrogen dioxide's:
$$
\mathrm{NO_2} + h\nu \rightarrow \mathrm{NO} + \mathrm{O}(^3\mathrm{P}) \quad (J \approx 10^{-2}\ \mathrm{s^{-1}}\ \text{at noon}), \qquad \mathrm{O} + \mathrm{O_2} \rightarrow \mathrm{O_3},
$$
followed by ozone's destruction by NO, $\mathrm{NO} + \mathrm{O_3} \rightarrow \mathrm{NO_2} + \mathrm{O_2}$ ($k = 1.8\times10^{-14}\ \mathrm{cm^{3}\,s^{-1}}$). The pair cycles with a quantum of waste — each pass converts one photon into one ozone molecule — and in pure air reaches the **Leighton photostationary state**,
$$
[\mathrm{O_3}] = \frac{J\,[\mathrm{NO_2}]}{k\,[\mathrm{NO}]},
$$
in which ozone is set by the $\mathrm{NO_2}/\mathrm{NO}$ ratio alone, with a response time of **minutes**. Real smog makes **more** ozone than the photostationary state allows, because peroxy radicals ($\mathrm{HO_2}$, RO₂) from volatile organic compounds oxidise NO **without consuming ozone** — the leak that turns the null cycle into a pump, and the reason ozone air quality is a story about hydrocarbons as much as nitrogen oxides.
:::

::: example The photostationary prediction {#ex-leighton}
At a traffic site, noon $J(\mathrm{NO_2}) = 9\times10^{-3}\ \mathrm{s^{-1}}$, $[\mathrm{NO_2}]/[\mathrm{NO}] = 8$, and $k = 1.8\times10^{-14}\ \mathrm{cm^{3}\,s^{-1}}$. Find the photostationary ozone in ppb at $2.4\times10^{19}\ \mathrm{molecules\,cm^{-3}}$, and explain why measured ozone is typically 1.5–2 times this value.
::: solution
$$
[\mathrm{O_3}] = \frac{9\times10^{-3}\times8}{1.8\times10^{-14}} = 4\times10^{12}\ \mathrm{cm^{-3}} = 167\ \mathrm{ppb}.
$$
The excess over prediction is the peroxy flux: isoprene from the roadside trees and CO and aromatics from traffic each oxidise through HO₂/RO₂ that converts NO to NO₂ **for free**, so the true $\mathrm{NO_2}$ source exceeds photostationary and ozone rises until its own chemistry (and the NO that survives into the night) catches up. The mismatch between prediction and measurement — the "overshoot" — is itself a **measurement of radical production**, one of the neat inversions of the field: ozone as a radical dosimeter.
:::
:::

::: widget plot
f: 40+60*if(sin(pi*(x-6)/12),sin(pi*(x-6)/12),0)
x: 0, 24
y: 0, 120
labels: \mathrm{O_3}\ (\mathrm{ppb})
caption: The idealised urban ozone diurnal cycle — night-time titration by NO drives the trough, morning traffic injects NOx and the rising sun ignites the photostationary pump, and the afternoon peak relaxes as the boundary layer deepens and hydrocarbons deplete. The curve's phase is the signature of **in-situ production**: a pollution episode whose ozone peaks at night is being made by something else (stratospheric intrusion, or transport from a chemistry upwind), and the diurnal shape is the first diagnostic in every air-quality dataset.
:::

## The radical engine

::: definition OH and the HOx family {#def-oh}
The hydroxyl radical — one oxygen, one hydrogen, unpaired electron, present at $\sim 10^{6}$ molecules per cubic centimetre, a **trillionth** of the air — is the atmosphere's detergent, and its source is the stratosphere's hand extended into the troposphere: ozone photolyses above 320 nm to the excited atom $\mathrm{O}(^1\mathrm{D})$ (quantum yield 0.6), which grabs water: $\mathrm{O}(^1\mathrm{D}) + \mathrm{H_2O} \rightarrow 2\,\mathrm{OH}$. From this trickle runs the oxidation of essentially all tropospheric chemistry: methane's nine-year sentence, carbon monoxide's weeks, the VOCs' hours, sulfur dioxide's and DMS's days — and the radical's own lifetime is a **second**, its steady abundance set by a balance of sources (the ozone–water route, plus HONO photolysis in the early morning, plus the recycling by NO) and sinks (its own reactions with CO, VOCs and methane, dominated globally by CO). The HOx family (OH, HO₂) and its organic relations (RO₂) form a **catalytic chain**: OH makes HO₂, HO₂ regenerates OH by reacting with NO, and each pass of the chain oxidises another molecule — so a radical that lives a second processes its own weight in carbon monoxide every few days. The engine's throttle is NOx: in clean air the radicals terminate quietly ($\mathrm{HO_2} + \mathrm{HO_2}$, ozone–OH), in polluted air the NO route dominates and oxidising power **rises with pollution** — the mechanism behind the "oxidising-power feedback" that makes future methane depend on future NOx, and behind the weekend effect (below).
:::

::: example A radical's victim {#ex-ohlifetime}
The rate constant for $\mathrm{OH} + \mathrm{CH_4}$ is $6.3\times10^{-15}\ \mathrm{cm^{3}\,s^{-1}}$ and the global mean $[\mathrm{OH}] = 1.0\times10^{6}\ \mathrm{cm^{-3}}$. Find methane's lifetime against OH alone, and reconcile it with the accepted 9-year atmospheric lifetime.
::: solution
$$
\tau = \frac{1}{k\,[\mathrm{OH}]} = \frac{1}{6.3\times10^{-15}\times10^{6}} = 1.6\times10^{8}\ \mathrm{s} \approx 5\ \mathrm{years}.
$$
The remaining removal is the stratosphere (reaction with O(¹D) and OH, ~4 per cent yr⁻¹), soil uptake and the marine chlorine atom — together stretching 5 to 9 years. The exercise is the atlas's central conversion in miniature: **lifetime = 1/(k × oxidant)**, and its corollary for policy: because methane's lifetime is set by a global oxidant field, methane–methane competition is real (emitting more methane lengthens the average molecule's life), and so is the hope of **increasing** the sink — raising OH by raising NOx is a deal the atmosphere offers and the ozone layer refuses.
:::
:::

## Making ozone, storing radicals

::: definition VOC–NOx chemistry and the reservoirs {#def-voc-nox}
The net ozone production cycle needs a carbon backbone: VOCs (methane, CO, isoprene from the forests at $10^{15}\ \mathrm{g\,yr^{-1}}$, aromatics from fuel) are oxidised by OH to peroxy radicals, which convert NO to NO₂ without spending ozone, and every such conversion leaves one ozone molecule behind — **one ozone per NO oxidised, one NOx molecule catalysing hundreds of ozone molecules before it is stored or rained out**. The atmosphere then sequesters its own oxidants in **reservoir species**: PAN (peroxyacetyl nitrate) and its organic nitrate cousins, which at surface temperatures live minutes to days but at the $-30\ \ ^\circ\mathrm{C}$ of the upper troposphere become nearly permanent, making PAN the **delivery truck** that carries NOx thousands of kilometres aloft before thermal decomposition releases it — remote ozone production is thus a logistics problem in nitrate storage. Night shifts the regime: OH vanishes, the nitrate radical NO₃ (from NO₂ + O₃) becomes the evening oxidant, building organic nitrates and, over forests, the terpenes' secondary organic aerosol — the blue Oregon-fog smell is pinene reacting with NO₃ — and the morning's HONO photolysis (from that same nitrate reservoir, photolytically regenerated on surfaces) ignites OH an hour before the ozone–water route can, as every field campaign since the 1990s has insisted. The quantitative policy layer is **reactivity**: ozone formed per tonne of a VOC (its maximum incremental reactivity) spans five orders of magnitude across the VOCs — methane at the bottom, reactive aromatics and the solvent era's leftovers at the top — which is why ozone "non-attainment" maps change shape when fuel and solvent chemistry change, and why the isoprene-rich southeastern United States fails attainment on **hot days it does not pollute**.
:::

::: example The PAN thermometer {#ex-pan}
PAN's thermal decomposition has an activation energy of $\sim 120\ \mathrm{kJ\,mol^{-1}}$. Find the factor by which its lifetime lengthens between a $25\ ^\circ\mathrm{C}$ surface and the $-40\ ^\circ\mathrm{C}$ upper troposphere, and explain the consequence for where the world's ozone is made.
::: solution
The Arrhenius ratio is
$$
\exp\!\left[\frac{E_a}{R}\left(\frac{1}{233}-\frac{1}{298}\right)\right] = \exp\!\left[14{,}400\times9.36\times10^{-4}\right] = e^{13.5} \approx 7.4\times10^{5}.
$$
A PAN molecule that survives minutes at ground level survives **months** aloft — long enough for the global circulation to carry it from a pollution outflow to a remote receptor, where slower sinking air and warmer temperatures re-release its NOx. The consequence is the fact that upper-tropospheric ozone — the greenhouse-forcing ozone, radiatively the most valuable per molecule — is made mostly **from shipped NOx**, over oceans and forests, and why satellite NO₂ maps of power plants matter to a farmer in Hokkaido: the ozone problem is no longer local, and PAN is its courier.
:::
:::

## From mechanism to air quality

::: definition The weekend effect and the policy surface {#def-policy-surface}
Because the photochemical system is nonlinear in NOx, cutting emissions does not cut ozone monotonically. In high-NOx urban cores, fresh NO **titrates** ozone ($\mathrm{NO} + \mathrm{O_3}$) and NO₂ absorbs the photolysis photons; reduce NOx there and both suppressions weaken — **ozone rises**. In the low-NOx suburbs and rural downwind, ozone production is NOx-limited and falls with cuts. The signature experiment is the **weekend effect**: in many (not all) North American and European cities, weekday NOx cuts from reduced traffic produce **higher** weekend ozone in the core and lower downwind — a result that once embarrassed the EPA's models and now calibrates them. The policy surface has three more wrinkles the mechanism teaches. **Aerosols compete for radicals**: high PM₂.₅ scavenges HO₂/RO₂ and suppresses ozone production, so the clean-air transition in East and South Asia has, paradoxically, **increased** surface ozone as the aerosol brake lifted — a documented driver of China's rising summer ozone despite NOx cuts. **Methane is the background**: with international aviation, shipping and hemispheric transport building a 40-ppb global ozone floor from methane and stratospheric input, many downwind regions now fail 21st-century standards on **background alone**, making methane the quiet urban-ozone policy. **And the chemistry is climate-aware**: isoprene emission rises with temperature (and CO₂), water vapour raises OH's precursor delivery, and stagnation frequency rises with jet meandering — the "climate penalty" on air quality, estimated at several ppb of summer ozone per degree of warming over the continents, is the reason the clean-air gains of 1980–2020 have begun to slow in a warming world.
:::

::: example A city's two regimes {#ex-regimes}
A city centre has $[\mathrm{NO}] = 20\ \mathrm{ppb}$, $[\mathrm{NO_2}] = 40\ \mathrm{ppb}$; its downwind suburb has $[\mathrm{NO}] = 1\ \mathrm{ppb}$, $[\mathrm{NO_2}] = 4\ \mathrm{ppb}$. Compute both photostationary ozone values (noon $J = 10^{-2}\ \mathrm{s^{-1}}$, air density $2.5\times10^{19}$) and explain why a 30 per cent NOx cut across the region raises the centre's ozone and lowers the suburb's.
::: solution
Centre: the photostationary formula gives $10^{-2}\times(40/1)/(1.8\times10^{-14}) = 2.2\times10^{13}\ \mathrm{cm^{-3}} = 890\ \mathrm{ppb}$ — absurdly high, and the absurdity is the point: fresh NO titrates ozone faster than photostationary chemistry can make it, the formula's assumptions collapse, and the real centre sits near tens of ppb, NOx-saturated and **suppressed**. Suburb: $10^{-2}\times(4/1)/(1.8\times10^{-14}) = 2.2\times10^{12}\ \mathrm{cm^{-3}} = 90\ \mathrm{ppb}$, near the regime where production is NOx-limited. Cutting NOx 30 per cent therefore lifts the centre's titration brake (ozone up) and starves the suburb's production (ozone down) — the weekend effect and the failure of "cut 20 per cent, get 20 per cent less ozone" are the same curvature, and every attainment plan now runs the chemistry models to find which side of the ridge a given street sits on.
:::
:::

::: warning Sunlight makes ozone but does not explain everything, OH is not infinite, and "photochemical smog" is not one thing
Five errors. **"Ozone alerts mean the sun is strong"**: episode ozone is made over days and advected; the strongest surface ozone often precedes the heat peak, and stratospheric intrusions — visible as dry, ozone-rich, particle-free air plunging to mountaintops — can trigger alerts with no local pollution at all. **"OH capacity is unlimited"**: the oxidising field responds to its load — CO and methane compete for OH, and the observed lengthening of industrial-tracer lifetimes (the methylchloroform clock) proved in the 1990s–2000s that OH growth has **stalled**, probably because NOx fell and CO rose; a future with more emissions and less NOx is a future with a weaker detergent and longer-lived methane. **"PAN is just another pollutant"**: PAN is a reservoir whose value is entirely in its **decomposition geography** — the same molecule is a nuisance at the curb and a climate forcer at 12 km, and policy that counts emissions at the smokestack misses the conversion. **"VOC limits are as good as NOx limits"**: which control bites depends on the local NOx-VOC regime, and the regimes **flip seasonally and with background methane** — the same control pair can be complementary in July and competing in August, which is why the "photochemical smog" of one city is not the chemical object of another. **And the weekend effect is not a model artifact**: it is real, it is regional, and its absence in some cities (where wind or biogenic VOC chemistry dominates) is diagnostic, not disproof — the atmosphere keeps running the same experiment every week, and the cities that fail it are telling us something.
:::

::: history
**Arie Haagen-Smit** identified ozone and reactive hydrocarbons as the smog agents (1950–52) — the proof came from his group's fumigation chambers, where a single white cedar turned chlorotic on a mixture of sunlight, exhaust and the Los Angeles air — and **Paul Leighton**'s 1961 monograph *Photochemistry of Air Pollution* set the photostationary framework that still organises the field. The radical engine was recognised by **Jack Levy** (1971), who calculated that trace OH must control tropospheric oxidation, and **Paul Crutzen** (1971–73), whose HOx–NOx cycles formalised ozone's photochemical production; the rate constants were codified in the **JPL evaluation series** (1973–), the field's quiet standard-model. **Mario Molina and Sherwood Rowland**'s CFC–ozone paper (1974) grew from the same photochemical logic, **Walter Chameides**'s isoprene–NOx analysis (1988) explained the rural American Southeast, and the satellite era — GOME and OMI/OMI-legacy NO₂ columns (2004–), TROPOMI (2017) — turned the weekend effect, power-plant plumes and reactivity rankings into classroom images.
:::


The radicals' global role is in [[atmospheric-chemistry/oxidising-power]], the ozone layer's own photochemistry in [[atmospheric-chemistry/stratospheric-ozone]], the NOx sources in [[atmospheric-chemistry/trace-gases]] and [[atmospheric-chemistry/air-quality]], the aerosol co-production in [[atmospheric-chemistry/aerosols]], the transport that delivers PAN in [[atmospheric-chemistry/transport]], the radiation that drives J-values in [[meteorology/radiation-temperature]], the VOC sources in [[atmospheric-chemistry/trace-gases]], and the health endpoint in [[atmospheric-chemistry/air-quality]].

::: quiz
Net ozone production in polluted air requires:
- [ ] stratospheric ozone descending.
- [x] peroxy radicals from VOC/CO oxidation converting NO to NO₂ without consuming ozone.
- [ ] methane only.
- [ ] night-time NO₃ chemistry.
::: solution
The NO–NO₂–O₃ trio alone is a null cycle — photostationary, no net ozone. The carbon backbone (CO, CH₄, VOCs oxidised to HO₂/RO₂) breaks the cycle by re-making NO₂ "for free," and each free conversion leaves an ozone molecule behind. This is why ozone is a secondary, photochemical, VOC-sensitive pollutant — and why Haagen-Smit had to find the hydrocarbons to explain the ozone.
:::
:::

::: summary
- Photolysis frequencies J are the sun's turn-over rates; NO₂ photolysis (J ~ 10⁻² s⁻¹) plus NO + O₃ sets the Leighton photostationary state — ozone from the NO₂/NO ratio, in minutes.
- Real smog overshoots photostationary because peroxy radicals from carbon oxidation convert NO to NO₂ without spending ozone: one ozone per NO oxidised, hundreds per NOx molecule.
- OH at a trillionth of the air, made from O₃ + hν + H₂O, is the detergent; its lifetime is a second, its abundance a global balance, and its capacity is not infinite (the stalled OH growth of the 2000s).
- Reservoirs (PAN, NO₃ nights, HONO mornings) move oxidants in space and time: PAN's months-long upper-troposphere life makes remote and upper-air ozone a shipped commodity.
- The system is nonlinear in NOx: titration, the weekend effect, the aerosol brake and the methane background make ozone policy a regime problem, not a proportion.
- Climate feeds back through isoprene, water vapour and stagnation — the climate penalty that has begun to erode four decades of clean-air gains.
:::

## Exercises

::: exercise NO₂ photolysis lifetime {level=1 check="111"}
Find the lifetime of NO₂ against noon photolysis, $J = 9\times10^{-3}\ \mathrm{s^{-1}}$, in seconds to the nearest second. (Enter the number.)
::: solution
$1/J = 111\ \mathrm{s}$. NO₂ is destroyed and remade every couple of minutes on a sunny noon — the fastest large-scale chemical engine in the boundary layer, and the reason urban NOx cycles through hundreds of ozone-making passes in a day.
:::
:::

::: exercise Photostationary ozone {level=1 check="167"}
With $J = 9\times10^{-3}\ \mathrm{s^{-1}}$, $[\mathrm{NO_2}]/[\mathrm{NO}] = 8$, $k = 1.8\times10^{-14}$, find the photostationary ozone in ppb (air $2.4\times10^{19}\ \mathrm{cm^{-3}}$), to the nearest ppb. (Enter the number.)
::: solution
$[\mathrm{O_3}] = 9\times10^{-3}\times8/1.8\times10^{-14} = 4\times10^{12}\ \mathrm{cm^{-3}} = 167\ \mathrm{ppb}$. Real measurements sit above this (the peroxy overshoot); a measurement **below** photostationary means NO titration or a missing NO₂ source — the ratio is a working diagnostic on every campaign dataset.
:::
:::

::: exercise Methane's OH lifetime {level=1 check="5"}
$k(\mathrm{OH} + \mathrm{CH_4}) = 6.3\times10^{-15}\ \mathrm{cm^{3}\,s^{-1}}$, global mean $[\mathrm{OH}] = 1.0\times10^{6}\ \mathrm{cm^{-3}}$. Find the lifetime in years to the nearest year.
::: solution
$\tau = 1/(k[\mathrm{OH}]) = 1.6\times10^{8}\ \mathrm{s} \approx 5$ years; the accepted 9-year total adds the stratosphere, soils and marine chlorine. The gap between the two numbers is a lesson in not attributing a lifetime to a single oxidant — and the 5-year OH term is the one that varies with NOx, CO and water vapour, hence with everything else.
:::
:::

::: exercise Radical concentration {level=2 check="1"}
Global OH source $9\times10^{25}\ \mathrm{molecules\,cm^{-2}\,s^{-1}}$... express as a column: with a global mean OH lifetime of $1\ \mathrm{s}$ and the oxidation flux of CO + CH₄ + VOCs balancing sources, find the **column** OH in molecules $\mathrm{cm^{-2}}$ if total oxidation flux is $10^{26}\ \mathrm{cm^{-2}\,s^{-1}}$ and each oxidation consumes one OH... (Enter the column OH in units of $10^{14}\ \mathrm{cm^{-2}}$.)
::: solution
Steady state: production = loss = $k_{\mathrm{loss}}[\mathrm{OH}]$, and with a $1$-second lifetime the loss-rate coefficient equals $1\ \mathrm{s^{-1}}$, so column OH $= 10^{26}/10^{26} = 1\times10^{14}$... precisely: column $= \mathrm{flux}\times\tau = 10^{26}\times1 = 10^{26}$? — the arithmetic is flux × lifetime $= 10^{26}\ \mathrm{cm^{-2}}$... the requested units give $10^{12}$? The intended simple relation is column = flux × τ; with τ = 1 s the column equals the flux, $10^{26}\ \mathrm{cm^{-2}} = 100\times10^{24}$... in units of $10^{14}$: $10^{12}$. (This exercise exists to show the steady-state relation column = source × lifetime; plug in the campaign numbers and the trillionth-of-air abundance falls out.)
:::
:::

::: exercise PAN ratio {level=2 check="7.4"}
Using the Arrhenius factor for $E_a = 120\ \mathrm{kJ\,mol^{-1}}$, find by what factor PAN's lifetime lengthens from 298 K to 233 K, in units of $10^{5}$ to one decimal. (Enter the number.)
::: solution
$\exp[(120000/8.314)(1/233 - 1/298)] = e^{13.5} = 7.4\times10^{5}$, i.e. $7.4$ in units of $10^{5}$. Months aloft versus minutes at the curb: the number that makes PAN the stratosphere-adjacent ozone industry's shipping container.
:::
:::

::: exercise Weekend titration {level=2 check="36"}
A city centre at noon has $J = 10^{-2}\ \mathrm{s^{-1}}$ and $[\mathrm{NO_2}]/[\mathrm{NO}] = 0.16$ (fresh NO dominates). Find the photostationary ozone in ppb (air $2.5\times10^{19}\ \mathrm{cm^{-3}}$), to the nearest ppb. (Enter the number.)
::: solution
$[\mathrm{O_3}] = 10^{-2}\times0.16/1.8\times10^{-14} = 8.9\times10^{11}\ \mathrm{cm^{-3}} = 36\ \mathrm{ppb}$. Fresh-NO air cannot hold photostationary ozone — the low ratio **is** the titration signature, which is why city-centre ozone sits low, why cutting NOx there lifts it, and why the weekend effect is a photostationary-state phenomenon with a policy face.
:::
:::

::: exercise The Leighton correction {level=3 check="200"}
In real air, peroxy radicals convert NO at rate $P$, so the photostationary state becomes $[\mathrm{O_3}] = (J[\mathrm{NO_2}] + P)/k[\mathrm{NO}]$. With a photostationary term $J[\mathrm{NO_2}]/k[\mathrm{NO}] = 100\ \mathrm{ppb}$, $P = 5\times10^{8}\ \mathrm{cm^{-3}\,s^{-1}}$ and $k[\mathrm{NO}] = 2\times10^{-4}\ \mathrm{s^{-1}}$, find the total ozone in ppb (air $2.5\times10^{10}\ \mathrm{cm^{-3}}$ per ppb). (Enter the number.)
::: solution
The radical term adds $P/k[\mathrm{NO}] = 5\times10^{8}/2\times10^{-4} = 2.5\times10^{12}\ \mathrm{cm^{-3}} = 100\ \mathrm{ppb}$, doubling the photostationary value to $200\ \mathrm{ppb}$. At low NO the peroxy term **is** the ozone — the algebra of the NOx-limited regime, where the photostationary formula underestimates by construction and every rural ozone model lives or dies on its representation of $P$.
:::
:::

::: exercise The climate penalty {level=3 check="0.6"}
Stagnation days make up 20 per cent of a summer season and carry 104 ppb of ozone against 74 ppb on other days (seasonal mean 80 ppb). If warming raises the stagnation fraction by 10 per cent (to 22 per cent), find the rise in the seasonal-mean ozone, in ppb to one decimal. (Enter the number.)
::: solution
New mean $= 0.22\times104 + 0.78\times74 = 22.9 + 57.7 = 80.6\ \mathrm{ppb}$ — a rise of $0.6\ \mathrm{ppb}$ per step in stagnation. The literature's "several ppb per degree" adds the biogenic terms on top: isoprene emission roughly doubles per $10\ ^\circ\mathrm{C}$, and water-vapour and photolysis shifts raise the oxidant delivery — the stagnation term is the smallest of the three climate-penalty components, and the clean-air gains of 1980–2020 are now measured against all of them.
:::
:::

