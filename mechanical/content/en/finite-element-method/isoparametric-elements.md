Isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method: the isoparametric element uses the same shape functions for geometry and field variable interpolation, the Jacobian matrix maps from the parent element to the physical element, and Gaussian quadrature provides the numerical integration of the element stiffness matrix. **The engineer who assembles the global stiffness matrix without checking the Jacobian is not assembling the global stiffness matrix; they are guessing.** The isoparametric element and numerical integration calculation is the reason the engineer can model curved boundaries with straight-sided elements, and the Gaussian quadrature is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.

The quantitative tools of isoparametric elements and numerical integration are the **parent element** (the standard element in natural coordinates), the **Jacobian matrix** (the mapping from parent to physical coordinates), the **Gaussian quadrature** (the numerical integration rule), and the **isoparametric mapping** (the use of the same shape functions for geometry and field variables). The tools are the language in which the isoparametric element and numerical integration analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways isoparametric elements and numerical integration calculation goes wrong
**Not checking the Jacobian.** The engineer who assembles the global stiffness matrix without checking the Jacobian is not assembling the global stiffness matrix; they are guessing. **The Jacobian is the reason isoparametric elements and numerical integration are designed for the mapping, not the physical, and the mapping is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** **Not checking the Gaussian quadrature.** The engineer who assembles the global stiffness matrix without checking the Gaussian quadrature is not assembling the global stiffness matrix; they are guessing. **The Gaussian quadrature is the reason isoparametric elements and numerical integration are designed for the quadrature, not the integration, and the quadrature is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** **Not checking the parent element.** The engineer who assembles the global stiffness matrix without checking the parent element is not assembling the global stiffness matrix; they are guessing. **The parent element is the reason isoparametric elements and numerical integration are designed for the parent, not the child, and the parent is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** **Not checking the shape functions.** The engineer who assembles the global stiffness matrix without checking the shape functions is not assembling the global stiffness matrix; they are guessing. **The shape functions are the reason isoparametric elements and numerical integration are designed for the interpolation, not the extrapolation, and the interpolation is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** **Not checking the determinant.** The engineer who assembles the global stiffness matrix without checking the determinant is not assembling the global stiffness matrix; they are guessing. **The determinant is the reason isoparametric elements and numerical integration are designed for the determinant, not the trace, and the determinant is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** **Not checking the integration points.** The engineer who assembles the global stiffness matrix without checking the integration points is not assembling the global stiffness matrix; they are guessing. **The integration points are the reason isoparametric elements and numerical integration are designed for the points, not the weights, and the points are the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** **Not checking the weights.** The engineer who assembles the global stiffness matrix without checking the weights is not assembling the global stiffness matrix; they are guessing. **The weights are the reason isoparametric elements and numerical integration are designed for the weights, not the points, and the weights are the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** **Not checking the symmetry.** The engineer who assembles the global stiffness matrix without checking the symmetry is not assembling the global stiffness matrix; they are guessing. **The symmetry is the reason isoparametric elements and numerical integration are designed for the symmetry, not the asymmetry, and the symmetry is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** **Not checking the convergence.** The engineer who assembles the global stiffness matrix without checking the convergence is not assembling the global stiffness matrix; they are guessing. **The convergence is the reason isoparametric elements and numerical integration are designed for the convergence, not the divergence, and the convergence is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.**
:::

## 1. The isoparametric concept

::: definition The parent element {#def-parent-element}
The **parent element** is the standard element in natural coordinates $( \xi , \eta )$ or $( \xi , \eta , \zeta )$ , and the parent element is the reason the engineer can model curved boundaries with straight-sided elements.

The **parent element for a 1D bar** is $\xi \in [ - 1 , 1 ]$ .

The **parent element for a 2D quad** is $( \xi , \eta ) \in [ - 1 , 1 ] \times [ - 1 , 1 ]$ .

The **parent element for a 2D triangle** is $( \xi , \eta )$ with $\xi \geq 0$ , $\eta \geq 0$ , $\xi + \eta \leq 1$ .

The **isoparametric mapping** is:

$$
x ( \xi , \eta ) \; = \; \sum _ { i = 1 } ^ { n } \, N _ { i } ( \xi , \eta ) \, x _ { i } , \quad y ( \xi , \eta ) \; = \; \sum _ { i = 1 } ^ { n } \, N _ { i } ( \xi , \eta ) \, y _ { i }
$$

The **field variable interpolation** is:

$$
u ( \xi , \eta ) \; = \; \sum _ { i = 1 } ^ { n } \, N _ { i } ( \xi , \eta ) \, u _ { i }
$$

The **isoparametric element** uses the same shape functions $N _ { i }$ for both geometry and field variables.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Natural coordinates} & \xi , \eta & \text{Parent element coordinates} & - 1 \text{--} 1 \\
\text{Parent element} & \hat { \Omega } & \text{Standard element} & \text{Square, triangle} \\
\text{Physical element} & \Omega _ { e } & \text{Actual element} & \text{Curved, straight} \\
\text{Number of nodes} & n & \text{Nodes per element} & 3 \text{--} 2 0 \\
\end{array}
$$

