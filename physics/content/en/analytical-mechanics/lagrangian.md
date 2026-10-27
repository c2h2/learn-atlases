A stone thrown upward rises and falls in one second. Of all the ways it might have moved between leaving your hand and returning to it, why does it follow that particular parabola? Newton's answer is local: at each instant the force fixes the acceleration, and the path is built up step by step. There is a second answer, global rather than local, which says that the actual path is the one that makes a certain integral over the whole journey stationary. The integral is the **action**, and the statement is **Hamilton's principle**.

The two answers give the same motion. The second is worth having for three reasons. It is coordinate-free: the action is a single number, so it can be computed in any coordinates you like, and the equations of motion follow in those coordinates without transforming accelerations. It connects symmetries to conservation laws with a precision Newton's formulation lacks, through Noether's theorem. And it is the form in which mechanics generalises, to fields, to relativity and, through Feynman's sum over paths, to quantum mechanics.

[[analytical-mechanics/constraints]] derived Lagrange's equations from d'Alembert's principle. This chapter derives the same equations from a variational principle, using the calculus of variations, then studies what the Lagrangian tells us directly: which momenta are conserved, which energy is conserved, and how velocity-dependent forces such as the magnetic force fit in.

## The calculus of variations {#variations}

Ordinary calculus finds the points where a function of a few variables is stationary. The calculus of variations finds the *functions* where a function of a function is stationary.

