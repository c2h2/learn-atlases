A figure skater pulls in her arms and spins faster; a bathtub vortex tightens as it drains; a mid-latitude cyclone deepens as it stretches a column of air. The identity behind all three is not a metaphor but a conservation law — the conservation of **potential vorticity**, the one dynamical quantity that a frictionless, adiabatic air parcel carries with it as an inviolable property, like mass or entropy. The history of dynamic meteorology in the twentieth century is largely the story of discovering that this bookkeeping variable, invisible on any surface chart, organises the behaviour of every system from tornado to quasi-biennial oscillation, and that weather prediction is largely the problem of predicting how potential vorticity is distributed and how it moves.

## Circulation and its conservation

::: definition Circulation and Kelvin's theorem {#def-circulation}
The **circulation** around a closed material curve $C$ is the line integral of the velocity,
$$
\Gamma = \oint_C \mathbf{v}\cdot\mathrm{d}\mathbf{l},
$$
with units $\mathrm{m^{2}\,s^{-1}}$: the total spin of the fluid enclosed, weighted by the geometry of the loop. **Kelvin's circulation theorem** (1869) states that for frictionless, barotropic flow under a conservative body force, the circulation following the fluid is conserved,
$$
\frac{\mathrm{D}\Gamma}{\mathrm{D}t} = 0 .
$$
The proof is a two-line calculation: the acceleration is $-\rho^{-1}\nabla p - \nabla\Phi$, the material derivative of the line integral converts to an integral of the acceleration around a loop that moves with the fluid, and the integral of any gradient around a closed curve vanishes. Two consequences frame the subject. Fluid cannot acquire spin from nowhere: a parcel with zero circulation stays irrotational unless friction, a baroclinic term $\nabla\rho\times\nabla p$, or a non-conservative force acts on it — which is why thunderstorm rotation must be **generated**, by shear and pressure forces, and why wings and mountain wakes shed vorticity to satisfy the theorem. And circulation is a **currency**: whatever a loop loses near the surface it must gain elsewhere, and the bookkeeping of that exchange — the vorticity budget — is the arithmetic of this entire lesson.
:::

## Vorticity, absolute and planetary

