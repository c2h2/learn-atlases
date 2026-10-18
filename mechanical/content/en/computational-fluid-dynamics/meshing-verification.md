Meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics: the grid convergence index quantifies the discretization error, the boundary condition type determines the physical fidelity of the simulation, and the verification and validation process separates numerical error from modeling error. **The engineer who runs a simulation without performing a grid convergence study is not running a simulation; they are guessing.** The meshing, boundary conditions and verification calculation is the reason the engineer can quantify the uncertainty in a CFD prediction, and the grid convergence index is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.

The quantitative tools of meshing, boundary conditions and verification are the **grid convergence index** (the GCI method for estimating discretization error), the **boundary condition taxonomy** (inlet, outlet, wall, symmetry, periodic), the **y+ requirement** (the near-wall mesh resolution), and the **Richardson extrapolation** (the grid-independent solution estimate). The tools are the language in which the meshing, boundary conditions and verification analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways meshing, boundary conditions and verification calculation goes wrong
**Not performing a grid convergence study.** The engineer who runs a simulation without performing a grid convergence study is not running a simulation; they are guessing. **The grid convergence index is the reason meshing, boundary conditions and verification are designed for the convergence, not the divergence, and the convergence is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.** **Not checking the boundary condition type.** The engineer who runs a simulation without checking the boundary condition type is not running a simulation; they are guessing. **The boundary condition type is the reason meshing, boundary conditions and verification are designed for the type, not the value, and the type is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.** **Not checking the y+ value.** The engineer who runs a simulation without checking the y+ value is not running a simulation; they are guessing. **The y+ value is the reason meshing, boundary conditions and verification are designed for the wall, not the free stream, and the wall is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.** **Not checking the aspect ratio.** The engineer who runs a simulation without checking the aspect ratio is not running a simulation; they are guessing. **The aspect ratio is the reason meshing, boundary conditions and verification are designed for the ratio, not the size, and the ratio is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.** **Not checking the skewness.** The engineer who runs a simulation without checking the skewness is not running a simulation; they are guessing. **The skewness is the reason meshing, boundary conditions and verification are designed for the skewness, not the orthogonality, and the skewness is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.** **Not checking the inflation layer.** The engineer who runs a simulation without checking the inflation layer is not running a simulation; they are guessing. **The inflation layer is the reason meshing, boundary conditions and verification are designed for the layer, not the core, and the layer is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.** **Not checking the mass balance.** The engineer who runs a simulation without checking the mass balance is not running a simulation; they are guessing. **The mass balance is the reason meshing, boundary conditions and verification are designed for the balance, not the imbalance, and the balance is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.** **Not checking the monitor points.** The engineer who runs a simulation without checking the monitor points is not running a simulation; they are guessing. **The monitor points are the reason meshing, boundary conditions and verification are designed for the points, not the lines, and the points are the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.** **Not checking the validation data.** The engineer who runs a simulation without checking the validation data is not running a simulation; they are guessing. **The validation data is the reason meshing, boundary conditions and verification are designed for the data, not the model, and the data is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.**
:::

## 1. Mesh quality metrics

::: definition The grid convergence index {#def-gci}
The **grid convergence index** is the method for estimating the discretization error from a series of grid refinements, and the grid convergence index is the reason the engineer can quantify the uncertainty in a CFD prediction.

The **Richardson extrapolation** is:

$$
f _ { h = 0 } \; = \; f _ { 1 } \; + \; { \\frac { f _ { 1 } - f _ { 2 } } { r ^ { p } - 1 } }
$$

where $r = h _ { 2 } / h _ { 1 }$ is the refinement ratio and $p$ is the observed order.

The **observed order of accuracy** is:

$$
p \; = \; { \\frac { 1 } { \ln ( r ) } } \, \ln \\! \\left( { \\frac { f _ { 3 } - f _ { 2 } } { f _ { 2 } - f _ { 1 } } } \\right)
$$

The **asymptotic range** requires:

$$
r \; > \; 1 . 1 \quad \text{(sufficient refinement ratio)}
$$

The **GCI (fine grid)** is:

$$
\text{GCI} _ { \text{fine } } \; = \; F _ { s } \, { \\frac { | f _ { 1 } - f _ { 2 } | } { r ^ { p } - 1 } }
$$

where $F _ { s } = 1 . 2 5$ is the factor of safety.

The **apparent order** is:

$$
p _ { \text{apparent } } \; = \; { \\frac { 1 } { \ln ( r ) } } \, \ln \\! \\left( { \\frac { f _ { 3 } - f _ { 2 } } { f _ { 2 } - f _ { 1 } } } \\right)
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Refinement ratio} & r & h _ { \text{coarse } } / h _ { \text{fine } } & 1 . 1 \text{--} 1 . 5 \\
\text{Observed order} & p & \text{Convergence rate} & 1 \text{--} 3 \\
\text{Factor of safety} & F _ { s } & \text{GCI safety factor} & 1 . 2 5 \\
\text{GCI} & \text{GCI} & \text{Relative error estimate} & < 1 \% \text{ (well-resolved)} \\
\end{array}
$$

