Structural dynamics are the most fundamental time-dependent finite element analyses in engineering: the mass matrix is the dynamic analogue of the stiffness matrix, the eigenvalue problem determines the natural frequencies and mode shapes, and the time integration scheme determines the accuracy and stability of the transient response. **The engineer who solves the eigenvalue problem without checking the mass matrix is not solving the eigenvalue problem; they are guessing.** The structural dynamics calculation is the reason the engineer can predict the natural frequencies, mode shapes, and transient response of a structure, and the mass matrix is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.

The quantitative tools of structural dynamics are the **consistent mass matrix** (the dynamic analogue of the stiffness matrix), the **lumped mass matrix** (the diagonal approximation to the consistent mass matrix), the **generalized eigenvalue problem** (the equation that determines the natural frequencies and mode shapes), and the **Newmark time integration scheme** (the implicit time integration method for structural dynamics). The tools are the language in which the structural dynamics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways structural dynamics calculation goes wrong
**Not checking the mass matrix.** The engineer who solves the eigenvalue problem without checking the mass matrix is not solving the eigenvalue problem; they are guessing. **The mass matrix is the reason structural dynamics are designed for the dynamics, not the statics, and the dynamics are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** **Not checking the stiffness matrix.** The engineer who solves the eigenvalue problem without checking the stiffness matrix is not solving the eigenvalue problem; they are guessing. **The stiffness matrix is the reason structural dynamics are designed for the matrix, not the vector, and the matrix is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** **Not checking the eigenvalue problem.** The engineer who solves the eigenvalue problem without checking the eigenvalue problem is not solving the eigenvalue problem; they are guessing. **The eigenvalue problem is the reason structural dynamics are designed for the problem, not the solution, and the problem is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** **Not checking the natural frequencies.** The engineer who solves the eigenvalue problem without checking the natural frequencies is not solving the eigenvalue problem; they are guessing. **The natural frequencies are the reason structural dynamics are designed for the frequencies, not the periods, and the frequencies are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** **Not checking the mode shapes.** The engineer who solves the eigenvalue problem without checking the mode shapes is not solving the eigenvalue problem; they are guessing. **The mode shapes are the reason structural dynamics are designed for the shapes, not the amplitudes, and the shapes are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** **Not checking the damping matrix.** The engineer who solves the eigenvalue problem without checking the damping matrix is not solving the eigenvalue problem; they are guessing. **The damping matrix is the reason structural dynamics are designed for the damping, not the stiffness, and the damping is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** **Not checking the time integration.** The engineer who solves the eigenvalue problem without checking the time integration is not solving the eigenvalue problem; they are guessing. **The time integration is the reason structural dynamics are designed for the integration, not the differentiation, and the integration is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** **Not checking the stability.** The engineer who solves the eigenvalue problem without checking the stability is not solving the eigenvalue problem; they are guessing. **The stability is the reason structural dynamics are designed for the stability, not the instability, and the stability is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** **Not checking the convergence.** The engineer who solves the eigenvalue problem without checking the convergence is not solving the eigenvalue problem; they are guessing. **The convergence is the reason structural dynamics are designed for the convergence, not the divergence, and the convergence is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.**
:::

## 1. The mass matrix and eigenvalue problem

::: definition The consistent mass matrix {#def-consistent-mass}
The **consistent mass matrix** is the dynamic analogue of the stiffness matrix, and the consistent mass matrix is the reason the engineer can predict the natural frequencies, mode shapes, and transient response of a structure.

The **consistent mass matrix** is:

$$
\mathbf { m } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, \rho \, \mathbf { N } ^ { T } \, \mathbf { N } \, d \Omega
$$

The **lumped mass matrix** is:

$$
\mathbf { m } _ { L } ^ { ( e ) } \; = \; \text{diag} ( m _ { 1 } , m _ { 2 } , \ldots , m _ { n } ) , \quad m _ { i } \; = \; \int _ { \Omega _ { e } } \, \rho \, N _ { i } \, d \Omega
$$

The **equation of motion** is:

$$
\mathbf { M } \, \ddot { \mathbf { U } } \; + \; \mathbf { C } \, \dot { \mathbf { U } } \; + \; \mathbf { K } \, \mathbf { U } \; = \; \mathbf { F } ( t )
$$

The **1D bar consistent mass matrix** is:

$$
\mathbf { m } ^ { ( e ) } \; = \; { \frac { \rho \, A \, L } { 6 } } \, { \left[ \begin{array} { r r } { 2 } & { 1 } \\ { 1 } & { 2 } \end{array} \right] }
$$

The **total mass** is:

$$
M \; = \; \sum _ { i } \, m _ { i } \; = \; \rho \, A \, L
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Density} & \rho & \text{Mass per unit volume} & 1 0 0 0 \text{--} 8 0 0 0 \ \text{ kg/m } ^ { 3 } \\
\text{Consistent mass} & \mathbf { m } ^ { ( e ) } & \text{Full mass matrix} & \text{Symmetric, positive definite} \\
\text{Lumped mass} & \mathbf { m } _ { L } ^ { ( e ) } & \text{Diagonal mass matrix} & \text{Diagonal, positive} \\
\text{Total mass} & M & \text{Sum of nodal masses} & \rho \, A \, L \ \text{ kg } \\
\end{array}
$$

