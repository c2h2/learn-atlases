A point charge sits ten centimetres from the centre of an earthed metal sphere of radius five centimetres. How hard is it pulled towards the sphere? Coulomb's law alone cannot answer, because the sphere's induced charge is not given: it arranges itself so that the surface stays at zero potential. The real question is to find the potential that satisfies a differential equation outside the sphere and takes a prescribed value on it. That is a **boundary-value problem**, and most of electrostatics beyond the first course is of this kind.

This chapter turns the integral laws of [[electrostatics/gauss-law]] and [[electrostatics/potential]] into one partial differential equation, proves that its solution is fixed by the boundary data, and then develops the three standard ways of finding that solution: images, separation of variables, and the multipole expansion. It ends with dielectrics. For a charge of $1\,\mathrm{nC}$ the answer to the opening question is $0.80\,\mu\mathrm{N}$, and it will take three lines.

The vector calculus is that of [[math-methods/vector-calculus]] and [[math-methods/integral-theorems]]. The Fourier series of [[math-methods/fourier]] and the Legendre polynomials of [[math-methods/odes]] are used without re-derivation, and the free-space Green's function $1/(4\pi\lvert\mathbf r-\mathbf r'\rvert)$ is the one constructed in [[math-methods/green-functions]]. SI units throughout, with $\varepsilon_0 = 8.8541878128\times10^{-12}\,\mathrm{F/m}$ and $1/(4\pi\varepsilon_0) = 8.98755\times10^{9}\,\mathrm{N\,m^2/C^2}$.

## Poisson's and Laplace's equations {#poisson}

Electrostatics rests on two differential statements about the field $\mathbf E$ of charges at rest. Gauss's law in differential form is $\nabla\cdot\mathbf E = \rho/\varepsilon_0$. The field of a static charge distribution is also curl-free, $\nabla\times\mathbf E = \mathbf 0$, because it is a superposition of Coulomb fields, each of which is a gradient. So $\mathbf E = -\nabla V$ for a scalar potential $V$, defined up to a constant, and Gauss's law becomes one second-order equation for one unknown.

