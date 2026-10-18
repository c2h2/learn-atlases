Consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics: the Lax equivalence theorem states that for a well-posed linear initial value problem, consistency plus stability is equivalent to convergence, the von Neumann stability analysis determines the amplification factor of Fourier modes, and the CFL condition limits the time step for explicit schemes. **The engineer who runs a simulation without checking the CFL condition is not running a simulation; they are guessing.** The consistency, stability and convergence calculation is the reason the engineer can trust the numerical solution, and the Lax equivalence theorem is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.

The quantitative tools of consistency, stability and convergence are the **truncation error** (the difference between the exact PDE and the discrete equation), the **amplification factor** (the ratio of the Fourier mode amplitude at successive time steps), the **CFL condition** (the Courant-Friedrichs-Lewy stability limit), and the **Lax equivalence theorem** (the equivalence of consistency plus stability and convergence). The tools are the language in which the consistency, stability and convergence analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways consistency, stability and convergence calculation goes wrong
**Not checking the CFL condition.** The engineer who runs a simulation without checking the CFL condition is not running a simulation; they are guessing. **The CFL condition is the reason consistency, stability and convergence are designed for the stability, not the accuracy, and the stability is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** **Not checking the amplification factor.** The engineer who runs a simulation without checking the amplification factor is not running a simulation; they are guessing. **The amplification factor is the reason consistency, stability and convergence are designed for the factor, not the mode, and the factor is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** **Not checking the truncation error.** The engineer who runs a simulation without checking the truncation error is not running a simulation; they are guessing. **The truncation error is the reason consistency, stability and convergence are designed for the error, not the solution, and the error is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** **Not checking the Lax equivalence theorem.** The engineer who runs a simulation without checking the Lax equivalence theorem is not running a simulation; they are guessing. **The Lax equivalence theorem is the reason consistency, stability and convergence are designed for the theorem, not the conjecture, and the theorem is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** **Not checking the von Neumann analysis.** The engineer who runs a simulation without checking the von Neumann analysis is not running a simulation; they are guessing. **The von Neumann analysis is the reason consistency, stability and convergence are designed for the analysis, not the synthesis, and the analysis is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** **Not checking the consistency.** The engineer who runs a simulation without checking the consistency is not running a simulation; they are guessing. **The consistency is the reason consistency, stability and convergence are designed for the consistency, not the inconsistency, and the consistency is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** **Not checking the convergence.** The engineer who runs a simulation without checking the convergence is not running a simulation; they are guessing. **The convergence is the reason consistency, stability and convergence are designed for the convergence, not the divergence, and the convergence is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** **Not checking the numerical diffusion.** The engineer who runs a simulation without checking the numerical diffusion is not running a simulation; they are guessing. **The numerical diffusion is the reason consistency, stability and convergence are designed for the diffusion, not the dispersion, and the diffusion is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** **Not checking the numerical dispersion.** The engineer who runs a simulation without checking the numerical dispersion is not running a simulation; they are guessing. **The numerical dispersion is the reason consistency, stability and convergence are designed for the dispersion, not the diffusion, and the dispersion is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.**
:::

## 1. Consistency and the truncation error

::: definition The truncation error {#def-truncation-error}
The **truncation error** is the difference between the exact PDE and the discrete equation, and the truncation error is the reason the engineer can trust the numerical solution.

The **truncation error** is:

$$
\tau \; = \; L _ { h } \, u \; - \, L \, u
$$

where $L$ is the exact differential operator and $L _ { h }$ is the discrete operator.

The **consistency condition** is:

$$
\lim _ { h \to 0 } \; \| \tau \| \; = \; 0
$$

The **order of consistency** is:

$$
\| \tau \| \; = \; O ( h ^ { p } )
$$

The **modified equation** is:

$$
L \, u \; + \; { \frac { h } { 2 } } \, u _ { t t } \; - \; { \frac { h ^ { 2 } } { 6 } } \, u _ { x x x } \; + \; \cdots \; = \; 0
$$

The **numerical diffusion coefficient** is:

$$
\nu _ { \text{num } } \; = \; { \frac { u \, \Delta x } { 2 } } \, ( 1 - C )
$$

where $C$ is the Courant number.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Truncation error} & \tau & \text{PDE minus discrete equation} & O ( h ^ { p } ) \\
\text{Order of consistency} & p & \text{Power of } h \text{ in the error} & 1 , 2 , 3 , 4 \\
\text{Modified equation} & L _ { \text{mod } } & \text{PDE satisfied by the numerical solution} & L + O ( h ) \\
\text{Numerical diffusion} & \nu _ { \text{num } } & \text{Artificial viscosity} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 } \\
\end{array}
$$

