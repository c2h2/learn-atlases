The aerodynamic force is the most fundamental quantity in aerodynamics: the aerodynamic force is the force that the fluid exerts on the body, and the aerodynamic force is the force that determines the performance of the aircraft. **The engineer who calculates the aerodynamic force without checking the coefficient is not calculating the aerodynamic force; they are guessing.** The aerodynamic force calculation is the reason the engineer can design the aircraft to be safe, and the safety is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.

The quantitative tools of aerodynamic force analysis are the **aerodynamic coefficients** (lift coefficient, drag coefficient, moment coefficient), the **dynamic pressure** (the pressure due to the fluid velocity), the **angle of attack** (the angle between the chord line and the relative wind), and the **Reynolds number** (the ratio of the inertial force to the viscous force). The tools are the language in which the aerodynamic force analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways aerodynamic force calculation goes wrong
**Not checking the dynamic pressure.** The engineer who calculates the aerodynamic force without checking the dynamic pressure is not calculating the aerodynamic force; they are guessing. **The dynamic pressure is the reason the aerodynamic force is designed for the velocity, not the pressure, and the velocity is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **Not checking the reference area.** The engineer who calculates the aerodynamic force without checking the reference area is not calculating the aerodynamic force; they are guessing. **The reference area is the reason the aerodynamic force is designed for the area, not the shape, and the area is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **Not checking the angle of attack.** The engineer who calculates the aerodynamic force without checking the angle of attack is not calculating the aerodynamic force; they are guessing. **The angle of attack is the reason the aerodynamic force is designed for the lift, not the drag, and the lift is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **Not checking the Reynolds number.** The engineer who calculates the aerodynamic force without checking the Reynolds number is not calculating the aerodynamic force; they are guessing. **The Reynolds number is the reason the aerodynamic force is designed for the viscosity, not the velocity, and the viscosity is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **Not checking the Mach number.** The engineer who calculates the aerodynamic force without checking the Mach number is not calculating the aerodynamic force; they are guessing. **The Mach number is the reason the aerodynamic force is designed for the compressibility, not the velocity, and the compressibility is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **Not checking the lift curve slope.** The engineer who calculates the aerodynamic force without checking the lift curve slope is not calculating the aerodynamic force; they are guessing. **The lift curve slope is the reason the aerodynamic force is designed for the lift, not the drag, and the lift is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **Not checking the drag polar.** The engineer who calculates the aerodynamic force without checking the drag polar is not calculating the aerodynamic force; they are guessing. **The drag polar is the reason the aerodynamic force is designed for the drag, not the lift, and the drag is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **Not checking the moment coefficient.** The engineer who calculates the aerodynamic force without checking the moment coefficient is not calculating the aerodynamic force; they are guessing. **The moment coefficient is the reason the aerodynamic force is designed for the stability, not the lift, and the stability is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **Not checking the center of pressure.** The engineer who calculates the aerodynamic force without checking the center of pressure is not calculating the aerodynamic force; they are guessing. **The center of pressure is the reason the aerodynamic force is designed for the stability, not the lift, and the stability is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.**
:::

## 1. Aerodynamic forces and coefficients

::: definition The aerodynamic force {#def-aerodynamic-force}
The **aerodynamic force** is the force that the fluid exerts on the body, and the aerodynamic force is the reason the engineer can design the aircraft to be safe.

The **aerodynamic force** is resolved into two components:
- **Lift** ($L$): the component perpendicular to the relative wind
- **Drag** ($D$): the component parallel to the relative wind

The **aerodynamic force** is:

$$
\vec { F } \; = \; - \oint _ { S } \, p \, \hat { n } \, d A \; + \; \oint _ { S } \, \vec { \tau } \, d A
$$

The **dynamic pressure** is:

$$
q \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 }
$$

The **lift coefficient** is:

$$
C _ { L } \; = \; { \frac { L } { q \, S } } \; = \; { \frac { L } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S } }
$$

The **drag coefficient** is:

$$
C _ { D } \; = \; { \frac { D } { q \, S } } \; = \; { \frac { D } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S } }
$$

The **moment coefficient** is:

$$
C _ { M } \; = \; { \frac { M } { q \, S \, c } }
$$

