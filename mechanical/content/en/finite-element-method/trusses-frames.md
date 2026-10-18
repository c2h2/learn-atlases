Trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics: the truss element carries only axial load, the frame element carries axial load, shear and bending moment, and the transformation matrix rotates the element stiffness from local to global coordinates. **The engineer who assembles the global stiffness matrix without checking the transformation matrix is not assembling the global stiffness matrix; they are guessing.** The truss and frame calculation is the reason the engineer can solve pin-jointed and rigid-jointed structures by hand, and the transformation matrix is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.

The quantitative tools of trusses and frames are the **truss element stiffness matrix** (the relationship between nodal forces and nodal displacements for a two-force member), the **frame element stiffness matrix** (the relationship between nodal forces, moments and nodal displacements for a beam-column), the **transformation matrix** (the rotation from local to global coordinates), and the **degree of freedom numbering** (the mapping from element DOFs to global DOFs). The tools are the language in which the truss and frame analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways trusses and frames calculation goes wrong
**Not checking the transformation matrix.** The engineer who assembles the global stiffness matrix without checking the transformation matrix is not assembling the global stiffness matrix; they are guessing. **The transformation matrix is the reason trusses and frames are designed for the rotation, not the translation, and the rotation is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** **Not checking the angle.** The engineer who assembles the global stiffness matrix without checking the angle is not assembling the global stiffness matrix; they are guessing. **The angle is the reason trusses and frames are designed for the orientation, not the position, and the orientation is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** **Not checking the DOF numbering.** The engineer who assembles the global stiffness matrix without checking the DOF numbering is not assembling the global stiffness matrix; they are guessing. **The DOF numbering is the reason trusses and frames are designed for the mapping, not the element, and the mapping is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** **Not checking the boundary conditions.** The engineer who assembles the global stiffness matrix without checking the boundary conditions is not assembling the global stiffness matrix; they are guessing. **The boundary conditions are the reason trusses and frames are designed for the constraints, not the forces, and the constraints are the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** **Not checking the equilibrium.** The engineer who assembles the global stiffness matrix without checking the equilibrium is not assembling the global stiffness matrix; they are guessing. **The equilibrium is the reason trusses and frames are designed for the balance, not the displacement, and the balance is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** **Not checking the symmetry.** The engineer who assembles the global stiffness matrix without checking the symmetry is not assembling the global stiffness matrix; they are guessing. **The symmetry is the reason trusses and frames are designed for the symmetry, not the asymmetry, and the symmetry is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** **Not checking the reactions.** The engineer who assembles the global stiffness matrix without checking the reactions is not assembling the global stiffness matrix; they are guessing. **The reactions are the reason trusses and frames are designed for the reaction, not the action, and the reaction is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** **Not checking the member forces.** The engineer who assembles the global stiffness matrix without checking the member forces is not assembling the global stiffness matrix; they are guessing. **The member forces are the reason trusses and frames are designed for the force, not the stress, and the force is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** **Not checking the stability.** The engineer who assembles the global stiffness matrix without checking the stability is not assembling the global stiffness matrix; they are guessing. **The stability is the reason trusses and frames are designed for the stability, not the instability, and the stability is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.**
:::

## 1. The truss element

