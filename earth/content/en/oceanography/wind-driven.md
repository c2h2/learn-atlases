A wind blowing on a featureless rotating ocean would drive a current **to the right of the wind** in the Northern Hemisphere, at an angle that **changes with depth**, in a layer **fifty metres** thick, and the resulting **depth-integrated** transport would be **exactly perpendicular** to the wind. That single surprising result — **Ekman**'s, in **1905**, written to explain why Nansen's ice was drifting **45° to the right** of the wind — together with the **β effect**, explains the existence, the **asymmetry** and the **intensity** of the great ocean currents, and it does so with four equations.

## The Ekman layer

::: definition The Ekman spiral and the Ekman transport {#def-ekman}
In the surface layer the vertical diffusion of momentum balances the Coriolis acceleration,
$$
-fv = A_V\frac{\partial^{2}u}{\partial z^{2}}, \qquad fu = A_V\frac{\partial^{2}v}{\partial z^{2}}, \qquad \left(\rho A_V\frac{\partial u}{\partial z},\ \rho A_V\frac{\partial v}{\partial z}\right)_{z=0} = (\tau_x, \tau_y),
$$
with the solution, taking $x$ along the wind,
$$
u = \frac{\tau_x}{\rho\sqrt{2A_V f}}\,e^{-z/D_E}\cos\!\left(\frac{z}{D_E} - \frac{\pi}{4}\right), \qquad
v = -\frac{\tau_x}{\rho\sqrt{2A_V f}}\,e^{-z/D_E}\sin\!\left(\frac{z}{D_E} - \frac{\pi}{4}\right),
$$
with the Ekman layer depth
$$
D_E = \pi\sqrt{\frac{2A_V}{f}} \approx 40\text{–}100\ \mathrm{m}.
$$
The current veers with depth — 45° to the right at the surface, 180° (opposite the wind) at $z = D_E$ — the Ekman spiral that Nansen's Fram ice and the US Coast Guard lifeboats in the 1980 Exxon Valdez spill both found, and that a drifting surface buoy follows at 20–40° to the wind rather than the 45° of theory, because the real layer is wind-waves, Langmuir circulation and diurnal convection rather than a constant $A_V$.

Integrating over the layer removes $A_V$ entirely and gives the **Ekman transport**, the single most useful result in the subject:
$$
\boxed{\;M_E = \int_{-D_E}^{0}\mathbf{u}\,\mathrm{d}z = \frac{\hat{\mathbf{z}}\times\boldsymbol{\tau}}{\rho f}\;}
$$
— a transport **exactly $90°$ to the right of the wind** in the Northern Hemisphere, of magnitude $\tau/\rho f$, **independent of viscosity, of the mixed-layer depth and of the stratification**. For $\tau = 0.1\ \mathrm{N\,m^{-2}}$ and $f = 10^{-4}\ \mathrm{s^{-1}}$ it is $0.1/(1025\times10^{-4}) = 976\ \mathrm{m^{2}\,s^{-1}}$ per metre of width, or **one sverdrup per hundred kilometres** — small per metre, and **enormous** over a **ten-thousand-kilometre** ocean basin.

Because the transport **varies** with the wind, it must be **diverged**, and the divergence appears as **vertical motion** at the base of the layer:
$$
w_E = \frac{1}{\rho}\,\nabla\times\boldsymbol{\tau}\cdot\hat{\mathbf{z}} \times\frac{1}{f} \quad\Longrightarrow\quad w_E = \frac{\mathrm{curl}\,\boldsymbol{\tau}}{\rho f},
$$
of order **$10$–$30\ \mathrm{m\,yr^{-1}}$** — a **fifth** of a millimetre a second, invisible to any instrument, and **the mechanism that fills the entire thermocline** and **drives the global overturning**.
:::

::: definition Sverdrup balance and western intensification {#def-sverdrup}
Below the Ekman layer the flow is geostrophic and frictionless, and conserving potential vorticity gives the Sverdrup relation for the depth-integrated meridional transport $M$:
$$
\beta\,M = \frac{1}{\rho}\left(\frac{\partial\tau_y}{\partial x} - \frac{\partial\tau_x}{\partial y}\right) = \frac{\mathrm{curl}\,\boldsymbol{\tau}}{\rho}, \qquad \beta = \frac{\mathrm{d}f}{\mathrm{d}y} = \frac{2\Omega\cos\phi}{a},
$$
so the interior transport is set directly by the wind stress curl and by nothing else — no viscosity, no bottom friction, no coastline shape. In the subtropical gyres the negative curl of the trade winds and westerlies drives equatorward interior transport of $10$–$30\ \mathrm{Sv}$, which must be returned somewhere.

It is returned in a **western boundary current**, and this is the discovery of **Stommel** (1948) and **Munk** (1950). Because $f$ **vanishes** at the equator, the **β term** cannot balance the frictional term there, and the return flow is **squeezed** into a boundary layer of width
$$
\delta_M = \left(\frac{A_H}{\beta}\right)^{1/3} \approx 10\text{–}100\ \mathrm{km} \quad\text{with } A_H \sim 10^{4}\ \mathrm{m^{2}\,s^{-1}},
$$
an order of magnitude narrower than the basin. The asymmetry is not optional: reversing the sign of $\beta$ — that is, going to the Southern hemisphere — moves the intense current to the west again, which is why the Agulhas, the Brazil, the East Australian and the Kuroshio are all western and the California, Canary, Benguela and Peru currents are all broad, slow and cold. The prediction was made in 1947 from two equations, and the observed Gulf Stream width of about 100 km agrees with the Munk scaling to within a factor of a few — one of the cleanest successes in geophysics.

The gyre is not, however, a pipe: the wind-driven Sverdrup transport of $10$–$30\ \mathrm{Sv}$ is less than half the observed transport of the Gulf Stream at its peak, and the difference is recirculation — eddies pinched off at meanders, ring formation, and potential-vorticity conservation in a flow that cannot cross the θ contours of the interior. The modern view is that the gyre's total transport is set by the wind but its structure is set by eddies, and that the eddy field is what makes the thermocline of the subtropical gyre ventilate in the wind-driven thermocline pattern of Luyten, Pedlosky and Stewens (1983).
:::

::: example Ekman transport and Ekman pumping {#ex-ekman}
A **zonal** wind stress of $\tau_x = 0.12\ \mathrm{N\,m^{-2}}$ blows at **30 °N** ($f = 4.2\times10^{-5}\ \mathrm{s^{-1}}$) and **decays to zero over 3000 km** to the north. Find the **Ekman transport** per metre of width, its **direction**, and the **Ekman pumping velocity** at the base of the layer.
::: solution
$$
M_E = \frac{\tau_x}{\rho f} = \frac{0.12}{1025\times4.2\times10^{-5}} = 2780\ \mathrm{m^{2}\,s^{-1}},
$$
directed $90°$ to the right of the wind — for an eastward wind in the Northern hemisphere that is northward, since $M_E = \hat{\mathbf{z}}\times\boldsymbol{\tau}/\rho f$ and $\hat{\mathbf{z}}\times\hat{\mathbf{x}} = \hat{\mathbf{y}}$. The stress curl is
$$
\mathrm{curl}\,\boldsymbol{\tau} = -\frac{\partial\tau_x}{\partial y} = \frac{0.12}{3\times10^{6}} = 4.0\times10^{-8}\ \mathrm{N\,m^{-3}},
$$
and
$$
w_E = \frac{\mathrm{curl}\,\boldsymbol{\tau}}{\rho f} = \frac{4.0\times10^{-8}}{1025\times4.2\times10^{-5}} = 9.3\times10^{-7}\ \mathrm{m\,s^{-1}} = 29\ \mathrm{m\,yr^{-1}} .
$$
Upwelling of twenty-nine metres a year — a fifty-thousandth of a millimetre a second.

The 2780 m² s⁻¹ is 2.8 Sv per thousand kilometres of width, and integrated across a ten-thousand-kilometre ocean it is a transport comparable to the Gulf Stream — which is the sense in which the wind, and not the thermohaline circulation, moves most of the ocean's water. The direction is the part every student gets wrong and every mariner used: a sailing ship's leeway, a drifting buoy's track and an oil slick's trajectory all lie to the right of the wind in the Northern hemisphere, and the Exxon Valdez spill of 1989 spread against the forecast precisely because the Ekman and windage components were underweighted.

The 29 m yr⁻¹ is the number that fills the thermocline. Positive stress curl in the subtropical gyre drives downwelling, and negative curl near the equator and along the coasts drives upwelling — the eastern boundary upwelling that supports the world's richest fisheries, the equatorial upwelling that makes the cold tongue, and the subpolar upwelling that brings nutrients to the surface. Multiply 29 m yr⁻¹ by the $7\times10^{13}\ \mathrm{m^{2}}$ of the world's subtropical gyres and the downwelling is $2\times10^{15}\ \mathrm{m^{3}\,yr^{-1}}$, or $6\times10^{7}\ \mathrm{m^{3}\,s^{-1}}$ — sixty sverdrups, as much water as the entire deep overturning circulation moves. That is the scale of the wind-driven pump, and it is why the thermocline is not a boundary but a conveyor: water subducted in the gyre at twenty metres a year becomes the central water masses, crosses the equator in decades, and upwells in the Indian and Southern oceans centuries later.
:::
:::

::: definition The gyres, the boundary currents and the circumpolar current {#def-gyres}
$$
\begin{array}{l|c|c|l}
\text{current} & \text{transport (Sv)} & \text{width (km)} & \text{character} \\ \hline
\textbf{Gulf Stream} & 30\text{--}150\ \text{(max at Hatteras)} & 80\text{--}120 & \text{fastest surface current, } 2\ \mathrm{m\,s^{-1}} \\
\textbf{Kuroshio} & 40\text{--}60 & 80\text{--}100 & \text{eddy-shedding, extends to } 40\ \mathrm{^\circ N} \\
\textbf{Agulhas} & 70 & 150 & \text{strongest in the Southern Hemisphere} \\
\textbf{Brazil / EAC / Mozambique} & 25\text{--}40 & 100\text{--}200 & \text{western boundary} \\
\textbf{Antarctic Circumpolar} & 130\text{--}150 & 2000\text{--}10{,}000 & \text{the largest current on Earth} \\
\textbf{California / Benguela / Peru} & 5\text{--}10\ \text{(broad)} & 500\text{--}1000 & \text{eastern, slow, upwelling}
\end{array}
$$
Four features define the system. The gyres are deep: the subtropical gyre's thermocline slopes from 200 m at 10 ° to 800 m at 40 °, a sea-surface slope of one part in $10^{5}$ — the dynamic topography that a satellite altimeter measures to 3 cm and that is the only synoptic view of the geostrophic field. The boundary currents are unstable: the Gulf Stream pinches off rings of 200 km diameter and six-month lifetime, the Kuroshio large-meanders for years and shifts its extension by 200 km, and the eddy kinetic energy in the recirculation gyres exceeds that of the current itself — the gyre is a turbulent jet, not a pipe. The eastern boundaries are where the life is: the broad, slow, equatorward eastern boundary currents diverge from the coast under the Ekman transport, upwell cold, nutrient-rich water from 100–300 m, and support a fifth of the world's marine fisheries and a third of the ocean's new production on one per cent of its area. And the Southern Ocean has no boundary: at 50–60 °S there is no continent to block the flow, so the wind stress drives a circumpolar transport of 130–150 Sv — ten Gulf Streams — through Drake Passage, and the current is limited not by friction but by form drag on topography and by eddy saturation.

The Antarctic Circumpolar Current is also the cleanest application of the theory. Balancing the zonal wind stress against the meridional gradient of Coriolis force across the gap gives
$$
M_{\mathrm{ACC}} \approx \frac{2\pi a\cos\phi\;\tau_x}{\rho\,\Delta f},
$$
with $\tau_x = 0.15\ \mathrm{N\,m^{-2}}$, $\phi = 50\mathrm{^\circ}$ and $\Delta f$ the Coriolis difference across the current, and the result is $100$–$150\ \mathrm{Sv}$ — the observed value, obtained from meteorology and geometry alone.
:::

::: example Sverdrup transport and the gyre {#ex-sverdrup}
The North Pacific subtropical gyre has a mean wind stress curl of $2\times10^{-11}\ \mathrm{N\,m^{-3}}$ over a basin 12,000 km wide at $\beta = 2\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$. Estimate the Sverdrup interior transport, and explain why the observed transport at 30 °N is four times larger.
::: solution
$$
M = \frac{\mathrm{curl}\,\boldsymbol{\tau}}{\rho\,\beta} = \frac{2\times10^{-11}}{1025\times2\times10^{-11}} = 9.8\times10^{-4}\ \mathrm{m^{2}\,s^{-1}}
$$
per metre of width, and across the basin
$$
\mathcal{M} = 9.8\times10^{-4}\times1.2\times10^{7} = 1.2\times10^{4}\ \mathrm{m^{3}\,s^{-1}} = 12\ \mathrm{Sv}.
$$
The observed transport of the subtropical gyre at 30 °N is 40–55 Sv.

The factor of four is recirculation, and it is the central unsolved problem of wind-driven circulation. The Sverdrup relation gives only the interior, potential-vorticity-conserving flow; the western boundary current must cross the β contours to return, and in doing so it sheds eddies that drag extra water around the recirculation gyres on either side. Henry Stommel (Stommel) and Kirk Bryan (Bryan) showed in the 1970s that the transport at a given latitude is roughly constant between the subtropical gyre and its recirculation region, and the numerical-modelling work of the 1990s established that the eddy fluxes are what close the potential-vorticity budget that Sverdrup cannot.

The practical consequence is that the wind sets the transport but not the structure, and that climate models which resolve the eddy field give substantially different gyre transports from coarse models forced by the same wind. It is also why the observed strengthening of the wind stress curl over the twentieth century — a 5–10 per cent intensification of the subtropical cells — has produced a measurable shoaling of the thermocline in the subtropics and a poleward shift of the wind belts, both of which are Argo and altimeter observations of the first rank.
:::
:::

::: widget plot
f: 1.5*exp(-x*x/2500)
x: -120, 120
y: 0, 1.6
labels: u\ (\mathrm{m\,s^{-1}})
caption: A Gulf Stream velocity cross-section, drawn as a baroclinic jet of $1.5\ \mathrm{m\,s^{-1}}$ surface speed and $50\ \mathrm{km}$ half-width. The shape is the thermal wind: the front between the warm, salty Slope Sea water and the cold, fresh Labrador or Gulf Water is a horizontal density gradient, and geostrophy requires that the current shear with depth until the density contrast vanishes at 1000–1500 m. The width is set by the Munk scaling and by the first Rossby radius of deformation, $R_d = NH/f \approx 10$–$20\ \mathrm{km}$, and the meanders that break off from this jet are 200-km rings that carry warm-core water 800 km into the Sargasso and cold-core water 800 km into the slope, transporting heat, salt, carbon and fish larvae across the gyre in months rather than the decades the mean flow would take. The jet is unstable by construction: its shear and frontal potential vorticity gradients supply energy to meanders at a rate that makes the eddy field of the Gulf Stream extension one of the most energetic regions of the world ocean.
:::

::: example The thermal wind and the Gulf Stream {#ex-tw}
Across the **Gulf Stream** front the density falls by $0.5\ \mathrm{kg\,m^{-3}}$ over **100 km** going **north**, and the **density** contrast persists to **1000 m**. Take $f = 9\times10^{-5}\ \mathrm{s^{-1}}$ and $\rho_0 = 1025\ \mathrm{kg\,m^{-3}}$. Find the **change in the along-front geostrophic velocity** from the surface to **1000 m**, and the **surface speed** if the current vanishes at depth.
::: solution
The **thermal wind** relation, integrated over a layer of constant density contrast, is
$$
\Delta v = \frac{g}{\rho_0 f}\,\frac{\Delta\rho}{\Delta x}\,\Delta z
= \frac{9.81}{1025\times9\times10^{-5}}\times\frac{0.5}{10^{5}}\times1000 = 0.53\ \mathrm{m\,s^{-1}} .
$$
If the current is zero at 1000 m, the surface speed is $0.53\ \mathrm{m\,s^{-1}}$; if instead the deep flow is $0.2\ \mathrm{m\,s^{-1}}$ in the opposite direction, the surface speed is $0.73\ \mathrm{m\,s^{-1}}$.

The 0.53 m s⁻¹ is a fifth of the observed Gulf Stream surface speed of $1.5$–$2.0\ \mathrm{m\,s^{-1}}$, and the difference is not an error in the physics but in the section: the density contrast extends below 1000 m to 2000 m in the real current, and the reference level at which the flow is assumed zero is deeper than the 1000 m used here. Extending the integration to 2000 m gives $1.1\ \mathrm{m\,s^{-1}}$, and adding the barotropic component carried by the wind and the overturning reaches the observed value.

The method is the whole of geostrophic oceanography. A CTD section measures density, the thermal wind gives the shear, and one assumed reference-level velocity gives the absolute profile — which is why the choice of reference level, and the inverse-method and current-meter alternatives to it, have generated fifty years of methodological literature. It is also why satellite altimetry revolutionised the subject: an altimeter measures the dynamic topography $\eta$ directly, and
$$
v_g = \frac{g}{f}\frac{\partial\eta}{\partial x}
$$
gives the absolute surface current with no reference level at all — a 10-cm sea-surface step over 100 km at $f = 10^{-4}$ is a $0.1\ \mathrm{m\,s^{-1}}$ current, and the altimeter's 3-cm accuracy resolves 3 cm s⁻¹.
:::
:::

::: example The Gulf Stream's transport from its velocity profile {#ex-transport}
A **Gulf Stream** section at **75 °W** has a surface velocity $u(y) = 1.5\,e^{-y^{2}/2500}\ \mathrm{m\,s^{-1}}$ with **$y$ in kilometres**, and the profile keeps its **shape** to a depth of **800 m**, below which the flow is negligible. Estimate the **volume transport**.
::: solution
The **width** integral of a Gaussian is $\int_{-\infty}^{\infty}u\,\mathrm{d}y = u_0\,a\sqrt{\pi}$ with $a = 50\ \mathrm{km}$, so
$$
\int u\,\mathrm{d}y = 1.5\times50\times10^{3}\times\sqrt{\pi} = 1.33\times10^{5}\ \mathrm{m^{2}\,s^{-1}},
$$
and over an 800-m effective depth
$$
\mathcal{M} = 1.33\times10^{5}\times800 = 1.1\times10^{8}\ \mathrm{m^{3}\,s^{-1}} = 110\ \mathrm{Sv}.
$$
The observed maximum at 75 °W is 130–150 Sv, so a Gaussian and an e-folding depth reproduce the largest current in the Western hemisphere to within twenty per cent.

The lesson is in the sensitivity. The transport scales as $u_0 a h$, and the three quantities are measured to 10 per cent, 30 per cent and a factor of two respectively — the width because the meanders smear the jet in a time-average, and the depth because the baroclinic shear deepens and shoals with the season and the ring field. This is why Gulf Stream transport estimates published over sixty years range from 30 to 150 Sv: not disagreement about the physics but about where the section was cut, when, and how deep the reference level was set.

The **modern** answer comes from **two** independent routes: **moored** current-meter **arrays** that span the current and integrate the transport continuously, and **satellite altimetry** combined with hydrographic sections to fix the depth dependence of the transport. Both give a mean of **85–95 Sv** at 75 °W with a standard deviation of about **15 Sv** and no significant trend over three decades — a result that has settled a fifty-year controversy and that no single ship section could have produced.
:::
:::

::: warning The theory is exact, the numbers are not, and the difference is where the research is
Seven failures are structural. The Ekman layer is not an Ekman layer. The real surface layer contains wind waves, Langmuir circulation, diurnal convection, spray and a stress that rotates with depth, so the observed surface current turns 20–40° rather than 45°, the spiral is not logarithmic, and the Ekman transport computed from moored current meters disagrees with $\tau/\rho f$ by 20–50 per cent in energetic regions. The stress curl is the least-accurate field in the atmosphere. QuikSCAT and ASCAT scatterometers measure the 10-m wind to 0.5 m s⁻¹, but the curl requires spatial differentiation, and reanalyses differ in the subpolar curl by factors of two — which propagates directly into the Sverdrup transport and the Ekman pumping. Sverdrup balance is observed only where it is not masked. It holds in the low-eddy-energy interiors and fails in the recirculation gyres, where eddy vorticity fluxes are comparable to the wind input; two-thirds of the subtropical gyres are in the eddy-dominated regime. The Munk width is a scaling, not a prediction. The observed boundary-current width is set by the first Rossby radius, by the topography, by the eddy field and by the history of the seamount and fracture-zone topography it runs over, and the Gulf Stream is three times wider than the Munk formula gives. The reference level is assumed, not measured. Every geostrophic transport in the pre-Argo literature carries an arbitrary constant, and the Gulf Stream transport quoted at 75 °W ranges from 30 to 150 Sv depending on where the section is cut and how the reference level is set. The ACC is not in Sverdrup balance. It has no western boundary, so its transport is set by the wind and limited by form drag on topography and by eddy saturation — and eddy-permitting and eddy-resolving models give materially different ACC responses to the observed 5-per-cent intensification of the Southern hemisphere westerlies. And the gyre is not steady. The Kuroshio large-meander state switches on decadal timescales, the Gulf Stream extension shifts by 200 km, the Agulhas leakage into the Atlantic varies by a factor of two, and every one of those changes redistributes heat across an ocean — which is to say, they are climate.
:::
::: history
Fridtjof Nansen (Nansen) watched the *Fram* drift 45° to the right of the wind through the Arctic ice of 1893–1896 and asked Vilhelm Bjerknes why; Bjerknes handed the problem to his twenty-three-year-old student V. Walfrid Ekman (Ekman), who in his 1902 thesis and 1905 paper gave the spiral, the transport and the layer depth — the first quantitative prediction in physical oceanography, confirmed a generation later by drifting buoys and current-meter chains. Harald Sverdrup (Sverdrup) wrote the dynamics of the wind-driven ocean currents in 1947, giving the curl relation that bears his name and predicting the equatorward interior transport of the subtropical gyres. Henry Stommel (Stommel) solved the western-intensification problem in 1948 in a one-page paper, showing that the β effect forces the return flow into a narrow western boundary layer and cannot produce one in the east; Walter Munk (Munk) recast the argument as a boundary-layer and energy problem in 1950, giving the viscous and inertial width scalings. Michael Swallow (Swallow) built the first neutrally-buoyant parachute current meters in 1955 and showed that the Gulf Stream continues as a deep current to the bottom, and the Gulf Stream rings were first observed in 1971–1972. Joseph Pedlosky (Pedlosky) wrote *Geophysical Fluid Dynamics* in 1979 and Adriano Gill (Gill) *Atmosphere-Ocean Dynamics* in 1982; Luyten, Pedlosky and Stewens (Luyten) gave the ventilated wind-driven thermocline theory in 1983, the first model in which the thermocline outcrops at the surface and subducts in the observed pattern. Satellite altimetry began with SEASAT in 1978 and Geosat in 1985–1989, whose repeat tracks revealed the global mesoscale eddy field from space, and TOPEX/Poseidon from 1992 made the absolute dynamic topography and the surface geostrophic velocity routine synoptic products. The transport of the Antarctic Circumpolar Current through Drake Passage was measured by the ISO and cGRDS arrays of 1986–1994 and by the current-meter arrays of Kathryn Donohue (Donohue), Alberto Gordon (Gordon) and Stephen Rintoul (Rintoul), who established the 130–150 Sv value, its seasonal variation and its eddy modulation.
:::

## Where this leads

The **stress** that drives everything here is computed in [[oceanography/air-sea-fluxes]], the **density** field that geostrophy reads is [[oceanography/seawater]], the **thermocline** that Ekman pumping fills is ventilated in [[oceanography/overturning]], the **Rossby** and **meander** dynamics that break **Sverdrup** balance are in [[oceanography/waves-tides]], the **upwelling** that the eastern boundaries produce feeds [[oceanography/productivity]], the **sea-surface** expression is measured in [[oceanography/sea-level]], the **heat** the gyres carry is [[climate-system/heat-transport]], the **wind** belts that force them are [[atmospheric-dynamics/general-circulation]] and [[meteorology/winds]], the **Southern** hemisphere **stress** is the subject of [[climate-system/heat-transport]] and [[glaciology/sea-ice]], and the **variability** of the gyres is [[climate-system/variability]].

::: quiz
A steady wind blows due east at 40 °N. In which direction does the net Ekman transport go?
- [ ] Due east, along the wind.
- [x] Due south.
- [ ] Due north.
- [ ] Vertically downward.
::: solution
The Ekman transport is $\hat{\mathbf{z}}\times\boldsymbol{\tau}/\rho f$, which is **90° to the right of the wind** in the Northern Hemisphere. For an **eastward** wind, "right" is **south**. The **surface current** itself is only **45°** to the right; it is the **depth-integrated** transport that is exactly perpendicular.
:::
:::

::: summary
- The Ekman spiral turns with depth and the depth-integrated Ekman transport is exactly 90° to the right of the wind (left in the south), independent of viscosity and mixed-layer depth.
- Ekman pumping of only 10–30 m yr⁻¹ fills the entire thermocline and drives the wind-driven half of the overturning circulation.
- Sverdrup balance makes the interior transport a direct reading of the wind stress curl, and gives 10–30 Sv in the subtropical gyres.
- The β effect forces the return flow into a western boundary current tens of kilometres wide — Stommel's and Munk's prediction, made in 1948–1950 and confirmed in every detail.
- Observed gyre transports are two to four times the Sverdrup value because eddies and recirculation close the potential-vorticity budget.
- The thermal wind turns a measured density contrast into a current, and satellite altimetry turns a 3-cm sea-surface step into a 3-cm s⁻¹ velocity.
- The Antarctic Circumpolar Current carries 130–150 Sv because there is no continent to stop it, and its transport follows from the wind stress and the geometry alone.
:::

## Exercises

::: exercise Ekman transport {level=1 check="0.78"}
Find the Ekman transport per metre of width for a wind stress of $0.08\ \mathrm{N\,m^{-2}}$ at $f = 10^{-4}\ \mathrm{s^{-1}}$.
::: solution
$M_E = 0.08/(1025\times10^{-4}) = 0.78\ \mathrm{m^{2}\,s^{-1}}$ — **0.78 Sv per thousand kilometres of width**. Across a **ten-thousand-kilometre** ocean that is **78 Sv**, which is more than the Gulf Stream: the **wind-driven** transport of the whole **basin** is hidden in a number smaller than one.
:::
:::

::: exercise Ekman pumping {level=1 check="18"}
Find the Ekman pumping velocity in $\mathrm{m\,yr^{-1}}$ for a wind stress curl of $3\times10^{-11}\ \mathrm{N\,m^{-3}}$ at $f = 5\times10^{-5}\ \mathrm{s^{-1}}$.
::: solution
$w_E = 3\times10^{-11}/(1025\times5\times10^{-5}) = 5.9\times10^{-7}\ \mathrm{m\,s^{-1}} = 18\ \mathrm{m\,yr^{-1}}$. This unmeasurably small vertical velocity is the sole source of the central water masses and the ventilation of the thermocline, and its sign — down in the gyre, up at the equator and the coasts — is the reason the nutrients and the fisheries are where they are.
:::
:::

::: exercise The inertial period {level=1 check="15.7"}
Find the inertial period at **50 °N**.
::: solution
$f = 2\Omega\sin\phi = 1.45\times10^{-4}\times0.766 = 1.11\times10^{-4}\ \mathrm{s^{-1}}$, so $T = 2\pi/f = 5.7\times10^{4}\ \mathrm{s} = 15.7\ \mathrm{h}$. At mid-latitudes the inertial period is 14–18 hours, close to half a day, so wind squalls and storms set the mixed layer ringing at the inertial frequency, and near-inertial internal waves radiated by storms are a major source of deep mixing — one of the most active topics in physical oceanography of the last twenty years.
:::
:::

::: exercise The Munk width {level=2 check="100"}
Find the Munk boundary-layer width for a lateral viscosity of $A_H = 2\times10^{4}\ \mathrm{m^{2}\,s^{-1}}$ and $\beta = 2\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$.
::: solution
$\delta_M = (A_H/\beta)^{1/3} = (10^{15})^{1/3} = 10^{5}\ \mathrm{m} = 100\ \mathrm{km}$. The agreement with the observed Gulf Stream width of 80–120 km is the single most striking quantitative success of wind-driven theory — a width predicted from the Earth's rotation rate, the basin's size and a guessed eddy viscosity, before any satellite had seen a current.
:::
:::

::: exercise The thermal wind {level=2 check="0.46"}
Across a front the density falls by $0.3\ \mathrm{kg\,m^{-3}}$ over **50 km** going north, and the contrast persists to **800 m**. Find the change in geostrophic velocity across the layer at $f = 10^{-4}\ \mathrm{s^{-1}}$.
::: solution
$\Delta v = (9.81/(1025\times10^{-4}))\times(0.3/5\times10^{4})\times800 = 0.46\ \mathrm{m\,s^{-1}}$. A third of a metre per second from a density contrast of 0.03 per cent over fifty kilometres — which is the sense in which the ocean is almost at rest: enormous currents come from imperceptible slopes, and the whole of dynamic oceanography is the arithmetic of one part in a million.
:::
:::

::: exercise The altimetric current {level=2 check="0.03"}
A satellite altimeter measures a **dynamic** height difference of $0.6\ \mathrm{m^{2}\,s^{-2}}$ across **200 km**. Find the geostrophic current at $f = 10^{-4}\ \mathrm{s^{-1}}$.
::: solution
$v_g = \Delta\Phi/(f\,\Delta x) = 0.6/(10^{-4}\times2\times10^{5}) = 0.03\ \mathrm{m\,s^{-1}}$. A 3-cm sea-surface step over 200 km — a slope of 1.5 parts in $10^{9}$ — gives 1.5 mm s⁻¹, which is why altimetry is a marvellous instrument for mesoscale eddies and a poor one for the large-scale mean, whose signals are at the limit of orbital geodesy and dominated by the geoid.
:::
:::

::: exercise The circumpolar transport {level=3 check="155"}
Take a zonal wind stress of $0.20\ \mathrm{N\,m^{-2}}$ at $50\ \mathrm{^\circ S}$, a circumpolar length of $2\pi a\cos\phi$, and a Coriolis difference across the current of $\Delta f = 3.24\times10^{-5}\ \mathrm{s^{-1}}$. Estimate the ACC transport in sverdrups.
::: solution
$$
M = \frac{2\pi a\cos\phi\;\tau_x}{\rho\,\Delta f} = \frac{2.57\times10^{7}\times0.20}{1025\times3.24\times10^{-5}} = 1.5\times10^{8}\ \mathrm{m^{3}\,s^{-1}} = 155\ \mathrm{Sv}.
$$
The observed transport through Drake Passage is 130–150 Sv. That meteorology and geometry should predict the largest current on the planet to ten per cent is the strongest argument in the subject — and the reason the projected intensification of the Southern hemisphere westerlies is expected to increase the ACC transport, though eddy saturation may damp the response to a fraction of what the formula implies.
:::
:::

::: exercise The gyre transport {level=3 check="16"}
A gyre has a mean wind stress curl of $4\times10^{-11}\ \mathrm{N\,m^{-3}}$ over a basin **8000 km** wide at $\beta = 2\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$. Find the Sverdrup transport in sverdrups.
::: solution
$M = 4\times10^{-11}/(1025\times2\times10^{-11}) = 1.95\times10^{-3}\ \mathrm{m^{2}\,s^{-1}}$, and across the basin $1.95\times10^{-3}\times8\times10^{6} = 1.6\times10^{4}\ \mathrm{m^{3}\,s^{-1}} = 16\ \mathrm{Sv}$. The observed transport of the corresponding real gyre is 30–50 Sv, and the deficit is recirculation. The ratio of observed to Sverdrup transport is a useful index of how eddy-dominated a gyre is: it is near one in the low-energy eastern South Pacific and three or more in the Kuroshio and Agulhas recirculation gyres, which is also the ranking of their eddy kinetic energy.
:::
:::
