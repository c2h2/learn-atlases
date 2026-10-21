The composite is the most efficient structural material: the composite is the carbon fibre reinforced polymer (CFRP), the glass fibre reinforced polymer (GFRP), and the metal matrix composite (MMC), and the composite is the material that determines the weight of the structure. **The engineer who designs the composite structure without understanding the classical lamination theory is not designing the structure; they are designing a structure that will fail by delamination, not by fibre failure.** The classical lamination theory is the reason the engineer can predict the stress and the strain in each ply, and the prediction is the reason the structure is safe.

The quantitative tools of composite mechanics are the **constitutive equations** (the stress-strain relationship for a single ply), the **classical lamination theory** (the stress-strain relationship for a laminate), the **failure criteria** (Tsai-Hill, Tsai-Wu, maximum stress), and the **delamination** (the interlaminar failure). The tools are the language in which the composite analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways composite analysis goes wrong
**Not checking the ply orientation.** The engineer who designs the composite without checking the ply orientation is not designing the composite; they are designing a composite that will fail by matrix cracking. **The ply orientation is the reason the composite is stiffer in the fibre direction than the transverse direction, and the stiffness is the reason the composite is designed for the fibre orientation, not the load direction.** **Not checking the coupling.** The engineer who designs the composite without checking the coupling is not designing the composite; they are designing a composite that will twist. **The coupling is the reason the composite twists under tension, and the twist is the reason the composite is designed for the coupling, not the stiffness.** **Not checking the failure criterion.** The engineer who uses the maximum stress criterion without checking the Tsai-Wu criterion is not analysing the composite; they are guessing. **The Tsai-Wu criterion is the reason the composite is designed for the interaction, not the individual stress, and the interaction is the reason the composite is the most critical material in the aircraft.** **Not checking the delamination.** The engineer who designs the composite without checking the delamination is not designing the composite; they are designing a composite that will fail by delamination. **The delamination is the reason the composite is designed for the interlaminar strength, not the in-plane strength, and the interlaminar strength is the reason the composite is the most critical material in the aircraft.** **Not checking the residual stress.** The engineer who calculates the composite stress without checking the residual stress is not calculating the composite stress; they are calculating the applied stress. **The residual stress is the reason the composite stress is different from the applied stress, and the difference is the reason the engineer uses the residual stress, not the applied stress.** **Not checking the moisture absorption.** The engineer who designs the composite without checking the moisture absorption is not designing the composite; they are designing a composite that will fail by moisture degradation. **The moisture absorption is the reason the composite is designed for the moisture, not just the load, and the moisture is the reason the composite is the most critical material in the marine environment.** **Not checking the impact damage.** The engineer who designs the composite without checking the impact damage is not designing the composite; they are designing a composite that will fail by impact damage. **The impact damage is the reason the composite is designed for the impact, not just the load, and the impact is the reason the composite is the most critical material in the aircraft.** **Not checking the fatigue.** The engineer who designs the composite without checking the fatigue is not designing the composite; they are designing a composite that will fail by fatigue. **The fatigue is the reason the composite is designed for the fatigue life, not the static strength, and the fatigue life is the reason the composite is the most critical material in the aircraft.** **Not checking the manufacturing defects.** The engineer who designs the composite without checking the manufacturing defects is not designing the composite; they are designing a composite that will fail by manufacturing defect. **The manufacturing defect is the reason the composite is designed for the defect, not just the load, and the defect is the reason the composite is the most critical material in the aircraft.**
:::

## 1. Constitutive equations and lamination theory

