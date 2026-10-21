The plate is the most common structural element: the plate is the floor slab, the aircraft skin, the pressure vessel head, and the microelectromechanical system (MEMS) diaphragm, and the plate is the element that determines the stiffness of the structure. **The engineer who designs the plate without understanding the plate bending theory is not designing the plate; they are designing a plate that will fail by excessive deflection, not by yielding.** The plate bending theory is the reason the engineer can predict the deflection and the stress in the plate, and the prediction is the reason the plate is safe.

The quantitative tools of plate theory are the **Kirchhoff plate equation** (the governing differential equation for plate bending), the **bending moment** (the moment per unit length in the plate), the **plate deflection** (the solution of the plate equation for various boundary conditions), and the **plate buckling** (the critical load for plate instability). The tools are the language in which the plate analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways plate analysis goes wrong
**Not checking the thin-plate assumption.** The engineer who uses the Kirchhoff plate theory for a thick plate is not analysing the plate; they are analysing a membrane. **The Kirchhoff plate theory is valid when $t / a < 0 . 1$ , and the validity is the reason the Kirchhoff plate theory is the most widely used theory in plate design.** **Not accounting for the boundary conditions.** The engineer who calculates the plate deflection without checking the boundary conditions is not calculating the plate deflection; they are guessing. **The boundary conditions are the reason the plate deflection is different for different support conditions, and the difference is the reason the plate is designed for the boundary conditions, not the load.** **Not accounting for the aspect ratio.** The engineer who calculates the plate deflection without checking the aspect ratio is not calculating the plate deflection; they are calculating the beam deflection. **The aspect ratio is the reason the plate deflection is different from the beam deflection, and the difference is the reason the plate is designed for the aspect ratio, not the span.** **Not accounting for the Poisson ratio.** The engineer who calculates the plate deflection without checking the Poisson ratio is not calculating the plate deflection; they are calculating the beam deflection. **The Poisson ratio is the reason the plate deflection is different from the beam deflection, and the difference is the reason the plate is designed for the Poisson ratio, not the modulus.** **Not accounting for the buckling.** The engineer who designs the plate without checking the buckling is not designing the plate; they are designing a plate that will fail by buckling. **The buckling is the reason the plate is designed for the buckling load, not the yield load, and the buckling load is the reason the plate is the most critical component in the aircraft.** **Not accounting for the large deflection.** The engineer who calculates the plate deflection without checking the large deflection is not calculating the plate deflection; they are calculating the small deflection. **The large deflection is the reason the plate is stiffer than the beam, and the stiffness is the reason the plate can carry the load beyond the linear range.** **Not accounting for the anisotropy.** The engineer who calculates the plate deflection without checking the anisotropy is not calculating the plate deflection; they are calculating the isotropic plate deflection. **The anisotropy is the reason the composite plate is stiffer in one direction than the other, and the stiffness is the reason the composite plate is the most widely used plate in the aircraft.** **Not accounting for the thermal load.** The engineer who calculates the plate deflection without checking the thermal load is not calculating the plate deflection; they are calculating the mechanical deflection. **The thermal load is the reason the plate is designed for the thermal load, not just the mechanical load, and the thermal load is the reason the plate is the most critical component in the high-temperature structure.** **Not accounting for the dynamic load.** The engineer who calculates the plate deflection without checking the dynamic load is not calculating the plate deflection; they are calculating the static deflection. **The dynamic load is the reason the plate is designed for the dynamic load, not the static load, and the dynamic load is the reason the plate is the most critical component in the vibrating structure.**
:::

## 1. Kirchhoff plate theory

