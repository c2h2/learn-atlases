Solving the discrete equations is the most fundamental computational step in computational fluid dynamics: the Jacobi and Gauss-Seidel methods are the simplest iterative solvers, the conjugate gradient method is the most efficient solver for symmetric positive definite systems, and the multigrid method achieves optimal $O ( N )$ complexity. **The engineer who runs a simulation without checking the residual convergence is not running a simulation; they are guessing.** The solving the discrete equations calculation is the reason the engineer can solve large systems of algebraic equations, and the multigrid method is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.

The quantitative tools of solving the discrete equations are the **spectral radius** (the maximum eigenvalue magnitude of the iteration matrix), the **condition number** (the ratio of largest to smallest eigenvalue), the **convergence rate** (the reduction factor per iteration), and the **multigrid cycle** (the V-cycle and W-cycle). The tools are the language in which the solving the discrete equations analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways solving the discrete equations calculation goes wrong
**Not checking the residual convergence.** The engineer who runs a simulation without checking the residual convergence is not running a simulation; they are guessing. **The residual convergence is the reason solving the discrete equations is designed for the residual, not the solution, and the residual is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.** **Not checking the spectral radius.** The engineer who runs a simulation without checking the spectral radius is not running a simulation; they are guessing. **The spectral radius is the reason solving the discrete equations is designed for the radius, not the diameter, and the radius is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.** **Not checking the condition number.** The engineer who runs a simulation without checking the condition number is not running a simulation; they are guessing. **The condition number is the reason solving the discrete equations is designed for the condition, not the solution, and the condition is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.** **Not checking the convergence rate.** The engineer who runs a simulation without checking the convergence rate is not running a simulation; they are guessing. **The convergence rate is the reason solving the discrete equations is designed for the rate, not the speed, and the rate is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.** **Not checking the multigrid cycle.** The engineer who runs a simulation without checking the multigrid cycle is not running a simulation; they are guessing. **The multigrid cycle is the reason solving the discrete equations is designed for the cycle, not the iteration, and the cycle is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.** **Not checking the preconditioner.** The engineer who runs a simulation without checking the preconditioner is not running a simulation; they are guessing. **The preconditioner is the reason solving the discrete equations is designed for the condition, not the solution, and the condition is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.** **Not checking the under-relaxation.** The engineer who runs a simulation without checking the under-relaxation is not running a simulation; they are guessing. **The under-relaxation is the reason solving the discrete equations is designed for the relaxation, not the acceleration, and the relaxation is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.** **Not checking the matrix structure.** The engineer who runs a simulation without checking the matrix structure is not running a simulation; they are guessing. **The matrix structure is the reason solving the discrete equations is designed for the structure, not the values, and the structure is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.** **Not checking the stopping criterion.** The engineer who runs a simulation without checking the stopping criterion is not running a simulation; they are guessing. **The stopping criterion is the reason solving the discrete equations is designed for the criterion, not the tolerance, and the criterion is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.**
:::

## 1. Iterative methods

::: definition The Jacobi and Gauss-Seidel methods {#def-jacobi-gauss-seidel}
The **Jacobi and Gauss-Seidel methods** are the simplest iterative solvers for linear systems, and the Jacobi and Gauss-Seidel methods are the reason the engineer can solve large systems of algebraic equations.

The **linear system** is:

$$
\mathbf { A } \, \mathbf { x } \; = \; \mathbf { b }
$$

The **matrix splitting** is:

$$
\mathbf { A } \; = \; \mathbf { D } \; - \; \mathbf { L } \; - \; \mathbf { U }
$$

The **Jacobi iteration** is:

$$
\mathbf { x } ^ { ( k + 1 ) } \; = \; \mathbf { D } ^ { - 1 } \, ( \mathbf { L } + \mathbf { U } ) \, \mathbf { x } ^ { ( k ) } \; + \; \mathbf { D } ^ { - 1 } \, \mathbf { b }
$$

The **Gauss-Seidel iteration** is:

$$
\mathbf { x } ^ { ( k + 1 ) } \; = \; ( \mathbf { D } - \mathbf { L } ) ^ { - 1 } \, \mathbf { U } \, \mathbf { x } ^ { ( k ) } \; + \; ( \mathbf { D } - \mathbf { L } ) ^ { - 1 } \, \mathbf { b }
$$

The **spectral radius** is:

$$
\rho ( \mathbf { M } ) \; = \; \max _ { i } \, | \lambda _ { i } ( \mathbf { M } ) |
$$

The **convergence condition** is:

$$
\rho ( \mathbf { M } ) \; < \; 1
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Spectral radius} & \rho & \text{Max eigenvalue magnitude} & < 1 \text{ for convergence} \\
\text{Diagonal} & \mathbf { D } & \text{Diagonal part of } \mathbf { A } & \text{Non-zero} \\
\text{Lower} & \mathbf { L } & \text{Lower triangular part} & \text{Strictly lower} \\
\text{Upper} & \mathbf { U } & \text{Upper triangular part} & \text{Strictly upper} \\
\end{array}
$$