**The grid convergence index is the reason meshing, boundary conditions and verification are designed for the convergence, not the divergence, and the convergence is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics. The engineer who runs a simulation without performing a grid convergence study is not running a simulation; they are guessing.**
:::

::: definition The mesh quality metrics {#def-mesh-quality}
The **mesh quality metrics** are the measures of cell shape and size that determine solution accuracy, and the mesh quality metrics are the reason the engineer can quantify the uncertainty in a CFD prediction.

The **aspect ratio** is:

$$
Q \; = \; { \\frac { h _ { \max } } { h _ { \min } } } \; \leq \; 1 0 \quad \text{(general),} \quad \leq \; 1 0 0 \quad \text{(boundary layers)}
$$

The **skewness** is:

$$
S \; = \; { \\frac { \theta _ { \max } - \theta _ { \text{ideal } } } { 1 8 0 ^ { \circ } - \theta _ { \text{ideal } } } } \; \leq \; 0 . 8 5
$$

The **orthogonal quality** is:

$$
Q _ { \text{orth } } \; = \; { \\frac { 4 \, \sqrt { A } } { \sum _ { f } | \mathbf { A } _ { f } | } } \quad \text{(2D)}
$$

The **equiangle skew** is:

$$
S _ { \text{eq } } \; = \; { \\frac { \theta _ { \max } - \theta _ { \text{ideal } } } { 1 8 0 ^ { \circ } - \theta _ { \text{ideal } } } }
$$

The **inflation layer growth rate** is:

$$
g \; = \; { \\frac { \Delta y _ { n + 1 } } { \Delta y _ { n } } } \; \leq \; 1 . 3
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Aspect ratio} & Q & h _ { \max } / h _ { \min } & \leq 1 0 \text{ (general)} \\
\text{Skewness} & S & \text{Deviation from ideal} & \leq 0 . 8 5 \\
\text{Growth rate} & g & \text{Inflation layer ratio} & \leq 1 . 3 \\
\text{Cell count} & N & \text{Total cells} & 1 0 ^ { 5 } \text{--} 1 0 ^ { 9 } \\
\end{array}
$$

**The boundary condition type is the reason meshing, boundary conditions and verification are designed for the type, not the value, and the type is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics. The engineer who runs a simulation without checking the boundary condition type is not running a simulation; they are guessing.**
:::

::: widget plot
title: The GCI vs refinement ratio
f: 1.25 / (x^2 - 1)
x: 1.01,2
y: 0,50
labels: GCI
caption: The grid convergence index $\text{GCI} = F _ { s } / ( r ^ { p } - 1 )$ for $p = 2$ and $F _ { s } = 1 . 2 5$ against the refinement ratio $r$ . **The GCI decreases with refinement ratio, and the GCI is the reason meshing, boundary conditions and verification are designed for the y+ value, not the aspect ratio.** **The y+ value is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.**
:::

