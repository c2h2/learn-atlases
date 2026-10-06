Heat a metal rod in the middle, then plunge both ends into ice water. How does the temperature along the rod change as time passes? Intuition says that the hot middle cools, the cold ends cool their neighbours, sharp differences are smoothed out, and eventually everything settles at the temperature of the ends. The **heat equation**

$$
u_t = k\,u_{xx}
$$

turns this intuition into mathematics. Here $u(x, t)$ is the temperature at position $x$ and time $t$, subscripts denote partial derivatives, and $k > 0$ is a material constant. This is the equation Joseph Fourier wrote down in 1807, and it was to solve it that he invented Fourier series.

In this chapter we derive the equation from conservation of energy, solve it on an interval by **separation of variables**, and handle the most common boundary conditions: ends held at fixed temperatures and insulated ends. Then we prove two qualitative theorems that are as important as any formula: **uniqueness**, by an energy argument, and the **maximum principle**, which says that a rod without heat sources can never become hotter than the hottest of its initial and boundary temperatures. Along the way we will see the defining feature of diffusion: it smooths everything instantly, and it forgets its past exponentially fast.

## Deriving the heat equation

Consider a thin rod along the $x$-axis from $x = 0$ to $x = L$, with constant cross-sectional area $A$, insulated along its lateral surface so that heat can flow only along the rod. Let $u(x,t)$ be the temperature, $\rho$ the density and $c$ the specific heat capacity (the energy needed to raise the temperature of a unit mass by one degree). The heat energy in a slice $[a, b]$ is then

$$
\int_a^b c\rho A\,u(x, t)\,dx.
$$

Let $\phi(x,t)$ be the **heat flux**: the energy per unit time and per unit area flowing in the positive $x$-direction through the cross-section at $x$. Energy is conserved, so the energy in $[a, b]$ changes only through the flux across the two ends (and, if present, internal sources of strength $Q(x,t)$ per unit volume):

$$
\frac{d}{dt}\int_a^b c\rho A\,u\,dx = A\,\phi(a, t) - A\,\phi(b, t) + \int_a^b A\,Q\,dx.
$$

Writing $\phi(a,t) - \phi(b,t) = -\int_a^b\phi_x\,dx$ and differentiating under the integral sign gives $\int_a^b\bigl(c\rho\,u_t + \phi_x - Q\bigr)\,dx = 0$ for *every* interval $[a, b]$. If the integrand is continuous it must vanish identically: were it positive at some point, it would be positive on a small interval around that point, and the integral over that interval would be positive. Hence

$$
c\rho\,u_t = -\phi_x + Q.
$$

This conservation law needs a **constitutive law** linking flux to temperature. **Fourier's law of heat conduction** says that heat flows from hot to cold at a rate proportional to the temperature gradient: $\phi = -K_0\,u_x$, where $K_0 > 0$ is the thermal conductivity. Substituting, and assuming $c$, $\rho$, $K_0$ constant and no sources,

