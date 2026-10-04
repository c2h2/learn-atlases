In [[multivariable/multiple-integrals]] we found that polar coordinates turn $dA$ into $r\,dr\,d\theta$, by a piece of geometry special to circles. But regions come in many shapes. The region between the hyperbolas $xy = 1$ and $xy = 4$ and the lines $y = x$ and $y = 4x$ is awkward in any of the coordinates we have met so far, yet in the coordinates $u = xy$, $v = y/x$ it is simply the square $[1,4]\times[1,4]$. To integrate over it we need to know how areas measured in the $(u,v)$-plane compare with areas in the $(x,y)$-plane.

The answer is one of the central results of multivariable calculus. A smooth map from one plane to another distorts areas, but near each point it looks like a linear map, and a linear map multiplies all areas by the same factor: the absolute value of its determinant. So the local area-scaling factor of a smooth map is the absolute value of the determinant of its derivative matrix — the **Jacobian**. The change of variables formula

$$
\iint_D f(x,y)\,dx\,dy = \iint_S f\bigl(x(u,v), y(u,v)\bigr)\,\abs{\frac{\partial(x,y)}{\partial(u,v)}}\,du\,dv
$$

is the multivariable version of integration by substitution, and it explains $r$ in polar coordinates, $\rho^2\sin\phi$ in spherical coordinates, and the transformation rule for probability densities. We assume familiarity with determinants ([[linear-algebra/determinants]]) and derivative matrices ([[multivariable/partial-derivatives]]).

## How linear maps change area

Let $A = \begin{pmatrix} a & b\\ c & d\end{pmatrix}$ and consider the linear map $T(u,v) = (au + bv,\ cu + dv)$. It sends the unit square with vertices $(0,0)$, $(1,0)$, $(0,1)$, $(1,1)$ to the parallelogram with vertices $\mathbf{0}$, $\mathbf{a}_1 = (a,c)$, $\mathbf{a}_2 = (b, d)$ and $\mathbf{a}_1 + \mathbf{a}_2$, spanned by the columns of $A$.

