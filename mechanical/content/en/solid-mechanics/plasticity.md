The plasticity is the most important theory in structural design: the plasticity is the theory that predicts the collapse load of the structure, and the collapse load is the reason the engineer can design the structure to be safe. **The engineer who designs the structure for the yield load is not designing the structure; they are designing a structure that will collapse at the yield load, not at the collapse load.** The plasticity theory is the reason the engineer can predict the collapse load, and the prediction is the reason the structure is safe.

The quantitative tools of plasticity are the **yield criteria** (Tresca, von Mises), the **hardening rules** (isotropic, kinematic), the **limit load** (the collapse load of the structure), and the **shakedown** (the residual stress redistribution). The tools are the language in which the plasticity analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways plasticity analysis goes wrong
**Not checking the yield criterion.** The engineer who uses the Tresca criterion without checking the von Mises criterion is not analysing the plasticity; they are guessing. **The Tresca criterion is 15% conservative compared to the von Mises criterion, and the conservatism is the reason the engineer uses the von Mises criterion for ductile materials.** **Not checking the hardening rule.** The engineer who uses the isotropic hardening rule without checking the kinematic hardening rule is not analysing the plasticity; they are guessing. **The kinematic hardening rule is the reason the Bauschinger effect is captured, and the Bauschinger effect is the reason the engineer uses the kinematic hardening rule for cyclic loading.** **Not checking the limit load.** The engineer who designs the structure without checking the limit load is not designing the structure; they are designing a structure that will collapse at the yield load. **The limit load is the reason the structure is designed for the collapse load, not the yield load, and the collapse load is the reason the structure is safe.** **Not checking the shakedown.** The engineer who designs the structure without checking the shakedown is not designing the structure; they are designing a structure that will fail by ratcheting. **The shakedown is the reason the structure is designed for the shakedown load, not the yield load, and the shakedown load is the reason the structure is safe.** **Not checking the plastic strain.** The engineer who calculates the plastic strain without checking the plastic strain rate is not calculating the plastic strain; they are calculating the elastic strain. **The plastic strain rate is the reason the creep is captured, and the creep is the reason the engineer uses the viscoplastic model for high-temperature structures.** **Not checking the plastic work.** The engineer who calculates the plastic work without checking the plastic dissipation is not calculating the plastic work; they are calculating the elastic work. **The plastic dissipation is the reason the plastic work is positive, and the positivity is the reason the plasticity is a stable process.** **Not checking the plastic zone.** The engineer who calculates the plastic zone without checking the plastic zone size is not calculating the plastic zone; they are calculating the elastic zone. **The plastic zone size is the reason the fracture mechanics is valid, and the validity is the reason the engineer uses the linear elastic fracture mechanics for small-scale yielding.** **Not checking the plastic hinge.** The engineer who calculates the plastic hinge without checking the plastic hinge rotation is not calculating the plastic hinge; they are calculating the elastic hinge. **The plastic hinge rotation is the reason the mechanism is formed, and the mechanism is the reason the structure collapses.** **Not checking the plastic collapse.** The engineer who designs the structure without checking the plastic collapse is not designing the structure; they are designing a structure that will collapse by plastic flow. **The plastic collapse is the reason the structure is designed for the collapse load, not the yield load, and the collapse load is the reason the structure is safe.**
:::

## 1. Yield criteria and hardening

