In 1545 Gerolamo Cardano published a formula for solving cubic equations. Applied to $x^3 = 15x + 4$ it gives

$$
x = \sqrt[3]{2 + \sqrt{-121}} + \sqrt[3]{2 - \sqrt{-121}},
$$

an expression containing the square root of a negative number. Yet the equation has the perfectly ordinary solution $x = 4$, since $4^3 = 64 = 15\cdot 4 + 4$. Twenty-seven years later Rafael Bombelli had the courage to calculate with $\sqrt{-1}$ as if it were a number obeying the usual rules. Writing $\sqrt{-121} = 11\sqrt{-1}$ and guessing that the cube roots have the form $2 \pm \sqrt{-1}$, he checked that

$$
(2 + \sqrt{-1})^3 = 8 + 12\sqrt{-1} + 6(\sqrt{-1})^2 + (\sqrt{-1})^3 = 8 + 12\sqrt{-1} - 6 - \sqrt{-1} = 2 + 11\sqrt{-1},
$$

so Cardano's formula gives $x = (2 + \sqrt{-1}) + (2 - \sqrt{-1}) = 4$. The "impossible" numbers cancel and leave the real answer. This was the first sign that numbers involving $\sqrt{-1}$ are not a curiosity but a tool — the route to real answers sometimes passes through the complex numbers.

In this chapter we build the complex numbers carefully, learn their algebra, and — just as important — learn to see them as points of a plane, where addition is translation and multiplication is rotation combined with scaling. We then find all $n$-th roots of a complex number, introduce the vocabulary of open sets and domains used throughout the course, and finish with the Riemann sphere, which adds a single point at infinity to the plane.

## Complex numbers and their arithmetic

The equation $x^2 + 1 = 0$ has no real solution, because squares of real numbers are never negative. We enlarge the number system by adjoining a new number $i$ with $i^2 = -1$, and we insist that the usual rules of algebra continue to hold. To make sure this does not lead to a contradiction, we define the new numbers concretely as pairs of real numbers.