::: definition Vorticity and the absolute vorticity of the atmosphere {#def-vorticity}
The **vorticity** $\boldsymbol{\zeta}_a = \nabla\times\mathbf{v}_a$ is the circulation per unit area in the limit of a vanishing loop — twice the local angular velocity. For horizontal flow the vertical component is
$$
\zeta_a = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = \zeta + f, \qquad f = 2\Omega\sin\phi ,
$$
the sum of **relative vorticity** $\zeta$, the spin measured in the rotating laboratory, and **planetary vorticity** $f$, the vorticity the parcel inherits from the Earth's rotation simply by sitting still on it. The horizontal components of planetary vorticity, $\Omega\cos\phi$, matter for cross-isobaric circulations and for the spin-up of tornadoes, but the large-scale vorticity equation is governed by the vertical component. Typical numbers organise themselves: relative vorticity in synoptic flow is $\sim 10^{-5}\ \mathrm{s^{-1}}$, half of $f$; inside a severe mesocyclone it reaches $0.1\ \mathrm{s^{-1}}$, ten thousand times larger; and the ratio $\zeta/f$ is the Rossby number in disguise, telling you which approximation regime you are in.
:::

::: example Vorticity of simple flows {#ex-vort-simple}
Find the vertical vorticity of (a) a solid-body rotation with speed $V = \Omega' r$; (b) the pure shear $u = -\Gamma y$ with $\Gamma = 1\times10^{-5}\ \mathrm{s^{-1}}$; (c) a pure deformation field $u = ax$, $v = -ay$.
::: solution
(a) $\zeta = r^{-1}\,\partial(rV)/\partial r = 2\Omega'$ — vorticity is twice angular velocity, the factor that makes "half the vorticity" the rotation rate. (b) $\zeta = \partial v/\partial x - \partial u/\partial y = 0 - (-\Gamma) = +1\times10^{-5}\ \mathrm{s^{-1}}$: **shear is vorticity**, which is why the vorticity of a jet axis is just the cross-section shear of the wind. (c) $\zeta = 0 - 0 = 0$: a pure deformation carries **no vorticity at all** yet sharpens temperature contrasts more effectively than most rotation — rotation turns fluid, deformation strains it, and vorticity measures only the former. Separating the two is the first skill of flow diagnosis.
:::
:::

## Potential vorticity

::: proposition Ertel's potential vorticity and its conservation {#prop-pv}
For adiabatic, frictionless flow, combine the vorticity equation with the thermodynamic equation and continuity, and the scalar
$$
P = \frac{1}{\rho}\,\boldsymbol{\zeta}_a\cdot\nabla\theta
$$
— **Ertel's potential vorticity** — is materially conserved, $\mathrm{D}P/\mathrm{D}t = 0$. The dot product projects absolute vorticity onto the **stratification** $\nabla\theta$, and the physical content is a three-way trade: a column can change its spin only by changing its **thickness** — stretching a column aligned with $\nabla\theta$ intensifies the vortex tubes threading it — or by **tilting** relative to the surfaces it threads. In the stratified, nearly horizontal regime appropriate to synoptic motion, $P$ collapses to the **shallow-water potential vorticity**
$$
q = \frac{f + \zeta}{H}, \qquad \frac{\mathrm{D}q}{\mathrm{D}t} = 0 ,
$$
the absolute vorticity per unit thickness of the layer the fluid occupies — the figure skater's law written for the atmosphere. The operational unit is the **potential vorticity unit**, $1\ \mathrm{PVU} = 10^{-6}\ \mathrm{K\,m^{2}\,kg^{-1}\,s^{-1}}$; the tropopause is defined by its PV jump — air below carries $0.5$–$1.5\ \mathrm{PVU}$, air above $2$–$6\ \mathrm{PVU}$ — so the tropopause is not a height surface but a **material isosurface of PV**, and the charts of PV on isentropic surfaces published by the weather services are maps of the atmosphere's true layering.
:::

::: example A column that stretches must spin {#ex-stretch}
An air column between $850$ and $500\ \mathrm{hPa}$ of thickness $4.0\ \mathrm{km}$ and relative vorticity $+2\times10^{-5}\ \mathrm{s^{-1}}$ at $45\ ^\circ\mathrm{N}$ flows over rising terrain and its thickness increases to $5.0\ \mathrm{km}$, adiabatically and frictionlessly. Find the new relative vorticity and the tangential wind it implies around a circle of radius $10\ \mathrm{km}$.
::: solution
Conservation of $q = (f+\zeta)/H$ with $f = 1.03\times10^{-4}\ \mathrm{s^{-1}}$ constant gives
$$
\zeta_2 = (f+\zeta_1)\frac{H_2}{H_1} - f = 1.23\times10^{-4}\times\frac{5.0}{4.0} - 1.03\times10^{-4} = 2.6\times10^{-5}\ \mathrm{s^{-1}} .
$$
The circulation around a $10\ \mathrm{km}$-radius circle is $\Gamma = \pi r^{2}\zeta$, so $V = \zeta r/2 = 0.13\ \mathrm{m\,s^{-1}}$ — a trivial wind, and that is the lesson: synoptic stretching produces vorticities that matter for the **pressure field and the vertical motion** through balanced dynamics, not winds you could feel. The same arithmetic for a convective updraught — thickness doubling from $2$ to $4\ \mathrm{km}$ with $\zeta \gg f$ — multiplies the relative vorticity by two outright, and iterated through a storm's turbulent generations it is the mechanism by which a thunderstorm's modest background spin becomes a mesocyclone's $0.1\ \mathrm{s^{-1}}$.
:::
:::

::: example Ekman pumping: friction is the PV source {#ex-ekman-pv}
A surface cyclone at $45\ ^\circ\mathrm{N}$ has a surface stress whose curl is $|(\nabla\times\boldsymbol{\tau})_z| = 1\times10^{-7}\ \mathrm{N\,m^{-3}}$, with $\rho = 1\ \mathrm{kg\,m^{-3}}$. Estimate the Ekman pumping velocity at the top of the boundary layer and say what it does to the cyclone.
::: solution
$$
w_E = \frac{(\nabla\times\boldsymbol{\tau})_z}{\rho f} = \frac{10^{-7}}{1.03\times10^{-4}} \approx 10^{-3}\ \mathrm{m\,s^{-1}} = 1\ \mathrm{mm\,s^{-1}} .
$$
Cyclonic stress curl pumps **upward** out of the boundary layer; the ascent is forced where friction removes planetary vorticity from the inflowing air, and it is the same millimetre per second that underlies the stratiform rain of the warm sector. Friction is thus not merely a drag: through PV it is the **source and sink** that lets the atmosphere escape its own conservation law — the reason cyclones can spin up and spin down at all, and the reason a landfalling hurricane, cut off from its oceanic PV balance, fills.
:::
:::

## Rossby waves: the atmosphere's own long waves

::: proposition Barotropic Rossby waves {#prop-rossby}
Linearise the non-divergent vorticity equation $\partial\zeta/\partial t + \mathbf{v}\cdot\nabla(f+\zeta) = 0$ about a zonal current $U$ on a beta-plane $f = f_0 + \beta y$, keep first-order terms, and insert a streamfunction wave $\psi = \mathrm{Re}\{\hat\psi\,e^{i(kx+ly-\omega t)}\}$ with $\zeta = \nabla^{2}\psi$:
$$
\omega = kU - \frac{\beta k}{k^{2}+l^{2}}, \qquad c_x \equiv \frac{\omega}{k} = U - \frac{\beta}{k^{2}+l^{2}} .
$$
Every disturbance **shorter** than the planetary scale propagates westward relative to the basic flow at the **beta drift** $\beta/(k^{2}+l^{2})$: the wave's own velocity field advects the planetary vorticity it crosses, and the effect does not vanish however small the amplitude. But the **group velocity** $\partial\omega/\partial k = U + \beta(k^{2}-l^{2})/(k^{2}+l^{2})^{2}$ is eastward relative to the flow for zonal waves: a wavetrain's energy travels downwind while its crests walk upstream, the same division seen in water waves radiating from a fetch. With a westerly current $U$ the waves are **stationary** where $U = \beta/(k^{2}+l^{2})$: the observed quasi-stationary planetary waves of the northern winter are exactly the waves whose drift is cancelled by the westerlies, and this is why blocking patterns persist for weeks.
:::

::: example Rossby wave speeds {#ex-rossby-speed}
At $45\ ^\circ\mathrm{N}$ ($\beta = 1.6\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$), find the phase speed relative to the flow of a pure zonal Rossby wave of wavelength $5000\ \mathrm{km}$, and the zonal current that would make it stationary. What is the westward drift of a $3000\ \mathrm{km}$ wave?
::: solution
With $k = 2\pi/L = 1.26\times10^{-6}\ \mathrm{m^{-1}}$,
$$
c = -\frac{\beta}{k^{2}} = -\frac{1.6\times10^{-11}}{1.58\times10^{-12}} = -10.1\ \mathrm{m\,s^{-1}} ,
$$
so a $20\ \mathrm{m\,s^{-1}}$ westerly carries the wave eastward at $10\ \mathrm{m\,s^{-1}}$, and a $10\ \mathrm{m\,s^{-1}}$ current makes it stationary — long waves propagate eastward only in strong flow and stall in weak. For $L = 3000\ \mathrm{km}$ the drift is $-3.7\ \mathrm{m\,s^{-1}}$: shorter waves drift more slowly westward, which is why short waves on a vorticity map appear to ride east with the current while the long troughs hang back. The $\beta/k^{2}$ law explains, to first order, the migration speed of synoptic systems — the mean westerly minus about ten metres per second — and the westward creep of isolated cutoff lows.
:::
:::

::: widget plot
f: -0.405*x*x; 20-0.405*x*x
x: 1, 10
y: -45, 25
labels: c\ (\text{m/s}),\ U=0; c\ (\text{m/s}),\ U=20
caption: Rossby-wave phase speed $c = U - \beta/k^{2}$ as a function of zonal wavelength $x$ in units of $1000\ \mathrm{km}$: the parabola $-0.405\,L^{2}\ \mathrm{m\,s^{-1}}$ (with $\beta = 1.6\times10^{-11}$) is the beta drift in the fluid frame; a $20\ \mathrm{m\,s^{-1}}$ westerly shifts the curve up. Read the **stationary wavelength** where the second curve crosses zero, near $L \approx 7000\ \mathrm{km}$ — wavenumber 5–6, the scale of the observed quasi-stationary planetary waves. Wavelengths longer than this move **westward even within the westerlies** — the fate of the great blocking ridges, which is why they persist.
:::

## The PV view: inversion, instability, and the Rhines scale

::: definition PV inversion and geostrophic turbulence {#def-pv-inversion}
Because balanced dynamics is elliptic, the distribution of PV plus boundary information **determines** the balanced wind and mass fields — the program of **PV inversion**: given $q$ on interior surfaces and the surface temperature as lower boundary condition, solve an elliptic equation for the streamfunction and recover the balanced wind, temperature and vertical motion. A surface low reads as the balanced response to a positive PV anomaly aloft; a surface warm anomaly as negative PV; and the mutual orbiting of two PV anomalies is the mechanism of baroclinic wave growth. When the flow is nearly two-dimensional — large horizontal scale, strong stratification — the PV cascade runs **inverse**: not to smaller eddies as in three-dimensional turbulence but to larger ones, because columnar vorticity cannot be stretched into the missing dimension. The cascade runs upscale until the beta effect arrests it at the **Rhines scale**
$$
L_R = \sqrt{\frac{U}{\beta}},
$$
where the Rossby-wave drift matches the eddy advection: $25\ \mathrm{km}$ for $U = 1\ \mathrm{cm\,s^{-1}}$ and $8\ \mathrm{km}$ for $1\ \mathrm{mm\,s^{-1}}$ in the ocean, and $2500\ \mathrm{km}$ for the atmosphere's $U \sim 10\ \mathrm{m\,s^{-1}}$ — the width of the jet streams themselves. The great zonal jets of atmosphere and ocean are not imposed directly by the forcing but are **turbulent condensates** of an inverse cascade arrested by planetary vorticity, which is why Jupiter's belts and the Earth's westerlies look alike.
:::

::: warning Vorticity is not velocity, PV is not conserved everywhere, and crests are not energy
Five errors to disarm. **Vorticity is not velocity**: the bathtub's irrotational vortex has zero vorticity everywhere outside its core, and a uniform shear has vorticity while its streamlines curve not at all — always compute $\nabla\times\mathbf{v}$; never eyeball "swirl". **PV conservation has hypotheses**: it fails wherever friction, diabatic heating or baroclinic torque act — which is to say, precisely where weather is made; the art is knowing which term breaks the conservation in a given problem, and over what time. **The beta drift is not the total motion**: systems are advected by the mean flow **and** drift westward relative to it; forgetting either contribution mispredicts everything from storm tracks to cutoff lows. **Phase speed is not energy speed**: Rossby-wave crests march westward relative to the flow while the energy propagates eastward — a wavetrain forced by an island or an aircraft sends its signal downwind, not upstream. **And a PV chart is not a vorticity chart**: a PV anomaly can exist with little relative vorticity at all, since a thickness anomaly threads the same vortex tube, and the sharp PV maxima at the edges of tropopause folds are **folds of the PV surface** — material structures that advect, break, and inject stratospheric air into the troposphere like a conveyor belt.
:::

::: history
**Lord Kelvin** stated the circulation theorem in 1869, and **Hermann von Helmholtz** published the vortex theorems in the same year; **Ludwig Prandtl**'s 1904 boundary layer supplied the frictional source term that makes the bookkeeping complete. **C.-G. Rossby**'s 1939 paper on the variation of the Coriolis parameter with latitude and the waves named after him is the founding document of the Rossby-wave view of the atmosphere. **H. Ertel** proved the potential-vorticity conservation theorem in 1942, and **Jule Charney** and **A. Obukhov** independently derived the quasi-geostrophic potential vorticity equation in 1948–49, the equation on which operational balanced dynamics still runs. The modern PV worldview — inversion, isentropic PV maps, tropopause folding — was crystallised by **M. Hoskins**, **T. McIntyre** and **R. Robertson** in their 1985 paper on the use and significance of isentropic potential vorticity maps. The inverse cascade is **R. Kraichnan**'s 1967 prediction for two-dimensional turbulence, the beta-arrest scale **R. Rhines**'s 1975 argument, and the observational basis for both came from the **MODE** and mid-latitude current-meter experiments of the 1970s, which found the ocean's eddy field saturated at exactly the scales the theory predicts.
:::

The Coriolis parameter and the beta effect behind the whole theory are in [[atmospheric-dynamics/equations-of-motion]], the balanced flows that PV inversion recovers are in [[atmospheric-dynamics/balanced-flow]], the frictional sources and sinks of PV are in [[atmospheric-dynamics/boundary-layer]], the instability that converts mean available potential energy into Rossby waves is treated in [[atmospheric-dynamics/general-circulation]], the waves' role in storm tracks in [[meteorology/fronts-cyclones]], the oceanic eddies and jets in [[oceanography/wind-driven]] and [[oceanography/overturning]], and the stratospheric PV conveyor in [[atmospheric-chemistry/stratospheric-ozone]].

::: quiz
An air column flows into a region where $f$ is larger, with no change in thickness. It responds by
- [ ] spinning up cyclonically.
- [x] acquiring anticyclonic relative vorticity.
- [ ] stretching its thickness.
- [ ] doing nothing — $f$ is not a real vorticity.
::: solution
$(f+\zeta)/H$ conserved with $H$ fixed means $\zeta$ must fall as $f$ rises: the column turns **anticyclonically**. This is why poleward flow anywhere on the planet must acquire anticyclonic curvature — the reason the Gulf Stream separates from the North American coast, western boundary currents exist, and the atmosphere's poleward currents shear anticyclonically into the western flank of every ocean gyre.
:::
:::

::: summary
- Circulation is conserved following the fluid in the absence of friction, baroclinity and non-conservative forces (Kelvin's theorem); vorticity is its areal density, and the atmosphere's vertical vorticity is relative spin plus planetary $f$.
- Ertel's PV, $\rho^{-1}\boldsymbol{\zeta}_a\cdot\nabla\theta$, is materially conserved in adiabatic frictionless flow; in the shallow-water limit it is absolute vorticity per unit layer thickness.
- Columns spin up when stretched and acquire anticyclonic relative vorticity when they move poleward — the two horsemen of vorticity thinking.
- PV is created and destroyed in the boundary layer and by diabatic heating; these sources are the only way the atmosphere changes its PV, and the tropopause is a PV surface, not a height surface.
- Rossby waves exist because $f$ varies with latitude: they drift westward relative to the flow at $\beta/(k^{2}+l^{2})$, carry energy eastward, and stand still where the westerlies cancel the drift — the origin of quasi-stationary planetary waves and blocking.
- Balanced dynamics is PV inversion; two-dimensional turbulence cascades PV upscale to the Rhines scale, and the jets of the atmosphere and ocean are what the cascade leaves behind.
:::

## Exercises

::: exercise Vorticity of a shear {level=1 check="1"}
The westerly wind decreases northward at $10\ \mathrm{m\,s^{-1}}$ per $1000\ \mathrm{km}$. Compute the relative vorticity in units of $10^{-5}\ \mathrm{s^{-1}}$. (Enter the number.)
::: solution
$\zeta = \partial v/\partial x - \partial u/\partial y = -(-10/10^{6}) = +1\times10^{-5}\ \mathrm{s^{-1}}$. Half of $f$ at mid-latitudes: jet-scale shear is vorticity of synoptic importance, and a vorticity maximum on a chart is a shear maximum, nothing more mysterious.
:::
:::

::: exercise Rossby drift {level=1 check="10"}
Find the westward phase speed in $\mathrm{m\,s^{-1}}$ of a zonal Rossby wave of wavelength $5000\ \mathrm{km}$ at $45\ ^\circ\mathrm{N}$ ($\beta = 1.6\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$). (Enter the magnitude.)
::: solution
$\beta/k^{2} = 1.6\times10^{-11}/(1.26\times10^{-6})^{2} = 10\ \mathrm{m\,s^{-1}}$. Synoptic systems therefore move with the mean westerly **minus** about $10\ \mathrm{m\,s^{-1}}$ — the correction that separates a novice's from an analyst's forecast of a 500 hPa trough.
:::
:::

::: exercise Stretching {level=1 check="2.6"}
For the column of the worked example ($f = 1.03\times10^{-4}\ \mathrm{s^{-1}}$, $\zeta_1 = 2\times10^{-5}\ \mathrm{s^{-1}}$, $H: 4 \to 5\ \mathrm{km}$), find the final relative vorticity in units of $10^{-5}\ \mathrm{s^{-1}}$. (Enter to one decimal.)
::: solution
$\zeta_2 = (f+\zeta_1)(H_2/H_1) - f = 1.23\times10^{-4}\times1.25 - 1.03\times10^{-4} = 2.6\times10^{-5}\ \mathrm{s^{-1}}$. A 25 per cent stretch buys 30 per cent more relative vorticity — the amplification factor of orographic and convective spin-up, at every scale from lee troughs to supercells.
:::
:::

::: exercise Stationary waves {level=2 check="7"}
With $U = 20\ \mathrm{m\,s^{-1}}$ at $45\ ^\circ\mathrm{N}$, find the zonal wavelength at which Rossby waves are stationary, in units of $1000\ \mathrm{km}$. (Enter to the nearest thousand km.)
::: solution
$\beta/k^{2} = U \Rightarrow k = \sqrt{\beta/U} = \sqrt{1.6\times10^{-11}/20} = 8.9\times10^{-7}\ \mathrm{m^{-1}}$, so $L = 2\pi/k = 7000\ \mathrm{km}$. Wavenumber 5–6: the strongest observed quasi-stationary planetary waves of the northern winter sit exactly at this wavelength — the standing triumph of the beta-effect theory over the older "mountains only" view.
:::
:::

::: exercise Ekman pumping {level=2 check="1.6"}
For a stress curl of $2\times10^{-7}\ \mathrm{N\,m^{-3}}$ at $60\ ^\circ\mathrm{N}$ ($f = 1.26\times10^{-4}\ \mathrm{s^{-1}}$, $\rho = 1\ \mathrm{kg\,m^{-3}}$), find the Ekman pumping velocity in $\mathrm{mm\,s^{-1}}$. (Enter to one decimal.)
::: solution
$w = 2\times10^{-7}/1.26\times10^{-4} = 1.6\ \mathrm{mm\,s^{-1}}$. Millimetres per second sustained for a day lift an entire cloud layer: boundary-layer friction, through this formula, is the rain-maker of the warm sector and the spin-down brake of every landfalling hurricane.
:::
:::

::: exercise PV of a layer {level=2 check="2.6"}
Compute the shallow-water PV $q = (f+\zeta)/H$ in units of $10^{-8}\ \mathrm{s^{-1}\,m^{-1}}$ for $f = 1.03\times10^{-4}$, $\zeta = 2.6\times10^{-5}\ \mathrm{s^{-1}}$, $H = 5000\ \mathrm{m}$. (Enter to one decimal.)
::: solution
$q = 1.29\times10^{-4}/5000 = 2.6\times10^{-8}\ \mathrm{s^{-1}\,m^{-1}}$. The shallow-water $q$ and the Ertel $P$ differ in units but carry the same bookkeeping; converting between them through layer thickness and static stability is the routine that connects this lesson's layer thinking to the isentropic PV maps of operational practice.
:::
:::

::: exercise Deriving the Rossby wave {level=3 check="3.7"}
Linearise $\partial\zeta/\partial t + U\,\partial\zeta/\partial x + \beta v = 0$ with $\zeta = \nabla^{2}\psi$ and $v = \partial\psi/\partial x$, insert $\psi = \hat\psi\,e^{i(kx+ly-\omega t)}$, derive $c = U - \beta/(k^{2}+l^{2})$, and evaluate the drift relative to the flow for $L = 3000\ \mathrm{km}$ zonal, in $\mathrm{m\,s^{-1}}$. (Enter the magnitude to one decimal.)
::: solution
Substituting, $\zeta = -(k^{2}+l^{2})\psi \equiv -K^{2}\psi$ and $v = ik\psi$, so the equation becomes
$$
-i\omega(-K^{2}) + ikU(-K^{2}) + \beta\,ik = 0 \;\Longrightarrow\; \omega K^{2} = kUK^{2} - \beta k \;\Longrightarrow\; c = \frac{\omega}{k} = U - \frac{\beta}{K^{2}} .
$$
For $l = 0$ and $L = 3000\ \mathrm{km}$: $c - U = -1.6\times10^{-11}/(2.09\times10^{-6})^{2} = -3.7\ \mathrm{m\,s^{-1}}$. These four lines are the most-reproduced calculation in dynamic meteorology; every student of the subject has written them, and every seasonal forecast ultimately negotiates with their consequence.
:::
:::

::: exercise Rhines scale {level=3 check="25"}
Find the Rhines scale $L_R = \sqrt{U/\beta}$ in km for $U = 10^{-2}\ \mathrm{m\,s^{-1}}$ (a typical ocean mesoscale eddy speed) at $45\ ^\circ\mathrm{N}$. (Enter to the nearest km.)
::: solution
$L_R = \sqrt{10^{-2}/1.6\times10^{-11}} = \sqrt{6.25\times10^{8}} = 25\ \mathrm{km}$. The observed first-baroclinic deformation radii of $10$–$30\ \mathrm{km}$ and the eddy scales of $50$–$100\ \mathrm{km}$ measured from floats and altimetry bracket this value, and the order-of-magnitude agreement everywhere in the ocean is the evidence that mesoscale eddies are geostrophic turbulence arrested by the beta effect. For the atmosphere with $U \sim 10\ \mathrm{m\,s^{-1}}$, $L_R \approx 2500\ \mathrm{km}$ — the width of the jet streams, which is why the atmospheric inverse cascade ends in jets rather than in a single planetary vortex.
:::
:::
