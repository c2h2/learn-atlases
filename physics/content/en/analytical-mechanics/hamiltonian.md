Lagrange's equations are $n$ second-order differential equations for $n$ coordinates. To start a motion you must give $2n$ numbers, the coordinates and their velocities, and the state of the system at any instant is that list of $2n$ numbers. Hamilton's reformulation takes this seriously. It replaces the velocities by the generalised momenta $p_j = \partial L/\partial\dot q_j$, treats $q$ and $p$ as independent coordinates on a $2n$-dimensional **phase space**, and writes the dynamics as $2n$ first-order equations of a strikingly symmetric form:

$$
\dot q_j = \pdv{H}{p_j}, \qquad \dot p_j = -\pdv{H}{q_j}.
$$

Nothing new is predicted for any single trajectory: the Hamiltonian equations are equivalent to Lagrange's. What is gained is structure. The motion becomes a flow on phase space, and that flow preserves volume, which is Liouville's theorem and the foundation of statistical mechanics. Conserved quantities and symmetries are unified by the Poisson bracket, which survives almost unchanged into quantum mechanics as the commutator. And the coordinates can be changed in a far more flexible way than in the Lagrangian picture, mixing $q$'s and $p$'s, by canonical transformations.

This chapter builds that structure from the Lagrangian of [[analytical-mechanics/lagrangian]]. The energy function $h$ defined there becomes the Hamiltonian, and Noether's conserved quantities become generators of symmetries.

## The Legendre transformation {#legendre}

Going from $L(q, \dot q, t)$ to $H(q, p, t)$ swaps the velocity variable for its conjugate slope. The operation that does this is older than Hamilton and has nothing to do with mechanics.

