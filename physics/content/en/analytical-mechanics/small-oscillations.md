Hang two identical pendulums side by side and join their bobs with a weak spring. Pull one aside and let go. At first it swings alone, while the other hardly moves. Then the second begins to swing, the first dies away, and after a while the second is swinging with the full amplitude and the first is momentarily at rest. The energy flows back and forth, indefinitely if there is no friction. The motion looks complicated. It is, in fact, the sum of two perfectly simple motions, each of which repeats exactly: both pendulums swinging together, and both swinging in opposition. These are the **normal modes** of the system.

Every mechanical system near a stable equilibrium behaves like this. A molecule vibrating, a bridge swaying, a crystal lattice carrying sound: in each case, for small enough amplitudes, the motion is a superposition of independent normal modes, each oscillating at its own frequency. Finding them is a problem in linear algebra, the **generalised eigenvalue problem** $K\mathbf{a} = \omega^2 M\mathbf{a}$, and the purpose of this chapter is to set it up from a Lagrangian, to prove that it always has the solutions physics needs, and to solve it, by hand where symmetry allows and numerically where it does not.

You should know simple harmonic motion ([[oscillations/simple-harmonic]]) and two coupled masses ([[oscillations/superposition]]), Lagrange's equations ([[analytical-mechanics/lagrangian]]), and eigenvalues and eigenvectors of symmetric matrices ([eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues) and [the spectral theorem](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem) in the Maths Atlas).

## Equilibrium and the quadratic approximation {#quadratic}

Consider a system with $n$ degrees of freedom, generalised coordinates $q_1, \dots, q_n$, scleronomic constraints and conservative forces, so that

$$
L = \tfrac12\sum_{j,k}M_{jk}(q)\,\dot q_j\dot q_k - V(q),
$$

with $M(q)$ symmetric and positive definite, as shown in [[analytical-mechanics/constraints]].