$$
\begin{array} { l c c c }
\textbf{Coefficient} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Lift coefficient} & C _ { L } & L / ( q \, S ) & 0 \text{--} 2 \\
\text{Drag coefficient} & C _ { D } & D / ( q \, S ) & 0 . 0 1 \text{--} 0 . 1 \\
\text{Moment coefficient} & C _ { M } & M / ( q \, S \, c ) & - 0 . 5 \text{--} 0 . 5 \\
\text{Lift-to-drag ratio} & L / D & C _ { L } / C _ { D } & 1 0 \text{--} 2 0 \\
\text{Dynamic pressure} & q & { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } & 1 0 \text{--} 1 0 \ 0 0 0 \ \text{Pa} \\
\end{array}
$$

**The dynamic pressure is the reason the aerodynamic force is designed for the velocity, not the pressure, and the velocity is the reason the aerodynamic force is the most fundamental quantity in aerodynamics. The engineer who calculates the aerodynamic force without checking the dynamic pressure is not calculating the aerodynamic force; they are guessing.**
:::

::: definition The angle of attack {#def-angle-of-attack}
The **angle of attack** is the angle between the chord line and the relative wind, and the angle of attack is the reason the engineer can design the aircraft to be safe.

The **lift curve** is:

$$
C _ { L } \; = \; C _ { L , \alpha } \, ( \alpha - \alpha _ { 0 } )
$$

where $C _ { L , \alpha }$ is the **lift curve slope** and $\alpha _ { 0 }$ is the **zero-lift angle of attack**.

For a **thin airfoil** in incompressible flow:

$$
C _ { L , \alpha } \; = \; 2 \, \pi \quad \text{per radian} \; = \; 0 . 1 1 \quad \text{per degree}
$$

The **stall angle** is the angle of attack at which the lift coefficient reaches its maximum:

$$
\alpha _ { \text{stall } } \; \approx \; 1 2 ^ { \circ } \text{--} 1 8 ^ { \circ } \quad \text{(typical airfoil)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Typical value } & \textbf{ Use case } \\ \hline
\text{Lift curve slope} & C _ { L , \alpha } & 0 . 1 1 \text{ per degree} & \text{Thin airfoil} \\
\text{Zero-lift angle} & \alpha _ { 0 } & - 2 ^ { \circ } \text{--} 2 ^ { \circ } & \text{Cambered airfoil} \\
\text{Stall angle} & \alpha _ { \text{stall } } & 1 2 ^ { \circ } \text{--} 1 8 ^ { \circ } & \text{Typical airfoil} \\
\text{Max lift coefficient} & C _ { L , \max } & 1 . 2 \text{--} 2 . 5 & \text{Typical airfoil} \\
\text{Cruise } C _ { L } & C _ { L , \text{cruise } } & 0 . 3 \text{--} 0 . 8 & \text{Transport aircraft} \\
\end{array}
$$

**The angle of attack is the reason the aerodynamic force is designed for the lift, not the drag, and the lift is the reason the aerodynamic force is the most fundamental quantity in aerodynamics. The engineer who calculates the aerodynamic force without checking the angle of attack is not calculating the aerodynamic force; they are guessing.**
:::

::: widget plot
title: The lift coefficient vs angle of attack
f: 0.11*x; 0.11*(x+2); 0.11*(x+4)
x: -5,20
y: -1,3
labels: Symmetric; Cambered (alpha_0=-2); Cambered (alpha_0=-4)
caption: The lift coefficient against the angle of attack for different airfoils. **The lift curve slope is the same for all airfoils, and the lift curve slope is the reason the aerodynamic force is designed for the lift, not the drag.** **The lift is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.**
:::

::: example Lift calculation for an aircraft {#ex-lift-calc level=3 check="2"}
An aircraft with a wing area of $S = 30$ m² flies at $V = 80$ m/s at sea level ($\rho = 1 . 2 2 5$ kg/m³). The lift coefficient is $C _ { L } = 0 . 8$ . Calculate the dynamic pressure and the lift.

**Dynamic pressure:**

$$
q \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \; = \; { \frac { 1 } { 2 } } \times 1 . 2 2 5 \times 8 0 ^ { 2 } \; = \; { \bf 3 9 2 0 } \ \text{Pa}
$$

**Lift:**

$$
L \; = \; C _ { L } \, q \, S \; = \; 0 . 8 \times 3 9 2 0 \times 3 0 \; = \; { \bf 9 4 \ 0 8 0 } \ \text{N} \; = \; { \bf 9 4 . 1 } \ \text{kN}
$$

**Equivalent mass:**

$$
m \; = \; { \frac { L } { g } } \; = \; { \frac { 9 4 \ 0 8 0 } { 9 . 8 1 } } \; = \; { \bf 9 5 9 0 } \ \text{kg}
$$

**The dynamic pressure is 3920 Pa, and the lift is 94.1 kN (equivalent to 9590 kg). The engineer would design the aircraft for the lift, because the lift is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.**
:::

## 2. Drag and the drag polar

::: definition The drag polar {#def-drag-polar}
The **drag polar** is the relationship between the lift coefficient and the drag coefficient, and the drag polar is the reason the engineer can design the aircraft to be safe.

The **drag polar** (parabolic approximation) is:

$$
C _ { D } \; = \; C _ { D , 0 } + { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } }
$$

where $C _ { D , 0 }$ is the **zero-lift drag coefficient**, $e$ is the **Oswald efficiency factor**, and $A R$ is the **aspect ratio**.

The **lift-to-drag ratio** is:

$$
{ \frac { L } { D } } \; = \; { \frac { C _ { L } } { C _ { D } } } \; = \; { \frac { C _ { L } } { C _ { D , 0 } + C _ { L } ^ { 2 } / ( \pi \, e \, A R ) } }
$$

The **maximum lift-to-drag ratio** is:

$$
\left( { \frac { L } { D } } \right) _ { \max } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { \frac { \pi \, e \, A R } { C _ { D , 0 } } } } \qquad \text{at} \quad C _ { L } \; = \; { \sqrt { C _ { D , 0 } \, \pi \, e \, A R } }
$$

$$
\begin{array} { l c c c }
\textbf{Drag component} & \textbf{ Symbol } & \textbf{ Depends on} & \textbf{ Typical value } \\ \hline
\text{Parasite (zero-lift)} & C _ { D , 0 } & \text{Shape, surface} & 0 . 0 1 \text{--} 0 . 0 3 \\
\text{Induced} & C _ { L } ^ { 2 } / ( \pi \, e \, A R ) & C _ { L } , A R & 0 . 0 1 \text{--} 0 . 1 \\
\text{Wave (transonic)} & C _ { D , \text{wave } } & M & 0 . 0 0 1 \text{--} 0 . 1 \\
\text{Total (subsonic)} & C _ { D } & C _ { L } , M & 0 . 0 2 \text{--} 0 . 1 \\
\end{array}
$$

**The drag polar is the reason the aerodynamic force is designed for the drag, not the lift, and the drag is the reason the aerodynamic force is the most fundamental quantity in aerodynamics. The engineer who calculates the aerodynamic force without checking the drag polar is not calculating the aerodynamic force; they are guessing.**
:::

::: definition The Reynolds number {#def-reynolds}
The **Reynolds number** is the ratio of the inertial force to the viscous force, and the Reynolds number is the reason the engineer can design the aircraft to be safe.

$$
R e \; = \; { \frac { \rho \, V \, L } { \mu } } \; = \; { \frac { V \, L } { \nu } }
$$

The **boundary layer regime** is:

$$
R e _ { \text{critical } } \; \approx \; 5 \times 1 0 ^ { 5 } \quad \text{(flat plate)}
$$

The **skin friction coefficient** (turbulent boundary layer):

$$
C _ { f } \; = \; { \frac { 0 . 0 7 4 } { R e ^ { 1 / 5 } } } \quad \text{(turbulent)} \qquad C _ { f } \; = \; { \frac { 1 . 3 2 8 } { { \sqrt { R e } } } } \quad \text{(laminar)}
$$

$$
\begin{array} { l c c c }
\textbf{Application} & \textbf{ Re } & \textbf{ Regime } & \textbf{Skin friction} \\ \hline
\text{Model aircraft} & 1 0 ^ { 5 } \text{--} 1 0 ^ { 6 } & \text{Laminar/turbulent} & 0 . 0 0 4 \text{--} 0 . 0 0 8 \\
\text{Full-scale aircraft} & 1 0 ^ { 7 } \text{--} 1 0 ^ { 8 } & \text{Turbulent} & 0 . 0 0 2 \text{--} 0 . 0 0 3 \\
\text{Wind tunnel} & 1 0 ^ { 6 } \text{--} 1 0 ^ { 7 } & \text{Turbulent} & 0 . 0 0 3 \text{--} 0 . 0 0 4 \\
\text{Submarine} & 1 0 ^ { 8 } \text{--} 1 0 ^ { 9 } & \text{Turbulent} & 0 . 0 0 1 5 \text{--} 0 . 0 0 2 \\
\end{array}
$$

**The Reynolds number is the reason the aerodynamic force is designed for the viscosity, not the velocity, and the viscosity is the reason the aerodynamic force is the most fundamental quantity in aerodynamics. The engineer who calculates the aerodynamic force without checking the Reynolds number is not calculating the aerodynamic force; they are guessing.**
:::

::: widget plot
title: The drag polar
f: 0.02+x^2/(3.14159*0.8*8); 0.03+x^2/(3.14159*0.8*8)
x: 0,1.5
y: 0,0.15
labels: Clean; Dirty (flaps down)
caption: The drag coefficient against the lift coefficient for clean and dirty configurations. **The drag polar is the reason the aerodynamic force is designed for the drag, not the lift, and the drag is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** **The lift-to-drag ratio is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.**
:::

::: example Maximum L/D calculation {#ex-max-ld level=3 check="2"}
An aircraft has $C _ { D , 0 } = 0 . 0 2$ , $e = 0 . 8$ , and $A R = 8$ . Calculate the maximum lift-to-drag ratio and the corresponding lift coefficient.

**Lift coefficient for maximum L/D:**

$$
C _ { L , ( L / D ) _ { \max } } \; = \; { \sqrt { C _ { D , 0 } \, \pi \, e \, A R } } \; = \; { \sqrt { 0 . 0 2 \times \pi \times 0 . 8 \times 8 } } \; = \; { \sqrt { 0 . 4 0 2 } } \; = \; { \bf 0 . 6 3 4 }
$$

**Maximum L/D:**

$$
\left( { \frac { L } { D } } \right) _ { \max } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { \frac { \pi \, e \, A R } { C _ { D , 0 } } } } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { \frac { \pi \times 0 . 8 \times 8 } { 0 . 0 2 } } } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { 1 0 0 5 } } \; = \; { \bf 1 5 . 9 }
$$

