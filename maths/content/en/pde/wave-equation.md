Pluck a guitar string and it vibrates, sending out a musical note. Sound, light, ripples on a pond and the shaking of the ground in an earthquake are all waves, and in the simplest setting they obey the **wave equation**

$$
u_{tt} = c^2u_{xx}.
$$

It differs from the heat equation $u_t = k\,u_{xx}$ of [[pde/heat-equation]] only in having a second time derivative instead of a first, yet its solutions behave in an entirely different way. Heat diffuses, smooths and forgets; a wave travels at a definite speed $c$, keeps its shape, carries its corners with it, and conserves its energy forever.

This chapter derives the equation for a vibrating string and then solves it in two complementary ways. **D'Alembert's formula** writes every solution on the line as the sum of a wave moving left and a wave moving right; it makes the finite speed of propagation and the reflection of waves at a fixed end completely transparent. **Separation of variables** on a finite string produces the **normal modes** — the fundamental note and its overtones — and explains why a string sounds musical. The two pictures are reconciled by a trigonometric identity. Finally, conservation of energy gives uniqueness, and a comparison with the heat equation summarises what makes hyperbolic equations different from parabolic ones.

## The vibrating string

Consider a string stretched between two points on the $x$-axis under tension $T_0$, with mass per unit length $\rho$. Let $u(x,t)$ be the vertical displacement of the point at horizontal position $x$ at time $t$. We assume the vibrations are small, in the sense that the slope $u_x$ is small, and that each point of the string moves only vertically. We ignore gravity and air resistance.

The tension acts along the string. At the right end of a short piece $[a, b]$ it pulls with force $T_0$ at angle $\theta(b,t)$ to the horizontal, where $\tan\theta = u_x$, and at the left end it pulls in the opposite direction. The vertical components are $T_0\sin\theta$. For small slopes $\sin\theta \approx \tan\theta = u_x$ (the error is of order $u_x^3$), so the net vertical force on the piece is

$$
T_0u_x(b,t) - T_0u_x(a,t) = \int_a^b T_0u_{xx}(x,t)\,dx.
$$

(The horizontal components $T_0\cos\theta \approx T_0$ cancel to the same accuracy, which is consistent with assuming horizontal immobility and constant tension.) Newton's second law for the piece, whose momentum is $\int_a^b\rho u_t\,dx$, gives $\int_a^b\rho\,u_{tt}\,dx = \int_a^bT_0u_{xx}\,dx$ for every interval $[a, b]$, hence, as in the derivation of the heat equation,