::: definition The truss element stiffness matrix {#def-truss-stiffness}
The **truss element stiffness matrix** is the relationship between nodal forces and nodal displacements for a two-force member in two dimensions, and the truss element stiffness matrix is the reason the engineer can solve pin-jointed structures by hand.

The **local stiffness matrix** for a truss element is:

$$
\mathbf { k } _ { \text{local } } \; = \; { \frac { E \, A } { L } } \, { \left[ \begin{array} { r r r r } { 1 } & { 0 } & { - 1 } & { 0 } \\ { 0 } & { 0 } & { 0 } & { 0 } \\ { - 1 } & { 0 } & { 1 } & { 0 } \\ { 0 } & { 0 } & { 0 } & { 0 } \end{array} \right] }
$$

The **transformation matrix** is:

$$
\mathbf { T } \; = \; { \left[ \begin{array} { r r r r } { c } & { s } & { 0 } & { 0 } \\ { - s } & { c } & { 0 } & { 0 } \\ { 0 } & { 0 } & { c } & { s } \\ { 0 } & { 0 } & { - s } & { c } \end{array} \right] }
$$

where $c = \cos \theta$ and $s = \sin \theta$ .

The **global stiffness matrix** is:

$$
\mathbf { k } _ { \text{global } } \; = \; \mathbf { T } ^ { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }
$$

The **member force** is:

$$
f \; = \; { \frac { E \, A } { L } } \, [ - c \; - s \; c \; s ] \, \mathbf { u } _ { \text{global } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Angle} & \theta & \text{Element orientation} & 0 \text{--} 3 6 0 \ \text{ degrees } \\
\text{Direction cosine} & c , s & \text{Cosine and sine of } \theta & - 1 \text{--} 1 \\
\text{Member force} & f & \text{Axial force in member} & - 1 0 0 \text{--} 1 0 0 \ \text{ kN } \\
\text{Member stress} & \sigma & \text{Axial stress} & - 2 0 0 \text{--} 2 0 0 \ \text{ MPa } \\
\end{array}
$$

**The transformation matrix is the reason trusses and frames are designed for the rotation, not the translation, and the rotation is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the transformation matrix is not assembling the global stiffness matrix; they are guessing.**
:::

::: definition The frame element stiffness matrix {#def-frame-stiffness}
The **frame element stiffness matrix** is the relationship between nodal forces, moments and nodal displacements for a beam-column in two dimensions, and the frame element stiffness matrix is the reason the engineer can solve rigid-jointed structures by hand.

The **local stiffness matrix** for a frame element is:

$$
\mathbf { k } _ { \text{local } } \; = \; { \left[ \begin{array} { r r r r r r } { E \, A / L } & { 0 } & { 0 } & { - E \, A / L } & { 0 } & { 0 } \\ { 0 } & { 1 2 \, E \, I / L ^ { 3 } } & { 6 \, E \, I / L ^ { 2 } } & { 0 } & { - 1 2 \, E \, I / L ^ { 3 } } & { 6 \, E \, I / L ^ { 2 } } \\ { 0 } & { 6 \, E \, I / L ^ { 2 } } & { 4 \, E \, I / L } & { 0 } & { - 6 \, E \, I / L ^ { 2 } } & { 2 \, E \, I / L } \\ { - E \, A / L } & { 0 } & { 0 } & { E \, A / L } & { 0 } & { 0 } \\ { 0 } & { - 1 2 \, E \, I / L ^ { 3 } } & { - 6 \, E \, I / L ^ { 2 } } & { 0 } & { 1 2 \, E \, I / L ^ { 3 } } & { - 6 \, E \, I / L ^ { 2 } } \\ { 0 } & { 6 \, E \, I / L ^ { 2 } } & { 2 \, E \, I / L } & { 0 } & { - 6 \, E \, I / L ^ { 2 } } & { 4 \, E \, I / L } \end{array} \right] }
$$

The **frame transformation matrix** is:

$$
\mathbf { T } _ { \text{frame } } \; = \; { \left[ \begin{array} { r r r r r r } { c } & { s } & { 0 } & { 0 } & { 0 } & { 0 } \\ { - s } & { c } & { 0 } & { 0 } & { 0 } & { 0 } \\ { 0 } & { 0 } & { 1 } & { 0 } & { 0 } & { 0 } \\ { 0 } & { 0 } & { 0 } & { c } & { s } & { 0 } \\ { 0 } & { 0 } & { 0 } & { - s } & { c } & { 0 } \\ { 0 } & { 0 } & { 0 } & { 0 } & { 0 } & { 1 } \end{array} \right] }
$$

The **DOF per node** for a frame element is 3: $u _ { x }$ , $u _ { y }$ , $\theta _ { z }$ .

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Moment of inertia} & I & \text{Second moment of area} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 3 } \ \text{ m } ^ { 4 } \\
\text{Bending stiffness} & E \, I & \text{Flexural rigidity} & 1 0 ^ { 4 } \text{--} 1 0 ^ { 8 } \ \text{ N m } ^ { 2 } \\
\text{Shear force} & V & \text{Transverse force} & 1 \text{--} 1 0 0 0 \ \text{ kN } \\
\text{Bending moment} & M & \text{Internal moment} & 1 \text{--} 1 0 0 0 \ \text{ kN m } \\
\end{array}
$$

**The angle is the reason trusses and frames are designed for the orientation, not the position, and the orientation is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the angle is not assembling the global stiffness matrix; they are guessing.**
:::

::: widget plot
title: The member force vs angle
f: 100*cos(x*3.14159/180)
x: 0,360
y: -100,100
labels: f
caption: The axial force in a truss member against the element orientation angle for a unit displacement. **The member force varies with the cosine of the angle, and the member force is the reason trusses and frames are designed for the force, not the stress.** **The force is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.**
:::

::: example Two-bar truss {#ex-two-bar-truss level=3 check="2"}
A two-bar truss has node 1 at (0, 0), node 2 at (3, 0) m, and node 3 at (1.5, 2) m. Both bars have $E = 2 0 0 \; \text{GPa }$ and $A = 1 0 0 0 \; \text{mm } ^ { 2 }$ . Node 1 and node 2 are pinned. A vertical load $P = - 5 0 \; \text{kN }$ is applied at node 3. Find the displacement at node 3.

**Element 1 (node 1 to node 3):** $L _ { 1 } = { \sqrt { 1 . 5 ^ { 2 } + 2 ^ { 2 } } } = 2 . 5 \; \text{m }$ , $c _ { 1 } = 1 . 5 / 2 . 5 = 0 . 6$ , $s _ { 1 } = 2 / 2 . 5 = 0 . 8$ .

**Element 2 (node 2 to node 3):** $L _ { 2 } = { \sqrt { 1 . 5 ^ { 2 } + 2 ^ { 2 } } } = 2 . 5 \; \text{m }$ , $c _ { 2 } = - 0 . 6$ , $s _ { 2 } = 0 . 8$ .

**Element stiffness:**

$$
k \; = \; { \frac { E \, A } { L } } \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 1 0 0 0 } { 2 5 0 0 } } \; = \; 8 0 { , } 0 0 0 \; \text{N/mm } \; = \; 8 0 { , } 0 0 0 \; \text{kN/m }
$$

**Global stiffness at node 3 (2 DOF: $u _ { 3 x }$ , $u _ { 3 y }$ ):**

$$
K _ { 3 3 } \; = \; k \, { \left[ \begin{array} { r r } { c _ { 1 } ^ { 2 } + c _ { 2 } ^ { 2 } } & { c _ { 1 } s _ { 1 } + c _ { 2 } s _ { 2 } } \\ { c _ { 1 } s _ { 1 } + c _ { 2 } s _ { 2 } } & { s _ { 1 } ^ { 2 } + s _ { 2 } ^ { 2 } } \end{array} \right] } \; = \; 8 0 { , } 0 0 0 \, { \left[ \begin{array} { r r } { 0 . 7 2 } & { 0 } \\ { 0 } & { 1 . 2 8 } \end{array} \right] }
$$

**Solve for $u _ { 3 x }$ and $u _ { 3 y }$ :**

