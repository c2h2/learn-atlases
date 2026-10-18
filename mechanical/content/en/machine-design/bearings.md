The bearing is the interface between the rotating shaft and the stationary housing, and the bearing is the component that determines the machine's life, accuracy, and efficiency. **The bearing that fails does not just stop the machine; it destroys the shaft, the gear, the seal, and the housing, and the destruction is the reason the bearing is the most common cause of machine failure.** The bearing design is a multi-criteria selection: the bearing must carry the radial and axial loads, maintain the shaft position, minimise the friction, and survive the design life. **The engineer who selects the bearing by the load rating alone is not selecting the bearing; they are selecting a bearing that will fail by fatigue, wear, or overheating.**

The quantitative tools of bearing design are the **L10 life** (the bearing life at 90 % reliability), the **SKF general life equation** (the life modification factors), the **Reynolds equation** (the journal bearing pressure distribution), the **Petroff equation** (the friction coefficient), and the **Sommerfeld number** (the bearing performance parameter). The tools are the language in which the bearing design decision is expressed, and the language is the reason the bearing design is a calculation, not a guess.

::: warning Nine ways bearing design goes wrong
**Not calculating the L10 life.** The engineer who selects the bearing by the static load rating without calculating the L10 life is not selecting the bearing; they are selecting a bearing that will fail by fatigue. **The L10 life is the number of revolutions (or hours) at which 10 % of the bearings fail, and the 10 % is the reason the L10 life is the design basis for the bearing.** **Not accounting for the equivalent dynamic load.** The engineer who uses the radial load alone when the bearing is subjected to a combined radial and axial load is not calculating the L10 life; they are guessing. **The equivalent dynamic load $P = X F _ { r } + Y F _ { a }$ accounts for the combined loading, and the combination is the reason the bearing life is reduced by 50–90 %.** **Not accounting for the reliability factor.** The engineer who uses the L10 life (90 % reliability) when the application requires 99 % reliability is not designing for the reliability; they are designing for the 10 % that fail. **The reliability factor $a _ { 1 }$ reduces the life by 20–50 % for 99 % reliability, and the reduction is the reason the bearing must be oversized for high-reliability applications.** **Not checking the static load rating.** The engineer who calculates the L10 life without checking the static load rating is not designing the bearing; they are designing a bearing that will fail by brinelling. **The static load rating $C _ { 0 }$ must be greater than the equivalent static load $P _ { 0 }$ with a safety factor of 1.5–3, and the safety factor is the reason the bearing is not brinelled by the shock load.** **Not accounting for the speed limit.** The engineer who selects the bearing by the load rating without checking the speed limit is not selecting the bearing; they are selecting a bearing that will fail by overheating. **The speed limit $n _ { \max }$ is determined by the bearing type, the lubrication, and the clearance, and the limit is the reason the bearing must be selected for the speed, not just the load.** **Not accounting for the lubrication.** The engineer who selects the bearing without specifying the lubricant, the viscosity, and the supply method is not designing the bearing; they are selecting a bearing that will fail by wear. **The lubrication is the reason the bearing life is 10× longer with the correct lubricant than with the incorrect lubricant, and the 10× is the reason the lubrication is the most important factor in bearing design.** **Not accounting for the fit.** The engineer who selects the bearing without specifying the shaft and housing fits is not designing the bearing; they are selecting a bearing that will fail by creep or seizure. **The fit is the reason the bearing life is 5× longer with the correct fit than with the incorrect fit, and the 5× is the reason the fit is the most important factor in bearing installation.** **Not accounting for the misalignment.** The engineer who selects the bearing without checking the misalignment tolerance is not designing the bearing; they are selecting a bearing that will fail by edge loading. **The misalignment tolerance is 2–4° for spherical bearings and 0.5° for cylindrical bearings, and the tolerance is the reason the bearing must be selected for the misalignment, not just the load.** **Not accounting for the temperature.** The engineer who uses the room-temperature load rating for a bearing operating at 200 °C is not designing for the temperature; they are designing for the room. **The load rating at 200 °C is 70–80 % of the room-temperature rating, and the reduction is the reason the bearing must be derated for the temperature.**
:::

## 1. Rolling element bearings

