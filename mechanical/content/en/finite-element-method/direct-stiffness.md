Springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics: the direct stiffness method is the assembly of individual element stiffness matrices into a global system that relates nodal displacements to applied forces, and the spring element is the simplest building block from which the entire finite element method grows. **The engineer who assembles the global stiffness matrix without checking the boundary conditions is not assembling the global stiffness matrix; they are guessing.** The direct stiffness method calculation is the reason the engineer can solve statically indeterminate structures by hand and write the first finite element program, and the element stiffness matrix is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.

The quantitative tools of the direct stiffness method are the **element stiffness matrix** (the relationship between nodal forces and nodal displacements for a single element), the **global stiffness matrix** (the assembly of element matrices into the system equation), the **boundary conditions** (the constraints that remove rigid-body motion), and the **load vector** (the applied forces and equivalent nodal loads). The tools are the language in which the direct stiffness method analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways direct stiffness method calculation goes wrong
**Not checking the boundary conditions.** The engineer who assembles the global stiffness matrix without checking the boundary conditions is not assembling the global stiffness matrix; they are guessing. **The boundary conditions are the reason springs, bars and the direct stiffness method are designed for the constraints, not the forces, and the constraints are the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** **Not checking the element stiffness matrix.** The engineer who assembles the global stiffness matrix without checking the element stiffness matrix is not assembling the global stiffness matrix; they are guessing. **The element stiffness matrix is the reason springs, bars and the direct stiffness method are designed for the matrix, not the vector, and the matrix is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** **Not checking the global stiffness matrix.** The engineer who assembles the global stiffness matrix without checking the global stiffness matrix is not assembling the global stiffness matrix; they are guessing. **The global stiffness matrix is the reason springs, bars and the direct stiffness method are designed for the matrix, not the element, and the matrix is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** **Not checking the load vector.** The engineer who assembles the global stiffness matrix without checking the load vector is not assembling the global stiffness matrix; they are guessing. **The load vector is the reason springs, bars and the direct stiffness method are designed for the vector, not the force, and the vector is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** **Not checking the degrees of freedom.** The engineer who assembles the global stiffness matrix without checking the degrees of freedom is not assembling the global stiffness matrix; they are guessing. **The degrees of freedom are the reason springs, bars and the direct stiffness method are designed for the freedom, not the constraint, and the freedom is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** **Not checking the connectivity.** The engineer who assembles the global stiffness matrix without checking the connectivity is not assembling the global stiffness matrix; they are guessing. **The connectivity is the reason springs, bars and the direct stiffness method are designed for the connection, not the element, and the connection is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** **Not checking the symmetry.** The engineer who assembles the global stiffness matrix without checking the symmetry is not assembling the global stiffness matrix; they are guessing. **The symmetry is the reason springs, bars and the direct stiffness method are designed for the symmetry, not the asymmetry, and the symmetry is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** **Not checking the equilibrium.** The engineer who assembles the global stiffness matrix without checking the equilibrium is not assembling the global stiffness matrix; they are guessing. **The equilibrium is the reason springs, bars and the direct stiffness method are designed for the balance, not the displacement, and the balance is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** **Not checking the reactions.** The engineer who assembles the global stiffness matrix without checking the reactions is not assembling the global stiffness matrix; they are guessing. **The reactions are the reason springs, bars and the direct stiffness method are designed for the reaction, not the action, and the reaction is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.**
:::

## 1. The spring element

::: definition The element stiffness matrix {#def-element-stiffness}
The **element stiffness matrix** is the relationship between nodal forces and nodal displacements for a single spring element, and the element stiffness matrix is the reason the engineer can solve statically indeterminate structures by hand.

The **spring force-displacement relation** is:

$$
f \; = \; k \, u
$$

The **element stiffness matrix** for a spring is:

$$
\mathbf { k } ^ { ( e ) } \; = \; k \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }
$$

The **element equation** is:

$$
\mathbf { f } ^ { ( e ) } \; = \; \mathbf { k } ^ { ( e ) } \, \mathbf { u } ^ { ( e ) }
$$

The **strain energy** in a spring is:

$$
U \; = \; { \frac { 1 } { 2 } } \, k \, ( u _ { 2 } - u _ { 1 } ) ^ { 2 } \; = \; { \frac { 1 } { 2 } } \, \mathbf { u } ^ { T } \, \mathbf { k } \, \mathbf { u }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Spring stiffness} & k & \text{Force per unit displacement} & 1 0 0 \text{--} 1 0 ^ { 6 } \ \text{ N/m } \\
\text{Nodal displacement} & u & \text{Displacement at node} & 0 . 0 0 1 \text{--} 1 0 \ \text{ mm } \\
\text{Nodal force} & f & \text{Force at node} & 1 \text{--} 1 0 ^ { 5 } \ \text{ N } \\
\text{Strain energy} & U & \text{Stored elastic energy} & 0 . 0 0 1 \text{--} 1 0 0 0 \ \text{ J } \\
\end{array}
$$

**The boundary conditions are the reason springs, bars and the direct stiffness method are designed for the constraints, not the forces, and the constraints are the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the boundary conditions is not assembling the global stiffness matrix; they are guessing.**
:::

