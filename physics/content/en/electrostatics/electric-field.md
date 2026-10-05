Coulomb's law, in [[electrostatics/coulomb]], gives the force between two point charges, and it ties them together. Double the charge you are watching and the force doubles, whatever the source is doing. It is useful to factor that charge out and keep a vector that describes only the sources. That vector is the **electric field**. Once it is known at a point, the force on a charge $q$ placed there is $q$ times the field, with no further reference to how the sources were assembled.

The division is not a new force law. It is [[electrostatics/coulomb#thm-coulomb]] rearranged so that the source is the thing you compute, and the charge that feels the force is supplied later. The same rearrangement turns superposition of forces into superposition of fields, and it turns an integral over a distribution into an integral for a vector. Field lines are a picture of that vector, not a substitute for the integral. Motion in a uniform field is then ordinary constant-acceleration kinematics from [[mechanics/motion-1d]].

## The field of a point charge

A test charge is a charge you place at a point in order to feel the force. It is a probe, not part of the apparatus that produces the force.

::: definition Electric field {#def-field}
The **electric field** $\mathbf{E}$ at a point is the electrostatic force $\mathbf{F}$ that a test charge $q_0$ would experience there, divided by $q_0$:

$$
\mathbf{E} = \frac{\mathbf{F}}{q_0}.
$$ {#eq-def-E}

The direction of $\mathbf{E}$ is the direction of the force on a *positive* test charge. The SI unit is the newton per coulomb, $\mathrm{N/C}$. If the sources are fixed, $\mathbf{F}$ is proportional to $q_0$ and the quotient does not depend on which test charge you chose. If the sources can rearrange, as free charges in a conductor can, $q_0$ must be small enough not to move them. The idealisation is the limit $q_0 \to 0$ through values that are still many elementary charges.
:::

The unit $\mathrm{N/C}$ is also called a volt per metre. The volt is defined with potential, in [[electrostatics/potential]], and the two names are the same unit. This chapter works entirely in $\mathrm{N/C}$.

For fixed point sources the limit is unnecessary, because [[electrostatics/coulomb#ax-superposition]] already makes the force strictly proportional to $q_0$. The limit earns its place on a conductor, where a fat test charge would shift the very distribution you were trying to measure. In the problems below the sources are fixed, so any convenient $q_0$ gives the same $\mathbf{E}$.

::: theorem Field of a point charge {#thm-point}
A point charge $q$ at rest in vacuum produces, at a displacement $\mathbf{r}$ from itself with $r = \abs{\mathbf{r}} > 0$, the electric field

$$
\mathbf{E} = \frac{1}{4\pi\varepsilon_0}\,\frac{q}{r^{2}}\,\hat{\mathbf{r}},
$$ {#eq-point}

where $\hat{\mathbf{r}} = \mathbf{r}/r$ points from the source charge to the field point. The field points away from $q$ if $q > 0$ and towards $q$ if $q < 0$. With $k = 1/(4\pi\varepsilon_0) = 8.9875517923\times 10^{9}\,\mathrm{N\cdot m^{2}/C^{2}}$, the magnitude is $k\abs{q}/r^{2}$.
:::

::: proof
Put a test charge $q_0$ at the field point. [[electrostatics/coulomb#thm-coulomb]] says the force on it is

$$
\mathbf{F} = \frac{1}{4\pi\varepsilon_0}\,\frac{q q_0}{r^{2}}\,\hat{\mathbf{r}},
$$

with $\hat{\mathbf{r}}$ pointing from the source to the test charge, which is the field point. Divide by $q_0$. The test charge cancels, for $q_0 \neq 0$, and the quotient is [[#eq-point]]. The sign of $q$ alone decides whether $\mathbf{E}$ is parallel or antiparallel to $\hat{\mathbf{r}}$. The constant $k$ is the same constant as in [[electrostatics/coulomb#eq-k]], and the same remark applies: the stated digits of $k$ and of $\varepsilon_0 = 8.854187817\times 10^{-12}\,\mathrm{C^{2}/(N\cdot m^{2})}$ agree to a few parts in $10^{10}$, and numerical work uses $k$.
:::

::: example The field half a centimetre from a nanocoulomb {#ex-nanoc}
Find the electric field $5.00\,\mathrm{cm}$ from a point charge $-3.00\,\mathrm{nC}$.
::: solution
The magnitude is

$$
E = \frac{k\,\abs{q}}{r^{2}} = \frac{(8.9875517923\times 10^{9})\,(3.00\times 10^{-9})}{(0.0500)^{2}} = 1.0785\times 10^{4}\,\mathrm{N/C}.
$$

To four significant figures, $E = 1.079\times 10^{4}\,\mathrm{N/C}$. The source is negative, so $\mathbf{E}$ points towards it. A positive test charge would be attracted; a negative test charge would be repelled, opposite $\mathbf{E}$, with a force of magnitude $\abs{q_0} E$.
:::
:::

::: quiz
The test charge used to measure $\mathbf{E}$ at a fixed point, with fixed sources, is doubled. What happens?
- [ ] $\mathbf{E}$ doubles and the force stays the same
- [ ] $\mathbf{E}$ reverses, because the test charge changed
- [x] The force doubles and $\mathbf{E}$ is unchanged
- [ ] Both the force and $\mathbf{E}$ stay the same, because the sources were fixed
::: solution
[[#eq-def-E]] divides the force by $q_0$. For fixed sources the force is proportional to $q_0$, so the quotient $\mathbf{E}$ is a property of the sources and the point. Doubling $q_0$ doubles $\mathbf{F}$ and leaves $\mathbf{E}$ alone. The third option would be right only if "the force" were not part of the measurement. It is.
:::
:::

## Superposition

Forces add by [[electrostatics/coulomb#ax-superposition]]. Fields are forces per unit test charge, so they add in the same way.

::: proposition Superposition of fields {#prop-super-E}
The electric field of a collection of fixed point charges is the vector sum of the fields each charge would produce alone. At a point that does not coincide with any source,

$$
\mathbf{E} = \frac{1}{4\pi\varepsilon_0}\sum_i \frac{q_i}{r_i^{2}}\,\hat{\mathbf{r}}_i,
$$ {#eq-super-E}

where $\mathbf{r}_i$ runs from charge $i$ to the field point.
:::

::: proof
The force on a test charge $q_0$ at the field point is the sum of the Coulomb forces. Divide that sum by $q_0$. Division by a nonzero scalar passes inside a finite sum, and each term becomes the field of one source. The same identity is [[#eq-def-E]] applied to the net force. A source sitting on the field point is excluded because [[#eq-point]] is not defined at $r = 0$: the point-charge model has already failed there.
:::

The arithmetic is the arithmetic of [[electrostatics/coulomb#alg-super]], with one change of reading. You are no longer resolving the force on a named third charge. You are resolving $\mathbf{E}$, and the third charge, if you want a force afterwards, is a multiplication by $q$ at the end. The null of the net force on a test charge is the null of $\mathbf{E}$, so the location in [[electrostatics/coulomb#prop-null]] is a zero of the field, independent of the test charge for the same reason that formula did not contain $q$.

::: example Two equal charges, on the bisector {#ex-bisector}
Charges $+5.00\,\mathrm{nC}$ sit at $(0,\, 0)$ and at $(0.600\,\mathrm{m},\, 0)$. Find $\mathbf{E}$ at $(0.300\,\mathrm{m},\, 0.400\,\mathrm{m})$.
::: solution
The field point is $0.500\,\mathrm{m}$ from each charge, another $3$-$4$-$5$ triangle. Each source is positive, so each field points away from its source. The magnitude of either contribution is

$$
E_1 = \frac{k\,(5.00\times 10^{-9})}{(0.500)^{2}} = 179.75\,\mathrm{N/C}.
$$

The unit vector from the origin to the field point is $(0.600,\, 0.800)$. The unit vector from $(0.600\,\mathrm{m},\, 0)$ to the field point is $(-0.600,\, 0.800)$. Adding component by component,

$$
\begin{aligned}
E_x &= 179.75\times 0.600 + 179.75\times(-0.600) = 0, \\
E_y &= 179.75\times 0.800 + 179.75\times 0.800 = 287.60\,\mathrm{N/C}.
\end{aligned}
$$

The horizontal pieces cancel by symmetry, as they must: the point lies on the perpendicular bisector of two equal charges. The field is $287.6\,\mathrm{N/C}$ straight up. To four figures the single-charge magnitude is $179.8\,\mathrm{N/C}$ and the sum is $287.6\,\mathrm{N/C}$. A positive test charge placed there would be pushed in the $+y$ direction; the force would be $q E_y$, not another application of Coulomb's law from scratch.
:::
:::

::: intuition What the arrows are for
An arrow drawn at a point is $\mathbf{E}$ at that point, a property of the place. It is not a force until you multiply by the charge you put there, and it does not point from one charge to another unless the source happens to be a single point charge. Superposition tilts the arrow off every individual line of centres.
:::

## Continuous distributions

A charged rod is not a point, and it is not a finite list of points either. Superposition survives as an integral.

::: definition Charge density {#def-density}
When charge is spread along a curve, over a surface or through a volume, the **linear**, **surface** and **volume** charge densities are

$$
\lambda = \deriv{q}{\ell}, \qquad \sigma = \deriv{q}{A}, \qquad \rho = \deriv{q}{V},
$$

so that $\mathrm{d}q = \lambda\,\mathrm{d}\ell = \sigma\,\mathrm{d}A = \rho\,\mathrm{d}V$. A uniform density is constant and equals the total charge divided by the length, area or volume. Densities may be positive or negative.
:::

The field of a continuous distribution, at a point outside the charge itself, is the integral of [[#eq-point]]:

$$
\mathbf{E} = \frac{1}{4\pi\varepsilon_0}\int \frac{\mathrm{d}q}{r^{2}}\,\hat{\mathbf{r}},
$$ {#eq-integral}

with $r$ and $\hat{\mathbf{r}}$ taken from the element $\mathrm{d}q$ to the field point. The integral is a vector integral. One component often vanishes by symmetry before any antiderivative is attempted, and that cancellation is the part worth seeing first.

::: theorem Field on the axis of a charged ring {#thm-ring}
A ring of radius $R > 0$ carries a total charge $Q$ uniformly around its circumference. On the axis of the ring, a distance $z$ from the centre,

$$
E_z = \frac{1}{4\pi\varepsilon_0}\,\frac{Q z}{(R^{2} + z^{2})^{3/2}},
$$ {#eq-ring}

and the field perpendicular to the axis is zero. For $Q > 0$ and $z > 0$, $E_z$ points away from the centre along the axis.
:::

::: proof
Every element $\mathrm{d}q$ is at the same distance $s = \sqrt{R^{2} + z^{2}}$ from the field point. Its contribution has magnitude $\mathrm{d}E = k\,\mathrm{d}q/s^{2}$. Resolve $\mathrm{d}\mathbf{E}$ into a component along the axis and a component in the plane of the ring. The plane of the ring is perpendicular to the axis, and the ring is unchanged by a rotation about the axis, so the transverse components cancel in pairs: each element has an opposite element whose transverse field is reversed. Only the axial component survives.

The angle $\alpha$ between the line from an element to the field point and the axis satisfies $\cos\alpha = z/s$. Therefore

$$
\mathrm{d}E_z = \mathrm{d}E\cos\alpha = \frac{1}{4\pi\varepsilon_0}\,\frac{\mathrm{d}q\, z}{s^{3}}.
$$

The factor $z/s^{3}$ is the same for every element. Integrating $\mathrm{d}q$ over the ring replaces it by $Q$ and produces [[#eq-ring]]. If $z > 0$ and $Q > 0$, then $E_z > 0$: the field points away from the ring's centre. At $z = 0$, in the plane of the ring at the centre, the formula gives zero, which is the transverse cancellation with nothing left along the axis.
:::

At large $\abs{z}$ the ring looks like a point. Expanding [[#eq-ring]] for $\abs{z} \gg R$ gives $E_z \approx k Q/z^{2}$, because $(R^{2} + z^{2})^{3/2} \approx \abs{z}^{3}$ and the remaining $z/\abs{z}^{3}$ is $1/z^{2}$ with the sign of $z$. Close to the ring the point-charge formula is an overestimate: the charge is off the axis, and only the axial projection counts.

::: example A ring, level with its radius {#ex-ring}
A ring of radius $R = 0.100\,\mathrm{m}$ carries $Q = +5.00\,\mathrm{nC}$. Find $E_z$ on the axis at $z = 0.100\,\mathrm{m}$, and compare it with the field of a point charge $Q$ at the same distance.
::: solution
Here $R = z$, so $R^{2} + z^{2} = 2R^{2}$ and

$$
E_z = \frac{k Q R}{(2R^{2})^{3/2}} = \frac{k Q}{2\sqrt{2}\, R^{2}} = \frac{k\,(5.00\times 10^{-9})}{2\sqrt{2}\,(0.0100)} = 1.5888\times 10^{3}\,\mathrm{N/C}.
$$

To four figures, $1.589\times 10^{3}\,\mathrm{N/C}$, pointing away from the centre. A point charge $Q$ at distance $z$ would produce

$$
\frac{k Q}{z^{2}} = 4.4938\times 10^{3}\,\mathrm{N/C}.
$$

The ratio is $1/(2\sqrt{2}) = \sqrt{2}/4 = 0.3536$. About a third of the point-charge field survives, which is $\cos\alpha$ evaluated for this geometry together with the fact that $s$ is $\sqrt{2}$ times $z$, not $z$. Using $kQ/z^{2}$ on the axis of a ring of this size is not a small correction. It is the wrong model.
:::
:::

A straight rod is the other elementary integral. The perpendicular bisector is the line on which symmetry does half the work.

::: theorem Field of a uniform rod, on the bisector {#thm-rod}
A straight rod of length $L > 0$ carries a charge $Q$ uniformly, so $\lambda = Q/L$. At a distance $x > 0$ from the centre, on the perpendicular bisector,

$$
E = \frac{1}{4\pi\varepsilon_0}\,\frac{Q}{x\sqrt{x^{2} + (L/2)^{2}}},
$$ {#eq-rod}

directed away from the rod if $Q > 0$ and towards the rod if $Q < 0$. The component parallel to the rod is zero.
:::

::: proof
Lay the rod on the $z$ axis from $-L/2$ to $L/2$, and put the field point at $(x, 0)$ in the plane perpendicular to the rod, with $x > 0$. An element $\lambda\,\mathrm{d}z$ at coordinate $z$ is at distance $r = \sqrt{x^{2} + z^{2}}$. Its field has a component along the rod and a component along the bisector. The along-rod components from $+z$ and $-z$ are equal and opposite, so the integral of that component over a symmetric rod is zero.

The bisector component of $\mathrm{d}\mathbf{E}$ is $\mathrm{d}E$ times $x/r$:

$$
\mathrm{d}E_x = \frac{1}{4\pi\varepsilon_0}\,\frac{\lambda\,\mathrm{d}z}{r^{2}}\cdot\frac{x}{r} = \frac{1}{4\pi\varepsilon_0}\,\lambda x\,(x^{2} + z^{2})^{-3/2}\,\mathrm{d}z.
$$

The antiderivative follows from $z = x\tan\theta$, so $\mathrm{d}z = x\sec^{2}\theta\,\mathrm{d}\theta$ and $x^{2} + z^{2} = x^{2}\sec^{2}\theta$. The integrand collapses to $\cos\theta\,\mathrm{d}\theta/x^{2}$, whose integral is $\sin\theta/x^{2}$. Since $\sin\theta = z/r$,

$$
\int (x^{2} + z^{2})^{-3/2}\,\mathrm{d}z = \frac{z}{x^{2}\sqrt{x^{2} + z^{2}}}.
$$

Evaluate from $-L/2$ to $L/2$. The two ends contribute equally:

$$
\int_{-L/2}^{L/2} (x^{2} + z^{2})^{-3/2}\,\mathrm{d}z = \frac{L}{x^{2}\sqrt{x^{2} + (L/2)^{2}}}.
$$

Multiply by $k\lambda x$. One power of $x$ cancels, and $\lambda L = Q$, which is [[#eq-rod]].
:::

Two limits are worth taking, because they are the checks on the formula. If $x \gg L$, the square root is approximately $x$, and $E \approx k Q/x^{2}$: far away the rod looks like a point, as the ring did. If instead the rod becomes very long at fixed $\lambda$, so that $L/2 \gg x$, then $\sqrt{x^{2} + (L/2)^{2}} \approx L/2$ and

$$
E \approx \frac{1}{4\pi\varepsilon_0}\,\frac{\lambda L}{x\cdot(L/2)} = \frac{1}{4\pi\varepsilon_0}\,\frac{2\lambda}{x} = \frac{\lambda}{2\pi\varepsilon_0 x}.
$$

::: corollary Field of an infinite straight line {#cor-line}
An infinite straight line carrying a uniform linear density $\lambda$ produces a field of magnitude

$$
E = \frac{\lambda}{2\pi\varepsilon_0 r} = \frac{2k\lambda}{r},
$$ {#eq-line}

at perpendicular distance $r$ from the line. The field is radial in the plane perpendicular to the line, outward if $\lambda > 0$. It does not depend on any coordinate along the line.
:::

::: proof
The limit just taken is [[#eq-line]], with $r$ written for the perpendicular distance $x$. The two expressions agree because $k = 1/(4\pi\varepsilon_0)$, so $2k\lambda/r = \lambda/(2\pi\varepsilon_0 r)$. An infinite line has no end and no centre, so the field cannot prefer a direction along the line, and it can depend on the perpendicular distance only. [[electrostatics/gauss-law]] obtains the same result from that symmetry without taking a limit of a finite rod. The integral above is the reason the result is true; Gauss's law is the reason it is short.
:::

::: example A half-metre rod {#ex-rod}
A rod of length $L = 0.500\,\mathrm{m}$ carries $Q = +10.0\,\mathrm{nC}$, uniformly. Find the field on the perpendicular bisector at $x = 0.200\,\mathrm{m}$. Compare it with the point-charge field of the same $Q$ at the same distance, and with the infinite-line field of the same $\lambda$ at the same distance.
::: solution
[[#eq-rod]] gives

$$
E = \frac{k\,(1.00\times 10^{-8})}{0.200\,\sqrt{0.200^{2} + 0.250^{2}}} = \frac{k\,(1.00\times 10^{-8})}{0.200\,\sqrt{0.1025}} = 1.4036\times 10^{3}\,\mathrm{N/C},
$$

or $1.404\times 10^{3}\,\mathrm{N/C}$ to four figures, directed away from the rod. The point-charge comparison is $k Q/x^{2} = 2.2469\times 10^{3}\,\mathrm{N/C}$. The rod's field is the fraction

$$
\frac{x}{\sqrt{x^{2} + (L/2)^{2}}} = \frac{0.200}{\sqrt{0.1025}} = \frac{4}{\sqrt{41}} = 0.6247
$$

of that point-charge field. The charge is spread along the rod, so some of it is further from the field point than $x$, and the parallel components have cancelled.

The linear density is $\lambda = Q/L = 2.00\times 10^{-8}\,\mathrm{C/m}$. [[#eq-line]] at $r = 0.200\,\mathrm{m}$ would give $2k\lambda/r = 1.7975\times 10^{3}\,\mathrm{N/C}$, larger than the finite rod because an infinite line has more charge far out, all of it still contributing a piece of outward field. The finite rod sits between the point and the infinite line: $1.404\times 10^{3}$ against $2.247\times 10^{3}$ and $1.798\times 10^{3}$, in $\mathrm{N/C}$.
:::
:::

## The electric dipole

Two equal and opposite charges a short distance apart are the standard source that is neutral overall and still produces a field. The field falls faster than the field of a point, because the leading $1/r^{2}$ pieces cancel.

::: definition Electric dipole {#def-dipole}
An **electric dipole** is a pair of charges $+q$ and $-q$ separated by a vector $\mathbf{d}$ of length $d > 0$, drawn from the negative charge to the positive charge. The **dipole moment** is

$$
\mathbf{p} = q\mathbf{d}.
$$ {#eq-dipole}

The moment points from negative to positive. Its SI unit is the coulomb-metre.
:::

Place $+q$ at $z = +d/2$ and $-q$ at $z = -d/2$, so $\mathbf{p}$ lies along the positive $z$ axis. On the axis, beyond the positive charge, the field of $+q$ points in the $+z$ direction and the field of $-q$ points in the $-z$ direction, towards the negative charge. They oppose, and the nearer charge wins.

::: theorem Field on the axis of a dipole {#thm-axial}
On the axis of the dipole just defined, at coordinate $z$ with $\abs{z} > d/2$,

$$
E_z = \frac{1}{4\pi\varepsilon_0}\,\frac{2 p z}{\bigl(z^{2} - (d/2)^{2}\bigr)^{2}},
$$ {#eq-axial-exact}

where $p = qd$. For $z > d/2$ the field points in the direction of $\mathbf{p}$. Far from the dipole, $\abs{z} \gg d$, the leading term is

$$
E_z \approx \frac{1}{4\pi\varepsilon_0}\,\frac{2p}{z^{3}},
$$ {#eq-axial-far}

the sign being the sign of $z$ when $p > 0$, so that on the positive axis $\mathbf{E}$ is parallel to $\mathbf{p}$.
:::

::: proof
The exact field is the difference of two point-charge fields:

$$
E_z = \frac{1}{4\pi\varepsilon_0}\, q\left(\frac{1}{(z - d/2)^{2}} - \frac{1}{(z + d/2)^{2}}\right).
$$

The common denominator is $\bigl(z^{2} - (d/2)^{2}\bigr)^{2}$. The numerator of the difference of the two squared distances is

$$
(z + d/2)^{2} - (z - d/2)^{2} = 2zd.
$$

Hence $E_z = k q (2zd) / \bigl(z^{2} - (d/2)^{2}\bigr)^{2}$. Since $p = qd$, this is [[#eq-axial-exact]]. For $z > d/2$ every factor is positive when $q > 0$, so $E_z > 0$, parallel to $\mathbf{p}$.

For the far field set $u = d/(2z)$, with $\abs{u} < 1$ precisely when $\abs{z} > d/2$, and we now take $z > 0$ so that $u > 0$. Then

$$
(z \pm d/2)^{-2} = z^{-2}(1 \pm u)^{-2}.
$$

The binomial expansion $(1 - u)^{-2} = 1 + 2u + 3u^{2} + 4u^{3} + \cdots$ and $(1 + u)^{-2} = 1 - 2u + 3u^{2} - 4u^{3} + \cdots$ gives, on subtraction,

$$
(1 - u)^{-2} - (1 + u)^{-2} = 4u + 8u^{3} + \cdots.
$$

The even powers cancel. Multiply by $k q/z^{2}$ and use $4u = 2d/z$:

$$
E_z = \frac{1}{4\pi\varepsilon_0}\, q\left(\frac{2d}{z^{3}} + \frac{d^{3}}{z^{5}} + \cdots\right) = \frac{1}{4\pi\varepsilon_0}\left(\frac{2p}{z^{3}} + \frac{p d^{2}}{z^{5}} + \cdots\right).
$$

The first term is [[#eq-axial-far]]. The next term is smaller than the first by a factor of order $(d/z)^{2}$, which is the content of $\abs{z} \gg d$. The coefficient of $z^{-5}$ is left as an exercise in expanding one more order; the cancellation of $u^{2}$ is what pushes the error to $1/z^{5}$ rather than $1/z^{4}$.
:::

On the perpendicular bisector the cancellation is different, and the field that remains is antiparallel to $\mathbf{p}$.

::: proposition Field on the perpendicular bisector {#prop-bisector}
At a distance $r$ from the centre of the same dipole, in the plane through the centre perpendicular to $\mathbf{p}$,

$$
\mathbf{E} = -\frac{1}{4\pi\varepsilon_0}\,\frac{\mathbf{p}}{\bigl(r^{2} + (d/2)^{2}\bigr)^{3/2}}.
$$ {#eq-bisector-exact}

Far away, $r \gg d$,

$$
\mathbf{E} \approx -\frac{1}{4\pi\varepsilon_0}\,\frac{\mathbf{p}}{r^{3}}.
$$ {#eq-bisector-far}

The field on the bisector is antiparallel to the dipole moment. At equal large distances, the axial field is twice the bisector field in magnitude and opposite in its relation to $\mathbf{p}$.
:::

::: proof
Put the field point at $(r, 0, 0)$ with $r > 0$. The distance from either charge to the point is $R = \sqrt{r^{2} + (d/2)^{2}}$.

The vector from $+q$, at $(0, 0, d/2)$, to the field point is $(r, 0, -d/2)$. The field of $+q$ points along that vector:

$$
\mathbf{E}_{+} = \frac{1}{4\pi\varepsilon_0}\,\frac{q}{R^{3}}\,(r,\, 0,\, -d/2).
$$

The field of $-q$ points towards $-q$, opposite the vector from $-q$ to the field point. That vector is $(r, 0, d/2)$, so

$$
\mathbf{E}_{-} = \frac{1}{4\pi\varepsilon_0}\,\frac{q}{R^{3}}\,(-r,\, 0,\, -d/2).
$$

Add them. The $x$ components cancel and the $z$ components agree:

$$
\mathbf{E} = \frac{1}{4\pi\varepsilon_0}\,\frac{q}{R^{3}}\,(0,\, 0,\, -d) = -\frac{1}{4\pi\varepsilon_0}\,\frac{q d}{R^{3}}\,\hat{\mathbf{z}},
$$

which is [[#eq-bisector-exact]]. For $r \gg d$ the denominator is $r^{3}$, which is [[#eq-bisector-far]]. Comparing with [[#eq-axial-far]] at the same large distance, the axial magnitude is twice the bisector magnitude, and the axial field is parallel to $\mathbf{p}$ on the positive axis while the bisector field is antiparallel to $\mathbf{p}$.
:::

::: example A two-millimetre dipole {#ex-dipole}
Take $q = 2.00\,\mathrm{nC}$ and $d = 2.00\,\mathrm{mm}$, so $p = 4.00\times 10^{-12}\,\mathrm{C\cdot m}$. At a distance $20.0\,\mathrm{mm}$ from the centre, compare the exact axial and bisector fields with the far-field formulae.
::: solution
Here $d/(2z) = 0.0500$, small enough that the far-field term should be good to a few parts in a thousand, and not so small that the comparison is invisible.

On the axis, [[#eq-axial-exact]] at $z = 0.0200\,\mathrm{m}$ gives

$$
E_z = \frac{k\,(2.00\times 10^{-9})\,(2\times 0.0200\times 0.00200)}{\bigl(0.0200^{2} - 0.00100^{2}\bigr)^{2}} = 9.0327\times 10^{3}\,\mathrm{N/C}.
$$

The leading far-field term is $k(2p)/z^{3} = 8.9876\times 10^{3}\,\mathrm{N/C}$. The approximation lies $0.499\%$ low. Both point in the direction of $\mathbf{p}$.

On the bisector at the same distance, [[#eq-bisector-exact]] gives $4.4770\times 10^{3}\,\mathrm{N/C}$ antiparallel to $\mathbf{p}$. The far-field magnitude $kp/r^{3} = 4.4938\times 10^{3}\,\mathrm{N/C}$ lies $0.375\%$ high. The axial far-field magnitude is exactly twice the bisector far-field magnitude, $8.9876\times 10^{3}$ against $4.4938\times 10^{3}$, which is the factor of two in [[#prop-bisector]]. The exact fields are not in the ratio two, because $20.0\,\mathrm{mm}$ is only ten separations, not infinity: $9032.7/4477.0 = 2.018$.
:::
:::

## Field lines

The integral and the sum compute $\mathbf{E}$. A drawing cannot replace them, but it can record the direction, and it can stop a sign error before the arithmetic starts.

::: definition Field line {#def-line}
A **field line** is a curve whose tangent at every point is parallel to $\mathbf{E}$ at that point. The sense along the curve is the sense of $\mathbf{E}$. Lines are drawn to start on positive charge and to end on negative charge, or to run out to infinity when the total charge of the sources is not zero. They are not drawn through a point where $\mathbf{E} = \mathbf{0}$, because the tangent is not defined there.
:::

Two rules follow from the definition and from [[#prop-super-E]], and neither is a decoration.

Lines do not cross. At a crossing, two tangents would demand two directions of $\mathbf{E}$, and [[#eq-super-E]] produces one vector. A zero of $\mathbf{E}$ is not a crossing: the field has no direction there, and the lines that approach it stop.

The density of lines is a picture of $\abs{\mathbf{E}}$, not a proof of it. If you agree to start a number of lines proportional to the source charge, then for a single point charge the lines spread over a sphere and the number per unit area falls as $1/r^{2}$, which matches [[#eq-point]]. That match is why the convention is worth keeping. It does not compute the field of a rod or a dipole. The integral does. Where lines are crowded, $\abs{\mathbf{E}}$ is large compared with places where you drew them sparse, and the comparison is only as honest as the drawing.

::: warning A field line is not a trajectory
A particle follows a field line only in a special case: the line is straight, and the particle is released from rest. The force, hence the acceleration, is tangent to the line. Starting from rest, the velocity grows along that same straight direction and never acquires a component off it. If the line curves, the particle still starts along the tangent, but the velocity it has gained points along the old tangent while $\mathbf{E}$ has turned. Nothing in the electric force cancels the inertia that carries the particle off the curve. If the line is straight but the particle is thrown across it, the motion is the motion of a projectile with a constant acceleration along the field, and the path is a parabola, not the line. Magnetic forces, which do depend on velocity, are not in this chapter. They begin in [[magnetism]].
:::

::: widget charges
charges: 1, 0, 0.5; -1, 0, -0.5
caption: A dipole, with $+1$ above the origin and $-1$ below it, so the dipole moment points upward. On the horizontal bisector the arrows point downward, opposite the moment. On the axis beyond the positive charge they point upward, along the moment. Every arrow is drawn to the same length: the length is not $\abs{\mathbf{E}}$, and the crowding of arrows on this fixed grid is not the line-density convention.
:::

::: quiz
An electron is released from rest in a uniform electric field, whose lines are straight and parallel. Its trajectory
- [ ] curves, because field lines of a uniform field are drawn as curves on the page
- [ ] is perpendicular to $\mathbf{E}$, because the electron is negative
- [x] is a straight line antiparallel to $\mathbf{E}$
- [ ] follows a field line only if the electron is given a sideways push
::: solution
The lines are straight, and the electron starts from rest, so the warning's special case applies. The force on an electron is opposite $\mathbf{E}$, so the straight trajectory runs antiparallel to the field, which is still along a field line, traversed against the arrow. A sideways push would take it off the line even though the line is straight.
:::
:::

::: history Lines of force
Michael Faraday's *Experimental Researches in Electricity* began to appear in 1831. Through the 1830s he developed the lines-of-force picture: the pattern in the space around a magnet or a charged body was, for him, the object worth drawing, not a shorthand for action at a distance. The drawings were qualitative. The step that made the field the primary mathematical object, with its own differential equations and with energy stored in the space, was James Clerk Maxwell's, from the papers of the 1860s through *A Treatise on Electricity and Magnetism* (1873). The vector $\mathbf{E}$ in [[#def-field]] is that later object. Faraday's lines remain the right sketch of its direction.
:::

## Motion in a uniform field

A uniform field is constant in magnitude and direction throughout the region of interest. It is an idealisation of the field between large parallel sheets of charge, which [[electrostatics/gauss-law]] will justify, and it is the field you write down when a problem simply says "$\mathbf{E}$ is uniform".

::: proposition Constant acceleration in a uniform field {#prop-uniform}
In a region where $\mathbf{E}$ is constant, a particle of charge $q$ and constant mass $m > 0$ has constant acceleration

$$
\mathbf{a} = \frac{q\mathbf{E}}{m}.
$$ {#eq-a}

If the particle starts from rest, then after a time $t$ its speed is $\abs{q E/m}\, t$ and the distance travelled is $\tfrac{1}{2}\abs{q E/m}\, t^{2}$, both along the direction of $q\mathbf{E}$.
:::

::: proof
The force is $\mathbf{F} = q\mathbf{E}$ by [[#eq-def-E]], rearranged. Newton's second law for constant mass, from [[mechanics/newton-laws]], is $\mathbf{F} = m\mathbf{a}$. Divide by $m$ to obtain [[#eq-a]]. A constant field makes $\mathbf{a}$ constant. The constant-acceleration results of [[mechanics/motion-1d]], with initial velocity zero, are $v = at$ and $s = \tfrac{1}{2}at^{2}$ along the direction of $\mathbf{a}$. That direction is the direction of $q\mathbf{E}$: along $\mathbf{E}$ if $q > 0$, opposite $\mathbf{E}$ if $q < 0$.
:::

A sideways initial velocity does not change $\mathbf{a}$. The motion is then the projectile motion of [[mechanics/motion-2d]], with "down" replaced by the direction of $q\mathbf{E}$. The trajectory is a parabola. It is not a field line, which is the second half of the warning above.

::: example An electron in a horizontal field {#ex-electron}
An electron is released from rest in a uniform field of magnitude $E = 2000\,\mathrm{N/C}$, directed horizontally. Take $m_e = 9.109\times 10^{-31}\,\mathrm{kg}$ and the exact elementary charge. Find the acceleration, and the speed and distance travelled after $10.0\,\mathrm{ns}$. Compare the speed with $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$.
::: solution
The electron's charge is $-e$, so $\mathbf{a}$ is opposite $\mathbf{E}$ and the magnitude is

$$
a = \frac{e E}{m_e} = \frac{(1.602176634\times 10^{-19})\,(2000)}{9.109\times 10^{-31}} = 3.5178\times 10^{14}\,\mathrm{m/s^{2}}.
$$

To four figures, set by $m_e$, this is $3.518\times 10^{14}\,\mathrm{m/s^{2}}$. In $t = 1.00\times 10^{-8}\,\mathrm{s}$,

$$
v = at = 3.5178\times 10^{6}\,\mathrm{m/s}, \qquad s = \tfrac{1}{2}at^{2} = 1.7589\times 10^{-2}\,\mathrm{m},
$$

or $3.518\times 10^{6}\,\mathrm{m/s}$ and $1.759\times 10^{-2}\,\mathrm{m}$ to four figures. Both are opposite the field.

The speed is $v/c = 0.01173$. The fractional error in using $\tfrac{1}{2}m v^{2}$ rather than the relativistic kinetic energy is of order $(v/c)^{2} \approx 1.4\times 10^{-4}$, smaller than the precision of the four-figure mass, so the non-relativistic kinematics is consistent with the numbers quoted. The kinetic energy itself is $\tfrac{1}{2}m_e v^{2} = 5.636\times 10^{-18}\,\mathrm{J}$, which is $35.18$ electronvolts if one electronvolt means $e$ joules. That unit belongs with potential energy, in [[electrostatics/potential]]. The acceleration is enormous because the mass is not; the energy, after ten nanoseconds, is not enormous.
:::
:::

The same formulae with a proton in place of the electron are a different scale. The proton is heavier by $m_p/m_e$ with $m_p = 1.673\times 10^{-27}\,\mathrm{kg}$, a factor of about $1837$, and its acceleration in the same field is smaller by that factor and opposite in direction, because the proton's charge is $+e$. Problems that ask for both are two uses of [[#eq-a]], not a new law.

## Where this leads

Gauss's law, in [[electrostatics/gauss-law]], is [[#eq-point]] rewritten as a statement about flux. It computes the field when symmetry makes the integral in [[#eq-integral]] unnecessary, and it is where the infinite line, the infinite sheet and the field of a spherical charge belong as short arguments rather than as limits. Potential converts $\mathbf{E}$ into a scalar whose gradient gives the field back. Capacitors are a uniform field with a measured potential difference. None of that changes the definition [[#eq-def-E]].

A moving charge does not feel only $q\mathbf{E}$. Once it has a velocity, a magnetic field exerts a force perpendicular to that velocity. The trajectories of this chapter are electric only. The moment a velocity-dependent force is allowed, the warning about field lines becomes a different theorem, and it is not proved here.

::: summary
- The electric field is $\mathbf{E} = \mathbf{F}/q_0$, in $\mathrm{N/C}$, in the direction of the force on a positive test charge. For fixed sources it does not depend on $q_0$.
- A point charge produces $\mathbf{E} = (1/(4\pi\varepsilon_0))\, q\hat{\mathbf{r}}/r^{2}$, away from a positive charge and towards a negative one. Fields of several charges add as vectors.
- A continuous distribution is the same law integrated. On the axis of a uniform ring, $E_z = (1/(4\pi\varepsilon_0))\, Qz/(R^{2}+z^{2})^{3/2}$. On the bisector of a uniform rod, $E = (1/(4\pi\varepsilon_0))\, Q/\bigl(x\sqrt{x^{2}+(L/2)^{2}}\bigr)$. An infinite line is the long-rod limit $E = \lambda/(2\pi\varepsilon_0 r)$.
- A dipole $\mathbf{p} = q\mathbf{d}$ points from the negative charge to the positive. Far away on the axis, $\mathbf{E} \approx (1/(4\pi\varepsilon_0))\, 2\mathbf{p}/z^{3}$. On the perpendicular bisector, $\mathbf{E} \approx -(1/(4\pi\varepsilon_0))\, \mathbf{p}/r^{3}$.
- Field lines follow $\mathbf{E}$, start on positive charge and end on negative charge, and do not cross. Their density is a picture of $\abs{\mathbf{E}}$, not a calculation. A line is a trajectory only when it is straight and the charge is released from rest.
- In a uniform field $\mathbf{a} = q\mathbf{E}/m$. An electron released from rest accelerates opposite $\mathbf{E}$. Magnetic forces are outside this chapter.
:::

## Exercises

::: exercise Field of a small negative charge {#exr-point level=1}
A point charge $-3.00\,\mathrm{nC}$ is fixed in vacuum. Find the magnitude and direction of $\mathbf{E}$ at a distance of $5.00\,\mathrm{cm}$.
::: solution
This is [[#ex-nanoc]] with the arithmetic shown again from [[#eq-point]]:

$$
E = \frac{k\,(3.00\times 10^{-9})}{(0.0500)^{2}} = 1.0785\times 10^{4}\,\mathrm{N/C},
$$

or $1.079\times 10^{4}\,\mathrm{N/C}$ to four figures, pointing towards the charge. The direction is part of the answer. A magnitude with no direction describes a positive source of the same strength, which is a different field.
:::
:::

::: exercise Acceleration of a charged grain {#exr-grain level=1 check="20"}
A grain of mass $3.00\times 10^{-6}\,\mathrm{kg}$ carries a charge $1.50\times 10^{-8}\,\mathrm{C}$. It is placed in a uniform field of magnitude $4.00\times 10^{3}\,\mathrm{N/C}$. Find the magnitude of its acceleration. Ignore weight.
::: solution
[[#eq-a]] gives

$$
a = \frac{qE}{m} = \frac{(1.50\times 10^{-8})\,(4.00\times 10^{3})}{3.00\times 10^{-6}} = 20.0\,\mathrm{m/s^{2}}.
$$

The charge is positive, so $\mathbf{a}$ is parallel to $\mathbf{E}$. Weight has been excluded by the problem; it would be $g = 9.80\,\mathrm{m/s^{2}}$ downward, comparable with this acceleration and not negligible if the question had asked for the net acceleration in the Earth's gravity.
:::
:::

::: exercise Holding a charged bead at rest {#exr-levitate level=1 check="9800"}
A bead of mass $1.00\times 10^{-3}\,\mathrm{kg}$ carries a charge $+1.00\times 10^{-6}\,\mathrm{C}$. What uniform electric field, in $\mathrm{N/C}$, balances its weight near the Earth? Take $g = 9.80\,\mathrm{m/s^{2}}$, and give the magnitude.
::: solution
Balance means $qE = mg$, with $\mathbf{E}$ upward so that the force on the positive charge is upward:

$$
E = \frac{mg}{q} = \frac{(1.00\times 10^{-3})\,(9.80)}{1.00\times 10^{-6}} = 9800\,\mathrm{N/C}.
$$

The field is $9800\,\mathrm{N/C}$ upward. Reversing the charge would reverse the required field. Leaving $g$ out, or using $9.8$ without the trailing zero the data allow, is the same magnitude at three figures; the value asked for is $9800$.
:::
:::

::: exercise A field off the axis of two charges {#exr-vector level=2}
A charge $+6.00\,\mathrm{nC}$ is at the origin and a charge $-8.00\,\mathrm{nC}$ is at $(0.300\,\mathrm{m},\, 0)$. Find the electric field at $(0.300\,\mathrm{m},\, 0.400\,\mathrm{m})$. Give the magnitude and the angle below the positive $x$ axis.
::: solution
The distance from the origin to the field point is $0.500\,\mathrm{m}$. The distance from the negative charge to the field point is $0.400\,\mathrm{m}$, and that source lies directly below the field point.

The positive charge produces a field pointing away from the origin, along $(0.600,\, 0.800)$, of magnitude

$$
E_{+} = \frac{k\,(6.00\times 10^{-9})}{(0.500)^{2}} = 215.70\,\mathrm{N/C}.
$$

The negative charge produces a field pointing towards itself, straight down, of magnitude

$$
E_{-} = \frac{k\,(8.00\times 10^{-9})}{(0.400)^{2}} = 449.38\,\mathrm{N/C}.
$$

Components, $+y$ upward:

$$
\begin{aligned}
E_x &= 215.70\times 0.600 = 129.42\,\mathrm{N/C}, \\
E_y &= 215.70\times 0.800 - 449.38 = 172.56 - 449.38 = -276.82\,\mathrm{N/C}.
\end{aligned}
$$

$$
\abs{\mathbf{E}} = \sqrt{129.42^{2} + 276.82^{2}} = 305.6\,\mathrm{N/C},
$$

$$
\theta = \tan^{-1}\frac{-276.82}{129.42} = -64.94^{\circ},
$$

so $64.94^{\circ}$ below the positive $x$ axis. The downward piece is the nearer, negative charge. Dropping the positive charge would leave a purely vertical field of $449.4\,\mathrm{N/C}$ and would miss an $x$ component that is nearly half the magnitude of $\mathbf{E}$.
:::
:::

::: exercise A proton in a uniform field {#exr-proton level=2}
A proton is released from rest in a uniform field of magnitude $500\,\mathrm{N/C}$. Take $m_p = 1.673\times 10^{-27}\,\mathrm{kg}$. Find the speed and the distance travelled after $1.00\,\mu\mathrm{s}$, and the direction relative to $\mathbf{E}$.
::: solution
The proton's charge is $+e$, so $\mathbf{a}$ is parallel to $\mathbf{E}$. The magnitude is

$$
a = \frac{e E}{m_p} = \frac{(1.602176634\times 10^{-19})\,(500)}{1.673\times 10^{-27}} = 4.7883\times 10^{10}\,\mathrm{m/s^{2}}.
$$

After $t = 1.00\times 10^{-6}\,\mathrm{s}$,

$$
v = at = 4.788\times 10^{4}\,\mathrm{m/s}, \qquad s = \tfrac{1}{2}at^{2} = 2.394\times 10^{-2}\,\mathrm{m},
$$

both in the direction of $\mathbf{E}$. Compared with [[#ex-electron]], the field is weaker, the time is longer, and the mass is larger by about $1837$. The speed is far below $c$: $v/c \approx 1.6\times 10^{-4}$. The non-relativistic formulae are the right ones.
:::
:::

::: exercise How much of the point-charge field a rod keeps {#exr-fraction level=2 check="4/sqrt(41)"}
A uniformly charged rod has length $L = 0.500\,\mathrm{m}$. On the perpendicular bisector, at $x = 0.200\,\mathrm{m}$, the field magnitude is a fraction $f$ of the field that a point charge equal to the rod's total charge would produce at distance $x$. Find $f$. The total charge should cancel.
::: hint
Use [[#eq-rod]] and divide by $k Q/x^{2}$. Then write $x^{2} + (L/2)^{2} = 0.1025 = 41/400$.
:::
::: solution
From [[#eq-rod]] and the point-charge magnitude $k Q/x^{2}$,

$$
f = \frac{x}{\sqrt{x^{2} + (L/2)^{2}}}.
$$

The charge $Q$ and the constant $k$ cancel, which is why $f$ does not need them. Insert $x = 0.200$ and $L/2 = 0.250$:

$$
x^{2} + (L/2)^{2} = 0.0400 + 0.0625 = 0.1025 = \frac{41}{400}.
$$

$$
f = \frac{0.200}{\sqrt{41}/20} = \frac{4}{\sqrt{41}}.
$$

Numerically $f = 0.6247$. This is the comparison already evaluated for a particular $Q$ in [[#ex-rod]]. The fraction is geometry, not charge.
:::
:::

::: exercise The next term on the dipole axis {#exr-series level=3}
In the binomial argument of [[#thm-axial]], the term in $u^{3}$ was not reduced. Show that it contributes

$$
\frac{1}{4\pi\varepsilon_0}\,\frac{p d^{2}}{z^{5}}
$$

to $E_z$ on the positive axis, and evaluate that correction for the dipole of [[#ex-dipole]] at $z = 20.0\,\mathrm{mm}$.
::: hint
From the proof, the difference of the two binomial series begins $4u + 8u^{3}$. Multiply by $k q/z^{2}$ and set $u = d/(2z)$. The $4u$ piece is the leading term already quoted. Keep $8u^{3}$.
:::
::: solution
With $z > 0$ and $u = d/(2z)$,

$$
E_z = \frac{k q}{z^{2}}\bigl(4u + 8u^{3} + \cdots\bigr).
$$

The second piece is

$$
\frac{k q}{z^{2}}\cdot 8\cdot\frac{d^{3}}{8 z^{3}} = \frac{k q d^{3}}{z^{5}} = \frac{1}{4\pi\varepsilon_0}\,\frac{p d^{2}}{z^{5}},
$$

since $8/8 = 1$ and $p = qd$. For [[#ex-dipole]], $p = 4.00\times 10^{-12}\,\mathrm{C\cdot m}$, $d = 2.00\times 10^{-3}\,\mathrm{m}$ and $z = 2.00\times 10^{-2}\,\mathrm{m}$:

$$
\frac{k p d^{2}}{z^{5}} = 44.94\,\mathrm{N/C}.
$$

Added to the leading term $8.9876\times 10^{3}\,\mathrm{N/C}$, the two-term approximation is $9.0325\times 10^{3}\,\mathrm{N/C}$. The exact value from [[#eq-axial-exact]] is $9.0327\times 10^{3}\,\mathrm{N/C}$. The remaining discrepancy, about $0.2\,\mathrm{N/C}$, is the next odd power, of order $1/z^{7}$. At this distance the correction of $44.94\,\mathrm{N/C}$ is the difference between a $0.5\%$ error and a $0.002\%$ error.
:::
:::

::: exercise Why field lines do not cross {#exr-cross level=3}
Prove that two field lines cannot cross at a point where $\mathbf{E} \neq \mathbf{0}$. Then explain, from [[#prop-uniform]], why an electron released from rest in a uniform field follows a field line, while an electron projected perpendicular to the same field does not.
::: hint
A field line's tangent is $\mathbf{E}$. At a crossing there would be two tangents. For the motion, write the initial velocity and the direction of $\mathbf{a}$ separately in the two cases.
:::
::: solution
Suppose two field lines cross at a point $P$ where $\mathbf{E}(P) \neq \mathbf{0}$. By [[#def-line]] each curve is tangent to $\mathbf{E}(P)$. A single nonzero vector determines a single line through $P$, so the two curves share that tangent line. They may touch and run on as the same curve; they cannot cross at an angle. Crossing at an angle would require two directions of $\mathbf{E}$ at $P$, and [[#eq-super-E]] gives one. A point where $\mathbf{E} = \mathbf{0}$ is not a counter-example: no field line has a tangent there, and the definition refuses to draw one through it.

In a uniform field the lines are straight and parallel. [[#prop-uniform]] says the acceleration is constant, parallel to $\mathbf{E}$ for a positive charge and antiparallel for an electron. Released from rest, the electron's velocity is born along $\mathbf{a}$ and stays along $\mathbf{a}$. The path is the straight field line, traversed opposite the arrow.

Projected perpendicular to $\mathbf{E}$, the electron has an initial velocity component that $\mathbf{a}$ never changes, because $\mathbf{a}$ is perpendicular to that component. The path is a parabola, the projectile motion of [[mechanics/motion-2d]] with the constant acceleration $eE/m_e$ opposite the field. A parabola is not a straight line, so it is not a field line of this field. The warning in the text is these two sentences, and no others: straight, and released from rest.
:::
:::