::: definition Legendre transformation {#def-legendre}
Let $f(x)$ be twice differentiable with $f''(x) > 0$, so that $f'$ is strictly increasing. The **Legendre transform** of $f$ is the function of the slope $p = f'(x)$ defined by

$$
g(p) = px - f(x), \qquad\text{where } x = x(p) \text{ solves } f'(x) = p.
$$

For several variables, $f(x_1, \dots, x_n)$ with positive-definite Hessian, $g(p_1, \dots, p_n) = \sum_jp_jx_j - f$ with $p_j = \partial f/\partial x_j$.
:::

The key property is that the transformation is its own inverse, and that it exchanges the roles of variable and slope:

$$
\deriv{g}{p} = x + p\deriv{x}{p} - f'(x)\deriv{x}{p} = x.
$$

So the slope of $g$ is the original variable, and transforming $g$ returns $f$. For $f = \frac12mx^2$, $p = mx$ and $g = p\cdot p/m - \frac12m(p/m)^2 = p^2/(2m)$. Kinetic energy as a function of velocity and as a function of momentum are Legendre transforms of each other. The same operation turns internal energy into enthalpy and free energies in [[thermodynamics]].

### The Hamiltonian

::: definition Hamiltonian {#def-hamiltonian}
Let $L(q, \dot q, t)$ be a Lagrangian for which the equations $p_j = \partial L/\partial\dot q_j(q, \dot q, t)$ can be solved for the velocities, $\dot q_j = \dot q_j(q, p, t)$. The **Hamiltonian** is the Legendre transform of $L$ with respect to the velocities,

$$
H(q, p, t) = \sum_{j=1}^np_j\dot q_j - L(q, \dot q, t),
$$ {#eq-hamiltonian}

with every $\dot q_j$ on the right replaced by its expression in terms of $q$, $p$ and $t$.
:::

The Hamiltonian is the energy function $h$ of [[analytical-mechanics/lagrangian#def-energy-function]], written in different variables. In particular, when $T$ is quadratic in the velocities and $V$ is velocity-independent, $H = T + V$ expressed in terms of momenta.

::: theorem Hamilton's equations {#thm-hamilton-eqs}
If $q(t)$ satisfies Lagrange's equations and $p_j(t) = \partial L/\partial\dot q_j$, then

$$
\dot q_j = \pdv{H}{p_j}, \qquad \dot p_j = -\pdv{H}{q_j}, \qquad j = 1, \dots, n,
$$ {#eq-hamilton}

and in addition $\partial H/\partial t = -\partial L/\partial t$ and $\dd H/\dd t = \partial H/\partial t$ along the motion. Conversely, every solution of [[#eq-hamilton]] gives a solution of Lagrange's equations.
:::

::: proof
Compute the differential of $H$ in two ways. From its definition [[#eq-hamiltonian]], treating $q$, $\dot q$, $p$ and $t$ as independent for the moment,

$$
\dd H = \sum_j\bigl(\dot q_j\,\dd p_j + p_j\,\dd\dot q_j\bigr) - \sum_j\left(\pdv{L}{q_j}\dd q_j + \pdv{L}{\dot q_j}\dd\dot q_j\right) - \pdv{L}{t}\dd t.
$$

The terms in $\dd\dot q_j$ cancel because $p_j = \partial L/\partial\dot q_j$. This cancellation is the whole point of the Legendre transform: $H$ depends on $\dot q$ only through $q$, $p$ and $t$. So

$$
\dd H = \sum_j\left(\dot q_j\,\dd p_j - \pdv{L}{q_j}\dd q_j\right) - \pdv{L}{t}\dd t.
$$

On the other hand, as a function of $(q, p, t)$, $\dd H = \sum_j(\partial H/\partial q_j\,\dd q_j + \partial H/\partial p_j\,\dd p_j) + \partial H/\partial t\,\dd t$. Comparing coefficients,

$$
\pdv{H}{p_j} = \dot q_j, \qquad \pdv{H}{q_j} = -\pdv{L}{q_j}, \qquad \pdv{H}{t} = -\pdv{L}{t}.
$$

The first is the first Hamilton equation; it holds identically, as the inversion of $p = \partial L/\partial\dot q$. Lagrange's equation says $\dot p_j = \partial L/\partial q_j$, which by the second relation is $\dot p_j = -\partial H/\partial q_j$. Conversely, if [[#eq-hamilton]] holds, then the first equation says the $p_j$ are the momenta of the velocities $\dot q_j$, and the second, with the second relation, says $\dot p_j = \partial L/\partial q_j$, which is Lagrange's equation. Finally, along a solution,

$$
\deriv{H}{t} = \sum_j\left(\pdv{H}{q_j}\dot q_j + \pdv{H}{p_j}\dot p_j\right) + \pdv{H}{t} = \sum_j\left(\pdv{H}{q_j}\pdv{H}{p_j} - \pdv{H}{p_j}\pdv{H}{q_j}\right) + \pdv{H}{t} = \pdv{H}{t}.
$$
:::

The recipe is: find $L$; compute $p_j = \partial L/\partial\dot q_j$; invert for $\dot q_j$; form $H = \sum p_j\dot q_j - L$ and express it in $q, p$; write the $2n$ equations.

::: example Central-force motion in phase space {#ex-central-H}
Find the Hamiltonian and Hamilton's equations for a particle of mass $\mu$ in the plane with potential $U(r)$, using polar coordinates.
::: solution
From $L = \frac12\mu(\dot r^2 + r^2\dot\theta^2) - U(r)$ the momenta are

$$
p_r = \mu\dot r, \qquad p_\theta = \mu r^2\dot\theta,
$$

so $\dot r = p_r/\mu$ and $\dot\theta = p_\theta/(\mu r^2)$. Then

$$
H = p_r\frac{p_r}{\mu} + p_\theta\frac{p_\theta}{\mu r^2} - \frac12\mu\left(\frac{p_r^2}{\mu^2} + r^2\frac{p_\theta^2}{\mu^2r^4}\right) + U(r) = \frac{p_r^2}{2\mu} + \frac{p_\theta^2}{2\mu r^2} + U(r).
$$

Hamilton's equations [[#eq-hamilton]] are

$$
\dot r = \frac{p_r}{\mu}, \qquad \dot\theta = \frac{p_\theta}{\mu r^2}, \qquad \dot p_r = \frac{p_\theta^2}{\mu r^3} - U'(r), \qquad \dot p_\theta = 0.
$$

The angle does not appear in $H$, so its momentum is constant, $p_\theta = \ell$. With $p_\theta$ fixed, the first and third equations are a one-degree-of-freedom Hamiltonian system with $H = p_r^2/(2\mu) + U_{\mathrm{eff}}(r)$, which is the effective-potential reduction of [[analytical-mechanics/central-forces#def-effective]] obtained in one line. A cyclic coordinate in Hamiltonian mechanics removes *two* dimensions of phase space: its momentum is a constant, and the coordinate itself is found afterwards by integrating $\dot\theta$.
:::
:::

::: example The Hamiltonian of a charged particle {#ex-charged-H}
Starting from the Lagrangian $L = \frac12m\dot{\mathbf{r}}^2 - q\varphi + q\dot{\mathbf{r}}\cdot\mathbf{A}$ of [[analytical-mechanics/lagrangian#prop-charged]], find the Hamiltonian, and show that it equals the kinetic plus electrostatic energy although it contains $\mathbf{A}$.
::: solution
The canonical momentum is $\mathbf{p} = \partial L/\partial\dot{\mathbf{r}} = m\dot{\mathbf{r}} + q\mathbf{A}$, so $\dot{\mathbf{r}} = (\mathbf{p} - q\mathbf{A})/m$. Then

$$
H = \mathbf{p}\cdot\dot{\mathbf{r}} - L = \mathbf{p}\cdot\frac{\mathbf{p} - q\mathbf{A}}{m} - \frac{(\mathbf{p} - q\mathbf{A})^2}{2m} + q\varphi - q\mathbf{A}\cdot\frac{\mathbf{p} - q\mathbf{A}}{m}.
$$

The first and last terms combine to $(\mathbf{p} - q\mathbf{A})^2/m$, so

$$
H = \frac{(\mathbf{p} - q\mathbf{A})^2}{2m} + q\varphi.
$$

Since $\mathbf{p} - q\mathbf{A} = m\dot{\mathbf{r}}$, the value of $H$ is $\frac12m\dot{\mathbf{r}}^2 + q\varphi$: the magnetic field does no work and does not appear in the energy. But as a *function* of $(\mathbf{r}, \mathbf{p})$, $H$ depends on $\mathbf{A}$, and that dependence produces the magnetic force through $\dot{\mathbf{p}} = -\nabla H$. The rule "replace $\mathbf{p}$ by $\mathbf{p} - q\mathbf{A}$" is called **minimal coupling**, and it is how electromagnetism enters the Schrödinger equation in [[quantum-1]].
:::
:::

::: warning Do not substitute conserved momenta into the Lagrangian
In the example, it is tempting to put $\dot\theta = \ell/(\mu r^2)$ into $L$ and obtain a one-dimensional Lagrangian $\frac12\mu\dot r^2 + \ell^2/(2\mu r^2) - U$. Its Lagrange equation has the wrong sign of the centrifugal force. Eliminating a cyclic coordinate is done in the Hamiltonian, where $p_\theta$ is an independent variable and can be set to a constant legitimately. In Lagrangian language the correct reduced function is the **Routhian** $R = L - p_\theta\dot\theta$, which gives $\frac12\mu\dot r^2 - \ell^2/(2\mu r^2) - U$, with the right sign.
:::

## Phase space {#phase-space}

The state of a system is a point $(q, p)$ in the $2n$-dimensional phase space, and Hamilton's equations assign a velocity to every point. Through each point passes exactly one solution, by the existence and uniqueness theorem for first-order equations, so phase-space trajectories never cross. For a time-independent $H$, every trajectory lies on a level set $H(q, p) = E$.

For one degree of freedom this is enough to draw every trajectory without solving anything: the phase portrait is the family of level curves of $H$.

::: example The pendulum's phase portrait {#ex-pendulum-phase}
A simple pendulum of mass $m$ and length $\ell$ has angle $\theta$ from the downward vertical. Find its Hamiltonian and describe its phase portrait, including the critical energy that separates swinging from rotating motion.
::: solution
From $L = \frac12m\ell^2\dot\theta^2 + mg\ell\cos\theta$, the momentum is $p = m\ell^2\dot\theta$, the angular momentum about the pivot, and

$$
H = \frac{p^2}{2m\ell^2} - mg\ell\cos\theta.
$$

Hamilton's equations are $\dot\theta = p/(m\ell^2)$ and $\dot p = -mg\ell\sin\theta$. The equilibria are where both vanish: $p = 0$ and $\theta = 0$ or $\pi$.

The trajectories are the curves $p = \pm\sqrt{2m\ell^2(E + mg\ell\cos\theta)}$. For $-mg\ell < E < mg\ell$, the square root is real only for a range of $\theta$ about $0$, and the curve is a closed loop: the pendulum swings back and forth (**libration**). For $E > mg\ell$ it is real for every $\theta$, and the two branches are separate wavy lines, one with $p > 0$ and one with $p < 0$: the pendulum goes over the top (**rotation**). The boundary, $E = mg\ell$, is the **separatrix**, the pair of curves $p = \pm 2m\ell\sqrt{g\ell}\cos(\theta/2)$ that meet at the unstable equilibria $\theta = \pm\pi$. Motion on the separatrix approaches the inverted position as $t \to \infty$ and never reaches it.

Near $\theta = 0$ and $p = 0$, $H \approx p^2/(2m\ell^2) + \frac12mg\ell\theta^2 - mg\ell$, and the level curves are ellipses: a stable equilibrium is a **centre** of the phase portrait. Near $\theta = \pi$, write $\theta = \pi + \phi$: $H \approx p^2/(2m\ell^2) - \frac12mg\ell\phi^2 + mg\ell$, a pair of hyperbolas crossing at the origin, a **saddle**. Which equilibria are stable can be read off the picture.
:::
:::

::: widget plot
f: sqrt(2*(E + cos(x))); -sqrt(2*(E + cos(x)))
x: -2pi, 2pi
y: -3.5, 3.5
sliders: E=0.5:-0.95:2.5:0.01
piticks: true
caption: Level curves of the pendulum Hamiltonian $H = \frac12p^2 - \cos\theta$, in units with $m = \ell = g = 1$; the horizontal axis is $\theta$ and the vertical axis is $p$. With $E$ between $-1$ and $1$ you see closed loops around $\theta = 0$ and its copies at $\pm 2\pi$: swinging. Push $E$ up to $1$ and the loops touch at $\theta = \pm\pi$, forming the separatrix; above $1$ the curves come apart into open waves, rotation over the top. Near $E = -1$ the loops shrink to small ellipses, the harmonic limit.
:::

### Liouville's theorem

Instead of a single initial state, follow a whole region of phase space: a cloud of initial conditions, as in statistical mechanics, or the uncertainty in an initial measurement. Each point moves along its trajectory, and the region is carried along and deformed by the flow. Hamilton's equations have a special property that controls how its volume changes.

::: theorem Liouville's theorem {#thm-liouville}
Let $D_0$ be a region of phase space with finite volume, and let $D_t$ be its image after time $t$ under the flow of Hamilton's equations [[#eq-hamilton]], for any Hamiltonian $H(q, p, t)$. Then $D_t$ has the same $2n$-dimensional volume as $D_0$.
:::

::: proof
Write $\mathbf{x} = (q_1, \dots, q_n, p_1, \dots, p_n)$ and Hamilton's equations as $\dot{\mathbf{x}} = \mathbf{v}(\mathbf{x}, t)$. The divergence of this velocity field is

$$
\nabla\cdot\mathbf{v} = \sum_j\left[\pdv{}{q_j}\left(\pdv{H}{p_j}\right) + \pdv{}{p_j}\left(-\pdv{H}{q_j}\right)\right] = 0,
$$

because mixed partial derivatives of $H$ commute.

Let $\boldsymbol\Phi_t$ be the map that sends each initial point $\mathbf{x}_0$ to its position at time $t$, and let $J(t) = \det\bigl(\partial\boldsymbol\Phi_t/\partial\mathbf{x}_0\bigr)$ be its Jacobian determinant, so that $\mathrm{vol}(D_t) = \int_{D_0}\abs{J}\,\dd^{2n}x_0$. The Jacobian matrix $A(t) = \partial\boldsymbol\Phi_t/\partial\mathbf{x}_0$ satisfies, by differentiating $\dot{\mathbf{x}} = \mathbf{v}$ with respect to the initial condition,

$$
\dot A = DA, \qquad A(0) = \mathbb 1, \qquad D_{ab} = \pdv{v_a}{x_b}\Big|_{\mathbf{x}(t)}.
$$

For any differentiable invertible matrix, $\dd(\det A)/\dd t = \det A\,\tr(A^{-1}\dot A)$ (Jacobi's formula, which follows from expanding $\det(A + \dot A\,\dd t) = \det A\det(\mathbb 1 + A^{-1}\dot A\,\dd t) = \det A\,(1 + \tr(A^{-1}\dot A)\,\dd t + O(\dd t^2))$). Here $A^{-1}\dot A = A^{-1}DA$, whose trace is $\tr D = \nabla\cdot\mathbf{v} = 0$. So $\dot J = 0$, $J(t) = J(0) = 1$, and the volume is unchanged.
:::

The phase-space cloud can be stretched in one direction and squeezed in another, folded, drawn out into long filaments; its volume stays the same. Two consequences matter throughout physics. First, a Hamiltonian system has no **attractors**: no region of phase space towards which a set of trajectories of positive volume converges, since such convergence would shrink the volume. A damped pendulum spirals into its equilibrium, but it is not Hamiltonian; friction is what allows the contraction. Second, the uniform density on an energy surface is preserved by the flow, which is the starting point of the microcanonical ensemble in [[statistical-mechanics/microcanonical]].

::: example Phase-space area for the harmonic oscillator {#ex-sho-area}
For $H = p^2/(2m) + \frac12m\omega^2q^2$, find the area enclosed by the trajectory of energy $E$, and show that the flow maps the square $[0, \eps]\times[0, \eps]$ to a region of the same area.
::: solution
The trajectory $p^2/(2mE) + q^2/(2E/(m\omega^2)) = 1$ is an ellipse with semi-axes $\sqrt{2mE}$ in $p$ and $\sqrt{2E/(m\omega^2)}$ in $q$, so its area is

$$
\pi\sqrt{2mE}\sqrt{\frac{2E}{m\omega^2}} = \frac{2\pi E}{\omega}.
$$

Dividing by $2\pi$ gives the **action variable** $J = E/\omega$, which reappears below.

Hamilton's equations, $\dot q = p/m$ and $\dot p = -m\omega^2q$, have the solution

$$
\begin{pmatrix}q\\p\end{pmatrix} = \begin{pmatrix}\cos\omega t & \sin\omega t/(m\omega)\\ -m\omega\sin\omega t & \cos\omega t\end{pmatrix}\begin{pmatrix}q_0\\p_0\end{pmatrix}.
$$

The flow is linear, so it maps the square to a parallelogram, whose area is the square's area times the absolute determinant of the matrix: $\cos^2\omega t + \sin^2\omega t = 1$. The area is $\eps^2$ at every time, as [[#thm-liouville]] requires. The parallelogram rotates and shears, compressing in $q$ when it stretches in $p$.
:::
:::

::: quiz
A cloud of initial conditions for a frictionless pendulum starts as a small disc in phase space near the separatrix. After a long time, which description is right?
- [ ] It has shrunk to a point at the stable equilibrium.
- [ ] It has kept its circular shape and area, because the motion is periodic.
- [x] It has been drawn out into a long thin filament winding around the centre, with the same area as at the start.
- [ ] Its area has grown, because nearby trajectories near the separatrix separate.
::: solution
Near the separatrix the period depends strongly on the energy, so points of the disc with slightly different energies go round at different rates and the disc is sheared into a long spiral filament. Liouville's theorem fixes its area. It cannot shrink to a point, because there is no friction, and it cannot grow: separation of trajectories in one direction is always compensated by compression in another.
:::
:::

## Poisson brackets {#poisson}

Any quantity $f(q, p, t)$ evolves along a trajectory at the rate

$$
\deriv{f}{t} = \sum_j\left(\pdv{f}{q_j}\dot q_j + \pdv{f}{p_j}\dot p_j\right) + \pdv{f}{t} = \sum_j\left(\pdv{f}{q_j}\pdv{H}{p_j} - \pdv{f}{p_j}\pdv{H}{q_j}\right) + \pdv{f}{t}.
$$

The combination in the sum appears so often that it gets a name.

::: definition Poisson bracket {#def-poisson}
The **Poisson bracket** of two functions $f(q, p, t)$ and $g(q, p, t)$ on phase space is

$$
\{f, g\} = \sum_{j=1}^n\left(\pdv{f}{q_j}\pdv{g}{p_j} - \pdv{f}{p_j}\pdv{g}{q_j}\right).
$$ {#eq-poisson}
:::

With this notation the equation of motion of any quantity is

$$
\deriv{f}{t} = \{f, H\} + \pdv{f}{t},
$$ {#eq-poisson-eom}

and Hamilton's equations themselves are $\dot q_j = \{q_j, H\}$ and $\dot p_j = \{p_j, H\}$. A quantity without explicit time dependence is conserved if and only if its bracket with $H$ vanishes.

::: proposition Properties of the Poisson bracket {#prop-poisson}
For all functions $f$, $g$, $k$ on phase space and constants $a$, $b$:

1. Antisymmetry: $\{f, g\} = -\{g, f\}$, so $\{f, f\} = 0$.
2. Linearity: $\{af + bg, k\} = a\{f, k\} + b\{g, k\}$.
3. Leibniz rule: $\{fg, k\} = f\{g, k\} + \{f, k\}g$.
4. Jacobi identity: $\{f, \{g, k\}\} + \{g, \{k, f\}\} + \{k, \{f, g\}\} = 0$.
5. Canonical brackets: $\{q_j, q_k\} = 0$, $\{p_j, p_k\} = 0$, $\{q_j, p_k\} = \delta_{jk}$.
:::

::: proof
Properties 1 to 3 and 5 follow directly from [[#eq-poisson]] and the product rule; for example $\{q_j, p_k\} = \sum_i(\delta_{ij}\delta_{ik} - 0) = \delta_{jk}$. For the Jacobi identity, write $\mathbf{x} = (q, p)$ and $\{f, g\} = \sum_{a,b}\Omega_{ab}\,\partial_af\,\partial_bg$, where $\Omega$ is the constant antisymmetric $2n\times 2n$ matrix with $\Omega_{q_jp_j} = 1$ and $\Omega_{p_jq_j} = -1$. Every term of the cyclic sum contains exactly one second derivative. Those containing second derivatives of $k$ come only from the first two brackets:

$$
\{f, \{g, k\}\} \ni \sum\Omega_{ab}\Omega_{cd}\,\partial_af\,\partial_cg\,\partial_b\partial_dk, \qquad \{g, \{k, f\}\} \ni \sum\Omega_{ab}\Omega_{cd}\,\partial_ag\,\partial_df\,\partial_b\partial_ck.
$$

Rename the summation indices in the second sum by $(a, b, c, d) \to (c, d, b, a)$. It becomes $\sum\Omega_{cd}\Omega_{ba}\,\partial_cg\,\partial_af\,\partial_d\partial_bk = -\sum\Omega_{ab}\Omega_{cd}\,\partial_af\,\partial_cg\,\partial_b\partial_dk$, using $\Omega_{ba} = -\Omega_{ab}$ and the symmetry of second derivatives. The two cancel. By cyclic symmetry of the identity, the terms with second derivatives of $f$ and of $g$ cancel in the same way.
:::

::: theorem Poisson's theorem {#thm-poisson}
If $f$ and $g$ are conserved quantities with no explicit time dependence, then $\{f, g\}$ is also conserved.
:::

::: proof
By [[#eq-poisson-eom]], $\{f, H\} = 0$ and $\{g, H\} = 0$. The Jacobi identity with $k = H$ gives

$$
\{H, \{f, g\}\} = -\{f, \{g, H\}\} - \{g, \{H, f\}\} = -\{f, 0\} - \{g, 0\} = 0,
$$

so $\dd\{f, g\}/\dd t = \{\{f, g\}, H\} = 0$.
:::

::: example Angular momentum brackets {#ex-angular-brackets}
For a particle in three dimensions with Cartesian coordinates and momenta, show that $\{L_x, L_y\} = L_z$, where $\mathbf{L} = \mathbf{r}\times\mathbf{p}$. Deduce that a particle with two conserved components of angular momentum has the third conserved too.
::: solution
$L_x = yp_z - zp_y$ and $L_y = zp_x - xp_z$. By linearity, the Leibniz rule and the canonical brackets, only pairs containing a coordinate and its own momentum contribute:

$$
\{L_x, L_y\} = \{yp_z, zp_x\} - \{yp_z, xp_z\} - \{zp_y, zp_x\} + \{zp_y, xp_z\}.
$$

In the first term, $\{yp_z, zp_x\} = yp_x\{p_z, z\} = -yp_x$. The second and third vanish, because neither contains a coordinate together with its own conjugate momentum: $\{yp_z, xp_z\}$ involves $y, x, p_z$ and $\{zp_y, zp_x\}$ involves $z, p_y, p_x$. In the fourth, $\{zp_y, xp_z\} = p_yx\{z, p_z\} = xp_y$. So

$$
\{L_x, L_y\} = xp_y - yp_x = L_z.
$$

By cyclic symmetry, $\{L_y, L_z\} = L_x$ and $\{L_z, L_x\} = L_y$. If $L_x$ and $L_y$ are both conserved, Poisson's theorem says $\{L_x, L_y\} = L_z$ is conserved. In quantum mechanics the same algebra becomes $[\hat L_x, \hat L_y] = i\hbar\hat L_z$, the starting point of [[quantum-1/angular-momentum]].
:::
:::

::: quiz
For a free particle in one dimension, $H = p^2/(2m)$. Which of the following is conserved?
- [x] $p$
- [ ] $q$
- [x] $q - pt/m$
- [ ] $qp$
::: solution
$\{p, H\} = 0$, so $p$ is conserved. $\{q, H\} = p/m \neq 0$, so $q$ is not. For $f = q - pt/m$, with explicit time dependence, [[#eq-poisson-eom]] gives $\dd f/\dd t = \{q, H\} - (t/m)\{p, H\} + \partial f/\partial t = p/m - 0 - p/m = 0$: it is the initial position, conserved because the particle moves uniformly. Finally $\{qp, H\} = p\{q, H\} = p^2/m \neq 0$.
:::
:::

## Canonical transformations {#canonical}

In Lagrangian mechanics we may use any coordinates $q$. In Hamiltonian mechanics the class of allowed changes of variable is larger: new coordinates $Q$ and momenta $P$ may each depend on both the old $q$ and $p$. The requirement is that Hamilton's equations keep their form.

::: definition Canonical transformation {#def-canonical}
An invertible change of variables $Q_j = Q_j(q, p)$, $P_j = P_j(q, p)$ is **canonical** if it preserves the canonical brackets:

$$
\{Q_j, Q_k\} = 0, \qquad \{P_j, P_k\} = 0, \qquad \{Q_j, P_k\} = \delta_{jk},
$$ {#eq-canonical}

the brackets being computed in the old variables $(q, p)$.
:::

The point of the definition is that it keeps the form of Hamilton's equations: in the new variables, with the new Hamiltonian $K(Q, P) = H(q(Q, P), p(Q, P))$, the motion obeys $\dot Q_j = \partial K/\partial P_j$ and $\dot P_j = -\partial K/\partial Q_j$ ([[#exr-canonical-form]]). For one degree of freedom, $\{Q, P\} = 1$ says that the Jacobian determinant of $(q, p) \mapsto (Q, P)$ is $1$: canonical transformations of the plane are exactly the area-preserving ones. In general they preserve phase-space volume, and Liouville's theorem has a second reading: the flow of a Hamiltonian system for a time $t$ is itself a canonical transformation.

A convenient way to produce canonical transformations is through a **generating function**. If $F_2(q, P, t)$ is any function with $\det(\partial^2F_2/\partial q\,\partial P) \neq 0$, the relations

$$
p_j = \pdv{F_2}{q_j}, \qquad Q_j = \pdv{F_2}{P_j}, \qquad K = H + \pdv{F_2}{t}
$$ {#eq-generating}

define a canonical transformation, implicitly. The reason, sketched in [[#exr-generating]], is that Hamilton's principle in phase space, $\delta\int(\sum p\dot q - H)\,\dd t = 0$, is unchanged when the integrand changes by a total time derivative, exactly as in [[analytical-mechanics/lagrangian#prop-gauge]]. The identity $F_2 = \sum_jq_jP_j$ generates the identity transformation; $F_2 = \sum_jf_j(q)P_j$ generates a change of coordinates $Q = f(q)$ with the momenta transformed to match, which shows that every Lagrangian change of coordinates is a special canonical transformation.

::: example Action–angle variables for the oscillator {#ex-action-angle}
For $H = p^2/(2m) + \frac12m\omega^2q^2$, show that

$$
q = \sqrt{\frac{2J}{m\omega}}\sin\varphi, \qquad p = \sqrt{2Jm\omega}\cos\varphi
$$

defines a canonical transformation from $(q, p)$ to $(\varphi, J)$, and solve the motion in the new variables.
::: solution
It is easiest to check the inverse bracket, $\{q, p\}_{\varphi, J} = 1$, computed with $\varphi$ as coordinate and $J$ as momentum; a transformation and its inverse are canonical together. We need

$$
\pdv{q}{\varphi} = \sqrt{\frac{2J}{m\omega}}\cos\varphi, \quad \pdv{q}{J} = \frac{\sin\varphi}{\sqrt{2Jm\omega}}, \quad \pdv{p}{\varphi} = -\sqrt{2Jm\omega}\sin\varphi, \quad \pdv{p}{J} = \sqrt{\frac{m\omega}{2J}}\cos\varphi.
$$

Then

$$
\{q, p\}_{\varphi, J} = \pdv{q}{\varphi}\pdv{p}{J} - \pdv{q}{J}\pdv{p}{\varphi} = \cos^2\varphi + \sin^2\varphi = 1.
$$

So the transformation is canonical. Substituting into $H$,

$$
K = \frac{2Jm\omega\cos^2\varphi}{2m} + \frac12m\omega^2\frac{2J}{m\omega}\sin^2\varphi = \omega J.
$$

The new Hamiltonian does not depend on $\varphi$, so $\varphi$ is cyclic: $\dot J = -\partial K/\partial\varphi = 0$ and $\dot\varphi = \partial K/\partial J = \omega$. Hence $J$ is constant, equal to $E/\omega$, and $\varphi = \omega t + \varphi_0$, which gives back $q = \sqrt{2E/(m\omega^2)}\sin(\omega t + \varphi_0)$. The new momentum $J$ is the phase-space area of [[#ex-sho-area]] divided by $2\pi$: the **action**. The new coordinate is the **angle**, advancing uniformly. Every integrable system with bounded motion can be brought into this form, $K = K(J_1, \dots, J_n)$, on each of its invariant tori.
:::
:::

::: remark The Hamilton–Jacobi equation
Pushing the idea of [[#ex-action-angle]] to its limit, one can look for a canonical transformation whose new Hamiltonian is zero, so that all new coordinates and momenta are constant. Its generating function $S(q, P, t)$ must satisfy the **Hamilton–Jacobi equation** $H(q, \partial S/\partial q, t) + \partial S/\partial t = 0$, a single first-order partial differential equation. Its solution $S$ is Hamilton's principal function, the action along the actual path regarded as a function of the endpoint. Schrödinger was guided to his wave equation by this equation, of which it is a wave-mechanical counterpart: for $\psi = e^{iS/\hbar}$, the Schrödinger equation reduces to Hamilton–Jacobi as $\hbar \to 0$.
:::

## Numerical integration that respects the structure {#symplectic}

Liouville's theorem has a practical side. A numerical method for Hamilton's equations replaces the exact flow by a map that advances the state by one time step. If that map does not preserve phase-space area, errors accumulate systematically, and long integrations of planetary orbits or molecular dynamics go wrong in a characteristic way. Methods whose one-step map is itself a canonical transformation are called **symplectic**.

For $H = \frac12(p^2 + q^2)$, the **explicit Euler** method, $q_{n+1} = q_n + hp_n$, $p_{n+1} = p_n - hq_n$, has Jacobian determinant $1 + h^2$, so it inflates every area by $1 + h^2$ per step, and the energy grows by exactly that factor each step. The **symplectic Euler** method updates $p$ first and uses the new $p$ to update $q$, and its Jacobian determinant is exactly $1$. The **leapfrog** or Störmer–Verlet method splits the momentum update into two halves around the position update and is symplectic and second-order accurate. The listing compares the three for $1000$ steps of size $h = 0.1$, starting from $q = 1$, $p = 0$, where the exact energy is $0.5$.

```python
# harmonic oscillator H = (p^2 + q^2)/2, exact energy 0.5, step h = 0.1
h, steps = 0.1, 1000                 # integrate to t = 100

def euler(q, p):                     # explicit Euler
    return q + h*p, p - h*q

def symplectic_euler(q, p):          # update p first, then q with the new p
    p = p - h*q
    return q + h*p, p

def leapfrog(q, p):                  # Stormer-Verlet: half kick, drift, half kick
    p = p - 0.5*h*q
    q = q + h*p
    p = p - 0.5*h*q
    return q, p

for name, step in [("explicit Euler", euler), ("symplectic Euler", symplectic_euler), ("leapfrog", leapfrog)]:
    q, p = 1.0, 0.0
    Emin = Emax = 0.5
    for n in range(steps):
        q, p = step(q, p)
        E = 0.5*(p*p + q*q)
        Emin, Emax = min(Emin, E), max(Emax, E)
    print("%-17s E(100) = %10.4f   min E = %.4f   max E = %.4f" % (name, E, Emin, Emax))

# area of a small phase-space triangle after one step: determinant of the step's Jacobian
for name, J in [("explicit Euler", [[1, h], [-h, 1]]), ("symplectic Euler", [[1 - h*h, h], [-h, 1]])]:
    print("%-17s det J = %.4f" % (name, J[0][0]*J[1][1] - J[0][1]*J[1][0]))
```

Output:

```
explicit Euler    E(100) = 10479.5778   min E = 0.5000   max E = 10479.5778
symplectic Euler  E(100) =     0.5213   min E = 0.4762   max E = 0.5263
leapfrog          E(100) =     0.4997   min E = 0.4988   max E = 0.5000
explicit Euler    det J = 1.0100
symplectic Euler  det J = 1.0000
```

Explicit Euler's energy after $1000$ steps is $0.5\times 1.01^{1000} = 10\,480$, as predicted: the orbit has spiralled outward by a factor of $145$ in amplitude. The two symplectic methods have small energy errors, of order $h$ and $h^2$ respectively, that oscillate and never grow. The reason is deep: a symplectic method is the exact flow of a slightly different Hamiltonian, so it conserves a nearby energy exactly. Every long-term solar-system integration and most molecular-dynamics codes use symplectic methods for this reason; see also [[computation/integrating-motion]].

::: history Legendre, Hamilton, Jacobi and Liouville
Adrien-Marie Legendre introduced his transformation in a 1787 memoir on minimal surfaces. Siméon Denis Poisson defined the bracket in 1809, in a paper on the variation of constants in planetary perturbation theory, and Lagrange used similar expressions at the same time. William Rowan Hamilton, building on his optics of the 1820s, published "On a General Method in Dynamics" in the *Philosophical Transactions* in 1834 and a second essay in 1835, in which the canonical equations and the principal function appear. Carl Gustav Jacob Jacobi showed in 1837 how to use the Hamilton–Jacobi equation to solve problems, introduced canonical transformations, and proved the identity named after him; his 1842–43 Königsberg lectures, published as *Vorlesungen über Dynamik* in 1866, became the standard account. Joseph Liouville published the volume-preservation theorem in 1838, in the form of a result about solutions of linear differential equations; its significance for statistical mechanics was drawn out by Boltzmann and Gibbs.
:::

## Where this leads {#leads}

[[analytical-mechanics/chaos]] studies what happens when a Hamiltonian system with two or more degrees of freedom has too few conserved quantities to be reduced to action–angle form. Statistical mechanics, beginning with [[statistical-mechanics/microcanonical]], rests on Liouville's theorem. In [[quantum-1/formalism]] the Poisson bracket is replaced by the commutator divided by $i\hbar$, $\{f, g\} \to [\hat f, \hat g]/(i\hbar)$, and Hamilton's equations for $\langle q\rangle$ and $\langle p\rangle$ become Ehrenfest's theorem. The structure you have learned, a phase space with a bracket and a Hamiltonian generating the flow, is the common language of classical and quantum dynamics.

::: summary
- The Hamiltonian is the Legendre transform of the Lagrangian in the velocities: $H = \sum_jp_j\dot q_j - L$ with $p_j = \partial L/\partial\dot q_j$. It is the energy function $h$ in phase-space variables, and equals $T + V$ when $T$ is quadratic and $V$ velocity-independent.
- Hamilton's equations $\dot q_j = \partial H/\partial p_j$, $\dot p_j = -\partial H/\partial q_j$ are $2n$ first-order equations equivalent to Lagrange's; $\dd H/\dd t = \partial H/\partial t$.
- For one degree of freedom the phase portrait is the set of level curves of $H$; the pendulum shows centres, saddles and a separatrix at $E = mg\ell$.
- Liouville's theorem: the Hamiltonian flow is divergence-free and preserves phase-space volume, so Hamiltonian systems have no attractors.
- Poisson brackets give $\dd f/\dd t = \{f, H\} + \partial f/\partial t$, with $\{q_j, p_k\} = \delta_{jk}$; the bracket of two conserved quantities is conserved, and $\{L_x, L_y\} = L_z$.
- Canonical transformations preserve the brackets and the form of Hamilton's equations; they can be generated by functions such as $F_2(q, P)$. Action–angle variables make the oscillator $K = \omega J$.
- Symplectic integrators preserve phase-space area and keep the energy error bounded; non-symplectic ones like explicit Euler drift.
:::

## Exercises {#exercises}

::: exercise Evaluating a Hamiltonian {level=1 check="0.25"}
A particle of mass $m = 2.00\,\mathrm{kg}$ on a spring of stiffness $k = 8.00\,\mathrm{N/m}$ has $L = \frac12m\dot q^2 - \frac12kq^2$. Find $H(q, p)$ and Hamilton's equations, and evaluate $H$ in joules at $q = 0.200\,\mathrm{m}$, $p = 0.600\,\mathrm{kg\,m/s}$.
::: solution
$p = m\dot q$, so $\dot q = p/m$ and $H = p^2/m - (\frac12p^2/m - \frac12kq^2) = p^2/(2m) + \frac12kq^2$. Hamilton's equations are $\dot q = p/m$ and $\dot p = -kq$, which together give $m\ddot q = -kq$. At the given point, $H = (0.600)^2/(4.00) + \frac12(8.00)(0.200)^2 = 0.0900 + 0.160 = 0.250\,\mathrm{J}$.
:::
:::

::: exercise A bracket calculation {level=1 check="8"}
Using the properties in [[#prop-poisson]], compute $\{q^2, p^2\}$ for one degree of freedom and evaluate it at $q = 1$, $p = 2$.
::: solution
By the Leibniz rule twice, $\{q^2, p^2\} = 2q\{q, p^2\} = 2q\cdot 2p\{q, p\} = 4qp$. At $q = 1$, $p = 2$ it is $8$. Directly from [[#eq-poisson]]: $\partial_q(q^2)\,\partial_p(p^2) - \partial_p(q^2)\,\partial_q(p^2) = 2q\cdot 2p - 0 = 4qp$.
:::
:::

::: exercise Phase-space area {level=1 check="3*pi"}
A harmonic oscillator with $m = 1.00\,\mathrm{kg}$ and $\omega = 2.00\,\mathrm{rad/s}$ has energy $E = 3.00\,\mathrm{J}$. Find the area of its phase-space orbit in $\mathrm{J\,s}$ and its action variable $J$.
::: solution
By [[#ex-sho-area]], the area is $2\pi E/\omega = 2\pi(3.00)/(2.00) = 3\pi = 9.42\,\mathrm{J\,s}$, and $J = E/\omega = 1.50\,\mathrm{J\,s}$. In the old quantum theory Bohr and Sommerfeld required this area to be a whole multiple of Planck's constant, $2\pi J = nh$, which gives $E = n\hbar\omega$, the right spacing but without the zero-point $\frac12\hbar\omega$.
:::
:::

::: exercise Over the top {level=2 check="2*sqrt(9.8)"}
A pendulum of length $1.00\,\mathrm{m}$ hangs at rest. Using the phase portrait of [[#ex-pendulum-phase]], find the minimum speed, in $\mathrm{m/s}$, that must be given to the bob for it to go over the top, assuming it is held on a rigid light rod.
::: solution
Rotation over the top needs $E > mg\ell$, the separatrix energy. At the bottom, $E = \frac12mv^2 - mg\ell$, so we need $\frac12mv^2 > 2mg\ell$, that is $v > 2\sqrt{g\ell} = 2\sqrt{9.80} = 6.26\,\mathrm{m/s}$. Exactly at this speed the bob approaches the inverted position and takes infinitely long to get there, as motion on the separatrix does. With a string instead of a rod, the string goes slack before the top unless $v^2 \ge 5g\ell$, because a string cannot push.
:::
:::

::: exercise Area of a damped oscillator's phase cloud {level=2 check="exp(-2)"}
A damped oscillator obeys $\dot q = p/m$, $\dot p = -kq - \gamma p$ with $\gamma = 0.500\,\mathrm{s^{-1}}$. Compute the divergence of the phase-space velocity field, and find the factor by which the area of a cloud of initial conditions has shrunk after $4.00\,\mathrm{s}$. Why does this not contradict Liouville's theorem?
::: solution
The velocity field is $(p/m, -kq - \gamma p)$, with divergence $\partial_q(p/m) + \partial_p(-kq - \gamma p) = -\gamma$. By the argument in the proof of [[#thm-liouville]], $\dot J = (\nabla\cdot\mathbf{v})J = -\gamma J$, so areas shrink as $e^{-\gamma t}$. After $4.00\,\mathrm{s}$ the factor is $e^{-2} = 0.135$. There is no contradiction: these equations are not Hamilton's equations for any $H$, because a Hamiltonian field has zero divergence. The friction term makes the origin an attractor, which no Hamiltonian system has.
:::
:::

::: exercise Checking canonical transformations {level=2}
For one degree of freedom, decide which of the following are canonical: (a) $Q = p$, $P = -q$; (b) $Q = q^2$, $P = p/(2q)$ for $q > 0$; (c) $Q = 2q$, $P = 2p$. For any that are not, find a simple modification that is.
::: solution
Compute $\{Q, P\} = \partial_qQ\,\partial_pP - \partial_pQ\,\partial_qP$.

(a) $\{p, -q\} = 0\cdot 0 - 1\cdot(-1) = 1$. Canonical: exchanging coordinate and momentum, with a sign, is allowed. The distinction between "position" and "momentum" is not intrinsic in Hamiltonian mechanics.

(b) $\{q^2, p/(2q)\} = 2q\cdot\frac{1}{2q} - 0 = 1$. Canonical. It is the point transformation $Q = q^2$ with the momentum transformed so that $P\,\dd Q = p\,\dd q$, generated by $F_2 = q^2P$.

(c) $\{2q, 2p\} = 4$. Not canonical: it quadruples areas. The scaled pair $Q = 2q$, $P = p/2$ has bracket $1$, and so does any $Q = \lambda q$, $P = p/\lambda$ with $\lambda \neq 0$. A transformation with bracket a constant $c \neq 1$, like (c), is canonical up to a rescaling of the Hamiltonian by $c$: it maps Hamilton's equations for $H$ to Hamilton's equations for $cH$.
:::
:::

::: exercise Hamilton's equations survive canonical transformations {level=3 #exr-canonical-form}
Let $(Q, P)$ be a time-independent canonical transformation of one degree of freedom, and $K(Q, P) = H(q, p)$. Prove that $\dot Q = \partial K/\partial P$ and $\dot P = -\partial K/\partial Q$.
::: hint
Use [[#eq-poisson-eom]] for $f = Q$ and express $\{Q, H\}$ through the chain rule, writing $H$ as $K(Q(q, p), P(q, p))$.
:::
::: solution
By [[#eq-poisson-eom]], $\dot Q = \{Q, H\}$, computed in $(q, p)$. Since $H(q, p) = K(Q(q, p), P(q, p))$, the chain rule gives $\partial H/\partial q = K_Q\,\partial Q/\partial q + K_P\,\partial P/\partial q$ and similarly for $\partial H/\partial p$. Substituting into the bracket, which is linear in its second argument's derivatives,

$$
\{Q, H\} = K_Q\{Q, Q\} + K_P\{Q, P\} = 0 + K_P\cdot 1 = \pdv{K}{P}.
$$

Likewise $\dot P = \{P, H\} = K_Q\{P, Q\} + K_P\{P, P\} = -K_Q$. These are Hamilton's equations in the new variables. The proof extends to $n$ degrees of freedom term by term, using all of [[#eq-canonical]].
:::
:::

::: exercise Why generating functions work {level=3 #exr-generating}
Show that the phase-space form of Hamilton's principle, $\delta\int_{t_1}^{t_2}\bigl(p\dot q - H(q, p, t)\bigr)\,\dd t = 0$ with $q$ fixed at the ends and $q$ and $p$ varied independently, gives Hamilton's equations. Then show that if the integrands in old and new variables differ by $\dd F/\dd t$ with $F = F_2(q, P, t) - QP$, the relations [[#eq-generating]] follow.
::: solution
Varying $p$ by $\delta p$, the first variation is $\int(\dot q - \partial H/\partial p)\delta p\,\dd t$, so stationarity under arbitrary $\delta p$ gives $\dot q = \partial H/\partial p$. Varying $q$ by $\delta q$ with $\delta q = 0$ at the ends, the variation is $\int(p\,\delta\dot q - \partial H/\partial q\,\delta q)\,\dd t$; integrating the first term by parts gives $\int(-\dot p - \partial H/\partial q)\delta q\,\dd t$, so $\dot p = -\partial H/\partial q$.

Suppose the new variables satisfy Hamilton's principle with $K$, and that

$$
p\dot q - H = P\dot Q - K + \deriv{F}{t}.
$$

Then the two variational problems have the same stationary paths, by the argument of [[analytical-mechanics/lagrangian#prop-gauge]]. Take $F = F_2(q, P, t) - QP$. Its time derivative is $\partial_qF_2\,\dot q + \partial_PF_2\,\dot P + \partial_tF_2 - \dot QP - Q\dot P$. Substituting and cancelling the $P\dot Q$ terms,

$$
p\dot q - H = \pdv{F_2}{q}\dot q + \left(\pdv{F_2}{P} - Q\right)\dot P - K + \pdv{F_2}{t}.
$$

Treating $q$ and $P$ as the independent variables, the coefficients of $\dot q$ and $\dot P$ must match on both sides, giving $p = \partial F_2/\partial q$ and $Q = \partial F_2/\partial P$, and the remaining terms give $K = H + \partial F_2/\partial t$. These are [[#eq-generating]].
:::
:::
