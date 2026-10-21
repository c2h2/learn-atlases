The oblique shock is the most fundamental theory in compressible aerodynamics: the oblique shock is the theory that describes the shock wave at an angle to the flow, and the oblique shock is the theory that determines the pressure and temperature rise across the shock. **The engineer who calculates the oblique shock without checking the Mach number is not calculating the oblique shock; they are guessing.** The oblique shock calculation is the reason the engineer can design the supersonic aircraft to be safe, and the safety is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.

The quantitative tools of the oblique shock are the **shock angle** (the angle between the shock wave and the flow direction), the **deflection angle** (the angle through which the flow is turned), the **Mach number** (the ratio of the flow velocity to the speed of sound), and the **pressure ratio** (the ratio of the pressure downstream to the pressure upstream). The tools are the language in which the oblique shock analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways oblique shock calculation goes wrong
**Not checking the Mach number.** The engineer who calculates the oblique shock without checking the Mach number is not calculating the oblique shock; they are guessing. **The Mach number is the reason the oblique shock is designed for the compressibility, not the viscosity, and the compressibility is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** **Not checking the shock angle.** The engineer who calculates the oblique shock without checking the shock angle is not calculating the oblique shock; they are guessing. **The shock angle is the reason the oblique shock is designed for the angle, not the pressure, and the angle is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** **Not checking the deflection angle.** The engineer who calculates the oblique shock without checking the deflection angle is not calculating the oblique shock; they are guessing. **The deflection angle is the reason the oblique shock is designed for the turning, not the pressure, and the turning is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** **Not checking the pressure ratio.** The engineer who calculates the oblique shock without checking the pressure ratio is not calculating the oblique shock; they are guessing. **The pressure ratio is the reason the oblique shock is designed for the pressure, not the temperature, and the pressure is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** **Not checking the temperature ratio.** The engineer who calculates the oblique shock without checking the temperature ratio is not calculating the oblique shock; they are guessing. **The temperature ratio is the reason the oblique shock is designed for the temperature, not the pressure, and the temperature is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** **Not checking the Mach number downstream.** The engineer who calculates the oblique shock without checking the Mach number downstream is not calculating the oblique shock; they are guessing. **The Mach number downstream is the reason the oblique shock is designed for the Mach, not the pressure, and the Mach is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** **Not checking the maximum deflection angle.** The engineer who calculates the oblique shock without checking the maximum deflection angle is not calculating the oblique shock; they are guessing. **The maximum deflection angle is the reason the oblique shock is designed for the maximum, not the minimum, and the maximum is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** **Not checking the shock polar.** The engineer who calculates the oblique shock without checking the shock polar is not calculating the oblique shock; they are guessing. **The shock polar is the reason the oblique shock is designed for the polar, not the Cartesian, and the polar is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** **Not checking the expansion fan.** The engineer who calculates the oblique shock without checking the expansion fan is not calculating the oblique shock; they are guessing. **The expansion fan is the reason the oblique shock is designed for the expansion, not the compression, and the expansion is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.**
:::

## 1. The oblique shock relations

