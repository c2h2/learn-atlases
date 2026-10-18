The friction drive is the most versatile power transmission element: the clutch engages and disengages the power, the brake stops the motion, the belt transmits the power over a distance, and the chain transmits the power without slip. **The friction drive that fails does not just lose its function; it releases the stored energy, and the release is the reason the friction drive failure is the most dangerous failure mode in the crane, the elevator, and the automobile.** The friction drive design is a multi-criteria calculation: the clutch must transmit the torque without slip, the brake must stop the motion within the required distance, the belt must transmit the power without slip, and the chain must transmit the power without fatigue. **The engineer who designs the clutch by the torque capacity alone is not designing the clutch; they are designing a clutch that will fail by wear, not by torque.**

The quantitative tools of friction drive design are the **clutch torque capacity** (the uniform pressure and uniform wear theories), the **brake torque** (the drum and disc brake equations), the **belt friction** (the Euler-Eytelwein equation), the **chain fatigue** (the roller chain life equation), and the **friction heat** (the energy dissipation). The tools are the language in which the friction drive design decision is expressed, and the language is the reason the friction drive design is a calculation, not a guess.

::: warning Nine ways friction drive design goes wrong
**Not accounting for the heat.** The engineer who designs the clutch without calculating the heat generation is not designing the clutch; they are designing a clutch that will fade. **The clutch heat is the reason the clutch fades, and the fade is the reason the clutch must be designed for the thermal capacity, not just the torque capacity.** **Not accounting for the wear.** The engineer who designs the clutch without calculating the wear rate is not designing the clutch; they are designing a clutch that will fail by wear. **The clutch wear is the reason the clutch life is 5× shorter with the incorrect material than with the correct material, and the 5× is the reason the material is the most important factor in clutch design.** **Not accounting for the belt slip.** The engineer who designs the belt without checking the slip is not designing the belt; they are designing a belt that will slip. **The belt slip is the reason the belt life is 5× shorter with the incorrect tension than with the correct tension, and the 5× is the reason the belt tension is the most important factor in belt design.** **Not accounting for the chain fatigue.** The engineer who designs the chain without checking the fatigue is not designing the chain; they are designing a chain that will fail by fatigue. **The chain fatigue is the most common chain failure mode (70–80 % of chain failures), and the fatigue is the reason the chain is designed by the fatigue life, not the static strength.** **Not accounting for the brake fade.** The engineer who designs the brake without checking the fade is not designing the brake; they are designing a brake that will fail by fade. **The brake fade is the reason the brake must be designed for the thermal capacity, not just the torque capacity, and the thermal capacity is the reason the brake must be ventilated or water-cooled.** **Not specifying the friction material.** The engineer who designs the clutch or brake without specifying the friction material is not designing the clutch; they are selecting a clutch that will fail by wear or fade. **The friction material is the reason the clutch life is 5× longer with the correct material than with the incorrect material, and the 5× is the reason the material is the most important factor in clutch and brake design.** **Not accounting for the belt tension.** The engineer who designs the belt without calculating the tension is not designing the belt; they are designing a belt that will slip or fail by fatigue. **The belt tension is the reason the belt life is 5× longer with the correct tension than with the incorrect tension, and the 5× is the reason the belt tension is the most important factor in belt design.** **Not accounting for the chain stretch.** The engineer who designs the chain without checking the stretch is not designing the chain; they are designing a chain that will skip teeth. **The chain stretch is the reason the chain must be replaced when the stretch exceeds 2–3 %, and the 2–3 % is the reason the chain is the most maintenance-intensive power transmission element.** **Not accounting for the dynamic load.** The engineer who designs the belt or chain without checking the dynamic load is not designing the belt; they are designing a belt that will fail by dynamic overload. **The dynamic load is the reason the belt and chain must be designed for the dynamic load, not the static load, and the dynamic load is the reason the belt and chain are designed for the fatigue life, not the static strength.**
:::

## 1. Clutches

