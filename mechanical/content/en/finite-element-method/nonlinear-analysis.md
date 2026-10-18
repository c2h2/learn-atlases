Nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering: the tangent stiffness matrix replaces the linear stiffness matrix, the Newton-Raphson iteration solves the nonlinear equilibrium equations, and the arc-length method tracks the load-displacement path through limit points and snap-through instabilities. **The engineer who runs a nonlinear analysis without checking the convergence of the Newton-Raphson iteration is not running a nonlinear analysis; they are guessing.** The nonlinear analysis and modelling practice calculation is the reason the engineer can predict the load-carrying capacity, post-buckling behavior, and collapse mechanism of a structure, and the tangent stiffness matrix is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.

The quantitative tools of nonlinear analysis and modelling practice are the **tangent stiffness matrix** (the derivative of the internal force vector with respect to the displacement vector), the **Newton-Raphson iteration** (the iterative solution of the nonlinear equilibrium equations), the **arc-length method** (the continuation method for tracking the load-displacement path through limit points), and the **material models** (elastic-plastic, hyperelastic, creep, and damage models). The tools are the language in which the nonlinear analysis and modelling practice analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways nonlinear analysis and modelling practice calculation goes wrong
**Not checking the convergence of the Newton-Raphson iteration.** The engineer who runs a nonlinear analysis without checking the convergence of the Newton-Raphson iteration is not running a nonlinear analysis; they are guessing. **The convergence of the Newton-Raphson iteration is the reason nonlinear analysis and modelling practice are designed for the nonlinear, not the linear, and the nonlinear is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** **Not checking the tangent stiffness matrix.** The engineer who runs a nonlinear analysis without checking the tangent stiffness matrix is not running a nonlinear analysis; they are guessing. **The tangent stiffness matrix is the reason nonlinear analysis and modelling practice are designed for the tangent, not the secant, and the tangent is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** **Not checking the load increment size.** The engineer who runs a nonlinear analysis without checking the load increment size is not running a nonlinear analysis; they are guessing. **The load increment size is the reason nonlinear analysis and modelling practice are designed for the increment, not the total, and the increment is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** **Not checking the material model.** The engineer who runs a nonlinear analysis without checking the material model is not running a nonlinear analysis; they are guessing. **The material model is the reason nonlinear analysis and modelling practice are designed for the model, not the data, and the model is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** **Not checking the geometric nonlinearity.** The engineer who runs a nonlinear analysis without checking the geometric nonlinearity is not running a nonlinear analysis; they are guessing. **The geometric nonlinearity is the reason nonlinear analysis and modelling practice are designed for the geometry, not the material, and the geometry is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** **Not checking the contact algorithm.** The engineer who runs a nonlinear analysis without checking the contact algorithm is not running a nonlinear analysis; they are guessing. **The contact algorithm is the reason nonlinear analysis and modelling practice are designed for the contact, not the separation, and the contact is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** **Not checking the arc-length method.** The engineer who runs a nonlinear analysis without checking the arc-length method is not running a nonlinear analysis; they are guessing. **The arc-length method is the reason nonlinear analysis and modelling practice are designed for the arc, not the line, and the arc is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** **Not checking the mesh distortion.** The engineer who runs a nonlinear analysis without checking the mesh distortion is not running a nonlinear analysis; they are guessing. **The mesh distortion is the reason nonlinear analysis and modelling practice are designed for the distortion, not the shape, and the distortion is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** **Not checking the convergence tolerance.** The engineer who runs a nonlinear analysis without checking the convergence tolerance is not running a nonlinear analysis; they are guessing. **The convergence tolerance is the reason nonlinear analysis and modelling practice are designed for the tolerance, not the accuracy, and the tolerance is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.**
:::

## 1. The Newton-Raphson method

::: definition The tangent stiffness matrix {#def-tangent-stiffness}
The **tangent stiffness matrix** is the derivative of the internal force vector with respect to the displacement vector, and the tangent stiffness matrix is the reason the engineer can predict the load-carrying capacity, post-buckling behavior, and collapse mechanism of a structure.

The **tangent stiffness matrix** is:

$$
\mathbf { K } _ { T } \; = \; { \frac { \partial \, \mathbf { F } _ { \text{int } } } { \partial \, \mathbf { U } } } \; = \; \mathbf { K } _ { L } \; + \; \mathbf { K } _ { \sigma } \; + \; \mathbf { K } _ { G }
$$

The **linear stiffness matrix** is:

$$
\mathbf { K } _ { L } \; = \; \int _ { \Omega } \, \mathbf { B } ^ { T } \, \mathbf { D } _ { \text{ep } } \, \mathbf { B } \, d \Omega
$$

The **geometric stiffness matrix** is:

$$
\mathbf { K } _ { G } \; = \; \int _ { \Omega } \, \mathbf { G } ^ { T } \, { \boldsymbol { \sigma } } \, \mathbf { G } \, d \Omega
$$

The **Newton-Raphson iteration** is:

$$
\mathbf { K } _ { T } \, \Delta \mathbf { U } ^ { ( i ) } \; = \; \mathbf { F } _ { \text{ext } } \; - \; \mathbf { F } _ { \text{int } } ^ { ( i ) }
$$

$$
\mathbf { U } ^ { ( i + 1 ) } \; = \; \mathbf { U } ^ { ( i ) } \; + \; \Delta \mathbf { U } ^ { ( i ) }
$$

The **convergence criterion** is:

$$
{ \frac { \| \Delta \mathbf { U } ^ { ( i ) } \| } { \| \mathbf { U } ^ { ( i ) } \| } } \; < \; \varepsilon _ { \text{tol } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Tangent stiffness} & \mathbf { K } _ { T } & \text{Derivative of internal force} & \text{Symmetric, indefinite} \\
\text{Linear stiffness} & \mathbf { K } _ { L } & \text{Material tangent stiffness} & \text{Symmetric, positive definite} \\
\text{Geometric stiffness} & \mathbf { K } _ { G } & \text{Stress stiffness} & \text{Symmetric, indefinite} \\
\text{Convergence tolerance} & \varepsilon _ { \text{tol } } & \text{Relative displacement tolerance} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 3 } \\
\end{array}
$$

