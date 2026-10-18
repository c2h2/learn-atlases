The fastener is the most common machine element: the bolt, the screw, the rivet, and the weld are the joints that hold the machine together, and the joint is the component that determines the machine's strength, stiffness, and fatigue life. **The joint that fails does not just separate the parts; it releases the stored energy, and the release is the reason the joint failure is the most dangerous failure mode in machine design.** The fastener design is a multi-criteria calculation: the bolt must carry the preload, the external load, and the fatigue load; the weld must carry the shear, the tension, and the fatigue load; and the adhesive bond must carry the shear, the peel, and the environmental load. **The engineer who designs the bolt by the static tensile strength alone is not designing the bolt; they are designing a bolt that will fail by fatigue, not tension.**

The quantitative tools of fastener design are the **bolt preload and torque** (the friction model), the **bolt fatigue** (the Goodman diagram with the preload effect), the **weld strength** (the shear and tension criteria), the **weld fatigue** (the S-N curve with the stress concentration), and the **adhesive bond strength** (the shear and peel criteria). The tools are the language in which the fastener design decision is expressed, and the language is the reason the fastener design is a calculation, not a guess.

::: warning Nine ways fastener design goes wrong
**Not calculating the preload.** The engineer who designs the bolt without calculating the preload is not designing the bolt; they are designing a bolt that will loosen. **The preload is the reason the bolt does not loosen under the vibration, and the preload is the reason the bolt fatigue life is 5× longer with the preload than without the preload.** **Not accounting for the torque-preload scatter.** The engineer who calculates the preload from the torque without the scatter factor is not calculating the preload; they are guessing. **The torque-preload scatter is ±25–30 %, and the scatter is the reason the preload must be verified by the turn-of-nut method or the ultrasonic method.** **Not checking the bolt fatigue.** The engineer who designs the bolt by the static tensile strength without checking the fatigue is not designing the bolt; they are designing a bolt that will fail by fatigue. **The bolt fatigue is the most common bolt failure mode (80–90 % of bolt failures), and the fatigue is the reason the bolt is designed by the Goodman diagram, not the static tensile strength.** **Not accounting for the joint stiffness.** The engineer who designs the bolt without calculating the joint stiffness is not designing the bolt; they are designing a bolt that will fail by fatigue. **The joint stiffness determines the load sharing between the bolt and the joint, and the load sharing is the reason the bolt fatigue life is 5× longer with a stiff joint than with a flexible joint.** **Not checking the weld fatigue.** The engineer who designs the weld by the static shear strength without checking the fatigue is not designing the weld; they are designing a weld that will fail by fatigue. **The weld fatigue is the most common weld failure mode (70–80 % of weld failures), and the fatigue is the reason the weld is designed by the S-N curve, not the static shear strength.** **Not specifying the weld quality.** The engineer who designs the weld without specifying the weld quality (ISO 5817) is not designing the weld; they are selecting a weld that will fail by defect. **The weld quality determines the defect size, and the defect size is the reason the weld fatigue life is 5× longer with quality B than with quality D.** **Not accounting for the adhesive surface preparation.** The engineer who designs the adhesive bond without specifying the surface preparation is not designing the bond; they are selecting a bond that will fail by adhesion. **The surface preparation is the reason the adhesive bond strength is 3× higher with the correct preparation than with the incorrect preparation, and the 3× is the reason the surface preparation is the most important factor in adhesive bonding.** **Not checking the bolt shear.** The engineer who designs the bolt by the tensile strength without checking the shear is not designing the bolt; they are designing a bolt that will fail by shear. **The bolt shear is the most common failure mode in the flange bolted joint, and the shear is the reason the bolt is designed by the shear strength, not the tensile strength.** **Not accounting for the thermal expansion.** The engineer who designs the bolted joint without checking the thermal expansion is not designing the joint; they are designing a joint that will leak. **The thermal expansion is the reason the bolt preload changes by 20–50 % with the temperature, and the change is the reason the bolted joint must be designed for the thermal load, not just the mechanical load.**
:::

## 1. Bolted joints

