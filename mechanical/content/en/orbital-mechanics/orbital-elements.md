The first two chapters solved the two-body problem inside the orbital plane: the conic's size and shape, and where on it the spacecraft is at a given time. A real mission needs more. The orbit of a weather satellite must pass over the poles; a communications satellite must stay over the equator; a space station's orbit is tilted so that it can be reached from launch sites at high latitudes; and every tracking station on the ground needs to know where in the sky to point. All of these questions concern the *orientation* of the orbit in three-dimensional space. This chapter sets up the reference frames in which orbits are described, defines the six **classical orbital elements** that pin down a two-body orbit completely, and derives the two conversions every orbit program performs constantly: from a measured position and velocity (a **state vector**) to the elements, and back. Along the way we deal with the awkward special cases — circular and equatorial orbits, where some elements are undefined — and with the ground track, the path a satellite traces over the rotating Earth.

The mathematics is vector algebra and rotation matrices ([linear maps](/learn/maths/lesson.php?c=linear-algebra&l=linear-maps)); the physics is entirely contained in [[orbital-mechanics/two-body-problem]].

## Reference frames {#sec-frames}

An orbit must be described in an **inertial** frame, because $\ddot{\mathbf{r}} = -\mu\mathbf{r}/r^3$ holds only there. For Earth orbits the standard choice is centred on the Earth and oriented by the equator and the stars.

::: definition Geocentric equatorial frame {#def-eci}
The **geocentric equatorial frame** (often called **ECI**, Earth-centred inertial) has its origin at the Earth's centre, its $XY$ plane in the Earth's equatorial plane and its $Z$ axis along the Earth's rotation axis towards the north pole. The $X$ axis points to the **vernal equinox** ♈ — the direction from the Earth to the Sun at the March equinox, which is the line of intersection of the equatorial plane and the ecliptic (the plane of the Earth's orbit). $Y$ completes the right-handed set. Unit vectors are $\mathbf{I}, \mathbf{J}, \mathbf{K}$.

A direction in this frame is given by its **right ascension** $\alpha$, measured eastward in the equatorial plane from ♈, and its **declination** $\delta$, the angle north of the equator:
$$
\hat{\mathbf{r}} = \cos\delta\cos\alpha\,\mathbf{I} + \cos\delta\sin\alpha\,\mathbf{J} + \sin\delta\,\mathbf{K}.
$$
:::

The frame does not rotate with the Earth. But the Earth's axis is not quite fixed in space: the torque of the Sun and Moon on the equatorial bulge makes it **precess** with a period of about 25 800 years, and it **nutates** with smaller periodic wobbles. The equinox therefore drifts westward along the ecliptic by about $50''$ per year, and an "equator and equinox" frame must be tied to a date. The modern convention uses the mean equator and equinox of the standard epoch **J2000.0** (1 January 2000, 12:00 Terrestrial Time), realised today by the International Celestial Reference Frame, which is fixed to distant quasars. For the accuracy of this course the distinctions between these frames (they differ by less than a tenth of an arcsecond in orientation) do not matter; for precise orbit work they matter a great deal, and software libraries handle them.

The other frame we need is attached to the orbit itself.