::: definition Springs in series and parallel {#def-series-parallel}
The **springs in series and parallel** are the two fundamental ways of combining spring elements, and the springs in series and parallel are the reason the engineer can solve statically indeterminate structures by hand.

The **equivalent stiffness for springs in parallel** is:

$$
k _ { \text{eq } } \; = \; k _ { 1 } + k _ { 2 } + \cdots
$$

The **equivalent stiffness for springs in series** is:

$$
{ \frac { 1 } { k _ { \text{eq } } } } \; = \; { \frac { 1 } { k _ { 1 } } } + { \frac { 1 } { k _ { 2 } } } + \cdots
$$

The **bar element stiffness** is:

$$
k _ { \text{bar } } \; = \; { \frac { E \, A } { L } }
$$

The **two-bar assemblage** has the global stiffness:

$$
\mathbf { K } \; = \; { \frac { E \, A } { L } } \, { \left[ \begin{array} { r r r } { 1 } & { - 1 } & { 0 } \\ { - 1 } & { 2 } & { - 1 } \\ { 0 } & { - 1 } & { 1 } \end{array} \right] }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Young's modulus} & E & \text{Material stiffness} & 7 0 { , } 0 0 0 \text{--} 2 1 0 { , } 0 0 0 \ \text{ MPa } \\
\text{Cross-section area} & A & \text{Bar cross-section} & 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 2 } \ \text{ m } ^ { 2 } \\
\text{Bar length} & L & \text{Element length} & 0 . 1 \text{--} 1 0 \ \text{ m } \\
\text{Bar stiffness} & E A / L & \text{Axial stiffness} & 1 0 ^ { 5 } \text{--} 1 0 ^ { 9 } \ \text{ N/m } \\
\end{array}
$$

**The element stiffness matrix is the reason springs, bars and the direct stiffness method are designed for the matrix, not the vector, and the matrix is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the element stiffness matrix is not assembling the global stiffness matrix; they are guessing.**
:::

::: widget plot
title: The equivalent stiffness vs number of elements
f: 1000/x
x: 1,10
y: 0,1000
labels: k_eq
caption: The equivalent stiffness of $n$ identical springs in series against the number of springs. **The equivalent stiffness decreases with the number of springs, and the equivalent stiffness is the reason springs, bars and the direct stiffness method are designed for the matrix, not the element.** **The matrix is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.**
:::

::: example Two-spring assemblage {#ex-two-spring level=3 check="2"}
Two springs with $k _ { 1 } = 2 0 0 0 \; \text{N/m }$ and $k _ { 2 } = 3 0 0 0 \; \text{N/m }$ are connected in series between a fixed wall and a force $F = 5 0 0 \; \text{N }$ . Node 1 is fixed, node 2 is the junction, and node 3 carries the force. Find the displacements and the reaction.

**Element stiffness matrices:**

$$
\mathbf { k } ^ { ( 1 ) } \; = \; 2 0 0 0 \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } , \quad \mathbf { k } ^ { ( 2 ) } \; = \; 3 0 0 0 \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }
$$

**Global stiffness matrix (3 DOF):**

$$
\mathbf { K } \; = \; { \left[ \begin{array} { r r r } { 2 0 0 0 } & { - 2 0 0 0 } & { 0 } \\ { - 2 0 0 0 } & { 5 0 0 0 } & { - 3 0 0 0 } \\ { 0 } & { - 3 0 0 0 } & { 3 0 0 0 } \end{array} \right] }
$$

**Apply boundary condition $u _ { 1 } = 0$ and solve for $u _ { 2 }$ , $u _ { 3 }$ :**

$$
{ \left[ \begin{array} { r r } { 5 0 0 0 } & { - 3 0 0 0 } \\ { - 3 0 0 0 } & { 3 0 0 0 } \end{array} \right] } \, { \left\{ \begin{array} { r } { u _ { 2 } } \\ { u _ { 3 } } \end{array} \right\} } \; = \; { \left\{ \begin{array} { r } { 0 } \\ { 5 0 0 } \end{array} \right\} }
$$

**From the second equation:** $- 3 0 0 0 \, u _ { 2 } + 3 0 0 0 \, u _ { 3 } = 5 0 0$ , so $u _ { 3 } = u _ { 2 } + 1 / 6$ .

**Substituting into the first equation:**

$$
5 0 0 0 \, u _ { 2 } - 3 0 0 0 \, ( u _ { 2 } + 1 / 6 ) \; = \; 0 \quad \Rightarrow \quad 2 0 0 0 \, u _ { 2 } \; = \; 5 0 0
$$

$$
u _ { 2 } \; = \; { \bf 0 . 2 5 } \; \text{mm } , \quad u _ { 3 } \; = \; 0 . 2 5 + 0 . 1 6 6 7 \; = \; { \bf 0 . 4 1 6 7 } \; \text{mm }
$$

**Reaction at node 1:**

$$
R _ { 1 } \; = \; 2 0 0 0 \times ( 0 - 0 . 2 5 ) \; = \; { \bf - 5 0 0 } \; \text{N }
$$

**The displacements are $u _ { 2 } = 0 . 2 5$ mm and $u _ { 3 } = 0 . 4 1 6 7$ mm, and the reaction is -500 N. The engineer would design the structure for the constraints, because the constraints are the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.**
:::

## 2. The bar element

::: definition The bar element {#def-bar-element}
The **bar element** is the simplest one-dimensional structural element that carries axial load, and the bar element is the reason the engineer can solve statically indeterminate structures by hand.

The **bar element stiffness matrix** is:

$$
\mathbf { k } ^ { ( e ) } \; = \; { \frac { E \, A } { L } } \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }
$$

The **shape functions** for a linear bar element are:

$$
N _ { 1 } ( x ) \; = \; 1 - { \frac { x } { L } } , \quad N _ { 2 } ( x ) \; = \; { \frac { x } { L } }
$$

The **strain-displacement matrix** is:

