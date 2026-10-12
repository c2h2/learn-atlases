The climate system has one master gauge: the difference between what the Earth absorbs and what it emits. Everything else — the winds, the storms, the currents, the ice, the seasons, the weather you planned around this morning — is the machinery by which the planet moves that imbalance around and works it off. This chapter counts the money. It is the quantitative backbone of the whole course, and the numbers, once memorised, let you check any claim about climate change in about ten seconds.

The bookkeeping has two levels. At the top of the atmosphere, a single number decides whether the planet warms: absorbed sunlight minus emitted infrared. At the surface, a much larger set of flows — sunlight in, infrared out, water evaporating, air being heated — must balance, and the way they balance determines how hot the ground gets, how much it rains, and why the tropics are wet and the subtropics dry.

## The budget at the top of the atmosphere

::: definition Global energy budget {#def-budget}
Globally and annually averaged, the Earth receives $340\ \mathrm{W\,m^{-2}}$ of solar radiation (a quarter of the $1{,}361\ \mathrm{W\,m^{-2}}$ solar constant, because the surface area of a sphere is four times its disc area). Of this, $100\ \mathrm{W\,m^{-2}}$ is reflected — $23\ \mathrm{W\,m^{-2}}$ by the surface and $77\ \mathrm{W\,m^{-2}}$ by clouds and air, giving a planetary albedo of $0.29$ — and $240\ \mathrm{W\,m^{-2}}$ is absorbed: $163\ \mathrm{W\,m^{-2}}$ at the surface and $77\ \mathrm{W\,m^{-2}}$ in the atmosphere. In a climate equilibrium the absorbed and emitted fluxes are equal; the observed imbalance is $0.7$–$1.0\ \mathrm{W\,m^{-2}}$, and that residual is global warming.
:::

The imbalance is measured two ways, and the agreement of the two methods is one of the quiet triumphs of observational oceanography. Satellites (ERBE, then CERES since 2000) difference incoming and outgoing radiation directly, giving $0.83 \pm 0.13\ \mathrm{W\,m^{-2}}$ for 2010–2020 (Loeb and others, 2021). The ocean, which absorbs about nine tenths of the excess, is weighed independently by Argo floats measuring the temperature and salinity of the upper $2{,}000\ \mathrm{m}$; the implied global mean heating is $0.7$–$0.9\ \mathrm{W\,m^{-2}}$ and rising. The remainder warms the continents ($5\%$), melts ice ($3\%$) and warms the air itself ($1\%$).

::: definition Emission temperature and the effective greenhouse effect {#def-emission}
A planet radiating $240\ \mathrm{W\,m^{-2}}$ to space as a black body does so from an effective emitting temperature
$$
T_e = \left(\frac{S(1-\alpha)}{4\sigma}\right)^{1/4} = 255\ \mathrm{K},
$$
which is the temperature the atmosphere has at the altitude from which most outgoing infrared escapes. The surface is $288\ \mathrm{K}$, so the **effective greenhouse effect** is $33\ \mathrm{K}$.
:::

::: proposition The atmosphere is heated from below, the surface from above {#prop-heating}
Of the solar energy the Earth absorbs, twice as much reaches the surface as the atmosphere. But the surface loses energy to the atmosphere by $84\ \mathrm{W\,m^{-2}}$ of latent heat and about $20\ \mathrm{W\,m^{-2}}$ of sensible heat, plus a net infrared of about $66\ \mathrm{W\,m^{-2}}$, totalling more than its solar gain. The atmosphere's heat budget is therefore dominated by fluxes from the surface, not by direct absorption of sunlight.
:::

::: proof
Write the surface balance: absorbed solar $163$ equals net infrared $66$ plus latent $84$ plus sensible $20$, with a residual of about $7\ \mathrm{W\,m^{-2}}$ (the "closure problem", [[#ex-closure]]). Write the atmospheric balance: absorbed solar $77$ plus net infrared $66$ plus latent $84$ plus sensible $20$ equals $247$, against $240$ emitted to space plus a small downward infrared residual. The two are the same equation read from opposite ends. The consequence is structural: because water vapour and cloud — the two dominant absorbers of long-wave radiation — live in the atmosphere, and because the atmosphere is mostly transparent to sunlight, the atmosphere cannot be understood as a solar-heated fluid. It is a surface-heated fluid that happens to be transparent to the incoming radiation. This is why the boundary layer, not the radiative transfer of sunlight, sets the height of the trade-wind inversion and the top of the clouds.
:::

::: example Evaporation is the largest single term {#ex-evap}
The global mean latent heat flux is $84\ \mathrm{W\,m^{-2}}$. With a latent heat of vaporisation of $2.45\ \mathrm{MJ\,kg^{-1}}$, find the global mean evaporation in $\mathrm{mm\,day^{-1}}$ and $\mathrm{m\,yr^{-1}}$, and compare it with the global mean precipitation of $965\ \mathrm{mm\,yr^{-1}}$.
::: solution
$$
E = \frac{84\ \mathrm{W\,m^{-2}}}{2.45\times10^{6}\ \mathrm{J\,kg^{-1}}} = 3.4\times10^{-5}\ \mathrm{kg\,m^{-2}\,s^{-1}} = 2.96\ \mathrm{mm\,day^{-1}} = 1.08\ \mathrm{m\,yr^{-1}} .
$$

That is within $12\%$ of the measured precipitation, and the two must be equal in a steady state, so the energy and the hydrology close on each other. The comparison is worth dwelling on: the planet evaporates a metre of water a year, every square metre of it, and moves $84\ \mathrm{W\,m^{-2}}$ — a third of the sunlight the surface absorbs — as latent heat. Evaporation, not sensible heating, is the dominant way the surface gets rid of heat, which is why irrigation cools a city, why heat waves intensify when soils dry, and why the water cycle and the energy balance are the same subject ([[earth-system/water-cycle]]).
:::
:::

## Where the infrared goes

Sunlight is a $\sim5{,}800\ \mathrm{K}$ spectrum, peaked at $0.5\ \mu\mathrm{m}$, and the atmosphere is largely transparent to it. The Earth emits a $\sim255\ \mathrm{K}$ spectrum peaked at $10\ \mu\mathrm{m}$, and the atmosphere is not transparent to that: water vapour absorbs in the rotation band beyond $18\ \mu\mathrm{m}$ and at $6.3$ and $2.7\ \mu\mathrm{m}$, carbon dioxide at $15$ and $4.3\ \mu\mathrm{m}$, ozone at $9.6\ \mu\mathrm{m}$, methane at $7.7\ \mu\mathrm{m}$. Between the bands, from about $8$ to $13\ \mu\mathrm{m}$, lies the **atmospheric window**, through which roughly $20\%$ of the surface's thermal emission escapes directly.

::: warning "The carbon dioxide band is saturated, so more carbon dioxide does nothing"
This argument has been made since the 1890s and has been wrong for just as long. It is true that the centre of the $15\ \mu\mathrm{m}$ band is opaque to within a few metres at the surface, so adding carbon dioxide near the ground changes nothing *there*. But the radiation that escapes to space is not emitted near the ground. It is emitted, on average, from $5$–$6\ \mathrm{km}$ up, where the band is thin enough to be transparent at its centre. Adding carbon dioxide raises that emitting level by a few hundred metres, and the level it rises to is colder, so the planet radiates less. The proof is observational: satellite spectra from 1970 (Nimbus) and 2000s (IRIS, then CERES) show a measurable, spectrally resolved reduction of outgoing radiation in exactly the carbon dioxide and ozone bands, of the size predicted by line-by-line radiative transfer.
:::

::: example The forcing of a doubling, and the warming without feedbacks {#ex-forcing}
The radiative forcing of carbon dioxide is well approximated by $\Delta F = 5.35\ln(C/C_0)\ \mathrm{W\,m^{-2}}$. Find the forcing of a doubling, and the resulting global mean temperature change if the only response is the Planck (blackbody) response of a $255\ \mathrm{K}$ emitter.
::: solution
$\Delta F = 5.35\ln 2 = 3.7\ \mathrm{W\,m^{-2}}$. Linearising $F = \sigma T_e^4$ about $T_e = 255\ \mathrm{K}$ gives $\mathrm{d}F/\mathrm{d}T = 4\sigma T_e^3 = 3.8\ \mathrm{W\,m^{-2}\,K^{-1}}$, so
$$
\Delta T = \frac{3.7}{3.8} = 0.97\ \mathrm{K}.
$$

The standard figure is $1.0$–$1.2\ \mathrm{K}$, the spread coming from whether the derivative is taken at the emission temperature or at the surface and whether the stratosphere is allowed to adjust (allowing it to adjust, which is correct, reduces the forcing by about $0.7\ \mathrm{W\,m^{-2}}$ and is why the quoted value is $3.7$ rather than $4.4$). This no-feedback warming is the single most useful number in the subject: observed warming is roughly equal to it, which means the feedbacks have so far been roughly neutral in the arithmetic of what we have already emitted — and the assessed feedbacks are positive, so the equilibrium response is $2.5$–$4\ ^\circ\mathrm{C}$ ([[climate-system/feedbacks-sensitivity]]).
:::
:::

::: widget plot
f: 3.7*ln(x/280)/ln(2)
x: 280, 1200
y: 0, 17
caption: Radiative forcing from carbon dioxide, $\Delta F = 5.35\log_2(C/C_0)\ \mathrm{W\,m^{-2}}$, against concentration. The logarithm is the whole story: the first doubling costs $3.7\ \mathrm{W\,m^{-2}}$, the second the same again, so the forcing grows linearly with the *number of doublings* and not with concentration. At the current $422\ \mathrm{ppm}$ the forcing is $2.5\ \mathrm{W\,m^{-2}}$; at the $700\ \mathrm{ppm}$ that a high-emission century would reach, $6.6\ \mathrm{W\,m^{-2}}$. The formula is a fit to line-by-line radiative transfer valid to about $10\%$ over this range, and it is calibrated with the stratosphere adjusted.
:::

## The surface budget and its awkwardness

::: definition The Bowen ratio and the closure problem {#def-bowen}
The **Bowen ratio** $\beta = H / L$ is the ratio of sensible to latent heat flux at the surface. Over the ocean $\beta \approx 0.1$; over a vegetated, well-watered land surface $0.2$–$0.5$; over a dry rangeland or city $1$–$10$. The **closure problem** is the persistent discrepancy, of order $10$–$20\%$ of the available energy, between the sum of turbulent fluxes measured by eddy-covariance flux towers and the net radiation measured at the same site.
:::

::: example The closure problem is a real problem {#ex-closure}
At a global scale, surface net solar is $163\ \mathrm{W\,m^{-2}}$, net infrared $66$, latent $84$ and sensible $20$: the losses sum to $170$, seven more than the gain. At a flux-tower site the available energy is $400\ \mathrm{W\,m^{-2}}$ and the measured turbulent fluxes sum to $330$. Give three candidate explanations of the global residual and one explanation of the site residual that would be wrong.
::: solution
For the global $7\ \mathrm{W\,m^{-2}}$: (i) the diagrams are assembled from different datasets in different periods, and the surface radiation (the "dimming and brightening" record) has its own $5$–$10\ \mathrm{W\,m^{-2}}$ uncertainty; (ii) energy stored in warming the upper ocean and the continental crust is not counted in the surface balance; (iii) the ocean absorbs $0.9\ \mathrm{W\,m^{-2}}$ globally, which is small but not zero.

For the site, the tempting wrong answer is "the tower is broken". The residual is nearly always a measurement-coverage problem: eddy covariance under-samples the large, infrequent eddies that carry energy at night and in the roughness-sublayer, so the standard correction (the Foken classification, or a site-specific friction-velocity threshold) discards a third of the data and the gap is filled by a model that is biased low. Energy balance closure of $0.85$–$0.95$ is normal and is reported as such. The lesson generalises to all of Earth observation: when two independent measurements of a budget disagree by ten per cent, the interesting question is not which one is wrong but what the disagreement is telling you.
:::
:::

::: example Where does the extra energy go? {#ex-ohu}
The Earth's energy imbalance is $0.85\ \mathrm{W\,m^{-2}}$ and $91\%$ of it enters the ocean. How long would that take to warm the global mixed layer (mean depth $100\ \mathrm{m}$) by $1\ ^\circ\mathrm{C}$, and why does the observed mixed-layer warming of about $0.1\ ^\circ\mathrm{C}$ per decade not contradict it?
::: solution
The heat capacity of $100\ \mathrm{m}$ of sea water is $1025\times3990\times100 = 4.1\times10^{8}\ \mathrm{J\,m^{-2}\,K^{-1}}$. At $0.85\times0.91 = 0.77\ \mathrm{W\,m^{-2}}$,
$$
\tau = \frac{4.1\times10^{8}}{0.77} = 5.3\times10^{8}\ \mathrm{s} = 17\ \mathrm{yr\ per\ kelvin}.
$$

So the whole imbalance, applied to the mixed layer alone, would give $0.6\ ^\circ\mathrm{C}$ per decade. The observed $0.1\ ^\circ\mathrm{C}$ per decade is smaller because most of the heat does not stay in the mixed layer: subduction, the seasonal thermocline and the wind-driven and mesoscale eddy circulation carry it to $300$, $1{,}000$ and $3{,}000\ \mathrm{m}$. Recent estimates put a substantial fraction — of order a quarter (Calton and others, 2023) — of the anthropogenic ocean heat uptake on the mesoscale eddy field, which coarse models represent only statistically. This is the physical reason the equilibrium climate sensitivity is so hard to pin down from the observed warming: the same forcing produces a different surface trajectory depending on how efficiently the ocean hides heat from the atmosphere ([[climate-change/observed-change]]).
:::
:::

::: widget plot
f: 279*(1-x)^0.25
x: 0, 0.9
y: 150, 290
caption: The blackbody emission temperature $T_e = 279(1-\alpha)^{1/4}\ \mathrm{K}$ as a function of planetary albedo. Earth sits at $\alpha = 0.29$, $T_e = 255\ \mathrm{K}$. A snowball Earth at $\alpha = 0.6$ radiates at $222\ \mathrm{K}$ and at $\alpha = 0.85$ at $173\ \mathrm{K}$: because the response goes as the fourth root, the albedo changes matter most where the curve is steepest, which is at low albedo — the reason small ice losses accelerate and the reason the faint young Sun problem (a Sun $30\%$ weaker, requiring an albedo near $0.6$ for a frozen Earth, or a greenhouse-rich unfrozen one) is a real puzzle rather than an arithmetic one.
:::

::: warning The "greenhouse effect is 33 kelvin" is a bad decomposition
The $33\ \mathrm{K}$ difference between the surface ($288\ \mathrm{K}$) and the emission temperature ($255\ \mathrm{K}$) is a real number and a misleading one. It compares the Earth to a hypothetical planet with no atmosphere *and the same albedo*, which is impossible: an airless Earth would be heavily cratered, dry, and would have an albedo and a temperature very different from $0.29$ and $255\ \mathrm{K}$. Decompositions of the $33\ \mathrm{K}$ into contributions — water vapour about half, clouds about a fifth, carbon dioxide about a fifth, ozone, methane and nitrous oxide the rest (Li and others, 2013) — are convention-dependent, because water vapour responds to carbon dioxide and clouds do both jobs at once. The honest statements are these: removing water vapour would cool the planet far more than removing carbon dioxide, because water vapour is abundant and its abundance is set by temperature; and removing the *non-condensing* gases would remove the thermostat that sets how much water vapour the atmosphere can hold, which would take the planet towards an ice-covered state.
:::

::: quiz
The surface absorbs $163\ \mathrm{W\,m^{-2}}$ of sunlight but loses about $170\ \mathrm{W\,m^{-2}}$ to the atmosphere. How is that possible?
- [ ] Because the numbers do not close and the discrepancy is an error.
- [x] Because the surface also receives $342\ \mathrm{W\,m^{-2}}$ of downwelling infrared from the atmosphere, which is netted out of the "$66\ \mathrm{W\,m^{-2}}$ net infrared" term.
- [ ] Because the ocean supplies geothermal heat.
- [ ] Because some sunlight is absorbed twice.
::: solution
The surface radiates $390$–$400\ \mathrm{W\,m^{-2}}$ upward and absorbs about $340\ \mathrm{W\,m^{-2}}$ downward, so its *net* infrared loss is only about $66\ \mathrm{W\,m^{-2}}$. The huge two-way infrared exchange is what the greenhouse effect physically is: the atmosphere returns most of what it receives, which slows the surface's loss of heat without violating energy conservation. Geothermal heat is $0.09\ \mathrm{W\,m^{-2}}$, a thousand times too small to matter here.
:::
:::

::: history
Fourier (Fourier) set the problem in 1824: a body illuminated by the Sun and radiating to space must be colder than it is, so the atmosphere must act like a screen that is transparent to visible light and opaque to the "obscure heat" the Earth emits. Tyndall (Tyndall)'s 1859–1861 thermopile experiments identified which gases do the blocking. Plass (Plass) in 1956 and Möller (Möller) in 1963 computed the infrared transfer band by band and showed that the carbon dioxide bands were not saturated in the way the conventional wisdom assumed. Manabe and Wetherald (Wetherald) in 1967 built the first one-dimensional radiative-convective model with water vapour as a temperature-dependent feedback, obtaining $2.9\ ^\circ\mathrm{C}$ for a doubling — a number that has survived sixty years of refinement. Kiehl and Trenberth (Trenberth) published the canonical surface energy budget in 1997 ($355\ \mathrm{W\,m^{-2}}$ at the top of the atmosphere), Trenberth, Fasulo and Kiehl updated it in 2009, and the CERES instruments, flying since 1999, have since measured the top-of-atmosphere fluxes continuously. The surface radiation network (Baseline Surface Radiation Network since 1996, and the 2007 discovery by Wild and others that the "global dimming" of 1960–1990 had reversed) supplied the surface half of the budget. Argo, with 3,900 floats profiling to $2{,}000\ \mathrm{m}$ every ten days since 2004, turned ocean heat content from an extrapolation into a measurement, and it is Argo that has made the energy imbalance an observed quantity rather than an inference.
:::

## Where this leads

The budget of this chapter is the input to the forcing formalism of [[climate-system/forcing]], the feedback algebra of [[climate-system/feedbacks-sensitivity]] and the transport problem of [[climate-system/heat-transport]]. The infrared transfer itself is developed in [[atmospheric-dynamics/radiative-transfer]], the water-vapour and cloud physics in [[atmospheric-dynamics/moist-thermodynamics]] and [[atmospheric-dynamics/cloud-physics]], the surface fluxes in [[atmospheric-dynamics/boundary-layer]], and the observed changes in the fluxes in [[climate-change/observed-change]].

::: summary
- The planet absorbs $240\ \mathrm{W\,m^{-2}}$ of sunlight and emits the same as infrared; the observed $0.7$–$1.0\ \mathrm{W\,m^{-2}}$ imbalance, measured independently by satellites and by Argo, is global warming.
- Ninety per cent of the excess goes into the ocean, $5\%$ into the land, $3\%$ into melting ice and $1\%$ into the air.
- Twice as much sunlight is absorbed by the surface as by the atmosphere, but the atmosphere is heated mainly by the surface: $84\ \mathrm{W\,m^{-2}}$ latent plus $\sim20$ sensible plus $\sim66$ net infrared.
- Evaporation of $1.08\ \mathrm{m\,yr^{-1}}$ matches global precipitation: the energy budget and the water budget close on each other.
- Carbon-dioxide forcing is logarithmic, $3.7\ \mathrm{W\,m^{-2}}$ per doubling, and the no-feedback response is about $1.1\ \mathrm{K}$.
- The surface energy budget does not close to better than about $10\%$, globally or at flux towers, and the residual is informative rather than embarrassing.
:::

## Exercises

::: exercise The factor of four {level=1 check="340"}
The solar constant is $1{,}361\ \mathrm{W\,m^{-2}}$. Find the global mean incoming solar radiation at the top of the atmosphere.
::: solution
$1361/4 = 340\ \mathrm{W\,m^{-2}}$. The factor is the ratio of sphere area to disc area, $4\pi a^2 / \pi a^2$.
:::
:::

::: exercise Albedo {level=1 check="0.29"}
The Earth reflects $100\ \mathrm{W\,m^{-2}}$ of the $340\ \mathrm{W\,m^{-2}}$ it receives. Find the planetary albedo and the absorbed flux.
::: solution
$\alpha = 100/340 = 0.29$; absorbed $= 240\ \mathrm{W\,m^{-2}}$. A one-per-cent change of albedo is $3.4\ \mathrm{W\,m^{-2}}$ — comparable to the forcing of a carbon-dioxide doubling, which is why cloud feedback is the largest single uncertainty in climate sensitivity.
:::
:::

::: exercise Emission temperature {level=1 check="255"}
Find the blackbody emission temperature for an absorbed flux of $240\ \mathrm{W\,m^{-2}}$.
::: solution
$T_e = (240/5.67\times10^{-8})^{1/4} = 255\ \mathrm{K}$. Note that this is the temperature at the emitting level, not at the surface, and that a $1\ ^\circ\mathrm{C}$ surface warming with an unchanged emitting temperature would be impossible: the emitting level must warm too, which is the content of the Planck feedback.
:::
:::

::: exercise Sensible and latent heat {level=2 check="0.24"}
A wetland site has a latent heat flux of $110\ \mathrm{W\,m^{-2}}$ and a sensible heat flux of $27\ \mathrm{W\,m^{-2}}$. Find the Bowen ratio and the fraction of the available energy used for evaporation.
::: solution
$\beta = 27/110 = 0.25$; the evaporative fraction is $110/(110+27) = 0.80$. If the site is drained, $\beta$ can rise to $2$–$5$ and the evaporative fraction falls to $0.2$, which raises the daytime temperature by several kelvin — the physical content of the claim that wetland loss amplifies local heat waves.
:::
:::

::: exercise Forcing and no-feedback warming {level=2 check="0.68"}
Find the carbon-dioxide forcing of $450\ \mathrm{ppm}$ relative to $280\ \mathrm{ppm}$ and the no-feedback temperature response.
::: solution
$\Delta F = 5.35\ln(450/280) = 2.6\ \mathrm{W\,m^{-2}}$; against the Planck response of $3.8\ \mathrm{W\,m^{-2}\,K^{-1}}$ this gives $\Delta T = 0.68\ \mathrm{K}$. The assessed *net* feedback parameter, Planck plus water vapour, lapse rate, albedo and cloud together, is $1.16\ \mathrm{W\,m^{-2}\,K^{-1}}$ (IPCC AR6, 2021), with which the same forcing gives $2.6/1.16 = 2.2\ ^\circ\mathrm{C}$ at equilibrium. The gap between $0.7$ and $2.2$ is the feedbacks, and it is why the two numbers are so often confused in public discussion.
:::
:::

::: exercise Ocean heat uptake {level=2 check="3.4"}
The global energy imbalance is $0.85\ \mathrm{W\,m^{-2}}$ and $91\%$ of it enters the ocean. Find the ocean heat uptake in watts and the daily energy in units of $10^{19}\ \mathrm{J}$.
::: solution
$P = 0.85\times5.10\times10^{14}\times0.91 = 3.9\times10^{14}\ \mathrm{W}$, and per day $3.4\times10^{19}\ \mathrm{J}$. Expressed in "Hiroshima bombs" of $6\times10^{13}\ \mathrm{J}$ that is about $570{,}000$ a day, a comparison that is fair but not illuminating. The useful comparison is that the imbalance is about twenty times the rate at which humanity uses energy ($1.9\times10^{13}\ \mathrm{W}$) — and that unlike ours, it cannot be switched off, because it is already in the atmosphere.
:::
:::

::: exercise The atmospheric window {level=3}
About $20\%$ of the surface's thermal emission escapes through the $8$–$13\ \mu\mathrm{m}$ window. If the surface emits $390\ \mathrm{W\,m^{-2}}$ and the window's transmission were reduced by $10\%$ by a new absorber, find the forcing and compare it with that of a carbon-dioxide doubling.
::: solution
The window carries $78\ \mathrm{W\,m^{-2}}$; a $10\%$ reduction traps $7.8\ \mathrm{W\,m^{-2}}$, twice the forcing of a carbon-dioxide doubling. This is why the CFC-12 and CFC-11 bands, which sit squarely in the window, made those compounds so potent — a few tens of parts per billion gave a forcing of order $0.3\ \mathrm{W\,m^{-2}}$ — and why the same window makes the mineral dust and cirrus problems delicate. It is also why the window is where the surface-based remote sensing of temperature and humidity has to work.
:::
:::

::: exercise The faint young Sun {level=3}
Four billion years ago the Sun was $70\%$ of its present brightness. Find the emission temperature for today's albedo and for a snowball albedo of $0.6$, and state what the geological record requires.
::: solution
Absorbed flux $= 0.7\times240 = 168\ \mathrm{W\,m^{-2}}$ at today's albedo, giving $T_e = 233\ \mathrm{K}$; at $\alpha = 0.6$, absorbed $= 0.7\times340\times0.4 = 95\ \mathrm{W\,m^{-2}}$ and $T_e = 196\ \mathrm{K}$. Both are far below freezing, yet the geological record shows liquid water, stromatolites and no glacial deposits until about $2.4$ billion years ago.

The resolution must be a much stronger greenhouse: carbon dioxide at $10$–$100$ times present levels gives perhaps $20$–$30\ \mathrm{W\,m^{-2}}$ of extra forcing, methane with an organic-haze problem, and possibly ammonia from a reducing atmosphere. The faint young Sun is the classic existence proof that the climate system can be held far from its radiative equilibrium by greenhouse gases, which is the same physics that makes the present problem serious — and the same one that makes "climate has changed before" an argument for, not against, the greenhouse mechanism.
:::
:::

::: exercise Closure at a site {level=3}
A flux tower measures net radiation $R_n = 520\ \mathrm{W\,m^{-2}}$, soil heat flux $G = 40\ \mathrm{W\,m^{-2}}$, latent $110$ and sensible $60$. Find the energy balance closure and the Bowen ratio, and state which measurement is most likely responsible for the gap.
::: solution
Available energy $R_n - G = 480\ \mathrm{W\,m^{-2}}$; measured turbulent sum $170\ \mathrm{W\,m^{-2}}$, a closure of $0.35$ — far below the usual $0.85$–$0.95$, so the numbers are not a real site but an illustration of what bad data look like. In real campaigns the gap is attributed mainly to the latent flux, because eddy covariance at night and under stable stratification systematically under-measures the transport, and because the sensor path-averages over a footprint that changes with wind direction. The standard diagnostic is to plot the closure against friction velocity and stability, and to report the corrected and uncorrected values side by side.
:::
:::
