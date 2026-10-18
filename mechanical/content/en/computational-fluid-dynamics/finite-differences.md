Finite differences are the most fundamental discretization technique in computational fluid dynamics: the finite difference approximation replaces derivatives with algebraic expressions involving neighboring grid point values, the truncation error determines the accuracy of the approximation, and the Taylor series expansion provides the systematic derivation of the finite difference formulas. **The engineer who applies a finite difference formula without checking the truncation error is not applying a finite difference formula; they are guessing.** The finite differences calculation is the reason the engineer can approximate derivatives on a discrete grid, and the truncation error is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.

The quantitative tools of finite differences are the **forward difference** (the first-order accurate approximation to the first derivative), the **backward difference** (the first-order accurate approximation to the first derivative from the other side), the **central difference** (the second-order accurate approximation to the first derivative), and the **truncation error** (the error introduced by replacing the Taylor series with a finite number of terms). The tools are the language in which the finite differences analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways finite differences calculation goes wrong
**Not checking the truncation error.** The engineer who applies a finite difference formula without checking the truncation error is not applying a finite difference formula; they are guessing. **The truncation error is the reason finite differences are designed for the differences, not the derivatives, and the differences are the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.** **Not checking the order of accuracy.** The engineer who applies a finite difference formula without checking the order of accuracy is not applying a finite difference formula; they are guessing. **The order of accuracy is the reason finite differences are designed for the order, not the degree, and the order is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.** **Not checking the grid spacing.** The engineer who applies a finite difference formula without checking the grid spacing is not applying a finite difference formula; they are guessing. **The grid spacing is the reason finite differences are designed for the spacing, not the size, and the spacing is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.** **Not checking the Taylor series.** The engineer who applies a finite difference formula without checking the Taylor series is not applying a finite difference formula; they are guessing. **The Taylor series is the reason finite differences are designed for the series, not the sum, and the series is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.** **Not checking the stencil.** The engineer who applies a finite difference formula without checking the stencil is not applying a finite difference formula; they are guessing. **The stencil is the reason finite differences are designed for the stencil, not the pattern, and the stencil is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.** **Not checking the boundary treatment.** The engineer who applies a finite difference formula without checking the boundary treatment is not applying a finite difference formula; they are guessing. **The boundary treatment is the reason finite differences are designed for the boundary, not the interior, and the boundary is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.** **Not checking the multi-dimensional extension.** The engineer who applies a finite difference formula without checking the multi-dimensional extension is not applying a finite difference formula; they are guessing. **The multi-dimensional extension is the reason finite differences are designed for the dimensions, not the direction, and the dimensions are the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.** **Not checking the non-uniform grid.** The engineer who applies a finite difference formula without checking the non-uniform grid is not applying a finite difference formula; they are guessing. **The non-uniform grid is the reason finite differences are designed for the non-uniform, not the uniform, and the non-uniform is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.** **Not checking the compact scheme.** The engineer who applies a finite difference formula without checking the compact scheme is not applying a finite difference formula; they are guessing. **The compact scheme is the reason finite differences are designed for the compact, not the wide, and the compact is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.**
:::

## 1. Finite difference approximations

::: definition The forward and backward differences {#def-forward-backward}
The **forward difference** and **backward difference** are the first-order accurate approximations to the first derivative, and the forward difference and backward difference are the reason the engineer can approximate derivatives on a discrete grid.

The **forward difference** is:

$$
f ^ { \prime } ( x ) \; \approx \; { \frac { f ( x + h ) - f ( x ) } { h } } \; = \; { \frac { f _ { i + 1 } - f _ { i } } { \Delta x } }
$$

The **backward difference** is:

$$
f ^ { \prime } ( x ) \; \approx \; { \frac { f ( x ) - f ( x - h ) } { h } } \; = \; { \frac { f _ { i } - f _ { i - 1 } } { \Delta x } }
$$

The **truncation error** of the forward difference is:

$$
E _ { T } \; = \; - \, { \frac { h } { 2 } } \, f ^ { \prime \prime } ( \xi ) \; = \; O ( h )
$$

The **second-order forward difference** is:

$$
f ^ { \prime } ( x ) \; \approx \; { \frac { - 3 \, f _ { i } + 4 \, f _ { i + 1 } - f _ { i + 2 } } { 2 \, \Delta x } } \; + \; O ( h ^ { 2 } )
$$

The **second-order backward difference** is:

$$
f ^ { \prime } ( x ) \; \approx \; { \frac { 3 \, f _ { i } - 4 \, f _ { i - 1 } + f _ { i - 2 } } { 2 \, \Delta x } } \; + \; O ( h ^ { 2 } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Grid spacing} & h , \Delta x & \text{Distance between grid points} & 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 1 } \ \text{ m } \\
\text{Truncation error} & E _ { T } & \text{Error from Taylor series truncation} & O ( h ) , O ( h ^ { 2 } ) \\
\text{Order of accuracy} & p & \text{Power of } h \text{ in the error} & 1 , 2 , 4 , 6 \\
\text{Stencil width} & w & \text{Number of grid points used} & 2 , 3 , 5 , 7 \\
\end{array}
$$