::: definition Complex numbers {#def-complex}
A **complex number** is an expression $z = a + bi$ with $a, b \in \R$; formally, it is the ordered pair $(a,b) \in \R^2$. The set of complex numbers is denoted $\C$. The real numbers $a = \operatorname{Re} z$ and $b = \operatorname{Im} z$ are the **real part** and **imaginary part** of $z$. Two complex numbers are equal when their real parts and their imaginary parts are equal. Addition and multiplication are defined by

$$
(a + bi) + (c + di) = (a + c) + (b + d)i, \qquad (a + bi)(c + di) = (ac - bd) + (ad + bc)i.
$$ {#eq-mult}
:::

We identify the real number $a$ with $a + 0i$, so $\R \subset \C$, and we write $bi$ for $0 + bi$; numbers of this form (with $b \neq 0$) are **purely imaginary**. The multiplication rule [[#eq-mult]] is exactly what we get by multiplying out $(a + bi)(c+di)$ and replacing $i^2$ by $-1$; in particular $i \cdot i = (0\cdot 0 - 1\cdot 1) + (0\cdot1 + 1\cdot 0)i = -1$. Nothing needs to be memorised: compute as with polynomials in $i$ and use $i^2 = -1$.

Note that $\operatorname{Im} z$ is the *real* number $b$, not $bi$. For example $\operatorname{Im}(3 - 2i) = -2$.

::: theorem ℂ is a field {#thm-field}
With the operations of [[#def-complex]], $\C$ is a field: addition and multiplication are associative and commutative, multiplication distributes over addition, $0$ and $1$ are identities, every $z$ has a negative $-z$, and every $z \neq 0$ has a multiplicative inverse. If $z = a + bi \neq 0$, then

$$
z^{-1} = \frac{a}{a^2 + b^2} - \frac{b}{a^2 + b^2}\, i .
$$ {#eq-inverse}
:::

::: proof
The associative, commutative and distributive laws are routine (if tedious) checks from [[#eq-mult]] using the corresponding laws in $\R$; for instance commutativity of multiplication holds because the formula for $(a+bi)(c+di)$ is symmetric under swapping $(a,b)$ with $(c,d)$. The identities are $0 = 0 + 0i$ and $1 = 1 + 0i$, and $-(a + bi) = -a - bi$. For the inverse, if $z = a + bi \neq 0$ then $a^2 + b^2 > 0$, so the right-hand side $w$ of [[#eq-inverse]] is defined, and

$$
z w = \frac{(a + bi)(a - bi)}{a^2+b^2} = \frac{a^2 + b^2 + (-ab + ba)i}{a^2 + b^2} = 1 .
$$
:::

The number $a - bi$ that appeared in the proof is important enough to have a name, as is $\sqrt{a^2+b^2}$.

::: definition Conjugate and modulus {#def-conj}
The **complex conjugate** of $z = a + bi$ is $\bar z = a - bi$, and its **modulus** (or absolute value) is $\abs{z} = \sqrt{a^2 + b^2} \ge 0$.
:::

::: proposition Properties of conjugate and modulus {#prop-conj}
For all $z, w \in \C$:

1. $\overline{z + w} = \bar z + \bar w$, $\overline{zw} = \bar z\,\bar w$ and $\bar{\bar z} = z$;
2. $\operatorname{Re} z = \dfrac{z + \bar z}{2}$ and $\operatorname{Im} z = \dfrac{z - \bar z}{2i}$;
3. $z\bar z = \abs{z}^2$, so $z^{-1} = \bar z / \abs{z}^2$ for $z \neq 0$;
4. $\abs{zw} = \abs{z}\,\abs{w}$ and $\abs{\bar z} = \abs{z}$;
5. $\abs{\operatorname{Re} z} \le \abs{z}$ and $\abs{\operatorname{Im} z} \le \abs{z}$.
:::

::: proof
Write $z = a + bi$ and $w = c + di$. (1) $\overline{zw} = (ac - bd) - (ad + bc)i$, while $\bar z \bar w = (a - bi)(c - di) = (ac - bd) - (ad + bc)i$; the other two identities are immediate. (2) $z + \bar z = 2a$ and $z - \bar z = 2bi$. (3) $z \bar z = a^2 + b^2 = \abs z^2$; dividing by $\abs z^2$ gives the formula for $z^{-1}$, which is [[#eq-inverse]] again. (4) Using (1) and (3), $\abs{zw}^2 = zw\,\overline{zw} = (z\bar z)(w \bar w) = \abs z^2 \abs w^2$, and both sides of $\abs{zw} = \abs z\abs w$ are non-negative. (5) $\abs{a} = \sqrt{a^2} \le \sqrt{a^2 + b^2}$, and similarly for $b$.
:::

Property (3) gives the practical recipe for division: multiply numerator and denominator by the conjugate of the denominator, which makes the denominator real.

::: example Division by the conjugate trick {#ex-divide}
Write $\dfrac{3 + 4i}{1 - 2i}$ in the form $a + bi$.
::: solution
Multiply top and bottom by $\overline{1 - 2i} = 1 + 2i$:

$$
\frac{3 + 4i}{1 - 2i} = \frac{(3 + 4i)(1 + 2i)}{(1-2i)(1+2i)} = \frac{3 + 6i + 4i + 8i^2}{1 + 4} = \frac{-5 + 10i}{5} = -1 + 2i .
$$

Check: $(-1 + 2i)(1 - 2i) = -1 + 2i + 2i - 4i^2 = 3 + 4i$. Notice also that $\abs{-1 + 2i} = \sqrt5 = \abs{3 + 4i}/\abs{1 - 2i} = 5/\sqrt5$, as property (4) predicts.
:::
:::

::: remark Why not order ℂ?
The real numbers are an *ordered* field: there is a notion of $x < y$ compatible with addition and multiplication. No such ordering of $\C$ exists (see [[#exr-order]]): in an ordered field every non-zero square is positive, but $i^2 = -1$ and $1^2 = 1$ cannot both be positive. So inequalities between complex numbers, such as $z < w$, are meaningless unless both are real. Inequalities in complex analysis are always between real quantities such as moduli and real parts.
:::

## The complex plane

Since a complex number is a pair of real numbers, we can draw $z = a + bi$ as the point $(a, b)$ in the plane, or as the arrow from the origin to that point. This picture is called the **complex plane** or **Argand diagram**; the horizontal axis is the **real axis** and the vertical axis the **imaginary axis**.

In this picture:

- **addition** is addition of vectors: $z + w$ is the fourth vertex of the parallelogram with sides $z$ and $w$, and adding a fixed $w$ translates the whole plane by $w$;
- **conjugation** $z \mapsto \bar z$ is reflection in the real axis;
- the **modulus** $\abs z$ is the length of the arrow, that is, the distance from $0$ to $z$; more generally $\abs{z - w}$ is the distance between the points $z$ and $w$.

The last point turns geometry into algebra. The circle with centre $a$ and radius $r$ is $\set{z : \abs{z - a} = r}$, the open disc inside it is $\set{z : \abs{z-a} < r}$, and the perpendicular bisector of the segment from $p$ to $q$ is $\set{z : \abs{z - p} = \abs{z - q}}$.

The most used inequality in complex analysis says that one side of a triangle is no longer than the sum of the other two.

::: theorem Triangle inequality {#thm-triangle}
For all $z, w \in \C$,

$$
\abs{z + w} \le \abs{z} + \abs{w} \qquad\text{and}\qquad \bigl\lvert \abs z - \abs w \bigr\rvert \le \abs{z - w}.
$$
:::

::: proof
Using $\abs{u}^2 = u \bar u$ and [[#prop-conj]],

$$
\abs{z+w}^2 = (z + w)(\bar z + \bar w) = \abs z^2 + z\bar w + \bar z w + \abs w^2 = \abs z^2 + 2\operatorname{Re}(z \bar w) + \abs w^2,
$$

because $\bar z w = \overline{z \bar w}$ and $u + \bar u = 2\operatorname{Re} u$. Since $\operatorname{Re}(z\bar w) \le \abs{z \bar w} = \abs z\abs w$,

$$
\abs{z+w}^2 \le \abs z^2 + 2\abs z\abs w + \abs w^2 = (\abs z + \abs w)^2,
$$

and taking non-negative square roots gives the first inequality. For the second, apply the first to $z = (z - w) + w$ to get $\abs z - \abs w \le \abs{z-w}$, and swap the roles of $z$ and $w$ to get $\abs w - \abs z \le \abs{w - z} = \abs{z-w}$.
:::

The second form, the **reverse triangle inequality**, is the one we use to bound denominators from *below*. For instance, if $\abs z = 3$ then $\abs{z^2 + 1} \ge \abs{z}^2 - 1 = 8$, so $\abs{1/(z^2 + 1)} \le 1/8$ on that circle. Estimates of exactly this kind will be the backbone of contour integration in [[complex-analysis/contour-integrals]].

::: example Describing regions {#ex-regions}
Sketch the sets (a) $\set{z : \abs{z - 1} = \abs{z + i}}$, (b) $\set{z : \abs{z - 2i} \le 1}$, (c) $\set{z : \operatorname{Re}(z^2) > 0}$.
::: solution
(a) This is the set of points equidistant from $1$ and $-i$, the perpendicular bisector of the segment joining them. Algebraically, with $z = x + iy$: $(x - 1)^2 + y^2 = x^2 + (y + 1)^2$ gives $-2x + 1 = 2y + 1$, that is, the line $y = -x$.

(b) The closed disc with centre $2i$ and radius $1$ (including its boundary circle).

(c) $z^2 = (x + iy)^2 = x^2 - y^2 + 2ixy$, so the condition is $x^2 > y^2$, that is, $\abs{x} > \abs{y}$. This is the union of the two open quarter-planes (wedges) between the lines $y = \pm x$ containing the positive and negative real axes.
:::
:::

## Polar form

A point of the plane can also be located by its distance from the origin and its direction. If $z \neq 0$ has modulus $r = \abs z$ and the arrow to $z$ makes the angle $\theta$ with the positive real axis, then $z = r\cos\theta + i\,r\sin\theta$.

::: definition Polar form and argument {#def-arg}
Every $z \neq 0$ can be written as

$$
z = r(\cos\theta + i \sin\theta), \qquad r = \abs z > 0,\ \theta \in \R .
$$

Any such $\theta$ is called an **argument** of $z$; the set of all arguments is denoted $\arg z$. The arguments of $z$ differ by integer multiples of $2\pi$, and exactly one of them lies in $(-\pi, \pi]$: this is the **principal argument** $\Arg z$. The number $0$ has no argument.
:::

We will use the abbreviation

$$
e^{i\theta} = \cos\theta + i\sin\theta ,
$$ {#eq-euler}

so that polar form reads $z = re^{i\theta}$. For now [[#eq-euler]] is simply notation. In [[complex-analysis/elementary-functions]] we define the exponential of every complex number and show that it agrees with this, and the power series of [[calculus-2/taylor-series]] already suggest it: substituting $x = i\theta$ into $e^x = \sum x^n/n!$ and separating even and odd powers gives exactly the series of $\cos\theta$ and $i\sin\theta$. Note that $\lvert e^{i\theta}\rvert = \sqrt{\cos^2\theta + \sin^2\theta} = 1$: the numbers $e^{i\theta}$ fill out the unit circle.

To find $\Arg z$ for $z = a + bi$, do not just compute $\arctan(b/a)$: the arctangent only returns angles in $(-\pi/2, \pi/2)$, so it gives the wrong answer for points in the left half-plane. Locate the quadrant of $z$ first, then choose the angle.

::: quiz
What is $\Arg(-1 - i)$?
- [ ] $\pi/4$, since $\arctan\frac{-1}{-1} = \arctan 1 = \pi/4$
- [ ] $5\pi/4$
- [x] $-3\pi/4$
- [ ] $3\pi/4$
::: solution
The point $-1 - i$ lies in the third quadrant, on the diagonal making the angle $5\pi/4$ (or equivalently $-3\pi/4$) with the positive real axis. The principal argument must lie in $(-\pi, \pi]$, so $\Arg(-1-i) = -3\pi/4$. The value $5\pi/4$ is *an* argument but not the principal one, and $\arctan 1 = \pi/4$ points into the first quadrant — the classic mistake.
:::
:::

Polar form makes multiplication transparent.

::: theorem Multiplication in polar form {#thm-polar-mult}
If $z = r e^{i\theta}$ and $w = s e^{i\varphi}$, then

$$
zw = rs\, e^{i(\theta + \varphi)} \qquad\text{and, if } w \neq 0, \qquad \frac{z}{w} = \frac{r}{s}\, e^{i(\theta - \varphi)} .
$$

In words: moduli multiply and arguments add. In particular $e^{i\theta}e^{i\varphi} = e^{i(\theta+\varphi)}$.
:::

::: proof
By [[#eq-mult]] and the addition formulas for sine and cosine,

$$
\begin{aligned}
(\cos\theta + i\sin\theta)(\cos\varphi + i \sin\varphi) &= (\cos\theta\cos\varphi - \sin\theta\sin\varphi) + i(\sin\theta\cos\varphi + \cos\theta\sin\varphi) \\
&= \cos(\theta + \varphi) + i\sin(\theta + \varphi).
\end{aligned}
$$

Multiplying by $rs$ gives the formula for $zw$. For the quotient, $u = \frac rs e^{i(\theta-\varphi)}$ satisfies $uw = r e^{i\theta} = z$ by what we just proved, so $u = z/w$.
:::

Geometrically, multiplication by a fixed $w = s e^{i\varphi}$ is the map of the plane that **rotates by the angle $\varphi$ and scales by the factor $s$**. Multiplication by $i = e^{i\pi/2}$ is rotation by a right angle; multiplication by $-1 = e^{i\pi}$ is rotation by a half-turn, which is why $i^2 = -1$ — two quarter-turns make a half-turn.

::: widget complexplane
mode: product
z: 1.5, 1
w: 0.5, 1.2
caption: Drag $z$ and $w$. The product $zw$ has modulus $\lvert z\rvert\,\lvert w\rvert$ and argument $\arg z + \arg w$: watch the angles add as you move $w$ around, and notice that putting $w$ on the unit circle turns multiplication into a pure rotation. Put $w = i$ to see the quarter-turn.
:::

::: intuition Multiplication as a rotation-scaling
In the language of [[linear-algebra/linear-maps]], the map $z \mapsto wz$ with $w = c + di$ is the linear map of $\R^2$ with matrix

$$
\begin{pmatrix} c & -d \\ d & c \end{pmatrix} = s\begin{pmatrix} \cos\varphi & -\sin\varphi \\ \sin\varphi & \cos\varphi\end{pmatrix}.
$$

Complex numbers are exactly the $2\times2$ real matrices of this special "rotation times scaling" form. This observation is the key to complex differentiability in [[complex-analysis/analytic-functions]]: a complex differentiable function is one that, near each point, looks like such a matrix.
:::

Applying [[#thm-polar-mult]] repeatedly gives the formula for powers.

::: corollary De Moivre's formula {#cor-demoivre}
For every integer $n$ and every real $\theta$,

$$
(\cos\theta + i\sin\theta)^n = \cos n\theta + i \sin n\theta, \qquad\text{that is,}\qquad (re^{i\theta})^n = r^n e^{in\theta}.
$$
:::

::: proof
For $n = 0$ both sides equal $1$. For $n \ge 1$ use induction: if $(e^{i\theta})^n = e^{in\theta}$, then $(e^{i\theta})^{n+1} = e^{in\theta}e^{i\theta} = e^{i(n+1)\theta}$ by [[#thm-polar-mult]]. For negative $n = -m$, the quotient part of the theorem gives $(e^{i\theta})^{-m} = 1/e^{im\theta} = e^{-im\theta}$. The factor $r^n$ is handled the same way.
:::

::: example Powers and trigonometric identities {#ex-demoivre}
(a) Compute $(1 + i)^{10}$. (b) Express $\cos 3\theta$ in terms of $\cos\theta$.
::: solution
(a) Multiplying out ten factors would be painful. In polar form $1 + i = \sqrt2\, e^{i\pi/4}$, so by de Moivre

$$
(1+i)^{10} = (\sqrt2)^{10} e^{10 i\pi/4} = 32\, e^{5i\pi/2} = 32\, e^{i\pi/2} = 32 i ,
$$

since $5\pi/2$ and $\pi/2$ differ by $2\pi$.

(b) Write $c = \cos\theta$ and $s = \sin\theta$. By de Moivre and the binomial theorem,

$$
\cos 3\theta + i\sin 3\theta = (c + is)^3 = c^3 + 3c^2(is) + 3c(is)^2 + (is)^3 = (c^3 - 3cs^2) + i(3c^2 s - s^3).
$$

Comparing real parts and using $s^2 = 1 - c^2$: $\cos 3\theta = c^3 - 3c(1-c^2) = 4\cos^3\theta - 3\cos\theta$. Comparing imaginary parts gives $\sin 3\theta = 3\sin\theta - 4\sin^3\theta$ for free.
:::
:::

::: warning Arguments do not behave like a function
"Arguments add" is a statement about the *sets* $\arg z$: every argument of $z$ plus every argument of $w$ is an argument of $zw$. It is false for the principal argument. With $z = w = -1$ we have $\Arg z + \Arg w = 2\pi$, but $\Arg(zw) = \Arg 1 = 0$. In general $\Arg(zw) = \Arg z + \Arg w + 2\pi k$ with $k \in \set{-1, 0, 1}$, and the correction $k$ is easy to forget. This little discontinuity will reappear as the branch cut of the logarithm in [[complex-analysis/elementary-functions]].
:::

## Roots of complex numbers

Over $\R$, the equation $x^n = c$ has zero, one or two solutions depending on the sign of $c$ and the parity of $n$. Over $\C$ the answer is uniform and beautiful.

::: theorem n-th roots {#thm-roots}
Let $n \ge 1$ and let $w = \rho e^{i\varphi} \neq 0$. The equation $z^n = w$ has exactly $n$ distinct solutions, namely

$$
z_k = \rho^{1/n} \exp\!\Big(i\,\frac{\varphi + 2\pi k}{n}\Big), \qquad k = 0, 1, \dots, n-1,
$$ {#eq-roots}

where $\rho^{1/n}$ is the positive real $n$-th root of $\rho$ and $\exp(i t)$ means $e^{it}$. They are the vertices of a regular $n$-gon centred at $0$.
:::

::: proof
Write a possible solution as $z = re^{i\theta}$ with $r > 0$ (clearly $z = 0$ is not a solution). By de Moivre, $z^n = r^n e^{in\theta}$, and $z^n = w$ holds if and only if the two numbers have the same modulus and their arguments differ by a multiple of $2\pi$:

$$
r^n = \rho \quad\text{and}\quad n\theta = \varphi + 2\pi k \text{ for some } k \in \Z .
$$

So $r = \rho^{1/n}$ and $\theta = (\varphi + 2\pi k)/n$, which is [[#eq-roots]] but with $k$ ranging over all of $\Z$. Two values of $k$ give the same $z$ exactly when the corresponding angles differ by a multiple of $2\pi$, that is, when $(k - k')/n$ is an integer, that is, when $k \equiv k' \pmod n$. Hence $k = 0, 1, \dots, n-1$ give each solution exactly once. Consecutive roots differ by the angle $2\pi/n$ and all have modulus $\rho^{1/n}$, so they form a regular $n$-gon.
:::

The solutions of $z^n = 1$ are the **$n$-th roots of unity** $1, \omega, \omega^2, \dots, \omega^{n-1}$, where $\omega = e^{2\pi i/n}$. Since $\omega \neq 1$ (for $n \ge 2$) and $\omega^n = 1$, the geometric series formula gives

$$
1 + \omega + \omega^2 + \dots + \omega^{n-1} = \frac{\omega^n - 1}{\omega - 1} = 0 .
$$

The roots of unity are balanced around the origin: their centre of mass is $0$. In the language of [[abstract-algebra/groups]], they form a cyclic group of order $n$ under multiplication, generated by $\omega$.

::: widget complexplane
mode: roots
n: 5
z: 1.5, 1
caption: The figure shows a point $z$ and its $n$-th roots $w_0, \dots, w_{n-1}$, the solutions of $w^n = z$ (the letters are swapped relative to [[#thm-roots]]). They sit at the corners of a regular $n$-gon of radius $\lvert z\rvert^{1/n}$. Change $n$, then drag $z$ once around the origin: followed continuously, the polygon turns by only $2\pi/n$ and each root ends at the position of its neighbour (the labels $w_k$, computed from $\Arg z$, jump back as $z$ crosses the negative real axis) — the first glimpse of a branch point, explored in [[complex-analysis/elementary-functions]].
:::

::: example Fourth roots of −16 {#ex-fourth-roots}
Solve $z^4 = -16$.
::: solution
In polar form $-16 = 16\,e^{i\pi}$. By [[#thm-roots]] the solutions are

$$
z_k = 16^{1/4} \exp\!\Big(i\,\frac{\pi + 2\pi k}{4}\Big) = 2\,e^{i(\pi/4 + k\pi/2)}, \qquad k = 0,1,2,3 .
$$

Since $e^{i\pi/4} = \frac{1}{\sqrt2}(1 + i)$, these are $\sqrt2(1 + i)$, $\sqrt2(-1 + i)$, $\sqrt2(-1 - i)$ and $\sqrt2(1 - i)$: the corners of a square with vertices on the circle of radius $2$. Check one: $(\sqrt2(1+i))^2 = 2\cdot 2i = 4i$ and $(4i)^2 = -16$.
:::
:::

Square roots can also be found without polar form, which is convenient when the angle is not a "nice" one.

::: example A quadratic with complex coefficients {#ex-quadratic}
Solve $z^2 - (3 + i)z + (4 + 3i) = 0$.
::: solution
Completing the square works in any field in which $2 \neq 0$, so the quadratic formula holds in $\C$: $z = \frac12\big((3 + i) \pm \sqrt{\Delta}\big)$, where $\sqrt\Delta$ denotes either square root of the discriminant

$$
\Delta = (3+i)^2 - 4(4 + 3i) = (8 + 6i) - (16 + 12i) = -8 - 6i .
$$

To find $u + vi$ with $(u + vi)^2 = -8 - 6i$, compare real parts, imaginary parts and moduli:

$$
u^2 - v^2 = -8, \qquad 2uv = -6, \qquad u^2 + v^2 = \abs{-8 - 6i} = 10 .
$$

Adding and subtracting the first and third equations gives $u^2 = 1$ and $v^2 = 9$, and $uv = -3 < 0$ forces opposite signs: $u + vi = \pm(1 - 3i)$. Therefore

$$
z = \frac{(3 + i) \pm (1 - 3i)}{2} \in \set{\,2 - i,\ 1 + 2i\,}.
$$

Check: the sum of the roots is $3 + i$ and their product is $(2 - i)(1 + 2i) = 2 + 4i - i - 2i^2 = 4 + 3i$, as Vieta's formulas require.
:::
:::

For the cube root $\sqrt[3]{2 + 11i}$ in Bombelli's problem the same comparison only goes round in a circle: with $u^2 + v^2 = \abs{2 + 11i}^{2/3} = 5$, the real parts give $4u^3 - 15u - 2 = 0$, which is the original cubic with $x = 2u$. So one falls back on guessing, as Bombelli did (this cubic has the rational root $u = 2$, and then $v = 1$): one cube root is $2 + i$, and by [[#thm-roots]] the other two are $(2+i)\omega$ and $(2 + i)\omega^2$ with $\omega = e^{2\pi i/3}$. Pairing each cube root of $2 + 11i$ with its conjugate, as Cardano's formula requires, yields all three real roots of $x^3 = 15x + 4$: $4$ and $-2 \pm \sqrt3$.

::: warning √ is ambiguous in ℂ
Every non-zero complex number has *two* square roots, and there is no way to pick one of them for every $z$ that makes $\sqrt{zw} = \sqrt z\sqrt w$ true. The "proof" $-1 = i \cdot i = \sqrt{-1}\sqrt{-1} = \sqrt{(-1)(-1)} = \sqrt1 = 1$ fails precisely at the step $\sqrt{a}\sqrt{b} = \sqrt{ab}$, which is only valid for non-negative reals. When you write $\sqrt{w}$ for complex $w$, say which root you mean, or work with the set of both roots.
:::

::: quiz
How many distinct complex solutions does $z^6 = 64i$ have, and what is their common modulus?
- [ ] Two solutions, of modulus $8$
- [ ] Six solutions, of modulus $64$
- [x] Six solutions, of modulus $2$
- [ ] Three solutions, of modulus $4$
::: solution
By [[#thm-roots]] the equation $z^n = w$ with $w \neq 0$ has exactly $n$ solutions, all of modulus $\abs{w}^{1/n}$. Here $n = 6$ and $\abs{64 i} = 64$, so the modulus is $64^{1/6} = 2$.
:::
:::

## Sets in the plane

Calculus in $\C$ needs the same vocabulary of neighbourhoods as calculus in $\R^2$, which you met in [[real-analysis/metric-spaces]]; since $\abs{z - w}$ is the ordinary Euclidean distance, the notions are literally the same. We collect them here for reference.

::: definition Open sets and domains {#def-domain}
Let $a \in \C$ and $r > 0$.

1. The **open disc** $D(a, r) = \set{z : \abs{z - a} < r}$; the **closed disc** $\overline{D}(a,r) = \set{z : \abs{z-a} \le r}$; the **punctured disc** $D(a, r)\setminus\set a$.
2. A set $U \subseteq \C$ is **open** if for every $z \in U$ some disc $D(z, \eps)$ lies in $U$. A set is **closed** if its complement is open. The **boundary** of $S$ consists of the points every disc around which meets both $S$ and its complement.
3. A set $S$ is **bounded** if $S \subseteq D(0, R)$ for some $R$.
4. A **domain** (or region) is a non-empty open set $U$ that is connected in the sense that any two points of $U$ can be joined by a polygonal path (finitely many line segments) lying in $U$.
:::

Typical domains are discs, half-planes such as $\set{z : \operatorname{Im} z > 0}$, annuli $\set{z : r < \abs{z - a} < R}$ and the punctured plane $\C \setminus \set 0$. The union of two disjoint open discs is open but is not a domain. Connectedness matters because many theorems fail without it: on the union of two disjoint discs, a function that is $0$ on one disc and $1$ on the other has derivative zero everywhere without being constant. In [[topology/connectedness]] you will see that for open subsets of the plane "polygonally connected", "path-connected" and "connected" all mean the same.

The closed discs, and more generally the closed bounded subsets of $\C$, are **compact**: every sequence in them has a subsequence converging to a point of the set ([[topology/compactness]]). Compactness is what guarantees that a continuous real-valued function such as $\abs{f(z)}$ attains a maximum on a closed disc, a fact we use constantly.

## The Riemann sphere and the point at infinity

Many statements in complex analysis become simpler if we add to the plane a single point $\infty$, approached by moving away from the origin in *any* direction. (In contrast with the real line, which has two ends $\pm\infty$.) The **extended complex plane** is $\C_\infty = \C \cup \set{\infty}$; a sequence $z_n$ tends to $\infty$ when $\abs{z_n} \to \infty$, and the neighbourhoods of $\infty$ are the sets $\set{z : \abs z > R} \cup \set\infty$.

There is a beautiful way to see $\C_\infty$ as a sphere. Let $S$ be the unit sphere $x_1^2 + x_2^2 + x_3^2 = 1$ in $\R^3$, and identify $\C$ with the plane $x_3 = 0$ through its equator. Join the north pole $N = (0, 0, 1)$ to a point $z$ of the plane by a straight line; it meets the sphere in exactly one more point $P$. The map $z \mapsto P$ is called **stereographic projection** (strictly, its inverse is).

::: proposition Stereographic projection {#prop-stereo}
For $z = x + iy \in \C$ the corresponding point of the sphere is

$$
P(z) = \left( \frac{2x}{\abs z^2 + 1},\ \frac{2y}{\abs z^2 + 1},\ \frac{\abs z^2 - 1}{\abs z^2 + 1} \right),
$$ {#eq-stereo}

and conversely the point $(x_1, x_2, x_3) \neq N$ of the sphere corresponds to $z = \dfrac{x_1 + i x_2}{1 - x_3}$. Setting $P(\infty) = N$ makes $P$ a bijection from $\C_\infty$ onto the sphere. The unit circle goes to the equator, the unit disc to the southern hemisphere, and points of large modulus to points near $N$.
:::

::: proof
The line from $N$ through $(x, y, 0)$ consists of the points $(tx, ty, 1 - t)$, $t \in \R$. It meets the sphere when $t^2(x^2 + y^2) + (1 - t)^2 = 1$, that is, $t\big(t(\abs z^2 + 1) - 2\big) = 0$. The solution $t = 0$ is $N$ itself; the other is $t = 2/(\abs z^2 + 1)$, which gives [[#eq-stereo]]. Conversely, if $(x_1, x_2, x_3) = (tx, ty, 1 - t)$ is on the sphere and not equal to $N$, then $t = 1 - x_3 \neq 0$ and $x + iy = (x_1 + ix_2)/(1 - x_3)$. These two formulas are inverse to each other, so $P$ is a bijection from $\C$ onto the sphere minus $N$. Finally $x_3 = (\abs z^2 - 1)/(\abs z^2+1)$ is $0$, negative or close to $1$ exactly when $\abs z = 1$, $\abs z < 1$ or $\abs z$ is large.
:::

::: proposition Circles on the sphere {#prop-circles}
Under stereographic projection, circles on the sphere correspond to circles and straight lines in the plane; the circles through $N$ correspond to the lines.
:::

::: proof
A circle on the sphere is the intersection of the sphere with a plane $a x_1 + b x_2 + c x_3 = d$ (with $a^2 + b^2 + c^2 = 1$ and $\abs d < 1$, so that the intersection is a genuine circle). Substituting [[#eq-stereo]] and multiplying by $\abs z^2 + 1$, a point $z$ corresponds to a point of this circle exactly when

$$
2ax + 2by + c(\abs z^2 - 1) = d(\abs z^2 + 1), \quad\text{i.e.}\quad (c - d)(x^2 + y^2) + 2ax + 2by - (c + d) = 0 .
$$

If $c \neq d$ this is the equation of a circle (after dividing by $c - d$ and completing squares; the radius squared works out to $(1 - d^2)/(c-d)^2 > 0$). If $c = d$ the plane passes through $N = (0,0,1)$, and the equation is the line $2ax + 2by = 2c$. Every circle and every line of the plane arises in this way, since the steps can be reversed.
:::

So on the Riemann sphere, a straight line is just a circle that happens to pass through $\infty$. This explains why circles and lines are always treated together in complex analysis: in [[complex-analysis/conformal-maps]] we will see that Möbius transformations, such as $z \mapsto 1/z$, map the family of "circles and lines" to itself. The map $z \mapsto 1/z$ itself has a simple description on the sphere — it is the rotation by a half-turn about the real axis — which exchanges $0$ and $\infty$.

::: example A point on the sphere {#ex-sphere}
Find the point of the sphere corresponding to $z = 1 + i$, and the complex number corresponding to the point $\big(\tfrac35, 0, -\tfrac45\big)$.
::: solution
Here $\abs z^2 = 2$, so by [[#eq-stereo]] $P(1+i) = \big(\tfrac{2}{3}, \tfrac{2}{3}, \tfrac{1}{3}\big)$, a point of the northern hemisphere, as it should be since $\abs{1+i} > 1$. Conversely, $(x_1,x_2,x_3) = \big(\tfrac35, 0, -\tfrac45\big)$ lies on the sphere because $\tfrac{9}{25} + \tfrac{16}{25} = 1$, and it corresponds to $z = \dfrac{3/5}{1 + 4/5} = \dfrac13$, inside the unit disc as expected for a point of the southern hemisphere.
:::
:::

::: application Phasors and electric circuits
Engineers represent an alternating voltage $V_0\cos(\omega t + \varphi)$ as the real part of $V e^{i\omega t}$ with the complex amplitude (**phasor**) $V = V_0 e^{i\varphi}$, usually writing $j$ for $i$. Resistors, inductors and capacitors then behave like resistors with complex resistances, the **impedances** $Z_R = R$, $Z_L = i\omega L$ and $Z_C = 1/(i\omega C)$, which combine in series by addition. For a resistor of $3\,\Omega$ in series with an inductor of impedance $4i\,\Omega$, the total impedance is $Z = 3 + 4i$; the current has amplitude $\abs{V}/\abs Z = \abs V / 5$ and lags the voltage by $\Arg Z = \arctan\frac43 \approx 53^\circ$. Differential equations for the circuit have become complex arithmetic — the same idea, made systematic, is the Laplace transform of [[ode/laplace-transform]].
:::

::: history
Cardano's *Ars Magna* (1545) contains the first written calculation with square roots of negative numbers, but he regarded them as useless. Bombelli's *L'Algebra* (1572) gave the rules for computing with them and resolved the paradox of $x^3 = 15x + 4$ described at the start of this chapter. René Descartes called such numbers "imaginary" in *La Géométrie* (1637), and Leonhard Euler introduced the letter $i$ for $\sqrt{-1}$ in a memoir written in 1777. The interpretation of complex numbers as points of a plane was published by the surveyor Caspar Wessel in 1799 and independently by Jean-Robert Argand in 1806, and it became standard after Carl Friedrich Gauss adopted it and introduced the term "complex number" in 1831. William Rowan Hamilton removed the last mystery in the 1830s by defining complex numbers as ordered pairs of reals, exactly as in [[#def-complex]]. The sphere model of $\C_\infty$ is named after Bernhard Riemann.
:::

## Where this leads

The algebra of this chapter is used on every page that follows. Polar form and roots lead to the exponential, the logarithm and the multivalued powers of [[complex-analysis/elementary-functions]]; the vocabulary of domains and the triangle inequality underpin the analysis of [[complex-analysis/analytic-functions]] and [[complex-analysis/contour-integrals]]; roots of unity reappear in the discrete Fourier transform and in [[abstract-algebra/fields-galois]]; and the Riemann sphere is the natural home of the Möbius transformations of [[complex-analysis/conformal-maps]]. Complex eigenvalues of real matrices, which you meet in [[linear-algebra/eigenvalues]], are rotations in disguise for exactly the reason given in the intuition box above.

::: summary
- $\C$ consists of numbers $a + bi$ with $i^2 = -1$; it is a field ([[#thm-field]]), but it cannot be ordered. Divide by multiplying by the conjugate of the denominator.
- The conjugate $\bar z$ and modulus $\abs z$ satisfy $z\bar z = \abs z^2$, $\overline{zw} = \bar z\bar w$ and $\abs{zw} = \abs z\abs w$; $\abs{z - w}$ is the distance between $z$ and $w$.
- The triangle inequality $\abs{z+w} \le \abs z + \abs w$ and its reverse form $\abs{z - w} \ge \bigl\lvert\abs z - \abs w\bigr\rvert$ are the basic estimates of complex analysis.
- In polar form $z = re^{i\theta}$, multiplication multiplies moduli and adds arguments; de Moivre's formula $(re^{i\theta})^n = r^ne^{in\theta}$ follows.
- The principal argument $\Arg z \in (-\pi, \pi]$ is not additive; $\arg z$ is a set of values differing by multiples of $2\pi$.
- A non-zero $w$ has exactly $n$ distinct $n$-th roots, forming a regular $n$-gon ([[#thm-roots]]); the $n$-th roots of unity sum to $0$.
- A domain is a connected open set. Adding $\infty$ gives the Riemann sphere, on which lines are circles through $\infty$.
:::

## Exercises

::: exercise A modulus without multiplying out {level=1 check="5"}
Find $\left\lvert \dfrac{(3 + 4i)(1 - 2i)}{2 + i} \right\rvert$.
::: solution
By [[#prop-conj]], the modulus of a product or quotient is the product or quotient of the moduli:

$$
\left\lvert \frac{(3 + 4i)(1 - 2i)}{2 + i}\right\rvert = \frac{\abs{3 + 4i}\,\abs{1 - 2i}}{\abs{2 + i}} = \frac{5\cdot\sqrt5}{\sqrt5} = 5 .
$$
:::
:::

::: exercise A principal argument {level=1 check="5*pi/6"}
Find $\Arg(-\sqrt3 + i)$.
::: solution
$\abs{-\sqrt3 + i} = 2$, so $-\sqrt 3 + i = 2\big(-\tfrac{\sqrt3}{2} + \tfrac12 i\big)$. We need $\cos\theta = -\tfrac{\sqrt3}2$ and $\sin\theta = \tfrac12$ with $\theta \in (-\pi, \pi]$; the point is in the second quadrant and $\theta = 5\pi/6$.
:::
:::

::: exercise A power by de Moivre {level=1 check="16"}
Compute $(1 + i)^8$.
::: solution
$1 + i = \sqrt2\,e^{i\pi/4}$, so $(1+i)^8 = (\sqrt 2)^8 e^{2\pi i} = 16$. (Alternatively $(1 + i)^2 = 2i$, so $(1+i)^8 = (2i)^4 = 16 i^4 = 16$.)
:::
:::

::: exercise Cube roots {level=2}
Find all solutions of $z^3 = -8i$ in the form $a + bi$, and mark them in the plane.
::: solution
$-8i = 8e^{-i\pi/2}$. By [[#thm-roots]] the solutions are $z_k = 2e^{i(-\pi/6 + 2\pi k/3)}$ for $k = 0, 1, 2$:

$$
z_0 = 2e^{-i\pi/6} = \sqrt 3 - i, \qquad z_1 = 2e^{i\pi/2} = 2i, \qquad z_2 = 2e^{7i\pi/6} = -\sqrt3 - i .
$$

They form an equilateral triangle inscribed in the circle $\abs z = 2$. Check: $(2i)^3 = 8i^3 = -8i$.
:::
:::

::: exercise A circle of Apollonius {level=2 check="4/3"}
Show that $\set{z : \abs{z - 1} = 2\abs{z + 1}}$ is a circle, and find its radius.
::: hint
Square both sides and write $z = x + iy$.
:::
::: solution
Squaring, $(x - 1)^2 + y^2 = 4\big((x + 1)^2 + y^2\big)$, which simplifies to $3x^2 + 10x + 3y^2 + 3 = 0$, that is, $x^2 + \tfrac{10}{3}x + y^2 + 1 = 0$. Completing the square,

$$
\Big(x + \frac53\Big)^2 + y^2 = \frac{25}{9} - 1 = \frac{16}{9}.
$$

This is the circle with centre $-\tfrac53$ and radius $\tfrac43$. (In general $\abs{z-p} = k\abs{z - q}$ with $k \neq 1$ is a circle, a "circle of Apollonius"; for $k = 1$ it is a line.)
:::
:::

::: exercise The product of the roots of unity {level=2 check="-1"}
Let $\omega = e^{2\pi i/n}$. Show that $\prod_{k=0}^{n-1}\omega^k = (-1)^{n+1}$, and evaluate it for $n = 6$.
::: solution
$\prod_{k=0}^{n-1}\omega^k = \omega^{0 + 1 + \dots + (n-1)} = \omega^{n(n-1)/2} = e^{i\pi(n-1)} = (-1)^{n-1} = (-1)^{n+1}$. For $n = 6$ the product is $-1$. (Alternatively: the roots of unity are the roots of $z^n - 1$, and the product of the roots of a monic polynomial of degree $n$ is $(-1)^n$ times its constant term, here $(-1)^n(-1) = (-1)^{n+1}$.)
:::
:::

::: exercise Stereographic height {level=2 check="1/3"}
The point $z = 1 + i$ is mapped by stereographic projection to a point of the sphere. What is its height $x_3$? More generally, show that $\abs z = R$ corresponds to the horizontal circle at height $\dfrac{R^2 - 1}{R^2 + 1}$.
::: solution
By [[#eq-stereo]], $x_3 = \dfrac{\abs z^2 - 1}{\abs z^2 + 1}$ depends only on $\abs z$. For $\abs{z} = R$ it equals $\dfrac{R^2 - 1}{R^2 + 1}$, and the first two coordinates $\dfrac{(2x, 2y)}{R^2 + 1}$ trace a circle as $z$ goes round $\abs z = R$. For $z = 1 + i$, $R^2 = 2$ and $x_3 = \tfrac13$.
:::
:::

::: exercise The parallelogram law {level=2}
Prove that $\abs{z + w}^2 + \abs{z - w}^2 = 2\abs z^2 + 2\abs w^2$ for all $z, w \in \C$, and interpret it geometrically.
::: solution
As in the proof of [[#thm-triangle]], $\abs{z \pm w}^2 = \abs z^2 \pm 2\operatorname{Re}(z\bar w) + \abs w^2$. Adding the two identities, the middle terms cancel and we get $2\abs z^2 + 2\abs w^2$. Geometrically: in a parallelogram, the sum of the squares of the diagonals ($z + w$ and $z - w$) equals the sum of the squares of the four sides.
:::
:::

::: exercise ℂ cannot be ordered {#exr-order level=3}
An **ordered field** is a field with a subset $P$ (the "positive" elements) such that for each $x$ exactly one of $x \in P$, $x = 0$, $-x \in P$ holds, and $P$ is closed under addition and multiplication. Prove that $\C$ is not an ordered field.
::: hint
Show first that in an ordered field every non-zero square lies in $P$.
:::
::: solution
Suppose $P \subset \C$ has the stated properties. If $x \neq 0$ then either $x \in P$ or $-x \in P$; in both cases $x^2 = x\cdot x = (-x)(-x) \in P$ because $P$ is closed under multiplication. So every non-zero square is in $P$. In particular $1 = 1^2 \in P$ and $-1 = i^2 \in P$. But then both $1$ and $-1$ are in $P$, contradicting the requirement that exactly one of $x \in P$, $x = 0$, $-x\in P$ holds for $x = 1$. Hence no such $P$ exists.
:::
:::

::: exercise A preview of disc automorphisms {level=3}
Let $\abs a < 1$. Prove that for every $z$ with $\abs z < 1$,

$$
\left\lvert \frac{z - a}{1 - \bar a z}\right\rvert < 1,
$$

and that equality $\left\lvert \frac{z - a}{1 - \bar a z}\right\rvert = 1$ holds when $\abs z = 1$.
::: hint
Expand $\abs{1 - \bar a z}^2 - \abs{z - a}^2$ using $\abs u^2 = u \bar u$.
:::
::: solution
First, $1 - \bar a z \neq 0$ because $\abs{\bar a z} = \abs a\abs z < 1$, so the quotient is defined for $\abs z \le 1$. Expanding,

$$
\begin{aligned}
\abs{1 - \bar a z}^2 - \abs{z - a}^2 &= (1 - \bar a z)(1 - a \bar z) - (z - a)(\bar z - \bar a) \\
&= 1 - a\bar z - \bar a z + \abs a^2\abs z^2 - \abs z^2 + a\bar z + \bar a z - \abs a^2 \\
&= (1 - \abs a^2)(1 - \abs z^2).
\end{aligned}
$$

If $\abs z < 1$ the right-hand side is positive, so $\abs{z - a} < \abs{1 - \bar a z}$, which is the claim. If $\abs z = 1$ it is zero, giving equality. So the map $z \mapsto (z - a)/(1 - \bar a z)$ sends the unit disc into itself and the unit circle onto itself; in [[complex-analysis/conformal-maps]] we will see that these maps are exactly the conformal self-maps of the disc, up to rotation.
:::
:::

::: exercise Sums of cosines {level=3}
Use the roots of unity to prove that for every integer $n \ge 2$,

$$
\sum_{k=0}^{n-1} \cos\frac{2\pi k}{n} = 0 \qquad\text{and}\qquad \sum_{k=0}^{n-1}\sin\frac{2\pi k}{n} = 0 ,
$$

and deduce the value of $\cos\frac{2\pi}{5} + \cos\frac{4\pi}{5}$.
::: solution
With $\omega = e^{2\pi i/n}$ we showed $\sum_{k=0}^{n-1}\omega^k = 0$. By de Moivre $\omega^k = \cos\frac{2\pi k}{n} + i\sin\frac{2\pi k}{n}$, and taking real and imaginary parts of the sum gives both identities. For $n = 5$, the real part reads

$$
1 + \cos\tfrac{2\pi}{5} + \cos\tfrac{4\pi}{5} + \cos\tfrac{6\pi}{5} + \cos\tfrac{8\pi}{5} = 0 .
$$

Since $\cos\frac{8\pi}{5} = \cos\frac{2\pi}{5}$ and $\cos\frac{6\pi}{5} = \cos\frac{4\pi}5$ (because $\cos(2\pi - t) = \cos t$), this is $1 + 2\big(\cos\frac{2\pi}5 + \cos\frac{4\pi}5\big) = 0$, so $\cos\frac{2\pi}5 + \cos\frac{4\pi}5 = -\tfrac12$.
:::
:::
