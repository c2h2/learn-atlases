The pendulum equation $\theta'' + \frac gL\sin\theta = 0$ cannot be solved in terms of elementary functions. Neither can the equations of two competing species, a predator and its prey, or a chemical oscillator. Yet we can say a great deal about all of them: where they can come to rest, whether those rest states survive small disturbances, whether the motion repeats itself, and what happens in the long run. This **qualitative theory**, created by Henri Poincaré in the 1880s, studies the geometry of all solutions at once instead of formulas for individual ones.

We work with **autonomous** systems in the plane,

$$
x' = f(x,y), \qquad y' = g(x,y),
$$ {#eq-autonomous}

and the picture of all their trajectories, the **phase portrait**. The plan of the chapter is: find the equilibria; decide their stability, either from the linear approximation of [[ode/linear-systems]] or from an energy-like **Lyapunov function**; exploit conserved quantities, as for the pendulum and the predator–prey model; and finally meet a genuinely nonlinear phenomenon with no linear counterpart, the **limit cycle**.

## Autonomous systems and phase portraits

::: definition Autonomous system, equilibrium, trajectory {#def-autonomous}
Let $\mathbf{F} = (f,g)$ be continuously differentiable on an open set $D\subseteq\R^2$. The system $\mathbf{x}' = \mathbf{F}(\mathbf{x})$, $\mathbf{x} = (x,y)$, is **autonomous**: the right-hand side does not depend on $t$. A point $\mathbf{x}^*$ with $\mathbf{F}(\mathbf{x}^*) = \mathbf{0}$ is an **equilibrium** (or critical point); the constant function $\mathbf{x}(t)\equiv\mathbf{x}^*$ is then a solution. The curve traced out by a solution in the plane is its **trajectory** (or orbit), and the collection of all trajectories is the **phase portrait**.
:::

By the Picard–Lindelöf theorem, each initial value problem $\mathbf{x}(t_0) = \mathbf{x}_0\in D$ has exactly one solution: a continuously differentiable field is locally Lipschitz, and the proof carries over to systems once absolute values are replaced by norms, as in [[ode/linear-systems#thm-eu-system]]. For autonomous systems this has striking geometric consequences.

::: proposition Trajectories do not cross {#prop-orbits}
For an autonomous system with $\mathbf{F}$ continuously differentiable:

1. If $\mathbf{x}(t)$ is a solution, so is $\mathbf{x}(t + c)$ for every constant $c$.
2. Two trajectories that have a point in common coincide; hence distinct trajectories never cross.
3. A solution that is not an equilibrium never reaches an equilibrium in finite time.
4. If $\mathbf{x}(t_1 + T) = \mathbf{x}(t_1)$ for some $T > 0$, the solution is periodic with period $T$, and its trajectory is a closed curve.
:::

::: proof
1. $\frac{d}{dt}\mathbf{x}(t + c) = \mathbf{x}'(t + c) = \mathbf{F}(\mathbf{x}(t + c))$, because $\mathbf{F}$ does not depend on $t$.
2. Suppose $\mathbf{x}(t_1) = \mathbf{y}(t_2)$. By part 1, $\mathbf{z}(t) = \mathbf{x}(t + t_1 - t_2)$ is a solution with $\mathbf{z}(t_2) = \mathbf{y}(t_2)$, so $\mathbf{z} = \mathbf{y}$ by uniqueness. Thus $\mathbf{y}$ is a time shift of $\mathbf{x}$, and they trace the same curve.
3. If $\mathbf{x}(t_1) = \mathbf{x}^*$, then $\mathbf{x}$ and the constant solution $\mathbf{x}^*$ agree at $t_1$, so $\mathbf{x}\equiv\mathbf{x}^*$ by uniqueness.
4. $\mathbf{x}(t + T)$ and $\mathbf{x}(t)$ are both solutions (part 1) taking the same value at $t = t_1$, so they are equal for all $t$.
:::

Two curves help to organise a sketch. On the **$x$-nullcline** $f(x,y) = 0$ the field is vertical; on the **$y$-nullcline** $g(x,y) = 0$ it is horizontal. Equilibria are the intersections of the nullclines, and between them the signs of $f$ and $g$ tell us in which quadrant direction the arrows point.

::: definition Stability {#def-stability}
An equilibrium $\mathbf{x}^*$ is **stable** if for every $\eps > 0$ there is $\delta > 0$ such that every solution with $\norm{\mathbf{x}(0) - \mathbf{x}^*} < \delta$ exists for all $t\ge0$ and satisfies $\norm{\mathbf{x}(t) - \mathbf{x}^*} < \eps$ for all $t \ge 0$. It is **asymptotically stable** if it is stable and, in addition, there is $\delta_0 > 0$ such that $\norm{\mathbf{x}(0) - \mathbf{x}^*} < \delta_0$ implies $\mathbf{x}(t)\to\mathbf{x}^*$ as $t\to\infty$. It is **unstable** if it is not stable.
:::

Stability says that small disturbances stay small; asymptotic stability says that they also die out. The centre of a linear system ([[ode/linear-systems]]) is stable but not asymptotically stable; a saddle is unstable.

## Lyapunov functions {#sec-lyapunov}

A ball rolling in a bowl comes to rest at the bottom because friction steadily removes energy, and the energy is smallest at the bottom. Lyapunov's idea was to prove stability with any function that behaves like this energy, without solving the equations.

::: definition Lyapunov function {#def-lyapunov}
Let $\mathbf{x}^*$ be an equilibrium of $\mathbf{x}' = \mathbf{F}(\mathbf{x})$ and $U$ an open neighbourhood of $\mathbf{x}^*$. A continuously differentiable $V\colon U\to\R$ is **positive definite** if $V(\mathbf{x}^*) = 0$ and $V(\mathbf{x}) > 0$ for $\mathbf{x}\neq\mathbf{x}^*$. Its **orbital derivative** is

$$
\dot V(\mathbf{x}) = \nabla V(\mathbf{x})\cdot\mathbf{F}(\mathbf{x}),
$$

so that $\frac{d}{dt}V(\mathbf{x}(t)) = \dot V(\mathbf{x}(t))$ along every solution, by the chain rule. A positive definite $V$ with $\dot V\le0$ on $U$ is a **Lyapunov function**; if $\dot V < 0$ on $U\setminus\set{\mathbf{x}^*}$ it is a **strict** Lyapunov function.
:::

The crucial point is that $\dot V$ is computed from the *equation*, not from solutions.

::: theorem Lyapunov's stability theorem {#thm-lyapunov}
Let $V$ be positive definite on a neighbourhood $U$ of the equilibrium $\mathbf{x}^*$.

1. If $\dot V\le0$ on $U$, then $\mathbf{x}^*$ is stable.
2. If $\dot V < 0$ on $U\setminus\set{\mathbf{x}^*}$, then $\mathbf{x}^*$ is asymptotically stable.
:::

::: proof
1. Let $\eps > 0$ be so small that the closed ball $\bar B_\eps = \set{\norm{\mathbf{x} - \mathbf{x}^*}\le\eps}$ lies in $U$. The sphere $S_\eps = \set{\norm{\mathbf{x} - \mathbf{x}^*} = \eps}$ is compact and $V > 0$ on it, so $m = \min_{S_\eps}V > 0$. Since $V$ is continuous with $V(\mathbf{x}^*) = 0$, there is $\delta\in(0,\eps)$ with $V(\mathbf{x}) < m$ whenever $\norm{\mathbf{x} - \mathbf{x}^*} < \delta$. Take a solution with $\norm{\mathbf{x}(0) - \mathbf{x}^*} < \delta$. As long as it stays in $\bar B_\eps$, $V(\mathbf{x}(t))$ is non-increasing, so $V(\mathbf{x}(t))\le V(\mathbf{x}(0)) < m$; hence it can never reach $S_\eps$, where $V\ge m$. So it stays in $B_\eps$ for as long as it exists, and since it remains in a compact subset of $D$ it exists for all $t\ge0$ (by the vector version of [[ode/existence-uniqueness#thm-maximal]]).

2. Take $\eps,\delta$ as in part 1 and a solution starting within $\delta$ of $\mathbf{x}^*$. The function $t\mapsto V(\mathbf{x}(t))$ is non-increasing and bounded below by $0$, so it has a limit $L\ge0$. Suppose $L > 0$. By continuity there is $\rho > 0$ with $V < L$ on $B_\rho$, so the solution stays in the compact annulus $K = \set{\rho\le\norm{\mathbf{x} - \mathbf{x}^*}\le\eps}$. On $K$, $\dot V$ is continuous and negative, so $\dot V\le-\mu$ for some $\mu > 0$, and then $V(\mathbf{x}(t))\le V(\mathbf{x}(0)) - \mu t\to-\infty$, a contradiction. Hence $V(\mathbf{x}(t))\to0$. Finally $\mathbf{x}(t)\to\mathbf{x}^*$: otherwise there would be $\eta > 0$ and times $t_k\to\infty$ with $\eta\le\norm{\mathbf{x}(t_k) - \mathbf{x}^*}\le\eps$, where $V$ is bounded below by a positive constant, contradicting $V(\mathbf{x}(t_k))\to0$.
:::

::: example A stable equilibrium that looks like a centre {#ex-lyapunov}
Show that the origin is asymptotically stable for $x' = -y - x^3$, $y' = x - y^3$.
::: solution
Try $V = x^2 + y^2$, which is positive definite. Then

$$
\dot V = 2x(-y - x^3) + 2y(x - y^3) = -2x^4 - 2y^4 < 0 \qquad\text{for } (x,y)\neq(0,0),
$$

so by [[#thm-lyapunov]] the origin is asymptotically stable. The cross terms $\mp2xy$ cancel: the linear part $(-y, x)$ is a pure rotation, which neither increases nor decreases the distance from the origin, and the cubic terms pull every trajectory inwards. Note that linearisation alone could not decide this (see [[#warn-centre]]): the Jacobian at the origin is $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, a centre.
:::
:::

Lyapunov functions are not unique, and there is no general recipe for finding one. Good candidates are physical energies, quadratic forms $ax^2 + bxy + cy^2$, and, for equations like $x'' + h(x) = 0$, the sum of kinetic energy and the potential $\int h$. When $\dot V\le0$ but $\dot V$ vanishes on a curve, the following refinement often still gives asymptotic stability; we state it without proof (see Hirsch, Smale and Devaney, listed in the references).

::: theorem LaSalle's invariance principle {#thm-lasalle}
Let $K$ be a compact set that is **positively invariant** (solutions starting in $K$ stay in $K$ for $t\ge0$), and let $V$ be continuously differentiable with $\dot V\le0$ on $K$. Then every solution starting in $K$ approaches, as $t\to\infty$, the largest invariant subset of $\set{\mathbf{x}\in K : \dot V(\mathbf{x}) = 0}$.
:::

## Linearisation

Near an equilibrium $\mathbf{x}^*$ a smooth vector field looks like its linear approximation. Writing $\mathbf{x} = \mathbf{x}^* + \mathbf{u}$ and using Taylor's theorem in two variables,

$$
\mathbf{F}(\mathbf{x}^* + \mathbf{u}) = J\mathbf{u} + \mathbf{r}(\mathbf{u}), \qquad J = D\mathbf{F}(\mathbf{x}^*) = \begin{pmatrix} f_x & f_y\\ g_x & g_y\end{pmatrix}_{\mathbf{x}^*}, \qquad \frac{\norm{\mathbf{r}(\mathbf{u})}}{\norm{\mathbf{u}}}\to0 \text{ as } \mathbf{u}\to\mathbf{0}.
$$

The **linearisation** of the system at $\mathbf{x}^*$ is $\mathbf{u}' = J\mathbf{u}$, where $J$ is the **Jacobian matrix** ([[multivariable/partial-derivatives]]). Its phase portrait is classified in [[ode/linear-systems]], and the question is how much of that picture survives the nonlinear remainder.

::: theorem Stability from the linearisation {#thm-linearisation}
Let $\mathbf{x}^*$ be an equilibrium of $\mathbf{x}' = \mathbf{F}(\mathbf{x})$ with $\mathbf{F}$ continuously differentiable, and let $J = D\mathbf{F}(\mathbf{x}^*)$.

1. If every eigenvalue of $J$ has negative real part, $\mathbf{x}^*$ is asymptotically stable.
2. If some eigenvalue of $J$ has positive real part, $\mathbf{x}^*$ is unstable.
:::

::: proof
We prove part 1 by building a strict Lyapunov function from the linearisation. By [[ode/linear-systems#thm-linear-stability]], $\norm{e^{Jt}}\le Ce^{-\alpha t}$ with $\alpha > 0$, so the matrix

$$
P = \int_0^\infty e^{J\T t}\,e^{Jt}\,dt
$$

is well defined. It is symmetric and positive definite, since $\mathbf{u}\T P\mathbf{u} = \int_0^\infty\norm{e^{Jt}\mathbf{u}}^2\,dt > 0$ for $\mathbf{u}\neq\mathbf{0}$. Moreover, integrating $\frac{d}{dt}\bigl(e^{J\T t}e^{Jt}\bigr) = J\T e^{J\T t}e^{Jt} + e^{J\T t}e^{Jt}J$ from $0$ to $\infty$ gives the **Lyapunov equation**

$$
J\T P + PJ = -I .
$$

Let $V(\mathbf{u}) = \mathbf{u}\T P\mathbf{u}$. Along solutions of $\mathbf{u}' = J\mathbf{u} + \mathbf{r}(\mathbf{u})$,

$$
\dot V = \mathbf{u}\T\bigl(J\T P + PJ\bigr)\mathbf{u} + 2\,\mathbf{u}\T P\,\mathbf{r}(\mathbf{u}) \le -\norm{\mathbf{u}}^2 + 2\norm P\,\norm{\mathbf{u}}\,\norm{\mathbf{r}(\mathbf{u})}.
$$

Choose $\delta > 0$ with $\norm{\mathbf{r}(\mathbf{u})}\le\norm{\mathbf{u}}/(4\norm P)$ for $\norm{\mathbf{u}} < \delta$. Then $\dot V\le-\frac12\norm{\mathbf{u}}^2 < 0$ for $0 < \norm{\mathbf{u}} < \delta$, so $V$ is a strict Lyapunov function and [[#thm-lyapunov]] gives asymptotic stability.

Part 2 needs a different construction (a function that *increases* along solutions in a sector); we omit it and refer to Hirsch, Smale and Devaney or to Teschl's notes.
:::

Much more is true when no eigenvalue lies on the imaginary axis. Such an equilibrium is called **hyperbolic**.

::: theorem Hartman–Grobman {#thm-hartman}
If $\mathbf{x}^*$ is a hyperbolic equilibrium, there is a homeomorphism from a neighbourhood of $\mathbf{x}^*$ onto a neighbourhood of $\mathbf{0}$ that maps trajectories of the nonlinear system onto trajectories of its linearisation, preserving the direction of time.
:::

In words, near a hyperbolic equilibrium the nonlinear phase portrait is a continuously deformed copy of the linear one: saddles stay saddles, and attracting or repelling equilibria stay attracting or repelling. A homeomorphism cannot tell a node from a spiral (it may twist straight trajectories into spirals), but when $\mathbf{F}$ is twice continuously differentiable a sharper theorem, also due to Hartman, provides a continuously differentiable deformation, which preserves tangent directions: nodes then stay nodes and spirals stay spirals. (The proofs, due to D. M. Grobman in 1959 and Philip Hartman in 1960, are beyond this course.)

::: warning When linearisation says nothing {#warn-centre}
If $J$ has eigenvalues on the imaginary axis — a centre, or a zero eigenvalue — the nonlinear terms decide. The systems $x' = -y \pm x(x^2+y^2)$, $y' = x\pm y(x^2+y^2)$ both have linearisation $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, a centre. In polar coordinates they become $r' = \pm r^3$, $\theta' = 1$: with the plus sign every trajectory spirals *out* (unstable), with the minus sign every trajectory spirals *in* (asymptotically stable). A linear centre tells you nothing about stability.
:::

::: example Competing species {#ex-competition}
Two species compete for the same food: $x' = x(3 - x - 2y)$, $y' = y(2 - x - y)$ with $x,y\ge0$. Find and classify the equilibria, and describe the long-term outcome.
::: solution
Equilibria satisfy $x(3 - x - 2y) = 0$ and $y(2 - x - y) = 0$: they are $(0,0)$, $(3,0)$, $(0,2)$, and the intersection of $x + 2y = 3$ with $x + y = 2$, namely $(1,1)$. The Jacobian is

$$
J(x,y) = \begin{pmatrix}3 - 2x - 2y & -2x\\ -y & 2 - x - 2y\end{pmatrix}.
$$

- At $(0,0)$: $J = \diag(3,2)$, an unstable node (both species grow when rare).
- At $(3,0)$: $J = \begin{pmatrix}-3&-6\\0&-1\end{pmatrix}$, eigenvalues $-3, -1$: a stable node.
- At $(0,2)$: $J = \begin{pmatrix}-1&0\\-2&-2\end{pmatrix}$, eigenvalues $-1,-2$: a stable node.
- At $(1,1)$: $J = \begin{pmatrix}-1&-2\\-1&-1\end{pmatrix}$, $\det J = -1 < 0$: a saddle, with eigenvalues $-1\pm\sqrt2$.

All four are hyperbolic, so [[#thm-hartman]] applies. The coexistence state $(1,1)$ is unstable; generic populations end at $(3,0)$ or $(0,2)$ — one species drives the other to extinction. Which one wins depends on the initial state: the two trajectories that enter the saddle (its **stable manifold**) form a curve, a **separatrix**, dividing the quadrant into the two basins of attraction. This is the principle of **competitive exclusion**.
:::
:::

::: quiz
At an equilibrium of a nonlinear system the Jacobian has eigenvalues $\pm2i$. What can you conclude?
- [ ] The equilibrium is a centre surrounded by closed orbits.
- [ ] The equilibrium is stable but not asymptotically stable.
- [x] Nothing about stability, without further information.
- [ ] The equilibrium is unstable.
::: solution
Purely imaginary eigenvalues make the equilibrium non-hyperbolic, and neither [[#thm-linearisation]] nor [[#thm-hartman]] applies. As [[#warn-centre]] shows, the nonlinear terms can make it asymptotically stable, unstable, or a genuine centre; a Lyapunov function or a conserved quantity is needed to decide.
:::
:::

## The pendulum

A pendulum of length $L$ satisfies $\theta'' + \omega^2\sin\theta = 0$ with $\omega^2 = g/L$, where $\theta$ is the angle from the downward vertical. As a system, with $x = \theta$ and $y = \theta'$,

$$
x' = y, \qquad y' = -\omega^2\sin x .
$$ {#eq-pendulum}

The equilibria are $(k\pi, 0)$: hanging straight down ($k$ even) or balanced straight up ($k$ odd). The Jacobian $\begin{pmatrix}0&1\\-\omega^2\cos x&0\end{pmatrix}$ is $\begin{pmatrix}0&1\\-\omega^2&0\end{pmatrix}$ at $(0,0)$, a linear centre — inconclusive — and $\begin{pmatrix}0&1\\ \omega^2&0\end{pmatrix}$ at $(\pi,0)$, a saddle. To settle the bottom equilibrium we use energy.

::: proposition Conservation of energy for the pendulum {#prop-pendulum-energy}
The function $E(x,y) = \tfrac12y^2 - \omega^2\cos x$ is constant along every solution of [[#eq-pendulum]].
:::

::: proof
$\dot E = y\,y' + \omega^2\sin x\;x' = y(-\omega^2\sin x) + \omega^2\sin x\;y = 0.$
:::

Every trajectory therefore lies on a level curve of $E$, which is the sum of kinetic energy $\frac12y^2$ and potential energy $-\omega^2\cos x$ (per unit $mL^2$). The level curves organise the whole phase portrait:

- For $-\omega^2 < E < \omega^2$ the level curves are closed loops around $(2k\pi, 0)$: the pendulum swings back and forth (**libration**). Since $E - E(0,0) = \frac12y^2 + \omega^2(1 - \cos x)$ is a Lyapunov function with $\dot E = 0$, the bottom equilibrium is stable — but not asymptotically stable, since every nearby orbit is a closed loop.
- For $E > \omega^2$ the curves are wavy lines on which $y$ never vanishes: the pendulum goes over the top and keeps rotating (**rotation**).
- The level $E = \omega^2$ contains the saddles $((2k+1)\pi, 0)$ and the **separatrices** joining them: the motions that take infinitely long to creep up to the inverted position.

::: example Swinging over the top {#ex-pendulum}
A pendulum with $\omega = 1$ hangs at rest and is given an initial angular velocity $v_0$. For which $v_0$ does it go over the top? If $v_0 = 1$, how far does it swing?
::: solution
The energy is $E = \frac12v_0^2 - \cos0 = \frac12v_0^2 - 1$. The pendulum reaches the top $x = \pi$ only if $E\ge\frac12y^2 - \cos\pi = \frac12y^2 + 1\ge1$ there, so it goes over the top (with $y\neq0$ at the top) exactly when $\frac12v_0^2 - 1 > 1$, i.e. $v_0 > 2$. For $v_0 = 2$ it lies on the separatrix and approaches the inverted position as $t\to\infty$ without ever reaching it.

For $v_0 = 1$, $E = -\frac12$. At the extreme of the swing $y = 0$, so $-\cos\theta_{\max} = -\frac12$ and $\theta_{\max} = \frac\pi3$, that is $60^\circ$.
:::
:::

With friction, $y' = -\omega^2\sin x - cy$ ($c > 0$), the energy satisfies $\dot E = -cy^2\le0$. Now the bottom equilibrium is asymptotically stable: the Jacobian $\begin{pmatrix}0&1\\-\omega^2&-c\end{pmatrix}$ has trace $-c < 0$ and determinant $\omega^2 > 0$, so both eigenvalues have negative real part and [[#thm-linearisation]] applies. (LaSalle's principle gives more: $\dot E = 0$ only on the axis $y = 0$, where the only invariant sets are equilibria, so every solution approaches some equilibrium.)

::: widget phaseplane
f: y
g: -sin(x) - c*y
x: -7, 7
y: -3, 3
sliders: c=0:0:1:0.05
points: 0, 1; 0, 1.9; 0, 2.1; -6.5, 2.6
caption: The pendulum $x' = y$, $y' = -\sin x - cy$ (angle $x$, angular velocity $y$). With $c = 0$ the starts at speeds $1$ and $1.9$ swing back and forth around the bottom equilibrium (librations) and the other two go over the top (rotations). The speeds $1.9$ and $2.1$ lie on either side of the critical speed $2$, so these two orbits hug the separatrices through the saddles at $x = \pm\pi$ from inside and outside. Click to add more orbits — below the axis for rotations the other way. Add friction with the slider: every centre becomes a stable spiral, and rotating trajectories eventually fall into one of the wells.
:::

::: quiz
For the undamped pendulum with $\omega = 1$, starting from the bottom, what is the smallest initial angular speed that carries it over the top?
- [ ] $1$
- [ ] $\sqrt2$
- [x] Any speed greater than $2$ (speed exactly $2$ approaches the top but never reaches it)
- [ ] $\pi$
::: solution
By conservation of energy, the pendulum passes the top with positive speed iff $\frac12v_0^2 - 1 > 1$, i.e. $v_0 > 2$. At exactly $v_0 = 2$ the trajectory is a separatrix, which approaches the saddle $(\pi, 0)$ as $t\to\infty$; by [[#prop-orbits]] it cannot reach this equilibrium in finite time.
:::
:::

## Predators and prey

Let $x(t)$ be a prey population (say, small fish) and $y(t)$ its predators (larger fish). Without predators the prey grows exponentially; without prey the predators die out; encounters, at a rate proportional to $xy$, reduce the prey and feed the predators. The **Lotka–Volterra equations** are

$$
x' = ax - bxy, \qquad y' = -cy + dxy, \qquad a,b,c,d > 0 .
$$ {#eq-lv}

The equilibria are $(0,0)$ and $(c/d, a/b)$. At the origin $J = \diag(a, -c)$, a saddle: the axes are invariant (prey alone grows, predators alone decline). At the coexistence point

$$
J = \begin{pmatrix}0 & -bc/d\\ ad/b & 0\end{pmatrix}, \qquad \text{eigenvalues } \pm i\sqrt{ac},
$$

a linear centre — inconclusive again. As for the pendulum, a conserved quantity settles the matter.

::: proposition A conserved quantity {#prop-lv-conserved}
In the quadrant $x, y > 0$ the function

$$
H(x,y) = dx - c\ln x + by - a\ln y
$$

is constant along solutions of [[#eq-lv]]. It has a strict global minimum at $(c/d, a/b)$, and every other trajectory in the quadrant is a closed curve: the populations oscillate periodically.
:::

::: proof
Using the equations,

$$
\dot H = \Bigl(d - \frac cx\Bigr)x(a - by) + \Bigl(b - \frac ay\Bigr)y(dx - c) = (dx - c)(a - by) + (by - a)(dx - c) = 0 .
$$

The function $H$ is a sum $h_1(x) + h_2(y)$ of strictly convex functions ($h_1'' = c/x^2 > 0$, $h_2'' = a/y^2 > 0$) with $h_1'(c/d) = 0$ and $h_2'(a/b) = 0$, and each tends to $+\infty$ at both ends of $(0,\infty)$. Hence $H$ has a strict minimum at $(c/d, a/b)$ and its level sets above the minimum are closed curves around it. (Each level set meets each vertical line in at most two points, because $h_2$ takes each value at most twice.) A trajectory on such a curve contains no equilibrium and cannot stop or turn back, since it moves in the direction given by the field, which is continuous and non-zero there. So it goes round the closed curve and returns to its starting point; by [[#prop-orbits]] it is periodic.
:::

The periodic orbits have a remarkable property: the time-averaged populations do not depend on the orbit.

::: proposition Average populations {#prop-lv-average}
For every periodic solution of [[#eq-lv]] with period $T$,

$$
\frac1T\int_0^Tx(t)\,dt = \frac cd, \qquad \frac1T\int_0^Ty(t)\,dt = \frac ab .
$$
:::

::: proof
Divide the first equation by $x$: $(\ln x)' = a - by$. Integrating over a period, the left-hand side gives $\ln x(T) - \ln x(0) = 0$, so $0 = aT - b\int_0^Ty\,dt$. Similarly $(\ln y)' = -c + dx$ gives $\int_0^Tx\,dt = cT/d$.
:::

::: widget phaseplane
f: x*(2 - h - y)
g: y*(x - 3 - h)
x: 0, 9
y: 0, 6
sliders: h=0:0:1.5:0.05
points: 3, 4; 1.5, 1; 5, 2
caption: Lotka–Volterra orbits for $x' = x(2 - y)$, $y' = y(x - 3)$, with an extra harvesting rate $h$ removing a fraction of both populations. With $h = 0$ every orbit is a closed loop around $(3, 2)$, the time-averaged state. Increase $h$: the centre moves to $(3 + h, 2 - h)$ — fishing *raises* the average prey population and lowers the predators, Volterra's principle.
:::

::: application Volterra's principle and the Adriatic fisheries
During the First World War fishing in the Adriatic was much reduced, and the biologist Umberto D'Ancona noticed that the proportion of predatory fish in the catches at Fiume and other ports had risen markedly. He asked Vito Volterra for an explanation, and [[#eq-lv]] supplied one. Fishing removes a fraction $h$ of each population, changing $a$ to $a - h$ and $c$ to $c + h$; by [[#prop-lv-average]] the averages become $\bigl(\frac{c+h}{d}, \frac{a-h}{b}\bigr)$. Less fishing therefore means fewer prey and more predators on average. The same reasoning warns that a pesticide killing both a pest and its natural predator can increase the average pest population.
:::

## Limit cycles

The closed orbits of the pendulum and of [[#eq-lv]] come in continuous families, and a small change to the equations (a little friction, say) destroys them. Many real oscillators — a beating heart, a ticking clock, an electronic circuit, a chemical reaction — instead have a single preferred oscillation to which nearby motions converge, whatever their initial amplitude.

::: definition Limit cycle {#def-limit-cycle}
A **limit cycle** is a periodic orbit $\Gamma$ that is isolated: some neighbourhood of $\Gamma$ contains no other periodic orbit. It is **stable** if all trajectories starting near $\Gamma$ approach it as $t\to\infty$, and **unstable** if they move away from it.
:::

Limit cycles are a purely nonlinear phenomenon: a linear system's periodic orbits, if any, come in a continuous family of scaled copies (the ellipses of a centre).

::: example A limit cycle in polar coordinates {#ex-limit-cycle}
Analyse $x' = x - y - x(x^2+y^2)$, $y' = x + y - y(x^2+y^2)$.
::: solution
In polar coordinates $x = r\cos\theta$, $y = r\sin\theta$ we use $rr' = xx' + yy'$ and $r^2\theta' = xy' - yx'$. Here

$$
rr' = (x^2 + y^2) - (x^2 + y^2)^2 = r^2 - r^4, \qquad r^2\theta' = x^2 + y^2 = r^2,
$$

so the system becomes

$$
r' = r(1 - r^2), \qquad \theta' = 1 .
$$

The angle increases uniformly, and the radius obeys a one-dimensional autonomous equation with equilibria $r = 0$ (unstable) and $r = 1$ (stable), as in [[ode/existence-uniqueness#prop-autonomous]]. Hence the unit circle is a stable limit cycle: trajectories starting inside spiral outwards to it, those outside spiral inwards. Solving the Bernoulli equation for $r$ gives $r(t) = \bigl(1 + Ce^{-2t}\bigr)^{-1/2}$, which tends to $1$ for every $C > -1$. The origin is an unstable spiral, in agreement with its Jacobian $\begin{pmatrix}1&-1\\1&1\end{pmatrix}$ (eigenvalues $1\pm i$).
:::
:::

In most examples no coordinates make the cycle visible so easily. The classic case is the **van der Pol oscillator**

$$
x'' - \mu(1 - x^2)\,x' + x = 0 \qquad (\mu > 0),
$$

a model of an electronic circuit with a valve (vacuum tube). For small $\lvert x\rvert$ the "damping" $-\mu(1-x^2)$ is negative and pumps energy in; for large $\lvert x\rvert$ it is positive and removes energy. The motion settles on a balance: a unique stable limit cycle (a theorem of Liénard). The existence of periodic orbits in such cases rests on the following deep result, which we state without proof.

::: theorem Poincaré–Bendixson {#thm-poincare-bendixson}
Let $R$ be a closed bounded region of the plane containing no equilibrium of the continuously differentiable system $\mathbf{x}' = \mathbf{F}(\mathbf{x})$, and suppose some trajectory stays in $R$ for all $t\ge0$. Then that trajectory is a periodic orbit or spirals towards a periodic orbit as $t\to\infty$. In particular, $R$ contains a periodic orbit.
:::

The theorem is special to the plane, where a closed curve separates the inside from the outside; in three dimensions trajectories can wander forever in a bounded region without settling down, which is the gateway to chaos. To show that there are *no* periodic orbits, there is a much easier test.

::: theorem Bendixson–Dulac criterion {#thm-dulac}
Let $\Omega$ be a simply connected open region of the plane, and suppose there is a continuously differentiable function $\varphi$ on $\Omega$ such that $\divg(\varphi\mathbf{F}) = (\varphi f)_x + (\varphi g)_y$ is continuous, has constant sign on $\Omega$, and is not identically zero on any open subset. Then $\Omega$ contains no periodic orbit of $\mathbf{x}' = \mathbf{F}(\mathbf{x})$. The case $\varphi = 1$ is **Bendixson's criterion**.
:::

::: proof
Suppose $\Gamma\subset\Omega$ is a periodic orbit. Being a simple closed curve in a simply connected region, it encloses a region $A\subseteq\Omega$. By the divergence form of Green's theorem ([[multivariable/greens-theorem]]),

$$
\iint_A\divg(\varphi\mathbf{F})\,dA = \oint_\Gamma\varphi\,\mathbf{F}\cdot\mathbf{n}\,ds,
$$

where $\mathbf{n}$ is the outward normal. On $\Gamma$ the field $\mathbf{F}$ is tangent to the curve (it is a trajectory), so $\mathbf{F}\cdot\mathbf{n} = 0$ and the right-hand side vanishes. But the left-hand side is non-zero, because the integrand has constant sign and is not identically zero on the open set $A$. This contradiction shows there is no periodic orbit.
:::

For example, the system $x' = y$, $y' = -x - y + x^2$ (a damped oscillator with a quadratic spring) has $\divg\mathbf{F} = 0 + (-1) = -1 < 0$ everywhere, so it has no periodic orbits at all.

::: example A Dulac function {#ex-dulac}
Show that the system $x' = x(3 - x - y)$, $y' = y\bigl(x - 1 - \tfrac14x^2\bigr)$ has no periodic orbits in the open quadrant $x, y > 0$.
::: solution
Bendixson's criterion with $\varphi = 1$ fails here: $\divg\mathbf{F} = 3 - 2x - y + x - 1 - \tfrac14x^2$ changes sign. Try instead the Dulac function $\varphi = \dfrac{1}{xy}$, which is smooth on the quadrant (a simply connected region). Then

$$
\varphi\mathbf{F} = \left(\frac{3 - x - y}{y},\ \frac{x - 1 - \frac14x^2}{x}\right), \qquad \divg(\varphi\mathbf{F}) = -\frac1y + 0 < 0 .
$$

By [[#thm-dulac]] there is no periodic orbit in the quadrant. Since the axes are invariant (a trajectory starting on an axis stays on it), no periodic orbit can cross them, and on the axes themselves the motion is one-dimensional and therefore monotone; so there are no periodic orbits in the closed quadrant either. Choosing $\varphi$ is an art; $1/(xy)$ works well for population models because it cancels the factors $x$ and $y$.
:::
:::

::: widget phaseplane
f: y
g: -x + mu*(1 - x^2)*y
x: -4, 4
y: -6, 6
sliders: mu=1:0:3:0.1
points: 0.1, 0; 3.5, 0; -0.5, 4
caption: The van der Pol oscillator $x' = y$, $y' = -x + \mu(1-x^2)y$. Trajectories starting near the unstable origin and far outside both converge to the same closed curve, the limit cycle. Increase $\mu$: the cycle distorts into a "relaxation oscillation" with slow drifts and sudden jumps. Set $\mu = 0$ and the limit cycle dissolves into the family of circles of a linear centre.
:::

::: history
Henri Poincaré founded the qualitative theory in four memoirs *Sur les courbes définies par une équation différentielle* (1881–1886), where he classified equilibria into nodes, saddles, foci (spirals) and centres and introduced limit cycles. Aleksandr Lyapunov's doctoral thesis *The general problem of the stability of motion* (Kharkov, 1892) introduced both the linearisation criterion and the direct method of [[#thm-lyapunov]]; it became widely known in the West only decades later. Ivar Bendixson completed the proof of the Poincaré–Bendixson theorem in 1901. Alfred Lotka (1925) and Vito Volterra (1926) independently proposed the predator–prey equations, and Balthasar van der Pol studied relaxation oscillations in valve circuits in 1926. The Hartman–Grobman theorem dates from 1959–1960.
:::

## Where this leads

Phase-plane analysis is the two-dimensional core of the theory of **dynamical systems**. In higher dimensions new phenomena appear — strange attractors and chaos, as in the Lorenz equations — and the study of how phase portraits change as parameters vary (bifurcation theory, already glimpsed in the harvesting model of [[ode/existence-uniqueness#ex-harvest]]) explains the sudden onset of oscillations and the collapse of equilibria. Strogatz's *Nonlinear Dynamics and Chaos* is an excellent next step. Numerically, long-time integration of conservative systems such as the pendulum calls for methods that respect conserved quantities ([[numerical-analysis/numerical-odes]]). Lyapunov functions reappear as energy estimates for partial differential equations, for instance in the uniqueness proofs of [[pde/heat-equation]] and [[pde/wave-equation]].

::: summary
- For autonomous systems, trajectories never cross, equilibria are never reached in finite time, and a solution that returns to a point is periodic ([[#prop-orbits]]).
- Nullclines ($f = 0$, $g = 0$) locate equilibria and organise sketches; stability means small disturbances stay small, asymptotic stability that they also decay ([[#def-stability]]).
- Lyapunov: a positive definite $V$ with $\dot V = \nabla V\cdot\mathbf{F}\le0$ proves stability; $\dot V < 0$ proves asymptotic stability ([[#thm-lyapunov]]).
- If all eigenvalues of the Jacobian have negative real parts the equilibrium is asymptotically stable; one with positive real part makes it unstable ([[#thm-linearisation]]). Hyperbolic equilibria look like their linearisation (Hartman–Grobman); centres are inconclusive.
- Conserved quantities (pendulum energy, the Lotka–Volterra function $H$) give closed orbits; Lotka–Volterra averages equal the equilibrium values.
- Limit cycles are isolated periodic orbits; Poincaré–Bendixson finds them in the plane, and the Bendixson–Dulac criterion rules them out ([[#thm-dulac]]).
:::

## Exercises

::: exercise Equilibria and their types {level=1}
Find and classify the equilibria of $x' = x - y$, $y' = x^2 - 4$.
::: solution
$x = y$ and $x^2 = 4$ give $(2,2)$ and $(-2,-2)$. The Jacobian is $\begin{pmatrix}1&-1\\2x&0\end{pmatrix}$. At $(2,2)$: trace $1$, determinant $4$, and $\tau^2 - 4\Delta = -15 < 0$, so an unstable spiral (eigenvalues $\frac12\pm\frac{\sqrt{15}}2i$). At $(-2,-2)$: determinant $-4 < 0$, a saddle. Both are hyperbolic and the field is polynomial (hence twice continuously differentiable), so by [[#thm-hartman]] and the remark after it the nonlinear system has the same types.
:::
:::

::: exercise Period of small oscillations {level=1 check="2*pi*sqrt(1/9.81)"}
Linearise the pendulum equation about the bottom equilibrium and find the period of small oscillations of a pendulum of length $1$ m, with $g = 9.81$ m/s².
::: solution
Near $\theta = 0$, $\sin\theta\approx\theta$, giving $\theta'' + \omega^2\theta = 0$ with $\omega = \sqrt{g/L}$, whose solutions have period $2\pi/\omega = 2\pi\sqrt{L/g} = 2\pi\sqrt{1/9.81}\approx2.006$ s. (For larger amplitudes the true period is longer; it tends to infinity as the amplitude approaches $\pi$.)
:::
:::

::: exercise A Lyapunov function {level=1}
Show that the origin is asymptotically stable for $x' = -x^3$, $y' = -y^3$. Why can [[#thm-linearisation]] not be used?
::: solution
With $V = x^2 + y^2$, $\dot V = -2x^4 - 2y^4 < 0$ away from the origin, so [[#thm-lyapunov]] gives asymptotic stability. The Jacobian at the origin is the zero matrix, whose eigenvalues ($0$, $0$) have zero real part, so the linearisation test is inconclusive. (Solutions decay only like $t^{-1/2}$, not exponentially.)
:::
:::

::: exercise Lotka–Volterra averages {level=2 check="3"}
For $x' = x(2 - y)$, $y' = y(x - 3)$, find the coexistence equilibrium and the average prey population $\frac1T\int_0^Tx\,dt$ over any periodic orbit.
::: solution
In the notation of [[#eq-lv]], $a = 2$, $b = 1$, $c = 3$, $d = 1$. The coexistence equilibrium is $(c/d, a/b) = (3, 2)$, and by [[#prop-lv-average]] the average prey population over any cycle is $c/d = 3$.
:::
:::

::: exercise The damped pendulum {level=2 check="-1/4"}
For $\theta'' + \tfrac12\theta' + \sin\theta = 0$, classify the equilibria $(0,0)$ and $(\pi,0)$ of the corresponding system. What is the real part of the eigenvalues at $(0,0)$?
::: solution
The system is $x' = y$, $y' = -\sin x - \frac12y$ with Jacobian $\begin{pmatrix}0&1\\-\cos x&-\frac12\end{pmatrix}$. At $(0,0)$: $\lambda^2 + \frac12\lambda + 1 = 0$, so $\lambda = -\frac14\pm\frac{\sqrt{15}}{4}i$, a stable spiral (asymptotically stable by [[#thm-linearisation]]); the real part is $-\frac14$. At $(\pi,0)$: $\lambda^2 + \frac12\lambda - 1 = 0$ has roots $\frac{-1\pm\sqrt{17}}{4}$ of opposite signs, a saddle.
:::
:::

::: exercise No cycles {level=2}
Show that $x' = y$, $y' = -x - (1 + x^2)\,y$ has no periodic orbits, and that the origin is asymptotically stable.
::: solution
$\divg\mathbf{F} = \partial_x(y) + \partial_y\bigl(-x - (1+x^2)y\bigr) = -(1 + x^2) < 0$ on the whole plane (which is simply connected), so by Bendixson's criterion ([[#thm-dulac]] with $\varphi = 1$) there are no periodic orbits. At the origin the Jacobian $\begin{pmatrix}0&1\\-1&-1\end{pmatrix}$ has trace $-1$ and determinant $1$, so both eigenvalues have negative real part and the origin is asymptotically stable. (Alternatively, $V = x^2 + y^2$ gives $\dot V = -2(1 + x^2)y^2\le0$, and LaSalle's principle applies.)
:::
:::

::: exercise Two limit cycles {level=2 check="2"}
The system $r' = r(1 - r^2)(4 - r^2)$, $\theta' = 1$ (in polar coordinates) has two limit cycles. Find them and their stability. What is the radius of the unstable one?
::: solution
Periodic orbits are circles $r = $ const with $r' = 0$, $r > 0$: $r = 1$ and $r = 2$. For $0 < r < 1$, $r' > 0$; for $1 < r < 2$, $r' < 0$; for $r > 2$, $r' > 0$. So trajectories approach $r = 1$ from both sides (stable limit cycle) and move away from $r = 2$ on both sides (unstable limit cycle). The unstable one has radius $2$: it separates the basin of attraction of the stable cycle from the solutions that escape to infinity.
:::
:::

::: exercise Stable but not asymptotically stable {level=3}
Prove that the origin is a stable but not asymptotically stable equilibrium of $x' = y$, $y' = -x^3$.
::: solution
$E(x,y) = \frac12y^2 + \frac14x^4$ is positive definite and $\dot E = y(-x^3) + x^3y = 0$. By [[#thm-lyapunov]] (part 1) the origin is stable. It is not asymptotically stable: every solution keeps its energy, so a solution starting at a point $(x_0,y_0)\neq(0,0)$, however close to the origin, satisfies $E(\mathbf{x}(t)) = E(x_0,y_0) > 0$ for all $t$ and cannot tend to the origin, where $E = 0$ (by continuity of $E$). (Note the linearisation $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ is degenerate and gives no information.)
:::
:::

::: exercise An estimate of the basin of attraction {level=3}
For $x' = -x + y^2$, $y' = -y + x^2$, use $V = x^2 + y^2$ to show that every solution starting in the disc $x^2 + y^2 < 2$ tends to the origin. Why can the radius $\sqrt2$ not be improved?
::: hint
Show $\lvert 2xy(x + y)\rvert\le\sqrt2\,r^3$, where $r^2 = x^2 + y^2$.
:::
::: solution
$\dot V = 2x(-x + y^2) + 2y(-y + x^2) = -2r^2 + 2xy(x + y)$. Since $\lvert xy\rvert\le\frac12r^2$ and $\lvert x + y\rvert\le\sqrt2\,r$ (Cauchy–Schwarz), $\lvert2xy(x+y)\rvert\le\sqrt2\,r^3$, hence

$$
\dot V\le-2r^2 + \sqrt2\,r^3 = -r^2\bigl(2 - \sqrt2\,r\bigr) < 0 \qquad (0 < r < \sqrt2).
$$

So $V = r^2$ decreases along solutions in the disc $r < \sqrt2$; such solutions stay in the smaller disc $\set{V\le V(\mathbf{x}(0))}$, and the argument of [[#thm-lyapunov]] (part 2), applied in that compact disc, shows that they tend to the origin. The radius cannot be improved because $(1,1)$, at distance $\sqrt2$, is another equilibrium ($-1 + 1 = 0$ in both equations): solutions starting there never approach the origin.
:::
:::

::: exercise Gradient systems {level=3}
Let $W$ be a twice continuously differentiable function on $\R^2$. Prove that the **gradient system** $\mathbf{x}' = -\nabla W(\mathbf{x})$ has no periodic orbits.
::: solution
Along any solution, $\frac{d}{dt}W(\mathbf{x}(t)) = \nabla W\cdot\mathbf{x}' = -\norm{\nabla W(\mathbf{x}(t))}^2\le0$, with equality only at equilibria (where $\nabla W = \mathbf{0}$). Suppose $\mathbf{x}$ is a non-constant periodic solution with period $T$. It never passes through an equilibrium ([[#prop-orbits]]), so $\frac{d}{dt}W(\mathbf{x}(t)) < 0$ for all $t$, and $W(\mathbf{x}(T)) < W(\mathbf{x}(0))$. But $\mathbf{x}(T) = \mathbf{x}(0)$, a contradiction. (A gradient flow always runs downhill, so it can never return to where it started.)
:::
:::
