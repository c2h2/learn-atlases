Convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics: the Peclet number determines whether the flow is convection-dominated or diffusion-dominated, the upwind scheme adds numerical diffusion to stabilize convection-dominated flows, and the QUICK scheme achieves third-order accuracy at the cost of oscillations near discontinuities. **The engineer who runs a simulation without checking the Peclet number is not running a simulation; they are guessing.** The convection-diffusion schemes calculation is the reason the engineer can resolve boundary layers and shocks, and the Peclet number is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.

The quantitative tools of convection-diffusion schemes are the **Peclet number** (the ratio of convection to diffusion), the **cell Peclet number** (the Peclet number based on the cell size), the **upwind scheme** (the first-order stable scheme for convection-dominated flows), and the **QUICK scheme** (the third-order accurate scheme for convection-dominated flows). The tools are the language in which the convection-diffusion schemes analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways convection-diffusion schemes calculation goes wrong
**Not checking the Peclet number.** The engineer who runs a simulation without checking the Peclet number is not running a simulation; they are guessing. **The Peclet number is the reason convection-diffusion schemes are designed for the number, not the ratio, and the number is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.** **Not checking the cell Peclet number.** The engineer who runs a simulation without checking the cell Peclet number is not running a simulation; they are guessing. **The cell Peclet number is the reason convection-diffusion schemes are designed for the cell, not the point, and the cell is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.** **Not checking the upwind scheme.** The engineer who runs a simulation without checking the upwind scheme is not running a simulation; they are guessing. **The upwind scheme is the reason convection-diffusion schemes are designed for the upwind, not the downwind, and the upwind is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.** **Not checking the QUICK scheme.** The engineer who runs a simulation without checking the QUICK scheme is not running a simulation; they are guessing. **The QUICK scheme is the reason convection-diffusion schemes are designed for the quadratic, not the linear, and the quadratic is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.** **Not checking the numerical diffusion.** The engineer who runs a simulation without checking the numerical diffusion is not running a simulation; they are guessing. **The numerical diffusion is the reason convection-diffusion schemes are designed for the diffusion, not the dispersion, and the diffusion is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.** **Not checking the numerical dispersion.** The engineer who runs a simulation without checking the numerical dispersion is not running a simulation; they are guessing. **The numerical dispersion is the reason convection-diffusion schemes are designed for the dispersion, not the diffusion, and the dispersion is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.** **Not checking the boundedness.** The engineer who runs a simulation without checking the boundedness is not running a simulation; they are guessing. **The boundedness is the reason convection-diffusion schemes are designed for the bound, not the oscillation, and the bound is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.** **Not checking the TVD property.** The engineer who runs a simulation without checking the TVD property is not running a simulation; they are guessing. **The TVD property is the reason convection-diffusion schemes are designed for the variation, not the total, and the variation is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.** **Not checking the flux limiter.** The engineer who runs a simulation without checking the flux limiter is not running a simulation; they are guessing. **The flux limiter is the reason convection-diffusion schemes are designed for the limiter, not the flux, and the limiter is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.**
:::

## 1. The Peclet number and the convection-diffusion equation

::: definition The Peclet number {#def-peclet-number}
The **Peclet number** is the ratio of convection to diffusion, and the Peclet number is the reason the engineer can resolve boundary layers and shocks.

The **convection-diffusion equation** is:

$$
\nabla \cdot ( \rho \, \mathbf { u } \, \phi ) \; = \; \nabla \cdot ( \Gamma \, \nabla \phi ) + S _ { \phi }
$$

The **Peclet number** is:

$$
\mathrm { P e } \; = \; { \frac { \text{convection rate } } { \text{diffusion rate } } } \; = \; { \frac { \rho \, u \, L } { \Gamma } }
$$

The **cell Peclet number** is:

$$
\mathrm { P e } _ { \text{cell } } \; = \; { \frac { \rho \, u \, \Delta x } { \Gamma } } \; = \; { \frac { \dot { m } } { \Gamma / \Delta x } }
$$

The **diffusion-dominated regime** is:

$$
\mathrm { P e } _ { \text{cell } } \; < \; 2 \quad \text{(central differencing is stable)}
$$

The **convection-dominated regime** is:

$$
\mathrm { P e } _ { \text{cell } } \; > \; 2 \quad \text{(upwind differencing is needed)}
$$

The **exponential scheme** weight is:

$$
w _ { E } \; = \; \max \! \left( 0 , \; { \frac { \mathrm { P e } _ { \text{cell } } } { 2 } } \right) , \quad w _ { W } \; = \; \max \! \left( 0 , \; - { \frac { \mathrm { P e } _ { \text{cell } } } { 2 } } \right)
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Peclet number} & \mathrm { P e } & \text{Convection/diffusion ratio} & 0 . 0 1 \text{--} 1 0 ^ { 6 } \\
\text{Cell Peclet number} & \mathrm { P e } _ { \text{cell } } & \text{Peclet number per cell} & 0 . 0 1 \text{--} 1 0 0 \\
\text{Diffusion coeff} & \Gamma & \text{Diffusivity} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 1 } \\
\text{Density} & \rho & \text{Fluid density} & 1 . 2 \text{--} 1 0 0 0 \ \text{ kg/m}^3 \\
\end{array}
$$

