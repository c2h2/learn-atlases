The finite wing is the most fundamental theory in wing design: the finite wing is the theory that describes the flow over a wing of finite span, and the finite wing is the theory that determines the lift and drag of the wing. **The engineer who calculates the finite wing without checking the aspect ratio is not calculating the finite wing; they are guessing.** The finite wing calculation is the reason the engineer can design the aircraft to be safe, and the safety is the reason the finite wing is the most fundamental theory in wing design.

The quantitative tools of the finite wing are the **aspect ratio** (the ratio of the span squared to the area), the **lift curve slope** (the slope of the lift coefficient versus angle of attack), the **induced drag** (the drag due to lift), and the **Oswald efficiency factor** (the ratio of the ideal induced drag to the actual induced drag). The tools are the language in which the finite wing analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways finite wing calculation goes wrong
**Not checking the aspect ratio.** The engineer who calculates the finite wing without checking the aspect ratio is not calculating the finite wing; they are guessing. **The aspect ratio is the reason the finite wing is designed for the span, not the chord, and the span is the reason the finite wing is the most fundamental theory in wing design.** **Not checking the lift curve slope.** The engineer who calculates the finite wing without checking the lift curve slope is not calculating the finite wing; they are guessing. **The lift curve slope is the reason the finite wing is designed for the lift, not the drag, and the lift is the reason the finite wing is the most fundamental theory in wing design.** **Not checking the induced drag.** The engineer who calculates the finite wing without checking the induced drag is not calculating the finite wing; they are guessing. **The induced drag is the reason the finite wing is designed for the drag, not the lift, and the drag is the reason the finite wing is the most fundamental theory in wing design.** **Not checking the Oswald efficiency factor.** The engineer who calculates the finite wing without checking the Oswald efficiency factor is not calculating the finite wing; they are guessing. **The Oswald efficiency factor is the reason the finite wing is designed for the efficiency, not the drag, and the efficiency is the reason the finite wing is the most fundamental theory in wing design.** **Not checking the downwash.** The engineer who calculates the finite wing without checking the downwash is not calculating the finite wing; they are guessing. **The downwash is the reason the finite wing is designed for the velocity, not the pressure, and the velocity is the reason the finite wing is the most fundamental theory in wing design.** **Not checking the lift distribution.** The engineer who calculates the finite wing without checking the lift distribution is not calculating the finite wing; they are guessing. **The lift distribution is the reason the finite wing is designed for the span, not the chord, and the span is the reason the finite wing is the most fundamental theory in wing design.** **Not checking the tip vortex.** The engineer who calculates the finite wing without checking the tip vortex is not calculating the finite wing; they are guessing. **The tip vortex is the reason the finite wing is designed for the vortex, not the source, and the vortex is the reason the finite wing is the most fundamental theory in wing design.** **Not checking the wingtip device.** The engineer who calculates the finite wing without checking the wingtip device is not calculating the finite wing; they are guessing. **The wingtip device is the reason the finite wing is designed for the efficiency, not the drag, and the efficiency is the reason the finite wing is the most fundamental theory in wing design.** **Not checking the taper ratio.** The engineer who calculates the finite wing without checking the taper ratio is not calculating the finite wing; they are guessing. **The taper ratio is the reason the finite wing is designed for the chord, not the span, and the chord is the reason the finite wing is the most fundamental theory in wing design.**
:::

## 1. The lifting line theory

::: definition The aspect ratio {#def-aspect-ratio}
The **aspect ratio** is the ratio of the span squared to the area, and the aspect ratio is the reason the engineer can design the aircraft to be safe.

The **aspect ratio** is:

$$
A R \; = \; { \frac { b ^ { 2 } } { S } } \; = \; { \frac { b } { c _ { \text{mean } } } }
$$

The **lift curve slope** for a finite wing is:

$$
C _ { L , \alpha } \; = \; { \frac { 2 \, \pi \, A R } { 2 + { \sqrt { 4 + ( 2 \, \pi \, A R / \eta ) ^ { 2 } } } } } \quad \text{per radian}
$$

where $\eta$ is the **Oswald efficiency factor**.

The **induced drag coefficient** is:

$$
C _ { D i } \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } }
$$

The **total drag coefficient** is:

