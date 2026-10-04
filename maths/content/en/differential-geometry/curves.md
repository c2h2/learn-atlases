A spiral staircase, a strand of DNA, a roller-coaster track and the path of a charged particle in a magnetic field all trace curves in space, and we can describe how each of them bends and twists. At every point a smooth curve has a direction; **curvature** measures how fast that direction turns, and **torsion** measures how fast the curve twists out of the plane in which it is momentarily bending. The main theorem of this chapter says that these two functions of arc length are a complete description: two curves with the same curvature and torsion differ only by a rigid motion of space. Shape, for curves, is exactly curvature plus torsion.

In [[multivariable/vector-functions]] we met arc length and the curvature $\kappa = \norm{\mathbf{r}'\times\mathbf{r}''}/\norm{\mathbf{r}'}^3$ as tools for describing motion. Here we take the geometric point of view: we ask which properties belong to the curve itself rather than to the way it is parametrised, introduce the **signed curvature** of plane curves and the **Frenet frame** of space curves, prove the **Frenet–Serret formulas**, and use them to prove theorems — that a curve with zero torsion is planar, that curvature and torsion determine a curve, and more in the exercises. Throughout, *smooth* means infinitely differentiable, and we use the linear algebra of $\R^3$ from [[multivariable/vectors-geometry]].

## Parametrised curves and regularity

::: definition Parametrised and regular curves {#def-regular-curve}
A **parametrised curve** is a smooth map $\boldsymbol\gamma\colon I\to\R^n$ from an open interval $I\subseteq\R$, with $n = 2$ (a **plane curve**) or $n = 3$ (a **space curve**). Its image $\boldsymbol\gamma(I)$ is the **trace** of the curve. The curve is **regular** if its velocity never vanishes: $\boldsymbol\gamma'(t) \ne \mathbf{0}$ for all $t\in I$. It is **unit-speed** if $\norm{\boldsymbol\gamma'(t)} = 1$ for all $t$.
:::

A curve is a *map*, not a set: the circle traversed once and the circle traversed twice have the same trace but are different curves. Regularity is a condition on the map, and it is exactly what is needed for the curve to have a well-defined tangent line $\boldsymbol\gamma(t) + \lambda\boldsymbol\gamma'(t)$ at every point.