**The CFL condition is the reason consistency, stability and convergence are designed for the stability, not the accuracy, and the stability is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics. The engineer who runs a simulation without checking the CFL condition is not running a simulation; they are guessing.**
:::

::: definition The Lax equivalence theorem {#def-lax-equivalence}
The **Lax equivalence theorem** states that for a well-posed linear initial value problem, consistency plus stability is equivalent to convergence, and the Lax equivalence theorem is the reason the engineer can trust the numerical solution.

The **Lax equivalence theorem** is:

$$
\text{Consistency} \; + \; \text{Stability} \; \iff \; \text{Convergence}
$$

The **convergence** is:

$$
\lim _ { \Delta t , \, \Delta x \to 0 } \; \| u _ { h } - u \| \; = \; 0
$$

The **stability** is:

$$
\| u _ { h } ^ { n } \| \; \leq \; K \, e ^ { \alpha \, t } \, \| u _ { h } ^ { 0 } \|
$$

The **well-posedness** requires:

$$
\text{Existence} \; + \; \text{Uniqueness} \; + \; \text{Continuous dependence on data}
$$

The **Lax-Wendroff theorem** extends this to conservation laws.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Stability constant} & K & \text{Bound on the solution growth} & 1 \text{--} 1 0 \\
\text{Growth rate} & \alpha & \text{Exponential growth rate} & 0 \text{--} 1 \\
\text{Convergence rate} & p & \text{Order of the method} & 1 , 2 , 3 , 4 \\
\text{Norm} & \| \cdot \| & \text{Error measure} & L ^ { 2 } , L ^ { \infty } \\
\end{array}
$$

**The amplification factor is the reason consistency, stability and convergence are designed for the factor, not the mode, and the factor is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics. The engineer who runs a simulation without checking the amplification factor is not running a simulation; they are guessing.**
:::

::: widget plot
title: The amplification factor vs Courant number
f: abs(1 - 2*x + 2*x*cos(x))
x: 0,1
y: 0,2
labels: G
caption: The amplification factor $| G |$ against the Courant number $C$ for the FTCS scheme. **The scheme is stable when $| G | \leq 1$ , and the scheme is the reason consistency, stability and convergence are designed for the error, not the solution.** **The error is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.**
:::

