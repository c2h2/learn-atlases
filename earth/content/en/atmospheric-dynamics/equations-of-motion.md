Release a parcel of air at rest aloft with a pressure difference across it, and Newton's second law says it should accelerate from rest straight down the gradient, reaching hurricane speeds in minutes and a forecast that bears no relation to any observed weather. What actually happens is stranger: the parcel never goes where the force points. It turns — steadily, predictably, at a rate set by latitude alone — until it blows along the isobars instead of across them, and every synoptic chart on Earth is a map of that compromise. The cause is the rotation of the planet, and the mathematics of forces seen from a rotating frame is the single most consequential idea in meteorology.

## Forces, and how rotation multiplies them

::: definition The real and apparent forces of the atmosphere {#def-forces}
An air parcel of density $\rho$ feels three **real** forces per unit mass: the pressure-gradient force $-\rho^{-1}\nabla p$, gravity $\mathbf{g}$, and molecular or turbulent friction $\mathbf{F}$; plus, when its motion is described in the frame rotating with the Earth at angular velocity $\boldsymbol{\Omega} = (0, 0, \Omega\cos\phi)$ at latitude $\phi$, two **apparent** (inertial-frame) forces,
$$
\frac{\mathrm{d}\mathbf{v}}{\mathrm{d}t} = -\frac{1}{\rho}\nabla p - 2\boldsymbol{\Omega}\times\mathbf{v} - \boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\mathbf{r}) + \mathbf{F} + \mathbf{g},
$$
the **Coriolis force** $-2\boldsymbol{\Omega}\times\mathbf{v}$, proportional to the velocity and perpendicular to it, and the **centrifugal force**, which is steady and tiny in its variations and is absorbed, together with true gravity, into the measured effective gravity $\mathbf{g}^{\ast}$ that defines the geopotential $\Phi$. Taking the vertical component of the Coriolis force gives the **Coriolis parameter**
$$
f = 2\Omega\sin\phi = 1.46\times10^{-4}\sin\phi\ \ \mathrm{s^{-1}},
$$
which is $7.3\times10^{-5}\ \mathrm{s^{-1}}$ at $30\ ^\circ\mathrm{N}$, $1.03\times10^{-4}$ at $45$, $1.26\times10^{-4}$ at $60$, and zero at the equator. The horizontal Coriolis force per unit mass on a $10\ \mathrm{m\,s^{-1}}$ wind at $45\ ^\circ\mathrm{N}$ is $fU = 1.0\times10^{-3}\ \mathrm{m\,s^{-2}}$ — small against $g$, but exactly the size of the horizontal pressure-gradient force of a $1\ \mathrm{hPa}$ in $100\ \mathrm{km}$, which is the ordinary pressure difference across a surface low. The rotation of the Earth is not a refinement of the force balance; it is one of the two terms in it.
:::