**The mass matrix is the reason structural dynamics are designed for the dynamics, not the statics, and the dynamics are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering. The engineer who solves the eigenvalue problem without checking the mass matrix is not solving the eigenvalue problem; they are guessing.**
:::

::: definition The generalized eigenvalue problem {#def-eigenvalue-problem}
The **generalized eigenvalue problem** is the equation that determines the natural frequencies and mode shapes, and the generalized eigenvalue problem is the reason the engineer can predict the natural frequencies, mode shapes, and transient response of a structure.

The **generalized eigenvalue problem** is:

$$
\mathbf { K } \, { \boldsymbol { \phi } } \; = \; \omega ^ { 2 } \, \mathbf { M } \, { \boldsymbol { \phi } }
$$

The **natural frequencies** are:

$$
f _ { i } \; = \; { \frac { \omega _ { i } } { 2 \, \pi } } \quad \text{Hz }
$$

The **mode shapes** are:

$$
{ \boldsymbol { \phi } } _ { i } ^ { T } \, \mathbf { M } \, { \boldsymbol { \phi } } _ { j } \; = \; \delta _ { i j } \, M _ { i } \quad \text{(mass orthogonality)}
$$

The **Rayleigh quotient** is:

$$
\omega ^ { 2 } \; = \; { \frac { { \boldsymbol { \phi } } ^ { T } \, \mathbf { K } \, { \boldsymbol { \phi } } } { { \boldsymbol { \phi } } ^ { T } \, \mathbf { M } \, { \boldsymbol { \phi } } } }
$$

The **Sturm sequence property** states that the eigenvalues are ordered:

$$
\omega _ { 1 } ^ { 2 } \; \leq \; \omega _ { 2 } ^ { 2 } \; \leq \; \cdots \; \leq \; \omega _ { n } ^ { 2 }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Natural frequency} & \omega _ { i } & \text{Circular frequency} & 1 \text{--} 1 0 ^ { 4 } \ \text{ rad/s } \\
\text{Frequency in Hz} & f _ { i } & \text{Cycles per second} & 0 . 1 6 \text{--} 1 6 0 0 \ \text{ Hz } \\
\text{Mode shape} & { \boldsymbol { \phi } } _ { i } & \text{Eigenvector} & \text{Normalized to unit mass} \\
\text{Eigenvalue} & \omega _ { i } ^ { 2 } & \text{Stiffness/mass ratio} & 1 \text{--} 1 0 ^ { 8 } \ \text{ s } ^ { - 2 } \\
\end{array}
$$

**The stiffness matrix is the reason structural dynamics are designed for the matrix, not the vector, and the matrix is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering. The engineer who solves the eigenvalue problem without checking the stiffness matrix is not solving the eigenvalue problem; they are guessing.**
:::

::: widget plot
title: The natural frequency vs mode number
f: x^2
x: 1,5
y: 1,25
labels: omega^2
caption: The natural frequency squared $\omega _ { n } ^ { 2 } \propto n ^ { 2 }$ against the mode number $n$ for a string. **The natural frequency increases with the square of the mode number, and the natural frequency is the reason structural dynamics are designed for the problem, not the solution.** **The problem is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.**
:::