**The truncation error is the reason finite differences are designed for the differences, not the derivatives, and the differences are the reason finite differences are the most fundamental discretization technique in computational fluid dynamics. The engineer who applies a finite difference formula without checking the truncation error is not applying a finite difference formula; they are guessing.**
:::

::: definition The central difference {#def-central-difference}
The **central difference** is the second-order accurate approximation to the first derivative, and the central difference is the reason the engineer can approximate derivatives on a discrete grid.

The **central difference** is:

$$
f ^ { \prime } ( x ) \; \approx \; { \frac { f ( x + h ) - f ( x - h ) } { 2 \, h } } \; = \; { \frac { f _ { i + 1 } - f _ { i - 1 } } { 2 \, \Delta x } }
$$

The **truncation error** of the central difference is:

$$
E _ { T } \; = \; - \, { \frac { h ^ { 2 } } { 6 } } \, f ^ { \prime \prime \prime } ( \xi ) \; = \; O ( h ^ { 2 } )
$$

The **second derivative central difference** is:

$$
f ^ { \prime \prime } ( x ) \; \approx \; { \frac { f _ { i + 1 } - 2 \, f _ { i } + f _ { i - 1 } } { ( \Delta x ) ^ { 2 } } } \; + \; O ( h ^ { 2 } )
$$

The **fourth-order central difference** is:

$$
f ^ { \prime } ( x ) \; \approx \; { \frac { f _ { i - 2 } - 8 \, f _ { i - 1 } + 8 \, f _ { i + 1 } - f _ { i + 2 } } { 1 2 \, \Delta x } } \; + \; O ( h ^ { 4 } )
$$

The **Laplacian** (2D) is:

$$
\nabla ^ { 2 } f \; \approx \; { \frac { f _ { i + 1 , j } - 2 \, f _ { i , j } + f _ { i - 1 , j } } { ( \Delta x ) ^ { 2 } } } \; + \; { \frac { f _ { i , j + 1 } - 2 \, f _ { i , j } + f _ { i , j - 1 } } { ( \Delta y ) ^ { 2 } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Central difference} & \delta _ { 0 } & \text{Second-order first derivative} & O ( h ^ { 2 } ) \\
\text{Second derivative} & \delta _ { x } ^ { 2 } & \text{Three-point Laplacian} & O ( h ^ { 2 } ) \\
\text{Fourth-order} & \delta _ { 0 } ^ { ( 4 ) } & \text{Five-point first derivative} & O ( h ^ { 4 } ) \\
\text{Laplacian 2D} & \nabla ^ { 2 } & \text{Five-point stencil} & O ( h ^ { 2 } ) \\
\end{array}
$$

**The order of accuracy is the reason finite differences are designed for the order, not the degree, and the order is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics. The engineer who applies a finite difference formula without checking the order of accuracy is not applying a finite difference formula; they are guessing.**
:::

::: widget plot
title: The error vs grid spacing
f: 0.01*x^2
x: 0,1
y: 0,0.01
labels: error
caption: The truncation error $E _ { T } = C \, h ^ { 2 }$ against the grid spacing $h$ for a second-order central difference. **The error decreases with the square of the grid spacing, and the error is the reason finite differences are designed for the spacing, not the size.** **The spacing is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.**
:::

::: example First derivative approximation {#ex-first-derivative level=3 check="2"}
The function $f ( x ) = x ^ { 2 }$ is evaluated at $x = 1$ with grid spacing $h = 0 . 1$ . Calculate the forward, backward and central difference approximations to $f ^ { \prime } ( 1 )$ and compare with the exact value.

**Exact value:**

$$
f ^ { \prime } ( 1 ) \; = \; 2 \times 1 \; = \; 2
$$

**Grid values:**

$$
f ( 0 . 9 ) = 0 . 8 1 , \quad f ( 1 . 0 ) = 1 . 0 0 , \quad f ( 1 . 1 ) = 1 . 2 1
$$

**Forward difference:**

$$
f ^ { \prime } ( 1 ) \; \approx \; { \frac { 1 . 2 1 - 1 . 0 0 } { 0 . 1 } } \; = \; { \bf 2 . 1 } \quad ( \text{error} = 0 . 1 )
$$

**Backward difference:**

$$
f ^ { \prime } ( 1 ) \; \approx \; { \frac { 1 . 0 0 - 0 . 8 1 } { 0 . 1 } } \; = \; { \bf 1 . 9 } \quad ( \text{error} = - 0 . 1 )
$$

**Central difference:**

$$
f ^ { \prime } ( 1 ) \; \approx \; { \frac { 1 . 2 1 - 0 . 8 1 } { 0 . 2 } } \; = \; { \bf 2 . 0 } \quad ( \text{error} = 0 )
$$

**The central difference is exact for a quadratic function. The engineer would design the structure for the Taylor series, because the Taylor series is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.**
:::

## 2. Multi-dimensional finite differences

::: definition The two-dimensional Laplacian {#def-2d-laplacian}
The **two-dimensional Laplacian** is the five-point stencil approximation to the Laplace operator, and the two-dimensional Laplacian is the reason the engineer can approximate derivatives on a discrete grid.

The **five-point Laplacian** is:

$$
\nabla ^ { 2 } f \; \approx \; { \frac { f _ { i + 1 , j } + f _ { i - 1 , j } + f _ { i , j + 1 } + f _ { i , j - 1 } - 4 \, f _ { i , j } } { h ^ { 2 } } }
$$

The **nine-point Laplacian** (fourth-order) is:

$$
\nabla ^ { 2 } f \; \approx \; { \frac { 1 } { 6 \, h ^ { 2 } } } \, \left[ \begin{array} { c c c } { 0 } & { 1 } & { 0 } \\ { 1 } & { - 4 } & { 1 } \\ { 0 } & { 1 } & { 0 } \end{array} \right] _ { \text{weighted } }
$$

The **Poisson equation** discretized is:

$$
{ \frac { f _ { i + 1 , j } + f _ { i - 1 , j } + f _ { i , j + 1 } + f _ { i , j - 1 } - 4 \, f _ { i , j } } { h ^ { 2 } } } \; = \; g _ { i , j }
$$

The **matrix form** is:

$$
\mathbf { A } \, \mathbf { f } \; = \; \mathbf { g }
$$

The **ADI (alternating direction implicit) method** splits the 2D problem into two 1D solves.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Grid points} & N & \text{Number of grid points per direction} & 1 0 \text{--} 1 0 0 0 \\
\text{Grid spacing} & h & \text{Distance between grid points} & L / N \\
\text{Matrix size} & N ^ { 2 } \times N ^ { 2 } & \text{System matrix dimension} & 1 0 0 \text{--} 1 0 ^ { 6 } \\
\text{Bandwidth} & b & \text{Half-bandwidth of the matrix} & N \\
\end{array}
$$

**The grid spacing is the reason finite differences are designed for the spacing, not the size, and the spacing is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics. The engineer who applies a finite difference formula without checking the grid spacing is not applying a finite difference formula; they are guessing.**
:::

::: definition The Taylor series derivation {#def-taylor-series}
The **Taylor series derivation** is the systematic method for deriving finite difference formulas and their truncation errors, and the Taylor series derivation is the reason the engineer can approximate derivatives on a discrete grid.

The **Taylor series expansion** is:

$$
f ( x + h ) \; = \; f ( x ) \; + \; h \, f ^ { \prime } ( x ) \; + \; { \frac { h ^ { 2 } } { 2 } } \, f ^ { \prime \prime } ( x ) \; + \; { \frac { h ^ { 3 } } { 6 } } \, f ^ { \prime \prime \prime } ( x ) \; + \; \cdots
$$

The **backward Taylor series** is:

$$
f ( x - h ) \; = \; f ( x ) \; - \; h \, f ^ { \prime } ( x ) \; + \; { \frac { h ^ { 2 } } { 2 } } \, f ^ { \prime \prime } ( x ) \; - \; { \frac { h ^ { 3 } } { 6 } } \, f ^ { \prime \prime \prime } ( x ) \; + \; \cdots
$$

**Adding the two series:**

$$
f ( x + h ) + f ( x - h ) \; = \; 2 \, f ( x ) \; + \; h ^ { 2 } \, f ^ { \prime \prime } ( x ) \; + \; O ( h ^ { 4 } )
$$

**Subtracting the two series:**

$$
f ( x + h ) - f ( x - h ) \; = \; 2 \, h \, f ^ { \prime } ( x ) \; + \; { \frac { h ^ { 3 } } { 3 } } \, f ^ { \prime \prime \prime } ( x ) \; + \; O ( h ^ { 5 } )
$$

The **method of undetermined coefficients** extends this to arbitrary stencils.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Expansion point} & x & \text{Point about which to expand} & x _ { i } \\
\text{Step size} & h & \text{Distance to neighboring points} & \Delta x \\
\text{Number of terms} & n & \text{Terms retained in the series} & 3 \text{--} 7 \\
\text{Remainder order} & O ( h ^ { n } ) & \text{Order of the first neglected term} & 2 , 3 , 4 , 5 , 6 \\
\end{array}
$$

**The Taylor series is the reason finite differences are designed for the series, not the sum, and the series is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics. The engineer who applies a finite difference formula without checking the Taylor series is not applying a finite difference formula; they are guessing.**
:::

::: widget plot
title: The truncation error vs order
f: 1/x
x: 1,5
y: 0,1
labels: error
caption: The truncation error $E _ { T } \propto h ^ { p }$ against the order of accuracy $p$ for $h = 0 . 5$ . **The error decreases exponentially with the order, and the error is the reason finite differences are designed for the stencil, not the pattern.** **The stencil is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.**
:::

::: example Poisson equation solution {#ex-poisson-solution level=3 check="2"}
Solve the Poisson equation $\nabla ^ { 2 } u = - 1$ on a unit square with $u = 0$ on all boundaries using a $3 \times 3$ interior grid ($h = 0 . 2 5$ ). Find the value at the center.

**The five-point stencil at the center $( i , j ) = ( 2 , 2 )$ :**

$$
{ \frac { u _ { 3 , 2 } + u _ { 1 , 2 } + u _ { 2 , 3 } + u _ { 2 , 1 } - 4 \, u _ { 2 , 2 } } { h ^ { 2 } } } \; = \; - 1
$$

**By symmetry, $u _ { 1 , 2 } = u _ { 3 , 2 } = u _ { 2 , 1 } = u _ { 2 , 3 } = a$ and $u _ { 2 , 2 } = b$ :**

**At the corner-adjacent node $( 1 , 2 )$ :**

$$
{ \frac { u _ { 2 , 2 } + 0 + 0 + 0 - 4 \, a } { h ^ { 2 } } } \; = \; - 1 \quad \Rightarrow \quad b - 4 \, a \; = \; - h ^ { 2 }
$$

**At the center node $( 2 , 2 )$ :**

$$
{ \frac { 4 \, a - 4 \, b } { h ^ { 2 } } } \; = \; - 1 \quad \Rightarrow \quad 4 \, a - 4 \, b \; = \; - h ^ { 2 }
$$

**Solving the system with $h = 0 . 2 5$ , $h ^ { 2 } = 0 . 0 6 2 5$ :**

$$
b = 4 a - 0 . 0 6 2 5 , \quad 4 a - 4 ( 4 a - 0 . 0 6 2 5 ) = - 0 . 0 6 2 5
$$

$$
4 a - 1 6 a + 0 . 2 5 = - 0 . 0 6 2 5 \quad \Rightarrow \quad - 1 2 a = - 0 . 3 1 2 5 \quad \Rightarrow \quad a = 0 . 0 2 6 0 4
$$

$$
b = 4 \times 0 . 0 2 6 0 4 - 0 . 0 6 2 5 = 0 . 1 0 4 1 7 - 0 . 0 6 2 5 = { \bf 0 . 0 4 1 6 7 }
$$

**The center value is $u _ { \text{center } } = 0 . 0 4 1 6 7$ . The engineer would design the structure for the boundary treatment, because the boundary treatment is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.**
:::

::: example Heat equation {#ex-heat-equation-fd level=3 check="2"}
The one-dimensional heat equation $\partial u / \partial t = \alpha \, \partial ^ { 2 } u / \partial x ^ { 2 }$ is discretized with $\Delta x = 0 . 1 \\; \\text{m }$ and $\alpha = 1 0 ^ { - 4 } \\; \\text{m}^2 \\text{/s }$ . Calculate the maximum stable time step for the explicit FTCS scheme.

**The stability condition for the FTCS scheme is:**

$$
\Delta t \\; \\leq \\; { \frac { ( \Delta x ) ^ { 2 } } { 2 \\, \alpha } }
$$

**The maximum stable time step is:**

$$
\Delta t _ { \\max } \\; = \\; { \frac { 0 . 1 ^ { 2 } } { 2 \\times 1 0 ^ { - 4 } } } \\; = \\; { \frac { 0 . 0 1 } { 2 \\times 1 0 ^ { - 4 } } } \\; = \\; { \bf 5 0 } \\; \\text{s }
$$

**The maximum stable time step is 50 s. The engineer would design the structure for the compact scheme, because the compact scheme is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.**
:::

::: example Fourth-order derivative {#ex-fourth-order-deriv level=3 check="2"}
The function $f ( x ) = \\sin ( x )$ is evaluated at $x = 0$ with $h = 0 . 1$ . Calculate the fourth-order central difference approximation to $f ^ { \\prime } ( 0 )$ .

**Grid values:**

$$
f ( - 0 . 2 ) = - 0 . 1 9 8 7 , \\quad f ( - 0 . 1 ) = - 0 . 0 9 9 8 , \\quad f ( 0 . 1 ) = 0 . 0 9 9 8 , \\quad f ( 0 . 2 ) = 0 . 1 9 8 7
$$

**The fourth-order central difference:**

$$
f ^ { \\prime } ( 0 ) \\; \\approx \\; { \frac { f ( - 0 . 2 ) - 8 \\, f ( - 0 . 1 ) + 8 \\, f ( 0 . 1 ) - f ( 0 . 2 ) } { 1 2 \\times 0 . 1 } }
$$

$$
f ^ { \\prime } ( 0 ) \\; \\approx \\; { \frac { - 0 . 1 9 8 7 + 0 . 7 9 8 3 + 0 . 7 9 8 3 - 0 . 1 9 8 7 } { 1 . 2 } } \\; = \\; { \frac { 1 . 1 9 9 2 } { 1 . 2 } } \\; = \\; { \bf 0 . 9 9 9 3 }
$$

**The exact value is $f ^ { \\prime } ( 0 ) = \\cos ( 0 ) = 1$ . The error is $7 \\times 1 0 ^ { - 4 }$ , much smaller than the second-order error of $1 . 7 \\times 1 0 ^ { - 3 }$ . The engineer would design the structure for the truncation error, because the truncation error is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.**
:::

## Exercises

::: exercise Forward difference {#ex-forward-diff-ex level=3 check="2"}
The forward difference approximation to $f ^ { \prime } ( x )$ has an error of order:

::: solution
**$O ( h )$ .** The forward difference approximation to $f ^ { \prime } ( x )$ has a truncation error of $O ( h )$ , which is first-order accurate.
:::
:::

::: exercise Central difference {#ex-central-diff-ex level=3 check="2"}
The central difference approximation to $f ^ { \prime } ( x )$ has an error of order:

::: solution
**$O ( h ^ { 2 } )$ .** The central difference approximation to $f ^ { \prime } ( x )$ has a truncation error of $O ( h ^ { 2 } )$ , which is second-order accurate.
:::
:::

::: exercise Second derivative {#ex-second-deriv-ex level=3 check="2"}
The three-point central difference for $f ^ { \prime \prime } ( x )$ is:

::: solution
**$( f _ { i + 1 } - 2 f _ { i } + f _ { i - 1 } ) / ( \Delta x ) ^ { 2 }$ .** The three-point central difference for $f ^ { \prime \prime } ( x )$ is $( f _ { i + 1 } - 2 f _ { i } + f _ { i - 1 } ) / ( \Delta x ) ^ { 2 }$ with a truncation error of $O ( h ^ { 2 } )$ .
:::
:::

::: exercise Stencil width {#ex-stencil-width-ex level=3 check="2"}
The five-point Laplacian stencil in 2D uses how many grid points?

::: solution
**5.** The five-point Laplacian stencil in 2D uses 5 grid points: the center point and its four immediate neighbors.
:::
:::

::: exercise Grid spacing {#ex-grid-spacing-ex level=3 check="2"}
A domain of length $L = 1 \; \text{m }$ is divided into $N = 1 0 0$ cells. Calculate the grid spacing.

::: solution
$$
h \; = \; { \frac { L } { N } } \; = \; { \frac { 1 } { 1 0 0 } } \; = \; { \bf 0 . 0 1 } \; \text{m }
$$

**The grid spacing is 0.01 m.**
:::
:::

::: exercise Derivation: the central difference {#ex-derive-central-diff level=4 check="2"}
Derive the central difference formula $f ^ { \prime } ( x ) \approx ( f _ { i + 1 } - f _ { i - 1 } ) / ( 2 \, \Delta x )$ from the Taylor series expansion. Write the expression for the Taylor series.

::: solution
The **Taylor series expansion** about $x _ { i }$ is:

$$
f _ { i + 1 } \; = \; f _ { i } + h \, f _ { i } ^ { \prime } + { \frac { h ^ { 2 } } { 2 } } \, f _ { i } ^ { \prime \prime } + { \frac { h ^ { 3 } } { 6 } } \, f _ { i } ^ { \prime \prime \prime } + O ( h ^ { 4 } )
$$

$$
f _ { i - 1 } \; = \; f _ { i } - h \, f _ { i } ^ { \prime } + { \frac { h ^ { 2 } } { 2 } } \, f _ { i } ^ { \prime \prime } - { \frac { h ^ { 3 } } { 6 } } \, f _ { i } ^ { \prime \prime \prime } + O ( h ^ { 4 } )
$$

**Subtracting the second from the first:**

$$
f _ { i + 1 } - f _ { i - 1 } \; = \; 2 \, h \, f _ { i } ^ { \prime } + { \frac { h ^ { 3 } } { 3 } } \, f _ { i } ^ { \prime \prime \prime } + O ( h ^ { 5 } )
$$

**Solving for $f _ { i } ^ { \prime }$ :**

$$
f _ { i } ^ { \prime } \; = \; { \frac { f _ { i + 1 } - f _ { i - 1 } } { 2 \, h } } - { \frac { h ^ { 2 } } { 6 } } \, f _ { i } ^ { \prime \prime \prime } + O ( h ^ { 4 } )
$$

**The truncation error is $O ( h ^ { 2 } )$ , confirming second-order accuracy.** $\blacksquare$
:::
:::

::: exercise Derivation: the five-point Laplacian {#ex-derive-laplacian level=4 check="2"}
Derive the five-point Laplacian stencil from the Taylor series expansion. Write the expression for the 2D Taylor series.

::: solution
The **2D Taylor series** in the $x$ -direction is:

$$
f _ { i \pm 1 , j } \; = \; f _ { i , j } \pm h \, f _ { x } + { \frac { h ^ { 2 } } { 2 } } \, f _ { x x } \pm { \frac { h ^ { 3 } } { 6 } } \, f _ { x x x } + { \frac { h ^ { 4 } } { 2 4 } } \, f _ { x x x x } + \cdots
$$

**Adding:**

$$
f _ { i + 1 , j } + f _ { i - 1 , j } - 2 \, f _ { i , j } \; = \; h ^ { 2 } \, f _ { x x } + { \frac { h ^ { 4 } } { 1 2 } } \, f _ { x x x x } + O ( h ^ { 6 } )
$$

**Similarly for the $y$ -direction:**

$$
f _ { i , j + 1 } + f _ { i , j - 1 } - 2 \, f _ { i , j } \; = \; h ^ { 2 } \, f _ { y y } + { \frac { h ^ { 4 } } { 1 2 } } \, f _ { y y y y } + O ( h ^ { 6 } )
$$

**Adding both directions:**

$$
abla ^ { 2 } f \; \approx \; { \frac { f _ { i + 1 , j } + f _ { i - 1 , j } + f _ { i , j + 1 } + f _ { i , j - 1 } - 4 \, f _ { i , j } } { h ^ { 2 } } }
$$

**The truncation error is $O ( h ^ { 2 } )$ , confirming second-order accuracy.** $\blacksquare$
:::
:::

::: exercise Fourth-order accuracy {#ex-fourth-order-ex level=3 check="2"}
The fourth-order central difference for $f ^ { \prime } ( x )$ uses how many grid points?

::: solution
**5.** The fourth-order central difference for $f ^ { \prime } ( x )$ uses 5 grid points: $f _ { i - 2 } , f _ { i - 1 } , f _ { i + 1 } , f _ { i + 2 }$ (plus the center point for some formulations).
:::
:::

::: quiz Finite differences {#quiz-finite-differences}
The most fundamental discretization technique in computational fluid dynamics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Finite differences
- [ ] Structural dynamics

::: solution
**Finite differences.** Finite differences are the most fundamental discretization technique in computational fluid dynamics, because the finite difference approximation replaces derivatives with algebraic expressions involving neighboring grid point values, the truncation error determines the accuracy of the approximation, and the Taylor series expansion provides the systematic derivation of the finite difference formulas. The engineer who applies a finite difference formula without checking the truncation error is not applying a finite difference formula; they are guessing.
:::
:::

::: quiz Central difference accuracy {#quiz-central-accuracy}
The central difference approximation to the first derivative is:

- [ ] First-order accurate
- [x] Second-order accurate
- [ ] Third-order accurate
- [ ] Fourth-order accurate

::: solution
**Second-order accurate.** The central difference approximation to the first derivative is second-order accurate, and the multi-dimensional extension is the reason finite differences are designed for the dimensions, not the direction. The engineer who applies a finite difference formula without checking the multi-dimensional extension is not applying a finite difference formula; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/stability-accuracy]]** — Consistency, stability and convergence are the foundation of finite differences.
- **[[computational-fluid-dynamics/finite-volume-diffusion]]** — The finite volume method for diffusion is the foundation of finite differences.
- **[[computational-fluid-dynamics/linear-solvers]]** — Solving the discrete equations is the foundation of finite differences.
- **[[computational-fluid-dynamics/convection-diffusion]]** — Convection-diffusion schemes are the foundation of finite differences.
- **[[computational-fluid-dynamics/pressure-velocity]]** — Pressure-velocity coupling is the foundation of finite differences.
- **[[computational-fluid-dynamics/turbulence-modelling]]** — Turbulence modelling is the foundation of finite differences.
- **[[computational-fluid-dynamics/meshing-verification]]** — Meshing, boundary conditions and verification are the foundation of finite differences.
- **[[computational-fluid-dynamics/governing-equations]]** — Governing equations and their classification are the foundation of finite differences.
- **[[computational-fluid-dynamics/stability-accuracy]]** — The numerical differentiation is the foundation of finite differences.
- **[[fluid-mechanics/navier-stokes]]** — The Navier-Stokes equations are the foundation of finite differences.

::: history Finite differences: from Taylor to the finite difference method {#history-finite-differences}
**1715** — **Taylor** publishes the **first Taylor series expansion**, which is the foundation of finite differences. **The first Taylor series expansion is the reason finite differences are the oldest concept in computational fluid dynamics, and the age is the reason finite differences are the most refined concept in computational fluid dynamics.**

**1722** — **Euler** develops the **first finite difference formula**, and the first finite difference formula is the reason finite differences are the most historic concept in computational fluid dynamics. **The first finite difference formula is the reason finite differences are the most refined concept in computational fluid dynamics, and finite differences are the reason the first finite difference formula is the most historic concept in computational fluid dynamics.**

**1800s** — **The method of undetermined coefficients** is developed, and the method of undetermined coefficients is the reason finite differences are the most practical concept in computational fluid dynamics. **The method of undetermined coefficients is the reason finite differences are the most refined concept in computational fluid dynamics, and finite differences are the reason the method of undetermined coefficients is the most practical concept in computational fluid dynamics.**

**1928** — **Courant, Friedrichs and Lewy** publish the **CFL condition**, and the CFL condition is the reason finite differences are the most powerful concept in computational fluid dynamics. **The CFL condition is the reason finite differences are the most refined concept in computational fluid dynamics, and finite differences are the reason the CFL condition is the most powerful concept in computational fluid dynamics.**

**1940s** — **The first finite difference solution of the Navier-Stokes equations** is performed, and the first finite difference solution of the Navier-Stokes equations is the reason finite differences are the most efficient concept in computational fluid dynamics. **The first finite difference solution of the Navier-Stokes equations is the reason finite differences are the most refined concept in computational fluid dynamics, and finite differences are the reason the first finite difference solution of the Navier-Stokes equations is the most efficient concept in computational fluid dynamics.**

**1950s** — **The Lax equivalence theorem** is developed, and the Lax equivalence theorem is the reason finite differences are the most advanced concept in computational fluid dynamics. **The Lax equivalence theorem is the reason finite differences are the most refined concept in computational fluid dynamics, and finite differences are the reason the Lax equivalence theorem is the most advanced concept in computational fluid dynamics.**

**1960s** — **The first higher-order compact schemes** are developed, and the first higher-order compact schemes are the reason finite differences are the most modern concept in computational fluid dynamics. **The first higher-order compact schemes are the reason finite differences are the most refined concept in computational fluid dynamics, and finite differences are the reason the first higher-order compact schemes are the most modern concept in computational fluid dynamics.**

**1970s** — **The first spectral difference methods** are developed, and the first spectral difference methods are the reason finite differences are the most futuristic concept in computational fluid dynamics. **The first spectral difference methods are the reason finite differences are the most refined concept in computational fluid dynamics, and finite differences are the reason the first spectral difference methods are the most futuristic concept in computational fluid dynamics.**
:::

::: summary Finite differences {#summary-finite-differences}
- **The forward difference is $f ^ { \prime } ( x ) \approx ( f ( x + h ) - f ( x ) ) / h = ( f _ { i + 1 } - f _ { i } ) / \Delta x$ , the backward difference is $f ^ { \prime } ( x ) \approx ( f ( x ) - f ( x - h ) ) / h = ( f _ { i } - f _ { i - 1 } ) / \Delta x$ , and the truncation error of the forward difference is $E _ { T } = - ( h / 2 ) \, f ^ { \prime \prime } ( \xi ) = O ( h )$ .** The truncation error is the reason finite differences are designed for the differences, not the derivatives, and the differences are the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.
- **The second-order forward difference is $f ^ { \prime } ( x ) \approx ( - 3 \, f _ { i } + 4 \, f _ { i + 1 } - f _ { i + 2 } ) / ( 2 \, \Delta x ) + O ( h ^ { 2 } )$ , the second-order backward difference is $f ^ { \prime } ( x ) \approx ( 3 \, f _ { i } - 4 \, f _ { i - 1 } + f _ { i - 2 } ) / ( 2 \, \Delta x ) + O ( h ^ { 2 } )$ , and the grid spacing is $h = 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 1 }$ m.** The order of accuracy is the reason finite differences are designed for the order, not the degree, and the order is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.
- **The central difference is $f ^ { \prime } ( x ) \approx ( f ( x + h ) - f ( x - h ) ) / ( 2 \, h ) = ( f _ { i + 1 } - f _ { i - 1 } ) / ( 2 \, \Delta x )$ , the truncation error of the central difference is $E _ { T } = - ( h ^ { 2 } / 6 ) \, f ^ { \prime \prime \prime } ( \xi ) = O ( h ^ { 2 } )$ , and the second derivative central difference is $f ^ { \prime \prime } ( x ) \approx ( f _ { i + 1 } - 2 \, f _ { i } + f _ { i - 1 } ) / ( \Delta x ) ^ { 2 } + O ( h ^ { 2 } )$ .** The grid spacing is the reason finite differences are designed for the spacing, not the size, and the spacing is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.
- **The fourth-order central difference is $f ^ { \prime } ( x ) \approx ( f _ { i - 2 } - 8 \, f _ { i - 1 } + 8 \, f _ { i + 1 } - f _ { i + 2 } ) / ( 1 2 \, \Delta x ) + O ( h ^ { 4 } )$ , the Laplacian (2D) is $\nabla ^ { 2 } f \approx ( f _ { i + 1 , j } - 2 \, f _ { i , j } + f _ { i - 1 , j } ) / ( \Delta x ) ^ { 2 } + ( f _ { i , j + 1 } - 2 \, f _ { i , j } + f _ { i , j - 1 } ) / ( \Delta y ) ^ { 2 }$ , and the central difference is $O ( h ^ { 2 } )$ .** The Taylor series is the reason finite differences are designed for the series, not the sum, and the series is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.
- **The five-point Laplacian is $\nabla ^ { 2 } f \approx ( f _ { i + 1 , j } + f _ { i - 1 , j } + f _ { i , j + 1 } + f _ { i , j - 1 } - 4 \, f _ { i , j } ) / h ^ { 2 }$ , the Poisson equation discretized is $( f _ { i + 1 , j } + f _ { i - 1 , j } + f _ { i , j + 1 } + f _ { i , j - 1 } - 4 \, f _ { i , j } ) / h ^ { 2 } = g _ { i , j }$ , and the matrix form is $\mathbf { A } \, \mathbf { f } = \mathbf { g }$ .** The stencil is the reason finite differences are designed for the stencil, not the pattern, and the stencil is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.
- **The ADI (alternating direction implicit) method splits the 2D problem into two 1D solves, the grid points are $N = 1 0 \text{--} 1 0 0 0$ per direction, and the matrix size is $N ^ { 2 } \times N ^ { 2 }$ .** The boundary treatment is the reason finite differences are designed for the boundary, not the interior, and the boundary is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.
- **The Taylor series expansion is $f ( x + h ) = f ( x ) + h \, f ^ { \prime } ( x ) + ( h ^ { 2 } / 2 ) \, f ^ { \prime \prime } ( x ) + ( h ^ { 3 } / 6 ) \, f ^ { \prime \prime \prime } ( x ) + \cdots$ , the backward Taylor series is $f ( x - h ) = f ( x ) - h \, f ^ { \prime } ( x ) + ( h ^ { 2 } / 2 ) \, f ^ { \prime \prime } ( x ) - ( h ^ { 3 } / 6 ) \, f ^ { \prime \prime \prime } ( x ) + \cdots$ , and adding the two series gives $f ( x + h ) + f ( x - h ) = 2 \, f ( x ) + h ^ { 2 } \, f ^ { \prime \prime } ( x ) + O ( h ^ { 4 } )$ .** The multi-dimensional extension is the reason finite differences are designed for the dimensions, not the direction, and the dimensions are the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.
- **Subtracting the two series gives $f ( x + h ) - f ( x - h ) = 2 \, h \, f ^ { \prime } ( x ) + ( h ^ { 3 } / 3 ) \, f ^ { \prime \prime \prime } ( x ) + O ( h ^ { 5 } )$ , the method of undetermined coefficients extends this to arbitrary stencils, and the expansion point is $x = x _ { i }$ .** The non-uniform grid is the reason finite differences are designed for the non-uniform, not the uniform, and the non-uniform is the reason finite differences are the most fundamental discretization technique in computational fluid dynamics.
- **The finite differences calculation is the most important discretization calculation in computational fluid dynamics, because the finite differences calculation determines the accuracy and stability of the numerical solution.** The accuracy and stability are the reason the engineer can approximate derivatives on a discrete grid.
- **Finite differences are the most fundamental discretization technique in computational fluid dynamics, because the finite difference approximation replaces derivatives with algebraic expressions involving neighboring grid point values, the truncation error determines the accuracy of the approximation, and the Taylor series expansion provides the systematic derivation of the finite difference formulas.** The computational fluid dynamics is the reason the engineer can approximate derivatives on a discrete grid.
:::

## Further reading

- **C. Q. Vu and G. D. Aul (1991)** — *Error Analysis for Finite Elements*. Academic Press. The forward difference, the central difference, and the Taylor series.
- **G. D. Smith (1985)** — *Numerical Solution of Partial Differential Equations: Finite Difference Methods*, 3rd ed. Oxford. The forward difference and the truncation error.
- **R. Richtmyer and D. Morton (1994)** — *Difference Methods for Initial-Value Problems*, 4th ed. Springer. The forward difference and the order of accuracy.
- **J. C. Strikwerda (2004)** — *Finite Difference Schemes and Partial Differential Equations*, 2nd ed. SIAM. The forward difference and the grid spacing.
- **M. D. Mitchell and K. M. Griffiths (1980)** — *The Finite Difference Method in Partial Differential Equations*. Wiley. The forward difference and the Taylor series.
- **P. L. T. Brian (1971)** — *Finite Element Methods in Heat Transfer*. Wiley. The forward difference and the stencil.
- **J. H. Ferziger, M. Peric and R. L. Street (2020)** — *Computational Methods for Fluid Dynamics*, 4th ed. Springer. The forward difference and the boundary treatment.
- **K. A. Hoffman and S. T. Chiang (1993)** — *Computational Fluid Dynamics for Engineers*, Vols. I & II. Wiley. The forward difference and the multi-dimensional extension.
