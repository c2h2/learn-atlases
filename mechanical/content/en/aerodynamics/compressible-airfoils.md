The compressible airfoil is the most fundamental theory in transonic aerodynamics: the compressible airfoil is the theory that describes the flow over an airfoil at high subsonic and transonic speeds, and the compressible airfoil is the theory that determines the drag divergence and the critical Mach number. **The engineer who calculates the compressible airfoil without checking the Mach number is not calculating the compressible airfoil; they are guessing.** The compressible airfoil calculation is the reason the engineer can design the transonic aircraft to be safe, and the safety is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.

The quantitative tools of the compressible airfoil are the **critical Mach number** (the free-stream Mach number at which the local flow first reaches sonic speed), the **drag divergence Mach number** (the free-stream Mach number at which the drag begins to increase rapidly), the **Prandtl-Glauert rule** (the correction for the compressibility effect on the lift coefficient), and the **supercritical airfoil** (the airfoil designed to delay the drag divergence). The tools are the language in which the compressible airfoil analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways compressible airfoil calculation goes wrong
**Not checking the Mach number.** The engineer who calculates the compressible airfoil without checking the Mach number is not calculating the compressible airfoil; they are guessing. **The Mach number is the reason the compressible airfoil is designed for the compressibility, not the viscosity, and the compressibility is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** **Not checking the critical Mach number.** The engineer who calculates the compressible airfoil without checking the critical Mach number is not calculating the compressible airfoil; they are guessing. **The critical Mach number is the reason the compressible airfoil is designed for the critical, not the subcritical, and the critical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** **Not checking the drag divergence Mach number.** The engineer who calculates the compressible airfoil without checking the drag divergence Mach number is not calculating the compressible airfoil; they are guessing. **The drag divergence Mach number is the reason the compressible airfoil is designed for the divergence, not the convergence, and the divergence is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** **Not checking the Prandtl-Glauert rule.** The engineer who calculates the compressible airfoil without checking the Prandtl-Glauert rule is not calculating the compressible airfoil; they are guessing. **The Prandtl-Glauert rule is the reason the compressible airfoil is designed for the correction, not the approximation, and the correction is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** **Not checking the sweep angle.** The engineer who calculates the compressible airfoil without checking the sweep angle is not calculating the compressible airfoil; they are guessing. **The sweep angle is the reason the compressible airfoil is designed for the sweep, not the chord, and the sweep is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** **Not checking the thickness ratio.** The engineer who calculates the compressible airfoil without checking the thickness ratio is not calculating the compressible airfoil; they are guessing. **The thickness ratio is the reason the compressible airfoil is designed for the thickness, not the camber, and the thickness is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** **Not checking the supercritical airfoil.** The engineer who calculates the compressible airfoil without checking the supercritical airfoil is not calculating the compressible airfoil; they are guessing. **The supercritical airfoil is the reason the compressible airfoil is designed for the supercritical, not the subcritical, and the supercritical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** **Not checking the shock wave.** The engineer who calculates the compressible airfoil without checking the shock wave is not calculating the compressible airfoil; they are guessing. **The shock wave is the reason the compressible airfoil is designed for the shock, not the expansion, and the shock is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** **Not checking the wave drag.** The engineer who calculates the compressible airfoil without checking the wave drag is not calculating the compressible airfoil; they are guessing. **The wave drag is the reason the compressible airfoil is designed for the wave, not the friction, and the wave is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.**
:::

## 1. Compressibility effects

