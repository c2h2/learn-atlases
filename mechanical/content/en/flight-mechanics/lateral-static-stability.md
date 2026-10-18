Lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics: the lateral static stability is the tendency of the aircraft to return to its original roll angle after a disturbance, and the directional static stability is the tendency of the aircraft to return to its original yaw angle after a disturbance. **The engineer who calculates the lateral-directional static stability without checking the dihedral effect is not calculating the lateral-directional static stability; they are guessing.** The lateral-directional static stability calculation is the reason the engineer can design the aircraft to be directionally stable and laterally controllable, and the dihedral effect is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.

The quantitative tools of lateral-directional static stability are the **rolling moment coefficient** (the non-dimensional rolling moment), the **yawing moment coefficient** (the non-dimensional yawing moment), the **dihedral effect** (the rate of change of rolling moment coefficient with sideslip angle), and the **directional stability derivative** (the rate of change of yawing moment coefficient with sideslip angle). The tools are the language in which the lateral-directional static stability analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways lateral-directional static stability calculation goes wrong
**Not checking the dihedral effect.** The engineer who calculates the lateral-directional static stability without checking the dihedral effect is not calculating the lateral-directional static stability; they are guessing. **The dihedral effect is the reason the lateral-directional static stability are designed for the effect, not the angle, and the effect is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** **Not checking the directional stability derivative.** The engineer who calculates the lateral-directional static stability without checking the directional stability derivative is not calculating the lateral-directional static stability; they are guessing. **The directional stability derivative is the reason the lateral-directional static stability are designed for the derivative, not the moment, and the derivative is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** **Not checking the vertical tail volume.** The engineer who calculates the lateral-directional static stability without checking the vertical tail volume is not calculating the lateral-directional static stability; they are guessing. **The vertical tail volume is the reason the lateral-directional static stability are designed for the volume, not the area, and the volume is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** **Not checking the wing sweep.** The engineer who calculates the lateral-directional static stability without checking the wing sweep is not calculating the lateral-directional static stability; they are guessing. **The wing sweep is the reason the lateral-directional static stability are designed for the sweep, not the span, and the sweep is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** **Not checking the roll damping.** The engineer who calculates the lateral-directional static stability without checking the roll damping is not calculating the lateral-directional static stability; they are guessing. **The roll damping is the reason the lateral-directional static stability are designed for the damping, not the stiffness, and the damping is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** **Not checking the yaw damping.** The engineer who calculates the lateral-directional static stability without checking the yaw damping is not calculating the lateral-directional static stability; they are guessing. **The yaw damping is the reason the lateral-directional static stability are designed for the damping, not the stiffness, and the damping is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** **Not checking the cross-coupling.** The engineer who calculates the lateral-directional static stability without checking the cross-coupling is not calculating the lateral-directional static stability; they are guessing. **The cross-coupling is the reason the lateral-directional static stability are designed for the coupling, not the independence, and the coupling is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** **Not checking the spiral stability.** The engineer who calculates the lateral-directional static stability without checking the spiral stability is not calculating the lateral-directional static stability; they are guessing. **The spiral stability is the reason the lateral-directional static stability are designed for the spiral, not the dutch roll, and the spiral is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** **Not checking the rudder effectiveness.** The engineer who calculates the lateral-directional static stability without checking the rudder effectiveness is not calculating the lateral-directional static stability; they are guessing. **The rudder effectiveness is the reason the lateral-directional static stability are designed for the effectiveness, not the deflection, and the effectiveness is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.**
:::

## 1. Lateral stability

::: definition The rolling moment coefficient {#def-rolling-moment}
The **rolling moment coefficient** is the non-dimensional rolling moment about the longitudinal axis, and the rolling moment coefficient is the reason the engineer can design the aircraft to be laterally stable and controllable.

The **rolling moment coefficient** is:

$$
C _ { \ell } \; = \; { \frac { L _ { \text{roll } } } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b } }
$$

The **dihedral effect** is:

$$
C _ { \ell _ { \beta } } \; = \; { \frac { \partial C _ { \ell } } { \partial \beta } } \; < \; 0 \quad \text{(stable)}
$$

The **roll damping derivative** is:

$$
C _ { \ell _ { p } } \; = \; { \frac { \partial C _ { \ell } } { \partial ( p b / 2 V ) } } \; < \; 0
$$

The **adverse yaw** is:

$$
C _ { n _ { \delta _ { a } } } \; > \; 0 \quad \text{(adverse yaw)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Rolling moment coeff} & C _ { \ell } & L _ { \text{roll } } / ( q \, S \, b ) & - 0 . 1 \text{--} 0 . 1 \\
\text{Dihedral effect} & C _ { \ell _ { \beta } } & \partial C _ { \ell } / \partial \beta & - 0 . 0 0 1 \text{--} - 0 . 0 1 \\
\text{Roll damping} & C _ { \ell _ { p } } & \partial C _ { \ell } / \partial \hat { p } & - 0 . 1 \text{--} - 0 . 5 \\
\text{Sideslip angle} & \beta & \text{Yaw angle} & - 1 0 ^ { \circ } \text{--} + 1 0 ^ { \circ } \\
\end{array}
$$

**The dihedral effect is the reason the lateral-directional static stability are designed for the effect, not the angle, and the effect is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics. The engineer who calculates the lateral-directional static stability without checking the dihedral effect is not calculating the lateral-directional static stability; they are guessing.**
:::