::: theorem Linear maps scale area by the determinant {#thm-det-area}
Let $A$ be a real $2\times2$ matrix, $\mathbf{p}\in\R^2$, and $T(\mathbf{u}) = A\mathbf{u} + \mathbf{p}$. For every rectangle $Q$ with sides parallel to the axes, $T(Q)$ is a parallelogram with

$$
\text{area}\bigl(T(Q)\bigr) = \abs{\det A}\;\text{area}(Q).
$$

Likewise, for a real $3\times3$ matrix $A$, an affine map $T(\mathbf{u}) = A\mathbf{u} + \mathbf{p}$ sends a box $Q$ to a parallelepiped of volume $\abs{\det A}\,\text{vol}(Q)$.
:::

::: proof
Let $Q = [u_0, u_0 + h]\times[v_0, v_0 + k]$. Every point of $Q$ is $(u_0 + sh,\ v_0 + tk)$ with $s, t\in[0,1]$, and by linearity

$$
T(u_0 + sh,\ v_0 + tk) = T(u_0, v_0) + s\,h\,\mathbf{a}_1 + t\,k\,\mathbf{a}_2 ,
$$

so $T(Q)$ is the parallelogram with a vertex at $T(u_0,v_0)$ and sides $h\mathbf{a}_1$ and $k\mathbf{a}_2$. Regard these as vectors in $\R^3$ with third component $0$. By [[multivariable/vectors-geometry#thm-cross-length]] the area of the parallelogram is

$$
\norm{h\mathbf{a}_1\times k\mathbf{a}_2} = hk\,\norm{(0,\,0,\,ad - bc)} = \abs{\det A}\,hk = \abs{\det A}\,\text{area}(Q).
$$

In three dimensions the image of the box with edges $h\mathbf{e}_1$, $k\mathbf{e}_2$, $l\mathbf{e}_3$ is the parallelepiped with edges $h\mathbf{a}_1$, $k\mathbf{a}_2$, $l\mathbf{a}_3$, whose volume is $\abs{\det[h\mathbf{a}_1, k\mathbf{a}_2, l\mathbf{a}_3]} = hkl\,\abs{\det A}$ by [[multivariable/vectors-geometry#thm-triple-product]] (the determinant of a matrix equals that of its transpose).
:::

Approximating a general region from inside and outside by finite unions of small rectangles, it follows that $\text{area}(T(D)) = \abs{\det A}\,\text{area}(D)$ for every region $D$ that has an area — discs, triangles, regions bounded by smooth curves. A linear map multiplies *all* areas by the same factor $\abs{\det A}$; if $\det A = 0$ it collapses the plane onto a line or a point, and if $\det A < 0$ it also reverses orientation, turning anticlockwise into clockwise.

::: corollary The area of a triangle {#cor-triangle-area}
The triangle with vertices $\mathbf{p}, \mathbf{q}, \mathbf{r}$ in the plane has area $\tfrac12\abs{\det(\mathbf{q} - \mathbf{p},\ \mathbf{r} - \mathbf{p})}$, where the determinant is that of the $2\times2$ matrix with these columns.
:::

::: proof
The affine map $T(u,v) = \mathbf{p} + u(\mathbf{q} - \mathbf{p}) + v(\mathbf{r} - \mathbf{p})$ has linear part $A = (\mathbf{q} - \mathbf{p},\ \mathbf{r} - \mathbf{p})$, so by [[#thm-det-area]] it maps the unit square onto a parallelogram of area $\abs{\det A}$. It maps the diagonal from $(1,0)$ to $(0,1)$ onto the diagonal from $\mathbf{q}$ to $\mathbf{r}$, and so maps the lower-left half of the square, the triangle with vertices $(0,0), (1,0), (0,1)$, onto the triangle $\mathbf{p}\mathbf{q}\mathbf{r}$. A diagonal cuts a parallelogram into two congruent triangles, so the area is $\tfrac12\abs{\det A}$.
:::

For instance, the triangle with vertices $(1,1)$, $(4,2)$ and $(2,5)$ has area $\tfrac12\abs{\det\begin{pmatrix}3 & 1\\ 1 & 4\end{pmatrix}} = \tfrac{11}{2}$. This is the determinant form of the "shoelace formula" for polygon areas, which reappears in [[multivariable/greens-theorem]].

::: widget transform2d
matrix: 2, 1; 1, 1.5
editable: true
animate: true
caption: The unit square and its image under the matrix $A$. Edit the entries and compare the area of the image parallelogram with $\det A$. Make the columns parallel (for instance $A = \begin{pmatrix}2&1\\4&2\end{pmatrix}$) and the parallelogram collapses: $\det A = 0$. Swap the columns and the determinant changes sign — the image is the same parallelogram traversed the other way round.
:::

::: quiz
The linear map with matrix $\begin{pmatrix} 2 & 1\\ 4 & 3\end{pmatrix}$ maps a disc of area $5$ to an ellipse. What is the area of the ellipse?
- [ ] $5$
- [x] $10$
- [ ] $30$
- [ ] $-10$
::: solution
$\det A = 2\cdot3 - 1\cdot4 = 2$, and a linear map multiplies every area by $\abs{\det A}$, so the area is $2\cdot5 = 10$. Areas are never negative; the sign of the determinant only records orientation.
:::
:::

## The Jacobian

Now let $T(u,v) = \bigl(x(u,v),\ y(u,v)\bigr)$ be a differentiable map. Near a point $(u_0, v_0)$ it is approximately affine:

$$
T(u_0 + \Delta u,\ v_0 + \Delta v) \approx T(u_0, v_0) + \Delta u\,T_u(u_0,v_0) + \Delta v\,T_v(u_0,v_0),
$$

where $T_u = (x_u, y_u)$ and $T_v = (x_v, y_v)$ are the columns of the derivative matrix $DT$ ([[multivariable/partial-derivatives#def-differentiable]]). So a small rectangle of sides $\Delta u$, $\Delta v$ is mapped to a small curvilinear quadrilateral that is very nearly the parallelogram spanned by $\Delta u\,T_u$ and $\Delta v\,T_v$, whose area is $\abs{\det DT}\,\Delta u\,\Delta v$ by [[#thm-det-area]].

::: definition Jacobian {#def-jacobian}
Let $T(u,v) = (x(u,v), y(u,v))$ have partial derivatives at a point. The **Jacobian matrix** of $T$ is $DT$, and its determinant

$$
J_T = \frac{\partial(x,y)}{\partial(u,v)} = \det\begin{pmatrix} x_u & x_v\\ y_u & y_v\end{pmatrix} = x_uy_v - x_vy_u
$$

is the **Jacobian determinant** (often simply "the Jacobian"). For $T(u,v,w) = (x,y,z)$ it is the $3\times3$ determinant $\dfrac{\partial(x,y,z)}{\partial(u,v,w)} = \det DT$.
:::

::: intuition The Jacobian as an exchange rate
Cover the $(u,v)$-plane with a fine grid of squares and push the grid forward by $T$. The grid lines become two families of curves in the $(x,y)$-plane and each small square becomes a small curved quadrilateral. The Jacobian is the exchange rate between the two kinds of area: where $\abs{J}$ is large, a square of parameter space covers a lot of the $(x,y)$-plane, so each unit of $du\,dv$ must be weighted heavily; where $\abs{J}$ is small, the image cells are crowded together. In polar coordinates the cells at radius $r$ have area about $r\,\Delta r\,\Delta\theta$ — far from the origin they are large, near it they shrink to nothing. A Riemann sum for $\iint_D f\,dA$ over the image cells is $\sum f\cdot(\text{cell area}) \approx \sum f(T(u,v))\,\abs{J}\,\Delta u\,\Delta v$, and that is the whole idea of the change of variables formula.
:::

$\abs{J_T}$ is the local area magnification of $T$: by the argument above,

$$
\text{area}\bigl(T(Q)\bigr) \approx \abs{J_T(u_0,v_0)}\;\text{area}(Q) \qquad\text{for small rectangles } Q \text{ at } (u_0,v_0).
$$ {#eq-local-area}

::: example The Jacobians of polar and spherical coordinates {#ex-jacobians}
Compute $\dfrac{\partial(x,y)}{\partial(r,\theta)}$ for $x = r\cos\theta$, $y = r\sin\theta$, and $\dfrac{\partial(x,y,z)}{\partial(\rho,\phi,\theta)}$ for spherical coordinates $x = \rho\sin\phi\cos\theta$, $y = \rho\sin\phi\sin\theta$, $z = \rho\cos\phi$.
::: solution
For polar coordinates,

$$
\frac{\partial(x,y)}{\partial(r,\theta)} = \det\begin{pmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{pmatrix} = r\cos^2\theta + r\sin^2\theta = r .
$$

For spherical coordinates, expand along the bottom row $(\cos\phi,\ -\rho\sin\phi,\ 0)$ of

$$
DT = \begin{pmatrix} \sin\phi\cos\theta & \rho\cos\phi\cos\theta & -\rho\sin\phi\sin\theta\\ \sin\phi\sin\theta & \rho\cos\phi\sin\theta & \rho\sin\phi\cos\theta\\ \cos\phi & -\rho\sin\phi & 0\end{pmatrix}.
$$

The cofactor of $\cos\phi$ is $\rho^2\sin\phi\cos\phi(\cos^2\theta + \sin^2\theta) = \rho^2\sin\phi\cos\phi$, and the cofactor of $-\rho\sin\phi$ is $-\rho\sin^2\phi(\cos^2\theta + \sin^2\theta) = -\rho\sin^2\phi$. Hence

$$
\frac{\partial(x,y,z)}{\partial(\rho,\phi,\theta)} = \cos\phi\cdot\rho^2\sin\phi\cos\phi + (-\rho\sin\phi)(-\rho\sin^2\phi) = \rho^2\sin\phi\,(\cos^2\phi + \sin^2\phi) = \rho^2\sin\phi .
$$

These are exactly the factors in [[multivariable/multiple-integrals#eq-polar]] and [[multivariable/multiple-integrals#eq-spherical]], now obtained without any special geometry.
:::
:::

The next figure shows a non-linear map in action: the map $(u,v)\mapsto(u^2 - v^2,\ 2uv)$, which in complex notation is $z\mapsto z^2$. Its Jacobian is $\det\begin{pmatrix}2u&-2v\\2v&2u\end{pmatrix} = 4(u^2 + v^2)$, so small squares far from the origin are enlarged a lot, while near the origin, where $J = 0$, areas are crushed.

::: widget complexmap
f: z^2
mode: grid
x: -1.5, 1.5
y: -1.5, 1.5
caption: The image of a square grid under $(u,v)\mapsto(u^2-v^2,\ 2uv)$. The grid squares become curvilinear quadrilaterals — still meeting at right angles — whose areas are about $4(u^2+v^2)$ times the original. Near the origin the Jacobian vanishes and the map folds the plane over itself (it is two-to-one), which is why change of variables requires a map that is one-to-one with non-zero Jacobian.
:::

Inverting a change of variables inverts the Jacobian.

::: theorem Jacobian of an inverse map {#thm-inverse-jacobian}
Let $T$ be a $C^1$ map from an open set $U\subseteq\R^2$ onto an open set $V$ with a $C^1$ inverse $S\colon V\to U$. Then for every $\mathbf{p}\in U$, $J_T(\mathbf{p}) \ne 0$ and

$$
\frac{\partial(u,v)}{\partial(x,y)}\Big|_{T(\mathbf{p})} = \frac{1}{\dfrac{\partial(x,y)}{\partial(u,v)}\Big|_{\mathbf{p}}} .
$$
:::

::: proof
$S(T(\mathbf{u})) = \mathbf{u}$ for all $\mathbf{u}\in U$. By the chain rule ([[multivariable/partial-derivatives#thm-chain-rule]]), $DS(T(\mathbf{p}))\,DT(\mathbf{p}) = I$. Taking determinants and using $\det(XY) = \det X\det Y$ gives $J_S(T(\mathbf{p}))\,J_T(\mathbf{p}) = 1$, so neither factor is zero and each is the reciprocal of the other.
:::

This is often the quickest way to find a Jacobian: when the new variables are given as functions $u(x,y)$, $v(x,y)$, compute $\partial(u,v)/\partial(x,y)$ directly and take its reciprocal, without solving for $x$ and $y$.

## The change of variables theorem

::: theorem Change of variables {#thm-change-of-variables}
Let $T\colon U\to\R^2$ be a $C^1$ map on an open set $U\subseteq\R^2$, and let $S\subset U$ be a closed bounded region whose boundary consists of finitely many smooth curves. Suppose that $T$ is one-to-one on the interior of $S$ and that $J_T \ne 0$ there. Then $D = T(S)$ is a closed bounded region, and for every continuous function $f$ on $D$,

$$
\iint_D f(x,y)\,dx\,dy = \iint_S f\bigl(T(u,v)\bigr)\,\abs{\frac{\partial(x,y)}{\partial(u,v)}}\,du\,dv .
$$ {#eq-cov}

The same holds in three dimensions with $dV$, volumes and $\abs{\partial(x,y,z)/\partial(u,v,w)}$.
:::

::: proof
*Sketch.* Partition $S$ into small squares $Q_1, \dots, Q_N$ with centres $\mathbf{c}_k$ (squares meeting the boundary of $S$ are trimmed; their total area tends to $0$). The images $T(Q_k)$ cover $D$ and overlap only along their edges, because $T$ is one-to-one on the interior, so

$$
\iint_D f\,dA = \sum_k\iint_{T(Q_k)} f\,dA \approx \sum_k f\bigl(T(\mathbf{c}_k)\bigr)\,\text{area}\bigl(T(Q_k)\bigr)
$$

by [[multivariable/multiple-integrals#thm-mvt-integral]]. Next, near $\mathbf{c}_k$ the map $T$ is approximated by the affine map $\mathbf{u}\mapsto T(\mathbf{c}_k) + DT(\mathbf{c}_k)(\mathbf{u} - \mathbf{c}_k)$, which by [[#thm-det-area]] multiplies area by exactly $\abs{J_T(\mathbf{c}_k)}$. The key estimate, which uses the uniform continuity of $DT$ on $S$, is that $\text{area}(T(Q_k)) = \abs{J_T(\mathbf{c}_k)}\,\text{area}(Q_k)\,(1 + \eps_k)$ with $\max_k\abs{\eps_k}\to0$ as the squares shrink. Substituting,

$$
\iint_D f\,dA \approx \sum_k f\bigl(T(\mathbf{c}_k)\bigr)\,\abs{J_T(\mathbf{c}_k)}\,\text{area}(Q_k),
$$

which is a Riemann sum for the right-hand side of [[#eq-cov]]; letting the mesh tend to $0$ turns both approximations into equalities. Making the key estimate rigorous takes a few pages (one needs the inverse function theorem to control the shape of $T(Q_k)$); complete proofs are in Spivak, *Calculus on Manifolds*, Theorem 3-13, and Munkres, *Analysis on Manifolds*, §17.
:::

The hypotheses allow $T$ to misbehave on the boundary of $S$, which is essential in practice: polar coordinates on $S = [0, R]\times[0, 2\pi]$ are not one-to-one on the edges $r = 0$ and $\theta\in\set{0, 2\pi}$, and $J = r$ vanishes at $r = 0$, but these are boundary curves of area zero. So [[#eq-cov]] proves the polar, cylindrical and spherical formulas of [[multivariable/multiple-integrals]].

::: remark Why an absolute value?
In one variable, substitution reads $\int_{g(a)}^{g(b)}f(x)\,dx = \int_a^b f(g(u))\,g'(u)\,du$, with $g'$ and no absolute value. The two formulas agree: if $g$ is decreasing, then $g'<0$ but the limits $g(a) > g(b)$ come in the "wrong" order, and reversing them produces a second minus sign. One-variable integrals are taken over *oriented* intervals; double integrals are taken over regions, which have no orientation, and the absolute value takes care of maps that reverse orientation. Orientation returns in [[multivariable/surface-integrals]], where it matters for flux.
:::

::: remark Any number of dimensions
Everything in this chapter holds in $\R^n$: a linear map multiplies $n$-dimensional volume by $\abs{\det A}$, and $\int_D f\,dV = \int_S f(T(\mathbf{u}))\,\abs{\det DT(\mathbf{u})}\,d\mathbf{u}$ under the same hypotheses. Combining $n$-dimensional spherical coordinates with the Gaussian integral of [[multivariable/multiple-integrals#ex-gaussian]] shows that the ball of radius $R$ in $\R^n$ has volume $\pi^{n/2}R^n/\Gamma(\tfrac n2 + 1)$. For fixed $R$ this tends to $0$ as $n\to\infty$: in high dimensions almost all the volume of a cube lies outside its inscribed ball, one of the first surprises of high-dimensional geometry and a recurring theme in statistics and machine learning.
:::

### A strategy for choosing variables

1. Choose new variables that simplify the **region** (make it a rectangle or a type I region) or the **integrand** (often both at once, when the region is bounded by level curves of expressions appearing in the integrand).
2. Describe the region in the new variables: each boundary curve should become a line $u = $ const or $v = $ const.
3. Compute the Jacobian — from $x(u,v), y(u,v)$ if you have them, or via [[#thm-inverse-jacobian]] from $u(x,y), v(x,y)$.
4. Do not forget the absolute value, and check that the map is one-to-one on the region.

::: example A parallelogram {#ex-parallelogram}
Evaluate $\displaystyle\iint_D (x^2 - y^2)\,dA$, where $D$ is the parallelogram with vertices $(0,0)$, $(1,1)$, $(2,0)$ and $(1,-1)$.
::: solution
The sides lie on the lines $x + y = 0$, $x + y = 2$, $x - y = 0$ and $x - y = 2$. So put $u = x + y$ and $v = x - y$: the region becomes the square $0\le u\le2$, $0\le v\le2$, and the integrand is $x^2 - y^2 = (x+y)(x-y) = uv$. Solving, $x = \tfrac12(u+v)$, $y = \tfrac12(u - v)$, and

$$
\frac{\partial(x,y)}{\partial(u,v)} = \det\begin{pmatrix}\tfrac12 & \tfrac12\\ \tfrac12 & -\tfrac12\end{pmatrix} = -\frac12, \qquad \abs{J} = \frac12 .
$$

Therefore

$$
\iint_D(x^2 - y^2)\,dA = \int_0^2\int_0^2 uv\cdot\frac12\,du\,dv = \frac12\cdot2\cdot2 = 2 .
$$

(Directly in $x$ and $y$ one would have to split $D$ into two triangles; the answer is the same.)
:::
:::

::: example The area of an ellipse and the volume of an ellipsoid {#ex-ellipse}
Find the area enclosed by the ellipse $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ and the volume enclosed by the ellipsoid $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$.
::: solution
The linear map $x = au$, $y = bv$ sends the unit disc $u^2 + v^2\le1$ onto the elliptical region, with $\partial(x,y)/\partial(u,v) = ab$. So

$$
\text{area} = \iint_{u^2+v^2\le1} ab\,du\,dv = ab\cdot\pi = \pi ab .
$$

In the same way $x = au$, $y = bv$, $z = cw$ sends the unit ball onto the solid ellipsoid with Jacobian $abc$, and the volume is $abc\cdot\tfrac43\pi = \tfrac43\pi abc$. Both are instances of [[#thm-det-area]]: a linear stretch multiplies area or volume by its determinant.
:::
:::

::: example A region bounded by hyperbolas {#ex-hyperbolas}
Find the area of the region $D$ in the first quadrant bounded by the hyperbolas $xy = 1$, $xy = 4$ and the lines $y = x$, $y = 4x$.
::: solution
Put $u = xy$ and $v = y/x$; the region becomes the square $1\le u\le4$, $1\le v\le4$. The map $(x,y)\mapsto(u,v)$ is one-to-one on the first quadrant, with inverse $x = \sqrt{u/v}$, $y = \sqrt{uv}$. Rather than differentiate these, compute the Jacobian of the forward map and invert it ([[#thm-inverse-jacobian]]):

$$
\frac{\partial(u,v)}{\partial(x,y)} = \det\begin{pmatrix} y & x\\ -y/x^2 & 1/x\end{pmatrix} = \frac yx + \frac yx = 2v, \qquad\text{so}\qquad \frac{\partial(x,y)}{\partial(u,v)} = \frac{1}{2v}.
$$

Hence

$$
\text{area}(D) = \int_1^4\int_1^4\frac{1}{2v}\,dv\,du = 3\cdot\frac12\ln4 = 3\ln2\approx2.08 .
$$
:::
:::

Changes of variables are just as useful in three dimensions, where they produce coordinates adapted to more exotic shapes than balls and cylinders.

::: example The volume of a solid torus {#ex-torus}
A solid torus (a doughnut) is obtained by rotating the disc of radius $a$ centred at $(R, 0, 0)$ in the $xz$-plane about the $z$-axis, where $0 < a < R$. Find its volume.
::: solution
Describe a point of the solid by its distance $s\in[0,a]$ from the central circle of the tube, the angle $\varphi$ around the tube, and the angle $\theta$ about the $z$-axis:

$$
x = (R + s\cos\varphi)\cos\theta, \qquad y = (R + s\cos\varphi)\sin\theta, \qquad z = s\sin\varphi .
$$

This is the composition of cylindrical coordinates $(r, \theta, z)$, with $r = R + s\cos\varphi$, and polar coordinates $(s, \varphi)$ centred at $(R, 0)$ in the half-plane of $(r, z)$. Jacobians multiply under composition ([[#exr-composition]]), and these two have Jacobians $r$ and $s$, so $\abs{\partial(x,y,z)/\partial(s,\varphi,\theta)} = s(R + s\cos\varphi)$, which is positive because $s\le a < R$. (A direct $3\times3$ computation gives $-s(R + s\cos\varphi)$, the sign depending only on the order of the variables.) The map is one-to-one on the interior of the box $[0,a]\times[0,2\pi]\times[0,2\pi]$, so

$$
V = \int_0^{2\pi}\int_0^{2\pi}\int_0^a s(R + s\cos\varphi)\,ds\,d\varphi\,d\theta = 2\pi\int_0^{2\pi}\left(\frac{Ra^2}{2} + \frac{a^3}{3}\cos\varphi\right)d\varphi = 2\pi\cdot\pi Ra^2 = 2\pi^2Ra^2 .
$$

The answer is $(2\pi R)\cdot(\pi a^2)$: the area of the rotated disc times the distance travelled by its centre. This is an instance of **Pappus's centroid theorem**: the volume of a solid of revolution is the area of the rotated region times the length of the circle described by its centroid.
:::
:::

::: widget surface
fx: (R + a*cos(v))*cos(u)
fy: (R + a*cos(v))*sin(u)
fz: a*sin(v)
u: 0, 2pi
v: 0, 2pi
sliders: R=2:1:3:0.1; a=0.7:0.2:1:0.05
color: height
caption: The surface of the solid torus of [[#ex-torus]], with $u$ playing the role of $\theta$ and $v$ that of $\varphi$. Its volume is $2\pi^2Ra^2$: doubling $R$ doubles the volume, doubling $a$ quadruples it. The inner half of the tube is shorter than the outer half, which is what the factor $R + s\cos\varphi$ in the Jacobian records — yet the two halves balance exactly, because $\int_0^{2\pi}\cos\varphi\,d\varphi = 0$.
:::

::: quiz
With $u = x + y$ and $v = x - y$, which of the following is correct?
- [ ] $dA = 2\,du\,dv$
- [x] $dA = \tfrac12\,du\,dv$
- [ ] $dA = du\,dv$, since the map is linear
- [ ] $dA = -\tfrac12\,du\,dv$
::: solution
$\partial(u,v)/\partial(x,y) = \det\begin{pmatrix}1&1\\1&-1\end{pmatrix} = -2$, so $\partial(x,y)/\partial(u,v) = -\tfrac12$ by [[#thm-inverse-jacobian]], and $dA = \abs{-\tfrac12}\,du\,dv$. The map $(x,y)\mapsto(u,v)$ doubles areas (it is a rotation by $45^\circ$ combined with a stretch by $\sqrt2$ — and a reflection), so going back halves them. Linear maps preserve area only when $\abs{\det} = 1$.
:::
:::

::: quiz
To compute $\iint_D f\,dA$ over the unit disc $D\colon x^2 + y^2\le1$ with [[#thm-change-of-variables]], which choice of map $T$ and parameter region $S$ is valid?
- [x] $T(r,\theta) = (r\cos\theta, r\sin\theta)$ on $S = [0,1]\times[0,2\pi]$
- [ ] $T(r,\theta) = (r\cos\theta, r\sin\theta)$ on $S = [0,1]\times[0,4\pi]$
- [ ] $T(u,v) = (u, v)$ on $S = [-1,1]\times[-1,1]$
- [ ] $T(u,v) = (u^2 - v^2, 2uv)$ on the unit disc $S$
::: solution
In the first option $T$ maps $S$ onto $D$, is one-to-one on the interior of $S$ and has $J = r\ne0$ there; the failures at $r = 0$ and on the edges $\theta = 0, 2\pi$ happen on the boundary, which is allowed. On $[0,1]\times[0,4\pi]$ the disc is covered twice, so the formula would give twice the integral. The identity map sends the square onto the square, not the disc. The squaring map does send the unit disc onto itself, but it is two-to-one, so it also double counts.
:::
:::

::: warning Use the Jacobian of the right map
The formula needs $\partial(x,y)/\partial(u,v)$, the Jacobian of the map from the new variables to the old ones. A frequent mistake is to compute $\partial(u,v)/\partial(x,y)$ from the given formulas for $u$ and $v$ and use it directly: in [[#ex-hyperbolas]] that would give the integrand $2v$ instead of $1/(2v)$ and the wrong answer $45$. Remember the heuristic $dx\,dy = \abs{\frac{\partial(x,y)}{\partial(u,v)}}\,du\,dv$: the "$\partial(x,y)$" sits over the "$\partial(u,v)$" just as $dx\,dy$ sits over $du\,dv$.
:::

::: warning The map must be one-to-one
If $T$ covers part of $D$ more than once, [[#eq-cov]] counts that part more than once. The map $(u,v)\mapsto(u^2 - v^2,\ 2uv)$ of the figure above sends the annulus $1\le u^2 + v^2\le4$ onto the annulus $1\le x^2 + y^2\le16$ of area $15\pi$ — but it wraps it around twice, since $z^2$ doubles angles. Accordingly $\iint 4(u^2 + v^2)\,du\,dv$ over the whole $(u,v)$-annulus is $30\pi$, twice too much; over the upper half $v\ge0$, on which the map is one-to-one, it is the correct $15\pi$. Before changing variables, check that each point of $D$ comes from exactly one point of $S$ (apart from boundary curves).
:::

## Changing variables in probability

If a random point $(X, Y)$ has joint density $f_{X,Y}$, then for every region $D$, $\Prob\bigl((X,Y)\in D\bigr) = \iint_D f_{X,Y}\,dA$. Suppose $(U, V) = T(X, Y)$ for a one-to-one $C^1$ map $T$ with $C^1$ inverse. Then for every region $B$ in the $(u,v)$-plane, by [[#eq-cov]] applied to the inverse map,

$$
\Prob\bigl((U,V)\in B\bigr) = \Prob\bigl((X,Y)\in T^{-1}(B)\bigr) = \iint_{T^{-1}(B)} f_{X,Y}\,dx\,dy = \iint_B f_{X,Y}\bigl(T^{-1}(u,v)\bigr)\,\abs{\frac{\partial(x,y)}{\partial(u,v)}}\,du\,dv .
$$

Since this holds for every $B$, the density of $(U,V)$ is $f_{U,V}(u,v) = f_{X,Y}(x(u,v), y(u,v))\,\abs{\partial(x,y)/\partial(u,v)}$. The Jacobian is the price of measuring probability per unit area in new units.

::: application The Box–Muller method
How does a computer produce normally distributed random numbers from uniformly distributed ones? Let $U_1, U_2$ be independent and uniform on $(0,1)$, and set

$$
X = \sqrt{-2\ln U_1}\,\cos(2\pi U_2), \qquad Y = \sqrt{-2\ln U_1}\,\sin(2\pi U_2).
$$

This map is polar coordinates in disguise: the radius is $R = \sqrt{-2\ln U_1}$ and the angle is $2\pi U_2$. Its inverse is $U_1 = e^{-(X^2+Y^2)/2}$ (with $U_2$ the angle divided by $2\pi$), and its Jacobian is $\partial(x,y)/\partial(u_1,u_2) = -2\pi/u_1$. The pair $(U_1,U_2)$ has density $1$ on the unit square, so $(X,Y)$ has density

$$
1\cdot\abs{\frac{\partial(u_1,u_2)}{\partial(x,y)}} = \frac{u_1}{2\pi} = \frac{1}{2\pi}e^{-(x^2+y^2)/2} = \frac{e^{-x^2/2}}{\sqrt{2\pi}}\cdot\frac{e^{-y^2/2}}{\sqrt{2\pi}} .
$$

The density factorises, so $X$ and $Y$ are *independent* standard normal variables. George Box and Mervin Muller published the method in 1958, and it is still used in simulation software ([[probability/joint-distributions]]).
:::

::: history
Leonhard Euler worked out how to change variables in double integrals around 1770, in the course of evaluating integrals over regions bounded by curves, and in 1773 Joseph-Louis Lagrange did the same for triple integrals while studying the gravitational attraction of ellipsoids, transforming to spherical coordinates with the factor we now write as $\rho^2\sin\phi$. Neither had the language of determinants for the general factor. That came from Carl Gustav Jacob Jacobi, whose 1841 memoir *De determinantibus functionalibus* studied systematically the determinants of partial derivatives — "functional determinants" — and their properties. The determinant now carries his name. Modern proofs of the change of variables theorem follow the idea of the sketch above: approximate the map near each point by its derivative, a linear map whose effect on volume is its determinant.
:::

## Where this leads

The Jacobian determinant measures how a map distorts volume, and this idea recurs throughout mathematics. In [[multivariable/surface-integrals]] the analogous factor for a map from a plane region onto a surface in space is $\norm{\mathbf{r}_u\times\mathbf{r}_v}$, and the proof that surface integrals do not depend on the parametrisation is a change of variables. In [[complex-analysis/conformal-maps]] the maps $z\mapsto f(z)$ have Jacobian $\abs{f'(z)}^2$ and preserve angles. In [[probability/joint-distributions]] the transformation rule for densities derived above is used constantly. In the language of differential forms, the change of variables formula becomes the statement that $dx\wedge dy = \frac{\partial(x,y)}{\partial(u,v)}\,du\wedge dv$, the starting point of integration on manifolds and the general Stokes theorem mentioned in [[multivariable/stokes-divergence]].

::: summary
- A linear map with matrix $A$ multiplies every area (volume) by $\abs{\det A}$ ([[#thm-det-area]]).
- The Jacobian $\dfrac{\partial(x,y)}{\partial(u,v)} = x_uy_v - x_vy_u$ is the determinant of the derivative matrix; its absolute value is the local area magnification of the map ([[#def-jacobian]]).
- Change of variables: $\iint_D f\,dx\,dy = \iint_S f(T(u,v))\,\abs{\partial(x,y)/\partial(u,v)}\,du\,dv$ for $T$ one-to-one with non-zero Jacobian on the interior of $S$ ([[#thm-change-of-variables]]).
- Polar ($r$), cylindrical ($r$) and spherical ($\rho^2\sin\phi$) factors are Jacobians.
- The Jacobian of an inverse map is the reciprocal: $\frac{\partial(x,y)}{\partial(u,v)} = 1\big/\frac{\partial(u,v)}{\partial(x,y)}$ ([[#thm-inverse-jacobian]]).
- Choose new variables so that the boundary curves become coordinate lines; use the Jacobian of the map from new to old variables, with an absolute value.
- Densities transform with the Jacobian: $f_{U,V} = f_{X,Y}\,\abs{\partial(x,y)/\partial(u,v)}$.
:::

## Exercises

::: exercise A Jacobian {level=1 check="8"}
Compute $\dfrac{\partial(x,y)}{\partial(u,v)}$ for $x = u^2 - v^2$, $y = 2uv$, and evaluate it at $(u,v) = (1,1)$.
::: solution
$\det\begin{pmatrix}2u & -2v\\ 2v & 2u\end{pmatrix} = 4u^2 + 4v^2$, which equals $8$ at $(1,1)$.
:::
:::

::: exercise Area of an image {level=1 check="5"}
Find the area of the image of the unit square $[0,1]^2$ under $T(u,v) = (3u + v,\ u + 2v)$.
::: solution
$T$ is linear with $\det\begin{pmatrix}3&1\\1&2\end{pmatrix} = 5$, so by [[#thm-det-area]] the image has area $5\cdot1 = 5$.
:::
:::

::: exercise An inverse Jacobian {level=1 check="1/4"}
Let $u = xy$ and $v = y/x$ on the first quadrant. Find $\dfrac{\partial(x,y)}{\partial(u,v)}$ at the point where $(x,y) = (1,2)$.
::: solution
From [[#ex-hyperbolas]], $\partial(u,v)/\partial(x,y) = 2y/x = 4$ at $(1,2)$, so $\partial(x,y)/\partial(u,v) = \tfrac14$ there by [[#thm-inverse-jacobian]].
:::
:::

::: exercise A rotated square {level=2 check="e - 1/e"}
Evaluate $\displaystyle\iint_D e^{x+y}\,dA$ over the square $D\colon\abs{x} + \abs{y}\le1$.
::: solution
With $u = x + y$, $v = x - y$, the region becomes $-1\le u\le1$, $-1\le v\le1$ (the four sides are $u = \pm1$ and $v = \pm1$), and $\abs{J} = \tfrac12$ as in [[#ex-parallelogram]]. So the integral is $\int_{-1}^1\int_{-1}^1 e^u\cdot\tfrac12\,du\,dv = \tfrac12(e - e^{-1})\cdot2 = e - e^{-1}$.
:::
:::

::: exercise Between hyperbolas again {level=2 check="ln(3)/2"}
Find the area of the region in the first quadrant bounded by $y = x$, $y = 3x$, $xy = 1$ and $xy = 2$.
::: solution
With $u = xy\in[1,2]$ and $v = y/x\in[1,3]$, the Jacobian is $\frac{1}{2v}$ (see [[#ex-hyperbolas]]), so the area is $\int_1^2\int_1^3\frac{dv}{2v}\,du = \tfrac12\ln3$.
:::
:::

::: exercise A triangle and a quotient {level=2 check="sin(1)/2"}
Evaluate $\displaystyle\iint_T\cos\left(\frac{x - y}{x + y}\right)dA$, where $T$ is the triangle with vertices $(0,0)$, $(1,0)$ and $(0,1)$.
::: hint
Use $u = x - y$, $v = x + y$, and describe $T$ as a type II region in the $(u,v)$-plane with $v$ as the outer variable.
:::
::: solution
With $u = x - y$, $v = x + y$ we have $\abs{J} = \tfrac12$. The conditions $x\ge0$, $y\ge0$, $x + y\le1$ become $u\ge -v$, $u\le v$ and $v\le1$, so $T$ corresponds to $0\le v\le1$, $-v\le u\le v$ (the integrand is undefined only at the corner $v = 0$, which does not matter). Then

$$
\int_0^1\int_{-v}^{v}\cos\frac uv\cdot\frac12\,du\,dv = \int_0^1\frac12\Bigl[v\sin\frac uv\Bigr]_{u=-v}^{u=v}dv = \int_0^1 v\sin1\,dv = \frac{\sin1}{2}.
$$
:::
:::

::: exercise A moment of an ellipsoid {level=2 check="72*pi/5"}
Evaluate $\iiint_E z^2\,dV$, where $E$ is the solid ellipsoid $x^2 + \dfrac{y^2}{4} + \dfrac{z^2}{9}\le1$.
::: solution
Put $x = u$, $y = 2v$, $z = 3w$ (Jacobian $6$), which maps the unit ball $B$ onto $E$. Then $\iiint_E z^2\,dV = \iiint_B 9w^2\cdot6\,dV$. In spherical coordinates $\iiint_B w^2\,dV = \int_0^{2\pi}\int_0^\pi\int_0^1\rho^2\cos^2\phi\,\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot\tfrac23\cdot\tfrac15 = \tfrac{4\pi}{15}$. So the answer is $54\cdot\tfrac{4\pi}{15} = \tfrac{72\pi}{5}$.
:::
:::

::: exercise A slanted box {level=2 check="1/2"}
Find the volume of the solid defined by $0\le x + y\le1$, $0\le y + z\le1$, $0\le x + z\le1$.
::: hint
Use $u = x + y$, $v = y + z$, $w = x + z$, and compute the Jacobian of the map from $(x,y,z)$ to $(u,v,w)$ first.
:::
::: solution
In the variables $u = x + y$, $v = y + z$, $w = x + z$ the solid is the unit cube. The map $(x,y,z)\mapsto(u,v,w)$ is linear with

$$
\frac{\partial(u,v,w)}{\partial(x,y,z)} = \det\begin{pmatrix}1&1&0\\0&1&1\\1&0&1\end{pmatrix} = 1\cdot(1 - 0) - 1\cdot(0 - 1) + 0 = 2,
$$

so it is invertible and $\abs{\partial(x,y,z)/\partial(u,v,w)} = \tfrac12$. The volume is $\iiint_{[0,1]^3}\tfrac12\,du\,dv\,dw = \tfrac12$. (Equivalently, by [[#thm-det-area]] the inverse linear map sends the unit cube to a parallelepiped of volume $1/2$.)
:::
:::

::: exercise The Jacobian of a composition {#exr-composition level=3}
Let $T\colon(u,v)\mapsto(x,y)$ and $S\colon(s,t)\mapsto(u,v)$ be $C^1$. Prove that $\dfrac{\partial(x,y)}{\partial(s,t)} = \dfrac{\partial(x,y)}{\partial(u,v)}\cdot\dfrac{\partial(u,v)}{\partial(s,t)}$, and interpret this in terms of area scaling. Then verify [[#thm-inverse-jacobian]] for polar coordinates by computing $\partial(r,\theta)/\partial(x,y)$ directly from $r = \sqrt{x^2+y^2}$, $\theta = \arctan(y/x)$ (for $x > 0$).
::: solution
By the chain rule, $D(T\circ S) = DT(S(s,t))\,DS(s,t)$, and the determinant of a product is the product of the determinants, which is the formula. In terms of area: if $S$ multiplies small areas by $\abs{J_S}$ and $T$ multiplies small areas by $\abs{J_T}$, the composite multiplies them by $\abs{J_T}\abs{J_S}$. For polar coordinates, $r_x = x/r$, $r_y = y/r$, $\theta_x = -y/r^2$, $\theta_y = x/r^2$, so

$$
\frac{\partial(r,\theta)}{\partial(x,y)} = \frac xr\cdot\frac{x}{r^2} - \frac yr\cdot\left(-\frac{y}{r^2}\right) = \frac{x^2 + y^2}{r^3} = \frac1r,
$$

the reciprocal of $\partial(x,y)/\partial(r,\theta) = r$, as the theorem predicts.
:::
:::

::: exercise The Beta integral {level=3}
For $a, b > 0$ let $\Gamma(a) = \int_0^\infty t^{a-1}e^{-t}\,dt$. Use the substitution $x = uv$, $y = u(1 - v)$, with $u > 0$ and $0 < v < 1$, to prove that

$$
\Gamma(a)\,\Gamma(b) = \Gamma(a+b)\int_0^1 v^{a-1}(1-v)^{b-1}\,dv .
$$

(You may assume that [[#thm-change-of-variables]] and Fubini's theorem hold for these improper integrals of positive functions.)
::: hint
Write $\Gamma(a)\Gamma(b)$ as a double integral over the first quadrant and check that the map $(u,v)\mapsto(x,y)$ is a bijection from $(0,\infty)\times(0,1)$ onto the open first quadrant.
:::
::: solution
By Fubini, $\Gamma(a)\Gamma(b) = \iint_Q x^{a-1}y^{b-1}e^{-(x+y)}\,dx\,dy$ over the open first quadrant $Q$. The map $(u,v)\mapsto(uv,\ u(1-v))$ is a bijection from $(0,\infty)\times(0,1)$ onto $Q$, with inverse $u = x + y$, $v = x/(x+y)$, and

$$
\frac{\partial(x,y)}{\partial(u,v)} = \det\begin{pmatrix} v & u\\ 1 - v & -u\end{pmatrix} = -uv - u(1 - v) = -u, \qquad\abs{J} = u .
$$

Since $x + y = u$, the integrand becomes $(uv)^{a-1}\bigl(u(1-v)\bigr)^{b-1}e^{-u}$, and

$$
\Gamma(a)\Gamma(b) = \int_0^1\int_0^\infty u^{a+b-1}e^{-u}\,v^{a-1}(1-v)^{b-1}\,du\,dv = \Gamma(a+b)\int_0^1v^{a-1}(1-v)^{b-1}\,dv .
$$

The integral on the right is Euler's Beta function $B(a,b)$. With $a = b = \tfrac12$ it gives $\Gamma(\tfrac12)^2 = \Gamma(1)\int_0^1\frac{dv}{\sqrt{v(1-v)}} = \pi$, another proof that $\Gamma(\tfrac12) = \sqrt\pi$.
:::
:::
