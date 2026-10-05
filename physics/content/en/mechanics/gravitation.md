A stone dropped from the hand and the Moon in its monthly path are pulled by the same kind of force. Near the ground the stone's acceleration hardly changes over the few metres of its fall, and we package that acceleration as a constant $g$. The Moon is sixty Earth radii away, and the acceleration that bends its path is far smaller. Newton's proposal was that both facts are one law: every mass attracts every other mass with a force that falls as the inverse square of the distance between them. From that single statement he recovered the regularities Kepler had found in the planets, and he justified treating a round planet, from outside, as if all of its mass sat at the centre.

This chapter builds the working theory used for those problems. We write the force in vector form, construct the potential energy whose zero lies at infinite separation, and prove the shell theorem that makes a spherical planet so simple. Circular orbits, escape speed and the energy of a bound ellipse then follow from Newton's second law and the work–energy balance. The full proof that every bound orbit is an ellipse belongs to [[analytical-mechanics]]; what we need here is the statement, the energy formula, and enough geometry to read an orbit diagram.

Two conventions about $g$ run through the calculations, and they must not be mixed. For a stone, a lift or any other near-Earth problem that is not astronomical, take

$$
g = 9.80\,\mathrm{m/s^2},
$$

as in [[mechanics/newton-laws]] and [[mechanics/work-energy]]. For the Earth as a planet the data are the gravitational constant $G = 6.67430\times 10^{-11}\,\mathrm{N\,m^2\,kg^{-2}}$, the mass $M = 5.972\times 10^{24}\,\mathrm{kg}$ and the radius $R = 6.371\times 10^{6}\,\mathrm{m}$. Surface gravity is then something we compute, not something we insert by hand. Every numerical value below was obtained from these constants; the powers of ten are part of the working, not an afterthought.

## Newton's law of gravitation

The force is a mutual attraction along the line joining the two bodies. If the bodies are far apart compared with their size, or if the shell theorem proved later in the chapter applies, each may be replaced by a point at its centre. Let $\vec{r}$ be the vector drawn from a point mass $M$ to a point mass $m$, and write $r = \abs{\vec{r}}$ together with the unit vector $\hat{r} = \vec{r}/r$.

::: definition Newton's law of gravitation {#def-newton-grav}
The gravitational force exerted on $m$ by $M$ has magnitude $G M m / r^2$ and is attractive, directed along the line of centres from $m$ towards $M$. In vector form