::: definition Functional and stationary path {#def-functional}
Let $f(y, y', x)$ be a twice continuously differentiable function of three variables. For each twice continuously differentiable function $y(x)$ on $[a, b]$ with fixed end values $y(a) = y_a$ and $y(b) = y_b$, the **functional**

$$
J[y] = \int_a^b f\bigl(y(x), y'(x), x\bigr)\,\dd x
$$ {#eq-functional}

assigns a number. A **variation** of $y$ is a family $y(x) + \eps\,\eta(x)$, where $\eta$ is twice continuously differentiable with $\eta(a) = \eta(b) = 0$, so that every member of the family has the same end values. The path $y$ is **stationary** for $J$ if

$$
\deriv{}{\eps}J[y + \eps\eta]\Big|_{\eps = 0} = 0
$$

for every such $\eta$. This derivative is the **first variation**, written $\delta J$.
:::

Stationary includes minima, maxima and saddles, exactly as for ordinary functions. Finding the shortest curve between two points, the surface of least area spanning a wire, or the shape of a hanging chain are all problems of this type. So, as we shall see, is the motion of a particle.

The key step is a lemma that converts "an integral vanishes for every $\eta$" into "the integrand vanishes".

::: lemma Fundamental lemma of the calculus of variations {#lem-fundamental}
Let $g$ be continuous on $[a, b]$. If $\int_a^b g(x)\eta(x)\,\dd x = 0$ for every twice continuously differentiable $\eta$ with $\eta(a) = \eta(b) = 0$, then $g(x) = 0$ for all $x$ in $[a, b]$.
:::

::: proof
Suppose instead that $g(x_0) \neq 0$ at some point $x_0$ in the open interval $(a, b)$; replacing $g$ by $-g$ if necessary, $g(x_0) > 0$. By continuity there is an interval $[x_1, x_2]$ inside $(a, b)$, containing $x_0$, on which $g > 0$. Define

$$
\eta(x) = \begin{cases} (x - x_1)^3 (x_2 - x)^3, & x_1 \le x \le x_2, \\ 0, & \text{otherwise.} \end{cases}
$$

This $\eta$ is twice continuously differentiable (its first and second derivatives vanish at $x_1$ and $x_2$ from both sides), vanishes at $a$ and $b$, and is positive on $(x_1, x_2)$. Then $\int_a^b g\eta\,\dd x = \int_{x_1}^{x_2} g\eta\,\dd x > 0$, contradicting the hypothesis. So $g = 0$ on $(a, b)$, and by continuity at the endpoints too.
:::

::: theorem The Euler–Lagrange equation {#thm-euler-lagrange}
A twice continuously differentiable path $y(x)$ with fixed end values is stationary for the functional [[#eq-functional]] if and only if it satisfies

$$
\deriv{}{x}\left(\pdv{f}{y'}\right) - \pdv{f}{y} = 0 \qquad\text{for } a \le x \le b.
$$ {#eq-euler-lagrange}
:::

::: proof
Differentiate under the integral sign, using the chain rule at fixed $x$:

$$
\deriv{}{\eps}J[y + \eps\eta]\Big|_{\eps=0} = \int_a^b\left(\pdv{f}{y}\,\eta + \pdv{f}{y'}\,\eta'\right)\dd x,
$$

where the partial derivatives are evaluated on the path $y$. Integrate the second term by parts:

$$
\int_a^b \pdv{f}{y'}\,\eta'\,\dd x = \left[\pdv{f}{y'}\,\eta\right]_a^b - \int_a^b \deriv{}{x}\left(\pdv{f}{y'}\right)\eta\,\dd x.
$$

The boundary term vanishes because $\eta(a) = \eta(b) = 0$. Hence

$$
\delta J = \int_a^b\left[\pdv{f}{y} - \deriv{}{x}\left(\pdv{f}{y'}\right)\right]\eta(x)\,\dd x.
$$ {#eq-first-variation}

If [[#eq-euler-lagrange]] holds, the bracket is zero and $\delta J = 0$ for every $\eta$. Conversely, if $\delta J = 0$ for every admissible $\eta$, the bracket, which is continuous because $f$ is twice continuously differentiable and $y$ is twice continuously differentiable, vanishes by [[#lem-fundamental]].
:::

The Euler–Lagrange equation is a second-order ordinary differential equation for $y(x)$, and its two constants of integration are fixed by the two end values. With several unknown functions $y_1, \dots, y_n$ the same argument, varying one function at a time, gives one equation for each.

::: example The shortest path in a plane {#ex-shortest}
Show that the curve of shortest length joining two points of the plane is a straight line.
::: solution
The length of the graph of $y(x)$ from $x = a$ to $x = b$ is

$$
J[y] = \int_a^b\sqrt{1 + y'^2}\,\dd x, \qquad f(y, y', x) = \sqrt{1 + y'^2}.
$$

Here $\partial f/\partial y = 0$ and $\partial f/\partial y' = y'/\sqrt{1 + y'^2}$. The Euler–Lagrange equation [[#eq-euler-lagrange]] says that

$$
\deriv{}{x}\left(\frac{y'}{\sqrt{1 + y'^2}}\right) = 0, \qquad\text{so}\qquad \frac{y'}{\sqrt{1 + y'^2}} = C.
$$

Solving for $y'$ gives $y'^2 = C^2/(1 - C^2)$, a constant. So $y' = m$ is constant and $y = mx + c$, a straight line; the two constants are fixed by the two endpoints. The Euler–Lagrange equation only shows that the line is stationary. That it is a minimum follows here from the triangle inequality, or from the fact that $f$ is a convex function of $y'$.
:::
:::

When $f$ does not depend explicitly on $x$, there is a first integral that saves one integration.

::: corollary Beltrami's identity {#cor-beltrami}
If $\partial f/\partial x = 0$, then along every solution of [[#eq-euler-lagrange]]

$$
f - y'\pdv{f}{y'} = \text{constant}.
$$ {#eq-beltrami}
:::

::: proof
By the chain rule, along a path, $\dd f/\dd x = f_y y' + f_{y'}y'' + f_x$, with $f_x = 0$ by hypothesis. Then

$$
\deriv{}{x}\left(f - y'f_{y'}\right) = f_y y' + f_{y'}y'' - y''f_{y'} - y'\deriv{}{x}f_{y'} = y'\left(f_y - \deriv{}{x}f_{y'}\right) = 0
$$

by the Euler–Lagrange equation.
:::

In mechanics, where $x$ becomes time and $f$ becomes the Lagrangian, Beltrami's identity is energy conservation, and we prove it again in that form in [[#thm-energy]]. Its most famous application is older than mechanics in this form.

::: example The brachistochrone {#ex-brachistochrone}
A bead slides without friction from rest at the origin along a wire to a lower point. Take $y$ measured *downward*. Which shape of wire gives the shortest time of descent?
::: solution
Energy conservation from rest gives the speed after a drop $y$ as $v = \sqrt{2gy}$. The time along the wire is $\int\dd s/v$, so

$$
J[y] = \int_0^{x_1}\frac{\sqrt{1 + y'^2}}{\sqrt{2gy}}\,\dd x.
$$

The integrand has no explicit $x$, so Beltrami's identity [[#eq-beltrami]] applies. With $f \propto \sqrt{1 + y'^2}/\sqrt{y}$,

$$
f - y'f_{y'} = \frac{1}{\sqrt{y}}\left(\sqrt{1 + y'^2} - \frac{y'^2}{\sqrt{1 + y'^2}}\right) = \frac{1}{\sqrt{y}\sqrt{1 + y'^2}},
$$

up to the constant factor $1/\sqrt{2g}$. Setting this equal to a constant gives

$$
y\bigl(1 + y'^2\bigr) = 2R
$$

for some constant $2R > 0$. Try the parametrisation $x = R(\varphi - \sin\varphi)$, $y = R(1 - \cos\varphi)$. Then $\dd x/\dd\varphi = R(1 - \cos\varphi)$ and $\dd y/\dd\varphi = R\sin\varphi$, so

$$
y' = \frac{\sin\varphi}{1 - \cos\varphi}, \qquad 1 + y'^2 = \frac{(1 - \cos\varphi)^2 + \sin^2\varphi}{(1 - \cos\varphi)^2} = \frac{2}{1 - \cos\varphi},
$$

and $y(1 + y'^2) = R(1 - \cos\varphi)\cdot 2/(1 - \cos\varphi) = 2R$. The curve of fastest descent is a **cycloid**, the curve traced by a point on the rim of a wheel of radius $R$ rolling along the underside of the line $y = 0$. The radius $R$ is chosen so that the cycloid passes through the endpoint. [[#exr-cycloid-time]] compares its descent time with that of a straight wire.
:::
:::

## Hamilton's principle {#hamilton}

Now let the independent variable be time and the unknown functions be the generalised coordinates $q_1(t), \dots, q_n(t)$ of a system with $n$ degrees of freedom.

::: definition Action {#def-action}
For a system with Lagrangian $L(q, \dot q, t)$, the **action** of a path $q(t)$ running from the configuration $q^{(1)}$ at time $t_1$ to the configuration $q^{(2)}$ at time $t_2$ is

$$
S[q] = \int_{t_1}^{t_2} L\bigl(q(t), \dot q(t), t\bigr)\,\dd t.
$$ {#eq-action}
:::

::: theorem Hamilton's principle {#thm-hamilton}
For a system with ideal holonomic constraints and forces derivable from a potential $V(q, t)$, take $L = T - V$. Among all paths with the given end configurations at the given times, the actual motion is one for which the action [[#eq-action]] is stationary. Equivalently, the actual motion satisfies Lagrange's equations

$$
\deriv{}{t}\left(\pdv{L}{\dot q_j}\right) - \pdv{L}{q_j} = 0, \qquad j = 1, \dots, n.
$$ {#eq-lagrange}
:::

::: proof
By [[#thm-euler-lagrange]], applied to each $q_j$ in turn with $x$ replaced by $t$, $y$ by $q_j$ and $f$ by $L$, the action is stationary under all variations with fixed endpoints exactly when the $n$ equations [[#eq-lagrange]] hold. [[analytical-mechanics/constraints#thm-lagrange]] showed that, under the stated hypotheses, Newton's laws imply these equations. Conversely, Lagrange's equations are $n$ second-order equations whose solutions, by the existence and uniqueness theorem for ordinary differential equations, are fixed by the initial values of $q$ and $\dot q$; Newton's motion is one such solution, so every solution of [[#eq-lagrange]] with the same initial data is the Newtonian motion.
:::

Hamilton's principle is often called the principle of *least* action. For a short enough time interval the stationary point is indeed a minimum, but over longer intervals it can be a saddle point. A pendulum swinging for longer than half a period is an example. "Stationary action" is the accurate name.

The principle has a striking practical consequence. To find the equations of motion in any coordinates, you need only write $T$ and $V$ in those coordinates. No accelerations need to be transformed, because the action is a scalar and its value along a path does not care which coordinates were used to describe that path.

::: example Stationary action for a thrown stone {#ex-stone-action}
A stone of mass $m = 1.00\,\mathrm{kg}$ is thrown vertically and returns to its starting height after $1.00\,\mathrm{s}$. Compare the action of the true path $y_0(t) = \frac12 gt(1 - t)$ with that of the varied paths $y_0(t) + a\sin\pi t + b\sin 2\pi t$, in SI units.
::: solution
With $L = \frac12 m\dot y^2 - mgy$ and $m = 1$, the action of $y_0 + \eps\eta$ is

$$
S[y_0 + \eps\eta] = S[y_0] + \eps\int_0^1\bigl(\dot y_0\dot\eta - g\eta\bigr)\dd t + \frac{\eps^2}{2}\int_0^1\dot\eta^2\,\dd t.
$$

The linear term is the first variation. Integrating $\dot y_0\dot\eta$ by parts and using $\eta(0) = \eta(1) = 0$, it becomes $-\int_0^1(\ddot y_0 + g)\eta\,\dd t$, which is zero because $\ddot y_0 = -g$. So the true path is stationary. The quadratic term is positive for any non-zero $\eta$, so here the true path is a minimum, and the excess action is exactly $\frac12\int\dot\eta^2\,\dd t$. Because the integral of $\cos\pi t\cos 2\pi t$ over $[0,1]$ is zero, the two sine terms contribute separately:

$$
S = S[y_0] + \frac{\pi^2}{4}a^2 + \pi^2 b^2.
$$

The action of the true path is

$$
S[y_0] = \int_0^1\left[\tfrac12\bigl(4.90(1 - 2t)\bigr)^2 - (9.80)(4.90)\,t(1-t)\right]\dd t = \frac{24.01}{6} - \frac{48.02}{6} = -4.00\,\mathrm{J\,s}.
$$

A wrong path with $a = 1.00\,\mathrm{m}$ has action $-4.00 + 2.47 = -1.53\,\mathrm{J\,s}$, larger than the true value. A numerical quadrature of the action confirms all three numbers.
:::
:::

::: widget plot
f: 4.9*x*(1-x); 4.9*x*(1-x) + a*sin(pi*x) + b*sin(2*pi*x)
x: 0, 1
y: -1.5, 3
sliders: a=0.5:-1.5:1.5:0.05; b=0:-1:1:0.05
labels: true path; varied path
caption: Height against time for the stone of the worked example. The first curve is the true path; the second adds $a\sin\pi t + b\sin 2\pi t$, which keeps both endpoints fixed. The action of the varied path is $-4.00 + 2.47a^2 + 9.87b^2$ in $\mathrm{J\,s}$. Move either slider away from zero and the action can only grow. Notice that a path which rises higher (positive $a$) is not penalised for its potential energy alone: what costs action is the extra kinetic energy needed to get there and back in the same time.
:::

### What Hamilton's principle does not fix

The Lagrangian of a given system is not unique. Multiplying $L$ by a constant changes nothing, nor does adding a constant. A less obvious freedom is very useful.

::: proposition Adding a total derivative {#prop-gauge}
Let $F(q, t)$ be any twice continuously differentiable function of the coordinates and time. Then $L$ and

$$
L' = L + \deriv{F}{t} = L + \sum_j\pdv{F}{q_j}\dot q_j + \pdv{F}{t}
$$

give the same Lagrange equations.
:::

::: proof
The actions differ by a constant that depends only on the endpoints:

$$
S'[q] = S[q] + \int_{t_1}^{t_2}\deriv{F}{t}\,\dd t = S[q] + F\bigl(q^{(2)}, t_2\bigr) - F\bigl(q^{(1)}, t_1\bigr).
$$

All paths in the comparison share the same endpoints, so $S'$ and $S$ differ by the same constant for every path, and they are stationary on the same paths. By [[#thm-hamilton]] the equations of motion coincide.
:::

This freedom appears whenever we change frames or gauges. It also matters in Noether's theorem: a transformation can be a symmetry of the physics even if it changes $L$, as long as it changes $L$ only by a total derivative.

::: quiz
Which of the following Lagrangians gives the same equation of motion as $L = \frac12 m\dot x^2 - \frac12 kx^2$?
- [x] $L_1 = \frac12 m\dot x^2 - \frac12 kx^2 + 3x\dot x$
- [ ] $L_2 = \frac12 m\dot x^2 - \frac12 kx^2 + 3x\dot x^2$
- [x] $L_3 = m\dot x^2 - kx^2$
- [ ] $L_4 = \frac12 m\dot x^2 + \frac12 kx^2$
::: solution
$L_1$ adds $3x\dot x = \dd(\frac32 x^2)/\dd t$, a total derivative, so by [[#prop-gauge]] the equation is unchanged; check directly that $\partial(3x\dot x)/\partial\dot x = 3x$ has time derivative $3\dot x$, cancelling $\partial(3x\dot x)/\partial x = 3\dot x$. $L_3$ is $2L$, and an overall factor cancels. $L_2$ adds $3x\dot x^2$, which is not a total derivative and adds the terms $6x\ddot x + 3\dot x^2$ to the equation. $L_4$ flips the sign of the potential and describes an unstable equilibrium, with solutions that grow like $e^{\sqrt{k/m}\,t}$.
:::
:::

## Working with Lagrangians {#examples}

The examples below follow the four steps of [[analytical-mechanics/constraints#dalembert]]: coordinates, $T$ and $V$, $L$, equations. In each one, look out for a coordinate that does not appear in $L$.

::: example A pendulum hanging from a sliding cart {#ex-cart}
A cart of mass $M$ slides without friction on a horizontal rail. From it hangs a simple pendulum of length $\ell$ and bob mass $m$, swinging in the vertical plane containing the rail. Find the equations of motion, a conserved quantity, and the angular frequency of small oscillations.
::: solution
Two degrees of freedom: the position $x$ of the cart and the angle $\phi$ of the pendulum from the downward vertical. The bob is at $(x + \ell\sin\phi, -\ell\cos\phi)$, with velocity $(\dot x + \ell\dot\phi\cos\phi, \ell\dot\phi\sin\phi)$. So

$$
T = \tfrac12 M\dot x^2 + \tfrac12 m\bigl(\dot x^2 + 2\ell\dot x\dot\phi\cos\phi + \ell^2\dot\phi^2\bigr), \qquad V = -mg\ell\cos\phi.
$$

The coordinate $x$ does not appear in $L = T - V$, only its velocity. Its Lagrange equation is therefore

$$
\deriv{}{t}\left(\pdv{L}{\dot x}\right) = 0, \qquad p_x \equiv \pdv{L}{\dot x} = (M + m)\dot x + m\ell\dot\phi\cos\phi = \text{constant}.
$$

This is conservation of the horizontal momentum of the cart and bob together, which we knew from Newton's third law; here it falls out of the absence of $x$ from $L$. The equation for $\phi$ is

$$
m\ell^2\ddot\phi + m\ell\ddot x\cos\phi - m\ell\dot x\dot\phi\sin\phi + m\ell\dot x\dot\phi\sin\phi + mg\ell\sin\phi = 0,
$$

that is, $\ell\ddot\phi + \ddot x\cos\phi + g\sin\phi = 0$. For small oscillations from rest with $p_x = 0$, linearise: $\cos\phi \approx 1$, $\sin\phi \approx \phi$, and momentum conservation gives $(M + m)\ddot x = -m\ell\ddot\phi$. Substituting,

$$
\ell\ddot\phi\left(1 - \frac{m}{M + m}\right) + g\phi = 0, \qquad \omega^2 = \frac{(M + m)\,g}{M\ell}.
$$

A massive cart ($M \gg m$) gives the ordinary pendulum $\omega^2 = g/\ell$. A light cart lets the pivot recoil, which raises the frequency: the bob and cart swing about their common centre of mass, which is closer to the bob than the pivot is.
:::
:::

::: definition Generalised momentum and cyclic coordinate {#def-cyclic}
The **generalised momentum** conjugate to $q_j$ is $p_j = \partial L/\partial\dot q_j$. A coordinate $q_j$ that does not appear in $L$ (although $\dot q_j$ may) is called **cyclic** or **ignorable**. By [[#eq-lagrange]], the momentum conjugate to a cyclic coordinate is conserved.
:::

A generalised momentum need not be a linear momentum. For the angle $\phi$ of a particle in the plane with $L = \frac12 m(\dot r^2 + r^2\dot\phi^2) - V(r)$, $p_\phi = mr^2\dot\phi$ is the angular momentum, and it is conserved because $V$ does not depend on $\phi$. In a magnetic field, as below, $p$ is not even $m\mathbf{v}$.

## Symmetries and conservation laws {#noether}

Cyclic coordinates are a special case of a deep connection. A **continuous symmetry** of a system is a family of transformations, depending smoothly on a parameter, that leaves the Lagrangian unchanged. Translating a free particle, rotating a particle in a central field, and shifting the origin of time for a system whose Lagrangian has no explicit time dependence are examples.

::: theorem Noether's theorem {#thm-noether}
Suppose that for each real $\eps$ the transformation $q_j \mapsto q_j + \eps K_j(q)$, with $\dot q_j \mapsto \dot q_j + \eps\sum_k(\partial K_j/\partial q_k)\dot q_k$ the induced change of velocities, leaves the Lagrangian unchanged to first order in $\eps$:

$$
\sum_j\left(\pdv{L}{q_j}K_j + \pdv{L}{\dot q_j}\dot K_j\right) = 0, \qquad \dot K_j = \sum_k\pdv{K_j}{q_k}\dot q_k,
$$ {#eq-symmetry}

for all $q$, $\dot q$ and $t$. Then along every solution of Lagrange's equations the quantity

$$
I = \sum_{j=1}^n p_j K_j(q) = \sum_j\pdv{L}{\dot q_j}K_j
$$ {#eq-noether-charge}

is constant.
:::

::: proof
Along a motion, differentiate $I$ with the product rule and use Lagrange's equations in the form $\dot p_j = \partial L/\partial q_j$:

$$
\deriv{I}{t} = \sum_j\bigl(\dot p_j K_j + p_j\dot K_j\bigr) = \sum_j\left(\pdv{L}{q_j}K_j + \pdv{L}{\dot q_j}\dot K_j\right).
$$

Here $\dot K_j$ is the time derivative of $K_j(q(t))$ along the motion, which by the chain rule is the expression in [[#eq-symmetry]]. The right-hand side is therefore the left-hand side of [[#eq-symmetry]], which vanishes by hypothesis.
:::

A cyclic coordinate is the case $K_j = 1$ for one $j$ and $K_k = 0$ for the rest: shifting $q_j$ does not change $L$, and $I = p_j$. The theorem says more, because the symmetry need not be visible as a missing coordinate in your chosen coordinates.

::: example Momentum and angular momentum from Noether's theorem {#ex-noether}
A system of $N$ particles has Lagrangian $L = \sum_i\frac12 m_i\dot{\mathbf{r}}_i^2 - V$, where $V$ depends only on the differences $\mathbf{r}_i - \mathbf{r}_k$. Use Noether's theorem to show that total linear momentum is conserved. If in addition $V$ depends only on the distances $\abs{\mathbf{r}_i - \mathbf{r}_k}$, show that total angular momentum is conserved.
::: solution
Translation: shift every particle by $\eps\hat{\mathbf{n}}$ for a fixed unit vector $\hat{\mathbf{n}}$, so $K_i = \hat{\mathbf{n}}$ for each particle (three components each). Velocities are unchanged, $\dot K_i = 0$, and differences of positions are unchanged, so $L$ is unchanged. The conserved quantity [[#eq-noether-charge]] is

$$
I = \sum_i\pdv{L}{\dot{\mathbf{r}}_i}\cdot\hat{\mathbf{n}} = \sum_i m_i\dot{\mathbf{r}}_i\cdot\hat{\mathbf{n}} = \mathbf{P}\cdot\hat{\mathbf{n}}.
$$

Since $\hat{\mathbf{n}}$ is arbitrary, every component of the total momentum $\mathbf{P}$ is conserved.

Rotation: an infinitesimal rotation by angle $\eps$ about the axis $\hat{\mathbf{n}}$ moves each particle by $\eps\,\hat{\mathbf{n}}\times\mathbf{r}_i$, so $K_i = \hat{\mathbf{n}}\times\mathbf{r}_i$ and $\dot K_i = \hat{\mathbf{n}}\times\dot{\mathbf{r}}_i$. Rotations preserve distances, so $V$ is unchanged. The change in kinetic energy is $\eps\sum_i m_i\dot{\mathbf{r}}_i\cdot(\hat{\mathbf{n}}\times\dot{\mathbf{r}}_i) = 0$, because a scalar triple product with a repeated vector vanishes. So [[#eq-symmetry]] holds and

$$
I = \sum_i m_i\dot{\mathbf{r}}_i\cdot\bigl(\hat{\mathbf{n}}\times\mathbf{r}_i\bigr) = \hat{\mathbf{n}}\cdot\sum_i\mathbf{r}_i\times m_i\dot{\mathbf{r}}_i = \hat{\mathbf{n}}\cdot\mathbf{L}
$$

is conserved, using the cyclic property of the triple product. Again $\hat{\mathbf{n}}$ is arbitrary, so the whole angular momentum vector is constant. Homogeneity of space gives momentum; isotropy of space gives angular momentum.
:::
:::

The third classical symmetry is homogeneity in time. It does not fit the form [[#eq-symmetry]], because it shifts $t$ rather than $q$, but the corresponding conservation law has a direct proof.

::: definition Energy function {#def-energy-function}
The **energy function** (or Jacobi integral) of a Lagrangian $L(q, \dot q, t)$ is

$$
h(q, \dot q, t) = \sum_{j=1}^n\dot q_j\pdv{L}{\dot q_j} - L.
$$ {#eq-energy-function}
:::

::: theorem Conservation of the energy function {#thm-energy}
Along every solution of Lagrange's equations, $\dd h/\dd t = -\partial L/\partial t$. In particular, if $L$ does not depend explicitly on time, $h$ is constant.
:::

::: proof
The total time derivative of $L$ along a motion is, by the chain rule,

$$
\deriv{L}{t} = \sum_j\left(\pdv{L}{q_j}\dot q_j + \pdv{L}{\dot q_j}\ddot q_j\right) + \pdv{L}{t}.
$$

The time derivative of the first term of $h$ is $\sum_j(\ddot q_j\,\partial L/\partial\dot q_j + \dot q_j\,\dd(\partial L/\partial\dot q_j)/\dd t)$. Subtracting,

$$
\deriv{h}{t} = \sum_j\dot q_j\left[\deriv{}{t}\left(\pdv{L}{\dot q_j}\right) - \pdv{L}{q_j}\right] - \pdv{L}{t} = -\pdv{L}{t},
$$

since every bracket vanishes by [[#eq-lagrange]].
:::

When is $h$ the familiar $T + V$? Suppose the constraints are scleronomic, so that $T = \frac12\sum_{j,k}M_{jk}(q)\dot q_j\dot q_k$ is homogeneous of degree two in the velocities, and $V$ does not depend on the velocities. Then $\sum_j\dot q_j\,\partial T/\partial\dot q_j = 2T$ (Euler's theorem for homogeneous functions, checked in [[#exr-euler-homog]]), and $h = 2T - (T - V) = T + V$. If the constraints move, $T$ contains terms of degree one and zero in $\dot q$, and $h$ is a different function from the energy. Both of the following can happen: $h$ conserved while $T + V$ is not, and $T + V$ conserved while $h$ is not.

::: example The spinning hoop revisited {#ex-hoop-h}
For the bead on a hoop spinning at constant $\omega$, from [[analytical-mechanics/constraints]], with $L = \frac12 mR^2(\dot\theta^2 + \omega^2\sin^2\theta) + mgR\cos\theta$, find the conserved quantity and show that $T + V$ is not conserved.
::: solution
$L$ has no explicit $t$, so [[#thm-energy]] gives a constant

$$
h = \dot\theta\,mR^2\dot\theta - L = \tfrac12 mR^2\dot\theta^2 - \tfrac12 mR^2\omega^2\sin^2\theta - mgR\cos\theta.
$$

The energy $E = T + V = \frac12 mR^2\dot\theta^2 + \frac12 mR^2\omega^2\sin^2\theta - mgR\cos\theta$ differs from $h$ by $mR^2\omega^2\sin^2\theta$:

$$
E = h + mR^2\omega^2\sin^2\theta, \qquad \deriv{E}{t} = 2mR^2\omega^2\sin\theta\cos\theta\,\dot\theta.
$$

When the bead moves outward ($\sin\theta$ increasing) its energy increases. The energy comes from the motor that keeps $\omega$ constant: the bead's angular momentum about the axis, $mR^2\omega\sin^2\theta$, must grow, and the torque that supplies it does work at the rate $\omega\,\dd(mR^2\omega\sin^2\theta)/\dd t$, which is exactly $\dd E/\dd t$. The function $h$ is the energy in the rotating frame, kinetic energy relative to the hoop plus gravitational plus centrifugal potential energy.
:::
:::

::: warning A missing coordinate is not a missing symmetry
Whether a coordinate is cyclic depends on the coordinates you chose; whether the system has a symmetry does not. A free particle in Cartesian coordinates has three cyclic coordinates and no visible angular-momentum conservation; in spherical coordinates $\phi$ is cyclic and $x$ is not. Do not conclude that a quantity is not conserved because no coordinate is missing. Noether's theorem with the right $K_j$ finds the conservation law in any coordinates. Conversely, do not call $p_j$ "momentum" or $h$ "energy" without checking: they are what the formalism conserves, and they agree with the Newtonian quantities only under the conditions above.
:::

## Velocity-dependent potentials: the charged particle {#charged}

The derivation in [[analytical-mechanics/constraints]] needed forces of the form $-\nabla V$. A charged particle in a magnetic field feels a force that depends on its velocity, and yet it has a Lagrangian.

::: proposition Lagrangian of a charged particle {#prop-charged}
A particle of mass $m$ and charge $q$ in an electromagnetic field with scalar potential $\varphi(\mathbf{r}, t)$ and vector potential $\mathbf{A}(\mathbf{r}, t)$, so that $\mathbf{E} = -\nabla\varphi - \partial\mathbf{A}/\partial t$ and $\mathbf{B} = \nabla\times\mathbf{A}$, has Lagrangian

$$
L = \tfrac12 m\dot{\mathbf{r}}^2 - q\varphi + q\,\dot{\mathbf{r}}\cdot\mathbf{A}.
$$ {#eq-charged}

Its Lagrange equations are $m\ddot{\mathbf{r}} = q(\mathbf{E} + \dot{\mathbf{r}}\times\mathbf{B})$.
:::

::: proof
Work with the $x$-component; the others follow by cyclic permutation. The canonical momentum is $p_x = \partial L/\partial\dot x = m\dot x + qA_x$. Its total time derivative along the path is

$$
\deriv{p_x}{t} = m\ddot x + q\left(\pdv{A_x}{t} + \dot x\pdv{A_x}{x} + \dot y\pdv{A_x}{y} + \dot z\pdv{A_x}{z}\right).
$$

The other side of Lagrange's equation is

$$
\pdv{L}{x} = -q\pdv{\varphi}{x} + q\left(\dot x\pdv{A_x}{x} + \dot y\pdv{A_y}{x} + \dot z\pdv{A_z}{x}\right).
$$

Equating, the $\dot x\,\partial A_x/\partial x$ terms cancel and

$$
m\ddot x = q\left(-\pdv{\varphi}{x} - \pdv{A_x}{t}\right) + q\left[\dot y\left(\pdv{A_y}{x} - \pdv{A_x}{y}\right) - \dot z\left(\pdv{A_x}{z} - \pdv{A_z}{x}\right)\right].
$$

The first bracket is $E_x$. The second is $\dot y B_z - \dot z B_y = (\dot{\mathbf{r}}\times\mathbf{B})_x$, because $B_z = \partial_x A_y - \partial_y A_x$ and $B_y = \partial_z A_x - \partial_x A_z$.
:::

Two lessons hide in this result. First, the generalised momentum $\mathbf{p} = m\dot{\mathbf{r}} + q\mathbf{A}$ is not the kinetic momentum $m\dot{\mathbf{r}}$. It is $\mathbf{p}$, not $m\dot{\mathbf{r}}$, that becomes the operator $-i\hbar\nabla$ in quantum mechanics. Second, a gauge transformation $\mathbf{A} \to \mathbf{A} + \nabla\chi$, $\varphi \to \varphi - \partial\chi/\partial t$ leaves $\mathbf{E}$ and $\mathbf{B}$ unchanged and changes $L$ by $q(\dot{\mathbf{r}}\cdot\nabla\chi + \partial\chi/\partial t) = q\,\dd\chi/\dd t$, a total derivative. [[#prop-gauge]] is exactly the statement that gauge transformations do not change the motion.

::: history From least action to Noether
Pierre-Louis Moreau de Maupertuis proposed a principle of least action in 1744, with a theological flavour. Leonhard Euler, in his *Methodus inveniendi lineas curvas* of the same year, gave a precise version for a particle and derived the equation we call Euler–Lagrange by a discretisation argument. The nineteen-year-old Joseph-Louis Lagrange wrote to Euler in 1755 with the method of variations, the $\delta$, used here, and Euler adopted it and named the subject the calculus of variations. Lagrange built the whole of mechanics on it in the *Mécanique analytique* (1788). William Rowan Hamilton stated the principle in the form used here, with the time fixed at both ends and $L = T - V$, in his papers "On a General Method in Dynamics" in the *Philosophical Transactions* of 1834 and 1835. The brachistochrone problem is older still: Johann Bernoulli posed it in *Acta Eruditorum* in 1696, and solutions by Johann and Jacob Bernoulli, Leibniz, l'Hôpital and an anonymous Newton were published in 1697. Emmy Noether proved the general connection between symmetries and conservation laws, for both mechanics and field theory, in "Invariante Variationsprobleme" (Göttingen, 1918), written while she was helping Hilbert and Klein understand energy conservation in general relativity.
:::

## Where this leads {#leads}

[[analytical-mechanics/central-forces]] uses the cyclic angle of a central-force Lagrangian to reduce a three-dimensional problem to one dimension. [[analytical-mechanics/rigid-bodies]] applies the Lagrangian to rotation and needs the energy and angular momentum integrals proved here. [[analytical-mechanics/hamiltonian]] makes the generalised momenta $p_j$ into independent variables alongside the $q_j$; the energy function $h$ of [[#def-energy-function]] becomes the Hamiltonian. The same variational principle, with $L$ replaced by a Lagrangian density, gives Maxwell's equations and the field equations of particle physics, and in [[quantum-1]] Feynman's path integral weights every path by $e^{iS/\hbar}$, so that stationary action emerges as the classical limit.

For more on second-order equations such as those produced by [[#eq-lagrange]], see [second-order linear equations](/learn/maths/lesson.php?c=ode&l=second-order-linear) and [existence and uniqueness](/learn/maths/lesson.php?c=ode&l=existence-uniqueness) in the Maths Atlas.

::: summary
- A functional $J[y] = \int f(y, y', x)\,\dd x$ is stationary under variations with fixed endpoints if and only if $y$ obeys the Euler–Lagrange equation $\frac{\dd}{\dd x}\frac{\partial f}{\partial y'} = \frac{\partial f}{\partial y}$; the proof is integration by parts plus the fundamental lemma.
- Hamilton's principle: the actual motion makes the action $S = \int L\,\dd t$ stationary among paths with the same endpoints and times. Its Euler–Lagrange equations are Lagrange's equations.
- Stationary does not always mean least; and $L$ is unique only up to a constant factor and an added total derivative $\dd F(q, t)/\dd t$.
- The generalised momentum $p_j = \partial L/\partial\dot q_j$ of a cyclic coordinate is conserved.
- Noether's theorem: if $q \to q + \eps K(q)$ leaves $L$ unchanged, then $\sum_j p_j K_j$ is conserved. Translations give momentum, rotations give angular momentum.
- If $\partial L/\partial t = 0$ then $h = \sum\dot q_j\,\partial L/\partial\dot q_j - L$ is conserved; it equals $T + V$ only when $T$ is quadratic in the velocities and $V$ is velocity-independent.
- A charged particle has $L = \frac12 mv^2 - q\varphi + q\mathbf{v}\cdot\mathbf{A}$, which gives the Lorentz force; its canonical momentum is $m\mathbf{v} + q\mathbf{A}$.
:::

## Exercises {#exercises}

::: exercise The harmonic oscillator {level=1 check="2"}
A particle of mass $m = 1.00\,\mathrm{kg}$ has Lagrangian $L = \frac12 m\dot x^2 - \frac12 kx^2$ with $k = 4.00\,\mathrm{N/m}$. Write down Lagrange's equation and find the angular frequency of the motion in $\mathrm{rad/s}$.
::: solution
$\partial L/\partial\dot x = m\dot x$ and $\partial L/\partial x = -kx$, so Lagrange's equation [[#eq-lagrange]] is $m\ddot x + kx = 0$. Its solutions are $x = A\cos(\omega t + \delta)$ with $\omega = \sqrt{k/m} = \sqrt{4.00/1.00} = 2.00\,\mathrm{rad/s}$.
:::
:::

::: exercise Momentum of the cart and pendulum {level=1 check="1.9"}
For the cart and pendulum of [[#ex-cart]] with $M = 2.00\,\mathrm{kg}$, $m = 1.00\,\mathrm{kg}$ and $\ell = 0.500\,\mathrm{m}$, at an instant when $\dot x = 0.300\,\mathrm{m/s}$, $\phi = 0$ and $\dot\phi = 2.00\,\mathrm{rad/s}$, find the conserved momentum $p_x$ in $\mathrm{kg\,m/s}$.
::: solution
From the example, $p_x = (M + m)\dot x + m\ell\dot\phi\cos\phi = (3.00)(0.300) + (1.00)(0.500)(2.00)(1) = 0.900 + 1.00 = 1.90\,\mathrm{kg\,m/s}$. The second term is the horizontal momentum of the bob due to its swing, $m\ell\dot\phi\cos\phi$. This value stays fixed for the whole subsequent motion.
:::
:::

::: exercise The spherical pendulum {level=1}
A bob of mass $m$ on a light rod of length $\ell$ moves freely on the sphere of radius $\ell$ about a fixed pivot. Using the polar angle $\theta$ from the downward vertical and the azimuth $\phi$, write down the Lagrangian, identify a cyclic coordinate and its conserved momentum, and write the conserved energy function.
::: solution
The bob is at $\ell(\sin\theta\cos\phi, \sin\theta\sin\phi, -\cos\theta)$, so its speed squared is $\ell^2(\dot\theta^2 + \sin^2\theta\,\dot\phi^2)$ and

$$
L = \tfrac12 m\ell^2\bigl(\dot\theta^2 + \sin^2\theta\,\dot\phi^2\bigr) + mg\ell\cos\theta.
$$

The azimuth $\phi$ is cyclic, so $p_\phi = m\ell^2\sin^2\theta\,\dot\phi$ is conserved; it is the angular momentum about the vertical axis through the pivot, conserved because gravity and the rod tension exert no torque about that axis. $L$ has no explicit $t$, and $T$ is quadratic in the velocities, so $h = T + V = \frac12 m\ell^2(\dot\theta^2 + \sin^2\theta\,\dot\phi^2) - mg\ell\cos\theta$ is conserved. Eliminating $\dot\phi = p_\phi/(m\ell^2\sin^2\theta)$ turns energy conservation into a one-dimensional problem for $\theta$, the same reduction used in [[analytical-mechanics/central-forces]].
:::
:::

::: exercise Descent time on the cycloid {level=2 check="pi/sqrt(9.8)" #exr-cycloid-time}
For the brachistochrone of [[#ex-brachistochrone]] with $R = 1.00\,\mathrm{m}$, a bead starts from rest at $\varphi = 0$ and slides to the lowest point, $\varphi = \pi$, at $(\pi R, 2R)$. Show that the descent time is $\pi\sqrt{R/g}$ and evaluate it in seconds. Compare with the time along the straight wire joining the same two points.
::: hint
On the cycloid, $\dd s = 2R\sin(\varphi/2)\,\dd\varphi$ and $v = \sqrt{2gy} = 2\sqrt{gR}\sin(\varphi/2)$. On the straight wire the acceleration is constant.
:::
::: solution
From $\dd x/\dd\varphi = R(1 - \cos\varphi)$ and $\dd y/\dd\varphi = R\sin\varphi$,

$$
\left(\deriv{s}{\varphi}\right)^2 = R^2\bigl[(1 - \cos\varphi)^2 + \sin^2\varphi\bigr] = 2R^2(1 - \cos\varphi) = 4R^2\sin^2(\varphi/2).
$$

The speed after dropping $y = R(1 - \cos\varphi) = 2R\sin^2(\varphi/2)$ is $v = \sqrt{2gy} = 2\sqrt{gR}\sin(\varphi/2)$. Hence $\dd t = \dd s/v = \sqrt{R/g}\,\dd\varphi$, and the time from $\varphi = 0$ to $\varphi = \pi$ is $\pi\sqrt{R/g} = \pi/\sqrt{9.80} = 1.00\,\mathrm{s}$.

The straight wire from $(0, 0)$ to $(\pi R, 2R)$ has length $D = R\sqrt{\pi^2 + 4}$ and slope angle with $\sin\alpha = 2R/D$. The acceleration along it is $g\sin\alpha$, so from $D = \frac12 g\sin\alpha\,t^2$,

$$
t = \sqrt{\frac{2D}{g\sin\alpha}} = \sqrt{\frac{D^2}{gR}} = \sqrt{\frac{(\pi^2 + 4)R}{g}} = 1.19\,\mathrm{s}.
$$

The cycloid wins by about $16\%$, by dropping steeply at first and building up speed early. A remarkable further property: on the cycloid, $\dd t = \sqrt{R/g}\,\dd\varphi$ means that a bead released from rest at any point reaches the bottom in the same time $\pi\sqrt{R/g}$, the **tautochrone** property used by Huygens for pendulum clocks.
:::
:::

::: exercise Small oscillations of the cart pendulum {level=2 check="sqrt(29.4)"}
For [[#ex-cart]] with $M = 2.00\,\mathrm{kg}$, $m = 1.00\,\mathrm{kg}$ and $\ell = 0.500\,\mathrm{m}$, find the angular frequency of small oscillations in $\mathrm{rad/s}$, and the ratio of the amplitudes of $x$ and $\ell\phi$.
::: solution
From the example, $\omega^2 = (M + m)g/(M\ell) = (3.00)(9.80)/((2.00)(0.500)) = 29.4\,\mathrm{s^{-2}}$, so $\omega = \sqrt{29.4} = 5.42\,\mathrm{rad/s}$, compared with $\sqrt{g/\ell} = 4.43\,\mathrm{rad/s}$ for a fixed pivot. With $p_x = 0$, linearised momentum conservation gives $(M + m)\dot x = -m\ell\dot\phi$, so $x = -\frac{m}{M + m}\ell\phi$ (taking the centre of mass at rest at the origin): the cart moves opposite to the bob with one third of the bob's horizontal displacement.
:::
:::

::: exercise A charged particle in a uniform magnetic field {level=2 check="12"}
A particle of mass $m = 0.500$ and charge $q = 2.00$ (in some consistent units) moves in a uniform field $\mathbf{B} = B\hat{\mathbf{z}}$ with $B = 3.00$, described by $\mathbf{A} = (0, Bx, 0)$ and $\varphi = 0$. Write the Lagrangian, find a cyclic coordinate and its conserved momentum, and find the angular frequency of the circular motion in the $xy$-plane.
::: solution
First check the potential: $\nabla\times\mathbf{A} = (0, 0, \partial_x(Bx)) = B\hat{\mathbf{z}}$. By [[#eq-charged]],

$$
L = \tfrac12 m\bigl(\dot x^2 + \dot y^2 + \dot z^2\bigr) + qB x\dot y.
$$

Both $y$ and $z$ are cyclic. The momentum $p_y = m\dot y + qBx$ is conserved, and so is $p_z = m\dot z$. The $x$-equation is $m\ddot x = qB\dot y$. Using $\dot y = (p_y - qBx)/m$,

$$
m\ddot x = \frac{qB}{m}\bigl(p_y - qBx\bigr), \qquad \ddot x = -\left(\frac{qB}{m}\right)^2\left(x - \frac{p_y}{qB}\right),
$$

simple harmonic motion about $x_0 = p_y/(qB)$ with angular frequency $\omega_c = qB/m = (2.00)(3.00)/0.500 = 12.0$, the cyclotron frequency. Note that $p_y$ is conserved although the kinetic momentum $m\dot y$ oscillates; the conserved quantity fixes the $x$-coordinate of the centre of the circle. With the gauge $\mathbf{A} = (-By, 0, 0)$, $x$ would be cyclic instead and $p_x$ would fix the centre's $y$-coordinate.
:::
:::

::: exercise A total derivative in practice {level=2}
Show directly that $L = \frac12 m\dot x^2 - mgx$ and $L' = \frac12 m\dot x^2 + mgt\,\dot x$ give the same equation of motion, and find the function $F(x, t)$ of [[#prop-gauge]] with $L' = L + \dd F/\dd t$. Find the energy function of each, and say which is conserved.
::: solution
For $L$, Lagrange's equation is $m\ddot x = -mg$. For $L'$, $\partial L'/\partial\dot x = m\dot x + mgt$, whose time derivative is $m\ddot x + mg$, and $\partial L'/\partial x = 0$. Lagrange's equation is $m\ddot x + mg = 0$, the same.

The difference is $L' - L = mgt\dot x + mgx$. Try $F = mgxt$: then $\dd F/\dd t = mg\dot x t + mgx$, which is exactly the difference. So $F(x, t) = mgxt$.

The energy functions [[#eq-energy-function]] are

$$
h = \dot x(m\dot x) - L = \tfrac12 m\dot x^2 + mgx, \qquad h' = \dot x(m\dot x + mgt) - L' = \tfrac12 m\dot x^2.
$$

The first is conserved, since $L$ has no explicit time dependence. The second is not: $\partial L'/\partial t = mg\dot x \neq 0$, and indeed [[#thm-energy]] gives $\dd h'/\dd t = -mg\dot x$, which is what $\frac12 m\dot x^2$ does in free fall. Adding a total derivative never changes the motion, but it can change which function the formalism labels as the energy. Be careful too with the converse: a term of the form "velocity times something" is a total derivative only if it equals $\dd F(q, t)/\dd t$ for some $F$, and $mgt\dot x$ alone is not one.
:::
:::

::: exercise Euler's theorem and the energy function {level=3 #exr-euler-homog}
Let $T(q, \dot q) = \frac12\sum_{j,k}M_{jk}(q)\dot q_j\dot q_k$ with $M$ symmetric. Prove that $\sum_j\dot q_j\,\partial T/\partial\dot q_j = 2T$. Deduce that if $L = T - V(q)$ then $h = T + V$. Then let $T = T_2 + T_1 + T_0$ with $T_k$ homogeneous of degree $k$ in $\dot q$, and show that $h = T_2 - T_0 + V$.
::: solution
Differentiate: $\partial T/\partial\dot q_l = \frac12\sum_{j,k}M_{jk}(\delta_{jl}\dot q_k + \dot q_j\delta_{kl}) = \frac12(\sum_k M_{lk}\dot q_k + \sum_j M_{jl}\dot q_j) = \sum_k M_{lk}\dot q_k$, using the symmetry of $M$. Then

$$
\sum_l\dot q_l\pdv{T}{\dot q_l} = \sum_{l,k}M_{lk}\dot q_l\dot q_k = 2T.
$$

With $L = T - V(q)$, $\partial L/\partial\dot q_j = \partial T/\partial\dot q_j$, so $h = 2T - (T - V) = T + V$.

More generally, if $T_k$ is homogeneous of degree $k$, meaning $T_k(q, \lambda\dot q) = \lambda^k T_k(q, \dot q)$, differentiate this identity with respect to $\lambda$ and set $\lambda = 1$: $\sum_j\dot q_j\,\partial T_k/\partial\dot q_j = kT_k$. Hence $\sum_j\dot q_j\,\partial L/\partial\dot q_j = 2T_2 + T_1$, and

$$
h = 2T_2 + T_1 - (T_2 + T_1 + T_0 - V) = T_2 - T_0 + V.
$$

For the spinning hoop of [[#ex-hoop-h]], $T_2 = \frac12 mR^2\dot\theta^2$, $T_1 = 0$ and $T_0 = \frac12 mR^2\omega^2\sin^2\theta$, which reproduces the $h$ found there.
:::
:::

::: exercise Noether's theorem for a Galilean boost {level=3}
Generalise [[#thm-noether]]: suppose the transformation $q_j \to q_j + \eps K_j(q, t)$ changes $L$, to first order in $\eps$, by $\eps\,\dd\Lambda(q, t)/\dd t$. Prove that $\sum_j p_jK_j - \Lambda$ is conserved. Apply this to a system of free particles under the boost $\mathbf{r}_i \to \mathbf{r}_i + \eps\mathbf{u}t$, where $\mathbf{u}$ is a fixed unit vector, and interpret the conserved quantity.
::: hint
With $K$ depending on $t$, the change in velocity is $\eps\,\dd K_j/\dd t$, including $\partial K_j/\partial t$. The hypothesis replaces the zero on the right of [[#eq-symmetry]] by $\dd\Lambda/\dd t$.
:::
::: solution
The first-order change of $L$ is $\eps\sum_j(\partial L/\partial q_j\,K_j + \partial L/\partial\dot q_j\,\dot K_j)$, with $\dot K_j = \dd K_j(q(t), t)/\dd t$. The hypothesis says this equals $\eps\,\dd\Lambda/\dd t$. Along a motion, as in the proof of [[#thm-noether]],

$$
\deriv{}{t}\sum_j p_jK_j = \sum_j\left(\pdv{L}{q_j}K_j + p_j\dot K_j\right) = \deriv{\Lambda}{t},
$$

so $\sum_j p_jK_j - \Lambda$ is constant.

For free particles, $L = \sum_i\frac12 m_i\dot{\mathbf{r}}_i^2$ and $K_i = \mathbf{u}t$, so $\dot K_i = \mathbf{u}$. The change of $L$ is $\eps\sum_i m_i\dot{\mathbf{r}}_i\cdot\mathbf{u} = \eps\,\dd(\sum_i m_i\mathbf{r}_i\cdot\mathbf{u})/\dd t$, so $\Lambda = \sum_i m_i\mathbf{r}_i\cdot\mathbf{u} = M\mathbf{R}\cdot\mathbf{u}$, where $M$ is the total mass and $\mathbf{R}$ the centre of mass. The conserved quantity is

$$
\sum_i m_i\dot{\mathbf{r}}_i\cdot\mathbf{u}\,t - M\mathbf{R}\cdot\mathbf{u} = \bigl(\mathbf{P}t - M\mathbf{R}\bigr)\cdot\mathbf{u}.
$$

Since $\mathbf{u}$ is arbitrary, $M\mathbf{R} - \mathbf{P}t$ is a constant vector, say $M\mathbf{R}_0$. So $\mathbf{R}(t) = \mathbf{R}_0 + (\mathbf{P}/M)t$: the centre of mass moves uniformly. Invariance under Galilean boosts is the symmetry behind the uniform motion of the centre of mass, the tenth classical integral of the $N$-body problem alongside energy, three components of momentum and three of angular momentum.
:::
:::