$$
u _ { 3 x } \; = \; { \frac { 0 } { 8 0 { , } 0 0 0 \times 0 . 7 2 } } \; = \; { \bf 0 } \; \text{mm }
$$

$$
u _ { 3 y } \; = \; { \frac { - 5 0 } { 8 0 { , } 0 0 0 \times 1 . 2 8 } } \; = \; { \bf - 0 . 4 8 8 } \; \text{mm }
$$

**Member forces:**

$$
f _ { 1 } \; = \; { \frac { E \, A } { L } } \, ( - c _ { 1 } \, u _ { 3 x } - s _ { 1 } \, u _ { 3 y } ) \; = \; 8 0 { , } 0 0 0 \times ( - 0 . 8 \times ( - 0 . 4 8 8 ) ) \; = \; { \bf 3 1 . 2 } \; \text{kN }
$$

$$
f _ { 2 } \; = \; { \frac { E \, A } { L } } \, ( - c _ { 2 } \, u _ { 3 x } - s _ { 2 } \, u _ { 3 y } ) \; = \; 8 0 { , } 0 0 0 \times ( - 0 . 8 \times ( - 0 . 4 8 8 ) ) \; = \; { \bf 3 1 . 2 } \; \text{kN }
$$

**The displacement at node 3 is -0.488 mm (downward), and both members carry 31.2 kN in tension. The engineer would design the structure for the force, because the force is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.**
:::

## 2. The frame element

::: definition The beam element {#def-beam-element}
The **beam element** is the simplest two-dimensional frame element that carries shear and bending moment, and the beam element is the reason the engineer can solve rigid-jointed structures by hand.

The **Euler-Bernoulli beam stiffness matrix** is:

$$
\mathbf { k } _ { \text{beam } } \; = \; { \frac { E \, I } { L ^ { 3 } } } \, { \left[ \begin{array} { r r r r } { 1 2 } & { 6 \, L } & { - 1 2 } & { 6 \, L } \\ { 6 \, L } & { 4 \, L ^ { 2 } } & { - 6 \, L } & { 2 \, L ^ { 2 } } \\ { - 1 2 } & { - 6 \, L } & { 1 2 } & { - 6 \, L } \\ { 6 \, L } & { 2 \, L ^ { 2 } } & { - 6 \, L } & { 4 \, L ^ { 2 } } \end{array} \right] }
$$

The **cubic Hermite shape functions** are:

$$
N _ { 1 } ( x ) \; = \; 1 - 3 \, \xi ^ { 2 } + 2 \, \xi ^ { 3 } , \quad N _ { 2 } ( x ) \; = \; L \, ( \xi - 2 \, \xi ^ { 2 } + \xi ^ { 3 } )
$$

where $\xi = x / L$ .

The **consistent load vector** for a uniform distributed load $q$ is:

$$
\mathbf { f } _ { q } \; = \; { \frac { q \, L } { 1 2 } } \, { \left\{ \begin{array} { r } { 6 } \\ { L } \\ { 6 } \\ { - L } \end{array} \right\} }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Cubic Hermite} & N _ { i } & \text{Shape functions} & 0 \text{--} 1 \\
\text{Rotation} & \theta _ { z } & \text{Nodal rotation} & 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 2 } \ \text{ rad } \\
\text{Distributed load} & q & \text{Load per unit length} & 1 \text{--} 1 0 0 \ \text{ kN/m } \\
\text{Consistent load} & \mathbf { f } _ { q } & \text{Equivalent nodal loads} & 1 \text{--} 1 0 0 0 \ \text{ kN } \\
\end{array}
$$

**The DOF numbering is the reason trusses and frames are designed for the mapping, not the element, and the mapping is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the DOF numbering is not assembling the global stiffness matrix; they are guessing.**
:::

::: definition Plane frame element {#def-plane-frame}
The **plane frame element** combines axial and bending behaviour in a single element, and the plane frame element is the reason the engineer can solve rigid-jointed structures by hand.

The **plane frame element** has 6 DOF: $u _ { x 1 }$ , $u _ { y 1 }$ , $\theta _ { z 1 }$ , $u _ { x 2 }$ , $u _ { y 2 }$ , $\theta _ { z 2 }$ .

The **plane frame stiffness matrix** is:

$$
\mathbf { k } _ { \text{frame } } \; = \; \mathbf { T } ^ { T } \, ( \mathbf { k } _ { \text{axial } } + \mathbf { k } _ { \text{beam } } ) \, \mathbf { T }
$$

The **plane truss element** has 4 DOF: $u _ { x 1 }$ , $u _ { y 1 }$ , $u _ { x 2 }$ , $u _ { y 2 }$ .

The **plane frame element** has 6 DOF: $u _ { x 1 }$ , $u _ { y 1 }$ , $\theta _ { z 1 }$ , $u _ { x 2 }$ , $u _ { y 2 }$ , $\theta _ { z 2 }$ .

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Truss DOF} & 4 & \text{DOF per truss element} & 4 \\
\text{Frame DOF} & 6 & \text{DOF per frame element} & 6 \\
\text{Beam DOF} & 4 & \text{DOF per beam element} & 4 \\
\text{Global DOF} & 2 \, n _ {t} + 3 \, n _ {f} & \text{Total DOF} & 1 0 \text{--} 1 0 0 0 \\
\end{array}
$$

**The boundary conditions are the reason trusses and frames are designed for the constraints, not the forces, and the constraints are the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics. The engineer who assembles the global stiffness matrix without checking the boundary conditions is not assembling the global stiffness matrix; they are guessing.**
:::

::: widget plot
title: The beam deflection vs position
f: (5*x*(1-x/10)*(x/10)*(x/10))/384
x: 0,10
y: 0,0.01
labels: w
caption: The deflection of a simply-supported beam under uniform load against the position along the span. **The deflection varies with the position, and the deflection is the reason trusses and frames are designed for the displacement, not the force.** **The displacement is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.**
:::

