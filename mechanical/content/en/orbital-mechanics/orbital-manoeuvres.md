A launcher rarely leaves a satellite exactly where it needs to be. A geostationary satellite is released into an elongated transfer orbit and must raise its perigee and remove its inclination; a crew vehicle must climb to the space station's altitude and arrive at the same time as the station; an Earth-observation satellite must hold its orbit against drag for years. All of these are **orbital manoeuvres**: deliberate changes of velocity that change the orbit. Their currency is the velocity increment $\Delta v$, because through the rocket equation $\Delta v$ fixes the propellant mass, and propellant mass is what a spacecraft designer can least afford. This chapter develops the classical manoeuvres from the two-body results of [[orbital-mechanics/two-body-problem]]: the **impulsive** model of a burn, the reason burns are best made where the spacecraft is fastest, the **Hohmann** and **bi-elliptic** transfers between circular orbits, **plane changes** and how to combine them with transfers, and **phasing** manoeuvres that adjust timing rather than shape. The numbers that come out — about $3.9\ \mathrm{km/s}$ from low orbit to geostationary altitude, plus $0.4\ \mathrm{km/s}$ to remove the inclination of a Florida launch — are the backbone of every mission's propellant budget.

## The impulsive approximation and the rocket equation {#sec-impulsive}

Chemical rocket engines burn for seconds to minutes, while orbits take hours. It is then an excellent approximation to treat a burn as an **impulse**: an instantaneous change of velocity $\Delta\mathbf{v}$ with no change of position. The orbit before and after the burn are two conics that intersect at the burn point; the new orbit follows from the new state vector by the methods of [[orbital-mechanics/orbital-elements]].