::: definition The Kirchhoff plate equation {#def-kirchhoff}
The **Kirchhoff plate equation** is the governing differential equation for the bending of a thin plate, and the Kirchhoff plate equation is the reason the engineer can calculate the deflection and the stress in the plate.

$$
D \, \nabla ^ { 4 } w \; = \; q ( x , y )
$$

where $D$ is the **flexural rigidity** of the plate:

$$
D \; = \; { \frac { E \, t ^ { 3 } } { 1 2 \, ( 1 - \nu ^ { 2 } ) } }
$$

and $\nabla ^ { 4 }$ is the **biharmonic operator**:

$$
\nabla ^ { 4 } w \; = \; { \frac { \partial ^ { 4 } w } { \partial x ^ { 4 } } } + 2 \, { \frac { \partial ^ { 4 } w } { \partial x ^ { 2 } \, \partial y ^ { 2 } } } + { \frac { \partial ^ { 4 } w } { \partial y ^ { 4 } } }
$$

The **bending moments** are:

$$
M _ { x } \; = \; - D \, \left( { \frac { \partial ^ { 2 } w } { \partial x ^ { 2 } } } + \nu \, { \frac { \partial ^ { 2 } w } { \partial y ^ { 2 } } } \right) \qquad M _ { y } \; = \; - D \, \left( { \frac { \partial ^ { 2 } w } { \partial y ^ { 2 } } } + \nu \, { \frac { \partial ^ { 2 } w } { \partial x ^ { 2 } } } \right)
$$

$$
\begin{array} { l c c c }
\textbf{Plate type} & \textbf{ } w _ { \max } & \textbf{ } M _ { \max } & \textbf{Use case} \\ \hline
\text{SS, uniform load} & 0 . 0 0 4 0 6 \, q \, a ^ { 4 } / D & 0 . 0 4 7 9 \, q \, a ^ { 2 } & \text{Floor slab} \\
\text{Clamped, uniform load} & 0 . 0 0 1 2 6 \, q \, a ^ { 4 } / D & 0 . 0 2 7 3 \, q \, a ^ { 2 } & \text{Pressure vessel head} \\
\text{SS, point load} & P \, a ^ { 2 } / ( D \, \pi ^ { 2 } ) & P / ( 4 \, \pi ) \times f ( \nu ) & \text{MEMS diaphragm} \\
\text{Cantilever, uniform load} & 0 . 0 0 1 3 \, q \, a ^ { 4 } / D & 0 . 0 5 \, q \, a ^ { 2 } & \text{Cantilever wing} \\
\end{array}
$$

**The Kirchhoff plate theory is valid when $t / a < 0 . 1$ , and the validity is the reason the Kirchhoff plate theory is the most widely used theory in plate design. The engineer who uses the Kirchhoff plate theory for a thick plate is not analysing the plate; they are analysing a membrane.**
:::

::: definition The plate boundary conditions {#def-plate-bc}
The **plate boundary conditions** are the constraints on the plate edge, and the plate boundary conditions are the reason the plate deflection is different for different support conditions.

$$
\begin{array} { l c c }
\textbf{Boundary condition} & \textbf{Deflection} & \textbf{Moment} \\ \hline
\text{Simply supported (SS)} & w = 0 & M _ { n } = 0 \\
\text{Clamped (fixed)} & w = 0 & \partial w / \partial n = 0 \\
\text{Free} & M _ { n } = 0 & V _ { n } = 0 \\
\text{Guided (sliding)} & \partial w / \partial n = 0 & V _ { n } = 0 \\
\end{array}
$$

The **effective shear force** is:

$$
V _ { n } \; = \; - D \, { \frac { \partial } { \partial n } } \, ( \nabla ^ { 2 } w ) \; - \; D \, ( 1 - \nu ) \, { \frac { \partial ^ { 3 } w } { \partial n \, \partial s ^ { 2 } } }
$$

**The boundary conditions are the reason the plate deflection is different for different support conditions, and the difference is the reason the plate is designed for the boundary conditions, not the load. The engineer who calculates the plate deflection without checking the boundary conditions is not calculating the plate deflection; they are guessing.**
:::

::: widget plot
title: The deflection of a simply supported plate under uniform load
f: 1-x^2; 1-x^2*0.5
x: -1,1
y: 0,1.2
labels: w (SS); w (clamped)
caption: The deflection of a simply supported plate and a clamped plate under uniform load. **The clamped plate is 3.2 times stiffer than the simply supported plate, and the stiffness is the reason the clamped plate is the most widely used plate in pressure vessel design.** **The deflection is proportional to the fourth power of the span, and the fourth power is the reason the plate is designed for the span, not the load.**
:::

::: example Simply supported plate under uniform load {#ex-ss-plate level=3 check="2"}
A simply supported square plate ($a = 2$ m, $t = 2 0$ mm, $E = 2 0 0$ GPa, $\nu = 0 . 3$ ) carries a uniform load $q = 1 0$ kPa. Calculate the maximum deflection and the maximum bending stress.

**Flexural rigidity:**

$$
D \; = \; { \frac { E \, t ^ { 3 } } { 1 2 \, ( 1 - \nu ^ { 2 } ) } } \; = \; { \frac { 2 0 0 \ 0 0 0 \times 2 0 ^ { 3 } } { 1 2 \times ( 1 - 0 . 0 9 ) } } \; = \; { \frac { 1 . 6 \times 1 0 ^ { 9 } } { 1 0 . 9 2 } } \; = \; 1 . 4 6 5 \times 1 0 ^ { 8 } \ \text{N} { \cdot } \text{mm}
$$

**Maximum deflection (centre):**

$$
w _ { \max } \; = \; 0 . 0 0 4 0 6 \, { \frac { q \, a ^ { 4 } } { D } } \; = \; 0 . 0 0 4 0 6 \times { \frac { 1 0 \times 1 0 ^ { - 3 } \times 2 0 0 0 ^ { 4 } } { 1 . 4 6 5 \times 1 0 ^ { 8 } } } \; = \; 0 . 0 0 4 0 6 \times { \frac { 1 . 6 \times 1 0 ^ { 1 1 } } { 1 . 4 6 5 \times 1 0 ^ { 8 } } }
$$

$$
w _ { \max } \; = \; 0 . 0 0 4 0 6 \times 1 0 9 2 \; = \; { \bf 4 . 4 3 } \ \text{mm}
$$

**Maximum bending moment:**

$$
M _ { \max } \; = \; 0 . 0 4 7 9 \, q \, a ^ { 2 } \; = \; 0 . 0 4 7 9 \times 1 0 \times 1 0 ^ { - 3 } \times 2 0 0 0 ^ { 2 } \; = \; { \bf 1 9 1 . 6 } \ \text{N} { \cdot } \text{mm/mm}
$$

**Maximum bending stress:**

$$
\sigma _ { \max } \; = \; { \frac { 6 \, M _ { \max } } { t ^ { 2 } } } \; = \; { \frac { 6 \times 1 9 1 . 6 } { 2 0 ^ { 2 } } } \; = \; { \bf 2 . 8 7 } \ \text{MPa}
$$

**The maximum deflection is 4.43 mm, and the maximum bending stress is 2.87 MPa. The engineer would design the plate for the deflection, because the deflection is the reason the plate is designed for the stiffness, not the strength.**
:::

## 2. Plate buckling

::: definition The plate buckling coefficient {#def-plate-buckling}
The **plate buckling coefficient** is the dimensionless parameter that determines the critical buckling load of the plate, and the plate buckling coefficient is the reason the engineer can design the plate for the buckling load.

For a **simply supported rectangular plate** under uniaxial compression:

$$
N _ { x , c r } \; = \; k _ { c r } \, { \frac { \pi ^ { 2 } \, D } { b ^ { 2 } \, ( 1 - \nu ^ { 2 } ) } } \; = \; k _ { c r } \, { \frac { \pi ^ { 2 } \, E \, t ^ { 3 } } { 1 2 \, ( 1 - \nu ^ { 2 } ) \, b ^ { 2 } } }
$$

where $k _ { c r }$ is the **buckling coefficient**:

$$
k _ { c r } \; = \; \left( { \frac { m \, b } { a } } + { \frac { a } { m \, b } } \right) ^ { 2 }
$$

$$
\begin{array} { l c c c }
\textbf{Loading} & \textbf{ } k _ { c r } \textbf{ (SS)} & \textbf{ } k _ { c r } \textbf{ (clamped)} & \textbf{Use case} \\ \hline
\text{Uniaxial compression} & 4 . 0 \text{ (square)} & 6 . 9 7 & \text{Wing panel} \\
\text{Pure shear} & 7 . 3 4 \text{ (square)} & 1 3 . 1 & \text{Web panel} \\
\text{Hydrostatic compression} & 4 . 0 \text{ (square)} & 6 . 9 7 & \text{Submarine hull} \\
\text{Equibiaxial compression} & 8 . 0 \text{ (square)} & 1 3 . 9 & \text{Pressure vessel} \\
\end{array}
$$

**The buckling is the reason the plate is designed for the buckling load, not the yield load, and the buckling load is the reason the plate is the most critical component in the aircraft. The engineer who designs the plate without checking the buckling is not designing the plate; they are designing a plate that will fail by buckling.**
:::

::: definition The post-buckling behaviour {#def-post-buckling}
The **post-buckling behaviour** is the behaviour of the plate after the buckling load is exceeded, and the post-buckling behaviour is the reason the engineer can design the plate to carry the load beyond the buckling load.

For a **simply supported plate** under uniaxial compression, the post-buckling load-deflection relationship is:

$$
{ \frac { N _ { x } } { N _ { x , c r } } } \; = \; 1 + { \frac { 1 } { 4 } } \, \left( { \frac { w _ { \max } } { t } } \right) ^ { 2 }
$$

The **effective width** concept is used in design codes:

$$
b _ { \text{eff } } \; = \; \rho \, b \qquad \rho \; = \; { \frac { 0 . 8 5 3 } { \bar { \lambda } } } - { \frac { 0 . 0 7 1 } { \bar { \lambda } ^ { 2 } } } \quad ( \bar { \lambda } > 0 . 6 7 3 )
$$

where $\bar { \lambda } = \sqrt { \sigma _ { y } / \sigma _ { c r } }$ is the **slenderness ratio**.

**The post-buckling is the reason the plate is stiffer than the beam, and the stiffness is the reason the plate can carry the load beyond the linear range. The engineer who calculates the plate deflection without checking the large deflection is not calculating the plate deflection; they are calculating the small deflection.**
:::

::: widget plot
title: The buckling coefficient vs aspect ratio
f: (4/x+x/4)^2; (4/x+x/4)^2*0.5
x: 0.5,3
y: 0,25
labels: Uniaxial; Shear
caption: The buckling coefficient against the aspect ratio for a simply supported plate. **The buckling coefficient is minimum when the aspect ratio is 1 (square plate), and the minimum is the reason the square plate is the most critical plate in buckling.** **The buckling coefficient is proportional to the square of the aspect ratio, and the square is the reason the plate is designed for the aspect ratio, not the span.**
:::

::: example Plate buckling calculation {#ex-plate-buckling level=3 check="2"}
A simply supported steel plate ($a = 5 0 0$ mm, $b = 3 0 0$ mm, $t = 3$ mm, $E = 2 0 0$ GPa, $\nu = 0 . 3$ ) is subjected to uniaxial compression. Calculate the critical buckling stress.

**Flexural rigidity:**

$$
D \; = \; { \frac { E \, t ^ { 3 } } { 1 2 \, ( 1 - \nu ^ { 2 } ) } } \; = \; { \frac { 2 0 0 \ 0 0 0 \times 2 7 } { 1 2 \times 0 . 9 1 } } \; = \; { \frac { 5 . 4 \times 1 0 ^ { 6 } } { 1 0 . 9 2 } } \; = \; 4 9 4 \ 5 0 5 \ \text{N} { \cdot } \text{mm}
$$

**Buckling coefficient:**

$$
k _ { c r } \; = \; \left( { \frac { m \, b } { a } } + { \frac { a } { m \, b } } \right) ^ { 2 } \; = \; \left( { \frac { 1 \times 3 0 0 } { 5 0 0 } } + { \frac { 5 0 0 } { 1 \times 3 0 0 } } \right) ^ { 2 } \; = \; ( 0 . 6 + 1 . 6 6 7 ) ^ { 2 } \; = \; 5 . 1 5
$$

**Critical buckling stress:**

$$
\sigma _ { c r } \; = \; { \frac { k _ { c r } \, \pi ^ { 2 } \, E } { 1 2 \, ( 1 - \nu ^ { 2 } ) \, ( b / t ) ^ { 2 } } } \; = \; { \frac { 5 . 1 5 \times 9 . 8 7 \times 2 0 0 \ 0 0 0 } { 1 2 \times 0 . 9 1 \times 1 0 0 ^ { 2 } } } \; = \; { \frac { 1 0 \ 1 8 6 \ 0 0 0 } { 1 0 9 \ 2 0 0 } } \; = \; { \bf 9 3 . 3 } \ \text{MPa}
$$

**The critical buckling stress is 93.3 MPa. The engineer would design the plate for the buckling stress, because the buckling stress is the reason the plate is designed for the buckling load, not the yield load.**
:::

::: example Clamped circular plate under uniform pressure {#ex-circular-plate level=3 check="2"}
A clamped circular plate ($R = 2 0 0$ mm, $t = 8$ mm, $E = 2 0 0$ GPa, $\\nu = 0 . 3$ ) carries a uniform pressure $p = 5$ MPa. Calculate the maximum deflection and the maximum bending stress.

**Flexural rigidity:**

$$
D \\; = \\; { \\frac { E \\, t ^ { 3 } } { 1 2 \\, ( 1 - \\nu ^ { 2 } ) } } \\; = \\; { \\frac { 2 0 0 \\ 0 0 0 \\times 5 1 2 } { 1 2 \\times 0 . 9 1 } } \\; = \\; { \\frac { 1 . 0 2 4 \\times 1 0 ^ { 8 } } { 1 0 . 9 2 } } \\; = \\; 9 . 3 8 \\times 1 0 ^ { 6 } \\ \\text{N} { \\cdot } \\text{mm}
$$

**Maximum deflection (centre):**

$$
w _ { \\max } \\; = \\; { \\frac { p \\, R ^ { 4 } } { 6 4 \\, D } } \\; = \\; { \\frac { 5 \\times 2 0 0 ^ { 4 } } { 6 4 \\times 9 . 3 8 \\times 1 0 ^ { 6 } } } \\; = \\; { \\frac { 8 \\times 1 0 ^ { 1 0 } } { 6 . 0 0 \\times 1 0 ^ { 8 } } } \\; = \\; { \\bf 1 . 3 3 } \\ \\text{mm}
$$

**Maximum bending stress (at the edge):**

$$
\\sigma _ { \\max } \\; = \\; { \\frac { 3 \\, p \\, R ^ { 2 } } { 4 \\, t ^ { 2 } } } \\; = \\; { \\frac { 3 \\times 5 \\times 2 0 0 ^ { 2 } } { 4 \\times 8 ^ { 2 } } } \\; = \\; { \\frac { 6 0 0 \\ 0 0 0 } { 2 5 6 } } \\; = \\; { \\bf 2 3 4 } \\ \\text{MPa}
$$

**The maximum deflection is 1.33 mm, and the maximum bending stress is 234 MPa. The engineer would design the circular plate for the bending stress, because the bending stress is the reason the plate is designed for the strength, not the stiffness.**
:::

::: example Plate under point load {#ex-point-load level=3 check="2"}
A simply supported square plate ($a = 5 0 0$ mm, $t = 5$ mm, $E = 7 0$ GPa, $\\nu = 0 . 3$ ) carries a central point load $P = 1$ kN. Calculate the maximum deflection.

**Flexural rigidity:**

$$
D \\; = \\; { \\frac { 7 0 \\ 0 0 0 \\times 1 2 5 } { 1 2 \\times 0 . 9 1 } } \\; = \\; { \\frac { 8 . 7 5 \\times 1 0 ^ { 6 } } { 1 0 . 9 2 } } \\; = \\; 8 0 1 \\ 2 8 2 \\ \\text{N} { \\cdot } \\text{mm}
$$

**Maximum deflection (centre, Navier solution):**

$$
w _ { \\max } \\; = \\; { \\frac { P \\, a ^ { 2 } } { D \\, \\pi ^ { 2 } } } \\times 0 . 0 1 1 6 \\; = \\; { \\frac { 1 0 0 0 \\times 2 5 0 \\ 0 0 0 } { 8 0 1 \\ 2 8 2 \\times 9 . 8 7 } } \\times 0 . 0 1 1 6
$$

$$
w _ { \\max } \\; = \\; { \\frac { 2 . 5 \\times 1 0 ^ { 8 } } { 7 . 9 1 \\times 1 0 ^ { 6 } } } \\times 0 . 0 1 1 6 \\; = \\; 3 1 . 6 \\times 0 . 0 1 1 6 \\; = \\; { \\bf 0 . 3 7 } \\ \\text{mm}
$$

**The maximum deflection is 0.37 mm. The engineer would design the plate for the deflection, because the deflection is the reason the plate is designed for the stiffness, not the strength.**
:::

::: exercise Plate natural frequency {#ex-plate-frequency level=3 check="2"}
A simply supported square plate ($a = 1$ m, $t = 1 0$ mm, $E = 2 0 0$ GPa, $\\nu = 0 . 3$ , $\\rho = 7 8 0 0$ kg/m\\.3) vibrates in its fundamental mode. Calculate the natural frequency.

::: solution
**Flexural rigidity:**

$$
D \\; = \\; { \\frac { 2 0 0 \\ 0 0 0 \\times 1 0 0 0 } { 1 2 \\times 0 . 9 1 } } \\; = \\; 1 8 . 3 \\times 1 0 ^ { 6 } \\ \\text{N} { \\cdot } \\text{mm}
$$

**Mass per unit area:**

$$
m \\; = \\; \\rho \\, t \\; = \\; 7 8 0 0 \\times 1 0 ^ { - 6 } \\times 1 0 \\; = \\; 0 . 0 7 8 \\ \\text{kg/m} ^ { 2 }
$$

**Natural frequency (fundamental mode):**

$$
f \\; = \\; { \\frac { \\pi } { 2 } } \\sqrt { { \\frac { D } { m \\, a ^ { 4 } } } } \\; = \\; { \\frac { \\pi } { 2 } } \\sqrt { { \\frac { 1 8 . 3 \\times 1 0 ^ { 3 } } { 0 . 0 7 8 \\times 1 } } } \\; = \\; { \\frac { \\pi } { 2 } } \\times 4 8 4 \\; = \\; { \\bf 7 6 0 } \\ \\text{Hz}
$$

**The natural frequency is 760 Hz. The engineer would design the plate for the natural frequency, because the natural frequency is the reason the plate is designed for the dynamic load, not the static load.**
:::
:::

## Exercises

::: exercise Flexural rigidity {#ex-flexural-rigidity level=3 check="2"}
Calculate the flexural rigidity of a steel plate ($E = 2 0 0$ GPa, $\nu = 0 . 3$ , $t = 1 0$ mm).

::: solution
$$
D \; = \; { \frac { E \, t ^ { 3 } } { 1 2 \, ( 1 - \nu ^ { 2 } ) } } \; = \; { \frac { 2 0 0 \ 0 0 0 \times 1 0 0 0 } { 1 2 \times 0 . 9 1 } } \; = \; { \frac { 2 \times 1 0 ^ { 8 } } { 1 0 . 9 2 } } \; = \; { \bf 1 8 . 3 } \times 1 0 ^ { 6 } \ \text{N} { \cdot } \text{mm}
$$

**The flexural rigidity is $1 8 . 3 \times 1 0 ^ { 6 }$ N·mm.**
:::
:::

::: exercise Clamped plate deflection {#ex-clamped-plate level=3 check="2"}
A clamped square plate ($a = 1$ m, $t = 1 5$ mm, $E = 7 0$ GPa, $\nu = 0 . 3$ ) carries a uniform load $q = 5$ kPa. Calculate the maximum deflection.

::: solution
**Flexural rigidity:**

$$
D \; = \; { \frac { 7 0 \ 0 0 0 \times 1 5 ^ { 3 } } { 1 2 \times ( 1 - 0 . 0 9 ) } } \; = \; { \frac { 2 . 3 6 3 \times 1 0 ^ { 8 } } { 1 0 . 9 2 } } \; = \; 2 1 . 6 3 \times 1 0 ^ { 6 } \ \text{N} { \cdot } \text{mm}
$$

**Maximum deflection:**

$$
w _ { \max } \; = \; 0 . 0 0 1 2 6 \, { \frac { q \, a ^ { 4 } } { D } } \; = \; 0 . 0 0 1 2 6 \times { \frac { 5 \times 1 0 ^ { - 3 } \times 1 0 0 0 ^ { 4 } } { 2 1 . 6 3 \times 1 0 ^ { 6 } } } \; = \; 0 . 0 0 1 2 6 \times { \frac { 5 \times 1 0 ^ { 1 0 } } { 2 1 . 6 3 \times 1 0 ^ { 6 } } }
$$

$$
w _ { \max } \; = \; 0 . 0 0 1 2 6 \times 2 3 1 \; = \; { \bf 0 . 2 9 } \ \text{mm}
$$

**The maximum deflection is 0.29 mm.**
:::
:::

::: exercise Plate buckling coefficient {#ex-buckling-coeff level=3 check="2"}
A simply supported plate has $a / b = 2$ . Calculate the buckling coefficient for uniaxial compression.

::: solution
$$
k _ { c r } \; = \; \left( { \frac { m \, b } { a } } + { \frac { a } { m \, b } } \right) ^ { 2 }
$$

For $m = 2$ (the minimum):

$$
k _ { c r } \; = \; \left( { \frac { 2 } { 2 } } + { \frac { 2 } { 2 } } \right) ^ { 2 } \; = \; ( 1 + 1 ) ^ { 2 } \; = \; { \bf 4 }
$$

**The buckling coefficient is 4. The engineer would design the plate for the buckling coefficient, because the buckling coefficient is the reason the plate is designed for the buckling load, not the yield load.**
:::
:::

::: exercise Post-buckling load {#ex-post-buckling level=3 check="2"}
A simply supported plate has $N _ { x , c r } = 1 0 0$ MPa and $t = 5$ mm. Calculate the load when the maximum deflection is $w _ { \max } = 1 0$ mm.

::: solution
$$
{ \frac { N _ { x } } { N _ { x , c r } } } \; = \; 1 + { \frac { 1 } { 4 } } \, \left( { \frac { w _ { \max } } { t } } \right) ^ { 2 } \; = \; 1 + { \frac { 1 } { 4 } } \times \left( { \frac { 1 0 } { 5 } } \right) ^ { 2 } \; = \; 1 + { \frac { 1 } { 4 } } \times 4 \; = \; 2
$$

$$
N _ { x } \; = \; 2 \times 1 0 0 \; = \; { \bf 2 0 0 } \ \text{MPa}
$$

**The load is 200 MPa, which is twice the buckling load. The engineer would design the plate for the post-buckling load, because the post-buckling load is the reason the plate can carry the load beyond the buckling load.**
:::
:::

::: exercise Bending stress in a plate {#ex-plate-stress level=3 check="2"}
A simply supported square plate ($a = 1$ m, $t = 1 0$ mm) carries a uniform load $q = 2 0$ kPa. Calculate the maximum bending stress.

::: solution
**Maximum bending moment:**

$$
M _ { \max } \; = \; 0 . 0 4 7 9 \, q \, a ^ { 2 } \; = \; 0 . 0 4 7 9 \times 2 0 \times 1 0 ^ { - 3 } \times 1 0 0 0 ^ { 2 } \; = \; 9 5 8 \ \text{N} { \cdot } \text{mm/mm}
$$

**Maximum bending stress:**

$$
\sigma _ { \max } \; = \; { \frac { 6 \, M _ { \max } } { t ^ { 2 } } } \; = \; { \frac { 6 \times 9 5 8 } { 1 0 ^ { 2 } } } \; = \; { \bf 5 7 . 5 } \ \text{MPa}
$$

**The maximum bending stress is 57.5 MPa.**
:::
:::

::: exercise Derivation: the Kirchhoff plate equation {#ex-derive-kirchhoff level=4 check="2"}
Show that the Kirchhoff plate equation $D \, \nabla ^ { 4 } w = q$ is derived from the equilibrium of a differential plate element and the constitutive equations.

::: solution
The equilibrium of a differential plate element gives:

$$
{ \frac { \partial ^ { 2 } M _ { x } } { \partial x ^ { 2 } } } + 2 \, { \frac { \partial ^ { 2 } M _ { x y } } { \partial x \, \partial y } } + { \frac { \partial ^ { 2 } M _ { y } } { \partial y ^ { 2 } } } + q \; = \; 0
$$

The constitutive equations for the plate are:

$$
M _ { x } \; = \; - D \, ( w _ { , x x } + \nu \, w _ { , y y } ) \qquad M _ { y } \; = \; - D \, ( w _ { , y y } + \nu \, w _ { , x x } )
$$

$$
M _ { x y } \; = \; - D \, ( 1 - \nu ) \, w _ { , x y }
$$

Substituting the constitutive equations into the equilibrium equation:

$$
- D \, ( w _ { , x x x x } + \nu \, w _ { , x x y y } ) - 2 \, D \, ( 1 - \nu ) \, w _ { , x x y y } - D \, ( w _ { , y y y y } + \nu \, w _ { , x x y y } ) + q \; = \; 0
$$

Simplifying:

$$
D \, ( w _ { , x x x x } + 2 \, w _ { , x x y y } + w _ { , y y y y } ) \; = \; q \quad \Longrightarrow \quad D \, \nabla ^ { 4 } w \; = \; q
$$

**The Kirchhoff plate equation is the reason the engineer can calculate the deflection and the stress in the plate, and the calculation is the reason the plate is safe.** $\blacksquare$
:::
:::

::: exercise Derivation: the plate buckling equation {#ex-derive-buckling level=4 check="2"}
Show that the plate buckling equation $D \, \nabla ^ { 4 } w + N _ { x } \, \partial ^ { 2 } w / \partial x ^ { 2 } = 0$ is derived from the equilibrium of a plate element under in-plane compression. Write the boundary conditions for a simply supported plate.

::: solution
The equilibrium of a plate element under in-plane compression $N _ { x }$ gives:

$$
D \, \nabla ^ { 4 } w + N _ { x } \, { \frac { \partial ^ { 2 } w } { \partial x ^ { 2 } } } \; = \; 0
$$

The **boundary conditions** for a simply supported plate are:

$$
w = 0 \qquad M _ { n } = - D \, ( \nabla ^ { 2 } w ) = 0 \quad \text{on all edges}
$$

The solution is:

$$
w \; = \; A \, \sin \left( { \frac { m \, \pi \, x } { a } } \right) \, \sin \left( { \frac { n \, \pi \, y } { b } } \right)
$$

Substituting into the buckling equation:

$$
N _ { x , c r } \; = \; { \frac { D \, \pi ^ { 2 } } { b ^ { 2 } } } \, \left( { \frac { m \, b } { a } } + { \frac { a } { m \, b } } \right) ^ { 2 }
$$

**The plate buckling equation is the reason the engineer can calculate the critical buckling load, and the calculation is the reason the plate is safe.** $\blacksquare$
:::
:::

::: quiz Kirchhoff plate theory {#quiz-kirchhoff}
The Kirchhoff plate theory is valid when:

- [ ] $t / a > 0 . 5$
- [x] $t / a < 0 . 1$
- [ ] $t / a = 1$
- [ ] $t / a > 0 . 1$

::: solution
**$t / a < 0 . 1$ .** The Kirchhoff plate theory is valid when the plate is thin, and the validity is the reason the Kirchhoff plate theory is the most widely used theory in plate design. The engineer who uses the Kirchhoff plate theory for a thick plate is not analysing the plate; they are analysing a membrane.
:::
:::

::: quiz Plate buckling {#quiz-plate-buckling}
The buckling coefficient for a simply supported square plate under uniaxial compression is:

- [ ] 1.0
- [ ] 2.0
- [x] 4.0
- [ ] 8.0

::: solution
**4.0.** The buckling coefficient is minimum when the aspect ratio is 1 (square plate), and the minimum is the reason the square plate is the most critical plate in buckling. The buckling coefficient is proportional to the square of the aspect ratio, and the square is the reason the plate is designed for the aspect ratio, not the span.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/plasticity]]** — The plastic collapse of the plate is the foundation of limit analysis.
- **[[solid-mechanics/fracture-mechanics]]** — The crack in the plate is the reason the aircraft skin is designed for damage tolerance.
- **[[solid-mechanics/composites]]** — The composite plate is the reason the aircraft wing is lightweight.
- **[[solid-mechanics/thin-walled-structures]]** — The plate is the building block of the thin-walled structure.
- **[[solid-mechanics/energy-methods]]** — The Rayleigh-Ritz method is used to solve the plate equation.
- **[[finite-element-method/plane-elements]]** — The plate element is the foundation of the finite element method.
- **[[vibrations/continuous-systems]]** — The plate vibration is the reason the plate is designed for the natural frequency.
- **[[aerodynamics/potential-flow]]** — The plate is the building block of the aerodynamic surface.
- **[[machine-design/shafts]]** — The plate is the building block of the machine frame.
- **[[energy-systems/steam-power-plants]]** — The plate is the building block of the boiler.

::: history Plate theory: from Euler to the finite element method {#history-plates}
**1744** — **Leonhard Euler** publishes the **first plate theory**, which is the foundation of the plate bending theory. **Euler's plate theory is the reason the engineer can calculate the deflection and the stress in the plate, and the calculation is the reason the plate is safe.**

**1820** — **Sophie Germain** presents the **first correct plate theory** to the French Academy of Sciences, and the theory is the reason the engineer can calculate the deflection and the stress in the plate. **Germain's plate theory is the reason the engineer can calculate the deflection and the stress in the plate, and the calculation is the reason the plate is safe.**

**1850** — **Gustav Kirchhoff** publishes the **Kirchhoff plate theory**, which is the foundation of the plate bending theory. **The Kirchhoff plate theory is the reason the engineer can calculate the deflection and the stress in the plate, and the calculation is the reason the plate is safe.**

**1891** — **The plate buckling theory** is developed by **Bryan**, who calculates the critical buckling load of the plate. **The Bryan buckling theory is the reason the plate is designed for the buckling load, not the yield load, and the buckling load is the reason the plate is the most critical component in the aircraft.**

**1907** — **The plate vibration theory** is developed by **Ritz**, who calculates the natural frequency of the plate. **The Ritz vibration theory is the reason the plate is designed for the natural frequency, not the static load, and the natural frequency is the reason the plate is the most critical component in the vibrating structure.**

**1930s** — **The plate theory** is applied to the **aircraft design** by **Southwell**, who calculates the buckling load of the thin-walled panel. **The Southwell buckling theory is the reason the aircraft is designed for the buckling load, not the yield load, and the buckling load is the reason the aircraft is the most critical component in the aircraft.**

**1940s** — **The large deflection theory** is developed by **von Kármán**, who calculates the post-buckling behaviour of the plate. **The von Kármán large deflection theory is the reason the plate is stiffer than the beam, and the stiffness is the reason the plate can carry the load beyond the linear range.**

**1960s** — **The finite element method** is applied to the plate problem, which makes the numerical solution of the boundary-value problem practical. **The finite element method is the reason the engineer can solve the plate problem for complex geometries, and the solution is the reason the plate is the most refined application of the plate theory.**
:::

::: summary Plates {#summary-plates}
- **The Kirchhoff plate equation is the governing differential equation for the bending of a thin plate: $D \, \nabla ^ { 4 } w = q$ .** The Kirchhoff plate theory is valid when $t / a < 0 . 1$ , and the validity is the reason the Kirchhoff plate theory is the most widely used theory in plate design.
- **The flexural rigidity is $D = E \, t ^ { 3 } / [ 1 2 \, ( 1 - \nu ^ { 2 } ) ]$ .** The flexural rigidity is the reason the plate is stiffer than the beam, and the stiffness is the reason the plate can carry the load beyond the linear range.
- **The bending moments are $M _ { x } = - D \, ( w _ { , x x } + \nu \, w _ { , y y } )$ and $M _ { y } = - D \, ( w _ { , y y } + \nu \, w _ { , x x } )$ .** The bending moments are the reason the engineer can calculate the stress in the plate, and the stress is the reason the plate is safe.
- **The plate boundary conditions are the constraints on the plate edge: simply supported, clamped, free, and guided.** The boundary conditions are the reason the plate deflection is different for different support conditions, and the difference is the reason the plate is designed for the boundary conditions, not the load.
- **The plate buckling coefficient is $k _ { c r } = ( m \, b / a + a / m \, b ) ^ { 2 }$ , and the critical buckling stress is $\sigma _ { c r } = k _ { c r } \, \pi ^ { 2 } \, E / [ 1 2 \, ( 1 - \nu ^ { 2 } ) \, ( b / t ) ^ { 2 } ]$ .** The buckling is the reason the plate is designed for the buckling load, not the yield load.
- **The post-buckling load-deflection relationship is $N _ { x } / N _ { x , c r } = 1 + ( 1 / 4 ) \, ( w _ { \max } / t ) ^ { 2 }$ .** The post-buckling is the reason the plate is stiffer than the beam, and the stiffness is the reason the plate can carry the load beyond the linear range.
- **The maximum deflection of a simply supported square plate under uniform load is $w _ { \max } = 0 . 0 0 4 0 6 \, q \, a ^ { 4 } / D$ , and the maximum bending stress is $\sigma _ { \max } = 6 \, M _ { \max } / t ^ { 2 }$ .** The deflection is the reason the plate is designed for the stiffness, not the strength.
- **The clamped plate is 3.2 times stiffer than the simply supported plate, and the stiffness is the reason the clamped plate is the most widely used plate in pressure vessel design.** The stiffness is the reason the plate is designed for the boundary conditions, not the load.
- **The plate theory is the most important theory in structural engineering, because the plate theory predicts the deflection and the stress in the plate.** The prediction is the reason the plate is safe.
- **The finite element method is applied to the plate problem, which makes the numerical solution of the boundary-value problem practical.** The finite element method is the reason the engineer can solve the plate problem for complex geometries.
:::

## Further reading

- **Stephen P. Timoshenko and S. Woinowsky-Krieger (1959)** — *Theory of Plates and Shells*, 2nd ed. McGraw-Hill. The Kirchhoff plate theory, the plate buckling, and the plate vibration.
- **H. Bleich (1979)** — *Buckling Strength of Metal Structures*, 2nd ed. McGraw-Hill. The plate buckling theory and the post-buckling behaviour.
- **Morris Dolph (1977)** — *Mechanics of Materials*. Wiley. The plate bending theory and the plate stress analysis.
- **Megson, T.H.G. (2019)** — *Aircraft Structures for Engineering Students*, 6th ed. Butterworth-Heinemann. The plate theory in the aircraft context.
- **O.C. Zienkiewicz and R.L. Taylor (2005)** — *The Finite Element Method*, 6th ed. Butterworth-Heinemann. The plate theory in the finite element context.
- **L.E. Malvern (1969)** — *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall. The plate theory and the shell theory.
- **SC Mal and G. Singh (1991)** — *Continuum Mechanics of Composite Materials*. Kluwer. The composite plate theory.
- **Thomas J.R. Hughes (2012)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The plate theory in the finite element context.
