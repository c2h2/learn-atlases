The machine designer's first question is not "will it break?" but "when will it break, and how?" The component that is over-designed is expensive, heavy, and late to market; the component that is under-designed is dangerous, recalled, and litigated. The failure theories are the tools that answer the "when" and the "how" with a single number: the **factor of safety**, and the factor of safety is the ratio of the material's strength to the applied stress. **The factor of safety is not a margin of ignorance; it is a margin of knowledge: the engineer knows the load, the geometry, and the material, and the factor of safety accounts for what the engineer does not know: the load variation, the material scatter, the manufacturing defect, and the consequence of failure.**

The failure theories are divided into two families: the **ductile failure theories** (maximum shear stress / Tresca, maximum distortion energy / von Mises, maximum normal stress) and the **brittle failure theories** (maximum normal stress, Mohr-Coulomb). The ductile theories predict the yield, the permanent deformation that renders the component useless; the brittle theories predict the fracture, the sudden separation that renders the component a projectile. **The choice of the theory is not a matter of preference; it is a matter of the material's ductility: the material that elongates more than 5 % is ductile, and the material that elongates less than 5 % is brittle.**

::: warning Nine ways static failure analysis goes wrong
**Using the wrong failure theory.** The engineer who applies the von Mises theory to cast iron (a brittle material) or the maximum normal stress theory to mild steel (a ductile material) is not being conservative; they are being wrong. **The ductile material yields by shear (the slip planes slide), so the failure theory must be a shear theory (Tresca or von Mises). The brittle material fractures by tension (the atomic bonds pull apart), so the failure theory must be a normal stress theory (maximum normal stress or Mohr-Coulomb).** **Ignoring the stress concentration.** The engineer who calculates the nominal stress at the fillet and applies the yield strength is not designing the fillet; they are designing the nominal section. **The stress concentration factor $K _ { t }$ multiplies the nominal stress by 2–5, and the multiplication is the reason the fillet is the most common failure site in machine components.** **Using the ultimate strength instead of the yield strength for ductile materials.** The engineer who designs a shaft to the ultimate strength (not the yield strength) is designing a shaft that yields before it fractures, and the yield is a permanent deformation that renders the shaft useless. **For ductile materials, the design criterion is the yield strength, not the ultimate strength. For brittle materials, the design criterion is the ultimate strength, because the brittle material does not yield.** **Not accounting for the multiaxial stress state.** The engineer who compares the uniaxial yield strength with the uniaxial applied stress is not analysing the component; they are guessing. **The shaft in torsion and bending has a multiaxial stress state, and the multiaxial stress state requires the von Mises or Tresca criterion, not the uniaxial comparison.** **Not checking the bearing stress.** The engineer who designs the pin to the shear strength but does not check the bearing stress on the plate is designing a pin that punches through the plate. **The bearing stress is the contact pressure between the pin and the plate, and the bearing stress must be less than the material's compressive yield strength (or the ultimate strength for brittle materials).** **Not accounting for the load type.** The engineer who applies the static yield strength to a shock-loaded component is not designing for the shock; they are designing for the static equivalent. **The shock load requires the dynamic load factor (typically 1.5–3), and the dynamic load factor is the reason the shock-loaded component is 50–200 % larger than the statically loaded component.** **Not checking the deflection.** The engineer who designs the component to the strength criterion but does not check the deflection is designing a component that is strong but flexible. **The stiffness criterion (the maximum deflection, the maximum slope, the natural frequency) is often the governing criterion, and the governing criterion is the reason the component is sized by the stiffness, not the strength.** **Not accounting for the temperature.** The engineer who uses the room-temperature yield strength for a component operating at 500 °C is not designing for the temperature; they are designing for the room. **The yield strength at 500 °C is 50–70 % of the room-temperature yield strength, and the reduction is the reason the high-temperature component is 50–100 % larger than the room-temperature component.** **Not documenting the factor of safety.** The engineer who selects the factor of safety without documenting the rationale is not making a decision; they are making a guess. **The factor of safety must be documented with the rationale: the load uncertainty, the material scatter, the consequence of failure, and the standard's requirement, and the documentation is the reason the factor of safety is defensible in a design review and a court of law.**
:::

## 1. The failure theories for ductile materials

