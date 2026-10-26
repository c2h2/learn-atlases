The previous lesson built difference schemes whose truncation errors vanish as the grid is refined. That is not enough. In [[computational-fluid-dynamics/finite-differences#ex-ftcs]] the explicit heat-equation scheme behaved well with diffusion number $d = 0.2$; run it with $d = 0.6$ and within a few dozen steps the temperatures are oscillating between millions of degrees above and below zero, though the formula is exactly as "accurate" as before. The forward-time, centred-space scheme for advection has second-order spatial accuracy and blows up for *every* time step. What goes wrong is **stability**: the scheme amplifies the errors it inevitably commits, rather than keeping them bounded.

This lesson makes the three ideas precise — **consistency** (the scheme approximates the right equation), **stability** (errors do not grow without bound) and **convergence** (the numerical solution tends to the exact one as the grid is refined) — and connects them through the Lax equivalence theorem. It then gives the two practical tools every CFD engineer uses daily: **von Neumann analysis**, which yields stability limits by studying how a scheme treats a single Fourier mode, and the **Courant–Friedrichs–Lewy (CFL) condition**, which states in one line why explicit schemes for convection need small time steps. Finally, the **modified equation** shows what an accurate-looking but imperfect scheme actually computes: the right equation plus artificial diffusion or dispersion. The model problems and notation are those of [[computational-fluid-dynamics/finite-differences]].

## Consistency, stability, convergence

Write a linear two-level scheme for a linear problem, with all grid values at time level $n$ collected into a vector $\mathbf{u}^n$, as
$$
\mathbf{u}^{n+1} = \mathbf{Q}\,\mathbf{u}^n + \Delta t\,\mathbf{f}^n ,
$$ {#eq-two-level}
where $\mathbf{Q}$ (the **iteration** or **amplification matrix**) depends on $\Delta x$ and $\Delta t$, and $\mathbf{f}^n$ collects sources and boundary data. For FTCS on the heat equation, $\mathbf{Q}$ is tridiagonal with $d$, $1 - 2d$, $d$ on its three diagonals.

::: definition Consistency, stability and convergence {#def-csc}
Let the grid be refined with $\Delta t$ and $\Delta x$ tied together by a fixed rule (constant $d$ or constant Courant number, for example).
- The scheme is **consistent** if, when the exact solution $\mathbf{u}_{\text{ex}}^n$ is inserted, $\mathbf{u}_{\text{ex}}^{n+1} = \mathbf{Q}\mathbf{u}_{\text{ex}}^n + \Delta t\,\mathbf{f}^n + \Delta t\,\boldsymbol{\tau}^n$ with a **local truncation error** $\boldsymbol{\tau}^n \to \mathbf{0}$ as $\Delta t, \Delta x \to 0$.
- The scheme is **stable** if there is a constant $K$, independent of $\Delta t$ and $\Delta x$, such that $\lVert\mathbf{Q}^m\rVert \le K$ for all $m$ with $m\,\Delta t \le T$, the final time.
- The scheme is **convergent** if the error $\mathbf{e}^n = \mathbf{u}^n - \mathbf{u}_{\text{ex}}^n$ satisfies $\lVert\mathbf{e}^n\rVert \to 0$ as the grid is refined, for every fixed time $t^n \le T$ and every admissible initial condition.
:::

Consistency is a local property and easy to check by Taylor series. Convergence is what we want but cannot check directly — we do not know the exact solution. Stability is the bridge.

::: theorem Lax equivalence theorem {#thm-lax}
For a well-posed linear initial-value problem and a consistent linear finite-difference scheme, stability is necessary and sufficient for convergence. Moreover, if the truncation error is $O(\Delta t^q + \Delta x^p)$, the global error of a stable scheme is of the same order.
:::

::: proof
We prove sufficiency, the part used in practice. Subtract the consistency relation from [[#eq-two-level]]: the error obeys $\mathbf{e}^{n+1} = \mathbf{Q}\mathbf{e}^n - \Delta t\,\boldsymbol{\tau}^n$. Unrolling the recursion from $\mathbf{e}^0$,
$$
\mathbf{e}^n = \mathbf{Q}^n\mathbf{e}^0 - \Delta t\sum_{m=0}^{n-1}\mathbf{Q}^{\,n-1-m}\boldsymbol{\tau}^m .
$$
Take norms and use stability, $\lVert\mathbf{Q}^j\rVert \le K$ for $j\Delta t \le T$:
$$
\lVert\mathbf{e}^n\rVert \le K\lVert\mathbf{e}^0\rVert + K\,n\Delta t\,\max_m\lVert\boldsymbol{\tau}^m\rVert \le K\lVert\mathbf{e}^0\rVert + K\,T\,\max_m\lVert\boldsymbol{\tau}^m\rVert .
$$
The initial error $\mathbf{e}^0$ is zero (or as small as the representation of the initial data), and consistency makes $\max\lVert\boldsymbol{\tau}^m\rVert \to 0$; hence $\lVert\mathbf{e}^n\rVert \to 0$, and at the same rate as $\boldsymbol{\tau}$. The essential point is that the $n \sim T/\Delta t$ local errors, each of size $\Delta t\,\tau$, *add* but are not *amplified*: that is exactly what stability guarantees. The necessity of stability (a convergent scheme must be stable) uses the uniform boundedness principle of functional analysis and is proved in Richtmyer and Morton's *Difference Methods for Initial-Value Problems*; it is not needed here.
:::

The theorem is the reason CFD practitioners talk about stability so much: consistency is easy to arrange, so stability is what separates a working scheme from a useless one. Strictly it applies to linear problems; for the nonlinear Navier–Stokes equations it is applied to the linearised, "frozen-coefficient" equations, which is a heuristic — but one that works remarkably well in practice.

## Von Neumann stability analysis

How can one bound $\lVert\mathbf{Q}^m\rVert$ without computing matrix powers? For constant-coefficient linear schemes on a periodic (or very large) domain, Fourier analysis diagonalises the problem. Every grid function is a sum of Fourier modes $e^{\mathrm{i}k x_j}$, and because the scheme has the same coefficients at every node, each mode evolves independently: in one step it is multiplied by a complex number $G$, the **amplification factor**. Errors are grid functions too, so a scheme is stable if no mode can grow.

::: algorithm Von Neumann analysis {#alg-von-neumann}
1. Write the scheme for the error (equivalently, the homogeneous scheme with sources and boundary data removed).
2. Substitute a single Fourier mode $u_j^n = G^n e^{\mathrm{i}j\theta}$, where $\theta = k\Delta x \in [-\pi, \pi]$ is the phase angle per grid interval and $G^n$ means $G$ to the power $n$.
3. Divide by the common factor $G^n e^{\mathrm{i}j\theta}$ and solve for $G(\theta)$, using $e^{\mathrm{i}\theta} + e^{-\mathrm{i}\theta} = 2\cos\theta$ and $1 - \cos\theta = 2\sin^2(\theta/2)$.
4. The scheme is stable if $\lvert G(\theta)\rvert \le 1$ for every $\theta$ (allowing $\lvert G\rvert \le 1 + O(\Delta t)$ when the exact solution itself may grow). Find the parameter values for which this holds.
:::

For a single equation with two time levels the condition is necessary and sufficient on a periodic domain. With boundaries, it remains a necessary condition and in practice almost always the decisive one; boundary schemes can cause additional instabilities, which are studied by other methods (GKS theory) beyond this course.

::: proposition Stability of the heat-equation schemes {#prop-heat-stability}
For $T_t = \alpha T_{xx}$ with $d = \alpha\Delta t/\Delta x^2$ and $s = \sin^2(\theta/2)$:
$$
G_{\text{FTCS}} = 1 - 4ds,\qquad
G_{\text{BTCS}} = \frac{1}{1 + 4ds},\qquad
G_{\text{CN}} = \frac{1 - 2ds}{1 + 2ds}.
$$
FTCS is stable if and only if $d \le \tfrac12$; BTCS and Crank–Nicolson are stable for all $d > 0$ (**unconditionally stable**).
:::

::: proof
FTCS: substituting $T_j^n = G^n e^{\mathrm{i}j\theta}$ into $T_j^{n+1} = T_j^n + d(T_{j+1}^n - 2T_j^n + T_{j-1}^n)$ and dividing gives $G = 1 + d(e^{\mathrm{i}\theta} - 2 + e^{-\mathrm{i}\theta}) = 1 + 2d(\cos\theta - 1) = 1 - 4ds$. $G$ is real and $\le 1$; the condition $G \ge -1$ at the worst mode, $\theta = \pi$ ($s = 1$), gives $1 - 4d \ge -1$, i.e. $d \le \tfrac12$. BTCS: the same substitution into $-dT_{j-1}^{n+1} + (1 + 2d)T_j^{n+1} - dT_{j+1}^{n+1} = T_j^n$ gives $G(1 + 2d - 2d\cos\theta) = 1$, so $G = 1/(1 + 4ds) \in (0, 1]$ for all $d$. Crank–Nicolson: $G(1 + 2ds) = 1 - 2ds$; since $2ds \ge 0$, $\lvert 1 - 2ds\rvert \le 1 + 2ds$, so $\lvert G\rvert \le 1$ for all $d$.
:::

The physical meaning of $d \le \tfrac12$ is the positivity seen in [[computational-fluid-dynamics/finite-differences#ex-ftcs]]: FTCS writes $T_j^{n+1} = dT_{j-1}^n + (1 - 2d)T_j^n + dT_{j+1}^n$, and when $1 - 2d < 0$ a hot node becomes *colder* than its cold neighbours in one step. The exact factor for a mode over one step is $e^{-\alpha k^2\Delta t} = e^{-d\theta^2}$, always between $0$ and $1$. Crank–Nicolson is stable at large $d$, but its $G \to -1$ for the shortest waves: they are not damped, they flip sign every step. That is the source of the slowly decaying oscillations seen when Crank–Nicolson is started from a discontinuous initial condition with a large time step.

::: example Crank–Nicolson with a large time step {#ex-cn-large}
A transient conduction problem is advanced by Crank–Nicolson with $d = 5$. Compute the amplification factor of the sawtooth mode ($\theta = \pi$) and of a smooth mode with $\theta = 0.1$, compare each with the exact one-step decay factor $e^{-d\theta^2}$, and describe what is seen if the initial temperature field contains a sharp step.
::: solution
For $\theta = \pi$, $s = \sin^2(\pi/2) = 1$ and $G = (1 - 10)/(1 + 10) = -0.818$, while the exact factor is $e^{-5\pi^2} \approx 4\times10^{-22}$. For $\theta = 0.1$, $s = \sin^2 0.05 = 2.498\times10^{-3}$, $2ds = 0.02498$ and $G = 0.97502/1.02498 = 0.95126$, against the exact $e^{-0.05} = 0.95123$.

The smooth mode is reproduced to five significant figures; the sawtooth, which physically disappears at once, is only reduced by $18\,\%$ per step and changes sign each step. A sharp step contains a strong grid-scale component, so the solution shows a node-to-node oscillation near the step that takes $\ln(0.01)/\ln(0.818) \approx 23$ steps to decay to $1\,\%$. Stable — but visibly wrong for those steps. Sanity check: as $d \to \infty$, $G(\pi) \to -1$, so the larger the time step, the more persistent the oscillation.
:::
:::

::: widget plot
f: abs(1 - 4*d*sin(x/2)^2); 1/(1 + 4*d*sin(x/2)^2); abs((1 - 2*d*sin(x/2)^2)/(1 + 2*d*sin(x/2)^2)); exp(-d*x^2)
x: 0, pi
y: 0, 2
sliders: d=0.4:0.05:3:0.05
labels: |G|\ \text{FTCS}; |G|\ \text{BTCS}; |G|\ \text{Crank–Nicolson}; \text{exact } e^{-d\theta^2}
hlines: 1
caption: Amplification factor magnitudes for the heat equation against phase angle $\theta = k\Delta x$, with the diffusion number $d$ on the slider. Push $d$ past $0.5$ and the FTCS curve rises above $1$ at the right-hand end: the sawtooth mode $\theta = \pi$ is amplified and the scheme blows up. BTCS always damps, more strongly than the exact solution at small $d$ for long waves. At large $d$ notice that Crank–Nicolson's $|G|$ returns towards $1$ at high $\theta$ while the exact factor is essentially zero: the shortest waves survive almost undamped.
:::

::: proposition Stability of upwind and centred schemes for advection {#prop-advection-stability}
For $u_t + a u_x = 0$, $a > 0$, with Courant number $C = a\Delta t/\Delta x$:
$$
\begin{aligned}
\text{FTCS:}\quad & G = 1 - \mathrm{i}C\sin\theta, & \lvert G\rvert^2 &= 1 + C^2\sin^2\theta ,\\
\text{upwind (FTBS):}\quad & G = 1 - C\left(1 - e^{-\mathrm{i}\theta}\right), & \lvert G\rvert^2 &= 1 - 2C(1 - C)(1 - \cos\theta).
\end{aligned}
$$
FTCS is unstable for every $C > 0$; upwind is stable if and only if $0 \le C \le 1$.
:::

::: proof
For FTCS, $u_j^{n+1} = u_j^n - \tfrac{C}{2}(u_{j+1}^n - u_{j-1}^n)$ gives $G = 1 - \tfrac{C}{2}(e^{\mathrm{i}\theta} - e^{-\mathrm{i}\theta}) = 1 - \mathrm{i}C\sin\theta$, whose modulus squared exceeds $1$ for every $\theta$ that is not a multiple of $\pi$. For upwind, $G = 1 - C + Ce^{-\mathrm{i}\theta}$ and
$$
\lvert G\rvert^2 = (1 - C + C\cos\theta)^2 + C^2\sin^2\theta = (1-C)^2 + 2C(1-C)\cos\theta + C^2 = 1 - 2C(1-C)(1 - \cos\theta),
$$
using $(1-C)^2 + C^2 = 1 - 2C(1-C)$. Since $1 - \cos\theta \in [0, 2]$, $\lvert G\rvert \le 1$ for all $\theta$ if and only if $C(1-C) \ge 0$, i.e. $0 \le C \le 1$.
:::

The FTCS instability for advection is worth a moment of thought: the factor $1 + C^2\sin^2\theta$ exceeds $1$ only by $O(\Delta t^2)$ per step, so the growth over a fixed time $T$ is like $(1 + C^2)^{T/(2\Delta t)}$ — unbounded as $\Delta t \to 0$ with $C$ fixed. A scheme that is "nearly stable" is unstable.

::: example Explicit conduction time steps {#ex-conduction-dt}
An aluminium component ($\alpha = 9.7\times10^{-5}\ \mathrm{m^2/s}$) is modelled with FTCS on a uniform grid with $\Delta x = 1.0\ \mathrm{mm}$. Find the largest stable time step in one and in two dimensions (with $\Delta y = \Delta x$).
::: solution
One dimension: $\Delta t \le \Delta x^2/(2\alpha) = (1.0\times10^{-3})^2/(2 \times 9.7\times10^{-5}) = 5.15\times10^{-3}\ \mathrm{s}$.

Two dimensions: substituting $T_{j,l}^n = G^n e^{\mathrm{i}(j\theta_x + l\theta_y)}$ gives $G = 1 - 4d_x\sin^2(\theta_x/2) - 4d_y\sin^2(\theta_y/2)$; the worst mode is the checkerboard $\theta_x = \theta_y = \pi$, so $1 - 4d_x - 4d_y \ge -1$, i.e. $d_x + d_y \le \tfrac12$. With $\Delta x = \Delta y$, $\Delta t \le \Delta x^2/(4\alpha) = 2.58\times10^{-3}\ \mathrm{s}$; in three dimensions $\Delta x^2/(6\alpha)$.

Sanity check: aluminium has a high diffusivity, so millisecond steps for millimetre cells are reasonable — heat crosses a millimetre in about $\Delta x^2/\alpha \approx 10\ \mathrm{ms}$. Each extra dimension tightens the limit because the checkerboard mode has more neighbours to exchange heat with.
:::
:::

## The CFL condition

Von Neumann analysis gives exact limits for model problems. The CFL condition gives a necessary limit for *any* explicit scheme for a hyperbolic equation, from a geometric argument requiring no algebra.

::: definition Domains of dependence {#def-domain-dependence}
The **physical domain of dependence** of a point $(x_j, t^n)$ is the set of initial points whose data affect the exact solution there; for $u_t + au_x = 0$ it is the single point $x_j - at^n$, and for the wave equation with speed $c$ it is the interval $[x_j - ct^n, x_j + ct^n]$. The **numerical domain of dependence** is the set of initial grid points whose values enter the computation of $u_j^n$. For an explicit scheme whose stencil reaches $r$ points left and right, it is $[x_j - r\,n\Delta x,\ x_j + r\,n\Delta x]$.
:::

::: theorem The Courant–Friedrichs–Lewy condition {#thm-cfl}
A necessary condition for the convergence of a difference scheme for a hyperbolic equation is that its numerical domain of dependence contain the physical domain of dependence in the limit of grid refinement. For an explicit three-point scheme for $u_t + au_x = 0$ this requires
$$
C = \frac{\lvert a\rvert\,\Delta t}{\Delta x} \le 1 .
$$ {#eq-cfl}
:::

::: proof
Suppose that, as the grid is refined, the physical domain of dependence of a point $(x, t)$ contains a point $x_0$ lying outside the numerical domain of dependence. Change the initial data in a small neighbourhood of $x_0$ that stays outside the numerical domain. The exact solution at $(x, t)$ changes, because $x_0$ is in its domain of dependence; the numerical solution at $(x, t)$ does not, because none of the grid values it uses has changed. Both the original and the modified initial data cannot then give convergence to their respective exact solutions, so the scheme does not converge for all data. For a three-point explicit stencil the numerical domain after $n$ steps reaches $n\Delta x$ to either side, while the physical one lies at distance $\lvert a\rvert n\Delta t$; containment requires $\lvert a\rvert\Delta t \le \Delta x$.
:::

The CFL condition says, in words: *in one time step, information must not travel further than the stencil can see.* It is necessary but not sufficient — FTCS for advection satisfies it for $C \le 1$ and is still unstable — but it explains why every explicit compressible-flow code limits its time step by $\Delta t \le C_{\max}\,\Delta x/(\lvert u\rvert + c)$, where $c$ is the speed of sound: the fastest characteristic of [[computational-fluid-dynamics/governing-equations#prop-euler-speeds]] sets the limit. Implicit schemes couple all nodes at the new time level, their numerical domain of dependence is the whole grid, and the CFL condition places no restriction on them (accuracy still does).

::: example Time step for an explicit compressible solver {#ex-cfl-dt}
An explicit solver computes the flow of air at $u = 20\ \mathrm{m/s}$ and $T = 300\ \mathrm{K}$ (speed of sound $c = 347\ \mathrm{m/s}$) on a mesh whose smallest cell is $\Delta x = 2.0\ \mathrm{mm}$. Find the time-step limit for a scheme with $C_{\max} = 1$ if (a) only convection at the flow speed mattered and (b) acoustic waves are resolved, and comment.
::: solution
(a) $\Delta t \le \Delta x/\lvert u\rvert = 2.0\times10^{-3}/20 = 1.0\times10^{-4}\ \mathrm{s}$.
(b) $\Delta t \le \Delta x/(\lvert u\rvert + c) = 2.0\times10^{-3}/367 = 5.4\times10^{-6}\ \mathrm{s}$.
The acoustic limit is $18$ times smaller. At this low Mach number ($0.058$) the sound waves are physically unimportant, yet an explicit compressible scheme must resolve them: this "low-Mach stiffness" is why low-speed flows are usually computed with incompressible (pressure-based) solvers, [[computational-fluid-dynamics/pressure-velocity]], or with implicit and preconditioned compressible solvers. Sanity check: $\Delta x/c$ is the time sound takes to cross one cell, about $6\ \mu\mathrm{s}$ for $2\ \mathrm{mm}$.
:::
:::

## What a scheme really solves: the modified equation

A stable, consistent scheme converges — but on a finite grid, how does it err? The **modified equation** answers by finding the PDE that the numerical solution satisfies *more* accurately than the original one. Its extra terms are the scheme's personality.

::: proposition Modified equations for upwind and Lax–Wendroff {#prop-modified}
For $u_t + au_x = 0$ with $a > 0$ and $C = a\Delta t/\Delta x$, the first-order upwind scheme satisfies, to leading order,
$$
u_t + a u_x = \nu_{\text{num}}\,u_{xx},\qquad \nu_{\text{num}} = \frac{a\Delta x}{2}(1 - C),
$$ {#eq-modified-upwind}
and the second-order Lax–Wendroff scheme $u_j^{n+1} = u_j^n - \tfrac{C}{2}(u_{j+1}^n - u_{j-1}^n) + \tfrac{C^2}{2}(u_{j+1}^n - 2u_j^n + u_{j-1}^n)$ satisfies
$$
u_t + a u_x = -\frac{a\Delta x^2}{6}(1 - C^2)\,u_{xxx}.
$$ {#eq-modified-lw}
:::

::: proof
For upwind, insert a smooth function into $(u_j^{n+1} - u_j^n)/\Delta t + a(u_j^n - u_{j-1}^n)/\Delta x = 0$ and expand about $(x_j, t^n)$:
$$
u_t + \frac{\Delta t}{2}u_{tt} + a u_x - \frac{a\Delta x}{2}u_{xx} + O(\Delta t^2, \Delta x^2) = 0 .
$$
To eliminate $u_{tt}$, differentiate this relation: to leading order $u_t = -au_x$, so $u_{tt} = -a u_{xt} = a^2 u_{xx}$ (with errors that are one order smaller). Substituting,
$$
u_t + a u_x = \left(\frac{a\Delta x}{2} - \frac{a^2\Delta t}{2}\right)u_{xx} + \cdots = \frac{a\Delta x}{2}(1 - C)\,u_{xx} + \cdots .
$$
For Lax–Wendroff the same procedure, carried one order further (the scheme was built so that the $u_{tt}$ term is cancelled exactly by the $\tfrac{C^2}{2}$ second difference), leaves the third-order terms $\tfrac{\Delta t^2}{6}u_{ttt} + \tfrac{a\Delta x^2}{6}u_{xxx}$; using $u_{ttt} = -a^3u_{xxx}$ they combine to $\tfrac{a\Delta x^2}{6}(1 - C^2)u_{xxx}$, which moved to the right-hand side gives [[#eq-modified-lw]].
:::

The two results describe two characteristic failure modes:

- **Numerical diffusion** (even-order error terms, $u_{xx}$, $u_{xxxx}$): fronts are smeared, peaks are flattened, but no new extrema appear. Upwind adds a viscosity $\nu_{\text{num}}$ proportional to $\Delta x$ — on a coarse grid often far larger than the physical viscosity.
- **Numerical dispersion** (odd-order terms, $u_{xxx}$): waves of different wavelength travel at different speeds, so a sharp front breaks up into a train of wiggles, usually trailing behind it for Lax–Wendroff because its short waves are too slow.

::: example Numerical viscosity versus real viscosity {#ex-num-visc}
A scalar is convected at $a = 1.0\ \mathrm{m/s}$ on a grid with $\Delta x = 10\ \mathrm{mm}$ by the upwind scheme with $C = 0.5$. Compute the numerical viscosity and compare it with the kinematic viscosity of air, $1.5\times10^{-5}\ \mathrm{m^2/s}$.
::: solution
$\nu_{\text{num}} = \tfrac12 a\Delta x(1 - C) = 0.5 \times 1.0 \times 0.010 \times 0.5 = 2.5\times10^{-3}\ \mathrm{m^2/s}$, about $170$ times the molecular viscosity of air. The computed flow behaves as if its Reynolds number were $170$ times smaller. Halving $\Delta x$ halves $\nu_{\text{num}}$ but no practical grid makes it negligible for a high-Reynolds-number flow — which is why first-order upwinding is used only for start-up iterations and robustness, and higher-order bounded schemes ([[computational-fluid-dynamics/convection-diffusion]]) for results. Sanity check: at $C = 1$, $\nu_{\text{num}} = 0$, consistent with upwind being exact there.
:::
:::

::: example Amplitude and phase after many steps {#ex-amplitude-phase}
A sine wave resolved by $10$ points per wavelength is advected with $C = 0.5$. Compute the amplitude remaining after it has travelled one and five wavelengths, for the upwind and Lax–Wendroff schemes, and the phase error of Lax–Wendroff.
::: solution
$\theta = 2\pi/10 = 0.6283$ and $1 - \cos\theta = 0.1910$. One wavelength is $10\Delta x$; at $C\Delta x = 0.5\Delta x$ per step that takes $20$ steps, and five wavelengths take $100$.

Upwind: $\lvert G\rvert^2 = 1 - 2(0.5)(0.5)(0.1910) = 0.9045$, $\lvert G\rvert = 0.9511$. Amplitude after $20$ steps: $0.9511^{20} = 0.367$; after $100$ steps: $0.0066$. The wave has essentially vanished after five wavelengths.

Lax–Wendroff: $G = 1 - \mathrm{i}C\sin\theta - C^2(1 - \cos\theta)$, so $\lvert G\rvert^2 = 1 - C^2(1 - C^2)(1 - \cos\theta)^2 = 1 - 0.1875 \times 0.03647$, $\lvert G\rvert = 0.99657$. Amplitude after $20$ steps: $0.934$; after $100$: $0.710$. The phase change per step is $\arg G = -0.2994$ rad, against the exact $-C\theta = -0.3142$ rad: the numerical wave travels at $95.3\,\%$ of the true speed and after five wavelengths lags by $0.047 \times 5 = 0.24$ wavelengths.

(For upwind at $C = 0.5$ the phase happens to be exact; its error is all in amplitude.) Sanity check: the second-order scheme keeps the amplitude far better but trades amplitude error for phase error — exactly the even-versus-odd error structure of the modified equations.
:::
:::

::: widget plot
f: sqrt(abs(1 - 2*C*(1 - C)*(1 - cos(x)))); sqrt(abs(1 - C^2*(1 - C^2)*(1 - cos(x))^2))
x: 0, pi
y: 0, 2
sliders: C=0.5:0:1.5:0.05
labels: |G|\ \text{upwind}; |G|\ \text{Lax–Wendroff}
hlines: 1
caption: Amplification factor magnitudes for linear advection against $\theta$, with the Courant number on the slider. For $C < 1$ both schemes damp; upwind damps even moderately long waves strongly (numerical diffusion), Lax–Wendroff keeps $|G|$ near $1$ until $\theta$ is large. At exactly $C = 1$ both lines are flat at $1$: both schemes reduce to the exact shift. Push $C$ beyond $1$ and both curves rise above the line $|G| = 1$ — the CFL condition seen in Fourier space.
:::

::: warning Stability is not accuracy, and accuracy is not boundedness
Three distinct requirements are often confused. A stable scheme can be inaccurate (upwind at $C = 0.1$ on a coarse grid smears everything); an accurate, stable scheme can be unbounded (Lax–Wendroff and Crank–Nicolson produce overshoots near discontinuities without any instability, and a temperature or turbulence quantity that dips below zero can then wreck a simulation); and an unconditionally stable implicit scheme run with a huge time step is stable and bounded but wrong in time. Choose $\Delta t$ for the accuracy of the transient you care about; stability is the floor, not the target.
:::

::: quiz
A colleague's explicit code for $u_t + au_x = 0$ uses central differences in space and is "stable as long as I keep the Courant number below $0.1$". What do you say?
- [ ] That is right: small Courant numbers always guarantee stability.
- [x] FTCS for advection is unconditionally unstable; at small $C$ the growth per step is only $1 + O(C^2)$, so the blow-up is merely slow. Refining the grid at fixed $C$ will make it worse, not better.
- [ ] The scheme is stable because it satisfies the CFL condition.
- [ ] It is stable if the domain is periodic.
::: solution
$\lvert G\rvert^2 = 1 + C^2\sin^2\theta > 1$ for every $C > 0$. Over a fixed physical time the number of steps grows as the grid is refined, so the total amplification $(1 + C^2)^{n/2}$ grows without bound. The CFL condition is necessary, not sufficient.
:::
:::

::: history
The CFL condition comes from a 1928 paper by Richard Courant, Kurt Friedrichs and Hans Lewy, "Über die partiellen Differenzengleichungen der mathematischen Physik" (*Mathematische Annalen*, vol. 100), written as an existence proof for PDEs by finite differences, years before computers. The Fourier method of stability analysis was developed by John von Neumann at Los Alamos during the Second World War; its first full published account was by G. G. O'Brien, M. A. Hyman and S. Kaplan in 1951 (*Journal of Mathematics and Physics*). Peter Lax and Robert Richtmyer proved the equivalence theorem in their 1956 "Survey of the stability of linear finite difference equations" (*Communications on Pure and Applied Mathematics*), and Lax and Burton Wendroff published their second-order scheme in 1960 in the same journal. The modified-equation approach was systematised by R. F. Warming and B. J. Hyett in 1974 (*Journal of Computational Physics*).
:::

::: summary
- Consistency: the scheme reduces to the PDE as the grid is refined. Stability: $\lVert\mathbf{Q}^m\rVert$ stays bounded. Convergence: the numerical solution tends to the exact one.
- Lax equivalence: for a consistent linear scheme, stability $\Leftrightarrow$ convergence, and a stable scheme's global error has the order of its truncation error.
- Von Neumann analysis inserts $G^ne^{\mathrm{i}j\theta}$ and requires $\lvert G\rvert \le 1$; FTCS heat: $d \le \tfrac12$ (in 2D $d_x + d_y \le \tfrac12$); BTCS and Crank–Nicolson: unconditionally stable, CN undamped for short waves.
- Advection: FTCS is always unstable; upwind needs $0 \le C \le 1$.
- CFL: the numerical domain of dependence must contain the physical one; explicit schemes need $\lvert a\rvert\Delta t/\Delta x \le 1$, with the fastest wave speed (often $\lvert u\rvert + c$).
- The modified equation reveals numerical diffusion $\nu_{\text{num}} = \tfrac12 a\Delta x(1 - C)$ for upwind and dispersion $\propto(1 - C^2)u_{xxx}$ for Lax–Wendroff.
:::

## Exercises

::: exercise Two-dimensional explicit conduction {level=1 check="0.025"}
FTCS is used on a square grid with $\Delta x = \Delta y = 1.0\ \mathrm{mm}$ for a solid with $\alpha = 1.0\times10^{-5}\ \mathrm{m^2/s}$. Find the largest stable time step. (Enter $\Delta t$ in seconds.)
::: solution
$d_x + d_y \le \tfrac12$ with $d_x = d_y = \alpha\Delta t/\Delta x^2$ gives $\Delta t \le \Delta x^2/(4\alpha) = 10^{-6}/(4\times10^{-5}) = 0.025\ \mathrm{s}$.
:::
:::

::: exercise A Courant number {level=1 check="1.5"}
An explicit upwind scheme convects a scalar at $a = 15\ \mathrm{m/s}$ with $\Delta t = 1.0\times10^{-4}\ \mathrm{s}$ on a grid with $\Delta x = 1.0\ \mathrm{mm}$. Compute the Courant number and state whether the scheme is stable. (Enter $C$.)
::: solution
$C = a\Delta t/\Delta x = 15 \times 10^{-4}/10^{-3} = 1.5 > 1$: unstable. The time step must be reduced to at most $6.7\times10^{-5}\ \mathrm{s}$.
:::
:::

::: exercise Growth of the sawtooth {level=1 check="1.4"}
FTCS for the heat equation is run with $d = 0.6$. Find $\lvert G\rvert$ for the sawtooth mode $\theta = \pi$, and the factor by which that mode grows in $20$ steps. (Enter $\lvert G\rvert$.)
::: solution
$G = 1 - 4d = 1 - 2.4 = -1.4$, so $\lvert G\rvert = 1.4$; after $20$ steps the mode is multiplied by $1.4^{20} \approx 837$, alternating in sign each step — the characteristic signature of an explicit diffusion instability.
:::
:::

::: exercise Numerical viscosity {level=2 check="0.001"}
Find the numerical viscosity of the upwind scheme for $a = 2.0\ \mathrm{m/s}$, $\Delta x = 5.0\ \mathrm{mm}$ and $C = 0.8$. (Enter $\nu_{\text{num}}$ in $\mathrm{m^2/s}$.)
::: solution
$\nu_{\text{num}} = \tfrac12 a\Delta x(1 - C) = 0.5 \times 2.0 \times 0.005 \times 0.2 = 1.0\times10^{-3}\ \mathrm{m^2/s}$.
:::
:::

::: exercise Damping of a resolved wave {level=2 check="0.157"}
A wave with $20$ points per wavelength is advected by the upwind scheme with $C = 0.25$ for $200$ time steps. What fraction of its amplitude remains? (Enter the fraction to three significant figures.)
::: solution
$\theta = 2\pi/20 = 0.3142$, $1 - \cos\theta = 0.04894$, $\lvert G\rvert^2 = 1 - 2(0.25)(0.75)(0.04894) = 0.98165$, $\lvert G\rvert = 0.99078$. After $200$ steps: $0.99078^{200} = 0.157$. In those $200$ steps the wave travelled $200 \times 0.25 = 50\Delta x = 2.5$ wavelengths, and lost $84\,\%$ of its amplitude despite being well resolved.
:::
:::

::: exercise Explicit convection–diffusion {level=2 check="3.333e-4"}
The FTCS-type scheme $\phi_j^{n+1} = \phi_j^n - C(\phi_j^n - \phi_{j-1}^n) + d(\phi_{j+1}^n - 2\phi_j^n + \phi_{j-1}^n)$ (upwind convection, central diffusion) is used with $u = 1.0\ \mathrm{m/s}$, $\Gamma/\rho = 1.0\times10^{-3}\ \mathrm{m^2/s}$ and $\Delta x = 1.0\ \mathrm{mm}$. Show that it is a weighted average of old values when $C + 2d \le 1$ and find the largest time step that satisfies this. (Enter $\Delta t$ in seconds to four significant figures.)
::: solution
Rearranged, $\phi_j^{n+1} = (C + d)\phi_{j-1}^n + (1 - C - 2d)\phi_j^n + d\,\phi_{j+1}^n$: the weights sum to $1$ and are all non-negative if $C + 2d \le 1$, which guarantees boundedness (and stability in the maximum norm). $C + 2d = \Delta t\left(u/\Delta x + 2\nu/\Delta x^2\right) = \Delta t(1000 + 2000)\ \mathrm{s^{-1}}$, so $\Delta t \le 1/3000 = 3.33\times10^{-4}\ \mathrm{s}$. Here diffusion, not convection, is the tighter limit: the cell Péclet number $u\Delta x/\nu = 1$ is small.
:::
:::

::: exercise The Lax–Friedrichs scheme {level=3}
The Lax–Friedrichs scheme replaces $u_j^n$ in FTCS by the average of its neighbours: $u_j^{n+1} = \tfrac12(u_{j+1}^n + u_{j-1}^n) - \tfrac{C}{2}(u_{j+1}^n - u_{j-1}^n)$. (a) Find $G$ and the stability condition. (b) Derive its modified equation and show that its numerical viscosity is $\tfrac{\Delta x^2}{2\Delta t}(1 - C^2)$. (c) Compare it with upwind at $C = 0.5$.
::: solution
(a) $G = \cos\theta - \mathrm{i}C\sin\theta$, $\lvert G\rvert^2 = \cos^2\theta + C^2\sin^2\theta = 1 - (1 - C^2)\sin^2\theta \le 1$ iff $\lvert C\rvert \le 1$ — the CFL limit, now achieved.
(b) Expanding: $\tfrac12(u_{j+1} + u_{j-1}) = u + \tfrac{\Delta x^2}{2}u_{xx} + \cdots$, so $u_t + \tfrac{\Delta t}{2}u_{tt} + au_x - \tfrac{\Delta x^2}{2\Delta t}u_{xx} = O(\Delta x^2)$. With $u_{tt} = a^2u_{xx}$: $u_t + au_x = \left(\tfrac{\Delta x^2}{2\Delta t} - \tfrac{a^2\Delta t}{2}\right)u_{xx} = \tfrac{\Delta x^2}{2\Delta t}(1 - C^2)u_{xx}$.
(c) Writing $\Delta x^2/\Delta t = a\Delta x/C$, the Lax–Friedrichs viscosity is $\tfrac{a\Delta x}{2C}(1 - C^2)$; at $C = 0.5$ this is $0.75\,a\Delta x$, three times the upwind value $0.25\,a\Delta x$. Averaging the neighbours stabilises FTCS by adding a large amount of diffusion.
:::
:::

::: exercise Choosing a time step for an industrial transient {level=3}
A transient simulation of a valve closing in a water pipe (speed of sound in water about $1480\ \mathrm{m/s}$, flow speed $3\ \mathrm{m/s}$) is planned on a mesh with smallest cells of $0.5\ \mathrm{mm}$ near the valve seat. The valve closes in $20\ \mathrm{ms}$. Discuss the choice between an explicit compressible solver and an implicit pressure-based solver, estimating time steps and step counts, and state what quantities you would monitor to confirm that the time step is adequate.
::: solution
Explicit compressible: $\Delta t \le \Delta x/(u + c) = 5\times10^{-4}/1483 = 3.4\times10^{-7}\ \mathrm{s}$; $20\ \mathrm{ms}$ needs about $6\times10^{4}$ steps, and many more to follow the subsequent pressure surge (water hammer), which is genuinely acoustic. If the pressure surge matters — the usual reason for such a study — those acoustic time scales must be resolved anyway, and an explicit or implicit compressible formulation with $C_{\text{acoustic}} \sim 1$ is appropriate. If only the incompressible flow through the closing valve matters, an implicit pressure-based solver with convective Courant number $\sim 1$ in the smallest cells allows $\Delta t \sim \Delta x/u_{\text{max}}$; jet velocities through the narrowing gap may reach $30\ \mathrm{m/s}$, giving $\Delta t \sim 1.7\times10^{-5}\ \mathrm{s}$ and about $1200$ steps. Adequacy is confirmed by a time-step study (halve $\Delta t$ and compare the force on the valve, the peak pressure and the flow rate history), by checking that the maximum Courant number stays near the intended value, and by checking that the iterative residuals within each step converge.
:::
:::