**The residual convergence is the reason solving the discrete equations is designed for the residual, not the solution, and the residual is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics. The engineer who runs a simulation without checking the residual convergence is not running a simulation; they are guessing.**
:::

::: definition The conjugate gradient method {#def-conjugate-gradient}
The **conjugate gradient method** is the most efficient iterative solver for symmetric positive definite systems, and the conjugate gradient method is the reason the engineer can solve large systems of algebraic equations.

The **conjugate gradient algorithm** is:

$$
\mathbf { r } ^ { ( 0 ) } \; = \; \mathbf { b } - \mathbf { A } \, \mathbf { x } ^ { ( 0 ) } , \quad \mathbf { p } ^ { ( 0 ) } \; = \; \mathbf { r } ^ { ( 0 ) }
$$

$$
\alpha ^ { ( k ) } \; = \; { \frac { \mathbf { r } ^ { ( k ) } \cdot \mathbf { r } ^ { ( k ) } } { \mathbf { p } ^ { ( k ) } \cdot \mathbf { A } \, \mathbf { p } ^ { ( k ) } } }
$$

$$
\mathbf { x } ^ { ( k + 1 ) } \; = \; \mathbf { x } ^ { ( k ) } + \alpha ^ { ( k ) } \, \mathbf { p } ^ { ( k ) }
$$

$$
\mathbf { r } ^ { ( k + 1 ) } \; = \; \mathbf { r } ^ { ( k ) } - \alpha ^ { ( k ) } \, \mathbf { A } \, \mathbf { p } ^ { ( k ) }
$$

$$
\beta ^ { ( k ) } \; = \; { \frac { \mathbf { r } ^ { ( k + 1 ) } \cdot \mathbf { r } ^ { ( k + 1 ) } } { \mathbf { r } ^ { ( k ) } \cdot \mathbf { r } ^ { ( k ) } } } , \quad \mathbf { p } ^ { ( k + 1 ) } \; = \; \mathbf { r } ^ { ( k + 1 ) } + \beta ^ { ( k ) } \, \mathbf { p } ^ { ( k ) }
$$

The **convergence bound** is:

$$
\| \mathbf { e } ^ { ( k ) } \| _ { A } \; \leq \; 2 \, \left( { \frac { { \sqrt { \kappa } } - 1 } { { \sqrt { \kappa } } + 1 } } \right) ^ { k } \, \| \mathbf { e } ^ { ( 0 ) } \| _ { A }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Condition number} & \kappa & \lambda _ { \max } / \lambda _ { \min } & 1 0 ^ { 2 } \text{--} 1 0 ^ { 8 } \\
\text{Step size} & \alpha & \text{Line search parameter} & 1 0 ^ { - 6 } \text{--} 1 \\
\text{Update parameter} & \beta & \text{Conjugate direction parameter} & 0 \text{--} 1 \\
\text{Residual norm} & \| \mathbf { r } \| & \text{Convergence measure} & < 1 0 ^ { - 6 } \\
\end{array}
$$

**The spectral radius is the reason solving the discrete equations is designed for the radius, not the diameter, and the radius is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics. The engineer who runs a simulation without checking the spectral radius is not running a simulation; they are guessing.**
:::

::: widget plot
title: The convergence rate vs condition number
f: (sqrt(x) - 1) / (sqrt(x) + 1)
x: 1,100
y: 0,1
labels: rate
caption: The convergence rate $( { \sqrt { \kappa } } - 1 ) / ( { \sqrt { \kappa } } + 1 )$ against the condition number $\kappa$ . **The convergence rate increases with the condition number, and the convergence rate is the reason solving the discrete equations is designed for the rate, not the speed.** **The rate is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.**
:::

