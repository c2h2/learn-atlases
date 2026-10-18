The crack is the most dangerous defect: the crack is the reason the structure fails without warning, and the crack is the reason the engineer must design the structure to be safe. **The engineer who designs the structure for the yield strength is not designing the structure; they are designing a structure that will fail by brittle fracture at a stress below the yield strength.** The fracture mechanics is the reason the engineer can predict the crack growth and the fracture load, and the prediction is the reason the structure is safe.

The quantitative tools of fracture mechanics are the **stress intensity factor** (the stress field at the crack tip), the **fracture toughness** (the material's resistance to crack growth), the **J-integral** (the elastic-plastic fracture parameter), and the **fatigue crack growth** (the crack growth rate under cyclic loading). The tools are the language in which the fracture mechanics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways fracture mechanics analysis goes wrong
**Not checking the fracture toughness.** The engineer who designs the structure for the yield strength without checking the fracture toughness is not designing the structure; they are designing a structure that will fail by brittle fracture. **The fracture toughness is the reason the structure is designed for the crack size, not the yield strength, and the crack size is the reason the structure is safe.** **Not checking the stress intensity factor.** The engineer who calculates the stress intensity factor without checking the geometry factor is not calculating the stress intensity factor; they are guessing. **The geometry factor is the reason the stress intensity factor is different for different crack geometries, and the difference is the reason the engineer uses the geometry factor, not the nominal stress.** **Not checking the plane stress/plane strain condition.** The engineer who uses the plane stress fracture toughness without checking the plane strain fracture toughness is not analysing the fracture; they are guessing. **The plane strain fracture toughness is 20-50% lower than the plane stress fracture toughness, and the difference is the reason the engineer uses the plane strain fracture toughness for thick sections.** **Not checking the small-scale yielding condition.** The engineer who uses the linear elastic fracture mechanics without checking the small-scale yielding condition is not analysing the fracture; they are guessing. **The small-scale yielding condition is the reason the linear elastic fracture mechanics is valid, and the validity is the reason the engineer uses the linear elastic fracture mechanics for small-scale yielding.** **Not checking the fatigue crack growth.** The engineer who designs the structure without checking the fatigue crack growth is not designing the structure; they are designing a structure that will fail by fatigue. **The fatigue crack growth is the reason the structure is designed for the fatigue life, not the static strength, and the fatigue life is the reason the structure is the most critical component in the aircraft.** **Not checking the crack detection.** The engineer who designs the structure without checking the crack detection is not designing the structure; they are designing a structure that will fail by undetected crack. **The crack detection is the reason the structure is designed for the detectable crack size, not the critical crack size, and the detectable crack size is the reason the structure is safe.** **Not checking the residual stress.** The engineer who calculates the stress intensity factor without checking the residual stress is not calculating the stress intensity factor; they are calculating the applied stress intensity factor. **The residual stress is the reason the stress intensity factor is different from the applied stress intensity factor, and the difference is the reason the engineer uses the residual stress, not the applied stress.** **Not checking the environment.** The engineer who designs the structure without checking the environment is not designing the structure; they are designing a structure that will fail by stress corrosion cracking. **The environment is the reason the structure is designed for the environment, not just the load, and the environment is the reason the structure is the most critical component in the chemical plant.** **Not checking the crack closure.** The engineer who calculates the fatigue crack growth without checking the crack closure is not calculating the fatigue crack growth; they are calculating the nominal fatigue crack growth. **The crack closure is the reason the fatigue crack growth is different from the nominal fatigue crack growth, and the difference is the reason the engineer uses the effective stress intensity factor, not the nominal stress intensity factor.**
:::

## 1. Stress intensity factor and fracture toughness

::: definition The stress intensity factor {#def-stress-intensity}
The **stress intensity factor** is the parameter that characterises the stress field at the crack tip, and the stress intensity factor is the reason the engineer can predict the fracture load of the structure.

For a **mode I crack** (opening mode):

$$
\sigma _ { i j } \; = \; { \frac { K _ { I } } { \sqrt { 2 \, \pi \, r } } } \, f _ { i j } ( \theta ) + \text{higher order terms}
$$

For a **central crack** of length $2 a$ in an infinite plate:

$$
K _ { I } \; = \; \sigma \, \sqrt { \pi \, a }
$$

For a **edge crack** of length $a$ in a semi-infinite plate:

$$
K _ { I } \; = \; 1 . 1 2 \, \sigma \, \sqrt { \pi \, a }
$$

For a **finite width plate** with a central crack:

$$
K _ { I } \; = \; \sigma \, \sqrt { \pi \, a } \, Y \left( { \frac { a } { W } } \right) \qquad Y \; = \; \sqrt { \sec \left( { \frac { \pi \, a } { W } } \right) }
$$

$$
\begin{array} { l c c c }
\textbf{Crack type} & \textbf{ } K _ { I } & \textbf{ } Y & \textbf{Use case} \\ \hline
\text{Central crack (infinite)} & \sigma \, \sqrt { \pi \, a } & 1 . 0 & \text{Fuselage panel} \\
\text{Edge crack (semi-infinite)} & 1 . 1 2 \, \sigma \, \sqrt { \pi \, a } & 1 . 1 2 & \text{Wing skin} \\
\text{Edge crack (finite)} & 1 . 1 2 \, \sigma \, \sqrt { \pi \, a } \, f ( a / W ) & 1 . 1 2 \text{--} 2 . 0 & \text{Bracket} \\
\text{Surface crack} & 1 . 0 \, \sigma \, \sqrt { \pi \, a / Q } & 1 . 0 \text{--} 1 . 5 & \text{Pressure vessel} \\
\end{array}
$$

**The stress intensity factor is the reason the engineer can predict the fracture load of the structure, and the prediction is the reason the structure is safe. The engineer who calculates the stress intensity factor without checking the geometry factor is not calculating the stress intensity factor; they are guessing.**
:::

::: definition The fracture toughness {#def-fracture-toughness}
The **fracture toughness** is the material's resistance to crack growth, and the fracture toughness is the reason the engineer can design the structure to be safe.

**Plane strain fracture toughness** ($K _ { I C }$ ):

$$
K _ { I } \; \geq \; K _ { I C } \quad \Longrightarrow \quad \text{fracture}
$$

**Critical crack size:**

$$
a _ { c } \; = \; { \frac { 1 } { \pi } } \, \left( { \frac { K _ { I C } } { \sigma \, Y } } \right) ^ { 2 }
$$

**Critical stress:**

$$
\sigma _ { c } \; = \; { \frac { K _ { I C } } { Y \, \sqrt { \pi \, a } } }
$$

$$
\begin{array} { l c c c }
\textbf{Material} & \textbf{ } K _ { I C } \textbf{ (MPa·m} ^ { 0 . 5 } \textbf{)} & \textbf{ } a _ { c } \textbf{ at 200 MPa} & \textbf{Use case} \\ \hline
\text{Al 7075-T6} & 2 4 & 2 . 3 \ \text{mm} & \text{Aircraft skin} \\
\text{Al 2024-T3} & 3 5 & 4 . 9 \ \text{mm} & \text{Aircraft skin} \\
\text{Steel 4340} & 5 0 \text{--} 1 0 0 & 5 \text{--} 2 5 \ \text{mm} & \text{Landing gear} \\
\text{Ti-6Al-4V} & 5 5 \text{--} 1 1 0 & 6 \text{--} 2 4 \ \text{mm} & \text{Turbine blade} \\
\text{Glass} & 0 . 7 \text{--} 1 . 0 & 0 . 0 1 \text{--} 0 . 0 2 \ \text{mm} & \text{Window} \\
\text{Concrete} & 0 . 3 \text{--} 0 . 5 & 0 . 0 0 5 \text{--} 0 . 0 1 \ \text{mm} & \text{Structure} \\
\end{array}
$$

**The fracture toughness is the reason the structure is designed for the crack size, not the yield strength, and the crack size is the reason the structure is safe. The engineer who designs the structure for the yield strength without checking the fracture toughness is not designing the structure; they are designing a structure that will fail by brittle fracture at a stress below the yield strength.**
:::

::: widget plot
title: The stress intensity factor vs crack length
f: sqrt(x); 1.12*sqrt(x); sqrt(x)*1.5
x: 0,100
y: 0,20
labels: Central crack; Edge crack; Finite width
caption: The stress intensity factor against the crack length for different crack geometries. **The stress intensity factor is proportional to the square root of the crack length, and the square root is the reason the crack growth accelerates as the crack grows.** **The geometry factor is the reason the stress intensity factor is different for different crack geometries, and the difference is the reason the engineer uses the geometry factor, not the nominal stress.**
:::

::: example Critical crack size calculation {#ex-critical-crack level=3 check="2"}
An Al 2024-T3 plate ($K _ { I C } = 3 5$ MPa·m⁰·⁵) is subjected to a stress $\sigma = 2 0 0$ MPa. Calculate the critical crack size for a central crack ($Y = 1$ ) and an edge crack ($Y = 1 . 1 2$ ).

**Central crack:**

$$
a _ { c , \text{central } } \; = \; { \frac { 1 } { \pi } } \, \left( { \frac { K _ { I C } } { \sigma \, Y } } \right) ^ { 2 } \; = \; { \frac { 1 } { \pi } } \, \left( { \frac { 3 5 } { 2 0 0 \times 1 } } \right) ^ { 2 } \; = \; { \frac { 1 } { \pi } } \times 0 . 0 3 0 6 \; = \; { \bf 9 . 7 } \ \text{mm}
$$

**Edge crack:**

$$
a _ { c , \text{edge } } \; = \; { \frac { 1 } { \pi } } \, \left( { \frac { 3 5 } { 2 0 0 \times 1 . 1 2 } } \right) ^ { 2 } \; = \; { \frac { 1 } { \pi } } \times 0 . 0 2 4 4 \; = \; { \bf 7 . 8 } \ \text{mm}
$$

**The critical crack size is 9.7 mm for a central crack and 7.8 mm for an edge crack. The engineer would design the structure for the detectable crack size, because the detectable crack size is the reason the structure is designed for the inspection interval, not the critical crack size.**
:::

## 2. J-integral and fatigue crack growth

::: definition The J-integral {#def-j-integral}
The **J-integral** is the elastic-plastic fracture parameter, and the J-integral is the reason the engineer can analyse the fracture of ductile materials.

$$
J \; = \; \int _ { \Gamma } \, W \, d y - T \, { \frac { \partial u } { \partial x } } \, d s
$$

where $W$ is the strain energy density, $T$ is the traction, and $\Gamma$ is a contour around the crack tip.

For **small-scale yielding**:

$$
J \; = \; { \frac { K _ { I } ^ { 2 } } { E ^ { \prime } } } \qquad E ^ { \prime } \; = \; { \frac { E } { 1 - \nu ^ { 2 } } } \; \text{(plane strain)}
$$

The **J-R curve** is the resistance curve:

$$
J \; \geq \; J _ { R } \, ( \Delta a ) \quad \Longrightarrow \quad \text{crack growth}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{Definition} & \textbf{Validity} & \textbf{Use case} \\ \hline
K _ { I } & \text{Stress intensity factor} & \text{LEFM (small-scale yielding)} & \text{Brittle fracture} \\
J & \text{J-integral} & \text{EPFM (moderate-scale yielding)} & \text{Ductile fracture} \\
\delta & \text{Crack tip opening displacement} & \text{EPFM (large-scale yielding)} & \text{Ductile fracture} \\
\text{CTOD} & \text{Crack tip opening displacement} & \text{EPFM (large-scale yielding)} & \text{Weld fracture} \\
\end{array}
$$

**The J-integral is the reason the fracture mechanics is valid, and the validity is the reason the engineer uses the linear elastic fracture mechanics for small-scale yielding. The engineer who uses the linear elastic fracture mechanics without checking the small-scale yielding condition is not analysing the fracture; they are guessing.**
:::

::: definition The fatigue crack growth {#def-fatigue-crack-growth}
The **fatigue crack growth** is the crack growth rate under cyclic loading, and the fatigue crack growth is the reason the engineer can design the structure for the fatigue life.

**Paris law**:

$$
{ \frac { d a } { d N } } \; = \; C \, ( \Delta K ) ^ { m }
$$

where $\Delta K = K _ { \max } - K _ { \min }$ is the stress intensity factor range.

**Fatigue life** (from initial crack $a _ { 0 }$ to critical crack $a _ { c }$ ):

$$
N _ { f } \; = \; \int _ { a _ { 0 } } ^ { a _ { c } } { \frac { d a } { C \, ( \Delta K ) ^ { m } } } \; = \; \int _ { a _ { 0 } } ^ { a _ { c } } { \frac { d a } { C \, ( Y \, \Delta \sigma \, \sqrt { \pi \, a } ) ^ { m } } }
$$

For $m \neq 2$ :

$$
N _ { f } \; = \; { \frac { a _ { c } ^ { 1 - m / 2 } - a _ { 0 } ^ { 1 - m / 2 } } { C \, ( Y \, \Delta \sigma \, \sqrt { \pi } ) ^ { m } \, ( 1 - m / 2 ) } }
$$

$$
\begin{array} { l c c c }
\textbf{Material} & \textbf{ } C & \textbf{ } m & \textbf{Use case} \\ \hline
\text{Al 2024-T3} & 2 . 7 \times 1 0 ^ { - 1 2 } & 3 . 2 & \text{Aircraft skin} \\
\text{Al 7075-T6} & 1 . 4 \times 1 0 ^ { - 1 1 } & 3 . 6 & \text{Aircraft skin} \\
\text{Steel 4340} & 3 . 3 \times 1 0 ^ { - 1 1 } & 2 . 7 & \text{Landing gear} \\
\text{Ti-6Al-4V} & 2 . 0 \times 1 0 ^ { - 1 1 } & 3 . 5 & \text{Turbine blade} \\
\end{array}
$$

**The fatigue crack growth is the reason the structure is designed for the fatigue life, not the static strength, and the fatigue life is the reason the structure is the most critical component in the aircraft. The engineer who designs the structure without checking the fatigue crack growth is not designing the structure; they are designing a structure that will fail by fatigue.**
:::

::: widget plot
title: The fatigue crack growth rate vs stress intensity factor range
f: 1e-12*x^3.2; 1e-11*x^2.7
x: 1,30
y: 1e-12,1e-6
labels: Al 2024-T3; Steel 4340
caption: The fatigue crack growth rate against the stress intensity factor range for different materials. **The crack growth rate is proportional to the stress intensity factor range to the power of m, and the power is the reason the crack growth accelerates as the crack grows.** **The Paris law is the reason the engineer can predict the fatigue life of the structure, and the prediction is the reason the structure is safe.**
:::

::: example Fatigue life calculation {#ex-fatigue-life level=3 check="2"}
An Al 2024-T3 plate ($C = 2 . 7 \times 1 0 ^ { - 1 2 }$ , $m = 3 . 2$ ) has an initial crack $a _ { 0 } = 2$ mm and is subjected to $\Delta \sigma = 1 5 0$ MPa. Calculate the fatigue life.

**Critical crack size** ($K _ { I C } = 3 5$ MPa·m⁰·⁵, $Y = 1 . 1 2$ ):

$$
a _ { c } \; = \; { \frac { 1 } { \pi } } \, \left( { \frac { 3 5 } { 1 . 1 2 \times 1 5 0 } } \right) ^ { 2 } \; = \; { \frac { 1 } { \pi } } \times 0 . 0 4 3 4 \; = \; 1 3 . 8 \ \text{mm}
$$

**Fatigue life (Paris law, $m = 3 . 2$ ):**

$$
N _ { f } \; = \; { \frac { a _ { c } ^ { 1 - m / 2 } - a _ { 0 } ^ { 1 - m / 2 } } { C \, ( Y \, \Delta \sigma \, \sqrt { \pi } ) ^ { m } \, ( 1 - m / 2 ) } }
$$

$$
1 - m / 2 \; = \; 1 - 1 . 6 \; = \; - 0 . 6
$$

$$
Y \, \Delta \sigma \, \sqrt { \pi } \; = \; 1 . 1 2 \times 1 5 0 \times 1 . 7 7 2 \; = \; 2 9 7 . 8 \ \text{MPa} \cdot \text{m} ^ { 0 . 5 }
$$

$$
( 2 9 7 . 8 ) ^ { 3 . 2 } \; = \; 2 . 4 1 \times 1 0 ^ { 8 }
$$

$$
a _ { c } ^ { - 0 . 6 } - a _ { 0 } ^ { - 0 . 6 } \; = \; 0 . 0 1 3 8 ^ { - 0 . 6 } - 0 . 0 0 2 ^ { - 0 . 6 } \; = \ { 1 3 . 1 } - { 4 3 . 7 } \; = \; - 3 0 . 6
$$

$$
N _ { f } \; = \; { \frac { - 3 0 . 6 } { 2 . 7 \times 1 0 ^ { - 1 2 } \times 2 . 4 1 \times 1 0 ^ { 8 } \times ( - 0 . 6 ) } } \; = \; { \frac { - 3 0 . 6 } { - 3 . 9 0 \times 1 0 ^ { - 4 } } } \; = \; { \bf 7 8 \ 5 0 0 } \ \text{cycles}
$$

**The fatigue life is 78 500 cycles. The engineer would design the structure for the fatigue life, because the fatigue life is the reason the structure is designed for the inspection interval, not the critical crack size.**
:::

::: example Brittle vs ductile fracture {#ex-brittle-ductile level=3 check="2"}
A steel plate ($S _ { y } = 1 5 0 0$ MPa, $K _ { I C } = 5 0$ MPa\\.m\\.5) and an aluminium plate ($S _ { y } = 5 0 0$ MPa, $K _ { I C } = 3 5$ MPa\\.m\\.5) both have a central crack of length $2 a = 2 0$ mm. Calculate the failure stress for each material and determine whether the failure is brittle or ductile.

**Steel:**

$$
\\sigma _ { c , \\text{steel } } \\; = \\; { \\frac { K _ { I C } } { \\sqrt { \\pi \\, a } } } \\; = \\; { \\frac { 5 0 } { \\sqrt { \\pi \\times 0 . 0 1 } } } \\; = \\; { \\frac { 5 0 } { 0 . 1 7 7 } } \\; = \\; { \\bf 2 8 2 } \\ \\text{MPa}
$$

**Ratio to yield:** $2 8 2 / 1 5 0 0 = 0 . 1 9$ . The steel fails at 19% of the yield strength, which is **brittle fracture**.

**Aluminium:**

$$
\\sigma _ { c , \\text{Al } } \\; = \\; { \\frac { 3 5 } { 0 . 1 7 7 } } \\; = \\; { \\bf 1 9 8 } \\ \\text{MPa}
$$

**Ratio to yield:** $1 9 8 / 5 0 0 = 0 . 4 0$ . The aluminium fails at 40% of the yield strength, which is **brittle fracture**.

**The steel fails at 19% of the yield strength, and the aluminium fails at 40% of the yield strength. The engineer would design the structure for the fracture toughness, because the fracture toughness is the reason the structure is designed for the crack size, not the yield strength.**
:::

::: example Leak-before-break analysis {#ex-leak-before-break level=3 check="2"}
A pressure vessel ($r = 1$ m, $t = 2 0$ mm, $S _ { y } = 5 0 0$ MPa, $K _ { I C } = 1 5 0$ MPa\\.m\\.5) is designed for a hoop stress of $\\sigma _ { h } = 2 0 0$ MPa. Check whether the vessel leaks before it breaks.

**Critical crack size for fracture:**

$$
a _ { c } \\; = \\; { \\frac { 1 } { \\pi } } \\left( { \\frac { K _ { I C } } { \\sigma _ { h } } } \\right) ^ { 2 } \\; = \\; { \\frac { 1 } { \\pi } } \\times \\left( { \\frac { 1 5 0 } { 2 0 0 } } \\right) ^ { 2 } \\; = \\; { \\frac { 1 } { \\pi } } \\times 0 . 5 6 2 5 \\; = \\; { \\bf 1 7 9 } \\ \\text{mm}
$$

**Leak-before-break criterion:** The crack penetrates the wall ($a = t = 2 0$ mm) before reaching the critical size ($a _ { c } = 1 7 9$ mm).

$$
a = 2 0 \\ \\text{mm} \\; < \\; a _ { c } = 1 7 9 \\ \\text{mm} \\quad \\checkmark \\quad \\text{Leak-before-break}
$$

**The vessel leaks before it breaks. The engineer would design the vessel for the leak-before-break criterion, because the leak-before-break criterion is the reason the vessel is designed for the detectable leak, not the catastrophic fracture.**
:::

::: exercise Threshold stress intensity factor {#ex-threshold level=3 check="2"}
A steel has $\\Delta K _ { \\text{th } } = 5$ MPa\\.m\\.5 and $\\Delta \\sigma = 1 0 0$ MPa. Calculate the maximum crack size below which the crack will not grow.

::: solution
$$
\\Delta K \\; = \\; \\Delta \\sigma \\, \\sqrt { \\pi \\, a } \\; = \\; \\Delta K _ { \\text{th } }
$$

$$
a \\; = \\; { \\frac { 1 } { \\pi } } \\left( { \\frac { \\Delta K _ { \\text{th } } } { \\Delta \\sigma } } \\right) ^ { 2 } \\; = \\; { \\frac { 1 } { \\pi } } \\times \\left( { \\frac { 5 } { 1 0 0 } } \\right) ^ { 2 } \\; = \\; { \\frac { 1 } { \\pi } } \\times 2 . 5 \\times 1 0 ^ { - 4 } \\; = \\; { \\bf 0 . 0 8 } \\ \\text{mm}
$$

**The maximum crack size below which the crack will not grow is 0.08 mm. The engineer would design the structure for the threshold stress intensity factor, because the threshold stress intensity factor is the reason the structure is designed for the non-propagating crack, not the propagating crack.**
:::
:::

## Exercises

::: exercise Stress intensity factor {#ex-sif-ex level=3 check="2"}
A plate with a central crack of length $2 a = 2 0$ mm is subjected to $\sigma = 3 0 0$ MPa. Calculate $K _ { I }$ .

::: solution
$$
K _ { I } \; = \; \sigma \, \sqrt { \pi \, a } \; = \; 3 0 0 \times \sqrt { \pi \times 1 0 \times 1 0 ^ { - 3 } } \; = \; 3 0 0 \times 0 . 1 7 7 \; = \; { \bf 5 3 . 1 } \ \text{MPa} \cdot \text{m} ^ { 0 . 5 }
$$

**The stress intensity factor is 53.1 MPa·m⁰·⁵.**
:::
:::

::: exercise Critical stress {#ex-critical-stress level=3 check="2"}
A steel plate ($K _ { I C } = 8 0$ MPa·m⁰·⁵) has an edge crack of length $a = 1 0$ mm. Calculate the critical stress ($Y = 1 . 1 2$ ).

::: solution
$$
\sigma _ { c } \; = \; { \frac { K _ { I C } } { Y \, \sqrt { \pi \, a } } } \; = \; { \frac { 8 0 } { 1 . 1 2 \times \sqrt { \pi \times 1 0 \times 1 0 ^ { - 3 } } } } \; = \; { \frac { 8 0 } { 1 . 1 2 \times 0 . 1 7 7 } } \; = \; { \bf 4 0 3 } \ \text{MPa}
$$

**The critical stress is 403 MPa.**
:::
:::

::: exercise J-integral {#ex-j-integral-ex level=3 check="2"}
A steel plate ($E = 2 0 0$ GPa, $\nu = 0 . 3$ ) has $K _ { I } = 5 0$ MPa·m⁰·⁵. Calculate the J-integral under plane strain.

::: solution
$$
E ^ { \prime } \; = \; { \frac { E } { 1 - \nu ^ { 2 } } } \; = \; { \frac { 2 0 0 \ 0 0 0 } { 1 - 0 . 0 9 } } \; = \; 2 1 9 \ 7 8 0 \ \text{MPa}
$$

$$
J \; = \; { \frac { K _ { I } ^ { 2 } } { E ^ { \prime } } } \; = \; { \frac { 5 0 ^ { 2 } } { 2 1 9 \ 7 8 0 } } \; = \; { \frac { 2 5 0 0 } { 2 1 9 \ 7 8 0 } } \; = \; { \bf 1 1 . 4 } \ \text{kJ/m} ^ { 2 }
$$

**The J-integral is 11.4 kJ/m².**
:::
:::

::: exercise Paris law {#ex-paris-law-ex level=3 check="2"}
A plate has $C = 1 0 ^ { - 1 1 }$ , $m = 3$ , and $\Delta K = 2 0$ MPa·m⁰·⁵. Calculate the crack growth rate.

::: solution
$$
{ \frac { d a } { d N } } \; = \; C \, ( \Delta K ) ^ { m } \; = \; 1 0 ^ { - 1 1 } \times 2 0 ^ { 3 } \; = \; 1 0 ^ { - 1 1 } \times 8 \ 0 0 0 \; = \; { \bf 8 \times 1 0 ^ { - 8 } } \ \text{m/cycle}
$$

**The crack growth rate is $8 \times 1 0 ^ { - 8 }$ m/cycle.**
:::
:::

::: exercise Crack closure {#ex-crack-closure level=3 check="2"}
A crack has $K _ { \max } = 4 0$ MPa·m⁰·⁵, $K _ { \min } = 1 0$ MPa·m⁰·⁵, and $K _ { o p } = 1 5$ MPa·m⁰·⁵. Calculate the effective stress intensity factor range.

::: solution
$$
\Delta K _ { \text{eff } } \; = \; K _ { \max } - K _ { o p } \; = \; 4 0 - 1 5 \; = \; { \bf 2 5 } \ \text{MPa} \cdot \text{m} ^ { 0 . 5 }
$$

**The effective stress intensity factor range is 25 MPa·m⁰·⁵, which is less than the nominal range of 30 MPa·m⁰·⁵. The crack closure is the reason the fatigue crack growth is different from the nominal fatigue crack growth, and the difference is the reason the engineer uses the effective stress intensity factor, not the nominal stress intensity factor.**
:::
:::

::: exercise Derivation: the stress intensity factor {#ex-derive-sif level=4 check="2"}
Show that the stress intensity factor $K _ { I } = \sigma \, \sqrt { \pi \, a }$ is derived from the Westergaard stress function for a central crack in an infinite plate.

::: solution
The Westergaard stress function for a central crack of length $2 a$ in an infinite plate is:

$$
Z ( z ) \; = \; { \frac { \sigma \, z } { \sqrt { z ^ { 2 } - a ^ { 2 } } } }
$$

Near the crack tip ($z = a + r \, e ^ { i \theta }$ , $r \ll a$ ):

$$
Z ( z ) \; \approx \; { \frac { \sigma \, a } { \sqrt { 2 \, a \, r \, e ^ { i \theta } } } } \; = \; { \frac { \sigma \, \sqrt { \pi \, a } } { \sqrt { 2 \, \pi \, r } } } \, e ^ { - i \theta / 2 }
$$

The stress field is:

$$
\sigma _ { i j } \; = \; { \frac { K _ { I } } { \sqrt { 2 \, \pi \, r } } } \, f _ { i j } ( \theta )
$$

where:

$$
K _ { I } \; = \; \sigma \, \sqrt { \pi \, a }
$$

**The stress intensity factor is the reason the engineer can predict the fracture load of the structure, and the prediction is the reason the structure is safe.** $\blacksquare$
:::
:::

::: exercise Derivation: the Paris law {#ex-derive-paris level=4 check="2"}
Show that the Paris law $d a / d N = C \, ( \Delta K ) ^ { m }$ is derived from the similitude argument. Write the expression for the fatigue life.

::: solution
The **similitude argument** states that the crack growth rate is determined by the stress intensity factor range $\Delta K$ :

$$
{ \frac { d a } { d N } } \; = \; f ( \Delta K , R , T , \text{environment} )
$$

For the mid-range (Region II), the function is a power law:

$$
{ \frac { d a } { d N } } \; = \; C \, ( \Delta K ) ^ { m }
$$

The **fatigue life** is obtained by integrating:

$$
N _ { f } \; = \; \int _ { a _ { 0 } } ^ { a _ { c } } { \frac { d a } { C \, ( Y \, \Delta \sigma \, \sqrt { \pi \, a } ) ^ { m } } }
$$

For $m \neq 2$ :

$$
N _ { f } \; = \; { \frac { a _ { c } ^ { 1 - m / 2 } - a _ { 0 } ^ { 1 - m / 2 } } { C \, ( Y \, \Delta \sigma \, \sqrt { \pi } ) ^ { m } \, ( 1 - m / 2 ) } }
$$

**The Paris law is the reason the engineer can predict the fatigue life of the structure, and the prediction is the reason the structure is safe.** $\blacksquare$
:::
:::

::: quiz Fracture mechanics {#quiz-fracture}
The fracture toughness $K _ { I C }$ is measured under:

- [ ] Plane stress conditions
- [x] Plane strain conditions
- [ ] Uniaxial tension
- [ ] Pure shear

::: solution
**Plane strain conditions.** The plane strain fracture toughness is 20-50% lower than the plane stress fracture toughness, and the difference is the reason the engineer uses the plane strain fracture toughness for thick sections. The plane strain condition is the reason the fracture toughness is a material property, not a specimen property.
:::
:::

::: quiz Fatigue crack growth {#quiz-fatigue-crack}
The Paris law is valid in:

- [ ] Region I (near threshold)
- [x] Region II (mid-range)
- [ ] Region III (near fracture)
- [ ] All regions

::: solution
**Region II (mid-range).** The Paris law is valid in the mid-range where the crack growth rate is proportional to $\Delta K ^ { m }$ . In Region I (near threshold), the crack growth rate is much lower than the Paris law predicts. In Region III (near fracture), the crack growth rate is much higher than the Paris law predicts.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/composites]]** — The fracture mechanics of composites is the reason the composite is designed for the damage tolerance.
- **[[solid-mechanics/plasticity]]** — The J-integral is the reason the fracture mechanics is valid.
- **[[machine-design/fatigue]]** — The fatigue crack growth is the reason the machine is designed for the fatigue life.
- **[[machine-design/static-failure]]** — The fracture toughness is the reason the machine is designed for the crack size.
- **[[materials-science/failure]]** — The fracture mechanics is the foundation of the failure analysis.
- **[[materials-science/materials-selection]]** — The fracture toughness is the reason the material is selected for the application.
- **[[solid-mechanics/thin-walled-structures]]** — The fracture mechanics is the reason the aircraft is designed for the damage tolerance.
- **[[propulsion/rocket-engines]]** — The fracture mechanics is the reason the rocket engine is designed for the crack size.
- **[[energy-systems/steam-power-plants]]** — The fracture mechanics is the reason the pressure vessel is designed for the crack size.
- **[[solid-mechanics/energy-methods]]** — The energy release rate is derived from the strain energy.

::: history Fracture mechanics: from Griffith to the J-integral {#history-fracture}
**1920** — **A.A. Griffith** publishes the **energy balance theory of fracture**, which is the foundation of the fracture mechanics. **The Griffith theory is the reason the engineer can predict the fracture load of the structure, and the prediction is the reason the structure is safe.**

**1957** — **G.R. Irwin** publishes the **stress intensity factor**, which is the foundation of the linear elastic fracture mechanics. **The Irwin stress intensity factor is the reason the engineer can predict the fracture load of the structure, and the prediction is the reason the structure is safe.**

**1960** — **The fracture toughness** is introduced by **G.R. Irwin**, who measures the fracture toughness of the material. **The Irwin fracture toughness is the reason the structure is designed for the crack size, not the yield strength, and the crack size is the reason the structure is safe.**

**1961** — **The fatigue crack growth** is discovered by **A.K. Head**, who measures the crack growth rate under cyclic loading. **The Head fatigue crack growth is the reason the structure is designed for the fatigue life, not the static strength, and the fatigue life is the reason the structure is the most critical component in the aircraft.**

**1962** — **The Paris law** is published by **P.C. Paris**, who calculates the fatigue life of the structure. **The Paris law is the reason the engineer can predict the fatigue life of the structure, and the prediction is the reason the structure is safe.**

**1968** — **The J-integral** is developed by **J.R. Rice**, who calculates the fracture toughness of the ductile material. **The Rice J-integral is the reason the fracture mechanics is valid, and the validity is the reason the engineer uses the linear elastic fracture mechanics for small-scale yielding.**

**1970s** — **The crack closure** is discovered by **W. Elber**, who measures the crack closure effect. **The Elber crack closure is the reason the fatigue crack growth is different from the nominal fatigue crack growth, and the difference is the reason the engineer uses the effective stress intensity factor, not the nominal stress intensity factor.**

**1980s** — **The damage tolerance design** is applied to the **aircraft design**, and the damage tolerance is the reason the aircraft is designed for the detectable crack size, not the critical crack size. **The damage tolerance design is the reason the aircraft is the most critical component in the aircraft, and the detectable crack size is the reason the aircraft is the most refined application of the fracture mechanics.**
:::

::: summary Fracture mechanics {#summary-fracture}
- **The stress intensity factor is the parameter that characterises the stress field at the crack tip: $K _ { I } = \sigma \, \sqrt { \pi \, a }$ for a central crack in an infinite plate.** The stress intensity factor is the reason the engineer can predict the fracture load of the structure, and the prediction is the reason the structure is safe.
- **The fracture toughness is the material's resistance to crack growth: $K _ { I } \geq K _ { I C }$ leads to fracture.** The fracture toughness is the reason the structure is designed for the crack size, not the yield strength, and the crack size is the reason the structure is safe.
- **The critical crack size is $a _ { c } = ( 1 / \pi ) \, ( K _ { I C } / \sigma \, Y ) ^ { 2 }$ , and the critical stress is $\sigma _ { c } = K _ { I C } / ( Y \, \sqrt { \pi \, a } )$ .** The critical crack size is the reason the engineer can design the structure for the inspection interval, not the critical crack size.
- **The J-integral is the elastic-plastic fracture parameter: $J = K _ { I } ^ { 2 } / E ^ { \prime }$ for small-scale yielding.** The J-integral is the reason the fracture mechanics is valid, and the validity is the reason the engineer uses the linear elastic fracture mechanics for small-scale yielding.
- **The Paris law states that the crack growth rate is proportional to the stress intensity factor range to the power of m: $d a / d N = C \, ( \Delta K ) ^ { m }$ .** The Paris law is the reason the engineer can predict the fatigue life of the structure, and the prediction is the reason the structure is safe.
- **The fatigue life is $N _ { f } = \int _ { a _ { 0 } } ^ { a _ { c } } d a / [ C \, ( Y \, \Delta \sigma \, \sqrt { \pi \, a } ) ^ { m } ]$ .** The fatigue life is the reason the structure is designed for the inspection interval, not the critical crack size.
- **The crack closure is the reason the fatigue crack growth is different from the nominal fatigue crack growth.** The crack closure is the reason the engineer uses the effective stress intensity factor, not the nominal stress intensity factor.
- **The fracture mechanics is the most important theory in structural design, because the fracture mechanics predicts the crack growth and the fracture load of the structure.** The prediction is the reason the engineer can design the structure to be safe.
- **The damage tolerance design is the reason the aircraft is designed for the detectable crack size, not the critical crack size.** The damage tolerance design is the most refined application of the fracture mechanics.
- **The plane strain fracture toughness is 20-50% lower than the plane stress fracture toughness, and the difference is the reason the engineer uses the plane strain fracture toughness for thick sections.** The plane strain condition is the reason the fracture toughness is a material property, not a specimen property.
:::

## Further reading

- **T.L. Anderson (2017)** — *Fracture Mechanics: Fundamentals and Applications*, 4th ed. CRC Press. The stress intensity factor, the fracture toughness, and the J-integral.
- **D. Broek (1986)** — *The Practical Application of Fracture Mechanics*, 4th ed. Engineering Advisory Services. The fracture mechanics in the engineering context.
- **H.L. Ewalds and R.J.H. Wanhill (1984)** — *Fracture Mechanics*, 2nd ed. Arnold. The fracture mechanics in the aerospace context.
- **R.W. Hertzberg (1996)** — *Deformation and Fracture Mechanics of Engineering Materials*, 4th ed. Wiley. The fracture mechanics and the fatigue crack growth.
- **S. Suresh (1998)** — *Fatigue of Materials*, 2nd ed. Cambridge University Press. The fatigue crack growth and the Paris law.
- **J.R. Rice (1968)** — "A path independent integral and the approximate analysis of strain concentration by notches and cracks." *Journal of Applied Mechanics*, 35, 379-386. The J-integral.
- **P.C. Paris and F. Erdogan (1963)** — "Critical analysis of crack propagation laws." *Journal of Basic Engineering*, 85, 528-534. The Paris law.
- **A.A. Griffith (1920)** — "The phenomena of rupture and flow in solids." *Philosophical Transactions of the Royal Society*, 221, 163-198. The energy balance theory of fracture.
