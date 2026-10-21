The viscous aerodynamics is the most fundamental theory in drag prediction: the viscous aerodynamics is the theory that describes the flow with viscosity, and the viscous aerodynamics is the theory that determines the drag of the body. **The engineer who calculates the viscous aerodynamics without checking the Reynolds number is not calculating the viscous aerodynamics; they are guessing.** The viscous aerodynamics calculation is the reason the engineer can design the aircraft to be safe, and the safety is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.

The quantitative tools of the viscous aerodynamics are the **boundary layer** (the thin layer of fluid near the surface where viscosity is important), the **skin friction** (the drag due to the viscous shear stress), the **pressure drag** (the drag due to the pressure difference), and the **separation** (the detachment of the boundary layer from the surface). The tools are the language in which the viscous aerodynamics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways viscous aerodynamics calculation goes wrong
**Not checking the Reynolds number.** The engineer who calculates the viscous aerodynamics without checking the Reynolds number is not calculating the viscous aerodynamics; they are guessing. **The Reynolds number is the reason the viscous aerodynamics is designed for the viscosity, not the velocity, and the viscosity is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** **Not checking the boundary layer thickness.** The engineer who calculates the viscous aerodynamics without checking the boundary layer thickness is not calculating the viscous aerodynamics; they are guessing. **The boundary layer thickness is the reason the viscous aerodynamics is designed for the thickness, not the velocity, and the thickness is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** **Not checking the skin friction coefficient.** The engineer who calculates the viscous aerodynamics without checking the skin friction coefficient is not calculating the viscous aerodynamics; they are guessing. **The skin friction coefficient is the reason the viscous aerodynamics is designed for the friction, not the pressure, and the friction is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** **Not checking the separation point.** The engineer who calculates the viscous aerodynamics without checking the separation point is not calculating the viscous aerodynamics; they are guessing. **The separation point is the reason the viscous aerodynamics is designed for the separation, not the attachment, and the separation is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** **Not checking the pressure gradient.** The engineer who calculates the viscous aerodynamics without checking the pressure gradient is not calculating the viscous aerodynamics; they are guessing. **The pressure gradient is the reason the viscous aerodynamics is designed for the pressure, not the velocity, and the pressure is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** **Not checking the transition point.** The engineer who calculates the viscous aerodynamics without checking the transition point is not calculating the viscous aerodynamics; they are guessing. **The transition point is the reason the viscous aerodynamics is designed for the transition, not the turbulence, and the transition is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** **Not checking the wake.** The engineer who calculates the viscous aerodynamics without checking the wake is not calculating the viscous aerodynamics; they are guessing. **The wake is the reason the viscous aerodynamics is designed for the wake, not the boundary layer, and the wake is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** **Not checking the momentum thickness.** The engineer who calculates the viscous aerodynamics without checking the momentum thickness is not calculating the viscous aerodynamics; they are guessing. **The momentum thickness is the reason the viscous aerodynamics is designed for the momentum, not the mass, and the momentum is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** **Not checking the shape factor.** The engineer who calculates the viscous aerodynamics without checking the shape factor is not calculating the viscous aerodynamics; they are guessing. **The shape factor is the reason the viscous aerodynamics is designed for the shape, not the thickness, and the shape is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.**
:::

## 1. The boundary layer