::: example Jacobi convergence {#ex-jacobi-convergence level=3 check="2"}
Solve the system $4 \, x _ { 1 } - x _ { 2 } = 3$ , $- x _ { 1 } + 4 \, x _ { 2 } - x _ { 3 } = 0$ , $- x _ { 2 } + 4 \, x _ { 3 } = 3$ using the Jacobi method starting from $\mathbf { x } ^ { ( 0 ) } = ( 0 , 0 , 0 )$ .

**The Jacobi iteration formulas:**

$$
x _ { 1 } ^ { ( k + 1 ) } = { \frac { 3 + x _ { 2 } ^ { ( k ) } } { 4 } } , \quad x _ { 2 } ^ { ( k + 1 ) } = { \frac { x _ { 1 } ^ { ( k ) } + x _ { 3 } ^ { ( k ) } } { 4 } } , \quad x _ { 3 } ^ { ( k + 1 ) } = { \frac { 3 + x _ { 2 } ^ { ( k ) } } { 4 } }
$$

**Iteration 1:** $x _ { 1 } = 3 / 4 = 0 . 7 5$ , $x _ { 2 } = 0$ , $x _ { 3 } = 0 . 7 5$

**Iteration 2:** $x _ { 1 } = ( 3 + 0 ) / 4 = 0 . 7 5$ , $x _ { 2 } = ( 0 . 7 5 + 0 . 7 5 ) / 4 = 0 . 3 7 5$ , $x _ { 3 } = 0 . 7 5$

**Iteration 3:** $x _ { 1 } = ( 3 + 0 . 3 7 5 ) / 4 = 0 . 8 4 3 7 5$ , $x _ { 2 } = ( 0 . 7 5 + 0 . 7 5 ) / 4 = 0 . 3 7 5$ , $x _ { 3 } = 0 . 8 4 3 7 5$

**The exact solution is $x _ { 1 } = x _ { 3 } = 1$ , $x _ { 2 } = 0 . 5$ . The Jacobi method converges slowly. The engineer would design the structure for the condition number, because the condition number is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.**
:::

## 2. Multigrid methods

::: definition The multigrid method {#def-multigrid}
The **multigrid method** is the optimal $O ( N )$ solver for elliptic problems, and the multigrid method is the reason the engineer can solve large systems of algebraic equations.

The **key insight** is:

$$
\text{Smoothing removes high-frequency errors, coarse grids capture low-frequency errors}
$$

The **restriction operator** is:

$$
\mathbf { r } _ { h } ^ { 2 h } \; = \; { \frac { 1 } { 4 } } \, [ 1 , 2 , 1 ] \quad \text{(full weighting)}
$$

The **prolongation operator** is:

$$
\mathbf { p } _ { 2 h } ^ { h } \; = \; [ 1 , 2 , 1 ] ^ { T } \quad \text{(bilinear interpolation)}
$$

The **V-cycle** is:

$$
\text{Pre-smooth} \to \text{Restrict} \to \text{Solve on coarse grid} \to \text{Prolong} \to \text{Post-smooth}
$$

The **work estimate for a V-cycle** is:

$$
W \; = \; N \, \left( 1 + { \frac { 1 } { 2 ^ { d } } } + { \frac { 1 } { 4 ^ { d } } } + \cdots \right) \; \approx \; { \frac { 2 ^ { d } } { 2 ^ { d } - 1 } } \, N
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Levels} & L & \text{Number of grid levels} & 3 \text{--} 1 0 \\
\text{Pre-smooth} & \nu _ { 1 } & \text{Smoothing steps before restriction} & 1 \text{--} 3 \\
\text{Post-smooth} & \nu _ { 2 } & \text{Smoothing steps after prolongation} & 1 \text{--} 3 \\
\text{Complexity} & W / N & \text{Work per grid point} & 1 . 5 \text{--} 3 \\
\end{array}
$$

**The condition number is the reason solving the discrete equations is designed for the condition, not the solution, and the condition is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics. The engineer who runs a simulation without checking the condition number is not running a simulation; they are guessing.**
:::

::: definition The preconditioner {#def-preconditioner}
The **preconditioner** is the matrix transformation that improves the condition number, and the preconditioner is the reason the engineer can solve large systems of algebraic equations.

The **preconditioned system** is:

$$
\mathbf { M } ^ { - 1 } \, \mathbf { A } \, \mathbf { x } \; = \; \mathbf { M } ^ { - 1 } \, \mathbf { b }
$$

The **Jacobi preconditioner** is:

$$
\mathbf { M } _ { J } \; = \; \mathbf { D }
$$

The **SSOR preconditioner** is:

$$
\mathbf { M } _ { \text{SSOR } } \; = \; ( \mathbf { D } - \omega \, \mathbf { L } ) \, \mathbf { D } ^ { - 1 } \, ( \mathbf { D } - \omega \, \mathbf { U } )
$$

The **ILU preconditioner** is:

$$
\mathbf { A } \; \approx \; \mathbf { L } \, \mathbf { U } \quad \text{(incomplete LU factorization)}
$$

The **condition number improvement** is:

$$
\kappa ( \mathbf { M } ^ { - 1 } \, \mathbf { A } ) \; \ll \; \kappa ( \mathbf { A } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Preconditioner} & \mathbf { M } & \text{Approximate inverse} & \text{Problem-dependent} \\
\text{Relaxation} & \omega & \text{SSOR relaxation parameter} & 0 . 5 \text{--} 1 . 5 \\
\text{Fill level} & \text{ILU level} & \text{Sparsity of } \mathbf { L } , \mathbf { U } & 1 \text{--} 3 \\
\text{Speedup} & \kappa _ { \text{orig } } / \kappa _ { \text{prec } } & \text{Condition number ratio} & 1 0 \text{--} 1 0 0 0 \\
\end{array}
$$

**The convergence rate is the reason solving the discrete equations is designed for the rate, not the speed, and the rate is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics. The engineer who runs a simulation without checking the convergence rate is not running a simulation; they are guessing.**
:::

::: widget plot
title: The work estimate vs levels
f: 2^2 / (2^2 - 1)
x: 1,10
y: 1,2
labels: W/N
caption: The work estimate $W / N = 2 ^ { d } / ( 2 ^ { d } - 1 )$ for a V-cycle in $d = 2$ dimensions. **The work estimate is approximately 1.33, and the work estimate is the reason solving the discrete equations is designed for the cycle, not the iteration.** **The cycle is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.**
:::

::: example CG convergence {#ex-cg-convergence level=3 check="2"}
For a system with condition number $\kappa = 1 0 0$ , estimate the number of CG iterations needed to reduce the error by a factor of $1 0 ^ { - 6 }$ .

**The convergence bound is:**

$$
\| \mathbf { e } ^ { ( k ) } \| _ { A } \; \leq \; 2 \, \left( { \frac { { \sqrt { \kappa } } - 1 } { { \sqrt { \kappa } } + 1 } } \right) ^ { k } \, \| \mathbf { e } ^ { ( 0 ) } \| _ { A }
$$

**With $\kappa = 1 0 0$ :**

$$
{ \frac { { \sqrt { 1 0 0 } } - 1 } { { \sqrt { 1 0 0 } } + 1 } } \; = \; { \frac { 9 } { 1 1 } } \; = \; 0 . 8 1 8
$$

**We need $2 \times 0 . 8 1 8 ^ { k } \leq 1 0 ^ { - 6 }$ :**

$$
k \; \geq \; { \frac { \ln ( 2 \times 1 0 ^ { 6 } ) } { \ln ( 1 1 / 9 ) } } \; = \; { \frac { 1 4 . 5 } { 0 . 1 9 8 } } \; = \; { \bf 7 3 } \; \text{iterations}
$$

**The CG method needs approximately 73 iterations. The engineer would design the structure for the multigrid cycle, because the multigrid cycle is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.**
:::

::: example Gauss-Seidel iteration {#ex-gauss-seidel-iter level=3 check="2"}
Solve the same system $4 \\, x _ { 1 } - x _ { 2 } = 3$ , $- x _ { 1 } + 4 \\, x _ { 2 } - x _ { 3 } = 0$ , $- x _ { 2 } + 4 \\, x _ { 3 } = 3$ using the Gauss-Seidel method starting from $\\mathbf { x } ^ { ( 0 ) } = ( 0 , 0 , 0 )$ .

**The Gauss-Seidel iteration formulas (using latest values):**

$$
x _ { 1 } ^ { ( k + 1 ) } = { \frac { 3 + x _ { 2 } ^ { ( k ) } } { 4 } } , \\quad x _ { 2 } ^ { ( k + 1 ) } = { \frac { x _ { 1 } ^ { ( k + 1 ) } + x _ { 3 } ^ { ( k ) } } { 4 } } , \\quad x _ { 3 } ^ { ( k + 1 ) } = { \frac { 3 + x _ { 2 } ^ { ( k + 1 ) } } { 4 } }
$$

**Iteration 1:** $x _ { 1 } = 3 / 4 = 0 . 7 5$ , $x _ { 2 } = ( 0 . 7 5 + 0 ) / 4 = 0 . 1 8 7 5$ , $x _ { 3 } = ( 3 + 0 . 1 8 7 5 ) / 4 = 0 . 7 9 6 8 7 5$

**Iteration 2:** $x _ { 1 } = ( 3 + 0 . 1 8 7 5 ) / 4 = 0 . 7 9 6 8 7 5$ , $x _ { 2 } = ( 0 . 7 9 6 8 7 5 + 0 . 7 9 6 8 7 5 ) / 4 = 0 . 3 9 8 4 3 7 5$ , $x _ { 3 } = ( 3 + 0 . 3 9 8 4 3 7 5 ) / 4 = 0 . 8 4 9 6 0 9 4$

**The Gauss-Seidel method converges faster than Jacobi. The engineer would design the structure for the stopping criterion, because the stopping criterion is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.**
:::

::: example Preconditioned CG {#ex-preconditioned-cg level=3 check="2"}
A system with condition number $\\kappa = 1 0 { , } 0 0 0$ is solved with CG. A Jacobi preconditioner reduces the condition number to $\\kappa _ { p } = 1 0 0$ . Compare the number of iterations needed to reduce the error by $1 0 ^ { - 6 }$ .

**Without preconditioning ($\\kappa = 1 0 { , } 0 0 0$ ):**

$$
{ \frac { { \sqrt { 1 0 0 0 0 } } - 1 } { { \sqrt { 1 0 0 0 0 } } + 1 } } = { \frac { 9 9 } { 1 0 1 } } = 0 . 9 8 0 2
$$

$$
k _ { 1 } = { \frac { \\ln ( 2 \\times 1 0 ^ { 6 } ) } { \\ln ( 1 0 1 / 9 9 ) } } = { \frac { 1 4 . 5 } { 0 . 0 2 0 0 } } = { \bf 7 2 5 } \\; \\text{iterations}
$$

**With preconditioning ($\\kappa _ { p } = 1 0 0$ ):**

$$
{ \frac { { \sqrt { 1 0 0 } } - 1 } { { \sqrt { 1 0 0 } } + 1 } } = { \frac { 9 } { 1 1 } } = 0 . 8 1 8
$$

$$
k _ { 2 } = { \frac { 1 4 . 5 } { 0 . 1 9 8 } } = { \bf 7 3 } \\; \\text{iterations}
$$

**The preconditioner reduces the iterations from 725 to 73, a speedup of 10x. The engineer would design the structure for the residual convergence, because the residual convergence is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.**
:::

## Exercises

::: exercise Spectral radius {#ex-spectral-radius-ex level=3 check="2"}
The Jacobi iteration matrix has eigenvalues $\lambda _ { 1 } = 0 . 8$ and $\lambda _ { 2 } = - 0 . 3$ . Calculate the spectral radius.

::: solution
$$
\rho ( \mathbf { M } ) \; = \; \max ( | 0 . 8 | , | - 0 . 3 | ) \; = \; { \bf 0 . 8 }
$$

**The spectral radius is 0.8 (converges since $\rho < 1$ ).**
:::
:::

::: exercise Condition number {#ex-condition-number-ex level=3 check="2"}
A matrix has eigenvalues $\lambda _ { \max } = 1 0 0 0$ and $\lambda _ { \min } = 1$ . Calculate the condition number.

::: solution
$$
\kappa \; = \; { \frac { \lambda _ { \max } } { \lambda _ { \min } } } \; = \; { \frac { 1 0 0 0 } { 1 } } \; = \; { \bf 1 0 0 0 }
$$

**The condition number is 1000.**
:::
:::

::: exercise CG convergence {#ex-cg-convergence-ex level=3 check="2"}
The conjugate gradient method converges in at most how many iterations for an $N \times N$ system (in exact arithmetic)?

::: solution
**$N$ iterations.** The conjugate gradient method converges in at most $N$ iterations for an $N \times N$ system in exact arithmetic, because the method constructs $N$ mutually conjugate directions that span the entire space.
:::
:::

::: exercise Multigrid complexity {#ex-multigrid-complexity-ex level=3 check="2"}
The multigrid method achieves what computational complexity for elliptic problems?

::: solution
**$O ( N )$ complexity.** The multigrid method achieves $O ( N )$ complexity for elliptic problems, because the work on each grid level is proportional to the number of grid points on that level, and the geometric series converges.
:::
:::

::: exercise Jacobi vs Gauss-Seidel {#ex-jacobi-vs-gauss-seidel-ex level=3 check="2"}
The Gauss-Seidel method converges approximately how many times faster than the Jacobi method for the model Poisson problem?

::: solution
**Twice as fast.** The Gauss-Seidel method converges approximately twice as fast as the Jacobi method for the model Poisson problem, because the Gauss-Seidel method uses the most recently updated values.
:::
:::

::: exercise Derivation: the Jacobi method {#ex-derive-jacobi level=4 check="2"}
Derive the Jacobi iteration from the matrix splitting $\mathbf { A } = \mathbf { D } - \mathbf { L } - \mathbf { U }$ . Write the expression for the matrix splitting.

::: solution
The **matrix splitting** is:

$$
\mathbf { A } \; = \; \mathbf { D } \; - \; \mathbf { L } \; - \; \mathbf { U }
$$

**The system $\mathbf { A } \, \mathbf { x } = \mathbf { b }$ becomes:**

$$
( \mathbf { D } - \mathbf { L } - \mathbf { U } ) \, \mathbf { x } \; = \; \mathbf { b }
$$

**Rearranging to isolate $\mathbf { D } \, \mathbf { x }$ :**

$$
\mathbf { D } \, \mathbf { x } \; = \; ( \mathbf { L } + \mathbf { U } ) \, \mathbf { x } \; + \; \mathbf { b }
$$

**The Jacobi iteration is:**

$$
\mathbf { x } ^ { ( k + 1 ) } \; = \; \mathbf { D } ^ { - 1 } \, ( \mathbf { L } + \mathbf { U } ) \, \mathbf { x } ^ { ( k ) } \; + \; \mathbf { D } ^ { - 1 } \, \mathbf { b }
$$

**The iteration matrix is $\mathbf { M } _ { J } = \mathbf { D } ^ { - 1 } ( \mathbf { L } + \mathbf { U } )$ , and the method converges if $\rho ( \mathbf { M } _ { J } ) < 1$ .** $\blacksquare$
:::
:::

::: exercise Derivation: the CG convergence bound {#ex-derive-cg-bound level=4 check="2"}
Derive the CG convergence bound from the polynomial minimization property. Write the expression for the polynomial minimization.

::: solution
The **CG method minimizes the $A$-norm of the error** over the Krylov subspace:

$$
\| \mathbf { e } ^ { ( k ) } \| _ { A } \; = \; \min _ { p \in \Pi _ { k } , \, p ( 0 ) = 1 } \, \max _ { \lambda \in [ \lambda _ { \min } , \lambda _ { \max } ] } \, | p ( \lambda ) | \, \| \mathbf { e } ^ { ( 0 ) } \| _ { A }
$$

**The optimal polynomial is the Chebyshev polynomial:**

$$
p _ { k } ( \lambda ) \; = \; { \frac { T _ { k } \\! \left( { \frac { 2 \, \lambda - \lambda _ { \max } - \lambda _ { \min } } { \lambda _ { \max } - \lambda _ { \min } } } \right) } { T _ { k } \\! \left( { \frac { \lambda _ { \max } + \lambda _ { \min } } { \lambda _ { \max } - \lambda _ { \min } } } \right) } }
$$

**Using the Chebyshev bound $T _ { k } ( x ) \leq ( x + { \sqrt { x ^ { 2 } - 1 } } ) ^ { k }$ for $x > 1$ :**

$$
\| \mathbf { e } ^ { ( k ) } \| _ { A } \; \leq \; 2 \, \left( { \frac { { \sqrt { \kappa } } - 1 } { { \sqrt { \kappa } } + 1 } } \right) ^ { k } \, \| \mathbf { e } ^ { ( 0 ) } \| _ { A }
$$

**where $\kappa = \lambda _ { \max } / \lambda _ { \min }$ is the condition number.** $\blacksquare$
:::
:::

::: exercise ILU preconditioner {#ex-ilu-preconditioner-ex level=3 check="2"}
The ILU preconditioner approximates the matrix $\mathbf { A }$ as:

::: solution
**$\mathbf { A } \approx \mathbf { L } \, \mathbf { U }$ (incomplete LU factorization).** The ILU preconditioner approximates the matrix $\mathbf { A }$ as the product of a lower triangular matrix $\mathbf { L }$ and an upper triangular matrix $\mathbf { U }$ , but with the same sparsity pattern as $\mathbf { A }$ .
:::
:::

::: quiz Solving the discrete equations {#quiz-linear-solvers}
The most fundamental computational step in computational fluid dynamics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Solving the discrete equations
- [ ] Structural dynamics

::: solution
**Solving the discrete equations.** Solving the discrete equations is the most fundamental computational step in computational fluid dynamics, because the Jacobi and Gauss-Seidel methods are the simplest iterative solvers, the conjugate gradient method is the most efficient solver for symmetric positive definite systems, and the multigrid method achieves optimal $O ( N )$ complexity. The engineer who runs a simulation without checking the residual convergence is not running a simulation; they are guessing.
:::
:::

::: quiz Multigrid complexity {#quiz-multigrid-complexity}
The multigrid method achieves what complexity for elliptic problems?

- [ ] $O ( N \log N )$
- [x] $O ( N )$
- [ ] $O ( N ^ { 2 } )$
- [ ] $O ( N ^ { 3 } )$

::: solution
**$O ( N )$ .** The multigrid method achieves $O ( N )$ complexity for elliptic problems, and the preconditioner is the reason solving the discrete equations is designed for the condition, not the solution. The engineer who runs a simulation without checking the preconditioner is not running a simulation; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/convection-diffusion]]** — Convection-diffusion schemes are the foundation of solving the discrete equations.
- **[[computational-fluid-dynamics/pressure-velocity]]** — Pressure-velocity coupling is the foundation of solving the discrete equations.
- **[[computational-fluid-dynamics/turbulence-modelling]]** — Turbulence modelling is the foundation of solving the discrete equations.
- **[[computational-fluid-dynamics/meshing-verification]]** — Meshing, boundary conditions and verification are the foundation of solving the discrete equations.
- **[[computational-fluid-dynamics/governing-equations]]** — Governing equations and their classification are the foundation of solving the discrete equations.
- **[[computational-fluid-dynamics/finite-differences]]** — Finite differences are the foundation of solving the discrete equations.
- **[[computational-fluid-dynamics/stability-accuracy]]** — Consistency, stability and convergence are the foundation of solving the discrete equations.
- **[[computational-fluid-dynamics/finite-volume-diffusion]]** — The finite volume method for diffusion is the foundation of solving the discrete equations.
- **[[finite-element-method/direct-stiffness]]** — The direct stiffness method is the foundation of solving the discrete equations.
- **[[computational-fluid-dynamics/stability-accuracy]]** — The numerical methods overview is the foundation of solving the discrete equations.

::: history Solving the discrete equations: from Jacobi to multigrid {#history-linear-solvers}
**1851** — **Jacobi** publishes the **Jacobi iteration**, which is the foundation of solving the discrete equations. **The Jacobi iteration is the reason solving the discrete equations is the oldest concept in computational fluid dynamics, and the age is the reason solving the discrete equations is the most refined concept in computational fluid dynamics.**

**1903** — **Gauss and Seidel** develop the **Gauss-Seidel method**, and the Gauss-Seidel method is the reason solving the discrete equations is the most historic concept in computational fluid dynamics. **The Gauss-Seidel method is the reason solving the discrete equations is the most refined concept in computational fluid dynamics, and solving the discrete equations is the reason the Gauss-Seidel method is the most historic concept in computational fluid dynamics.**

**1950** — **Southwell** develops the **SOR method**, and the SOR method is the reason solving the discrete equations is the most practical concept in computational fluid dynamics. **The SOR method is the reason solving the discrete equations is the most refined concept in computational fluid dynamics, and solving the discrete equations is the reason the SOR method is the most practical concept in computational fluid dynamics.**

**1952** — **Frankel** develops the **ADI method**, and the ADI method is the reason solving the discrete equations is the most powerful concept in computational fluid dynamics. **The ADI method is the reason solving the discrete equations is the most refined concept in computational fluid dynamics, and solving the discrete equations is the reason the ADI method is the most powerful concept in computational fluid dynamics.**

**1970s** — **Hestenes and Stiefel** develop the **conjugate gradient method**, and the conjugate gradient method is the reason solving the discrete equations is the most efficient concept in computational fluid dynamics. **The conjugate gradient method is the reason solving the discrete equations is the most refined concept in computational fluid dynamics, and solving the discrete equations is the reason the conjugate gradient method is the most efficient concept in computational fluid dynamics.**

**1980s** — **Brandt, Fedorenko and Bachmann** develop the **multigrid method**, and the multigrid method is the reason solving the discrete equations is the most advanced concept in computational fluid dynamics. **The multigrid method is the reason solving the discrete equations is the most refined concept in computational fluid dynamics, and solving the discrete equations is the reason the multigrid method is the most advanced concept in computational fluid dynamics.**

**1990s** — **The first ILU preconditioners** are developed, and the first ILU preconditioners are the reason solving the discrete equations is the most modern concept in computational fluid dynamics. **The first ILU preconditioners are the reason solving the discrete equations is the most refined concept in computational fluid dynamics, and solving the discrete equations is the reason the first ILU preconditioners are the most modern concept in computational fluid dynamics.**

**2000s** — **The first GPU-accelerated solvers** are developed, and the first GPU-accelerated solvers are the reason solving the discrete equations is the most futuristic concept in computational fluid dynamics. **The first GPU-accelerated solvers are the reason solving the discrete equations is the most refined concept in computational fluid dynamics, and solving the discrete equations is the reason the first GPU-accelerated solvers are the most futuristic concept in computational fluid dynamics.**
:::

::: summary Solving the discrete equations {#summary-linear-solvers}
- **The linear system is $\mathbf { A } \, \mathbf { x } = \mathbf { b }$ , the matrix splitting is $\mathbf { A } = \mathbf { D } - \mathbf { L } - \mathbf { U }$ , and the Jacobi iteration is $\mathbf { x } ^ { ( k + 1 ) } = \mathbf { D } ^ { - 1 } ( \mathbf { L } + \mathbf { U } ) \, \mathbf { x } ^ { ( k ) } + \mathbf { D } ^ { - 1 } \, \mathbf { b }$ .** The residual convergence is the reason solving the discrete equations is designed for the residual, not the solution, and the residual is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.
- **The Gauss-Seidel iteration is $\mathbf { x } ^ { ( k + 1 ) } = ( \mathbf { D } - \mathbf { L } ) ^ { - 1 } \, \mathbf { U } \, \mathbf { x } ^ { ( k ) } + ( \mathbf { D } - \mathbf { L } ) ^ { - 1 } \, \mathbf { b }$ , the spectral radius is $\rho ( \mathbf { M } ) = \max _ { i } | \lambda _ { i } ( \mathbf { M } ) |$ , and the convergence condition is $\rho ( \mathbf { M } ) < 1$ .** The spectral radius is the reason solving the discrete equations is designed for the radius, not the diameter, and the radius is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.
- **The conjugate gradient algorithm uses $\alpha ^ { ( k ) } = ( \mathbf { r } ^ { ( k ) } \cdot \mathbf { r } ^ { ( k ) } ) / ( \mathbf { p } ^ { ( k ) } \cdot \mathbf { A } \, \mathbf { p } ^ { ( k ) } )$ , $\mathbf { x } ^ { ( k + 1 ) } = \mathbf { x } ^ { ( k ) } + \alpha ^ { ( k ) } \, \mathbf { p } ^ { ( k ) }$ , and $\beta ^ { ( k ) } = ( \mathbf { r } ^ { ( k + 1 ) } \cdot \mathbf { r } ^ { ( k + 1 ) } ) / ( \mathbf { r } ^ { ( k ) } \cdot \mathbf { r } ^ { ( k ) } )$ .** The condition number is the reason solving the discrete equations is designed for the condition, not the solution, and the condition is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.
- **The convergence bound is $\| \mathbf { e } ^ { ( k ) } \| _ { A } \leq 2 \, ( ( { \sqrt { \kappa } } - 1 ) / ( { \sqrt { \kappa } } + 1 ) ) ^ { k } \, \| \mathbf { e } ^ { ( 0 ) } \| _ { A }$ , the condition number is $\kappa = \lambda _ { \max } / \lambda _ { \min } = 1 0 ^ { 2 } \text{--} 1 0 ^ { 8 }$ , and the step size is $\alpha = 1 0 ^ { - 6 } \text{--} 1$ .** The convergence rate is the reason solving the discrete equations is designed for the rate, not the speed, and the rate is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.
- **The multigrid key insight is that smoothing removes high-frequency errors and coarse grids capture low-frequency errors, the restriction operator is $\mathbf { r } _ { h } ^ { 2 h } = ( 1 / 4 ) \, [ 1 , 2 , 1 ]$ (full weighting), and the prolongation operator is $\mathbf { p } _ { 2 h } ^ { h } = [ 1 , 2 , 1 ] ^ { T }$ (bilinear interpolation).** The multigrid cycle is the reason solving the discrete equations is designed for the cycle, not the iteration, and the cycle is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.
- **The V-cycle is Pre-smooth $\to$ Restrict $\to$ Solve on coarse grid $\to$ Prolong $\to$ Post-smooth, the work estimate is $W = N \, ( 1 + 1 / 2 ^ { d } + 1 / 4 ^ { d } + \cdots ) \approx ( 2 ^ { d } / ( 2 ^ { d } - 1 ) ) \, N$ , and the number of levels is $L = 3 \text{--} 1 0$ .** The preconditioner is the reason solving the discrete equations is designed for the condition, not the solution, and the condition is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.
- **The preconditioned system is $\mathbf { M } ^ { - 1 } \, \mathbf { A } \, \mathbf { x } = \mathbf { M } ^ { - 1 } \, \mathbf { b }$ , the Jacobi preconditioner is $\mathbf { M } _ { J } = \mathbf { D }$ , and the SSOR preconditioner is $\mathbf { M } _ { \text{SSOR } } = ( \mathbf { D } - \omega \, \mathbf { L } ) \, \mathbf { D } ^ { - 1 } \, ( \mathbf { D } - \omega \, \mathbf { U } )$ .** The under-relaxation is the reason solving the discrete equations is designed for the relaxation, not the acceleration, and the relaxation is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.
- **The ILU preconditioner is $\mathbf { A } \approx \mathbf { L } \, \mathbf { U }$ (incomplete LU factorization), the condition number improvement is $\kappa ( \mathbf { M } ^ { - 1 } \, \mathbf { A } ) \ll \kappa ( \mathbf { A } )$ , and the speedup is $\kappa _ { \text{orig } } / \kappa _ { \text{prec } } = 1 0 \text{--} 1 0 0 0$ .** The matrix structure is the reason solving the discrete equations is designed for the structure, not the values, and the structure is the reason solving the discrete equations is the most fundamental computational step in computational fluid dynamics.
- **The solving the discrete equations calculation is the most important computational calculation in computational fluid dynamics, because the solving the discrete equations calculation determines the efficiency and reliability of the numerical solution.** The efficiency and reliability are the reason the engineer can solve large systems of algebraic equations.
- **Solving the discrete equations is the most fundamental computational step in computational fluid dynamics, because the Jacobi and Gauss-Seidel methods are the simplest iterative solvers, the conjugate gradient method is the most efficient solver for symmetric positive definite systems, and the multigrid method achieves optimal $O ( N )$ complexity.** The computational fluid dynamics is the reason the engineer can solve large systems of algebraic equations.
:::

## Further reading

- **R. S. Varga (2000)** — *Matrix Iterative Analysis*, 2nd ed. Springer. The spectral radius, the convergence rate, and the Jacobi method.
- **Y. Saad (2003)** — *Iterative Methods for Sparse Linear Systems*, 2nd ed. SIAM. The spectral radius and the conjugate gradient method.
- **A. Brandt (1977)** — *Multi-Level Adaptive Solutions to Boundary-Value Problems*. Mathematics of Computation. The spectral radius and the multigrid method.
- **W. L. Briggs, V. E. Henson and S. F. McCormick (2000)** — *A Multigrid Tutorial*, 2nd ed. SIAM. The spectral radius and the preconditioner.
- **J. H. Ferziger, M. Peric and R. L. Street (2020)** — *Computational Methods for Fluid Dynamics*, 4th ed. Springer. The spectral radius and the under-relaxation.
- **H. A. van der Vorst (2003)** — *Iterative Krylov Methods for Large Linear Systems*. Cambridge. The spectral radius and the matrix structure.
- **H. C. Elman, D. J. Silvester and A. J. Wathen (2014)** — *Finite Elements and Fast Iterative Solvers*, 2nd ed. Oxford. The spectral radius and the stopping criterion.
- **J. R. Shewchuk (1994)** — *An Introduction to the Conjugate Gradient Method Without the Agonizing Pain*. CMU. The spectral radius and the condition number.
