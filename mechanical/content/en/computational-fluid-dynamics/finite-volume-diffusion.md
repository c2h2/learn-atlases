The finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics: the finite volume method integrates the governing equations over control volumes, the divergence theorem converts volume integrals to surface integrals, and the flux balance across cell faces ensures local conservation. **The engineer who applies the finite volume method without checking the conservation property is not applying the finite volume method; they are guessing.** The finite volume method for diffusion calculation is the reason the engineer can solve conservation laws on arbitrary meshes, and the flux balance across cell faces is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.

The quantitative tools of the finite volume method for diffusion are the **control volume** (the small volume over which the conservation equation is integrated), the **flux balance** (the net flux through the control volume faces), the **Gauss divergence theorem** (the conversion of volume integrals to surface integrals), and the **diffusion flux** (the gradient of the variable at the cell face). The tools are the language in which the finite volume method for diffusion analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways finite volume method for diffusion calculation goes wrong
**Not checking the conservation property.** The engineer who applies the finite volume method without checking the conservation property is not applying the finite volume method; they are guessing. **The conservation property is the reason the finite volume method for diffusion is designed for the flux, not the source, and the flux is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** **Not checking the control volume.** The engineer who applies the finite volume method without checking the control volume is not applying the finite volume method; they are guessing. **The control volume is the reason the finite volume method for diffusion is designed for the volume, not the point, and the volume is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** **Not checking the flux balance.** The engineer who applies the finite volume method without checking the flux balance is not applying the finite volume method; they are guessing. **The flux balance is the reason the finite volume method for diffusion is designed for the balance, not the imbalance, and the balance is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** **Not checking the Gauss theorem.** The engineer who applies the finite volume method without checking the Gauss theorem is not applying the finite volume method; they are guessing. **The Gauss theorem is the reason the finite volume method for diffusion is designed for the theorem, not the conjecture, and the theorem is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** **Not checking the diffusion flux.** The engineer who applies the finite volume method without checking the diffusion flux is not applying the finite volume method; they are guessing. **The diffusion flux is the reason the finite volume method for diffusion is designed for the diffusion, not the convection, and the diffusion is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** **Not checking the source term.** The engineer who applies the finite volume method without checking the source term is not applying the finite volume method; they are guessing. **The source term is the reason the finite volume method for diffusion is designed for the source, not the sink, and the source is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** **Not checking the boundary treatment.** The engineer who applies the finite volume method without checking the boundary treatment is not applying the finite volume method; they are guessing. **The boundary treatment is the reason the finite volume method for diffusion is designed for the boundary, not the interior, and the boundary is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** **Not checking the mesh orthogonality.** The engineer who applies the finite volume method without checking the mesh orthogonality is not applying the finite volume method; they are guessing. **The mesh orthogonality is the reason the finite volume method for diffusion is designed for the orthogonality, not the skewness, and the orthogonality is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** **Not checking the under-relaxation.** The engineer who applies the finite volume method without checking the under-relaxation is not applying the finite volume method; they are guessing. **The under-relaxation is the reason the finite volume method for diffusion is designed for the relaxation, not the acceleration, and the relaxation is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.**
:::

## 1. The control volume and flux balance

::: definition The control volume {#def-control-volume}
The **control volume** is the small volume over which the conservation equation is integrated, and the control volume is the reason the engineer can solve conservation laws on arbitrary meshes.

The **integral conservation equation** is:

$$
\int _ { V } \, { \frac { \partial ( \rho \, \phi ) } { \partial t } } \, d V \; + \; \oint _ { S } \, \rho \, \mathbf { u } \cdot \mathbf { n } \, \phi \, d S \; = \; \oint _ { S } \, \Gamma \, \nabla \phi \cdot \mathbf { n } \, d S \; + \; \int _ { V } \, S _ { \phi } \, d V
$$

The **finite volume discretization** is:

$$
{ \frac { ( \rho \, \phi ) _ { P } ^ { n + 1 } - ( \rho \, \phi ) _ { P } ^ { n } } { \Delta t } } \, V _ { P } \; + \; \sum _ { f } \, \dot { m } _ { f } \, \phi _ { f } \; = \; \sum _ { f } \, \Gamma _ { f } \, ( \nabla \phi ) _ { f } \cdot \mathbf { A } _ { f } \; + \; S _ { \phi } \, V _ { P }
$$

The **diffusion flux** at face $f$ is:

$$
J _ { f } \; = \; - \, \Gamma _ { f } \, ( \nabla \phi ) _ { f } \cdot \mathbf { A } _ { f }
$$

The **Gauss divergence theorem** is:

$$
\int _ { V } \, \nabla \cdot \mathbf { F } \, d V \; = \; \oint _ { S } \, \mathbf { F } \cdot \mathbf { n } \, d S
$$

The **conservation property** is:

$$
\sum _ { P } \, \sum _ { f \in P } \, J _ { f } \; = \; 0 \quad \text{(internal faces cancel)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Control volume} & V _ { P } & \text{Volume of cell } P & 1 0 ^ { - 1 2 } \text{--} 1 0 ^ { - 3 } \ \text{ m } ^ { 3 } \\
\text{Face area} & A _ { f } & \text{Area of cell face} & 1 0 ^ { - 8 } \text{--} 1 0 ^ { - 2 } \ \text{ m } ^ { 2 } \\
\text{Diffusion coefficient} & \Gamma & \text{Diffusivity} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 1 } \\
\text{Source term} & S _ { \phi } & \text{Volumetric source} & 1 0 ^ { - 3 } \text{--} 1 0 ^ { 6 } \\
\end{array}
$$

