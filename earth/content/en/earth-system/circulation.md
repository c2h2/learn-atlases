Between $20^\circ\mathrm{S}$ and $20^\circ\mathrm{N}$ the top of the atmosphere gains about $60\ \mathrm{W\,m^{-2}}$ more than it loses; near the poles it loses about $100\ \mathrm{W\,m^{-2}}$ more than it gains (from the CERES energy-budget imbalance, averaged over 2001–2018). If nothing moved, the tropics would boil and the poles would freeze within a few thousand years. Something does move. Satellites, ships, moored current meters and drifting floats show that the atmosphere and the ocean together carry roughly $5$–$6$ petawatts — a petawatt is $10^{15}\ \mathrm{W}$, so the whole human civilisation uses about one-thirtieth of what the climate system exports northwards — from the low latitudes towards the poles.

This chapter is about why that export happens, why it takes the forms it does — five great wind belts, six rotating gyres, a global overturning loop — and why the same circulation that gives you the trade winds also sets where the deserts, the fishing grounds and the rainforests are. Two ideas organise everything. The first is **rotation**: the Earth turns underneath the moving air and water, and the Coriolis effect that results constrains large-scale motion into a few allowed patterns. The second is that the atmosphere and the ocean are the same fluid in two densities, driven by the same imbalance, and talking to each other constantly.

## The imbalance to be fixed

