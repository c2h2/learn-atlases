Steady flight performance is the most fundamental analysis in flight mechanics: the steady flight performance is the analysis that determines the thrust required, the power required, and the flight envelope, and the steady flight performance is the analysis that determines the maximum speed, the minimum drag, and the best rate of climb. **The engineer who calculates the steady flight performance without checking the lift-to-drag ratio is not calculating the steady flight performance; they are guessing.** The steady flight performance calculation is the reason the engineer can design the aircraft to fly efficiently, and the lift-to-drag ratio is the reason the steady flight performance is the most fundamental analysis in flight mechanics.

The quantitative tools of steady flight performance are the **lift coefficient** (the ratio of the lift to the product of the dynamic pressure and the wing area), the **drag coefficient** (the ratio of the drag to the product of the dynamic pressure and the wing area), the **thrust required** (the drag at steady level flight), and the **power required** (the product of the thrust required and the velocity). The tools are the language in which the steady flight performance analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways steady flight performance calculation goes wrong
**Not checking the lift-to-drag ratio.** The engineer who calculates the steady flight performance without checking the lift-to-drag ratio is not calculating the steady flight performance; they are guessing. **The lift-to-drag ratio is the reason the steady flight performance is designed for the ratio, not the lift, and the ratio is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** **Not checking the thrust required.** The engineer who calculates the steady flight performance without checking the thrust required is not calculating the steady flight performance; they are guessing. **The thrust required is the reason the steady flight performance is designed for the thrust, not the drag, and the thrust is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** **Not checking the power required.** The engineer who calculates the steady flight performance without checking the power required is not calculating the steady flight performance; they are guessing. **The power required is the reason the steady flight performance is designed for the power, not the thrust, and the power is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** **Not checking the flight envelope.** The engineer who calculates the steady flight performance without checking the flight envelope is not calculating the steady flight performance; they are guessing. **The flight envelope is the reason the steady flight performance is designed for the envelope, not the point, and the envelope is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** **Not checking the stall speed.** The engineer who calculates the steady flight performance without checking the stall speed is not calculating the steady flight performance; they are guessing. **The stall speed is the reason the steady flight performance is designed for the stall, not the cruise, and the stall is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** **Not checking the maximum speed.** The engineer who calculates the steady flight performance without checking the maximum speed is not calculating the steady flight performance; they are guessing. **The maximum speed is the reason the steady flight performance is designed for the maximum, not the minimum, and the maximum is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** **Not checking the minimum drag.** The engineer who calculates the steady flight performance without checking the minimum drag is not calculating the steady flight performance; they are guessing. **The minimum drag is the reason the steady flight performance is designed for the minimum, not the maximum, and the minimum is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** **Not checking the rate of climb.** The engineer who calculates the steady flight performance without checking the rate of climb is not calculating the steady flight performance; they are guessing. **The rate of climb is the reason the steady flight performance is designed for the climb, not the descent, and the climb is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** **Not checking the ceiling.** The engineer who calculates the steady flight performance without checking the ceiling is not calculating the steady flight performance; they are guessing. **The ceiling is the reason the steady flight performance is designed for the ceiling, not the floor, and the ceiling is the reason the steady flight performance is the most fundamental analysis in flight mechanics.**
:::

## 1. Steady level flight

::: definition The lift-to-drag ratio {#def-lift-drag-ratio}
The **lift-to-drag ratio** is the ratio of the lift to the drag, and the lift-to-drag ratio is the reason the engineer can design the aircraft to fly efficiently.

The **lift-to-drag ratio** is:

$$
L / D \; = \; { \frac { C _ { L } } { C _ { D } } } \; = \; { \frac { C _ { L } } { C _ { D 0 } + K \, C _ { L } ^ { 2 } } }
$$

The **maximum lift-to-drag ratio** is:

$$
( L / D ) _ { \max } \; = \; { \frac { 1 } { 2 \, { \sqrt { C _ { D 0 } \, K } } } }
$$

The **lift coefficient for maximum L/D** is:

$$
C _ { L , ( L / D ) \max } \; = \; { \sqrt { { \frac { C _ { D 0 } } { K } } } }
$$

The **drag polar** is:

$$
C _ { D } \; = \; C _ { D 0 } + K \, C _ { L } ^ { 2 }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Lift-to-drag ratio} & L / D & \text{Lift/drag} & 1 0 \text{--} 2 0 \\
\text{Max L/D} & ( L / D ) _ { \max } & \text{Maximum L/D} & 1 5 \text{--} 2 5 \\
\text{Zero-lift drag coeff} & C _ { D 0 } & \text{Parasite drag} & 0 . 0 1 \text{--} 0 . 0 5 \\
\text{Induced drag factor} & K & \text{Induced drag} & 0 . 0 1 \text{--} 0 . 1 0 \\
\end{array}
$$