$$
u_t = k\,u_{xx}, \qquad k = \frac{K_0}{c\rho}.
$$ {#eq-heat}

The constant $k$ is the **thermal diffusivity**, with units of $(\text{length})^2/\text{time}$. Copper has $k \approx 1.1\ \mathrm{cm^2/s}$, steel about $0.12\ \mathrm{cm^2/s}$, and water about $0.0014\ \mathrm{cm^2/s}$. In two or three dimensions the same argument with the divergence theorem ([[multivariable/stokes-divergence]]) gives $u_t = k\,\Delta u$, where $\Delta u = u_{xx} + u_{yy} + u_{zz}$ is the Laplacian.

::: intuition What the equation says
The second derivative compares a value with its neighbours: by Taylor's theorem,

$$
u_{xx}(x,t) \approx \frac{u(x+h, t) + u(x-h, t) - 2u(x,t)}{h^2} = \frac{2}{h^2}\left[\frac{u(x+h,t) + u(x-h,t)}{2} - u(x,t)\right].
$$

So the heat equation says: **the temperature at a point rises at a rate proportional to how far it lies below the average of its neighbours**, and falls if it lies above. Peaks ($u_{xx} < 0$) are eroded and valleys ($u_{xx} > 0$) are filled in. This is the mechanism behind every qualitative property in this chapter.
:::

A PDE alone does not determine the temperature; we must also say how the rod starts and what happens at its ends.

::: definition Initial–boundary value problem for the heat equation {#def-ibvp}
The **initial–boundary value problem** (IBVP) on $0 < x < L$, $t > 0$ consists of the heat equation [[#eq-heat]], an **initial condition** $u(x, 0) = f(x)$ for $0 \le x \le L$, and one boundary condition at each end. The standard types, written at $x = 0$, are:

- **Dirichlet**: $u(0,t) = g(t)$ — the end is held at a prescribed temperature;
- **Neumann**: $u_x(0,t) = g(t)$ — the heat flux through the end is prescribed; $u_x(0,t) = 0$ means the end is **insulated**;
- **Robin**: $u_x(0, t) = h\,\bigl(u(0,t) - g(t)\bigr)$ with $h > 0$ — the end loses heat to surroundings at temperature $g(t)$ according to Newton's law of cooling (at $x = L$ the sign of $h$ is reversed).

The boundary conditions are **homogeneous** if $g = 0$. A **classical solution** is a function $u$, continuous on $[0, L]\times[0,\infty)$, with $u_t$ and $u_{xx}$ continuous for $t > 0$, satisfying all three requirements.
:::

## Separation of variables

Start with the simplest complete problem: ends held at temperature $0$.

$$
u_t = k\,u_{xx} \ \ (0 < x < L,\ t > 0), \qquad u(0, t) = u(L, t) = 0, \qquad u(x, 0) = f(x).
$$ {#eq-dirichlet-problem}

The idea of **separation of variables** is to look first for solutions of the special form $u(x,t) = X(x)\,T(t)$, ignoring the initial condition for the moment. Substituting into the PDE gives $X(x)T'(t) = k\,X''(x)T(t)$, and dividing by $kXT$,

$$
\frac{T'(t)}{k\,T(t)} = \frac{X''(x)}{X(x)}.
$$

The left-hand side does not depend on $x$ and the right-hand side does not depend on $t$. A function of $t$ alone that equals a function of $x$ alone must be constant, so both sides equal a constant, which we call $-\lambda$:

$$
X'' + \lambda X = 0, \qquad T' = -\lambda k\,T.
$$

The boundary conditions $u(0,t) = X(0)T(t) = 0$ and $u(L, t) = 0$ require (for a non-zero solution) $X(0) = X(L) = 0$. So $X$ must solve a **boundary value problem** for an ordinary differential equation, and only special values of $\lambda$ allow a non-zero solution.

::: proposition The Dirichlet eigenvalue problem {#prop-dirichlet-eigen}
The problem $X'' + \lambda X = 0$, $X(0) = X(L) = 0$ has a non-zero solution if and only if

$$
\lambda = \lambda_n = \left(\frac{n\pi}{L}\right)^2, \quad n = 1, 2, 3, \dots,
$$

and then $X$ is a non-zero multiple of $X_n(x) = \sin\dfrac{n\pi x}{L}$. The numbers $\lambda_n$ are the **eigenvalues** and the $X_n$ the **eigenfunctions** of the problem.
:::

::: proof
We solve the constant-coefficient ODE in three cases (see [[ode/second-order-linear]]).

*Case $\lambda < 0$.* Write $\lambda = -\mu^2$ with $\mu > 0$. Then $X = A\cosh\mu x + B\sinh\mu x$. The condition $X(0) = 0$ gives $A = 0$, and then $X(L) = B\sinh\mu L = 0$ forces $B = 0$ because $\sinh\mu L > 0$. Only the zero solution.

*Case $\lambda = 0$.* Then $X = A + Bx$, and $X(0) = X(L) = 0$ give $A = B = 0$.

*Case $\lambda > 0$.* Write $\lambda = \mu^2$ with $\mu > 0$. Then $X = A\cos\mu x + B\sin\mu x$. From $X(0) = 0$, $A = 0$; then $X(L) = B\sin\mu L = 0$ has a solution with $B \ne 0$ exactly when $\sin\mu L = 0$, that is $\mu L = n\pi$ for a positive integer $n$. So $\lambda = (n\pi/L)^2$ and $X = B\sin(n\pi x/L)$.
:::

A second argument for $\lambda > 0$ generalises much further. Multiply $X'' + \lambda X = 0$ by $X$ and integrate by parts: $\lambda\int_0^LX^2\,dx = -\int_0^L XX''\,dx = -\bigl[XX'\bigr]_0^L + \int_0^L(X')^2\,dx = \int_0^L(X')^2\,dx$, because $X(0) = X(L) = 0$. So $\lambda \ge 0$, and $\lambda = 0$ would force $X' \equiv 0$, so that $X$ is constant and hence zero. This "energy" argument is the germ of [[pde/sturm-liouville]].

For $\lambda = \lambda_n$ the time equation gives $T(t) = e^{-k\lambda_n t}$, so each

$$
u_n(x,t) = e^{-k(n\pi/L)^2t}\sin\frac{n\pi x}{L}
$$

solves the PDE and the boundary conditions. These are the **normal modes** of the rod: each keeps its shape and decays exponentially, the $n$th at rate $k(n\pi/L)^2$. The PDE and the boundary conditions are linear and homogeneous, so any (convergent) superposition of normal modes is again a solution. To satisfy the initial condition we choose the coefficients so that at $t = 0$ the superposition equals $f$:

$$
u(x,t) = \sum_{n=1}^{\infty}b_n\,e^{-k(n\pi/L)^2t}\sin\frac{n\pi x}{L}, \qquad b_n = \frac{2}{L}\int_0^Lf(x)\sin\frac{n\pi x}{L}\,dx.
$$ {#eq-heat-series}

The $b_n$ are exactly the coefficients of the half-range sine series of $f$ ([[pde/fourier-series#def-half-range]]). This is the original reason Fourier needed his series.

::: theorem The series solution {#thm-heat-series}
Let $f$ be piecewise continuous on $[0, L]$ and define $u$ by [[#eq-heat-series]].

1. The series converges for $0 \le x \le L$, $t > 0$; $u$ is infinitely differentiable on $[0, L]\times(0, \infty)$, satisfies $u_t = k\,u_{xx}$ there, and $u(0, t) = u(L, t) = 0$.
2. If moreover $f$ is continuous and piecewise smooth with $f(0) = f(L) = 0$, then $u$ is continuous on $[0, L]\times[0,\infty)$ and $u(x, 0) = f(x)$, so $u$ is a classical solution of [[#eq-dirichlet-problem]].
:::

::: proof
1. By Bessel's inequality ([[pde/fourier-series#cor-bessel]]) applied to the odd extension of $f$, the $b_n$ are bounded, say $\abs{b_n} \le B$. Fix $t_0 > 0$ and integers $i, j \ge 0$. Differentiating the $n$th term $i$ times in $t$ and $j$ times in $x$ produces a function bounded, for $t \ge t_0$, by

$$
M_n = B\left(k\frac{n^2\pi^2}{L^2}\right)^i\left(\frac{n\pi}{L}\right)^je^{-k(n\pi/L)^2t_0}.
$$

The exponential beats every power of $n$, so $\sum M_n < \infty$ (for instance by the ratio test). By the Weierstrass M-test, every term-by-term derivative of the series converges uniformly on $[0, L]\times[t_0, \infty)$, and therefore ([[real-analysis/uniform-convergence]]) $u$ has continuous partial derivatives of all orders there, obtained by differentiating term by term. Each term satisfies $\partial_t u_n = -k\lambda_n u_n = k\,\partial_{xx}u_n$ and vanishes at $x = 0$ and $x = L$, so the same is true of $u$. Since $t_0 > 0$ was arbitrary, part 1 follows.

2. Now the odd $2L$-periodic extension of $f$ is continuous (this is where $f(0) = f(L) = 0$ is needed) and piecewise smooth, so $\sum\abs{b_n} < \infty$ by [[pde/fourier-series#thm-uniform]]. For all $t \ge 0$ the $n$th term is bounded by $\abs{b_n}$, so the series converges uniformly on $[0, L]\times[0,\infty)$ and $u$ is continuous there. At $t = 0$ it is the sine series of $f$, which converges to $f$ by [[pde/fourier-series#thm-dirichlet]].
:::

::: remark Incompatible data
Physically important initial data often violate $f(0) = f(L) = 0$: a rod at a uniform $100^\circ$ whose ends are suddenly put in ice. Part 1 still gives a smooth solution for $t > 0$, and it attains the initial data in the mean-square sense: by Parseval's identity,

$$
\int_0^L\bigl(u(x,t) - f(x)\bigr)^2\,dx = \frac{L}{2}\sum_{n=1}^{\infty}b_n^2\bigl(1 - e^{-k\lambda_nt}\bigr)^2 \longrightarrow 0 \quad (t\to0^+),
$$

because each term tends to $0$ and is at most $b_n^2$, with $\sum b_n^2 < \infty$. (One can also show that $u(x,t) \to f(x)$ at every interior point where $f$ is continuous.)
:::

::: example A parabolic initial profile {#ex-parabola}
Solve $u_t = u_{xx}$ on $0 < x < \pi$ with $u(0, t) = u(\pi, t) = 0$ and $u(x, 0) = x(\pi - x)$, and describe the solution for large $t$.
::: solution
Here $L = \pi$, $k = 1$ and $\lambda_n = n^2$. The sine coefficients of $x(\pi - x)$ were computed in [[pde/fourier-series#ex-half-range]]: $b_n = \frac{8}{\pi n^3}$ for odd $n$ and $0$ for even $n$. Since $f$ is continuous, piecewise smooth and vanishes at both ends, [[#thm-heat-series]] gives the classical solution

$$
u(x,t) = \frac{8}{\pi}\left(e^{-t}\sin x + \frac{e^{-9t}}{27}\sin 3x + \frac{e^{-25t}}{125}\sin 5x + \cdots\right).
$$

Each higher mode decays faster *and* starts smaller. At $t = 0.5$ the ratio of the amplitudes of the second and first non-zero terms is $\frac{1}{27}e^{-8\cdot 0.5} \approx 7\times10^{-4}$, so from then on $u(x,t) \approx \frac{8}{\pi}e^{-t}\sin x$ to excellent accuracy: the rod forgets the details of its initial state and cools in the shape of the first mode.
:::
:::

::: widget heat
equation: heat
f: if(x < pi/2, x, pi - x)
L: pi
k: 1
boundary: dirichlet
terms: 40
caption: A triangular temperature profile on a rod with both ends held at $0$. Play the animation and watch the corner at the top disappear immediately — the solution is smooth for every $t>0$ — while the whole profile relaxes towards the shape of the first mode $\sin x$ and decays like $e^{-t}$. Try a larger diffusivity $k$: the same pictures appear at proportionally earlier times.
:::

::: example Sudden cooling of a hot rod {#ex-cooling}
A copper rod of length $L = 50\ \mathrm{cm}$ ($k = 1.11\ \mathrm{cm^2/s}$), laterally insulated, is at a uniform $100^\circ\mathrm{C}$ when both ends are put into ice water at $0^\circ\mathrm C$. Find the temperature and estimate when the centre has cooled to $50^\circ\mathrm C$.
::: solution
The sine coefficients of $f = 100$ are $b_n = \frac{2}{L}\int_0^L100\sin\frac{n\pi x}{L}\,dx = \frac{200\bigl(1 - (-1)^n\bigr)}{n\pi}$, that is $\frac{400}{n\pi}$ for odd $n$ and $0$ for even $n$. So

$$
u(x,t) = \frac{400}{\pi}\sum_{n\ \text{odd}}\frac1n\,e^{-k n^2\pi^2t/L^2}\sin\frac{n\pi x}{L}.
$$

At the centre, $\sin(n\pi/2) = (-1)^j$ for $n = 2j + 1$, so

$$
u\bigl(\tfrac L2, t\bigr) = \frac{400}{\pi}\left(e^{-t/\tau} - \frac13e^{-9t/\tau} + \frac15e^{-25t/\tau} - \cdots\right), \qquad \tau = \frac{L^2}{k\pi^2} = \frac{2500}{1.11\,\pi^2}\ \mathrm{s} \approx 228\ \mathrm{s}.
$$

Keeping only the first term, $\frac{400}{\pi}e^{-t/\tau} = 50$ gives $t = \tau\ln\frac{8}{\pi} \approx 228 \times 0.935 \approx 213\ \mathrm{s}$. At that time the second term has size $\frac{400}{3\pi}e^{-9\times0.935} \approx 0.01^\circ$, so the approximation is excellent: the centre reaches $50^\circ\mathrm C$ after about $3.6$ minutes. (Solving with many terms gives $213.3\ \mathrm{s}$.) The time scale $\tau$ is proportional to $L^2$: a rod twice as long takes four times as long to cool.
:::
:::

::: widget plot
f: sum(4/(pi*(2*j + 1))*exp(-(2*j + 1)^2*t)*sin((2*j + 1)*x), j, 0, 40); 4/pi*exp(-t)*sin(x)
x: 0, pi
y: 0, 1.3
sliders: t=0:0:1.5:0.005
labels: u(x,t)\ \text{(41 terms)}; \tfrac{4}{\pi}e^{-t}\sin x
caption: The rod of [[#ex-cooling]] in dimensionless form ($L = \pi$, $k = 1$, initial temperature $1$). At $t = 0$ the partial sum shows the square initial profile with its Gibbs overshoot. Move $t$ just above $0$: the corners round off at once. By $t \approx 0.5$ the solution is indistinguishable from the single first mode (the second curve), which then simply decays.
:::

::: quiz
In the separation $u = X(x)T(t)$ for [[#eq-dirichlet-problem]], why did we not need the solutions with separation constant $\lambda \le 0$?
- [ ] They grow exponentially in time, which is unphysical.
- [x] For $\lambda \le 0$ the only solution of $X'' + \lambda X = 0$ with $X(0) = X(L) = 0$ is $X \equiv 0$.
- [ ] They do not satisfy the heat equation.
- [ ] They are needed, but their coefficients turn out to be zero.
::: solution
[[#prop-dirichlet-eigen]] shows that for $\lambda < 0$ and $\lambda = 0$ the boundary conditions force $X = 0$. Physical plausibility is not a valid argument in itself — it is the boundary conditions that exclude these values. (With other boundary conditions, for example insulated ends, $\lambda = 0$ *is* an eigenvalue and must be kept.)
:::
:::

## Insulated ends and non-zero end temperatures

### Insulated ends

If both ends are insulated, the boundary conditions become $u_x(0, t) = u_x(L, t) = 0$. Separation of variables now leads to $X'' + \lambda X = 0$ with $X'(0) = X'(L) = 0$. Repeating the case analysis of [[#prop-dirichlet-eigen]]: for $\lambda < 0$ only $X = 0$ works; for $\lambda = 0$ every **constant** works; for $\lambda = \mu^2 > 0$, $X = A\cos\mu x + B\sin\mu x$ with $X'(0) = \mu B = 0$ and $X'(L) = -\mu A\sin\mu L = 0$, so $\mu = n\pi/L$. The eigenfunctions are $1, \cos\frac{\pi x}{L}, \cos\frac{2\pi x}{L}, \dots$, and the solution is a **cosine series**:

$$
u(x,t) = \frac{a_0}{2} + \sum_{n=1}^{\infty}a_n\,e^{-k(n\pi/L)^2t}\cos\frac{n\pi x}{L}, \qquad a_n = \frac2L\int_0^Lf(x)\cos\frac{n\pi x}{L}\,dx.
$$ {#eq-neumann-series}

As $t\to\infty$, $u \to \frac{a_0}{2} = \frac1L\int_0^Lf\,dx$: the rod approaches the average of its initial temperature. That is exactly what conservation of energy predicts.

::: proposition Conservation of heat {#prop-conservation}
If $u$ is a classical solution of the heat equation on $[0, L]$ with insulated ends, and $u_x$ is continuous on $[0, L]\times(0,\infty)$, then the total heat $H(t) = \int_0^L u(x,t)\,dx$ is constant.
:::

::: proof
Differentiating under the integral sign and using the PDE,

$$
H'(t) = \int_0^Lu_t\,dx = k\int_0^Lu_{xx}\,dx = k\bigl[u_x(L,t) - u_x(0,t)\bigr] = 0.
$$
:::

::: warning Do not lose the constant mode
With insulated ends, $\lambda = 0$ is an eigenvalue, and the constant term $\frac{a_0}{2}$ is the most important term in the solution: it is the final state. A frequent error is to copy the Dirichlet analysis, discard $\lambda = 0$, and conclude that the temperature tends to $0$ — which would mean heat escaping through perfectly insulated ends. Always run through the cases $\lambda<0$, $\lambda=0$, $\lambda>0$ afresh for each new set of boundary conditions.
:::

::: example An insulated rod {#ex-insulated}
A rod of length $L$ with insulated ends has initial temperature $f(x) = x$. Find $u(x,t)$ and its limit.
::: solution
The cosine coefficients are $a_0 = \frac{2}{L}\int_0^Lx\,dx = L$ and, for $n \ge 1$, integrating by parts,

$$
a_n = \frac{2}{L}\int_0^Lx\cos\frac{n\pi x}{L}\,dx = \frac{2}{L}\left[\frac{Lx}{n\pi}\sin\frac{n\pi x}{L} + \frac{L^2}{n^2\pi^2}\cos\frac{n\pi x}{L}\right]_0^L = \frac{2L\bigl((-1)^n - 1\bigr)}{n^2\pi^2},
$$

which is $-\frac{4L}{n^2\pi^2}$ for odd $n$ and $0$ for even $n$. By [[#eq-neumann-series]],

$$
u(x,t) = \frac L2 - \frac{4L}{\pi^2}\sum_{n\ \text{odd}}\frac{1}{n^2}e^{-kn^2\pi^2t/L^2}\cos\frac{n\pi x}{L}.
$$

As $t\to\infty$ the rod reaches the uniform temperature $\frac L2$, the mean of $f$. Heat flows from the hot end to the cold end but cannot leave.
:::
:::

::: widget heat
equation: heat
f: if(x < pi/2, 1, 0)
L: pi
k: 1
boundary: neumann
terms: 40
caption: Insulated ends: the left half of the rod starts at temperature $1$ and the right half at $0$. Play the animation. The jump smooths out instantly, the ends keep zero slope, and the profile levels off at the average temperature $\tfrac12$ — the area under the curve never changes. Compare with the Dirichlet figure above, where everything drains away to $0$.
:::

### Non-zero end temperatures

Suppose the ends are held at constant temperatures $u(0,t) = T_1$ and $u(L,t) = T_2$. Superposition no longer applies directly, because a sum of two solutions has end values $2T_1$, $2T_2$. The remedy is to subtract the **steady state**: the time-independent solution $v(x)$, which satisfies $v'' = 0$, $v(0) = T_1$, $v(L) = T_2$, so

$$
v(x) = T_1 + (T_2 - T_1)\frac{x}{L}.
$$

Then $w = u - v$ satisfies the heat equation (since $v_t = 0 = k\,v_{xx}$), the *homogeneous* conditions $w(0,t) = w(L,t) = 0$, and $w(x,0) = f(x) - v(x)$. Solve for $w$ by [[#eq-heat-series]] and put $u = v + w$. As $t\to\infty$, $w \to 0$ and $u \to v$: the temperature becomes linear between the end values.

::: example Heating one end {#ex-steady}
A rod with $L = \pi$, $k = 1$ is initially at temperature $0$. From $t = 0$ the end $x = \pi$ is held at $100$ and the end $x = 0$ at $0$. Find $u(x,t)$.
::: solution
The steady state is $v(x) = \frac{100x}{\pi}$. Then $w = u - v$ has zero end values and $w(x,0) = -\frac{100x}{\pi}$. The sine coefficients of $x$ on $(0,\pi)$ are $\frac{2(-1)^{n+1}}{n}$ ([[pde/fourier-series#ex-sawtooth]]), so those of $w(x, 0)$ are $-\frac{100}{\pi}\cdot\frac{2(-1)^{n+1}}{n} = \frac{200(-1)^n}{n\pi}$. Therefore

$$
u(x,t) = \frac{100x}{\pi} + \frac{200}{\pi}\sum_{n=1}^{\infty}\frac{(-1)^n}{n}e^{-n^2t}\sin nx.
$$

Check at $t = 0$: the series is $-\frac{100}{\pi}\cdot 2\sum\frac{(-1)^{n+1}}{n}\sin nx = -\frac{100x}{\pi}$ for $0 \le x < \pi$, so $u(x,0) = 0$ there. For large $t$ the slowest-decaying correction is $-\frac{200}{\pi}e^{-t}\sin x$, which is negative: the rod approaches its linear steady state from below.
:::
:::

## Uniqueness by the energy method

We have constructed solutions; are they the only ones? If two different temperature distributions could evolve from the same data, the model would be useless. The first uniqueness proof uses an "energy" (strictly, the integral of the squared temperature) that can only decrease.

::: theorem Uniqueness {#thm-energy-unique}
Let $F(x,t)$, $f(x)$, $g(t)$ and $h(t)$ be given. The problem

$$
u_t = k\,u_{xx} + F \ \ (0<x<L,\ 0 < t \le T), \qquad u(x,0) = f(x), \qquad u(0,t) = g(t),\ \ u(L,t) = h(t)
$$

has at most one solution $u$ that is continuous on $[0, L]\times[0, T]$ and has $u_t$, $u_x$, $u_{xx}$ continuous on $[0, L]\times(0, T]$. The same holds with either Dirichlet condition replaced by a Neumann condition.
:::

::: proof
Let $u_1, u_2$ be two such solutions and $w = u_1 - u_2$. Then $w_t = k\,w_{xx}$ (the source $F$ cancels), $w(x,0) = 0$, and $w = 0$ (or $w_x = 0$, in the Neumann case) at each end. Define

$$
E(t) = \int_0^Lw(x,t)^2\,dx \ge 0.
$$

$E$ is continuous on $[0, T]$ with $E(0) = 0$, and for $0 < t \le T$, differentiating under the integral sign and integrating by parts,

$$
E'(t) = 2\int_0^Lw\,w_t\,dx = 2k\int_0^Lw\,w_{xx}\,dx = 2k\bigl[w\,w_x\bigr]_{x=0}^{x=L} - 2k\int_0^Lw_x^2\,dx = -2k\int_0^Lw_x^2\,dx \le 0,
$$

because at each end either $w$ or $w_x$ vanishes. By the mean value theorem $E$ is non-increasing on $[0,T]$, so $0 \le E(t) \le E(0) = 0$. Hence $E \equiv 0$, and since $w$ is continuous, $w \equiv 0$: the two solutions coincide.
:::

The same computation, applied to a single solution with homogeneous boundary conditions, shows that $\int_0^Lu^2\,dx$ decreases in time: diffusion dissipates. In the exercises you will sharpen this to exponential decay.

## The maximum principle

The second qualitative theorem is a precise version of "heat flows from hot to cold". In the rectangle $R = [0, L]\times[0,T]$, call the bottom and the two sides,

$$
\Gamma = \bigl\{(x, 0) : 0 \le x \le L\bigr\}\cup\bigl\{(0, t) : 0 \le t \le T\bigr\}\cup\bigl\{(L, t) : 0 \le t \le T\bigr\},
$$

the **parabolic boundary**. It is where the data of the IBVP live; the top edge $t = T$ is not part of it.

::: theorem Weak maximum principle {#thm-max}
Let $u$ be continuous on $R = [0,L]\times[0,T]$, with $u_t$ and $u_{xx}$ continuous on $(0,L)\times(0,T]$, and suppose $u_t = k\,u_{xx}$ there. Then

$$
\max_R u = \max_\Gamma u \qquad\text{and}\qquad \min_R u = \min_\Gamma u.
$$

In words: the maximum and the minimum of $u$ are attained on the bottom or the sides of the rectangle.
:::

::: proof
The minimum statement follows by applying the maximum statement to $-u$, so we prove the latter. Let $M = \max_\Gamma u$.

*Step 1: a strict version.* Let $\eps > 0$ and $v(x,t) = u(x,t) + \eps x^2$. Then $v_t - k\,v_{xx} = u_t - k\,u_{xx} - 2k\eps = -2k\eps < 0$ in $(0, L)\times(0,T]$. The continuous function $v$ attains its maximum over the compact set $R$ at some point $(x_0, t_0)$. Suppose this point is not on $\Gamma$, so $0 < x_0 < L$ and $0 < t_0 \le T$. As a function of $x$, $v(\cdot, t_0)$ has an interior maximum at $x_0$, so $v_{xx}(x_0, t_0) \le 0$. As a function of $t$ on $(0, t_0]$, $v(x_0, \cdot)$ is largest at $t_0$, so $v_t(x_0, t_0) \ge 0$ (it equals $0$ if $t_0 < T$, and the one-sided difference quotients from below are $\ge 0$ if $t_0 = T$). Then $v_t - k\,v_{xx} \ge 0$ at $(x_0, t_0)$, contradicting $v_t - k\,v_{xx} < 0$. Hence the maximum of $v$ is attained on $\Gamma$.

*Step 2: let $\eps\to0$.* For every point of $R$,

$$
u(x,t) \le v(x,t) \le \max_\Gamma v \le \max_\Gamma u + \eps L^2 = M + \eps L^2.
$$

Since $\eps > 0$ is arbitrary, $u \le M$ on $R$. The maximum $M$ is attained on $\Gamma$, so $\max_R u = M$.
:::

::: intuition Why the top edge is excluded
A maximum *can* occur on the top edge $t = T$ — but only if it also occurs on $\Gamma$. The real content of the theorem is that a rod cannot develop a new hot spot in its interior: at an interior maximum the temperature lies above the average of its neighbours, so by the intuition above it must be decreasing, not increasing. The perturbation $\eps x^2$ in the proof turns "not increasing" into the strict inequality needed for a contradiction.
:::

::: corollary Uniqueness, stability and comparison {#cor-max}
Let $u_1$ and $u_2$ be solutions of the heat equation on $R$ with the regularity of [[#thm-max]].

1. **Comparison:** if $u_1 \le u_2$ on $\Gamma$, then $u_1 \le u_2$ on all of $R$.
2. **Stability:** $\displaystyle\max_R\abs{u_1 - u_2} = \max_\Gamma\abs{u_1 - u_2}$.
3. **Uniqueness:** the Dirichlet problem (with given $f$, $g$, $h$) has at most one solution continuous on $R$.
:::

::: proof
The difference $w = u_2 - u_1$ satisfies the heat equation. For 1, $\min_R w = \min_\Gamma w \ge 0$. For 2, apply [[#thm-max]] to $w$ and to $-w$: $\max_R w \le \max_\Gamma\abs{w}$ and $\max_R(-w) \le \max_\Gamma\abs{w}$. For 3, two solutions of the same Dirichlet problem agree on $\Gamma$, so by 2 they agree on $R$.
:::

Part 2 is **continuous dependence on the data**: if the initial and boundary temperatures are changed by at most $\delta$, the solution changes by at most $\delta$, everywhere and for all time. Notice that this uniqueness proof needs no derivatives up to the boundary, unlike [[#thm-energy-unique]]. Together, existence ([[#thm-heat-series]]), uniqueness and continuous dependence make the Dirichlet problem **well posed** in the sense of Hadamard.

::: example Bounds from the maximum principle {#ex-bounds}
Show that the solution of [[#ex-parabola]] satisfies $\frac{\pi^2}{4}e^{-t}\sin x \le u(x,t) \le \pi e^{-t}\sin x$ for $0 \le x \le \pi$, $t \ge 0$.
::: solution
The functions $v_\pm(x,t) = c_\pm e^{-t}\sin x$ with $c_- = \frac{\pi^2}{4}$ and $c_+ = \pi$ solve the heat equation with zero end values. On the sides of $\Gamma$ all three of $v_-$, $u$, $v_+$ vanish, so by [[#cor-max]] it is enough to compare the initial values:

$$
\frac{\pi^2}{4}\sin x \le x(\pi - x) \le \pi\sin x \qquad (0 \le x \le \pi).
$$

For the right inequality let $g(x) = \pi\sin x - x(\pi - x)$, which is symmetric about $\frac\pi2$, so it suffices to consider $[0, \frac\pi2]$. We have $g(0) = g'(0) = 0$ and $g''(x) = 2 - \pi\sin x$, which is $\ge 0$ on $[0, x_*]$ and $\le 0$ on $[x_*, \frac\pi2]$, where $\sin x_* = \frac2\pi$. On $[0, x_*]$, $g$ is convex and so lies above its tangent line at $0$, which is the zero line. On $[x_*, \frac\pi2]$, $g$ is concave and so lies above the chord joining its end values $g(x_*) \ge 0$ and $g(\frac\pi2) = \pi - \frac{\pi^2}{4} > 0$. Hence $g \ge 0$. The left inequality is proved in the same way with $h(x) = x(\pi - x) - \frac{\pi^2}{4}\sin x$: here $h(0) = h(\frac\pi2) = h'(\frac\pi2) = 0$ and $h''(x) = \frac{\pi^2}{4}\sin x - 2$ changes sign once on $[0, \frac\pi2]$, from negative to positive. On the convex part $h$ lies above its tangent at $\frac\pi2$ (the zero line), and on the concave part it lies above a chord with non-negative end values, so $h \ge 0$. So for all $t$ the maximum temperature $u(\frac\pi2, t)$ lies between $2.467e^{-t}$ and $3.142e^{-t}$; indeed $u(\frac\pi2, \frac12) \approx 1.543$ lies between $1.497$ and $1.905$.
:::
:::

::: quiz
A solution of $u_t = u_{xx}$ on $[0,1]\times[0,2]$ has $u(x,0) = \sin\pi x$, $u(0,t) = 0$ and $u(1,t) = t/4$. Which of the following can be deduced from [[#thm-max]]?
- [x] $0 \le u(x,t) \le 1$ for all $(x,t)$ in the rectangle.
- [ ] $u(x, 2) \le u(x, 0)$ for every $x$.
- [ ] The maximum of $u$ is attained only at $t = 0$.
- [x] $u(x,t) \ge 0$ for all $(x,t)$ in the rectangle.
::: solution
On the parabolic boundary the values are $\sin\pi x \in [0,1]$, $0$, and $t/4 \in [0, \tfrac12]$. By [[#thm-max]], $\min_\Gamma u = 0 \le u \le 1 = \max_\Gamma u$, which gives both correct options. The maximum principle compares the interior with the *whole* parabolic boundary, not with the initial values alone, so it does not imply $u(x,2) \le u(x,0)$ pointwise — which is in fact false: near $x = 1$, $u(x,2)$ is close to $\tfrac12 > \sin\pi x$. Nor does the theorem say that the maximum is attained *only* at $t = 0$; it guarantees only that it is attained somewhere on $\Gamma$. (Here the maximum $1$ happens to be attained only at $(\tfrac12, 0)$, but proving that needs the stronger form of the principle, which is beyond this chapter.)
:::
:::

## Smoothing, decay and irreversibility

The factor $e^{-k(n\pi/L)^2t}$ in [[#eq-heat-series]] explains the character of diffusion.

- **Instant smoothing.** For any $t > 0$, high frequencies are damped by factors like $e^{-cn^2t}$, so the solution is infinitely differentiable even if $f$ has jumps ([[#thm-heat-series]]). Corners and discontinuities disappear at once.
- **Forgetting.** For large $t$ the first mode dominates (if $b_1 \ne 0$) and $u \approx b_1e^{-k\pi^2t/L^2}\sin\frac{\pi x}{L}$. The relaxation time $L^2/(k\pi^2)$ grows like the *square* of the length: diffusion spreads heat over a distance of order $\sqrt{kt}$ in time $t$.
- **Irreversibility.** Running time backwards multiplies the $n$th mode by $e^{+k(n\pi/L)^2t}$, which explodes.

::: warning The heat equation cannot be run backwards
It is tempting to recover an earlier temperature distribution by solving the heat equation "backwards in time" from today's measurements. This problem is **ill posed**. For $u_t = u_{xx}$ on $(0,\pi)$, the data $\frac1n\sin nx$ at time $t = 1$ are tiny for large $n$, yet the only solution with zero end values that attains them came from $u(x, 0) = \frac{e^{n^2}}{n}\sin nx$, which is astronomically large. Arbitrarily small errors in the final data (and all measurements have errors) can correspond to arbitrarily large differences in the initial data. Diffusion destroys information, and that information cannot be recovered without additional assumptions.
:::

::: application Diffusion everywhere
The same equation governs any quantity that spreads by random local motion. Fick's law of diffusion makes the concentration of a dissolved substance satisfy $c_t = D\,c_{xx}$. The probability density of a Brownian particle obeys the heat equation, which links this chapter to random walks and the central limit theorem ([[probability/limit-theorems]]). The Black–Scholes equation for option prices becomes the heat equation after a change of variables. And in image processing, blurring a picture with a Gaussian filter of variance $\sigma^2$ is exactly running the two-dimensional heat equation for time $t = \sigma^2/(2k)$, which is why Gaussian blur removes fine detail (high frequencies) first.
:::

::: history
Joseph Fourier (1768–1830) developed his theory of heat while serving as prefect of the Isère department in Grenoble, an administrative post Napoleon had given him. In 1807 he presented to the Institut de France a memoir deriving the heat equation from the law of conduction now named after him and solving it with trigonometric series. The examiners, among them Lagrange and Laplace, objected to his free use of series for "arbitrary" functions, and the memoir was not published. The Institut then made the propagation of heat the subject of its prize competition for 1811; Fourier's revised entry won the prize in 1812, although the report still criticised its rigour. His results finally appeared in the *Théorie analytique de la chaleur* of 1822, a book whose methods — separation of variables, eigenfunction expansions and the Fourier integral — shaped the next two centuries of mathematical physics.
:::

## Where this leads

Separation of variables reduced the PDE to the eigenvalue problem $X'' + \lambda X = 0$ with boundary conditions. Replacing this by a general second-order operator, with Robin conditions or variable coefficients, leads to [[pde/sturm-liouville]], which guarantees real eigenvalues and orthogonal eigenfunctions in general. On an infinite rod the sum over modes becomes an integral, and the heat equation is solved by convolution with the heat kernel ([[pde/fourier-transform]]). The steady states of the heat equation in two or three dimensions satisfy Laplace's equation ([[pde/laplace-equation]]), whose maximum principle mirrors the one proved here. The wave equation ([[pde/wave-equation]]) is solved by the same separation of variables but behaves completely differently: no smoothing, no decay, and finite speed of propagation. Discretised in space, the heat equation becomes the standard example of a stiff system of ODEs ([[numerical-analysis/numerical-odes]]).

::: summary
- Conservation of energy plus Fourier's law $\phi = -K_0u_x$ gives the heat equation $u_t = k\,u_{xx}$ with diffusivity $k = K_0/(c\rho)$; a well-posed problem needs an initial temperature and one boundary condition (Dirichlet, Neumann or Robin) at each end.
- Separation of variables $u = X(x)T(t)$ leads to the eigenvalue problem $X'' + \lambda X = 0$; with zero end temperatures the eigenvalues are $(n\pi/L)^2$ and the solution is the sine series [[#eq-heat-series]], each mode decaying like $e^{-k(n\pi/L)^2t}$.
- Insulated ends give a cosine series whose constant term, the mean initial temperature, is the final state; total heat is conserved.
- Non-zero constant end temperatures are handled by subtracting the linear steady state.
- The energy $\int u^2\,dx$ decreases, which proves uniqueness ([[#thm-energy-unique]]).
- The maximum principle: the extreme values of a solution occur on the bottom or sides of the space–time rectangle ([[#thm-max]]); it yields comparison, stability and uniqueness.
- Diffusion smooths instantly, forgets exponentially fast on the time scale $L^2/(k\pi^2)$, and cannot be stably reversed.
:::

## Exercises

::: exercise A finite sum of modes {level=1 check="3/4"}
Solve $u_t = 2u_{xx}$ for $0 < x < \pi$, $t > 0$, with $u(0,t) = u(\pi,t) = 0$ and $u(x,0) = 3\sin x - \sin 4x$. Evaluate $u(\pi/2, \ln 2)$.
::: solution
Here $k = 2$ and the modes are $e^{-2n^2t}\sin nx$. The initial data are already a combination of two eigenfunctions, so $b_1 = 3$, $b_4 = -1$ and all other $b_n = 0$:

$$
u(x,t) = 3e^{-2t}\sin x - e^{-32t}\sin 4x.
$$

At $x = \pi/2$, $\sin 4x = \sin 2\pi = 0$, so $u(\pi/2, \ln 2) = 3e^{-2\ln 2} = 3\cdot\frac14 = \frac34$.
:::
:::

::: exercise A steady state {level=1 check="35"}
A rod of length $10$ has its ends held at $u(0,t) = 20$ and $u(10, t) = 80$. Whatever the initial temperature, what is the temperature at $x = 2.5$ after a long time?
::: solution
The solution tends to the steady state $v(x) = 20 + (80 - 20)\frac{x}{10} = 20 + 6x$, because $u - v$ solves the problem with zero end values and decays exponentially. So the limit at $x = 2.5$ is $20 + 15 = 35$.
:::
:::

::: exercise An insulated rod {level=1 check="pi^2/3"}
A rod $0 \le x \le \pi$ with insulated ends has initial temperature $f(x) = x^2$ and $k = 1$. Find $u(x,t)$ and $\lim_{t\to\infty}u(x,t)$.
::: solution
We need the cosine series of $x^2$ on $[0,\pi]$, which is the Fourier series of the even function $x^2$ on $[-\pi,\pi]$: $a_0 = \frac{2\pi^2}{3}$ and $a_n = \frac{4(-1)^n}{n^2}$ ([[pde/fourier-series#ex-xsq]]). By [[#eq-neumann-series]],

$$
u(x,t) = \frac{\pi^2}{3} + 4\sum_{n=1}^{\infty}\frac{(-1)^n}{n^2}e^{-n^2t}\cos nx \;\longrightarrow\; \frac{\pi^2}{3},
$$

the mean value $\frac1\pi\int_0^\pi x^2\,dx$, as conservation of heat requires.
:::
:::

::: exercise One end insulated {level=2 check="1/4"}
Find the eigenvalues and eigenfunctions of $X'' + \lambda X = 0$, $X(0) = 0$, $X'(\pi) = 0$, and solve $u_t = u_{xx}$ on $(0,\pi)$ with $u(0,t) = 0$, $u_x(\pi,t) = 0$, $u(x,0) = \sin\frac x2 + 3\sin\frac{5x}{2}$. At what exponential rate does the solution decay for large $t$?
::: solution
As in [[#prop-dirichlet-eigen]], $\lambda \le 0$ gives only $X = 0$ (for $\lambda = -\mu^2$, $X = B\sinh\mu x$ and $X'(\pi) = B\mu\cosh\mu\pi = 0$ forces $B = 0$; for $\lambda = 0$, $X = Bx$ and $X'(\pi) = B = 0$). For $\lambda = \mu^2 > 0$, $X(0) = 0$ gives $X = B\sin\mu x$, and $X'(\pi) = B\mu\cos\mu\pi = 0$ requires $\mu = n - \frac12$. So

$$
\lambda_n = \left(n - \tfrac12\right)^2, \qquad X_n(x) = \sin\left(n - \tfrac12\right)x, \qquad n = 1, 2, \dots
$$

The initial data are $X_1 + 3X_3$, so $u(x,t) = e^{-t/4}\sin\frac x2 + 3e^{-25t/4}\sin\frac{5x}{2}$. For large $t$ it decays like $e^{-t/4}$: the rate is $\frac14$. (With one end insulated the rod cools more slowly than with both ends at zero, where the slowest rate would be $1$.)
:::
:::

::: exercise Heat loss through the sides {level=2 check="exp(-1)"}
If the rod loses heat through its lateral surface at a rate proportional to its temperature, the equation becomes $u_t = u_{xx} - hu$ with $h > 0$. Show that $u = e^{-ht}w$ transforms it into $w_t = w_{xx}$. Solve the problem with $h = 3$, $u(0,t) = u(\pi,t) = 0$ and $u(x,0) = \sin x$, and evaluate $u(\pi/2, 1/4)$.
::: solution
With $u = e^{-ht}w$ we get $u_t = e^{-ht}(w_t - hw)$ and $u_{xx} = e^{-ht}w_{xx}$, so $u_t - u_{xx} + hu = e^{-ht}(w_t - w_{xx})$, which vanishes exactly when $w_t = w_{xx}$. The boundary and initial conditions are unchanged ($w = u$ at $t = 0$), so $w = e^{-t}\sin x$ and $u = e^{-(1+h)t}\sin x = e^{-4t}\sin x$. Then $u(\pi/2, 1/4) = e^{-1}$.
:::
:::

::: exercise Recovering the past {level=2}
Show that for every $n$ the problem $u_t = u_{xx}$ on $(0,\pi)$, $u(0,t) = u(\pi,t) = 0$, has a solution on $0 \le t \le 1$ with $u(x, 1) = \frac1n\sin nx$, and that it is the only solution of the form [[#eq-heat-series]]. Compute $\max_x\abs{u(x,0)}$ and explain what this says about determining an initial temperature from a final one.
::: solution
$u_n(x,t) = \frac{1}{n}e^{n^2(1-t)}\sin nx$ solves the equation, vanishes at both ends, and equals $\frac1n\sin nx$ at $t = 1$. If $u = \sum b_me^{-m^2t}\sin mx$, then $u(x,1) = \sum b_me^{-m^2}\sin mx$, and by uniqueness of sine coefficients this equals $\frac1n\sin nx$ only if $b_m = 0$ for $m\ne n$ and $b_ne^{-n^2} = \frac1n$. So $u = u_n$, and $\max_x\abs{u_n(x,0)} = \frac{e^{n^2}}{n}$. As $n\to\infty$ the final data tend uniformly to $0$ while the initial data blow up. A measurement error of size $\frac1n$ in the final temperature can therefore hide an initial difference of size $\frac{e^{n^2}}{n}$: the backward problem does not depend continuously on its data.
:::
:::

::: exercise Uniqueness with insulated ends {level=2}
Use the energy method to prove that the problem $u_t = k\,u_{xx}$, $u_x(0,t) = u_x(L,t) = 0$, $u(x,0) = f(x)$ has at most one solution (with the regularity of [[#thm-energy-unique]]). Why can the maximum principle alone not give a uniqueness proof here?
::: solution
If $u_1, u_2$ are solutions, $w = u_1 - u_2$ satisfies the heat equation with $w(x, 0) = 0$ and $w_x = 0$ at both ends. For $E(t) = \int_0^Lw^2\,dx$,

$$
E'(t) = 2k\int_0^Lw\,w_{xx}\,dx = 2k\bigl[w\,w_x\bigr]_0^L - 2k\int_0^Lw_x^2\,dx = -2k\int_0^Lw_x^2\,dx \le 0,
$$

since $w_x(0,t) = w_x(L,t) = 0$. So $0 \le E(t) \le E(0) = 0$ and $w \equiv 0$. The maximum principle only says that the extreme values of $w$ are attained on the parabolic boundary; with Neumann conditions we do not know the *values* of $w$ on the sides, only its slope there, so we cannot conclude that $w = 0$ from [[#thm-max]] directly.
:::
:::

::: exercise Exponential decay of energy {level=3}
Prove **Wirtinger's inequality**: if $w$ is continuous and piecewise smooth on $[0, L]$ with $w(0) = w(L) = 0$, then $\int_0^L(w')^2\,dx \ge \frac{\pi^2}{L^2}\int_0^Lw^2\,dx$. Deduce that a solution of the Dirichlet problem [[#eq-dirichlet-problem]] (regular up to the boundary for $t>0$) satisfies

$$
\int_0^Lu(x,t)^2\,dx \le e^{-2k\pi^2t/L^2}\int_0^Lf(x)^2\,dx.
$$
::: hint
Expand $w$ in a sine series and $w'$ in a cosine series, and compare with Parseval's identity. For the second part, show that $\frac{d}{dt}\bigl(e^{2k\pi^2t/L^2}E(t)\bigr) \le 0$.
:::
::: solution
Let $w = \sum b_n\sin\frac{n\pi x}{L}$ be the sine series. Since the odd periodic extension of $w$ is continuous and piecewise smooth, the cosine coefficients of $w'$ are $\frac{n\pi}{L}b_n$ (integrate by parts as in [[pde/fourier-series#thm-uniform]]; the boundary terms vanish because $w(0) = w(L) = 0$), and the constant coefficient of $w'$ is $\frac{2}{L}\int_0^Lw' = 0$. Parseval's identity on $[-L, L]$, halved by symmetry, gives

$$
\int_0^Lw^2\,dx = \frac L2\sum_{n\ge1}b_n^2, \qquad \int_0^L(w')^2\,dx = \frac{L}{2}\sum_{n\ge1}\frac{n^2\pi^2}{L^2}b_n^2 \ge \frac{\pi^2}{L^2}\cdot\frac L2\sum_{n\ge1}b_n^2,
$$

which is the inequality (with equality only for $w = b_1\sin\frac{\pi x}{L}$). Now let $E(t) = \int_0^Lu^2\,dx$. As in [[#thm-energy-unique]], $E'(t) = -2k\int_0^Lu_x^2\,dx \le -\frac{2k\pi^2}{L^2}E(t)$ for $t > 0$. Hence

$$
\frac{d}{dt}\Bigl(e^{2k\pi^2t/L^2}E(t)\Bigr) = e^{2k\pi^2t/L^2}\Bigl(E'(t) + \frac{2k\pi^2}{L^2}E(t)\Bigr) \le 0,
$$

so $e^{2k\pi^2t/L^2}E(t) \le E(0) = \int_0^Lf^2\,dx$ (using continuity of $E$ at $t = 0$).
:::
:::

::: exercise The maximum temperature never rises {level=3}
Let $u$ be a classical solution of [[#eq-dirichlet-problem]] (zero end temperatures) and let $M(t) = \max_{0\le x\le L}\abs{u(x,t)}$. Prove that $M$ is non-increasing on $[0,\infty)$.
::: solution
Let $0 \le t_1 < t_2$. Apply [[#thm-max]] on the rectangle $[0, L]\times[t_1, t_2]$ (the theorem and its proof are unchanged by shifting the time origin to $t_1$). Its parabolic boundary consists of the segment $t = t_1$, where $\abs{u} \le M(t_1)$, and the two sides, where $u = 0$. Hence for all $x$, $-M(t_1) \le \min_\Gamma u \le u(x, t_2) \le \max_\Gamma u \le M(t_1)$, so $M(t_2) \le M(t_1)$. (The regularity required by [[#thm-max]] holds because a classical solution has continuous $u_t$, $u_{xx}$ for $t > 0$ and is continuous on $[0, L]\times[t_1, t_2]$.)
:::
:::