::: definition Meridional heat transport {#def-mht}
The **meridional (north–south) heat transport** $F(\phi)$ is the total energy per unit time crossing the latitude circle at $\phi$ northwards, in watts (usually petawatts, $\mathrm{PW} = 10^{15}\ \mathrm{W}$). It is defined so that the divergence of the transport balances the local radiation surplus: over a latitude belt,
$$
\text{radiation surplus} = -\frac{1}{2\pi a\cos\phi}\frac{\mathrm{d}F}{\mathrm{d}y},
$$
where $y = a\phi$ is distance northwards and $a$ the Earth's radius.
:::

The annual-mean net radiation at the top of the atmosphere is positive everywhere between the equator and about $40^\circ$ latitude and negative beyond, with a maximum surplus of about $+60\ \mathrm{W\,m^{-2}}$ near $20^\circ$ and a winter maximum deficit of $-120\ \mathrm{W\,m^{-2}}$ over the polar regions. Integrating the surplus from the equator outwards gives the transport required at each latitude. The observed total peaks near $35^\circ\mathrm{N}$ at about $6\ \mathrm{PW}$ and near $15^\circ\mathrm{S}$ at about $4\ \mathrm{PW}$ (Trenberth & Caron, 2001; updated by CERES-era reanalyses).

The atmosphere and the ocean divide the job unevenly, and the division is the most interesting fact in the chapter.

- Across $30^\circ\mathrm{N}$ the atmosphere carries about $2.5\ \mathrm{PW}$ and the ocean about $1.3\ \mathrm{PW}$ — the atmosphere does most of the work.
- Across the equator the **ocean** carries about $1.3\ \mathrm{PW}$ northwards while the atmosphere carries about $1\ \mathrm{PW}$ *southwards*, so the ocean's contribution is larger than the total.
- The reason is that the atmosphere responds to heating almost immediately (a parcel adjusts in days) and convects vigorously, while the ocean is slow, stratified and boundary-constrained. The atmosphere takes the heat up in the tropics, drops some of it on the subtropics, and the ocean then takes over where the atmosphere's transport has run out — a genuine handover, and one of the reasons the North Atlantic is so warm.

::: widget plot
f: (415 - 243*sin(x*pi/180)^2)*(1-0.294) - 239
x: -90, 90
y: -140, 80
hlines: 0
caption: A crude annual-mean radiation imbalance at the top of the atmosphere against latitude: absorbed sunlight (using the annual-mean insolation $415 - 243\sin^2\phi\ \mathrm{W\,m^{-2}}$ and $\alpha = 0.294$) minus the observed global-mean outgoing of $239\ \mathrm{W\,m^{-2}}$. The curve crosses zero near $\pm 40^\circ$: everything equatorward of that has energy to spare and everything poleward of it has a debt. The atmosphere and ocean between them move about $6\ \mathrm{PW}$ to pay it. The real CERES curve is not smooth — deserts and cloud bands break the symmetry — but the shape is the shape of the problem the circulation has to solve.
:::

## Rotation decides the shape

::: definition The Coriolis parameter {#def-coriolis}
In a frame rotating with the Earth, a parcel moving with velocity $\mathbf{u}$ experiences an apparent acceleration $-2\boldsymbol{\Omega}\times\mathbf{u}$, where $\Omega = 7.292\times10^{-5}\ \mathrm{s^{-1}}$. Its horizontal effect is governed by the **Coriolis parameter**

$$
f = 2\Omega\sin\phi,
$$

which is $1.03\times10^{-4}\ \mathrm{s^{-1}}$ at $45^\circ$ and $0$ at the equator. The **Rossby number** $\mathrm{Ro} = U/(fL)$ compares the two accelerations: for large, fast flows $\mathrm{Ro} \ll 1$ and rotation dominates; for small, fast ones it does not.
:::

::: proposition Geostrophic balance {#prop-geostrophic}
For horizontal flow with $\mathrm{Ro} \ll 1$, friction negligible and no significant acceleration, the pressure gradient force and the Coriolis force balance, giving the **geostrophic wind**

$$
v_g = \frac{1}{f\rho}\frac{\partial p}{\partial y},
$$

a wind parallel to the isobars, with low pressure to the left in the northern hemisphere and to the right in the southern.
:::

::: proof
Write the horizontal momentum equation on a rotating Earth, neglecting friction and the parcel's own acceleration:
$$
0 = -\frac{1}{\rho}\nabla_h p - f\,\mathbf{k}\times\mathbf{u}.
$$
With $\mathbf{u} = (u, v)$ and the pressure gradient taken northward, the two components are $fv = -(1/\rho)\,\partial p/\partial y$ and $fu = (1/\rho)\,\partial p/\partial x$. For a purely north–south pressure gradient, $u = 0$ and $v = -(1/f\rho)\,\partial p/\partial y$: the wind runs east–west across the gradient, not down it. Its magnitude is the stated one. The direction follows because $f > 0$ in the north: if $p$ decreases northwards, $v > 0$ is impossible and the flow must be eastward, i.e. parallel to the isobars with low pressure on the left.
:::

::: example How fast is the geostrophic wind? {#ex-geostrophic}
Pressure falls by $5\ \mathrm{hPa}$ over $500\ \mathrm{km}$ northwards. Find the geostrophic wind at $15^\circ$, $45^\circ$ and $60^\circ$ latitude, taking $\rho = 1.2\ \mathrm{kg\,m^{-3}}$.
::: solution
With $\partial p/\partial y = 500\ \mathrm{Pa}/5\times10^{5}\ \mathrm{m} = 1.0\times10^{-3}\ \mathrm{Pa\,m^{-1}}$ and $f = 1.458\times10^{-4}\sin\phi$,

$$
v_g = \frac{1.0\times10^{-3}}{1.2\times1.458\times10^{-4}\sin\phi} = \frac{5.72}{\sin\phi}\ \mathrm{m\,s^{-1}},
$$

giving $22\ \mathrm{m\,s^{-1}}$ at $15^\circ$, $8.1\ \mathrm{m\,s^{-1}}$ at $45^\circ$ and $6.6\ \mathrm{m\,s^{-1}}$ at $60^\circ$. The same pressure difference drives a much stronger wind in the tropics, where $f$ is small: the atmosphere near the equator cannot organize a strong swirl, which is one reason tropical cyclones never form within about $5^\circ$ of the equator. The $1/\sin\phi$ blow-up at $\phi \to 0$ is a warning that the geostrophic approximation fails there, not a prediction of infinite wind.
:::
:::

::: proposition The thermal wind {#prop-thermalwind}
If the horizontal temperature field varies with height, the geostrophic wind must shear with height:

$$
\frac{\partial \mathbf{v}_g}{\partial z} = \frac{g}{f\,T}\,\mathbf{k}\times\nabla_h T .
$$

So a **west-to-east jet sits above a strong north–south temperature contrast**, with the warm air to its right in the northern hemisphere, and the jet strengthens with height while the contrast persists.
:::

::: proof
Differentiate the geostrophic relation $f v_g = -(1/\rho)\,\partial p/\partial y$ with respect to $z$, and note that $f$ is independent of height:
$$
f\frac{\partial v_g}{\partial z} = -\frac{\partial}{\partial y}\left(\frac{1}{\rho}\frac{\partial p}{\partial z}\right) + \frac{\partial}{\partial x}\left(\frac{1}{\rho}\frac{\partial p}{\partial y}\right)\!\Big|_{\text{mixed terms}} .
$$
Using hydrostatic balance $\partial p/\partial z = -\rho g$, the first term on the right becomes $\partial( g)/\partial y$ evaluated with $\rho = p/RT$; the mixed derivative terms cancel when the two components are combined, and for a horizontal temperature field that varies only through the thickness of the layer one obtains
$$
\frac{\partial v_g}{\partial z} = -\frac{g}{fT}\frac{\partial T}{\partial x}, \qquad
\frac{\partial u_g}{\partial z} = \frac{g}{fT}\frac{\partial T}{\partial y},
$$
which is the vector form stated. The physical content is simple: the thickness between two pressure surfaces is proportional to the mean temperature, so a warm–cold contrast makes the pressure surfaces tilt more steeply with height, and a wind that balances them at one level must blow harder at the next.
:::

::: example The jet stream, from a temperature contrast {#ex-jet}
Take a $25\ \mathrm{K}$ temperature difference across $3000\ \mathrm{km}$ in the mid-latitude troposphere, and a scale height $H = 7\ \mathrm{km}$. Estimate the jet-stream speed at the tropopause, assuming the wind is weak at $850\ \mathrm{hPa}$.
::: solution
Integrating the thermal wind relation over a layer of thickness $H$ and taking $T = 250\ \mathrm{K}$,

$$
\Delta v_g \approx \frac{gH}{fT}\frac{\Delta T}{\Delta y} = \frac{9.81\times7000}{1.03\times10^{-4}\times250}\times\frac{25}{3\times10^{6}} = 21\ \mathrm{m\,s^{-1}} .
$$

That is the right order for the mean westerly jet, which is observed at $30$–$50\ \mathrm{m\,s^{-1}}$ and reaches $100\ \mathrm{m\,s^{-1}}$ in extreme cases; the estimate is low because the temperature contrast is concentrated in the upper troposphere and because the jet itself is a maximum, not a surface-to-tropopause average. The important conclusion is structural: **the jet stream is a direct consequence of the equator-to-pole temperature contrast**, so a circulation that reduces that contrast must weaken the jet. This coupling between the mean state and the eddies that maintain it is the theme of [[atmospheric-dynamics/vorticity]].
:::
:::

## The atmospheric general circulation

::: definition The three-cell model {#def-cells}
The time-mean meridional circulation of one hemisphere is described by three cells: the **Hadley cell**, rising near the thermal equator and sinking near $30^\circ$, extending to about $15\ \mathrm{km}$; the **polar cell**, shallow and weak, sinking over the pole; and between them the indirect **Ferrel cell**, a statistical artefact of the storms rather than a thermally direct engine.
:::

The Hadley cell is the only one of these that can be understood from a few numbers. Air rising in the intertropical convergence zone (ITCZ) carries angular momentum upwards. Because the Earth rotates, air at the equator has an eastward velocity $\Omega a\cos\phi$ of $465\ \mathrm{m\,s^{-1}}$ at the surface; as it moves poleward at $10$–$15\ \mathrm{km}$ height it conserves angular momentum and so accelerates eastward relative to the ground, reaching $50$–$100\ \mathrm{m\,s^{-1}}$ — the subtropical jet. By the time the air has sunk at $30^\circ$ it has lost most of its water (all that rain fell in the tropics and on the windward slopes) and it is dry, which is why almost every great desert on Earth lies between $20^\circ$ and $35^\circ$: the Sahara, the Arabian, the Thar, the Sonoran, the Kalahari, the Australian interior, and the dry belt that makes the Atacama the driest place on Earth.

::: example How far does the Hadley cell reach? {#ex-hadley}
Angular momentum is conserved for air moving poleward from the equator at $15\ \mathrm{km}$ height. At what latitude would its eastward speed reach $80\ \mathrm{m\,s^{-1}}$?
::: solution
The angular momentum per unit mass about the rotation axis is $M = (u + \Omega a\cos\phi)\,a\cos\phi$, where $a\cos\phi$ is the distance from the axis. Conserving $M$ between the origin $\phi_0$ (where $u = u_0$) and the latitude $\phi$ gives

$$
u(\phi) = (u_0 + \Omega a\cos\phi_0)\,\frac{\cos\phi_0}{\cos\phi} - \Omega a\cos\phi .
$$

Air that leaves the equator at $15\ \mathrm{km}$ with $u_0 = 0$ therefore has $u = \Omega a(\sec\phi - \cos\phi)$. Setting $u = 80\ \mathrm{m\,s^{-1}}$ with $\Omega a = 465\ \mathrm{m\,s^{-1}}$:

$$
\sec\phi - \cos\phi = 0.172 \quad\Longrightarrow\quad \phi = 23^\circ .
$$

The subtropical jet core, observed at $25^\circ$–$30^\circ$, and the desert belt, at $20^\circ$–$35^\circ$, both fall out of angular-momentum conservation and energy balance at about the right latitude — the classic argument of E. N. Lorenz and, in modern form, of Held and Hou. Note that the inviscid formula keeps growing (at $40^\circ$ it gives $180\ \mathrm{m\,s^{-1}}$), so the real atmosphere must be doing something else: mid-latitude eddies carry angular momentum *equatorward* against the gradient, and that convergence of the transport is what limits the cell and puts the maximum where it is. The real Hadley cell reaches $25^\circ$–$30^\circ$ in winter and $15^\circ$ in summer, and shifts by several degrees with the seasons; its edge has moved poleward by roughly $1^\circ$ per decade over the past 40 years, with consequences for the storm tracks and the dry zones ([[climate-change/observed-change]]).
:::
:::

::: warning The Coriolis effect does not decide which way your bath drains
The Rossby number for a bathtub is enormous: with $U \sim 0.5\ \mathrm{m\,s^{-1}}$ and $L \sim 0.1\ \mathrm{m}$ at $f = 10^{-4}\ \mathrm{s^{-1}}$, $\mathrm{Ro} \sim 10^4$. The direction of a draining vortex is set by the shape of the basin and the way the water was filled, and it is reproducible only in a carefully controlled laboratory tank with days to settle. Rotation matters when $L \gtrsim 10\ \mathrm{km}$ in the atmosphere and $L \gtrsim 1\ \mathrm{km}$ in the ocean — which is why it governs weather systems, currents and the shape of gyres, and not sinks.
:::

## The ocean: wind-driven and then density-driven

::: definition Ekman transport {#def-ekman}
Wind blowing steadily on the sea surface drives a surface layer of thickness $\sim 50$–$100\ \mathrm{m}$ in which the current turns with depth (the **Ekman spiral**). The net transport integrated over the layer is

$$
\mathbf{M}_E = \frac{\hat{\boldsymbol{\tau}}}{\rho f},
$$

directed $90^\circ$ to the right of the wind in the northern hemisphere and $90^\circ$ to the left in the southern.
:::

::: proof
In the steady, depth-independent-density case the horizontal momentum balance in the mixed layer is friction versus Coriolis: $f\,\mathbf{k}\times\mathbf{u} = \partial\boldsymbol{\tau}/\partial z/\rho$. Integrating from the base of the layer (where the stress vanishes) to the surface (where it equals the wind stress $\boldsymbol{\tau}$) gives $f\,\mathbf{k}\times\mathbf{M}_E = \boldsymbol{\tau}/\rho$. Crossing both sides with $\mathbf{k}$ and using $\mathbf{k}\times(\mathbf{k}\times\mathbf{M}) = -\mathbf{M}$ yields $\mathbf{M}_E = \hat{\mathbf{k}}\times\boldsymbol{\tau}/(\rho f)$, which is perpendicular to the stress. The assumptions are steady wind, constant $f$ over the layer, no horizontal pressure gradient and a vertically uniform eddy viscosity; near western boundary currents and in strong fronts the result is only approximate.
:::

::: example Upwelling off a west coast {#ex-upwelling}
A south-blowing wind of $10\ \mathrm{m\,s^{-1}}$ acts on the coast of Peru at $15^\circ\mathrm{S}$. Take a drag coefficient $C_D = 1.5\times10^{-3}$ and $\rho_a = 1.2\ \mathrm{kg\,m^{-3}}$. Find the Ekman transport and the upwelling velocity if it is drawn up over a $100\ \mathrm{km}$-wide shelf.
::: solution
The wind stress is $\tau = \rho_a C_D U^2 = 1.2\times1.5\times10^{-3}\times100 = 0.18\ \mathrm{Pa}$; a typical coastal value is $0.05$–$0.15\ \mathrm{Pa}$, so take $\tau = 0.05\ \mathrm{Pa}$ for the mean state. Then

$$
M_E = \frac{\tau}{\rho f} = \frac{0.05}{1025\times3.78\times10^{-5}} = 1.29\ \mathrm{m^2\,s^{-1}},
$$

per metre of coast (the southern hemisphere sign sends the transport offshore for a south-blowing wind along a coast with land to the east). Mass continuity requires replacement water, so

$$
w \approx \frac{M_E}{W} = \frac{1.29}{1\times10^{5}} = 1.3\times10^{-5}\ \mathrm{m\,s^{-1}} = 1.1\ \mathrm{m\,day^{-1}} .
$$

That is the right size for coastal upwelling, and it is why the Peru, Benguela, Canary and California current systems support the world's great fisheries: $1\ \mathrm{m\,day^{-1}}$ of deep, cold, nitrate-rich water over a few hundred kilometres of coast fertilises the surface layer. The same Ekman physics, applied to the whole tropical ocean, is what moves water into and out of the subtropical gyres.
:::
:::

Wind stress curl over an ocean basin drives a slow, deep, westward flow everywhere (the **Sverdrup balance**), which must be returned in a narrow, fast western boundary current — the Gulf Stream, the Kuroshio, the Agulhas, the Brazil Current. This is why gyres are asymmetric: the western boundary currents are $100\ \mathrm{km}$ wide and $1$–$2\ \mathrm{m\,s^{-1}}$ fast, while their eastern counterparts (the California, Canary and Benguela currents) are broad, slow and associated with upwelling.

::: definition Thermohaline circulation {#def-thc}
The **thermohaline circulation**, or **meridional overturning circulation** (MOC), is the global, density-driven overturning: surface water becomes dense enough to sink in the North Atlantic (the Labrador and Nordic seas) and around Antarctica, spreads through the basins at depth, and returns slowly to the surface in the Indian and Pacific oceans. It is measured in **sverdrups**, $1\ \mathrm{Sv} = 10^{6}\ \mathrm{m^3\,s^{-1}}$.
:::

::: example What does the MOC carry? {#ex-moc}
The RAPID-MOCHA array at $26.5^\circ\mathrm{N}$ in the Atlantic measured a mean overturning of $18.7 \pm 2.1\ \mathrm{Sv}$ over 2004–2014. If the overturning carries water that is $10\ ^\circ\mathrm{C}$ warmer northbound in the upper $1000\ \mathrm{m}$ than the southbound deep flow, estimate the heat transport. What volume of the global ocean does $20\ \mathrm{Sv}$ flush per year, and what does that imply for the age of deep water?
::: solution
Heat transport $Q = \rho c_p \Psi \Delta T$:

$$
Q = 1025\ \mathrm{kg\,m^{-3}}\times 3990\ \mathrm{J\,kg^{-1}\,K^{-1}}\times 1.87\times10^{7}\ \mathrm{m^3\,s^{-1}}\times 10\ \mathrm{K} = 0.77\times10^{15}\ \mathrm{W} = 0.77\ \mathrm{PW}.
$$

Published estimates for the Atlantic at $26^\circ\mathrm{N}$ are $0.6$–$0.8\ \mathrm{PW}$, so the simple calculation is adequate. For the flushing time, $20\ \mathrm{Sv} = 6.3\times10^{5}\ \mathrm{km^3\,yr^{-1}}$, against a global ocean volume of $1.335\times10^{9}\ \mathrm{km^3}$:

$$
\tau = \frac{1.335\times10^{9}}{6.3\times10^{5}} = 2100\ \mathrm{yr}.
$$

That is the same order as the radiocarbon age of deep Pacific water (about $2000$ years, corrected for radioactive decay), which is one of the most satisfying consistencies in oceanography: a number measured by a mooring array and a number measured by $^{14}\mathrm{C}$ in shells agree. It also tells you the timescale on which the deep ocean can respond to a change at the surface — centuries, not decades.
:::
:::

::: widget plot
f: 1e-3/(2*7.292e-5*sin(x*pi/180)*1.2)
x: 1, 89
y: 0, 60
caption: Geostrophic wind speed for a fixed pressure gradient of $10^{-3}\ \mathrm{Pa\,m^{-1}}$ against latitude, since $v_g \propto 1/f \propto 1/\sin\phi$. Rotation weakens towards the equator, so the same pressure difference drives ever stronger winds. The curve runs off the top of the figure below about $5^\circ$ — the geostrophic approximation is failing, which is exactly why the tropics are treated with their own dynamics ([[atmospheric-dynamics/general-circulation]]) and why tropical cyclones cannot form at the equator.
:::

::: quiz
Why does the ocean carry more heat than the atmosphere across the equator, but less than the atmosphere across $30^\circ\mathrm{N}$?
- [ ] Because the ocean is denser and therefore always carries more.
- [x] Because the atmosphere responds quickly and convects, taking up heat in the tropics and releasing it in the subtropics, where the ocean then takes over.
- [ ] Because the ocean cannot cross the equator.
- [ ] Because the Coriolis parameter is smaller in the atmosphere.
::: solution
The two fluids have very different adjustment times and vertical structure. The atmosphere's transport peaks in the subtropics, where its own circulation (the Hadley cell and the storm tracks) dumps energy; the ocean's is largest near the equator and in the western boundary currents. Across the equator the two actually oppose each other — the ocean carries about $1.3\ \mathrm{PW}$ north and the atmosphere about $1\ \mathrm{PW}$ south — so the division of labour is a genuine handover, not a fixed split.
:::
:::

::: warning "The Gulf Stream makes Britain warm" is half right, and the other half is wrong
It is true that the North Atlantic Current, the extension of the Gulf Stream, carries heat north and that the North Atlantic is the warmest part of the ocean at those latitudes. It is not true that Britain's climate is explained by it, in the sense that without it Britain would be like Labrador. Model experiments in which the Atlantic overturning is switched off cool north-west Europe by $3$–$8\ ^\circ\mathrm{C}$ (IPCC AR6, 2021, Chapter 9), which is large but smaller than the $10\ ^\circ\mathrm{C}$ or so difference between London and Labrador, because most of that difference is the mean westerly winds carrying maritime air, the absence of a continental ice sheet, and the fact that Labrador lies downstream of the Arctic. The related claim that the overturning could "collapse abruptly and plunge Europe into a new ice age" is not supported: AR6 assesses it as *very unlikely* before 2100, and even a full collapse would cool the region, not glaciate it.
:::

::: history
The question of why winds blow as they do is four centuries old. Edmond Halley (Halley) proposed in 1686 that the trade winds are a return flow to the rising air of the tropics; George Hadley (Hadley) made the idea quantitative in 1735, allowing for the Earth's rotation, and the cell that bears his name is the oldest dynamical model of the atmosphere. Isaac Newton's *Principia* (1687) supplied the frame; Gaspard-Gustave Coriolis (Coriolis) defined the deflection term in 1835; Christoph Buys Ballot (Buys Ballot) turned it into a forecasting rule in 1857 ("with the back to the wind in the northern hemisphere, low pressure is on the left"). Fridtjof Nansen (Nansen) watched ice from the *Fram* drift to the right of the wind through the Arctic ice pack from 1893 and could not explain it; Vagn Walfrid Ekman (Ekman), a twenty-two-year-old student in Vilhelm Bjerknes's (Bjerknes) Bergen group, solved the problem in 1902 with the spiral that carries his name. Bjerknes's 1904 manifesto — that weather could be forecast by solving equations — and the polar-front theory of 1918–19 gave meteorology its conceptual machinery. Carl-Gustaf Rossby (Rossby) identified the planetary waves of the westerlies in 1939, and Jule Charney (Charney) showed in 1947 that they are unstable, which is why the mid-latitude atmosphere is a machine for making storms. Henry Stommel (Stommel) explained the asymmetry of the ocean gyres in 1948 with the same change of $f$ with latitude, and Wallace Broecker (Broecker) drew the great conveyor belt of the title in 1991; since 2004 the RAPID-MOCHA array has measured it directly.
:::

## Where this leads

Heat transport is the subject of [[earth-system/energy-balance]] in one direction and of [[climate-system/heat-transport]] in the other: the former asks what the imbalance is, the latter how the circulation answers it and how the answer might change. The ocean's role in taking up our heat and carbon is developed in [[oceanography/wind-driven]] and [[earth-system/carbon-cycle]]; the dynamics of the cells, jets and waves sketched here are treated properly in [[atmospheric-dynamics/equations-of-motion]], [[atmospheric-dynamics/balanced-flow]] and [[atmospheric-dynamics/vorticity]]. The water these circulations move is the subject of the next chapter.

::: summary
- The top of the atmosphere gains $\sim 60\ \mathrm{W\,m^{-2}}$ in the tropics and loses $\sim 100\ \mathrm{W\,m^{-2}}$ at high latitude; the atmosphere and ocean between them export about $6\ \mathrm{PW}$ poleward, peaking near $35^\circ\mathrm{N}$.
- Rotation dominates large-scale motion: the Rossby number decides, and for weather systems it is $\sim 0.1$. Geostrophy makes the wind run along isobars, with $v_g \propto 1/f$.
- The thermal wind makes jets: a $25\ \mathrm{K}$ contrast over $3000\ \mathrm{km}$ gives a $20\ \mathrm{m\,s^{-1}}$ jet, so the jet stream is the temperature contrast expressed as wind.
- Angular-momentum conservation puts the subtropical jet and the desert belt at about $30^\circ$; the Hadley cell's edge has moved poleward by about $1^\circ$ per decade in the satellite record.
- Ekman transport, $\mathbf{M}_E = \hat{\boldsymbol{\tau}}/(\rho f)$, is perpendicular to the wind; it drives coastal upwelling of about $1\ \mathrm{m\,day^{-1}}$ and hence the great fisheries.
- The MOC carries $\sim 19\ \mathrm{Sv}$ and $\sim 0.8\ \mathrm{PW}$; that flushing rate implies a deep-ocean ventilation time of about two millennia, matching the radiocarbon age of deep water.
:::

## Exercises

::: exercise The Coriolis parameter {level=1 check="1.32e-4"}
Compute $f$ at $65^\circ\mathrm{N}$.
::: solution
$f = 2\times7.292\times10^{-5}\times\sin 65^\circ = 1.458\times10^{-4}\times0.9063 = 1.32\times10^{-4}\ \mathrm{s^{-1}}$.
:::
:::

::: exercise Geostrophic wind {level=1 check="5.6"}
Pressure falls $3\ \mathrm{hPa}$ per $400\ \mathrm{km}$ eastward at $50^\circ\mathrm{N}$. Find the geostrophic wind speed ($\rho = 1.2\ \mathrm{kg\,m^{-3}}$).
::: solution
$\partial p/\partial x = 300/4\times10^{5} = 7.5\times10^{-4}\ \mathrm{Pa\,m^{-1}}$, $f = 1.115\times10^{-4}\ \mathrm{s^{-1}}$, so
$$
v_g = \frac{7.5\times10^{-4}}{1.2\times1.115\times10^{-4}} = 5.6\ \mathrm{m\,s^{-1}}.
$$
The wind blows parallel to the east–west pressure gradient, i.e. north–south, with low pressure to the left.
:::
:::

::: exercise Rossby number {level=1 check="0.1"}
A $10\ \mathrm{m\,s^{-1}}$ wind around a $1000\ \mathrm{km}$ low at $50^\circ\mathrm{N}$. Find the Rossby number and say whether rotation matters.
::: solution
$\mathrm{Ro} = U/(fL) = 10/(1.115\times10^{-4}\times10^{6}) = 0.090$. With $\mathrm{Ro} \ll 1$, rotation dominates and the flow is nearly geostrophic — which is why surface maps of pressure and of upper-air winds look so similar.
:::
:::

::: exercise Ekman transport {level=2 check="0.95"}
A wind stress of $0.1\ \mathrm{Pa}$ blows over the ocean at $45^\circ\mathrm{N}$. Find the Ekman transport in $\mathrm{m^2\,s^{-1}}$ ($\rho = 1025\ \mathrm{kg\,m^{-3}}$).
::: solution
$M_E = \tau/(\rho f) = 0.1/(1025\times1.03\times10^{-4}) = 0.95\ \mathrm{m^2\,s^{-1}}$, per metre of width, directed $90^\circ$ to the right of the wind.
:::
:::

::: exercise Angular momentum and the trade winds {level=2}
Air at $10\ \mathrm{km}$ height, starting at $30^\circ$ with zero zonal wind relative to the ground, moves equatorward conserving angular momentum. Find its zonal wind at $10^\circ$. Is it easterly or westerly?
::: solution
Using $u = (u_0 + \Omega a\cos\phi_0)\cos\phi_0/\cos\phi - \Omega a\cos\phi$ with $u_0 = 0$, $\phi_0 = 30^\circ$, $\phi = 10^\circ$:
$$
u = 465\left(\frac{0.866^2}{0.985} - 0.985\right) = 465(0.762 - 0.985) = -104\ \mathrm{m\,s^{-1}}.
$$
Negative means westward relative to the ground: air moving equatorward from the subtropics is left behind by the faster-rotating tropics, which is the sense of the trade winds. The observed easterlies are far weaker ($10\ \mathrm{m\,s^{-1}}$) because friction and eddies export the angular momentum back.
:::
:::

::: exercise Heat carried by a current {level=2 check="0.33"}
The Gulf Stream at $35^\circ\mathrm{N}$ carries $80\ \mathrm{Sv}$ with a temperature contrast of $10\ ^\circ\mathrm{C}$ across it. Estimate the heat transport in $\mathrm{PW}$.
::: solution
$Q = \rho c_p \Psi\Delta T = 1025\times3990\times8\times10^{7}\times10 = 3.3\times10^{14}\ \mathrm{W} = 0.33\ \mathrm{PW}$. Estimates for the Gulf Stream heat transport are $0.3$–$0.6\ \mathrm{PW}$; note that this is a large number for one current and yet only a fraction of the total across $35^\circ\mathrm{N}$, most of which is carried by the atmosphere.
:::
:::

::: exercise The handover between the fluids {level=2}
Across $30^\circ\mathrm{N}$ the atmosphere transports $2.5\ \mathrm{PW}$ and the ocean $1.3\ \mathrm{PW}$ northward. If the radiation surplus between $30^\circ\mathrm{N}$ and $60^\circ\mathrm{N}$ averages $35\ \mathrm{W\,m^{-2}}$ over the belt, is the transport consistent? (Belt area: $2\pi a^2[\sin 60^\circ - \sin 30^\circ]$.)
::: solution
Belt area $= 2\pi(6.371\times10^{6})^2(0.866 - 0.5) = 2.57\times10^{14}\times0.366 = 9.4\times10^{13}\ \mathrm{m^2}$. Surplus $= 35\times9.4\times10^{13} = 3.3\ \mathrm{PW}$, which must equal the *divergence* of the transport, i.e. $F(30^\circ\mathrm{N}) - F(60^\circ\mathrm{N})$. With $F(30^\circ\mathrm{N}) = 3.8\ \mathrm{PW}$, this requires $F(60^\circ\mathrm{N}) = 0.5\ \mathrm{PW}$ — and indeed the transport falls to near zero at high latitude, where the ocean's own deep western boundary and the polar cell take over. The numbers are consistent to within the uncertainties of a few tenths of a petawatt.
:::
:::

::: exercise Upwelling and the nutrient supply {level=3}
Using [[#ex-upwelling]], take $w = 1.1\ \mathrm{m\,day^{-1}}$ over a $100\ \mathrm{km}$-wide, $50\ \mathrm{m}$-deep upwelling zone with nitrate $20\ \mathrm{mmol\,m^{-3}}$ against a surface value of essentially zero. Find the nitrate supply rate, and the primary production it could support if Redfield stoichiometry applies ($\mathrm{C}:\mathrm{N} = 106:16$).
::: solution
Water volume supplied per second per metre of coast: $M_E = 1.29\ \mathrm{m^2\,s^{-1}}$. Nitrate supply per metre of coast:
$$
1.29\ \mathrm{m^2\,s^{-1}}\times20\ \mathrm{mmol\,m^{-3}} = 25.8\ \mathrm{mmol\,m^{-1}\,s^{-1}} .
$$

Per unit area of the upwelling zone this is $w\times[\mathrm{NO_3}] = 1.27\times10^{-5}\ \mathrm{m\,s^{-1}}\times20 = 2.5\times10^{-4}\ \mathrm{mmol\,m^{-2}\,s^{-1}} = 22\ \mathrm{mmol\,N\,m^{-2}\,d^{-1}}$. With $\mathrm{C}:\mathrm{N} = 106{:}16$ the carbon fixed is $22\times106/16 = 144\ \mathrm{mmol\,C\,m^{-2}\,d^{-1}} = 1.7\ \mathrm{g\,C\,m^{-2}\,d^{-1}}$.

That is an order of magnitude above the global ocean mean ($0.3$–$0.5\ \mathrm{g\,C\,m^{-2}\,d^{-1}}$) and matches the observed values for eastern boundary upwelling systems. It is why a few per cent of the ocean surface supports most of the world's fish catch, and why those systems are vulnerable to warming, which strengthens stratification and reduces the nutrient flux ([[oceanography/productivity]]).
:::
:::

::: exercise A diffusive closure {level=3}
A common toy model of heat transport writes $F = -K\,\mathrm{d}\bar T/\mathrm{d}\phi / a$. Take the observed $F = 6\ \mathrm{PW}$ at $35^\circ\mathrm{N}$, a meridional surface temperature gradient of $1.2\ \mathrm{K}$ per degree of latitude, and estimate the eddy diffusivity $K$ (in $\mathrm{m^2\,s^{-1}}$, treating the transport as occurring through the whole atmospheric column of depth $10\ \mathrm{km}$ and density $1\ \mathrm{kg\,m^{-3}}$).
::: solution
The gradient in SI units is $1.2\ \mathrm{K}$ per $111\ \mathrm{km} = 1.08\times10^{-5}\ \mathrm{K\,m^{-1}}$. The transport per unit length of latitude circle is $F/(2\pi a\cos\phi) = 6\times10^{15}/(2\pi\times6.371\times10^{6}\times0.819) = 1.83\times10^{8}\ \mathrm{W\,m^{-1}}$. Writing $F_\text{width} = \rho c_p K D\,\mathrm{d}T/\mathrm{d}y$ with $D = 10^{4}\ \mathrm{m}$ and $c_p = 1004\ \mathrm{J\,kg^{-1}\,K^{-1}}$,
$$
K = \frac{1.83\times10^{8}}{1\times1004\times10^{4}\times1.08\times10^{-5}} = 1.7\times10^{6}\ \mathrm{m^2\,s^{-1}} .
$$
That is the standard result: the diffusivity needed is about $10^{6}\ \mathrm{m^2\,s^{-1}}$, a thousand times the molecular value and comparable with the largest atmospheric eddies ($\sim u'\ell \approx 20\ \mathrm{m\,s^{-1}}\times10^{5}\ \mathrm{m} = 2\times10^{6}$). The closure therefore says something true — the storms are the mixing agent — and something false: a diffusive law cannot represent the nearly inviscid, wave-driven transport of a real atmosphere, and it gets the response to a changed climate wrong.
:::
:::

::: exercise A warmer world, a weaker contrast {level=3}
Arctic amplification reduces the equator-to-pole surface temperature contrast. If $\Delta T$ across $3000\ \mathrm{km}$ falls from $25\ \mathrm{K}$ to $21\ \mathrm{K}$, what does the thermal-wind estimate of [[#ex-jet]] give for the jet speed, and what three observed changes would you expect to follow?
::: solution
The jet scales linearly with the contrast, so $21\times(21/25) = 17.6\ \mathrm{m\,s^{-1}}$ against $21\ \mathrm{m\,s^{-1}}$: a $16\%$ weakening. Expected consequences, each of which is being tested against observations: (i) weaker mean westerlies and slower storm propagation across the Atlantic and Pacific; (ii) a poleward shift of the storm tracks and of the dry subtropical belt, consistent with the observed widening of the Hadley circulation; (iii) more persistent weather patterns, since blocking and quasi-resonant responses are favoured when the mean flow is weak — the physical idea behind the (still contested) link between Arctic amplification and mid-latitude extremes. Note that the surface contrast is not the whole story: the jet is set by the *upper-tropospheric* contrast, which is affected by the different vertical structure of greenhouse-gas warming, and model estimates of the jet's future trend remain divided.
:::
:::