::: definition Perifocal frame {#def-perifocal}
The **perifocal frame** of an orbit has its origin at the focus (the centre of the attracting body), its $x$ axis $\hat{\mathbf{p}}$ towards periapsis (along $\mathbf{e}$), its $z$ axis $\hat{\mathbf{w}}$ along the angular momentum $\mathbf{h}$, and $\hat{\mathbf{q}} = \hat{\mathbf{w}}\times\hat{\mathbf{p}}$ completing the set, so that the spacecraft moves anticlockwise seen from $+\hat{\mathbf{w}}$. In this frame the motion is planar and, from [[orbital-mechanics/two-body-problem]],
$$
\mathbf{r} = \frac{h^2}{\mu}\,\frac{1}{1 + e\cos\theta}\begin{bmatrix}\cos\theta\\ \sin\theta\\ 0\end{bmatrix}, \qquad
\mathbf{v} = \frac{\mu}{h}\begin{bmatrix}-\sin\theta\\ e + \cos\theta\\ 0\end{bmatrix}.
$$ {#eq-perifocal}
:::

The velocity formula follows from $v_r = (\mu/h)e\sin\theta$ and $v_\perp = (\mu/h)(1+e\cos\theta)$ by resolving along $\hat{\mathbf{p}}$ and $\hat{\mathbf{q}}$: $v_p = v_r\cos\theta - v_\perp\sin\theta = -(\mu/h)\sin\theta$ and $v_q = v_r\sin\theta + v_\perp\cos\theta = (\mu/h)(e + \cos\theta)$.

## The classical orbital elements {#sec-elements}

A two-body orbit is the solution of a sixth-order system (three second-order equations), so six independent constants are needed to specify it; any six independent functions of the initial position and velocity will do. The classical choice separates them into size and shape (two), orientation of the plane (two), orientation within the plane (one) and position along the orbit (one).

::: definition The classical orbital elements {#def-elements}
With $\mathbf{K}$ the north axis of the equatorial frame, define the **node vector** $\mathbf{N} = \mathbf{K}\times\mathbf{h}$, which points to the **ascending node** — the point where the spacecraft crosses the equator going north. Then:

1. $h$, the **specific angular momentum** (or equivalently the **semi-major axis** $a$): size of the orbit.
2. $e$, the **eccentricity**: shape.
3. $i$, the **inclination**: the angle between $\mathbf{K}$ and $\mathbf{h}$, $0 \le i \le 180^\circ$. Orbits with $i < 90^\circ$ are **prograde** (moving eastward, with the Earth's rotation), $i > 90^\circ$ **retrograde**; $i = 90^\circ$ is **polar**.
4. $\Omega$, the **right ascension of the ascending node** (RAAN): the angle in the equatorial plane from $\mathbf{I}$ to $\mathbf{N}$, $0 \le \Omega < 360^\circ$.
5. $\omega$, the **argument of periapsis**: the angle in the orbital plane from $\mathbf{N}$ to $\mathbf{e}$, measured in the direction of motion, $0 \le \omega < 360^\circ$.
6. $\theta$, the **true anomaly** at a given epoch (or the mean anomaly $M$, or the time of periapsis passage): position along the orbit.

The **line of nodes** is the intersection of the orbital and equatorial planes, and the **apse line** the line through periapsis and apoapsis.
:::

Five of the six are constant in the two-body problem; only $\theta$ (or $M$) changes with time. That is the great practical merit of elements over state vectors: they change slowly or not at all, so they reveal what an orbit *is*, and under perturbations ([[orbital-mechanics/perturbations]]) their slow drift is the natural way to describe the effect — the nodes regress, the apse line rotates. A state vector, by contrast, changes completely every hour.

Geometrically: $\Omega$ and $i$ fix the orbital plane (rotate about $\mathbf{K}$ by $\Omega$ to bring $\mathbf{I}$ onto the node line, then tilt the plane about the node line by $i$), and $\omega$ then rotates the apse line within the plane. The sum $u = \omega + \theta$, the angle from the ascending node to the spacecraft, is the **argument of latitude**.

## From state vector to elements {#sec-rv-to-elements}

Tracking produces positions and velocities; mission analysis wants elements. The conversion uses only the vectors $\mathbf{h}$, $\mathbf{N}$ and $\mathbf{e}$ and careful attention to quadrants.

::: algorithm Orbital elements from a state vector {#alg-rv2el}
Given $\mathbf{r}$ and $\mathbf{v}$ in the equatorial frame and $\mu$:

1. $r = \lVert\mathbf{r}\rVert$, $v = \lVert\mathbf{v}\rVert$, radial velocity $v_r = \mathbf{r}\cdot\mathbf{v}/r$.
2. $\mathbf{h} = \mathbf{r}\times\mathbf{v}$, $h = \lVert\mathbf{h}\rVert$.
3. Inclination: $i = \arccos(h_Z/h)$ — no ambiguity, since $0 \le i \le 180^\circ$.
4. Node vector $\mathbf{N} = \mathbf{K}\times\mathbf{h} = (-h_Y,\ h_X,\ 0)$, $N = \lVert\mathbf{N}\rVert$.
5. RAAN: $\Omega = \arccos(N_X/N)$ if $N_Y \ge 0$, otherwise $360^\circ - \arccos(N_X/N)$.
6. Eccentricity vector: $\mathbf{e} = \dfrac{1}{\mu}\left[\left(v^2 - \dfrac{\mu}{r}\right)\mathbf{r} - r\,v_r\,\mathbf{v}\right]$, $e = \lVert\mathbf{e}\rVert$.
7. Argument of periapsis: $\omega = \arccos\dfrac{\mathbf{N}\cdot\mathbf{e}}{Ne}$ if $e_Z \ge 0$ (periapsis in the northern hemisphere), otherwise $360^\circ - \arccos(\cdot)$.
8. True anomaly: $\theta = \arccos\dfrac{\mathbf{e}\cdot\mathbf{r}}{er}$ if $v_r \ge 0$ (moving away from periapsis), otherwise $360^\circ - \arccos(\cdot)$.
9. Semi-major axis: $a = h^2/[\mu(1-e^2)]$ (negative for a hyperbola).

The formula in step 6 is the eccentricity vector $\mathbf{e} = \mathbf{v}\times\mathbf{h}/\mu - \mathbf{r}/r$ of [[orbital-mechanics/two-body-problem]] expanded with $\mathbf{v}\times(\mathbf{r}\times\mathbf{v}) = v^2\mathbf{r} - (\mathbf{r}\cdot\mathbf{v})\mathbf{v}$. Steps 5, 7 and 8 resolve the two-fold ambiguity of $\arccos$ by asking which side of a reference plane the vector lies on.
:::

::: example Elements of a tracked satellite {#ex-rv2el}
A satellite is observed at
$$
\mathbf{r} = (-3109,\ 3705,\ 6102)\ \mathrm{km}, \qquad \mathbf{v} = (-6.028,\ -4.649,\ 0.396)\ \mathrm{km/s}.
$$
Find its orbital elements.
::: solution
1. $r = 7786.4\ \mathrm{km}$, $v = 7.6228\ \mathrm{km/s}$, $v_r = \mathbf{r}\cdot\mathbf{v}/r = 0.5051\ \mathrm{km/s}$ (moving away from periapsis).
2. $\mathbf{h} = \mathbf{r}\times\mathbf{v} = (29\,835,\ -35\,552,\ 36\,787)\ \mathrm{km^2/s}$, $h = 59\,223\ \mathrm{km^2/s}$.
3. $i = \arccos(36\,787/59\,223) = 51.60^\circ$.
4. $\mathbf{N} = (35\,552,\ 29\,835,\ 0)$, $N = 46\,412$.
5. $N_Y > 0$, so $\Omega = \arccos(35\,552/46\,412) = 40.00^\circ$.
6. $v^2 - \mu/r = 58.107 - 51.192 = 6.915\ \mathrm{km^2/s^2}$ and $rv_r = 3933\ \mathrm{km^2/s}$, so
$$
\mathbf{e} = \frac{6.915\,(-3109,\ 3705,\ 6102) - 3933\,(-6.028,\ -4.649,\ 0.396)}{398\,600} = (0.00554,\ 0.11014,\ 0.10195),
$$
$e = 0.1502$.
7. $e_Z > 0$, so $\omega = \arccos\!\big[(35\,552 \times 0.00554 + 29\,835 \times 0.11014)/(46\,412 \times 0.1502)\big] = 60.02^\circ$.
8. $v_r > 0$, so $\theta = \arccos\!\big[\mathbf{e}\cdot\mathbf{r}/(er)\big] = 29.98^\circ$.
9. $a = 59\,223^2/[398\,600\,(1 - 0.1502^2)] = 9002\ \mathrm{km}$.

*Check:* the orbit has $r_p = a(1-e) = 7650\ \mathrm{km}$ and $r_a = 10\,354\ \mathrm{km}$, and the observed $r = 7786\ \mathrm{km}$ lies between, just past periapsis — consistent with $\theta = 30^\circ$ and the positive $v_r$. (These vectors were generated from $a = 9000\ \mathrm{km}$, $e = 0.15$, $i = 51.6^\circ$, $\Omega = 40^\circ$, $\omega = 60^\circ$, $\theta = 30^\circ$ and rounded to the precision shown; the small differences in the recovered elements are the rounding, which illustrates how sensitive $a$ is to the velocity: $1\ \mathrm{m/s}$ of speed changes $a$ by about $3.1\ \mathrm{km}$ here.)
:::
:::

## From elements to state vector {#sec-elements-to-rv}

::: proposition Perifocal-to-equatorial transformation {#prop-rotation}
The components of a vector in the equatorial frame are obtained from its perifocal components by $\mathbf{r}_\text{ECI} = \mathbf{Q}\,\mathbf{r}_\text{pf}$, with
$$
\mathbf{Q} = \mathbf{R}_3(-\Omega)\,\mathbf{R}_1(-i)\,\mathbf{R}_3(-\omega) =
\begin{bmatrix}
\cos\Omega\cos\omega - \sin\Omega\sin\omega\cos i & -\cos\Omega\sin\omega - \sin\Omega\cos\omega\cos i & \sin\Omega\sin i\\
\sin\Omega\cos\omega + \cos\Omega\sin\omega\cos i & -\sin\Omega\sin\omega + \cos\Omega\cos\omega\cos i & -\cos\Omega\sin i\\
\sin\omega\sin i & \cos\omega\sin i & \cos i
\end{bmatrix},
$$ {#eq-Q}
where $\mathbf{R}_1(\phi)$ and $\mathbf{R}_3(\phi)$ are the frame rotations about the first and third axes,
$$
\mathbf{R}_1(\phi) = \begin{bmatrix}1&0&0\\0&\cos\phi&\sin\phi\\0&-\sin\phi&\cos\phi\end{bmatrix}, \qquad
\mathbf{R}_3(\phi) = \begin{bmatrix}\cos\phi&\sin\phi&0\\-\sin\phi&\cos\phi&0\\0&0&1\end{bmatrix}.
$$
The columns of $\mathbf{Q}$ are the unit vectors $\hat{\mathbf{p}}, \hat{\mathbf{q}}, \hat{\mathbf{w}}$ expressed in the equatorial frame.
:::

::: proof
$\mathbf{R}_3(\phi)$ gives the components, in a frame rotated by $\phi$ about the 3-axis, of a vector known in the original frame (a "passive" rotation). Starting from the equatorial frame, rotate by $\Omega$ about $\mathbf{K}$: the new first axis lies along the node line. Rotate by $i$ about that node line: the new third axis lies along $\mathbf{h}$. Rotate by $\omega$ about $\mathbf{h}$: the first axis now points to periapsis — this is the perifocal frame. So perifocal components are $\mathbf{r}_\text{pf} = \mathbf{R}_3(\omega)\mathbf{R}_1(i)\mathbf{R}_3(\Omega)\,\mathbf{r}_\text{ECI}$. Each rotation matrix is orthogonal, with $\mathbf{R}^{-1} = \mathbf{R}^\mathsf{T} = \mathbf{R}(-\phi)$, so inverting reverses the order and the signs: $\mathbf{r}_\text{ECI} = \mathbf{R}_3(-\Omega)\mathbf{R}_1(-i)\mathbf{R}_3(-\omega)\,\mathbf{r}_\text{pf}$. Multiplying out gives [[#eq-Q]]. The third column is $\mathbf{Q}(0,0,1)^\mathsf{T}$, the perifocal $\hat{\mathbf{w}}$ in equatorial components, $(\sin\Omega\sin i, -\cos\Omega\sin i, \cos i)$; its $Z$-component $\cos i$ confirms the definition of $i$ as the angle between $\mathbf{h}$ and $\mathbf{K}$.
:::

Two useful consequences come straight from the third row of $\mathbf{Q}$. The $Z$-component of $\mathbf{r}$ is $r(\sin\omega\sin i\cos\theta + \cos\omega\sin i\sin\theta) = r\sin i\sin(\omega + \theta)$, so the spacecraft's **declination** (its geocentric latitude) is
$$
\sin\delta = \sin i\,\sin u, \qquad u = \omega + \theta.
$$ {#eq-declination}
Since $\lvert\sin u\rvert \le 1$, a satellite's latitude never exceeds $i$ (for prograde orbits) or $180^\circ - i$ (for retrograde ones): an orbit inclined at $51.6^\circ$ never flies over London ($51.5^\circ\,\mathrm{N}$) by more than a whisker, and covers nothing north of $51.6^\circ$.

::: example State vector of a highly eccentric orbit {#ex-el2rv}
A satellite has $a = 26\,562\ \mathrm{km}$, $e = 0.737$, $i = 63.4^\circ$, $\Omega = 250^\circ$, $\omega = 270^\circ$ and $\theta = 150^\circ$. Find its position and velocity in the equatorial frame, and its declination.
::: solution
$h = \sqrt{\mu a(1-e^2)} = \sqrt{398\,600 \times 26\,562 \times 0.45683} = 69\,547\ \mathrm{km^2/s}$, $p = h^2/\mu = 12\,134\ \mathrm{km}$.

Perifocal, from [[#eq-perifocal]]: $r = 12\,134/(1 + 0.737\cos 150^\circ) = 33\,544\ \mathrm{km}$, so
$$
\mathbf{r}_\text{pf} = (-29\,050,\ 16\,772,\ 0)\ \mathrm{km}, \qquad
\mathbf{v}_\text{pf} = \frac{398\,600}{69\,547}\,(-0.5,\ 0.737 - 0.8660,\ 0) = (-2.8657,\ -0.7395,\ 0)\ \mathrm{km/s}.
$$
The rotation matrix [[#eq-Q]] with these angles is
$$
\mathbf{Q} = \begin{bmatrix} -0.4208 & -0.3420 & -0.8402\\ 0.1531 & -0.9397 & 0.3058\\ -0.8942 & 0 & 0.4478\end{bmatrix},
$$
and multiplying,
$$
\mathbf{r} = (6487,\ -20\,210,\ 25\,975)\ \mathrm{km}, \qquad \mathbf{v} = (1.4587,\ 0.2560,\ 2.5624)\ \mathrm{km/s}.
$$
Declination: $\sin\delta = \sin 63.4^\circ\sin(270^\circ + 150^\circ) = 0.8942 \times 0.8660 = 0.7744$, $\delta = 50.75^\circ$; the direct value $\arcsin(25\,975/33\,544)$ agrees.

*Check:* $\lVert\mathbf{r}\rVert = 33\,544\ \mathrm{km}$ and $\lVert\mathbf{v}\rVert = 2.960\ \mathrm{km/s}$ are unchanged by the rotation, and vis-viva gives $\sqrt{398\,600(2/33\,544 - 1/26\,562)} = 2.960\ \mathrm{km/s}$. Feeding $\mathbf{r}, \mathbf{v}$ back into [[#alg-rv2el]] returns the six elements exactly. With $\omega = 270^\circ$ the perigee is at the southernmost point of the orbit ($u = 270^\circ$) and the apogee at the northernmost ($u = 90^\circ$), which is why this geometry serves high northern latitudes.
:::
:::

::: warning Quadrant checks and undefined elements {#warn-quadrants}
$\arccos$ returns angles from $0$ to $180^\circ$ only. Forgetting the sign tests in steps 5, 7 and 8 of [[#alg-rv2el]] puts a descending-node orbit on the wrong side of the Earth, flips periapsis into the wrong hemisphere, or confuses outbound with inbound — all errors of up to $360^\circ - 2\times$(the right answer), which can look perfectly plausible. The second trap is **singular orbits**: for $e = 0$ there is no periapsis, so $\omega$ and $\theta$ are undefined; for $i = 0$ or $180^\circ$ there is no node, so $\Omega$ and $\omega$ are undefined. Numerically, near-circular or near-equatorial orbits produce $\omega$, $\Omega$ and $\theta$ that jump wildly from one observation to the next even though the orbit is barely changing. Use the alternative angles below, and in software use non-singular element sets (equinoctial elements) for such orbits.
:::

## Circular and equatorial orbits {#sec-special}

When an element is undefined, combine angles so that a well-defined one remains:

- **Circular inclined orbit** ($e = 0$, $0 < i < 180^\circ$): use the **argument of latitude** $u = \omega + \theta$, the angle from $\mathbf{N}$ to $\mathbf{r}$: $\cos u = \mathbf{N}\cdot\mathbf{r}/(Nr)$, with $u > 180^\circ$ when $r_Z < 0$.
- **Elliptical equatorial orbit** ($i = 0$): use the **longitude of periapsis** $\varpi = \Omega + \omega$, the angle from $\mathbf{I}$ to $\mathbf{e}$, with $\varpi > 180^\circ$ when $e_Y < 0$ (for prograde orbits).
- **Circular equatorial orbit**: use the **true longitude** $\ell = \Omega + \omega + \theta$, the angle from $\mathbf{I}$ to $\mathbf{r}$, with $\ell > 180^\circ$ when $r_Y < 0$. Geostationary satellites are catalogued this way.

::: example A circular orbit: argument of latitude {#ex-circular}
A space station's state is $\mathbf{r} = (4432,\ -4796,\ -1817)\ \mathrm{km}$, $\mathbf{v} = (2.5650,\ 4.5095,\ -5.6474)\ \mathrm{km/s}$. Show that the orbit is circular and find $i$, $\Omega$ and the argument of latitude.
::: solution
$r = 6778.3\ \mathrm{km}$ and $v = 7.6686\ \mathrm{km/s}$, which equals $\sqrt{\mu/r} = 7.6684\ \mathrm{km/s}$ to within the rounding of the data; [[#alg-rv2el]] gives $e = 6\times10^{-5}$, zero within the rounding of the data. So $\omega$ and $\theta$ are meaningless individually.

$\mathbf{h} = \mathbf{r}\times\mathbf{v} = (35\,279,\ 20\,369,\ 32\,288)\ \mathrm{km^2/s}$, $h = 51\,981$, $i = \arccos(32\,288/51\,981) = 51.60^\circ$. $\mathbf{N} = (-20\,369,\ 35\,279,\ 0)$, $N_Y > 0$, $\Omega = \arccos(-20\,369/40\,737) = 120.0^\circ$.

$\cos u = \mathbf{N}\cdot\mathbf{r}/(Nr) = (-20\,369 \times 4432 - 35\,279 \times 4796)/(40\,737 \times 6778.3) = -0.9397$, so $\arccos$ gives $160.0^\circ$; but $r_Z < 0$ (south of the equator), so $u = 360^\circ - 160.0^\circ = 200.0^\circ$.

*Check:* by [[#eq-declination]], $\sin\delta = \sin 51.6^\circ\sin 200^\circ = -0.268$, and directly $r_Z/r = -1817/6778 = -0.268$. The station passed the descending node ($u = 180^\circ$) $20^\circ$ ago, about $5\ \mathrm{min}$ earlier.
:::
:::

## Launch site and inclination {#sec-launch}

::: proposition Inclination from launch latitude and azimuth {#prop-azimuth}
A spacecraft injected into orbit directly over a point of geocentric latitude $\phi$, moving horizontally at **azimuth** $A$ (measured clockwise from north), has inclination
$$
\cos i = \cos\phi\,\sin A.
$$ {#eq-azimuth}
In particular $i \ge \lvert\phi\rvert$ for any launch azimuth, with the minimum $i = \lvert\phi\rvert$ for a launch due east ($A = 90^\circ$).
:::

::: proof
At the injection point use local unit vectors: $\hat{\mathbf{u}}$ up (radial), $\hat{\mathbf{e}}$ east, $\hat{\mathbf{n}}$ north. The horizontal velocity direction is $\hat{\mathbf{v}} = \cos A\,\hat{\mathbf{n}} + \sin A\,\hat{\mathbf{e}}$, and the orbit normal is $\hat{\mathbf{h}} = \hat{\mathbf{u}}\times\hat{\mathbf{v}} = \cos A\,(\hat{\mathbf{u}}\times\hat{\mathbf{n}}) + \sin A\,(\hat{\mathbf{u}}\times\hat{\mathbf{e}}) = -\cos A\,\hat{\mathbf{e}} + \sin A\,\hat{\mathbf{n}}$ (since $(\hat{\mathbf{e}}, \hat{\mathbf{n}}, \hat{\mathbf{u}})$ is right-handed). The Earth's axis $\mathbf{K}$ has components $0$ east, $\cos\phi$ north and $\sin\phi$ up. Hence $\cos i = \hat{\mathbf{h}}\cdot\mathbf{K} = \sin A\cos\phi$. Since $\lvert\sin A\rvert \le 1$, $\cos i \le \cos\phi$, i.e. $i \ge \lvert\phi\rvert$. The derivation assumes a spherical Earth and an inertial-frame velocity; launch vehicles fly curved paths and correct for the Earth's rotation, but the bound $i \ge \lvert\phi\rvert$ holds for any orbit that passes over the site.
:::

A launch site's latitude is thus the lowest inclination it can reach without an expensive plane change ([[orbital-mechanics/orbital-manoeuvres]]). An eastward launch also gains the Earth's rotational speed, $\omega_E R_E\cos\phi = 0.465\cos\phi\ \mathrm{km/s}$; a westward (retrograde) launch must pay it back.

::: example Launch azimuth for a space station {#ex-azimuth}
Kennedy Space Center is at latitude $28.5^\circ\,\mathrm{N}$. At what azimuth must a launch head to reach the $51.6^\circ$ orbit of the International Space Station?
::: solution
$\sin A = \cos i/\cos\phi = \cos 51.6^\circ/\cos 28.5^\circ = 0.6211/0.8788 = 0.7068$, so $A = 44.98^\circ$ (north-east) for an ascending-node pass, or $A = 135.0^\circ$ (south-east) for a descending one.

*Check:* the north-east azimuth is the one used for crewed launches from Florida to the station, which sends the ascent along the North American coast. Setting $i = 28.5^\circ$ gives $\sin A = 1$: due east, as the proposition says.
:::
:::

## Ground tracks {#sec-ground-track}

The **ground track** is the curve on the Earth's surface directly beneath the satellite. Two motions produce it: the satellite's motion around its orbit and the Earth's rotation beneath it. For a circular orbit with ascending node at longitude $\lambda_0$ at $t = 0$, the latitude is given by [[#eq-declination]] with $u = nt$, and the longitude by
$$
\lambda = \lambda_0 + \operatorname{atan2}(\cos i\sin u,\ \cos u) - \omega_E\,t,
$$ {#eq-ground-track}
where $\omega_E = 7.2921\times10^{-5}\ \mathrm{rad/s}$ is the Earth's sidereal rotation rate. The first term is the right ascension of the satellite measured from the node (spherical trigonometry on the right triangle formed by the node, the satellite and the foot of its meridian); the second converts right ascension to Earth-fixed longitude.

On each revolution the Earth turns by $\omega_E T$ underneath, so successive equator crossings move **westward** by
$$
\Delta\lambda = \omega_E T = 360^\circ \times \frac{T}{86\,164\ \mathrm{s}}.
$$ {#eq-shift}
If an integer number $k$ of orbits fits into one sidereal day, $kT = 86\,164\ \mathrm{s}$, the ground track repeats every day — a **repeat ground track**, valuable for Earth observation (the same scene is revisited under the same geometry) and for geostationary ($k = 1$, $i = 0$) and Molniya ($k = 2$) orbits. In reality the Earth's oblateness also moves the node ([[orbital-mechanics/perturbations]]), so practical repeat orbits are designed with the nodal period and the nodal drift included.

::: widget parametric
fx: mod(atan2(cos(i)*sin(t), cos(t)) - k*t + pi, tau) - pi + 0*sqrt(3.1 - abs(mod(atan2(cos(i)*sin(t), cos(t)) - k*t + pi, tau) - pi))
fy: asin(sin(i)*sin(t))
t: 0, 6*pi
x: -pi, pi
y: -pi/2, pi/2
sliders: i=0.9006:0:3.1416:0.0001; k=0.0644:0.06:1:0.0001
trace: false
equal: true
caption: Ground track of three revolutions of a circular orbit, longitude ($x$) and latitude ($y$) in radians, with the ascending node at longitude $0$ at the start, drawn from [[#eq-declination]] and [[#eq-ground-track]]. The slider $i$ is the inclination in radians ($0.9006 = 51.6^\circ$) and $k = \omega_E/n = T/(86\,164\ \mathrm{s})$ is the period as a fraction of a sidereal day ($k = 0.0644$ is the $400\ \mathrm{km}$ orbit). Each pass is shifted west by $2\pi k$ ($23^\circ$ here), and the track never goes beyond latitude $\pm i$. Set $i$ above $\pi/2$ to see a retrograde track; set $k = 0.0667$ for the 15-orbit repeat of [[#ex-ground-track]], where the third pass is exactly $48^\circ$ west of the first; and set $k = 1$ (geosynchronous) to see the track shrink to a figure-eight around one longitude. Small gaps at $\pm\pi$ are where the track wraps around the map.
:::

::: example Ground-track shift and a repeating orbit {#ex-ground-track}
(a) By how much does the ground track of a circular orbit at $400\ \mathrm{km}$ altitude shift per orbit, in degrees and in kilometres along the equator? (b) What altitude gives a ground track that repeats after exactly 15 orbits per sidereal day, neglecting oblateness?
::: solution
(a) $T = 5553\ \mathrm{s}$ (from [[orbital-mechanics/two-body-problem]]), so $\Delta\lambda = 360^\circ \times 5553/86\,164 = 23.20^\circ$, or $0.4050\ \mathrm{rad} \times 6378\ \mathrm{km} = 2583\ \mathrm{km}$ along the equator.

(b) $T = 86\,164/15 = 5744.3\ \mathrm{s}$, so $a = \left[\mu (T/2\pi)^2\right]^{1/3} = 6932\ \mathrm{km}$, altitude $554\ \mathrm{km}$. The shift is then exactly $24^\circ$ and fifteen passes cover the $360^\circ$ of longitude before the track repeats.

*Check:* a sensor that must see the whole equator from this orbit in one day needs a swath of at least $2583\ \mathrm{km}$ on each pass — about the swath of wide-field weather imagers, while high-resolution imagers with swaths of tens of kilometres need many days to fill the gaps.
:::
:::

::: quiz
A satellite's state vector gives $\mathbf{h} = (0,\ -40\,000,\ -30\,000)\ \mathrm{km^2/s}$. Which statements are true?
- [x] The orbit is retrograde.
- [x] The ascending node is in the direction of the vernal equinox ($\Omega = 0$).
- [ ] The inclination is $36.9^\circ$.
- [ ] The satellite moves eastward over the equator.
::: solution
$\cos i = h_Z/h = -30\,000/50\,000 = -0.6$, so $i = 126.9^\circ$: retrograde, moving westward at the equator. $\mathbf{N} = \mathbf{K}\times\mathbf{h} = (-h_Y,\ h_X,\ 0) = (40\,000,\ 0,\ 0)$ points along $\mathbf{I}$, so $\Omega = 0$. The value $36.9^\circ$ is what you get by forgetting the sign of $h_Z$.
:::
:::

::: history
The need to tie a reference frame to a date is ancient: Hipparchus, in the second century BC, compared his star positions with older observations and discovered the slow westward drift of the equinoxes along the ecliptic — the precession that makes "the" vernal equinox move by about $1^\circ$ every 72 years. For most of the twentieth century astronomers used frames defined by fundamental star catalogues tied to the equinox of a standard epoch, such as the FK5 catalogue for the epoch J2000.0. In 1997 the International Astronomical Union adopted the International Celestial Reference System, realised by the radio positions of extragalactic sources measured by very long baseline interferometry, with effect from 1 January 1998; its axes are aligned with the J2000.0 equator and equinox to within a few hundredths of an arcsecond, so the geocentric equatorial frame of this chapter is in effect the modern standard.
:::

## Where this leads {#sec-next}

With the elements in hand, an orbit can be propagated by advancing only the mean anomaly and converting back to a state vector whenever a position is needed. [[orbital-mechanics/orbit-determination]] runs the problem in reverse — finding the elements from observations — and [[orbital-mechanics/orbital-manoeuvres]] changes them deliberately. The slow drift of $\Omega$ and $\omega$ under the Earth's oblateness, which turns the fixed elements of this chapter into slowly varying ones, is the main subject of [[orbital-mechanics/perturbations]].

::: summary
- Earth orbits are described in the geocentric equatorial frame ($X$ to the vernal equinox, $Z$ to the north pole), tied in practice to the J2000.0 epoch; the perifocal frame ($x$ to periapsis, $z$ along $\mathbf{h}$) is natural for the orbit itself.
- Six classical elements: $h$ or $a$ (size), $e$ (shape), $i$ and $\Omega$ (plane), $\omega$ (apse line), $\theta$ or $M$ (position); only the last changes in the two-body problem.
- State vector to elements uses $\mathbf{h} = \mathbf{r}\times\mathbf{v}$, $\mathbf{N} = \mathbf{K}\times\mathbf{h}$ and $\mathbf{e}$, with quadrant tests on $N_Y$, $e_Z$ and $v_r$.
- Elements to state vector: perifocal $\mathbf{r}, \mathbf{v}$ rotated by $\mathbf{Q} = \mathbf{R}_3(-\Omega)\mathbf{R}_1(-i)\mathbf{R}_3(-\omega)$.
- $\sin\delta = \sin i\sin u$: the latitude never exceeds the inclination (or its supplement); $\cos i = \cos\phi\sin A$: a launch site cannot directly reach an inclination below its latitude.
- Circular and equatorial orbits use $u = \omega + \theta$, $\varpi = \Omega + \omega$ or $\ell = \Omega + \omega + \theta$.
- Ground tracks shift west by $360^\circ\,T/86\,164\ \mathrm{s}$ per orbit and repeat when an integer number of orbits fits a sidereal day.
:::

## Exercises

::: exercise Inclination from angular momentum {level=1 check="42.0"}
A satellite has $\mathbf{h} = (-20\,000,\ 30\,000,\ 40\,000)\ \mathrm{km^2/s}$. Find its inclination. (Enter $i$ in degrees to three significant figures.)
::: solution
$h = \sqrt{20\,000^2 + 30\,000^2 + 40\,000^2} = 53\,852\ \mathrm{km^2/s}$, $i = \arccos(40\,000/53\,852) = 42.0^\circ$. Prograde, since $h_Z > 0$.
:::
:::

::: exercise Right ascension of the node {level=1 check="233.1"}
The node vector of an orbit is $\mathbf{N} = (-3,\ -4,\ 0)\times10^4\ \mathrm{km^2/s}$. Find $\Omega$. (Enter it in degrees to four significant figures.)
::: solution
$\arccos(N_X/N) = \arccos(-0.6) = 126.87^\circ$, but $N_Y < 0$, so $\Omega = 360^\circ - 126.87^\circ = 233.1^\circ$. The node lies in the third quadrant of the equatorial plane, as the signs of both components say.
:::
:::

::: exercise Ground-track shift {level=1 check="25.1"}
A satellite has an orbital period of $100.0\ \mathrm{min}$. By how many degrees of longitude does its ground track shift per orbit? (Enter the westward shift in degrees to three significant figures.)
::: solution
$\Delta\lambda = 360^\circ \times 6000/86\,164 = 25.1^\circ$ west.
:::
:::

::: exercise Argument of periapsis from a state vector {level=2 check="200.0"}
A satellite is at $\mathbf{r} = (-1141,\ -8674,\ 1518)\ \mathrm{km}$ with $\mathbf{v} = (6.546,\ -0.315,\ -3.690)\ \mathrm{km/s}$. Find $e$, $i$, $\Omega$, $\omega$ and $\theta$. (Enter $\omega$ in degrees to four significant figures.)
::: solution
$r = 8879.4\ \mathrm{km}$, $v = 7.521\ \mathrm{km/s}$, $v_r = -1.164\ \mathrm{km/s}$ (approaching periapsis). $\mathbf{h} = (32\,485,\ 5727,\ 57\,139)$, $h = 65\,977\ \mathrm{km^2/s}$, $i = \arccos(57\,139/65\,977) = 30.0^\circ$. $\mathbf{N} = (-5727,\ 32\,485,\ 0)$, $N_Y > 0$, $\Omega = \arccos(-5727/32\,986) = 100.0^\circ$. $\mathbf{e} = (0.1364,\ -0.2622,\ -0.0512)$, $e = 0.300$. $e_Z < 0$, so $\omega = 360^\circ - \arccos(\mathbf{N}\cdot\mathbf{e}/Ne) = 360^\circ - 160.0^\circ = 200.0^\circ$. $v_r < 0$, so $\theta = 360^\circ - 40.0^\circ = 320.0^\circ$, and $a = 12\,001\ \mathrm{km}$. Both quadrant corrections were needed; without them you would get $\omega = 160^\circ$ and $\theta = 40^\circ$, a position on the opposite side of the apse line.
:::
:::

::: exercise Latitude from the elements {level=2 check="44.4"}
A sun-synchronous satellite has $i = 98.0^\circ$, $\omega = 90^\circ$ and is at $\theta = 45^\circ$. What is its geocentric latitude? (Enter the latitude in degrees to three significant figures.)
::: solution
$u = \omega + \theta = 135^\circ$, $\sin\delta = \sin 98^\circ\sin 135^\circ = 0.9903 \times 0.7071 = 0.7002$, $\delta = 44.4^\circ\,\mathrm{N}$. The satellite is past the northernmost point of its orbit ($u = 90^\circ$, latitude $82^\circ\,\mathrm{N}$, i.e. $180^\circ - 98^\circ$) and heading south.
:::
:::

::: exercise A fourteen-orbit repeat {level=2 check="881"}
Neglecting oblateness, at what altitude does a circular orbit make exactly 14 revolutions per sidereal day? (Enter the altitude in km to the nearest kilometre.)
::: solution
$T = 86\,164/14 = 6154.6\ \mathrm{s}$, $a = \left[398\,600 \times (6154.6/2\pi)^2\right]^{1/3} = 7258.7\ \mathrm{km}$, altitude $881\ \mathrm{km}$. (With oblateness included the answer shifts by some kilometres, because the node and the argument of latitude drift; see [[orbital-mechanics/perturbations]].)
:::
:::

::: exercise The price of a retrograde orbit {level=3 check="0.817"}
Using [[#prop-azimuth]], show that from a site at latitude $\phi$ the orbits of inclination $i$ and $180^\circ - i$ require mirror-image azimuths. Then, for a site at $28.5^\circ\,\mathrm{N}$, compare the rotational speed gained by a launch due east ($i = 28.5^\circ$) with the speed lost by a launch due west ($i = 151.5^\circ$). How much more velocity must the westward launch supply? Take the equatorial rotation speed as $0.4651\ \mathrm{km/s}$. (Enter the difference in km/s to three significant figures.)
::: solution
$\cos(180^\circ - i) = -\cos i$, so $\sin A' = -\sin A$, i.e. $A' = -A$ (or $180^\circ + A$): the azimuth is reflected to the west. The surface speed at $28.5^\circ$ is $0.4651\cos 28.5^\circ = 0.4087\ \mathrm{km/s}$. Eastward, the vehicle starts with $+0.4087\ \mathrm{km/s}$ along its path; westward, with $-0.4087$. The westward launch must supply $2 \times 0.4087 = 0.817\ \mathrm{km/s}$ more — about $10\,\%$ of the orbital speed — which is why retrograde orbits are launched only when the mission requires them. Sun-synchronous orbits, near $i = 98^\circ$, are only slightly retrograde: they are launched almost due south (or north), and lose only a small component of the Earth's rotation.
:::
:::

::: exercise Right ascension on the orbit {level=3}
(a) From the matrix $\mathbf{Q}$ show that the right ascension $\alpha$ of a spacecraft satisfies $\tan(\alpha - \Omega) = \cos i\tan u$, which is the basis of [[#eq-ground-track]]. (b) Show that for a polar orbit ($i = 90^\circ$) the right ascension is constant except for jumps of $180^\circ$ over the poles, and interpret the ground track. (c) Explain why a geosynchronous orbit with $i = 30^\circ$ and $e = 0$ traces a figure-eight centred on the equator, and find its latitude extent.
::: solution
(a) In perifocal coordinates $\mathbf{r} = r(\cos\theta, \sin\theta, 0)$; rotating first by $\omega$ about $\hat{\mathbf{w}}$ gives coordinates in the node frame, $r(\cos u, \sin u, 0)$, where the first axis is the node line. Then rotating by $-i$ about the node line and $-\Omega$ about $\mathbf{K}$: in the frame with first axis along the node and third along $\mathbf{K}$, $\mathbf{r} = r(\cos u,\ \cos i\sin u,\ \sin i\sin u)$. The azimuthal angle of this vector, measured from the node in the equatorial plane, is $\alpha - \Omega$, with $\tan(\alpha - \Omega) = \cos i\sin u/\cos u = \cos i\tan u$ (quadrant from the signs, i.e. $\operatorname{atan2}(\cos i\sin u, \cos u)$).

(b) With $\cos i = 0$, $\tan(\alpha - \Omega) = 0$, so $\alpha = \Omega$ for $-90^\circ < u < 90^\circ$ and $\alpha = \Omega + 180^\circ$ otherwise: the orbit lies in a meridian plane of inertial space. Over the rotating Earth the track is a sequence of nearly north–south lines, each displaced west by $\omega_E T$, so a polar orbiter eventually sees the entire globe.

(c) With $T$ equal to the sidereal day, the mean motion equals $\omega_E$. The longitude relative to the node is $\operatorname{atan2}(\cos i\sin u, \cos u) - u$, which is zero at $u = 0, 90^\circ, 180^\circ, 270^\circ$ and oscillates in between (to a maximum of about $\pm 4.1^\circ$ for $i = 30^\circ$) — twice per day, giving two lobes. The latitude oscillates once per day between $\pm 30^\circ$. Two longitude oscillations per one latitude oscillation produce the figure-eight, spanning $\pm 30^\circ$ in latitude.
:::
:::