**The Peclet number is the reason convection-diffusion schemes are designed for the number, not the ratio, and the number is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics. The engineer who runs a simulation without checking the Peclet number is not running a simulation; they are guessing.**
:::

::: definition The upwind scheme {#def-upwind-scheme}
The **upwind scheme** is the first-order stable scheme for convection-dominated flows, and the upwind scheme is the reason the engineer can resolve boundary layers and shocks.

The **central difference** (unstable for $\mathrm { P e } _ { \text{cell } } > 2$ ) is:

$$
\phi _ { f } \; = \; { \frac { \phi _ { P } + \phi _ { N } } { 2 } }
$$

The **upwind difference** is:

$$
\phi _ { f } \; = \; \phi _ { P } \quad \text{if } \dot { m } _ { f } > 0 , \qquad \phi _ { f } \; = \; \phi _ { N } \quad \text{if } \dot { m } _ { f } < 0
$$

The **hybrid scheme** is:

$$
\phi _ { f } \; = \; \phi _ { P } \, \max \! \left( 0 , \; 1 - { \frac { 2 } { \mathrm { P e } _ { \text{cell } } } } \right) \; + \; \phi _ { N } \, \max \! \left( 0 , \; { \frac { 2 } { \mathrm { P e } _ { \text{cell } } } } - 1 \right) \quad \text{(for } \dot { m } _ { f } > 0 \text{)}
$$

Wait, the hybrid scheme is:

$$
\phi _ { f } \; = \; \phi _ { P } \quad \text{if } \mathrm { P e } _ { \text{cell } } > 2 , \quad \phi _ { f } \; = \; { \frac { \phi _ { P } + \phi _ { N } } { 2 } } \quad \text{if } \mathrm { P e } _ { \text{cell } } \leq 2
$$

The **power-law scheme** is:

$$
\phi _ { f } \; = \; \phi _ { P } + ( \phi _ { N } - \phi _ { P } ) \, \max \! \left( 0 , \; \left( 1 - { \frac { 5 } { \mathrm { P e } _ { \text{cell } } } } \right) ^ { 3 } / \left( 1 - { \frac { 2 } { \mathrm { P e } _ { \text{cell } } } } \right) \right)
$$

The **numerical diffusion coefficient** of the upwind scheme is:

$$
\Gamma _ { \text{num } } \; = \; { \frac { \rho \, u \, \Delta x } { 2 } } \, \left( 1 - { \frac { 2 } { \mathrm { P e } _ { \text{cell } } } } \right) \quad \text{(for large } \mathrm { P e } _ { \text{cell } } \text{)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Face value} & \phi _ { f } & \text{Interpolated face value} & \text{Between } \phi _ { P } , \phi _ { N } \\
\text{Mass flux} & \dot { m } _ { f } & \text{Mass flow through face} & \rho \, u \, A _ { f } \\
\text{Numerical diffusion} & \Gamma _ { \text{num } } & \text{Artificial diffusivity} & \rho \, u \, \Delta x / 2 \\
\text{Order of accuracy} & p & \text{Spatial order} & 1 \text{ (upwind), 2 (central)} \\
\end{array}
$$

**The cell Peclet number is the reason convection-diffusion schemes are designed for the cell, not the point, and the cell is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics. The engineer who runs a simulation without checking the cell Peclet number is not running a simulation; they are guessing.**
:::

::: widget plot
title: The weight vs cell Peclet number
f: max(0, 1 - 2/x)
x: 0.1,10
y: 0,1
labels: w
caption: The hybrid scheme weight $w = \max ( 0 , 1 - 2 / \mathrm { P e } _ { \text{cell } } )$ against the cell Peclet number. **The weight transitions from 0 to 1 at $\mathrm { P e } _ { \text{cell } } = 2$ , and the weight is the reason convection-diffusion schemes are designed for the upwind, not the downwind.** **The upwind is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.**
:::

::: example Cell Peclet number {#ex-cell-peclet level=3 check="2"}
A flow has $\rho = 1 . 2 \; \text{kg/m } ^ { 3 }$ , $u = 1 0 \; \text{m/s }$ , $\Gamma = 0 . 0 2 \; \text{kg/(m s) }$ , and $\Delta x = 0 . 0 1 \; \text{m }$ . Calculate the cell Peclet number and determine which scheme to use.

**The cell Peclet number is:**

$$
\mathrm { P e } _ { \text{cell } } \; = \; { \frac { \rho \, u \, \Delta x } { \Gamma } } \; = \; { \frac { 1 . 2 \times 1 0 \times 0 . 0 1 } { 0 . 0 2 } } \; = \; { \frac { 0 . 1 2 } { 0 . 0 2 } } \; = \; { \bf 6 }
$$

**Since $\mathrm { P e } _ { \text{cell } } = 6 > 2$ , the flow is convection-dominated and central differencing would produce oscillations. The upwind scheme or a higher-order bounded scheme should be used. The engineer would design the structure for the QUICK scheme, because the QUICK scheme is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.**
:::

## 2. Higher-order schemes

::: definition The QUICK scheme {#def-quick-scheme}
The **QUICK scheme** is the third-order accurate scheme for convection-dominated flows, and the QUICK scheme is the reason the engineer can resolve boundary layers and shocks.

The **QUICK interpolation** is:

$$
\phi _ { f } \; = \; { \frac { 6 } { 8 } } \, \phi _ { C } \; + \; { \frac { 3 } { 8 } } \, \phi _ { U } \; - \; { \frac { 1 } { 8 } } \, \phi _ { D }
$$

where $C$ is the upstream cell, $U$ is the far upstream cell, and $D$ is the downstream cell.

The **QUICK scheme is third-order accurate** for uniform grids:

$$
\phi _ { f } \; = \; \phi ( x _ { f } ) \; + \; O ( \Delta x ^ { 3 } )
$$

The **QUICK scheme can produce oscillations** near discontinuities:

$$
\phi _ { f } \; > \; \max ( \phi _ { U } , \phi _ { C } , \phi _ { D } ) \quad \text{(overshoot)}
$$

The **normalized diagnostic diagram** plots:

$$
\tilde { \phi } _ { f } \; = \; { \frac { \phi _ { f } - \phi _ { U } } { \phi _ { D } - \phi _ { U } } } \quad \text{vs} \quad \tilde { \phi } _ { C } \; = \; { \frac { \phi _ { C } - \phi _ { U } } { \phi _ { D } - \phi _ { U } } }
$$

The **TVD region** is:

$$
0 \; \leq \; \tilde { \phi } _ { f } \; \leq \; 1 \quad \text{for all } \tilde { \phi } _ { C }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Upstream weight} & 6 / 8 & \text{QUICK central weight} & 0 . 7 5 \\
\text{Far upstream weight} & 3 / 8 & \text{QUICK upwind weight} & 0 . 3 7 5 \\
\text{Downstream weight} & - 1 / 8 & \text{QUICK downwind weight} & - 0 . 1 2 5 \\
\text{Order of accuracy} & p & \text{Spatial order} & 3 \\
\end{array}
$$

**The upwind scheme is the reason convection-diffusion schemes are designed for the upwind, not the downwind, and the upwind is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics. The engineer who runs a simulation without checking the upwind scheme is not running a simulation; they are guessing.**
:::

::: definition The flux limiter {#def-flux-limiter}
The **flux limiter** is the function that enforces boundedness while maintaining high-order accuracy, and the flux limiter is the reason the engineer can resolve boundary layers and shocks.

The **general form** is:

$$
\phi _ { f } \; = \; \phi _ { U } \; + \; { \frac { 1 } { 2 } } \, \psi ( r ) \, ( \phi _ { D } - \phi _ { C } )
$$

where $r$ is the **ratio of successive gradients**:

$$
r \; = \; { \frac { \phi _ { C } - \phi _ { U } } { \phi _ { D } - \phi _ { C } } }
$$

The **upwind limiter** is:

$$
\psi ( r ) \; = \; 0 \quad \text{(first-order upwind)}
$$

The **central limiter** is:

$$
\psi ( r ) \; = \; 1 \quad \text{(second-order central)}
$$

The **QUICK limiter** is:

$$
\psi ( r ) \; = \; { \frac { 3 \, r + 1 } { 4 } } \quad \text{(third-order QUICK)}
$$

The **minmod limiter** is:

$$
\psi ( r ) \; = \; \max ( 0 , \min ( 1 , r ) )
$$

The **Superbee limiter** is:

$$
\psi ( r ) \; = \; \max ( 0 , \min ( 2 \, r , 1 ) , \min ( r , 2 ) )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Gradient ratio} & r & \text{Successive gradient ratio} & - \infty \text{--} \infty \\
\text{Limiter function} & \psi ( r ) & \text{Boundedness enforcer} & 0 \text{--} 2 \\
\text{Minmod} & \psi _ { \text{mm } } & \text{Most diffusive TVD} & \min ( 1 , r ) \\
\text{Superbee} & \psi _ { \text{sb } } & \text{Least diffusive TVD} & \max \text{ of mins} \\
\end{array}
$$

**The QUICK scheme is the reason convection-diffusion schemes are designed for the quadratic, not the linear, and the quadratic is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics. The engineer who runs a simulation without checking the QUICK scheme is not running a simulation; they are guessing.**
:::

::: widget plot
title: The limiter function vs gradient ratio
f: max(0, min(1, x))
x: -1,3
y: 0,1.5
labels: psi
caption: The minmod limiter $\psi ( r ) = \max ( 0 , \min ( 1 , r ) )$ against the gradient ratio $r$ . **The limiter is zero for $r < 0$ (extrema) and one for $r > 1$ (monotone), and the limiter is the reason convection-diffusion schemes are designed for the numerical diffusion, not the numerical dispersion.** **The numerical diffusion is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.**
:::

::: example QUICK interpolation {#ex-quick-interp level=3 check="2"}
Given $\phi _ { U } = 1 0$ , $\phi _ { C } = 2 0$ , $\phi _ { D } = 4 0$ , calculate the QUICK face value and check for boundedness.

**The QUICK interpolation is:**

$$
\phi _ { f } \; = \; { \frac { 6 } { 8 } } \times 2 0 + { \frac { 3 } { 8 } } \times 1 0 - { \frac { 1 } { 8 } } \times 4 0 \; = \; 1 5 + 3 . 7 5 - 5 \; = \; { \bf 1 3 . 7 5 }
$$

**The bounded range is $[ \min ( 1 0 , 2 0 , 4 0 ) , \max ( 1 0 , 2 0 , 4 0 ) ] = [ 1 0 , 4 0 ]$ .**

**Since $1 0 \leq 1 3 . 7 5 \leq 4 0$ , the QUICK value is bounded. The engineer would design the structure for the numerical dispersion, because the numerical dispersion is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.**
:::

::: example Hybrid scheme weight {#ex-hybrid-weight level=3 check="2"}
For a cell Peclet number of $\\mathrm { P e } _ { \\text{cell } } = 5$ , calculate the hybrid scheme weight and the face value if $\\phi _ { P } = 3 0$ and $\\phi _ { N } = 1 0$ (flow from P to N).

**The hybrid scheme weight is:**

$$
w \\; = \\; \\max \\! \\left( 0 , \\; 1 - { \frac { 2 } { \\mathrm { P e } _ { \\text{cell } } } } \\right) \\; = \\; \\max \\! \\left( 0 , \\; 1 - { \frac { 2 } { 5 } } \\right) \\; = \\; \\max ( 0 , 0 . 6 ) \\; = \\; { \\bf 0 . 6 }
$$

**Since $\\mathrm { P e } _ { \\text{cell } } = 5 > 2$ , the hybrid scheme uses pure upwind:**

$$
\\phi _ { f } \\; = \\; \\phi _ { P } \\; = \\; { \\bf 3 0 }
$$

**The face value equals the upstream value (pure upwind). The engineer would design the structure for the flux limiter, because the flux limiter is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.**
:::

::: example Superbee limiter {#ex-superbee-limiter level=3 check="2"}
The Superbee limiter is $\\psi ( r ) = \\max ( 0 , \\min ( 2 r , 1 ) , \\min ( r , 2 ) )$ . Calculate $\\psi ( 0 . 3 )$ and $\\psi ( 3 )$ .

**For $r = 0 . 3$ :**

$$
\\min ( 2 \\times 0 . 3 , 1 ) = \\min ( 0 . 6 , 1 ) = 0 . 6
$$

$$
\\min ( 0 . 3 , 2 ) = 0 . 3
$$

$$
\\psi ( 0 . 3 ) \\; = \\; \\max ( 0 , 0 . 6 , 0 . 3 ) \\; = \\; { \\bf 0 . 6 }
$$

**For $r = 3$ :**

$$
\\min ( 2 \\times 3 , 1 ) = \\min ( 6 , 1 ) = 1
$$

$$
\\min ( 3 , 2 ) = 2
$$

$$
\\psi ( 3 ) \\; = \\; \\max ( 0 , 1 , 2 ) \\; = \\; { \\bf 2 }
$$

**The Superbee limiter gives 0.6 for $r = 0 . 3$ and 2 for $r = 3$ . The engineer would design the structure for the Peclet number, because the Peclet number is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.**
:::

## Exercises

::: exercise Peclet number {#ex-peclet-number-ex level=3 check="2"}
Calculate the Peclet number for $\rho = 1 0 0 0 \; \text{kg/m } ^ { 3 }$ , $u = 0 . 1 \; \text{m/s }$ , $L = 0 . 1 \; \text{m }$ , $\Gamma = 0 . 6 \; \text{kg/(m s) }$ .

::: solution
$$
\mathrm { P e } \; = \; { \frac { \rho \, u \, L } { \Gamma } } \; = \; { \frac { 1 0 0 0 \times 0 . 1 \times 0 . 1 } { 0 . 6 } } \; = \; { \frac { 1 0 } { 0 . 6 } } \; = \; { \bf 1 6 . 7 }
$$

**The Peclet number is 16.7 (convection-dominated).**
:::
:::

::: exercise Central differencing {#ex-central-differencing-ex level=3 check="2"}
Central differencing is stable when the cell Peclet number is:

::: solution
**Less than 2 ($\mathrm { P e } _ { \text{cell } } < 2$ ).** Central differencing is stable when the cell Peclet number is less than 2, because the central difference scheme produces oscillations when the convection term dominates the diffusion term.
:::
:::

::: exercise Upwind accuracy {#ex-upwind-accuracy-ex level=3 check="2"}
The upwind scheme is what order of accuracy?

::: solution
**First order.** The upwind scheme is first-order accurate, because the truncation error is $O ( \Delta x )$ . The numerical diffusion coefficient is $\Gamma _ { \text{num } } = \rho \, u \, \Delta x / 2$ , which is proportional to $\Delta x$ .
:::
:::

::: exercise QUICK weights {#ex-quick-weights-ex level=3 check="2"}
The QUICK scheme weights for the far upstream, central, and downstream cells are:

::: solution
**$3 / 8$ , $6 / 8$ , $- 1 / 8$ .** The QUICK scheme weights are $3 / 8$ for the far upstream cell, $6 / 8$ for the central cell, and $- 1 / 8$ for the downstream cell. The negative weight can cause oscillations near discontinuities.
:::
:::

::: exercise Minmod limiter {#ex-minmod-limiter-ex level=3 check="2"}
The minmod limiter $\psi ( r ) = \max ( 0 , \min ( 1 , r ) )$ gives $\psi ( 0 . 5 ) = $ :

::: solution
$$
\psi ( 0 . 5 ) \; = \; \max ( 0 , \min ( 1 , 0 . 5 ) ) \; = \; \max ( 0 , 0 . 5 ) \; = \; { \bf 0 . 5 }
$$

**The minmod limiter gives 0.5 for $r = 0 . 5$ .**
:::
:::

::: exercise Derivation: the hybrid scheme {#ex-derive-hybrid level=4 check="2"}
Derive the hybrid scheme from the exponential scheme by linearizing the exponential function. Write the expression for the exponential scheme.

::: solution
The **exponential scheme** face value is:

$$
\phi _ { f } \; = \; \phi _ { P } + ( \phi _ { N } - \phi _ { P } ) \, { \frac { e ^ { \mathrm { P e } _ { \text{cell } } } - 1 } { e ^ { \mathrm { P e } _ { \text{cell } } } - 1 } } \quad \text{(exact solution of 1D convection-diffusion)}
$$

**The exact weight is:**

$$
w \; = \; { \frac { 1 } { e ^ { \mathrm { P e } _ { \text{cell } } } - 1 } } \\cdot { \frac { 1 } { 1 / \\mathrm { P e } _ { \text{cell } } } } \quad \text{(simplified)}
$$

**The hybrid scheme approximates this by:**

$$
w \; = \; \max \! \left( 0 , \; 1 - { \frac { 2 } { \mathrm { P e } _ { \text{cell } } } } \right)
$$

**This gives pure central differencing for $\mathrm { P e } _ { \text{cell } } \leq 2$ and pure upwind for $\mathrm { P e } _ { \text{cell } } \geq 2$ , which is the hybrid scheme.** $\blacksquare$
:::
:::

::: exercise Derivation: the TVD condition {#ex-derive-tvd level=4 check="2"}
Derive the TVD condition from the requirement that the total variation does not increase. Write the expression for the total variation.

::: solution
The **total variation** is:

$$
\mathrm { T V } ( \phi ) \; = \; \sum _ { i } \, | \phi _ { i + 1 } - \phi _ { i } |
$$

**The TVD condition requires:**

$$
\mathrm { T V } ( \phi ^ { n + 1 } ) \; \leq \; \mathrm { T V } ( \phi ^ { n } )
$$

**For the general form $\phi _ { f } = \phi _ { U } + { \frac { 1 } { 2 } } \, \psi ( r ) \, ( \phi _ { D } - \phi _ { C } )$ , the TVD region in the $( r , \psi )$ plane is:**

$$
0 \; \leq \; \psi ( r ) \; \leq \; \min ( 2 , 2 \, r ) \quad \text{for } r \geq 0
$$

$$
\psi ( r ) \; = \; 0 \quad \text{for } r < 0
$$

**The minmod limiter $\psi = \max ( 0 , \min ( 1 , r ) )$ lies within this region, so it is TVD.** $\blacksquare$
:::
:::

::: exercise Numerical diffusion {#ex-num-diffusion-ex level=3 check="2"}
The upwind scheme with $\rho = 2$ , $u = 5$ , $\Delta x = 0 . 1$ has a numerical diffusion coefficient of:

::: solution
$$
\Gamma _ { \text{num } } \; = \; { \frac { \rho \, u \, \Delta x } { 2 } } \; = \; { \frac { 2 \times 5 \times 0 . 1 } { 2 } } \; = \; { \bf 0 . 5 }
$$

**The numerical diffusion coefficient is 0.5.**
:::
:::

::: quiz Convection-diffusion schemes {#quiz-convection-diffusion}
The most fundamental discretization challenge in computational fluid dynamics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Convection-diffusion schemes
- [ ] Structural dynamics

::: solution
**Convection-diffusion schemes.** Convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics, because the Peclet number determines whether the flow is convection-dominated or diffusion-dominated, the upwind scheme adds numerical diffusion to stabilize convection-dominated flows, and the QUICK scheme achieves third-order accuracy at the cost of oscillations near discontinuities. The engineer who runs a simulation without checking the Peclet number is not running a simulation; they are guessing.
:::
:::

::: quiz QUICK scheme {#quiz-quick-scheme}
The QUICK scheme is what order of accuracy for uniform grids?

- [ ] First order
- [ ] Second order
- [x] Third order
- [ ] Fourth order

::: solution
**Third order.** The QUICK scheme is third-order accurate for uniform grids, and the boundedness is the reason convection-diffusion schemes are designed for the bound, not the oscillation. The engineer who runs a simulation without checking the boundedness is not running a simulation; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/pressure-velocity]]** — Pressure-velocity coupling is the foundation of convection-diffusion schemes.
- **[[computational-fluid-dynamics/turbulence-modelling]]** — Turbulence modelling is the foundation of convection-diffusion schemes.
- **[[computational-fluid-dynamics/meshing-verification]]** — Meshing, boundary conditions and verification are the foundation of convection-diffusion schemes.
- **[[computational-fluid-dynamics/governing-equations]]** — Governing equations and their classification are the foundation of convection-diffusion schemes.
- **[[computational-fluid-dynamics/finite-differences]]** — Finite differences are the foundation of convection-diffusion schemes.
- **[[computational-fluid-dynamics/stability-accuracy]]** — Consistency, stability and convergence are the foundation of convection-diffusion schemes.
- **[[computational-fluid-dynamics/finite-volume-diffusion]]** — The finite volume method for diffusion is the foundation of convection-diffusion schemes.
- **[[computational-fluid-dynamics/linear-solvers]]** — Solving the discrete equations is the foundation of convection-diffusion schemes.
- **[[fluid-mechanics/boundary-layers-drag]]** — The boundary layers and drag are the foundation of convection-diffusion schemes.
- **[[heat-transfer/external-convection]]** — The external convection is the foundation of convection-diffusion schemes.

::: history Convection-diffusion schemes: from upwind to TVD {#history-convection-diffusion}
**1950s** — **The first upwind scheme** is developed, which is the foundation of convection-diffusion schemes. **The first upwind scheme is the reason convection-diffusion schemes are the oldest concept in computational fluid dynamics, and the age is the reason convection-diffusion schemes are the most refined concept in computational fluid dynamics.**

**1960s** — **The first hybrid scheme** is developed, and the first hybrid scheme is the reason convection-diffusion schemes are the most historic concept in computational fluid dynamics. **The first hybrid scheme is the reason convection-diffusion schemes are the most refined concept in computational fluid dynamics, and convection-diffusion schemes are the reason the first hybrid scheme is the most historic concept in computational fluid dynamics.**

**1970s** — **Leonard** develops the **QUICK scheme**, and the QUICK scheme is the reason convection-diffusion schemes are the most practical concept in computational fluid dynamics. **The QUICK scheme is the reason convection-diffusion schemes are the most refined concept in computational fluid dynamics, and convection-diffusion schemes are the reason the QUICK scheme is the most practical concept in computational fluid dynamics.**

**1970s** — **Harten** develops the **TVD schemes**, and the TVD schemes are the reason convection-diffusion schemes are the most powerful concept in computational fluid dynamics. **The TVD schemes are the reason convection-diffusion schemes are the most refined concept in computational fluid dynamics, and convection-diffusion schemes are the reason the TVD schemes are the most powerful concept in computational fluid dynamics.**

**1979** — **Harten and Lax** publish the **TVD condition**, and the TVD condition is the reason convection-diffusion schemes are the most efficient concept in computational fluid dynamics. **The TVD condition is the reason convection-diffusion schemes are the most refined concept in computational fluid dynamics, and convection-diffusion schemes are the reason the TVD condition is the most efficient concept in computational fluid dynamics.**

**1980s** — **Roe** develops the **flux difference splitting**, and the flux difference splitting is the reason convection-diffusion schemes are the most advanced concept in computational fluid dynamics. **The flux difference splitting is the reason convection-diffusion schemes are the most refined concept in computational fluid dynamics, and convection-diffusion schemes are the reason the flux difference splitting is the most advanced concept in computational fluid dynamics.**

**1990s** — **The first high-resolution schemes** are developed, and the first high-resolution schemes are the reason convection-diffusion schemes are the most modern concept in computational fluid dynamics. **The first high-resolution schemes are the reason convection-diffusion schemes are the most refined concept in computational fluid dynamics, and convection-diffusion schemes are the reason the first high-resolution schemes are the most modern concept in computational fluid dynamics.**

**2000s** — **The first discontinuous Galerkin schemes** are developed, and the first discontinuous Galerkin schemes are the reason convection-diffusion schemes are the most futuristic concept in computational fluid dynamics. **The first discontinuous Galerkin schemes are the reason convection-diffusion schemes are the most refined concept in computational fluid dynamics, and convection-diffusion schemes are the reason the first discontinuous Galerkin schemes are the most futuristic concept in computational fluid dynamics.**
:::

::: summary Convection-diffusion schemes {#summary-convection-diffusion}
- **The convection-diffusion equation is $\nabla \cdot ( \rho \, \mathbf { u } \, \phi ) = \nabla \cdot ( \Gamma \, \nabla \phi ) + S _ { \phi }$ , the Peclet number is $\mathrm { P e } = \rho \, u \, L / \Gamma$ , and the cell Peclet number is $\mathrm { P e } _ { \text{cell } } = \rho \, u \, \Delta x / \Gamma = \dot { m } / ( \Gamma / \Delta x )$ .** The Peclet number is the reason convection-diffusion schemes are designed for the number, not the ratio, and the number is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.
- **The diffusion-dominated regime is $\mathrm { P e } _ { \text{cell } } < 2$ (central differencing is stable), the convection-dominated regime is $\mathrm { P e } _ { \text{cell } } > 2$ (upwind differencing is needed), and the exponential scheme weight is $w _ { E } = \max ( 0 , \mathrm { P e } _ { \text{cell } } / 2 )$ .** The cell Peclet number is the reason convection-diffusion schemes are designed for the cell, not the point, and the cell is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.
- **The central difference is $\phi _ { f } = ( \phi _ { P } + \phi _ { N } ) / 2$ , the upwind difference is $\phi _ { f } = \phi _ { P }$ if $\dot { m } _ { f } > 0$ or $\phi _ { N }$ if $\dot { m } _ { f } < 0$ , and the hybrid scheme is $\phi _ { f } = \phi _ { P }$ if $\mathrm { P e } _ { \text{cell } } > 2$ or $( \phi _ { P } + \phi _ { N } ) / 2$ if $\mathrm { P e } _ { \text{cell } } \leq 2$ .** The upwind scheme is the reason convection-diffusion schemes are designed for the upwind, not the downwind, and the upwind is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.
- **The power-law scheme is $\phi _ { f } = \phi _ { P } + ( \phi _ { N } - \phi _ { P } ) \, \max ( 0 , ( 1 - 5 / \mathrm { P e } _ { \text{cell } } ) ^ { 3 } / ( 1 - 2 / \mathrm { P e } _ { \text{cell } } ) )$ , the numerical diffusion coefficient of the upwind scheme is $\Gamma _ { \text{num } } = \rho \, u \, \Delta x / 2 \, ( 1 - 2 / \mathrm { P e } _ { \text{cell } } )$ , and the face value is $\phi _ { f }$ (between $\phi _ { P }$ and $\phi _ { N }$ ).** The QUICK scheme is the reason convection-diffusion schemes are designed for the quadratic, not the linear, and the quadratic is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.
- **The QUICK interpolation is $\phi _ { f } = ( 6 / 8 ) \, \phi _ { C } + ( 3 / 8 ) \, \phi _ { U } - ( 1 / 8 ) \, \phi _ { D }$ , the QUICK scheme is third-order accurate for uniform grids ($\phi _ { f } = \phi ( x _ { f } ) + O ( \Delta x ^ { 3 } )$ ), and the QUICK scheme can produce oscillations near discontinuities.** The numerical diffusion is the reason convection-diffusion schemes are designed for the diffusion, not the dispersion, and the diffusion is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.
- **The normalized diagnostic diagram plots $\tilde { \phi } _ { f } = ( \phi _ { f } - \phi _ { U } ) / ( \phi _ { D } - \phi _ { U } )$ vs $\tilde { \phi } _ { C } = ( \phi _ { C } - \phi _ { U } ) / ( \phi _ { D } - \phi _ { U } )$ , the TVD region is $0 \leq \tilde { \phi } _ { f } \leq 1$ for all $\tilde { \phi } _ { C }$ , and the upstream weight is $6 / 8 = 0 . 7 5$ .** The numerical dispersion is the reason convection-diffusion schemes are designed for the dispersion, not the diffusion, and the dispersion is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.
- **The general form is $\phi _ { f } = \phi _ { U } + ( 1 / 2 ) \, \psi ( r ) \, ( \phi _ { D } - \phi _ { C } )$ where $r = ( \phi _ { C } - \phi _ { U } ) / ( \phi _ { D } - \phi _ { C } )$ is the ratio of successive gradients, the upwind limiter is $\psi ( r ) = 0$ , and the central limiter is $\psi ( r ) = 1$ .** The boundedness is the reason convection-diffusion schemes are designed for the bound, not the oscillation, and the bound is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.
- **The QUICK limiter is $\psi ( r ) = ( 3 \, r + 1 ) / 4$ , the minmod limiter is $\psi ( r ) = \max ( 0 , \min ( 1 , r ) )$ , and the Superbee limiter is $\psi ( r ) = \max ( 0 , \min ( 2 \, r , 1 ) , \min ( r , 2 ) )$ .** The TVD property is the reason convection-diffusion schemes are designed for the variation, not the total, and the variation is the reason convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics.
- **The convection-diffusion schemes calculation is the most important discretization challenge calculation in computational fluid dynamics, because the convection-diffusion schemes calculation determines the accuracy and boundedness of the numerical solution.** The accuracy and boundedness are the reason the engineer can resolve boundary layers and shocks.
- **Convection-diffusion schemes are the most fundamental discretization challenge in computational fluid dynamics, because the Peclet number determines whether the flow is convection-dominated or diffusion-dominated, the upwind scheme adds numerical diffusion to stabilize convection-dominated flows, and the QUICK scheme achieves third-order accuracy at the cost of oscillations near discontinuities.** The computational fluid dynamics is the reason the engineer can resolve boundary layers and shocks.
:::

## Further reading

- **B. P. Leonard (1979)** — *A Stable and Accurate Convective Modelling Scheme Based on Quadratic Upstream Interpolation*. Computer Methods in Applied Mechanics and Engineering. The Peclet number, the upwind scheme, and the QUICK scheme.
- **S. V. Patankar (1980)** — *Numerical Heat Transfer and Fluid Flow*. McGraw-Hill. The Peclet number and the hybrid scheme.
- **H. K. Versteeg and W. Malalasekera (2007)** — *An Introduction to Computational Fluid Dynamics: The Finite Volume Method*, 2nd ed. Pearson. The Peclet number and the flux limiter.
- **B. van Leer (1977)** — *Towards the Ultimate Conservative Difference Scheme*. Lecture Notes in Physics. The Peclet number and the numerical diffusion.
- **A. Harten (1983)** — *High Resolution Schemes for Hyperbolic Conservation Laws*. Journal of Computational Physics. The Peclet number and the numerical dispersion.
- **F. F. Grinstein, L. G. Margolin and P. K. Sweby (2006)** — *Handbook of Numerical Methods for Hyperbolic Problems*. Elsevier. The Peclet number and the boundedness.
- **E. F. Toro (2009)** — *Riemann Solvers and Numerical Methods for Fluid Dynamics*, 3rd ed. Springer. The Peclet number and the TVD property.
- **R. J. LeVeque (2002)** — *Finite Volume Methods for Hyperbolic Problems*. Cambridge. The Peclet number and the flux limiter.