The cost of $\Delta v$ is propellant. For a rocket with effective exhaust speed $c = I_{sp}\,g_0$ (with $I_{sp}$ the specific impulse in seconds and $g_0 = 9.806\,65\ \mathrm{m/s^2}$), the rocket equation derived in [[propulsion/rocket-fundamentals]] gives
$$
\Delta v = I_{sp}\,g_0\ln\frac{m_0}{m_f}, \qquad \frac{m_p}{m_0} = 1 - e^{-\Delta v/(I_{sp}g_0)},
$$ {#eq-rocket}
where $m_0$ and $m_f$ are the masses before and after the burn and $m_p = m_0 - m_f$ is the propellant used. The exponential is the tyranny: a storable bipropellant engine with $I_{sp} \approx 320\ \mathrm{s}$ has $c = 3.14\ \mathrm{km/s}$, so a $\Delta v$ equal to $c$ consumes $63\,\%$ of the initial mass. $\Delta v$ budgets add along a mission (the rocket equation is additive in $\Delta v$, not in propellant), which is why they are the language of mission design.

The impulsive model fails for low-thrust electric propulsion, whose burns last weeks; there the trajectory spirals slowly and the required $\Delta v$ for a transfer between circular orbits approaches the difference of the circular speeds, $\lvert v_{c1} - v_{c2}\rvert$, which is larger than the impulsive cost. For high-thrust burns it is accurate to within the **finite-burn loss**, a few per cent for burns lasting a significant fraction of the orbit.

## Where to burn: the Oberth effect {#sec-oberth}

::: proposition Energy change from an impulse {#prop-oberth}
An impulse $\Delta\mathbf{v}$ applied to a spacecraft moving at velocity $\mathbf{v}$ changes its specific orbital energy by
$$
\Delta\varepsilon = \mathbf{v}\cdot\Delta\mathbf{v} + \tfrac12\Delta v^2.
$$
For a given magnitude $\Delta v$, the energy gain is greatest when the impulse is along the velocity and the spacecraft is moving fastest — at periapsis.
:::

::: proof
The position does not change during an impulse, so the potential energy $-\mu/r$ does not change; only the kinetic energy does: $\Delta\varepsilon = \tfrac12\lVert\mathbf{v} + \Delta\mathbf{v}\rVert^2 - \tfrac12v^2 = \mathbf{v}\cdot\Delta\mathbf{v} + \tfrac12\Delta v^2$. For fixed $\Delta v$, $\mathbf{v}\cdot\Delta\mathbf{v} \le v\,\Delta v$, with equality when the two are parallel, and $v$ is largest at periapsis.
:::

This is the **Oberth effect**. Energy is not conserved in the naive sense here: the exhaust ejected at high speed deep in the gravity well carries away less kinetic energy than it would elsewhere, leaving more for the vehicle. In practice it means: raise apoapsis by burning at periapsis, raise periapsis by burning at apoapsis (where the orbit's velocity is horizontal and a tangential burn changes only the opposite apse), and escape from a planet by burning as low as possible.

::: example The same burn at perigee and at apogee {#ex-oberth}
A spacecraft is in the geostationary transfer orbit $r_p = 6628\ \mathrm{km}$, $r_a = 42\,164\ \mathrm{km}$. Compare the effect of a tangential burn of $0.100\ \mathrm{km/s}$ made at perigee with the same burn made at apogee.
::: solution
From [[orbital-mechanics/two-body-problem]], $a = 24\,396\ \mathrm{km}$, $\varepsilon = -8.1694\ \mathrm{km^2/s^2}$, $v_p = 10.195\ \mathrm{km/s}$, $v_a = 1.6026\ \mathrm{km/s}$.

At perigee: $\Delta\varepsilon = 10.195 \times 0.1 + 0.005 = 1.0245\ \mathrm{km^2/s^2}$, new $\varepsilon = -7.1449$, $a = 27\,894\ \mathrm{km}$, so the apogee rises to $2a - r_p = 49\,160\ \mathrm{km}$ — up by $6996\ \mathrm{km}$.

At apogee: $\Delta\varepsilon = 1.6026 \times 0.1 + 0.005 = 0.1653$, new $a = 24\,900\ \mathrm{km}$, so the perigee rises to $2a - r_a = 7635\ \mathrm{km}$ — up by $1007\ \mathrm{km}$.

*Check:* the energy gains are in the ratio of the speeds, $6.2$, and each burn moves only the *opposite* apse, as a tangential impulse at an apse must (the burn point remains an apse of the new orbit). A perigee burn is the efficient way to raise apogee; an apogee burn is the efficient way to raise perigee.
:::
:::

## The Hohmann transfer {#sec-hohmann}

The most important manoeuvre transfers a spacecraft between two coplanar circular orbits of radii $r_1$ and $r_2 > r_1$. The **Hohmann transfer** uses an ellipse tangent to both: its periapsis is on the inner orbit and its apoapsis on the outer one. Two tangential burns are needed — one to enter the ellipse, one to leave it.

::: proposition The Hohmann transfer {#prop-hohmann}
For a transfer from a circular orbit of radius $r_1$ to a coplanar circular orbit of radius $r_2 > r_1$ along the half-ellipse tangent to both, the two impulses and the transfer time are
$$
\begin{aligned}
\Delta v_1 &= \sqrt{\frac{\mu}{r_1}}\left(\sqrt{\frac{2r_2}{r_1 + r_2}} - 1\right), \qquad
\Delta v_2 = \sqrt{\frac{\mu}{r_2}}\left(1 - \sqrt{\frac{2r_1}{r_1 + r_2}}\right),\\
t_H &= \pi\sqrt{\frac{(r_1 + r_2)^3}{8\mu}}.
\end{aligned}
$$ {#eq-hohmann}
In terms of $R = r_2/r_1$ and $v_{c1} = \sqrt{\mu/r_1}$, the total is
$$
\frac{\Delta v_H}{v_{c1}} = \sqrt{\frac{2R}{1+R}} - 1 + \frac{1}{\sqrt R} - \sqrt{\frac{2}{R(1+R)}}.
$$ {#eq-hohmann-norm}
:::

::: proof
The transfer ellipse has $r_p = r_1$, $r_a = r_2$, so $a_t = (r_1 + r_2)/2$. By the vis-viva equation its speed at periapsis is $v_p = \sqrt{\mu(2/r_1 - 2/(r_1 + r_2))} = \sqrt{\mu/r_1}\sqrt{2r_2/(r_1+r_2)}$, and at apoapsis $v_a = \sqrt{\mu/r_2}\sqrt{2r_1/(r_1+r_2)}$. At both apses the velocity is horizontal, as is the circular velocity, so each burn is tangential and its magnitude is the difference of speeds: $\Delta v_1 = v_p - \sqrt{\mu/r_1}$ and $\Delta v_2 = \sqrt{\mu/r_2} - v_a$. The transfer covers half of the ellipse, taking half its period, $\pi\sqrt{a_t^3/\mu}$. Dividing by $v_{c1}$ and writing $\sqrt{\mu/r_2} = v_{c1}/\sqrt R$ gives [[#eq-hohmann-norm]]. The derivation assumes impulsive burns, coplanar circular orbits and two-body motion; the same formulas, with the burns reversed, apply to a transfer inward.
:::

Among all transfers between two coplanar circular orbits that use two impulses, the Hohmann transfer requires the least total $\Delta v$; this was established rigorously only decades after Hohmann proposed it (a classical proof uses the energy and angular-momentum changes each impulse can produce, given for example by Prussing and Conway). With *three* impulses the answer changes, as the next section shows.

The normalised cost [[#eq-hohmann-norm]] does not grow without limit: it rises to a maximum of $0.536$ at $R = 15.58$ and then *falls*, tending to $\sqrt2 - 1 = 0.414$ as $R \to \infty$ — the cost of escape. Very distant circular orbits are slow, so the second burn becomes small.

::: example Low Earth orbit to geostationary altitude {#ex-hohmann}
Find the Hohmann transfer from a circular parking orbit at $300\ \mathrm{km}$ altitude to geostationary radius $42\,164\ \mathrm{km}$, in the same plane: the two burns, the total and the transfer time.
::: solution
$r_1 = 6678\ \mathrm{km}$, $r_2 = 42\,164\ \mathrm{km}$, $a_t = 24\,421\ \mathrm{km}$. Speeds:
$$
v_{c1} = 7.7258, \quad v_p = 10.1516, \quad v_a = 1.6078, \quad v_{c2} = 3.0747\ \mathrm{km/s}.
$$
$\Delta v_1 = 10.1516 - 7.7258 = 2.4258\ \mathrm{km/s}$, $\Delta v_2 = 3.0747 - 1.6078 = 1.4668\ \mathrm{km/s}$, total $3.893\ \mathrm{km/s}$. Transfer time $t_H = \pi\sqrt{24\,421^3/398\,600} = 18\,990\ \mathrm{s} = 5.28\ \mathrm{h}$.

*Check:* with $R = 6.314$, [[#eq-hohmann-norm]] gives $0.5038$, and $0.5038 \times 7.7258 = 3.893\ \mathrm{km/s}$. Both burns increase the speed, yet the final orbital speed ($3.07\ \mathrm{km/s}$) is less than the initial ($7.73\ \mathrm{km/s}$): the spacecraft slows as it climbs, trading kinetic for potential energy. The coplanar transfer is possible only from an equatorial launch site; we add the plane change in [[#ex-gto-plane]].
:::
:::

## The bi-elliptic transfer {#sec-bielliptic}

A **bi-elliptic transfer** uses two half-ellipses and three burns. The first burn, at $r_1$, puts the spacecraft on an ellipse with apoapsis at an intermediate radius $r_b > r_2$; the second burn, at $r_b$, raises periapsis to $r_2$; the third burn, at $r_2$, slows the spacecraft into the circular orbit. It goes *beyond* the target and comes back.

With $R = r_2/r_1$ and $B = r_b/r_1$, applying vis-viva at each burn gives
$$
\frac{\Delta v_{BE}}{v_{c1}} = \sqrt{\frac{2B}{1+B}} - 1 + \sqrt{\frac2B}\left(\sqrt{\frac{R}{R+B}} - \sqrt{\frac{1}{1+B}}\right) + \sqrt{\frac{2B}{R(R+B)}} - \frac{1}{\sqrt R}.
$$ {#eq-bielliptic}
The middle burn is made at the slowest point of the trajectory, where changing the periapsis is cheap, and the first burn exploits the Oberth effect. In the limit $B \to \infty$ the first two burns become an escape to infinity and a return from it, with total $(\sqrt2 - 1)(1 + 1/\sqrt R)\,v_{c1}$. Comparing this limit with [[#eq-hohmann-norm]], and the full formula with the Hohmann cost, gives the classical results:

- for $R < 11.94$, the Hohmann transfer is cheaper than any bi-elliptic transfer;
- for $11.94 < R < 15.58$, a bi-elliptic transfer is cheaper if $r_b$ is large enough;
- for $R > 15.58$, every bi-elliptic transfer with $r_b > r_2$ is cheaper than the Hohmann transfer.

The savings are small — a few per cent at most — and the transfer time is much longer, so the bi-elliptic transfer is rarely flown. Its real lesson is that the Hohmann transfer is optimal only within its class.

::: example Ratio 15: Hohmann against bi-elliptic {#ex-bielliptic}
For $R = r_2/r_1 = 15$, compare the Hohmann transfer with a bi-elliptic transfer through $r_b = 40\,r_1$. Starting from a $300\ \mathrm{km}$ parking orbit ($r_1 = 6678\ \mathrm{km}$), give the costs in km/s and the transfer times.
::: solution
Hohmann, from [[#eq-hohmann-norm]] with $R = 15$:
$$
\frac{\Delta v_H}{v_{c1}} = \sqrt{1.875} - 1 + 0.25820 - \sqrt{2/240} = 0.36931 + 0.25820 - 0.09129 = 0.5362.
$$
Bi-elliptic, from [[#eq-bielliptic]] with $B = 40$:
$$
\frac{\Delta v_{BE}}{v_{c1}} = \underbrace{0.39686}_{\text{burn 1}} + \underbrace{0.22361\,(0.52223 - 0.15617)}_{=\,0.08186,\ \text{burn 2}} + \underbrace{0.31139 - 0.25820}_{=\,0.05319,\ \text{burn 3}} = 0.5319.
$$
With $v_{c1} = 7.7258\ \mathrm{km/s}$: Hohmann $4.143\ \mathrm{km/s}$, bi-elliptic $4.109\ \mathrm{km/s}$, a saving of $33\ \mathrm{m/s}$ ($0.8\,\%$).

Times: Hohmann $\pi\sqrt{(8\,r_1)^3/\mu} = 17.1\ \mathrm{h}$; bi-elliptic $\pi\sqrt{(20.5\,r_1)^3/\mu} + \pi\sqrt{(27.5\,r_1)^3/\mu} = 178.8\ \mathrm{h}$, more than ten times longer.

*Check:* $R = 15$ lies between $11.94$ and $15.58$, so the bi-elliptic transfer wins only for large enough $r_b$; solving $\Delta v_{BE} = \Delta v_H$ gives the break-even $r_b = 18.2\,r_1$, and $40\,r_1$ is beyond it. Pushing $r_b \to \infty$ lowers the cost to $0.5212\,v_{c1}$, but the time goes to infinity. A $0.8\,\%$ saving rarely justifies a week-long transfer through the radiation belts.
:::
:::

::: widget plot
f: sqrt(2*x/(1 + x)) - 1 + 1/sqrt(x) - sqrt(2/(x*(1 + x))); sqrt(2*b/(1 + b)) - 1 + sqrt(2/b)*(sqrt(x/(x + b)) - sqrt(1/(1 + b))) + sqrt(2*b/(x*(x + b))) - 1/sqrt(x) + 0*sqrt(b - x); (sqrt(2) - 1)*(1 + 1/sqrt(x))
x: 1, 80
y: 0.3, 0.6
sliders: b=40:5:300:1
labels: \text{Hohmann}; \text{bi-elliptic, } r_b = b\,r_1; \text{bi-elliptic, } r_b \to \infty
vlines: 11.94; 15.58
caption: Total transfer cost $\Delta v/v_{c1}$ between circular orbits against the radius ratio $R = r_2/r_1$. The Hohmann curve peaks at $0.536$ at $R = 15.58$ and then falls towards $\sqrt2 - 1$. The bi-elliptic curve (drawn only where $r_b > r_2$) is for the intermediate radius set by the slider $b = r_b/r_1$; the third curve is its $r_b \to \infty$ limit, which crosses the Hohmann curve at $R = 11.94$. With $b = 40$, read $R = 15$: $0.532$ against Hohmann's $0.536$. Lower $b$ towards $20$ and watch the bi-elliptic advantage at $R = 15$ disappear (break-even $b = 18.2$); beyond $R = 15.58$ every $b > R$ beats Hohmann.
:::

## Plane changes {#sec-plane-change}

A change of orbital plane rotates the velocity vector, and possibly changes its length, at a point common to the old and new orbits.

::: proposition Cost of a plane change {#prop-plane-change}
An impulse that turns the velocity through an angle $\Delta i$ while changing the speed from $v_1$ to $v_2$ has magnitude
$$
\Delta v = \sqrt{v_1^2 + v_2^2 - 2v_1v_2\cos\Delta i},
$$ {#eq-combined}
which for an unchanged speed $v$ reduces to
$$
\Delta v = 2v\sin\frac{\Delta i}{2}.
$$ {#eq-plane}
The combined burn never costs more than the same changes made separately, $\lvert v_2 - v_1\rvert + 2\min(v_1, v_2)\sin(\Delta i/2)$.
:::

::: proof
$\Delta\mathbf{v} = \mathbf{v}_2 - \mathbf{v}_1$, and the law of cosines in the triangle formed by $\mathbf{v}_1$, $\mathbf{v}_2$ and $\Delta\mathbf{v}$ (angle $\Delta i$ between the first two) gives [[#eq-combined]]. With $v_1 = v_2 = v$, $\Delta v^2 = 2v^2(1 - \cos\Delta i) = 4v^2\sin^2(\Delta i/2)$. For the separate strategy, take $v_1 \le v_2$ and do the rotation at the lower speed: first $\mathbf{v}_1 \to \mathbf{v}_1'$ (same length $v_1$, direction of $\mathbf{v}_2$), then $\mathbf{v}_1' \to \mathbf{v}_2$ (pure lengthening). By the triangle inequality $\lVert\mathbf{v}_2 - \mathbf{v}_1\rVert \le \lVert\mathbf{v}_1' - \mathbf{v}_1\rVert + \lVert\mathbf{v}_2 - \mathbf{v}_1'\rVert = 2v_1\sin(\Delta i/2) + (v_2 - v_1)$, with equality only if $\Delta i = 0$. The burn must be made where the two orbits intersect — on the line of nodes of the two planes — or it changes the plane by less than intended.
:::

Plane changes are expensive: a $60^\circ$ turn at constant speed costs as much as the orbital speed itself, and even $10^\circ$ in low orbit costs $1.35\ \mathrm{km/s}$. Two rules follow from [[#prop-plane-change]]. First, change planes where the speed is lowest — at apoapsis, or in the high orbit after a transfer. Second, combine the plane change with a speed change in a single burn.

::: example A geostationary transfer with plane change {#ex-gto-plane}
A satellite launched due east from $28.5^\circ\,\mathrm{N}$ is in a $300\ \mathrm{km}$ circular parking orbit inclined at $28.5^\circ$. Compare three ways of reaching an equatorial geostationary orbit: (a) Hohmann transfer, then a separate plane change at geostationary radius; (b) Hohmann transfer with the whole plane change combined with the apogee burn; (c) splitting the plane change, $2.2^\circ$ at perigee and $26.3^\circ$ at apogee. If the satellite performs the apogee burn itself with $I_{sp} = 320\ \mathrm{s}$, what fraction of its mass in the transfer orbit is propellant for strategy (b)?
::: solution
Speeds from [[#ex-hohmann]]: $v_{c1} = 7.7258$, $v_p = 10.1516$, $v_a = 1.6078$, $v_{c2} = 3.0747\ \mathrm{km/s}$.

(a) $\Delta v_1 = 2.4258$, $\Delta v_2 = 1.4668$, plane change at GEO $2 \times 3.0747\sin 14.25^\circ = 1.5137$: total $5.406\ \mathrm{km/s}$.

(b) Apogee burn from [[#eq-combined]]: $\sqrt{1.6078^2 + 3.0747^2 - 2(1.6078)(3.0747)\cos 28.5^\circ} = 1.8302\ \mathrm{km/s}$; total $2.4258 + 1.8302 = 4.256\ \mathrm{km/s}$.

(c) Perigee burn turning $2.2^\circ$: $\sqrt{7.7258^2 + 10.1516^2 - 2(7.7258)(10.1516)\cos 2.2^\circ} = 2.4495$; apogee burn turning $26.3^\circ$: $1.7819$; total $4.231\ \mathrm{km/s}$.

Propellant fraction for the $1.830\ \mathrm{km/s}$ apogee burn: $1 - \exp(-1830/(320 \times 9.80665)) = 0.442$.

*Check:* combining saves $1.15\ \mathrm{km/s}$ over doing things separately, because at apogee the transfer speed and the geostationary speed are both small and the burn rotates *and* lengthens the velocity at once. Splitting saves a further $25\ \mathrm{m/s}$: a small turn at perigee costs almost nothing extra (the velocity is being lengthened a lot anyway, so a small sideways component adds little). The $0.442$ propellant fraction is why geostationary satellites launched from high latitudes carry nearly half their transfer-orbit mass as propellant — and why launches from near the equator, which need almost no plane change, are attractive for this market.
:::
:::

::: widget plot
f: sqrt(7.7258^2 + 10.1516^2 - 2*7.7258*10.1516*cos(x*pi/180)) + sqrt(1.6078^2 + 3.0747^2 - 2*1.6078*3.0747*cos((28.5 - x)*pi/180))
x: 0, 28.5
y: 4, 6.6
points: 2.2, 4.231
caption: Total $\Delta v$ in km/s for the parking-orbit-to-geostationary transfer of [[#ex-gto-plane]], against the part of the $28.5^\circ$ plane change done at perigee (degrees); the rest is done at apogee. The curve is flat near its minimum at about $2.2^\circ$ ($4.231\ \mathrm{km/s}$), so the exact split hardly matters — but doing the whole plane change at perigee (right end, $6.46\ \mathrm{km/s}$) costs over $2\ \mathrm{km/s}$ more, because that is where the speed is highest.
:::

::: warning Adding speeds that point in different directions {#warn-vector}
$\Delta v$ is the magnitude of a vector difference, $\lVert\mathbf{v}_\text{after} - \mathbf{v}_\text{before}\rVert$. Subtracting speeds, $v_\text{after} - v_\text{before}$, is correct only for a tangential burn that does not turn the velocity. Typical errors: computing a combined plane change and apogee burn as $v_{c2} - v_a = 1.47\ \mathrm{km/s}$ (forgetting the turn, which raises it to $1.83$); computing the plane change as $v\,\Delta i$ (the small-angle approximation, $8\,\%$ low at $60^\circ$); and making a plane change away from the line of nodes, where it changes the inclination by less than intended and also moves the node. Draw the velocity triangle every time.
:::

## Phasing manoeuvres {#sec-phasing}

Arriving at the right *orbit* is not enough for a rendezvous; the spacecraft must arrive at the right *place* on it at the right time. A **phasing manoeuvre** adjusts the position along the orbit. A spacecraft that is behind its target on the same circular orbit by an angle $\Delta\phi$ makes a tangential retro-burn into a slightly smaller ellipse whose period is shorter; after $k$ revolutions of the phasing orbit it returns to the burn point having gained $\Delta\phi$, and an equal forward burn restores the circular orbit. The phasing orbit's period must be
$$
T_\text{ph} = T\left(1 - \frac{\Delta\phi}{2\pi k}\right),
$$ {#eq-phasing}
with $\Delta\phi$ in radians (and with a plus sign if the spacecraft is ahead and must wait). The semi-major axis follows from the period, and the burns from vis-viva. Note the counter-intuitive direction: to catch up you slow down — dropping into a lower, faster orbit — and to fall back you speed up. Spreading the manoeuvre over more revolutions reduces the $\Delta v$, at the price of time.

::: example Catching up with a station {#ex-phasing}
A spacecraft and a space station share a circular orbit at $400\ \mathrm{km}$ altitude ($T = 5553.5\ \mathrm{s}$); the station is $10^\circ$ ahead. Design a phasing manoeuvre that closes the gap in one revolution, and another that takes three.
::: solution
One revolution: $T_\text{ph} = 5553.5\,(1 - 10/360) = 5399.2\ \mathrm{s}$, so $a_\text{ph} = \left[\mu(T_\text{ph}/2\pi)^2\right]^{1/3} = 6651.9\ \mathrm{km}$. The burn point ($r = 6778\ \mathrm{km}$) becomes apoapsis, and periapsis is at $2a_\text{ph} - 6778 = 6525.8\ \mathrm{km}$ — altitude $148\ \mathrm{km}$. Speeds: circular $7.6686$, phasing-orbit apoapsis $\sqrt{\mu(2/6778 - 1/6651.9)} = 7.5956\ \mathrm{km/s}$, so each burn is $73.0\ \mathrm{m/s}$, total $146\ \mathrm{m/s}$.

Three revolutions: $T_\text{ph} = 5553.5\,(1 - 10/1080) = 5502.0\ \mathrm{s}$, $a_\text{ph} = 6736.1\ \mathrm{km}$, periapsis altitude $316\ \mathrm{km}$, total $\Delta v = 47.8\ \mathrm{m/s}$.

*Check:* the one-revolution plan dips to $148\ \mathrm{km}$, where atmospheric drag is severe; it is unacceptable regardless of its $\Delta v$. Three revolutions cost a third as much and keep the perigee safe. Real rendezvous missions spread phasing over many orbits for exactly these reasons.
:::
:::

::: quiz
A spacecraft in circular orbit fires its engine briefly **backwards** (against its velocity). Which statements are true?
- [x] The burn point becomes the apoapsis of the new orbit.
- [x] Its orbital period decreases.
- [ ] Half an orbit later it is moving more slowly than before the burn.
- [x] If a target was just ahead of it on the original orbit, it will tend to gain on the target over the following orbits.
::: solution
A retro-burn lowers the energy, so $a$ and the period decrease; the velocity at the burn point stays horizontal, so the burn point is an apse, and since the speed there is now below circular it is the apoapsis. Half an orbit later the spacecraft is at periapsis, *lower* and therefore *faster* than in the original circle. With a shorter period, it completes orbits sooner and gains on a target in the original orbit — the basis of phasing. (Over a fraction of an orbit the relative motion is more subtle; see [[orbital-mechanics/relative-motion-rendezvous]].)
:::
:::

::: history
Walter Hohmann, a German civil engineer, analysed the energy needed to reach other bodies in *Die Erreichbarkeit der Himmelskörper* ("The Attainability of Celestial Bodies", Munich, 1925), where he showed that a transfer along an ellipse tangent to the departure and arrival orbits minimises the propellant in the two-impulse case — the manoeuvre now named after him. Hermann Oberth's *Die Rakete zu den Planetenräumen* (1923) and his later work set out the advantage of burning at high speed deep in a gravity well, now called the Oberth effect. The three-impulse bi-elliptic transfer is usually credited to Ary Sternfeld, whose 1934 note in the *Comptes rendus* of the Paris Academy of Sciences examined transfers that pass beyond the target orbit. The optimality claims for these transfers were put on a rigorous footing only in the 1960s, with the development of optimal-control theory for impulsive trajectories.
:::

## Where this leads {#sec-next}

Phasing brings a chaser within tens of kilometres of its target; the last part of a rendezvous needs the relative-motion equations of [[orbital-mechanics/relative-motion-rendezvous]]. Hohmann transfers between *planetary* orbits, combined with hyperbolic departure and arrival, are the subject of [[orbital-mechanics/interplanetary-trajectories]], where the Oberth effect reappears in the departure burn. The perturbations of [[orbital-mechanics/perturbations]] are what make station-keeping manoeuvres necessary at all.

::: summary
- High-thrust burns are modelled as impulses; the rocket equation $m_p/m_0 = 1 - e^{-\Delta v/(I_{sp}g_0)}$ converts $\Delta v$ into propellant, and $\Delta v$ budgets add.
- $\Delta\varepsilon = \mathbf{v}\cdot\Delta\mathbf{v} + \tfrac12\Delta v^2$: burn along the velocity where the speed is highest (Oberth effect). A tangential burn at an apse moves only the opposite apse.
- Hohmann transfer: two tangential burns, $\Delta v_1 = v_{c1}(\sqrt{2R/(1+R)} - 1)$, $\Delta v_2 = v_{c2}(1 - \sqrt{2/(1+R)})$, time $\pi\sqrt{a_t^3/\mu}$; optimal among two-impulse coplanar transfers. Its normalised cost peaks at $0.536$ at $R = 15.58$.
- Bi-elliptic transfers go beyond the target; they beat Hohmann for $R > 11.94$ with large $r_b$, and for any $r_b > r_2$ when $R > 15.58$ — e.g. $0.532$ against $0.536$ at $R = 15$, $r_b = 40r_1$ — at a large cost in time.
- Plane changes cost $2v\sin(\Delta i/2)$: do them where the speed is lowest, and combine them with speed changes using $\Delta v = \sqrt{v_1^2 + v_2^2 - 2v_1v_2\cos\Delta i}$.
- Phasing: to catch up, slow down into a shorter-period orbit; $T_\text{ph} = T(1 - \Delta\phi/2\pi k)$; more revolutions cost less $\Delta v$.
:::

## Exercises

::: exercise A small Hohmann transfer {level=1 check="0.274"}
Find the total $\Delta v$ for a Hohmann transfer from a circular orbit at $300\ \mathrm{km}$ altitude to one at $800\ \mathrm{km}$. (Enter the total in km/s to three significant figures.)
::: solution
$r_1 = 6678$, $r_2 = 7178$, $a_t = 6928\ \mathrm{km}$. $\Delta v_1 = \sqrt{\mu(2/6678 - 1/6928)} - \sqrt{\mu/6678} = 7.8640 - 7.7258 = 0.1382\ \mathrm{km/s}$; $\Delta v_2 = \sqrt{\mu/7178} - \sqrt{\mu(2/7178 - 1/6928)} = 7.4519 - 7.3162 = 0.1357\ \mathrm{km/s}$. Total $0.274\ \mathrm{km/s}$, close to the difference of circular speeds ($0.274$) as expected for a small change of radius. Transfer time $47.8\ \mathrm{min}$.
:::
:::

::: exercise A plane change at geostationary radius {level=1 check="0.536"}
How much $\Delta v$ does a $10^\circ$ change of inclination cost for a satellite in geostationary orbit? (Enter $\Delta v$ in km/s to three significant figures.)
::: solution
$\Delta v = 2 \times 3.0747\sin 5^\circ = 0.536\ \mathrm{km/s}$. The same $10^\circ$ in a $300\ \mathrm{km}$ orbit would cost $2 \times 7.7258\sin 5^\circ = 1.347\ \mathrm{km/s}$.
:::
:::

::: exercise Propellant for a burn {level=1 check="399"}
A $1000\ \mathrm{kg}$ spacecraft must make a $1.50\ \mathrm{km/s}$ burn with an engine of $I_{sp} = 300\ \mathrm{s}$. How much propellant does it use? (Enter the mass in kg to three significant figures.)
::: solution
$c = 300 \times 9.80665 = 2942\ \mathrm{m/s}$. $m_p = 1000\,(1 - e^{-1500/2942}) = 1000\,(1 - 0.6006) = 399\ \mathrm{kg}$.
:::
:::

::: exercise Relocating a geostationary satellite {level=2 check="13.7"}
A geostationary satellite must move $12^\circ$ eastward (ahead) along the geostationary arc in five revolutions of a phasing orbit. Find the total $\Delta v$ for the two burns. (Enter the total in m/s to three significant figures.)
::: solution
To move ahead it must go faster on average: a phasing orbit with a shorter period. $T_\text{ph} = 86\,164\,(1 - 12/(360 \times 5)) = 85\,589.6\ \mathrm{s}$, $a_\text{ph} = \left[\mu (T_\text{ph}/2\pi)^2\right]^{1/3} = 41\,976.5\ \mathrm{km}$. The burn point at $42\,164\ \mathrm{km}$ becomes apoapsis; speed there $\sqrt{\mu(2/42\,164 - 1/41\,976.5)} = 3.06779\ \mathrm{km/s}$ against $3.07466$, a retro-burn of $6.87\ \mathrm{m/s}$, repeated forward at the end: total $13.7\ \mathrm{m/s}$. (Station-keeping budgets of geostationary satellites are tens of metres per second per year, so a relocation like this is affordable.)
:::
:::

::: exercise Raising apogee or perigee {level=2 check="6.94"}
Using the results of [[#ex-oberth]], by what factor does a $0.1\ \mathrm{km/s}$ burn at perigee raise the opposite apse more than the same burn at apogee? Explain the result in terms of energy and angular momentum. (Enter the ratio of the two rises to three significant figures.)
::: solution
Perigee burn: apogee rises by $49\,160 - 42\,164 = 6996\ \mathrm{km}$; apogee burn: perigee rises by $7635 - 6628 = 1007\ \mathrm{km}$; ratio $6.94$. The energy change is $v\,\Delta v$, six times larger at perigee. The change in the opposite apse depends on the change in $a$ (energy) *and* on the lever arm: raising the far apse of a long ellipse needs less energy per kilometre than raising the near apse, which accounts for the remaining difference.
:::
:::

::: exercise Why tangential arrival matters {level=2 check="1.044"}
Compare two ways of going from a circular orbit of radius $r_1$ to one of radius $r_2 = 4r_1$: (a) the Hohmann transfer, from [[#eq-hohmann-norm]]; (b) a first tangential burn to escape speed, followed by a second burn that circularises the orbit when the spacecraft reaches $r_2$ on the resulting parabola. (Enter the cost of (b) as a multiple of $v_{c1}$, to four significant figures.)
::: solution
(a) $R = 4$: $\sqrt{8/5} - 1 + \tfrac12 - \sqrt{2/20} = 0.26491 + 0.5 - 0.31623 = 0.4487\,v_{c1}$.
(b) First burn $(\sqrt2 - 1)v_{c1} = 0.4142\,v_{c1}$. On the parabola $h = \sqrt{2\mu r_1}$; at $r_2 = 4r_1$ the speed is $\sqrt{2\mu/r_2} = 0.7071\,v_{c1}$, with transverse component $h/r_2 = \sqrt2\,v_{c1}/4 = 0.3536\,v_{c1}$ and radial component $\sqrt{0.5 - 0.125}\,v_{c1} = 0.6124\,v_{c1}$. The circular velocity there is $0.5\,v_{c1}$, horizontal, so the second burn is $\sqrt{0.6124^2 + (0.5 - 0.3536)^2}\,v_{c1} = 0.6296\,v_{c1}$. Total $1.044\,v_{c1}$ — more than twice the Hohmann cost. Arriving with a large radial velocity that must be cancelled is very wasteful; tangential departure and arrival are the point of the Hohmann geometry.
:::
:::

::: exercise Where the Hohmann cost peaks {level=3 check="15.58"}
Differentiate [[#eq-hohmann-norm]] with respect to $R$ and show that the maximum occurs at the real root of $R^3 - 15R^2 - 9R - 1 = 0$. Find it. (Enter $R$ to four significant figures.)
::: solution
Write $f(R) = \sqrt{2R/(1+R)} - 1 + R^{-1/2} - \sqrt2\,[R(1+R)]^{-1/2}$. Then
$$
f'(R) = \frac{1}{\sqrt{2R}\,(1+R)^{3/2}} - \frac{1}{2R^{3/2}} + \frac{\sqrt2\,(1 + 2R)}{2[R(1+R)]^{3/2}}.
$$
Multiplying by $2R^{3/2}(1+R)^{3/2}$: $\sqrt2\,R - (1+R)^{3/2} + \sqrt2\,(1 + 2R) = 0$, i.e. $\sqrt2\,(1 + 3R) = (1+R)^{3/2}$. Squaring, $2(1 + 3R)^2 = (1+R)^3$, which expands to $R^3 - 15R^2 - 9R - 1 = 0$. Its only positive real root (by Newton's method from $R = 15$) is $R = 15.58$, where $f = 0.5363$. Squaring could introduce a spurious root; this one satisfies the unsquared equation since both sides are positive.
:::
:::

::: exercise The optimal split of a plane change {level=3 check="2.2"}
For the transfer of [[#ex-gto-plane]], let $s$ be the plane change made at perigee and $28.5^\circ - s$ the part made at apogee. Write the total $\Delta v(s)$ and find the minimising $s$ numerically. Explain physically why the optimum is small but not zero. (Enter $s$ in degrees to one decimal place.)
::: solution
$\Delta v(s) = \sqrt{v_{c1}^2 + v_p^2 - 2v_{c1}v_p\cos s} + \sqrt{v_a^2 + v_{c2}^2 - 2v_av_{c2}\cos(28.5^\circ - s)}$. Evaluating (or setting $\mathrm{d}\Delta v/\mathrm{d}s = 0$ and solving by Newton's method): $\Delta v(0) = 4.2560$, $\Delta v(2^\circ) = 4.2316$, $\Delta v(2.2^\circ) = 4.2314$, $\Delta v(3^\circ) = 4.2349$ — minimum at $s = 2.2^\circ$. Physically, $\mathrm{d}\Delta v/\mathrm{d}s$ at $s = 0$ is zero for the perigee burn (a small sideways component added to a large in-line change costs only to second order, $\propto s^2$) but finite and negative for the apogee burn (removing a degree of turn there saves to first order). So some plane change should always be moved to perigee, until the second-order cost there catches up with the first-order saving at apogee.
:::
:::

::: exercise Design: a disposal manoeuvre {level=3}
At the end of its life a geostationary satellite must be raised to a disposal orbit about $300\ \mathrm{km}$ above the geostationary arc, as recommended by international space-debris mitigation guidelines. (a) Find the Hohmann $\Delta v$. (b) If the satellite has a dry mass of $2000\ \mathrm{kg}$ and $I_{sp} = 290\ \mathrm{s}$, how much propellant must be reserved, with a $50\,\%$ margin for uncertainty in the remaining propellant? (c) Discuss why the propellant gauge is the critical uncertainty, and whether a low-Earth-orbit satellite could use the same strategy.
::: solution
(a) $r_1 = 42\,164$, $r_2 = 42\,464\ \mathrm{km}$; $R = 1.00712$. Each burn is about $v_{c}\,(\Delta r/4r)$ for a small change: $3.0747 \times 300/(4 \times 42\,164) = 5.47\ \mathrm{m/s}$; exact evaluation of [[#eq-hohmann]] gives $\Delta v_1 = 5.44$, $\Delta v_2 = 5.44\ \mathrm{m/s}$, total $10.9\ \mathrm{m/s}$.
(b) With $c = 290 \times 9.80665 = 2844\ \mathrm{m/s}$: $m_p = 2000\,(e^{10.9/2844} - 1) = 7.7\ \mathrm{kg}$; with $50\,\%$ margin, about $11.5\ \mathrm{kg}$.
(c) There is no fuel gauge in weightlessness: remaining propellant is estimated from bookkeeping of thruster firings, from tank pressure and temperature, or by heating the tank and measuring its thermal response, each with errors of a few kilograms — comparable to the reserve, hence the margin. A low-orbit satellite is in a different situation: raising it out of the way would take far more $\Delta v$ and leave it in orbit for a very long time; the accepted strategy there is the opposite — lower the perigee so that drag removes it within a limited time (the widely used guideline was 25 years, and some agencies now require five) — see [[orbital-mechanics/perturbations]].
:::
:::
