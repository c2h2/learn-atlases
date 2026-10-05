A hiker walks $3.00\,\mathrm{m}$ east and then $4.00\,\mathrm{m}$ north. Adding the lengths gives $7.00\,\mathrm{m}$, and that answer is wrong: the two parts of the walk point in different directions. The straight-line distance is $5.00\,\mathrm{m}$. The same issue appears whenever a force points one way and a displacement points another.

A measurement is a number times a unit, and a displacement is a magnitude together with a direction. You should leave this chapter able to test an equation by dimensions, resolve a vector, compute an angle from a dot product, and read a cross product as a signed area. [[mechanics/motion-1d]] specialises the algebra to a single line, and [[math-methods/vector-calculus]] takes up derivatives of vector fields.

## Units and dimensions {#units}

A length is a number times a **unit**, the agreed standard it is compared with. "The rod is $2$" does not say whether that is metres or millimetres. Seven **base units** of the SI are independent, and every other unit is built from them.

- The **metre** ($\mathrm{m}$) is the base unit of length.
- The **kilogram** ($\mathrm{kg}$) is the base unit of mass. The gram is not the base unit; a mass written as $500\,\mathrm{g}$ must be turned into $0.500\,\mathrm{kg}$ before it is used in an SI formula.
- The **second** ($\mathrm{s}$) is the base unit of time.
- The **ampere** ($\mathrm{A}$) is the base unit of electric current.
- The **kelvin** ($\mathrm{K}$) is the base unit of thermodynamic temperature.
- The **mole** ($\mathrm{mol}$) is the base unit of amount of substance.
- The **candela** ($\mathrm{cd}$) is the base unit of luminous intensity.

Mechanics uses the metre, the kilogram and the second almost exclusively. A **derived unit** is a product of powers of base units, and four of them appear from the next chapter onward.

The **newton** is the unit of force. Force has the shape of mass times acceleration, so

