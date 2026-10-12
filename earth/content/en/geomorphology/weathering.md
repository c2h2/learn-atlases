Weathering is the only geological process whose rate is measured in micrometres per year and whose consequence is the regulation of the Earth's surface temperature over millions of years. It turns bedrock into soil, it supplies every solute in the ocean, it consumes the carbon dioxide that volcanoes emit, and it is the process that makes a landscape erodible: nothing erodes until something weathers. The last thirty years have turned it from a descriptive footnote of soil science into the best-dated and most model-tested branch of geomorphology, because the same cosmogenic nuclides that date a landform also measure the rate at which the bedrock beneath it is being destroyed.

## The two kinds and the engine

::: definition Physical and chemical weathering {#def-kinds}
**Physical (mechanical) weathering** breaks rock into smaller pieces without changing its chemistry: frost shattering, salt-crystallisation pressure, pressure release and sheeting, thermal fatigue, hydration of salts, and the wedging action of roots and burrows. **Chemical weathering** alters the minerals: **dissolution** of halite, gypsum and carbonate; **hydrolysis** of silicates, in which H$^+$ replaces a network cation; **hydration**; **oxidation** of Fe(II); and **chelation** by organic acids. The two are not independent: physical weathering multiplies the surface area on which chemistry acts, and chemistry weakens the grain boundaries along which physical weathering works. The **regolith** is the whole mantle of weathered material, saprolite and soil, between the unweathered bedrock and the surface, and the **weathering front** is the surface, commonly sharp and commonly at a depth of 1–50 m, across which fresh rock is converted to weathered rock.
:::

::: definition The weathering engine {#def-limits}
A hillslope is either **kinetically limited** or **transport limited**. In a **kinetically limited** system the climate and the mineralogy set the rate at which the rock weathers, the regolith is thin or absent, and the erosion rate equals the weathering rate: cold, dry, or steep landscapes behave this way, and their cosmogenic nuclide concentrations are high because the bedrock is exposed for a long time. In a **transport-limited** system the weathering is faster than the removal, the regolith is thick and at steady state, and the erosion rate is set by the transport law, not by the chemistry: warm, wet, low-relief landscapes behave this way, and their nuclide concentrations are low. The **weathering regulation hypothesis** of Riebe, Kirchner and Finkel states the intermediate case: at steady state the regolith thickness self-organises so that the production of regolith at the front equals its removal at the surface, and the system sits at the **maximum** weathering flux that its climate can sustain.
:::

::: example How fast does bedrock turn to soil? {#ex-insitu}
Quartz in a soil on a granitic hillslope gives a cosmogenic $^{10}\mathrm{Be}$ concentration of $3.5\times10^{5}\ \mathrm{atoms\,g^{-1}}$. The production rate at the surface is $4.6\ \mathrm{atoms\,g^{-1}\,yr^{-1}}$, the attenuation length in rock is 0.6 m, and the $^{10}\mathrm{Be}$ half-life is 1.39 Myr. Find the denudation rate, and say whether the slope is likely to be transport- or kinetically limited.
::: solution
At steady state the concentration of a nuclide produced at an exponentially attenuated rate and lost by both decay and erosion is
$$
N = \frac{P}{\lambda + \varepsilon}, \qquad \varepsilon = \frac{E}{L},
$$
where $\lambda = \ln 2/1.39\times10^{6} = 5.0\times10^{-7}\ \mathrm{yr^{-1}}$. Rearranging,
$$
\lambda + \varepsilon = \frac{P}{N} = \frac{4.6}{3.5\times10^{5}} = 1.31\times10^{-5}\ \mathrm{yr^{-1}},
$$
$$
\varepsilon = 1.31\times10^{-5} - 5.0\times10^{-7} = 1.26\times10^{-5}\ \mathrm{yr^{-1}},
\qquad
E = \varepsilon L = 1.26\times10^{-5}\times0.6 = 7.6\times10^{-6}\ \mathrm{m\,yr^{-1}} .
$$
The denudation rate is **7.6 µm/yr**, or 7.6 m per million years — a typical rate for a stable cratonic landscape, and one that would remove a 500-m relief in 66 Myr.

The limit follows from the regolith. If the slope carries a thick, continuous mantle of soil, the system is **transport-limited** and the 7.6 µm/yr is the rate at which the transport law can move material, not the rate at which the rock weathers. If the slope is bare or thinly mantled, the system is **kinetically limited** and the number is the weathering rate itself. The field observation that decides is the **regolith thickness**: a transport-limited slope at this denudation rate carries a mantle tens of metres thick, and a kinetically limited one carries centimetres.
:::
:::

## The chemistry and its clock

::: definition Silicate weathering and carbon dioxide {#def-silicate}
The weathering of a calcium silicate by carbonic acid is
$$
\mathrm{CaSiO_3} + 2\,\mathrm{H_2CO_3} \longrightarrow \mathrm{Ca^{2+}} + 2\,\mathrm{HCO_3^-} + \mathrm{H_2O} + \mathrm{SiO_2},
$$
and it consumes two molecules of carbon dioxide per formula unit. The calcium and bicarbonate are carried to the ocean, where the reverse reaction precipitates carbonate and returns one of the two CO$_2$ molecules to the sedimentary cycle as carbonate, so the **net** reaction
$$
\mathrm{CaSiO_3} + \mathrm{CO_2} \longrightarrow \mathrm{CaCO_3} + \mathrm{SiO_2}
$$
consumes one molecule of carbon dioxide permanently — permanently until the carbonate is subducted and decarbonated at a volcano. This is the **silicate weathering thermostat** that has kept the Earth habitable for four billion years: a warmer climate weather faster, draws down more CO$_2$, and cools itself, and a cooler climate does the reverse. Its gain is large and its lag is a few hundred thousand years, which is why it can end a Snowball Earth and why it cannot rescue the present excursion from anthropogenic carbon within a human timeframe.
:::

::: example A river as a weathering gauge {#ex-river}
A mountain river with a mean discharge of $500\ \mathrm{m^3\,s^{-1}}$ drains a $40\,000\ \mathrm{km^2}$ catchment of silicate rock and carries $1.8\ \mathrm{mmol\,L^{-1}}$ of bicarbonate, of which 45 per cent is derived from silicate weathering. Find the specific weathering flux, the CO$_2$ consumption rate, and the denudation rate implied if the dissolved load is 30 per cent of the total.
::: solution
The bicarbonate flux is
$$
500\times10^{3}\ \mathrm{L\,s^{-1}}\times1.8\times10^{-3}\ \mathrm{mol\,L^{-1}} = 900\ \mathrm{mol\,s^{-1}} = 2.8\times10^{10}\ \mathrm{mol\,yr^{-1}},
$$
and over $4\times10^{10}\ \mathrm{m^2}$ of catchment this is
$$
\frac{2.8\times10^{10}}{4\times10^{10}} = 0.71\ \mathrm{mol\ HCO_3^-\,m^{-2}\,yr^{-1}} .
$$
The silicate component consumes one CO$_2$ per two bicarbonates, so
$$
\mathrm{CO_2} = \frac{0.45\times0.71}{2} = 0.16\ \mathrm{mol\ CO_2\,m^{-2}\,yr^{-1}} .
$$
This is comparable to the global mean of about 0.15–0.3 mol CO$_2$ m$^{-2}$ yr$^{-1}$ for the continents, so the catchment is an ordinary one.

For the denudation rate, the runoff is
$$
\frac{500\times3.15\times10^{7}}{4\times10^{10}} = 0.39\ \mathrm{m\,yr^{-1}},
$$
a normal value, and if the dissolved load is 30 per cent of the total mass flux, the total denudation is $1/0.30 = 3.3$ times the dissolved flux. Taking the dissolved load as an average rock of density $2700\ \mathrm{kg\,m^{-3}}$ and mean molar mass $100\ \mathrm{g\,mol^{-1}}$ of weathered silicate, the dissolved mass flux is $0.71\times100/2 \approx 36\ \mathrm{g\,m^{-2}\,yr^{-1}}$ of rock, so the total is $36/0.30 = 119\ \mathrm{g\,m^{-2}\,yr^{-1}}$, and
$$
E = \frac{119}{2700\times1000} = 4.4\times10^{-5}\ \mathrm{m\,yr^{-1}} = 44\ \mu\mathrm{m\,yr^{-1}} .
$$
A mountain catchment eroding at 44 µm/yr is a modest one; the Andean and Himalayan front reach 1000–5000 µm/yr, and the cratonic interior 5–10 µm/yr.
:::
:::

::: widget plot
f: 4.6/(0.0000005+x/0.6)
x: 0.000006, 0.00005
y: 0, 500000
labels: \text{in situ }^{10}\text{Be}
caption: The steady-state concentration of in-situ cosmogenic $^{10}\mathrm{Be}$ in quartz plotted against the denudation rate $E$ in metres per year, from $N = P/(\lambda + E/L)$. The curve is a rectangular hyperbola: at low erosion the concentration saturates at $P/\lambda = 9\times10^{6}\ \mathrm{atoms\,g^{-1}}$, the no-erosion asymptote, and at high erosion it falls as $PL/E$. The consequence is that the method is exquisitely sensitive between 1 and 100 µm/yr — the range in which most of the land surface lies — and nearly useless outside it: below 1 µm/yr the concentration change is a few per cent per decade of erosion, and above 1 mm/yr the concentration is so low that a single inherited or contaminated grain dominates. The same limitation applies to every rate proxy that works by measuring the product of a constant source and a first-order sink, including the terrestrial sediment budget and the cosmogenic-nuclide inventory of a sediment.
:::

::: history
The distinction between mechanical and chemical weathering was drawn by the geomorphologists of the nineteenth century, and the primacy of chemistry was established by the agricultural chemists who showed that a soil's fertility is a chemical product. The **silicate weathering thermostat** was proposed by Suess and Plass and made quantitative by Robert Berner (Berner), Harold Urey and Tom Broecker (Broecker) in the 1960s and 1970s, and Berner's GEOCARB model of 1991 turned it into a curve through the Phanerozoic. The **critical zone** concept and the idea of a landscape as a coupled weathering–erosion system are the work of the National Research Council's 2001 report and of the field observatories that followed. The measurement revolution came from **cosmogenic nuclides**: the in-situ production of $^{10}\mathrm{Be}$, $^{26}\mathrm{Al}$ and $^{36}\mathrm{Cl}$ was recognised by Lal (Lal) and by Nishimura in 1954, the first terrestrial exposure ages were measured by Nishizumi, Lal and Veihizer in 1970, and the extension to **catchment-averaged denudation rates** by Brown, Bierman, Small, Porter and others in the early 1990s is the single most consequential method in modern geomorphology. The kinetically limited versus transport-limited dichotomy is the synthesis of Humphreys and Wilkinson (Wilkinson), of Heimsath, Dietrich, Nishiizumi and Finkel's (Finkel) 1997 soil-production study of Point Peak, and of the global cosmogenic synthesis of Willenbring and von Blanckenburg (Blanckenburg) in 2011, which found that the Earth's continental denudation rate has been roughly halved by agriculture. The **weathering regulation hypothesis** is Riebe, Kirchner and Finkel's (Finkel) 2004 paper, and the deep **relict regolith** problem is the work of Butt, Nahon and of Egli and Retzmann.
:::

::: example The soil production function {#ex-production}
On a granitic hillslope the soil production rate follows the exponential relation
$$
\omega = \omega_0\,e^{-c h}, \qquad \omega_0 = 100\ \mu\mathrm{m\,yr^{-1}},\quad c = 0.1\ \mathrm{m^{-1}},
$$
where $h$ is the regolith thickness. Find the production rate at $h = 2\ \mathrm{m}$ and at $h = 12\ \mathrm{m}$, and find the thickness at which a slope eroding at $30\ \mu\mathrm{m\,yr^{-1}}$ can stand at steady state.
::: solution
$$
h = 2\ \mathrm{m}:\quad \omega = 100\,e^{-0.2} = 82\ \mu\mathrm{m\,yr^{-1}}; \qquad
h = 12\ \mathrm{m}:\quad \omega = 100\,e^{-1.2} = 30\ \mu\mathrm{m\,yr^{-1}} .
$$
For a slope eroding at $30\ \mu\mathrm{m\,yr^{-1}}$, steady state requires $\omega(h) = 30$, which gives
$$
h = -\frac{1}{c}\ln\frac{30}{100} = 10\ln 3.33 = 12\ \mathrm{m}.
$$
A slope eroding faster than 30 µm/yr could not maintain 12 m of soil: the front would be stripped back until production rose to match, and at $E = 82\ \mu\mathrm{m\,yr^{-1}}$ the steady-state thickness would be only 2 m.

The exponential form expresses the physical idea that weathering is fastest on **fresh, jointed, near-surface** rock and decays as the mantle thickens and shields the bedrock from the water, the roots, the freeze–thaw and the stress release that drive it. Its consequence is the observed **inverse relation between regolith thickness and erosion rate** on the world's hillslopes, and its limitation is that the coefficient $c$ is fitted rather than predicted, that the relation is measured over a narrow range of thicknesses, and that at large $h$ the production does not fall to zero but to a floor set by deep chemical weathering, which the exponential does not represent. A linear production function $\omega = \omega_0 - ch$ fits some slopes equally well and predicts a **finite** critical thickness beyond which no regolith can survive, which changes the model's behaviour on steep slopes entirely.
:::
:::

## The physical work

::: definition Physical weathering processes {#def-physical}
**Frost weathering** works because water expands 9 per cent on freezing and because the ice segregation front draws water from unfrozen pores, generating pressures of tens of megapascals; it is most effective not where it is coldest but where the temperature **cycles through 0 $^\circ$C** many times a year, which is a function of altitude and aspect rather than of latitude. **Salt weathering** works by crystallisation pressure in pores and by the hydration-pressure of salts such as thenardite converting to mirabilite, and it dominates arid and coastal rock surfaces. **Pressure release** (unloading, sheeting, exfoliation) works because a rock brought to the surface by erosion is no longer confined and expands perpendicular to the free surface, generating subparallel joints; the spacing of the sheets scales with the relief and with the rock's flaw density. **Thermal fatigue** works by the diurnal cycling of surface temperature, and its penetration depth is the thermal skin depth, about 0.1–0.3 m for the daily cycle, which is why desert rock spalls are centimetres thick. **Hydroclastic** and **mud-crack** processes work in fine-grained rocks. The rates are not small: rock-surface erosion measured by cosmogenic nuclides on exposed desert bedrock is 1–100 µm/yr, and in frost-dominated terrain 100–1000 µm/yr.
:::

::: example How deep does frost reach? {#ex-frost}
The annual temperature wave at the surface of a rock has an amplitude of 20 $^\circ$C and a mean of $-2\ ^\circ$C, and the thermal diffusivity of the rock is $1\times10^{-6}\ \mathrm{m^2\,s^{-1}}$. Find the depth to which the temperature reaches $0\ ^\circ$C and the depth of the annual thermal skin, and say what physical weathering this implies.
::: solution
The temperature wave decays with depth as $\exp(-z/d)$ where the skin depth is
$$
d = \sqrt{\frac{2\kappa}{\omega}} = \sqrt{\frac{2\times10^{-6}\times(3.16\times10^{7})}{2\pi}} = \sqrt{10.1} = 3.2\ \mathrm{m}.
$$
The amplitude at depth $z$ is $20\,e^{-z/3.2}$, and the mean temperature rises from $-2\ ^\circ$C toward zero with depth, so the $0\ ^\circ$C isotherm lies where the annual mean has risen to about $+2\ ^\circ$C — within a few metres of the surface. The **active layer** in which the annual wave drives freeze–thaw cycling is therefore of order **1–3 m thick**, which is the observed thickness of the frost-perturbed layer and of the talus-producing zone in periglacial terrain.

The daily wave, with a skin depth smaller by $\sqrt{365} = 19$, reaches only
$$
\frac{3.2}{19} = 0.17\ \mathrm{m},
$$
which is why desert rock spalls and granular disintegration operate in the top few centimetres and cannot account for the breakdown of fresh rock at depth. The practical conclusion is that **frost shatters metres, sun shatters centimetres**, and that a landscape's block size — the grain size of its talus and of its colluvium, and therefore the size of the clasts in the conglomerate it becomes — is set by the depth of the frost-active layer and by the joint spacing it exploits, not by the strength of the rock.
:::
:::

::: warning Weathering rates measured today are not the rates that built the landscape
Three mismatches are systematic. **The climate mismatch**: a cosmogenic or solute flux measures the last thousand years, and a landscape's form records the last million, and in the mid-latitudes the intervening period includes at least four glacial periods in which the weathering regime was entirely different — a periglacial one, with an order-of-magnitude higher physical-weathering and sediment-flux rates than the modern interglacial. A hillslope mantled in solifluction deposits is being measured in an interglacial and was built in a glacial. **The relict-regolith mismatch**: thick deeply weathered mantles in the tropics and in old cratonic surfaces are commonly **relict**, formed under a Cretaceous or Palaeogene climate and a different relief, and are being slowly dissected today; dating them requires the cosmogenic or uranium-series methods applied to the regolith itself, and the answers routinely give weathering ages of millions of years and modern rates of micrometres. **And the outlet mismatch**: a river's dissolved load measured at its mouth is an average over the whole catchment, and in a catchment with both a fast-eroding mountain and a slow-weathering lowland, the solute flux is dominated by the mountain's **physical** comminution and by the lowland's **chemical** leaching, and the two cannot be separated without sampling the network. The discipline is to state the **time and space window** of every rate, and never to combine a modern rate with a landform's age.
:::

::: quiz
A hillslope has no soil, a high cosmogenic nuclide concentration, and a bedrock that is fresh beneath a rind of a few centimetres. What limits its erosion?
- [x] The weathering rate: the slope is kinetically limited.
- [ ] The transport capacity: the slope is transport limited.
- [ ] The river at its base: the slope is bedrock-channel limited.
- [ ] Nothing; it is at steady state.
::: solution
A thin or absent regolith with fresh rock near the surface and a high nuclide concentration means the bedrock has been exposed for a long time and is being removed as fast as it weathers. The weathering rate is the ceiling on the erosion rate. A transport-limited slope would carry a thick mantle, a low nuclide concentration, and deeply weathered rock.
:::
:::

## Where this leads

The soil that weathering produces is the subject of [[geomorphology/soils]], the hillslope that removes it is in [[geomorphology/hillslopes]], the chemistry of the solutions is in [[geochemistry/weathering-chemistry]] and [[geochemistry/aqueous-geochemistry]], the isotopes used to trace it are in [[geochemistry/stable-isotopes]], the rock it breaks is in [[mineralogy-petrology/silicates]] and [[physical-geology/minerals]], and the carbon cycle it regulates is in [[biogeochemistry/carbon-deep-time]] and [[climate-system/carbon-climate]].

::: summary
- Physical weathering makes surface area and chemical weathering makes soil; neither works alone, and the regolith between them is the record of both.
- A hillslope is either kinetically limited, where weathering sets the erosion rate, or transport limited, where the reverse is true, and the regolith thickness tells you which.
- Silicate weathering consumes carbon dioxide and precipitates carbonate, and this is the thermostat that has kept the Earth habitable on a million-year lag.
- Cosmogenic nuclides give denudation rates of 1–100 µm/yr with good precision and almost none outside that window.
- A river's dissolved load is a catchment-average weathering flux, and it can be converted to a CO$_2$ consumption rate.
- Modern weathering rates are not the rates that built most landscapes, because the climate and the regolith are commonly relict.
:::

## Exercises

::: exercise Weathering type {level=1}
Rounded granite boulders in a desert show exfoliation shells a few centimetres thick and no chemical alteration. Name the process.
::: solution
**Pressure release (unloading) and thermal fatigue**, both physical. Exfoliation shells a few centimetres thick are the classic signature of pressure release on an exposed pluton face, and the absence of chemical alteration confirms an arid, kinetically limited setting in which chemistry is starved of water. The boulders' rounding is the result of the shells spalling preferentially at edges and corners, where the stress concentration is greatest.
:::
:::

::: exercise Cosmogenic rate {level=1 check="14"}
A quartz sample gives a $^{10}\mathrm{Be}$ concentration of $2.0\times10^{5}\ \mathrm{atoms\,g^{-1}}$. With $P = 4.6$ and $L = 0.6\ \mathrm{m}$, find the denudation rate in µm/yr.
::: solution
$\lambda + \varepsilon = 4.6/2.0\times10^{5} = 2.3\times10^{-5}$, so $\varepsilon = 2.3\times10^{-5} - 5\times10^{-7} = 2.25\times10^{-5}\ \mathrm{yr^{-1}}$ and $E = 0.6\times2.25\times10^{-5} = 1.35\times10^{-5}\ \mathrm{m\,yr^{-1}} = 14\ \mu\mathrm{m\,yr^{-1}}$.
:::
:::

::: exercise Weathering reaction {level=1}
Write the net reaction for the weathering of anorthite by carbonic acid and state how many CO$_2$ molecules are permanently consumed.
::: solution
$$
\mathrm{CaAl_2Si_2O_8} + 2\,\mathrm{CO_2} + 3\,\mathrm{H_2O} \longrightarrow \mathrm{Ca^{2+}} + 2\,\mathrm{HCO_3^-} + \mathrm{Al_2Si_2O_5(OH)_4},
$$
producing kaolinite. Two CO$_2$ are consumed in solution and one is returned when the calcium precipitates as carbonate in the ocean, so **one** molecule is permanently consumed per formula unit of anorthite.
:::
:::

::: exercise Limiting condition {level=2}
Two catchments of the same area and lithology have the same mean slope. Catchment A has a mean elevation of 3 km, a runoff of 1.5 m/yr and no soil; catchment B has a mean elevation of 200 m, a runoff of 0.4 m/yr and 30 m of laterite. Which is kinetically limited and which transport limited, and what is the expected difference in their solute fluxes?
::: solution
**Catchment A is kinetically limited**: a cold, steep, well-drained upland with no regolith, in which the erosion rate equals the weathering rate and the cosmogenic concentrations are high. **Catchment B is transport limited**: a warm, wet lowland with a thick steady-state regolith, in which the weathering is faster than the removal and the erosion rate is set by the transport law.

The solute fluxes are not what the intuition suggests. Catchment A's **physical** denudation is high but its **chemical** flux is low, because low temperature and a short residence time starve the reactions; catchment B's chemical flux is high per unit area because the laterite records intense leaching, but its **specific** solute flux may be lower than A's because the lowland is already depleted of soluble minerals. The classic result is that the highest solute fluxes come from **actively uplifting, physically comminuting, moderately wet** orogens — the Himalaya, the Andes, Taiwan — where fresh mineral surface is produced faster than it can be leached, and that the deeply weathered tropics, for all their laterite, contribute less CO$_2$ drawdown per square metre than the young mountains do.
:::
:::

::: exercise River chemistry {level=2 check="0.79"}
A river of discharge $2000\ \mathrm{m^3\,s^{-1}}$ and bicarbonate $2.5\ \mathrm{mmol\,L^{-1}}$ drains $200\,000\ \mathrm{km^2}$. Find the specific bicarbonate flux in $\mathrm{mol\,m^{-2}\,yr^{-1}}$.
::: solution
The flux is $2000\times10^{3}\times2.5\times10^{-3} = 5000\ \mathrm{mol\,s^{-1}} = 1.58\times10^{11}\ \mathrm{mol\,yr^{-1}}$, and over $2\times10^{11}\ \mathrm{m^2}$ this is
$$
\frac{1.58\times10^{11}}{2\times10^{11}} = 0.79\ \mathrm{mol\ HCO_3^-\,m^{-2}\,yr^{-1}} .
$$
(With a 40 per cent silicate fraction the CO$_2$ consumption is $0.4\times0.79/2 = 0.16\ \mathrm{mol\ CO_2\,m^{-2}\,yr^{-1}}$.)
:::
:::

::: exercise Frost depth {level=2 check="0.17"}
Using the annual skin depth of 3.2 m and a diffusivity of $10^{-6}\ \mathrm{m^2\,s^{-1}}$, find the daily thermal skin depth.
::: solution
The daily skin depth is the annual value divided by $\sqrt{365} = 19.1$, giving $3.2/19.1 = 0.17\ \mathrm{m}$. Thermal fatigue therefore operates in the top ~17 cm, which is the thickness of a desert rock rind and of the granular-disintegration zone.
:::
:::

::: exercise A regolith budget {level=3}
A hillslope at steady state carries a regolith 12 m thick over fresh granite. The cosmogenic denudation rate is 18 µm/yr. Find the weathering velocity at the front, the residence time of a parcel of regolith, and the concentration of $^{10}\mathrm{Be}$ at the base of the regolith relative to the surface.
::: solution
At steady state the **weathering velocity at the front equals the denudation rate at the surface**, so the front advances into fresh rock at $18\ \mu\mathrm{m\,yr^{-1}}$. The residence time of a parcel of regolith is
$$
\frac{12\ \mathrm{m}}{18\times10^{-6}\ \mathrm{m\,yr^{-1}}} = 6.7\times10^{5}\ \mathrm{yr}.
$$
The $^{10}\mathrm{Be}$ concentration falls with depth as $e^{-z/L}$, so at the base of the regolith it is
$$
e^{-12/0.6} = e^{-20} = 2\times10^{-9}
$$
of the surface production value — utterly zero. The consequence is that a soil at the surface of a thick regolith carries **no** in-situ $^{10}\mathrm{Be}$ inherited from the regolith below it, and that the concentration measured in a soil or a river sediment reflects only the last metre or so of the landscape. This is why cosmogenic denudation rates are **catchment-averaging over the shallowest of depths** and why a sediment's nuclide concentration cannot be used to date the regolith it came from.

The residence time of 670 kyr is the more interesting number. It says that the chemical alteration of the regolith has 670 thousand years in which to proceed at each depth, that the weathering front is 12 m deep because the climate can drive it that far at this erosion rate, and that if the erosion rate doubled the front would shallow to about 6 m and the regolith would be less weathered — which is the observed relation between erosion rate and weathering intensity in mountain frontiers, and the reason that a fast-eroding orogen delivers **less weathered** sediment than a slow-eroding craton despite delivering far more of it.
:::
:::

::: exercise The thermostat {level=3}
A "Snowball Earth" glaciation reduces the global silicate weathering flux to 5 per cent of its present value while volcanic and metamorphic degassing continues at $4\times10^{12}\ \mathrm{mol\ C\,yr^{-1}}$. How long does it take to build the CO$_2$ needed to deglaciate, taking the threshold as 350 times the pre-industrial atmospheric inventory of $4.9\times10^{16}\ \mathrm{mol\ C}$?
::: solution
The target inventory is
$$
350\times4.9\times10^{16} = 1.7\times10^{19}\ \mathrm{mol\ C},
$$
and the net accumulation, with weathering removing 5 per cent of what it removes today, is
$$
4\times10^{12}\times0.95 = 3.8\times10^{12}\ \mathrm{mol\ C\,yr^{-1}} .
$$
The time is therefore
$$
\frac{1.7\times10^{19}}{3.8\times10^{12}} = 4.5\times10^{6}\ \mathrm{yr},
$$
about **4.5 million years**. The geological estimates for the duration of the Sturtian and Marinoan glaciations are 10–100 times longer than this, which is the sign that the assumption of a constant 5 per cent weathering flux is too crude: as the CO$_2$ rises and the ice margin retreats, the weathering flux recovers and consumes part of the input, so the run-up is slower than the shut-off calculation suggests. The calculation nevertheless captures the essential point that the silicate thermostat is **slow** — millions of years, not centuries — and that a climate forced faster than the thermostat can respond, as the present one is, is not regulated by it at all.
:::
:::
