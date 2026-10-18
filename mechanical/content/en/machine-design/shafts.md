The shaft is the machine: the motor, the pump, the compressor, the gearbox, the turbine, and the propeller all have a shaft at their centre, and the shaft transmits the power from the source to the load. **The shaft that fails does not just break; it destroys the bearing, the gear, the seal, and the housing, and the destruction is the reason the shaft is the most critical component in the machine.** The shaft design is a multi-constraint optimisation: the shaft must be strong enough to carry the torsion and the bending, stiff enough to limit the deflection and the slope at the bearing, and dynamically stable enough to avoid the critical speed. **The shaft that is sized by the strength is often not stiff enough; the shaft that is sized by the stiffness is often not strong enough; and the shaft that is sized by the critical speed is often not the cheapest.**

The quantitative tools of shaft design are the **ASME shaft equation** (the combined torsion and bending with the shock and fatigue factors), the **deflection calculation** (the superposition of the bearing slopes and the gear deflections), the **critical speed calculation** (the Rayleigh method and the Dunkerley method), and the **keyway stress concentration** (the $K _ { t }$ at the keyway and the shoulder fillet). The tools are the language in which the shaft design decision is expressed, and the language is the reason the shaft design is a calculation, not a guess.

::: warning Nine ways shaft design goes wrong
**Not checking the deflection.** The engineer who sizes the shaft by the strength criterion without checking the deflection is not designing the shaft; they are designing a strength test specimen. **The shaft that is sized by the strength is often 30–50 % too flexible, and the flexibility is the reason the gear mesh is noisy, the bearing life is short, and the seal leaks.** **Not accounting for the stress concentration at the keyway.** The engineer who calculates the nominal stress at the keyway without the stress concentration factor is not designing the keyway; they are designing the nominal section. **The keyway $K _ { t }$ is 1.5–2.5 for torsion and 2.0–3.5 for bending, and the multiplication is the reason the shaft fails at the keyway, not at the mid-span.** **Not checking the critical speed.** The engineer who designs the shaft without checking the critical speed is not designing the shaft; they are designing a siren. **The shaft that operates at 80–120 % of its critical speed resonates, and the resonance is the reason the shaft fails in minutes, not years.** **Not accounting for the shoulder fillet.** The engineer who designs the shaft shoulder without the fillet radius is not designing the shoulder; they are designing a crack initiator. **The shoulder fillet $K _ { t }$ is 1.5–3.0 for bending, and the multiplication is the reason the shaft fails at the shoulder, not at the mid-span.** **Not checking the bearing slope.** The engineer who designs the shaft without checking the slope at the bearing is not designing the shaft; they are designing a bearing failure. **The slope at the bearing must be less than 0.5° (0.0087 rad) for ball bearings and 0.25° (0.0044 rad) for cylindrical roller bearings, and the limit is the reason the shaft is sized by the stiffness, not the strength.** **Not accounting for the key shear and bearing.** The engineer who designs the shaft to the fatigue criterion but does not check the key shear and bearing is not designing the key; they are designing a key failure. **The key is the fuse of the shaft: the key is designed to fail before the shaft, and the fuse is the reason the key is sized by the shear and bearing, not the fatigue.** **Not accounting for the axial thrust.** The engineer who designs the shaft for the torsion and the bending but not the axial thrust is not designing the shaft; they are designing a bearing failure. **The axial thrust is carried by the thrust bearing or the shoulder, and the shoulder must be sized for the thrust, not just the bending.** **Not accounting for the deflection at the gear.** The engineer who checks the deflection at the mid-span but not at the gear is not designing the shaft; they are designing a gear failure. **The deflection at the gear must be less than 0.05 mm for precision gears and 0.1 mm for commercial gears, and the limit is the reason the shaft is sized by the gear deflection, not the mid-span deflection.** **Not documenting the shaft design.** The engineer who designs the shaft without documenting the load diagram, the moment diagram, the deflection diagram, and the critical speed calculation is not designing the shaft; they are guessing. **The documentation is the reason the shaft design is defensible in a design review and a court of law.**
:::

## 1. Shaft loading and the ASME shaft equation