::: example Grid convergence study {#ex-grid-convergence level=3 check="2"}
A drag coefficient is computed on three grids with refinement ratio $r = 1 . 3$ : $C _ { D , 1 } = 0 . 0 3 1 2$ (fine), $C _ { D , 2 } = 0 . 0 3 2 5$ (medium), $C _ { D , 3 } = 0 . 0 3 5 0$ (coarse). Calculate the observed order and the GCI.

**The observed order is:**

$$
p \; = \; { \\frac { 1 } { \ln ( 1 . 3 ) } } \, \ln \\! \\left( { \\frac { 0 . 0 3 5 0 - 0 . 0 3 2 5 } { 0 . 0 3 2 5 - 0 . 0 3 1 2 } } \\right) \; = \; { \\frac { 1 } { 0 . 2 6 2 4 } } \, \ln \\! \\left( { \\frac { 0 . 0 0 2 5 } { 0 . 0 0 1 3 } } \\right)
$$

$$
p \; = \; 3 . 8 1 \times \ln ( 1 . 9 2 3 ) \; = \; 3 . 8 1 \times 0 . 6 5 4 \; = \; { \\bf 2 . 4 9 }
$$

**The GCI (fine grid) is:**

$$
\text{GCI} \; = \; 1 . 2 5 \times { \\frac { | 0 . 0 3 1 2 - 0 . 0 3 2 5 | } { 1 . 3 ^ { 2 . 4 9 } - 1 } } \; = \; 1 . 2 5 \times { \\frac { 0 . 0 0 1 3 } { 1 . 8 2 - 1 } } \; = \; 1 . 2 5 \times { \\frac { 0 . 0 0 1 3 } { 0 . 8 2 } }
$$

$$
\text{GCI} \; = \; { \\bf 0 . 0 0 2 0 } \; = \; { \\bf 0 . 2 0 \ \% }
$$

**The GCI is 0.20%, indicating a well-resolved solution. The engineer would design the structure for the aspect ratio, because the aspect ratio is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.**
:::

## 2. Boundary conditions and verification

::: definition The boundary condition taxonomy {#def-bc-taxonomy}
The **boundary condition taxonomy** is the classification of boundary conditions by physical type, and the boundary condition taxonomy is the reason the engineer can quantify the uncertainty in a CFD prediction.

The **velocity inlet** specifies:

$$
\mathbf { u } \; = \; \mathbf { u } _ { \text{in } } , \quad k _ { \text{in } } , \quad \varepsilon _ { \text{in } } \quad \text{(or } I , \, l _ { \text{turb } } \\text{)}
$$

The **pressure outlet** specifies:

$$
p \; = \; p _ { \text{out } } , \quad { \\frac { \partial \mathbf { u } } { \partial n } } \; = \; 0
$$

The **no-slip wall** specifies:

$$
\mathbf { u } \; = \; 0 \quad \text{(at the wall)}
$$

The **symmetry** specifies:

$$
{ \\frac { \partial \mathbf { u } } { \partial n } } \; = \; 0 , \quad \mathbf { u } \cdot \mathbf { n } \; = \; 0
$$

The **periodic** specifies:

$$
\phi ( x + L , y ) \; = \; \phi ( x , y )
$$

The **pressure inlet** specifies:

$$
p _ { 0 } \; = \; p _ { \text{total } } , \quad \mathbf { n } \cdot \nabla \mathbf { u } \; = \; 0
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Inlet velocity} & u _ { \text{in } } & \text{Prescribed velocity} & 0 . 1 \text{--} 1 0 0 \ \text{ m/s } \\
\text{Outlet pressure} & p _ { \text{out } } & \text{Prescribed pressure} & 0 \text{--} 1 0 ^ { 6 } \ \text{ Pa (gauge)} \\
\text{Turbulence intensity} & I & u ^ { \prime } / { \bar { u } } & 0 . 0 1 \text{--} 0 . 1 \\
\text{Hydraulic diameter} & D _ { h } & \text{Length scale for } \varepsilon & 1 0 ^ { - 3 } \text{--} 1 \ \text{ m } \\
\end{array}
$$

**The y+ value is the reason meshing, boundary conditions and verification are designed for the wall, not the free stream, and the wall is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics. The engineer who runs a simulation without checking the y+ value is not running a simulation; they are guessing.**
:::

::: definition The verification and validation process {#def-vv-process}
The **verification and validation process** is the separation of numerical error from modeling error, and the verification and validation process is the reason the engineer can quantify the uncertainty in a CFD prediction.

The **verification** answers:

$$
\text{"Are we solving the equations correctly?"} \quad \text{(numerical accuracy)}
$$

The **validation** answers:

$$
\text{"Are we solving the correct equations?"} \quad \text{(physical fidelity)}
$$

The **numerical error** includes:

$$
\varepsilon _ { \text{num } } \; = \; \varepsilon _ { \text{discretization } } \; + \; \varepsilon _ { \text{iteration } } \; + \; \varepsilon _ { \text{round-off } }
$$

The **modeling error** includes:

$$
\varepsilon _ { \text{model } } \; = \; \varepsilon _ { \text{turbulence } } \; + \; \varepsilon _ { \text{chemistry } } \; + \; \varepsilon _ { \text{BC } }
$$

The **total uncertainty** is:

$$
U _ { \text{total } } \; = \; U _ { \text{numerical } } \; + \; U _ { \text{modeling } } \; + \; U _ { \text{input } }
$$

The **ASME V&V 20** standard defines the procedure.

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Discretization error} & \varepsilon _ { \text{disc } } & \text{Grid/time error} & < 1 \% \\
\text{Iteration error} & \varepsilon _ { \text{iter } } & \text{Convergence error} & < 0 . 1 \% \\
\text{Round-off error} & \varepsilon _ { \text{round } } & \text{Floating point error} & < 1 0 ^ { - 1 0 } \\
\text{Experimental uncertainty} & U _ { \text{exp } } & \text{Measurement error} & 1 \text{--} 5 \ \% \\
\end{array}
$$

**The aspect ratio is the reason meshing, boundary conditions and verification are designed for the ratio, not the size, and the ratio is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics. The engineer who runs a simulation without checking the aspect ratio is not running a simulation; they are guessing.**
:::

::: widget plot
title: The cell count vs error
f: 100 / pow(x, 0.6)
x: 1,100
y: 0,100
labels: error
caption: The discretization error against the cell count (normalized to 100 at 1 cell). **The error decreases as $N ^ { - 0 . 6 }$ , and the error is the reason meshing, boundary conditions and verification are designed for the skewness, not the orthogonality.** **The skewness is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.**
:::

::: example y+ mesh design {#ex-yplus-mesh level=3 check="2"}
Air flows over a flat plate with $u _ { \tau } = 1 . 5 \; \text{m/s }$ , $\nu = 1 . 5 \times 1 0 ^ { - 5 } \; \text{m}^2 \text{/s }$ . Design the first cell height for $y ^ { + } = 1$ .

**The required first cell height is:**

$$
\Delta y _ { 1 } \; = \; { \\frac { y ^ { + } \, \nu } { u _ { \tau } } } \; = \; { \\frac { 1 \times 1 . 5 \times 1 0 ^ { - 5 } } { 1 . 5 } } \; = \; { \\bf 1 0 ^ { - 5 } } \; \text{m } \; = \; { \\bf 1 0 } \; \mu \text{m }
$$

**With a growth rate of 1.2, the 10th cell height is:**

$$
\Delta y _ { 1 0 } \; = \; \Delta y _ { 1 } \times 1 . 2 ^ { 9 } \; = \; 1 0 \times 5 . 1 6 \; = \; { \\bf 5 1 . 6 } \; \mu \text{m }
$$

**The total inflation layer thickness after 10 layers is:**

$$
\delta _ { \text{layer } } \; = \; \Delta y _ { 1 } \times { \\frac { 1 . 2 ^ { 1 0 } - 1 } { 1 . 2 - 1 } } \; = \; 1 0 \times { \\frac { 6 . 1 9 - 1 } { 0 . 2 } } \; = \; 1 0 \times 2 5 . 95 \; = \; { \\bf 2 6 0 } \; \mu \text{m }
$$

**The engineer would design the structure for the inflation layer, because the inflation layer is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.**
:::

::: example Richardson extrapolation {#ex-richardson-calc level=3 check="2"}
A Nusselt number is computed as $Nu _ { 1 } = 1 0 5 . 2$ (fine grid), $Nu _ { 2 } = 1 0 8 . 8$ (medium grid), $Nu _ { 3 } = 1 1 6 . 4$ (coarse grid) with refinement ratio $r = 1 . 4$ . Estimate the grid-independent Nusselt number.

**The observed order is:**

$$
p \\; = \\; { \frac { 1 } { \\ln ( 1 . 4 ) } } \\, \\ln \\! \\left( { \frac { 1 1 6 . 4 - 1 0 8 . 8 } { 1 0 8 . 8 - 1 0 5 . 2 } } \\right) \\; = \\; { \frac { 1 } { 0 . 3 3 6 5 } } \\, \\ln \\! \\left( { \frac { 7 . 6 } { 3 . 6 } } \\right)
$$

$$
p \\; = \\; 2 . 9 7 \\times \\ln ( 2 . 1 1 1 ) \\; = \\; 2 . 9 7 \\times 0 . 7 47 \\; = \\; { \bf 2 . 2 2 }
$$

**The Richardson extrapolated value is:**

$$
Nu _ { h = 0 } \\; = \\; 1 0 5 . 2 \\; + \\; { \frac { 1 0 5 . 2 - 1 0 8 . 8 } { 1 . 4 ^ { 2 . 2 2 } - 1 } } \\; = \\; 1 0 5 . 2 \\; + \\; { \frac { - 3 . 6 } { 2 . 0 1 - 1 } }
$$

$$
Nu _ { h = 0 } \\; = \\; 1 0 5 . 2 - { \frac { 3 . 6 } { 1 . 0 1 } } \\; = \\; 1 0 5 . 2 - 3 . 56 \\; = \\; { \bf 1 0 1 . 6 }
$$

**The grid-independent Nusselt number is approximately 101.6. The engineer would design the structure for the validation data, because the validation data is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.**
:::

::: example Mesh quality check {#ex-mesh-quality-check level=3 check="2"}
A tetrahedral mesh has 2 million cells. The worst cell has angles $\\theta _ { \\min } = 5 ^ { \\circ }$ and $\\theta _ { \\max } = 1 6 0 ^ { \\circ }$ , and the ideal angle is $7 0 . 5 ^ { \\circ }$ . Calculate the maximum skewness and determine if the mesh is acceptable.

**The skewness is:**

$$
S \\; = \\; { \frac { \\theta _ { \\max } - \\theta _ { \\text{ideal } } } { 1 8 0 ^ { \\circ } - \\theta _ { \\text{ideal } } } } \\; = \\; { \frac { 1 6 0 - 7 0 . 5 } { 1 8 0 - 7 0 . 5 } } \\; = \\; { \frac { 8 9 . 5 } { 1 0 9 . 5 } } \\; = \\; { \bf 0 . 8 1 7 }
$$

**Since $S = 0 . 8 1 7 < 0 . 8 5$ , the mesh is acceptable but close to the limit.**

**The aspect ratio of the worst cell (if $h _ { \\max } = 2 \\; \\text{mm }$ and $h _ { \\min } = 0 . 1 \\; \\text{mm }$ ) is:**

$$
Q \\; = \\; { \frac { h _ { \\max } } { h _ { \\min } } } \\; = \\; { \frac { 2 } { 0 . 1 } } \\; = \\; { \bf 2 0 }
$$

**The aspect ratio of 20 exceeds the recommended limit of 10 for general regions but is acceptable in boundary layers. The engineer would design the structure for the grid convergence index, because the grid convergence index is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.**
:::

## Exercises

::: exercise GCI formula {#ex-gci-formula-ex level=3 check="2"}
The GCI uses a factor of safety $F _ { s }$ of:

::: solution
**1.25.** The GCI uses a factor of safety $F _ { s } = 1 . 2 5$ for three or more grids, which accounts for the uncertainty in the observed order of accuracy.
:::
:::

::: exercise Richardson extrapolation {#ex-richardson-ex level=3 check="2"}
The Richardson extrapolation estimates:

::: solution
**The grid-independent solution.** The Richardson extrapolation estimates the grid-independent solution $f _ { h = 0 }$ from solutions on two grids of different resolution.
:::
:::

::: exercise Skewness limit {#ex-skewness-limit-ex level=3 check="2"}
The maximum recommended skewness for CFD cells is:

::: solution
**0.85.** The maximum recommended skewness for CFD cells is 0.85, above which the solution accuracy degrades significantly and the simulation may diverge.
:::
:::

::: exercise No-slip wall {#ex-no-slip-wall-ex level=3 check="2"}
The no-slip wall boundary condition sets:

::: solution
**The velocity to zero at the wall.** The no-slip wall boundary condition sets $\mathbf { u } = 0$ at the wall, which is the physical condition for viscous flows at solid boundaries.
:::
:::

::: exercise Verification vs validation {#ex-verification-vs-validation-ex level=3 check="2"}
Verification answers the question:

::: solution
**"Are we solving the equations correctly?"** Verification addresses numerical accuracy (discretization, iteration, round-off errors), while validation addresses physical fidelity (turbulence model, chemistry model, boundary condition accuracy).
:::
:::

::: exercise Derivation: the GCI {#ex-derive-gci level=4 check="2"}
Derive the GCI from the Richardson extrapolation. Write the expression for the Richardson extrapolation.

::: solution
The **Richardson extrapolation** for a quantity $f$ on grids $h _ { 1 } < h _ { 2 } < h _ { 3 }$ is:

$$
f _ { h = 0 } \; = \; f _ { 1 } \; + \; { \\frac { f _ { 1 } - f _ { 2 } } { r ^ { p } - 1 } }
$$

**The extrapolated value differs from the fine-grid solution by:**

$$
\varepsilon _ { \text{extrap } } \; = \; { \\frac { f _ { 1 } - f _ { 2 } } { r ^ { p } - 1 } }
$$

**The relative error is:**

$$
e _ { a } ^ { 2 1 } \; = \; { \\frac { | f _ { 1 } - f _ { 2 } | } { | f _ { 1 } | } }
$$

**The GCI is the factor-of-safety multiplied by the relative error:**

$$
\text{GCI} _ { \text{fine } } \; = \; F _ { s } \, { \\frac { | f _ { 1 } - f _ { 2 } | } { | f _ { 1 } | \, ( r ^ { p } - 1 ) } }
$$

**where $F _ { s } = 1 . 2 5$ for three or more grids and $F _ { s } = 3 . 0$ for two grids.** $\blacksquare$
:::
:::

::: exercise Derivation: the observed order {#ex-derive-observed-order level=4 check="2"}
Derive the observed order of accuracy from three grid solutions. Write the expression for the discretization error model.

::: solution
The **discretization error model** assumes:

$$
f _ { h } \; = \; f _ { 0 } \; + \; C \, h ^ { p }
$$

**For three grids with refinement ratio $r = h _ { 2 } / h _ { 1 } = h _ { 3 } / h _ { 2 }$ :**

$$
f _ { 1 } \; = \; f _ { 0 } + C \, h _ { 1 } ^ { p } , \quad f _ { 2 } \; = \; f _ { 0 } + C \, ( r \, h _ { 1 } ) ^ { p } , \quad f _ { 3 } \; = \; f _ { 0 } + C \, ( r ^ { 2 } \, h _ { 1 } ) ^ { p }
$$

**Taking differences:**

$$
f _ { 2 } - f _ { 1 } \; = \; C \, h _ { 1 } ^ { p } \, ( r ^ { p } - 1 ) , \quad f _ { 3 } - f _ { 2 } \; = \; C \, h _ { 1 } ^ { p } \, r ^ { p } \, ( r ^ { p } - 1 )
$$

**The ratio gives:**

$$
{ \\frac { f _ { 3 } - f _ { 2 } } { f _ { 2 } - f _ { 1 } } } \; = \; r ^ { p }
$$

**Solving for $p$ :**

$$
p \; = \; { \\frac { 1 } { \ln ( r ) } } \, \ln \\! \\left( { \\frac { f _ { 3 } - f _ { 2 } } { f _ { 2 } - f _ { 1 } } } \\right)
$$

**This is the observed order of accuracy.** $\blacksquare$
:::
:::

::: exercise Mass balance {#ex-mass-balance-ex level=3 check="2"}
A converged CFD simulation should have a mass balance error of:

::: solution
**Less than 0.1%.** A converged CFD simulation should have a mass balance error of less than 0.1%, meaning the mass flow in equals the mass flow out to within 0.1%.
:::
:::

::: quiz Meshing, boundary conditions and verification {#quiz-meshing-verification}
The most fundamental quality assurance step in computational fluid dynamics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Meshing, boundary conditions and verification
- [ ] Structural dynamics

::: solution
**Meshing, boundary conditions and verification.** Meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics, because the grid convergence index quantifies the discretization error, the boundary condition type determines the physical fidelity of the simulation, and the verification and validation process separates numerical error from modeling error. The engineer who runs a simulation without performing a grid convergence study is not running a simulation; they are guessing.
:::
:::

::: exercise Inflation layer growth {#ex-inflation-growth-ex level=3 check="2"}
The maximum recommended inflation layer growth rate is:

::: solution
**1.3.** The maximum recommended inflation layer growth rate is 1.3, meaning each successive cell in the inflation layer should be no more than 30% larger than the previous one.
:::
:::

::: quiz Verification {#quiz-verification}
The verification and validation process separates:

- [ ] Input error from output error
- [x] Numerical error from modeling error
- [ ] Coarse grid from fine grid
- [ ] Laminar from turbulent flow

::: solution
**Numerical error from modeling error.** The verification and validation process separates numerical error from modeling error, and the monitor points are the reason meshing, boundary conditions and verification are designed for the points, not the lines. The engineer who runs a simulation without checking the monitor points is not running a simulation; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/governing-equations]]** — Governing equations and their classification are the foundation of meshing, boundary conditions and verification.
- **[[computational-fluid-dynamics/finite-differences]]** — Finite differences are the foundation of meshing, boundary conditions and verification.
- **[[computational-fluid-dynamics/stability-accuracy]]** — Consistency, stability and convergence are the foundation of meshing, boundary conditions and verification.
- **[[computational-fluid-dynamics/finite-volume-diffusion]]** — The finite volume method for diffusion is the foundation of meshing, boundary conditions and verification.
- **[[computational-fluid-dynamics/linear-solvers]]** — Solving the discrete equations is the foundation of meshing, boundary conditions and verification.
- **[[computational-fluid-dynamics/convection-diffusion]]** — Convection-diffusion schemes are the foundation of meshing, boundary conditions and verification.
- **[[computational-fluid-dynamics/pressure-velocity]]** — Pressure-velocity coupling is the foundation of meshing, boundary conditions and verification.
- **[[computational-fluid-dynamics/turbulence-modelling]]** — Turbulence modelling is the foundation of meshing, boundary conditions and verification.
- **[[finite-element-method/convergence-meshing]]** — The convergence and meshing are the foundation of meshing, boundary conditions and verification.
- **[[fluid-mechanics/dimensional-analysis]]** — The dimensional analysis is the foundation of meshing, boundary conditions and verification.

::: history Meshing, boundary conditions and verification: from Richardson to ASME V&V {#history-meshing-verification}
**1911** — **Richardson** publishes the **Richardson extrapolation**, which is the foundation of meshing, boundary conditions and verification. **The Richardson extrapolation is the reason meshing, boundary conditions and verification are the oldest concept in computational fluid dynamics, and the age is the reason meshing, boundary conditions and verification are the most refined concept in computational fluid dynamics.**

**1960s** — **The first structured meshes** are developed, and the first structured meshes are the reason meshing, boundary conditions and verification are the most historic concept in computational fluid dynamics. **The first structured meshes are the reason meshing, boundary conditions and verification are the most refined concept in computational fluid dynamics, and meshing, boundary conditions and verification are the reason the first structured meshes are the most historic concept in computational fluid dynamics.**

**1970s** — **The first unstructured meshes** are developed, and the first unstructured meshes are the reason meshing, boundary conditions and verification are the most practical concept in computational fluid dynamics. **The first unstructured meshes are the reason meshing, boundary conditions and verification are the most refined concept in computational fluid dynamics, and meshing, boundary conditions and verification are the reason the first unstructured meshes are the most practical concept in computational fluid dynamics.**

**1980s** — **The first boundary condition libraries** are developed, and the first boundary condition libraries are the reason meshing, boundary conditions and verification are the most powerful concept in computational fluid dynamics. **The first boundary condition libraries are the reason meshing, boundary conditions and verification are the most refined concept in computational fluid dynamics, and meshing, boundary conditions and verification are the reason the first boundary condition libraries are the most powerful concept in computational fluid dynamics.**

**1990s** — **The first mesh quality metrics** are standardized, and the first mesh quality metrics are the reason meshing, boundary conditions and verification are the most efficient concept in computational fluid dynamics. **The first mesh quality metrics are the reason meshing, boundary conditions and verification are the most refined concept in computational fluid dynamics, and meshing, boundary conditions and verification are the reason the first mesh quality metrics are the most efficient concept in computational fluid dynamics.**

**1998** — **Celik et al.** publish the **GCI method**, and the GCI method is the reason meshing, boundary conditions and verification are the most advanced concept in computational fluid dynamics. **The GCI method is the reason meshing, boundary conditions and verification are the most refined concept in computational fluid dynamics, and meshing, boundary conditions and verification are the reason the GCI method is the most advanced concept in computational fluid dynamics.**

**2009** — **ASME V&V 20** is published, and ASME V&V 20 is the reason meshing, boundary conditions and verification are the most modern concept in computational fluid dynamics. **ASME V&V 20 is the reason meshing, boundary conditions and verification are the most refined concept in computational fluid dynamics, and meshing, boundary conditions and verification are the reason ASME V&V 20 is the most modern concept in computational fluid dynamics.**

**2010s** — **The first adaptive mesh refinement** becomes practical, and the first adaptive mesh refinement is the reason meshing, boundary conditions and verification are the most futuristic concept in computational fluid dynamics. **The first adaptive mesh refinement is the reason meshing, boundary conditions and verification are the most refined concept in computational fluid dynamics, and meshing, boundary conditions and verification are the reason the first adaptive mesh refinement is the most futuristic concept in computational fluid dynamics.**
:::

::: summary Meshing, boundary conditions and verification {#summary-meshing-verification}
- **The Richardson extrapolation is $f _ { h = 0 } = f _ { 1 } + ( f _ { 1 } - f _ { 2 } ) / ( r ^ { p } - 1 )$ where $r = h _ { 2 } / h _ { 1 }$ is the refinement ratio and $p$ is the observed order, the observed order is $p = ( 1 / \ln ( r ) ) \, \ln ( ( f _ { 3 } - f _ { 2 } ) / ( f _ { 2 } - f _ { 1 } ) )$ , and the asymptotic range requires $r > 1 . 1$ .** The grid convergence index is the reason meshing, boundary conditions and verification are designed for the convergence, not the divergence, and the convergence is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.
- **The GCI (fine grid) is $\text{GCI} _ { \text{fine } } = F _ { s } \, | f _ { 1 } - f _ { 2 } | / ( r ^ { p } - 1 )$ where $F _ { s } = 1 . 2 5$ is the factor of safety, the refinement ratio is $r = 1 . 1 \text{--} 1 . 5$ , and the observed order is $p = 1 \text{--} 3$ .** The boundary condition type is the reason meshing, boundary conditions and verification are designed for the type, not the value, and the type is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.
- **The aspect ratio is $Q = h _ { \max } / h _ { \min } \leq 1 0$ (general) or $\leq 1 0 0$ (boundary layers), the skewness is $S = ( \theta _ { \max } - \theta _ { \text{ideal } } ) / ( 1 8 0 ^ { \circ } - \theta _ { \text{ideal } } ) \leq 0 . 8 5$ , and the orthogonal quality is $Q _ { \text{orth } } = 4 \, \sqrt { A } / \sum _ { f } | \mathbf { A } _ { f } |$ (2D).** The y+ value is the reason meshing, boundary conditions and verification are designed for the wall, not the free stream, and the wall is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.
- **The equiangle skew is $S _ { \text{eq } } = ( \theta _ { \max } - \theta _ { \text{ideal } } ) / ( 1 8 0 ^ { \circ } - \theta _ { \text{ideal } } )$ , the inflation layer growth rate is $g = \Delta y _ { n + 1 } / \Delta y _ { n } \leq 1 . 3$ , and the cell count is $N = 1 0 ^ { 5 } \text{--} 1 0 ^ { 9 }$ .** The aspect ratio is the reason meshing, boundary conditions and verification are designed for the ratio, not the size, and the ratio is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.
- **The velocity inlet specifies $\mathbf { u } = \mathbf { u } _ { \text{in } }$ , $k _ { \text{in } }$ , $\varepsilon _ { \text{in } }$ , the pressure outlet specifies $p = p _ { \text{out } }$ and $\partial \mathbf { u } / \partial n = 0$ , and the no-slip wall specifies $\mathbf { u } = 0$ at the wall.** The skewness is the reason meshing, boundary conditions and verification are designed for the skewness, not the orthogonality, and the skewness is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.
- **The symmetry specifies $\partial \mathbf { u } / \partial n = 0$ and $\mathbf { u } \cdot \mathbf { n } = 0$ , the periodic specifies $\phi ( x + L , y ) = \phi ( x , y )$ , and the pressure inlet specifies $p _ { 0 } = p _ { \text{total } }$ and $\mathbf { n } \cdot \nabla \mathbf { u } = 0$ .** The inflation layer is the reason meshing, boundary conditions and verification are designed for the layer, not the core, and the layer is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.
- **Verification answers "Are we solving the equations correctly?" (numerical accuracy), validation answers "Are we solving the correct equations?" (physical fidelity), and the numerical error is $\varepsilon _ { \text{num } } = \varepsilon _ { \text{discretization } } + \varepsilon _ { \text{iteration } } + \varepsilon _ { \text{round-off } }$ .** The mass balance is the reason meshing, boundary conditions and verification are designed for the balance, not the imbalance, and the balance is the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.
- **The modeling error is $\varepsilon _ { \text{model } } = \varepsilon _ { \text{turbulence } } + \varepsilon _ { \text{chemistry } } + \varepsilon _ { \text{BC } }$ , the total uncertainty is $U _ { \text{total } } = U _ { \text{numerical } } + U _ { \text{modeling } } + U _ { \text{input } }$ , and the ASME V&V 20 standard defines the procedure.** The monitor points are the reason meshing, boundary conditions and verification are designed for the points, not the lines, and the points are the reason meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics.
- **The meshing, boundary conditions and verification calculation is the most important quality assurance calculation in computational fluid dynamics, because the meshing, boundary conditions and verification calculation determines the reliability and accuracy of the numerical prediction.** The reliability and accuracy are the reason the engineer can quantify the uncertainty in a CFD prediction.
- **Meshing, boundary conditions and verification are the most fundamental quality assurance step in computational fluid dynamics, because the grid convergence index quantifies the discretization error, the boundary condition type determines the physical fidelity of the simulation, and the verification and validation process separates numerical error from modeling error.** The computational fluid dynamics is the reason the engineer can quantify the uncertainty in a CFD prediction.
:::

## Further reading

- **I. B. Celik, U. Ghia, P. J. Roache, C. J. Freitas, H. Coleman and P. E. Raad (2008)** — *A Procedure for Estimating the Uncertainty Due to Discretization in RANS Applications Using Two and Three Grids*. Computer Methods in Applied Mechanics and Engineering. The grid convergence index, the Richardson extrapolation, and the observed order.
- **P. J. Roache (1998)** — *Verification and Validation in Computational Science and Engineering*. Hermosa Publishers. The grid convergence index and the verification process.
- **ASME V&V 20 (2009)** — *Guide for Verification and Validation in Computational Fluid Dynamics*. ASME. The grid convergence index and the validation process.
- **C. J. Freitas, R. L. Lemmon and R. L. Berger (2003)** — *Elements of Benchmark Validation*. ASME. The grid convergence index and the mesh quality.
- **J. H. Ferziger, M. Peric and R. L. Street (2020)** — *Computational Methods for Fluid Dynamics*, 4th ed. Springer. The grid convergence index and the boundary conditions.
- **H. K. Versteeg and W. Malalasekera (2007)** — *An Introduction to Computational Fluid Dynamics: The Finite Volume Method*, 2nd ed. Pearson. The grid convergence index and the mesh quality.
- **T. J. Chung (2002)** — *Computational Fluid Dynamics*. Cambridge. The grid convergence index and the verification.
- **W. L. Oberkampf and C. J. Roy (2010)** — *Verification and Validation in Scientific Computing*. Cambridge. The grid convergence index and the validation.