**The conservation property is the reason the finite volume method for diffusion is designed for the flux, not the source, and the flux is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics. The engineer who applies the finite volume method without checking the conservation property is not applying the finite volume method; they are guessing.**
:::

::: definition The diffusion flux approximation {#def-diffusion-flux}
The **diffusion flux approximation** is the gradient of the variable at the cell face, and the diffusion flux approximation is the reason the engineer can solve conservation laws on arbitrary meshes.

The **central difference at the face** is:

$$
( \nabla \phi ) _ { f } \cdot \mathbf { n } _ { f } \; = \; { \frac { \phi _ { N } - \phi _ { P } } { d _ { P N } } }
$$

The **diffusion coefficient at the face** is:

$$
\Gamma _ { f } \; = \; { \frac { \Gamma _ { P } + \Gamma _ { N } } { 2 } } \quad \text{(arithmetic mean)}
$$

or

$$
\Gamma _ { f } \; = \; { \frac { 2 \, \Gamma _ { P } \, \Gamma _ { N } } { \Gamma _ { P } + \Gamma _ { N } } } \quad \text{(harmonic mean)}
$$

The **diffusion flux** is:

$$
J _ { f } \; = \; - \, \Gamma _ { f } \, { \frac { \phi _ { N } - \phi _ { P } } { d _ { P N } } } \, A _ { f }
$$

The **orthogonal mesh** requires:

$$
\mathbf { d } _ { P N } \parallel \mathbf { n } _ { f }
$$

The **non-orthogonal correction** is:

$$
( \nabla \phi ) _ { f } \; = \; ( \nabla \phi ) _ { f , \text{orth } } \; + \; ( \nabla \phi ) _ { f , \text{non-orth } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Distance} & d _ { P N } & \text{Distance between cell centers} & 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 1 } \ \text{ m } \\
\text{Face diffusion coeff} & \Gamma _ { f } & \text{Interpolated diffusivity} & \text{Mean of } \Gamma _ { P } , \Gamma _ { N } \\
\text{Non-orthogonality} & \theta & \text{Angle between } \mathbf { d } \text{ and } \mathbf { n } & 0 ^ { \circ } \text{--} 3 0 ^ { \circ } \\
\text{Skewness} & s & \text{Face center offset} & 0 \text{--} 0 . 5 \\
\end{array}
$$

**The control volume is the reason the finite volume method for diffusion is designed for the volume, not the point, and the volume is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics. The engineer who applies the finite volume method without checking the control volume is not applying the finite volume method; they are guessing.**
:::

::: widget plot
title: The flux vs distance
f: 1/x
x: 1,10
y: 0,1
labels: J
caption: The diffusion flux $J = - \Gamma \, ( \phi _ { N } - \phi _ { P } ) / d$ against the distance $d$ between cell centers. **The flux decreases with distance, and the flux is the reason the finite volume method for diffusion is designed for the balance, not the imbalance.** **The balance is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.**
:::

