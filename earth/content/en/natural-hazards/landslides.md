On the night of 9 October 1963 a wall of rock 2 km long and up to 600 m high slid down the left flank of the Vajont valley in the Italian Dolomites at some 20–30 m s⁻¹, into the reservoir of the tallest dam then in the world. The slide did not breach the dam — the concrete held, an engineering miracle — but it displaced a seiche that overtopped the dam by some 250 m and sent a pulse of perhaps $50$–$70\times 10^{6}\ \mathrm{m^{3}}$ of water over the spillway crest and down into the Piave valley, through the town of Longarone, killing about 2,000 of its 5,000 inhabitants. The slide had been predicted: the valley had moved in 1934, the reservoir had been filling since 1957, the church had been evacuated twice on creep cracks, and a geotechnical team including **Karl Terzaghi** (who inspected in 1961 and wrote that the mountain "will slide" and that the project should be abandoned) had said so in writing. Vajont is the founding case of landslide risk science in exactly the way Armero is of volcanic risk: the physics was understood, the warning was structurally captured between an operator's incentives and a public works ministry's commitments, and the mountain kept its appointment. Roughly 4,000–5,000 people die of landslides every year in the global record — and that number is thought to be a large underestimate, because landslide deaths are routinely charged to the earthquake, the volcano or the rainstorm that triggered them.

## The mechanics: why slopes hold, and the two ways they go