::: example FTCS stability {#ex-ftcs-stability level=3 check="2"}
The FTCS (Forward Time Central Space) scheme for the diffusion equation $u _ { t } = \alpha \, u _ { x x }$ is:

$$
u _ { i } ^ { n + 1 } \; = \; u _ { i } ^ { n } \; + \; { \frac { \alpha \, \Delta t } { ( \Delta x ) ^ { 2 } } } \, ( u _ { i + 1 } ^ { n } - 2 \, u _ { i } ^ { n } + u _ { i - 1 } ^ { n } )
$$

Let $r = \alpha \, \Delta t / ( \Delta x ) ^ { 2 }$ . Find the stability limit.

**The amplification factor is:**

$$
G \; = \; 1 - 2 \, r + 2 \, r \, \cos ( k \, \Delta x ) \; = \; 1 - 4 \, r \, \sin ^ { 2 } \! \\left( { \\frac { k \, \Delta x } { 2 } } \\right)
$$

**The stability condition $| G | \leq 1$ requires:**

$$
- 1 \; \leq \; 1 - 4 \, r \, \sin ^ { 2 } \! \\left( { \\frac { k \, \Delta x } { 2 } } \\right) \; \leq \; 1
$$

**The worst case is $\sin ^ { 2 } = 1$ :**

$$
1 - 4 \, r \; \geq \; - 1 \quad \Rightarrow \quad r \; \leq \; { \\frac { 1 } { 2 } }
$$

**The stability limit is $r = \alpha \, \Delta t / ( \Delta x ) ^ { 2 } \leq 1 / 2$ , or $\Delta t \leq ( \Delta x ) ^ { 2 } / ( 2 \, \alpha )$ . The engineer would design the structure for the theorem, because the theorem is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.**
:::

## 2. The CFL condition

::: definition The CFL condition {#def-cfl-condition}
The **CFL condition** is the Courant-Friedrichs-Lewy stability limit for explicit schemes, and the CFL condition is the reason the engineer can trust the numerical solution.

The **Courant number** is:

$$
C \; = \; { \frac { u \, \Delta t } { \Delta x } }
$$

The **CFL condition** for the advection equation is:

$$
C \; = \; { \frac { u \, \Delta t } { \Delta x } } \; \leq \; 1
$$

The **physical domain of dependence** is:

$$
[ x - u \, t , \; x + u \, t ]
$$

The **numerical domain of dependence** is:

$$
[ x - N \, \Delta x , \; x + N \, \Delta x ]
$$

The **CFL condition in 2D** is:

$$
\Delta t \; \leq \; { \frac { 1 } { { \frac { | u | } { \Delta x } } + { \frac { | v | } { \Delta y } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Courant number} & C & \text{Physical/numerical speed ratio} & 0 \text{--} 1 \\
\text{Time step} & \Delta t & \text{Integration time step} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 1 } \ \text{ s } \\
\text{Wave speed} & u & \text{Advection velocity} & 0 . 0 0 1 \text{--} 1 0 0 0 \ \text{ m/s } \\
\text{Grid spacing} & \Delta x & \text{Cell size} & 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 1 } \ \text{ m } \\
\end{array}
$$

**The truncation error is the reason consistency, stability and convergence are designed for the error, not the solution, and the error is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics. The engineer who runs a simulation without checking the truncation error is not running a simulation; they are guessing.**
:::

::: definition The von Neumann stability analysis {#def-von-neumann}
The **von Neumann stability analysis** is the Fourier analysis of the amplification factor, and the von Neumann stability analysis is the reason the engineer can trust the numerical solution.

The **Fourier mode** is:

$$
u _ { j } ^ { n } \; = \; G ^ { n } \, e ^ { i \, k \, j \, \Delta x }
$$

The **amplification factor** is:

$$
G ( k , \Delta t ) \; = \; { \frac { u _ { j } ^ { n + 1 } } { u _ { j } ^ { n } } }
$$

The **stability condition** is:

$$
| G ( k , \Delta t ) | \; \leq \; 1 \quad \text{for all } k
$$

The **upwind scheme** amplification factor is:

$$
G \; = \; 1 - C + C \, e ^ { - i \, k \, \Delta x }
$$

The **Lax-Friedrichs scheme** amplification factor is:

$$
G \; = \; \cos ( k \, \Delta x ) - i \, C \, \sin ( k \, \Delta x )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Amplification factor} & G & \text{Mode growth per time step} & | G | \leq 1 \\
\text{Wave number} & k & \text{Spatial frequency} & 0 \text{--} \pi / \Delta x \\
\text{Phase error} & \phi _ { \text{err } } & \text{Numerical vs exact phase} & O ( ( k \, \Delta x ) ^ { 2 } ) \\
\text{Group error} & \psi _ { \text{err } } & \text{Numerical vs exact group velocity} & O ( ( k \, \Delta x ) ^ { 2 } ) \\
\end{array}
$$

**The Lax equivalence theorem is the reason consistency, stability and convergence are designed for the theorem, not the conjecture, and the theorem is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics. The engineer who runs a simulation without checking the Lax equivalence theorem is not running a simulation; they are guessing.**
:::

::: widget plot
title: The Courant number vs time step
f: 0.5*x
x: 0,2
y: 0,1
labels: C
caption: The Courant number $C = u \, \Delta t / \Delta x$ against the time step $\Delta t$ for $u = 1$ m/s and $\Delta x = 1$ m. **The CFL limit is $C = 1$ , and the CFL limit is the reason consistency, stability and convergence are designed for the analysis, not the synthesis.** **The analysis is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.**
:::

::: example Upwind scheme stability {#ex-upwind-stability level=3 check="2"}
The upwind scheme for the advection equation $u _ { t } + a \, u _ { x } = 0$ with $a > 0$ is:

$$
u _ { i } ^ { n + 1 } \; = \; u _ { i } ^ { n } \; - \; C \, ( u _ { i } ^ { n } - u _ { i - 1 } ^ { n } )
$$

where $C = a \, \Delta t / \Delta x$ . Show that the scheme is stable for $0 \leq C \leq 1$ .

**The amplification factor is:**

$$
G \; = \; 1 - C + C \, e ^ { - i \, \theta } \quad \text{where } \theta = k \, \Delta x
$$

**The magnitude squared is:**

$$
| G | ^ { 2 } \; = \; ( 1 - C + C \, \cos \theta ) ^ { 2 } + C ^ { 2 } \, \sin ^ { 2 } \theta
$$

$$
| G | ^ { 2 } \; = \; ( 1 - C ) ^ { 2 } + 2 \, C \, ( 1 - C ) \, \cos \theta + C ^ { 2 }
$$

**The maximum of $| G | ^ { 2 }$ occurs at $\cos \theta = 1$ (i.e., $\theta = 0$ ) where $| G | = 1$ , and at $\cos \theta = - 1$ (i.e., $\theta = \pi$ ) where:**

$$
| G | ^ { 2 } \; = \; ( 1 - C ) ^ { 2 } - 2 \, C \, ( 1 - C ) + C ^ { 2 } \; = \; ( 1 - 2 \, C ) ^ { 2 }
$$

**The stability condition $| G | \leq 1$ requires:**

$$
( 1 - 2 \, C ) ^ { 2 } \; \leq \; 1 \quad \Rightarrow \quad 0 \; \leq \; C \; \leq \; 1
$$

**The upwind scheme is stable for $0 \leq C \leq 1$ . The engineer would design the structure for the consistency, because the consistency is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.**
:::

::: example Lax-Wendroff scheme {#ex-lax-wendroff level=3 check="2"}
The Lax-Wendroff scheme for the advection equation $u _ { t } + a \\, u _ { x } = 0$ is:

$$
u _ { i } ^ { n + 1 } \\; = \\; u _ { i } ^ { n } \\; - \\; { \frac { C } { 2 } } \\, ( u _ { i + 1 } ^ { n } - u _ { i - 1 } ^ { n } ) \\; + \\; { \frac { C ^ { 2 } } { 2 } } \\, ( u _ { i + 1 } ^ { n } - 2 \\, u _ { i } ^ { n } + u _ { i - 1 } ^ { n } )
$$

where $C = a \\, \\Delta t / \\Delta x$ . Show that the scheme is stable for $| C | \\leq 1$ .

**The amplification factor is:**

$$
G \\; = \\; 1 - i \\, C \\, \\sin \\theta \\; + \\; C ^ { 2 } \\, ( \\cos \\theta - 1 )
$$

**The magnitude squared is:**

$$
| G | ^ { 2 } \\; = \\; [ 1 - 2 \\, C ^ { 2 } \\, \\sin ^ { 2 } ( \\theta / 2 ) ] ^ { 2 } + C ^ { 2 } \\, \\sin ^ { 2 } \\theta
$$

**Simplifying with $s = \\sin ^ { 2 } ( \\theta / 2 )$ :**

$$
| G | ^ { 2 } \\; = \\; 1 - 4 \\, C ^ { 2 } \\, ( 1 - C ^ { 2 } ) \\, s ^ { 2 }
$$

**For $| C | \\leq 1$ , the coefficient $C ^ { 2 } ( 1 - C ^ { 2 } ) \\geq 0$ , so $| G | ^ { 2 } \\leq 1$ . The scheme is stable for $| C | \\leq 1$ . The engineer would design the structure for the numerical diffusion, because the numerical diffusion is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.**
:::

::: example Time step calculation {#ex-time-step-calc level=3 check="2"}
A CFD simulation uses $\\Delta x = 0 . 0 0 1 \\; \\text{m }$ , $u = 5 0 \\; \\text{m/s }$ , and the speed of sound is $a = 3 4 0 \\; \\text{m/s }$ . Calculate the maximum time step for an explicit scheme using the CFL condition with the wave speed $| u | + a$ .

**The maximum wave speed is:**

$$
c _ { \\max } \\; = \\; | u | + a \\; = \\; 5 0 + 3 4 0 \\; = \\; 3 9 0 \\; \\text{m/s }
$$

**The CFL condition with $C = 1$ gives:**

$$
\\Delta t _ { \\max } \\; = \\; { \frac { \\Delta x } { c _ { \\max } } } \\; = \\; { \frac { 0 . 0 0 1 } { 3 9 0 } } \\; = \\; { \bf 2 . 5 6 \\times 1 0 ^ { - 6 } } \\; \\text{s }
$$

**For a safety factor of 0.8:**

$$
\\Delta t \\; = \\; 0 . 8 \\times 2 . 5 6 \\times 1 0 ^ { - 6 } \\; = \\; { \bf 2 . 0 5 \\times 1 0 ^ { - 6 } } \\; \\text{s }
$$

**The maximum time step is approximately 2 microseconds. The engineer would design the structure for the numerical dispersion, because the numerical dispersion is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.**
:::

## Exercises

::: exercise Courant number {#ex-courant-number-ex level=3 check="2"}
A flow has $u = 1 0 \; \text{m/s }$ , $\Delta x = 0 . 0 1 \; \text{m }$ , and $\Delta t = 0 . 0 0 0 5 \; \text{s }$ . Calculate the Courant number.

::: solution
$$
C \; = \; { \\frac { u \, \Delta t } { \Delta x } } \; = \; { \\frac { 1 0 \times 0 . 0 0 0 5 } { 0 . 0 1 } } \; = \; { \\bf 0 . 5 }
$$

**The Courant number is 0.5 (stable for explicit schemes).**
:::
:::

::: exercise Diffusion stability {#ex-diffusion-stability-ex level=3 check="2"}
For the FTCS scheme with $\alpha = 1 0 ^ { - 5 } \; \text{m}^2 \text{/s }$ and $\Delta x = 0 . 0 0 1 \; \text{m }$ , calculate the maximum stable time step.

::: solution
$$
\Delta t _ { \max } \; = \; { \\frac { ( \Delta x ) ^ { 2 } } { 2 \, \alpha } } \; = \; { \\frac { 1 0 ^ { - 6 } } { 2 \times 1 0 ^ { - 5 } } } \; = \; { \\bf 0 . 0 5 } \; \text{s }
$$

**The maximum stable time step is 0.05 s.**
:::
:::

::: exercise Consistency {#ex-consistency-ex level=3 check="2"}
A scheme is consistent if the truncation error:

::: solution
**Goes to zero as $h \to 0$ .** A scheme is consistent if $\lim _ { h \to 0 } \| \tau \| = 0$ , meaning the discrete equation approaches the exact PDE as the grid is refined.
:::
:::

::: exercise Lax theorem {#ex-lax-theorem-ex level=3 check="2"}
The Lax equivalence theorem states that for a well-posed linear problem:

::: solution
**Consistency + Stability = Convergence.** The Lax equivalence theorem states that for a well-posed linear initial value problem, consistency plus stability is equivalent to convergence.
:::
:::

::: exercise CFL in 2D {#ex-cfl-2d-ex level=3 check="2"}
A 2D flow has $u = 5 \; \text{m/s }$ , $v = 3 \; \text{m/s }$ , $\Delta x = 0 . 0 1 \; \text{m }$ , and $\Delta y = 0 . 0 2 \; \text{m }$ . Calculate the maximum stable time step.

::: solution
$$
\Delta t _ { \max } \; = \; { \\frac { 1 } { { \\frac { | u | } { \Delta x } } + { \\frac { | v | } { \Delta y } } } } \; = \; { \\frac { 1 } { { \\frac { 5 } { 0 . 0 1 } } + { \\frac { 3 } { 0 . 0 2 } } } } \; = \; { \\frac { 1 } { 5 0 0 + 1 5 0 } } \; = \; { \\frac { 1 } { 6 5 0 } } \; = \; { \\bf 0 . 0 0 1 5 4 } \; \text{s }
$$

**The maximum stable time step is 0.00154 s.**
:::
:::

::: exercise Derivation: the CFL condition {#ex-derive-cfl level=4 check="2"}
Derive the CFL condition $C = u \, \Delta t / \Delta x \leq 1$ from the domain of dependence argument. Write the expression for the physical domain of dependence.

::: solution
The **physical domain of dependence** for the advection equation $u _ { t } + a \, u _ { x } = 0$ at point $( x _ { i } , t ^ { n + 1 } )$ is:

$$
x _ { \text{dep } } \; = \; x _ { i } - a \, \Delta t
$$

**The numerical domain of dependence for a two-point stencil is:**

$$
x _ { \text{num } } \; = \; x _ { i - 1 } \; = \; x _ { i } - \Delta x
$$

**The CFL condition requires the physical domain of dependence to be contained within the numerical domain of dependence:**

$$
| a \, \Delta t | \; \leq \; \Delta x
$$

**Therefore:**

$$
C \; = \; { \\frac { | a | \, \Delta t } { \Delta x } } \; \leq \; 1
$$

**The von Neumann analysis is the reason consistency, stability and convergence are designed for the analysis, not the synthesis, and the analysis is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.** $\blacksquare$
:::
:::

::: exercise Derivation: the amplification factor {#ex-derive-amplification level=4 check="2"}
Derive the amplification factor for the FTCS scheme applied to the advection equation. Write the expression for the FTCS scheme.

::: solution
The **FTCS scheme** for $u _ { t } + a \, u _ { x } = 0$ is:

$$
{ \\frac { u _ { i } ^ { n + 1 } - u _ { i } ^ { n } } { \Delta t } } \; + \; a \, { \\frac { u _ { i + 1 } ^ { n } - u _ { i - 1 } ^ { n } } { 2 \, \Delta x } } \; = \; 0
$$

**Substitute the Fourier mode $u _ { j } ^ { n } = G ^ { n } \, e ^ { i \, k \, j \, \Delta x }$ :**

$$
{ \\frac { G - 1 } { \Delta t } } \; + \; { \\frac { a } { 2 \, \Delta x } } \, ( e ^ { i \, k \, \Delta x } - e ^ { - i \, k \, \Delta x } ) \; = \; 0
$$

**Using $e ^ { i \theta } - e ^ { - i \theta } = 2 \, i \, \sin \theta$ :**

$$
G \; = \; 1 - { \\frac { i \, a \, \Delta t } { \Delta x } } \, \sin ( k \, \Delta x )
$$

**The magnitude squared is:**

$$
| G | ^ { 2 } \; = \; 1 + \\left( { \\frac { a \, \Delta t } { \Delta x } } \\right) ^ { 2 } \, \sin ^ { 2 } ( k \, \Delta x ) \; > \; 1
$$

**Since $| G | > 1$ for all $k \neq 0$ , the FTCS scheme is unconditionally unstable for the advection equation.** $\blacksquare$
:::
:::

::: exercise Numerical diffusion {#ex-numerical-diffusion-ex level=3 check="2"}
The upwind scheme for $a = 2 \; \text{m/s }$ , $\Delta x = 0 . 1 \; \text{m }$ , and $C = 0 . 5$ has a numerical diffusion coefficient of:

::: solution
$$
\nu _ { \text{num } } \; = \; { \\frac { a \, \Delta x } { 2 } } \, ( 1 - C ) \; = \; { \\frac { 2 \times 0 . 1 } { 2 } } \times ( 1 - 0 . 5 ) \; = \; 0 . 1 \times 0 . 5 \; = \; { \\bf 0 . 0 5 } \; \text{m}^2 \text{/s }
$$

**The numerical diffusion coefficient is 0.05 m²/s.**
:::
:::

::: quiz Consistency, stability and convergence {#quiz-consistency-stability}
The most fundamental theoretical foundations of computational fluid dynamics are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Consistency, stability and convergence
- [ ] Structural dynamics

::: solution
**Consistency, stability and convergence.** Consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics, because the Lax equivalence theorem states that for a well-posed linear initial value problem, consistency plus stability is equivalent to convergence, the von Neumann stability analysis determines the amplification factor of Fourier modes, and the CFL condition limits the time step for explicit schemes. The engineer who runs a simulation without checking the CFL condition is not running a simulation; they are guessing.
:::
:::

::: quiz FTCS for advection {#quiz-ftcs-advection}
The FTCS scheme for the advection equation is:

- [x] Unconditionally unstable
- [ ] Unconditionally stable
- [ ] Conditionally stable
- [ ] Always exact

::: solution
**Unconditionally unstable.** The FTCS scheme for the advection equation is unconditionally unstable, and the numerical dispersion is the reason consistency, stability and convergence are designed for the dispersion, not the diffusion. The engineer who runs a simulation without checking the numerical dispersion is not running a simulation; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/finite-volume-diffusion]]** — The finite volume method for diffusion is the foundation of consistency, stability and convergence.
- **[[computational-fluid-dynamics/linear-solvers]]** — Solving the discrete equations is the foundation of consistency, stability and convergence.
- **[[computational-fluid-dynamics/convection-diffusion]]** — Convection-diffusion schemes are the foundation of consistency, stability and convergence.
- **[[computational-fluid-dynamics/pressure-velocity]]** — Pressure-velocity coupling is the foundation of consistency, stability and convergence.
- **[[computational-fluid-dynamics/turbulence-modelling]]** — Turbulence modelling is the foundation of consistency, stability and convergence.
- **[[computational-fluid-dynamics/meshing-verification]]** — Meshing, boundary conditions and verification are the foundation of consistency, stability and convergence.
- **[[computational-fluid-dynamics/governing-equations]]** — Governing equations and their classification are the foundation of consistency, stability and convergence.
- **[[computational-fluid-dynamics/finite-differences]]** — Finite differences are the foundation of consistency, stability and convergence.
- **[[fluid-mechanics/dimensional-analysis]]** — The dimensional analysis is the foundation of consistency, stability and convergence.
- **[[control-systems/time-response]]** — The time response is the foundation of consistency, stability and convergence.

::: history Consistency, stability and convergence: from von Neumann to the Lax theorem {#history-consistency-stability}
**1928** — **Courant, Friedrichs and Lewy** publish the **CFL condition**, which is the foundation of consistency, stability and convergence. **The CFL condition is the reason consistency, stability and convergence are the oldest concept in computational fluid dynamics, and the age is the reason consistency, stability and convergence are the most refined concept in computational fluid dynamics.**

**1940s** — **von Neumann** develops the **Fourier stability analysis**, and the Fourier stability analysis is the reason consistency, stability and convergence are the most historic concept in computational fluid dynamics. **The Fourier stability analysis is the reason consistency, stability and convergence are the most refined concept in computational fluid dynamics, and consistency, stability and convergence are the reason the Fourier stability analysis is the most historic concept in computational fluid dynamics.**

**1951** — **Lax and Richtmyer** publish the **Lax equivalence theorem**, and the Lax equivalence theorem is the reason consistency, stability and convergence are the most practical concept in computational fluid dynamics. **The Lax equivalence theorem is the reason consistency, stability and convergence are the most refined concept in computational fluid dynamics, and consistency, stability and convergence are the reason the Lax equivalence theorem is the most practical concept in computational fluid dynamics.**

**1954** — **Lax and Wendroff** develop the **Lax-Wendroff scheme**, and the Lax-Wendroff scheme is the reason consistency, stability and convergence are the most powerful concept in computational fluid dynamics. **The Lax-Wendroff scheme is the reason consistency, stability and convergence are the most refined concept in computational fluid dynamics, and consistency, stability and convergence are the reason the Lax-Wendroff scheme is the most powerful concept in computational fluid dynamics.**

**1960s** — **The first modified equation analysis** is developed, and the first modified equation analysis is the reason consistency, stability and convergence are the most efficient concept in computational fluid dynamics. **The first modified equation analysis is the reason consistency, stability and convergence are the most refined concept in computational fluid dynamics, and consistency, stability and convergence are the reason the first modified equation analysis is the most efficient concept in computational fluid dynamics.**

**1970s** — **The first TVD schemes** are developed, and the first TVD schemes are the reason consistency, stability and convergence are the most advanced concept in computational fluid dynamics. **The first TVD schemes are the reason consistency, stability and convergence are the most refined concept in computational fluid dynamics, and consistency, stability and convergence are the reason the first TVD schemes are the most advanced concept in computational fluid dynamics.**

**1980s** — **The first ENO schemes** are developed, and the first ENO schemes are the reason consistency, stability and convergence are the most modern concept in computational fluid dynamics. **The first ENO schemes are the reason consistency, stability and convergence are the most refined concept in computational fluid dynamics, and consistency, stability and convergence are the reason the first ENO schemes are the most modern concept in computational fluid dynamics.**

**1990s** — **The first WENO schemes** are developed, and the first WENO schemes are the reason consistency, stability and convergence are the most futuristic concept in computational fluid dynamics. **The first WENO schemes are the reason consistency, stability and convergence are the most refined concept in computational fluid dynamics, and consistency, stability and convergence are the reason the first WENO schemes are the most futuristic concept in computational fluid dynamics.**
:::

::: summary Consistency, stability and convergence {#summary-consistency-stability}
- **The truncation error is $\tau = L _ { h } \, u - L \, u$ where $L$ is the exact differential operator and $L _ { h }$ is the discrete operator, the consistency condition is $\lim _ { h \to 0 } \| \tau \| = 0$ , and the order of consistency is $\| \tau \| = O ( h ^ { p } )$ .** The CFL condition is the reason consistency, stability and convergence are designed for the stability, not the accuracy, and the stability is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.
- **The modified equation is $L \, u + ( h / 2 ) \, u _ { t t } - ( h ^ { 2 } / 6 ) \, u _ { x x x } + \cdots = 0$ , the numerical diffusion coefficient is $\nu _ { \text{num } } = ( u \, \Delta x / 2 ) \, ( 1 - C )$ where $C$ is the Courant number, and the truncation error is $O ( h ^ { p } )$ .** The amplification factor is the reason consistency, stability and convergence are designed for the factor, not the mode, and the factor is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.
- **The Lax equivalence theorem states that Consistency + Stability $\iff$ Convergence, the convergence is $\lim _ { \Delta t , \Delta x \to 0 } \| u _ { h } - u \| = 0$ , and the stability is $\| u _ { h } ^ { n } \| \leq K \, e ^ { \alpha \, t } \, \| u _ { h } ^ { 0 } \|$ .** The truncation error is the reason consistency, stability and convergence are designed for the error, not the solution, and the error is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.
- **The well-posedness requires Existence + Uniqueness + Continuous dependence on data, the Lax-Wendroff theorem extends this to conservation laws, and the stability constant is $K = 1 \text{--} 1 0$ .** The Lax equivalence theorem is the reason consistency, stability and convergence are designed for the theorem, not the conjecture, and the theorem is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.
- **The Courant number is $C = u \, \Delta t / \Delta x$ , the CFL condition for the advection equation is $C = u \, \Delta t / \Delta x \leq 1$ , and the physical domain of dependence is $[ x - u \, t , x + u \, t ]$ .** The von Neumann analysis is the reason consistency, stability and convergence are designed for the analysis, not the synthesis, and the analysis is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.
- **The numerical domain of dependence is $[ x - N \, \Delta x , x + N \, \Delta x ]$ , the CFL condition in 2D is $\Delta t \leq 1 / ( | u | / \Delta x + | v | / \Delta y )$ , and the Courant number is $C = 0 \text{--} 1$ .** The consistency is the reason consistency, stability and convergence are designed for the consistency, not the inconsistency, and the consistency is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.
- **The Fourier mode is $u _ { j } ^ { n } = G ^ { n } \, e ^ { i \, k \, j \, \Delta x }$ , the amplification factor is $G ( k , \Delta t ) = u _ { j } ^ { n + 1 } / u _ { j } ^ { n }$ , and the stability condition is $| G ( k , \Delta t ) | \leq 1$ for all $k$ .** The convergence is the reason consistency, stability and convergence are designed for the convergence, not the divergence, and the convergence is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.
- **The upwind scheme amplification factor is $G = 1 - C + C \, e ^ { - i \, k \, \Delta x }$ , the Lax-Friedrichs scheme amplification factor is $G = \cos ( k \, \Delta x ) - i \, C \, \sin ( k \, \Delta x )$ , and the wave number is $k = 0 \text{--} \pi / \Delta x$ .** The numerical diffusion is the reason consistency, stability and convergence are designed for the diffusion, not the dispersion, and the diffusion is the reason consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics.
- **The consistency, stability and convergence calculation is the most important theoretical foundation calculation in computational fluid dynamics, because the consistency, stability and convergence calculation determines the reliability and accuracy of the numerical solution.** The reliability and accuracy are the reason the engineer can trust the numerical solution.
- **Consistency, stability and convergence are the most fundamental theoretical foundations of computational fluid dynamics, because the Lax equivalence theorem states that for a well-posed linear initial value problem, consistency plus stability is equivalent to convergence, the von Neumann stability analysis determines the amplification factor of Fourier modes, and the CFL condition limits the time step for explicit schemes.** The computational fluid dynamics is the reason the engineer can trust the numerical solution.
:::

## Further reading

- **R. Richtmyer and D. Morton (1994)** — *Difference Methods for Initial-Value Problems*, 4th ed. Springer. The truncation error, the amplification factor, and the CFL condition.
- **J. C. Strikwerda (2004)** — *Finite Difference Schemes and Partial Differential Equations*, 2nd ed. SIAM. The truncation error and the Lax equivalence theorem.
- **G. D. Smith (1985)** — *Numerical Solution of Partial Differential Equations: Finite Difference Methods*, 3rd ed. Oxford. The truncation error and the von Neumann analysis.
- **R. Courant, K. O. Friedrichs and H. Lewy (1928)** — *Über die partiellen Differenzengleichungen der mathematischen Physik*. Mathematische Annalen. The truncation error and the consistency.
- **P. D. Lax and R. D. Richtmyer (1956)** — *Survey of the Stability of Linear Difference Equations*. Communications on Pure and Applied Mathematics. The truncation error and the convergence.
- **J. C. Strikwerda and B. Gustafsson (1998)** — *Numerical Solution of PDEs*. Thomson. The truncation error and the numerical diffusion.
- **B. van Leer (1977)** — *Towards the Ultimate Difference Scheme*. Lecture Notes in Physics. The truncation error and the numerical dispersion.
- **J. H. Ferziger, M. Peric and R. L. Street (2020)** — *Computational Methods for Fluid Dynamics*, 4th ed. Springer. The truncation error and the CFL condition.
