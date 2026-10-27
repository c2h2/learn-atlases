Two bodies attract each other with a force along the line joining them, whose size depends only on their separation. The Sun and a planet, the Earth and the Moon, a proton and an electron in Bohr's model, an alpha particle and a gold nucleus: all of them are this problem. It has six degrees of freedom, and yet it can be solved completely, by hand, for any force law. The reason is that its symmetries supply enough conserved quantities to reduce it to a single one-dimensional motion, which energy conservation then integrates.

This chapter carries out that reduction with the tools of [[analytical-mechanics/lagrangian]]. Translation invariance separates off the centre of mass. Rotational invariance confines the motion to a plane and conserves angular momentum, which turns the angular motion into a known function of the radius. What remains is a particle moving on a line in an **effective potential**. For the inverse-square force we then derive Kepler's three laws, not as observations but as theorems, and we see why the inverse square is special: among power laws, only it and Hooke's law make every bounded orbit close on itself.

The gravitational facts of [[mechanics/gravitation]] are assumed, as is polar-coordinate kinematics. We write $U(r)$ for the potential energy, so that the force on body 2 due to body 1 is $\mathbf{F} = -U'(r)\,\hat{\mathbf{r}}$ with $\mathbf{r} = \mathbf{r}_2 - \mathbf{r}_1$. Throughout, $G = 6.67430\times 10^{-11}\,\mathrm{N\,m^2/kg^2}$ and, for the Earth, $GM_\oplus = 3.986\times 10^{14}\,\mathrm{m^3/s^2}$.

## Reduction to a one-body problem {#reduction}

Let the bodies have masses $m_1$ and $m_2$ and positions $\mathbf{r}_1$ and $\mathbf{r}_2$, interacting through a potential energy $U(\abs{\mathbf{r}_2 - \mathbf{r}_1})$ and subject to no external forces. Introduce the centre of mass and the relative position,

$$
\mathbf{R} = \frac{m_1\mathbf{r}_1 + m_2\mathbf{r}_2}{m_1 + m_2}, \qquad \mathbf{r} = \mathbf{r}_2 - \mathbf{r}_1.
$$

Solving, $\mathbf{r}_1 = \mathbf{R} - (m_2/M)\mathbf{r}$ and $\mathbf{r}_2 = \mathbf{R} + (m_1/M)\mathbf{r}$, with $M = m_1 + m_2$.

