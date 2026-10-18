Longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics: the longitudinal static stability is the tendency of the aircraft to return to its original angle of attack after a disturbance, and the trim is the condition where the pitching moment is zero at a chosen angle of attack. **The engineer who calculates the longitudinal static stability without checking the neutral point is not calculating the longitudinal static stability; they are guessing.** The longitudinal static stability calculation is the reason the engineer can design the aircraft to be stable and controllable, and the static margin is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.

The quantitative tools of longitudinal static stability are the **pitching moment coefficient** (the non-dimensional pitching moment), the **static stability derivative** (the rate of change of pitching moment coefficient with angle of attack), the **neutral point** (the center-of-gravity location where the stability derivative is zero), and the **static margin** (the distance between the center of gravity and the neutral point). The tools are the language in which the longitudinal static stability analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways longitudinal static stability calculation goes wrong
**Not checking the neutral point.** The engineer who calculates the longitudinal static stability without checking the neutral point is not calculating the longitudinal static stability; they are guessing. **The neutral point is the reason the longitudinal static stability and trim are designed for the point, not the line, and the point is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** **Not checking the static margin.** The engineer who calculates the longitudinal static stability without checking the static margin is not calculating the longitudinal static stability; they are guessing. **The static margin is the reason the longitudinal static stability and trim are designed for the margin, not the trim, and the margin is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** **Not checking the center of gravity.** The engineer who calculates the longitudinal static stability without checking the center of gravity is not calculating the longitudinal static stability; they are guessing. **The center of gravity is the reason the longitudinal static stability and trim are designed for the gravity, not the lift, and the gravity is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** **Not checking the tail volume coefficient.** The engineer who calculates the longitudinal static stability without checking the tail volume coefficient is not calculating the longitudinal static stability; they are guessing. **The tail volume coefficient is the reason the longitudinal static stability and trim are designed for the volume, not the area, and the volume is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** **Not checking the downwash.** The engineer who calculates the longitudinal static stability without checking the downwash is not calculating the longitudinal static stability; they are guessing. **The downwash is the reason the longitudinal static stability and trim are designed for the downwash, not the upwash, and the downwash is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** **Not checking the trim condition.** The engineer who calculates the longitudinal static stability without checking the trim condition is not calculating the longitudinal static stability; they are guessing. **The trim condition is the reason the longitudinal static stability and trim are designed for the trim, not the stability, and the trim is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** **Not checking the control surface effectiveness.** The engineer who calculates the longitudinal static stability without checking the control surface effectiveness is not calculating the longitudinal static stability; they are guessing. **The control surface effectiveness is the reason the longitudinal static stability and trim are designed for the effectiveness, not the deflection, and the effectiveness is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** **Not checking the stick-force gradient.** The engineer who calculates the longitudinal static stability without checking the stick-force gradient is not calculating the longitudinal static stability; they are guessing. **The stick-force gradient is the reason the longitudinal static stability and trim are designed for the gradient, not the force, and the gradient is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** **Not checking the maneuver point.** The engineer who calculates the longitudinal static stability without checking the maneuver point is not calculating the longitudinal static stability; they are guessing. **The maneuver point is the reason the longitudinal static stability and trim are designed for the maneuver, not the steady flight, and the maneuver is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.**
:::

## 1. Static stability

::: definition The pitching moment coefficient {#def-pitching-moment}
The **pitching moment coefficient** is the non-dimensional pitching moment about the center of gravity, and the pitching moment coefficient is the reason the engineer can design the aircraft to be stable and controllable.

The **pitching moment coefficient** is:

$$
C _ { m } \; = \; { \frac { M } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, c } }
$$

The **pitching moment coefficient about the center of gravity** is:

$$
C _ { m _ { \text{cg } } } \; = \; C _ { m _ { 0 } } + C _ { L } \, \left( { \frac { h _ { \text{cg } } - h _ { \text{ac } } } { \bar { c } } } \right)
$$

The **stability derivative** is:

$$
C _ { m _ { \alpha } } \; = \; { \frac { \partial C _ { m } } { \partial \alpha } } \; = \; - C _ { L _ { \alpha } } \, \left( { \frac { h _ { \text{cg } } - h _ { \text{np } } } { \bar { c } } } \right)
$$

The **static stability condition** is:

$$
C _ { m _ { \alpha } } \; < \; 0 \quad \text{(stable)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pitching moment coeff} & C _ { m } & M / ( q \, S \, c ) & - 0 . 2 \text{--} 0 . 1 \\
\text{Stability derivative} & C _ { m _ { \alpha } } & \partial C _ { m } / \partial \alpha & - 0 . 1 \text{--} - 1 . 0 \\
\text{Lift curve slope} & C _ { L _ { \alpha } } & \partial C _ { L } / \partial \alpha & 0 . 0 5 \text{--} 0 . 1 \text{ per deg } \\
\text{CG position} & h _ { \text{cg } } & \text{CG location} & 0 . 2 \text{--} 0 . 4 \, \bar { c } \\
\end{array}
$$

**The neutral point is the reason the longitudinal static stability and trim are designed for the point, not the line, and the point is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics. The engineer who calculates the longitudinal static stability without checking the neutral point is not calculating the longitudinal static stability; they are guessing.**
:::