::: definition The factor of safety and the design criterion {#def-factor-safety}
The **factor of safety** (FoS, $n$) is the ratio of the material's strength to the applied stress:

$$
n \; = \; { \frac { \text{strength} } { \text{stress} } } \; = \; { \frac { S } { \sigma } }
$$

The **design criterion** is the condition that the factor of safety must satisfy:

$$
n \; \ge \; n _ { \text{design } }
$$

where $n _ { \text{design } }$ is the design factor of safety, selected from the standard, the customer's requirement, or the engineer's judgement.

$$
\begin{array} { l c l }
\textbf{Application} & \textbf{Typical } n & \textbf{Rationale} \\ \hline
\text{Aircraft structure} & 1 . 2 \text{--} 1 . 5 & \text{Weight is critical, loads are known, inspection is frequent} \\
\text{Machine component} & 1 . 5 \text{--} 2 . 5 & \text{Loads are known, material is consistent} \\
\text{Pressure vessel} & 3 . 5 \text{--} 4 & \text{Consequence of failure is severe, ASME code} \\
\text{Bridge, building} & 2 \text{--} 3 & \text{Consequence of failure is severe, loads are uncertain} \\
\text{Cranes, lifting equipment} & 4 \text{--} 5 & \text{Consequence of failure is fatal, dynamic loads} \\
\text{Biomedical implant} & 2 \text{--} 4 & \text{Consequence of failure is fatal, material scatter} \\
\end{array}
$$

**The factor of safety is not a margin of ignorance; it is a margin of knowledge. The engineer who selects $n = 2$ without documenting the rationale is not being conservative; they are being arbitrary. The rationale must address: the load uncertainty, the material scatter, the manufacturing defect, the consequence of failure, and the standard's requirement.**
:::

::: definition The maximum shear stress theory (Tresca) {#def-tresca}
The **maximum shear stress theory** (Tresca, Guest, 1864) states that the ductile material yields when the maximum shear stress in the component reaches the maximum shear stress at the yield point in a uniaxial tension test:

$$
\tau _ { \max } \; = \; { \frac { \sigma _ { 1 } - \sigma _ { 3 } } { 2 } } \; \ge \; { \frac { S _ { y } } { 2 } } \quad \Longrightarrow \quad \sigma _ { 1 } - \sigma _ { 3 } \; \ge \; S _ { y }
$$

where $\sigma _ { 1 }$ and $\sigma _ { 3 }$ are the maximum and minimum principal stresses.

The **Tresca equivalent stress** is:

$$
\sigma _ { \text{Tresca } } \; = \; \sigma _ { 1 } - \sigma _ { 3 }
$$

The **factor of safety** is:

$$
n \; = \; { \frac { S _ { y } } { \sigma _ { \text{Tresca } } } } \; = \; { \frac { S _ { y } } { \sigma _ { 1 } - \sigma _ { 3 } } }
$$

**The Tresca theory is conservative: it predicts the yield at a lower load than the von Mises theory, and the conservatism is the reason the Tresca theory is preferred in the pressure vessel code (ASME Section VIII) and the aircraft landing gear design.**
:::

::: definition The maximum distortion energy theory (von Mises) {#def-von-mises}
The **maximum distortion energy theory** (von Mises, Hencky, Huber, 1913) states that the ductile material yields when the distortion energy per unit volume in the component reaches the distortion energy per unit volume at the yield point in a uniaxial tension test:

$$
\sigma _ { \text{vM } } \; = \; { \sqrt { \sigma _ { x } ^ { 2 } - \sigma _ { x } \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \tau _ { x y } ^ { 2 } } } \; \ge \; S _ { y }
$$

For the general 3D stress state:

$$
\sigma _ { \text{vM } } \; = \; { \frac { 1 } { \sqrt { 2 } } } \, { \sqrt { ( \sigma _ { 1 } - \sigma _ { 2 } ) ^ { 2 } + ( \sigma _ { 2 } - \sigma _ { 3 } ) ^ { 2 } + ( \sigma _ { 3 } - \sigma _ { 1 } ) ^ { 2 } } }
$$

The **factor of safety** is:

$$
n \; = \; { \frac { S _ { y } } { \sigma _ { \text{vM } } } }
$$

**The von Mises theory is more accurate than the Tresca theory: the von Mises theory predicts the yield within 3 % of the experimental data for most ductile metals, while the Tresca theory is up to 15 % conservative. The von Mises theory is the default failure theory for ductile materials in machine design.**
:::

::: definition The Tresca vs von Mises comparison {#def-tresca-vs-von-mises}
The Tresca and von Mises theories differ in their prediction of the yield under multiaxial stress:

$$
\begin{array} { l c c c }
\textbf{Stress state} & \textbf{Tresca } \sigma _ { \text{eq } } & \textbf{von Mises } \sigma _ { \text{eq } } & \textbf{Difference} \\ \hline
\text{Uniaxial tension } ( \sigma , 0 , 0 ) & \sigma & \sigma & 0 \ \% \\
\text{Pure shear } ( 0 , 0 , \tau ) & 2 \tau & { \sqrt { 3 } } \tau = 1 . 7 3 \tau & 1 5 . 5 \ \% \\
\text{Equal biaxial } ( \sigma , \sigma , 0 ) & \sigma & \sigma & 0 \ \% \\
\text{Pure torsion } ( 0 , \tau , - \tau ) & 2 \tau & { \sqrt { 3 } } \tau & 1 5 . 5 \ \% \\
\text{Bending + torsion} & \text{varies} & \text{varies} & 0 \text{--} 1 5 . 5 \ \% \\
\end{array}
$$

**The maximum difference between the Tresca and von Mises theories is 15.5 %, and the difference occurs under pure shear. The 15.5 % is the reason the engineer who uses the Tresca theory instead of the von Mises theory is 15.5 % more conservative, and the conservatism is the reason the Tresca theory is preferred when the consequence of failure is severe.**
:::

::: widget plot
title: The Tresca vs von Mises yield criteria
f: sqrt(x^2 + 3*1); sqrt(x^2 - x*0 + 0 + 3*1)
x: -2,2
y: -2,2
labels: Tresca (hexagon); von Mises (ellipse)
caption: The Tresca and von Mises yield criteria in the principal stress plane $( \sigma _ { 1 } , \sigma _ { 2 } )$ for $S _ { y } = 1$ . **The Tresca criterion is a hexagon, and the von Mises criterion is an ellipse that circumscribes the hexagon. The ellipse is 15.5 % larger than the hexagon under pure shear, and the difference is the reason the Tresca theory is more conservative than the von Mises theory.** **The experimental data for ductile metals (steel, aluminium, copper) fall between the hexagon and the ellipse, closer to the ellipse, and the proximity is the reason the von Mises theory is more accurate than the Tresca theory.**
:::

::: example Shaft in bending and torsion {#ex-shaft-bending-torsion level=3 check="2"}
A shaft is subjected to a bending stress $\sigma _ { x } = 8 0$ MPa and a torsional shear stress $\tau _ { x y } = 5 0$ MPa. The material has a yield strength $S _ { y } = 4 0 0$ MPa. Calculate the factor of safety using the Tresca and von Mises theories.

**Principal stresses:**

$$
\sigma _ { 1 , 3 } \; = \; { \frac { \sigma _ { x } } { 2 } } \pm { \sqrt { \left( { \frac { \sigma _ { x } } { 2 } } \right) ^ { 2 } + \tau _ { x y } ^ { 2 } } } \; = \; 4 0 \pm { \sqrt { 1 6 0 0 + 2 5 0 0 } } \; = \; 4 0 \pm 6 4 . 0
$$

$$
\sigma _ { 1 } = 1 0 4 . 0 \ \text{MPa } , \quad \sigma _ { 3 } = - 2 4 . 0 \ \text{MPa}
$$

**Tresca:**

$$
\sigma _ { \text{Tresca } } \; = \; \sigma _ { 1 } - \sigma _ { 3 } \; = \; 1 0 4 . 0 - ( - 2 4 . 0 ) \; = \; 1 2 8 . 0 \ \text{MPa}
$$

$$
n _ { \text{Tresca } } \; = \; { \frac { 4 0 0 } { 1 2 8 . 0 } } \; = \; { \bf 3 . 1 3 }
$$

**von Mises:**

$$
\sigma _ { \text{vM } } \; = \; { \sqrt { 8 0 ^ { 2 } + 3 \times 5 0 ^ { 2 } } } \; = \; { \sqrt { 6 4 0 0 + 7 5 0 0 } } \; = \; { \sqrt { 1 3 9 0 0 } } \; = \; 1 1 7 . 9 \ \text{MPa}
$$

$$
n _ { \text{vM } } \; = \; { \frac { 4 0 0 } { 1 1 7 . 9 } } \; = \; { \bf 3 . 3 9 }
$$

**The von Mises factor of safety (3.39) is 8 % higher than the Tresca factor of safety (3.13), because the von Mises theory is less conservative than the Tresca theory. The 8 % is the reason the engineer who uses the von Mises theory instead of the Tresca theory saves 8 % of the material, and the saving is the reason the von Mises theory is the default in machine design.**
:::

::: example Pressure vessel {#ex-pressure-vessel level=3 check="3"}
A thin-walled cylindrical pressure vessel has an internal radius $r = 2 0 0$ mm, a wall thickness $t = 1 0$ mm, and an internal pressure $p = 5$ MPa. The material has a yield strength $S _ { y } = 3 5 0$ MPa. Calculate the factor of safety.

**Hoop and longitudinal stresses:**

$$
\sigma _ { \theta } \; = \; { \frac { p r } { t } } \; = \; { \frac { 5 \times 2 0 0 } { 1 0 } } \; = \; 1 0 0 \ \text{MPa}
$$

$$
\sigma _ { z } \; = \; { \frac { p r } { 2 t } } \; = \; { \frac { 5 \times 2 0 0 } { 2 \times 1 0 } } \; = \; 5 0 \ \text{MPa}
$$

**Principal stresses:** $\sigma _ { 1 } = 1 0 0$ MPa, $\sigma _ { 2 } = 5 0$ MPa, $\sigma _ { 3 } \approx 0$ (inner surface, $\sigma _ { r } \approx - p$ but $p \ll \sigma _ { \theta }$).

**Tresca:**

$$
\sigma _ { \text{Tresca } } \; = \; \sigma _ { 1 } - \sigma _ { 3 } \; = \; 1 0 0 - 0 \; = \; 1 0 0 \ \text{MPa}
$$

$$
n _ { \text{Tresca } } \; = \; { \frac { 3 5 0 } { 1 0 0 } } \; = \; { \bf 3 . 5 }
$$

**von Mises:**

$$
\sigma _ { \text{vM } } \; = \; { \sqrt { 1 0 0 ^ { 2 } - 1 0 0 \times 5 0 + 5 0 ^ { 2 } } } \; = \; { \sqrt { 1 0 0 0 0 - 5 0 0 0 + 2 5 0 0 } } \; = \; { \sqrt { 7 5 0 0 } } \; = \; 8 6 . 6 \ \text{MPa}
$$

$$
n _ { \text{vM } } \; = \; { \frac { 3 5 0 } { 8 6 . 6 } } \; = \; { \bf 4 . 0 4 }
$$

**The ASME pressure vessel code requires $n \ge 3 . 5$ (based on the ultimate strength, not the yield strength). The Tresca factor of safety (3.5) meets the ASME requirement, and the von Mises factor of safety (4.04) exceeds it. The ASME code uses the Tresca theory because the Tresca theory is more conservative, and the conservatism is the reason the pressure vessel is safe.**
:::

## 2. The failure theories for brittle materials

::: definition The maximum normal stress theory {#def-max-normal-stress}
The **maximum normal stress theory** states that the brittle material fractures when the maximum normal stress in the component reaches the ultimate tensile strength:

$$
\sigma _ { 1 } \; \ge \; S _ { u t } \quad \text{(tension)} \qquad \sigma _ { 3 } \; \le \; - S _ { u c } \quad \text{(compression)}
$$

where $S _ { u t }$ is the ultimate tensile strength and $S _ { u c }$ is the ultimate compressive strength.

**The maximum normal stress theory is the simplest failure theory, and the simplicity is the reason the theory is used for brittle materials (cast iron, concrete, glass, ceramics) where the fracture is governed by the maximum tensile stress.**
:::

::: definition The Mohr-Coulomb theory {#def-mohr-coulomb}
The **Mohr-Coulomb theory** (internal friction theory) extends the maximum normal stress theory to the case where the tensile and compressive strengths are different ($S _ { u t } \ne S _ { u c }$), which is typical of brittle materials:

$$
{ \frac { \sigma _ { 1 } } { S _ { u t } } } - { \frac { \sigma _ { 3 } } { S _ { u c } } } \; \ge \; 1 \quad \text{(for } \sigma _ { 1 } > 0 , \; \sigma _ { 3 } < 0 \text{)}
$$

The **factor of safety** is:

$$
n \; = \; { \frac { 1 } { { \dfrac { \sigma _ { 1 } } { S _ { u t } } } - { \dfrac { \sigma _ { 3 } } { S _ { u c } } } } }
$$

$$
\begin{array} { l c c }
\textbf{Material} & \textbf{ } S _ { u t } \textbf{ (MPa)} & \textbf{ } S _ { u c } \textbf{ (MPa)} \\ \hline
\text{Cast iron (gray)} & 2 0 0 & 6 0 0 \\
\text{Concrete (C30)} & 3 & 3 0 \\
\text{Granite} & 1 5 & 2 0 0 \\
\text{Glass} & 4 0 & 1 0 0 0 \\
\text{Aluminium alloy (7075-T6)} & 5 0 3 & 5 0 3 \text{ (} S _ { u t } \approx S _ { u c } \text{)} \\
\end{array}
$$

**The Mohr-Coulomb theory is the correct theory for brittle materials where $S _ { u c } \gg S _ { u t }$ (cast iron, concrete, rock). The theory reduces to the maximum normal stress theory when $S _ { u t } = S _ { u c }$ (ductile materials).**
:::

::: widget plot
title: The Mohr-Coulomb failure envelope
f: 1; 1; -1; -1
x: -3,3
y: -3,3
labels: Tension; Compression; Shear; Shear
caption: The Mohr-Coulomb failure envelope in the principal stress plane $( \sigma _ { 1 } , \sigma _ { 3 } )$ for a brittle material with $S _ { u t } = 1$ and $S _ { u c } = 3$ . **The envelope is asymmetric: the compressive strength is 3× the tensile strength, and the asymmetry is the reason the brittle material is strong in compression and weak in tension.** **The Mohr-Coulomb envelope is a straight line in the $( \sigma _ { 1 } , \sigma _ { 3 } )$ plane, and the straight line is the reason the Mohr-Coulomb theory is simple to apply.**
:::

::: example Brittle material under combined loading {#ex-brittle-combined level=3 check="2"}
A cast iron component has principal stresses $\sigma _ { 1 } = 6 0$ MPa and $\sigma _ { 3 } = - 2 0$ MPa. The material has $S _ { u t } = 2 0 0$ MPa and $S _ { u c } = 6 0 0$ MPa. Calculate the factor of safety using the Mohr-Coulomb theory.

$$
n \; = \; { \frac { 1 } { { \dfrac { \sigma _ { 1 } } { S _ { u t } } } - { \dfrac { \sigma _ { 3 } } { S _ { u c } } } } } \; = \; { \frac { 1 } { { \dfrac { 6 0 } { 2 0 0 } } - { \dfrac { - 2 0 } { 6 0 0 } } } } \; = \; { \frac { 1 } { 0 . 3 0 + 0 . 0 3 3 } } \; = \; { \frac { 1 } { 0 . 3 3 3 } } \; = \; { \bf 3 . 0 }
$$

**The factor of safety is 3.0. If the engineer had used the maximum normal stress theory (ignoring the compressive stress), the factor of safety would be $n = 2 0 0 / 6 0 = 3 . 3 3$ , which is 11 % higher. The 11 % is the reason the Mohr-Coulomb theory is more accurate than the maximum normal stress theory for brittle materials under combined tension and compression.**
:::

## 3. Stress concentration

::: definition The stress concentration factor {#def-stress-concentration}
The **stress concentration factor** ($K _ { t }$) is the ratio of the maximum local stress at the geometric discontinuity to the nominal stress in the absence of the discontinuity:

$$
K _ { t } \; = \; { \frac { \sigma _ { \max } } { \sigma _ { \text{nom } } } }
$$

The stress concentration factor depends on the geometry of the discontinuity (the fillet radius, the hole diameter, the notch depth) and the type of loading (axial, bending, torsion):

$$
\begin{array} { l c c c }
\textbf{Discontinuity} & \textbf{Loading} & \textbf{Typical } K _ { t } & \textbf{Formula} \\ \hline
\text{Transverse hole in plate} & \text{Tension} & 2 . 5 \text{--} 3 . 0 & K _ { t } \approx 3 - 3 . 1 4 ( d / W ) + \ldots \\
\text{Fillet (shoulder)} & \text{Bending} & 1 . 5 \text{--} 3 . 0 & K _ { t } = f ( r / D , d / D ) \\
\text{Fillet (shoulder)} & \text{Torsion} & 1 . 2 \text{--} 2 . 0 & K _ { t } = f ( r / D , d / D ) \\
\text{U-shaped notch} & \text{Tension} & 2 . 0 \text{--} 6 . 0 & K _ { t } \approx 1 + 2 ( a / \rho ) ^ { 1 / 2 } \\
\text{Thread root} & \text{Tension} & 2 . 5 \text{--} 4 . 0 & K _ { t } \approx 3 \text{ (sharp thread)} \\
\text{Keyway} & \text{Torsion} & 1 . 5 \text{--} 2 . 5 & K _ { t } \approx 2 \text{ (end-milled keyway)} \\
\text{Snap ring groove} & \text{Bending} & 2 . 0 \text{--} 3 . 5 & K _ { t } \approx 2 . 5 \\
\end{array}
$$

**The stress concentration factor is the most important factor in machine design, because the stress concentration is the reason the component fails at the fillet, the hole, the thread, and the keyway, not at the nominal section. The engineer who designs the nominal section to the yield strength but ignores the stress concentration is designing a component that fails at the discontinuity.**
:::

::: definition The stress concentration factor for a fillet {#def-fillet-kt}
The **fillet stress concentration factor** is the most common stress concentration in machine design, because the shaft shoulder, the gear tooth root, and the bracket fillet are the most common geometric discontinuities.

The fillet $K _ { t }$ is a function of the geometry ratios $r / d$ (fillet radius to small diameter) and $D / d$ (large diameter to small diameter):

$$
K _ { t } \; = \; f \! \left( { \frac { r } { d } } , \; { \frac { D } { d } } \right)
$$

$$
\begin{array} { l c c c c }
\textbf{Loading} & \textbf{ } r / d = 0 . 0 2 & \textbf{ } r / d = 0 . 0 5 & \textbf{ } r / d = 0 . 1 & \textbf{ } r / d = 0 . 2 \\ \hline
\text{Axial} & 2 . 5 & 2 . 0 & 1 . 7 & 1 . 5 \\
\text{Bending} & 2 . 1 & 1 . 7 & 1 . 5 & 1 . 3 \\
\text{Torsion} & 1 . 6 & 1 . 4 & 1 . 3 & 1 . 2 \\
\end{array}
$$

**The fillet $K _ { t }$ decreases with increasing fillet radius, and the decrease is the reason the fillet radius is the most important design parameter in shaft design. The engineer who increases the fillet radius from 1 mm to 3 mm reduces the $K _ { t }$ from 2.5 to 1.7, a 32 % reduction in the peak stress, and the reduction is the reason the fillet radius is the first parameter optimised in the shaft design.**
:::

::: example Stress concentration at a shaft shoulder {#ex-shaft-shoulder level=3 check="3"}
A stepped shaft has $D = 5 0$ mm, $d = 4 0$ mm, and $r = 2$ mm. The shaft is subjected to a bending moment $M = 2 0 0$ N·m. The material has $S _ { y } = 6 0 0$ MPa. Calculate the factor of safety using the von Mises theory with and without the stress concentration.

**Nominal bending stress:**

$$
\sigma _ { \text{nom } } \; = \; { \frac { 3 2 M } { \pi d ^ { 3 } } } \; = \; { \frac { 3 2 \times 2 0 0 \times 1 0 ^ { 3 } } { \pi \times 4 0 ^ { 3 } } } \; = \; { \frac { 6 . 4 \times 1 0 ^ { 6 } } { 2 0 1 \ 0 6 2 } } \; = \; 3 1 . 8 \ \text{MPa}
$$

**Stress concentration factor:** $r / d = 2 / 4 0 = 0 . 0 5$ , $D / d = 5 0 / 4 0 = 1 . 2 5$ . From the table: $K _ { t } \approx 1 . 7$ (bending).

**Peak stress:**

$$
\sigma _ { \max } \; = \; K _ { t } \times \sigma _ { \text{nom } } \; = \; 1 . 7 \times 3 1 . 8 \; = \; 5 4 . 1 \ \text{MPa}
$$

**Factor of safety without stress concentration:**

$$
n _ { \text{no } K _ { t } } \; = \; { \frac { 6 0 0 } { 3 1 . 8 } } \; = \; { \bf 1 8 . 9 }
$$

**Factor of safety with stress concentration:**

$$
n _ { \text{with } K _ { t } } \; = \; { \frac { 6 0 0 } { 5 4 . 1 } } \; = \; { \bf 1 1 . 1 }
$$

**The stress concentration reduces the factor of safety from 18.9 to 11.1, a 41 % reduction. The 41 % is the reason the stress concentration is the most important factor in machine design, and the importance is the reason the engineer who ignores the stress concentration is designing a component that fails at the fillet.**
:::

::: widget plot
title: The stress concentration factor vs fillet radius
f: 2.5; 2.0; 1.7; 1.5; 1.4
x: 0,5
y: 1,3
labels: Axial; Bending; Torsion; Reference; Reference
caption: The stress concentration factor $K _ { t }$ against the fillet radius for a stepped shaft with $D / d = 1 . 2 5$ . **The $K _ { t }$ decreases with increasing fillet radius, and the decrease is steepest at small radii. The engineer who increases the fillet radius from 1 mm to 3 mm reduces the $K _ { t }$ from 2.5 to 1.7, a 32 % reduction in the peak stress.** **The $K _ { t }$ for torsion is lower than for bending, and the bending is lower than for axial, because the stress gradient at the fillet is steepest for axial loading and shallowest for torsion.**
:::

## 4. Design decisions and the factor of safety

::: definition The design decision: strength vs stiffness {#def-strength-vs-stiffness}
The component is sized by the **strength criterion** (the stress must be less than the allowable stress) or the **stiffness criterion** (the deflection must be less than the allowable deflection), and the criterion that governs the design depends on the application:

$$
\begin{array} { l l l l }
\textbf{Application} & \textbf{Governing criterion} & \textbf{Reason} & \textbf{Example} \\ \hline
\text{Shaft} & \text{Stiffness} & \text{Deflection affects gear mesh, bearing life} & \text{Deflection} < 0 . 0 5 \ \text{mm} \\
\text{Bolt} & \text{Strength} & \text{Bolt fails by fracture, not deflection} & \text{Stress} < S _ { y } / n \\
\text{Spring} & \text{Stiffness} & \text{Spring is designed to deflect} & \text{Rate} = 5 0 0 \ \text{N/mm} \\
\text{Bracket} & \text{Strength} & \text{Bracket fails by yielding} & \text{Stress} < S _ { y } / n \\
\text{Machine tool} & \text{Stiffness} & \text{Deflection affects machining accuracy} & \text{Deflection} < 1 0 \ \mu \text{m} \\
\text{Crane hook} & \text{Strength} & \text{Hook fails by fracture} & \text{Stress} < S _ { y } / n \\
\end{array}
$$

**The stiffness criterion governs the design when the deflection affects the function (the gear mesh, the bearing life, the machining accuracy), and the function is the reason the stiffness is the governing criterion, not the strength.**
:::

::: definition The load types and the dynamic load factor {#def-load-types}
The **load type** determines the dynamic load factor $K _ { d }$ that multiplies the nominal load:

$$
\begin{array} { l c l }
\textbf{Load type} & \textbf{ } K _ { d } & \textbf{Example} \\ \hline
\text{Static (slowly applied)} & 1 . 0 & \text{Dead weight, bolt preload} \\
\text{Gradually applied} & 1 . 0 \text{--} 1 . 5 & \text{Machine start-up, gentle engagement} \\
\text{Shock (sudden)} & 1 . 5 \text{--} 3 . 0 & \text{Impact, hammer, crash} \\
\text{Cyclic (fatigue)} & \text{Fatigue analysis} & \text{Reversed bending, rotating shaft} \\
\text{Vibration} & \text{Dynamic analysis} & \text{Resonance, unbalance, flutter} \\
\end{array}
$$

**The dynamic load factor is the reason the shock-loaded component is 50–200 % larger than the statically loaded component. The engineer who applies the static yield strength to a shock-loaded component is not designing for the shock; they are designing for the static equivalent, and the static equivalent is the reason the component fails on the first shock.**
:::

::: example Bearing stress in a pin joint {#ex-bearing-stress level=3 check="2"}
A pin joint has a pin diameter $d = 2 0$ mm, a plate thickness $t = 1 0$ mm, and a load $P = 3 0$ kN. The pin material has $S _ { y } = 4 0 0$ MPa, and the plate material has $S _ { y } = 2 5 0$ MPa. Calculate the bearing stress and the factor of safety.

**Bearing area:**

$$
A _ { b } \; = \; d \times t \; = \; 2 0 \times 1 0 \; = \; 2 0 0 \ \text{mm} ^ { 2 }
$$

**Bearing stress:**

$$
\sigma _ { b } \; = \; { \frac { P } { A _ { b } } } \; = \; { \frac { 3 0 \ 0 0 0 } { 2 0 0 } } \; = \; 1 5 0 \ \text{MPa}
$$

**Factor of safety (plate, the weaker material):**

$$
n \; = \; { \frac { S _ { y , \text{plate } } } { \sigma _ { b } } } \; = \; { \frac { 2 5 0 } { 1 5 0 } } \; = \; { \bf 1 . 6 7 }
$$

**The bearing stress (150 MPa) is 60 % of the plate's yield strength (250 MPa), and the factor of safety (1.67) is below the typical design factor of 2.0. The engineer must increase the plate thickness or the pin diameter to meet the design factor. The bearing stress is the reason the pin joint fails by the plate punching through, not the pin shearing.**
:::

## Exercises

::: exercise Tresca vs von Mises for a shaft {#ex-tresca-von-mises level=3 check="2"}
A shaft has $\sigma _ { x } = 1 0 0$ MPa and $\tau _ { x y } = 6 0$ MPa. The material has $S _ { y } = 5 0 0$ MPa. Calculate the factor of safety using the Tresca and von Mises theories.

::: solution
**Principal stresses:**

$$
\sigma _ { 1 , 3 } = { \frac { 1 0 0 } { 2 } } \pm { \sqrt { 5 0 ^ { 2 } + 6 0 ^ { 2 } } } = 5 0 \pm { \sqrt { 2 5 0 0 + 3 6 0 0 } } = 5 0 \pm 7 8 . 1
$$

$\sigma _ { 1 } = 1 2 8 . 1$ MPa, $\sigma _ { 3 } = - 2 8 . 1$ MPa.

**Tresca:** $\sigma _ { \text{Tresca } } = 1 2 8 . 1 - ( - 2 8 . 1 ) = 1 5 6 . 2$ MPa. $n = 5 0 0 / 1 5 6 . 2 = { \bf 3 . 2 }$

**von Mises:** $\sigma _ { \text{vM } } = { \sqrt { 1 0 0 ^ { 2 } + 3 \times 6 0 ^ { 2 } } } = { \sqrt { 1 0 0 0 0 + 1 0 8 0 0 } } = { \sqrt { 2 0 8 0 0 } } = 1 4 4 . 2$ MPa. $n = 5 0 0 / 1 4 4 . 2 = { \bf 3 . 4 7 }$

**The von Mises factor of safety (3.47) is 8.4 % higher than the Tresca factor of safety (3.2), because the von Mises theory is less conservative.**
:::
:::

::: exercise Mohr-Coulomb for cast iron {#ex-mohr-coulomb level=3 check="2"}
A cast iron component has $\sigma _ { 1 } = 8 0$ MPa and $\sigma _ { 3 } = - 4 0$ MPa. The material has $S _ { u t } = 2 5 0$ MPa and $S _ { u c } = 7 5 0$ MPa. Calculate the factor of safety using the Mohr-Coulomb theory.

::: solution
$$
n \; = \; { \frac { 1 } { { \dfrac { 8 0 } { 2 5 0 } } - { \dfrac { - 4 0 } { 7 5 0 } } } } \; = \; { \frac { 1 } { 0 . 3 2 + 0 . 0 5 3 3 } } \; = \; { \frac { 1 } { 0 . 3 7 3 3 } } \; = \; { \bf 2 . 6 8 }
$$

**The factor of safety is 2.68. The Mohr-Coulomb theory is 11 % more conservative than the maximum normal stress theory ($n = 2 5 0 / 8 0 = 3 . 1 3$), because the Mohr-Coulomb theory accounts for the compressive stress.**
:::
:::

::: exercise Stress concentration at a fillet {#ex-fillet-kt level=3 check="3"}
A stepped shaft has $D = 6 0$ mm, $d = 4 0$ mm, and $r = 3$ mm. The shaft is subjected to a torsional moment $T = 5 0 0$ N·m. The material has $S _ { y } = 5 0 0$ MPa. Calculate the factor of safety using the von Mises theory with the stress concentration.

::: solution
**Nominal torsional stress:**

$$
\tau _ { \text{nom } } \; = \; { \frac { 1 6 T } { \pi d ^ { 3 } } } \; = \; { \frac { 1 6 \times 5 0 0 \times 1 0 ^ { 3 } } { \pi \times 4 0 ^ { 3 } } } \; = \; { \frac { 8 \times 1 0 ^ { 6 } } { 2 0 1 \ 0 6 2 } } \; = \; 3 9 . 8 \ \text{MPa}
$$

**Stress concentration factor:** $r / d = 3 / 4 0 = 0 . 0 7 5$ , $D / d = 6 0 / 4 0 = 1 . 5$ . From the table: $K _ { t } \approx 1 . 3$ (torsion).

**Peak shear stress:** $\tau _ { \max } = 1 . 3 \times 3 9 . 8 = 5 1 . 7$ MPa.

**von Mises (pure shear):** $\sigma _ { \text{vM } } = { \sqrt { 3 } } \times \tau _ { \max } = 1 . 7 3 2 \times 5 1 . 7 = 8 9 . 6$ MPa.

$$
n \; = \; { \frac { 5 0 0 } { 8 9 . 6 } } \; = \; { \bf 5 . 6 }
$$

**The factor of safety is 5.6. Without the stress concentration, $n = 5 0 0 / ( { \sqrt { 3 } } \times 3 9 . 8 ) = 7 . 2 5$ . The stress concentration reduces the factor of safety by 23 %.**
:::
:::

::: exercise Bearing stress in a bolted joint {#ex-bearing-bolt level=3 check="2"}
A bolted joint has a bolt diameter $d = 1 6$ mm, a plate thickness $t = 1 2$ mm, and a preload $F = 4 0$ kN. The plate material has $S _ { y } = 3 0 0$ MPa. Calculate the bearing stress and the factor of safety.

::: solution
$$
A _ { b } \; = \; d \times t \; = \; 1 6 \times 1 2 \; = \; 1 9 2 \ \text{mm} ^ { 2 }
$$

$$
\sigma _ { b } \; = \; { \frac { F } { A _ { b } } } \; = \; { \frac { 4 0 \ 0 0 0 } { 1 9 2 } } \; = \; 2 0 8 . 3 \ \text{MPa}
$$

$$
n \; = \; { \frac { 3 0 0 } { 2 0 8 . 3 } } \; = \; { \bf 1 . 4 4 }
$$

**The factor of safety (1.44) is below the typical design factor of 2.0. The engineer must increase the plate thickness or the bolt diameter to meet the design factor.**
:::
:::

::: exercise Pressure vessel with a hole {#ex-vessel-hole level=3 check="2"}
A thin-walled pressure vessel has $r = 3 0 0$ mm, $t = 1 2$ mm, $p = 4$ MPa, and a transverse hole with $d / W = 0 . 1$ . The material has $S _ { y } = 4 0 0$ MPa. Calculate the factor of safety using the von Mises theory with the stress concentration ($K _ { t } = 2 . 5$).

::: solution
**Hoop stress:** $\sigma _ { \theta } = p r / t = 4 \times 3 0 0 / 1 2 = 1 0 0$ MPa.

**Peak hoop stress at the hole:** $\sigma _ { \max } = K _ { t } \times \sigma _ { \theta } = 2 . 5 \times 1 0 0 = 2 5 0$ MPa.

**von Mises (biaxial, $\sigma _ { 1 } = 2 5 0$, $\sigma _ { 2 } = 5 0$):**

$$
\sigma _ { \text{vM } } \; = \; { \sqrt { 2 5 0 ^ { 2 } - 2 5 0 \times 5 0 + 5 0 ^ { 2 } } } \; = \; { \sqrt { 6 2 5 0 0 - 1 2 5 0 0 + 2 5 0 0 } } \; = \; { \sqrt { 5 2 5 0 0 } } \; = \; 2 2 9 . 1 \ \text{MPa}
$$

$$
n \; = \; { \frac { 4 0 0 } { 2 2 9 . 1 } } \; = \; { \bf 1 . 7 5 }
$$

**The factor of safety (1.75) is below the ASME requirement of 3.5. The hole is the reason the pressure vessel fails at the nozzle, not at the shell.**
:::
:::

::: exercise Dynamic load factor {#ex-dynamic-load level=3 check="3"}
A bracket is subjected to a static load of 10 kN and a shock load of 25 kN. The bracket is designed with $n = 2$ for the static load. What is the factor of safety under the shock load if the dynamic load factor is $K _ { d } = 2 . 5$?

::: solution
**Static design:** $\sigma _ { \text{allow } } = S _ { y } / 2$ .

**Shock stress:** $\sigma _ { \text{shock } } = K _ { d } \times \sigma _ { \text{static } } = 2 . 5 \times \sigma _ { \text{static } }$ .

**Factor of safety under shock:**

$$
n _ { \text{shock } } \; = \; { \frac { S _ { y } } { \sigma _ { \text{shock } } } } \; = \; { \frac { S _ { y } } { 2 . 5 \times \sigma _ { \text{static } } } } \; = \; { \frac { n _ { \text{static } } } { 2 . 5 } } \; = \; { \frac { 2 } { 2 . 5 } } \; = \; { \bf 0 . 8 }
$$

**The factor of safety under the shock load is 0.8, which is below 1.0. The bracket yields under the shock load. The engineer must increase the bracket's cross-section by 125 % (or reduce the dynamic load factor by using a shock absorber) to meet the design factor of 2.0.**
:::
:::

::: exercise Derivation: the von Mises criterion from the distortion energy {#ex-derive-von-mises level=4 check="3"}
Show that the von Mises equivalent stress $\sigma _ { \text{vM } } = { \sqrt { \sigma _ { x } ^ { 2 } - \sigma _ { x } \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \tau _ { x y } ^ { 2 } } }$ is derived from the distortion energy $U _ { d } = ( 1 + \nu ) / ( 3 E ) \times ( \sigma _ { x } ^ { 2 } - \sigma _ { x } \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \tau _ { x y } ^ { 2 } )$ by equating $U _ { d }$ to the distortion energy at the yield point in uniaxial tension.

::: solution
The total strain energy per unit volume is:

$$
U \; = \; { \frac { 1 } { 2 E } } \left[ \sigma _ { x } ^ { 2 } + \sigma _ { y } ^ { 2 } - 2 \nu \sigma _ { x } \sigma _ { y } + 2 ( 1 + \nu ) \tau _ { x y } ^ { 2 } \right]
$$

The volumetric (dilatational) strain energy is:

$$
U _ { v } \; = \; { \frac { ( 1 - 2 \nu ) } { 6 E } } ( \sigma _ { x } + \sigma _ { y } ) ^ { 2 }
$$

The distortion energy is $U _ { d } = U - U _ { v }$ :

$$
U _ { d } \; = \; { \frac { 1 + \nu } { 3 E } } \left( \sigma _ { x } ^ { 2 } - \sigma _ { x } \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \tau _ { x y } ^ { 2 } \right)
$$

At the yield point in uniaxial tension ($\sigma _ { x } = S _ { y }$, $\sigma _ { y } = 0$, $\tau _ { x y } = 0$):

$$
U _ { d , \text{yield } } \; = \; { \frac { 1 + \nu } { 3 E } } S _ { y } ^ { 2 }
$$

Setting $U _ { d } = U _ { d , \text{yield } }$ :

$$
{ \frac { 1 + \nu } { 3 E } } \left( \sigma _ { x } ^ { 2 } - \sigma _ { x } \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \tau _ { x y } ^ { 2 } \right) \; = \; { \frac { 1 + \nu } { 3 E } } S _ { y } ^ { 2 }
$$

$$
\sigma _ { \text{vM } } \; = \; { \sqrt { \sigma _ { x } ^ { 2 } - \sigma _ { x } \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \tau _ { x y } ^ { 2 } } } \; = \; S _ { y } \qquad \blacksquare
$$

**The von Mises criterion is the distortion energy criterion, and the distortion energy is the reason the von Mises criterion is more accurate than the Tresca criterion for ductile materials.**
:::
:::

::: exercise Derivation: the Tresca criterion from the maximum shear stress {#ex-derive-tresca level=4 check="2"}
Show that the Tresca criterion $\sigma _ { 1 } - \sigma _ { 3 } = S _ { y }$ is derived from the maximum shear stress $\tau _ { \max } = ( \sigma _ { 1 } - \sigma _ { 3 } ) / 2$ by equating $\tau _ { \max }$ to the maximum shear stress at the yield point in uniaxial tension. Evaluate the Tresca factor of safety for $\sigma _ { 1 } = 1 2 0$ MPa, $\sigma _ { 3 } = - 3 0$ MPa, and $S _ { y } = 4 5 0$ MPa.

::: solution
In a uniaxial tension test at the yield point, $\sigma _ { 1 } = S _ { y }$, $\sigma _ { 3 } = 0$, so:

$$
\tau _ { \max , \text{yield } } \; = \; { \frac { S _ { y } - 0 } { 2 } } \; = \; { \frac { S _ { y } } { 2 } }
$$

The Tresca criterion states that the material yields when:

$$
\tau _ { \max } \; = \; { \frac { \sigma _ { 1 } - \sigma _ { 3 } } { 2 } } \; \ge \; { \frac { S _ { y } } { 2 } } \quad \Longrightarrow \quad \sigma _ { 1 } - \sigma _ { 3 } \; \ge \; S _ { y }
$$

For $\sigma _ { 1 } = 1 2 0$ MPa, $\sigma _ { 3 } = - 3 0$ MPa, $S _ { y } = 4 5 0$ MPa:

$$
n \; = \; { \frac { S _ { y } } { \sigma _ { 1 } - \sigma _ { 3 } } } \; = \; { \frac { 4 5 0 } { 1 2 0 - ( - 3 0 ) } } \; = \; { \frac { 450}{150} } \; = \; { \bf 3 . 0 }
$$

**The Tresca factor of safety is 3.0. The Tresca criterion is the maximum shear stress criterion, and the maximum shear stress is the reason the Tresca criterion is more conservative than the von Mises criterion.** $\blacksquare$
:::
:::

::: quiz Ductile failure theories {#quiz-ductile}
The failure theory that is most accurate for ductile materials under multiaxial loading is:

- [ ] Maximum normal stress theory
- [ ] Mohr-Coulomb theory
- [x] Maximum distortion energy theory (von Mises)
- [ ] Maximum principal strain theory

::: solution
**The maximum distortion energy theory (von Mises).** The von Mises theory predicts the yield within 3 % of the experimental data for most ductile metals, while the Tresca theory is up to 15 % conservative. The von Mises theory is the default failure theory for ductile materials in machine design.
:::
:::

::: quiz Stress concentration {#quiz-stress-concentration}
The stress concentration factor $K_t$ is defined as:

- [ ] The ratio of the yield strength to the ultimate strength
- [x] The ratio of the maximum local stress to the nominal stress
- [ ] The ratio of the applied stress to the allowable stress
- [ ] The ratio of the fatigue strength to the yield strength

::: solution
**The ratio of the maximum local stress to the nominal stress.** The stress concentration factor $K _ { t } = \sigma _ { \max } / \sigma _ { \text{nom } }$ quantifies the stress amplification at the geometric discontinuity (the fillet, the hole, the thread, the keyway), and the amplification is the reason the component fails at the discontinuity, not at the nominal section.
:::
:::

## Where this lesson leads

- **[[mechanics-of-materials/stress-transformation]]** — The principal stresses and the maximum shear stress are the inputs to the failure theories.
- **[[mechanics-of-materials/stress-transformation|yield criteria]]** — The yield criteria are the foundation of the ductile failure theories.
- **[[machine-design/fatigue]]** — The stress concentration factor is the most important factor in fatigue design, because the fatigue crack initiates at the stress concentration.
- **[[machine-design/shafts]]** — The shaft is sized by the von Mises criterion with the stress concentration at the keyway and the shoulder fillet.
- **[[machine-design/fasteners-joints]]** — The bolt is sized by the maximum normal stress theory (the bolt is ductile, but the thread root is a stress concentration).
- **[[machine-design/bearings]]** — The bearing is sized by the contact stress (the Hertzian pressure), not the von Mises stress.
- **[[solid-mechanics/fracture-mechanics]]** — The fracture mechanics assessment replaces the failure theory when the crack is present.
- **[[finite-element-method/direct-stiffness]]** — The FEA calculates the stress at the discontinuity, replacing the hand calculation of $K _ { t }$.

::: history Static failure theories: from Coulomb to von Mises {#history-static-failure}
**1773** — **Charles-Augustin de Coulomb** proposes the internal friction theory of failure, which relates the shear strength to the normal stress: $\tau = c + \sigma \tan \phi$ . **The Coulomb theory is the foundation of the Mohr-Coulomb failure criterion, and the foundation is the reason the Mohr-Coulomb theory is used for soil, rock, and concrete.**

**1864** — **Henri Tresca** proposes the maximum shear stress theory of yielding, based on his experiments on the punching of metal plates. Tresca observes that the material yields when the maximum shear stress reaches a critical value. **The Tresca theory is the first quantitative yield criterion, and the criterion is the reason the pressure vessel code (ASME Section VIII) uses the Tresca theory.**

**1882** — **Christian Otto Mohr** develops the graphical representation of the stress state (Mohr's circle) and the failure envelope, which generalises the Coulomb theory to the general 2D stress state. **Mohr's circle is the most important graphical tool in machine design, and the tool is the reason the engineer can visualise the multiaxial stress state on a piece of paper.**

**1913** — **Richard von Mises** proposes the maximum distortion energy theory of yielding, based on the idea that the material yields when the distortion energy per unit volume reaches a critical value. **The von Mises theory is the most accurate yield criterion for ductile metals, and the accuracy is the reason the von Mises theory is the default in machine design.**

**1920** — **A.A. Griffith** proposes the energy balance theory of brittle fracture, which explains why the fracture strength of glass is 100× lower than the theoretical strength. **The Griffith theory is the foundation of fracture mechanics, and the foundation is the reason the engineer must consider the crack, not just the stress.**

**1950** — **The ASME Boiler and Pressure Vessel Code** adopts the maximum shear stress theory (Tresca) as the design criterion for pressure vessels, because the Tresca theory is more conservative than the von Mises theory. **The ASME code is the reason the Tresca theory is the legal requirement for pressure vessels, and the legal requirement is the reason the engineer must know both theories.**

**1960** — **The stress concentration factor** is tabulated by R.E. Peterson in 'Stress Concentration Design Factors' (Wiley), the first comprehensive compilation of $K _ { t }$ data for machine components. **Peterson's book is the reason the engineer can calculate the peak stress at the fillet, the hole, and the thread without a finite element analysis.**
:::

::: summary Static failure {#summary-static-failure}
- **The factor of safety is the ratio of the material's strength to the applied stress, and the factor of safety is a margin of knowledge, not a margin of ignorance.** The rationale must address the load uncertainty, the material scatter, the manufacturing defect, the consequence of failure, and the standard's requirement.
- **The Tresca (maximum shear stress) theory is conservative and is used in the pressure vessel code.** The Tresca criterion is $\sigma _ { 1 } - \sigma _ { 3 } \ge S _ { y }$ .
- **The von Mises (maximum distortion energy) theory is more accurate and is the default for ductile materials.** The von Mises criterion is $\sigma _ { \text{vM } } = { \sqrt { \sigma _ { x } ^ { 2 } - \sigma _ { x } \sigma _ { y } + \sigma _ { y } ^ { 2 } + 3 \tau _ { x y } ^ { 2 } } } \ge S _ { y }$ .
- **The maximum difference between the Tresca and von Mises theories is 15.5 %, and the difference occurs under pure shear.** The Tresca theory is more conservative, and the conservatism is the reason the Tresca theory is preferred when the consequence of failure is severe.
- **The maximum normal stress theory is used for brittle materials where $S _ { u t } \approx S _ { u c }$.** The Mohr-Coulomb theory is used for brittle materials where $S _ { u c } \gg S _ { u t }$ (cast iron, concrete, rock).
- **The stress concentration factor $K _ { t }$ multiplies the nominal stress by 2–5 at the fillet, the hole, the thread, and the keyway.** The stress concentration is the reason the component fails at the discontinuity, not at the nominal section.
- **The fillet radius is the most important design parameter in shaft design.** The engineer who increases the fillet radius from 1 mm to 3 mm reduces the $K _ { t }$ from 2.5 to 1.7, a 32 % reduction in the peak stress.
- **The stiffness criterion governs the design when the deflection affects the function (the gear mesh, the bearing life, the machining accuracy).** The strength criterion governs the design when the component fails by fracture (the bolt, the crane hook).
- **The dynamic load factor $K _ { d }$ multiplies the nominal load by 1.5–3 for shock loading.** The shock-loaded component is 50–200 % larger than the statically loaded component.
- **The bearing stress is the contact pressure between the pin and the plate, and the bearing stress must be less than the material's compressive yield strength.** The pin joint fails by the plate punching through, not the pin shearing.
:::

## Further reading

- **Robert C. Juvinall and Kurt M. Marshek (2020)** — *Fundamentals of Machine Component Design*, 7th ed. Wiley. The standard machine design textbook: the failure theories, the stress concentration, and the design examples.
- **Joseph E. Shigley, Charles R. Mischke and Richard G. Budynas (2015)** — *Mechanical Engineering Design*, 11th ed. McGraw-Hill. The failure theories, the stress concentration factors, and the shaft design.
- **Robert E. Peterson (1974)** — *Stress Concentration Design Factors*, 2nd ed. Krieger Publishing. The comprehensive compilation of $K _ { t }$ data for machine components.
- **Stephen P. Timoshenko and J.N. Goodier (1970)** — *Theory of Elasticity*, 3rd ed. McGraw-Hill. The derivation of the von Mises criterion and the stress concentration factors.
- **Norman E. Dowling (2019)** — *Mechanical Behavior of Materials*, 5th ed. Pearson. The failure theories, the fracture mechanics, and the fatigue.
- **ASME (2023)** — *Boiler and Pressure Vessel Code, Section VIII: Rules for Construction of Pressure Vessels*. ASME. The Tresca-based design criterion for pressure vessels.
- **William A. Nash (1989)** — *Theory and Problems of Strength of Materials*, 2nd ed. Schaum's Outline Series. The worked examples of the failure theories.
- **M.F. Ashby and H. Jones (2012)** — *Engineering Materials 1: An Introduction to Properties, Applications and Environmental Impact*, 4th ed. Butterworth-Heinemann. The material properties and the failure behaviour.
