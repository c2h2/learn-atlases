The gear is the most precise machine element: the gear tooth is a cantilever beam that carries the transmitted load, and the gear tooth is the component that determines the gearbox's noise, efficiency, and life. **The gear that fails does not just stop the gearbox; it destroys the shaft, the bearing, and the housing, and the destruction is the reason the gear is the most critical component in the gearbox.** The gear design is a multi-criteria calculation: the gear tooth must be strong enough to resist the bending fatigue at the root, hard enough to resist the pitting at the surface, and accurate enough to mesh smoothly. **The engineer who designs the gear by the Lewis equation alone is not designing the gear; they are designing a gear that will fail by pitting, not bending.**

The quantitative tools of gear design are the **Lewis bending equation** (the tooth root stress), the **Hertzian contact stress** (the surface pitting), the **AGMA 2001 equation** (the modern gear design standard), the **velocity factor** (the dynamic load), and the **gear efficiency** (the power loss). The tools are the language in which the gear design decision is expressed, and the language is the reason the gear design is a calculation, not a guess.

::: warning Nine ways gear design goes wrong
**Not checking the pitting.** The engineer who designs the gear by the Lewis bending equation without checking the Hertzian contact stress is not designing the gear; they are designing a gear that will fail by pitting. **The pitting is the most common gear failure mode (60–80 % of gear failures), and the pitting is the reason the Hertzian contact stress is the most important gear design criterion.** **Not accounting for the dynamic load.** The engineer who uses the static transmitted load without the velocity factor is not designing the gear; they are designing a gear that will fail by dynamic overload. **The velocity factor $K _ { v }$ increases the transmitted load by 20–100 % at high speed, and the increase is the reason the gear must be designed for the dynamic load, not the static load.** **Not accounting for the load distribution.** The engineer who assumes the load is shared equally by all the teeth is not designing the gear; they are guessing. **The load distribution factor $K _ { m }$ accounts for the non-uniform load sharing (the misalignment, the deflection, the tooth spacing error), and the non-uniformity is the reason the gear must be designed for the worst-case load, not the average load.** **Not accounting for the size factor.** The engineer who uses the small-specimen fatigue strength for a large gear is not designing the gear; they are designing a gear that will fail by fatigue. **The size factor $K _ { s }$ reduces the fatigue strength by 10–30 % for large gears, and the reduction is the reason the gear must be designed for the size-adjusted fatigue strength.** **Not accounting for the temperature.** The engineer who uses the room-temperature hardness for a gear operating at 150 °C is not designing for the temperature; they are designing for the room. **The hardness at 150 °C is 80–90 % of the room-temperature hardness, and the reduction is the reason the gear must be derated for the temperature.** **Not specifying the gear quality.** The engineer who designs the gear without specifying the AGMA quality number is not designing the gear; they are selecting a gear that will be noisy. **The AGMA quality number determines the tooth profile error, the pitch error, and the runout, and the errors are the reason the gear is noisy. The engineer who specifies AGMA Q6 instead of AGMA Q10 reduces the noise by 5 dB, and the 5 dB is the reason the gear quality is the most important factor in gear noise.** **Not checking the lubrication.** The engineer who designs the gear without specifying the lubricant, the viscosity, and the supply method is not designing the gear; they are selecting a gear that will fail by wear. **The lubrication is the reason the gear life is 10× longer with the correct lubricant than with the incorrect lubricant, and the 10× is the reason the lubrication is the most important factor in gear design.** **Not accounting for the misalignment.** The engineer who designs the gear without checking the misalignment tolerance is not designing the gear; they are selecting a gear that will fail by edge loading. **The misalignment tolerance is 0.1–0.3 mm/m for spur gears and 0.05–0.1 mm/m for helical gears, and the tolerance is the reason the gear must be designed for the misalignment, not just the load.** **Not accounting for the tip relief and the profile shift.** The engineer who designs the gear without the tip relief and the profile shift is not designing the gear; they are selecting a gear that will be noisy and have a short life. **The tip relief and the profile shift are the reason the gear meshes smoothly, and the smoothness is the reason the gear is quiet and long-lived.**
:::

## 1. Gear types and geometry