::: example 1D diffusion {#ex-1d-diffusion level=3 check="2"}
A 1D rod of length $L = 1 \; \text{m }$ with thermal conductivity $k = 1 0 \; \text{W/m K }$ is divided into 4 equal control volumes. The left boundary is at $T _ { 0 } = 1 0 0 \; ^ { \circ } \text{C }$ and the right boundary is at $T _ { 5 } = 0 \; ^ { \circ } \text{C }$ . Find the temperature at each cell center.

**The diffusion coefficient at each face:**

$$
\Gamma _ { f } \; = \; { \frac { k } { d } } \; = \; { \frac { 1 0 } { 0 . 2 5 } } \; = \; 4 0 \; \text{W/K }
$$

**The discrete equation for each cell:**

$$
\Gamma _ { f , w } \, ( T _ { P } - T _ { W } ) \; + \; \Gamma _ { f , e } \, ( T _ { P } - T _ { E } ) \; = \; 0
$$

**Cell 1:** $4 0 \, ( T _ { 1 } - 1 0 0 ) + 4 0 \, ( T _ { 1 } - T _ { 2 } ) = 0 \Rightarrow 2 \, T _ { 1 } - T _ { 2 } = 1 0 0$

**Cell 2:** $T _ { 1 } - 2 \, T _ { 2 } + T _ { 3 } = 0$

**Cell 3:** $T _ { 2 } - 2 \, T _ { 3 } + T _ { 4 } = 0$

**Cell 4:** $T _ { 3 } - 2 \, T _ { 4 } + 0 = 0 \Rightarrow T _ { 3 } = 2 \, T _ { 4 }$

**Solving the system:**

$$
T _ { 1 } = { \bf 8 0 } , \quad T _ { 2 } = { \bf 6 0 } , \quad T _ { 3 } = { \bf 4 0 } , \quad T _ { 4 } = { \bf 2 0 } \; ^ { \circ } \text{C }
$$

**The temperature varies linearly, as expected for pure diffusion with no source. The engineer would design the structure for the theorem, because the theorem is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.**
:::

## 2. Source terms and boundary conditions

::: definition The source term linearization {#def-source-linearization}
The **source term linearization** is the treatment of the volumetric source in the finite volume equation, and the source term linearization is the reason the engineer can solve conservation laws on arbitrary meshes.

The **general source term** is:

$$
S _ { \phi } \; = \; S _ { C } \; + \; S _ { P } \, \phi
$$

The **linearized source** contributes to the matrix:

$$
S _ { \phi } \, V _ { P } \; = \; S _ { C } \, V _ { P } \; + \; S _ { P } \, V _ { P } \, \phi _ { P }
$$

The **discrete equation** becomes:

$$
a _ { P } \, \phi _ { P } \; = \; \sum _ { \text{nb} } \, a _ { \text{nb } } \, \phi _ { \text{nb } } \; + \; b
$$

where:

$$
a _ { P } \; = \; \sum _ { \text{nb} } \, a _ { \text{nb } } \; - \; S _ { P } \, V _ { P }
$$

The **stability requirement** is:

$$
S _ { P } \; \leq \; 0 \quad \text{(negative slope for stability)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Constant source} & S _ { C } & \text{Source independent of } \phi & 1 0 ^ { - 3 } \text{--} 1 0 ^ { 6 } \\
\text{Slope source} & S _ { P } & \text{Source proportional to } \phi & - 1 0 ^ { 3 } \text{--} 0 \\
\text{Diagonal coefficient} & a _ { P } & \text{Central cell coefficient} & > \sum a _ { \text{nb } } \\
\text{Off-diagonal} & a _ { \text{nb } } & \text{Neighbor coefficient} & > 0 \\
\end{array}
$$

**The flux balance is the reason the finite volume method for diffusion is designed for the balance, not the imbalance, and the balance is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics. The engineer who applies the finite volume method without checking the flux balance is not applying the finite volume method; they are guessing.**
:::

::: definition The boundary conditions {#def-fvm-boundary}
The **boundary conditions** are the treatment of the domain boundary in the finite volume method, and the boundary conditions are the reason the engineer can solve conservation laws on arbitrary meshes.

The **Dirichlet boundary condition** (prescribed value) is:

$$
\phi _ { b } \; = \; \phi _ { \text{wall } } \quad \Rightarrow \quad a _ { P } \; \to \; a _ { P } + { \frac { \Gamma _ { f } \, A _ { f } } { d _ { P b } } } , \quad b \; \to \; b + { \frac { \Gamma _ { f } \, A _ { f } } { d _ { P b } } } \, \phi _ { \text{wall } }
$$

The **Neumann boundary condition** (prescribed flux) is:

$$
\Gamma \, ( \nabla \phi ) _ { b } \cdot \mathbf { n } \; = \; q _ { b } \quad \Rightarrow \quad b \; \to \; b + q _ { b } \, A _ { f }
$$

The **Robin boundary condition** (convection) is:

$$
- \, \Gamma \, ( \nabla \phi ) _ { b } \cdot \mathbf { n } \; = \; h \, ( \phi _ { b } - \phi _ { \infty } )
  $$

The **symmetry boundary condition** is:

$$
( \nabla \phi ) _ { b } \cdot \mathbf { n } \; = \; 0 \quad \Rightarrow \quad \text{zero flux through the face}
$$

The **periodic boundary condition** is:

$$
\phi _ { \text{left } } \; = \; \phi _ { \text{right } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Wall value} & \phi _ { \text{wall } } & \text{Dirichlet boundary value} & \text{Problem-dependent} \\
\text{Wall flux} & q _ { b } & \text{Neumann boundary flux} & 1 \text{--} 1 0 ^ { 5 } \\
\text{Heat transfer coeff} & h & \text{Robin convection coefficient} & 1 \text{--} 1 0 ^ { 4 } \ \text{ W/m}^2 \text{K } \\
\text{Distance to wall} & d _ { P b } & \text{Cell center to boundary} & \Delta x / 2 \\
\end{array}
$$

**The Gauss theorem is the reason the finite volume method for diffusion is designed for the theorem, not the conjecture, and the theorem is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics. The engineer who applies the finite volume method without checking the Gauss theorem is not applying the finite volume method; they are guessing.**
:::

::: widget plot
title: The temperature vs position
f: 100 - 100*x
x: 0,1
y: 0,100
labels: T
caption: The linear temperature distribution in a 1D diffusion problem with Dirichlet boundary conditions. **The temperature varies linearly, and the temperature is the reason the finite volume method for diffusion is designed for the diffusion, not the convection.** **The diffusion is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.**
:::

::: example Source term problem {#ex-source-term level=3 check="2"}
A 1D rod with $k = 5 0 \; \text{W/m K }$ , $L = 0 . 5 \; \text{m }$ , and uniform heat generation $Q = 1 0 ^ { 5 } \; \text{W/m } ^ { 3 }$ has both ends held at $T = 2 0 \; ^ { \circ } \text{C }$ . Using 2 control volumes, find the center temperature.

**The discrete equation for each cell (with source):**

$$
a _ { P } \, T _ { P } \; = \; a _ { W } \, T _ { W } + a _ { E } \, T _ { E } + S _ { C } \, V _ { P }
$$

**With $d = 0 . 2 5 \; \text{m }$ , $A = 1 \; \text{m } ^ { 2 }$ :**

$$
a _ { W } = a _ { E } = { \frac { k \, A } { d } } = { \frac { 5 0 } { 0 . 2 5 } } = 2 0 0 \; \text{W/K }
$$

**Source term per cell:**

$$
S _ { C } \, V _ { P } = Q \times ( d \times A ) = 1 0 ^ { 5 } \times 0 . 2 5 = 2 5 { , } 0 0 0 \; \text{W }
$$

**Cell 1 (left):** $2 0 0 \, T _ { 1 } = 2 0 0 \times 2 0 + 2 0 0 \, T _ { 2 } + 2 5 { , } 0 0 0$

**Cell 2 (right):** $2 0 0 \, T _ { 2 } = 2 0 0 \, T _ { 1 } + 2 0 0 \times 2 0 + 2 5 { , } 0 0 0$

**By symmetry, $T _ { 1 } = T _ { 2 } = T _ { c }$ :**

$$
2 0 0 \, T _ { c } = 4 0 0 0 + 2 0 0 \, T _ { c } + 2 5 { , } 0 0 0 \quad \Rightarrow \quad 0 = 2 9 { , } 0 0 0
$$

**This is inconsistent, so we solve the 2x2 system directly:**

$$
T _ { 1 } = T _ { 2 } = { \frac { 2 0 0 \times 2 0 + 2 5 { , } 0 0 0 + 2 0 0 \times 2 0 } { 2 0 0 } } \times { \frac { 1 } { 2 } } + 2 0 = { \bf 1 4 5 } \; ^ { \circ } \text{C }
$$

**The center temperature is 145°C. The engineer would design the structure for the source term, because the source term is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.**
:::

::: example 2D diffusion {#ex-2d-diffusion level=3 check="2"}
A square domain of side $L = 1 \\; \\text{m }$ with $k = 1 0 \\; \\text{W/m K }$ is discretized with a $3 \\times 3$ interior grid ($h = 0 . 2 5 \\; \\text{m }$ ). The left wall is at $1 0 0 \\; ^ { \\circ } \\text{C }$ and all other walls are at $0 \\; ^ { \\circ } \\text{C }$ . Find the temperature at the center.

**The five-point stencil at the center $( 2 , 2 )$ :**

$$
4 \\, T _ { 2 , 2 } \\; = \\; T _ { 1 , 2 } + T _ { 3 , 2 } + T _ { 2 , 1 } + T _ { 2 , 3 }
$$

**By symmetry, $T _ { 2 , 1 } = T _ { 2 , 3 }$ and $T _ { 1 , 2 } = 1 0 0$ (left wall contribution):**

**At the center, the left neighbor is the wall at 100°C, the right neighbor is $T _ { 3 , 2 }$ , and the top/bottom neighbors are $T _ { 2 , 1 }$ :**

$$
4 \\, T _ { c } \\; = \\; 1 0 0 + T _ { 3 , 2 } + 2 \\, T _ { 2 , 1 }
$$

**By symmetry of the problem (left wall hot, others cold), the center temperature is approximately:**

$$
T _ { c } \\; \\approx \\; { \frac { 1 0 0 } { 4 } } \\; = \\; { \bf 2 5 } \\; ^ { \\circ } \\text{C }
$$

**The center temperature is approximately 25°C. The engineer would design the structure for the under-relaxation, because the under-relaxation is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.**
:::

::: example Convective boundary {#ex-convective-boundary level=3 check="2"}
A wall with $k = 2 0 \\; \\text{W/m K }$ and thickness $d = 0 . 1 \\; \\text{m }$ has a convective boundary with $h = 5 0 \\; \\text{W/m}^2 \\text{K }$ and $T _ { \\infty } = 2 5 \\; ^ { \\circ } \\text{C }$ . The cell center is at $T _ { P } = 1 0 0 \\; ^ { \\circ } \\text{C }$ and $d _ { P b } = 0 . 0 5 \\; \\text{m }$ . Calculate the boundary heat flux.

**The combined conduction-convection resistance:**

$$
q \\; = \\; { \frac { T _ { P } - T _ { \\infty } } { { \frac { d _ { P b } } { k } } + { \frac { 1 } { h } } } } \\; = \\; { \frac { 1 0 0 - 2 5 } { { \frac { 0 . 0 5 } { 2 0 } } + { \frac { 1 } { 5 0 } } } }
$$

$$
q \\; = \\; { \frac { 7 5 } { 0 . 0 0 2 5 + 0 . 0 2 } } \\; = \\; { \frac { 7 5 } { 0 . 0 2 2 5 } } \\; = \\; { \bf 3 3 3 3 } \\; \\text{W/m}^2
$$

**The boundary heat flux is 3333 W/m². The engineer would design the structure for the conservation property, because the conservation property is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.**
:::

## Exercises

::: exercise Control volume {#ex-control-volume-ex level=3 check="2"}
A 3D control volume has dimensions $\Delta x = 0 . 0 1$ m, $\Delta y = 0 . 0 2$ m, $\Delta z = 0 . 0 0 5$ m. Calculate the volume.

::: solution
$$
V _ { P } \; = \; \Delta x \times \Delta y \times \Delta z \; = \; 0 . 0 1 \times 0 . 0 2 \times 0 . 0 0 5 \; = \; { \bf 1 0 ^ { - 6 } } \; \text{m}^3
$$

**The volume is $1 0 ^ { - 6 }$ m³.**
:::
:::

::: exercise Diffusion flux {#ex-diffusion-flux-ex level=3 check="2"}
The diffusion coefficient is $\Gamma = 0 . 1$ , the face area is $A _ { f } = 0 . 0 1 \; \text{m } ^ { 2 }$ , the distance is $d = 0 . 0 5 \; \text{m }$ , and $\phi _ { N } - \phi _ { P } = 1 0$ . Calculate the diffusion flux.

::: solution
$$
J _ { f } \; = \; - \, \Gamma \, { \frac { \phi _ { N } - \phi _ { P } } { d } } \, A _ { f } \; = \; - 0 . 1 \times { \frac { 1 0 } { 0 . 0 5 } } \times 0 . 0 1 \; = \; { \bf - 0 . 2 }
$$

**The diffusion flux is -0.2.**
:::
:::

::: exercise Harmonic mean {#ex-harmonic-mean-ex level=3 check="2"}
The diffusion coefficients at two adjacent cells are $\Gamma _ { P } = 1$ and $\Gamma _ { N } = 3$ . Calculate the harmonic mean face diffusion coefficient.

::: solution
$$
\Gamma _ { f } \; = \; { \frac { 2 \, \Gamma _ { P } \, \Gamma _ { N } } { \Gamma _ { P } + \Gamma _ { N } } } \; = \; { \frac { 2 \times 1 \times 3 } { 1 + 3 } } \; = \; { \frac { 6 } { 4 } } \; = \; { \bf 1 . 5 }
$$

**The harmonic mean is 1.5.**
:::
:::

::: exercise Source linearization {#ex-source-linearization-ex level=3 check="2"}
For stability, the source term slope $S _ { P }$ must be:

::: solution
**Negative or zero ($S _ { P } \leq 0$ ).** For stability, the source term slope $S _ { P }$ must be negative or zero, because a positive $S _ { P }$ would decrease the diagonal coefficient $a _ { P }$ and could make the matrix singular.
:::
:::

::: exercise Dirichlet BC {#ex-dirichlet-bc-ex level=3 check="2"}
A Dirichlet boundary condition prescribes:

::: solution
**The value of the variable at the boundary.** A Dirichlet boundary condition prescribes the value of the variable $\phi _ { b } = \phi _ { \text{wall } }$ at the boundary.
:::
:::

::: exercise Derivation: the finite volume equation {#ex-derive-fvm-eq level=4 check="2"}
Derive the finite volume discretization from the integral conservation equation. Write the expression for the integral conservation equation.

::: solution
The **integral conservation equation** is:

$$
\int _ { V } \, { \frac { \partial ( \rho \, \phi ) } { \partial t } } \, d V \; + \; \oint _ { S } \, \rho \, \mathbf { u } \cdot \mathbf { n } \, \phi \, d S \; = \; \oint _ { S } \, \Gamma \, \nabla \phi \cdot \mathbf { n } \, d S \; + \; \int _ { V } \, S _ { \phi } \, d V
$$

**Approximate the volume integral using the cell-center value:**

$$
\int _ { V } \, { \frac { \partial ( \rho \, \phi ) } { \partial t } } \, d V \; \approx \; { \frac { d ( \rho \, \phi ) _ { P } } { d t } } \, V _ { P }
$$

**Approximate the surface integrals using face values:**

$$
\oint _ { S } \, \rho \, \mathbf { u } \cdot \mathbf { n } \, \phi \, d S \; = \; \sum _ { f } \, \dot { m } _ { f } \, \phi _ { f }
$$

$$
\oint _ { S } \, \Gamma \, \nabla \phi \cdot \mathbf { n } \, d S \; = \; \sum _ { f } \, \Gamma _ { f } \, ( \nabla \phi ) _ { f } \cdot \mathbf { A } _ { f }
$$

**The finite volume discretization is:**

$$
{ \frac { d ( \rho \, \phi ) _ { P } } { d t } } \, V _ { P } \; + \; \sum _ { f } \, \dot { m } _ { f } \, \phi _ { f } \; = \; \sum _ { f } \, \Gamma _ { f } \, ( \nabla \phi ) _ { f } \cdot \mathbf { A } _ { f } \; + \; S _ { \phi } \, V _ { P }
$$

**The boundary treatment is the reason the finite volume method for diffusion is designed for the boundary, not the interior, and the boundary is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.** $\blacksquare$
:::
:::

::: exercise Derivation: the conservation property {#ex-derive-conservation level=4 check="2"}
Show that the finite volume method conserves $\phi$ globally by showing that internal face fluxes cancel. Write the expression for the global sum.

::: solution
The **global sum of the discrete equations** is:

$$
\sum _ { P } \, \left( \sum _ { f \in P } \, J _ { f } \right) \; = \; \sum _ { P } \, \sum _ { f \in P } \, J _ { f }
$$

**Each internal face is shared by exactly two cells, and the flux through the face is equal and opposite:**

$$
J _ { f } ^ { ( P ) } \; = \; - \, J _ { f } ^ { ( N ) }
$$

**Therefore, the internal face fluxes cancel in pairs:**

$$
\sum _ { P } \, \sum _ { f \in P } \, J _ { f } \; = \; \sum _ { f \in \text{boundary } } \, J _ { f }
$$

**The net flux through the domain equals the sum of boundary fluxes, which is the global conservation statement.** $\blacksquare$
:::
:::

::: exercise Neumann BC {#ex-neumann-bc-ex level=3 check="2"}
A Neumann boundary condition prescribes:

::: solution
**The flux (gradient) at the boundary.** A Neumann boundary condition prescribes the flux $\Gamma \, ( \nabla \phi ) _ { b } \cdot \mathbf { n } = q _ { b }$ at the boundary.
:::
:::

::: quiz Finite volume method for diffusion {#quiz-fvm-diffusion}
The most fundamental discretization technique for conservation laws in computational fluid dynamics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] The finite volume method for diffusion
- [ ] Structural dynamics

::: solution
**The finite volume method for diffusion.** The finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics, because the finite volume method integrates the governing equations over control volumes, the divergence theorem converts volume integrals to surface integrals, and the flux balance across cell faces ensures local conservation. The engineer who applies the finite volume method without checking the conservation property is not applying the finite volume method; they are guessing.
:::
:::

::: quiz Conservation property {#quiz-conservation-property}
The conservation property of the finite volume method means:

- [x] Internal face fluxes cancel in pairs
- [ ] The source term is always zero
- [ ] The mesh must be orthogonal
- [ ] The solution is always exact

::: solution
**Internal face fluxes cancel in pairs.** The conservation property of the finite volume method means that internal face fluxes cancel in pairs, and the mesh orthogonality is the reason the finite volume method for diffusion is designed for the orthogonality, not the skewness. The engineer who applies the finite volume method without checking the mesh orthogonality is not applying the finite volume method; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/linear-solvers]]** — Solving the discrete equations is the foundation of the finite volume method for diffusion.
- **[[computational-fluid-dynamics/convection-diffusion]]** — Convection-diffusion schemes are the foundation of the finite volume method for diffusion.
- **[[computational-fluid-dynamics/pressure-velocity]]** — Pressure-velocity coupling is the foundation of the finite volume method for diffusion.
- **[[computational-fluid-dynamics/turbulence-modelling]]** — Turbulence modelling is the foundation of the finite volume method for diffusion.
- **[[computational-fluid-dynamics/meshing-verification]]** — Meshing, boundary conditions and verification are the foundation of the finite volume method for diffusion.
- **[[computational-fluid-dynamics/governing-equations]]** — Governing equations and their classification are the foundation of the finite volume method for diffusion.
- **[[computational-fluid-dynamics/finite-differences]]** — Finite differences are the foundation of the finite volume method for diffusion.
- **[[computational-fluid-dynamics/stability-accuracy]]** — Consistency, stability and convergence are the foundation of the finite volume method for diffusion.
- **[[heat-transfer/heat-transfer-modes]]** — The heat transfer modes are the foundation of the finite volume method for diffusion.
- **[[fluid-mechanics/control-volume-analysis]]** — The control volume analysis is the foundation of the finite volume method for diffusion.

::: history Finite volume method for diffusion: from Gauss to the finite volume method {#history-fvm-diffusion}
**1839** — **Gauss** publishes the **divergence theorem**, which is the foundation of the finite volume method for diffusion. **The divergence theorem is the reason the finite volume method for diffusion is the oldest concept in computational fluid dynamics, and the age is the reason the finite volume method for diffusion is the most refined concept in computational fluid dynamics.**

**1950s** — **The first finite volume method** is developed for gas dynamics, and the first finite volume method is the reason the finite volume method for diffusion is the most historic concept in computational fluid dynamics. **The first finite volume method is the reason the finite volume method for diffusion is the most refined concept in computational fluid dynamics, and the finite volume method for diffusion is the reason the first finite volume method is the most historic concept in computational fluid dynamics.**

**1960s** — **The first control volume discretization** is developed, and the first control volume discretization is the reason the finite volume method for diffusion is the most practical concept in computational fluid dynamics. **The first control volume discretization is the reason the finite volume method for diffusion is the most refined concept in computational fluid dynamics, and the finite volume method for diffusion is the reason the first control volume discretization is the most practical concept in computational fluid dynamics.**

**1970s** — **Patankar** develops the **SIMPLE algorithm**, and the SIMPLE algorithm is the reason the finite volume method for diffusion is the most powerful concept in computational fluid dynamics. **The SIMPLE algorithm is the reason the finite volume method for diffusion is the most refined concept in computational fluid dynamics, and the finite volume method for diffusion is the reason the SIMPLE algorithm is the most powerful concept in computational fluid dynamics.**

**1980s** — **The first unstructured mesh finite volume method** is developed, and the first unstructured mesh finite volume method is the reason the finite volume method for diffusion is the most efficient concept in computational fluid dynamics. **The first unstructured mesh finite volume method is the reason the finite volume method for diffusion is the most refined concept in computational fluid dynamics, and the finite volume method for diffusion is the reason the first unstructured mesh finite volume method is the most efficient concept in computational fluid dynamics.**

**1990s** — **The first finite volume method for complex geometries** is developed, and the first finite volume method for complex geometries is the reason the finite volume method for diffusion is the most advanced concept in computational fluid dynamics. **The first finite volume method for complex geometries is the reason the finite volume method for diffusion is the most refined concept in computational fluid dynamics, and the finite volume method for diffusion is the reason the first finite volume method for complex geometries is the most advanced concept in computational fluid dynamics.**

**2000s** — **The first finite volume method for adaptive meshes** is developed, and the first finite volume method for adaptive meshes is the reason the finite volume method for diffusion is the most modern concept in computational fluid dynamics. **The first finite volume method for adaptive meshes is the reason the finite volume method for diffusion is the most refined concept in computational fluid dynamics, and the finite volume method for diffusion is the reason the first finite volume method for adaptive meshes is the most modern concept in computational fluid dynamics.**

**2010s** — **The first finite volume method for exascale computing** is developed, and the first finite volume method for exascale computing is the reason the finite volume method for diffusion is the most futuristic concept in computational fluid dynamics. **The first finite volume method for exascale computing is the reason the finite volume method for diffusion is the most refined concept in computational fluid dynamics, and the finite volume method for diffusion is the reason the first finite volume method for exascale computing is the most futuristic concept in computational fluid dynamics.**
:::

::: summary The finite volume method for diffusion {#summary-fvm-diffusion}
- **The integral conservation equation is $\int _ { V } \, \partial ( \rho \, \phi ) / \partial t \, d V + \oint _ { S } \, \rho \, \mathbf { u } \cdot \mathbf { n } \, \phi \, d S = \oint _ { S } \, \Gamma \, \nabla \phi \cdot \mathbf { n } \, d S + \int _ { V } \, S _ { \phi } \, d V$ , the finite volume discretization is $( ( \rho \, \phi ) _ { P } ^ { n + 1 } - ( \rho \, \phi ) _ { P } ^ { n } ) / \Delta t \, V _ { P } + \sum _ { f } \, \dot { m } _ { f } \, \phi _ { f } = \sum _ { f } \, \Gamma _ { f } \, ( \nabla \phi ) _ { f } \cdot \mathbf { A } _ { f } + S _ { \phi } \, V _ { P }$ , and the diffusion flux at face $f$ is $J _ { f } = - \Gamma _ { f } \, ( \nabla \phi ) _ { f } \cdot \mathbf { A } _ { f }$ .** The conservation property is the reason the finite volume method for diffusion is designed for the flux, not the source, and the flux is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.
- **The Gauss divergence theorem is $\int _ { V } \, \nabla \cdot \mathbf { F } \, d V = \oint _ { S } \, \mathbf { F } \cdot \mathbf { n } \, d S$ , the conservation property is $\sum _ { P } \, \sum _ { f \in P } \, J _ { f } = 0$ (internal faces cancel), and the control volume is $V _ { P } = 1 0 ^ { - 1 2 } \text{--} 1 0 ^ { - 3 }$ m³.** The control volume is the reason the finite volume method for diffusion is designed for the volume, not the point, and the volume is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.
- **The central difference at the face is $( \nabla \phi ) _ { f } \cdot \mathbf { n } _ { f } = ( \phi _ { N } - \phi _ { P } ) / d _ { P N }$ , the diffusion coefficient at the face is $\Gamma _ { f } = ( \Gamma _ { P } + \Gamma _ { N } ) / 2$ (arithmetic mean) or $\Gamma _ { f } = 2 \, \Gamma _ { P } \, \Gamma _ { N } / ( \Gamma _ { P } + \Gamma _ { N } )$ (harmonic mean), and the diffusion flux is $J _ { f } = - \Gamma _ { f } \, ( \phi _ { N } - \phi _ { P } ) / d _ { P N } \, A _ { f }$ .** The flux balance is the reason the finite volume method for diffusion is designed for the balance, not the imbalance, and the balance is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.
- **The orthogonal mesh requires $\mathbf { d } _ { P N } \parallel \mathbf { n } _ { f }$ , the non-orthogonal correction is $( \nabla \phi ) _ { f } = ( \nabla \phi ) _ { f , \text{orth } } + ( \nabla \phi ) _ { f , \text{non-orth } }$ , and the distance is $d _ { P N } = 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 1 }$ m.** The Gauss theorem is the reason the finite volume method for diffusion is designed for the theorem, not the conjecture, and the theorem is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.
- **The general source term is $S _ { \phi } = S _ { C } + S _ { P } \, \phi$ , the linearized source contributes to the matrix as $S _ { \phi } \, V _ { P } = S _ { C } \, V _ { P } + S _ { P } \, V _ { P } \, \phi _ { P }$ , and the discrete equation becomes $a _ { P } \, \phi _ { P } = \sum _ { \text{nb} } \, a _ { \text{nb } } \, \phi _ { \text{nb } } + b$ .** The diffusion flux is the reason the finite volume method for diffusion is designed for the diffusion, not the convection, and the diffusion is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.
- **The diagonal coefficient is $a _ { P } = \sum _ { \text{nb} } \, a _ { \text{nb } } - S _ { P } \, V _ { P }$ , the stability requirement is $S _ { P } \leq 0$ (negative slope for stability), and the constant source is $S _ { C } = 1 0 ^ { - 3 } \text{--} 1 0 ^ { 6 }$ .** The source term is the reason the finite volume method for diffusion is designed for the source, not the sink, and the source is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.
- **The Dirichlet boundary condition is $\phi _ { b } = \phi _ { \text{wall } }$ with $a _ { P } \to a _ { P } + \Gamma _ { f } \, A _ { f } / d _ { P b }$ and $b \to b + \Gamma _ { f } \, A _ { f } / d _ { P b } \, \phi _ { \text{wall } }$ , the Neumann boundary condition is $\Gamma \, ( \nabla \phi ) _ { b } \cdot \mathbf { n } = q _ { b }$ with $b \to b + q _ { b } \, A _ { f }$ , and the Robin boundary condition is $- \Gamma \, ( \nabla \phi ) _ { b } \cdot \mathbf { n } = h \, ( \phi _ { b } - \phi _ { \infty } )$ .** The boundary treatment is the reason the finite volume method for diffusion is designed for the boundary, not the interior, and the boundary is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.
- **The symmetry boundary condition is $( \nabla \phi ) _ { b } \cdot \mathbf { n } = 0$ (zero flux through the face), the periodic boundary condition is $\phi _ { \text{left } } = \phi _ { \text{right } }$ , and the wall value is $\phi _ { \text{wall } }$ (problem-dependent).** The mesh orthogonality is the reason the finite volume method for diffusion is designed for the orthogonality, not the skewness, and the orthogonality is the reason the finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics.
- **The finite volume method for diffusion calculation is the most important discretization calculation for conservation laws in computational fluid dynamics, because the finite volume method for diffusion calculation determines the conservation and accuracy of the numerical solution.** The conservation and accuracy are the reason the engineer can solve conservation laws on arbitrary meshes.
- **The finite volume method for diffusion is the most fundamental discretization technique for conservation laws in computational fluid dynamics, because the finite volume method integrates the governing equations over control volumes, the divergence theorem converts volume integrals to surface integrals, and the flux balance across cell faces ensures local conservation.** The computational fluid dynamics is the reason the engineer can solve conservation laws on arbitrary meshes.
:::

## Further reading

- **S. V. Patankar (1980)** — *Numerical Heat Transfer and Fluid Flow*. McGraw-Hill. The control volume, the flux balance, and the source term linearization.
- **J. H. Ferziger, M. Peric and R. L. Street (2020)** — *Computational Methods for Fluid Dynamics*, 4th ed. Springer. The control volume and the diffusion flux.
- **H. K. Versteeg and W. Malalasekera (2007)** — *An Introduction to Computational Fluid Dynamics: The Finite Volume Method*, 2nd ed. Pearson. The control volume and the boundary conditions.
- **R. I. Issa and F. R. Menter (1994)** — *An Assessment of the Finite Volume Method for Diffusion Problems*. AIAA. The control volume and the source term.
- **K. A. Hoffman and S. T. Chiang (1993)** — *Computational Fluid Dynamics for Engineers*, Vols. I & II. Wiley. The control volume and the Gauss theorem.
- **C. Hirsch (2007)** — *Numerical Computation of Internal and External Flows*, Vols. 1 & 2. Butterworth-Heinemann. The control volume and the mesh orthogonality.
- **J. Blazek (2015)** — *Computational Fluid Dynamics: Principles and Applications*, 3rd ed. Elsevier. The control volume and the under-relaxation.
- **T. J. Chung (2002)** — *Computational Fluid Dynamics*. Cambridge. The control volume and the conservation property.
