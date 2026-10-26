Every satellite, space probe and planet moves, to a first approximation, under the gravity of a single dominant body. That approximation — two point masses attracting each other and nothing else — is the **two-body problem**, and it is one of the very few problems in dynamics that can be solved completely in closed form. The solution is remarkable: whatever the initial position and velocity, the relative orbit is a **conic section** (circle, ellipse, parabola or hyperbola) with the attracting body at a focus, and two numbers fixed at the start — the specific angular momentum and the specific energy — determine its size and shape for ever. This chapter derives that result from Newton's laws, step by step, and turns it into the working formulas of mission design: circular and escape speeds, the vis-viva equation, the period of an elliptical orbit and the excess speed of a hyperbolic one. Everything later in the course — timing along the orbit, three-dimensional orientation, manoeuvres, rendezvous, interplanetary transfers — is built on what is proved here, and the perturbations of [[orbital-mechanics/perturbations]] are measured as departures from it.

The prerequisites are Newton's second law for a particle ([[dynamics/newtons-laws]]), vector products, and differentiation of vectors in polar coordinates ([[dynamics/particle-kinematics]]).

## Newton's law of gravitation and the equations of motion {#sec-equations}

Newton's law of universal gravitation says that two point masses $m_1$ and $m_2$ a distance $r$ apart attract each other along the line joining them with a force of magnitude
$$
F = \frac{G m_1 m_2}{r^2}, \qquad G = 6.674\times10^{-11}\ \mathrm{m^3\,kg^{-1}\,s^{-2}}.
$$ {#eq-gravity}
The law also holds exactly for spherically symmetric bodies, which attract as if all their mass were at their centre (Newton's shell theorem). Real planets are slightly flattened and lumpy; the resulting corrections are small for most purposes and are the subject of [[orbital-mechanics/perturbations]].

Let $\mathbf{R}_1$ and $\mathbf{R}_2$ be the positions of the two bodies relative to an **inertial** origin, and let $\mathbf{r} = \mathbf{R}_2 - \mathbf{R}_1$ be the position of body 2 relative to body 1, with $r = \lVert\mathbf{r}\rVert$. The free-body diagram of each body has a single force: body 2 is pulled towards body 1 by $-Gm_1m_2\,\mathbf{r}/r^3$, and body 1 towards body 2 by the equal and opposite force $+Gm_1m_2\,\mathbf{r}/r^3$ (Newton's third law). There are no other forces in the model — no drag, no thrust, no third body.

::: definition Gravitational parameter {#def-mu}
The **gravitational parameter** of the two-body system is
$$
\mu = G\,(m_1 + m_2).
$$
When $m_2 \ll m_1$ (a spacecraft orbiting a planet) $\mu$ is, to any accuracy that matters, $G m_1$, the **standard gravitational parameter** of the central body. For the Earth $\mu = 398\,600\ \mathrm{km^3/s^2}$ (more precisely $398\,600.4418\ \mathrm{km^3/s^2}$, the IERS value), for the Sun $\mu_\odot = 1.327\,12\times10^{11}\ \mathrm{km^3/s^2}$, for the Moon $4\,903\ \mathrm{km^3/s^2}$ and for Mars $42\,828\ \mathrm{km^3/s^2}$.
:::

The product $GM$ is known far more accurately than either $G$ (about five significant figures) or $M$ separately, because it is what tracking measures: the motion of a satellite depends only on $\mu$. In this course lengths are in kilometres and speeds in kilometres per second, so $\mu$ is in $\mathrm{km^3/s^2}$; these are SI-derived units and need no conversion as long as they are used consistently.

::: proposition The two-body equations {#prop-two-body}
For two point masses interacting only through gravity:

1. the centre of mass $\mathbf{R}_G = (m_1\mathbf{R}_1 + m_2\mathbf{R}_2)/(m_1+m_2)$ moves in a straight line at constant velocity, so a frame attached to it is inertial;
2. the relative position $\mathbf{r} = \mathbf{R}_2 - \mathbf{R}_1$ obeys
$$
\ddot{\mathbf{r}} = -\frac{\mu}{r^3}\,\mathbf{r}, \qquad \mu = G(m_1+m_2).
$$ {#eq-relative}
:::

::: proof
Newton's second law for each body gives
$$
m_1\ddot{\mathbf{R}}_1 = +\frac{Gm_1m_2}{r^3}\,\mathbf{r}, \qquad m_2\ddot{\mathbf{R}}_2 = -\frac{Gm_1m_2}{r^3}\,\mathbf{r}.
$$
Adding the two equations, the forces cancel: $m_1\ddot{\mathbf{R}}_1 + m_2\ddot{\mathbf{R}}_2 = (m_1+m_2)\ddot{\mathbf{R}}_G = \mathbf{0}$, which is statement 1. For statement 2, divide each equation by its mass and subtract the first from the second:
$$
\ddot{\mathbf{r}} = \ddot{\mathbf{R}}_2 - \ddot{\mathbf{R}}_1 = -\frac{Gm_1}{r^3}\,\mathbf{r} - \frac{Gm_2}{r^3}\,\mathbf{r} = -\frac{G(m_1+m_2)}{r^3}\,\mathbf{r}.
$$
The assumptions are: point (or spherically symmetric) masses, no forces other than their mutual gravitation, and Newtonian mechanics in an inertial frame.
:::

Equation [[#eq-relative]] is a statement about the *relative* motion and does not require body 1 to be fixed. The frame centred on body 1 accelerates and is not inertial, but the equation already accounts for that, which is why $m_2$ appears in $\mu$. For a satellite the correction is negligible; for the Earth–Moon pair it is not ([[#ex-earth-moon]]).

## Angular momentum: plane motion and equal areas {#sec-angular-momentum}

::: proposition Conservation of specific angular momentum {#prop-h}
The **specific angular momentum** $\mathbf{h} = \mathbf{r}\times\dot{\mathbf{r}}$ (angular momentum per unit mass of the relative motion) is constant. Consequently the motion lies in the fixed plane through the central body perpendicular to $\mathbf{h}$, and, writing the velocity in polar components $v_r = \dot r$ (radial) and $v_\perp = r\dot\theta$ (transverse),
$$
h = r\,v_\perp = r^2\dot\theta, \qquad \frac{\mathrm{d}A}{\mathrm{d}t} = \frac{h}{2},
$$ {#eq-areal}
where $A$ is the area swept by the radius vector: equal areas are swept in equal times (Kepler's second law).
:::

::: proof
Differentiate: $\dot{\mathbf{h}} = \dot{\mathbf{r}}\times\dot{\mathbf{r}} + \mathbf{r}\times\ddot{\mathbf{r}} = \mathbf{0} + \mathbf{r}\times\left(-\mu\mathbf{r}/r^3\right) = \mathbf{0}$, since the cross product of parallel vectors vanishes. The force is **central** — along $\mathbf{r}$ — and that is the only property used. Because $\mathbf{h}$ is perpendicular to both $\mathbf{r}$ and $\dot{\mathbf{r}}$ at every instant and its direction never changes, $\mathbf{r}$ always lies in the plane normal to $\mathbf{h}$. (If $\mathbf{h} = \mathbf{0}$ the motion is a straight radial line, a degenerate case we exclude.)

In polar coordinates in that plane, $\mathbf{r} = r\,\mathbf{e}_r$ and $\dot{\mathbf{r}} = \dot r\,\mathbf{e}_r + r\dot\theta\,\mathbf{e}_\theta$, so $\mathbf{h} = r\mathbf{e}_r \times (\dot r\,\mathbf{e}_r + r\dot\theta\,\mathbf{e}_\theta) = r^2\dot\theta\,(\mathbf{e}_r\times\mathbf{e}_\theta)$ and $h = r^2\dot\theta = r v_\perp$. In a short time $\mathrm{d}t$ the radius vector sweeps a thin triangle of base $r$ and height $r\,\mathrm{d}\theta$, of area $\mathrm{d}A = \tfrac12 r^2\,\mathrm{d}\theta$; dividing by $\mathrm{d}t$ gives $\mathrm{d}A/\mathrm{d}t = \tfrac12 r^2\dot\theta = h/2$.
:::

Only the *transverse* component of velocity carries angular momentum. A spacecraft moving straight away from the Earth has $h = 0$; one moving perpendicular to the radius has the most angular momentum its speed allows. The constancy of $h = r v_\perp$ means the transverse speed is inversely proportional to the distance: a satellite on an eccentric orbit is fast at perigee and slow at apogee, and at the two apses (where $v_r = 0$) $r_p v_p = r_a v_a$.

::: definition Flight-path angle {#def-gamma}
The **flight-path angle** $\gamma$ is the angle between the velocity vector and the local horizontal (the direction perpendicular to $\mathbf{r}$ in the orbital plane), positive when the spacecraft is climbing ($v_r > 0$):
$$
\tan\gamma = \frac{v_r}{v_\perp}, \qquad v_r = v\sin\gamma, \qquad v_\perp = v\cos\gamma, \qquad h = r v\cos\gamma.
$$
At periapsis and apoapsis $\gamma = 0$.
:::

## Energy: the vis-viva equation {#sec-energy}

::: proposition Conservation of specific energy {#prop-energy}
The **specific orbital energy**
$$
\varepsilon = \frac{v^2}{2} - \frac{\mu}{r}
$$ {#eq-energy}
is constant along any two-body orbit. The potential energy is measured from zero at infinite separation, so $\varepsilon < 0$ means the body cannot escape.
:::

::: proof
Take the dot product of [[#eq-relative]] with $\dot{\mathbf{r}}$:
$$
\dot{\mathbf{r}}\cdot\ddot{\mathbf{r}} + \frac{\mu}{r^3}\,\mathbf{r}\cdot\dot{\mathbf{r}} = 0.
$$
Now $\dot{\mathbf{r}}\cdot\ddot{\mathbf{r}} = \tfrac{\mathrm{d}}{\mathrm{d}t}\left(\tfrac12 v^2\right)$, and since $r^2 = \mathbf{r}\cdot\mathbf{r}$ we have $2r\dot r = 2\,\mathbf{r}\cdot\dot{\mathbf{r}}$, so $\mathbf{r}\cdot\dot{\mathbf{r}} = r\dot r$ and $\mu\,\mathbf{r}\cdot\dot{\mathbf{r}}/r^3 = \mu\dot r/r^2 = \tfrac{\mathrm{d}}{\mathrm{d}t}\left(-\mu/r\right)$. Hence $\tfrac{\mathrm{d}}{\mathrm{d}t}\left(\tfrac12v^2 - \mu/r\right) = 0$. The only assumption beyond [[#eq-relative]] is that no non-conservative force acts.
:::

Once we know (from [[#thm-orbit]] below) that $\varepsilon = -\mu/(2a)$ for an ellipse of semi-major axis $a$, the energy equation becomes the most-used formula in the subject,
$$
v^2 = \mu\left(\frac{2}{r} - \frac{1}{a}\right),
$$ {#eq-visviva}
the **vis-viva equation**. It gives the speed anywhere on an orbit from the distance and the size of the orbit alone, with no reference to the shape or the direction of motion.

## The eccentricity vector and the orbit equation {#sec-orbit-equation}

Angular momentum and energy are two integrals of the motion. A third, less obvious one fixes the orientation of the orbit within its plane and delivers its shape directly.

::: theorem The orbit equation {#thm-orbit}
For $\mathbf{h} \ne \mathbf{0}$ the vector
$$
\mathbf{e} = \frac{\dot{\mathbf{r}}\times\mathbf{h}}{\mu} - \frac{\mathbf{r}}{r}
$$ {#eq-evec}
(the **eccentricity vector**) is constant, lies in the orbital plane, and points from the focus towards periapsis. With $e = \lVert\mathbf{e}\rVert$ and $\theta$ the **true anomaly** (the angle from $\mathbf{e}$ to $\mathbf{r}$, measured in the direction of motion), the orbit is
$$
r = \frac{p}{1 + e\cos\theta}, \qquad p = \frac{h^2}{\mu},
$$ {#eq-orbit}
a conic section with the central body at one focus, eccentricity $e$ and semi-latus rectum $p$. Moreover
$$
e^2 = 1 + \frac{2\varepsilon h^2}{\mu^2}.
$$ {#eq-e-energy}
:::

::: proof
**Constancy.** Using $\dot{\mathbf{h}} = \mathbf{0}$ and [[#eq-relative]],
$$
\frac{\mathrm{d}}{\mathrm{d}t}\left(\dot{\mathbf{r}}\times\mathbf{h}\right) = \ddot{\mathbf{r}}\times\mathbf{h} = -\frac{\mu}{r^3}\,\mathbf{r}\times(\mathbf{r}\times\dot{\mathbf{r}}).
$$
The vector triple product gives $\mathbf{r}\times(\mathbf{r}\times\dot{\mathbf{r}}) = \mathbf{r}\,(\mathbf{r}\cdot\dot{\mathbf{r}}) - \dot{\mathbf{r}}\,r^2 = r\dot r\,\mathbf{r} - r^2\dot{\mathbf{r}}$, so
$$
\frac{\mathrm{d}}{\mathrm{d}t}\left(\dot{\mathbf{r}}\times\mathbf{h}\right) = \mu\left(\frac{\dot{\mathbf{r}}}{r} - \frac{\dot r\,\mathbf{r}}{r^2}\right) = \mu\,\frac{\mathrm{d}}{\mathrm{d}t}\left(\frac{\mathbf{r}}{r}\right).
$$
Integrating, $\dot{\mathbf{r}}\times\mathbf{h} - \mu\,\mathbf{r}/r$ is a constant vector, which is $\mu\mathbf{e}$. Both $\dot{\mathbf{r}}\times\mathbf{h}$ and $\mathbf{r}$ are perpendicular to $\mathbf{h}$, so $\mathbf{e}$ lies in the orbital plane.

**Shape.** Dot [[#eq-evec]] with $\mathbf{r}$ and use $\mathbf{r}\cdot(\dot{\mathbf{r}}\times\mathbf{h}) = \mathbf{h}\cdot(\mathbf{r}\times\dot{\mathbf{r}}) = h^2$ (cyclic property of the scalar triple product):
$$
\mathbf{r}\cdot\mathbf{e} = r e\cos\theta = \frac{h^2}{\mu} - r \quad\Longrightarrow\quad r = \frac{h^2/\mu}{1 + e\cos\theta}.
$$
This is the polar equation of a conic with focus at the origin, eccentricity $e$ and semi-latus rectum $p = h^2/\mu$. The minimum of $r$ occurs at $\theta = 0$, so $\mathbf{e}$ points to periapsis.

**Energy relation.** Since $\dot{\mathbf{r}}\perp\mathbf{h}$, $\lVert\dot{\mathbf{r}}\times\mathbf{h}\rVert = vh$; and $(\dot{\mathbf{r}}\times\mathbf{h})\cdot\mathbf{r} = h^2$ as above. Squaring [[#eq-evec]]:
$$
\mu^2 e^2 = v^2h^2 - 2\mu\frac{h^2}{r} + \mu^2 = 2h^2\left(\frac{v^2}{2} - \frac{\mu}{r}\right) + \mu^2 = 2h^2\varepsilon + \mu^2,
$$
which is [[#eq-e-energy]].
:::

The orbit equation contains everything about the geometry. For an **ellipse** ($0 \le e < 1$) the periapsis and apoapsis radii are $r_p = p/(1+e)$ and $r_a = p/(1-e)$, the semi-major axis is $a = (r_p + r_a)/2 = p/(1-e^2)$, and
$$
e = \frac{r_a - r_p}{r_a + r_p}, \qquad r_p = a(1-e), \qquad r_a = a(1+e).
$$
Putting $p = a(1-e^2)$ into [[#eq-e-energy]] gives $1 - e^2 = -2\varepsilon h^2/\mu^2 = -2\varepsilon\,a(1-e^2)/\mu$, hence
$$
\varepsilon = -\frac{\mu}{2a},
$$ {#eq-energy-a}
which is what turned the energy integral into the vis-viva equation [[#eq-visviva]]. The energy depends on the semi-major axis only: all ellipses with the same $a$, from a circle to a needle-thin radial ellipse, have the same energy and (as we shall show) the same period.

::: definition The conic orbits {#def-conics}
Classified by eccentricity and energy:

| orbit | $e$ | $\varepsilon$ | $a$ | range of $\theta$ |
|---|---|---|---|---|
| circle | $0$ | $-\mu/(2r) < 0$ | $r$ | all |
| ellipse | $0 < e < 1$ | $-\mu/(2a) < 0$ | $> 0$ | all |
| parabola | $1$ | $0$ | $\infty$ | $-180^\circ < \theta < 180^\circ$ |
| hyperbola | $> 1$ | $\mu/(2\lvert a\rvert) > 0$ | $< 0$ (by convention) | $\lvert\theta\rvert < \theta_\infty = \arccos(-1/e)$ |

With the convention $a < 0$ for hyperbolas, $\varepsilon = -\mu/(2a)$, $p = a(1-e^2)$, $r_p = a(1-e)$ and the vis-viva equation hold for every conic.
:::

::: widget parametric
r: (1 - e^2)/(1 + e*cos(t))
t: 0, 2pi
sliders: e=0.5:0:0.9:0.01
x: -2, 1.2
y: -1.1, 1.1
equal: true
caption: Elliptical orbits of fixed semi-major axis $a = 1$ (focus — the central body — at the origin, periapsis on the positive $x$-axis), drawn from $r = a(1-e^2)/(1+e\cos\theta)$. Drag the eccentricity slider from $0$ to $0.9$: the orbit stretches but its length along the major axis stays $2a$, so its energy and period do not change. Move the tracing point and watch the velocity arrow: it is longest at periapsis and shortest at apoapsis, in the ratio $r_a/r_p = (1+e)/(1-e)$ — nineteen to one at $e = 0.9$.
:::

::: warning Altitude is not radius {#warn-altitude}
Every formula in this chapter uses $r$, the distance from the **centre** of the attracting body. Orbits are usually specified by **altitude** above the surface, $z = r - R$. Putting a "400 km orbit" into $v = \sqrt{\mu/r}$ as $r = 400\ \mathrm{km}$ gives $31.6\ \mathrm{km/s}$ instead of $7.67\ \mathrm{km/s}$. A related slip is computing eccentricity from altitudes, $(z_a - z_p)/(z_a + z_p)$, instead of radii; for a $250 \times 35\,786\ \mathrm{km}$ transfer orbit that gives $0.986$ instead of the correct $0.728$. Add the radius ($R_E = 6378\ \mathrm{km}$ for the Earth) before doing anything else, and subtract it only when reporting.
:::

## Circular orbits, escape and the period {#sec-circular}

A **circular orbit** has $e = 0$ and constant $r$; with $a = r$ the vis-viva equation gives the **circular speed**
$$
v_c = \sqrt{\frac{\mu}{r}}.
$$ {#eq-vc}
The **escape speed** is the speed for which $\varepsilon = 0$ (a parabola): $v_\mathrm{esc} = \sqrt{2\mu/r} = \sqrt2\,v_c$. A spacecraft in a circular orbit therefore needs a speed increase of $(\sqrt2 - 1)v_c \approx 0.414\,v_c$ to escape — if the increase is applied along the direction of motion.

::: proposition Kepler's third law {#prop-period}
The period of an elliptical orbit of semi-major axis $a$ is
$$
T = 2\pi\sqrt{\frac{a^3}{\mu}}.
$$ {#eq-period}
Equivalently, the **mean motion** $n = 2\pi/T = \sqrt{\mu/a^3}$.
:::

::: proof
By [[#eq-areal]] the radius vector sweeps area at the constant rate $h/2$, so one revolution takes $T = (\text{area of the ellipse})/(h/2) = 2\pi ab/h$, where $b = a\sqrt{1-e^2}$ is the semi-minor axis. With $h = \sqrt{\mu p} = \sqrt{\mu a(1-e^2)}$,
$$
T = \frac{2\pi a\cdot a\sqrt{1-e^2}}{\sqrt{\mu a}\,\sqrt{1-e^2}} = 2\pi\sqrt{\frac{a^3}{\mu}}.
$$
The eccentricity cancels. For two planets orbiting the Sun, $T^2/a^3 = 4\pi^2/[G(m_\odot + m)]$ is the same to within the ratio of planetary to solar mass — Kepler's empirical law, which Newton's version corrects through $\mu = G(m_1+m_2)$.
:::

The plot below is the vis-viva equation for an Earth orbit with distances in thousands of kilometres. Since $\mu = 398\,600\ \mathrm{km^3/s^2} = 398.6\ (10^3\,\mathrm{km})\,(\mathrm{km/s})^2$, $v^2 = 398.6\,(2/r - 1/a)$ with $r$ and $a$ in units of $10^3\ \mathrm{km}$.

::: widget plot
f: sqrt(398.6*(2/x - 1/a)); sqrt(398.6/x); sqrt(2*398.6/x)
x: 6, 45
y: 0, 12
sliders: a=24.4:7:42.2:0.1
labels: v \text{ on orbit of semi-major axis } a; v_c; v_\mathrm{esc}
vlines: 6.378
caption: Speed in km/s against distance from the Earth's centre in thousands of km (the vertical line is the Earth's surface). The middle curve is the circular speed, the top one the escape speed. The first curve is the speed on any orbit of semi-major axis $a$ (slider, $10^3\ \mathrm{km}$); it crosses the circular-speed curve at $r = a$ and ends at $r = 2a$, the apoapsis of the most eccentric (radial) orbit with that $a$. For $a = 24.4$ (a geostationary transfer orbit) read the speed at perigee, $r = 6.63$: about $10.2\ \mathrm{km/s}$; and at apogee, $r = 42.2$: about $1.6\ \mathrm{km/s}$, roughly half the $3.07\ \mathrm{km/s}$ circular speed there — which is why reaching geostationary orbit needs a second burn at apogee.
:::

::: example A low circular orbit {#ex-leo}
A space station is in a circular orbit at altitude $400\ \mathrm{km}$. Find its speed, period, specific energy, and the speed increase needed to escape from that orbit.
::: solution
Radius: $r = 6378 + 400 = 6778\ \mathrm{km}$. Circular speed:
$$
v_c = \sqrt{\frac{398\,600}{6778}} = \sqrt{58.81} = 7.669\ \mathrm{km/s}.
$$
Period:
$$
T = 2\pi\sqrt{\frac{6778^3}{398\,600}} = 2\pi\sqrt{7.811\times10^{5}} = 5553\ \mathrm{s} = 92.6\ \mathrm{min}.
$$
Energy: $\varepsilon = -\mu/(2r) = -398\,600/13\,556 = -29.40\ \mathrm{km^2/s^2}$ ($-29.40\ \mathrm{MJ/kg}$, since $1\ \mathrm{km^2/s^2} = 10^6\ \mathrm{J/kg}$). Escape speed $\sqrt2 \times 7.669 = 10.845\ \mathrm{km/s}$, so the increase is $3.176\ \mathrm{km/s}$.

*Check:* the International Space Station, at altitudes near $400$–$420\ \mathrm{km}$, circles the Earth about 15.5 times a day; $1440/92.6 = 15.6$. The kinetic energy per kilogram, $\tfrac12 v^2 = 29.4\ \mathrm{MJ/kg}$, equals $-\varepsilon$, as it must for a circle ($v^2 = \mu/r$ makes the kinetic energy half the magnitude of the potential energy).
:::
:::

::: example A geostationary transfer orbit {#ex-gto}
A launcher leaves its upper stage in an orbit with perigee altitude $250\ \mathrm{km}$ and apogee at geostationary altitude, $35\,786\ \mathrm{km}$. Find the eccentricity, the specific angular momentum, the speeds at perigee and apogee, and the period.
::: solution
Radii: $r_p = 6628\ \mathrm{km}$, $r_a = 42\,164\ \mathrm{km}$. Then $a = (r_p + r_a)/2 = 24\,396\ \mathrm{km}$ and
$$
e = \frac{r_a - r_p}{r_a + r_p} = \frac{35\,536}{48\,792} = 0.7283.
$$
From the orbit equation at periapsis, $r_p = h^2/[\mu(1+e)]$, so
$$
h = \sqrt{\mu r_p(1+e)} = \sqrt{398\,600 \times 6628 \times 1.7283} = 67\,573\ \mathrm{km^2/s}.
$$
At the apses the velocity is purely transverse: $v_p = h/r_p = 10.195\ \mathrm{km/s}$, $v_a = h/r_a = 1.603\ \mathrm{km/s}$. The period is $T = 2\pi\sqrt{24\,396^3/398\,600} = 37\,922\ \mathrm{s} = 10.53\ \mathrm{h}$.

*Check:* vis-viva at perigee, $\sqrt{398\,600\,(2/6628 - 1/24\,396)} = 10.195\ \mathrm{km/s}$, agrees. The speed ratio $v_p/v_a = 6.36$ equals $r_a/r_p = 6.36$, as conservation of angular momentum requires. The perigee speed is close to, but below, the local escape speed $\sqrt{2\mu/r_p} = 10.97\ \mathrm{km/s}$: the orbit is bound.
:::
:::

::: example From a state to an orbit {#ex-state}
At burnout a spacecraft is at $r = 7000\ \mathrm{km}$ with speed $v = 8.5\ \mathrm{km/s}$ and flight-path angle $\gamma = +10^\circ$ (climbing). Find $a$, $e$, the true anomaly, the perigee and apogee altitudes and the period.
::: solution
Energy and semi-major axis:
$$
\varepsilon = \frac{8.5^2}{2} - \frac{398\,600}{7000} = 36.125 - 56.943 = -20.818\ \mathrm{km^2/s^2}, \qquad a = -\frac{\mu}{2\varepsilon} = 9574\ \mathrm{km}.
$$
Angular momentum: $h = rv\cos\gamma = 7000 \times 8.5 \times \cos 10^\circ = 58\,596\ \mathrm{km^2/s}$, so $p = h^2/\mu = 8614\ \mathrm{km}$ and $e = \sqrt{1 - p/a} = \sqrt{1 - 0.8997} = 0.3166$.

True anomaly: from [[#eq-orbit]], $e\cos\theta = p/r - 1 = 0.2306$; differentiating the orbit equation gives $v_r = (\mu/h)\,e\sin\theta$, so $e\sin\theta = h v_r/\mu = 58\,596 \times (8.5\sin 10^\circ)/398\,600 = 0.2170$. Then $\theta = \operatorname{atan2}(0.2170,\ 0.2306) = 43.3^\circ$. Using both components settles the quadrant: $v_r > 0$ means the spacecraft is between perigee and apogee, $0 < \theta < 180^\circ$.

Apses: $r_p = a(1-e) = 6543\ \mathrm{km}$ (altitude $165\ \mathrm{km}$), $r_a = a(1+e) = 12\,605\ \mathrm{km}$ (altitude $6227\ \mathrm{km}$); period $T = 2\pi\sqrt{a^3/\mu} = 9322\ \mathrm{s} = 2.59\ \mathrm{h}$.

*Check:* $r_p(1+e)$ should equal $p$: $6543 \times 1.3166 = 8614\ \mathrm{km}$. The perigee altitude of $165\ \mathrm{km}$ is low enough that drag would bring this orbit down within days — the climbing burnout angle has cost a lot of perigee height, the reason launchers aim for $\gamma \approx 0$ at injection.
:::
:::

## Hyperbolic orbits {#sec-hyperbola}

On a hyperbola the energy is positive, and as $r \to \infty$ the speed approaches the **hyperbolic excess speed**
$$
v_\infty = \sqrt{2\varepsilon} = \sqrt{\frac{\mu}{-a}}, \qquad v^2 = v_\infty^2 + \frac{2\mu}{r} = v_\infty^2 + v_\mathrm{esc}^2(r).
$$ {#eq-vinf}
The radius tends to infinity as $1 + e\cos\theta \to 0$, i.e. at the asymptotic true anomaly $\theta_\infty = \arccos(-1/e)$. The incoming and outgoing asymptotes make the **turning angle** $\delta$ with each other, where
$$
\sin\frac{\delta}{2} = \frac{1}{e}.
$$ {#eq-turn}
(The angle between the two asymptotes, measured through the focus, is $2\theta_\infty - 180^\circ$, and $\theta_\infty - 90^\circ = \arcsin(1/e)$.) A slightly hyperbolic orbit ($e$ just above 1) turns the trajectory almost completely round; a fast, distant pass ($e \gg 1$) barely bends it. Departures from a planet and gravity assists, treated in [[orbital-mechanics/interplanetary-trajectories]], are built on these two formulas, and on $e = 1 + r_p v_\infty^2/\mu$, which follows from $r_p = a(1-e)$ and $a = -\mu/v_\infty^2$.

::: example Escaping the Earth with a given excess speed {#ex-hyperbolic}
A probe in a circular parking orbit at $300\ \mathrm{km}$ altitude is to leave the Earth with $v_\infty = 3.0\ \mathrm{km/s}$. Find the required perigee speed, the impulse needed if it is applied tangentially in the parking orbit, the eccentricity and the turning angle of the departure hyperbola.
::: solution
$r_p = 6678\ \mathrm{km}$. From [[#eq-vinf]]:
$$
v_p = \sqrt{3.0^2 + \frac{2 \times 398\,600}{6678}} = \sqrt{9.00 + 119.38} = 11.330\ \mathrm{km/s}.
$$
The circular speed is $\sqrt{398\,600/6678} = 7.726\ \mathrm{km/s}$, so $\Delta v = 3.605\ \mathrm{km/s}$. The eccentricity is
$$
e = 1 + \frac{r_p v_\infty^2}{\mu} = 1 + \frac{6678 \times 9.00}{398\,600} = 1.1508,
$$
and the turning angle is $\delta = 2\arcsin(1/1.1508) = 120.7^\circ$.

*Check:* the excess speed costs remarkably little. Escape alone needs $10.926 - 7.726 = 3.200\ \mathrm{km/s}$; the extra $0.405\ \mathrm{km/s}$ buys $3\ \mathrm{km/s}$ at infinity, because speeds add in quadrature in [[#eq-vinf]] and the burn is made deep in the gravity well, where the spacecraft is already fast. This is the Oberth effect, met again in [[orbital-mechanics/orbital-manoeuvres]].
:::
:::

::: example When the mass of the satellite matters: the Earth and the Moon {#ex-earth-moon}
The Moon's mean distance from the Earth is $a = 384\,400\ \mathrm{km}$. Locate the Earth–Moon barycentre, and compare the sidereal period predicted with $\mu = Gm_E$ alone and with $\mu = G(m_E + m_M)$ against the observed $27.32$ days.
::: solution
The centre of mass lies on the line joining the centres at distance $a\,m_M/(m_E+m_M) = a\,\mu_M/(\mu_E + \mu_M)$ from the Earth's centre:
$$
d_G = 384\,400 \times \frac{4903}{398\,600 + 4903} = 4671\ \mathrm{km},
$$
about $1700\ \mathrm{km}$ beneath the Earth's surface. Both bodies circle this point once a month.

With $\mu = 398\,600$: $T = 2\pi\sqrt{384\,400^3/398\,600} = 2.372\times10^6\ \mathrm{s} = 27.45\ \mathrm{d}$. With $\mu = 403\,503\ \mathrm{km^3/s^2}$: $T = 27.28\ \mathrm{d}$.

*Check:* including the Moon's mass closes most of the gap to the observed $27.32$ days; the remaining $0.15\,\%$ is the Sun's perturbation, which the two-body model omits. For an artificial satellite, $m_2/m_1 \sim 10^{-21}$ and the distinction is irrelevant.
:::
:::

::: quiz
Two satellites orbit the Earth. Satellite A is in a circular orbit of radius $20\,000\ \mathrm{km}$; satellite B is on an ellipse with perigee radius $8\,000\ \mathrm{km}$ and apogee radius $32\,000\ \mathrm{km}$. Which statements are true?
- [x] They have the same period.
- [x] They have the same specific energy.
- [ ] They have the same specific angular momentum.
- [x] Where B crosses $r = 20\,000\ \mathrm{km}$, its speed equals A's speed.
::: solution
B's semi-major axis is $(8000 + 32\,000)/2 = 20\,000\ \mathrm{km}$, equal to A's radius, so the energy $-\mu/(2a)$, the period $2\pi\sqrt{a^3/\mu}$ and (by vis-viva, which depends on $r$ and $a$ only) the speed at any given radius are the same. The angular momentum $h = \sqrt{\mu a(1-e^2)}$ is not: B has $e = 0.6$ and $h_B = 0.8\,h_A$. At $r = 20\,000\ \mathrm{km}$ B moves at A's speed but not horizontally — its flight-path angle there is $\arccos 0.8 = 36.9^\circ$.
:::
:::

::: history
Johannes Kepler extracted the first two laws of planetary motion — elliptical orbits with the Sun at a focus, and equal areas in equal times — from Tycho Brahe's observations of Mars, publishing them in *Astronomia Nova* (1609); the third law, relating period to orbit size, followed in *Harmonices Mundi* (1619). Isaac Newton's *Philosophiæ Naturalis Principia Mathematica* (1687) derived them from the laws of motion and an inverse-square attraction: Book I shows that a central force gives equal areas and that a body on a conic about a focus is pulled by an inverse-square force, and it corrects the third law for the mass of the orbiting body. The converse — that an inverse-square force always produces a conic — was stated rather than fully proved in the *Principia*; Jakob Hermann and Johann Bernoulli supplied analytical treatments around 1710, Hermann identifying the conserved vector that fixes the orbit's orientation. That vector, rediscovered by Laplace and later by Hamilton and Gibbs, is now usually called the Laplace–Runge–Lenz vector — the eccentricity vector of [[#thm-orbit]] scaled by $\mu$.
:::

## Where this leads {#sec-next}

The orbit equation gives $r$ as a function of the true anomaly but says nothing about *when* the spacecraft is at a given $\theta$; that needs Kepler's equation, the subject of [[orbital-mechanics/orbital-position-time]]. The orientation of the orbital plane and of the eccentricity vector in space is described by the orbital elements of [[orbital-mechanics/orbital-elements]], and the vectors $\mathbf{h}$ and $\mathbf{e}$ derived here are exactly how the elements are computed from a measured position and velocity.

::: summary
- The relative motion of two point masses obeys $\ddot{\mathbf{r}} = -\mu\mathbf{r}/r^3$ with $\mu = G(m_1+m_2)$; their centre of mass moves uniformly.
- $\mathbf{h} = \mathbf{r}\times\mathbf{v}$ is constant: the orbit is planar, $h = rv_\perp = r^2\dot\theta$, and equal areas are swept in equal times.
- $\varepsilon = v^2/2 - \mu/r$ is constant and equals $-\mu/(2a)$, giving the vis-viva equation $v^2 = \mu(2/r - 1/a)$.
- The eccentricity vector $\mathbf{e} = \mathbf{v}\times\mathbf{h}/\mu - \mathbf{r}/r$ points to periapsis and yields the orbit equation $r = (h^2/\mu)/(1+e\cos\theta)$, a conic with $e^2 = 1 + 2\varepsilon h^2/\mu^2$.
- Circle $e = 0$, ellipse $0<e<1$, parabola $e = 1$ ($\varepsilon = 0$), hyperbola $e>1$ with $v_\infty = \sqrt{2\varepsilon}$ and turning angle $\sin(\delta/2) = 1/e$.
- $v_c = \sqrt{\mu/r}$, $v_\mathrm{esc} = \sqrt{2}\,v_c$, $T = 2\pi\sqrt{a^3/\mu}$ independent of $e$.
- Always work with radii from the centre of the body, not altitudes.
:::

## Exercises

::: exercise Geostationary speed {level=1 check="3.07"}
A geostationary satellite moves on a circular orbit of radius $42\,164\ \mathrm{km}$. Find its orbital speed. (Enter the speed in km/s to three significant figures.)
::: solution
$v_c = \sqrt{\mu/r} = \sqrt{398\,600/42\,164} = \sqrt{9.4536} = 3.07\ \mathrm{km/s}$ ($3.0747$). Check: the circumference $2\pi \times 42\,164 = 264\,924\ \mathrm{km}$ divided by the sidereal day $86\,164\ \mathrm{s}$ gives $3.075\ \mathrm{km/s}$, as it must for an orbit that keeps pace with the Earth's rotation.
:::
:::

::: exercise Escape from Mars {level=1 check="5.02"}
Find the escape speed from the surface of Mars ($\mu = 42\,828\ \mathrm{km^3/s^2}$, $R = 3396\ \mathrm{km}$), ignoring the atmosphere and the planet's rotation. (Enter the speed in km/s to three significant figures.)
::: solution
$v_\mathrm{esc} = \sqrt{2\mu/R} = \sqrt{2 \times 42\,828/3396} = \sqrt{25.22} = 5.02\ \mathrm{km/s}$, less than half the Earth's $11.2\ \mathrm{km/s}$.
:::
:::

::: exercise Period of an elliptical orbit {level=1 check="110.5"}
An Earth satellite has perigee altitude $500\ \mathrm{km}$ and apogee altitude $2000\ \mathrm{km}$. Find its period. (Enter the period in minutes to four significant figures.)
::: solution
$r_p = 6878\ \mathrm{km}$, $r_a = 8378\ \mathrm{km}$, $a = 7628\ \mathrm{km}$. $T = 2\pi\sqrt{7628^3/398\,600} = 6630\ \mathrm{s} = 110.5\ \mathrm{min}$. It depends only on $a$: a circular orbit at $1250\ \mathrm{km}$ altitude would have the same period.
:::
:::

::: exercise Apogee from a horizontal burnout {level=2 check="3991"}
A spacecraft at $r = 8000\ \mathrm{km}$ is moving horizontally ($\gamma = 0$) at $7.5\ \mathrm{km/s}$. Is this point the perigee or the apogee? Find the altitude of the other apse. (Enter the altitude in km, to the nearest kilometre.)
::: solution
The local circular speed is $\sqrt{398\,600/8000} = 7.059\ \mathrm{km/s}$; the spacecraft is faster, so it will climb: this is the **perigee**. Energy: $\varepsilon = 7.5^2/2 - 398\,600/8000 = 28.125 - 49.825 = -21.700\ \mathrm{km^2/s^2}$, so $a = 398\,600/43.400 = 9184.3\ \mathrm{km}$ and $r_a = 2a - r_p = 10\,368.7\ \mathrm{km}$. Altitude: $10\,368.7 - 6378 = 3991\ \mathrm{km}$. Check with angular momentum: $v_a = r_p v_p/r_a = 5.787\ \mathrm{km/s}$, and vis-viva at $r_a$ gives $\sqrt{398\,600(2/10\,368.7 - 1/9184.3)} = 5.787\ \mathrm{km/s}$.
:::
:::

::: exercise Eccentricity from velocity components {level=2 check="0.332"}
A tracking station finds an Earth satellite at $r = 10\,000\ \mathrm{km}$ with radial velocity $v_r = 2.0\ \mathrm{km/s}$ and transverse velocity $v_\perp = 6.5\ \mathrm{km/s}$. Find the eccentricity and the true anomaly, and decide whether the orbit is safe from the atmosphere. (Enter $e$ to three significant figures.)
::: solution
$h = r v_\perp = 65\,000\ \mathrm{km^2/s}$. Then $e\cos\theta = h v_\perp/\mu - 1 = 65\,000 \times 6.5/398\,600 - 1 = 0.0600$ and $e\sin\theta = h v_r/\mu = 0.3261$. So $e = \sqrt{0.0600^2 + 0.3261^2} = 0.332$ and $\theta = \operatorname{atan2}(0.3261, 0.0600) = 79.6^\circ$. Perigee: $r_p = (h^2/\mu)/(1+e) = 10\,600/1.332 = 7960\ \mathrm{km}$, altitude $1582\ \mathrm{km}$ — well clear of the atmosphere. (The relation $e\cos\theta = h v_\perp/\mu - 1$ comes from $v_\perp = h/r$ and the orbit equation.)
:::
:::

::: exercise Excess speed of a fast flyby {level=2 check="5.30"}
A spacecraft passes the Earth with perigee altitude $500\ \mathrm{km}$ and perigee speed $12.0\ \mathrm{km/s}$. Find its hyperbolic excess speed, the eccentricity of its trajectory and the angle through which the Earth turns its velocity. (Enter $v_\infty$ in km/s to three significant figures.)
::: solution
$r_p = 6878\ \mathrm{km}$, $v_\mathrm{esc}^2 = 2\mu/r_p = 115.91\ \mathrm{km^2/s^2}$, so $v_\infty = \sqrt{144 - 115.91} = 5.30\ \mathrm{km/s}$. $e = r_p v_p^2/\mu - 1 = 6878 \times 144/398\,600 - 1 = 1.485$ (equivalently $1 + r_pv_\infty^2/\mu$). Turning angle $\delta = 2\arcsin(1/1.485) = 84.7^\circ$.
:::
:::

::: exercise The steepest flight-path angle {#exr-gamma level=3 check="30"}
Show that on an ellipse $\tan\gamma = e\sin\theta/(1 + e\cos\theta)$, and that $\gamma$ is largest where $\cos\theta = -e$, with $\sin\gamma_\mathrm{max} = e$. Find $\gamma_\mathrm{max}$ for $e = 0.5$. (Enter the angle in degrees.)
::: solution
From $h = r^2\dot\theta$ and the orbit equation, $v_\perp = h/r = (\mu/h)(1 + e\cos\theta)$. Differentiating $r = p/(1+e\cos\theta)$ with respect to time, $\dot r = p\,e\sin\theta\,\dot\theta/(1+e\cos\theta)^2 = (e\sin\theta)\,r^2\dot\theta/p = (\mu/h)\,e\sin\theta$. So $\tan\gamma = v_r/v_\perp = e\sin\theta/(1+e\cos\theta)$.

Setting $\mathrm{d}(\tan\gamma)/\mathrm{d}\theta = 0$: $\cos\theta(1+e\cos\theta) + e\sin^2\theta = 0$, i.e. $\cos\theta + e = 0$. There $\sin\theta = \sqrt{1-e^2}$ and $\tan\gamma_\mathrm{max} = e\sqrt{1-e^2}/(1-e^2) = e/\sqrt{1-e^2}$, which means $\sin\gamma_\mathrm{max} = e$. For $e = 0.5$: $\gamma_\mathrm{max} = 30^\circ$, reached at $\theta = 120^\circ$. The point $\cos\theta = -e$ is the end of the minor axis, where $r = a$ — the same place where the speed equals the circular speed $\sqrt{\mu/a}$.
:::
:::

::: exercise Designing a half-day orbit {level=3 check="39770"}
A communications mission wants an orbit with a period of half a sidereal day ($43\,082\ \mathrm{s}$) and a perigee altitude of $600\ \mathrm{km}$, so that the satellite spends most of each orbit near a high apogee. Find the semi-major axis, the apogee altitude and the eccentricity, and comment on the design. (Enter the apogee altitude in km, to the nearest 10 km.)
::: solution
From [[#eq-period]], $a = \left[\mu\,(T/2\pi)^2\right]^{1/3} = \left[398\,600 \times 6856.7^2\right]^{1/3} = 26\,562\ \mathrm{km}$. With $r_p = 6978\ \mathrm{km}$, $r_a = 2a - r_p = 46\,145\ \mathrm{km}$: apogee altitude $39\,767\ \mathrm{km}$, i.e. $39\,770\ \mathrm{km}$ to the nearest 10 km. Eccentricity $e = (r_a - r_p)/(r_a + r_p) = 0.737$.

Comment: by Kepler's second law the satellite moves slowly near apogee ($v_a = 1.51\ \mathrm{km/s}$ against $v_p = 9.96\ \mathrm{km/s}$), so it spends most of each orbit high above one hemisphere — the principle of the Russian Molniya orbits. Two things the two-body model leaves out decide whether the design works: the Earth's oblateness rotates the apse line unless the inclination is about $63.4^\circ$ ([[orbital-mechanics/perturbations]]), and a perigee of $600\ \mathrm{km}$ passes through the radiation belts twice a day.
:::
:::

::: exercise The parabola as a limit {level=3}
(a) Show that on a parabolic orbit the speed is everywhere exactly the local escape speed, and that the flight-path angle is $\gamma = \theta/2$. (b) Using the eccentricity vector, show that if a spacecraft at radius $r$ has speed $v$ with $v^2 r/\mu = 2$ in *any* direction (other than straight up or down), its orbit is a parabola, and find its periapsis radius in terms of $r$ and $\gamma$.
::: solution
(a) For $e = 1$, [[#eq-e-energy]] gives $\varepsilon = 0$, so $v^2 = 2\mu/r = v_\mathrm{esc}^2$. From [[#exr-gamma]], $\tan\gamma = \sin\theta/(1+\cos\theta) = \tan(\theta/2)$ (half-angle identity), so $\gamma = \theta/2$: the velocity turns from horizontal at periapsis to radial at infinity, where $\theta \to 180^\circ$.

(b) If $v^2 = 2\mu/r$ then $\varepsilon = 0$ and $e = 1$ for any $h \ne 0$, so the orbit is a parabola regardless of direction. With $h = rv\cos\gamma$, $p = h^2/\mu = r^2 v^2\cos^2\gamma/\mu = 2r\cos^2\gamma$, and $r_p = p/2 = r\cos^2\gamma$. Horizontal launch ($\gamma = 0$) makes the launch point the periapsis; steeper launch moves the periapsis inwards — and if $r\cos^2\gamma$ is less than the planet's radius, the backwards extension of the trajectory passes through the planet, which is harmless on the way out but fatal on the way in.
:::
:::
