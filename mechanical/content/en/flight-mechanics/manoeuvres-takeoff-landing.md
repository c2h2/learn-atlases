Manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics: the manoeuvre is the flight condition where the load factor exceeds one, the take-off is the ground run and rotation that brings the aircraft to flight speed, and the landing is the flare and touchdown that bring the aircraft to rest. **The engineer who calculates the take-off distance without checking the lift-off speed is not calculating the take-off distance; they are guessing.** The manoeuvre, take-off and landing calculation is the reason the engineer can design the aircraft to meet its field length and structural limits, and the load factor is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.

The quantitative tools of manoeuvres, take-off and landing are the **load factor** (the ratio of the lift to the weight), the **turn radius** (the radius of the horizontal turn), the **take-off distance** (the ground roll plus the rotation distance), and the **landing distance** (the flare distance plus the ground roll). The tools are the language in which the manoeuvre, take-off and landing analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways manoeuvres, take-off and landing calculation goes wrong
**Not checking the load factor.** The engineer who calculates the manoeuvre without checking the load factor is not calculating the manoeuvre; they are guessing. **The load factor is the reason the manoeuvres, take-off and landing are designed for the factor, not the load, and the factor is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** **Not checking the turn radius.** The engineer who calculates the manoeuvre without checking the turn radius is not calculating the manoeuvre; they are guessing. **The turn radius is the reason the manoeuvres, take-off and landing are designed for the radius, not the diameter, and the radius is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** **Not checking the take-off distance.** The engineer who calculates the take-off without checking the take-off distance is not calculating the take-off; they are guessing. **The take-off distance is the reason the manoeuvres, take-off and landing are designed for the distance, not the speed, and the distance is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** **Not checking the landing distance.** The engineer who calculates the landing without checking the landing distance is not calculating the landing; they are guessing. **The landing distance is the reason the manoeuvres, take-off and landing are designed for the distance, not the speed, and the distance is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** **Not checking the stall speed.** The engineer who calculates the manoeuvre without checking the stall speed is not calculating the manoeuvre; they are guessing. **The stall speed is the reason the manoeuvres, take-off and landing are designed for the stall, not the cruise, and the stall is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** **Not checking the bank angle.** The engineer who calculates the manoeuvre without checking the bank angle is not calculating the manoeuvre; they are guessing. **The bank angle is the reason the manoeuvres, take-off and landing are designed for the angle, not the rate, and the angle is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** **Not checking the rotation speed.** The engineer who calculates the take-off without checking the rotation speed is not calculating the take-off; they are guessing. **The rotation speed is the reason the manoeuvres, take-off and landing are designed for the rotation, not the touchdown, and the rotation is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** **Not checking the approach speed.** The engineer who calculates the landing without checking the approach speed is not calculating the landing; they are guessing. **The approach speed is the reason the manoeuvres, take-off and landing are designed for the approach, not the departure, and the approach is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** **Not checking the braking action.** The engineer who calculates the landing without checking the braking action is not calculating the landing; they are guessing. **The braking action is the reason the manoeuvres, take-off and landing are designed for the braking, not the acceleration, and the braking is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.**
:::

## 1. Manoeuvres