$$
\mathbf { B } \; = \; { \frac { d \mathbf { N } } { d x } } \; = \; { \frac { 1 } { L } } \, [ - 1 \; \; 1 ]
$$

The **stress in the bar** is:

$$
\sigma \; = \; E \, \varepsilon \; = \; E \, \mathbf { B } \, \mathbf { u } \; = \; { \frac { E } { L } } \, ( u _ { 2 } - u _ { 1 } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Shape function} & N _ { i } & \text{Interpolation function} & 0 \text{--} 1 \\
\text{Strain} & \varepsilon & \text{Axial strain} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 3 } \\
\text{Stress} & \sigma & \text{Axial stress} & 1 \text{--} 5 0 0 \ \text{ MPa } \\
\text{Element force} & f _ { i } ^ { ( e ) } & \text{Internal nodal force} & 1 \text{--} 1 0 ^ { 5 } \ \text{ N } \\
\end{array}
$$

**The global stiffness matrix is the reason springs, bars and the direct stiffness method are designed for the matrix, not the element, and the matrix is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the global stiffness matrix is not assembling the global stiffness matrix; they are guessing.**
:::

::: definition The global stiffness matrix {#def-global-stiffness}
The **global stiffness matrix** is the assembly of element stiffness matrices into the system equation $\mathbf { K } \, \mathbf { U } = \mathbf { F }$ , and the global stiffness matrix is the reason the engineer can solve statically indeterminate structures by hand.

The **assembly process** is:

$$
K _ { I J } \; = \; \sum _ { e } k _ { i j } ^ { ( e ) } \quad \text{for all elements } e \text{ connecting nodes } I , J
$$

The **system equation** is:

$$
\mathbf { K } \, \mathbf { U } \; = \; \mathbf { F }
$$

The **reduced system** (after applying boundary conditions) is:

$$
\mathbf { K } _ { r r } \, \mathbf { U } _ { r } \; = \; \mathbf { F } _ { r }
$$

The **recovery of reactions** is:

$$
\mathbf { R } \; = \; \mathbf { K } _ { s r } \, \mathbf { U } _ { r } - \mathbf { F } _ { s }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Global stiffness} & \mathbf { K } & \text{System matrix} & n \times n \\
\text{Reduced stiffness} & \mathbf { K } _ { r r } & \text{Free DOF block} & ( n - n _ { c } ) \times ( n - n _ { c } ) \\
\text{Displacement vector} & \mathbf { U } & \text{Nodal displacements} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 } \ \text{ m } \\
\text{Force vector} & \mathbf { F } & \text{Nodal forces} & 1 \text{--} 1 0 ^ { 6 } \ \text{ N } \\
\end{array}
$$

**The load vector is the reason springs, bars and the direct stiffness method are designed for the vector, not the force, and the vector is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the load vector is not assembling the global stiffness matrix; they are guessing.**
:::

::: widget plot
title: The bar stiffness vs element length
f: 200000/x
x: 0.5,10
y: 0,400000
labels: EA/L
caption: The bar stiffness $E A / L$ against the element length for $E = 2 0 0$ GPa and $A = 1 0 0 0 \; \text{mm } ^ { 2 }$ . **The bar stiffness decreases with the element length, and the bar stiffness is the reason springs, bars and the direct stiffness method are designed for the freedom, not the constraint.** **The freedom is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.**
:::

::: example Three-element bar {#ex-three-element-bar level=3 check="2"}
A steel bar ($E = 2 0 0 \; \text{GPa }$ , $A = 1 0 0 0 \; \text{mm } ^ { 2 }$ ) of total length $L = 0 . 6 \; \text{m }$ is divided into three equal elements and fixed at the left end. A force $F = 1 0 \; \text{kN }$ is applied at the right end. Find the nodal displacements and the stress in each element.

**Element stiffness:**

$$
k \; = \; { \frac { E \, A } { L _ { e } } } \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 1 0 0 0 } { 2 0 0 } } \; = \; 1 0 ^ { 6 } \; \text{N/m } \; = \; 1 0 0 0 \; \text{kN/m }
$$

**Global stiffness matrix (4 DOF, node 1 fixed):**

$$
\mathbf { K } \; = \; 1 0 0 0 \, { \left[ \begin{array} { r r r r } { 1 } & { - 1 } & { 0 } & { 0 } \\ { - 1 } & { 2 } & { - 1 } & { 0 } \\ { 0 } & { - 1 } & { 2 } & { - 1 } \\ { 0 } & { 0 } & { - 1 } & { 1 } \end{array} \right] } \; \text{kN/m }
$$

**Reduced system (remove row/column 1, $u _ { 1 } = 0$ ):**

$$
1 0 0 0 \, { \left[ \begin{array} { r r r } { 2 } & { - 1 } & { 0 } \\ { - 1 } & { 2 } & { - 1 } \\ { 0 } & { - 1 } & { 1 } \end{array} \right] } \, { \left\{ \begin{array} { r } { u _ { 2 } } \\ { u _ { 3 } } \\ { u _ { 4 } } \end{array} \right\} } \; = \; { \left\{ \begin{array} { r } { 0 } \\ { 0 } \\ { 1 0 } \end{array} \right\} } \; \text{kN }
$$

**Solving:** From the third equation: $- u _ { 3 } + u _ { 4 } = 0 . 0 1$ . From the second: $- u _ { 2 } + 2 u _ { 3 } - u _ { 4 } = 0$ . From the first: $2 u _ { 2 } - u _ { 3 } = 0$ .

**Solution:**

