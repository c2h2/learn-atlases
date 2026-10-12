Air is a thousand times less dense than water and fifty times less viscous, so it can move sand only by blowing at several metres per second, it cannot move silt at all except in a dust storm, and it sorts sediment more finely than any other agent. The result is a set of landforms — dunes — that are the largest and most regular bedforms on the planet, a deposit — loess — that covers a tenth of the land surface and records the Pleistocene's driest climates, and a set of erosional surfaces — ventifacts, yardangs, desert pavements — that are the only landforms whose making was argued about for a century.

## The wind's competence

::: definition The threshold and the two modes {#def-threshold}
A grain on a surface is moved when the aerodynamic drag overcomes its weight and the friction of its neighbours. The threshold is expressed as a **threshold shear velocity** $u_{*th}$, and for a bed of dry, uniform sand in air it is
$$
u_{*th} = \sqrt{\theta_{th}\,R\,g\,d}, \qquad \theta_{th} \approx 0.010\text{–}0.013,
$$
with $R = (\rho_s - \rho_a)/\rho_a \approx 2400$ for quartz in air. The observed curve has a **minimum of about 0.20 m/s at 0.15–0.3 mm** and rises at both ends: toward finer sizes because interparticle cohesion and moisture bind the grains, and toward coarser because the weight grows. Once a grain is moving, the **impact threshold** — the shear velocity needed to keep a saltation cloud going — is only about **60–80 per cent** of the fluid threshold, because a grain in flight that lands on the bed ejects several others. This is why a sand storm begins at a higher wind than it needs to sustain itself, and why gusts that briefly exceed the threshold can start a deflation event that then continues in a weaker wind.
:::

::: definition Saltation, creep and suspension {#def-modes}
**Saltation** is the trajectory of a grain launched by a turbulent burst to a height of 0.1–1 mm and a length of 10–100 mm, its descent under gravity and drag, and its rebound or ejection of further grains on impact; it carries 50–80 per cent of the sand flux and it is the process that makes the ripples. **Surface creep** (reptation, traction) is the rolling and pushing of grains too large to be lifted, driven by the impacts of the saltators, and it carries a comparable mass. **Suspension** carries only the dust — particles finer than about 50 µm — which can be lifted to kilometres of height and transported thousands of kilometres, and it is the process that makes loess. The **Bagnold (Bagnold) saturation flux** for saturated saltation is the self-similar law
$$
Q = C\,\frac{\rho_a\,u_*^3}{g}, \qquad C \approx 2.8,
$$
in $\mathrm{kg\,m^{-1}\,s^{-1}}$, whose **cube law** is the reason that a doubling of the shear velocity raises the sand flux eightfold and that a landscape's aeolian work is done by its few strongest winds.
:::

::: example What wind moves sand? {#ex-threshold}
Find the threshold shear velocity for 0.2-mm sand, the corresponding roughness length and the wind speed at 10 m at which saltation begins, taking $\theta_{th} = 0.012$, $\rho_a = 1.2\ \mathrm{kg\,m^{-3}}$, $\rho_s = 2650\ \mathrm{kg\,m^{-3}}$ and $\kappa = 0.4$.
::: solution
$$
R = \frac{2650 - 1.2}{1.2} = 2207, \qquad
u_{*th} = \sqrt{0.012\times2207\times9.81\times2\times10^{-4}} = \sqrt{0.0520} = 0.23\ \mathrm{m\,s^{-1}} .
$$
For a saltating bed Bagnold's roughness is $z_0 = u_*^2/(3g) = 0.0520/29.4 = 1.8\times10^{-3}\ \mathrm{m}$, and the logarithmic profile $u(z) = (u_*/\kappa)\ln(z/z_0)$ gives
$$
u(0.1\ \mathrm{m}) = \frac{0.23}{0.4}\ln\frac{0.1}{0.0018} = 0.575\times4.02 = 2.3\ \mathrm{m\,s^{-1}},
$$
$$
u(10\ \mathrm{m}) = 0.575\times\ln(5556) = 0.575\times8.62 = 5.0\ \mathrm{m\,s^{-1}} .
$$
Saltation of medium sand therefore begins at about **5 m/s measured at 10 m height** — a fresh breeze of 10 knots — which is why a beach begins to blow within minutes of a sea-breeze front arriving and why an aeolian sandstone records only the strongest winds of its season.

The exercise's second message is the sensitivity to $z_0$. A surface roughened by gravel, vegetation or moisture has a $z_0$ of 0.01–0.1 m, and the same threshold shear velocity then requires a 10-m wind of 8–12 m/s. This is the physical basis of **shelter-belt** and **straw-checker** wind erosion control, and of the fact that a single percent of ground covered by a fence or a shrub can suppress most of a field's sand flux.
:::
:::

::: widget plot
f: 2.8*1.2*x*x*x/9.81
x: 0.2, 1.2
y: 0, 0.60
labels: \text{saltation flux}
caption: The Bagnold saturated saltation flux $Q = 2.8\,\rho_a u_*^3/g$ plotted against the shear velocity. The cube law makes the curve almost vertical above $u_*$ of 0.6 m/s: the flux at 1.0 m/s is **fifteen times** the flux at 0.5 m/s, and the flux below the threshold of 0.23 m/s is exactly zero. The consequence is that an aeolian landscape is shaped by the small fraction of its hours when the wind is well above the threshold, that a change of a few per cent in the wind climate can change the sand flux by tens of per cent, and that the aeolian record in the sediments is a **thresholded, nonlinear** record of the wind rather than a linear one. The formula is a saturation law and it over-predicts the flux on short fetches, over hard or wet beds, and under a vegetation canopy, where the saltation cloud never reaches saturation.
:::

::: history
Aristotle (Aristotle) described wind-blown sand, and Lucretius argued the wind's power in *De rerum natura*, but the modern subject begins with **Ralph Stockman** and with **Grove Karl Gilbert**'s (Gilbert) 1885 monograph on the **Lake Bonneville** dunes and his 1904 paper on sand dunes, which established that dunes migrate by the saltation of grains up the stoss slope and their avalanche down the slip face. **Ralph Bagnold** (Bagnold), working in the Egyptian and Libyan deserts in the 1930s with a camera, a wind tunnel and a physical insight that has never been equalled, produced *The Physics of Blown Sand and Desert Dunes* (Bagnold), which defined the shear-velocity threshold, the saltation trajectory, the saturation flux, the roughness length $z_0 = u_*^2/3g$, and the classification of dune types, and which is one of the founding texts of physical geography. **Bagnold's** contemporaries **Sharpe** and **Sandford** (Sandford) extended the field to the Americas and to North Africa. The **loess** problem — whether the silt was an aeolian deposit, a loessial weathering product, or the wash of a melting ice sheet — was settled in Europe by the petrographic and grain-size work of the German and Russian schools and in America by **Mason** and **Ruhe**'s (Ruhe) Wisconsin transects, and the **Chinese loess** was established as a continuous aeolian sequence by **Willis** (Willis) in 1907 and worked out in detail by the Chinese school of **Liu Dong-sheng** (Liu), **An Zhisheng**, **Kukla** (Kukla) and **Hsu** (Hsu). The **cube law** and the **impact threshold** are Bagnold's and **Owen**'s (Owen) legacy; the modern quantitative subject — the **Shao and Li** (Li) and **Stout and Hunt** (Stout) work on the saltation cloud, **Fryberger and Schenk** (Schenk) on dune type and wind regime, **Tsoar and Parteli** (Parteli) on dune fields and vegetation, and **Thomas, Wiggs, Livingstone and Field** (Livingstone) on the desert as a system — is a late-twentieth-century product. The **relict erg** problem is the result of the **optically stimulated luminescence** dating of the 1990s and 2000s, especially the work of the Oxford and Aberystwyth laboratories on the Sahara, the Namib and the Australian deserts.
:::

## Erosion by wind

::: definition Deflation, abrasion and their products {#def-deflation}
**Deflation** is the removal of the fine fraction from a surface, and its products are a **deflation hollow** (kettle, playa, qur), a **desert pavement** (reg, serir, hamada, gibber desert) — a lag of closely packed pebbles left behind when the fines have gone, which is **self-limiting** because the armour stops further deflation — and a **loess source**. **Abrasion** by saltating and suspended grains is confined to the lowest 0.5–1 m, because saltators cannot rise much higher and the suspended dust polishes rather than cuts; its products are **ventifacts** (faceted, polished and fluted pebbles whose facets record the wind direction), **yardangs** (streamlined ridges of rock, tens of metres high and kilometres long, cut by wind and by the sandblast at their base, and aligned with the formative wind), **zeugen**, **gours** and the **honeycomb and tafoni** weathering of rock surfaces. The **dominance of deflation over abrasion** in most deserts is the conclusion of a century of argument that began with the belief that the wind was a great sculptor: the great rock sculptures of the American Southwest are almost all the product of frost, salt and water, with the wind's sandblast contributing only the polish on the lowest metre.
:::

::: example How fast does a playa deflate? {#ex-deflation}
A dry lake playa of $400\ \mathrm{km^2}$ is the source of a dust plume and is estimated to supply $5\ \mathrm{Tg\,yr^{-1}}$ of dust. Find the lowering rate of the playa floor, and the total deflation over a 10-kyr glacial episode. What limits the answer?
::: solution
At a dry bulk density of $2.6\ \mathrm{g\,cm^{-3}} = 2600\ \mathrm{kg\,m^{-3}}$,
$$
V = \frac{5\times10^{12}\ \mathrm{g\,yr^{-1}}}{2600\ \mathrm{kg\,m^{-3}}} = 1.9\times10^{6}\ \mathrm{m^{3}\,yr^{-1}},
\qquad
\dot z = \frac{1.9\times10^{6}}{4\times10^{8}} = 4.8\times10^{-3}\ \mathrm{m\,yr^{-1}} = 4.8\ \mathrm{mm\,yr^{-1}} .
$$
Over $10\,000$ yr this is **48 m** of deflation — enough to remove a playa's entire Holocene fill and to cut deeply into its substrate.

The number is an upper bound for three reasons. The **dust is not all derived from the playa floor**: some is supplied from the surrounding slopes by sheetwash and gully erosion and merely stored on the playa before being lifted, so the floor lowers more slowly than the mass balance implies. The **deflation is self-limiting**: once a desert pavement of lag pebbles forms, the flux drops by an order of magnitude, and a playa that has been deflating for millennia is armoured and near-steady. And the **flux is episodic**: a single large dust storm may deliver a year's transport, and the annual mean conceals a cycle of deflation, armoring, and re-mobilisation after a wetting episode that binds and then releases the fines.

The lower bound comes from the **playa's stratigraphy**: if the borehole shows 20 m of Holocene lacustrine and aeolian interbedded silt, then the net deflation since the last pluvial lake was less than 20 m, or 2 mm/yr, and the difference between the two numbers is the amount of sediment **supplied** to the playa by its catchment. The two bounds together — the mass-balance rate and the stratigraphic rate — are the best available constraint, and their difference is the playa's sediment budget.
:::
:::

## Dunes and their kinds

::: definition Dune types and their controls {#def-dune-types}
A dune's planform is set by the **sand supply**, the **wind regime** and the **obstacles**. A **barchan** is a crescent with horns pointing downwind, formed on a limited supply, a hard bed and a unimodal wind, and it migrates downwind at 5–100 m/yr with a slip face at the angle of repose. A **barchanoid** dune is a transitional crescent-ridge. A **transverse dune** is a long ridge normal to a unimodal wind and an abundant supply. A **linear** or **seif** dune is a ridge 3–10 m high and up to 100 km long, parallel to the **resultant** of a bimodal wind whose two components both have a component along the ridge. A **star** dune is a pyramidal, multi-armed dune of a multidirectional regime and a sediment trap, and it is the tallest dune type, reaching 500 m in the Badain Jaran. A **reversing** dune has horns pointing upwind, formed where the two wind components are of comparable strength. A **nebka** is a small dune formed in the shelter of a plant, and a **draa** is a superimposed large dune of 50–300 m wavelength carrying smaller dunes on its back. An **erg** (sand sea) is a continuous or near-continuous cover of active dunes, and it occupies about a fifth of the world's deserts; the largest are the Rub' al Khali, the Caraculis and the Badain Jaran.
:::

::: example How fast does a dune walk? {#ex-dune-migration}
A barchan dune field on a hard desert floor has a saltation flux of $0.022\ \mathrm{kg\,m^{-1}\,s^{-1}}$ across its crest, a dune height of 12 m, a sediment density of $2650\ \mathrm{kg\,m^{-3}}$ and a porosity of 0.40. Find the dune's migration rate, and say how long a 3-km-wide erg would take to cross a landscape.
::: solution
The dune advances by the amount of sediment that crosses each metre of its crest per year, divided by the sediment that a metre of its height contains:
$$
c = \frac{Q\,t}{\rho_s(1-\phi)H} = \frac{0.022\times3.15\times10^{7}}{2650\times0.60\times12}
  = \frac{6.9\times10^{5}}{1.91\times10^{4}} = 36\ \mathrm{m\,yr^{-1}} .
$$
A 3-km-wide erg would therefore cross a fixed point in
$$
\frac{3000}{36} = 83\ \mathrm{yr}.
$$
This is fast — a village in the path of an active barchan front is buried within a human lifetime, which is the reality of the Taklamakan, the Namib's coast and the dunes encroaching on Ouadda and on Peruvian coastal towns — and it is why the migration rate is measured by satellite rather than by survey.

The calculation's weakness is that it assumes the **whole** dune advances as a rigid body, which is true of a barchan on a hard floor but not of a star dune or of a draa, whose internal structure is a stack of superimposed accretion units and whose net migration is much slower. It also assumes the flux is the **annual mean**, whereas the flux is dominated by a few storms and the dune advances in jumps. The field test is the **repeat survey or the satellite image**, and the measured rates for the world's barchan fields — 5 to 100 m/yr — bracket the calculation, which is as good as aeolian process geomorphology gets.
:::
:::

## Loess

::: definition Loess {#def-loess}
**Loess** is an aeolian silt accumulation — 50–70 per cent silt of 10–50 µm — that is **unstratified**, **calcareous**, **vertically jointed**, **macroporous** with root and insect burrows, and **non-sorted** in the usual fluvial sense. It is sourced from **glacial outwash plains** (the Pleistocene loess of China, Europe and the midwestern United States, whose silt comes from glacial comminution), from **desert margins** (the Loess Plateau's ultimate source includes the Gobi and the Ordos), and from **playas and dry lake beds**. Its thickness and its median grain size both **decay exponentially downwind**, and its accumulation rate is 0.1–10 mm/yr. The Chinese Loess Plateau covers $6\times10^{5}\ \mathrm{km^2}$ with a thickness of up to 340 m and an age of 8 Myr, and its alternating loess and **palaeosol** layers are the terrestrial record of the Pleistocene glacial cycles, with the loess marking the dry, windy glacial intervals and the red palaeosols the warmer, wetter, vegetated interglacials.
:::

::: example Reading a loess transect {#ex-loess}
Downwind from a glacial outwash plain the loess thickness is 120 m at 40 km, 40 m at 160 km and 13 m at 300 km. Find the decay length, and predict the thickness at 500 km. What does the grain size do?
::: solution
Assuming an exponential decay $h = h_0 e^{-x/L}$, the ratios give
$$
\frac{120}{40} = 3.0 \quad\text{over }120\ \mathrm{km}: \quad L = \frac{120}{\ln 3.0} = \frac{120}{1.10} = 109\ \mathrm{km};
$$
$$
\frac{40}{13} = 3.08 \quad\text{over }140\ \mathrm{km}: \quad L = \frac{140}{1.12} = 125\ \mathrm{km}.
$$
The two agree, so the decay length is about **115 km**, and with $h_0 = 120\,e^{40/115} = 170\ \mathrm{m}$ at the source, the thickness at 500 km is
$$
h = 170\,e^{-500/115} = 170\times0.0130 = 2.2\ \mathrm{m}.
$$
The loess thins to a few metres within 500 km of the source, which is why the loess of the midwestern United States thins from 30 m in Iowa to a few metres in Ohio and disappears before the Appalachians.

The **grain size decays in the same direction but more slowly than the thickness**, because the coarse silt (50–60 µm) is carried in modified saltation and short suspension and drops out first, while the fine silt and clay (2–10 µm) travel in true suspension for thousands of kilometres. The median diameter typically falls from 40–50 µm near the source to 15–20 µm at 500 km, and the **ratio of coarse to fine silt** is used as a **palaeowind and palaeoaridity indicator**, with a coarser ratio meaning a stronger or closer wind. The Chinese Plateau's grain-size stack has therefore been used as a 8-Myr record of the East Asian winter monsoon's strength, and it is one of the longest continuous palaeoclimate records on land.
:::
:::

::: warning Aeolian landforms are older and more relict than they look
Desert landforms are commonly **inheritance from a different climate**, and the assumption that a desert landform was made by the present wind is one of the discipline's persistent errors. The **desert pavements** of the Basin and Range are being slowly exhumed from under a Pliocene or Pleistocene gravely cover rather than being deflated today; the **yardangs** of the Taklamakan and of Egypt are cut in soft sediment and are oriented to Pleistocene winds that are no longer dominant; the **loess** of Europe, China and the American Midwest is a **glacial** deposit that the present climate is only slowly reworking and eroding; and the **active ergs** of the Sahara are, from optically stimulated luminescence ages, largely **relict** features mobilised during the arid episodes of the last glacial period and only locally active now, with most of the Sahara's dunes having been stable for 20–40 kyr. The consequence for interpretation is that an aeolian sandstone's palaeocurrent rose gives the wind direction **at the time of deposition**, which is safe, but that its presence gives the aridity only if the dune was active, which it may not have been — a **relict erg** preserved under a humid cover is a common stratigraphic object and it records a dry past, not a dry present. The discipline is to date the aeolian sediment — by OSL on the quartz, by the age of the palaeosols between the sand bodies, or by the cosmogenic nuclide content of the buried surface — before assigning it to a climate.
:::

::: quiz
A sand surface has a roughness length of 0.002 m and a shear velocity of 0.25 m/s. Planting a shrub row raises $z_0$ to 0.05 m while the shear velocity stays the same. What happens to the wind speed measured at 2 m?
- [ ] It is unchanged, because $u_*$ is unchanged.
- [ ] It rises, because the same shear stress is carried by a steeper velocity gradient near a rougher surface.
- [x] It falls, because a rougher surface gives a flatter velocity profile, so the same $u_*$ corresponds to a lower wind speed near the ground.
- [ ] It cannot be predicted from the two numbers.
::: solution
$u(z) = (u_*/\kappa)\ln(z/z_0)$, so with $z_0$ larger the logarithm is *smaller* and the wind speed at a given height is **lower**, not higher: $\ln(2/0.002) = 6.9$ against $\ln(2/0.05) = 3.7$, a 46 per cent reduction. The correct answer is therefore that the measured wind speed falls — which is exactly why shelter belts work. The trap is the sign: a rougher surface means a *flatter* profile, so the same $u_*$ corresponds to a *lower* wind speed near the ground, and the surface therefore feels less shear than the same wind would produce over a smooth surface.
:::
:::

## Where this leads

The grain sizes the wind sorts are in [[sedimentology/sediment-grains]], the bedforms it makes are in [[sedimentology/bedforms]], the dune deposits in the rock record are in [[sedimentology/continental-environments]], the dust that fertilises the ocean is in [[biogeochemistry/ocean-cycles]] and [[atmospheric-chemistry/aerosols]], the glacial source of the loess is in [[geomorphology/glacial-landscapes]] and [[glaciology/mass-balance]], and the palaeoclimate it records is in [[palaeoclimate/dating]] and [[palaeoclimate/abrupt-change]].

::: summary
- Air moves sand only above a threshold shear velocity of about 0.20–0.25 m/s, which corresponds to a 10-m wind of about 5 m/s over a bare sand surface.
- The impact threshold is below the fluid threshold, so a saltation cloud is easier to sustain than to start.
- The sand flux goes as the cube of the shear velocity, so an aeolian landscape is built by its few strongest winds.
- Wind erodes mainly by deflation, not abrasion, and its pavements are self-limiting armours.
- Dune planform records the sand supply and the wind regime, and an active barchan migrates tens of metres a year.
- Loess thickness and grain size decay downwind, and the loess–palaeosol stack is a terrestrial record of the glacial cycles.
- Most desert landforms are relict, and they must be dated before they are assigned to the present climate.
:::

## Exercises

::: exercise Threshold {level=1 check="0.36"}
Find the threshold shear velocity for 0.5-mm sand with $\theta_{th} = 0.012$ and $R = 2200$.
::: solution
$u_{*th} = \sqrt{0.012\times2200\times9.81\times5\times10^{-4}} = \sqrt{0.1295} = 0.36\ \mathrm{m\,s^{-1}}$. Coarser sand needs a higher shear velocity, but the observed curve is flatter than the square-root law because the threshold $\theta$ falls with size.
:::
:::

::: exercise Cube law {level=1 check="8"}
By what factor does the Bagnold saltation flux rise when the shear velocity doubles above the threshold?
::: solution
By $2^3 = 8$. The cube law is the reason that a 20 per cent strengthening of the wind raises the sand flux by 73 per cent, and that the aeolian record is a record of extremes.
:::
:::

::: exercise Dune type {level=1}
A dune field has ridges 5 m high and 20 km long, trending parallel to the resultant of two winds 40° apart. Name the type.
::: solution
**Linear (seif) dunes.** Their long axes lie parallel to the resultant of a bimodal wind regime, they form where the sand supply is moderate and the two wind components both have a component along the ridge, and they are the commonest dune type on Earth, forming the great sand seas of the Sahara, Arabia and Australia.
:::
:::

::: exercise Wind speed at height {level=2 check="6.9"}
With a shear velocity of 0.40 m/s and a roughness length of 0.01 m, find the wind speed at 10 m.
::: solution
$u(10) = (0.40/0.4)\ln(10/0.01) = 1.0\times\ln 1000 = 6.9\ \mathrm{m\,s^{-1}}$. A rougher surface (larger $z_0$) gives a higher wind speed for the same shear velocity, which is why the same $u_*$ over a gravel desert corresponds to a much stronger measured wind than over a smooth sand flat.
:::
:::

::: exercise Loess grain size {level=2}
A loess transect gives a median diameter of 42 µm at 30 km, 26 µm at 150 km and 18 µm at 400 km from the source. Fit a decay and say what it implies about the transport mechanism.
::: solution
Fitting $d = d_0 e^{-x/L}$: from 30 to 150 km, $L = 120/\ln(42/26) = 120/0.476 = 252\ \mathrm{km}$; from 150 to 400 km, $L = 250/\ln(26/18) = 250/0.371 = 674\ \mathrm{km}$. The decay length **triples** with distance, so the grain size does not decay exponentially.

The reading is that two mechanisms are present. The coarse silt is carried in **short suspension and modified saltation** and drops out within the first 100–200 km, giving the steep initial decay; beyond that the sediment is the **fine silt and clay in true suspension**, whose settling velocity is so small that the decay is very slow and is controlled more by the deposition velocity and the turbulence than by the settling. The break in the curve at about 150 km is therefore the **transition from sorting-dominated to deposition-dominated transport**, and it is the reason that a loess grain-size ratio is a good palaeowind indicator only near the source and becomes a rainfall or vegetation indicator further away.
:::
:::

::: exercise Resultant drift {level=2}
A site has winds capable of moving sand from 030° for 40 per cent of the hours and from 210° for 60 per cent, with the drift potential proportional to the hours. Find the resultant drift direction and say what dune type it predicts.
::: solution
Resolving with north as $+y$ and east as $+x$, the 030° component (blowing **toward** 210°) has $x = 0.4\sin 210^\circ = -0.20$, $y = 0.4\cos 210^\circ = -0.346$, and the 210° component (blowing toward 030°) has $x = 0.6\sin 30^\circ = +0.30$, $y = 0.6\cos 30^\circ = +0.520$. The resultant is $x = +0.10$, $y = +0.174$, of magnitude $0.20$ and direction
$$
\mathrm{RDD} = \arctan\frac{0.10}{0.174} = 30^\circ .
$$
The **resultant drift strength** is $0.20/(0.4+0.6) = 0.20$, a low value because the two winds largely cancel. A bimodal regime with a strong resultant and a moderate variability gives **linear (seif) dunes** trending at 030–210°; a still lower resultant would give **star dunes**, and a resultant near unity would give **barchans or transverse dunes**. This is the Fryberger–Schenk method, and it is the standard way to read a palaeowind regime from a dune field's planform.
:::
:::

::: exercise A dune field's budget {level=3}
An erg 60 km long along the wind has a mean thickness of 15 m, a porosity of 0.35, an incoming sand flux of $0.030\ \mathrm{kg\,m^{-1}\,s^{-1}}$ and an outgoing flux of $0.024\ \mathrm{kg\,m^{-1}\,s^{-1}}$. Find the annual accumulation per unit width, the time over which the erg would be built up at this rate, and what the imbalance means for the erg's future.
::: solution
The net retention is $0.030 - 0.024 = 0.006\ \mathrm{kg\,m^{-1}\,s^{-1}} = 1.9\times10^{5}\ \mathrm{kg\,m^{-1}\,yr^{-1}}$. The erg's sediment store per unit width is
$$
60\,000\times15\times2650\times0.65 = 1.55\times10^{9}\ \mathrm{kg\,m^{-1}},
$$
so at the present imbalance the erg would be built in
$$
\frac{1.55\times10^{9}}{1.9\times10^{5}} = 8100\ \mathrm{yr}.
$$
Eight thousand years is a plausible Holocene age for an active erg, so the present imbalance is **of the right order to have built the erg**, and the erg is a **transient, growing** body rather than a steady-state one.

The implication for its future is that the erg is **starved at its outlet**: the sand is being trapped, the dunes are thickening rather than migrating, and the field will continue to grow until the wind regime changes, until the supply from the upwind source is exhausted, or until the erg's own surface roughens enough to reduce the incoming flux. The alternative reading — that the erg is a **relict** of a wetter and windier episode and is now slowly deflating — would require the flux measurements to be unrepresentative, which is likely if they were made in one season. The test is a **repeat of the flux measurement over several years** and an **OSL age** on the erg's base and top: a young base and a young top with a growing thickness mean an active erg, and an old base with a young deflation surface on top mean a relict one being destroyed.
:::
:::

::: exercise A dust storm and the ocean {level=3}
A Saharan dust outbreak deposits $2.5\ \mathrm{g\,m^{-2}}$ of dust over $4\times10^{6}\ \mathrm{km^2}$ of the North Atlantic in two weeks. Find the total mass, and the iron input, taking the dust's iron content as 3.5 per cent and 1 per cent of it as bioavailable. Compare with the atmospheric iron input needed to support a carbon drawdown of $0.1\ \mathrm{Gt\,C\,yr^{-1}}$ (assume an Fe:C ratio of $10^{-5}$ mol/mol).
::: solution
The mass is
$$
2.5\ \mathrm{g\,m^{-2}}\times4\times10^{12}\ \mathrm{m^2} = 1.0\times10^{13}\ \mathrm{g} = 10\ \mathrm{Tg}
$$
of dust in two weeks. The bioavailable iron is
$$
10\times10^{12}\times0.035\times0.01 = 3.5\times10^{9}\ \mathrm{g} = 3.5\ \mathrm{Gg\ Fe} = 6.3\times10^{7}\ \mathrm{mol\ Fe}.
$$
At an Fe:C ratio of $10^{-5}$ mol/mol this iron could support a carbon fixation of
$$
\frac{6.3\times10^{7}}{10^{-5}} = 6.3\times10^{12}\ \mathrm{mol\ C} = 7.6\times10^{13}\ \mathrm{g} = 0.076\ \mathrm{Gt\ C}.
$$
The required input for $0.1\ \mathrm{Gt\,C\,yr^{-1}}$ at the same ratio is $10^{-5}\times8.3\times10^{12} = 8.3\times10^{7}\ \mathrm{mol\ Fe\,yr^{-1}} = 4.7\ \mathrm{Gg\ Fe\,yr^{-1}}$, so **a single two-week dust storm delivers about three-quarters of a year's worth** of the iron needed for that drawdown.

The arithmetic is right and the conclusion is not, for three reasons. Only a fraction of the dust is deposited in the **sunlit surface layer** where the iron can be used, and much of it sinks below the euphotic zone. The **solubility** of the iron depends on the dust's mineralogy, on the acidity of the atmosphere — anthropogenic sulphate and nitrate greatly increase solubility — and on the biology of the receiving water. And the **nutrient limitation** must be real: the iron only helps where iron is the limiting nutrient, which is the high-nitrate low-chlorophyll regions — the Southern Ocean, the subarctic Pacific, the equatorial Pacific — and not the iron-replete North Atlantic subtropical gyre where most Saharan dust actually falls. The **IronEx, SOIREE, SOFeX, EIFES and LOHAFEX** experiments gave carbon responses an order of magnitude smaller than the simple ratio predicts, and the iron-fertilisation hypothesis remains unproven at the ocean-basin scale.
:::
:::
