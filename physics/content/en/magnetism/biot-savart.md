A compass needle swings when a current is switched on nearby. The needle is not being pulled towards the wire as a charge is pulled towards another charge. It is being twisted, and the twist reverses when the current reverses. In [[magnetism/magnetic-force]] that twist is written as a field $\vec{B}$ acting on a moving charge, or on a second current. The present chapter builds $\vec{B}$ from the currents that produce it.

Two laws do the work. The Biot–Savart law is the inverse-square rule for a short piece of wire: it always applies to a steady current, and using it means an integration. Ampère's law is a statement about the circulation of $\vec{B}$ around a closed curve. It is the magnetic partner of Gauss's law in [[electrostatics/gauss-law]]. Like Gauss's law, it is always true under its hypotheses, and it gives the field in closed form only when symmetry has already fixed the direction and the dependence on position. We use the first law to derive the field of a loop and of a straight wire, and the second to recover the wire and to treat the solenoid and the toroid.

Throughout the chapter the currents are steady, the wires are at rest, and the region is vacuum. A current that changes with time, and the field inside magnetic material, are later developments. The constant we use is

$$
\mu_0 = 4\pi\times 10^{-7}\,\mathrm{T\,m/A}.
$$ {#eq-mu0}

Two combinations appear so often that they are worth storing. Because $\mu_0$ contains a factor of $4\pi$,

$$
\frac{\mu_0}{4\pi} = 1.00\times 10^{-7}\,\mathrm{T\,m/A}, \qquad \frac{\mu_0}{2\pi} = 2.00\times 10^{-7}\,\mathrm{T\,m/A}.
$$

The second of these is the whole constant in the field of a long straight wire. The tesla is the unit already fixed by the force law: a field of one tesla exerts a force of one newton on a one-metre wire carrying one ampere, when the wire is perpendicular to the field.

## The Biot–Savart law

A current has a direction, so the source in the magnetic law is not a scalar lump of charge. It is a short directed piece of wire. Let a thin wire carry a steady current $I$. At a point of the wire, $\dd\vec{l}$ is an infinitesimal displacement along the wire in the direction of the current, and $\vec{r}$ is the vector drawn from that piece of wire to the point where the field is wanted. Write $r = \abs{\vec{r}}$ and $\hat{r} = \vec{r}/r$.

::: definition Biot–Savart law {#def-biot}
The magnetic field produced at the tip of $\vec{r}$ by the current element $I\,\dd\vec{l}$ is

$$
\dd\vec{B} = \frac{\mu_0}{4\pi}\frac{I\,\dd\vec{l}\times\hat{r}}{r^2}.
$$ {#eq-biot}

The field of a whole circuit is the vector integral of [[#eq-biot]] along the circuit. For a volume distribution of steady current density $\vec{J}$, the element $I\,\dd\vec{l}$ is replaced by $\vec{J}\,\dd V$ and the integral runs over the volume.
:::

The cross product is the whole difference in shape between this law and Coulomb's law. In [[electrostatics/coulomb]] a scalar charge sends out a radial field. Here $\dd\vec{l}\times\hat{r}$ is perpendicular both to the current and to the line from the element to the field point, so $\dd\vec{B}$ never points along $\vec{r}$. Magnetic field lines produced by currents do not begin or end. They close, or they run off to infinity in the idealised problems below.

The direction of $\dd\vec{l}\times\hat{r}$ is the right-hand rule for the cross product, which is a convention tied to the way we orient axes, not a second physical law. Point the fingers of the right hand along $\dd\vec{l}$ and sweep them towards $\hat{r}$. The thumb gives $\dd\vec{B}$. For a long straight wire the same rule collapses to a grip: thumb along the current, fingers curling in the direction of $\vec{B}$. We use one rule consistently. Reversing the current reverses $\vec{B}$.

Superposition is already contained in the integral. The field of several circuits is the vector sum of the separate fields. Nothing in [[#eq-biot]] is quadratic in the current, so doubling every current doubles $\vec{B}$.

The law, as we use it, asks for a steady current. Along a thin wire, steadiness means that charge is not piling up anywhere, so $I$ is the same at every cross-section of a single wire. If the current varies with time, the field at a distant point cannot respond at once, and a radiation field has to be added. That regime is outside this chapter. The steady law is the magnetostatic limit, and it is the limit in which Ampère's law takes the form written below.

::: intuition Field lines that have to close
Draw $\dd\vec{B}$ for one element and you get a small loop of direction around $\dd\vec{l}$. For a straight wire those little loops agree with one another, and the field lines are circles centred on the wire. The lines have no ends to put a magnetic charge on. Walking once around a wire, you are always walking with the field or always against it, which is why a circulation law is a natural partner for [[#eq-biot]]. An electric field of a point charge does the opposite: a walk around the charge gains nothing, because the field is radial, and the natural partner is a flux law.
:::

## The field on the axis of a loop

The first integral we carry out is a circular loop, and only on its axis. Off the axis the integral does not reduce to elementary functions. On the axis, symmetry removes every component except the one along the axis, and the magnitude is a rational function of the distance.

::: theorem Axial field of a circular loop {#thm-loop}
A circular loop of radius $R$ carries a steady current $I$. Set the loop in the $xy$-plane, centred at the origin, with the current circulating anticlockwise when viewed from the positive $z$-axis. At the point $(0,0,z)$ the magnetic field is along the $z$-axis, and

$$
B_z = \frac{\mu_0 I R^2}{2\left(R^2 + z^2\right)^{3/2}}.
$$ {#eq-loop}

The positive sign means that $\vec{B}$ points in the $+z$ direction on both sides of the loop. At the centre,

$$
B = \frac{\mu_0 I}{2R}.
$$ {#eq-centre}

If $N$ turns are wound so tightly that they may be treated as a single loop of radius $R$, both expressions are multiplied by $N$.
:::

::: proof
Consider one element of the loop. Every element is at the same distance $r = \sqrt{R^2 + z^2}$ from the axial point $P$. The vector from an element to $P$ has a component $z$ along the axis and a component of length $R$ pointing from the element towards the centre of the loop, so it is perpendicular to the tangent $\dd\vec{l}$. The magnitude in [[#eq-biot]] is therefore

$$
\dd B = \frac{\mu_0}{4\pi}\frac{I\,\dd l}{r^2},
$$

with no extra sine: the angle between $\dd\vec{l}$ and $\hat{r}$ is a right angle.

That vector $\dd\vec{B}$ is perpendicular to the line from the element to $P$. Resolve it on the axis and across the axis. In the right triangle formed by the radius, the axis and the line to $P$, the side opposite the angle between the line-of-sight and the axis is $R$, and the hypotenuse is $r$. The axial piece is the fraction $R/r$ of $\dd B$, and the transverse piece is the fraction $\abs{z}/r$. Explicitly,

$$
\dd B_z = \frac{\mu_0}{4\pi}\frac{I\,\dd l}{r^2}\cdot\frac{R}{r} = \frac{\mu_0}{4\pi}\frac{I R\,\dd l}{r^3}.
$$

The transverse pieces are directed straight out from the axis, one for each element. Around a full circle they cancel in opposite pairs. The axial pieces all point the same way. For the sense of current stated in the theorem, the cross product $\dd\vec{l}\times\hat{r}$ has a positive $z$-component whether $z$ is positive or negative: the field on the axis threads the loop in the direction the right-hand grip assigns, and it does not reverse when you cross from one side of the loop to the other.

The remaining integral is only the length of the wire, $\int\dd l = 2\pi R$. Hence

$$
B_z = \frac{\mu_0}{4\pi}\frac{I R}{r^3}\cdot 2\pi R = \frac{\mu_0 I R^2}{2 r^3} = \frac{\mu_0 I R^2}{2\left(R^2 + z^2\right)^{3/2}}.
$$

At $z = 0$ one has $r = R$, and [[#eq-centre]] follows at once. A coil of $N$ coincident turns is $N$ copies of the same integral, which multiplies the field by $N$. The hypothesis is that the bundle of wires is small compared with $R$ and with the distance from the coil at which the formula is used. A loosely wound helix is not this coil.
:::

Two limits are worth reading off [[#eq-loop]] before any arithmetic. At the centre the denominator is $2R^3$ and the $R^2$ cancels to leave [[#eq-centre]]. Far up the axis, $\abs{z}\gg R$, one may replace $R^2 + z^2$ by $z^2$, and

$$
B_z \approx \frac{\mu_0 I R^2}{2\abs{z}^3}.
$$

The current times the area of the loop is $I\pi R^2$. Substituting that combination shows that the distant axial field is the standard dipole field of this small loop. Near the loop the dipole formula is wrong, and [[#eq-loop]] is the one to use. The field is strongest at the centre and falls monotonically as $\abs{z}$ increases.

The right-hand grip fixes the direction without another calculation. Fingers along the current, thumb through the centre: that thumb is $\vec{B}$ on the axis. If you look at the loop and the current is anticlockwise, $\vec{B}$ points towards you through the centre.

::: example Twenty turns at the centre {#ex-loop}
A circular coil of $N = 20$ tightly wound turns has radius $R = 0.050\,\mathrm{m}$ and carries $I = 3.00\,\mathrm{A}$. Find the magnetic field at the centre.
::: solution
The turns are treated as coincident, so [[#eq-centre]] is multiplied by $N$:

$$
B = \frac{N\mu_0 I}{2R} = \frac{20\times\left(4\pi\times 10^{-7}\right)\times 3.00}{2\times 0.050}.
$$

The denominator is $0.100\,\mathrm{m}$. The numerator is $20\times 3.00\times 4\pi\times 10^{-7} = 2.40\pi\times 10^{-5}$, and dividing by $0.100$ moves the power of ten:

$$
B = 2.40\pi\times 10^{-4}\,\mathrm{T}.
$$

With $\pi = 3.1416$, the product $2.40\pi\times 10^{-4}$ equals $7.5398\times 10^{-4}\,\mathrm{T}$, which rounds to $7.54\times 10^{-4}\,\mathrm{T}$. The direction is along the axis, given by the right-hand grip on the current. A coil this size, carrying a few amperes, produces a field of order one millitesla, several times the horizontal component of the Earth's field and far below the field of an iron-cored laboratory magnet. The vacuum formula does not include iron.
:::
:::

::: example Off the centre, on the axis {#ex-axis}
A single loop of radius $R = 0.0800\,\mathrm{m}$ carries $I = 4.00\,\mathrm{A}$. Find $B$ on the axis at $z = 0.0600\,\mathrm{m}$.
::: solution
Use [[#eq-loop]] directly. First the lengths squared:

$$
R^2 = (0.0800)^2 = 0.00640\,\mathrm{m^2}, \qquad z^2 = (0.0600)^2 = 0.00360\,\mathrm{m^2}.
$$

Their sum is $0.0100\,\mathrm{m^2}$ exactly, and

$$
\left(R^2 + z^2\right)^{3/2} = (0.0100)^{3/2} = 1.00\times 10^{-3}\,\mathrm{m^3}.
$$

The prefactor is

$$
\frac{\mu_0 I R^2}{2\left(R^2 + z^2\right)^{3/2}} = \frac{\left(4\pi\times 10^{-7}\right)\times 4.00\times 0.00640}{2\times 1.00\times 10^{-3}} = \left(4\pi\times 10^{-7}\right)\times 12.8.
$$

Since $12.8\times 4 = 51.2$,

$$
B = 5.12\pi\times 10^{-6}\,\mathrm{T} = 1.6085\times 10^{-5}\,\mathrm{T},
$$

which rounds to $1.61\times 10^{-5}\,\mathrm{T}$. For comparison, the field at the centre of the same loop is $\mu_0 I/(2R) = 3.14\times 10^{-5}\,\mathrm{T}$. Moving out to three-quarters of a radius has roughly halved the axial field. The $z$-component still points through the loop in the sense of the right-hand grip; it has not reversed.
:::
:::

## The field of a straight wire

A straight segment is the other integral that every later application quotes. The geometry is fixed by one length and two angles. Let $P$ be the field point and let $O$ be the foot of the perpendicular from $P$ to the line of the wire, produced if necessary. Write $a = \abs{OP}$. Measure an angle $\theta$ at $P$, from the perpendicular $PO$ around towards the wire, and take $\theta$ positive on the side towards which the current flows. If the foot $O$ lies on the segment, one end has a negative angle and the other a positive angle.

::: proposition Field of a finite straight wire {#prop-finite}
A straight wire carries a steady current $I$. In the notation just given, the magnetic field at $P$ has magnitude

$$
B = \frac{\mu_0 I}{4\pi a}\left(\sin\theta_2 - \sin\theta_1\right),
$$ {#eq-finite}

where $\theta_1$ and $\theta_2$ are the angles to the two ends and $\theta_2 > \theta_1$. The direction is perpendicular to the plane that contains the wire and the point $P$, given by the right-hand grip on the current. Every element of a straight wire produces $\dd\vec{B}$ in that same direction, so the contributions add as scalars.
:::

::: proof
Put the wire on a line, with $s$ the coordinate along the current and $s = 0$ at the foot $O$. An element at coordinate $s$ is a distance $r = \sqrt{a^2 + s^2}$ from $P$. The vector from the element to $P$ has a component $-s$ back along the wire and a component $a$ along the perpendicular, so its cross product with $\dd\vec{l} = \dd s\,\hat{s}$ has magnitude $a\,\dd s$. Dividing by $r$ to make a unit vector,

$$
\dd B = \frac{\mu_0}{4\pi}\frac{I a\,\dd s}{r^3}.
$$

The direction is the same at every $s$, namely $\hat{s}\times\hat{n}$, out of the plane. Now change variable to the angle $\theta$ defined above. Then $s = a\tan\theta$, $r = a/\cos\theta$ and

$$
\dd s = a\sec^2\theta\,\dd\theta = \frac{a\,\dd\theta}{\cos^2\theta}.
$$

Substitute $r^3 = a^3/\cos^3\theta$:

$$
\frac{a\,\dd s}{r^3} = a\cdot\frac{a\,\dd\theta}{\cos^2\theta}\cdot\frac{\cos^3\theta}{a^3} = \frac{\cos\theta\,\dd\theta}{a}.
$$

Therefore

$$
\dd B = \frac{\mu_0 I}{4\pi a}\cos\theta\,\dd\theta.
$$

This is the integral named in the derivation. Integrating from the angle of the upstream end to the angle of the downstream end gives

$$
B = \frac{\mu_0 I}{4\pi a}\int_{\theta_1}^{\theta_2}\cos\theta\,\dd\theta = \frac{\mu_0 I}{4\pi a}\left(\sin\theta_2 - \sin\theta_1\right),
$$

which is [[#eq-finite]]. If the foot of the perpendicular falls outside the segment, both angles have the same sign and the difference of sines is smaller, but the algebra is unchanged.
:::

An infinite wire is the limit in which the two ends are seen at right angles to the perpendicular, one on each side.

::: corollary Infinite straight wire {#cor-wire}
The magnetic field at perpendicular distance $a$ from a long straight wire carrying current $I$ has magnitude

$$
B = \frac{\mu_0 I}{2\pi a},
$$ {#eq-wire}

and circles the wire by the right-hand grip. The same formula is written with $r$ in place of $a$ when there is only one distance in the problem.
:::

::: proof
For an infinite wire, $\theta_1 = -\pi/2$ and $\theta_2 = \pi/2$. Then $\sin\theta_2 - \sin\theta_1 = 1 - (-1) = 2$, and [[#eq-finite]] becomes

$$
B = \frac{\mu_0 I}{4\pi a}\cdot 2 = \frac{\mu_0 I}{2\pi a}.
$$

Using $\mu_0/(2\pi) = 2.00\times 10^{-7}\,\mathrm{T\,m/A}$ one may also write $B = \left(2.00\times 10^{-7}\,I/a\right)\,\mathrm{T}$ when $I$ is in amperes and $a$ is in metres. The field is undefined at $a = 0$ in this idealisation: a wire of zero thickness is not an honest model of the interior of a real cable. Outside a long straight cable of finite radius, with the current uniformly spread or confined to the interior, [[#eq-wire]] still holds with $a$ the distance from the axis, by the Ampère argument in the next section.
:::

The fall as $1/a$ is slower than the $1/r^2$ of a point charge, and it has a geometric reason. The field lines are circles. A circle of radius $a$ has length $2\pi a$, and Ampère's law will say that $B$ times that length is the constant $\mu_0 I$. The same current is shared around a longer loop when you stand farther away, so $B$ drops only as $1/a$. The electric field of a long line charge, in [[electrostatics/gauss-law]], falls as $1/r$ for the analogous reason applied to flux. The electric field of a point charge falls faster because the flux is shared over a sphere, not a circle.

::: example Eight amperes, two centimetres away {#ex-wire}
A long straight wire carries $I = 8.00\,\mathrm{A}$. Find $B$ at perpendicular distance $r = 0.0200\,\mathrm{m}$.
::: solution
[[#eq-wire]] and the reduced constant give

$$
B = \frac{\mu_0 I}{2\pi r} = \left(2.00\times 10^{-7}\right)\frac{8.00}{0.0200} = \left(2.00\times 10^{-7}\right)\times 400 = 8.00\times 10^{-5}\,\mathrm{T}.
$$

The arithmetic is exact: $8.00/0.0200 = 400$, and $2.00\times 10^{-7}\times 400 = 8.00\times 10^{-5}$. If the thumb points along the current, the fingers at this location curl in the direction of $\vec{B}$. The magnitude, $80.0\,\mu\mathrm{T}$, is the same order as the Earth's surface field, which is why a classroom wire at a few centimetres will deflect a compass when the current is several amperes, and why the wire must be aligned carefully if the Earth's field is not to dominate the direction.
:::
:::

::: example A finite wire seen at forty-five degrees {#ex-finite}
A straight segment carries $I = 10.0\,\mathrm{A}$. The field point lies $a = 0.0500\,\mathrm{m}$ from the centre of the segment, on the perpendicular bisector, and each end of the segment is seen at $45^\circ$ to that perpendicular. Find $B$, and compare it with the field of an infinite wire at the same distance.
::: solution
The angles are $\theta_1 = -45^\circ$ and $\theta_2 = +45^\circ$. Then

$$
\sin\theta_2 - \sin\theta_1 = \sin 45^\circ - \sin(-45^\circ) = \frac{\sqrt{2}}{2} - \left(-\frac{\sqrt{2}}{2}\right) = \sqrt{2}.
$$

The prefactor in [[#eq-finite]] is

$$
\frac{\mu_0 I}{4\pi a} = \left(1.00\times 10^{-7}\right)\frac{10.0}{0.0500} = 2.00\times 10^{-5}\,\mathrm{T}.
$$

Multiplying by $\sqrt{2} = 1.41421$ gives

$$
B = 2.8284\times 10^{-5}\,\mathrm{T},
$$

which rounds to $2.83\times 10^{-5}\,\mathrm{T}$. Because $\tan 45^\circ = 1$, each half of the wire has length $a$, so the whole segment is $0.100\,\mathrm{m}$ long. It is not a long wire.

The infinite-wire formula at the same $a$ and $I$ gives

$$
B_\infty = \frac{\mu_0 I}{2\pi a} = \left(2.00\times 10^{-7}\right)\frac{10.0}{0.0500} = 4.00\times 10^{-5}\,\mathrm{T}.
$$

The exact ratio of the two results is $\sin 45^\circ = 1/\sqrt{2} = 0.707$. Cutting the wire down so that it subtends only a right angle at the field point, from $-45^\circ$ to $+45^\circ$, keeps about seventy percent of the infinite-wire field. The missing tails, out near the asymptotes, still contribute the remaining thirty percent, because $\cos\theta$ in the integrand decays slowly.
:::
:::

## Ampère's law

The integral just performed is the long way round for a symmetric wire. Ampère's law packages the same content as a circulation.

::: theorem Ampère's law {#thm-ampere}
Let $C$ be a closed curve in vacuum, and let the current distribution be steady. Then

$$
\oint_C \vec{B}\cdot\dd\vec{l} = \mu_0 I_{\mathrm{encl}},
$$ {#eq-ampere}

where $I_{\mathrm{encl}}$ is the total current passing through any surface bounded by $C$. The sign is fixed by the right-hand rule: if the fingers curl in the direction of the line integral, the thumb gives the direction of positive current. A return current, piercing the surface the other way, is negative.
:::

::: proof
We prove [[#eq-ampere]] for an infinite straight wire, which is the case that fixes the use of the law in this chapter, and we record the hypotheses under which the general statement is taken.

From [[#cor-wire]], $\vec{B}$ at distance $a$ from the wire is azimuthal, with magnitude $\mu_0 I/(2\pi a)$. On a circle of radius $a$ centred on the wire, $\vec{B}$ is tangent and constant, and the circle has length $2\pi a$, so

$$
\oint\vec{B}\cdot\dd\vec{l} = B\cdot 2\pi a = \mu_0 I.
$$

The same cancellation of $a$ works for a curve that is not a circle. In the plane perpendicular to the wire, $B_\varphi\,\dd l_\varphi = \left(\mu_0 I/(2\pi a)\right)\,a\,\dd\varphi = \left(\mu_0 I/(2\pi)\right)\dd\varphi$. The integral equals $\mu_0 I$ times the net number of times the curve winds around the wire. A curve that does not enclose the wire gives zero. This is [[#eq-ampere]] for every curve linking an infinite straight wire.

The general steady distribution is not integrated here. The step from [[#eq-biot]] to [[#eq-ampere]] is a standard theorem of magnetostatics, and it uses the steadiness of the current in an essential way: the current through one surface bounded by $C$ must equal the current through any other such surface, otherwise $I_{\mathrm{encl}}$ would depend on an arbitrary choice. Steadiness, the statement that charge is not accumulating, is what makes those two surfaces agree. We use the general law under that hypothesis, in vacuum, with no magnetic material present.
:::

A charging capacitor is the standard situation in which the hypothesis fails. An Amperian curve around the wire feeding a capacitor plate can be spanned by a flat surface, which the conduction current pierces, or by a surface that bulges and passes between the plates, which no conduction current pierces. The two values of $I_{\mathrm{encl}}$ disagree. The repair is the displacement current, treated in [[magnetism/maxwell]]. Until that term is restored, [[#eq-ampere]] is a law for steady currents only.

Using the law to find $\vec{B}$, rather than to find a circulation one already understands, requires symmetry. The steps are the same shape as a Gauss's-law argument.

1. Use the symmetry of the current to decide the direction of $\vec{B}$ and the coordinates it may depend on.
2. Choose a closed curve on which $\vec{B}$ is either tangent and of constant magnitude, or perpendicular to the curve, or known to vanish.
3. The circulation then collapses to $B$ times a length, or to a difference of two such terms.
4. Evaluate $I_{\mathrm{encl}}$ with the right-hand sign, including only the current that pierces a surface bounded by the curve.
5. Solve for $B$.

If the symmetry is absent, step 3 is unavailable. The law is still true, and it still constrains the circulation, but it does not hand back the value of $\vec{B}$ at a point. A square loop of wire has no Amperian curve on which this extraction works. One goes back to [[#eq-biot]].

::: warning Steady currents and symmetry
Ampère's law in the form [[#eq-ampere]], without a displacement current, is false for a charging capacitor. That correction is made in [[magnetism/maxwell]]. You may use [[#eq-ampere]] here only for steady currents. Symmetry is required to extract $\vec{B}$ from the integral, just as it is required to extract $\vec{E}$ from Gauss's law. Dividing $\mu_0 I_{\mathrm{encl}}$ by the length of an arbitrary curve does not produce the field on that curve.
:::

## The long solenoid

A solenoid is a wire wound in a tight helix on a cylinder. The idealisation that makes the field simple is an infinite helix, or a finite one observed many radii away from either end, with the turns so close that the winding may be treated as a stack of circular loops. Let $n$ be the number of turns per unit length, and let each turn carry current $I$.

::: proposition Field of an ideal solenoid {#prop-solenoid}
Inside an ideal infinite solenoid the magnetic field is uniform, parallel to the axis, and has magnitude

$$
B = \mu_0 n I.
$$ {#eq-solenoid}

Outside, the idealised field is zero. The direction inside is the right-hand grip: fingers curling with the current in the turns, thumb along $\vec{B}$.
:::

::: proof
Two arguments are given. The first uses [[#thm-ampere]] and states the idealisation honestly. The second integrates [[#eq-loop]] and computes the axial field without a separate claim about the exterior.

Symmetry first. An infinite solenoid is unchanged by translation along its axis and by rotation about that axis, so in the stacked-loop idealisation $\vec{B}$ can depend only on the perpendicular distance $s$ from the axis. A radial component would send a net flux out through a coaxial cylindrical surface. The magnetic flux through any closed surface vanishes for a field built from [[#eq-biot]], because there is no magnetic charge for lines to end on; we use that property here and meet it again as $\divg\vec{B} = 0$ in [[magnetism/maxwell]]. The curved wall of the cylinder would then carry the whole flux, which forces the radial component to vanish. An azimuthal component is absent in the stacked-loop model: each loop's field is meridional, and a real helix produces only a weak azimuthal field associated with the slow advance of the winding, which the idealisation drops.

Now take a rectangular Amperian curve of length $L$ along the axis, with both long sides outside the winding, at two different radii. No current is enclosed. The ends of the rectangle are perpendicular to the axial field and contribute nothing, so $\left(B(s_1) - B(s_2)\right)L = 0$. The exterior field is therefore independent of radius. We set it to zero as part of the infinite-solenoid idealisation: the return flux of a finite solenoid is spread over the whole exterior, and in the infinite limit that spread field is taken to vanish. The syllabus statement is the practical one for a long coil: $B \approx 0$ outside.

A second rectangle has one long side inside, at any radius $s$ less than the winding radius, and one long side outside. The interior side contributes $B_{\mathrm{in}} L$, the exterior side contributes nothing, and the ends contribute nothing. The curve encloses $n L$ turns, so $I_{\mathrm{encl}} = n L I$, provided the sense of the curve agrees with the right-hand rule. [[#eq-ampere]] gives $B_{\mathrm{in}} L = \mu_0 n L I$, hence $B_{\mathrm{in}} = \mu_0 n I$, independent of $s$. The interior field is uniform.

The second derivation checks the axial value by integration. A slice of the solenoid between $z$ and $z + \dd z$ is a loop carrying current $\dd I = n I\,\dd z$. At the origin, [[#eq-loop]] contributes

$$
\dd B_z = \frac{\mu_0 (n I\,\dd z)\, R^2}{2\left(R^2 + z^2\right)^{3/2}}.
$$

For an infinite solenoid, $z$ runs from $-\infty$ to $\infty$. The substitution $z = R\tan\theta$, so $\dd z = R\sec^2\theta\,\dd\theta$ and $\theta$ runs from $-\pi/2$ to $\pi/2$, turns the rational factor into $\cos\theta$:

$$
\int_{-\infty}^{\infty}\frac{R^2\,\dd z}{\left(R^2 + z^2\right)^{3/2}} = \int_{-\pi/2}^{\pi/2}\cos\theta\,\dd\theta = 2.
$$

Therefore $B_z = \left(\mu_0 n I / 2\right)\cdot 2 = \mu_0 n I$, in agreement with [[#eq-solenoid]]. The same integral from $\theta_1$ to $\theta_2$, for a solenoid that occupies only a finite interval of $z$, gives

$$
B_z = \frac{\mu_0 n I}{2}\left(\sin\theta_2 - \sin\theta_1\right),
$$ {#eq-solenoid-finite}

with $\tan\theta = z/R$ measured from the field point out to each end of the winding. At the centre of a solenoid of length $L$ and radius $R$ this is $\mu_0 n I$ times $(L/2)/\sqrt{(L/2)^2 + R^2}$, which is less than $\mu_0 n I$ and approaches it only when $L\gg R$. At the mouth of a semi-infinite solenoid, $\theta$ runs from $0$ to $\pi/2$, the difference of sines is $1$, and $B = \mu_0 n I/2$.
:::

The end of a real solenoid is not a place to quote [[#eq-solenoid]]. Several radii inside a coil whose length is many times its diameter, the infinite formula is the working one, and the field outside the barrel is a small fraction of the interior field. Near either mouth the axial field is closer to half the interior value, and it fringes outward.

::: example A long solenoid at two amperes {#ex-solenoid}
An ideal long solenoid has $n = 1000$ turns per metre and carries $I = 2.00\,\mathrm{A}$. Find $B$ inside, well away from the ends.
::: solution
[[#eq-solenoid]] gives

$$
B = \mu_0 n I = \left(4\pi\times 10^{-7}\right)\times 1000\times 2.00 = 8\pi\times 10^{-4}\,\mathrm{T}.
$$

The decimal value is $2.5133\times 10^{-3}\,\mathrm{T}$, which rounds to $2.51\times 10^{-3}\,\mathrm{T}$. The direction is along the axis, thumb following the right-hand grip on the winding. Outside the idealised winding the field is taken to be zero. A finite coil of this turn density, a few diameters in from the end, will sit close to this value; on the mouth itself the axial field is about half of it, by the semi-infinite limit of [[#eq-solenoid-finite]].
:::
:::

## The toroid

Bend a long solenoid around until its ends meet, and the return flux, which the straight solenoid sent out over the whole of space, is trapped inside the doughnut. A toroid is that winding: $N$ turns of wire wound on a ring, each carrying current $I$. The idealisation is a tight wind, so that the current on the inner rim and the current on the outer rim are the only currents one sees in a cross-section, equal and opposite, $NI$ each.

::: proposition Field of a toroid {#prop-toroid}
Let $r$ be the distance from the axis of symmetry of the toroid, the axis that threads the hole of the doughnut. In the ideal tightly wound limit, $\vec{B}$ is azimuthal. Inside the core, between the inner and outer radius of the winding,

$$
B = \frac{\mu_0 N I}{2\pi r}.
$$ {#eq-toroid}

In the central hole, and everywhere outside the winding, $B = 0$.
:::

::: proof
Rotational symmetry about the axis of the doughnut forces $\vec{B}$, if it is not zero, to be azimuthal and to depend only on $r$. Take as an Amperian curve a circle of radius $r$ centred on that axis.

If the circle lies inside the core, a surface bounded by it is pierced by the inner bundle of the winding once for each turn, and $I_{\mathrm{encl}} = NI$. On the circle, $\vec{B}$ is tangent and constant by symmetry, so the circulation is $B\cdot 2\pi r$. [[#eq-ampere]] gives $B\cdot 2\pi r = \mu_0 N I$, which is [[#eq-toroid]].

If the circle lies in the central hole, no wire pierces a surface bounded by it, so $I_{\mathrm{encl}} = 0$ and $B = 0$. If the circle lies outside the whole toroid, the surface is pierced by the inner bundle one way and by the outer bundle the other way. Those currents are equal, $I_{\mathrm{encl}} = 0$, and $B = 0$. The field is confined to the core.

For a thin toroid the radius $r$ hardly changes across the core. Writing $n = N/(2\pi r)$ for the number of turns per unit length along the mean circumference converts [[#eq-toroid]] into $B = \mu_0 n I$, the solenoid result. A fat toroid keeps the $1/r$ variation: the field is stronger on the inner rim than on the outer rim, in the inverse ratio of the two radii.
:::

The confinement is the practical point. A toroid sends very little field into the room around it, which is why inductors and transformers are often wound this way when a stray field would be a nuisance. The price is the $1/r$ inhomogeneity across a fat core.

::: example Four hundred turns on an eight-centimetre radius {#ex-toroid}
A tightly wound toroid has $N = 400$ turns and carries $I = 1.20\,\mathrm{A}$. Find $B$ at a point inside the core at radius $r = 0.0800\,\mathrm{m}$ from the symmetry axis. The point lies between the inner and outer radius of the winding.
::: solution
[[#eq-toroid]] and $\mu_0/(2\pi) = 2.00\times 10^{-7}\,\mathrm{T\,m/A}$ give

$$
B = \left(2.00\times 10^{-7}\right)\frac{N I}{r} = \left(2.00\times 10^{-7}\right)\frac{400\times 1.20}{0.0800}.
$$

The current factor is $480$, and $2.00\times 10^{-7}\times 480 = 9.60\times 10^{-5}$. Dividing by $0.0800$ yields $B = 1.20\times 10^{-3}\,\mathrm{T}$ exactly. At a larger radius inside the same core the field is smaller, in inverse proportion to $r$. It is not equal to the value on the mean radius unless the core is thin enough that the distinction does not matter.
:::
:::

## Superposition of long wires

The field of several long wires is the vector sum of terms of the form [[#eq-wire]]. The magnitudes add only when the directions agree. They cancel where the directions are opposite and the magnitudes match.

Set up a diagram we can reuse. The wires are perpendicular to the page. A dot means current out of the page towards you; a cross means current into the page. For a dot, the right-hand grip is anticlockwise: on the right of the wire $\vec{B}$ points up the page, and on the left of the wire $\vec{B}$ points down the page. For a cross, the grip is clockwise, and those two directions reverse.

::: example Equal and opposite currents {#ex-two-wires}
Two long parallel wires are $0.100\,\mathrm{m}$ apart. Each carries $5.00\,\mathrm{A}$, the currents running in opposite directions. Find $\vec{B}$ at the point halfway between them.
::: solution
Each wire is $r = 0.0500\,\mathrm{m}$ from the midpoint, so each contributes

$$
B_1 = \frac{\mu_0 I}{2\pi r} = \left(2.00\times 10^{-7}\right)\frac{5.00}{0.0500} = 2.00\times 10^{-5}\,\mathrm{T}.
$$

Put the wire on the left as a dot and the wire on the right as a cross. At the midpoint, which is to the right of the dot, the dot's field points up the page. The midpoint is to the left of the cross, and a clockwise field on the left of a wire also points up the page. The two fields are parallel. The total is

$$
B = 4.00\times 10^{-5}\,\mathrm{T},
$$

up the page, for this choice of senses. Reversing both currents reverses $\vec{B}$ but leaves the magnitude unchanged. Had the currents been in the same direction, the two contributions at the midpoint would have been opposite and the total would have been zero. That cancellation is special to equal currents. Unequal currents in the same direction still have a null, but it sits closer to the weaker wire, which is an exercise below.

The force on either wire follows from the field of the other, as in [[magnetism/magnetic-force]]. Opposite currents repel. The field calculation here is only the superposition; the force is $I$ times length times the field of the neighbour, not times the total field at the midpoint.
:::
:::

## How the field falls off

The three working formulae of the chapter fall off in three different ways. A long wire is $1/r$. A loop, far away on its axis, is $1/\abs{z}^3$. A solenoid, inside and far from the ends, does not fall off at all: the field is uniform until the winding ends. Which formula you are holding is a decision about geometry, made before any arithmetic.

::: widget plot
f: 1/x
x: 0.2, 5
caption: The field of a long wire falls as $1/r$, slower than the $1/r^2$ of a point charge. The curve is that $1/r$ shape. Nothing slides: compare the drop from $0.2$ to $1$ with the drop from $1$ to $5$.
:::

From $r = 1$ to $r = 5$ the wire's field falls by a factor of five. A point-charge field would have fallen by a factor of twenty-five over the same stretch. The slow tail is why a return lead, routed far from a sensitive instrument, still contributes a field, and why the toroid, which cancels that tail by bringing the return current home, is a different kind of object from a single wire.

::: history Biot, Savart and Ampère
In 1820 Jean-Baptiste Biot and Félix Savart announced the force on a magnetic pole placed near a long straight wire. The force fell as the inverse of the perpendicular distance. What they had measured was the field [[#eq-wire]], read by the torque on a pole. In the same years, 1820 to 1827, André-Marie Ampère built the force between two currents and treated a permanent magnet as an assembly of currents rather than as a pair of poles. The circulation law [[#eq-ampere]], in the modern form of an integral of $\vec{B}$ around a closed curve, was clarified later, when the vector calculus of the field was in place. The element law [[#eq-biot]] is the local statement from which the wire, the loop and, under the steady-current hypothesis, the circulation law all follow.
:::

::: summary
- The Biot–Savart law gives $\dd\vec{B} = (\mu_0/4\pi)\, I\,\dd\vec{l}\times\hat{r}/r^2$, with $\vec{r}$ drawn from the current element to the field point. We take $\mu_0 = 4\pi\times 10^{-7}\,\mathrm{T\,m/A}$.
- On the axis of a circular loop, $B = \mu_0 I R^2 / \bigl(2(R^2 + z^2)^{3/2}\bigr)$, and at the centre $B = \mu_0 I/(2R)$. A tight coil of $N$ turns multiplies these by $N$.
- A finite straight wire gives $B = (\mu_0 I/(4\pi a))(\sin\theta_2 - \sin\theta_1)$. An infinite wire is the case $\theta = \pm\pi/2$, and $B = \mu_0 I/(2\pi r)$, circling the wire by the right-hand grip.
- Ampère's law, $\oint\vec{B}\cdot\dd\vec{l} = \mu_0 I_{\mathrm{encl}}$, holds for steady currents in vacuum. Symmetry is required to extract $\vec{B}$. It is not valid, without a displacement current, for a charging capacitor.
- Inside an ideal long solenoid $B = \mu_0 n I$, and the idealised exterior field is zero. At the mouth of a semi-infinite solenoid the axial field is half of that.
- Inside a toroidal core $B = \mu_0 N I/(2\pi r)$, and the field is zero in the hole and outside the winding.
- Fields of several currents add as vectors. Parallel contributions add; antiparallel contributions cancel where their magnitudes match.
- The wire's field falls as $1/r$, slower than the field of a point charge, because the circulation $\mu_0 I$ is shared around a circle of length $2\pi r$.
:::

## Exercises

::: exercise Field two centimetres further out {#exr-wire level=1 check="6e-5"}
A long straight wire carries $I = 15.0\,\mathrm{A}$. Find the magnitude of $\vec{B}$ at perpendicular distance $r = 0.0500\,\mathrm{m}$.
::: solution
[[#eq-wire]] with $\mu_0/(2\pi) = 2.00\times 10^{-7}\,\mathrm{T\,m/A}$ gives

$$
B = \left(2.00\times 10^{-7}\right)\frac{15.0}{0.0500} = \left(2.00\times 10^{-7}\right)\times 300 = 6.00\times 10^{-5}\,\mathrm{T}.
$$

The direction is azimuthal about the wire. The magnitude is smaller than the $8.00\times 10^{-5}\,\mathrm{T}$ of [[#ex-wire]] because both the larger distance and, in that comparison, the different current have been accounted for by the single ratio $I/r$.
:::
:::

::: exercise Centre of a single loop {#exr-centre level=1 check="pi*10^(-5)"}
A single circular loop of radius $R = 0.100\,\mathrm{m}$ carries $I = 5.00\,\mathrm{A}$. Find the magnitude of $\vec{B}$ at the centre.
::: solution
[[#eq-centre]] gives

$$
B = \frac{\mu_0 I}{2R} = \frac{\left(4\pi\times 10^{-7}\right)\times 5.00}{2\times 0.100} = \left(4\pi\times 10^{-7}\right)\times 25.0 = \pi\times 10^{-5}\,\mathrm{T}.
$$

The decimal value is $3.14\times 10^{-5}\,\mathrm{T}$. The exact value asked for by the check is $\pi\times 10^{-5}$. The direction is perpendicular to the plane of the loop.
:::
:::

::: exercise Solenoid turn density {#exr-solenoid level=1 check="8*pi*10^(-4)"}
An ideal long solenoid has $n = 500$ turns per metre and carries $I = 4.00\,\mathrm{A}$. Find $B$ inside, far from the ends.
::: solution
[[#eq-solenoid]] gives

$$
B = \mu_0 n I = \left(4\pi\times 10^{-7}\right)\times 500\times 4.00 = 8\pi\times 10^{-4}\,\mathrm{T}.
$$

Numerically this is $2.51\times 10^{-3}\,\mathrm{T}$. Outside the ideal winding the field is taken to be zero, so the same data do not describe a point beside the solenoid.
:::
:::

::: exercise Halfway out along the axis {#exr-ratio level=2 check="1/(2*sqrt(2))"}
A circular loop carries a steady current. Let $B_0$ be the field at the centre and $B(R)$ the axial field at a distance $R$ from the centre, where $R$ is the radius of the loop. Find the ratio $B(R)/B_0$.
::: solution
From [[#eq-loop]] and [[#eq-centre]],

$$
\frac{B(z)}{B_0} = \frac{R^3}{\left(R^2 + z^2\right)^{3/2}} = \left(\frac{R}{\sqrt{R^2 + z^2}}\right)^3.
$$

At $z = R$,

$$
\frac{R}{\sqrt{R^2 + R^2}} = \frac{1}{\sqrt{2}}, \qquad \frac{B(R)}{B_0} = \left(\frac{1}{\sqrt{2}}\right)^3 = \frac{1}{2\sqrt{2}}.
$$

The decimal value is $0.354$. The field on the axis at one radius out is a little over a third of the central field. The same ratio holds for a tight coil of $N$ turns, because $N$ cancels.
:::
:::

::: exercise Toroid at five centimetres {#exr-toroid level=2 check="2.4*10^(-3)"}
A toroid of $N = 200$ turns carries $I = 3.00\,\mathrm{A}$. Find $B$ at a point inside the core at radius $r = 0.0500\,\mathrm{m}$ from the symmetry axis.
::: solution
[[#eq-toroid]] gives

$$
B = \left(2.00\times 10^{-7}\right)\frac{200\times 3.00}{0.0500} = \left(2.00\times 10^{-7}\right)\times 1.20\times 10^{4} = 2.40\times 10^{-3}\,\mathrm{T}.
$$

The intermediate step is $NI/r = 600/0.0500 = 1.20\times 10^{4}\,\mathrm{A/m}$. A point in the hole, at smaller radius, would have $B = 0$ in the ideal winding, not a larger value of the same formula. The formula applies only between the inner and outer radius of the core.
:::
:::

::: exercise Where two wires cancel {#exr-null level=2 check="0.1"}
Two long parallel wires are $0.300\,\mathrm{m}$ apart and carry currents $4.00\,\mathrm{A}$ and $8.00\,\mathrm{A}$ in the same direction. Between the wires there is a line, parallel to both, on which $\vec{B} = \vec{0}$. Find the distance of that line from the wire that carries $4.00\,\mathrm{A}$.
::: hint
On the line between the wires the two fields are antiparallel. Set the magnitudes equal.
:::
::: solution
Let $x$ be the distance from the $4.00\,\mathrm{A}$ wire, and $0.300 - x$ the distance from the $8.00\,\mathrm{A}$ wire. Between the wires the right-hand grips send $\vec{B}$ in opposite directions, as in the discussion of [[#ex-two-wires]]. Magnitudes match when

$$
\frac{\mu_0}{2\pi}\frac{4.00}{x} = \frac{\mu_0}{2\pi}\frac{8.00}{0.300 - x}.
$$

Cancel the common factor:

$$
\frac{4.00}{x} = \frac{8.00}{0.300 - x} \implies 0.300 - x = 2x \implies x = 0.100\,\mathrm{m}.
$$

The null is closer to the weaker current. Outside the pair, on either side, both fields point the same way, so they cannot cancel. The result $0.100\,\mathrm{m}$ is a pure consequence of the currents being in the ratio $1:2$; $\mu_0$ drops out.
:::
:::

::: exercise Where the axial field has fallen by eight {#exr-eighth level=3 check="0.05*sqrt(3)"}
A circular loop has radius $R = 0.0500\,\mathrm{m}$. On the axis, at $z > 0$, the field falls as $\abs{z}$ grows. Find the distance $z$ at which $B_z$ has fallen to one eighth of its value at the centre.
::: hint
The ratio $B(z)/B_0$ is $\bigl(R/\sqrt{R^2 + z^2}\bigr)^3$. Set it equal to $1/8$ and take cube roots before squaring.
:::
::: solution
From the ratio used in [[#exr-ratio]],

$$
\left(\frac{R}{\sqrt{R^2 + z^2}}\right)^3 = \frac{1}{8} = \left(\frac{1}{2}\right)^3.
$$

The quantities in parentheses are positive, so

$$
\frac{R}{\sqrt{R^2 + z^2}} = \frac{1}{2}.
$$

Then $\sqrt{R^2 + z^2} = 2R$, and squaring both sides yields $R^2 + z^2 = 4R^2$, hence $z^2 = 3R^2$ and

$$
z = R\sqrt{3} = 0.0500\sqrt{3} = 8.66\times 10^{-2}\,\mathrm{m}.
$$

The negative root is the mirror point on the other side of the loop, where the field has the same magnitude and, for a given sense of current, the same direction. One eighth of the central field is reached a little beyond one and a half radii. The dipole approximation $B\propto 1/\abs{z}^3$ would have placed this point differently, because $z = R\sqrt{3}$ is not yet in the regime $\abs{z}\gg R$.
:::
:::

::: exercise The open end of a solenoid {#exr-mouth level=3 check="4*pi*10^(-4)"}
An idealised solenoid occupies the half-line of its axis from the origin out to infinity, with $n = 1000$ turns per metre and $I = 2.00\,\mathrm{A}$. The winding begins at the field point. Show that the axial field there is half the deep-interior value, and find its magnitude.
::: hint
Use [[#eq-solenoid-finite]] with the angles appropriate to a winding that starts at the field point and runs to infinity.
:::
::: solution
Measure $\theta$ from the radial plane at the field point, so that $\tan\theta = z/R$ out to a slice of the solenoid. The winding occupies $\theta$ from $0$ to $\pi/2$. [[#eq-solenoid-finite]] gives

$$
B = \frac{\mu_0 n I}{2}\left(\sin\frac{\pi}{2} - \sin 0\right) = \frac{\mu_0 n I}{2}.
$$

The deep-interior value of an infinite solenoid is $\mu_0 n I$, so the mouth of a semi-infinite solenoid carries half of that. Numerically

$$
B = \frac{1}{2}\left(4\pi\times 10^{-7}\right)\times 1000\times 2.00 = 4\pi\times 10^{-4}\,\mathrm{T},
$$

which equals $1.26\times 10^{-3}\,\mathrm{T}$. This is the axial field exactly at the end of the idealisation. A short distance back inside a long laboratory solenoid the field has already climbed most of the way from this half-value towards $\mu_0 n I$; a short distance outside, it has fallen below the half-value and is fringing.
:::
:::

::: quiz
A long straight wire carries a steady current. You want the magnitude of $\vec{B}$ at a point beside the wire. Which statements are legitimate?
- [x] Integrate the Biot–Savart law along the wire, or apply Ampère's law to a circle centred on the wire. Both give $\mu_0 I/(2\pi r)$.
- [x] The same Ampère circulation equals $\mu_0 I$ on any curve that winds once around the wire; a centred circle is chosen because symmetry makes $B$ constant on it.
- [ ] Ampère's law on a square centred on the wire gives $B$ as $\mu_0 I$ divided by the perimeter of the square.
- [ ] Between the plates of a charging capacitor the conduction current is zero, so Ampère's law in the form used in this chapter says that $\vec{B}$ is zero on a loop around the wire that feeds the capacitor.
::: solution
The first two statements are the content of [[#cor-wire]] and of the proof of [[#thm-ampere]]. The circulation around a square that encloses the wire is still $\mu_0 I$, but $B$ is neither constant nor everywhere tangent to the square in a way that lets you divide by the perimeter. The capacitor statement is the standard failure of [[#eq-ampere]] without displacement current: a surface between the plates is pierced by no conduction current, while a surface that cuts the feeding wire is pierced by $I$, and the two disagree. That case is excluded until [[magnetism/maxwell]].
:::
:::