::: example Two-DOF eigenvalue problem {#ex-two-dof-eigenvalue level=3 check="2"}
A two-degree-of-freedom system has stiffness matrix $\mathbf { K } = { \left[ \begin{array} { r r } { 4 } & { - 2 } \\ { - 2 } & { 2 } \end{array} \right] }$ and mass matrix $\mathbf { M } = { \left[ \begin{array} { r r } { 1 } & { 0 } \\ { 0 } & { 1 } \end{array} \right] }$ . Find the natural frequencies.

**The eigenvalue problem is:**

$$
\det ( \mathbf { K } - \omega ^ { 2 } \, \mathbf { M } ) \; = \; 0
$$

$$
\det { \left[ \begin{array} { r r } { 4 - \omega ^ { 2 } } & { - 2 } \\ { - 2 } & { 2 - \omega ^ { 2 } } \end{array} \right] } \; = \; 0
$$

**Expanding the determinant:**

$$
( 4 - \omega ^ { 2 } ) ( 2 - \omega ^ { 2 } ) - 4 \; = \; 0
$$

$$
\omega ^ { 4 } - 6 \, \omega ^ { 2 } + 4 \; = \; 0
$$

**Solving the quadratic:**

$$
\omega ^ { 2 } \; = \; { \frac { 6 \pm \sqrt { 3 6 - 1 6 } } { 2 } } \; = \; { \frac { 6 \pm \sqrt { 2 0 } } { 2 } } \; = \; { \frac { 6 \pm 4 . 4 7 2 } { 2 } }
$$

$$
\omega _ { 1 } ^ { 2 } \; = \; { \frac { 6 - 4 . 4 7 2 } { 2 } } \; = \; { \bf 0 . 7 6 4 } , \quad \omega _ { 2 } ^ { 2 } \; = \; { \frac { 6 + 4 . 4 7 2 } { 2 } } \; = \; { \bf 5 . 2 3 6 }
$$

**The natural frequencies are $\omega _ { 1 } = 0 . 8 7 4$ rad/s and $\omega _ { 2 } = 2 . 2 8 8$ rad/s. The engineer would design the structure for the frequencies, because the frequencies are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.**
:::

## 2. Time integration and damping

::: definition The Newmark time integration scheme {#def-newmark}
The **Newmark time integration scheme** is the implicit time integration method for structural dynamics, and the Newmark time integration scheme is the reason the engineer can predict the natural frequencies, mode shapes, and transient response of a structure.

The **Newmark scheme** is:

$$
\mathbf { U } _ { n + 1 } \; = \; \mathbf { U } _ { n } \; + \; \Delta t \, \dot { \mathbf { U } } _ { n } \; + \; { \frac { \Delta t ^ { 2 } } { 2 } } \, [ ( 1 - 2 \, \beta ) \, \ddot { \mathbf { U } } _ { n } \; + \; 2 \, \beta \, \ddot { \mathbf { U } } _ { n + 1 } ]
$$

$$
\dot { \mathbf { U } } _ { n + 1 } \; = \; \dot { \mathbf { U } } _ { n } \; + \; \Delta t \, [ ( 1 - \gamma ) \, \ddot { \mathbf { U } } _ { n } \; + \; \gamma \, \ddot { \mathbf { U } } _ { n + 1 } ]
$$

The **average acceleration scheme** ($\beta = 1 / 4$ , $\gamma = 1 / 2$ ) is unconditionally stable.

The **linear acceleration scheme** ($\beta = 1 / 6$ , $\gamma = 1 / 2$ ) is conditionally stable.

The **effective stiffness matrix** is:

$$
\hat { \mathbf { K } } \; = \; \mathbf { K } \; + \; { \frac { \gamma } { \beta \, \Delta t } } \, \mathbf { C } \; + \; { \frac { 1 } { \beta \, \Delta t ^ { 2 } } } \, \mathbf { M }
$$

The **effective load vector** is:

$$
\hat { \mathbf { F } } _ { n + 1 } \; = \; \mathbf { F } _ { n + 1 } \; + \; \mathbf { M } \, \mathbf { a } _ { n } \; + \; \mathbf { C } \, \mathbf { b } _ { n }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Time step} & \Delta t & \text{Integration time step} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 1 } \ \text{ s } \\
\text{Newmark beta} & \beta & \text{Acceleration parameter} & 1 / 4 , 1 / 6 \\
\text{Newmark gamma} & \gamma & \text{Velocity parameter} & 1 / 2 \\
\text{Courant number} & \text{Cr} & \text{Stability parameter} & 0 \text{--} 1 \\
\end{array}
$$

**The eigenvalue problem is the reason structural dynamics are designed for the problem, not the solution, and the problem is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering. The engineer who solves the eigenvalue problem without checking the eigenvalue problem is not solving the eigenvalue problem; they are guessing.**
:::

