A flood is water where we do not want it, when we do not want it — and the sentence contains the whole discipline, because the "where" and the "when" are decisions made by planners, insurers and engineers long before the rain falls. The river that floods is the river that was channelled, walled, and built over; the city that floods is the city that paved its own sponge; the coast that floods is the coast that lowered its marshes and raised its sea. In July 2021 the Ahr, a small wine-valley river in western Germany that most of its residents had never seen rise more than a metre, left its banks after two-thirds of a month's rain fell in 36 hours, killed some 40 people in the Ahr district and 184 across Germany, destroyed the core of the town of Schuld and damaged most houses along the river, and produced insured losses near €9 billion — from a rainfall event whose return period estimates ranged from decades to half a millennium depending on the gauge, and whose warning, in a country with the best hydrology in Europe, arrived to most victims as a phone call from relatives downstream. The Ahr flood is the case study of everything in this lesson: the physics of flash response, the statistics of the tail, the failure of an automated warning to become an evacuation, and the question — is this climate change? — that the attribution science answers carefully and the public answers loudly.

## The kinds of flood, and their different clocks

::: definition Fluvial, flash, pluvial, coastal, urban {#def-flood-types}
**Fluvial (river) flooding** is the classical one: rainfall or snowmelt over a catchment routes to the channel network, the wave peaks days later downstream, and the flood plain fills. Its clock is days to weeks, it is the most predictable class, and it is the one the great defences are built against — the Rhine, the Mississippi, the Yangtze, the Ganges–Brahmaputra, where more than 150 million floodplain dwellers live within reach of the design flood. **Flash floods** are the same physics with the clock removed: small steep catchments, intense slow-moving storms, saturated or burned soils, and channel response times of minutes to hours — the killer class worldwide, responsible for perhaps half of flood deaths from a small share of flood damage, because they arrive at night with no gauge reading and no warning lead time (the 2015 Le Luc and 2021 Ahr events, the monsoon nullahs of Himachal, the burn-scar debris flows of post-fire California). **Pluvial (surface-water or rain) flooding** happens with the river nowhere near its banks: rainfall exceeds the infiltration and drainage capacity of paved ground, and water moves overland into streets, basements and tunnels — the 2021 Zhengzhou deluge, where a record continental one-hour rainfall of 201.9 mm on 20 July flooded the subway in minutes and killed hundreds in Henan province, is the emblem, and pluvial is now the most *cost-growing* class because it scales with paved area, not with river flow. **Coastal flooding** is sea level plus surge plus tide plus waves: wind stress and low pressure pile the sea up (a 1 hPa pressure deficit adds ~1 cm of sea level; the wind-setup term dominates, metres in a severe storm), and the still water level overtops or overpasses defences (the 1953 North Sea surge of ~3.5 m above predicted tide killed 1,836 people in the Netherlands and ~300 in England; Hurricane Katrina's surge of up to 8.5 m, with 70 % of New Orleans behind levees, killed 1,833 and cost $125 billion in 2005). **Groundwater flooding** — months of wet weather raising the water table into basements — is the slowest and most expensive per property of all, because it arrives over weeks and leaves over months. The five clocks run at different speeds and need different instruments: a river-warning system built for days cannot warn of an hour, and a drainage system built for a year cannot survive a century.
:::

::: definition Design floods, return periods, and the non-stationarity problem {#def-design-flood}
Flood defence is built to a **design flood**: the event of chosen probability that the defence must pass without failure, expressed as an annual exceedance probability (AEP) or its return period $T = 1/\mathrm{AEP}$. Practice runs from 1-in-2 to 1-in-10 years for urban drainage, 1-in-100 to 1-in-1000 for levees and flood walls, and the **probable maximum flood** (PMP — the physically extreme event, not a probability) for spillways and nuclear cooling water. The design value comes from **flood-frequency analysis**: fit a distribution (the Gumbel extreme-value type I is the working default for annual maxima) to the gauge record, and read the quantile $x_T = \mu + \sigma\frac{\sqrt{6}}{\pi}\left(y_T - 0.5772\right)$, with reduced variate $y_T = -\ln(-\ln(1-1/T))$. Three honest caveats belong to every number this produces. First, **extrapolation**: a 100-year flood from a 60-year record is a statistical construction, its confidence interval is wide (a factor of ~1.5 at T = 100 is typical), and the record itself is biased by the gauging of extremes — the largest flood in the record is, on average, *underestimated*. Second, **the return period is not a wait**: a 1-in-100-year flood has a 26 % chance of occurring at least once in the 30-year life of a mortgage, and return periods cluster — 2021 followed 2002, 2010, 2013, 2016 and again 2021 in German memory. Third, and most serious, **stationarity is dead**: the distribution of extremes is a function of land use, river engineering and climate, all of which changed; the 1997 "Millennium Flood" on the Oder was made larger by 1990s drainage and channelisation as much as by the storm, and the professional question is no longer "what is the 100-year flood" but "what is the 100-year flood *of the next 50 years*, and what did we do in the meantime". The EU Floods Directive (2007/60/EC) forces the answer to be revisited on six-year cycles — flood hazard maps, flood risk maps, and management plans — which is why a European flood map is a legal document with an expiry date.
:::

::: example The Ahr, 2021: two clocks {#ex-ahr}
On 14–15 July 2021 the Vb-cyclone "Bernd" parked over the Eifel and dropped 150–200 mm — locally 250–300 mm — on the Ahr catchment (900 km²), whose soils were already near saturation after a wet June. The Ahr at Altenahr rose more than six metres above its normal level in hours, overtopped and destroyed the gauge, and the surveyed peak ran through the boulder-bedded town at several metres per second. Downstream, the automated warning system escalated through the night; a district official cancelled an escalated cell-broadcast warning near midnight, sirens followed late, and in several villages people learned of the flood from neighbours or the water. Reconstruct the physics: with a catchment lag of ~4–6 h and the heaviest rain (≈100 mm in 6 h over the steep middle catchment) ending near midnight, when should the wave have reached Schuld, 20 km downstream? And name the three institutional failures that turned a large flood into 180 deaths.
::: solution
At 2–4 m s⁻¹ peak-wave velocity in a steep, boulder-bed mountain channel, 20 km is crossed in 1.5–3 h: Schuld was struck in the small hours, consistent with the record — the physics gave its hours, and the hours were spent in escalations. The institutional failures: (1) **the measurement-to-warning chain** — the state warning office received the escalated hydrological forecasts but the political authority to order evacuation was distributed across 10 districts with no standing trigger; (2) **the warning-to-action gap** — sirens and radio at midnight without the instruction "leave now, to high ground, on foot"; (3) **the land-use history** — houses rebuilt to the water's edge after the 1804 flood — the valley's great historical event — and a flood-hazard map whose last full revision predated the 2016 Braunsbach event that had already restaged the scenario. The 2022 committee of inquiry of the North Rhine-Westphalia state parliament catalogued failures at almost every link of the warning chain — the case now taught in every European protection-agency course alongside 2021's Zhengzhou.
:::
:::

::: example Frequency analysis at a gauge {#ex-gumbel}
A 60-year record of annual maximum river flows has mean $\mu = 500\ \mathrm{m^{3}\,s^{-1}}$ and standard deviation $\sigma = 150\ \mathrm{m^{3}\,s^{-1}}$. Fit a Gumbel distribution and find the 100-year flood. Then: a climate attribution study suggests future annual maxima will have the same shape but a mean 20 % higher. What return period does the *old* 100-year levee now protect against? (Enter the 100-year flow in m³ s⁻¹, nearest integer, for the first part.)
::: solution
Reduced variate $y_{100} = -\ln(-\ln 0.99) = 4.600$; $x_{100} = 500 + 150\times0.7797\times(4.600-0.5772) = 500 + 470 = 970\ \mathrm{m^{3}\,s^{-1}}$. With $\mu' = 600$: solve $970 = 600 + 116.95(y-0.5772)$ → $y = 3.74$ → $\mathrm{AEP} = 1-\exp(-e^{-3.74}) = 0.0234$, i.e. $T \approx 43$ years. A 20 % shift in the mean — well within the range of observed land-use and climate changes in European catchments — converts a 100-year defence into a 43-year defence without a single drop of "unprecedented" rain; this arithmetic, not the next storm, is what design codes must absorb.
:::
:::

::: widget plot
f: 500+116.95*(-ln(-ln(1-1/x))-0.5772)
x: 2, 200
y: 400, 1200
labels: \mathrm{flood\ flow\ (m^{3}\,s^{-1})}
caption: The Gumbel frequency curve for the gauge of the worked example — annual-maximum flow against return period. Note the shape: the curve is nearly flat between 2 and 10 years and steeply climbing beyond 50, which is why extrapolating a 60-year record to T = 100 or T = 200 is an act of faith with error bars, and why the 20 % mean-shift of the previous exercise moves the 100-year value by more than the whole 2-to-10-year range.
:::

## Defences, and what they do to the river

::: definition Hard defence, soft defence, and the levee effect {#def-defences}
**Hard (structural) defences** hold water out or slow its release: levees and dikes (earth embankments — 1,500 km along the lower Mississippi's " levees" that protect New Orleans and much of the delta's agriculture), flood walls (concrete, urban), channel widening and deepening, detention basins and dams (the 1998 Yangtze's 30,000+ reservoirs took an estimated 20–30 billion m³ of the flood and were credited with saving the Jingjiang plain), movable barriers (the Thames Barrier, 1982–84, closed more than 180 times since; the Netherlands' Maeslantkering, the largest moving structure on Earth), and polders — land won from and defended against the sea, home to most of the Dutch population. **Soft (nature-based) measures** store water where it falls and slow it on its way: riparian and flood-plain reconnection (England's "Making Space for Water" programme after the 2000 and 2007 floods; the Netherlands' €2.3 billion *Room for the River* programme of 2006–2019 — 34 projects including two relocated flood plains, a lowered weir, a raised embankment moved landward, and the controversial plan to relocate the village of Overasselt), riparian woodland, wetland restoration, beaver dams and on-farm storage. The evidence base is honest and humbling: large-scale flood-plain works reduce *frequent* floods reliably, reduce *extremes* less (the big event fills every storage), and pluvial risk is untouched by anything in the river. The **levee effect** (or "safety paradox") is the behavioural half of the theory: defences lower the perceived risk, raise the protected assets, and convert the design-breach event into a catastrophe larger than the undefended flood would have been — New Orleans after Katrina (the ASCE report grading the levee system a "D", more than 50 levee breaches *inside* the protected area), the 1887 Yellow River breach behind the levees, which killed, across the range of the estimates, between a million and two million people, and the Ahr villages behind "flood-adapted" reconstruction. Modern practice therefore speaks of **residual risk** (the defence will be exceeded; plan for it), **freeboard** (build above the design level), **floodable by design** (compartmentalise, deep flood walls, pump-backup, vertical evacuation), and the **flood risk management triangle**: prevention, protection, preparedness — with insurance and land-use regulation as the two instruments that price the paradox.
:::

::: example The economics of the 1-in-100 {#ex-ead}
A town of €5 billion of assets behind levees faces a 1-in-100-year flood with €2 billion of loss, a 1-in-50 with €800 million and a 1-in-10 with €200 million. Compute the current expected annual damage (EAD). A levee raise costing €40 million a year for 25 years would cut the 1-in-100 loss to €200 million and leave the others unchanged; is it worth it on EAD alone, and what two numbers does the EAD calculation hide?
::: solution
$\mathrm{EAD} = 0.01\times2000 + 0.02\times800 + 0.10\times200 = 20+16+20 = €56$ M yr⁻¹. The raise removes €18 M yr⁻¹ of EAD for €40 M yr⁻¹ — a benefit–cost ratio of 0.45, and *not* worth it on EAD alone. The hidden numbers: (1) the **distribution of the residual** — EAD averages over the 1-in-100 that bankrupts the town and the 1-in-10 that annoys it, and risk-averse societies pay above BCR = 1 for tail reduction (the UK's appraisal guidance prices this with a risk premium; the German post-Ahr programme explicitly does); (2) the **induced development** behind the raised levee, which the EAD computed on today's assets will understate by the growth the levee itself causes — the levee effect is an accounting error before it is a disaster.
:::
:::

::: example Flash response: the rational method and its limits {#ex-rational}
A 5 km² suburban catchment (runoff coefficient $C = 0.6$) receives a 1-in-50-year, 1-hour storm of 100 mm h⁻¹. Estimate the peak discharge with the rational formula $Q = CiA$ and compare with what the same storm produces on the pre-urbanisation catchment ($C = 0.25$). Why does the rational method *understate* the danger for a flash-flood warning even when the peak is right?
::: solution
$Q = 0.6\times(100/1000/3600)\times5\times10^{6} = 83\ \mathrm{m^{3}\,s^{-1}}$; pre-urbanisation $83\times0.25/0.6 = 35\ \mathrm{m^{3}\,s^{-1}}$ — urbanisation more than doubles the peak of the same rain, the classic reason pluvial and flash risk grow faster than rainfall statistics. The rational method assumes uniform rain and full catchment contribution at the time of concentration — for a storm cell the size of a flash-flood producer, neither holds: the real hydrograph is a sharper, faster, locally much larger spike, and warning decisions made on smoothed design peaks systematically arrive late.
:::
:::

::: warning "A 100-year flood" and four other sentences that get people killed
**"This is a 100-year flood, so it happens once a century."** It is a 1 % annual chance — 26 % over a 30-year mortgage, 63 % over 100 years — and the phrase, coined by engineers, has become a liability shield and a public misunderstanding; the US FEMA now writes "1%-annual-risk". **"We're behind a levee / outside the mapped flood zone."** Levees protect to their design and fail suddenly, maps lag a decade of construction and one attribution study, and the 2017 Harvey and 2021 Ahr deaths both include many people outside the mapped hazard zones or behind failed defences; the zone is a pricing device, not a promise. **"It has never flooded here."** The gauge record is shorter than the tail (the Ahr's "never" ended at 8 m), and "never" on a burned or urbanised catchment describes the last century's land cover, not this one's. **"The flood was caused by climate change."** The honest sentence is the attribution version: thermodynamics raises extreme-rainfall intensity by ~7 % K⁻¹ (Clausius–Clapeyron; observed in the European data), warming has increased river-flood risk *in some regions and not others* (the 2023 global flood-trend attribution: human influence detected in Asian and European flood trends, not globally), and land use, channel engineering and where we choose to build remain first-order drivers of the *loss* — the IPCC AR6 is explicit that flood damages have grown mostly because we have put more value in the way of the water ([[climate-change/extremes]]). **"Nature-based solutions are safer."** Wetlands and woods attenuate the frequent small-to-medium events and cannot store a design flood; the 2021 Ahr scoured its restored urban reaches along with the unrestored ones — nature-based measures *add* resilience and buy minutes, they do not replace the levee or the warning, and selling them as cheaper protection is how they get built to the wrong design standard.
:::

::: history
Flood management is as old as agriculture — the Yellow River's levees are recorded in Chinese annals more than two millennia ago, and the Nile's basin irrigation read the flood itself as the budget — but the modern discipline is born of disasters and statutes. The **1887 Yellow River breach** and the **1931 Yangtze–Huai–Yellow floods** (the deadliest natural hazard sequence of the twentieth century, with death estimates spanning 145,000 to two million) ended purely-impeding strategies and brought the storage-reservoir and controlled-diversion school (the Yellow River Commission's successor programmes; the Soviet-era Dnieper and later Three Gorges logic). The **1953 North Sea surge** produced the Dutch Delta Committee, the Delta Works (1958–1997) and the British Waverley Committee's line that led, thirty years later, to the Thames Barrier — and the "1-in-10,000-year" safety standard that Dutch law carried until the 1995 Rhine near-miss and the 2007 European flood wave forced the switch to risk-based, multi-layer standards. The statistical machinery is a century old: **G. E. Mulvany's** 1851 rational-formula experiments in Ireland, **W. B. Fuller's** 1914 frequency curves, **L. K. Sherman's** 1932 unit hydrograph, **Robert E. Horton's** 1933 infiltration and runoff laws, the US Soil Conservation Service's 1954 curve-number method, and **Emil Gumbel's** 1954 *Statistics of Extremes*. The policy turn came with the **1993 and 1997 US and German spring floods**, the **1998 Yangtze flood** (some 186 million people affected, direct losses near $30 billion, and the deforestation-and-reservoir debate that produced China's "Returning Farmland to Forest" programme), the **2000 and 2007 UK floods** (the Pitt Review and Making Space for Water), the **EU Floods Directive of 2007** (risk-based mapping, six-year cycles, and the first legal recognition that a defence is a risk-shifter not a risk-remover), and the **2021 Ahr and Zhengzhou floods**, whose joint lesson — that the warning chain, not the hydrograph, is the weakest link — now drives the UN Early Warnings for All initiative of 2022.
:::

::: quiz
A river town's levees are designed for the 1-in-100-year flood. Over a 100-year century, the probability that the levees are overtopped *at least once* (ignoring non-stationarity) is closest to:
- [ ] 1 %.
- [ ] 10 %.
- [x] 63 %.
- [ ] 100 %.
::: solution
$1-(0.99)^{100} = 63\ \%$ — the return period is an annual probability, not a schedule; the design-life question ("will it hold for my mortgage?") is always the exceedance-probability calculation, and it is why codes add freeboard and residual-risk planning on top of the design level.
:::
:::

::: summary
- Floods come in five kinds with five different clocks — fluvial (days), flash (hours), pluvial (minutes), coastal (hours, with a days-long tide–surge calendar), groundwater (months) — and each needs its own observation, model and warning lead time.
- Design floods are statistical constructions: fit an extreme-value distribution to the record, extrapolate with wide confidence bands, and remember the return period is an annual probability (26 % over 30 years for the "1-in-100").
- Stationarity is dead: land use, river engineering and climate all shift the distribution, and a 20 % rise in the mean turns a 100-year defence into a 43-year defence — the design question is the next 50 years, not the last 60.
- Hard defences protect to their standard and fail suddenly; they also *cause* development behind them (the levee effect), so modern practice adds freeboard, floodable-by-design, residual-risk planning and land-use pricing.
- Nature-based measures attenuate frequent events, buy minutes and co-benefit biodiversity, but do not store design floods; the honest portfolio is defence + storage + spatial planning + warning.
- The 2021 Ahr and Zhengzhou disasters were warning-chain failures as much as rainfall events: the UN Early Warnings for All programme encodes the lesson that the last kilometre — from forecast to feet moving — is the hazard's real bottleneck ([[natural-hazards/risk-reduction]]).
:::

## Exercises

::: exercise {level=1 check="26"}
A property sits in the 1-in-100-year flood zone. What is the probability of at least one 1-in-100-class flood during a 30-year mortgage? Give per cent, nearest integer.
::: solution
$1-0.99^{30} = 26\ \%$ — the number every mortgage lender should quote and almost none does.
:::
:::

::: exercise {level=1 check="83"}
Using the rational method with $C=0.6$, $i=100\ \mathrm{mm\,h^{-1}}$ and $A=5\ \mathrm{km^{2}}$, find the peak discharge in m³ s⁻¹ (nearest integer).
::: solution
$Q = CiA = 0.6\times2.78\times10^{-5}\times5\times10^{6} = 83\ \mathrm{m^{3}\,s^{-1}}$.
:::
:::

::: exercise {level=1 check="6.5"}
A coastal town faces a spring high tide of 2.0 m, a storm surge of 3.5 m and wave setup of 1.0 m. What is the design still-water level the dune must exceed, in metres (one decimal)?
::: solution
$2.0+3.5+1.0 = 6.5$ m — the 1953 combination was 2.0 + 3.5 + ~1 m, and the Dutch dikes that failed that night were 1–2 m lower than this sum; freeboard is added on top.
:::
:::

::: exercise {level=2 check="970"}
Annual maxima at a gauge: $\mu = 500$, $\sigma = 150\ \mathrm{m^{3}\,s^{-1}}$. Compute the Gumbel 100-year flood (nearest m³ s⁻¹).
::: solution
$y_{100} = 4.600$; $x_{100} = 500+150\times0.7797\times(4.600-0.5772) = 970\ \mathrm{m^{3}\,s^{-1}}$.
:::
:::

::: exercise {level=2 check="43"}
After the 20 % mean increase of the previous exercise's catchment ($\mu'=600$, same $\sigma$), what return period does the old 970 m³ s⁻¹ levee now provide? Nearest year.
::: solution
$y = (970-600)/116.95+0.5772 = 3.74$; $\mathrm{AEP} = 1-\exp(-e^{-3.74}) = 2.3\ \%$ → $T \approx 43$ years.
:::
:::

::: exercise {level=2 check="16"}
Protected assets of €10 billion face 1-in-100-year flooding. A scheme costing €5 million a year reduces the design event to 1-in-500. Compute the benefit–cost ratio on avoided expected annual damage alone (one decimal).
::: solution
Avoided EAD $=0.01\times10^{10} - 0.002\times10^{10} = €80$ M yr⁻¹; $\mathrm{BCR} = 80/5 = 16$ — a textbook no-argument case, which is why the schemes that *are* built are the ones with visible beneficiaries and the ones that are not are usually the residual-risk and maintenance measures whose benefits are disasters that do not happen.
:::
:::

::: exercise {level=3 check="62"}
Estimate the time of concentration of a 5 km-long overland flow path with 2 % slope using the Kirpich formula $t_c = 0.0195\,L^{0.77}S^{-0.385}$ (minutes; $L$ in metres, $S$ dimensionless). Nearest minute.
::: solution
$t_c = 0.0195\times5000^{0.77}\times0.02^{-0.385} = 0.0195\times703\times4.51 = 62$ min — the reason a 2-hour thunderstorm over this catchment is a flash-flood candidate and a 6-hour storm of the same total is a manageable river wave: duration matters more than depth.
:::
:::

::: exercise {level=3 check="1.79"}
A city doubles its impervious area, and the pre-development catchment coefficient rises from 0.25 to 0.6. Assuming the rational method and the same storms, the 1-in-10-year peak grows by a factor of $0.6/0.25 = 2.4$; if discharge scales with stage as $Q\propto h^{1.5}$ in the wide urban channel, by what factor does the flood stage of every design event grow? (Two decimals.)
::: solution
Since $h\propto Q^{2/3}$, the stage factor is $2.4^{2/3} = 1.79$. Urbanisation of this class raises *every* flood's depth by ~80 %, which is why the 1-in-2-year event starts flooding basements that the 1-in-20-year used to spare, and why pluvial maps must be redrawn with the pavement, not the river.
:::
:::

::: exercise {level=3 check="0.51"}
The 1953 North Sea surge raised the sea ~3.5 m above predicted tide. A dike crest stands 3.8 m above tide level, wave run-up adds 0.7 m to the still-water level, and the overtopping discharge scales as $q = C\,h_o^{1.5}$ with $C = 2\ \mathrm{m^{1/2}\,s^{-1}}$. Compute the overtopping discharge per metre of crest in m³ s⁻¹ m⁻¹. (Two decimals; note that sustained overtopping above ~1 m³ s⁻¹ m⁻¹ erodes grassed dikes.)
::: solution
Overtopping depth $h_o = 3.5+0.7-3.8 = 0.4$ m; $q = 2\times0.4^{1.5} = 0.51\ \mathrm{m^{3}\,s^{-1}\,m^{-1}}$ — below the grass-erosion threshold of ~1 m³ s⁻¹ m⁻¹, but the 1953 dikes were 1–2 m lower than this crest, were overtopped, and eroded from the land side: almost every Dutch dike failure that night began as a land-side erosion wound, not a sea-side assault.
:::
:::