$$
u_{tt} = c^2u_{xx}, \qquad c = \sqrt{\frac{T_0}{\rho}}.
$$ {#eq-wave}

The constant $c$ has units of speed, and we shall see that it is the speed at which disturbances travel along the string. Tighter strings ($T_0$ larger) and lighter strings ($\rho$ smaller) carry faster waves. An external force density $F(x,t)$ (such as gravity) adds a term: $\rho u_{tt} = T_0u_{xx} + F$; air resistance proportional to velocity gives the damped equation $u_{tt} + 2\gamma u_t = c^2u_{xx}$.

The same equation describes small longitudinal vibrations of an elastic rod, sound waves in a pipe (where $u$ is the pressure fluctuation), and each component of the electromagnetic field in a vacuum (with $c$ the speed of light). In two and three dimensions it becomes $u_{tt} = c^2\Delta u$, the equation of a vibrating membrane or of sound in air.

Because the equation is second order in time, we need **two** initial conditions: the initial displacement $u(x,0) = \varphi(x)$ and the initial velocity $u_t(x,0) = \psi(x)$. A plucked string starts from a displaced shape at rest ($\psi = 0$); a piano string is struck by a hammer, which gives it an initial velocity ($\varphi = 0$).

## D'Alembert's solution on the whole line

We first ignore the ends of the string and solve [[#eq-wave]] for all $x \in \R$. The key is to change to the **characteristic coordinates**

$$
\xi = x + ct, \qquad \eta = x - ct,
$$

along which, as we will see, information travels.

::: theorem General solution of the wave equation {#thm-general}
A function $u \in C^2(\R^2)$ satisfies $u_{tt} = c^2u_{xx}$ on $\R^2$ if and only if

$$
u(x,t) = F(x + ct) + G(x - ct)
$$

for some functions $F, G \in C^2(\R)$.
:::

::: proof
If $u = F(x+ct) + G(x-ct)$, the chain rule gives $u_{tt} = c^2F'' + c^2G''$ and $u_{xx} = F'' + G''$, so $u_{tt} = c^2u_{xx}$.

Conversely, let $u$ be a $C^2$ solution and define $v(\xi, \eta) = u\bigl(\frac{\xi + \eta}{2}, \frac{\xi - \eta}{2c}\bigr)$, so that $u(x,t) = v(x + ct, x - ct)$. By the chain rule, $v_\xi = \frac12u_x + \frac{1}{2c}u_t$, and differentiating again with respect to $\eta$ (where $\partial x/\partial\eta = \frac12$ and $\partial t/\partial\eta = -\frac1{2c}$),

$$
v_{\xi\eta} = \frac14u_{xx} - \frac{1}{4c}u_{xt} + \frac{1}{4c}u_{tx} - \frac{1}{4c^2}u_{tt} = \frac{1}{4c^2}\bigl(c^2u_{xx} - u_{tt}\bigr) = 0,
$$

using the equality of mixed partial derivatives of a $C^2$ function. So $v_\xi$ does not depend on $\eta$: $v_\xi(\xi,\eta) = f(\xi)$ for a continuous function $f$ (namely $f(\xi) = v_\xi(\xi, 0)$). Let $F$ be an antiderivative of $f$. Then $\partial_\xi\bigl(v - F(\xi)\bigr) = 0$, so $v - F(\xi)$ depends only on $\eta$; call it $G(\eta)$. Thus $v = F(\xi) + G(\eta)$. Finally $F' = v_\xi(\cdot, 0)$ is $C^1$, so $F \in C^2$, and $G(\eta) = v(0, \eta) - F(0)$ is $C^2$.
:::

The function $G(x - ct)$ is the graph of $G$ translated to the right by $ct$: a wave of fixed shape moving right at speed $c$. Likewise $F(x + ct)$ moves left. **Every solution of the wave equation on the line is the superposition of a right-moving and a left-moving wave.** Now we fit the initial conditions.

::: theorem D'Alembert's formula {#thm-dalembert}
Let $\varphi \in C^2(\R)$ and $\psi \in C^1(\R)$. The initial value problem

$$
u_{tt} = c^2u_{xx}\ \ (x\in\R,\ t\in\R), \qquad u(x,0) = \varphi(x), \qquad u_t(x,0) = \psi(x)
$$

has exactly one solution $u \in C^2(\R^2)$, namely

$$
u(x,t) = \frac{\varphi(x + ct) + \varphi(x - ct)}{2} + \frac{1}{2c}\int_{x-ct}^{x+ct}\psi(s)\,ds.
$$ {#eq-dalembert}
:::

::: proof
*Uniqueness and derivation.* By [[#thm-general]] any solution has the form $u = F(x+ct) + G(x-ct)$. The initial conditions say

$$
F(x) + G(x) = \varphi(x), \qquad cF'(x) - cG'(x) = \psi(x).
$$

Integrating the second equation from $0$ to $x$ gives $F(x) - G(x) = \frac1c\int_0^x\psi(s)\,ds + K$ with $K = F(0) - G(0)$. Adding and subtracting this and the first equation,

$$
F(x) = \frac{\varphi(x)}{2} + \frac{1}{2c}\int_0^x\psi + \frac K2, \qquad G(x) = \frac{\varphi(x)}{2} - \frac{1}{2c}\int_0^x\psi - \frac K2.
$$

Then $F(x + ct) + G(x - ct)$ is exactly [[#eq-dalembert]] — the constants $\pm\frac K2$ cancel and $\int_0^{x+ct}\psi - \int_0^{x-ct}\psi = \int_{x-ct}^{x+ct}\psi$. So there is at most one solution, and it must be [[#eq-dalembert]].

*Existence.* Conversely, the functions $F$ and $G$ above are $C^2$ (because $\varphi\in C^2$ and $\int_0^x\psi$ has the $C^1$ derivative $\psi$), so by [[#thm-general]] the formula defines a $C^2$ solution. At $t = 0$ it gives $\varphi(x)$, and differentiating under the integral sign (by the fundamental theorem of calculus),

$$
u_t(x, 0) = \frac{c\varphi'(x) - c\varphi'(x)}{2} + \frac{1}{2c}\bigl(c\,\psi(x) + c\,\psi(x)\bigr) = \psi(x). 
$$
:::

::: example A hump splits in two {#ex-hump}
Solve the wave equation with $\varphi(x) = e^{-x^2}$ and $\psi = 0$.
::: solution
By [[#eq-dalembert]],

$$
u(x,t) = \tfrac12e^{-(x + ct)^2} + \tfrac12e^{-(x - ct)^2}.
$$

At $t = 0$ the two halves coincide and form the original hump. As time passes, one copy of half the height travels left and the other right, each at speed $c$, without changing shape. Once they have separated (say for $ct > 3$), the string near the origin is essentially back at rest.
:::
:::

::: widget plot
f: 0.5*exp(-4*(x + t)^2) + 0.5*exp(-4*(x - t)^2); 0.5*exp(-4*(x - t)^2)
x: -6, 6
y: -0.2, 1.1
sliders: t=0:0:5:0.01
labels: u(x,t); \text{right-moving half}
caption: D'Alembert's solution with $c = 1$ for an initial hump at rest. Drag $t$: the hump splits into two half-height copies that move apart at speed $1$, each keeping its shape exactly. The second curve shows the right-moving half $\tfrac12\varphi(x - t)$ on its own; the full solution is it plus its mirror image.
:::

::: example A struck string on the line {#ex-struck-line}
Solve the wave equation with $\varphi = 0$ and $\psi(x) = \dfrac{1}{1 + x^2}$, and find $\lim_{t\to\infty}u(x,t)$.
::: solution
Now only the integral term contributes:

$$
u(x,t) = \frac{1}{2c}\int_{x - ct}^{x + ct}\frac{ds}{1 + s^2} = \frac{1}{2c}\Bigl(\arctan(x + ct) - \arctan(x - ct)\Bigr).
$$

For fixed $x$, as $t\to\infty$, $\arctan(x + ct) \to \frac\pi2$ and $\arctan(x - ct) \to -\frac\pi2$, so $u(x,t) \to \frac{\pi}{2c}$. Unlike an initial displacement, an initial *velocity* leaves the string permanently displaced: the interval of integration eventually swallows all of $\psi$, whose total integral is $\pi$. On an infinite string there is no restoring force to bring it back.
:::
:::

### Finite speed of propagation

Formula [[#eq-dalembert]] shows exactly which initial data influence the solution at a point $(x_0, t_0)$ with $t_0 > 0$: the values of $\varphi$ at the two points $x_0 \pm ct_0$ and the values of $\psi$ on the interval between them.

::: definition Domain of dependence and range of influence {#def-dependence}
For $t_0 > 0$, the interval $[x_0 - ct_0, x_0 + ct_0]$ is the **domain of dependence** of the point $(x_0, t_0)$: the solution there depends only on the initial data on this interval. Dually, the **range of influence** of an initial point $x_0$ is the wedge $\set{(x,t) : \abs{x - x_0} \le ct,\ t \ge 0}$, the set of points whose solution can be affected by the data at $x_0$. Its edges $x = x_0 \pm ct$ are **characteristic lines**.
:::

So signals travel at speed exactly $c$: if the initial data vanish outside $[-R, R]$, then $u(x,t) = 0$ whenever $\abs{x} > R + c\abs{t}$. This is the sharpest contrast with the heat equation, where a hot spot is felt instantly — though weakly — everywhere along the rod. Singularities propagate in the same way: if $\varphi$ has a corner at $x_0$, then $u(\cdot, t)$ has corners at $x_0 \pm ct$, travelling along the characteristics. The wave equation does not smooth.

::: quiz
For $u_{tt} = 4u_{xx}$ (so $c = 2$), which initial data can affect the value $u(1, 3)$?
- [ ] $\varphi$ and $\psi$ on $[-2, 4]$
- [x] $\varphi$ at $x = -5$ and $x = 7$, and $\psi$ on $[-5, 7]$
- [ ] $\varphi$ and $\psi$ on the whole real line
- [ ] $\varphi$ and $\psi$ at $x = 1$ only
::: solution
With $c = 2$ and $t_0 = 3$, $ct_0 = 6$, so the domain of dependence is $[1 - 6, 1 + 6] = [-5, 7]$. D'Alembert's formula uses $\varphi$ only at the endpoints $-5$ and $7$, and $\psi$ on the whole interval between them. Data outside $[-5,7]$ cannot have reached $x = 1$ by time $3$.
:::
:::

::: remark Corners and generalised solutions
A plucked string starts from a triangle, which is not $C^2$, so [[#thm-dalembert]] does not strictly apply. Yet the formula $\frac12\bigl(\varphi(x+ct) + \varphi(x-ct)\bigr)$ still makes perfect sense and describes what a real string does: the corner splits into two corners that run along the string. Such functions are called **generalised** (or **weak**) solutions: they are limits of genuine $C^2$ solutions with smoothed initial data, and they satisfy the wave equation in an integrated sense. Euler argued in 1748 for exactly such "discontinuous" solutions, against d'Alembert, who required analytic expressions.
:::

## Reflections: strings with ends

### A fixed end

Consider a semi-infinite string $x \ge 0$ with its end fixed: $u(0, t) = 0$. The trick is to extend the data to the whole line as **odd** functions,

$$
\varphi_{\text{odd}}(x) = \begin{cases}\varphi(x) & x \ge 0,\\ -\varphi(-x) & x < 0,\end{cases}
$$

and similarly for $\psi$, and to apply d'Alembert's formula on the line. The solution with odd data is odd in $x$ for all $t$ (since $-u(-x, t)$ solves the same problem, uniqueness forces $u(-x,t) = -u(x,t)$), so it vanishes at $x = 0$, as required. For $x > ct$ the formula is unchanged. For $0 \le x < ct$ the left argument $x - ct$ is negative, and unpacking the odd extension gives

$$
u(x,t) = \frac{\varphi(x + ct) - \varphi(ct - x)}{2} + \frac{1}{2c}\int_{ct - x}^{x + ct}\psi(s)\,ds \qquad (0 \le x < ct).
$$ {#eq-reflection}

The term $-\varphi(ct - x)$ is the left-moving part of the wave after it has hit the end: it returns moving right, **upside down**. A pulse sent towards a fixed end comes back inverted. (At a **free end**, $u_x(0,t) = 0$, one uses even extensions instead, and the pulse returns the right way up.)

::: example A pulse meets a free end {#ex-free-end}
A semi-infinite string $x \ge 0$ has a free end at $x = 0$, so $u_x(0, t) = 0$, and $c = 1$. It starts from rest with $\varphi(x) = e^{-4(x - 3)^2}$. Find the solution and the displacement of the end at $t = 3$.
::: solution
Now we extend $\varphi$ **evenly**: $\varphi_{\text{even}}(x) = \varphi(\abs{x})$. The d'Alembert solution with even data is even in $x$ for all $t$, so $u_x(0,t) = 0$ automatically. For $0 \le x < t$ it reads

$$
u(x,t) = \frac{\varphi(x + t) + \varphi(t - x)}{2}.
$$

The left-moving half-hump, of height $\frac12$, reaches the end at $t = 3$, and then

$$
u(0, 3) = \frac{\varphi(3) + \varphi(3)}{2} = \varphi(3) = 1.
$$

At the moment of reflection the free end swings up to **twice** the height of the incoming pulse, because the incoming wave and its upright reflection overlap exactly; afterwards the reflected pulse travels back to the right the right way up. At a fixed end, by contrast, the incoming wave and its inverted reflection cancel there, so the end stays at rest.
:::
:::

::: widget plot
f: 0.5*(exp(-4*(x + t - 3)^2) - exp(-4*(x + t + 3)^2) + exp(-4*(x - t - 3)^2) - exp(-4*(x - t + 3)^2))
x: 0, 9
y: -0.7, 1.1
sliders: t=0:0:6:0.01
labels: u(x,t)
caption: A hump at $x = 3$ on a string with a fixed end at $x = 0$ ($c = 1$). Drag $t$ slowly. The right-moving half leaves; the left-moving half reaches the end at $t \approx 3$, momentarily cancels against its odd "image" so that the string looks almost flat near the end, and then comes back upside down. The end itself never moves.
:::

### The finite string and normal modes

Now fix both ends of a string of length $L$: $u(0,t) = u(L,t) = 0$, with initial data $\varphi$, $\psi$ on $[0, L]$. Separation of variables, $u = X(x)T(t)$, gives $XT'' = c^2X''T$, so

$$
\frac{T''}{c^2T} = \frac{X''}{X} = -\lambda, \qquad X'' + \lambda X = 0,\quad X(0) = X(L) = 0.
$$

This is the same eigenvalue problem as for the heat equation ([[pde/heat-equation#prop-dirichlet-eigen]]): $\lambda_n = (n\pi/L)^2$ and $X_n = \sin\frac{n\pi x}{L}$. The time equation is now $T'' + c^2\lambda_nT = 0$, which oscillates instead of decaying:

$$
T_n(t) = A_n\cos\omega_nt + B_n\sin\omega_nt, \qquad \omega_n = \frac{n\pi c}{L}.
$$

Superposing these **normal modes**,

$$
u(x,t) = \sum_{n=1}^\infty\Bigl(A_n\cos\frac{n\pi ct}{L} + B_n\sin\frac{n\pi ct}{L}\Bigr)\sin\frac{n\pi x}{L}.
$$ {#eq-string-series}

At $t = 0$ we need $\sum A_n\sin\frac{n\pi x}{L} = \varphi(x)$ and $\sum\frac{n\pi c}{L}B_n\sin\frac{n\pi x}{L} = \psi(x)$, so

$$
A_n = \frac{2}{L}\int_0^L\varphi(x)\sin\frac{n\pi x}{L}\,dx, \qquad B_n = \frac{2}{n\pi c}\int_0^L\psi(x)\sin\frac{n\pi x}{L}\,dx.
$$ {#eq-string-coeffs}

In each mode every point of the string oscillates with the same frequency $\omega_n$, and the points $x = jL/n$ — the **nodes** — never move. These are **standing waves**. The identity

$$
\sin\frac{n\pi x}{L}\cos\frac{n\pi ct}{L} = \frac12\left[\sin\frac{n\pi(x + ct)}{L} + \sin\frac{n\pi(x - ct)}{L}\right]
$$

shows that a standing wave is the superposition of two travelling waves moving in opposite directions, which is how the two methods of solution fit together.

::: theorem The series solution is d'Alembert's solution {#thm-string-series}
Let $\varphi$ and $\psi$ be continuous and piecewise smooth on $[0, L]$, vanishing at $0$ and $L$, and let $\Phi$ and $\Psi$ be their odd $2L$-periodic extensions to $\R$. Then for all $x \in [0, L]$ and $t \in \R$ the series [[#eq-string-series]] with coefficients [[#eq-string-coeffs]] converges, and

$$
u(x,t) = \frac{\Phi(x + ct) + \Phi(x - ct)}{2} + \frac{1}{2c}\int_{x - ct}^{x+ct}\Psi(s)\,ds.
$$

If moreover $\Phi \in C^2$ and $\Psi \in C^1$, then $u$ is the unique $C^2$ solution of the wave equation on $[0,L]\times\R$ with $u(0,t) = u(L,t) = 0$, $u(x,0) = \varphi$, $u_t(x,0) = \psi$.
:::

::: proof
The $A_n$ are the sine coefficients of $\varphi$, i.e. the Fourier coefficients of $\Phi$, which is continuous and piecewise smooth. By the product formula above,

$$
\sum_{n=1}^{\infty}A_n\sin\frac{n\pi x}{L}\cos\frac{n\pi ct}{L} = \frac12\sum_{n=1}^\infty A_n\sin\frac{n\pi(x + ct)}{L} + \frac12\sum_{n=1}^{\infty}A_n\sin\frac{n\pi(x - ct)}{L} = \frac{\Phi(x + ct) + \Phi(x - ct)}{2},
$$

because the Fourier series of $\Phi$ converges to $\Phi$ at every point ([[pde/fourier-series#thm-dirichlet]]). For the second part, $\beta_n = \frac{n\pi c}{L}B_n$ are the Fourier sine coefficients of $\Psi$, and the product formula $\sin a\sin b = \frac12[\cos(a - b) - \cos(a+b)]$ gives

$$
B_n\sin\frac{n\pi x}{L}\sin\frac{n\pi ct}{L} = \frac{\beta_n L}{2n\pi c}\left[\cos\frac{n\pi(x - ct)}{L} - \cos\frac{n\pi(x + ct)}{L}\right] = \frac{1}{2c}\int_{x-ct}^{x+ct}\beta_n\sin\frac{n\pi s}{L}\,ds.
$$

Summing over $n$ and integrating the Fourier series of $\Psi$ term by term, which is always allowed ([[pde/fourier-series#thm-integrate]], in its period-$2L$ form), gives $\frac{1}{2c}\int_{x-ct}^{x+ct}\Psi$. This proves the formula.

If $\Phi\in C^2$ and $\Psi \in C^1$, [[#thm-dalembert]] shows that the formula is a $C^2$ solution on $\R^2$ with initial data $\Phi$, $\Psi$, hence $\varphi$, $\psi$ on $[0,L]$. It satisfies the boundary conditions: $u(0,t) = \frac12\bigl(\Phi(ct) + \Phi(-ct)\bigr) + \frac1{2c}\int_{-ct}^{ct}\Psi = 0$ because $\Phi$ and $\Psi$ are odd, and $u(L,t) = 0$ because $\Phi$ and $\Psi$ are also odd about $x = L$ (for instance $\Phi(L - y) = \Phi(-L - y) = -\Phi(L + y)$ by periodicity and oddness). Uniqueness follows from [[#cor-wave-unique]] below.
:::

So the finite string is d'Alembert's infinite string with data repeated as an odd periodic pattern: waves bounce back and forth between the ends, inverted at each reflection. Every mode has period $2\pi/\omega_n = \frac{2L}{nc}$, which divides $\frac{2L}{c}$, so **the whole motion is periodic in time with period $2L/c$** — the time for a disturbance to travel to one end, back to the other, and return.

::: example The plucked string {#ex-plucked}
A string of length $L$ is pulled aside at its midpoint to height $h$ and released from rest. Find the motion and the share of energy in each mode.
::: solution
The initial shape is the triangle $\varphi(x) = \frac{2hx}{L}$ for $0 \le x \le \frac L2$, $\varphi(x) = \frac{2h(L - x)}{L}$ for $\frac{L}2 \le x \le L$, and $\psi = 0$, so $B_n = 0$. Computing the sine coefficients (integrate by parts on each half; the boundary terms cancel at $x = L/2$),

$$
A_n = \frac{2}{L}\int_0^L\varphi(x)\sin\frac{n\pi x}{L}\,dx = \frac{8h}{n^2\pi^2}\sin\frac{n\pi}{2}.
$$

Thus

$$
u(x,t) = \frac{8h}{\pi^2}\left(\sin\frac{\pi x}{L}\cos\frac{\pi ct}{L} - \frac19\sin\frac{3\pi x}{L}\cos\frac{3\pi ct}{L} + \frac{1}{25}\sin\frac{5\pi x}{L}\cos\frac{5\pi ct}{L} - \cdots\right).
$$

All even modes are missing: they have a node at the midpoint, where the string was plucked, so the initial shape (symmetric about the midpoint) cannot excite them. More generally, plucking at $x = a$ gives $A_n = \frac{2hL^2}{n^2\pi^2a(L - a)}\sin\frac{n\pi a}{L}$, and every mode with a node at $a$ is silent — which is why the sound of a guitar changes with where you pluck it.

The energy of the $n$th mode (defined in the next section) is $E_n = \frac{T_0}{2}\int_0^L(\partial_xu_n)^2\,dx$ at $t = 0$, which equals $\frac{T_0n^2\pi^2A_n^2}{4L} = \frac{16T_0h^2}{\pi^2Ln^2}$ for odd $n$. The total energy is $\frac{T_0}{2}\int_0^L\varphi'^2\,dx = \frac{T_0}{2}\cdot\frac{4h^2}{L^2}\cdot L = \frac{2T_0h^2}{L}$, and indeed $\sum_{n\ \text{odd}}\frac{16T_0h^2}{\pi^2Ln^2} = \frac{16T_0h^2}{\pi^2L}\cdot\frac{\pi^2}{8} = \frac{2T_0h^2}{L}$. The fundamental carries the fraction $\frac{8}{\pi^2} \approx 81\%$ of the energy.
:::
:::

::: widget heat
equation: wave
f: if(x < pi/3, x, (pi - x)/2)
L: pi
k: 1
boundary: dirichlet
terms: 60
caption: A string of length $\pi$ plucked at one third of its length and released from rest, with $c = 1$. Play the animation. The corner splits into two corners that travel along the string and reflect, inverted, at the ends; the shape is always made of straight segments, and nothing is smoothed out. After time $2L/c = 2\pi$ the initial triangle reappears exactly.
:::

::: example The struck string {#ex-hammer}
A piano hammer of width $2\delta$ strikes the middle of a string at rest, giving it the initial velocity $\psi(x) = v_0$ for $\abs{x - L/2} < \delta$ and $\psi(x) = 0$ otherwise, with $\varphi = 0$. Find the coefficients of the modes and compare the sound with the plucked string.
::: solution
Now $A_n = 0$, and by [[#eq-string-coeffs]]

$$
B_n = \frac{2v_0}{n\pi c}\int_{L/2-\delta}^{L/2+\delta}\sin\frac{n\pi x}{L}\,dx = \frac{2v_0L}{n^2\pi^2c}\left[\cos\frac{n\pi(L/2 - \delta)}{L} - \cos\frac{n\pi(L/2+\delta)}{L}\right] = \frac{4v_0L}{n^2\pi^2c}\sin\frac{n\pi}{2}\sin\frac{n\pi\delta}{L}.
$$

Again the even modes are absent (they have a node where the string is struck). For a narrow hammer and $n$ much smaller than $L/\delta$, $\sin\frac{n\pi\delta}{L} \approx \frac{n\pi\delta}{L}$, so $B_n \approx \frac{4v_0\delta}{n\pi c}\sin\frac{n\pi}{2}$: the amplitudes decay only like $1/n$, compared with $1/n^2$ for the plucked string. In terms of energy, the $n$th mode carries $E_n = \frac{\rho L}{4}\omega_n^2B_n^2 \approx \frac{4\rho v_0^2\delta^2}{L}$ for every odd $n \ll L/\delta$ — the energy is spread evenly over many harmonics instead of being concentrated in the fundamental. That is why a hammered string sounds brighter than a plucked one, and why piano makers use felt-covered hammers of carefully chosen width.
:::
:::

::: quiz
A string of length $L = \pi$ with $c = 1$ is set in motion in an arbitrary way (fixed ends). Which statement is true?
- [ ] The motion decays to rest, like the temperature in a rod.
- [x] The motion is periodic in time, with period $2\pi$.
- [ ] The motion is periodic with period $\pi$, the time to cross the string once.
- [ ] Only the fundamental mode survives after a long time.
::: solution
Each mode $\sin nx\cos nt$ or $\sin nx\sin nt$ has period $2\pi/n$, which divides $2\pi = 2L/c$, so every superposition repeats after time $2\pi$. In d'Alembert's picture, a disturbance needs time $2L/c$ to travel to one end, reflect, travel to the other end, reflect again and return: for a string released from rest, after one crossing time $L/c$ the shape is turned upside down and reversed left to right, $u(x, L/c) = -\varphi(L - x)$, and only after $2L/c$ is it restored. Nothing decays in the ideal wave equation.
:::
:::

### Music from mathematics

The frequencies of the normal modes are $\nu_n = \frac{\omega_n}{2\pi} = \frac{nc}{2L}$, all integer multiples of the **fundamental frequency**

$$
\nu_1 = \frac{1}{2L}\sqrt{\frac{T_0}{\rho}}.
$$ {#eq-fundamental}

The multiples $2\nu_1, 3\nu_1, \dots$ are the **harmonics** or overtones. Because they are exact multiples, the motion is periodic and the ear hears a single pitch $\nu_1$, with the relative strengths of the harmonics determining the timbre. Formula [[#eq-fundamental]] contains Mersenne's laws (1636): the pitch is inversely proportional to the length, proportional to the square root of the tension, and inversely proportional to the square root of the mass per unit length. Halving the length of a string — pressing it at the twelfth fret — raises the pitch by an octave. Drums are different: the frequencies of a circular membrane are proportional to zeros of Bessel functions ([[ode/series-solutions]]), which are not integer multiples of each other, and a drum sounds less definitely pitched.

## Energy and uniqueness

A vibrating string carries kinetic energy $\frac12\rho u_t^2$ per unit length, and potential energy from being stretched. A piece of length $dx$ is stretched to length $\sqrt{1 + u_x^2}\,dx \approx (1 + \frac12u_x^2)\,dx$, so the work done against the tension is about $\frac12T_0u_x^2\,dx$.

::: definition Energy of a string {#def-energy}
The **energy** of a solution of [[#eq-wave]] on $[0, L]$ at time $t$ is

$$
E(t) = \frac12\int_0^L\Bigl(\rho\,u_t(x,t)^2 + T_0\,u_x(x,t)^2\Bigr)\,dx.
$$
:::

::: theorem Conservation of energy {#thm-energy}
Let $u \in C^2\bigl([0, L]\times\R\bigr)$ solve $u_{tt} = c^2u_{xx}$ with $c^2 = T_0/\rho$, and suppose that at each end either $u = 0$ for all $t$ (fixed end) or $u_x = 0$ for all $t$ (free end). Then $E(t)$ is constant.
:::

::: proof
Differentiating under the integral sign, using $\rho u_{tt} = T_0u_{xx}$, and recognising a derivative with respect to $x$,

$$
E'(t) = \int_0^L\bigl(\rho u_tu_{tt} + T_0u_xu_{xt}\bigr)\,dx = T_0\int_0^L\bigl(u_tu_{xx} + u_xu_{xt}\bigr)\,dx = T_0\int_0^L\partial_x\bigl(u_tu_x\bigr)\,dx = T_0\bigl[u_tu_x\bigr]_{x=0}^{x=L}.
$$

At a fixed end $u(0, t) = 0$ for all $t$, so $u_t(0,t) = 0$; at a free end $u_x = 0$. Either way the boundary term vanishes, and $E' = 0$.
:::

::: corollary Uniqueness for the string {#cor-wave-unique}
The problem $u_{tt} = c^2u_{xx} + F(x,t)$ on $[0,L]$, with given initial displacement and velocity and with each end either prescribed ($u = g(t)$) or free-type ($u_x = g(t)$), has at most one $C^2$ solution.
:::

::: proof
The difference $w$ of two solutions satisfies the homogeneous wave equation, zero initial data and homogeneous boundary conditions ($w = 0$ or $w_x = 0$ at each end). By [[#thm-energy]] its energy is constant, and it is $0$ at $t = 0$ because $w_t(x,0) = 0$ and $w_x(x,0) = 0$ (the latter since $w(x,0) = 0$ for all $x$). So $w_t \equiv 0$ and $w_x \equiv 0$, which makes $w$ constant; as $w(x,0) = 0$, the constant is $0$.
:::

For a single normal mode, energy shuttles between kinetic and potential forms: in $u_n = A_n\cos\omega_nt\sin\frac{n\pi x}{L}$ the kinetic energy is proportional to $\sin^2\omega_nt$ and the potential energy to $\cos^2\omega_nt$, with constant sum. For a general solution, orthogonality of the modes shows that $E = \sum_nE_n$: each mode keeps its own energy forever. An ideal string therefore never changes its timbre; real strings do, because damping is stronger for higher frequencies.

::: warning Maximum principles fail for waves
It is natural to expect, as for heat, that the displacement can never exceed its initial maximum. It can. With $\varphi = 0$, $\psi(x) = \sin x$ on $[0,\pi]$ and $c = 1$, the solution is $u = \sin x\sin t$: the string starts flat and reaches height $1$ at $t = \frac\pi2$. Even with $\psi = 0$ there is no maximum principle: $u = -\sin x\cos t$ is $\le 0$ at $t = 0$ and vanishes at both ends, yet at $t = \pi$ it equals $\sin x$ and reaches height $1$. For the wave equation, the conserved **energy**, not the maximum, is the right measure of size.
:::

::: quiz
A string's tension is quadrupled while its length and mass stay the same. What happens to its fundamental frequency and to the time it takes the motion to repeat?
- [ ] Frequency $\times 4$, period $\div 4$
- [x] Frequency $\times 2$, period $\div 2$
- [ ] Frequency $\times 2$, period unchanged
- [ ] Frequency unchanged, because it depends only on the length
::: solution
By [[#eq-fundamental]], $\nu_1 = \frac{1}{2L}\sqrt{T_0/\rho}$ is proportional to $\sqrt{T_0}$, so it doubles. The motion repeats with period $2L/c = 1/\nu_1$, which halves. (The wave speed $c = \sqrt{T_0/\rho}$ doubles, so a pulse crosses the string in half the time.)
:::
:::

## Heat versus waves

Both equations were solved by the same separation of variables with the same eigenfunctions $\sin\frac{n\pi x}{L}$, but the time factors $e^{-k(n\pi/L)^2t}$ and $\cos\frac{n\pi ct}{L}$ lead to opposite behaviour.

| | heat $u_t = k\,u_{xx}$ (parabolic) | wave $u_{tt} = c^2u_{xx}$ (hyperbolic) |
|---|---|---|
| initial data | $u(x,0)$ only | $u(x,0)$ and $u_t(x,0)$ |
| modes | decay like $e^{-k(n\pi/L)^2t}$ | oscillate with frequency $n\pi c/L$, forever |
| smoothness | instantly $C^\infty$ for $t > 0$ | corners and jumps persist and travel |
| speed of propagation | infinite | exactly $c$ |
| time reversal | ill posed | the equation is symmetric under $t\mapsto -t$ |
| conserved / monotone | $\int u^2$ decreases; maximum principle | energy conserved; no maximum principle |
| long-time behaviour | tends to a steady state | periodic (finite string) or radiates away (line) |

::: application Seismology, music and fibre optics
Seismologists locate an earthquake from the arrival times of waves at different stations, which is possible only because waves travel at definite speeds — the finite speed of propagation in action (real seismic waves come in two kinds, faster compressional P-waves and slower shear S-waves, and the gap between their arrival times measures the distance). Musical instruments are designed around the normal modes of strings, air columns and plates. In optical fibres, light pulses carrying data must keep their shape over long distances: in the ideal wave equation every frequency travels at the same speed $c$, so pulses do not spread, while real fibres are *dispersive* (speed depends on frequency) and pulses slowly broaden.
:::

::: history
The vibrating string was the first partial differential equation to be studied seriously. Brook Taylor found the frequency of the fundamental mode in 1713. In 1747 Jean le Rond d'Alembert derived the wave equation and showed that its solutions are sums $F(x+ct) + G(x - ct)$ of travelling waves. Leonhard Euler (1748) insisted that the initial shape could be any curve a hand can draw, including a plucked triangle, while d'Alembert accepted only shapes given by a single analytic formula. In 1753 Daniel Bernoulli, arguing from physics, claimed that every motion of the string is a superposition of the sinusoidal modes $\sin\frac{n\pi x}{L}\cos\frac{n\pi ct}{L}$. Both Euler and d'Alembert rejected this: how could a sum of sines represent an arbitrary curve? Joseph-Louis Lagrange joined the debate in 1759, studying the string as the limit of finitely many beads. The controversy, which was really about what a "function" is, was only resolved in the nineteenth century, after Fourier's work on heat and Dirichlet's convergence theorem showed that Bernoulli had been right.
:::

## Where this leads

The wave equation in higher dimensions, $u_{tt} = c^2\Delta u$, governs membranes and acoustics; on a rectangle it separates into products of sines, and on a disc into Bessel functions ([[ode/series-solutions]], [[pde/sturm-liouville]]). In three dimensions Kirchhoff's formula replaces d'Alembert's and has a remarkable property — **Huygens' principle**: a sharp signal stays sharp, which is why we hear a clap as a clap rather than a lingering echo (in two dimensions this fails, as ripples on a pond show). Strings with variable density lead to Sturm–Liouville problems, and the Fourier transform ([[pde/fourier-transform]]) solves the wave equation on the whole line mode by mode. Laplace's equation ([[pde/laplace-equation]]) describes the time-independent states of both heat and waves.

::: summary
- Newton's law for a string with small slopes gives $u_{tt} = c^2u_{xx}$ with wave speed $c = \sqrt{T_0/\rho}$; it needs two initial conditions, displacement and velocity.
- Every $C^2$ solution on the line is $F(x + ct) + G(x - ct)$, and d'Alembert's formula [[#eq-dalembert]] solves the initial value problem uniquely.
- The solution at $(x_0, t_0)$ depends only on data in $[x_0 - ct_0, x_0 + ct_0]$: signals and singularities travel at exactly speed $c$.
- A fixed end reflects waves upside down (odd extension); a free end reflects them upright (even extension).
- On a finite string the normal modes $\sin\frac{n\pi x}{L}\cos\frac{n\pi ct}{L}$ have frequencies $n\nu_1$ with $\nu_1 = \frac{1}{2L}\sqrt{T_0/\rho}$; the motion is periodic with period $2L/c$, and the series solution equals d'Alembert's formula with odd periodic data ([[#thm-string-series]]).
- The energy $\frac12\int(\rho u_t^2 + T_0u_x^2)\,dx$ is conserved, which proves uniqueness; there is no maximum principle and no smoothing.
:::

## Exercises

::: exercise A single mode on the line {level=1 check="-1/2"}
Use d'Alembert's formula to solve $u_{tt} = 4u_{xx}$ with $u(x,0) = \sin x$ and $u_t(x,0) = 0$. Evaluate $u(\pi/2, \pi/3)$.
::: solution
Here $c = 2$ and

$$
u(x,t) = \frac{\sin(x + 2t) + \sin(x - 2t)}{2} = \sin x\cos 2t,
$$

by the sum-to-product formula. So $u(\pi/2,\pi/3) = \sin\frac\pi2\cos\frac{2\pi}3 = -\frac12$.
:::
:::

::: exercise An initial velocity {level=1 check="1"}
Solve $u_{tt} = u_{xx}$ with $u(x,0) = 0$ and $u_t(x,0) = \cos x$, and evaluate $u(0, \pi/2)$.
::: solution
By [[#eq-dalembert]] with $c = 1$,

$$
u(x,t) = \frac12\int_{x-t}^{x+t}\cos s\,ds = \frac{\sin(x + t) - \sin(x - t)}{2} = \cos x\sin t,
$$

so $u(0,\pi/2) = 1$. Check: $u_t = \cos x\cos t$ equals $\cos x$ at $t = 0$.
:::
:::

::: exercise Tuning a string {level=1 check="312.5"}
A steel string of length $0.64\ \mathrm{m}$ and mass per unit length $4\times10^{-4}\ \mathrm{kg/m}$ is under a tension of $64\ \mathrm N$. Find its fundamental frequency in hertz. By what factor must the tension change to raise the pitch by an octave? (Enter the frequency.)
::: solution
The wave speed is $c = \sqrt{64/(4\times10^{-4})} = \sqrt{160\,000} = 400\ \mathrm{m/s}$, so by [[#eq-fundamental]] $\nu_1 = \frac{c}{2L} = \frac{400}{1.28} = 312.5\ \mathrm{Hz}$. An octave doubles the frequency; since $\nu_1 \propto \sqrt{T_0}$, the tension must be multiplied by $4$.
:::
:::

::: exercise An echo from a fixed end {level=2 check="(exp(-4) - 1)/2"}
A semi-infinite string $x \ge 0$ with fixed end $u(0,t) = 0$ and $c = 1$ starts from rest with $\varphi(x) = e^{-(x - 5)^2}$. Find $u(1, 6)$, and explain the sign of the answer.
::: solution
Since $x = 1 < ct = 6$, formula [[#eq-reflection]] applies with $\psi = 0$:

$$
u(1,6) = \frac{\varphi(7) - \varphi(5)}{2} = \frac{e^{-4} - 1}{2} \approx -0.491.
$$

The left-moving half of the hump, centred at $5 - t$, hit the fixed end at $t = 5$ and has come back inverted, centred at $t - 5 = 1$ at time $t = 6$. The point $x = 1$ is at the centre of the reflected, upside-down half-hump of height $-\frac12$; the small positive correction $\frac12e^{-4} = \frac12\varphi(7)$ is the trailing tail of the left-moving half itself: in the odd extension its centre is now at $x = -1$, beyond the end, but the part of it to the right of $x = 0$ has not yet been reflected.
:::
:::

::: exercise Plucking at a third {level=2 check="1/4"}
A string of length $L$ is plucked at $x = L/3$ to height $h$ and released from rest. Using the general formula for $A_n$ in [[#ex-plucked]], find the ratio $A_2/A_1$ and identify which harmonics are absent.
::: solution
With $a = L/3$, $A_n = \frac{2hL^2}{n^2\pi^2a(L - a)}\sin\frac{n\pi}{3} = \frac{9h}{n^2\pi^2}\sin\frac{n\pi}{3}$. Since $\sin\frac{2\pi}{3} = \sin\frac\pi3$, $\frac{A_2}{A_1} = \frac{1}{4}$. The harmonics with $\sin\frac{n\pi}3 = 0$, that is $n = 3, 6, 9, \dots$, are absent: they have a node at $x = L/3$.
:::
:::

::: exercise Energy of a mode {level=2 check="pi/4"}
Verify directly that the energy $E(t) = \frac12\int_0^\pi(u_t^2 + u_x^2)\,dx$ of $u(x,t) = \sin x\cos t$ (a solution with $c = 1$, $\rho = T_0 = 1$) is constant, and find its value.
::: solution
$u_t = -\sin x\sin t$ and $u_x = \cos x\cos t$, so

$$
E(t) = \frac12\left(\sin^2t\int_0^\pi\sin^2x\,dx + \cos^2t\int_0^\pi\cos^2x\,dx\right) = \frac12\cdot\frac\pi2\left(\sin^2t + \cos^2t\right) = \frac\pi4.
$$

The kinetic part $\frac\pi4\sin^2t$ and the potential part $\frac\pi4\cos^2t$ trade places, with constant sum.
:::
:::

::: exercise Damping dissipates energy {level=2}
Let $u \in C^2$ solve the damped wave equation $u_{tt} + 2\gamma u_t = c^2u_{xx}$ on $[0,L]$ with $\gamma > 0$ and fixed ends. Show that $\mathcal E(t) = \frac12\int_0^L(u_t^2 + c^2u_x^2)\,dx$ satisfies $\mathcal E'(t) = -2\gamma\int_0^Lu_t^2\,dx \le 0$, and deduce that the problem has at most one solution with given initial data.
::: solution
As in [[#thm-energy]],

$$
\mathcal E'(t) = \int_0^L\bigl(u_tu_{tt} + c^2u_xu_{xt}\bigr)dx = \int_0^L u_t\bigl(c^2u_{xx} - 2\gamma u_t\bigr)dx + c^2\int_0^Lu_xu_{xt}\,dx = c^2\bigl[u_tu_x\bigr]_0^L - 2\gamma\int_0^Lu_t^2\,dx.
$$

The boundary term vanishes because $u_t = 0$ at fixed ends, so $\mathcal E' = -2\gamma\int u_t^2 \le 0$. If $u_1, u_2$ solve the same problem, their difference $w$ solves the damped equation with zero data, so $0 \le \mathcal E_w(t) \le \mathcal E_w(0) = 0$ for $t \ge 0$. Hence $w_t = w_x = 0$ and $w \equiv 0$ for $t \ge 0$, exactly as in [[#cor-wave-unique]].
:::
:::

::: exercise Finite speed of propagation {level=3}
Suppose $\varphi \in C^2$ and $\psi \in C^1$ vanish outside $[-R, R]$, and let $u$ be the solution [[#eq-dalembert]]. Prove that $u(x,t) = 0$ whenever $\abs{x} > R + ct$ ($t \ge 0$). Show also that for $\abs{x} < ct - R$ the solution equals the constant $\frac{1}{2c}\int_{-R}^R\psi$, and interpret this.
::: solution
If $x > R + ct$, then $x - ct > R$, so both $x \pm ct > R$ and $\varphi(x\pm ct) = 0$; also the interval $[x - ct, x + ct]$ lies in $(R, \infty)$, where $\psi = 0$. So $u(x,t) = 0$. The case $x < -R - ct$ is symmetric. If $\abs{x} < ct - R$, then $x + ct > R$ and $x - ct < -R$, so $\varphi(x\pm ct) = 0$, while $[x - ct, x + ct] \supset [-R, R]$ and the integral of $\psi$ over it is $\int_{-R}^R\psi$. So in the region between the two outgoing fronts the string is displaced by the constant $\frac1{2c}\int\psi$: an initial displacement passes by cleanly, but an initial velocity leaves a permanent wake. (This is the one-dimensional failure of Huygens' principle.)
:::
:::

::: exercise Equipartition of energy {level=3}
Let $u$ be a solution on the line with $\varphi$, $\psi$ as in the previous exercise, and let $K(t) = \frac12\int_{\R}u_t^2\,dx$ and $P(t) = \frac{c^2}{2}\int_\R u_x^2\,dx$ be the kinetic and potential energies. Prove that $K(t) = P(t)$ for all $t > R/c$.
::: hint
Write $u = F(x + ct) + G(x - ct)$ and compute $u_t^2 - c^2u_x^2$.
:::
::: solution
By [[#thm-general]], $u = F(x + ct) + G(x - ct)$, where from the proof of [[#thm-dalembert]] $F' = \frac12\varphi' + \frac{1}{2c}\psi$ and $G' = \frac12\varphi' - \frac1{2c}\psi$; both vanish outside $[-R, R]$. Then $u_t = c\bigl(F'(x+ct) - G'(x-ct)\bigr)$ and $u_x = F'(x+ct) + G'(x - ct)$, so

$$
u_t^2 - c^2u_x^2 = c^2\Bigl[(F' - G')^2 - (F' + G')^2\Bigr] = -4c^2F'(x + ct)\,G'(x - ct).
$$

The first factor vanishes unless $x \in [-R - ct, R - ct]$, the second unless $x \in [-R + ct, R + ct]$. For $ct > R$ these intervals are disjoint ($R - ct < -R + ct$), so the product is identically zero, and $K(t) - P(t) = \frac12\int(u_t^2 - c^2u_x^2)\,dx = 0$.
:::
:::