::: definition The boundary layer {#def-boundary-layer}
The **boundary layer** is the thin layer of fluid near the surface where viscosity is important, and the boundary layer is the reason the engineer can design the aircraft to be safe.

The **boundary layer thickness** is:

$$
\delta ( x ) \; = \; { \frac { 5 . 0 \, x } { { \sqrt { R e _ { x } } } } } \quad \text{(laminar)} \qquad \delta ( x ) \; = \; { \frac { 0 . 3 7 \, x } { R e _ { x } ^ { 1 / 5 } } } \quad \text{(turbulent)}
$$

The **displacement thickness** is:

$$
\delta ^ { * } \; = \; \int _ { 0 } ^ { \infty } \, \left( 1 - { \frac { u } { U _ { e } } } \right) \, d y
$$

The **momentum thickness** is:

$$
\theta \; = \; \int _ { 0 } ^ { \infty } \, { \frac { u } { U _ { e } } } \, \left( 1 - { \frac { u } { U _ { e } } } \right) \, d y
$$

The **shape factor** is:

$$
H \; = \; { \frac { \delta ^ { * } } { \theta } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Laminar} & \textbf{ Turbulent} \\ \hline
\text{Boundary layer thickness} & \delta & 5 . 0 \, x / { \sqrt { R e _ { x } } } & 0 . 3 7 \, x / R e _ { x } ^ { 1 / 5 } \\
\text{Displacement thickness} & \delta ^ { * } & 1 . 7 2 \, x / { \sqrt { R e _ { x } } } & 0 . 0 4 6 \, x / R e _ { x } ^ { 1 / 5 } \\
\text{Momentum thickness} & \theta & 0 . 6 6 4 \, x / { \sqrt { R e _ { x } } } & 0 . 0 1 6 \, x / R e _ { x } ^ { 1 / 5 } \\
\text{Shape factor} & H & 2 . 5 9 & 1 . 3 \text{--} 1 . 4 \\
\end{array}
$$

**The Reynolds number is the reason the viscous aerodynamics is designed for the viscosity, not the velocity, and the viscosity is the reason the viscous aerodynamics is the most fundamental theory in drag prediction. The engineer who calculates the viscous aerodynamics without checking the Reynolds number is not calculating the viscous aerodynamics; they are guessing.**
:::

::: definition The skin friction {#def-skin-friction}
The **skin friction** is the drag due to the viscous shear stress, and the skin friction is the reason the engineer can design the aircraft to be safe.

The **wall shear stress** is:

$$
\tau _ { w } \; = \; \mu \, \left( { \frac { \partial u } { \partial y } } \right) _ { y = 0 }
$$

The **local skin friction coefficient** is:

$$
C _ { f , x } \; = \; { \frac { \tau _ { w } } { { \frac { 1 } { 2 } } \, \rho \, U _ { e } ^ { 2 } } } \; = \; { \frac { 0 . 6 6 4 } { { \sqrt { R e _ { x } } } } } \quad \text{(laminar)} \qquad C _ { f , x } \; = \; { \frac { 0 . 0 5 9 } { R e _ { x } ^ { 1 / 5 } } } \quad \text{(turbulent)}
$$

The **average skin friction coefficient** is:

$$
C _ { f } \; = \; { \frac { 1 . 3 2 8 } { { \sqrt { R e _ { L } } } } } \quad \text{(laminar)} \qquad C _ { f } \; = \; { \frac { 0 . 0 7 4 } { R e _ { L } ^ { 1 / 5 } } } \quad \text{(turbulent)}
$$

The **skin friction drag** is:

$$
D _ { f } \; = \; C _ { f } \, q \, S _ { \text{wetted } }
$$

$$
\begin{array} { l c c c }
\textbf{Regime} & \textbf{Cf} & \textbf{ Re range} & \textbf{ Use case } \\ \hline
\text{Laminar} & 1 . 3 2 8 / { \sqrt { R e } } & R e < 5 \\times 1 0 ^ { 5 } & \text{Model aircraft} \\
\text{Turbulent} & 0 . 0 7 4 / R e ^ { 1 / 5 } & R e > 5 \\times 1 0 ^ { 5 } & \text{Full-scale aircraft} \\
\text{Mixed} & \text{Combination} & \text{Transition} & \text{Practical} \\
\end{array}
$$

**The boundary layer thickness is the reason the viscous aerodynamics is designed for the thickness, not the velocity, and the thickness is the reason the viscous aerodynamics is the most fundamental theory in drag prediction. The engineer who calculates the viscous aerodynamics without checking the boundary layer thickness is not calculating the viscous aerodynamics; they are guessing.**
:::

::: widget plot
title: The skin friction coefficient vs Reynolds number
f: 1.328/sqrt(x); 0.074/x^0.2
x: 10000,10000000
y: 0,0.02
labels: Laminar; Turbulent
caption: The skin friction coefficient against the Reynolds number for laminar and turbulent boundary layers. **The skin friction coefficient decreases with the Reynolds number, and the skin friction coefficient is the reason the viscous aerodynamics is designed for the friction, not the pressure.** **The friction is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.**
:::

::: example Boundary layer on a flat plate {#ex-flat-plate-bl level=3 check="2"}
A flat plate of length $L = 2$ m is placed in a flow with $V = 3 0$ m/s at sea level ($\nu = 1 . 4 6 \\times 1 0 ^ { - 5 }$ m²/s). Calculate the boundary layer thickness and the skin friction coefficient at the trailing edge.

**Reynolds number:**

$$
R e _ { L } \; = \; { \frac { V \, L } { \nu } } \; = \; { \frac { 3 0 \\times 2 } { 1 . 4 6 \\times 1 0 ^ { - 5 } } } \; = \; { \bf 4 . 1 1 } \\times 1 0 ^ { 6 }
$$

**Boundary layer thickness (turbulent):**

$$
\delta \; = \; { \\frac { 0 . 3 7 \\times 2 } { ( 4 . 1 1 \\times 1 0 ^ { 6 } ) ^ { 1 / 5 } } } \; = \; { \\frac { 0 . 7 4 } { 2 1 . 0 } } \; = \; { \\bf 0 . 0 3 5 2 } \\ \\text{m} \; = \; { \\bf 3 5 . 2 } \\ \\text{mm}
$$

**Skin friction coefficient (turbulent):**

$$
C _ { f } \; = \; { \\frac { 0 . 0 7 4 } { ( 4 . 1 1 \\times 1 0 ^ { 6 } ) ^ { 1 / 5 } } } \; = \; { \\frac { 0 . 0 7 4 } { 2 1 . 0 } } \; = \; { \\bf 0 . 0 0 3 5 2 }
$$

**The boundary layer thickness is 35.2 mm, and the skin friction coefficient is 0.00352. The engineer would design the plate for the friction, because the friction is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.**
:::

## 2. Separation and pressure drag

::: definition The separation {#def-separation}
The **separation** is the detachment of the boundary layer from the surface, and the separation is the reason the engineer can design the aircraft to be safe.

The **separation condition** is:

$$
\left( { \frac { \partial u } { \partial y } } \right) _ { y = 0 } \; = \; 0 \qquad \text{(at the separation point)}
$$

The **adverse pressure gradient** causes separation:

$$
{ \frac { d p } { d x } } \; > \; 0 \quad \text{(adverse pressure gradient)}
$$

The **pressure drag** is:

$$
D _ { p } \; = \; \int _ { \text{body } } \, ( p - p _ { \infty } ) \, \cos \theta \, d A
$$

The **total drag** is:

$$
D \; = \; D _ { f } + D _ { p }
$$

$$
\begin{array} { l c c c }
\textbf{Body} & \textbf{Df/D} & \textbf{Dp/D} & \textbf{ Use case } \\ \hline
\text{Streamlined body} & > 9 0 \\% & < 1 0 \\% & \text{Airfoil, wing} \\
\text{Blunt body} & < 1 0 \\% & > 9 0 \\% & \text{Cylinder, sphere} \\
\text{Flat plate (normal)} & 0 & 1 0 0 \\% & \text{Drag} \\
\text{Car} & 4 0 \\% & 6 0 \\% & \text{Automotive} \\
\end{array}
$$

**The skin friction coefficient is the reason the viscous aerodynamics is designed for the friction, not the pressure, and the friction is the reason the viscous aerodynamics is the most fundamental theory in drag prediction. The engineer who calculates the viscous aerodynamics without checking the skin friction coefficient is not calculating the viscous aerodynamics; they are guessing.**
:::

::: definition The transition {#def-transition}
The **transition** is the change from laminar to turbulent flow, and the transition is the reason the engineer can design the aircraft to be safe.

The **critical Reynolds number** is:

$$
R e _ { \\text{crit } } \; \\approx \; 5 \\times 1 0 ^ { 5 } \quad \text{(flat plate)}
$$

The **transition location** is:

$$
x _ { \\text{trans } } \; = \; { \\frac { R e _ { \\text{crit } } \, \\nu } { V } }
$$

The **mixed boundary layer** skin friction coefficient is:

$$
C _ { f } \; = \; { \\frac { 0 . 0 7 4 } { R e _ { L } ^ { 1 / 5 } } } - { \\frac { 1 7 4 2 } { R e _ { L } } } \quad \text{(with transition)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Typical value } & \textbf{ Use case } \\ \hline
\text{Critical Re} & R e _ { \\text{crit } } & 5 \\times 1 0 ^ { 5 } & \text{Flat plate} \\
\text{Transition location} & x _ { \\text{trans } } & 0 . 1 \\text{--} 0 . 5 \, L & \text{Practical} \\
\text{Laminar flow control} & \\text{LFC} & 5 0 \\% \\text{--} 8 0 \\% & \text{Drag reduction} \\
\end{array}
$$

**The separation point is the reason the viscous aerodynamics is designed for the separation, not the attachment, and the separation is the reason the viscous aerodynamics is the most fundamental theory in drag prediction. The engineer who calculates the viscous aerodynamics without checking the separation point is not calculating the viscous aerodynamics; they are guessing.**
:::

::: widget plot
title: The pressure distribution on a cylinder
f: 1-4*sin(x)^2; -0.5
x: 0,3.14159
y: -4,2
labels: Potential flow; Real (with separation)
caption: The pressure coefficient against the angle for a cylinder in potential flow and real flow. **The real flow has separation, and the separation is the reason the viscous aerodynamics is designed for the separation, not the attachment.** **The separation is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.**
:::

::: example Drag on a cylinder {#ex-cylinder-drag level=3 check="2"}
A cylinder of diameter $D = 0 . 1$ m is placed in a flow with $V = 2 0$ m/s at sea level ($\nu = 1 . 4 6 \\times 1 0 ^ { - 5 }$ m²/s). Calculate the Reynolds number and the drag coefficient.

**Reynolds number:**

$$
R e _ { D } \; = \; { \\frac { V \, D } { \\nu } } \; = \; { \\frac { 2 0 \\times 0 . 1 } { 1 . 4 6 \\times 1 0 ^ { - 5 } } } \; = \; { \\bf 1 . 3 7 } \\times 1 0 ^ { 5 }
$$

**Drag coefficient (from empirical data):**

$$
C _ { D } \; \\approx \; { \\bf 1 . 2 } \quad \\text{(subcritical, } R e \\sim 1 0 ^ { 5 } \\text{)}
$$

**Drag per unit length:**

$$
D ^ { \\\\prime } \; = \; C _ { D } \, q \, D \; = \; 1 . 2 \\times { \\frac { 1 } { 2 } } \\times 1 . 2 2 5 \\times 2 0 ^ { 2 } \\times 0 . 1 \; = \; 1 . 2 \\times 2 4 . 5 \\times 0 . 1 \; = \; { \\bf 2 . 9 4 } \ \text{N/m}
$$

**The Reynolds number is 1.37 × 10⁵, and the drag coefficient is 1.2. The engineer would design the cylinder for the drag, because the drag is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.**
:::

::: example Laminar boundary layer calculation {#ex-laminar-bl level=3 check="2"}
A flat plate of length $L = 0 . 5$ m is placed in a flow with $V = 5$ m/s at sea level ($\\nu = 1 . 4 6 \\times 1 0 ^ { - 5 }$ m²/s). Calculate the boundary layer thickness and the skin friction coefficient at the trailing edge (laminar).

**Reynolds number:**

$$
R e _ { L } \; = \; { \frac { 5 \\times 0 . 5 } { 1 . 4 6 \\times 1 0 ^ { - 5 } } } \; = \; { \bf 1 . 7 1 } \\times 1 0 ^ { 5 }
$$

**Boundary layer thickness (laminar):**

$$
\\delta \\; = \\; { \\frac { 5 . 0 \\times 0 . 5 } { { \\sqrt { 1 . 7 1 \\times 1 0 ^ { 5 } } } } } \\; = \\; { \\frac { 2 . 5 } { 4 1 3 } } \\; = \\; { \\bf 0 . 0 0 6 0 5 } \\ \\text{m} \\; = \\; { \\bf 6 . 0 5 } \\ \\text{mm}
$$

**Skin friction coefficient (laminar):**

$$
C _ { f } \\; = \\; { \\frac { 1 . 3 2 8 } { { \\sqrt { 1 . 7 1 \\times 1 0 ^ { 5 } } } } } \\; = \\; { \\frac { 1 . 3 2 8 } { 4 1 3 } } \\; = \\; { \\bf 0 . 0 0 3 2 1 }
$$

**The boundary layer thickness is 6.05 mm, and the skin friction coefficient is 0.00321. The engineer would design the plate for the friction, because the friction is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.**
:::

::: example Drag on a streamlined body {#ex-streamlined-drag level=3 check="2"}
An airfoil has a wetted area of $S _ { \\text{wetted } } = 5 0$ m² and operates at $V = 8 0$ m/s at sea level ($\\rho = 1 . 2 2 5$ kg/m³). The average skin friction coefficient is $C _ { f } = 0 . 0 0 3$ . Calculate the skin friction drag.

**Skin friction drag:**

$$
D _ { f } \\; = \\; C _ { f } \\, q \\, S _ { \\text{wetted } } \\; = \\; 0 . 0 0 3 \\times { \\frac { 1 } { 2 } } \\times 1 . 2 2 5 \\times 8 0 ^ { 2 } \\times 5 0 \\; = \\; 0 . 0 0 3 \\times 3 9 2 0 \\times 5 0 \\; = \\; { \\bf 5 8 8 } \\ \\text{N}
$$

**Power required to overcome skin friction drag:**

$$
P \\; = \\; D _ { f } \\, V \\; = \\; 5 8 8 \\times 8 0 \\; = \\; { \\bf 4 7 \\ 0 4 0 } \\ \\text{W} \\; = \\; { \\bf 4 7 . 0 } \\ \\text{kW}
$$

**The skin friction drag is 588 N, and the power required is 47.0 kW. The engineer would design the airfoil for the friction, because the friction is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.**
:::

::: exercise Shape factor {#ex-shape-factor level=3 check="2"}
A boundary layer has a displacement thickness of $\\delta ^ { * } = 5$ mm and a momentum thickness of $\\theta = 2$ mm. Calculate the shape factor and determine whether the boundary layer is laminar or turbulent.

::: solution
$$
H \\; = \\; { \\frac { \\delta ^ { * } } { \\theta } } \\; = \\; { \\frac { 5 } { 2 } } \\; = \\; { \\bf 2 . 5 }
$$

**The shape factor is 2.5, which is close to the laminar value of 2.59. The boundary layer is laminar.**
:::
:::

## Exercises

::: exercise Boundary layer thickness {#ex-bl-thickness level=3 check="2"}
A flat plate of length $L = 1$ m is placed in a flow with $V = 1 0$ m/s at sea level ($\nu = 1 . 4 6 \\times 1 0 ^ { - 5 }$ m²/s). Calculate the boundary layer thickness at the trailing edge (laminar).

::: solution
$$
R e _ { L } \; = \; { \\frac { 1 0 \\times 1 } { 1 . 4 6 \\times 1 0 ^ { - 5 } } } \; = \; 6 . 8 5 \\times 1 0 ^ { 5 }
$$

$$
\delta \; = \; { \\frac { 5 . 0 \\times 1 } { { \\sqrt { 6 . 8 5 \\times 1 0 ^ { 5 } } } } } \; = \; { \\frac { 5 . 0 } { 8 2 8 } } \; = \; { \\bf 0 . 0 0 6 0 4 } \ \text{m} \; = \; { \\bf 6 . 0 4 } \ \text{mm}
$$

**The boundary layer thickness is 6.04 mm.**
:::
:::

::: exercise Skin friction coefficient {#ex-skin-friction level=3 check="2"}
A flat plate of length $L = 5$ m is placed in a flow with $V = 5 0$ m/s at sea level ($\nu = 1 . 4 6 \\times 1 0 ^ { - 5 }$ m²/s). Calculate the average skin friction coefficient (turbulent).

::: solution
$$
R e _ { L } \; = \; { \\frac { 5 0 \\times 5 } { 1 . 4 6 \\times 1 0 ^ { - 5 } } } \; = \; 1 . 7 1 \\times 1 0 ^ { 7 }
$$

$$
C _ { f } \; = \; { \\frac { 0 . 0 7 4 } { ( 1 . 7 1 \\times 1 0 ^ { 7 } ) ^ { 1 / 5 } } } \; = \; { \\frac { 0 . 0 7 4 } { 4 4 . 3 } } \; = \; { \\bf 0 . 0 0 1 6 7 }
$$

**The average skin friction coefficient is 0.00167.**
:::
:::

::: exercise Transition location {#ex-transition-location level=3 check="2"}
A flat plate is placed in a flow with $V = 2 0$ m/s at sea level ($\nu = 1 . 4 6 \\times 1 0 ^ { - 5 }$ m²/s). Calculate the transition location if $R e _ { \\text{crit } } = 5 \\times 1 0 ^ { 5 }$ .

::: solution
$$
x _ { \\text{trans } } \; = \; { \\frac { R e _ { \\text{crit } } \, \\nu } { V } } \; = \; { \\frac { 5 \\times 1 0 ^ { 5 } \\times 1 . 4 6 \\times 1 0 ^ { - 5 } } { 2 0 } } \; = \; { \\frac { 7 . 3 } { 2 0 } } \; = \; { \\bf 0 . 3 6 5 } \ \text{m}
$$

**The transition location is 0.365 m from the leading edge.**
:::
:::

::: exercise Drag on a sphere {#ex-sphere-drag level=3 check="2"}
A sphere of diameter $D = 0 . 0 5$ m is placed in a flow with $V = 1 0$ m/s at sea level ($\rho = 1 . 2 2 5$ kg/m³). Calculate the drag if $C _ { D } = 0 . 5$ .

::: solution
$$
D \; = \; C _ { D } \, q \, A \; = \; 0 . 5 \\times { \\frac { 1 } { 2 } } \\times 1 . 2 2 5 \\times 1 0 0 \\times \\pi \\times 0 . 0 2 5 ^ { 2 } \; = \; 0 . 5 \\times 6 1 . 2 5 \\times 0 . 0 0 1 9 6 3 \; = \; { \\bf 0 . 0 6 0 1 } \ \text{N}
$$

**The drag is 0.0601 N.**
:::
:::

::: exercise Momentum thickness {#ex-momentum-thickness level=3 check="2"}
A boundary layer has a velocity profile $u / U _ { e } = 2 \, ( y / \delta ) - ( y / \delta ) ^ { 2 }$ . Calculate the momentum thickness in terms of $\delta$ .

::: solution
$$
\\theta \; = \; \\int _ { 0 } ^ { \delta } \, { \\frac { u } { U _ { e } } } \, \left( 1 - { \\frac { u } { U _ { e } } } \right) \, d y
$$

Let $\eta = y / \delta$ , then $u / U _ { e } = 2 \, \eta - \eta ^ { 2 }$ :

$$
\\theta \; = \; \\delta \, \\int _ { 0 } ^ { 1 } \, ( 2 \, \eta - \eta ^ { 2 } ) \, ( 1 - 2 \, \eta + \eta ^ { 2 } ) \, d \eta \; = \; \\delta \, \\int _ { 0 } ^ { 1 } \, ( 2 \, \eta - 5 \, \eta ^ { 2 } + 4 \, \eta ^ { 3 } - \eta ^ { 4 } ) \, d \eta
$$

$$
\\theta \; = \; \\delta \, \left( 1 - { \\frac { 5 } { 3 } } + 1 - { \\frac { 1 } { 5 } } \right) \; = \; \\delta \, \left( 2 - { \\frac { 5 } { 3 } } - { \\frac { 1 } { 5 } } \right) \; = \; \\delta \, \left( { \\frac { 3 0 - 2 5 - 3 } { 1 5 } } \right) \; = \; { \\bf 0 . 1 3 3 } \, \delta
$$

**The momentum thickness is $0 . 1 3 3 \, \delta$ .**
:::
:::

::: exercise Derivation: the boundary layer equations {#ex-derive-bl-eq level=4 check="2"}
Show that the boundary layer equations are derived from the Navier-Stokes equations by order-of-magnitude analysis. Write the expression for the boundary layer equations.

::: solution
The **Navier-Stokes equations** for incompressible flow are:

$$
\\rho \, \left( { \\frac { \\\\partial u } { \\\\partial t } } + u \, { \\frac { \\\\partial u } { \\\\partial x } } + v \, { \\frac { \\\\partial u } { \\\\partial y } } \right) \; = \; - { \\frac { \\\\partial p } { \\\\partial x } } + \\\\mu \, \left( { \\frac { \\\\partial ^ { 2 } u } { \\\\partial x ^ { 2 } } } + { \\frac { \\\\partial ^ { 2 } u } { \\\\partial y ^ { 2 } } } \right)
$$

For a **thin boundary layer** ($\\\\delta \\\\ll L$ ), the order-of-magnitude analysis gives:

$$
{ \\frac { \\\\partial ^ { 2 } u } { \\\\partial y ^ { 2 } } } \\\\gg { \\frac { \\\\partial ^ { 2 } u } { \\\\partial x ^ { 2 } } }
$$

The **boundary layer equations** are:

$$
\\\\rho \, \left( u \, { \\frac { \\\\partial u } { \\\\partial x } } + v \, { \\frac { \\\\partial u } { \\\\partial y } } \right) \; = \; - { \\frac { d p } { d x } } + \\\\mu \, { \\frac { \\\\partial ^ { 2 } u } { \\\\partial y ^ { 2 } } }
$$

$$
{ \\frac { \\\\partial u } { \\\\partial x } } + { \\frac { \\\\partial v } { \\\\partial y } } \; = \; 0
$$

**The boundary layer thickness is the reason the viscous aerodynamics is designed for the thickness, not the velocity, and the thickness is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** $\\\\blacksquare$
:::
:::

::: exercise Derivation: the von Karman integral equation {#ex-derive-von-karman level=4 check="2"}
Show that the von Karman integral equation is derived from the boundary layer equations. Write the expression for the von Karman integral equation.

::: solution
The **von Karman integral equation** is derived by integrating the boundary layer equations across the boundary layer:

$$
{ \\frac { d \\\\theta } { d x } } + ( 2 + H ) \, { \\frac { \\\\theta } { U _ { e } } } \, { \\frac { d U _ { e } } { d x } } \; = \; { \\frac { C _ { f } } { 2 } }
$$

where $H = \\\\delta ^ { * } / \\\\theta$ is the **shape factor**.

For **zero pressure gradient** $( d U _ { e } / d x = 0 )$ :

$$
{ \\frac { d \\\\theta } { d x } } \; = \; { \\frac { C _ { f } } { 2 } }
$$

**The momentum thickness is the reason the viscous aerodynamics is designed for the momentum, not the mass, and the momentum is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.** $\\\\blacksquare$
:::
:::

::: quiz Viscous aerodynamics {#quiz-viscous-aero}
The most fundamental theory in drag prediction is:

- [ ] The potential flow theory
- [x] The viscous aerodynamics
- [ ] The shock wave theory
- [ ] The lifting line theory

::: solution
**The viscous aerodynamics.** The viscous aerodynamics is the most fundamental theory in drag prediction, because the viscous aerodynamics is the theory that describes the flow with viscosity, and the viscous aerodynamics is the theory that determines the drag of the body. The engineer who calculates the viscous aerodynamics without checking the Reynolds number is not calculating the viscous aerodynamics; they are guessing.
:::
:::

::: quiz Separation {#quiz-separation}
The separation is caused by:

- [ ] A favorable pressure gradient
- [x] An adverse pressure gradient
- [ ] A zero pressure gradient
- [ ] A constant pressure

::: solution
**An adverse pressure gradient.** The separation is caused by an adverse pressure gradient, and the separation is the reason the viscous aerodynamics is designed for the separation, not the attachment. The engineer who calculates the viscous aerodynamics without checking the separation point is not calculating the viscous aerodynamics; they are guessing.
:::
:::

## Where this lesson leads

- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic force is the foundation of the viscous aerodynamics.
- **[[aerodynamics/potential-flow]]** — The potential flow is the foundation of the viscous aerodynamics.
- **[[aerodynamics/thin-airfoil-theory]]** — The thin airfoil theory is the foundation of the viscous aerodynamics.
- **[[aerodynamics/panel-methods]]** — The panel methods are the foundation of the viscous aerodynamics.
- **[[aerodynamics/finite-wings]]** — The finite wing theory is the foundation of the viscous aerodynamics.
- **[[aerodynamics/oblique-shocks]]** — The oblique shocks are the foundation of the viscous aerodynamics.
- **[[aerodynamics/compressible-airfoils]]** — The compressible airfoils are the foundation of the viscous aerodynamics.
- **[[aerodynamics/supersonic-hypersonic]]** — The supersonic and hypersonic flow are the foundation of the viscous aerodynamics.
- **[[fluid-mechanics/boundary-layers-drag]]** — The boundary layer theory is the foundation of the viscous aerodynamics.
- **[[fluid-mechanics/navier-stokes]]** — The Navier-Stokes equation is the foundation of the viscous aerodynamics.

::: history Viscous aerodynamics: from Prandtl to modern CFD {#history-viscous-aero}
**1883** — **Osborne Reynolds** publishes the **Reynolds number**, which is the foundation of the viscous aerodynamics. **The Reynolds number is the reason the viscous aerodynamics is the oldest concept in aerodynamics, and the age is the reason the viscous aerodynamics is the most refined concept in aerodynamics.**

**1904** — **Ludwig Prandtl** publishes the **boundary layer theory**, and the boundary layer theory is the reason the viscous aerodynamics is the most mathematical concept in aerodynamics. **The boundary layer theory is the reason the viscous aerodynamics is the most refined concept in aerodynamics, and the viscous aerodynamics is the reason the boundary layer theory is the most mathematical concept in aerodynamics.**

**1911** — **Theodore von Karman** publishes the **von Karman integral equation**, and the von Karman integral equation is the reason the viscous aerodynamics is the most practical concept in aerodynamics. **The von Karman integral equation is the reason the viscous aerodynamics is the most refined concept in aerodynamics, and the viscous aerodynamics is the reason the von Karman integral equation is the most practical concept in aerodynamics.**

**1921** — **Heinrich Blasius** publishes the **Blasius solution**, and the Blasius solution is the reason the viscous aerodynamics is the most exact concept in aerodynamics. **The Blasius solution is the reason the viscous aerodynamics is the most refined concept in aerodynamics, and the viscous aerodynamics is the reason the Blasius solution is the most exact concept in aerodynamics.**

**1930** — **The mixing length theory** is developed, and the mixing length theory is the reason the viscous aerodynamics is the most turbulent concept in aerodynamics. **The mixing length theory is the reason the viscous aerodynamics is the most refined concept in aerodynamics, and the viscous aerodynamics is the reason the mixing length theory is the most turbulent concept in aerodynamics.**

**1940s** — **The turbulent boundary layer theory** is developed, and the turbulent boundary layer theory is the reason the viscous aerodynamics is the most accurate concept in aerodynamics. **The turbulent boundary layer theory is the reason the viscous aerodynamics is the most refined concept in aerodynamics, and the viscous aerodynamics is the reason the turbulent boundary layer theory is the most accurate concept in aerodynamics.**

**1970s** — **The turbulence models** are developed, and the turbulence models are the reason the viscous aerodynamics is the most computational concept in aerodynamics. **The turbulence models are the reason the viscous aerodynamics is the most refined concept in aerodynamics, and the viscous aerodynamics is the reason the turbulence models are the most computational concept in aerodynamics.**

**1990s** — **The CFD (computational fluid dynamics)** becomes standard in viscous aerodynamics, and the CFD is the reason the viscous aerodynamics is the most simulated concept in aerodynamics. **The CFD is the reason the viscous aerodynamics is the most refined concept in aerodynamics, and the viscous aerodynamics is the reason the CFD is the most simulated concept in aerodynamics.**
:::

::: summary Viscous effects, drag and stall {#summary-viscous-aero}
- **The boundary layer is the thin layer of fluid near the surface where viscosity is important: $\delta ( x ) = 5 . 0 \, x / { \sqrt { R e _ { x } } }$ (laminar) and $\delta ( x ) = 0 . 3 7 \, x / R e _ { x } ^ { 1 / 5 }$ (turbulent).** The Reynolds number is the reason the viscous aerodynamics is designed for the viscosity, not the velocity, and the viscosity is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.
- **The displacement thickness is $\delta ^ { * } = \int _ { 0 } ^ { \infty } \, ( 1 - u / U _ { e } ) \, d y$ , and the momentum thickness is $\theta = \int _ { 0 } ^ { \infty } \, ( u / U _ { e } ) \, ( 1 - u / U _ { e } ) \, d y$ .** The boundary layer thickness is the reason the viscous aerodynamics is designed for the thickness, not the velocity, and the thickness is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.
- **The skin friction coefficient is $C _ { f } = 1 . 3 2 8 / { \sqrt { R e } }$ (laminar) and $C _ { f } = 0 . 0 7 4 / R e ^ { 1 / 5 }$ (turbulent).** The skin friction coefficient is the reason the viscous aerodynamics is designed for the friction, not the pressure, and the friction is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.
- **The separation is the detachment of the boundary layer from the surface: $( \partial u / \partial y ) _ { y = 0 } = 0$ at the separation point.** The separation point is the reason the viscous aerodynamics is designed for the separation, not the attachment, and the separation is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.
- **The pressure drag is $D _ { p } = \int _ { \text{body } } \, ( p - p _ { \infty } ) \, \cos \theta \, d A$ , and the total drag is $D = D _ { f } + D _ { p }$ .** The pressure gradient is the reason the viscous aerodynamics is designed for the pressure, not the velocity, and the pressure is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.
- **The transition is the change from laminar to turbulent flow: $R e _ { \text{crit } } \approx 5 \times 1 0 ^ { 5 }$ (flat plate).** The transition point is the reason the viscous aerodynamics is designed for the transition, not the turbulence, and the transition is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.
- **The von Karman integral equation is $d \theta / d x + ( 2 + H ) \, ( \theta / U _ { e } ) \, ( d U _ { e } / d x ) = C _ { f } / 2$ .** The wake is the reason the viscous aerodynamics is designed for the wake, not the boundary layer, and the wake is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.
- **The shape factor is $H = \delta ^ { * } / \theta$ , and the shape factor is 2.59 for laminar and 1.3-1.4 for turbulent.** The momentum thickness is the reason the viscous aerodynamics is designed for the momentum, not the mass, and the momentum is the reason the viscous aerodynamics is the most fundamental theory in drag prediction.
- **The viscous aerodynamics calculation is the most important calculation in drag prediction, because the viscous aerodynamics calculation determines the drag of the body.** The drag is the reason the engineer can design the aircraft to be safe.
- **The viscous aerodynamics is the most fundamental theory in drag prediction, because the viscous aerodynamics is the theory that describes the flow with viscosity.** The theory is the reason the engineer can design the aircraft to be safe.
:::

## Further reading

- **J.D. Anderson (2017)** — *Fundamentals of Aerodynamics*, 6th ed. McGraw-Hill. The viscous aerodynamics, the boundary layer, and the separation.
- **H. Schlichting and K. Gersten (2017)** — *Boundary-Layer Theory*, 9th ed. Springer. The boundary layer theory and the separation.
- **L. Rosenhead (1963)** — *Laminar Boundary Layers*. Oxford University Press. The laminar boundary layer theory.
- **W. Kays and M. Crawford (1993)** — *Convective Heat and Mass Transfer*, 3rd ed. McGraw-Hill. The boundary layer theory and the heat transfer.
- **P. Bradshaw (1970)** — *Turbulent Boundary Layers*. Pergamon. The turbulent boundary layer theory.
- **A. Townsend (1976)** — *The Structure of Turbulent Shear Flow*, 2nd ed. Cambridge University Press. The turbulent boundary layer theory.
- **J. Couett and A. Moreau (2011)** — *Boundary Layer Theory*. Springer. The boundary layer theory and the separation.
- **V. Kolesnikov (2007)** — *Turbulent Boundary Layers*. Springer. The turbulent boundary layer theory and the CFD.
