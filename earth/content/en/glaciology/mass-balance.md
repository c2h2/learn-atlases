In 1894, the International Geological Congress in Zurich created the International Glacier Commission, whose original roster of monitored glaciers still defines the field's baseline, and a century later its descendant network, the WGMS, reports the same quantity its founders measured with bamboo stakes and a spirit level: whether the world's glaciers are eating or starving. That quantity, the **mass balance**, is the single most direct climate signal the cryosphere produces — a yearly ledger of snow deposited and ice destroyed, read out in millimetres of water per square metre — and its reading over the past three decades is unambiguous: the reference glaciers of the world have lost roughly one metre of water equivalent **every year since 2000**, and the sum of all mountain glaciers and ice caps now contributes to sea level about as much each decade as does the melting of Greenland's surface. Mass balance is also the science's hardest measurement, because a glacier's budget must be summed over kilometres of crevassed, avalanche-strewn, satellite-invisible terrain — and then extrapolated to the 99 per cent of glaciers nobody visits.

## The ledger: accumulation, ablation, equilibrium line

::: definition Mass balance and its units {#def-mass-balance}
The annual mass balance $B$ of a glacier is accumulation minus ablation, in metres of **water equivalent** (m w.e.) at a point or averaged over the glacier; a glacier with $B > 0$ thickens, with $B < 0$ thins, and a glacier in climate equilibrium has $B = 0$ averaged over its area. Accumulation is snow (plus rime, hoar and the rain that freezes) surviving to the next autumn; ablation is surface melt, calving, basal melt and sublimation. The glacier organises its balance vertically: the upper reaches are always positive, the lower always negative, and the **equilibrium line (ELA)** divides them. Two derived numbers carry most of the climate information. The **balance gradient** $\mathrm{d}B/\mathrm{d}z$ — typically $5$–$10\ \mathrm{mm\,w.e.\,m^{-1}\,yr^{-1}}$ on mid-latitude glaciers, because temperature and snowline both change with height — measures how strongly the budget responds to an elevation shift, and therefore how strongly to a climate shift: a $+1\ ^\circ\mathrm{C}$ warming raises the ELA $100$–$200\ \mathrm{m}$, which on a gradient of $7\ \mathrm{mm\,m^{-1}}$ removes $0.7$–$1.4\ \mathrm{m\,w.e.}$ per year from the whole ablation zone. The **accumulation-area ratio** (AAR), the fraction of the glacier in the accumulation zone, sits near $0.6$–$0.7$ for equilibrium mid-latitude glaciers and is the quick-look diagnostic of the future: an August AAR of 0.3, as observed on most of the world's glaciers this decade, is a ledger that says *retreat*, written before a single stake is read.
:::

::: proposition Balance gradient and the sensitivity of a glacier {#prop-sensitivity}
A glacier's equilibrium geometry is set by the balance profile: the ELA sits where the area-weighted mean balance vanishes, and the **sensitivity** of the ELA to climate is the inverse of the balance gradient,
$$
\frac{\partial z_{\mathrm{ELA}}}{\partial B_{\mathrm{mean}}} = \left(\frac{\mathrm{d}B}{\mathrm{d}z}\right)^{-1} .
$$
The feedback that restores balance after a perturbation is purely geometric: warming raises the ELA, which shrinks the accumulation area and enlarges the (lower, warmer, faster-melting) ablation area, deepening the deficit until the glacier has retreated upslope enough that its remaining area sits high and cold enough to balance again. Two consequences govern glacier behaviour under climate change. Glaciers whose beds are **steeper than their surface** — most valley glaciers — have large balance gradients and are therefore fast and sensitive: they record climate with decades of lag. Glaciers on flat beds — the ice-sheet outlet glaciers, the Antarctic ice streams — have tiny gradients, and the same warming that shrinks a valley glacier in a generation can leave them quasi-stable for centuries and then collapse them, because their balance is set not by surface melt but by the **dynamics of flux discharge** at the margin, which has no gradient to stabilise it. This is the deep reason the sea-level problem is not "glaciers melting" but ice-sheet **dynamics**: surface-mass-balance systems self-limit; flux-discharge systems do not.
:::

::: example Reading a balance profile {#ex-profile}
A glacier's measured balance profile is $B(z) = 0.007\,(z - z_{\mathrm{ELA}})$ in m w.e. yr⁻¹ with $z$ in metres. If warming raises the ELA by $200\ \mathrm{m}$ while the glacier still occupies $1800$–$2600\ \mathrm{m}$ uniformly in area, find the mean balance and the implied thinning rate.
::: solution
The mean balance over the fixed geometry becomes $\bar B = 0.007\times(-200) = -1.4\ \mathrm{m\,w.e.\,yr^{-1}}$, so the glacier loses $1.4\ \mathrm{m}$ of ice thickness per year (about $1.5\ \mathrm{m}$ of ice) averaged over its area. Real glaciers respond: the snout retreats, the area distribution shifts upslope, and the mean deficit relaxes over the response time — but the exercise captures why a $+1\ ^\circ\mathrm{C}$ decade produces metre-per-year losses at the global mean, and why the observed thinning rates of Alpine, Norwegian and Caucasus glaciers this century (0.5–1.5 m/yr) are exactly this arithmetic.
:::
:::

::: widget plot
f: 0.007*x-16
x: 1800, 2600
y: -4, 3
labels: B\ (\mathrm{m\,w.e.\,yr^{-1}})
caption: A balance profile — accumulation above, ablation below, the zero crossing the equilibrium line. The gradient (here $7\ \mathrm{mm\,m^{-1}\,yr^{-1}}$) is the glacier's climate sensitivity: the same warming tilts the whole curve down by $0.7\ \mathrm{m\,yr^{-1}}$ per $100\ \mathrm{m}$ of ELA rise, and the area-weighted area under the curve is the glacier's sea-level contribution. Steep glaciers have steep curves and live fast; flat ice streams have nearly flat curves and die suddenly.
:::

## The energy balance: why ice melts where it does

::: definition The surface energy balance {#def-energy-balance}
Melting is an accounting problem in energy, not temperature: the heat available to melt snow or ice is the surface energy balance
$$
Q^{*} = (1-\alpha)K^{\downarrow} + L^{\downarrow} - L^{\uparrow} + H + LE + G ,
$$
shortwave absorbed (albedo $\alpha$: 0.85 fresh snow, 0.4 bare ice, 0.1 dirty ice), net longwave (usually $-30$ to $-70\ \mathrm{W\,m^{-2}}$, the ice radiating away heat under cold, dry air), turbulent sensible and latent heat, and a small conductive flux $G$. The snowpack's insulation holds the ice below at near-zero annual mean, so $Q^{*}$ integrates directly to melt at $334\ \mathrm{kJ}$ per kilogram. The practical workhorse is the **degree-day model**: melt is proportional to the cumulative days above freezing, $M = \mathrm{DDF}\times\mathrm{PDD}$, with degree-day factors of $5$–$20\ \mathrm{mm\,^\circ C^{-1}\,d^{-1}}$ for snow and $25$–$45$ for ice — the factor's spread encoding everything the radiation terms do that air temperature merely witnesses. Three regimes complicate the textbook. **Maritime glaciers** melt mostly under clouds and rain, from turbulent heat, and can melt at air temperatures below zero. **Continental and high-mountain glaciers** are radiation- and humidity-driven, and there **sublimation** — the same latent term that delivers melt in humid air — can remove metres of ice-equivalent directly to dry air, so that in the Andes and Tibet the largest glaciers are born on debris and dust, not snow, and ablation by dust and sublimation exceeds melt. **Debris-covered glaciers** (a quarter of the Himalaya's ablation area) are insulated where the debris exceeds a few centimetres and accelerated where it is thinner — the "sterile cover" effect that makes the highest debris-covered ice nearly immune to summer sun, and the thin-dust patches on Alpine glaciers worth tens of per cent more melt.
:::

::: example Sublimation, the invisible ablation {#ex-sublimation}
On a high Andes glacier at $5000\ \mathrm{m}$, the measured annual surface lowering is $1.2\ \mathrm{m}$ of ice, of which melt accounts for $0.5\ \mathrm{m}$. Find the sublimation rate in $\mathrm{kg\,m^{-2}\,yr^{-1}}$ and the mean latent heat flux it implies (latent heat of sublimation $2.83\ \mathrm{MJ\,kg^{-1}}$), and explain why such glaciers end their days as dirt.
::: solution
The sublimated ice is $0.7\ \mathrm{m}\times917 = 640\ \mathrm{kg\,m^{-2}\,yr^{-1}}$, implying a mean latent flux
$$
\frac{640\times2.83\times10^{6}}{3.15\times10^{7}} = 57\ \mathrm{W\,m^{-2}}
$$
running year-round into dry, windy air — larger than most temperate glaciers' entire summer melt flux. Sublimation leaves every impurity behind: dust, volcanic ash and black carbon concentrate at the surface into a **dirt layer** that thickens as the ice sublimes out from under it, until the glacier's lower reaches are a thin shell of ice under decimetres of debris — a self-limiting ablation mechanism, and the reason high-Andean and Himalayan glacier retreat looks like the growth of a rock field rather than the shrinking of ice.
:::
:::

## Measuring the ledger

::: definition Three ways to weigh a glacier {#def-measuring}
The **glaciological method** — stakes for flow, snow pits for accumulation, ablation stakes and melt pipes for loss, read annually and interpolated over the glacier by elevation — is the direct measurement and the calibration standard, kept at about 120 reference glaciers since Ahlmann's era; its errors are local (avalanche zones, dust, crevasses) but its fatal weakness is that it measures the glaciers we can reach. The **geodetic method** differences digital elevation models from aerial photogrammetry (decades-deep), SPOT-5 (2000s), TanDEM-X and ICESat/ICESat-2 altimetry, measuring volume change over entire glacierised regions without visiting them; converting to mass requires the density assumption ($\sim 850\ \mathrm{kg\,m^{-3}}$ for thinning snow and ice, not $917$), and the two methods now agree within their error bars on every region surveyed by both — the cross-validation that makes the global numbers trustworthy. **GRACE and GRACE-FO** gravimetry weighs whole regions (ice sheets, Alaska, High Asia) monthly at $300\ \mathrm{km}$ resolution, and its descendant products, combined with flow velocities from satellite interferometry, give the **flux-discharge method**: mass change = inflow − outflow across a grounding line, the only method that works for calving glaciers that never see a stake. The synthesis — regionally scaled, inter-method-calibrated — is the number quoted in sea-level budgets: mountain glaciers and ice caps lost $267\ \mathrm{Gt\,yr^{-1}}$ on average in 2000–2019, contributing $0.74\ \mathrm{mm\,yr^{-1}}$ to sea level, more than a quarter of the total rise.
:::

::: example From gravimetry to sea level {#ex-grace}
GRACE measures a mass loss of $150\ \mathrm{Gt\,yr^{-1}}$ for Greenland's surface balance. Convert to sea-level rise in mm per year (ocean area $3.61\times10^{8}\ \mathrm{km^{2}}$), and explain why the observed total Greenland contribution is larger than this surface figure alone.
::: solution
$$
\Delta h = \frac{150\times10^{12}\ \mathrm{kg}}{3.61\times10^{14}\ \mathrm{m^{2}}\times1025\ \mathrm{kg\,m^{-3}}} = 4.1\times10^{-4}\ \mathrm{m} = 0.41\ \mathrm{mm\,yr^{-1}} .
$$
The total Greenland contribution runs higher because the surface balance is only half the ledger: the other half is **dynamical discharge** — ice lost as icebergs at the marine margins, which doubled in the 1990s–2000s as the warming ocean thinned the buttressing floating tongues. A glacier system whose outflow is set by ocean temperature at a calving front 100 km from anywhere is not a surface-melt system, and no amount of firn data will tell you its budget: this is the mass-balance lesson scaled to ice sheets, and the reason both Greenland and Antarctica are monitored by radar altimetry, interferometry and gravimetry at once.
:::
:::

## Response time: the lag that hides the future

::: definition Response time and committed retreat {#def-response}
A glacier is a thick, slow system: its **response time** — the interval over which it approaches a new equilibrium after a climate step — scales as thickness divided by balance, $\tau \sim H(1+f)/a$ (Paterson's rule, with $f \approx 0.6$ accounting for the velocity profile), giving decades for small Alpine glaciers, centuries for large valley glaciers and tidewater glaciers, and **10 000–100 000 years for ice sheets**. The consequences are the three most misread statements in glacier science. **Lag**: most of the world's glaciers are still retreating from warming that ended decades ago and are committed to losing a further 20–50 per cent of their present volume even if climate froze at 2020 values — the "committed retreat" is not a forecast but a bookkeeping entry already made. **Non-equilibrium geometry**: a glacier whose snout has retreated into a deep over-deepened basin or below a stabilising bed step may be stable today only because it has not yet finished responding to the last century. **And the hockey stick of small glaciers**: because response time scales with thickness, the small glaciers that dominate the world's glacier **count** (95 per cent of them are under a square kilometre) respond within a human lifetime — which is why the Himalayan, Andean and East African small glaciers are vanishing on the timescale of policy, while the systems that control metres of sea level respond on the timescale of civilisation.
:::

::: example Paterson's rule at work {#ex-response}
Find the response time of (a) a $100\ \mathrm{m}$-thick Alpine glacier with $1500\ \mathrm{mm\,w.e.\,yr^{-1}}$ accumulation at its ELA, and (b) a $2000\ \mathrm{m}$-thick Antarctic ice-stream catchment with $300\ \mathrm{mm}$ accumulation. What does the ratio imply for attribution of their losses?
::: solution
With $f = 0.6$: (a) $\tau = 100\times1.6/1.5 = 107$ years; (b) $\tau = 2000\times1.6/0.3 = 10{,}700$ years. Three orders of magnitude separate the two: the Alpine glacier is within a decade or two of its post-1980 equilibrium, so its recent losses are **attributable to recent warming** with little lag confusion, while the Antarctic catchment is responding to the last deglaciation — its present thinning may be mostly the **long goodbye** of the Holocene transition, with the anthropogenic signal superimposed on a natural relaxation that takes a millennium to play out. Separating the two is the central problem of ice-sheet attribution, and it is why "Antarctica is losing mass because it is warming now" requires the flux measurements of the previous section, not the temperature record, to be defensible.
:::
:::

::: warning A negative balance is not a retreat, the ELA is not fixed, and GRACE does not "measure melting"
Five errors. **A glacier can have negative balance and advance** — the surge-type glaciers of Svalbard and Alaska advance on decades cycles while losing mass, and many debris-covered glaciers stagnate (thin in place) without retreating their debris-marked snouts at all; balance, area change and length change are three different signals with three different lags. **The ELA is not a fixed reference line**: it moves 100–200 m per °C and hundreds of metres between dry and wet years, and comparing glacier areas across decades without accounting for the ELA of the survey summers is the most common error in historical-photograph comparisons. **GRACE measures gravity, not melt**: its signal is total water-column mass change including groundwater, and Greenland's number must be separated from the bedrock's post-glacial rebound and from discharge — the "surface balance" figures quoted from GRACE are model outputs, not measurements. **Degree-day factors are not constants**: a DDF calibrated on a clean maritime glacier fails by factors of two on debris-covered or sublimation-dominated ice, and downscaling a degree-day model to high relief without a radiation term is how early 21st-century projections underestimated High Asia losses by half. **And mass balance is not the whole sea-level story for ice sheets**: surface balance, discharge and the isostatic adjustment of the basin all enter, and the "Greenland is losing 270 Gt/yr" headline is a **sum of three measured terms** whose individual uncertainties are each a third of the total.
:::

::: history
The quantitative study of glacier budgets begins with the **International Glacier Commission** founded at the 1894 International Geological Congress and the stake-readings of its first network; **Hans W:son Ahlmann**, directing the Swedish–Norwegian expeditions of the 1930s–50s, established the annual mass-balance method and the idea of a reference-glacier network, and the Alaskan glacier investigations** of the 1950s–60s — the Hubbard–Brooks glacier programme, running continuously since 1957 — proved the long series. **W. F. (Wilfrid) Paterson**'s *The Physics of Glaciers* (1981) set the response-time scaling and the material science; the WGMS *Glacier Mass Balance* synthesis volumes tracked the global signal, and the satellite era — the first GRACE ice-sheet weights (2002–), TanDEM-X's 12-m global DEM (2010–), **ICESat-2** (2018) — turned the field from a stake-and-pit discipline into a planetary one. The **Global Glacier Change Bulletin** (2018–) now reports the ledger annually, and the 2019–2024 Andes and Himalaya campaigns showed the High Asian small glaciers losing mass faster than any region the network had ever monitored.
:::

The densification that sets accumulation records is in [[glaciology/snow-firn]], the flow that redistributes the balance is in [[glaciology/ice-flow]], the meltwater and its routing in [[hydrology/snow]] and [[glaciology/basal-sliding]], the ice-sheet application of the flux method in [[glaciology/ice-sheets]] and [[glaciology/ice-shelves]], the sea-ice analogue of the energy balance in [[glaciology/sea-ice]], the altimetry and gravimetry themselves in [[glaciology/observing-ice]] and [[remote-sensing/radar-lidar]], the observed retreat in [[climate-change/observed-change]] and its sea-level consequence in [[climate-change/sea-level-rise]], and the glacier records of past balances in [[palaeoclimate/holocene]].

::: quiz
A glacier whose accumulation-area ratio (AAR) has been 0.3 for a decade will:
- [ ] advance, because most of its area is melting and thickening downstream.
- [x] retreat until its area distribution shifts high enough to balance again.
- [ ] stay the same size if the ELA is unchanged.
- [ ] surge.
::: solution
An AAR far below the equilibrium value (~0.6–0.7) means the area-weighted balance is negative: the glacier must lose the low-lying area that is starving it — retreat — until the remaining area sits high and cold enough that accumulation covers the required fraction. The lag between the AAR signal and the length response is the response time, which is why today's AARs are tomorrow's retreat maps.
:::
:::

::: summary
- Mass balance — accumulation minus ablation in m w.e. yr⁻¹ — is the glacier's climate ledger; the ELA divides its two signs and the balance gradient (5–10 mm m⁻¹ yr⁻¹) is the glacier's climate sensitivity.
- Warming of +1 °C raises the ELA 100–200 m and removes ~1 m w.e. yr⁻¹ from ablation zones — the arithmetic behind global thinning rates.
- Melt is energy-limited: radiation, turbulent heat and (in dry mountains) sublimation, summarised practically by degree-day factors 5–20 (snow) and 25–45 (ice) mm °C⁻¹ d⁻¹.
- Three methods weigh ice — stakes (glaciological), DEM differencing (geodetic), gravimetry and flux gates — and they agree within errors; glaciers and ice caps now lose ~267 Gt yr⁻¹, a quarter of sea-level rise.
- Response time scales as thickness/balance: decades for small glaciers (committed retreat of 20–50 per cent already booked), 10⁴–10⁵ years for ice sheets, whose present losses mix anthropogenic forcing with millennial-scale adjustment.
- Balance, area and length are three signals with three lags; reading a glacier's future requires its geometry, its gradient and its method-appropriate measurement.
:::

## Exercises

::: exercise Water equivalent {level=1 check="1.83"}
A glacier loses $2.0\ \mathrm{m}$ of ice density $917\ \mathrm{kg\,m^{-3}}$. Find the loss in m w.e. (Enter to two decimals.)
::: solution
$2.0\times917/1000 = 1.83\ \mathrm{m}$ w.e. The conversion is the field's smallest and most-used arithmetic: mass-balance figures quoted in metres of **ice** rather than water equivalent overstate the ledger by 9 per cent, and the literature's standard is water.
:::
:::

::: exercise Degree-day melt {level=1 check="15"}
A summer accumulates $500$ positive degree-days on bare ice with $\mathrm{DDF} = 30\ \mathrm{mm\,^\circ C^{-1}\,d^{-1}}$. Find the melt in metres. (Enter to the nearest integer.)
::: solution
$M = 30\times500 = 15{,}000\ \mathrm{mm} = 15\ \mathrm{m}$ of ice-equivalent — the kind of summer total that makes Greenland's bare-ice zones produce rivers and lakes, and that a single warm, clear, windy week can deliver a tenth of.
:::
:::

::: exercise GRACE to sea level {level=1 check="0.74"}
Mountain glaciers lose $267\ \mathrm{Gt\,yr^{-1}}$. Find the sea-level contribution in mm yr⁻¹ (ocean area $3.61\times10^{8}\ \mathrm{km^{2}}$, water density $1025\ \mathrm{kg\,m^{-3}}$). (Enter to two decimals.)
::: solution
$267\times10^{12}/(3.61\times10^{14}\times1025) = 0.72\times10^{-3}\ \mathrm{m} = 0.72\ \mathrm{mm\,yr^{-1}}$ — the published value, after the small corrections for crustal water storage, is $0.74$. The conversion factor to remember: $361\ \mathrm{Gt}$ of ice melt is $1.0\ \mathrm{mm}$ of sea level.
:::
:::

::: exercise ELA shift and balance {level=2 check="-1.05"}
With balance gradient $7\ \mathrm{mm\,m^{-1}\,yr^{-1}}$, find the change in mean balance (m w.e. yr⁻¹) for an ELA rise of $150\ \mathrm{m}$ at fixed geometry. (Enter to two decimals.)
::: solution
$\Delta\bar B = -0.007\times150 = -1.05\ \mathrm{m\,w.e.\,yr^{-1}}$. The glacier will partially recover by shrinking upslope, but the instantaneous hit is over a metre per year — comparable to the total annual balance of healthy reference glaciers, which is why a metre-per-year global mean is the signature of a glacier population far from equilibrium.
:::
:::

::: exercise Net radiation melt {level=2 check="25"}
Bare glacier ice absorbs a net $90\ \mathrm{W\,m^{-2}}$ in summer. Find the melt rate in mm w.e. per day ($\rho L = 3.06\times10^{8}\ \mathrm{J\,m^{-3}}$). (Enter to the nearest integer.)
::: solution
$90\times86{,}400/3.06\times10^{8} = 0.025\ \mathrm{m} = 25\ \mathrm{mm\,day^{-1}}$. Clean ice under clear skies melts about a quarter of a metre per week from radiation alone; the ablation zone of a temperate glacier is built by summer fluxes of exactly this order, and the snow that once covered it — with its 0.85 albedo — decided which years the ledger balanced.
:::
:::

::: exercise Paterson scaling {level=2 check="160"}
Find the response time (years, Paterson's rule with $f = 0.6$) of a $150\ \mathrm{m}$-thick glacier with ELA accumulation $1.5\ \mathrm{m\,w.e.\,yr^{-1}}$. (Enter to the nearest ten.)
::: solution
$\tau = 150\times1.6/1.5 = 160$ years. A glacier of this size that last equilibrated in the 1960s is still adjusting to the 1990s shift — which is why Alpine glacier retreat this decade is partly **committed** and why the "maximum glacier extent" of the Little Ice Age neoglaciation is now being lost at rates no weather can explain.
:::
:::

::: exercise The balance ratio {level=3 check="0.6"}
A glacier in equilibrium has mean accumulation $+1.8\ \mathrm{m\,w.e.}$ over its accumulation area and mean ablation $-2.7\ \mathrm{m\,w.e.}$ over its ablation area. Find the accumulation-area fraction (the equilibrium AAR) implied. (Enter to two decimals.)
::: solution
Balance requires $A_c\times1.8 = (1-A_c)\times2.7$, so $A_c = 2.7/4.5 = 0.6$. The equilibrium AAR near 0.6 — the accumulation zone doing a third less work per square metre over a third more area — is why August AARs of 0.3 observed worldwide are so damning: they imply the glacier is at roughly **half** its equilibrium area already in budget terms, and the map will eventually agree with the ledger.
:::
:::

::: exercise Committed retreat {level=3 check="0.2"}
A glacier population holds $100\ \mathrm{Gt}$ of ice, of which $40\ \mathrm{Gt}$ is committed to loss at the present climate. If that committed anomaly relaxes exponentially with a response time of $200$ years, find the initial relaxation rate in $\mathrm{Gt\,yr^{-1}}$. (Enter to one decimal.)
::: solution
The initial rate of an exponential relaxation is the anomaly divided by the time constant: $40/200 = 0.2\ \mathrm{Gt\,yr^{-1}}$. If the population is in fact observed to lose $2.5\ \mathrm{Gt\,yr^{-1}}$, committed adjustment accounts for less than a tenth of the present loss — the remainder is being driven by **ongoing** warming, not legacy. The exercise is a template for the committed-loss literature: response time, present rate and committed volume are three numbers of which only two can be chosen freely, and every "committed to X metres of sea level" headline is one of them being solved for.
:::
:::