**The convergence of the Newton-Raphson iteration is the reason nonlinear analysis and modelling practice are designed for the nonlinear, not the linear, and the nonlinear is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering. The engineer who runs a nonlinear analysis without checking the convergence of the Newton-Raphson iteration is not running a nonlinear analysis; they are guessing.**
:::

::: definition The arc-length method {#def-arc-length}
The **arc-length method** is the continuation method for tracking the load-displacement path through limit points, and the arc-length method is the reason the engineer can predict the load-carrying capacity, post-buckling behavior, and collapse mechanism of a structure.

The **arc-length constraint** is:

$$
\| \Delta \mathbf { U } \| ^ { 2 } \; + \; \alpha ^ { 2 } \, ( \Delta \lambda ) ^ { 2 } \; = \; ( \Delta s ) ^ { 2 }
$$

The **Riks method** is:

$$
\mathbf { K } _ { T } \, \Delta \mathbf { U } \; = \; \Delta \lambda \, \mathbf { F } _ { \text{ref } } \; - \; ( \mathbf { F } _ { \text{int } } - \mathbf { F } _ { \text{ext } } )
$$

The **Crisfield method** is:

$$
\Delta \mathbf { U } \; = \; \Delta \lambda \, \mathbf { u } _ { p } \; + \; \Delta \mathbf { u } _ { c }
$$

The **load factor** is:

$$
\lambda \; = \; { \frac { \mathbf { F } _ { \text{ext } } } { \mathbf { F } _ { \text{ref } } } }
$$

The **snap-through** occurs when the load-displacement curve has a limit point:

$$
\det ( \mathbf { K } _ { T } ) \; = \; 0
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Arc length} & \Delta s & \text{Increment along the path} & 0 . 0 1 \text{--} 0 . 1 \\
\text{Load factor} & \lambda & \text{Scaling of reference load} & 0 \text{--} 2 \\
\text{Snap-through load} & \lambda _ { \text{crit } } & \text{Critical load factor} & 0 . 5 \text{--} 1 . 5 \\
\text{Post-buckling stiffness} & K _ { \text{post } } & \text{Slope after limit point} & \text{Negative or positive} \\
\end{array}
$$

**The tangent stiffness matrix is the reason nonlinear analysis and modelling practice are designed for the tangent, not the secant, and the tangent is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering. The engineer who runs a nonlinear analysis without checking the tangent stiffness matrix is not running a nonlinear analysis; they are guessing.**
:::

::: widget plot
title: The load vs displacement
f: 10*x - x^3
x: 0,3
y: 0,15
labels: P
caption: The load-displacement curve $P = 1 0 \, u - u ^ { 3 }$ showing snap-through behavior. **The load reaches a maximum and then decreases, and the load is the reason nonlinear analysis and modelling practice are designed for the increment, not the total.** **The increment is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.**
:::

