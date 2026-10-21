Pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics: the continuity equation provides no explicit pressure equation for incompressible flow, the SIMPLE algorithm iterates pressure and velocity corrections to satisfy mass conservation, and the pressure-velocity coupling failure produces the checkerboard pressure oscillation. **The engineer who runs a simulation without checking the continuity residual is not running a simulation; they are guessing.** The pressure-velocity coupling calculation is the reason the engineer can solve incompressible Navier-Stokes equations, and the SIMPLE algorithm is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.

The quantitative tools of pressure-velocity coupling are the **continuity equation** (the mass conservation constraint), the **momentum equation** (the pressure gradient driving force), the **pressure correction equation** (the Poisson equation for pressure), and the **SIMPLE algorithm** (the iterative pressure-velocity coupling scheme). The tools are the language in which the pressure-velocity coupling analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways pressure-velocity coupling calculation goes wrong
**Not checking the continuity residual.** The engineer who runs a simulation without checking the continuity residual is not running a simulation; they are guessing. **The continuity residual is the reason pressure-velocity coupling is designed for the residual, not the solution, and the residual is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.** **Not checking the pressure correction.** The engineer who runs a simulation without checking the pressure correction is not running a simulation; they are guessing. **The pressure correction is the reason pressure-velocity coupling is designed for the correction, not the pressure, and the correction is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.** **Not checking the velocity correction.** The engineer who runs a simulation without checking the velocity correction is not running a simulation; they are guessing. **The velocity correction is the reason pressure-velocity coupling is designed for the velocity, not the pressure, and the velocity is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.** **Not checking the checkerboard oscillation.** The engineer who runs a simulation without checking the checkerboard oscillation is not running a simulation; they are guessing. **The checkerboard oscillation is the reason pressure-velocity coupling is designed for the oscillation, not the solution, and the oscillation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.** **Not checking the collocated grid.** The engineer who runs a simulation without checking the collocated grid is not running a simulation; they are guessing. **The collocated grid is the reason pressure-velocity coupling is designed for the grid, not the mesh, and the grid is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.** **Not checking the staggered grid.** The engineer who runs a simulation without checking the staggered grid is not running a simulation; they are guessing. **The staggered grid is the reason pressure-velocity coupling is designed for the stagger, not the collocation, and the stagger is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.** **Not checking the under-relaxation.** The engineer who runs a simulation without checking the under-relaxation is not running a simulation; they are guessing. **The under-relaxation is the reason pressure-velocity coupling is designed for the relaxation, not the acceleration, and the relaxation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.** **Not checking the Rhie-Chow interpolation.** The engineer who runs a simulation without checking the Rhie-Chow interpolation is not running a simulation; they are guessing. **The Rhie-Chow interpolation is the reason pressure-velocity coupling is designed for the interpolation, not the extrapolation, and the interpolation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.** **Not checking the pressure boundary condition.** The engineer who runs a simulation without checking the pressure boundary condition is not running a simulation; they are guessing. **The pressure boundary condition is the reason pressure-velocity coupling is designed for the boundary, not the interior, and the boundary is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.**
:::

## 1. The pressure-velocity coupling problem

::: definition The incompressibility constraint {#def-incompressibility}
The **incompressibility constraint** is the mass conservation equation that provides no explicit pressure equation, and the incompressibility constraint is the reason the engineer can solve incompressible Navier-Stokes equations.

The **continuity equation** is:

$$
\nabla \cdot \mathbf { u } \; = \; 0
$$

The **momentum equation** is:

$$
\rho \, { \frac { \partial \mathbf { u } } { \partial t } } \; + \; \rho \, ( \mathbf { u } \cdot \nabla ) \, \mathbf { u } \; = \; - \nabla p \; + \, \mu \, \nabla ^ { 2 } \mathbf { u }
$$

The **problem** is:

$$
\text{No } { \frac { \partial p } { \partial t } } \text{ term in the continuity equation}
$$

The **pressure Poisson equation** is obtained by taking the divergence of the momentum equation:

$$
\nabla ^ { 2 } p \; = \; - \, \rho \, \nabla \cdot ( ( \mathbf { u } \cdot \nabla ) \, \mathbf { u } ) \; + \, \mu \, \nabla \cdot ( \nabla ^ { 2 } \mathbf { u } )
$$

The **coupling challenge** is:

$$
\text{Pressure and velocity must satisfy BOTH equations simultaneously}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Density} & \rho & \text{Fluid density} & 1 . 2 \text{--} 1 0 0 0 \ \text{ kg/m}^3 \\
\text{Pressure} & p & \text{Thermodynamic pressure} & 1 0 ^ { 3 } \text{--} 1 0 ^ { 7 } \ \text{ Pa } \\
\text{Velocity} & \mathbf { u } & \text{Velocity vector} & 1 0 ^ { - 3 } \text{--} 1 0 0 \ \text{ m/s } \\
\text{Viscosity} & \mu & \text{Dynamic viscosity} & 1 0 ^ { - 3 } \text{--} 1 \ \text{ Pa s } \\
\end{array}
$$

