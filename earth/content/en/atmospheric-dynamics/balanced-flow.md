Stack a surface chart above a 500 hPa chart and the two tell different stories: the surface low sits under a longwave trough but not exactly inside it, the winds above blow stronger and in a slightly different direction, and the difference is not noise. It is the **thermal wind**, the shear of the geostrophic wind with height required by the horizontal temperature gradient, and it is the single relation that converts a pair of charts into a diagnosis of everything the atmosphere is about to do — where air is rising, where fronts are sharpening, where the jet will move tomorrow. Balanced flow is the discipline of reading the small ageostrophic residual of a nearly geostrophic atmosphere, because the balance carries the wind and the imbalance carries the weather.

## The thermal wind

::: proposition The thermal wind relation {#der-thermal-wind}
Differentiate the geostrophic relations with respect to $z$, use the ideal gas law to write $\rho^{-1}\partial_x p = R_d\,\partial_x T$ to good approximation in a layer of mean temperature $\bar T$, and interchange the order of differentiation:
$$
\frac{\partial u_g}{\partial z} = -\frac{g}{f\,\bar T}\frac{\partial \bar T}{\partial y}, \qquad
\frac{\partial v_g}{\partial z} = \frac{g}{f\,\bar T}\frac{\partial \bar T}{\partial x}.
$$
In vector form, with $\mathbf{V}_T$ the difference of the geostrophic wind between two levels separated by $\Delta z$,
$$
\mathbf{V}_T = \frac{g\,\Delta z}{f\,\bar T}\,\mathbf{k}\times\nabla_h\bar T ,
$$
the **thermal wind**: the change of the geostrophic wind with height is proportional to the mean horizontal temperature gradient, directed with warm air to the left in the Northern Hemisphere. The relation is exact within the hydrostatic and geostrophic approximations — it is not a new balance but a **compatibility condition**: a atmosphere with a horizontal temperature gradient cannot have a height-independent geostrophic wind. The practical content is a two-way reading: the vertical shear of the wind measures the thickness gradient, and a wind that veers with height (turns clockwise) marks warm advection and a wind that backs, cold advection.
:::

::: example The jet stream is a thermal wind {#ex-jet}
Across the polar-front jet the mean temperature gradient between the surface and $200\ \mathrm{hPa}$ is $2\ \mathrm{K}$ per $100\ \mathrm{km}$ directed equatorward, with $\bar T = 255\ \mathrm{K}$ at $45\ ^\circ\mathrm{N}$. Estimate the vertical shear of the geostrophic wind and the jet speed at $200\ \mathrm{hPa}$ if the wind is $10\ \mathrm{m\,s^{-1}}$ at the surface.
::: solution
$$
\frac{\partial V_g}{\partial z} = \frac{g}{f\bar T}\left|\nabla_h\bar T\right| = \frac{9.81}{1.03\times10^{-4}\times255}\times2\times10^{-5} = 7.5\times10^{-3}\ \mathrm{s^{-1}},
$$
i.e. $7.5\ \mathrm{m\,s^{-1}}$ per kilometre. Over the $10\ \mathrm{km}$ of the troposphere the thermal wind is $\sim 75\ \mathrm{m\,s^{-1}}$, and with $10\ \mathrm{m\,s^{-1}}$ at the surface the jet core aloft is of order $60$–$80\ \mathrm{m\,s^{-1}}$ — the observed magnitude. The direction follows from the cross product: with cold air to the north the thermal wind blows **from the west**, which is why the mid-latitude jet is a **westerly** and why the westerlies strengthen every autumn as the equator-to-pole temperature contrast steepens and weaken in spring when it relaxes. The same arithmetic run backwards is the radiosonde operator's sanity check: a measured wind shear of $10\ \mathrm{m\,s^{-1}}$ per kilometre demands a cross-section temperature contrast of nearly $3\ \mathrm{K}$ per $100\ \mathrm{km}$, and if the thermometers deny it, one of the instruments is wrong.
:::
:::

::: widget plot
f: 7.46*x; 10+7.46*x
x: 0, 10
y: 0, 85
labels: \text{shear-induced speed}\ (\text{m/s}); V_g(z)\ (\text{m/s})
caption: Geostrophic wind speed with height through a layer with a $2\ \mathrm{K}$ per $100\ \mathrm{km}$ temperature contrast at $45\ ^\circ\mathrm{N}$: the shear is $7.46\ \mathrm{m\,s^{-1}}$ per kilometre of height (first curve from zero, second with a $10\ \mathrm{m\,s^{-1}}$ surface wind). Halving the temperature contrast halves the slope — the mechanism of the seasonal swing of the jet — and note that the relation says nothing about how big the wind is at any one level, only about its **change**: geostrophy fixes shear, not speed.
:::

## Ageostrophy, and the circulation that comes with it

::: definition The ageostrophic wind and secondary circulations {#def-ageostrophic}
The real wind is the sum of its balanced and unbalanced parts, $\mathbf{v} = \mathbf{v}_g + \mathbf{v}_a$, and at small Rossby number the ageostrophic wind is a fraction $\mathrm{Ro}$ of the geostrophic one — a few $\mathrm{m\,s^{-1}}$ against $20$–$40$. This small residual is out of all proportion to its weather: $\mathbf{v}_a$ is the ageostrophic flow that crosses the isobars, produces the vertical motion of synoptic systems, and drives the direct circulations of fronts and jets. Two terms dominate its diagnosis. Where the geostrophic wind **speeds up or slows down along its direction** — a jet entrance or exit region — the Coriolis force that balances the old speed no longer balances the new, and the ageostrophic flow crosses the isobars toward low pressure where the wind accelerates and away from it where the wind decelerates, closing a horizontal circulation with the pressure gradient. Where warm or cold air is **advected**, the thermal wind relation demands that $\mathbf{v}_g$ change with height to match the changing temperature field, and the ageostrophic flow that accomplishes this change is directed across the isotherms — the geostrophic wind blows **across** temperature contours only where it is changing with height. Divergence and convergence of $\mathbf{v}_a$ then force vertical motion at centimetre-per-second speeds, and those centimetres per second, integrated over a day, lift the cloud decks and set the precipitation.
:::

::: example Jet-streak circulation and the price of a few centimetres {#ex-jetstreak}
In the left-front quadrant of a jet entrance region, ageostrophic convergence at $250\ \mathrm{hPa}$ removes mass from a column whose lower boundary is $10\ \mathrm{km}$ below, with a divergence pattern that decreases linearly to zero at the surface. Estimate the vertical velocity at $500\ \mathrm{hPa}$ if the upper-level convergence is $-1\times10^{-5}\ \mathrm{s^{-1}}$ (i.e. $\partial w/\partial z \approx 10^{-5}\ \mathrm{s^{-1}}$ near the tropopause), and the precipitation this implies if half the ascending air condenses.
::: solution
Integrating $\partial w/\partial z$ downward from $w \approx 0$ at the tropopause over the $5\ \mathrm{km}$ to $500\ \mathrm{hPa}$ gives $w \approx 10^{-5}\times5\times10^{3} = 5\times10^{-2}\ \mathrm{m\,s^{-1}} = 5\ \mathrm{cm\,s^{-1}}$. Over a day this lifts a $4\times10^{5}\ \mathrm{m}$-thick layer of air — the whole depth of the cloud-bearing troposphere several times over. With mid-tropospheric specific humidity $q \approx 5\ \mathrm{g\,kg^{-1}}$ and density $0.6\ \mathrm{kg\,m^{-3}}$, the upward water-flux is $w\rho q \approx 0.05\times0.6\times0.005 = 1.5\times10^{-4}\ \mathrm{kg\,m^{-2}\,s^{-1}}$, and half of it condensing gives $6\times10^{-5}\ \mathrm{kg\,m^{-2}\,s^{-1}} = 5\ \mathrm{mm}$ per day: steady moderate rain from an ageostrophic wind too weak to feel. This is the quantitative content of the slogan that the balanced wind carries the air and the unbalanced wind carries the rain.
:::
:::

## Geostrophic adjustment

::: proposition Geostrophic adjustment {#prop-adjustment}
Impose an unbalanced mass distribution — a slab of dense air dropped into a balanced atmosphere — and the system cannot simply settle into a new geostrophic state, because mass and momentum must be conserved together. The linearised rotating equations show that the initial imbalance splits: a fraction of the energy radiates away as **inertia-gravity waves** at frequency $\ge f$, and the remainder relaxes to a new balanced state whose along-frontal current is in geostrophic balance with the redistributed mass. The adjustment proceeds at the rate set by the **buoyancy parameter** $N H / f L$ (with $N$ the Brunt–Väisälä frequency, $H$ the depth, $L$ the horizontal scale): large horizontal scales and deep layers adjust quickly and mostly by mass spreading; small scales adjust slowly and mostly by wave radiation. The adjustment time is of order $1/f \approx 2.7\ \mathrm{h}$ at $45\ ^\circ\mathrm{N}$ — the reason the atmosphere is observed to be nearly balanced: imbalances are not damped by friction but **radiated away** as gravity waves, and the charts look balanced because imbalance is the transient, not the rule. The same $1/f$ clock sets the time a forecast model needs to spin up its balance, the lifetime of the ageostrophic burst behind a front, and the rhythm of the nocturnal boundary-layer oscillation.
:::

::: example How much of the imbalance escapes as waves? {#ex-adjustment}
A model initialisation places a $1\ \mathrm{K}$ temperature anomaly (a dense slab) in a layer $H = 2\ \mathrm{km}$ deep over $L = 50\ \mathrm{km}$ at $45\ ^\circ\mathrm{N}$ with $N = 10^{-2}\ \mathrm{s^{-1}}$. Compute the Rossby radius of deformation $L_R = NH/f$ and say whether the mass anomaly adjusts mostly by spreading into a geostrophic current or by radiating waves.
::: solution
$$
L_R = \frac{NH}{f} = \frac{10^{-2}\times2\times10^{3}}{1.03\times10^{-4}} \approx 194\ \mathrm{km}.
$$
The disturbance scale $L = 50\ \mathrm{km}$ is **smaller** than $L_R$, so rotation is weak over such short distances: the slab cannot find a geostrophic state that conserves its mass and momentum, and most of the energy leaves as inertia-gravity waves while the remnant current is trapped to the anomaly's own edge. For $L \gg L_R$ the opposite holds — the anomaly spreads until it is geostrophically balanced over its full width. The Rossby radius is thus the atmosphere's grain size: features smaller than $\sim 200\ \mathrm{km}$ at convective depths are inherently unbalanced, which is one deep reason why the unfiltered, nonhydrostatic dynamics of storms is qualitatively different from the balanced dance of the synoptic chart, and why data assimilation must filter small-scale increments rather than trust them.
:::
:::

## Frontogenesis: how balance sharpens a front

::: definition Frontogenesis and the deformation force {#def-frontogenesis}
A **front** is a zone where the horizontal temperature gradient is concentrated, and its intensity is measured by the rate of change of the gradient following the wind. Applying the wind to $\partial T/\partial y$ and rearranging gives the frontogenesis function
$$
\frac{\mathrm{D}}{\mathrm{D}t}\frac{\partial T}{\partial y} = -\mathbf{v}\cdot\nabla_h\frac{\partial T}{\partial y}
- \underbrace{\left(\frac{\partial u}{\partial y}\frac{\partial T}{\partial x} + \frac{\partial v}{\partial y}\frac{\partial T}{\partial y}\right)}_{\text{deformation: frontogenetic}}
- \frac{\partial w}{\partial y}\frac{\partial T}{\partial z} + K\frac{\partial^{2}}{\partial y^{2}}\frac{\partial T}{\partial y}.
$$
The first term merely advects the gradient; the third (the transverse ageostrophic circulation acting on the strong static stability) and the fourth (diffusion) destroy it; but the **deformation term** — the stretching-and-shearing part of the flow — concentrates the gradient, like a napkin folded and folded again: an along-front deformation of $10^{-5}\ \mathrm{s^{-1}}$ acting across a frontal zone shrinks its width by $e$ in $28$ hours. Frontogenesis is thus a competition between the deformation that sharpens and the indirect circulation that relaxes, and the front's observed width of $\sim 50\ \mathrm{km}$ is the equilibrium between them. Because the thermal wind ties the along-front current to the cross-front gradient, sharpening the gradient spins up the jet: fronts and jets are not neighbours on the chart but each other's cause and effect.
:::

::: example Deformation sharpens a front {#ex-frontogen}
A pre-frontal zone has a temperature change of $6\ \mathrm{K}$ across $600\ \mathrm{km}$ and is stretched by an along-front deformation $D = 1\times10^{-5}\ \mathrm{s^{-1}}$ that shrinks its width exponentially while conserving the total contrast. Find the $e$-folding time and the width and gradient after 24 hours, and the thermal wind the sharpened zone supports between surface and $3\ \mathrm{km}$ ($\bar T = 273\ \mathrm{K}$, $45\ ^\circ\mathrm{N}$).
::: solution
The width shrinks as $e^{-t/\tau}$ with $\tau = 1/D = 10^{5}\ \mathrm{s} = 28\ \mathrm{h}$, so after $24\ \mathrm{h}$ the width is $600\,e^{-24/28} = 255\ \mathrm{km}$ and the gradient has grown from $1.0$ to $2.4\ \mathrm{K}$ per $100\ \mathrm{km}$. The thermal wind between the surface and $3\ \mathrm{km}$ is
$$
V_T = \frac{g\,\Delta z}{f\bar T}\left|\nabla_h\bar T\right| = \frac{9.81\times3000}{1.03\times10^{-4}\times273}\times2.4\times10^{-5} = 25\ \mathrm{m\,s^{-1}} .
$$
A day of deformation has built the core of a low-level jet and steepened the surface front to a strength that forces strong ascent along it — the chain that links the deformation field on an upper chart to the squall line that follows it.
:::
:::

::: warning The thermal wind is not a wind, ageostrophic does not mean unimportant, and thickness is not height
Five confusions this subject punishes. **The thermal wind is a difference, not a flow**: no anemometer measures it; it is the vector by which one geostrophic wind differs from another, and calling it "the wind of the temperature gradient" invites the nonsense that warm air "flows" down-gradient. **Ageostrophic is not negligible**: at $\mathrm{Ro} = 0.1$ the ageostrophic wind is a tenth of the wind but essentially all of the vertical motion, frontogenesis, and tracer crossing of jets — the balanced wind is the denominator and the unbalanced wind is the numerator of weather. **Thickness is not height**: the $1000$–$500\ \mathrm{hPa}$ thickness is a property of a layer, and a thick layer means a warm layer, not a mountain; constant-pressure charts are thickness charts in disguise. **Veering with height is not turning with time**: a veering profile (clockwise with height) marks warm advection; a veering **time series at one height** marks warm advection past the station only if the vertical structure is known — the two uses of the word are different diagnostics. **And fronts are not boundaries between two air masses in the textbook sense of sharp edges**: they are the finite-width, ageostrophically-circulating, deformation-maintained transition zones described above, and the "line on a map" is the surface trace of a tilted, three-dimensional structure that reaches to the jet.
:::

::: history
The thermal wind relation came out of the **Bergen school**: **Vilhelm Bjerknes** set the programme of numerical forecasting in 1904 and, with **T. Bergeron** and **J. Holmboe**, built the polar-front theory of cyclones around 1919, in which the vertical shear of the wind over the frontal temperature contrast was the mechanism of the whole life cycle. The existence of strong upper westerlies was proved in 1939–1944 by instrumented high flights and the trans-Pacific wind statistics compiled by aviation meteorological services, and **C.-G. Rossby**'s 1941 paper with the Chicago school identified the jet stream quantitatively as the thermal wind of the polar front, with its position and seasonal migration following the temperature contrast. **J. G. Charney**'s quasi-geostrophic scaling of 1947 and **C.-G. Rossby**'s 1939 theory of planetary waves made the balanced-flow hierarchy of this lesson the standard dynamics of the synoptic system. Frontogenesis theory in its modern form — the balance between deformation that sharpens and the indirect circulation that relaxes — was developed by **N. Pettersen** in the 1950s and systematised in the diagnostic studies of frontal zones and aircraft campaigns of the 1970s and 1980s, which established the observed frontal widths of tens of kilometres and the low-level jets embedded in them.
:::

The equations these balances rest on are derived in [[atmospheric-dynamics/equations-of-motion]], the vorticity language that recasts them in [[atmospheric-dynamics/vorticity]], the boundary-layer friction that backs the wind across the isobars in [[atmospheric-dynamics/boundary-layer]], the cyclones whose life cycle is the ageostrophic circulation writ large in [[meteorology/fronts-cyclones]], the jet streams in [[atmospheric-dynamics/general-circulation]], the buoyancy oscillations that radiate the imbalance in [[meteorology/stability]], the fronts as hazards in [[natural-hazards/storms]], and the observed temperature gradients they act on in [[meteorology/atmosphere-structure]].

::: quiz
The geostrophic wind at a station veers with height through the lowest 3 km. The thermal wind tells you the air column is experiencing
- [ ] cold advection, because veering means backing isotherms.
- [x] warm advection, because the wind turns toward the warm-air direction with height.
- [ ] nothing — veering says nothing about advection.
- [ ] frontolysis only.
::: solution
With warm air to the left of the thermal wind, a wind that turns clockwise with height is turning **toward** the direction that would advect warm air in: the geostrophic wind at height blows more strongly from the warm side, which is exactly warm advection. Operationally, "veer with height, warm advection; back with height, cold advection" is the sounding-based version of the thermal wind relation, and the ageostrophic circulation forced by the along-front changes of this advection is what lifts the overlying cloud.
:::
:::

::: summary
- The thermal wind — the shear of the geostrophic wind — is proportional to the mean horizontal temperature gradient: $f\,\partial\mathbf{v}_g/\partial z = -g\,\mathbf{k}\times\nabla_h\bar T/\bar T$.
- The relation is a compatibility condition, not a new balance: a baroclinic atmosphere cannot have a height-independent geostrophic wind.
- The mid-latitude westerly jet is the thermal wind of the equator-to-pole contrast; $2\ \mathrm{K}$ per $100\ \mathrm{km}$ supports $\sim 7.5\ \mathrm{m\,s^{-1}}$ of shear per kilometre.
- The ageostrophic wind is a tenth of the wind but carries all the vertical motion: jet-streak divergences force centimetres per second of ascent, enough for millimetres per day of rain.
- Geostrophic adjustment at the $1/f$ clock radiates imbalance as inertia-gravity waves and leaves balanced flow — the reason charts look balanced; the Rossby radius $L_R = NH/f$ separates the balanced from the wave-dominated regimes.
- Fronts are sharpened by deformation and widened by the ageostrophic circulation they force; their equilibrium width and the jets they support are set by that balance.
:::

## Exercises

::: exercise Thermal wind of a layer {level=1 check="19"}
At $45\ ^\circ\mathrm{N}$ with $\bar T = 255\ \mathrm{K}$, find the thermal wind (in $\mathrm{m\,s^{-1}}$) across the $1000$–$500\ \mathrm{hPa}$ layer (thickness $5.2\ \mathrm{km}$) for a mean temperature gradient of $1\ \mathrm{K}$ per $100\ \mathrm{km}$. (Enter to the nearest $\mathrm{m\,s^{-1}}$.)
::: solution
$V_T = g\Delta z\,|\nabla\bar T|/(f\bar T) = 9.81\times5200\times10^{-5}/(1.03\times10^{-4}\times255) = 19\ \mathrm{m\,s^{-1}}$. Nineteen metres per second of thermal wind per kelvin per hundred kilometres is the conversion factor to memorise for reading upper charts.
:::
:::

::: exercise Direction {level=1 check="westerly"}
Cold air lies to the north, warm to the south, at $45\ ^\circ\mathrm{N}$. Is the thermal wind easterly or westerly? (Enter the direction as one word, lower case.)
::: solution
**Westerly.** The thermal wind blows with warm air to the left, so with the warm-air side to the south the thermal wind points eastward — from the west. This is the reason the mid-latitude upper flow is westerly and the surface easterlies of the trade and polar-belt systems are confined to the shallow friction layer.
:::
:::

::: exercise Vertical motion from divergence {level=1 check="5"}
Upper-level convergence of $1\times10^{-5}\ \mathrm{s^{-1}}$ at $250\ \mathrm{hPa}$ overlies a column $10\ \mathrm{km}$ deep in which the divergence decreases linearly to zero at the surface. Find the vertical velocity at $500\ \mathrm{hPa}$ in $\mathrm{cm\,s^{-1}}$. (Enter the number.)
::: solution
$\partial w/\partial z \approx 10^{-5}\ \mathrm{s^{-1}}$ near the top; integrating over the $5\ \mathrm{km}$ between $250$ and $500\ \mathrm{hPa}$ gives $w \approx 5\ \mathrm{cm\,s^{-1}}$. Ascending air at this rate over a day lifts a cloud-depth of air several times and produces light-to-moderate precipitation — the quantitative bridge between the divergence field on an upper chart and the rain gauge.
:::
:::

::: exercise Jet depth {level=2 check="8"}
If the observed thermal wind between the surface and the jet core at $200\ \mathrm{hPa}$ is $60\ \mathrm{m\,s^{-1}}$ and the cross-jet temperature gradient is $2\ \mathrm{K}$ per $100\ \mathrm{km}$ with $\bar T = 255\ \mathrm{K}$ at $45\ ^\circ\mathrm{N}$, find the effective depth of the sheared layer, in km. (Enter to one decimal.)
::: solution
$\Delta z = V_T f\bar T/(g|\nabla\bar T|) = 60\times1.03\times10^{-4}\times255/(9.81\times2\times10^{-5}) = 8.1\ \mathrm{km}$. The "effective depth" is less than the full troposphere because the strongest gradient sits in the jet's own core — the self-consistency of the thermal wind is what makes radiosonde ascents through jets show the tightest temperature contrasts exactly where the shear is largest.
:::
:::

::: exercise Adjustment time {level=2 check="2.7"}
Find the geostrophic adjustment time $1/f$ in hours at $45\ ^\circ\mathrm{N}$. (Enter to one decimal.)
::: solution
$1/f = 1/1.03\times10^{-4} = 9.7\times10^{3}\ \mathrm{s} = 2.7\ \mathrm{h}$. Fast enough that the synoptic atmosphere re-balances within hours of any forcing change, slow enough that frontal and convective bursts with lifetimes under $f^{-1}$ are inherently unbalanced — the same number explains both the smoothness of analyzed charts and the raggedness of storm-scale observations.
:::
:::

::: exercise Rossby radius {level=2 check="194"}
Compute the Rossby radius of deformation $L_R = NH/f$ in km for $N = 10^{-2}\ \mathrm{s^{-1}}$, $H = 2\ \mathrm{km}$ at $45\ ^\circ\mathrm{N}$. (Enter to the nearest km.)
::: solution
$L_R = 10^{-2}\times2\times10^{3}/1.03\times10^{-4} = 194\ \mathrm{km}$. Disturbances narrower than this are wave-dominated and radiate; broader ones adjust to balance. At $H = 10\ \mathrm{km}$ (full troposphere) the radius exceeds $900\ \mathrm{km}$ — synoptic systems are comfortably in the balanced regime, and the whole quasi-geostrophic edifice rests on that inequality.
:::
:::

::: exercise Frontal sharpening {level=2 check="324"}
A $500\ \mathrm{km}$-wide frontal zone with a $5\ \mathrm{K}$ contrast is compressed by a deformation of $1\times10^{-5}\ \mathrm{s^{-1}}$ for 12 hours, the contrast being conserved. Find the final width in km. (Enter to the nearest km.)
::: solution
Width $= 500\,e^{-12\times3600\times10^{-5}} = 500\,e^{-0.432} = 324\ \mathrm{km}$. The gradient grows by the reciprocal factor $1/0.649 = 1.54$ in half a day, and with it the thermal wind the front can support — the runaway that makes mature fronts so sharp and their jets so tight, checked daily by the radiosonde releases that show the tightest temperature contrasts exactly where the deformation axes lie.
:::
:::

::: exercise Deriving the thermal wind {level=3 check="7.5"}
Starting from the geostrophic and hydrostatic equations in pressure coordinates, derive $\partial v_g/\partial z = (g/f\bar T)\,\partial\bar T/\partial x$, and evaluate the shear in $\mathrm{m\,s^{-1}\,km^{-1}}$ for $|\partial\bar T/\partial x| = 2\ \mathrm{K}$ per $100\ \mathrm{km}$, $\bar T = 255\ \mathrm{K}$, $45\ ^\circ\mathrm{N}$. (Enter to one decimal.)
::: solution
In pressure coordinates the horizontal momentum equation keeps its constant-density form, $f v_g = \partial\Phi/\partial x$ with $\Phi$ the geopotential, and hydrostatics reads $\partial\Phi/\partial p = -1/\rho$. Then
$$
f\frac{\partial v_g}{\partial p} = \frac{\partial}{\partial x}\frac{\partial\Phi}{\partial p} = -\frac{\partial}{\partial x}\frac{1}{\rho} = -\frac{R_d}{p}\frac{\partial T}{\partial x},
$$
using the ideal gas law at fixed pressure. Converting $\partial/\partial p = -(\rho g)^{-1}\partial/\partial z$ by hydrostatics and cancelling $\rho = p/R_dT$ gives $\partial v_g/\partial z = (g/fT)\,\partial T/\partial x$, and the companion equation with $u_g$ and $y$ interchanged. Numerically,
$$
\frac{\partial V_g}{\partial z} = \frac{9.81\times2\times10^{-5}}{1.03\times10^{-4}\times255} = 7.5\times10^{-3}\ \mathrm{s^{-1}} = 7.5\ \mathrm{m\,s^{-1}\ per\ km}.
$$
The single most-used number in upper-air analysis, and the reason every radiosonde release is an internal consistency test: the measured shear must match the measured temperature gradient, and when they disagree, one of the two instrument chains has failed.
:::
:::
