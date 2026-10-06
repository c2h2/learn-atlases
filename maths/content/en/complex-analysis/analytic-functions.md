Reflection in the real axis, $f(z) = \bar z$, is about as harmless a map of the plane as one can imagine. As a map of $\R^2$ it is linear, hence infinitely differentiable in the sense of [[multivariable/partial-derivatives]]. Yet it is *not* differentiable as a function of a complex variable at a single point. The reason is that a complex derivative

$$
f'(z_0) = \lim_{h \to 0}\frac{f(z_0 + h) - f(z_0)}{h}
$$

divides by the complex number $h$, and $h$ may approach $0$ from every direction in the plane. For $f(z) = \bar z$ the quotient is $\bar h / h$, which equals $1$ when $h$ is real and $-1$ when $h$ is purely imaginary. A complex derivative must give the same answer from all directions at once, and that is a severe restriction.

This chapter is about the functions that pass the test. We will see that complex differentiability is equivalent to a pair of partial differential equations, the **Cauchy–Riemann equations**, that it forces the map to behave locally like a rotation followed by a scaling, and that the real and imaginary parts of such functions satisfy Laplace's equation. Later chapters will reveal far more: a function that is complex differentiable on an open set is automatically differentiable infinitely often and is the sum of its Taylor series. That is why these functions deserve a special name — **analytic** functions.

## Functions of a complex variable

A **complex function** is a function $f\colon S \to \C$ defined on a set $S \subseteq \C$. Writing $z = x + iy$ and splitting the value into real and imaginary parts,

$$
f(x + iy) = u(x, y) + i\,v(x,y),
$$

we see that $f$ is the same thing as a pair of real functions $u = \operatorname{Re} f$ and $v = \operatorname{Im} f$ of two real variables. For example:

| $f(z)$ | $u(x,y)$ | $v(x,y)$ |
|---|---|---|
| $z^2$ | $x^2 - y^2$ | $2xy$ |
| $1/z$ | $\dfrac{x}{x^2+y^2}$ | $\dfrac{-y}{x^2+y^2}$ |
| $\bar z$ | $x$ | $-y$ |
| $\abs{z}^2$ | $x^2 + y^2$ | $0$ |

(For $1/z$, multiply by the conjugate: $\frac{1}{x+iy} = \frac{x - iy}{x^2+y^2}$.)

The graph of $f$ would be a subset of $\C\times\C = \R^4$, which we cannot draw. Two substitutes are used throughout this course. The first draws the domain and the target side by side and shows how $f$ moves a grid of lines (we will use it below). The second, **domain colouring**, paints each point $z$ of the domain with a colour that encodes the value $f(z)$: the *hue* shows the argument of $f(z)$ (in the usual convention red marks positive real values, and the colours run once round the colour wheel as the argument increases by $2\pi$), and the *brightness* shows the modulus.

::: widget complexmap
f: (z - 1)/(z^2 + 1)
mode: domain
x: -2.5, 2.5
y: -2.5, 2.5
caption: Domain colouring of $f(z) = \frac{z-1}{z^2+1}$: hue is the argument of $f(z)$ and brightness its modulus. All colours meet at the zero $z = 1$ and at the poles $z = \pm i$. Walk once counterclockwise around each special point: around the zero the colours run once through the colour wheel in one order, around each pole in the reverse order. This "colour winding" will be explained by the argument principle in [[complex-analysis/residues]].
:::

## Limits and continuity

Because $\abs{z - w}$ is the Euclidean distance in $\R^2$, limits and continuity in $\C$ are exactly the limits and continuity of [[real-analysis/metric-spaces]], written with moduli.

