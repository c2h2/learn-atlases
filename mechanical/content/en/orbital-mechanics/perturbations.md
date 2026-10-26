Everything so far has assumed the ideal two-body problem: a point-mass (or perfectly spherical) Earth, no atmosphere, no Moon, no Sun. Real orbits deviate from that ideal, and the deviations are not academic. The Earth's equatorial bulge swings the orbital plane of the International Space Station round by about five degrees a day; without that effect sun-synchronous Earth-observation orbits would be impossible. Atmospheric drag brings every low satellite down eventually, and determines how long debris remains in orbit. The Moon and Sun slowly tilt geostationary orbits, so that their operators spend most of their propellant fighting back. These departures from Keplerian motion are called **perturbations**. This chapter sets up the perturbed equation of motion, describes the two ways of computing with it — direct numerical integration, and the slow variation of orbital elements — derives the most important secular effects of the Earth's oblateness, uses them to design sun-synchronous and critically inclined orbits, and estimates drag decay and orbital lifetime. It ends with a comparison of the sizes of the main perturbations at different altitudes, which tells a designer which ones matter.

The background is the orbital elements of [[orbital-mechanics/orbital-elements]] and the energy and angular-momentum results of [[orbital-mechanics/two-body-problem]].

## The perturbed two-body problem {#sec-perturbed}