::: definition The bolt preload and the torque-preload relationship {#def-bolt-preload}
The **bolt preload** is the tensile force induced in the bolt by the tightening torque, and the preload is the reason the bolt does not loosen under the vibration.

$$
T \; = \; K \, d \, F _ { i }
$$

where $T$ is the tightening torque, $K$ is the torque coefficient (typically 0.15–0.20), $d$ is the bolt diameter, and $F _ { i }$ is the preload.

The **preload** is typically 70–90 % of the bolt's proof load:

$$
F _ { i } \; = \; ( 0 . 7 \text{--} 0 . 9 ) \, A _ { t } \, S _ { p }
$$

where $A _ { t }$ is the tensile stress area and $S _ { p }$ is the proof strength.

$$
\begin{array} { l c c c c }
\textbf{Property class} & \textbf{ } S _ { y } \textbf{ (MPa)} & \textbf{ } S _ { u t } \textbf{ (MPa)} & \textbf{ } S _ { p } \textbf{ (MPa)} & \textbf{Use case} \\ \hline
8 . 8 & 6 4 0 & 8 0 0 & 6 0 0 & \text{General purpose} \\
1 0 . 9 & 9 0 0 & 1 \ 0 0 0 & 8 3 0 & \text{High strength} \\
1 2 . 9 & 1 \ 1 0 0 & 1 \ 2 0 0 & 9 7 0 & \text{Very high strength} \\
A 2 \text{-} 7 0 \text{ (stainless)} & 4 5 0 & 7 0 0 & 4 5 0 & \text{Corrosion resistance} \\
\end{array}
$$

**The preload is the reason the bolt does not loosen under the vibration, and the preload is the reason the bolt fatigue life is 5× longer with the preload than without the preload. The engineer who designs the bolt without calculating the preload is not designing the bolt; they are designing a bolt that will loosen.**
:::

::: definition The joint stiffness and the load sharing {#def-joint-stiffness}
The **joint stiffness** is the ratio of the clamped material's stiffness to the bolt's stiffness, and the joint stiffness determines the load sharing between the bolt and the joint.

$$
C \; = \; { \frac { k _ { b } } { k _ { b } + k _ { m } } }
$$

where $k _ { b }$ is the bolt stiffness and $k _ { m }$ is the joint (member) stiffness.

The **bolt load** under the external load $P$ is:

$$
F _ { b } \; = \; F _ { i } + C \, P
$$

The **joint load** under the external load $P$ is:

$$
F _ { m } \; = \; F _ { i } - ( 1 - C ) \, P
$$

$$
\begin{array} { l c c }
\textbf{Joint stiffness ratio } C & \textbf{Bolt load increase} & \textbf{Fatigue life} \\ \hline
0 . 1 \text{ (stiff joint)} & 1 0 \ \% \ \text{of } P & \text{Very long} \\
0 . 2 \text{ (typical)} & 2 0 \ \% \ \text{of } P & \text{Long} \\
0 . 3 \text{ (flexible joint)} & 3 0 \ \% \ \text{of } P & \text{Medium} \\
0 . 5 \text{ (very flexible)} & 5 0 \ \% \ \text{of } P & \text{Short} \\
\end{array}
$$

**The joint stiffness is the reason the bolt fatigue life is 5× longer with a stiff joint than with a flexible joint. The engineer who designs the bolt without calculating the joint stiffness is not designing the bolt; they are designing a bolt that will fail by fatigue.**
:::

::: definition The bolt fatigue and the Goodman diagram {#def-bolt-fatigue}
The **bolt fatigue** is the most common bolt failure mode (80–90 % of bolt failures), and the bolt fatigue is the reason the bolt is designed by the Goodman diagram, not the static tensile strength.

The **Goodman diagram for the bolted joint** is:

$$
{ \frac { \sigma _ { a } } { S _ { e } } } + { \frac { \sigma _ { m } } { S _ { u t } } } \; = \; { \frac { 1 } { n } }
$$

where $\sigma _ { a }$ is the stress amplitude and $\sigma _ { m }$ is the mean stress.

For the preloaded bolt:

$$
\sigma _ { a } \; = \; { \frac { C \, P _ { \max } - P _ { \min } } { 2 \, A _ { t } } } \qquad \sigma _ { m } \; = \; { \frac { C \, P _ { \max } + P _ { \min } } { 2 \, A _ { t } } } + { \frac { F _ { i } } { A _ { t } } }
$$

**The preload reduces the stress amplitude by 80–90 %, and the reduction is the reason the bolt fatigue life is 5× longer with the preload than without the preload. The engineer who designs the bolt without the preload is not designing the bolt; they are designing a bolt that will fail by fatigue.**
:::

::: widget plot
title: The bolt fatigue: Goodman diagram with and without preload
f: 150*(1-x/1000); 150*(1-(x-600)/1000)
x: 0,1000
y: 0,200
labels: Without preload; With preload
caption: The Goodman diagram for a bolt with and without the preload. **The preload shifts the mean stress to the right, and the shift is the reason the stress amplitude is reduced by 80–90 %. The stress amplitude is the reason the bolt fatigue life is 5× longer with the preload than without the preload.** **The engineer who designs the bolt without the preload is not designing the bolt; they are designing a bolt that will fail by fatigue.**
:::

::: example Bolt preload and torque {#ex-bolt-preload level=3 check="2"}
An M12 bolt (property class 8.8, $A _ { t } = 8 4 . 3$ mm², $S _ { p } = 6 0 0$ MPa) is tightened to 75 % of the proof load. The torque coefficient is $K = 0 . 1 5$ . Calculate the preload and the tightening torque.

**Preload:**

$$
F _ { i } \; = \; 0 . 7 5 \times A _ { t } \times S _ { p } \; = \; 0 . 7 5 \times 8 4 . 3 \times 6 0 0 \; = \; { \bf 3 7 \ 9 3 5 } \ \text{N} \; = \; 3 7 . 9 \ \text{kN}
$$

**Tightening torque:**

$$
T \; = \; K \, d \, F _ { i } \; = \; 0 . 1 5 \times 1 2 \times 3 7 \ 9 3 5 \; = \; { \bf 6 8 . 3 } \ \text{N} { \cdot } \text{m}
$$

**The preload is 37.9 kN, and the tightening torque is 68.3 N·m. The engineer would specify a torque of 68 N·m ± 10 %, and the ± 10 % is the reason the torque-preload scatter is ± 25–30 %.**
:::

## 2. Welded joints

::: definition The weld types and their strength {#def-weld-types}
The **weld type** is selected by the joint configuration, the load direction, and the accessibility:

$$
\begin{array} { l c c c l }
\textbf{Weld type} & \textbf{Load direction} & \textbf{Stress type} & \textbf{Strength} & \textbf{Use case} \\ \hline
\text{Butt (square groove)} & \text{Tension} & \text{Tension} & \text{Full plate strength} & \text{Plate-to-plate} \\
\text{Fillet (parallel)} & \text{Shear} & \text{Shear} & 0 . 7 \times \text{plate} & \text{T-joint, lap} \\
\text{Fillet (transverse)} & \text{Tension} & \text{Tension + shear} & 0 . 8 5 \times \text{plate} & \text{T-joint, lap} \\
\text{Plug/slot} & \text{Shear} & \text{Shear} & \text{Low} & \text{Sheet metal} \\
\text{Spot (resistance)} & \text{Shear} & \text{Shear} & \text{Medium} & \text{Sheet metal, automotive} \\
\text{Seam (resistance)} & \text{Shear} & \text{Shear} & \text{Medium} & \text{Tube, can} \\
\end{array}
$$

**The fillet weld is the most common weld type, because the fillet weld is the easiest to execute and the most tolerant of the fit-up error. The engineer who designs the fillet weld by the leg length without calculating the throat thickness is not designing the weld; they are designing a weld that will fail by shear.**
:::

::: definition The fillet weld strength {#def-fillet-weld}
The **fillet weld** is sized by the **throat thickness** $t = 0 . 7 0 7 \, h$ (where $h$ is the leg length) and the **weld length** $L$ :

**Shear (parallel fillet weld):**

$$
\tau \; = \; { \frac { F } { t \, L } } \; = \; { \frac { F } { 0 . 7 0 7 \, h \, L } } \; \le \; { \frac { S _ { u t , \text{weld } } } { n } }
$$

**Tension (transverse fillet weld):**

$$
\sigma \; = \; { \frac { F } { t \, L } } \; \le \; { \frac { S _ { u t , \text{weld } } } { n } }
$$

**Combined (bending + shear):**

$$
\sigma _ { \text{eq } } \; = \; { \sqrt { \sigma ^ { 2 } + 3 \, \tau ^ { 2 } } } \; \le \; { \frac { S _ { u t , \text{weld } } } { n } }
$$

$$
\begin{array} { l c c }
\textbf{Weld quality (ISO 5817)} & \textbf{Defect size} & \textbf{Fatigue strength} \\ \hline
\text{B (strict)} & \text{Small} & \text{High} \\
\text{C (medium)} & \text{Medium} & \text{Medium} \\
\text{D (low)} & \text{Large} & \text{Low} \\
\end{array}
$$

**The weld quality is the reason the weld fatigue life is 5× longer with quality B than with quality D. The engineer who designs the weld without specifying the weld quality is not designing the weld; they are selecting a weld that will fail by defect.**
:::

::: widget plot
title: The weld fatigue S-N curve
f: 400*x^-0.15; 250*x^-0.15
x: 10000,10000000
y: 10,400
labels: Quality B; Quality D
caption: The weld fatigue S-N curve for ISO 5817 quality B and quality D. **The quality B weld has a fatigue strength that is 60 % higher than the quality D weld, and the 60 % is the reason the weld quality is the most important factor in weld fatigue design.** **The weld fatigue S-N curve has no endurance limit (unlike the steel S-N curve), and the absence of the endurance limit is the reason the weld is designed for a finite life, not an infinite life.**
:::

::: example Fillet weld design {#ex-fillet-weld-design level=3 check="2"}
A T-joint is welded with two parallel fillet welds, each of length 100 mm. The joint carries a shear load of 80 kN. The weld material has $S _ { u t } = 4 5 0$ MPa, and the factor of safety is 2.5. Calculate the required leg length.

**Required throat area:**

$$
A _ { \text{required } } \; = \; { \frac { F \times n } { S _ { u t } } } \; = \; { \frac { 8 0 \ 0 0 0 \times 2 . 5 } { 4 5 0 } } \; = \; 4 4 4 . 4 \ \text{mm} ^ { 2 }
$$

**Total weld length (two welds):**

$$
L _ { \text{total } } \; = \; 2 \times 1 0 0 \; = \; 2 0 0 \ \text{mm}
$$

**Required throat thickness:**

$$
t \; = \; { \frac { A _ { \text{required } } } { L _ { \text{total } } } } \; = \; { \frac { 4 4 4 . 4 } { 2 0 0 } } \; = \; 2 . 2 2 \ \text{mm}
$$

**Required leg length:**

$$
h \; = \; { \frac { t } { 0 . 7 0 7 } } \; = \; { \frac { 2 . 2 2 } { 0 . 7 0 7 } } \; = \; { \bf 3 . 1 4 } \ \text{mm}
$$

**The engineer would specify a 4 mm fillet weld (the next standard size), which gives a factor of safety of 3.2.**
:::

## 3. Adhesive bonds and other joints

::: definition The adhesive bond strength {#def-adhesive-bond}
The **adhesive bond** is the joint in which the parts are joined by a polymeric adhesive, and the adhesive bond is the reason the joint is continuous, not intermittent.

$$
\begin{array} { l c c c }
\textbf{Adhesive type} & \textbf{Shear strength (MPa)} & \textbf{Peel strength (MPa)} & \textbf{Temperature limit (°C)} \\ \hline
\text{Epoxy} & 2 0 \text{--} 3 5 & 5 \text{--} 1 0 & 1 2 0 \text{--} 1 8 0 \\
\text{Acrylic (MMA)} & 1 5 \text{--} 2 5 & 8 \text{--} 1 5 & 8 0 \text{--} 1 2 0 \\
\text{Polyurethane} & 1 0 \text{--} 2 0 & 1 0 \text{--} 2 0 & 8 0 \text{--} 1 0 0 \\
\text{Cyanoacrylate} & 1 5 \text{--} 2 5 & 2 \text{--} 5 & 8 0 \text{--} 1 0 0 \\
\text{Silicone} & 2 \text{--} 5 & 5 \text{--} 1 0 & 2 0 0 \text{--} 2 5 0 \\
\end{array}
$$

**The adhesive bond is the reason the joint is continuous, and the continuity is the reason the adhesive bond is stronger than the riveted joint. The engineer who designs the adhesive bond without specifying the surface preparation is not designing the bond; they are selecting a bond that will fail by adhesion.**
:::

::: definition The riveted joint {#def-riveted-joint}
The **riveted joint** is the joint in which the parts are joined by a rivet, and the riveted joint is the reason the joint is permanent, not removable.

$$
\begin{array} { l c c }
\textbf{Joint type} & \textbf{Failure mode} & \textbf{Strength formula} \\ \hline
\text{Single shear} & \text{Rivet shear} & \tau = F / ( \pi d ^ { 2 } / 4 ) \\
\text{Double shear} & \text{Rivet shear} & \tau = F / ( 2 \times \pi d ^ { 2 } / 4 ) \\
\text{Bearing} & \text{Plate crushing} & \sigma _ { b } = F / ( d \, t ) \\
\text{Tension} & \text{Plate net section} & \sigma = F / ( ( w - n d ) \, t ) \\
\end{array}
$$

**The riveted joint is the reason the joint is permanent, and the permanence is the reason the riveted joint is used in aircraft, bridges, and pressure vessels. The engineer who designs the riveted joint by the rivet shear without checking the plate bearing is not designing the joint; they are designing a joint that will fail by bearing.**
:::

::: example Bolted joint fatigue {#ex-bolt-fatigue level=3 check="2"}
An M16 bolt (property class 10.9, $A _ { t } = 1 5 7$ mm², $S _ { u t } = 1 0 0 0$ MPa, $S _ { e } = 2 0 0$ MPa) is preloaded to 70 % of the proof load ($S _ { p } = 8 3 0$ MPa). The joint stiffness ratio is $C = 0 . 2$ . The external load varies from 0 to 40 kN. Calculate the factor of safety using the Goodman criterion.

**Preload:**

$$
F _ { i } \; = \; 0 . 7 \times 1 5 7 \times 8 3 0 \; = \; 9 1 \ 1 4 7 \ \text{N} \; = \; 9 1 . 1 \ \text{kN}
$$

**Stress amplitude:**

$$
\sigma _ { a } \; = \; { \frac { C \, ( P _ { \max } - P _ { \min } ) } { 2 \, A _ { t } } } \; = \; { \frac { 0 . 2 \times 4 0 \ 0 0 0 } { 2 \times 1 5 7 } } \; = \; { \frac { 8 \ 0 0 0 } { 3 1 4 } } \; = \; 2 5 . 5 \ \text{MPa}
$$

**Mean stress:**

$$
\sigma _ { m } \; = \; { \frac { F _ { i } } { A _ { t } } } + { \frac { C \, ( P _ { \max } + P _ { \min } ) } { 2 \, A _ { t } } } \; = \; { \frac { 9 1 \ 1 4 7 } { 1 5 7 } } + { \frac { 0 . 2 \times 4 0 \ 0 0 0 } { 2 \times 1 5 7 } } \; = \; 5 8 0 . 6 + 2 5 . 5 \; = \; 6 0 6 . 1 \ \text{MPa}
$$

**Goodman criterion:**

$$
{ \frac { 2 5 . 5 } { 2 0 0 } } + { \frac { 6 0 6 . 1 } { 1 \ 0 0 0 } } \; = \; 0 . 1 2 8 + 0 . 6 0 6 \; = \; 0 . 7 3 4 \; = \; { \frac { 1 } { n } }
$$

$$
n \; = \; { \frac { 1 } { 0 . 7 3 4 } } \; = \; { \bf 1 . 3 6 }
$$

**The factor of safety (1.36) is below the typical requirement of 1.5. The engineer must increase the preload, reduce the external load, or use a higher strength bolt.**
:::

::: example Bolted flange joint {#ex-bolted-flange level=3 check="2"}
A bolted flange joint has 8 bolts (M16, property class 8.8, $A _ { t } = 1 5 7$ mm², $S _ { p } = 6 0 0$ MPa). The flange carries an internal pressure of 5 MPa acting on a gasket area of 12 000 mm². The joint stiffness ratio is $C = 0 . 2 5$ . Calculate the preload per bolt and the bolt stress under the pressure load.

**Total external load:**

$$
P _ { \\text{total } } \\; = \\; p \\times A _ { \\text{gasket } } \\; = \\; 5 \\times 1 2 \\ 0 0 0 \\; = \\; 6 0 \\ 0 0 0 \\ \\text{N} \\; = \\; 6 0 \\ \\text{kN}
$$

**External load per bolt:**

$$
P _ { \\text{bolt } } \\; = \\; { \\frac { 6 0 } { 8 } } \\; = \\; 7 . 5 \\ \\text{kN}
$$

**Preload per bolt (75 % of proof load):**

$$
F _ { i } \\; = \\; 0 . 7 5 \\times 1 5 7 \\times 6 0 0 \\; = \\; { \\bf 7 0 \\ 6 5 0 } \\ \\text{N} \\; = \\; 7 0 . 7 \\ \\text{kN}
$$

**Bolt load under pressure:**

$$
F _ { b } \\; = \\; F _ { i } + C \\times P _ { \\text{bolt } } \\; = \\; 7 0 . 7 + 0 . 2 5 \\times 7 . 5 \\; = \\; { \\bf 7 2 . 6 } \\ \\text{kN}
$$

**Bolt stress:**

$$
\\sigma _ { b } \\; = \\; { \\frac { F _ { b } } { A _ { t } } } \\; = \\; { \\frac { 7 2 \\ 6 0 0 } { 1 5 7 } } \\; = \\; { \\bf 4 6 2 } \\ \\text{MPa}
$$

**The bolt stress (462 MPa) is below the proof strength (600 MPa), and the joint is safe. The preload is 70.7 kN per bolt, and the preload is the reason the joint does not leak under the pressure.**
:::

## Exercises

::: exercise Bolt torque calculation {#ex-bolt-torque level=3 check="2"}
An M10 bolt (property class 8.8, $A _ { t } = 5 8$ mm², $S _ { p } = 6 0 0$ MPa) is tightened to 80 % of the proof load. The torque coefficient is $K = 0 . 1 8$ . Calculate the preload and the tightening torque.

::: solution
$$
F _ { i } \; = \; 0 . 8 \times 5 8 \times 6 0 0 \; = \; { \bf 2 7 \ 8 4 0 } \ \text{N} \; = \; 2 7 . 8 \ \text{kN}
$$

$$
T \; = \; 0 . 1 8 \times 1 0 \times 2 7 \ 8 4 0 \; = \; { \bf 5 0 . 1 } \ \text{N} { \cdot } \text{m}
$$

**The preload is 27.8 kN, and the tightening torque is 50.1 N·m.**
:::
:::

::: exercise Joint stiffness and load sharing {#ex-joint-stiffness level=3 check="2"}
A bolted joint has a bolt stiffness $k _ { b } = 2 0 0$ MN/m and a joint stiffness $k _ { m } = 8 0 0$ MN/m. The external load is 20 kN, and the preload is 30 kN. Calculate the bolt load and the joint load.

::: solution
$$
C \; = \; { \frac { 2 0 0 } { 2 0 0 + 8 0 0 } } \; = \; 0 . 2
$$

$$
F _ { b } \; = \; 3 0 + 0 . 2 \times 2 0 \; = \; { \bf 3 4 } \ \text{kN}
$$

$$
F _ { m } \; = \; 3 0 - 0 . 8 \times 2 0 \; = \; { \bf 1 4 } \ \text{kN}
$$

**The bolt load increases by 4 kN (20 % of the external load), and the joint load decreases by 16 kN (80 % of the external load). The stiff joint is the reason the bolt fatigue life is long.**
:::
:::

::: exercise Fillet weld design {#ex-fillet-weld-ex level=3 check="2"}
A lap joint is welded with two transverse fillet welds, each of length 80 mm. The joint carries a tensile load of 60 kN. The weld material has $S _ { u t } = 4 0 0$ MPa, and the factor of safety is 3.0. Calculate the required leg length.

::: solution
$$
A _ { \text{required } } \; = \; { \frac { 6 0 \ 0 0 0 \times 3 . 0 } { 4 0 0 } } \; = \; 4 5 0 \ \text{mm} ^ { 2 }
$$

$$
L _ { \text{total } } \; = \; 2 \times 8 0 \; = \; 1 6 0 \ \text{mm}
$$

$$
t \; = \; { \frac { 4 5 0 } { 1 6 0 } } \; = \; 2 . 8 1 \ \text{mm}
$$

$$
h \; = \; { \frac { 2 . 8 1 } { 0 . 7 0 7 } } \; = \; { \bf 3 . 9 8 } \ \text{mm}
$$

**The engineer would specify a 5 mm fillet weld (the next standard size), which gives a factor of safety of 3.7.**
:::
:::

::: exercise Riveted joint {#ex-riveted-joint level=3 check="2"}
A single-riveted lap joint has a rivet diameter of 16 mm, a plate thickness of 8 mm, and a plate width of 80 mm. The rivet material has $S _ { u t } = 4 0 0$ MPa, and the plate material has $S _ { u t } = 3 5 0$ MPa. Calculate the joint efficiency.

::: solution
**Rivet shear area (single shear):**

$$
A _ { \text{shear } } \; = \; { \frac { \pi \times 1 6 ^ { 2 } } { 4 } } \; = \; 2 0 1 \ \text{mm} ^ { 2 }
$$

**Rivet shear strength:**

$$
F _ { \text{shear } } \; = \; 2 0 1 \times 4 0 0 \; = \; 8 0 . 4 \ \text{kN}
$$

**Plate net section area:**

$$
A _ { \text{net } } \; = \; ( 8 0 - 1 6 ) \times 8 \; = \; 5 1 2 \ \text{mm} ^ { 2 }
$$

**Plate tension strength:**

$$
F _ { \text{tension } } \; = \; 5 1 2 \times 3 5 0 \; = \; 1 7 9 . 2 \ \text{kN}
$$

**Joint efficiency:**

$$
\eta \; = \; { \frac { \min ( 8 0 . 4 , \; 1 7 9 . 2 ) } { 8 0 \times 8 \times 3 5 0 / 1 0 0 0 } } \; = \; { \frac { 8 0 . 4 } { 2 2 4 } } \; = \; { \bf 3 5 . 9 } \ \ \%
$$

**The joint efficiency is 35.9 %, which is typical for a single-riveted lap joint. The efficiency is the reason the riveted joint is not used in high-strength applications.**
:::
:::

::: exercise Adhesive bond {#ex-adhesive-bond level=3 check="2"}
An epoxy adhesive bond has a lap length of 25 mm, a width of 20 mm, and a shear strength of 25 MPa. The adherend thickness is 3 mm, and the adherend shear strength is 60 MPa. Calculate the maximum load and the failure mode.

::: solution
**Adhesive shear area:**

$$
A _ { \text{adhesive } } \; = \; 2 5 \times 2 0 \; = \; 5 0 0 \ \text{mm} ^ { 2 }
$$

**Adhesive shear strength:**

$$
F _ { \text{adhesive } } \; = \; 5 0 0 \times 2 5 \; = \; 1 2 . 5 \ \text{kN}
$$

**Adherend shear area:**

$$
A _ { \text{adherend } } \; = \; 2 5 \times 3 \; = \; 7 5 \ \text{mm} ^ { 2 }
$$

**Adherend shear strength:**

$$
F _ { \text{adherend } } \; = \; 7 5 \times 6 0 \; = \; 4 . 5 \ \text{kN}
$$

**The maximum load is 4.5 kN, and the failure mode is the adherend shear (not the adhesive shear). The adherend is the weaker member, and the weakness is the reason the adhesive bond is designed for the adherend strength, not the adhesive strength.**
:::
:::

::: exercise Bolt fatigue {#ex-bolt-fatigue-ex level=3 check="2"}
An M12 bolt (property class 8.8, $A _ { t } = 8 4 . 3$ mm², $S _ { u t } = 8 0 0$ MPa, $S _ { e } = 1 5 0$ MPa) is preloaded to 75 % of the proof load ($S _ { p } = 6 0 0$ MPa). The joint stiffness ratio is $C = 0 . 2 5$ . The external load varies from 0 to 20 kN. Calculate the factor of safety using the Goodman criterion.

::: solution
**Preload:**

$$
F _ { i } \; = \; 0 . 7 5 \times 8 4 . 3 \times 6 0 0 \; = \; 3 7 \ 9 3 5 \ \text{N}
$$

**Stress amplitude:**

$$
\sigma _ { a } \; = \; { \frac { 0 . 2 5 \times 2 0 \ 0 0 0 } { 2 \times 8 4 . 3 } } \; = \; { \frac { 5 \ 0 0 0 } { 1 6 8 . 6 } } \; = \; 2 9 . 7 \ \text{MPa}
$$

**Mean stress:**

$$
\sigma _ { m } \; = \; { \frac { 3 7 \ 9 3 5 } { 8 4 . 3 } } + 2 9 . 7 \; = \; 4 5 0 + 2 9 . 7 \; = \; 4 7 9 . 7 \ \text{MPa}
$$

**Goodman criterion:**

$$
{ \frac { 2 9 . 7 } { 1 5 0 } } + { \frac { 4 7 9 . 7 } { 8 0 0 } } \; = \; 0 . 1 9 8 + 0 . 6 0 0 \; = \; 0 . 7 9 8 \; = \; { \frac { 1 } { n } }
$$

$$
n \; = \; { \frac { 1 } { 0 . 7 9 8 } } \; = \; { \bf 1 . 2 5 }
$$

**The factor of safety (1.25) is below the typical requirement of 1.5. The engineer must increase the preload or reduce the external load.**
:::
:::

::: exercise Derivation: the bolt preload and the torque {#ex-derive-bolt-torque level=4 check="2"}
Show that the tightening torque $T = K d F _ { i }$ is derived from the torque balance: the applied torque is the sum of the thread friction torque, the bearing friction torque, and the thread pitch torque. Evaluate the torque coefficient $K$ for a thread friction coefficient $\mu _ { t } = 0 . 1 5$ , a bearing friction coefficient $\mu _ { b } = 0 . 1 5$ , a pitch $p = 1 . 7 5$ mm, and a bearing radius $r _ { b } = 7 . 2$ mm.

::: solution
The torque balance is:

$$
T \; = \; T _ { \text{thread } } + T _ { \text{bearing } } + T _ { \text{pitch } }
$$

$$
T \; = \; \mu _ { t } \, F _ { i } \, { \frac { d _ { 2 } } { 2 } } + \mu _ { b } \, F _ { i } \, r _ { b } + F _ { i } \, { \frac { p } { 2 \pi } }
$$

For M12: $d _ { 2 } \approx 1 0 . 9$ mm, $p = 1 . 7 5$ mm, $r _ { b } = 7 . 2$ mm.

$$
T \; = \; F _ { i } \left( 0 . 1 5 \times { \frac { 1 0 . 9 } { 2 } } + 0 . 1 5 \times 7 . 2 + { \frac { 1 . 7 5 } { 2 \pi } } \right) \; = \; F _ { i } \, ( 0 . 8 1 8 + 1 . 0 8 + 0 . 2 7 9 )
$$

$$
T \; = \; F _ { i } \times 2 . 1 7 7 \; = \; F _ { i } \times 0 . 1 8 1 \times 1 2
$$

$$
K \; = \; { \frac { 2 . 1 7 7 } { 1 2 } } \; = \; { \bf 0 . 1 8 1 }
$$

**The torque coefficient $K = 0 . 1 8 1$ is in the typical range (0.15–0.20), and the range is the reason the torque-preload scatter is ± 25–30 %.** $\blacksquare$
:::
:::

::: exercise Derivation: the joint stiffness {#ex-derive-joint-stiffness level=4 check="2"}
Show that the joint stiffness ratio $C = k _ { b } / ( k _ { b } + k _ { m } )$ is derived from the compatibility condition: the bolt elongation increase equals the joint compression decrease under the external load. Evaluate $C$ for $k _ { b } = 3 0 0$ MN/m and $k _ { m } = 1 2 0 0$ MN/m.

::: solution
The compatibility condition states that the bolt elongation increase equals the joint compression decrease:

$$
\Delta \delta _ { b } \; = \; \Delta \delta _ { m }
$$

The bolt load increase is $\Delta F _ { b } = k _ { b } \, \Delta \delta$ , and the joint load decrease is $\Delta F _ { m } = k _ { m } \, \Delta \delta$ .

The external load is the sum of the bolt load increase and the joint load decrease:

$$
P \; = \; \Delta F _ { b } + \Delta F _ { m } \; = \; ( k _ { b } + k _ { m } ) \, \Delta \delta
$$

The bolt load increase is:

$$
\Delta F _ { b } \; = \; k _ { b } \, \Delta \delta \; = \; k _ { b } \, { \frac { P } { k _ { b } + k _ { m } } } \; = \; C \, P
$$

where $C = k _ { b } / ( k _ { b } + k _ { m } )$ .

$$
C \; = \; { \frac { 3 0 0 } { 3 0 0 + 1 \ 2 0 0 } } \; = \; { \frac { 3 0 0 } { 1 \ 5 0 0 } } \; = \; { \bf 0 . 2 }
$$

**The joint stiffness ratio $C = 0 . 2$ means that 20 % of the external load is carried by the bolt, and 80 % is carried by the joint. The stiff joint is the reason the bolt fatigue life is long.** $\blacksquare$
:::
:::

::: quiz Bolted joints {#quiz-bolted}
The most common bolt failure mode is:

- [ ] Static tensile overload
- [x] Fatigue
- [ ] Shear
- [ ] Creep

::: solution
**Fatigue.** The bolt fatigue is the most common bolt failure mode (80–90 % of bolt failures), and the fatigue is the reason the bolt is designed by the Goodman diagram, not the static tensile strength. The preload reduces the stress amplitude by 80–90 %, and the reduction is the reason the bolt fatigue life is 5× longer with the preload than without the preload.
:::
:::

::: quiz Welded joints {#quiz-welded}
The fillet weld is sized by:

- [ ] The leg length
- [x] The throat thickness
- [ ] The weld length
- [ ] The weld angle

::: solution
**The throat thickness.** The fillet weld is sized by the throat thickness $t = 0 . 7 0 7 \, h$ (where $h$ is the leg length), and the throat thickness is the reason the fillet weld is designed by the shear strength, not the tensile strength. The engineer who designs the fillet weld by the leg length without calculating the throat thickness is not designing the weld; they are designing a weld that will fail by shear.
:::
:::

## Where this lesson leads

- **[[machine-design/static-failure]]** — The bolt and weld are sized by the failure theories (von Mises, Tresca).
- **[[machine-design/fatigue]]** — The bolt and weld are sized by the fatigue criterion (the Goodman diagram, the S-N curve).
- **[[machine-design/shafts]]** — The key is the fuse of the shaft, and the key is designed to fail before the shaft.
- **[[machine-design/bearings]]** — The bearing fit is the reason the bearing life is 5× longer with the correct fit than with the incorrect fit.
- **[[machine-design/springs]]** — The spring is the elastic element that stores the energy, and the energy is the reason the spring is designed by the fatigue criterion.
- **[[machine-design/clutches-brakes-belts]]** — The clutch and brake are the friction joints that transmit the torque, and the friction is the reason the clutch is designed by the friction coefficient.
- **[[manufacturing/joining]]** — The weld quality (ISO 5817) is the reason the weld fatigue life is 5× longer with quality B than with quality D.
- **[[design-process/reliability-risk]]** — The bolted joint and the welded joint are the critical components in the FMEA, and the FMEA is the reason the joint is designed for the consequence of failure.

::: history Fasteners and joints: from the rivet to the high-strength bolt {#history-fasteners}
**3000 BC** — **The earliest riveted joint** is found in Egyptian gold work: the gold sheets are joined by gold rivets. **The Egyptian riveted joint is the reason the rivet is the oldest fastener, and the age is the reason the rivet is the most refined fastener.**

**1797** — **Henry Maudslay** invents the **standardised screw thread**, which makes the bolt interchangeable. **Maudslay's standardised thread is the reason the bolt is the most widely used fastener, and the interchangeability is the reason the bolt is the most manufacturable fastener.**

**1841** — **The Whitworth thread** is standardised in Britain, and the ** Sellers thread** is standardised in the US. **The thread standardisation is the reason the bolt is the most international fastener, and the international standard is the reason the bolt is the most widely used fastener.**

**1912** — **The high-strength bolt** is introduced in the United States, and the high-strength bolt is used in the steel bridge construction. **The high-strength bolt is the reason the bolted joint is used in bridges, and the bridge is the reason the bolt is the most critical fastener.**

**1930s** — **The arc welding** process is developed, and the arc welding replaces the riveted joint in shipbuilding and bridge construction. **The arc welding is the reason the welded joint is the most common joint in steel structures, and the welded joint is the reason the steel structure is the most efficient structure.**

**1950s** — **The adhesive bonding** is developed for aerospace applications, and the adhesive bond replaces the riveted joint in aircraft structures. **The adhesive bonding is the reason the adhesive bond is the most continuous joint, and the continuity is the reason the adhesive bond is the most fatigue-resistant joint.**

**1970s** — **The bolt fatigue** is systematically studied by the VDI 2230 standard, which provides the calculation method for the bolted joint. **The VDI 2230 standard is the reason the bolted joint is designed by the calculation, not the rule of thumb, and the calculation is the reason the bolted joint is the most predictable joint.**

**1990s** — **The friction-grip (preloaded) high-strength bolt** becomes the standard for steel bridge construction, replacing the bearing-type bolted joint. **The friction-grip bolt is the reason the bolted joint is fatigue-resistant, and the fatigue resistance is the reason the bolted joint is the most reliable joint in bridges.**
:::

::: summary Fasteners and joints {#summary-fasteners}
- **The fastener is the most common machine element, and the joint is the component that determines the machine's strength, stiffness, and fatigue life.** The joint failure is the most dangerous failure mode in machine design.
- **The bolt preload is the tensile force induced by the tightening torque: $T = K d F _ { i }$ .** The preload is the reason the bolt does not loosen under the vibration, and the preload is the reason the bolt fatigue life is 5× longer with the preload than without the preload.
- **The joint stiffness ratio $C = k _ { b } / ( k _ { b } + k _ { m } )$ determines the load sharing between the bolt and the joint.** The stiff joint is the reason the bolt fatigue life is 5× longer with a stiff joint than with a flexible joint.
- **The bolt fatigue is the most common bolt failure mode (80–90 % of bolt failures), and the bolt fatigue is designed by the Goodman diagram.** The preload reduces the stress amplitude by 80–90 %, and the reduction is the reason the bolt fatigue life is 5× longer with the preload than without the preload.
- **The fillet weld is sized by the throat thickness $t = 0 . 7 0 7 \, h$ , not the leg length.** The engineer who designs the fillet weld by the leg length without calculating the throat thickness is not designing the weld; they are designing a weld that will fail by shear.
- **The weld fatigue is the most common weld failure mode (70–80 % of weld failures), and the weld fatigue is designed by the S-N curve.** The weld quality (ISO 5817) is the reason the weld fatigue life is 5× longer with quality B than with quality D.
- **The adhesive bond is the reason the joint is continuous, and the continuity is the reason the adhesive bond is stronger than the riveted joint.** The surface preparation is the reason the adhesive bond strength is 3× higher with the correct preparation than with the incorrect preparation.
- **The riveted joint is the reason the joint is permanent, and the permanence is the reason the riveted joint is used in aircraft, bridges, and pressure vessels.** The joint efficiency is the reason the riveted joint is not used in high-strength applications.
- **The torque-preload scatter is ±25–30 %, and the scatter is the reason the preload must be verified by the turn-of-nut method or the ultrasonic method.** The torque coefficient $K$ is 0.15–0.20 for the lubricated thread and 0.20–0.30 for the dry thread.
- **The thermal expansion is the reason the bolt preload changes by 20–50 % with the temperature, and the change is the reason the bolted joint must be designed for the thermal load, not just the mechanical load.** The engineer who designs the bolted joint without checking the thermal expansion is not designing the joint; they are designing a joint that will leak.
:::

## Further reading

- **Robert C. Juvinall and Kurt M. Marshek (2020)** — *Fundamentals of Machine Component Design*, 7th ed. Wiley. The bolted joint, the welded joint, and the adhesive bond.
- **Joseph E. Shigley, Charles R. Mischke and Richard G. Budynas (2015)** — *Mechanical Engineering Design*, 11th ed. McGraw-Hill. The bolt preload, the joint stiffness, and the bolt fatigue.
- **VDI 2230 (2015)** — *Systematic Calculation of High Duty Bolted Joints*. VDI. The bolted joint design standard.
- **ISO 5817:2014** — *Welding — Fusion-Welded Joints in Steel, Nickel, Titanium and Their Alloys — Quality Levels for Imperfections*. ISO. The weld quality standard.
- **Roger A. F. (1990)** — *Machinery's Handbook*, 31st ed. Industrial Press. The bolt dimensions, the thread data, and the torque tables.
- **AWS (2023)** — *AWS D1.1: Structural Welding Code — Steel*. AWS. The weld design and inspection standard.
- **Alpheus A. (2003)** — *Adhesive Adhesives: Fundamentals and Applications*. CRC Press. The adhesive bond design, the surface preparation, and the environmental resistance.
- **W. Maurice (2000)** — *The Design of Bolted Joints*. Marcel Dekker. The bolted joint design, the preload, and the fatigue.