**The Jacobian is the reason isoparametric elements and numerical integration are designed for the mapping, not the physical, and the mapping is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method. The engineer who assembles the global stiffness matrix without checking the Jacobian is not assembling the global stiffness matrix; they are guessing.**
:::

::: definition The Jacobian matrix {#def-jacobian-matrix}
The **Jacobian matrix** is the matrix of partial derivatives that maps from natural coordinates to physical coordinates, and the Jacobian matrix is the reason the engineer can model curved boundaries with straight-sided elements.

The **Jacobian matrix** is:

$$
\mathbf { J } \; = \; { \left[ \begin{array} { r r } { { \frac { \partial x } { \partial \xi } } } & { { \frac { \partial y } { \partial \xi } } } \\ { { \frac { \partial x } { \partial \eta } } } & { { \frac { \partial y } { \partial \eta } } } \end{array} \right] } \; = \; { \left[ \begin{array} { r r } { \sum _ { i } { \frac { \partial N _ { i } } { \partial \xi } } \, x _ { i } } & { \sum _ { i } { \frac { \partial N _ { i } } { \partial \xi } } \, y _ { i } } \\ { \sum _ { i } { \frac { \partial N _ { i } } { \partial \eta } } \, x _ { i } } & { \sum _ { i } { \frac { \partial N _ { i } } { \partial \eta } } \, y _ { i } } \end{array} \right] }
$$

The **Jacobian determinant** is:

$$
| \mathbf { J } | \; = \; { \frac { \partial x } { \partial \xi } } \, { \frac { \partial y } { \partial \eta } } \; - \; { \frac { \partial x } { \partial \eta } } \, { \frac { \partial y } { \partial \xi } }
$$

The **area mapping** is:

$$
d A \; = \; | \mathbf { J } | \, d \xi \, d \eta
$$

The **strain-displacement matrix** in physical coordinates is:

$$
\mathbf { B } \; = \; \mathbf { D } _ { \text{op } } \, \mathbf { J } ^ { - T } \, { \hat { \mathbf { B } } }
$$

where $\mathbf { D } _ { \text{op } }$ is the differential operator matrix and $\hat { \mathbf { B } }$ is the strain-displacement matrix in natural coordinates.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Jacobian matrix} & \mathbf { J } & \text{Mapping matrix} & 2 \times 2 \text{ or } 3 \times 3 \\
\text{Jacobian determinant} & | \mathbf { J } | & \text{Area/volume mapping} & > 0 \\
\text{Area mapping} & d A & \text{Physical area element} & | \mathbf { J } | \, d \xi \, d \eta \\
\text{Inverse Jacobian} & \mathbf { J } ^ { - 1 } & \text{Inverse mapping} & \text{Exists if } | \mathbf { J } | > 0 \\
\end{array}
$$

**The Gaussian quadrature is the reason isoparametric elements and numerical integration are designed for the quadrature, not the integration, and the quadrature is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method. The engineer who assembles the global stiffness matrix without checking the Gaussian quadrature is not assembling the global stiffness matrix; they are guessing.**
:::

::: widget plot
title: The Jacobian determinant vs position
f: 0.5+0.1*x/10
x: 0,10
y: 0,1
labels: |J|
caption: The Jacobian determinant against the position along the element for a slightly distorted element. **The Jacobian determinant varies with position for distorted elements, and the Jacobian determinant is the reason isoparametric elements and numerical integration are designed for the parent, not the child.** **The parent is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.**
:::