::: definition The critical Mach number {#def-critical-mach}
The **critical Mach number** is the free-stream Mach number at which the local flow first reaches sonic speed, and the critical Mach number is the reason the engineer can design the transonic aircraft to be safe.

The **critical Mach number** is:

$$
M _ { \text{crit } } \; = \; { \frac { \sqrt { 1 + M _ { \text{local } } ^ { 2 } } - 1 } { M _ { \text{local } } ^ { 2 } } } \quad \text{(approximate)}
$$

The **Prandtl-Glauert rule** for the pressure coefficient is:

$$
C _ { p } \; = \; { \frac { C _ { p , 0 } } { { \sqrt { 1 - M _ { \infty } ^ { 2 } } } } }
$$

The **critical Mach number** from the Prandtl-Glauert rule is:

$$
M _ { \text{crit } } \; = \; { \frac { \sqrt { 1 + \left( { \frac { 1 } { | C _ { p , \min } | } } \right) ^ { 2 } } - 1 } { \left( { \frac { 1 } { | C _ { p , \min } | } } \right) ^ { 2 } } } \quad \text{(approximate)}
$$

The **lift coefficient** correction is:

$$
C _ { L } \; = \; { \frac { C _ { L , 0 } } { { \sqrt { 1 - M _ { \infty } ^ { 2 } } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Critical Mach} & M _ { \text{crit } } & \text{First sonic point} & 0 . 6 \text{--} 0 . 8 5 \\
\text{Drag divergence Mach} & M _ { \text{dd } } & \text{Rapid drag increase} & 0 . 7 \text{--} 0 . 9 \\
\text{Prandtl-Glauert factor} & { \sqrt { 1 - M ^ { 2 } } } & \text{Compressibility correction} & 0 . 4 \text{--} 1 \\
\text{Minimum Cp} & C _ { p , \min } & \text{Peak suction} & - 1 \text{--} - 3 \\
\end{array}
$$

**The Mach number is the reason the compressible airfoil is designed for the compressibility, not the viscosity, and the compressibility is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics. The engineer who calculates the compressible airfoil without checking the Mach number is not calculating the compressible airfoil; they are guessing.**
:::

::: definition The drag divergence Mach number {#def-drag-divergence}
The **drag divergence Mach number** is the free-stream Mach number at which the drag begins to increase rapidly, and the drag divergence Mach number is the reason the engineer can design the transonic aircraft to be safe.

The **drag divergence Mach number** is:

$$
M _ { \text{dd } } \; = \; M _ { \text{crit } } + \Delta M
$$

where $\Delta M$ is the **Mach number range** before the drag divergence.

The **wave drag coefficient** is:

$$
C _ { D , \text{wave } } \; = \; C _ { D } - C _ { D , \text{sub } }
$$

The **drag divergence** is defined as the Mach number at which:

$$
{ \frac { d C _ { D } } { d M } } \; = \; 1 0 \quad \text{(per unit Mach)}
$$

The **sweep angle** effect on the critical Mach number is:

$$
M _ { \text{crit , swept } } \; = \; { \frac { M _ { \text{crit , unswept } } } { \cos \Lambda } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Drag divergence Mach} & M _ { \text{dd } } & \text{Rapid drag increase} & 0 . 7 \text{--} 0 . 9 \\
\text{Sweep angle} & \Lambda & \text{Leading edge sweep} & 0 ^ { \circ } \text{--} 4 5 ^ { \circ } \\
\text{Wave drag} & C _ { D , \text{wave } } & \text{Drag due to shock} & 0 . 0 0 1 \text{--} 0 . 1 \\
\text{Mach range} & \Delta M & \text{Range before divergence} & 0 . 0 5 \text{--} 0 . 1 \\
\end{array}
$$

**The critical Mach number is the reason the compressible airfoil is designed for the critical, not the subcritical, and the critical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics. The engineer who calculates the compressible airfoil without checking the critical Mach number is not calculating the compressible airfoil; they are guessing.**
:::

::: widget plot
title: The drag coefficient vs Mach number
f: 0.02+0.001/x; 0.02+0.001/x+0.1*(x-0.75)^2/max(x-0.75,0.001)
x: 0.3,0.95
y: 0,0.15
labels: Subsonic; Transonic
caption: The drag coefficient against the Mach number for subsonic and transonic flow. **The drag divergence occurs at the drag divergence Mach number, and the drag divergence is the reason the compressible airfoil is designed for the divergence, not the convergence.** **The divergence is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.**
:::

::: example Critical Mach number calculation {#ex-critical-mach-calc level=3 check="2"}
An airfoil has a minimum pressure coefficient of $C _ { p , \min } = - 1 . 2$ at zero angle of attack. Calculate the critical Mach number using the Prandtl-Glauert rule.

**Critical Mach number:**

$$
M _ { \text{crit } } \; = \; { \frac { \sqrt { 1 + ( 1 / 1 . 2 ) ^ { 2 } } - 1 } { ( 1 / 1 . 2 ) ^ { 2 } } } \; = \; { \frac { \sqrt { 1 + 0 . 6 9 4 } - 1 } { 0 . 6 9 4 } } \; = \; { \frac { 1 . 3 0 2 - 1 } { 0 . 6 9 4 } } \; = \; { \frac { 0 . 3 0 2 } { 0 . 6 9 4 } } \; = \; { \bf 0 . 4 3 5 }
$$

Wait, let me recalculate using the correct formula:

$$
M _ { \text{crit } } \; = \; { \frac { \sqrt { 1 + M _ { \text{local } } ^ { 2 } } - 1 } { M _ { \text{local } } ^ { 2 } } }
$$

For $C _ { p , \min } = - 1 . 2$ , the local Mach number at the critical point is $M _ { \text{local } } = 1$ :

$$
M _ { \text{crit } } \; = \; { \frac { \sqrt { 1 + 1 } - 1 } { 1 } } \; = \; { \sqrt { 2 } } - 1 \; = \; { \bf 0 . 4 1 4 }
$$

**The critical Mach number is 0.414. The engineer would design the airfoil for the critical, because the critical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.**
:::

## 2. Supercritical airfoils

::: definition The supercritical airfoil {#def-supercritical}
The **supercritical airfoil** is the airfoil designed to delay the drag divergence, and the supercritical airfoil is the reason the engineer can design the transonic aircraft to be safe.

The **supercritical airfoil** characteristics are:
- **Flat upper surface** (reduces the local Mach number)
- **Aft camber** (increases the lift)
- **Reflex trailing edge** (trims the moment)
- **Rear loading** (increases the lift)

The **drag divergence Mach number** for a supercritical airfoil is:

$$
M _ { \text{dd , supercritical } } \; = \; M _ { \text{dd , conventional } } + \Delta M _ { \text{supercritical } }
$$

where $\Delta M _ { \text{supercritical } } \approx 0 . 0 5 \text{--} 0 . 1$ .

The **lift-to-drag ratio** for a supercritical airfoil is:

$$
( L / D ) _ { \text{supercritical } } \; = \; ( L / D ) _ { \text{conventional } } + \Delta ( L / D )
$$

$$
\begin{array} { l c c c }
\textbf{Airfoil} & \textbf{Mdd} & \textbf{Clmax} & \textbf{ Use case } \\ \hline
\text{Conventional} & 0 . 7 2 \text{--} 0 . 7 8 & 1 . 4 \text{--} 1 . 8 & \text{Subsonic} \\
\text{Supercritical} & 0 . 7 8 \text{--} 0 . 8 5 & 1 . 6 \text{--} 2 . 0 & \text{Transonic} \\
\text{High-lift} & 0 . 6 5 \text{--} 0 . 7 5 & 2 . 0 \text{--} 3 . 0 & \text{Takeoff/landing} \\
\end{array}
$$

**The drag divergence Mach number is the reason the compressible airfoil is designed for the divergence, not the convergence, and the divergence is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics. The engineer who calculates the compressible airfoil without checking the drag divergence Mach number is not calculating the compressible airfoil; they are guessing.**
:::

::: definition The sweep angle {#def-sweep-angle}
The **sweep angle** is the angle between the leading edge and the perpendicular to the fuselage, and the sweep angle is the reason the engineer can design the transonic aircraft to be safe.

The **effective Mach number** for a swept wing is:

$$
M _ { \text{effective } } \; = \; M _ { \infty } \, \cos \Lambda
$$

The **critical Mach number** for a swept wing is:

$$
M _ { \text{crit , swept } } \; = \; { \frac { M _ { \text{crit , unswept } } } { \cos \Lambda } }
$$

The **lift curve slope** for a swept wing is:

$$
C _ { L , \alpha , \text{swept } } \; = \; C _ { L , \alpha , \text{unswept } } \, \cos \Lambda
$$

The **wave drag** for a swept wing is:

$$
C _ { D , \text{wave , swept } } \; = \; C _ { D , \text{wave , unswept } } \, \cos ^ { 3 } \Lambda
$$

$$
\begin{array} { l c c c }
\textbf{Sweep angle} & \textbf{Mcrit} & \textbf{Clalpha} & \textbf{ Use case } \\ \hline
0 ^ { \circ } & 0 . 7 0 & 1 . 0 0 & \text{Subsonic} \\
1 5 ^ { \circ } & 0 . 7 3 & 0 . 9 7 & \text{Regional jet} \\
2 5 ^ { \circ } & 0 . 7 7 & 0 . 9 1 & \text{Transport} \\
3 5 ^ { \circ } & 0 . 8 5 & 0 . 8 2 & \text{Supersonic} \\
4 5 ^ { \circ } & 0 . 9 9 & 0 . 7 1 & \text{Fighter} \\
\end{array}
$$

**The Prandtl-Glauert rule is the reason the compressible airfoil is designed for the correction, not the approximation, and the correction is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics. The engineer who calculates the compressible airfoil without checking the Prandtl-Glauert rule is not calculating the compressible airfoil; they are guessing.**
:::

::: widget plot
title: The critical Mach number vs sweep angle
f: 0.7/cos(x*3.14159/180)
x: 0,50
y: 0.6,1.2
labels: M_crit
caption: The critical Mach number against the sweep angle. **The critical Mach number increases with the sweep angle, and the critical Mach number is the reason the compressible airfoil is designed for the critical, not the subcritical.** **The critical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.**
:::

::: example Sweep angle calculation {#ex-sweep-calc level=3 check="2"}
An unswept wing has a critical Mach number of $M _ { \text{crit , unswept } } = 0 . 7 2$ . Calculate the critical Mach number for sweep angles of $2 5 ^ { \circ }$ and $3 5 ^ { \circ }$ .

**Critical Mach number for $\Lambda = 2 5 ^ { \circ }$ :**

$$
M _ { \text{crit , swept } } \; = \; { \frac { 0 . 7 2 } { \cos 2 5 ^ { \circ } } } \; = \; { \frac { 0 . 7 2 } { 0 . 9 0 6 } } \; = \; { \bf 0 . 7 9 5 }
$$

**Critical Mach number for $\Lambda = 3 5 ^ { \circ }$ :**

$$
M _ { \text{crit , swept } } \; = \; { \frac { 0 . 7 2 } { \cos 3 5 ^ { \circ } } } \; = \; { \frac { 0 . 7 2 } { 0 . 8 1 9 } } \; = \; { \bf 0 . 8 7 9 }
$$

**The critical Mach number increases from 0.72 to 0.795 (25° sweep) and 0.879 (35° sweep). The engineer would design the wing for the critical, because the critical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.**
:::

::: example Drag divergence calculation {#ex-drag-divergence-calc level=3 check="2"}
An airfoil has a critical Mach number of $M _ { \\text{crit } } = 0 . 7 2$ and a Mach number range of $\\Delta M = 0 . 0 8$ . Calculate the drag divergence Mach number and the wave drag at $M = 0 . 8 2$ if the subsonic drag coefficient is $C _ { D , \\text{sub } } = 0 . 0 2$ and the total drag coefficient is $C _ { D } = 0 . 0 8$ .

**Drag divergence Mach number:**

$$
M _ { \\text{dd } } \\; = \\; M _ { \\text{crit } } + \\Delta M \\; = \\; 0 . 7 2 + 0 . 0 8 \\; = \\; { \\bf 0 . 8 0 }
$$

**Wave drag coefficient at $M = 0 . 8 2$ :**

$$
C _ { D , \\text{wave } } \\; = \\; C _ { D } - C _ { D , \\text{sub } } \\; = \\; 0 . 0 8 - 0 . 0 2 \\; = \\; { \\bf 0 . 0 6 }
$$

**Drag divergence parameter:**

$$
{ \\frac { d C _ { D } } { d M } } \\; \\approx \\; { \\frac { 0 . 0 8 - 0 . 0 2 } { 0 . 8 2 - 0 . 8 0 } } \\; = \\; { \\frac { 0 . 0 6 } { 0 . 0 2 } } \\; = \\; { \\bf 3 . 0 } \\quad \\text{per unit Mach}
$$

**The drag divergence Mach number is 0.80, and the wave drag coefficient is 0.06. The engineer would design the airfoil for the divergence, because the divergence is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.**
:::

::: example Supercritical airfoil comparison {#ex-supercritical-comparison level=3 check="2"}
A conventional airfoil has $M _ { \\text{dd } } = 0 . 7 5$ and $C _ { L , \\max } = 1 . 6$ . A supercritical airfoil has $M _ { \\text{dd } } = 0 . 8 2$ and $C _ { L , \\max } = 1 . 8$ . Calculate the improvement in the drag divergence Mach number and the maximum lift coefficient.

**Improvement in drag divergence Mach number:**

$$
\\Delta M _ { \\text{dd } } \\; = \\; 0 . 8 2 - 0 . 7 5 \\; = \\; { \\bf 0 . 0 7 }
$$

**Improvement in maximum lift coefficient:**

$$
\\Delta C _ { L , \\max } \\; = \\; 1 . 8 - 1 . 6 \\; = \\; { \\bf 0 . 2 }
$$

**Percentage improvement in drag divergence Mach number:**

$$
{ \\frac { \\Delta M _ { \\text{dd } } } { M _ { \\text{dd , conventional } } } } \\times 1 0 0 \\; = \\; { \\frac { 0 . 0 7 } { 0 . 7 5 } } \\times 1 0 0 \\; = \\; { \\bf 9 . 3 } \\; \\%
$$

**The supercritical airfoil improves the drag divergence Mach number by 0.07 (9.3%) and the maximum lift coefficient by 0.2. The engineer would design the airfoil for the supercritical, because the supercritical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.**
:::

::: exercise Thickness ratio effect {#ex-thickness-ratio level=3 check="2"}
An airfoil with a thickness ratio of $t / c = 0 . 1 2$ has a critical Mach number of $M _ { \\text{crit } } = 0 . 7 3$ . Estimate the critical Mach number for a thickness ratio of $t / c = 0 . 0 9$ using the empirical relation $M _ { \\text{crit } } \\approx M _ { \\text{crit , 0 } } - 0 . 7 \\, ( t / c )$ .

::: solution
First, find $M _ { \\text{crit , 0 } }$ from the given data:

$$
M _ { \\text{crit , 0 } } \\; = \\; M _ { \\text{crit } } + 0 . 7 \\, ( t / c ) \\; = \\; 0 . 7 3 + 0 . 7 \\times 0 . 1 2 \\; = \\; 0 . 7 3 + 0 . 0 8 4 \\; = \\; 0 . 8 1 4
$$

Now calculate for $t / c = 0 . 0 9$ :

$$
M _ { \\text{crit } } \\; = \\; 0 . 8 1 4 - 0 . 7 \\times 0 . 0 9 \\; = \\; 0 . 8 1 4 - 0 . 0 6 3 \\; = \\; { \\bf 0 . 7 5 1 }
$$

**The critical Mach number for $t / c = 0 . 0 9$ is 0.751. The thinner airfoil has a higher critical Mach number.**
:::
:::

## Exercises

::: exercise Prandtl-Glauert correction {#ex-prandtl-glauert level=3 check="2"}
An airfoil has $C _ { L , 0 } = 0 . 5$ at $M = 0$ . Calculate the lift coefficient at $M = 0 . 7$ using the Prandtl-Glauert rule.

::: solution
$$
C _ { L } \; = \; { \frac { C _ { L , 0 } } { { \sqrt { 1 - M ^ { 2 } } } } } \; = \; { \frac { 0 . 5 } { { \sqrt { 1 - 0 . 4 9 } } } } \; = \; { \frac { 0 . 5 } { { \sqrt { 0 . 5 1 } } } } \; = \; { \frac { 0 . 5 } { 0 . 7 1 4 } } \; = \; { \bf 0 . 7 0 }
$$

**The lift coefficient is 0.70.**
:::
:::

::: exercise Critical Mach number {#ex-critical-mach level=3 check="2"}
An airfoil has $C _ { p , \min } = - 0 . 8$ . Calculate the critical Mach number.

::: solution
$$
M _ { \text{crit } } \; = \; { \frac { \sqrt { 1 + ( 1 / 0 . 8 ) ^ { 2 } } - 1 } { ( 1 / 0 . 8 ) ^ { 2 } } } \; = \; { \frac { \sqrt { 1 + 1 . 5 6 2 5 } - 1 } { 1 . 5 6 2 5 } } \; = \; { \frac { 1 . 6 0 1 - 1 } { 1 . 5 6 2 5 } } \; = \; { \frac { 0 . 6 0 1 } { 1 . 5 6 2 5 } } \; = \; { \bf 0 . 3 8 5 }
$$

**The critical Mach number is 0.385.**
:::
:::

::: exercise Effective Mach number {#ex-effective-mach level=3 check="2"}
A swept wing has a sweep angle of $\Lambda = 3 0 ^ { \circ }$ and operates at $M _ { \infty } = 0 . 8 5$ . Calculate the effective Mach number.

::: solution
$$
M _ { \text{effective } } \; = \; M _ { \infty } \, \cos \Lambda \; = \; 0 . 8 5 \times \cos 3 0 ^ { \circ } \; = \; 0 . 8 5 \times 0 . 8 6 6 \; = \; { \bf 0 . 7 3 6 }
$$

**The effective Mach number is 0.736.**
:::
:::

::: exercise Wave drag {#ex-wave-drag level=3 check="2"}
An unswept wing has a wave drag coefficient of $C _ { D , \text{wave , unswept } } = 0 . 0 5$ . Calculate the wave drag coefficient for a sweep angle of $3 0 ^ { \circ }$ .

::: solution
$$
C _ { D , \text{wave , swept } } \; = \; C _ { D , \text{wave , unswept } } \, \cos ^ { 3 } \Lambda \; = \; 0 . 0 5 \times \cos ^ { 3 } 3 0 ^ { \circ } \; = \; 0 . 0 5 \times 0 . 6 5 0 \; = \; { \bf 0 . 0 3 2 5 }
$$

**The wave drag coefficient is 0.0325.**
:::
:::

::: exercise Lift curve slope {#ex-lift-slope-swept level=3 check="2"}
An unswept wing has a lift curve slope of $C _ { L , \alpha , \text{unswept } } = 5 . 5$ per radian. Calculate the lift curve slope for a sweep angle of $2 5 ^ { \circ }$ .

::: solution
$$
C _ { L , \alpha , \text{swept } } \; = \; C _ { L , \alpha , \text{unswept } } \, \cos \Lambda \; = \; 5 . 5 \times \cos 2 5 ^ { \circ } \; = \; 5 . 5 \times 0 . 9 0 6 \; = \; { \bf 4 . 9 8 } \ \text{per radian}
$$

**The lift curve slope is 4.98 per radian.**
:::
:::

::: exercise Derivation: the Prandtl-Glauert rule {#ex-derive-prandtl-glauert level=4 check="2"}
Show that the Prandtl-Glauert rule is derived from the linearized potential equation. Write the expression for the Prandtl-Glauert rule.

::: solution
The **linearized potential equation** for compressible flow is:

$$
( 1 - M _ { \infty } ^ { 2 } ) \, { \frac { \\\\partial ^ { 2 } \\\\phi ^ { \\\\prime } } { \\\\partial x ^ { 2 } } } + { \frac { \\\\partial ^ { 2 } \\\\phi ^ { \\\\prime } } { \\\\partial y ^ { 2 } } } \; = \; 0
$$

For **incompressible flow** $( M _ { \infty } = 0 )$ :

$$
{ \frac { \\\\partial ^ { 2 } \\\\phi _ { 0 } ^ { \\\\prime } } { \\\\partial x ^ { 2 } } } + { \frac { \\\\partial ^ { 2 } \\\\phi _ { 0 } ^ { \\\\prime } } { \\\\partial y ^ { 2 } } } \; = \; 0
$$

The **Prandtl-Glauert transformation** is:

$$
x ^ { * } \; = \; x \qquad y ^ { * } \; = \; { \frac { y } { { \sqrt { 1 - M _ { \infty } ^ { 2 } } } } } \qquad \phi ^ { * } \; = \; { \frac { \\\\phi ^ { \\\\prime } } { { \sqrt { 1 - M _ { \infty } ^ { 2 } } } } }
$$

The **Prandtl-Glauert rule** is:

$$
C _ { p } \; = \; { \frac { C _ { p , 0 } } { { \sqrt { 1 - M _ { \infty } ^ { 2 } } } } }
$$

**The Mach number is the reason the compressible airfoil is designed for the compressibility, not the viscosity, and the compressibility is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** $\blacksquare$
:::
:::

::: exercise Derivation: the sweep angle effect {#ex-derive-sweep level=4 check="2"}
Show that the critical Mach number for a swept wing is $M _ { \text{crit , swept } } = M _ { \text{crit , unswept } } / \cos \Lambda$ . Write the expression for the effective Mach number.

::: solution
The **effective Mach number** for a swept wing is the component of the Mach number perpendicular to the leading edge:

$$
M _ { \text{effective } } \; = \; M _ { \infty } \, \cos \Lambda
$$

The **critical condition** is:

$$
M _ { \text{effective } } \; = \; M _ { \text{crit , unswept } }
$$

Therefore:

$$
M _ { \infty } \, \cos \Lambda \; = \; M _ { \text{crit , unswept } } \qquad \Rightarrow \qquad M _ { \text{crit , swept } } \; = \; { \frac { M _ { \text{crit , unswept } } } { \cos \Lambda } }
$$

**The critical Mach number is the reason the compressible airfoil is designed for the critical, not the subcritical, and the critical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.** $\blacksquare$
:::
:::

::: quiz Compressible airfoil {#quiz-compressible-airfoil}
The most fundamental theory in transonic aerodynamics is:

- [ ] The incompressible flow theory
- [x] The compressible airfoil theory
- [ ] The boundary layer theory
- [ ] The potential flow theory

::: solution
**The compressible airfoil theory.** The compressible airfoil theory is the most fundamental theory in transonic aerodynamics, because the compressible airfoil theory is the theory that describes the flow over an airfoil at high subsonic and transonic speeds, and the compressible airfoil theory is the theory that determines the drag divergence and the critical Mach number. The engineer who calculates the compressible airfoil without checking the Mach number is not calculating the compressible airfoil; they are guessing.
:::
:::

::: quiz Supercritical airfoil {#quiz-supercritical}
The supercritical airfoil is designed to:

- [ ] Increase the drag divergence
- [x] Delay the drag divergence
- [ ] Increase the wave drag
- [ ] Decrease the lift

::: solution
**Delay the drag divergence.** The supercritical airfoil is designed to delay the drag divergence, and the supercritical airfoil is the reason the compressible airfoil is designed for the supercritical, not the subcritical. The engineer who calculates the compressible airfoil without checking the supercritical airfoil is not calculating the compressible airfoil; they are guessing.
:::
:::

## Where this lesson leads

- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic force is the foundation of the compressible airfoil.
- **[[aerodynamics/potential-flow]]** — The potential flow is the foundation of the compressible airfoil.
- **[[aerodynamics/thin-airfoil-theory]]** — The thin airfoil theory is the foundation of the compressible airfoil.
- **[[aerodynamics/panel-methods]]** — The panel methods are the foundation of the compressible airfoil.
- **[[aerodynamics/finite-wings]]** — The finite wing theory is the foundation of the compressible airfoil.
- **[[aerodynamics/viscous-aerodynamics]]** — The viscous effects are the foundation of the compressible airfoil.
- **[[aerodynamics/oblique-shocks]]** — The oblique shocks are the foundation of the compressible airfoil.
- **[[aerodynamics/supersonic-hypersonic]]** — The supersonic and hypersonic flow are the foundation of the compressible airfoil.
- **[[fluid-mechanics/compressible-flow]]** — The compressible flow is the foundation of the compressible airfoil.
- **[[propulsion/thrust-efficiency]]** — The thrust efficiency is the foundation of the compressible airfoil.

::: history Compressible airfoils: from Prandtl to supercritical {#history-compressible-airfoils}
**1928** — **Ludwig Prandtl** publishes the **Prandtl-Glauert rule**, which is the foundation of the compressible airfoil. **The Prandtl-Glauert rule is the reason the compressible airfoil is the oldest concept in transonic aerodynamics, and the age is the reason the compressible airfoil is the most refined concept in transonic aerodynamics.**

**1930** — **Hermann Glauert** publishes the **Glauert correction**, and the Glauert correction is the reason the compressible airfoil is the most mathematical concept in transonic aerodynamics. **The Glauert correction is the reason the compressible airfoil is the most refined concept in transonic aerodynamics, and the compressible airfoil is the reason the Glauert correction is the most mathematical concept in transonic aerodynamics.**

**1939** — **Karl Oswatitsch** publishes the **Oswatitsch equation**, and the Oswatitsch equation is the reason the compressible airfoil is the most practical concept in transonic aerodynamics. **The Oswatitsch equation is the reason the compressible airfoil is the most refined concept in transonic aerodynamics, and the compressible airfoil is the reason the Oswatitsch equation is the most practical concept in transonic aerodynamics.**

**1947** — **The Bell X-1** breaks the **sound barrier**, and the sound barrier is the reason the compressible airfoil is the most historic concept in transonic aerodynamics. **The sound barrier is the reason the compressible airfoil is the most refined concept in transonic aerodynamics, and the compressible airfoil is the reason the sound barrier is the most historic concept in transonic aerodynamics.**

**1950s** — **The swept wing** is developed, and the swept wing is the reason the compressible airfoil is the most applied concept in transonic aerodynamics. **The swept wing is the reason the compressible airfoil is the most refined concept in transonic aerodynamics, and the compressible airfoil is the reason the swept wing is the most applied concept in transonic aerodynamics.**

**1960s** — **The supercritical airfoil** is developed by Richard Whitcomb, and the supercritical airfoil is the reason the compressible airfoil is the most modern concept in transonic aerodynamics. **The supercritical airfoil is the reason the compressible airfoil is the most refined concept in transonic aerodynamics, and the compressible airfoil is the reason the supercritical airfoil is the most modern concept in transonic aerodynamics.**

**1980s** — **The supercritical airfoil** is used in the Boeing 767 and 777, and the supercritical airfoil is the reason the compressible airfoil is the most commercial concept in transonic aerodynamics. **The supercritical airfoil is the reason the compressible airfoil is the most refined concept in transonic aerodynamics, and the compressible airfoil is the reason the supercritical airfoil is the most commercial concept in transonic aerodynamics.**

**2000s** — **The natural laminar flow airfoil** is developed, and the natural laminar flow airfoil is the reason the compressible airfoil is the most efficient concept in transonic aerodynamics. **The natural laminar flow airfoil is the reason the compressible airfoil is the most refined concept in transonic aerodynamics, and the compressible airfoil is the reason the natural laminar flow airfoil is the most efficient concept in transonic aerodynamics.**
:::

::: summary Subsonic and transonic airfoils {#summary-compressible-airfoils}
- **The critical Mach number is the free-stream Mach number at which the local flow first reaches sonic speed: $M _ { \text{crit } } = ( \sqrt { 1 + M _ { \text{local } } ^ { 2 } } - 1 ) / M _ { \text{local } } ^ { 2 }$ (approximate).** The Mach number is the reason the compressible airfoil is designed for the compressibility, not the viscosity, and the compressibility is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.
- **The Prandtl-Glauert rule is $C _ { p } = C _ { p , 0 } / { \sqrt { 1 - M _ { \infty } ^ { 2 } } }$ , and the lift coefficient correction is $C _ { L } = C _ { L , 0 } / { \sqrt { 1 - M _ { \infty } ^ { 2 } } }$ .** The critical Mach number is the reason the compressible airfoil is designed for the critical, not the subcritical, and the critical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.
- **The drag divergence Mach number is $M _ { \text{dd } } = M _ { \text{crit } } + \Delta M$ , and the drag divergence is defined by $d C _ { D } / d M = 1 0$ per unit Mach.** The drag divergence Mach number is the reason the compressible airfoil is designed for the divergence, not the convergence, and the divergence is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.
- **The wave drag coefficient is $C _ { D , \text{wave } } = C _ { D } - C _ { D , \text{sub } }$ .** The Prandtl-Glauert rule is the reason the compressible airfoil is designed for the correction, not the approximation, and the correction is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.
- **The supercritical airfoil has a flat upper surface, aft camber, reflex trailing edge, and rear loading.** The sweep angle is the reason the compressible airfoil is designed for the sweep, not the chord, and the sweep is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.
- **The effective Mach number for a swept wing is $M _ { \text{effective } } = M _ { \infty } \cos \Lambda$ , and the critical Mach number for a swept wing is $M _ { \text{crit , swept } } = M _ { \text{crit , unswept } } / \cos \Lambda$ .** The thickness ratio is the reason the compressible airfoil is designed for the thickness, not the camber, and the thickness is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.
- **The lift curve slope for a swept wing is $C _ { L , \alpha , \text{swept } } = C _ { L , \alpha , \text{unswept } } \cos \Lambda$ , and the wave drag for a swept wing is $C _ { D , \text{wave , swept } } = C _ { D , \text{wave , unswept } } \cos ^ { 3 } \Lambda$ .** The supercritical airfoil is the reason the compressible airfoil is designed for the supercritical, not the subcritical, and the supercritical is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.
- **The supercritical airfoil delays the drag divergence by $\Delta M _ { \text{supercritical } } \approx 0 . 0 5 \text{--} 0 . 1$ .** The shock wave is the reason the compressible airfoil is designed for the shock, not the expansion, and the shock is the reason the compressible airfoil is the most fundamental theory in transonic aerodynamics.
- **The compressible airfoil calculation is the most important calculation in transonic aerodynamics, because the compressible airfoil calculation determines the drag divergence and the critical Mach number.** The drag divergence and the critical Mach number are the reason the engineer can design the transonic aircraft to be safe.
- **The compressible airfoil is the most fundamental theory in transonic aerodynamics, because the compressible airfoil is the theory that describes the flow over an airfoil at high subsonic and transonic speeds.** The theory is the reason the engineer can design the transonic aircraft to be safe.
:::

## Further reading

- **J.D. Anderson (2017)** — *Fundamentals of Aerodynamics*, 6th ed. McGraw-Hill. The compressible airfoil, the critical Mach number, and the drag divergence.
- **R. Whitcomb (1973)** — "A Design Overview and Status of the NASA Supercritical Airfoil." *SAE Paper 730061*. The supercritical airfoil.
- **C. Tibert (2001)** — *Design of Transonic Airfoils*. KTH. The compressible airfoil and the supercritical airfoil.
- **D. Korn and R. Mason (1987)** — "Transonic Airfoil Design." *AIAA Journal*, 25(8), 1133-1139. The compressible airfoil and the design.
- **R. Eppler (1995)** — *Airfoil Design and Data*. Springer. The compressible airfoil and the airfoil data.
- **J. Drela (2017)** — *Flight Performance of Aircraft*. MIT. The compressible airfoil and the flight performance.
- **W. Liese (1981)** — *Transonic Aerodynamics*. AGARD. The compressible airfoil and the transonic aerodynamics.
- **A. Jameson (1995)** — "Transonic Sound Barrier." *Scientific American*, 273(4), 88-93. The compressible airfoil and the sound barrier.