::: definition The constitutive equations for a single ply {#def-constitutive}
The **constitutive equations** for a single ply relate the stress and the strain in the material coordinate system, and the constitutive equations are the reason the engineer can calculate the stress in each ply.

For an **orthotropic ply** (transversely isotropic):

$$
{ \left[ \begin{array} { l } { \varepsilon _ { 1 } } \\ { \varepsilon _ { 2 } } \\ { \gamma _ { 1 2 } } \end{array} \right] } \; = \; { \left[ \begin{array} { c c c } { 1 / E _ { 1 } } & { - \nu _ { 1 2 } / E _ { 1 } } & { 0 } \\ { - \nu _ { 2 1 } / E _ { 2 } } & { 1 / E _ { 2 } } & { 0 } \\ { 0 } & { 0 } & { 1 / G _ { 1 2 } } \end{array} \right] } \, { \left[ \begin{array} { l } { \sigma _ { 1 } } \\ { \sigma _ { 2 } } \\ { \tau _ { 1 2 } } \end{array} \right] }
$$

The **reduced stiffness matrix** (plane stress) is:

$$
Q \; = \; { \left[ \begin{array} { c c c } { Q _ { 1 1 } } & { Q _ { 1 2 } } & { 0 } \\ { Q _ { 1 2 } } & { Q _ { 2 2 } } & { 0 } \\ { 0 } & { 0 } & { Q _ { 6 6 } } \end{array} \right] } \; = \; { \left[ \begin{array} { c c c } { E _ { 1 } / ( 1 - \nu _ { 1 2 } \, \nu _ { 2 1 } ) } & { \nu _ { 1 2 } \, E _ { 2 } / ( 1 - \nu _ { 1 2 } \, \nu _ { 2 1 } ) } & { 0 } \\ { \nu _ { 1 2 } \, E _ { 2 } / ( 1 - \nu _ { 1 2 } \, \nu _ { 2 1 } ) } & { E _ { 2 } / ( 1 - \nu _ { 1 2 } \, \nu _ { 2 1 } ) } & { 0 } \\ { 0 } & { 0 } & { G _ { 1 2 } } \end{array} \right] }
$$

$$
\begin{array} { l c c c c }
\textbf{Material} & \textbf{ } E _ { 1 } \textbf{ (GPa)} & \textbf{ } E _ { 2 } \textbf{ (GPa)} & \textbf{ } G _ { 1 2 } \textbf{ (GPa)} & \textbf{ } \nu _ { 1 2 } \\ \hline
\text{CFRP (T300/914)} & 1 4 8 & 9 . 5 & 5 . 1 & 0 . 2 7 \\
\text{GFRP (E-glass/epoxy)} & 4 5 & 1 6 & 5 . 5 & 0 . 2 8 \\
\text{Kevlar/epoxy} & 7 9 & 5 . 5 & 2 . 2 & 0 . 3 4 \\
\text{Ti-6Al-4V/Boride} & 2 2 0 & 1 2 0 & 4 5 & 0 . 2 5 \\
\end{array}
$$

**The ply orientation is the reason the composite is stiffer in the fibre direction than the transverse direction, and the stiffness is the reason the composite is designed for the fibre orientation, not the load direction. The engineer who designs the composite without checking the ply orientation is not designing the composite; they are designing a composite that will fail by matrix cracking.**
:::

::: definition The classical lamination theory {#def-clt}
The **classical lamination theory** (CLT) relates the laminate force and moment resultants to the ply strains, and the CLT is the reason the engineer can calculate the stress in each ply of the laminate.

The **laminate constitutive equation** is:

$$
{ \left[ \begin{array} { l } { N } \\ { M } \end{array} \right] } \; = \; { \left[ \begin{array} { c c } { A } & { B } \\ { B } & { D } \end{array} \right] } \, { \left[ \begin{array} { l } { \varepsilon ^ { 0 } } \\ { \kappa } \end{array} \right] }
$$

where:
- $A _ { i j } = \sum \bar { Q } _ { i j } ^ { ( k ) } \, ( z _ { k } - z _ { k - 1 } )$ is the **extensional stiffness matrix**
- $B _ { i j } = { \frac { 1 } { 2 } } \sum \bar { Q } _ { i j } ^ { ( k ) } \, ( z _ { k } ^ { 2 } - z _ { k - 1 } ^ { 2 } )$ is the **coupling stiffness matrix**
- $D _ { i j } = { \frac { 1 } { 3 } } \sum \bar { Q } _ { i j } ^ { ( k ) } \, ( z _ { k } ^ { 3 } - z _ { k - 1 } ^ { 3 } )$ is the **bending stiffness matrix**

$$
\begin{array} { l c c c }
\textbf{Laminate} & \textbf{ } A _ { 1 1 } \textbf{ (GPa·mm)} & \textbf{ } D _ { 1 1 } \textbf{ (GPa·mm} ^ { 3 } \textbf{)} & \textbf{Use case} \\ \hline
[ 0 _ { 4 } ] & 5 9 2 & 6 1 . 7 & \text{Unidirectional} \\
[ 0 / 9 0 _ { 2 } / 0 ] & 3 5 5 & 3 7 . 0 & \text{Cross-ply} \\
[ 0 / 9 0 ] _ { s } & 2 9 6 & 1 8 . 5 & \text{Cross-ply} \\
[ \pm 4 5 ] _ { s } & 1 4 8 & 9 . 3 & \text{Angle-ply} \\
[ 0 / \pm 4 5 / 9 0 ] _ { s } & 2 9 6 & 1 8 . 5 & \text{Quasi-isotropic} \\
\end{array}
$$

**The coupling is the reason the composite twists under tension, and the twist is the reason the composite is designed for the coupling, not the stiffness. The engineer who designs the composite without checking the coupling is not designing the composite; they are designing a composite that will twist.**
:::

::: widget plot
title: The stiffness of a laminate vs ply orientation
f: 148*x^4+9.5*(1-x^4)+2*2.7*x^2*(1-x^2); 9.5*x^4+148*(1-x^4)+2*2.7*x^2*(1-x^2)
x: 0,1
y: 0,160
labels: Ex (0 deg); Ex (90 deg)
caption: The stiffness of a laminate against the ply orientation. **The stiffness is maximum in the fibre direction and minimum in the transverse direction, and the maximum is the reason the composite is designed for the fibre orientation, not the load direction.** **The stiffness is proportional to the fourth power of the cosine of the angle, and the fourth power is the reason the composite is designed for the fibre orientation, not the load direction.**
:::

::: example Quasi-isotropic laminate calculation {#ex-quasi-isotropic level=3 check="2"}
A quasi-isotropic laminate $[ 0 / 9 0 / \pm 4 5 ] _ { s }$ (CFRP, $E _ { 1 } = 1 4 8$ GPa, $E _ { 2 } = 9 . 5$ GPa, $G _ { 1 2 } = 5 . 1$ GPa, $\nu _ { 1 2 } = 0 . 2 7$ ) is subjected to $N _ { x } = 1 0 0$ kN/m. Calculate the laminate strain.

**Extensional stiffness matrix (approximate):**

For a quasi-isotropic laminate, the extensional stiffness is:

$$
A _ { 1 1 } \; = \; A _ { 2 2 } \; \approx \; { \frac { 3 } { 8 } } \, E _ { 1 } \, t + { \frac { 5 } { 8 } } \, E _ { 2 } \, t + { \frac { 2 } { 8 } } \, ( 2 \, G _ { 1 2 } + \nu _ { 1 2 } \, E _ { 2 } ) \, t
$$

For $t = 1 . 2$ mm (4 plies of 0.3 mm each, doubled for symmetric):

$$
A _ { 1 1 } \; \approx \; 0 . 3 7 5 \times 1 4 8 \times 1 . 2 + 0 . 6 2 5 \times 9 . 5 \times 1 . 2 + 0 . 2 5 \times ( 1 0 . 2 + 2 . 5 7 ) \times 1 . 2
$$

$$
A _ { 1 1 } \; \approx \; 6 6 . 6 + 7 . 1 3 + 3 . 8 3 \; = \; 7 7 . 6 \ \text{kN/mm} \; = \; 7 7 . 6 \times 1 0 ^ { 6 } \ \text{N/m}
$$

**Laminate strain:**

$$
\varepsilon _ { x } \; = \; { \frac { N _ { x } } { A _ { 1 1 } } } \; = \; { \frac { 1 0 0 \times 1 0 ^ { 3 } } { 7 7 . 6 \times 1 0 ^ { 6 } } } \; = \; { \bf 1 2 9 0 } \ \mu \varepsilon
$$

**The laminate strain is 1290 microstrain. The engineer would design the laminate for the strain, because the strain is the reason the laminate is designed for the stiffness, not the strength.**
:::

## 2. Failure criteria and delamination

::: definition The failure criteria {#def-failure-criteria}
The **failure criteria** are the conditions that determine when the composite fails, and the failure criteria are the reason the engineer can predict the failure load of the composite.

**Maximum stress criterion**:

$$
| \sigma _ { 1 } | \; \geq \; X \quad \text{or} \quad | \sigma _ { 2 } | \; \geq \; Y \quad \text{or} \quad | \tau _ { 1 2 } | \; \geq \; S
$$

**Tsai-Hill criterion**:

$$
\left( { \frac { \sigma _ { 1 } } { X } } \right) ^ { 2 } - { \frac { \sigma _ { 1 } \, \sigma _ { 2 } } { X ^ { 2 } } } + \left( { \frac { \sigma _ { 2 } } { Y } } \right) ^ { 2 } + \left( { \frac { \tau _ { 1 2 } } { S } } \right) ^ { 2 } \; \geq \; 1
$$

**Tsai-Wu criterion**:

$$
F _ { i } \, \sigma _ { i } + F _ { i j } \, \sigma _ { i } \, \sigma _ { j } \; \geq \; 1
$$

$$
\begin{array} { l c c c }
\textbf{Criterion} & \textbf{Interaction} & \textbf{Tension/compression} & \textbf{Use case} \\ \hline
\text{Maximum stress} & \text{No} & \text{Yes} & \text{Simple design} \\
\text{Tsai-Hill} & \text{Yes} & \text{No} & \text{General design} \\
\text{Tsai-Wu} & \text{Yes} & \text{Yes} & \text{General design} \\
\text{Puck} & \text{Yes} & \text{Yes} & \text{Advanced design} \\
\end{array}
$$

**The Tsai-Wu criterion is the reason the composite is designed for the interaction, not the individual stress, and the interaction is the reason the composite is the most critical material in the aircraft. The engineer who uses the maximum stress criterion without checking the Tsai-Wu criterion is not analysing the composite; they are guessing.**
:::

::: definition The delamination {#def-delamination}
The **delamination** is the interlaminar failure, and the delamination is the reason the composite is designed for the interlaminar strength, not the in-plane strength.

**Interlaminar shear strength** (ILSS):

$$
\tau _ { \text{ILSS } } \; = \; { \frac { 3 \, P } { 4 \, b \, h } } \quad \text{(short beam shear test)}
$$

**Mode I fracture toughness** (opening mode):

$$
G _ { I C } \; = \; { \frac { 3 \, P \, \delta } { 2 \, b \, a } } \quad \text{(double cantilever beam test)}
$$

**Mode II fracture toughness** (sliding mode):

$$
G _ { I I C } \; = \; { \frac { 9 \, P \, \delta \, a ^ { 2 } } { 2 \, b \, L ^ { 2 } } } \quad \text{(end notch flexure test)}
$$

$$
\begin{array} { l c c c }
\textbf{Property} & \textbf{Typical value} & \textbf{Test} & \textbf{Use case} \\ \hline
\text{ILSS} & 3 0 \text{--} 9 0 \ \text{MPa} & \text{Short beam shear} & \text{Interlaminar shear} \\
G _ { I C } & 0 . 2 \text{--} 1 . 0 \ \text{kJ/m} ^ { 2 } & \text{DCB} & \text{Mode I delamination} \\
G _ { I I C } & 0 . 5 \text{--} 2 . 0 \ \text{kJ/m} ^ { 2 } & \text{ENF} & \text{Mode II delamination} \\
\text{CAI} & 1 5 0 \text{--} 3 5 0 \ \text{MPa} & \text{Compression after impact} & \text{Impact damage} \\
\end{array}
$$

**The delamination is the reason the composite is designed for the interlaminar strength, not the in-plane strength, and the interlaminar strength is the reason the composite is the most critical material in the aircraft. The engineer who designs the composite without checking the delamination is not designing the composite; they are designing a composite that will fail by delamination.**
:::

::: widget plot
title: The failure envelope for a composite ply
f: sqrt(1-x^2)*0.8; -sqrt(1-x^2)*0.8
x: -1.2,1.2
y: -1.2,1.2
labels: Tsai-Hill (upper); Tsai-Hill (lower)
caption: The failure envelope for a composite ply using the Tsai-Hill criterion. **The failure envelope is an ellipse, and the ellipse is the reason the composite is designed for the interaction, not the individual stress.** **The Tsai-Hill criterion is the reason the engineer can predict the failure load of the composite, and the prediction is the reason the composite is safe.**
:::

::: example Tsai-Hill failure check {#ex-tsai-hill level=3 check="2"}
A CFRP ply has $\sigma _ { 1 } = 8 0 0$ MPa, $\sigma _ { 2 } = 3 0$ MPa, and $\tau _ { 1 2 } = 5 0$ MPa. The strengths are $X = 1 5 0 0$ MPa, $Y = 5 0$ MPa, and $S = 9 0$ MPa. Check whether the ply fails using the Tsai-Hill criterion.

**Tsai-Hill equation:**

$$
\left( { \frac { 8 0 0 } { 1 5 0 0 } } \right) ^ { 2 } - { \frac { 8 0 0 \times 3 0 } { 1 5 0 0 ^ { 2 } } } + \left( { \frac { 3 0 } { 5 0 } } \right) ^ { 2 } + \left( { \frac { 5 0 } { 9 0 } } \right) ^ { 2 }
$$

$$
= \; 0 . 2 8 4 - 0 . 0 1 0 7 + 0 . 3 6 + 0 . 3 0 9 \; = \; { \bf 0 . 9 4 2 }
$$

**Since $0 . 9 4 2 < 1$ , the ply does not fail. The factor of safety is:**

$$
n \; = \; { \frac { 1 } { \sqrt { 0 . 9 4 2 } } } \; = \; { \bf 1 . 0 3 }
$$

**The Tsai-Hill value is 0.942, which is below 1. The ply does not fail, but the factor of safety is only 1.03. The engineer would design the composite for the Tsai-Hill criterion, because the Tsai-Hill criterion is the reason the composite is designed for the interaction, not the individual stress.**
:::

::: example Ply stress in a cross-ply laminate {#ex-ply-stress level=3 check="2"}
A cross-ply laminate $[ 0 / 9 0 ] _ { s }$ (CFRP, $E _ { 1 } = 1 4 8$ GPa, $E _ { 2 } = 9 . 5$ GPa, $G _ { 1 2 } = 5 . 1$ GPa, $\\nu _ { 1 2 } = 0 . 2 7$ , ply thickness 0.15 mm) is subjected to $N _ { x } = 5 0$ kN/m. Calculate the stress in the 0\\u00b0 and 90\\u00b0 plies.

**Extensional stiffness matrix (approximate):**

For a $[ 0 / 9 0 ] _ { s }$ laminate, the extensional stiffness is dominated by the 0\\u00b0 plies in the $x$-direction:

$$
A _ { 1 1 } \\; \\approx \\; 2 \\times Q _ { 1 1 } \\times t _ { 0 } + 2 \\times Q _ { 2 2 } \\times t _ { 9 0 } \\; = \\; 2 \\times 1 4 8 . 7 \\times 0 . 1 5 + 2 \\times 9 . 5 5 \\times 0 . 1 5
$$

$$
A _ { 1 1 } \\; = \\; 4 4 . 6 + 2 . 8 7 \\; = \\; 4 7 . 5 \\ \\text{kN/mm} \\; = \\; 4 7 . 5 \\times 1 0 ^ { 6 } \\ \\text{N/m}
$$

**Laminate strain:**

$$
\\varepsilon _ { x } \\; = \\; { \\frac { N _ { x } } { A _ { 1 1 } } } \\; = \\; { \\frac { 5 0 \\times 1 0 ^ { 3 } } { 4 7 . 5 \\times 1 0 ^ { 6 } } } \\; = \\; 1 0 5 3 \\ \\mu \\varepsilon
$$

**Stress in the 0\\u00b0 ply:**

$$
\\sigma _ { 1 } \\; = \\; Q _ { 1 1 } \\, \\varepsilon _ { x } \\; = \\; 1 4 8 . 7 \\times 1 0 ^ { 3 } \\times 1 0 5 3 \\times 1 0 ^ { - 6 } \\; = \\; { \\bf 1 5 7 } \\ \\text{MPa}
$$

**Stress in the 90\\u00b0 ply:**

$$
\\sigma _ { 2 } \\; = \\; Q _ { 2 2 } \\, \\varepsilon _ { x } \\; = \\; 9 . 5 5 \\times 1 0 ^ { 3 } \\times 1 0 5 3 \\times 1 0 ^ { - 6 } \\; = \\; { \\bf 1 0 . 1 } \\ \\text{MPa}
$$

**The stress in the 0\\u00b0 ply is 157 MPa, and the stress in the 90\\u00b0 ply is 10.1 MPa. The engineer would design the laminate for the ply stress, because the ply stress is the reason the laminate is designed for the ply orientation, not the load direction.**
:::

::: example Mode I delamination toughness {#ex-dcb-test level=3 check="2"}
A double cantilever beam (DCB) test gives $P = 1 0 0$ N, $\\delta = 5$ mm, $b = 2 0$ mm, and $a = 5 0$ mm. Calculate the mode I fracture toughness $G _ { I C }$ .

**Mode I fracture toughness:**

$$
G _ { I C } \\; = \\; { \\frac { 3 \\, P \\, \\delta } { 2 \\, b \\, a } } \\; = \\; { \\frac { 3 \\times 1 0 0 \\times 5 } { 2 \\times 2 0 \\times 5 0 } } \\; = \\; { \\frac { 1 5 0 0 } { 2 0 0 0 } } \\; = \\; { \\bf 0 . 7 5 } \\ \\text{kJ/m} ^ { 2 }
$$

**The mode I fracture toughness is 0.75 kJ/m². The engineer would design the composite for the delamination toughness, because the delamination toughness is the reason the composite is designed for the interlaminar strength, not the in-plane strength.**
:::

::: exercise Laminate coupling {#ex-laminate-coupling level=3 check="2"}
A laminate has $B _ { 1 1 } = 5 \\times 1 0 ^ { 5 }$ N and $A _ { 1 1 } = 4 0 \\times 1 0 ^ { 6 }$ N/m. Calculate the coupling ratio $B _ { 1 1 } / A _ { 1 1 }$ and explain its significance.

::: solution
$$
{ \\frac { B _ { 1 1 } } { A _ { 1 1 } } } \\; = \\; { \\frac { 5 \\times 1 0 ^ { 5 } } { 4 0 \\times 1 0 ^ { 6 } } } \\; = \\; { \\bf 0 . 0 1 2 5 } \\ \\text{m}
$$

**The coupling ratio is 0.0125 m. The coupling is the reason the composite twists under tension, and the twist is the reason the composite is designed for the coupling, not the stiffness. A symmetric laminate has $B = 0$ , which is the reason the symmetric laminate is the most widely used laminate in the aircraft.**
:::
:::

## Exercises

::: exercise Reduced stiffness matrix {#ex-reduced-stiffness level=3 check="2"}
Calculate the reduced stiffness matrix for a CFRP ply ($E _ { 1 } = 1 4 8$ GPa, $E _ { 2 } = 9 . 5$ GPa, $G _ { 1 2 } = 5 . 1$ GPa, $\nu _ { 1 2 } = 0 . 2 7$ ).

::: solution
$$
\nu _ { 2 1 } \; = \; \nu _ { 1 2 } \, { \frac { E _ { 2 } } { E _ { 1 } } } \; = \; 0 . 2 7 \times { \frac { 9 . 5 } { 1 4 8 } } \; = \; 0 . 0 1 7 3
$$

$$
1 - \nu _ { 1 2 } \, \nu _ { 2 1 } \; = \; 1 - 0 . 2 7 \times 0 . 0 1 7 3 \; = \; 0 . 9 9 5
$$

$$
Q _ { 1 1 } \; = \; { \frac { 1 4 8 } { 0 . 9 9 5 } } \; = \; { \bf 1 4 8 . 7 } \ \text{GPa} \qquad Q _ { 2 2 } \; = \; { \frac { 9 . 5 } { 0 . 9 9 5 } } \; = \; { \bf 9 . 5 5 } \ \text{GPa}
$$

$$
Q _ { 1 2 } \; = \; { \frac { 0 . 2 7 \times 9 . 5 } { 0 . 9 9 5 } } \; = \; { \bf 2 . 5 8 } \ \text{GPa} \qquad Q _ { 6 6 } \; = \; { \bf 5 . 1 } \ \text{GPa}
$$

**The reduced stiffness matrix is $Q = [ 1 4 8 . 7 , 2 . 5 8 , 0 ; 2 . 5 8 , 9 . 5 5 , 0 ; 0 , 0 , 5 . 1 ]$ GPa.**
:::
:::

::: exercise Maximum stress criterion {#ex-max-stress level=3 check="2"}
A composite ply has $\sigma _ { 1 } = 1 2 0 0$ MPa, $\sigma _ { 2 } = 4 0$ MPa, and $\tau _ { 1 2 } = 6 0$ MPa. The strengths are $X = 1 5 0 0$ MPa, $Y = 5 0$ MPa, and $S = 9 0$ MPa. Check whether the ply fails using the maximum stress criterion.

::: solution
$$
| \sigma _ { 1 } | / X \; = \; 1 2 0 0 / 1 5 0 0 \; = \; 0 . 8 0 \quad \checkmark
$$

$$
| \sigma _ { 2 } | / Y \; = \; 4 0 / 5 0 \; = \; 0 . 8 0 \quad \checkmark
$$

$$
| \tau _ { 1 2 } | / S \; = \; 6 0 / 9 0 \; = \; 0 . 6 7 \quad \checkmark
$$

**All ratios are below 1, so the ply does not fail. The maximum stress criterion is the reason the engineer can check the failure of the composite, and the check is the reason the composite is safe.**
:::
:::

::: exercise Interlaminar shear strength {#ex-ilss level=3 check="2"}
A short beam shear test gives $P = 5 0 0$ N, $b = 1 0$ mm, and $h = 4$ mm. Calculate the ILSS.

::: solution
$$
\tau _ { \text{ILSS } } \; = \; { \frac { 3 \, P } { 4 \, b \, h } } \; = \; { \frac { 3 \times 5 0 0 } { 4 \times 1 0 \times 4 } } \; = \; { \frac { 1 5 0 0 } { 1 6 0 } } \; = \; { \bf 9 . 4 } \ \text{MPa}
$$

**The ILSS is 9.4 MPa. The engineer would design the composite for the ILSS, because the ILSS is the reason the composite is designed for the interlaminar strength, not the in-plane strength.**
:::
:::

::: exercise Laminate strain {#ex-laminate-strain level=3 check="2"}
A laminate has $A _ { 1 1 } = 5 0 \times 1 0 ^ { 6 }$ N/m and is subjected to $N _ { x } = 2 0 0$ kN/m. Calculate the laminate strain.

::: solution
$$
\varepsilon _ { x } \; = \; { \frac { N _ { x } } { A _ { 1 1 } } } \; = \; { \frac { 2 0 0 \times 1 0 ^ { 3 } } { 5 0 \times 1 0 ^ { 6 } } } \; = \; { \bf 4 0 0 0 } \ \mu \varepsilon
$$

**The laminate strain is 4000 microstrain.**
:::
:::

::: exercise Coupling effect {#ex-coupling level=3 check="2"}
A laminate has $B _ { 1 6 } = 1 0 ^ { 6 }$ N and $A _ { 1 1 } = 5 0 \times 1 0 ^ { 6 }$ N/m. Calculate the curvature when $N _ { x } = 1 0 0$ kN/m.

::: solution
$$
\kappa \; = \; { \frac { B _ { 1 6 } \, N _ { x } } { A _ { 1 1 } \, D _ { 1 1 } - B _ { 1 6 } ^ { 2 } } } \; \approx \; { \frac { B _ { 1 6 } \, N _ { x } } { A _ { 1 1 } \, D _ { 1 1 } } }
$$

Assuming $D _ { 1 1 } = 1 0 ^ { 4 }$ N·m:

$$
\kappa \; \approx \; { \frac { 1 0 ^ { 6 } \times 1 0 0 \times 1 0 ^ { 3 } } { 5 0 \times 1 0 ^ { 6 } \times 1 0 ^ { 4 } } } \; = \; { \frac { 1 0 ^ { 1 1 } } { 5 \times 1 0 ^ { 1 1 } } } \; = \; { \bf 0 . 2 } \ \text{m} ^ { - 1 }
$$

**The curvature is 0.2 m⁻¹. The coupling is the reason the composite twists under tension, and the twist is the reason the composite is designed for the coupling, not the stiffness.**
:::
:::

::: exercise Derivation: the classical lamination theory {#ex-derive-clt level=4 check="2"}
Show that the laminate constitutive equation $[ N , M ] ^ { T } = [ A , B ; B , D ] \, [ \varepsilon ^ { 0 } , \kappa ] ^ { T }$ is derived from the integration of the ply stresses through the thickness.

::: solution
The strain at a distance $z$ from the mid-plane is:

$$
\varepsilon ( z ) \; = \; \varepsilon ^ { 0 } + z \, \kappa
$$

The stress in ply $k$ is:

$$
\sigma ^ { ( k ) } \; = \; \bar { Q } ^ { ( k ) } \, \varepsilon ( z ) \; = \; \bar { Q } ^ { ( k ) } \, ( \varepsilon ^ { 0 } + z \, \kappa )
$$

The force resultant is:

$$
N \; = \; \int _ { - h / 2 } ^ { h / 2 } \sigma \, d z \; = \; \sum _ { k } \, \bar { Q } ^ { ( k ) } \, \int _ { z _ { k - 1 } } ^ { z _ { k } } \, ( \varepsilon ^ { 0 } + z \, \kappa ) \, d z
$$

$$
N \; = \; \underbrace { \sum _ { k } \, \bar { Q } ^ { ( k ) } \, ( z _ { k } - z _ { k - 1 } ) } _ { A } \, \varepsilon ^ { 0 } + \underbrace { { \frac { 1 } { 2 } } \sum _ { k } \, \bar { Q } ^ { ( k ) } \, ( z _ { k } ^ { 2 } - z _ { k - 1 } ^ { 2 } ) } _ { B } \, \kappa
$$

The moment resultant is:

$$
M \; = \; \int _ { - h / 2 } ^ { h / 2 } \sigma \, z \, d z \; = \; B \, \varepsilon ^ { 0 } + D \, \kappa
$$

where $D = { \frac { 1 } { 3 } } \sum \bar { Q } ^ { ( k ) } \, ( z _ { k } ^ { 3 } - z _ { k - 1 } ^ { 3 } )$ .

**The classical lamination theory is the reason the engineer can calculate the stress in each ply of the laminate, and the calculation is the reason the composite is safe.** $\blacksquare$
:::
:::

::: exercise Derivation: the Tsai-Hill criterion {#ex-derive-tsai-hill level=4 check="2"}
Show that the Tsai-Hill criterion is derived from the von Mises criterion by replacing the yield strengths with the composite strengths.

::: solution
The von Mises criterion for an isotropic material is:

$$
\sigma _ { 1 } ^ { 2 } - \sigma _ { 1 } \, \sigma _ { 2 } + \sigma _ { 2 } ^ { 2 } + 3 \, \tau _ { 1 2 } ^ { 2 } \; = \; S _ { y } ^ { 2 }
$$

For an orthotropic material, the von Mises criterion is modified by replacing the yield strength with the directional strengths:

$$
\left( { \frac { \sigma _ { 1 } } { X } } \right) ^ { 2 } - { \frac { \sigma _ { 1 } \, \sigma _ { 2 } } { X ^ { 2 } } } + \left( { \frac { \sigma _ { 2 } } { Y } } \right) ^ { 2 } + \left( { \frac { \tau _ { 1 2 } } { S } } \right) ^ { 2 } \; = \; 1
$$

The Tsai-Hill criterion is the von Mises criterion with the yield strength replaced by the directional strengths. The Tsai-Hill criterion is the reason the engineer can predict the failure load of the composite, and the prediction is the reason the composite is safe. $\blacksquare$
:::
:::

::: quiz Composite mechanics {#quiz-composite}
The classical lamination theory relates:

- [ ] Stress and strain in a single ply
- [x] Laminate force and moment resultants to ply strains
- [ ] Temperature and strain
- [ ] Moisture and strain

::: solution
**Laminate force and moment resultants to ply strains.** The classical lamination theory relates the laminate force and moment resultants to the ply strains through the extensional, coupling, and bending stiffness matrices. The CLT is the reason the engineer can calculate the stress in each ply of the laminate.
:::
:::

::: quiz Failure criteria {#quiz-failure-criteria}
The Tsai-Wu criterion accounts for:

- [ ] Only the individual stress components
- [x] The interaction between stress components and tension/compression difference
- [ ] Only the shear stress
- [ ] Only the normal stress

::: solution
**The interaction between stress components and tension/compression difference.** The Tsai-Wu criterion accounts for the interaction between stress components and the difference between tension and compression strengths. The Tsai-Wu criterion is the reason the composite is designed for the interaction, not the individual stress.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/fracture-mechanics]]** — The fracture mechanics of composites is the reason the composite is designed for the damage tolerance.
- **[[solid-mechanics/plates]]** — The composite plate is the reason the aircraft wing is lightweight.
- **[[solid-mechanics/thin-walled-structures]]** — The thin-walled composite structure is the reason the aircraft wing is lightweight.
- **[[solid-mechanics/plasticity]]** — The plasticity of the matrix is the reason the composite is designed for the matrix yield.
- **[[materials-science/material-families]]** — The composite is the reason the material is selected for the application.
- **[[materials-science/materials-selection]]** — The composite is the reason the material is selected for the application.
- **[[manufacturing/polymer-composite-processing]]** — The composite processing is the reason the composite is manufactured.
- **[[machine-design/static-failure]]** — The failure criteria are the foundation of static failure analysis.
- **[[aerodynamics/potential-flow]]** — The composite is the reason the aircraft wing is lightweight.
- **[[propulsion/turbines]]** — The composite is the reason the turbine blade is lightweight.

::: history Composite mechanics: from Griffith to the classical lamination theory {#history-composites}
**1950** — **The first composite** is developed by **Raybestos-Manhattan**, who develops the glass fibre reinforced polymer (GFRP). **The GFRP is the reason the composite is the most widely used material in the aircraft, and the lightweight is the reason the composite is the most refined material in engineering.**

**1960** — **The carbon fibre reinforced polymer (CFRP)** is developed by **Rolls-Royce**, who develops the CFRP for the turbine blade. **The CFRP is the reason the composite is the most widely used material in the aircraft, and the lightweight is the reason the composite is the most refined material in engineering.**

**1965** — **The classical lamination theory** is developed by **S.G. Lekhnitskii**, who calculates the stress in each ply of the laminate. **The Lekhnitskii classical lamination theory is the reason the engineer can calculate the stress in each ply of the laminate, and the calculation is the reason the composite is safe.**

**1969** — **The Tsai-Wu failure criterion** is published by **S.W. Tsai and E.M. Wu**, who calculate the failure load of the composite. **The Tsai-Wu failure criterion is the reason the composite is designed for the interaction, not the individual stress, and the interaction is the reason the composite is the most critical material in the aircraft.**

**1970s** — **The delamination** is studied by **B. Harris**, who measures the interlaminar fracture toughness. **The Harris delamination is the reason the composite is designed for the interlaminar strength, not the in-plane strength, and the interlaminar strength is the reason the composite is the most critical material in the aircraft.**

**1980s** — **The composite aircraft** is developed by **Boeing**, who develops the 767 with composite control surfaces. **The Boeing composite aircraft is the reason the composite is the most widely used material in the aircraft, and the lightweight is the reason the composite is the most refined material in engineering.**

**1990s** — **The composite fuselage** is developed by **Airbus**, who develops the A380 with composite panels. **The Airbus composite fuselage is the reason the composite is the most widely used material in the aircraft, and the lightweight is the reason the composite is the most refined material in engineering.**

**2000s** — **The composite wing** is developed by **Boeing**, who develops the 787 with a composite wing. **The Boeing composite wing is the reason the composite is the most widely used material in the aircraft, and the lightweight is the reason the composite is the most refined material in engineering.**
:::

::: summary Composites {#summary-composites}
- **The constitutive equations for a single ply relate the stress and the strain in the material coordinate system: $\varepsilon = S \, \sigma$ where $S$ is the compliance matrix.** The ply orientation is the reason the composite is stiffer in the fibre direction than the transverse direction, and the stiffness is the reason the composite is designed for the fibre orientation, not the load direction.
- **The classical lamination theory relates the laminate force and moment resultants to the ply strains: $[ N , M ] ^ { T } = [ A , B ; B , D ] \, [ \varepsilon ^ { 0 } , \kappa ] ^ { T }$ .** The CLT is the reason the engineer can calculate the stress in each ply of the laminate, and the calculation is the reason the composite is safe.
- **The extensional stiffness matrix is $A _ { i j } = \sum \bar { Q } _ { i j } ^ { ( k ) } \, ( z _ { k } - z _ { k - 1 } )$ , the coupling stiffness matrix is $B _ { i j } = { \frac { 1 } { 2 } } \sum \bar { Q } _ { i j } ^ { ( k ) } \, ( z _ { k } ^ { 2 } - z _ { k - 1 } ^ { 2 } )$ , and the bending stiffness matrix is $D _ { i j } = { \frac { 1 } { 3 } } \sum \bar { Q } _ { i j } ^ { ( k ) } \, ( z _ { k } ^ { 3 } - z _ { k - 1 } ^ { 3 } )$ .** The coupling is the reason the composite twists under tension, and the twist is the reason the composite is designed for the coupling, not the stiffness.
- **The maximum stress criterion checks each stress component individually: $| \sigma _ { 1 } | \geq X$ or $| \sigma _ { 2 } | \geq Y$ or $| \tau _ { 1 2 } | \geq S$ .** The maximum stress criterion is the reason the engineer can check the failure of the composite, and the check is the reason the composite is safe.
- **The Tsai-Hill criterion accounts for the interaction between stress components: $( \sigma _ { 1 } / X ) ^ { 2 } - \sigma _ { 1 } \, \sigma _ { 2 } / X ^ { 2 } + ( \sigma _ { 2 } / Y ) ^ { 2 } + ( \tau _ { 1 2 } / S ) ^ { 2 } \geq 1$ .** The Tsai-Hill criterion is the reason the composite is designed for the interaction, not the individual stress.
- **The Tsai-Wu criterion accounts for the interaction and the tension/compression difference: $F _ { i } \, \sigma _ { i } + F _ { i j } \, \sigma _ { i } \, \sigma _ { j } \geq 1$ .** The Tsai-Wu criterion is the reason the composite is designed for the interaction, not the individual stress.
- **The delamination is the interlaminar failure, and the delamination is the reason the composite is designed for the interlaminar strength, not the in-plane strength.** The delamination is the most critical failure mode in the composite.
- **The interlaminar shear strength is $\tau _ { \text{ILSS } } = 3 \, P / ( 4 \, b \, h )$ , and the mode I fracture toughness is $G _ { I C } = 3 \, P \, \delta / ( 2 \, b \, a )$ .** The interlaminar strength is the reason the composite is designed for the interlaminar strength, not the in-plane strength.
- **The composite mechanics is the most important theory in aerospace engineering, because the composite mechanics predicts the stress and the strain in each ply.** The prediction is the reason the engineer can design the composite structure to be safe.
- **The quasi-isotropic laminate is the reason the composite is designed for the isotropic behaviour, not the anisotropic behaviour.** The quasi-isotropic laminate is the most widely used laminate in the aircraft.
:::

## Further reading

- **R.M. Jones (1999)** — *Mechanics of Composite Materials*, 2nd ed. Taylor & Francis. The constitutive equations, the classical lamination theory, and the failure criteria.
- **C.T. Sun and R.S. Vaidya (1996)** — *Prediction of Composite Material Properties from Constituent Properties*. CRC Press. The micromechanics and the classical lamination theory.
- **Z.P. Bažant and J. Cedolin (2010)** — *Plate and Shell Structures: Advanced Theory and Analysis*. Springer. The composite plate theory.
- **Megson, T.H.G. (2019)** — *Aircraft Structures for Engineering Students*, 6th ed. Butterworth-Heinemann. The composite mechanics in the aircraft context.
- **O.C. Zienkiewicz and R.L. Taylor (2005)** — *The Finite Element Method*, 6th ed. Butterworth-Heinemann. The composite mechanics in the finite element context.
- **L.E. Malvern (1969)** — *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall. The composite mechanics and the anisotropic elasticity.
- **SC Mal and G. Singh (1991)** — *Continuum Mechanics of Composite Materials*. Kluwer. The composite mechanics and the classical lamination theory.
- **Thomas J.R. Hughes (2012)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The composite mechanics in the finite element context.