::: definition Limit and continuity {#def-limit}
Let $f$ be defined on a punctured disc around $z_0$. We say $\lim_{z \to z_0} f(z) = L$ if for every $\eps > 0$ there is $\delta > 0$ such that

$$
0 < \abs{z - z_0} < \delta \implies \abs{f(z) - L} < \eps .
$$

If $f$ is also defined at $z_0$ and $\lim_{z\to z_0}f(z) = f(z_0)$, then $f$ is **continuous** at $z_0$. It is continuous on a set if it is continuous at every point of it.
:::

The definition is word for word that of [[calculus-1/limits]], except that $z$ ranges over a *disc*, not an interval: $z$ may approach $z_0$ along any curve whatever. The limit laws (sums, products, quotients) are proved exactly as for real functions, since their proofs only use the triangle inequality and $\abs{zw} = \abs z\abs w$. Consequently polynomials are continuous everywhere and rational functions are continuous wherever the denominator is non-zero.

::: proposition Limits componentwise {#prop-componentwise}
Write $f = u + iv$ and $L = a + bi$. Then $\lim_{z \to z_0} f(z) = L$ if and only if $\lim u(x,y) = a$ and $\lim v(x,y) = b$ as $(x,y) \to (x_0,y_0)$.
:::

::: proof
The inequalities $\abs{u - a} \le \abs{f - L}$ and $\abs{v - b} \le \abs{f - L}$ (from $\abs{\operatorname{Re}w}, \abs{\operatorname{Im}w} \le \abs{w}$) show that if $f \to L$ then $u \to a$ and $v\to b$ with the same $\delta$. Conversely $\abs{f - L} \le \abs{u - a} + \abs{v - b}$ by the triangle inequality, so if $\delta_1$ makes $\abs{u - a} < \eps/2$ and $\delta_2$ makes $\abs{v - b} < \eps/2$, then $\delta = \min(\delta_1,\delta_2)$ makes $\abs{f - L} < \eps$.
:::

::: example A limit that depends on the direction {#ex-direction}
Show that $\displaystyle\lim_{z\to0}\frac{\bar z}{z}$ does not exist.
::: solution
Approach $0$ along a ray: put $z = re^{i\theta}$ with $\theta$ fixed and $r \to 0^+$. Then $\bar z = re^{-i\theta}$, so

$$
\frac{\bar z}{z} = e^{-2i\theta},
$$

which is constant along each ray but different on different rays: $1$ along the real axis ($\theta = 0$), $-1$ along the imaginary axis ($\theta = \pi/2$). If the limit were $L$, then taking $\eps = 1$ there would be points $z = r$ and $z = ir$ with $r < \delta$ giving $\abs{1 - L} < 1$ and $\abs{-1 - L} < 1$, hence $2 \le \abs{1-L} + \abs{L + 1} < 2$, a contradiction.
:::
:::

## Complex differentiability

::: definition Complex derivative, analytic function {#def-derivative}
Let $f$ be defined on an open set containing $z_0$. Then $f$ is **(complex) differentiable** at $z_0$ if the limit

$$
f'(z_0) = \lim_{h \to 0}\frac{f(z_0 + h) - f(z_0)}{h} \qquad (h \in \C)
$$ {#eq-derivative}

exists. A function is **analytic** (or **holomorphic**) on an open set $U$ if it is differentiable at every point of $U$; it is analytic at a point $z_0$ if it is analytic on some open disc around $z_0$. A function analytic on all of $\C$ is called **entire**.
:::

The distinction between "differentiable at $z_0$" and "analytic at $z_0$" matters: we will meet functions that are differentiable at a single point, or along a line, without being analytic anywhere. All the powerful theorems of this course need analyticity on an open set.

The usual rules of differentiation carry over, with the same proofs as in [[calculus-1/derivatives]] and [[calculus-1/chain-rule]], because those proofs only use the algebra of limits:

$$
(f + g)' = f' + g', \qquad (fg)' = f'g + fg', \qquad \Big(\frac fg\Big)' = \frac{f'g - fg'}{g^2}, \qquad (g\circ f)'(z) = g'(f(z))\,f'(z).
$$

As in the real case, a function differentiable at $z_0$ is continuous there: $f(z_0 + h) - f(z_0) = h\cdot\frac{f(z_0+h) - f(z_0)}{h} \to 0\cdot f'(z_0) = 0$.

::: example Powers and polynomials {#ex-powers}
Show that $\dfrac{d}{dz}z^n = nz^{n-1}$ for every integer $n \ge 1$, and deduce that polynomials are entire and rational functions are analytic away from the zeros of their denominators.
::: solution
By the binomial theorem, which holds in any field,

$$
\frac{(z + h)^n - z^n}{h} = \frac{1}{h}\sum_{k=1}^{n}\binom nk z^{n-k}h^k = nz^{n-1} + \sum_{k=2}^{n}\binom nk z^{n-k}h^{k-1}.
$$

Every term of the last sum contains a factor $h$, so it tends to $0$ as $h\to 0$, and the quotient tends to $nz^{n-1}$. By the sum and constant-multiple rules every polynomial is differentiable everywhere, that is, entire; by the quotient rule $p/q$ is differentiable wherever $q \neq 0$, an open set. For example $\dfrac{d}{dz}\dfrac{z+1}{z-1} = \dfrac{(z - 1) - (z + 1)}{(z-1)^2} = \dfrac{-2}{(z-1)^2}$ for $z \neq 1$.
:::
:::

::: example Two smooth maps that are not analytic {#ex-not-analytic}
(a) Show that $f(z) = \bar z$ is differentiable nowhere. (b) Show that $g(z) = \abs z^2$ is differentiable at $0$ and nowhere else.
::: solution
(a) The difference quotient is $\dfrac{\overline{z_0 + h} - \bar z_0}{h} = \dfrac{\bar h}{h}$, which by [[#ex-direction]] has no limit as $h \to 0$, whatever $z_0$ is.

(b) Here

$$
\frac{\abs{z_0 + h}^2 - \abs{z_0}^2}{h} = \frac{(z_0 + h)(\bar z_0 + \bar h) - z_0\bar z_0}{h} = \bar z_0 + \bar h + z_0\,\frac{\bar h}{h}.
$$

As $h \to 0$, the term $\bar h$ tends to $0$. If $z_0 = 0$, the quotient is just $\bar h \to 0$, so $g'(0) = 0$. If $z_0 \neq 0$, the term $z_0\bar h/h$ has no limit (it takes the values $z_0$ and $-z_0$ along the real and imaginary directions), so neither does the quotient. Thus $g$ is differentiable only at $0$; since no open disc consists of points of differentiability, $g$ is analytic nowhere.
:::
:::

::: quiz
Which of these functions is entire?
- [ ] $f(z) = \bar z$
- [ ] $f(z) = \abs z^2$
- [x] $f(z) = z^3 - iz + 2$
- [ ] $f(z) = \operatorname{Re} z$
::: solution
Polynomials in $z$ are entire ([[#ex-powers]]). The other three are built from $\bar z$: $\bar z$ is differentiable nowhere, $\abs z^2 = z\bar z$ only at $0$, and $\operatorname{Re} z = (z + \bar z)/2$ nowhere (its difference quotient is $\frac12(1 + \bar h/h)$, which has no limit). A useful rule of thumb, made precise in the remark on $\partial/\partial\bar z$ below: an expression that genuinely involves $\bar z$ is not analytic.
:::
:::

## The Cauchy–Riemann equations

How can we tell whether $f = u + iv$ is complex differentiable, if it is given by formulas for $u$ and $v$? The idea is to let $h$ approach $0$ along the two coordinate directions and demand the same answer.

::: theorem Cauchy–Riemann equations {#thm-cr}
Suppose $f = u + iv$ is complex differentiable at $z_0 = x_0 + iy_0$. Then the partial derivatives of $u$ and $v$ exist at $(x_0,y_0)$ and satisfy the **Cauchy–Riemann equations**

$$
u_x = v_y, \qquad u_y = -v_x \qquad\text{at } (x_0, y_0).
$$ {#eq-cr}

Moreover $f'(z_0) = u_x + i v_x = v_y - i u_y$ there.
:::

::: proof
Let $f'(z_0) = A$. Since the limit [[#eq-derivative]] exists, it can be computed along any route. First let $h = t$ be real, $t \to 0$:

$$
A = \lim_{t\to0}\frac{u(x_0 + t, y_0) - u(x_0,y_0)}{t} + i\,\frac{v(x_0 + t, y_0) - v(x_0, y_0)}{t}.
$$

By [[#prop-componentwise]] the real and imaginary parts converge separately, so $u_x$ and $v_x$ exist at $(x_0,y_0)$ and $A = u_x + iv_x$. Next let $h = it$ be purely imaginary:

$$
A = \lim_{t \to 0}\frac{u(x_0, y_0 + t) - u(x_0,y_0) + i\big(v(x_0,y_0 + t) - v(x_0,y_0)\big)}{it} = \frac{1}{i}(u_y + i v_y) = v_y - i u_y .
$$

Comparing the two expressions for $A$, real parts give $u_x = v_y$ and imaginary parts give $v_x = -u_y$.
:::

::: example Checking the equations {#ex-cr-check}
(a) Verify the Cauchy–Riemann equations for $f(z) = z^2$. (b) Show that $f(x + iy) = x^2 + iy^2$ is differentiable only on the line $y = x$, and analytic nowhere.
::: solution
(a) $u = x^2 - y^2$ and $v = 2xy$, so $u_x = 2x = v_y$ and $u_y = -2y = -v_x$. The derivative is $u_x + iv_x = 2x + 2iy = 2z$, as it should be.

(b) Here $u = x^2$ and $v = y^2$, with $u_x = 2x$, $u_y = 0$, $v_x = 0$, $v_y = 2y$. The second equation $u_y = -v_x$ always holds; the first, $2x = 2y$, holds only on the line $y = x$. By [[#thm-cr]], $f$ is not differentiable off this line. On the line, the partial derivatives are continuous and satisfy [[#eq-cr]], so the sufficiency theorem below shows $f$ *is* differentiable there, with $f'(x + ix) = u_x + iv_x = 2x$. A line contains no open disc, so $f$ is analytic nowhere.
:::
:::

The Cauchy–Riemann equations have a striking geometric meaning. The derivative of $f$ as a map of $\R^2$ is its Jacobian matrix, and [[#eq-cr]] says it has the special form

$$
J_f = \begin{pmatrix} u_x & u_y \\ v_x & v_y\end{pmatrix} = \begin{pmatrix} a & -b \\ b & a\end{pmatrix}, \qquad a + bi = f'(z_0).
$$

As we saw in [[complex-analysis/complex-numbers]], this is exactly the matrix of multiplication by the complex number $f'(z_0)$: a rotation by $\Arg f'(z_0)$ combined with a scaling by $\abs{f'(z_0)}$. So a complex differentiable map is one that, on a very small scale, *rotates and stretches* but does not shear or reflect. Infinitesimal squares go to infinitesimal squares. Tristan Needham calls the pair "rotation angle and stretch factor" the **amplitwist** of $f$.

::: widget complexmap
f: z^2
mode: grid
x: -1.5, 1.5
y: -1.5, 1.5
caption: The image of a square grid under $f(z) = z^2$. Vertical and horizontal lines become two families of parabolas, and they still cross at right angles — the infinitesimal squares are rotated and scaled, never sheared. The exception is the origin, where $f'(0) = 0$: there the angle between the axes is doubled. A map that is not analytic, such as $z + \tfrac i2\bar z$, would shear the little squares into rhombi.
:::

The Cauchy–Riemann equations are necessary for differentiability. With a mild extra hypothesis they are also sufficient.

::: theorem Sufficient condition for differentiability {#thm-cr-sufficient}
Let $f = u + iv$ be defined on an open set $U$, and suppose the first-order partial derivatives of $u$ and $v$ exist on $U$ and are continuous at $(x_0, y_0) \in U$. If the Cauchy–Riemann equations hold at $(x_0, y_0)$, then $f$ is complex differentiable at $z_0 = x_0 + iy_0$, with $f'(z_0) = u_x + iv_x$.

In particular, if $u$ and $v$ have continuous partial derivatives satisfying [[#eq-cr]] throughout $U$, then $f$ is analytic on $U$.
:::

::: proof
Continuity of the partial derivatives at $(x_0,y_0)$ implies that $u$ is differentiable there as a function of two real variables ([[multivariable/partial-derivatives]]): writing $h = h_1 + ih_2$,

$$
u(x_0 + h_1, y_0 + h_2) - u(x_0, y_0) = u_x h_1 + u_y h_2 + \eps_1(h)\abs h, \qquad \eps_1(h) \to 0 \text{ as } h \to 0,
$$

with the partial derivatives evaluated at $(x_0,y_0)$, and similarly for $v$ with an error term $\eps_2(h)\abs h$. Put $a = u_x$ and $b = v_x$ at $(x_0,y_0)$; the Cauchy–Riemann equations say $u_y = -b$ and $v_y = a$. Therefore

$$
\begin{aligned}
f(z_0 + h) - f(z_0) &= (a h_1 - b h_2) + i(b h_1 + a h_2) + (\eps_1 + i\eps_2)\abs h \\
&= (a + bi)(h_1 + i h_2) + (\eps_1 + i\eps_2)\abs h .
\end{aligned}
$$

Dividing by $h$,

$$
\left\lvert\frac{f(z_0 + h) - f(z_0)}{h} - (a + bi)\right\rvert = \abs{\eps_1 + i\eps_2}\,\frac{\abs h}{\abs h} \le \abs{\eps_1} + \abs{\eps_2} \to 0,
$$

so $f'(z_0)$ exists and equals $a + bi = u_x + iv_x$.
:::

::: example A preview of the exponential {#ex-exp-preview}
Show that $f(x + iy) = e^x(\cos y + i\sin y)$ is entire and that $f' = f$.
::: solution
Here $u = e^x\cos y$ and $v = e^x\sin y$, whose partial derivatives

$$
u_x = e^x\cos y, \quad u_y = -e^x\sin y, \quad v_x = e^x\sin y, \quad v_y = e^x\cos y
$$

are continuous on all of $\R^2$. They satisfy $u_x = v_y$ and $u_y = -v_x$ everywhere, so by [[#thm-cr-sufficient]] $f$ is entire, with $f' = u_x + iv_x = e^x\cos y + ie^x\sin y = f$. This function is the complex exponential $e^z$, studied in [[complex-analysis/elementary-functions]].
:::
:::

::: warning The equations at one point are not enough
[[#thm-cr-sufficient]] needs the partial derivatives to be continuous; the Cauchy–Riemann equations at a single point do not imply differentiability. Let $f(x + iy) = \sqrt{\abs{xy}}$, so $u = \sqrt{\abs{xy}}$ and $v = 0$. Since $u$ vanishes on both axes, $u_x(0,0) = u_y(0,0) = 0$, and trivially $v_x = v_y = 0$: the equations hold at the origin. But along the diagonal $h = t(1 + i)$ the difference quotient is $\dfrac{\abs t}{t(1+i)}$, which equals $\frac{1}{1+i}$ for $t > 0$ and $-\frac1{1+i}$ for $t < 0$, so $f'(0)$ does not exist. (Near the origin, $u_y$ fails to exist at the points of the $x$-axis and the partial derivatives are unbounded off the axes, so the continuity hypothesis fails.)
:::

::: remark The operator ∂/∂z̄
Since $x = (z + \bar z)/2$ and $y = (z - \bar z)/(2i)$, it is convenient to define the differential operators

$$
\frac{\partial}{\partial z} = \frac12\Big(\frac{\partial}{\partial x} - i\frac{\partial}{\partial y}\Big), \qquad \frac{\partial}{\partial \bar z} = \frac12\Big(\frac{\partial}{\partial x} + i\frac{\partial}{\partial y}\Big).
$$

A short calculation shows $\dfrac{\partial f}{\partial \bar z} = \tfrac12\big((u_x - v_y) + i(v_x + u_y)\big)$, so the two Cauchy–Riemann equations are the single complex equation $\partial f/\partial\bar z = 0$, and then $f' = \partial f/\partial z$. Informally: *analytic functions are the functions of $z$ that do not depend on $\bar z$*. For example $\partial(z\bar z)/\partial \bar z = z$ vanishes only at $0$, matching [[#ex-not-analytic]].
:::

## Consequences of the Cauchy–Riemann equations

On a connected open set, analyticity is so rigid that very weak information forces a function to be constant. The first tool is a chain rule for an analytic function composed with a curve.

::: lemma Derivative along a curve {#lem-curve}
Let $\gamma\colon [a,b] \to U$ be differentiable (as a map into $\R^2$) and let $f$ be analytic on the open set $U$. Then $f\circ\gamma$ is differentiable and $(f\circ\gamma)'(t) = f'(\gamma(t))\,\gamma'(t)$.
:::

::: proof
Fix $t$ and put $w = \gamma(t)$. Define $\phi(\zeta) = \dfrac{f(\zeta) - f(w)}{\zeta - w}$ for $\zeta \neq w$ and $\phi(w) = f'(w)$; then $\phi$ is continuous at $w$ and $f(\zeta) - f(w) = \phi(\zeta)(\zeta - w)$ for all $\zeta \in U$. Hence

$$
\frac{f(\gamma(t + s)) - f(\gamma(t))}{s} = \phi(\gamma(t + s))\,\frac{\gamma(t+s) - \gamma(t)}{s} \longrightarrow \phi(w)\,\gamma'(t) = f'(\gamma(t))\gamma'(t)
$$

as $s \to 0$, because $\gamma(t+s) \to w$ and $\phi$ is continuous at $w$.
:::

::: theorem Zero derivative means constant {#thm-zero-derivative}
If $f$ is analytic on a domain $D$ and $f'(z) = 0$ for all $z \in D$, then $f$ is constant on $D$.
:::

::: proof
First let $p, q \in D$ be such that the segment $[p, q]$ lies in $D$, and put $g(t) = f(p + t(q - p))$ for $t \in [0,1]$. By [[#lem-curve]], $g'(t) = f'(p + t(q-p))(q - p) = 0$. The real functions $\operatorname{Re} g$ and $\operatorname{Im} g$ therefore have zero derivative on $[0,1]$, so by the mean value theorem ([[calculus-1/mean-value-theorem]]) they are constant, and $f(p) = g(0) = g(1) = f(q)$. Now let $z, w \in D$ be arbitrary. Since $D$ is a domain, there is a polygonal path $z = p_0, p_1, \dots, p_m = w$ in $D$ whose segments $[p_{k-1}, p_k]$ lie in $D$. Applying the first step to each segment gives $f(z) = f(p_1) = \dots = f(w)$.
:::

The connectedness of $D$ is essential, as the example in [[complex-analysis/complex-numbers]] of a function equal to $0$ on one disc and $1$ on another shows.

::: corollary Rigidity {#cor-rigid}
Let $f = u + iv$ be analytic on a domain $D$. If any one of $u$, $v$ or $\abs f$ is constant on $D$, then $f$ is constant on $D$. In particular, a real-valued analytic function on a domain is constant.
:::

::: proof
If $u$ is constant, then $u_x = u_y = 0$, so by the Cauchy–Riemann equations $v_y = v_x = 0$ and $f' = u_x + iv_x = 0$; apply [[#thm-zero-derivative]]. The case of constant $v$ is the same. Suppose $\abs f^2 = u^2 + v^2 = c$ is constant. If $c = 0$ then $f = 0$. Otherwise differentiate with respect to $x$ and $y$:

$$
u u_x + v v_x = 0, \qquad u u_y + v v_y = 0 .
$$

Using $v_x = -u_y$ and $v_y = u_x$, these become $u u_x - v u_y = 0$ and $v u_x + u u_y = 0$, a linear system for $(u_x, u_y)$ with determinant $u^2 + v^2 = c \neq 0$. Hence $u_x = u_y = 0$ at every point, so $f' = u_x + iv_x = u_x - iu_y = 0$ on $D$, and $f$ is constant by [[#thm-zero-derivative]].
:::

This is the first instance of a recurring theme: the modulus of an analytic function cannot be constant on an open set without the function being constant. In [[complex-analysis/cauchy-theorem]] the same rigidity produces the maximum modulus principle.

## Harmonic functions

Differentiating the Cauchy–Riemann equations once more reveals the most important property of $u$ and $v$. Suppose $u$ and $v$ have continuous second partial derivatives. Then

$$
u_{xx} = (v_y)_x = (v_x)_y = (-u_y)_y = -u_{yy},
$$

using equality of mixed partial derivatives in the middle step. So $u_{xx} + u_{yy} = 0$, and similarly for $v$.

::: definition Harmonic function {#def-harmonic}
A real function $u$ on an open set $U \subseteq \R^2$ is **harmonic** if it has continuous second partial derivatives and satisfies **Laplace's equation**

$$
\Delta u = u_{xx} + u_{yy} = 0 .
$$

If $u$ and $v$ are harmonic on $U$ and $u + iv$ is analytic on $U$, then $v$ is called a **harmonic conjugate** of $u$.
:::

::: theorem Real and imaginary parts are harmonic {#thm-harmonic}
If $f = u + iv$ is analytic on an open set $U$ and $u, v$ have continuous second partial derivatives, then $u$ and $v$ are harmonic on $U$, and $v$ is a harmonic conjugate of $u$.
:::

::: proof
The computation above shows $\Delta u = 0$; similarly $v_{xx} = (-u_y)_x = -(u_x)_y = -(v_y)_y = -v_{yy}$, so $\Delta v = 0$.
:::

The hypothesis on second derivatives will turn out to be superfluous: in [[complex-analysis/cauchy-theorem]] we prove that the derivative of an analytic function is again analytic, so $u$ and $v$ are automatically infinitely differentiable.

Conversely, every harmonic function on a disc is the real part of an analytic function, and the conjugate can be found by integrating the Cauchy–Riemann equations.

::: theorem Existence of harmonic conjugates on a disc {#thm-conjugate}
Let $u$ be harmonic on an open disc $D$ centred at $(x_0, y_0)$. Then

$$
v(x, y) = \int_{y_0}^{y} u_x(x, t)\,dt - \int_{x_0}^{x} u_y(s, y_0)\,ds
$$ {#eq-conjugate}

is a harmonic conjugate of $u$ on $D$, and any two harmonic conjugates differ by a constant.
:::

::: proof
For $(x,y) \in D$, the point $(x, y_0)$ is in $D$ and so are the segments from $(x_0,y_0)$ to $(x, y_0)$ and from $(x, y_0)$ to $(x,y)$, because a disc contains the segment between any two of its points; so [[#eq-conjugate]] makes sense. By the fundamental theorem of calculus, $v_y(x,y) = u_x(x,y)$. Differentiating under the integral sign (allowed because $u_{xx}$ is continuous),

$$
v_x(x,y) = \int_{y_0}^{y} u_{xx}(x,t)\,dt - u_y(x, y_0) = -\int_{y_0}^{y}u_{yy}(x,t)\,dt - u_y(x,y_0) = -u_y(x,y),
$$

using $u_{xx} = -u_{yy}$ and the fundamental theorem once more. So $u, v$ have continuous partial derivatives satisfying the Cauchy–Riemann equations, $u + iv$ is analytic by [[#thm-cr-sufficient]], and $v$ is harmonic by [[#thm-harmonic]] (its second partials, $v_{xx} = -u_{yx}$ and so on, are continuous). If $v_1$ and $v_2$ are two conjugates, then $i(v_1 - v_2) = (u + iv_1) - (u + iv_2)$ is analytic with constant real part, hence constant by [[#cor-rigid]].
:::

In practice one does not use [[#eq-conjugate]] directly but integrates the equations by hand, as follows.

::: example Finding a harmonic conjugate {#ex-conjugate}
Show that $u(x,y) = x^3 - 3xy^2 + 2y$ is harmonic on $\R^2$, find a harmonic conjugate $v$, and express $f = u + iv$ in terms of $z$.
::: solution
$u_{xx} = 6x$ and $u_{yy} = -6x$, so $\Delta u = 0$. We need $v_y = u_x = 3x^2 - 3y^2$. Integrating with respect to $y$,

$$
v = 3x^2y - y^3 + g(x)
$$

for some function $g$ of $x$ alone. The second equation requires $v_x = -u_y = -(-6xy + 2) = 6xy - 2$. From our formula $v_x = 6xy + g'(x)$, so $g'(x) = -2$ and $g(x) = -2x + C$. Hence

$$
v(x,y) = 3x^2y - y^3 - 2x + C .
$$

To recognise $f$, notice that $x^3 - 3xy^2 + i(3x^2y - y^3) = (x + iy)^3$, while $2y - 2ix = -2i(x + iy)$. So $f(z) = z^3 - 2iz + iC$, and indeed $\operatorname{Re}(z^3 - 2iz) = u$. A quick way to guess $f$: set $y = 0$, so that $f(x) = u(x,0) + iv(x,0) = x^3 - 2ix + iC$, and replace $x$ by $z$ (this trick is justified by the identity theorem of [[complex-analysis/laurent-series]]).
:::
:::

::: quiz
For which value of the constant $a$ is $u = x^3 + a\,xy^2$ harmonic, and what is then an analytic function with real part $u$?
- [ ] $a = 3$, with $f = z^3$
- [x] $a = -3$, with $f = z^3$
- [ ] $a = -3$, with $f = iz^3$
- [ ] $u$ is never harmonic
::: solution
$\Delta u = 6x + 2ax$, which vanishes identically exactly when $a = -3$. Then $u = x^3 - 3xy^2 = \operatorname{Re}(z^3)$, since $(x + iy)^3 = x^3 - 3xy^2 + i(3x^2y - y^3)$. (For $f = iz^3$ the real part is $-(3x^2y - y^3)$ instead.)
:::
:::

A harmonic conjugate need not exist on domains with holes. The function $u = \ln\abs z = \frac12\ln(x^2 + y^2)$ is harmonic on $\C\setminus\set0$, and on any disc avoiding $0$ its conjugates are the continuous choices of $\arg z$. But no continuous choice of $\arg z$ exists on the whole punctured plane — going once around the origin increases the argument by $2\pi$. This phenomenon, the source of branch cuts, is studied in [[complex-analysis/elementary-functions]].

The level curves of $u$ and $v$ have a geometric relationship. At a point where $f' \neq 0$, the gradients $\nabla u = (u_x, u_y)$ and $\nabla v = (v_x, v_y) = (-u_y, u_x)$ are non-zero and

$$
\nabla u\cdot\nabla v = -u_xu_y + u_yu_x = 0 ,
$$

so the curves $u = \text{const}$ and $v = \text{const}$ cross at right angles. For $f(z) = z^2$ these are the two families of hyperbolas $x^2 - y^2 = c$ and $2xy = c'$.

::: widget contour
f: x^2 - y^2
x: -2, 2
y: -2, 2
levels: 14
gradient: true
point: 1, 0.5
caption: Level curves of the harmonic function $u = x^2 - y^2 = \operatorname{Re}(z^2)$ (the figure calls it $f$; its bold $\mathbf u$ is only a direction for the directional derivative). Drag the point: the gradient $\nabla u$ (drawn as $\nabla f$) is perpendicular to the level curve through it, and it is tangent to the level curves of the conjugate $v = 2xy$ (the hyperbolas $xy = \text{const}$, not drawn). In fluid flow, $u$ is the velocity potential and the curves $v = \text{const}$ are the streamlines of a flow turning a corner.
:::

::: application Ideal flow and electrostatics
In a steady, two-dimensional flow of an incompressible fluid without vortices, the velocity field is the gradient of a harmonic **velocity potential** $\phi$, and the fluid moves along the level curves of a harmonic conjugate $\psi$, the **stream function**. The analytic function $F = \phi + i\psi$ is the **complex potential** of the flow, and the velocity is $\overline{F'(z)}$. For instance $F(z) = Uz$ is a uniform stream with speed $U$, and $F(z) = z^2$ is a flow into a right-angled corner. Electrostatics in two dimensions is identical, with $\phi$ the electric potential and the level curves of $\psi$ the lines of force. Because sums of harmonic functions are harmonic, flows can be superposed by adding complex potentials; in [[complex-analysis/conformal-maps]] we will find the flow past a cylinder this way, and in [[pde/laplace-equation]] Laplace's equation is studied in its own right.
:::

::: history
The equations $u_x = v_y$, $u_y = -v_x$ first appeared in Jean le Rond d'Alembert's work on the resistance of fluids (1752), where $u$ and $v$ were velocity components of a flow. Leonhard Euler connected them with functions of a complex variable in 1777. Augustin-Louis Cauchy made them the basis of his theory of complex integration from 1814 onwards, and Bernhard Riemann's dissertation of 1851 took them as the very definition of an analytic function and emphasised the link with Laplace's equation and the geometry of mappings. Their names are attached to the equations for these last two contributions.
:::

## Where this leads

Analytic functions are the protagonists of the rest of the course. The exponential, logarithm and power functions of [[complex-analysis/elementary-functions]] are the first non-polynomial examples. In [[complex-analysis/contour-integrals]] and [[complex-analysis/cauchy-theorem]] we integrate them, and the Cauchy–Riemann equations reappear, through Green's theorem ([[multivariable/greens-theorem]]), as the reason why their integrals around closed curves vanish. The geometric meaning of complex differentiability — local rotation and scaling — is the subject of [[complex-analysis/conformal-maps]], and harmonic functions are the solutions of Laplace's equation in [[pde/laplace-equation]].

::: summary
- $f$ is complex differentiable at $z_0$ if $\frac{f(z_0+h) - f(z_0)}{h}$ has a limit as the *complex* number $h \to 0$ from every direction; $f$ is analytic on an open set if it is differentiable at each of its points, and entire if analytic on $\C$.
- Polynomials are entire and rational functions are analytic off the zeros of the denominator; $\bar z$, $\operatorname{Re} z$ and $\abs z^2$ are not analytic anywhere.
- Differentiability implies the Cauchy–Riemann equations $u_x = v_y$, $u_y = -v_x$, with $f' = u_x + iv_x$ ([[#thm-cr]]); conversely, continuous partial derivatives satisfying them give differentiability ([[#thm-cr-sufficient]]).
- Geometrically, $f'(z_0)$ acts as a rotation by $\Arg f'(z_0)$ and a scaling by $\abs{f'(z_0)}$: analytic maps preserve angles where $f' \neq 0$.
- On a domain, $f' = 0$ forces $f$ constant, and so does constancy of $\operatorname{Re} f$, $\operatorname{Im} f$ or $\abs f$.
- Real and imaginary parts of analytic functions are harmonic; on a disc every harmonic function has a harmonic conjugate, found by integrating the Cauchy–Riemann equations.
:::

## Exercises

::: exercise A derivative {level=1 check="-1"}
Let $f(z) = z^3 + 2z$. Find $f'(i)$.
::: solution
By [[#ex-powers]], $f'(z) = 3z^2 + 2$, so $f'(i) = 3i^2 + 2 = -3 + 2 = -1$.
:::
:::

::: exercise A quotient {level=1 check="-2"}
Where is $f(z) = \dfrac{z+1}{z-1}$ analytic? Compute $f'(0)$.
::: solution
$f$ is a rational function whose denominator vanishes only at $z = 1$, so it is analytic on $\C\setminus\set1$. By the quotient rule $f'(z) = \dfrac{(z-1) - (z+1)}{(z-1)^2} = \dfrac{-2}{(z-1)^2}$, so $f'(0) = -2$.
:::
:::

::: exercise A first harmonic conjugate {level=1}
Show that $u(x,y) = x^2 - y^2 + x$ is harmonic on $\R^2$, and find an entire function $f$ with $\operatorname{Re} f = u$.
::: solution
$u_{xx} + u_{yy} = 2 - 2 = 0$. We need $v_y = u_x = 2x + 1$, so $v = 2xy + y + g(x)$; then $v_x = 2y + g'(x)$ must equal $-u_y = 2y$, so $g$ is constant. Taking $g = 0$, $v = 2xy + y$ and $f = u + iv = (x^2 - y^2 + 2ixy) + (x + iy) = z^2 + z$.
:::
:::

::: exercise Choosing the coefficient {level=2 check="-3"}
Find the value of the real constant $a$ for which $u(x, y) = ax^2y + y^3$ is harmonic, and for that value find an entire function with real part $u$.
::: solution
$\Delta u = 2ay + 6y$, which is identically zero exactly when $a = -3$. Then $u = y^3 - 3x^2y = -\operatorname{Im}(z^3)$. Since $\operatorname{Re}(iw) = -\operatorname{Im} w$, the function $f(z) = iz^3$ has real part $-\operatorname{Im}(z^3) = u$. (Check with the Cauchy–Riemann equations: $v = \operatorname{Im}(iz^3) = \operatorname{Re}(z^3) = x^3 - 3xy^2$, and $u_x = -6xy = v_y$, $u_y = 3y^2 - 3x^2 = -v_x$.)
:::
:::

::: exercise Differentiable at one point only {level=2}
Let $f(x + iy) = x^3 + i(1 - y)^3$. Show that $f$ is complex differentiable at exactly one point, find $f'$ there, and explain why $f$ is analytic nowhere.
::: solution
$u = x^3$, $v = (1-y)^3$; $u_x = 3x^2$, $u_y = 0$, $v_x = 0$, $v_y = -3(1-y)^2$. The equation $u_y = -v_x$ always holds, and $u_x = v_y$ says $3x^2 = -3(1-y)^2$, which forces $x = 0$ and $y = 1$. So by [[#thm-cr]] $f$ is not differentiable at any $z \neq i$, and since all partial derivatives are continuous, [[#thm-cr-sufficient]] shows that $f$ is differentiable at $z = i$ with $f'(i) = u_x + iv_x = 0$. A single point contains no disc, so $f$ is analytic nowhere.
:::
:::

::: exercise Cauchy–Riemann in polar form {level=2}
Let $f = u + iv$ be analytic near $z_0 \neq 0$, and write $u, v$ as functions of polar coordinates $(r, \theta)$. Show that

$$
u_r = \frac1r v_\theta, \qquad v_r = -\frac1r u_\theta,
$$

and verify these equations for $f(z) = z^n$.
::: hint
Use the chain rule with $x = r\cos\theta$, $y = r\sin\theta$.
:::
::: solution
By the chain rule, $u_r = u_x\cos\theta + u_y\sin\theta$ and $u_\theta = -u_x r\sin\theta + u_y r\cos\theta$, and similarly for $v$. Using $v_x = -u_y$ and $v_y = u_x$:

$$
\frac1r v_\theta = -v_x\sin\theta + v_y\cos\theta = u_y\sin\theta + u_x\cos\theta = u_r ,
$$

$$
-\frac1r u_\theta = u_x\sin\theta - u_y\cos\theta = v_y \sin\theta + v_x\cos\theta = v_r .
$$

For $z^n = r^ne^{in\theta}$: $u = r^n\cos n\theta$ and $v = r^n\sin n\theta$, so $u_r = nr^{n-1}\cos n\theta = \frac1r\,(nr^n\cos n\theta) = \frac1r v_\theta$ and $v_r = nr^{n-1}\sin n\theta = -\frac1r(-nr^n\sin n\theta) = -\frac1r u_\theta$.
:::
:::

::: exercise Another rigidity statement {level=2}
Let $f = u + iv$ be analytic on a domain $D$ and suppose $v = u^2$ on $D$. Prove that $f$ is constant.
::: solution
Differentiating $v = u^2$ gives $v_x = 2uu_x$ and $v_y = 2uu_y$. By the Cauchy–Riemann equations, $u_x = v_y = 2uu_y$ and $u_y = -v_x = -2uu_x$. Substituting the second into the first, $u_x = 2u(-2uu_x) = -4u^2u_x$, so $u_x(1 + 4u^2) = 0$. Since $1 + 4u^2 > 0$, $u_x = 0$, and then $u_y = -2uu_x = 0$. So $f' = u_x - iu_y = 0$ on $D$ and $f$ is constant by [[#thm-zero-derivative]].
:::
:::

::: exercise f and its conjugate {level=3}
Suppose $f$ and $\bar f$ are both analytic on a domain $D$. Prove that $f$ is constant.
::: solution
Then $\operatorname{Re} f = \frac12(f + \bar f)$ is analytic on $D$ (a sum of analytic functions) and real-valued. By [[#cor-rigid]] it is constant. So $f$ is an analytic function with constant real part, and applying [[#cor-rigid]] once more, $f$ is constant. (Directly with the equations: $f = u + iv$ gives $u_x = v_y$, $u_y = -v_x$, while $\bar f = u - iv$ gives $u_x = -v_y$, $u_y = v_x$; together all four partial derivatives vanish.)
:::
:::

::: exercise Cauchy–Riemann without differentiability {level=3}
Define $f(z) = z^5/\abs z^4$ for $z \neq 0$ and $f(0) = 0$. Show that $u = \operatorname{Re} f$ and $v = \operatorname{Im} f$ satisfy the Cauchy–Riemann equations at the origin, but $f$ is not complex differentiable there. Why does this not contradict [[#thm-cr-sufficient]]?
::: solution
On the real axis, $f(x) = x^5/x^4 = x$, so $u(x, 0) = x$ and $v(x,0) = 0$, giving $u_x(0,0) = 1$ and $v_x(0,0) = 0$. On the imaginary axis, $f(iy) = (iy)^5/y^4 = iy$, so $u(0,y) = 0$ and $v(0,y) = y$, giving $u_y(0,0) = 0$ and $v_y(0,0) = 1$. Thus $u_x = v_y = 1$ and $u_y = -v_x = 0$ at the origin. However, the difference quotient is

$$
\frac{f(h) - f(0)}{h} = \frac{h^4}{\abs h^4} = e^{4i\theta} \qquad (h = \abs h e^{i\theta}),
$$

which equals $1$ along the real axis and $e^{i\pi} = -1$ along the diagonal $\theta = \pi/4$; so it has no limit. There is no contradiction because the partial derivatives of $u$ and $v$ are not continuous at the origin (they are homogeneous of degree $0$ and not constant), so the hypothesis of [[#thm-cr-sufficient]] fails.
:::
:::

::: exercise The Laplacian of the squared modulus {level=3}
Let $f = u + iv$ be analytic on an open set, with $u, v$ having continuous second partial derivatives. Prove that

$$
\Delta\big(\abs{f}^2\big) = 4\abs{f'}^2 .
$$

Deduce that $\abs f^2$ is harmonic only where $f'$ vanishes.
::: solution
For any $C^2$ function $w$, $\Delta(w^2) = \partial_x(2ww_x) + \partial_y(2ww_y) = 2(w_x^2 + w_y^2) + 2w\Delta w$. Applying this to the harmonic functions $u$ and $v$,

$$
\Delta(u^2 + v^2) = 2(u_x^2 + u_y^2) + 2(v_x^2 + v_y^2).
$$

By the Cauchy–Riemann equations $u_y^2 = v_x^2$ and $v_y^2 = u_x^2$, so the right-hand side is $4(u_x^2 + v_x^2) = 4\abs{u_x + iv_x}^2 = 4\abs{f'}^2$. Hence $\Delta\abs f^2 \ge 0$, with equality exactly where $f' = 0$; $\abs f^2$ is harmonic on an open set only if $f'$ vanishes there, that is (on a domain), only if $f$ is constant.
:::
:::