::: definition Reduced mass {#def-reduced-mass}
The **reduced mass** of two bodies of masses $m_1$ and $m_2$ is

$$
\mu = \frac{m_1 m_2}{m_1 + m_2}, \qquad\text{equivalently}\qquad \frac{1}{\mu} = \frac{1}{m_1} + \frac{1}{m_2}.
$$
:::

The reduced mass is smaller than either mass. When one body is much heavier, $\mu$ is close to the lighter mass: for the hydrogen atom $\mu$ is $0.99946$ of the electron mass.

::: proposition Separation of the two-body Lagrangian {#prop-separation}
In terms of $\mathbf{R}$ and $\mathbf{r}$ the Lagrangian of the two bodies is

$$
L = \tfrac12 M\dot{\mathbf{R}}^2 + \tfrac12\mu\dot{\mathbf{r}}^2 - U(r).
$$ {#eq-two-body}

The centre of mass moves with constant velocity, and the relative coordinate moves like a single particle of mass $\mu$ in the fixed potential $U(r)$.
:::

::: proof
Substitute the expressions for $\dot{\mathbf{r}}_1$ and $\dot{\mathbf{r}}_2$ into the kinetic energy:

$$
\tfrac12 m_1\Bigl(\dot{\mathbf{R}} - \tfrac{m_2}{M}\dot{\mathbf{r}}\Bigr)^2 + \tfrac12 m_2\Bigl(\dot{\mathbf{R}} + \tfrac{m_1}{M}\dot{\mathbf{r}}\Bigr)^2
= \tfrac12 M\dot{\mathbf{R}}^2 + \bigl(-m_1m_2 + m_2m_1\bigr)\frac{\dot{\mathbf{R}}\cdot\dot{\mathbf{r}}}{M} + \tfrac12\frac{m_1m_2^2 + m_2m_1^2}{M^2}\dot{\mathbf{r}}^2.
$$

The cross term vanishes, and the last coefficient is $m_1m_2(m_1 + m_2)/M^2 = \mu$. The potential depends only on $r = \abs{\mathbf{r}}$. The coordinates $\mathbf{R}$ are cyclic, so $M\dot{\mathbf{R}}$ is conserved, and the Lagrange equations for $\mathbf{r}$ are those of a particle of mass $\mu$ with potential energy $U(r)$.
:::

In the centre-of-mass frame, $\dot{\mathbf{R}} = 0$, both bodies move on similar orbits about the centre of mass, scaled by $m_2/M$ and $m_1/M$ and on opposite sides. The "orbit of the Moon" computed below is the orbit of $\mathbf{r}$, the Moon's position relative to the Earth.

::: example The Earth–Moon barycentre {#ex-barycentre}
The masses of the Earth and Moon are $5.972\times 10^{24}\,\mathrm{kg}$ and $7.342\times 10^{22}\,\mathrm{kg}$, and their mean separation is $3.844\times 10^{8}\,\mathrm{m}$. Find the reduced mass as a fraction of the Moon's mass, and the distance of the centre of mass from the centre of the Earth.
::: solution
The reduced mass is

$$
\mu = \frac{(5.972\times 10^{24})(7.342\times 10^{22})}{5.972\times 10^{24} + 7.342\times 10^{22}} = 7.253\times 10^{22}\,\mathrm{kg},
$$

which is $0.988$ of the Moon's mass. Treating the Earth as fixed would be a $1.2\%$ error in the inertia of the relative motion, which is far too large for astronomy, though acceptable for a first estimate.

The centre of mass lies on the line joining the centres, at distance $r\,m_2/M$ from the Earth's centre:

$$
\frac{(3.844\times 10^{8})(7.342\times 10^{22})}{6.045\times 10^{24}} = 4.67\times 10^{6}\,\mathrm{m}.
$$

That is about $4670\,\mathrm{km}$, inside the Earth, whose radius is $6371\,\mathrm{km}$. The Earth's centre wobbles around this point once a month, which is why the Earth's position must be corrected by a few thousand kilometres in precise solar-system calculations.
:::
:::

## Angular momentum and the effective potential {#effective}

From now on we study a single particle of mass $\mu$ at position $\mathbf{r}$ in a potential $U(r)$.

The angular momentum $\boldsymbol{\ell} = \mathbf{r}\times\mu\dot{\mathbf{r}}$ is conserved, by the rotation case of [[analytical-mechanics/lagrangian#thm-noether]], or directly because the torque $\mathbf{r}\times\mathbf{F}$ vanishes for a force along $\mathbf{r}$. Both $\mathbf{r}$ and $\dot{\mathbf{r}}$ are perpendicular to the fixed vector $\boldsymbol{\ell}$, so the motion stays in the plane through the origin perpendicular to $\boldsymbol{\ell}$. (If $\boldsymbol{\ell} = 0$ the motion is along a line through the origin.) Use polar coordinates $(r, \theta)$ in that plane:

$$
L = \tfrac12\mu\bigl(\dot r^2 + r^2\dot\theta^2\bigr) - U(r).
$$ {#eq-polar-lagrangian}

The angle $\theta$ is cyclic, so its conjugate momentum is constant:

$$
\ell = \pdv{L}{\dot\theta} = \mu r^2\dot\theta.
$$ {#eq-ell}

::: theorem Kepler's second law {#thm-areas}
For motion under any central force, the radius vector sweeps out area at the constant rate

$$
\deriv{A}{t} = \frac{\ell}{2\mu}.
$$
:::

::: proof
In a time $\dd t$ the radius vector turns through $\dd\theta$ and sweeps a thin triangle of area $\frac12 r\cdot r\,\dd\theta$, to first order. Hence $\dd A/\dd t = \frac12 r^2\dot\theta = \ell/(2\mu)$, which is constant by [[#eq-ell]].
:::

The second law is therefore not specific to gravity. It holds for every central force and says nothing about the force law; it is angular-momentum conservation in geometric form.

The radial Lagrange equation from [[#eq-polar-lagrangian]] is $\mu\ddot r - \mu r\dot\theta^2 + U'(r) = 0$. Eliminating $\dot\theta$ with [[#eq-ell]],

$$
\mu\ddot r = -U'(r) + \frac{\ell^2}{\mu r^3} = -\deriv{}{r}\left(U(r) + \frac{\ell^2}{2\mu r^2}\right).
$$ {#eq-radial}

::: definition Effective potential {#def-effective}
For a particle of mass $\mu$ with angular momentum $\ell$ in the central potential $U(r)$, the **effective potential** is

$$
U_{\mathrm{eff}}(r) = U(r) + \frac{\ell^2}{2\mu r^2}.
$$ {#eq-ueff}

The radial motion obeys $\mu\ddot r = -U_{\mathrm{eff}}'(r)$ and conserves the energy

$$
E = \tfrac12\mu\dot r^2 + U_{\mathrm{eff}}(r).
$$ {#eq-radial-energy}
:::

The term $\ell^2/(2\mu r^2)$ is the kinetic energy of the angular motion, $\frac12\mu r^2\dot\theta^2$, rewritten with $\ell$ held fixed. It acts as a repulsive **centrifugal barrier** that keeps a particle with $\ell \ne 0$ away from the origin unless $U$ is more attractive than $-1/r^2$ there.

Energy conservation [[#eq-radial-energy]] makes the radial problem a one-dimensional problem of the kind met in [[mechanics/work-energy]]. The particle can only be where $U_{\mathrm{eff}}(r) \le E$. The **turning points**, or **apsides**, where $U_{\mathrm{eff}} = E$ and $\dot r = 0$, are the nearest and farthest distances. If the allowed region is an interval $[r_{\min}, r_{\max}]$ the orbit is bounded and oscillates between those radii while it turns; if it extends to infinity the orbit is unbounded. A **circular orbit** sits at a minimum or maximum of $U_{\mathrm{eff}}$.

::: widget plot
f: -1/x + l^2/(2*x^2); -1/x; l^2/(2*x^2)
x: 0.2, 6
y: -1.5, 1.5
sliders: l=1:0.3:1.5:0.01
labels: U_eff; U = -k/r; centrifugal barrier
caption: The effective potential for gravity, in units with $k = \mu = 1$, so $U_{\mathrm{eff}} = -1/r + l^2/(2r^2)$. The minimum sits at $r = l^2$, the radius of the circular orbit, where $U_{\mathrm{eff}} = -1/(2l^2)$. Choose an energy between that minimum and zero, a horizontal line, and read off the two turning points: that is a bound ellipse. An energy above zero meets the curve only once, an unbounded hyperbola. Increase $l$ and watch the barrier push the well outward and make it shallower.
:::

::: quiz
A particle in the potential $U = -k/r$ has angular momentum $\ell \neq 0$ and energy $E$ with $-\mu k^2/(2\ell^2) < E < 0$. Which description of its radial motion is correct?
- [ ] It falls into the centre, because the force is attractive and $E < 0$.
- [x] It oscillates between two turning points where $U_{\mathrm{eff}}(r) = E$, while $\theta$ keeps increasing.
- [ ] It moves on a circle, because $E < 0$.
- [ ] It escapes to infinity, because $E$ is above the minimum of $U_{\mathrm{eff}}$.
::: solution
The allowed region is where $U_{\mathrm{eff}}(r) \le E$. For $E$ between the minimum $-\mu k^2/(2\ell^2)$ and zero, this is an interval $[r_{\min}, r_{\max}]$ bounded on the inside by the centrifugal barrier and on the outside because $U_{\mathrm{eff}} \to 0 > E$ as $r \to \infty$. The radius oscillates between the two roots, and $\dot\theta = \ell/(\mu r^2)$ never vanishes, so the orbit is an ellipse. A circle needs $E$ exactly at the minimum; escape needs $E \ge 0$; reaching $r = 0$ needs $\ell = 0$.
:::
:::

### When is a circular orbit stable?

A circular orbit of radius $r_0$ has $U_{\mathrm{eff}}'(r_0) = 0$. It is stable to small radial disturbances if $U_{\mathrm{eff}}''(r_0) > 0$, and then the radius oscillates about $r_0$ with angular frequency $\omega_r = \sqrt{U_{\mathrm{eff}}''(r_0)/\mu}$.

::: proposition Stability of circular orbits for power laws {#prop-power-stable}
For an attractive power-law force of magnitude $f(r) = cr^n$ with $c > 0$, circular orbits exist at every radius and are stable if and only if $n > -3$.
:::

The proof is [[#exr-stable-power]]. For gravity, $n = -2$, every circular orbit is stable. For an attractive $1/r^4$ force, $n = -4$, a circular orbit is a maximum of $U_{\mathrm{eff}}$, and a nudge sends the particle spiralling in or out. The boundary case $n = -3$ is the $1/r^2$ potential, which has the same radial dependence as the centrifugal barrier, so the two compete on equal terms.

## The orbit equation {#orbit}

To find the shape of the orbit rather than $r(t)$, eliminate time in favour of the angle. Two substitutions make the equation linear for the inverse square law.

::: theorem The orbit equation {#thm-binet}
Let $F(r)$ be the radial component of a central force, $F = -U'(r)$, and let $u = 1/r$. Then, for $\ell \neq 0$, the orbit $u(\theta)$ satisfies

$$
\frac{\dd^2 u}{\dd\theta^2} + u = -\frac{\mu}{\ell^2u^2}\,F\!\left(\frac{1}{u}\right).
$$ {#eq-binet}
:::

::: proof
By [[#eq-ell]], $\dot\theta = \ell u^2/\mu$, so along the orbit $\dd/\dd t = (\ell u^2/\mu)\,\dd/\dd\theta$. Then

$$
\dot r = \deriv{}{t}\left(\frac1u\right) = -\frac{1}{u^2}\frac{\ell u^2}{\mu}\deriv{u}{\theta} = -\frac{\ell}{\mu}\deriv{u}{\theta}, \qquad \ddot r = \frac{\ell u^2}{\mu}\deriv{}{\theta}\left(-\frac{\ell}{\mu}\deriv{u}{\theta}\right) = -\frac{\ell^2u^2}{\mu^2}\frac{\dd^2u}{\dd\theta^2}.
$$

Substitute into the radial equation $\mu\ddot r - \ell^2/(\mu r^3) = F(r)$:

$$
-\frac{\ell^2u^2}{\mu}\frac{\dd^2u}{\dd\theta^2} - \frac{\ell^2u^3}{\mu} = F\!\left(\frac1u\right).
$$

Divide by $-\ell^2u^2/\mu$.
:::

The orbit equation can be run backwards: given an orbit, it tells you the force. Newton's original argument was of that kind, deducing the inverse square from Kepler's ellipses.

### The Kepler problem

Take $U(r) = -k/r$ with $k > 0$, so $F = -k/r^2 = -ku^2$. For gravity $k = Gm_1m_2$. The right-hand side of [[#eq-binet]] becomes the constant $\mu k/\ell^2$:

$$
\frac{\dd^2u}{\dd\theta^2} + u = \frac{\mu k}{\ell^2}.
$$

This is the equation of a harmonic oscillator in $\theta$ with a constant drive. Its general solution is a particular solution plus the homogeneous one, $u = \mu k/\ell^2 + C\cos(\theta - \theta_0)$. Choosing the axis so that $\theta_0 = 0$ and writing $C = e\mu k/\ell^2$ with $e \ge 0$ gives

$$
r(\theta) = \frac{p}{1 + e\cos\theta}, \qquad p = \frac{\ell^2}{\mu k}.
$$ {#eq-conic}

This is the polar equation of a **conic section** with one focus at the origin, **semi-latus rectum** $p$ and **eccentricity** $e$. The closest approach, the **pericentre** ($r_p = p/(1 + e)$ at $\theta = 0$), defines the axis.

::: theorem Kepler orbits {#thm-kepler}
In the potential $U = -k/r$ with $k > 0$, every orbit with $\ell \neq 0$ is a conic [[#eq-conic]] with a focus at the centre of force, and its eccentricity is fixed by the energy:

$$
e = \sqrt{1 + \frac{2E\ell^2}{\mu k^2}}.
$$ {#eq-ecc}

The orbit is a circle if $e = 0$ ($E = -\mu k^2/(2\ell^2)$, the minimum of $U_{\mathrm{eff}}$), an ellipse if $0 < e < 1$ ($E < 0$), a parabola if $e = 1$ ($E = 0$), and a hyperbola if $e > 1$ ($E > 0$). For an ellipse the semi-major axis is

$$
a = \frac{p}{1 - e^2} = -\frac{k}{2E}.
$$ {#eq-semi-major}
:::

::: proof
The shape [[#eq-conic]] was derived above. Evaluate the energy [[#eq-radial-energy]] at the pericentre, where $\dot r = 0$ and $1/r_p = (1 + e)/p$:

$$
E = \frac{\ell^2(1 + e)^2}{2\mu p^2} - \frac{k(1 + e)}{p} = \frac{k(1 + e)^2}{2p} - \frac{k(1 + e)}{p} = \frac{k(e^2 - 1)}{2p},
$$

using $\ell^2/\mu = kp$. Solving, $e^2 = 1 + 2Ep/k = 1 + 2E\ell^2/(\mu k^2)$, which is [[#eq-ecc]]. The classification follows from the sign of $E$. For $e < 1$ the pericentre and apocentre are $p/(1 + e)$ and $p/(1 - e)$, so the major axis is

$$
2a = \frac{p}{1 + e} + \frac{p}{1 - e} = \frac{2p}{1 - e^2}, \qquad a = \frac{p}{1 - e^2} = \frac{p}{-2Ep/k} = -\frac{k}{2E}.
$$
:::

Kepler's first law, that planets move on ellipses with the Sun at a focus, is the case $E < 0$. The semi-major axis depends only on the energy, not on the angular momentum: all orbits with the same energy have the same $a$, whether circular or very eccentric.

::: theorem Kepler's third law {#thm-third-law}
For an elliptic orbit in the potential $-k/r$, the period $\tau$ satisfies

$$
\tau^2 = \frac{4\pi^2\mu}{k}\,a^3.
$$ {#eq-third-law}

For two bodies under gravity, $k = Gm_1m_2$ and this is $\tau^2 = 4\pi^2a^3/\bigl(G(m_1 + m_2)\bigr)$.
:::

::: proof
By [[#thm-areas]] the area swept in one period is $\tau\ell/(2\mu)$, and it equals the area of the ellipse, $\pi ab$, where $b = a\sqrt{1 - e^2}$ is the semi-minor axis. So $\tau = 2\pi\mu ab/\ell$. Now $b^2 = a^2(1 - e^2) = ap$, using [[#eq-semi-major]], and $\ell^2 = \mu kp$. Squaring,

$$
\tau^2 = \frac{4\pi^2\mu^2a^2\cdot ap}{\mu kp} = \frac{4\pi^2\mu}{k}a^3.
$$

With $k = Gm_1m_2$, $\mu/k = 1/\bigl(G(m_1 + m_2)\bigr)$.
:::

Kepler stated the third law with the constant the same for every planet. The two-body result shows that the "constant" is $4\pi^2/(G(M_\odot + m))$, which depends very slightly on the planet's mass, a correction of about one part in a thousand for Jupiter.

::: example A satellite in an elliptic orbit {#ex-satellite}
A satellite of negligible mass orbits the Earth with perigee and apogee distances $7000\,\mathrm{km}$ and $12\,000\,\mathrm{km}$ from the Earth's centre. Find the semi-major axis, the eccentricity, the period, and the speeds at perigee and apogee. Take $GM_\oplus = 3.986\times 10^{14}\,\mathrm{m^3/s^2}$.
::: solution
The semi-major axis is the mean of the extreme distances, and the eccentricity follows from $r_p = a(1 - e)$ and $r_a = a(1 + e)$:

$$
a = \frac{r_p + r_a}{2} = 9500\,\mathrm{km}, \qquad e = \frac{r_a - r_p}{r_a + r_p} = \frac{5000}{19\,000} = 0.263.
$$

With the satellite's mass negligible, $\mu/k = 1/(GM_\oplus)$, and [[#eq-third-law]] gives

$$
\tau = 2\pi\sqrt{\frac{a^3}{GM_\oplus}} = 2\pi\sqrt{\frac{(9.500\times 10^{6})^3}{3.986\times 10^{14}}} = 9215\,\mathrm{s} = 153.6\,\mathrm{min}.
$$

For the speeds, combine $E = \frac12 v^2 - GM_\oplus/r$ per unit mass with $E = -GM_\oplus/(2a)$ from [[#eq-semi-major]]. That gives the **vis-viva equation** $v^2 = GM_\oplus(2/r - 1/a)$, and

$$
v_p = \sqrt{3.986\times 10^{14}\left(\frac{2}{7.0\times 10^{6}} - \frac{1}{9.5\times 10^{6}}\right)} = 8481\,\mathrm{m/s}, \qquad v_a = 4947\,\mathrm{m/s}.
$$

Check with Kepler's second law: at the apsides the velocity is perpendicular to the radius, so $\ell/\mu = r_pv_p = r_av_a$. Indeed $(7.0\times 10^6)(8481) = 5.937\times 10^{10}$ and $(1.2\times 10^7)(4947) = 5.937\times 10^{10}\,\mathrm{m^2/s}$, and $v_p/v_a = r_a/r_p = 12/7$.
:::
:::

::: widget orbit
GM: 1
r: 1
vt: 1.2
caption: The satellite of the worked example in scaled units: $GM = 1$ and the launch radius $r = 1$ is the perigee, with tangential speed $v_t = 1.2$. The circular speed at $r = 1$ is $1$ and the escape speed is $\sqrt 2 \approx 1.414$, so this orbit is an ellipse with $e = v_t^2 - 1 = 0.44$. Watch the satellite move fastest at perigee and slowest at apogee, sweeping equal areas in equal times. Raise $v_t$ past $1.414$ and the ellipse opens into a hyperbola; lower it below $1$ and the launch point becomes the apogee.
:::

::: example Halley's comet {#ex-halley}
Halley's comet has perihelion distance $0.586\,\mathrm{AU}$ and orbital eccentricity $0.967$. Find its semi-major axis, its aphelion distance and its period. Use the fact that the Earth, with $a = 1\,\mathrm{AU}$, has a period of one year.
::: solution
From $r_p = a(1 - e)$,

$$
a = \frac{0.586}{1 - 0.967} = \frac{0.586}{0.033} = 17.8\,\mathrm{AU}, \qquad r_a = a(1 + e) = 34.9\,\mathrm{AU},
$$

beyond the orbit of Neptune at about $30\,\mathrm{AU}$. Because the comet's mass is negligible, [[#eq-third-law]] has the same constant for the comet as for the Earth, so in years and astronomical units $\tau^2 = a^3$:

$$
\tau = (17.76)^{3/2}\,\mathrm{yr} = 74.8\,\mathrm{yr}.
$$

The observed interval between perihelion passages varies between about $74$ and $79$ years, because Jupiter and Saturn perturb the orbit. The answer is sensitive to the small number $1 - e = 0.033$: an error of $0.001$ in $e$ changes $a$ by $3\%$ and the period by $4.5\%$.
:::
:::

### Where is the planet at time $t$?

The conic [[#eq-conic]] gives the shape of the orbit but not the timetable. Kepler solved that problem too, with an auxiliary angle. For an ellipse, define the **eccentric anomaly** $\psi$ by

$$
r = a(1 - e\cos\psi),
$$

so that $\psi = 0$ at pericentre and $\psi = \pi$ at apocentre. Geometrically, $\psi$ is the angle, seen from the centre of the ellipse, of the point on the circumscribed circle directly above the planet.

::: proposition Kepler's equation {#prop-kepler-eq}
Let $n = 2\pi/\tau = \sqrt{k/(\mu a^3)}$ be the **mean motion**, and let $t = 0$ at pericentre. Then the eccentric anomaly obeys

$$
nt = \psi - e\sin\psi,
$$ {#eq-kepler-eq}

and the polar angle is recovered from $\tan(\theta/2) = \sqrt{(1 + e)/(1 - e)}\,\tan(\psi/2)$.
:::

::: proof
Multiply the radial energy equation [[#eq-radial-energy]] by $2r^2/\mu$ and insert $E = -k/(2a)$ and $\ell^2 = \mu kp = \mu ka(1 - e^2)$:

$$
r^2\dot r^2 = \frac{2}{\mu}\left(Er^2 + kr - \frac{\ell^2}{2\mu}\right) = \frac{k}{\mu a}\bigl[-r^2 + 2ar - a^2(1 - e^2)\bigr] = \frac{k}{\mu a}\bigl[a^2e^2 - (r - a)^2\bigr].
$$

With $r - a = -ae\cos\psi$ the bracket is $a^2e^2\sin^2\psi$, while the left side is $a^2(1 - e\cos\psi)^2\cdot a^2e^2\sin^2\psi\,\dot\psi^2$. Cancelling, $(1 - e\cos\psi)^2\dot\psi^2 = k/(\mu a^3) = n^2$. With $\psi$ increasing, $(1 - e\cos\psi)\,\dd\psi = n\,\dd t$, and integrating from pericentre gives [[#eq-kepler-eq]]. The relation between $\theta$ and $\psi$ follows by equating $a(1 - e\cos\psi)$ with $p/(1 + e\cos\theta)$ and using the half-angle formulae; it is checked numerically in the example below.
:::

Kepler's equation is transcendental: given $t$ there is no formula for $\psi$. Newton's method converges very fast, because $\psi \mapsto \psi - e\sin\psi$ is smooth and increasing for $e < 1$. Starting from $\psi = nt$, iterate $\psi \leftarrow \psi - (\psi - e\sin\psi - nt)/(1 - e\cos\psi)$.

::: example Timing the satellite {#ex-timing}
For the satellite of [[#ex-satellite]], with $e = 5/19$ and $\tau = 9215\,\mathrm{s}$, find how long after perigee it reaches $\theta = 90^\circ$, and where it is a quarter of a period after perigee.
::: solution
At $\theta = 90^\circ$, $\tan(\psi/2) = \sqrt{(1 - e)/(1 + e)}\tan 45^\circ = \sqrt{14/24} = 0.7638$, so $\psi = 1.3045\,\mathrm{rad}$ ($74.74^\circ$). As a check, $a(1 - e\cos\psi) = 8842\,\mathrm{km}$, equal to $p = a(1 - e^2)$, the radius at $\theta = 90^\circ$ from [[#eq-conic]]. Kepler's equation gives

$$
nt = 1.3045 - \tfrac{5}{19}\sin 1.3045 = 1.0506, \qquad t = \frac{1.0506}{2\pi}\,\tau = 0.1672\,\tau = 1541\,\mathrm{s}.
$$

The satellite covers the first quarter-turn in only $16.7\%$ of its period, because it is moving fastest near perigee.

A quarter of a period after perigee, $nt = \pi/2$. Newton's method from $\psi = \pi/2$ gives $1.83395$, then $1.82548$, then $1.825466$, after which the digits stop changing. So $\psi = 1.8255\,\mathrm{rad}$, the radius is $a(1 - e\cos\psi) = 10\,130\,\mathrm{km}$, and the half-angle formula gives $\theta = 118.9^\circ$. Halfway in time to apogee, the satellite is two thirds of the way there in angle.
:::
:::

::: remark The Laplace–Runge–Lenz vector
The Kepler problem has a conserved vector beyond $\boldsymbol{\ell}$: $\mathbf{A} = \mathbf{p}\times\boldsymbol{\ell} - \mu k\,\hat{\mathbf{r}}$, with $\mathbf{p} = \mu\dot{\mathbf{r}}$. It points from the focus towards the pericentre and has magnitude $\mu ke$; its conservation is proved in [[#exr-lrl]]. Its existence is why Kepler ellipses do not precess, and it is the hidden symmetry that explains the degeneracy of the hydrogen energy levels in [[quantum-1/hydrogen]], where $E_n$ depends only on $n$ and not on the angular momentum. Small perturbations, from other planets or from general relativity, make $\mathbf{A}$ rotate slowly: that is the precession of Mercury's perihelion.
:::

## Closed orbits and Bertrand's theorem {#bertrand}

A bounded orbit oscillates in $r$ between the apsides while $\theta$ increases. The angle turned between a pericentre and the next apocentre is the **apsidal angle** $\Delta\theta$. The orbit closes if, after some whole number of radial oscillations, $\theta$ has advanced by a whole number of turns; that requires $\Delta\theta/\pi$ to be rational. For the Kepler problem, $\Delta\theta = \pi$ exactly and every bounded orbit is closed.

For nearly circular orbits the apsidal angle can be found for any force law. Write the attractive force as $F = -f(r)$ with $f > 0$, and a circular orbit at $r_0 = 1/u_0$. Put $u = u_0 + \eta$ into [[#eq-binet]] and expand to first order in $\eta$. The calculation, carried out in [[#exr-apsidal]], gives

$$
\frac{\dd^2\eta}{\dd\theta^2} + \beta^2\eta = 0, \qquad \beta^2 = 3 + \frac{r_0f'(r_0)}{f(r_0)}.
$$ {#eq-beta}

So $\eta \propto \cos\beta\theta$ and the apsidal angle is $\Delta\theta = \pi/\beta$. For a power law $f = cr^n$, $\beta^2 = 3 + n$, consistent with [[#prop-power-stable]]: the oscillation is stable exactly when $\beta^2 > 0$. Gravity ($n = -2$) gives $\beta = 1$ and $\Delta\theta = \pi$. Hooke's law ($n = 1$) gives $\beta = 2$ and $\Delta\theta = \pi/2$: the orbits are ellipses centred, not focused, on the origin. Any other power gives an irrational $\beta$ for most $n$, and a rosette that never closes.

::: theorem Bertrand's theorem {#thm-bertrand}
The only central potentials for which every bounded orbit is closed are $U = -k/r$ and $U = \frac12 kr^2$, with $k > 0$.
:::

::: proof {collapsed}
Sketch. If every bounded orbit closes, then nearly circular orbits close at every radius, so $\beta$ in [[#eq-beta]] is rational at every $r_0$. A continuous function that takes only rational values is constant, so $rf'/f = \beta^2 - 3$ is constant and $f = cr^{\beta^2 - 3}$ is a power law. Bertrand then expanded the orbit equation to third order in the amplitude of the radial oscillation and showed that the apsidal angle depends on the amplitude unless $\beta^2 = 1$ or $\beta^2 = 4$. A careful modern proof is given in Goldstein, Poole and Safko, *Classical Mechanics*, 3rd ed., Appendix A.
:::

::: quiz
A particle moves in an attractive central force $f = cr^{-5/2}$, slightly perturbed from a circular orbit. Which statement is true?
- [ ] The orbit is a fixed ellipse, because every attractive power law gives ellipses.
- [x] The orbit is a rosette whose pericentre advances by more than a full half-turn between successive apsides, and it is stable.
- [ ] The circular orbit is unstable, because $n < -2$.
- [ ] The orbit closes after exactly two radial oscillations.
::: solution
Here $n = -5/2$, so $\beta^2 = 3 + n = 1/2$ and $\beta = 1/\sqrt2$. Since $\beta^2 > 0$ the circular orbit is stable ($n > -3$). The apsidal angle is $\pi/\beta = \sqrt2\,\pi \approx 255^\circ$, more than $180^\circ$, so successive pericentres advance by $2\pi\sqrt 2 - 2\pi \approx 149^\circ$ each radial period. Because $\sqrt2$ is irrational the orbit never closes. Only $n = -2$ and $n = 1$ give closed orbits.
:::
:::

## Scattering {#scattering}

A particle approaching from far away with speed $v_\infty$ and **impact parameter** $b$, the perpendicular distance between the centre of force and the line of its incoming asymptote, has $E = \frac12\mu v_\infty^2$ and $\ell = \mu v_\infty b$. It is deflected and leaves along another asymptote. The angle between the incoming and outgoing directions is the **scattering angle** $\Theta$. For a repulsive inverse-square force, such as an alpha particle approaching a nucleus, the orbit is the far branch of a hyperbola and the scattering angle can be computed exactly.

::: example Rutherford scattering {#ex-rutherford}
A particle of mass $\mu$ and energy $E$ approaches a fixed repulsive centre with $U = +k/r$, $k > 0$, at impact parameter $b$. Show that the scattering angle satisfies

$$
\tan\frac{\Theta}{2} = \frac{k}{2Eb}.
$$ {#eq-rutherford-angle}

Evaluate the impact parameter that gives $\Theta = 90^\circ$ for a $5.00\,\mathrm{MeV}$ alpha particle and a gold nucleus ($Z = 79$), using $e^2/(4\pi\eps_0) = 1.440\,\mathrm{MeV\,fm}$.
::: solution
For $F = +k/r^2 = +ku^2$, the orbit equation [[#eq-binet]] reads $u'' + u = -\mu k/\ell^2$. The solution that is positive somewhere is

$$
u = \frac{\mu k}{\ell^2}\bigl(e\cos\theta - 1\bigr), \qquad e > 1,
$$

with the axis through the point of closest approach. The energy relation becomes $e^2 = 1 + 2E\ell^2/(\mu k^2)$ as before, by the same calculation with $k \to -k$. The particle is at infinity where $u = 0$, that is at $\cos\theta_\infty = 1/e$, and the two asymptotes are at $\theta = \pm\theta_\infty$. The direction of motion turns from one asymptote to the other, so $\Theta = \pi - 2\theta_\infty$ and

$$
\tan\frac{\Theta}{2} = \cot\theta_\infty = \frac{\cos\theta_\infty}{\sin\theta_\infty} = \frac{1/e}{\sqrt{1 - 1/e^2}} = \frac{1}{\sqrt{e^2 - 1}}.
$$

Now $e^2 - 1 = 2E\ell^2/(\mu k^2) = 2E\mu^2v_\infty^2b^2/(\mu k^2) = (2Eb/k)^2$, using $\mu v_\infty^2 = 2E$. So $\tan(\Theta/2) = k/(2Eb)$.

For the alpha particle (charge $2e$) and gold (charge $79e$), $k = 2\times 79\times 1.440\,\mathrm{MeV\,fm} = 227.5\,\mathrm{MeV\,fm}$. At $\Theta = 90^\circ$, $\tan 45^\circ = 1$ and

$$
b = \frac{k}{2E} = \frac{227.5}{10.0} = 22.8\,\mathrm{fm}.
$$

The gold nucleus has a radius of about $7\,\mathrm{fm}$, so even a right-angle deflection happens well outside it, where the pure Coulomb law holds. (The gold nucleus is fifty times heavier than the alpha particle, so treating it as fixed is a $2\%$ approximation; strictly, $E$ and $\Theta$ refer to the centre-of-mass frame.)
:::
:::

A beam of particles with uniform intensity hits the target at all impact parameters. Those with impact parameters between $b$ and $b + \dd b$, an annulus of area $2\pi b\,\dd b$, are scattered into the angles between $\Theta$ and $\Theta + \dd\Theta$, a band of solid angle $\dd\Omega = 2\pi\sin\Theta\,\dd\Theta$. The ratio is the **differential cross-section**,

$$
\deriv{\sigma}{\Omega} = \frac{b}{\sin\Theta}\abs{\deriv{b}{\Theta}}.
$$

From [[#eq-rutherford-angle]], $b = (k/2E)\cot(\Theta/2)$ and $\abs{\dd b/\dd\Theta} = (k/4E)\csc^2(\Theta/2)$. With $\sin\Theta = 2\sin(\Theta/2)\cos(\Theta/2)$,

$$
\deriv{\sigma}{\Omega} = \frac{(k/2E)\cot(\Theta/2)\,(k/4E)\csc^2(\Theta/2)}{2\sin(\Theta/2)\cos(\Theta/2)} = \left(\frac{k}{4E}\right)^2\frac{1}{\sin^4(\Theta/2)}.
$$ {#eq-rutherford}

This is **Rutherford's formula**. Its steep rise at small angles and the small but non-zero rate of scattering through large angles are what Geiger and Marsden measured in 1909–1913, and what forced the conclusion that the positive charge of an atom is concentrated in a tiny nucleus.

::: warning The scattering angle is not twice the angle of closest approach
In [[#ex-rutherford]] the angle $\theta_\infty$ is measured from the axis of symmetry of the hyperbola to an asymptote, and the scattering angle is $\Theta = \pi - 2\theta_\infty$, not $2\theta_\infty$. A head-on collision ($b = 0$) gives $e = 1$, $\theta_\infty = 0$ and $\Theta = \pi$: the particle bounces straight back. A distant pass ($b \to \infty$) gives $e \to \infty$, $\theta_\infty \to \pi/2$ and $\Theta \to 0$. If your formula gives the opposite limits, you have mixed up the two angles.
:::

::: history From Kepler to Rutherford
Johannes Kepler published his first two laws in *Astronomia nova* (1609), from Tycho Brahe's observations of Mars, and the third in *Harmonices mundi* (1619). Isaac Newton derived all three from the inverse-square law in the *Principia* (1687), where the reduction of the two-body problem and the converse problem, finding the force from the orbit, also appear. The modern conserved-vector treatment goes back to Jakob Hermann and Johann Bernoulli in 1710 and was popularised by Laplace; the name Runge–Lenz comes from its use by Carl Runge in a 1919 textbook and Wilhelm Lenz in 1924 in the old quantum theory. Joseph Bertrand proved his theorem in 1873 in the *Comptes rendus*. Ernest Rutherford derived the scattering formula in 1911 to explain the large-angle deflections observed by Hans Geiger and Ernest Marsden.
:::

## Where this leads {#leads}

[[analytical-mechanics/hamiltonian]] revisits the Kepler problem in phase space, where angular momentum and the Runge–Lenz vector become generators of symmetries through Poisson brackets. [[analytical-mechanics/chaos]] begins with Poincaré's discovery that the three-body problem has no such neat solution. In [[gravitation/schwarzschild]] the effective potential acquires an extra $-1/r^3$ term from general relativity, which makes $\beta$ slightly less than $1$ and produces the precession of Mercury's perihelion by $43''$ per century. In [[quantum-1/hydrogen]] the same separation into a radial equation with a centrifugal barrier $\hbar^2\ell(\ell+1)/(2\mu r^2)$ is the first step in solving the hydrogen atom.

::: summary
- The two-body problem separates into free motion of the centre of mass and motion of the relative coordinate with the reduced mass $\mu = m_1m_2/(m_1 + m_2)$.
- Angular momentum conservation confines the motion to a plane and gives $\ell = \mu r^2\dot\theta$ constant; equal areas are swept in equal times for every central force.
- The radial motion is one-dimensional in the effective potential $U_{\mathrm{eff}} = U + \ell^2/(2\mu r^2)$; turning points satisfy $U_{\mathrm{eff}} = E$.
- With $u = 1/r$, the orbit equation is $u'' + u = -\mu F(1/u)/(\ell^2u^2)$. For $U = -k/r$ it gives the conic $r = p/(1 + e\cos\theta)$ with $p = \ell^2/(\mu k)$ and $e = \sqrt{1 + 2E\ell^2/(\mu k^2)}$.
- Bound Kepler orbits have $a = -k/(2E)$ and $\tau^2 = 4\pi^2\mu a^3/k$, which is $4\pi^2 a^3/(G(m_1 + m_2))$ for gravity. The timetable along the ellipse is Kepler's equation $nt = \psi - e\sin\psi$.
- Near-circular orbits have apsidal angle $\pi/\beta$ with $\beta^2 = 3 + rf'/f$; power laws give stable circles only for $n > -3$. By Bertrand's theorem only $-k/r$ and $\frac12 kr^2$ close every bounded orbit.
- Repulsive Coulomb scattering has $\tan(\Theta/2) = k/(2Eb)$ and Rutherford's cross-section $(k/4E)^2/\sin^4(\Theta/2)$.
:::

## Exercises {#exercises}

::: exercise The reduced mass of hydrogen {level=1 check="1836.15267/1837.15267"}
The proton is $1836.15267$ times as massive as the electron. Find the reduced mass of the hydrogen atom as a fraction of the electron mass.
::: solution
With $m_p = 1836.15267\,m_e$,

$$
\frac{\mu}{m_e} = \frac{m_p}{m_e + m_p} = \frac{1836.15267}{1837.15267} = 0.999456.
$$

All hydrogen energy levels are proportional to $\mu$, so they are lower in magnitude by $0.054\%$ than for an infinitely heavy proton. For deuterium the proton is replaced by a nucleus about twice as heavy, $\mu/m_e$ rises to about $0.999728$, and the spectral lines shift by about $0.027\%$: that shift is how deuterium was discovered by Urey in 1932.
:::
:::

::: exercise The geostationary radius {level=1 check="42164"}
A geostationary satellite orbits in the equatorial plane with a period equal to the sidereal day, $86\,164\,\mathrm{s}$. Find the radius of its circular orbit, in kilometres, using $GM_\oplus = 3.986\times 10^{14}\,\mathrm{m^3/s^2}$.
::: solution
From [[#eq-third-law]] with the satellite's mass negligible,

$$
a = \left(\frac{GM_\oplus\tau^2}{4\pi^2}\right)^{1/3} = \left(\frac{(3.986\times 10^{14})(86\,164)^2}{4\pi^2}\right)^{1/3} = 4.2164\times 10^{7}\,\mathrm{m},
$$

that is, $42\,164\,\mathrm{km}$ from the Earth's centre, or about $35\,790\,\mathrm{km}$ above the equator. The sidereal day, not the $86\,400\,\mathrm{s}$ solar day, is the rotation period relative to the stars, which is what the satellite must match.
:::
:::

::: exercise The eccentricity of the Moon's orbit {level=1 check="42200/768800"}
The Moon's distance from the Earth varies between about $363\,300\,\mathrm{km}$ at perigee and $405\,500\,\mathrm{km}$ at apogee. Find the eccentricity of its orbit.
::: solution
From $r_p = a(1 - e)$ and $r_a = a(1 + e)$,

$$
e = \frac{r_a - r_p}{r_a + r_p} = \frac{405\,500 - 363\,300}{405\,500 + 363\,300} = \frac{42\,200}{768\,800} = 0.0549.
$$

The orbit is nearly circular: the semi-minor axis is $a\sqrt{1 - e^2}$, only $0.15\%$ shorter than $a$, even though the distance varies by $11\%$. A slightly eccentric ellipse looks like an off-centre circle.
:::
:::

::: exercise Speed at perigee {level=2 check="sqrt(3.986e14*(2/7e6 - 1/9.5e6))"}
For the satellite of [[#ex-satellite]], derive the vis-viva equation $v^2 = GM_\oplus(2/r - 1/a)$ from [[#eq-semi-major]] and energy conservation, and compute the perigee speed in $\mathrm{m/s}$. How much must the speed at perigee be increased to make the satellite escape?
::: solution
Per unit mass, $E = \frac12 v^2 - GM_\oplus/r$ is constant and, by [[#eq-semi-major]] with $k/\mu = GM_\oplus$, equal to $-GM_\oplus/(2a)$. Solving for $v^2$ gives $v^2 = GM_\oplus(2/r - 1/a)$. At perigee,

$$
v_p = \sqrt{3.986\times 10^{14}\left(\frac{2}{7.0\times 10^6} - \frac{1}{9.5\times 10^6}\right)} = 8481\,\mathrm{m/s}.
$$

Escape needs $E \ge 0$, the limit $a \to \infty$, so $v_{\mathrm{esc}} = \sqrt{2GM_\oplus/r_p} = \sqrt{2(3.986\times 10^{14})/(7.0\times 10^6)} = 10\,672\,\mathrm{m/s}$. The required increase is about $2190\,\mathrm{m/s}$. A burn at perigee is the most efficient place to add energy, because the change in $\frac12 v^2$ for a given $\Delta v$ is largest where $v$ is largest.
:::
:::

::: exercise Apsidal angle of a rosette {level=2 check="pi*sqrt(2)" #exr-apsidal}
Derive [[#eq-beta]] by linearising the orbit equation about a circular orbit. Then find the apsidal angle, in radians, for a nearly circular orbit in an attractive force $f = cr^{-5/2}$.
::: hint
Write the orbit equation as $u'' = J(u) - u$ with $J(u) = \mu f(1/u)/(\ell^2u^2)$. A circular orbit has $J(u_0) = u_0$; expand $J$ to first order about $u_0$ and use the circular condition to remove $\mu/\ell^2$.
:::
::: solution
For an attractive force, $F = -f$, so [[#eq-binet]] reads $u'' + u = J(u)$ with $J(u) = \mu f(1/u)/(\ell^2u^2)$. A circular orbit at $u_0$ has $u_0 = J(u_0)$, so $\mu/\ell^2 = u_0^3/f(r_0)$ with $r_0 = 1/u_0$. Put $u = u_0 + \eta$; to first order, $\eta'' + \eta = J'(u_0)\eta$, so $\beta^2 = 1 - J'(u_0)$. Differentiating,

$$
J'(u) = \frac{\mu}{\ell^2}\left[-\frac{f'(1/u)}{u^4} - \frac{2f(1/u)}{u^3}\right],
$$

and at $u_0$, using $\mu/\ell^2 = u_0^3/f(r_0)$,

$$
J'(u_0) = \frac{u_0^3}{f(r_0)}\left[-f'(r_0)r_0^4 - 2f(r_0)r_0^3\right] = -\frac{r_0f'(r_0)}{f(r_0)} - 2.
$$

So $\beta^2 = 3 + r_0f'(r_0)/f(r_0)$, which is [[#eq-beta]]. For $f = cr^{-5/2}$, $rf'/f = -5/2$, so $\beta^2 = 1/2$ and the apsidal angle is $\pi/\beta = \pi\sqrt2 = 4.44\,\mathrm{rad}$, or $254.6^\circ$.
:::
:::

::: exercise Closest approach in a head-on collision {level=2 check="45.5"}
A $5.00\,\mathrm{MeV}$ alpha particle is fired directly at a gold nucleus ($Z = 79$), treated as fixed. Using $e^2/(4\pi\eps_0) = 1.440\,\mathrm{MeV\,fm}$, find the distance of closest approach in femtometres. Compare with the impact parameter for $90^\circ$ scattering in [[#ex-rutherford]].
::: solution
With $b = 0$ there is no angular momentum, so all the kinetic energy becomes potential energy at the turning point: $E = k/d$, with $k = 2\times 79\times 1.440 = 227.5\,\mathrm{MeV\,fm}$. So

$$
d = \frac{k}{E} = \frac{227.5}{5.00} = 45.5\,\mathrm{fm}.
$$

This is exactly twice the $22.8\,\mathrm{fm}$ impact parameter for $90^\circ$ scattering, because $k/E = 2\cdot k/(2E)$. Both are much larger than the nuclear radius, so a $5\,\mathrm{MeV}$ alpha particle never touches a gold nucleus, which is why Rutherford's purely Coulomb formula fitted Geiger and Marsden's data at all angles.
:::
:::

::: exercise Stability of circular orbits {level=3 #exr-stable-power}
Prove [[#prop-power-stable]]: for an attractive force of magnitude $f(r) = cr^n$, $c > 0$, show that for every $\ell \neq 0$ there is exactly one circular orbit and that it is a minimum of $U_{\mathrm{eff}}$ if and only if $n > -3$. Find the ratio of the radial oscillation frequency to the orbital angular frequency.
::: solution
The potential satisfies $U'(r) = f(r) = cr^n$. Then $U_{\mathrm{eff}}'(r) = cr^n - \ell^2/(\mu r^3)$, which vanishes when $r^{n+3} = \ell^2/(\mu c)$. If $n \neq -3$ this has exactly one positive root $r_0$. (If $n = -3$ there is a circular orbit only for the single value $\ell^2 = \mu c$, and then at every radius.) The second derivative is

$$
U_{\mathrm{eff}}''(r_0) = ncr_0^{n-1} + \frac{3\ell^2}{\mu r_0^4} = ncr_0^{n-1} + 3cr_0^{n-1} = (n + 3)cr_0^{n-1},
$$

using $\ell^2/(\mu r_0^3) = cr_0^n$. Since $c > 0$ and $r_0 > 0$, this is positive if and only if $n > -3$.

The radial frequency is $\omega_r^2 = U_{\mathrm{eff}}''(r_0)/\mu = (n + 3)cr_0^{n-1}/\mu$. The orbital angular velocity of the circular orbit satisfies $\mu r_0\dot\theta^2 = cr_0^n$, so $\dot\theta^2 = cr_0^{n-1}/\mu$. The ratio is $\omega_r/\dot\theta = \sqrt{n + 3} = \beta$, in agreement with [[#eq-beta]]: in the time of one radial oscillation the angle advances by $2\pi/\beta$, so the apsidal angle is $\pi/\beta$.
:::
:::

::: exercise The Laplace–Runge–Lenz vector {level=3 #exr-lrl}
For a particle of mass $\mu$ in the potential $-k/r$, with $\mathbf{p} = \mu\dot{\mathbf{r}}$ and $\boldsymbol{\ell} = \mathbf{r}\times\mathbf{p}$, prove that $\mathbf{A} = \mathbf{p}\times\boldsymbol{\ell} - \mu k\hat{\mathbf{r}}$ is conserved. By taking the dot product of $\mathbf{A}$ with $\mathbf{r}$, rederive the orbit equation [[#eq-conic]] and show that $\abs{\mathbf{A}} = \mu ke$.
::: hint
Use $\dot{\mathbf{p}} = -k\hat{\mathbf{r}}/r^2$, $\dot{\boldsymbol{\ell}} = 0$, and the identity $\deriv{\hat{\mathbf{r}}}{t} = \frac{\dot{\mathbf{r}}}{r} - \frac{(\mathbf{r}\cdot\dot{\mathbf{r}})\mathbf{r}}{r^3}$.
:::
::: solution
Since $\boldsymbol{\ell}$ is constant,

$$
\deriv{}{t}(\mathbf{p}\times\boldsymbol{\ell}) = \dot{\mathbf{p}}\times(\mathbf{r}\times\mu\dot{\mathbf{r}}) = -\frac{\mu k}{r^3}\,\mathbf{r}\times(\mathbf{r}\times\dot{\mathbf{r}}) = -\frac{\mu k}{r^3}\bigl[(\mathbf{r}\cdot\dot{\mathbf{r}})\mathbf{r} - r^2\dot{\mathbf{r}}\bigr],
$$

by the vector triple product rule. This equals $\mu k\bigl[\dot{\mathbf{r}}/r - (\mathbf{r}\cdot\dot{\mathbf{r}})\mathbf{r}/r^3\bigr] = \mu k\,\dd\hat{\mathbf{r}}/\dd t$. Hence $\dd\mathbf{A}/\dd t = 0$.

Now dot $\mathbf{A}$ with $\mathbf{r}$, and let $\theta$ be the angle between $\mathbf{r}$ and the fixed vector $\mathbf{A}$:

$$
Ar\cos\theta = \mathbf{r}\cdot(\mathbf{p}\times\boldsymbol{\ell}) - \mu kr = (\mathbf{r}\times\mathbf{p})\cdot\boldsymbol{\ell} - \mu kr = \ell^2 - \mu kr.
$$

Solving for $r$,

$$
r = \frac{\ell^2/(\mu k)}{1 + (A/\mu k)\cos\theta},
$$

which is [[#eq-conic]] with $p = \ell^2/(\mu k)$ and $e = A/(\mu k)$. So $\abs{\mathbf{A}} = \mu ke$, and $\mathbf{A}$ points towards the pericentre, where $\theta = 0$ and $r$ is smallest. The orbit's shape has been found with no differential equation at all, because the conserved vector carries the information.
:::
:::