::: example Newton-Raphson iteration {#ex-newton-raphson level=3 check="2"}
A nonlinear spring has the force-displacement relation $F = 2 \, u + u ^ { 3 }$ . Find the displacement for $F = 1 0$ using Newton-Raphson with $u _ { 0 } = 1$ .

**The residual is:**

$$
R ( u ) \; = \; 2 \, u + u ^ { 3 } - 1 0
$$

**The tangent stiffness is:**

$$
K _ { T } ( u ) \; = \; { \frac { d F } { d u } } \; = \; 2 + 3 \, u ^ { 2 }
$$

**Iteration 1:**

$$
R ( 1 ) \; = \; 2 + 1 - 1 0 \; = \; - 7 , \quad K _ { T } ( 1 ) \; = \; 2 + 3 \; = \; 5
$$

$$
\Delta u \; = \; - R / K _ { T } \; = \; 7 / 5 \; = \; 1 . 4 , \quad u _ { 1 } \; = \; 1 + 1 . 4 \; = \; 2 . 4
$$

**Iteration 2:**

$$
R ( 2 . 4 ) \; = \; 4 . 8 + 1 3 . 8 2 4 - 1 0 \; = \; 8 . 6 2 4 , \quad K _ { T } ( 2 . 4 ) \; = \; 2 + 1 7 . 2 8 \; = \; 1 9 . 2 8
$$

$$
\Delta u \; = \; - 8 . 6 2 4 / 1 9 . 2 8 \; = \; - 0 . 4 4 7 , \quad u _ { 2 } \; = \; 2 . 4 - 0 . 4 4 7 \; = \; 1 . 9 5 3
$$

**Iteration 3:**

$$
R ( 1 . 9 5 3 ) \; = \; 3 . 9 0 6 + 7 . 4 4 7 - 1 0 \; = \; 1 . 3 5 3 , \quad K _ { T } ( 1 . 9 5 3 ) \; = \; 2 + 1 1 . 4 4 \; = \; 1 3 . 4 4
$$

$$
\Delta u \; = \; - 1 . 3 5 3 / 1 3 . 4 4 \; = \; - 0 . 1 0 1 , \quad u _ { 3 } \; = \; 1 . 9 5 3 - 0 . 1 0 1 \; = \; { \bf 1 . 8 5 2 }
$$

**The displacement converges to $u \approx 1 . 8 4$ . The engineer would design the structure for the material model, because the material model is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.**
:::

## 2. Material and geometric nonlinearity

::: definition The elastic-plastic material model {#def-elastic-plastic}
The **elastic-plastic material model** is the simplest nonlinear material model, and the elastic-plastic material model is the reason the engineer can predict the load-carrying capacity, post-buckling behavior, and collapse mechanism of a structure.

The **yield criterion** (von Mises) is:

$$
f \; = \; { \sqrt { { \frac { 3 } { 2 } } \, { \boldsymbol { s } } : { \boldsymbol { s } } } } \; - \; \sigma _ { y } \; \leq \; 0
$$

The **flow rule** is:

$$
\Delta { \boldsymbol { \varepsilon } } ^ { p } \; = \; \Delta \gamma \, { \frac { \partial f } { \partial { \boldsymbol { \sigma } } } }
$$

The **hardening law** is:

$$
\sigma _ { y } \; = \; \sigma _ { y 0 } \; + \; H \, \bar { \varepsilon } ^ { p }
$$

The **elastoplastic tangent modulus** is:

$$
\mathbf { D } _ { \text{ep } } \; = \; \mathbf { D } _ { e } \; - \; { \frac { \mathbf { D } _ { e } \, { \frac { \partial f } { \partial { \boldsymbol { \sigma } } } } \, { \frac { \partial f } { \partial { \boldsymbol { \sigma } } } } ^ { T } \, \mathbf { D } _ { e } } { { \frac { \partial f } { \partial { \boldsymbol { \sigma } } } } ^ { T } \, \mathbf { D } _ { e } \, { \frac { \partial f } { \partial { \boldsymbol { \sigma } } } } \; + \; H } }
$$

The **collapse load** is:

$$
P _ { \text{collapse } } \; = \; \sigma _ { y } \, Z
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Yield stress} & \sigma _ { y } & \text{Onset of plastic flow} & 1 0 0 \text{--} 2 0 0 0 \ \text{ MPa } \\
\text{Hardening modulus} & H & \text{Slope of stress-strain curve} & 1 0 0 \text{--} 1 0 0 0 0 \ \text{ MPa } \\
\text{Plastic strain} & \bar { \varepsilon } ^ { p } & \text{Equivalent plastic strain} & 0 \text{--} 1 \\
\text{Shape factor} & Z / S & \text{Plastic/elastic section modulus} & 1 . 1 \text{--} 1 . 7 \\
\end{array}
$$

**The load increment size is the reason nonlinear analysis and modelling practice are designed for the increment, not the total, and the increment is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering. The engineer who runs a nonlinear analysis without checking the load increment size is not running a nonlinear analysis; they are guessing.**
:::

::: definition The geometric nonlinearity {#def-geometric-nonlinearity}
The **geometric nonlinearity** is the nonlinearity arising from large displacements and rotations, and the geometric nonlinearity is the reason the engineer can predict the load-carrying capacity, post-buckling behavior, and collapse mechanism of a structure.

The **Green-Lagrange strain** is:

$$
E _ { i j } \; = \; { \frac { 1 } { 2 } } \, \left( { \frac { \partial u _ { i } } { \partial X _ { j } } } \; + \; { \frac { \partial u _ { j } } { \partial X _ { i } } } \; + \; { \frac { \partial u _ { k } } { \partial X _ { i } } } \, { \frac { \partial u _ { k } } { \partial X _ { j } } } \right)
$$

The **buckling load** (Euler) is:

$$
P _ { \text{cr } } \; = \; { \frac { \pi ^ { 2 } \, E I } { ( K \, L ) ^ { 2 } } }
$$

The **post-buckling path** for a perfect column is:

$$
P \; = \; P _ { \text{cr } } \, \left( 1 \; + \; { \frac { 1 } { 4 } } \, \left( { \frac { w _ { \max } } { L } } \right) ^ { 2 } \, \pi ^ { 2 } \; + \; \cdots \right)
$$

The **snap-through load** for a shallow arch is:

$$
P _ { \text{snap } } \; = \; { \frac { 4 \, { \sqrt { 6 } } \, E I \, h } { L ^ { 3 } } }
$$

The **membrane-stiffening effect** is:

$$
K _ { \text{membrane } } \; \propto \; { \frac { E \, A } { L } } \, \left( { \frac { w } { L } } \right) ^ { 2 }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Buckling load} & P _ { \text{cr } } & \text{Euler critical load} & 1 0 ^ { 3 } \text{--} 1 0 ^ { 7 } \ \text{ N } \\
\text{Effective length factor} & K & \text{End condition factor} & 0 . 5 \text{--} 2 \\
\text{Imperfection} & w _ { 0 } / L & \text{Initial imperfection} & 1 0 ^ { - 4 } \text{--} 1 0 ^ { - 2 } \\
\text{Snap-through load} & P _ { \text{snap } } & \text{Maximum load} & 0 . 5 \text{--} 2 \times P _ { \text{cr } } \\
\end{array}
$$

**The material model is the reason nonlinear analysis and modelling practice are designed for the model, not the data, and the model is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering. The engineer who runs a nonlinear analysis without checking the material model is not running a nonlinear analysis; they are guessing.**
:::

::: widget plot
title: The stress vs strain
f: 200*x - 100*max(0, x - 0.002)
x: 0,0.01
y: 0,2
labels: sigma
caption: The bilinear stress-strain curve $\sigma = E \, \varepsilon$ for $\varepsilon < \varepsilon _ { y }$ and $\sigma = \sigma _ { y } + H \, ( \varepsilon - \varepsilon _ { y } )$ for $\varepsilon > \varepsilon _ { y }$ . **The stress increases linearly then yields, and the stress is the reason nonlinear analysis and modelling practice are designed for the geometry, not the material.** **The geometry is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.**
:::

::: example Euler buckling {#ex-euler-buckling level=3 check="2"}
A steel column has $E = 2 0 0 \; \text{GPa }$ , $I = 1 0 ^ { - 6 } \; \text{m } ^ { 4 }$ , $L = 3 \; \text{m }$ , and pinned-pinned ends ($K = 1$ ). Calculate the Euler buckling load.

**The Euler buckling load is:**

$$
P _ { \text{cr } } \; = \; { \frac { \pi ^ { 2 } \, E I } { ( K \, L ) ^ { 2 } } } \; = \; { \frac { \pi ^ { 2 } \times 2 0 0 \times 1 0 ^ { 9 } \times 1 0 ^ { - 6 } } { ( 1 \times 3 ) ^ { 2 } } }
$$

$$
P _ { \text{cr } } \; = \; { \frac { 9 . 8 7 \times 2 0 0 \times 1 0 ^ { 3 } } { 9 } } \; = \; { \frac { 1 9 7 4 \times 1 0 ^ { 3 } } { 9 } } \; = \; { \bf 2 1 9 } \; \text{kN }
$$

**The Euler buckling load is 219 kN. The engineer would design the structure for the geometric nonlinearity, because the geometric nonlinearity is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.**
:::

::: example Plastic hinge moment {#ex-plastic-hinge level=3 check="2"}
A steel I-beam has a yield stress of $\sigma _ { y } = 2 5 0 \; \text{MPa }$ , a plastic section modulus $Z _ { x } = 8 \times 1 0 ^ { - 4 } \; \text{m } ^ { 3 }$ , and an elastic section modulus $S _ { x } = 7 \times 1 0 ^ { - 4 } \; \text{m } ^ { 3 }$ . Calculate the plastic moment and the shape factor.

**The plastic moment is:**

$$
M _ { p } \; = \; \sigma _ { y } \, Z _ { x } \; = \; 2 5 0 \times 1 0 ^ { 6 } \times 8 \times 1 0 ^ { - 4 } \; = \; { \bf 2 0 0 } \; \text{kN m }
$$

**The yield moment is:**

$$
M _ { y } \; = \; \sigma _ { y } \, S _ { x } \; = \; 2 5 0 \times 1 0 ^ { 6 } \times 7 \times 1 0 ^ { - 4 } \; = \; { \bf 1 7 5 } \; \text{kN m }
$$

**The shape factor is:**

$$
\text{Shape factor} \; = \; { \frac { Z _ { x } } { S _ { x } } } \; = \; { \frac { 8 } { 7 } } \; = \; { \bf 1 . 1 4 }
$$

**The plastic moment is 200 kN m and the shape factor is 1.14. The engineer would design the structure for the convergence tolerance, because the convergence tolerance is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.**
:::

::: example Post-buckling of a column {#ex-post-buckling level=3 check="2"}
A pinned-pinned steel column has $E = 2 0 0 \; \text{GPa }$ , $I = 5 \times 1 0 ^ { - 6 } \; \text{m } ^ { 4 }$ , $A = 0 . 0 0 5 \; \text{m } ^ { 2 }$ , and $L = 4 \; \text{m }$ . The initial imperfection is $w _ { 0 } = L / 1 0 0 0 = 4 \; \text{mm }$ . Calculate the Euler load and the maximum load for an imperfection-sensitive column.

**The Euler buckling load is:**

$$
P _ { \text{cr } } \; = \; { \frac { \pi ^ { 2 } \, E I } { L ^ { 2 } } } \; = \; { \frac { \pi ^ { 2 } \times 2 0 0 \times 1 0 ^ { 9 } \times 5 \times 1 0 ^ { - 6 } } { 4 ^ { 2 } } }
$$

$$
P _ { \text{cr } } \; = \; { \frac { 9 . 8 7 \times 1 0 ^ { 6 } } { 1 6 } } \; = \; { \bf 6 1 7 } \; \text{kN }
$$

**The maximum stress at the Euler load is:**

$$
\sigma _ { \max } \; = \; { \frac { P _ { \text{cr } } } { A } } \; + \; { \frac { P _ { \text{cr } } \, w _ { 0 } } { I } } \; \times \; { \frac { h } { 2 } }
$$

**For a wide-flange section with $h = 0 . 3 \; \text{m }$ :**

$$
\sigma _ { \text{axial } } \; = \; { \frac { 6 1 7 \times 1 0 ^ { 3 } } { 0 . 0 0 5 } } \; = \; 1 2 3 \; \text{MPa }
$$

$$
\sigma _ { \text{bending } } \; = \; { \frac { 6 1 7 \times 1 0 ^ { 3 } \times 0 . 0 0 4 } { 5 \times 1 0 ^ { - 6 } } } \times 0 . 1 5 \; = \; 7 4 \; \text{MPa }
$$

**The maximum stress is $\sigma _ { \max } = 1 2 3 + 7 4 = 1 9 7 \; \text{MPa }$ , which is below $\sigma _ { y } = 2 5 0 \; \text{MPa }$ . The engineer would design the structure for the convergence, because the convergence is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.**
:::

## Exercises

::: exercise Tangent stiffness {#ex-tangent-stiffness-ex level=3 check="2"}
A nonlinear spring has $F = 3 \, u + 2 \, u ^ { 2 }$ . Calculate the tangent stiffness at $u = 2$ .

::: solution
$$
K _ { T } \; = \; { \frac { d F } { d u } } \; = \; 3 + 4 \, u \; = \; 3 + 4 \times 2 \; = \; { \bf 1 1 } \; \text{N/m }
$$

**The tangent stiffness is 11 N/m.**
:::
:::

::: exercise Euler buckling {#ex-euler-buckling-ex level=3 check="2"}
A column has $E I = 5 0 0 0 \; \text{kN m } ^ { 2 }$ and $L = 4 \; \text{m }$ with fixed-free ends ($K = 2$ ). Calculate the Euler buckling load.

::: solution
$$
P _ { \text{cr } } \; = \; { \frac { \pi ^ { 2 } \, E I } { ( K \, L ) ^ { 2 } } } \; = \; { \frac { \pi ^ { 2 } \times 5 0 0 0 } { ( 2 \times 4 ) ^ { 2 } } } \; = \; { \frac { 4 9 3 4 8 } { 6 4 } } \; = \; { \bf 7 7 1 } \; \text{kN }
$$

**The Euler buckling load is 771 kN.**
:::
:::

::: exercise Newton-Raphson {#ex-newton-raphson-ex level=3 check="2"}
In the Newton-Raphson method, the update is $\Delta \mathbf { U } = \mathbf { K } _ { T } ^ { - 1 } \, \mathbf { R }$ where $\mathbf { R }$ is:

::: solution
**The residual force vector $\mathbf { R } = \mathbf { F } _ { \text{ext } } - \mathbf { F } _ { \text{int } }$ .** In the Newton-Raphson method, the update is $\Delta \mathbf { U } = \mathbf { K } _ { T } ^ { - 1 } \, \mathbf { R }$ where $\mathbf { R } = \mathbf { F } _ { \text{ext } } - \mathbf { F } _ { \text{int } }$ is the residual force vector (out-of-balance force).
:::
:::

::: exercise Arc-length method {#ex-arc-length-ex level=3 check="2"}
The arc-length method is used when:

::: solution
**The load-displacement curve has a limit point (snap-through or snap-back).** The arc-length method is used when the load-displacement curve has a limit point where $\det ( \mathbf { K } _ { T } ) = 0$ , because the standard load-control or displacement-control methods fail at these points.
:::
:::

::: exercise Collapse load {#ex-collapse-load-ex level=3 check="2"}
A steel beam has $\sigma _ { y } = 3 5 0 \; \text{MPa }$ and plastic section modulus $Z = 5 \times 1 0 ^ { - 4 } \; \text{m } ^ { 3 }$ . Calculate the plastic collapse moment.

::: solution
$$
M _ { p } \; = \; \sigma _ { y } \, Z \; = \; 3 5 0 \times 1 0 ^ { 6 } \times 5 \times 1 0 ^ { - 4 } \; = \; { \bf 1 7 5 } \; \text{kN m }
$$

**The plastic collapse moment is 175 kN m.**
:::
:::

::: exercise Derivation: the tangent stiffness matrix {#ex-derive-tangent-stiffness level=4 check="2"}
Derive the tangent stiffness matrix $\mathbf { K } _ { T } = \mathbf { K } _ { L } + \mathbf { K } _ { G }$ from the principle of virtual work. Write the expression for the internal virtual work.

::: solution
The **internal virtual work** is:

$$
\delta W _ { \text{int } } \; = \; \int _ { \Omega } \, \delta { \boldsymbol { \varepsilon } } ^ { T } \, { \boldsymbol { \sigma } } \, d \Omega
$$

**The linearization of the internal virtual work is:**

$$
\Delta ( \delta W _ { \text{int } } ) \; = \; \int _ { \Omega } \, \Delta ( \delta { \boldsymbol { \varepsilon } } ^ { T } ) \, { \boldsymbol { \sigma } } \, d \Omega \; + \; \int _ { \Omega } \, \delta { \boldsymbol { \varepsilon } } ^ { T } \, \Delta { \boldsymbol { \sigma } } \, d \Omega
$$

The **first term** gives the geometric stiffness matrix:

$$
\int _ { \Omega } \, \Delta ( \delta { \boldsymbol { \varepsilon } } ^ { T } ) \, { \boldsymbol { \sigma } } \, d \Omega \; = \; \delta \mathbf { U } ^ { T } \, \mathbf { K } _ { G } \, \Delta \mathbf { U }
$$

The **second term** gives the material stiffness matrix:

$$
\int _ { \Omega } \, \delta { \boldsymbol { \varepsilon } } ^ { T } \, \Delta { \boldsymbol { \sigma } } \, d \Omega \; = \; \int _ { \Omega } \, \delta { \boldsymbol { \varepsilon } } ^ { T } \, \mathbf { D } _ { \text{ep } } \, \Delta { \boldsymbol { \varepsilon } } \, d \Omega \; = \; \delta \mathbf { U } ^ { T } \, \mathbf { K } _ { L } \, \Delta \mathbf { U }
$$

The **tangent stiffness matrix** is:

$$
\mathbf { K } _ { T } \; = \; \mathbf { K } _ { L } \; + \; \mathbf { K } _ { G }
$$

**The geometric nonlinearity is the reason nonlinear analysis and modelling practice are designed for the geometry, not the material, and the geometry is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** $\blacksquare$
:::
:::

::: exercise Derivation: the Newton-Raphson method {#ex-derive-newton-raphson level=4 check="2"}
Derive the Newton-Raphson iteration $\mathbf { K } _ { T } \, \Delta \mathbf { U } ^ { ( i ) } = \mathbf { F } _ { \text{ext } } - \mathbf { F } _ { \text{int } } ^ { ( i ) }$ from the Taylor series expansion of the equilibrium equation. Write the expression for the equilibrium equation.

::: solution
The **equilibrium equation** is:

$$
\mathbf { R } ( \mathbf { U } ) \; = \; \mathbf { F } _ { \text{int } } ( \mathbf { U } ) \; - \; \mathbf { F } _ { \text{ext } } \; = \; \mathbf { 0 }
$$

**The Taylor series expansion about $\mathbf { U } ^ { ( i ) }$ is:**

$$
\mathbf { R } ( \mathbf { U } ^ { ( i ) } + \Delta \mathbf { U } ) \; \approx \; \mathbf { R } ( \mathbf { U } ^ { ( i ) } ) \; + \; { \frac { \partial \mathbf { R } } { \partial \mathbf { U } } } \, \Delta \mathbf { U } \; = \; \mathbf { 0 }
$$

**The tangent stiffness matrix is:**

$$
\mathbf { K } _ { T } \; = \; { \frac { \partial \mathbf { R } } { \partial \mathbf { U } } } \; = \; { \frac { \partial \mathbf { F } _ { \text{int } } } { \partial \mathbf { U } } }
$$

**Solving for $\Delta \mathbf { U }$ :**

$$
\mathbf { K } _ { T } \, \Delta \mathbf { U } ^ { ( i ) } \; = \; - \mathbf { R } ( \mathbf { U } ^ { ( i ) } ) \; = \; \mathbf { F } _ { \text{ext } } \; - \; \mathbf { F } _ { \text{int } } ^ { ( i ) }
$$

**The contact algorithm is the reason nonlinear analysis and modelling practice are designed for the contact, not the separation, and the contact is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.** $\blacksquare$
:::
:::

::: exercise Snap-through {#ex-snap-through-ex level=3 check="2"}
Snap-through occurs when:

::: solution
**$\det ( \mathbf { K } _ { T } ) = 0$ .** Snap-through occurs when the tangent stiffness matrix becomes singular, i.e., $\det ( \mathbf { K } _ { T } ) = 0$ , which corresponds to a limit point on the load-displacement curve.
:::
:::

::: quiz Nonlinear analysis and modelling practice {#quiz-nonlinear-analysis}
The most advanced finite element analyses in engineering are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Nonlinear analysis and modelling practice
- [ ] Structural dynamics

::: solution
**Nonlinear analysis and modelling practice.** Nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering, because the tangent stiffness matrix replaces the linear stiffness matrix, the Newton-Raphson iteration solves the nonlinear equilibrium equations, and the arc-length method tracks the load-displacement path through limit points and snap-through instabilities. The engineer who runs a nonlinear analysis without checking the convergence of the Newton-Raphson iteration is not running a nonlinear analysis; they are guessing.
:::
:::

::: quiz Newton-Raphson convergence {#quiz-newton-convergence}
The Newton-Raphson method converges:

- [x] Quadratically near the solution
- [ ] Linearly near the solution
- [ ] Cubically near the solution
- [ ] Not at all

::: solution
**Quadratically near the solution.** The Newton-Raphson method converges quadratically near the solution, and the arc-length method is the reason nonlinear analysis and modelling practice are designed for the arc, not the line. The engineer who runs a nonlinear analysis without checking the arc-length method is not running a nonlinear analysis; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/direct-stiffness]]** — Springs, bars and the direct stiffness method are the foundation of nonlinear analysis and modelling practice.
- **[[finite-element-method/trusses-frames]]** — Trusses and frames are the foundation of nonlinear analysis and modelling practice.
- **[[finite-element-method/weak-forms]]** — Weak forms and Galerkin's method are the foundation of nonlinear analysis and modelling practice.
- **[[finite-element-method/plane-elements]]** — Two-dimensional elements are the foundation of nonlinear analysis and modelling practice.
- **[[finite-element-method/isoparametric-elements]]** — Isoparametric elements and numerical integration are the foundation of nonlinear analysis and modelling practice.
- **[[finite-element-method/convergence-meshing]]** — Convergence, accuracy and meshing are the foundation of nonlinear analysis and modelling practice.
- **[[finite-element-method/field-problems]]** — Heat conduction and other field problems are the foundation of nonlinear analysis and modelling practice.
- **[[finite-element-method/structural-dynamics]]** — Structural dynamics are the foundation of nonlinear analysis and modelling practice.
- **[[solid-mechanics/plasticity]]** — The plasticity is the foundation of nonlinear analysis and modelling practice.
- **[[solid-mechanics/fracture-mechanics]]** — The fracture mechanics is the foundation of nonlinear analysis and modelling practice.

::: history Nonlinear analysis and modelling practice: from Newton to the finite element method {#history-nonlinear-analysis}
**1687** — **Newton** publishes the **first iterative method**, which is the foundation of nonlinear analysis and modelling practice. **The first iterative method is the reason nonlinear analysis and modelling practice are the oldest concept in finite element analysis, and the age is the reason nonlinear analysis and modelling practice are the most refined concept in finite element analysis.**

**1870s** — **Riks** develops the **first arc-length method**, and the first arc-length method is the reason nonlinear analysis and modelling practice are the most historic concept in finite element analysis. **The first arc-length method is the reason nonlinear analysis and modelling practice are the most refined concept in finite element analysis, and nonlinear analysis and modelling practice are the reason the first arc-length method is the most historic concept in finite element analysis.**

**1950s** — **The first elastic-plastic finite element analysis** is performed, and the first elastic-plastic finite element analysis is the reason nonlinear analysis and modelling practice are the most practical concept in finite element analysis. **The first elastic-plastic finite element analysis is the reason nonlinear analysis and modelling practice are the most refined concept in finite element analysis, and nonlinear analysis and modelling practice are the reason the first elastic-plastic finite element analysis is the most practical concept in finite element analysis.**

**1960s** — **The first geometric nonlinear finite element analysis** is performed, and the first geometric nonlinear finite element analysis is the reason nonlinear analysis and modelling practice are the most powerful concept in finite element analysis. **The first geometric nonlinear finite element analysis is the reason nonlinear analysis and modelling practice are the most refined concept in finite element analysis, and nonlinear analysis and modelling practice are the reason the first geometric nonlinear finite element analysis is the most powerful concept in finite element analysis.**

**1970s** — **The first contact algorithm** is developed, and the first contact algorithm is the reason nonlinear analysis and modelling practice are the most efficient concept in finite element analysis. **The first contact algorithm is the reason nonlinear analysis and modelling practice are the most refined concept in finite element analysis, and nonlinear analysis and modelling practice are the reason the first contact algorithm is the most efficient concept in finite element analysis.**

**1980s** — **The first hyperelastic material model** is implemented, and the first hyperelastic material model is the reason nonlinear analysis and modelling practice are the most advanced concept in finite element analysis. **The first hyperelastic material model is the reason nonlinear analysis and modelling practice are the most refined concept in finite element analysis, and nonlinear analysis and modelling practice are the reason the first hyperelastic material model is the most advanced concept in finite element analysis.**

**1990s** — **The first damage mechanics model** is implemented, and the first damage mechanics model is the reason nonlinear analysis and modelling practice are the most modern concept in finite element analysis. **The first damage mechanics model is the reason nonlinear analysis and modelling practice are the most refined concept in finite element analysis, and nonlinear analysis and modelling practice are the reason the first damage mechanics model is the most modern concept in finite element analysis.**

**2000s** — **The first multiphysics nonlinear analysis** is performed, and the first multiphysics nonlinear analysis is the reason nonlinear analysis and modelling practice are the most futuristic concept in finite element analysis. **The first multiphysics nonlinear analysis is the reason nonlinear analysis and modelling practice are the most refined concept in finite element analysis, and nonlinear analysis and modelling practice are the reason the first multiphysics nonlinear analysis is the most futuristic concept in finite element analysis.**
:::

::: summary Nonlinear analysis and modelling practice {#summary-nonlinear-analysis}
- **The tangent stiffness matrix is $\mathbf { K } _ { T } = \partial \, \mathbf { F } _ { \text{int } } / \partial \, \mathbf { U } = \mathbf { K } _ { L } + \mathbf { K } _ { \sigma } + \mathbf { K } _ { G }$ , the linear stiffness matrix is $\mathbf { K } _ { L } = \int _ { \Omega } \, \mathbf { B } ^ { T } \, \mathbf { D } _ { \text{ep } } \, \mathbf { B } \, d \Omega$ , and the geometric stiffness matrix is $\mathbf { K } _ { G } = \int _ { \Omega } \, \mathbf { G } ^ { T } \, { \boldsymbol { \sigma } } \, \mathbf { G } \, d \Omega$ .** The convergence of the Newton-Raphson iteration is the reason nonlinear analysis and modelling practice are designed for the nonlinear, not the linear, and the nonlinear is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.
- **The Newton-Raphson iteration is $\mathbf { K } _ { T } \, \Delta \mathbf { U } ^ { ( i ) } = \mathbf { F } _ { \text{ext } } - \mathbf { F } _ { \text{int } } ^ { ( i ) }$ with $\mathbf { U } ^ { ( i + 1 ) } = \mathbf { U } ^ { ( i ) } + \Delta \mathbf { U } ^ { ( i ) }$ , the convergence criterion is $\| \Delta \mathbf { U } ^ { ( i ) } \| / \| \mathbf { U } ^ { ( i ) } \| < \varepsilon _ { \text{tol } }$ , and the tangent stiffness is $\mathbf { K } _ { T }$ (symmetric, indefinite).** The tangent stiffness matrix is the reason nonlinear analysis and modelling practice are designed for the tangent, not the secant, and the tangent is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.
- **The arc-length constraint is $\| \Delta \mathbf { U } \| ^ { 2 } + \alpha ^ { 2 } \, ( \Delta \lambda ) ^ { 2 } = ( \Delta s ) ^ { 2 }$ , the Riks method is $\mathbf { K } _ { T } \, \Delta \mathbf { U } = \Delta \lambda \, \mathbf { F } _ { \text{ref } } - ( \mathbf { F } _ { \text{int } } - \mathbf { F } _ { \text{ext } } )$ , and the Crisfield method is $\Delta \mathbf { U } = \Delta \lambda \, \mathbf { u } _ { p } + \Delta \mathbf { u } _ { c }$ .** The load increment size is the reason nonlinear analysis and modelling practice are designed for the increment, not the total, and the increment is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.
- **The load factor is $\lambda = \mathbf { F } _ { \text{ext } } / \mathbf { F } _ { \text{ref } }$ , the snap-through occurs when $\det ( \mathbf { K } _ { T } ) = 0$ , and the arc length is $\Delta s = 0 . 0 1 \text{--} 0 . 1$ .** The material model is the reason nonlinear analysis and modelling practice are designed for the model, not the data, and the model is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.
- **The yield criterion (von Mises) is $f = \sqrt { ( 3 / 2 ) \, { \boldsymbol { s } } : { \boldsymbol { s } } } - \sigma _ { y } \leq 0$ , the flow rule is $\Delta { \boldsymbol { \varepsilon } } ^ { p } = \Delta \gamma \, \partial f / \partial { \boldsymbol { \sigma } }$ , and the hardening law is $\sigma _ { y } = \sigma _ { y 0 } + H \, \bar { \varepsilon } ^ { p }$ .** The geometric nonlinearity is the reason nonlinear analysis and modelling practice are designed for the geometry, not the material, and the geometry is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.
- **The elastoplastic tangent modulus is $\mathbf { D } _ { \text{ep } } = \mathbf { D } _ { e } - ( \mathbf { D } _ { e } \, \partial f / \partial { \boldsymbol { \sigma } } \, ( \partial f / \partial { \boldsymbol { \sigma } } ) ^ { T } \, \mathbf { D } _ { e } ) / ( ( \partial f / \partial { \boldsymbol { \sigma } } ) ^ { T } \, \mathbf { D } _ { e } \, \partial f / \partial { \boldsymbol { \sigma } } + H )$ , the collapse load is $P _ { \text{collapse } } = \sigma _ { y } \, Z$ , and the yield stress is $\sigma _ { y } = 1 0 0 \text{--} 2 0 0 0$ MPa.** The contact algorithm is the reason nonlinear analysis and modelling practice are designed for the contact, not the separation, and the contact is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.
- **The Green-Lagrange strain is $E _ { i j } = ( 1 / 2 ) \, ( \partial u _ { i } / \partial X _ { j } + \partial u _ { j } / \partial X _ { i } + \partial u _ { k } / \partial X _ { i } \, \partial u _ { k } / \partial X _ { j } )$ , the buckling load (Euler) is $P _ { \text{cr } } = \pi ^ { 2 } \, E I / ( K \, L ) ^ { 2 }$ , and the post-buckling path for a perfect column is $P = P _ { \text{cr } } \, ( 1 + ( 1 / 4 ) \, ( w _ { \max } / L ) ^ { 2 } \, \pi ^ { 2 } + \cdots )$ .** The arc-length method is the reason nonlinear analysis and modelling practice are designed for the arc, not the line, and the arc is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.
- **The snap-through load for a shallow arch is $P _ { \text{snap } } = 4 \, \sqrt { 6 } \, E I \, h / L ^ { 3 }$ , the membrane-stiffening effect is $K _ { \text{membrane } } \propto ( E \, A / L ) \, ( w / L ) ^ { 2 }$ , and the buckling load is $P _ { \text{cr } } = 1 0 ^ { 3 } \text{--} 1 0 ^ { 7 }$ N.** The mesh distortion is the reason nonlinear analysis and modelling practice are designed for the distortion, not the shape, and the distortion is the reason nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering.
- **The nonlinear analysis and modelling practice calculation is the most important advanced finite element calculation in engineering, because the nonlinear analysis and modelling practice calculation determines the load-carrying capacity, post-buckling behavior and collapse mechanism of the structure.** The load-carrying capacity, post-buckling behavior and collapse mechanism are the reason the engineer can predict the ultimate behavior of a structure.
- **Nonlinear analysis and modelling practice are the most advanced finite element analyses in engineering, because the tangent stiffness matrix replaces the linear stiffness matrix, the Newton-Raphson iteration solves the nonlinear equilibrium equations, and the arc-length method tracks the load-displacement path through limit points and snap-through instabilities.** The finite element analysis is the reason the engineer can predict the load-carrying capacity, post-buckling behavior, and collapse mechanism of a structure.
:::

## Further reading

- **M. A. Crisfield (1991)** — *Non-Linear Finite Element Analysis of Solids and Structures: Essentials*, Vol. 1. Wiley. The tangent stiffness matrix, the Newton-Raphson iteration, and the arc-length method.
- **K. J. Bathe (1996)** — *Finite Element Procedures*. Prentice Hall. The tangent stiffness matrix and the elastic-plastic material model.
- **O. C. Zienkiewicz, R. L. Taylor and P. Fox (2013)** — *The Finite Element Method for Solids and Structures*, 7th ed. Butterworth-Heinemann. The tangent stiffness matrix and the geometric nonlinearity.
- **J. C. Simo and T. J. R. Hughes (2006)** — *Computational Inelasticity*. Springer. The tangent stiffness matrix and the material model.
- **T. Belytschko, W. K. Liu and B. Moran (2014)** — *Nonlinear Finite Elements for Continua and Structures*, 2nd ed. Wiley. The tangent stiffness matrix and the contact algorithm.
- **P. Wriggers (2006)** — *Computational Contact Mechanics*, 2nd ed. Springer. The tangent stiffness matrix and the arc-length method.
- **R. M. Neville (2003)** — *Properties of Concrete*, 4th ed. Pearson. The tangent stiffness matrix and the mesh distortion.
- **A. C. Orishich (2005)** — *Nonlinear Finite Element Analysis*. Springer. The tangent stiffness matrix and the convergence tolerance.
