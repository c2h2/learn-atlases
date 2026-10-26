A computer cannot store a function, only a list of numbers. The simplest way to turn a differential equation into something a computer can solve is to keep the unknown only at the points of a grid and to replace every derivative by a combination of neighbouring grid values — a **finite difference**. This is the oldest discretisation method in CFD, and even codes that are formally "finite-volume" or "finite-element" use difference formulas inside: for face gradients, for time derivatives, for boundary fluxes. More importantly, finite differences are where the language of numerical analysis is easiest to learn: truncation error, order of accuracy, explicit and implicit time stepping, the modified wavenumber. All of these will be used in every later lesson.

This lesson builds the difference formulas from Taylor series, measures their errors, and uses them to discretise the two model equations of CFD — the heat (diffusion) equation and the linear advection equation — introduced in [[computational-fluid-dynamics/governing-equations]]. Whether those discretisations are *stable* is the subject of the next lesson, [[computational-fluid-dynamics/stability-accuracy]]. The underlying numerical analysis is treated in Maths Atlas ([numerical integration and differentiation](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-integration) and [numerical ODEs](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes)).

## Grids and notation

Lay a uniform grid on the interval $0 \le x \le L$ with **spacing** $h = \Delta x = L/N$ and nodes $x_i = i\,\Delta x$, $i = 0, 1, \dots, N$; in time, use steps $\Delta t$ and levels $t^n = n\,\Delta t$. The value of the exact solution at a node is $\phi(x_i, t^n)$; the value the numerical scheme computes there is written $\phi_i^n$. The two are different numbers, and the whole of numerical analysis is about the size of the difference. In two dimensions a second index is added: $\phi_{i,j}$ at $(x_i, y_j)$.

The picture to hold in mind: a smooth curve $\phi(x)$, sampled at evenly spaced points, and a ruler laid between neighbouring samples. The slope of the ruler approximates the slope of the curve; how well depends on how curved the curve is over the distance $h$.

## Difference formulas from Taylor series