::: definition The gear types and their characteristics {#def-gear-types}
The **gear type** is selected by the shaft orientation, the speed, the load, the efficiency, and the noise:

$$
\begin{array} { l c c c c l }
\textbf{Gear type} & \textbf{Shaft angle} & \textbf{Efficiency} & \textbf{Noise} & \textbf{Load} & \textbf{Use case} \\ \hline
\text{Spur} & 0^\circ & 9 8 \text{--} 9 9 \ \% & \text{High} & \text{Medium} & \text{Low speed, high efficiency} \\
\text{Helical} & 0^\circ & 9 7 \text{--} 9 9 \ \% & \text{Low} & \text{High} & \text{High speed, low noise} \\
\text{Double helical (herringbone)} & 0^\circ & 9 8 \text{--} 9 9 \ \% & \text{Very low} & \text{Very high} & \text{Heavy duty, no thrust} \\
\text{Bevel (straight)} & 90^\circ & 9 4 \text{--} 9 7 \ \% & \text{High} & \text{Medium} & \text{Right angle, low speed} \\
\text{Bevel (spiral)} & 90^\circ & 9 6 \text{--} 9 8 \ \% & \text{Low} & \text{High} & \text{Right angle, high speed} \\
\text{Worm} & 90^\circ & 4 0 \text{--} 9 0 \ \% & \text{Very low} & \text{Medium} & \text{High ratio, self-locking} \\
\text{Hypoid} & 90^\circ & 9 3 \text{--} 9 6 \ \% & \text{Low} & \text{High} & \text{Automotive axle} \\
\text{Planetary} & 0^\circ & 9 6 \text{--} 9 8 \ \% & \text{Low} & \text{Very high} & \text{Compact, high ratio} \\
\end{array}
$$

**The gear type is the most important decision in gear design, because the gear type determines the efficiency, the noise, the load capacity, and the cost. The engineer who selects the gear type by the load rating alone is not selecting the gear; they are selecting a gear that will be noisy, inefficient, or expensive.**
:::

::: definition The gear geometry: module, pressure angle, and face width {#def-gear-geometry}
The **gear geometry** is defined by the module $m$ (or the diametral pitch $P _ { d }$ ), the pressure angle $\phi$ , the number of teeth $N$ , and the face width $b$ :

$$
\begin{array} { l c l }
\textbf{Parameter} & \textbf{Symbol} & \textbf{Formula} \\ \hline
\text{Module} & m & m = d / N \quad \text{(mm)} \\
\text{Diametral pitch} & P _ { d } & P _ { d } = N / d \quad \text{(teeth/inch)} \\
\text{Pressure angle} & \phi & 1 4 . 5 ^ { \circ } , 2 0 ^ { \circ } , 2 5 ^ { \circ } \\
\text{Addendum} & a & a = m \\
\text{Dedendum} & d _ { f } & d _ { f } = 1 . 2 5 \, m \\
\text{Circular pitch} & p & p = \pi \, m \\
\text{Base circle diameter} & d _ { b } & d _ { b } = d \cos \phi \\
\text{Face width} & b & b = ( 8 \text{--} 1 2 ) \, m \\
\text{Centre distance} & C & C = ( d _ { 1 } + d _ { 2 } ) / 2 \\
\end{array}
$$

**The module is the most important gear parameter, because the module determines the tooth size, the tooth strength, and the gear diameter. The engineer who selects the module by the strength calculation is not selecting the module; they are selecting the gear size, the gear weight, and the gear cost.**
:::

## 2. The Lewis bending equation

::: definition The Lewis bending equation {#def-lewis}
The **Lewis bending equation** (Wilfred Lewis, 1892) calculates the tooth root bending stress:

$$
\sigma _ { b } \; = \; { \frac { W _ { t } } { b \, m \, Y } }
$$

where $W _ { t }$ is the transmitted load, $b$ is the face width, $m$ is the module, and $Y$ is the Lewis form factor.

The **Lewis form factor** $Y$ is a function of the number of teeth $N$ and the pressure angle $\phi$ :

$$
\begin{array} { l c c c }
\textbf{ } N \textbf{ (teeth)} & \textbf{ } Y \textbf{ (} 1 4 . 5 ^ { \circ } \textbf{)} & \textbf{ } Y \textbf{ (} 2 0 ^ { \circ } \textbf{)} & \textbf{ } Y \textbf{ (} 2 5 ^ { \circ } \textbf{)} \\ \hline
1 2 & 0 . 2 4 5 & 0 . 2 4 5 & 0 . 2 7 1 \\
1 5 & 0 . 2 9 0 & 0 . 2 9 6 & 0 . 3 2 0 \\
2 0 & 0 . 3 2 2 & 0 . 3 3 1 & 0 . 3 6 2 \\
3 0 & 0 . 3 5 9 & 0 . 3 7 7 & 0 . 4 0 9 \\
4 0 & 0 . 3 8 0 & 0 . 4 0 0 & 0 . 4 2 8 \\
5 0 & 0 . 4 0 9 & 0 . 4 0 9 & 0 . 4 4 3 \\
\text{Rack} & 0 . 4 3 7 & 0 . 4 8 4 & 0 . 5 1 7 \\
\end{array}
$$

**The Lewis equation is the foundation of gear design, and the foundation is the reason the Lewis equation is the most widely used gear design equation. The Lewis equation assumes that the load is applied at the tooth tip, the tooth is a cantilever beam, and the stress is uniform across the face width. The assumptions are conservative, and the conservatism is the reason the Lewis equation is the starting point of the gear design, not the final answer.**
:::

::: definition The AGMA bending stress equation {#def-agma-bending}
The **AGMA 2001 bending stress equation** extends the Lewis equation to account for the dynamic load, the load distribution, the size, and the reliability:

$$
\sigma _ { F } \; = \; { \frac { W _ { t } \, K _ { A } \, K _ { v } \, K _ { H } \, K _ { m } } { b \, m \, Y _ { J } \, Y _ { T } \, Y _ { Z } \, Y _ { \theta } \, Y _ { N } } }
$$

where:
- $K _ { A }$ = application factor (external dynamic load)
- $K _ { v }$ = velocity factor (internal dynamic load)
- $K _ { H }$ = load distribution factor (face load distribution)
- $K _ { m }$ = size factor
- $Y _ { J }$ = geometry factor (replaces the Lewis $Y$ )
- $Y _ { T }$ = stress correction factor
- $Y _ { Z }$ = size factor
- $Y _ { \theta }$ = temperature factor
- $Y _ { N }$ = life factor (fatigue)

$$
\begin{array} { l c l }
\textbf{Factor} & \textbf{Typical value} & \textbf{Reason} \\ \hline
K _ { A } & 1 . 0 \text{--} 2 . 0 & \text{External shock, vibration} \\
K _ { v } & 1 . 0 \text{--} 1 . 5 & \text{Internal dynamic load (tooth error)} \\
K _ { H } & 1 . 0 \text{--} 1 . 5 & \text{Face load distribution (misalignment)} \\
K _ { m } & 1 . 0 \text{--} 1 . 3 & \text{Size effect} \\
Y _ { N } & 0 . 8 5 \text{--} 1 . 3 & \text{Life factor (fatigue)} \\
\end{array}
$$

**The AGMA equation is the modern gear design standard, and the standard is the reason the gear is designed for the dynamic load, not the static load. The engineer who uses the Lewis equation without the AGMA factors is not designing the gear; they are designing a gear that will fail by dynamic overload.**
:::

::: widget plot
title: The Lewis form factor vs number of teeth
f: 0.308-0.921/x; 0.351-1.508/x; 0.450-2.256/x
x: 10,100
y: 0.1,0.5
labels: 14.5 deg; 20 deg; 25 deg
caption: The Lewis form factor $Y$ against the number of teeth for three pressure angles. **The form factor increases with the number of teeth, and the increase is the reason the large gear is stronger than the small gear. The form factor increases with the pressure angle, and the increase is the reason the $2 5 ^ { \circ }$ pressure angle is stronger than the $1 4 . 5 ^ { \circ }$ pressure angle.** **The $2 0 ^ { \circ }$ pressure angle is the standard choice, because the $2 0 ^ { \circ }$ pressure angle is a compromise between the strength (higher pressure angle) and the smoothness (lower pressure angle).**
:::

::: example Lewis bending stress calculation {#ex-lewis-stress level=3 check="2"}
A spur gear has $N = 3 0$ teeth, $m = 4$ mm, $b = 4 0$ mm, $\phi = 2 0 ^ { \circ }$ , and transmits 10 kW at 1 200 rpm. The pitch diameter is $d = 1 2 0$ mm. Calculate the tooth root bending stress.

**Transmitted load:**

$$
T \; = \; { \frac { P } { \omega } } \; = \; { \frac { 1 0 \ 0 0 0 } { 2 \pi \times 1 \ 2 0 0 / 6 0 } } \; = \; { \frac { 1 0 \ 0 0 0 } { 1 2 5 . 7 } } \; = \; 7 9 . 6 \ \text{N} { \cdot } \text{m}
$$

$$
W _ { t } \; = \; { \frac { 2 T } { d } } \; = \; { \frac { 2 \times 7 9 . 6 \times 1 0 ^ { 3 } } { 1 2 0 } } \; = \; 1 \ 3 2 7 \ \text{N}
$$

**Lewis form factor:** $Y = 0 . 3 7 7$ (from the table, $N = 3 0$ , $\phi = 2 0 ^ { \circ }$ ).

**Bending stress:**

$$
\sigma _ { b } \; = \; { \frac { W _ { t } } { b \, m \, Y } } \; = \; { \frac { 1 \ 3 2 7 } { 4 0 \times 4 \times 0 . 3 7 7 } } \; = \; { \frac { 1 \ 3 2 7 } { 6 0 . 3 } } \; = \; { \bf 2 2 } \ \text{MPa}
$$

**The tooth root bending stress (22 MPa) is well below the typical allowable bending stress for steel gears (200–400 MPa). The gear is not sized by the bending stress; it is sized by the pitting (the Hertzian contact stress).**
:::

## 3. The Hertzian contact stress and pitting

::: definition The Hertzian contact stress for gear teeth {#def-hertzian}
The **Hertzian contact stress** is the maximum compressive stress at the tooth contact surface, and the Hertzian contact stress is the cause of the pitting failure:

$$
\sigma _ { H } \; = \; Z _ { E } \, { \sqrt { \frac { W _ { t } \, K _ { A } \, K _ { v } \, K _ { H } \, K _ { m } } { b \, d _ { 1 } \, I } } }
$$

where $Z _ { E }$ is the elastic coefficient and $I$ is the geometry factor.

For steel gears:

$$
Z _ { E } \; = \; { \sqrt { \frac { 1 } { \pi \, ( 1 - \nu _ { 1 } ^ { 2 } ) / E _ { 1 } + \pi \, ( 1 - \nu _ { 2 } ^ { 2 } ) / E _ { 2 } } } } \; \approx \; 1 9 0 \ { \sqrt { \text{MPa} } }
$$

The **pitting safety factor** is:

$$
S _ { H } \; = \; { \frac { \sigma _ { H , \text{allow } } } { \sigma _ { H } } }
$$

$$
\begin{array} { l c c }
\textbf{Material} & \textbf{ } \sigma _ { H , \text{allow } } \textbf{ (MPa)} & \textbf{Pitting resistance} \\ \hline
\text{Steel (through-hardened)} & 1 2 0 0 \text{--} 1 4 0 0 & \text{Medium} \\
\text{Steel (carburised)} & 1 5 0 0 \text{--} 1 8 0 0 & \text{High} \\
\text{Steel (nitrided)} & 1 8 0 0 \text{--} 2 2 0 0 & \text{Very high} \\
\text{Cast iron} & 8 0 0 \text{--} 1 0 0 0 & \text{Low} \\
\text{Bronze} & 4 0 0 \text{--} 6 0 0 & \text{Very low} \\
\text{Phenolic} & 1 0 0 \text{--} 2 0 0 & \text{Extremely low} \\
\end{array}
$$

**The pitting is the most common gear failure mode (60–80 % of gear failures), and the pitting is the reason the Hertzian contact stress is the most important gear design criterion. The engineer who designs the gear by the Lewis bending equation without checking the Hertzian contact stress is not designing the gear; they are designing a gear that will fail by pitting, not bending.**
:::

::: definition The gear efficiency {#def-gear-efficiency}
The **gear efficiency** is the ratio of the output power to the input power, and the gear efficiency is the reason the gear is the most efficient machine element:

$$
\eta \; = \; { \frac { P _ { \text{out } } } { P _ { \text{in } } } } \; = \; 1 - { \frac { P _ { \text{loss } } } { P _ { \text{in } } } }
$$

The power loss is the sum of the **tooth mesh loss** (the sliding friction), the **churning loss** (the lubricant agitation), and the **bearing loss** (the rolling friction):

$$
P _ { \text{loss } } \; = \; P _ { \text{mesh } } + P _ { \text{churn } } + P _ { \text{bearing } }
$$

$$
\begin{array} { l c l }
\textbf{Gear type} & \textbf{Efficiency per mesh} & \textbf{Loss mechanism} \\ \hline
\text{Spur} & 9 8 \text{--} 9 9 \ \% & \text{Sliding friction} \\
\text{Helical} & 9 7 \text{--} 9 9 \ \% & \text{Sliding friction + thrust} \\
\text{Bevel (straight)} & 9 4 \text{--} 9 7 \ \% & \text{Sliding friction} \\
\text{Bevel (spiral)} & 9 6 \text{--} 9 8 \ \% & \text{Sliding friction} \\
\text{Worm} & 4 0 \text{--} 9 0 \ \% & \text{Sliding friction (high)} \\
\text{Planetary} & 9 6 \text{--} 9 8 \ \% & \text{Sliding friction + bearing} \\
\end{array}
$$

**The worm gear has the lowest efficiency (40–90 %), and the low efficiency is the reason the worm gear is not used for continuous power transmission. The spur gear has the highest efficiency (98–99 %), and the high efficiency is the reason the spur gear is the most widely used gear type.**
:::

::: widget plot
title: The gear efficiency vs the gear type
f: 99; 98; 96; 94; 70
x: 0,5
y: 0,100
labels: Spur; Helical; Spiral bevel; Straight bevel; Worm
caption: The gear efficiency per mesh against the gear type. **The spur gear has the highest efficiency (98–99 %), and the high efficiency is the reason the spur gear is the most widely used gear type. The worm gear has the lowest efficiency (40–90 %), and the low efficiency is the reason the worm gear is not used for continuous power transmission.** **The efficiency is the reason the gear is the most efficient machine element, and the efficiency is the reason the gear is the most widely used power transmission element.**
:::

::: example Hertzian contact stress calculation {#ex-hertzian-stress level=3 check="2"}
A steel spur gear has $d _ { 1 } = 1 0 0$ mm, $b = 4 0$ mm, $W _ { t } = 2 \ 0 0 0$ N, and $I = 0 . 1$ . The elastic coefficient is $Z _ { E } = 1 9 0 ~ { \sqrt { \text{MPa} } }$ . Calculate the Hertzian contact stress and the pitting safety factor if $\sigma _ { H , \text{allow } } = 1 4 0 0$ MPa.

$$
\sigma _ { H } \; = \; Z _ { E } \, { \sqrt { \frac { W _ { t } } { b \, d _ { 1 } \, I } } } \; = \; 1 9 0 \, { \sqrt { \frac { 2 \ 0 0 0 } { 4 0 \times 1 0 0 \times 0 . 1 } } } \; = \; 1 9 0 \, { \sqrt { 5 } } \; = \; 1 9 0 \times 2 . 2 3 6 \; = \; { \bf 4 2 5 } \ \text{MPa}
$$

**Pitting safety factor:**

$$
S _ { H } \; = \; { \frac { 1 \ 4 0 0 } { 4 2 5 } } \; = \; { \bf 3 . 2 9 }
$$

**The pitting safety factor (3.29) exceeds the typical requirement of 1.5–2.0. The gear is safe against pitting. The engineer must also check the bending safety factor, and the bending safety factor is the reason the gear is designed for both the bending and the pitting.**
:::

## 4. Gear materials and heat treatment

::: definition The gear materials and their properties {#def-gear-materials}
The **gear material** is selected by the load, the speed, the noise, the cost, and the environment:

$$
\begin{array} { l c c c l }
\textbf{Material} & \textbf{ } \sigma _ { b , \text{allow } } \textbf{ (MPa)} & \textbf{ } \sigma _ { H , \text{allow } } \textbf{ (MPa)} & \textbf{Cost} & \textbf{Use case} \\ \hline
\text{Steel (AISI 1045, through-hardened)} & 2 0 0 \text{--} 3 0 0 & 1 2 0 0 \text{--} 1 4 0 0 & \text{Low} & \text{General purpose} \\
\text{Steel (AISI 4140, through-hardened)} & 3 0 0 \text{--} 4 0 0 & 1 3 0 0 \text{--} 1 5 0 0 & \text{Low} & \text{Medium duty} \\
\text{Steel (AISI 8620, carburised)} & 4 0 0 \text{--} 6 0 0 & 1 5 0 0 \text{--} 1 8 0 0 & \text{Medium} & \text{High duty} \\
\text{Steel (nitrided)} & 3 5 0 \text{--} 5 0 0 & 1 8 0 0 \text{--} 2 2 0 0 & \text{High} & \text{Precision, high load} \\
\text{Cast iron (gray)} & 8 0 \text{--} 1 2 0 & 8 0 0 \text{--} 1 0 0 0 & \text{Very low} & \text{Low speed, low noise} \\
\text{Cast iron (ductile)} & 1 5 0 \text{--} 2 5 0 & 1 0 0 0 \text{--} 1 2 0 0 & \text{Low} & \text{Medium duty} \\
\text{Bronze} & 6 0 \text{--} 1 0 0 & 4 0 0 \text{--} 6 0 0 & \text{Medium} & \text{Worm gear wheel} \\
\text{Phenolic} & 2 0 \text{--} 4 0 & 1 0 0 \text{--} 2 0 0 & \text{Low} & \text{Low noise, light duty} \\
\end{array}
$$

**The carburised steel gear has the highest bending strength (400–600 MPa) and the highest pitting resistance (1 500–1 800 MPa), and the high strength is the reason the carburised steel gear is the most widely used gear in automotive and aerospace applications.**
:::

::: example Gear design for a gearbox {#ex-gear-design level=3 check="3"}
A gearbox requires a 3:1 reduction, transmitting 15 kW at 1 500 rpm (input). The input gear has $N _ { 1 } = 2 0$ teeth, $m = 4$ mm, $b = 5 0$ mm, $\phi = 2 0 ^ { \circ }$ . The material is AISI 8620 carburised steel ($\sigma _ { b , \text{allow } } = 5 0 0$ MPa, $\sigma _ { H , \text{allow } } = 1 7 0 0$ MPa). Check the bending and pitting safety factors.

**Output gear:** $N _ { 2 } = 6 0$ teeth, $d _ { 2 } = 2 4 0$ mm.

**Input torque:**

$$
T _ { 1 } \; = \; { \frac { 1 5 \ 0 0 0 } { 2 \pi \times 1 \ 5 0 0 / 6 0 } } \; = \; { \frac { 1 5 \ 0 0 0 } { 1 5 7 . 1 } } \; = \; 9 5 . 5 \ \text{N} { \cdot } \text{m}
$$

**Transmitted load:**

$$
W _ { t } \; = \; { \frac { 2 T _ { 1 } } { d _ { 1 } } } \; = \; { \frac { 2 \times 9 5 . 5 \times 1 0 ^ { 3 } } { 8 0 } } \; = \; 2 \ 3 8 8 \ \text{N}
$$

**Bending stress (Lewis, $Y = 0 . 3 3 1$ for $N = 2 0$ , $\phi = 2 0 ^ { \circ }$ ):**

$$
\sigma _ { b } \; = \; { \frac { 2 \ 3 8 8 } { 5 0 \times 4 \times 0 . 3 3 1 } } \; = \; { \frac { 2 \ 3 8 8 } { 6 6 . 2 } } \; = \; 3 6 . 1 \ \text{MPa}
$$

$$
S _ { F } \; = \; { \frac { 5 0 0 } { 3 6 . 1 } } \; = \; { \bf 1 3 . 8 }
$$

**Pitting stress ($I = 0 . 1 2$ , $Z _ { E } = 1 9 0 ~ { \sqrt { \text{MPa} } }$ ):**

$$
\sigma _ { H } \; = \; 1 9 0 \, { \sqrt { \frac { 2 \ 3 8 8 } { 5 0 \times 8 0 \times 0 . 1 2 } } } \; = \; 1 9 0 \, { \sqrt { 4 . 9 7 5 } } \; = \; 1 9 0 \times 2 . 2 3 \; = \; 4 2 4 \ \text{MPa}
$$

$$
S _ { H } \; = \; { \frac { 1 \ 7 0 0 } { 4 2 4 } } \; = \; { \bf 4 . 0 1 }
$$

**The bending safety factor (13.8) and the pitting safety factor (4.01) both exceed the typical requirements (1.5–2.0). The gear is safe against both bending and pitting. The pitting is the governing criterion, and the governing criterion is the reason the pitting is the most important gear design criterion.**
:::

::: example Worm gear design {#ex-worm-gear level=3 check="2"}
A worm gear reducer has a 2-start worm with a module of 6 mm and a worm wheel with 40 teeth. The input speed is 1 450 rpm, and the input torque is 20 N·m. The friction coefficient is $\\mu = 0 . 0 4$ . Calculate the gear ratio, the output speed, the output torque, and the efficiency.

**Gear ratio:**

$$
i \\; = \\; { \\frac { N _ { \\text{wheel } } } { N _ { \\text{start } } } } \\; = \\; { \\frac { 4 0 } { 2 } } \\; = \\; { \\bf 2 0 }
$$

**Output speed:**

$$
n _ { \\text{out } } \\; = \\; { \\frac { n _ { \\text{in } } } { i } } \\; = \\; { \\frac { 1 \\ 4 5 0 } { 2 0 } } \\; = \\; { \\bf 7 2 . 5 } \\ \\text{rpm}
$$

**Lead angle:**

$$
\\tan \\lambda \\; = \\; { \\frac { N _ { \\text{start } } \\, m } { d _ { \\text{worm } } } } \\; = \\; { \\frac { 2 \\times 6 } { 5 0 } } \\; = \\; 0 . 2 4 \\quad \\Longrightarrow \\quad \\lambda \\; = \\; 1 3 . 5 ^ { \\circ }
$$

**Efficiency:**

$$
\\eta \\; = \\; { \\frac { \\tan \\lambda } { \\tan ( \\lambda + \\arctan \\mu ) } } \\; = \\; { \\frac { \\tan 1 3 . 5 ^ { \\circ } } { \\tan ( 1 3 . 5 ^ { \\circ } + 2 . 2 9 ^ { \\circ } ) } } \\; = \\; { \\frac { 0 . 2 4 0 } { 0 . 2 8 3 } } \\; = \\; { \\bf 8 4 . 8 } \\ \\%
$$

**Output torque:**

$$
T _ { \\text{out } } \\; = \\; T _ { \\text{in } } \\times i \\times \\eta \\; = \\; 2 0 \\times 2 0 \\times 0 . 8 4 8 \\; = \\; { \\bf 3 3 9 } \\ \\text{N} { \\cdot } \\text{m}
$$

**The worm gear reducer has a 20:1 ratio, an output speed of 72.5 rpm, an output torque of 339 N·m, and an efficiency of 84.8 %. The efficiency is the reason the worm gear requires a cooling system, and the cooling system is the reason the worm gear is not used for continuous power transmission above 10 kW.**
:::

## Exercises

::: exercise Lewis bending stress {#ex-lewis-ex level=3 check="2"}
A spur gear has $N = 4 0$ teeth, $m = 3$ mm, $b = 3 0$ mm, $\phi = 2 0 ^ { \circ }$ , and transmits 5 kW at 900 rpm. Calculate the tooth root bending stress.

::: solution
**Transmitted load:**

$$
T \; = \; { \frac { 5 \ 0 0 0 } { 2 \pi \times 9 0 0 / 6 0 } } \; = \; { \frac { 5 \ 0 0 0 } { 9 4 . 2 } } \; = \; 5 3 . 1 \ \text{N} { \cdot } \text{m}
$$

$$
d = m N = 3 \times 4 0 = 1 2 0 \ \text{mm}
$$

$$
W _ { t } \; = \; { \frac { 2 \times 5 3 . 1 \times 1 0 ^ { 3 } } { 1 2 0 } } \; = \; 8 8 5 \ \text{N}
$$

**Lewis form factor:** $Y = 0 . 4 0 0$ (from the table, $N = 4 0$ , $\phi = 2 0 ^ { \circ }$ ).

$$
\sigma _ { b } \; = \; { \frac { 8 8 5 } { 3 0 \times 3 \times 0 . 4 0 0 } } \; = \; { \frac { 8 8 5 } { 3 6 } } \; = \; { \bf 2 4 . 6 } \ \text{MPa}
$$

**The tooth root bending stress is 24.6 MPa, which is well below the typical allowable bending stress for steel gears (200–400 MPa).**
:::
:::

::: exercise Hertzian contact stress {#ex-hertzian-ex level=3 check="2"}
A steel gear has $d _ { 1 } = 8 0$ mm, $b = 3 5$ mm, $W _ { t } = 1 5 0 0$ N, $I = 0 . 1 1$ , and $Z _ { E } = 1 9 0 ~ { \sqrt { \text{MPa} } }$ . Calculate the Hertzian contact stress and the pitting safety factor if $\sigma _ { H , \text{allow } } = 1 5 0 0$ MPa.

::: solution
$$
\sigma _ { H } \; = \; 1 9 0 \, { \sqrt { \frac { 1 \ 5 0 0 } { 3 5 \times 8 0 \times 0 . 1 1 } } } \; = \; 1 9 0 \, { \sqrt { 4 . 8 7 } } \; = \; 1 9 0 \times 2 . 2 1 \; = \; { \bf 4 2 0 } \ \text{MPa}
$$

$$
S _ { H } \; = \; { \frac { 1 \ 5 0 0 } { 4 2 0 } } \; = \; { \bf 3 . 5 7 }
$$

**The pitting safety factor (3.57) exceeds the typical requirement of 1.5–2.0. The gear is safe against pitting.**
:::
:::

::: exercise Gear efficiency {#ex-gear-efficiency-ex level=3 check="2"}
A two-stage spur gear reducer has an efficiency of 98 % per mesh. The input power is 20 kW. Calculate the output power and the total power loss.

::: solution
**Total efficiency (two meshes):**

$$
\eta _ { \text{total } } \; = \; 0 . 9 8 ^ { 2 } \; = \; 0 . 9 6 0 4 \; = \; 9 6 . 0 \ \%
$$

**Output power:**

$$
P _ { \text{out } } \; = \; 2 0 \times 0 . 9 6 0 4 \; = \; { \bf 1 9 . 2 } \ \text{kW}
$$

**Total power loss:**

$$
P _ { \text{loss } } \; = \; 2 0 - 1 9 . 2 \; = \; { \bf 0 . 8 } \ \text{kW}
$$

**The total power loss is 0.8 kW, which is 4 % of the input power. The power loss is the reason the gearbox requires a cooling system, and the cooling system is the reason the gearbox is designed for the thermal capacity, not just the load capacity.**
:::
:::

::: exercise Gear module selection {#ex-gear-module level=3 check="2"}
A spur gear must transmit 10 kW at 600 rpm. The allowable bending stress is 300 MPa, the face width is 40 mm, and $N = 2 5$ teeth ($Y = 0 . 3 6 2$ for $\phi = 2 0 ^ { \circ }$ ). Calculate the required module.

::: solution
**Transmitted load:**

$$
T \; = \; { \frac { 1 0 \ 0 0 0 } { 2 \pi \times 6 0 0 / 6 0 } } \; = \; { \frac { 1 0 \ 0 0 0 } { 6 2 . 8 } } \; = \; 1 5 9 . 2 \ \text{N} { \cdot } \text{m}
$$

$$
d = m N = 2 5 m
$$

$$
W _ { t } \; = \; { \frac { 2 T } { d } } \; = \; { \frac { 2 \times 1 5 9 . 2 \times 1 0 ^ { 3 } } { 2 5 m } } \; = \; { \frac { 1 2 \ 7 3 6 } { m } } \ \text{N}
$$

**Lewis equation:**

$$
\sigma _ { b } \; = \; { \frac { W _ { t } } { b \, m \, Y } } \; = \; { \frac { 1 2 \ 7 3 6 / m } { 4 0 \times m \times 0 . 3 6 2 } } \; = \; { \frac { 1 2 \ 7 3 6 } { 1 4 . 4 8 \, m ^ { 2 } } } \; \le \; 3 0 0
$$

$$
m ^ { 2 } \; \ge \; { \frac { 1 2 \ 7 3 6 } { 1 4 . 4 8 \times 3 0 0 } } \; = \; 2 . 9 3 \quad \Longrightarrow \quad m \; \ge \; { \bf 1 . 7 1 } \ \text{mm}
$$

**The required module is 1.71 mm. The engineer would select $m = 2$ mm (the next standard module), which gives a bending stress of 220 MPa and a safety factor of 1.36.**
:::
:::

::: exercise Worm gear efficiency {#ex-worm-efficiency level=3 check="2"}
A worm gear has a lead angle $\lambda = 1 5 ^ { \circ }$ and a friction coefficient $\mu = 0 . 0 5$ . Calculate the efficiency.

::: solution
$$
\eta \; = \; { \frac { \tan \lambda } { \tan ( \lambda + \arctan \mu ) } } \; = \; { \frac { \tan 1 5 ^ { \circ } } { \tan ( 1 5 ^ { \circ } + 2 . 8 6 ^ { \circ } ) } } \; = \; { \frac { 0 . 2 6 8 } { \tan 1 7 . 8 6 ^ { \circ } } } \; = \; { \frac { 0 . 2 6 8 } { 0 . 3 2 2 } } \; = \; { \bf 8 3 . 2 } \ \ \%
$$

**The worm gear efficiency is 83.2 %, which is much lower than the spur gear efficiency (98–99 %). The low efficiency is the reason the worm gear is not used for continuous power transmission, and the low efficiency is the reason the worm gear requires a cooling system.**
:::
:::

::: exercise Gear geometry {#ex-gear-geometry level=3 check="2"}
A spur gear has $N = 3 6$ teeth and $m = 5$ mm. Calculate the pitch diameter, the addendum diameter, the dedendum diameter, the circular pitch, and the base circle diameter ($\phi = 2 0 ^ { \circ }$ ).

::: solution
$$
d \; = \; m \, N \; = \; 5 \times 3 6 \; = \; { \bf 1 8 0 } \ \text{mm}
$$

$$
d _ { a } \; = \; d + 2 \, m \; = \; 1 8 0 + 1 0 \; = \; { \bf 1 9 0 } \ \text{mm}
$$

$$
d _ { f } \; = \; d - 2 . 5 \, m \; = \; 1 8 0 - 1 2 . 5 \; = \; { \bf 1 6 7 . 5 } \ \text{mm}
$$

$$
p \; = \; \pi \, m \; = \; \pi \times 5 \; = \; { \bf 1 5 . 7 } \ \text{mm}
$$

$$
d _ { b } \; = \; d \cos \phi \; = \; 1 8 0 \times \cos 2 0 ^ { \circ } \; = \; { \bf 1 6 9 . 1 } \ \text{mm}
$$

**The gear geometry is the reason the gear meshes smoothly, and the smoothness is the reason the gear is quiet and long-lived.**
:::
:::

::: exercise Derivation: the Lewis equation {#ex-derive-lewis level=4 check="2"}
Show that the Lewis bending equation $\sigma _ { b } = W _ { t } / ( b \, m \, Y )$ is derived from the cantilever beam bending stress $\sigma = M \, c / I$ , where the tooth is modelled as a cantilever beam with a rectangular cross-section of width $b$ and thickness $t$ at the root, and the bending moment is $M = W _ { t } \, L$ . Evaluate the Lewis form factor $Y$ for $t = 6$ mm, $L = 1 0$ mm, and $m = 4$ mm.

::: solution
The cantilever beam bending stress is:

$$
\sigma \; = \; { \frac { M \, c } { I } } \; = \; { \frac { W _ { t } \, L \times ( t / 2 ) } { b \, t ^ { 3 } / 1 2 } } \; = \; { \frac { 6 \, W _ { t } \, L } { b \, t ^ { 2 } } }
$$

The Lewis equation defines the form factor $Y$ as:

$$
Y \; = \; { \frac { t ^ { 2 } } { 6 \, L \, m } }
$$

Substituting:

$$
\sigma _ { b } \; = \; { \frac { W _ { t } } { b \, m \, Y } }
$$

For $t = 6$ mm, $L = 1 0$ mm, $m = 4$ mm:

$$
Y \; = \; { \frac { 6 ^ { 2 } } { 6 \times 1 0 \times 4 } } \; = \; { \frac { 3 6 } { 2 4 0 } } \; = \; { \bf 0 . 1 5 }
$$

**The Lewis form factor is 0.15, which is lower than the tabulated value (0.3–0.5) because the tabulated value accounts for the tooth profile (the fillet, the taper). The Lewis equation is the foundation of gear design, and the foundation is the reason the Lewis equation is the most widely used gear design equation.** $\blacksquare$
:::
:::

::: exercise Derivation: the Hertzian contact stress {#ex-derive-hertzian level=4 check="2"}
Show that the Hertzian contact stress for two cylinders in contact is $\sigma _ { H } = { \sqrt { p _ { \max } E ^ { * } / ( \pi R ) } }$ where $p _ { \max }$ is the maximum contact pressure, $E ^ { * }$ is the effective modulus, and $R$ is the effective radius. Evaluate $\sigma _ { H }$ for $p _ { \max } = 2 \ 0 0 0$ MPa, $E ^ { * } = 1 1 3 \ 0 0 0$ MPa, and $R = 5 0$ mm.

::: solution
The Hertzian contact stress for two cylinders in contact is:

$$
\sigma _ { H } \; = \; { \sqrt { \frac { p _ { \max } \, E ^ { * } } { \pi \, R } } }
$$

$$
\sigma _ { H } \; = \; { \sqrt { \frac { 2 \ 0 0 0 \times 1 1 3 \ 0 0 0 } { \pi \times 5 0 } } } \; = \; { \sqrt { \frac { 2 . 2 6 \times 1 0 ^ { 8 } } { 1 5 7 . 1 } } } \; = \; { \sqrt { 1 . 4 4 \times 1 0 ^ { 6 } } } \; = \; { \bf 1 \ 2 0 0 } \ \text{MPa}
$$

**The Hertzian contact stress (1 200 MPa) is the maximum compressive stress at the contact surface, and the compressive stress is the cause of the pitting failure. The engineer who designs the gear without checking the Hertzian contact stress is not designing the gear; they are designing a gear that will fail by pitting.** $\blacksquare$
:::
:::

::: quiz Gear design {#quiz-gear}
The most common gear failure mode is:

- [ ] Tooth root bending fatigue
- [x] Surface pitting
- [ ] Tooth breakage
- [ ] Scuffing

::: solution
**Surface pitting.** The pitting is the most common gear failure mode (60–80 % of gear failures), and the pitting is the reason the Hertzian contact stress is the most important gear design criterion. The engineer who designs the gear by the Lewis bending equation without checking the Hertzian contact stress is not designing the gear; they are designing a gear that will fail by pitting, not bending.
:::
:::

::: quiz Gear efficiency {#quiz-gear-efficiency}
The gear type with the highest efficiency per mesh is:

- [ ] Worm gear
- [ ] Straight bevel gear
- [x] Spur gear
- [ ] Spiral bevel gear

::: solution
**Spur gear.** The spur gear has the highest efficiency per mesh (98–99 %), and the high efficiency is the reason the spur gear is the most widely used gear type. The worm gear has the lowest efficiency (40–90 %), and the low efficiency is the reason the worm gear is not used for continuous power transmission.
:::
:::

## Where this lesson leads

- **[[machine-design/shafts]]** — The gear forces are the input to the shaft bending moment diagram.
- **[[machine-design/bearings]]** — The bearing is selected by the gear's radial and axial loads.
- **[[machine-design/fatigue]]** — The gear tooth is sized by the fatigue criterion (the Lewis equation with the AGMA factors).
- **[[machine-design/static-failure]]** — The tooth root stress is a multiaxial stress state, and the multiaxial stress state requires the von Mises criterion.
- **[[machine-design/clutches-brakes-belts]]** — The gear is the most efficient power transmission element, and the efficiency is the reason the gear is the most widely used.
- **[[machine-design/fasteners-joints]]** — The gear is mounted on the shaft by the key, and the key is the fuse of the shaft.
- **[[materials-science/mechanical-properties]]** — The gear material's hardness and fatigue strength determine the pitting resistance and the bending strength.
- **[[mechanisms/gear-trains]]** — The gear train analysis is the foundation of the gearbox design.

::: history Gear design: from the involute curve to the AGMA standard {#history-gears}
**1674** — **Ole Rømer** proposes the **cycloidal tooth profile**, the first mathematically correct gear tooth profile. **Rømer's cycloidal profile is the reason the gear meshes smoothly, and the smoothness is the reason the gear is the most precise machine element.**

**1733** — **Leonhard Euler** proposes the **involute tooth profile**, which is easier to manufacture than the cycloidal profile and is tolerant of the centre distance error. **Euler's involute profile is the reason the gear is the most widely used power transmission element, and the involute profile is the reason the gear is the most manufacturable machine element.**

**1892** — **Wilfred Lewis** publishes the **Lewis bending equation**, the first quantitative gear design equation. **The Lewis equation is the reason the gear is designed by the calculation, not the rule of thumb, and the calculation is the reason the gear is the most predictable machine element.**

**1910** — **The Hertzian contact stress** is applied to the gear tooth by the German engineer F. Pietikainen, who calculates the surface pitting life. **The Hertzian contact stress is the reason the gear is designed for the pitting, not just the bending, and the pitting is the reason the gear is the most reliable machine element.**

**1942** — **The AGMA (American Gear Manufacturers Association)** publishes the first gear design standard, which extends the Lewis equation to account for the dynamic load, the load distribution, and the size. **The AGMA standard is the reason the gear is designed by the standard, not the guess, and the standard is the reason the gear is the most standardised machine element.**

**1958** — **The ISO gear standard** is published, which harmonises the gear design methodology between the US and Europe. **The ISO standard is the reason the gear is the most international machine element, and the international standard is the reason the gear is the most widely used power transmission element.**

**1980** — **The finite element method** is applied to the gear tooth stress analysis, replacing the Lewis equation for the final design. **The FEA is the reason the gear tooth stress is calculated with 5 % accuracy, and the accuracy is the reason the gear is the most optimised machine element.**

**2000** — **The micro-geometry optimisation** (the tip relief, the profile shift, the crowning) becomes standard practice in gear design, reducing the noise by 5–10 dB and increasing the life by 50–100 %. **The micro-geometry optimisation is the reason the gear is the quietest machine element, and the quietness is the reason the gear is the most widely used power transmission element in automotive and aerospace applications.**
:::

::: summary Gear design {#summary-gear-design}
- **The gear is the most precise machine element, and the gear tooth is a cantilever beam that carries the transmitted load.** The gear determines the gearbox's noise, efficiency, and life.
- **The Lewis bending equation calculates the tooth root bending stress: $\sigma _ { b } = W _ { t } / ( b \, m \, Y )$ .** The Lewis equation is the foundation of gear design, and the foundation is the reason the Lewis equation is the most widely used gear design equation.
- **The AGMA 2001 equation extends the Lewis equation to account for the dynamic load, the load distribution, the size, and the reliability.** The AGMA equation is the modern gear design standard, and the standard is the reason the gear is designed for the dynamic load, not the static load.
- **The Hertzian contact stress is the maximum compressive stress at the tooth contact surface, and the Hertzian contact stress is the cause of the pitting failure.** The pitting is the most common gear failure mode (60–80 % of gear failures).
- **The gear efficiency is 98–99 % for spur gears, 97–99 % for helical gears, and 40–90 % for worm gears.** The worm gear has the lowest efficiency, and the low efficiency is the reason the worm gear is not used for continuous power transmission.
- **The gear material is selected by the load, the speed, the noise, the cost, and the environment.** The carburised steel gear has the highest bending strength (400–600 MPa) and the highest pitting resistance (1 500–1 800 MPa).
- **The gear geometry (module, pressure angle, face width) determines the tooth size, the tooth strength, and the gear diameter.** The module is the most important gear parameter, and the module is the reason the gear is designed by the module, not the diameter.
- **The gear quality (AGMA Q4–Q14) determines the tooth profile error, the pitch error, and the runout.** The gear quality is the most important factor in gear noise, and the noise is the reason the gear quality is specified in the drawing.
- **The micro-geometry optimisation (the tip relief, the profile shift, the crowning) reduces the noise by 5–10 dB and increases the life by 50–100 %.** The micro-geometry optimisation is the reason the gear is the quietest machine element.
- **The gear is the most efficient power transmission element (98–99 % per mesh), and the efficiency is the reason the gear is the most widely used power transmission element.** The gear is the most precise, the most efficient, and the most reliable machine element.
:::

## Further reading

- **Robert C. Juvinall and Kurt M. Marshek (2020)** — *Fundamentals of Machine Component Design*, 7th ed. Wiley. The Lewis equation, the AGMA equation, and the gear design examples.
- **Joseph E. Shigley, Charles R. Mischke and Richard G. Budynas (2015)** — *Mechanical Engineering Design*, 11th ed. McGraw-Hill. The Lewis equation, the Hertzian contact stress, and the gear design.
- **Faydor L. Litvin and Alfonso Fuentes (2004)** — *Gear Geometry and Applied Theory*, 2nd ed. Cambridge University Press. The gear geometry, the tooth profile, and the micro-geometry optimisation.
- **AGMA (2016)** — *AGMA 2001-D16: Gear Material and Gear Pair Selection*. AGMA. The gear design standard.
- **Robert B. W. (1994)** — *Dudley's Handbook of Practical Gear Design*, 2nd ed. CRC Press. The gear design handbook, the gear materials, and the heat treatment.
- **Iosif I. V. and D. B. (2001)** — *Gear Noise and Vibration*, 2nd ed. Marcel Dekker. The gear noise, the vibration, and the micro-geometry optimisation.
- **Henry H. (1994)** — *Fundamentals of Gear Design*. Mir Publishers. The Lewis equation, the Hertzian contact stress, and the gear geometry.
- **ISO 6336 (2019)** — *Calculation of Load Capacity of Spur and Helical Gears*. ISO. The ISO gear design standard.