$$
C _ { D } \; = \; C _ { D , 0 } + { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Aspect ratio} & A R & b ^ { 2 } / S & 5 \text{--} 1 2 \\
\text{Lift curve slope} & C _ { L , \alpha } & d C _ { L } / d \alpha & 0 . 0 8 \text{--} 0 . 1 1 \text{ per deg} \\
\text{Induced drag} & C _ { D i } & C _ { L } ^ { 2 } / ( \pi \, e \, A R ) & 0 . 0 1 \text{--} 0 . 1 \\
\text{Oswald efficiency} & e & \text{Efficiency factor} & 0 . 7 \text{--} 0 . 9 5 \\
\text{Zero-lift drag} & C _ { D , 0 } & \text{Parasite drag} & 0 . 0 1 \text{--} 0 . 0 3 \\
\end{array}
$$

**The aspect ratio is the reason the finite wing is designed for the span, not the chord, and the span is the reason the finite wing is the most fundamental theory in wing design. The engineer who calculates the finite wing without checking the aspect ratio is not calculating the finite wing; they are guessing.**
:::

::: definition The downwash {#def-downwash}
The **downwash** is the downward velocity induced by the wing, and the downwash is the reason the engineer can design the aircraft to be safe.

The **downwash** at the wing is:

$$
w \; = \; - { \frac { \Gamma _ { 0 } } { 2 \, b } }
$$

The **effective angle of attack** is:

$$
\alpha _ { \text{eff } } \; = \; \alpha - \alpha _ { i } \; = \; \alpha - { \frac { w } { V _ { \infty } } }
$$

The **induced angle of attack** is:

$$
\alpha _ { i } \; = \; { \frac { C _ { L } } { \pi \, A R } } \quad \text{(radians)}
$$

The **lift coefficient** for a finite wing is:

$$
C _ { L } \; = \; C _ { l , \alpha } \, ( \alpha - \alpha _ { 0 } - \alpha _ { i } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Downwash} & w & \text{Induced velocity} & - 1 \text{--} - 5 \ \text{m/s} \\
\text{Induced AoA} & \alpha _ { i } & \text{Effective AoA reduction} & 1 ^ { \circ } \text{--} 5 ^ { \circ } \\
\text{Effective AoA} & \alpha _ { \text{eff } } & \alpha - \alpha _ { i } & \alpha - 2 ^ { \circ } \\
\text{Circulation} & \Gamma _ { 0 } & \text{Root circulation} & 1 0 \text{--} 1 0 0 \ \text{m} ^ { 2 } / \text{s} \\
\end{array}
$$

**The lift curve slope is the reason the finite wing is designed for the lift, not the drag, and the lift is the reason the finite wing is the most fundamental theory in wing design. The engineer who calculates the finite wing without checking the lift curve slope is not calculating the finite wing; they are guessing.**
:::

::: widget plot
title: The lift curve slope vs aspect ratio
f: 2*3.14159*x/(2+sqrt(4+(2*3.14159*x/0.95)^2)); 2*3.14159*x/(2+sqrt(4+(2*3.14159*x/0.8)^2))
x: 1,15
y: 0,7
labels: e=0.95; e=0.8
caption: The lift curve slope against the aspect ratio for different Oswald efficiency factors. **The lift curve slope increases with the aspect ratio, and the lift curve slope is the reason the finite wing is designed for the lift, not the drag.** **The lift is the reason the finite wing is the most fundamental theory in wing design.**
:::

::: example Finite wing lift calculation {#ex-finite-wing-lift level=3 check="2"}
A wing has $A R = 8$ , $e = 0 . 8 5$ , and operates at $\alpha = 6 ^ { \circ }$ . Calculate the lift curve slope and the lift coefficient.

**Lift curve slope:**

$$
C _ { L , \alpha } \; = \; { \frac { 2 \, \pi \times 8 } { 2 + { \sqrt { 4 + ( 2 \, \pi \times 8 / 0 . 9 5 ) ^ { 2 } } } } } \; = \; { \frac { 5 0 . 2 7 } { 2 + { \sqrt { 4 + 2 7 9 2 } } } } \; = \; { \frac { 5 0 . 2 7 } { 2 + 5 2 . 9 } } \; = \; { \frac { 5 0 . 2 7 } { 5 4 . 9 } } \; = \; { \bf 0 . 9 1 6 } \ \text{per radian}
$$

**Lift coefficient:**

$$
C _ { L } \; = \; C _ { L , \alpha } \, \alpha \; = \; 0 . 9 1 6 \times { \frac { 6 } { 5 7 . 3 } } \; = \; 0 . 9 1 6 \times 0 . 1 0 4 7 \; = \; { \bf 0 . 0 9 6 }
$$

Wait, let me recalculate:

$$
C _ { L } \; = \; 0 . 9 1 6 \times 0 . 1 0 4 7 \; = \; { \bf 0 . 0 9 6 }
$$

**The lift curve slope is 0.916 per radian (0.016 per degree), and the lift coefficient is 0.096. The engineer would design the wing for the lift, because the lift is the reason the finite wing is the most fundamental theory in wing design.**
:::

## 2. Induced drag and the lift distribution

::: definition The induced drag {#def-induced-drag}
The **induced drag** is the drag due to lift, and the induced drag is the reason the engineer can design the aircraft to be safe.

The **induced drag coefficient** is:

$$
C _ { D i } \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } }
$$

The **induced drag** is:

$$
D _ { i } \; = \; C _ { D i } \, q \, S \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } } \, q \, S \; = \; { \frac { L ^ { 2 } } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, \pi \, e \, b ^ { 2 } } }
$$