::: definition Equilibrium {#def-equilibrium}
A configuration $q^{(0)}$ is an **equilibrium** if $q(t) = q^{(0)}$ for all $t$ is a solution of Lagrange's equations. For the Lagrangian above this holds exactly when

$$
\pdv{V}{q_j}\Big|_{q^{(0)}} = 0, \qquad j = 1, \dots, n.
$$

The equilibrium is **stable** if every motion that starts close enough to $q^{(0)}$ with small enough velocities stays close to it for all time.
:::

The condition follows by putting $\dot q = \ddot q = 0$ into Lagrange's equations: every term involving $M$ carries at least one velocity or acceleration, and only $\partial V/\partial q_j$ remains.

Now write $q_j = q^{(0)}_j + \eta_j$ and keep the lowest non-trivial order in the small displacements $\eta$ and their velocities. Expand the potential in a Taylor series:

$$
V(q^{(0)} + \eta) = V(q^{(0)}) + \sum_j\pdv{V}{q_j}\Big|_0\eta_j + \frac12\sum_{j,k}\frac{\partial^2V}{\partial q_j\,\partial q_k}\Big|_0\eta_j\eta_k + O(\eta^3).
$$

The constant is irrelevant and the linear term vanishes at equilibrium. The kinetic energy is already quadratic in the velocities, so to the same order its coefficients can be frozen at their equilibrium values.

::: definition Mass and stiffness matrices {#def-MK}
At an equilibrium $q^{(0)}$, the **mass matrix** and **stiffness matrix** are the constant symmetric matrices

$$
M_{jk} = M_{jk}(q^{(0)}), \qquad K_{jk} = \frac{\partial^2V}{\partial q_j\,\partial q_k}\Big|_{q^{(0)}}.
$$

The **quadratic Lagrangian** is

$$
L_2 = \tfrac12\dot{\boldsymbol\eta}\T M\dot{\boldsymbol\eta} - \tfrac12\boldsymbol\eta\T K\boldsymbol\eta,
$$ {#eq-L2}

and its Lagrange equations are the linear system

$$
M\ddot{\boldsymbol\eta} + K\boldsymbol\eta = 0.
$$ {#eq-linear}
:::

To derive [[#eq-linear]], note that $\partial L_2/\partial\dot\eta_j = \sum_k M_{jk}\dot\eta_k$ and $\partial L_2/\partial\eta_j = -\sum_k K_{jk}\eta_k$, using the symmetry of both matrices. The matrix $M$ is positive definite because kinetic energy is positive for any non-zero velocity. The matrix $K$ is symmetric because mixed partial derivatives commute, but it need not be positive.

::: warning Do not linearise the equations before you have the right Lagrangian
It is tempting to expand $T$ in powers of $\eta$ as well, keeping $\eta\dot\eta^2$ terms "for accuracy". They are of third order and must be dropped together with the cubic terms of $V$; keeping one and not the other gives an inconsistent equation. Conversely, do not drop a term in $V$ that is quadratic in $\eta$ just because it looks small, such as the $\frac12 mg\ell\phi^2$ of a pendulum: it is the same order as everything else in [[#eq-L2]]. The rule is simple. Expand both $T$ and $V$ to exactly second order in the combined smallness of $\eta$ and $\dot\eta$.
:::

## Normal modes {#modes}

Look for solutions of [[#eq-linear]] in which every coordinate oscillates at the same frequency with fixed relative amplitudes, $\boldsymbol\eta(t) = \mathbf{a}\cos(\omega t - \delta)$. Substituting,

$$
\bigl(K - \omega^2M\bigr)\mathbf{a} = 0.
$$ {#eq-gen-eig}

A non-zero $\mathbf{a}$ exists only if the matrix is singular, that is, if $\omega^2$ is a root of the **characteristic equation**

$$
\det\bigl(K - \omega^2M\bigr) = 0,
$$ {#eq-char}

a polynomial equation of degree $n$ in $\omega^2$.

::: definition Normal mode {#def-normal-mode}
A **normal mode** of [[#eq-linear]] is a solution $\boldsymbol\eta = \mathbf{a}\cos(\omega t - \delta)$ with $\mathbf{a} \neq 0$ satisfying [[#eq-gen-eig]]. The number $\omega$ is its **normal frequency** and $\mathbf{a}$ its **mode shape**. Equation [[#eq-gen-eig]] is a **generalised eigenvalue problem** for the pair $(K, M)$, with eigenvalue $\lambda = \omega^2$.
:::

Physics needs three things from this eigenproblem: real values of $\omega^2$, a full set of $n$ independent mode shapes, and positive $\omega^2$ when the equilibrium is a minimum of $V$. The following theorem supplies all three.

::: theorem The generalised symmetric eigenproblem {#thm-gen-eig}
Let $M$ and $K$ be real symmetric $n\times n$ matrices with $M$ positive definite. Then:

1. Every root $\lambda$ of $\det(K - \lambda M) = 0$ is real.
2. Eigenvectors belonging to distinct eigenvalues are **$M$-orthogonal**: $\mathbf{a}_r\T M\mathbf{a}_s = 0$.
3. There is a basis $\mathbf{a}_1, \dots, \mathbf{a}_n$ of $\R^n$ consisting of eigenvectors, normalised so that $\mathbf{a}_r\T M\mathbf{a}_s = \delta_{rs}$, and then $\mathbf{a}_r\T K\mathbf{a}_s = \lambda_r\delta_{rs}$.
4. If $K$ is positive definite, every $\lambda_r > 0$; if $K$ is only positive semi-definite, every $\lambda_r \ge 0$.
:::

::: proof
(1) Let $K\mathbf{a} = \lambda M\mathbf{a}$ with $\mathbf{a}$ a possibly complex non-zero vector. Multiply on the left by the conjugate transpose $\bar{\mathbf{a}}\T$:

$$
\bar{\mathbf{a}}\T K\mathbf{a} = \lambda\,\bar{\mathbf{a}}\T M\mathbf{a}.
$$

For a real symmetric matrix $S$, the number $\bar{\mathbf{a}}\T S\mathbf{a}$ equals its own complex conjugate $\mathbf{a}\T S\bar{\mathbf{a}} = \bar{\mathbf{a}}\T S\T\mathbf{a}$, so it is real. Writing $\mathbf{a} = \mathbf{x} + i\mathbf{y}$, $\bar{\mathbf{a}}\T M\mathbf{a} = \mathbf{x}\T M\mathbf{x} + \mathbf{y}\T M\mathbf{y} > 0$. Hence $\lambda$ is a ratio of real numbers with non-zero denominator, and is real; the eigenvector can then be taken real.

(2) If $K\mathbf{a}_r = \lambda_rM\mathbf{a}_r$ and $K\mathbf{a}_s = \lambda_sM\mathbf{a}_s$, then $\mathbf{a}_s\T K\mathbf{a}_r = \lambda_r\mathbf{a}_s\T M\mathbf{a}_r$ and, transposing the second relation and using the symmetry of $K$ and $M$, $\mathbf{a}_s\T K\mathbf{a}_r = \lambda_s\mathbf{a}_s\T M\mathbf{a}_r$. Subtracting, $(\lambda_r - \lambda_s)\,\mathbf{a}_s\T M\mathbf{a}_r = 0$, so $\mathbf{a}_s\T M\mathbf{a}_r = 0$ when $\lambda_r \neq \lambda_s$.

(3) Because $M$ is symmetric positive definite it has a symmetric positive-definite square root $M^{1/2}$ (diagonalise $M$ and take square roots of its eigenvalues). Put $\mathbf{b} = M^{1/2}\mathbf{a}$ and $S = M^{-1/2}KM^{-1/2}$. Then $K\mathbf{a} = \lambda M\mathbf{a}$ is equivalent to $S\mathbf{b} = \lambda\mathbf{b}$, an ordinary eigenproblem for the real symmetric matrix $S$. By the spectral theorem $S$ has an orthonormal eigenbasis $\mathbf{b}_1, \dots, \mathbf{b}_n$, degenerate eigenvalues included. Then $\mathbf{a}_r = M^{-1/2}\mathbf{b}_r$ are eigenvectors of the original problem with $\mathbf{a}_r\T M\mathbf{a}_s = \mathbf{b}_r\T\mathbf{b}_s = \delta_{rs}$, and $\mathbf{a}_r\T K\mathbf{a}_s = \lambda_s\mathbf{a}_r\T M\mathbf{a}_s = \lambda_s\delta_{rs}$.

(4) From (3), $\lambda_r = \mathbf{a}_r\T K\mathbf{a}_r$ with $\mathbf{a}_r \neq 0$, which is positive if $K$ is positive definite and non-negative if $K$ is positive semi-definite.
:::

The quantity $\mathbf{a}\T M\mathbf{b}$ plays the role of a dot product. Mode shapes are orthogonal in this "kinetic-energy" inner product, not in the ordinary one, unless $M$ is a multiple of the identity.

::: theorem Normal coordinates {#thm-normal-coords}
With the $M$-orthonormal eigenvectors of [[#thm-gen-eig]], define **normal coordinates** $Q_r$ by $\boldsymbol\eta = \sum_r Q_r\mathbf{a}_r$, equivalently $Q_r = \mathbf{a}_r\T M\boldsymbol\eta$. Then the quadratic Lagrangian becomes a sum of independent oscillators,

$$
L_2 = \sum_{r=1}^n\tfrac12\bigl(\dot Q_r^2 - \omega_r^2Q_r^2\bigr), \qquad \omega_r^2 = \lambda_r,
$$ {#eq-normal-L}

and when every $\lambda_r > 0$ the general solution of [[#eq-linear]] is

$$
\boldsymbol\eta(t) = \sum_{r=1}^n C_r\,\mathbf{a}_r\cos(\omega_rt - \delta_r),
$$ {#eq-general}

with $2n$ constants $C_r$, $\delta_r$ fixed by the initial displacements and velocities.
:::

::: proof
Substituting $\boldsymbol\eta = \sum_rQ_r\mathbf{a}_r$, the kinetic term is $\frac12\sum_{r,s}\dot Q_r\dot Q_s\,\mathbf{a}_r\T M\mathbf{a}_s = \frac12\sum_r\dot Q_r^2$, and the potential term is $\frac12\sum_{r,s}Q_rQ_s\,\mathbf{a}_r\T K\mathbf{a}_s = \frac12\sum_r\lambda_rQ_r^2$, by part (3) of [[#thm-gen-eig]]. The Lagrange equation for each $Q_r$ is $\ddot Q_r + \lambda_rQ_r = 0$, with solution $Q_r = C_r\cos(\omega_rt - \delta_r)$. The inverse formula follows from $\mathbf{a}_s\T M\boldsymbol\eta = \sum_rQ_r\mathbf{a}_s\T M\mathbf{a}_r = Q_s$.
:::

In normal coordinates the system is $n$ uncoupled harmonic oscillators. The energy $E = \sum_r\frac12(\dot Q_r^2 + \omega_r^2Q_r^2)$ is a sum of separately conserved mode energies, so energy put into one mode stays there. The coupled pendulums' energy exchange is not energy flowing between modes; it is the beating of two modes, each with constant energy, seen in coordinates that mix them.

A negative eigenvalue $\lambda_r < 0$ gives $\ddot Q_r = \abs{\lambda_r}Q_r$ and exponential growth: the equilibrium is unstable, as at the top of an inverted pendulum. A zero eigenvalue gives $\ddot Q_r = 0$ and uniform drift, a **zero mode**, which signals a continuous family of equilibria, usually from a symmetry such as translation.

### The recipe

1. Find the equilibrium from $\partial V/\partial q = 0$.
2. Compute $M$ from $T$ at equilibrium and $K$ from the second derivatives of $V$.
3. Solve $\det(K - \omega^2M) = 0$ for the $n$ values of $\omega^2$.
4. For each, solve $(K - \omega^2M)\mathbf{a} = 0$ for the mode shape.
5. Fit the initial conditions with [[#eq-general]], using $Q_r(0) = \mathbf{a}_r\T M\boldsymbol\eta(0)$.

::: example Two masses and three springs {#ex-two-masses}
Two blocks of mass $m$ slide on a smooth table between two walls, connected wall–block–block–wall by three springs. The outer springs have stiffness $k$ and the middle one $k'$. Find the normal modes. Then, with block 1 displaced by $A$ and block 2 at rest at its equilibrium, both released from rest, find the motion.
::: solution
Let $x_1$ and $x_2$ be the displacements from equilibrium. Then

$$
T = \tfrac12m\bigl(\dot x_1^2 + \dot x_2^2\bigr), \qquad V = \tfrac12kx_1^2 + \tfrac12k'(x_2 - x_1)^2 + \tfrac12kx_2^2,
$$

so

$$
M = m\begin{pmatrix}1 & 0\\ 0 & 1\end{pmatrix}, \qquad K = \begin{pmatrix}k + k' & -k'\\ -k' & k + k'\end{pmatrix}.
$$

The characteristic equation is $(k + k' - m\omega^2)^2 - k'^2 = 0$, so $k + k' - m\omega^2 = \pm k'$, and

$$
\omega_1^2 = \frac{k}{m}, \quad \mathbf{a}_1 \propto (1, 1); \qquad \omega_2^2 = \frac{k + 2k'}{m}, \quad \mathbf{a}_2 \propto (1, -1).
$$

In the slow mode the blocks move together and the middle spring is never stretched, so only the outer springs act. In the fast mode they move oppositely, and the middle spring is stretched by twice each displacement.

Normalised, $\mathbf{a}_{1,2} = (1, \pm1)/\sqrt{2m}$. The initial data are $\boldsymbol\eta(0) = (A, 0)$ and zero velocity, so $\delta_r = 0$ and $Q_r(0) = \mathbf{a}_r\T M\boldsymbol\eta(0) = mA/\sqrt{2m}$ for both modes. Then

$$
x_1 = \frac{A}{2}\bigl(\cos\omega_1t + \cos\omega_2t\bigr), \qquad x_2 = \frac{A}{2}\bigl(\cos\omega_1t - \cos\omega_2t\bigr).
$$

With the sum-to-product formulae, $x_1 = A\cos(\bar\omega t)\cos(\Delta t)$ and $x_2 = A\sin(\bar\omega t)\sin(\Delta t)$, where $\bar\omega = (\omega_1 + \omega_2)/2$ and $\Delta = (\omega_2 - \omega_1)/2$. For weak coupling, $k' \ll k$, the two frequencies are close, $\Delta$ is small, and each block oscillates at nearly $\bar\omega$ with a slowly varying envelope. All the motion has moved to block 2 after a time $\pi/(2\Delta) = \pi/(\omega_2 - \omega_1)$, and it returns after the same time again.
:::
:::

::: widget plot
f: 0.5*(cos(x) + cos(sqrt(1+2*c)*x)); 0.5*(cos(x) - cos(sqrt(1+2*c)*x))
x: 0, 100
y: -1.1, 1.1
sliders: c=0.2:0.02:1:0.01
labels: x1; x2
caption: The two blocks of the worked example in units with $k/m = 1$ and $A = 1$, so that $\omega_1 = 1$ and $\omega_2 = \sqrt{1 + 2c}$ with $c = k'/k$. At $c = 0.2$ the energy passes completely from block 1 to block 2 in a time $\pi/(\sqrt{1.4} - 1) \approx 17$ and back again. Lower $c$ towards $0.02$ and the exchange slows right down, to about $160$, while the fast oscillation inside the envelope hardly changes. Raise $c$ and the beats blur into a two-frequency wobble.
:::

::: example The double pendulum {#ex-double-pendulum}
A double pendulum has two equal bobs of mass $m$ on light rods of equal length $\ell$. Find its normal frequencies and mode shapes for small oscillations about the hanging equilibrium. Evaluate the frequencies for $\ell = 1.00\,\mathrm{m}$.
::: solution
With the angles $\phi_1$ and $\phi_2$ of [[analytical-mechanics/constraints#ex-dof]], the exact energies are

$$
T = \tfrac12m\ell^2\bigl[2\dot\phi_1^2 + \dot\phi_2^2 + 2\dot\phi_1\dot\phi_2\cos(\phi_1 - \phi_2)\bigr], \qquad V = -mg\ell\bigl(2\cos\phi_1 + \cos\phi_2\bigr).
$$

To second order, $\cos(\phi_1 - \phi_2) \to 1$ in $T$, and $\cos\phi \approx 1 - \frac12\phi^2$ in $V$, so

$$
M = m\ell^2\begin{pmatrix}2 & 1\\ 1 & 1\end{pmatrix}, \qquad K = mg\ell\begin{pmatrix}2 & 0\\ 0 & 1\end{pmatrix}.
$$

Write $\lambda = \omega^2\ell/g$. Dividing by $mg\ell$, the characteristic equation is

$$
\det\begin{pmatrix}2 - 2\lambda & -\lambda\\ -\lambda & 1 - \lambda\end{pmatrix} = 2(1 - \lambda)^2 - \lambda^2 = \lambda^2 - 4\lambda + 2 = 0,
$$

with roots $\lambda = 2 \mp \sqrt2$. So

$$
\omega_{1,2}^2 = \bigl(2 \mp \sqrt2\bigr)\frac{g}{\ell}.
$$

For the mode shape, the second row gives $-\lambda a_1 + (1 - \lambda)a_2 = 0$, so $a_2/a_1 = \lambda/(1 - \lambda)$. For $\lambda = 2 - \sqrt2$, this is $(2 - \sqrt2)/(\sqrt2 - 1) = \sqrt2$: the slow mode has both rods swinging the same way, the lower one at $\sqrt2$ times the angle of the upper. For $\lambda = 2 + \sqrt2$, $a_2/a_1 = -\sqrt2$: the fast mode has them swinging oppositely.

With $\ell = 1.00\,\mathrm{m}$, $\omega_1 = \sqrt{(2 - \sqrt2)(9.80)} = 2.40\,\mathrm{rad/s}$ and $\omega_2 = \sqrt{(2 + \sqrt2)(9.80)} = 5.78\,\mathrm{rad/s}$, compared with $3.13\,\mathrm{rad/s}$ for a single pendulum of length $1.00\,\mathrm{m}$. Check $M$-orthogonality: with $\mathbf{a}_1 = (1, \sqrt2)$ and $\mathbf{a}_2 = (1, -\sqrt2)$, $\mathbf{a}_1\T\begin{pmatrix}2&1\\1&1\end{pmatrix}\mathbf{a}_2 = 2 - \sqrt2 + \sqrt2 - 2 = 0$. The ordinary dot product, $1 - 2 = -1$, is not zero: the modes are orthogonal only in the kinetic-energy inner product.
:::
:::

::: quiz
For a system with $M = \mathrm{diag}(1, 4)$ and $K = \mathrm{diag}(9, 4)$ (SI units), what are the normal frequencies?
- [ ] $3$ and $2\,\mathrm{rad/s}$, the square roots of the diagonal of $K$.
- [x] $3$ and $1\,\mathrm{rad/s}$.
- [ ] $9$ and $1\,\mathrm{rad/s}$.
- [ ] They cannot be found without solving a quadratic, because $M \ne \mathbb{1}$.
::: solution
Both matrices are diagonal, so the coordinates are already normal and $\det(K - \omega^2M) = (9 - \omega^2)(4 - 4\omega^2)$. The roots are $\omega^2 = 9$ and $\omega^2 = 1$, giving $3$ and $1\,\mathrm{rad/s}$. Each frequency is $\sqrt{K_{jj}/M_{jj}}$: you must divide by the mass before taking the square root. Taking the square roots of $K$ alone ignores the inertia.
:::
:::

## Stability and driven modes {#stability}

The linear analysis says that positive-definite $K$ gives bounded oscillations of the *linearised* equations. Does it say anything about the true nonlinear motion? For a strict minimum of the potential, yes, and the argument uses only energy conservation.

::: theorem Lagrange–Dirichlet stability theorem {#thm-dirichlet}
Let the Lagrangian be $L = \frac12\dot q\T M(q)\dot q - V(q)$ with $M(q)$ positive definite, and let $q^{(0)}$ be a strict local minimum of $V$. Then $q^{(0)}$ is a stable equilibrium of the full nonlinear equations of motion.
:::

::: proof
Take $V(q^{(0)}) = 0$. Given $\eps > 0$ small enough that $V > 0$ on the punctured ball $0 < \abs{q - q^{(0)}} \le \eps$, let $m_\eps > 0$ be the minimum of $V$ on the sphere $\abs{q - q^{(0)}} = \eps$; it is positive because the sphere is compact and $V$ is continuous and positive there. The energy $E = T + V$ is conserved, by [[analytical-mechanics/lagrangian#thm-energy]], and $T \ge 0$. By continuity, there is a $\delta > 0$ such that any initial state with $\abs{q - q^{(0)}} < \delta$ and $\abs{\dot q} < \delta$ has $E < m_\eps$. Along that motion $V(q(t)) \le E < m_\eps$ for all $t$, so the path can never reach the sphere where $V \ge m_\eps$; being continuous and starting inside, it stays inside the ball of radius $\eps$. The same bound $T \le E$ keeps the velocities small.
:::

When $K$ is positive definite the equilibrium is a strict minimum, by Taylor's theorem, so the theorem applies. When $K$ has a negative eigenvalue the equilibrium is unstable. When $K$ is only semi-definite, the quadratic approximation cannot decide and higher-order terms of $V$ settle the matter.

### Driven normal modes

Add a small applied force $\mathbf{F}\cos\Omega t$, meaning generalised forces $F_j\cos\Omega t$, so that the equations become $M\ddot{\boldsymbol\eta} + K\boldsymbol\eta = \mathbf{F}\cos\Omega t$. In normal coordinates the force on mode $r$ is $\mathbf{a}_r\T\mathbf{F}$, and each mode is a driven oscillator, $\ddot Q_r + \omega_r^2Q_r = (\mathbf{a}_r\T\mathbf{F})\cos\Omega t$. The steady response is

$$
\boldsymbol\eta(t) = \sum_r\frac{\mathbf{a}_r\,(\mathbf{a}_r\T\mathbf{F})}{\omega_r^2 - \Omega^2}\cos\Omega t.
$$ {#eq-driven}

The amplitude grows without bound as $\Omega$ approaches any normal frequency, unless $\mathbf{a}_r\T\mathbf{F} = 0$. A force that is orthogonal to a mode shape cannot excite that mode. Push the two blocks of [[#ex-two-masses]] in step, $\mathbf{F} = (F, F)$, and only the slow mode responds: there is no resonance at $\omega_2$, whatever the driving frequency. Push only block 1, $\mathbf{F} = (F, 0)$, and both modes resonate. With damping, the infinite peaks become the finite resonance curves of [[oscillations/resonance]], one for each mode.

::: quiz
Two identical blocks between walls, as in [[#ex-two-masses]], are driven by equal and opposite forces $\pm F\cos\Omega t$ on the two blocks. At which driving frequencies does the undamped response become unbounded?
- [ ] At both $\omega_1$ and $\omega_2$, because every mode resonates when it is driven at its frequency.
- [ ] Only at $\omega_1$, the lowest frequency.
- [x] Only at $\omega_2$.
- [ ] At neither, because opposite forces cancel.
::: solution
The force vector is $\mathbf{F} = (F, -F)$, proportional to the fast mode shape $(1, -1)$ and orthogonal to the slow one $(1, 1)$. So $\mathbf{a}_1\T\mathbf{F} = 0$ and only the fast mode is driven. By [[#eq-driven]] the response is unbounded only at $\Omega = \omega_2$. The forces cancel in their effect on the centre of mass, but not on the separation of the blocks.
:::
:::

## Symmetry, zero modes and molecules {#symmetry}

When a system has a symmetry, the mode shapes can usually be guessed, because a symmetry operation that commutes with both $M$ and $K$ maps each eigenspace to itself. For a single non-degenerate mode this means the mode shape is either unchanged or reversed by the symmetry.

::: example The linear carbon dioxide molecule {#ex-co2}
Model CO₂ as three masses on a line, an oxygen atom (mass $m$) on each side of a carbon atom (mass $M_C$), joined by two identical springs of stiffness $k$. Find the normal modes for motion along the line, and the predicted ratio of the two non-zero frequencies with $m = 16$ and $M_C = 12$ in atomic mass units.
::: solution
Let $x_1, x_2, x_3$ be the displacements of O, C, O. Then

$$
T = \tfrac12m\dot x_1^2 + \tfrac12M_C\dot x_2^2 + \tfrac12m\dot x_3^2, \qquad V = \tfrac12k(x_2 - x_1)^2 + \tfrac12k(x_3 - x_2)^2,
$$

$$
M = \begin{pmatrix}m&0&0\\0&M_C&0\\0&0&m\end{pmatrix}, \qquad K = k\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
$$

Reflection through the carbon atom, $x_1 \leftrightarrow -x_3$, $x_2 \to -x_2$, preserves $T$ and $V$, so each mode is either symmetric or antisymmetric under it. Try each type.

*Translation.* $\mathbf{a} = (1, 1, 1)$ gives $K\mathbf{a} = 0$, so $\omega = 0$. This zero mode is rigid motion of the whole molecule; $V$ does not change when every atom moves the same distance.

*Symmetric stretch.* $\mathbf{a} = (1, 0, -1)$: the carbon stays still and the oxygens move oppositely. Then $K\mathbf{a} = k(1, 0, -1)$ and $M\mathbf{a} = m(1, 0, -1)$, so $\omega^2 = k/m$.

*Antisymmetric stretch.* The third eigenvector must be $M$-orthogonal to both, so try $\mathbf{a} = (1, \beta, 1)$. $M$-orthogonality to $(1, 1, 1)$ gives $m + \beta M_C + m = 0$, so $\beta = -2m/M_C$: the carbon moves opposite to both oxygens, keeping the centre of mass fixed. The first row of $(K - \omega^2M)\mathbf{a} = 0$ gives $k(1 - \beta) = m\omega^2$, so

$$
\omega^2 = \frac{k}{m}\left(1 + \frac{2m}{M_C}\right).
$$

The predicted frequency ratio is

$$
\frac{\omega_{\mathrm{anti}}}{\omega_{\mathrm{sym}}} = \sqrt{1 + \frac{2m}{M_C}} = \sqrt{1 + \frac{32}{12}} = 1.915.
$$

The measured asymmetric stretch of CO₂ is at $2349\,\mathrm{cm^{-1}}$. The symmetric stretch is not infrared-active (it has no oscillating dipole moment) and in the Raman spectrum it is split by a resonance with an overtone of the bending mode into two lines at about $1285$ and $1388\,\mathrm{cm^{-1}}$, centred near $1337$. The measured ratio is about $1.76$. The spring model gets the ordering and the size of the effect right; the remaining discrepancy comes from the interaction between the two bonds, which a more complete model includes as an extra cross-term $k_{12}(x_2 - x_1)(x_3 - x_2)$ in $V$.
:::
:::

::: remark Degenerate modes
If two normal frequencies coincide, any combination of their mode shapes is again a mode, and the theorem only promises that *some* $M$-orthonormal basis of the eigenspace exists. CO₂ has two bending modes, perpendicular to the axis in two directions, with the same frequency by rotational symmetry; any direction of bending, or a circular "whirling" combination, is equally a normal mode. Degeneracy is almost always a sign of symmetry, and a small asymmetry splits it, as two slightly different pendulums split the common frequency of two identical ones.
:::

## A system with no shortcuts {#numerical}

Symmetry is a gift, and real systems often lack it. Consider three blocks of masses $1$, $2$ and $3\,\mathrm{kg}$ in a line between two walls, joined by four identical springs of stiffness $k = 100\,\mathrm{N/m}$. With displacements $x_1, x_2, x_3$,

$$
M = \begin{pmatrix}1&0&0\\0&2&0\\0&0&3\end{pmatrix}\mathrm{kg}, \qquad K = \begin{pmatrix}200&-100&0\\-100&200&-100\\0&-100&200\end{pmatrix}\mathrm{N/m}.
$$

The characteristic equation [[#eq-char]] is a cubic in $\omega^2$. The following listing finds its roots by bisection, computes each mode shape as the cross product of two rows of $K - \omega^2M$ (a vector orthogonal to both rows is in the null space of a rank-two $3\times 3$ matrix), normalises it with respect to $M$, and checks part (2) of [[#thm-gen-eig]].

```python
import math
# three masses between two walls, four equal springs k
m = [1.0, 2.0, 3.0]          # kg
k = 100.0                    # N/m
K = [[2*k, -k, 0], [-k, 2*k, -k], [0, -k, 2*k]]
M = [[m[0], 0, 0], [0, m[1], 0], [0, 0, m[2]]]

def det3(A):
    return (A[0][0]*(A[1][1]*A[2][2] - A[1][2]*A[2][1])
          - A[0][1]*(A[1][0]*A[2][2] - A[1][2]*A[2][0])
          + A[0][2]*(A[1][0]*A[2][1] - A[1][1]*A[2][0]))

def p(lam):                  # characteristic function det(K - lam M)
    return det3([[K[i][j] - lam*M[i][j] for j in range(3)] for i in range(3)])

def bisect(a, b):
    for _ in range(200):
        c = 0.5*(a + b)
        if p(a)*p(c) <= 0: b = c
        else: a = c
    return 0.5*(a + b)

# bracket the three roots by scanning
grid = [0.3 + 0.7*i for i in range(0, 1001)]
roots = [bisect(grid[i], grid[i+1]) for i in range(1000) if p(grid[i])*p(grid[i+1]) < 0]

modes = []
for lam in roots:
    A = [[K[i][j] - lam*M[i][j] for j in range(3)] for i in range(3)]
    r0, r1 = A[0], A[1]      # eigenvector is orthogonal to the rows: cross product
    v = [r0[1]*r1[2] - r0[2]*r1[1], r0[2]*r1[0] - r0[0]*r1[2], r0[0]*r1[1] - r0[1]*r1[0]]
    norm = math.sqrt(sum(m[i]*v[i]**2 for i in range(3)))     # M-normalise
    v = [x/norm for x in v]
    if v[0] < 0: v = [-x for x in v]
    modes.append(v)
    print("omega^2 = %8.3f  omega = %6.3f rad/s  f = %5.3f Hz  a = (%6.3f, %6.3f, %6.3f)"
          % (lam, math.sqrt(lam), math.sqrt(lam)/(2*math.pi), *v))

print("M-inner products a_r^T M a_s:")
for r in range(3):
    print("  ", ["%7.1e" % sum(m[i]*modes[r][i]*modes[s][i] for i in range(3)) for s in range(3)])
```

Output:

```
omega^2 =   27.924  omega =  5.284 rad/s  f = 0.841 Hz  a = ( 0.272,  0.468,  0.403)
omega^2 =  100.000  omega = 10.000 rad/s  f = 1.592 Hz  a = ( 0.408,  0.408, -0.408)
omega^2 =  238.743  omega = 15.451 rad/s  f = 2.459 Hz  a = ( 0.871, -0.338,  0.065)
M-inner products a_r^T M a_s:
   ['1.0e+00', '-5.6e-17', '8.3e-16']
   ['0.0e+00', '1.0e+00', '-1.3e-15']
   ['8.3e-16', '-1.3e-15', '1.0e+00']
```

::: example Reading and checking the numerical modes {#ex-numerical}
Interpret the three modes found by the listing, and verify the eigenvalues by hand.
::: solution
The middle eigenvalue is suspiciously round. Its mode shape is proportional to $(1, 1, -1)$, and indeed

$$
K\begin{pmatrix}1\\1\\-1\end{pmatrix} = \begin{pmatrix}200 - 100\\ -100 + 200 + 100\\ -100 - 200\end{pmatrix} = \begin{pmatrix}100\\200\\-300\end{pmatrix} = 100\,M\begin{pmatrix}1\\1\\-1\end{pmatrix},
$$

so $\omega^2 = 100\,\mathrm{s^{-2}}$ exactly. In this mode the first two blocks move together, so the spring between them is never stretched, and they move against the third. Dividing the cubic by $(\omega^2 - 100)$ leaves a quadratic whose coefficients follow from the trace and determinant of $M^{-1}K$: the sum of the three roots is $\operatorname{tr}(M^{-1}K) = 200 + 100 + 66.67 = 366.67$, and their product is $\det K/\det M = (4\times 10^6)/6 = 666\,667$. The other two roots therefore have sum $266.67$ and product $6666.7$:

$$
\omega^2 = \frac{266.67 \pm \sqrt{266.67^2 - 4(6666.7)}}{2} = \frac{266.67 \pm 210.82}{2} = 27.92 \text{ or } 238.74\,\mathrm{s^{-2}},
$$

agreeing with the listing.

The lowest mode, at $0.841\,\mathrm{Hz}$, has all three blocks moving the same way with the middle and heavy ones moving most: it is the "breathing" of the whole chain against the walls. The highest, at $2.459\,\mathrm{Hz}$, is dominated by the lightest block, which rattles between its neighbours, with the heavy block nearly still ($0.065$). That pattern is general: high-frequency modes concentrate on light masses and stiff springs. The off-diagonal $M$-inner products are of order $10^{-15}$, rounding error, as the theorem requires; the ordinary dot product of the first two mode shapes, $0.272(0.408) + 0.468(0.408) - 0.403(0.408) = 0.138$, is not zero.
:::
:::

For larger systems one never forms the characteristic polynomial, whose roots are badly conditioned. Library routines reduce the problem to a symmetric one, as in part (3) of the proof, and apply the QR or Jacobi algorithm; see [numerical linear algebra](/learn/maths/lesson.php?c=numerical-analysis&l=iterative-methods) in the Maths Atlas and [[computation/linear-algebra]].

::: application Molecules, solids and buildings
In infrared and Raman spectroscopy, every absorption line of a molecule's vibrational spectrum is a normal mode of exactly this kind, with $M$ the atomic masses and $K$ the curvature of the electronic energy. A nonlinear molecule with $N$ atoms has $3N - 6$ vibrational modes, the six zero modes being translations and rotations. In a crystal the same analysis with $10^{23}$ atoms gives phonons, whose frequencies determine the heat capacity in [[statistical-mechanics]]. Structural engineers compute the lowest normal modes of tall buildings and bridges, because a wind or earthquake that drives a structure near one of its normal frequencies drives it at resonance, as in [[oscillations/resonance]].
:::

::: history Normal modes from Lagrange to Rayleigh
Daniel Bernoulli argued in the 1750s that the motion of a vibrating string is a superposition of simple modes, a claim fiercely disputed by Euler and d'Alembert. Lagrange treated small oscillations of a general system in the *Mécanique analytique* (1788), reducing them to the determinant equation [[#eq-char]]; he wrongly believed that a repeated root must produce secular growth, an error corrected by Karl Weierstrass in 1858, who proved that the roots are real and that equal roots do no harm when $T$ is positive definite. Lord Rayleigh's *The Theory of Sound* (1877) made the method the standard tool of acoustics and introduced the variational estimate of frequencies explored in [[#exr-rayleigh]].
:::

## Where this leads {#leads}

The same eigenproblem governs the principal axes of [[analytical-mechanics/rigid-bodies]], and its continuum limit, with $M$ and $K$ becoming differential operators, gives the standing waves of [[oscillations/travelling-waves]] and the Sturm–Liouville theory of [[math-methods/odes]]. In [[quantum-1/harmonic-oscillator]] each normal coordinate becomes a quantum oscillator with levels $\hbar\omega_r(n_r + \frac12)$. Small oscillations are also the gateway to [[analytical-mechanics/chaos]]: linearisation tells you what happens near an equilibrium, and the interesting question is what happens when the amplitude is no longer small.

::: summary
- Equilibria satisfy $\partial V/\partial q_j = 0$. Near one, expand $T$ and $V$ to second order to get $L_2 = \frac12\dot{\boldsymbol\eta}\T M\dot{\boldsymbol\eta} - \frac12\boldsymbol\eta\T K\boldsymbol\eta$ and $M\ddot{\boldsymbol\eta} + K\boldsymbol\eta = 0$.
- Normal modes $\boldsymbol\eta = \mathbf{a}\cos(\omega t - \delta)$ solve the generalised eigenproblem $K\mathbf{a} = \omega^2M\mathbf{a}$, with frequencies from $\det(K - \omega^2M) = 0$.
- For symmetric $K$ and positive-definite $M$, all $\omega^2$ are real, there are $n$ independent mode shapes, and they can be chosen $M$-orthonormal. Positive-definite $K$ gives real frequencies and a stable equilibrium.
- In normal coordinates the system is $n$ independent oscillators; the general motion is a superposition, with amplitudes from $Q_r(0) = \mathbf{a}_r\T M\boldsymbol\eta(0)$.
- A strict minimum of $V$ is stable for the full nonlinear motion (Lagrange–Dirichlet). Zero modes come from continuous symmetries; negative $\omega^2$ means instability.
- A periodic force drives mode $r$ in proportion to $\mathbf{a}_r\T\mathbf{F}$; it resonates at $\omega_r$ unless the force is orthogonal to that mode.
- Symmetry predicts mode shapes; without symmetry, solve numerically, and check with trace and determinant.
- Weakly coupled identical oscillators beat, exchanging energy in a time $\pi/(\omega_2 - \omega_1)$.
:::

## Exercises {#exercises}

::: exercise Two masses, three equal springs {level=1 check="sqrt(300)"}
In [[#ex-two-masses]] take $m = 0.500\,\mathrm{kg}$ and $k = k' = 50.0\,\mathrm{N/m}$. Find both normal frequencies and give the higher one in $\mathrm{rad/s}$.
::: solution
$\omega_1 = \sqrt{k/m} = \sqrt{100} = 10.0\,\mathrm{rad/s}$ and $\omega_2 = \sqrt{(k + 2k')/m} = \sqrt{150/0.500} = \sqrt{300} = 17.3\,\mathrm{rad/s}$. The ratio is $\sqrt3$, independent of $m$ and $k$, whenever all three springs are equal.
:::
:::

::: exercise The bead on the spinning hoop {level=1 check="10*sqrt(1-0.49^2)"}
For the bead of [[analytical-mechanics/constraints#ex-hoop]], with $R = 0.200\,\mathrm{m}$ and $\omega = 10.0\,\mathrm{rad/s}$, show that the angular frequency of small oscillations about the off-axis equilibrium $\theta_0$ is $\omega\sin\theta_0$, and evaluate it.
::: solution
The equation of motion is $\ddot\theta = G(\theta) = \sin\theta(\omega^2\cos\theta - g/R)$. At $\theta_0$, $\omega^2\cos\theta_0 = g/R$. Linearise, $\theta = \theta_0 + \eta$: $\ddot\eta = G'(\theta_0)\eta$ with

$$
G'(\theta) = \cos\theta\left(\omega^2\cos\theta - \frac gR\right) - \omega^2\sin^2\theta, \qquad G'(\theta_0) = -\omega^2\sin^2\theta_0.
$$

So the oscillation frequency is $\Omega = \omega\sin\theta_0$. With $\cos\theta_0 = 0.490$, $\Omega = 10.0\sqrt{1 - 0.490^2} = 8.72\,\mathrm{rad/s}$. As $\omega$ approaches the critical $7.00\,\mathrm{rad/s}$ from above, $\theta_0 \to 0$ and $\Omega \to 0$: the well flattens at the bifurcation.
:::
:::

::: exercise Frequency ratio of the double pendulum {level=1 check="1+sqrt(2)"}
Show that the ratio of the two normal frequencies of the equal double pendulum in [[#ex-double-pendulum]] is $1 + \sqrt2$.
::: solution
$\omega_2^2/\omega_1^2 = (2 + \sqrt2)/(2 - \sqrt2)$. Multiply numerator and denominator by $2 + \sqrt2$: $(2 + \sqrt2)^2/(4 - 2) = (6 + 4\sqrt2)/2 = 3 + 2\sqrt2 = (1 + \sqrt2)^2$. So $\omega_2/\omega_1 = 1 + \sqrt2 = 2.414$. The ratio is irrational, so a general small motion of the double pendulum never exactly repeats, although it is perfectly regular.
:::
:::

::: exercise Coupled pendulums {level=2 check="pi/(sqrt(10)-sqrt(9.8))"}
Two identical pendulums with $g/\ell = 9.80\,\mathrm{s^{-2}}$ are joined by a weak spring with $k/m = 0.100\,\mathrm{s^{-2}}$, attached at the bobs. Find the two normal frequencies for small oscillations and the time, in seconds, for the energy to pass completely from one pendulum to the other.
::: solution
With bob displacements $x_1 = \ell\phi_1$ and $x_2 = \ell\phi_2$, the potential is $\frac12(mg/\ell)(x_1^2 + x_2^2) + \frac12k(x_2 - x_1)^2$ to second order, which is [[#ex-two-masses]] with $k$ replaced by $mg/\ell$ and $k'$ by $k$. So $\omega_1^2 = g/\ell = 9.80$ and $\omega_2^2 = g/\ell + 2k/m = 10.0\,\mathrm{s^{-2}}$, giving $\omega_1 = 3.130$ and $\omega_2 = 3.162\,\mathrm{rad/s}$. The complete transfer time is

$$
t = \frac{\pi}{\omega_2 - \omega_1} = \frac{\pi}{\sqrt{10.0} - \sqrt{9.80}} = 98.8\,\mathrm{s},
$$

about $49$ swings. A spring only $1\%$ as stiff as the gravitational restoring force still moves all the energy, given time.
:::
:::

::: exercise The CO₂ frequency ratio {level=2 check="sqrt(1+2*16/12)"}
Derive the CO₂ frequency ratio of [[#ex-co2]] again, this time by writing the antisymmetric stretch with the centre of mass fixed and using energy: show that the effective mass of the mode is $m\,M_C/(2m + M_C)$ for the stretch of each bond. Evaluate the ratio.
::: solution
In the antisymmetric mode, $x_1 = x_3 = a$ and $x_2 = -2ma/M_C$. Each bond stretches by $x_2 - x_1 = -a(1 + 2m/M_C)$ or $x_3 - x_2 = a(1 + 2m/M_C)$; write $s = a(1 + 2m/M_C)$. The potential energy is $V = ks^2$. The kinetic energy is

$$
T = \tfrac12\left(2m + M_C\frac{4m^2}{M_C^2}\right)\dot a^2 = m\left(1 + \frac{2m}{M_C}\right)\dot a^2 = \frac{m}{1 + 2m/M_C}\dot s^2.
$$

With $T = \frac12\mu_{\mathrm{eff}}\cdot 2\dot s^2$ and $V = \frac12k\cdot 2s^2$, $\omega^2 = k/\mu_{\mathrm{eff}}$ with $\mu_{\mathrm{eff}} = m/(1 + 2m/M_C) = mM_C/(2m + M_C)$. The symmetric stretch has $\mu_{\mathrm{eff}} = m$, so the ratio is $\sqrt{(2m + M_C)/M_C} = \sqrt{1 + 2m/M_C} = \sqrt{1 + 32/12} = 1.915$.
:::
:::

::: exercise Beads on a string {level=2 check="2*sin(pi/8)"}
Three equal masses $m$ are spaced along a light string, with equal springs of stiffness $k$ between neighbours and from the end masses to fixed walls (four springs). Show that the normal frequencies are $\omega_n = 2\sqrt{k/m}\sin(n\pi/8)$ for $n = 1, 2, 3$, and give the lowest one for $k/m = 1\,\mathrm{s^{-2}}$.
::: hint
Try mode shapes $a_j = \sin(jn\pi/4)$, $j = 1, 2, 3$, and use $\sin(\alpha + \beta) + \sin(\alpha - \beta) = 2\sin\alpha\cos\beta$.
:::
::: solution
Here $M = m\mathbb 1$ and $K = k\begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}$. The $j$-th row of $K\mathbf{a}$ is $k(2a_j - a_{j-1} - a_{j+1})$, with $a_0 = a_4 = 0$ standing for the walls. With $a_j = \sin(jn\pi/4)$, the boundary values $a_0 = \sin 0 = 0$ and $a_4 = \sin(n\pi) = 0$ hold automatically, and

$$
a_{j-1} + a_{j+1} = 2\sin\frac{jn\pi}{4}\cos\frac{n\pi}{4} = 2a_j\cos\frac{n\pi}{4}.
$$

So $(K\mathbf{a})_j = 2k(1 - \cos(n\pi/4))a_j = 4k\sin^2(n\pi/8)a_j$, and $\omega_n^2 = (4k/m)\sin^2(n\pi/8)$. For $k/m = 1$ the frequencies are $2\sin(\pi/8) = 0.765$, $2\sin(\pi/4) = 1.414$ and $2\sin(3\pi/8) = 1.848\,\mathrm{rad/s}$. The mode shapes are samples of the standing waves $\sin(n\pi x/L)$ of a continuous string, and as the number of beads grows the frequencies approach those of the string.
:::
:::

::: exercise Rayleigh's principle {level=3 #exr-rayleigh}
For $M$ positive definite and $K$ symmetric, define the **Rayleigh quotient** $R(\mathbf{v}) = \mathbf{v}\T K\mathbf{v}/\mathbf{v}\T M\mathbf{v}$ for $\mathbf{v} \neq 0$. Prove that the smallest eigenvalue satisfies $\omega_1^2 = \min_{\mathbf{v}}R(\mathbf{v})$. Then estimate the lowest frequency of the three-block system of [[#numerical]] using the trial vector $(1, 1, 1)$, and compare with the listing.
::: solution
Expand $\mathbf{v} = \sum_rc_r\mathbf{a}_r$ in the $M$-orthonormal eigenbasis of [[#thm-gen-eig]]. Then $\mathbf{v}\T M\mathbf{v} = \sum_rc_r^2$ and $\mathbf{v}\T K\mathbf{v} = \sum_r\lambda_rc_r^2$, so

$$
R(\mathbf{v}) = \frac{\sum_r\lambda_rc_r^2}{\sum_rc_r^2} \ge \frac{\sum_r\lambda_1c_r^2}{\sum_rc_r^2} = \lambda_1,
$$

with equality when $\mathbf{v} = \mathbf{a}_1$. Hence $\lambda_1 = \min R$. An error of order $\eps$ in the trial vector gives an error of order $\eps^2$ in $R$, because $R$ is stationary at an eigenvector, which is why crude guesses give good frequencies.

With $\mathbf{v} = (1, 1, 1)$, $\mathbf{v}\T K\mathbf{v}$ is the sum of all the entries of $K$, which is $3\times 200 - 4\times 100 = 200\,\mathrm{N/m}$, and $\mathbf{v}\T M\mathbf{v} = 6\,\mathrm{kg}$. So $R = 33.3\,\mathrm{s^{-2}}$ and the estimate is $\omega_1 \le \sqrt{33.3} = 5.77\,\mathrm{rad/s}$, against the exact $5.284\,\mathrm{rad/s}$ from the listing. The upper bound is $9\%$ high. A trial vector closer to the true shape $(0.272, 0.468, 0.403)$, such as $(0.7, 1, 0.85)$, gives $R = 28.4\,\mathrm{s^{-2}}$ and $\omega \le 5.33\,\mathrm{rad/s}$, within $1\%$.
:::
:::

::: exercise Zero modes and conservation of momentum {level=3}
Let a system of particles on a line have potential energy $V(x_1, \dots, x_n)$ that is unchanged when every $x_j$ is shifted by the same amount. Prove that $K\mathbf{u} = 0$ for $\mathbf{u} = (1, \dots, 1)$, so that there is a zero mode. Show that every other normal mode has zero total momentum, and that the normal coordinate of the zero mode is proportional to the centre-of-mass displacement.
::: solution
Translation invariance means $V(\mathbf{x} + s\mathbf{u}) = V(\mathbf{x})$ for all $s$. Differentiate with respect to $s$ at $s = 0$: $\sum_j\partial V/\partial x_j = 0$ for every $\mathbf{x}$. Differentiate this identity with respect to $x_k$ and evaluate at the equilibrium: $\sum_jK_{kj} = 0$ for each $k$, which says $K\mathbf{u} = 0$. So $\mathbf{u}$ is an eigenvector with $\omega^2 = 0$.

By part (2) of [[#thm-gen-eig]], every mode $\mathbf{a}_r$ with $\omega_r \neq 0$ is $M$-orthogonal to $\mathbf{u}$. Here $M = \mathrm{diag}(m_1, \dots, m_n)$, so $\mathbf{u}\T M\mathbf{a}_r = \sum_jm_ja_{rj} = 0$: in that mode the mass-weighted displacements sum to zero, so the centre of mass does not move and the total momentum $\sum_jm_j\dot\eta_j = \dot Q_r\sum_jm_ja_{rj}$ vanishes. The normalised zero mode is $\mathbf{a}_0 = \mathbf{u}/\sqrt{M_{\mathrm{tot}}}$, and its normal coordinate is $Q_0 = \mathbf{a}_0\T M\boldsymbol\eta = \sum_jm_j\eta_j/\sqrt{M_{\mathrm{tot}}} = \sqrt{M_{\mathrm{tot}}}\,X_{\mathrm{cm}}$, proportional to the centre-of-mass displacement. Its equation $\ddot Q_0 = 0$ is conservation of total momentum, the Noether charge of [[analytical-mechanics/lagrangian#thm-noether]] for translations. This is the general version of the translation mode of CO₂.
:::
:::