$$
\vec{F} = -\frac{G M m}{r^3}\,\vec{r} = -\frac{G M m}{r^2}\,\hat{r}.
$$ {#eq-newton-vec}

The two expressions agree because $\vec{r}/r^3 = \hat{r}/r^2$. The force on $M$ due to $m$ is $-\vec{F}$, as Newton's third law requires.
:::

The constant $G$ is universal, and it is small. Two point masses of $1\,\mathrm{kg}$ a metre apart attract each other with a force of only $6.67430\times 10^{-11}\,\mathrm{N}$, which is why laboratory masses do not noticeably fall together, while planets do. The force on a test mass due to several bodies is the vector sum of the separate forces. For a general shape that sum is an integral. The exception proved below is a sphere: outside it, the integral collapses back to [[#eq-newton-vec]] with $r$ measured from the centre.

Weight, near the surface of a planet, is this force when $M$ is the planet and $r$ is its radius. For a spherical Earth the magnitude is $mg$ with

$$
g = \frac{G M}{R^2}.
$$ {#eq-surface-g}

The direction is towards the centre, which on the ground we call downward.

::: example Surface gravity from $G$, $M$ and $R$ {#ex-surface-g}
Compute $g = GM/R^2$ from the planetary data above.
::: solution
First form the product $GM$. The mantissas multiply as

$$
6.67430 \times 5.972 = 39.8589196,
$$

and the powers of ten are $10^{-11}\times 10^{24} = 10^{13}$, so

$$
GM = 3.98589196\times 10^{14}\,\mathrm{m^3\,s^{-2}}.
$$

To six figures, $GM = 3.98589\times 10^{14}\,\mathrm{m^3\,s^{-2}}$. The radius squared is

$$
R^2 = (6.371\times 10^{6})^2 = 40.589641\times 10^{12} = 4.0589641\times 10^{13}\,\mathrm{m^2},
$$

or $4.05896\times 10^{13}\,\mathrm{m^2}$ to six figures. Dividing the six-figure values,

$$
g = \frac{3.98589\times 10^{14}}{4.05896\times 10^{13}} = 9.81998\,\mathrm{m/s^2},
$$

which rounds to $9.820\,\mathrm{m/s^2}$. The unrounded product and the unrounded square give $9.81997\,\mathrm{m/s^2}$, so the three-decimal result does not depend on that rounding.
:::
:::

This $9.820\,\mathrm{m/s^2}$ is the field of a spherical Earth with the stated mass and radius, and with no rotation. The conventional standard gravity, $9.80665\,\mathrm{m/s^2}$, is smaller. Two real effects account for the gap. The Earth rotates, so a laboratory on the surface is not an inertial frame: in the rotating frame a centrifugal acceleration $\omega^2 R$ points outward at the equator. One sidereal day, the period used again for geostationary orbits below, lasts $T = 86164\,\mathrm{s}$, and

$$
\omega = \frac{2\pi}{86164} = 7.29212\times 10^{-5}\,\mathrm{rad/s}, \qquad \omega^2 R = 0.03388\,\mathrm{m/s^2}.
$$

That is a few parts in a thousand, largest at the equator and absent at the poles. The Earth is also not a uniform sphere: it bulges at the equator, and the core is denser than the crust. Between them, rotation and the departure from a uniform sphere move the measured mid-latitude gravity from $9.820$ down to the conventional $9.80665$. Neither correction belongs in an orbital calculation that uses $G$, $M$ and the distance from the centre. In problems near the ground we still take $g = 9.80\,\mathrm{m/s^2}$.

## Gravitational potential energy

Gravity is a conservative force. The work it does on $m$ as the separation changes depends only on the end-points, because the force is radial and its magnitude depends only on $r$. We may therefore store that work as a potential energy. The zero is a choice. The useful choice for astronomy puts $U = 0$ at infinite separation, where the force has fallen to nothing.

Move $m$ from separation $r$ out to infinity along a radial line. The radial component of the force on $m$ is $F_r = -GMm/r^2$, the minus sign recording that the force points towards decreasing $r$. The work done *by* gravity on that outward journey is

$$
W = \int_r^{\infty} F_r\,\dd s = \int_r^{\infty}\left(-\frac{GMm}{s^2}\right)\dd s = GMm\left[\frac{1}{s}\right]_r^{\infty} = -\frac{GMm}{r}.
$$

The change in potential energy is minus this work, $U(\infty) - U(r) = -W$. Setting $U(\infty) = 0$ gives $U(r) = -GMm/r$. The same function is recovered along any other path, because a transverse displacement is perpendicular to the force and contributes no work.

::: definition Gravitational potential energy {#def-grav-u}
The gravitational potential energy of two point masses $M$ and $m$ separated by a distance $r$, with the zero taken at infinite separation, is

$$
U(r) = -\frac{G M m}{r}.
$$ {#eq-potential}
:::

::: proposition Force from the potential {#prop-force-u}
If $U$ is given by [[#eq-potential]], the radial component of the force on $m$ is

$$
F_r = -\deriv{U}{r} = -\frac{G M m}{r^2}.
$$
:::

::: proof
Differentiating with respect to the separation,

$$
\deriv{U}{r} = \deriv{}{r}\left(-GMm\, r^{-1}\right) = GMm\, r^{-2} = \frac{GMm}{r^2}.
$$

Hence $F_r = -\deriv{U}{r} = -GMm/r^2$, which is the radial component already stated in [[#def-newton-grav]]. The transverse components are zero. The vector force is therefore $-GMm\,\hat{r}/r^2$.
:::

The minus sign in $U$ is not optional once the zero has been fixed at infinity. The potential energy is negative at every finite separation, and it becomes more negative as the masses approach. Separating them to infinity takes a positive amount of work, $-U(r) = GMm/r$.

Near the Earth we do not measure heights from infinity, and [[mechanics/work-energy]] uses $mgy$ with a zero on the floor or the desk. The two expressions agree on *differences* over a short vertical interval. Let the surface lie at distance $R$ from the centre and a point above it at distance $R + h$. Then

$$
\begin{aligned}
U(R+h) - U(R)
&= -\frac{GMm}{R+h} + \frac{GMm}{R}
= GMm\left(\frac{1}{R} - \frac{1}{R+h}\right)
= \frac{GMm\, h}{R(R+h)}.
\end{aligned}
$$

Since $g = GM/R^2$, the same difference is

$$
U(R+h) - U(R) = mgh \cdot \frac{R}{R+h}.
$$ {#eq-mgh-exact}

When $h \ll R$ the factor $R/(R+h)$ is indistinguishable from $1$, and the difference collapses to $mgh$. The exact fractional error committed by writing $mgh$ instead of [[#eq-mgh-exact]], using this same $g$, is

$$
\frac{mgh - \bigl(U(R+h)-U(R)\bigr)}{mgh} = 1 - \frac{R}{R+h} = \frac{h}{R+h}.
$$

::: example A lift of one hundred metres {#ex-lift}
For $m = 1.00\,\mathrm{kg}$ and $h = 100\,\mathrm{m}$, compare the exact potential difference with $mgh$.
::: solution
With $GM = 3.98589196\times 10^{14}\,\mathrm{m^3\,s^{-2}}$ and $R + h = 6.3711\times 10^{6}\,\mathrm{m}$,

$$
U(R+h) - U(R) = \frac{(3.98589196\times 10^{14})(100)}{(6.371\times 10^{6})(6.3711\times 10^{6})} = 981.982\,\mathrm{J}.
$$

The consistent near-surface weight uses $g = GM/R^2 = 9.81997\,\mathrm{m/s^2}$, so

$$
mgh = (9.81997)(100) = 981.997\,\mathrm{J}.
$$

The two values differ by $0.015\,\mathrm{J}$. The fractional difference is

$$
\frac{h}{R+h} = \frac{100}{6.3711\times 10^{6}} = 1.570\times 10^{-5},
$$

which is $1.6\times 10^{-5}$ to two significant figures. Over a hundred metres the curvature of the field is a correction of order one part in $10^{5}$. That is why [[mechanics/work-energy]] could use $mgy$ without further comment.

A separate, larger discrepancy appears if the working value $g = 9.80\,\mathrm{m/s^2}$ is used instead of $GM/R^2$: then $mgh = 980\,\mathrm{J}$. The two-part-in-a-thousand gap between $9.80$ and $9.820$ matters more, for this particular lift, than the finite height of the lift. Both are negligible in ordinary mechanics problems. Neither remains negligible for a satellite.
:::
:::

## The shell theorem

[[#eq-newton-vec]] was stated for point masses. The Earth is not a point. What makes the point-mass formula legitimate, for every observer outside a spherical planet, is a cancellation proved by Newton and reproduced here in modern notation.

::: theorem Shell theorem {#thm-shell}
Let a mass $M$ be spread uniformly on a thin spherical shell of radius $a$. At a point outside the shell, a distance $r > a$ from the centre, the gravitational field is identical to the field of a point mass $M$ placed at the centre. At a point inside the shell, a distance $r < a$ from the centre, the gravitational field is zero.
:::

The field here means the acceleration of a test mass, so that the force on a mass $m$ is $m\vec{g}$. Outside, $\vec{g} = -(GM/r^2)\hat{r}$.

::: proof
Let $O$ be the centre and $P$ the point where the field is required, with $OP = r$. Cut the shell into rings about the axis $OP$. A ring at angle $\alpha$ from that axis, of angular width $\dd\alpha$, has radius $a\sin\alpha$ and width $a\,\dd\alpha$, so its area is $2\pi a\sin\alpha \cdot a\,\dd\alpha = 2\pi a^2 \sin\alpha\,\dd\alpha$. The surface density is $M/(4\pi a^2)$, and the mass of the ring is

$$
\dd m = \frac{M}{4\pi a^2}\cdot 2\pi a^2\sin\alpha\,\dd\alpha = \frac{M}{2}\sin\alpha\,\dd\alpha.
$$

Every element of the ring lies at the same distance $s$ from $P$. The cosine rule in the triangle formed by $O$, $P$ and a point of the ring gives the geometric identity

$$
s^2 = r^2 + a^2 - 2ra\cos\alpha.
$$

The field of a single element points from $P$ towards that element. Resolve it into a component along $OP$ and a component perpendicular to $OP$. The perpendicular pieces cancel in opposite pairs around the ring: for every element there is another with the opposite transverse component, and the ring is uniform. Only the axial component survives. If the positive sense is the direction of increasing $r$, that component of the acceleration due to the ring is

$$
\dd g_r = \frac{G\,\dd m}{s^2}\cdot \frac{a\cos\alpha - r}{s} = \frac{G\,\dd m\,(a\cos\alpha - r)}{s^3}.
$$

The fraction $(a\cos\alpha - r)/s$ is the cosine of the angle between the outward radial direction and the line from $P$ to the ring. It is negative when the ring lies inward of $P$ and pulls back towards $O$.

Substitute $\dd m$ and integrate $\alpha$ from $0$ to $\pi$, so that the rings cover the shell once. The algebra is shorter after a change of variable from $\alpha$ to $s$. Differentiating the cosine rule produces $s\,\dd s = ra\sin\alpha\,\dd\alpha$, and solving the same rule for the cosine produces $a\cos\alpha - r = (a^2 - r^2 - s^2)/(2r)$. As $\alpha$ runs from $0$ to $\pi$, the distance $s$ runs from $\abs{r - a}$ up to $r + a$. Carrying out the substitution yields the integral actually evaluated:

$$
g_r = \frac{GM}{4ar^2}\int_{\abs{r-a}}^{r+a}\left(\frac{a^2 - r^2}{s^2} - 1\right)\dd s.
$$

An antiderivative is $-(a^2 - r^2)/s - s$.

Outside, $r > a$, the limits are $r - a$ and $r + a$. Using $r^2 - a^2 = (r - a)(r + a)$,

$$
\begin{aligned}
\left[-\frac{a^2 - r^2}{s} - s\right]_{r-a}^{r+a}
&= \bigl((r - a) - (r + a)\bigr) - \bigl((r + a) - (r - a)\bigr) \\
&= (-2a) - (2a) = -4a.
\end{aligned}
$$

Therefore $g_r = GM/(4ar^2)\cdot(-4a) = -GM/r^2$. The field is attractive and equal to the field of a point mass $M$ at the centre.

Inside, $r < a$, the limits are $a - r$ and $a + r$. The same antiderivative now takes the value $-2a$ at both limits, because

$$
-\frac{a^2 - r^2}{a+r} - (a+r) = -(a - r) - (a + r) = -2a
$$

and

$$
-\frac{a^2 - r^2}{a-r} - (a - r) = -(a + r) - (a - r) = -2a.
$$

The definite integral vanishes, so $g_r = 0$. Contributions from the near side of the shell and the far side cancel. The near side pulls harder, being closer, but the far side contains more mass, and for an inverse-square force in three dimensions those two effects balance exactly.
:::

Outside a spherical planet the field is $GM/r^2$ towards the centre, even if the density varies with radius: each uniform shell contributes as a point at the centre. Inside a cavity surrounded by a uniform shell the field of that shell is zero. The formulas do not survive a mountain, a cube, or the equatorial bulge. They also say nothing yet about a point inside the material of a solid ball.

::: proposition Field inside a uniform solid sphere {#prop-inside}
Let a total mass $M$ be distributed with uniform density through a solid sphere of radius $R$. At a distance $r < R$ from the centre the gravitational field has magnitude

$$
g(r) = \frac{G M r}{R^3},
$$ {#eq-inside}

directed towards the centre.
:::

::: proof
Draw the sphere of radius $r$ concentric with the planet. Split the Earth into that inner ball and a stack of shells with radii from $r$ to $R$. A point at distance $r$ is *inside* every one of those outer shells, so [[#thm-shell]] gives zero field from all of them. Only the mass within radius $r$ contributes, and the point is outside that inner ball, so the inner ball acts as a point mass at the centre.

Uniform density means the enclosed mass scales with the volume. The density is $\rho = M\big/\bigl(\tfrac{4}{3}\pi R^3\bigr)$, and the mass inside radius $r$ is

$$
M(r) = \rho\cdot\frac{4}{3}\pi r^3 = M\frac{r^3}{R^3}.
$$

The field magnitude is therefore

$$
g(r) = \frac{G M(r)}{r^2} = \frac{G M r}{R^3}.
$$

The direction is towards the centre. At $r = R$ the expression agrees with $GM/R^2$. At $r = 0$ it gives zero, as symmetry demands: no direction is singled out.
:::

::: example Halfway to the centre, in a uniform Earth {#ex-mine}
On the uniform-density model, what is the field magnitude at $r = R/2$?
::: solution
[[#eq-inside]] at $r = R/2$ is half the surface value computed in [[#ex-surface-g]]:

$$
g(R/2) = \frac{1}{2}\cdot 9.820 = 4.910\,\mathrm{m/s^2}.
$$

Equivalently, $g(r) = g(R)\cdot(r/R)$. This is the field of a uniform ball. The real Earth has a dense core, so the field in the crust does not fall in this linear way.
:::
:::

Inside a thin shell the field is zero, so the potential is constant. Matching $U = -GMm/a$ on the shell shows that the same value holds everywhere inside: zero force does not mean zero potential. The potential inside the material of a uniform solid sphere is a different function, obtained by integrating [[#eq-inside]]. An exercise at the end of the chapter does that integral.

## Circular orbits and escape

Consider a satellite of mass $m$ in a circular orbit of radius $r$ about a fixed spherical body of mass $M$. The fixed-body assumption is excellent when $M$ is a planet and $m$ is a spacecraft; a binary star needs the reduced mass, which we do not need here. The acceleration towards the centre has magnitude $v^2/r$. Gravity supplies it.

::: theorem Circular orbits {#thm-circular}
In a circular orbit of radius $r$ about a spherical mass $M$,

$$
v = \sqrt{\frac{GM}{r}}, \qquad T^2 = \frac{4\pi^2 r^3}{GM},
$$ {#eq-kepler}

where $v$ is the orbital speed and $T$ is the period. The mechanical energy is

$$
E = -\frac{GMm}{2r},
$$ {#eq-circ-energy}

with $U$ zero at infinity. The escape speed from rest at radius $r$, meaning the speed that lets the body reach infinity with nothing to spare, is

$$
v_{\mathrm{esc}} = \sqrt{\frac{2GM}{r}} = \sqrt{2}\, v.
$$ {#eq-escape}
:::

The relation $T^2 \propto r^3$ is Kepler's third law in the special case of a circular orbit about a body fixed at the centre. The elliptical form, with the semi-major axis in place of $r$, is stated in the next section.

::: proof
Newton's second law along the inward radial direction equates mass times centripetal acceleration to the gravitational force:

$$
\frac{m v^2}{r} = \frac{G M m}{r^2}.
$$

The satellite mass $m$ cancels, provided $m \neq 0$. Hence $v^2 = GM/r$ and $v = \sqrt{GM/r}$. The period does not depend on the mass of the orbiting body.

The satellite travels a circumference $2\pi r$ in one period, so $T = 2\pi r/v$. Squaring and eliminating $v$,

$$
T^2 = \frac{4\pi^2 r^2}{v^2} = \frac{4\pi^2 r^2}{GM/r} = \frac{4\pi^2 r^3}{GM}.
$$

The kinetic energy is $\tfrac{1}{2}mv^2 = \tfrac{1}{2}m(GM/r) = GMm/(2r)$. Adding the potential,

$$
E = \frac{GMm}{2r} + \left(-\frac{GMm}{r}\right) = -\frac{GMm}{2r}.
$$

For escape, the total energy must be at least the energy of a body at rest at infinity, which is zero. Setting $\tfrac{1}{2}m v_{\mathrm{esc}}^2 - GMm/r = 0$ gives $v_{\mathrm{esc}}^2 = 2GM/r$. Comparing with $v^2 = GM/r$ produces the factor $\sqrt{2}$.
:::

Negative total energy has a direct meaning, and it does not require the ellipse theorem. Suppose $E < 0$ and the body could reach arbitrarily large $r$. At large separation $U$ tends to $0$ from below, so the kinetic energy $E - U$ would tend to $E$ and would become negative, which is impossible. A body with $E < 0$ is **bound**: there is a maximum separation it can reach. A body with $E > 0$ is unbound and reaches infinity with kinetic energy left over. The boundary case $E = 0$ reaches infinity with zero speed left over, which is the escape trajectory of [[#eq-escape]].

On a circular orbit the kinetic energy is $K = GMm/(2r) = -E$, and the potential energy is $U = -GMm/r = 2E$. The kinetic energy is half the magnitude of the potential energy. A higher circular orbit is slower, but its total energy is less negative, so it is less tightly bound.

::: example Speeds at the surface {#ex-surface-speeds}
Find the circular-orbit speed and the escape speed at $r = R$ for the Earth, ignoring the atmosphere and the planet's rotation.
::: solution
From the product already computed, $GM/R = 3.98589196\times 10^{14}/6.371\times 10^{6} = 6.256305\times 10^{7}\,\mathrm{m^2\,s^{-2}}$. Then

$$
v = \sqrt{\frac{GM}{R}} = \sqrt{6.256305\times 10^{7}} = 7.90968\times 10^{3}\,\mathrm{m/s} = 7.910\,\mathrm{km/s},
$$

and

$$
v_{\mathrm{esc}} = \sqrt{2}\cdot v = \sqrt{1.251261\times 10^{8}} = 1.11860\times 10^{4}\,\mathrm{m/s} = 11.19\,\mathrm{km/s}.
$$

Equivalently, $v_{\mathrm{esc}} = \sqrt{2GM/R} = 1.119\times 10^{4}\,\mathrm{m/s}$. Both numbers ignore the atmosphere. Drag would remove most of this energy from a projectile launched at the ground; the escape speed is the speed still required once the rocket has left the dense air.
:::
:::

::: example A low orbit at $400\,\mathrm{km}$ {#ex-leo}
A satellite orbits at altitude $400\,\mathrm{km}$, so $r = R + 4.00\times 10^{5} = 6.771\times 10^{6}\,\mathrm{m}$. Find its speed and its period.
::: solution
$$
\frac{GM}{r} = \frac{3.98589196\times 10^{14}}{6.771\times 10^{6}} = 5.886711\times 10^{7}\,\mathrm{m^2\,s^{-2}},
$$

$$
v = \sqrt{\frac{GM}{r}} = 7.67249\times 10^{3}\,\mathrm{m/s} = 7.672\,\mathrm{km/s}.
$$

The period is the circumference divided by this speed:

$$
T = \frac{2\pi r}{v} = \frac{2\pi\times 6.771\times 10^{6}}{7.67249\times 10^{3}} = 5.54493\times 10^{3}\,\mathrm{s}.
$$

To four significant figures, $T = 5.545\times 10^{3}\,\mathrm{s}$. In minutes,

$$
\frac{T}{60} = 92.42\,\mathrm{min},
$$

which is $92.4\,\mathrm{min}$ to three significant figures. The surface circular speed was $7.910\,\mathrm{km/s}$; climbing by $400\,\mathrm{km}$ has lowered the speed by a few hundred metres per second. A real satellite at this height still meets a little air and must be reboosted. The ideal orbit above has no drag.
:::
:::

::: example The geostationary radius {#ex-geo}
Find the radius of a circular equatorial orbit whose period equals one sidereal day, $T = 86164\,\mathrm{s}$, and the corresponding altitude.
::: solution
Solve [[#eq-kepler]] for the radius, $r^3 = GM T^2/(4\pi^2)$. The square of the period is $T^2 = 86164^2 = 7.424235\times 10^{9}\,\mathrm{s^2}$, and $4\pi^2 = 39.478418$, so

$$
r^3 = \frac{(3.98589196\times 10^{14})(7.424235\times 10^{9})}{39.478418} = 7.495791\times 10^{22}\,\mathrm{m^3}.
$$

The real cube root is

$$
r = (7.495791\times 10^{22})^{1/3} = 4.21637\times 10^{7}\,\mathrm{m},
$$

which is $4.216\times 10^{7}\,\mathrm{m}$ to four significant figures. The altitude above the surface is

$$
r - R = 4.21637\times 10^{7} - 6.371\times 10^{6} = 3.57927\times 10^{7}\,\mathrm{m}.
$$

To four significant figures the altitude is $3.579\times 10^{7}\,\mathrm{m}$, or $35{,}790\,\mathrm{km}$.

The period has to be the sidereal day, not the mean solar day of $86400\,\mathrm{s}$. Noon to noon is the time in which the Earth turns once relative to the Sun. In that same interval the Earth has also travelled about one degree along its orbit, so relative to the stars it has turned through about $361^{\circ}$, not $360^{\circ}$. A satellite with period $86400\,\mathrm{s}$ would return to the same direction among the stars only after the Earth had turned a little further, and it would drift westward by about one degree of longitude each day. Matching the Earth's rotation relative to the stars, which takes $86164\,\mathrm{s}$, is what holds the satellite over one meridian.
:::
:::

::: warning Do not use mgh for a satellite
The replacement of [[#eq-mgh-exact]] by $mgh$ assumes a height tiny compared with $R$, and it assumes a constant $g$. A satellite's distance from the centre changes by a planetary amount, and $g$ at altitude $400\,\mathrm{km}$ is already smaller than $g$ at the surface by the factor $(R/r)^2 \approx 0.89$. Using $mgh$ for the energy of an orbit, or treating $g$ as constant from the ground up to geostationary altitude, produces numbers that are simply unrelated to the motion.

A second, independent trap is the sign of the energy. With the zero at infinity, $U$ is negative, and a circular orbit has negative total energy [[#eq-circ-energy]]. Negative energy means the orbit is bound. Adding a positive "potential energy $mgh$" on top of a kinetic energy, as though the zero lay on the ground, gives a positive total and suggests that the satellite is already unbound. It is not.
:::

## Ellipses

Circular orbits are a thin subset of the motions an inverse-square force allows. The general classification is classical, and we state it as a theorem whose proof is not reproduced in this chapter.

::: theorem Bound orbits are ellipses {#thm-ellipse}
In an inverse-square field, a bound orbit — an orbit whose mechanical energy satisfies $E < 0$ — is an ellipse with the centre of force at one focus. If $a$ is the semi-major axis, the energy is

$$
E = -\frac{G M m}{2a}.
$$ {#eq-ellipse-energy}

A circular orbit is the special case $a = r$. The boundary value $E = 0$ gives a parabola, and $E > 0$ gives a hyperbola, again with the centre of force at the focus.
:::

The proof is in [[analytical-mechanics]], in the chapter on central forces, and it is the argument of Newton's *Principia*. One conserves energy and angular momentum, reduces the motion to an orbit equation in the polar angle, and recognises a conic section. The equal-area law holds for any central force, because any central force conserves angular momentum. The elliptical shape, and $T^2 = 4\pi^2 a^3/(GM)$, are the parts that single out the inverse square.

[[#eq-ellipse-energy]] depends on $a$ and on nothing else, so a long thin ellipse and a circle of radius $a$ are equally bound. The speed is greatest at the near end, where $U$ is most negative, and least at the far end. The vis-viva exercise turns that remark into a formula.

::: widget orbit
GM: 1
r: 1.4
vt: 0.85
caption: GM is 1 in the figure's units. The circular speed at r = 1.4 is about 0.845 and the escape speed is about 1.195. The preset tangential speed 0.85 is just above circular, so the orbit is a bound ellipse. Raise the speed past escape and the curve opens into a hyperbola.
:::

::: example The preset orbit in the figure {#ex-preset}
In the units of the figure, $GM = 1$ and the satellite is launched from $r = 1.4$ with tangential speed $v_t = 0.85$. Compute the specific energy, and compare $v_t$ with the circular and escape speeds.
::: solution
Specific energy is energy per unit mass, $\varepsilon = E/m = \tfrac{1}{2}v_t^2 - GM/r$. Substituting the preset,

$$
\varepsilon = \frac{1}{2}(0.85)^2 - \frac{1}{1.4} = 0.36125 - 0.714286 = -0.353036,
$$

which is $-0.353$ to three decimal places. The value is negative, so the trajectory is bound. The circular speed at the same radius is

$$
\sqrt{\frac{1}{1.4}} = \sqrt{0.714286} = 0.84515,
$$

about $0.845$, and the escape speed is

$$
\sqrt{\frac{2}{1.4}} = \sqrt{1.42857} = 1.19523,
$$

about $1.195$. The preset $0.85$ lies just above circular and well below escape, so the orbit is a shallow ellipse rather than an exact circle: the circular specific energy would be $-1/(2\times 1.4) = -0.357$, and $-0.353$ is slightly higher, with semi-major axis $a = -1/(2\varepsilon) = 1.416$. Raising the speed past $1.195$ makes $\varepsilon$ positive and opens the curve into a hyperbola.
:::
:::

::: intuition A well whose rim is at zero
Plot $U(r) = -GMm/r$ against $r$. The curve climbs towards zero as $r$ grows. A horizontal line of constant energy that lies below zero meets the curve at a finite turning point, so the body is bound. A line above zero never meets the curve, and the body reaches infinity. Escape is the line that meets the curve only at infinity. On a circular orbit the kinetic energy fills half the depth of the well, leaving the total halfway between $U(r)$ and zero.
:::

::: quiz
A satellite is in a circular orbit. Its engines fire briefly, in the direction of motion, and raise the speed by a few percent, not enough to reach escape speed. Which description of the new orbit is right?
- [ ] The satellite falls to the Earth, because only one speed is allowed at that radius.
- [x] The new orbit is a bound ellipse, with the burn point as the nearest point to the centre.
- [ ] The new orbit is a hyperbola, because any increase of speed unbinds the satellite.
- [ ] The satellite moves at once onto a larger circle.
::: solution
An instantaneous tangential burn leaves $r$ unchanged, so $U$ is unchanged, while $K$ increases. If the new speed is still below escape, $E$ remains negative and [[#thm-ellipse]] puts the satellite on an ellipse. The radial velocity is still zero and the speed now exceeds the circular value, so the burn point is the near end of that ellipse. A larger circle would require a *smaller* speed, and a second burn out at the far end.
:::
:::

::: history
Kepler published the ellipse and the equal-area law in *Astronomia nova* (1609), and the relation between period and orbital size in *Harmonices mundi* (1619). The laws were read off the observations, above all Tycho Brahe's observations of Mars; they did not say what force produced the motion. Newton's *Philosophiae Naturalis Principia Mathematica* (1687) supplied the force. From an attraction falling as the inverse square of the distance, together with his laws of motion, he derived all three of Kepler's laws. The geometrical shell theorem that lets a spherical Earth act as a point is in the same book.

The strength of the attraction remained unknown until the masses could be separated from $G$. Henry Cavendish, in 1798, measured the attraction between lead spheres with a torsion balance and from it found the mean density of the Earth. The gravitational constant $G$ quoted in this chapter is the modern way of reporting what that kind of experiment determines.
:::

## Where this leads

Mercury's perihelion and the bending of light are where [[relativity]] replaces this chapter. At orbital speeds of order $8\,\mathrm{km/s}$ the Newtonian theory is the one to use, and it should not be patched with a factor taken from special relativity. The proof that was only stated here is given in [[analytical-mechanics]]. The shell theorem is the reason a later calculation can keep writing $GM/r$ for a spherical planet.

::: summary
- The force on $m$ due to $M$ is attractive, of magnitude $GMm/r^2$, along the line of centres. With $\vec{r}$ drawn from $M$ to $m$, the vector form is $\vec{F} = -GMm\,\vec{r}/r^3$ ([[#def-newton-grav]], [[#eq-newton-vec]]).
- For a spherical Earth, $g = GM/R^2 = 9.820\,\mathrm{m/s^2}$. Standard gravity $9.80665\,\mathrm{m/s^2}$ differs because the Earth rotates and is not a uniform sphere. Near the ground, problems still use $g = 9.80\,\mathrm{m/s^2}$.
- With the zero at infinity, $U = -GMm/r$ and $F_r = -\deriv{U}{r}$. The difference $U(R+h) - U(R)$ equals $mgh\cdot R/(R+h)$, and for $h = 100\,\mathrm{m}$ this differs from $mgh$ by the fraction $h/(R+h) \approx 1.6\times 10^{-5}$.
- A uniform spherical shell acts as a point mass at the centre for every exterior point, and it produces no field inside ([[#thm-shell]]). Inside a uniform solid sphere, $g(r) = GMr/R^3$.
- A circular orbit has $v = \sqrt{GM/r}$, period fixed by $T^2 = 4\pi^2 r^3/(GM)$, and energy $E = -GMm/(2r)$. The escape speed is $\sqrt{2}$ times the circular speed.
- A bound orbit in an inverse-square field is an ellipse with the centre of force at one focus and $E = -GMm/(2a)$. Negative energy means the body cannot reach infinity.
- At the Earth's surface the ideal escape speed is $11.19\,\mathrm{km/s}$ and the circular speed is $7.910\,\mathrm{km/s}$. A circular orbit at altitude $400\,\mathrm{km}$ takes $92.4\,\mathrm{min}$. A geostationary orbit uses the sidereal day, $86164\,\mathrm{s}$, and flies at an altitude of about $35{,}790\,\mathrm{km}$.
:::

## Exercises

::: exercise Two laboratory masses {level=1 check="6.67430e-11*8*2/(0.4^2)"}
Find the magnitude of the gravitational force between a point mass of $8.00\,\mathrm{kg}$ and a point mass of $2.00\,\mathrm{kg}$ whose centres are $0.400\,\mathrm{m}$ apart.
::: solution
[[#eq-newton-vec]] gives the magnitude $F = G m_1 m_2 / r^2$. Substituting the data,

$$
F = \frac{(6.67430\times 10^{-11})(8.00)(2.00)}{(0.400)^2} = \frac{1.067888\times 10^{-9}}{0.160} = 6.67430\times 10^{-9}\,\mathrm{N}.
$$

The force is about $6.67\,\mathrm{nN}$, attractive, along the line of centres. It is real, and it is far below the weight of either mass, which is tens of newtons.
:::
:::

::: exercise Twice as far from the centre {level=1 check="9.820/4"}
In the spherical model of this chapter the field at the surface has magnitude $9.820\,\mathrm{m/s^2}$. Find the field magnitude at distance $2R$ from the centre.
::: solution
Outside a spherical body the field falls as $1/r^2$. Doubling the distance divides the field by four:

$$
g(2R) = \frac{GM}{(2R)^2} = \frac{1}{4}\cdot\frac{GM}{R^2} = \frac{9.820}{4} = 2.455\,\mathrm{m/s^2}.
$$

The direction is still towards the centre. This is not the interior formula [[#eq-inside]], which applies only for $r < R$; at $r = 2R$ we are outside, and the whole mass contributes.
:::
:::

::: exercise Circular speed at the surface {level=1 check="sqrt(6.67430e-11*5.972e24/6.371e6)"}
Compute the circular-orbit speed, in $\mathrm{m/s}$, for an orbit of radius equal to the Earth's radius $R = 6.371\times 10^{6}\,\mathrm{m}$. Use $G = 6.67430\times 10^{-11}$ and $M = 5.972\times 10^{24}$.
::: solution
[[#thm-circular]] gives $v = \sqrt{GM/R}$. The value of the square root is

$$
v = \sqrt{\frac{(6.67430\times 10^{-11})(5.972\times 10^{24})}{6.371\times 10^{6}}} = \sqrt{6.256305\times 10^{7}} = 7909.68\,\mathrm{m/s}.
$$

To four significant figures this is $7.910\,\mathrm{km/s}$, as in [[#ex-surface-speeds]]. The exact answer accepted by the check is the square root itself.
:::
:::

::: exercise Where the field has halved {level=2 check="6.371e6*(sqrt(2)-1)"}
At what altitude $h$ above the surface of a spherical Earth does the gravitational acceleration fall to half its surface value? Ignore rotation. Give $h$ in metres.
::: hint
Set $GM/(R+h)^2$ equal to half of $GM/R^2$, and solve for $R+h$ before subtracting $R$.
:::
::: solution
The exterior field is $GM/r^2$, so the condition $g(r) = \tfrac{1}{2} g(R)$ reads

$$
\frac{GM}{(R+h)^2} = \frac{1}{2}\cdot\frac{GM}{R^2}.
$$

Cancel $GM$ and invert both sides: $(R+h)^2 = 2R^2$, so $R+h = R\sqrt{2}$, taking the positive root. Therefore

$$
h = R(\sqrt{2} - 1) = (6.371\times 10^{6})(1.41421356 - 1) = 2.638955\times 10^{6}\,\mathrm{m}.
$$

The altitude is about $2640\,\mathrm{km}$. Half gravity is not reached by a modest climb; $r$ itself must grow by the factor $\sqrt{2}$, because the field depends on the square of the distance from the centre, not on the altitude.
:::
:::

::: exercise The energy bill for a low orbit {level=2 check="6.67430e-11*5.972e24*500*(1/6.371e6 - 1/(2*(6.371e6+4e5)))"}
A satellite of mass $500\,\mathrm{kg}$ is at rest on the surface of a spherical, non-rotating Earth with no atmosphere. How much mechanical energy must be supplied to place it in a circular orbit at altitude $400\,\mathrm{km}$?
::: hint
The energy on the surface, at rest, is $-GMm/R$. The energy in the circular orbit is $-GMm/(2r)$ with $r = R + 4.00\times 10^{5}\,\mathrm{m}$. The rockets must supply the difference.
:::
::: solution
Take $U = 0$ at infinity. The satellite begins at rest, so its energy is purely potential:

$$
E_{\mathrm{i}} = -\frac{GMm}{R}.
$$

In the circular orbit, [[#eq-circ-energy]] gives $E_{\mathrm{f}} = -GMm/(2r)$ with $r = 6.771\times 10^{6}\,\mathrm{m}$. The energy that must be supplied is

$$
\Delta E = GMm\left(\frac{1}{R} - \frac{1}{2r}\right).
$$

Inserting $m = 500$,

$$
\Delta E = (6.67430\times 10^{-11})(5.972\times 10^{24})(500)\left(\frac{1}{6.371\times 10^{6}} - \frac{1}{2\times 6.771\times 10^{6}}\right)
= 1.656475\times 10^{10}\,\mathrm{J}.
$$

Per kilogram the cost is about $33\,\mathrm{MJ/kg}$. Using $mgh$ with $h = 400\,\mathrm{km}$ would give only $1.96\times 10^{9}\,\mathrm{J}$, too small by a factor of about eight.
:::
:::

::: exercise Semi-major axis after a burn {level=2 check="1/(2/7e6 - 8500^2/(6.67430e-11*5.972e24))"}
At distance $r = 7.00\times 10^{6}\,\mathrm{m}$ from the Earth's centre a spacecraft has speed $8.50\,\mathrm{km/s}$, with the velocity perpendicular to the radius. Find the semi-major axis of the resulting orbit.
::: hint
Compute the specific energy $\varepsilon = v^2/2 - GM/r$. If it is negative, [[#eq-ellipse-energy]] says $\varepsilon = -GM/(2a)$.
:::
::: solution
Work per unit mass, with $v = 8.50\times 10^{3}\,\mathrm{m/s}$ and $GM = 3.98589196\times 10^{14}\,\mathrm{m^3\,s^{-2}}$:

$$
\varepsilon = \frac{1}{2}(8500)^2 - \frac{GM}{7.00\times 10^{6}} = 3.6125\times 10^{7} - 5.69413\times 10^{7} = -2.08163\times 10^{7}\,\mathrm{J/kg}.
$$

The energy is negative, so the orbit is an ellipse. From $\varepsilon = -GM/(2a)$,

$$
a = -\frac{GM}{2\varepsilon} = \frac{1}{2/r - v^2/(GM)} = 9.573962\times 10^{6}\,\mathrm{m}.
$$

The launch radius is smaller than $a$, and the speed $8.50\,\mathrm{km/s}$ exceeds the local circular speed $\sqrt{GM/r} = 7.546\,\mathrm{km/s}$ while remaining below the local escape speed $10.67\,\mathrm{km/s}$. The spacecraft is at perigee. The same arithmetic is what the figure in this chapter does for its preset, with $GM = 1$.
:::
:::

::: exercise A tunnel through a uniform Earth {level=3 check="2*pi*sqrt((6.371e6)^3/(6.67430e-11*5.972e24))"}
A straight frictionless tunnel is bored through a uniform Earth of mass $M$ and radius $R$, along a diameter. A test mass is released from rest at the surface end. Show that the motion is simple harmonic, find the period, and show that this period equals the period of a circular orbit at radius $R$. Evaluate the period in seconds with the values of $G$, $M$ and $R$ used in the chapter.
::: hint
Along the tunnel the field is the interior field of [[#prop-inside]], and it points towards the centre, so the component along the tunnel is proportional to the displacement from the centre and opposes it.
:::
::: solution
Let $x$ be the displacement from the centre along the tunnel, positive towards one mouth. At position $x$ the field magnitude is $g = GM\abs{x}/R^3$, directed towards the centre, so the acceleration along the tunnel is

$$
\ddot{x} = -\frac{GM}{R^3}\, x.
$$

This is the simple-harmonic equation $\ddot{x} = -\omega^2 x$ with $\omega^2 = GM/R^3$. The period is

$$
T = \frac{2\pi}{\omega} = 2\pi\sqrt{\frac{R^3}{GM}}.
$$

A circular orbit at radius $R$ has speed $\sqrt{GM/R}$ and period

$$
T_{\mathrm{circ}} = \frac{2\pi R}{\sqrt{GM/R}} = 2\pi\sqrt{\frac{R^3}{GM}},
$$

the same number. The released mass reaches the other mouth in half a period and returns in a full period, with amplitude $R$.

Numerically,

$$
T = 2\pi\sqrt{\frac{(6.371\times 10^{6})^3}{(6.67430\times 10^{-11})(5.972\times 10^{24})}} = 5060.91\,\mathrm{s},
$$

which is $84.35\,\mathrm{min}$. The result is for a uniform Earth. A straight frictionless tunnel along any chord has the same period: the component of the interior field along the chord is still proportional to the distance from the chord's midpoint, with the same constant $GM/R^3$.
:::
:::

::: exercise Vis-viva, and a transfer to geostationary radius {level=3 check="sqrt(6.67430e-11*5.972e24*(2/6.771e6 - 2/(6.771e6+4.216e7)))"}
Derive the vis-viva relation: on an orbit of semi-major axis $a$ about a fixed mass $M$, the speed at distance $r$ satisfies $v^2 = GM(2/r - 1/a)$. Then take a transfer ellipse whose nearest point is at altitude $400\,\mathrm{km}$ ($r_p = 6.771\times 10^{6}\,\mathrm{m}$) and whose farthest point is at the geostationary radius $r_a = 4.216\times 10^{7}\,\mathrm{m}$. Find the speed at the nearest point.
::: hint
Equate $\tfrac{1}{2}mv^2 - GMm/r$ to $-GMm/(2a)$. For the ellipse, the semi-major axis is the average of the nearest and farthest radii, because those two points are the ends of the major axis.
:::
::: solution
[[#eq-ellipse-energy]] says the total energy is $-GMm/(2a)$ at every point of the orbit. At a point where the separation is $r$ and the speed is $v$,

$$
\frac{1}{2} m v^2 - \frac{GMm}{r} = -\frac{GMm}{2a}.
$$

Divide through by $m$ and multiply by $2$:

$$
v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right).
$$

That is the vis-viva relation. It reduces to $v^2 = GM/r$ on a circle, where $a = r$, and to $v^2 = 2GM/r$ on a parabola, where $a$ is infinite and $E = 0$.

The nearest and farthest points of an ellipse are separated by the major axis, so

$$
a = \frac{r_p + r_a}{2} = \frac{6.771\times 10^{6} + 4.216\times 10^{7}}{2} = 2.44655\times 10^{7}\,\mathrm{m}.
$$

At perigee, $r = r_p$ and

$$
v_p = \sqrt{GM\left(\frac{2}{r_p} - \frac{1}{a}\right)} = \sqrt{GM\left(\frac{2}{6.771\times 10^{6}} - \frac{2}{6.771\times 10^{6} + 4.216\times 10^{7}}\right)}.
$$

The square root equals $1.007186\times 10^{4}\,\mathrm{m/s}$, or $10.07\,\mathrm{km/s}$. The circular speed at $r_p$ was $7.672\,\mathrm{km/s}$ in [[#ex-leo]], so the transfer leaves the low orbit about $2.40\,\mathrm{km/s}$ faster than the circular speed there.
:::
:::