::: definition Poisson's and Laplace's equations {#def-poisson}
The electrostatic potential $V$ of a charge density $\rho$ satisfies **Poisson's equation**

$$
\nabla^2 V = -\frac{\rho}{\varepsilon_0}, \qquad \nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2}.
$$ {#eq-poisson}

In a region with no charge it reduces to **Laplace's equation**

$$
\nabla^2 V = 0.
$$ {#eq-laplace}

A twice-differentiable function satisfying [[#eq-laplace]] on a region is called **harmonic** there.
:::

In all of space, with $V \to 0$ at infinity, the solution of [[#eq-poisson]] is the Coulomb integral

$$
V(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\int \frac{\rho(\mathbf r')}{\lvert\mathbf r - \mathbf r'\rvert}\,\dd\tau',
$$ {#eq-coulomb-int}

because $\nabla^2(1/\lvert\mathbf r-\mathbf r'\rvert) = -4\pi\,\delta^3(\mathbf r - \mathbf r')$. This is the Green's-function solution of [[math-methods/green-functions]]. It is the right answer only when every charge is known in advance. As soon as conductors are present, part of $\rho$ is the unknown induced charge, and [[#eq-coulomb-int]] becomes an equation for itself. Poisson's equation with boundary conditions avoids the circularity: we solve for $V$ in the space between the conductors and read the induced charge off afterwards.

### Boundary conditions {#bc}

At a surface carrying a surface charge density $\sigma$, apply Gauss's law to a thin pillbox straddling the surface and the circulation law to a thin rectangular loop. Letting the thickness go to zero gives, with $\hat{\mathbf n}$ the unit normal from side 1 to side 2,

$$
E_2^{\perp} - E_1^{\perp} = \frac{\sigma}{\varepsilon_0}, \qquad \mathbf E_2^{\parallel} = \mathbf E_1^{\parallel}, \qquad V_2 = V_1.
$$ {#eq-jump}

In terms of the potential the first condition reads $\partial V_2/\partial n - \partial V_1/\partial n = -\sigma/\varepsilon_0$. A conductor in equilibrium has $\mathbf E = \mathbf 0$ inside, so its whole volume is one equipotential, the field just outside is normal to its surface, and the induced surface charge is

$$
\sigma = -\varepsilon_0 \frac{\partial V}{\partial n},
$$ {#eq-sigma-cond}

with $\hat{\mathbf n}$ the outward normal of the conductor. Every problem in this chapter ends with this formula.

::: example A uniformly charged slab between earthed plates {#ex-slab}
Two large parallel metal plates at $x = 0$ and $x = d$ are both earthed. The space between them is filled with a uniform charge density $\rho$. Find $V(x)$, the maximum potential, and the charge induced on each plate per unit area. Evaluate for $d = 1.00\,\mathrm{cm}$ and $\rho = 1.00\times10^{-5}\,\mathrm{C/m^3}$.
::: solution
The plates are large, so $V$ depends on $x$ only and [[#eq-poisson]] becomes the ordinary differential equation $V'' = -\rho/\varepsilon_0$. Integrating twice,

$$
V(x) = -\frac{\rho}{2\varepsilon_0}x^2 + C_1 x + C_2 .
$$

The conditions $V(0) = 0$ and $V(d) = 0$ give $C_2 = 0$ and $C_1 = \rho d/(2\varepsilon_0)$, so

$$
V(x) = \frac{\rho}{2\varepsilon_0}\,x(d - x).
$$

The maximum is at the midplane, $V(d/2) = \rho d^2/(8\varepsilon_0)$. With the numbers,

$$
V_{\max} = \frac{(1.00\times10^{-5})(1.00\times10^{-2})^2}{8\,(8.854\times10^{-12})} = 14.1\,\mathrm{V}.
$$

At the plate $x = 0$ the outward normal of the conductor points in $+x$, so [[#eq-sigma-cond]] gives $\sigma = -\varepsilon_0 V'(0) = -\rho d/2$. At $x = d$ the outward normal points in $-x$, and $\sigma = +\varepsilon_0 V'(d) = -\rho d/2$. Together the plates cancel the slab's charge $\rho d$ per unit area, so the field outside is zero. Numerically, $\sigma = -5.00\times10^{-8}\,\mathrm{C/m^2}$ on each plate.
:::
:::

### The mean-value property {#mean-value}

Harmonic functions have a remarkable rigidity, which is the root of everything that follows.

::: theorem Mean-value property {#thm-mean}
Let $V$ be harmonic on a region containing the closed ball of radius $R$ centred at $\mathbf r_0$. Then $V(\mathbf r_0)$ equals the average of $V$ over the sphere of radius $R$ about $\mathbf r_0$:

$$
V(\mathbf r_0) = \frac{1}{4\pi R^2}\oint_{\lvert\mathbf r-\mathbf r_0\rvert = R} V\,\dd a .
$$ {#eq-mean}
:::

::: proof
Write the average over the sphere of radius $s$ as $\bar V(s) = \frac{1}{4\pi}\oint V(\mathbf r_0 + s\hat{\mathbf u})\,\dd\Omega$, an integral over directions $\hat{\mathbf u}$ that no longer depends on $s$ through its domain. Differentiating under the integral,

$$
\deriv{\bar V}{s} = \frac{1}{4\pi}\oint \hat{\mathbf u}\cdot\nabla V\,\dd\Omega = \frac{1}{4\pi s^2}\oint_{\text{sphere } s} \nabla V\cdot\dd\mathbf a = \frac{1}{4\pi s^2}\int_{\text{ball } s} \nabla^2 V\,\dd\tau = 0,
$$

by the divergence theorem and [[#eq-laplace]]. So $\bar V(s)$ is constant for $0 < s \le R$. As $s \to 0$, continuity of $V$ gives $\bar V(s) \to V(\mathbf r_0)$. Hence $\bar V(R) = V(\mathbf r_0)$.
:::

::: corollary Earnshaw's theorem {#cor-earnshaw}
A harmonic function has no strict local maximum or minimum inside its region. Consequently a point charge cannot rest in stable equilibrium at a point where the electrostatic field is produced only by other, fixed charges.
:::

::: proof
If $V$ had a strict local maximum at $\mathbf r_0$, then on a small sphere about $\mathbf r_0$ every value would be less than $V(\mathbf r_0)$, and so would their average, contradicting [[#thm-mean]]. The same argument rules out a minimum. A test charge $q$ at $\mathbf r_0$ has potential energy $qV$, and the other charges are outside a small ball about $\mathbf r_0$, so $V$ is harmonic there. Stable equilibrium requires a strict local minimum of $qV$, which [[#thm-mean]] forbids for either sign of $q$.
:::

Earnshaw's theorem (1842) explains why ions are trapped with oscillating fields (the Paul trap) or with a magnetic field added (the Penning trap) and never with static electric fields alone.

## The uniqueness theorems {#uniqueness}

A method of solving Poisson's equation is useful only if the answer it produces is *the* answer. The following theorem says that boundary data of the right kind fix the solution completely, so that any function satisfying the equation and the boundary conditions, however it was found, is correct.

::: theorem Uniqueness for Poisson's equation {#thm-unique}
Let $\Omega$ be a connected region bounded by closed surfaces $S = S_1\cup\dots\cup S_N$. Let $V_1$ and $V_2$ be twice continuously differentiable in $\Omega$, with first derivatives continuous up to $S$, and suppose both satisfy $\nabla^2 V = -\rho/\varepsilon_0$ with the same $\rho$. Suppose that on each $S_i$ either $V_1 = V_2$ (Dirichlet data) or $\partial V_1/\partial n = \partial V_2/\partial n$ (Neumann data). Then $V_1 = V_2$ throughout $\Omega$, except that if Neumann data are given on every $S_i$, then $V_1 - V_2$ is a constant and the field $\mathbf E$ is still unique. If $\Omega$ extends to infinity, the same holds provided both potentials vanish there at least as fast as $1/r$, with gradients falling at least as fast as $1/r^2$.
:::

::: proof
Let $W = V_1 - V_2$. Subtracting the two Poisson equations, $\nabla^2 W = 0$ in $\Omega$. The product rule gives

$$
\nabla\cdot(W\nabla W) = \nabla W\cdot\nabla W + W\,\nabla^2 W = \lvert\nabla W\rvert^2 .
$$

Integrate over $\Omega$ and apply the divergence theorem, with $\hat{\mathbf n}$ the outward normal of $\Omega$:

$$
\int_\Omega \lvert\nabla W\rvert^2\,\dd\tau = \oint_S W\,\frac{\partial W}{\partial n}\,\dd a = \sum_{i=1}^{N} \oint_{S_i} W\,\frac{\partial W}{\partial n}\,\dd a .
$$

On each $S_i$ either $W = 0$ or $\partial W/\partial n = 0$, so every surface integral vanishes. For an unbounded region, enclose everything in a large sphere of radius $L$; on it $W = O(1/L)$ and $\partial W/\partial n = O(1/L^2)$ while the area is $4\pi L^2$, so its contribution is $O(1/L) \to 0$. Hence $\int_\Omega\lvert\nabla W\rvert^2\,\dd\tau = 0$. The integrand is continuous and non-negative, so $\nabla W = \mathbf 0$ everywhere in $\Omega$, and since $\Omega$ is connected $W$ is a constant. If Dirichlet data are given on some $S_i$, or the region is unbounded with $W\to0$, the constant is zero. Otherwise it is undetermined, but $\mathbf E_1 - \mathbf E_2 = -\nabla W = \mathbf 0$ regardless.
:::

A first consequence: inside an empty cavity in a conductor, $V$ is harmonic and equals the conductor's constant potential on the wall, so by [[#thm-unique]] it is that constant throughout and $\mathbf E = \mathbf 0$, whatever charges are outside. This is the Faraday cage; the argument is static, and fast-changing fields are a different matter ([[electrodynamics/waves-in-media]]).

The theorem covers conductors held at given voltages by batteries: their surfaces carry Dirichlet data. Isolated conductors are different. Their potential is not given; their total charge is. A second form of the theorem handles that.

::: corollary Uniqueness with given conductor charges {#cor-unique-charge}
Let the region $\Omega$ outside conductors $C_1,\dots,C_N$ contain a given charge density $\rho$, let each conductor carry a given total charge $Q_i$, and let $V \to 0$ at infinity as in [[#thm-unique]]. Then the electric field in $\Omega$ is unique.
:::

::: proof
Let $\mathbf E_1, \mathbf E_2$ be two solutions with potentials $V_1, V_2$, and let $W = V_1 - V_2$. Each conductor is an equipotential in either solution, so $W$ takes a constant value $W_i$ on the surface $S_i$ of $C_i$. With the normal of $\Omega$ pointing into the conductor, the calculation of [[#thm-unique]] gives

$$
\int_\Omega \lvert\nabla W\rvert^2\,\dd\tau = \sum_i W_i \oint_{S_i}\frac{\partial W}{\partial n}\,\dd a .
$$

By Gauss's law applied to a surface hugging $C_i$, $\oint_{S_i}\mathbf E\cdot\hat{\mathbf n}_{\mathrm{out}}\,\dd a = Q_i/\varepsilon_0$ for either solution, where $\hat{\mathbf n}_{\mathrm{out}}$ points out of the conductor, opposite to the normal of $\Omega$. Since $-\nabla W = \mathbf E_1 - \mathbf E_2$, the derivative along the normal of $\Omega$ is $\partial W/\partial n = (\mathbf E_1 - \mathbf E_2)\cdot\hat{\mathbf n}_{\mathrm{out}}$, and its integral over $S_i$ is $(Q_i - Q_i)/\varepsilon_0 = 0$. The surface at infinity contributes nothing, as before. Every term vanishes, so $\nabla W = \mathbf 0$ and $\mathbf E_1 = \mathbf E_2$.
:::

::: quiz
A charge-free region is bounded by two closed surfaces. On the outer one $V$ is specified; on the inner one nothing is given. Is the potential in the region determined?
- [ ] Yes, because one boundary condition is enough for a second-order equation.
- [x] No: data are required on every part of the boundary, and different values on the inner surface give different solutions.
- [ ] Yes, but only up to an additive constant.
- [ ] No, because Laplace's equation has no solutions with Dirichlet data.
::: solution
Between concentric spheres of radii $a<b$ with $V(b) = 0$, every function $V = C(1/r - 1/b)$ is harmonic and satisfies the outer condition, for any $C$. Fixing $V$, $\partial V/\partial n$, or (for a conductor) the total charge on the inner sphere picks one value of $C$.
:::
:::

## The method of images {#images}

Uniqueness licenses guessing. Any function that satisfies Poisson's equation in the region and the boundary conditions on its edges is the solution. The **method of images** guesses by placing fictitious charges *outside* the region, where they do not disturb Poisson's equation inside, with sizes and positions chosen to make the conductor surfaces equipotentials.

### The infinite earthed plane {#image-plane}

A point charge $q$ sits at height $d$ above the earthed conducting plane $z = 0$. The region is $z > 0$, with $V = 0$ on the plane and at infinity. Put an image charge $-q$ at $(0,0,-d)$. For $z>0$,

$$
V(x,y,z) = \frac{q}{4\pi\varepsilon_0}\left[\frac{1}{\sqrt{x^2+y^2+(z-d)^2}} - \frac{1}{\sqrt{x^2+y^2+(z+d)^2}}\right].
$$ {#eq-image-plane}

The image lies outside the region, so $\nabla^2 V = -\rho/\varepsilon_0$ holds there with only the real charge as source. On $z = 0$ the two distances are equal and $V = 0$, and $V \to 0$ at infinity. By [[#thm-unique]] this is the potential. The induced surface charge follows from [[#eq-sigma-cond]] with the outward normal $+\hat{\mathbf z}$:

$$
\sigma(s) = -\varepsilon_0\frac{\partial V}{\partial z}\bigg|_{z=0} = -\frac{q\,d}{2\pi\,(s^2+d^2)^{3/2}}, \qquad s^2 = x^2+y^2 .
$$

Since $\int_0^\infty s\,\dd s/(s^2+d^2)^{3/2} = 1/d$, the total induced charge is $\int_0^\infty\sigma\,2\pi s\,\dd s = -q$, equal to the image charge. The force on $q$ is that of the image, $q^2/(4\pi\varepsilon_0(2d)^2)$ towards the plane, because the field in $z>0$ is the field of the two point charges.

::: warning The image is not real, and neither is its energy
The image charge reproduces the field only in the physical region. Below the plane the true field is zero, not the field of $-q$. One consequence catches many students: the work needed to bring $q$ in from infinity to height $d$ is $-q^2/(4\pi\varepsilon_0\cdot 4d)$, *half* the interaction energy $-q^2/(4\pi\varepsilon_0\cdot 2d)$ of two real charges $q$ and $-q$ at separation $2d$. Integrate the force $q^2/(16\pi\varepsilon_0 z^2)$ from $\infty$ to $d$ to see it; the factor arises because the image moves as $q$ moves, and the field energy exists only on one side of the plane.
:::

### The earthed sphere {#image-sphere}

The sphere is the case that answers the opening question, and it is not obvious that a single image works.

::: theorem Image in an earthed sphere {#thm-sphere-image}
A point charge $q$ is at distance $a$ from the centre of an earthed conducting sphere of radius $R < a$. Outside the sphere the potential is that of $q$ together with an image charge

$$
q' = -\frac{R}{a}\,q \quad\text{at distance}\quad b = \frac{R^2}{a}
$$ {#eq-sphere-image}

from the centre, on the line joining the centre to $q$. The total charge induced on the sphere is $q'$.
:::

::: proof
Put the centre at the origin and $q$ at $a\hat{\mathbf z}$, the image at $b\hat{\mathbf z}$ with $b = R^2/a < R$. For a point on the sphere, $\mathbf r = R\hat{\mathbf r}$ with polar angle $\theta$,

$$
\lvert\mathbf r - b\hat{\mathbf z}\rvert^2 = R^2 - 2Rb\cos\theta + b^2 = R^2 - \frac{2R^3}{a}\cos\theta + \frac{R^4}{a^2} = \frac{R^2}{a^2}\left(a^2 - 2aR\cos\theta + R^2\right) = \frac{R^2}{a^2}\lvert\mathbf r - a\hat{\mathbf z}\rvert^2 .
$$

Every point of the sphere is therefore $R/a$ times as far from the image point as from $q$. With $q' = -qR/a$,

$$
\frac{q}{\lvert\mathbf r-a\hat{\mathbf z}\rvert} + \frac{q'}{\lvert\mathbf r-b\hat{\mathbf z}\rvert} = \frac{q}{\lvert\mathbf r-a\hat{\mathbf z}\rvert} - \frac{qR}{a}\cdot\frac{a}{R\,\lvert\mathbf r-a\hat{\mathbf z}\rvert} = 0
$$

on the sphere. The image lies inside the sphere, outside the region $r > R$, and the potential tends to zero at infinity. By [[#thm-unique]] the potential of $q$ and $q'$ is the solution for $r > R$. For the induced charge, apply Gauss's law to a sphere of radius slightly greater than $R$: in the physical problem it encloses only the induced charge; in the image problem the same field gives flux $q'/\varepsilon_0$. The fields agree on that surface, so the induced charge is $q'$.
:::

The set of points whose distances to two fixed points are in a fixed ratio is a sphere, the *sphere of Apollonius*.

::: example The force on a charge near an earthed sphere {#ex-sphere-force}
A charge $q = 1.00\,\mathrm{nC}$ is $a = 10.0\,\mathrm{cm}$ from the centre of an earthed sphere of radius $R = 5.00\,\mathrm{cm}$. Find the force on it. Then find the force if the sphere is instead isolated and uncharged.
::: solution
By [[#eq-sphere-image]], $q' = -(5.00/10.0)(1.00\,\mathrm{nC}) = -0.500\,\mathrm{nC}$, at $b = R^2/a = 2.50\,\mathrm{cm}$ from the centre. The separation of $q$ and $q'$ is $a - b = 7.50\,\mathrm{cm}$, so the force is

$$
F = \frac{1}{4\pi\varepsilon_0}\frac{q\,q'}{(a-b)^2} = (8.988\times10^{9})\frac{(1.00\times10^{-9})(-0.500\times10^{-9})}{(0.0750)^2} = -7.99\times10^{-7}\,\mathrm{N},
$$

an attraction of $0.799\,\mu\mathrm{N}$. This is the opening question.

If the sphere is isolated and neutral, its total charge must be zero and it must be an equipotential, though not necessarily at zero. Add a second image $q'' = -q' = +0.500\,\mathrm{nC}$ at the centre. A point charge at the centre adds a constant on the sphere's surface, so the sphere remains an equipotential, and the total charge enclosed is now zero. By [[#cor-unique-charge]] this is the solution. The force is

$$
F = \frac{q}{4\pi\varepsilon_0}\left[\frac{q'}{(a-b)^2} + \frac{-q'}{a^2}\right] = (8.988)\left[\frac{-0.500}{0.0750^2} + \frac{0.500}{0.100^2}\right]\times10^{-9}\,\mathrm{N} = -3.50\times10^{-7}\,\mathrm{N}.
$$

A neutral sphere still attracts the charge, because the induced negative charge sits nearer to $q$ than the compensating positive charge, but less than half as strongly. At large $a$ the attraction falls as $1/a^5$, the signature of an induced dipole.
:::
:::

::: widget charges
charges: 1, 2, 0; -0.5, 0.5, 0
caption: The real charge $q = 1$ at distance $a = 2$ from the centre and its image $q' = -\tfrac12$ at $b = \tfrac12$, which makes the circle of radius $R = 1$ about the origin an equipotential. Look along that circle (it passes through $x = \pm1$ and $y = \pm1$): every arrow crosses it at right angles, as the field must at the surface of a conductor. Outside the circle the arrows are the true field. Inside, they are the field of the fictitious pair and mean nothing; the true field in the metal is zero.
:::

## Separation of variables {#separation}

Images work for planes, spheres and a few other shapes. A systematic method for boundaries that are coordinate surfaces is separation of variables: look for solutions of Laplace's equation that are products of functions of one coordinate each, then build the solution as a series of such products, fitting the coefficients to the boundary data.

### Cartesian coordinates {#cartesian}

Consider an infinitely long slot: two earthed plates $y = 0$ and $y = a$, extending from $x = 0$ to $x = \infty$, closed at $x = 0$ by a strip held at potential $V_0$ and insulated from the plates. Nothing depends on $z$. We want $V(x,y)$ in the slot, with $V \to 0$ as $x \to \infty$.

Try $V = X(x)Y(y)$. Laplace's equation divided by $XY$ is

$$
\frac{X''}{X} + \frac{Y''}{Y} = 0 .
$$

The first term depends only on $x$, the second only on $y$, so each is a constant: $X''/X = k^2$, $Y''/Y = -k^2$. The conditions $Y(0) = Y(a) = 0$ force $Y = \sin(n\pi y/a)$ with $k = n\pi/a$, $n = 1,2,\dots$, and decay as $x\to\infty$ selects $X = e^{-n\pi x/a}$. Linearity allows any superposition,

$$
V(x,y) = \sum_{n=1}^\infty C_n\, e^{-n\pi x/a}\sin\frac{n\pi y}{a}.
$$

The last condition, $V(0,y) = V_0$ for $0<y<a$, is a Fourier sine series for the constant $V_0$. Multiplying by $\sin(m\pi y/a)$ and integrating over $0<y<a$, with $\int_0^a \sin(n\pi y/a)\sin(m\pi y/a)\,\dd y = \tfrac a2\delta_{nm}$,

$$
C_n = \frac{2}{a}\int_0^a V_0\sin\frac{n\pi y}{a}\,\dd y = \frac{2V_0}{n\pi}\bigl(1 - \cos n\pi\bigr) = \begin{cases} 4V_0/(n\pi), & n \text{ odd},\\ 0, & n \text{ even}.\end{cases}
$$

So

$$
V(x,y) = \frac{4V_0}{\pi}\sum_{n\ \mathrm{odd}}\frac{1}{n}\,e^{-n\pi x/a}\sin\frac{n\pi y}{a} .
$$ {#eq-slot}

Each term is harmonic, the series converges for $x > 0$ (the exponentials make it converge very fast), and it meets every boundary condition. By [[#thm-unique]] it is the answer. The sum can even be done in closed form, $V = (2V_0/\pi)\arctan\bigl[\sin(\pi y/a)/\sinh(\pi x/a)\bigr]$, but the series is the method that generalises.

::: widget plot
f: sum(4/((2*k-1)*pi)*exp(-(2*k-1)*pi*s)*sin((2*k-1)*pi*x), k, 1, N)
x: 0, 1
y: -0.1, 1.3
sliders: N=1:1:30:1; s=0:0:1:0.02
labels: V/V₀ across the slot
caption: The partial sum of [[#eq-slot]] with $N$ odd terms, plotted against $y/a$ across the slot at depth $s = x/a$. Start at $s = 0$, the end strip: with few terms the curve wobbles about $1$, and as you raise $N$ it flattens but keeps an overshoot of about $18\%$ near the corners (the Gibbs phenomenon), because a sine series is trying to reproduce a jump to zero at the plates. Now move $s$ up to $0.1$: the wobbles vanish, and by $s = 0.5$ a single term is indistinguishable from the sum. Higher harmonics decay like $e^{-n\pi x/a}$, so the field forgets the detail of the boundary within about one slot width.
:::

::: example How fast the slot forgets its boundary {#ex-slot}
Using [[#eq-slot]], find $V/V_0$ on the centre line $y = a/2$ at $x = a/2$ and at $x = a$, and compare with the first term alone.
::: solution
On the centre line $\sin(n\pi/2) = +1, -1, +1,\dots$ for $n = 1, 3, 5, \dots$. At $x = a/2$,

$$
\frac{V}{V_0} = \frac{4}{\pi}\left[e^{-\pi/2} - \frac{1}{3}e^{-3\pi/2} + \frac{1}{5}e^{-5\pi/2} - \cdots\right] = \frac{4}{\pi}\bigl[0.20788 - 0.00299 + 0.00008 - \cdots\bigr] = 0.2610 .
$$

The first term alone gives $0.2647$, $1.4\%$ high. At $x = a$,

$$
\frac{V}{V_0} = \frac{4}{\pi}\left[e^{-\pi} - \frac13 e^{-3\pi} + \cdots\right] = 0.05499,
$$

and the first term gives $0.05502$, an error of $0.06\%$. The closed form gives the same values. One slot width in, only the lowest mode remains.
:::
:::

### Spherical coordinates and Legendre polynomials {#spherical}

When the boundaries are spheres and the problem is symmetric about the $z$-axis, $V$ depends on $r$ and the polar angle $\theta$ only. Laplace's equation in spherical coordinates is then

$$
\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial V}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\,\frac{\partial V}{\partial\theta}\right) = 0 .
$$

Put $V = R(r)\Theta(\theta)$, multiply by $r^2/(R\Theta)$, and separate: $\frac{1}{R}(r^2R')' = l(l+1)$ and $\frac{1}{\Theta\sin\theta}(\sin\theta\,\Theta')' = -l(l+1)$, where writing the constant as $l(l+1)$ is a convenience. The radial equation is solved by powers: $r^2R'' + 2rR' = l(l+1)R$ has solutions $r^l$ and $r^{-(l+1)}$. The angular equation, in the variable $x = \cos\theta$, is Legendre's equation $\bigl((1-x^2)\Theta'\bigr)' + l(l+1)\Theta = 0$, whose solutions are finite at both poles $x = \pm1$ only when $l$ is a non-negative integer, and are then the **Legendre polynomials** $P_l(\cos\theta)$, given by Rodrigues' formula $P_l(x) = \frac{1}{2^l l!}\frac{\dd^l}{\dd x^l}(x^2-1)^l$:

$$
P_0 = 1,\quad P_1 = x,\quad P_2 = \tfrac12(3x^2-1),\quad P_3 = \tfrac12(5x^3-3x).
$$

The series method behind these is in [[math-methods/odes]]. They are orthogonal, $\int_{-1}^{1}P_l(x)P_{l'}(x)\,\dd x = \frac{2}{2l+1}\delta_{ll'}$, and complete on $[-1,1]$. The general azimuthally symmetric solution of Laplace's equation is therefore

$$
V(r,\theta) = \sum_{l=0}^\infty\left(A_l\,r^l + \frac{B_l}{r^{l+1}}\right)P_l(\cos\theta).
$$ {#eq-legendre-general}

Inside a sphere, regularity at the origin kills the $B_l$; outside, decay at infinity kills the $A_l$ (except for terms imposed by an external field).

::: example A conducting sphere in a uniform field {#ex-sphere-field}
An uncharged conducting sphere of radius $R$ is placed in a uniform field $\mathbf E_0 = E_0\hat{\mathbf z}$. Find the potential outside, the induced surface charge, and the induced dipole moment.
::: solution
Choose the zero of potential on the equatorial plane of the undisturbed field, so far from the sphere $V \to -E_0 z = -E_0 r\cos\theta$. By symmetry the sphere sits at the potential of its equatorial plane, $V = 0$. The boundary data are therefore $V(R,\theta) = 0$ and $V \to -E_0r\cos\theta$ as $r \to\infty$.

In [[#eq-legendre-general]] the condition at infinity allows only $A_1 = -E_0$ among the $A_l$. On $r = R$,

$$
\sum_l\left(A_lR^l + \frac{B_l}{R^{l+1}}\right)P_l(\cos\theta) = 0 \quad\text{for all }\theta,
$$

and by orthogonality each coefficient vanishes: $B_l = -A_lR^{2l+1}$. Only $l = 1$ survives, with $B_1 = E_0R^3$:

$$
V(r,\theta) = -E_0\left(r - \frac{R^3}{r^2}\right)\cos\theta, \qquad r \ge R .
$$

The induced charge, from [[#eq-sigma-cond]] with outward normal $\hat{\mathbf r}$, is

$$
\sigma(\theta) = -\varepsilon_0\frac{\partial V}{\partial r}\bigg|_{r=R} = \varepsilon_0E_0\left(1 + \frac{2R^3}{R^3}\right)\cos\theta = 3\varepsilon_0E_0\cos\theta .
$$

Its integral over the sphere is zero, as it must be. The added term $E_0R^3\cos\theta/r^2$ is the potential of a point dipole [[#eq-dipole]] with $p/(4\pi\varepsilon_0) = E_0R^3$, so

$$
\mathbf p = 4\pi\varepsilon_0R^3\,\mathbf E_0 .
$$

A conducting sphere has polarisability $4\pi\varepsilon_0R^3$, proportional to its volume. For $R = 1.00\,\mathrm{cm}$ in $E_0 = 1.00\times10^5\,\mathrm{V/m}$, $p = 1.11\times10^{-11}\,\mathrm{C\,m}$. The field at the poles is $3E_0$, three times the applied field.
:::
:::

## The multipole expansion {#multipole}

Far from a localised charge distribution, the details of the distribution matter less and less. The multipole expansion makes that precise: it writes the exterior potential as a series in $1/r$ whose coefficients are moments of the charge.

Let $\rho$ vanish outside a sphere of radius $r_{\max}$ about the origin, and let $r > r_{\max}$. For a source point $\mathbf r'$ at angle $\alpha$ to $\mathbf r$, the generating function of the Legendre polynomials, $(1 - 2xt + t^2)^{-1/2} = \sum_l P_l(x)t^l$ for $\lvert t\rvert<1$, gives with $t = r'/r$ and $x = \cos\alpha$

$$
\frac{1}{\lvert\mathbf r-\mathbf r'\rvert} = \frac{1}{r}\left(1 - 2\frac{r'}{r}\cos\alpha + \frac{r'^2}{r^2}\right)^{-1/2} = \sum_{l=0}^\infty\frac{r'^l}{r^{l+1}}P_l(\cos\alpha).
$$

Substituting into [[#eq-coulomb-int]] and exchanging sum and integral, which the uniform convergence for $r'\le r_{\max}<r$ permits,

$$
V(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\sum_{l=0}^\infty\frac{1}{r^{l+1}}\int (r')^l P_l(\cos\alpha)\,\rho(\mathbf r')\,\dd\tau' .
$$ {#eq-multipole}

The $l = 0$ term is the **monopole** potential $Q/(4\pi\varepsilon_0 r)$, with $Q = \int\rho\,\dd\tau'$ the total charge. For $l = 1$, $r'\cos\alpha = \hat{\mathbf r}\cdot\mathbf r'$, and the integral is $\hat{\mathbf r}\cdot\mathbf p$.

::: definition Electric dipole moment and dipole potential {#def-dipole}
The **electric dipole moment** of a charge distribution about the origin is $\mathbf p = \int\mathbf r'\rho(\mathbf r')\,\dd\tau'$, or $\mathbf p = \sum_i q_i\mathbf r_i$ for point charges. The **dipole potential** is

$$
V_{\mathrm{dip}}(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\frac{\mathbf p\cdot\hat{\mathbf r}}{r^2} .
$$ {#eq-dipole}
:::

The dipole field follows by differentiation. With $\mathbf p = p\hat{\mathbf z}$, $V = p\cos\theta/(4\pi\varepsilon_0r^2)$, and $E_r = -\partial_r V = 2p\cos\theta/(4\pi\varepsilon_0r^3)$, $E_\theta = -r^{-1}\partial_\theta V = p\sin\theta/(4\pi\varepsilon_0r^3)$. Since $\mathbf p = p(\cos\theta\,\hat{\mathbf r} - \sin\theta\,\hat{\boldsymbol\theta})$, the two components assemble into the coordinate-free form

$$
\mathbf E_{\mathrm{dip}}(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\frac{3(\mathbf p\cdot\hat{\mathbf r})\hat{\mathbf r} - \mathbf p}{r^3} .
$$ {#eq-dipole-field}

On the axis the field is $2p/(4\pi\varepsilon_0r^3)$ along $\mathbf p$; in the equatorial plane it is $p/(4\pi\varepsilon_0r^3)$ opposite to $\mathbf p$. The quadrupole term $l = 2$ can be written $\frac{1}{4\pi\varepsilon_0}\frac{1}{2r^3}\sum_{ij}Q_{ij}\hat r_i\hat r_j$ with the traceless tensor $Q_{ij} = \int(3x_i'x_j' - r'^2\delta_{ij})\rho\,\dd\tau'$, and each higher term falls by another power of $r$.

::: proposition When the dipole moment depends on the origin {#prop-origin}
Under a shift of origin by $\mathbf d$, the dipole moment changes to $\mathbf p - Q\mathbf d$. It is therefore independent of the origin if and only if the total charge $Q$ is zero.
:::

::: proof
With the new origin at $\mathbf d$, source positions become $\mathbf r' - \mathbf d$, and $\int(\mathbf r'-\mathbf d)\rho\,\dd\tau' = \mathbf p - \mathbf d\int\rho\,\dd\tau' = \mathbf p - Q\mathbf d$. This equals $\mathbf p$ for every $\mathbf d$ exactly when $Q = 0$.
:::

In general the lowest non-vanishing moment is origin-independent and the higher ones are not.

::: example A linear quadrupole {#ex-quadrupole}
Charges $+q$ at $z = \pm d$ and $-2q$ at the origin. Find the leading term of the potential at $r\gg d$.
::: solution
The total charge and the dipole moment $\sum q_iz_i = qd - qd = 0$ both vanish, so the first two terms of [[#eq-multipole]] are zero. For point charges the $l$-th term is $\frac{1}{4\pi\varepsilon_0r^{l+1}}\sum_iq_ir_i^lP_l(\cos\alpha_i)$. The charge at the origin has $r_i = 0$ and contributes nothing for $l\ge1$. The two outer charges have $\cos\alpha = \cos\theta$ and $\cos\alpha = -\cos\theta$, and $P_2$ is even, so

$$
V \approx \frac{1}{4\pi\varepsilon_0}\frac{2qd^2P_2(\cos\theta)}{r^3} = \frac{1}{4\pi\varepsilon_0}\frac{qd^2(3\cos^2\theta - 1)}{r^3}.
$$

It falls as $1/r^3$, vanishes on the cones $\cos^2\theta = 1/3$ ($\theta = 54.7^\circ$ and $125.3^\circ$), and is positive along the axis, where the like charges $+q$ are nearer.
:::
:::

::: quiz
A distribution has total charge $Q = 0$ and dipole moment $\mathbf p\ne\mathbf 0$ about the origin. You move the origin by $\mathbf d$. Which statements are correct?
- [x] The dipole moment is unchanged.
- [ ] The dipole moment becomes $\mathbf p - Q\mathbf d$, which is different from $\mathbf p$.
- [x] The quadrupole moment may change.
- [ ] The far potential now falls as $1/r$.
::: solution
By [[#prop-origin]] the shift changes $\mathbf p$ by $-Q\mathbf d = \mathbf 0$, so the lowest non-zero moment is intrinsic. The next moment, the quadrupole, picks up terms proportional to $\mathbf p$ and $\mathbf d$, so it does depend on the origin. The monopole is zero, so there is no $1/r$ term whatever the origin.
:::
:::

## Dielectrics {#dielectrics}

In an insulator the electrons are bound to their molecules, but an applied field displaces them slightly, or turns molecules that already have a dipole moment. Matter in a field becomes a continuum of tiny dipoles.

::: definition Polarisation {#def-polarisation}
The **polarisation** $\mathbf P(\mathbf r)$ of a material is its electric dipole moment per unit volume, averaged over a region large compared with a molecule and small compared with the scale on which the fields vary. Its SI unit is $\mathrm{C/m^2}$.
:::

### Bound charge {#bound}

The potential of the polarised body is the superposition of dipole potentials [[#eq-dipole]], with $\mathbf p$ replaced by $\mathbf P\,\dd\tau'$:

$$
V(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\int\frac{\mathbf P(\mathbf r')\cdot(\mathbf r-\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert^3}\,\dd\tau' = \frac{1}{4\pi\varepsilon_0}\int\mathbf P\cdot\nabla'\frac{1}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' ,
$$

using $\nabla'(1/\lvert\mathbf r-\mathbf r'\rvert) = (\mathbf r-\mathbf r')/\lvert\mathbf r-\mathbf r'\rvert^3$. Integrate by parts with $\nabla'\cdot(f\mathbf P) = f\nabla'\cdot\mathbf P + \mathbf P\cdot\nabla' f$ and the divergence theorem over the body:

$$
V(\mathbf r) = \frac{1}{4\pi\varepsilon_0}\oint_S\frac{\mathbf P\cdot\hat{\mathbf n}'}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd a' + \frac{1}{4\pi\varepsilon_0}\int\frac{-\nabla'\cdot\mathbf P}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' .
$$

This is exactly the potential of a surface charge and a volume charge,

$$
\sigma_b = \mathbf P\cdot\hat{\mathbf n}, \qquad \rho_b = -\nabla\cdot\mathbf P ,
$$ {#eq-bound}

the **bound charges**. They are real charge: a uniformly polarised slab has uncancelled layers of opposite sign on its two faces, and where $\mathbf P$ is non-uniform more dipole ends enter a small volume than leave it.

### The displacement field {#displacement}

Gauss's law counts all charge, $\varepsilon_0\nabla\cdot\mathbf E = \rho_f + \rho_b = \rho_f - \nabla\cdot\mathbf P$, where $\rho_f$ is the **free charge** we control. Moving $\mathbf P$ to the left defines a field whose divergence is the free charge alone.

::: definition Displacement field and linear dielectrics {#def-D}
The **electric displacement** is $\mathbf D = \varepsilon_0\mathbf E + \mathbf P$. It satisfies

$$
\nabla\cdot\mathbf D = \rho_f, \qquad \oint\mathbf D\cdot\dd\mathbf a = Q_{f,\mathrm{enc}} .
$$ {#eq-gauss-D}

A material is a **linear dielectric** if $\mathbf P = \varepsilon_0\chi_e\mathbf E$, with **susceptibility** $\chi_e$. Then $\mathbf D = \varepsilon\mathbf E$ with **permittivity** $\varepsilon = \varepsilon_0(1+\chi_e) = \varepsilon_0\varepsilon_r$, where $\varepsilon_r$ is the **relative permittivity** (dielectric constant).
:::

Across an interface carrying free surface charge $\sigma_f$, the pillbox and loop arguments now give

$$
D_2^\perp - D_1^\perp = \sigma_f, \qquad \mathbf E_2^\parallel = \mathbf E_1^\parallel .
$$ {#eq-bc-D}

Inside a homogeneous linear dielectric with no free charge, $\nabla\cdot\mathbf E = 0$, so $V$ is again harmonic and the whole of this chapter applies, region by region, with [[#eq-bc-D]] stitching the regions together.

::: warning $\mathbf D$ is not "the field of the free charge"
Equation [[#eq-gauss-D]] looks like Gauss's law with $\varepsilon_0$ and the bound charge removed, and it tempts one to write $\mathbf D = \frac{1}{4\pi}\int\rho_f(\mathbf r-\mathbf r')/\lvert\mathbf r-\mathbf r'\rvert^3\,\dd\tau'$. That is false in general, because a vector field is fixed by its divergence *and* its curl, and $\nabla\times\mathbf D = \nabla\times\mathbf P$ need not vanish. A uniformly polarised bar electret has no free charge, yet $\mathbf D \neq \mathbf 0$ near its ends. Gauss's law for $\mathbf D$ is useful only when symmetry, or a region uniformly filled with one linear dielectric, disposes of the curl.
:::

::: example A dielectric sphere in a uniform field {#ex-dielectric-sphere}
A sphere of radius $R$ and relative permittivity $\varepsilon_r$, with no free charge, is placed in a uniform field $E_0\hat{\mathbf z}$. Find the field inside it. Evaluate the ratio $E_{\mathrm{in}}/E_0$ for $\varepsilon_r = 5$.
::: solution
Inside and outside, $V$ is harmonic. By [[#eq-legendre-general]], keep the terms allowed by regularity at the centre and the behaviour at infinity. Because the applied potential is pure $l = 1$, try

$$
V_{\mathrm{in}} = A\,r\cos\theta, \qquad V_{\mathrm{out}} = -E_0r\cos\theta + \frac{B}{r^2}\cos\theta .
$$

If this guess satisfies every boundary condition, [[#thm-unique]] guarantees it is the solution. Continuity of $V$ at $r = R$ gives $AR = -E_0R + B/R^2$. With no free charge, $D^\perp$ is continuous: $\varepsilon_r\varepsilon_0\,\partial_rV_{\mathrm{in}} = \varepsilon_0\,\partial_rV_{\mathrm{out}}$ at $R$, that is

$$
\varepsilon_rA = -E_0 - \frac{2B}{R^3}.
$$

The first condition gives $B = R^3(A + E_0)$. Substituting, $\varepsilon_rA = -E_0 - 2A - 2E_0$, so $A = -3E_0/(\varepsilon_r+2)$. Inside, $V = Az$ and

$$
\mathbf E_{\mathrm{in}} = -\nabla(Az) = \frac{3}{\varepsilon_r+2}\,E_0\hat{\mathbf z},
$$

a uniform field, weaker than $E_0$. For $\varepsilon_r = 5$, $E_{\mathrm{in}}/E_0 = 3/7 = 0.429$. As $\varepsilon_r\to\infty$ the internal field vanishes and the conducting sphere of [[#ex-sphere-field]] is recovered. The reduction comes from the bound surface charge $\sigma_b = \varepsilon_0(\varepsilon_r - 1)E_{\mathrm{in}}\cos\theta$, whose field inside opposes $E_0$.
:::
:::

### From molecules to the dielectric constant {#clausius-mossotti}

A single molecule in a field $\mathbf E_{\mathrm{loc}}$ acquires a dipole moment $\mathbf p = \alpha\mathbf E_{\mathrm{loc}}$, where $\alpha$ is its **polarisability**. In a dilute gas $\mathbf E_{\mathrm{loc}}$ is the macroscopic field and $\varepsilon_r - 1 = N\alpha/\varepsilon_0$, with $N$ the number density. In a dense medium each molecule also feels its neighbours. Lorentz's estimate is that, for a cubic or isotropic arrangement, the local field is $\mathbf E + \mathbf P/(3\varepsilon_0)$: the macroscopic field plus the field at the centre of a spherical hole cut in uniformly polarised material. With $\mathbf P = N\alpha\mathbf E_{\mathrm{loc}}$ this gives the relation below (derivation in Jackson §4.5 or Griffiths §4.4).

::: proposition Clausius–Mossotti relation {#prop-cm}
For a linear isotropic dielectric of $N$ molecules per unit volume, each of polarisability $\alpha$, in which the local field is $\mathbf E + \mathbf P/(3\varepsilon_0)$,

$$
\frac{\varepsilon_r - 1}{\varepsilon_r + 2} = \frac{N\alpha}{3\varepsilon_0} .
$$ {#eq-cm}
:::

Polarisabilities are often quoted as a volume $\alpha/(4\pi\varepsilon_0)$, a few cubic ångströms for small atoms: atoms respond like conducting spheres of about their own size (compare $4\pi\varepsilon_0R^3$ in [[#ex-sphere-field]]). For liquid argon, with $\alpha/(4\pi\varepsilon_0) = 1.64\times10^{-30}\,\mathrm{m^3}$ and $N = 2.11\times10^{28}\,\mathrm{m^{-3}}$, the right side of [[#eq-cm]] is $0.145$ and $\varepsilon_r = 1.51$, close to the measured $1.50$; the dilute-gas formula would give $1.44$.

::: history From Coulomb to Kelvin
Charles-Augustin de Coulomb established the inverse-square law with his torsion balance in 1785. Laplace's equation appears in Pierre-Simon Laplace's work on the attraction of spheroids in the 1780s, where Adrien-Marie Legendre introduced his polynomials (published 1785). Siméon Denis Poisson added the source term in 1813 and applied potential theory to charges on conductors in 1812. George Green, a Nottingham miller, privately published his *Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism* in 1828, introducing the "potential function" and Green's identities; William Thomson (later Lord Kelvin) rescued it in the 1840s and developed the method of images between 1845 and 1848. Samuel Earnshaw proved his stability theorem in 1842. Michael Faraday coined "dielectric" and measured specific inductive capacities in 1837, and Ottaviano Mossotti (1850) and Rudolf Clausius (1879) linked the dielectric constant to molecular polarisability.
:::

## Where this leads {#leads}

The vector potential of [[electrodynamics/magnetostatics]] satisfies a Poisson equation for each Cartesian component and inherits [[#thm-unique]] and the multipole expansion, with no monopole term. In [[electrodynamics/maxwell-equations]] Poisson's equation becomes a wave equation, whose Green's-function solution, the retarded potential of [[electrodynamics/radiation]], is the time-dependent version of [[#eq-coulomb-int]]; the multipoles return there as dipole and quadrupole radiation. The molecular polarisability, a constant here, becomes a function of frequency in [[electrodynamics/waves-in-media]], which is the origin of dispersion.

::: summary
- Electrostatics is Poisson's equation $\nabla^2V = -\rho/\varepsilon_0$, or Laplace's equation where $\rho = 0$, together with boundary conditions; conductors are equipotentials, and the induced charge is $\sigma = -\varepsilon_0\,\partial V/\partial n$.
- Harmonic functions equal their averages over spheres; hence they have no interior extrema, and no static field can trap a charge stably (Earnshaw).
- Dirichlet or Neumann data on every boundary (or the total charge on each conductor) determine the field uniquely, so any solution that fits, however guessed, is the solution.
- Images: a charge $q$ at distance $a$ from an earthed sphere of radius $R$ has an image $-qR/a$ at $R^2/a$; for a plane the image is $-q$ at the mirror point.
- Separation of variables turns Laplace's equation into ordinary equations; boundary data fix the coefficients of Fourier or Legendre series, and higher modes decay within about one characteristic length.
- Far from a localised source $V$ is a sum of multipoles; the dipole term is $\mathbf p\cdot\hat{\mathbf r}/(4\pi\varepsilon_0r^2)$, and the lowest non-zero moment is independent of the origin.
- Polarisation produces bound charges $\sigma_b = \mathbf P\cdot\hat{\mathbf n}$, $\rho_b = -\nabla\cdot\mathbf P$; the displacement $\mathbf D = \varepsilon_0\mathbf E + \mathbf P$ has divergence $\rho_f$, $D^\perp$ jumps by $\sigma_f$ and $\mathbf E^\parallel$ is continuous.
:::

## Exercises {#exercises}

::: exercise The force from an earthed plane {level=1 check="9.99"}
A charge of $2.00\,\mathrm{nC}$ is held $3.00\,\mathrm{cm}$ above a large earthed metal plate. Find the magnitude of the force on it, in $\mu\mathrm{N}$.
::: solution
The image is $-2.00\,\mathrm{nC}$ at $3.00\,\mathrm{cm}$ below the plate, a separation $2d = 6.00\,\mathrm{cm}$. The force is that of the image:

$$
F = \frac{1}{4\pi\varepsilon_0}\frac{q^2}{(2d)^2} = (8.988\times10^9)\frac{(2.00\times10^{-9})^2}{(0.0600)^2} = 9.99\times10^{-6}\,\mathrm{N},
$$

that is $9.99\,\mu\mathrm{N}$, directed towards the plate.
:::
:::

::: exercise Locating the image {level=1 check="-2.4"}
An earthed sphere has radius $20.0\,\mathrm{cm}$. A charge $+6.00\,\mathrm{nC}$ is $50.0\,\mathrm{cm}$ from its centre. Find the image charge, in nC, and its position. What is the total charge on the sphere?
::: solution
By [[#eq-sphere-image]], $q' = -(R/a)q = -(0.200/0.500)(6.00\,\mathrm{nC}) = -2.40\,\mathrm{nC}$, at $b = R^2/a = 0.0400/0.500 = 0.0800\,\mathrm{m}$, that is $8.00\,\mathrm{cm}$ from the centre towards the charge. By [[#thm-sphere-image]] the induced charge on the sphere equals the image charge, $-2.40\,\mathrm{nC}$: the earth supplied it through the earthing wire.
:::
:::

::: exercise Field inside a dielectric sphere {level=1 check="0.5"}
A sphere with $\varepsilon_r = 4.00$ is placed in a uniform field $E_0$. Find $E_{\mathrm{in}}/E_0$, and the polarisation inside in terms of $\varepsilon_0E_0$.
::: solution
From [[#ex-dielectric-sphere]], $E_{\mathrm{in}}/E_0 = 3/(\varepsilon_r+2) = 3/6 = 0.500$. The polarisation is $P = \varepsilon_0\chi_eE_{\mathrm{in}} = \varepsilon_0(\varepsilon_r-1)E_{\mathrm{in}} = \varepsilon_0(3.00)(0.500E_0) = 1.50\,\varepsilon_0E_0$, uniform and parallel to $E_0$.
:::
:::

::: exercise Reading the charge from the potential {level=2}
In some region the potential is $V(r) = V_0\,a\,e^{-r/\lambda}/r$, the screened potential of a charge in a plasma or an electrolyte. Use [[#eq-poisson]] to find the charge density for $r>0$, and show that the total charge, including a point charge at the origin, is zero.
::: hint
For a function of $r$ alone, $\nabla^2f = \frac{1}{r}\frac{\dd^2}{\dd r^2}(rf)$ for $r > 0$. Near the origin $V\approx V_0a/r$, which is a point charge.
:::
::: solution
For $r>0$, $rV = V_0ae^{-r/\lambda}$, so $\nabla^2V = \frac1r\frac{\dd^2}{\dd r^2}(V_0ae^{-r/\lambda}) = \frac{V_0a}{\lambda^2}\frac{e^{-r/\lambda}}{r}$. Poisson's equation gives

$$
\rho(r) = -\varepsilon_0\nabla^2V = -\frac{\varepsilon_0V_0a}{\lambda^2}\frac{e^{-r/\lambda}}{r}, \qquad r>0,
$$

a cloud of opposite sign. As $r\to0$ the potential behaves like $V_0a/r$, the potential of a point charge $q_0 = 4\pi\varepsilon_0V_0a$, since $\nabla^2(1/r) = -4\pi\delta^3(\mathbf r)$. The cloud's total charge is

$$
\int_0^\infty\rho\,4\pi r^2\,\dd r = -\frac{4\pi\varepsilon_0V_0a}{\lambda^2}\int_0^\infty re^{-r/\lambda}\,\dd r = -\frac{4\pi\varepsilon_0V_0a}{\lambda^2}\lambda^2 = -q_0 .
$$

The total is $q_0 - q_0 = 0$. The cloud screens the point charge completely, which is why the potential decays faster than any power of $r$: by [[#eq-multipole]] a distribution with any non-zero moment would produce a power-law tail.
:::
:::

::: exercise The slot far from its end {level=2 check="0.0550"}
For the slot of [[#eq-slot]], find $V/V_0$ on the centre line at $x = a$ to three significant figures, and then estimate how far from the end the potential on the centre line falls below $10^{-3}V_0$.
::: solution
From [[#ex-slot]], $V(a,a/2)/V_0 = 0.0550$. At such distances the first term dominates, $V/V_0\approx(4/\pi)e^{-\pi x/a}$. Setting this equal to $10^{-3}$, $e^{-\pi x/a} = \pi\times10^{-3}/4 = 7.85\times10^{-4}$, so $\pi x/a = 7.15$ and $x = 2.28a$. A little more than two slot widths in, the end strip is invisible at the level of one part in a thousand.
:::
:::

::: exercise A sphere with prescribed surface potential {level=3 check="1/3"}
The surface of a hollow sphere of radius $R$ is held at $V(R,\theta) = V_0\cos^2\theta$. There is no charge inside or outside, and $V\to0$ at infinity. Find $V$ inside and outside, the surface charge density, and $V/V_0$ at the centre.
::: hint
Write $\cos^2\theta = \frac13 + \frac23P_2(\cos\theta)$.
:::
::: solution
Since $P_2 = \frac12(3\cos^2\theta - 1)$, $\cos^2\theta = \frac13P_0 + \frac23P_2$. Inside, only $r^l$ terms are allowed, and matching at $r = R$ term by term (orthogonality),

$$
V_{\mathrm{in}} = \frac{V_0}{3} + \frac{2V_0}{3}\frac{r^2}{R^2}P_2(\cos\theta).
$$

Outside, only $r^{-(l+1)}$ terms:

$$
V_{\mathrm{out}} = \frac{V_0}{3}\frac{R}{r} + \frac{2V_0}{3}\frac{R^3}{r^3}P_2(\cos\theta).
$$

By [[#thm-unique]] (Dirichlet data on the sphere, decay at infinity) these are the solutions. The surface charge is $\sigma = -\varepsilon_0(\partial_rV_{\mathrm{out}} - \partial_rV_{\mathrm{in}})$ at $r = R$:

$$
\sigma = \frac{\varepsilon_0V_0}{R}\left[\frac13 + 2P_2 + \frac43P_2\right] = \frac{\varepsilon_0V_0}{3R}\bigl[1 + 10P_2(\cos\theta)\bigr].
$$

At the centre $V = V_0/3$, which is also the average of $V_0\cos^2\theta$ over the sphere, as [[#thm-mean]] demands: $\frac{1}{4\pi}\oint\cos^2\theta\,\dd\Omega = \frac13$.
:::
:::

::: exercise Green's reciprocity theorem {level=3}
Let $V_1$ be the potential produced by a charge distribution $\rho_1$ and $V_2$ that produced by $\rho_2$, both localised, in all space. Prove that $\int\rho_1V_2\,\dd\tau = \int\rho_2V_1\,\dd\tau$. Then use it to show that a point charge $q$ at distance $a$ from the centre of an earthed sphere of radius $R$ induces total charge $-qR/a$ on it, without using images.
::: hint
For the application, compare the actual configuration with a second one in which there is no point charge and the sphere is held at potential $V_s$. Earthed conductors and isolated point charges are both allowed in the identity, provided you integrate over all the charges in each configuration.
:::
::: solution
Using [[#eq-coulomb-int]] for $V_2$,

$$
\int\rho_1V_2\,\dd\tau = \frac{1}{4\pi\varepsilon_0}\iint\frac{\rho_1(\mathbf r)\rho_2(\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau\,\dd\tau'.
$$

The kernel is symmetric under $\mathbf r\leftrightarrow\mathbf r'$, so the same double integral equals $\int\rho_2V_1\,\dd\tau$. (The exchange of the order of integration is legitimate because the charges are localised and the singularity $1/\lvert\mathbf r-\mathbf r'\rvert$ is integrable in three dimensions.)

For the application, configuration 1 is the real one: point charge $q$ at $\mathbf a$, induced charge $Q_i$ on the sphere, sphere at potential $0$. Configuration 2: no point charge, sphere raised to potential $V_s$, carrying charge $4\pi\varepsilon_0RV_s$, with potential $V_sR/r$ outside. The charges of configuration 1 sit at the point $\mathbf a$ and on the sphere; the charges of configuration 2 sit only on the sphere. The theorem gives

$$
q\,V_2(\mathbf a) + Q_i\,V_s = (\text{charge of 2 on the sphere})\times V_1(\text{sphere}) = 0,
$$

because the sphere is earthed in configuration 1. With $V_2(\mathbf a) = V_sR/a$, $qV_sR/a + Q_iV_s = 0$, so $Q_i = -qR/a$, in agreement with [[#thm-sphere-image]].
:::
:::

::: exercise Clausius–Mossotti in reverse {level=3 check="2.02"}
A non-polar liquid has $\varepsilon_r = 1.90$. Assuming [[#eq-cm]] holds with a fixed molecular polarisability, find $\varepsilon_r$ after the liquid is compressed so that its number density rises by $10.0\%$. Compare the fractional change with the prediction of the dilute-gas formula $\varepsilon_r - 1 = N\alpha/\varepsilon_0$.
::: solution
Write $x = N\alpha/(3\varepsilon_0)$. Before compression, $x = (1.90 - 1)/(1.90 + 2) = 0.90/3.90 = 0.2308$. After compression $x$ rises in proportion to $N$, to $1.100\times0.2308 = 0.2538$. Inverting [[#eq-cm]],

$$
\varepsilon_r = \frac{1 + 2x}{1 - x} = \frac{1.5077}{0.7462} = 2.02 .
$$

The increase is $6.3\%$. The dilute-gas formula makes $\varepsilon_r - 1$ proportional to $N$, so $0.90$ would become $0.99$ and $\varepsilon_r = 1.99$, an increase of only $4.7\%$. The local-field correction amplifies the response to density: compressing the liquid raises both the number of dipoles and the field each feels from its neighbours. Measurements of $\varepsilon_r$ under pressure in simple liquids follow the Clausius–Mossotti trend closely, which was one of the early pieces of evidence that the Lorentz local field is the right correction for non-polar matter.
:::
:::
