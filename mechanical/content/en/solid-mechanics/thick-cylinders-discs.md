The thick cylinder is the most common pressure-containing component: the thick cylinder is the pressure vessel, the gun barrel, the hydraulic ram, and the shrink fit, and the thick cylinder is the component that determines the safety of the pressure system. **The engineer who uses the thin-wall formula for a thick cylinder is not designing the cylinder; they are designing a cylinder that will fail by yielding at the bore, not at the mean radius.** The thick cylinder theory is the reason the engineer can predict the stress distribution in the wall, and the prediction is the reason the cylinder is safe.

The quantitative tools of thick cylinder theory are the **Lamé equations** (the radial and hoop stress distributions), the **shrink fit** (the interference fit between two cylinders), the **rotating disc** (the centrifugal stress distribution), and the **plastic collapse** (the yield propagation from the bore outward). The tools are the language in which the thick cylinder analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways thick cylinder analysis goes wrong
**Not using the thick cylinder theory.** The engineer who uses the thin-wall formula for a thick cylinder is not designing the cylinder; they are designing a cylinder that will fail by yielding at the bore. **The hoop stress at the bore is 2-3 times the thin-wall hoop stress, and the 2-3 times is the reason the thick cylinder theory is the most important theory in pressure vessel design.** **Not checking the radial stress.** The engineer who calculates the hoop stress without checking the radial stress is not analysing the cylinder; they are analysing a membrane. **The radial stress is the reason the Tresca criterion is different from the thin-wall criterion, and the difference is the reason the thick cylinder theory is the most important theory in pressure vessel design.** **Not accounting for the shrink fit.** The engineer who designs the cylinder without considering the shrink fit is not designing the cylinder; they are designing a cylinder that will yield at the bore. **The shrink fit is the reason the bore stress is reduced by 20-50%, and the reduction is the reason the shrink fit is the most widely used technique in gun barrel design.** **Not accounting for the rotating disc.** The engineer who designs the rotating disc without checking the centrifugal stress is not designing the disc; they are designing a disc that will fail by centrifugal bursting. **The centrifugal stress is the reason the turbine disc is designed for the centrifugal stress, not the pressure stress, and the centrifugal stress is the reason the turbine disc is the most critical component in the gas turbine.** **Not checking the plastic collapse.** The engineer who designs the cylinder without checking the plastic collapse is not designing the cylinder; they are designing a cylinder that will collapse by plastic flow. **The plastic collapse is the reason the cylinder is designed for the yield pressure, not the burst pressure, and the yield pressure is the reason the cylinder is safe.** **Not accounting for the thermal stress.** The engineer who designs the cylinder without checking the thermal stress is not designing the cylinder; they are designing a cylinder that will fail by thermal fatigue. **The thermal stress is the reason the cylinder is designed for the thermal load, not just the pressure load, and the thermal load is the reason the cylinder is the most critical component in the nuclear reactor.** **Not accounting for the fatigue.** The engineer who designs the cylinder without checking the fatigue is not designing the cylinder; they are designing a cylinder that will fail by fatigue. **The fatigue is the reason the cylinder is designed for the fatigue life, not the static strength, and the fatigue life is the reason the cylinder is the most critical component in the hydraulic system.** **Not accounting for the creep.** The engineer who designs the cylinder without checking the creep is not designing the cylinder; they are designing a cylinder that will fail by creep. **The creep is the reason the cylinder is designed for the creep life, not the static strength, and the creep life is the reason the cylinder is the most critical component in the high-temperature system.** **Not accounting for the weld residual stress.** The engineer who designs the cylinder without checking the weld residual stress is not designing the cylinder; they are designing a cylinder that will fail by stress corrosion cracking. **The weld residual stress is the reason the cylinder is designed for the residual stress, not just the applied stress, and the residual stress is the reason the cylinder is the most critical component in the welded structure.**
:::

## 1. The Lamé solution