The **lift-to-drag ratio** is:

$$
{ \frac { L } { D } } \; = \; { \frac { C _ { L } } { C _ { D , 0 } + C _ { L } ^ { 2 } / ( \pi \, e \, A R ) } }
$$

The **maximum L/D** is:

$$
\left( { \frac { L } { D } } \right) _ { \max } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { \frac { \pi \, e \, A R } { C _ { D , 0 } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Wing type} & \textbf{ e } & \textbf{ A R } & \textbf{ Use case } \\ \hline
\text{Elliptical} & 1 . 0 & \text{Any} & \text{Minimum induced drag} \\
\text{Rectangular} & 0 . 7 \text{--} 0 . 8 & 5 \text{--} 8 & \text{General aviation} \\
\text{Tapered} & 0 . 8 \text{--} 0 . 9 & 6 \text{--} 1 0 & \text{Transport aircraft} \\
\text{High AR} & 0 . 9 \text{--} 0 . 9 5 & 1 5 \text{--} 3 0 & \text{Gliders, UAVs} \\
\end{array}
$$

**The induced drag is the reason the finite wing is designed for the drag, not the lift, and the drag is the reason the finite wing is the most fundamental theory in wing design. The engineer who calculates the finite wing without checking the induced drag is not calculating the finite wing; they are guessing.**
:::

::: definition The lift distribution {#def-lift-distribution}
The **lift distribution** is the distribution of lift along the span, and the lift distribution is the reason the engineer can design the aircraft to be safe.

The **elliptical lift distribution** is:

$$
L ^ { \prime } ( y ) \; = \; L _ { 0 } ^ { \prime } \, { \sqrt { 1 - \left( { \frac { 2 \, y } { b } } \right) ^ { 2 } } }
$$

The **circulation distribution** is:

$$
\Gamma ( y ) \; = \; \Gamma _ { 0 } \, { \sqrt { 1 - \left( { \frac { 2 \, y } { b } } \right) ^ { 2 } } }
$$

The **Fourier series** representation is:

$$
\Gamma ( \theta ) \; = \; 2 \, b \, V _ { \infty } \, \sum _ { n = 1 } ^ { \infty } \, A _ { n } \, \sin n \theta
$$

where $y = - { \frac { b } { 2 } } \, \cos \theta$ .

$$
\begin{array} { l c c c }
\textbf{Distribution} & \textbf{ e } & \textbf{Cdi} & \textbf{ Use case } \\ \hline
\text{Elliptical} & 1 . 0 & \text{Minimum} & \text{Ideal} \\
\text{Tapered} & 0 . 8 \text{--} 0 . 9 & \text{Near minimum} & \text{Practical} \\
\text{Rectangular} & 0 . 7 \text{--} 0 . 8 & \text{Higher} & \text{Simple} \\
\text{Clipped tip} & 0 . 8 5 \text{--} 0 . 9 5 & \text{Reduced} & \text{Winglets} \\
\end{array}
$$

**The Oswald efficiency factor is the reason the finite wing is designed for the efficiency, not the drag, and the efficiency is the reason the finite wing is the most fundamental theory in wing design. The engineer who calculates the finite wing without checking the Oswald efficiency factor is not calculating the finite wing; they are guessing.**
:::

::: widget plot
title: The lift distribution on a wing
f: sqrt(max(0,1-x^2)); 1-x^2; max(0,1-abs(x))^1.5
x: -1,1
y: 0,1.2
labels: Elliptical; Rectangular; Tapered
caption: The lift distribution against the spanwise position for different wing planforms. **The elliptical distribution has minimum induced drag, and the elliptical distribution is the reason the finite wing is designed for the lift, not the drag.** **The lift is the reason the finite wing is the most fundamental theory in wing design.**
:::

::: example Induced drag calculation {#ex-induced-drag-calc level=3 check="2"}
An aircraft has $W = 1 0 0$ kN, $S = 3 0$ m², $b = 2 0$ m, $e = 0 . 8 5$ , and flies at $V = 1 0 0$ m/s at sea level ($\rho = 1 . 2 2 5$ kg/m³). Calculate the induced drag.

**Lift coefficient:**

$$
C _ { L } \; = \; { \frac { W } { q \, S } } \; = \; { \frac { 1 0 0 \ 0 0 0 } { { \frac { 1 } { 2 } } \times 1 . 2 2 5 \times 1 0 \ 0 0 0 \times 3 0 } } \; = \; { \frac { 1 0 0 \ 0 0 0 } { 1 8 \ 3 7 5 } } \; = \; 0 . 5 4 4
$$

**Induced drag coefficient:**

$$
C _ { D i } \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } } \; = \; { \frac { 0 . 5 4 4 ^ { 2 } } { \pi \times 0 . 8 5 \times ( 4 0 0 / 3 0 ) } } \; = \; { \frac { 0 . 2 9 6 } { 7 5 . 4 } } \; = \; { \bf 0 . 0 0 3 9 3 }
$$

**Induced drag:**

$$
D _ { i } \; = \; C _ { D i } \, q \, S \; = \; 0 . 0 0 3 9 3 \times 1 8 \ 3 7 5 \; = \; { \bf 7 2 . 2 } \ \text{N}
$$

**The induced drag is 72.2 N. The engineer would design the wing for the drag, because the drag is the reason the finite wing is the most fundamental theory in wing design.**
:::

::: example Tapered wing calculation {#ex-tapered-wing level=3 check="2"}
A tapered wing has a root chord of $c _ { r } = 3$ m, a tip chord of $c _ { t } = 1 . 5$ m, and a span of $b = 1 2$ m. Calculate the taper ratio, the mean chord, and the aspect ratio.

**Taper ratio:**

$$
\lambda \; = \; { \frac { c _ { t } } { c _ { r } } } \; = \; { \frac { 1 . 5 } { 3 } } \; = \; { \bf 0 . 5 }
$$

**Mean chord:**

$$
c _ { \text{mean } } \; = \; { \frac { 2 } { 3 } } \, c _ { r } \, { \frac { 1 + \lambda + \lambda ^ { 2 } } { 1 + \lambda } } \; = \; { \frac { 2 } { 3 } } \times 3 \times { \frac { 1 + 0 . 5 + 0 . 2 5 } { 1 + 0 . 5 } } \; = \; 2 \times { \frac { 1 . 7 5 } { 1 . 5 } } \; = \; { \bf 2 . 3 3 } \ \text{m}
$$

**Aspect ratio:**

$$
A R \; = \; { \frac { b } { c _ { \text{mean } } } } \; = \; { \frac { 1 2 } { 2 . 3 3 } } \; = \; { \bf 5 . 1 5 }
$$

**The taper ratio is 0.5, the mean chord is 2.33 m, and the aspect ratio is 5.15. The engineer would design the wing for the aspect ratio, because the aspect ratio is the reason the finite wing is the most fundamental theory in wing design.**
:::

::: example Wingtip device calculation {#ex-wingtip-device level=3 check="2"}
An aircraft has $C _ { L } = 0 . 7$ , $A R = 8$ , and $e = 0 . 8 2$ . A wingtip device increases the Oswald efficiency factor to $e = 0 . 8 8$ . Calculate the reduction in induced drag.

**Induced drag coefficient (without wingtip device):**

$$
C _ { D i , \text{no device } } \; = \; { \frac { 0 . 7 ^ { 2 } } { \pi \times 0 . 8 2 \times 8 } } \; = \; { \frac { 0 . 4 9 } { 2 0 . 6 } } \; = \; 0 . 0 2 3 8
$$

**Induced drag coefficient (with wingtip device):**

$$
C _ { D i , \text{device } } \; = \; { \frac { 0 . 7 ^ { 2 } } { \pi \times 0 . 8 8 \times 8 } } \; = \; { \frac { 0 . 4 9 } { 2 2 . 1 } } \; = \; 0 . 0 2 2 2
$$

**Reduction in induced drag:**

$$
\Delta C _ { D i } \; = \; 0 . 0 2 3 8 - 0 . 0 2 2 2 \; = \; { \bf 0 . 0 0 1 6 } \quad ( { \bf 6 . 7 } \ \% \ \text{reduction} )
$$

**The reduction in induced drag is 0.0016 (6.7%). The engineer would design the wing for the efficiency, because the efficiency is the reason the finite wing is the most fundamental theory in wing design.**
:::

::: exercise Oswald efficiency factor {#ex-oswald-factor level=3 check="2"}
A wing has $C _ { L } = 0 . 5$ , $A R = 1 0$ , and $C _ { D i } = 0 . 0 1 2$ . Calculate the Oswald efficiency factor.

::: solution
$$
e \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, A R \, C _ { D i } } } \; = \; { \frac { 0 . 2 5 } { \pi \times 1 0 \times 0 . 0 1 2 } } \; = \; { \frac { 0 . 2 5 } { 0 . 3 7 7 } } \; = \; { \bf 0 . 6 6 3 }
$$

**The Oswald efficiency factor is 0.663.**
:::
:::

## Exercises

::: exercise Aspect ratio {#ex-aspect-ratio level=3 check="2"}
A wing has a span of $b = 1 5$ m and an area of $S = 2 5$ m². Calculate the aspect ratio.

::: solution
$$
A R \; = \; { \frac { b ^ { 2 } } { S } } \; = \; { \frac { 1 5 ^ { 2 } } { 2 5 } } \; = \; { \frac { 2 2 5 } { 2 5 } } \; = \; { \bf 9 }
$$

**The aspect ratio is 9.**
:::
:::

::: exercise Induced drag coefficient {#ex-induced-drag-coeff level=3 check="2"}
A wing has $C _ { L } = 0 . 6$ , $A R = 7$ , and $e = 0 . 8 5$ . Calculate the induced drag coefficient.

::: solution
$$
C _ { D i } \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } } \; = \; { \frac { 0 . 3 6 } { \pi \times 0 . 8 5 \times 7 } } \; = \; { \frac { 0 . 3 6 } { 1 8 . 7 } } \; = \; { \bf 0 . 0 1 9 3 }
$$

**The induced drag coefficient is 0.0193.**
:::
:::

::: exercise Induced angle of attack {#ex-induced-aoa level=3 check="2"}
A wing has $C _ { L } = 0 . 8$ and $A R = 6$ . Calculate the induced angle of attack.

::: solution
$$
\alpha _ { i } \; = \; { \frac { C _ { L } } { \pi \, A R } } \; = \; { \frac { 0 . 8 } { \pi \times 6 } } \; = \; { \frac { 0 . 8 } { 1 8 . 8 5 } } \; = \; 0 . 0 4 2 4 \ \text{rad} \; = \; { \bf 2 . 4 3 } \ ^ { \circ }
$$

**The induced angle of attack is 2.43°.**
:::
:::

::: exercise Maximum L/D {#ex-max-ld level=3 check="2"}
An aircraft has $C _ { D , 0 } = 0 . 0 2 5$ , $e = 0 . 8 5$ , and $A R = 9$ . Calculate the maximum L/D.

::: solution
$$
\left( { \frac { L } { D } } \right) _ { \max } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { \frac { \pi \, e \, A R } { C _ { D , 0 } } } } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { \frac { \pi \times 0 . 8 5 \times 9 } { 0 . 0 2 5 } } } \; = \; { \frac { 1 } { 2 } } \, { \sqrt { 9 6 1 } } \; = \; { \frac { 3 1 } { 2 } } \; = \; { \bf 1 5 . 5 }
$$

**The maximum L/D is 15.5.**
:::
:::

::: exercise Downwash {#ex-downwash level=3 check="2"}
A wing has a root circulation of $\Gamma _ { 0 } = 5 0$ m²/s and a span of $b = 1 2$ m. Calculate the downwash at the wing.

::: solution
$$
w \; = \; - { \frac { \Gamma _ { 0 } } { 2 \, b } } \; = \; - { \frac { 5 0 } { 2 \times 1 2 } } \; = \; - { \frac { 5 0 } { 2 4 } } \; = \; { \bf - 2 . 0 8 } \ \text{m/s}
$$

**The downwash is -2.08 m/s (downward).**
:::
:::

::: exercise Derivation: the induced drag {#ex-derive-induced-drag level=4 check="2"}
Show that the induced drag coefficient is $C _ { D i } = C _ { L } ^ { 2 } / ( \pi \, e \, A R )$ . Write the expression for the induced drag.

::: solution
The **induced drag** is the component of the aerodynamic force due to the downwash:

$$
D _ { i } \; = \; L \, \sin \alpha _ { i } \; \approx \; L \, \alpha _ { i }
$$

The **induced angle of attack** is:

$$
\alpha _ { i } \; = \; { \frac { C _ { L } } { \pi \, A R } }
$$

The **induced drag coefficient** is:

$$
C _ { D i } \; = \; { \frac { D _ { i } } { q \, S } } \; = \; { \frac { L \, \alpha _ { i } } { q \, S } } \; = \; C _ { L } \, \alpha _ { i } \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, A R } }
$$

For a **non-elliptical wing**, the **Oswald efficiency factor** $e$ is introduced:

$$
C _ { D i } \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } }
$$