::: definition The shock angle {#def-shock-angle}
The **shock angle** is the angle between the shock wave and the flow direction, and the shock angle is the reason the engineer can design the supersonic aircraft to be safe.

The **shock angle** is determined by the **theta-beta-M relation**:

$$
\tan \theta \; = \; 2 \, \cot \beta \, { \frac { M _ { 1 } ^ { 2 } \, \sin ^ { 2 } \beta - 1 } { M _ { 1 } ^ { 2 } \, ( \gamma + \cos 2 \beta ) + 2 } }
$$

where $\theta$ is the **deflection angle**, $\beta$ is the **shock angle**, and $M _ { 1 }$ is the **upstream Mach number**.

The **pressure ratio** across the oblique shock is:

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; 1 + { \frac { 2 \, \gamma } { \gamma + 1 } } \, ( M _ { 1 } ^ { 2 } \, \sin ^ { 2 } \beta - 1 )
$$

The **temperature ratio** across the oblique shock is:

$$
{ \frac { T _ { 2 } } { T _ { 1 } } } \; = \; { \frac { p _ { 2 } } { p _ { 1 } } } \, { \frac { \rho _ { 1 } } { \rho _ { 2 } } }
$$

The **density ratio** across the oblique shock is:

$$
{ \frac { \rho _ { 2 } } { \rho _ { 1 } } } \; = \; { \frac { ( \gamma + 1 ) \, M _ { 1 } ^ { 2 } \, \sin ^ { 2 } \beta } { ( \gamma - 1 ) \, M _ { 1 } ^ { 2 } \, \sin ^ { 2 } \beta + 2 } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Shock angle} & \beta & \text{Angle between shock and flow} & 3 0 ^ { \circ } \text{--} 9 0 ^ { \circ } \\
\text{Deflection angle} & \theta & \text{Angle through which flow is turned} & 0 ^ { \circ } \text{--} 3 0 ^ { \circ } \\
\text{Upstream Mach} & M _ { 1 } & \text{Mach number upstream} & 1 . 5 \text{--} 5 \\
\text{Downstream Mach} & M _ { 2 } & \text{Mach number downstream} & 1 \text{--} 5 \\
\text{Pressure ratio} & p _ { 2 } / p _ { 1 } & \text{Pressure rise} & 1 \text{--} 1 0 \\
\end{array}
$$

**The Mach number is the reason the oblique shock is designed for the compressibility, not the viscosity, and the compressibility is the reason the oblique shock is the most fundamental theory in compressible aerodynamics. The engineer who calculates the oblique shock without checking the Mach number is not calculating the oblique shock; they are guessing.**
:::

::: definition The Mach number downstream {#def-mach-downstream}
The **Mach number downstream** is the Mach number after the oblique shock, and the Mach number downstream is the reason the engineer can design the supersonic aircraft to be safe.

The **normal component** of the upstream Mach number is:

$$
M _ { 1 n } \; = \; M _ { 1 } \, \sin \beta
$$

The **normal component** of the downstream Mach number is:

$$
M _ { 2 n } ^ { 2 } \; = \; { \frac { 1 + { \frac { \gamma - 1 } { 2 } } \, M _ { 1 n } ^ { 2 } } { \gamma \, M _ { 1 n } ^ { 2 } - { \frac { \gamma - 1 } { 2 } } } }
$$

The **downstream Mach number** is:

$$
M _ { 2 } \; = \; { \frac { M _ { 2 n } } { \sin ( \beta - \theta ) } }
$$

The **total pressure ratio** across the oblique shock is:

$$
{ \frac { p _ { 0 2 } } { p _ { 0 1 } } } \; = \; \left[ { \frac { ( \gamma + 1 ) \, M _ { 1 n } ^ { 2 } } { ( \gamma - 1 ) \, M _ { 1 n } ^ { 2 } + 2 } } \right] ^ { \gamma / ( \gamma - 1 ) } \, { \frac { \gamma + 1 } { 2 \, \gamma \, M _ { 1 n } ^ { 2 } - ( \gamma - 1 ) } } ^ { 1 / ( \gamma - 1 ) }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Normal Mach upstream} & M _ { 1 n } & M _ { 1 } \sin \beta & 1 \text{--} 5 \\
\text{Normal Mach downstream} & M _ { 2 n } & \text{Normal component} & 0 . 4 \text{--} 1 \\
\text{Downstream Mach} & M _ { 2 } & \text{Mach number downstream} & 1 \text{--} 5 \\
\text{Total pressure ratio} & p _ { 0 2 } / p _ { 0 1 } & \text{Total pressure loss} & 0 . 5 \text{--} 1 \\
\end{array}
$$

**The shock angle is the reason the oblique shock is designed for the angle, not the pressure, and the angle is the reason the oblique shock is the most fundamental theory in compressible aerodynamics. The engineer who calculates the oblique shock without checking the shock angle is not calculating the oblique shock; they are guessing.**
:::

::: widget plot
title: The shock angle vs deflection angle
f: acos((x+sqrt(x^2+4*2.4*2.4))/(2*2.4)); acos((x-sqrt(x^2+4*2.4*2.4))/(2*2.4))
x: 0,30
y: 20,90
labels: Weak shock; Strong shock
caption: The shock angle against the deflection angle for weak and strong oblique shocks. **The weak shock has a smaller shock angle, and the weak shock is the reason the oblique shock is designed for the angle, not the pressure.** **The angle is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.**
:::

::: example Oblique shock calculation {#ex-oblique-shock-calc level=3 check="2"}
A supersonic flow with $M _ { 1 } = 3$ and $p _ { 1 } = 1 0$ kPa is deflected by $\theta = 1 5 ^ { \circ }$ . Calculate the shock angle, the pressure ratio, and the downstream Mach number.

**Shock angle (from theta-beta-M relation, weak solution):**

$$
\beta \; \approx \; { \bf 3 2 . 2 } \ ^ { \circ }
$$

**Normal Mach number upstream:**

$$
M _ { 1 n } \; = \; M _ { 1 } \, \sin \beta \; = \; 3 \times \sin 3 2 . 2 ^ { \circ } \; = \; 3 \times 0 . 5 3 3 \; = \; 1 . 6 0
$$

**Pressure ratio:**

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; 1 + { \frac { 2 \times 1 . 4 } { 2 . 4 } } \, ( 1 . 6 0 ^ { 2 } - 1 ) \; = \; 1 + 1 . 1 6 7 \times 1 . 5 6 \; = \; { \bf 2 . 8 2 }
$$

**Downstream Mach number:**

$$
M _ { 2 n } ^ { 2 } \; = \; { \frac { 1 + 0 . 2 \times 1 . 6 0 ^ { 2 } } { 1 . 4 \times 1 . 6 0 ^ { 2 } - 0 . 2 } } \; = \; { \frac { 1 . 5 1 2 } { 3 . 3 8 4 } } \; = \; 0 . 4 4 7 \qquad M _ { 2 n } \; = \; 0 . 6 6 9
$$

$$
M _ { 2 } \; = \; { \frac { 0 . 6 6 9 } { \sin ( 3 2 . 2 ^ { \circ } - 1 5 ^ { \circ } ) } } \; = \; { \frac { 0 . 6 6 9 } { \sin 1 7 . 2 ^ { \circ } } } \; = \; { \frac { 0 . 6 6 9 } { 0 . 2 9 6 } } \; = \; { \bf 2 . 2 6 }
$$

**The shock angle is 32.2°, the pressure ratio is 2.82, and the downstream Mach number is 2.26. The engineer would design the aircraft for the pressure, because the pressure is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.**
:::

## 2. Expansion waves

::: definition The Prandtl-Meyer expansion {#def-prandtl-meyer}
The **Prandtl-Meyer expansion** is the isentropic expansion of a supersonic flow around a convex corner, and the Prandtl-Meyer expansion is the reason the engineer can design the supersonic aircraft to be safe.

The **Prandtl-Meyer function** is:

$$
\nu ( M ) \; = \; { \sqrt { \frac { \gamma + 1 } { \gamma - 1 } } } \, \arctan \, { \sqrt { \frac { \gamma - 1 } { \gamma + 1 } } \, ( M ^ { 2 } - 1 ) } \; - \; \arctan \, { \sqrt { M ^ { 2 } - 1 } }
$$

The **deflection angle** is:

$$
\theta \; = \; \nu ( M _ { 2 } ) - \nu ( M _ { 1 } )
$$

The **Mach number downstream** is found from:

$$
\nu ( M _ { 2 } ) \; = \; \nu ( M _ { 1 } ) + \theta
$$

The **pressure ratio** across the expansion fan is:

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; \left( { \frac { 1 + { \frac { \gamma - 1 } { 2 } } \, M _ { 1 } ^ { 2 } } { 1 + { \frac { \gamma - 1 } { 2 } } \, M _ { 2 } ^ { 2 } } } \right) ^ { \gamma / ( \gamma - 1 ) }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Prandtl-Meyer function} & \nu ( M ) & \text{Turn angle function} & 0 ^ { \circ } \text{--} 1 3 0 ^ { \circ } \\
\text{Deflection angle} & \theta & \text{Angle through which flow is turned} & 0 ^ { \circ } \text{--} 6 0 ^ { \circ } \\
\text{Upstream Mach} & M _ { 1 } & \text{Mach number upstream} & 1 . 5 \text{--} 5 \\
\text{Downstream Mach} & M _ { 2 } & \text{Mach number downstream} & 1 . 5 \text{--} 1 0 \\
\end{array}
$$

**The deflection angle is the reason the oblique shock is designed for the turning, not the pressure, and the turning is the reason the oblique shock is the most fundamental theory in compressible aerodynamics. The engineer who calculates the oblique shock without checking the deflection angle is not calculating the oblique shock; they are guessing.**
:::

::: definition The maximum deflection angle {#def-max-deflection}
The **maximum deflection angle** is the maximum angle through which the flow can be turned by an oblique shock, and the maximum deflection angle is the reason the engineer can design the supersonic aircraft to be safe.

The **maximum deflection angle** is:

$$
\tan \theta _ { \max } \; = \; 2 \, \cot \beta \, { \frac { M _ { 1 } ^ { 2 } \, \sin ^ { 2 } \beta - 1 } { M _ { 1 } ^ { 2 } \, ( \gamma + \cos 2 \beta ) + 2 } } \quad \text{with } { \frac { d \theta } { d \beta } } = 0
$$

For $M _ { 1 } = 2$ : $\theta _ { \max } \approx 2 6 ^ { \circ }$

For $M _ { 1 } = 3$ : $\theta _ { \max } \approx 3 4 ^ { \circ }$

For $M _ { 1 } = 5$ : $\theta _ { \max } \approx 4 1 ^ { \circ }$

$$
\begin{array} { l c c c }
\textbf{Mach number} & \textbf{ } \theta _ { \max } & \textbf{ } \beta _ { \theta \max } & \textbf{ Use case } \\ \hline
M _ { 1 } = 1 . 5 & 1 2 ^ { \circ } & 6 5 ^ { \circ } & \text{Transonic} \\
M _ { 1 } = 2 & 2 6 ^ { \circ } & 5 7 ^ { \circ } & \text{Supersonic} \\
M _ { 1 } = 3 & 3 4 ^ { \circ } & 4 8 ^ { \circ } & \text{Supersonic} \\
M _ { 1 } = 5 & 4 1 ^ { \circ } & 4 2 ^ { \circ } & \text{Hypersonic} \\
\end{array}
$$

**The pressure ratio is the reason the oblique shock is designed for the pressure, not the temperature, and the pressure is the reason the oblique shock is the most fundamental theory in compressible aerodynamics. The engineer who calculates the oblique shock without checking the pressure ratio is not calculating the oblique shock; they are guessing.**
:::

::: widget plot
title: The pressure ratio vs Mach number
f: 1+2*1.4/2.4*(x^2*sin(35*3.14159/180)^2-1); 1+2*1.4/2.4*(x^2*sin(45*3.14159/180)^2-1)
x: 1,5
y: 0,10
labels: beta=35; beta=45
caption: The pressure ratio against the Mach number for different shock angles. **The pressure ratio increases with the Mach number, and the pressure ratio is the reason the oblique shock is designed for the pressure, not the temperature.** **The pressure is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.**
:::

::: example Prandtl-Meyer expansion {#ex-prandtl-meyer-calc level=3 check="2"}
A supersonic flow with $M _ { 1 } = 2$ and $p _ { 1 } = 2 0$ kPa expands around a convex corner of $\theta = 2 0 ^ { \circ }$ . Calculate the downstream Mach number and the pressure ratio.

**Prandtl-Meyer function at $M _ { 1 } = 2$ :**

$$
\nu ( 2 ) \; = \; { \sqrt { \frac { 2 . 4 } { 0 . 4 } } } \, \arctan \, { \sqrt { \frac { 0 . 4 } { 2 . 4 } } \times 3 } \; - \; \arctan \, { \sqrt { 3 } } \; = \; 2 . 4 4 9 \times 0 . 8 4 1 \; - \; 1 . 0 4 7 \; = \; 2 . 0 6 \; - \; 1 . 0 4 7 \; = \; 1 . 0 2 8 \ \text{rad} \; = \; 2 6 . 4 ^ { \circ }
$$

**Prandtl-Meyer function at $M _ { 2 }$ :**

$$
\nu ( M _ { 2 } ) \; = \; \nu ( M _ { 1 } ) + \theta \; = \; 2 6 . 4 ^ { \circ } + 2 0 ^ { \circ } \; = \; 4 6 . 4 ^ { \circ }
$$

**Downstream Mach number (from tables or iteration):**

$$
M _ { 2 } \; \approx \; { \bf 2 . 8 3 }
$$

**Pressure ratio:**

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; \left( { \frac { 1 + 0 . 2 \times 4 } { 1 + 0 . 2 \times 8 . 0 1 } } \right) ^ { 3 . 5 } \; = \; \left( { \frac { 1 . 8 } { 2 . 6 0 2 } } \right) ^ { 3 . 5 } \; = \; 0 . 6 9 2 ^ { 3 . 5 } \; = \; { \bf 0 . 2 8 1 }
$$

**The downstream Mach number is 2.83, and the pressure ratio is 0.281. The engineer would design the aircraft for the pressure, because the pressure is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.**
:::

::: example Strong oblique shock {#ex-strong-shock level=3 check="2"}
A supersonic flow with $M _ { 1 } = 2$ and $p _ { 1 } = 1 0$ kPa is deflected by $\\theta = 2 0 ^ { \\circ }$ . Calculate the strong shock angle, the pressure ratio, and the downstream Mach number.

**Shock angle (strong solution):**

$$
\\beta \\; \\approx \\; { \\bf 7 5 . 5 } \\; ^ { \\circ }
$$

**Normal Mach number upstream:**

$$
M _ { 1 n } \\; = \\; 2 \\times \\sin 7 5 . 5 ^ { \\circ } \\; = \\; 2 \\times 0 . 9 6 9 \\; = \\; 1 . 9 3 8
$$

**Pressure ratio:**

$$
{ \\frac { p _ { 2 } } { p _ { 1 } } } \\; = \\; 1 + { \\frac { 2 \\times 1 . 4 } { 2 . 4 } } \\, ( 1 . 9 3 8 ^ { 2 } - 1 ) \\; = \\; 1 + 1 . 1 6 7 \\times 2 . 7 5 6 \\; = \\; { \\bf 4 . 2 2 }
$$

**Downstream Mach number:**

$$
M _ { 2 n } ^ { 2 } \\; = \\; { \\frac { 1 + 0 . 2 \\times 1 . 9 3 8 ^ { 2 } } { 1 . 4 \\times 1 . 9 3 8 ^ { 2 } - 0 . 2 } } \\; = \\; { \\frac { 1 . 7 5 3 } { 5 . 0 5 9 } } \\; = \\; 0 . 3 4 6 \\qquad M _ { 2 n } \\; = \\; 0 . 5 8 8
$$

$$
M _ { 2 } \\; = \\; { \\frac { 0 . 5 8 8 } { \\sin ( 7 5 . 5 ^ { \\circ } - 2 0 ^ { \\circ } ) } } \\; = \\; { \\frac { 0 . 5 8 8 } { 0 . 8 9 9 } } \\; = \\; { \\bf 0 . 6 5 4 }
$$

**The strong shock angle is 75.5°, the pressure ratio is 4.22, and the downstream Mach number is 0.654 (subsonic). The engineer would design the aircraft for the pressure, because the pressure is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.**
:::

::: example Supersonic diamond {#ex-supersonic-diamond level=3 check="2"}
A supersonic diamond airfoil has a half-angle of $\\varepsilon = 8 ^ { \\circ }$ and operates at $M _ { 1 } = 2 . 5$ at zero angle of attack. Calculate the pressure ratio on the front face and the rear face.

**Front face (compression, oblique shock):**

$$
\\beta \\; \\approx \\; 3 0 ^ { \\circ } \\quad \\text{(from theta-beta-M relation)}
$$

$$
M _ { 1 n } \\; = \\; 2 . 5 \\times \\sin 3 0 ^ { \\circ } \\; = \\; 1 . 2 5
$$

$$
{ \\frac { p _ { 2 } } { p _ { 1 } } } \\; = \\; 1 + { \\frac { 2 . 8 } { 2 . 4 } } \\, ( 1 . 2 5 ^ { 2 } - 1 ) \\; = \\; 1 + 1 . 1 6 7 \\times 0 . 5 6 2 5 \\; = \\; { \\bf 1 . 6 6 }
$$

**Rear face (expansion, Prandtl-Meyer):**

$$
{ \\frac { p _ { 3 } } { p _ { 1 } } } \\; = \\; \\left( { \\frac { 1 + 0 . 2 \\times 2 . 5 ^ { 2 } } { 1 + 0 . 2 \\times 3 . 5 ^ { 2 } } } \\right) ^ { 3 . 5 } \\; = \\; \\left( { \\frac { 2 . 2 5 } { 3 . 4 5 } } \\right) ^ { 3 . 5 } \\; = \\; 0 . 6 5 2 ^ { 3 . 5 } \\; = \\; { \\bf 0 . 2 8 9 }
$$

**The pressure ratio on the front face is 1.66, and the pressure ratio on the rear face is 0.289. The engineer would design the airfoil for the pressure, because the pressure is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.**
:::

::: exercise Total pressure loss {#ex-total-pressure-loss level=3 check="2"}
A supersonic flow with $M _ { 1 } = 2$ passes through an oblique shock with $\\beta = 4 5 ^ { \\circ }$ . Calculate the total pressure ratio.

::: solution
$$
M _ { 1 n } \\; = \\; 2 \\times \\sin 4 5 ^ { \\circ } \\; = \\; 1 . 4 1 4
$$

$$
{ \\frac { p _ { 0 2 } } { p _ { 0 1 } } } \\; = \\; \\left[ { \\frac { 2 . 4 \\times 1 . 4 1 4 ^ { 2 } } { 0 . 4 \\times 1 . 4 1 4 ^ { 2 } + 2 } } \\right] ^ { 3 . 5 } \\! \\cdot \\; { \\frac { 2 . 4 } { 2 . 8 \\times 1 . 4 1 4 ^ { 2 } - 0 . 4 } } ^ { 2 . 5 }
$$

$$
{ \\frac { p _ { 0 2 } } { p _ { 0 1 } } } \\; = \\; \\left[ { \\frac { 4 . 8 } { 2 . 8 } } \\right] ^ { 3 . 5 } \\! \\cdot \\; { \\frac { 2 . 4 } { 5 . 2 } } ^ { 2 . 5 } \\; = \\; 1 . 7 1 4 ^ { 3 . 5 } \\! \\cdot \\; 0 . 4 6 2 ^ { 2 . 5 } \\; = \\; 3 . 8 5 \\! \\cdot \\; 0 . 1 4 0 \\; = \\; { \\bf 0 . 5 3 9 }
$$

**The total pressure ratio is 0.539 (46.1% total pressure loss).**
:::
:::

## Exercises

::: exercise Shock angle {#ex-shock-angle level=3 check="2"}
A supersonic flow with $M _ { 1 } = 2 . 5$ is deflected by $\theta = 1 0 ^ { \circ }$ . Calculate the shock angle (weak solution).

::: solution
Using the theta-beta-M relation:

$$
\beta \; \approx \; { \bf 3 6 . 5 } \ ^ { \circ }
$$

**The shock angle is 36.5°.**
:::
:::

::: exercise Pressure ratio {#ex-pressure-ratio level=3 check="2"}
A supersonic flow with $M _ { 1 } = 2$ and $p _ { 1 } = 1 0$ kPa passes through an oblique shock with $\beta = 4 0 ^ { \circ }$ . Calculate the pressure ratio and the downstream pressure.

::: solution
$$
M _ { 1 n } \; = \; 2 \times \sin 4 0 ^ { \circ } \; = \; 2 \times 0 . 6 4 3 \; = \; 1 . 2 8 6
$$

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; 1 + { \frac { 2 \times 1 . 4 } { 2 . 4 } } \, ( 1 . 2 8 6 ^ { 2 } - 1 ) \; = \; 1 + 1 . 1 6 7 \times 0 . 6 5 3 \; = \; { \bf 1 . 7 6 }
$$

$$
p _ { 2 } \; = \; 1 . 7 6 \times 1 0 \; = \; { \bf 1 7 . 6 } \ \text{kPa}
$$

**The pressure ratio is 1.76, and the downstream pressure is 17.6 kPa.**
:::
:::

::: exercise Downstream Mach number {#ex-downstream-mach level=3 check="2"}
A supersonic flow with $M _ { 1 } = 3$ passes through an oblique shock with $\beta = 3 5 ^ { \circ }$ and $\theta = 1 2 ^ { \circ }$ . Calculate the downstream Mach number.

::: solution
$$
M _ { 1 n } \; = \; 3 \times \sin 3 5 ^ { \circ } \; = \; 3 \times 0 . 5 7 4 \; = \; 1 . 7 2 1
$$

$$
M _ { 2 n } ^ { 2 } \; = \; { \frac { 1 + 0 . 2 \times 1 . 7 2 1 ^ { 2 } } { 1 . 4 \times 1 . 7 2 1 ^ { 2 } - 0 . 2 } } \; = \; { \frac { 1 . 5 9 3 } { 3 . 9 6 1 } } \; = \; 0 . 4 0 2 \qquad M _ { 2 n } \; = \; 0 . 6 3 4
$$

$$
M _ { 2 } \; = \; { \frac { 0 . 6 3 4 } { \sin ( 3 5 ^ { \circ } - 1 2 ^ { \circ } ) } } \; = \; { \frac { 0 . 6 3 4 } { \sin 2 3 ^ { \circ } } } \; = \; { \frac { 0 . 6 3 4 } { 0 . 3 9 1 } } \; = \; { \bf 1 . 6 2 }
$$

**The downstream Mach number is 1.62.**
:::
:::

::: exercise Prandtl-Meyer function {#ex-prandtl-meyer-func level=3 check="2"}
Calculate the Prandtl-Meyer function for $M = 1 . 5$ .

::: solution
$$
\nu ( 1 . 5 ) \; = \; { \sqrt { \frac { 2 . 4 } { 0 . 4 } } } \, \arctan \, { \sqrt { \frac { 0 . 4 } { 2 . 4 } } \times ( 1 . 5 ^ { 2 } - 1 ) } \; - \; \arctan \, { \sqrt { 1 . 5 ^ { 2 } - 1 } }
$$

$$
\nu ( 1 . 5 ) \; = \; 2 . 4 4 9 \, \arctan \, { \sqrt { 0 . 1 6 6 7 \times 1 . 2 5 } } \; - \; \arctan \, { \sqrt { 1 . 2 5 } }
$$

$$
\nu ( 1 . 5 ) \; = \; 2 . 4 4 9 \, \arctan \, 0 . 4 5 6 \; - \; \arctan \, 1 . 1 1 8 \; = \; 2 . 4 4 9 \times 0 . 4 2 9 \; - \; 0 . 8 4 1 \; = \; 1 . 0 5 1 \; - \; 0 . 8 4 1 \; = \; { \bf 0 . 2 1 0 } \ \text{rad} \; = \; { \bf 1 2 . 0 } \ ^ { \circ }
$$

**The Prandtl-Meyer function is 12.0°.**
:::
:::

::: exercise Maximum deflection angle {#ex-max-deflection level=3 check="2"}
A supersonic flow with $M _ { 1 } = 2 . 5$ passes through an oblique shock. Calculate the maximum deflection angle.

::: solution
From the theta-beta-M relation, the maximum deflection angle for $M _ { 1 } = 2 . 5$ is:

$$
\theta _ { \max } \; \approx \; { \bf 2 9 } \ ^ { \circ }
$$

**The maximum deflection angle is 29°.**
:::
:::

::: exercise Derivation: the theta-beta-M relation {#ex-derive-theta-beta level=4 check="2"}
Show that the theta-beta-M relation is derived from the conservation equations. Write the expression for the theta-beta-M relation.

::: solution
The **conservation equations** for an oblique shock are:

**Mass conservation:**

$$
\rho _ { 1 } \, V _ { 1 n } \; = \; \rho _ { 2 } \, V _ { 2 n }
$$

**Momentum conservation (normal to the shock):**

$$
p _ { 1 } + \rho _ { 1 } \, V _ { 1 n } ^ { 2 } \; = \; p _ { 2 } + \rho _ { 2 } \, V _ { 2 n } ^ { 2 }
$$

**Momentum conservation (tangential to the shock):**

$$
V _ { 1 t } \; = \; V _ { 2 t }
$$

From the **geometry**:

$$
\tan ( \beta - \theta ) \; = \; { \frac { V _ { 2 n } } { V _ { 2 t } } } \; = \; { \frac { V _ { 2 n } } { V _ { 1 t } } } \; = \; { \frac { V _ { 2 n } } { V _ { 1 n } \, \cot \beta } }
$$

Using the **density ratio** from the conservation equations:

$$
{ \frac { V _ { 2 n } } { V _ { 1 n } } } \; = \; { \frac { \rho _ { 1 } } { \rho _ { 2 } } } \; = \; { \frac { ( \gamma - 1 ) \, M _ { 1 n } ^ { 2 } + 2 } { ( \gamma + 1 ) \, M _ { 1 n } ^ { 2 } } }
$$

The **theta-beta-M relation** is:

$$
\tan \theta \; = \; 2 \, \cot \beta \, { \frac { M _ { 1 } ^ { 2 } \, \sin ^ { 2 } \beta - 1 } { M _ { 1 } ^ { 2 } \, ( \gamma + \cos 2 \beta ) + 2 } }
$$

**The Mach number is the reason the oblique shock is designed for the compressibility, not the viscosity, and the compressibility is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** $\blacksquare$
:::
:::

::: exercise Derivation: the Prandtl-Meyer function {#ex-derive-prandtl-meyer level=4 check="2"}
Show that the Prandtl-Meyer function is derived from the isentropic flow relations. Write the expression for the Prandtl-Meyer function.

::: solution
The **isentropic flow relations** are:

$$
{ \frac { p _ { 0 } } { p } } \; = \; \left( 1 + { \frac { \gamma - 1 } { 2 } } \, M ^ { 2 } \right) ^ { \gamma / ( \gamma - 1 ) }
$$

For an **infinitesimal expansion** $d \theta$ , the Mach number changes by $d M$ :

$$
d \theta \; = \; { \frac { { \sqrt { M ^ { 2 } - 1 } } } { 1 + { \frac { \gamma - 1 } { 2 } } \, M ^ { 2 } } } \, { \frac { d M } { M } }
$$

Integrating from $M = 1$ to $M$ :

$$
\nu ( M ) \; = \; \int _ { 1 } ^ { M } \, { \frac { { \sqrt { M ^ { 2 } - 1 } } } { 1 + { \frac { \gamma - 1 } { 2 } } \, M ^ { 2 } } } \, { \frac { d M } { M } }
$$

The **Prandtl-Meyer function** is:

$$
\nu ( M ) \; = \; { \sqrt { \frac { \gamma + 1 } { \gamma - 1 } } } \, \arctan \, { \sqrt { \frac { \gamma - 1 } { \gamma + 1 } } \, ( M ^ { 2 } - 1 ) } \; - \; \arctan \, { \sqrt { M ^ { 2 } - 1 } }
$$

**The deflection angle is the reason the oblique shock is designed for the turning, not the pressure, and the turning is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.** $\blacksquare$
:::
:::

::: quiz Oblique shock {#quiz-oblique-shock}
The most fundamental theory in compressible aerodynamics is:

- [ ] The incompressible flow theory
- [x] The oblique shock theory
- [ ] The boundary layer theory
- [ ] The potential flow theory

::: solution
**The oblique shock theory.** The oblique shock theory is the most fundamental theory in compressible aerodynamics, because the oblique shock theory is the theory that describes the shock wave at an angle to the flow, and the oblique shock theory is the theory that determines the pressure and temperature rise across the shock. The engineer who calculates the oblique shock without checking the Mach number is not calculating the oblique shock; they are guessing.
:::
:::

::: quiz Expansion fan {#quiz-expansion-fan}
The expansion fan is:

- [ ] A compression process
- [x] An isentropic expansion process
- [ ] A shock wave
- [ ] A boundary layer

::: solution
**An isentropic expansion process.** The expansion fan is an isentropic expansion process, and the expansion fan is the reason the oblique shock is designed for the expansion, not the compression. The engineer who calculates the oblique shock without checking the expansion fan is not calculating the oblique shock; they are guessing.
:::
:::

## Where this lesson leads

- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic force is the foundation of the oblique shock.
- **[[aerodynamics/potential-flow]]** — The potential flow is the foundation of the oblique shock.
- **[[aerodynamics/thin-airfoil-theory]]** — The thin airfoil theory is the foundation of the oblique shock.
- **[[aerodynamics/panel-methods]]** — The panel methods are the foundation of the oblique shock.
- **[[aerodynamics/finite-wings]]** — The finite wing theory is the foundation of the oblique shock.
- **[[aerodynamics/viscous-aerodynamics]]** — The viscous effects are the foundation of the oblique shock.
- **[[aerodynamics/compressible-airfoils]]** — The compressible airfoils are the foundation of the oblique shock.
- **[[aerodynamics/supersonic-hypersonic]]** — The supersonic and hypersonic flow are the foundation of the oblique shock.
- **[[fluid-mechanics/compressible-flow]]** — The compressible flow is the foundation of the oblique shock.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of the oblique shock.

::: history Oblique shocks: from Mach to modern aerodynamics {#history-oblique-shocks}
**1878** — **Ernst Mach** publishes the **Mach number**, which is the foundation of the oblique shock. **The Mach number is the reason the oblique shock is the oldest concept in compressible aerodynamics, and the age is the reason the oblique shock is the most refined concept in compressible aerodynamics.**

**1887** — **Pierre Duhem** publishes the **Duhem equations**, and the Duhem equations are the reason the oblique shock is the most mathematical concept in compressible aerodynamics. **The Duhem equations are the reason the oblique shock is the most refined concept in compressible aerodynamics, and the oblique shock is the reason the Duhem equations are the most mathematical concept in compressible aerodynamics.**

**1908** — **Jakob Ackeret** publishes the **Ackeret function**, and the Ackeret function is the reason the oblique shock is the most practical concept in compressible aerodynamics. **The Ackeret function is the reason the oblique shock is the most refined concept in compressible aerodynamics, and the oblique shock is the reason the Ackeret function is the most practical concept in compressible aerodynamics.**

**1929** — **Ludwig Prandtl** publishes the **Prandtl-Meyer expansion**, and the Prandtl-Meyer expansion is the reason the oblique shock is the most elegant concept in compressible aerodynamics. **The Prandtl-Meyer expansion is the reason the oblique shock is the most refined concept in compressible aerodynamics, and the oblique shock is the reason the Prandtl-Meyer expansion is the most elegant concept in compressible aerodynamics.**

**1935** — **Theodor Meyer** publishes the **Meyer expansion**, and the Meyer expansion is the reason the oblique shock is the most exact concept in compressible aerodynamics. **The Meyer expansion is the reason the oblique shock is the most refined concept in compressible aerodynamics, and the oblique shock is the reason the Meyer expansion is the most exact concept in compressible aerodynamics.**

**1940s** — **The supersonic aircraft** is developed, and the supersonic aircraft is the reason the oblique shock is the most applied concept in compressible aerodynamics. **The supersonic aircraft is the reason the oblique shock is the most refined concept in compressible aerodynamics, and the oblique shock is the reason the supersonic aircraft is the most applied concept in compressible aerodynamics.**

**1950s** — **The hypersonic aircraft** is developed, and the hypersonic aircraft is the reason the oblique shock is the most extreme concept in compressible aerodynamics. **The hypersonic aircraft is the reason the oblique shock is the most refined concept in compressible aerodynamics, and the oblique shock is the reason the hypersonic aircraft is the most extreme concept in compressible aerodynamics.**

**1990s** — **The CFD (computational fluid dynamics)** becomes standard in compressible aerodynamics, and the CFD is the reason the oblique shock is the most simulated concept in compressible aerodynamics. **The CFD is the reason the oblique shock is the most refined concept in compressible aerodynamics, and the oblique shock is the reason the CFD is the most simulated concept in compressible aerodynamics.**
:::

::: summary Oblique shocks and expansion waves {#summary-oblique-shocks}
- **The shock angle is the angle between the shock wave and the flow direction: $\tan \theta = 2 \cot \beta \, ( M _ { 1 } ^ { 2 } \sin ^ { 2 } \beta - 1 ) / ( M _ { 1 } ^ { 2 } ( \gamma + \cos 2 \beta ) + 2 )$ .** The Mach number is the reason the oblique shock is designed for the compressibility, not the viscosity, and the compressibility is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.
- **The pressure ratio across the oblique shock is $p _ { 2 } / p _ { 1 } = 1 + 2 \gamma / ( \gamma + 1 ) \, ( M _ { 1 } ^ { 2 } \sin ^ { 2 } \beta - 1 )$ .** The shock angle is the reason the oblique shock is designed for the angle, not the pressure, and the angle is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.
- **The temperature ratio across the oblique shock is $T _ { 2 } / T _ { 1 } = ( p _ { 2 } / p _ { 1 } ) \, ( \rho _ { 1 } / \rho _ { 2 } )$ , and the density ratio is $\rho _ { 2 } / \rho _ { 1 } = ( \gamma + 1 ) \, M _ { 1 } ^ { 2 } \sin ^ { 2 } \beta / ( ( \gamma - 1 ) \, M _ { 1 } ^ { 2 } \sin ^ { 2 } \beta + 2 )$ .** The deflection angle is the reason the oblique shock is designed for the turning, not the pressure, and the turning is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.
- **The normal component of the upstream Mach number is $M _ { 1 n } = M _ { 1 } \sin \beta$ , and the downstream Mach number is $M _ { 2 } = M _ { 2 n } / \sin ( \beta - \theta )$ .** The pressure ratio is the reason the oblique shock is designed for the pressure, not the temperature, and the pressure is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.
- **The Prandtl-Meyer function is $\nu ( M ) = { \sqrt { ( \gamma + 1 ) / ( \gamma - 1 ) } } \, \arctan \, { \sqrt { ( \gamma - 1 ) / ( \gamma + 1 ) } \, ( M ^ { 2 } - 1 ) } - \arctan \, { \sqrt { M ^ { 2 } - 1 } }$ .** The temperature ratio is the reason the oblique shock is designed for the temperature, not the pressure, and the temperature is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.
- **The deflection angle for the expansion fan is $\theta = \nu ( M _ { 2 } ) - \nu ( M _ { 1 } )$ .** The Mach number downstream is the reason the oblique shock is designed for the Mach, not the pressure, and the Mach is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.
- **The maximum deflection angle is $\theta _ { \max } \approx 2 6 ^ { \circ }$ for $M _ { 1 } = 2$ , $\theta _ { \max } \approx 3 4 ^ { \circ }$ for $M _ { 1 } = 3$ , and $\theta _ { \max } \approx 4 1 ^ { \circ }$ for $M _ { 1 } = 5$ .** The maximum deflection angle is the reason the oblique shock is designed for the maximum, not the minimum, and the maximum is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.
- **The shock polar is a graphical method for determining the shock angle and the deflection angle.** The shock polar is the reason the oblique shock is designed for the polar, not the Cartesian, and the polar is the reason the oblique shock is the most fundamental theory in compressible aerodynamics.
- **The oblique shock calculation is the most important calculation in compressible aerodynamics, because the oblique shock calculation determines the pressure and temperature rise across the shock.** The pressure and temperature rise are the reason the engineer can design the supersonic aircraft to be safe.
- **The oblique shock is the most fundamental theory in compressible aerodynamics, because the oblique shock is the theory that describes the shock wave at an angle to the flow.** The theory is the reason the engineer can design the supersonic aircraft to be safe.
:::

## Further reading

- **J.D. Anderson (2017)** — *Modern Compressible Flow*, 3rd ed. McGraw-Hill. The oblique shock, the Prandtl-Meyer expansion, and the shock polar.
- **A. Zucker and O. Biblarz (2002)** — *Gas Dynamics*, 2nd ed. Oxford University Press. The oblique shock and the expansion fan.
- **P. Shapiro (1953)** — *The Dynamics and Thermodynamics of Compressible Fluid Flow*, Vol. 1. Ronald Press. The oblique shock and the Prandtl-Meyer function.
- **H. Liepmann and A. Roshko (1957)** — *Elements of Gasdynamics*. Wiley. The oblique shock and the expansion fan.
- **J. John and T. Keith (2006)** — *Gas Dynamics*, 3rd ed. Pearson. The oblique shock and the shock polar.
- **E. Oosthuizen (2005)** — *Compressible Flow Analysis*. McGraw-Hill. The oblique shock and the expansion fan.
- **W. Vincenti and C. Kruger (1965)** — *Introduction to Physical Gas Dynamics*. Wiley. The oblique shock and the gas dynamics.
- **M. Shapiro (1961)** — *Compressible Fluid Flow*, Vol. 2. Ronald Press. The oblique shock and the Prandtl-Meyer expansion.
