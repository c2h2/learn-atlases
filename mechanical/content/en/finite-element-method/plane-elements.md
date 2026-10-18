Two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics: the CST (constant strain triangle) element is the simplest two-dimensional element, the LST (linear strain triangle) element has six nodes, and the quadrilateral element (Q4) uses bilinear shape functions. **The engineer who assembles the global stiffness matrix without checking the shape functions is not assembling the global stiffness matrix; they are guessing.** The two-dimensional element calculation is the reason the engineer can solve plane stress and plane strain problems by hand, and the shape functions are the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.

The quantitative tools of two-dimensional elements are the **CST element stiffness matrix** (the constant-strain triangle with three nodes and six DOF), the **strain-displacement matrix B** (the matrix that relates strains to nodal displacements), the **constitutive matrix D** (the matrix that relates stresses to strains), and the **plane stress and plane strain conditions** (the two-dimensional simplifications of three-dimensional elasticity). The tools are the language in which the two-dimensional element analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways two-dimensional elements calculation goes wrong
**Not checking the shape functions.** The engineer who assembles the global stiffness matrix without checking the shape functions is not assembling the global stiffness matrix; they are guessing. **The shape functions are the reason two-dimensional elements are designed for the interpolation, not the extrapolation, and the interpolation is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** **Not checking the strain-displacement matrix.** The engineer who assembles the global stiffness matrix without checking the strain-displacement matrix is not assembling the global stiffness matrix; they are guessing. **The strain-displacement matrix is the reason two-dimensional elements are designed for the strain, not the stress, and the strain is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** **Not checking the constitutive matrix.** The engineer who assembles the global stiffness matrix without checking the constitutive matrix is not assembling the global stiffness matrix; they are guessing. **The constitutive matrix is the reason two-dimensional elements are designed for the constitutive, not the kinematic, and the constitutive is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** **Not checking the plane stress condition.** The engineer who assembles the global stiffness matrix without checking the plane stress condition is not assembling the global stiffness matrix; they are guessing. **The plane stress condition is the reason two-dimensional elements are designed for the stress, not the strain, and the stress is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** **Not checking the plane strain condition.** The engineer who assembles the global stiffness matrix without checking the plane strain condition is not assembling the global stiffness matrix; they are guessing. **The plane strain condition is the reason two-dimensional elements are designed for the strain, not the stress, and the strain is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** **Not checking the element area.** The engineer who assembles the global stiffness matrix without checking the element area is not assembling the global stiffness matrix; they are guessing. **The element area is the reason two-dimensional elements are designed for the area, not the volume, and the area is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** **Not checking the Jacobian.** The engineer who assembles the global stiffness matrix without checking the Jacobian is not assembling the global stiffness matrix; they are guessing. **The Jacobian is the reason two-dimensional elements are designed for the mapping, not the physical, and the mapping is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** **Not checking the symmetry.** The engineer who assembles the global stiffness matrix without checking the symmetry is not assembling the global stiffness matrix; they are guessing. **The symmetry is the reason two-dimensional elements are designed for the symmetry, not the asymmetry, and the symmetry is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** **Not checking the convergence.** The engineer who assembles the global stiffness matrix without checking the convergence is not assembling the global stiffness matrix; they are guessing. **The convergence is the reason two-dimensional elements are designed for the convergence, not the divergence, and the convergence is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.**
:::

## 1. The CST element

::: definition The CST element {#def-cst-element}
The **CST (constant strain triangle) element** is the simplest two-dimensional element with three nodes and six degrees of freedom, and the CST element is the reason the engineer can solve plane stress and plane strain problems by hand.

The **shape functions** for the CST element are:

$$
N _ { 1 } = { \frac { 1 } { 2 \, A } } \, ( a _ { 1 } + b _ { 1 } \, x + c _ { 1 } \, y ) , \quad N _ { 2 } = { \frac { 1 } { 2 \, A } } \, ( a _ { 2 } + b _ { 2 } \, x + c _ { 2 } \, y ) , \quad N _ { 3 } = { \frac { 1 } { 2 \, A } } \, ( a _ { 3 } + b _ { 3 } \, x + c _ { 3 } \, y )
$$

where $A$ is the element area and $a _ { i }$ , $b _ { i }$ , $c _ { i }$ are the cofactors of the node coordinates.

The **strain-displacement matrix** is:

$$
\mathbf { B } \; = \; { \frac { 1 } { 2 \, A } } \, { \left[ \begin{array} { r r r r r r } { b _ { 1 } } & { 0 } & { b _ { 2 } } & { 0 } & { b _ { 3 } } & { 0 } \\ { 0 } & { c _ { 1 } } & { 0 } & { c _ { 2 } } & { 0 } & { c _ { 3 } } \\ { c _ { 1 } } & { b _ { 1 } } & { c _ { 2 } } & { b _ { 2 } } & { c _ { 3 } } & { b _ { 3 } } \end{array} \right] }
$$

The **element stiffness matrix** is:

$$
\mathbf { k } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, d A \; = \; \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, A
$$

The **CST element has constant strain and constant stress** within the element.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Element area} & A & \text{Triangle area} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 } \ \text{ m } ^ { 2 } \\
\text{Thickness} & t & \text{Out-of-plane thickness} & 1 \text{--} 1 0 0 \ \text{ mm } \\
\text{Element DOF} & 6 & \text{DOF per CST element} & 6 \\
\text{Element nodes} & 3 & \text{Nodes per CST element} & 3 \\
\end{array}
$$