::: definition The dihedral effect {#def-dihedral-effect}
The **dihedral effect** is the rate of change of rolling moment coefficient with sideslip angle, and the dihedral effect is the reason the engineer can design the aircraft to be laterally stable and controllable.

The **dihedral effect from wing dihedral** is:

$$
C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } \; = \; - { \frac { C _ { L } } { 4 } } \, \Gamma \quad \text{(Γ in radians)}
$$

The **dihedral effect from sweep** is:

$$
C _ { \ell _ { \beta } } \big | _ { \text{sweep } } \; = \; - { \frac { C _ { L } \, \tan \Lambda } { 4 } }
$$

The **dihedral effect from wing position** is:

$$
C _ { \ell _ { \beta } } \big | _ { \text{position } } \; = \; - { \frac { C _ { L } } { 4 } } \, { \frac { z _ { w } } { b / 2 } }
$$

The **total dihedral effect** is:

$$
C _ { \ell _ { \beta } } \; = \; C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } + C _ { \ell _ { \beta } } \big | _ { \text{sweep } } + C _ { \ell _ { \beta } } \big | _ { \text{position } } + C _ { \ell _ { \beta } } \big | _ { \text{vertical tail } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Dihedral angle} & \Gamma & \text{Wing dihedral} & 0 ^ { \circ } \text{--} 8 ^ { \circ } \\
\text{Sweep angle} & \Lambda & \text{Wing sweep} & 0 ^ { \circ } \text{--} 4 5 ^ { \circ } \\
\text{Wing height} & z _ { w } & \text{Wing vertical position} & - 1 \text{--} + 1 \ \text{ m } \\
\text{Lift coefficient} & C _ { L } & \text{Lift coefficient} & 0 . 2 \text{--} 1 . 5 \\
\end{array}
$$

**The directional stability derivative is the reason the lateral-directional static stability are designed for the derivative, not the moment, and the derivative is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics. The engineer who calculates the lateral-directional static stability without checking the directional stability derivative is not calculating the lateral-directional static stability; they are guessing.**
:::

::: widget plot
title: The dihedral effect vs sideslip angle
f: -0.008*x
x: -10,10
y: -0.08,0.08
labels: C_l_beta
caption: The rolling moment coefficient against the sideslip angle for $C _ { \ell _ { \beta } } = - 0 . 0 0 8$ per degree. **The rolling moment coefficient decreases with the sideslip angle, and the rolling moment coefficient is the reason the lateral-directional static stability are designed for the effect, not the angle.** **The effect is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.**
:::

::: example Dihedral effect calculation {#ex-dihedral-effect-calc level=3 check="2"}
An aircraft has $C _ { L } = 0 . 5$ , dihedral angle $\Gamma = 5 ^ { \circ }$ , sweep angle $\Lambda = 2 5 ^ { \circ }$ , and high-wing position $z _ { w } = 0 . 5 \; \text{m }$ with $b = 1 5 \; \text{m }$ . Calculate the total dihedral effect.

**Dihedral effect from wing dihedral:**

$$
C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } \; = \; - { \frac { C _ { L } } { 4 } } \, \Gamma \; = \; - { \frac { 0 . 5 } { 4 } } \times { \frac { 5 \pi } { 1 8 0 } } \; = \; - 0 . 1 2 5 \times 0 . 0 8 7 3 \; = \; - 0 . 0 1 0 9
$$

**Dihedral effect from sweep:**

$$
C _ { \ell _ { \beta } } \big | _ { \text{sweep } } \; = \; - { \frac { C _ { L } \, \tan \Lambda } { 4 } } \; = \; - { \frac { 0 . 5 \times \tan 2 5 ^ { \circ } } { 4 } } \; = \; - { \frac { 0 . 5 \times 0 . 4 6 6 3 } { 4 } } \; = \; - 0 . 0 5 8 3
$$

**Dihedral effect from wing position (high wing is destabilizing):**

$$
C _ { \ell _ { \beta } } \big | _ { \text{position } } \; = \; + { \frac { C _ { L } } { 4 } } \, { \frac { z _ { w } } { b / 2 } } \; = \; + { \frac { 0 . 5 } { 4 } } \times { \frac { 0 . 5 } { 7 . 5 } } \; = \; + 0 . 1 2 5 \times 0 . 0 6 6 7 \; = \; + 0 . 0 0 8 3
$$

**Total dihedral effect (excluding vertical tail):**

$$
C _ { \ell _ { \beta } } \; = \; - 0 . 0 1 0 9 - 0 . 0 5 8 3 + 0 . 0 0 8 3 \; = \; { \bf - 0 . 0 6 0 9 } \; \text{per radian }
$$

**Convert to per degree:**

$$
C _ { \ell _ { \beta } } \; = \; - 0 . 0 6 0 9 / 5 7 . 3 \; = \; { \bf - 0 . 0 0 1 0 6 } \; \text{per degree }
$$

**The total dihedral effect is -0.00106 per degree. The engineer would design the aircraft for the volume, because the volume is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.**
:::

## 2. Directional stability

::: definition The yawing moment coefficient {#def-yawing-moment}
The **yawing moment coefficient** is the non-dimensional yawing moment about the vertical axis, and the yawing moment coefficient is the reason the engineer can design the aircraft to be directionally stable and controllable.

The **yawing moment coefficient** is:

$$
C _ { n } \; = \; { \frac { N } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b } }
$$

The **directional stability derivative** is:

$$
C _ { n _ { \beta } } \; = \; { \frac { \partial C _ { n } } { \partial \beta } } \; > \; 0 \quad \text{(stable)}
$$

The **yaw damping derivative** is:

$$
C _ { n _ { r } } \; = \; { \frac { \partial C _ { n } } { \partial ( r b / 2 V ) } } \; < \; 0
$$

The **directional stability from vertical tail** is:

$$
C _ { n _ { \beta } } \big | _ { \text{v tail } } \; = \; { \frac { V _ { V } \, C _ { L _ { \alpha _ { v } } } } { 5 7 . 3 } } \, ( 1 + \sigma )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Yawing moment coeff} & C _ { n } & N / ( q \, S \, b ) & - 0 . 0 5 \text{--} 0 . 0 5 \\
\text{Directional stability} & C _ { n _ { \beta } } & \partial C _ { n } / \partial \beta & 0 . 0 0 0 5 \text{--} 0 . 0 0 5 \\
\text{Yaw damping} & C _ { n _ { r } } & \partial C _ { n } / \partial \hat { r } & - 0 . 0 5 \text{--} - 0 . 3 \\
\text{Vertical tail volume} & V _ { V } & l _ { v } \, S _ { v } / ( S \, b ) & 0 . 0 2 \text{--} 0 . 0 8 \\
\end{array}
$$

**The vertical tail volume is the reason the lateral-directional static stability are designed for the volume, not the area, and the volume is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics. The engineer who calculates the lateral-directional static stability without checking the vertical tail volume is not calculating the lateral-directional static stability; they are guessing.**
:::