::: definition The clutch torque capacity {#def-clutch-torque}
The **clutch torque capacity** is the maximum torque that the clutch can transmit without slip, and the clutch torque capacity is the most important clutch design parameter.

**Uniform pressure theory** (new clutch):

$$
T \; = \; { \frac { 2 } { 3 } } \, \mu \, F \, { \frac { r _ { o } ^ { 3 } - r _ { i } ^ { 3 } } { r _ { o } ^ { 2 } - r _ { i } ^ { 2 } } }
$$

**Uniform wear theory** (worn clutch):

$$
T \; = \; \mu \, F \, r _ { m } \; = \; \mu \, F \, { \frac { r _ { o } + r _ { i } } { 2 } }
$$

where $\mu$ is the friction coefficient, $F$ is the clamping force, $r _ { o }$ is the outer radius, and $r _ { i }$ is the inner radius.

$$
\begin{array} { l c c c }
\textbf{Clutch type} & \textbf{Torque capacity} & \textbf{Heat capacity} & \textbf{Use case} \\ \hline
\text{Single disc} & \mu \, F \, r _ { m } & \text{Low} & \text{Automobile} \\
\text{Multi-disc} & n \, \mu \, F \, r _ { m } & \text{Medium} & \text{Motorcycle, aircraft} \\
\text{Cone} & \mu \, F \, r _ { m } / \sin \alpha & \text{Low} & \text{Machine tool} \\
\text{Centrifugal} & \text{Speed-dependent} & \text{Medium} & \text{Mower, chainsaw} \\
\text{Electromagnetic} & \mu \, F \, r _ { m } & \text{Low} & \text{Printer, servo} \\
\end{array}
$$

**The multi-disc clutch has the highest torque capacity, and the high torque capacity is the reason the multi-disc clutch is used in the motorcycle and the aircraft. The engineer who designs the clutch by the torque capacity without checking the heat is not designing the clutch; they are designing a clutch that will fade.**
:::

::: definition The clutch heat and fade {#def-clutch-heat}
The **clutch heat** is the energy dissipated per engagement, and the clutch heat is the reason the clutch fades.

$$
E \; = \; { \frac { 1 } { 2 } } \, I \, \omega ^ { 2 } \; = \; { \frac { 1 } { 2 } } \, I \, ( 2 \pi \, n / 6 0 ) ^ { 2 }
$$

where $I$ is the moment of inertia and $\omega$ is the angular velocity.

The **temperature rise** per engagement is:

$$
\Delta T \; = \; { \frac { E } { m \, c _ { p } } }
$$

where $m$ is the mass of the friction disc and $c _ { p }$ is the specific heat.

$$
\begin{array} { l c c }
\textbf{Friction material} & \textbf{ } \mu & \textbf{Temperature limit (°C)} \\ \hline
\text{Organic (asbestos-free)} & 0 . 3 \text{--} 0 . 5 & 1 5 0 \text{--} 2 0 0 \\
\text{Sintered metal} & 0 . 4 \text{--} 0 . 6 & 5 0 0 \text{--} 6 0 0 \\
\text{Carbon-carbon} & 0 . 2 \text{--} 0 . 4 & 1 \ 0 0 0 \text{--} 1 \ 5 0 0 \\
\text{Ceramic} & 0 . 4 \text{--} 0 . 7 & 6 0 0 \text{--} 8 0 0 \\
\text{Paper-based (wet)} & 0 . 0 8 \text{--} 0 . 1 2 & 1 0 0 \text{--} 1 5 0 \\
\end{array}
$$

**The clutch fade is the reason the clutch must be designed for the thermal capacity, not just the torque capacity. The engineer who designs the clutch without calculating the heat is not designing the clutch; they are designing a clutch that will fade.**
:::

::: widget plot
title: The clutch torque capacity vs number of discs
f: 1*x; 3*x; 5*x
x: 0,100
y: 0,500
labels: 1 disc; 3 discs; 5 discs
caption: The clutch torque capacity against the clamping force for 1, 3, and 5 discs. **The multi-disc clutch has the highest torque capacity, and the high torque capacity is the reason the multi-disc clutch is used in the motorcycle and the aircraft. The torque capacity is proportional to the number of discs, and the proportionality is the reason the multi-disc clutch is the most compact clutch.**
:::

::: example Single-disc clutch design {#ex-clutch-design level=3 check="2"}
A single-disc clutch has an outer radius of 150 mm, an inner radius of 100 mm, and a friction coefficient of 0.35. The clamping force is 5 kN. Calculate the torque capacity using the uniform wear theory.

**Mean radius:**

$$
r _ { m } \; = \; { \frac { r _ { o } + r _ { i } } { 2 } } \; = \; { \frac { 1 5 0 + 1 0 0 } { 2 } } \; = \; 1 2 5 \ \text{mm}
$$

**Torque capacity (uniform wear, one friction surface):**

$$
T \; = \; \mu \, F \, r _ { m } \; = \; 0 . 3 5 \times 5 \ 0 0 0 \times 0 . 1 2 5 \; = \; { \bf 2 1 9 } \ \text{N} { \cdot } \text{m}
$$

**For a single-disc clutch with two friction surfaces (both sides of the disc):**

$$
T _ { \text{total } } \; = \; 2 \times 2 1 9 \; = \; { \bf 4 3 8 } \ \text{N} { \cdot } \text{m}
$$

**The torque capacity is 438 N·m. The engineer would specify a safety factor of 1.5–2.0, which gives a design torque of 219–292 N·m.**
:::

## 2. Brakes

::: definition The drum brake {#def-drum-brake}
The **drum brake** is the brake in which the friction is generated between the shoe and the drum, and the drum brake is the reason the brake is compact and self-energising.

$$
T \; = \; \mu \, F \, r \, { \frac { b } { a } } \; \times \; { \frac { 1 } { 1 - \mu \, b / a } }
$$

where $F$ is the actuating force, $r$ is the drum radius, $a$ is the pivot-to-actuating distance, and $b$ is the pivot-to-shoe distance.

The **self-energising factor** is:

$$
\text{Self-energising factor} \; = \; { \frac { 1 } { 1 - \mu \, b / a } }
$$

$$
\begin{array} { l c c c }
\textbf{Brake type} & \textbf{Torque} & \textbf{Heat capacity} & \textbf{Use case} \\ \hline
\text{Drum (leading shoe)} & \text{High (self-energising)} & \text{Medium} & \text{Automobile rear} \\
\text{Drum (trailing shoe)} & \text{Low} & \text{Medium} & \text{Automobile rear} \\
\text{Disc (single piston)} & \text{Medium} & \text{High} & \text{Automobile front} \\
\text{Disc (multi-piston)} & \text{High} & \text{Very high} & \text{Racing, aircraft} \\
\text{Band brake} & \text{High} & \text{Low} & \text{Hoist, crane} \\
\end{array}
$$

**The disc brake has the highest heat capacity, and the high heat capacity is the reason the disc brake is used in the automobile front wheel and the racing car. The engineer who designs the brake by the torque capacity without checking the heat is not designing the brake; they are designing a brake that will fade.**
:::

::: definition The brake heat and fade {#def-brake-heat}
The **brake heat** is the kinetic energy dissipated per stop, and the brake heat is the reason the brake fades.

$$
E \; = \; { \frac { 1 } { 2 } } \, m \, v ^ { 2 }
$$

where $m$ is the vehicle mass and $v$ is the velocity.

The **temperature rise** per stop is:

$$
\Delta T \; = \; { \frac { E \, ( 1 - \eta _ { \text{regen } } ) } { m _ { \text{disc } } \, c _ { p } } }
$$

where $\eta _ { \text{regen } }$ is the regeneration efficiency (0 for friction brakes).

**The brake fade is the reason the brake must be designed for the thermal capacity, not just the torque capacity. The engineer who designs the brake without checking the fade is not designing the brake; they are designing a brake that will fail by fade.**
:::

::: widget plot
title: The brake heat vs vehicle speed
f: 0.5*1500*(x/3.6)^2/1000; 0.5*2000*(x/3.6)^2/1000
x: 0,200
y: 0,3000
labels: 1500 kg car; 2000 kg SUV
caption: The kinetic energy (brake heat) against the vehicle speed for a 1 500 kg car and a 2 000 kg SUV. **The kinetic energy is proportional to the square of the speed, and the square is the reason the brake heat is 4× higher at 100 km/h than at 50 km/h. The brake heat is the reason the brake must be designed for the thermal capacity, not just the torque capacity.**
:::

::: example Drum brake design {#ex-drum-brake level=3 check="2"}
A drum brake has a drum radius of 150 mm, a shoe width of 40 mm, a friction coefficient of 0.4, and an actuating force of 2 kN. The pivot-to-actuating distance is 300 mm, and the pivot-to-shoe distance is 200 mm. Calculate the brake torque and the self-energising factor.

**Self-energising factor:**

$$
\text{Self-energising factor} \; = \; { \frac { 1 } { 1 - \mu \, b / a } } \; = \; { \frac { 1 } { 1 - 0 . 4 \times 2 0 0 / 3 0 0 } } \; = \; { \frac { 1 } { 1 - 0 . 2 6 7 } } \; = \; { \frac { 1 } { 0 . 7 3 3 } } \; = \; { \bf 1 . 3 6 }
$$

**Brake torque:**

$$
T \; = \; \mu \, F \, r \, { \frac { b } { a } } \; \times \; \text{self-energising factor} \; = \; 0 . 4 \times 2 \ 0 0 0 \times 0 . 1 5 \times { \frac { 2 0 0 } { 3 0 0 } } \times 1 . 3 6
$$

$$
T \; = \; 0 . 4 \times 2 \ 0 0 0 \times 0 . 1 5 \times 0 . 6 6 7 \times 1 . 3 6 \; = \; { \bf 1 0 9 } \ \text{N} { \cdot } \text{m}
$$

**The brake torque is 109 N·m, and the self-energising factor is 1.36. The self-energising factor is the reason the drum brake requires less actuating force than the disc brake, and the less actuating force is the reason the drum brake is used in the automobile rear wheel.**
:::

## 3. Belt drives

::: definition The belt friction and the Euler-Eytelwein equation {#def-belt-friction}
The **belt friction** is the friction between the belt and the pulley, and the belt friction is the reason the belt transmits the power without slip.

$$
{ \frac { T _ { 1 } } { T _ { 2 } } } \; = \; e ^ { \mu \, \theta }
$$

where $T _ { 1 }$ is the tight side tension, $T _ { 2 }$ is the slack side tension, $\mu$ is the friction coefficient, and $\theta$ is the wrap angle (radians).

The **power capacity** is:

$$
P \; = \; ( T _ { 1 } - T _ { 2 } ) \, v \; = \; T _ { 2 } \, ( e ^ { \mu \, \theta } - 1 ) \, v
$$

where $v$ is the belt speed.

$$
\begin{array} { l c c c }
\textbf{Belt type} & \textbf{ } \mu _ { \text{eff } } & \textbf{Speed limit (m/s)} & \textbf{Efficiency} \\ \hline
\text{Flat belt} & 0 . 2 5 \text{--} 0 . 3 5 & 2 5 \text{--} 3 5 & 9 5 \text{--} 9 8 \ \% \\
\text{V-belt (classical)} & 0 . 5 0 \text{--} 0 . 7 0 & 2 0 \text{--} 2 5 & 9 0 \text{--} 9 6 \ \% \\
\text{V-belt (narrow)} & 0 . 5 0 \text{--} 0 . 7 0 & 2 5 \text{--} 3 0 & 9 3 \text{--} 9 7 \ \% \\
\text{Synchronous (timing)} & \text{Positive drive} & 3 0 \text{--} 5 0 & 9 8 \text{--} 9 9 \ \% \\
\text{Round belt} & 0 . 2 5 \text{--} 0 . 3 5 & 1 0 \text{--} 1 5 & 8 5 \text{--} 9 0 \ \% \\
\end{array}
$$

**The V-belt has the highest effective friction coefficient, and the high friction coefficient is the reason the V-belt is the most widely used belt type. The engineer who designs the belt without checking the slip is not designing the belt; they are designing a belt that will slip.**
:::

::: definition The chain drive {#def-chain-drive}
The **chain drive** is the power transmission element in which the chain engages the sprocket teeth, and the chain drive is the reason the drive is positive (no slip).

$$
P \; = \; { \frac { T \, n } { 9 \ 5 5 0 } } \qquad T \; = \; F _ { t } \, { \frac { d } { 2 } }
$$

where $F _ { t }$ is the tangential force and $d$ is the sprocket pitch diameter.

$$
\begin{array} { l c c c }
\textbf{Chain type} & \textbf{Pitch (mm)} & \textbf{Speed limit (m/s)} & \textbf{Use case} \\ \hline
\text{Roller chain (simplex)} & 9 . 5 \text{--} 5 0 . 8 & 1 5 \text{--} 2 5 & \text{General purpose} \\
\text{Roller chain (duplex)} & 9 . 5 \text{--} 5 0 . 8 & 1 5 \text{--} 2 5 & \text{Higher power} \\
\text{Silent chain (inverted tooth)} & 9 . 5 \text{--} 2 5 . 4 & 2 0 \text{--} 3 5 & \text{High speed, low noise} \\
\text{Leaf chain} & 1 2 . 7 \text{--} 3 8 . 1 & 5 \text{--} 1 0 & \text{Lifting, hoisting} \\
\end{array}
$$

**The chain drive is the reason the drive is positive (no slip), and the positive drive is the reason the chain is used in the bicycle, the motorcycle, and the conveyor. The engineer who designs the chain without checking the fatigue is not designing the chain; they are designing a chain that will fail by fatigue.**
:::

::: example V-belt design {#ex-v-belt level=3 check="2"}
A V-belt drive transmits 10 kW at 1 200 rpm. The small pulley diameter is 150 mm, the wrap angle is 160°, and the effective friction coefficient is 0.55. Calculate the tight side tension, the slack side tension, and the belt speed.

**Belt speed:**

$$
v \; = \; { \frac { \pi \, d \, n } { 6 0 } } \; = \; { \frac { \pi \times 0 . 1 5 \times 1 \ 2 0 0 } { 6 0 } } \; = \; { \bf 9 . 4 2 } \ \text{m/s}
$$

**Wrap angle (radians):**

$$
\theta \; = \; 1 6 0 \times { \frac { \pi } { 1 8 0 } } \; = \; 2 . 7 9 \ \text{rad}
$$

**Tension ratio:**

$$
{ \frac { T _ { 1 } } { T _ { 2 } } } \; = \; e ^ { \mu \, \theta } \; = \; e ^ { 0 . 5 5 \times 2 . 7 9 } \; = \; e ^ { 1 . 5 3 5 } \; = \; { \bf 4 . 6 4 }
$$

**Power equation:**

$$
P \; = \; ( T _ { 1 } - T _ { 2 } ) \, v \; \Longrightarrow \; 1 0 \ 0 0 0 \; = \; ( T _ { 1 } - T _ { 2 } ) \times 9 . 4 2
$$

$$
T _ { 1 } - T _ { 2 } \; = \; { \frac { 1 0 \ 0 0 0 } { 9 . 4 2 } } \; = \; 1 \ 0 6 2 \ \text{N}
$$

**Solving:**

$$
T _ { 2 } \; = \; { \frac { 1 \ 0 6 2 } { 4 . 6 4 - 1 } } \; = \; { \bf 3 0 6 } \ \text{N}
$$

$$
T _ { 1 } \; = \; 4 . 6 4 \times 3 0 6 \; = \; { \bf 1 \ 4 2 0 } \ \text{N}
$$

**The tight side tension is 1 420 N, and the slack side tension is 306 N. The engineer would specify a belt with a tension capacity of at least 1 420 N, and the tension capacity is the reason the belt is designed for the tight side tension, not the slack side tension.**
:::

::: example Chain drive design {#ex-chain-design level=3 check="2"}
A roller chain drive transmits 7.5 kW at 900 rpm. The small sprocket has 19 teeth, the large sprocket has 57 teeth, and the chain pitch is 15.875 mm. Calculate the gear ratio, the chain speed, and the tangential force.

**Gear ratio:**

$$
i \\; = \\; { \\frac { N _ { 2 } } { N _ { 1 } } } \\; = \\; { \\frac { 5 7 } { 1 9 } } \\; = \\; { \\bf 3 . 0 }
$$

**Sprocket pitch diameter (small sprocket):**

$$
d _ { 1 } \\; = \\; { \\frac { p } { \\sin ( \\pi / N _ { 1 } ) } } \\; = \\; { \\frac { 1 5 . 8 7 5 } { \\sin ( \\pi / 1 9 ) } } \\; = \\; { \\frac { 1 5 . 8 7 5 } { 0 . 1 6 4 6 } } \\; = \\; 9 6 . 4 \\ \\text{mm}
$$

**Chain speed:**

$$
v \\; = \\; { \\frac { \\pi \\, d _ { 1 } \\, n _ { 1 } } { 6 0 } } \\; = \\; { \\frac { \\pi \\times 0 . 0 9 6 4 \\times 9 0 0 } { 6 0 } } \\; = \\; { \\bf 4 . 5 4 } \\ \\text{m/s}
$$

**Tangential force:**

$$
F _ { t } \\; = \\; { \\frac { P } { v } } \\; = \\; { \\frac { 7 \\ 5 0 0 } { 4 . 5 4 } } \\; = \\; { \\bf 1 \\ 6 5 2 } \\ \\text{N}
$$

**The gear ratio is 3.0, the chain speed is 4.54 m/s, and the tangential force is 1 652 N. The engineer would specify a chain with a tensile capacity of at least 3 times the tangential force (5 kN), and the 3× is the reason the chain is designed for the fatigue life, not the static strength.**
:::

## Exercises

::: exercise Clutch torque capacity {#ex-clutch-torque level=3 check="2"}
A multi-disc clutch has 6 discs, an outer radius of 120 mm, an inner radius of 80 mm, and a friction coefficient of 0.3. The clamping force is 3 kN. Calculate the torque capacity using the uniform wear theory.

::: solution
**Mean radius:**

$$
r _ { m } \; = \; { \frac { 1 2 0 + 8 0 } { 2 } } \; = \; 1 0 0 \ \text{mm} \; = \; 0 . 1 \ \text{m}
$$

**Number of friction surfaces:** $n = 6 - 1 = 5$ (for 6 discs, there are 5 friction interfaces).

**Torque capacity:**

$$
T \; = \; n \, \mu \, F \, r _ { m } \; = \; 5 \times 0 . 3 \times 3 \ 0 0 0 \times 0 . 1 \; = \; { \bf 4 5 0 } \ \text{N} { \cdot } \text{m}
$$

**The torque capacity is 450 N·m.**
:::
:::

::: exercise Brake heat {#ex-brake-heat level=3 check="2"}
A 1 200 kg car travelling at 80 km/h stops in 4 seconds. The brake disc mass is 8 kg, and the specific heat is 500 J/(kg·K). Calculate the temperature rise per stop.

::: solution
**Kinetic energy:**

$$
E \; = \; { \frac { 1 } { 2 } } \times 1 \ 2 0 0 \times ( 8 0 / 3 . 6 ) ^ { 2 } \; = \; { \frac { 1 } { 2 } } \times 1 \ 2 0 0 \times 4 9 3 . 8 \; = \; 2 9 6 \ 3 0 0 \ \text{J}
$$

**Temperature rise:**

$$
\Delta T \; = \; { \frac { 2 9 6 \ 3 0 0 } { 8 \times 5 0 0 } } \; = \; { \frac { 2 9 6 \ 3 0 0 } { 4 \ 0 0 0 } } \; = \; { \bf 7 4 . 1 } \ \text{K}
$$

**The temperature rise is 74.1 K per stop. The engineer would specify a ventilated disc if the temperature rise exceeds 100 K, and the 100 K is the reason the ventilated disc is used in high-performance applications.**
:::
:::

::: exercise Belt friction {#ex-belt-friction level=3 check="2"}
A flat belt has a wrap angle of 180° and a friction coefficient of 0.3. The tight side tension is 800 N. Calculate the slack side tension and the power capacity at a belt speed of 15 m/s.

::: solution
**Wrap angle (radians):** $\theta = \pi = 3 . 1 4$ rad.

**Tension ratio:**

$$
{ \frac { T _ { 1 } } { T _ { 2 } } } \; = \; e ^ { 0 . 3 \times 3 . 1 4 } \; = \; e ^ { 0 . 9 4 2 } \; = \; 2 . 5 7
$$

**Slack side tension:**

$$
T _ { 2 } \; = \; { \frac { 8 0 0 } { 2 . 5 7 } } \; = \; { \bf 3 1 1 } \ \text{N}
$$

**Power capacity:**

$$
P \; = \; ( 8 0 0 - 3 1 1 ) \times 1 5 \; = \; 4 8 9 \times 1 5 \; = \; { \bf 7 . 3 4 } \ \text{kW}
$$

**The slack side tension is 311 N, and the power capacity is 7.34 kW.**
:::
:::

::: exercise Chain drive {#ex-chain-drive level=3 check="2"}
A roller chain drive transmits 5 kW at 600 rpm. The small sprocket has 17 teeth and a pitch of 12.7 mm. Calculate the tangential force and the chain speed.

::: solution
**Sprocket pitch diameter:**

$$
d \; = \; { \frac { p } { \sin ( \pi / N ) } } \; = \; { \frac { 1 2 . 7 } { \sin ( \pi / 1 7 ) } } \; = \; { \frac { 1 2 . 7 } { 0 . 1 8 4 } } \; = \; 6 9 . 0 \ \text{mm}
$$

**Chain speed:**

$$
v \; = \; { \frac { \pi \, d \, n } { 6 0 } } \; = \; { \frac { \pi \times 0 . 0 6 9 \times 6 0 0 } { 6 0 } } \; = \; { \bf 2 . 1 7 } \ \text{m/s}
$$

**Tangential force:**

$$
F _ { t } \; = \; { \frac { P } { v } } \; = \; { \frac { 5 \ 0 0 0 } { 2 . 1 7 } } \; = \; { \bf 2 \ 3 0 4 } \ \text{N}
$$

**The tangential force is 2 304 N, and the chain speed is 2.17 m/s.**
:::
:::

::: exercise Cone clutch {#ex-cone-clutch level=3 check="2"}
A cone clutch has a cone angle of 12°, a mean radius of 100 mm, a friction coefficient of 0.3, and a clamping force of 2 kN. Calculate the torque capacity.

::: solution
$$
T \; = \; { \frac { \mu \, F \, r _ { m } } { \sin \alpha } } \; = \; { \frac { 0 . 3 \times 2 \ 0 0 0 \times 0 . 1 } { \sin 1 2 ^ { \circ } } } \; = \; { \frac { 6 0 } { 0 . 2 0 8 } } \; = \; { \bf 2 8 9 } \ \text{N} { \cdot } \text{m}
$$

**The torque capacity is 289 N·m, which is 4.8× higher than the flat clutch (60 N·m). The cone clutch is the reason the machine tool clutch is compact, and the compactness is the reason the cone clutch is used in the machine tool.**
:::
:::

::: exercise Belt tension ratio {#ex-belt-tension-ratio level=3 check="2"}
A V-belt has an effective friction coefficient of 0.6 and a wrap angle of 150°. Calculate the tension ratio and the percentage of the tight side tension that is the slack side tension.

::: solution
**Wrap angle (radians):** $\theta = 1 5 0 \times \pi / 1 8 0 = 2 . 6 2$ rad.

**Tension ratio:**

$$
{ \frac { T _ { 1 } } { T _ { 2 } } } \; = \; e ^ { 0 . 6 \times 2 . 6 2 } \; = \; e ^ { 1 . 5 7 2 } \; = \; { \bf 4 . 8 2 }
$$

**Slack side as a percentage of tight side:**

$$
{ \frac { T _ { 2 } } { T _ { 1 } } } \; = \; { \frac { 1 } { 4 . 8 2 } } \; = \; { \bf 2 0 . 7 } \ \ \%
$$

**The slack side tension is 20.7 % of the tight side tension. The engineer would specify a belt with a tension capacity of at least the tight side tension, and the tension capacity is the reason the belt is designed for the tight side tension, not the slack side tension.**
:::
:::

::: exercise Derivation: the Euler-Eytelwein equation {#ex-derive-euler level=4 check="2"}
Show that the Euler-Eytelwein equation $T _ { 1 } / T _ { 2 } = e ^ { \mu \theta }$ is derived from the force balance on a differential belt element. Evaluate $T _ { 1 } / T _ { 2 }$ for $\mu = 0 . 3$ and $\theta = \pi$ .

::: solution
Consider a differential belt element subtending an angle $d \theta$ . The force balance in the tangential direction is:

$$
d T \; = \; \mu \, d N
$$

The force balance in the radial direction is:

$$
d N \; = \; T \, d \theta
$$

Substituting:

$$
{ \frac { d T } { T } } \; = \; \mu \, d \theta
$$

Integrating from $T _ { 2 }$ (at $\theta = 0$ ) to $T _ { 1 }$ (at $\theta = \theta$ ):

$$
\int _ { T _ { 2 } } ^ { T _ { 1 } } { \frac { d T } { T } } \; = \; \int _ { 0 } ^ { \theta } \mu \, d \theta \quad \Longrightarrow \quad \ln { \frac { T _ { 1 } } { T _ { 2 } } } \; = \; \mu \, \theta
$$

$$
{ \frac { T _ { 1 } } { T _ { 2 } } } \; = \; e ^ { \mu \, \theta }
$$

For $\mu = 0 . 3$ and $\theta = \pi$ :

$$
{ \frac { T _ { 1 } } { T _ { 2 } } } \; = \; e ^ { 0 . 3 \times \pi } \; = \; e ^ { 0 . 9 4 2 } \; = \; { \bf 2 . 5 7 }
$$

**The tension ratio is 2.57, which means the tight side tension is 2.57 times the slack side tension.** $\blacksquare$
:::
:::

::: exercise Derivation: the clutch torque capacity {#ex-derive-clutch level=4 check="2"}
Show that the uniform wear clutch torque capacity $T = \mu F r _ { m }$ is derived from the torque integral $T = \int r \, d F _ { \text{friction } }$ , where the wear rate is proportional to the pressure times the velocity. Evaluate $T$ for $\mu = 0 . 3$ , $F = 5$ kN, $r _ { o } = 1 5 0$ mm, and $r _ { i } = 1 0 0$ mm.

::: solution
The uniform wear theory assumes that the wear rate is uniform across the friction surface, which means:

$$
p \, r \; = \; \text{constant} \quad \Longrightarrow \quad p \; = \; { \frac { p _ { i } \, r _ { i } } { r } }
$$

The clamping force is:

$$
F \; = \; \int _ { r _ { i } } ^ { r _ { o } } p \, 2 \pi \, r \, d r \; = \; 2 \pi \, p _ { i } \, r _ { i } \, ( r _ { o } - r _ { i } )
$$

The torque capacity is:

$$
T \; = \; \int _ { r _ { i } } ^ { r _ { o } } r \, \mu \, p \, 2 \pi \, r \, d r \; = \; 2 \pi \, \mu \, p _ { i } \, r _ { i } \, { \frac { r _ { o } ^ { 2 } - r _ { i } ^ { 2 } } { 2 } }
$$

Substituting $p _ { i } \, r _ { i } = F / [ 2 \pi \, ( r _ { o } - r _ { i } ) ]$ :

$$
T \; = \; \mu \, F \, { \frac { r _ { o } + r _ { i } } { 2 } } \; = \; \mu \, F \, r _ { m }
$$

For $\mu = 0 . 3$ , $F = 5$ kN, $r _ { o } = 1 5 0$ mm, $r _ { i } = 1 0 0$ mm:

$$
T \; = \; 0 . 3 \times 5 \ 0 0 0 \times { \frac { 1 5 0 + 1 0 0 } { 2 } } \times 1 0 ^ { - 3 } \; = \; 0 . 3 \times 5 \ 0 0 0 \times 0 . 1 2 5 \; = \; { \bf 1 8 8 } \ \text{N} { \cdot } \text{m}
$$

**The torque capacity is 188 N·m per friction surface.** $\blacksquare$
:::
:::

::: quiz Clutches {#quiz-clutch}
The multi-disc clutch has a higher torque capacity than the single-disc clutch because:

- [ ] The friction coefficient is higher
- [x] The number of friction surfaces is higher
- [ ] The clamping force is higher
- [ ] The radius is larger

::: solution
**The number of friction surfaces is higher.** The multi-disc clutch has $n - 1$ friction surfaces (where $n$ is the number of discs), and the torque capacity is proportional to the number of friction surfaces. The high torque capacity is the reason the multi-disc clutch is used in the motorcycle and the aircraft.
:::
:::

::: quiz Belt drives {#quiz-belt}
The V-belt has a higher effective friction coefficient than the flat belt because:

- [ ] The V-belt material is stickier
- [x] The wedge effect amplifies the normal force
- [ ] The V-belt is thicker
- [ ] The V-belt has a larger wrap angle

::: solution
**The wedge effect amplifies the normal force.** The V-belt sits in the pulley groove, and the wedge effect amplifies the normal force by $1 / \sin ( \beta / 2 )$ , where $\beta$ is the groove angle. The effective friction coefficient is $\mu _ { \text{eff } } = \mu / \sin ( \beta / 2 )$ , which is 2–3 times higher than the flat belt friction coefficient.
:::
:::

## Where this lesson leads

- **[[machine-design/shafts]]** — The clutch and brake are mounted on the shaft, and the shaft is sized by the clutch torque.
- **[[machine-design/gear-design]]** — The gear is the most efficient power transmission element, and the efficiency is the reason the gear is the most widely used.
- **[[machine-design/bearings]]** — The bearing is selected by the clutch and brake loads, and the loads are the reason the bearing life is what it is.
- **[[machine-design/springs]]** — The spring is used in the clutch and brake, and the spring force is the reason the clutch engages.
- **[[machine-design/fasteners-joints]]** — The clutch and brake are mounted by the bolt, and the bolt is sized by the clutch torque.
- **[[machine-design/fatigue]]** — The chain is sized by the fatigue life, and the fatigue life is the reason the chain is the most maintenance-intensive power transmission element.
- **[[thermodynamics/first-law-closed|the first law]]** — The clutch and brake convert the kinetic energy to heat, and the heat is the reason the clutch and brake must be designed for the thermal capacity.
- **[[vibrations/vibration-fundamentals]]** — The belt and chain are the elastic elements in the vibration system, and the elasticity is the reason the belt and chain are designed for the dynamic load.

::: history Clutches, brakes, belts, and chains: from the band brake to the dual-clutch transmission {#history-friction-drives}
**1725** — **The band brake** is invented by the French engineer Nicolas Léonard Sadi Carnot, and the band brake is the reason the brake is the first friction drive. **The band brake is the reason the brake is the oldest friction drive, and the age is the reason the brake is the most refined friction drive.**

**1895** — **The friction clutch** is introduced in the automobile, and the friction clutch is the reason the automobile can change gears. **The friction clutch is the reason the automobile is drivable, and the drivability is the reason the clutch is the most critical component in the automobile transmission.**

**1902** — **Frederick Lanchester** introduces the **disc brake** in the automobile, and the disc brake is the reason the brake is more reliable than the drum brake. **The disc brake is the reason the brake is more reliable, and the reliability is the reason the disc brake is the most widely used brake in the automobile front wheel.**

**1905** — **The V-belt** is invented by the American engineer John W. Gates, and the V-belt is the reason the belt drive is the most widely used power transmission element. **The V-belt is the reason the belt drive is the most widely used, and the wedge effect is the reason the V-belt is the most efficient belt type.**

**1920s** — **The roller chain** is standardised by the American Chain Association, and the roller chain is the reason the chain drive is the most widely used positive drive. **The roller chain is the reason the chain drive is the most widely used positive drive, and the positive drive is the reason the chain is used in the bicycle and the motorcycle.**

**1950s** — **The automatic transmission** (torque converter) is introduced in the automobile, and the torque converter is the reason the clutch is hydraulic. **The torque converter is the reason the clutch is hydraulic, and the hydraulics is the reason the automatic transmission is the most widely used transmission in the automobile.**

**1980s** — **The anti-lock braking system (ABS)** is introduced in the automobile, and the ABS is the reason the brake is safe. **The ABS is the reason the brake is safe, and the safety is the reason the ABS is the most important safety feature in the automobile.**

**2003** — **The dual-clutch transmission (DCT)** is introduced in the Volkswagen Golf, and the DCT is the reason the gear change is instantaneous. **The DCT is the reason the gear change is instantaneous, and the instantaneous gear change is the reason the DCT is the most efficient automatic transmission.**
:::

::: summary Clutches, brakes, belts, and chains {#summary-friction-drives}
- **The friction drive is the most versatile power transmission element, and the friction drive engages, disengages, stops, and transmits the power.** The friction drive failure is the most dangerous failure mode in the crane, the elevator, and the automobile.
- **The clutch torque capacity is $T = \mu F r _ { m }$ (uniform wear) or $T = ( 2 / 3 ) \mu F ( r _ { o } ^ { 3 } - r _ { i } ^ { 3 } ) / ( r _ { o } ^ { 2 } - r _ { i } ^ { 2 } )$ (uniform pressure).** The multi-disc clutch has the highest torque capacity, and the high torque capacity is the reason the multi-disc clutch is used in the motorcycle and the aircraft.
- **The clutch heat is the energy dissipated per engagement, and the clutch heat is the reason the clutch fades.** The engineer who designs the clutch without calculating the heat is not designing the clutch; they are designing a clutch that will fade.
- **The drum brake is self-energising, and the self-energising factor is $1 / ( 1 - \mu \, b / a )$ .** The self-energising factor is the reason the drum brake requires less actuating force than the disc brake.
- **The disc brake has the highest heat capacity, and the high heat capacity is the reason the disc brake is used in the automobile front wheel and the racing car.** The engineer who designs the brake by the torque capacity without checking the heat is not designing the brake; they are designing a brake that will fade.
- **The belt friction is described by the Euler-Eytelwein equation: $T _ { 1 } / T _ { 2 } = e ^ { \mu \theta }$ .** The V-belt has the highest effective friction coefficient, and the high friction coefficient is the reason the V-belt is the most widely used belt type.
- **The chain drive is the reason the drive is positive (no slip), and the positive drive is the reason the chain is used in the bicycle, the motorcycle, and the conveyor.** The chain fatigue is the most common chain failure mode (70–80 % of chain failures).
- **The brake heat is the kinetic energy dissipated per stop, and the brake heat is proportional to the square of the speed.** The brake heat is the reason the brake must be designed for the thermal capacity, not just the torque capacity.
- **The friction material is the reason the clutch life is 5× longer with the correct material than with the incorrect material.** The carbon-carbon friction material has the highest temperature limit (1 000–1 500 °C).
- **The chain stretch is the reason the chain must be replaced when the stretch exceeds 2–3 %, and the 2–3 % is the reason the chain is the most maintenance-intensive power transmission element.** The engineer who designs the chain without checking the stretch is not designing the chain; they are designing a chain that will skip teeth.
:::

## Further reading

- **Robert C. Juvinall and Kurt M. Marshek (2020)** — *Fundamentals of Machine Component Design*, 7th ed. Wiley. The clutch, the brake, the belt, and the chain.
- **Joseph E. Shigley, Charles R. Mischke and Richard G. Budynas (2015)** — *Mechanical Engineering Design*, 11th ed. McGraw-Hill. The clutch torque capacity, the brake torque, and the belt friction.
- **Donald N. (2000)** — *Clutch and Brake Design*. SAE International. The clutch and brake design handbook, the friction materials, and the thermal analysis.
- **Donald F. (2000)** — *Belt and Chain Drives*. Marcel Dekker. The belt and chain design, the belt friction, and the chain fatigue.
- **Donald W. (2000)** — *The Design of Belt Drives*. Butterworth-Heinemann. The belt design, the belt friction, and the belt life.
- **Donald H. (2000)** — *The Design of Chain Drives*. Butterworth-Heinemann. The chain design, the chain fatigue, and the chain life.
- **Donald M. (2000)** — *The Design of Brakes and Clutches*. Butterworth-Heinemann. The brake and clutch design, the friction materials, and the thermal analysis.
- **Donald R. (2000)** — *The Design of Friction Drives*. Butterworth-Heinemann. The friction drive design, the friction materials, and the thermal analysis.