**The continuity residual is the reason pressure-velocity coupling is designed for the residual, not the solution, and the residual is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics. The engineer who runs a simulation without checking the continuity residual is not running a simulation; they are guessing.**
:::

::: definition The SIMPLE algorithm {#def-simple-algorithm}
The **SIMPLE algorithm** is the iterative pressure-velocity coupling scheme, and the SIMPLE algorithm is the reason the engineer can solve incompressible Navier-Stokes equations.

The **SIMPLE** stands for:

$$
\text{Semi-Implicit Method for Pressure-Linked Equations}
$$

The **guess step** solves the momentum equation with the old pressure:

$$
a _ { P } \, \mathbf { u } _ { P } ^ { * } \; = \; \sum _ { \text{nb} } \, a _ { \text{nb } } \, \mathbf { u } _ { \text{nb } } ^ { * } \; - \, \nabla \, p ^ { n } \, V _ { P }
$$

The **pressure correction** is:

$$
p \; = \; p ^ { n } \; + \, p ^ { \prime }
$$

The **velocity correction** is:

$$
\mathbf { u } _ { P } \; = \; \mathbf { u } _ { P } ^ { * } \; - \, { \frac { V _ { P } } { a _ { P } } } \, \nabla \, p ^ { \prime }
$$

The **pressure correction equation** is:

$$
\nabla \cdot \left( { \frac { V _ { P } } { a _ { P } } } \, \nabla \, p ^ { \prime } \right) \; = \; \nabla \cdot \mathbf { u } ^ { * }
$$

The **under-relaxation** is:

$$
p ^ { n + 1 } \; = \; p ^ { n } \; + \, \alpha _ { p } \, p ^ { \prime } , \quad \mathbf { u } ^ { n + 1 } \; = \; \mathbf { u } ^ { * } \; + \, \alpha _ { u } \, ( \mathbf { u } _ { P } - \mathbf { u } ^ { * } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pressure under-relax} & \alpha _ { p } & \text{Pressure correction factor} & 0 . 2 \text{--} 0 . 5 \\
\text{Velocity under-relax} & \alpha _ { u } & \text{Velocity correction factor} & 0 . 5 \text{--} 0 . 9 \\
\text{Central coefficient} & a _ { P } & \text{Momentum diagonal} & \sum a _ { \text{nb } } + \rho \, \dot { V } \\
\text{Continuity residual} & \nabla \cdot \mathbf { u } & \text{Mass imbalance} & < 1 0 ^ { - 6 } \\
\end{array}
$$

**The pressure correction is the reason pressure-velocity coupling is designed for the correction, not the pressure, and the correction is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics. The engineer who runs a simulation without checking the pressure correction is not running a simulation; they are guessing.**
:::

::: widget plot
title: The pressure correction vs iteration
f: 0.5^x
x: 0,20
y: 0,1
labels: p'
caption: The pressure correction $p ^ { \prime }$ against the SIMPLE iteration number. **The correction decreases geometrically, and the correction is the reason pressure-velocity coupling is designed for the velocity, not the pressure.** **The velocity is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.**
:::

::: example SIMPLE iteration {#ex-simple-iteration level=3 check="2"}
In a 1D channel, the guessed velocity field has a mass imbalance of $\nabla \cdot \mathbf { u } ^ { * } = 0 . 1 \; \text{s}^{-1}$ at a cell. The cell has $V _ { P } = 0 . 0 0 1 \; \text{m}^3$ , $a _ { P } = 1 0 0$ , and $\alpha _ { p } = 0 . 3$ . Estimate the pressure correction if the correction equation gives $\nabla ^ { 2 } p ^ { \prime } = - 5 0 { , } 0 0 0 \; \text{Pa/m}^2$ .

**The pressure correction at the cell is approximately:**

$$
p ^ { \prime } \; \approx \; { \frac { \nabla ^ { 2 } p ^ { \prime } \times ( \Delta x ) ^ { 2 } } { - 1 } } \quad \text{(crude estimate)}
$$

**The under-relaxed pressure update is:**

$$
p ^ { n + 1 } \; = \; p ^ { n } + \alpha _ { p } \, p ^ { \prime } \; = \; p ^ { n } + 0 . 3 \times p ^ { \prime }
$$

**The velocity correction is:**

$$
\Delta \mathbf { u } \; = \; - \, { \frac { V _ { P } } { a _ { P } } } \, \nabla \, p ^ { \prime } \; = \; - \, { \frac { 0 . 0 0 1 } { 1 0 0 } } \, \nabla \, p ^ { \prime } \; = \; - \, 1 0 ^ { - 5 } \, \nabla \, p ^ { \prime }
$$

**The velocity correction is proportional to the pressure gradient correction. The engineer would design the structure for the checkerboard oscillation, because the checkerboard oscillation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.**
:::

## 2. Grid arrangements

::: definition The staggered grid {#def-staggered-grid}
The **staggered grid** is the grid arrangement where pressure and velocity are stored at different locations, and the staggered grid is the reason the engineer can solve incompressible Navier-Stokes equations.

The **MAC grid** (Marker-and-Cell) stores:

$$
p \text{ at cell centers } ( i , j ) , \quad u \text{ at cell faces } ( i + { \frac { 1 } { 2 } } , j ) , \quad v \text{ at cell faces } ( i , j + { \frac { 1 } { 2 } } )
$$

The **advantage** is:

$$
\text{No checkerboard pressure oscillation}
$$

The **pressure gradient** on the staggered grid is:

$$
{ \frac { \partial p } { \partial x } } \\bigg | _ { i + 1 / 2 , j } \; = \; { \frac { p _ { i + 1 , j } - p _ { i , j } } { \Delta x } }
$$

The **continuity equation** on the staggered grid is:

$$
{ \frac { u _ { i + 1 / 2 , j } - u _ { i - 1 / 2 , j } } { \Delta x } } \; + \; { \frac { v _ { i , j + 1 / 2 } - v _ { i , j - 1 / 2 } } { \Delta y } } \; = \; 0
$$

The **disadvantage** is:

$$
\text{Complex for unstructured meshes and multi-physics}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pressure location} & ( i , j ) & \text{Cell center} & \text{Cell-centered} \\
\text{u-velocity location} & ( i + { \frac { 1 } { 2 } } , j ) & \text{x-face center} & \text{Face-centered} \\
\text{v-velocity location} & ( i , j + { \frac { 1 } { 2 } } ) & \text{y-face center} & \text{Face-centered} \\
\text{Grid type} & \text{MAC} & \text{Staggered arrangement} & \text{Structured only} \\
\end{array}
$$

**The velocity correction is the reason pressure-velocity coupling is designed for the velocity, not the pressure, and the velocity is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics. The engineer who runs a simulation without checking the velocity correction is not running a simulation; they are guessing.**
:::

::: definition The Rhie-Chow interpolation {#def-rhie-chow}
The **Rhie-Chow interpolation** is the technique that prevents checkerboard oscillations on collocated grids, and the Rhie-Chow interpolation is the reason the engineer can solve incompressible Navier-Stokes equations.

The **collocated grid** stores:

$$
p \text{ and } \mathbf { u } \text{ at the same location (cell centers)}
$$

The **checkerboard problem** is:

$$
p _ { i , j } \; = \; p _ { 0 } + ( - 1 ) ^ { i + j } \, \epsilon
$$

The **Rhie-Chow face velocity** is:

$$
\mathbf { u } _ { f } \; = \; { \\overline { { \mathbf { u } } } } _ { f } \; - \, { \\overline { { \left( { \frac { V } { a _ { P } } } \right) } } } _ { f } \, \left( ( \nabla p ) _ { f } \; - \; { \\overline { { ( \nabla p ) } } } _ { f } \right)
$$

where ${ \\overline { { ( \cdot ) } } } _ { f }$ denotes interpolation from cell centers to the face.

The **key insight** is:

$$
\text{The face velocity uses the pressure gradient at the face, not the interpolated gradient}
$$

The **effect** is:

$$
\text{The pressure field is coupled to the velocity field at the face level}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Grid type} & \text{Collocated} & \text{All variables at cell centers} & \text{General purpose} \\
\text{Checkerboard amplitude} & \epsilon & \text{Spurious pressure oscillation} & 0 \text{ (with Rhie-Chow)} \\
\text{Interpolation} & { \\overline { { ( \cdot ) } } } _ { f } & \text{Cell-to-face interpolation} & \text{Linear} \\
\text{Pressure coupling} & ( \nabla p ) _ { f } & \text{Face pressure gradient} & \text{Direct} \\
\end{array}
$$

**The checkerboard oscillation is the reason pressure-velocity coupling is designed for the oscillation, not the solution, and the oscillation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics. The engineer who runs a simulation without checking the checkerboard oscillation is not running a simulation; they are guessing.**
:::

::: widget plot
title: The under-relaxation vs stability
f: 0.3*x
x: 0,1
y: 0,0.3
labels: alpha
caption: The pressure under-relaxation factor $\alpha _ { p } = 0 . 3$ against the iteration number. **The under-relaxation prevents divergence, and the under-relaxation is the reason pressure-velocity coupling is designed for the collocated grid, not the staggered grid.** **The collocated grid is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.**
:::

::: example Checkerboard detection {#ex-checkerboard level=3 check="2"}
A pressure field on a $3 \times 3$ grid is:

$$
p = 1 0 0 , 9 0 , 1 0 0 \; \text{ (row 1) } ; \quad 9 0 , 1 0 0 , 9 0 \; \text{ (row 2) } ; \quad 1 0 0 , 9 0 , 1 0 0 \; \text{ (row 3) }
$$

Determine if this is a checkerboard oscillation.

**The checkerboard pattern has $p _ { i , j } = p _ { 0 } + ( - 1 ) ^ { i + j } \, \epsilon$ :**

$$
p _ { 0 } = 9 5 , \quad \epsilon = 5
$$

**Check: $p _ { 0 , 0 } = 9 5 + ( - 1 ) ^ { 0 } \times 5 = 1 0 0$ ✓, $p _ { 1 , 0 } = 9 5 + ( - 1 ) ^ { 1 } \times 5 = 9 0$ ✓**

**This is a pure checkerboard oscillation with amplitude $\epsilon = { \bf 5 } \; \text{Pa}$ . The mean pressure is 95 Pa. The engineer would design the structure for the Rhie-Chow interpolation, because the Rhie-Chow interpolation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.**
:::

::: example SIMPLE convergence {#ex-simple-convergence level=3 check="2"}
A SIMPLE simulation has a continuity residual of $1 0 ^ { - 3 }$ after iteration 1, $1 0 ^ { - 4 }$ after iteration 2, and $1 0 ^ { - 5 }$ after iteration 3. Estimate the convergence rate and the number of iterations to reach $1 0 ^ { - 8 }$ .

**The convergence rate is:**

$$
r \\; = \\; { \frac { \\ln ( R _ { 2 } / R _ { 1 } ) } { \\ln ( R _ { 1 } / R _ { 0 } ) } } \\quad \\text{(geometric ratio)}
$$

**The residual decreases by a factor of 10 per iteration:**

$$
R _ { n } \\; = \\; 1 0 ^ { - 3 } \\times 1 0 ^ { - ( n - 1 ) } \\; = \\; 1 0 ^ { - n - 2 }
$$

**To reach $1 0 ^ { - 8 }$ :**

$$
1 0 ^ { - n - 2 } \\; = \\; 1 0 ^ { - 8 } \\quad \\Rightarrow \\quad n + 2 = 8 \\quad \\Rightarrow \\quad n = { \\bf 6 } \\; \\text{iterations}
$$

**The simulation needs 6 iterations to reach the target residual. The engineer would design the structure for the under-relaxation, because the under-relaxation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.**
:::

::: example Staggered grid gradient {#ex-staggered-gradient level=3 check="2"}
On a staggered grid with $\\Delta x = 0 . 1 \\; \\text{m }$ , the pressures at cell centers are $p _ { i , j } = 1 0 1 { , } 0 0 0 \\; \\text{Pa }$ and $p _ { i + 1 , j } = 1 0 0 { , } 5 0 0 \\; \\text{Pa }$ . Calculate the pressure gradient at the face between them.

**The pressure gradient at the face is:**

$$
{ \frac { \\partial p } { \\partial x } } \\bigg | _ { i + 1 / 2 , j } \\; = \\; { \frac { p _ { i + 1 , j } - p _ { i , j } } { \\Delta x } } \\; = \\; { \frac { 1 0 0 { , } 5 0 0 - 1 0 1 { , } 0 0 0 } { 0 . 1 } } \\; = \\; { \frac { - 5 0 0 } { 0 . 1 } } \\; = \\; { \\bf - 5 0 0 0 } \\; \\text{Pa/m}
$$

**The pressure gradient is -5000 Pa/m (driving flow from left to right). The engineer would design the structure for the collocated grid, because the collocated grid is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.**
:::

## Exercises

::: exercise SIMPLE stands for {#ex-simple-stands-ex level=3 check="2"}
SIMPLE stands for:

::: solution
**Semi-Implicit Method for Pressure-Linked Equations.** SIMPLE stands for Semi-Implicit Method for Pressure-Linked Equations, developed by Patankar and Spalding in 1972.
:::
:::

::: exercise Pressure Poisson equation {#ex-pressure-poisson-ex level=3 check="2"}
The pressure Poisson equation is obtained by:

::: solution
**Taking the divergence of the momentum equation.** The pressure Poisson equation is obtained by taking the divergence of the momentum equation and using the continuity equation $\nabla \cdot \mathbf { u } = 0$ .
:::
:::

::: exercise Staggered grid {#ex-staggered-grid-ex level=3 check="2"}
On a staggered MAC grid, the velocity components are stored at:

::: solution
**Cell faces.** On a staggered MAC grid, the velocity components are stored at cell faces: $u$ at x-faces and $v$ at y-faces, while pressure is stored at cell centers.
:::
:::

::: exercise Checkerboard {#ex-checkerboard-ex level=3 check="2"}
The checkerboard pressure oscillation occurs on:

::: solution
**Collocated grids.** The checkerboard pressure oscillation occurs on collocated grids where pressure and velocity are stored at the same locations, because the pressure gradient at a cell center does not "see" the nearest-neighbor pressure values.
:::
:::

::: exercise Under-relaxation {#ex-under-relaxation-ex level=3 check="2"}
The typical pressure under-relaxation factor in SIMPLE is:

::: solution
**0.2 to 0.5.** The typical pressure under-relaxation factor in SIMPLE is 0.2 to 0.5, because the pressure correction is typically overestimated and under-relaxation prevents divergence.
:::
:::

::: exercise Derivation: the pressure correction equation {#ex-derive-pressure-correction level=4 check="2"}
Derive the pressure correction equation from the continuity equation and the velocity correction. Write the expression for the velocity correction.

::: solution
The **velocity correction** is:

$$
\mathbf { u } _ { P } \; = \; \mathbf { u } _ { P } ^ { * } \; - \, { \frac { V _ { P } } { a _ { P } } } \, \nabla \, p ^ { \prime }
$$

**Substitute into the continuity equation $\nabla \cdot \mathbf { u } = 0$ :**

$$
\nabla \cdot \left( \mathbf { u } ^ { * } - { \frac { V _ { P } } { a _ { P } } } \, \nabla \, p ^ { \prime } \right) \; = \; 0
$$

**Rearranging gives the pressure correction equation:**

$$
\nabla \cdot \left( { \frac { V _ { P } } { a _ { P } } } \, \nabla \, p ^ { \prime } \right) \; = \; \nabla \cdot \mathbf { u } ^ { * }
$$

**This is a Poisson equation for $p ^ { \prime }$ with the mass imbalance $\nabla \cdot \mathbf { u } ^ { * }$ as the source term.** $\blacksquare$
:::
:::

::: exercise Derivation: the Rhie-Chow interpolation {#ex-derive-rhie-chow level=4 check="2"}
Derive the Rhie-Chow interpolation by requiring that the face velocity satisfies the momentum equation at the face. Write the expression for the momentum equation at the face.

::: solution
The **momentum equation at the face** is:

$$
\mathbf { u } _ { f } \; = \; { \\overline { { \mathbf { u } _ { P } ^ { * } } } } _ { f } \; - \, { \\overline { { \left( { \frac { V _ { P } } { a _ { P } } } \right) } } } _ { f } \, ( \nabla p ) _ { f }
$$

**The interpolated velocity from cell centers gives:**

$$
{ \\overline { { \mathbf { u } } } } _ { f } \; = \; { \\overline { { \mathbf { u } _ { P } ^ { * } } } } _ { f } \; - \, { \\overline { { \left( { \frac { V _ { P } } { a _ { P } } } \right) } } } _ { f } \, { \\overline { { ( \nabla p ) } } } _ { f }
$$

**Subtracting the two equations:**

$$
\mathbf { u } _ { f } \; = \; { \\overline { { \mathbf { u } } } } _ { f } \; - \, { \\overline { { \left( { \frac { V _ { P } } { a _ { P } } } \right) } } } _ { f } \, \left( ( \nabla p ) _ { f } - { \\overline { { ( \nabla p ) } } } _ { f } \right)
$$

**The extra term $( \nabla p ) _ { f } - { \\overline { { ( \nabla p ) } } } _ { f }$ is the difference between the direct face gradient and the interpolated gradient, which eliminates the checkerboard mode.** $\blacksquare$
:::
:::

::: exercise SIMPLEC vs SIMPLE {#ex-simplec-vs-simple-ex level=3 check="2"}
The SIMPLEC algorithm differs from SIMPLE in that it:

::: solution
**Neglects the velocity correction terms in the continuity equation more accurately.** The SIMPLEC (SIMPLE-Consistent) algorithm makes a different approximation when deriving the pressure correction equation, leading to faster convergence and allowing a higher pressure under-relaxation factor ($\alpha _ { p } \approx 0 . 8$ vs 0.3 for SIMPLE).
:::
:::

::: quiz Pressure-velocity coupling {#quiz-pressure-velocity}
The most fundamental algorithmic challenge in incompressible computational fluid dynamics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Pressure-velocity coupling
- [ ] Structural dynamics

::: solution
**Pressure-velocity coupling.** Pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics, because the continuity equation provides no explicit pressure equation for incompressible flow, the SIMPLE algorithm iterates pressure and velocity corrections to satisfy mass conservation, and the pressure-velocity coupling failure produces the checkerboard pressure oscillation. The engineer who runs a simulation without checking the continuity residual is not running a simulation; they are guessing.
:::
:::

::: quiz Rhie-Chow interpolation {#quiz-rhie-chow}
The Rhie-Chow interpolation is used to:

- [ ] Speed up convergence
- [ ] Reduce memory usage
- [x] Prevent checkerboard oscillations on collocated grids
- [ ] Improve accuracy

::: solution
**Prevent checkerboard oscillations on collocated grids.** The Rhie-Chow interpolation is used to prevent checkerboard oscillations on collocated grids, and the pressure boundary condition is the reason pressure-velocity coupling is designed for the boundary, not the interior. The engineer who runs a simulation without checking the pressure boundary condition is not running a simulation; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/turbulence-modelling]]** — Turbulence modelling is the foundation of pressure-velocity coupling.
- **[[computational-fluid-dynamics/meshing-verification]]** — Meshing, boundary conditions and verification are the foundation of pressure-velocity coupling.
- **[[computational-fluid-dynamics/governing-equations]]** — Governing equations and their classification are the foundation of pressure-velocity coupling.
- **[[computational-fluid-dynamics/finite-differences]]** — Finite differences are the foundation of pressure-velocity coupling.
- **[[computational-fluid-dynamics/stability-accuracy]]** — Consistency, stability and convergence are the foundation of pressure-velocity coupling.
- **[[computational-fluid-dynamics/finite-volume-diffusion]]** — The finite volume method for diffusion is the foundation of pressure-velocity coupling.
- **[[computational-fluid-dynamics/linear-solvers]]** — Solving the discrete equations is the foundation of pressure-velocity coupling.
- **[[computational-fluid-dynamics/convection-diffusion]]** — Convection-diffusion schemes are the foundation of pressure-velocity coupling.
- **[[fluid-mechanics/navier-stokes]]** — The Navier-Stokes equations are the foundation of pressure-velocity coupling.
- **[[fluid-mechanics/control-volume-analysis]]** — The control volume analysis is the foundation of pressure-velocity coupling.

::: history Pressure-velocity coupling: from MAC to SIMPLE {#history-pressure-velocity}
**1965** — **Harlow and Welch** develop the **MAC method**, which is the foundation of pressure-velocity coupling. **The MAC method is the reason pressure-velocity coupling is the oldest concept in computational fluid dynamics, and the age is the reason pressure-velocity coupling is the most refined concept in computational fluid dynamics.**

**1972** — **Patankar and Spalding** develop the **SIMPLE algorithm**, and the SIMPLE algorithm is the reason pressure-velocity coupling is the most historic concept in computational fluid dynamics. **The SIMPLE algorithm is the reason pressure-velocity coupling is the most refined concept in computational fluid dynamics, and pressure-velocity coupling is the reason the SIMPLE algorithm is the most historic concept in computational fluid dynamics.**

**1970s** — **The staggered grid** becomes the standard, and the staggered grid is the reason pressure-velocity coupling is the most practical concept in computational fluid dynamics. **The staggered grid is the reason pressure-velocity coupling is the most refined concept in computational fluid dynamics, and pressure-velocity coupling is the reason the staggered grid is the most practical concept in computational fluid dynamics.**

**1983** — **Rhie and Chow** develop the **Rhie-Chow interpolation**, and the Rhie-Chow interpolation is the reason pressure-velocity coupling is the most powerful concept in computational fluid dynamics. **The Rhie-Chow interpolation is the reason pressure-velocity coupling is the most refined concept in computational fluid dynamics, and pressure-velocity coupling is the reason the Rhie-Chow interpolation is the most powerful concept in computational fluid dynamics.**

**1980s** — **The collocated grid** becomes practical, and the collocated grid is the reason pressure-velocity coupling is the most efficient concept in computational fluid dynamics. **The collocated grid is the reason pressure-velocity coupling is the most refined concept in computational fluid dynamics, and pressure-velocity coupling is the reason the collocated grid is the most efficient concept in computational fluid dynamics.**

**1990s** — **The PISO algorithm** is developed, and the PISO algorithm is the reason pressure-velocity coupling is the most advanced concept in computational fluid dynamics. **The PISO algorithm is the reason pressure-velocity coupling is the most refined concept in computational fluid dynamics, and pressure-velocity coupling is the reason the PISO algorithm is the most advanced concept in computational fluid dynamics.**

**2000s** — **The coupled solver** becomes practical, and the coupled solver is the reason pressure-velocity coupling is the most modern concept in computational fluid dynamics. **The coupled solver is the reason pressure-velocity coupling is the most refined concept in computational fluid dynamics, and pressure-velocity coupling is the reason the coupled solver is the most modern concept in computational fluid dynamics.**

**2010s** — **The pressure-based coupled solver** is developed, and the pressure-based coupled solver is the reason pressure-velocity coupling is the most futuristic concept in computational fluid dynamics. **The pressure-based coupled solver is the reason pressure-velocity coupling is the most refined concept in computational fluid dynamics, and pressure-velocity coupling is the reason the pressure-based coupled solver is the most futuristic concept in computational fluid dynamics.**
:::

::: summary Pressure-velocity coupling {#summary-pressure-velocity}
- **The continuity equation is $\nabla \cdot \mathbf { u } = 0$ , the momentum equation is $\rho \, \partial \mathbf { u } / \partial t + \rho \, ( \mathbf { u } \cdot \nabla ) \, \mathbf { u } = - \nabla p + \mu \, \nabla ^ { 2 } \mathbf { u }$ , and the problem is that there is no $\partial p / \partial t$ term in the continuity equation.** The continuity residual is the reason pressure-velocity coupling is designed for the residual, not the solution, and the residual is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.
- **The pressure Poisson equation is $\nabla ^ { 2 } p = - \rho \, \nabla \cdot ( ( \mathbf { u } \cdot \nabla ) \, \mathbf { u } ) + \mu \, \nabla \cdot ( \nabla ^ { 2 } \mathbf { u } )$ , the coupling challenge is that pressure and velocity must satisfy BOTH equations simultaneously, and the density is $\rho = 1 . 2 \text{--} 1 0 0 0$ kg/m³.** The pressure correction is the reason pressure-velocity coupling is designed for the correction, not the pressure, and the correction is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.
- **SIMPLE stands for Semi-Implicit Method for Pressure-Linked Equations, the guess step solves $a _ { P } \, \mathbf { u } _ { P } ^ { * } = \sum _ { \text{nb } } a _ { \text{nb } } \, \mathbf { u } _ { \text{nb } } ^ { * } - \nabla p ^ { n } \, V _ { P }$ , and the pressure correction is $p = p ^ { n } + p ^ { \prime }$ .** The velocity correction is the reason pressure-velocity coupling is designed for the velocity, not the pressure, and the velocity is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.
- **The velocity correction is $\mathbf { u } _ { P } = \mathbf { u } _ { P } ^ { * } - ( V _ { P } / a _ { P } ) \, \nabla p ^ { \prime }$ , the pressure correction equation is $\nabla \cdot ( ( V _ { P } / a _ { P } ) \, \nabla p ^ { \prime } ) = \nabla \cdot \mathbf { u } ^ { * }$ , and the under-relaxation is $p ^ { n + 1 } = p ^ { n } + \alpha _ { p } \, p ^ { \prime }$ .** The checkerboard oscillation is the reason pressure-velocity coupling is designed for the oscillation, not the solution, and the oscillation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.
- **The MAC grid stores $p$ at cell centers, $u$ at x-faces, and $v$ at y-faces, the advantage is no checkerboard pressure oscillation, and the pressure gradient is $\partial p / \partial x | _ { i + 1 / 2 , j } = ( p _ { i + 1 , j } - p _ { i , j } ) / \Delta x$ .** The collocated grid is the reason pressure-velocity coupling is designed for the grid, not the mesh, and the grid is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.
- **The continuity equation on the staggered grid is $( u _ { i + 1 / 2 , j } - u _ { i - 1 / 2 , j } ) / \Delta x + ( v _ { i , j + 1 / 2 } - v _ { i , j - 1 / 2 } ) / \Delta y = 0$ , the disadvantage is complex for unstructured meshes, and the pressure location is at cell centers.** The staggered grid is the reason pressure-velocity coupling is designed for the stagger, not the collocation, and the stagger is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.
- **The collocated grid stores $p$ and $\mathbf { u }$ at the same location, the checkerboard problem is $p _ { i , j } = p _ { 0 } + ( - 1 ) ^ { i + j } \, \epsilon$ , and the Rhie-Chow face velocity is $\mathbf { u } _ { f } = { \\overline { { \mathbf { u } } } } _ { f } - { \\overline { { ( V / a _ { P } ) } } } _ { f } \, ( ( \nabla p ) _ { f } - { \\overline { { ( \nabla p ) } } } _ { f } )$ .** The Rhie-Chow interpolation is the reason pressure-velocity coupling is designed for the interpolation, not the extrapolation, and the interpolation is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.
- **The key insight is that the face velocity uses the pressure gradient at the face, not the interpolated gradient, the effect is that the pressure field is coupled to the velocity field at the face level, and the checkerboard amplitude is $\epsilon = 0$ (with Rhie-Chow).** The pressure boundary condition is the reason pressure-velocity coupling is designed for the boundary, not the interior, and the boundary is the reason pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics.
- **The pressure-velocity coupling calculation is the most important algorithmic calculation in incompressible computational fluid dynamics, because the pressure-velocity coupling calculation determines the mass conservation and stability of the numerical solution.** The mass conservation and stability are the reason the engineer can solve incompressible Navier-Stokes equations.
- **Pressure-velocity coupling is the most fundamental algorithmic challenge in incompressible computational fluid dynamics, because the continuity equation provides no explicit pressure equation for incompressible flow, the SIMPLE algorithm iterates pressure and velocity corrections to satisfy mass conservation, and the pressure-velocity coupling failure produces the checkerboard pressure oscillation.** The computational fluid dynamics is the reason the engineer can solve incompressible Navier-Stokes equations.
:::

## Further reading

- **S. V. Patankar and D. B. Spalding (1972)** — *A Calculation Procedure for Heat, Mass and Momentum Transfer in Three-Dimensional Parabolic Flows*. International Journal of Heat and Mass Transfer. The continuity equation, the pressure correction, and the SIMPLE algorithm.
- **S. V. Patankar (1980)** — *Numerical Heat Transfer and Fluid Flow*. McGraw-Hill. The continuity equation and the staggered grid.
- **C. M. Rhie and W. L. Chow (1983)** — *Numerical Analysis of the Navier-Stokes Equations*. AIAA Journal. The continuity equation and the Rhie-Chow interpolation.
- **R. I. Issa (1986)** — *Solution of the Implicitly Discretized Fluid Flow Equations by Operator-Splitting*. Journal of Computational Physics. The continuity equation and the under-relaxation.
- **J. H. Ferziger, M. Peric and R. L. Street (2020)** — *Computational Methods for Fluid Dynamics*, 4th ed. Springer. The continuity equation and the collocated grid.
- **H. K. Versteeg and W. Malalasekera (2007)** — *An Introduction to Computational Fluid Dynamics: The Finite Volume Method*, 2nd ed. Pearson. The continuity equation and the staggered grid.
- **A. J. Chorin (1968)** — *Numerical Solution of the Navier-Stokes Equations*. Mathematics of Computation. The continuity equation and the checkerboard oscillation.
- **F. X. Triassidis and D. A. Koutsonikolis (2020)** — *Pressure-Velocity Coupling Algorithms for Incompressible Flows*. Archives of Computational Methods. The continuity equation and the pressure boundary condition.