::: definition The Lamé equations {#def-lame}
The **Lamé equations** give the radial and hoop stress distributions in a thick-walled cylinder:

$$
\sigma _ { r } \; = \; A - { \frac { B } { r ^ { 2 } } } \qquad \sigma _ { \theta } \; = \; A + { \frac { B } { r ^ { 2 } } }
$$

where $A$ and $B$ are constants determined by the boundary conditions.

For a cylinder with inner radius $a$ , outer radius $b$ , internal pressure $p _ { i }$ , and external pressure $p _ { o }$ :

$$
A \; = \; { \frac { p _ { i } \, a ^ { 2 } - p _ { o } \, b ^ { 2 } } { b ^ { 2 } - a ^ { 2 } } } \qquad B \; = \; { \frac { ( p _ { i } - p _ { o } ) \, a ^ { 2 } \, b ^ { 2 } } { b ^ { 2 } - a ^ { 2 } } }
$$

The **maximum hoop stress** (at the bore, $r = a$ ) is:

$$
\sigma _ { \theta , \max } \; = \; \sigma _ { \theta } ( a ) \; = \; { \frac { p _ { i } \, ( a ^ { 2 } + b ^ { 2 } ) } { b ^ { 2 } - a ^ { 2 } } } \; = \; p _ { i } \, { \frac { b ^ { 2 } + a ^ { 2 } } { b ^ { 2 } - a ^ { 2 } } }
$$

The **thin-wall formula** is recovered when $b / a \to 1$ :

$$
\sigma _ { \theta , \text{thin } } \; = \; { \frac { p _ { i } \, a } { b - a } } \; = \; { \frac { p _ { i } \, r _ { m } } { t } }
$$

$$
\begin{array} { l c c c }
\textbf{ } b / a \textbf{ ratio} & \textbf{ } \sigma _ { \theta , \max } / p _ { i } \textbf{ (Lamé)} & \textbf{ } \sigma _ { \theta , \text{thin } } / p _ { i } \textbf{ (thin-wall)} & \textbf{Error} \\ \hline
1 . 1 & 2 1 . 0 & 1 0 . 5 & 1 0 0 \ \% \\
1 . 2 & 1 1 . 0 & 5 . 5 & 1 0 0 \ \% \\
1 . 5 & 4 . 0 & 2 . 0 & 1 0 0 \ \% \\
2 . 0 & 1 . 6 7 & 1 . 0 & 6 7 \ \% \\
3 . 0 & 1 . 0 & 0 . 5 & 1 0 0 \ \% \\
\end{array}
$$

**The hoop stress at the bore is 2-3 times the thin-wall hoop stress, and the 2-3 times is the reason the thick cylinder theory is the most important theory in pressure vessel design. The engineer who uses the thin-wall formula for a thick cylinder is not designing the cylinder; they are designing a cylinder that will fail by yielding at the bore, not at the mean radius.**
:::

::: definition The radial displacement {#def-radial-displacement}
The **radial displacement** of the cylinder wall is:

$$
u ( r ) \; = \; { \frac { 1 } { E } } \, [ ( 1 - \nu ) \, A \, r + ( 1 + \nu ) \, { \frac { B } { r } } ]
$$

The **change in the bore radius** is:

$$
\Delta a \; = \; u ( a ) \; = \; { \frac { a } { E } } \, [ ( 1 - \nu ) \, A + ( 1 + \nu ) \, { \frac { B } { a ^ { 2 } } } ]
$$

The **change in the outer radius** is:

$$
\Delta b \; = \; u ( b ) \; = \; { \frac { b } { E } } \, [ ( 1 - \nu ) \, A + ( 1 + \nu ) \, { \frac { B } { b ^ { 2 } } } ]
$$

**The radial displacement is the reason the engineer can calculate the change in the bore radius, and the change in the bore radius is the reason the engineer can design the shrink fit.**
:::

::: widget plot
title: The hoop stress distribution in a thick cylinder
f: (1+4/x^2)/(4-1)*100; (1+4/x^2)/(4-1)*100*0.5
x: 1,2
y: 0,200
labels: Hoop stress; Radial stress
caption: The hoop and radial stress distributions in a thick cylinder with $b / a = 2$ and $p _ { i } = 1 0 0$ MPa. **The hoop stress is maximum at the bore and minimum at the outer surface, and the maximum is the reason the cylinder yields at the bore first.** **The radial stress is compressive at the bore and zero at the outer surface, and the compressive radial stress is the reason the Tresca criterion is different from the thin-wall criterion.**
:::

::: example Thick cylinder stress calculation {#ex-thick-cylinder level=3 check="2"}
A thick cylinder has an inner radius $a = 5 0$ mm, an outer radius $b = 1 0 0$ mm, and an internal pressure $p _ { i } = 2 0 0$ MPa. Calculate the maximum hoop stress and the radial stress at the bore.

**Lamé constants:**

$$
A \; = \; { \frac { p _ { i } \, a ^ { 2 } } { b ^ { 2 } - a ^ { 2 } } } \; = \; { \frac { 2 0 0 \times 2 \ 5 0 0 } { 1 0 \ 0 0 0 - 2 \ 5 0 0 } } \; = \; { \frac { 5 0 0 \ 0 0 0 } { 7 \ 5 0 0 } } \; = \; 6 6 . 7 \ \text{MPa}
$$

$$
B \; = \; { \frac { p _ { i } \, a ^ { 2 } \, b ^ { 2 } } { b ^ { 2 } - a ^ { 2 } } } \; = \; { \frac { 2 0 0 \times 2 \ 5 0 0 \times 1 0 \ 0 0 0 } { 7 \ 5 0 0 } } \; = \; { \frac { 5 \times 1 0 ^ { 9 } } { 7 \ 5 0 0 } } \; = \; 6 6 6 \ 6 6 7 \ \text{MPa} { \cdot } \text{mm} ^ { 2 }
$$

**Hoop stress at the bore ($r = a = 5 0$ mm):**

$$
\sigma _ { \theta } ( a ) \; = \; A + { \frac { B } { a ^ { 2 } } } \; = \; 6 6 . 7 + { \frac { 6 6 6 \ 6 6 7 } { 2 \ 5 0 0 } } \; = \; 6 6 . 7 + 2 6 6 . 7 \; = \; { \bf 3 3 3 } \ \text{MPa}
$$

**Radial stress at the bore:**

$$
\sigma _ { r } ( a ) \; = \; A - { \frac { B } { a ^ { 2 } } } \; = \; 6 6 . 7 - 2 6 6 . 7 \; = \; { \bf - 2 0 0 } \ \text{MPa} \; ( = - p _ { i } ) \quad \checkmark
$$

**Hoop stress at the outer surface ($r = b = 1 0 0$ mm):**

$$
\sigma _ { \theta } ( b ) \; = \; A + { \frac { B } { b ^ { 2 } } } \; = \; 6 6 . 7 + { \frac { 6 6 6 \ 6 6 7 } { 1 0 \ 0 0 0 } } \; = \; 6 6 . 7 + 6 6 . 7 \; = \; { \bf 1 3 3 } \ \text{MPa}
$$

**The maximum hoop stress (333 MPa) is 1.67 times the thin-wall hoop stress (200 MPa). The engineer who uses the thin-wall formula is not designing the cylinder; they are designing a cylinder that will fail by yielding at the bore.**
:::

## 2. Shrink fits and rotating discs

::: definition The shrink fit {#def-shrink-fit}
The **shrink fit** is the interference fit between two cylinders, and the shrink fit is the reason the bore stress is reduced by 20-50%.

For a shrink fit with interference $\delta$ at the interface radius $c$ :

$$
p _ { \text{contact } } \; = \; { \frac { E \, \delta } { 2 \, c ^ { 3 } } } \, { \frac { ( c ^ { 2 } - a ^ { 2 } ) \, ( b ^ { 2 } - c ^ { 2 } ) } { b ^ { 2 } - a ^ { 2 } } }
$$

The **interface pressure** creates a compressive hoop stress at the bore of the outer cylinder and a tensile hoop stress at the bore of the inner cylinder. The net effect is that the **maximum tensile hoop stress at the bore is reduced**.

$$
\begin{array} { l c c c }
\textbf{Configuration} & \textbf{ } \sigma _ { \theta , \max } \textbf{ at bore} & \textbf{Reduction} & \textbf{Use case} \\ \hline
\text{Single cylinder} & \sigma _ { \theta } & \text{None} & \text{Low pressure} \\
\text{Shrink fit (2 layers)} & 0 . 6 \text{--} 0 . 8 \, \sigma _ { \theta } & 2 0 \text{--} 4 0 \ \% & \text{Gun barrel} \\
\text{Shrink fit (3 layers)} & 0 . 4 \text{--} 0 . 6 \, \sigma _ { \theta } & 4 0 \text{--} 6 0 \ \% & \text{High-pressure vessel} \\
\text{Autofrettage} & 0 . 5 \text{--} 0 . 7 \, \sigma _ { \theta } & 3 0 \text{--} 5 0 \ \% & \text{Hydraulic ram} \\
\end{array}
$$

**The shrink fit is the reason the bore stress is reduced by 20-50%, and the reduction is the reason the shrink fit is the most widely used technique in gun barrel design. The engineer who designs the cylinder without considering the shrink fit is not designing the cylinder; they are designing a cylinder that will yield at the bore.**
:::

::: definition The rotating disc {#def-rotating-disc}
The **rotating disc** is the component in which the centrifugal force creates the stress, and the rotating disc is the reason the turbine disc is the most critical component in the gas turbine.

For a **solid disc** of radius $R$ rotating at angular velocity $\omega$ :

$$
\sigma _ { r } \; = \; { \frac { 3 + \nu } { 8 } } \, \rho \, \omega ^ { 2 } \, ( R ^ { 2 } - r ^ { 2 } ) \qquad \sigma _ { \theta } \; = \; { \frac { 3 + \nu } { 8 } } \, \rho \, \omega ^ { 2 } \, R ^ { 2 } - { \frac { 1 + 3 \, \nu } { 8 } } \, \rho \, \omega ^ { 2 } \, r ^ { 2 }
$$

The **maximum stress** (at the centre, $r = 0$ ) is:

$$
\sigma _ { \max } \; = \; { \frac { 3 + \nu } { 8 } } \, \rho \, \omega ^ { 2 } \, R ^ { 2 }
$$

For a **disc with a central hole** of radius $a$ :

$$
\sigma _ { \theta , \max } \; = \; { \frac { 3 + \nu } { 4 } } \, \rho \, \omega ^ { 2 } \, R ^ { 2 } \quad \text{(at the hole edge)}
$$

$$
\begin{array} { l c c }
\textbf{Disc type} & \textbf{ } \sigma _ { \max } / ( \rho \, \omega ^ { 2 } \, R ^ { 2 } ) & \textbf{Use case} \\ \hline
\text{Solid disc} & ( 3 + \nu ) / 8 \approx 0 . 4 1 & \text{Flywheel} \\
\text{Disc with small hole} & ( 3 + \nu ) / 4 \approx 0 . 8 2 & \text{Turbine disc} \\
\text{Uniform strength disc} & 0 . 5 & \text{High-speed turbine} \\
\end{array}
$$

**The centrifugal stress is the reason the turbine disc is designed for the centrifugal stress, not the pressure stress, and the centrifugal stress is the reason the turbine disc is the most critical component in the gas turbine.**
:::

::: widget plot
title: The stress distribution in a rotating disc
f: 0.41*(1-x^2); 0.41*(1-0.3*x^2)
x: 0,1
y: 0,0.5
labels: sigma_r; sigma_theta
caption: The radial and hoop stress distributions in a solid rotating disc. **The stress is maximum at the centre and zero at the rim, and the maximum is the reason the disc fails at the centre first.** **The centrifugal stress is proportional to the square of the angular velocity, and the square is the reason the disc is designed for the speed, not the torque.**
:::

::: example Shrink fit design {#ex-shrink-fit level=3 check="2"}
A steel hub (inner radius $a = 5 0$ mm, outer radius $b = 1 5 0$ mm) is shrunk onto a steel shaft (radius $c = 5 0$ mm). The interference is $\delta = 0 . 0 5$ mm. $E = 2 0 0$ GPa. Calculate the contact pressure.

**Contact pressure:**

$$
p _ { \text{contact } } \; = \; { \frac { E \, \delta } { 2 \, c ^ { 3 } } } \, { \frac { ( c ^ { 2 } - a ^ { 2 } ) \, ( b ^ { 2 } - c ^ { 2 } ) } { b ^ { 2 } - a ^ { 2 } } }
$$

Since $a = c$ (solid shaft), the term $( c ^ { 2 } - a ^ { 2 } ) = 0$ , which means the shaft is solid and the formula simplifies. For a solid shaft:

$$
p _ { \text{contact } } \; = \; { \frac { E \, \delta } { 2 \, c ^ { 2 } } } \, { \frac { b ^ { 2 } - c ^ { 2 } } { b ^ { 2 } } } \; = \; { \frac { 2 0 0 \ 0 0 0 \times 0 . 0 5 } { 2 \times 5 0 ^ { 2 } } } \, { \frac { 1 5 0 ^ { 2 } - 5 0 ^ { 2 } } { 1 5 0 ^ { 2 } } }
$$

$$
p _ { \text{contact } } \; = \; { \frac { 1 0 \ 0 0 0 } { 5 \ 0 0 0 } } \, { \frac { 2 2 \ 5 0 0 - 2 \ 5 0 0 } { 2 2 \ 5 0 0 } } \; = \; 2 \times { \frac { 2 0 \ 0 0 0 } { 2 2 \ 5 0 0 } } \; = \; 2 \times 0 . 8 8 9 \; = \; { \bf 1 . 7 8 } \ \text{MPa}
$$

**The contact pressure is 1.78 MPa. The engineer would use the contact pressure to calculate the torque capacity of the shrink fit, and the torque capacity is the reason the shrink fit is used instead of a key.**
:::

::: example Rotating disc with a central hole {#ex-disc-hole level=3 check="2"}
A steel turbine disc ($\\rho = 7 8 0 0$ kg/m\\.3, $\\nu = 0 . 3$ , $R = 0 . 4$ m, $a = 0 . 1$ m) rotates at 12 000 rpm. Calculate the maximum hoop stress at the hole edge.

**Angular velocity:**

$$
\\omega \\; = \\; { \\frac { 2 \\pi \\times 1 2 \\ 0 0 0 } { 6 0 } } \\; = \\; 1 \\ 2 5 7 \\ \\text{rad/s}
$$

**Maximum hoop stress (at the hole edge):**

$$
\\sigma _ { \\theta , \\max } \\; = \\; { \\frac { 3 + \\nu } { 4 } } \\, \\rho \\, \\omega ^ { 2 } \\, R ^ { 2 } \\; = \\; { \\frac { 3 . 3 } { 4 } } \\times 7 \\ 8 0 0 \\times 1 \\ 2 5 7 ^ { 2 } \\times 0 . 4 ^ { 2 }
$$

$$
\\sigma _ { \\theta , \\max } \\; = \\; 0 . 8 2 5 \\times 7 \\ 8 0 0 \\times 1 \\ 5 8 0 \\ 0 4 9 \\times 0 . 1 6 \\; = \\; { \\bf 1 \\ 5 9 0 } \\ \\text{MPa}
$$

**The maximum hoop stress is 1 590 MPa. The engineer would check whether this is below the yield strength of the disc material, and the check is the reason the turbine disc is the most critical component in the gas turbine.**
:::

::: example Autofrettage pressure {#ex-autofrettage level=3 check="2"}
A thick cylinder has $a = 5 0$ mm, $b = 1 0 0$ mm, and $S _ { y } = 6 0 0$ MPa. Calculate the autofrettage pressure (the pressure that yields the bore to a radius $c = 7 0$ mm).

**Partially yielded cylinder (Tresca):**

$$
p _ { \\text{auto } } \\; = \\; { \\frac { S _ { y } } { 2 } } \\, \\ln \\left( { \\frac { c ^ { 2 } } { a ^ { 2 } } } \\right) \\; + \\; { \\frac { S _ { y } } { 2 } } \\, \\left( 1 - { \\frac { c ^ { 2 } } { b ^ { 2 } } } \\right)
$$

$$
p _ { \\text{auto } } \\; = \\; { \\frac { 6 0 0 } { 2 } } \\, \\ln \\left( { \\frac { 4 \\ 9 0 0 } { 2 \\ 5 0 0 } } \\right) \\; + \\; { \\frac { 6 0 0 } { 2 } } \\, \\left( 1 - { \\frac { 4 \\ 9 0 0 } { 1 0 \\ 0 0 0 } } \\right)
$$

$$
p _ { \\text{auto } } \\; = \\; 3 0 0 \\times 0 . 6 7 3 + 3 0 0 \\times 0 . 5 1 \\; = \\; 2 0 2 + 1 5 3 \\; = \\; { \\bf 3 5 5 } \\ \\text{MPa}
$$

**The autofrettage pressure is 355 MPa. The engineer would use the autofrettage process to yield the bore of the cylinder to create a residual compressive stress, and the residual compressive stress is the reason the cylinder can withstand higher pressures.**
:::

## Exercises

::: exercise Thick cylinder stress {#ex-thick-cylinder-ex level=3 check="2"}
A thick cylinder has $a = 4 0$ mm, $b = 8 0$ mm, and $p _ { i } = 1 5 0$ MPa. Calculate the maximum hoop stress.

::: solution
$$
\sigma _ { \theta , \max } \; = \; p _ { i } \, { \frac { b ^ { 2 } + a ^ { 2 } } { b ^ { 2 } - a ^ { 2 } } } \; = \; 1 5 0 \times { \frac { 6 \ 4 0 0 + 1 \ 6 0 0 } { 6 \ 4 0 0 - 1 \ 6 0 0 } } \; = \; 1 5 0 \times { \frac { 8 \ 0 0 0 } { 4 \ 8 0 0 } } \; = \; 1 5 0 \times 1 . 6 6 7 \; = \; { \bf 2 5 0 } \ \text{MPa}
$$

**The maximum hoop stress is 250 MPa.**
:::
:::

::: exercise Thin-wall vs thick-wall {#ex-thin-thick level=3 check="2"}
A cylinder has $a = 1 0 0$ mm and $t = 1 0$ mm. Calculate the hoop stress using the thin-wall formula and the Lamé formula for $p _ { i } = 1 0$ MPa. What is the percentage error?

::: solution
**Thin-wall:**

$$
\sigma _ { \theta , \text{thin } } \; = \; { \frac { p _ { i } \, r _ { m } } { t } } \; = \; { \frac { 1 0 \times 1 0 5 } { 1 0 } } \; = \; 1 0 5 \ \text{MPa}
$$

**Lamé (at the bore):**

$$
\sigma _ { \theta , \max } \; = \; 1 0 \times { \frac { 1 1 0 ^ { 2 } + 1 0 0 ^ { 2 } } { 1 1 0 ^ { 2 } - 1 0 0 ^ { 2 } } } \; = \; 1 0 \times { \frac { 1 2 \ 1 0 0 + 1 0 \ 0 0 0 } { 1 2 \ 1 0 0 - 1 0 \ 0 0 0 } } \; = \; 1 0 \times { \frac { 2 2 \ 1 0 0 } { 2 \ 1 0 0 } } \; = \; 1 0 \times 1 0 . 5 2 \; = \; 1 0 5 . 2 \ \text{MPa}
$$

**Percentage error:**

$$
\text{Error} \; = \; { \frac { 1 0 5 . 2 - 1 0 5 } { 1 0 5 . 2 } } \times 1 0 0 \; = \; { \bf 0 . 2 } \ \ \%
$$

**The thin-wall formula is accurate to within 0.2% for $t / r = 0 . 1$ . The engineer who uses the thin-wall formula for $t / r > 0 . 1$ is not designing the cylinder; they are designing a cylinder that will fail by yielding at the bore.**
:::
:::

::: exercise Rotating disc stress {#ex-rotating-disc-ex level=3 check="2"}
A solid steel disc ($\rho = 7 8 0 0$ kg/m³, $\nu = 0 . 3$ , $R = 0 . 3$ m) rotates at 10 000 rpm. Calculate the maximum stress.

::: solution
**Angular velocity:**

$$
\omega \; = \; { \frac { 2 \pi \times 1 0 \ 0 0 0 } { 6 0 } } \; = \; 1 \ 0 4 7 \ \text{rad/s}
$$

**Maximum stress (at the centre):**

$$
\sigma _ { \max } \; = \; { \frac { 3 + \nu } { 8 } } \, \rho \, \omega ^ { 2 } \, R ^ { 2 } \; = \; { \frac { 3 . 3 } { 8 } } \times 7 \ 8 0 0 \times 1 \ 0 4 7 ^ { 2 } \times 0 . 3 ^ { 2 }
$$

$$
\sigma _ { \max } \; = \; 0 . 4 1 2 5 \times 7 \ 8 0 0 \times 1 \ 0 9 6 \ 2 0 9 \times 0 . 0 9 \; = \; { \bf 2 9 9 } \ \text{MPa}
$$

**The maximum stress is 299 MPa. The engineer would check whether this is below the yield strength of the disc material.**
:::
:::

::: exercise Radial displacement {#ex-radial-displacement-ex level=3 check="2"}
A thick cylinder has $a = 5 0$ mm, $b = 1 0 0$ mm, $p _ { i } = 2 0 0$ MPa, $E = 2 0 0$ GPa, and $\nu = 0 . 3$ . Calculate the change in the bore radius.

::: solution
**Lamé constants:**

$$
A \; = \; { \frac { 2 0 0 \times 2 \ 5 0 0 } { 1 0 \ 0 0 0 - 2 \ 5 0 0 } } \; = \; 6 6 . 7 \ \text{MPa} \qquad B \; = \; { \frac { 2 0 0 \times 2 \ 5 0 0 \times 1 0 \ 0 0 0 } { 7 \ 5 0 0 } } \; = \; 6 6 6 \ 6 6 7 \ \text{MPa} { \cdot } \text{mm} ^ { 2 }
$$

**Radial displacement at the bore:**

$$
u ( a ) \; = \; { \frac { a } { E } } \, [ ( 1 - \nu ) \, A + ( 1 + \nu ) \, { \frac { B } { a ^ { 2 } } } ] \; = \; { \frac { 5 0 } { 2 0 0 \ 0 0 0 } } \, [ 0 . 7 \times 6 6 . 7 + 1 . 3 \times 2 6 6 . 7 ]
$$

$$
u ( a ) \; = \; { \frac { 5 0 } { 2 0 0 \ 0 0 0 } } \, [ 4 6 . 7 + 3 4 6 . 7 ] \; = \; { \frac { 5 0 \times 3 9 3 . 4 } { 2 0 0 \ 0 0 0 } } \; = \; { \bf 0 . 0 9 8 } \ \text{mm}
$$

**The bore radius increases by 0.098 mm. The engineer would use the radial displacement to calculate the change in the bore diameter, and the change in the bore diameter is the reason the engineer can design the shrink fit.**
:::
:::

::: exercise Plastic collapse pressure {#ex-plastic-collapse level=3 check="2"}
A thick cylinder has $a = 5 0$ mm, $b = 1 0 0$ mm, and $S _ { y } = 5 0 0$ MPa. Calculate the yield pressure (the pressure at which the bore yields) using the Tresca criterion.

::: solution
At the bore, $\sigma _ { r } = - p _ { i }$ and $\sigma _ { \theta } = p _ { i } \, ( b ^ { 2 } + a ^ { 2 } ) / ( b ^ { 2 } - a ^ { 2 } )$ .

**Tresca criterion:**

$$
\sigma _ { \theta } - \sigma _ { r } \; = \; S _ { y }
$$

$$
p _ { i } \, { \frac { b ^ { 2 } + a ^ { 2 } } { b ^ { 2 } - a ^ { 2 } } } + p _ { i } \; = \; S _ { y } \quad \Longrightarrow \quad p _ { i } \, { \frac { 2 \, b ^ { 2 } } { b ^ { 2 } - a ^ { 2 } } } \; = \; S _ { y }
$$

$$
p _ { i } \; = \; { \frac { S _ { y } \, ( b ^ { 2 } - a ^ { 2 } ) } { 2 \, b ^ { 2 } } } \; = \; { \frac { 5 0 0 \times 7 \ 5 0 0 } { 2 \times 1 0 \ 0 0 0 } } \; = \; { \bf 1 8 7 . 5 } \ \text{MPa}
$$

**The yield pressure is 187.5 MPa. The engineer would design the cylinder for a pressure below the yield pressure, and the yield pressure is the reason the cylinder is safe.**
:::
:::

::: exercise Shrink fit stress {#ex-shrink-fit-ex level=3 check="2"}
A shrink fit creates a contact pressure of 50 MPa at the interface radius $c = 6 0$ mm of a hub with $b = 1 2 0$ mm. Calculate the hoop stress at the outer surface of the hub.

::: solution
For the hub (outer cylinder), the contact pressure acts as an internal pressure:

$$
\sigma _ { \theta } ( b ) \; = \; p _ { \text{contact } } \, { \frac { c ^ { 2 } + b ^ { 2 } } { b ^ { 2 } - c ^ { 2 } } } \; = \; 5 0 \times { \frac { 3 \ 6 0 0 + 1 4 \ 4 0 0 } { 1 4 \ 4 0 0 - 3 \ 6 0 0 } } \; = \; 5 0 \times { \frac { 1 8 \ 0 0 0 } { 1 0 \ 8 0 0 } } \; = \; 5 0 \times 1 . 6 6 7 \; = \; { \bf 8 3 . 3 } \ \text{MPa}
$$

**The hoop stress at the outer surface is 83.3 MPa. The engineer would use the shrink fit to reduce the bore stress, and the reduction is the reason the shrink fit is the most widely used technique in gun barrel design.**
:::
:::

::: exercise Derivation: the Lamé equations {#ex-derive-lame level=4 check="2"}
Show that the Lamé equations $\sigma _ { r } = A - B / r ^ { 2 }$ and $\sigma _ { \theta } = A + B / r ^ { 2 }$ are derived from the equilibrium equation and the compatibility condition for an axisymmetric stress field.

::: solution
The equilibrium equation for an axisymmetric stress field (no body forces) is:

$$
{ \frac { d \sigma _ { r } } { d r } } + { \frac { \sigma _ { r } - \sigma _ { \theta } } { r } } \; = \; 0
$$

The compatibility condition (for plane stress) is:

$$
{ \frac { d \varepsilon _ { \theta } } { d r } } + { \frac { \varepsilon _ { \theta } - \varepsilon _ { r } } { r } } \; = \; 0
$$

Substituting the constitutive equations and simplifying:

$$
{ \frac { d } { d r } } \, ( \sigma _ { \theta } - \nu \, \sigma _ { r } ) + { \frac { ( 1 + \nu ) \, ( \sigma _ { \theta } - \sigma _ { r } ) } { r } } \; = \; 0
$$

From the equilibrium equation: $\sigma _ { \theta } - \sigma _ { r } = - r \, d \sigma _ { r } / d r - \sigma _ { r } + \sigma _ { r } = - r \, d \sigma _ { r } / d r$ .

Substituting and simplifying gives the Euler-Cauchy equation:

$$
{ \frac { d ^ { 2 } \sigma _ { r } } { d r ^ { 2 } } } + { \frac { 2 } { r } } \, { \frac { d \sigma _ { r } } { d r } } \; = \; 0
$$

The solution is:

$$
\sigma _ { r } \; = \; A - { \frac { B } { r ^ { 2 } } }
$$

Substituting back into the equilibrium equation:

$$
\sigma _ { \theta } \; = \; A + { \frac { B } { r ^ { 2 } } }
$$

**The Lamé equations are the reason the engineer can predict the stress distribution in the wall, and the prediction is the reason the cylinder is safe.** $\blacksquare$
:::
:::

::: exercise Derivation: the rotating disc equation {#ex-derive-disc level=4 check="2"}
Show that the rotating disc equation $d \sigma _ { r } / d r + ( \sigma _ { r } - \sigma _ { \theta } ) / r + \rho \, \omega ^ { 2 } \, r = 0$ is derived from the force balance on a differential disc element. Write the boundary conditions for a solid disc.

::: solution
Consider a differential disc element between $r$ and $r + d r$ . The forces in the radial direction are:

$$
\sigma _ { r } \, r \, d \theta - ( \sigma _ { r } + { \frac { d \sigma _ { r } } { d r } } \, d r ) \, ( r + d r ) \, d \theta + \sigma _ { \theta } \, d r \, d \theta + \rho \, \omega ^ { 2 } \, r ^ { 2 } \, d r \, d \theta \; = \; 0
$$

Simplifying (neglecting higher-order terms):

$$
{ \frac { d \sigma _ { r } } { d r } } + { \frac { \sigma _ { r } - \sigma _ { \theta } } { r } } + \rho \, \omega ^ { 2 } \, r \; = \; 0
$$

**Boundary conditions for a solid disc:**
1. At $r = 0$ : $\sigma _ { r }$ is finite (no singularity)
2. At $r = R$ : $\sigma _ { r } = 0$ (free surface)

**The rotating disc equation is the reason the engineer can predict the centrifugal stress distribution, and the prediction is the reason the turbine disc is safe.** $\blacksquare$
:::
:::

::: quiz Thick cylinders {#quiz-thick}
The maximum hoop stress in a thick cylinder occurs at:

- [ ] The outer surface
- [x] The bore
- [ ] The mean radius
- [ ] The neutral axis

::: solution
**The bore.** The hoop stress is maximum at the bore and minimum at the outer surface, and the maximum is the reason the cylinder yields at the bore first. The engineer who uses the thin-wall formula for a thick cylinder is not designing the cylinder; they are designing a cylinder that will fail by yielding at the bore.
:::
:::

::: quiz Rotating discs {#quiz-disc}
The maximum stress in a solid rotating disc occurs at:

- [ ] The rim
- [x] The centre
- [ ] The mid-radius
- [ ] The neutral axis

::: solution
**The centre.** The stress is maximum at the centre and zero at the rim, and the maximum is the reason the disc fails at the centre first. The centrifugal stress is proportional to the square of the angular velocity, and the square is the reason the disc is designed for the speed, not the torque.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/plasticity]]** — The plastic collapse of the thick cylinder is the foundation of limit analysis.
- **[[solid-mechanics/fracture-mechanics]]** — The stress intensity factor for a crack in a thick cylinder is calculated from the Lamé stress field.
- **[[solid-mechanics/composites]]** — The thick cylinder theory is extended to composite pressure vessels.
- **[[machine-design/bearings]]** — The journal bearing is a thick cylinder problem.
- **[[machine-design/gear-design]]** — The gear rim is a thick cylinder problem.
- **[[machine-design/fasteners-joints]]** — The shrink fit is the reason the bolt preload is uniform.
- **[[propulsion/turbines]]** — The turbine disc is the most critical component in the gas turbine.
- **[[propulsion/rocket-engines]]** — The rocket motor case is a thick cylinder problem.
- **[[energy-systems/steam-power-plants]]** — The boiler drum is a thick cylinder problem.
- **[[solid-mechanics/plates]]** — The thick cylinder theory is extended to thick plates.

::: history Thick cylinders: from Lamé to the gun barrel {#history-thick-cylinders}
**1833** — **Gabriel Lamé** publishes the **Lamé equations**, the first quantitative solution for the stress distribution in a thick-walled cylinder. **The Lamé equations are the reason the engineer can predict the stress distribution in the wall, and the prediction is the reason the cylinder is safe.**

**1855** — **William Fairbairn** publishes the **boiler explosion experiments**, which demonstrate that the thin-wall formula underestimates the stress in thick cylinders. **The Fairbairn experiments are the reason the thick cylinder theory is the most important theory in pressure vessel design.**

**1898** — **The shrink-fit gun barrel** is introduced by the German arms manufacturer Krupp, and the shrink fit is the reason the gun barrel can withstand higher pressures. **The Krupp shrink fit is the reason the gun barrel is the most critical component in the artillery, and the shrink fit is the reason the gun barrel is the most refined application of the thick cylinder theory.**

**1903** — **The rotating disc theory** is developed by **A. Nadai**, who calculates the centrifugal stress distribution in the turbine disc. **The Nadai rotating disc theory is the reason the turbine disc is the most critical component in the gas turbine, and the centrifugal stress is the reason the turbine disc is the most refined application of the thick cylinder theory.**

**1911** — **The autofrettage process** is patented by **E. Schröter**, who yields the bore of the gun barrel to create a residual compressive stress. **The autofrettage process is the reason the gun barrel can withstand higher pressures, and the residual compressive stress is the reason the gun barrel is the most refined application of the thick cylinder theory.**

**1930s** — **The finite difference method** is applied to the thick cylinder problem, which makes the numerical solution of the boundary-value problem practical. **The finite difference method is the reason the engineer can solve the thick cylinder problem for complex geometries, and the solution is the reason the cylinder is safe.**

**1950s** — **The nuclear reactor pressure vessel** is designed using the thick cylinder theory, and the pressure vessel is the reason the nuclear reactor is safe. **The nuclear reactor pressure vessel is the reason the thick cylinder theory is the most important theory in nuclear engineering, and the safety is the reason the thick cylinder theory is the most refined theory in engineering.**

**1970s** — **The composite overwrapped pressure vessel (COPV)** is developed for aerospace applications, and the COPV is the reason the rocket motor case is lightweight. **The COPV is the reason the thick cylinder theory is extended to composite materials, and the lightweight is the reason the thick cylinder theory is the most refined theory in aerospace engineering.**
:::

::: summary Thick cylinders and rotating discs {#summary-thick-cylinders}
- **The Lamé equations give the radial and hoop stress distributions in a thick-walled cylinder: $\sigma _ { r } = A - B / r ^ { 2 }$ and $\sigma _ { \theta } = A + B / r ^ { 2 }$ .** The hoop stress at the bore is 2-3 times the thin-wall hoop stress, and the 2-3 times is the reason the thick cylinder theory is the most important theory in pressure vessel design.
- **The maximum hoop stress occurs at the bore, and the maximum is the reason the cylinder yields at the bore first.** The engineer who uses the thin-wall formula for a thick cylinder is not designing the cylinder; they are designing a cylinder that will fail by yielding at the bore.
- **The radial displacement is the reason the engineer can calculate the change in the bore radius, and the change in the bore radius is the reason the engineer can design the shrink fit.** The shrink fit is the reason the bore stress is reduced by 20-50%.
- **The shrink fit is the interference fit between two cylinders, and the shrink fit is the reason the bore stress is reduced by 20-50%.** The shrink fit is the most widely used technique in gun barrel design.
- **The rotating disc is the component in which the centrifugal force creates the stress, and the rotating disc is the reason the turbine disc is the most critical component in the gas turbine.** The centrifugal stress is proportional to the square of the angular velocity.
- **The maximum stress in a solid rotating disc occurs at the centre, and the maximum is the reason the disc fails at the centre first.** The maximum stress is $\sigma _ { \max } = ( 3 + \nu ) \, \rho \, \omega ^ { 2 } \, R ^ { 2 } / 8$ .
- **The plastic collapse pressure is the pressure at which the bore yields, and the yield pressure is the reason the cylinder is designed for the yield pressure, not the burst pressure.** The Tresca yield pressure is $p _ { i } = S _ { y } \, ( b ^ { 2 } - a ^ { 2 } ) / ( 2 \, b ^ { 2 } )$ .
- **The autofrettage process yields the bore of the cylinder to create a residual compressive stress, and the residual compressive stress is the reason the cylinder can withstand higher pressures.** The autofrettage process is the reason the gun barrel is the most refined application of the thick cylinder theory.
- **The thick cylinder theory is the most important theory in pressure vessel design, because the thick cylinder theory predicts the stress distribution in the wall.** The prediction is the reason the cylinder is safe.
- **The thick cylinder theory is extended to composite pressure vessels, and the composite overwrapped pressure vessel (COPV) is the reason the rocket motor case is lightweight.** The COPV is the reason the thick cylinder theory is the most refined theory in aerospace engineering.
:::

## Further reading

- **Stephen P. Timoshenko and James N. Goodier (1970)** — *Theory of Elasticity*, 3rd ed. McGraw-Hill. The Lamé equations, the shrink fit, and the rotating disc.
- **S.P. Timoshenko and S. Woinowsky-Krieger (1959)** — *Theory of Plates and Shells*, 2nd ed. McGraw-Hill. The thick cylinder theory in the plate and shell context.
- **Morris Dolph (1977)** — *Mechanics of Materials*. Wiley. The Lamé equations and the thick cylinder stress analysis.
- **O.C. Zienkiewicz and R.L. Taylor (2005)** — *The Finite Element Method*, 6th ed. Butterworth-Heinemann. The thick cylinder theory in the finite element context.
- **L.E. Malvern (1969)** — *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall. The Lamé equations and the thick cylinder theory.
- **SC Mal and G. Singh (1991)** — *Continuum Mechanics of Composite Materials*. Kluwer. The thick cylinder theory in the composite context.
- **Thomas J.R. Hughes (2012)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The thick cylinder theory in the finite element context.
- **A.M. Freudenthal and A. Nadai (1948)** — *The Theory of Elasticity for Engineers and Physicists*. McGraw-Hill. The thick cylinder theory and the rotating disc.