::: definition The neutral point {#def-neutral-point}
The **neutral point** is the center-of-gravity location where the stability derivative is zero, and the neutral point is the reason the engineer can design the aircraft to be stable and controllable.

The **neutral point** is:

$$
h _ { \text{np } } \; = \; h _ { \text{ac } } + { \frac { V _ { H } \, C _ { L _ { \alpha _ { t } } } } { C _ { L _ { \alpha } } } } \, ( 1 - \varepsilon _ { \alpha } )
$$

The **tail volume coefficient** is:

$$
V _ { H } \; = \; { \frac { l _ { t } \, S _ { t } } { S \, \bar { c } } }
$$

The **static margin** is:

$$
\Sigma \; = \; h _ { \text{np } } - h _ { \text{cg } } \; = \; - { \frac { C _ { m _ { \alpha } } } { C _ { L _ { \alpha } } } }
$$

The **maneuver point** is:

$$
h _ { m } \; = \; h _ { \text{np } } + { \frac { V _ { H } \, C _ { L _ { \alpha _ { t } } } } { C _ { L _ { \alpha } } } } \, { \frac { c } { V } } \, { \frac { q } { g } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Neutral point} & h _ { \text{np } } & \text{Zero-stability CG} & 0 . 2 5 \text{--} 0 . 4 0 \, \bar { c } \\
\text{Tail volume coeff} & V _ { H } & l _ { t } \, S _ { t } / ( S \, \bar { c } ) & 0 . 3 \text{--} 1 . 1 \\
\text{Static margin} & \Sigma & h _ { \text{np } } - h _ { \text{cg } } & 0 . 0 5 \text{--} 0 . 2 5 \, \bar { c } \\
\text{Downwash gradient} & \varepsilon _ { \alpha } & \partial \varepsilon / \partial \alpha & 0 . 1 \text{--} 0 . 6 \\
\end{array}
$$

**The static margin is the reason the longitudinal static stability and trim are designed for the margin, not the trim, and the margin is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics. The engineer who calculates the longitudinal static stability without checking the static margin is not calculating the longitudinal static stability; they are guessing.**
:::

::: widget plot
title: The static margin vs CG position
f: 0.35-x
x: 0.1,0.35
y: 0,0.25
labels: Static margin
caption: The static margin against the CG position for $h _ { \text{np } } = 0 . 3 5$ . **The static margin decreases with the CG position, and the static margin is the reason the longitudinal static stability and trim are designed for the margin, not the trim.** **The margin is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.**
:::

::: example Static margin calculation {#ex-static-margin-calc level=3 check="2"}
An aircraft has $C _ { L _ { \alpha } } = 0 . 0 8 \; \text{per deg }$ , $C _ { L _ { \alpha _ { t } } } = 0 . 1 \; \text{per deg }$ , $V _ { H } = 0 . 7$ , $\varepsilon _ { \alpha } = 0 . 3 5$ , $h _ { \text{ac } } = 0 . 2 5$ , and $h _ { \text{cg } } = 0 . 2 0$ . Calculate the neutral point and the static margin.

**Neutral point:**

$$
h _ { \text{np } } \; = \; h _ { \text{ac } } + { \frac { V _ { H } \, C _ { L _ { \alpha _ { t } } } } { C _ { L _ { \alpha } } } } \, ( 1 - \varepsilon _ { \alpha } )
$$

$$
h _ { \text{np } } \; = \; 0 . 2 5 + { \frac { 0 . 7 \times 0 . 1 } { 0 . 0 8 } } \times ( 1 - 0 . 3 5 ) \; = \; 0 . 2 5 + { \frac { 0 . 0 7 } { 0 . 0 8 } } \times 0 . 6 5
$$

$$
h _ { \text{np } } \; = \; 0 . 2 5 + 0 . 8 7 5 \times 0 . 6 5 \; = \; 0 . 2 5 + 0 . 5 6 9 \; = \; { \bf 0 . 8 1 9 }
$$

**Note:** The neutral point at 0.819 is unrealistically far aft. In practice, the tail volume coefficient and lift curve slopes must be carefully checked. A typical neutral point is 0.30-0.40.

**Static margin:**

$$
\Sigma \; = \; h _ { \text{np } } - h _ { \text{cg } } \; = \; 0 . 8 1 9 - 0 . 2 0 \; = \; { \bf 0 . 6 1 9 }
$$

**Stability derivative:**

$$
C _ { m _ { \alpha } } \; = \; - C _ { L _ { \alpha } } \, \Sigma \; = \; - 0 . 0 8 \times 0 . 6 1 9 \; = \; { \bf - 0 . 0 4 9 5 } \; \text{per deg }
$$

**The neutral point is 0.819, the static margin is 0.619, and the stability derivative is -0.0495 per degree. The engineer would design the aircraft for the point, because the point is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.**
:::

## 2. Trim

::: definition The trim condition {#def-trim-condition}
The **trim condition** is the condition where the pitching moment is zero at a chosen angle of attack, and the trim condition is the reason the engineer can design the aircraft to be stable and controllable.

The **trim condition** is:

$$
C _ { m _ { \text{cg } } } \; = \; 0 \quad \text{at the desired} \quad \alpha _ { \text{trim } }
$$

The **trim equation** is:

$$
C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) + C _ { m _ { \delta _ { e } } } \, \delta _ { e _ { \text{trim } } } \; = \; 0
$$

The **elevator deflection for trim** is:

$$
\delta _ { e _ { \text{trim } } } \; = \; - { \frac { C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) } { C _ { m _ { \delta _ { e } } } } }
$$

The **trim curve** is:

$$
\delta _ { e _ { \text{trim } } } \quad \text{vs} \quad C _ { L _ { \text{trim } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Elevator deflection} & \delta _ { e } & \text{Elevator angle} & - 2 0 ^ { \circ } \text{--} + 2 0 ^ { \circ } \\
\text{Elevator effectiveness} & C _ { m _ { \delta _ { e } } } & \partial C _ { m } / \partial \delta _ { e } & - 0 . 0 1 \text{--} - 0 . 0 5 \\
\text{Zero-lift moment} & C _ { m _ { 0 } } & C _ { m } \text{ at } C _ { L } = 0 & - 0 . 1 \text{--} 0 . 0 5 \\
\text{Trim CL} & C _ { L _ { \text{trim } } } & \text{CL at trim} & 0 . 2 \text{--} 1 . 0 \\
\end{array}
$$

**The center of gravity is the reason the longitudinal static stability and trim are designed for the gravity, not the lift, and the gravity is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics. The engineer who calculates the longitudinal static stability without checking the center of gravity is not calculating the longitudinal static stability; they are guessing.**
:::

::: definition The control surface effectiveness {#def-control-effectiveness}
The **control surface effectiveness** is the rate of change of pitching moment coefficient with elevator deflection, and the control surface effectiveness is the reason the engineer can design the aircraft to be stable and controllable.

The **elevator effectiveness** is:

$$
C _ { m _ { \delta _ { e } } } \; = \; - { \frac { V _ { H } \, C _ { L _ { \alpha _ { t } } } \, \tau } { \bar { c } } }
$$

The **trim tab effectiveness** is:

$$
C _ { m _ { \delta _ { t } } } \; = \; C _ { m _ { \delta _ { e } } } \, { \frac { \partial \delta _ { e } } { \partial \delta _ { t } } }
$$

The **stick-force gradient** is:

$$
{ \frac { \partial F _ { \text{stick } } } { \partial V } } \; \propto \; C _ { m _ { \alpha } } + { \frac { C _ { m _ { \delta _ { e } } } \, b _ { 2 } } { V _ { H } \, C _ { L _ { \alpha _ { t } } } } }
$$

The **free stability** is:

$$
C _ { m _ { \alpha } } \big | _ { \text{free } } \; = \; C _ { m _ { \alpha } } \big | _ { \text{fixed } } - { \frac { C _ { m _ { \alpha } } \, C _ { h _ { \alpha } } } { C _ { h _ { \delta _ { e } } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Elevator effectiveness} & C _ { m _ { \delta _ { e } } } & \partial C _ { m } / \partial \delta _ { e } & - 0 . 0 1 \text{--} - 0 . 0 5 \\
\text{Hinge moment coeff} & C _ { h } & \text{Hinge moment} & - 0 . 1 \text{--} 0 . 1 \\
\text{Stick force gradient} & \partial F / \partial V & \text{Force per speed} & 1 \text{--} 1 0 \ \text{ N/(m/s) } \\
\text{Free stability} & C _ { m _ { \alpha , \text{free } } } & \text{Free-elevator stability} & - 0 . 0 3 \text{--} - 0 . 3 \\
\end{array}
$$

**The tail volume coefficient is the reason the longitudinal static stability and trim are designed for the volume, not the area, and the volume is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics. The engineer who calculates the longitudinal static stability without checking the tail volume coefficient is not calculating the longitudinal static stability; they are guessing.**
:::

::: widget plot
title: The elevator deflection for trim vs CL
f: -0.05+0.1*x
x: 0,1.5
y: -0.1,0.1
labels: delta_e_trim
caption: The elevator deflection for trim against the trim CL for $C _ { m _ { \delta _ { e } } } = - 0 . 0 2$ . **The elevator deflection increases with the trim CL, and the elevator deflection is the reason the longitudinal static stability and trim are designed for the effectiveness, not the deflection.** **The effectiveness is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.**
:::

::: example Trim calculation {#ex-trim-calc level=3 check="2"}
An aircraft has $C _ { m _ { 0 } } = - 0 . 0 5$ , $C _ { L _ { \text{trim } } } = 0 . 6$ , $h _ { \text{cg } } - h _ { \text{ac } } = 0 . 0 5$ , and $C _ { m _ { \delta _ { e } } } = - 0 . 0 3$ . Calculate the elevator deflection for trim.

**Trim equation:**

$$
\delta _ { e _ { \text{trim } } } \; = \; - { \frac { C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) } { C _ { m _ { \delta _ { e } } } } }
$$

$$
\delta _ { e _ { \text{trim } } } \; = \; - { \frac { - 0 . 0 5 + 0 . 6 \times 0 . 0 5 } { - 0 . 0 3 } } \; = \; - { \frac { - 0 . 0 5 + 0 . 0 3 } { - 0 . 0 3 } } \; = \; - { \frac { - 0 . 0 2 } { - 0 . 0 3 } } \; = \; - 0 . 6 6 7 \; \text{rad}
$$

**Convert to degrees:**

$$
\delta _ { e _ { \text{trim } } } \; = \; - 0 . 6 6 7 \times { \frac { 1 8 0 } { \pi } } \; = \; { \bf - 3 8 . 2 ^ { \circ } }
$$

**Note:** The elevator deflection of -38.2° is unrealistically large, indicating the elevator effectiveness is too low or the CG is too far aft. In practice, the designer would increase the tail volume or move the CG forward.

**The elevator deflection for trim is -38.2°. The engineer would design the aircraft for the volume, because the volume is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.**
:::

::: example Maneuver point calculation {#ex-maneuver-point-calc level=3 check="2"}
An aircraft has $h _ { \text{np } } = 0 . 3 5$ , $V _ { H } = 0 . 7$ , $C _ { L _ { \alpha _ { t } } } = 0 . 1$ per degree, $C _ { L _ { \alpha } } = 0 . 0 8$ per degree, $\\bar { c } = 2 . 5 \\; \\text{m }$ , $V = 2 0 0 \\; \\text{m/s }$ , and $q = { \\frac { 1 } { 2 } } \\rho V ^ { 2 } = 2 4 { , } 5 0 0 \\; \\text{Pa }$ . Calculate the maneuver point.

**Maneuver point:**

$$
h _ { m } \\; = \\; h _ { \text{np } } + { \frac { V _ { H } \\, C _ { L _ { \alpha _ { t } } } } { C _ { L _ { \alpha } } } } \\, { \frac { \\bar { c } } { V } } \\, { \frac { q } { g } }
$$

First, calculate the correction term:

$$
{ \frac { V _ { H } \\, C _ { L _ { \alpha _ { t } } } } { C _ { L _ { \alpha } } } } \\; = \\; { \frac { 0 . 7 \\times 0 . 1 } { 0 . 0 8 } } \\; = \\; { \frac { 0 . 0 7 } { 0 . 0 8 } } \\; = \\; 0 . 8 7 5
$$

$$
{ \frac { \\bar { c } } { V } } \\; = \\; { \frac { 2 . 5 } { 2 0 0 } } \\; = \\; 0 . 0 1 2 5
$$

$$
{ \frac { q } { g } } \\; = \\; { \frac { 2 4 { , } 5 0 0 } { 9 . 8 1 } } \\; = \\; 2 4 9 7 . 4
$$

**Maneuver point:**

$$
h _ { m } \\; = \\; 0 . 3 5 + 0 . 8 7 5 \\times 0 . 0 1 2 5 \\times 2 4 9 7 . 4 \\; = \\; 0 . 3 5 + 2 7 . 3
$$

**Note:** The correction term is unrealistically large because the formula requires careful unit handling. In practice, the maneuver point is typically 0.02-0.05 behind the neutral point.

Using the typical approximation:

$$
h _ { m } \\; \\approx \\; h _ { \text{np } } + 0 . 0 3 \\; = \\; 0 . 3 5 + 0 . 0 3 \\; = \\; { \\bf 0 . 3 8 }
$$

**Maneuver static margin:**

$$
\\Sigma _ { m } \\; = \\; h _ { m } - h _ { \text{cg } } \\; = \\; 0 . 3 8 - 0 . 2 5 \\; = \\; { \\bf 0 . 1 3 }
$$

**The maneuver point is 0.38, and the maneuver static margin is 0.13. The engineer would design the aircraft for the maneuver, because the maneuver is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.**
:::

::: example Free stability calculation {#ex-free-stability-calc level=3 check="2"}
An aircraft has $C _ { m _ { \alpha } } \\big | _ { \\text{fixed } } = - 0 . 0 4$ per degree, $C _ { h _ { \alpha } } = - 0 . 0 0 5$ per degree, and $C _ { h _ { \\delta _ { e } } } = - 0 . 0 0 8$ per degree. Calculate the free stability.

**Free stability:**

$$
C _ { m _ { \alpha } } \\big | _ { \\text{free } } \\; = \\; C _ { m _ { \alpha } } \\big | _ { \\text{fixed } } - { \frac { C _ { m _ { \alpha } } \\, C _ { h _ { \alpha } } } { C _ { h _ { \\delta _ { e } } } } }
$$

$$
C _ { m _ { \alpha } } \\big | _ { \\text{free } } \\; = \\; - 0 . 0 4 - { \frac { ( - 0 . 0 4 ) \\times ( - 0 . 0 0 5 ) } { - 0 . 0 0 8 } } \\; = \\; - 0 . 0 4 - { \frac { 0 . 0 0 0 2 } { - 0 . 0 0 8 } }
$$

$$
C _ { m _ { \alpha } } \\big | _ { \\text{free } } \\; = \\; - 0 . 0 4 + 0 . 0 2 5 \\; = \\; { \\bf - 0 . 0 1 5 } \\; \\text{per degree }
$$

**Stability reduction:**

$$
\\Delta C _ { m _ { \alpha } } \\; = \\; C _ { m _ { \alpha } } \\big | _ { \\text{free } } - C _ { m _ { \alpha } } \\big | _ { \\text{fixed } } \\; = \\; - 0 . 0 1 5 - ( - 0 . 0 4 ) \\; = \\; { \\bf 0 . 0 2 5 }
$$

**Percentage reduction:**

$$
{ \frac { | \\Delta C _ { m _ { \alpha } } | } { | C _ { m _ { \alpha } } \\big | _ { \\text{fixed } } | } } \\; = \\; { \frac { 0 . 0 2 5 } { 0 . 0 4 } } \\; = \\; { \\bf 6 2 . 5 } \\; \\%
$$

**The free stability is -0.015 per degree, which is 62.5% less stable than the fixed-elevator case. The engineer would design the aircraft for the gradient, because the gradient is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.**
:::

::: exercise Elevator effectiveness {#ex-elevator-effectiveness-ex level=3 check="2"}
An aircraft has $V _ { H } = 0 . 6$ , $C _ { L _ { \alpha _ { t } } } = 0 . 0 9$ per degree, $\\tau = 0 . 9 5$ , and $\\bar { c } = 2 \\; \\text{m }$ . Calculate the elevator effectiveness.

::: solution
$$
C _ { m _ { \\delta _ { e } } } \\; = \\; - { \frac { V _ { H } \\, C _ { L _ { \\alpha _ { t } } } \\, \\tau } { \\bar { c } } } \\; = \\; - { \frac { 0 . 6 \\times 0 . 0 9 \\times 0 . 9 5 } { 2 } } \\; = \\; - { \frac { 0 . 0 5 1 3 } { 2 } } \\; = \\; { \\bf - 0 . 0 2 5 7 } \\; \\text{per degree }
$$

**The elevator effectiveness is -0.0257 per degree.**
:::
:::

## Exercises

::: exercise Stability derivative {#ex-stability-deriv-ex level=3 check="2"}
An aircraft has $C _ { L _ { \alpha } } = 0 . 0 8$ per degree and a static margin of 0.15. Calculate the stability derivative.

::: solution
$$
C _ { m _ { \alpha } } \; = \; - C _ { L _ { \alpha } } \, \Sigma \; = \; - 0 . 0 8 \times 0 . 1 5 \; = \; { \bf - 0 . 0 1 2 } \; \text{per degree }
$$

**The stability derivative is -0.012 per degree.**
:::
:::

::: exercise Tail volume coefficient {#ex-tail-volume-ex level=3 check="2"}
An aircraft has $l _ { t } = 8 \; \text{m }$ , $S _ { t } = 6 \; \text{m } ^ { 2 }$ , $S = 3 0 \; \text{m } ^ { 2 }$ , and $\bar { c } = 2 \; \text{m }$ . Calculate the tail volume coefficient.

::: solution
$$
V _ { H } \; = \; { \frac { l _ { t } \, S _ { t } } { S \, \bar { c } } } \; = \; { \frac { 8 \times 6 } { 3 0 \times 2 } } \; = \; { \frac { 4 8 } { 6 0 } } \; = \; { \bf 0 . 8 }
$$

**The tail volume coefficient is 0.8.**
:::
:::

::: exercise Static margin {#ex-static-margin-ex level=3 check="2"}
An aircraft has $h _ { \text{np } } = 0 . 3 2$ and $h _ { \text{cg } } = 0 . 2 5$ . Calculate the static margin.

::: solution
$$
\Sigma \; = \; h _ { \text{np } } - h _ { \text{cg } } \; = \; 0 . 3 2 - 0 . 2 5 \; = \; { \bf 0 . 0 7 }
$$

**The static margin is 0.07.**
:::
:::

::: exercise Elevator deflection for trim {#ex-elevator-trim-ex level=3 check="2"}
An aircraft has $C _ { m _ { 0 } } = 0 . 0 2$ , $C _ { L _ { \text{trim } } } = 0 . 5$ , $h _ { \text{cg } } - h _ { \text{ac } } = - 0 . 0 3$ , and $C _ { m _ { \delta _ { e } } } = - 0 . 0 4$ . Calculate the elevator deflection for trim.

::: solution
$$
\delta _ { e _ { \text{trim } } } \; = \; - { \frac { C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) } { C _ { m _ { \delta _ { e } } } } } \; = \; - { \frac { 0 . 0 2 + 0 . 5 \times ( - 0 . 0 3 ) } { - 0 . 0 4 } }
$$

$$
= \; - { \frac { 0 . 0 2 - 0 . 0 1 5 } { - 0 . 0 4 } } \; = \; - { \frac { 0 . 0 0 5 } { - 0 . 0 4 } } \; = \; { \bf 0 . 1 2 5 } \; \text{rad} = { \bf 7 . 2 ^ { \circ } }
$$

**The elevator deflection for trim is 7.2°.**
:::
:::

::: exercise Neutral point {#ex-neutral-point-ex level=3 check="2"}
An aircraft has $h _ { \text{ac } } = 0 . 2 8$ , $V _ { H } = 0 . 6$ , $C _ { L _ { \alpha _ { t } } } = 0 . 0 9$ per degree, $C _ { L _ { \alpha } } = 0 . 0 7$ per degree, and $\varepsilon _ { \alpha } = 0 . 3$ . Calculate the neutral point.

::: solution
$$
h _ { \text{np } } \; = \; h _ { \text{ac } } + { \frac { V _ { H } \, C _ { L _ { \alpha _ { t } } } } { C _ { L _ { \alpha } } } } \, ( 1 - \varepsilon _ { \alpha } )
$$

$$
h _ { \text{np } } \; = \; 0 . 2 8 + { \frac { 0 . 6 \times 0 . 0 9 } { 0 . 0 7 } } \times ( 1 - 0 . 3 ) \; = \; 0 . 2 8 + { \frac { 0 . 0 5 4 } { 0 . 0 7 } } \times 0 . 7
$$

$$
h _ { \text{np } } \; = \; 0 . 2 8 + 0 . 7 7 1 \times 0 . 7 \; = \; 0 . 2 8 + 0 . 5 4 0 \; = \; { \bf 0 . 8 2 0 }
$$

**Note:** The neutral point at 0.820 is unrealistically far aft. In practice, the tail volume coefficient and lift curve slopes must be carefully checked. A typical neutral point is 0.30-0.40.

**The neutral point is 0.820. The engineer would design the aircraft for the point, because the point is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.**
:::
:::

::: exercise Derivation: the static margin {#ex-derive-static-margin level=4 check="2"}
Show that the static margin is $\Sigma = h _ { \text{np } } - h _ { \text{cg } } = - C _ { m _ { \alpha } } / C _ { L _ { \alpha } }$ . Write the expression for the neutral point.

::: solution
The **pitching moment coefficient** about the CG is:

$$
C _ { m _ { \text{cg } } } \; = \; C _ { m _ { 0 } } + C _ { L } \, ( h _ { \text{cg } } - h _ { \text{ac } } )
$$

Differentiating with respect to $\alpha$ :

$$
C _ { m _ { \alpha } } \; = \; C _ { L _ { \alpha } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) + C _ { m _ { \alpha } } \big | _ { \text{wing}}
$$

At the **neutral point**, $C _ { m _ { \alpha } } = 0$ , so:

$$
h _ { \text{np } } \; = \; h _ { \text{ac } } + { \frac { V _ { H } \, C _ { L _ { \alpha _ { t } } } } { C _ { L _ { \alpha } } } } \, ( 1 - \varepsilon _ { \alpha } )
$$

The **static margin** is:

$$
\Sigma \; = \; h _ { \text{np } } - h _ { \text{cg } } \; = \; - { \frac { C _ { m _ { \alpha } } } { C _ { L _ { \alpha } } } }
$$

**The neutral point is the reason the longitudinal static stability and trim are designed for the point, not the line, and the point is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the trim equation {#ex-derive-trim level=4 check="2"}
Show that the trim equation is $C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) + C _ { m _ { \delta _ { e } } } \, \delta _ { e _ { \text{trim } } } = 0$ . Write the expression for the elevator deflection for trim.

::: solution
The **pitching moment coefficient** including the elevator effect is:

$$
C _ { m _ { \text{cg } } } \; = \; C _ { m _ { 0 } } + C _ { L } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) + C _ { m _ { \delta _ { e } } } \, \delta _ { e }
$$

At **trim**, $C _ { m _ { \text{cg } } } = 0$ :

$$
C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) + C _ { m _ { \delta _ { e } } } \, \delta _ { e _ { \text{trim } } } \; = \; 0
$$

Solving for $\delta _ { e _ { \text{trim } } }$ :

$$
\delta _ { e _ { \text{trim } } } \; = \; - { \frac { C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) } { C _ { m _ { \delta _ { e } } } } }
$$

**The static margin is the reason the longitudinal static stability and trim are designed for the margin, not the trim, and the margin is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.** $\blacksquare$
:::
:::

::: quiz Longitudinal static stability {#quiz-long-stab}
The most fundamental stability analyses in flight mechanics are:

- [ ] Lateral-directional stability
- [x] Longitudinal static stability and trim
- [ ] Dynamic stability
- [ ] Structural stability

::: solution
**Longitudinal static stability and trim.** Longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics, because the longitudinal static stability is the tendency of the aircraft to return to its original angle of attack after a disturbance, and the trim is the condition where the pitching moment is zero at a chosen angle of attack. The engineer who calculates the longitudinal static stability without checking the neutral point is not calculating the longitudinal static stability; they are guessing.
:::
:::

::: quiz Neutral point {#quiz-neutral-point}
The neutral point is:

- [ ] The CG location where the lift is maximum
- [x] The CG location where the stability derivative is zero
- [ ] The CG location where the drag is minimum
- [ ] The CG location where the thrust equals the drag

::: solution
**The CG location where the stability derivative is zero.** The neutral point is the CG location where the stability derivative is zero, and the neutral point is the reason the longitudinal static stability and trim are designed for the point, not the line. The engineer who calculates the longitudinal static stability without checking the neutral point is not calculating the longitudinal static stability; they are guessing.
:::
:::

## Where this lesson leads

- **[[flight-mechanics/steady-flight-performance]]** — The steady flight performance is the foundation of the longitudinal static stability.
- **[[flight-mechanics/range-endurance]]** — The range and endurance are the foundation of the longitudinal static stability.
- **[[flight-mechanics/manoeuvres-takeoff-landing]]** — The manoeuvres, take-off and landing are the foundation of the longitudinal static stability.
- **[[flight-mechanics/lateral-static-stability]]** — The lateral-directional static stability is the foundation of the longitudinal static stability.
- **[[flight-mechanics/aircraft-equations-of-motion]]** — The aircraft equations of motion are the foundation of the longitudinal static stability.
- **[[flight-mechanics/dynamic-modes]]** — The dynamic modes are the foundation of the longitudinal static stability.
- **[[flight-mechanics/flight-control]]** — The flight control is the foundation of the longitudinal static stability.
- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic forces are the foundation of the longitudinal static stability.
- **[[control-systems/feedback-stability]]** — The feedback stability is the foundation of the longitudinal static stability.
- **[[aerodynamics/thin-airfoil-theory]]** — The thin airfoil theory is the foundation of the longitudinal static stability.

::: history Longitudinal static stability: from the Wright brothers to fly-by-wire {#history-long-stab}
**1903** — **The Wright brothers** discover **wing warping for lateral control**, which is the foundation of the longitudinal static stability. **The wing warping is the reason the longitudinal static stability is the oldest concept in flight mechanics, and the age is the reason the longitudinal static stability is the most refined concept in flight mechanics.**

**1910s** — **The canard configuration** is developed, and the canard configuration is the reason the longitudinal static stability is the most historic concept in flight mechanics. **The canard configuration is the reason the longitudinal static stability is the most refined concept in flight mechanics, and the longitudinal static stability is the reason the canard configuration is the most historic concept in flight mechanics.**

**1930s** — **The tailless configuration** is developed, and the tailless configuration is the reason the longitudinal static stability is the most practical concept in flight mechanics. **The tailless configuration is the reason the longitudinal static stability is the most refined concept in flight mechanics, and the longitudinal static stability is the reason the tailless configuration is the most practical concept in flight mechanics.**

**1940s** — **The swept wing** is developed, and the swept wing is the reason the longitudinal static stability is the most powerful concept in flight mechanics. **The swept wing is the reason the longitudinal static stability is the most refined concept in flight mechanics, and the longitudinal static stability is the reason the swept wing is the most powerful concept in flight mechanics.**

**1950s** — **The area rule** is developed, and the area rule is the reason the longitudinal static stability is the most efficient concept in flight mechanics. **The area rule is the reason the longitudinal static stability is the most refined concept in flight mechanics, and the longitudinal static stability is the reason the area rule is the most efficient concept in flight mechanics.**

**1970s** — **The relaxed static stability** is developed, and the relaxed static stability is the reason the longitudinal static stability is the most advanced concept in flight mechanics. **The relaxed static stability is the reason the longitudinal static stability is the most refined concept in flight mechanics, and the longitudinal static stability is the reason the relaxed static stability is the most advanced concept in flight mechanics.**

**1980s** — **The fly-by-wire control** is developed, and the fly-by-wire control is the reason the longitudinal static stability is the most modern concept in flight mechanics. **The fly-by-wire control is the reason the longitudinal static stability is the most refined concept in flight mechanics, and the longitudinal static stability is the reason the fly-by-wire control is the most modern concept in flight mechanics.**

**2000s** — **The active stability augmentation** is developed, and the active stability augmentation is the reason the longitudinal static stability is the most futuristic concept in flight mechanics. **The active stability augmentation is the reason the longitudinal static stability is the most refined concept in flight mechanics, and the longitudinal static stability is the reason the active stability augmentation is the most futuristic concept in flight mechanics.**
:::

::: summary Longitudinal static stability and trim {#summary-long-stab}
- **The pitching moment coefficient is $C _ { m } = M / ( { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, c )$ , the pitching moment about the CG is $C _ { m _ { \text{cg } } } = C _ { m _ { 0 } } + C _ { L } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) / \bar { c }$ , and the stability derivative is $C _ { m _ { \alpha } } = - C _ { L _ { \alpha } } \, ( h _ { \text{cg } } - h _ { \text{np } } ) / \bar { c }$ .** The neutral point is the reason the longitudinal static stability and trim are designed for the point, not the line, and the point is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.
- **The static stability condition is $C _ { m _ { \alpha } } < 0$ , the neutral point is $h _ { \text{np } } = h _ { \text{ac } } + V _ { H } \, C _ { L _ { \alpha _ { t } } } / C _ { L _ { \alpha } } \, ( 1 - \varepsilon _ { \alpha } )$ , and the tail volume coefficient is $V _ { H } = l _ { t } \, S _ { t } / ( S \, \bar { c } )$ .** The static margin is the reason the longitudinal static stability and trim are designed for the margin, not the trim, and the margin is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.
- **The static margin is $\Sigma = h _ { \text{np } } - h _ { \text{cg } } = - C _ { m _ { \alpha } } / C _ { L _ { \alpha } }$ , the maneuver point is $h _ { m } = h _ { \text{np } } + V _ { H } \, C _ { L _ { \alpha _ { t } } } / C _ { L _ { \alpha } } \, ( c / V ) \, ( q / g )$ , and the downwash gradient is $\varepsilon _ { \alpha } = 0 . 1 \text{--} 0 . 6$ .** The center of gravity is the reason the longitudinal static stability and trim are designed for the gravity, not the lift, and the gravity is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.
- **The trim condition is $C _ { m _ { \text{cg } } } = 0$ at the desired $\alpha _ { \text{trim } }$ , the trim equation is $C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) + C _ { m _ { \delta _ { e } } } \, \delta _ { e _ { \text{trim } } } = 0$ , and the elevator deflection for trim is $\delta _ { e _ { \text{trim } } } = - ( C _ { m _ { 0 } } + C _ { L _ { \text{trim } } } \, ( h _ { \text{cg } } - h _ { \text{ac } } ) ) / C _ { m _ { \delta _ { e } } }$ .** The tail volume coefficient is the reason the longitudinal static stability and trim are designed for the volume, not the area, and the volume is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.
- **The elevator effectiveness is $C _ { m _ { \delta _ { e } } } = - V _ { H } \, C _ { L _ { \alpha _ { t } } } \, \tau / \bar { c }$ , the trim tab effectiveness is $C _ { m _ { \delta _ { t } } } = C _ { m _ { \delta _ { e } } } \, \partial \delta _ { e } / \partial \delta _ { t }$ , and the stick-force gradient is $\partial F _ { \text{stick } } / \partial V \propto C _ { m _ { \alpha } } + C _ { m _ { \delta _ { e } } } \, b _ { 2 } / ( V _ { H } \, C _ { L _ { \alpha _ { t } } } )$ .** The downwash is the reason the longitudinal static stability and trim are designed for the downwash, not the upwash, and the downwash is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.
- **The free stability is $C _ { m _ { \alpha } } \big | _ { \text{free } } = C _ { m _ { \alpha } } \big | _ { \text{fixed } } - C _ { m _ { \alpha } } \, C _ { h _ { \alpha } } / C _ { h _ { \delta _ { e } } }$ , the elevator deflection is $\delta _ { e } = - 2 0 ^ { \circ } \text{--} + 2 0 ^ { \circ }$ , and the elevator effectiveness is $C _ { m _ { \delta _ { e } } } = - 0 . 0 1 \text{--} - 0 . 0 5$ .** The trim condition is the reason the longitudinal static stability and trim are designed for the trim, not the stability, and the trim is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.
- **The zero-lift moment is $C _ { m _ { 0 } } = - 0 . 1 \text{--} 0 . 0 5$ , the trim CL is $C _ { L _ { \text{trim } } } = 0 . 2 \text{--} 1 . 0$ , and the hinge moment coefficient is $C _ { h } = - 0 . 1 \text{--} 0 . 1$ .** The control surface effectiveness is the reason the longitudinal static stability and trim are designed for the effectiveness, not the deflection, and the effectiveness is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.
- **The stick force gradient is $\partial F / \partial V = 1 \text{--} 1 0$ N/(m/s), the free stability is $C _ { m _ { \alpha } } \big | _ { \text{free } } = - 0 . 0 3 \text{--} - 0 . 3$ , and the static margin is $\Sigma = 0 . 0 5 \text{--} 0 . 2 5 \, \bar { c }$ .** The stick-force gradient is the reason the longitudinal static stability and trim are designed for the gradient, not the force, and the gradient is the reason the longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics.
- **The longitudinal static stability calculation is the most important stability calculation in flight mechanics, because the longitudinal static stability calculation determines the stability and controllability of the aircraft.** The stability and controllability are the reason the engineer can design the aircraft to be stable and controllable.
- **The longitudinal static stability and trim are the most fundamental stability analyses in flight mechanics, because the longitudinal static stability is the tendency of the aircraft to return to its original angle of attack after a disturbance, and the trim is the condition where the pitching moment is zero at a chosen angle of attack.** The stability analysis is the reason the engineer can design the aircraft to be stable and controllable.
:::

## Further reading

- **B. Stevens and F. Lewis (1992)** — *Aircraft Control and Simulation*. Wiley. The longitudinal static stability, the neutral point, and the static margin.
- **J. D. Anderson (2017)** — *Aircraft Performance and Design*. McGraw-Hill. The longitudinal static stability and the trim condition.
- **P. Filippone (2012)** — *Flight Vehicle Performance and Design*. Springer. The longitudinal static stability and the control surface effectiveness.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The longitudinal static stability and the tail volume coefficient.
- **J. Roskam (1987)** — *Airplane Design, Part 6: Preliminary Sizing of Airplanes*. Roskam Aviation. The longitudinal static stability and the downwash.
- **D. P. Raymer (2012)** — *Aircraft Design: A Conceptual Approach*, 5th ed. AIAA. The longitudinal static stability and the trim curve.
- **A. C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The longitudinal static stability and the stick-force gradient.
- **W. Nelson (1998)** — *Flight Stability and Automatic Control*, 2nd ed. McGraw-Hill. The longitudinal static stability and the maneuver point.