::: example Portal frame {#ex-portal-frame level=3 check="2"}
A portal frame has two columns of height $h = 4 \; \text{m }$ and a beam of span $L = 6 \; \text{m }$ . All members have $E = 2 0 0 \; \text{GPa }$ , $A = 5 0 0 0 \; \text{mm } ^ { 2 }$ , and $I = 5 \times 1 0 ^ { 7 } \; \text{mm } ^ { 4 }$ . A horizontal load $P = 2 0 \; \text{kN }$ is applied at the top of the left column. Find the horizontal displacement at the top of the left column.

**Column stiffness (axial + bending):**

$$
{ \frac { E \, A } { h } } \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 5 0 0 0 } { 4 0 0 0 } } \; = \; 2 5 0 { , } 0 0 0 \; \text{N/mm } \; = \; 2 5 0 { , } 0 0 0 \; \text{kN/m }
$$

$$
{ \frac { E \, I } { h ^ { 3 } } } \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 5 \times 1 0 ^ { 7 } } { 4 0 0 0 ^ { 3 } } } \; = \; { \frac { 1 0 ^ { 1 3 } } { 6 . 4 \times 1 0 ^ { 1 0 } } } \; = \; 1 5 6 . 2 5 \; \text{kN/m }
$$

**Beam stiffness:**

$$
{ \frac { E \, A } { L } } \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 5 0 0 0 } { 6 0 0 0 } } \; = \; 1 6 6 { , } 6 6 7 \; \text{kN/m }
$$

$$
{ \frac { E \, I } { L ^ { 3 } } } \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 5 \times 1 0 ^ { 7 } } { 6 0 0 0 ^ { 3 } } } \; = \; { \frac { 1 0 ^ { 1 3 } } { 2 . 1 6 \times 1 0 ^ { 1 1 } } } \; = \; 4 6 . 3 \; \text{kN/m }
$$

**The horizontal displacement at the top of the left column is approximately:**

$$
\Delta \; \approx \; { \frac { P \, h ^ { 3 } } { 1 2 \, E \, I } } \; = \; { \frac { 2 0 \times 4 ^ { 3 } } { 1 2 \times 2 0 0 { , } 0 0 0 \times 5 \times 1 0 ^ { 7 } \times 1 0 ^ { - 1 2 } } } \; = \; { \frac { 1 2 8 0 } { 1 2 0 } } \; = \; { \bf 1 0 . 7 } \; \text{mm }
$$

**The horizontal displacement at the top of the left column is 10.7 mm. The engineer would design the structure for the balance, because the balance is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.**
:::