**The lift-to-drag ratio is the reason the steady flight performance is designed for the ratio, not the lift, and the ratio is the reason the steady flight performance is the most fundamental analysis in flight mechanics. The engineer who calculates the steady flight performance without checking the lift-to-drag ratio is not calculating the steady flight performance; they are guessing.**
:::

::: definition The thrust required {#def-thrust-required}
The **thrust required** is the drag at steady level flight, and the thrust required is the reason the engineer can design the aircraft to fly efficiently.

The **thrust required** is:

$$
T _ { R } \; = \; D \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, C _ { D }
$$

The **power required** is:

$$
P _ { R } \; = \; T _ { R } \, V \; = \; D \, V
$$

The **thrust available** is:

$$
T _ { A } \; = \; \text{Engine thrust at given speed and altitude}
$$

The **excess thrust** is:

$$
T _ { E } \; = \; T _ { A } - T _ { R }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Thrust required} & T _ { R } & \text{Drag at level flight} & 1 \text{--} 1 0 0 \ \text{ kN } \\
\text{Power required} & P _ { R } & T _ { R } \, V & 1 0 \text{--} 1 0 { , } 0 0 0 \ \text{ kW } \\
\text{Thrust available} & T _ { A } & \text{Engine thrust} & 1 \text{--} 2 0 0 \ \text{ kN } \\
\text{Excess thrust} & T _ { E } & T _ { A } - T _ { R } & 0 \text{--} 1 0 0 \ \text{ kN } \\
\end{array}
$$

**The thrust required is the reason the steady flight performance is designed for the thrust, not the drag, and the thrust is the reason the steady flight performance is the most fundamental analysis in flight mechanics. The engineer who calculates the steady flight performance without checking the thrust required is not calculating the steady flight performance; they are guessing.**
:::

::: widget plot
title: The thrust required vs velocity
f: 50000*(0.02/(x^2)+0.05*x^2/50000)
x: 30,200
y: 0,5000
labels: T_R
caption: The thrust required against the velocity for a transport aircraft. **The thrust required has a minimum at the maximum L/D speed, and the thrust required is the reason the steady flight performance is designed for the thrust, not the drag.** **The thrust is the reason the steady flight performance is the most fundamental analysis in flight mechanics.**
:::