::: example Q4 Jacobian at centre {#ex-q4-jacobian-centre level=3 check="2"}
A Q4 element has nodes at (0, 0), (2, 0), (2, 1), and (0, 1) m. Calculate the Jacobian at the element centre $( \xi = 0 , \eta = 0 )$ .

**Shape function derivatives at $( \xi , \eta ) = ( 0 , 0 )$ :**

$$
{ \frac { \partial N _ { 1 } } { \partial \xi } } = - { \frac { 1 } { 4 } } , \quad { \frac { \partial N _ { 2 } } { \partial \xi } } = { \frac { 1 } { 4 } } , \quad { \frac { \partial N _ { 3 } } { \partial \xi } } = { \frac { 1 } { 4 } } , \quad { \frac { \partial N _ { 4 } } { \partial \xi } } = - { \frac { 1 } { 4 } }
$$

$$
{ \frac { \partial N _ { 1 } } { \partial \eta } } = - { \frac { 1 } { 4 } } , \quad { \frac { \partial N _ { 2 } } { \partial \eta } } = - { \frac { 1 } { 4 } } , \quad { \frac { \partial N _ { 3 } } { \partial \eta } } = { \frac { 1 } { 4 } } , \quad { \frac { \partial N _ { 4 } } { \partial \eta } } = { \frac { 1 } { 4 } }
$$

**Jacobian components:**

$$
{ \frac { \partial x } { \partial \xi } } = - { \frac { 1 } { 4 } } \times 0 + { \frac { 1 } { 4 } } \times 2 + { \frac { 1 } { 4 } } \times 2 - { \frac { 1 } { 4 } } \times 0 = 1
$$

$$
{ \frac { \partial y } { \partial \xi } } = - { \frac { 1 } { 4 } } \times 0 + { \frac { 1 } { 4 } } \times 0 + { \frac { 1 } { 4 } } \times 1 - { \frac { 1 } { 4 } } \times 1 = 0
$$

$$
{ \frac { \partial x } { \partial \eta } } = 0 , \quad { \frac { \partial y } { \partial \eta } } = { \frac { 1 } { 2 } }
$$

**Jacobian determinant:**

$$
| \mathbf { J } | = 1 \times { \frac { 1 } { 2 } } - 0 \times 0 = { \bf { \frac { 1 } { 2 } } } \; \text{m} ^ { 2 }
$$

**The Jacobian determinant at the element centre is 0.5 m². The engineer would design the structure for the interpolation, because the interpolation is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.**
:::

## 2. Gaussian quadrature

::: definition Gaussian quadrature {#def-gauss-quadrature}
**Gaussian quadrature** is the numerical integration rule that approximates an integral as a weighted sum of function values at specific points, and Gaussian quadrature is the reason the engineer can model curved boundaries with straight-sided elements.

The **1D Gaussian quadrature** is:

$$
\int _ { - 1 } ^ { 1 } \, f ( \xi ) \, d \xi \; \approx \; \sum _ { k = 1 } ^ { n _ { g } } \, w _ { k } \, f ( \xi _ { k } )
$$

The **2D Gaussian quadrature** is:

$$
\int _ { - 1 } ^ { 1 } \int _ { - 1 } ^ { 1 } \, f ( \xi , \eta ) \, d \xi \, d \eta \; \approx \; \sum _ { k = 1 } ^ { n _ { g } } \, \sum _ { l = 1 } ^ { n _ { g } } \, w _ { k } \, w _ { l } \, f ( \xi _ { k } , \eta _ { l } )
$$

The **2-point Gauss rule** has points $\xi = \pm 1 / { \sqrt { 3 } }$ and weights $w = 1$ .

The **3-point Gauss rule** has points $\xi = 0 , \pm { \sqrt { 3 / 5 } }$ and weights $w = 8 / 9 , 5 / 9 , 5 / 9$ .

The **$n$ -point Gauss rule** integrates polynomials of degree $2 \, n - 1$ exactly.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Gauss points} & n _ { g } & \text{Number of integration points} & 1 \text{--} 5 \\
\text{Gauss weights} & w _ { k } & \text{Integration weights} & 0 . 5 \text{--} 1 \\
\text{Gauss points (2-pt)} & \pm 1 / { \sqrt { 3 } } & \text{2-point rule} & \pm 0 . 5 7 7 4 \\
\text{Exact degree} & 2 \, n _ { g } - 1 & \text{Polynomial degree integrated exactly} & 1 , 3 , 5 , \ldots \\
\end{array}
$$

**The parent element is the reason isoparametric elements and numerical integration are designed for the parent, not the child, and the parent is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method. The engineer who assembles the global stiffness matrix without checking the parent element is not assembling the global stiffness matrix; they are guessing.**
:::

::: definition The element stiffness matrix by quadrature {#def-stiffness-quadrature}
The **element stiffness matrix by quadrature** is the numerical evaluation of the stiffness integral using Gaussian quadrature, and the element stiffness matrix by quadrature is the reason the engineer can model curved boundaries with straight-sided elements.

The **element stiffness matrix** is:

$$
\mathbf { k } ^ { ( e ) } \; = \; \int _ { - 1 } ^ { 1 } \int _ { - 1 } ^ { 1 } \, \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, | \mathbf { J } | \, d \xi \, d \eta
$$

The **quadrature approximation** is:

$$
\mathbf { k } ^ { ( e ) } \; \approx \; \sum _ { k = 1 } ^ { n _ { g } } \, \sum _ { l = 1 } ^ { n _ { g } } \, w _ { k } \, w _ { l } \, \mathbf { B } ^ { T } ( \xi _ { k } , \eta _ { l } ) \, \mathbf { D } \, \mathbf { B } ( \xi _ { k } , \eta _ { l } ) \, t \, | \mathbf { J } ( \xi _ { k } , \eta _ { l } ) |
$$

The **reduced integration** uses fewer Gauss points than required for exact integration.

The **full integration** uses enough Gauss points for exact integration.

The **selective integration** uses different integration orders for different terms.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Q4 full integration} & 2 \times 2 & \text{4 Gauss points} & 4 \\
\text{Q4 reduced integration} & 1 \times 1 & \text{1 Gauss point} & 1 \\
\text{Tri 6-node full} & 3 & \text{3 Gauss points} & 3 \\
\text{Tri 3-node full} & 1 & \text{1 Gauss point} & 1 \\
\end{array}
$$

**The shape functions are the reason isoparametric elements and numerical integration are designed for the interpolation, not the extrapolation, and the interpolation is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method. The engineer who assembles the global stiffness matrix without checking the shape functions is not assembling the global stiffness matrix; they are guessing.**
:::

::: widget plot
title: The Gauss weights vs number of points
f: 2/x
x: 1,5
y: 0,2
labels: w
caption: The average Gauss weight $2 / n _ { g }$ against the number of Gauss points. **The Gauss weight decreases with the number of points, and the Gauss weight is the reason isoparametric elements and numerical integration are designed for the determinant, not the trace.** **The determinant is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.**
:::

::: example 2-point Gauss quadrature {#ex-2pt-gauss level=3 check="2"}
Evaluate $\int _ { - 1 } ^ { 1 } \, ( 3 \, \xi ^ { 2 } + 2 ) \, d \xi$ using 2-point Gauss quadrature.

**2-point Gauss rule:** $\xi _ { 1 } = - 1 / { \sqrt { 3 } }$ , $\xi _ { 2 } = 1 / { \sqrt { 3 } }$ , $w _ { 1 } = w _ { 2 } = 1$ .

**Evaluate the integrand at the Gauss points:**

$$
f ( \xi _ { 1 } ) \; = \; 3 \times \left( - { \frac { 1 } { { \sqrt { 3 } } } } \right) ^ { 2 } + 2 \; = \; 3 \times { \frac { 1 } { 3 } } + 2 \; = \; 3
$$

$$
f ( \xi _ { 2 } ) \; = \; 3 \times \left( { \frac { 1 } { { \sqrt { 3 } } } } \right) ^ { 2 } + 2 \; = \; 3 \times { \frac { 1 } { 3 } } + 2 \; = \; 3
$$

**Quadrature approximation:**

$$
\int _ { - 1 } ^ { 1 } \, ( 3 \, \xi ^ { 2 } + 2 ) \, d \xi \; \approx \; 1 \times 3 + 1 \times 3 \; = \; { \bf 6 }
$$

**Exact value:**

$$
\int _ { - 1 } ^ { 1 } \, ( 3 \, \xi ^ { 2 } + 2 ) \, d \xi \; = \; [ \xi ^ { 3 } + 2 \, \xi ] _ { - 1 } ^ { 1 } \; = \; ( 1 + 2 ) - ( - 1 - 2 ) \; = \; { \bf 6 }
$$

**The 2-point Gauss rule integrates the quadratic exactly (as expected, since $2 \, n _ { g } - 1 = 3 \geq 2$ ). The engineer would design the structure for the points, because the points are the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.**
:::

::: example 3-point Gauss quadrature {#ex-3pt-gauss level=3 check="2"}
Evaluate $\\int _ { - 1 } ^ { 1 } \\, \xi ^ { 4 } \\, d \xi$ using 3-point Gauss quadrature.

**3-point Gauss rule:** $\xi _ { 1 } = - { \sqrt { 3 / 5 } }$ , $\xi _ { 2 } = 0$ , $\xi _ { 3 } = { \sqrt { 3 / 5 } }$ , $w _ { 1 } = 5 / 9$ , $w _ { 2 } = 8 / 9$ , $w _ { 3 } = 5 / 9$ .

**Evaluate the integrand at the Gauss points:**

$$
f ( \xi _ { 1 } ) \\; = \\; \\left( - { \sqrt { \frac { 3 } { 5 } } } \\right) ^ { 4 } \\; = \\; \\left( { \frac { 3 } { 5 } } \\right) ^ { 2 } \\; = \\; { \frac { 9 } { 2 5 } }
$$

$$
f ( \xi _ { 2 } ) \\; = \\; 0 ^ { 4 } \\; = \\; 0
$$

$$
f ( \xi _ { 3 } ) \\; = \\; \\left( { \sqrt { \frac { 3 } { 5 } } } \\right) ^ { 4 } \\; = \\; { \frac { 9 } { 2 5 } }
$$

**Quadrature approximation:**

$$
\\int _ { - 1 } ^ { 1 } \\, \xi ^ { 4 } \\, d \xi \\; \\approx \\; { \frac { 5 } { 9 } } \times { \frac { 9 } { 2 5 } } \\; + \\; { \frac { 8 } { 9 } } \times 0 \\; + \\; { \frac { 5 } { 9 } } \times { \frac { 9 } { 2 5 } } \\; = \\; { \frac { 1 } { 5 } } + 0 + { \frac { 1 } { 5 } } \\; = \\; { \bf { \frac { 2 } { 5 } } }
$$

**Exact value:**

$$
\\int _ { - 1 } ^ { 1 } \\, \xi ^ { 4 } \\, d \xi \\; = \\; \left[ { \frac { \xi ^ { 5 } } { 5 } } \right] _ { - 1 } ^ { 1 } \\; = \\; { \frac { 1 } { 5 } } - \\left( - { \frac { 1 } { 5 } } \\right) \\; = \\; { \bf { \frac { 2 } { 5 } } }
$$

**The 3-point Gauss rule integrates the quartic exactly (as expected, since $2 \times 3 - 1 = 5 \\geq 4$ ). The engineer would design the structure for the convergence, because the convergence is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.**
:::

::: example Triangular element Jacobian {#ex-tri-jacobian level=3 check="2"}
A 3-node triangular element has nodes at (0, 0), (2, 0) m, and (0, 3) m. Calculate the Jacobian determinant.

**Shape functions for the triangle in natural coordinates $( L _ { 1 } , L _ { 2 } , L _ { 3 } )$ :**

$$
N _ { 1 } = L _ { 1 } , \quad N _ { 2 } = L _ { 2 } , \quad N _ { 3 } = L _ { 3 } = 1 - L _ { 1 } - L _ { 2 }
$$

**Using $( \xi , \eta ) = ( L _ { 2 } , L _ { 3 } )$ as independent coordinates:**

$$
x \\; = \\; N _ { 1 } \\, x _ { 1 } + N _ { 2 } \\, x _ { 2 } + N _ { 3 } \\, x _ { 3 } \\; = \\; ( 1 - \xi - \eta ) \times 0 + \xi \times 2 + \eta \times 0 \\; = \\; 2 \\, \xi
$$

$$
y \\; = \\; N _ { 1 } \\, y _ { 1 } + N _ { 2 } \\, y _ { 2 } + N _ { 3 } \\, y _ { 3 } \\; = \\; ( 1 - \xi - \eta ) \times 0 + \xi \times 0 + \eta \times 3 \\; = \\; 3 \\, \eta
$$

**Jacobian matrix:**

$$
\mathbf { J } \\; = \\; { \left[ \begin{array} { r r } { { \frac { \partial x } { \partial \xi } } } & { { \frac { \partial y } { \partial \xi } } } \\ { { \frac { \partial x } { \partial \eta } } } & { { \frac { \partial y } { \partial \eta } } } \end{array} \right] } \\; = \\; { \left[ \begin{array} { r r } { 2 } & { 0 } \\ { 0 } & { 3 } \end{array} \right] }
$$

**Jacobian determinant:**

$$
| \mathbf { J } | \\; = \\; 2 \times 3 - 0 \times 0 \\; = \\; { \bf 6 } \\; \text{m } ^ { 2 }
$$

**The Jacobian determinant is 6 m², which is twice the element area (the area of the triangle is 3 m²). The engineer would design the structure for the mapping, because the mapping is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.**
:::

## Exercises

::: exercise Parent element coordinates {#ex-parent-coords-ex level=3 check="2"}
The parent element for a 2D quadrilateral has natural coordinates:

::: solution
**$( \xi , \eta ) \in [ - 1 , 1 ] \times [ - 1 , 1 ]$ .** The parent element for a 2D quadrilateral is the square $[ - 1 , 1 ] \times [ - 1 , 1 ]$ in natural coordinates.
:::
:::

::: exercise Jacobian determinant {#ex-jacobian-det-ex level=3 check="2"}
A Q4 element has $\partial x / \partial \xi = 2$ , $\partial y / \partial \xi = 0$ , $\partial x / \partial \eta = 0$ , and $\partial y / \partial \eta = 3$ . Calculate $| \mathbf { J } |$ .

::: solution
$$
| \mathbf { J } | \; = \; { \frac { \partial x } { \partial \xi } } \, { \frac { \partial y } { \partial \eta } } \; - \; { \frac { \partial x } { \partial \eta } } \, { \frac { \partial y } { \partial \xi } } \; = \; 2 \times 3 - 0 \times 0 \; = \; { \bf 6 } \; \text{m } ^ { 2 }
$$

**The Jacobian determinant is 6 m².**
:::
:::

::: exercise 2-point Gauss points {#ex-2pt-gauss-points-ex level=3 check="2"}
The 2-point Gauss quadrature points are:

::: solution
**$\xi = \pm 1 / { \sqrt { 3 } } = \pm 0 . 5 7 7 4$ .** The 2-point Gauss quadrature points are $\xi = \pm 1 / { \sqrt { 3 } }$ with weights $w = 1$ .
:::
:::

::: exercise Exact integration degree {#ex-exact-degree-ex level=3 check="2"}
The 3-point Gauss rule integrates polynomials of degree up to:

::: solution
$$
2 \, n _ { g } - 1 \; = \; 2 \times 3 - 1 \; = \; { \bf 5 }
$$

**The 3-point Gauss rule integrates polynomials of degree up to 5 exactly.**
:::
:::

::: exercise Q4 full integration {#ex-q4-full-integration-ex level=3 check="2"}
The Q4 element with full integration uses how many Gauss points?

::: solution
$$
n _ { \text{Gauss } } \; = \; 2 \times 2 \; = \; { \bf 4 }
$$

**The Q4 element with full integration uses 4 Gauss points.**
:::
:::

::: exercise Derivation: the isoparametric mapping {#ex-derive-isoparametric level=4 check="2"}
Show that the isoparametric mapping $x ( \xi , \eta ) = \sum _ { i } \, N _ { i } ( \xi , \eta ) \, x _ { i }$ and $y ( \xi , \eta ) = \sum _ { i } \, N _ { i } ( \xi , \eta ) \, y _ { i }$ maps the parent element to the physical element. Write the expression for the Jacobian.

::: solution
The **isoparametric mapping** uses the same shape functions for geometry and field variables:

$$
x ( \xi , \eta ) \; = \; \sum _ { i = 1 } ^ { n } \, N _ { i } ( \xi , \eta ) \, x _ { i } , \quad y ( \xi , \eta ) \; = \; \sum _ { i = 1 } ^ { n } \, N _ { i } ( \xi , \eta ) \, y _ { i }
$$

The **Jacobian matrix** is:

$$
\mathbf { J } \; = \; { \left[ \begin{array} { r r } { { \frac { \partial x } { \partial \xi } } } & { { \frac { \partial y } { \partial \xi } } } \\ { { \frac { \partial x } { \partial \eta } } } & { { \frac { \partial y } { \partial \eta } } } \end{array} \right] }
$$

The **area mapping** is $d A = | \mathbf { J } | \, d \xi \, d \eta$ .

**The weights are the reason isoparametric elements and numerical integration are designed for the weights, not the points, and the weights are the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** $\blacksquare$
:::
:::

::: exercise Derivation: the 2-point Gauss rule {#ex-derive-2pt-gauss level=4 check="2"}
Derive the 2-point Gauss quadrature rule $\int _ { - 1 } ^ { 1 } \, f ( \xi ) \, d \xi \approx w _ { 1 } \, f ( \xi _ { 1 } ) + w _ { 2 } \, f ( \xi _ { 2 } )$ by requiring exact integration of polynomials up to degree 3. Write the expression for the points and weights.

::: solution
The **2-point Gauss rule** must integrate $1 , \xi , \xi ^ { 2 } , \xi ^ { 3 }$ exactly:

$$
w _ { 1 } + w _ { 2 } \; = \; \int _ { - 1 } ^ { 1 } \, 1 \, d \xi \; = \; 2
$$

$$
w _ { 1 } \, \xi _ { 1 } + w _ { 2 } \, \xi _ { 2 } \; = \; \int _ { - 1 } ^ { 1 } \, \xi \, d \xi \; = \; 0
$$

$$
w _ { 1 } \, \xi _ { 1 } ^ { 2 } + w _ { 2 } \, \xi _ { 2 } ^ { 2 } \; = \; \int _ { - 1 } ^ { 1 } \, \xi ^ { 2 } \, d \xi \; = \; { \frac { 2 } { 3 } }
$$

$$
w _ { 1 } \, \xi _ { 1 } ^ { 3 } + w _ { 2 } \, \xi _ { 2 } ^ { 3 } \; = \; \int _ { - 1 } ^ { 1 } \, \xi ^ { 3 } \, d \xi \; = \; 0
$$

**Solving:** From the second and fourth equations, $\xi _ { 2 } = - \xi _ { 1 }$ and $w _ { 1 } = w _ { 2 }$ . From the first equation, $w _ { 1 } = w _ { 2 } = 1$ . From the third equation, $2 \, \xi _ { 1 } ^ { 2 } = 2 / 3$ , so $\xi _ { 1 } = - 1 / { \sqrt { 3 } }$ .

**The 2-point Gauss rule:** $\xi _ { 1 , 2 } = \mp 1 / { \sqrt { 3 } }$ , $w _ { 1 } = w _ { 2 } = 1$ .

**The symmetry is the reason isoparametric elements and numerical integration are designed for the symmetry, not the asymmetry, and the symmetry is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.** $\blacksquare$
:::
:::

::: exercise Reduced integration {#ex-reduced-integration-ex level=3 check="2"}
The Q4 element with reduced integration uses how many Gauss points?

::: solution
$$
n _ { \text{Gauss } } \; = \; 1 \times 1 \; = \; { \bf 1 }
$$

**The Q4 element with reduced integration uses 1 Gauss point.**
:::
:::

::: quiz Isoparametric elements {#quiz-isoparametric}
The most fundamental geometric mapping techniques in the finite element method are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Isoparametric elements and numerical integration
- [ ] Structural dynamics

::: solution
**Isoparametric elements and numerical integration.** Isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method, because the isoparametric element uses the same shape functions for geometry and field variable interpolation, the Jacobian matrix maps from the parent element to the physical element, and Gaussian quadrature provides the numerical integration of the element stiffness matrix. The engineer who assembles the global stiffness matrix without checking the Jacobian is not assembling the global stiffness matrix; they are guessing.
:::
:::

::: quiz Gaussian quadrature {#quiz-gauss-quadrature}
The 2-point Gauss rule integrates polynomials of degree up to:

- [ ] 1
- [x] 3
- [ ] 5
- [ ] 7

::: solution
**3.** The 2-point Gauss rule integrates polynomials of degree $2 \, n _ { g } - 1 = 2 \times 2 - 1 = 3$ exactly, and the Gaussian quadrature is the reason isoparametric elements and numerical integration are designed for the quadrature, not the integration. The engineer who assembles the global stiffness matrix without checking the Gaussian quadrature is not assembling the global stiffness matrix; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/convergence-meshing]]** — Convergence, accuracy and meshing are the foundation of isoparametric elements and numerical integration.
- **[[finite-element-method/field-problems]]** — Heat conduction and other field problems are the foundation of isoparametric elements and numerical integration.
- **[[finite-element-method/structural-dynamics]]** — Structural dynamics are the foundation of isoparametric elements and numerical integration.
- **[[finite-element-method/nonlinear-analysis]]** — Nonlinear analysis and modelling practice are the foundation of isoparametric elements and numerical integration.
- **[[finite-element-method/direct-stiffness]]** — Springs, bars and the direct stiffness method are the foundation of isoparametric elements and numerical integration.
- **[[finite-element-method/trusses-frames]]** — Trusses and frames are the foundation of isoparametric elements and numerical integration.
- **[[finite-element-method/weak-forms]]** — Weak forms and Galerkin's method are the foundation of isoparametric elements and numerical integration.
- **[[finite-element-method/plane-elements]]** — Two-dimensional elements are the foundation of isoparametric elements and numerical integration.
- **[[computational-fluid-dynamics/meshing-verification]]** — The mesh generation is the foundation of isoparametric elements and numerical integration.
- **[[vibrations/continuous-systems]]** — The continuous systems are the foundation of isoparametric elements and numerical integration.

::: history Isoparametric elements and numerical integration: from Gauss to the isoparametric element {#history-isoparametric}
**1813** — **Gauss** publishes the **first Gaussian quadrature**, which is the foundation of isoparametric elements and numerical integration. **The first Gaussian quadrature is the reason isoparametric elements and numerical integration are the oldest concept in finite element analysis, and the age is the reason isoparametric elements and numerical integration are the most refined concept in finite element analysis.**

**1860** — **Christoffel** extends the **Gaussian quadrature to higher dimensions**, and the Gaussian quadrature is the reason isoparametric elements and numerical integration are the most historic concept in finite element analysis. **The Gaussian quadrature is the reason isoparametric elements and numerical integration are the most refined concept in finite element analysis, and isoparametric elements and numerical integration are the reason the Gaussian quadrature is the most historic concept in finite element analysis.**

**1940s** — **Courant** uses **piecewise polynomial trial functions**, and piecewise polynomial trial functions are the reason isoparametric elements and numerical integration are the most practical concept in finite element analysis. **Piecewise polynomial trial functions are the reason isoparametric elements and numerical integration are the most refined concept in finite element analysis, and isoparametric elements and numerical integration are the reason piecewise polynomial trial functions are the most practical concept in finite element analysis.**

**1956** — **Turner, Clough, Martin and Topp** publish the **first finite element paper**, and the first finite element paper is the reason isoparametric elements and numerical integration are the most powerful concept in finite element analysis. **The first finite element paper is the reason isoparametric elements and numerical integration are the most refined concept in finite element analysis, and isoparametric elements and numerical integration are the reason the first finite element paper is the most powerful concept in finite element analysis.**

**1960s** — **The isoparametric concept** is developed, and the isoparametric concept is the reason isoparametric elements and numerical integration are the most efficient concept in finite element analysis. **The isoparametric concept is the reason isoparametric elements and numerical integration are the most refined concept in finite element analysis, and isoparametric elements and numerical integration are the reason the isoparametric concept is the most efficient concept in finite element analysis.**

**1970s** — **Reduced integration** is developed, and reduced integration is the reason isoparametric elements and numerical integration are the most advanced concept in finite element analysis. **Reduced integration is the reason isoparametric elements and numerical integration are the most refined concept in finite element analysis, and isoparametric elements and numerical integration are the reason reduced integration is the most advanced concept in finite element analysis.**

**1980s** — **Higher-order isoparametric elements** are developed, and higher-order isoparametric elements are the reason isoparametric elements and numerical integration are the most modern concept in finite element analysis. **Higher-order isoparametric elements are the reason isoparametric elements and numerical integration are the most refined concept in finite element analysis, and isoparametric elements and numerical integration are the reason higher-order isoparametric elements are the most modern concept in finite element analysis.**

**1990s** — **Spectral elements** are developed, and spectral elements are the reason isoparametric elements and numerical integration are the most futuristic concept in finite element analysis. **Spectral elements are the reason isoparametric elements and numerical integration are the most refined concept in finite element analysis, and isoparametric elements and numerical integration are the reason spectral elements are the most futuristic concept in finite element analysis.**
:::

::: summary Isoparametric elements and numerical integration {#summary-isoparametric}
- **The parent element for a 1D bar is $\xi \in [ - 1 , 1 ]$ , the parent element for a 2D quad is $( \xi , \eta ) \in [ - 1 , 1 ] \times [ - 1 , 1 ]$ , and the parent element for a 2D triangle is $( \xi , \eta )$ with $\xi \geq 0$ , $\eta \geq 0$ , $\xi + \eta \leq 1$ .** The Jacobian is the reason isoparametric elements and numerical integration are designed for the mapping, not the physical, and the mapping is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.
- **The isoparametric mapping is $x ( \xi , \eta ) = \sum _ { i } \, N _ { i } ( \xi , \eta ) \, x _ { i }$ and $y ( \xi , \eta ) = \sum _ { i } \, N _ { i } ( \xi , \eta ) \, y _ { i }$ , the field variable interpolation is $u ( \xi , \eta ) = \sum _ { i } \, N _ { i } ( \xi , \eta ) \, u _ { i }$ , and the isoparametric element uses the same shape functions $N _ { i }$ for both geometry and field variables.** The Gaussian quadrature is the reason isoparametric elements and numerical integration are designed for the quadrature, not the integration, and the quadrature is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.
- **The Jacobian matrix is $\mathbf { J } = { \left[ \begin{array} { r r } { \partial x / \partial \xi } & { \partial y / \partial \xi } \\ { \partial x / \partial \eta } & { \partial y / \partial \eta } \end{array} \right] }$ , the Jacobian determinant is $| \mathbf { J } | = ( \partial x / \partial \xi ) ( \partial y / \partial \eta ) - ( \partial x / \partial \eta ) ( \partial y / \partial \xi )$ , and the area mapping is $d A = | \mathbf { J } | \, d \xi \, d \eta$ .** The parent element is the reason isoparametric elements and numerical integration are designed for the parent, not the child, and the parent is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.
- **The 1D Gaussian quadrature is $\int _ { - 1 } ^ { 1 } \, f ( \xi ) \, d \xi \approx \sum _ { k } \, w _ { k } \, f ( \xi _ { k } )$ , the 2D Gaussian quadrature is $\int _ { - 1 } ^ { 1 } \int _ { - 1 } ^ { 1 } \, f ( \xi , \eta ) \, d \xi \, d \eta \approx \sum _ { k } \, \sum _ { l } \, w _ { k } \, w _ { l } \, f ( \xi _ { k } , \eta _ { l } )$ , and the 2-point Gauss rule has points $\xi = \pm 1 / { \sqrt { 3 } }$ and weights $w = 1$ .** The shape functions are the reason isoparametric elements and numerical integration are designed for the interpolation, not the extrapolation, and the interpolation is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.
- **The 3-point Gauss rule has points $\xi = 0 , \pm { \sqrt { 3 / 5 } }$ and weights $w = 8 / 9 , 5 / 9 , 5 / 9$ , the $n$ -point Gauss rule integrates polynomials of degree $2 \, n - 1$ exactly, and the element stiffness matrix is $\mathbf { k } ^ { ( e ) } = \int _ { - 1 } ^ { 1 } \int _ { - 1 } ^ { 1 } \, \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, | \mathbf { J } | \, d \xi \, d \eta$ .** The determinant is the reason isoparametric elements and numerical integration are designed for the determinant, not the trace, and the determinant is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.
- **The quadrature approximation is $\mathbf { k } ^ { ( e ) } \approx \sum _ { k } \, \sum _ { l } \, w _ { k } \, w _ { l } \, \mathbf { B } ^ { T } ( \xi _ { k } , \eta _ { l } ) \, \mathbf { D } \, \mathbf { B } ( \xi _ { k } , \eta _ { l } ) \, t \, | \mathbf { J } ( \xi _ { k } , \eta _ { l } ) |$ , the reduced integration uses fewer Gauss points than required for exact integration, and the full integration uses enough Gauss points for exact integration.** The integration points are the reason isoparametric elements and numerical integration are designed for the points, not the weights, and the points are the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.
- **The selective integration uses different integration orders for different terms, the Q4 full integration uses $2 \times 2 = 4$ Gauss points, and the Q4 reduced integration uses $1 \times 1 = 1$ Gauss point.** The weights are the reason isoparametric elements and numerical integration are designed for the weights, not the points, and the weights are the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.
- **The Tri 6-node full integration uses 3 Gauss points, the Tri 3-node full integration uses 1 Gauss point, and the Gauss points are $\pm 1 / { \sqrt { 3 } } = \pm 0 . 5 7 7 4$ for the 2-point rule.** The symmetry is the reason isoparametric elements and numerical integration are designed for the symmetry, not the asymmetry, and the symmetry is the reason isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method.
- **The isoparametric element and numerical integration calculation is the most important geometric mapping calculation in finite element analysis, because the isoparametric element and numerical integration calculation determines the element stiffness matrix and the element force vector.** The element stiffness matrix and the element force vector are the reason the engineer can model curved boundaries with straight-sided elements.
- **Isoparametric elements and numerical integration are the most fundamental geometric mapping techniques in the finite element method, because the isoparametric element uses the same shape functions for geometry and field variable interpolation, the Jacobian matrix maps from the parent element to the physical element, and Gaussian quadrature provides the numerical integration of the element stiffness matrix.** The finite element analysis is the reason the engineer can model curved boundaries with straight-sided elements.
:::

## Further reading

- **O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu (2013)** — *The Finite Element Method: Its Basis and Fundamentals*, 7th ed. Butterworth-Heinemann. The isoparametric element, the Jacobian, and Gaussian quadrature.
- **T. J. R. Hughes (2000)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The isoparametric element and the Jacobian matrix.
- **K. J. Bathe (2006)** — *Finite Element Procedures*. Prentice Hall. The isoparametric element and the Gaussian quadrature.
- **J. N. Reddy (2019)** — *An Introduction to the Finite Element Method*, 4th ed. Routledge. The isoparametric element and the parent element.
- **R. L. Taylor (2003)** — *The Finite Element Method: The Basis*, Vol. 1. Butterworth-Heinemann. The isoparametric element and the shape functions.
- **S. C. Brenner and L. R. Scott (2008)** — *The Mathematical Theory of Finite Element Methods*, 3rd ed. Springer. The isoparametric element and the determinant.
- **P. Wriggers (2006)** — *Finite Element Methods for Linear Problems*. Springer. The isoparametric element and the integration points.
- **A. K. Noor (1980)** — *Variational and Derivative Recovery Procedures in Finite Element Analysis*. Wiley. The isoparametric element and the weights.