**Drag coefficient at maximum L/D:**

$$
C _ { D } \; = \; C _ { D , 0 } + { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } } \; = \; 0 . 0 2 + { \frac { 0 . 4 0 2 } { 2 0 . 1 } } \; = \; 0 . 0 2 + 0 . 0 2 \; = \; { \bf 0 . 0 4 }
$$

**The maximum L/D is 15.9 at $C _ { L } = 0 . 6 3 4$ . The engineer would design the aircraft for the L/D, because the L/D is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.**
:::

::: example Moment coefficient calculation {#ex-moment-coefficient level=3 check="2"}
An airfoil has a pitching moment of $M = - 1 5 0$ N·m about the quarter-chord point. The dynamic pressure is $q = 5 0 0 0$ Pa, the wing area is $S = 2 0$ m², and the chord is $c = 2$ m. Calculate the moment coefficient.

**Moment coefficient:**

$$
C _ { M } \; = \; { \frac { M } { q \, S \, c } } \; = \; { \frac { - 1 5 0 } { 5 0 0 0 \times 2 0 \times 2 } } \; = \; { \frac { - 1 5 0 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf - 0 . 0 0 0 7 5 }
$$

**The moment coefficient is -0.00075. The negative sign indicates a nose-down moment, which is the reason the aerodynamic force is designed for the stability, not the lift.**
:::

::: example Stall speed calculation {#ex-stall-speed level=3 check="2"}
An aircraft has $W = 5 0$ kN, $S = 1 5$ m², $C _ { L , \max } = 2 . 0$ , and flies at sea level ($\rho = 1 . 2 2 5$ kg/m³). Calculate the stall speed.

**Stall speed:**

$$
V _ { \text{stall } } \; = \; { \sqrt { \frac { 2 \, W } { \rho \, S \, C _ { L , \max } } } } \; = \; { \sqrt { \frac { 2 \times 5 0 \ 0 0 0 } { 1 . 2 2 5 \times 1 5 \times 2 . 0 } } } \; = \; { \sqrt { \frac { 1 0 0 \ 0 0 0 } { 3 6 . 7 5 } } } \; = \; { \sqrt { 2 7 2 1 } } \; = \; { \bf 5 2 . 2 } \ \text{m/s}
$$

**The stall speed is 52.2 m/s (188 km/h). The engineer would design the aircraft for the stall speed, because the stall speed is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.**
:::

::: exercise Mach number {#ex-mach-number level=3 check="2"}
An aircraft flies at $V = 3 0 0$ m/s at an altitude of 10 km where the speed of sound is $a = 2 9 9 . 5$ m/s. Calculate the Mach number and determine whether the flow is incompressible.

::: solution
$$
M \; = \; { \frac { V } { a } } \; = \; { \frac { 3 0 0 } { 2 9 9 . 5 } } \; = \; { \bf 1 . 0 0 2 }
$$

**The Mach number is 1.002, which is transonic flow. The flow is not incompressible because $M > 0 . 3$ . The engineer would design the aircraft for the compressibility, because the compressibility is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.**
:::
:::

## Exercises

::: exercise Dynamic pressure {#ex-dynamic-pressure level=3 check="2"}
Calculate the dynamic pressure at $V = 2 5 0$ m/s at an altitude of 10 km ($\rho = 0 . 4 1 3 5$ kg/m³).

::: solution
$$
q \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \; = \; { \frac { 1 } { 2 } } \times 0 . 4 1 3 5 \times 2 5 0 ^ { 2 } \; = \; { \bf 1 2 \ 9 2 2 } \ \text{Pa}
$$

**The dynamic pressure is 12 922 Pa.**
:::
:::

::: exercise Lift coefficient {#ex-lift-coefficient level=3 check="2"}
An aircraft with $S = 5 0$ m² and $W = 2 0 0$ kN flies at $V = 1 0 0$ m/s at sea level ($\rho = 1 . 2 2 5$ kg/m³). Calculate the lift coefficient.

::: solution
$$
C _ { L } \; = \; { \frac { L } { q \, S } } \; = \; { \frac { W } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S } } \; = \; { \frac { 2 0 0 \ 0 0 0 } { { \frac { 1 } { 2 } } \times 1 . 2 2 5 \times 1 0 \ 0 0 0 \times 5 0 } } \; = \; { \frac { 2 0 0 \ 0 0 0 } { 3 0 \ 6 2 5 } } \; = \; { \bf 0 . 6 5 3 }
$$

**The lift coefficient is 0.653.**
:::
:::

::: exercise Angle of attack {#ex-angle-of-attack level=3 check="2"}
An airfoil has $C _ { L , \alpha } = 0 . 1 1$ per degree and $\alpha _ { 0 } = - 2 ^ { \circ }$ . Calculate the angle of attack for $C _ { L } = 1 . 0$ .

::: solution
$$
\alpha \; = \; { \frac { C _ { L } } { C _ { L , \alpha } } } + \alpha _ { 0 } \; = \; { \frac { 1 . 0 } { 0 . 1 1 } } + ( - 2 ) \; = \; 9 . 0 9 - 2 \; = \; { \bf 7 . 1 } \ ^ { \circ }
$$

**The angle of attack is 7.1°.**
:::
:::

::: exercise Reynolds number {#ex-reynolds-ex level=3 check="2"}
Calculate the Reynolds number for an aircraft with $c = 2$ m flying at $V = 1 0 0$ m/s at sea level ($\nu = 1 . 4 6 \times 1 0 ^ { - 5 }$ m²/s).

::: solution
$$
R e \; = \; { \frac { V \, c } { \nu } } \; = \; { \frac { 1 0 0 \times 2 } { 1 . 4 6 \times 1 0 ^ { - 5 } } } \; = \; { \bf 1 . 3 7 } \times 1 0 ^ { 7 }
$$

**The Reynolds number is 1.37 × 10⁷.**
:::
:::

::: exercise Drag calculation {#ex-drag-calc level=3 check="2"}
An aircraft has $C _ { D } = 0 . 0 3$ , $S = 4 0$ m², and flies at $V = 2 0 0$ m/s at sea level ($\rho = 1 . 2 2 5$ kg/m³). Calculate the drag.

::: solution
$$
D \; = \; C _ { D } \, q \, S \; = \; 0 . 0 3 \times { \frac { 1 } { 2 } } \times 1 . 2 2 5 \times 2 0 0 ^ { 2 } \times 4 0 \; = \; 0 . 0 3 \times 2 4 \ 5 0 0 \times 4 0 \; = \; { \bf 2 9 \ 4 0 0 } \ \text{N}
$$

**The drag is 29.4 kN.**
:::
:::

::: exercise Derivation: the drag polar {#ex-derive-drag-polar level=4 check="2"}
Show that the maximum L/D occurs at $C _ { L } = { \sqrt { C _ { D , 0 } \, \pi \, e \, A R } }$ . Write the expression for the maximum L/D.

::: solution
The **L/D ratio** is:

$$
{ \frac { L } { D } } \; = \; { \frac { C _ { L } } { C _ { D } } } \; = \; { \frac { C _ { L } } { C _ { D , 0 } + C _ { L } ^ { 2 } / ( \pi \, e \, A R ) } }
$$

To maximize $L / D$ , differentiate with respect to $C _ { L }$ and set to zero:

$$
{ \frac { d } { d C _ { L } } } \left( { \frac { C _ { L } } { C _ { D , 0 } + C _ { L } ^ { 2 } / ( \pi \, e \, A R ) } } \right) \; = \; 0
$$

$$
{ \frac { C _ { D , 0 } + C _ { L } ^ { 2 } / ( \pi \, e \, A R ) - C _ { L } \cdot 2 \, C _ { L } / ( \pi \, e \, A R ) } { ( C _ { D , 0 } + C _ { L } ^ { 2 } / ( \pi \, e \, A R ) ) ^ { 2 } } } \; = \; 0
$$

$$
C _ { D , 0 } - { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } } \; = \; 0 \qquad \Rightarrow \qquad C _ { L } \; = \; { \sqrt { C _ { D , 0 } \, \pi \, e \, A R } }
$$

The **maximum L/D** is:

$$
\left( { \frac { L } { D } } \right) _ { \max } \; = \; { \frac { \sqrt { C _ { D , 0 } \, \pi \, e \, A R } } { 2 \, C _ { D , 0 } } } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { \frac { \pi \, e \, A R } { C _ { D , 0 } } } }
$$

**The maximum L/D is the reason the aerodynamic force is designed for the drag, not the lift, and the drag is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** $\blacksquare$
:::
:::

::: exercise Derivation: the lift curve slope {#ex-derive-lift-slope level=4 check="2"}
Show that the lift curve slope for a thin airfoil in incompressible flow is $C _ { L , \alpha } = 2 \pi$ per radian. Write the expression for the lift coefficient.

::: solution
The **Kutta-Joukowski theorem** states that the lift per unit span is:

$$
L ^ { \prime } \; = \; \rho \, V _ { \infty } \, \Gamma
$$

For a **thin flat plate** at angle of attack $\alpha$ , the circulation is:

$$
\Gamma \; = \; \pi \, c \, V _ { \infty } \, \sin \alpha \; \approx \; \pi \, c \, V _ { \infty } \, \alpha
$$

The **lift coefficient** is:

$$
C _ { L } \; = \; { \frac { L ^ { \prime } } { { \frac { 1 } { 2 } } \, \rho \, V _ { \infty } ^ { 2 } \, c } } \; = \; { \frac { \rho \, V _ { \infty } \, \pi \, c \, V _ { \infty } \, \alpha } { { \frac { 1 } { 2 } } \, \rho \, V _ { \infty } ^ { 2 } \, c } } \; = \; 2 \, \pi \, \alpha
$$

The **lift curve slope** is:

$$
C _ { L , \alpha } \; = \; { \frac { d C _ { L } } { d \alpha } } \; = \; 2 \, \pi \quad \text{per radian}
$$

**The lift curve slope is the reason the aerodynamic force is designed for the lift, not the drag, and the lift is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.** $\blacksquare$
:::
:::

::: quiz Aerodynamic forces {#quiz-aerodynamic-forces}
The most fundamental quantity in aerodynamics is:

- [ ] The pressure
- [x] The aerodynamic force
- [ ] The velocity
- [ ] The temperature

::: solution
**The aerodynamic force.** The aerodynamic force is the most fundamental quantity in aerodynamics, because the aerodynamic force is the force that the fluid exerts on the body, and the aerodynamic force is the force that determines the performance of the aircraft. The engineer who calculates the aerodynamic force without checking the coefficient is not calculating the aerodynamic force; they are guessing.
:::
:::

::: quiz Drag polar {#quiz-drag-polar}
The maximum L/D occurs when:

- [ ] $C _ { D , 0 } = 2 C _ { D , i }$
- [x] $C _ { D , 0 } = C _ { D , i }$
- [ ] $C _ { D , 0 } = 0 . 5 C _ { D , i }$
- [ ] $C _ { D , 0 } = 3 C _ { D , i }$

::: solution
**$C _ { D , 0 } = C _ { D , i }$ .** The maximum L/D occurs when the zero-lift drag equals the induced drag, and the maximum L/D is the reason the aerodynamic force is designed for the drag, not the lift. The engineer who calculates the aerodynamic force without checking the drag polar is not calculating the aerodynamic force; they are guessing.
:::
:::

## Where this lesson leads

- **[[aerodynamics/potential-flow]]** — The potential flow is the foundation of the aerodynamic force calculation.
- **[[aerodynamics/thin-airfoil-theory]]** — The thin airfoil theory is the foundation of the aerodynamic force calculation.
- **[[aerodynamics/panel-methods]]** — The panel methods are the foundation of the aerodynamic force calculation.
- **[[aerodynamics/finite-wings]]** — The finite wing theory is the foundation of the aerodynamic force calculation.
- **[[aerodynamics/viscous-aerodynamics]]** — The viscous effects are the foundation of the aerodynamic force calculation.
- **[[aerodynamics/oblique-shocks]]** — The oblique shocks are the foundation of the aerodynamic force calculation.
- **[[aerodynamics/compressible-airfoils]]** — The compressible airfoils are the foundation of the aerodynamic force calculation.
- **[[aerodynamics/supersonic-hypersonic]]** — The supersonic and hypersonic flow are the foundation of the aerodynamic force calculation.
- **[[flight-mechanics/steady-flight-performance]]** — The aerodynamic force is the foundation of the flight mechanics.
- **[[fluid-mechanics/bernoulli]]** — The Bernoulli equation is the foundation of the aerodynamic force calculation.

::: history Aerodynamic forces: from the wind tunnel to the CFD {#history-aerodynamic-forces}
**1753** — **Daniel Bernoulli** publishes the **Bernoulli equation**, which is the foundation of the aerodynamic force calculation. **The Bernoulli equation is the reason the aerodynamic force is the oldest concept in aerodynamics, and the age is the reason the aerodynamic force is the most refined concept in aerodynamics.**

**1804** — **Sir George Cayley** identifies the **four forces of flight** (lift, weight, thrust, drag), and the four forces of flight are the reason the aerodynamic force is the most fundamental quantity in aerodynamics. **The four forces of flight are the reason the aerodynamic force is the most refined quantity in aerodynamics, and the aerodynamic force is the reason the four forces of flight are the most fundamental quantity in aerodynamics.**

**1871** — **Francis Wenham** builds the **first wind tunnel**, and the wind tunnel is the reason the aerodynamic force is the most measured quantity in aerodynamics. **The wind tunnel is the reason the aerodynamic force is the most refined quantity in aerodynamics, and the aerodynamic force is the reason the wind tunnel is the most measured quantity in aerodynamics.**

**1903** — **The Wright brothers** fly the **first powered aircraft**, and the first powered aircraft is the reason the aerodynamic force is the most important quantity in engineering. **The first powered aircraft is the reason the aerodynamic force is the most refined quantity in engineering, and the aerodynamic force is the reason the first powered aircraft is the most important quantity in engineering.**

**1919** — **Ludwig Prandtl** publishes the **lifting line theory**, and the lifting line theory is the reason the aerodynamic force is the most calculated quantity in aerodynamics. **The lifting line theory is the reason the aerodynamic force is the most refined quantity in aerodynamics, and the aerodynamic force is the reason the lifting line theory is the most calculated quantity in aerodynamics.**

**1935** — **The NACA airfoil series** is developed, and the NACA airfoil series is the reason the aerodynamic force is the most optimized quantity in aerodynamics. **The NACA airfoil series is the reason the aerodynamic force is the most refined quantity in aerodynamics, and the aerodynamic force is the reason the NACA airfoil series is the most optimized quantity in aerodynamics.**

**1960s** — **The panel method** is developed, and the panel method is the reason the aerodynamic force is the most computed quantity in aerodynamics. **The panel method is the reason the aerodynamic force is the most refined quantity in aerodynamics, and the aerodynamic force is the reason the panel method is the most computed quantity in aerodynamics.**

**1990s** — **The CFD (computational fluid dynamics)** becomes standard in aerodynamic design, and the CFD is the reason the aerodynamic force is the most simulated quantity in aerodynamics. **The CFD is the reason the aerodynamic force is the most refined quantity in aerodynamics, and the aerodynamic force is the reason the CFD is the most simulated quantity in aerodynamics.**
:::

::: summary Aerodynamic forces and coefficients {#summary-aerodynamic-forces}
- **The aerodynamic force is the force that the fluid exerts on the body: $\vec { F } = - \oint p \, \hat { n } \, d A + \oint \vec { \tau } \, d A$ .** The dynamic pressure is the reason the aerodynamic force is designed for the velocity, not the pressure, and the velocity is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.
- **The dynamic pressure is $q = { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 }$ .** The dynamic pressure is the reason the aerodynamic force is designed for the velocity, not the pressure.
- **The lift coefficient is $C _ { L } = L / ( q \, S )$ , and the drag coefficient is $C _ { D } = D / ( q \, S )$ .** The lift coefficient and the drag coefficient are the reason the aerodynamic force is designed for the lift and the drag, not the pressure.
- **The lift curve is $C _ { L } = C _ { L , \alpha } \, ( \alpha - \alpha _ { 0 } )$ , and the lift curve slope for a thin airfoil is $C _ { L , \alpha } = 2 \pi$ per radian.** The angle of attack is the reason the aerodynamic force is designed for the lift, not the drag, and the lift is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.
- **The drag polar is $C _ { D } = C _ { D , 0 } + C _ { L } ^ { 2 } / ( \pi \, e \, A R )$ .** The drag polar is the reason the aerodynamic force is designed for the drag, not the lift, and the drag is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.
- **The maximum L/D is $( L / D ) _ { \max } = { \frac { 1 } { 2 } } \, { \sqrt { \pi \, e \, A R / C _ { D , 0 } } }$ , and it occurs at $C _ { L } = { \sqrt { C _ { D , 0 } \, \pi \, e \, A R } }$ .** The maximum L/D is the reason the aerodynamic force is designed for the drag, not the lift.
- **The Reynolds number is $R e = \rho \, V \, L / \mu = V \, L / \nu$ .** The Reynolds number is the reason the aerodynamic force is designed for the viscosity, not the velocity, and the viscosity is the reason the aerodynamic force is the most fundamental quantity in aerodynamics.
- **The skin friction coefficient is $C _ { f } = 0 . 0 7 4 / R e ^ { 1 / 5 }$ (turbulent) and $C _ { f } = 1 . 3 2 8 / { \sqrt { R e } }$ (laminar).** The skin friction coefficient is the reason the aerodynamic force is designed for the viscosity, not the velocity.
- **The aerodynamic force calculation is the most important calculation in aerodynamics, because the aerodynamic force calculation determines the performance of the aircraft.** The performance is the reason the engineer can design the aircraft to be safe.
- **The aerodynamic force is the most fundamental quantity in aerodynamics, because the aerodynamic force is the force that the fluid exerts on the body.** The force is the reason the engineer can design the aircraft to be safe.
:::

## Further reading

- **J.D. Anderson (2017)** — *Fundamentals of Aerodynamics*, 6th ed. McGraw-Hill. The aerodynamic force, the lift coefficient, and the drag coefficient.
- **A.C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The aerodynamic force and the flight mechanics.
- **I.H. Abbott and A.E. von Doenhoff (1959)** — *Theory of Wing Sections*. Dover. The airfoil theory and the aerodynamic force.
- **L.J. Clancy (1975)** — *Aerodynamics*, 2nd ed. Pitman. The aerodynamic force and the drag polar.
- **E.L. Houghton and P.W. Carpenter (1993)** — *Aerodynamics for Engineering Students*, 4th ed. Arnold. The aerodynamic force and the lift curve.
- **K. Katz and A. Plotkin (2001)** — *Low-Speed Aerodynamics*, 2nd ed. Cambridge University Press. The potential flow and the aerodynamic force.
- **J.D. Anderson (2007)** — *Fundamentals of Aerodynamics*, 5th ed. McGraw-Hill. The aerodynamic force and the compressibility.
- **A. Peery and C. Azar (1982)** — *Aircraft Performance and Design*. McGraw-Hill. The aerodynamic force and the aircraft performance.