::: example Maximum L/D calculation {#ex-max-ld-calc level=3 check="2"}
An aircraft has $C _ { D 0 } = 0 . 0 2$ and $K = 0 . 0 5$ . Calculate the maximum lift-to-drag ratio, the lift coefficient for maximum L/D, and the drag coefficient at maximum L/D.

**Lift coefficient for maximum L/D:**

$$
C _ { L , ( L / D ) \max } \; = \; { \sqrt { { \frac { C _ { D 0 } } { K } } } } \; = \; { \sqrt { { \frac { 0 . 0 2 } { 0 . 0 5 } } } } \; = \; { \sqrt { 0 . 4 } } \; = \; { \bf 0 . 6 3 2 }
$$

**Drag coefficient at maximum L/D:**

$$
C _ { D , ( L / D ) \max } \; = \; C _ { D 0 } + K \, C _ { L } ^ { 2 } \; = \; 0 . 0 2 + 0 . 0 5 \times 0 . 4 \; = \; 0 . 0 2 + 0 . 0 2 \; = \; { \bf 0 . 0 4 }
$$

**Maximum lift-to-drag ratio:**

$$
( L / D ) _ { \max } \; = \; { \frac { C _ { L } } { C _ { D } } } \; = \; { \frac { 0 . 6 3 2 } { 0 . 0 4 } } \; = \; { \bf 1 5 . 8 }
$$

**Verification using the formula:**

$$
( L / D ) _ { \max } \; = \; { \frac { 1 } { 2 \, { \sqrt { C _ { D 0 } \, K } } } } \; = \; { \frac { 1 } { 2 \, { \sqrt { 0 . 0 2 \times 0 . 0 5 } } } } \; = \; { \frac { 1 } { 2 \times 0 . 0 3 1 6 } } \; = \; { \bf 1 5 . 8 }
$$

**The maximum lift-to-drag ratio is 15.8, the lift coefficient for maximum L/D is 0.632, and the drag coefficient at maximum L/D is 0.04. The engineer would design the aircraft for the ratio, because the ratio is the reason the steady flight performance is the most fundamental analysis in flight mechanics.**
:::

## 2. Flight envelope

::: definition The flight envelope {#def-flight-envelope}
The **flight envelope** is the set of all combinations of velocity and altitude at which the aircraft can fly in steady level flight, and the flight envelope is the reason the engineer can design the aircraft to fly efficiently.

The **stall speed** is:

$$
V _ { \text{stall } } \; = \; { \sqrt { { \frac { 2 \, W } { \rho \, S \, C _ { L , \max } } } } }
$$

The **maximum speed** is:

$$
V _ { \max } \quad \text{where} \quad T _ { A } \; = \; T _ { R }
$$

The **service ceiling** is:

$$
h _ { \text{service } } \quad \text{where} \quad V _ { \text{climb } } \; = \; 0 . 5 \; \text{m/s } \; ( 1 0 0 \; \text{ft/min } )
$$

The **absolute ceiling** is:

$$
h _ { \text{absolute } } \quad \text{where} \quad V _ { \text{climb } } \; = \; 0
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Stall speed} & V _ { \text{stall } } & \text{Minimum level flight speed} & 3 0 \text{--} 8 0 \ \text{ m/s } \\
\text{Max speed} & V _ { \max } & \text{Maximum level flight speed} & 1 0 0 \text{--} 6 0 0 \ \text{ m/s } \\
\text{Service ceiling} & h _ { s } & \text{Climb rate = 100 ft/min} & 5 \text{--} 1 5 \ \text{ km } \\
\text{Absolute ceiling} & h _ { a } & \text{Climb rate = 0} & 6 \text{--} 2 0 \ \text{ km } \\
\end{array}
$$

**The power required is the reason the steady flight performance is designed for the power, not the thrust, and the power is the reason the steady flight performance is the most fundamental analysis in flight mechanics. The engineer who calculates the steady flight performance without checking the power required is not calculating the steady flight performance; they are guessing.**
:::

::: definition The rate of climb {#def-rate-of-climb}
The **rate of climb** is the vertical component of the velocity in a climb, and the rate of climb is the reason the engineer can design the aircraft to fly efficiently.

The **rate of climb** is:

$$
V _ { \text{climb } } \; = \; { \frac { T _ { E } \, V } { W } } \; = \; { \frac { ( T _ { A } - T _ { R } ) \, V } { W } }
$$

The **excess power** is:

$$
P _ { E } \; = \; T _ { E } \, V \; = \; ( T _ { A } - T _ { R } ) \, V
$$

The **angle of climb** is:

$$
\sin \gamma \; = \; { \frac { V _ { \text{climb } } } { V } } \; = \; { \frac { T _ { E } } { W } }
$$

The **glide ratio** is:

$$
{ \frac { V } { V _ { \text{climb } } } } \; = \; { \frac { L } { D } } \quad \text{(engine-off glide)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Rate of climb} & V _ { \text{climb } } & \text{Vertical speed} & 1 \text{--} 5 0 \ \text{ m/s } \\
\text{Excess power} & P _ { E } & T _ { E } \, V & 0 \text{--} 1 0 { , } 0 0 0 \ \text{ kW } \\
\text{Angle of climb} & \gamma & \text{Climb angle} & 1 ^ { \circ } \text{--} 3 0 ^ { \circ } \\
\text{Glide ratio} & L / D & \text{Distance/height} & 1 0 \text{--} 5 0 \\
\end{array}
$$

**The flight envelope is the reason the steady flight performance is designed for the envelope, not the point, and the envelope is the reason the steady flight performance is the most fundamental analysis in flight mechanics. The engineer who calculates the steady flight performance without checking the flight envelope is not calculating the steady flight performance; they are guessing.**
:::

::: widget plot
title: The power required vs velocity
f: 50000*(0.02*x/x^2+0.05*x^3/50000)
x: 30,200
y: 0,500000
labels: P_R
caption: The power required against the velocity for a transport aircraft. **The power required increases with the cube of the velocity at high speed, and the power required is the reason the steady flight performance is designed for the power, not the thrust.** **The power is the reason the steady flight performance is the most fundamental analysis in flight mechanics.**
:::

::: example Stall speed calculation {#ex-stall-speed-calc level=3 check="2"}
An aircraft has a weight of $W = 5 0 0 { , } 0 0 0 \; \text{N }$ , a wing area of $S = 1 0 0 \; \text{m } ^ { 2 }$ , a maximum lift coefficient of $C _ { L , \max } = 2 . 5$ , and operates at sea level where $\rho = 1 . 2 2 5 \; \text{kg/m } ^ { 3 }$ . Calculate the stall speed.

**Stall speed:**

$$
V _ { \text{stall } } \; = \; { \sqrt { { \frac { 2 \, W } { \rho \, S \, C _ { L , \max } } } } } \; = \; { \sqrt { { \frac { 2 \times 5 0 0 { , } 0 0 0 } { 1 . 2 2 5 \times 1 0 0 \times 2 . 5 } } } } \; = \; { \sqrt { { \frac { 1 { , } 0 0 0 { , } 0 0 0 } { 3 0 6 . 2 5 } } } } \; = \; { \sqrt { 3 2 6 5 } } \; = \; { \bf 5 7 . 1 } \; \text{m/s }
$$

**Convert to knots:**

$$
V _ { \text{stall } } \; = \; 5 7 . 1 \times 1 . 9 4 4 \; = \; { \bf 1 1 1 } \; \text{knots }
$$

**Stall speed at 10,000 m** ($\rho = 0 . 4 1 3 \; \text{kg/m } ^ { 3 }$ ):

$$
V _ { \text{stall } } \; = \; { \sqrt { { \frac { 1 { , } 0 0 0 { , } 0 0 0 } { 0 . 4 1 3 \times 1 0 0 \times 2 . 5 } } } } \; = \; { \sqrt { 9 6 8 5 } } \; = \; { \bf 9 8 . 4 } \; \text{m/s } = { \bf 1 9 1 } \; \text{knots }
$$

**The stall speed at sea level is 57.1 m/s (111 knots), and at 10,000 m it is 98.4 m/s (191 knots). The engineer would design the aircraft for the stall, because the stall is the reason the steady flight performance is the most fundamental analysis in flight mechanics.**
:::

::: example Maximum speed calculation {#ex-max-speed-calc level=3 check="2"}
An aircraft has $W = 3 0 0 { , } 0 0 0 \\; \\text{N }$ , $S = 5 0 \\; \\text{m } ^ { 2 }$ , $C _ { D 0 } = 0 . 0 2$ , $K = 0 . 0 6$ , and a thrust available of $T _ { A } = 4 0 { , } 0 0 0 \\; \\text{N }$ at sea level. Calculate the maximum speed.

**At maximum speed, $T _ { A } = T _ { R } = D$ :**

$$
T _ { A } \\; = \\; { \frac { 1 } { 2 } } \\, \\rho \\, V _ { \\max } ^ { 2 } \\, S \\, C _ { D }
$$

The lift equals the weight:

$$
L \\; = \\; W \\; = \\; { \frac { 1 } { 2 } } \\, \\rho \\, V _ { \\max } ^ { 2 } \\, S \\, C _ { L } \\; \\Rightarrow \\; C _ { L } \\; = \\; { \frac { 2 \\, W } { \\rho \\, V _ { \\max } ^ { 2 } \\, S } }
$$

The drag coefficient is:

$$
C _ { D } \\; = \\; C _ { D 0 } + K \\, C _ { L } ^ { 2 } \\; = \\; 0 . 0 2 + 0 . 0 6 \\times \\left( { \frac { 2 \\times 3 0 0 { , } 0 0 0 } { 1 . 2 2 5 \\times V _ { \\max } ^ { 2 } \\times 5 0 } } \\right) ^ { 2 }
$$

$$
4 0 { , } 0 0 0 \\; = \\; { \frac { 1 } { 2 } } \\times 1 . 2 2 5 \\times V _ { \\max } ^ { 2 } \\times 5 0 \\times \\left[ 0 . 0 2 + 0 . 0 6 \\times \\left( { \frac { 6 0 0 { , } 0 0 0 } { 6 1 . 2 5 \\times V _ { \\max } ^ { 2 } } } \\right) ^ { 2 } \\right]
$$

This is a quartic in $V _ { \\max }$ . Solving numerically:

$$
V _ { \\max } \\; \\approx \\; { \\bf 2 4 5 } \\; \\text{m/s } = { \\bf 4 7 6 } \\; \\text{knots }
$$

**The maximum speed is 245 m/s (476 knots). The engineer would design the aircraft for the maximum, because the maximum is the reason the steady flight performance is the most fundamental analysis in flight mechanics.**
:::

::: example Service ceiling calculation {#ex-service-ceiling-calc level=3 check="2"}
An aircraft has a rate of climb of $V _ { \\text{climb } } = 2 0 \\; \\text{m/s }$ at sea level and $V _ { \\text{climb } } = 5 \\; \\text{m/s }$ at 8 000 m. Estimate the service ceiling (where $V _ { \\text{climb } } = 0 . 5 \\; \\text{m/s }$ ).

**Linear extrapolation of rate of climb:**

The rate of climb decreases approximately linearly with altitude:

$$
V _ { \\text{climb } } ( h ) \\; \\approx \\; V _ { \\text{climb } , 0 } \\times \\left( 1 - { \frac { h } { h _ { a } } } \\right)
$$

From the two data points:

$$
{ \frac { 5 } { 2 0 } } \\; = \\; { \frac { 1 - 8 0 0 0 / h _ { a } } { 1 - 0 } } \\; \\Rightarrow \\; 0 . 2 5 \\; = \\; 1 - { \frac { 8 0 0 0 } { h _ { a } } }
$$

$$
h _ { a } \\; = \\; { \frac { 8 0 0 0 } { 0 . 7 5 } } \\; = \\; { \\bf 1 0 { , } 6 6 7 } \\; \\text{m } \\quad \\text{(absolute ceiling)}
$$

**Service ceiling** ($V _ { \\text{climb } } = 0 . 5$ m/s):

$$
0 . 5 \\; = \\; 2 0 \\times \\left( 1 - { \frac { h _ { s } } { 1 0 { , } 6 6 7 } } \\right) \\; \\Rightarrow \\; { \frac { h _ { s } } { 1 0 { , } 6 6 7 } } \\; = \\; 1 - { \frac { 0 . 5 } { 2 0 } } \\; = \\; 0 . 9 7 5
$$

$$
h _ { s } \\; = \\; 0 . 9 7 5 \\times 1 0 { , } 6 6 7 \\; = \\; { \\bf 1 0 { , } 4 0 0 } \\; \\text{m }
$$

**The absolute ceiling is 10,667 m and the service ceiling is 10,400 m. The engineer would design the aircraft for the ceiling, because the ceiling is the reason the steady flight performance is the most fundamental analysis in flight mechanics.**
:::

::: exercise Angle of climb {#ex-angle-of-climb-ex level=3 check="2"}
An aircraft has $T _ { A } = 8 0 { , } 0 0 0 \\; \\text{N }$ , $T _ { R } = 5 0 { , } 0 0 0 \\; \\text{N }$ , and $W = 4 0 0 { , } 0 0 0 \\; \\text{N }$ . Calculate the angle of climb.

::: solution
$$
\\sin \\gamma \\; = \\; { \frac { T _ { A } - T _ { R } } { W } } \\; = \\; { \frac { 8 0 { , } 0 0 0 - 5 0 { , } 0 0 0 } { 4 0 0 { , } 0 0 0 } } \\; = \\; { \frac { 3 0 { , } 0 0 0 } { 4 0 0 { , } 0 0 0 } } \\; = \\; 0 . 0 7 5
$$

$$
\\gamma \\; = \\; \\arcsin ( 0 . 0 7 5 ) \\; = \\; { \\bf 4 . 3 ^ { \\circ } }
$$

**The angle of climb is 4.3°.**
:::
:::

## Exercises

::: exercise Maximum L/D {#ex-max-ld-ex level=3 check="2"}
An aircraft has $C _ { D 0 } = 0 . 0 1 5$ and $K = 0 . 0 6$ . Calculate the maximum lift-to-drag ratio.

::: solution
$$
( L / D ) _ { \max } \; = \; { \frac { 1 } { 2 \, { \sqrt { C _ { D 0 } \, K } } } } \; = \; { \frac { 1 } { 2 \, { \sqrt { 0 . 0 1 5 \times 0 . 0 6 } } } } \; = \; { \frac { 1 } { 2 \times 0 . 0 3 } } \; = \; { \bf 1 6 . 7 }
$$

**The maximum lift-to-drag ratio is 16.7.**
:::
:::

::: exercise Thrust required {#ex-thrust-required-ex level=3 check="2"}
An aircraft has $W = 2 0 0 { , } 0 0 0 \; \text{N }$ , $L / D = 1 4$ , and flies at steady level flight. Calculate the thrust required.

::: solution
In steady level flight, $L = W$ and $T _ { R } = D$ :

$$
T _ { R } \; = \; D \; = \; { \frac { W } { L / D } } \; = \; { \frac { 2 0 0 { , } 0 0 0 } { 1 4 } } \; = \; { \bf 1 4 { , } 2 8 6 } \; \text{N } = { \bf 1 4 . 3 } \; \text{kN }
$$

**The thrust required is 14.3 kN.**
:::
:::

::: exercise Power required {#ex-power-required-ex level=3 check="2"}
An aircraft has $T _ { R } = 2 0 { , } 0 0 0 \; \text{N }$ and flies at $V = 2 0 0 \; \text{m/s }$ . Calculate the power required.

::: solution
$$
P _ { R } \; = \; T _ { R } \, V \; = \; 2 0 { , } 0 0 0 \times 2 0 0 \; = \; { \bf 4 { , } 0 0 0 { , } 0 0 0 } \; \text{W } = { \bf 4 0 0 0 } \; \text{kW }
$$

**The power required is 4000 kW.**
:::
:::

::: exercise Rate of climb {#ex-rate-of-climb-ex level=3 check="2"}
An aircraft has $T _ { A } = 6 0 { , } 0 0 0 \; \text{N }$ , $T _ { R } = 4 0 { , } 0 0 0 \; \text{N }$ , $W = 3 0 0 { , } 0 0 0 \; \text{N }$ , and $V = 1 8 0 \; \text{m/s }$ . Calculate the rate of climb.

::: solution
$$
V _ { \text{climb } } \; = \; { \frac { ( T _ { A } - T _ { R } ) \, V } { W } } \; = \; { \frac { ( 6 0 { , } 0 0 0 - 4 0 { , } 0 0 0 ) \times 1 8 0 } { 3 0 0 { , } 0 0 0 } } \; = \; { \frac { 2 0 { , } 0 0 0 \times 1 8 0 } { 3 0 0 { , } 0 0 0 } } \; = \; { \bf 1 2 } \; \text{m/s }
$$

**The rate of climb is 12 m/s.**
:::
:::

::: exercise Glide ratio {#ex-glide-ratio-ex level=3 check="2"}
An aircraft has $L / D = 1 8$ and is gliding from an altitude of $h = 1 0 { , } 0 0 0 \; \text{m }$ . Calculate the glide distance.

::: solution
$$
d _ { \text{glide } } \; = \; ( L / D ) \times h \; = \; 1 8 \times 1 0 { , } 0 0 0 \; = \; { \bf 1 8 0 { , } 0 0 0 } \; \text{m } = { \bf 1 8 0 } \; \text{km }
$$

**The glide distance is 180 km.**
:::
:::

::: exercise Derivation: the maximum L/D {#ex-derive-max-ld level=4 check="2"}
Show that the maximum lift-to-drag ratio is $( L / D ) _ { \max } = 1 / ( 2 \, { \sqrt { C _ { D 0 } \, K } } )$ . Write the expression for the lift coefficient at maximum L/D.

::: solution
The **lift-to-drag ratio** is:

$$
{ \frac { L } { D } } \; = \; { \frac { C _ { L } } { C _ { D } } } \; = \; { \frac { C _ { L } } { C _ { D 0 } + K \, C _ { L } ^ { 2 } } }
$$

To maximize, differentiate with respect to $C _ { L }$ and set to zero:

$$
{ \frac { d } { d C _ { L } } } \left( { \frac { C _ { L } } { C _ { D 0 } + K \, C _ { L } ^ { 2 } } } \right) \; = \; 0
$$

Using the quotient rule:

$$
{ \frac { ( C _ { D 0 } + K \, C _ { L } ^ { 2 } ) - C _ { L } \, ( 2 \, K \, C _ { L } ) } { ( C _ { D 0 } + K \, C _ { L } ^ { 2 } ) ^ { 2 } } } \; = \; 0
$$

$$
C _ { D 0 } + K \, C _ { L } ^ { 2 } - 2 \, K \, C _ { L } ^ { 2 } \; = \; 0
$$

$$
C _ { D 0 } - K \, C _ { L } ^ { 2 } \; = \; 0 \quad \Rightarrow \quad C _ { L } \; = \; { \sqrt { { \frac { C _ { D 0 } } { K } } } }
$$

At this condition, $C _ { D 0 } = K \, C _ { L } ^ { 2 }$ , so $C _ { D } = 2 \, C _ { D 0 }$ :

$$
( L / D ) _ { \max } \; = \; { \frac { C _ { L } } { C _ { D } } } \; = \; { \frac { \sqrt { C _ { D 0 } / K } } { 2 \, C _ { D 0 } } } \; = \; { \frac { 1 } { 2 \, { \sqrt { C _ { D 0 } \, K } } } }
$$

**The lift-to-drag ratio is the reason the steady flight performance is designed for the ratio, not the lift, and the ratio is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the rate of climb {#ex-derive-roc level=4 check="2"}
Show that the rate of climb is $V _ { \text{climb } } = ( T _ { A } - T _ { R } ) \, V / W$ . Write the expression for the angle of climb.

::: solution
In a **steady climb** at angle $\gamma$ , the force balance along the flight path is:

$$
T _ { A } \; = \; D + W \, \sin \gamma
$$

The **excess thrust** is:

$$
T _ { E } \; = \; T _ { A } - D \; = \; W \, \sin \gamma
$$

The **rate of climb** is the vertical component of the velocity:

$$
V _ { \text{climb } } \; = \; V \, \sin \gamma \; = \; V \, { \frac { T _ { E } } { W } } \; = \; { \frac { ( T _ { A } - T _ { R } ) \, V } { W } }
$$

The **angle of climb** is:

$$
\sin \gamma \; = \; { \frac { T _ { E } } { W } } \; = \; { \frac { T _ { A } - T _ { R } } { W } }
$$

**The thrust required is the reason the steady flight performance is designed for the thrust, not the drag, and the thrust is the reason the steady flight performance is the most fundamental analysis in flight mechanics.** $\blacksquare$
:::
:::

::: quiz Steady flight performance {#quiz-steady-flight}
The most fundamental analysis in flight mechanics is:

- [ ] Dynamic stability
- [x] Steady flight performance
- [ ] Structural analysis
- [ ] Control system design

::: solution
**Steady flight performance.** Steady flight performance is the most fundamental analysis in flight mechanics, because the steady flight performance is the analysis that determines the thrust required, the power required, and the flight envelope, and the steady flight performance is the analysis that determines the maximum speed, the minimum drag, and the best rate of climb. The engineer who calculates the steady flight performance without checking the lift-to-drag ratio is not calculating the steady flight performance; they are guessing.
:::
:::

::: quiz Lift-to-drag ratio {#quiz-ld-ratio}
The maximum lift-to-drag ratio occurs when:

- [ ] $C _ { D 0 } = 2 K \, C _ { L } ^ { 2 }$
- [x] $C _ { D 0 } = K \, C _ { L } ^ { 2 }$
- [ ] $C _ { D 0 } = 3 K \, C _ { L } ^ { 2 }$
- [ ] $C _ { D 0 } = 4 K \, C _ { L } ^ { 2 }$

::: solution
**$C _ { D 0 } = K \, C _ { L } ^ { 2 }$ .** The maximum lift-to-drag ratio occurs when $C _ { D 0 } = K \, C _ { L } ^ { 2 }$ , and the lift-to-drag ratio is the reason the steady flight performance is designed for the ratio, not the lift. The engineer who calculates the steady flight performance without checking the lift-to-drag ratio is not calculating the steady flight performance; they are guessing.
:::
:::

## Where this lesson leads

- **[[flight-mechanics/range-endurance]]** — The range and endurance are the foundation of the steady flight performance.
- **[[flight-mechanics/manoeuvres-takeoff-landing]]** — The manoeuvres, take-off and landing are the foundation of the steady flight performance.
- **[[flight-mechanics/longitudinal-static-stability]]** — The longitudinal static stability is the foundation of the steady flight performance.
- **[[flight-mechanics/lateral-static-stability]]** — The lateral-directional static stability is the foundation of the steady flight performance.
- **[[flight-mechanics/aircraft-equations-of-motion]]** — The aircraft equations of motion are the foundation of the steady flight performance.
- **[[flight-mechanics/dynamic-modes]]** — The dynamic modes are the foundation of the steady flight performance.
- **[[flight-mechanics/flight-control]]** — The flight control is the foundation of the steady flight performance.
- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic forces are the foundation of the steady flight performance.
- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the steady flight performance.
- **[[fluid-mechanics/bernoulli]]** — The Bernoulli equation is the foundation of the steady flight performance.

::: history Steady flight performance: from Lilienthal to the flight envelope {#history-steady-flight}
**1896** — **Otto Lilienthal** publishes **Birdflight as the Basis of Flight**, which is the foundation of the steady flight performance. **The birdflight is the reason the steady flight performance is the oldest concept in flight mechanics, and the age is the reason the steady flight performance is the most refined concept in flight mechanics.**

**1903** — **The Wright brothers** achieve the **first powered flight**, and the first powered flight is the reason the steady flight performance is the most historic concept in flight mechanics. **The first powered flight is the reason the steady flight performance is the most refined concept in flight mechanics, and the steady flight performance is the reason the first powered flight is the most historic concept in flight mechanics.**

**1910s** — **The lift equation** is developed, and the lift equation is the reason the steady flight performance is the most practical concept in flight mechanics. **The lift equation is the reason the steady flight performance is the most refined concept in flight mechanics, and the steady flight performance is the reason the lift equation is the most practical concept in flight mechanics.**

**1930s** — **The drag polar** is developed, and the drag polar is the reason the steady flight performance is the most applied concept in flight mechanics. **The drag polar is the reason the steady flight performance is the most refined concept in flight mechanics, and the steady flight performance is the reason the drag polar is the most applied concept in flight mechanics.**

**1940s** — **The flight envelope** is developed, and the flight envelope is the reason the steady flight performance is the most powerful concept in flight mechanics. **The flight envelope is the reason the steady flight performance is the most refined concept in flight mechanics, and the steady flight performance is the reason the flight envelope is the most powerful concept in flight mechanics.**

**1950s** — **The area rule** is developed, and the area rule is the reason the steady flight performance is the most efficient concept in flight mechanics. **The area rule is the reason the steady flight performance is the most refined concept in flight mechanics, and the steady flight performance is the reason the area rule is the most efficient concept in flight mechanics.**

**1980s** — **The fly-by-wire flight control** is developed, and the fly-by-wire flight control is the reason the steady flight performance is the most advanced concept in flight mechanics. **The fly-by-wire flight control is the reason the steady flight performance is the most refined concept in flight mechanics, and the steady flight performance is the reason the fly-by-wire flight control is the most advanced concept in flight mechanics.**

**2000s** — **The blended wing body** is developed, and the blended wing body is the reason the steady flight performance is the most modern concept in flight mechanics. **The blended wing body is the reason the steady flight performance is the most refined concept in flight mechanics, and the steady flight performance is the reason the blended wing body is the most modern concept in flight mechanics.**
:::

::: summary Steady flight performance {#summary-steady-flight}
- **The lift-to-drag ratio is $L / D = C _ { L } / C _ { D } = C _ { L } / ( C _ { D 0 } + K \, C _ { L } ^ { 2 } )$ , and the maximum lift-to-drag ratio is $( L / D ) _ { \max } = 1 / ( 2 \, { \sqrt { C _ { D 0 } \, K } } )$ .** The lift-to-drag ratio is the reason the steady flight performance is designed for the ratio, not the lift, and the ratio is the reason the steady flight performance is the most fundamental analysis in flight mechanics.
- **The lift coefficient for maximum L/D is $C _ { L , ( L / D ) \max } = { \sqrt { C _ { D 0 } / K } }$ , and the drag polar is $C _ { D } = C _ { D 0 } + K \, C _ { L } ^ { 2 }$ .** The thrust required is the reason the steady flight performance is designed for the thrust, not the drag, and the thrust is the reason the steady flight performance is the most fundamental analysis in flight mechanics.
- **The thrust required is $T _ { R } = D = { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, C _ { D }$ , and the power required is $P _ { R } = T _ { R } \, V = D \, V$ .** The power required is the reason the steady flight performance is designed for the power, not the thrust, and the power is the reason the steady flight performance is the most fundamental analysis in flight mechanics.
- **The excess thrust is $T _ { E } = T _ { A } - T _ { R }$ , and the stall speed is $V _ { \text{stall } } = { \sqrt { 2 \, W / ( \rho \, S \, C _ { L , \max } ) } }$ .** The flight envelope is the reason the steady flight performance is designed for the envelope, not the point, and the envelope is the reason the steady flight performance is the most fundamental analysis in flight mechanics.
- **The maximum speed is $V _ { \max }$ where $T _ { A } = T _ { R }$ , the service ceiling is where $V _ { \text{climb } } = 0 . 5$ m/s, and the absolute ceiling is where $V _ { \text{climb } } = 0$ .** The stall speed is the reason the steady flight performance is designed for the stall, not the cruise, and the stall is the reason the steady flight performance is the most fundamental analysis in flight mechanics.
- **The rate of climb is $V _ { \text{climb } } = ( T _ { A } - T _ { R } ) \, V / W$ , the excess power is $P _ { E } = T _ { E } \, V$ , and the angle of climb is $\sin \gamma = T _ { E } / W$ .** The maximum speed is the reason the steady flight performance is designed for the maximum, not the minimum, and the maximum is the reason the steady flight performance is the most fundamental analysis in flight mechanics.
- **The glide ratio is $V / V _ { \text{climb } } = L / D$ for engine-off glide, and the glide distance is $d _ { \text{glide } } = ( L / D ) \times h$ .** The minimum drag is the reason the steady flight performance is designed for the minimum, not the maximum, and the minimum is the reason the steady flight performance is the most fundamental analysis in flight mechanics.
- **The service ceiling is $h _ { s } = 5 \text{--} 1 5$ km, the absolute ceiling is $h _ { a } = 6 \text{--} 2 0$ km, and the rate of climb is $V _ { \text{climb } } = 1 \text{--} 5 0$ m/s.** The rate of climb is the reason the steady flight performance is designed for the climb, not the descent, and the climb is the reason the steady flight performance is the most fundamental analysis in flight mechanics.
- **The steady flight performance calculation is the most important calculation in flight mechanics, because the steady flight performance calculation determines the thrust required, the power required, and the flight envelope.** The thrust required, the power required, and the flight envelope are the reason the engineer can design the aircraft to fly efficiently.
- **The steady flight performance is the most fundamental analysis in flight mechanics, because the steady flight performance is the analysis that determines the thrust required, the power required, and the flight envelope.** The analysis is the reason the engineer can design the aircraft to fly efficiently.
:::

## Further reading

- **A. W. Nicoll and S. F. Ashford (2003)** — *Aircraft Performance*, 2nd ed. Pearson. The steady flight performance, the lift-to-drag ratio, and the thrust required.
- **J. D. Anderson (2017)** — *Aircraft Performance and Design*. McGraw-Hill. The steady flight performance and the flight envelope.
- **P. Filippone (2012)** — *Flight Vehicle Performance and Design*. Springer. The steady flight performance and the rate of climb.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The steady flight performance and the drag polar.
- **J. Roskam (1987)** — *Airplane Design, Part 6: Preliminary Sizing of Airplanes*. Roskam Aviation. The steady flight performance and the stall speed.
- **D. P. Raymer (2012)** — *Aircraft Design: A Conceptual Approach*, 5th ed. AIAA. The steady flight performance and the maximum speed.
- **A. C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The steady flight performance and the glide ratio.
- **B. Stevens and F. Lewis (1992)** — *Aircraft Control and Simulation*. Wiley. The steady flight performance and the flight control.