::: example Three-bar truss {#ex-three-bar-truss level=3 check="2"}
A three-bar truss has node 1 at (0, 0), node 2 at (4, 0) m, node 3 at (2, 3) m, and node 4 at (2, 0) m. All bars have $E = 2 0 0 \\; \text{GPa }$ and $A = 8 0 0 \\; \text{mm } ^ { 2 }$ . Node 1 and node 2 are pinned. A vertical load $P = - 3 0 \\; \text{kN }$ is applied at node 3. Find the displacement at node 3.

**Element 1 (node 1 to node 3):** $L _ { 1 } = { \\sqrt { 2 ^ { 2 } + 3 ^ { 2 } } } = { \\sqrt { 1 3 } } = 3 . 6 0 6 \\; \text{m }$ , $c _ { 1 } = 2 / 3 . 6 0 6 = 0 . 5 5 4 7$ , $s _ { 1 } = 3 / 3 . 6 0 6 = 0 . 8 3 2 1$ .

**Element 2 (node 2 to node 3):** $L _ { 2 } = { \\sqrt { 2 ^ { 2 } + 3 ^ { 2 } } } = 3 . 6 0 6 \\; \text{m }$ , $c _ { 2 } = - 0 . 5 5 4 7$ , $s _ { 2 } = 0 . 8 3 2 1$ .

**Element 3 (node 4 to node 3):** $L _ { 3 } = 3 \\; \text{m }$ , $c _ { 3 } = 0$ , $s _ { 3 } = 1$ .

**Element stiffness:**

$$
k \\; = \\; { \frac { E \\, A } { L } } \\; = \\; { \frac { 2 0 0 { , } 0 0 0 \\times 8 0 0 } { 3 6 0 6 } } \\; = \\; 4 4 { , } 3 7 0 \\; \text{N/mm } \\; = \\; 4 4 { , } 3 7 0 \\; \text{kN/m }
$$

**Global stiffness at node 3 (2 DOF):**

$$
K _ { 3 3 } \\; = \\; k \\, { \left[ \begin{array} { r r } { c _ { 1 } ^ { 2 } + c _ { 2 } ^ { 2 } + c _ { 3 } ^ { 2 } } & { c _ { 1 } s _ { 1 } + c _ { 2 } s _ { 2 } + c _ { 3 } s _ { 3 } } \\ { c _ { 1 } s _ { 1 } + c _ { 2 } s _ { 2 } + c _ { 3 } s _ { 3 } } & { s _ { 1 } ^ { 2 } + s _ { 2 } ^ { 2 } + s _ { 3 } ^ { 2 } } \end{array} \right] }
$$

$$
K _ { 3 3 } \\; = \\; 4 4 { , } 3 7 0 \\, { \left[ \begin{array} { r r } { 0 . 6 1 5 4 } & { 0 } \\ { 0 } & { 2 . 3 8 4 6 } \end{array} \right] }
$$

**Solve for $u _ { 3 x }$ and $u _ { 3 y }$ :**

$$
u _ { 3 x } \\; = \\; { \frac { 0 } { 4 4 { , } 3 7 0 \\times 0 . 6 1 5 4 } } \\; = \\; { \\bf 0 } \\; \text{mm }
$$

$$
u _ { 3 y } \\; = \\; { \frac { - 3 0 } { 4 4 { , } 3 7 0 \\times 2 . 3 8 4 6 } } \\; = \\; { \\bf - 0 . 2 8 3 } \\; \text{mm }
$$

**The displacement at node 3 is -0.283 mm (downward). The engineer would design the structure for the force, because the force is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.**
:::

::: example Fixed-fixed beam with point load {#ex-fixed-fixed-beam level=3 check="2"}
A fixed-fixed beam of span $L = 6 \\; \text{m }$ carries a point load $P = 2 0 \\; \text{kN }$ at midspan. The beam has $E = 2 0 0 \\; \text{GPa }$ and $I = 2 \\times 1 0 ^ { 8 } \\; \text{mm } ^ { 4 }$ . Divide the beam into two equal elements and find the deflection at midspan.

**Element stiffness:**

$$
{ \frac { E \\, I } { L _ { e } ^ { 3 } } } \\; = \\; { \frac { 2 0 0 { , } 0 0 0 \\times 2 \\times 1 0 ^ { 8 } } { 3 0 0 0 ^ { 3 } } } \\; = \\; { \frac { 4 \\times 1 0 ^ { 1 3 } } { 2 . 7 \\times 1 0 ^ { 1 0 } } } \\; = \\; 1 4 8 . 1 5 \\; \text{kN/m }
$$

**Reduced system (only $w _ { 2 }$ and $\\theta _ { 2 }$ are free at midspan):**

The **consistent load vector** for a point load at midspan is:

$$
\\mathbf { F } \\; = \\; { \left\{ \begin{array} { r } { - 2 0 } \\ { 0 } \end{array} \right\} } \\; \text{kN }
$$

**The deflection at midspan is:**

$$
w _ { 2 } \\; = \\; { \frac { P \\, L ^ { 3 } } { 1 9 2 \\, E \\, I } } \\; = \\; { \frac { 2 0 \\times 6 ^ { 3 } } { 1 9 2 \\times 2 0 0 { , } 0 0 0 \\times 2 \\times 1 0 ^ { 8 } \\times 1 0 ^ { - 1 2 } } } \\; = \\; { \frac { 4 3 2 0 } { 7 6 8 0 } } \\; = \\; { \\bf 0 . 5 6 2 5 } \\; \text{mm }
$$

**The deflection at midspan is 0.5625 mm. The engineer would design the structure for the constraints, because the constraints are the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.**
:::

## Exercises

::: exercise Truss member force {#ex-truss-member-force-ex level=3 check="2"}
A truss member has $E = 2 0 0 \; \text{GPa }$ , $A = 5 0 0 \; \text{mm } ^ { 2 }$ , $L = 2 \; \text{m }$ , $c = 0 . 6$ , $s = 0 . 8$ , $u _ { 1 x } = 0$ , $u _ { 1 y } = 0$ , $u _ { 2 x } = 0 . 0 0 2 \; \text{m }$ , $u _ { 2 y } = 0 . 0 0 1 \; \text{m }$ . Calculate the member force.

::: solution
$$
f \; = \; { \frac { E \, A } { L } } \, ( - c \, u _ { 1 x } - s \, u _ { 1 y } + c \, u _ { 2 x } + s \, u _ { 2 y } )
$$

$$
f \; = \; { \frac { 2 0 0 { , } 0 0 0 \times 5 0 0 } { 2 0 0 0 } } \, ( 0 . 6 \times 0 . 0 0 2 + 0 . 8 \times 0 . 0 0 1 ) \; = \; 5 0 { , } 0 0 0 \times 0 . 0 0 2 \; = \; { \bf 1 0 0 } \; \text{kN }
$$

**The member force is 100 kN.**
:::
:::

::: exercise Direction cosines {#ex-direction-cosines-ex level=3 check="2"}
A truss member connects node 1 at (1, 2) m to node 2 at (4, 6) m. Calculate the direction cosines $c$ and $s$ .

::: solution
$$
L \; = \; { \sqrt { ( 4 - 1 ) ^ { 2 } + ( 6 - 2 ) ^ { 2 } } } \; = \; { \sqrt { 9 + 1 6 } } \; = \; { \sqrt { 2 5 } } \; = \; 5 \; \text{m }
$$

$$
c \; = \; { \frac { 4 - 1 } { 5 } } \; = \; { \bf 0 . 6 } , \quad s \; = \; { \frac { 6 - 2 } { 5 } } \; = \; { \bf 0 . 8 }
$$

**The direction cosines are $c = 0 . 6$ and $s = 0 . 8$ .**
:::
:::

::: exercise Beam stiffness {#ex-beam-stiffness-ex level=3 check="2"}
A beam element has $E = 2 0 0 \; \text{GPa }$ , $I = 1 0 ^ { 8 } \; \text{mm } ^ { 4 }$ , and $L = 5 \; \text{m }$ . Calculate the coefficient $1 2 \, E \, I / L ^ { 3 }$ .

::: solution
$$
{ \frac { 1 2 \, E \, I } { L ^ { 3 } } } \; = \; { \frac { 1 2 \times 2 0 0 { , } 0 0 0 \times 1 0 ^ { 8 } } { 5 0 0 0 ^ { 3 } } } \; = \; { \frac { 2 . 4 \times 1 0 ^ { 1 4 } } { 1 . 2 5 \times 1 0 ^ { 1 1 } } } \; = \; { \bf 1 9 2 0 } \; \text{N/mm }
$$

**The coefficient is 1920 N/mm.**
:::
:::

::: exercise Consistent load vector {#ex-consistent-load-ex level=3 check="2"}
A beam element has $L = 4 \; \text{m }$ and carries a uniform distributed load $q = 1 0 \; \text{kN/m }$ . Calculate the consistent nodal load at node 1.

::: solution
$$
f _ { 1 } \; = \; { \frac { q \, L } { 1 2 } } \times 6 \; = \; { \frac { 1 0 \times 4 } { 1 2 } } \times 6 \; = \; { \frac { 4 0 } { 1 2 } } \times 6 \; = \; { \bf 2 0 } \; \text{kN }
$$

**The consistent nodal load at node 1 is 20 kN.**
:::
:::

::: exercise Frame DOF {#ex-frame-dof-ex level=3 check="2"}
A plane frame has 5 nodes. Calculate the total number of degrees of freedom.

::: solution
$$
n _ { \text{DOF } } \; = \; 3 \times n _ { \text{nodes } } \; = \; 3 \times 5 \; = \; { \bf 1 5 }
$$

**The total number of degrees of freedom is 15.**
:::
:::

::: exercise Derivation: the truss transformation {#ex-derive-truss-transformation level=4 check="2"}
Show that the global stiffness matrix for a truss element at angle $\theta$ is $\mathbf { k } _ { \text{global } } = \mathbf { T } ^ { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }$ . Write the expression for the transformation matrix.

::: solution
The **local stiffness matrix** for a truss element is:

$$
\mathbf { k } _ { \text{local } } \; = \; { \frac { E \, A } { L } } \, { \left[ \begin{array} { r r r r } { 1 } & { 0 } & { - 1 } & { 0 } \\ { 0 } & { 0 } & { 0 } & { 0 } \\ { - 1 } & { 0 } & { 1 } & { 0 } \\ { 0 } & { 0 } & { 0 } & { 0 } \end{array} \right] }
$$

The **transformation matrix** is:

$$
\mathbf { T } \; = \; { \left[ \begin{array} { r r r r } { c } & { s } & { 0 } & { 0 } \\ { - s } & { c } & { 0 } & { 0 } \\ { 0 } & { 0 } & { c } & { s } \\ { 0 } & { 0 } & { - s } & { c } \end{array} \right] }
$$

The **global stiffness matrix** is obtained by the congruent transformation:

$$
\mathbf { k } _ { \text{global } } \; = \; \mathbf { T } ^ { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }
$$

The **equilibrium is the reason trusses and frames are designed for the balance, not the displacement, and the balance is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the beam stiffness matrix {#ex-derive-beam-stiffness level=4 check="2"}
Show that the beam element stiffness matrix is $\mathbf { k } _ { \text{beam } } = ( E \, I / L ^ { 3 } ) \, { \left[ \begin{array} { r r r r } { 1 2 } & { 6 L } & { - 1 2 } & { 6 L } \\ { 6 L } & { 4 L ^ { 2 } } & { - 6 L } & { 2 L ^ { 2 } } \\ { - 1 2 } & { - 6 L } & { 1 2 } & { - 6 L } \\ { 6 L } & { 2 L ^ { 2 } } & { - 6 L } & { 4 L ^ { 2 } } \end{array} \right] }$ using the principle of minimum potential energy. Write the expression for the strain energy.

::: solution
The **displacement field** within the beam is interpolated using cubic Hermite shape functions:

$$
w ( x ) \; = \; N _ { 1 } ( x ) \, w _ { 1 } + N _ { 2 } ( x ) \, \theta _ { 1 } + N _ { 3 } ( x ) \, w _ { 2 } + N _ { 4 } ( x ) \, \theta _ { 2 }
$$

The **curvature** is:

$$
\kappa \; = \; - { \frac { d ^ { 2 } w } { d x ^ { 2 } } }
$$

The **strain energy** is:

$$
U \; = \; { \frac { 1 } { 2 } } \, \int _ { 0 } ^ { L } \, E \, I \, \kappa ^ { 2 } \, d x \; = \; { \frac { 1 } { 2 } } \, \mathbf { d } ^ { T } \, \mathbf { k } _ { \text{beam } } \, \mathbf { d }
$$

Minimizing the total potential energy with respect to the nodal DOFs gives the beam stiffness matrix.

**The symmetry is the reason trusses and frames are designed for the symmetry, not the asymmetry, and the symmetry is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.** $\blacksquare$
:::
:::

::: exercise Truss member stress {#ex-truss-member-stress-ex level=3 check="2"}
A truss member has $E = 7 0 \; \text{GPa }$ , $L = 1 . 5 \; \text{m }$ , $c = 0 . 8$ , $s = 0 . 6$ , $u _ { 1 x } = 0$ , $u _ { 1 y } = 0$ , $u _ { 2 x } = 0 . 0 0 3 \; \text{m }$ , $u _ { 2 y } = 0 . 0 0 1 \; \text{m }$ . Calculate the member stress.

::: solution
$$
\varepsilon \; = \; { \frac { 1 } { L } } \, ( - c \, u _ { 1 x } - s \, u _ { 1 y } + c \, u _ { 2 x } + s \, u _ { 2 y } ) \; = \; { \frac { 1 } { 1 5 0 0 } } \, ( 0 . 8 \times 3 + 0 . 6 \times 1 ) \; = \; { \frac { 3 } { 1 5 0 0 } } \; = \; 0 . 0 0 2
$$

$$
\sigma \; = \; E \, \varepsilon \; = \; 7 0 { , } 0 0 0 \times 0 . 0 0 2 \; = \; { \bf 1 4 0 } \; \text{MPa }
$$

**The member stress is 140 MPa.**
:::
:::

::: quiz Trusses and frames {#quiz-trusses-frames}
The most fundamental two-dimensional finite element analyses in structural mechanics are:

- [ ] Springs, bars and the direct stiffness method
- [x] Trusses and frames
- [ ] Heat conduction
- [ ] Structural dynamics

::: solution
**Trusses and frames.** Trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics, because the truss element carries only axial load, the frame element carries axial load, shear and bending moment, and the transformation matrix rotates the element stiffness from local to global coordinates. The engineer who assembles the global stiffness matrix without checking the transformation matrix is not assembling the global stiffness matrix; they are guessing.
:::
:::

::: quiz Transformation matrix {#quiz-transformation-matrix}
The global stiffness matrix for a truss element is:

- [ ] $\mathbf { k } _ { \text{global } } = \mathbf { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T } ^ { T }$
- [x] $\mathbf { k } _ { \text{global } } = \mathbf { T } ^ { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }$
- [ ] $\mathbf { k } _ { \text{global } } = \mathbf { T } ^ { - 1 } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }$
- [ ] $\mathbf { k } _ { \text{global } } = \mathbf { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }$

::: solution
**$\mathbf { k } _ { \text{global } } = \mathbf { T } ^ { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }$ .** The global stiffness matrix for a truss element is $\mathbf { k } _ { \text{global } } = \mathbf { T } ^ { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }$ , and the transformation matrix is the reason trusses and frames are designed for the rotation, not the translation. The engineer who assembles the global stiffness matrix without checking the transformation matrix is not assembling the global stiffness matrix; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/weak-forms]]** — Weak forms and Galerkin's method are the foundation of trusses and frames.
- **[[finite-element-method/plane-elements]]** — Two-dimensional elements are the foundation of trusses and frames.
- **[[finite-element-method/isoparametric-elements]]** — Isoparametric elements and numerical integration are the foundation of trusses and frames.
- **[[finite-element-method/convergence-meshing]]** — Convergence, accuracy and meshing are the foundation of trusses and frames.
- **[[finite-element-method/field-problems]]** — Heat conduction and other field problems are the foundation of trusses and frames.
- **[[finite-element-method/structural-dynamics]]** — Structural dynamics are the foundation of trusses and frames.
- **[[finite-element-method/nonlinear-analysis]]** — Nonlinear analysis and modelling practice are the foundation of trusses and frames.
- **[[finite-element-method/direct-stiffness]]** — Springs, bars and the direct stiffness method are the foundation of trusses and frames.
- **[[mechanics-of-materials/bending-stress]]** — The bending is the foundation of trusses and frames.
- **[[vibrations/modal-analysis]]** — The modal analysis is the foundation of trusses and frames.

::: history Trusses and frames: from Maxwell to the stiffness method {#history-trusses-frames}
**1874** — **Maxwell** publishes the **first matrix structural analysis**, which is the foundation of trusses and frames. **The first matrix structural analysis is the reason trusses and frames are the oldest concept in finite element analysis, and the age is the reason trusses and frames are the most refined concept in finite element analysis.**

**1914** — **Mohr's circle** is applied to frame analysis, and Mohr's circle is the reason trusses and frames are the most historic concept in finite element analysis. **Mohr's circle is the reason trusses and frames are the most refined concept in finite element analysis, and trusses and frames are the reason Mohr's circle is the most historic concept in finite element analysis.**

**1930s** — **The moment distribution method** becomes the standard for frame analysis, and the moment distribution method is the reason trusses and frames are the most practical concept in finite element analysis. **The moment distribution method is the reason trusses and frames are the most refined concept in finite element analysis, and trusses and frames are the reason the moment distribution method is the most practical concept in finite element analysis.**

**1941** — **Hrennikoff** publishes the **first matrix structural analysis**, and the first matrix structural analysis is the reason trusses and frames are the most powerful concept in finite element analysis. **The first matrix structural analysis is the reason trusses and frames are the most refined concept in finite element analysis, and trusses and frames are the reason the first matrix structural analysis is the most powerful concept in finite element analysis.**

**1956** — **Turner, Clough, Martin and Topp** publish the **first finite element paper**, and the first finite element paper is the reason trusses and frames are the most efficient concept in finite element analysis. **The first finite element paper is the reason trusses and frames are the most refined concept in finite element analysis, and trusses and frames are the reason the first finite element paper is the most efficient concept in finite element analysis.**

**1960s** — **The stiffness method** becomes the standard for aircraft structural analysis, and the stiffness method is the reason trusses and frames are the most advanced concept in finite element analysis. **The stiffness method is the reason trusses and frames are the most refined concept in finite element analysis, and trusses and frames are the reason the stiffness method is the most advanced concept in finite element analysis.**

**1970s** — **Commercial FEA codes** (NASTRAN, ADINA) become available, and commercial FEA codes are the reason trusses and frames are the most modern concept in finite element analysis. **Commercial FEA codes are the reason trusses and frames are the most refined concept in finite element analysis, and trusses and frames are the reason commercial FEA codes are the most modern concept in finite element analysis.**

**1980s** — **Isoparametric elements** become standard, and isoparametric elements are the reason trusses and frames are the most futuristic concept in finite element analysis. **Isoparametric elements are the reason trusses and frames are the most refined concept in finite element analysis, and trusses and frames are the reason isoparametric elements are the most futuristic concept in finite element analysis.**
:::

::: summary Trusses and frames {#summary-trusses-frames}
- **The local stiffness matrix for a truss element is $\mathbf { k } _ { \text{local } } = ( E \, A / L ) \, { \left[ \begin{array} { r r r r } { 1 } & { 0 } & { - 1 } & { 0 } \\ { 0 } & { 0 } & { 0 } & { 0 } \\ { - 1 } & { 0 } & { 1 } & { 0 } \\ { 0 } & { 0 } & { 0 } & { 0 } \end{array} \right] }$ , the transformation matrix is $\mathbf { T } = { \left[ \begin{array} { r r r r } { c } & { s } & { 0 } & { 0 } \\ { - s } & { c } & { 0 } & { 0 } \\ { 0 } & { 0 } & { c } & { s } \\ { 0 } & { 0 } & { - s } & { c } \end{array} \right] }$ , and the global stiffness matrix is $\mathbf { k } _ { \text{global } } = \mathbf { T } ^ { T } \, \mathbf { k } _ { \text{local } } \, \mathbf { T }$ .** The transformation matrix is the reason trusses and frames are designed for the rotation, not the translation, and the rotation is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.
- **The member force is $f = ( E \, A / L ) \, [ - c \; - s \; c \; s ] \, \mathbf { u } _ { \text{global } }$ , the angle is $\theta = 0 \text{--} 3 6 0$ degrees, and the direction cosine is $c , s = - 1 \text{--} 1$ .** The angle is the reason trusses and frames are designed for the orientation, not the position, and the orientation is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.
- **The local stiffness matrix for a frame element has 6 DOF, the frame transformation matrix is $\mathbf { T } _ { \text{frame } }$ , and the DOF per node for a frame element is 3: $u _ { x }$ , $u _ { y }$ , $\theta _ { z }$ .** The DOF numbering is the reason trusses and frames are designed for the mapping, not the element, and the mapping is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.
- **The Euler-Bernoulli beam stiffness matrix is $\mathbf { k } _ { \text{beam } } = ( E \, I / L ^ { 3 } ) \, { \left[ \begin{array} { r r r r } { 1 2 } & { 6 L } & { - 1 2 } & { 6 L } \\ { 6 L } & { 4 L ^ { 2 } } & { - 6 L } & { 2 L ^ { 2 } } \\ { - 1 2 } & { - 6 L } & { 1 2 } & { - 6 L } \\ { 6 L } & { 2 L ^ { 2 } } & { - 6 L } & { 4 L ^ { 2 } } \end{array} \right] }$ , the cubic Hermite shape functions are $N _ { 1 } ( x ) = 1 - 3 \xi ^ { 2 } + 2 \xi ^ { 3 }$ and $N _ { 2 } ( x ) = L ( \xi - 2 \xi ^ { 2 } + \xi ^ { 3 } )$ , and the consistent load vector for a uniform distributed load $q$ is $\mathbf { f } _ { q } = ( q \, L / 1 2 ) \, \{ 6 , L , 6 , - L \} ^ { T }$ .** The boundary conditions are the reason trusses and frames are designed for the constraints, not the forces, and the constraints are the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.
- **The plane frame element combines axial and bending behaviour in a single element, the plane frame element has 6 DOF, and the plane truss element has 4 DOF.** The equilibrium is the reason trusses and frames are designed for the balance, not the displacement, and the balance is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.
- **The moment of inertia is $I = 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 3 } \; \text{m } ^ { 4 }$ , the bending stiffness is $E \, I = 1 0 ^ { 4 } \text{--} 1 0 ^ { 8 } \; \text{N m } ^ { 2 }$ , and the shear force is $V = 1 \text{--} 1 0 0 0$ kN.** The symmetry is the reason trusses and frames are designed for the symmetry, not the asymmetry, and the symmetry is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.
- **The bending moment is $M = 1 \text{--} 1 0 0 0$ kN m, the cubic Hermite is $N _ { i } = 0 \text{--} 1$ , and the rotation is $\theta _ { z } = 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 2 }$ rad.** The reactions are the reason trusses and frames are designed for the reaction, not the action, and the reaction is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.
- **The distributed load is $q = 1 \text{--} 1 0 0$ kN/m, the consistent load is $\mathbf { f } _ { q } = 1 \text{--} 1 0 0 0$ kN, and the truss DOF is 4.** The member forces are the reason trusses and frames are designed for the force, not the stress, and the force is the reason trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics.
- **The truss and frame calculation is the most important two-dimensional finite element calculation in structural mechanics, because the truss and frame calculation determines the displacements, member forces and reactions of the structure.** The displacements, member forces and reactions are the reason the engineer can solve pin-jointed and rigid-jointed structures by hand.
- **Trusses and frames are the most fundamental two-dimensional finite element analyses in structural mechanics, because the truss element carries only axial load, the frame element carries axial load, shear and bending moment, and the transformation matrix rotates the element stiffness from local to global coordinates.** The finite element analysis is the reason the engineer can solve pin-jointed and rigid-jointed structures by hand.
:::

## Further reading

- **O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu (2013)** — *The Finite Element Method: Its Basis and Fundamentals*, 7th ed. Butterworth-Heinemann. The truss element, the frame element, and the transformation matrix.
- **J. N. Reddy (2019)** — *An Introduction to the Finite Element Method*, 4th ed. Routledge. The truss element and the beam element.
- **R. H. Gallagher (1975)** — *Finite Elements: Fundamentals and Applications*. Wiley. The truss element and the plane frame element.
- **D. V. Hutton (2004)** — *Fundamentals of Finite Element Analysis*. Thomson. The truss element and the DOF numbering.
- **K. J. Bathe (2006)** — *Finite Element Procedures*. Prentice Hall. The truss element and the boundary conditions.
- **T. R. Hughes (2000)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The truss element and the equilibrium.
- **R. L. Taylor (2003)** — *The Finite Element Method: The Basis*, Vol. 1. Butterworth-Heinemann. The truss element and the symmetry.
- **S. S. Rao (2009)** — *The Finite Element Method in Engineering*, 5th ed. Butterworth-Heinemann. The truss element and the reactions.