$$
1\,\mathrm{N} = 1\,\mathrm{kg \cdot m / s^2}.
$$ {#eq-newton}

The **joule** is the unit of energy and of work, a force times a length:

$$
1\,\mathrm{J} = 1\,\mathrm{N \cdot m} = 1\,\mathrm{kg \cdot m^2 / s^2}.
$$ {#eq-joule}

The **watt** is the unit of power, which is energy per unit time:

$$
1\,\mathrm{W} = 1\,\mathrm{J / s} = 1\,\mathrm{kg \cdot m^2 / s^3}.
$$ {#eq-watt}

The **pascal** is the unit of pressure, which is force per unit area:

$$
1\,\mathrm{Pa} = 1\,\mathrm{N / m^2} = 1\,\mathrm{kg / (m \cdot s^2)}.
$$ {#eq-pascal}

These are names, not laws. The law is $F = ma$; the newton is the unit that makes the factor in that law equal to $1$ for kilograms, metres and seconds. A system with that property is **coherent**. Convert into base SI units before you compute, and do not mix centimetres or grams into a formula already written in metres and kilograms.

::: definition Dimension of a quantity {#def-dimension}
The **dimension** of a physical quantity is its expression in the base dimensions mass $\mathrm{M}$, length $\mathrm{L}$, time $\mathrm{T}$, current $\mathrm{I}$, temperature $\Theta$, amount of substance $\mathrm{N}$ and luminous intensity $\mathrm{J}$, ignoring how large the chosen units are. We write the dimension of a quantity $Q$ as $[Q]$. An equation is **dimensionally homogeneous** when every term that is added, subtracted or set equal to another term has the same dimension.
:::

Dimensions are coarser than units. Lengths of $2\,\mathrm{m}$ and $5\,\mathrm{mm}$ differ as numbers, but both have dimension $\mathrm{L}$. An equation that is not dimensionally homogeneous cannot hold in every unit system, so it cannot be a law.

The dimensions that follow from the definitions above are worth writing once:

$$
[F] = \mathrm{M\,L\,T^{-2}}, \qquad [W] = \mathrm{M\,L^2\,T^{-2}}, \qquad [P] = \mathrm{M\,L^2\,T^{-3}}, \qquad [\text{pressure}] = \mathrm{M\,L^{-1}\,T^{-2}}.
$$

Here $W$ is work or energy and $P$ is power. Brackets mean dimension, never magnitude. Pure numbers such as $\pi$ and $\frac12$ have dimension $1$: the test can reject an impossible formula, but it cannot fix a numerical factor.

::: proposition Dimensionless arguments {#prop-dimensionless}
The argument of a sine, cosine, exponential or logarithm in a physical formula must be dimensionless. The same holds for any function given by a power series whose coefficients are pure numbers.
:::

::: proof
Suppose $u$ had a dimension other than $1$, and a series $f(u) = c_0 + c_1 u + c_2 u^2 + \cdots$ with dimensionless coefficients appeared in a physical equation. Then $c_1 u$ and $c_2 u^2$ would have different dimensions, and there is no meaning to adding a metre to a square metre. Every power of $u$ has the same dimension only if $[u] = 1$. Sine, cosine, the exponential and $\ln(1+u)$ are of this kind. An angle in radians survives, because it is an arc divided by a radius.
:::

The radian is a name for the number $1$. The degree, $\pi/180$, is also dimensionless, but series and derivatives of sine assume radians.

::: example Two formulae that cannot be right {#ex-dimensions}
A student, modelling waves on deep water, proposes that the wave speed is $v = \sqrt{g/\lambda}$, where $\lambda$ is the wavelength and $g$ is the acceleration due to gravity. A second student, integrating a constant acceleration, writes the position as $x = v_0 t + \frac12 a t$. Explain, using dimensions alone, why both formulae are impossible, and repair the combination of $g$ and $\lambda$ so that it could be a speed.
::: solution
Acceleration has dimension $\mathrm{L\,T^{-2}}$ and a wavelength has dimension $\mathrm{L}$, so

$$
\left[\frac{g}{\lambda}\right] = \frac{\mathrm{L\,T^{-2}}}{\mathrm{L}} = \mathrm{T^{-2}}, \qquad \left[\sqrt{\frac{g}{\lambda}}\right] = \mathrm{T^{-1}}.
$$

A speed has dimension $\mathrm{L\,T^{-1}}$, not $\mathrm{T^{-1}}$. The first formula equates quantities of different dimensions, so it is false in every unit system. No measurement is required to reject it.

The combination of $g$ and $\lambda$ that does have the dimension of speed is $\sqrt{g\lambda}$:

$$
[g\lambda] = \mathrm{L\,T^{-2}} \cdot \mathrm{L} = \mathrm{L^2\,T^{-2}}, \qquad [\sqrt{g\lambda}] = \mathrm{L\,T^{-1}}.
$$

So $v = C\sqrt{g\lambda}$ is allowed for a dimensionless $C$, and the test does not determine $C$. The deep-water speed is in fact $\sqrt{g\lambda/(2\pi)}$; the factor is physics, not units.

For the second formula, $[v_0 t] = \mathrm{L}$. The second term has

$$
[a t] = (\mathrm{L\,T^{-2}})\,\mathrm{T} = \mathrm{L\,T^{-1}},
$$

the dimension of a speed. The term with dimension $\mathrm{L}$ is $\frac12 a t^2$. The constant-acceleration formula passes; the formula with a single factor of $t$ does not. The factor $\frac12$ is fixed by integration in [[mechanics/motion-1d]], not by dimensions.
:::
:::

::: example Grams are not kilograms {#ex-grams}
A force of $2.50\,\mathrm{N}$ is applied to a mass of $500\,\mathrm{g}$. Find the acceleration in SI, and explain the number you get if the mass is left as $500$.
::: solution
Convert the mass before using a coherent formula: $500\,\mathrm{g} = 0.500\,\mathrm{kg}$. Newton's second law in SI reads $F = ma$ with $F$ in newtons, $m$ in kilograms and $a$ in metres per second squared, so

$$
a = \frac{F}{m} = \frac{2.50\,\mathrm{N}}{0.500\,\mathrm{kg}} = 5.00\,\mathrm{m/s^2}.
$$

The division is legal because a newton per kilogram is exactly a metre per second squared, by [[#eq-newton]].

Dividing $2.50$ by $500$ instead gives $0.00500$, a thousand times too small, because the gram was treated as the base unit. Convert to kilograms on the first line.
:::
:::

A dimensional check is a filter, not a derivation: a formula that survives it may still be false, and a pure number such as $\frac12$ is invisible to the test.

::: quiz
Which of the following can stand as the argument of a sine in a physical formula? Here $x$ is a length, $t$ is a time, $\lambda$ is a wavelength and $\omega$ is an angular frequency in radians per second.
- [ ] $x + t$
- [ ] $x$, because a sine can accept any real number a calculator will take
- [x] $2\pi x/\lambda$
- [ ] $\omega + t$
::: solution
By [[#prop-dimensionless]] the argument must be dimensionless. The ratio $x/\lambda$ is a length over a length, so $2\pi x/\lambda$ is allowed. The sums $x+t$ and $\omega+t$ mix different dimensions, and a bare length $x$ depends on the choice of unit.
:::
:::

## Vectors and their components {#vectors}

Mass, temperature, time and energy are **scalars**: a signed number and a unit describe them. Displacement, velocity, acceleration and force are not. A force of size $5\,\mathrm{N}$ still needs a direction. A quantity with both magnitude and direction is a **vector**.

::: definition Vector {#def-vector}
A **vector** is a quantity specified by a magnitude and a direction. Two vectors are **equal** when they have the same magnitude and the same direction, wherever they are drawn. The **sum** $\mathbf{a}+\mathbf{b}$ is the diagonal of the parallelogram with sides $\mathbf{a}$ and $\mathbf{b}$, starting from the common tail. Equivalently, place the tail of $\mathbf{b}$ on the head of $\mathbf{a}$; the sum runs from the tail of $\mathbf{a}$ to the head of $\mathbf{b}$. The **scalar multiple** $c\mathbf{a}$ has magnitude $\abs{c}\,\abs{\mathbf{a}}$, the direction of $\mathbf{a}$ if $c > 0$, and the opposite direction if $c < 0$. The multiple $0\cdot\mathbf{a}$ is the **zero vector** $\mathbf{0}$, which has magnitude zero and no direction.
:::

These are **free vectors**: a displacement of $3\,\mathrm{m}$ east is the same vector wherever it is drawn. A position is the displacement from a chosen origin, so it is fixed once the origin is fixed, but it adds by the same rule. A vector is never added to a scalar.

Addition is commutative and associative: either order of the parallelogram, and either grouping of three displacements, finishes at the same point. The zero vector satisfies $\mathbf{a}+\mathbf{0} = \mathbf{a}$, and $-\mathbf{a}$ means $(-1)\mathbf{a}$.

None of this tells you how to compute. For computation we choose a frame.

::: definition Components in a Cartesian frame {#def-components}
A **right-handed Cartesian frame** is an origin together with three mutually perpendicular axes, labelled $x$, $y$ and $z$, with unit vectors $\mathbf{i}$, $\mathbf{j}$ and $\mathbf{k}$. The frame is right-handed when the fingers of the right hand curl from $\mathbf{i}$ toward $\mathbf{j}$ and the thumb points along $\mathbf{k}$. On a page, take $x$ to the right, $y$ upward and $z$ toward the reader.

The **components** of a vector $\mathbf{a}$ are the signed scalars $a_x$, $a_y$ and $a_z$ for which

$$
\mathbf{a} = a_x\,\mathbf{i} + a_y\,\mathbf{j} + a_z\,\mathbf{k}.
$$

We write $\mathbf{a} = (a_x, a_y, a_z)$. The **magnitude** is

$$
\abs{\mathbf{a}} = \sqrt{a_x^2 + a_y^2 + a_z^2}.
$$ {#eq-magnitude}

If $\mathbf{a} \neq \mathbf{0}$, the **unit vector** in the direction of $\mathbf{a}$ is

$$
\hat{\mathbf{a}} = \frac{\mathbf{a}}{\abs{\mathbf{a}}}.
$$ {#eq-unit-vector}

In the plane, $a_z = 0$ and the third term is omitted.
:::

The magnitude is Pythagoras, applied in the $xy$-plane and again for $z$. A negative component points along the negative axis. The squares in [[#eq-magnitude]] make the magnitude non-negative.

In a plane, if $\theta$ is measured anticlockwise from the positive $x$-axis,

$$
a_x = \abs{\mathbf{a}}\cos\theta, \qquad a_y = \abs{\mathbf{a}}\sin\theta.
$$

Going the other way, use a quadrant-aware arctangent. A bare $\arctan(a_y/a_x)$ cannot tell $(1,1)$ from $(-1,-1)$.

Addition and scalar multiplication become arithmetic once components are taken in the same frame. If $\mathbf{a} = (a_x, a_y, a_z)$ and $\mathbf{b} = (b_x, b_y, b_z)$, then

$$
\mathbf{a}+\mathbf{b} = (a_x+b_x,\; a_y+b_y,\; a_z+b_z), \qquad c\mathbf{a} = (ca_x,\; ca_y,\; ca_z).
$$

Place the tail of $\mathbf{a}$ at the origin and the tail of $\mathbf{b}$ at the head of $\mathbf{a}$: the head of $\mathbf{b}$ is then at the component sums, which is the parallelogram rule. Rotating the axes changes the components and leaves the vector and its magnitude unchanged.

::: intuition The parallelogram, not the tape measure
Draw $\mathbf{a}$ and $\mathbf{b}$ from one point and complete the parallelogram. The diagonal is the sum. Adding the two tape-measure readings gives the length of a broken path, not the length of that diagonal. The two lengths agree only when the vectors point the same way, which is [[#prop-sum]].
:::

::: example A walk east and then north {#ex-walk}
A displacement of $3.00\,\mathrm{m}$ east is followed by a displacement of $4.00\,\mathrm{m}$ north. Find the resultant displacement, its magnitude, and the angle it makes with the eastward direction.
::: solution
Take east as $x$ and north as $y$. The two displacements are $\mathbf{d}_1 = (3.00,\, 0)\,\mathrm{m}$ and $\mathbf{d}_2 = (0,\, 4.00)\,\mathrm{m}$. Addition is componentwise:

$$
\mathbf{d} = \mathbf{d}_1 + \mathbf{d}_2 = (3.00,\, 4.00)\,\mathrm{m}.
$$

The magnitude uses [[#eq-magnitude]]:

$$
\abs{\mathbf{d}} = \sqrt{3.00^2 + 4.00^2} = \sqrt{9.00 + 16.00} = \sqrt{25.00} = 5.00\,\mathrm{m}.
$$

The angle from the positive $x$-axis, that is from east toward north, satisfies

$$
\tan\theta = \frac{4.00}{3.00} = \frac{4}{3}, \qquad \theta = \arctan\frac{4}{3} = 0.9273\,\mathrm{rad} = 53.13^\circ.
$$

Both components are positive, so the angle is in the first quadrant: $53.13^\circ$ north of east. The path walked is $7.00\,\mathrm{m}$, which is a distance, not the magnitude of the resultant. The legs are perpendicular, so Pythagoras applies directly, and we will see that perpendicular vectors have dot product zero.
:::
:::

A force of $10\,\mathrm{N}$ in the direction of $\mathbf{a}$ is $10\,\mathrm{N}$ times $\hat{\mathbf{a}}$, not $10$ times $\mathbf{a}$. Skipping the division leaves the units of $\mathbf{a}$ inside the force. Equation [[#eq-unit-vector]] is undefined for the zero vector, which has no direction.

## The dot product {#dot}

Addition chains displacements. It does not give the angle between two vectors, or how much of one lies along the other. The dot product does both. We define it geometrically, with no frame, and then prove the component formula.

::: definition Dot product {#def-dot}
The **dot product** (or scalar product) of two vectors $\mathbf{a}$ and $\mathbf{b}$ is the scalar

$$
\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}\,\abs{\mathbf{b}}\cos\theta,
$$ {#eq-dot-geom}

where $\theta$ is the angle between them, chosen so that $0 \le \theta \le \pi$. If either vector is zero, the product is defined to be $0$, and no angle is required.
:::

The angle in the definition is the one in the triangle, so $0 \le \theta \le \pi$. Then $\cos\theta$, and the dot product with it, is positive for an acute angle, zero when the vectors are perpendicular, and negative when the angle is obtuse. A negative dot product is not an error.

The product is commutative, because the angle does not care which vector is named first. Also $\mathbf{a}\cdot\mathbf{a} = \abs{\mathbf{a}}^2$, since the angle is zero. For nonzero vectors, $\mathbf{a}\cdot\mathbf{b} = 0$ if and only if $\theta = \pi/2$.

::: theorem Component form of the dot product {#thm-dot}
In a right-handed Cartesian frame,

$$
\mathbf{a}\cdot\mathbf{b} = a_x b_x + a_y b_y + a_z b_z.
$$ {#eq-dot-comp}
:::

::: proof
We first record the law of cosines from Pythagoras, with no dot product, and then compare it with components.

In a triangle, let sides of lengths $p$ and $q$ enclose the angle $\theta$, and let $r$ be the third side. Drop a perpendicular from the far vertex to the line through the side of length $q$. The signed projection of the side of length $p$ onto that line is $p\cos\theta$, and the perpendicular has length $p\sin\theta \ge 0$ for $\theta$ in $[0,\pi]$. Pythagoras gives

$$
r^2 = (q - p\cos\theta)^2 + (p\sin\theta)^2 = q^2 - 2pq\cos\theta + p^2\cos^2\theta + p^2\sin^2\theta = p^2 + q^2 - 2pq\cos\theta.
$$

If $\theta$ is obtuse, $\cos\theta$ is negative and the foot falls outside the segment, but $q - p\cos\theta$ is still the distance from the foot to the far end, so the same expansion applies. In either case

$$
r^2 = p^2 + q^2 - 2pq\cos\theta.
$$

Now let $p = \abs{\mathbf{a}}$, $q = \abs{\mathbf{b}}$ and let $r = \abs{\mathbf{a}-\mathbf{b}}$, so that $\theta$ is the angle between $\mathbf{a}$ and $\mathbf{b}$. The law of cosines and the geometric definition [[#eq-dot-geom]] give

$$
\abs{\mathbf{a}-\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 - 2\,\mathbf{a}\cdot\mathbf{b},
$$

and therefore

$$
\mathbf{a}\cdot\mathbf{b} = \frac{1}{2}\left(\abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 - \abs{\mathbf{a}-\mathbf{b}}^2\right).
$$

It remains only to express the right-hand side in components. By [[#eq-magnitude]],

$$
\abs{\mathbf{a}}^2 = a_x^2 + a_y^2 + a_z^2, \qquad \abs{\mathbf{b}}^2 = b_x^2 + b_y^2 + b_z^2,
$$

and $\mathbf{a}-\mathbf{b} = (a_x-b_x,\, a_y-b_y,\, a_z-b_z)$, so

$$
\abs{\mathbf{a}-\mathbf{b}}^2 = (a_x-b_x)^2 + (a_y-b_y)^2 + (a_z-b_z)^2.
$$

Expand the squares: each contributes a square from $\mathbf{a}$, a square from $\mathbf{b}$ and a cross term $-2 a_x b_x$, and likewise for $y$ and $z$. Subtracting from $\abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2$ cancels every square and leaves

$$
\abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 - \abs{\mathbf{a}-\mathbf{b}}^2 = 2a_x b_x + 2a_y b_y + 2a_z b_z.
$$

Divide by $2$ and the component formula follows. The zero-vector cases are immediate on both sides, since every term contains a factor from the zero vector.
:::

The component formula is where linearity becomes visible. Because the right-hand side of [[#eq-dot-comp]] is linear in the components of each factor,

$$
\mathbf{a}\cdot(\mathbf{b}+\mathbf{c}) = \mathbf{a}\cdot\mathbf{b} + \mathbf{a}\cdot\mathbf{c}, \qquad \mathbf{a}\cdot(c\mathbf{b}) = c\,(\mathbf{a}\cdot\mathbf{b}).
$$

We did not assume linearity; it arrived with the coordinates. The same formula is what you get by expanding in the orthonormal basis, using $\mathbf{i}\cdot\mathbf{i} = 1$ and $\mathbf{i}\cdot\mathbf{j} = 0$ and the analogous products for $\mathbf{j}$ and $\mathbf{k}$. The next identity is the precise version of the warning about adding magnitudes.

::: proposition Magnitude of a sum {#prop-sum}
For any vectors $\mathbf{a}$ and $\mathbf{b}$,

$$
\abs{\mathbf{a}+\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b}.
$$ {#eq-sum-mag}

If $\mathbf{a}$ and $\mathbf{b}$ are nonzero, then $\abs{\mathbf{a}+\mathbf{b}} = \abs{\mathbf{a}} + \abs{\mathbf{b}}$ if and only if $\theta = 0$, that is, if and only if the two vectors are parallel and point in the same sense. If either vector is zero the equality of magnitudes holds as well.
:::

::: proof
Expand the square with the component form, or equivalently with linearity and symmetry of the dot product:

$$
\abs{\mathbf{a}+\mathbf{b}}^2 = (\mathbf{a}+\mathbf{b})\cdot(\mathbf{a}+\mathbf{b}) = \mathbf{a}\cdot\mathbf{a} + \mathbf{b}\cdot\mathbf{b} + 2\,\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b}.
$$

That is [[#eq-sum-mag]]. Both $\abs{\mathbf{a}+\mathbf{b}}$ and $\abs{\mathbf{a}}+\abs{\mathbf{b}}$ are non-negative, so they are equal precisely when their squares are. The square of the sum of the magnitudes is $\abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\abs{\mathbf{a}}\abs{\mathbf{b}}$, and comparison with [[#eq-sum-mag]] gives equality precisely when $\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}\abs{\mathbf{b}}$. If either vector is zero this is $0 = 0$. If neither is zero, divide by the product of the magnitudes to obtain $\cos\theta = 1$, hence $\theta = 0$ because $\theta$ lies in $[0,\pi]$. Conversely, $\theta = 0$ gives $\cos\theta = 1$ and the magnitudes agree.
:::

::: warning Adding the magnitudes
Adding the magnitudes of two vectors does not give the magnitude of the sum, unless the vectors are parallel and point in the same sense, or one of them is zero. Otherwise $\cos\theta < 1$, and [[#eq-sum-mag]] gives a strictly smaller result. The east-then-north walk is $3+4 = 7$ against a resultant of magnitude $5$. Opposite parts give the difference of the magnitudes.
:::

The geometric definition rearranges into a formula for the angle,

$$
\cos\theta = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{a}}\,\abs{\mathbf{b}}},
$$

provided neither vector is zero. The inverse cosine of that ratio lies in $[0,\pi]$, which is the range already chosen for $\theta$. A cosine outside $[-1,1]$ is an arithmetic error, not a new angle.

::: intuition Projection as a shadow
The shadow of $\mathbf{a}$ on the line of $\mathbf{b}$, cast by light perpendicular to that line, has signed length $\mathbf{a}\cdot\hat{\mathbf{b}}$. Multiplying by $\hat{\mathbf{b}}$ turns the length back into a vector. A negative sign means the shadow falls opposite $\mathbf{b}$, which is the obtuse case in the example below.
:::

The vector just described is the **vector projection** of $\mathbf{a}$ onto $\mathbf{b}$,

$$
\operatorname{proj}_{\mathbf{b}}\mathbf{a} = \bigl(\mathbf{a}\cdot\hat{\mathbf{b}}\bigr)\,\hat{\mathbf{b}} = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{b}}^2}\,\mathbf{b}.
$$ {#eq-proj}

The scalar $\mathbf{a}\cdot\hat{\mathbf{b}}$ is the **scalar projection**. Both formulae require $\mathbf{b} \neq \mathbf{0}$. Dividing by $\abs{\mathbf{b}}^2$ avoids a square root. The projection of $\mathbf{a}$ onto $\mathbf{b}$ is not the projection of $\mathbf{b}$ onto $\mathbf{a}$: the two operations use different lines.

::: application Work of a constant force
Suppose a constant force $\mathbf{F}$ acts during a straight displacement $\Delta\mathbf{r}$. Only the part of the force along the displacement transfers energy; the perpendicular part does not. That split is a dot product. The work in this simplest case is

$$
W = \mathbf{F}\cdot\Delta\mathbf{r}.
$$ {#eq-work-preview}

The definition of work for a force that may vary along a curved path is in [[mechanics/work-energy]]. Equation [[#eq-work-preview]] is that definition for a constant force and a straight displacement. The work is zero when the force is perpendicular to the displacement, and negative when the angle is obtuse.
:::

::: example An obtuse angle {#ex-obtuse}
Let $\mathbf{a} = (3,\, 1)$ and $\mathbf{b} = (-1,\, 2)$, with components in metres. Compute $\mathbf{a}\cdot\mathbf{b}$, the two magnitudes, the angle between the vectors, the vector projection of $\mathbf{a}$ onto $\mathbf{b}$, and the $z$-component of $\mathbf{a}\times\mathbf{b}$.
::: solution
The dot product is the component sum, even though the geometric definition was the starting point:

$$
\mathbf{a}\cdot\mathbf{b} = (3)(-1) + (1)(2) = -3 + 2 = -1\,\mathrm{m^2}.
$$

The magnitudes are

$$
\abs{\mathbf{a}} = \sqrt{3^2 + 1^2} = \sqrt{10}\,\mathrm{m}, \qquad \abs{\mathbf{b}} = \sqrt{(-1)^2 + 2^2} = \sqrt{5}\,\mathrm{m}.
$$

Neither is zero, so the angle is defined:

$$
\cos\theta = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{a}}\,\abs{\mathbf{b}}} = \frac{-1}{\sqrt{10}\,\sqrt{5}} = \frac{-1}{\sqrt{50}}.
$$

Rationalising gives the equivalent value $-\sqrt{2}/10$, since $\sqrt{50} = 5\sqrt{2}$ and $1/(5\sqrt{2}) = \sqrt{2}/10$. Numerically $\cos\theta = -0.14142$, and

$$
\theta = \arccos\bigl(-1/\sqrt{50}\bigr) = 1.7127\,\mathrm{rad} = 98.13^\circ.
$$

The angle is obtuse, as the negative dot product promised. Adding the magnitudes would give $\sqrt{10}+\sqrt{5} = 5.398\,\mathrm{m}$, but the sum vector is $\mathbf{a}+\mathbf{b} = (2,\, 3)$ and

$$
\abs{\mathbf{a}+\mathbf{b}} = \sqrt{2^2 + 3^2} = \sqrt{13} = 3.606\,\mathrm{m},
$$

which is smaller, in agreement with [[#prop-sum]].

The scalar projection of $\mathbf{a}$ onto $\mathbf{b}$ is

$$
\mathbf{a}\cdot\hat{\mathbf{b}} = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{b}}} = \frac{-1}{\sqrt{5}}\,\mathrm{m} = -0.4472\,\mathrm{m}.
$$

The vector projection follows from [[#eq-proj]]:

$$
\operatorname{proj}_{\mathbf{b}}\mathbf{a} = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{b}}^2}\,\mathbf{b} = \frac{-1}{5}\,(-1,\, 2) = \left(\frac{1}{5},\, -\frac{2}{5}\right)\mathrm{m} = (0.200,\, -0.400)\,\mathrm{m}.
$$

It points opposite $\mathbf{b}$, because the scalar projection is negative. Its length is $1/\sqrt{5}\,\mathrm{m}$, and $\bigl(\mathbf{a} - \operatorname{proj}_{\mathbf{b}}\mathbf{a}\bigr)\cdot\mathbf{b} = 0$.

The cross product is defined in the next section. For vectors that lie in the $xy$-plane its only component is the $z$-component,

$$
a_x b_y - a_y b_x = (3)(2) - (1)(-1) = 6 + 1 = 7\,\mathrm{m^2}.
$$

We can already check this number against the geometric size. With $\cos\theta = -1/\sqrt{50}$,

$$
\sin\theta = \sqrt{1 - \cos^2\theta} = \sqrt{1 - \frac{1}{50}} = \sqrt{\frac{49}{50}} = \frac{7}{\sqrt{50}},
$$

the positive root because $\theta$ lies in $[0,\pi]$, where sine is non-negative. Then

$$
\abs{\mathbf{a}}\,\abs{\mathbf{b}}\sin\theta = \sqrt{50}\cdot\frac{7}{\sqrt{50}} = 7,
$$

which matches. The positive sign means $\mathbf{a}\times\mathbf{b}$ points toward the reader if $x$ is to the right and $y$ is up: from $\mathbf{a}$ to $\mathbf{b}$ is anticlockwise, and the right-hand rule agrees.
:::
:::

::: widget vector
ax: 3
ay: 1
bx: -1
by: 2
caption: The arrows start as $\mathbf{a} = (3,1)$ and $\mathbf{b} = (-1,2)$ from the worked example. Drag either tip. The readout should show $\mathbf{a}\cdot\mathbf{b} = -1$, magnitudes $\sqrt{10}$ and $\sqrt{5}$, $\theta \approx 98.13^\circ$ and a $z$-component of the cross product equal to $7$ while the arrows are left at the start. Then drag $\mathbf{b}$ until it points along $\mathbf{a}$: the angle closes to $0^\circ$, the dot product becomes the product of the magnitudes, and the third arrow, which is $\mathbf{a}+\mathbf{b}$, grows to length $\abs{\mathbf{a}}+\abs{\mathbf{b}}$. Swing $\mathbf{b}$ past a right angle and watch the dot product change sign.
:::

::: example Work of a constant force {#ex-work}
A constant force $\mathbf{F} = (4\,\mathrm{N},\, -2\,\mathrm{N})$ moves its point of application through the straight displacement $\Delta\mathbf{r} = (0.5\,\mathrm{m},\, 0.5\,\mathrm{m})$. Find the work done by the force, and check the result against the cosine formula.
::: solution
The general definition is in [[mechanics/work-energy]]. Here the force is constant and the path is one straight segment, so

$$
W = \mathbf{F}\cdot\Delta\mathbf{r} = (4)(0.5) + (-2)(0.5) = 2.0 - 1.0 = 1.0\,\mathrm{J}.
$$

Each product is a newton-metre, a joule. The second term is negative because part of the force points against part of the displacement.

For the check, compute the magnitudes and the angle. 

$$
\abs{\mathbf{F}} = \sqrt{4^2 + (-2)^2} = \sqrt{20} = 2\sqrt{5}\,\mathrm{N}, \qquad \abs{\Delta\mathbf{r}} = \sqrt{0.5^2 + 0.5^2} = \sqrt{0.5} = \frac{\sqrt{2}}{2}\,\mathrm{m}.
$$

Their product is $\sqrt{20}\cdot\sqrt{0.5} = \sqrt{10}\,\mathrm{N\cdot m}$. Then

$$
\cos\phi = \frac{W}{\abs{\mathbf{F}}\,\abs{\Delta\mathbf{r}}} = \frac{1}{\sqrt{10}} = 0.31623, \qquad \phi = \arccos\bigl(1/\sqrt{10}\bigr) = 71.57^\circ.
$$

Rebuilding the product gives $\sqrt{10}\cdot(1/\sqrt{10}) = 1.0\,\mathrm{J}$ again. Adding the magnitudes instead would have given about $3.16\,\mathrm{J}$, which is the work only when the force and the displacement are parallel.
:::
:::

::: quiz
For nonzero vectors, when is $\abs{\mathbf{a}+\mathbf{b}} = \abs{\mathbf{a}} + \abs{\mathbf{b}}$?
- [ ] Always, because magnitude is a length and lengths add.
- [ ] Never, because the diagonal of a parallelogram is shorter than either side.
- [ ] Exactly when $\mathbf{a}$ and $\mathbf{b}$ are perpendicular.
- [x] Exactly when $\mathbf{a}$ and $\mathbf{b}$ are parallel and point in the same sense.
::: solution
By [[#prop-sum]] the equality holds precisely when $\cos\theta = 1$, that is when $\theta = 0$. Perpendicular vectors satisfy Pythagoras instead, $\abs{\mathbf{a}+\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2$. The parallelogram collapses to a segment only in the parallel case.
:::
:::

## The cross product {#cross}

The dot product is a scalar, and it vanishes for perpendicular vectors. Torque, angular momentum and the magnetic force need a vector normal to a plane, with magnitude equal to the area of a parallelogram. That vector is the cross product.

::: definition Cross product {#def-cross}
The **cross product** $\mathbf{a}\times\mathbf{b}$ of two vectors is the vector with magnitude

$$
\abs{\mathbf{a}\times\mathbf{b}} = \abs{\mathbf{a}}\,\abs{\mathbf{b}}\sin\theta,
$$ {#eq-cross-mag}

where $\theta$ is again the angle between them in $[0,\pi]$, so that $\sin\theta \ge 0$. The direction is perpendicular to the plane of $\mathbf{a}$ and $\mathbf{b}$, fixed by the **right-hand rule**: if the fingers of the right hand curl from $\mathbf{a}$ toward $\mathbf{b}$ through the angle $\theta$, the thumb points along $\mathbf{a}\times\mathbf{b}$. If either vector is zero, or if they are parallel, the cross product is $\mathbf{0}$.
:::

The curl uses the angle $\theta$ in $[0,\pi]$, not the long way round. For the worked pair, $\theta \approx 98^\circ$, the fingers curl anticlockwise from $\mathbf{a}$ to $\mathbf{b}$, and the thumb points out of the page. The positive $z$-component $7$ is that statement in numbers.

Two properties are immediate and should be reflexes. Reversing the order reverses the sense of the curl, so the thumb flips and

$$
\mathbf{a}\times\mathbf{b} = -\mathbf{b}\times\mathbf{a}.
$$

The product anticommutes. A sign error from swapping the factors is the usual mistake in a later torque problem. Setting $\mathbf{b} = \mathbf{a}$ gives $\mathbf{a}\times\mathbf{a} = -\mathbf{a}\times\mathbf{a}$, so

$$
\mathbf{a}\times\mathbf{a} = \mathbf{0}.
$$

The same conclusion follows from [[#eq-cross-mag]], since $\sin 0 = 0$. Parallel nonzero vectors have $\theta = 0$ or $\theta = \pi$, so their cross product also vanishes, and in particular $\mathbf{i}\times\mathbf{i} = \mathbf{j}\times\mathbf{j} = \mathbf{k}\times\mathbf{k} = \mathbf{0}$.

The basis vectors of a right-handed frame are perpendicular and of unit length, so the magnitude of $\mathbf{i}\times\mathbf{j}$ is $1$. The right-hand rule sends $\mathbf{i}$ toward $\mathbf{j}$ with the thumb along $\mathbf{k}$. Therefore

$$
\mathbf{i}\times\mathbf{j} = \mathbf{k}, \qquad \mathbf{j}\times\mathbf{k} = \mathbf{i}, \qquad \mathbf{k}\times\mathbf{i} = \mathbf{j},
$$

and the opposite orders give the minus signs. These products are the multiplication table. The component formula is what the table produces for a general pair, once the cross product is linear in each argument.

Linearity is the property

$$
\mathbf{a}\times(\mathbf{b}+\mathbf{c}) = \mathbf{a}\times\mathbf{b} + \mathbf{a}\times\mathbf{c}, \qquad (c\mathbf{a})\times\mathbf{b} = c\,(\mathbf{a}\times\mathbf{b}),
$$

and likewise in the first factor. In the plane, $a_x b_y - a_y b_x$ is the signed area of the parallelogram: it scales with either edge, changes sign when an edge is reversed, and adds when one edge is split into a sum. In space the same reading applies to each coordinate plane, and those three signed areas are the components of $\mathbf{a}\times\mathbf{b}$.

::: theorem Component formula for the cross product {#thm-cross}
In a right-handed Cartesian frame,

$$
\mathbf{a}\times\mathbf{b} = (a_y b_z - a_z b_y)\,\mathbf{i} + (a_z b_x - a_x b_z)\,\mathbf{j} + (a_x b_y - a_y b_x)\,\mathbf{k},
$$ {#eq-cross-comp}

which is the formal determinant

$$
\mathbf{a}\times\mathbf{b} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ a_x & a_y & a_z \\ b_x & b_y & b_z \end{vmatrix}.
$$

For two vectors in the $xy$-plane the only surviving component is $a_x b_y - a_y b_x$, along $\mathbf{k}$.
:::

::: proof
Expand by linearity, using $\mathbf{a} = a_x\mathbf{i} + a_y\mathbf{j} + a_z\mathbf{k}$ and the same for $\mathbf{b}$:

$$
\begin{aligned}
\mathbf{a}\times\mathbf{b} &= a_x b_x\,(\mathbf{i}\times\mathbf{i}) + a_x b_y\,(\mathbf{i}\times\mathbf{j}) + a_x b_z\,(\mathbf{i}\times\mathbf{k}) \\
&\quad + a_y b_x\,(\mathbf{j}\times\mathbf{i}) + a_y b_y\,(\mathbf{j}\times\mathbf{j}) + a_y b_z\,(\mathbf{j}\times\mathbf{k}) \\
&\quad + a_z b_x\,(\mathbf{k}\times\mathbf{i}) + a_z b_y\,(\mathbf{k}\times\mathbf{j}) + a_z b_z\,(\mathbf{k}\times\mathbf{k}).
\end{aligned}
$$

Insert the multiplication table. The three terms with repeated basis vectors vanish. The remaining six are

$$
\begin{aligned}
\mathbf{a}\times\mathbf{b} &= a_x b_y\,\mathbf{k} + a_x b_z\,(-\mathbf{j}) + a_y b_x\,(-\mathbf{k}) + a_y b_z\,\mathbf{i} + a_z b_x\,\mathbf{j} + a_z b_y\,(-\mathbf{i}) \\
&= (a_y b_z - a_z b_y)\,\mathbf{i} + (a_z b_x - a_x b_z)\,\mathbf{j} + (a_x b_y - a_y b_x)\,\mathbf{k}.
\end{aligned}
$$

The same three components are what the determinant produces if it is expanded along the first row, with the usual minus sign in front of the $\mathbf{j}$ minor: the minor of $\mathbf{j}$ is $a_x b_z - a_z b_x$, and the minus sign in front of it converts $-(a_x b_z - a_z b_x)$ into $a_z b_x - a_x b_z$. For planar vectors, $a_z = b_z = 0$, and only the last component $a_x b_y - a_y b_x$ remains.
:::

The determinant is a memory aid. The minus sign on the middle component is the detail most often lost; if a later triple product that ought to vanish does not, check that sign first.

The derivation used linearity and the basis table. We still owe a check that [[#eq-cross-comp]] has the magnitude in [[#eq-cross-mag]].

::: theorem Magnitude identity for the cross product {#thm-cross-mag}
The component formula satisfies

$$
\abs{\mathbf{a}\times\mathbf{b}}^2 = \abs{\mathbf{a}}^2\,\abs{\mathbf{b}}^2 - (\mathbf{a}\cdot\mathbf{b})^2,
$$

and therefore $\abs{\mathbf{a}\times\mathbf{b}} = \abs{\mathbf{a}}\,\abs{\mathbf{b}}\abs{\sin\theta}$. For $\theta$ in $[0,\pi]$ the absolute value on the sine may be dropped.
:::

::: proof
Write $\mathbf{c} = \mathbf{a}\times\mathbf{b}$ and expand $\abs{\mathbf{c}}^2 = c_x^2 + c_y^2 + c_z^2$ with the components from [[#eq-cross-comp]]:

$$
\begin{aligned}
\abs{\mathbf{a}\times\mathbf{b}}^2 &= (a_y b_z - a_z b_y)^2 + (a_z b_x - a_x b_z)^2 + (a_x b_y - a_y b_x)^2 \\
&= a_y^2 b_z^2 - 2 a_y a_z b_y b_z + a_z^2 b_y^2 + a_z^2 b_x^2 - 2 a_z a_x b_x b_z + a_x^2 b_z^2 \\
&\quad + a_x^2 b_y^2 - 2 a_x a_y b_x b_y + a_y^2 b_x^2.
\end{aligned}
$$

On the other side, expand the product of the squares and subtract the square of the dot product:

$$
\begin{aligned}
\abs{\mathbf{a}}^2\abs{\mathbf{b}}^2 &= (a_x^2+a_y^2+a_z^2)(b_x^2+b_y^2+b_z^2), \\
(\mathbf{a}\cdot\mathbf{b})^2 &= a_x^2 b_x^2 + a_y^2 b_y^2 + a_z^2 b_z^2 + 2 a_x a_y b_x b_y + 2 a_x a_z b_x b_z + 2 a_y a_z b_y b_z.
\end{aligned}
$$

In the product $\abs{\mathbf{a}}^2\abs{\mathbf{b}}^2$, the three terms $a_x^2 b_x^2$, $a_y^2 b_y^2$ and $a_z^2 b_z^2$ are exactly the three square terms in $(\mathbf{a}\cdot\mathbf{b})^2$. They cancel in the difference, leaving

$$
\begin{aligned}
\abs{\mathbf{a}}^2\abs{\mathbf{b}}^2 - (\mathbf{a}\cdot\mathbf{b})^2 &= a_x^2 b_y^2 + a_x^2 b_z^2 + a_y^2 b_x^2 + a_y^2 b_z^2 + a_z^2 b_x^2 + a_z^2 b_y^2 \\
&\quad - 2 a_x a_y b_x b_y - 2 a_x a_z b_x b_z - 2 a_y a_z b_y b_z.
\end{aligned}
$$

This is the same polynomial as the expansion of $\abs{\mathbf{a}\times\mathbf{b}}^2$. Using $\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}\abs{\mathbf{b}}\cos\theta$ then gives

$$
\abs{\mathbf{a}\times\mathbf{b}}^2 = \abs{\mathbf{a}}^2\abs{\mathbf{b}}^2(1 - \cos^2\theta) = \abs{\mathbf{a}}^2\abs{\mathbf{b}}^2\sin^2\theta.
$$

Magnitudes are non-negative and $\sin\theta \ge 0$ on $[0,\pi]$, so taking square roots yields [[#eq-cross-mag]].
:::

The magnitude $\abs{\mathbf{a}}\,\abs{\mathbf{b}}\sin\theta$ is the area of the parallelogram with base $\abs{\mathbf{b}}$ and height $\abs{\mathbf{a}}\sin\theta$. The cross product packages that area with a normal, which reverses when the factors are swapped. A volume needs one further step: a cross product followed by a dot product.

::: proposition Scalar triple product {#prop-volume}
The **scalar triple product** $\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c})$ equals the signed volume of the parallelepiped spanned by $\mathbf{a}$, $\mathbf{b}$ and $\mathbf{c}$. The sign is positive when the ordered triple $(\mathbf{a}, \mathbf{b}, \mathbf{c})$ is right-handed relative to the frame, and negative when it is left-handed. In components it is the determinant

$$
\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}) = \begin{vmatrix} a_x & a_y & a_z \\ b_x & b_y & b_z \\ c_x & c_y & c_z \end{vmatrix}.
$$
:::

::: proof
Let $\mathbf{n} = \mathbf{b}\times\mathbf{c}$. By the reading of the cross product just given, $\abs{\mathbf{n}}$ is the area of the parallelogram spanned by $\mathbf{b}$ and $\mathbf{c}$, and $\mathbf{n}$ points along the right-hand normal to that base. The signed height of the parallelepiped, relative to the same normal, is the scalar projection $\mathbf{a}\cdot\hat{\mathbf{n}} = (\mathbf{a}\cdot\mathbf{n})/\abs{\mathbf{n}}$. Signed volume is signed height times base area,

$$
V = \frac{\mathbf{a}\cdot\mathbf{n}}{\abs{\mathbf{n}}}\,\abs{\mathbf{n}} = \mathbf{a}\cdot\mathbf{n} = \mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}).
$$

The cancellation is legal when $\mathbf{n} \neq \mathbf{0}$. When $\mathbf{n} = \mathbf{0}$, the base has no area, the volume is zero, and the triple product is zero as well. The sign claim is the right-hand rule: $V > 0$ when $\mathbf{a}$ lies on the same side of the base as $\mathbf{n}$.

For the determinant, write $\mathbf{b}\times\mathbf{c}$ by [[#eq-cross-comp]] and take the dot product with $\mathbf{a}$. The result is $a_x(b_y c_z - b_z c_y) + a_y(b_z c_x - b_x c_z) + a_z(b_x c_y - b_y c_x)$, which is the expansion of the determinant along its first row.
:::

Swapping two factors changes the sign, and cycling them does not: $\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}) = \mathbf{b}\cdot(\mathbf{c}\times\mathbf{a}) = \mathbf{c}\cdot(\mathbf{a}\times\mathbf{b})$. If two of the three are parallel the volume is zero. In particular $\mathbf{a}\cdot(\mathbf{a}\times\mathbf{c}) = 0$, so the cross product is perpendicular to both factors. The last exercise asks you to see that cancellation in components.

::: example Volume of a parallelepiped {#ex-volume}
Let $\mathbf{a} = (2,\, 0,\, -1)$, $\mathbf{b} = (0,\, 1,\, 2)$ and $\mathbf{c} = (1,\, -1,\, 1)$. Compute $\mathbf{b}\times\mathbf{c}$ and the scalar triple product $\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c})$, and interpret the sign.
::: solution
Use [[#eq-cross-comp]] with the factors in the order $\mathbf{b}$, then $\mathbf{c}$:

$$
\begin{aligned}
\mathbf{b}\times\mathbf{c} &= \bigl((1)(1) - (2)(-1)\bigr)\,\mathbf{i} + \bigl((2)(1) - (0)(1)\bigr)\,\mathbf{j} + \bigl((0)(-1) - (1)(1)\bigr)\,\mathbf{k} \\
&= (1 + 2)\,\mathbf{i} + (2 - 0)\,\mathbf{j} + (0 - 1)\,\mathbf{k} \\
&= (3,\, 2,\, -1).
\end{aligned}
$$

Watch the middle component: the formula gives $b_z c_x - b_x c_z = (2)(1) - (0)(1) = 2$, which is the same as minus the $\mathbf{j}$ minor. Dot with $\mathbf{a}$:

$$
\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}) = (2)(3) + (0)(2) + (-1)(-1) = 6 + 0 + 1 = 7.
$$

The parallelepiped has signed volume $7$. The positive sign means $(\mathbf{a},\mathbf{b},\mathbf{c})$ is right-handed: $\mathbf{a}$ lies on the same side of the plane of $\mathbf{b}$ and $\mathbf{c}$ as $\mathbf{b}\times\mathbf{c}$. If the components are metres, the volume is $7\,\mathrm{m^3}$. As a check, $\mathbf{b}\cdot(\mathbf{b}\times\mathbf{c}) = (0)(3)+(1)(2)+(2)(-1) = 0$.
:::
:::

::: remark Which product to use
An angle, a projection or a work is a dot product. A vector perpendicular to a plane is a cross product. A volume is a scalar triple product. Both $\mathbf{a}\cdot\mathbf{b}$ for two displacements and $\abs{\mathbf{a}\times\mathbf{b}}$ are areas, not lengths.
:::

::: history Coordinates, quaternions and vectors
René Descartes's *La Géométrie* (1637) described curves by coordinates: a curve in the plane is an algebraic relation between those coordinates, which is what lets us write $\mathbf{a} = (a_x, a_y)$. In 1843 William Rowan Hamilton introduced quaternions. The product of two pure imaginary quaternions splits into a scalar piece and a vector piece: the vector piece is the modern cross product, and the scalar piece is the negative of the modern dot product. In the 1880s J. Willard Gibbs, in *Elements of Vector Analysis* (1881–1884), and Oliver Heaviside, in his electromagnetic writings of the same decade, separated those products from the quaternion system. The notation $\mathbf{a}\cdot\mathbf{b}$ and $\mathbf{a}\times\mathbf{b}$ is the form Gibbs settled.
:::

## Where this leads {#leads}

In [[mechanics/motion-1d]] a vector on a chosen line collapses to a signed scalar, and a sign error is a direction error. Off the line, projectile motion and circular motion keep both components. Work, previewed here as $\mathbf{F}\cdot\Delta\mathbf{r}$, becomes a path integral in [[mechanics/work-energy]], and torque is $\mathbf{r}\times\mathbf{F}$.

In [[math-methods/vector-calculus]] the vectors become fields. The gradient, divergence and curl are derivatives of their components, and the curl is the differential descendant of the cross product. The identity $\mathbf{a}\cdot(\mathbf{a}\times\mathbf{b}) = 0$ is why a curl is orthogonal to the field it came from.

::: summary
- The SI base units are the metre, kilogram, second, ampere, kelvin, mole and candela. In this course, convert into $\mathrm{m}$, $\mathrm{kg}$ and $\mathrm{s}$ before you compute.
- A newton is $\mathrm{kg\cdot m/s^2}$, a joule is a newton-metre, a watt is a joule per second, and a pascal is a newton per square metre.
- An equation must be dimensionally homogeneous. The arguments of $\sin$, $\cos$, $\exp$ and $\ln$ must be dimensionless, and this test catches impossible formulae before any arithmetic.
- A vector has magnitude and direction. Add vectors by the parallelogram rule, or by adding components in one frame. Do not add the magnitudes unless the vectors are parallel and in the same sense.
- The magnitude is $\abs{\mathbf{a}} = \sqrt{a_x^2+a_y^2+a_z^2}$, and the unit vector is $\hat{\mathbf{a}} = \mathbf{a}/\abs{\mathbf{a}}$ for $\mathbf{a} \neq \mathbf{0}$.
- The dot product is $\abs{\mathbf{a}}\abs{\mathbf{b}}\cos\theta = a_x b_x + a_y b_y + a_z b_z$. It gives angles and projections, and the work of a constant force along a straight displacement is $\mathbf{F}\cdot\Delta\mathbf{r}$.
- The cross product has magnitude $\abs{\mathbf{a}}\abs{\mathbf{b}}\sin\theta$, direction by the right-hand rule, and components given by the formal determinant in $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$. It anticommutes, and $\mathbf{a}\times\mathbf{a} = \mathbf{0}$.
- The scalar triple product $\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c})$ is the signed volume of the parallelepiped spanned by the three vectors.
:::

## Exercises {#exercises}

::: exercise Magnitude in three dimensions {level=1 check="13"}
Find the magnitude of $\mathbf{a} = (3,\, -4,\, 12)$.
::: solution
Apply [[#eq-magnitude]]:

$$
\abs{\mathbf{a}} = \sqrt{3^2 + (-4)^2 + 12^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13.
$$

The negative component is squared, so it contributes $+16$. The numbers $5$, $12$ and $13$ are the familiar triple once $(3,-4,0)$ is recognised to have magnitude $5$.
:::
:::

::: exercise A dot product {level=1 check="-4"}
Compute $\mathbf{a}\cdot\mathbf{b}$ for $\mathbf{a} = (2,\, -1,\, 4)$ and $\mathbf{b} = (1,\, 2,\, -1)$.
::: solution
By [[#eq-dot-comp]],

$$
\mathbf{a}\cdot\mathbf{b} = (2)(1) + (-1)(2) + (4)(-1) = 2 - 2 - 4 = -4.
$$

The result is negative, so the angle between the vectors is obtuse. The angle itself is not required.
:::
:::

::: exercise Newtons and grams {level=1 check="5"}
A force of $1.25\,\mathrm{N}$ acts on a mass of $250\,\mathrm{g}$. Find the magnitude of the acceleration in $\mathrm{m/s^2}$.
::: solution
Convert the mass to the SI base unit: $250\,\mathrm{g} = 0.250\,\mathrm{kg}$. Then

$$
a = \frac{F}{m} = \frac{1.25\,\mathrm{N}}{0.250\,\mathrm{kg}} = 5.00\,\mathrm{m/s^2}.
$$

Leaving the mass as $250$ would produce $0.00500$, a thousand times too small.
:::
:::

::: exercise Angle between two vectors {level=2 check="pi/3"}
Find the angle, in radians, between $\mathbf{u} = (1,\, 1,\, 0)$ and $\mathbf{v} = (1,\, 0,\, 1)$.
::: solution
The dot product is $\mathbf{u}\cdot\mathbf{v} = (1)(1) + (1)(0) + (0)(1) = 1$. The magnitudes are

$$
\abs{\mathbf{u}} = \sqrt{1+1+0} = \sqrt{2}, \qquad \abs{\mathbf{v}} = \sqrt{1+0+1} = \sqrt{2}.
$$

Hence

$$
\cos\theta = \frac{1}{\sqrt{2}\cdot\sqrt{2}} = \frac{1}{2}, \qquad \theta = \arccos\frac{1}{2} = \frac{\pi}{3}.
$$

The degree measure is $60^\circ$; the value requested is the radian measure. The angle between two vectors comes from the cosine, not from a slope.
:::
:::

::: exercise Scalar projection {level=2 check="sqrt(2)"}
Find the scalar projection of $\mathbf{a} = (4,\, -2)$ onto $\mathbf{b} = (1,\, 1)$.
::: solution
The scalar projection is $\mathbf{a}\cdot\hat{\mathbf{b}} = (\mathbf{a}\cdot\mathbf{b})/\abs{\mathbf{b}}$. First

$$
\mathbf{a}\cdot\mathbf{b} = (4)(1) + (-2)(1) = 2, \qquad \abs{\mathbf{b}} = \sqrt{1^2+1^2} = \sqrt{2}.
$$

Therefore the scalar projection is $2/\sqrt{2} = \sqrt{2}$. The sign is positive, so the shadow of $\mathbf{a}$ falls on the same side as $\mathbf{b}$. The question asks only for the signed scalar.
:::
:::

::: exercise Area of a parallelogram {level=2 check="6*sqrt(5)"}
Find the area of the parallelogram spanned by $\mathbf{a} = (2,\, -1,\, 3)$ and $\mathbf{b} = (0,\, 4,\, -2)$.
::: solution
The area is $\abs{\mathbf{a}\times\mathbf{b}}$. The cross product, by [[#eq-cross-comp]], has components

$$
\begin{aligned}
a_y b_z - a_z b_y &= (-1)(-2) - (3)(4) = 2 - 12 = -10, \\
a_z b_x - a_x b_z &= (3)(0) - (2)(-2) = 0 + 4 = 4, \\
a_x b_y - a_y b_x &= (2)(4) - (-1)(0) = 8.
\end{aligned}
$$

So $\mathbf{a}\times\mathbf{b} = (-10,\, 4,\, 8)$ and

$$
\abs{\mathbf{a}\times\mathbf{b}} = \sqrt{(-10)^2 + 4^2 + 8^2} = \sqrt{100 + 16 + 64} = \sqrt{180} = \sqrt{36 \cdot 5} = 6\sqrt{5}.
$$

The area is $6\sqrt{5}$ square units. Swapping the sign of the middle component would not change this magnitude, so a later request for the vector itself is what catches that error.
:::
:::

::: exercise Magnitude of a sum {level=3}
Prove that $\abs{\mathbf{a}+\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b}$ for any vectors $\mathbf{a}$ and $\mathbf{b}$. Deduce the triangle inequality $\abs{\mathbf{a}+\mathbf{b}} \le \abs{\mathbf{a}} + \abs{\mathbf{b}}$, and state when equality holds.
::: hint
Expand $(\mathbf{a}+\mathbf{b})\cdot(\mathbf{a}+\mathbf{b})$ with linearity. For the inequality, compare $\mathbf{a}\cdot\mathbf{b}$ with $\abs{\mathbf{a}}\abs{\mathbf{b}}$ using $\cos\theta \le 1$.
:::
::: solution
Linearity and symmetry of the dot product give

$$
\begin{aligned}
\abs{\mathbf{a}+\mathbf{b}}^2 &= (\mathbf{a}+\mathbf{b})\cdot(\mathbf{a}+\mathbf{b}) \\
&= \mathbf{a}\cdot\mathbf{a} + \mathbf{a}\cdot\mathbf{b} + \mathbf{b}\cdot\mathbf{a} + \mathbf{b}\cdot\mathbf{b} \\
&= \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b},
\end{aligned}
$$

which is the identity. Since $\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}\abs{\mathbf{b}}\cos\theta$ and $\cos\theta \le 1$,

$$
\abs{\mathbf{a}+\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b} \le \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\abs{\mathbf{a}}\abs{\mathbf{b}} = \bigl(\abs{\mathbf{a}} + \abs{\mathbf{b}}\bigr)^2.
$$

Both $\abs{\mathbf{a}+\mathbf{b}}$ and $\abs{\mathbf{a}}+\abs{\mathbf{b}}$ are non-negative, so taking square roots preserves the inequality:

$$
\abs{\mathbf{a}+\mathbf{b}} \le \abs{\mathbf{a}} + \abs{\mathbf{b}}.
$$

Equality holds in $\cos\theta \le 1$ when $\theta = 0$, or when at least one vector is zero. For nonzero vectors, that is the condition of being parallel and in the same sense, as in [[#prop-sum]].
:::
:::

::: exercise Orthogonality of the cross product {level=3}
Using the component formula, prove that $\mathbf{a}\times\mathbf{b}$ is perpendicular to both $\mathbf{a}$ and $\mathbf{b}$. Conclude that if $\mathbf{a}$ and $\mathbf{b}$ are not parallel, they form a basis of the plane normal to $\mathbf{a}\times\mathbf{b}$.
::: hint
Compute $(\mathbf{a}\times\mathbf{b})\cdot\mathbf{a}$ from components and watch the terms cancel in pairs. The same calculation with $\mathbf{b}$ is not a new idea; you can also use anticommutativity.
:::
::: solution
Let $\mathbf{c} = \mathbf{a}\times\mathbf{b}$, so that $c_x = a_y b_z - a_z b_y$, $c_y = a_z b_x - a_x b_z$ and $c_z = a_x b_y - a_y b_x$. The dot product with $\mathbf{a}$ is

$$
\begin{aligned}
\mathbf{c}\cdot\mathbf{a} &= (a_y b_z - a_z b_y) a_x + (a_z b_x - a_x b_z) a_y + (a_x b_y - a_y b_x) a_z \\
&= a_x a_y b_z - a_x a_z b_y + a_y a_z b_x - a_x a_y b_z + a_x a_z b_y - a_y a_z b_x.
\end{aligned}
$$

The six terms cancel in three pairs, so $(\mathbf{a}\times\mathbf{b})\cdot\mathbf{a} = 0$. For the second factor, anticommutativity gives

$$
(\mathbf{a}\times\mathbf{b})\cdot\mathbf{b} = -(\mathbf{b}\times\mathbf{a})\cdot\mathbf{b} = 0,
$$

by the result just proved applied to the ordered pair $(\mathbf{b}, \mathbf{a})$. Alternatively, expand $(\mathbf{a}\times\mathbf{b})\cdot\mathbf{b}$ directly; the cancellation is the same with the names swapped.

Thus $\mathbf{a}\times\mathbf{b}$ is orthogonal to every vector in the plane spanned by $\mathbf{a}$ and $\mathbf{b}$. If the two are not parallel, then $\sin\theta \neq 0$, so $\mathbf{a}\times\mathbf{b} \neq \mathbf{0}$ by [[#eq-cross-mag]], and they are linearly independent. They span a plane, and that plane is the set of vectors perpendicular to $\mathbf{a}\times\mathbf{b}$.
:::
:::