::: definition The infinite slope and the factor of safety {#def-infinite-slope}
Take a soil mantle of thickness $z$ on a slope of angle $\beta$, and consider failure on a plane parallel to the surface — a good model for shallow slides, which are most landslides and most of the deadly ones. Balancing the downslope weight against Coulomb shear strength $\tau = c' + \sigma'_n \tan\phi'$ (effective cohesion and friction angle, with $\sigma'_n$ the effective normal stress — Terzaghi's principle that soil strength is carried grain-to-grain and water pressure subtracts) gives the **factor of safety**

$$
FS = \frac{c' + (\gamma_s - m\gamma_w)\,g\, z\cos^{2}\beta\,\tan\phi'}{\gamma_s\, g z \sin\beta\cos\beta},
$$

with $m$ the fraction of the soil column saturated up to the water table. $FS<1$ means the driving stress exceeds the strength the plane can mobilise, and the slope moves. Two lessons are written in the algebra. First, **cohesionless dry sand is safe at any depth and any height but only up to its friction angle**: with $c'=0$ the depth cancels and $FS = \tan\phi'/\tan\beta$, so a 25° slope of dry sand with $\phi' = 30°$ holds at any scale, and a cut steepened past the angle of repose fails at any scale — height is irrelevant, angle is everything. Second, **water enters twice**: it subtracts from normal stress through $m\gamma_w$ and it usually rises with rain faster than it drains, so the same slope that stood dry at $FS = 1.74$ sits at $FS = 1.31$ half-saturated and near $FS = 0.94$ at 70 % saturation and a slightly steeper hill. This is why rainfall thresholds work, why "the slope has stood for a thousand years" is not an argument, and why slides follow rain with lags of hours (pore-pressure rise in coarse soil) to years (deep drainage in clay).
:::

::: definition Types of movement, and the words that matter {#def-slide-types}
The classification in use (Cruden & Varnes, 1996) sorts landslides by **form of movement** — fall, topple, slide (rotational or translational), spread, flow, creep — and by **material** — rock or debris/earth. **Rockslides and rock avalanches** (Vajont 1963, Oso 2014, the 1970 Huascarán ice-rock-debris avalanche) are volumes of $10^{6}$–$10^{9}\ \mathrm{m^{3}}$ moving at 1–50 m s⁻¹, with runouts far longer than friction should allow (the "long-runout problem", explained by acoustic, thermal or pore-fluid fluidisation, and quantified by the mobility ratio H/L of 0.05–0.1 for the most mobile). **Translational slides** ride clay seams or wetting surfaces in soil and weathered rock — the shallow, rapid, deadly class of Hong Kong, Norway and the Italian Alps. **Rotational slumps** carve spoon-shaped scars and dominate coastal cliffs (the Undercliffs of the Isle of Wight, Holderness, the Nice motorway A8) and over-consolidated clays. **Debris flows** are concentrated slurries of coarser-than-sand grains in water, 20–45 % solids by volume by density and 40–60 % by concentration, moving 1–15 m s⁻¹ in channels, self-destructing on valley floors as runout deposits — the process that burrows into the public imagination through the Montecito (California, 2018) and Ischia (2022) events, and the reason burn scars are evacuated before the first rain. **Earthflows** are slower (centimetres to metres per year), and **solifluction** and **creep** are slower still, but their cumulative cost — 15 billion € a year in Europe alone, mostly to roads, railways and foundations — exceeds the dramatic slides' by an order of magnitude. The vocabulary of risk then distinguishes, as it must ([[natural-hazards/risk]]): **susceptibility** (where, given slope, lithology, structure and land cover, movement is possible), **hazard** (the probability that a movement of a given type and size hits a place in a period), and **risk** (hazard × vulnerability × the value or life exposed). A susceptibility map is not a hazard map, and most of the world's published "landslide maps" are susceptibility maps read as if they were hazard maps.
:::

::: example The mountain that was inspected {#ex-vajont}
The Vajont slide volume was about $260\times 10^{6}\ \mathrm{m^{3}}$ of limestone (density ~2,500 kg m⁻³) descending ~700 m of relief at an estimated 20–30 m s⁻¹. Compute its kinetic energy at 25 m s⁻¹ in kilotons of TNT ($1\ \mathrm{kt} = 4.184\times 10^{12}$ J) and compare with the Hiroshima bomb (15 kt). Then: the slide entered 50–70 million m³ of its own volume into the impulsive displacement of the reservoir; the dam crest stood 70 m above the water. Why did the wave clear the dam, and what does the survival of the dam have to do with the failure of the institutions?
::: solution
Mass $=2.6\times10^{8}\times2500 = 6.5\times10^{11}$ kg (the slide was thinner than its footprint; the standard estimate is ~6.5×10¹¹ kg); $E = \tfrac12 m v^{2} = 0.5\times6.5\times10^{11}\times625 = 2.0\times10^{14}$ J $= 48$ kt — of the order of three Hiroshimas, and with the full 260 million m³ figure often quoted, up to ~190 kt. The wave cleared the dam because the incoming slide displaced water *upward on impact* — the run-up on the opposite valley wall reached 250 m above the reservoir, far above the 70 m freeboard — and the overtopping discharge then scoured the right abutment and the town below. The dam's survival is the case's cruelty: the structure was sound, the *land* was the failing element, and the 1960–63 geological advice (Terzaghi's "the mountain will slide into the reservoir and the resulting waves will cause the death of the people living downstream", in slightly paraphrased English) was received, filed and overridden. Landslide risk is a governance technology before it is a mechanics one.
:::
:::

## Triggers: rain, earthquakes, ice, and the cut slope

::: definition Triggering and the rainfall threshold {#def-triggers}
Almost every slope near failure needs a push, and the pushes are measurable. **Rainfall** dominates: shallow slides respond to intense rain through positive pore pressure in the unsaturated zone within hours, and to seasonal groundwater rise over weeks. The operational tool is the **intensity–duration (I–D) threshold**: for each duration $D$, the rainfall intensity $I$ above which landslides become likely, fitted regionally from inventories and rain gauges. The national threshold for Central Italy, for example, is $E = 75.64 + 1.45\, d^{1.11}$, with $E$ the event rainfall in the 24 hours before a slide (mm) and $d$ the antecedent 3-day rainfall (mm) — 76 mm if the ground is dry, 187 mm if 50 mm fell in the previous three days, 316 mm after 100 mm — a quantitative statement of "the rain that matters is the rain you already had". Thresholds vary from ~20–30 mm d⁻¹ in the damp, frosted Alps to several hundred mm d⁻¹ in the seasonally dry tropics, and the global literature (Caine's 1980 global curve and its regional descendants) is the working backbone of early-warning in Italy (the PROGEMIS and regional systems), Norway, Brazil and Hong Kong (the Geotechnical Engineering Office's rainfall–landslide warning, in operation since 1977 after the Castle Peak road slide killed 67). **Earthquakes** trigger slides by inertial loading and liquefaction: the empirical threshold is a peak ground acceleration of ~0.1–0.2 g on slopes steeper than ~10–15° (Keefer's and Keefer & Wilson's global relations), and the Newmark sliding-block model converts an earthquake's acceleration record into a permanent displacement given a yield acceleration $a_y = (FS-1)g$ — the same factor of safety, now read as the acceleration that brings the slope to limit equilibrium. The 2015 Gorkha (Nepal) earthquake triggered ~40,000 mapped landslides, the 2008 Wenchuan earthquake ~60,000–200,000, and the co-seismic of the 1783 Calabria earthquake the first documented. **Ice-sheet retreat and deglaciation** overstep and debutress slopes (the huge post-glacial rock avalanches of the Alps — the Flims rockslide of about 954 CE, the largest historical Alpine event at some 12 km³, read from its valley-fill deposit and the Lake Constance chronicles), and permafrost degradation is opening alpine rock slopes that held through the Holocene (the Bondi and Cengia rockslides of the Italian Alps, the documented Swiss and Italian early-warning programmes for deglaciating ridges such as the Bondi and Cengia rockslide districts). **Volcanic unloading and hydrothermal alteration** make edifice flanks the weakest slopes on Earth ([[natural-hazards/volcanic-hazards]]), and **people** are a trigger in their own right: cut slopes, ponded irrigation, dewatering, and the mining tips of which Aberfan 1966 — 111,000 m³ of water-saturated colliery spoil flowing 1 km onto Pantglas Junior School at 07:15, killing 116 children and 28 adults — remains the emblem, and the reason the UK now maintains statutory tip safety inspection.
:::

::: example Reading the threshold {#ex-threshold}
A town's warning system uses the Central-Italy threshold $E = 75.64 + 1.45 d^{1.11}$. The forecast gives 60 mm in the last 3 days and a further 150 mm in the next 24 hours. Does the system trigger? By what factor would the forecast have to exceed 150 mm to trigger if the antecedent rainfall were zero? And why is a threshold of this kind *not* a hazard map — name the three things it cannot see?
::: solution
$d=60$: $E = 75.64+1.45\times60^{1.11} = 75.64+1.45\times101.6 = 223$ mm; the forecast 150 mm does **not** trigger. With $d=0$ the threshold is 75.6 mm, so 150 mm exceeds it by a factor 1.99 — the system triggers on the same rain if the ground was dry. The three blind spots: the threshold is **statistical** (it separates triggering from non-triggering *events* in a region, not this slope), **spatially blind** (it says nothing about which of 10,000 slopes will go — that is the susceptibility map's job), and **material-blind** (the same number is used for dolomite and for pyroclastic cover, which is why modern systems couple thresholds to susceptibility and to soil-water models that actually integrate infiltration, like the Hong Kong pore-pressure model).
:::
:::

::: example The 3-km runout {#ex-oso}
On 22 March 2014 the hillside above the Stillaguamish River near Oso, Washington — a glacial sequence of weak till, saturated by an unusually wet winter — failed as a rotational slide and transformed into a debris avalanche of ~8 million m³ that crossed the valley, ran ~3 km up the opposite hillside, destroyed a neighbourhood of 49 homes and killed 43 people, the deadliest single landslide in US history. Take the source elevation 300 m above the runout surface and a travel distance of 3 km. Compute the mobility H/L, and given that the deposit covered ~2 km² at a mean runup, estimate the mean deposit thickness. What made this slope fail at a modest H/L — the same question the 1983, 2006 and 2012 episodes at the same hill had asked in smaller letters?
::: solution
H/L $=300/3000 = 0.10$ — at the mobile end for a slide of this size, consistent with a debris-avalanche transformation. Mean thickness $=8\times10^{6}/(2\times10^{6}) = 4$ m. The cause was a double drainage–strength story: the toe was being eroded by the river (the county had rip-rapped the bank for decades), the unit was glacial till with interbedded sand and silt charged to near saturation by the wettest winter on record, and the failure surface rode a pre-existing paleo-slide surface — the hill is a **relict landslide complex**, and every reactivation reworks it. The 2014 disaster's policy products — the Stillaguamish County buyout of the runout zone, the USGS national landslide-hazard framework of 2018, and Washington's first statewide mapping grant — are the case's argument that even "unprecedented" slopes usually are not.
:::
:::

::: widget plot
f: 75.64+1.45*exp(1.11*ln(x))
x: 1, 300
y: 0, 400
labels: \mathrm{event\ rainfall\ E\ (mm)}
caption: The national rainfall threshold for landslides in Central Italy: event rainfall in 24 hours against antecedent rainfall over the preceding 3 days. A day's rain of 100 mm triggers only if the ground already holds ~17 mm of antecedent rain; 300 mm of antecedent rain raises the trigger to ~390 mm. Read the curve as the state of the ground made visible — the same storm is a disaster after a wet spring and a non-event after a dry August, and the warning system's whole job is to know which August it is.
:::

## The slow hazards: subsidence, sinkholes, and liquefaction

::: definition Ground failure without a slope {#def-slow-ground-failure}
**Land subsidence** is the settling of the surface when the underground carries less than it did. The arithmetic is one-dimensional consolidation: extracting groundwater lowers the pore pressure by $\Delta u = \gamma_w \Delta h$, the effective stress rises by the same amount, and a compressible clay layer of thickness $H_c$ and coefficient of volume compressibility $m_v$ thins by $m_v\,\Delta u\, H_c$. A 10 m drawdown in a basin with 50 m of soft clay at $m_v = 10^{-4}\ \mathrm{kPa^{-1}}$ gives ~0.5 m — and the numbers of the real basins are this number multiplied by decades: the San Joaquin Valley has sunk 8.5 m since 1925, Jakarta's northern coast 2.5–4 m with local rates of 10–20 cm a year, Bangkok, Tianjin, New Orleans, the Venice lagoon, the Mexico City airport (which sank 1.2 m between 1943 and 1962 and forced its runways' redesign). Subsidence is the hazard that cannot be evacuated because it is the ground the evacuation walks on, and its mitigation — managed aquifer recharge, artificial recharge, bans on pumping — is the least glamorous and highest-payoff line in the field. **Sinkholes** are the karst and the piping version: dissolution of salt, gypsum or limestone enlarges a cavity until the roof spans too far and drops (the well-documented 2014 Winter Park, Florida sinkhole that swallowed a house; the 2010 Guatemala City sinkhole, ~15 m across and up to 90 m deep, scoured by storm water piping through volcanic ash during Tropical Storm Agatha), or groundwater pumping drops the water table that was holding up a sand roof (the Dead Sea's 6,000-plus sinkholes, appearing at 100–400 a year as the lake falls ~1 m a year and the fresh water table drains the exposed salt). **Liquefaction** is the strength failure of loose saturated sand: cyclic loading (earthquake waves, wave run-up, blast) drives pore pressure up until effective stress — and with it shear strength — vanishes, and the ground behaves as a dense fluid for tens of seconds: buildings tilt rather than break (the 1964 Niigata towers), manholes jack up, pipelines bend, lateral spreads move whole suburbs toward rivers (1964 Niigata, 1971 San Fernando, 2011 Christchurch's eastern suburbs where ~50 % of houses carried land-damage flags, 2018 Palu where the Petobo neighbourhood flowed 2 km in minutes killing ~2,000). The engineering check is the **factor of safety against liquefaction**, $FS = \mathrm{CRR}/\mathrm{CSR}$, the cyclic resistance the soil can take (from SPT, CPT or shear-wave velocity) over the cyclic stress ratio the earthquake demands, $\mathrm{CSR} = 0.65\,(\sigma_{v0}/\sigma'_{v0})\,r_d\,(a_{max}/g)$ — the 1971 Seed–Idriss procedure, taught in every geotechnical course and written into every seismic code.
:::

::: example Christchurch, the repeat player {#ex-christchurch}
In the 22 February 2011 M6.2 Christchurch earthquake, the saturated sand and silt of the eastern suburbs — deposited by the Heathcote and Avon rivers, perched barely a metre above the water table — liquefied over ~200 km² of the city. Roughly 47,000 dwellings were damaged and ~9,000 demolished, most not by shaking but by ground deformation: differential settlement, lateral spreading toward the streams, and the ejecta that buried lawns in sand. The land was later zoned red — the largest peacetime land-annulation programme in the developed world, ~780 ha and ~8,000 properties. Estimate the average settlement implied if 200 km² of 10-m-thick liquefiable deposit densified by 2 % in thickness, and explain why the same suburb liquefied again and again through the 2010–2017 sequence — what property of the ground makes liquefaction a *serial* hazard?
::: solution
Densification of 2 % of 10 m = 0.2 m average settlement, with local differential settlement of tens of centimetres — exactly the damage class (slammed doors, cracked foundations, broken sewers) that made the "land damage" category. The serial behaviour is the killer: liquefaction **does not consume the susceptibility** — the sand re-sediments its water, the water table returns, the sand is as loose and as saturated as before within months, and every one of the thousands of aftershocks above the threshold re-triggers it. The lesson is written into the 2010s codes: liquefaction-prone land is a *land-use* decision (the New Zealand guidance and the NZS 1170.5 hazard factor method), not an event.
:::
:::

::: history
The science of slopes begins with the first great forensic inquiry: the 1957–63 **Vajont** investigations, in which **Karl Terzaghi**'s two visits and his 1961 report ("the mountain will slide into the reservoir") established that reservoir impoundment could reactivate a relict landslide, and in which **Leopold Müller**, the founder of rock mechanics, argued the case of the sliding-surface pore pressures in the public inquiry that followed — the trial of the engineers and officials of 1968–71 being the first time a landslide was litigated as a decision chain rather than an act of God. The 1966 **Aberfan** disaster produced the UK's Tips Act and the first statutory national programme of tip and slope inspection; the 1970 **Huascarán** avalanche (a $10^{8}\ \mathrm{m^{3}}$ ice–rock–debris mass that ran 18 km in under ten minutes and destroyed Ranrahirca, with the total death toll of the earthquake and its ground failures at 70,000–80,000) made earthquake-triggered avalanches a planning problem for the Andes and the Himalaya. The quantitative tools are mid-century and later: **Terzaghi**'s effective stress (1925), **Casagrande**'s soil classification and the triaxial test, **Alec Skempton**'s residual strength of clays (1964) — the discovery that clays can hold at their peak once and never again, which explained why ancient slides re-mobilise at strengths far below the laboratory peak; **Newmark**'s sliding-block method (1965) for earthquake displacements; **Seed and Idriss**' liquefaction procedure (1971); **Caine**'s global rainfall threshold (1980); the **Cruden and Varnes** classification (1996); the Hong Kong Geotechnical Engineering Office's landslide warning system (1977) and its 1990s cut-slope masterplan, which has made the city's 260 million m³ of engineered slopes among the safest slopes on Earth; **InSAR** monitoring from the 1990s onward, which turned slow landslides from mapped relics into measured, velocity-mapped, forecastable processes; and the post-2010 global landslide inventories and the 2022 InGlobal dataset, which finally showed the field's oldest suspicion — that the mapped world is a small minority of the moving one.
:::

::: quiz
A hillside of dry, cohesionless sand of any thickness will first fail when:
- [ ] the slope exceeds 45° at any height.
- [x] the slope exceeds the sand's angle of internal friction, whatever its height.
- [ ] the slope height exceeds twice its critical depth.
- [ ] pore pressure exceeds zero.
::: solution
With $c'=0$ the depth cancels out of the infinite-slope equation and $FS = \tan\phi'/\tan\beta$: failure depends on angle alone, which is why "it has never slid" says nothing about a slope at the friction angle and why drainage, not height, is the lever for the rest.
:::
:::

::: summary
- Landslide deaths are in the thousands every year and systematically undercounted, because the trigger — rain, earthquake, volcanic edifice failure — gets the credit.
- The infinite-slope equation reduces the whole of shallow-slide mechanics to angle, water and the two strength parameters: dry cohesionless soil fails by angle alone, and water multiplies the failure probability by subtracting from effective stress.
- Rainfall thresholds (intensity–duration, antecedent-moisture-corrected) are the working backbone of warning; they are statistical, spatially blind and material-blind, and are only defensible coupled to susceptibility maps and soil-water models.
- The deadly tail is the rare large volume: rock and debris avalanches with H/L of 0.05–0.1 run kilometres and defeat "safe distance" intuition; Vajont, Huascarán and Oso are the calibration events.
- Slow ground failure — subsidence from pumping, sinkholes from dissolution and piping, liquefaction from shaking — costs more than the dramatic slides and moves too slowly (or too suddenly) for the emergency system to see.
- Landslide risk reduction is mostly not prediction of the next slide but the boring machinery: drainage, code-compliant cut slopes, tip and reservoir regulation, land-use annulation after events (Christchurch, Oso), and warning systems that translate rain into action.
:::

## Exercises

::: exercise {level=1 check="1.59"}
A cut in dry cohesionless sand has friction angle $\phi' = 30°$. Compute the factor of safety of a 20° slope. (Two decimals.)
::: solution
$FS = \tan30°/\tan20° = 0.577/0.364 = 1.59$. Depth, height and area do not appear: the angle is the whole design.
:::
:::

::: exercise {level=1 check="6.7"}
A debris flow leaves its channelling zone at 10 m s⁻¹ and the first houses lie 4 km down the valley floor. How many minutes do they have? (One decimal.)
::: solution
$4000/10 = 400$ s $= 6.7$ min — less time than a phone tree takes to ring, which is why debris-flow warning in the Alpine and Californian systems is automated at the source (rain gauges, geophones, radar) and broadcast, not telephoned.
:::
:::

::: exercise {level=1 check="187"}
Using the Central-Italy threshold $E = 75.64 + 1.45 d^{1.11}$, find the 24-hour event rainfall that triggers with 50 mm of 3-day antecedent rain. Give the value in mm to the nearest mm.
::: solution
$E = 75.64 + 1.45\times50^{1.11} = 75.64 + 111.5 = 187$ mm.
:::
:::

::: exercise {level=2 check="0.94"}
A soil mantle with $\gamma_s = 20\ \mathrm{kN\,m^{-3}}$ (use $g=9.81$), $\phi' = 25°$, $c'=0$, on a 18° slope becomes 70 % saturated ($m=0.7$). Compute the factor of safety. (Two decimals.)
::: solution
$FS = \frac{(20-0.7\times9.81)\cos^{2}18°\tan25°}{20\sin18°\cos18°} = \frac{13.13\times0.9045\times0.466}{5.876} = 0.94$ — the slope fails, and the same slope at $m=0.5$ sat at 1.31: the slide is not caused by the rain that falls, but by the water that was already there.
:::
:::

::: exercise {level=2 check="2.9"}
A slope has static factor of safety 1.3. Using Newmark's sliding-block idealisation, what horizontal yield acceleration $a_y = (FS-1)g$ brings it to limit equilibrium? Give $a_y$ in m s⁻² to one decimal.
::: solution
$a_y = 0.3\times9.81 = 2.9\ \mathrm{m\,s^{-2}} \approx 0.3g$ — the slope survives the 0.1–0.2 g of most regional earthquakes but not the near-field pulse of the large one directly beneath it, which is how the Wenchuan and Gorkha inventories look the way they do.
:::
:::

::: exercise {level=2 check="0.31"}
A sand at 5 m depth carries total vertical stress 100 kPa and effective vertical stress 55 kPa. An earthquake with $a_{max}=0.25g$ applies cyclic loading ($r_d = 0.95$). Compute the cyclic stress ratio $\mathrm{CSR} = 0.65(\sigma_{v0}/\sigma'_{v0})r_d(a_{max}/g)$. (Two decimals.)
::: solution
$\mathrm{CSR} = 0.65\times1.818\times0.95\times0.25 = 0.28$. Compare with a cyclic resistance ratio of 0.30 for the loose sand: $FS = 0.30/0.28 = 1.07$ — marginal, and the 2011 Christchurch record of the same suburbs, shaken repeatedly at CSR just above resistance, is why "marginal" is coded as "unbuildable without ground improvement".
:::
:::

::: exercise {level=3 check="0.49"}
A basin has 50 m of soft clay with $m_v = 10^{-4}\ \mathrm{kPa^{-1}}$. Pumping lowers the piezometric level by 10 m. Compute the eventual subsidence in metres (two decimals).
::: solution
$\Delta u = 9.81\times10 = 98.1$ kPa; settlement $= m_v\,\Delta u\,H_c = 10^{-4}\times98.1\times50 = 0.49$ m. Primary consolidation takes years to decades after the drawdown, which is why subsidence keeps coming after pumping bans — the Jakarta and San Joaquin curves still bend after their forcing stops.
:::
:::

::: exercise {level=3 check="48"}
The Vajont slide mass of $6.5\times10^{11}$ kg moved at 25 m s⁻¹. Compute its kinetic energy in kilotons of TNT ($1\ \mathrm{kt} = 4.184\times10^{12}$ J), to the nearest kiloton.
::: solution
$E = \tfrac12\times6.5\times10^{11}\times625 = 2.03\times10^{14}$ J $= 48$ kt — three Hiroshimas released in a valley, which is why the wave cleared a 70 m dam and why "how big is the slide" is the only question that matters before "where does it stop".
:::
:::

::: exercise {level=3 check="0.1"}
A rock avalanche descends 600 m of relief and comes to rest 6 km away. Compute its mobility H/L, and using the empirical mobility envelope for large rock avalanches (H/L ≈ 0.1 for volumes above $10^{6}\ \mathrm{m^{3}}$), decide whether a village at 8 km on the same valley axis is inside the defensible runout envelope.
::: solution
H/L $=600/6000 = 0.10$ — exactly the mobility envelope for the mobile class. Since hazard-zone practice draws the 95th-percentile envelope at 1.5–2 times the mean runout for the style, a village at 8 km is inside the defensible envelope (0.1 × 1.5–2 → L up to 9–12 km for this fall height), and the planning answer is the one the Tyrolean and Swiss alpine plans use: the valley floor is a land-use decision, not a reassurance.
:::
:::
