The electric field is a vector, and superposition of vectors is the hard part of every static problem that lacks symmetry. There is a scalar underneath it. The work done by the static field when a test charge moves from one point to another does not depend on the path, only on the endpoints. That is the content of a potential energy in [[mechanics/work-energy]], specialised to the Coulomb force. Divide by the test charge and the resulting scalar is the electric potential. Its gradient gives the field back.

This chapter defines the potential difference, proves that the Coulomb field is conservative, and fixes the usual zero at infinity for a localised charge distribution. Superposition becomes an ordinary sum. The field is recovered as $\mathbf{E} = -\nabla V$, so equipotential surfaces stand perpendicular to field lines. The fields already found in [[electrostatics/gauss-law]] are then integrated: a uniform field, a sphere, an infinite line and an infinite sheet. The line and the sheet cannot use a zero at infinity, and that restriction is part of the definition rather than a footnote.

The constants are those of the previous chapters,

$$
k = \frac{1}{4\pi\eps_0} = 8.9875517923\times 10^{9}\,\mathrm{N\,m^2/C^2}, \qquad e = 1.602176634\times 10^{-19}\,\mathrm{C},
$$

and the proton mass used below is $m_p = 1.673\times 10^{-27}\,\mathrm{kg}$. The electron mass, where it appears, is $m_e = 9.109\times 10^{-31}\,\mathrm{kg}$.

## Potential difference

Move a test charge $q_0$ slowly from a point $A$ to a point $B$ in a static field $\mathbf{E}$. The electric force on it is $q_0\mathbf{E}$, and the work done *by that force* is the line integral $q_0\int_A^B \mathbf{E}\cdot\dd\mathbf{l}$. This is the mechanics work of [[mechanics/work-energy]], the work done by a force, which equals $\Delta K$ when the force is the net force. It is not the work done on a thermodynamic system.

If the integral depends only on $A$ and $B$, it can be stored as a difference of values of a function of position. That function, per unit charge, is the potential.