With any additional accelerations collected into a **perturbing acceleration** $\mathbf{a}_p$, the equation of motion becomes
$$
\ddot{\mathbf{r}} = -\frac{\mu}{r^3}\,\mathbf{r} + \mathbf{a}_p.
$$ {#eq-perturbed}
For an Earth satellite, $\mathbf{a}_p$ includes the non-spherical part of the Earth's gravity, atmospheric drag, the gravitational pull of the Moon and Sun (as a difference between their pull on the satellite and on the Earth), solar radiation pressure, and smaller effects (Earth tides, relativity, thrust). In most cases $\lVert\mathbf{a}_p\rVert$ is a small fraction of $\mu/r^2$, so the orbit is *nearly* Keplerian at every instant, and that observation leads to two methods.

**Special perturbations** integrate [[#eq-perturbed]] numerically. In **Cowell's method** the full equation is integrated directly, in Cartesian coordinates, with a high-order integrator ([numerical ODEs](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes)); it is simple, handles any force model, and is the workhorse of modern orbit software. **Encke's method** integrates only the small deviation from a reference Keplerian orbit, which allows larger steps, and **rectifies** (resets) the reference orbit when the deviation grows.

**General perturbations** describe how the orbital elements change slowly under $\mathbf{a}_p$. They give understanding rather than numbers: how fast the node moves, why some inclinations are special, how drag shrinks an orbit. The rest of this chapter takes this route.

::: definition Osculating elements {#def-osculating}
At each instant, the **osculating orbit** is the Keplerian orbit the satellite would follow if $\mathbf{a}_p$ were switched off at that instant; its elements, computed from the instantaneous state vector by the algorithm of [[orbital-mechanics/orbital-elements]], are the **osculating elements**. Under a perturbation they change with time. Their changes are usually split into **secular** variations (steady drifts), **long-periodic** variations (periods much longer than the orbit) and **short-periodic** variations (at the orbital frequency and its multiples). **Mean elements** are osculating elements with the short-periodic terms averaged out.
:::

## Gauss's variational equations {#sec-gauss}

Resolve the perturbing acceleration in the satellite's **RSW** frame: $R$ radially outward, $S$ in the orbital plane perpendicular to $R$ in the direction of motion, $W$ along the orbit normal, with components $a_r$, $a_s$, $a_w$.

::: proposition Gauss's planetary equations (selected) {#prop-gauss}
With $p = h^2/\mu$, $u = \omega + \theta$ the argument of latitude and $r = p/(1 + e\cos\theta)$, the osculating elements change at the rates
$$
\begin{aligned}
\frac{\mathrm{d}a}{\mathrm{d}t} &= \frac{2a^2}{h}\left(e\sin\theta\,a_r + \frac{p}{r}\,a_s\right),\\
\frac{\mathrm{d}e}{\mathrm{d}t} &= \frac{1}{h}\left(p\sin\theta\,a_r + \left[(p + r)\cos\theta + re\right]a_s\right),\\
\frac{\mathrm{d}i}{\mathrm{d}t} &= \frac{r\cos u}{h}\,a_w,\\
\frac{\mathrm{d}\Omega}{\mathrm{d}t} &= \frac{r\sin u}{h\sin i}\,a_w.
\end{aligned}
$$ {#eq-gauss}
(The equations for $\omega$ and the mean anomaly, which involve all three components, are given in Vallado and in Battin.)
:::

::: proof
We prove the first and last two; the equation for $e$ follows similarly from $\mathbf{e} = \mathbf{v}\times\mathbf{h}/\mu - \mathbf{r}/r$.

*Semi-major axis.* The energy $\varepsilon = v^2/2 - \mu/r = -\mu/(2a)$ changes only through the work done by $\mathbf{a}_p$: $\dot\varepsilon = \mathbf{v}\cdot\mathbf{a}_p = v_ra_r + v_\perp a_s$. Since $\dot\varepsilon = \mu\dot a/(2a^2)$, $\dot a = (2a^2/\mu)(v_ra_r + v_\perp a_s)$. With $v_r = (\mu/h)e\sin\theta$ and $v_\perp = h/r = (\mu/h)(p/r)$ this is the first equation.

*Node and inclination.* $\dot{\mathbf{h}} = \mathbf{r}\times\mathbf{a}_p$. With $\mathbf{r} = r\hat{\mathbf{R}}$, the only component of $\mathbf{a}_p$ that tilts $\mathbf{h}$ is $a_w$: $\mathbf{r}\times a_w\hat{\mathbf{W}} = -ra_w\hat{\mathbf{S}}$. So the unit normal $\hat{\mathbf{W}} = \mathbf{h}/h$ turns at the rate $\dot{\hat{\mathbf{W}}} = -(ra_w/h)\hat{\mathbf{S}}$ (the in-plane components only change $h$). In equatorial components, $\hat{\mathbf{W}} = (\sin\Omega\sin i,\ -\cos\Omega\sin i,\ \cos i)$ (the third column of the matrix $\mathbf{Q}$ of [[orbital-mechanics/orbital-elements]]), and $\hat{\mathbf{S}}$ has $Z$-component $\sin i\cos u$. Comparing $Z$-components: $-\sin i\,\dot i = -(ra_w/h)\sin i\cos u$, giving $\dot i = (r\cos u/h)\,a_w$. Comparing the horizontal components similarly (or using the $\mathbf{K}$-component of $\dot{\mathbf{N}}$) gives $\sin i\,\dot\Omega = (r\sin u/h)\,a_w$. The singularity at $i = 0$ reflects the undefined node of an equatorial orbit.
:::

Two lessons are visible at once. Only out-of-plane forces ($a_w$) rotate the orbital plane, and they do so most effectively at particular points: the inclination changes fastest at the nodes ($\cos u = \pm1$), the node moves fastest at the extreme latitudes ($\sin u = \pm1$). And only the along-track force ($a_s$, for a circular orbit) changes the energy — so drag, which acts against the velocity, lowers $a$.

## The Earth's oblateness: $J_2$ {#sec-j2}

The Earth's rotation flattens it: the equatorial radius ($6378.137\ \mathrm{km}$) exceeds the polar radius by $21.4\ \mathrm{km}$. Its gravitational potential, expanded in spherical harmonics, is dominated after the central term by the second **zonal harmonic**:
$$
U = -\frac{\mu}{r}\left[1 - J_2\left(\frac{R_E}{r}\right)^2\frac{3\sin^2\phi - 1}{2} - \cdots\right], \qquad J_2 = 1.082\,63\times10^{-3},
$$ {#eq-j2-potential}
where $\phi$ is the geocentric latitude (with the convention $\mathbf{a} = -\nabla U$). The next terms are about a thousand times smaller ($J_3 = -2.53\times10^{-6}$ describes the slight "pear shape"). Taking the gradient and resolving in RSW, using $\sin\phi = \sin i\sin u$, gives the $J_2$ perturbing acceleration
$$
(a_r,\ a_s,\ a_w) = -\frac{3\mu J_2R_E^2}{2r^4}\left(1 - 3\sin^2i\sin^2u,\ \ \sin^2i\sin 2u,\ \ \sin 2i\sin u\right).
$$ {#eq-j2-acc}
Its magnitude at $400\ \mathrm{km}$ altitude is about $0.012\ \mathrm{m/s^2}$, $0.14\,\%$ of the central gravity — small, but acting in the same sense orbit after orbit.

::: theorem Secular effects of $J_2$ {#thm-j2-secular}
Averaged over one orbit, $J_2$ causes no secular change in $a$, $e$ or $i$, but the node and the argument of perigee drift at the constant rates
$$
\dot\Omega = -\frac32\,nJ_2\left(\frac{R_E}{p}\right)^2\cos i, \qquad
\dot\omega = \frac34\,nJ_2\left(\frac{R_E}{p}\right)^2\left(5\cos^2i - 1\right),
$$ {#eq-j2-rates}
with $n = \sqrt{\mu/a^3}$ and $p = a(1-e^2)$, to first order in $J_2$.
:::

::: proof
We prove the node rate for a circular orbit ($e = 0$, $r = a = p$, $h = \sqrt{\mu a}$, $u = nt + u_0$); the general case is the same calculation with $r$ varying along the orbit (Vallado, Battin). Substituting $a_w$ from [[#eq-j2-acc]] into the node equation of [[#eq-gauss]]:
$$
\dot\Omega = \frac{a\sin u}{h\sin i}\left(-\frac{3\mu J_2R_E^2}{2a^4}\,2\sin i\cos i\sin u\right) = -\frac{3\mu J_2R_E^2\cos i}{a^3h}\,\sin^2u.
$$
Averaging over one orbit, $\langle\sin^2u\rangle = \tfrac12$, so $\langle\dot\Omega\rangle = -\tfrac32\mu J_2R_E^2\cos i/(a^3\sqrt{\mu a}) = -\tfrac32\,nJ_2(R_E/a)^2\cos i$. For the inclination, $\dot i \propto \cos u\sin u = \tfrac12\sin 2u$ averages to zero; for $a$, $a_s \propto \sin 2u$ averages to zero (and $a_r$ does no work on a circular orbit); so there is no secular change in $a$ or $i$. The assumptions: first order in $J_2$ (elements held constant while averaging), and averaging over a full orbit.
:::

The physical picture for the node: the bulge pulls the satellite towards the equatorial plane on each pass over high latitudes — a torque on the orbit, which, like the torque of gravity on a spinning top, makes the orbit's angular momentum *precess* about the Earth's axis rather than tilt. For a prograde orbit ($\cos i > 0$) the node moves westward (**regression of the nodes**); for a retrograde one, eastward. The perigee rotates forward for $i < 63.43^\circ$ or $i > 116.57^\circ$ and backward in between.

::: widget plot
f: -1.5*sqrt(398600/(6378 + h)^3)*1.08263e-3*(6378/(6378 + h))^2*cos(x*pi/180)*4950355.35; 0.75*sqrt(398600/(6378 + h)^3)*1.08263e-3*(6378/(6378 + h))^2*(5*cos(x*pi/180)^2 - 1)*4950355.35
x: 0, 180
y: -10, 16
sliders: h=700:200:3000:10
labels: \dot\Omega\ (^\circ/\text{day}); \dot\omega\ (^\circ/\text{day})
hlines: 0.9856; 0
vlines: 63.43; 116.57
caption: Secular $J_2$ drift of the node and of the argument of perigee (degrees per day) against inclination (degrees) for a circular orbit at altitude $h$ (km, slider), from [[#eq-j2-rates]]. The horizontal line at $+0.9856^\circ/\mathrm{day}$ is the sun-synchronous rate: where the $\dot\Omega$ curve crosses it is the sun-synchronous inclination — $98.2^\circ$ at $700\ \mathrm{km}$. Raise $h$: the crossing moves towards $180^\circ$ and disappears above about $5970\ \mathrm{km}$, where $J_2$ is too weak to turn the plane fast enough. The vertical lines mark the critical inclinations, where the perigee stands still whatever the altitude.
:::

::: example Nodal regression of a space station {#ex-iss}
Find the $J_2$ drift rates of the node and of the argument of perigee for a circular orbit at $400\ \mathrm{km}$ altitude inclined at $51.6^\circ$.
::: solution
$a = 6778\ \mathrm{km}$, $n = 1.1314\times10^{-3}\ \mathrm{rad/s}$, $(R_E/a)^2 = 0.88546$. So $nJ_2(R_E/a)^2 = 1.0846\times10^{-6}\ \mathrm{rad/s}$, which is $5.369^\circ/\mathrm{day}$.
$$
\dot\Omega = -\tfrac32 \times 5.369 \times \cos 51.6^\circ = -5.00^\circ/\mathrm{day}, \qquad
\dot\omega = \tfrac34 \times 5.369 \times (5 \times 0.3858 - 1) = +3.74^\circ/\mathrm{day}.
$$
*Check:* the station's orbital plane regresses through $360^\circ$ in $72$ days, which is why the lighting conditions on its orbit (and the times of its visible passes) cycle on roughly a two-month period. For a circular orbit $\omega$ is undefined, but $\dot\omega$ still matters: the satellite's argument of latitude advances slightly faster than the Keplerian rate, part of what makes the **nodal period** (node to node) differ from $2\pi/n$.
:::
:::

## Sun-synchronous, critically inclined and frozen orbits {#sec-special-orbits}

Two of the most useful orbit designs exist *because* of $J_2$.

A **sun-synchronous orbit** has its node advancing eastward at the same mean rate as the Sun appears to move along the equator, $360^\circ$ per tropical year:
$$
\dot\Omega_\text{SSO} = \frac{360^\circ}{365.2422\ \mathrm{d}} = 0.9856^\circ/\mathrm{day} = 1.991\times10^{-7}\ \mathrm{rad/s}.
$$
The orbit plane then keeps a fixed angle to the Sun direction, so the satellite crosses each latitude at the same **local solar time** every day — ideal for imaging with consistent shadows and for solar power. By [[#eq-j2-rates]], $\cos i$ must be negative: sun-synchronous orbits are slightly retrograde, near $97$–$99^\circ$ for altitudes of $500$–$900\ \mathrm{km}$.

A **critically inclined orbit** has $5\cos^2i - 1 = 0$, i.e. $i = 63.43^\circ$ or $116.57^\circ$: the perigee does not rotate. This is the basis of the Molniya orbit, whose apogee must stay over the northern hemisphere.

A **frozen orbit** is one in which the slow variations of $e$ and $\omega$ caused by $J_2$ and the odd harmonic $J_3$ cancel, typically with $\omega = 90^\circ$ and a small eccentricity of about $0.001$ for low orbits; the altitude over each latitude then repeats from orbit to orbit, which simplifies altimetry and imaging missions.

::: example Designing a sun-synchronous orbit {#ex-sso}
What inclination makes a circular orbit at $700\ \mathrm{km}$ altitude sun-synchronous?
::: solution
$a = 7078\ \mathrm{km}$, $n = \sqrt{398\,600/7078^3} = 1.0603\times10^{-3}\ \mathrm{rad/s}$, $(R_E/a)^2 = 0.81198$. Setting [[#eq-j2-rates]] equal to the required rate:
$$
\cos i = -\frac{1.991\times10^{-7}}{1.5 \times 1.0603\times10^{-3} \times 1.082\,63\times10^{-3} \times 0.81198} = -\frac{1.991\times10^{-7}}{1.3982\times10^{-6}} = -0.1424,
$$
$i = 98.19^\circ$.

*Check:* sun-synchronous Earth-observation satellites at about $700\ \mathrm{km}$ fly at about $98.2^\circ$, as published in their mission descriptions. Higher orbits need larger inclinations: $98.60^\circ$ at $800\ \mathrm{km}$; lower ones smaller: $97.40^\circ$ at $500\ \mathrm{km}$.
:::
:::

::: example Why Molniya orbits use 63.4° {#ex-molniya}
The half-day orbit of [[orbital-mechanics/two-body-problem]] ($a = 26\,562\ \mathrm{km}$, $e = 0.737$) is to keep its apogee over the northern hemisphere. Find the perigee drift at $i = 63.43^\circ$, $60^\circ$ and $65^\circ$, and the node drift.
::: solution
$n = 1.4584\times10^{-4}\ \mathrm{rad/s}$, $p = a(1 - e^2) = 12\,134\ \mathrm{km}$, $(R_E/p)^2 = 0.27631$, so $nJ_2(R_E/p)^2 = 4.363\times10^{-8}\ \mathrm{rad/s} = 0.2160^\circ/\mathrm{day}$.

At $63.43^\circ$: $5\cos^2i - 1 = 0$, $\dot\omega = 0$. At $60^\circ$: $5 \times 0.25 - 1 = 0.25$, $\dot\omega = 0.75 \times 0.2160 \times 0.25 = +0.0406^\circ/\mathrm{day}$, about $15^\circ$ per year. At $65^\circ$: $\dot\omega = -0.0174^\circ/\mathrm{day}$. The node regresses at $\dot\Omega = -1.5 \times 0.2160 \cos 63.43^\circ = -0.145^\circ/\mathrm{day}$.

*Check:* a $15^\circ$-per-year drift of the apogee would move it off the service area within a few years; at the critical inclination it stays put (to first order; luni-solar perturbations and $J_3$ still cause slow changes, corrected by small manoeuvres). The small $(R_E/p)^2$ factor makes the effects much slower than for low orbits — but not negligible over a mission.
:::
:::

::: warning Rates in the wrong units, and $p$ versus $a$ {#warn-j2}
$J_2$ rates come out in radians per second; converting to degrees per day multiplies by $180/\pi \times 86\,400 = 4.95\times10^6$, a factor often half-applied. The factor in [[#eq-j2-rates]] is $(R_E/p)^2$, not $(R_E/a)^2$: for the Molniya orbit $p = 12\,134\ \mathrm{km}$ against $a = 26\,562\ \mathrm{km}$, a factor of $4.8$ in the rates. The sun-synchronous rate uses the *tropical* year ($365.2422$ days) because it tracks the Sun, not the stars. And the sign: prograde orbits regress (negative $\dot\Omega$); a computed sun-synchronous inclination below $90^\circ$ signals a sign error.
:::

## Atmospheric drag {#sec-drag}

A satellite moving through the thin upper atmosphere at speed $v$ (relative to the air, which co-rotates roughly with the Earth) feels a drag acceleration opposite to its velocity,
$$
\mathbf{a}_D = -\frac{1}{2}\,\frac{C_DA}{m}\,\rho\,v\,\mathbf{v} = -\frac{\rho v}{2B}\,\mathbf{v}, \qquad B = \frac{m}{C_DA},
$$ {#eq-drag}
where $\rho$ is the air density, $A$ the area facing the flow, $C_D$ the drag coefficient (about $2.2$ for satellites in free-molecular flow) and $B$ the **ballistic coefficient** (some authors use its reciprocal). Density is the great uncertainty: above about $200\ \mathrm{km}$ the thermosphere expands and contracts with solar ultraviolet output, so at a given altitude $\rho$ varies by a factor of five to ten over the 11-year solar cycle and can double within a day during a geomagnetic storm.

::: proposition Decay of a near-circular orbit {#prop-decay}
For a circular orbit of radius $a$ under drag [[#eq-drag]], the semi-major axis decreases at the rate
$$
\frac{\mathrm{d}a}{\mathrm{d}t} = -\frac{\rho\sqrt{\mu a}}{B}, \qquad \Delta a_\text{per orbit} = -\frac{2\pi\rho a^2}{B}.
$$ {#eq-decay}
If the density varies exponentially with altitude, $\rho = \rho_0\,e^{-(z - z_0)/H}$ with scale height $H$, and the factor $\sqrt{\mu a}$ is treated as constant, the time to decay from $z_0$ to a much lower altitude is approximately
$$
t_\text{life} \approx \frac{BH}{\rho_0\sqrt{\mu a}}.
$$ {#eq-lifetime}
:::

::: proof
For a circular orbit $e\sin\theta = 0$ and $p/r = 1$ in the first Gauss equation, so $\dot a = (2a^2/h)\,a_s$ with $a_s = -\rho v^2/(2B)$. With $v^2 = \mu/a$ and $h = \sqrt{\mu a}$: $\dot a = -(2a^2/\sqrt{\mu a})\,\rho\mu/(2Ba) = -\rho\sqrt{\mu a}/B$. Multiplying by the period $2\pi\sqrt{a^3/\mu}$ gives the change per orbit. With $z = a - R_E$ and the exponential model, $\mathrm{d}z/\mathrm{d}t = -k\,e^{-(z - z_0)/H}$ with $k = \rho_0\sqrt{\mu a}/B$; separating, $e^{(z - z_0)/H}\,\mathrm{d}z = -k\,\mathrm{d}t$, and integrating from $z_0$ down to $z_f$: $H\left[1 - e^{-(z_0 - z_f)/H}\right] = kt$. For $z_0 - z_f \gg H$ the bracket is 1. Assumptions: near-circular orbit (drag circularises eccentric orbits first), constant $B$, a static exponential atmosphere, and $\sqrt{\mu a}$ held at its initial value — all crude, so the result is an order-of-magnitude estimate.
:::

The counter-intuitive consequence: drag makes a satellite go *faster*. As $a$ falls, the circular speed $\sqrt{\mu/a}$ rises — drag removes energy, but the satellite falls deeper into the potential well and gains twice as much kinetic energy as the drag removes.

::: example How long does a CubeSat last? {#ex-cubesat}
A 3U CubeSat has mass $4.0\ \mathrm{kg}$, mean frontal area $0.030\ \mathrm{m^2}$ and $C_D = 2.2$. It is released at $400\ \mathrm{km}$, where the density is taken as $\rho_0 = 3.7\times10^{-12}\ \mathrm{kg/m^3}$ with scale height $H = 58.5\ \mathrm{km}$ (the exponential model in Vallado, based on the CIRA-72 reference atmosphere, for moderate solar activity). Estimate the initial decay rate and the orbital lifetime.
::: solution
$B = 4.0/(2.2 \times 0.030) = 60.6\ \mathrm{kg/m^2}$; $\sqrt{\mu a} = \sqrt{3.986\times10^{14} \times 6.778\times10^{6}} = 5.198\times10^{10}\ \mathrm{m^2/s}$.

Decay rate: $\dot a = -3.725\times10^{-12} \times 5.198\times10^{10}/60.6 = -3.19\times10^{-3}\ \mathrm{m/s}$, i.e. $276\ \mathrm{m/day}$ or about $18\ \mathrm{m}$ per orbit.

Lifetime: $t \approx BH/(\rho_0\sqrt{\mu a}) = 58\,500/3.19\times10^{-3} = 1.83\times10^{7}\ \mathrm{s} \approx 210\ \mathrm{days}$.

*Check:* the decay is slow at first and accelerates: half of the lifetime is spent losing the first $H\ln 2 = 41\ \mathrm{km}$ of altitude. Observed lifetimes of CubeSats deployed near $400\ \mathrm{km}$ range from several months near solar maximum to a couple of years near solar minimum — consistent with this estimate given a factor-of-several uncertainty in density. Any lifetime prediction should be quoted with such a range, never as a single date.
:::
:::

::: widget odesolver
f: -0.276*exp(-(y - 400)/58.5)
y0: 400
t: 0, 200
exact: 400 + 58.5*ln(1 - 0.276*t/58.5)
h: 20
caption: Altitude (km) of the CubeSat of [[#ex-cubesat]] against time (days), from $\mathrm{d}z/\mathrm{d}t = -0.276\,e^{-(z - 400)/58.5}\ \mathrm{km/day}$ (the decay rate of [[#eq-decay]] with an exponential atmosphere and $\sqrt{\mu a}$ frozen at its initial value), integrated by Euler, Heun and RK4 against the exact solution $z = 400 + H\ln(1 - kt/H)$. The curve is nearly flat for months and then plunges: once it is $100\ \mathrm{km}$ lower, only about $38$ of its $212$ days remain. With the $20$-day step Euler's method lags badly near the end, because the slope changes so fast; shrink the step to see it converge.
:::

## Third bodies, radiation pressure and their relative sizes {#sec-other}

The **Moon and Sun** perturb an Earth satellite through the difference between their pull on the satellite and on the Earth (the Earth's centre is itself accelerating towards them). For a satellite at distance $r$ from the Earth and a body of parameter $\mu_3$ at distance $d \gg r$, that difference is the tidal acceleration, of order $2\mu_3r/d^3$. It grows linearly with $r$, so it matters most for high orbits: at geostationary altitude the Moon and Sun together tilt the orbit plane by about $0.75$–$0.95^\circ$ per year, and geostationary satellites spend roughly $45$–$50\ \mathrm{m/s}$ of $\Delta v$ per year in north–south station-keeping to cancel it.

**Solar radiation pressure** is the momentum of sunlight: about $4.56\times10^{-6}\ \mathrm{N/m^2}$ at $1\ \mathrm{AU}$ for an absorbing surface, multiplied by a reflectivity coefficient $C_R$ between 1 and 2. Its acceleration $C_R\,P_\odot A/m$ is independent of altitude; it perturbs mainly the eccentricity of high orbits, and is the dominant non-gravitational force on navigation satellites and deep-space probes.

| acceleration ($\mathrm{m/s^2}$) | $400\ \mathrm{km}$ | $20\,200\ \mathrm{km}$ (GNSS) | $35\,786\ \mathrm{km}$ (GEO) |
|---|---|---|---|
| central gravity $\mu/r^2$ | $8.68$ | $0.564$ | $0.224$ |
| $J_2$ (amplitude $\tfrac32J_2\mu R_E^2/r^4$) | $1.2\times10^{-2}$ | $5.3\times10^{-5}$ | $8.3\times10^{-6}$ |
| Moon (tidal, $2\mu_\text{M}r/d^3$) | $1.2\times10^{-6}$ | $4.6\times10^{-6}$ | $7.3\times10^{-6}$ |
| Sun (tidal, $2\mu_\odot r/d^3$) | $5.4\times10^{-7}$ | $2.1\times10^{-6}$ | $3.3\times10^{-6}$ |
| radiation pressure ($C_R = 1.3$, $A/m = 0.02\ \mathrm{m^2/kg}$) | $1.2\times10^{-7}$ | $1.2\times10^{-7}$ | $1.2\times10^{-7}$ |
| drag ($B = 60\ \mathrm{kg/m^2}$, $\rho = 3.7\times10^{-12}$) | $1.8\times10^{-6}$ | — | — |

The table, computed from the formulas above, tells the designer what to model: in low orbit $J_2$ dominates every other perturbation by four orders of magnitude, with drag next; at geostationary altitude $J_2$ and the Moon are comparable, the Sun is half the Moon, and radiation pressure is no longer negligible for a large, light satellite.

::: example Which perturbation matters at GEO? {#ex-geo}
Using the table, compare the effects of $J_2$ and the Moon on a geostationary satellite, and explain why the Moon, not $J_2$, causes the inclination drift.
::: solution
The amplitudes are similar ($8.3\times10^{-6}$ against $7.3\times10^{-6}\ \mathrm{m/s^2}$). But for an equatorial orbit, $J_2$'s out-of-plane component $a_w \propto \sin 2i$ vanishes: $J_2$ is symmetric about the equator and cannot tilt an orbit that lies in it — it only changes the period slightly (the station-keeping longitude is computed with it). The Moon's orbit is inclined to the equator (by $18$–$29^\circ$, depending on the year), so its pull has a component normal to the geostationary plane whose average over a day does not vanish. By the inclination equation of [[#eq-gauss]], a persistent $a_w$ tilts the orbit: this is the luni-solar inclination drift of under a degree per year.

*Check:* the dominant station-keeping budget of a geostationary satellite is indeed north–south (inclination) control, several times the east–west budget, which fights the much smaller effects of the Earth's ellipticity of the equator ($J_{22}$) and of radiation pressure.
:::
:::

::: quiz
A satellite in a circular low orbit experiences atmospheric drag for one orbit. Which statements are true?
- [x] Its semi-major axis decreases.
- [x] Its speed increases.
- [ ] Its orbital period increases.
- [ ] Its inclination decreases steadily, because drag acts in the orbital plane.
::: solution
Drag removes energy, so $a = -\mu/(2\varepsilon)$ decreases and the period $2\pi\sqrt{a^3/\mu}$ decreases. The circular speed $\sqrt{\mu/a}$ increases: the satellite falls inward and gains kinetic energy (twice the energy lost to drag, by the virial relation for circular orbits). Drag lies in the orbital plane, so it does not tilt it (the small out-of-plane component due to the atmosphere's rotation is a minor effect).
:::
:::

::: history
The first satellites turned the study of perturbations from theory into measurement. In 1958 R. H. Merson and D. G. King-Hele analysed the rate at which the orbital plane of Sputnik 2's carrier rocket rotated and derived the Earth's flattening as about $1/298$, replacing the value $1/297$ of the International Ellipsoid that geodesists had used since 1924 (*Nature*, 1958). In 1959 John O'Keefe, Ann Eckels and R. K. Squires found from the tracking of Vanguard 1 a periodic variation of perigee height that revealed the odd zonal harmonic $J_3$ — the Earth is slightly "pear-shaped", with the south polar region depressed relative to the north (*Science*, 1959). Drag analyses of the early satellites also showed that the upper atmosphere's density varied with solar activity far more than had been expected. Satellite geodesy, now carried on by dedicated gravity missions, has since mapped the Earth's field to thousands of harmonic terms.
:::

## Where this leads {#sec-next}

Perturbations are why orbits must be maintained: station-keeping manoeuvres ([[orbital-mechanics/orbital-manoeuvres]]) and the end-of-life disposal rules for both low and geostationary orbits follow from the effects in this chapter. Precise orbit determination ([[orbital-mechanics/orbit-determination]]) needs all of them in its force model, and relative-motion design for formations ([[orbital-mechanics/relative-motion-rendezvous]]) must account for differential $J_2$ and drag. Perturbing *torques* — gravity gradient, aerodynamic, radiation — act on a satellite's attitude as well, the subject of [[orbital-mechanics/attitude-dynamics]].

::: summary
- Perturbed motion: $\ddot{\mathbf{r}} = -\mu\mathbf{r}/r^3 + \mathbf{a}_p$; integrate it directly (Cowell, Encke) or follow the slow change of osculating elements.
- Gauss's equations give element rates from the RSW components of $\mathbf{a}_p$: only $a_w$ moves the plane (inclination at the nodes, node at extreme latitudes); along-track force changes $a$.
- $J_2$ (oblateness) causes secular drifts $\dot\Omega = -\tfrac32nJ_2(R_E/p)^2\cos i$ and $\dot\omega = \tfrac34nJ_2(R_E/p)^2(5\cos^2i - 1)$, with no secular change in $a$, $e$, $i$; at $400\ \mathrm{km}$, $51.6^\circ$: $-5.0^\circ$ and $+3.7^\circ$ per day.
- Sun-synchronous orbits match $\dot\Omega = +0.9856^\circ/\mathrm{day}$ (about $98.2^\circ$ at $700\ \mathrm{km}$); critical inclination $63.43^\circ$ freezes the perigee (Molniya); frozen orbits balance $J_2$ and $J_3$.
- Drag: $\dot a = -\rho\sqrt{\mu a}/B$; lifetime $\approx BH/(\rho_0\sqrt{\mu a})$ for an exponential atmosphere — uncertain by a factor of several because density follows solar activity.
- Luni-solar tides and radiation pressure grow in relative importance with altitude; at GEO they drive the inclination drift and the station-keeping budget.
:::

## Exercises

::: exercise Nodal regression at 800 km {level=1 check="-4.66"}
Find the $J_2$ nodal drift rate of a circular orbit at $800\ \mathrm{km}$ altitude inclined at $45^\circ$. (Enter $\dot\Omega$ in degrees per day to three significant figures.)
::: solution
$a = 7178\ \mathrm{km}$, $n = 1.0382\times10^{-3}\ \mathrm{rad/s}$, $(R_E/a)^2 = 0.78953$. $\dot\Omega = -1.5 \times 1.0382\times10^{-3} \times 1.082\,63\times10^{-3} \times 0.78953 \times \cos 45^\circ = -9.413\times10^{-7}\ \mathrm{rad/s} = -4.66^\circ/\mathrm{day}$.
:::
:::

::: exercise Sun-synchronous at 500 km {level=1 check="97.4"}
What inclination makes a circular orbit at $500\ \mathrm{km}$ sun-synchronous? (Enter $i$ in degrees to three significant figures.)
::: solution
$a = 6878\ \mathrm{km}$, $n = 1.1069\times10^{-3}\ \mathrm{rad/s}$, $(R_E/a)^2 = 0.85989$. $\cos i = -1.991\times10^{-7}/(1.5 \times 1.1069\times10^{-3} \times 1.082\,63\times10^{-3} \times 0.85989) = -0.1285$, $i = 97.4^\circ$.
:::
:::

::: exercise Decay per orbit {level=1 check="-2.07"}
A satellite with $B = 100\ \mathrm{kg/m^2}$ is in a circular orbit at $500\ \mathrm{km}$, where $\rho = 6.97\times10^{-13}\ \mathrm{kg/m^3}$. By how much does its semi-major axis change per orbit? (Enter $\Delta a$ in metres to three significant figures, with its sign.)
::: solution
$\Delta a = -2\pi\rho a^2/B = -2\pi \times 6.97\times10^{-13} \times (6.878\times10^6)^2/100 = -2.07\ \mathrm{m}$ per orbit, about $31\ \mathrm{m}$ per day.
:::
:::

::: exercise Perigee rotation of an elliptical orbit {level=2 check="8.64"}
An orbit has perigee altitude $500\ \mathrm{km}$, apogee altitude $1500\ \mathrm{km}$ and inclination $28.5^\circ$. Find $\dot\omega$ and $\dot\Omega$. (Enter $\dot\omega$ in degrees per day to three significant figures.)
::: solution
$r_p = 6878$, $r_a = 7878\ \mathrm{km}$, $a = 7378\ \mathrm{km}$, $e = 0.06777$, $p = a(1-e^2) = 7344.1\ \mathrm{km}$, $n = 9.9623\times10^{-4}\ \mathrm{rad/s}$, $(R_E/p)^2 = 0.75423$. $nJ_2(R_E/p)^2 = 8.135\times10^{-7}\ \mathrm{rad/s} = 4.027^\circ/\mathrm{day}$. $\dot\omega = 0.75 \times 4.027 \times (5\cos^2 28.5^\circ - 1) = 0.75 \times 4.027 \times 2.8616 = 8.64^\circ/\mathrm{day}$; $\dot\Omega = -1.5 \times 4.027 \times 0.8788 = -5.31^\circ/\mathrm{day}$. The perigee goes round in $42$ days.
:::
:::

::: exercise Radiation pressure {level=2 check="1.19e-7"}
A satellite with $A/m = 0.020\ \mathrm{m^2/kg}$ and $C_R = 1.3$ is in sunlight at $1\ \mathrm{AU}$. Find its radiation-pressure acceleration and compare it with the drag acceleration at $400\ \mathrm{km}$ from the table. (Enter the acceleration in $\mathrm{m/s^2}$ to three significant figures; an expression such as `1.19e-7` is accepted.)
::: solution
$a = C_RP_\odot A/m = 1.3 \times 4.56\times10^{-6} \times 0.020 = 1.19\times10^{-7}\ \mathrm{m/s^2}$, about $15$ times smaller than the drag in the table at $400\ \mathrm{km}$; at $800\ \mathrm{km}$, where the density is roughly a hundred times lower, the two become comparable.
:::
:::

::: exercise Lifetime from 500 km {level=2 check="2020"}
Estimate the lifetime of a satellite with $B = 100\ \mathrm{kg/m^2}$ released at $500\ \mathrm{km}$, using $\rho_0 = 6.967\times10^{-13}\ \mathrm{kg/m^3}$ and $H = 63.8\ \mathrm{km}$ in [[#eq-lifetime]]. (Enter the lifetime in days, rounded to the nearest 10 days.)
::: solution
$\sqrt{\mu a} = \sqrt{3.986\times10^{14} \times 6.878\times10^6} = 5.236\times10^{10}\ \mathrm{m^2/s}$. $t = 100 \times 63\,800/(6.967\times10^{-13} \times 5.236\times10^{10}) = 6.38\times10^6/0.03648 = 1.749\times10^8\ \mathrm{s} = 2024\ \mathrm{days} \approx 2020\ \mathrm{days}$ — about $5.5$ years. Compared with [[#ex-cubesat]], raising the release altitude by $100\ \mathrm{km}$ multiplies the lifetime by about ten; with the density uncertainty, the honest answer is "roughly 3 to 15 years".
:::
:::

::: exercise The critical inclination {level=3 check="63.43"}
From [[#eq-j2-rates]], derive the inclinations at which the perigee does not drift, and explain why the result does not depend on $a$ or $e$. (Enter the prograde critical inclination in degrees to four significant figures.)
::: solution
$\dot\omega = 0$ requires $5\cos^2i - 1 = 0$, so $\cos i = \pm1/\sqrt5$, $i = 63.43^\circ$ or $116.57^\circ$. The size and shape enter only through the common factor $nJ_2(R_E/p)^2$, which is never zero; the inclination dependence is a geometric average of the $J_2$ force over the orbit and is the same for every orbit (to first order in $J_2$).
:::
:::

::: exercise The highest sun-synchronous orbit {level=3 check="5970"}
Show that a circular sun-synchronous orbit exists only below a certain altitude, and find that altitude. (Enter the altitude in km, rounded to the nearest 10 km.)
::: solution
The required $\lvert\cos i\rvert = \dot\Omega_\text{SSO}/[\tfrac32nJ_2(R_E/a)^2]$ must not exceed 1. The denominator falls as $a^{-7/2}$, so there is a maximum $a$ where it equals $\dot\Omega_\text{SSO}$, with $i = 180^\circ$: $\tfrac32\sqrt{\mu/a^3}\,J_2(R_E/a)^2 = 1.991\times10^{-7}\ \mathrm{rad/s}$, i.e. $a^{7/2} = 1.5\sqrt\mu\,J_2R_E^2/1.991\times10^{-7}$. Solving gives $a = 12\,352\ \mathrm{km}$, altitude $5974\ \mathrm{km} \approx 5970\ \mathrm{km}$. Real sun-synchronous orbits are far below this, near $98^\circ$, because imaging and launch economics favour low altitudes.
:::
:::

::: exercise Design: an Earth-observation orbit {level=3}
An imaging mission wants (a) the same local solar time at every equator crossing, (b) a ground track that repeats exactly after a whole number of days, and (c) a lifetime of at least seven years without propulsion for drag make-up, with $B = 150\ \mathrm{kg/m^2}$. Propose an altitude and inclination, explain how $J_2$ enters each requirement, and identify the main uncertainty.
::: solution
(a) Sun-synchronous: $i$ from [[#eq-j2-rates]] for the chosen altitude ($97.4$–$98.6^\circ$ for $500$–$800\ \mathrm{km}$). (b) A repeat ground track needs an integer number of nodal periods in an integer number of *nodal* days — the time for the Earth to turn once relative to the regressing node, $2\pi/(\omega_E - \dot\Omega)$, which for a sun-synchronous orbit is exactly one solar day. The nodal period itself differs from $2\pi/n$ by $J_2$ terms. For example, $14 + 7/16$ orbits per day (a 16-day repeat) occurs near $700\ \mathrm{km}$; the exact altitude is found numerically with the $J_2$ terms included. (c) From [[#eq-lifetime]] with the exponential model, lifetime grows roughly tenfold per $100\ \mathrm{km}$ near $500\ \mathrm{km}$; with $B = 150$ an altitude near $600$–$700\ \mathrm{km}$ gives decades at mean solar activity, comfortably above seven years even at solar maximum — but also above the levels at which natural decay clears debris within the 25-year (or stricter five-year) disposal guidelines, so a de-orbit manoeuvre must be planned. The main uncertainty is the thermospheric density (a factor of 5–10 with the solar cycle); the repeat-track altitude must also be maintained by small manoeuvres because drag slowly changes the period.
:::
:::
