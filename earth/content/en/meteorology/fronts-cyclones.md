Before 1917 no forecaster could tell you what a depression was. They could plot one, since the telegraph made the simultaneous observation of many places possible, and they had names for its parts, but the standard account of the 1880s — that a cyclone was a "family" of smaller cyclones travelling together, in the phrase of the Liverpool meteorologist Hugh Abercromby, who had in fact done the finest observational work of the century on the clouds that precede one — was not a theory. What produced the modern picture was the First World War: Norway, cut off from the international exchange of observations by the conflict, built a dense network of telegraphic surface stations to warn its fishermen, and Vilhelm Bjerknes, Jacob Bjerknes, Tor Bergeron and Halvor Solberg at Bergen read the resulting sequence of hourly charts the way a geologist reads a cliff. Within three years they had the air mass, the polar front, the wave, the warm sector and the occlusion, and the vocabulary of every weather forecast since.

::: definition Air masses and their modification {#def-air-masses}
An **air mass** is a body of air whose temperature and moisture are set by the surface over which it has lain long enough to come to equilibrium — a day or two per thousand kilometres of travel. The classical classification takes two letters, a lowercase one for the source's moisture (c continental, m maritime, and in practice Arctic) and a capital one for its temperature: **cA** Arctic, $-25\ ^\circ\mathrm{C}$ and a dew point near $-30$; **cP** polar continental, dry and cold; **mP** polar maritime, cool and moist, the air of the westerlies over the oceans; **cT** tropical continental, the hot dry air of the Sahara and the Arabian desert at $40\ ^\circ\mathrm{C}$ and a dew point of $10$; **mT** tropical maritime, warm and moist, with a dew point of $22$–$25$; and **mE** equatorial, hot, moist and unstable. A **fifth** class matters in winter, the modified Arctic air that has crossed a warm western boundary current and become the coldest, most turbulent and most snow-producing air mass on the planet.

An air mass is modified from the moment it leaves its source, and the modification is the whole of the weather of a cold or warm outbreak. Cold air over a warm sea is heated from below, becomes unstable, and organises into rolls and cells: the **snow belts** of Lake Erie, the "Canadian cold wave" of the Great Lakes, the sea snows of the Baltic and the Sea of Japan, where a city at the latitude of Madrid receives five metres of snow because a dry continental air mass has crossed $100\ \mathrm{km}$ of water at $10\ ^\circ\mathrm{C}$. Warm air over a cold sea is the opposite: heated from above, cooled from below, stabilised into stratus and drizzle, with the cloud base lowering until it closes the Grand Banks to shipping in July.
:::

::: example Lake-effect snow {#ex-lake-snow}
Arctic air with a $700\ \mathrm{hPa}$ temperature of $-22\ ^\circ\mathrm{C}$ and a surface dew point of $-25\ ^\circ\mathrm{C}$ crosses Lake Erie, whose surface is $4\ ^\circ\mathrm{C}$, over a fetch of $130\ \mathrm{km}$ at $20\ \mathrm{m\,s^{-1}}$. Find the time available for modification, the height of the convective layer that can be moistened to saturation, and the rainfall rate implied by a moisture flux convergence of $2\times10^{-3}\ \mathrm{kg\,m^{-1}\,s^{-1}}$ into a $50\ \mathrm{km}$-wide band.
::: solution
The transit time is $1.3\times10^5/20 = 6500\ \mathrm{s}$, under two hours — enough, because the instability grows fast. With a $700\ \mathrm{hPa}$ temperature of $-22\ ^\circ\mathrm{C}$ the dry adiabat from the lake surface reaches $0\ ^\circ\mathrm{C}$ at the surface and the mixed layer grows to $2$–$3\ \mathrm{km}$; the saturation mixing ratio at $-25\ ^\circ\mathrm{C}$ is $0.35\ \mathrm{g\,kg^{-1}}$ and at $-2\ ^\circ\mathrm{C}$, $3.5\ \mathrm{g\,kg^{-1}}$, so a $2\ \mathrm{km}$ layer of air can absorb roughly
$$
\rho\,\Delta z\,\Delta w = 1.2\times2000\times3.2\times10^{-3} = 7.7\ \mathrm{kg\,m^{-2}}
$$
of water from the lake. Over $130\ \mathrm{km}$ at $20\ \mathrm{m\,s^{-1}}$ this requires a latent heat flux of $7.7/6500 = 1.2\times10^{-3}\ \mathrm{kg\,m^{-2}\,s^{-1}}$, which at $2.5\ \mathrm{MJ\,kg^{-1}}$ is $3000\ \mathrm{W\,m^{-2}}$? The arithmetic gives $3.0\times10^{3}$; the observed values over ice-free water in a cold outbreak are $300$–$600\ \mathrm{W\,m^{-2}}$, so the estimate is an order of magnitude too large and the difference is the lesson: the mixed layer does not reach saturation over the whole $2\ \mathrm{km}$, the lake gives up its heat partly as sensible flux, and the snow band itself rains out part of the moisture before the far shore.

The precipitation into the band is the moisture flux convergence: $2\times10^{-3}\ \mathrm{kg\,m^{-1}\,s^{-1}}$ spread over $50\ \mathrm{km}$ of width gives $4\times10^{-8}\ \mathrm{kg\,m^{-2}\,s^{-1}}$, or $0.14\ \mathrm{mm\,h^{-1}}$ of water equivalent. That is a drizzle in temperate terms, and at $-10\ ^\circ\mathrm{C}$ with a snow-to-liquid ratio of forty to one it is $5.6\ \mathrm{cm}$ of snow an hour — which is the reason a single band two kilometres wide can drop a metre on Buffalo in a day and leave the land either side nearly white.
:::
:::

## Fronts

::: proposition The frontal zone and its slope {#prop-front}
A **front** is a transition zone between two air masses, typically $10$–$50\ \mathrm{km}$ wide horizontally, $1$–$3\ \mathrm{km}$ deep, and **sloping** at one in fifty to one in two hundred, with the cold air beneath the warm. The slope is not a choice but a consequence of the balance between the two: geostrophy requires the wind to change with height across the temperature contrast (the thermal wind), and hydrostatics requires the density contrast to be in balance with the along-front pressure gradient. The result is that the front can only slope, and the **Margules relation** gives the slope of the frontal surface,
$$
\tan\alpha = \frac{f\,\overline{T}}{g}\,\frac{\Delta V}{\Delta T},
$$
where $\Delta V$ and $\Delta T$ are the jumps in the geostrophic wind and temperature measured across the front in the vertical. For $\Delta V = 10\ \mathrm{m\,s^{-1}}$ and $\Delta T = 5\ \mathrm{K}$ across a kilometre-deep front at $50^\circ$ the slope is $1:175$, and for the sharper contrasts of a live baroclinic zone, $1:80$ — the observed one in a hundred. The frontal surface is close to a surface of constant potential temperature — the isentropes are steeply tilted inside it — and the zone is **marginally critical**: frictional processes within it tend to reduce the contrast to exactly the value at which the front becomes unstable again, which is why fronts are observed at a slope near the minimum that the thermal wind will tolerate.
:::

::: example The slope and the width {#ex-slope}
A front separates air at $275\ \mathrm{K}$ from air at $285\ \mathrm{K}$ across a horizontal distance of $40\ \mathrm{km}$ at $50^\circ$ latitude. Find the thermal wind across it, and, if the front slopes at $1:100$, find the height of the warm air above the surface front and the horizontal distance between the surface front and the front at $3\ \mathrm{km}$.
::: solution
The thermal wind shear is
$$
\frac{\partial V_g}{\partial z} = \frac{g\,\Delta T}{f\,\overline{T}\,\Delta y} = \frac{9.81\times10}{1.0\times10^{-4}\times280\times4\times10^4} = 8.8\times10^{-3}\ \mathrm{s^{-1}},
$$
so the geostrophic wind increases by $9\ \mathrm{m\,s^{-1}}$ per kilometre of height across the zone: a $25\ \mathrm{m\,s^{-1}}$ low-level jet becomes a $50\ \mathrm{m\,s^{-1}}$ flow at $3\ \mathrm{km}$, which is the reason the wind strengthens and veers so sharply as a warm front approaches.

At a slope of $1:100$ the frontal surface rises $1\ \mathrm{m}$ per $100\ \mathrm{m}$ horizontally, so at $3\ \mathrm{km}$ height it lies $300\ \mathrm{km}$ behind the surface front. This is why the cloud and rain of a warm front begin $500\ \mathrm{km}$ ahead of the surface analysis: the air ascending the frontal surface is at $6$–$8\ \mathrm{km}$ height when the surface front is still $400\ \mathrm{km}$ away, and the cirrus you see on a bright morning is the leading edge of a system whose rain begins at dusk and whose front arrives at three in the morning.
:::
:::

::: svg
caption: The Norwegian model of a mid-latitude cyclone, drawn as the Bergen school drew it: the surface map above, the vertical section below. A stationary polar front is disturbed by an upper disturbance; a kink appears, the pressure falls at the crest, and the circulation turns the kink into a wave. Warm air is lifted over the retreating cold air ahead of the wave to give the warm front and its wide shield of cloud and rain, and the cold air undercuts the warm air behind it to give the narrow, showery cold front. As the cyclone matures the faster-moving cold front overtakes the warm front, the warm sector is lifted clear of the ground, and the system occludes. The section below is drawn along the line A-B above and shows the two frontal surfaces, the warm sector, and the ascending warm air whose condensation makes most of the rain.
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Norwegian cyclone model">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .warm { stroke: var(--series-2); stroke-width: 2.2; fill: none; }
    .cold { stroke: var(--series-3); stroke-width: 2.2; fill: none; }
    .iso { stroke: var(--rule); stroke-width: 1; }
    .rain { fill: var(--info-wash); }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <path class="iso" d="M120,60 C200,40 300,44 360,70 C420,96 500,96 560,72"/>
  <path class="iso" d="M110,96 C200,74 300,80 360,106 C420,132 510,130 570,106"/>
  <path class="warm" d="M360,106 C440,110 520,104 600,96"/>
  <path class="cold" d="M360,106 C330,140 300,168 270,196"/>
  <circle cx="360" cy="106" r="5" fill="currentColor"/>
  <text class="sub" x="600" y="92">warm front</text>
  <text class="sub" x="230" y="200">cold front</text>
  <text class="sub" x="372" y="140">warm sector</text>
  <text class="sub" x="120" y="52">isobars, 5 hPa apart</text>
  <line class="ax" x1="60" y1="240" x2="700" y2="240"/>
  <path class="warm" d="M60,240 L700,150"/>
  <path class="cold" d="M60,236 L300,236 L470,214 L700,206"/>
  <path class="rain" d="M300,236 L470,214 L700,206 L700,150 L470,180 Z" opacity="0.5"/>
  <text class="lab" x="70" y="232">cold air</text>
  <text class="lab" x="560" y="232">cold air aloft</text>
  <text class="lab" x="420" y="258">warm sector</text>
  <text class="sub" x="60" y="270">section A-B: the warm air rides up the frontal surface at 1 in 100</text>
  <text class="sub" x="470" y="146">the cloud shield and rain of the warm front</text>
  <text class="sub" x="60" y="286">surface front  A                    B  front at 3 km height, 300 km behind</text>
</svg>
:::

::: definition The life cycle, and the conveyor belts {#def-lifecycle}
The **Norwegian model** has four stages. A **wave** forms on a pre-existing front, with the pressure falling at the crest; in the **mature** stage the cyclone has a warm sector between a cold front and a warm front, a closed circulation, and a pressure $20$–$30\ \mathrm{hPa}$ below its environment; in the **occlusion** the cold front, moving with the low-level flow at $40$–$60\ \mathrm{km\,h^{-1}}$, overtakes the warm front, and the warm sector is lifted off the ground, giving a **cold-type** or **warm-type occlusion** according to which of the two air masses behind the cold front is the colder; in the **decay** the temperature contrast is used up, the system becomes a ring of cloud around a cold centre, and it merges with the upper trough. A depression deepening by more than $24\ \mathrm{hPa}$ in twenty-four hours at $60^\circ$ is called a **bomb**, and the Atlantic and the Pacific each produce some forty a year.

The **conveyor-belt model** of Harrold and Browning, from 1971–73, replaced the picture of air masses sliding past one another with three streams. The **warm conveyor** is the moist airstream that enters the cyclone's warm sector, ascends spirally over the warm front, and produces most of the rain and the whole of the warm-front cloud shield; it exits at the tropopause as the upper-level flow. The **cold conveyor** enters low on the cold side, passes beneath the warm air, and curves cyclonically around the low, producing the steady stratiform rain of the cold sector. The **dry intrusion** descends from the upper troposphere in a fold of high potential vorticity, is the dry slot seen on satellite imagery as a clear wedge, and evaporates the cloud and rain in its path. Where the three meet, near the surface low, the descent of the dry intrusion can reach the boundary layer and produce a **sting jet**: a localized downdraught wind of $40$–$50\ \mathrm{m\,s^{-1}}$ in a swath tens of kilometres wide, named from the hook-shaped cloud head that resembles a scorpion's tail, and responsible for the worst winds of the 1993 Burns' Day storm and the 1987 storm that felled fifteen million trees in southern England.
:::

::: example Reading the passage of a cyclone {#ex-passage}
A station records, over thirty hours: a pressure fall from $1014$ to $986\ \mathrm{hPa}$; a wind backing from east to northeast then veering to south-southwest and later to west; a cloud sequence of cirrus, cirrostratus to a halo, altostratus with the Sun blurred, nimbostratus and continuous rain; a rise in temperature from $6$ to $12\ ^\circ\mathrm{C}$; two hours of clearing and a broken cloud; then a line of cumulonimbus with a squall, a shower and a further $8\ \mathrm{hPa}$ fall in three hours; and a steady rise to $1006$ with the wind west and the air dry. Interpret.
::: solution
This is a textbook passage of a mature wave cyclone. The high cirrus with a halo is the leading edge of the warm-front shield, $600\ \mathrm{km}$ ahead; the lowering and thickening of the cloud and the onset of continuous rain mark the base of the ascending warm conveyor; the pressure fall of $28\ \mathrm{hPa}$ in thirty hours is a moderately deepening depression. The temperature rise of $6\ \mathrm{K}$ and the veering to southerly mark the passage of the warm-front surface analysis and entry into the warm sector; the clearing is the warm sector's own subsiding, moist but cloudy air, and the brief improvement is the calm before the cold front.

The line of cumulonimbus, the squall and the sharp pressure change are the cold front — in its narrow form, a **squall line** ahead of the surface front, since the front slopes backward with height and the ascending air is some distance ahead of the surface discontinuity. The subsequent drying and the westly wind with a pressure rise are the post-frontal air mass, which is polar maritime and unstable, so the clearing is followed by cumulus and showers. The one feature that would change the reading is a **secondary** pressure fall and re-veering after the cold front, which would indicate an occlusion or a second wave, and the one that would make it dangerous is a wind maximum in the dry-slot region ahead of the cold front, which is the sting jet and the reason the worst British storms do their damage before the front arrives.
:::
:::

::: example The anticyclone and its inversion {#ex-anticyclone}
In a winter anticyclone over a continent the surface temperature is $-6\ ^\circ\mathrm{C}$, the air at $400\ \mathrm{m}$ is $+2\ ^\circ\mathrm{C}$ and at $2\ \mathrm{km}$, $-2\ ^\circ\mathrm{C}$, and the wind in the free air above is $12\ \mathrm{m\,s^{-1}}$. Describe the layer, and estimate the temperature of the air at the surface if the nocturnal radiative cooling of $60\ \mathrm{W\,m^{-2}}$ continues for eight hours with no turbulent exchange above the inversion.
::: solution
The layer is a **radiation inversion**: $8\ \mathrm{K}$ of warming across the lowest $400\ \mathrm{m}$, capped by a near-adiabatic layer above. The inversion forms because the surface loses longwave radiation to a clear sky and to air with a low dew point, because the snow cover raises the surface emissivity and lowers the net radiation, and because the geostrophic wind of $12\ \mathrm{m\,s^{-1}}$ aloft is decoupled from the surface by the stable layer, so that the mechanical turbulence that would mix the inversion away is absent. Below the inversion the wind is often calm and the air is the coldest of the season.

Cooling the lowest $200\ \mathrm{m}$ at $60\ \mathrm{W\,m^{-2}}$ for $8\ \mathrm{h}$ removes $1.7\times10^6\ \mathrm{J\,m^{-2}}$ from a layer of heat capacity $1.2\times1005\times200 = 2.4\times10^5\ \mathrm{J\,m^{-2}\,K^{-1}}$, giving a temperature fall of $7\ \mathrm{K}$, so the surface air reaches $-13\ ^\circ\mathrm{C}$ while the air $400\ \mathrm{m}$ above is unchanged. This is the arithmetic of the frost hollow, the valley bottom and the airport that closes at dawn; and it is why the temperature of a sheltered valley in a clear anticyclone can be $15\ \mathrm{K}$ below that of the ridge above it, why the orchards are on the slopes and the fog in the town below, and why the first frost of autumn and the last of spring are both valley phenomena.

The pollution is the same physics: the ventilation rate of a stable boundary layer $200\ \mathrm{m}$ deep with a $1\ \mathrm{m\,s^{-1}}$ wind is a fifth of that of a convective layer $1500\ \mathrm{m}$ deep with $5\ \mathrm{m\,s^{-1}}$, a factor of forty, and it is why the episodes of London in December 1952, of the Ruhr in the 1960s, and of Delhi and Lahore every November follow this exact profile of wind, inversion and source.
:::
:::

::: widget plot
f: 1013-d*exp(-((x-24)/10)^2)
x: 0, 48
y: 960, 1020
sliders: d=24:5:45
labels: pressure (hPa)
caption: The pressure trace of a station as a cyclone passes, with the depth of the low set by the slider. The shape is nearly gaussian because the pressure field of a mature cyclone is close to a circular low with an exponential radial decay, and the width of the trace tells you the size of the system: a ten-hour half-width at a translation speed of $50\ \mathrm{km\,h^{-1}}$ means a radius of about $500\ \mathrm{km}$. The rate of fall matters more to the forecaster than the minimum: a fall of $12\ \mathrm{hPa}$ in six hours marks a deepening low and a strengthening wind, and $24\ \mathrm{hPa}$ in twenty-four hours at $60^\circ$ is the definition of a bomb. The asymmetry of the real trace — a slower fall before and a sharper rise after — is the difference between the broad warm-frontal circulation and the narrow cold front, and a trace that rises as fast as it falls usually means the low passed directly overhead.
:::

::: warning The map is not the atmosphere
The Norwegian model is a template, and it is wrong more often than it is right in its details. Satellite imagery of the past fifty years has shown that many cyclones never occlude in the classical way, that a large fraction of the cyclones of the western ocean basins develop as "ship tracks" with no surface front at all, that the fronts of the model are often not the boundaries between two air masses but the zones where the ascent has happened, and that the sequence of clouds at a station can be produced by an entirely different system from the one the analysis shows. What survives is more useful than what does not: the idea that the cyclone is a device for transporting warm air poleward and cold air equatorward, that its wind and rain are organised by three or four coherent airstreams rather than by the pressure field alone, and that the temperature contrast is its fuel and its death. A forecaster who treats the model as a law will misread a third of cases; one who does not know it cannot read any of them.
:::

::: quiz
A station lies ahead of an approaching cyclone. The cloud lowers from cirrus to altostratus, continuous rain begins, the pressure falls steadily, and the wind veers from easterly to southerly. The station is:
- [ ] In the cold sector behind the cold front
- [x] Being overridden by the warm front, in the warm-frontal precipitation shield
- [ ] In the warm sector
- [ ] Under the centre of the low
::: solution
The sequence — high cloud lowering and thickening, steady rain, veering and strengthening wind, a steady pressure fall — is the passage of the warm-front cloud shield and of the ascending warm conveyor above the frontal surface. The station is still in cold air at the surface; the warm sector arrives later, with a clearing, a further veering to southwesterly and a steadier pressure.
:::
:::

::: history
Hugh Abercromby, a barrister who made the first statistical study of the clouds preceding British rain and found that they came in a definite order, published his findings in 1888 and had no explanation for them; the Bergen school supplied one within thirty years and the order turned out to be the warm-front cloud shield. Vilhelm Bjerknes had proposed in 1904 that forecasting was a problem in integration and had failed at it; his son Jacob, with Bergeron and Solberg, took the other route and described the cyclone as a structure. Their 1919 paper on the polar-front theory appeared in the Geofysiske Publikasjoner while Europe was still rationing paper, and within a decade it was the working basis of every service from Berlin to Tokyo. The model's first great test came in the "Blitz" forecasts of the Second World War, in which the Norwegian and British forecasters who had built it out-predicted everyone else in the lead-up to the Normandy landings, and the delay of D-Day by four weeks is the most consequential weather forecast in history. The conveyor-belt picture came from Theodore Harrold at the Central Forecasting Office in 1973 and from Peter Browning's numerical work, and the sting jet from John Buckles's 1971 analysis of a hook-shaped cloud head, confirmed by aircraft in 1981 and finally observed in situ by dropsonde during the 2015 storm Desmond. The word "bomb" entered the literature in 1977 from the American meteorologists Marukawa and Sanders, and the cyclones of the southern ocean, unobserved until the satellite and now measured by scatterometer, are the most intense on the planet.
:::

## Where this leads

The dynamics that make the wave grow are in [[atmospheric-dynamics/vorticity]] and [[atmospheric-dynamics/general-circulation]]; the cold front as a density current and the squall line are in [[meteorology/storms]]; the anticyclone, the block and the North Atlantic Oscillation are in [[climate-system/variability]]; the flow over mountains and lee cyclogenesis are in [[atmospheric-dynamics/boundary-layer]]; and the storminess of the past and the future is in [[climate-change/extremes]].

::: summary Key takeaways
- An air mass takes its character from its source region in a day or two per thousand kilometres, and its modification on the way is most of the weather.
- A front is a sloping density discontinuity one part in a hundred, whose slope is required by the thermal wind balance and whose width is set by the same physics.
- The Norwegian model's wave, warm sector, cold front and occlusion is a template, not a law, and the conveyor belts of Harrold and Browning are the modern version.
- The warm conveyor makes most of the rain; the dry intrusion makes the dry slot and, where it reaches the ground, the sting jet.
- A pressure fall of 24 hPa in 24 hours at 60 degrees is a bomb cyclone, and the rate of fall matters more than the minimum.
- Cold air over a warm sea gives snow belts and sea smoke; warm air over a cold sea gives stratus, drizzle and fog.
:::

## Exercises

::: exercise Modification time {level=1 check="12"}
Air moves at $12\ \mathrm{m\,s^{-1}}$ across a continent. How many hours does it take to travel $500\ \mathrm{km}$?
::: solution
$5\times10^5/12 = 4.2\times10^4\ \mathrm{s} = 11.6\ \mathrm{h}$. (Enter to the nearest hour: $12$.) Air crossing a continent is modified in a day, which is why the interior of a continent in winter is drier than its coast at the same latitude.
:::
:::

::: exercise Frontal slope {level=1 check="450"}
A front slopes at $1:150$. At what horizontal distance from the surface front is the frontal surface at $3\ \mathrm{km}$ height, in km?
::: solution
$150\times3 = 450\ \mathrm{km}$. (Enter to the nearest unit: $450$.)
:::
:::

::: exercise Thermal wind across a front {level=1 check="8.6"}
Across a frontal zone the temperature changes by $8\ \mathrm{K}$ over $300\ \mathrm{km}$ at $55^\circ$. Find the thermal wind shear, in $\mathrm{m\,s^{-1}}$ per kilometre.
::: solution
$$
\frac{\partial V_g}{\partial z} = \frac{g\,\Delta T}{f\,\overline{T}\,\Delta y} = \frac{9.81\times8}{1.11\times10^{-4}\times275\times3\times10^{5}} = 8.6\times10^{-3}\ \mathrm{s^{-1}},
$$
that is $8.6\ \mathrm{m\,s^{-1}}$ per kilometre, which is the observed value across a live baroclinic zone. Note that $\Delta y$ must be the scale over which the mean temperature changes, not the width of the sharpest surface gradient: using the $30\ \mathrm{km}$ of a surface discontinuity gives ten times the shear and a wind that does not exist, an error made in every student's first frontal calculation.
:::
:::

::: exercise Snow to liquid {level=1 check="5.6"}
A precipitation rate of $0.14\ \mathrm{mm\,h^{-1}}$ of water equivalent falls as snow with a snow-to-liquid ratio of $40$. Find the snowfall rate, in $\mathrm{cm\,h^{-1}}$.
::: solution
$0.14\times40 = 5.6\ \mathrm{cm\,h^{-1}}$.
:::
:::

::: exercise Cyclogenesis {level=2 check="7"}
A depression deepens from $996$ to $968\ \mathrm{hPa}$ in twenty-four hours at $60^\circ\mathrm{N}$. Is it a bomb, and what is the equivalent rate in $\mathrm{hPa}$ per six hours?
::: solution
The fall is $28\ \mathrm{hPa}$ in $24\ \mathrm{h}$, above the $24\ \mathrm{hPa}$ threshold, so yes — and $7\ \mathrm{hPa}$ per six hours. Such a low is normally accompanied by a jet-stream streak and by winds near hurricane force over the sea.
:::
:::

::: exercise Cold-air outbreak {level=2 check="425"}
In a cold outbreak the lake surface is $6\ ^\circ\mathrm{C}$ and the air at $2\ \mathrm{m}$ is $-18\ ^\circ\mathrm{C}$ with a saturated skin layer at $4\ ^\circ\mathrm{C}$. Estimate the latent heat flux, in $\mathrm{W\,m^{-2}}$, taking a transfer coefficient of $2\times10^{-3}$, a wind of $15\ \mathrm{m\,s^{-1}}$ and a density of $1.3\ \mathrm{kg\,m^{-3}}$.
::: solution
The saturation mixing ratios are $5.4$ and $0.95\ \mathrm{g\,kg^{-1}}$, so $\Delta q = 4.4\times10^{-3}$ and
$$
LE = \rho L C_e V\,\Delta q = 1.3\times2.5\times10^6\times2\times10^{-3}\times15\times4.4\times10^{-3} = 430\ \mathrm{W\,m^{-2}}.
$$
Values of $300$–$600\ \mathrm{W\,m^{-2}}$ are observed in cold outbreaks, several times the latent heat flux of a tropical ocean, and they are what powers the rolls and cells of lake-effect snow.
:::
:::

::: exercise The sting jet {level=2 check="1.5"}
A sting jet descends from $700\ \mathrm{hPa}$, where the temperature is $5\ ^\circ\mathrm{C}$, to the surface, and evaporating rain limits the warming so that the descent is moist-adiabatic at $6\ \mathrm{K\,km^{-1}}$. Find the temperature anomaly on arrival, in kelvin, relative to an environment whose lapse rate is $6.5\ \mathrm{K\,km^{-1}}$.
::: solution
The descent of $3\ \mathrm{km}$ warms the parcel by $18\ \mathrm{K}$ while the environment would have warmed by $19.5\ \mathrm{K}$, so the parcel arrives $1.5\ \mathrm{K}$ colder than its surroundings — cold and therefore accelerating downward. The negative buoyancy over $3\ \mathrm{km}$ gives
$$
w^2 = 2\int g\frac{\Delta T}{T}\,\mathrm{d}z = 2\times9.81\times\frac{1.5}{280}\times3000 = 315,
$$
so $w = 18\ \mathrm{m\,s^{-1}}$ of downward momentum, and the descent of air with high absolute momentum to the boundary layer, where it must be conserved, produces the $30$–$40\ \mathrm{m\,s^{-1}}$ surface wind of a sting jet.
:::
:::

::: exercise Deriving the frontal slope {level=3}
Starting from the requirement that pressure and temperature be continuous across an inclined surface of slope $\tan\alpha = \partial z/\partial y$ while the flow is geostrophic on both sides, derive the Margules relation
$$
\tan\alpha = \frac{f\,\overline{T}}{g}\,\frac{\Delta V}{\Delta T},
$$
with $\Delta V$ and $\Delta T$ the jumps measured in the vertical, and evaluate it for $\Delta V = 10\ \mathrm{m\,s^{-1}}$ and $\Delta T = 5\ \mathrm{K}$.
::: solution
The Margules relations follow from requiring that the pressure and the temperature be continuous across an inclined surface while the wind is geostrophic on both sides. The result is
$$
\tan\alpha = \frac{f\,\overline{T}}{g}\frac{\Delta V}{\Delta T},
$$
where $\Delta V$ and $\Delta T$ are the jumps across the front measured vertically. With the numbers,
$$
\tan\alpha = \frac{10^{-4}\times280}{9.81}\times\frac{10}{5} = 2.85\times10^{-3}\times2 = 5.7\times10^{-3},
$$
a slope of $1:175$, close to the observed one in a hundred to one in two hundred. The relation explains why a front cannot be vertical: a vertical front with the same contrasts would require a wind jump of $f\overline{T}\Delta T/(g\tan\alpha)$ tending to infinity, and why the strongest fronts have the largest wind shear — the observed proportionality between the thermal wind and the observed wind change across a front is the direct test of the theory, and it holds to within the accuracy of the observations.
:::
:::

::: exercise The cyclone as a heat engine {level=3}
A mid-latitude cyclone transports $0.4\ \mathrm{Sv}$ ($4\times10^7\ \mathrm{kg\,s^{-1}}$) of sensible plus latent heat poleward across $50^\circ$ with a temperature contrast of $20\ \mathrm{K}$ between the air it carries poleward and that it carries equatorward. Estimate the rate of poleward heat transport and compare it with the $2\times10^{15}\ \mathrm{W}$ required by the global energy balance. What does this say about the role of the cyclones?
::: solution
The transport is roughly $\dot M c_p\Delta T$ for the sensible part: $4\times10^7\times1005\times20 = 8\times10^{11}\ \mathrm{W}$, and adding the latent part at perhaps twice the sensible gives $2\times10^{12}\ \mathrm{W}$ across the $2000\ \mathrm{km}$-wide sector at $50^\circ$ — a flux per unit longitude of $10^6\ \mathrm{W}$ per degree.

The global total from all the eddies of the mid-latitudes is of order $1$–$2\times10^{15}\ \mathrm{W}$, about half the energy that must be moved from the tropics to the poles, with the ocean carrying the other half. The individual cyclone is therefore a rounding error and the population is everything: a mid-latitude ocean basin contains a dozen cyclones at any time, each living a week, and it is the statistics of their birth and death, not the details of any one, that carry the heat. This is why the projected poleward shift and weakening of the storm tracks is a climate question and not a storm question, and why the observed increase in the intensity of the strongest cyclones can be true at the same time as a decrease in their number.
:::
:::