Expand $\phi$ about $x_i$, assuming it has as many continuous derivatives as we need:
$$
\phi_{i\pm1} = \phi_i \pm h\,\phi'_i + \frac{h^2}{2}\phi''_i \pm \frac{h^3}{6}\phi'''_i + \frac{h^4}{24}\phi^{(4)}_i \pm \cdots
$$ {#eq-taylor}
Every difference formula in this lesson comes from adding and subtracting copies of this expansion.

::: definition Truncation error and order of accuracy {#def-truncation}
Let $D_h\phi$ be a difference approximation to a derivative $D\phi$ at a point, built from grid values with spacing $h$. Its **truncation error** is $\tau = D_h\phi - D\phi$, evaluated for the *exact* smooth function $\phi$. If $\tau = C h^p + O(h^{p+1})$ with $C \ne 0$ independent of $h$, the approximation is of **order $p$**; the term $C h^p$ is the **leading error term**.
:::

Order $p$ tells you how the error scales when you refine the grid: halving $h$ divides the error by $2^p$ (a factor 2 for first order, 4 for second order, 16 for fourth order). It says nothing about the size of $C$, which depends on the solution's higher derivatives; a second-order formula can be less accurate than a first-order one on a coarse grid if the solution is rough.

::: proposition Basic difference formulas {#prop-basic-fd}
For $\phi$ smooth enough,
$$
\begin{aligned}
\text{forward:}\quad & \frac{\phi_{i+1} - \phi_i}{h} = \phi'_i + \frac{h}{2}\phi''_i + O(h^2),\\
\text{backward:}\quad & \frac{\phi_i - \phi_{i-1}}{h} = \phi'_i - \frac{h}{2}\phi''_i + O(h^2),\\
\text{central:}\quad & \frac{\phi_{i+1} - \phi_{i-1}}{2h} = \phi'_i + \frac{h^2}{6}\phi'''_i + O(h^4),\\
\text{central second derivative:}\quad & \frac{\phi_{i+1} - 2\phi_i + \phi_{i-1}}{h^2} = \phi''_i + \frac{h^2}{12}\phi^{(4)}_i + O(h^4).
\end{aligned}
$$ {#eq-basic-fd}
The one-sided formulas are first order; the two central formulas are second order.
:::

::: proof
Take [[#eq-taylor]] with the upper sign, subtract $\phi_i$ and divide by $h$: $(\phi_{i+1} - \phi_i)/h = \phi'_i + \tfrac{h}{2}\phi''_i + \tfrac{h^2}{6}\phi'''_i + \cdots$. The backward formula is the same with $h \to -h$. Subtracting the two expansions in [[#eq-taylor]] cancels all even powers: $\phi_{i+1} - \phi_{i-1} = 2h\phi'_i + \tfrac{h^3}{3}\phi'''_i + O(h^5)$; divide by $2h$. Adding them cancels all odd powers: $\phi_{i+1} + \phi_{i-1} = 2\phi_i + h^2\phi''_i + \tfrac{h^4}{12}\phi^{(4)}_i + O(h^6)$; subtract $2\phi_i$ and divide by $h^2$. In each case the error is a sum of terms whose coefficients are derivatives of $\phi$ at $x_i$ — bounded if $\phi$ is smooth — so the error orders are as stated. The cancellations are a consequence of symmetry: a centred stencil has no preferred direction, so odd error terms cannot survive in an even quantity and vice versa.
:::

::: example Measuring the order of accuracy {#ex-order}
Approximate $\phi'(1)$ for $\phi = \sin x$ (exact value $\cos 1 = 0.540302$) with the forward and central formulas for $h = 0.1$ and $h = 0.05$. Compare the errors with the leading terms in [[#eq-basic-fd]] and compute the observed order.
::: solution
| $h$ | forward | error | central | error |
|---|---|---|---|---|
| $0.1$ | $0.497364$ | $-4.294\times10^{-2}$ | $0.539402$ | $-9.001\times10^{-4}$ |
| $0.05$ | $0.519045$ | $-2.126\times10^{-2}$ | $0.540077$ | $-2.251\times10^{-4}$ |

The predicted leading errors at $h = 0.1$ are $\tfrac{h}{2}\phi'' = -0.05\sin 1 = -4.207\times10^{-2}$ (forward) and $\tfrac{h^2}{6}\phi''' = -\tfrac{0.01}{6}\cos 1 = -9.005\times10^{-4}$ (central): very close to the actual errors. The observed order is
$$
p = \frac{\ln(e_{0.1}/e_{0.05})}{\ln 2}:\qquad
p_{\text{forward}} = \frac{\ln(4.294/2.126)}{\ln 2} = 1.01,\qquad
p_{\text{central}} = \frac{\ln(9.001/2.251)}{\ln 2} = 2.00 .
$$
Sanity check: the central formula with $h = 0.1$ is about fifty times more accurate than the forward formula, *for the same two function evaluations*. Symmetry is free accuracy.
:::
:::

### Building any formula: the method of undetermined coefficients

The Taylor-series approach generalises to any stencil. To approximate a derivative from a set of points, write the formula with unknown weights, substitute the Taylor expansions, and choose the weights so that as many low-order terms as possible match.

::: algorithm Method of undetermined coefficients {#alg-undetermined}
To find a formula $\phi^{(m)}_i \approx h^{-m}\sum_{k} a_k\,\phi_{i+k}$ over a chosen set of offsets $k$:
1. Expand each $\phi_{i+k} = \sum_{j\ge 0} (kh)^j\phi^{(j)}_i/j!$.
2. Collect powers: $\sum_k a_k\phi_{i+k} = \sum_j \left(\sum_k a_k k^j\right) h^j\phi^{(j)}_i/j!$.
3. Require $\sum_k a_k k^j = 0$ for $j = 0, 1, \dots$ except $\sum_k a_k k^m = m!$. With $s$ points one can satisfy $s$ such conditions ($j = 0, \dots, s-1$).
4. Solve the linear system for the $a_k$. The first $j$ for which $\sum_k a_k k^j \ne 0$ (with $j > m$) gives the leading error, of order $h^{j-m}$.
:::

::: example A one-sided gradient for a wall heat flux {#ex-wall-flux}
At a wall ($y = 0$) only points on one side are available. Derive a second-order formula for $\phi'_0$ from $\phi_0$, $\phi_1$, $\phi_2$, and use it to find the heat flux into water ($k = 0.60\ \mathrm{W\,m^{-1}\,K^{-1}}$) when a simulation gives $T_0 = 80.0\,^\circ\mathrm{C}$ at the wall, $T_1 = 72.0\,^\circ\mathrm{C}$ at $y = 1.0\ \mathrm{mm}$ and $T_2 = 65.0\,^\circ\mathrm{C}$ at $y = 2.0\ \mathrm{mm}$. Compare with the first-order formula.
::: solution
With offsets $k = 0, 1, 2$ and $m = 1$, step 3 of the algorithm gives
$$
a_0 + a_1 + a_2 = 0,\qquad a_1 + 2a_2 = 1,\qquad a_1 + 4a_2 = 0,
$$
so $a_2 = -\tfrac{1}{2}$, $a_1 = 2$, $a_0 = -\tfrac{3}{2}$:
$$
\phi'_0 \approx \frac{-3\phi_0 + 4\phi_1 - \phi_2}{2h}.
$$
The first unmatched moment is $\sum_k a_k k^3 = 2 - 4 = -2$, so the error is $\tfrac{1}{h}\cdot\tfrac{h^3}{6}(-2)\phi''' = -\tfrac{2}{6}h^2\phi''' = -\tfrac{h^2}{3}\phi'''$: second order. With $h = 1.0\times10^{-3}\ \mathrm{m}$,
$$
\left.\frac{\mathrm{d}T}{\mathrm{d}y}\right|_0 \approx \frac{-3(80.0) + 4(72.0) - 65.0}{2\times10^{-3}} = \frac{-17.0}{2\times10^{-3}} = -8.50\times10^{3}\ \mathrm{K/m},
$$
and the heat flux from the wall into the water is $q = -k\,\mathrm{d}T/\mathrm{d}y = 0.60 \times 8.50\times10^{3} = 5.1\times10^{3}\ \mathrm{W/m^2}$. The first-order formula gives $(72.0 - 80.0)/10^{-3} = -8.0\times10^{3}\ \mathrm{K/m}$ and $q = 4.8\times10^{3}\ \mathrm{W/m^2}$, about $6\,\%$ low: it effectively measures the slope halfway to the first node, where the profile is already flatter. Sanity check: the temperature differences $8.0$ and $7.0\ \mathrm{K}$ over successive millimetres show a profile flattening away from the wall, so the true wall slope must be steeper than the first chord, as the second-order formula says.
:::
:::

The same machinery with offsets $-2, \dots, 2$ gives the fourth-order central formula
$$
\phi'_i \approx \frac{-\phi_{i+2} + 8\phi_{i+1} - 8\phi_{i-1} + \phi_{i-2}}{12h},\qquad \tau = -\frac{h^4}{30}\phi^{(5)}_i + \cdots
$$ {#eq-fourth-order}
— wider stencils buy higher order, at the price of more work, more complicated boundary treatment and larger matrix bandwidth in implicit schemes.

### Round-off: why $h$ cannot be made arbitrarily small

Truncation error falls as $h$ falls, but every grid value is stored with a relative rounding error of about $\varepsilon_{\text{mach}} \approx 1.1\times10^{-16}$ in double precision. In the forward difference the numerator $\phi_{i+1} - \phi_i$ is a small difference of two nearly equal numbers, so its absolute rounding error $\approx 2\varepsilon_{\text{mach}}|\phi|$ is divided by $h$. The total error behaves like
$$
E(h) \approx \frac{h}{2}|\phi''| + \frac{2\varepsilon_{\text{mach}}|\phi|}{h},
$$
minimised at $h^\ast = 2\sqrt{\varepsilon_{\text{mach}}|\phi|/|\phi''|} \approx 10^{-8}$ for $\phi \sim \phi''$. For $\phi = \sin x$ at $x = 1$ the forward-difference error is $4.2\times10^{-5}$ at $h = 10^{-4}$, $3\times10^{-9}$ at $h = 10^{-8}$, then *rises* to $6\times10^{-8}$ at $h = 10^{-10}$ and $4\times10^{-5}$ at $h = 10^{-12}$. In CFD the grid spacing never comes near this limit, but round-off does matter in single-precision codes, on very stretched grids next to walls, and when small pressure differences are computed from large absolute pressures (use gauge pressure in incompressible codes).

## The modified wavenumber

Taylor series tell you how the error scales with $h$. A complementary view, more useful for convection problems, asks how well a formula differentiates a *wave*. Any grid function can be decomposed into Fourier modes, and for a single mode $\phi = e^{\mathrm{i}kx}$ the exact derivative is $\mathrm{i}k\,\phi$. Apply the central difference:
$$
\frac{\phi_{i+1} - \phi_{i-1}}{2h} = \frac{e^{\mathrm{i}kh} - e^{-\mathrm{i}kh}}{2h}\,\phi_i = \mathrm{i}\,\frac{\sin(kh)}{h}\,\phi_i .
$$

::: definition Modified wavenumber {#def-modified-wavenumber}
For a difference formula $D_h$ approximating $\mathrm{d}/\mathrm{d}x$, the **modified wavenumber** $k'$ is defined by $D_h e^{\mathrm{i}kx} = \mathrm{i}k'\,e^{\mathrm{i}kx}$. With the dimensionless wavenumber $\theta = kh \in [0, \pi]$ (from very long waves, $\theta \to 0$, to the shortest wave the grid can carry, two points per wavelength, $\theta = \pi$),
$$
\text{second-order central: } k'h = \sin\theta, \qquad
\text{fourth-order central: } k'h = \frac{8\sin\theta - \sin 2\theta}{6}, \qquad
\text{forward: } k'h = -\mathrm{i}\left(e^{\mathrm{i}\theta} - 1\right) = \sin\theta - \mathrm{i}(\cos\theta - 1).
$$
:::

A perfect formula would have $k'h = \theta$. The central formulas give a *real* $k'$ that is too small: short waves are differentiated as if they were longer, so in a convection problem they travel too slowly — **dispersion error**. The forward formula has an imaginary part, which in a convection problem changes the amplitude of a wave: **dissipation** (or, with the wrong sign, amplification). Both effects are invisible in a Taylor-series count of order but dominate what a simulation of a sharp front looks like.

::: widget plot
f: x; sin(x); (8*sin(x) - sin(2*x))/6
x: 0, pi
y: 0, 3.2
labels: \text{exact } \theta; \text{2nd-order central}; \text{4th-order central}
points: 0.6283, 0.5878; 1.5708, 1
caption: Modified wavenumber $k'h$ against $\theta = kh$. A wave resolved by $10$ points per wavelength ($\theta = 2\pi/10 = 0.63$, left dot) is differentiated almost correctly by both central formulas; at $4$ points per wavelength ($\theta = \pi/2$, right dot) the second-order formula gives $1$ instead of $1.57$ — a $36\,\%$ error. At $\theta = \pi$ both formulas return zero: the sawtooth $\phi_i = (-1)^i$ is invisible to a centred first derivative. Notice how far to the right the fourth-order curve hugs the exact line: higher order buys resolution of shorter waves, which is why spectral-like schemes are used for turbulence simulation.
:::

::: example Points per wavelength {#ex-ppw}
How many grid points per wavelength does the second-order central difference need for the first derivative of a sinusoid to be accurate to $1\,\%$? Repeat for the fourth-order formula.
::: solution
Require $k'/k = \sin\theta/\theta \ge 0.99$. Since $\sin\theta/\theta \approx 1 - \theta^2/6$, a first estimate is $\theta \approx \sqrt{0.06} = 0.245$; solving $\sin\theta/\theta = 0.99$ numerically gives $\theta = 0.2453$. Points per wavelength $= 2\pi/\theta = 25.6$.

For the fourth-order formula, $(8\sin\theta - \sin2\theta)/(6\theta) = 0.99$ gives $\theta = 0.7527$ (expansion: $1 - \theta^4/30 = 0.99$ gives $\theta \approx 0.74$), so $2\pi/\theta = 8.3$ points per wavelength. Sanity check: the fourth-order formula needs about a third as many points per wavelength — per dimension. In three dimensions that is a factor of about $27$ fewer grid points for the same accuracy on wave-like solutions.
:::
:::

## Model equation 1: the heat equation

Consider one-dimensional unsteady conduction, $\partial T/\partial t = \alpha\,\partial^2T/\partial x^2$ on $0 < x < L$, with the end temperatures given and an initial profile. Discretise space with the central second difference; the question is how to discretise time.

::: definition Explicit and implicit schemes for the heat equation {#def-heat-schemes}
With the **diffusion number** $d = \alpha\Delta t/\Delta x^2$,
- **FTCS** (forward time, centred space; explicit Euler): $T_i^{n+1} = T_i^n + d\left(T_{i+1}^n - 2T_i^n + T_{i-1}^n\right)$;
- **BTCS** (backward time, centred space; implicit Euler): $-d\,T_{i-1}^{n+1} + (1 + 2d)T_i^{n+1} - d\,T_{i+1}^{n+1} = T_i^n$;
- **Crank–Nicolson**: the average of the two right-hand sides,
$$
-\tfrac{d}{2}T_{i-1}^{n+1} + (1 + d)T_i^{n+1} - \tfrac{d}{2}T_{i+1}^{n+1} = \tfrac{d}{2}T_{i-1}^{n} + (1 - d)T_i^{n} + \tfrac{d}{2}T_{i+1}^{n}.
$$
:::

FTCS gives each new value directly from old values: cheap, simple and — as the next lesson proves — stable only if $d \le \tfrac{1}{2}$. BTCS and Crank–Nicolson couple the new values of neighbouring nodes, so each step needs the solution of a tridiagonal linear system; in return they are stable for every $\Delta t$.

::: proposition Local truncation errors of the heat-equation schemes {#prop-heat-te}
For a smooth solution of $T_t = \alpha T_{xx}$, the truncation errors of FTCS and BTCS are $O(\Delta t) + O(\Delta x^2)$, and that of Crank–Nicolson is $O(\Delta t^2) + O(\Delta x^2)$.
:::

::: proof
Write FTCS as $\left(T_i^{n+1} - T_i^n\right)/\Delta t - \alpha\left(T_{i+1}^n - 2T_i^n + T_{i-1}^n\right)/\Delta x^2 = 0$ and insert the exact solution. By [[#eq-basic-fd]] the time difference is $T_t + \tfrac{\Delta t}{2}T_{tt} + O(\Delta t^2)$ and the space difference is $T_{xx} + \tfrac{\Delta x^2}{12}T_{xxxx} + O(\Delta x^4)$, both at $(x_i, t^n)$. Since $T_t - \alpha T_{xx} = 0$, the residual is $\tau = \tfrac{\Delta t}{2}T_{tt} - \tfrac{\alpha\Delta x^2}{12}T_{xxxx} + \cdots$. BTCS is the same expansion about $t^{n+1}$, with $-\tfrac{\Delta t}{2}T_{tt}$. For Crank–Nicolson expand about the midpoint $t^{n+1/2}$: the time difference is a central difference, error $\tfrac{\Delta t^2}{24}T_{ttt}$, and the average of the spatial operator at $n$ and $n+1$ equals its value at $n + \tfrac12$ plus $\tfrac{\Delta t^2}{8}\partial_t^2(\alpha T_{xx})$. Both are $O(\Delta t^2)$.
:::

::: example One explicit step and two {#ex-ftcs}
A thin rod of length $60\ \mathrm{mm}$, $\alpha = 1.0\times10^{-5}\ \mathrm{m^2/s}$, is initially at $100\,^\circ\mathrm{C}$; at $t = 0$ both ends are plunged to $0\,^\circ\mathrm{C}$. Use FTCS with $\Delta x = 10\ \mathrm{mm}$ (nodes $0$ to $6$) and $\Delta t = 2.0\ \mathrm{s}$ to compute two time steps.
::: solution
$d = \alpha\Delta t/\Delta x^2 = 1.0\times10^{-5} \times 2.0/(0.010)^2 = 0.20$. Initially $T = (0, 100, 100, 100, 100, 100, 0)$ (the corner values at the ends are taken as the boundary value). Step 1: only nodes next to the ends feel a nonzero second difference: $T_1^1 = 100 + 0.2(0 - 200 + 100) = 80$, likewise $T_5^1 = 80$; nodes $2$–$4$ stay at $100$. Step 2: $T_1^2 = 80 + 0.2(0 - 160 + 100) = 68$, $T_2^2 = 100 + 0.2(80 - 200 + 100) = 96$, $T_3^2 = 100$, and symmetrically $T_4^2 = 96$, $T_5^2 = 68$:
$$
T^{2} = (0,\ 68,\ 96,\ 100,\ 96,\ 68,\ 0)\ ^\circ\mathrm{C}\quad\text{at } t = 4\ \mathrm{s}.
$$
Sanity check: the cooling wave advances exactly one node per step — the explicit stencil cannot carry information further — and every new value is a weighted average of old values with weights $d$, $1 - 2d$, $d$ all positive, so no value can overshoot the range $[0, 100]$. That positivity is lost when $d > \tfrac12$, the heart of the stability limit.
:::
:::

::: example One implicit step and the Thomas algorithm {#ex-btcs}
A rod of length $40\ \mathrm{mm}$ ($\Delta x = 10\ \mathrm{mm}$, interior nodes $1$–$3$) starts at $100\,^\circ\mathrm{C}$ with ends held at $0\,^\circ\mathrm{C}$; $\alpha = 1.0\times10^{-5}\ \mathrm{m^2/s}$. Take one BTCS step with $\Delta t = 10\ \mathrm{s}$.
::: solution
$d = 10^{-5} \times 10/10^{-4} = 1.0$ — twice the FTCS limit. The BTCS equations, with the zero end values moved to the right-hand side, are
$$
\begin{pmatrix} 3 & -1 & 0 \\ -1 & 3 & -1 \\ 0 & -1 & 3 \end{pmatrix}
\begin{pmatrix} T_1 \\ T_2 \\ T_3 \end{pmatrix}
= \begin{pmatrix} 100 \\ 100 \\ 100 \end{pmatrix}.
$$
Solve by forward elimination and back substitution (the **Thomas algorithm**, detailed in [[computational-fluid-dynamics/linear-solvers]]). Row 1: $T_1 = 33.33 + T_2/3$. Substitute into row 2: $(3 - \tfrac13)T_2 - T_3 = 100 + 33.33$, i.e. $T_2 = 50 + \tfrac38T_3$. Substitute into row 3: $(3 - \tfrac38)T_3 = 100 + 50$, so $T_3 = 150/2.625 = 57.14$. Back-substitute: $T_2 = 50 + 0.375 \times 57.14 = 71.43$, $T_1 = 33.33 + 71.43/3 = 57.14\,^\circ\mathrm{C}$.

Sanity check: the solution is symmetric, below $100\,^\circ\mathrm{C}$ everywhere and positive. All three nodes changed in one step: an implicit scheme spreads information across the whole domain in a single step, as the parabolic equation demands. FTCS at $d = 1$ would have given $T_1 = 100 + 1(0 - 200 + 100) = 0$ and $T_2 = 100$ — already a poor, oscillation-prone answer.
:::
:::

## Model equation 2: linear advection

The other prototype is pure convection of a scalar at constant speed $a > 0$: $\partial\phi/\partial t + a\,\partial\phi/\partial x = 0$, whose exact solution $\phi(x, t) = \phi_0(x - at)$ translates the initial profile unchanged. It is the simplest hyperbolic equation, and it is a merciless test: any scheme that smears, wiggles or shifts a moving front is exposed immediately.

::: definition Two explicit schemes for advection {#def-advection-schemes}
With the **Courant number** $C = a\Delta t/\Delta x$,
- **FTCS**: $\phi_i^{n+1} = \phi_i^n - \tfrac{C}{2}\left(\phi_{i+1}^n - \phi_{i-1}^n\right)$ — central in space;
- **FTBS** or **first-order upwind** (for $a > 0$): $\phi_i^{n+1} = \phi_i^n - C\left(\phi_i^n - \phi_{i-1}^n\right)$ — the space difference looks *upstream*, where the information comes from.
:::

The upwind scheme can be rewritten as $\phi_i^{n+1} = (1 - C)\phi_i^n + C\phi_{i-1}^n$: for $0 \le C \le 1$ the new value is a weighted average of two old values, so it cannot create new maxima or minima. At $C = 1$ it is exact — $\phi_i^{n+1} = \phi_{i-1}^n$ shifts the profile one cell per step, exactly as the true solution does. The FTCS scheme for advection looks more accurate (second order in space) but, as the next lesson shows, it is unstable for every $\Delta t > 0$.

::: example Upwinding a step {#ex-upwind}
A step profile $\phi = 1$ for $i \le 2$ and $\phi = 0$ for $i \ge 3$ is advected with $C = 0.5$ by the upwind scheme. Compute two steps.
::: solution
$\phi_i^{n+1} = 0.5\phi_i^n + 0.5\phi_{i-1}^n$. From $(1, 1, 1, 0, 0, 0)$ for $i = 0, \dots, 5$ (the inflow value $\phi_0 = 1$ is held fixed):
$$
\phi^1 = (1,\ 1,\ 1,\ 0.5,\ 0,\ 0),\qquad \phi^2 = (1,\ 1,\ 1,\ 0.75,\ 0.25,\ 0).
$$
The exact solution after two steps has moved the step by $2C\Delta x = 1$ cell, so it is $(1, 1, 1, 1, 0, 0)$. The upwind solution has the right mean position (the $\phi = 0.5$ crossing lies between nodes 3 and 4, at $x \approx 3.5\Delta x$, which is where the exact step now is) but a smeared front, and the smearing grows with every step. That is **numerical diffusion**; the next lesson shows that upwinding behaves like the exact equation plus an artificial diffusion coefficient $\tfrac12 a\Delta x(1 - C)$. Sanity check: the values stay between $0$ and $1$ and the total $\sum\phi_i$ increases by exactly $C = 0.5$ per step, the amount that flowed in through the left boundary — the scheme is conservative.
:::
:::

::: warning Do not difference against the wind
For advection the direction of the one-sided difference is not a matter of taste. With $a > 0$, the forward difference $\phi_i^{n+1} = \phi_i^n - C(\phi_{i+1}^n - \phi_i^n)$ ("downwind") takes information from where the fluid is *going*. It is unconditionally unstable: write it as $\phi_i^{n+1} = (1 + C)\phi_i^n - C\phi_{i+1}^n$, with a negative weight, and errors grow by a factor up to $1 + 2C$ per step. Codes choose the upwind side according to the sign of the local velocity (or of the face mass flux), cell by cell; hard-coding the direction is a classic bug that appears only when the flow reverses — in a recirculation zone.
:::

### Explicit time stepping and stiffness

Once space has been discretised, the PDE becomes a large system of ordinary differential equations in time, $\mathrm{d}\boldsymbol{\phi}/\mathrm{d}t = \mathbf{A}\boldsymbol{\phi} + \mathbf{b}$ — the **method of lines**. Any ODE integrator can then be used. For the heat equation the eigenvalues of $\mathbf{A}$ range from about $-\alpha\pi^2/L^2$ (the slow, smooth mode) to about $-4\alpha/\Delta x^2$ (the fast sawtooth). The explicit Euler method is stable only if $|1 + \lambda\Delta t| \le 1$ for every eigenvalue, which gives $\Delta t \le 2/(4\alpha/\Delta x^2) = \Delta x^2/(2\alpha)$, the FTCS limit again. The ratio of fastest to slowest rates grows like $(L/\Delta x)^2$: the system is **stiff**, and an explicit method spends almost all its steps resolving a sawtooth mode that has long since decayed.

::: widget odesolver
f: -20*y
y0: 1
t: 0, 1
exact: exp(-20*t)
h: 0.12
methods: euler; heun; rk4
caption: A single stiff mode $y' = \lambda y$ with $\lambda = -20\ \mathrm{s^{-1}}$, like the sawtooth mode of a fine conduction grid. With $h = 0.12$, $|1 + \lambda h| = 1.4 > 1$ and explicit Euler oscillates with growing amplitude even though the exact solution has decayed to nothing. Reduce $h$ below $2/20 = 0.1$ and Euler becomes stable; below $0.05$ it stops oscillating. The higher-order explicit methods have somewhat larger stability regions but the same character. Implicit methods, such as BTCS, have no such limit.
:::

::: quiz
For FTCS on the heat equation, the grid spacing is halved to improve accuracy while the diffusion number $d$ is kept at its stable maximum. By what factor does the computing time to reach a fixed final time grow in one dimension?
- [ ] $2$
- [ ] $4$
- [x] $8$
- [ ] $16$
::: solution
Halving $\Delta x$ doubles the number of nodes. Keeping $d = \alpha\Delta t/\Delta x^2$ fixed forces $\Delta t$ down by a factor of $4$, so four times as many steps are needed. Work $\propto$ nodes $\times$ steps $= 2 \times 4 = 8$. In three dimensions the factor is $2^3 \times 4 = 32$ — the main reason why implicit methods are preferred for diffusion-dominated problems.
:::
:::

::: application Where these formulas live in a real code
A general-purpose finite-volume code uses the central second difference (in flux form) for every diffusion term, upwind-biased differences for convection, one-sided formulas such as the one in [[#ex-wall-flux]] for wall heat fluxes and shear stresses in post-processing, and implicit Euler or a second-order backward formula, $\left(3\phi^{n+1} - 4\phi^n + \phi^{n-1}\right)/(2\Delta t)$, for time. The "second-order accurate" label on a commercial code's settings refers to exactly these Taylor-series orders.
:::

::: history
Lewis Fry Richardson's 1911 paper on the stresses in a masonry dam (*Philosophical Transactions of the Royal Society A*, vol. 210) is generally taken as the start of the systematic use of finite differences for partial differential equations; it also introduced the idea of combining results on two grids to cancel the leading error term, now called Richardson extrapolation ([[computational-fluid-dynamics/meshing-verification]]). John Crank and Phyllis Nicolson published the scheme that bears their names in 1947 (*Proceedings of the Cambridge Philosophical Society*), in a study of heat conduction with internal heat generation, where they noted the instability of explicit methods at large time steps. The tridiagonal elimination of [[#ex-btcs]] is known as the Thomas algorithm after Llewellyn H. Thomas, who described it in a 1949 report from the Watson Scientific Computing Laboratory at Columbia University.
:::

::: summary
- Finite differences replace derivatives by weighted sums of grid values; the weights come from Taylor series, [[#eq-taylor]], or the method of undetermined coefficients.
- Forward and backward differences are first order; central differences for first and second derivatives are second order, [[#eq-basic-fd]]; halving $h$ divides an order-$p$ error by $2^p$.
- One-sided formulas such as $(-3\phi_0 + 4\phi_1 - \phi_2)/(2h)$ keep second order at boundaries.
- Round-off sets a floor below which smaller $h$ makes the derivative worse.
- The modified wavenumber shows dispersion (central schemes: short waves too slow) and dissipation (one-sided schemes); the sawtooth $(-1)^i$ is invisible to central first differences.
- For the heat equation FTCS is explicit and limited to $d \le \tfrac12$; BTCS and Crank–Nicolson are implicit, need a tridiagonal solve per step, and have no such limit.
- For advection, upwind differencing is bounded and exact at $C = 1$ but diffusive; FTCS and downwind differencing are unstable.
:::

## Exercises

::: exercise A central difference {level=1 check="1.00167"}
Use the central difference with $h = 0.1$ to approximate the derivative of $e^x$ at $x = 0$, and compare the error with the leading term $\tfrac{h^2}{6}\phi'''$. (Enter the approximation to five decimal places.)
::: solution
$(e^{0.1} - e^{-0.1})/0.2 = \sinh(0.1)/0.1 = 1.001668$. The exact value is $1$, so the error is $1.668\times10^{-3}$; the leading term is $0.01/6 \times 1 = 1.667\times10^{-3}$. The next term, $h^4/120$, accounts for the remaining $10^{-6}$.
:::
:::

::: exercise A forward difference on a cubic {level=1 check="0.31"}
For $\phi = x^3$, compute the error of the forward difference for $\phi'(1)$ with $h = 0.1$, and compare it with the leading term $\tfrac{h}{2}\phi''$. (Enter the error.)
::: solution
$(1.1^3 - 1)/0.1 = 0.331/0.1 = 3.31$; the exact derivative is $3$, so the error is $0.31$. The leading term is $0.05 \times 6 = 0.30$; the remainder $\tfrac{h^2}{6}\phi''' = 0.01 \times 6/6 = 0.01$ completes the sum exactly, because the Taylor series of a cubic stops after the third derivative.
:::
:::

::: exercise Second derivative of a quartic {level=1 check="12.02"}
Apply the central second difference with $h = 0.1$ to $\phi = x^4$ at $x = 1$. (Enter the approximation.)
::: solution
$(1.1^4 - 2 + 0.9^4)/0.01 = (1.4641 - 2 + 0.6561)/0.01 = 12.02$. The exact value is $12$; the error $0.02$ equals $\tfrac{h^2}{12}\phi^{(4)} = \tfrac{0.01}{12} \times 24 = 0.02$ exactly, since all higher derivatives of $x^4$ vanish.
:::
:::

::: exercise Observed order from two grids {level=2 check="3"}
A code computes a derivative with error $3.2\times10^{-3}$ on a grid of spacing $h$ and $4.0\times10^{-4}$ on a grid of spacing $h/2$. What is the observed order of accuracy? Suggest which kind of formula it might be using. (Enter the order $p$.)
::: solution
$p = \ln(3.2\times10^{-3}/4.0\times10^{-4})/\ln 2 = \ln 8/\ln 2 = 3$. An odd order is typical of an upwind-biased formula on a stencil of four points, such as the third-order upwind-biased formula $(2\phi_{i+1} + 3\phi_i - 6\phi_{i-1} + \phi_{i-2})/(6h)$: a centred four-point stencil would cancel the odd error term and give even order.
:::
:::

::: exercise Explicit time-step limit {level=2 check="0.1667"}
A steel plate ($\alpha = 1.2\times10^{-5}\ \mathrm{m^2/s}$) is modelled by FTCS with $\Delta x = 2.0\ \mathrm{mm}$. Using the condition $d \le \tfrac12$, find the largest permitted time step, and the number of steps to simulate one minute. (Enter $\Delta t$ in seconds to four decimal places.)
::: solution
$\Delta t \le \Delta x^2/(2\alpha) = (2.0\times10^{-3})^2/(2 \times 1.2\times10^{-5}) = 4.0\times10^{-6}/2.4\times10^{-5} = 0.1667\ \mathrm{s}$, so one minute needs $360$ steps. Halving $\Delta x$ would need four times as many.
:::
:::

::: exercise An implicit step by hand {level=2 check="66.67"}
A rod with two interior nodes, ends at $0\,^\circ\mathrm{C}$ and both interior nodes initially at $100\,^\circ\mathrm{C}$, is advanced one BTCS step with $d = 0.5$. Find the new temperature at the interior nodes. (Enter it in $^\circ\mathrm{C}$ to two decimal places.)
::: solution
The equations are $2T_1 - 0.5T_2 = 100$ and $-0.5T_1 + 2T_2 = 100$. By symmetry $T_1 = T_2 = T$ and $1.5T = 100$, so $T = 66.67\,^\circ\mathrm{C}$. FTCS with $d = 0.5$ would give $100 + 0.5(0 - 200 + 100) = 50\,^\circ\mathrm{C}$. The two first-order schemes bracket the exact solution of the semi-discrete equations, $100\,e^{-0.5} = 60.65\,^\circ\mathrm{C}$ (the symmetric mode of this two-node system decays at the rate $\alpha/\Delta x^2$, and $d = 0.5$ means $\alpha\Delta t/\Delta x^2 = 0.5$).
:::
:::

::: exercise Resolution for a wave {level=2 check="25.6"}
A convection scheme uses the second-order central difference for $\partial\phi/\partial x$. Using the modified wavenumber, find the number of points per wavelength needed for the phase speed of a sinusoid to be within $1\,\%$ of the exact value. (Enter the number of points per wavelength to one decimal place.)
::: solution
In semi-discrete advection the numerical phase speed is $a\,k'/k = a\sin\theta/\theta$. Setting $\sin\theta/\theta = 0.99$ gives $\theta = 0.2453$, so $2\pi/\theta = 25.6$ points per wavelength, as in [[#ex-ppw]].
:::
:::

::: exercise A boundary formula for the second derivative {level=3}
Use the method of undetermined coefficients to find the four-point one-sided formula $\phi''_0 \approx (a_0\phi_0 + a_1\phi_1 + a_2\phi_2 + a_3\phi_3)/h^2$ of the highest possible order, and give its leading error term. Why might a code prefer a lower-order boundary formula in practice?
::: solution
Conditions $\sum a_k k^j = 0$ for $j = 0, 1, 3$ and $\sum a_k k^2 = 2$:
$$
a_0 + a_1 + a_2 + a_3 = 0,\quad a_1 + 2a_2 + 3a_3 = 0,\quad a_1 + 4a_2 + 9a_3 = 2,\quad a_1 + 8a_2 + 27a_3 = 0 .
$$
The solution is $a_0 = 2$, $a_1 = -5$, $a_2 = 4$, $a_3 = -1$: $\phi''_0 \approx (2\phi_0 - 5\phi_1 + 4\phi_2 - \phi_3)/h^2$. Then $\sum a_k k^4 = -5 + 64 - 81 = -22$, so the error is $\tfrac{-22}{24}h^2\phi^{(4)} = -\tfrac{11}{12}h^2\phi^{(4)}$: second order, with a constant eleven times that of the central formula. Wide one-sided stencils have large error constants, can degrade the stability of an implicit scheme (they add entries outside the tridiagonal band and coefficients of mixed sign), and amplify noise; a lower-order but compact boundary treatment is often the better engineering choice, and it does not reduce the global order of a second-order scheme for diffusion problems.
:::
:::

::: exercise Choosing a scheme for a design study {level=3}
You must compute the transient temperature in a $20\ \mathrm{mm}$ thick aluminium wall ($\alpha = 9.7\times10^{-5}\ \mathrm{m^2/s}$) heated on one face, for $10$ minutes, with $\Delta x = 0.5\ \mathrm{mm}$ to resolve a thin surface layer. Compare the cost of FTCS and of Crank–Nicolson with $\Delta t = 0.5\ \mathrm{s}$, discuss accuracy, and recommend a scheme. Are there situations in which you would still choose FTCS?
::: solution
FTCS: $\Delta t \le \Delta x^2/(2\alpha) = (5\times10^{-4})^2/(1.94\times10^{-4}) = 1.29\times10^{-3}\ \mathrm{s}$, so $600\ \mathrm{s}$ needs about $4.7\times10^{5}$ steps on $41$ nodes — each step trivial, total about $2\times10^7$ node updates. Crank–Nicolson with $\Delta t = 0.5\ \mathrm{s}$ needs $1200$ steps, each a tridiagonal solve costing about $8$ operations per node: roughly $4\times10^{5}$ operations, some fifty times cheaper. Accuracy: with $d = 9.7\times10^{-5} \times 0.5/(5\times10^{-4})^2 = 194$, Crank–Nicolson is stable but its amplification factor for the shortest waves is near $-1$, so sharp initial features (a sudden surface heating) produce slowly decaying grid-scale oscillations; a few BTCS start-up steps, or a smaller first time step, cure this. BTCS alone is first order in time and needs smaller steps for the same accuracy. FTCS remains attractive when the physics itself needs tiny time steps (fast transients, explicit coupling to other explicit solvers), on massively parallel hardware where linear solves are costly, or for very coarse grids. Recommendation: Crank–Nicolson (or second-order backward differencing) with a short implicit start-up.
:::
:::