::: definition The load factor {#def-load-factor}
The **load factor** is the ratio of the lift to the weight, and the load factor is the reason the engineer can design the aircraft to meet its structural limits.

The **load factor** is:

$$
n \; = \; { \frac { L } { W } }
$$

The **load factor in a level turn** is:

$$
n \; = \; { \frac { 1 } { \cos \phi } }
$$

The **stall speed in a manoeuvre** is:

$$
V _ { \text{stall } , n } \; = \; V _ { \text{stall } , 1 } \, { \sqrt { n } }
$$

The **turn radius** is:

$$
r \; = \; { \frac { V ^ { 2 } } { g \, { \sqrt { n ^ { 2 } - 1 } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Load factor} & n & L / W & 1 \text{--} 9 \\
\text{Bank angle} & \phi & \text{Roll angle} & 0 ^ { \circ } \text{--} 8 0 ^ { \circ } \\
\text{Turn radius} & r & \text{Horizontal turn radius} & 5 0 0 \text{--} 1 0 { , } 0 0 0 \ \text{ m } \\
\text{Manoeuvre limit load} & n _ { \max } & \text{Structural limit} & 2 . 5 \text{--} 9 \\
\end{array}
$$

**The load factor is the reason the manoeuvres, take-off and landing are designed for the factor, not the load, and the factor is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics. The engineer who calculates the manoeuvre without checking the load factor is not calculating the manoeuvre; they are guessing.**
:::

::: definition The turn performance {#def-turn-performance}
The **turn performance** is the combination of turn rate and turn radius achievable at a given speed and altitude, and the turn performance is the reason the engineer can design the aircraft to meet its structural limits.

The **turn rate** is:

$$
\omega \; = \; { \frac { g \, { \sqrt { n ^ { 2 } - 1 } } } { V } }
$$

The **specific excess power** in a turn is:

$$
P _ { s } \; = \; { \frac { ( T - D ) \, V } { W } }
$$

The **corner speed** is:

$$
V _ { \text{corner } } \; = \; { \sqrt { { \frac { 2 \, W } { \rho \, S } } } } \, { \sqrt { { \frac { K } { C _ { D 0 } } } } } \, n _ { \max } ^ { 1 / 4 }
$$

The **sustained turn rate** is:

$$
\omega _ { \text{sustained } } \; = \; { \frac { g } { V } } \, { \sqrt { n ^ { 2 } - 1 } } \quad \text{where} \quad P _ { s } \; = \; 0
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Turn rate} & \omega & \text{Angular velocity} & 1 ^ { \circ } \text{--} 2 0 ^ { \circ } / \text{s } \\
\text{Corner speed} & V _ { \text{corner } } & \text{Max instantaneous turn} & 1 5 0 \text{--} 3 0 0 \ \text{ m/s } \\
\text{Sustained turn} & \omega _ { s } & \text{Level turn, no energy loss} & 1 ^ { \circ } \text{--} 8 ^ { \circ } / \text{s } \\
\text{Specific excess power} & P _ { s } & \text{Excess power per weight} & 0 \text{--} 3 0 0 \ \text{ m/s } \\
\end{array}
$$

**The turn radius is the reason the manoeuvres, take-off and landing are designed for the radius, not the diameter, and the radius is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics. The engineer who calculates the manoeuvre without checking the turn radius is not calculating the manoeuvre; they are guessing.**
:::

::: widget plot
title: The load factor vs bank angle
f: 1/cos(x*3.14159/180)
x: 0,80
y: 1,6
labels: n
caption: The load factor against the bank angle. **The load factor increases with the bank angle, and the load factor is the reason the manoeuvres, take-off and landing are designed for the factor, not the load.** **The factor is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.**
:::

::: example Level turn calculation {#ex-level-turn-calc level=3 check="2"}
An aircraft flies a level turn at $V = 2 0 0 \; \text{m/s }$ with a bank angle of $\phi = 4 5 ^ { \circ }$ . Calculate the load factor, the turn radius, and the turn rate.

**Load factor:**

$$
n \; = \; { \frac { 1 } { \cos \phi } } \; = \; { \frac { 1 } { \cos 4 5 ^ { \circ } } } \; = \; { \frac { 1 } { 0 . 7 0 7 1 } } \; = \; { \bf 1 . 4 1 4 }
$$

**Turn radius:**

$$
r \; = \; { \frac { V ^ { 2 } } { g \, { \sqrt { n ^ { 2 } - 1 } } } } \; = \; { \frac { 2 0 0 ^ { 2 } } { 9 . 8 1 \times { \sqrt { 1 . 4 1 4 ^ { 2 } - 1 } } } } \; = \; { \frac { 4 0 { , } 0 0 0 } { 9 . 8 1 \times { \sqrt { 1 . 0 } } } } \; = \; { \frac { 4 0 { , } 0 0 0 } { 9 . 8 1 } } \; = \; { \bf 4 0 7 7 } \; \text{m }
$$

**Turn rate:**

$$
\omega \; = \; { \frac { g \, { \sqrt { n ^ { 2 } - 1 } } } { V } } \; = \; { \frac { 9 . 8 1 \times 1 . 0 } { 2 0 0 } } \; = \; 0 . 0 4 9 0 5 \; \text{rad/s }
$$

$$
\omega \; = \; 0 . 0 4 9 0 5 \times { \frac { 1 8 0 } { \pi } } \; = \; { \bf 2 . 8 1 } \; ^ { \circ } / \text{s }
$$

**The load factor is 1.414, the turn radius is 4077 m, and the turn rate is 2.81°/s. The engineer would design the aircraft for the factor, because the factor is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.**
:::

## 2. Take-off and landing

::: definition The take-off distance {#def-takeoff-distance}
The **take-off distance** is the distance required to accelerate from rest to the rotation speed and become airborne, and the take-off distance is the reason the engineer can design the aircraft to meet its field length requirements.

The **take-off ground roll** is:

$$
d _ { \text{TO } } \; = \; { \frac { V _ { \text{LO } } ^ { 2 } } { 2 \, g \, \left( { \frac { T } { W } } - \mu _ { r } - { \frac { 1 } { 2 } } \, \rho \, V _ { \text{LO } } ^ { 2 } \, { \frac { S } { W } } \, C _ { L _ { \text{avg } } } \right) } }
$$

The **lift-off speed** is:

$$
V _ { \text{LO } } \; = \; 1 . 1 \, V _ { \text{stall } } \; = \; 1 . 1 \, { \sqrt { { \frac { 2 \, W } { \rho \, S \, C _ { L , \max } } } } }
$$

The **rotation speed** is:

$$
V _ { R } \; = \; 1 . 0 5 \, V _ { \text{LO } }
$$

The **safety speed** (50 ft obstacle) is:

$$
V _ { 2 } \; = \; 1 . 2 \, V _ { \text{stall } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Take-off distance} & d _ { \text{TO } } & \text{Ground roll} & 5 0 0 \text{--} 3 0 0 0 \ \text{ m } \\
\text{Lift-off speed} & V _ { \text{LO } } & 1 . 1 \times V _ { \text{stall } } & 5 0 \text{--} 1 0 0 \ \text{ m/s } \\
\text{Rotation speed} & V _ { R } & 1 . 0 5 \times V _ { \text{LO } } & 5 5 \text{--} 1 1 0 \ \text{ m/s } \\
\text{Rolling friction coeff} & \mu _ { r } & \text{Wheel/ground friction} & 0 . 0 2 \text{--} 0 . 0 5 \\
\end{array}
$$

**The take-off distance is the reason the manoeuvres, take-off and landing are designed for the distance, not the speed, and the distance is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics. The engineer who calculates the take-off without checking the take-off distance is not calculating the take-off; they are guessing.**
:::

::: definition The landing distance {#def-landing-distance}
The **landing distance** is the distance required to flare, touch down, and decelerate to a stop, and the landing distance is the reason the engineer can design the aircraft to meet its field length requirements.

The **landing ground roll** is:

$$
d _ { \text{land } } \; = \; { \frac { V _ { \text{TD } } ^ { 2 } } { 2 \, g \, \left( \mu _ { b } - { \frac { T } { W } } + { \frac { 1 } { 2 } } \, \rho \, V _ { \text{TD } } ^ { 2 } \, { \frac { S } { W } } \, C _ { L _ { \text{avg } } } \right) } }
$$

The **touchdown speed** is:

$$
V _ { \text{TD } } \; = \; 1 . 1 5 \, V _ { \text{stall } }
$$

The **approach speed** is:

$$
V _ { \text{app } } \; = \; 1 . 3 \, V _ { \text{stall } }
$$

The **braking friction coefficient** is:

$$
\mu _ { b } \; = \; 0 . 3 \text{--} 0 . 6 \quad \text{(dry runway)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Landing distance} & d _ { \text{land } } & \text{Ground roll} & 4 0 0 \text{--} 2 5 0 0 \ \text{ m } \\
\text{Touchdown speed} & V _ { \text{TD } } & 1 . 1 5 \times V _ { \text{stall } } & 4 5 \text{--} 9 0 \ \text{ m/s } \\
\text{Approach speed} & V _ { \text{app } } & 1 . 3 \times V _ { \text{stall } } & 5 0 \text{--} 1 0 0 \ \text{ m/s } \\
\text{Braking friction} & \mu _ { b } & \text{Braking coefficient} & 0 . 3 \text{--} 0 . 6 \\
\end{array}
$$

**The landing distance is the reason the manoeuvres, take-off and landing are designed for the distance, not the speed, and the distance is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics. The engineer who calculates the landing without checking the landing distance is not calculating the landing; they are guessing.**
:::

::: widget plot
title: The stall speed vs load factor
f: 50*sqrt(x)
x: 1,9
y: 40,160
labels: V_stall
caption: The stall speed against the load factor for $V _ { \text{stall } , 1 } = 5 0$ m/s. **The stall speed increases with the square root of the load factor, and the stall speed is the reason the manoeuvres, take-off and landing are designed for the stall, not the cruise.** **The stall is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.**
:::

::: example Take-off distance calculation {#ex-takeoff-distance-calc level=3 check="2"}
An aircraft has $W = 5 0 0 { , } 0 0 0 \; \text{N }$ , $S = 1 0 0 \; \text{m } ^ { 2 }$ , $C _ { L , \max } = 2 . 5$ , $T = 1 0 0 { , } 0 0 0 \; \text{N }$ , $\mu _ { r } = 0 . 0 3$ , and $\rho = 1 . 2 2 5 \; \text{kg/m } ^ { 3 }$ . Calculate the take-off ground roll.

**Stall speed:**

$$
V _ { \text{stall } } \; = \; { \sqrt { { \frac { 2 \times 5 0 0 { , } 0 0 0 } { 1 . 2 2 5 \times 1 0 0 \times 2 . 5 } } } } \; = \; { \sqrt { 3 2 6 5 } } \; = \; 5 7 . 1 \; \text{m/s }
$$

**Lift-off speed:**

$$
V _ { \text{LO } } \; = \; 1 . 1 \times 5 7 . 1 \; = \; { \bf 6 2 . 8 } \; \text{m/s }
$$

**Average lift coefficient during ground roll** (approximately $0 . 6 \, C _ { L , \max }$ ):

$$
C _ { L _ { \text{avg } } } \; = \; 0 . 6 \times 2 . 5 \; = \; 1 . 5
$$

**Thrust-to-weight ratio:**

$$
{ \frac { T } { W } } \; = \; { \frac { 1 0 0 { , } 0 0 0 } { 5 0 0 { , } 0 0 0 } } \; = \; 0 . 2
$$

**Acceleration term:**

$$
a \; = \; g \, \left( { \frac { T } { W } } - \mu _ { r } - { \frac { 1 } { 2 } } \, \rho \, V _ { \text{LO } } ^ { 2 } \, { \frac { S } { W } } \, C _ { L _ { \text{avg } } } \right)
$$

$$
= \; 9 . 8 1 \times \left( 0 . 2 - 0 . 0 3 - { \frac { 1 } { 2 } } \times 1 . 2 2 5 \times 6 2 . 8 ^ { 2 } \times { \frac { 1 0 0 } { 5 0 0 { , } 0 0 0 } } \times 1 . 5 \right)
$$

$$
= \; 9 . 8 1 \times ( 0 . 2 - 0 . 0 3 - 0 . 0 7 2 ) \; = \; 9 . 8 1 \times 0 . 0 9 8 \; = \; { \bf 0 . 9 6 1 } \; \text{m/s}^2
$$

**Take-off ground roll:**

$$
d _ { \text{TO } } \; = \; { \frac { V _ { \text{LO } } ^ { 2 } } { 2 \, a } } \; = \; { \frac { 6 2 . 8 ^ { 2 } } { 2 \times 0 . 9 6 1 } } \; = \; { \frac { 3 9 4 4 } { 1 . 9 2 2 } } \; = \; { \bf 2 0 5 2 } \; \text{m }
$$

**The take-off ground roll is 2052 m. The engineer would design the aircraft for the distance, because the distance is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.**
:::

::: example Corner speed calculation {#ex-corner-speed-calc level=3 check="2"}
An aircraft has $W = 2 0 0 { , } 0 0 0 \\; \\text{N }$ , $S = 4 0 \\; \\text{m } ^ { 2 }$ , $C _ { D 0 } = 0 . 0 2$ , $K = 0 . 0 6$ , $n _ { \\max } = 5$ , and operates at $\\rho = 0 . 9 \\; \\text{kg/m } ^ { 3 }$ . Calculate the corner speed and the turn radius at corner speed.

**Corner speed:**

$$
V _ { \\text{corner } } \\; = \\; { \sqrt { { \frac { 2 \\, W } { \\rho \\, S } } } } \\, { \sqrt { { \frac { K } { C _ { D 0 } } } } } \\, n _ { \\max } ^ { 1 / 4 }
$$

$$
{ \sqrt { { \frac { 2 \\times 2 0 0 { , } 0 0 0 } { 0 . 9 \\times 4 0 } } } } \\; = \\; { \sqrt { { \frac { 4 0 0 { , } 0 0 0 } { 3 6 } } } } \\; = \\; { \sqrt { 1 1 { , } 1 1 1 } } \\; = \\; 1 0 5 . 4
$$

$$
{ \sqrt { { \frac { 0 . 0 6 } { 0 . 0 2 } } } } \\; = \\; { \sqrt { 3 } } \\; = \\; 1 . 7 3 2
$$

$$
n _ { \\max } ^ { 1 / 4 } \\; = \\; 5 ^ { 0 . 2 5 } \\; = \\; 1 . 4 9 5
$$

$$
V _ { \\text{corner } } \\; = \\; 1 0 5 . 4 \\times 1 . 7 3 2 \\times 1 . 4 9 5 \\; = \\; { \\bf 2 7 3 } \\; \\text{m/s }
$$

**Turn radius at corner speed:**

$$
r \\; = \\; { \frac { V _ { \\text{corner } } ^ { 2 } } { g \\, { \sqrt { n _ { \\max } ^ { 2 } - 1 } } } } \\; = \\; { \frac { 2 7 3 ^ { 2 } } { 9 . 8 1 \\times { \sqrt { 2 5 - 1 } } } } \\; = \\; { \frac { 7 4 { , } 5 2 9 } { 9 . 8 1 \\times 4 . 8 9 9 } } \\; = \\; { \frac { 7 4 { , } 5 2 9 } { 4 8 . 0 6 } } \\; = \\; { \\bf 1 5 5 1 } \\; \\text{m }
$$

**Turn rate at corner speed:**

$$
\\omega \\; = \\; { \frac { g \\, { \sqrt { n _ { \\max } ^ { 2 } - 1 } } } { V _ { \\text{corner } } } } \\; = \\; { \frac { 9 . 8 1 \\times 4 . 8 9 9 } { 2 7 3 } } \\; = \\; 0 . 1 7 6 1 \\; \\text{rad/s } = { \\bf 1 0 . 1 } \\; ^ { \\circ } / \\text{s }
$$

**The corner speed is 273 m/s, the turn radius at corner speed is 1551 m, and the turn rate is 10.1°/s. The engineer would design the aircraft for the angle, because the angle is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.**
:::

::: example Landing distance with reverse thrust {#ex-landing-reverse-thrust level=3 check="2"}
An aircraft touches down at $V _ { \\text{TD } } = 7 0 \\; \\text{m/s }$ with $W = 4 0 0 { , } 0 0 0 \\; \\text{N }$ , $\\mu _ { b } = 0 . 5$ , and reverse thrust of $T _ { \\text{rev } } = 4 0 { , } 0 0 0 \\; \\text{N }$ . Calculate the landing ground roll.

**Deceleration:**

$$
a \\; = \\; g \\, \\left( \\mu _ { b } + { \frac { T _ { \\text{rev } } } { W } } \\right) \\; = \\; 9 . 8 1 \\times \\left( 0 . 5 + { \frac { 4 0 { , } 0 0 0 } { 4 0 0 { , } 0 0 0 } } \\right) \\; = \\; 9 . 8 1 \\times ( 0 . 5 + 0 . 1 )
$$

$$
a \\; = \\; 9 . 8 1 \\times 0 . 6 \\; = \\; { \\bf 5 . 8 8 6 } \\; \\text{m/s}^2
$$

**Landing ground roll:**

$$
d _ { \\text{land } } \\; = \\; { \frac { V _ { \\text{TD } } ^ { 2 } } { 2 \\, a } } \\; = \\; { \frac { 7 0 ^ { 2 } } { 2 \\times 5 . 8 8 6 } } \\; = \\; { \frac { 4 9 0 0 } { 1 1 . 7 7 } } \\; = \\; { \\bf 4 1 6 } \\; \\text{m }
$$

**Without reverse thrust:**

$$
a _ { \\text{no rev } } \\; = \\; 9 . 8 1 \\times 0 . 5 \\; = \\; 4 . 9 0 5 \\; \\text{m/s}^2
$$

$$
d _ { \\text{no rev } } \\; = \\; { \frac { 4 9 0 0 } { 2 \\times 4 . 9 0 5 } } \\; = \\; { \\bf 5 0 0 } \\; \\text{m }
$$

**Distance saved by reverse thrust:**

$$
\\Delta d \\; = \\; 5 0 0 - 4 1 6 \\; = \\; { \\bf 8 4 } \\; \\text{m } \\quad ( 1 6 . 8 \\; \\% \\text{ reduction} )
$$

**The landing ground roll with reverse thrust is 416 m, which is 84 m (16.8%) shorter than without. The engineer would design the aircraft for the braking, because the braking is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.**
:::

::: exercise Load factor at bank angle {#ex-load-factor-bank-ex level=3 check="2"}
An aircraft flies a level turn at a bank angle of $3 0 ^ { \\circ }$ . Calculate the load factor.

::: solution
$$
n \\; = \\; { \frac { 1 } { \\cos 3 0 ^ { \\circ } } } \\; = \\; { \frac { 1 } { 0 . 8 6 6 } } \\; = \\; { \\bf 1 . 1 5 5 }
$$

**The load factor is 1.155.**
:::
:::

## Exercises

::: exercise Load factor {#ex-load-factor-ex level=3 check="2"}
An aircraft flies a level turn at a bank angle of $6 0 ^ { \circ }$ . Calculate the load factor.

::: solution
$$
n \; = \; { \frac { 1 } { \cos 6 0 ^ { \circ } } } \; = \; { \frac { 1 } { 0 . 5 } } \; = \; { \bf 2 . 0 }
$$

**The load factor is 2.0.**
:::
:::

::: exercise Turn radius {#ex-turn-radius-ex level=3 check="2"}
An aircraft flies at $V = 2 5 0 \; \text{m/s }$ with $n = 3$ . Calculate the turn radius.

::: solution
$$
r \; = \; { \frac { V ^ { 2 } } { g \, { \sqrt { n ^ { 2 } - 1 } } } } \; = \; { \frac { 2 5 0 ^ { 2 } } { 9 . 8 1 \times { \sqrt { 9 - 1 } } } } \; = \; { \frac { 6 2 { , } 5 0 0 } { 9 . 8 1 \times 2 . 8 2 8 } } \; = \; { \frac { 6 2 { , } 5 0 0 } { 2 7 . 7 4 } } \; = \; { \bf 2 2 5 3 } \; \text{m }
$$

**The turn radius is 2253 m.**
:::
:::

::: exercise Stall speed in a manoeuvre {#ex-stall-maneuver-ex level=3 check="2"}
An aircraft has $V _ { \text{stall } , 1 } = 6 0 \; \text{m/s }$ . Calculate the stall speed at $n = 4$ .

::: solution
$$
V _ { \text{stall } , n } \; = \; V _ { \text{stall } , 1 } \, { \sqrt { n } } \; = \; 6 0 \times { \sqrt { 4 } } \; = \; 6 0 \times 2 \; = \; { \bf 1 2 0 } \; \text{m/s }
$$

**The stall speed at n = 4 is 120 m/s.**
:::
:::

::: exercise Turn rate {#ex-turn-rate-ex level=3 check="2"}
An aircraft flies at $V = 1 8 0 \; \text{m/s }$ with $n = 2 . 5$ . Calculate the turn rate.

::: solution
$$
\omega \; = \; { \frac { g \, { \sqrt { n ^ { 2 } - 1 } } } { V } } \; = \; { \frac { 9 . 8 1 \times { \sqrt { 6 . 2 5 - 1 } } } { 1 8 0 } } \; = \; { \frac { 9 . 8 1 \times 2 . 2 9 1 } { 1 8 0 } } \; = \; 0 . 1 2 4 9 \; \text{rad/s }
$$

$$
\omega \; = \; 0 . 1 2 4 9 \times { \frac { 1 8 0 } { \pi } } \; = \; { \bf 7 . 1 6 } \; ^ { \circ } / \text{s }
$$

**The turn rate is 7.16°/s.**
:::
:::

::: exercise Landing distance {#ex-landing-distance-ex level=3 check="2"}
An aircraft touches down at $V _ { \text{TD } } = 6 5 \; \text{m/s }$ with $\mu _ { b } = 0 . 4$ , $T / W = 0 . 1$ , and no lift during braking. Calculate the landing ground roll.

::: solution
$$
d _ { \text{land } } \; = \; { \frac { V _ { \text{TD } } ^ { 2 } } { 2 \, g \, ( \mu _ { b } - T / W ) } } \; = \; { \frac { 6 5 ^ { 2 } } { 2 \times 9 . 8 1 \times ( 0 . 4 - 0 . 1 ) } } \; = \; { \frac { 4 2 2 5 } { 5 . 8 8 6 } } \; = \; { \bf 7 1 8 } \; \text{m }
$$

**The landing ground roll is 718 m.**
:::
:::

::: exercise Derivation: the load factor in a turn {#ex-derive-load-factor level=4 check="2"}
Show that the load factor in a level turn is $n = 1 / \cos \phi$ . Write the expression for the turn radius.

::: solution
In a **level turn**, the vertical force balance is:

$$
L \, \cos \phi \; = \; W
$$

The **horizontal force balance** provides the centripetal acceleration:

$$
L \, \sin \phi \; = \; { \frac { m \, V ^ { 2 } } { r } } \; = \; { \frac { W \, V ^ { 2 } } { g \, r } }
$$

From the vertical balance:

$$
n \; = \; { \frac { L } { W } } \; = \; { \frac { 1 } { \cos \phi } }
$$

From the horizontal balance, dividing by the vertical:

$$
\tan \phi \; = \; { \frac { V ^ { 2 } } { g \, r } } \quad \Rightarrow \quad r \; = \; { \frac { V ^ { 2 } } { g \, \tan \phi } }
$$

Since $\tan \phi = { \sqrt { n ^ { 2 } - 1 } }$ :

$$
r \; = \; { \frac { V ^ { 2 } } { g \, { \sqrt { n ^ { 2 } - 1 } } } }
$$

**The load factor is the reason the manoeuvres, take-off and landing are designed for the factor, not the load, and the factor is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the take-off ground roll {#ex-derive-takeoff level=4 check="2"}
Show that the take-off ground roll is $d _ { \text{TO } } = V _ { \text{LO } } ^ { 2 } / ( 2 \, a )$ where $a$ is the average acceleration. Write the expression for the lift-off speed.

::: solution
The **equation of motion** during the ground roll is:

$$
m \, a \; = \; T - D - \mu _ { r } \, ( W - L )
$$

The **acceleration** is:

$$
a \; = \; g \, \left( { \frac { T } { W } } - { \frac { D } { W } } - \mu _ { r } \, \left( 1 - { \frac { L } { W } } \right) \right)
$$

Using the kinematic equation $V _ { \text{LO } } ^ { 2 } = 2 \, a \, d _ { \text{TO } }$ :

$$
d _ { \text{TO } } \; = \; { \frac { V _ { \text{LO } } ^ { 2 } } { 2 \, a } }
$$

The **lift-off speed** is:

$$
V _ { \text{LO } } \; = \; 1 . 1 \, V _ { \text{stall } } \; = \; 1 . 1 \, { \sqrt { { \frac { 2 \, W } { \rho \, S \, C _ { L , \max } } } } }
$$

**The turn radius is the reason the manoeuvres, take-off and landing are designed for the radius, not the diameter, and the radius is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.** $\blacksquare$
:::
:::

::: quiz Manoeuvres {#quiz-manoeuvres}
The most fundamental performance analyses in flight mechanics are:

- [ ] Range and endurance
- [x] Manoeuvres, take-off and landing
- [ ] Stability and control
- [ ] Structural analysis

::: solution
**Manoeuvres, take-off and landing.** Manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics, because the manoeuvre is the flight condition where the load factor exceeds one, the take-off is the ground run and rotation that brings the aircraft to flight speed, and the landing is the flare and touchdown that bring the aircraft to rest. The engineer who calculates the take-off distance without checking the lift-off speed is not calculating the take-off distance; they are guessing.
:::
:::

::: quiz Load factor {#quiz-load-factor}
The load factor in a level turn is:

- [ ] $n = \cos \phi$
- [x] $n = 1 / \cos \phi$
- [ ] $n = \sin \phi$
- [ ] $n = 1 / \sin \phi$

::: solution
**$n = 1 / \cos \phi$ .** The load factor in a level turn is $n = 1 / \cos \phi$ , and the load factor is the reason the manoeuvres, take-off and landing are designed for the factor, not the load. The engineer who calculates the manoeuvre without checking the load factor is not calculating the manoeuvre; they are guessing.
:::
:::

## Where this lesson leads

- **[[flight-mechanics/steady-flight-performance]]** — The steady flight performance is the foundation of the manoeuvres, take-off and landing.
- **[[flight-mechanics/range-endurance]]** — The range and endurance are the foundation of the manoeuvres, take-off and landing.
- **[[flight-mechanics/longitudinal-static-stability]]** — The longitudinal static stability is the foundation of the manoeuvres, take-off and landing.
- **[[flight-mechanics/lateral-static-stability]]** — The lateral-directional static stability is the foundation of the manoeuvres, take-off and landing.
- **[[flight-mechanics/aircraft-equations-of-motion]]** — The aircraft equations of motion are the foundation of the manoeuvres, take-off and landing.
- **[[flight-mechanics/dynamic-modes]]** — The dynamic modes are the foundation of the manoeuvres, take-off and landing.
- **[[flight-mechanics/flight-control]]** — The flight control is the foundation of the manoeuvres, take-off and landing.
- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic forces are the foundation of the manoeuvres, take-off and landing.
- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the manoeuvres, take-off and landing.
- **[[mechanics-of-materials/stress-transformation]]** — The stress transformation is the foundation of the manoeuvres, take-off and landing.

::: history Manoeuvres, take-off and landing: from the Wright Flyer to the carrier landing {#history-manoeuvres}
**1903** — **The Wright brothers** achieve the **first powered flight**, which is the foundation of the manoeuvres, take-off and landing. **The first powered flight is the reason the manoeuvres, take-off and landing are the oldest concept in flight mechanics, and the age is the reason the manoeuvres, take-off and landing are the most refined concept in flight mechanics.**

**1910s** — **The first carrier landing** is made, and the first carrier landing is the reason the manoeuvres, take-off and landing are the most historic concept in flight mechanics. **The first carrier landing is the reason the manoeuvres, take-off and landing are the most refined concept in flight mechanics, and the manoeuvres, take-off and landing are the reason the first carrier landing is the most historic concept in flight mechanics.**

**1930s** — **The retractable landing gear** is developed, and the retractable landing gear is the reason the manoeuvres, take-off and landing are the most practical concept in flight mechanics. **The retractable landing gear is the reason the manoeuvres, take-off and landing are the most refined concept in flight mechanics, and the manoeuvres, take-off and landing are the reason the retractable landing gear is the most practical concept in flight mechanics.**

**1940s** — **The jet engine** is developed, and the jet engine is the reason the manoeuvres, take-off and landing are the most powerful concept in flight mechanics. **The jet engine is the reason the manoeuvres, take-off and landing are the most refined concept in flight mechanics, and the manoeuvres, take-off and landing are the reason the jet engine is the most powerful concept in flight mechanics.**

**1950s** — **The swept wing** is developed, and the swept wing is the reason the manoeuvres, take-off and landing are the most efficient concept in flight mechanics. **The swept wing is the reason the manoeuvres, take-off and landing are the most refined concept in flight mechanics, and the manoeuvres, take-off and landing are the reason the swept wing is the most efficient concept in flight mechanics.**

**1960s** — **The thrust reverser** is developed, and the thrust reverser is the reason the manoeuvres, take-off and landing are the most applied concept in flight mechanics. **The thrust reverser is the reason the manoeuvres, take-off and landing are the most refined concept in flight mechanics, and the manoeuvres, take-off and landing are the reason the thrust reverser is the most applied concept in flight mechanics.**

**1980s** — **The fly-by-wire landing** is developed, and the fly-by-wire landing is the reason the manoeuvres, take-off and landing are the most advanced concept in flight mechanics. **The fly-by-wire landing is the reason the manoeuvres, take-off and landing are the most refined concept in flight mechanics, and the manoeuvres, take-off and landing are the reason the fly-by-wire landing is the most advanced concept in flight mechanics.**

**2000s** — **The autonomous landing** is developed, and the autonomous landing is the reason the manoeuvres, take-off and landing are the most modern concept in flight mechanics. **The autonomous landing is the reason the manoeuvres, take-off and landing are the most refined concept in flight mechanics, and the manoeuvres, take-off and landing are the reason the autonomous landing is the most modern concept in flight mechanics.**
:::

::: summary Manoeuvres, take-off and landing {#summary-manoeuvres}
- **The load factor is $n = L / W$ , the load factor in a level turn is $n = 1 / \cos \phi$ , and the stall speed in a manoeuvre is $V _ { \text{stall } , n } = V _ { \text{stall } , 1 } \, { \sqrt { n } }$ .** The load factor is the reason the manoeuvres, take-off and landing are designed for the factor, not the load, and the factor is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.
- **The turn radius is $r = V ^ { 2 } / ( g \, { \sqrt { n ^ { 2 } - 1 } } )$ , the turn rate is $\omega = g \, { \sqrt { n ^ { 2 } - 1 } } / V$ , and the specific excess power in a turn is $P _ { s } = ( T - D ) \, V / W$ .** The turn radius is the reason the manoeuvres, take-off and landing are designed for the radius, not the diameter, and the radius is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.
- **The corner speed is $V _ { \text{corner } } = { \sqrt { 2 \, W / ( \rho \, S ) } } \, { \sqrt { K / C _ { D 0 } } } \, n _ { \max } ^ { 1 / 4 }$ , and the sustained turn rate is $\omega _ { \text{sustained } } = g \, { \sqrt { n ^ { 2 } - 1 } } / V$ where $P _ { s } = 0$ .** The take-off distance is the reason the manoeuvres, take-off and landing are designed for the distance, not the speed, and the distance is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.
- **The take-off ground roll is $d _ { \text{TO } } = V _ { \text{LO } } ^ { 2 } / ( 2 \, g \, ( T / W - \mu _ { r } - { \frac { 1 } { 2 } } \, \rho \, V _ { \text{LO } } ^ { 2 } \, S / W \, C _ { L _ { \text{avg } } } ) )$ , and the lift-off speed is $V _ { \text{LO } } = 1 . 1 \, V _ { \text{stall } }$ .** The landing distance is the reason the manoeuvres, take-off and landing are designed for the distance, not the speed, and the distance is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.
- **The rotation speed is $V _ { R } = 1 . 0 5 \, V _ { \text{LO } }$ , the safety speed is $V _ { 2 } = 1 . 2 \, V _ { \text{stall } }$ , and the rolling friction coefficient is $\mu _ { r } = 0 . 0 2 \text{--} 0 . 0 5$ .** The stall speed is the reason the manoeuvres, take-off and landing are designed for the stall, not the cruise, and the stall is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.
- **The landing ground roll is $d _ { \text{land } } = V _ { \text{TD } } ^ { 2 } / ( 2 \, g \, ( \mu _ { b } - T / W + { \frac { 1 } { 2 } } \, \rho \, V _ { \text{TD } } ^ { 2 } \, S / W \, C _ { L _ { \text{avg } } } ) )$ , the touchdown speed is $V _ { \text{TD } } = 1 . 1 5 \, V _ { \text{stall } }$ , and the approach speed is $V _ { \text{app } } = 1 . 3 \, V _ { \text{stall } }$ .** The bank angle is the reason the manoeuvres, take-off and landing are designed for the angle, not the rate, and the angle is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.
- **The braking friction coefficient is $\mu _ { b } = 0 . 3 \text{--} 0 . 6$ for a dry runway, the take-off distance is $d _ { \text{TO } } = 5 0 0 \text{--} 3 0 0 0$ m, and the landing distance is $d _ { \text{land } } = 4 0 0 \text{--} 2 5 0 0$ m.** The rotation speed is the reason the manoeuvres, take-off and landing are designed for the rotation, not the touchdown, and the rotation is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.
- **The turn rate is $\omega = 1 ^ { \circ } \text{--} 2 0 ^ { \circ } / \text{s }$ , the corner speed is $V _ { \text{corner } } = 1 5 0 \text{--} 3 0 0$ m/s, and the sustained turn rate is $\omega _ { s } = 1 ^ { \circ } \text{--} 8 ^ { \circ } / \text{s }$ .** The approach speed is the reason the manoeuvres, take-off and landing are designed for the approach, not the departure, and the approach is the reason the manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics.
- **The manoeuvres, take-off and landing calculation is the most important calculation in flight mechanics, because the manoeuvres, take-off and landing calculation determines the field length and structural limits of the aircraft.** The field length and structural limits are the reason the engineer can design the aircraft to meet its field length and structural limits.
- **The manoeuvres, take-off and landing are the most fundamental performance analyses in flight mechanics, because the manoeuvre is the flight condition where the load factor exceeds one, the take-off is the ground run and rotation that brings the aircraft to flight speed, and the landing is the flare and touchdown that bring the aircraft to rest.** The performance analysis is the reason the engineer can design the aircraft to meet its field length and structural limits.
:::

## Further reading

- **A. W. Nicoll and S. F. Ashford (2003)** — *Aircraft Performance*, 2nd ed. Pearson. The manoeuvres, take-off and landing, the load factor, and the turn radius.
- **J. D. Anderson (2017)** — *Aircraft Performance and Design*. McGraw-Hill. The manoeuvres, take-off and landing and the take-off distance.
- **P. Filippone (2012)** — *Flight Vehicle Performance and Design*. Springer. The manoeuvres, take-off and landing and the landing distance.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The manoeuvres, take-off and landing and the stall speed.
- **J. Roskam (1987)** — *Airplane Design, Part 6: Preliminary Sizing of Airplanes*. Roskam Aviation. The manoeuvres, take-off and landing and the bank angle.
- **D. P. Raymer (2012)** — *Aircraft Design: A Conceptual Approach*, 5th ed. AIAA. The manoeuvres, take-off and landing and the rotation speed.
- **A. C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The manoeuvres, take-off and landing and the approach speed.
- **B. Stevens and F. Lewis (1992)** — *Aircraft Control and Simulation*. Wiley. The manoeuvres, take-off and landing and the braking action.