::: example The Coriolis force against the pressure force {#ex-coriolis-scale}
Compare the three forces per unit mass on $U = 10\ \mathrm{m\,s^{-1}}$ air at $45\ ^\circ\mathrm{N}$ moving across a pressure field with $|\nabla_h p| = 1\ \mathrm{hPa}$ per $100\ \mathrm{km}$ ($\rho = 1.2\ \mathrm{kg\,m^{-3}}$).
::: solution
Pressure gradient: $|\nabla p|/\rho = 100/10^{5}/1.2 = 8.3\times10^{-4}\ \mathrm{m\,s^{-2}}$. Coriolis: $fU = 1.03\times10^{-4}\times10 = 1.0\times10^{-3}\ \mathrm{m\,s^{-2}}$. Friction near the surface is of the same order when the wind departs the balanced flow by a few $\mathrm{m\,s^{-1}}$. Gravity is $9.81\ \mathrm{m\,s^{-2}}$, four orders larger — but it is balanced almost exactly by the vertical pressure force (hydroscopy below), leaving the two horizontal forces of comparable size to determine the wind. The balance of the first two is geostrophy; the near-cancellation of gravity's vertical role is hydrostatics; these two balances are the reason a weather map can be read like a chart of forces rather than solved as one.
:::
:::

## Scale, and the Rossby number

::: proposition Scale analysis and the Rossby number {#prop-ro}
Nondimensionalise the horizontal momentum equation with velocity $U$, horizontal length $L$ and time scale $L/U$: the local acceleration scales as $U^{2}/L$, the Coriolis term as $fU$, and their ratio is the **Rossby number**
$$
\mathrm{Ro} = \frac{U}{fL},
$$
the ratio of inertial to rotational effects. For the large-scale atmosphere $U \sim 10\ \mathrm{m\,s^{-1}}$, $L \sim 1000\ \mathrm{km}$, $f \sim 10^{-4}\ \mathrm{s^{-1}}$, so $\mathrm{Ro} \sim 0.1$: rotation dominates, and to ten per cent accuracy the flow is the balance of pressure force and Coriolis force. A tornado with $U \sim 50\ \mathrm{m\,s^{-1}}$ and $L \sim 100\ \mathrm{m}$ has $\mathrm{Ro} \sim 5000$: the Earth turns underneath it uselessly, and its wind is set by the radial pressure gradient alone. A mesoscale convective system with $L \sim 100\ \mathrm{km}$ has $\mathrm{Ro} \sim 1$: neither limit applies, and it is precisely at these scales that weather forecasting is hardest. The Rossby number is the first calculation of any dynamical problem, because it says which terms of the equations may be thrown away before anything is solved.
:::

::: example Rossby numbers of the atmosphere {#ex-ro}
Compute $\mathrm{Ro}$ for (a) a surface low with $U = 15\ \mathrm{m\,s^{-1}}$ and radius $500\ \mathrm{km}$ at $45\ ^\circ\mathrm{N}$; (b) a sea breeze of $5\ \mathrm{m\,s^{-1}}$ spanning $20\ \mathrm{km}$; (c) a wake turbulence eddy of $1\ \mathrm{m\,s^{-1}}$ across $10\ \mathrm{m}$.
::: solution
With $f = 1.03\times10^{-4}\ \mathrm{s^{-1}}$: (a) $\mathrm{Ro} = 15/(f\times5\times10^{5}) = 0.29$ — rotation matters but the flow around a tight low is noticeably ageostrophic. (b) $\mathrm{Ro} = 5/(f\times2\times10^{4}) = 2.4$ — the sea breeze is a non-rotating thermal circulation, which is why it can be modelled without the Coriolis term at all. (c) $\mathrm{Ro} = 1/(f\times10) = 10^{3}$ — rotation is irrelevant to an eddy behind a building. The atmosphere is thus not "one flow" but a superposition of scales, the largest rotating and nearly balanced, the smallest non-rotating and turbulent, and the whole problem of numerical weather prediction is that the model must resolve, or parameterise, the transition between them.
:::
:::

::: widget plot
f: 1.458*sin(x*pi/180)
x: -90, 90
y: -1.5, 1.5
labels: 10^{4}f\ (\text{s}^{-1})
caption: The Coriolis parameter $f = 2\Omega\sin\phi$ (scaled by $10^{4}$) as a function of latitude. Note the **antisymmetry** — $f$ is negative in the Southern Hemisphere, so inertial oscillations turn the other way — and the **vanishing at the equator**, which is why the Coriolis approximation used at mid-latitudes breaks down in the tropics and why equatorial dynamics needs its own machinery. The slope at the equator, $\beta = \mathrm{d}f/\mathrm{d}y = 2\Omega\cos\phi/R = 1.6\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$ at $45\ ^\circ\mathrm{N}$, is the parameter that makes Rossby waves possible.
:::

## The equations of motion

::: definition The primitive equations {#def-primitive}
On a beta-plane with $f$ constant over the domain of interest, the **primitive equations** — the ancestor of every operational forecast model — are the horizontal momentum equations with the Coriolis terms,
$$
\frac{\mathrm{d}u}{\mathrm{d}t} = -\frac{1}{\rho}\frac{\partial p}{\partial x} + fv - F_x, \qquad
\frac{\mathrm{d}v}{\mathrm{d}t} = -\frac{1}{\rho}\frac{\partial p}{\partial y} - fu - F_y,
$$
the hydrostatic vertical momentum equation, the mass continuity equation,
$$
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0,
$$
the first law in potential-temperature form, and the ideal gas law $p = \rho R_d T$. The material derivative $\mathrm{d}/\mathrm{d}t = \partial/\partial t + u\,\partial/\partial x + v\,\partial/\partial y + w\,\partial/\partial z$ carries the parcel-following change; its presence makes the system nonlinear and the atmosphere chaotic. The hydrostatic equation that closes the system is derived below; its validity for all but the smallest, most violently vertical motions is what makes the vertical velocity a diagnostic rather than a predicted variable in most models.
:::

::: proposition Hydrostatic balance {#der-hydrostatic}
Balance the vertical forces on a slab of air of thickness $\delta z$ and unit area: pressure force below minus above, $(p(z) - p(z + \delta z))A$, against weight $\rho g A\,\delta z$. Then
$$
\frac{p(z) - p(z+\delta z)}{\rho g\,\delta z} = 1 \;\longrightarrow\; \frac{\partial p}{\partial z} = -\rho g .
$$
Is this an approximation? Yes, and its error is measurable. Scale the vertical momentum equation: vertical acceleration $\sim W^{2}/H$, pressure-gradient minus gravity residual $\sim (U^{2}/L)\cdot(H/L)\cdot(\text{aspect factor})$; the ratio of the neglected terms to the retained ones is $\mathrm{Ro}\cdot(WH/uL)\cdot(H/L)$, and for a synoptic system with $H/L = 10\ \mathrm{km}/1000\ \mathrm{km} = 10^{-2}$ the hydrostatic error is below one per cent. For a deep convective cloud with $H/L \sim 1$ and $\mathrm{Ro} \sim 1$ it is not small at all — which is why nonhydrostatic models are used for convection-permitting forecasts and for the turbulent boundary layer, and hydrostatic ones for the global medium range.
:::

::: example The thickness of a layer {#ex-thickness}
Integrating the hydrostatic equation with the ideal gas law gives the **thickness** of the layer between two pressures, $H = z_2 - z_1 = R_d \bar{T} \ln(p_1/p_2)/g$. Find the $1000$–$900\ \mathrm{hPa}$ layer thickness when the mean temperature is $288\ \mathrm{K}$, and explain why warm columns have thick layers.
::: solution
$$
H = \frac{287\times288\times\ln(1000/900)}{9.81} = \frac{287\times288\times0.105}{9.81} = 888\ \mathrm{m}.
$$
The thickness is proportional to $\bar T$: a column $3\ \mathrm{K}$ warmer than another has its $900\ \mathrm{hPa}$ surface about $30\ \mathrm{m}$ higher, and this is exactly what the constant-pressure charts show — warm lows aloft, thick layers under ridges. It is also why an altimeter set to a standard atmosphere reads high when the air is warm: the aircraft is really higher than the pressure says, the error accumulating at about $4\ \mathrm{m}$ per kelvin per kilometre, a fact that matters more to pilots than to meteorologists.
:::
:::

## Geostrophy

::: definition Geostrophic wind {#def-geostrophic}
For horizontal, steady, frictionless flow at small Rossby number, the momentum equations reduce to the balance of pressure-gradient and Coriolis forces,
$$
f v_g = \frac{1}{\rho}\frac{\partial p}{\partial y}, \qquad -f u_g = -\frac{1}{\rho}\frac{\partial p}{\partial x}, \qquad \mathbf{v}_g = \frac{1}{\rho f}\,\mathbf{k}\times\nabla_h p .
$$
The **geostrophic wind** blows parallel to the isobars — down them with low pressure to the left in the Northern Hemisphere — with speed proportional to the pressure gradient and inversely proportional to $f$ and $\rho$. A $1\ \mathrm{hPa}$ in $100\ \mathrm{km}$ gradient gives $8.1\ \mathrm{m\,s^{-1}}$ at $45\ ^\circ\mathrm{N}$, $11.4$ at $30$, $6.6$ at $60$: the same chart reads windier in the subtropics. Geostrophy is not a law but a **balance that the flow approaches**: an air parcel started from rest spirals asymptotically toward $\mathbf{v}_g$ (the inertial circle superposed on it), and any change in the pressure field puts the wind out of balance and starts it oscillating again. The operational content is the twin use: read the wind from the height field, or — the harder and more useful direction — read the height patterns as the record of the winds that made them.
:::

::: example Computing the geostrophic wind {#ex-geostrophic}
At $45\ ^\circ\mathrm{N}$ the $500\ \mathrm{hPa}$ heights decrease northward at $60\ \mathrm{m}$ per $200\ \mathrm{km}$ ($\bar T \approx 255\ \mathrm{K}$, so $\rho \approx 0.6\ \mathrm{kg\,m^{-3}}$ at that level; equivalently $\partial\Phi/\partial y = g\,\partial z/\partial y$). Find the geostrophic wind, and say which way it blows.
::: solution
The geopotential gradient is $|\partial\Phi/\partial y| = 9.81\times60/2\times10^{5} = 2.94\times10^{-3}\ \mathrm{m^{2}\,s^{-2}}$ per metre, so
$$
V_g = \frac{1}{f}\left|\frac{\partial\Phi}{\partial y}\right| = \frac{2.94\times10^{-3}}{1.03\times10^{-4}} = 28.5\ \mathrm{m\,s^{-1}} .
$$
Heights fall to the north, so the gradient vector points south (toward low heights); $\mathbf{v}_g = f^{-1}\mathbf{k}\times\nabla\Phi$ points east: the wind blows **from the west** with low heights to the left. This is the mid-latitude westerly jet — a $30\ \mathrm{m\,s^{-1}}$ geostrophic wind is an ordinary upper chart, and the entire storm-track dynamics of the middle latitudes runs on the thermal wind that this vertical structure implies.
:::
:::

## Inertial oscillations and gradient winds

::: proposition Inertial motion {#prop-inertial}
With no pressure gradient, the momentum equations reduce to $\dot u = fv$, $\dot v = -fu$, whose solution is a circle of constant speed — the **inertial oscillation** —
$$
u = U\cos ft, \qquad v = -U\sin ft,
$$
traversed clockwise (anticyclonically) in the Northern Hemisphere with period
$$
T_i = \frac{2\pi}{f} = \frac{17.4}{\sin\phi}\ \mathrm{h},
$$
about $17\ \mathrm{h}$ at $45\ ^\circ\mathrm{N}$, $14\ \mathrm{h}$ at $60$, infinite at the equator. A parcel displaced with speed $U$ circles with radius $U/f$: $97\ \mathrm{km}$ for $10\ \mathrm{m\,s^{-1}}$ at $45\ ^\circ\mathrm{N}$. Inertial oscillations are not a classroom fiction: near-inertial currents are a large fraction of the observed variance of the oceanic mixed layer and of the nocturnal boundary layer after sunset, when friction relaxes and the wind is free to oscillate — the same physics as the evening wind-speed maximum on the diurnal cycle.
:::

::: widget parametric
fx: cos(t)
fy: -sin(t)
t: 0, 2pi
caption: An **inertial circle** viewed from above, Northern Hemisphere: a parcel with no force on it but the Coriolis force travels clockwise at constant speed with period $2\pi/f$. The radius in physical units is $U/f$ — about $100\ \mathrm{km}$ for a $10\ \mathrm{m\,s^{-1}}$ wind at $45\ ^\circ\mathrm{N}$ — and the sense reverses south of the equator. Superpose this circle on the geostrophic drift and you have the complete frictionless solution: the parcel loops around its balanced wind.
:::

::: definition Gradient wind {#def-gradient}
Around a curved flow with radius of curvature $r$ (positive for cyclonic), the steady radial balance of pressure force, Coriolis force and centrifugal acceleration $V^{2}/r$ is the **gradient wind** relation
$$
\frac{V^{2}}{r} + fV = \frac{1}{\rho}\frac{\partial p}{\partial n} \equiv f V_g, \qquad V = \frac{fr}{2}\left[\sqrt{1 + \frac{4V_g}{fr}} - 1\right] \ (\text{low}), \quad \frac{fr}{2}\left[\sqrt{1 - \frac{4V_g}{fr}} - 1\right]\text{-form}\ (\text{high}).
$$
Around lows the wind is **subgeostrophic** — curvature takes up part of the pressure force — and around highs **supergeostrophic**, until the anticyclonic square root fails: no steady curved flow exists when $V_g > fr/4$. At $r = 100\ \mathrm{km}$ and $45\ ^\circ\mathrm{N}$ that ceiling is $2.6\ \mathrm{m\,s^{-1}}$, which is why strong winds never occur around tight anticyclones and why the great anticyclones of the subtropics are broad, flat and weak, while lows can be small and violent. The gradient wind is the balance of hurricanes in their outer wind maxima, of the flow around cutoff lows, and of every curved streamline on a surface chart.
:::

::: example Curvature corrections {#ex-gradient}
At $45\ ^\circ\mathrm{N}$, find the gradient wind for (a) a low of radius $500\ \mathrm{km}$ with $V_g = 10\ \mathrm{m\,s^{-1}}$; (b) a low of radius $100\ \mathrm{km}$ with $V_g = 20\ \mathrm{m\,s^{-1}}$; (c) the largest $V_g$ that admits a steady anticyclonic solution at $r = 100\ \mathrm{km}$.
::: solution
With $f = 1.03\times10^{-4}\ \mathrm{s^{-1}}$: (a) $fr = 51.6\ \mathrm{m\,s^{-1}}$, so $V = 25.8(\sqrt{1 + 40/51.6} - 1) = 8.6\ \mathrm{m\,s^{-1}}$, fourteen per cent subgeostrophic — a modest correction. (b) $fr = 10.3$, and $V = 5.15(\sqrt{1+80/10.3}-1) = 10.1\ \mathrm{m\,s^{-1}}$: half the geostrophic value — tight curvature dominates the balance and the chart's isobar spacing badly overestimates the wind. (c) The anticyclonic discriminant requires $V_g \le fr/4 = 2.6\ \mathrm{m\,s^{-1}}$. The practical rules follow: curvature corrections matter when $r \lesssim 500\ \mathrm{km}$, they always reduce cyclonic and would destroy anticyclonic solutions at large $V_g$, and the surface low that a forecast model resolves at $50\ \mathrm{km}$ scale cannot be read with the geostrophic rule at all.
:::
:::

::: example Near-inertial currents {#ex-inertial-current}
After a storm passes, the ocean mixed layer at $45\ ^\circ\mathrm{N}$ is left out of balance with a spatially uniform ageostrophic velocity of $0.5\ \mathrm{m\,s^{-1}}$ (frictional relaxation of the wind-driven current leaves it short of the geostrophic value). Describe the subsequent motion and find the amplitude of the oscillation and the maximum displacement from the mean position.
::: solution
With the ageostrophic velocity $\mathbf{u}_a$ measured relative to the geostrophic flow, the momentum equation is $\mathrm{d}\mathbf{u}_a/\mathrm{d}t = -f\,\mathbf{k}\times\mathbf{u}_a$: the mixed layer executes an inertial oscillation of amplitude $0.5\ \mathrm{m\,s^{-1}}$ with period $2\pi/f = 17\ \mathrm{h}$ superposed on its mean geostrophic drift. The displacement amplitude is $u_a/f = 0.5/1.03\times10^{-4} = 4.9\ \mathrm{km}$: a water parcel wanders kilometres around its mean position without any change in the wind. Observed current-meter records show exactly this — rings of $17$-hour oscillation ringing like a struck bell for days after each storm — and the same ringing explains the oscillating overshoots in the nocturnal low-level jet, where the relaxation of surface friction at sunset leaves the wind ageostrophic and the boundary layer inertially oscillating until morning friction damps it again.
:::
:::

::: warning The Coriolis force does no work, the bath does not remember the hemisphere, and the geostrophic wind is not the wind
Five errors to kill early. **The Coriolis force does no work** — it is perpendicular to the velocity, changes only direction, and can never speed anything up; winds are accelerated by pressure forces and the apparent force merely steers. **The drain-vortex myth**: the direction a bathtub empties is set by the basin's shape and residual swirl, not by the hemisphere — the tank's own Rossby number is enormous — while the same claim is genuinely true for a large, still, carefully controlled tank left to drain for a day. **The geostrophic wind is not the wind**: it is the balanced part, typically 80–100 per cent of the real wind aloft but 50–70 per cent near the surface where friction backs the wind across the isobars toward low pressure — and it is that small cross-isobar component that moves air into lows and makes them deepen. **Zero $f$ is not zero rotation**: at the equator $f = 0$ but the horizontal component of $\boldsymbol{\Omega}$ does not vanish, and equatorial waves and the Kelvin mode are governed by it — the tropics are not rotation-free, they are differently rotating. **And balance is not causation**: the isobars do not "cause" the wind; the wind field and the pressure field are two aspects of one evolving system, and charts look balanced because imbalance is rapidly radiated away as gravity waves and adjusted by ageostrophic motion.
:::

::: history
The kinematics of rotating frames was settled by **Gaspard-Gustave de Coriolis**, who published the form of the apparent force in 1835, building on **Euler**'s and **Laplace**'s earlier mechanics; **Pierre-Simon Laplace** had already written the equations of the fluid atmosphere in 1779. **Christoph Buys Ballot** codified in 1857 the empirical rule — back to the wind, low pressure to the left in the Northern Hemisphere — that is the geostrophic law in folk form. **Vilhelm Bjerknes** recast forecasting as the integration of these equations in 1904, and **Carl-Gustaf Rossby** identified the planetary vorticity gradient and the waves that carry its name in 1939, the discovery that made numerical prediction conceivable. The **gradient wind** relation was worked out in its meteorological application by **Margules** and the Innsbruck school around 1903, and the near-inertial oscillations of the ocean were first isolated in the drift of **Nansen**'s Fram (1893–96), explained by **Ekman** in 1905.
:::

The thermodynamic terms in the first law are developed in [[atmospheric-dynamics/thermodynamics]], the equation of state and static stability in the same lesson, and the moist form in [[atmospheric-dynamics/moist-thermodynamics]]; the radiation that drives the pressure gradients is in [[atmospheric-dynamics/radiative-transfer]]; the vorticity algebra built on these equations is in [[atmospheric-dynamics/vorticity]], the balanced flows of real charts in [[atmospheric-dynamics/balanced-flow]], friction and the boundary layer in [[atmospheric-dynamics/boundary-layer]], and the general circulation they explain in [[atmospheric-dynamics/general-circulation]]. The oceanic inertial currents are treated in [[oceanography/wind-driven]].

::: quiz
A surface low at $45\ ^\circ\mathrm{N}$ has tightly packed, strongly curved isobars. Compared with the geostrophic wind computed from the same pressure gradient, the actual wind is
- [ ] faster, because curvature adds centrifugal force.
- [x] slower, because around a low the pressure force partly supplies the centrifugal acceleration.
- [ ] the same — geostrophic wind is always the actual wind.
- [ ] faster only at night.
::: solution
Around a low the radial balance is $V^{2}/r + fV = fV_g$: the pressure force must supply both the Coriolis force and the centripetal acceleration, so $V < V_g$. For a $100\ \mathrm{km}$-radius low with $V_g = 20\ \mathrm{m\,s^{-1}}$ at $45\ ^\circ\mathrm{N}$ the gradient wind is only $10\ \mathrm{m\,s^{-1}}$ — reading such a system with the geostrophic rule doubles the wind.
:::
:::

::: summary
- In the rotating frame the horizontal momentum equation carries the Coriolis force $-f\mathbf{k}\times\mathbf{v}$ with $f = 2\Omega\sin\phi$, whose size on ordinary winds equals the ordinary pressure-gradient force — rotation is a leading-order term, not a correction.
- The Rossby number $U/fL$ decides which dynamics apply: $\ll 1$ for synoptic flows (geostrophic), $\sim 1$ at the mesoscale, $\gg 1$ for convection and turbulence.
- Vertical motions are hydrostatic at all but the smallest scales; layer thickness is proportional to mean temperature, which is why warm columns have high pressure surfaces.
- Geostrophic wind runs parallel to the isobars with speed $\propto$ pressure gradient $/f$; it is the balanced part of the wind, approached by inertial oscillation about it.
- Frictionless parcels started from rest spiral into the geostrophic wind around inertial circles of radius $U/f$ and period $2\pi/f$; near-inertial motion dominates the ocean mixed layer and the nocturnal boundary layer.
- Curvature makes flow around lows subgeostrophic and around highs supergeostrophic, and anticyclonic solutions cease to exist when $V_g > fr/4$ — the reason strong anticyclonic winds require huge radii.
:::

## Exercises

::: exercise The Coriolis parameter {level=1 check="1.26"}
Compute $f$ at $60\ ^\circ\mathrm{N}$ in units of $10^{-4}\ \mathrm{s^{-1}}$. (Enter the number to two decimals.)
::: solution
$f = 1.46\times10^{-4}\sin 60^\circ = 1.26\times10^{-4}\ \mathrm{s^{-1}}$. The factor of 1.7 between $30$ and $60\ ^\circ\mathrm{N}$ is why the same pressure pattern drives weaker winds the closer you get to the pole.
:::
:::

::: exercise Geostrophic wind {level=1 check="8.1"}
Find the geostrophic wind speed in $\mathrm{m\,s^{-1}}$ for a pressure gradient of $1\ \mathrm{hPa}$ per $100\ \mathrm{km}$ at $45\ ^\circ\mathrm{N}$ with $\rho = 1.2\ \mathrm{kg\,m^{-3}}$. (Enter the speed.)
::: solution
$V_g = |\nabla p|/(\rho f) = 10^{-3}/(1.2\times1.03\times10^{-4}) = 8.1\ \mathrm{m\,s^{-1}}$. Memorise it as the yardstick: one hectopascal per hundred kilometres is eight metres per second at forty-five degrees.
:::
:::

::: exercise Inertial period {level=1 check="17"}
Find the inertial oscillation period in hours at $45\ ^\circ\mathrm{N}$. (Enter the hours to the nearest hour.)
::: solution
$T = 2\pi/f = 2\pi/1.03\times10^{-4} = 6.1\times10^{4}\ \mathrm{s} = 17\ \mathrm{h}$. The period is the reason the nocturnal wind maximum has a period near the local inertial period wherever friction relaxes sharply after sunset.
:::
:::

::: exercise Rossby number of a front {level=2 check="0.5"}
A frontal band at $50\ ^\circ\mathrm{N}$ has $U = 20\ \mathrm{m\,s^{-1}}$ and $L = 100\ \mathrm{km}$. Compute $\mathrm{Ro}$. (Enter the value to one decimal.)
::: solution
With $f = 1.11\times10^{-4}\ \mathrm{s^{-1}}$, $\mathrm{Ro} = 20/(1.11\times10^{-4}\times10^{5}) = 1.8$. Fronts are marginally ageostrophic: rotation still organises them — fronts are narrow because the geostrophic adjustment concentrates them — but the ageostrophic circulation inside them is what lifts the air and makes the cloud band, and it is precisely the $\mathrm{Ro} \sim 1$ term that classical balanced theory throws away.
:::
:::

::: exercise Gradient wind around a low {level=2 check="8.6"}
At $45\ ^\circ\mathrm{N}$ a low of radius $500\ \mathrm{km}$ has $V_g = 10\ \mathrm{m\,s^{-1}}$. Find the gradient wind in $\mathrm{m\,s^{-1}}$. (Enter to one decimal.)
::: solution
$V = \frac{fr}{2}\left(\sqrt{1 + 4V_g/fr}-1\right)$ with $fr = 51.6\ \mathrm{m\,s^{-1}}$: $V = 25.8(\sqrt{1.78}-1) = 8.6\ \mathrm{m\,s^{-1}}$, fourteen per cent below geostrophic. Curvature corrections become important when $4V_g/fr$ approaches unity, i.e. for $r \lesssim 4V_g/f \approx 400\ \mathrm{km}$.
:::
:::

::: exercise Layer thickness {level=2 check="888"}
Find the $1000$–$900\ \mathrm{hPa}$ thickness in metres for a layer mean temperature of $288\ \mathrm{K}$. (Enter metres.)
::: solution
$H = R_d\bar T\ln(p_1/p_2)/g = 287\times288\times0.1054/9.81 = 888\ \mathrm{m}$. At a mean of $273\ \mathrm{K}$ the same layer is $842\ \mathrm{m}$ thick — the $46\ \mathrm{m}$ difference is exactly the signal that upper-air charts display as warm ridges and cold troughs.
:::
:::

::: exercise The anticyclone ceiling {level=3 check="2.6"}
At $45\ ^\circ\mathrm{N}$, find the maximum gradient-wind solution's geostrophic bound $V_g^{\max} = fr/4$ for an anticyclone of radius $100\ \mathrm{km}$, in $\mathrm{m\,s^{-1}}$. (Enter to one decimal.)
::: solution
$V_g^{\max} = fr/4 = 1.03\times10^{-4}\times10^{5}/4 = 2.6\ \mathrm{m\,s^{-1}}$. Beyond this the anticyclonic quadratic has no real root: the required Coriolis force would exceed what the pressure field can supply while also throwing the parcel outward. Nature's workaround is geometry — the great subtropical highs span thousands of kilometres, where $fr/4 \sim 65\ \mathrm{m\,s^{-1}}$ and the ceiling is irrelevant — which is why the strongest winds on the planet cluster around cyclones and never around anticyclones.
:::
:::

::: exercise Deriving the inertial circle {level=3 check="97"}
Starting from $\dot u = fv$, $\dot v = -fu$ with $\mathbf{v}(0) = (U, 0)$, show the trajectory is a circle and find its radius for $U = 10\ \mathrm{m\,s^{-1}}$ at $45\ ^\circ\mathrm{N}$, in km. (Enter km to the nearest km.)
::: solution
Differentiating, $\ddot u = f\dot v = -f^{2}u$, so $u = U\cos ft$ and $v = -U\sin ft$. Integrating from the origin, $x = (U/f)\sin ft$, $y = (U/f)(1 - \cos ft)$: a circle of radius $U/f$ about $(0, U/f)$, traversed clockwise — anticyclonic — with period $2\pi/f$. Numerically $U/f = 10/1.03\times10^{-4} = 97\ \mathrm{km}$. Adding the geostrophic drift $\mathbf{v}_g$ to this solution gives the full frictionless response: the parcel loops along the isobars, its loop radius shrinking with latitude as $f$ grows, and the mean of the looping motion is exactly the geostrophic wind — which is the precise sense in which the atmosphere "adjusts" to balance.
:::
:::