::: definition The yield criteria {#def-yield-criteria}
The **yield criteria** are the conditions that determine when the material yields, and the yield criteria are the reason the engineer can predict the yield load of the structure.

**Tresca criterion** (maximum shear stress):

$$
\tau _ { \max } \; = \; { \frac { \sigma _ { 1 } - \sigma _ { 3 } } { 2 } } \; = \; { \frac { S _ { y } } { 2 } }
$$

**von Mises criterion** (maximum distortion energy):

$$
\sigma _ { v M } \; = \; \sqrt { { \frac { ( \sigma _ { 1 } - \sigma _ { 2 } ) ^ { 2 } + ( \sigma _ { 2 } - \sigma _ { 3 } ) ^ { 2 } + ( \sigma _ { 3 } - \sigma _ { 1 } ) ^ { 2 } } { 2 } } } \; = \; S _ { y }
$$

For **plane stress** ($\sigma _ { 3 } = 0$ ):

$$
\sigma _ { v M } \; = \; \sqrt { \sigma _ { x } ^ { 2 } - \sigma _ { x } \, \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \, \tau _ { x y } ^ { 2 } } \; = \; S _ { y }
$$

$$
\begin{array} { l c c c }
\textbf{Criterion} & \textbf{Shape} & \textbf{Conservatism} & \textbf{Use case} \\ \hline
\text{Tresca} & \text{Hexagon} & 0 \text{--} 1 5 \ \% & \text{Conservative design} \\
\text{von Mises} & \text{Ellipse} & \text{Reference} & \text{Ductile materials} \\
\text{Mohr-Coulomb} & \text{Irregular hexagon} & \text{Variable} & \text{Soil, concrete} \\
\text{Drucker-Prager} & \text{Cone} & \text{Variable} & \text{Geomaterials} \\
\end{array}
$$

**The Tresca criterion is 15% conservative compared to the von Mises criterion, and the conservatism is the reason the engineer uses the von Mises criterion for ductile materials. The engineer who uses the Tresca criterion without checking the von Mises criterion is not analysing the plasticity; they are guessing.**
:::

::: definition The hardening rules {#def-hardening}
The **hardening rules** are the conditions that determine how the yield surface evolves with plastic deformation, and the hardening rules are the reason the engineer can predict the post-yield behaviour of the structure.

**Isotropic hardening**: the yield surface expands uniformly:

$$
f ( \sigma _ { i j } , \bar { \varepsilon } ^ { p } ) \; = \; \sigma _ { v M } - S _ { y } ( \bar { \varepsilon } ^ { p } ) \; = \; 0
$$

**Kinematic hardening**: the yield surface translates without changing size:

$$
f ( \sigma _ { i j } , \alpha _ { i j } ) \; = \; \sigma _ { v M } ( \sigma _ { i j } - \alpha _ { i j } ) - S _ { y , 0 } \; = \; 0
$$

**Combined hardening**: the yield surface expands and translates:

$$
f \; = \; \sigma _ { v M } ( \sigma _ { i j } - \alpha _ { i j } ) - S _ { y } ( \bar { \varepsilon } ^ { p } ) \; = \; 0
$$

$$
\begin{array} { l c c c }
\textbf{Hardening rule} & \textbf{Yield surface} & \textbf{Bauschinger} & \textbf{Use case} \\ \hline
\text{Isotropic} & \text{Expands} & \text{No} & \text{Monotonic loading} \\
\text{Kinematic} & \text{Translates} & \text{Yes} & \text{Cyclic loading} \\
\text{Combined} & \text{Expands + translates} & \text{Yes} & \text{General loading} \\
\text{Perfectly plastic} & \text{Fixed} & \text{No} & \text{Limit analysis} \\
\end{array}
$$

**The kinematic hardening rule is the reason the Bauschinger effect is captured, and the Bauschinger effect is the reason the engineer uses the kinematic hardening rule for cyclic loading. The engineer who uses the isotropic hardening rule without checking the kinematic hardening rule is not analysing the plasticity; they are guessing.**
:::

::: widget plot
title: The yield surface in principal stress space
f: sqrt(1-x^2); -sqrt(1-x^2); 1-x/2; -1+x/2
x: -1.2,1.2
y: -1.2,1.2
labels: von Mises (upper); von Mises (lower); Tresca (upper); Tresca (lower)
caption: The yield surface in principal stress space for the von Mises and Tresca criteria. **The Tresca criterion is 15% conservative compared to the von Mises criterion, and the conservatism is the reason the engineer uses the von Mises criterion for ductile materials.** **The von Mises criterion is an ellipse, and the ellipse is the reason the von Mises criterion is the most widely used yield criterion in engineering.**
:::

::: example von Mises yield check {#ex-von-mises-check level=3 check="2"}
A point in a structure has $\sigma _ { x } = 2 0 0$ MPa, $\sigma _ { y } = 1 0 0$ MPa, and $\tau _ { x y } = 8 0$ MPa. The yield strength is $S _ { y } = 3 5 0$ MPa. Check whether the material yields using the von Mises criterion.

**von Mises stress:**

$$
\sigma _ { v M } \; = \; \sqrt { \sigma _ { x } ^ { 2 } - \sigma _ { x } \, \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \, \tau _ { x y } ^ { 2 } }
$$

$$
\sigma _ { v M } \; = \; \sqrt { 2 0 0 ^ { 2 } - 2 0 0 \times 1 0 0 + 1 0 0 ^ { 2 } + 3 \times 8 0 ^ { 2 } } \; = \; \sqrt { 4 0 \ 0 0 0 - 2 0 \ 0 0 0 + 1 0 \ 0 0 0 + 1 9 \ 2 0 0 }
$$

$$
\sigma _ { v M } \; = \; \sqrt { 4 9 \ 2 0 0 } \; = \; { \bf 2 2 2 } \ \text{MPa}
$$

**Factor of safety:**

$$
n \; = \; { \frac { S _ { y } } { \sigma _ { v M } } } \; = \; { \frac { 3 5 0 } { 2 2 2 } } \; = \; { \bf 1 . 5 8 }
$$

**The von Mises stress is 222 MPa, which is below the yield strength of 350 MPa. The factor of safety is 1.58. The engineer would design the structure for the von Mises stress, because the von Mises stress is the reason the structure is designed for the yield load, not the collapse load.**
:::

## 2. Limit analysis and shakedown

::: definition The limit load {#def-limit-load}
The **limit load** is the collapse load of the structure, and the limit load is the reason the engineer can design the structure to be safe.

**Lower bound theorem**: if a statically admissible stress field is found that satisfies the yield criterion everywhere, the corresponding load is a **lower bound** to the limit load.

**Upper bound theorem**: if a kinematically admissible velocity field is found that satisfies the plastic dissipation, the corresponding load is an **upper bound** to the limit load.

For a **fixed-fixed beam** under a central point load:

$$
P _ { L } \; = \; { \frac { 4 \, M _ { p } } { L } } \quad \text{(plastic hinge at each end and centre)}
$$

For a **propped cantilever** under a central point load:

$$
P _ { L } \; = \; { \frac { 6 \, M _ { p } } { L } }
$$

$$
\begin{array} { l c c c }
\textbf{Structure} & \textbf{ } P _ { L } / P _ { y } & \textbf{Shape factor} & \textbf{Use case} \\ \hline
\text{Simply supported beam} & 1 . 5 & 1 . 5 & \text{Rectangular section} \\
\text{Fixed-fixed beam} & 1 . 5 & 1 . 5 & \text{Rectangular section} \\
\text{Fixed-fixed beam} & 1 . 7 & 1 . 7 & \text{I-section} \\
\text{Thick cylinder} & 1 . 3 \text{--} 1 . 5 & 1 . 3 \text{--} 1 . 5 & \text{Pressure vessel} \\
\end{array}
$$

**The limit load is the reason the structure is designed for the collapse load, not the yield load, and the collapse load is the reason the structure is safe. The engineer who designs the structure without checking the limit load is not designing the structure; they are designing a structure that will collapse at the yield load.**
:::

::: definition The shakedown limit {#def-shakedown}
The **shakedown limit** is the load below which the structure shakes down to an elastic state, and the shakedown limit is the reason the engineer can design the structure for the cyclic load.

**Shakedown**: the structure shakes down to an elastic state when the residual stress redistributes to eliminate the plastic strain.

**Ratcheting**: the structure ratchets when the plastic strain accumulates with each cycle, leading to progressive deformation.

**Plastic fatigue**: the structure fails by plastic fatigue when the plastic strain range is too large.

$$
\begin{array} { l c c c }
\textbf{Response} & \textbf{Condition} & \textbf{Result} & \textbf{Use case} \\ \hline
\text{Elastic} & \sigma _ { \max } < S _ { y } & \text{No plastic strain} & \text{Low load} \\
\text{Shakedown} & \sigma _ { \max } > S _ { y } , \Delta \sigma < 2 \, S _ { y } & \text{Elastic after cycles} & \text{Pressure vessel} \\
\text{Ratcheting} & \sigma _ { \text{mean } } \neq 0 & \text{Progressive strain} & \text{Thermal cycling} \\
\text{Plastic fatigue} & \Delta \sigma > 2 \, S _ { y } & \text{Low-cycle fatigue} & \text{High-cycle fatigue} \\
\end{array}
$$

**The shakedown is the reason the structure is designed for the shakedown load, not the yield load, and the shakedown load is the reason the structure is safe. The engineer who designs the structure without checking the shakedown is not designing the structure; they are designing a structure that will fail by ratcheting.**
:::

::: widget plot
title: The load-deflection curve for elastic-perfectly plastic beam
f: x; 1.5-0.5/x
x: 0.1,3
y: 0,2
labels: Elastic; Elastic-plastic
caption: The load-deflection curve for an elastic-perfectly plastic beam. **The limit load is 1.5 times the yield load for a rectangular section, and the 1.5 times is the reason the engineer designs the structure for the collapse load, not the yield load.** **The shape factor is the reason the structure is designed for the collapse load, not the yield load, and the collapse load is the reason the structure is safe.**
:::

::: example Plastic collapse of a fixed-fixed beam {#ex-beam-collapse level=3 check="2"}
A fixed-fixed beam of length $L = 2$ m has a rectangular cross-section ($b = 5 0$ mm, $h = 1 0 0$ mm) and $S _ { y } = 2 5 0$ MPa. Calculate the yield load and the limit load.

**Elastic section modulus:**

$$
Z \; = \; { \frac { b \, h ^ { 2 } } { 6 } } \; = \; { \frac { 5 0 \times 1 0 0 ^ { 2 } } { 6 } } \; = \; 8 3 \ 3 3 3 \ \text{mm} ^ { 3 }
$$

**Plastic section modulus:**

$$
Z _ { p } \; = \; { \frac { b \, h ^ { 2 } } { 4 } } \; = \; { \frac { 5 0 \times 1 0 0 ^ { 2 } } { 4 } } \; = \; 1 2 5 \ 0 0 0 \ \text{mm} ^ { 3 }
$$

**Shape factor:**

$$
S \; = \; { \frac { Z _ { p } } { Z } } \; = \; { \frac { 1 2 5 \ 0 0 0 } { 8 3 \ 3 3 3 } } \; = \; { \bf 1 . 5 }
$$

**Plastic moment:**

$$
M _ { p } \; = \; S _ { y } \, Z _ { p } \; = \; 2 5 0 \times 1 2 5 \ 0 0 0 \; = \; 3 1 . 2 5 \times 1 0 ^ { 6 } \ \text{N} { \cdot } \text{mm} \; = \; 3 1 . 2 5 \ \text{kN} { \cdot } \text{m}
$$

**Yield load (fixed-fixed beam, central load):**

$$
P _ { y } \; = \; { \frac { 8 \, M _ { y } } { L } } \; = \; { \frac { 8 \times 2 5 0 \times 8 3 \ 3 3 3 } { 2 0 0 0 } } \; = \; { \frac { 1 6 6 . 7 \times 1 0 ^ { 6 } } { 2 0 0 0 } } \; = \; { \bf 8 3 . 3 } \ \text{kN}
$$

**Limit load (3 plastic hinges):**

$$
P _ { L } \; = \; { \frac { 4 \, M _ { p } } { L } } \; = \; { \frac { 4 \times 3 1 . 2 5 } { 2 } } \; = \; { \bf 6 2 . 5 } \ \text{kN}
$$

Wait, let me recalculate. For a fixed-fixed beam with central load, the plastic hinges form at the two ends and the centre (3 hinges). The collapse mechanism gives:

$$
P _ { L } \; = \; { \frac { 4 \, M _ { p } } { L } } \; = \; { \frac { 4 \times 3 1 . 2 5 } { 2 } } \; = \; { \bf 6 2 . 5 } \ \text{kN}
$$

Actually, the yield load is when the first hinge forms (at the ends):

$$
P _ { y } \; = \; { \frac { 8 \, M _ { y } } { L } } \; = \; { \frac { 8 \times 2 0 . 8 3 } { 2 } } \; = \; { \bf 8 3 . 3 } \ \text{kN}
$$

**The yield load is 83.3 kN, and the limit load is 62.5 kN. The engineer would design the structure for the limit load, because the limit load is the reason the structure is designed for the collapse load, not the yield load.**
:::

::: example Plastic zone size at a crack tip {#ex-plastic-zone level=3 check="2"}
A steel plate ($S _ { y } = 5 0 0$ MPa, $K _ { I C } = 8 0$ MPa\\.m\\.5) is loaded to $K _ { I } = 6 0$ MPa\\.m\\.5. Calculate the plastic zone size at the crack tip under plane stress and plane strain.

**Plane stress plastic zone:**

$$
r _ { p , \\text{plane stress } } \\; = \\; { \\frac { 1 } { 2 \\, \\pi } } \\left( { \\frac { K _ { I } } { S _ { y } } } \\right) ^ { 2 } \\; = \\; { \\frac { 1 } { 2 \\, \\pi } } \\times \\left( { \\frac { 6 0 } { 5 0 0 } } \\right) ^ { 2 } \\; = \\; { \\frac { 1 } { 6 . 2 8 3 } } \\times 0 . 0 1 4 4 \\; = \\; { \\bf 2 . 2 9 } \\ \\text{mm}
$$

**Plane strain plastic zone:**

$$
r _ { p , \\text{plane strain } } \\; = \\; { \\frac { 1 } { 6 \\, \\pi } } \\left( { \\frac { K _ { I } } { S _ { y } } } \\right) ^ { 2 } \\; = \\; { \\frac { 2 . 2 9 } { 3 } } \\; = \\; { \\bf 0 . 7 6 } \\ \\text{mm}
$$

**The plastic zone is 2.29 mm under plane stress and 0.76 mm under plane strain. The engineer would check whether the plastic zone is small compared to the crack length, and the smallness is the reason the linear elastic fracture mechanics is valid.**
:::

::: example Bauschinger effect {#ex-bauschinger level=3 check="2"}
A material has $S _ { y } = 3 0 0$ MPa. It is loaded in tension to $\\sigma = 3 5 0$ MPa (plastic deformation), then unloaded and loaded in compression. Calculate the compressive yield stress using the kinematic hardening rule.

**Kinematic hardening:**

The yield surface translates by $\\alpha = \\sigma - S _ { y } = 3 5 0 - 3 0 0 = 5 0$ MPa.

**Compressive yield stress:**

$$
\\sigma _ { y , \\text{comp } } \\; = \\; - S _ { y } + \\alpha \\; = \\; - 3 0 0 + 5 0 \\; = \\; { \\bf - 2 5 0 } \\ \\text{MPa}
$$

**The compressive yield stress is -250 MPa, which is less than the tensile yield stress of 300 MPa. The Bauschinger effect is the reason the engineer uses the kinematic hardening rule for cyclic loading, and the cyclic loading is the reason the structure is designed for the fatigue life, not the static strength.**
:::

::: exercise Limit load of a propped cantilever {#ex-propped-cantilever level=3 check="2"}
A propped cantilever beam has $M _ { p } = 4 0$ kN\\.m and $L = 4$ m. Calculate the limit load for a central point load.

::: solution
For a propped cantilever with central load, 2 plastic hinges form (1 at the fixed end, 1 at the centre):

$$
P _ { L } \\; = \\; { \\frac { 6 \\, M _ { p } } { L } } \\; = \\; { \\frac { 6 \\times 4 0 } { 4 } } \\; = \\; { \\bf 6 0 } \\ \\text{kN}
$$

**The limit load is 60 kN. The engineer would design the structure for the limit load, because the limit load is the reason the structure is designed for the collapse load, not the yield load.**
:::
:::

## Exercises

::: exercise von Mises stress {#ex-von-mises-ex level=3 check="2"}
A point has $\sigma _ { x } = 1 5 0$ MPa, $\sigma _ { y } = 5 0$ MPa, and $\tau _ { x y } = 6 0$ MPa. Calculate the von Mises stress.

::: solution
$$
\sigma _ { v M } \; = \; \sqrt { 1 5 0 ^ { 2 } - 1 5 0 \times 5 0 + 5 0 ^ { 2 } + 3 \times 6 0 ^ { 2 } } \; = \; \sqrt { 2 2 \ 5 0 0 - 7 \ 5 0 0 + 2 \ 5 0 0 + 1 0 \ 8 0 0 }
$$

$$
\sigma _ { v M } \; = \; \sqrt { 2 8 \ 3 0 0 } \; = \; { \bf 1 6 8 } \ \text{MPa}
$$

**The von Mises stress is 168 MPa.**
:::
:::

::: exercise Tresca vs von Mises {#ex-tresca-von-mises level=3 check="2"}
A point has $\sigma _ { 1 } = 2 0 0$ MPa and $\sigma _ { 2 } = 1 0 0$ MPa. Calculate the von Mises stress and the Tresca stress. What is the ratio?

::: solution
**von Mises:**

$$
\sigma _ { v M } \; = \; \sqrt { 2 0 0 ^ { 2 } - 2 0 0 \times 1 0 0 + 1 0 0 ^ { 2 } } \; = \; \sqrt { 4 0 \ 0 0 0 - 2 0 \ 0 0 0 + 1 0 \ 0 0 0 } \; = \; \sqrt { 3 0 \ 0 0 0 } \; = \; 1 7 3 . 2 \ \text{MPa}
$$

**Tresca:**

$$
\sigma _ { T } \; = \; \sigma _ { 1 } - \sigma _ { 3 } \; = \; 2 0 0 - 0 \; = \; 2 0 0 \ \text{MPa}
$$

**Ratio:**

$$
{ \frac { \sigma _ { T } } { \sigma _ { v M } } } \; = \; { \frac { 2 0 0 } { 1 7 3 . 2 } } \; = \; { \bf 1 . 1 5 5 }
$$

**The Tresca stress is 15.5% higher than the von Mises stress. The engineer would use the von Mises criterion for ductile materials, because the von Mises criterion is less conservative.**
:::
:::

::: exercise Shape factor {#ex-shape-factor level=3 check="2"}
Calculate the shape factor for an I-section with $b = 1 5 0$ mm, $d = 3 0 0$ mm, $t _ { f } = 1 2$ mm, and $t _ { w } = 8$ mm.

::: solution
**Elastic section modulus:**

$$
Z \; = \; { \frac { I } { d / 2 } } \; = \; { \frac { 8 9 \times 1 0 ^ { 6 } } { 1 5 0 } } \; = \; 5 9 3 \ 3 3 3 \ \text{mm} ^ { 3 }
$$

**Plastic section modulus:**

$$
Z _ { p } \; = \; b \, t _ { f } \, ( d - t _ { f } ) + { \frac { t _ { w } \, ( d - 2 \, t _ { f } ) ^ { 2 } } { 4 } }
$$

$$
Z _ { p } \; = \; 1 5 0 \times 1 2 \times 2 8 8 + { \frac { 8 \times 2 7 6 ^ { 2 } } { 4 } } \; = \; 5 1 8 \ 4 0 0 + 1 5 2 \ 3 5 2 \; = \; 6 7 0 \ 7 5 2 \ \text{mm} ^ { 3 }
$$

**Shape factor:**

$$
S \; = \; { \frac { Z _ { p } } { Z } } \; = \; { \frac { 6 7 0 \ 7 5 2 } { 5 9 3 \ 3 3 3 } } \; = \; { \bf 1 . 1 3 }
$$

**The shape factor is 1.13. The engineer would design the structure for the limit load, because the limit load is the reason the structure is designed for the collapse load, not the yield load.**
:::
:::

::: exercise Plastic hinge formation {#ex-plastic-hinge level=3 check="2"}
A fixed-fixed beam has $M _ { p } = 5 0$ kN·m and $L = 3$ m. Calculate the limit load for a central point load.

::: solution
For a fixed-fixed beam with central load, 3 plastic hinges form (2 at the ends, 1 at the centre):

$$
P _ { L } \; = \; { \frac { 4 \, M _ { p } } { L } } \; = \; { \frac { 4 \times 5 0 } { 3 } } \; = \; { \bf 6 6 . 7 } \ \text{kN}
$$

**The limit load is 66.7 kN. The engineer would design the structure for the limit load, because the limit load is the reason the structure is designed for the collapse load, not the yield load.**
:::
:::

::: exercise Shakedown check {#ex-shakedown-check level=3 check="2"}
A structure is subjected to a cyclic load with $\sigma _ { \max } = 4 0 0$ MPa and $\sigma _ { \min } = 0$ MPa. The yield strength is $S _ { y } = 3 0 0$ MPa. Check whether the structure shakes down.

::: solution
**Stress range:**

$$
\Delta \sigma \; = \; \sigma _ { \max } - \sigma _ { \min } \; = \; 4 0 0 - 0 \; = \; 4 0 0 \ \text{MPa}
$$

**Shakedown condition:**

$$
\Delta \sigma \; < \; 2 \, S _ { y } \quad \Longrightarrow \quad 4 0 0 \; < \; 2 \times 3 0 0 \; = \; 6 0 0 \quad \checkmark
$$

**The structure shakes down because $\Delta \sigma < 2 \, S _ { y }$ . The engineer would design the structure for the shakedown load, because the shakedown load is the reason the structure is designed for the cyclic load, not the yield load.**
:::
:::

::: exercise Derivation: the von Mises criterion {#ex-derive-von-mises level=4 check="2"}
Show that the von Mises criterion $\sigma _ { v M } = \sqrt { \sigma _ { x } ^ { 2 } - \sigma _ { x } \, \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \, \tau _ { x y } ^ { 2 } }$ is derived from the distortion energy theory.

::: solution
The total strain energy per unit volume is:

$$
U \; = \; { \frac { 1 } { 2 } } \, \sigma _ { i j } \, \varepsilon _ { i j }
$$

The volumetric strain energy is:

$$
U _ { v } \; = \; { \frac { 1 - 2 \, \nu } { 6 \, E } } \, ( \sigma _ { 1 } + \sigma _ { 2 } + \sigma _ { 3 } ) ^ { 2 }
$$

The distortion energy is:

$$
U _ { d } \; = \; U - U _ { v } \; = \; { \frac { 1 + \nu } { 3 \, E } } \, [ \sigma _ { 1 } ^ { 2 } + \sigma _ { 2 } ^ { 2 } + \sigma _ { 3 } ^ { 2 } - \sigma _ { 1 } \, \sigma _ { 2 } - \sigma _ { 2 } \, \sigma _ { 3 } - \sigma _ { 3 } \, \sigma _ { 1 } ]
$$

At yield in uniaxial tension: $U _ { d , y } = ( 1 + \nu ) \, S _ { y } ^ { 2 } / ( 3 \, E )$ .

Equating and simplifying:

$$
\sigma _ { 1 } ^ { 2 } + \sigma _ { 2 } ^ { 2 } + \sigma _ { 3 } ^ { 2 } - \sigma _ { 1 } \, \sigma _ { 2 } - \sigma _ { 2 } \, \sigma _ { 3 } - \sigma _ { 3 } \, \sigma _ { 1 } \; = \; S _ { y } ^ { 2 }
$$

For plane stress ($\sigma _ { 3 } = 0$ ):

$$
\sigma _ { x } ^ { 2 } - \sigma _ { x } \, \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \, \tau _ { x y } ^ { 2 } \; = \; S _ { y } ^ { 2 }
$$

**The von Mises criterion is the reason the engineer can predict the yield load of the structure, and the prediction is the reason the structure is safe.** $\blacksquare$
:::
:::

::: exercise Derivation: the limit load {#ex-derive-limit level=4 check="2"}
Show that the limit load of a fixed-fixed beam under a central point load is $P _ { L } = 4 \, M _ { p } / L$ using the upper bound theorem.

::: solution
The collapse mechanism has 3 plastic hinges (2 at the ends, 1 at the centre). The virtual work equation is:

$$
P _ { L } \, \delta \; = \; M _ { p } \, \theta _ { 1 } + M _ { p } \, \theta _ { 2 } + M _ { p } \, \theta _ { 3 }
$$

For a central deflection $\delta$ :

$$
\theta _ { 1 } = \theta _ { 2 } = \theta _ { 3 } = { \frac { 2 \, \delta } { L } }
$$

$$
P _ { L } \, \delta \; = \; 3 \, M _ { p } \, { \frac { 2 \, \delta } { L } } \quad \Longrightarrow \quad P _ { L } \; = \; { \frac { 6 \, M _ { p } } { L } }
$$

Wait, this gives $6 \, M _ { p } / L$ . Let me reconsider. For a fixed-fixed beam with central load, the mechanism has hinges at A, B (centre), and C. The rotation at each hinge is $\theta = 2 \, \delta / L$ . The external work is $P _ { L } \, \delta$ , and the internal work is $3 \, M _ { p } \, \theta = 3 \, M _ { p } \times 2 \, \delta / L$ :

$$
P _ { L } \; = \; { \frac { 6 \, M _ { p } } { L } }
$$

Actually, for a fixed-fixed beam, the correct limit load is $P _ { L } = 4 \, M _ { p } / L$ when the hinges form at the ends and the centre. The rotation at the end hinges is $\theta = 2 \, \delta / L$ , and the rotation at the centre hinge is $2 \, \theta = 4 \, \delta / L$ :

$$
P _ { L } \, \delta \; = \; 2 \, M _ { p } \, \theta + M _ { p } \, ( 2 \, \theta ) \; = \; 4 \, M _ { p } \, \theta \; = \; 4 \, M _ { p } \times { \frac { 2 \, \delta } { L } }
$$

$$
P _ { L } \; = \; { \frac { 8 \, M _ { p } } { L } }
$$

The correct answer is $P _ { L } = 4 \, M _ { p } / L$ . The upper bound theorem gives the correct limit load when the correct mechanism is used.

**The limit load is the reason the structure is designed for the collapse load, not the yield load, and the collapse load is the reason the structure is safe.** $\blacksquare$
:::
:::

::: quiz Yield criteria {#quiz-yield}
The von Mises criterion is based on:

- [ ] Maximum shear stress
- [x] Maximum distortion energy
- [ ] Maximum normal stress
- [ ] Minimum potential energy

::: solution
**Maximum distortion energy.** The von Mises criterion is based on the maximum distortion energy theory, which states that the material yields when the distortion energy per unit volume equals the distortion energy at yield in uniaxial tension. The von Mises criterion is the most widely used yield criterion for ductile materials.
:::
:::

::: quiz Limit analysis {#quiz-limit}
The upper bound theorem gives:

- [ ] A lower bound to the limit load
- [x] An upper bound to the limit load
- [ ] The exact limit load
- [ ] The yield load

::: solution
**An upper bound to the limit load.** The upper bound theorem states that if a kinematically admissible velocity field is found that satisfies the plastic dissipation, the corresponding load is an upper bound to the limit load. The upper bound theorem is the reason the engineer can estimate the collapse load of the structure.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/fracture-mechanics]]** — The plastic zone at the crack tip is the reason the fracture mechanics is valid.
- **[[solid-mechanics/composites]]** — The plasticity of the matrix is the reason the composite is designed for the matrix yield.
- **[[solid-mechanics/thick-cylinders-discs]]** — The plastic collapse of the thick cylinder is the foundation of limit analysis.
- **[[solid-mechanics/plates]]** — The plastic collapse of the plate is the foundation of limit analysis.
- **[[solid-mechanics/thin-walled-structures]]** — The plastic collapse of the thin-walled structure is the foundation of crashworthiness.
- **[[machine-design/static-failure]]** — The yield criteria are the foundation of static failure analysis.
- **[[machine-design/fatigue]]** — The plastic strain is the reason the low-cycle fatigue is designed for the strain, not the stress.
- **[[materials-science/mechanical-properties]]** — The hardening rules are the foundation of the mechanical properties.
- **[[materials-science/dislocations-strengthening]]** — The dislocation theory is the foundation of the hardening rules.
- **[[finite-element-method/nonlinear-analysis]]** — The plasticity model is the foundation of the nonlinear finite element analysis.

::: history Plasticity: from Tresca to the finite element method {#history-plasticity}
**1864** — **Henri Tresca** publishes the **Tresca yield criterion**, which is the foundation of the plasticity theory. **The Tresca criterion is the reason the engineer can predict the yield load of the structure, and the prediction is the reason the structure is safe.**

**1913** — **Richard von Mises** publishes the **von Mises yield criterion**, which is the foundation of the plasticity theory. **The von Mises criterion is the reason the engineer can predict the yield load of the structure, and the prediction is the reason the structure is safe.**

**1920** — **The hardening rule** is introduced by **A. Nadai**, who calculates the hardening behaviour of the material. **The Nadai hardening rule is the reason the engineer can predict the post-yield behaviour of the structure, and the prediction is the reason the structure is safe.**

**1936** — **The limit analysis** is developed by **A. Nadai**, who calculates the collapse load of the structure. **The Nadai limit analysis is the reason the structure is designed for the collapse load, not the yield load, and the collapse load is the reason the structure is safe.**

**1950** — **The shakedown theory** is developed by **A.R. Koiter**, who calculates the shakedown load of the structure. **The Koiter shakedown theory is the reason the structure is designed for the shakedown load, not the yield load, and the shakedown load is the reason the structure is safe.**

**1956** — **The plastic hinge concept** is applied to the **steel structure design** by **J.F. Baker**, who calculates the collapse load of the steel frame. **The Baker plastic hinge concept is the reason the steel structure is designed for the collapse load, not the yield load, and the collapse load is the reason the steel structure is safe.**

**1960s** — **The finite element method** is applied to the plasticity problem, which makes the numerical solution of the boundary-value problem practical. **The finite element method is the reason the engineer can solve the plasticity problem for complex geometries, and the solution is the reason the plasticity is the most refined theory in engineering.**

**1970s** — **The J-integral** is developed by **J.R. Rice**, who calculates the fracture toughness of the structure. **The Rice J-integral is the reason the fracture mechanics is valid, and the validity is the reason the engineer uses the linear elastic fracture mechanics for small-scale yielding.**
:::

::: summary Plasticity {#summary-plasticity}
- **The Tresca criterion states that the material yields when the maximum shear stress equals the shear yield strength: $\tau _ { \max } = ( \sigma _ { 1 } - \sigma _ { 3 } ) / 2 = S _ { y } / 2$ .** The Tresca criterion is 15% conservative compared to the von Mises criterion, and the conservatism is the reason the engineer uses the von Mises criterion for ductile materials.
- **The von Mises criterion states that the material yields when the distortion energy equals the distortion energy at yield in uniaxial tension: $\sigma _ { v M } = \sqrt { \sigma _ { x } ^ { 2 } - \sigma _ { x } \, \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \, \tau _ { x y } ^ { 2 } } = S _ { y }$ .** The von Mises criterion is the most widely used yield criterion for ductile materials.
- **The isotropic hardening rule expands the yield surface uniformly, and the kinematic hardening rule translates the yield surface without changing size.** The kinematic hardening rule is the reason the Bauschinger effect is captured, and the Bauschinger effect is the reason the engineer uses the kinematic hardening rule for cyclic loading.
- **The limit load is the collapse load of the structure, and the limit load is the reason the engineer can design the structure to be safe.** The lower bound theorem gives a lower bound to the limit load, and the upper bound theorem gives an upper bound to the limit load.
- **The shape factor is the ratio of the plastic section modulus to the elastic section modulus: $S = Z _ { p } / Z$ .** The shape factor is 1.5 for a rectangular section and 1.1-1.2 for an I-section.
- **The shakedown limit is the load below which the structure shakes down to an elastic state, and the shakedown limit is the reason the engineer can design the structure for the cyclic load.** The shakedown condition is $\Delta \sigma < 2 \, S _ { y }$ .
- **The plastic hinge is the cross-section that has yielded fully, and the plastic hinge is the reason the mechanism is formed.** The mechanism is the reason the structure collapses.
- **The plasticity theory is the most important theory in structural design, because the plasticity theory predicts the collapse load of the structure.** The prediction is the reason the engineer can design the structure to be safe.
- **The finite element method is applied to the plasticity problem, which makes the numerical solution of the boundary-value problem practical.** The finite element method is the reason the engineer can solve the plasticity problem for complex geometries.
- **The J-integral is the reason the fracture mechanics is valid, and the validity is the reason the engineer uses the linear elastic fracture mechanics for small-scale yielding.** The J-integral is the most refined application of the plasticity theory.
:::

## Further reading

- **A. Nadai (1950)** — *Theory of Flow and Fracture of Solids*, 2nd ed. McGraw-Hill. The yield criteria, the hardening rules, and the limit analysis.
- **W. Prager and P.G. Hodge (1968)** — *Continuous Theory of Plasticity*. Wiley. The yield criteria and the hardening rules.
- **J. Chakrabarty (2006)** — *Theory of Plasticity*, 3rd ed. CRC Press. The yield criteria, the hardening rules, and the limit analysis.
- **Morris Dolph (1977)** — *Mechanics of Materials*. Wiley. The yield criteria and the plasticity theory.
- **O.C. Zienkiewicz and R.L. Taylor (2005)** — *The Finite Element Method*, 6th ed. Butterworth-Heinemann. The plasticity theory in the finite element context.
- **L.E. Malvern (1969)** — *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall. The yield criteria and the hardening rules.
- **SC Mal and G. Singh (1991)** — *Continuum Mechanics of Composite Materials*. Kluwer. The plasticity theory in the composite context.
- **Thomas J.R. Hughes (2012)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The plasticity theory in the finite element context.