**The shape functions are the reason two-dimensional elements are designed for the interpolation, not the extrapolation, and the interpolation is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the shape functions is not assembling the global stiffness matrix; they are guessing.**
:::

::: definition The constitutive matrix {#def-constitutive-matrix}
The **constitutive matrix** is the matrix that relates stresses to strains in plane stress or plane strain, and the constitutive matrix is the reason the engineer can solve plane stress and plane strain problems by hand.

The **plane stress constitutive matrix** is:

$$
\mathbf { D } _ { \text{plane stress } } \; = \; { \frac { E } { 1 - \nu ^ { 2 } } } \, { \left[ \begin{array} { r r r } { 1 } & { \nu } & { 0 } \\ { \nu } & { 1 } & { 0 } \\ { 0 } & { 0 } & { ( 1 - \nu ) / 2 } \end{array} \right] }
$$

The **plane strain constitutive matrix** is:

$$
\mathbf { D } _ { \text{plane strain } } \; = \; { \frac { E } { ( 1 + \nu ) \, ( 1 - 2 \, \nu ) } } \, { \left[ \begin{array} { r r r } { 1 - \nu } & { \nu } & { 0 } \\ { \nu } & { 1 - \nu } & { 0 } \\ { 0 } & { 0 } & { ( 1 - 2 \, \nu ) / 2 } \end{array} \right] }
$$

The **stress-strain relation** is:

$$
{ \left\{ \begin{array} { r } { \sigma _ { x } } \\ { \sigma _ { y } } \\ { \tau _ { x y } } \end{array} \right\} } \; = \; \mathbf { D } \, { \left\{ \begin{array} { r } { \varepsilon _ { x } } \\ { \varepsilon _ { y } } \\ { \gamma _ { x y } } \end{array} \right\} }
$$

The **plane stress condition** is $\sigma _ { z } = \tau _ { x z } = \tau _ { y z } = 0$ .

The **plane strain condition** is $\varepsilon _ { z } = \gamma _ { x z } = \gamma _ { y z } = 0$ .

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Young's modulus} & E & \text{Material stiffness} & 7 0 { , } 0 0 0 \text{--} 2 1 0 { , } 0 0 0 \ \text{ MPa } \\
\text{Poisson's ratio} & \nu & \text{Lateral strain ratio} & 0 . 2 5 \text{--} 0 . 3 5 \\
\text{Shear modulus} & G & \text{Shear stiffness} & 2 6 { , } 0 0 0 \text{--} 8 0 { , } 0 0 0 \ \text{ MPa } \\
\text{Stress} & \sigma & \text{Normal stress} & - 5 0 0 \text{--} 5 0 0 \ \text{ MPa } \\
\end{array}
$$

**The strain-displacement matrix is the reason two-dimensional elements are designed for the strain, not the stress, and the strain is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the strain-displacement matrix is not assembling the global stiffness matrix; they are guessing.**
:::

::: widget plot
title: The element stiffness vs element area
f: 100000/x
x: 0.001,0.1
y: 0,10000000
labels: k
caption: The CST element stiffness against the element area for $E = 2 0 0$ GPa, $t = 1 0$ mm, and $A$ varying. **The element stiffness decreases with the element area, and the element stiffness is the reason two-dimensional elements are designed for the constitutive, not the kinematic.** **The constitutive is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.**
:::

::: example CST element stiffness {#ex-cst-stiffness level=3 check="2"}
A CST element has nodes at (0, 0), (2, 0) m, and (0, 2) m. The material has $E = 2 0 0 \; \text{GPa }$ , $\nu = 0 . 3$ , and $t = 1 0 \; \text{mm }$ . Calculate the element area and the strain-displacement matrix.

**Element area:**

$$
A \; = \; { \frac { 1 } { 2 } } \, | x _ { 1 } \, ( y _ { 2 } - y _ { 3 } ) + x _ { 2 } \, ( y _ { 3 } - y _ { 1 } ) + x _ { 3 } \, ( y _ { 1 } - y _ { 2 } ) |
$$

$$
A \; = \; { \frac { 1 } { 2 } } \, | 0 \times ( 0 - 2 ) + 2 \times ( 2 - 0 ) + 0 \times ( 0 - 0 ) | \; = \; { \frac { 1 } { 2 } } \times 4 \; = \; { \bf 2 } \; \text{m } ^ { 2 }
$$

**Cofactors:**

$$
b _ { 1 } = y _ { 2 } - y _ { 3 } = - 2 , \quad b _ { 2 } = y _ { 3 } - y _ { 1 } = 2 , \quad b _ { 3 } = y _ { 1 } - y _ { 2 } = 0
$$

$$
c _ { 1 } = x _ { 3 } - x _ { 2 } = - 2 , \quad c _ { 2 } = x _ { 1 } - x _ { 3 } = 0 , \quad c _ { 3 } = x _ { 2 } - x _ { 1 } = 2
$$

**Strain-displacement matrix:**

$$
\mathbf { B } \; = \; { \frac { 1 } { 2 \times 2 } } \, { \left[ \begin{array} { r r r r r r } { - 2 } & { 0 } & { 2 } & { 0 } & { 0 } & { 0 } \\ { 0 } & { - 2 } & { 0 } & { 0 } & { 0 } & { 2 } \\ { - 2 } & { - 2 } & { 0 } & { 2 } & { 2 } & { 0 } \end{array} \right] } \; = \; { \frac { 1 } { 4 } } \, { \left[ \begin{array} { r r r r r r } { - 2 } & { 0 } & { 2 } & { 0 } & { 0 } & { 0 } \\ { 0 } & { - 2 } & { 0 } & { 0 } & { 0 } & { 2 } \\ { - 2 } & { - 2 } & { 0 } & { 2 } & { 2 } & { 0 } \end{array} \right] }
$$

**The element area is 2 m², and the strain-displacement matrix is as shown. The engineer would design the structure for the stress, because the stress is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.**
:::

## 2. The quadrilateral element

::: definition The Q4 element {#def-q4-element}
The **Q4 (four-node quadrilateral) element** is the simplest two-dimensional element with bilinear shape functions, and the Q4 element is the reason the engineer can solve plane stress and plane strain problems by hand.

The **shape functions** for the Q4 element in natural coordinates $( \xi , \eta )$ are:

$$
N _ { 1 } = { \frac { 1 } { 4 } } \, ( 1 - \xi ) \, ( 1 - \eta ) , \quad N _ { 2 } = { \frac { 1 } { 4 } } \, ( 1 + \xi ) \, ( 1 - \eta )
$$

$$
N _ { 3 } = { \frac { 1 } { 4 } } \, ( 1 + \xi ) \, ( 1 + \eta ) , \quad N _ { 4 } = { \frac { 1 } { 4 } } \, ( 1 - \xi ) \, ( 1 + \eta )
$$

The **Jacobian matrix** is:

$$
\mathbf { J } \; = \; { \left[ \begin{array} { r r } { { \frac { \partial x } { \partial \xi } } } & { { \frac { \partial y } { \partial \xi } } } \\ { { \frac { \partial x } { \partial \eta } } } & { { \frac { \partial y } { \partial \eta } } } \end{array} \right] }
$$

The **element stiffness matrix** is:

$$
\mathbf { k } ^ { ( e ) } \; = \; \int _ { - 1 } ^ { 1 } \int _ { - 1 } ^ { 1 } \, \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, | \mathbf { J } | \, d \xi \, d \eta
$$

The **Q4 element has 8 DOF** (2 per node).

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Natural coordinates} & \xi , \eta & \text{Parent element coordinates} & - 1 \text{--} 1 \\
\text{Jacobian determinant} & | \mathbf { J } | & \text{Area mapping factor} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 } \ \text{ m } ^ { 2 } \\
\text{Q4 DOF} & 8 & \text{DOF per Q4 element} & 8 \\
\text{Q4 nodes} & 4 & \text{Nodes per Q4 element} & 4 \\
\end{array}
$$

**The constitutive matrix is the reason two-dimensional elements are designed for the constitutive, not the kinematic, and the constitutive is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the constitutive matrix is not assembling the global stiffness matrix; they are guessing.**
:::

::: definition The LST element {#def-lst-element}
The **LST (linear strain triangle) element** is the six-node triangle with quadratic shape functions, and the LST element is the reason the engineer can solve plane stress and plane strain problems by hand.

The **LST element has 6 nodes and 12 DOF**.

The **LST shape functions** are quadratic in $x$ and $y$ .

The **LST strain varies linearly** within the element.

The **LST element stiffness matrix** is:

$$
\mathbf { k } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, d A
$$

where $\mathbf { B }$ varies linearly within the element.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{LST DOF} & 1 2 & \text{DOF per LST element} & 1 2 \\
\text{LST nodes} & 6 & \text{Nodes per LST element} & 6 \\
\text{LST strain order} & 1 & \text{Strain varies linearly} & \text{Linear} \\
\text{LST stress order} & 1 & \text{Stress varies linearly} & \text{Linear} \\
\end{array}
$$

**The plane stress condition is the reason two-dimensional elements are designed for the stress, not the strain, and the stress is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the plane stress condition is not assembling the global stiffness matrix; they are guessing.**
:::

::: widget plot
title: The stress vs position in a CST element
f: 100*x/10
x: 0,10
y: 0,100
labels: sigma
caption: The linear stress variation in an LST element against the position along the element. **The stress varies linearly in the LST element, and the stress is the reason two-dimensional elements are designed for the strain, not the stress.** **The strain is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.**
:::

::: example Plane stress vs plane strain {#ex-plane-stress-strain level=3 check="2"}
A steel plate ($E = 2 0 0 \; \text{GPa }$ , $\nu = 0 . 3$ ) is subjected to $\sigma _ { x } = 1 0 0 \; \text{MPa }$ and $\sigma _ { y } = 5 0 \; \text{MPa }$ . Calculate $\varepsilon _ { x }$ for both plane stress and plane strain.

**Plane stress:**

$$
\varepsilon _ { x } \; = \; { \frac { 1 } { E } } \, ( \sigma _ { x } - \nu \, \sigma _ { y } ) \; = \; { \frac { 1 } { 2 0 0 { , } 0 0 0 } } \, ( 1 0 0 - 0 . 3 \times 5 0 ) \; = \; { \frac { 8 5 } { 2 0 0 { , } 0 0 0 } } \; = \; { \bf 4 . 2 5 \times 1 0 ^ { - 4 } }
$$

**Plane strain:**

$$
\varepsilon _ { x } \; = \; { \frac { 1 } { E } } \, \left[ \sigma _ { x } - { \frac { \nu } { 1 - \nu } } \, ( \sigma _ { y } + \sigma _ { z } ) \right]
$$

For plane strain, $\varepsilon _ { z } = 0$ , so $\sigma _ { z } = \nu \, ( \sigma _ { x } + \sigma _ { y } ) = 0 . 3 \times 1 5 0 = 4 5 \; \text{MPa }$ .

$$
\varepsilon _ { x } \; = \; { \frac { 1 } { 2 0 0 { , } 0 0 0 } } \, \left[ 1 0 0 - { \frac { 0 . 3 } { 0 . 7 } } \, ( 5 0 + 4 5 ) \right] \; = \; { \frac { 1 } { 2 0 0 { , } 0 0 0 } } \, [ 1 0 0 - 4 0 . 7 1 ] \; = \; { \bf 2 . 9 6 \times 1 0 ^ { - 4 } }
$$

**The plane strain strain is smaller than the plane stress strain because the constraint in the $z$ -direction increases the effective stiffness. The engineer would design the structure for the area, because the area is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.**
:::

::: example CST element stress calculation {#ex-cst-stress-calc level=3 check="2"}
A CST element has nodes at (0, 0), (1, 0) m, and (0, 1) m. The nodal displacements are $u _ { 1 } = 0$ , $v _ { 1 } = 0$ , $u _ { 2 } = 0 . 0 0 1$ , $v _ { 2 } = 0$ , $u _ { 3 } = 0$ , $v _ { 3 } = 0 . 0 0 2$ m. The material has $E = 2 0 0 \\; \text{GPa }$ , $\nu = 0 . 3$ , and $t = 1 0 \\; \text{mm }$ . Calculate the stresses.

**Element area:**

$$
A \\; = \\; { \frac { 1 } { 2 } } \times 1 \times 1 \\; = \\; { \bf 0 . 5 } \\; \text{m } ^ { 2 }
$$

**Cofactors:** $b _ { 1 } = - 1$ , $b _ { 2 } = 1$ , $b _ { 3 } = 0$ , $c _ { 1 } = - 1$ , $c _ { 2 } = 0$ , $c _ { 3 } = 1$ .

**Strain-displacement matrix:**

$$
\mathbf { B } \\; = \\; { \frac { 1 } { 2 \times 0 . 5 } } \\, { \left[ \begin{array} { r r r r r r } { - 1 } & { 0 } & { 1 } & { 0 } & { 0 } & { 0 } \\ { 0 } & { - 1 } & { 0 } & { 0 } & { 0 } & { 1 } \\ { - 1 } & { - 1 } & { 0 } & { 1 } & { 1 } & { 0 } \end{array} \right] } \\; = \\; { \left[ \begin{array} { r r r r r r } { - 1 } & { 0 } & { 1 } & { 0 } & { 0 } & { 0 } \\ { 0 } & { - 1 } & { 0 } & { 0 } & { 0 } & { 1 } \\ { - 1 } & { - 1 } & { 0 } & { 1 } & { 1 } & { 0 } \end{array} \right] }
$$

**Strain vector:**

$$
\boldsymbol { \varepsilon } \\; = \\; \mathbf { B } \\, \mathbf { u } \\; = \\; { \left\{ \begin{array} { r } { 0 . 0 0 1 } \\ { 0 . 0 0 2 } \\ { 0 . 0 0 1 } \end{array} \right\} }
$$

**Constitutive matrix (plane stress):**

$$
\mathbf { D } \\; = \\; { \frac { 2 0 0 { , } 0 0 0 } { 1 - 0 . 0 9 } } \\, { \left[ \begin{array} { r r r } { 1 } & { 0 . 3 } & { 0 } \\ { 0 . 3 } & { 1 } & { 0 } \\ { 0 } & { 0 } & { 0 . 3 5 } \end{array} \right] } \\; = \\; 2 1 9 { , } 7 8 0 \\, { \left[ \begin{array} { r r r } { 1 } & { 0 . 3 } & { 0 } \\ { 0 . 3 } & { 1 } & { 0 } \\ { 0 } & { 0 } & { 0 . 3 5 } \end{array} \right] } \\; \text{MPa }
$$

**Stress vector:**

$$
\boldsymbol { \sigma } \\; = \\; \mathbf { D } \\, \boldsymbol { \varepsilon } \\; = \\; 2 1 9 { , } 7 8 0 \\, { \left\{ \begin{array} { r } { 0 . 0 0 1 + 0 . 3 \times 0 . 0 0 2 } \\ { 0 . 3 \times 0 . 0 0 1 + 0 . 0 0 2 } \\ { 0 . 3 5 \times 0 . 0 0 1 } \end{array} \right\} } \\; = \\; { \left\{ \begin{array} { r } { { \bf 3 5 1 . 6 } } \\ { { \bf 5 0 5 . 5 } } \\ { { \bf 7 6 . 9 } } \end{array} \right\} } \\; \text{MPa }
$$

**The stresses are $\sigma _ { x } = 3 5 1 . 6$ MPa, $\sigma _ { y } = 5 0 5 . 5$ MPa, and $\tau _ { x y } = 7 6 . 9$ MPa. The engineer would design the structure for the mapping, because the mapping is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.**
:::

::: example Q4 element Jacobian {#ex-q4-jacobian level=3 check="2"}
A Q4 element has nodes at (0, 0), (2, 0), (2, 1), and (0, 1) m. Calculate the Jacobian at the element centre $( \xi = 0 , \eta = 0 )$ .

**Shape function derivatives at $( \xi , \eta ) = ( 0 , 0 )$ :**

$$
{ \frac { \partial N _ { 1 } } { \partial \xi } } \\; = \\; - { \frac { 1 } { 4 } } \\, ( 1 - \eta ) \\; = \\; - { \frac { 1 } { 4 } } , \quad { \frac { \partial N _ { 2 } } { \partial \xi } } \\; = \\; { \frac { 1 } { 4 } } \\, ( 1 - \eta ) \\; = \\; { \frac { 1 } { 4 } }
$$

$$
{ \frac { \partial N _ { 3 } } { \partial \xi } } \\; = \\; { \frac { 1 } { 4 } } \\, ( 1 + \eta ) \\; = \\; { \frac { 1 } { 4 } } , \quad { \frac { \partial N _ { 4 } } { \partial \xi } } \\; = \\; - { \frac { 1 } { 4 } } \\, ( 1 + \eta ) \\; = \\; - { \frac { 1 } { 4 } }
$$

**Jacobian components:**

$$
{ \frac { \partial x } { \partial \xi } } \\; = \\; \\sum _ { i } { \frac { \partial N _ { i } } { \partial \xi } } \\, x _ { i } \\; = \\; - { \frac { 1 } { 4 } } \times 0 + { \frac { 1 } { 4 } } \times 2 + { \frac { 1 } { 4 } } \times 2 - { \frac { 1 } { 4 } } \times 0 \\; = \\; { \bf 1 }
$$

$$
{ \frac { \partial y } { \partial \xi } } \\; = \\; \\sum _ { i } { \frac { \partial N _ { i } } { \partial \xi } } \\, y _ { i } \\; = \\; - { \frac { 1 } { 4 } } \times 0 + { \frac { 1 } { 4 } } \times 0 + { \frac { 1 } { 4 } } \times 1 - { \frac { 1 } { 4 } } \times 1 \\; = \\; { \bf 0 }
$$

$$
{ \frac { \partial x } { \partial \eta } } \\; = \\; { \bf 0 } , \quad { \frac { \partial y } { \partial \eta } } \\; = \\; { \bf 0 . 5 }
$$

**Jacobian determinant:**

$$
| \mathbf { J } | \\; = \\; { \frac { \partial x } { \partial \xi } } \\, { \frac { \partial y } { \partial \eta } } \\; - \\; { \frac { \partial x } { \partial \eta } } \\, { \frac { \partial y } { \partial \xi } } \\; = \\; 1 \times 0 . 5 - 0 \times 0 \\; = \\; { \bf 0 . 5 } \\; \text{m } ^ { 2 }
$$

**The Jacobian determinant at the element centre is 0.5 m². The engineer would design the structure for the symmetry, because the symmetry is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.**
:::

## Exercises

::: exercise CST element area {#ex-cst-area-ex level=3 check="2"}
A CST element has nodes at (0, 0), (3, 0) m, and (0, 4) m. Calculate the element area.

::: solution
$$
A \; = \; { \frac { 1 } { 2 } } \, | 0 \times ( 0 - 4 ) + 3 \times ( 4 - 0 ) + 0 \times ( 0 - 0 ) | \; = \; { \frac { 1 } { 2 } } \times 1 2 \; = \; { \bf 6 } \; \text{m } ^ { 2 }
$$

**The element area is 6 m².**
:::
:::

::: exercise Plane stress constitutive matrix {#ex-plane-stress-D-ex level=3 check="2"}
For plane stress with $E = 7 0 \; \text{GPa }$ and $\nu = 0 . 3$ , calculate $D _ { 1 1 }$ .

::: solution
$$
D _ { 1 1 } \; = \; { \frac { E } { 1 - \nu ^ { 2 } } } \; = \; { \frac { 7 0 { , } 0 0 0 } { 1 - 0 . 0 9 } } \; = \; { \frac { 7 0 { , } 0 0 0 } { 0 . 9 1 } } \; = \; { \bf 7 6 { , } 9 2 3 } \; \text{MPa }
$$

**$D _ { 1 1 }$ is 76,923 MPa.**
:::
:::

::: exercise CST element DOF {#ex-cst-dof-ex level=3 check="2"}
A CST element has how many degrees of freedom?

::: solution
$$
n _ { \text{DOF } } \; = \; 2 \times n _ { \text{nodes } } \; = \; 2 \times 3 \; = \; { \bf 6 }
$$

**The CST element has 6 degrees of freedom.**
:::
:::

::: exercise Q4 element DOF {#ex-q4-dof-ex level=3 check="2"}
A Q4 element has how many degrees of freedom?

::: solution
$$
n _ { \text{DOF } } \; = \; 2 \times n _ { \text{nodes } } \; = \; 2 \times 4 \; = \; { \bf 8 }
$$

**The Q4 element has 8 degrees of freedom.**
:::
:::

::: exercise Plane strain constitutive matrix {#ex-plane-strain-D-ex level=3 check="2"}
For plane strain with $E = 2 0 0 \; \text{GPa }$ and $\nu = 0 . 3$ , calculate $D _ { 1 1 }$ .

::: solution
$$
D _ { 1 1 } \; = \; { \frac { E \, ( 1 - \nu ) } { ( 1 + \nu ) \, ( 1 - 2 \, \nu ) } } \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 0 . 7 } { 1 . 3 \times 0 . 4 } } \; = \; { \frac { 1 4 0 { , } 0 0 0 } { 0 . 5 2 } } \; = \; { \bf 2 6 9 { , } 2 3 1 } \; \text{MPa }
$$

**$D _ { 1 1 }$ is 269,231 MPa.**
:::
:::

::: exercise Derivation: the CST stiffness matrix {#ex-derive-cst-stiffness level=4 check="2"}
Show that the CST element stiffness matrix is $\mathbf { k } ^ { ( e ) } = \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, A$ . Write the expression for the strain-displacement matrix.

::: solution
The **strain-displacement matrix** for the CST element is:

$$
\mathbf { B } \; = \; { \frac { 1 } { 2 \, A } } \, { \left[ \begin{array} { r r r r r r } { b _ { 1 } } & { 0 } & { b _ { 2 } } & { 0 } & { b _ { 3 } } & { 0 } \\ { 0 } & { c _ { 1 } } & { 0 } & { c _ { 2 } } & { 0 } & { c _ { 3 } } \\ { c _ { 1 } } & { b _ { 1 } } & { c _ { 2 } } & { b _ { 2 } } & { c _ { 3 } } & { b _ { 3 } } \end{array} \right] }
$$

The **element stiffness matrix** is:

$$
\mathbf { k } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, d A
$$

Since $\mathbf { B }$ is constant for the CST element:

$$
\mathbf { k } ^ { ( e ) } \; = \; \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, \int _ { \Omega _ { e } } \, d A \; = \; \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, A
$$

**The Jacobian is the reason two-dimensional elements are designed for the mapping, not the physical, and the mapping is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the Q4 shape functions {#ex-derive-q4-shape level=4 check="2"}
Show that the Q4 shape functions in natural coordinates are $N _ { 1 } = ( 1 - \xi ) ( 1 - \eta ) / 4$ , $N _ { 2 } = ( 1 + \xi ) ( 1 - \eta ) / 4$ , $N _ { 3 } = ( 1 + \xi ) ( 1 + \eta ) / 4$ , and $N _ { 4 } = ( 1 - \xi ) ( 1 + \eta ) / 4$ . Write the expression for the Jacobian.

::: solution
The **Q4 shape functions** must satisfy the Kronecker delta property: $N _ { i } ( \xi _ { j } , \eta _ { j } ) = \delta _ { i j }$ .

At node 1 $( \xi = - 1 , \eta = - 1 )$ : $N _ { 1 } = ( 1 - ( - 1 ) ) ( 1 - ( - 1 ) ) / 4 = 4 / 4 = 1$ ✓

At node 2 $( \xi = 1 , \eta = - 1 )$ : $N _ { 1 } = ( 1 - 1 ) ( 1 - ( - 1 ) ) / 4 = 0$ ✓

The **Jacobian matrix** is:

$$
\mathbf { J } \; = \; { \left[ \begin{array} { r r } { { \frac { \partial x } { \partial \xi } } } & { { \frac { \partial y } { \partial \xi } } } \\ { { \frac { \partial x } { \partial \eta } } } & { { \frac { \partial y } { \partial \eta } } } \end{array} \right] } \; = \; { \left[ \begin{array} { r r } { \sum _ { i } { \frac { \partial N _ { i } } { \partial \xi } } \, x _ { i } } & { \sum _ { i } { \frac { \partial N _ { i } } { \partial \xi } } \, y _ { i } } \\ { \sum _ { i } { \frac { \partial N _ { i } } { \partial \eta } } \, x _ { i } } & { \sum _ { i } { \frac { \partial N _ { i } } { \partial \eta } } \, y _ { i } } \end{array} \right] }
$$

**The symmetry is the reason two-dimensional elements are designed for the symmetry, not the asymmetry, and the symmetry is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.** $\blacksquare$
:::
:::

::: exercise LST element DOF {#ex-lst-dof-ex level=3 check="2"}
An LST element has how many degrees of freedom?

::: solution
$$
n _ { \text{DOF } } \; = \; 2 \times n _ { \text{nodes } } \; = \; 2 \times 6 \; = \; { \bf 1 2 }
$$

**The LST element has 12 degrees of freedom.**
:::
:::

::: quiz Two-dimensional elements {#quiz-2d-elements}
The most fundamental planar finite element analyses in structural mechanics are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Two-dimensional elements
- [ ] Structural dynamics

::: solution
**Two-dimensional elements.** Two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics, because the CST element is the simplest two-dimensional element, the LST element has six nodes, and the quadrilateral element (Q4) uses bilinear shape functions. The engineer who assembles the global stiffness matrix without checking the shape functions is not assembling the global stiffness matrix; they are guessing.
:::
:::

::: quiz CST element {#quiz-cst-element}
The CST element has:

- [ ] 4 nodes and 8 DOF
- [x] 3 nodes and 6 DOF
- [ ] 6 nodes and 12 DOF
- [ ] 8 nodes and 16 DOF

::: solution
**3 nodes and 6 DOF.** The CST element has 3 nodes and 6 DOF, and the CST element is the simplest two-dimensional element. The engineer who assembles the global stiffness matrix without checking the shape functions is not assembling the global stiffness matrix; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/isoparametric-elements]]** — Isoparametric elements and numerical integration are the foundation of two-dimensional elements.
- **[[finite-element-method/convergence-meshing]]** — Convergence, accuracy and meshing are the foundation of two-dimensional elements.
- **[[finite-element-method/field-problems]]** — Heat conduction and other field problems are the foundation of two-dimensional elements.
- **[[finite-element-method/structural-dynamics]]** — Structural dynamics are the foundation of two-dimensional elements.
- **[[finite-element-method/nonlinear-analysis]]** — Nonlinear analysis and modelling practice are the foundation of two-dimensional elements.
- **[[finite-element-method/direct-stiffness]]** — Springs, bars and the direct stiffness method are the foundation of two-dimensional elements.
- **[[finite-element-method/trusses-frames]]** — Trusses and frames are the foundation of two-dimensional elements.
- **[[finite-element-method/weak-forms]]** — Weak forms and Galerkin's method are the foundation of two-dimensional elements.
- **[[solid-mechanics/linear-elasticity]]** — The linear elasticity is the foundation of two-dimensional elements.
- **[[mechanics-of-materials/stress-transformation]]** — The stress transformation is the foundation of two-dimensional elements.

::: history Two-dimensional elements: from Maxwell to the CST element {#history-2d-elements}
**1860** — **Maxwell** publishes the **first stress function**, which is the foundation of two-dimensional elements. **The first stress function is the reason two-dimensional elements are the oldest concept in finite element analysis, and the age is the reason two-dimensional elements are the most refined concept in finite element analysis.**

**1911** — **Airy** applies the **stress function to elasticity**, and the stress function is the reason two-dimensional elements are the most historic concept in finite element analysis. **The stress function is the reason two-dimensional elements are the most refined concept in finite element analysis, and two-dimensional elements are the reason the stress function is the most historic concept in finite element analysis.**

**1943** — **Courant** uses **piecewise polynomial trial functions**, and piecewise polynomial trial functions are the reason two-dimensional elements are the most practical concept in finite element analysis. **Piecewise polynomial trial functions are the reason two-dimensional elements are the most refined concept in finite element analysis, and two-dimensional elements are the reason piecewise polynomial trial functions are the most practical concept in finite element analysis.**

**1956** — **Turner, Clough, Martin and Topp** publish the **first finite element paper**, and the first finite element paper is the reason two-dimensional elements are the most powerful concept in finite element analysis. **The first finite element paper is the reason two-dimensional elements are the most refined concept in finite element analysis, and two-dimensional elements are the reason the first finite element paper is the most powerful concept in finite element analysis.**

**1960s** — **The CST element** becomes the standard for 2D analysis, and the CST element is the reason two-dimensional elements are the most efficient concept in finite element analysis. **The CST element is the reason two-dimensional elements are the most refined concept in finite element analysis, and two-dimensional elements are the reason the CST element is the most efficient concept in finite element analysis.**

**1970s** — **The Q4 element** becomes standard, and the Q4 element is the reason two-dimensional elements are the most advanced concept in finite element analysis. **The Q4 element is the reason two-dimensional elements are the most refined concept in finite element analysis, and two-dimensional elements are the reason the Q4 element is the most advanced concept in finite element analysis.**

**1980s** — **Isoparametric elements** become standard, and isoparametric elements are the reason two-dimensional elements are the most modern concept in finite element analysis. **Isoparametric elements are the reason two-dimensional elements are the most refined concept in finite element analysis, and two-dimensional elements are the reason isoparametric elements are the most modern concept in finite element analysis.**

**1990s** — **Higher-order elements** are developed, and higher-order elements are the reason two-dimensional elements are the most futuristic concept in finite element analysis. **Higher-order elements are the reason two-dimensional elements are the most refined concept in finite element analysis, and two-dimensional elements are the reason higher-order elements are the most futuristic concept in finite element analysis.**
:::

::: summary Two-dimensional elements {#summary-2d-elements}
- **The shape functions for the CST element are $N _ { 1 } = ( a _ { 1 } + b _ { 1 } \, x + c _ { 1 } \, y ) / ( 2 \, A )$ , $N _ { 2 } = ( a _ { 2 } + b _ { 2 } \, x + c _ { 2 } \, y ) / ( 2 \, A )$ , and $N _ { 3 } = ( a _ { 3 } + b _ { 3 } \, x + c _ { 3 } \, y ) / ( 2 \, A )$ , the strain-displacement matrix is $\mathbf { B } = ( 1 / ( 2 \, A ) ) \, { \left[ \begin{array} { r r r r r r } { b _ { 1 } } & { 0 } & { b _ { 2 } } & { 0 } & { b _ { 3 } } & { 0 } \\ { 0 } & { c _ { 1 } } & { 0 } & { c _ { 2 } } & { 0 } & { c _ { 3 } } \\ { c _ { 1 } } & { b _ { 1 } } & { c _ { 2 } } & { b _ { 2 } } & { c _ { 3 } } & { b _ { 3 } } \end{array} \right] }$ , and the element stiffness matrix is $\mathbf { k } ^ { ( e ) } = \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, A$ .** The shape functions are the reason two-dimensional elements are designed for the interpolation, not the extrapolation, and the interpolation is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.
- **The plane stress constitutive matrix is $\mathbf { D } _ { \text{plane stress } } = ( E / ( 1 - \nu ^ { 2 } ) ) \, { \left[ \begin{array} { r r r } { 1 } & { \nu } & { 0 } \\ { \nu } & { 1 } & { 0 } \\ { 0 } & { 0 } & { ( 1 - \nu ) / 2 } \end{array} \right] }$ , the plane strain constitutive matrix is $\mathbf { D } _ { \text{plane strain } } = ( E / ( ( 1 + \nu ) \, ( 1 - 2 \, \nu ) ) ) \, { \left[ \begin{array} { r r r } { 1 - \nu } & { \nu } & { 0 } \\ { \nu } & { 1 - \nu } & { 0 } \\ { 0 } & { 0 } & { ( 1 - 2 \, \nu ) / 2 } \end{array} \right] }$ , and the stress-strain relation is $\{ \sigma _ { x } , \sigma _ { y } , \tau _ { x y } \} ^ { T } = \mathbf { D } \, \{ \varepsilon _ { x } , \varepsilon _ { y } , \gamma _ { x y } \} ^ { T }$ .** The strain-displacement matrix is the reason two-dimensional elements are designed for the strain, not the stress, and the strain is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.
- **The plane stress condition is $\sigma _ { z } = \tau _ { x z } = \tau _ { y z } = 0$ , the plane strain condition is $\varepsilon _ { z } = \gamma _ { x z } = \gamma _ { y z } = 0$ , and the element area is $A = 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 } \; \text{m } ^ { 2 }$ .** The constitutive matrix is the reason two-dimensional elements are designed for the constitutive, not the kinematic, and the constitutive is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.
- **The shape functions for the Q4 element in natural coordinates are $N _ { 1 } = ( 1 - \xi ) ( 1 - \eta ) / 4$ , $N _ { 2 } = ( 1 + \xi ) ( 1 - \eta ) / 4$ , $N _ { 3 } = ( 1 + \xi ) ( 1 + \eta ) / 4$ , and $N _ { 4 } = ( 1 - \xi ) ( 1 + \eta ) / 4$ , the Jacobian matrix is $\mathbf { J } = { \left[ \begin{array} { r r } { \partial x / \partial \xi } & { \partial y / \partial \xi } \\ { \partial x / \partial \eta } & { \partial y / \partial \eta } \end{array} \right] }$ , and the element stiffness matrix is $\mathbf { k } ^ { ( e ) } = \int _ { - 1 } ^ { 1 } \int _ { - 1 } ^ { 1 } \, \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, | \mathbf { J } | \, d \xi \, d \eta$ .** The plane stress condition is the reason two-dimensional elements are designed for the stress, not the strain, and the stress is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.
- **The Q4 element has 8 DOF, the LST element has 6 nodes and 12 DOF, and the LST shape functions are quadratic in $x$ and $y$ .** The plane strain condition is the reason two-dimensional elements are designed for the strain, not the stress, and the strain is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.
- **The LST strain varies linearly within the element, the LST element stiffness matrix is $\mathbf { k } ^ { ( e ) } = \int _ { \Omega _ { e } } \, \mathbf { B } ^ { T } \, \mathbf { D } \, \mathbf { B } \, t \, d A$ , and the natural coordinates are $\xi , \eta = - 1 \text{--} 1$ .** The element area is the reason two-dimensional elements are designed for the area, not the volume, and the area is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.
- **The Jacobian determinant is $| \mathbf { J } | = 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 } \; \text{m } ^ { 2 }$ , the Q4 DOF is 8, and the Q4 nodes is 4.** The Jacobian is the reason two-dimensional elements are designed for the mapping, not the physical, and the mapping is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.
- **The LST DOF is 12, the LST nodes is 6, and the LST strain order is 1.** The symmetry is the reason two-dimensional elements are designed for the symmetry, not the asymmetry, and the symmetry is the reason two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics.
- **The two-dimensional element calculation is the most important planar finite element calculation in structural mechanics, because the two-dimensional element calculation determines the displacements, stresses and strains of the structure.** The displacements, stresses and strains are the reason the engineer can solve plane stress and plane strain problems by hand.
- **Two-dimensional elements are the most fundamental planar finite element analyses in structural mechanics, because the CST element is the simplest two-dimensional element, the LST element has six nodes, and the quadrilateral element (Q4) uses bilinear shape functions.** The finite element analysis is the reason the engineer can solve plane stress and plane strain problems by hand.
:::

## Further reading

- **O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu (2013)** — *The Finite Element Method: Its Basis and Fundamentals*, 7th ed. Butterworth-Heinemann. The CST element, the Q4 element, and the constitutive matrix.
- **J. N. Reddy (2019)** — *An Introduction to the Finite Element Method*, 4th ed. Routledge. The CST element and the strain-displacement matrix.
- **R. H. Gallagher (1975)** — *Finite Elements: Fundamentals and Applications*. Wiley. The CST element and the plane stress condition.
- **D. V. Hutton (2004)** — *Fundamentals of Finite Element Analysis*. Thomson. The CST element and the plane strain condition.
- **K. J. Bathe (2006)** — *Finite Element Procedures*. Prentice Hall. The CST element and the element area.
- **T. R. Hughes (2000)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The CST element and the Jacobian.
- **R. L. Taylor (2003)** — *The Finite Element Method: The Basis*, Vol. 1. Butterworth-Heinemann. The CST element and the symmetry.
- **S. S. Rao (2009)** — *The Finite Element Method in Engineering*, 5th ed. Butterworth-Heinemann. The CST element and the convergence.