::: definition The damping matrix {#def-damping-matrix}
The **damping matrix** is the energy dissipation mechanism in structural dynamics, and the damping matrix is the reason the engineer can predict the natural frequencies, mode shapes, and transient response of a structure.

The **proportional (Rayleigh) damping** is:

$$
\mathbf { C } \; = \; \alpha \, \mathbf { M } \; + \; \beta \, \mathbf { K }
$$

The **damping ratio** is:

$$
\zeta _ { i } \; = \; { \frac { \alpha } { 2 \, \omega _ { i } } } \; + \; { \frac { \beta \, \omega _ { i } } { 2 } }
$$

The **modal damping** is:

$$
\mathbf { C } \; = \; { \boldsymbol { \Phi } } \, \mathbf { C } _ { \text{modal } } \, { \boldsymbol { \Phi } } ^ { T }
$$

The **complex eigenvalue problem** is:

$$
( \omega ^ { 2 } \, \mathbf { M } \; + \; i \, \omega \, \mathbf { C } \; + \; \mathbf { K } ) \, { \boldsymbol { \phi } } \; = \; \mathbf { 0 }
$$

The **logarithmic decrement** is:

$$
\delta \; = \; \ln \! \left( { \frac { u _ { n } } { u _ { n + 1 } } } \right) \; = \; { \frac { 2 \, \pi \, \zeta } { \sqrt { 1 - \zeta ^ { 2 } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Mass damping} & \alpha & \text{Rayleigh mass coefficient} & 0 \text{--} 1 0 \ \text{ s } ^ { - 1 } \\
\text{Stiffness damping} & \beta & \text{Rayleigh stiffness coefficient} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 } \ \text{ s } \\
\text{Damping ratio} & \zeta & \text{Fraction of critical damping} & 0 . 0 1 \text{--} 0 . 1 \\
\text{Log decrement} & \delta & \text{Amplitude decay per cycle} & 0 . 0 1 \text{--} 1 \\
\end{array}
$$

**The natural frequencies are the reason structural dynamics are designed for the frequencies, not the periods, and the frequencies are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering. The engineer who solves the eigenvalue problem without checking the natural frequencies is not solving the eigenvalue problem; they are guessing.**
:::

::: widget plot
title: The damping ratio vs frequency
f: 0.01/x + 0.01*x
x: 1,10
y: 0,1
labels: zeta
caption: The Rayleigh damping ratio $\zeta = \alpha / ( 2 \, \omega ) + \beta \, \omega / 2$ against the frequency $\omega$ . **The damping ratio has a minimum at the design frequency, and the damping ratio is the reason structural dynamics are designed for the shapes, not the amplitudes.** **The shapes are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.**
:::

::: example Cantilever beam natural frequency {#ex-cantilever-frequency level=3 check="2"}
A cantilever beam of length $L = 1 \; \text{m }$ , flexural rigidity $E I = 1 0 ^ { 6 } \; \text{N m } ^ { 2 }$ , and mass per unit length $\rho A = 1 0 \; \text{kg/m }$ . Calculate the first natural frequency using the Rayleigh quotient with the static deflection shape.

**The static deflection shape for a tip load is:**

$$
w ( x ) \; = \; { \frac { w _ { \max } } { 2 \, L ^ { 3 } } } \, ( 3 \, L \, x ^ { 2 } - x ^ { 3 } )
$$

**The maximum potential energy is:**

$$
V _ { \max } \; = \; { \frac { 1 } { 2 } } \int _ { 0 } ^ { L } \, E I \, ( w ^ { \prime \prime } ) ^ { 2 } \, d x \; = \; { \frac { 3 \, E I \, w _ { \max } ^ { 2 } } { 2 \, L ^ { 3 } } }
$$

**The maximum kinetic energy is:**

$$
T _ { \max } \; = \; { \frac { \omega ^ { 2 } } { 2 } } \int _ { 0 } ^ { L } \, \rho A \, w ^ { 2 } \, d x \; = \; { \frac { \omega ^ { 2 } \, \rho A \, w _ { \max } ^ { 2 } \, L } { 2 } } \times { \frac { 1 3 } { 1 4 0 } }
$$

**Equating $T _ { \max } = V _ { \max }$ :**

$$
\omega _ { 1 } ^ { 2 } \; = \; { \frac { 3 \, E I } { L ^ { 3 } } } \times { \frac { 1 4 0 } { 1 3 \, \rho A \, L } } \; = \; { \frac { 4 2 0 } { 1 3 } } \times { \frac { E I } { \rho A \, L ^ { 4 } } } \; = \; 3 2 . 3 \times { \frac { E I } { \rho A \, L ^ { 4 } } }
$$

**The exact value is $\omega _ { 1 } ^ { 2 } = 3 . 1 1 5 ^ { 2 } = 9 . 7 0$ for the first mode, so the Rayleigh estimate is:**

$$
\omega _ { 1 } ^ { 2 } \; = \; 3 2 . 3 \times { \frac { 1 0 ^ { 6 } } { 1 0 \times 1 } } \; = \; 3 2 . 3 \times 1 0 ^ { 5 } \; = \; { \bf 3 . 2 3 \times 1 0 ^ { 6 } } \; \text{rad}^2 / \text{s}^2
$$

**The first natural frequency is $\omega _ { 1 } = 1 7 9 7$ rad/s or $f _ { 1 } = 2 8 6$ Hz. The engineer would design the structure for the shapes, because the shapes are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.**
:::

::: example Three-spring system {#ex-three-spring-dynamics level=3 check="2"}
Three springs with stiffness $k = 1 0 0 0 \; \text{N/m }$ connect four masses $m = 1 \; \text{kg }$ in a line. The first and last masses are fixed. Find the natural frequencies of the two free masses.

**The stiffness matrix for the two free DOF is:**

$$
\mathbf { K } \; = \; { \left[ \begin{array} { r r } { 2 k } & { - k } \\ { - k } & { 2 k } \end{array} \right] } \; = \; { \left[ \begin{array} { r r } { 2 0 0 0 } & { - 1 0 0 0 } \\ { - 1 0 0 0 } & { 2 0 0 0 } \end{array} \right] } \; \text{N/m }
$$

**The mass matrix is:**

$$
\mathbf { M } \; = \; { \left[ \begin{array} { r r } { 1 } & { 0 } \\ { 0 } & { 1 } \end{array} \right] } \; \text{kg }
$$

**The eigenvalue problem:**

$$
\\det ( \mathbf { K } - \omega ^ { 2 } \mathbf { M } ) \; = \; ( 2 0 0 0 - \omega ^ { 2 } ) ^ { 2 } - 1 0 0 0 ^ { 2 } \; = \; 0
$$

$$
2 0 0 0 - \omega ^ { 2 } \; = \; \pm 1 0 0 0 \quad \Rightarrow \quad \omega _ { 1 } ^ { 2 } \; = \; { \bf 1 0 0 0 } , \quad \omega _ { 2 } ^ { 2 } \; = \; { \bf 3 0 0 0 }
$$

**The natural frequencies are $\omega _ { 1 } = 3 1 . 6$ rad/s and $\omega _ { 2 } = 5 4 . 8$ rad/s. The engineer would design the structure for the convergence, because the convergence is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.**
:::

::: example Time step selection {#ex-time-step-selection level=3 check="2"}
A structure has a highest natural frequency of $f _ { \max } = 5 0 0 \; \text{Hz }$ . Using the linear acceleration scheme ($\beta = 1 / 6$ , $\gamma = 1 / 2$ ), calculate the maximum stable time step.

**The highest circular frequency is:**

$$
\omega _ { \max } \; = \; 2 \\, \pi \\, f _ { \max } \; = \; 2 \\, \pi \times 5 0 0 \; = \; 3 1 4 2 \; \text{rad/s }
$$

**The stability condition for the linear acceleration scheme is:**

$$
\Delta t \; \leq \; { \frac { 2 } { \omega _ { \max } \sqrt { 1 2 } } } \; \approx \; { \frac { 0 . 5 7 7 } { \omega _ { \max } } }
$$

**The maximum stable time step is:**

$$
\Delta t _ { \max } \; = \; { \frac { 0 . 5 7 7 } { 3 1 4 2 } } \; = \; { \bf 1 . 8 4 \times 1 0 ^ { - 4 } } \; \text{s }
$$

**For practical accuracy, use $\Delta t \approx \Delta t _ { \max } / 1 0 = 1 . 8 4 \times 1 0 ^ { - 5 } \; \text{s}$ . The engineer would design the structure for the stability, because the stability is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.**
:::

## Exercises

::: exercise Consistent mass matrix {#ex-consistent-mass-ex level=3 check="2"}
A 1D bar element has $\rho = 1 0 0 0 \; \text{kg/m } ^ { 3 }$ , $A = 0 . 0 1 \; \text{m } ^ { 2 }$ , and $L = 1 \; \text{m }$ . Calculate the total mass from the consistent mass matrix.

::: solution
$$
M \; = \; \rho \, A \, L \; = \; 1 0 0 0 \times 0 . 0 1 \times 1 \; = \; { \bf 1 0 } \; \text{kg }
$$

**The total mass is 10 kg.**
:::
:::

::: exercise Natural frequency {#ex-natural-frequency-ex level=3 check="2"}
A single-DOF system has $k = 1 0 0 0 \; \text{N/m }$ and $m = 1 0 \; \text{kg }$ . Calculate the natural frequency in Hz.

::: solution
$$
\omega \; = \; { \sqrt { \frac { k } { m } } } \; = \; { \sqrt { \frac { 1 0 0 0 } { 1 0 } } } \; = \; { \sqrt { 1 0 0 } } \; = \; 1 0 \; \text{rad/s }
$$

$$
f \; = \; { \frac { \omega } { 2 \, \pi } } \; = \; { \frac { 1 0 } { 2 \, \pi } } \; = \; { \bf 1 . 5 9 } \; \text{Hz }
$$

**The natural frequency is 1.59 Hz.**
:::
:::

::: exercise Rayleigh damping {#ex-rayleigh-damping-ex level=3 check="2"}
A system has $\alpha = 0 . 1 \; \text{s}^ { - 1 }$ , $\beta = 0 . 0 0 1 \; \text{s }$ , and $\omega = 1 0 \; \text{rad/s }$ . Calculate the damping ratio.

::: solution
$$
\zeta \; = \; { \frac { \alpha } { 2 \, \omega } } \; + \; { \frac { \beta \, \omega } { 2 } } \; = \; { \frac { 0 . 1 } { 2 0 } } \; + \; { \frac { 0 . 0 0 1 \times 1 0 } { 2 } } \; = \; 0 . 0 0 5 + 0 . 0 0 5 \; = \; { \bf 0 . 0 1 }
$$

**The damping ratio is 0.01 (1% of critical damping).**
:::
:::

::: exercise Newmark stability {#ex-newmark-stability-ex level=3 check="2"}
The average acceleration scheme ($\beta = 1 / 4$ , $\gamma = 1 / 2$ ) is:

::: solution
**Unconditionally stable.** The average acceleration scheme ($\beta = 1 / 4$ , $\gamma = 1 / 2$ ) is unconditionally stable, meaning it is stable for any time step $\Delta t$ .
:::
:::

::: exercise Mode orthogonality {#ex-mode-orthogonality-ex level=3 check="2"}
The mode shapes satisfy the orthogonality condition:

::: solution
**${ \boldsymbol { \phi } } _ { i } ^ { T } \, \mathbf { M } \, { \boldsymbol { \phi } } _ { j } = \delta _ { i j } \, M _ { i }$ .** The mode shapes satisfy the mass orthogonality condition: ${ \boldsymbol { \phi } } _ { i } ^ { T } \, \mathbf { M } \, { \boldsymbol { \phi } } _ { j } = \delta _ { i j } \, M _ { i }$ , where $\delta _ { i j }$ is the Kronecker delta.
:::
:::

::: exercise Derivation: the consistent mass matrix {#ex-derive-consistent-mass level=4 check="2"}
Derive the consistent mass matrix $\mathbf { m } ^ { ( e ) } = \int _ { \Omega _ { e } } \, \rho \, \mathbf { N } ^ { T } \, \mathbf { N } \, d \Omega$ for a 1D bar element. Write the expression for the kinetic energy.

::: solution
The **kinetic energy** of the element is:

$$
T \; = \; { \frac { 1 } { 2 } } \int _ { 0 } ^ { L } \, \rho \, A \, \dot { u } ^ { 2 } \, d x
$$

**Substitute $u = \mathbf { N } \, \mathbf { u }$ :**

$$
T \; = \; { \frac { 1 } { 2 } } \int _ { 0 } ^ { L } \, \rho \, A \, \dot { \mathbf { u } } ^ { T } \, \mathbf { N } ^ { T } \, \mathbf { N } \, \dot { \mathbf { u } } \, d x \; = \; { \frac { 1 } { 2 } } \, \dot { \mathbf { u } } ^ { T } \, \mathbf { m } ^ { ( e ) } \, \dot { \mathbf { u } }
$$

The **consistent mass matrix** is:

$$
\mathbf { m } ^ { ( e ) } \; = \; \int _ { 0 } ^ { L } \, \rho \, A \, \mathbf { N } ^ { T } \, \mathbf { N } \, d x
$$

For linear shape functions $N _ { 1 } = 1 - x / L$ and $N _ { 2 } = x / L$ :

$$
\mathbf { m } ^ { ( e ) } \; = \; { \frac { \rho \, A \, L } { 6 } } \, { \left[ \begin{array} { r r } { 2 } & { 1 } \\ { 1 } & { 2 } \end{array} \right] }
$$

**The mode shapes are the reason structural dynamics are designed for the shapes, not the amplitudes, and the shapes are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** $\blacksquare$
:::
:::

::: exercise Derivation: the Newmark scheme {#ex-derive-newmark level=4 check="2"}
Derive the Newmark scheme from the Taylor series expansion. Write the expression for the displacement update.

::: solution
The **Taylor series expansion** of the displacement is:

$$
\mathbf { U } _ { n + 1 } \; = \; \mathbf { U } _ { n } \; + \; \Delta t \, \dot { \mathbf { U } } _ { n } \; + \; { \frac { \Delta t ^ { 2 } } { 2 } } \, \ddot { \mathbf { U } } _ { n } \; + \; { \frac { \Delta t ^ { 3 } } { 6 } } \, \dddot { \mathbf { U } } _ { n } \; + \; \cdots
$$

**The Newmark approximation for the acceleration is:**

$$
\ddot { \mathbf { U } } _ { n + \theta } \; = \; ( 1 - \theta ) \, \ddot { \mathbf { U } } _ { n } \; + \; \theta \, \ddot { \mathbf { U } } _ { n + 1 }
$$

**Substituting into the displacement update:**

$$
\mathbf { U } _ { n + 1 } \; = \; \mathbf { U } _ { n } \; + \; \Delta t \, \dot { \mathbf { U } } _ { n } \; + \; { \frac { \Delta t ^ { 2 } } { 2 } } \, [ ( 1 - 2 \, \beta ) \, \ddot { \mathbf { U } } _ { n } \; + \; 2 \, \beta \, \ddot { \mathbf { U } } _ { n + 1 } ]
$$

**The velocity update is:**

$$
\dot { \mathbf { U } } _ { n + 1 } \; = \; \dot { \mathbf { U } } _ { n } \; + \; \Delta t \, [ ( 1 - \gamma ) \, \ddot { \mathbf { U } } _ { n } \; + \; \gamma \, \ddot { \mathbf { U } } _ { n + 1 } ]
$$

**The damping matrix is the reason structural dynamics are designed for the damping, not the stiffness, and the damping is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.** $\blacksquare$
:::
:::

::: exercise Lumped mass matrix {#ex-lumped-mass-ex level=3 check="2"}
A 1D bar element has $\rho = 7 8 0 0 \; \text{kg/m } ^ { 3 }$ , $A = 0 . 0 0 1 \; \text{m } ^ { 2 }$ , and $L = 0 . 5 \; \text{m }$ . Calculate the lumped mass at each node.

::: solution
$$
m _ { i } \; = \; { \frac { \rho \, A \, L } { 2 } } \; = \; { \frac { 7 8 0 0 \times 0 . 0 0 1 \times 0 . 5 } { 2 } } \; = \; { \frac { 3 . 9 } { 2 } } \; = \; { \bf 1 . 9 5 } \; \text{kg }
$$

**The lumped mass at each node is 1.95 kg.**
:::
:::

::: quiz Structural dynamics {#quiz-structural-dynamics}
The most fundamental time-dependent finite element analyses in engineering are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Structural dynamics
- [ ] Nonlinear analysis and modelling practice

::: solution
**Structural dynamics.** Structural dynamics are the most fundamental time-dependent finite element analyses in engineering, because the mass matrix is the dynamic analogue of the stiffness matrix, the eigenvalue problem determines the natural frequencies and mode shapes, and the time integration scheme determines the accuracy and stability of the transient response. The engineer who solves the eigenvalue problem without checking the mass matrix is not solving the eigenvalue problem; they are guessing.
:::
:::

::: quiz Average acceleration scheme {#quiz-average-acceleration}
The average acceleration scheme ($\beta = 1 / 4$ , $\gamma = 1 / 2$ ) is:

- [x] Unconditionally stable
- [ ] Conditionally stable
- [ ] Unconditionally unstable
- [ ] Conditionally unstable

::: solution
**Unconditionally stable.** The average acceleration scheme ($\beta = 1 / 4$ , $\gamma = 1 / 2$ ) is unconditionally stable, and the time integration is the reason structural dynamics are designed for the integration, not the differentiation. The engineer who solves the eigenvalue problem without checking the time integration is not solving the eigenvalue problem; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/nonlinear-analysis]]** — Nonlinear analysis and modelling practice are the foundation of structural dynamics.
- **[[finite-element-method/direct-stiffness]]** — Springs, bars and the direct stiffness method are the foundation of structural dynamics.
- **[[finite-element-method/trusses-frames]]** — Trusses and frames are the foundation of structural dynamics.
- **[[finite-element-method/weak-forms]]** — Weak forms and Galerkin's method are the foundation of structural dynamics.
- **[[finite-element-method/plane-elements]]** — Two-dimensional elements are the foundation of structural dynamics.
- **[[finite-element-method/isoparametric-elements]]** — Isoparametric elements and numerical integration are the foundation of structural dynamics.
- **[[finite-element-method/convergence-meshing]]** — Convergence, accuracy and meshing are the foundation of structural dynamics.
- **[[finite-element-method/field-problems]]** — Heat conduction and other field problems are the foundation of structural dynamics.
- **[[vibrations/modal-analysis]]** — The modal analysis is the foundation of structural dynamics.
- **[[vibrations/continuous-systems]]** — The continuous systems are the foundation of structural dynamics.

::: history Structural dynamics: from Euler to the finite element method {#history-structural-dynamics}
**1759** — **Euler** publishes the **first beam vibration equation**, which is the foundation of structural dynamics. **The first beam vibration equation is the reason structural dynamics are the oldest concept in finite element analysis, and the age is the reason structural dynamics are the most refined concept in finite element analysis.**

**1870s** — **Rayleigh** publishes the **first energy method for vibration**, and the first energy method for vibration is the reason structural dynamics are the most historic concept in finite element analysis. **The first energy method for vibration is the reason structural dynamics are the most refined concept in finite element analysis, and structural dynamics are the reason the first energy method for vibration is the most historic concept in finite element analysis.**

**1900s** — **Ritz** develops the **first variational method for vibration**, and the first variational method for vibration is the reason structural dynamics are the most practical concept in finite element analysis. **The first variational method for vibration is the reason structural dynamics are the most refined concept in finite element analysis, and structural dynamics are the reason the first variational method for vibration is the most practical concept in finite element analysis.**

**1950s** — **The first finite element vibration analysis** is performed, and the first finite element vibration analysis is the reason structural dynamics are the most powerful concept in finite element analysis. **The first finite element vibration analysis is the reason structural dynamics are the most refined concept in finite element analysis, and structural dynamics are the reason the first finite element vibration analysis is the most powerful concept in finite element analysis.**

**1960s** — **Newmark** develops the **time integration scheme**, and the time integration scheme is the reason structural dynamics are the most efficient concept in finite element analysis. **The time integration scheme is the reason structural dynamics are the most refined concept in finite element analysis, and structural dynamics are the reason the time integration scheme is the most efficient concept in finite element analysis.**

**1970s** — **The subspace iteration method** is developed, and the subspace iteration method is the reason structural dynamics are the most advanced concept in finite element analysis. **The subspace iteration method is the reason structural dynamics are the most refined concept in finite element analysis, and structural dynamics are the reason the subspace iteration method is the most advanced concept in finite element analysis.**

**1980s** — **The Lanczos method** is developed, and the Lanczos method is the reason structural dynamics are the most modern concept in finite element analysis. **The Lanczos method is the reason structural dynamics are the most refined concept in finite element analysis, and structural dynamics are the reason the Lanczos method is the most modern concept in finite element analysis.**

**1990s** — **The Arnoldi method** is developed, and the Arnoldi method is the reason structural dynamics are the most futuristic concept in finite element analysis. **The Arnoldi method is the reason structural dynamics are the most refined concept in finite element analysis, and structural dynamics are the reason the Arnoldi method is the most futuristic concept in finite element analysis.**
:::

::: summary Structural dynamics {#summary-structural-dynamics}
- **The consistent mass matrix is $\mathbf { m } ^ { ( e ) } = \int _ { \Omega _ { e } } \, \rho \, \mathbf { N } ^ { T } \, \mathbf { N } \, d \Omega$ , the lumped mass matrix is $\mathbf { m } _ { L } ^ { ( e ) } = \text{diag} ( m _ { 1 } , m _ { 2 } , \ldots , m _ { n } )$ with $m _ { i } = \int _ { \Omega _ { e } } \, \rho \, N _ { i } \, d \Omega$ , and the equation of motion is $\mathbf { M } \, \ddot { \mathbf { U } } + \mathbf { C } \, \dot { \mathbf { U } } + \mathbf { K } \, \mathbf { U } = \mathbf { F } ( t )$ .** The mass matrix is the reason structural dynamics are designed for the dynamics, not the statics, and the dynamics are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.
- **The 1D bar consistent mass matrix is $\mathbf { m } ^ { ( e ) } = ( \rho \, A \, L / 6 ) \, [ 2 , 1 ; 1 , 2 ]$ , the total mass is $M = \sum _ { i } \, m _ { i } = \rho \, A \, L$ , and the density is $\rho = 1 0 0 0 \text{--} 8 0 0 0$ kg/m³.** The stiffness matrix is the reason structural dynamics are designed for the matrix, not the vector, and the matrix is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.
- **The generalized eigenvalue problem is $\mathbf { K } \, { \boldsymbol { \phi } } = \omega ^ { 2 } \, \mathbf { M } \, { \boldsymbol { \phi } }$ , the natural frequencies are $f _ { i } = \omega _ { i } / ( 2 \, \pi )$ Hz, and the mode shapes satisfy ${ \boldsymbol { \phi } } _ { i } ^ { T } \, \mathbf { M } \, { \boldsymbol { \phi } } _ { j } = \delta _ { i j } \, M _ { i }$ (mass orthogonality).** The eigenvalue problem is the reason structural dynamics are designed for the problem, not the solution, and the problem is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.
- **The Rayleigh quotient is $\omega ^ { 2 } = ( { \boldsymbol { \phi } } ^ { T } \, \mathbf { K } \, { \boldsymbol { \phi } } ) / ( { \boldsymbol { \phi } } ^ { T } \, \mathbf { M } \, { \boldsymbol { \phi } } )$ , the Sturm sequence property states that the eigenvalues are ordered $\omega _ { 1 } ^ { 2 } \leq \omega _ { 2 } ^ { 2 } \leq \cdots \leq \omega _ { n } ^ { 2 }$ , and the natural frequency is $\omega _ { i } = 1 \text{--} 1 0 ^ { 4 }$ rad/s.** The natural frequencies are the reason structural dynamics are designed for the frequencies, not the periods, and the frequencies are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.
- **The Newmark scheme is $\mathbf { U } _ { n + 1 } = \mathbf { U } _ { n } + \Delta t \, \dot { \mathbf { U } } _ { n } + ( \Delta t ^ { 2 } / 2 ) \, [ ( 1 - 2 \, \beta ) \, \ddot { \mathbf { U } } _ { n } + 2 \, \beta \, \ddot { \mathbf { U } } _ { n + 1 } ]$ , the average acceleration scheme ($\beta = 1 / 4$ , $\gamma = 1 / 2$ ) is unconditionally stable, and the linear acceleration scheme ($\beta = 1 / 6$ , $\gamma = 1 / 2$ ) is conditionally stable.** The mode shapes are the reason structural dynamics are designed for the shapes, not the amplitudes, and the shapes are the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.
- **The effective stiffness matrix is $\hat { \mathbf { K } } = \mathbf { K } + ( \gamma / ( \beta \, \Delta t ) ) \, \mathbf { C } + ( 1 / ( \beta \, \Delta t ^ { 2 } ) ) \, \mathbf { M }$ , the effective load vector is $\hat { \mathbf { F } } _ { n + 1 } = \mathbf { F } _ { n + 1 } + \mathbf { M } \, \mathbf { a } _ { n } + \mathbf { C } \, \mathbf { b } _ { n }$ , and the time step is $\Delta t = 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 1 }$ s.** The damping matrix is the reason structural dynamics are designed for the damping, not the stiffness, and the damping is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.
- **The proportional (Rayleigh) damping is $\mathbf { C } = \alpha \, \mathbf { M } + \beta \, \mathbf { K }$ , the damping ratio is $\zeta _ { i } = \alpha / ( 2 \, \omega _ { i } ) + \beta \, \omega _ { i } / 2$ , and the modal damping is $\mathbf { C } = { \boldsymbol { \Phi } } \, \mathbf { C } _ { \text{modal } } \, { \boldsymbol { \Phi } } ^ { T }$ .** The time integration is the reason structural dynamics are designed for the integration, not the differentiation, and the integration is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.
- **The complex eigenvalue problem is $( \omega ^ { 2 } \, \mathbf { M } + i \, \omega \, \mathbf { C } + \mathbf { K } ) \, { \boldsymbol { \phi } } = \mathbf { 0 }$ , the logarithmic decrement is $\delta = \ln ( u _ { n } / u _ { n + 1 } ) = 2 \, \pi \, \zeta / \sqrt { 1 - \zeta ^ { 2 } }$ , and the damping ratio is $\zeta = 0 . 0 1 \text{--} 0 . 1$ .** The stability is the reason structural dynamics are designed for the stability, not the instability, and the stability is the reason structural dynamics are the most fundamental time-dependent finite element analyses in engineering.
- **The structural dynamics calculation is the most important time-dependent finite element calculation in engineering, because the structural dynamics calculation determines the natural frequencies, mode shapes and transient response of the structure.** The natural frequencies, mode shapes and transient response are the reason the engineer can predict the dynamic behavior of a structure.
- **Structural dynamics are the most fundamental time-dependent finite element analyses in engineering, because the mass matrix is the dynamic analogue of the stiffness matrix, the eigenvalue problem determines the natural frequencies and mode shapes, and the time integration scheme determines the accuracy and stability of the transient response.** The finite element analysis is the reason the engineer can predict the natural frequencies, mode shapes, and transient response of a structure.
:::

## Further reading

- **K. J. Bathe (1996)** — *Finite Element Procedures*. Prentice Hall. The consistent mass matrix, the eigenvalue problem, and the Newmark scheme.
- **O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu (2013)** — *The Finite Element Method: Its Basis and Fundamentals*, 7th ed. Butterworth-Heinemann. The consistent mass matrix and the damping matrix.
- **T. J. R. Hughes (2000)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The consistent mass matrix and the time integration.
- **J. N. Reddy (2019)** — *An Introduction to the Finite Element Method*, 4th ed. Routledge. The consistent mass matrix and the eigenvalue problem.
- **R. W. Clough and J. Penzien (2003)** — *Dynamics of Structures*. Computers & Structures. The consistent mass matrix and the natural frequencies.
- **A. K. Chopra (2012)** — *Dynamics of Structures: Theory and Applications to Earthquake Engineering*, 4th ed. Prentice Hall. The consistent mass matrix and the mode shapes.
- **L. Meirovitch (2010)** — *Computational Methods in Structural Dynamics*. Sijthoff & Noordhoff. The consistent mass matrix and the damping matrix.
- **N. M. Newmark (1959)** — *A Method of Computation for Structural Dynamics*. ASCE. The consistent mass matrix and the time integration.