The helix $\boldsymbol\gamma(t) = (a\cos t, a\sin t, bt)$ with $a > 0$ is regular, since $\norm{\boldsymbol\gamma'(t)} = \sqrt{a^2 + b^2} > 0$. The **semicubical parabola** $\boldsymbol\gamma(t) = (t^2, t^3)$ is smooth but not regular: $\boldsymbol\gamma'(0) = \mathbf{0}$, and the trace has a cusp at the origin. Non-regularity does not always show in the trace, however — $(t^3, t^3)$ is a non-regular parametrisation of a perfectly straight line.

::: warning A smooth map can have a corner
Smoothness of the map $\boldsymbol\gamma$ does not make its trace look smooth. Let $\varphi(t) = e^{-1/t}$ for $t > 0$ and $\varphi(t) = 0$ for $t\le0$; this function is infinitely differentiable, with every derivative zero at $t = 0$. The curve $\boldsymbol\gamma(t) = \bigl(\varphi(t) - \varphi(-t),\ \varphi(t) + \varphi(-t)\bigr)$ is smooth, but its trace is the graph of $y = \abs{x}$ near the origin, corner and all. The curve slows down to a stop at the corner ($\boldsymbol\gamma'(0) = \mathbf{0}$), turns, and sets off again. Regularity is precisely the hypothesis that rules this out, and it will be assumed from now on.
:::

The same trace can be traversed at different rates. A **reparametrisation** of $\boldsymbol\gamma\colon I\to\R^n$ is a curve $\tilde{\boldsymbol\gamma} = \boldsymbol\gamma\circ\phi\colon J\to\R^n$, where $\phi\colon J\to I$ is a smooth bijection between open intervals whose inverse is also smooth; equivalently (by the inverse function theorem in one variable) $\phi$ is a smooth bijection with $\phi' \ne 0$ everywhere. If $\phi' > 0$ the reparametrisation **preserves orientation**, otherwise it reverses it. By the chain rule $\tilde{\boldsymbol\gamma}'(u) = \phi'(u)\,\boldsymbol\gamma'(\phi(u))$, so reparametrisations of regular curves are regular. Geometric quantities are those that do not change (or at most change sign) under reparametrisation.

The most important example is arc length. For a regular curve, $s(t) = \int_{t_0}^t\norm{\boldsymbol\gamma'(u)}\,du$ is the length of the curve from $\boldsymbol\gamma(t_0)$ to $\boldsymbol\gamma(t)$ (see [[multivariable/vector-functions#def-arc-length]], where it is also shown that length does not depend on the parametrisation).

::: proposition Unit-speed reparametrisation {#prop-unit-speed}
A parametrised curve has a unit-speed reparametrisation if and only if it is regular. If $\boldsymbol\gamma$ is regular, the arc length function $s$ is an orientation-preserving change of parameter, and any two unit-speed reparametrisations $\tilde{\boldsymbol\gamma}$, $\hat{\boldsymbol\gamma}$ of $\boldsymbol\gamma$ are related by $\hat{\boldsymbol\gamma}(u) = \tilde{\boldsymbol\gamma}(\pm u + c)$ for a constant $c$.
:::

::: proof
Suppose $\boldsymbol\gamma$ is regular. Then $s'(t) = \norm{\boldsymbol\gamma'(t)} = \sqrt{\boldsymbol\gamma'\cdot\boldsymbol\gamma'}$ is smooth (the square root is smooth on $(0,\infty)$) and positive, so $s$ is a smooth strictly increasing bijection from $I$ onto an open interval $J$, whose inverse $t = t(s)$ is smooth with $t'(s) = 1/s'(t(s))$. The curve $\tilde{\boldsymbol\gamma}(s) = \boldsymbol\gamma(t(s))$ satisfies $\norm{\tilde{\boldsymbol\gamma}'(s)} = \norm{\boldsymbol\gamma'(t)}\,t'(s) = 1$.

Conversely, if $\tilde{\boldsymbol\gamma} = \boldsymbol\gamma\circ\phi$ is unit-speed, then $1 = \norm{\tilde{\boldsymbol\gamma}'(u)} = \abs{\phi'(u)}\,\norm{\boldsymbol\gamma'(\phi(u))}$, so $\boldsymbol\gamma'$ is non-zero at $\phi(u)$ for every $u$; since $\phi$ is onto $I$, $\boldsymbol\gamma$ is regular.

Finally, if $\hat{\boldsymbol\gamma} = \tilde{\boldsymbol\gamma}\circ\psi$ with both curves unit-speed, the same computation gives $\abs{\psi'} = 1$; as $\psi'$ is continuous and never zero, $\psi' \equiv 1$ or $\psi'\equiv -1$, so $\psi(u) = \pm u + c$.
:::

So a regular curve has an essentially canonical parameter, arc length, determined up to a choice of starting point and direction. We use $s$ for a unit-speed parameter and develop the theory for unit-speed curves; for computations we then derive formulas valid for any regular parametrisation, because explicit arc-length parametrisations are rare — for an ellipse, arc length is an elliptic integral.

::: example The catenary by arc length {#ex-catenary}
Reparametrise the catenary $\boldsymbol\gamma(t) = (t, \cosh t)$ by arc length measured from its lowest point.
::: solution
$\boldsymbol\gamma'(t) = (1, \sinh t)$ has length $\sqrt{1 + \sinh^2 t} = \cosh t$, so $s(t) = \int_0^t\cosh u\,du = \sinh t$, a bijection $\R\to\R$ with inverse $t = \operatorname{arsinh} s$. Since $\cosh(\operatorname{arsinh}s) = \sqrt{1 + s^2}$,

$$
\tilde{\boldsymbol\gamma}(s) = \left(\operatorname{arsinh} s,\ \sqrt{1 + s^2}\right).
$$

Check: $\tilde{\boldsymbol\gamma}'(s) = \left(\dfrac{1}{\sqrt{1+s^2}},\ \dfrac{s}{\sqrt{1+s^2}}\right)$ has length $1$. We return to this curve in [[#exr-catenary]].
:::
:::

::: quiz
Which of these parametrised curves are regular? (Select all that apply.)
- [x] $(\cos t, \sin t)$, $t\in\R$
- [ ] $(t - \sin t,\ 1 - \cos t)$, $t\in\R$ (the cycloid)
- [ ] $(t^3, t^3)$, $t\in\R$
- [x] $(t, t^2, t^3)$, $t\in\R$
::: solution
The circle has speed $1$ and the twisted cubic has velocity $(1, 2t, 3t^2)\ne\mathbf{0}$. The cycloid has velocity $(1 - \cos t, \sin t)$, which vanishes at $t = 2\pi k$, where the trace has cusps. The curve $(t^3, t^3)$ has zero velocity at $t = 0$, even though its trace is a straight line: regularity is a property of the parametrisation.
:::
:::

## Curvature

For a unit-speed curve, $\mathbf{T}(s) = \boldsymbol\gamma'(s)$ is the **unit tangent vector**. Its rate of change measures how fast the direction of the curve turns per unit length travelled.

::: definition Curvature {#def-curvature}
The **curvature** of a unit-speed curve $\boldsymbol\gamma$ at $s$ is $\kappa(s) = \norm{\mathbf{T}'(s)} = \norm{\boldsymbol\gamma''(s)}$. The curvature of a regular curve at a point is the curvature of any unit-speed reparametrisation at the corresponding point; where $\kappa > 0$, the number $1/\kappa$ is the **radius of curvature**.
:::

The definition is consistent: by [[#prop-unit-speed]] two unit-speed reparametrisations differ by $u\mapsto\pm u + c$, which changes $\boldsymbol\gamma''$ by the factor $(\pm1)^2 = 1$. A circle of radius $r$, $\boldsymbol\gamma(s) = (r\cos(s/r), r\sin(s/r))$, has $\norm{\boldsymbol\gamma''} = 1/r$: small circles bend sharply. And a curve has zero curvature everywhere exactly when it is (part of) a straight line, since $\boldsymbol\gamma'' \equiv\mathbf{0}$ integrates to $\boldsymbol\gamma(s) = \mathbf{a} + s\mathbf{b}$.

Since $\mathbf{T}\cdot\mathbf{T} = 1$, differentiating gives $2\,\mathbf{T}'\cdot\mathbf{T} = 0$: the vector $\mathbf{T}'$ is always perpendicular to the curve. In the plane there are only two unit vectors perpendicular to $\mathbf{T}$, which lets us give the curvature a sign.

## Plane curves and signed curvature

Let $J$ denote rotation of the plane by $+\pi/2$, so $J(a, b) = (-b, a)$. For a unit-speed plane curve, the **signed unit normal** $\mathbf{n}_s = J\mathbf{T}$ is obtained by rotating the tangent anticlockwise, and $(\mathbf{T}, \mathbf{n}_s)$ is a positively oriented orthonormal basis at each point.

::: definition Signed curvature {#def-signed-curvature}
The **signed curvature** $\kappa_s$ of a unit-speed plane curve is defined by

$$
\mathbf{T}'(s) = \kappa_s(s)\,\mathbf{n}_s(s).
$$

Thus $\abs{\kappa_s} = \kappa$, and $\kappa_s > 0$ where the curve turns to the left (anticlockwise), $\kappa_s < 0$ where it turns to the right.
:::

Reversing the direction of travel changes the sign of $\kappa_s$ (both $\mathbf{T}$ and $\mathbf{n}_s$ flip, but $\mathbf{T}'$ does not). The signed curvature has a beautiful interpretation as a rate of turning.

::: proposition The turning angle {#prop-turning-angle}
Let $\boldsymbol\gamma\colon I\to\R^2$ be a unit-speed curve. There is a smooth function $\theta\colon I\to\R$ with $\mathbf{T}(s) = (\cos\theta(s), \sin\theta(s))$ for all $s$; it is unique up to adding a constant multiple of $2\pi$, and

$$
\theta'(s) = \kappa_s(s).
$$
:::

::: proof
Identify $\R^2$ with $\C$ and write $w(s) = T_1(s) + iT_2(s)$, so $\abs{w} = 1$. Then $\bar w\,w' = (T_1T_1' + T_2T_2') + i(T_1T_2' - T_2T_1')$, and the real part is $\tfrac12(\abs{w}^2)' = 0$. Define the real function $\omega = T_1T_2' - T_2T_1'$, so that $\bar w w' = i\omega$ and hence $w' = i\omega w$ (multiply by $w$, using $w\bar w = 1$). Fix $s_0\in I$, choose $\theta_0$ with $w(s_0) = e^{i\theta_0}$ and put $\theta(s) = \theta_0 + \int_{s_0}^s\omega$. Then $z = w\,e^{-i\theta}$ satisfies $z' = (w' - i\theta' w)e^{-i\theta} = 0$, so $z\equiv z(s_0) = 1$ and $w = e^{i\theta}$, i.e. $\mathbf{T} = (\cos\theta, \sin\theta)$.

Differentiating, $\mathbf{T}' = \theta'(-\sin\theta, \cos\theta) = \theta'\,J\mathbf{T} = \theta'\,\mathbf{n}_s$, so $\theta' = \kappa_s$. If $\tilde\theta$ is another continuous angle function, $(\tilde\theta - \theta)/2\pi$ is a continuous integer-valued function on an interval, hence constant by the intermediate value theorem.
:::

So the signed curvature is the rate at which the tangent direction rotates, in radians per unit length. For a closed curve the total turning $\int\kappa_s\,ds = \theta(\text{end}) - \theta(\text{start})$ is a multiple of $2\pi$; Hopf's *Umlaufsatz* (1935) says it is exactly $\pm2\pi$ for a simple closed curve — you turn through one full revolution walking once around any simple loop.

For computations, we need $\kappa_s$ in an arbitrary parametrisation.

::: proposition Signed curvature in any parametrisation {#prop-signed-formula}
If $\boldsymbol\gamma(t) = (x(t), y(t))$ is a regular plane curve, its signed curvature (with respect to the orientation of increasing $t$) is

$$
\kappa_s = \frac{x'y'' - x''y'}{\left(x'^2 + y'^2\right)^{3/2}}.
$$
:::

::: proof
Let $v = \norm{\boldsymbol\gamma'} = ds/dt$. Then $\boldsymbol\gamma' = v\mathbf{T}$ and, by the chain rule and the definition of $\kappa_s$, $\boldsymbol\gamma'' = v'\mathbf{T} + v\,\dfrac{d\mathbf{T}}{ds}\,v = v'\mathbf{T} + v^2\kappa_s\mathbf{n}_s$. The determinant of the matrix with columns $\boldsymbol\gamma', \boldsymbol\gamma''$ is therefore

$$
x'y'' - x''y' = \det(v\mathbf{T},\ v'\mathbf{T} + v^2\kappa_s\mathbf{n}_s) = v^3\kappa_s\det(\mathbf{T}, \mathbf{n}_s) = v^3\kappa_s,
$$

because $(\mathbf{T}, \mathbf{n}_s)$ is a positively oriented orthonormal basis. Divide by $v^3 = (x'^2 + y'^2)^{3/2}$.
:::

For a graph $y = f(x)$, parametrised by $x$, this gives $\kappa_s = f''/(1 + f'^2)^{3/2}$, positive where the graph is convex.

::: example The curvature of an ellipse {#ex-ellipse}
Find the signed curvature of the ellipse $\boldsymbol\gamma(t) = (a\cos t, b\sin t)$, $a > b > 0$, and the points where it is largest and smallest.
::: solution
Here $x' = -a\sin t$, $y' = b\cos t$, $x'' = -a\cos t$, $y'' = -b\sin t$, so $x'y'' - x''y' = ab\sin^2 t + ab\cos^2 t = ab$ and

$$
\kappa_s(t) = \frac{ab}{\left(a^2\sin^2t + b^2\cos^2t\right)^{3/2}} > 0 .
$$

The ellipse is traversed anticlockwise, so it always turns left. The denominator is smallest at $t = 0, \pi$ (the ends of the major axis), where $\kappa_s = ab/b^3 = a/b^2$, and largest at $t = \pm\pi/2$ (the ends of the minor axis), where $\kappa_s = b/a^2$. For $a = 2$, $b = 1$ the curvature ranges from $\tfrac14$ to $2$. Points where $\kappa_s' = 0$ are called **vertices**; the ellipse has exactly four.
:::
:::

::: widget curvature
fx: 2cos(t)
fy: sin(t)
t: 0, 2pi
at: 0.5
x: -3.5, 3.5
y: -2.5, 2.5
caption: The ellipse $(2\cos t, \sin t)$ with its osculating circle, the circle of radius $1/\kappa$ centred at $\boldsymbol\gamma + \frac{1}{\kappa}\mathbf{n}_s$ that best fits the curve. Move the point: the circle has radius $\tfrac12$ at the ends of the major axis ($\kappa = 2$) and radius $4$ at the ends of the minor axis ($\kappa = \tfrac14$). These four extremes are the vertices; the four vertex theorem says that every simple closed curve has at least four.
:::

The signed curvature determines a plane curve completely.

::: theorem Fundamental theorem of plane curves {#thm-plane-fundamental}
Let $k\colon I\to\R$ be any smooth function on an open interval. Then there is a unit-speed curve $\boldsymbol\gamma\colon I\to\R^2$ whose signed curvature is $k$. If $\tilde{\boldsymbol\gamma}$ is another such curve, then $\tilde{\boldsymbol\gamma} = R\boldsymbol\gamma + \mathbf{b}$ for a rotation $R$ and a vector $\mathbf{b}$.
:::

::: proof
*Existence.* Fix $s_0\in I$ and put $\theta(s) = \int_{s_0}^s k(u)\,du$ and

$$
\boldsymbol\gamma(s) = \left(\int_{s_0}^s\cos\theta(u)\,du,\ \int_{s_0}^s\sin\theta(u)\,du\right).
$$

Then $\boldsymbol\gamma' = (\cos\theta, \sin\theta)$ has length $1$ and $\boldsymbol\gamma'' = \theta'(-\sin\theta, \cos\theta) = k\,J\boldsymbol\gamma'$, so the signed curvature is $k$.

*Uniqueness.* Let $\tilde{\boldsymbol\gamma}$ be unit-speed with signed curvature $k$ and let $\tilde\theta$ be a turning angle for it ([[#prop-turning-angle]]). Then $\tilde\theta' = k = \theta'$, so $\tilde\theta = \theta + c$ for a constant $c$. Let $R$ be rotation by $c$. Then $\tilde{\boldsymbol\gamma}' = (\cos(\theta + c), \sin(\theta + c)) = R\boldsymbol\gamma'$, so $(\tilde{\boldsymbol\gamma} - R\boldsymbol\gamma)' = \mathbf{0}$ and $\tilde{\boldsymbol\gamma} - R\boldsymbol\gamma$ is a constant vector $\mathbf{b}$.
:::

A reflection reverses the sign of $\kappa_s$, so only orientation-preserving rigid motions appear. The constant function $k = 1/r$ gives $\theta = s/r$ and a circle of radius $r$; so by uniqueness *every* curve of constant non-zero curvature in the plane is an arc of a circle.

::: application Clothoids on roads and railways
A train moving from a straight track onto a circular curve of radius $r$ would feel the sideways acceleration jump from $0$ to $v^2/r$ if the curvature jumped from $0$ to $1/r$. Engineers therefore insert a **transition curve** whose curvature grows linearly with distance, $\kappa_s(s) = cs$. By [[#thm-plane-fundamental]] this determines the curve: $\theta = cs^2/2$ and $\boldsymbol\gamma(s) = \left(\int_0^s\cos\tfrac{cu^2}{2}\,du,\ \int_0^s\sin\tfrac{cu^2}{2}\,du\right)$, the **clothoid** or Euler spiral, given by Fresnel integrals. Motorway slip roads are laid out the same way: driving along a clothoid at constant speed, you turn the steering wheel at a constant rate.
:::

::: quiz
A unit-speed plane curve has turning angle $\theta(s) = 3s - s^2$. Where does it turn clockwise?
- [ ] Where $\theta(s) < 0$
- [x] Where $s > 3/2$
- [ ] Where $s < 3/2$
- [ ] Nowhere: a turning angle cannot decrease
::: solution
By [[#prop-turning-angle]], $\kappa_s = \theta' = 3 - 2s$, which is negative exactly when $s > 3/2$. Clockwise turning means $\kappa_s < 0$: the tangent rotates in the negative direction. The value of $\theta$ itself (the direction of travel) is irrelevant; only its rate of change matters.
:::
:::

## Space curves and the Frenet frame

In space, $\mathbf{T}'$ is perpendicular to $\mathbf{T}$ but may point in any of infinitely many directions, so curvature cannot be given a sign. Instead, where $\kappa > 0$, the direction of $\mathbf{T}'$ supplies a second preferred vector, and a third is determined by the first two.

::: definition The Frenet frame and torsion {#def-torsion}
Let $\boldsymbol\gamma$ be a unit-speed space curve with $\kappa(s) > 0$ for all $s$. Its **principal normal** and **binormal** are

$$
\mathbf{N} = \frac{\mathbf{T}'}{\kappa}, \qquad \mathbf{B} = \mathbf{T}\times\mathbf{N}.
$$

The vectors $\mathbf{T}, \mathbf{N}, \mathbf{B}$ form a positively oriented orthonormal basis at each point, the **Frenet frame**. The **torsion** $\tau(s)$ is defined by

$$
\mathbf{B}'(s) = -\tau(s)\,\mathbf{N}(s).
$$
:::

For the definition of torsion to make sense we must check that $\mathbf{B}'$ is a multiple of $\mathbf{N}$. Since $\mathbf{B}$ is a unit vector, $\mathbf{B}'\perp\mathbf{B}$. And $\mathbf{B}' = \mathbf{T}'\times\mathbf{N} + \mathbf{T}\times\mathbf{N}' = \kappa\,\mathbf{N}\times\mathbf{N} + \mathbf{T}\times\mathbf{N}' = \mathbf{T}\times\mathbf{N}'$, which is perpendicular to $\mathbf{T}$. Being perpendicular to both $\mathbf{T}$ and $\mathbf{B}$, $\mathbf{B}'$ is parallel to $\mathbf{N}$. The plane spanned by $\mathbf{T}$ and $\mathbf{N}$ is the **osculating plane**, the plane in which the curve is momentarily bending; its normal is $\mathbf{B}$, and $\abs{\tau} = \norm{\mathbf{B}'}$ is the rate at which the osculating plane rotates. (The minus sign in $\mathbf{B}' = -\tau\mathbf{N}$ is a convention, chosen so that right-handed helices have positive torsion; some books use the opposite sign.)

::: theorem Frenet–Serret formulas {#thm-frenet}
For a unit-speed curve with $\kappa > 0$,

$$
\mathbf{T}' = \kappa\mathbf{N}, \qquad \mathbf{N}' = -\kappa\mathbf{T} + \tau\mathbf{B}, \qquad \mathbf{B}' = -\tau\mathbf{N};
$$

in matrix form, with the frame vectors as rows,

$$
\begin{pmatrix}\mathbf{T}\\ \mathbf{N}\\ \mathbf{B}\end{pmatrix}' = \begin{pmatrix} 0 & \kappa & 0\\ -\kappa & 0 & \tau\\ 0 & -\tau & 0\end{pmatrix}\begin{pmatrix}\mathbf{T}\\ \mathbf{N}\\ \mathbf{B}\end{pmatrix}.
$$ {#eq-frenet}
:::

::: proof
The first and third formulas are the definitions of $\mathbf{N}$ and $\tau$. For the second, write $\mathbf{N} = \mathbf{B}\times\mathbf{T}$ (true for any positively oriented orthonormal basis) and differentiate:

$$
\mathbf{N}' = \mathbf{B}'\times\mathbf{T} + \mathbf{B}\times\mathbf{T}' = -\tau\,\mathbf{N}\times\mathbf{T} + \kappa\,\mathbf{B}\times\mathbf{N} = \tau\mathbf{B} - \kappa\mathbf{T},
$$

using $\mathbf{N}\times\mathbf{T} = -\mathbf{B}$ and $\mathbf{B}\times\mathbf{N} = -\mathbf{T}$.
:::

The coefficient matrix is skew-symmetric, as it must be: differentiating the relations $\mathbf{T}\cdot\mathbf{N} = 0$ and so on shows that the derivative of an orthonormal frame, expressed in that frame, always has a skew-symmetric matrix.

::: intuition The frame as a spinning top
Walk along the curve at unit speed carrying the frame $(\mathbf{T}, \mathbf{N}, \mathbf{B})$. Its motion is an instantaneous rotation about the axis of the **Darboux vector** $\boldsymbol\omega = \tau\mathbf{T} + \kappa\mathbf{B}$: one checks directly from [[#eq-frenet]] that $\mathbf{T}' = \boldsymbol\omega\times\mathbf{T}$, $\mathbf{N}' = \boldsymbol\omega\times\mathbf{N}$ and $\mathbf{B}' = \boldsymbol\omega\times\mathbf{B}$. Curvature is the rate of spin about the binormal (yaw, turning within the osculating plane), torsion the rate of spin about the tangent (roll, twisting out of it). A plane curve only yaws; a helix yaws and rolls at constant rates.
:::

The Frenet formulas tell us what a curve looks like near a point. Applying Taylor's theorem to $\boldsymbol\gamma(s_0 + h)$ and using $\boldsymbol\gamma' = \mathbf{T}$, $\boldsymbol\gamma'' = \kappa\mathbf{N}$ and

$$
\boldsymbol\gamma''' = \kappa'\mathbf{N} + \kappa\mathbf{N}' = -\kappa^2\mathbf{T} + \kappa'\mathbf{N} + \kappa\tau\mathbf{B},
$$

we obtain the following.

::: proposition Local canonical form {#prop-canonical}
For a unit-speed curve with $\kappa(s_0) > 0$, with $\kappa, \tau, \mathbf{T}, \mathbf{N}, \mathbf{B}$ evaluated at $s_0$,

$$
\boldsymbol\gamma(s_0 + h) - \boldsymbol\gamma(s_0) = \Bigl(h - \frac{\kappa^2h^3}{6}\Bigr)\mathbf{T} + \Bigl(\frac{\kappa h^2}{2} + \frac{\kappa'h^3}{6}\Bigr)\mathbf{N} + \frac{\kappa\tau h^3}{6}\,\mathbf{B} + o(h^3).
$$
:::

::: proof
This is the third-order Taylor expansion $\boldsymbol\gamma(s_0 + h) = \boldsymbol\gamma + h\boldsymbol\gamma' + \frac{h^2}{2}\boldsymbol\gamma'' + \frac{h^3}{6}\boldsymbol\gamma''' + o(h^3)$, applied componentwise, with the derivatives expressed in the Frenet frame as above.
:::

In the frame at $s_0$, the curve projects onto the osculating plane approximately as the parabola $y = \tfrac{\kappa}{2}x^2$, onto the rectifying plane (spanned by $\mathbf{T}$ and $\mathbf{B}$) as the cubic $z = \tfrac{\kappa\tau}{6}x^3$, and onto the normal plane (spanned by $\mathbf{N}$ and $\mathbf{B}$) as a cusp. In particular, if $\tau(s_0) > 0$ the curve passes through its osculating plane from the side of $-\mathbf{B}$ to the side of $+\mathbf{B}$, twisting like a right-handed screw; if $\tau(s_0) < 0$, the other way.

::: example The circular helix {#ex-helix}
Compute the Frenet frame, curvature and torsion of the helix $\boldsymbol\gamma(t) = (a\cos t, a\sin t, bt)$, $a > 0$.
::: solution
The speed is $c = \sqrt{a^2 + b^2}$, so $s = ct$ and the unit-speed curve is $\boldsymbol\gamma(s) = (a\cos\frac sc, a\sin\frac sc, \frac{bs}{c})$. Writing $t = s/c$:

$$
\mathbf{T} = \frac1c(-a\sin t,\ a\cos t,\ b), \qquad \mathbf{T}' = -\frac{a}{c^2}(\cos t,\ \sin t,\ 0),
$$

so $\kappa = \dfrac{a}{a^2 + b^2}$ and $\mathbf{N} = (-\cos t, -\sin t, 0)$, which points horizontally towards the axis of the helix. Then

$$
\mathbf{B} = \mathbf{T}\times\mathbf{N} = \frac1c(b\sin t,\ -b\cos t,\ a), \qquad \mathbf{B}' = \frac{b}{c^2}(\cos t,\ \sin t,\ 0) = -\frac{b}{a^2+b^2}\,\mathbf{N},
$$

so $\tau = \dfrac{b}{a^2 + b^2}$. Both are constant. For $b > 0$ the helix is right-handed (like an ordinary screw) and $\tau > 0$; replacing $b$ by $-b$ gives its mirror image, a left-handed helix with $\tau < 0$. As $b\to0$ the helix flattens to a circle of curvature $1/a$, and as $a\to0$ it straightens to a line.
:::
:::

::: widget frenet
fx: cos(t)
fy: sin(t)
fz: b*t
t: 0, 4pi
sliders: b=0.3:-1:1:0.05
caption: The helix $(\cos t, \sin t, bt)$ with its moving frame $\mathbf{T}, \mathbf{N}, \mathbf{B}$. The principal normal always points straight at the axis. Move $b$: the curvature $1/(1+b^2)$ and torsion $b/(1+b^2)$ stay constant along the curve; torsion is largest at $b = 1$, vanishes at $b = 0$ (a circle, with constant binormal) and changes sign with the handedness of the helix.
:::

Most curves are not given by arc length, so we need formulas for an arbitrary regular parametrisation. The curvature formula is the one from [[multivariable/vector-functions#thm-curvature-formula]]; we derive it again together with the torsion.

::: theorem Curvature and torsion in any parametrisation {#thm-kappa-tau}
Let $\boldsymbol\gamma(t)$ be a regular space curve, with derivatives taken with respect to $t$. Then

$$
\kappa = \frac{\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}}{\norm{\boldsymbol\gamma'}^3},
$$

and wherever $\boldsymbol\gamma'\times\boldsymbol\gamma''\ne\mathbf{0}$ (that is, $\kappa\ne0$),

$$
\tau = \frac{(\boldsymbol\gamma'\times\boldsymbol\gamma'')\cdot\boldsymbol\gamma'''}{\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}^2}.
$$
:::

::: proof
Let $v = \norm{\boldsymbol\gamma'} = ds/dt$, so that $\boldsymbol\gamma' = v\mathbf{T}$. Differentiating with respect to $t$ and using $d/dt = v\,d/ds$ and the Frenet formulas,

$$
\begin{aligned}
\boldsymbol\gamma'' &= v'\mathbf{T} + v^2\kappa\mathbf{N},\\
\boldsymbol\gamma''' &= v''\mathbf{T} + v'v\kappa\mathbf{N} + (v^2\kappa)'\mathbf{N} + v^3\kappa(-\kappa\mathbf{T} + \tau\mathbf{B}) = (v'' - v^3\kappa^2)\mathbf{T} + (3vv'\kappa + v^2\kappa')\mathbf{N} + v^3\kappa\tau\,\mathbf{B},
\end{aligned}
$$

where $\kappa' = d\kappa/dt$. (Where $\kappa = 0$ only the first line is needed, and it holds with any unit $\mathbf{N}$.) Hence $\boldsymbol\gamma'\times\boldsymbol\gamma'' = v\mathbf{T}\times(v'\mathbf{T} + v^2\kappa\mathbf{N}) = v^3\kappa\,\mathbf{B}$, whose length is $v^3\kappa$; this is the curvature formula. Next, since $\mathbf{B}$ is orthogonal to $\mathbf{T}$ and $\mathbf{N}$, $(\boldsymbol\gamma'\times\boldsymbol\gamma'')\cdot\boldsymbol\gamma''' = v^3\kappa\cdot v^3\kappa\tau = v^6\kappa^2\tau$, while $\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}^2 = v^6\kappa^2$. Dividing gives the torsion formula.
:::

The proof also shows that $\mathbf{B} = \dfrac{\boldsymbol\gamma'\times\boldsymbol\gamma''}{\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}}$ and $\mathbf{N} = \mathbf{B}\times\mathbf{T}$ in any orientation-preserving parametrisation, which is usually the quickest way to compute the frame.

::: example Viviani's curve {#ex-viviani}
**Viviani's curve** $\boldsymbol\gamma(t) = (1 + \cos t,\ \sin t,\ 2\sin\tfrac t2)$ is the intersection of the sphere $x^2 + y^2 + z^2 = 4$ with the cylinder $(x - 1)^2 + y^2 = 1$. Find its curvature and torsion at $t = 0$.
::: solution
First, $(1 + \cos t)^2 + \sin^2t + 4\sin^2\tfrac t2 = 2 + 2\cos t + 2(1 - \cos t) = 4$, so the curve does lie on the sphere. At $t = 0$:

$$
\boldsymbol\gamma' = \left(-\sin t,\ \cos t,\ \cos\tfrac t2\right) = (0, 1, 1), \quad \boldsymbol\gamma'' = \left(-\cos t,\ -\sin t,\ -\tfrac12\sin\tfrac t2\right) = (-1, 0, 0), \quad \boldsymbol\gamma''' = \left(\sin t,\ -\cos t,\ -\tfrac14\cos\tfrac t2\right) = \left(0, -1, -\tfrac14\right).
$$

Then $\boldsymbol\gamma'\times\boldsymbol\gamma'' = (1\cdot0 - 1\cdot0,\ 1\cdot(-1) - 0\cdot 0,\ 0\cdot 0 - 1\cdot(-1)) = (0, -1, 1)$, with $\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''} = \sqrt2$ and $\norm{\boldsymbol\gamma'} = \sqrt2$. By [[#thm-kappa-tau]],

$$
\kappa = \frac{\sqrt2}{(\sqrt2)^3} = \frac12, \qquad \tau = \frac{(0,-1,1)\cdot(0,-1,-\tfrac14)}{2} = \frac{1 - \tfrac14}{2} = \frac38 .
$$

The same computation for general $t$ gives $\kappa = \dfrac{\sqrt{13 + 3\cos t}}{(3 + \cos t)^{3/2}}$ and $\tau = \dfrac{6\cos(t/2)}{13 + 3\cos t}$, so the torsion changes sign at $t = \pi$ and $t = 3\pi$, the highest and lowest points $(0, 0, \pm2)$ of this figure-of-eight curve, which crosses itself at $(2, 0, 0)$ (where $t = 0$ and $t = 2\pi$).
:::
:::

Curvature and torsion are genuinely geometric: they do not depend on the position of the curve in space.

::: proposition Invariance under rigid motions {#prop-invariance}
Let $M(\mathbf{x}) = Q\mathbf{x} + \mathbf{b}$ with $Q$ an orthogonal matrix. Then $M\circ\boldsymbol\gamma$ has the same curvature as $\boldsymbol\gamma$, and the same torsion if $\det Q = 1$; if $\det Q = -1$ (a reflection is involved), the torsion changes sign.
:::

::: proof
$M\circ\boldsymbol\gamma$ is unit-speed with $(M\circ\boldsymbol\gamma)' = Q\mathbf{T}$ and $(M\circ\boldsymbol\gamma)'' = Q\mathbf{T}'$, whose length is $\kappa$ because $Q$ preserves lengths; its principal normal is $Q\mathbf{N}$. For orthogonal $Q$ one has $Q\mathbf{u}\times Q\mathbf{v} = (\det Q)\,Q(\mathbf{u}\times\mathbf{v})$, so the new binormal is $(\det Q)\,Q\mathbf{B}$, with derivative $(\det Q)\,Q\mathbf{B}' = -(\det Q)\,\tau\,Q\mathbf{N}$. Hence the new torsion is $(\det Q)\,\tau$.
:::

::: quiz
For a unit-speed curve with $\kappa > 0$, what does the torsion measure?
- [ ] The rate at which the tangent vector turns
- [x] The rate at which the osculating plane rotates about the tangent line
- [ ] The distance of the curve from its osculating plane
- [ ] The rate of change of the curvature
::: solution
$\abs{\tau} = \norm{\mathbf{B}'}$, and $\mathbf{B}$ is the normal to the osculating plane, so $\abs\tau$ is the rate at which that plane turns; since $\mathbf{B}' = -\tau\mathbf{N}$ is perpendicular to $\mathbf{T}$, the plane rotates about the tangent line. The rate of turning of the tangent is the curvature. The curve does leave its osculating plane, but only to third order, with coefficient $\kappa\tau/6$ ([[#prop-canonical]]).
:::
:::

::: warning The Frenet frame needs κ > 0
Where $\kappa = 0$ the principal normal is undefined, and it can jump. Let $\varphi(t) = e^{-1/t^2}$ for $t\ne0$ and $\varphi(0) = 0$, and let $\boldsymbol\gamma(t) = (t, \varphi(t), 0)$ for $t\ge0$ and $\boldsymbol\gamma(t) = (t, 0, \varphi(t))$ for $t < 0$. This is a smooth regular curve. Wherever its torsion is defined it is zero, because each half lies in a plane — yet the curve is not planar: one half lies in the $xy$-plane and the other in the $xz$-plane. The curvature vanishes at $t = 0$, where the osculating plane jumps through a right angle. Results such as [[#thm-planar]] below require $\kappa > 0$ everywhere.
:::

## Curves determined by curvature and torsion

The Frenet formulas turn geometric questions about curves into questions about the functions $\kappa$ and $\tau$. Here are the two most basic.

::: theorem Curves with zero torsion {#thm-planar}
Let $\boldsymbol\gamma$ be a unit-speed space curve with $\kappa > 0$ everywhere. Then $\boldsymbol\gamma$ lies in a plane if and only if $\tau\equiv0$.
:::

::: proof
Suppose $\tau\equiv0$. Then $\mathbf{B}' = \mathbf{0}$, so $\mathbf{B}$ is a constant unit vector $\mathbf{B}_0$, and $(\boldsymbol\gamma\cdot\mathbf{B}_0)' = \mathbf{T}\cdot\mathbf{B}_0 = 0$. So $\boldsymbol\gamma\cdot\mathbf{B}_0$ is a constant $c$ and the curve lies in the plane $\mathbf{x}\cdot\mathbf{B}_0 = c$.

Conversely, suppose $\boldsymbol\gamma\cdot\mathbf{u} = c$ for a unit vector $\mathbf{u}$. Differentiating twice gives $\mathbf{T}\cdot\mathbf{u} = 0$ and $\kappa\,\mathbf{N}\cdot\mathbf{u} = 0$, so $\mathbf{N}\cdot\mathbf{u} = 0$ since $\kappa > 0$. The only unit vectors orthogonal to both $\mathbf{T}$ and $\mathbf{N}$ are $\pm\mathbf{B}$, so $\mathbf{B} = \pm\mathbf{u}$ at each point; as $\mathbf{B}$ is continuous, the sign is constant. Hence $\mathbf{B}$ is constant, $\mathbf{B}' = \mathbf{0}$ and $\tau\equiv0$.
:::

::: proposition Constant curvature and zero torsion {#prop-circle}
A unit-speed curve with constant curvature $\kappa > 0$ and $\tau\equiv0$ is an arc of a circle of radius $1/\kappa$.
:::

::: proof
Let $\mathbf{c}(s) = \boldsymbol\gamma(s) + \frac1\kappa\mathbf{N}(s)$. By the Frenet formulas, $\mathbf{c}' = \mathbf{T} + \frac1\kappa(-\kappa\mathbf{T} + 0\cdot\mathbf{B}) = \mathbf{0}$, so $\mathbf{c}$ is a constant point and $\norm{\boldsymbol\gamma - \mathbf{c}} = 1/\kappa$. By [[#thm-planar]] the curve also lies in a plane, and a sphere meets a plane in a circle — here a circle of radius $1/\kappa$ centred at $\mathbf{c}$.
:::

The point $\boldsymbol\gamma + \frac1\kappa\mathbf{N}$ is the **centre of curvature** at each point of any curve; the proof shows it stays put only for circles.

We can now prove the central theorem: curvature and torsion form a complete set of invariants.

::: theorem Fundamental theorem of space curves {#thm-fundamental-curves}
Let $k, t\colon I\to\R$ be smooth functions on an open interval with $k > 0$. Then there is a unit-speed curve $\boldsymbol\gamma\colon I\to\R^3$ with curvature $k$ and torsion $t$. Any two such curves differ by a proper rigid motion: $\tilde{\boldsymbol\gamma} = Q\boldsymbol\gamma + \mathbf{b}$ with $Q$ a rotation ($Q\T Q = I$, $\det Q = 1$).
:::

::: proof
*Uniqueness.* Let $\boldsymbol\gamma$ and $\tilde{\boldsymbol\gamma}$ both have curvature $k$ and torsion $t$, and fix $s_0\in I$. There is a unique rotation $Q$ taking the positively oriented orthonormal frame of $\boldsymbol\gamma$ at $s_0$ to that of $\tilde{\boldsymbol\gamma}$ at $s_0$, and a translation $\mathbf{b}$ taking $Q\boldsymbol\gamma(s_0)$ to $\tilde{\boldsymbol\gamma}(s_0)$. By [[#prop-invariance]], $Q\boldsymbol\gamma + \mathbf{b}$ still has curvature $k$ and torsion $t$, so replacing $\boldsymbol\gamma$ by it we may assume the two curves have the same position and the same frame at $s_0$. Consider

$$
f(s) = \mathbf{T}\cdot\tilde{\mathbf{T}} + \mathbf{N}\cdot\tilde{\mathbf{N}} + \mathbf{B}\cdot\tilde{\mathbf{B}} .
$$

Using the Frenet formulas for both curves (with the same $k$ and $t$),

$$
\begin{aligned}
f' &= k\,\mathbf{N}\cdot\tilde{\mathbf{T}} + k\,\mathbf{T}\cdot\tilde{\mathbf{N}} + (-k\mathbf{T} + t\mathbf{B})\cdot\tilde{\mathbf{N}} + \mathbf{N}\cdot(-k\tilde{\mathbf{T}} + t\tilde{\mathbf{B}}) - t\,\mathbf{N}\cdot\tilde{\mathbf{B}} - t\,\mathbf{B}\cdot\tilde{\mathbf{N}} = 0,
\end{aligned}
$$

as the terms cancel in pairs. So $f\equiv f(s_0) = 3$. Each of the three dot products of unit vectors is at most $1$, so each equals $1$, which forces $\mathbf{T} = \tilde{\mathbf{T}}$ (and $\mathbf{N} = \tilde{\mathbf{N}}$, $\mathbf{B} = \tilde{\mathbf{B}}$) for all $s$. Then $(\boldsymbol\gamma - \tilde{\boldsymbol\gamma})' = \mathbf{0}$ and the curves agree at $s_0$, so they are equal.

*Existence.* Let $A(s)$ be the skew-symmetric matrix in [[#eq-frenet]] with $\kappa = k$ and $\tau = t$, and consider the linear system of differential equations $F' = AF$ for an unknown $3\times3$ matrix function $F(s)$, with $F(s_0) = I$. Linear systems with continuous coefficients have a unique solution on the whole interval $I$, and it is smooth ([[ode/linear-systems]], [[ode/existence-uniqueness]]). Let $\mathbf{T}, \mathbf{N}, \mathbf{B}$ be the rows of $F$. Since $A\T = -A$,

$$
(FF\T)' = AFF\T + FF\T A\T = A(FF\T) - (FF\T)A ,
$$

and the constant matrix $I$ solves the same linear equation $X' = AX - XA$ with the same value at $s_0$; by uniqueness $FF\T\equiv I$, so the rows are orthonormal for every $s$. Moreover $\det F$ is continuous with values $\pm1$ and equals $1$ at $s_0$, so $\det F\equiv1$ and $\mathbf{B} = \mathbf{T}\times\mathbf{N}$. Now put $\boldsymbol\gamma(s) = \int_{s_0}^s\mathbf{T}(u)\,du$. Then $\boldsymbol\gamma' = \mathbf{T}$ is a unit vector, $\boldsymbol\gamma'' = \mathbf{T}' = k\mathbf{N}$ with $k > 0$ and $\norm{\mathbf{N}} = 1$, so the curvature is $k$ and the principal normal is $\mathbf{N}$; the binormal is $\mathbf{T}\times\mathbf{N} = \mathbf{B}$, and $\mathbf{B}' = -t\mathbf{N}$ says that the torsion is $t$.
:::

::: corollary Curves of constant curvature and torsion {#cor-helix}
A unit-speed curve with constant curvature $\kappa > 0$ and constant torsion $\tau\ne0$ is part of a circular helix with radius $a = \kappa/(\kappa^2 + \tau^2)$ and pitch parameter $b = \tau/(\kappa^2 + \tau^2)$.
:::

::: proof
By [[#ex-helix]] the helix $(a\cos t, a\sin t, bt)$ with these values of $a$ and $b$ has curvature $a/(a^2 + b^2) = \kappa$ and torsion $b/(a^2 + b^2) = \tau$, since $a^2 + b^2 = 1/(\kappa^2 + \tau^2)$. By the uniqueness part of [[#thm-fundamental-curves]], every curve with the same constant curvature and torsion is obtained from it by a rigid motion.
:::

So helices are to space what circles are to the plane: the curves that look the same at every point. This is why they are everywhere in nature — any process that repeats the same twist at each step, like adding identical building blocks to a chain, produces a helix.

::: application Helices in biology
A protein's backbone can be described by discrete versions of curvature and torsion: the angles between successive bonds and the dihedral angles between successive bond planes. When these are the same at every residue, the discrete analogue of [[#cor-helix]] forces the chain into a helix — this is the geometric reason behind the α-helix, one of the two basic structural motifs of proteins. The DNA double helix is likewise built from identical repeating units, each related to the previous one by the same screw motion.
:::

::: widget frenet
fx: sin(t) + 2sin(2t)
fy: cos(t) - 2cos(2t)
fz: -sin(3t)
t: 0, 2pi
caption: A trefoil knot with its Frenet frame. Watch the binormal: it swings round as the osculating plane rotates, and the torsion changes sign several times. The total curvature $\int\kappa\,ds$ of this curve is about $4.44\pi$. Fenchel's theorem says every closed space curve has total curvature at least $2\pi$, and the Fáry–Milnor theorem that a knotted one needs more than $4\pi$: a knot must bend a lot.
:::

::: history
Space curves were first studied systematically by Alexis Clairaut, whose *Recherches sur les courbes à double courbure* (1731) treated curves in space as intersections of surfaces and introduced the idea that they curve in two ways at once. Through the eighteenth century curvature and the osculating plane were investigated by Euler and by Gaspard Monge and his school, and a student of Monge, Michel-Ange Lancret, proved at the start of the nineteenth century that curves whose tangents make a constant angle with a fixed direction are exactly those with $\tau/\kappa$ constant ([[#exr-lancret]]). The formulas of [[#thm-frenet]] were found independently by Jean Frédéric Frenet, in his 1847 doctoral thesis at Toulouse (published in 1852), and by Joseph Alfred Serret, who published them in 1851. The idea of studying a geometric object through a frame that moves with it was developed into a general method by Gaston Darboux in his lectures on surfaces (1887–1896) and by Élie Cartan in the twentieth century, whose *method of moving frames* is still a basic tool of differential geometry.
:::

## Where this leads

Curves reappear constantly in the rest of the course. A curve lying on a surface has its curvature vector split into a part normal to the surface, measured by the second fundamental form ([[differential-geometry/surface-curvature]]), and a part tangent to it, the geodesic curvature; curves with zero geodesic curvature are the geodesics, the "straightest" curves on a surface ([[differential-geometry/geodesics-gauss-bonnet]]). The integral of signed curvature around a closed plane curve, $2\pi$ for a simple loop, is the one-dimensional ancestor of the Gauss–Bonnet theorem. The existence proof of [[#thm-fundamental-curves]] is a first example of building geometry by solving differential equations ([[ode/linear-systems]]), and knotted curves such as the trefoil are classified by the algebraic topology of [[topology/fundamental-group]].

::: summary
- A parametrised curve is regular if $\boldsymbol\gamma'\ne\mathbf{0}$; exactly the regular curves can be reparametrised by arc length, uniquely up to $s\mapsto\pm s + c$ ([[#prop-unit-speed]]).
- For a unit-speed curve, $\kappa = \norm{\boldsymbol\gamma''}$ ([[#def-curvature]]). A plane curve has a signed curvature $\kappa_s$ with $\mathbf{T}' = \kappa_s J\mathbf{T}$; it is the rate of change of the turning angle ([[#prop-turning-angle]]), and it determines the curve up to rotation and translation ([[#thm-plane-fundamental]]).
- Where $\kappa > 0$ a space curve has the Frenet frame $\mathbf{T}, \mathbf{N} = \mathbf{T}'/\kappa, \mathbf{B} = \mathbf{T}\times\mathbf{N}$, and torsion defined by $\mathbf{B}' = -\tau\mathbf{N}$ ([[#def-torsion]]).
- Frenet–Serret: $\mathbf{T}' = \kappa\mathbf{N}$, $\mathbf{N}' = -\kappa\mathbf{T} + \tau\mathbf{B}$, $\mathbf{B}' = -\tau\mathbf{N}$ ([[#thm-frenet]]).
- In any parametrisation: $\kappa = \norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}/\norm{\boldsymbol\gamma'}^3$ and $\tau = (\boldsymbol\gamma'\times\boldsymbol\gamma'')\cdot\boldsymbol\gamma'''/\norm{\boldsymbol\gamma'\times\boldsymbol\gamma''}^2$ ([[#thm-kappa-tau]]). The helix $(a\cos t, a\sin t, bt)$ has $\kappa = a/(a^2+b^2)$, $\tau = b/(a^2+b^2)$.
- With $\kappa > 0$: $\tau\equiv0$ if and only if the curve is planar ([[#thm-planar]]); constant $\kappa$ and $\tau = 0$ give circles, constant $\kappa$ and constant $\tau\ne0$ give helices.
- Curvature and torsion determine a space curve up to a proper rigid motion, and any $\kappa > 0$, $\tau$ occur ([[#thm-fundamental-curves]]).
:::

## Exercises

::: exercise One turn of a helix {level=1 check="10*pi"}
Find the length of one turn, $0\le t\le2\pi$, of the helix $\boldsymbol\gamma(t) = (3\cos t, 3\sin t, 4t)$.
::: solution
$\boldsymbol\gamma'(t) = (-3\sin t, 3\cos t, 4)$ has constant length $\sqrt{9 + 16} = 5$, so the length is $\int_0^{2\pi}5\,dt = 10\pi$.
:::
:::

::: exercise Torsion of a helix {level=1 check="4/25"}
Find the torsion of the helix $(3\cos t, 3\sin t, 4t)$.
::: solution
By [[#ex-helix]] with $a = 3$, $b = 4$: $\tau = \dfrac{b}{a^2 + b^2} = \dfrac{4}{25}$ (and $\kappa = \dfrac{3}{25}$).
:::
:::

::: exercise A parabola {level=1 check="2/(5*sqrt(5))"}
Find the signed curvature of the parabola $y = x^2$, parametrised by $x$, at the point $(1, 1)$.
::: solution
By [[#prop-signed-formula]] for a graph, $\kappa_s = \dfrac{f''}{(1 + f'^2)^{3/2}} = \dfrac{2}{(1 + 4)^{3/2}} = \dfrac{2}{5\sqrt5}\approx0.179$.
:::
:::

::: exercise The logarithmic spiral {level=2 check="1/sqrt(2)"}
Find the curvature of the logarithmic spiral $\boldsymbol\gamma(t) = (e^t\cos t, e^t\sin t)$ at $t = 0$, and show that in general $\kappa = 1/s$, where $s = \sqrt2\,e^t$ is the arc length measured from the centre (the limit as $t\to-\infty$).
::: solution
$x' = e^t(\cos t - \sin t)$, $y' = e^t(\sin t + \cos t)$, $x'' = -2e^t\sin t$, $y'' = 2e^t\cos t$. Then $x'^2 + y'^2 = 2e^{2t}$ and $x'y'' - x''y' = 2e^{2t}(\cos^2t - \sin t\cos t) + 2e^{2t}(\sin^2 t + \sin t\cos t) = 2e^{2t}$, so

$$
\kappa_s = \frac{2e^{2t}}{(2e^{2t})^{3/2}} = \frac{1}{\sqrt2\,e^t},
$$

which is $\tfrac{1}{\sqrt2}$ at $t = 0$. The speed is $\sqrt2\,e^t$, so the arc length from $t = -\infty$ is $\int_{-\infty}^t\sqrt2\,e^u\,du = \sqrt2\,e^t = s$, and $\kappa = 1/s$.
:::
:::

::: exercise The twisted cubic {level=2 check="3"}
Find the torsion of the twisted cubic $\boldsymbol\gamma(t) = (t, t^2, t^3)$ at the origin.
::: solution
$\boldsymbol\gamma' = (1, 2t, 3t^2)$, $\boldsymbol\gamma'' = (0, 2, 6t)$, $\boldsymbol\gamma''' = (0, 0, 6)$, so $\boldsymbol\gamma'\times\boldsymbol\gamma'' = (6t^2, -6t, 2)$ and

$$
\tau = \frac{(6t^2, -6t, 2)\cdot(0,0,6)}{36t^4 + 36t^2 + 4} = \frac{3}{9t^4 + 9t^2 + 1},
$$

which is $3$ at $t = 0$. The torsion is positive everywhere, and tends to $0$ as $\abs{t}\to\infty$.
:::
:::

::: exercise A curve in disguise {level=2}
Show that the curve $\boldsymbol\gamma(t) = \left(t,\ \dfrac{1+t}{t},\ \dfrac{1-t^2}{t}\right)$, $t > 0$, lies in a plane, and find the plane.
::: solution
$\boldsymbol\gamma' = (1, -t^{-2}, -t^{-2} - 1)$, $\boldsymbol\gamma'' = (0, 2t^{-3}, 2t^{-3})$, $\boldsymbol\gamma''' = (0, -6t^{-4}, -6t^{-4})$. Then $\boldsymbol\gamma'\times\boldsymbol\gamma'' = \tfrac{2}{t^3}(1, -1, 1)\ne\mathbf{0}$, so $\kappa > 0$, and $(\boldsymbol\gamma'\times\boldsymbol\gamma'')\cdot\boldsymbol\gamma''' = \tfrac{2}{t^3}(0 + 6t^{-4} - 6t^{-4}) = 0$, so $\tau\equiv0$ and the curve is planar by [[#thm-planar]]. Its binormal is the constant $(1,-1,1)/\sqrt3$, and indeed $x - y + z = t - \frac{1+t}{t} + \frac{1-t^2}{t} = -1$: the curve lies in the plane $x - y + z = -1$.
:::
:::

::: exercise A curve from its curvature {#exr-catenary level=2}
Find, up to rotation and translation, the unit-speed plane curve with signed curvature $\kappa_s(s) = \dfrac{1}{1 + s^2}$, $s\in\R$, and identify it.
::: hint
Follow the existence proof of [[#thm-plane-fundamental]] with $\theta(s) = \arctan s$.
:::
::: solution
$\theta(s) = \int_0^s\frac{du}{1+u^2} = \arctan s$, so $\cos\theta = \dfrac{1}{\sqrt{1+s^2}}$ and $\sin\theta = \dfrac{s}{\sqrt{1+s^2}}$. Integrating, $\boldsymbol\gamma(s) = \left(\operatorname{arsinh}s,\ \sqrt{1+s^2}\right)$ up to a translation (we have added the constant $1$ to the second component). This is the catenary of [[#ex-catenary]], $y = \cosh x$. By uniqueness, every curve with this curvature function is congruent to the catenary.
:::
:::

::: exercise Lancret's theorem {#exr-lancret level=3}
Let $\boldsymbol\gamma$ be a unit-speed curve with $\kappa > 0$. Prove that $\tau/\kappa$ is constant if and only if there is a constant unit vector $\mathbf{u}$ such that $\mathbf{T}\cdot\mathbf{u}$ is constant. (Such curves are called **generalised helices**.)
::: hint
For one direction, try $\mathbf{u}$ proportional to $c\,\mathbf{T} + \mathbf{B}$ where $c = \tau/\kappa$.
:::
::: solution
Suppose $\mathbf{T}\cdot\mathbf{u} = \cos\alpha$ is constant. Differentiating, $\kappa\,\mathbf{N}\cdot\mathbf{u} = 0$, so $\mathbf{N}\cdot\mathbf{u} = 0$ and $\mathbf{u} = \cos\alpha\,\mathbf{T} + \sin\alpha\,\mathbf{B}$ (with a suitable choice of the sign of $\alpha$, since $\mathbf{u}$ is a unit vector in the span of $\mathbf{T}$ and $\mathbf{B}$). Differentiating again, $\mathbf{0} = \cos\alpha\,\kappa\mathbf{N} - \sin\alpha\,\tau\mathbf{N}$, so $\kappa\cos\alpha = \tau\sin\alpha$. Here $\sin\alpha\ne0$, for otherwise $\kappa\cos\alpha = 0$ with $\cos\alpha = \pm1$, contradicting $\kappa > 0$; hence $\tau/\kappa = \cot\alpha$ is constant.

Conversely, suppose $\tau = c\kappa$ with $c$ constant, and let $\mathbf{u} = (c\,\mathbf{T} + \mathbf{B})/\sqrt{1 + c^2}$, a unit vector. Then $\mathbf{u}' = (c\kappa\mathbf{N} - \tau\mathbf{N})/\sqrt{1 + c^2} = \mathbf{0}$, so $\mathbf{u}$ is constant, and $\mathbf{T}\cdot\mathbf{u} = c/\sqrt{1 + c^2}$ is constant.
:::
:::

::: exercise Curves on a sphere {level=3}
Let $\boldsymbol\gamma$ be a unit-speed curve with $\kappa > 0$ and $\tau\ne0$ lying on the sphere of radius $R$ centred at the origin. Writing $\rho = 1/\kappa$, prove that

$$
R^2 = \rho^2 + \left(\frac{\rho'}{\tau}\right)^2 .
$$
::: solution
Differentiate $\boldsymbol\gamma\cdot\boldsymbol\gamma = R^2$ repeatedly. First, $\boldsymbol\gamma\cdot\mathbf{T} = 0$. Next, $\mathbf{T}\cdot\mathbf{T} + \kappa\,\boldsymbol\gamma\cdot\mathbf{N} = 0$, so $\boldsymbol\gamma\cdot\mathbf{N} = -1/\kappa = -\rho$. Differentiating this, $\mathbf{T}\cdot\mathbf{N} + \boldsymbol\gamma\cdot(-\kappa\mathbf{T} + \tau\mathbf{B}) = -\rho'$; since $\mathbf{T}\cdot\mathbf{N} = 0$ and $\boldsymbol\gamma\cdot\mathbf{T} = 0$, we get $\tau\,\boldsymbol\gamma\cdot\mathbf{B} = -\rho'$, i.e. $\boldsymbol\gamma\cdot\mathbf{B} = -\rho'/\tau$. Expanding $\boldsymbol\gamma$ in the orthonormal frame,

$$
R^2 = \norm{\boldsymbol\gamma}^2 = (\boldsymbol\gamma\cdot\mathbf{T})^2 + (\boldsymbol\gamma\cdot\mathbf{N})^2 + (\boldsymbol\gamma\cdot\mathbf{B})^2 = 0 + \rho^2 + \left(\frac{\rho'}{\tau}\right)^2 .
$$

(For instance, a circle of latitude on the sphere has constant $\rho\le R$, and then $\rho' = 0$ forces $\rho = R$ unless $\tau = 0$: small circles have zero torsion, as they must.)
:::
:::

::: exercise Normals through a point {level=3}
Let $\boldsymbol\gamma$ be a unit-speed curve with $\kappa > 0$ such that all its normal lines $\boldsymbol\gamma(s) + \lambda\mathbf{N}(s)$, $\lambda\in\R$, pass through a fixed point $\mathbf{c}$. Prove that $\boldsymbol\gamma$ is an arc of a circle centred at $\mathbf{c}$.
::: solution
By hypothesis $\mathbf{c} = \boldsymbol\gamma(s) + \lambda(s)\mathbf{N}(s)$ for some function $\lambda$, which is smooth because $\lambda = (\mathbf{c} - \boldsymbol\gamma)\cdot\mathbf{N}$. Differentiating,

$$
\mathbf{0} = \mathbf{T} + \lambda'\mathbf{N} + \lambda(-\kappa\mathbf{T} + \tau\mathbf{B}) = (1 - \lambda\kappa)\mathbf{T} + \lambda'\mathbf{N} + \lambda\tau\mathbf{B} .
$$

The frame is a basis, so $\lambda\kappa = 1$, $\lambda' = 0$ and $\lambda\tau = 0$. Thus $\lambda$ is a non-zero constant, $\kappa = 1/\lambda$ is constant and $\tau\equiv0$. By [[#prop-circle]] the curve is an arc of a circle of radius $\abs\lambda$, and its centre $\boldsymbol\gamma + \frac1\kappa\mathbf{N}$ is $\mathbf{c}$.
:::
:::
