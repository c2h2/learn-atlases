A spacecraft travelling to Mars spends most of its journey in orbit around the Sun, but it starts deep in the Earth's gravity well and ends deep in Mars's. No single two-body problem describes the whole trip, and the exact problem — a spacecraft attracted by the Sun and several planets at once — has no closed-form solution. Yet a remarkably accurate first design can be made by stitching together three two-body problems: a hyperbola leaving the Earth, an ellipse around the Sun, and a hyperbola arriving at the target. This is the **patched-conic method**, and it is how interplanetary missions are first sized: it gives the launch energy, the departure and capture burns, the flight time, and the launch windows, typically to within a few per cent of a precise numerical design. The same picture explains the most elegant trick in spaceflight, the **gravity assist**, in which a spacecraft gains or loses heliocentric speed by flying past a planet without using any propellant. This chapter builds the method step by step on the Earth-to-Mars transfer and then analyses flybys.

It draws on [[orbital-mechanics/two-body-problem]] for hyperbolas, [[orbital-mechanics/orbital-manoeuvres]] for the Hohmann transfer and the Oberth effect, and [[orbital-mechanics/orbit-determination]] for Lambert's problem.

## The patched-conic idea {#sec-patched}

Near a planet, the planet's gravity dominates; far from it, the Sun's does. The patched-conic method makes this a sharp rule: around each planet draw a sphere — its **sphere of influence** — inside which only the planet's gravity is counted, and outside which only the Sun's is. Inside, the trajectory is a planet-centred hyperbola; outside, a Sun-centred conic. At the boundary the two are matched by adding velocities: the spacecraft's heliocentric velocity equals the planet's heliocentric velocity plus the spacecraft's planet-relative velocity there.

Because the sphere of influence, although large compared with the planet, is tiny compared with the planet's distance from the Sun, two further simplifications are made: in the heliocentric phase the spacecraft is taken to start and end *at the centre* of the planet, and in the planet-centred phase the spacecraft's speed at the boundary is taken to be the **hyperbolic excess speed** $v_\infty$, the speed at infinity of the planet-centred hyperbola.