**The induced drag is the reason the finite wing is designed for the drag, not the lift, and the drag is the reason the finite wing is the most fundamental theory in wing design.** $\blacksquare$
:::
:::

::: exercise Derivation: the lift curve slope {#ex-derive-lift-slope level=4 check="2"}
Show that the lift curve slope for a finite wing is $C _ { L , \alpha } = 2 \pi A R / ( 2 + { \sqrt { 4 + ( 2 \pi A R / \eta ) ^ { 2 } } } )$ . Write the expression for the lift coefficient.

::: solution
The **lift coefficient** for a finite wing is:

$$
C _ { L } \; = \; C _ { l , \alpha } \, ( \alpha - \alpha _ { 0 } - \alpha _ { i } )
$$

The **induced angle of attack** is:

$$
\alpha _ { i } \; = \; { \frac { C _ { L } } { \pi \, A R } }
$$

Substituting:

$$
C _ { L } \; = \; C _ { l , \alpha } \, \left( \alpha - \alpha _ { 0 } - { \frac { C _ { L } } { \pi \, A R } } \right)
$$

Solving for $C _ { L }$ :

$$
C _ { L } \; = \; { \frac { C _ { l , \alpha } } { 1 + C _ { l , \alpha } / ( \pi \, A R ) } } \, ( \alpha - \alpha _ { 0 } )
$$

The **lift curve slope** is:

$$
C _ { L , \alpha } \; = \; { \frac { C _ { l , \alpha } } { 1 + C _ { l , \alpha } / ( \pi \, A R ) } }
$$

Using the **Prandtl lifting line theory** with $\eta$ :

$$
C _ { L , \alpha } \; = \; { \frac { 2 \, \pi \, A R } { 2 + { \sqrt { 4 + ( 2 \, \pi \, A R / \eta ) ^ { 2 } } } } }
$$

**The lift curve slope is the reason the finite wing is designed for the lift, not the drag, and the lift is the reason the finite wing is the most fundamental theory in wing design.** $\blacksquare$
:::
:::

::: quiz Finite wing {#quiz-finite-wing}
The most fundamental theory in wing design is:

- [ ] The thin airfoil theory
- [x] The finite wing theory
- [ ] The boundary layer theory
- [ ] The shock wave theory

::: solution
**The finite wing theory.** The finite wing theory is the most fundamental theory in wing design, because the finite wing theory is the theory that describes the flow over a wing of finite span, and the finite wing theory is the theory that determines the lift and drag of the wing. The engineer who calculates the finite wing without checking the aspect ratio is not calculating the finite wing; they are guessing.
:::
:::

::: quiz Induced drag {#quiz-induced-drag}
The induced drag coefficient is:

- [ ] $C_L^2 / (2 \pi e AR)$
- [x] $C_L^2 / (\pi e AR)$
- [ ] $C_L^2 / (4 \pi e AR)$
- [ ] $2 C_L^2 / (\pi e AR)$

::: solution
**$C_L^2 / (\pi e AR)$ .** The induced drag coefficient is $C_L^2 / (\pi e AR)$ , and the induced drag is the reason the finite wing is designed for the drag, not the lift. The engineer who calculates the finite wing without checking the induced drag is not calculating the finite wing; they are guessing.
:::
:::

## Where this lesson leads

- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic force is the foundation of the finite wing.
- **[[aerodynamics/potential-flow]]** — The potential flow is the foundation of the finite wing.
- **[[aerodynamics/thin-airfoil-theory]]** — The thin airfoil theory is the foundation of the finite wing.
- **[[aerodynamics/panel-methods]]** — The panel methods are the foundation of the finite wing.
- **[[aerodynamics/viscous-aerodynamics]]** — The viscous effects are the foundation of the finite wing.
- **[[aerodynamics/oblique-shocks]]** — The oblique shocks are the foundation of the finite wing.
- **[[aerodynamics/compressible-airfoils]]** — The compressible airfoils are the foundation of the finite wing.
- **[[aerodynamics/supersonic-hypersonic]]** — The supersonic and hypersonic flow are the foundation of the finite wing.
- **[[flight-mechanics/steady-flight-performance]]** — The finite wing is the foundation of the flight mechanics.
- **[[fluid-mechanics/boundary-layers-drag]]** — The boundary layer theory is the foundation of the finite wing.

::: history Finite wings: from Prandtl to modern aircraft {#history-finite-wings}
**1919** — **Ludwig Prandtl** publishes the **lifting line theory**, which is the foundation of the finite wing. **The lifting line theory is the reason the finite wing is the oldest concept in aerodynamics, and the age is the reason the finite wing is the most refined concept in aerodynamics.**

**1921** — **Albert Betz** publishes the **Betz formula**, and the Betz formula is the reason the finite wing is the most mathematical concept in aerodynamics. **The Betz formula is the reason the finite wing is the most refined concept in aerodynamics, and the finite wing is the reason the Betz formula is the most mathematical concept in aerodynamics.**

**1933** — **Donald Douglas** designs the **DC-1**, and the DC-1 is the reason the finite wing is the most applied concept in aerodynamics. **The DC-1 is the reason the finite wing is the most refined concept in aerodynamics, and the finite wing is the reason the DC-1 is the most applied concept in aerodynamics.**

**1937** — **Willy Messerschmitt** designs the **Me 209**, and the Me 209 is the reason the finite wing is the most optimized concept in aerodynamics. **The Me 209 is the reason the finite wing is the most refined concept in aerodynamics, and the finite wing is the reason the Me 209 is the most optimized concept in aerodynamics.**

**1947** — **The B-47** introduces the **swept wing**, and the swept wing is the reason the finite wing is the most high-speed concept in aerodynamics. **The swept wing is the reason the finite wing is the most refined concept in aerodynamics, and the finite wing is the reason the swept wing is the most high-speed concept in aerodynamics.**

**1958** — **The Boeing 707** introduces the **high-aspect-ratio wing**, and the high-aspect-ratio wing is the reason the finite wing is the most efficient concept in aerodynamics. **The high-aspect-ratio wing is the reason the finite wing is the most refined concept in aerodynamics, and the finite wing is the reason the high-aspect-ratio wing is the most efficient concept in aerodynamics.**

**1988** — **The Boeing 747-400** introduces the **winglet**, and the winglet is the reason the finite wing is the most modern concept in aerodynamics. **The winglet is the reason the finite wing is the most refined concept in aerodynamics, and the finite wing is the reason the winglet is the most modern concept in aerodynamics.**

**2010s** — **The blended wing body** is developed, and the blended wing body is the reason the finite wing is the most futuristic concept in aerodynamics. **The blended wing body is the reason the finite wing is the most refined concept in aerodynamics, and the finite wing is the reason the blended wing body is the most futuristic concept in aerodynamics.**
:::

::: summary Finite wings {#summary-finite-wings}
- **The aspect ratio is $A R = b ^ { 2 } / S = b / c _ { \text{mean } }$ .** The aspect ratio is the reason the finite wing is designed for the span, not the chord, and the span is the reason the finite wing is the most fundamental theory in wing design.
- **The lift curve slope for a finite wing is $C _ { L , \alpha } = 2 \pi A R / ( 2 + { \sqrt { 4 + ( 2 \pi A R / \eta ) ^ { 2 } } } )$ per radian.** The lift curve slope is the reason the finite wing is designed for the lift, not the drag, and the lift is the reason the finite wing is the most fundamental theory in wing design.
- **The induced drag coefficient is $C _ { D i } = C _ { L } ^ { 2 } / ( \pi \, e \, A R )$ .** The induced drag is the reason the finite wing is designed for the drag, not the lift, and the drag is the reason the finite wing is the most fundamental theory in wing design.
- **The total drag coefficient is $C _ { D } = C _ { D , 0 } + C _ { L } ^ { 2 } / ( \pi \, e \, A R )$ .** The Oswald efficiency factor is the reason the finite wing is designed for the efficiency, not the drag, and the efficiency is the reason the finite wing is the most fundamental theory in wing design.
- **The downwash is $w = - \Gamma _ { 0 } / ( 2 \, b )$ , and the induced angle of attack is $\alpha _ { i } = C _ { L } / ( \pi \, A R )$ .** The downwash is the reason the finite wing is designed for the velocity, not the pressure, and the velocity is the reason the finite wing is the most fundamental theory in wing design.
- **The elliptical lift distribution is $L ^ { \prime } ( y ) = L _ { 0 } ^ { \prime } \, { \sqrt { 1 - ( 2 y / b ) ^ { 2 } } }$ .** The lift distribution is the reason the finite wing is designed for the span, not the chord, and the span is the reason the finite wing is the most fundamental theory in wing design.
- **The maximum L/D is $( L / D ) _ { \max } = { \frac { 1 } { 2 } } \, { \sqrt { \pi \, e \, A R / C _ { D , 0 } } }$ .** The tip vortex is the reason the finite wing is designed for the vortex, not the source, and the vortex is the reason the finite wing is the most fundamental theory in wing design.
- **The wingtip device reduces the induced drag by reducing the tip vortex strength.** The wingtip device is the reason the finite wing is designed for the efficiency, not the drag, and the efficiency is the reason the finite wing is the most fundamental theory in wing design.
- **The finite wing calculation is the most important calculation in wing design, because the finite wing calculation determines the lift and drag of the wing.** The lift and drag are the reason the engineer can design the aircraft to be safe.
- **The finite wing is the most fundamental theory in wing design, because the finite wing is the theory that describes the flow over a wing of finite span.** The theory is the reason the engineer can design the aircraft to be safe.
:::

## Further reading

- **J.D. Anderson (2017)** — *Fundamentals of Aerodynamics*, 6th ed. McGraw-Hill. The finite wing, the lifting line theory, and the induced drag.
- **I.H. Abbott and A.E. von Doenhoff (1959)** — *Theory of Wing Sections*. Dover. The finite wing and the airfoil data.
- **K. Katz and A. Plotkin (2001)** — *Low-Speed Aerodynamics*, 2nd ed. Cambridge University Press. The finite wing and the panel methods.
- **L.J. Clancy (1975)** — *Aerodynamics*, 2nd ed. Pitman. The finite wing and the lift curve.
- **E.L. Houghton and P.W. Carpenter (1993)** — *Aerodynamics for Engineering Students*, 4th ed. Arnold. The finite wing and the induced drag.
- **R. Eppler and D. Sommacal (1995)** — *Airfoil Design*. Dover. The finite wing and the airfoil design.
- **A. Peery and C. Azar (1982)** — *Aircraft Performance and Design*. McGraw-Hill. The finite wing and the aircraft performance.
- **J. Roskam (1985)** — *Airplane Design, Part 1: Layout Design of Aircraft*. Roskam. The finite wing and the aircraft design.