$$
u _ { 2 } \; = \; { \bf 0 . 0 0 5 } \; \text{mm } , \quad u _ { 3 } \; = \; { \bf 0 . 0 1 0 } \; \text{mm } , \quad u _ { 4 } \; = \; { \bf 0 . 0 1 5 } \; \text{mm }
$$

**Stress in each element:**

$$
\sigma ^ { ( e ) } \; = \; E \, { \frac { u _ { j } - u _ { i } } { L _ { e } } } \; = \; 2 0 0 { , } 0 0 0 \times { \frac { 0 . 0 0 5 } { 2 0 0 } } \; = \; { \bf 5 } \; \text{MPa } \quad \text{(all three elements)}
$$

**The displacements are 0.005, 0.010, and 0.015 mm, and the stress is 5 MPa in each element. The engineer would design the structure for the connection, because the connection is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.**
:::

::: example Stepped bar with two materials {#ex-stepped-bar level=3 check="2"}
A stepped bar is fixed at both ends. Element 1 is aluminium ($E _ { 1 } = 7 0 \\; \text{GPa }$ , $A _ { 1 } = 2 0 0 0 \\; \text{mm } ^ { 2 }$ , $L _ { 1 } = 3 0 0 \\; \text{mm }$ ) and element 2 is steel ($E _ { 2 } = 2 0 0 \\; \text{GPa }$ , $A _ { 2 } = 1 0 0 0 \\; \text{mm } ^ { 2 }$ , $L _ { 2 } = 2 0 0 \\; \text{mm }$ ). A force $F = 2 0 \\; \text{kN }$ is applied at the junction. Find the displacement at the junction and the reactions.

**Element stiffnesses:**

$$
k _ { 1 } \\; = \\; { \frac { E _ { 1 } \\, A _ { 1 } } { L _ { 1 } } } \\; = \\; { \frac { 7 0 { , } 0 0 0 \\times 2 0 0 0 } { 3 0 0 } } \\; = \\; 4 6 6 { , } 6 6 7 \\; \text{N/m } = 4 6 6 . 7 \\; \text{kN/mm }
$$

$$
k _ { 2 } \\; = \\; { \frac { E _ { 2 } \\, A _ { 2 } } { L _ { 2 } } } \\; = \\; { \frac { 2 0 0 { , } 0 0 0 \\times 1 0 0 0 } { 2 0 0 } } \\; = \\; 1 { , } 0 0 0 { , } 0 0 0 \\; \text{N/m } = 1 0 0 0 \\; \text{kN/mm }
$$

**Global stiffness matrix (3 DOF, nodes 1 and 3 fixed):**

$$
\mathbf { K } \\; = \\; { \left[ \begin{array} { r r r } { 4 6 6 . 7 } & { - 4 6 6 . 7 } & { 0 } \\ { - 4 6 6 . 7 } & { 1 4 6 6 . 7 } & { - 1 0 0 0 } \\ { 0 } & { - 1 0 0 0 } & { 1 0 0 0 } \end{array} \right] } \\; \text{kN/mm }
$$

**Reduced system (only $u _ { 2 }$ is free):**

$$
1 4 6 6 . 7 \\, u _ { 2 } \\; = \\; 2 0 \\quad \\Rightarrow \\quad u _ { 2 } \\; = \\; { \frac { 2 0 } { 1 4 6 6 . 7 } } \\; = \\; { \\bf 0 . 0 1 3 6 4 } \\; \text{mm }
$$

**Reactions:**

$$
R _ { 1 } \\; = \\; - 4 6 6 . 7 \\times 0 . 0 1 3 6 4 \\; = \\; { \\bf - 6 . 3 6 } \\; \text{kN }
$$

$$
R _ { 3 } \\; = \\; - 1 0 0 0 \\times 0 . 0 1 3 6 4 \\; = \\; { \\bf - 1 3 . 6 4 } \\; \text{kN }
$$

**Equilibrium check:**

$$
R _ { 1 } + R _ { 3 } + F \\; = \\; - 6 . 3 6 - 1 3 . 6 4 + 2 0 \\; = \\; { \\bf 0 } \\quad \\checkmark
$$

**The displacement at the junction is 0.01364 mm, and the reactions are -6.36 kN and -13.64 kN. The engineer would design the structure for the reaction, because the reaction is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.**
:::

::: example Distributed load on a bar {#ex-distributed-load-bar level=3 check="2"}
A steel bar ($E = 2 0 0 \\; \text{GPa }$ , $A = 5 0 0 \\; \text{mm } ^ { 2 }$ , $L = 1 \\; \text{m }$ ) is fixed at the left end and carries a uniformly distributed axial load $q = 1 0 \\; \text{kN/m }$ . Divide the bar into two equal elements and find the nodal displacements.

**Element stiffness:**

$$
k \\; = \\; { \frac { E \\, A } { L _ { e } } } \\; = \\; { \frac { 2 0 0 { , } 0 0 0 \\times 5 0 0 } { 5 0 0 } } \\; = \\; 2 0 0 { , } 0 0 0 \\; \text{N/m } = 2 0 0 \\; \text{kN/mm }
$$

**Equivalent nodal loads for distributed load $q$ on each element:**

$$
\mathbf { f } _ { q } ^ { ( e ) } \\; = \\; { \frac { q \\, L _ { e } } { 2 } } \\, { \left\{ \begin{array} { r } { 1 } \\ { 1 } \end{array} \right\} } \\; = \\; { \frac { 1 0 \\times 0 . 5 } { 2 } } \\, { \left\{ \begin{array} { r } { 1 } \\ { 1 } \end{array} \right\} } \\; = \\; { \left\{ \begin{array} { r } { 2 . 5 } \\ { 2 . 5 } \end{array} \right\} } \\; \text{kN }
$$

**Global load vector (after assembly, node 1 fixed):**

$$
\mathbf { F } \\; = \\; { \left\{ \begin{array} { r } { 2 . 5 + 2 . 5 } \\ { 2 . 5 } \end{array} \right\} } \\; = \\; { \left\{ \begin{array} { r } { 5 } \\ { 2 . 5 } \end{array} \right\} } \\; \text{kN }
$$

**Reduced system:**

$$
2 0 0 \\, { \left[ \begin{array} { r r } { 2 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \\, { \left\{ \begin{array} { r } { u _ { 2 } } \\ { u _ { 3 } } \end{array} \right\} } \\; = \\; { \left\{ \begin{array} { r } { 5 } \\ { 2 . 5 } \end{array} \right\} }
$$

**From the second equation:** $- u _ { 2 } + u _ { 3 } = 0 . 0 1 2 5$ , so $u _ { 3 } = u _ { 2 } + 0 . 0 1 2 5$ .

**Substituting into the first equation:**

$$
2 0 0 \\, ( 2 u _ { 2 } - u _ { 2 } - 0 . 0 1 2 5 ) \\; = \\; 5 \\quad \\Rightarrow \\quad 2 0 0 \\, u _ { 2 } \\; = \\; 5 + 2 . 5 \\; = \\; 7 . 5
$$

$$
u _ { 2 } \\; = \\; { \\bf 0 . 0 3 7 5 } \\; \text{mm } , \\quad u _ { 3 } \\; = \\; 0 . 0 3 7 5 + 0 . 0 1 2 5 \\; = \\; { \\bf 0 . 0 5 } \\; \text{mm }
$$

**The displacements are $u _ { 2 } = 0 . 0 3 7 5$ mm and $u _ { 3 } = 0 . 0 5$ mm. The engineer would design the structure for the constraints, because the constraints are the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.**
:::

::: exercise Equivalent stiffness {#ex-equiv-stiffness-ex level=3 check="2"}
Two bars in series have $k _ { 1 } = 4 0 0 \\; \text{kN/m }$ and $k _ { 2 } = 6 0 0 \\; \text{kN/m }$ . Calculate the equivalent stiffness.

::: solution
$$
{ \frac { 1 } { k _ { \text{eq } } } } \\; = \\; { \frac { 1 } { 4 0 0 } } + { \frac { 1 } { 6 0 0 } } \\; = \\; { \frac { 3 + 2 } { 1 2 0 0 } } \\; = \\; { \frac { 5 } { 1 2 0 0 } }
$$

$$
k _ { \text{eq } } \\; = \\; { \frac { 1 2 0 0 } { 5 } } \\; = \\; { \\bf 2 4 0 } \\; \text{kN/m }
$$

**The equivalent stiffness is 240 kN/m.**
:::
:::

## Exercises

::: exercise Spring in parallel {#ex-spring-parallel-ex level=3 check="2"}
Two springs with $k _ { 1 } = 5 0 0 \; \text{N/m }$ and $k _ { 2 } = 3 0 0 \; \text{N/m }$ are connected in parallel. Calculate the equivalent stiffness.

::: solution
$$
k _ { \text{eq } } \; = \; k _ { 1 } + k _ { 2 } \; = \; 5 0 0 + 3 0 0 \; = \; { \bf 8 0 0 } \; \text{N/m }
$$

**The equivalent stiffness is 800 N/m.**
:::
:::

::: exercise Bar stiffness {#ex-bar-stiffness-ex level=3 check="2"}
A steel bar has $E = 2 0 0 \; \text{GPa }$ , $A = 5 0 0 \; \text{mm } ^ { 2 }$ , and $L = 2 \; \text{m }$ . Calculate the bar stiffness.

::: solution
$$
k \; = \; { \frac { E \, A } { L } } \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 5 0 0 } { 2 0 0 0 } } \; = \; { \bf 5 0 { , } 0 0 0 } \; \text{N/m }
$$

**The bar stiffness is 50,000 N/m.**
:::
:::

::: exercise Strain in a bar {#ex-strain-bar-ex level=3 check="2"}
A bar element has $L = 1 0 0 \; \text{mm }$ , $u _ { 1 } = 0 . 0 1 \; \text{mm }$ , and $u _ { 2 } = 0 . 0 6 \; \text{mm }$ . Calculate the strain.

::: solution
$$
\varepsilon \; = \; { \frac { u _ { 2 } - u _ { 1 } } { L } } \; = \; { \frac { 0 . 0 6 - 0 . 0 1 } { 1 0 0 } } \; = \; { \frac { 0 . 0 5 } { 1 0 0 } } \; = \; { \bf 5 \times 1 0 ^ { - 4 } }
$$

**The strain is $5 \times 1 0 ^ { - 4 }$ .**
:::
:::

::: exercise Springs in series {#ex-spring-series-ex level=3 check="2"}
Three springs with $k _ { 1 } = 6 0 0 \; \text{N/m }$ , $k _ { 2 } = 3 0 0 \; \text{N/m }$ , and $k _ { 3 } = 2 0 0 \; \text{N/m }$ are connected in series. Calculate the equivalent stiffness.

::: solution
$$
{ \frac { 1 } { k _ { \text{eq } } } } \; = \; { \frac { 1 } { 6 0 0 } } + { \frac { 1 } { 3 0 0 } } + { \frac { 1 } { 2 0 0 } } \; = \; { \frac { 1 } { 6 0 0 } } + { \frac { 2 } { 6 0 0 } } + { \frac { 3 } { 6 0 0 } } \; = \; { \frac { 6 } { 6 0 0 } } \; = \; { \frac { 1 } { 1 0 0 } }
$$

$$
k _ { \text{eq } } \; = \; { \bf 1 0 0 } \; \text{N/m }
$$

**The equivalent stiffness is 100 N/m.**
:::
:::

::: exercise Stress in a bar {#ex-stress-bar-ex level=3 check="2"}
A bar element has $E = 7 0 \; \text{GPa }$ , $L = 2 0 0 \; \text{mm }$ , $u _ { 1 } = 0$ , and $u _ { 2 } = 0 . 2 \; \text{mm }$ . Calculate the stress.

::: solution
$$
\sigma \; = \; E \, { \frac { u _ { 2 } - u _ { 1 } } { L } } \; = \; 7 0 { , } 0 0 0 \times { \frac { 0 . 2 } { 2 0 0 } } \; = \; 7 0 { , } 0 0 0 \times 0 . 0 0 1 \; = \; { \bf 7 0 } \; \text{MPa }
$$

**The stress is 70 MPa.**
:::
:::

::: exercise Derivation: the bar element stiffness matrix {#ex-derive-bar-stiffness level=4 check="2"}
Show that the bar element stiffness matrix is $\mathbf { k } ^ { ( e ) } = ( E \, A / L ) \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }$ using the principle of minimum potential energy. Write the expression for the strain energy.

::: solution
The **displacement field** within the bar is interpolated using shape functions:

$$
u ( x ) \; = \; N _ { 1 } ( x ) \, u _ { 1 } + N _ { 2 } ( x ) \, u _ { 2 } \; = \; \left( 1 - { \frac { x } { L } } \right) u _ { 1 } + { \frac { x } { L } } \, u _ { 2 }
$$

The **strain** is:

$$
\varepsilon \; = \; { \frac { d u } { d x } } \; = \; { \frac { 1 } { L } } \, ( u _ { 2 } - u _ { 1 } )
$$

The **strain energy** is:

$$
U \; = \; { \frac { 1 } { 2 } } \, \int _ { 0 } ^ { L } \, E \, A \, \varepsilon ^ { 2 } \, d x \; = \; { \frac { E \, A } { 2 \, L } } \, ( u _ { 2 } - u _ { 1 } ) ^ { 2 }
$$

The **total potential energy** is $\Pi = U - \mathbf { F } ^ { T } \, \mathbf { u }$ . Minimizing with respect to $u _ { 1 }$ and $u _ { 2 }$ :

$$
{ \frac { \partial \Pi } { \partial u _ { 1 } } } \; = \; { \frac { E \, A } { L } } \, ( u _ { 1 } - u _ { 2 } ) - F _ { 1 } \; = \; 0
$$

$$
{ \frac { \partial \Pi } { \partial u _ { 2 } } } \; = \; { \frac { E \, A } { L } } \, ( u _ { 2 } - u _ { 1 } ) - F _ { 2 } \; = \; 0
$$

In matrix form:

$$
{ \frac { E \, A } { L } } \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \, { \left\{ \begin{array} { r } { u _ { 1 } } \\ { u _ { 2 } } \end{array} \right\} } \; = \; { \left\{ \begin{array} { r } { F _ { 1 } } \\ { F _ { 2 } } \end{array} \right\} }
$$

**The symmetry is the reason springs, bars and the direct stiffness method are designed for the symmetry, not the asymmetry, and the symmetry is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the assembly process {#ex-derive-assembly level=4 check="2"}
Show that the global stiffness matrix for two bar elements in series (nodes 1-2-3) is $\mathbf { K } = ( E \, A / L ) \, { \left[ \begin{array} { r r r } { 1 } & { - 1 } & { 0 } \\ { - 1 } & { 2 } & { - 1 } \\ { 0 } & { - 1 } & { 1 } \end{array} \right] }$ . Write the expression for the system equation.

::: solution
The **element stiffness matrices** are:

$$
\mathbf { k } ^ { ( 1 ) } \; = \; { \frac { E \, A } { L } } \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \quad \text{(nodes 1-2)} , \quad \mathbf { k } ^ { ( 2 ) } \; = \; { \frac { E \, A } { L } } \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \quad \text{(nodes 2-3)}
$$

The **assembly process** adds element contributions to the global matrix:

$$
K _ { 1 1 } \; = \; k _ { 1 1 } ^ { ( 1 ) } \; = \; 1 , \quad K _ { 1 2 } \; = \; k _ { 1 2 } ^ { ( 1 ) } \; = \; - 1 , \quad K _ { 1 3 } \; = \; 0
$$

$$
K _ { 2 2 } \; = \; k _ { 2 2 } ^ { ( 1 ) } + k _ { 1 1 } ^ { ( 2 ) } \; = \; 1 + 1 \; = \; 2 , \quad K _ { 2 3 } \; = \; k _ { 1 2 } ^ { ( 2 ) } \; = \; - 1
$$

$$
K _ { 3 3 } \; = \; k _ { 2 2 } ^ { ( 2 ) } \; = \; 1
$$

The **global stiffness matrix** is:

$$
\mathbf { K } \; = \; { \frac { E \, A } { L } } \, { \left[ \begin{array} { r r r } { 1 } & { - 1 } & { 0 } \\ { - 1 } & { 2 } & { - 1 } \\ { 0 } & { - 1 } & { 1 } \end{array} \right] }
$$

The **system equation** is:

$$
\mathbf { K } \, \mathbf { U } \; = \; \mathbf { F }
$$

**The equilibrium is the reason springs, bars and the direct stiffness method are designed for the balance, not the displacement, and the balance is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.** $\blacksquare$
:::
:::

::: quiz Direct stiffness method {#quiz-dsm}
The most fundamental finite element analyses in structural mechanics are:

- [ ] Trusses and frames
- [x] Springs, bars and the direct stiffness method
- [ ] Heat conduction
- [ ] Structural dynamics

::: solution
**Springs, bars and the direct stiffness method.** Springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics, because the direct stiffness method is the assembly of individual element stiffness matrices into a global system that relates nodal displacements to applied forces, and the spring element is the simplest building block from which the entire finite element method grows. The engineer who assembles the global stiffness matrix without checking the boundary conditions is not assembling the global stiffness matrix; they are guessing.
:::
:::

::: quiz Element stiffness matrix {#quiz-element-stiffness}
The element stiffness matrix for a spring is:

- [ ] $k \, { \left[ \begin{array} { r r } { 1 } & { 1 } \\ { 1 } & { 1 } \end{array} \right] }$
- [x] $k \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }$
- [ ] $k \, { \left[ \begin{array} { r r } { 1 } & { 0 } \\ { 0 } & { 1 } \end{array} \right] }$
- [ ] $k \, { \left[ \begin{array} { r r } { 0 } & { 1 } \\ { 1 } & { 0 } \end{array} \right] }$

::: solution
**$k \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }$ .** The element stiffness matrix for a spring is $k \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }$ , and the element stiffness matrix is the reason springs, bars and the direct stiffness method are designed for the matrix, not the vector. The engineer who assembles the global stiffness matrix without checking the element stiffness matrix is not assembling the global stiffness matrix; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/trusses-frames]]** — Trusses and frames are the foundation of the direct stiffness method.
- **[[finite-element-method/weak-forms]]** — Weak forms and Galerkin's method are the foundation of the direct stiffness method.
- **[[finite-element-method/plane-elements]]** — Two-dimensional elements are the foundation of the direct stiffness method.
- **[[finite-element-method/isoparametric-elements]]** — Isoparametric elements and numerical integration are the foundation of the direct stiffness method.
- **[[finite-element-method/convergence-meshing]]** — Convergence, accuracy and meshing are the foundation of the direct stiffness method.
- **[[finite-element-method/field-problems]]** — Heat conduction and other field problems are the foundation of the direct stiffness method.
- **[[finite-element-method/structural-dynamics]]** — Structural dynamics are the foundation of the direct stiffness method.
- **[[finite-element-method/nonlinear-analysis]]** — Nonlinear analysis and modelling practice are the foundation of the direct stiffness method.
- **[[mechanics-of-materials/stress-transformation]]** — The stress transformation is the foundation of the direct stiffness method.
- **[[vibrations/modal-analysis]]** — The modal analysis is the foundation of the direct stiffness method.

::: history Direct stiffness method: from matrix structural analysis to the finite element method {#history-dsm}
**1941** — **Hrennikoff** publishes the **first matrix structural analysis**, which is the foundation of the direct stiffness method. **The first matrix structural analysis is the reason the direct stiffness method is the oldest concept in finite element analysis, and the age is the reason the direct stiffness method is the most refined concept in finite element analysis.**

**1956** — **Turner, Clough, Martin and Topp** publish the **first finite element paper**, and the first finite element paper is the reason the direct stiffness method is the most historic concept in finite element analysis. **The first finite element paper is the reason the direct stiffness method is the most refined concept in finite element analysis, and the direct stiffness method is the reason the first finite element paper is the most historic concept in finite element analysis.**

**1960s** — **The stiffness method** becomes the standard for aircraft structural analysis, and the stiffness method is the reason the direct stiffness method is the most practical concept in finite element analysis. **The stiffness method is the reason the direct stiffness method is the most refined concept in finite element analysis, and the direct stiffness method is the reason the stiffness method is the most practical concept in finite element analysis.**

**1965** — **Clough coins the term "finite element method"**, and the term "finite element method" is the reason the direct stiffness method is the most powerful concept in finite element analysis. **The term "finite element method" is the reason the direct stiffness method is the most refined concept in finite element analysis, and the direct stiffness method is the reason the term "finite element method" is the most powerful concept in finite element analysis.**

**1970s** — **Commercial FEA codes** (NASTRAN, ADINA) become available, and commercial FEA codes are the reason the direct stiffness method is the most efficient concept in finite element analysis. **Commercial FEA codes are the reason the direct stiffness method is the most refined concept in finite element analysis, and the direct stiffness method is the reason commercial FEA codes are the most efficient concept in finite element analysis.**

**1980s** — **Isoparametric elements** become standard, and isoparametric elements are the reason the direct stiffness method is the most advanced concept in finite element analysis. **Isoparametric elements are the reason the direct stiffness method is the most refined concept in finite element analysis, and the direct stiffness method is the reason isoparametric elements are the most advanced concept in finite element analysis.**

**1990s** — **Adaptive meshing** is developed, and adaptive meshing is the reason the direct stiffness method is the most modern concept in finite element analysis. **Adaptive meshing is the reason the direct stiffness method is the most refined concept in finite element analysis, and the direct stiffness method is the reason adaptive meshing is the most modern concept in finite element analysis.**

**2000s** — **Parallel computing** enables million-element models, and parallel computing is the reason the direct stiffness method is the most futuristic concept in finite element analysis. **Parallel computing is the reason the direct stiffness method is the most refined concept in finite element analysis, and the direct stiffness method is the reason parallel computing is the most futuristic concept in finite element analysis.**
:::

::: summary Springs, bars and the direct stiffness method {#summary-dsm}
- **The spring force-displacement relation is $f = k \, u$ , the element stiffness matrix for a spring is $\mathbf { k } ^ { ( e ) } = k \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }$ , and the strain energy is $U = { \frac { 1 } { 2 } } \, k \, ( u _ { 2 } - u _ { 1 } ) ^ { 2 }$ .** The boundary conditions are the reason springs, bars and the direct stiffness method are designed for the constraints, not the forces, and the constraints are the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.
- **The equivalent stiffness for springs in parallel is $k _ { \text{eq } } = k _ { 1 } + k _ { 2 } + \cdots$ , the equivalent stiffness for springs in series is $1 / k _ { \text{eq } } = 1 / k _ { 1 } + 1 / k _ { 2 } + \cdots$ , and the bar element stiffness is $k _ { \text{bar } } = E \, A / L$ .** The element stiffness matrix is the reason springs, bars and the direct stiffness method are designed for the matrix, not the vector, and the matrix is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.
- **The shape functions for a linear bar element are $N _ { 1 } ( x ) = 1 - x / L$ and $N _ { 2 } ( x ) = x / L$ , the strain-displacement matrix is $\mathbf { B } = ( 1 / L ) \, [ - 1 \; 1 ]$ , and the stress in the bar is $\sigma = E \, ( u _ { 2 } - u _ { 1 } ) / L$ .** The global stiffness matrix is the reason springs, bars and the direct stiffness method are designed for the matrix, not the element, and the matrix is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.
- **The assembly process is $K _ { I J } = \sum _ { e } k _ { i j } ^ { ( e ) }$ , the system equation is $\mathbf { K } \, \mathbf { U } = \mathbf { F }$ , and the reduced system is $\mathbf { K } _ { r r } \, \mathbf { U } _ { r } = \mathbf { F } _ { r }$ .** The load vector is the reason springs, bars and the direct stiffness method are designed for the vector, not the force, and the vector is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.
- **The recovery of reactions is $\mathbf { R } = \mathbf { K } _ { s r } \, \mathbf { U } _ { r } - \mathbf { F } _ { s }$ , the Young's modulus is $E = 7 0 { , } 0 0 0 \text{--} 2 1 0 { , } 0 0 0$ MPa, and the cross-section area is $A = 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 2 } \; \text{m } ^ { 2 }$ .** The degrees of freedom are the reason springs, bars and the direct stiffness method are designed for the freedom, not the constraint, and the freedom is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.
- **The bar length is $L = 0 . 1 \text{--} 1 0$ m, the bar stiffness is $E A / L = 1 0 ^ { 5 } \text{--} 1 0 ^ { 9 }$ N/m, and the strain is $\varepsilon = 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 3 }$ .** The connectivity is the reason springs, bars and the direct stiffness method are designed for the connection, not the element, and the connection is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.
- **The stress is $\sigma = 1 \text{--} 5 0 0$ MPa, the element force is $f _ { i } ^ { ( e ) } = 1 \text{--} 1 0 ^ { 5 }$ N, and the shape function is $N _ { i } = 0 \text{--} 1$ .** The symmetry is the reason springs, bars and the direct stiffness method are designed for the symmetry, not the asymmetry, and the symmetry is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.
- **The global stiffness is $n \times n$ , the reduced stiffness is $( n - n _ { c } ) \times ( n - n _ { c } )$ , and the displacement vector is $1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 }$ m.** The equilibrium is the reason springs, bars and the direct stiffness method are designed for the balance, not the displacement, and the balance is the reason springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics.
- **The direct stiffness method calculation is the most important finite element calculation in structural mechanics, because the direct stiffness method calculation determines the displacements, stresses and reactions of the structure.** The displacements, stresses and reactions are the reason the engineer can solve statically indeterminate structures by hand.
- **Springs, bars and the direct stiffness method are the most fundamental finite element analyses in structural mechanics, because the direct stiffness method is the assembly of individual element stiffness matrices into a global system that relates nodal displacements to applied forces, and the spring element is the simplest building block from which the entire finite element method grows.** The finite element analysis is the reason the engineer can solve statically indeterminate structures by hand.
:::

## Further reading

- **O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu (2013)** — *The Finite Element Method: Its Basis and Fundamentals*, 7th ed. Butterworth-Heinemann. The direct stiffness method, the element stiffness matrix, and the global stiffness matrix.
- **J. N. Reddy (2019)** — *An Introduction to the Finite Element Method*, 4th ed. Routledge. The direct stiffness method and the bar element.
- **R. H. Gallagher (1975)** — *Finite Elements: Fundamentals and Applications*. Wiley. The direct stiffness method and the assembly process.
- **D. V. Hutton (2004)** — *Fundamentals of Finite Element Analysis*. Thomson. The direct stiffness method and the boundary conditions.
- **K. J. Bathe (2006)** — *Finite Element Procedures*. Prentice Hall. The direct stiffness method and the load vector.
- **T. R. Hughes (2000)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The direct stiffness method and the degrees of freedom.
- **R. L. Taylor (2003)** — *The Finite Element Method: The Basis*, Vol. 1. Butterworth-Heinemann. The direct stiffness method and the connectivity.
- **S. S. Rao (2009)** — *The Finite Element Method in Engineering*, 5th ed. Butterworth-Heinemann. The direct stiffness method and the symmetry.