::: proposition Sphere of influence {#prop-soi}
A planet of mass $m$ orbiting the Sun (mass $M \gg m$) at distance $R$ has a sphere of influence of radius
$$
r_\mathrm{SOI} \approx R\left(\frac{m}{M}\right)^{2/5}.
$$ {#eq-soi}
Inside this radius the Sun's influence, expressed as a perturbation of planet-centred motion, is relatively smaller than the planet's influence expressed as a perturbation of Sun-centred motion.
:::

::: proof
Consider a spacecraft at distance $r \ll R$ from the planet, on the Sun–planet line (the worst case). *Planet-centred view:* the main acceleration is $Gm/r^2$; the Sun's perturbation is the difference between its pull on the spacecraft and on the planet, the tidal term $\approx 2GMr/R^3$. Their ratio is $\chi_p = 2Mr^3/(mR^3)$. *Sun-centred view:* the main acceleration is $\approx GM/R^2$; the planet's perturbation is its pull on the spacecraft, $Gm/r^2$, minus its (much smaller) pull on the Sun, so the ratio is $\chi_s \approx mR^2/(Mr^2)$. Laplace's criterion uses whichever frame has the smaller ratio. The boundary $\chi_p = \chi_s$ gives $r^5 = R^5m^2/(2M^2)$, i.e. $r = 2^{-1/5}R(m/M)^{2/5}$. Averaging the tidal term over directions instead of taking the worst case changes the numerical factor, and the conventional definition drops it, giving [[#eq-soi]]. The result is an order-of-magnitude boundary, not a physical surface: the exponent $2/5$ is meaningful, the prefactor is a convention.
:::

For the Earth $r_\mathrm{SOI} = 1.496\times10^8\,(398\,600/1.327\,12\times10^{11})^{2/5} = 925\,000\ \mathrm{km}$ — about 145 Earth radii, but only $0.6\,\%$ of an astronomical unit. Mars's is $577\,000\ \mathrm{km}$ and Jupiter's $48\times10^6\ \mathrm{km}$. The Moon's sphere of influence relative to the Earth is $66\,000\ \mathrm{km}$.

## The heliocentric transfer {#sec-heliocentric}

Approximate the planetary orbits as circular and coplanar (Mars's eccentricity is $0.093$ and its inclination $1.85^\circ$, so this is a first approximation only). The cheapest two-impulse transfer is then a heliocentric Hohmann ellipse, tangent to the Earth's orbit at departure and to the target's at arrival. Its velocity relative to each planet at the tangent points is the hyperbolic excess velocity:
$$
v_{\infty,\text{dep}} = \sqrt{\frac{\mu_\odot}{R_1}}\left(\sqrt{\frac{2R_2}{R_1 + R_2}} - 1\right), \qquad
v_{\infty,\text{arr}} = \sqrt{\frac{\mu_\odot}{R_2}}\left(1 - \sqrt{\frac{2R_1}{R_1 + R_2}}\right),
$$ {#eq-vinf-hohmann}
the same expressions as the two Hohmann burns of [[orbital-mechanics/orbital-manoeuvres]] — but here they are not burns: they are the speeds with which the spacecraft must leave the Earth's sphere of influence and will enter the target's.

The planets must also be in the right places. The transfer takes $t_H = \pi\sqrt{a_t^3/\mu_\odot}$, during which the target moves through $n_2t_H$, so at departure the target must lead the Earth by the **phase angle**
$$
\phi_0 = \pi - n_2t_H.
$$ {#eq-phase}
That geometry recurs once every **synodic period**, the time for the faster planet to gain a full lap:
$$
T_\text{syn} = \frac{2\pi}{\lvert n_1 - n_2\rvert} = \frac{T_1T_2}{\lvert T_2 - T_1\rvert}.
$$ {#eq-synodic}

::: example Earth to Mars: the heliocentric leg {#ex-earth-mars}
Using circular coplanar orbits of radius $R_1 = 1.495\,98\times10^8\ \mathrm{km}$ (Earth) and $R_2 = 2.279\times10^8\ \mathrm{km}$ (Mars), find the Hohmann transfer's excess speeds, flight time, departure phase angle and the synodic period.
::: solution
$a_t = (R_1 + R_2)/2 = 1.8875\times10^8\ \mathrm{km}$. Heliocentric speeds: Earth $\sqrt{\mu_\odot/R_1} = 29.785\ \mathrm{km/s}$, Mars $24.131\ \mathrm{km/s}$; on the transfer orbit, at perihelion $\sqrt{\mu_\odot(2/R_1 - 1/a_t)} = 32.728\ \mathrm{km/s}$ and at aphelion $21.483\ \mathrm{km/s}$. Hence
$$
v_{\infty,\text{dep}} = 32.728 - 29.785 = 2.944\ \mathrm{km/s}, \qquad v_{\infty,\text{arr}} = 24.131 - 21.483 = 2.648\ \mathrm{km/s}.
$$
Flight time $t_H = \pi\sqrt{(1.8875\times10^8)^3/1.327\,12\times10^{11}} = 2.236\times10^7\ \mathrm{s} = 258.8\ \mathrm{days}$. Mars's mean motion is $360^\circ/686.8\ \mathrm{d}$, so it moves $135.7^\circ$ during the transfer and must lead the Earth by $\phi_0 = 180^\circ - 135.7^\circ = 44.3^\circ$ at departure. Synodic period: $T_\text{syn} = 365.26 \times 686.80/(686.80 - 365.26) = 780.2\ \mathrm{days}$.

*Check:* real Mars launch windows open about every 26 months ($780\ \mathrm{d} = 25.6$ months), and typical Mars missions take 7–9 months; the launch energy $C_3 = v_\infty^2 = 8.7\ \mathrm{km^2/s^2}$ is of the same order as real Mars missions, which have needed roughly $8$ to $17\ \mathrm{km^2/s^2}$, varying from window to window because Mars's orbit is eccentric and inclined.
:::
:::

For a round trip the crew or sample must also wait at Mars until the planets are positioned for the return Hohmann transfer: at the start of the return the Earth must be *behind* Mars by the angle it gains during a transfer, $n_1t_H - \pi = 75.1^\circ$, whereas on arrival it is $75.1^\circ$ *ahead*. Closing that gap at the relative rate $360^\circ/780.2\ \mathrm{d}$ takes $454.7\ \mathrm{days}$, so a minimum-energy return trip lasts $2 \times 258.8 + 454.7 = 972\ \mathrm{days}$ — about two years and eight months. Faster "opposition-class" trips are possible, at the price of much more $\Delta v$ (often using a Venus flyby).

## Departure from the parking orbit {#sec-departure}

The launch vehicle first places the spacecraft in a low parking orbit; a single burn there puts it on an escape hyperbola with the required $v_\infty$. The quantity $C_3 = v_\infty^2$ (the **characteristic energy**, twice the specific energy of the hyperbola) is the usual way launch-vehicle performance is quoted for escape missions.

::: proposition Injection from a circular parking orbit {#prop-departure}
To leave a circular parking orbit of radius $r_p$ on a hyperbola with excess speed $v_\infty$, a tangential burn at periapsis of
$$
\Delta v = \sqrt{v_\infty^2 + \frac{2\mu}{r_p}} - \sqrt{\frac{\mu}{r_p}}
$$ {#eq-injection}
is needed. The burn must be made where the departure asymptote points in the required direction: the periapsis lies at angle $\beta = \arccos(1/e)$, measured from the asymptote direction, with $e = 1 + r_pv_\infty^2/\mu$ — on the side opposite the asymptote, so that the hyperbola swings round to leave along it.
:::

::: proof
Energy: the hyperbola has $\varepsilon = v_\infty^2/2$, so at $r_p$ its speed is $v_p = \sqrt{v_\infty^2 + 2\mu/r_p}$ (vis-viva with $a = -\mu/v_\infty^2$). The circular speed there is $\sqrt{\mu/r_p}$, and at periapsis both velocities are horizontal, so the burn is their difference. Geometry: from [[orbital-mechanics/two-body-problem]], the outgoing asymptote is at true anomaly $\theta_\infty = \arccos(-1/e)$ from periapsis; the angle between the periapsis direction and the asymptote's *reverse* direction is $180^\circ - \theta_\infty = \arccos(1/e) = \beta$. The parking orbit must be in a plane containing the asymptote — which constrains the launch time and azimuth.
:::

::: example Leaving the Earth for Mars {#ex-departure}
For the Hohmann transfer of [[#ex-earth-mars]], find the injection burn from a $300\ \mathrm{km}$ circular parking orbit and the location of the burn.
::: solution
$r_p = 6678\ \mathrm{km}$, $v_\infty = 2.944\ \mathrm{km/s}$:
$$
\Delta v = \sqrt{2.944^2 + \frac{2 \times 398\,600}{6678}} - \sqrt{\frac{398\,600}{6678}} = 11.316 - 7.726 = 3.590\ \mathrm{km/s}.
$$
$e = 1 + 6678 \times 8.665/398\,600 = 1.1452$, $\beta = \arccos(1/1.1452) = 29.2^\circ$. The asymptote must point along the Earth's heliocentric velocity (to *add* $2.944\ \mathrm{km/s}$ to it), so the burn is made at the point of the parking orbit lying $29.2^\circ$ beyond the direction *opposite* to the Earth's orbital velocity, measured in the direction of motion in the parking orbit; the hyperbola then swings the spacecraft round through $\theta_\infty = 150.8^\circ$ onto the required asymptote. (The parking-orbit plane must contain the asymptote direction, which fixes the launch time of day.)

*Check:* the burn is only $3.59\ \mathrm{km/s}$, of which $3.20\ \mathrm{km/s}$ would be needed simply to escape. Delivering the extra $2.94\ \mathrm{km/s}$ of excess speed costs only $0.39\ \mathrm{km/s}$ because the burn is made deep in the Earth's gravity well — the Oberth effect.
:::
:::

::: widget plot
f: sqrt(x^2 + 2*398600/(6378 + h)) - sqrt(398600/(6378 + h)); sqrt(2*398600/(6378 + h)) - sqrt(398600/(6378 + h)) + x
x: 0, 10
y: 0, 14
sliders: h=300:200:36000:100
labels: \text{burn at periapsis (patched conic)}; \text{escape, then accelerate (no Oberth gain)}
caption: Injection $\Delta v$ (km/s) against the required hyperbolic excess speed $v_\infty$ (km/s), from a circular parking orbit at altitude $h$ (km, slider). The lower curve is [[#eq-injection]]; the upper line is what the same $v_\infty$ would cost if the spacecraft first escaped and then added $v_\infty$ far from the Earth. At $h = 300$ and $v_\infty = 2.94$ (Mars), read $3.59\ \mathrm{km/s}$. Raise $h$ towards geostationary altitude: the escape part becomes cheap, but the curve straightens towards the upper line, because the Oberth gain shrinks as the parking orbit's speed falls.
:::

## Arrival and capture {#sec-arrival}

At the target the spacecraft arrives with $v_\infty$ relative to the planet. Without a burn it flies past on a hyperbola. To be captured, it must brake near periapsis into a closed orbit. For a capture orbit of eccentricity $e$ and periapsis radius $r_p$,
$$
\Delta v_\text{capture} = \sqrt{v_\infty^2 + \frac{2\mu}{r_p}} - \sqrt{\frac{\mu(1+e)}{r_p}}.
$$ {#eq-capture}
The periapsis is chosen by aiming: a hyperbola with excess speed $v_\infty$ that passes the planet at periapsis $r_p$ has an **aiming radius** (impact parameter) — the distance from the planet's centre to the incoming asymptote —
$$
\Delta = r_p\sqrt{1 + \frac{2\mu}{r_pv_\infty^2}},
$$ {#eq-aiming}
from conservation of angular momentum, $h = \Delta\,v_\infty = r_pv_p$. Because $\Delta > r_p$, gravity focuses the incoming trajectories: a planet captures (or hits) everything aimed within a disc larger than itself. Navigators specify the aim point on the **B-plane**, the plane through the planet's centre perpendicular to the incoming asymptote.

::: example Capturing at Mars {#ex-capture}
The spacecraft of [[#ex-earth-mars]] arrives at Mars with $v_\infty = 2.648\ \mathrm{km/s}$. Find the burn to enter (a) a circular orbit at $300\ \mathrm{km}$ altitude; (b) an elliptical orbit with periapsis altitude $300\ \mathrm{km}$ and $e = 0.8$. (c) What circular orbit radius minimises the capture burn?
::: solution
$r_p = 3396 + 300 = 3696\ \mathrm{km}$, $\mu = 42\,828\ \mathrm{km^3/s^2}$. Hyperbolic periapsis speed $\sqrt{2.648^2 + 2 \times 42\,828/3696} = \sqrt{7.012 + 23.175} = 5.494\ \mathrm{km/s}$.

(a) Circular speed $\sqrt{42\,828/3696} = 3.404$: $\Delta v = 2.090\ \mathrm{km/s}$.

(b) Periapsis speed of the ellipse $\sqrt{42\,828 \times 1.8/3696} = 4.567$: $\Delta v = 0.927\ \mathrm{km/s}$.

(c) For a circular orbit ($e = 0$), [[#eq-capture]] as a function of $r_p$ is minimised (set the derivative to zero) at $r_p = 2\mu/v_\infty^2 = 12\,216\ \mathrm{km}$ (altitude $8820\ \mathrm{km}$), where $\Delta v = v_\infty/\sqrt2 = 1.872\ \mathrm{km/s}$.

*Check:* capture into a long ellipse costs less than half as much as capture into a low circle, which is why Mars orbiters first capture into elliptical orbits and then lower their apoapsis gradually — often by **aerobraking**, dipping repeatedly into the upper atmosphere so that drag, rather than propellant, removes the energy. The optimum in (c) is shallow: halving or doubling $r_p$ raises the cost by only a few per cent.
:::
:::

::: warning Mixing frames and adding speeds {#warn-frames}
The commonest patched-conic errors are frame errors. $v_\infty$ is a *planet-relative* speed; it is not the spacecraft's heliocentric speed and not its speed in the parking orbit. The injection burn is not $v_\infty$, nor $v_\infty$ plus the escape speed; it is $\sqrt{v_\infty^2 + v_\text{esc}^2} - v_c$, with speeds adding in quadrature because they are energies. Heliocentric velocities add as *vectors*: $\mathbf{v}_\odot = \mathbf{v}_\text{planet} + \mathbf{v}_\infty$, and only for Hohmann transfers are the two parallel. Finally, use the right $\mu$ in each phase — the Sun's for the transfer ellipse, the planet's for the hyperbolas. A Mars capture computed with the Earth's $\mu$ looks perfectly reasonable and is wrong by a factor of three in the escape-speed term.
:::

## Gravity assists {#sec-flyby}

A spacecraft that flies past a planet without burning keeps its planet-relative speed: it enters the sphere of influence with excess velocity $\mathbf{v}_\infty^-$ and leaves with $\mathbf{v}_\infty^+$, of equal magnitude, rotated by the turning angle $\delta$ of the hyperbola. In the heliocentric frame, however, the planet is moving, and adding its velocity to two differently directed vectors of equal length gives two heliocentric velocities of *different* length. The spacecraft has exchanged momentum with the planet — a negligible change for the planet, a large one for the spacecraft.

::: proposition Velocity change in a flyby {#prop-flyby}
A flyby with excess speed $v_\infty$ and periapsis radius $r_p$ turns the planet-relative velocity through
$$
\delta = 2\arcsin\frac1e, \qquad e = 1 + \frac{r_pv_\infty^2}{\mu},
$$ {#eq-turn}
and changes the spacecraft's heliocentric velocity by a vector of magnitude
$$
\lVert\Delta\mathbf{v}\rVert = 2v_\infty\sin\frac{\delta}{2} = \frac{2v_\infty}{e}.
$$ {#eq-flyby-dv}
The heliocentric speed increases if the spacecraft passes *behind* the planet (relative to the planet's motion) and decreases if it passes in front.
:::

::: proof
The turning angle of a hyperbola was found in [[orbital-mechanics/two-body-problem]], and $e = 1 + r_pv_\infty^2/\mu$ follows from $r_p = a(1-e)$ with $a = -\mu/v_\infty^2$. Since the patched-conic flyby is instantaneous in the heliocentric frame, $\mathbf{v}_\odot^\pm = \mathbf{V}_p + \mathbf{v}_\infty^\pm$ with the same planet velocity $\mathbf{V}_p$, so $\Delta\mathbf{v}_\odot = \mathbf{v}_\infty^+ - \mathbf{v}_\infty^-$: the base of an isosceles triangle with equal sides $v_\infty$ and apex angle $\delta$, of length $2v_\infty\sin(\delta/2) = 2v_\infty/e$. The heliocentric speed squared changes by $\lVert\mathbf{V}_p + \mathbf{v}_\infty^+\rVert^2 - \lVert\mathbf{V}_p + \mathbf{v}_\infty^-\rVert^2 = 2\mathbf{V}_p\cdot(\mathbf{v}_\infty^+ - \mathbf{v}_\infty^-)$, positive when the rotation turns $\mathbf{v}_\infty$ towards $\mathbf{V}_p$. A pass behind the planet (on its trailing side) bends the trajectory round in the direction of the planet's motion, which does this.
:::

The largest velocity change for a given $v_\infty$ comes from the closest pass the planet allows (atmosphere, rings, radiation). Massive, fast-approached planets give the biggest kicks: Jupiter can change a spacecraft's heliocentric speed by tens of kilometres per second, the Earth and Venus by a few — still enough to make missions to Jupiter, Saturn and Mercury possible with launchers that could not reach them directly.

::: example A Jupiter flyby {#ex-jupiter}
A spacecraft reaches Jupiter's orbit on a Hohmann transfer from the Earth ($R_J = 7.783\times10^8\ \mathrm{km}$, $\mu_J = 1.266\,87\times10^8\ \mathrm{km^3/s^2}$, Jupiter's radius $71\,492\ \mathrm{km}$) and flies past the trailing side at $r_p = 5$ Jupiter radii. Find $v_\infty$, the turning angle, and the heliocentric speed after the flyby. Is it enough to escape the Sun?
::: solution
Transfer orbit ($a_t = 4.6414\times10^8\ \mathrm{km}$): aphelion speed $\sqrt{\mu_\odot(2/R_J - 1/a_t)} = 7.415\ \mathrm{km/s}$; Jupiter's circular speed $13.058\ \mathrm{km/s}$. The spacecraft arrives slower than Jupiter, so Jupiter catches it up from behind: $v_\infty = 5.643\ \mathrm{km/s}$, directed opposite to Jupiter's motion. (The transfer takes $997$ days.)

$e = 1 + 357\,460 \times 5.643^2/1.266\,87\times10^8 = 1.0899$, $\delta = 2\arcsin(1/1.0899) = 133.1^\circ$.

The outgoing excess velocity is the incoming one rotated by $133.1^\circ$: in components along and across Jupiter's motion, $\mathbf{v}_\infty^+ = 5.643\,(\cos 46.9^\circ,\ \sin 46.9^\circ) = (3.859,\ 4.118)\ \mathrm{km/s}$. Heliocentric: $(13.058 + 3.859,\ 4.118) = (16.917,\ 4.118)$, speed $17.41\ \mathrm{km/s}$ — a gain of $10.0\ \mathrm{km/s}$, from a velocity change of magnitude $2v_\infty/e = 10.36\ \mathrm{km/s}$.

Solar escape speed at Jupiter's distance is $\sqrt{2\mu_\odot/R_J} = 18.47\ \mathrm{km/s}$: not quite enough. A closer pass (larger $\delta$) would do it: the theoretical maximum, with $\mathbf{v}_\infty^+$ fully along Jupiter's velocity, is $13.06 + 5.64 = 18.70\ \mathrm{km/s}$.

*Check:* with the incoming $\mathbf{v}_\infty$ exactly anti-parallel to Jupiter's velocity, the trailing and leading passes give the same speed by symmetry (the rotation goes either way past "backwards"); in general they do not. Without the flyby, reaching $17.4\ \mathrm{km/s}$ at $5.2\ \mathrm{AU}$ directly from the Earth would require a heliocentric departure speed of $\sqrt{17.41^2 + 2\mu_\odot(1/R_1 - 1/R_J)}$, $41.7\ \mathrm{km/s}$ — an excess speed over the Earth of $11.9\ \mathrm{km/s}$ instead of the Hohmann value $8.8\ \mathrm{km/s}$, a large difference in launch energy ($C_3 = 141$ against $77\ \mathrm{km^2/s^2}$).
:::
:::

::: widget plot
f: 2*v/(1 + x*71492*v^2/126687000); 2*asin(1/(1 + x*71492*v^2/126687000))*180/pi/30
x: 1, 30
y: 0, 12
sliders: v=5.6:1:20:0.1
labels: \lvert\Delta\mathbf{v}\rvert\ \text{(km/s)}; \delta/30^\circ
caption: A Jupiter flyby: magnitude of the heliocentric velocity change $2v_\infty/e$ (km/s) and the turning angle $\delta$ (in units of $30^\circ$, so $4$ means $120^\circ$) against the periapsis radius in Jupiter radii, for the excess speed $v_\infty$ set by the slider (km/s). At $v_\infty = 5.6$ and $5$ Jupiter radii read $10.4\ \mathrm{km/s}$ and $133^\circ$ ([[#ex-jupiter]]). Close passes turn the trajectory more; raising $v_\infty$ makes the hyperbola straighter, so the turning angle falls, but the velocity change first rises — the best $v_\infty$ for a given $r_p$ is the circular speed at $r_p$, where $\lvert\Delta\mathbf{v}\rvert = \sqrt{\mu/r_p}$ ([[#exr-max-flyby]]).
:::

Flyby design in practice combines Lambert solutions for each heliocentric leg (between planet positions at chosen dates) with the requirement that the incoming and outgoing $v_\infty$ at each flyby have equal magnitudes and an angle between them achievable with a safe periapsis — a search over dates that produces the multi-planet tours of missions such as Voyager, Galileo and Cassini. Plotting launch energy against departure and arrival dates for a single leg gives the **porkchop plot**, whose contours show the launch window.

::: quiz
A spacecraft flies past Venus, passing in front of the planet (on its leading side). Which statements are true in the patched-conic model?
- [x] Its speed relative to Venus is the same before and after the flyby.
- [x] Its heliocentric speed decreases.
- [ ] Its heliocentric speed is unchanged, because gravity is conservative.
- [ ] It must use propellant to change its heliocentric speed.
::: solution
In the planet's frame the flyby is a conservative two-body hyperbola: $v_\infty$ in equals $v_\infty$ out. In the Sun's frame, Venus is moving, and a leading-side pass turns $\mathbf{v}_\infty$ away from Venus's velocity, lowering the heliocentric speed — useful for falling inward towards Mercury, as Mariner 10 and later MESSENGER and BepiColombo did. Energy is conserved overall: Venus gains what the spacecraft loses, a change of its orbital speed far too small to measure.
:::
:::

::: history
The idea that a planet's gravity could be used to change a spacecraft's path appears in manuscripts of Yuri Kondratyuk written around 1918–1919 and in Friedrich Zander's work of the 1920s. The Soviet probe Luna 3 used the Moon's gravity in October 1959 to bend its path so that it could photograph the far side and return its pictures. Michael Minovitch, a graduate student working at the Jet Propulsion Laboratory in the early 1960s, computed systematically how flybys change heliocentric trajectories, and in the mid-1960s Gary Flandro at JPL noticed that Jupiter, Saturn, Uranus and Neptune would be aligned in the late 1970s so that one spacecraft could visit all four. Mariner 10 made the first planetary gravity assist, at Venus on 5 February 1974, on its way to Mercury. Voyager 2 (launched 20 August 1977) and Voyager 1 (5 September 1977) exploited the outer-planet alignment; Voyager 2 flew past all four giant planets, reaching Neptune in 1989.
:::

## Where this leads {#sec-next}

The patched-conic design is the starting point for precise trajectory work: numerical integration with all planetary perturbations ([[orbital-mechanics/perturbations]]) and Lambert-based optimisation refine it, and trajectory-correction manoeuvres during flight remove the remaining errors using the estimation methods of [[orbital-mechanics/orbit-determination]]. Low-thrust electric propulsion and multi-body dynamics (transfers via the Sun–Earth Lagrange points, used by space telescopes) go beyond the patched-conic picture altogether.

::: summary
- Patched conics: inside a planet's sphere of influence, $r_\mathrm{SOI} \approx R(m/M)^{2/5}$, use the planet's two-body problem; outside, the Sun's; match velocities by $\mathbf{v}_\odot = \mathbf{V}_\text{planet} + \mathbf{v}_\infty$.
- A heliocentric Hohmann transfer gives the departure and arrival excess speeds (Earth–Mars: $2.94$ and $2.65\ \mathrm{km/s}$, $259$ days); the departure phase angle is $\pi - n_2t_H$ ($44^\circ$ for Mars) and windows recur every synodic period ($780$ days).
- Injection: $\Delta v = \sqrt{v_\infty^2 + 2\mu/r_p} - \sqrt{\mu/r_p}$, made at periapsis at angle $\arccos(1/e)$ from the reversed asymptote; $C_3 = v_\infty^2$.
- Capture: $\Delta v = \sqrt{v_\infty^2 + 2\mu/r_p} - \sqrt{\mu(1+e)/r_p}$; elliptical capture is much cheaper than circular; aim with $\Delta = r_p\sqrt{1 + 2\mu/(r_pv_\infty^2)}$.
- Gravity assist: $v_\infty$ is unchanged in magnitude but turned by $\delta = 2\arcsin(1/e)$, changing the heliocentric velocity by $2v_\infty/e$; trailing-side passes speed the spacecraft up.
:::

## Exercises

::: exercise Venus's sphere of influence {level=1 check="616"}
Venus orbits the Sun at $1.0821\times10^8\ \mathrm{km}$ and has $\mu = 324\,860\ \mathrm{km^3/s^2}$. Find the radius of its sphere of influence. (Enter it in thousands of km to three significant figures.)
::: solution
$r_\mathrm{SOI} = 1.0821\times10^8\,(324\,860/1.327\,12\times10^{11})^{2/5} = 1.0821\times10^8 \times 5.695\times10^{-3} = 616\times10^3\ \mathrm{km}$ — about 100 Venus radii.
:::
:::

::: exercise Jupiter's launch windows {level=1 check="399"}
Using circular orbits ($R_\oplus = 1.496\times10^8\ \mathrm{km}$, $R_J = 7.783\times10^8\ \mathrm{km}$), find Jupiter's orbital period and the Earth–Jupiter synodic period. (Enter the synodic period in days to three significant figures.)
::: solution
$T_J = 2\pi\sqrt{R_J^3/\mu_\odot} = 4334\ \mathrm{d}$ ($11.87$ years), $T_\oplus = 365.26\ \mathrm{d}$. $T_\text{syn} = 365.26 \times 4334/(4334 - 365.26) = 399\ \mathrm{d}$ — Jupiter windows come every 13 months, because Jupiter moves slowly and the Earth laps it in little more than a year.
:::
:::

::: exercise Injection from a lower parking orbit {level=1 check="3.63"}
What injection burn gives $v_\infty = 3.00\ \mathrm{km/s}$ from a circular parking orbit at $200\ \mathrm{km}$ altitude? (Enter $\Delta v$ in km/s to three significant figures.)
::: solution
$r_p = 6578\ \mathrm{km}$: $\Delta v = \sqrt{9 + 797\,200/6578} - \sqrt{398\,600/6578} = \sqrt{130.19} - 7.784 = 11.410 - 7.784 = 3.63\ \mathrm{km/s}$.
:::
:::

::: exercise Earth to Venus {level=2 check="2.50"}
Find the hyperbolic excess speeds at departure and arrival and the flight time of a Hohmann transfer from the Earth ($1.495\,98\times10^8\ \mathrm{km}$) to Venus ($1.0821\times10^8\ \mathrm{km}$). In which direction relative to the Earth's motion must the departure asymptote point? (Enter the departure $v_\infty$ in km/s to three significant figures.)
::: solution
$a_t = 1.2890\times10^8\ \mathrm{km}$. Earth's speed $29.785$; transfer aphelion speed (at the Earth) $\sqrt{\mu_\odot(2/R_1 - 1/a_t)} = 27.289\ \mathrm{km/s}$, so $v_{\infty,\text{dep}} = 2.50\ \mathrm{km/s}$, pointing *opposite* to the Earth's motion (the spacecraft must fall inward). At Venus: transfer perihelion speed $37.73$, Venus $35.03\ \mathrm{km/s}$, $v_{\infty,\text{arr}} = 2.71\ \mathrm{km/s}$. Flight time $146\ \mathrm{d}$.
:::
:::

::: exercise A low circular orbit at Mars {level=2 check="2.07"}
The spacecraft of [[#ex-capture]] instead captures directly into a circular orbit at $500\ \mathrm{km}$ altitude. What is the capture burn? (Enter $\Delta v$ in km/s to three significant figures.)
::: solution
$r_p = 3896\ \mathrm{km}$. $\sqrt{2.648^2 + 2 \times 42\,828/3896} - \sqrt{42\,828/3896} = \sqrt{7.012 + 21.986} - 3.316 = 5.385 - 3.316 = 2.07\ \mathrm{km/s}$.
:::
:::

::: exercise Turning at Venus {level=2 check="83.3"}
A spacecraft approaches Venus ($\mu = 324\,860\ \mathrm{km^3/s^2}$, radius $6052\ \mathrm{km}$) with $v_\infty = 5.0\ \mathrm{km/s}$ and passes at $500\ \mathrm{km}$ altitude. Find the turning angle and the magnitude of the heliocentric velocity change. (Enter $\delta$ in degrees to three significant figures.)
::: solution
$r_p = 6552\ \mathrm{km}$, $e = 1 + 6552 \times 25/324\,860 = 1.5042$, $\delta = 2\arcsin(1/1.5042) = 83.3^\circ$, $\lVert\Delta\mathbf{v}\rVert = 2 \times 5.0/1.5042 = 6.65\ \mathrm{km/s}$.
:::
:::

::: exercise The cheapest capture into an ellipse {level=3 check="1.32"}
Show that, for a capture orbit of fixed eccentricity $e$, the burn [[#eq-capture]] is smallest when $r_p = 2\mu(1-e)/[v_\infty^2(1+e)]$, and that the minimum is $v_\infty\sqrt{(1-e)/2}$. Evaluate it for Mars arrival with $v_\infty = 2.648\ \mathrm{km/s}$ and $e = 0.5$, and check that the optimal periapsis is above the surface. (Enter the minimum $\Delta v$ in km/s to three significant figures.)
::: solution
Write $\Delta v(r) = \sqrt{v_\infty^2 + 2\mu/r} - \sqrt{\mu(1+e)/r}$ and differentiate:
$$
\frac{\mathrm{d}\Delta v}{\mathrm{d}r} = -\frac{\mu}{r^2\sqrt{v_\infty^2 + 2\mu/r}} + \frac{\sqrt{\mu(1+e)}}{2r^{3/2}}.
$$
Setting it to zero gives $2\sqrt{\mu} = \sqrt{(1+e)r}\,\sqrt{v_\infty^2 + 2\mu/r}$, i.e. $4\mu = (1+e)(rv_\infty^2 + 2\mu)$, so $r_p = 2\mu(1-e)/[v_\infty^2(1+e)]$. At this radius $2\mu/r_p = v_\infty^2(1+e)/(1-e)$, so the hyperbolic periapsis speed is $\sqrt{v_\infty^2 + v_\infty^2(1+e)/(1-e)} = v_\infty\sqrt{2/(1-e)}$, and the capture-orbit periapsis speed is $\sqrt{(1+e)\mu/r_p} = v_\infty(1+e)/\sqrt{2(1-e)}$. Their difference is $v_\infty\,[2 - (1+e)]/\sqrt{2(1-e)} = v_\infty\sqrt{(1-e)/2}$. For Mars: $r_p = 2 \times 42\,828 \times 0.5/(7.012 \times 1.5) = 4072\ \mathrm{km}$ (altitude $676\ \mathrm{km}$, above the surface), $\Delta v_\text{min} = 2.648\sqrt{0.25} = 1.32\ \mathrm{km/s}$. For $e = 0.8$ the formula gives a periapsis inside Mars, so the constraint $r_p \ge R + h_\text{min}$ governs, as in [[#ex-capture]].
:::
:::

::: exercise The biggest possible kick {level=3 check="7.91" #exr-max-flyby}
For a flyby with periapsis fixed at $r_p$, show that the heliocentric velocity change $2v_\infty/e$ is largest when $v_\infty$ equals the circular speed at $r_p$, and that the maximum is $\sqrt{\mu/r_p}$. Evaluate it for a grazing flyby of the Earth ($r_p = 6378\ \mathrm{km}$), ignoring the atmosphere. (Enter the maximum in km/s to three significant figures.)
::: solution
$f(v) = 2v/(1 + r_pv^2/\mu)$. $f'(v) = 0$ gives $1 + r_pv^2/\mu - 2r_pv^2/\mu = 0$, i.e. $v^2 = \mu/r_p$, where $e = 2$, $\delta = 60^\circ$ and $f = 2v/2 = \sqrt{\mu/r_p}$. For the Earth: $\sqrt{398\,600/6378} = 7.91\ \mathrm{km/s}$. For Jupiter at its cloud tops the same formula gives $42\ \mathrm{km/s}$ — the reason Jupiter is the great accelerator of the Solar System.
:::
:::

::: exercise Design: a Mars sample-return timeline {level=3}
Using only Hohmann transfers and circular coplanar orbits, (a) draw a timeline for a mission that leaves the Earth, collects a sample at Mars and returns, giving the outbound and return flight times and the minimum stay; (b) estimate the total $\Delta v$ for Earth departure from $300\ \mathrm{km}$, capture at Mars into an elliptical orbit with periapsis altitude $300\ \mathrm{km}$ and $e = 0.8$, departure from that orbit back to the Earth, and direct atmospheric entry at the Earth (no capture burn); (c) list three effects that the idealised plan ignores and say which way each changes the answer.
::: solution
(a) Outbound $258.8\ \mathrm{d}$; stay at least $454.7\ \mathrm{d}$ (the waiting time for the return geometry); return $258.8\ \mathrm{d}$; total about $972\ \mathrm{d}$. Each departure must also wait for the phase angle: $44.3^\circ$ (Mars ahead) for the outbound leg; the Earth $75.1^\circ$ behind Mars for the return.
(b) Earth departure $3.590\ \mathrm{km/s}$ ([[#ex-departure]]); Mars capture into the $e = 0.8$ ellipse $0.927\ \mathrm{km/s}$ ([[#ex-capture]]); departure from the same ellipse back to $v_\infty = 2.648\ \mathrm{km/s}$, by symmetry another $0.927\ \mathrm{km/s}$; Earth entry free (the heat shield dissipates $v_\infty = 2.94\ \mathrm{km/s}$ plus the energy of falling to the Earth, arriving at about $11.3\ \mathrm{km/s}$). Total propulsive $\Delta v \approx 5.44\ \mathrm{km/s}$, not counting landing on and ascending from Mars, which dominate a real sample return.
(c) Mars's eccentric, inclined orbit (changes $v_\infty$ by up to several hundred metres per second from window to window, either way, and adds plane-change costs); the planets' actual positions at feasible launch dates (the true optimum is a Lambert transfer that is not exactly Hohmann, usually with slightly higher $C_3$ but sometimes shorter flight); finite burns and gravity losses at departure (increase $\Delta v$ by a few per cent). The real Mars Sample Return architecture also includes rendezvous in Mars orbit ([[orbital-mechanics/relative-motion-rendezvous]]) — a reminder that patched conics size a mission but do not design it.
:::
:::