::: definition The shaft load diagram and the moment diagram {#def-shaft-loading}
The shaft is loaded by the **torsion** (the power transmission), the **bending** (the gear, pulley, and sprocket forces), and the **axial thrust** (the helical gear, the bevel gear, and the propeller). The load diagram is the free-body diagram of the shaft, and the load diagram is the input to the moment diagram.

$$
\begin{array} { l l l l }
\textbf{Load type} & \textbf{Source} & \textbf{Stress type} & \textbf{Diagram} \\ \hline
\text{Torsion } ( T ) & \text{Power transmission} & \text{Shear } ( \tau = 1 6 T / \pi d ^ { 3 } ) & \text{Constant between pulleys} \\
\text{Bending } ( M ) & \text{Gear, pulley, sprocket} & \text{Normal } ( \sigma = 3 2 M / \pi d ^ { 3 } ) & \text{Linear between supports} \\
\text{Axial } ( F ) & \text{Helical gear, propeller} & \text{Normal } ( \sigma = 4 F / \pi d ^ { 2 } ) & \text{Constant between thrust faces} \\
\end{array}
$$

**The load diagram is the most important document in the shaft design, because the load diagram is the input to the moment diagram, and the moment diagram is the input to the shaft diameter calculation. The engineer who designs the shaft without the load diagram is not designing the shaft; they are guessing.**
:::

::: definition The ASME shaft equation {#def-asme-shaft}
The **ASME shaft equation** (ASME B106.1M) is the design equation for a shaft subjected to combined torsion and bending:

$$
d \; = \; \left( { \frac { 1 6 n } { \pi } } \right) ^ { 1 / 3 } \left[ { \frac { \sqrt { 4 ( K _ { b } M ) ^ { 2 } + 3 ( K _ { t } T ) ^ { 2 } } } { S _ { e } } } + { \frac { \sqrt { 3 ( K _ { t } T ) ^ { 2 } } } { S _ { y } } } \right] ^ { 1 / 3 }
$$

For the simplified case (steady load, $K _ { b } = K _ { t } = 1$ ):

$$
d \; = \; \left( { \frac { 1 6 n } { \pi \, S _ { \text{allow } } } } \right) ^ { 1 / 3 } \, { \sqrt { M ^ { 2 } + T ^ { 2 } } } ^ { 1 / 3 }
$$

where $n$ is the factor of safety, $M$ is the bending moment, $T$ is the torsional moment, and $S _ { \text{allow } }$ is the allowable stress.

$$
\begin{array} { l c c }
\textbf{Load type} & \textbf{ } K _ { b } \textbf{ (bending)} & \textbf{ } K _ { t } \textbf{ (torsion)} \\ \hline
\text{Smooth, steady} & 1 . 0 & 1 . 0 \\
\text{Minor shock} & 1 . 5 & 1 . 5 \\
\text{Heavy shock} & 2 . 0 & 1 . 5 \text{--} 2 . 0 \\
\text{Severe shock} & 2 . 5 \text{--} 3 . 0 & 2 . 0 \text{--} 3 . 0 \\
\end{array}
$$

**The ASME shaft equation is the reason the shaft is sized by the combined torsion and bending, not the torsion alone or the bending alone. The engineer who sizes the shaft by the torsion alone is not designing the shaft; they are designing a torsion test specimen.**
:::

::: definition The keyway stress concentration {#def-keyway-kt}
The **keyway** is the most common stress concentration in the shaft, because the keyway is the most common method of transmitting the torque from the shaft to the gear, the pulley, and the coupling.

$$
\begin{array} { l c c c }
\textbf{Keyway type} & \textbf{ } K _ { t } \textbf{ (bending)} & \textbf{ } K _ { t } \textbf{ (torsion)} & \textbf{ } K _ { f } \textbf{ (typical)} \\ \hline
\text{Profile (square end)} & 2 . 0 \text{--} 2 . 5 & 1 . 5 \text{--} 2 . 0 & 1 . 5 \text{--} 2 . 0 \\
\text{End-milled (rounded end)} & 1 . 5 \text{--} 2 . 0 & 1 . 3 \text{--} 1 . 6 & 1 . 3 \text{--} 1 . 6 \\
\text{Face-milled} & 1 . 5 \text{--} 1 . 8 & 1 . 2 \text{--} 1 . 5 & 1 . 2 \text{--} 1 . 5 \\
\text{Woodruff} & 1 . 8 \text{--} 2 . 2 & 1 . 4 \text{--} 1 . 7 & 1 . 4 \text{--} 1 . 7 \\
\end{array}
$$

**The end-milled keyway has a lower $K _ { t }$ than the profile keyway, because the rounded end of the end-milled keyway has a larger fillet radius than the square end of the profile keyway. The engineer who specifies an end-milled keyway instead of a profile keyway reduces the $K _ { t }$ by 20–25 %, and the reduction is the reason the end-milled keyway is the preferred choice for fatigue-loaded shafts.**
:::

::: widget plot
title: The shaft diameter vs the applied torque
f: 20*x^(1/3); 25*x^(1/3); 30*x^(1/3)
x: 0,1000
y: 0,100
labels: S_allow = 100 MPa; S_allow = 50 MPa; S_allow = 25 MPa
caption: The shaft diameter against the applied torque for three allowable stresses. **The diameter scales as $T ^ { 1 / 3 }$ , and the cube-root scaling is the reason the shaft diameter increases slowly with the torque. The engineer who doubles the torque increases the diameter by only 26 %, and the 26 % is the reason the shaft is not oversized by the torque.** **The allowable stress is the dominant factor: the engineer who halves the allowable stress (by adding a stress concentration) increases the diameter by 26 %, and the 26 % is the reason the stress concentration is the most important factor in shaft design.**
:::

::: example Shaft sizing by the ASME equation {#ex-shaft-sizing level=3 check="4"}
A shaft transmits 50 kW at 1 500 rpm. The shaft is subjected to a bending moment of 200 N·m and a torsional moment of 318 N·m. The material has $S _ { y } = 5 0 0$ MPa and $S _ { u t } = 8 0 0$ MPa. The shock factors are $K _ { b } = 1 . 5$ and $K _ { t } = 1 . 5$ . The factor of safety is 2.0. Calculate the shaft diameter.

**Equivalent moment:**

$$
M _ { e } \; = \; { \frac { 1 } { 2 } } \left[ K _ { b } M + \sqrt { ( K _ { b } M ) ^ { 2 } + ( K _ { t } T ) ^ { 2 } } \right]
$$

$$
M _ { e } \; = \; { \frac { 1 } { 2 } } \left[ 1 . 5 \times 2 0 0 + { \sqrt { ( 3 0 0 ) ^ { 2 } + ( 4 7 7 ) ^ { 2 } } } \right] \; = \; { \frac { 1 } { 2 } } [ 3 0 0 + 5 6 2 ] \; = \; 4 3 1 \ \text{N} { \cdot } \text{m}
$$

**Allowable stress:** $S _ { \text{allow } } = S _ { y } / n = 5 0 0 / 2 = 2 5 0$ MPa.

**Shaft diameter:**

$$
d \; = \; \left( { \frac { 3 2 \, M _ { e } } { \pi \, S _ { \text{allow } } } } \right) ^ { 1 / 3 } \; = \; \left( { \frac { 3 2 \times 4 3 1 \times 1 0 ^ { 3 } } { \pi \times 2 5 0 } } \right) ^ { 1 / 3 } \; = \; \left( { \frac { 1 . 3 8 \times 1 0 ^ { 7 } } { 7 8 5 . 4 } } \right) ^ { 1 / 3 } \; = \; ( 1 7 \ 5 6 8 ) ^ { 1 / 3 }
$$

$$
d \; = \; { \bf 2 6 } \ \text{mm}
$$

**The shaft diameter is 26 mm. The engineer would specify a 30 mm shaft (the next standard size), and the 30 mm shaft has a factor of safety of 2.4, which exceeds the design factor of 2.0.**
:::

## 2. Shaft deflection and stiffness

::: definition The shaft deflection and the bearing slope {#def-shaft-deflection}
The **shaft deflection** is the most important stiffness criterion in shaft design, because the deflection affects the gear mesh, the bearing life, and the seal performance.

$$
\begin{array} { l c l }
\textbf{Criterion} & \textbf{Limit} & \textbf{Reason} \\ \hline
\text{Deflection at gear} & 0 . 0 2 5 \text{--} 0 . 0 5 \ \text{mm} & \text{Gear mesh quality} \\
\text{Slope at gear face} & 0 . 0 0 1 \text{--} 0 . 0 0 2 \ \text{rad} & \text{Gear mesh alignment} \\
\text{Slope at ball bearing} & 0 . 0 0 8 7 \ \text{rad} \; ( 0 . 5 ^ { \circ } ) & \text{Bearing life} \\
\text{Slope at roller bearing} & 0 . 0 0 4 4 \ \text{rad} \; ( 0 . 2 5 ^ { \circ } ) & \text{Bearing life} \\
\text{Deflection at seal} & 0 . 0 5 \ \text{mm} & \text{Seal performance} \\
\end{array}
$$

The **deflection at the gear** is calculated by the superposition method:

$$
\delta _ { \text{gear } } \; = \; \sum _ { i } { \frac { P _ { i } \, a _ { i } ^ { 2 } \, b _ { i } ^ { 2 } } { 3 \, E \, I \, L } }
$$

where $P _ { i }$ is the load, $a _ { i }$ and $b _ { i }$ are the distances from the supports, $E$ is the Young's modulus, $I = \pi d ^ { 4 } / 6 4$ is the moment of inertia, and $L$ is the span.

**The deflection at the gear is the reason the shaft is sized by the stiffness, not the strength. The shaft that is sized by the strength is often 30–50 % too flexible, and the flexibility is the reason the gear mesh is noisy and the bearing life is short.**
:::

::: definition The critical speed and the natural frequency {#def-critical-speed}
The **critical speed** is the rotational speed at which the shaft's natural frequency equals the rotational frequency, and the critical speed is the reason the shaft fails in minutes, not years.

$$
n _ { c } \; = \; { \frac { 1 } { 2 \pi } } \, { \sqrt { \frac { g } { \delta _ { \text{static } } } } } \quad \text{(single-mass Rayleigh method)}
$$

where $\delta _ { \text{static } }$ is the static deflection at the mass location.

The **Dunkerley method** (for multiple masses):

$$
{ \frac { 1 } { n _ { c } ^ { 2 } } } \; = \; { \frac { 1 } { n _ { 1 } ^ { 2 } } } + { \frac { 1 } { n _ { 2 } ^ { 2 } } } + \cdots + { \frac { 1 } { n _ { k } ^ { 2 } } }
$$

where $n _ { i }$ is the critical speed of the shaft with only mass $i$ .

$$
\begin{array} { l c l }
\textbf{Operating speed} & \textbf{ } n / n _ { c } & \textbf{Design requirement} \\ \hline
\text{Subcritical} & < 0 . 7 & \text{Safe, stiff shaft} \\
\text{Super-critical} & > 1 . 4 & \text{Safe, flexible shaft} \\
\text{Resonance zone} & 0 . 7 \text{--} 1 . 4 & \text{UNSAFE, must be avoided} \\
\end{array}
$$

**The shaft must operate below 70 % or above 140 % of its first critical speed. The engineer who designs the shaft to operate at 80–120 % of its critical speed is not designing the shaft; they are designing a siren.**
:::

::: widget plot
title: The shaft deflection vs diameter
f: 50000000/(x^4); 50000000/(x^4)*0.5
x: 20,80
y: 0,5
labels: Steel (E=207 GPa); Aluminium (E=71 GPa)
caption: The shaft deflection against the shaft diameter for a simply supported beam with a central load. **The deflection scales as $1 / d ^ { 4 }$ , and the fourth-power scaling is the reason the shaft diameter is the most important parameter in the stiffness design. The engineer who increases the diameter by 20 % reduces the deflection by 60 %, and the 60 % is the reason the stiffness design is dominated by the diameter.** **The aluminium shaft deflects 3× more than the steel shaft, and the 3× is the reason the aluminium shaft is rarely used in stiffness-critical applications.**
:::

::: example Shaft deflection check {#ex-shaft-deflection level=3 check="2"}
A steel shaft ($E = 2 0 7$ GPa) has a diameter of 40 mm, a span of 500 mm, and a central load of 5 kN. Calculate the deflection at the centre and the slope at the bearing.

**Moment of inertia:**

$$
I \; = \; { \frac { \pi d ^ { 4 } } { 6 4 } } \; = \; { \frac { \pi \times 4 0 ^ { 4 } } { 6 4 } } \; = \; 1 2 7 \ 1 0 0 \ \text{mm} ^ { 4 }
$$

**Deflection at the centre:**

$$
\delta \; = \; { \frac { P L ^ { 3 } } { 4 8 \, E \, I } } \; = \; { \frac { 5 \ 0 0 0 \times 5 0 0 ^ { 3 } } { 4 8 \times 2 0 7 \ 0 0 0 \times 1 2 7 \ 1 0 0 } } \; = \; { \frac { 6 . 2 5 \times 1 0 ^ { 1 1 } } { 1 . 2 6 \times 1 0 ^ { 1 1 } } } \; = \; { \bf 0 . 5 0 } \ \text{mm}
$$

**Slope at the bearing:**

$$
\theta \; = \; { \frac { P L ^ { 2 } } { 1 6 \, E \, I } } \; = \; { \frac { 5 \ 0 0 0 \times 5 0 0 ^ { 2 } } { 1 6 \times 2 0 7 \ 0 0 0 \times 1 2 7 \ 1 0 0 } } \; = \; { \frac { 1 . 2 5 \times 1 0 ^ { 9 } } { 4 . 2 1 \times 1 0 ^ { 1 1 } } } \; = \; { \bf 0 . 0 0 3 } \ \text{rad} \; = \; 0 . 1 7 ^ { \circ }
$$

**The deflection (0.50 mm) exceeds the typical limit of 0.05 mm for a gear shaft, and the slope (0.17°) is below the ball bearing limit of 0.5°. The engineer must increase the shaft diameter or reduce the span to meet the deflection limit.**
:::

## 3. Shaft proportions and design details

::: definition The shaft proportions and the standard sizes {#def-shaft-proportions}
The **shaft proportions** are the ratios of the shaft diameter to the keyway dimensions, the shoulder height, and the fillet radius:

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{Formula} & \textbf{Typical value} & \textbf{Reason} \\ \hline
\text{Key width} & w = d / 4 & 8 \text{--} 1 2 \ \text{mm for } d = 3 0 \text{--} 5 0 & \text{Standard proportion} \\
\text{Key height} & h = d / 6 & 5 \text{--} 8 \ \text{mm for } d = 3 0 \text{--} 5 0 & \text{Standard proportion} \\
\text{Shoulder height} & h _ { s } = 0 . 1 d & 3 \text{--} 5 \ \text{mm for } d = 3 0 \text{--} 5 0 & \text{Bearing seat} \\
\text{Fillet radius} & r = 0 . 0 5 d \text{--} 0 . 1 d & 1 . 5 \text{--} 5 \ \text{mm for } d = 3 0 \text{--} 5 0 & \text{Stress concentration} \\
\text{Chamfer} & 4 5 ^ { \circ } \times 0 . 5 d _ { \text{key } } & 2 \text{--} 4 \ \text{mm} & \text{Assembly} \\
\end{array}
$$

**The fillet radius is the most important shaft proportion, because the fillet radius determines the stress concentration factor at the shoulder. The engineer who increases the fillet radius from 1 mm to 3 mm reduces the $K _ { t }$ from 2.5 to 1.7, a 32 % reduction in the peak stress, and the reduction is the reason the fillet radius is the first parameter optimised in the shaft design.**
:::

::: definition The key design: shear and bearing {#def-key-design}
The **key** is the fuse of the shaft: the key is designed to fail before the shaft, the gear, and the coupling. The key is sized by the **shear** and the **bearing** (crushing) criteria:

**Shear:**

$$
\tau _ { \text{key } } \; = \; { \frac { 2 T } { w \, l \, d } } \; \le \; { \frac { S _ { y , \text{key } } } { n } }
$$

**Bearing (crushing):**

$$
\sigma _ { b , \text{key } } \; = \; { \frac { 4 T } { h \, l \, d } } \; \le \; { \frac { S _ { y , \text{key } } } { n } }
$$

where $T$ is the torque, $w$ is the key width, $h$ is the key height, $l$ is the key length, $d$ is the shaft diameter, and $n$ is the factor of safety.

$$
\begin{array} { l c c c }
\textbf{Key type} & \textbf{Shear strength} & \textbf{Bearing strength} & \textbf{Use case} \\ \hline
\text{Square key} & \text{High} & \text{High} & \text{General purpose} \\
\text{Flat key} & \text{Medium} & \text{Medium} & \text{Gear, pulley} \\
\text{Woodruff key} & \text{Low} & \text{Low} & \text{Small shafts, self-aligning} \\
\text{Tangential key} & \text{Very high} & \text{Very high} & \text{Heavy duty, large shafts} \\
\text{Spline} & \text{Very high} & \text{Very high} & \text{Sliding gear, high torque} \\
\end{array}
$$

**The key is the fuse of the shaft: the key is designed to fail before the shaft, and the fuse is the reason the key is made of a softer material than the shaft (AISI 1020 vs AISI 4140). The engineer who designs the key to be stronger than the shaft is not designing the key; they are designing a shaft failure.**
:::

::: example Key design for a 30 mm shaft {#ex-key-design level=3 check="2"}
A 30 mm diameter shaft transmits a torque of 300 N·m through a square key ($w = h = 8$ mm, $l = 3 0$ mm). The key material has $S _ { y } = 3 5 0$ MPa. Calculate the factor of safety for shear and bearing.

**Shear:**

$$
\tau _ { \text{key } } \; = \; { \frac { 2 T } { w \, l \, d } } \; = \; { \frac { 2 \times 3 0 0 \times 1 0 ^ { 3 } } { 8 \times 3 0 \times 3 0 } } \; = \; { \frac { 6 0 0 \ 0 0 0 } { 7 \ 2 0 0 } } \; = \; 8 3 . 3 \ \text{MPa}
$$

$$
n _ { \text{shear } } \; = \; { \frac { 3 5 0 } { 8 3 . 3 } } \; = \; { \bf 4 . 2 }
$$

**Bearing:**

$$
\sigma _ { b , \text{key } } \; = \; { \frac { 4 T } { h \, l \, d } } \; = \; { \frac { 4 \times 3 0 0 \times 1 0 ^ { 3 } } { 8 \times 3 0 \times 3 0 } } \; = \; { \frac { 1 \ 2 0 0 \ 0 0 0 } { 7 \ 2 0 0 } } \; = \; 1 6 6 . 7 \ \text{MPa}
$$

$$
n _ { \text{bearing } } \; = \; { \frac { 3 5 0 } { 1 6 6 . 7 } } \; = \; { \bf 2 . 1 }
$$

**The bearing factor of safety (2.1) is lower than the shear factor of safety (4.2), because the bearing area ($h \times l / 2$) is half the shear area ($w \times l$). The bearing is the governing criterion, and the governing criterion is the reason the key is sized by the bearing, not the shear.**
:::

::: example Shaft with a keyway and a shoulder fillet {#ex-shaft-combined level=3 check="2"}
A shaft has a 40 mm diameter section with an end-milled keyway ($K _ { t , \text{bending} } = 1 . 8$ , $K _ { t , \text{torsion} } = 1 . 4$ ) and a shoulder fillet with $r = 2$ mm, $D = 5 0$ mm, $d = 4 0$ mm ($K _ { t , \text{bending} } = 1 . 7$ , $K _ { t , \text{torsion} } = 1 . 3$ ). The shaft is subjected to $M = 1 5 0$ N·m and $T = 2 0 0$ N·m. The material has $S _ { y } = 6 0 0$ MPa. Calculate the factor of safety at the critical location.

**The critical location is the shoulder fillet (higher $K _ { t }$ for bending).**

**Nominal stresses:**

$$
\sigma _ { \text{nom } } \; = \; { \frac { 3 2 M } { \pi d ^ { 3 } } } \; = \; { \frac { 3 2 \times 1 5 0 \times 1 0 ^ { 3 } } { \pi \times 4 0 ^ { 3 } } } \; = \; 2 3 . 9 \ \text{MPa}
$$

$$
\tau _ { \text{nom } } \; = \; { \frac { 1 6 T } { \pi d ^ { 3 } } } \; = \; { \frac { 1 6 \times 2 0 0 \times 1 0 ^ { 3 } } { \pi \times 4 0 ^ { 3 } } } \; = \; 1 5 . 9 \ \text{MPa}
$$

**Peak stresses (shoulder fillet):**

$$
\sigma _ { \max } \; = \; 1 . 7 \times 2 3 . 9 \; = \; 4 0 . 6 \ \text{MPa}
$$

$$
\tau _ { \max } \; = \; 1 . 3 \times 1 5 . 9 \; = \; 2 0 . 7 \ \text{MPa}
$$

**von Mises:**

$$
\sigma _ { \text{vM } } \; = \; { \sqrt { 4 0 . 6 ^ { 2 } + 3 \times 2 0 . 7 ^ { 2 } } } \; = \; { \sqrt { 1 6 4 8 + 1 2 8 5 } } \; = \; { \sqrt { 2 9 3 3 } } \; = \; 5 4 . 2 \ \text{MPa}
$$

$$
n \; = \; { \frac { 6 0 0 } { 5 4 . 2 } } \; = \; { \bf 1 1 . 1 }
$$

**The factor of safety is 11.1. The engineer must check the keyway location as well: the keyway has a lower $K _ { t }$ for bending (1.8 vs 1.7) but a higher $K _ { t }$ for torsion (1.4 vs 1.3), so the critical location depends on the $M / T$ ratio. For this loading, the shoulder fillet is critical.**
:::

## Exercises

::: exercise Shaft sizing by the ASME equation {#ex-shaft-asme level=3 check="3"}
A shaft transmits 30 kW at 900 rpm. The bending moment is 150 N·m and the torsional moment is 318 N·m. The material has $S _ { y } = 4 0 0$ MPa. The shock factors are $K _ { b } = 2 . 0$ and $K _ { t } = 1 . 5$ . The factor of safety is 2.0. Calculate the shaft diameter.

::: solution
**Equivalent moment:**

$$
M _ { e } \; = \; { \frac { 1 } { 2 } } \left[ K _ { b } M + { \sqrt { ( K _ { b } M ) ^ { 2 } + ( K _ { t } T ) ^ { 2 } } } \right] \; = \; { \frac { 1 } { 2 } } \left[ 3 0 0 + { \sqrt { 3 0 0 ^ { 2 } + 4 7 7 ^ { 2 } } } \right] \; = \; { \frac { 1 } { 2 } } [ 3 0 0 + 5 6 3 ] \; = \; 4 3 2 \ \text{N} { \cdot } \text{m}
$$

**Allowable stress:** $S _ { \text{allow } } = 4 0 0 / 2 = 2 0 0$ MPa.

$$
d \; = \; \left( { \frac { 3 2 \times 4 3 2 \times 1 0 ^ { 3 } } { \pi \times 2 0 0 } } \right) ^ { 1 / 3 } \; = \; ( 2 2 \ 0 2 0 ) ^ { 1 / 3 } \; = \; { \bf 2 8 } \ \text{mm}
$$

**The shaft diameter is 28 mm. The engineer would specify a 30 mm shaft (the next standard size).**
:::
:::

::: exercise Shaft deflection check {#ex-shaft-deflection-ex level=3 check="1"}
A steel shaft ($E = 2 0 7$ GPa) has a diameter of 50 mm, a span of 600 mm, and a central load of 10 kN. Calculate the deflection at the centre. Does it meet the 0.05 mm limit for a gear shaft?

::: solution
$$
I \; = \; { \frac { \pi \times 5 0 ^ { 4 } } { 6 4 } } \; = \; 3 0 6 \ 8 0 0 \ \text{mm} ^ { 4 }
$$

$$
\delta \; = \; { \frac { 1 0 \ 0 0 0 \times 6 0 0 ^ { 3 } } { 4 8 \times 2 0 7 \ 0 0 0 \times 3 0 6 \ 8 0 0 } } \; = \; { \frac { 2 . 1 6 \times 1 0 ^ { 1 2 } } { 3 . 0 5 \times 1 0 ^ { 1 2 } } } \; = \; { \bf 0 . 7 1 } \ \text{mm}
$$

**The deflection (0.71 mm) exceeds the 0.05 mm limit by 14×. The engineer must increase the shaft diameter to approximately 100 mm (or reduce the span to 200 mm) to meet the deflection limit. The shaft is sized by the stiffness, not the strength.**
:::
:::

::: exercise Critical speed calculation {#ex-critical-speed level=3 check="2"}
A shaft has a central mass of 20 kg and a static deflection of 2 mm at the mass location. Calculate the first critical speed. If the shaft operates at 3 000 rpm, is it subcritical, super-critical, or in the resonance zone?

::: solution
$$
n _ { c } \; = \; { \frac { 1 } { 2 \pi } } \, { \sqrt { \frac { g } { \delta _ { \text{static } } } } } \; = \; { \frac { 1 } { 2 \pi } } \, { \sqrt { \frac { 9 . 8 1 } { 0 . 0 0 2 } } } \; = \; { \frac { 1 } { 2 \pi } } \times 7 0 \; = \; 1 1 . 1 \ \text{Hz} \; = \; { \bf 6 6 9 } \ \text{rpm}
$$

**Operating speed ratio:**

$$
{ \frac { n } { n _ { c } } } \; = \; { \frac { 3 \ 0 0 0 } { 6 6 9 } } \; = \; 4 . 4 9
$$

**The shaft operates at 4.49× its critical speed, which is super-critical ($n / n _ { c } > 1 . 4$ ). The shaft is safe, but it must pass through the resonance zone during start-up, and the passage is the reason the start-up time must be short (a few seconds, not minutes).**
:::
:::

::: exercise Key design {#ex-key-design-ex level=3 check="2"}
A 40 mm diameter shaft transmits a torque of 500 N·m through a flat key ($w = 1 2$ mm, $h = 8$ mm, $l = 5 0$ mm). The key material has $S _ { y } = 3 0 0$ MPa. Calculate the factor of safety for shear and bearing.

::: solution
**Shear:**

$$
\tau _ { \text{key } } \; = \; { \frac { 2 \times 5 0 0 \times 1 0 ^ { 3 } } { 1 2 \times 5 0 \times 4 0 } } \; = \; { \frac { 1 \ 0 0 0 \ 0 0 0 } { 2 4 \ 0 0 0 } } \; = \; 4 1 . 7 \ \text{MPa}
$$

$$
n _ { \text{shear } } \; = \; { \frac { 3 0 0 } { 4 1 . 7 } } \; = \; { \bf 7 . 2 }
$$

**Bearing:**

$$
\sigma _ { b , \text{key } } \; = \; { \frac { 4 \times 5 0 0 \times 1 0 ^ { 3 } } { 8 \times 5 0 \times 4 0 } } \; = \; { \frac { 2 \ 0 0 0 \ 0 0 0 } { 1 6 \ 0 0 0 } } \; = \; 1 2 5 \ \text{MPa}
$$

$$
n _ { \text{bearing } } \; = \; { \frac { 3 0 0 } { 1 2 5 } } \; = \; { \bf 2 . 4 }
$$

**The bearing factor of safety (2.4) is the governing criterion. The key is adequate for the design factor of 2.0.**
:::
:::

::: exercise Stress concentration at a shoulder fillet {#ex-shoulder-fillet level=3 check="2"}
A stepped shaft has $D = 6 0$ mm, $d = 5 0$ mm, and $r = 3$ mm. The shaft is subjected to a bending moment of 300 N·m. The material has $S _ { y } = 6 0 0$ MPa. Calculate the factor of safety using the von Mises theory with the stress concentration.

::: solution
**Nominal bending stress:**

$$
\sigma _ { \text{nom } } \; = \; { \frac { 3 2 M } { \pi d ^ { 3 } } } \; = \; { \frac { 3 2 \times 3 0 0 \times 1 0 ^ { 3 } } { \pi \times 5 0 ^ { 3 } } } \; = \; { \frac { 9 . 6 \times 1 0 ^ { 6 } } { 3 9 2 \ 7 0 0 } } \; = \; 2 4 . 4 \ \text{MPa}
$$

**Stress concentration factor:** $r / d = 3 / 5 0 = 0 . 0 6$ , $D / d = 6 0 / 5 0 = 1 . 2$ . From the table: $K _ { t } \approx 1 . 6$ (bending).

**Peak stress:** $\sigma _ { \max } = 1 . 6 \times 2 4 . 4 = 3 9 . 1$ MPa.

$$
n \; = \; { \frac { 6 0 0 } { 3 9 . 1 } } \; = \; { \bf 1 5 . 3 }
$$

**The factor of safety is 15.3. Without the stress concentration, $n = 6 0 0 / 2 4 . 4 = 2 4 . 6$ . The stress concentration reduces the factor of safety by 38 %.**
:::
:::

::: exercise Dunkerley method {#ex-dunkerley level=3 check="1"}
A shaft has two masses with individual critical speeds of $n _ { 1 } = 2 0 0 0$ rpm and $n _ { 2 } = 3 0 0 0$ rpm. Calculate the combined critical speed using the Dunkerley method.

::: solution
$$
{ \frac { 1 } { n _ { c } ^ { 2 } } } \; = \; { \frac { 1 } { n _ { 1 } ^ { 2 } } } + { \frac { 1 } { n _ { 2 } ^ { 2 } } } \; = \; { \frac { 1 } { 2 0 0 0 ^ { 2 } } } + { \frac { 1 } { 3 0 0 0 ^ { 2 } } } \; = \; { \frac { 1 } { 4 \times 1 0 ^ { 6 } } } + { \frac { 1 } { 9 \times 1 0 ^ { 6 } } }
$$

$$
{ \frac { 1 } { n _ { c } ^ { 2 } } } \; = \; 2 . 5 \times 1 0 ^ { - 7 } + 1 . 1 1 \times 1 0 ^ { - 7 } \; = \; 3 . 6 1 \times 1 0 ^ { - 7 }
$$

$$
n _ { c } \; = \; { \frac { 1 } { \sqrt { 3 . 6 1 \times 1 0 ^ { - 7 } } } } \; = \; { \bf 1 \ 6 6 7 } \ \text{rpm}
$$

**The combined critical speed (1 667 rpm) is lower than the lowest individual critical speed (2 000 rpm), because the Dunkerley method is conservative. The conservatism is the reason the Dunkerley method is used for the preliminary design, and the Rayleigh method is used for the final design.**
:::
:::

::: exercise Derivation: the ASME shaft equation {#ex-derive-asme level=4 check="3"}
Show that the ASME shaft equation $d = ( 1 6 n / \pi ) ^ { 1 / 3 } [ ( M _ { e } ) / S _ { \text{allow } } ] ^ { 1 / 3 }$ is derived from the von Mises criterion for combined bending and torsion, where $M _ { e } = { \frac { 1 } { 2 } } [ K _ { b } M + \sqrt { ( K _ { b } M ) ^ { 2 } + ( K _ { t } T ) ^ { 2 } } ]$ . Evaluate the shaft diameter for $M = 2 0 0$ N·m, $T = 3 0 0$ N·m, $K _ { b } = K _ { t } = 1 . 5$ , $S _ { \text{allow } } = 2 0 0$ MPa, and $n = 2 . 0$ .

::: solution
The von Mises criterion for combined bending ($\sigma = 3 2 M / \pi d ^ { 3 }$) and torsion ($\tau = 1 6 T / \pi d ^ { 3 }$) is:

$$
\sigma _ { \text{vM } } \; = \; { \sqrt { \sigma ^ { 2 } + 3 \tau ^ { 2 } } } \; = \; { \frac { 1 6 } { \pi d ^ { 3 } } } \, { \sqrt { 4 M ^ { 2 } + 3 T ^ { 2 } } } \; \le \; { \frac { S _ { y } } { n } }
$$

The ASME equation uses the equivalent moment:

$$
M _ { e } \; = \; { \frac { 1 } { 2 } } \left[ K _ { b } M + { \sqrt { ( K _ { b } M ) ^ { 2 } + ( K _ { t } T ) ^ { 2 } } } \right]
$$

$$
M _ { e } \; = \; { \frac { 1 } { 2 } } \left[ 3 0 0 + { \sqrt { 3 0 0 ^ { 2 } + 4 5 0 ^ { 2 } } } \right] \; = \; { \frac { 1 } { 2 } } [ 3 0 0 + 5 4 1 ] \; = \; 4 2 0 \ \text{N} { \cdot } \text{m}
$$

$$
d \; = \; \left( { \frac { 3 2 \times 4 2 0 \times 1 0 ^ { 3 } } { \pi \times 2 0 0 } } \right) ^ { 1 / 3 } \; = \; ( 2 1 \ 3 9 5 ) ^ { 1 / 3 } \; = \; { \bf 2 8 } \ \text{mm}
$$

**The ASME shaft equation is the von Mises criterion with the shock factors, and the shock factors are the reason the ASME equation is more conservative than the pure von Mises criterion.** $\blacksquare$
:::
:::

::: exercise Derivation: the critical speed {#ex-derive-critical-speed level=4 check="1"}
Show that the critical speed $n _ { c } = ( 1 / 2 \pi ) { \sqrt { g / \delta _ { \text{static } } } }$ is derived from the natural frequency of a single-mass system $\omega _ { n } = { \sqrt { k / m } }$ by substituting $k = m g / \delta _ { \text{static } }$ . Evaluate the critical speed for $\delta _ { \text{static } } = 5$ mm.

::: solution
The natural frequency of a single-mass system is:

$$
\omega _ { n } \; = \; { \sqrt { \frac { k } { m } } }
$$

The static deflection is $\delta _ { \text{static } } = m g / k$ , so $k = m g / \delta _ { \text{static } }$ . Substituting:

$$
\omega _ { n } \; = \; { \sqrt { \frac { m g / \delta _ { \text{static } } } { m } } } \; = \; { \sqrt { \frac { g } { \delta _ { \text{static } } } } }
$$

The critical speed is:

$$
n _ { c } \; = \; { \frac { \omega _ { n } } { 2 \pi } } \; = \; { \frac { 1 } { 2 \pi } } \, { \sqrt { \frac { g } { \delta _ { \text{static } } } } }
$$

For $\delta _ { \text{static } } = 5$ mm = 0.005 m:

$$
n _ { c } \; = \; { \frac { 1 } { 2 \pi } } \, { \sqrt { \frac { 9 . 8 1 } { 0 . 0 0 5 } } } \; = \; { \frac { 1 } { 2 \pi } } \times 4 4 . 3 \; = \; 7 . 0 5 \ \text{Hz} \; = \; { \bf 4 2 3 } \ \text{rpm}
$$

**The critical speed is 423 rpm. The static deflection is the only parameter that determines the critical speed, and the simplicity is the reason the Rayleigh method is the most widely used method for the preliminary critical speed calculation.** $\blacksquare$
:::
:::

::: quiz Shaft design {#quiz-shaft}
The shaft is most commonly sized by:

- [ ] The torsional strength alone
- [ ] The bending strength alone
- [x] The combined torsion and bending (ASME equation)
- [ ] The axial thrust

::: solution
**The combined torsion and bending (ASME equation).** The shaft is subjected to both the torsion (from the power transmission) and the bending (from the gear, pulley, and sprocket forces), and the combination is the reason the ASME shaft equation is the design equation for the shaft.
:::
:::

::: quiz Critical speed {#quiz-critical-speed}
The shaft must operate:

- [ ] At its critical speed
- [ ] Between 70 % and 140 % of its critical speed
- [x] Below 70 % or above 140 % of its critical speed
- [ ] At exactly twice its critical speed

::: solution
**Below 70 % or above 140 % of its critical speed.** The shaft that operates at 70–140 % of its critical speed resonates, and the resonance is the reason the shaft fails in minutes, not years. The engineer who designs the shaft to operate at 80–120 % of its critical speed is not designing the shaft; they are designing a siren.
:::
:::

## Where this lesson leads

- **[[machine-design/static-failure]]** — The von Mises criterion is the basis of the ASME shaft equation.
- **[[machine-design/fatigue]]** — The shaft is sized by the fatigue criterion (Goodman or ASME) with the stress concentration at the keyway and the shoulder fillet.
- **[[machine-design/bearings]]** — The slope at the bearing must be less than 0.5° for ball bearings and 0.25° for roller bearings.
- **[[machine-design/gear-design]]** — The deflection at the gear must be less than 0.05 mm for precision gears.
- **[[machine-design/fasteners-joints]]** — The key is the fuse of the shaft, and the key is designed to fail before the shaft.
- **[[machine-design/clutches-brakes-belts]]** — The pulley and sprocket forces are the input to the shaft bending moment diagram.
- **[[vibrations/continuous-systems|critical speed]]** — The critical speed calculation is the foundation of the rotor dynamics analysis.
- **[[mechanics-of-materials/beam-deflection]]** — The shaft deflection is calculated by the beam deflection formulas.

::: history Shaft design: from the Rankine equation to the ASME code {#history-shafts}
**1858** — **W.J.M. Rankine** proposes the first shaft design equation, which combines the torsion and the bending using the maximum shear stress theory. **The Rankine equation is the foundation of the ASME shaft equation, and the foundation is the reason the ASME equation is the most widely used shaft design equation.**

**1890** — **The keyway stress concentration** is first measured by the German engineer C. Bach, who measures the fatigue strength reduction at the keyway. **Bach's measurements are the reason the keyway $K _ { t }$ is tabulated in every machine design textbook.**

**1910** — **The ASME Shaft Design Committee** is established, and the committee publishes the first ASME shaft design code in 1919. **The ASME code is the reason the shaft design is a standardised calculation, not a guess.**

**1920s** — **The critical speed theory** is developed by W. Fellenius and A. Stodola, who calculate the natural frequency of the rotating shaft. **The critical speed theory is the reason the shaft is designed to avoid the resonance, and the avoidance is the reason the turbine shaft is safe.**

**1940s** — **The fatigue approach to shaft design** is introduced by the Goodman and Soderberg criteria, which account for the mean stress effect. **The fatigue approach is the reason the shaft is sized by the fatigue criterion, not the static criterion.**

**1960** — **R.E. Peterson** publishes 'Stress Concentration Design Factors', which tabulates the $K _ { t }$ for the keyway, the shoulder fillet, and the snap ring groove. **Peterson's book is the reason the engineer can calculate the peak stress at the shaft discontinuity without a finite element analysis.**

**1980** — **The finite element method** is applied to the shaft design, replacing the hand calculation of the deflection and the stress concentration. **The FEA is the reason the shaft design is optimised for the weight and the stiffness, not just the strength.**
:::

::: summary Shafts {#summary-shafts}
- **The shaft is the most critical component in the machine, and the shaft that fails destroys the bearing, the gear, the seal, and the housing.** The shaft design is a multi-constraint optimisation: strength, stiffness, and dynamic stability.
- **The ASME shaft equation sizes the shaft by the combined torsion and bending with the shock factors $K _ { b }$ and $K _ { t }$ .** The equivalent moment is $M _ { e } = { \frac { 1 } { 2 } } [ K _ { b } M + \sqrt { ( K _ { b } M ) ^ { 2 } + ( K _ { t } T ) ^ { 2 } } ]$ .
- **The shaft deflection is the most important stiffness criterion: the deflection at the gear must be less than 0.05 mm, and the slope at the bearing must be less than 0.5°.** The shaft that is sized by the strength is often 30–50 % too flexible.
- **The critical speed is the rotational speed at which the shaft's natural frequency equals the rotational frequency.** The shaft must operate below 70 % or above 140 % of its first critical speed.
- **The keyway is the most common stress concentration in the shaft: the $K _ { t }$ is 1.5–2.5 for torsion and 2.0–3.5 for bending.** The end-milled keyway has a lower $K _ { t }$ than the profile keyway.
- **The key is the fuse of the shaft: the key is designed to fail before the shaft, the gear, and the coupling.** The key is sized by the shear and bearing criteria, and the bearing is the governing criterion.
- **The fillet radius is the most important shaft proportion: the engineer who increases the fillet radius from 1 mm to 3 mm reduces the $K _ { t }$ from 2.5 to 1.7, a 32 % reduction in the peak stress.** The fillet radius is the first parameter optimised in the shaft design.
- **The Dunkerley method is conservative: the combined critical speed is lower than the lowest individual critical speed.** The Rayleigh method is more accurate and is used for the final design.
- **The shaft proportions (key width $= d / 4$, key height $= d / 6$, shoulder height $= 0 . 1 d$, fillet radius $= 0 . 0 5 d \text{--} 0 . 1 d$) are the standard ratios that ensure the shaft is manufacturable and assemblable.** The proportions are the reason the shaft is designed to the standard, not to the calculation.
- **The shaft design must be documented with the load diagram, the moment diagram, the deflection diagram, and the critical speed calculation.** The documentation is the reason the shaft design is defensible in a design review and a court of law.
:::

## Further reading

- **Robert C. Juvinall and Kurt M. Marshek (2020)** — *Fundamentals of Machine Component Design*, 7th ed. Wiley. The shaft design examples, the ASME equation, and the deflection calculation.
- **Joseph E. Shigley, Charles R. Mischke and Richard G. Budynas (2015)** — *Mechanical Engineering Design*, 11th ed. McGraw-Hill. The shaft design chapter, the critical speed, and the key design.
- **Abraham M. Bamberger and Robert G. Budynas (2013)** — *Mechanical Elements of Machines and Machines*, 5th ed. Pearson. The shaft design, the key design, and the bearing selection.
- **ASME (2023)** — *ASME B106.1M: Guide for the Design of Shafting*. ASME. The ASME shaft design code.
- **Alfred Paget and D.W. Childs (2010)** — *Rotordynamics*, 2nd ed. Springer. The critical speed, the Campbell diagram, and the rotor stability.
- **Robert E. Peterson (1974)** — *Stress Concentration Design Factors*, 2nd ed. Krieger Publishing. The $K _ { t }$ data for the keyway, the shoulder fillet, and the snap ring groove.
- **D.V. Rao and G. Gupta (1998)** — *Turbomachines*, 2nd ed. Wiley. The critical speed, the Campbell diagram, and the rotor dynamics.
- **M.F. Ashby and H. Jones (2012)** — *Engineering Materials 1*, 4th ed. Butterworth-Heinemann. The shaft material selection and the surface treatment.
