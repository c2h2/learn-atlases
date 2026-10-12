The water in this glass has been drunk before — by a Devonian fish, by a sauropod at the edge of a Cretaceous lake, and, in some proportion, by every person who has ever lived. The Earth's water is a closed bookkeeping system: about $1.386\times10^{9}\ \mathrm{km^3}$ of it, circulating between ocean, air, ice, soil, rock and living tissue, with almost nothing added from the interior and almost nothing lost to space. What is not closed is the *distribution*. Of that water, $97.5\%$ is saline, $1.75\%$ is locked in ice, $0.7\%$ is groundwater, and the rivers, lakes and atmosphere that carry our civilisation together amount to about $0.04\%$ — a film thinner, relative to the planet, than the varnish on an orange.

The engine of the distribution is sunlight: of the $240\ \mathrm{W\,m^{-2}}$ the surface absorbs, about $80\ \mathrm{W\,m^{-2}}$ ($35\%$) goes not into warming the ground but into evaporating water, the largest single energy use on the planet's surface. This chapter is the bookkeeping of that engine — how much water is where, how fast it moves, where it goes when people intervene, and what happens to it as the world warms.

## The global water balance

::: definition Water balance {#def-water-balance}
The **water balance** of any defined region — the globe, a continent, a catchment, a field — is the budget
$$
P = E + T + Q + \Delta S,
$$
where $P$ is precipitation, $E$ evaporation from open water and soil, $T$ transpiration from plants (together $E + T$ being **evapotranspiration**), $Q$ the net surface or subsurface outflow (runoff, for a catchment), and $\Delta S$ the change in storage. Units are a depth over an area ($\mathrm{mm\,yr^{-1}}$) or a volume ($\mathrm{km^3\,yr^{-1}}$); $1\ \mathrm{km^3}$ of water is $1\ \mathrm{Gt}$.
:::

::: proposition Closure of the global water balance {#prop-closure}
For the ocean and the land separately, with no change in storage over a decade or more,
$$
P_\text{o} = E_\text{o} - R, \qquad P_\ell = E_\ell + R,
$$
where $R$ is the river (plus subsurface) discharge from land to ocean. Hence $R = E_\text{o} - P_\text{o}$: the ocean must evaporate more than it rains, and the excess is exactly what reaches the land.
:::

::: proof
Over the ocean the only inputs are precipitation and river inflow, the only outputs evaporation; over land the only input is precipitation and the outputs are evapotranspiration and runoff. Setting $\mathrm{d}S/\mathrm{d}t = 0$ for both gives the two equations. Adding them gives $P_\text{o} + P_\ell = E_\text{o} + E_\ell$, the global closure. The argument assumes no long-term trend in ice sheets or groundwater — which is no longer true, and the imbalance is now measured directly by the GRACE and GRACE-FO satellites as a loss of $10^{2}$–$10^{3}\ \mathrm{Gt\,yr^{-1}}$ of land ice and groundwater.
:::

| Flux ($10^3\ \mathrm{km^3\,yr^{-1}}$) | Ocean | Land | Global |
|---|---|---|---|
| Precipitation | 373 | 119 | 492 |
| Evaporation + transpiration | 413 | 73 | 486 |
| Runoff to ocean | $+40$ | $-45$ | — |

(Shiklomanov's global water balance; the $3\times10^{3}\ \mathrm{km^3\,yr^{-1}}$ mismatch is the classic closure error of the dataset.) Global mean precipitation is therefore $492{,}000/5.10\times10^{8} = 965\ \mathrm{mm\,yr^{-1}}$, of which $700\ \mathrm{mm}$ falls on the ocean and $265\ \mathrm{mm}$ on land.

::: example The atmosphere turns over forty times a year {#ex-turnover}
The atmosphere holds $12{,}700\ \mathrm{Gt}$ of water vapour and global precipitation is $492{,}000\ \mathrm{Gt\,yr^{-1}}$. Find the residence time and the mean precipitable water. How does the atmosphere's share of the water compare with its share of the *flow*?
::: solution
$$
\tau = \frac{12{,}700}{492{,}000} = 0.0258\ \mathrm{yr} = 9.4\ \mathrm{days},
$$

so the atmospheric reservoir is emptied and refilled about $39$ times a year. The mean precipitable water is $12{,}700\ \mathrm{km^3}/5.10\times10^{8}\ \mathrm{km^2} = 24.9\ \mathrm{mm}$ — a global average, ranging from under $5\ \mathrm{mm}$ over cold deserts and the Antarctic plateau to $65\ \mathrm{mm}$ over the warm western Pacific.

The comparison is the point: the atmosphere holds $0.001\%$ of the Earth's water but carries $3.5\%$ of the annual flux through it, so it turns over $3500$ times faster than the ocean. Everything about weather — the violence, the speed, the fact that a storm can drop a month's rain in a day — follows from a reservoir that is small and a flux that is large.
:::
:::

::: widget plot
f: 6.11*exp(17.67*x/(x+243.5))
x: -25, 40
y: 0, 80
caption: Saturation vapour pressure over water, from the Magnus approximation $e_s = 6.11\exp(17.67\,T/(T + 243.5))\ \mathrm{hPa}$ with $T$ in $^\circ\mathrm{C}$. Read the values at $10$ and $20\ ^\circ\mathrm{C}$: $12.3$ and $23.4\ \mathrm{hPa}$, a factor of $1.9$ for $10\ \mathrm{K}$. That is the Clausius–Clapeyron control on how much water the air can hold, and hence on the intensity of rainfall — the single most robust prediction in climate science, and the reason a warmer atmosphere produces more extreme rain even where total rainfall barely changes.
:::

## Where the rain goes

::: definition Runoff coefficient and the aridity limit {#def-runoff}
The **runoff coefficient** of a catchment is $C = Q/P$, the fraction of precipitation that leaves as streamflow. Over a long period a water-limited (arid) catchment has $C \to 0$ because plants and evaporation take almost everything, while an energy-limited (humid) catchment has $C \to 1 - E_0/P$, where $E_0$ is the potential evaporation.
:::

::: example A catchment's budget {#ex-catchment}
A $2{,}000\ \mathrm{km^2}$ catchment receives $900\ \mathrm{mm\,yr^{-1}}$ of precipitation and discharges a mean of $12\ \mathrm{m^3\,s^{-1}}$. Find the evapotranspiration in $\mathrm{mm\,yr^{-1}}$ and the runoff coefficient. If irrigation diverts $30\%$ of the flow and $60\%$ of that is consumed (evaporated from fields), by how much does the discharge reaching the river mouth fall?
::: solution
Runoff depth: $12\ \mathrm{m^3\,s^{-1}}\times3.156\times10^{7}\ \mathrm{s\,yr^{-1}} = 3.79\times10^{8}\ \mathrm{m^3}$, over $2.0\times10^{9}\ \mathrm{m^2}$ gives $189\ \mathrm{mm\,yr^{-1}}$. Hence
$$
E + T = P - Q = 900 - 189 = 711\ \mathrm{mm\,yr^{-1}}, \qquad C = \frac{189}{900} = 0.21 .
$$

That is a typical temperate, vegetated catchment: four fifths of the rain returns to the air, mostly through plants. For the diversion, $30\%$ of $12\ \mathrm{m^3\,s^{-1}}$ is $3.6\ \mathrm{m^3\,s^{-1}}$, of which $60\%$ ($2.2\ \mathrm{m^3\,s^{-1}}$) never returns as flow. Discharge at the mouth falls from $12$ to $9.8\ \mathrm{m^3\,s^{-1}}$, a $19\%$ reduction, and the reduction is concentrated in the dry season when abstraction is greatest — which is why "the average flow is unchanged" and "the river still reaches the sea" are both compatible with a river that has stopped functioning.
:::
:::

::: definition Precipitation recycling {#def-recycling}
The **recycling ratio** $\rho$ is the fraction of precipitation over a region that came from evapotranspiration from that same region. Over the global land surface $\rho \approx 0.33$; over the Amazon basin, $0.25$–$0.50$ depending on season and dataset; over the Sahara, near $0.1$.
:::

The recycling ratio is the number that turns deforestation into a hydrological question. Rain falling inland is, on average, a third local and two thirds oceanic, but the local fraction is built up along the trajectory of the air: a parcel crossing the Amazon receives rain that has been evaporated by the forest one, two, three times over. Remove the forest and you remove the first stages of that cascade, so the downwind reduction in rainfall is several times the local one. In the Amazon, model studies of large-scale deforestation find regional precipitation falling by $10$–$40\%$ in the dry season, with the sign of the forest–rainfall feedback depending on how much is removed ([[hydrology/precipitation-evaporation]]).

::: example How far inland can the ocean's water get? {#ex-continental}
Air at $25\ ^\circ\mathrm{C}$ with $90\%$ relative humidity moves inland and is progressively rained out. Take the effective isotopic fractionation as a proxy for the rainout: with $\delta = \delta_0 + \epsilon\ln f$, where $f$ is the remaining fraction of vapour and $\epsilon \approx -10$‰ for $\delta^{18}\mathrm{O}$, find $f$ when $\delta$ has fallen from $0$‰ (seawater vapour) to $-25$‰, typical of mid-latitude continental precipitation.
::: solution
$$
\ln f = \frac{\delta - \delta_0}{\epsilon} = \frac{-25}{-10} = 2.5 \quad\Longrightarrow\quad f = e^{-2.5} = 0.082 .
$$

Only $8\%$ of the original vapour is left: the air has lost $92\%$ of its water on the way in. This is why the great continental interiors are dry, why the $\delta^{18}\mathrm{O}$ of precipitation falls by $0.2$–$0.3$‰ per $100\ \mathrm{m}$ of elevation (the *altitude effect*), by $0.5$‰ per $^\circ\mathrm{C}$ of temperature (the *temperature effect*, the basis of the ice-core palaeothermometer in [[palaeoclimate/ice-cores]]), and why the deepest inland basins on Earth are saline: the water that arrives has nowhere to go but evaporation, and the salt stays.
:::
:::

## The slow reservoirs

::: proposition Sea-level equivalent {#prop-sle}
Melting an ice volume $V_\text{ice}$ over land raises global mean sea level by
$$
\Delta h = \frac{\rho_\text{ice}}{\rho_\text{w}}\frac{V_\text{ice}}{A_\text{ocean}},
$$
with $\rho_\text{ice} \approx 917\ \mathrm{kg\,m^{-3}}$, $\rho_\text{w} = 1028\ \mathrm{kg\,m^{-3}}$ and $A_\text{ocean} = 3.62\times10^{8}\ \mathrm{km^2}$. Floating ice — the ice shelves and sea ice — contributes nothing, because it already displaces its own meltwater volume (Archimedes).
:::

::: proof
The meltwater volume is $V_\text{w} = (\rho_\text{ice}/\rho_\text{w})V_\text{ice}$, spread over the ocean area. For floating ice of mass $m$, the displaced water volume is $m/\rho_\text{w}$, exactly the volume the meltwater occupies, so the waterline does not change. The corollary matters: the loss of Arctic sea ice, however alarming as a climate signal, does not by itself raise sea level, whereas the loss of the grounded Greenland ice sheet does, metre for metre.
:::

::: example The ice in the freezer {#ex-sle}
The Greenland ice sheet holds $2.85\times10^{6}\ \mathrm{km^3}$ of ice and the Antarctic ice sheet $2.65\times10^{7}\ \mathrm{km^3}$, of which about $2.3\times10^{7}\ \mathrm{km^3}$ is grounded. Find the sea-level equivalent of each.
::: solution
Greenland:
$$
\Delta h = \frac{917}{1028}\times\frac{2.85\times10^{6}}{3.62\times10^{8}} = 0.892\times7.87\times10^{-3}\ \mathrm{km} = 7.0\ \mathrm{m},
$$

usually quoted as $7.4\ \mathrm{m}$ with the most recent volume estimates. Antarctica (grounded ice only): $0.892\times2.3\times10^{7}/3.62\times10^{8} = 57\ \mathrm{m}$, quoted as $58\ \mathrm{m}$. Mountain glaciers and small ice caps together hold enough for about $0.4\ \mathrm{m}$.

Put these numbers next to the observed rise of $3.7\ \mathrm{mm\,yr^{-1}}$ over 2006–2015 (IPCC AR6, accelerating to about $4.6\ \mathrm{mm\,yr^{-1}}$ in 2013–2022 per the WMO *State of the Global Climate* reports) and the scale of the problem becomes clear: the present rate uses up the Greenland equivalent in about two million years, but the *rate* is what matters, because a few tens of millimetres per decade is what decides how many people and how much coastline are exposed.
:::
:::

::: warning "Only $2.5\%$ of water is fresh, so water is scarce" gets the scarcity wrong twice
First, most of that $2.5\%$ is unreachable: of $10.53\times10^{6}\ \mathrm{km^3}$ of fresh groundwater much is brackish or too deep to pump economically, and $69\%$ of the "fresh" surface water is in ice sheets that are, for practical purposes, immobile. Second, the scarcity that matters is not global but seasonal and local. The planet does not lack water; specific rivers, aquifers and months do. The Nile Basin abstracts more than $100\%$ of its mean annual flow in dry years; parts of the North China Plain and the High Plains aquifer of the United States have fallen tens of metres because pumping exceeds recharge by an order of magnitude. Groundwater depletion is now measured from space: GRACE and GRACE-FO have tracked a global land-water loss dominated by groundwater, and the assessed depletion of groundwater storage since the 1970s is of order $10^{3}\ \mathrm{Gt}$ and accelerating (Jasechko et al., 2024). Aquifers with a residence time of $10^{3}$–$10^{4}$ years are being emptied in decades: this is mining, not farming.
:::

::: example Groundwater mining {#ex-groundwater}
An aquifer of area $50{,}000\ \mathrm{km^2}$, porosity $0.15$ and saturated thickness $100\ \mathrm{m}$ is pumped at $5\ \mathrm{km^3\,yr^{-1}}$ with a natural recharge of $1\ \mathrm{km^3\,yr^{-1}}$. Find the initial extractable volume, the time to exhaust it at constant pumping, and the rate of water-table fall if the specific yield is $0.12$.
::: solution
Storage $= 5.0\times10^{4}\ \mathrm{km^2}\times0.1\ \mathrm{km}\times0.15 = 750\ \mathrm{km^3}$. Net drawdown $= 5 - 1 = 4\ \mathrm{km^3\,yr^{-1}}$, so the aquifer is exhausted in $750/4 = 190$ years — and long before that the cost of pumping and the drying of wells make the scheme unworkable.

The water table falls at
$$
\frac{\mathrm{d}h}{\mathrm{d}t} = \frac{4\ \mathrm{km^3\,yr^{-1}}}{5.0\times10^{4}\ \mathrm{km^2}\times0.12} = 6.7\times10^{-4}\ \mathrm{km\,yr^{-1}} = 0.67\ \mathrm{m\,yr^{-1}},
$$

which is the observed order for many irrigated plains. The related land subsidence — compaction as the water table drops — is measurable by satellite radar interferometry and in places such as Jakarta and Mexico City has reached several centimetres per year, permanently destroying the aquifer's storage ([[remote-sensing/radar-lidar]]).
:::
:::

## People in the cycle

::: definition Withdrawal, consumption and stress {#def-withdrawal}
**Water withdrawal** is water taken from a source; **consumption** is the part not returned to the source (mostly crop transpiration and evaporation from reservoirs). **Water stress** measures withdrawal as a fraction of available renewable water: a basin above $40\%$ is conventionally called stressed, and above $100\%$ is being supplied by mining storage or by imports embodied in food.
:::

Global freshwater withdrawal is about $4{,}000\ \mathrm{km^3\,yr^{-1}}$, of which roughly $70\%$ irrigates crops, $20\%$ serves industry and energy and $10\%$ is domestic (FAO AQUASTAT, figures for the early 2020s). That is only $9\%$ of mean river runoff of $45{,}000\ \mathrm{km^3\,yr^{-1}}$, which is why global averages are so misleading: the same water is withdrawn in the wrong places at the wrong times, and consumption rather than withdrawal is what matters.

::: example Virtual water {#ex-virtual}
Producing $1\ \mathrm{kg}$ of beef consumes of order $15{,}000\ \mathrm{L}$ of green and blue water (rain stored in soil plus irrigation), and $1\ \mathrm{kg}$ of wheat about $1{,}300\ \mathrm{L}$; the figures vary by a factor of several with climate, system and whether the feed's water is counted. A $200\ \mathrm{g}$ burger therefore carries about $2{,}400\ \mathrm{L}$. Find the water "exported" by a country that ships $1\ \mathrm{Mt}$ of wheat, and compare it with the annual domestic supply of a city of $10$ million people using $200\ \mathrm{L\,cap^{-1}\,d^{-1}}$.
::: solution
Wheat: $10^{6}\ \mathrm{t}\times1300\ \mathrm{m^3\,t^{-1}} = 1.3\times10^{9}\ \mathrm{m^3} = 1.3\ \mathrm{km^3}$.
City: $10^{7}\times200\ \mathrm{L\,d^{-1}} = 2\times10^{9}\ \mathrm{L\,d^{-1}} = 2.0\times10^{6}\ \mathrm{m^3\,d^{-1}}$, or $0.73\ \mathrm{km^3\,yr^{-1}}$.

So one million tonnes of wheat carries nearly twice the annual domestic water of a megalopolis. This is why "virtual water" trade is a real hydrological strategy — arid oil-exporting states are, in effect, importing rainfall from Canada, Ukraine and Argentina — and why the water footprint of diets and of bioenergy crops belongs in any honest accounting of land and water use ([[earth-resources/groundwater-resources]]).
:::
:::

::: widget plot
f: if(x<400, 0, 1 - 400/x)
x: 50, 2000
y: 0, 1
vlines: 400
caption: Runoff coefficient of a hypothetical catchment as a function of annual precipitation, with potential evaporation fixed at $400\ \mathrm{mm\,yr^{-1}}$: below that threshold plants and evaporation take everything and the river runs dry, above it the surplus grows as $1 - E_0/P$. Real catchments round the corner rather than turning a knee, because soils store water and deep roots extend the dry-season supply — but the shape explains why a $20\%$ reduction in rainfall in a semi-arid region can reduce runoff by $50\%$, and why the projected drying of the Mediterranean and the southwestern United States is a water problem out of all proportion to the change in rainfall.
:::

::: quiz
A region's mean annual precipitation is unchanged, but its heaviest rain days have become $15\%$ more intense and the dry spells between them longer. What is the most likely effect on runoff and on water supply?
- [ ] Both runoff and supply improve, because the total water is the same.
- [x] Runoff increases and supply worsens, because more water arrives in bursts that the soil and reservoirs cannot hold.
- [ ] Both fall, because evaporation increases.
- [ ] Nothing changes, since the mean is unchanged.
::: solution
A larger fraction of the same total arrives at rates above the infiltration capacity, so more becomes overland flow and flash flood, less is stored in soil, and less is available to plants and wells between storms. This is the observed pattern of "intensification" — thermodynamically expected at about $7\ \mathrm{K^{-1}}$ from the Clausius–Clapeyron control on atmospheric moisture — and it is why climate adaptation for water is mostly about storage, infiltration and demand, not about average rainfall ([[climate-change/extremes]]).
:::
:::

::: history
The water cycle was understood, in outline, before anything about it could be measured. In 1674 Pierre Perrault (Perrault) published *Les Sources de l'origine des fontaines*, in which he measured rainfall in the Seine basin and showed that enough falls to explain the river's flow — a conclusion his contemporaries, who believed rivers rose from underground seawater driven up by pressure, found absurd. Edme Mariotte (Mariotte) repeated the arithmetic on the Seine with discharge measurements, and Edmond Halley (Halley) measured evaporation from the sea off Spain in 1687 and closed the budget for the Mediterranean. John Dalton (Dalton)'s evaporation law of 1802 and the gas laws that followed gave the physics of the vapour. Henry Darcy (Darcy)'s 1856 column experiments on the sand filters of Dijon gave the law that governs groundwater to this day ([[hydrology/aquifers-wells]]). Isotopes made the cycle visible: the Vienna standard was set in 1961, and the global meteoric water line of Harmon Craig (Craig) in 1961 turned $\delta^{18}\mathrm{O}$ and $\delta^2\mathrm{H}$ into tracers of where rain came from and at what temperature it condensed. From December 2002 the GRACE twin satellites weighed the water in every basin on Earth monthly by its gravity, and for the first time groundwater depletion, ice-sheet loss and the seasonal swing of the continents could be counted rather than estimated.
:::

## Where this leads

The water cycle is where the energy balance ([[earth-system/energy-balance]]) and the carbon cycle ([[earth-system/carbon-cycle]]) meet: evapotranspiration moves more energy than the atmosphere transports as heat, and it also controls how much of the land's photosynthesis is water-limited rather than light-limited. The individual components are developed in [[hydrology/precipitation-evaporation]], [[hydrology/soil-water]], [[hydrology/runoff]] and [[hydrology/groundwater-flow]]; the cryospheric reservoirs in [[glaciology/mass-balance]] and [[glaciology/sea-ice]]; the isotopes in [[palaeoclimate/proxies]]; and the human management questions, which are choices about values as much as about water, in [[earth-resources/groundwater-resources]] and [[earth-resources/extraction-impacts]].

::: summary
- The global water balance closes: $P_\text{o} = E_\text{o} - R$ and $P_\ell = E_\ell + R$, with $R \approx 40{,}000\ \mathrm{km^3\,yr^{-1}}$ and a global mean precipitation of $965\ \mathrm{mm\,yr^{-1}}$.
- The atmosphere holds only $24.9\ \mathrm{mm}$ of precipitable water but turns over every $9.4$ days — $3500$ times faster than the ocean — which is why weather is fast and violent.
- Evapotranspiration returns about four fifths of terrestrial precipitation to the air; the runoff coefficient is set by the aridity ratio $P/E_0$.
- One third of land precipitation is recycled by local evapotranspiration, so removing vegetation dries the air downwind by more than the local effect.
- Progressive rainout leaves $8\%$ of the original vapour at $-25$‰ $\delta^{18}\mathrm{O}$: the isotope record is a running account of how much water has already fallen out.
- Greenland holds $7.4\ \mathrm{m}$ of sea-level equivalent and Antarctica $58\ \mathrm{m}$; floating ice contributes nothing.
- Humanity withdraws $\sim 4{,}000\ \mathrm{km^3\,yr^{-1}}$, $9\%$ of runoff, but consumes it in the wrong places and seasons, and mines groundwater at $10^{3}\ \mathrm{Gt}$ and rising.
:::

## Exercises

::: exercise Global mean precipitation {level=1 check="965"}
Total global precipitation is $492{,}000\ \mathrm{km^3\,yr^{-1}}$. Given the Earth's surface area of $5.10\times10^{8}\ \mathrm{km^2}$, find the global mean precipitation in $\mathrm{mm\,yr^{-1}}$.
::: solution
$492{,}000/5.10\times10^{8} = 9.65\times10^{-4}\ \mathrm{km} = 965\ \mathrm{mm\,yr^{-1}}$.
:::
:::

::: exercise Residence time of a lake {level=1 check="2"}
A lake of volume $20\ \mathrm{km^3}$ receives $10\ \mathrm{km^3\,yr^{-1}}$ from rivers and loses the same to evaporation. What is its residence time in years?
::: solution
$\tau = 20/10 = 2\ \mathrm{yr}$. Note that the flux here is the *sum* of the outflows; if half the inflow left as outflow and half evaporated, $\tau$ would still be $20/10$, but the water-age distribution would differ.
:::
:::

::: exercise Precipitable water {level=1 check="25"}
The atmosphere over a region contains $2.5\times10^{4}\ \mathrm{Gt}$ of water vapour spread over $10^{6}\ \mathrm{km^2}$. Find the precipitable water in mm.
::: solution
$2.5\times10^{4}\ \mathrm{km^3}/10^{6}\ \mathrm{km^2} = 0.025\ \mathrm{km} = 25\ \mathrm{mm}$. If a storm rained out $40\%$ of it, the rainfall would be $10\ \mathrm{mm}$ — a reminder that even a large storm needs repeated replenishment of the air above it.
:::
:::

::: exercise Catchment balance {level=2 check="0.32"}
A catchment of $5{,}000\ \mathrm{km^2}$ receives $700\ \mathrm{mm\,yr^{-1}}$ and discharges $35\ \mathrm{m^3\,s^{-1}}$. Find the runoff coefficient.
::: solution
$Q = 35\times3.156\times10^{7} = 1.10\times10^{9}\ \mathrm{m^3\,yr^{-1}}$, over $5.0\times10^{9}\ \mathrm{m^2}$ gives $221\ \mathrm{mm\,yr^{-1}}$. Then $C = 221/700 = 0.32$, and evapotranspiration is $479\ \mathrm{mm\,yr^{-1}}$.
:::
:::

::: exercise Sea-level equivalent of a glacier {level=2 check="74"}
A mountain ice mass of $30{,}000\ \mathrm{km^3}$ melts completely. By how many millimetres does global mean sea level rise ($A_\text{ocean} = 3.62\times10^{8}\ \mathrm{km^2}$)?
::: solution
$\Delta h = (917/1028)\times3.0\times10^{4}/3.62\times10^{8} = 7.4\times10^{-5}\ \mathrm{km} = 74\ \mathrm{mm}$. For scale, the whole Greenland ice sheet is $7.4\ \mathrm{m}$ — a thousand times this — and the observed rise this century is $3.7$–$4.6\ \mathrm{mm\,yr^{-1}}$.
:::
:::

::: exercise Recycling {level=2}
Over a continent, $600\ \mathrm{mm\,yr^{-1}}$ of precipitation falls and $400\ \mathrm{mm\,yr^{-1}}$ is evaporated, of which one third originated on the same continent. Find the recycling ratio and the net import of water vapour.
::: solution
Recycling ratio $\rho = (400/3)/600 = 0.22$. Vapour import $= 600 - 133 = 467\ \mathrm{mm\,yr^{-1}}$, and runoff $= 600 - 400 = 200\ \mathrm{mm\,yr^{-1}}$, which must equal the net export of water by the atmosphere ($467 - 267$ of vapour leaving with the outflowing air). If the vegetation were removed and evapotranspiration fell by $25\%$, local recycling would fall by $33\ \mathrm{mm\,yr^{-1}}$ and, with a recycling ratio of $0.22$, downwind precipitation would fall by roughly $33/0.22 \approx 150\ \mathrm{mm\,yr^{-1}}$ in the extreme case of no other change — an upper bound, but it shows the leverage.
:::
:::

::: exercise Isotopes and altitude {level=2 check="0.30"}
Using $\delta = \delta_0 + \epsilon\ln f$ with $\epsilon = -10$‰, find the fraction of vapour remaining when $\delta$ has fallen from $-2$‰ to $-14$‰.
::: solution
$\ln f = (-14 + 2)/(-10) = 1.2$, so $f = e^{-1.2} = 0.30$. About $70\%$ of the vapour has rained out — which is why mountain snow, formed from air that has already lost most of its water, is so strongly depleted in $^{18}\mathrm{O}$.
:::
:::

::: exercise Water in the atmosphere {level=3}
The global mean precipitable water is $24.9\ \mathrm{mm}$ and the precipitation efficiency of the climate system can be written $P = \rho\, E_\ell + M_\text{o}$, where $M_\text{o}$ is the oceanic vapour import to land. Using the values of the global water balance, find $M_\text{o}$ and the mean residence time of a water molecule's journey from ocean evaporation to land precipitation.
::: solution
Land precipitation $119\times10^{3}\ \mathrm{km^3\,yr^{-1}}$, of which $1/3$ is recycled land evapotranspiration ($40\times10^{3}$), so the ocean supplies $M_\text{o} = 79\times10^{3}\ \mathrm{km^3\,yr^{-1}}$. The atmospheric reservoir is $12.7\times10^{3}\ \mathrm{km^3}$, so the mean time between evaporation and precipitation is $12.7/492 = 0.026\ \mathrm{yr} = 9.4\ \mathrm{d}$ regardless of destination; but a molecule that will fall on land must, on average, be evaporated, transported and rained out several times before it is "used", which is what the recycling ratio expresses.
:::
:::

::: exercise A warming cycle {level=3}
Specific humidity rises by $7\%$ per $^\circ\mathrm{C}$ of surface warming. If precipitation increases by $2\%\ \mathrm{K^{-1}}$ globally, by what factor does the atmospheric moisture *flux* convergence over land have to change, and what does that imply for the intensity of the heaviest rain days?
::: solution
Precipitation over land is balanced by the convergence of moisture flux. If the column moisture rises by $7\%\ \mathrm{K^{-1}}$ but precipitation only by $2\%\ \mathrm{K^{-1}}$, the circulation (the wind-driven part of the flux) must weaken by about $5\%\ \mathrm{K^{-1}}$ — the "slowdown" of the tropical circulation. The heaviest daily rainfalls, however, scale more closely with the moisture available in the hours around a storm than with the annual mean, so they increase by closer to $5$–$7\%\ \mathrm{K^{-1}}$ (IPCC AR6, 2021, Chapter 11, assesses *high confidence* in an increase in extreme precipitation). The apparent contradiction — a wetter world with a slower mean circulation and more intense storms — is one of the most useful results in the chapter.
:::
:::

::: exercise Virtual water and food policy {level=3}
A country of $80$ million people imports $8\ \mathrm{Mt}$ of wheat and $1\ \mathrm{Mt}$ of beef. Using water footprints of $1.3\ \mathrm{m^3}$ of water per kg of wheat and $15\ \mathrm{m^3}$ per kg of beef, and a national water withdrawal of $80\ \mathrm{km^3\,yr^{-1}}$, find the virtual water imported and its share of national withdrawal.
::: solution
Wheat: $8\times10^{9}\ \mathrm{kg}\times1.3 = 1.04\times10^{10}\ \mathrm{m^3} = 10.4\ \mathrm{km^3}$.
Beef: $1\times10^{9}\ \mathrm{kg}\times15 = 1.5\times10^{10}\ \mathrm{m^3} = 15\ \mathrm{km^3}$.
Total $25\ \mathrm{km^3}$, which is $31\%$ of the national withdrawal of $80\ \mathrm{km^3}$.

Two lessons. First, the trade in a small mass of animal products can embody a large share of a nation's water. Second, the arithmetic is only as good as the water footprints, which vary by a factor of several with rainfall, irrigation efficiency and whether green water (which the crop would have transpired anyway) is counted — so treat such numbers as orders of magnitude, and say so.
:::
:::