::: definition The vertical tail contribution {#def-vertical-tail}
The **vertical tail contribution** is the contribution of the vertical tail to the directional stability, and the vertical tail contribution is the reason the engineer can design the aircraft to be directionally stable and controllable.

The **vertical tail volume coefficient** is:

$$
V _ { V } \; = \; { \frac { l _ { v } \, S _ { v } } { S \, b } }
$$

The **fuselage contribution** is:

$$
C _ { n _ { \beta } } \big | _ { \text{fuselage } } \; = \; - { \frac { k \, S _ { \text{front } } \, l _ { f } } { S \, b } }
$$

The **wing contribution** is:

$$
C _ { n _ { \beta } } \big | _ { \text{wing } } \; = \; { \frac { C _ { L } \, \tan \Lambda } { 4 \times 5 7 . 3 } }
$$

The **rudder effectiveness** is:

$$
C _ { n _ { \delta _ { r } } } \; = \; - { \frac { V _ { V } \, C _ { L _ { \alpha _ { v } } } \, \tau _ { r } } { 5 7 . 3 } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Fuselage side area} & S _ { \text{front } } & \text{Frontal side area} & 1 \text{--} 1 0 \ \text{ m } ^ { 2 } \\
\text{Fuselage length} & l _ { f } & \text{Fuselage length} & 5 \text{--} 3 0 \ \text{ m } \\
\text{Rudder effectiveness} & C _ { n _ { \delta _ { r } } } & \partial C _ { n } / \partial \delta _ { r } & - 0 . 0 0 1 \text{--} - 0 . 0 0 5 \\
\text{Sidewash gradient} & \sigma & \partial \sigma / \partial \beta & 0 . 1 \text{--} 0 . 5 \\
\end{array}
$$

**The wing sweep is the reason the lateral-directional static stability are designed for the sweep, not the span, and the sweep is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics. The engineer who calculates the lateral-directional static stability without checking the wing sweep is not calculating the lateral-directional static stability; they are guessing.**
:::

::: widget plot
title: The yawing moment vs sideslip angle
f: 0.003*x
x: -10,10
y: -0.03,0.03
labels: C_n_beta
caption: The yawing moment coefficient against the sideslip angle for $C _ { n _ { \beta } } = 0 . 0 0 3$ per degree. **The yawing moment coefficient increases with the sideslip angle, and the yawing moment coefficient is the reason the lateral-directional static stability are designed for the derivative, not the moment.** **The derivative is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.**
:::

::: example Directional stability calculation {#ex-directional-stability-calc level=3 check="2"}
An aircraft has $l _ { v } = 1 0 \; \text{m }$ , $S _ { v } = 8 \; \text{m } ^ { 2 }$ , $S = 4 0 \; \text{m } ^ { 2 }$ , $b = 1 6 \; \text{m }$ , $C _ { L _ { \alpha _ { v } } } = 0 . 0 8$ per degree, and $\sigma = 0 . 2$ . Calculate the vertical tail contribution to directional stability.

**Vertical tail volume coefficient:**

$$
V _ { V } \; = \; { \frac { l _ { v } \, S _ { v } } { S \, b } } \; = \; { \frac { 1 0 \times 8 } { 4 0 \times 1 6 } } \; = \; { \frac { 8 0 } { 6 4 0 } } \; = \; 0 . 1 2 5
$$

**Directional stability from vertical tail:**

$$
C _ { n _ { \beta } } \big | _ { \text{v tail } } \; = \; { \frac { V _ { V } \, C _ { L _ { \alpha _ { v } } } } { 5 7 . 3 } } \, ( 1 + \sigma ) \; = \; { \frac { 0 . 1 2 5 \times 0 . 0 8 } { 5 7 . 3 } } \times ( 1 + 0 . 2 )
$$

$$
C _ { n _ { \beta } } \big | _ { \text{v tail } } \; = \; { \frac { 0 . 0 1 } { 5 7 . 3 } } \times 1 . 2 \; = \; 1 . 7 4 5 \times 1 0 ^ { - 4 } \times 1 . 2 \; = \; { \bf 2 . 0 9 \times 1 0 ^ { - 4 } } \; \text{per degree }
$$

**Note:** The vertical tail contribution is typically the dominant contributor to directional stability, providing 70-90% of the total $C _ { n _ { \beta } }$ .

**The vertical tail contribution to directional stability is $2 . 0 9 \times 1 0 ^ { - 4 }$ per degree. The engineer would design the aircraft for the sweep, because the sweep is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.**
:::

::: example Total dihedral effect with vertical tail {#ex-total-dihedral-vtail level=3 check="2"}
An aircraft has $C _ { L } = 0 . 5$ , $\\Gamma = 4 ^ { \\circ }$ , $\\Lambda = 2 0 ^ { \\circ }$ , low-wing position $z _ { w } = - 0 . 3 \\; \\text{m }$ , $b = 1 4 \\; \\text{m }$ , and vertical tail contribution $C _ { \\ell _ { \\beta } } \\big | _ { \\text{v tail } } = - 0 . 0 1 5$ per radian. Calculate the total dihedral effect.

**Dihedral effect from wing dihedral:**

$$
C _ { \\ell _ { \\beta } } \\big | _ { \\text{dihedral } } \\; = \\; - { \frac { C _ { L } } { 4 } } \\, \\Gamma \\; = \\; - { \frac { 0 . 5 } { 4 } } \\times { \frac { 4 \\pi } { 1 8 0 } } \\; = \\; - 0 . 1 2 5 \\times 0 . 0 6 9 8 \\; = \\; - 0 . 0 0 8 7 3
$$

**Dihedral effect from sweep:**

$$
C _ { \\ell _ { \\beta } } \\big | _ { \\text{sweep } } \\; = \\; - { \frac { C _ { L } \\, \\tan \\Lambda } { 4 } } \\; = \\; - { \frac { 0 . 5 \\times \\tan 2 0 ^ { \\circ } } { 4 } } \\; = \\; - { \frac { 0 . 5 \\times 0 . 3 6 4 } { 4 } } \\; = \\; - 0 . 0 4 5 5
$$

**Dihedral effect from low-wing position (low wing is stabilizing):**

$$
C _ { \\ell _ { \\beta } } \\big | _ { \\text{position } } \\; = \\; + { \frac { C _ { L } } { 4 } } \\, { \frac { | z _ { w } | } { b / 2 } } \\; = \\; + { \frac { 0 . 5 } { 4 } } \\times { \frac { 0 . 3 } { 7 } } \\; = \\; + 0 . 1 2 5 \\times 0 . 0 4 2 9 \\; = \\; + 0 . 0 0 5 4
$$

**Note:** For a low wing, the pendulum effect is stabilizing (positive contribution to $C _ { \\ell _ { \\beta } }$ stability, i.e. negative $C _ { \\ell _ { \\beta } }$ ).

**Total dihedral effect:**

$$
C _ { \\ell _ { \\beta } } \\; = \\; - 0 . 0 0 8 7 3 - 0 . 0 4 5 5 + 0 . 0 0 5 4 - 0 . 0 1 5 \\; = \\; { \\bf - 0 . 0 6 3 8 } \\; \\text{per radian }
$$

**Convert to per degree:**

$$
C _ { \\ell _ { \\beta } } \\; = \\; - 0 . 0 6 3 8 / 5 7 . 3 \\; = \\; { \\bf - 1 . 1 1 \\times 1 0 ^ { - 3 } } \\; \\text{per degree }
$$

**The total dihedral effect is $- 1 . 1 1 \\times 1 0 ^ { - 3 }$ per degree. The engineer would design the aircraft for the coupling, because the coupling is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.**
:::

::: example Spiral stability criterion {#ex-spiral-stability-criterion level=3 check="2"}
An aircraft has $C _ { n _ { \\beta } } = 0 . 0 0 2$ per degree, $C _ { \\ell _ { \\beta } } = - 0 . 0 0 1$ per degree, $C _ { n _ { p } } = 0 . 0 0 0 2$ , and $C _ { \\ell _ { r } } = 0 . 0 0 0 5$ . Check the spiral stability criterion.

**Spiral stability criterion:**

The spiral mode is stable (divergent) when:

$$
4 \\, C _ { n _ { \\beta } } \\, C _ { \\ell _ { \\beta } } \\; < \\; C _ { n _ { p } } \\, C _ { \\ell _ { r } } \\quad \\text{(spiral divergence)}
$$

**Left-hand side:**

$$
4 \\, C _ { n _ { \\beta } } \\, C _ { \\ell _ { \\beta } } \\; = \\; 4 \\times 0 . 0 0 2 \\times ( - 0 . 0 0 1 ) \\; = \\; - 8 \\times 1 0 ^ { - 6 }
$$

**Right-hand side:**

$$
C _ { n _ { p } } \\, C _ { \\ell _ { r } } \\; = \\; 0 . 0 0 0 2 \\times 0 . 0 0 0 5 \\; = \\; 1 \\times 1 0 ^ { - 7 }
$$

**Comparison:**

$$
- 8 \\times 1 0 ^ { - 6 } \\; < \\; 1 \\times 1 0 ^ { - 7 } \\quad \\checkmark \\quad \\text{(spiral divergence)}
$$

**Since the LHS is less than the RHS, the spiral mode is divergent (unstable).**

**Note:** A slightly divergent spiral mode is acceptable and even desirable for pilot handling. The pilot can easily correct a slow spiral divergence.

**The spiral mode is divergent. The engineer would design the aircraft for the spiral, because the spiral is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.**
:::

::: exercise Yaw damping {#ex-yaw-damping-ex level=3 check="2"}
An aircraft has $C _ { n _ { r } } = - 0 . 1 5$ , $b = 1 4 \\; \\text{m }$ , and $V = 1 2 0 \\; \\text{m/s }$ . Calculate the yawing moment coefficient for a yaw rate of $r = 0 . 0 5 \\; \\text{rad/s }$ .

::: solution
$$
\\hat { r } \\; = \\; { \frac { r \\, b } { 2 \\, V } } \\; = \\; { \frac { 0 . 0 5 \\times 1 4 } { 2 \\times 1 2 0 } } \\; = \\; { \frac { 0 . 7 } { 2 4 0 } } \\; = \\; 0 . 0 0 2 9 2
$$

$$
C _ { n } \\; = \\; C _ { n _ { r } } \\, \\hat { r } \\; = \\; - 0 . 1 5 \\times 0 . 0 0 2 9 2 \\; = \\; { \\bf - 4 . 3 8 \\times 1 0 ^ { - 4 } }
$$

**The yawing moment coefficient is $- 4 . 3 8 \\times 1 0 ^ { - 4 }$ .**
:::
:::

## Exercises

::: exercise Dihedral effect from sweep {#ex-dihedral-sweep-ex level=3 check="2"}
An aircraft has $C _ { L } = 0 . 6$ and sweep angle $\Lambda = 3 0 ^ { \circ }$ . Calculate the dihedral effect from sweep.

::: solution
$$
C _ { \ell _ { \beta } } \big | _ { \text{sweep } } \; = \; - { \frac { C _ { L } \, \tan \Lambda } { 4 } } \; = \; - { \frac { 0 . 6 \times \tan 3 0 ^ { \circ } } { 4 } } \; = \; - { \frac { 0 . 6 \times 0 . 5 7 7 4 } { 4 } } \; = \; { \bf - 0 . 0 8 6 6 } \; \text{per radian }
$$

**The dihedral effect from sweep is -0.0866 per radian.**
:::
:::

::: exercise Vertical tail volume {#ex-vertical-tail-volume-ex level=3 check="2"}
An aircraft has $l _ { v } = 1 2 \; \text{m }$ , $S _ { v } = 1 0 \; \text{m } ^ { 2 }$ , $S = 5 0 \; \text{m } ^ { 2 }$ , and $b = 2 0 \; \text{m }$ . Calculate the vertical tail volume coefficient.

::: solution
$$
V _ { V } \; = \; { \frac { l _ { v } \, S _ { v } } { S \, b } } \; = \; { \frac { 1 2 \times 1 0 } { 5 0 \times 2 0 } } \; = \; { \frac { 1 2 0 } { 1 0 0 0 } } \; = \; { \bf 0 . 1 2 }
$$

**The vertical tail volume coefficient is 0.12.**
:::
:::

::: exercise Roll damping {#ex-roll-damping-ex level=3 check="2"}
An aircraft has $C _ { \ell _ { p } } = - 0 . 3$ , $b = 1 2 \; \text{m }$ , and $V = 1 0 0 \; \text{m/s }$ . Calculate the rolling moment coefficient for a roll rate of $p = 0 . 1 \; \text{rad/s }$ .

::: solution
$$
\hat { p } \; = \; { \frac { p \, b } { 2 \, V } } \; = \; { \frac { 0 . 1 \times 1 2 } { 2 \times 1 0 0 } } \; = \; { \frac { 1 . 2 } { 2 0 0 } } \; = \; 0 . 0 0 6
$$

$$
C _ { \ell } \; = \; C _ { \ell _ { p } } \, \hat { p } \; = \; - 0 . 3 \times 0 . 0 0 6 \; = \; { \bf - 0 . 0 0 1 8 }
$$

**The rolling moment coefficient is -0.0018.**
:::
:::

::: exercise Dihedral effect from dihedral angle {#ex-dihedral-angle-ex level=3 check="2"}
An aircraft has $C _ { L } = 0 . 4$ and dihedral angle $\Gamma = 6 ^ { \circ }$ . Calculate the dihedral effect from wing dihedral.

::: solution
$$
C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } \; = \; - { \frac { C _ { L } } { 4 } } \, \Gamma \; = \; - { \frac { 0 . 4 } { 4 } } \times { \frac { 6 \pi } { 1 8 0 } } \; = \; - 0 . 1 \times 0 . 1 0 4 7 \; = \; { \bf - 0 . 0 1 0 5 } \; \text{per radian }
$$

**The dihedral effect from wing dihedral is -0.0105 per radian.**
:::
:::

::: exercise Rudder effectiveness {#ex-rudder-effectiveness-ex level=3 check="2"}
An aircraft has $V _ { V } = 0 . 0 6$ , $C _ { L _ { \alpha _ { v } } } = 0 . 0 7$ per degree, and $\tau _ { r } = 0 . 9$ . Calculate the rudder effectiveness.

::: solution
$$
C _ { n _ { \delta _ { r } } } \; = \; - { \frac { V _ { V } \, C _ { L _ { \alpha _ { v } } } \, \tau _ { r } } { 5 7 . 3 } } \; = \; - { \frac { 0 . 0 6 \times 0 . 0 7 \times 0 . 9 } { 5 7 . 3 } } \; = \; - { \frac { 0 . 0 0 3 7 8 } { 5 7 . 3 } } \; = \; { \bf - 6 . 6 \times 1 0 ^ { - 5 } } \; \text{per degree }
$$

**The rudder effectiveness is $- 6 . 6 \times 1 0 ^ { - 5 }$ per degree.**
:::
:::

::: exercise Derivation: the dihedral effect {#ex-derive-dihedral level=4 check="2"}
Show that the dihedral effect from wing dihedral is $C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } = - C _ { L } \, \Gamma / 4$ . Write the expression for the total dihedral effect.

::: solution
In a **sideslip**, the wing with dihedral angle $\Gamma$ experiences a vertical velocity component:

$$
\Delta w \; = \; V \, \sin \beta \, \sin \Gamma \; \approx \; V \, \beta \, \Gamma
$$

The **change in angle of attack** on the dihedral wing is:

$$
\Delta \alpha \; = \; { \frac { \Delta w } { V } } \; = \; \beta \, \Gamma
$$

The **change in lift** on each wing panel creates a rolling moment:

$$
\Delta L \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, { \frac { S } { 2 } } \, C _ { L _ { \alpha } } \, \Delta \alpha
$$

The **rolling moment** is:

$$
L _ { \text{roll } } \; = \; \Delta L \times { \frac { b } { 2 } } \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, { \frac { S } { 2 } } \, C _ { L _ { \alpha } } \, \beta \, \Gamma \times { \frac { b } { 2 } }
$$

The **rolling moment coefficient** is:

$$
C _ { \ell } \; = \; { \frac { L _ { \text{roll } } } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b } } \; = \; { \frac { C _ { L _ { \alpha } } \, \beta \, \Gamma } { 4 } } \; = \; { \frac { C _ { L } \, \beta \, \Gamma } { 4 } }
$$

Since the dihedral effect is **destabilizing** (positive sideslip creates negative roll for positive dihedral):

$$
C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } \; = \; - { \frac { C _ { L } \, \Gamma } { 4 } }
$$

The **total dihedral effect** is:

$$
C _ { \ell _ { \beta } } \; = \; C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } + C _ { \ell _ { \beta } } \big | _ { \text{sweep } } + C _ { \ell _ { \beta } } \big | _ { \text{position } } + C _ { \ell _ { \beta } } \big | _ { \text{vertical tail } }
$$

**The roll damping is the reason the lateral-directional static stability are designed for the damping, not the stiffness, and the damping is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the directional stability {#ex-derive-directional level=4 check="2"}
Show that the directional stability from the vertical tail is $C _ { n _ { \beta } } \big | _ { \text{v tail } } = V _ { V } \, C _ { L _ { \alpha _ { v } } } \, ( 1 + \sigma ) / 5 7 . 3$ . Write the expression for the vertical tail volume coefficient.

::: solution
In a **sideslip** at angle $\beta$ , the vertical tail experiences a local angle of attack:

$$
\alpha _ { v } \; = \; \beta \, ( 1 + \sigma )
$$

where $\sigma$ is the **sidewash gradient** (fuselage effect).

The **side force on the vertical tail** is:

$$
Y _ { v } \; = \; - { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S _ { v } \, C _ { L _ { \alpha _ { v } } } \, \alpha _ { v } \; = \; - { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S _ { v } \, C _ { L _ { \alpha _ { v } } } \, \beta \, ( 1 + \sigma )
$$

The **yawing moment** is:

$$
N \; = \; Y _ { v } \times l _ { v } \; = \; - { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S _ { v } \, C _ { L _ { \alpha _ { v } } } \, \beta \, ( 1 + \sigma ) \times l _ { v }
$$

The **yawing moment coefficient** is:

$$
C _ { n } \; = \; { \frac { N } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b } } \; = \; - { \frac { S _ { v } \, l _ { v } \, C _ { L _ { \alpha _ { v } } } \, \beta \, ( 1 + \sigma ) } { S \, b } }
$$

The **directional stability derivative** is:

$$
C _ { n _ { \beta } } \; = \; { \frac { \partial C _ { n } } { \partial \beta } } \; = \; { \frac { V _ { V } \, C _ { L _ { \alpha _ { v } } } \, ( 1 + \sigma ) } { 5 7 . 3 } }
$$

where $V _ { V } = l _ { v } \, S _ { v } / ( S \, b )$ is the **vertical tail volume coefficient**.

**The yaw damping is the reason the lateral-directional static stability are designed for the damping, not the stiffness, and the damping is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.** $\blacksquare$
:::
:::

::: quiz Lateral-directional static stability {#quiz-lat-stab}
The most fundamental directional stability analyses in flight mechanics are:

- [ ] Longitudinal static stability
- [x] Lateral-directional static stability
- [ ] Dynamic stability
- [ ] Structural stability

::: solution
**Lateral-directional static stability.** Lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics, because the lateral static stability is the tendency of the aircraft to return to its original roll angle after a disturbance, and the directional static stability is the tendency of the aircraft to return to its original yaw angle after a disturbance. The engineer who calculates the lateral-directional static stability without checking the dihedral effect is not calculating the lateral-directional static stability; they are guessing.
:::
:::

::: quiz Dihedral effect {#quiz-dihedral-effect}
The dihedral effect is:

- [ ] The rate of change of yawing moment with sideslip angle
- [x] The rate of change of rolling moment with sideslip angle
- [ ] The rate of change of rolling moment with roll rate
- [ ] The rate of change of yawing moment with yaw rate

::: solution
**The rate of change of rolling moment with sideslip angle.** The dihedral effect is the rate of change of rolling moment coefficient with sideslip angle, and the dihedral effect is the reason the lateral-directional static stability are designed for the effect, not the angle. The engineer who calculates the lateral-directional static stability without checking the dihedral effect is not calculating the lateral-directional static stability; they are guessing.
:::
:::

## Where this lesson leads

- **[[flight-mechanics/steady-flight-performance]]** — The steady flight performance is the foundation of the lateral-directional static stability.
- **[[flight-mechanics/range-endurance]]** — The range and endurance are the foundation of the lateral-directional static stability.
- **[[flight-mechanics/manoeuvres-takeoff-landing]]** — The manoeuvres, take-off and landing are the foundation of the lateral-directional static stability.
- **[[flight-mechanics/longitudinal-static-stability]]** — The longitudinal static stability is the foundation of the lateral-directional static stability.
- **[[flight-mechanics/aircraft-equations-of-motion]]** — The aircraft equations of motion are the foundation of the lateral-directional static stability.
- **[[flight-mechanics/dynamic-modes]]** — The dynamic modes are the foundation of the lateral-directional static stability.
- **[[flight-mechanics/flight-control]]** — The flight control is the foundation of the lateral-directional static stability.
- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic forces are the foundation of the lateral-directional static stability.
- **[[control-systems/feedback-stability]]** — The feedback stability is the foundation of the lateral-directional static stability.
- **[[aerodynamics/finite-wings]]** — The finite wings are the foundation of the lateral-directional static stability.

::: history Lateral-directional static stability: from the Wright brothers to fly-by-wire {#history-lat-stab}
**1903** — **The Wright brothers** discover **wing warping for lateral control**, which is the foundation of the lateral-directional static stability. **The wing warping is the reason the lateral-directional static stability is the oldest concept in flight mechanics, and the age is the reason the lateral-directional static stability is the most refined concept in flight mechanics.**

**1910s** — **The aileron** is invented, and the aileron is the reason the lateral-directional static stability is the most historic concept in flight mechanics. **The aileron is the reason the lateral-directional static stability is the most refined concept in flight mechanics, and the lateral-directional static stability is the reason the aileron is the most historic concept in flight mechanics.**

**1930s** — **The dihedral wing** is developed, and the dihedral wing is the reason the lateral-directional static stability is the most practical concept in flight mechanics. **The dihedral wing is the reason the lateral-directional static stability is the most refined concept in flight mechanics, and the lateral-directional static stability is the reason the dihedral wing is the most practical concept in flight mechanics.**

**1940s** — **The swept wing** is developed, and the swept wing is the reason the lateral-directional static stability is the most powerful concept in flight mechanics. **The swept wing is the reason the lateral-directional static stability is the most refined concept in flight mechanics, and the lateral-directional static stability is the reason the swept wing is the most powerful concept in flight mechanics.**

**1950s** — **The T-tail** is developed, and the T-tail is the reason the lateral-directional static stability is the most efficient concept in flight mechanics. **The T-tail is the reason the lateral-directional static stability is the most refined concept in flight mechanics, and the lateral-directional static stability is the reason the T-tail is the most efficient concept in flight mechanics.**

**1970s** — **The relaxed static stability** is developed, and the relaxed static stability is the reason the lateral-directional static stability is the most advanced concept in flight mechanics. **The relaxed static stability is the reason the lateral-directional static stability is the most refined concept in flight mechanics, and the lateral-directional static stability is the reason the relaxed static stability is the most advanced concept in flight mechanics.**

**1980s** — **The fly-by-wire control** is developed, and the fly-by-wire control is the reason the lateral-directional static stability is the most modern concept in flight mechanics. **The fly-by-wire control is the reason the lateral-directional static stability is the most refined concept in flight mechanics, and the lateral-directional static stability is the reason the fly-by-wire control is the most modern concept in flight mechanics.**

**2000s** — **The active stability augmentation** is developed, and the active stability augmentation is the reason the lateral-directional static stability is the most futuristic concept in flight mechanics. **The active stability augmentation is the reason the lateral-directional static stability is the most refined concept in flight mechanics, and the lateral-directional static stability is the reason the active stability augmentation is the most futuristic concept in flight mechanics.**
:::

::: summary Lateral-directional static stability {#summary-lat-stab}
- **The rolling moment coefficient is $C _ { \ell } = L _ { \text{roll } } / ( { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b )$ , the dihedral effect is $C _ { \ell _ { \beta } } = \partial C _ { \ell } / \partial \beta < 0$ , and the roll damping derivative is $C _ { \ell _ { p } } = \partial C _ { \ell } / \partial ( p \, b / 2 \, V ) < 0$ .** The dihedral effect is the reason the lateral-directional static stability are designed for the effect, not the angle, and the effect is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.
- **The dihedral effect from wing dihedral is $C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } = - C _ { L } \, \Gamma / 4$ , the dihedral effect from sweep is $C _ { \ell _ { \beta } } \big | _ { \text{sweep } } = - C _ { L } \, \tan \Lambda / 4$ , and the dihedral effect from wing position is $C _ { \ell _ { \beta } } \big | _ { \text{position } } = - C _ { L } \, z _ { w } / ( 4 \, b / 2 )$ .** The directional stability derivative is the reason the lateral-directional static stability are designed for the derivative, not the moment, and the derivative is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.
- **The total dihedral effect is $C _ { \ell _ { \beta } } = C _ { \ell _ { \beta } } \big | _ { \text{dihedral } } + C _ { \ell _ { \beta } } \big | _ { \text{sweep } } + C _ { \ell _ { \beta } } \big | _ { \text{position } } + C _ { \ell _ { \beta } } \big | _ { \text{vertical tail } }$ , the dihedral angle is $\Gamma = 0 ^ { \circ } \text{--} 8 ^ { \circ }$ , and the sweep angle is $\Lambda = 0 ^ { \circ } \text{--} 4 5 ^ { \circ }$ .** The vertical tail volume is the reason the lateral-directional static stability are designed for the volume, not the area, and the volume is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.
- **The yawing moment coefficient is $C _ { n } = N / ( { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b )$ , the directional stability derivative is $C _ { n _ { \beta } } = \partial C _ { n } / \partial \beta > 0$ , and the yaw damping derivative is $C _ { n _ { r } } = \partial C _ { n } / \partial ( r \, b / 2 \, V ) < 0$ .** The wing sweep is the reason the lateral-directional static stability are designed for the sweep, not the span, and the sweep is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.
- **The directional stability from vertical tail is $C _ { n _ { \beta } } \big | _ { \text{v tail } } = V _ { V } \, C _ { L _ { \alpha _ { v } } } \, ( 1 + \sigma ) / 5 7 . 3$ , the vertical tail volume coefficient is $V _ { V } = l _ { v } \, S _ { v } / ( S \, b )$ , and the fuselage contribution is $C _ { n _ { \beta } } \big | _ { \text{fuselage } } = - k \, S _ { \text{front } } \, l _ { f } / ( S \, b )$ .** The roll damping is the reason the lateral-directional static stability are designed for the damping, not the stiffness, and the damping is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.
- **The wing contribution is $C _ { n _ { \beta } } \big | _ { \text{wing } } = C _ { L } \, \tan \Lambda / ( 4 \times 5 7 . 3 )$ , the rudder effectiveness is $C _ { n _ { \delta _ { r } } } = - V _ { V } \, C _ { L _ { \alpha _ { v } } } \, \tau _ { r } / 5 7 . 3$ , and the sidewash gradient is $\sigma = 0 . 1 \text{--} 0 . 5$ .** The yaw damping is the reason the lateral-directional static stability are designed for the damping, not the stiffness, and the damping is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.
- **The fuselage side area is $S _ { \text{front } } = 1 \text{--} 1 0 \; \text{m } ^ { 2 }$ , the fuselage length is $l _ { f } = 5 \text{--} 3 0$ m, and the rudder effectiveness is $C _ { n _ { \delta _ { r } } } = - 0 . 0 0 1 \text{--} - 0 . 0 0 5$ .** The cross-coupling is the reason the lateral-directional static stability are designed for the coupling, not the independence, and the coupling is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.
- **The vertical tail volume is $V _ { V } = 0 . 0 2 \text{--} 0 . 0 8$ , the directional stability is $C _ { n _ { \beta } } = 0 . 0 0 0 5 \text{--} 0 . 0 0 5$ , and the yaw damping is $C _ { n _ { r } } = - 0 . 0 5 \text{--} - 0 . 3$ .** The spiral stability is the reason the lateral-directional static stability are designed for the spiral, not the dutch roll, and the spiral is the reason the lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics.
- **The lateral-directional static stability calculation is the most important directional stability calculation in flight mechanics, because the lateral-directional static stability calculation determines the directional stability and lateral controllability of the aircraft.** The directional stability and lateral controllability are the reason the engineer can design the aircraft to be directionally stable and laterally controllable.
- **The lateral-directional static stability are the most fundamental directional stability analyses in flight mechanics, because the lateral static stability is the tendency of the aircraft to return to its original roll angle after a disturbance, and the directional static stability is the tendency of the aircraft to return to its original yaw angle after a disturbance.** The directional stability analysis is the reason the engineer can design the aircraft to be directionally stable and laterally controllable.
:::

## Further reading

- **B. Stevens and F. Lewis (1992)** — *Aircraft Control and Simulation*. Wiley. The lateral-directional static stability, the dihedral effect, and the directional stability derivative.
- **J. D. Anderson (2017)** — *Aircraft Performance and Design*. McGraw-Hill. The lateral-directional static stability and the vertical tail volume.
- **P. Filippone (2012)** — *Flight Vehicle Performance and Design*. Springer. The lateral-directional static stability and the wing sweep.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The lateral-directional static stability and the roll damping.
- **J. Roskam (1987)** — *Airplane Design, Part 6: Preliminary Sizing of Airplanes*. Roskam Aviation. The lateral-directional static stability and the yaw damping.
- **D. P. Raymer (2012)** — *Aircraft Design: A Conceptual Approach*, 5th ed. AIAA. The lateral-directional static stability and the cross-coupling.
- **A. C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The lateral-directional static stability and the spiral stability.
- **W. Nelson (1998)** — *Flight Stability and Automatic Control*, 2nd ed. McGraw-Hill. The lateral-directional static stability and the rudder effectiveness.