::: definition The bearing types and their load capacity {#def-bearing-types}
The **rolling element bearing** is the most common bearing type in machine design, because the rolling element bearing has a low friction coefficient (0.001–0.005), a high load capacity, and a long life.

$$
\begin{array} { l c c c l }
\textbf{Bearing type} & \textbf{Radial load} & \textbf{Axial load} & \textbf{Speed limit} & \textbf{Misalignment} \\ \hline
\text{Deep groove ball} & \text{High} & \text{Medium} & \text{Very high} & 2\text{--}4^\circ \\
\text{Angular contact ball} & \text{Medium} & \text{High} & \text{Very high} & 2\text{--}4^\circ \\
\text{Self-aligning ball} & \text{Medium} & \text{Low} & \text{High} & 2\text{--}4^\circ \\
\text{Cylindrical roller} & \text{Very high} & \text{None} & \text{High} & 0.5^\circ \\
\text{Tapered roller} & \text{High} & \text{High} & \text{Medium} & 0.5^\circ \\
\text{Spherical roller} & \text{Very high} & \text{Medium} & \text{Medium} & 2\text{--}4^\circ \\
\text{Thrust ball} & \text{None} & \text{Very high} & \text{Medium} & 2\text{--}4^\circ \\
\text{Needle roller} & \text{High} & \text{Low} & \text{Medium} & 0.5^\circ \\
\end{array}
$$

**The bearing type is selected by the load direction, the speed, the misalignment tolerance, and the space constraint. The engineer who selects the bearing by the load rating alone is not selecting the bearing; they are selecting a bearing that will fail by wear, overheating, or misalignment.**
:::

::: definition The L10 life and the basic dynamic load rating {#def-l10-life}
The **L10 life** is the number of revolutions (or hours at a constant speed) at which 90 % of the bearings survive and 10 % fail by fatigue. The L10 life is:

$$
L _ { 1 0 } \; = \; \left( { \frac { C } { P } } \right) ^ { p }
$$

where $C$ is the basic dynamic load rating, $P$ is the equivalent dynamic load, and $p$ is the life exponent:

$$
p \; = \; { \left\{ \begin{array} { l l } { 3 } & { \text{ball bearings} } \\ { 1 0 / 3 } & { \text{roller bearings} } \end{array} \right. }
$$

The **L10 life in hours** is:

$$
L _ { 1 0 , h } \; = \; { \frac { 1 0 ^ { 6 } } { 6 0 \, n } } \, \left( { \frac { C } { P } } \right) ^ { p }
$$

where $n$ is the rotational speed in rpm.

$$
\begin{array} { l c l }
\textbf{Application} & \textbf{Typical } L _ { 1 0 , h } \textbf{ (hours)} & \textbf{Reason} \\ \hline
\text{Electric motor} & 1 0 0 \ 0 0 0 & \text{Continuous operation, low maintenance} \\
\text{Gearbox} & 5 0 \ 0 0 0 \text{--} 1 0 0 \ 0 0 0 & \text{Continuous operation} \\
\text{Machine tool} & 1 0 \ 0 0 0 \text{--} 5 0 \ 0 0 0 & \text{Intermittent operation, high accuracy} \\
\text{Automotive wheel} & 5 0 \ 0 0 0 \text{--} 1 0 0 \ 0 0 0 & \text{Sealed, lubricated for life} \\
\text{Aircraft engine} & 5 \ 0 0 0 \text{--} 1 0 \ 0 0 0 & \text{Overhauled regularly} \\
\text{Mining equipment} & 2 0 \ 0 0 0 \text{--} 5 0 \ 0 0 0 & \text{Heavy duty, shock loading} \\
\end{array}
$$

**The L10 life is the design basis for the bearing, and the design basis is the reason the bearing is selected by the L10 life, not the static load rating. The engineer who selects the bearing by the static load rating is not selecting the bearing; they are selecting a bearing that will fail by fatigue.**
:::

::: definition The equivalent dynamic load {#def-equivalent-load}
The **equivalent dynamic load** is the constant radial load that would produce the same L10 life as the actual combined radial and axial load:

$$
P \; = \; X \, F _ { r } \; + \; Y \, F _ { a }
$$

where $F _ { r }$ is the radial load, $F _ { a }$ is the axial load, and $X$ and $Y$ are the load factors.

$$
\begin{array} { l c c c }
\textbf{Bearing type} & \textbf{ } X & \textbf{ } Y & \textbf{Condition} \\ \hline
\text{Deep groove ball} & 1 & 0 & F _ { a } / F _ { r } \le e \\
\text{Deep groove ball} & 0 . 5 6 & 1 . 5 \text{--} 2 . 5 & F _ { a } / F _ { r } > e \\
\text{Angular contact ball} & 1 & 0 & F _ { a } / F _ { r } \le e \\
\text{Angular contact ball} & 0 . 4 4 & 1 . 5 \text{--} 2 . 0 & F _ { a } / F _ { r } > e \\
\text{Tapered roller} & 0 . 4 & 0 . 4 / { \tan \alpha } & \text{Always} \\
\text{Cylindrical roller} & 1 & 0 & \text{Radial only} \\
\end{array}
$$

where $e$ is the axial load factor (typically 0.2–0.4).

**The equivalent dynamic load is the reason the bearing life is reduced by 50–90 % when the axial load is present. The engineer who uses the radial load alone when the bearing is subjected to a combined radial and axial load is not calculating the L10 life; they are guessing.**
:::

::: widget plot
title: The bearing life vs the load ratio
f: (1/x)^3; (1/x)^(10/3)
x: 0.1,1
y: 0,1000
labels: Ball (p=3); Roller (p=10/3)
caption: The L10 life (in units of $1 0 ^ { 6 }$ revolutions) against the load ratio $C / P$ for ball bearings ($p = 3$) and roller bearings ($p = 1 0 / 3$). **The roller bearing has a steeper life-load curve than the ball bearing, and the steepness is the reason the roller bearing is more sensitive to the overload. The engineer who overloads the roller bearing by 20 % reduces the life by 50 %, and the 50 % is the reason the roller bearing is not used in shock-loaded applications.** **The ball bearing is more forgiving of the overload, and the forgiveness is the reason the ball bearing is the most widely used bearing type.**
:::

::: example L10 life calculation {#ex-l10-life level=3 check="2"}
A deep groove ball bearing has a basic dynamic load rating $C = 5 0$ kN and is subjected to a radial load $F _ { r } = 1 0$ kN and an axial load $F _ { a } = 5$ kN. The speed is 1 500 rpm. The axial load factor is $e = 0 . 3$ , and for $F _ { a } / F _ { r } > e$ , $X = 0 . 5 6$ and $Y = 1 . 8$ . Calculate the L10 life in hours.

**Load ratio:**

$$
{ \frac { F _ { a } } { F _ { r } } } \; = \; { \frac { 5 } { 1 0 } } \; = \; 0 . 5 \; > \; e \; = \; 0 . 3
$$

**Equivalent dynamic load:**

$$
P \; = \; 0 . 5 6 \times 1 0 + 1 . 8 \times 5 \; = \; 5 . 6 + 9 . 0 \; = \; 1 4 . 6 \ \text{kN}
$$

**L10 life in revolutions:**

$$
L _ { 1 0 } \; = \; \left( { \frac { 5 0 } { 1 4 . 6 } } \right) ^ { 3 } \; = \; 3 . 4 2 ^ { 3 } \; = \; 4 0 . 0 \times 1 0 ^ { 6 } \ \text{revolutions}
$$

**L10 life in hours:**

$$
L _ { 1 0 , h } \; = \; { \frac { 1 0 ^ { 6 } } { 6 0 \times 1 \ 5 0 0 } } \times 4 0 . 0 \; = \; { \bf 4 4 5 } \ \text{hours}
$$

**The L10 life is 445 hours, which is far below the typical requirement of 100 000 hours for an electric motor. The engineer must select a larger bearing or reduce the load.**
:::

::: definition The SKF general life equation {#def-skf-life}
The **SKF general life equation** (the life modification approach) extends the L10 life to account for the reliability, the lubrication, the contamination, and the fatigue load limit:

$$
L _ { n m } \; = \; a _ { 1 } \, a _ { \text{SKF } } \, L _ { 1 0 }
$$

where $a _ { 1 }$ is the reliability factor and $a _ { \text{SKF } }$ is the life modification factor.

$$
\begin{array} { l c c }
\textbf{Reliability} & \textbf{ } a _ { 1 } & \textbf{ } L _ { n m } / L _ { 1 0 } \\ \hline
90 \ \% \; ( L _ { 1 0 } ) & 1 . 0 0 & 1 . 0 0 \\
95 \ \% \; ( L _ { 5 } ) & 0 . 6 4 & 0 . 6 4 \\
96 \ \% \; ( L _ { 4 } ) & 0 . 5 5 & 0 . 5 5 \\
99 \ \% \; ( L _ { 1 } ) & 0 . 2 1 & 0 . 2 1 \\
\end{array}
$$

**The reliability factor $a _ { 1 }$ reduces the life by 79 % for 99 % reliability, and the reduction is the reason the bearing must be oversized for high-reliability applications. The engineer who uses the L10 life (90 % reliability) when the application requires 99 % reliability is not designing for the reliability; they are designing for the 10 % that fail.**
:::

## 2. Journal bearings

::: definition The Reynolds equation and the journal bearing {#def-reynolds}
The **journal bearing** is the sliding bearing in which the shaft (the journal) rotates inside a stationary sleeve (the bearing), and the load is carried by a hydrodynamic lubricant film. The pressure distribution in the lubricant film is governed by the **Reynolds equation**:

$$
{ \frac { \partial } { \partial x } } \! \left( { \frac { h ^ { 3 } } { \mu } } { \frac { \partial p } { \partial x } } \right) + { \frac { \partial } { \partial z } } \! \left( { \frac { h ^ { 3 } } { \mu } } \! \, { \frac { \partial p } { \partial z } } \right) \; = \; 6 U { \frac { \partial h } { \partial x } }
$$

where $h$ is the film thickness, $\mu$ is the dynamic viscosity, $p$ is the pressure, and $U$ is the surface velocity.

The **film thickness ratio** (the eccentricity ratio) is:

$$
\varepsilon \; = \; { \frac { e } { c } } \; = \; 1 - { \frac { h _ { \min } } { c } }
$$

where $e$ is the eccentricity, $c$ is the radial clearance, and $h _ { \min }$ is the minimum film thickness.

**The eccentricity ratio $\varepsilon$ ranges from 0 (concentric, no load) to 1 (metal-to-metal contact, failure). The design eccentricity ratio is 0.6–0.8, and the range is the reason the journal bearing is designed for the minimum film thickness of $h _ { \min } = ( 0 . 2 \text{--} 0 . 4 ) \, c$ .**
:::

::: definition The Petroff equation and the friction coefficient {#def-petroff}
The **Petroff equation** estimates the friction coefficient in the journal bearing under the light-load assumption:

$$
f \; = \; { \frac { 2 \pi ^ { 2 } } { S } } \; + \; 0 . 6 \, { \frac { c } { r } }
$$

where $S$ is the **Sommerfeld number**:

$$
S \; = \; \left( { \frac { r } { c } } \right) ^ { 2 } { \frac { \mu \, n } { P }}
$$

where $r$ is the journal radius, $c$ is the radial clearance, $\mu$ is the dynamic viscosity, $n$ is the rotational speed (rev/s), and $P = W / ( r L )$ is the bearing pressure.

$$
\begin{array} { l c c }
\textbf{Bearing type} & \textbf{ } f \textbf{ (friction coefficient)} & \textbf{ } S \textbf{ (Sommerfeld number)} \\ \hline
\text{Lightly loaded} & 0 . 0 0 1 \text{--} 0 . 0 0 5 & > 5 \\
\text{Moderately loaded} & 0 . 0 0 5 \text{--} 0 . 0 1 & 1 \text{--} 5 \\
\text{Heavily loaded} & 0 . 0 1 \text{--} 0 . 0 3 & 0 . 1 \text{--} 1 \\
\text{Boundary lubrication} & 0 . 0 5 \text{--} 0 . 2 & < 0 . 1 \\
\end{array}
$$

**The Sommerfeld number is the most important parameter in journal bearing design, because the Sommerfeld number determines the eccentricity ratio, the friction coefficient, and the minimum film thickness. The engineer who designs the journal bearing without calculating the Sommerfeld number is not designing the bearing; they are guessing.**
:::

::: widget plot
title: The journal bearing performance curves
f: 0.001+0.01/x; 0.8/(1+0.1*x); 0.5*x/(1+0.5*x)
x: 0.1,10
y: 0,1
labels: Friction coefficient; Eccentricity ratio; Side flow
caption: The journal bearing performance against the Sommerfeld number $S$ . **The friction coefficient decreases with increasing $S$ (lighter load or faster speed), and the decrease is the reason the journal bearing is efficient at high speed. The eccentricity ratio decreases with increasing $S$ , and the decrease is the reason the journal bearing is less loaded at high speed. The side flow increases with increasing $S$ , and the increase is the reason the journal bearing requires more lubricant at high speed.** **The design point is at $S = 1 \text{--} 5$ , where the friction coefficient is 0.005–0.01 and the eccentricity ratio is 0.6–0.8.**
:::

::: example Journal bearing design {#ex-journal-bearing level=3 check="2"}
A journal bearing has a diameter of 50 mm, a length of 50 mm, a radial clearance of 0.05 mm, a speed of 3 000 rpm, and a load of 5 kN. The lubricant has a viscosity of 0.03 Pa·s. Calculate the Sommerfeld number, the minimum film thickness, and the friction coefficient.

**Bearing pressure:**

$$
P \; = \; { \frac { W } { r \, L } } \; = \; { \frac { 5 \ 0 0 0 } { 2 5 \times 5 0 } } \; = \; 4 \ \text{MPa}
$$

**Sommerfeld number:**

$$
S \; = \; \left( { \frac { r } { c } } \right) ^ { 2 } { \frac { \mu \, n } { P } } \; = \; \left( { \frac { 2 5 } { 0 . 0 5 } } \right) ^ { 2 } \times { \frac { 0 . 0 3 \times 5 0 } { 4 \times 1 0 ^ { 6 } } } \; = \; 2 5 0 \ 0 0 0 \times { \frac { 1 . 5 } { 4 \times 1 0 ^ { 6 } } } \; = \; { \bf 0 . 0 9 4 }
$$

**Eccentricity ratio (from the Raimondi-Boyd chart):** $\varepsilon \approx 0 . 9$ (heavily loaded).

**Minimum film thickness:**

$$
h _ { \min } \; = \; c \, ( 1 - \varepsilon ) \; = \; 0 . 0 5 \times ( 1 - 0 . 9 ) \; = \; { \bf 0 . 0 0 5 } \ \text{mm} \; = \; 5 \ \mu \text{m}
$$

**Friction coefficient (Petroff):**

$$
f \; = \; { \frac { 2 \pi ^ { 2 } } { S } } \times { \frac { c } { r } } \; = \; { \frac { 2 \pi ^ { 2 } } { 0 . 0 9 4 } } \times { \frac { 0 . 0 5 } { 2 5 } } \; = \; 2 1 0 \times 0 . 0 0 2 \; = \; { \bf 0 . 0 4 2 }
$$

**The minimum film thickness (5 μm) is below the recommended minimum of 10–20 μm, and the friction coefficient (0.042) is in the boundary lubrication regime. The engineer must increase the speed, reduce the load, or increase the viscosity to achieve the hydrodynamic lubrication regime.**
:::

## 3. Bearing selection and design

::: definition The bearing selection criteria {#def-bearing-selection}
The **bearing selection** is a multi-criteria decision that considers the load, the speed, the life, the accuracy, the stiffness, the noise, and the cost:

$$
\begin{array} { l c c c }
\textbf{Criterion} & \textbf{Ball bearing} & \textbf{Roller bearing} & \textbf{Journal bearing} \\ \hline
\text{Radial load capacity} & \text{Medium} & \text{Very high} & \text{Very high} \\
\text{Axial load capacity} & \text{Medium} & \text{High} & \text{Low} \\
\text{Speed limit} & \text{Very high} & \text{Medium} & \text{Very high} \\
\text{Stiffness} & \text{Medium} & \text{High} & \text{Low} \\
\text{Accuracy} & \text{High} & \text{Medium} & \text{Low} \\
\text{Noise} & \text{Low} & \text{Medium} & \text{Very low} \\
\text{Cost} & \text{Low} & \text{Medium} & \text{High} \\
\text{Maintenance} & \text{Low} & \text{Medium} & \text{High} \\
\end{array}
$$

**The bearing selection is the reason the bearing is the most important component in the machine: the bearing determines the machine's life, accuracy, efficiency, and noise. The engineer who selects the bearing by the load rating alone is not selecting the bearing; they are selecting a bearing that will fail by wear, overheating, or misalignment.**
:::

::: definition The static load rating and the safety factor {#def-static-load}
The **static load rating** ($C _ { 0 }$) is the load that produces a permanent deformation of $0 . 0 0 0 1 \, D$ (where $D$ is the rolling element diameter) at the most heavily stressed contact point. The **equivalent static load** is:

$$
P _ { 0 } \; = \; X _ { 0 } \, F _ { r } \; + \; Y _ { 0 } \, F _ { a }
$$

The **static safety factor** is:

$$
s _ { 0 } \; = \; { \frac { C _ { 0 } } { P _ { 0 } } }
$$

$$
\begin{array} { l c l }
\textbf{Application} & \textbf{ } s _ { 0 } & \textbf{Reason} \\ \hline
\text{Precision spindle} & 2 \text{--} 4 & \text{Vibration, shock} \\
\text{General machinery} & 1 . 5 \text{--} 2 . 5 & \text{Normal operation} \\
\text{Low shock, smooth} & 1 \text{--} 1 . 5 & \text{Smooth operation} \\
\text{Heavy shock, impact} & 2 . 5 \text{--} 4 & \text{Impact loading} \\
\text{Stationary, occasional} & 0 . 5 \text{--} 1 & \text{Rarely loaded} \\
\end{array}
$$

**The static safety factor is the reason the bearing is not brinelled by the shock load. The engineer who calculates the L10 life without checking the static load rating is not designing the bearing; they are designing a bearing that will fail by brinelling.**
:::

::: example Bearing selection for a motor {#ex-bearing-selection level=3 check="3"}
An electric motor shaft has a radial load of 2 kN, an axial load of 0.5 kN, a speed of 3 000 rpm, and a required L10 life of 100 000 hours. Select the bearing.

**Required dynamic load rating:**

$$
L _ { 1 0 } \; = \; { \frac { 1 0 ^ { 6 } } { 6 0 \times 3 \ 0 0 0 } } \times \left( { \frac { C } { P } } \right) ^ { 3 } \; = \; 1 0 0 \ 0 0 0 \ \text{hours}
$$

$$
\left( { \frac { C } { P } } \right) ^ { 3 } \; = \; { \frac { 1 0 0 \ 0 0 0 \times 6 0 \times 3 \ 0 0 0 } { 1 0 ^ { 6 } } } \; = \; 1 8 \ 0 0 0
$$

$$
{ \frac { C } { P } } \; = \; 1 8 \ 0 0 0 ^ { 1 / 3 } \; = \; 2 6 . 2
$$

**Equivalent dynamic load:** $P = F _ { r } = 2$ kN (assuming $F _ { a } / F _ { r } < e$ ).

**Required dynamic load rating:**

$$
C \; = \; 2 6 . 2 \times 2 \; = \; { \bf 5 2 } \ \text{kN}
$$

**The engineer would select a 6210 deep groove ball bearing ($C = 5 5 . 3$ kN, $d = 5 0$ mm), which has a dynamic load rating of 55.3 kN, exceeding the required 52 kN.**
:::

::: example Bearing selection for a gearbox {#ex-bearing-gearbox level=3 check="2"}
A gearbox input shaft has a radial load of 3 kN, an axial load of 1 kN, a speed of 1 450 rpm, and a required L10 life of 40 000 hours. The axial load factor is $e = 0 . 3$ , and for $F _ { a } / F _ { r } > e$ , $X = 0 . 5 6$ and $Y = 1 . 6$ . Select the bearing.

**Load ratio:**

$$
{ \frac { F _ { a } } { F _ { r } } } \; = \; { \frac { 1 } { 3 } } \; = \; 0 . 3 3 \; > \; e \; = \; 0 . 3
$$

**Equivalent dynamic load:**

$$
P \; = \; 0 . 5 6 \times 3 + 1 . 6 \times 1 \; = \; 1 . 6 8 + 1 . 6 \; = \; 3 . 2 8 \ \text{kN}
$$

**Required dynamic load rating:**

$$
\left( { \frac { C } { P } } \right) ^ { 3 } \; = \; { \frac { 4 0 \ 0 0 0 \times 6 0 \times 1 \ 4 5 0 } { 1 0 ^ { 6 } } } \; = \; 3 \ 4 8 0
$$

$$
{ \frac { C } { P } } \; = \; 3 \ 4 8 0 ^ { 1 / 3 } \; = \; 1 5 . 1
$$

$$
C \; = \; 1 5 . 1 \times 3 . 2 8 \; = \; { \bf 4 9 } \ \text{kN}
$$

**The engineer would select a 6209 deep groove ball bearing ($C = 5 2 . 8$ kN, $d = 4 5$ mm), which has a dynamic load rating of 52.8 kN, exceeding the required 49 kN. The 6209 bearing has an L10 life of 46 000 hours, which exceeds the required 40 000 hours.**
:::

## Exercises

::: exercise L10 life for a roller bearing {#ex-l10-roller level=3 check="2"}
A cylindrical roller bearing has $C = 8 0$ kN and is subjected to a radial load of 20 kN. The speed is 1 000 rpm. Calculate the L10 life in hours.

::: solution
$$
L _ { 1 0 } \; = \; \left( { \frac { 8 0 } { 2 0 } } \right) ^ { 1 0 / 3 } \; = \; 4 ^ { 3 . 3 3 } \; = \; 9 0 . 5 \times 1 0 ^ { 6 } \ \text{revolutions}
$$

$$
L _ { 1 0 , h } \; = \; { \frac { 1 0 ^ { 6 } } { 6 0 \times 1 \ 0 0 0 } } \times 9 0 . 5 \; = \; { \bf 1 \ 5 0 8 } \ \text{hours}
$$

**The L10 life is 1 508 hours. The roller bearing has a steeper life-load curve than the ball bearing, and the steepness is the reason the roller bearing is more sensitive to the overload.**
:::
:::

::: exercise Equivalent dynamic load {#ex-equivalent-load level=3 check="2"}
A deep groove ball bearing has $F _ { r } = 8$ kN and $F _ { a } = 4$ kN. The axial load factor is $e = 0 . 3$ , and for $F _ { a } / F _ { r } > e$ , $X = 0 . 5 6$ and $Y = 2 . 0$ . Calculate the equivalent dynamic load.

::: solution
$$
{ \frac { F _ { a } } { F _ { r } } } \; = \; { \frac { 4 } { 8 } } \; = \; 0 . 5 \; > \; e \; = \; 0 . 3
$$

$$
P \; = \; 0 . 5 6 \times 8 + 2 . 0 \times 4 \; = \; 4 . 4 8 + 8 . 0 \; = \; { \bf 1 2 . 5 } \ \text{kN}
$$

**The equivalent dynamic load (12.5 kN) is 56 % higher than the radial load (8 kN), because the axial load is significant. The engineer who uses the radial load alone is not calculating the L10 life; they are guessing.**
:::
:::

::: exercise Sommerfeld number {#ex-sommerfeld level=3 check="1"}
A journal bearing has $r = 3 0$ mm, $c = 0 . 0 6$ mm, $\mu = 0 . 0 2$ Pa·s, $n = 2 \ 5 0 0$ rpm, and $P = 3$ MPa. Calculate the Sommerfeld number.

::: solution
$$
S \; = \; \left( { \frac { r } { c } } \right) ^ { 2 } { \frac { \mu \, n } { P } } \; = \; \left( { \frac { 3 0 } { 0 . 0 6 } } \right) ^ { 2 } \times { \frac { 0 . 0 2 \times 4 1 . 6 7 } { 3 \times 1 0 ^ { 6 } } }
$$

$$
S \; = \; 2 5 0 \ 0 0 0 \times { \frac { 0 . 8 3 3 } { 3 \times 1 0 ^ { 6 } } } \; = \; 2 5 0 \ 0 0 0 \times 2 . 7 8 \times 1 0 ^ { - 7 } \; = \; { \bf 0 . 0 7 }
$$

**The Sommerfeld number (0.07) is in the heavily loaded regime ($S < 0 . 1$ ), which means the bearing is operating in the boundary lubrication regime. The engineer must increase the speed, reduce the load, or increase the viscosity to achieve the hydrodynamic lubrication regime.**
:::
:::

::: exercise Static safety factor {#ex-static-safety level=3 check="2"}
A bearing has $C _ { 0 } = 4 5$ kN and is subjected to a static radial load of 15 kN and a static axial load of 5 kN. The static load factors are $X _ { 0 } = 0 . 6$ and $Y _ { 0 } = 0 . 5$ . Calculate the static safety factor.

::: solution
$$
P _ { 0 } \; = \; 0 . 6 \times 1 5 + 0 . 5 \times 5 \; = \; 9 + 2 . 5 \; = \; 1 1 . 5 \ \text{kN}
$$

$$
s _ { 0 } \; = \; { \frac { 4 5 } { 1 1 . 5 } } \; = \; { \bf 3 . 9 1 }
$$

**The static safety factor (3.91) exceeds the typical requirement of 1.5–2.5 for general machinery. The bearing is safe against brinelling.**
:::
:::

::: exercise Reliability factor {#ex-reliability-factor level=3 check="1"}
A bearing has an L10 life of 50 000 hours. Calculate the L1 life (99 % reliability) and the L5 life (95 % reliability).

::: solution
$$
L _ { 1 } \; = \; a _ { 1 } \times L _ { 1 0 } \; = \; 0 . 2 1 \times 5 0 \ 0 0 0 \; = \; { \bf 1 0 \ 5 0 0 } \ \text{hours}
$$

$$
L _ { 5 } \; = \; 0 . 6 4 \times 5 0 \ 0 0 0 \; = \; { \bf 3 2 \ 0 0 0 } \ \text{hours}
$$

**The L1 life (10 500 hours) is 21 % of the L10 life (50 000 hours), and the reduction is the reason the bearing must be oversized for high-reliability applications. The engineer who uses the L10 life when the application requires 99 % reliability is not designing for the reliability; they are designing for the 10 % that fail.**
:::
:::

::: exercise Minimum film thickness {#ex-min-film level=3 check="2"}
A journal bearing has a radial clearance of 0.08 mm and an eccentricity ratio of 0.75. Calculate the minimum film thickness. Is it adequate for hydrodynamic lubrication?

::: solution
$$
h _ { \min } \; = \; c \, ( 1 - \varepsilon ) \; = \; 0 . 0 8 \times ( 1 - 0 . 7 5 ) \; = \; 0 . 0 8 \times 0 . 2 5 \; = \; { \bf 0 . 0 2 } \ \text{mm} \; = \; 2 0 \ \mu \text{m}
$$

**The minimum film thickness (20 μm) is at the lower limit of the recommended range (10–20 μm for hydrodynamic lubrication). The bearing is operating at the boundary of the hydrodynamic regime, and the engineer should increase the speed or reduce the load to increase the film thickness.**
:::
:::

::: exercise Derivation: the L10 life equation {#ex-derive-l10 level=4 check="3"}
Show that the L10 life equation $L _ { 1 0 } = ( C / P ) ^ { p }$ is derived from the fatigue life model $N \propto P ^ { - p }$ , where $p = 3$ for ball bearings and $p = 1 0 / 3$ for roller bearings. Evaluate the life ratio $L _ { 2 } / L _ { 1 }$ when the load is doubled for a ball bearing.

::: solution
The fatigue life model states that the number of cycles to failure is proportional to the inverse of the load raised to the power $p$ :

$$
N \; \propto \; P ^ { - p } \quad \Longrightarrow \quad N \; = \; k \, P ^ { - p }
$$

At the basic dynamic load rating $C$ , the life is $1 0 ^ { 6 }$ revolutions:

$$
1 0 ^ { 6 } \; = \; k \, C ^ { - p } \quad \Longrightarrow \quad k \; = \; 1 0 ^ { 6 } \, C ^ { p }
$$

Substituting:

$$
L _ { 1 0 } \; = \; { \frac { k \, P ^ { - p } } { 1 0 ^ { 6 } } } \; = \; \left( { \frac { C } { P } } \right) ^ { p }
$$

For the life ratio when the load is doubled:

$$
{ \frac { L _ { 2 } } { L _ { 1 } } } \; = \; \left( { \frac { P _ { 1 } } { P _ { 2 } } } \right) ^ { p } \; = \; \left( { \frac { 1 } { 2 } } \right) ^ { 3 } \; = \; { \bf 0 . 1 2 5 } \; \; ( 1 2 . 5 \ \% )
$$

**The life is reduced to 12.5 % when the load is doubled, and the reduction is the reason the bearing is not overloaded. The engineer who doubles the load reduces the life by 87.5 %, and the 87.5 % is the reason the bearing is selected by the L10 life, not the static load rating.** $\blacksquare$
:::
:::

::: exercise Derivation: the Sommerfeld number {#ex-derive-sommerfeld level=4 check="1"}
Show that the Sommerfeld number $S = ( r / c ) ^ { 2 } \mu n / P$ is a dimensionless parameter by verifying the dimensions of each term. Evaluate the Sommerfeld number for $r = 2 5$ mm, $c = 0 . 0 5$ mm, $\mu = 0 . 0 4$ Pa·s, $n = 3 \ 6 0 0$ rpm, and $P = 2$ MPa.

::: solution
**Dimensional analysis:**

$$
[ ( r / c ) ^ { 2 } ] \; = \; [ \text{dimensionless} ] ^ { 2 } \; = \; \text{dimensionless}
$$

$$
[ \mu \, n / P ] \; = \; { \frac { [ \text{Pa} { \cdot } \text{s} ] \times [ \text{s} ^ { - 1 } ] } { [ \text{Pa} ] } } \; = \; { \frac { [ \text{Pa} ] } { [ \text{Pa} ] } } \; = \; \text{dimensionless}
$$

**The Sommerfeld number is dimensionless, and the dimensionlessness is the reason the Sommerfeld number is the most important parameter in journal bearing design.**

$$
S \; = \; \left( { \frac { 2 5 } { 0 . 0 5 } } \right) ^ { 2 } \times { \frac { 0 . 0 4 \times 6 0 } { 2 \times 1 0 ^ { 6 } } } \; = \; 2 5 0 \ 0 0 0 \times { \frac { 2 . 4 } { 2 \times 1 0 ^ { 6 } } } \; = \; 2 5 0 \ 0 0 0 \times 1 . 2 \times 1 0 ^ { - 6 } \; = \; { \bf 0 . 3 }
$$

**The Sommerfeld number (0.3) is in the moderately loaded regime ($0 . 1 < S < 1$ ), which means the bearing is operating in the mixed lubrication regime. The engineer should increase the speed or reduce the load to achieve the hydrodynamic lubrication regime.** $\blacksquare$
:::
:::

::: quiz Bearing life {#quiz-bearing-life}
The L10 life of a bearing is the life at which:

- [ ] 50 % of the bearings fail
- [x] 10 % of the bearings fail
- [ ] 1 % of the bearings fail
- [ ] 90 % of the bearings fail

::: solution
**10 % of the bearings fail.** The L10 life is the number of revolutions (or hours) at which 90 % of the bearings survive and 10 % fail by fatigue. The L10 life is the design basis for the bearing, and the design basis is the reason the bearing is selected by the L10 life, not the static load rating.
:::
:::

::: quiz Journal bearing {#quiz-journal-bearing}
The Sommerfeld number determines:

- [ ] The bearing's static load rating
- [x] The eccentricity ratio, friction coefficient, and minimum film thickness
- [ ] The bearing's L10 life
- [ ] The bearing's speed limit

::: solution
**The eccentricity ratio, friction coefficient, and minimum film thickness.** The Sommerfeld number is the most important parameter in journal bearing design, because the Sommerfeld number determines the eccentricity ratio, the friction coefficient, and the minimum film thickness. The engineer who designs the journal bearing without calculating the Sommerfeld number is not designing the bearing; they are guessing.
:::
:::

## Where this lesson leads

- **[[machine-design/shafts]]** — The slope at the bearing must be less than 0.5° for ball bearings and 0.25° for roller bearings.
- **[[machine-design/fatigue]]** — The bearing life is a fatigue life, and the fatigue life is the reason the bearing is selected by the L10 life.
- **[[machine-design/gear-design]]** — The bearing is selected by the gear's radial and axial loads.
- **[[machine-design/clutches-brakes-belts]]** — The bearing is selected by the belt and chain tensions.
- **[[machine-design/fasteners-joints]]** — The bearing fit is the reason the bearing life is 5× longer with the correct fit than with the incorrect fit.
- **[[vibrations/vibration-fundamentals]]** — The bearing stiffness is the input to the rotor dynamics analysis.
- **[[materials-science/mechanical-properties]]** — The bearing material's hardness and fatigue strength determine the load rating.
- **[[fluid-mechanics/fluid-properties|lubrication theory]]** — The Reynolds equation is the foundation of the journal bearing analysis.

::: history Bearings: from the axle tree to the SKF life equation {#history-bearings}
**3000 BC** — **The earliest roller bearing** is found in an Egyptian chariot: a wooden roller between the axle and the wheel. **The Egyptian roller bearing is the reason the bearing is the oldest machine element, and the age is the reason the bearing is the most refined machine element.**

**1794** — **Philip Vaughan** patents the first ball bearing in England. **Vaughan's patent is the reason the ball bearing is the most widely used bearing type, and the patent is the reason the ball bearing is the most refined bearing type.**

**1839** — **Henry Bessemer** proposes the self-lubricating bearing, which uses a porous material to supply the lubricant. **Bessemer's self-lubricating bearing is the reason the oil-impregnated sintered bearing is the most widely used bearing in small appliances.**

**1907** — **Sven Wingquist** founds **SKF** in Gothenburg, Sweden, and invents the self-aligning ball bearing. **Wingquist's self-aligning ball bearing is the reason the bearing is tolerant of the misalignment, and the tolerance is the reason the bearing is the most forgiving machine element.**

**1942** — **Lundberg and Palmgren** publish the **bearing life theory**, which relates the L10 life to the load rating: $L _ { 1 0 } = ( C / P ) ^ { p }$ . **The Lundberg-Palmgren theory is the reason the bearing is selected by the L10 life, not the static load rating, and the selection is the reason the bearing is the most predictable machine element.**

**1953** — **The ISO 281 standard** is published, codifying the bearing life calculation. **The ISO 281 standard is the reason the bearing life is a standardised calculation, not a guess.**

**1995** — **The SKF general life equation** is published, which extends the L10 life to account for the reliability, the lubrication, the contamination, and the fatigue load limit. **The SKF general life equation is the reason the bearing life is a more accurate prediction, and the accuracy is the reason the bearing is the most reliable machine element.**

**2000** — **The condition monitoring** of bearings (vibration analysis, oil analysis, thermography) becomes standard practice in industrial maintenance. **The condition monitoring is the reason the bearing is replaced before it fails, and the replacement is the reason the bearing is the most monitored machine element.**
:::

::: summary Bearings {#summary-bearings}
- **The bearing is the interface between the rotating shaft and the stationary housing, and the bearing determines the machine's life, accuracy, and efficiency.** The bearing is the most common cause of machine failure.
- **The L10 life is the number of revolutions (or hours) at which 90 % of the bearings survive and 10 % fail by fatigue.** The L10 life is the design basis for the bearing.
- **The equivalent dynamic load $P = X F _ { r } + Y F _ { a }$ accounts for the combined radial and axial loading.** The engineer who uses the radial load alone when the bearing is subjected to a combined load is not calculating the L10 life; they are guessing.
- **The SKF general life equation extends the L10 life to account for the reliability, the lubrication, the contamination, and the fatigue load limit.** The reliability factor $a _ { 1 }$ reduces the life by 79 % for 99 % reliability.
- **The static load rating $C _ { 0 }$ must be greater than the equivalent static load $P _ { 0 }$ with a safety factor of 1.5–3.** The static safety factor is the reason the bearing is not brinelled by the shock load.
- **The journal bearing is governed by the Reynolds equation, and the Reynolds equation is solved by the Sommerfeld number.** The Sommerfeld number determines the eccentricity ratio, the friction coefficient, and the minimum film thickness.
- **The Petroff equation estimates the friction coefficient in the journal bearing under the light-load assumption.** The friction coefficient is 0.001–0.005 for hydrodynamic lubrication and 0.05–0.2 for boundary lubrication.
- **The bearing selection is a multi-criteria decision: the load, the speed, the life, the accuracy, the stiffness, the noise, and the cost.** The engineer who selects the bearing by the load rating alone is not selecting the bearing; they are selecting a bearing that will fail by wear, overheating, or misalignment.
- **The minimum film thickness must be 10–20 μm for hydrodynamic lubrication.** The engineer who designs the journal bearing without calculating the minimum film thickness is not designing the bearing; they are guessing.
- **The bearing fit is the reason the bearing life is 5× longer with the correct fit than with the incorrect fit.** The fit is the most important factor in bearing installation.
:::

## Further reading

- **Robert C. Juvinall and Kurt M. Marshek (2020)** — *Fundamentals of Machine Component Design*, 7th ed. Wiley. The bearing selection, the L10 life, and the journal bearing design.
- **Joseph E. Shigley, Charles R. Mischke and Richard G. Budynas (2015)** — *Mechanical Engineering Design*, 11th ed. McGraw-Hill. The bearing life calculation, the equivalent dynamic load, and the journal bearing.
- **SKF (2023)** — *SKF Rolling Bearings Catalogue*. SKF. The bearing dimensions, load ratings, and selection tables.
- **ISO 281:2007** — *Rolling Bearings — Dynamic Load Ratings and Rating Life*. ISO. The bearing life calculation standard.
- **B.J. Hamrock, S.R. Schmid and B.O. Jacobson (2004)** — *Fundamentals of Fluid Film Lubrication*, 2nd ed. Marcel Dekker. The Reynolds equation, the journal bearing, and the Sommerfeld number.
- **A. Raimondi and J. Boyd (1958)** — "A general theory for the finite width journal bearing." *Journal of Basic Engineering*, 80(3), 599–610. The Raimondi-Boyd charts for the journal bearing.
- **Palmgren A. (1964)** — *Ball and Roller Bearing Engineering*, 3rd ed. Burstrom. The bearing life theory and the bearing selection.
- **John M. Vance (1988)** — *Rotordynamics with Turbomachinery Applications*. Oxford University Press. The bearing stiffness, the rotor dynamics, and the critical speed.