::: definition Electric potential {#def-potential}
The **electric potential difference** between a point $A$ and a point $B$ is

$$
\Delta V = V(B) - V(A) = -\int_A^B \mathbf{E}\cdot\dd\mathbf{l}.
$$ {#eq-delta-v}

The **electric potential** $V$ itself is fixed once a reference point is chosen and $V$ is set to zero there. The SI unit is the volt: $1\,\mathrm{V} = 1\,\mathrm{J/C} = 1\,\mathrm{N\,m/C}$. The potential energy of a test charge $q_0$ that does not disturb the sources is $U = q_0 V$, so $V$ is potential energy per unit charge.
:::

The minus sign is deliberate. If you walk in the direction of $\mathbf{E}$, the integrand $\mathbf{E}\cdot\dd\mathbf{l}$ is positive and $V$ falls. A positive test charge is pushed the way $\mathbf{E}$ points, towards lower potential, and the field does positive work on it. A negative test charge is pushed the other way, towards higher potential. Both are "downhill" for their own potential energy $q_0 V$, because $q_0$ carries the sign.

Only differences enter [[#eq-delta-v]]. Adding a constant to $V$ everywhere changes nothing physical until you have chosen the zero. The choice is free when the charges occupy a finite region. It is not free for a line or a sheet that extends to infinity, and that case is treated after the localised one.

::: theorem The static field is conservative {#thm-path}
The line integral of the Coulomb field between two points is independent of the path, provided the path does not pass through a point charge. Equivalently, $\oint \mathbf{E}\cdot\dd\mathbf{l} = 0$ around every closed loop that avoids the charges. The same is true of any superposition of Coulomb fields, and of the field of a smooth charge distribution.
:::

::: proof
For one point charge $q$ at the origin, $\mathbf{E} = (kq/r^2)\,\hat{\mathbf{r}}$. On an arbitrary path, write the displacement in spherical components. The angular pieces are perpendicular to $\hat{\mathbf{r}}$ and contribute nothing to $\mathbf{E}\cdot\dd\mathbf{l}$. The radial piece contributes $(kq/r^2)\,\dd r$, where $\dd r$ is the change in radial distance along the path, negative when the path moves inward. Therefore

$$
\int_A^B \mathbf{E}\cdot\dd\mathbf{l} = kq\int_{r_A}^{r_B} \frac{\dd r}{r^2} = kq\left(\frac{1}{r_A} - \frac{1}{r_B}\right).
$$ {#eq-path-point}

The path has disappeared. Only the two distances remain. A closed loop has $r_A = r_B$ after a full circuit, or can be split into pieces each of which returns to its own starting distance, and the integral vanishes.

For several point charges, integrate term by term. Each term depends only on the endpoints, so the sum does. A smooth distribution is a limit of such sums, and the integral that defines its field converges everywhere, including inside the charge, so the same path independence holds with no excluded points. At a true point charge the field is not defined, and a path is not drawn through it.
:::

[[#eq-path-point]] is the reason a scalar exists. Set [[#eq-delta-v]] beside it and the potential difference between two points in the field of a single point charge is $kq(1/r_B - 1/r_A)$. No further physical hypothesis has been added.

## The potential of a point charge

The conventional zero for a charge distribution that does not extend to infinity is $V(\infty) = 0$. "Infinity" here means a point far enough away that increasing the distance further does not change the integral. [[#eq-path-point]] says that for a point charge the integral from a finite $r$ out to infinity converges, because $\int^{\infty} r^{-2}\,\dd r$ converges. That is special to the inverse square, and it fails for a line.

::: theorem Potential of a point charge {#thm-point-v}
With $V(\infty) = 0$, the potential of a point charge $q$ at distance $r$ from it is

$$
V(r) = \frac{1}{4\pi\eps_0}\frac{q}{r} = \frac{kq}{r}.
$$ {#eq-point-v}

$V$ is positive everywhere if $q$ is positive, and negative everywhere if $q$ is negative. It depends on the distance and not on the angle.
:::

::: proof
Apply [[#eq-delta-v]] with $A$ at infinity and $B$ at distance $r$, and use [[#eq-path-point]] with $1/r_A = 0$:

$$
V(r) - V(\infty) = -\int_{\infty}^{r} \mathbf{E}\cdot\dd\mathbf{l} = -kq\left(\frac{1}{\infty} - \frac{1}{r}\right) = \frac{kq}{r}.
$$

The reference value $V(\infty)$ is zero by the choice just made. The sign comes out right without an extra convention: a positive charge has a field pointing outward, the walk from infinity inward goes against the field, the field's work is negative, and the potential, which falls in the direction of $\mathbf{E}$, is higher at finite $r$ than at infinity.
:::

::: proposition Superposition for the potential {#prop-super}
The potential of a collection of point charges, with the same zero at infinity, is the ordinary sum

$$
V(\mathbf{r}) = \frac{1}{4\pi\eps_0}\sum_i \frac{q_i}{r_i},
$$ {#eq-super}

where $r_i$ is the distance from $q_i$ to the point in question. For a continuous distribution that does not reach infinity,

$$
V(\mathbf{r}) = \frac{1}{4\pi\eps_0}\int \frac{\dd q}{r}.
$$
:::

::: proof
The field of the collection is the vector sum of the Coulomb fields, and [[#thm-path]] says each of those is conservative with a potential of the form [[#eq-point-v]]. The line integral of a sum is the sum of the line integrals, so a potential for the sum is the sum of the potentials. The integral formula is the same statement with $\dd q$ in place of $q_i$. The scalar character is the practical gain: there are no components to resolve until you want $\mathbf{E}$ back.
:::

The gravitational analogue in [[mechanics/gravitation]] is $\Phi = -GM/r$, with a minus sign built in because mass is positive and gravity attracts. Electric charge has either sign, so [[#eq-point-v]] keeps the sign of $q$ and lets the force law $q_0\mathbf{E}$ decide attraction or repulsion. The structure, a $1/r$ scalar whose slope is an inverse-square field, is the same.

An electric dipole is the first superposition worth writing in closed form. Put $-q$ at $z = -d/2$ and $+q$ at $z = +d/2$, and write $p = qd$ for the dipole moment, pointing from the negative charge towards the positive one. At a point on the axis at coordinate $z$, with $\abs{z} > d/2$,

$$
V(z) = \frac{kq}{z - d/2} - \frac{kq}{z + d/2} = \frac{kqd}{z^2 - (d/2)^2} = \frac{kp}{z^2 - (d/2)^2}.
$$

Far away, $\abs{z} \gg d$ and the denominator is $z^2$ to leading order, so $V \approx kp/z^2$. The potential of a dipole falls one power faster than the potential of either charge alone, because the charges cancel in the monopole term and leave a difference. On the perpendicular bisector the two distances are equal, the two contributions cancel, and $V = 0$ everywhere on that plane. The field there is not zero: equal distances make the potentials cancel and leave the transverse components of $\mathbf{E}$ adding. Potential and field carry different information, which is why both are kept.

::: example Potential on the axis of a dipole {#ex-dipole}
A dipole has $q = 2.00\,\mathrm{nC}$ and separation $d = 4.00\,\mathrm{cm}$. Find the potential on the axis at $z = 20.0\,\mathrm{cm}$ from the centre, with $V(\infty) = 0$, both exactly and in the far-field approximation.
::: solution
The dipole moment has magnitude $p = qd = (2.00\times 10^{-9})(0.0400) = 8.00\times 10^{-11}\,\mathrm{C\,m}$. The exact axial potential derived above is

$$
V = \frac{kp}{z^2 - (d/2)^2} = \frac{(8.9875517923\times 10^{9})(8.00\times 10^{-11})}{(0.200)^2 - (0.0200)^2} = \frac{0.719004}{0.0400 - 0.000400} = 18.1567\,\mathrm{V}.
$$

The far-field formula $kp/z^2$ replaces the denominator by $z^2 = 0.0400$ and gives $17.9751\,\mathrm{V}$. To three significant figures the exact value is $18.2\,\mathrm{V}$ and the approximation is $18.0\,\mathrm{V}$. The fractional difference is $(d/(2z))^2 = (0.0200/0.200)^2 = 0.0100$, one part in a hundred, which is the first correction in the expansion $1/(1 - (d/2z)^2) \approx 1 + (d/2z)^2$. At $z = 20.0\,\mathrm{cm}$ the approximation is already good. At $z = d$ it would not be an approximation at all, because the point would sit on a charge.
:::
:::

## Potential energy

::: definition Potential energy of a charge, and of a pair {#def-u}
In an external potential $V$, with the sources held fixed, a test charge $q_0$ has potential energy

$$
U = q_0 V.
$$ {#eq-test-u}

The electrostatic potential energy of a *pair* of point charges, zero when they are infinitely far apart, is

$$
U = \frac{1}{4\pi\eps_0}\frac{q_1 q_2}{r} = \frac{kq_1 q_2}{r}.
$$ {#eq-pair}

The pair formula counts the interaction once. It is $q_1$ times the potential due to $q_2$, or $q_2$ times the potential due to $q_1$, not the sum of both.
:::

The work done *by the field* as $q_0$ moves from $A$ to $B$ is

$$
W_{\mathrm{field}} = q_0\int_A^B \mathbf{E}\cdot\dd\mathbf{l} = q_0\bigl(V(A) - V(B)\bigr) = -\Delta U.
$$

If the electric force is the only force, the work–energy theorem gives $\Delta K = W_{\mathrm{field}} = -\Delta U$, so $K + U$ is constant. If some other agent moves the charge quasistatically, so that $\Delta K = 0$, the agent does work $+\Delta U$. Assembling two charges from infinity is that second situation. Bringing $q_1$ in from infinity costs nothing in this accounting, because a single point charge has no partner yet and we are not counting the infinite self-energy of a point. Bringing $q_2$ in from infinity to distance $r$, quasistatically, costs the agent $kq_1 q_2/r$. That is [[#eq-pair]]. If both charges are positive the agent does positive work and $U > 0$: the charges would fly apart if released. If the signs are opposite, $U < 0$: the agent has to hold them back on the way in.

Releasing a charge from rest converts $U$ into $K$ according to the same ledger, provided you are clear about which object is allowed to move. If one charge is held fixed, the agent that holds it exerts a force through zero displacement and does no work. The entire drop in $U$ becomes kinetic energy of the charge that moves.

::: example A proton released beside a fixed proton {#ex-proton}
A proton is held fixed. A second proton is released from rest at distance $r = 1.00\,\mathrm{cm}$. Find its speed when it has reached infinity, and the energy converted, both in joules and in electron volts.
::: solution
Take $U = 0$ at infinite separation. The initial potential energy of the pair is [[#eq-pair]] with both charges equal to $e$. The product

$$
ke^2 = (8.9875517923\times 10^{9})(1.602176634\times 10^{-19})^2 = 2.30708\times 10^{-28}\,\mathrm{J\,m}
$$

is fixed by the constants of the course. At $r = 0.0100\,\mathrm{m}$,

$$
U_i = \frac{ke^2}{r} = 2.30708\times 10^{-26}\,\mathrm{J}, \qquad U_f = 0.
$$

The fixed proton does not move, so the holding agent does no work, and the released proton acquires

$$
\tfrac12 m_p v^2 = 2.30708\times 10^{-26}\,\mathrm{J}.
$$

With $m_p = 1.673\times 10^{-27}\,\mathrm{kg}$,

$$
v = \sqrt{\frac{2\times 2.30708\times 10^{-26}}{1.673\times 10^{-27}}} = \sqrt{27.580} = 5.252\,\mathrm{m/s}.
$$

To three significant figures, set by the separation $1.00\,\mathrm{cm}$, the speed is $5.25\,\mathrm{m/s}$.

The speed is modest because the energy is tiny, not because the force law has softened. Dividing $U_i$ by $e$ converts it to electron volts:

$$
\frac{U_i}{e} = \frac{ke}{r} = 1.440\times 10^{-7}\,\mathrm{eV}.
$$

A tenth of a micro-electron-volt is a very small energy on the scale of atomic physics. It is also small on the thermal scale. At $300\,\mathrm{K}$, with $k_B = 1.380649\times 10^{-23}\,\mathrm{J/K}$, the quantity $k_B T$ is $4.142\times 10^{-21}\,\mathrm{J}$, larger than $U_i$ by a factor of $1.80\times 10^{5}$. Two protons a centimetre apart do repel, and a proton released from rest does reach $5.25\,\mathrm{m/s}$ at infinity. Room-temperature thermal motion of a proton involves far more energy than this Coulomb reservoir. The arithmetic is the ordinary conservation law; the surprise is only the size of $ke^2/r$ at a laboratory distance.
:::
:::

::: definition Electron volt {#def-ev}
One **electron volt** is the kinetic energy gained by a particle of charge $e$ when it passes through a potential difference of one volt:

$$
1\,\mathrm{eV} = e\times 1\,\mathrm{V} = 1.602176634\times 10^{-19}\,\mathrm{J}.
$$ {#eq-ev}

With the coulomb and the joule fixed, this conversion is exact at the value of $e$ used in the course: the number is not a measurement to be rounded further.
:::

Kinetic energy in electron volts is numerically equal to the potential difference in volts, for a particle of charge $\pm e$, because $K = \abs{q\Delta V} = e\abs{\Delta V}$ when the particle starts from rest and the electric force is the net force. A proton or an electron accelerated through $50.0\,\mathrm{V}$ gains $50.0\,\mathrm{eV}$. The speeds differ, because the masses differ.

::: example An electron accelerated through 50 volts {#ex-electron}
An electron starts from rest and is accelerated through a potential difference of $50.0\,\mathrm{V}$. Find its final kinetic energy in joules and its speed. Compare the speed with $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$.
::: solution
The charge has magnitude $e$ and the electron travels towards higher potential, which is downhill for $U = qV$ when $q$ is negative. The kinetic energy gained is

$$
K = e\times 50.0\,\mathrm{V} = 50.0\times 1.602176634\times 10^{-19} = 8.01088\times 10^{-18}\,\mathrm{J},
$$

which is $50.0\,\mathrm{eV}$ by [[#def-ev]]. With $m_e = 9.109\times 10^{-31}\,\mathrm{kg}$,

$$
v = \sqrt{\frac{2K}{m_e}} = \sqrt{\frac{2\times 8.01088\times 10^{-18}}{9.109\times 10^{-31}}} = 4.19392\times 10^{6}\,\mathrm{m/s}.
$$

To three significant figures, $v = 4.19\times 10^{6}\,\mathrm{m/s}$. The ratio to the speed of light is

$$
\frac{v}{c} = \frac{4.19392\times 10^{6}}{2.99792458\times 10^{8}} = 0.0140.
$$

The non-relativistic kinetic energy sits below the relativistic value $(\gamma - 1)m_e c^2$ by a fraction of about $\tfrac{3}{4}(v/c)^2 \approx 1.5\times 10^{-4}$, one part in several thousand. That is smaller than the precision carried by $m_e$ as used here, so $\tfrac12 m v^2$ is the right formula for this $50.0\,\mathrm{V}$. A proton through the same potential difference gains the same $50.0\,\mathrm{eV}$ and a much smaller speed, because $m_p/m_e$ is about $1837$; that speed is an exercise.
:::
:::

## The field from the potential

Knowing $V$ everywhere determines $\mathbf{E}$, because [[#eq-delta-v]] relates an infinitesimal step to the change in $V$.

::: theorem The field is minus the gradient {#thm-grad}
Wherever $V$ is differentiable,

$$
\mathbf{E} = -\nabla V,
$$ {#eq-grad}

or, in cartesian components,

$$
E_x = -\pdv{V}{x}, \qquad E_y = -\pdv{V}{y}, \qquad E_z = -\pdv{V}{z}.
$$

If $V$ depends only on the radial distance $r$, then $E_r = -\deriv{V}{r}$ and the angular components vanish.
:::

::: proof
Consider a displacement $\dd\mathbf{l}$ from a point. By [[#eq-delta-v]], the change in potential along that step is $\dd V = -\mathbf{E}\cdot\dd\mathbf{l}$. By the definition of the gradient, the same change is $\dd V = \nabla V\cdot\dd\mathbf{l}$. Therefore $(\nabla V + \mathbf{E})\cdot\dd\mathbf{l} = 0$ for every infinitesimal $\dd\mathbf{l}$, which forces $\mathbf{E} = -\nabla V$.

The radial statement is the chain rule. On a radial step, $\dd V = (\deriv{V}{r})\,\dd r$ and also $\dd V = -E_r\,\dd r$, so $E_r = -\deriv{V}{r}$. For [[#eq-point-v]], $\deriv{V}{r} = -kq/r^2$ and $E_r = kq/r^2$, which is Coulomb's field again. The minus sign is what makes a positive charge's field point outward, towards decreasing $V$.
:::

::: proposition Equipotentials {#prop-equipot}
A surface on which $V$ is constant is an **equipotential**. The electric field, where it is nonzero, is perpendicular to the equipotential surface and points towards decreasing $V$. Field lines therefore cross equipotentials at right angles. A conductor in electrostatic equilibrium is an equipotential, because $\mathbf{E} = \mathbf{0}$ inside the material, so [[#eq-delta-v]] gives the same potential at every point of it, and the surface is the boundary of that region.
:::

::: proof
Take two neighbouring points on the surface $V = \mathrm{constant}$, and let $\dd\mathbf{l}$ join them. Then $\dd V = 0$. But $\dd V = -\mathbf{E}\cdot\dd\mathbf{l}$, so $\mathbf{E}$ is perpendicular to every tangent $\dd\mathbf{l}$ of the surface. The direction towards decreasing $V$ is the direction of $\mathbf{E}$, again by $\dd V = -\mathbf{E}\cdot\dd\mathbf{l}$. Inside a conductor in equilibrium the field is zero by the conductor theorem of [[electrostatics/gauss-law]], so the line integral between any two points of the material vanishes and those points share one potential. The surface charge does not spoil the conclusion: the field just outside is perpendicular to the surface, which is exactly the condition that the surface itself be an equipotential.
:::

For a positive point charge the equipotentials are spheres. The field lines are radii, leaving the charge and crossing each sphere at right angles, from high $V$ to low $V$. For the dipole above, the mid-plane is the equipotential $V = 0$, and the field on that plane is perpendicular to it.

::: widget charges
charges: 1, -1, 0; 1, 1, 0
caption: Two equal positive charges sit at x = −1 and x = +1. The arrows are the field that would act on a positive test charge. Equipotentials are not drawn: imagine the contours of V crowding around each charge. The arrows stand perpendicular to those contours. Between the charges the arrows weaken and turn aside; the midpoint is a saddle of V, where E vanishes and the contours cross.
:::

::: example Reading the field off a given potential {#ex-gradient}
In a region free of the charges that produce it, the potential is

$$
V(x, y) = \bigl(2.00\,\mathrm{V/m^2}\bigr)\, x^2 + \bigl(3.00\,\mathrm{V/m}\bigr)\, y,
$$

with $x$ and $y$ in metres and the expression in volts. Find $\mathbf{E}$ at the point $(1.00\,\mathrm{m},\, 2.00\,\mathrm{m})$, and the potential there.
::: solution
[[#eq-grad]] differentiates term by term. The coefficient $2.00\,\mathrm{V/m^2}$ produces a derivative $4.00\, x$ in volts per metre, and the second term does not depend on $x$:

$$
E_x = -\pdv{V}{x} = -\bigl(4.00\,\mathrm{V/m^2}\bigr)\, x, \qquad E_y = -\pdv{V}{y} = -3.00\,\mathrm{V/m}, \qquad E_z = 0.
$$

At $x = 1.00\,\mathrm{m}$ the field is $(-4.00,\, -3.00,\, 0)\,\mathrm{V/m}$. Its magnitude is

$$
\abs{\mathbf{E}} = \sqrt{(4.00)^2 + (3.00)^2} = 5.00\,\mathrm{V/m},
$$

which is $5.00\,\mathrm{N/C}$. The $y$ coordinate does not appear in $\mathbf{E}$: the second term of $V$ is a uniform field in the $-y$ direction, and the first term is a field that strengthens as $\abs{x}$ grows and points towards the plane $x = 0$. The potential at the point is

$$
V(1.00, 2.00) = (2.00)(1.00)^2 + (3.00)(2.00) = 8.00\,\mathrm{V}.
$$

A step in the direction of $\mathbf{E}$ lowers $V$ at the rate $5.00\,\mathrm{V}$ per metre. A step lying in the equipotential through this point, which is the curve $2.00\, x^2 + 3.00\, y = 8.00$, changes $V$ not at all, and $\mathbf{E}$ is perpendicular to that step.
:::
:::

::: intuition Contours and downhill
Treat $V$ as the height of a landscape, in volts rather than metres. Equipotentials are the contour lines. The field is the steepest downhill slope, and its magnitude is the gradient of the height. A positive test charge slides downhill. A negative test charge slides uphill in $V$, because its potential energy is $qV$ with $q < 0$, and downhill for $qV$ is uphill for $V$. Where the contours are crowded, $\abs{\mathbf{E}}$ is large. Where the landscape has a flat saddle, as it does midway between two equal charges, the field is zero and the contour lines cross.
:::

::: quiz
For the field of an infinite uniform sheet of charge, the convention $V(\infty) = 0$ is
- [ ] the natural choice, because every electrostatic potential vanishes at infinity
- [ ] available, and it forces $V$ to be zero everywhere, since the sheet is infinite
- [x] not available: the field does not fall off with distance, and the integral that would define $V(\infty) - V(0)$ diverges
- [ ] available, and it makes $V$ proportional to $1/r$ as for a point charge
::: solution
[[electrostatics/gauss-law#eq-sheet]] says the field of an infinite sheet has constant magnitude on each side. The integral of a constant over an infinite distance diverges, so there is no finite value of $V(\infty) - V(0)$ to set. A zero must be chosen at a finite reference point. The same obstruction appears for an infinite line, where $E$ falls only as $1/r$ and $\int \dd r/r$ is a logarithm that diverges at infinity. Localised charges, whose fields fall as $1/r^2$ or faster, are the ones for which $V(\infty) = 0$ is legitimate.
:::
:::

## Potentials obtained from Gauss's law

Wherever [[electrostatics/gauss-law]] has produced $\mathbf{E}$, [[#eq-delta-v]] produces $V$ by a one-dimensional integral. The constant of integration is the reference.

A uniform field $\mathbf{E} = E\,\hat{\mathbf{x}}$ with $E$ constant has $V(x) = -Ex + \mathrm{constant}$. The potential drops by $Ed$ across a displacement $d$ in the direction of the field. Parallel plates are the laboratory version, with fringing neglected in the middle of the gap. Plates separated by $d = 2.00\,\mathrm{mm}$ with a field of magnitude $2.50\times 10^{4}\,\mathrm{N/C}$ between them differ in potential by

$$
\abs{\Delta V} = Ed = (2.50\times 10^{4})(2.00\times 10^{-3}) = 50.0\,\mathrm{V}.
$$

The plate at the head of the field vector is the low-potential plate. The $50.0\,\mathrm{V}$ of [[#ex-electron]] is a difference of this kind. Capacitance, in [[electrostatics/capacitance]], is the relation between that difference and the charge on the plates; the potential difference itself is only $Ed$.

A spherical distribution is next. Outside any spherical charge of total $Q$, the field is the point-charge field, so with $V(\infty) = 0$ the potential outside is the point-charge potential. Inside, the field is different and the potential is not $kQ/r$.

::: proposition Potential of a uniform ball of charge {#prop-ball}
A ball of radius $R$ and total charge $Q$, with uniform density, has potential

$$
V(r) =
\begin{cases}
\dfrac{1}{4\pi\eps_0}\dfrac{Q}{r} & r \ge R, \\[1.2em]
\dfrac{1}{4\pi\eps_0}\dfrac{Q}{2R}\left(3 - \dfrac{r^2}{R^2}\right) & r \le R,
\end{cases}
$$ {#eq-ball-v}

when $V(\infty) = 0$. The two expressions agree at $r = R$. The centre is higher than the surface by $kQ/(2R)$ if $Q > 0$.
:::

::: proof
For $r \ge R$ the field is $E_r = kQ/r^2$ by the spherical theorem of [[electrostatics/gauss-law]]. [[#thm-point-v]] has already integrated that field from infinity, so $V(r) = kQ/r$. In particular $V(R) = kQ/R$.

For $r \le R$ the field is $E_r = kQr/R^3$. Integrate from the surface inward. [[#eq-delta-v]] gives

$$
\begin{aligned}
V(r) - V(R)
&= -\int_R^r \frac{kQ s}{R^3}\,\dd s
= -\frac{kQ}{R^3}\cdot\frac{1}{2}\bigl(r^2 - R^2\bigr)
= \frac{kQ}{2R}\left(1 - \frac{r^2}{R^2}\right).
\end{aligned}
$$

Add $V(R) = kQ/R = 2kQ/(2R)$:

$$
V(r) = \frac{kQ}{2R}\left(2 + 1 - \frac{r^2}{R^2}\right) = \frac{kQ}{2R}\left(3 - \frac{r^2}{R^2}\right).
$$

At $r = R$ this returns $kQ/R$. At $r = 0$ it returns $3kQ/(2R)$. Differentiating, $E_r = -\deriv{V}{r}$ reproduces $kQr/R^3$ inside and $kQ/r^2$ outside, so the potential and the field from Gauss's law are the same information. The potential is continuous at the surface, and so is $E_r$, as it must be for a charge spread through a volume rather than piled on a surface.
:::

The interior potential is not the interior field multiplied by a distance. At the centre the field is zero and the potential is at its maximum, for $Q > 0$. A positive test charge placed at the centre is in equilibrium, and the equilibrium is unstable: the potential has a maximum, not a minimum, and any displacement puts the charge on a slope pointing outward.

An infinite line cannot use the same reference. The field [[electrostatics/gauss-law#eq-line]] is $E_r = \lambda/(2\pi\eps_0 r) = 2k\lambda/r$. The integral of $1/r$ from a finite point out to infinity diverges, so $V(\infty)$ is not a finite number and cannot be set to zero. Choose a finite reference distance $r_0$ and set $V(r_0) = 0$. Then

$$
V(r) = -\int_{r_0}^{r} \frac{2k\lambda}{s}\,\dd s = -\frac{\lambda}{2\pi\eps_0}\ln\frac{r}{r_0}.
$$ {#eq-line-v}

If $\lambda > 0$ and $r < r_0$, the logarithm is negative and $V(r)$ is positive: closer to a positive line, the potential is higher. Shifting $r_0$ adds a constant, which does not change $\mathbf{E}$.

An infinite sheet has the same disease in a stronger form. With $E = \sigma/(2\eps_0)$ on each side, the integral of a nonzero constant out to infinity diverges linearly. Set $V = 0$ on the sheet. Then on either side

$$
V(z) = -\frac{\sigma}{2\eps_0}\abs{z}.
$$

The potential falls without a lower bound as you leave the sheet, if $\sigma > 0$. For $\sigma = 2.00\times 10^{-9}\,\mathrm{C/m^2}$ the field magnitude is $\sigma/(2\eps_0) = 112.9\,\mathrm{N/C}$, and at a distance of $5.00\,\mathrm{cm}$ the potential has fallen by $5.65\,\mathrm{V}$ from its value on the sheet. There is no further condition that would make it fall towards zero at large distance. It does not.

::: warning The zero at infinity is a choice, and sometimes an illegal one
Only differences of $V$ are fixed by the field. A number for $V$ at a single point means nothing until the reference is stated. For a point charge, a dipole, or any charge distribution that occupies a finite region and whose field falls at least as fast as $1/r^2$, the integral from a finite point out to infinity converges, and $V(\infty) = 0$ is a legal and convenient choice. It produces [[#eq-point-v]].

If the charge distribution itself extends to infinity, that choice is not available. An infinite line and an infinite sheet are the cases already solved. Their fields do not fall fast enough, the improper integral diverges, and a reference at infinity would assign an infinite potential to every finite point. Choose a finite reference instead. For a line of density $\lambda$, the potential that vanishes at perpendicular distance $r_0$ is [[#eq-line-v]],

$$
V(r) = -\frac{\lambda}{2\pi\eps_0}\ln\frac{r}{r_0}.
$$

Quoting $kq/r$ for a line, or insisting that every potential vanish at infinity, contradicts the integral that defines $V$.
:::

The radial form of Poisson's equation ties the two chapters together without the full divergence theorem.

::: proposition Radial Poisson equation {#prop-poisson}
Let $V$ and the charge density $\rho$ be spherically symmetric. Wherever the derivatives exist,

$$
\frac{1}{r^2}\deriv{}{r}\!\left(r^2\deriv{V}{r}\right) = -\frac{\rho}{\eps_0}.
$$ {#eq-poisson}

In a charge-free region the right-hand side is zero. The general equation $\nabla^2 V = -\rho/\eps_0$, Poisson's equation, reduces to this when nothing depends on angle. The point-charge potential $kq/r$ satisfies the charge-free equation at every $r \neq 0$.
:::

::: proof
For a spherically symmetric field, Gauss's law on a sphere says $E_r(r)\cdot 4\pi r^2 = Q(r)/\eps_0$, with $Q(r) = \int_0^r \rho(s)\, 4\pi s^2\,\dd s$. Differentiate both sides with respect to $r$. The fundamental theorem of calculus turns the charge integral into the density at the surface, and

$$
\deriv{}{r}\bigl(r^2 E_r\bigr) = \frac{\rho r^2}{\eps_0}.
$$

[[#thm-grad]] says $E_r = -\deriv{V}{r}$ for a radial potential. Substitute that in, and divide by $r^2$, to obtain [[#eq-poisson]].

For $V = kq/r$ at $r \neq 0$, one has $r^2 \deriv{V}{r} = r^2(-kq/r^2) = -kq$, whose derivative is zero. The left-hand side of [[#eq-poisson]] vanishes, in agreement with $\rho = 0$ everywhere except at the origin, where $V$ is not differentiable and the point charge is not a finite density. The identity $\nabla^2(1/r) = 0$ for $r \neq 0$ is the same fact in the notation of [[math-methods/vector-calculus]].
:::

::: history
Siméon Denis Poisson, in 1813, wrote the equation connecting the electrostatic potential to the charge density, $\nabla^2 V = -\rho/\eps_0$ in the units used here. The unknown in that equation is the scalar $V$, not the vector field, which is the practical reason the potential earned a chapter of its own. George Green, in *An Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism* (1828), built the integral machinery that solves Poisson's equation from a source and a boundary: what is now called a Green's function appears there in the electrical setting. The inverse-square force was already old. The step taken by Poisson and by Green was to treat the potential as the object one solves for, and the field as its slope.
:::

## Where this leads

Two conductors held at a fixed potential difference form a capacitor. The charge that flows, and the energy stored, are the subject of [[electrostatics/capacitance]]: the agent that charges the plates does work $\int V\,\dd q$.

::: summary
- The potential difference is $V(B) - V(A) = -\int_A^B \mathbf{E}\cdot\dd\mathbf{l}$. The volt is a joule per coulomb. Only differences of $V$ are fixed until a zero is chosen ([[#def-potential]]).
- The Coulomb field is conservative. For a point charge, $\int_A^B \mathbf{E}\cdot\dd\mathbf{l} = kq(1/r_A - 1/r_B)$, so with $V(\infty) = 0$ one has $V = kq/r$ ([[#thm-path]], [[#thm-point-v]]).
- Potential superposes as a scalar. The interaction energy of a pair is $kq_1 q_2/r$, counted once. The work done by the field is $-\Delta U$, and it equals $\Delta K$ when the electric force is the net force ([[#eq-pair]]).
- $\mathbf{E} = -\nabla V$. Equipotentials are perpendicular to field lines, and the field points towards decreasing $V$. A conductor in equilibrium is an equipotential ([[#thm-grad]], [[#prop-equipot]]).
- One electron volt is $1.602176634\times 10^{-19}\,\mathrm{J}$. A proton released from rest $1.00\,\mathrm{cm}$ from a fixed proton reaches $5.25\,\mathrm{m/s}$ at infinity; the energy converted is $1.440\times 10^{-7}\,\mathrm{eV}$.
- Outside a spherical charge, $V = kQ/r$. Inside a uniform ball, $V = (kQ/(2R))(3 - r^2/R^2)$. The zero at infinity is legal for these, and illegal for an infinite line or sheet ([[#eq-ball-v]], [[#eq-line-v]]).
- For spherical symmetry, $(1/r^2)\deriv{}{r}(r^2 \deriv{V}{r}) = -\rho/\eps_0$. Away from the origin, $kq/r$ is a solution with $\rho = 0$.
:::

## Exercises

::: exercise Where the potential is 100 volts {level=1 check="8.9875517923e9*2e-9/100"}
A point charge $q = +2.00\,\mathrm{nC}$ is assigned $V(\infty) = 0$. At what distance from it, in metres, is the potential equal to $+100\,\mathrm{V}$?
::: solution
[[#eq-point-v]] gives $V = kq/r$, so

$$
r = \frac{kq}{V} = \frac{(8.9875517923\times 10^{9})(2.00\times 10^{-9})}{100} = 0.179751\,\mathrm{m}.
$$

To three significant figures, $r = 0.180\,\mathrm{m}$. The potential is positive because $q$ is positive, and it falls as you move out, so there is exactly one such sphere. An equipotential of $-100\,\mathrm{V}$ does not exist for this charge: $kq/r$ never becomes negative.
:::
:::

::: exercise A proton through the same 50 volts {level=1 check="sqrt(2*50*1.602176634e-19/1.673e-27)"}
A proton starts from rest and is accelerated through a potential difference of $50.0\,\mathrm{V}$. Find its final speed, in $\mathrm{m/s}$. Use $m_p = 1.673\times 10^{-27}\,\mathrm{kg}$.
::: solution
The kinetic energy gained is $50.0\,\mathrm{eV}$, the same as the electron's in [[#ex-electron]], because the charge magnitude is $e$:

$$
K = 50.0\times 1.602176634\times 10^{-19} = 8.01088\times 10^{-18}\,\mathrm{J}.
$$

The speed follows from $\tfrac12 m_p v^2 = K$:

$$
v = \sqrt{\frac{2K}{m_p}} = \sqrt{\frac{2\times 50.0\times 1.602176634\times 10^{-19}}{1.673\times 10^{-27}}} = 9.78605\times 10^{4}\,\mathrm{m/s}.
$$

To three significant figures, $v = 9.79\times 10^{4}\,\mathrm{m/s}$. The electron through the same difference reached $4.19\times 10^{6}\,\mathrm{m/s}$, faster by about $\sqrt{m_p/m_e}$. The proton's speed is a few parts in $10^{4}$ of the speed of light, and the non-relativistic formula is more than adequate.
:::
:::

::: exercise Potential a quarter of a metre from a nanocoulomb charge {level=1 check="8.9875517923e9*4e-9/0.25"}
Find the potential, in volts, at distance $r = 0.250\,\mathrm{m}$ from a point charge $q = 4.00\,\mathrm{nC}$, with $V(\infty) = 0$.
::: solution
[[#eq-point-v]] gives

$$
V = \frac{kq}{r} = \frac{(8.9875517923\times 10^{9})(4.00\times 10^{-9})}{0.250} = 143.801\,\mathrm{V}.
$$

To three significant figures, $V = 144\,\mathrm{V}$. This is the exterior potential of any spherical charge distribution of total $4.00\,\mathrm{nC}$ whose entire charge lies inside $r = 0.250\,\mathrm{m}$, by [[#prop-ball]] and the spherical theorem. The interior formula is not for use at this point.
:::
:::

::: exercise Speed at a finite separation {level=2 check="sqrt(2*8.9875517923e9*(1.602176634e-19)^2/(1.673e-27)*(1/0.01-1/0.05))"}
A proton is released from rest at $1.00\,\mathrm{cm}$ from a fixed proton, as in [[#ex-proton]]. Find its speed, in $\mathrm{m/s}$, when the separation has grown to $5.00\,\mathrm{cm}$, rather than to infinity.
::: hint
The final potential energy is $ke^2/r_f$, not zero. The drop in $U$ equals $\tfrac12 m_p v^2$.
:::
::: solution
Energy conservation with the fixed proton doing no work reads $\tfrac12 m_p v^2 = ke^2(1/r_i - 1/r_f)$. Insert $r_i = 0.0100\,\mathrm{m}$ and $r_f = 0.0500\,\mathrm{m}$:

$$
v = \sqrt{\frac{2ke^2}{m_p}\left(\frac{1}{0.0100} - \frac{1}{0.0500}\right)} = \sqrt{\frac{2ke^2}{m_p}\times 80.0}.
$$

The value of the square root is $4.69724\,\mathrm{m/s}$. To three significant figures, $v = 4.70\,\mathrm{m/s}$. In [[#ex-proton]] the speed at infinity was $5.25\,\mathrm{m/s}$. Most of that speed is acquired in the first few centimetres, because $U$ falls as $1/r$ and the steep part of the curve is at small $r$. From $5.00\,\mathrm{cm}$ onward the remaining kinetic energy is only a fifth of what has already been gained.
:::
:::

::: exercise Potential of a line, with a finite zero {level=2 check="-2*8.9875517923e9*3e-9*ln(0.02/0.5)"}
An infinite line carries $\lambda = 3.00\,\mathrm{nC/m}$. The potential is chosen to vanish at perpendicular distance $r_0 = 0.500\,\mathrm{m}$. Find $V$ at $r = 2.00\,\mathrm{cm}$, in volts.
::: hint
Use [[#eq-line-v]]. The logarithm of a number smaller than one is negative, and the leading minus sign then makes $V$ positive for $\lambda > 0$.
:::
::: solution
[[#eq-line-v]] with $2k\lambda = \lambda/(2\pi\eps_0)$ gives

$$
V(0.0200\,\mathrm{m}) = -2k\lambda\ln\frac{0.0200}{0.500} = -2(8.9875517923\times 10^{9})(3.00\times 10^{-9})\ln(0.0400).
$$

Since $\ln(0.0400) = -3.21888$, the two minus signs produce a positive potential,

$$
V = 173.579\,\mathrm{V}.
$$

To three significant figures, $V = 174\,\mathrm{V}$. The point is closer to a positive line than the reference is, so the potential is above the reference. Setting $V(\infty) = 0$ instead would have asked for $\ln(0)$, which is not a real number. Shifting the reference to some other finite $r_0$ would add the same constant at every finite $r$ and would leave $E = 2k\lambda/r$ unchanged.
:::
:::

::: exercise Potential at the centre of a uniform ball {level=2 check="3/2*8.9875517923e9*4e-9/0.1"}
The uniformly charged ball of [[electrostatics/gauss-law]] has radius $R = 0.100\,\mathrm{m}$ and total charge $Q = 4.00\,\mathrm{nC}$. Using the interior potential of this chapter, find $V$ at the centre, in volts, with $V(\infty) = 0$.
::: hint
[[#eq-ball-v]] at $r = 0$ is $3kQ/(2R)$, not $kQ/R$ and not zero. The field is zero at the centre; the potential is not.
:::
::: solution
At $r = 0$, [[#eq-ball-v]] reduces to $3kQ/(2R)$:

$$
V(0) = \frac{3}{2}\cdot\frac{kQ}{R} = \frac{3}{2}\cdot\frac{(8.9875517923\times 10^{9})(4.00\times 10^{-9})}{0.100} = 539.253\,\mathrm{V}.
$$

To three significant figures, $V(0) = 539\,\mathrm{V}$. The surface is at $V(R) = kQ/R = 359.5\,\mathrm{V}$, and the centre is higher by $kQ/(2R) = 179.8\,\mathrm{V}$. A positive test charge released from rest at the centre stays there, because $\mathbf{E} = \mathbf{0}$. A positive test charge released from rest anywhere else inside the ball runs outward, towards lower potential, and arrives at infinity with kinetic energy $qV$ equal to its initial potential energy. The field being zero at one point does not make the potential zero there.
:::
:::

::: exercise Halfway in value, not halfway in radius {level=3 check="0.1/sqrt(2)"}
Derive the interior potential [[#eq-ball-v]] from the interior field $E_r = kQr/R^3$ and the surface value $V(R) = kQ/R$. Then, for $R = 0.100\,\mathrm{m}$, find the radius in metres at which $V$ equals the arithmetic mean of $V(0)$ and $V(R)$.
::: hint
Write $\alpha = kQ/(2R)$, so that $V(0) = 3\alpha$ and $V(R) = 2\alpha$. Set the interior formula equal to $5\alpha/2$ and solve for $r/R$. The charge cancels.
:::
::: solution
Integrate the interior field from the surface to radius $r < R$:

$$
V(r) - V(R) = -\int_R^r \frac{kQ s}{R^3}\,\dd s = \frac{kQ}{2R}\left(1 - \frac{r^2}{R^2}\right).
$$

Add $V(R) = kQ/R$:

$$
V(r) = \frac{kQ}{2R}\left(3 - \frac{r^2}{R^2}\right),
$$

which is [[#eq-ball-v]]. Set $\alpha = kQ/(2R)$. Then $V(0) = 3\alpha$, $V(R) = 2\alpha$, and the arithmetic mean is $5\alpha/2$. The interior formula is $V(r) = \alpha(3 - r^2/R^2)$, so

$$
3 - \frac{r^2}{R^2} = \frac{5}{2}, \qquad \frac{r^2}{R^2} = \frac{1}{2}, \qquad r = \frac{R}{\sqrt{2}}.
$$

For $R = 0.100\,\mathrm{m}$,

$$
r = \frac{0.100}{\sqrt{2}} = 0.070711\,\mathrm{m}.
$$

The radius is $7.07\,\mathrm{cm}$, past the midpoint, because $V$ depends on $r^2$ and stays near its central value until $r$ is a large fraction of $R$. At this radius the field is $E(R)/\sqrt{2}$.
:::
:::

::: exercise Both protons free {level=3 check="sqrt(8.9875517923e9*(1.602176634e-19)^2/(1.673e-27*0.01))"}
Two protons are released from rest, with initial separation $1.00\,\mathrm{cm}$. Neither is held fixed. Find the speed of each proton when the separation is infinite, in $\mathrm{m/s}$.
::: hint
The initial potential energy $ke^2/r$ is shared. The centre of mass stays at rest, so the protons have equal speeds, and the sum of their kinetic energies equals the lost potential energy. Do not give each proton the whole of $ke^2/r$.
:::
::: solution
No external force acts. The centre of mass, initially at rest, stays at rest, and the two velocities remain equal and opposite. The potential energy [[#eq-pair]] is the energy of the pair, counted once. At infinite separation it has all become kinetic energy:

$$
2\times \tfrac12 m_p v^2 = \frac{ke^2}{r}, \qquad \tfrac12 m_p v^2 = \frac{ke^2}{2r}.
$$

Hence

$$
v = \sqrt{\frac{ke^2}{m_p r}} = \sqrt{\frac{(8.9875517923\times 10^{9})(1.602176634\times 10^{-19})^2}{(1.673\times 10^{-27})(0.0100)}} = 3.71350\,\mathrm{m/s}.
$$

To three significant figures, each proton reaches $3.71\,\mathrm{m/s}$. In [[#ex-proton]] the single moving proton reached $5.25\,\mathrm{m/s}$, and $5.25/\sqrt{2} = 3.71$: the same energy is now split into two equal shares. The relative speed is $7.43\,\mathrm{m/s}$. Giving each proton the fixed-proton speed would double-count $ke^2/r$ and would violate momentum conservation.
:::
:::
