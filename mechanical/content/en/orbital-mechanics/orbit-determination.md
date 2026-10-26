The previous chapters assumed that we know an orbit and asked where the spacecraft will be. In practice the question is usually the reverse. A radar paints a newly launched object, a telescope records a streak against the stars, a ground station measures the range and Doppler shift of a probe's radio signal — and from such fragments the orbit must be reconstructed. That is **orbit determination**. It has two faces. **Initial orbit determination** finds *an* orbit from the minimum number of observations, with no prior knowledge: three position vectors (the Gibbs method), two positions and the time between them (Lambert's problem), or three pairs of angles (Gauss's method). **Orbit estimation** then refines that orbit from many redundant, noisy observations by least squares, and tells us how uncertain the result is. Lambert's problem has a second life as the core of trajectory design — finding the transfer orbit that connects two points in a given time — and we shall use it again in [[orbital-mechanics/interplanetary-trajectories]].

This chapter uses the vectors and elements of [[orbital-mechanics/orbital-elements]], the universal-variable remark of [[orbital-mechanics/orbital-position-time]], and some linear algebra ([least squares](/learn/maths/lesson.php?c=linear-algebra&l=least-squares)).

## Observations from the ground {#sec-observations}

A tracking site measures quantities relative to itself, not to the Earth's centre. The natural frame is the local horizon.

::: definition Topocentric horizon frame, range, azimuth and elevation {#def-topocentric}
At an observing site, the **topocentric horizon frame** has unit vectors $\hat{\mathbf{e}}$ (east), $\hat{\mathbf{n}}$ (north) and $\hat{\mathbf{u}}$ (up, along the local vertical). The **slant range** $\rho$ is the distance from the site to the spacecraft; the **azimuth** $A$ is the angle of the line of sight measured clockwise from north in the horizontal plane; the **elevation** $El$ is its angle above the horizon. The unit line-of-sight vector is
$$
\hat{\boldsymbol{\rho}} = \cos El\,\sin A\,\hat{\mathbf{e}} + \cos El\,\cos A\,\hat{\mathbf{n}} + \sin El\,\hat{\mathbf{u}}.
$$
Radars measure $\rho$, $A$, $El$ and often the range rate $\dot\rho$; optical telescopes measure only directions (two angles), usually as topocentric right ascension and declination.
:::

To use an observation we need the site's own position in the inertial frame. For a spherical Earth of radius $R_E$, a site at geocentric latitude $\phi$ whose meridian is at right ascension $\theta_\mathrm{LST}$ (the **local sidereal time**, which increases by $360^\circ$ per sidereal day as the Earth turns) is at
$$
\mathbf{R} = R_E\left(\cos\phi\cos\theta_\mathrm{LST},\ \cos\phi\sin\theta_\mathrm{LST},\ \sin\phi\right),
$$ {#eq-site}
and its local unit vectors in equatorial components are
$$
\hat{\mathbf{u}} = \mathbf{R}/R_E, \qquad \hat{\mathbf{e}} = (-\sin\theta_\mathrm{LST},\ \cos\theta_\mathrm{LST},\ 0), \qquad \hat{\mathbf{n}} = (-\sin\phi\cos\theta_\mathrm{LST},\ -\sin\phi\sin\theta_\mathrm{LST},\ \cos\phi).
$$
The spacecraft is then at $\mathbf{r} = \mathbf{R} + \rho\,\hat{\boldsymbol{\rho}}$. Precise work replaces the sphere by the WGS 84 ellipsoid (the site's **geodetic** latitude, normal to the ellipsoid, differs from its geocentric latitude by up to $0.19^\circ$, which displaces the site by about $21\ \mathrm{km}$) and adds the site's height, polar motion and the precise Earth rotation angle; the logic is unchanged.

::: example A radar observation in the inertial frame {#ex-radar}
A radar at geocentric latitude $40^\circ\,\mathrm{N}$, at sea level, observes a satellite at range $1200\ \mathrm{km}$, azimuth $30^\circ$ and elevation $40^\circ$ when its local sidereal time is $60^\circ$. Find the satellite's position in the geocentric equatorial frame, its altitude, right ascension and declination. Use a spherical Earth.
::: solution
Site vector from [[#eq-site]]: $\mathbf{R} = 6378\,(\cos 40^\circ\cos 60^\circ,\ \cos 40^\circ\sin 60^\circ,\ \sin 40^\circ) = (2442.9,\ 4231.3,\ 4099.7)\ \mathrm{km}$.

Line of sight in local components: east $\cos 40^\circ\sin 30^\circ = 0.3830$, north $\cos 40^\circ\cos 30^\circ = 0.6634$, up $\sin 40^\circ = 0.6428$. With $\hat{\mathbf{e}} = (-0.8660,\ 0.5,\ 0)$, $\hat{\mathbf{n}} = (-0.3214,\ -0.5567,\ 0.7660)$ and $\hat{\mathbf{u}} = (0.3830,\ 0.6634,\ 0.6428)$,
$$
\hat{\boldsymbol{\rho}} = 0.3830\,\hat{\mathbf{e}} + 0.6634\,\hat{\mathbf{n}} + 0.6428\,\hat{\mathbf{u}} = (-0.2987,\ 0.2486,\ 0.9214).
$$
Then $\mathbf{r} = \mathbf{R} + 1200\,\hat{\boldsymbol{\rho}} = (2084.4,\ 4529.6,\ 5205.4)\ \mathrm{km}$, $r = 7208\ \mathrm{km}$, altitude $830\ \mathrm{km}$. Right ascension $\operatorname{atan2}(4529.6, 2084.4) = 65.3^\circ$, declination $\arcsin(5205.4/7208.2) = 46.2^\circ$.

*Check:* $\hat{\boldsymbol{\rho}}$ has unit length ($0.0892 + 0.0618 + 0.8490 = 1.000$). The satellite is north-north-east of a site at $40^\circ\,\mathrm{N}$, and its declination ($46^\circ$) is indeed a little north of the site's latitude, with right ascension a little east of the site's meridian at $60^\circ$.
:::
:::

## Three positions: the Gibbs method {#sec-gibbs}

Suppose three position vectors $\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3$ of the same satellite are known (from three radar fixes, say), at times that need not be known. Two-body motion is planar, so the three vectors must be **coplanar**, and a conic through three points with a known focus is determined. The Gibbs method finds it without solving any equation iteratively — purely by vector algebra.

::: theorem Gibbs's method {#thm-gibbs}
Let $\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3$ be three distinct coplanar position vectors on one two-body orbit, with magnitudes $r_1, r_2, r_3$, in the order of motion. Define
$$
\begin{aligned}
\mathbf{N} &= r_1\,(\mathbf{r}_2\times\mathbf{r}_3) + r_2\,(\mathbf{r}_3\times\mathbf{r}_1) + r_3\,(\mathbf{r}_1\times\mathbf{r}_2),\\
\mathbf{D} &= \mathbf{r}_1\times\mathbf{r}_2 + \mathbf{r}_2\times\mathbf{r}_3 + \mathbf{r}_3\times\mathbf{r}_1,\\
\mathbf{S} &= \mathbf{r}_1\,(r_2 - r_3) + \mathbf{r}_2\,(r_3 - r_1) + \mathbf{r}_3\,(r_1 - r_2).
\end{aligned}
$$
Then the semi-latus rectum is $p = N/D$, $\mathbf{D}$ is parallel to $\mathbf{h}$, $\mathbf{D}\times\mathbf{e} = \mathbf{S}$, and the velocity at any of the three points is
$$
\mathbf{v}_k = \sqrt{\frac{\mu}{ND}}\left(\frac{\mathbf{D}\times\mathbf{r}_k}{r_k} + \mathbf{S}\right).
$$ {#eq-gibbs}
:::

::: proof
All cross products $\mathbf{r}_j\times\mathbf{r}_k$ are parallel to the orbit normal $\hat{\mathbf{w}}$; write $\mathbf{r}_2\times\mathbf{r}_3 = A_1\hat{\mathbf{w}}$, $\mathbf{r}_3\times\mathbf{r}_1 = A_2\hat{\mathbf{w}}$, $\mathbf{r}_1\times\mathbf{r}_2 = A_3\hat{\mathbf{w}}$ (each $A$ is twice the area of a triangle, positive when the pair is in the order of motion and less than $180^\circ$ apart).

*Linear dependence.* For three coplanar vectors, $A_1\mathbf{r}_1 + A_2\mathbf{r}_2 + A_3\mathbf{r}_3 = \mathbf{0}$. Indeed, crossing the left side with $\mathbf{r}_1$ gives $A_2\,\mathbf{r}_1\times\mathbf{r}_2 + A_3\,\mathbf{r}_1\times\mathbf{r}_3 = (A_2A_3 - A_3A_2)\hat{\mathbf{w}} = \mathbf{0}$, and similarly with $\mathbf{r}_2$; a vector in the plane with zero cross product with two non-parallel vectors of the plane is zero.

*Semi-latus rectum.* The orbit equation in vector form is $\mathbf{r}\cdot\mathbf{e} = p - r$ ([[orbital-mechanics/two-body-problem]]). Dot the dependence relation with $\mathbf{e}$: $A_1(p - r_1) + A_2(p - r_2) + A_3(p - r_3) = 0$, so $p\,(A_1 + A_2 + A_3) = A_1r_1 + A_2r_2 + A_3r_3$. Multiplying by $\hat{\mathbf{w}}$, this says $p\,\mathbf{D} = \mathbf{N}$; both vectors are along $\hat{\mathbf{w}}$, so $p = N/D$ and $\mathbf{D}$ is parallel to $\mathbf{h}$ (for points in the order of motion and an orbit traversed less than once, $A_1+A_2+A_3 > 0$).

*Eccentricity.* Using $(\mathbf{a}\times\mathbf{b})\times\mathbf{e} = \mathbf{b}(\mathbf{a}\cdot\mathbf{e}) - \mathbf{a}(\mathbf{b}\cdot\mathbf{e})$ and $\mathbf{r}_k\cdot\mathbf{e} = p - r_k$,
$$
(\mathbf{r}_1\times\mathbf{r}_2)\times\mathbf{e} = \mathbf{r}_2(p - r_1) - \mathbf{r}_1(p - r_2) = p(\mathbf{r}_2 - \mathbf{r}_1) - r_1\mathbf{r}_2 + r_2\mathbf{r}_1.
$$
Summing the three cyclic terms, the $p$ terms cancel and the rest is $\mathbf{r}_1(r_2 - r_3) + \mathbf{r}_2(r_3 - r_1) + \mathbf{r}_3(r_1 - r_2) = \mathbf{S}$. So $\mathbf{D}\times\mathbf{e} = \mathbf{S}$, and since $\mathbf{e}$ lies in the plane, $\hat{\mathbf{w}}\times\mathbf{e} = \mathbf{S}/D$.

*Velocity.* From $\mu\mathbf{e} = \mathbf{v}\times\mathbf{h} - \mu\hat{\mathbf{r}}$ we get $\mathbf{v}\times\mathbf{h} = \mu(\mathbf{e} + \hat{\mathbf{r}})$; crossing with $\mathbf{h}$ from the left and using $\mathbf{h}\times(\mathbf{v}\times\mathbf{h}) = h^2\mathbf{v}$ (as $\mathbf{v}\perp\mathbf{h}$) gives $\mathbf{v} = (\mu/h)\,\hat{\mathbf{w}}\times(\mathbf{e} + \hat{\mathbf{r}})$. With $h = \sqrt{\mu p} = \sqrt{\mu N/D}$, $\hat{\mathbf{w}} = \mathbf{D}/D$ and $\hat{\mathbf{w}}\times\mathbf{e} = \mathbf{S}/D$:
$$
\mathbf{v} = \sqrt{\frac{\mu D}{N}}\left(\frac{\mathbf{S}}{D} + \frac{\mathbf{D}\times\mathbf{r}}{D\,r}\right) = \sqrt{\frac{\mu}{ND}}\left(\frac{\mathbf{D}\times\mathbf{r}}{r} + \mathbf{S}\right).
$$
The assumptions are exact two-body motion and exactly coplanar, distinct vectors.
:::

Measured vectors are never exactly coplanar. Before using them, compute the **coplanarity check** $\hat{\mathbf{r}}_1\cdot(\mathbf{r}_2\times\mathbf{r}_3)/\lVert\mathbf{r}_2\times\mathbf{r}_3\rVert$, the sine of the angle between $\mathbf{r}_1$ and the plane of the other two; it should be at the level of the measurement noise. The method also degrades when the vectors are close together: if they span only a degree or two, $\mathbf{N}$ and $\mathbf{D}$ are small differences of large numbers and errors are amplified. For closely spaced observations with known times, the **Herrick–Gibbs** variant, which uses a Taylor expansion of the motion instead, is preferred.

::: example Gibbs's method on three radar fixes {#ex-gibbs}
Three positions of a satellite (km) are
$$
\mathbf{r}_1 = (-461,\ 5751,\ 4373), \quad \mathbf{r}_2 = (-3926,\ 4216,\ 4711), \quad \mathbf{r}_3 = (-6618,\ 1454,\ 3833).
$$
Find the velocity at $\mathbf{r}_2$ and the orbital elements.
::: solution
Magnitudes: $r_1 = 7239.5$, $r_2 = 7441.9$, $r_3 = 7784.9\ \mathrm{km}$. Coplanarity: $\hat{\mathbf{r}}_1\cdot(\mathbf{r}_2\times\mathbf{r}_3)/\lVert\mathbf{r}_2\times\mathbf{r}_3\rVert = 1.3\times10^{-6}$, an angle of $0.3''$ — consistent with rounding to $1\ \mathrm{km}$.

The three vectors:
$$
\begin{aligned}
\mathbf{N} &= (1.8061,\ -3.1290,\ 4.3054)\times10^{10}, & N &= 5.6204\times10^{10}\ \mathrm{km^3},\\
\mathbf{D} &= (2.2813,\ -3.9522,\ 5.4381)\times10^{6}, & D &= 7.0991\times10^{6}\ \mathrm{km^2},\\
\mathbf{S} &= (-6.4343,\ 0.3267,\ 2.9366)\times10^{5}\ \mathrm{km^2}.
\end{aligned}
$$
So $p = N/D = 7917\ \mathrm{km}$ and $\sqrt{\mu/(ND)} = 9.995\times10^{-7}\ \mathrm{km^{-1}\,s^{-1}}$, which turns the bracket (in $\mathrm{km^2}$) into $\mathrm{km/s}$. From [[#eq-gibbs]],
$$
\mathbf{v}_2 = (-6.2230,\ -4.2782,\ -0.4987)\ \mathrm{km/s}, \qquad v_2 = 7.568\ \mathrm{km/s}.
$$
The state-to-elements algorithm of [[orbital-mechanics/orbital-elements]] then gives $a = 7997\ \mathrm{km}$, $e = 0.0997$, $i = 40.00^\circ$, $\Omega = 29.99^\circ$, $\omega = 49.8^\circ$, $\theta_2 = 50.2^\circ$.

*Check:* the positions were generated from $a = 8000\ \mathrm{km}$, $e = 0.1$, $i = 40^\circ$, $\Omega = 30^\circ$, $\omega = 50^\circ$ at $\theta = 20^\circ, 50^\circ, 80^\circ$ and rounded to $1\ \mathrm{km}$; the recovered velocity differs from the true one by $1.7\ \mathrm{m/s}$. The orientation angles are excellent; $\omega$ and $\theta$ individually are off by $0.2^\circ$ in opposite directions because for $e = 0.1$ the periapsis direction is only loosely constrained by three points $60^\circ$ apart, while their sum $u$ is fixed by the geometry.
:::
:::

## Two positions and a time: Lambert's problem {#sec-lambert}

**Lambert's problem**: given two position vectors $\mathbf{r}_1$ and $\mathbf{r}_2$ and the time of flight $\Delta t$ between them, find the orbit — equivalently the velocities $\mathbf{v}_1$ and $\mathbf{v}_2$. It arises whenever a spacecraft must be *at* a place at a time: a rendezvous, an interception of a planet, a transfer between two given points; and in orbit determination, when two timed position fixes are available.

The geometry of the problem is set by the **transfer angle** $\Delta\theta$ between $\mathbf{r}_1$ and $\mathbf{r}_2$ and the **chord** $c = \lVert\mathbf{r}_2 - \mathbf{r}_1\rVert$. Johann Heinrich Lambert showed in 1761 that the time to fly between the two points depends only on the semi-major axis $a$, the sum of the radii $r_1 + r_2$ and the chord $c$ — not on the eccentricity or the orientation of the conic. Fixing $\Delta t$ therefore fixes $a$ (for a given direction of motion and number of revolutions), and with it the orbit. Among all ellipses through the two points, the one of least energy has $a_m = s/2$, where $s = (r_1 + r_2 + c)/2$ is the semi-perimeter of the triangle formed by the focus and the two points.

The practical solution writes the time of flight with a single variable that works for every conic.

::: algorithm Lambert's problem by universal variables {#alg-lambert}
Given $\mathbf{r}_1$, $\mathbf{r}_2$, $\Delta t$, $\mu$ and the direction of motion (prograde here, less than one revolution):

1. $r_1 = \lVert\mathbf{r}_1\rVert$, $r_2 = \lVert\mathbf{r}_2\rVert$; $\Delta\theta = \arccos\!\big(\mathbf{r}_1\cdot\mathbf{r}_2/(r_1r_2)\big)$, replaced by $360^\circ - \Delta\theta$ if $(\mathbf{r}_1\times\mathbf{r}_2)_Z < 0$ (for a prograde transfer).
2. $A = \sin\Delta\theta\,\sqrt{r_1r_2/(1 - \cos\Delta\theta)}$.
3. With the Stumpff functions $C(z) = (1 - \cos\sqrt z)/z$ and $S(z) = (\sqrt z - \sin\sqrt z)/z^{3/2}$ (and their hyperbolic forms for $z < 0$, with $C(0) = \tfrac12$, $S(0) = \tfrac16$), define
$$
y(z) = r_1 + r_2 + A\,\frac{zS(z) - 1}{\sqrt{C(z)}}, \qquad
F(z) = \left(\frac{y(z)}{C(z)}\right)^{3/2}S(z) + A\sqrt{y(z)} - \sqrt\mu\,\Delta t.
$$
4. Solve $F(z) = 0$ by Newton's method (or bracket and bisect): $z > 0$ means an ellipse, $z = 0$ a parabola, $z < 0$ a hyperbola. Start where $y > 0$.
5. Lagrange coefficients: $f = 1 - y/r_1$, $g = A\sqrt{y/\mu}$, $\dot g = 1 - y/r_2$.
6. Velocities: $\mathbf{v}_1 = (\mathbf{r}_2 - f\,\mathbf{r}_1)/g$ and $\mathbf{v}_2 = (\dot g\,\mathbf{r}_2 - \mathbf{r}_1)/g$.

Step 6 uses the fact that in two-body motion every later position is a linear combination of the initial position and velocity, $\mathbf{r}_2 = f\mathbf{r}_1 + g\mathbf{v}_1$, with coefficients $f$, $g$ that depend only on the geometry; steps 3 and 5 express them in the universal variable. The derivation is long and given in full by Bate, Mueller and White and by Curtis. The method fails at $\Delta\theta = 180^\circ$, where $\mathbf{r}_1$ and $\mathbf{r}_2$ do not define a plane ($A = 0$).
:::

::: example Solving Lambert's problem {#ex-lambert}
A satellite is observed at $\mathbf{r}_1 = (-3395,\ 6837,\ 2460)\ \mathrm{km}$ and, $\Delta t = 2878\ \mathrm{s}$ later, at $\mathbf{r}_2 = (-5058,\ -9620,\ 1798)\ \mathrm{km}$. Assuming prograde motion of less than one revolution, find $\mathbf{v}_1$ and the orbit.
::: solution
1. $r_1 = 8020.1\ \mathrm{km}$, $r_2 = 11\,016.4\ \mathrm{km}$, $\mathbf{r}_1\cdot\mathbf{r}_2 = -4.4176\times10^{7}$, so $\cos\Delta\theta = -0.5000$ and $\Delta\theta = 120.0^\circ$; $(\mathbf{r}_1\times\mathbf{r}_2)_Z > 0$, so the prograde angle is $120.0^\circ$.
2. $A = \sin 120^\circ\sqrt{8020.1 \times 11\,016.4/1.5} = 6646.5\ \mathrm{km}$.
3–4. $F(z)$ is $-3.79\times10^{5}$ at $z = 2$ and $+2.80\times10^{5}$ at $z = 5$. Newton's method from $z_0 = 2$ gives $z_1 = 4.034$, $z_2 = 3.8468$, $z_3 = 3.84480$, $z_4 = 3.844796$. Since $z > 0$ the orbit is an ellipse. Then $C = 0.35898$, $S = 0.13741$ and $y = 13\,804\ \mathrm{km}$.
5. $f = 1 - 13\,804/8020.1 = -0.72116$, $g = 6646.5\sqrt{13\,804/398\,600} = 1236.9\ \mathrm{s}$, $\dot g = -0.25304$.
6. $\mathbf{v}_1 = (\mathbf{r}_2 - f\mathbf{r}_1)/g = (-6.0688,\ -3.7913,\ 2.8880)\ \mathrm{km/s}$, $v_1 = 7.717\ \mathrm{km/s}$; $\mathbf{v}_2 = (3.7796,\ -3.5596,\ -2.3567)\ \mathrm{km/s}$.

The elements from $(\mathbf{r}_1, \mathbf{v}_1)$ are $a = 10\,001\ \mathrm{km}$, $e = 0.2001$, $i = 28.50^\circ$, $\Omega = 80.00^\circ$, $\omega = 30.05^\circ$, $\theta_1 = 9.95^\circ$.

*Check:* the data were made from $a = 10\,000\ \mathrm{km}$, $e = 0.2$, $i = 28.5^\circ$, $\Omega = 80^\circ$, $\omega = 30^\circ$ with $\theta = 10^\circ \to 130^\circ$ and the flight time from Kepler's equation; the recovered $\mathbf{v}_1$ is within $1.4\ \mathrm{m/s}$ of the truth, the residue of rounding the inputs. Angular momentum is conserved between the two ends: $\lVert\mathbf{r}_1\times\mathbf{v}_1\rVert = \lVert\mathbf{r}_2\times\mathbf{v}_2\rVert = 61\,862\ \mathrm{km^2/s}$.
:::
:::

::: widget newton
f: (((19036.5 + 6646.47*(x*((sqrt(x) - sin(sqrt(x)))/x^1.5) - 1)/sqrt(((1 - cos(sqrt(x)))/x)))/((1 - cos(sqrt(x)))/x))^1.5*((sqrt(x) - sin(sqrt(x)))/x^1.5) + 6646.47*sqrt((19036.5 + 6646.47*(x*((sqrt(x) - sin(sqrt(x)))/x^1.5) - 1)/sqrt(((1 - cos(sqrt(x)))/x)))) - 1817018.9)/1000
x0: 2
x: 0.2, 6
steps: 5
caption: Newton's method on the Lambert time-of-flight function $F(z)/1000$ of [[#ex-lambert]] ($r_1 + r_2 = 19\,036.5\ \mathrm{km}$, $A = 6646.47\ \mathrm{km}$, $\sqrt\mu\,\Delta t = 1.817\times10^{6}\ \mathrm{km^{3/2}}$), written out with the elliptic Stumpff functions, valid for $0 < z < 4\pi^2$. From $z_0 = 2$ the iteration lands on $z = 3.8448$ in four steps. $F$ increases monotonically with $z$ — a longer flight time needs a larger $z$ — which is why Lambert's problem for less than one revolution has exactly one solution. Drag the starting point down to $z_0 = 0.5$: the first step is longer but the method still converges.
:::

::: warning Which way round, and how many times? {#warn-lambert}
Two positions and a time do not by themselves determine a unique orbit. The spacecraft can go from $\mathbf{r}_1$ to $\mathbf{r}_2$ the short way ($\Delta\theta < 180^\circ$) or the long way ($360^\circ - \Delta\theta$), in prograde or retrograde sense, and for long flight times it can also complete one or more full revolutions first, each case giving a different orbit (multi-revolution solutions come in pairs). [[#alg-lambert]] as written picks prograde, less than one revolution; feeding it an observation pair that was actually a retrograde or multi-revolution arc gives a perfectly converged, completely wrong orbit. Decide the direction from physics (most satellites are prograde; a sun-synchronous orbit is retrograde) and check the result — for instance, that the periapsis is above the atmosphere. Transfers near $\Delta\theta = 180^\circ$ are ill-conditioned: the plane of the orbit becomes undetermined and small errors in the positions swing it wildly.
:::

## Angles only: Gauss's method {#sec-gauss}

A telescope gives only directions. Three observations at times $t_1, t_2, t_3$ provide three unit vectors $\hat{\boldsymbol{\rho}}_k$ from known sites $\mathbf{R}_k$, so $\mathbf{r}_k = \mathbf{R}_k + \rho_k\hat{\boldsymbol{\rho}}_k$ with three unknown ranges. Gauss's method proceeds in four steps:

1. Write $\mathbf{r}_2$ in terms of $\mathbf{r}_1$ and $\mathbf{r}_3$ using the Lagrange coefficients: since $\mathbf{r}_1$ and $\mathbf{r}_3$ can each be written as $f\mathbf{r}_2 + g\mathbf{v}_2$, $\mathbf{r}_2 = c_1\mathbf{r}_1 + c_3\mathbf{r}_3$ with $c_1 \approx \frac{\tau_3}{\tau}\left(1 + \frac{\mu}{6r_2^3}(\tau^2 - \tau_3^2)\right)$ and similarly for $c_3$, where $\tau_1 = t_1 - t_2$, $\tau_3 = t_3 - t_2$, $\tau = \tau_3 - \tau_1$. These series in the time intervals are what makes the method approximate.
2. Substituting $\mathbf{r}_k = \mathbf{R}_k + \rho_k\hat{\boldsymbol{\rho}}_k$ and taking scalar triple products eliminates $\rho_1$ and $\rho_3$ and leaves $\rho_2$ as a function of $r_2$; the geometric identity $r_2^2 = R_2^2 + 2\rho_2\,\mathbf{R}_2\cdot\hat{\boldsymbol{\rho}}_2 + \rho_2^2$ then gives a single **eighth-degree polynomial** in $r_2$, whose physically sensible positive root is chosen.
3. With $r_2$ known, all three ranges and positions follow; the Gibbs method gives $\mathbf{v}_2$.
4. The truncated series of step 1 are replaced by exact Lagrange coefficients from the new orbit, and steps 2–3 are repeated until the ranges stop changing.

Gauss's method works best when the three observations span a modest arc — long enough that the orbit's curvature is visible against the measurement noise, short enough that the series in step 1 converge. Choosing between multiple positive roots of the eighth-degree polynomial is a classic difficulty; in practice the right root is the one that gives an orbit consistent with further observations.

## Many observations: least-squares estimation {#sec-least-squares}

Initial orbit determination uses exactly as many measurements as unknowns and so passes all their noise straight into the orbit. A tracking campaign produces hundreds or thousands of measurements, more than enough to *average* the noise down — if they are combined properly. That is the job of **least squares**, introduced for orbit computation by Legendre and Gauss.

Let $\mathbf{x}$ be the vector of $n$ unknowns (six orbital elements or state components, perhaps plus a drag coefficient), and let the $m > n$ measurements $\mathbf{y}$ be related to $\mathbf{x}$, after linearisation about a reference orbit, by
$$
\mathbf{y} = \mathbf{H}\mathbf{x} + \boldsymbol{\nu},
$$
where $\mathbf{H}$ is the $m\times n$ matrix of partial derivatives of the measurements with respect to the unknowns and $\boldsymbol{\nu}$ is the measurement noise, with weight matrix $\mathbf{W}$ (usually the inverse of the noise covariance).

::: proposition Weighted least-squares estimate {#prop-least-squares}
If $\mathbf{H}$ has full column rank, the estimate that minimises the weighted sum of squared residuals $J(\mathbf{x}) = (\mathbf{y} - \mathbf{H}\mathbf{x})^\mathsf{T}\mathbf{W}(\mathbf{y} - \mathbf{H}\mathbf{x})$ is the solution of the **normal equations**
$$
(\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H})\,\hat{\mathbf{x}} = \mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{y}.
$$ {#eq-normal}
If the noise has zero mean and covariance $\mathbf{W}^{-1}$, the estimate is unbiased and its covariance is $\mathbf{P} = (\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H})^{-1}$.
:::

::: proof
$J$ is a quadratic function of $\mathbf{x}$: $J = \mathbf{y}^\mathsf{T}\mathbf{W}\mathbf{y} - 2\mathbf{x}^\mathsf{T}\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{y} + \mathbf{x}^\mathsf{T}\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H}\mathbf{x}$ (with $\mathbf{W}$ symmetric). Its gradient is $\nabla J = -2\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{y} + 2\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H}\mathbf{x}$, zero at [[#eq-normal]]; the Hessian $2\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H}$ is positive definite when $\mathbf{W}$ is positive definite and $\mathbf{H}$ has full column rank, so the stationary point is the unique minimum. Writing $\hat{\mathbf{x}} = \mathbf{L}\mathbf{y}$ with $\mathbf{L} = \mathbf{P}\mathbf{H}^\mathsf{T}\mathbf{W}$, we have $\hat{\mathbf{x}} - \mathbf{x} = \mathbf{L}\boldsymbol{\nu}$ since $\mathbf{L}\mathbf{H} = \mathbf{I}$; its mean is zero and its covariance is $\mathbf{L}\mathbf{W}^{-1}\mathbf{L}^\mathsf{T} = \mathbf{P}\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{W}^{-1}\mathbf{W}\mathbf{H}\mathbf{P} = \mathbf{P}$.
:::

Because the measurement model of a real orbit is nonlinear, the batch estimator iterates: propagate a reference orbit, compute the residuals and $\mathbf{H}$ (using the state transition matrix of the orbit, the derivative of the present state with respect to the initial one), solve [[#eq-normal]] for a correction, update the reference, and repeat until the corrections are negligible — Gauss–Newton iteration, in modern language. The sequential version, which updates the estimate one measurement at a time, is the Kalman filter used on board spacecraft and in operations centres.

::: example Semi-major axis from a short arc {#ex-least-squares}
A satellite in a near-circular orbit is observed five times; each observation gives its argument of latitude $u$ with a standard error of $0.0004\ \mathrm{rad}$:

| $t$ (s) | 0 | 100 | 200 | 300 | 400 |
|---|---|---|---|---|---|
| $u$ (rad) | 0.5003 | 0.6074 | 0.7157 | 0.8238 | 0.9310 |

Fit $u = u_0 + nt$, and estimate the semi-major axis and its uncertainty.
::: solution
Unknowns $\mathbf{x} = (u_0, n)$, rows of $\mathbf{H}$ are $(1, t_k)$, equal weights. The normal equations:
$$
\begin{bmatrix} 5 & 1000\\ 1000 & 3.0\times10^{5}\end{bmatrix}\begin{bmatrix}u_0\\ n\end{bmatrix} = \begin{bmatrix} 3.5782\\ 823.42\end{bmatrix}
\quad\Longrightarrow\quad u_0 = 0.50008\ \mathrm{rad},\quad n = 1.0778\times10^{-3}\ \mathrm{rad/s}.
$$
For a circular orbit $n = \sqrt{\mu/a^3}$, so $a = (\mu/n^2)^{1/3} = 7000.9\ \mathrm{km}$.

Covariance: $\mathbf{P} = \sigma^2(\mathbf{H}^\mathsf{T}\mathbf{H})^{-1}$ gives $\sigma_n = 1.26\times10^{-6}\ \mathrm{rad/s}$. Differentiating $a = \mu^{1/3}n^{-2/3}$, $\sigma_a = \tfrac23 a\,\sigma_n/n = \tfrac23 \times 7001 \times 1.26\times10^{-6}/1.0778\times10^{-3} = 5.5\ \mathrm{km}$.

*Check:* the residuals $(0.22, -0.46, 0.06, 0.38, -0.20)\times10^{-3}\ \mathrm{rad}$ have an r.m.s. of $0.39\times10^{-3}$ (with $5 - 2 = 3$ degrees of freedom), consistent with the stated noise. The data were made with $a = 7000\ \mathrm{km}$; the error of $0.9\ \mathrm{km}$ is well inside $\sigma_a$. A $400\ \mathrm{s}$ arc pins the mean motion only to about one part in a thousand; the same accuracy of observation spread over a day would determine $a$ to tens of metres, because $\sigma_n$ falls as the arc length to the power $-3/2$. Long arcs, not many points, make good orbits.
:::
:::

::: quiz
Three position vectors of a satellite are measured with errors of about $100\ \mathrm{m}$. In which case is the Gibbs method most trustworthy?
- [x] The three vectors are about $40^\circ$ apart along the orbit.
- [ ] The three vectors are $0.5^\circ$ apart along the orbit.
- [ ] The three vectors are nearly $180^\circ$ apart in total, with the middle one close to the first.
- [ ] It makes no difference; Gibbs's method is exact.
::: solution
Gibbs's method is exact for exact data, but $\mathbf{N}$, $\mathbf{D}$ and $\mathbf{S}$ are built from differences and cross products of the vectors. When the vectors are $0.5^\circ$ apart, the cross products are tiny and $100\ \mathrm{m}$ errors are a large fraction of them, so the curvature of the orbit — the only information about the velocity — is buried in the noise. Well-spread vectors (tens of degrees apart, none nearly coincident or opposite) make the computation well conditioned. For closely spaced data with known times, the Herrick–Gibbs method is used instead.
:::
:::

::: history
On 1 January 1801 Giuseppe Piazzi at Palermo discovered a moving object, later named Ceres, and followed it for about six weeks before it disappeared into the glare of the Sun — only a few degrees of arc, too short for the methods of the day. Carl Friedrich Gauss, then 24, developed a new method for an orbit from three observations, and with his predicted positions Franz Xaver von Zach recovered Ceres on 31 December 1801 (Heinrich Olbers confirmed it on 1 January 1802). Gauss published the method, together with the method of least squares, in *Theoria motus corporum coelestium* (1809); Adrien-Marie Legendre had published least squares independently in 1805. Lambert's theorem on the time of flight between two points of a conic appeared in his *Insigniores orbitae cometarum proprietates* (1761). Josiah Willard Gibbs, the founder of vector analysis, gave his vector method for three position vectors in "On the determination of elliptic orbits from three complete observations" (*Memoirs of the National Academy of Sciences*, 1889).
:::

## Where this leads {#sec-next}

Lambert's algorithm is the engine of trajectory design: in [[orbital-mechanics/interplanetary-trajectories]] it connects the position of the Earth at departure with that of a planet at arrival, and scanning departure and arrival dates produces the "porkchop" contour plots of launch energy used to choose launch windows. In rendezvous ([[orbital-mechanics/relative-motion-rendezvous]]) the same problem, linearised, gives the two-impulse transfer. Least-squares estimation with the full force model of [[orbital-mechanics/perturbations]] is how every operational orbit — from GPS satellites to deep-space probes — is maintained.

::: summary
- Ground observations are made in the topocentric frame (range, azimuth, elevation); $\mathbf{r} = \mathbf{R}_\text{site} + \rho\hat{\boldsymbol{\rho}}$ converts them to inertial positions, with the site placed by its latitude and local sidereal time.
- Gibbs: three coplanar position vectors give $p = N/D$ and $\mathbf{v} = \sqrt{\mu/(ND)}\,(\mathbf{D}\times\mathbf{r}/r + \mathbf{S})$ with no iteration; check coplanarity and avoid closely spaced vectors.
- Lambert: two positions and a flight time determine the orbit (for a chosen direction and number of revolutions); the time depends only on $a$, $r_1 + r_2$ and the chord. Solve with universal variables and Newton's method, then $\mathbf{v}_1 = (\mathbf{r}_2 - f\mathbf{r}_1)/g$.
- Gauss's angles-only method reduces three directions to an eighth-degree polynomial for the middle radius, then refines.
- Least squares, $(\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H})\hat{\mathbf{x}} = \mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{y}$, combines many observations and gives the covariance $\mathbf{P} = (\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H})^{-1}$; long arcs determine the mean motion and hence $a$ far better than short ones.
:::

## Exercises

::: exercise Slant range at low elevation {level=1 check="2367"}
A satellite in a circular orbit at $800\ \mathrm{km}$ altitude is seen at an elevation of $10^\circ$. What is the slant range? Use a spherical Earth. (Enter $\rho$ in km to the nearest kilometre.)
::: solution
In the triangle formed by the Earth's centre, the site and the satellite, the angle at the site between the line of sight and the local vertical is $90^\circ + El$. The law of cosines, $r^2 = R^2 + \rho^2 + 2R\rho\sin El$, gives $\rho = \sqrt{r^2 - R^2\cos^2El} - R\sin El = \sqrt{7178^2 - (6378\cos 10^\circ)^2} - 6378\sin 10^\circ = 3474.4 - 1107.5 = 2367\ \mathrm{km}$ — three times the altitude, which is why low-elevation passes need more transmitter power.
:::
:::

::: exercise Position from a radar on the equator {level=1 check="554.3"}
A radar on the equator at local sidereal time $0^\circ$ sees a satellite due east ($A = 90^\circ$) at elevation $30^\circ$ and range $1000\ \mathrm{km}$. Find its position vector and altitude (spherical Earth). (Enter the altitude in km to four significant figures.)
::: solution
$\mathbf{R} = (6378, 0, 0)$, $\hat{\mathbf{e}} = (0, 1, 0)$, $\hat{\mathbf{u}} = (1, 0, 0)$. $\hat{\boldsymbol{\rho}} = \cos 30^\circ\,\hat{\mathbf{e}} + \sin 30^\circ\,\hat{\mathbf{u}} = (0.5, 0.8660, 0)$. $\mathbf{r} = (6878.0,\ 866.0,\ 0)\ \mathrm{km}$, $r = 6932.3\ \mathrm{km}$, altitude $554.3\ \mathrm{km}$.
:::
:::

::: exercise A Stumpff function {level=1 check="2/pi^2"}
Evaluate the Stumpff function $C(z) = (1 - \cos\sqrt z)/z$ at $z = \pi^2$, and confirm that $C(z) \to \tfrac12$ as $z \to 0$. (Enter the exact value of $C(\pi^2)$; an expression such as `2/pi^2` is accepted.)
::: solution
$C(\pi^2) = (1 - \cos\pi)/\pi^2 = 2/\pi^2 \approx 0.2026$. For small $z$, $\cos\sqrt z = 1 - z/2 + z^2/24 - \cdots$, so $C(z) = \tfrac12 - z/24 + \cdots \to \tfrac12$. In the universal formulation $z = \pi^2$ corresponds to a transfer through half of the eccentric anomaly range of a full revolution ($\Delta E = \pi$); $z = 4\pi^2$, where $C$ vanishes, is a full revolution.
:::
:::

::: exercise Gibbs on a circle {level=2 check="7.546"}
Apply the Gibbs formulas to three points of a circular equatorial orbit of radius $7000\ \mathrm{km}$ at true longitudes $0^\circ$, $30^\circ$ and $60^\circ$. Show that $\mathbf{S} = \mathbf{0}$, find $p$ and the speed. (Enter the speed in km/s to four significant figures.)
::: solution
All $r_k = 7000$, so every bracket in $\mathbf{S}$ vanishes: $\mathbf{S} = \mathbf{0}$, consistent with $\mathbf{D}\times\mathbf{e} = \mathbf{S}$ and $\mathbf{e} = \mathbf{0}$. The cross products are along $\mathbf{K}$ with magnitudes $7000^2\sin 30^\circ$, $7000^2\sin 30^\circ$ and, for $\mathbf{r}_3\times\mathbf{r}_1$, $7000^2\sin(-60^\circ)$. So $D = 7000^2(0.5 + 0.5 - 0.8660) = 6.5650\times10^{6}$ and $N = 7000\,D$, giving $p = 7000\ \mathrm{km}$. Then $\mathbf{v} = \sqrt{\mu/(ND)}\,\mathbf{D}\times\mathbf{r}/r$ has magnitude $\sqrt{\mu/(7000D^2)}\,D = \sqrt{\mu/7000} = 7.546\ \mathrm{km/s}$, the circular speed, directed along $\mathbf{K}\times\hat{\mathbf{r}}$ — prograde. (Note that $A_2 < 0$ here because $\mathbf{r}_3$ to $\mathbf{r}_1$ goes backwards; the sum is still positive.)
:::
:::

::: exercise The minimum-energy transfer {level=2 check="9163"}
Two points have $r_1 = 7000\ \mathrm{km}$, $r_2 = 14\,000\ \mathrm{km}$ and a transfer angle of $90^\circ$. Find the chord and the semi-major axis of the minimum-energy transfer orbit between them. (Enter $a_m$ in km to the nearest kilometre.)
::: solution
$c = \sqrt{r_1^2 + r_2^2 - 2r_1r_2\cos 90^\circ} = \sqrt{7000^2 + 14\,000^2} = 15\,652\ \mathrm{km}$. $s = (7000 + 14\,000 + 15\,652)/2 = 18\,326\ \mathrm{km}$, $a_m = s/2 = 9163\ \mathrm{km}$. Any shorter flight time than the minimum-energy one requires a larger $a$ (more energy), and so does any longer one on the same branch.
:::
:::

::: exercise Mean motion from three observations {level=2 check="7359"}
A satellite in a circular orbit is observed at argument of latitude $1.00$, $1.07$ and $1.12\ \mathrm{rad}$ at $t = 0$, $60$ and $120\ \mathrm{s}$. Fit $u = u_0 + nt$ by least squares and find the semi-major axis. (Enter $a$ in km to the nearest kilometre.)
::: solution
With $\bar t = 60\ \mathrm{s}$, $\bar u = 1.0633$: $n = \sum(t_k - \bar t)(u_k - \bar u)/\sum(t_k - \bar t)^2 = \big[(-60)(-0.0633) + 0 + 60(0.0567)\big]/7200 = 7.20/7200 = 1.000\times10^{-3}\ \mathrm{rad/s}$. Then $a = (\mu/n^2)^{1/3} = (3.986\times10^{11})^{1/3} = 7359\ \mathrm{km}$. With only three points over $2\ \mathrm{min}$ this would be very uncertain in practice; the exercise illustrates the arithmetic of the normal equations, which for a straight line reduce to this familiar slope formula.
:::
:::

::: exercise How well is the orbit size known? {level=3 check="43.3"}
Show that for a circular orbit an error $\sigma_n$ in the mean motion produces an error $\sigma_a = \tfrac23(a/n)\,\sigma_n$ in the semi-major axis. A tracking network determines the mean motion of a satellite at $a = 7000\ \mathrm{km}$ to $\sigma_n = 1.0\times10^{-8}\ \mathrm{rad/s}$. What is $\sigma_a$? (Enter $\sigma_a$ in metres to three significant figures.)
::: solution
$a = \mu^{1/3}n^{-2/3}$, so $\mathrm{d}a/\mathrm{d}n = -\tfrac23\mu^{1/3}n^{-5/3} = -\tfrac23 a/n$, and to first order $\sigma_a = \tfrac23(a/n)\sigma_n$. With $n = \sqrt{\mu/a^3} = 1.0780\times10^{-3}\ \mathrm{rad/s}$: $\sigma_a = \tfrac23 \times 7000 \times 10^{-8}/1.0780\times10^{-3} = 0.0433\ \mathrm{km} = 43.3\ \mathrm{m}$. The along-track consequence is far larger: the error in $n$ accumulates into an along-track position error $a\,\sigma_n t = 7000 \times 10^{-8} \times 86\,400 \approx 6\ \mathrm{km}$ after one day, which is why along-track errors dominate orbit predictions.
:::
:::

::: exercise Why Lambert fails at 180° {level=3}
(a) Show that when $\mathbf{r}_2 = -k\mathbf{r}_1$ ($k > 0$) the plane of the transfer orbit is not determined by the two position vectors. (b) Show that $A$ in [[#alg-lambert]] vanishes there, and explain what happens to $g$ and to $\mathbf{v}_1 = (\mathbf{r}_2 - f\mathbf{r}_1)/g$. (c) A Hohmann transfer has exactly $\Delta\theta = 180^\circ$; how do mission designers handle it?
::: solution
(a) The plane must contain the focus and both points; when the two vectors are antiparallel, every plane containing the line through them qualifies — a one-parameter family of orbits, all with the same size and shape, rotated about that line. (b) $A = \sin\Delta\theta\sqrt{r_1r_2/(1-\cos\Delta\theta)} = 0 \times \sqrt{r_1r_2/2} = 0$, so $g = A\sqrt{y/\mu} = 0$, while $\mathbf{r}_2 - f\mathbf{r}_1$ is also zero (since $\mathbf{r}_2$ is parallel to $\mathbf{r}_1$ and $f = -r_2/r_1$ there): $\mathbf{v}_1$ is $0/0$, reflecting the lost information. Near $180^\circ$ the computation is ill-conditioned and the solution's plane swings with tiny changes in the data. (c) For a planar Hohmann transfer the plane is known in advance (that of the initial orbit), so the velocities are computed from the vis-viva equation directly, not from Lambert. For interplanetary transfers, where the planets' orbits are not coplanar, designers avoid transfer angles close to $180^\circ$ (the large out-of-plane component makes them expensive), or use a broken-plane transfer with a mid-course plane change.
:::
:::

::: exercise Design: planning a tracking pass {level=3}
A new satellite in a roughly $800\ \mathrm{km}$ circular orbit will pass over a single radar that can measure range to $20\ \mathrm{m}$ and angles to $0.02^\circ$ above $10^\circ$ elevation. (a) Estimate the longest pass duration and the arc of orbit covered. (b) Estimate the position error implied by the angle noise at the closest and the farthest points. (c) Propose an observation plan for initial orbit determination by the Gibbs method and for subsequent refinement by least squares, and say which orbital quantity will be worst determined and why.
::: solution
(a) From exercise 1, the satellite is visible out to an Earth-central angle $\lambda$ with $\cos(\lambda + El) = (R/r)\cos El$: $\lambda + 10^\circ = \arccos(0.8886 \times 0.9848) = 28.95^\circ$, so $\lambda = 18.95^\circ$ (law of sines in the same triangle). An overhead pass covers $2\lambda = 37.9^\circ$ of orbit, which at $n = 360^\circ/6052\ \mathrm{s}$ takes about $637\ \mathrm{s}$ ($10.6\ \mathrm{min}$).
(b) $0.02^\circ = 3.5\times10^{-4}\ \mathrm{rad}$: at $800\ \mathrm{km}$ range (overhead) the cross-range error is $280\ \mathrm{m}$; at $2367\ \mathrm{km}$ it is $830\ \mathrm{m}$ — much larger than the $20\ \mathrm{m}$ range error.
(c) For Gibbs, take three fixes spread across the pass (start, middle, end, about $19^\circ$ apart), so that the cross products are not tiny; expect velocity errors of order metres per second from the $\sim 300\text{–}800\ \mathrm{m}$ angle errors. Then refine by least squares using all range and angle samples (say one per second), weighting range much more heavily. The worst-determined quantity will be the along-track component (equivalently the mean motion and $a$), because a $10\ \mathrm{min}$ arc constrains the period weakly — as [[#ex-least-squares]] showed — and the next pass, an orbit or more later, will bring the biggest improvement. Out-of-plane accuracy depends on the pass geometry: a pass far from overhead constrains the plane better through angle data.
:::
:::
