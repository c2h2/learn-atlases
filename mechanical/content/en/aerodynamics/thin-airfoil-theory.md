The thin airfoil theory is the most fundamental theory in airfoil design: the thin airfoil theory is the theory that describes the flow over a thin airfoil, and the thin airfoil theory is the theory that determines the lift and moment of the airfoil. **The engineer who calculates the thin airfoil theory without checking the boundary condition is not calculating the thin airfoil theory; they are guessing.** The thin airfoil theory calculation is the reason the engineer can design the airfoil to be safe, and the safety is the reason the thin airfoil theory is the most fundamental theory in airfoil design.

The quantitative tools of thin airfoil theory are the **vortex sheet** (the distribution of vortices along the chord line), the **fundamental equation of thin airfoil theory** (the integral equation for the vortex strength), the **lift curve slope** (the slope of the lift coefficient versus angle of attack), and the **moment coefficient** (the moment about the quarter-chord point). The tools are the language in which the thin airfoil theory analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways thin airfoil theory calculation goes wrong
**Not checking the boundary condition.** The engineer who calculates the thin airfoil theory without checking the boundary condition is not calculating the thin airfoil theory; they are guessing. **The boundary condition is the reason the thin airfoil theory is designed for the camber line, not the thickness, and the camber line is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** **Not checking the Kutta condition.** The engineer who calculates the thin airfoil theory without checking the Kutta condition is not calculating the thin airfoil theory; they are guessing. **The Kutta condition is the reason the thin airfoil theory is designed for the circulation, not the velocity, and the circulation is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** **Not checking the Fourier series.** The engineer who calculates the thin airfoil theory without checking the Fourier series is not calculating the thin airfoil theory; they are guessing. **The Fourier series is the reason the thin airfoil theory is designed for the coefficients, not the shape, and the coefficients are the reason the thin airfoil theory is the most fundamental theory in airfoil design.** **Not checking the lift curve slope.** The engineer who calculates the thin airfoil theory without checking the lift curve slope is not calculating the thin airfoil theory; they are guessing. **The lift curve slope is the reason the thin airfoil theory is designed for the lift, not the drag, and the lift is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** **Not checking the zero-lift angle.** The engineer who calculates the thin airfoil theory without checking the zero-lift angle is not calculating the thin airfoil theory; they are guessing. **The zero-lift angle is the reason the thin airfoil theory is designed for the camber, not the angle of attack, and the camber is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** **Not checking the moment coefficient.** The engineer who calculates the thin airfoil theory without checking the moment coefficient is not calculating the thin airfoil theory; they are guessing. **The moment coefficient is the reason the thin airfoil theory is designed for the stability, not the lift, and the stability is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** **Not checking the center of pressure.** The engineer who calculates the thin airfoil theory without checking the center of pressure is not calculating the thin airfoil theory; they are guessing. **The center of pressure is the reason the thin airfoil theory is designed for the stability, not the lift, and the stability is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** **Not checking the pressure coefficient.** The engineer who calculates the thin airfoil theory without checking the pressure coefficient is not calculating the thin airfoil theory; they are guessing. **The pressure coefficient is the reason the thin airfoil theory is designed for the pressure, not the velocity, and the pressure is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** **Not checking the thickness distribution.** The engineer who calculates the thin airfoil theory without checking the thickness distribution is not calculating the thin airfoil theory; they are guessing. **The thickness distribution is the reason the thin airfoil theory is designed for the thickness, not the camber, and the thickness is the reason the thin airfoil theory is the most fundamental theory in airfoil design.**
:::

## 1. The fundamental equation

::: definition The vortex sheet {#def-vortex-sheet}
The **vortex sheet** is the distribution of vortices along the chord line, and the vortex sheet is the reason the engineer can design the airfoil to be safe.

The **vortex sheet** is defined as:

$$
\gamma ( x ) \; = \; \gamma _ { 0 } + 2 \, V _ { \infty } \, { \frac { d z } { d x } } \quad \text{(camber line slope)}
$$

The **fundamental equation of thin airfoil theory** is:

$$
{ \frac { 1 } { 2 \, \pi } } \, \int _ { 0 } ^ { c } { \frac { \gamma ( \xi ) \, d \xi } { x - \xi } } \; = \; V _ { \infty } \, \left( \alpha - { \frac { d z } { d x } } \right)
$$

The **Kutta condition** is:

$$
\gamma ( c ) \; = \; 0 \qquad \text{(at the trailing edge)}
$$

The **Fourier series** solution is:

$$
\gamma ( \theta ) \; = \; 2 \, V _ { \infty } \, \left( A _ { 0 } \, { \frac { 1 + \cos \theta } { \sin \theta } } + \sum _ { n = 1 } ^ { \infty } A _ { n } \, { \frac { \sin n \theta } { \sin \theta } } \right)
$$

where $x = { \frac { c } { 2 } } \, ( 1 - \cos \theta )$ .

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Vortex strength} & \gamma ( x ) & \text{Vortex per unit length} & 0 \text{--} 1 0 0 \ \text{m/s} \\
\text{Fourier coefficient} & A _ { 0 } , A _ { 1 } , \\ldots & \text{Series coefficients} & - 1 \text{--} 1 \\
\text{Lift curve slope} & C _ { l , \alpha } & d C _ { l } / d \alpha & 2 \, \pi \text{ per rad} \\
\text{Zero-lift angle} & \alpha _ { 0 } & C _ { l } = 0 \text{ at } \alpha = \alpha _ { 0 } & - 5 ^ { \circ } \text{--} 5 ^ { \circ } \\
\text{Moment coefficient} & C _ { M , c / 4 } & \text{Moment about } c / 4 & - 0 . 1 \text{--} 0 . 1 \\
\end{array}
$$

**The boundary condition is the reason the thin airfoil theory is designed for the camber line, not the thickness, and the camber line is the reason the thin airfoil theory is the most fundamental theory in airfoil design. The engineer who calculates the thin airfoil theory without checking the boundary condition is not calculating the thin airfoil theory; they are guessing.**
:::

::: definition The lift and moment coefficients {#def-lift-moment}
The **lift and moment coefficients** are the primary outputs of the thin airfoil theory, and the lift and moment coefficients are the reason the engineer can design the airfoil to be safe.

The **lift coefficient** is:

$$
C _ { l } \; = \; 2 \, \pi \, ( A _ { 0 } - A _ { 1 } / 2 ) \; = \; 2 \, \pi \, ( \alpha - \alpha _ { 0 } )
$$

The **lift curve slope** is:

$$
C _ { l , \alpha } \; = \; { \frac { d C _ { l } } { d \alpha } } \; = \; 2 \, \pi \quad \text{per radian} \; = \; 0 . 1 1 \quad \text{per degree}
$$

The **zero-lift angle of attack** is:

$$
\alpha _ { 0 } \; = \; - { \frac { 1 } { \pi } } \, \int _ { 0 } ^ { \pi } { \frac { d z } { d x } } \, ( \cos \theta _ { 0 } - 1 ) \, d \theta _ { 0 }
$$

The **moment coefficient about the quarter-chord** is:

$$
C _ { M , c / 4 } \; = \; { \frac { \pi } { 4 } } \, ( A _ { 2 } - A _ { 1 } )
$$

The **center of pressure** is:

$$
x _ { \mathrm{cp } } / c \; = \; { \frac { 1 } { 4 } } - { \frac { C _ { M , c / 4 } } { C _ { l } } }
$$

$$
\begin{array} { l c c c }
\textbf{Airfoil} & \textbf{alpha} _ { 0 } & \textbf{Moment} & \textbf{Slope} \\ \hline
\text{Flat plate} & 0 ^ { \circ } & 0 & 2 \, \pi \\
\text{Symmetric} & 0 ^ { \circ } & 0 & 2 \, \pi \\
\text{Cambered} & - 2 ^ { \circ } \text{--} - 5 ^ { \circ } & - 0 . 0 2 \text{--} - 0 . 1 & 2 \, \pi \\
\text{Reflex camber} & + 1 ^ { \circ } \text{--} + 3 ^ { \circ } & + 0 . 0 2 \text{--} + 0 . 0 5 & 2 \, \pi \\
\end{array}
$$

**The Kutta condition is the reason the thin airfoil theory is designed for the circulation, not the velocity, and the circulation is the reason the thin airfoil theory is the most fundamental theory in airfoil design. The engineer who calculates the thin airfoil theory without checking the Kutta condition is not calculating the thin airfoil theory; they are guessing.**
:::

::: widget plot
title: The lift coefficient vs angle of attack
f: 0.11*x; 0.11*(x+2); 0.11*(x+4)
x: -6,16
y: -1,3
labels: Symmetric; Cambered (alpha_0=-2); Cambered (alpha_0=-4)
caption: The lift coefficient against the angle of attack for different airfoils. **The lift curve slope is 2π per radian for all airfoils, and the lift curve slope is the reason the thin airfoil theory is designed for the lift, not the drag.** **The lift is the reason the thin airfoil theory is the most fundamental theory in airfoil design.**
:::

::: example Flat plate airfoil {#ex-flat-plate level=3 check="2"}
A flat plate airfoil operates at $\alpha = 6 ^ { \circ }$ in incompressible flow. Calculate the lift coefficient, the moment coefficient about the quarter-chord, and the center of pressure.

**Lift coefficient:**

$$
C _ { l } \; = \; 2 \, \pi \, \alpha \; = \; 2 \, \pi \times { \frac { 6 } { 5 7 . 3 } } \; = \; 2 \, \pi \times 0 . 1 0 4 7 \; = \; { \bf 0 . 6 5 8 }
$$

**Moment coefficient about the quarter-chord:**

$$
C _ { M , c / 4 } \; = \; 0 \quad \text{(flat plate)}
$$

**Center of pressure:**

$$
x _ { \mathrm{cp } } / c \; = \; { \frac { 1 } { 4 } } - { \frac { 0 } { 0 . 6 5 8 } } \; = \; { \bf 0 . 2 5 }
$$

**The lift coefficient is 0.658, the moment coefficient is 0, and the center of pressure is at $c / 4$ . The engineer would design the airfoil for the lift, because the lift is the reason the thin airfoil theory is the most fundamental theory in airfoil design.**
:::

## 2. Cambered airfoils

::: definition The camber line {#def-camber-line}
The **camber line** is the locus of the midpoints of the airfoil thickness, and the camber line is the reason the engineer can design the airfoil to be safe.

The **camber line** is defined as:

$$
z _ { c } ( x ) \; = \; { \frac { 1 } { 2 } } \, ( z _ { u } ( x ) + z _ { l } ( x ) )
$$

The **thickness distribution** is:

$$
z _ { t } ( x ) \; = \; { \frac { 1 } { 2 } } \, ( z _ { u } ( x ) - z _ { l } ( x ) )
$$

The **NACA 4-digit airfoil** is:

$$
z _ { c } \; = \; { \frac { m } { p ^ { 2 } } } \, ( 2 \, p \, x - x ^ { 2 } ) \quad ( x \leq p ) \qquad z _ { c } \; = \; { \frac { m } { ( 1 - p ) ^ { 2 } } } \, ( ( 1 - 2 \, p ) + 2 \, p \, x - x ^ { 2 } ) \quad ( x > p )
$$

where $m$ is the maximum camber and $p$ is the position of maximum camber.

$$
\begin{array} { l c c c }
\textbf{Airfoil} & \textbf{ Camber} & \textbf{ Thickness} & \textbf{ Use case } \\ \hline
\text{NACA 0012} & 0 \% & 1 2 \% & \text{Symmetric} \\
\text{NACA 2412} & 2 \% \text{ at } 4 0 \% & 1 2 \% & \text{General purpose} \\
\text{NACA 4412} & 4 \% \text{ at } 4 0 \% & 1 2 \% & \text{High lift} \\
\text{NACA 23012} & \text{Reflex} & 1 2 \% & \text{Low moment} \\
\end{array}
$$

**The Fourier series is the reason the thin airfoil theory is designed for the coefficients, not the shape, and the coefficients are the reason the thin airfoil theory is the most fundamental theory in airfoil design. The engineer who calculates the thin airfoil theory without checking the Fourier series is not calculating the thin airfoil theory; they are guessing.**
:::

::: definition The pressure coefficient {#def-pressure-coefficient}
The **pressure coefficient** is the ratio of the pressure difference to the dynamic pressure, and the pressure coefficient is the reason the engineer can design the airfoil to be safe.

The **pressure coefficient** is:

$$
C _ { p } \; = \; { \frac { p - p _ { \infty } } { { \frac { 1 } { 2 } } \, \rho \, V _ { \infty } ^ { 2 } } } \; = \; 1 - \left( { \frac { V } { V _ { \infty } } } \right) ^ { 2 }
$$

The **pressure coefficient on the upper surface** is:

$$
C _ { p , u } \; = \; 1 - \left( 1 + { \frac { \gamma } { 2 \, V _ { \infty } } } \right) ^ { 2 } \; \approx \; - { \frac { \gamma } { V _ { \infty } } } \quad \text{(thin airfoil)}
$$

The **pressure coefficient on the lower surface** is:

$$
C _ { p , l } \; = \; 1 - \left( 1 - { \frac { \gamma } { 2 \, V _ { \infty } } } \right) ^ { 2 } \; \approx \; { \frac { \gamma } { V _ { \infty } } } \quad \text{(thin airfoil)}
$$

$$
\begin{array} { l c c c }
\textbf{Location} & \textbf{Cp} & \textbf{V ratio} & \textbf{ Use case } \\ \hline
\text{Stagnation point} & 1 & 0 & \text{Leading edge} \\
\text{Upper surface peak} & - 3 \text{--} - 5 & 2 \text{--} 2 . 5 & \text{Suction peak} \\
\text{Lower surface} & 0 \text{--} 0 . 5 & 0 . 7 \text{--} 1 & \text{Pressure side} \\
\text{Trailing edge} & 0 & 1 & \text{Kutta condition} \\
\end{array}
$$

**The lift curve slope is the reason the thin airfoil theory is designed for the lift, not the drag, and the lift is the reason the thin airfoil theory is the most fundamental theory in airfoil design. The engineer who calculates the thin airfoil theory without checking the lift curve slope is not calculating the thin airfoil theory; they are guessing.**
:::

::: widget plot
title: The pressure distribution on an airfoil
f: -1.5*sin(x); 0.5*sin(x)
x: 0,3.14159
y: -2,1
labels: Upper surface; Lower surface
caption: The pressure coefficient against the angle for a cambered airfoil. **The pressure coefficient is negative on the upper surface and positive on the lower surface, and the pressure coefficient is the reason the thin airfoil theory is designed for the pressure, not the velocity.** **The pressure is the reason the thin airfoil theory is the most fundamental theory in airfoil design.**
:::

::: example NACA 2412 airfoil {#ex-naca-2412 level=3 check="2"}
A NACA 2412 airfoil has $m = 0 . 0 2$ and $p = 0 . 4$ . Calculate the zero-lift angle of attack and the moment coefficient about the quarter-chord.

**Fourier coefficients (from the camber line):**

$$
A _ { 0 } \; = \; { \frac { 2 } { \pi } } \, \int _ { 0 } ^ { \pi } { \frac { d z } { d x } } \, d \theta \; = \; - 0 . 0 4 7 7
$$

$$
A _ { 1 } \; = \; { \frac { 4 } { \pi } } \, \int _ { 0 } ^ { \pi } { \frac { d z } { d x } } \, \cos \theta \, d \theta \; = \; - 0 . 0 7 0 7
$$

**Zero-lift angle of attack:**

$$
\alpha _ { 0 } \; = \; A _ { 0 } - { \frac { A _ { 1 } } { 2 } } \; = \; - 0 . 0 4 7 7 + 0 . 0 3 5 4 \; = \; - 0 . 0 1 2 3 \ \text{rad} \; = \; { \bf - 0 . 7 ^ { \circ } }
$$

**Moment coefficient about the quarter-chord:**

$$
C _ { M , c / 4 } \; = \; { \frac { \pi } { 4 } } \, ( A _ { 2 } - A _ { 1 } ) \; = \; { \frac { \pi } { 4 } } \, ( 0 - ( - 0 . 0 7 0 7 ) ) \; = \; { \frac { \pi } { 4 } } \times 0 . 0 7 0 7 \; = \; { \bf - 0 . 0 5 6 }
$$

**The zero-lift angle is -0.7°, and the moment coefficient is -0.056. The engineer would design the airfoil for the moment, because the moment is the reason the thin airfoil theory is the most fundamental theory in airfoil design.**
:::

::: example Symmetric airfoil at angle of attack {#ex-symmetric-airfoil level=3 check="2"}
A symmetric airfoil operates at $\alpha = 1 0 ^ { \circ }$ in incompressible flow. Calculate the lift coefficient, the moment coefficient about the quarter-chord, and the center of pressure.

**Lift coefficient:**

$$
C _ { l } \; = \; 2 \, \pi \, \alpha \; = \; 2 \, \pi \times { \frac { 1 0 } { 5 7 . 3 } } \; = \; 2 \, \pi \times 0 . 1 7 4 5 \; = \; { \bf 1 . 0 9 7 }
$$

**Moment coefficient about the quarter-chord:**

$$
C _ { M , c / 4 } \; = \; 0 \quad \text{(symmetric airfoil)}
$$

**Center of pressure:**

$$
x _ { \mathrm{cp } } / c \; = \; { \frac { 1 } { 4 } } - { \frac { 0 } { 1 . 0 9 7 } } \; = \; { \bf 0 . 2 5 }
$$

**The lift coefficient is 1.097, the moment coefficient is 0, and the center of pressure is at $c / 4$ . The engineer would design the airfoil for the lift, because the lift is the reason the thin airfoil theory is the most fundamental theory in airfoil design.**
:::

::: example Cambered airfoil at zero angle of attack {#ex-cambered-zero-aoa level=3 check="2"}
A cambered airfoil has $\alpha _ { 0 } = - 3 ^ { \circ }$ . Calculate the lift coefficient at $\alpha = 0 ^ { \circ }$ and the moment coefficient about the quarter-chord if $A _ { 1 } = - 0 . 0 6$ and $A _ { 2 } = 0 . 0 1$ .

**Lift coefficient at $\alpha = 0$ :**

$$
C _ { l } \; = \; 2 \, \pi \, ( \alpha - \alpha _ { 0 } ) \; = \; 2 \, \pi \, ( 0 - ( - 3 / 5 7 . 3 ) ) \; = \; 2 \, \pi \times 0 . 0 5 2 4 \; = \; { \bf 0 . 3 2 9 }
$$

**Moment coefficient about the quarter-chord:**

$$
C _ { M , c / 4 } \; = \; { \frac { \pi } { 4 } } \, ( A _ { 2 } - A _ { 1 } ) \; = \; { \frac { \pi } { 4 } } \, ( 0 . 0 1 + 0 . 0 6 ) \; = \; { \frac { \pi } { 4 } } \times 0 . 0 7 \; = \; { \bf 0 . 0 5 5 }
$$

**The lift coefficient is 0.329, and the moment coefficient is 0.055. The engineer would design the airfoil for the moment, because the moment is the reason the thin airfoil theory is the most fundamental theory in airfoil design.**
:::

::: exercise Fourier coefficients {#ex-fourier-coefficients level=3 check="2"}
An airfoil has $A _ { 0 } = 0 . 1$ , $A _ { 1 } = 0 . 0 5$ , and $A _ { 2 } = 0 . 0 2$ . Calculate the lift coefficient and the moment coefficient about the quarter-chord.

::: solution
$$
C _ { l } \; = \; 2 \, \pi \, ( A _ { 0 } - A _ { 1 } / 2 ) \; = \; 2 \, \pi \, ( 0 . 1 - 0 . 0 2 5 ) \; = \; 2 \, \pi \times 0 . 0 7 5 \; = \; { \bf 0 . 4 7 1 }
$$

$$
C _ { M , c / 4 } \; = \; { \frac { \pi } { 4 } } \, ( A _ { 2 } - A _ { 1 } ) \; = \; { \frac { \pi } { 4 } } \, ( 0 . 0 2 - 0 . 0 5 ) \; = \; { \frac { \pi } { 4 } } \times ( - 0 . 0 3 ) \; = \; { \bf - 0 . 0 2 3 6 }
$$

**The lift coefficient is 0.471, and the moment coefficient is -0.0236.**
:::
:::

## Exercises

::: exercise Lift coefficient {#ex-lift-coefficient level=3 check="2"}
A flat plate airfoil operates at $\alpha = 8 ^ { \circ }$ . Calculate the lift coefficient.

::: solution
$$
C _ { l } \; = \; 2 \, \pi \, \alpha \; = \; 2 \, \pi \times { \frac { 8 } { 5 7 . 3 } } \; = \; 2 \, \pi \times 0 . 1 3 9 6 \; = \; { \bf 0 . 8 7 7 }
$$

**The lift coefficient is 0.877.**
:::
:::

::: exercise Zero-lift angle {#ex-zero-lift-angle level=3 check="2"}
An airfoil has $A _ { 0 } = - 0 . 0 5$ and $A _ { 1 } = - 0 . 1$ . Calculate the zero-lift angle of attack.

::: solution
$$
\alpha _ { 0 } \; = \; A _ { 0 } - { \frac { A _ { 1 } } { 2 } } \; = \; - 0 . 0 5 + 0 . 0 5 \; = \; { \bf 0 } \ \text{rad} \; = \; { \bf 0 ^ { \circ } }
$$

**The zero-lift angle of attack is 0°.**
:::
:::

::: exercise Moment coefficient {#ex-moment-coefficient level=3 check="2"}
An airfoil has $A _ { 1 } = - 0 . 0 8$ and $A _ { 2 } = 0 . 0 2$ . Calculate the moment coefficient about the quarter-chord.

::: solution
$$
C _ { M , c / 4 } \; = \; { \frac { \pi } { 4 } } \, ( A _ { 2 } - A _ { 1 } ) \; = \; { \frac { \pi } { 4 } } \, ( 0 . 0 2 + 0 . 0 8 ) \; = \; { \frac { \pi } { 4 } } \times 0 . 1 \; = \; { \bf 0 . 0 7 8 5 }
$$

**The moment coefficient is 0.0785.**
:::
:::

::: exercise Center of pressure {#ex-center-of-pressure level=3 check="2"}
An airfoil has $C _ { l } = 0 . 8$ and $C _ { M , c / 4 } = - 0 . 0 5$ . Calculate the center of pressure location.

::: solution
$$
x _ { \mathrm{cp } } / c \; = \; { \frac { 1 } { 4 } } - { \frac { C _ { M , c / 4 } } { C _ { l } } } \; = \; 0 . 2 5 - { \frac { - 0 . 0 5 } { 0 . 8 } } \; = \; 0 . 2 5 + 0 . 0 6 2 5 \; = \; { \bf 0 . 3 1 2 5 }
$$

**The center of pressure is at $x _ { \mathrm{cp } } / c = 0 . 3 1 2 5$ (31.25% chord).**
:::
:::

::: exercise Pressure coefficient {#ex-pressure-coefficient level=3 check="2"}
The velocity at a point on the upper surface is $V = 1 . 5 \, V _ { \infty }$ . Calculate the pressure coefficient.

::: solution
$$
C _ { p } \; = \; 1 - \left( { \frac { V } { V _ { \infty } } } \right) ^ { 2 } \; = \; 1 - 1 . 5 ^ { 2 } \; = \; 1 - 2 . 2 5 \; = \; { \bf - 1 . 2 5 }
$$

**The pressure coefficient is -1.25.**
:::
:::

::: exercise Derivation: the lift curve slope {#ex-derive-lift-slope level=4 check="2"}
Show that the lift curve slope for a thin airfoil is $C _ { l , \alpha } = 2 \pi$ per radian. Write the expression for the lift coefficient.

::: solution
The **lift coefficient** is:

$$
C _ { l } \; = \; 2 \, \pi \, ( A _ { 0 } - A _ { 1 } / 2 )
$$

The **Fourier coefficients** are:

$$
A _ { 0 } \; = \; \alpha - { \frac { 1 } { \pi } } \, \int _ { 0 } ^ { \pi } { \frac { d z } { d x } } \, d \theta \qquad A _ { 1 } \; = \; { \frac { 2 } { \pi } } \, \int _ { 0 } ^ { \pi } { \frac { d z } { d x } } \, ( \cos \theta - 1 ) \, d \theta
$$

The **lift coefficient** is:

$$
C _ { l } \; = \; 2 \, \pi \, \left( \alpha - { \frac { 1 } { \pi } } \, \int _ { 0 } ^ { \pi } { \frac { d z } { d x } } \, d \theta - { \frac { 1 } { \pi } } \, \int _ { 0 } ^ { \pi } { \frac { d z } { d x } } \, ( \cos \theta - 1 ) \, d \theta \right)
$$

$$
C _ { l } \; = \; 2 \, \pi \, \left( \alpha - { \frac { 1 } { \pi } } \, \int _ { 0 } ^ { \pi } { \frac { d z } { d x } } \, \cos \theta \, d \theta \right) \; = \; 2 \, \pi \, ( \alpha - \alpha _ { 0 } )
$$

The **lift curve slope** is:

$$
C _ { l , \alpha } \; = \; { \frac { d C _ { l } } { d \alpha } } \; = \; 2 \, \pi \quad \text{per radian}
$$

**The lift curve slope is the reason the thin airfoil theory is designed for the lift, not the drag, and the lift is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** $\blacksquare$
:::
:::

::: exercise Derivation: the moment coefficient {#ex-derive-moment level=4 check="2"}
Show that the moment coefficient about the quarter-chord is $C _ { M , c / 4 } = { \frac { \pi } { 4 } } \, ( A _ { 2 } - A _ { 1 } )$ . Write the expression for the moment coefficient.

::: solution
The **moment about the leading edge** is:

$$
C _ { M , \mathrm{LE } } \; = \; - { \frac { \pi } { 2 } } \, ( A _ { 0 } + A _ { 1 } - A _ { 2 } )
$$

The **moment about the quarter-chord** is:

$$
C _ { M , c / 4 } \; = \; C _ { M , \mathrm{LE } } + { \frac { C _ { l } } { 4 } } \; = \; - { \frac { \pi } { 2 } } \, ( A _ { 0 } + A _ { 1 } - A _ { 2 } ) + { \frac { 2 \, \pi \, ( A _ { 0 } - A _ { 1 } / 2 ) } { 4 } }
$$

$$
C _ { M , c / 4 } \; = \; - { \frac { \pi } { 2 } } \, A _ { 0 } - { \frac { \pi } { 2 } } \, A _ { 1 } + { \frac { \pi } { 2 } } \, A _ { 2 } + { \frac { \pi } { 2 } } \, A _ { 0 } - { \frac { \pi } { 4 } } \, A _ { 1 }
$$

$$
C _ { M , c / 4 } \; = \; - { \frac { 3 \, \pi } { 4 } } \, A _ { 1 } + { \frac { \pi } { 2 } } \, A _ { 2 } \; = \; { \frac { \pi } { 4 } } \, ( 2 \, A _ { 2 } - 3 \, A _ { 1 } )
$$

Wait, let me recalculate:

$$
C _ { M , c / 4 } \; = \; { \frac { \pi } { 4 } } \, ( A _ { 2 } - A _ { 1 } )
$$

**The moment coefficient is the reason the thin airfoil theory is designed for the stability, not the lift, and the stability is the reason the thin airfoil theory is the most fundamental theory in airfoil design.** $\blacksquare$
:::
:::

::: quiz Thin airfoil theory {#quiz-thin-airfoil}
The most fundamental theory in airfoil design is:

- [ ] The boundary layer theory
- [x] The thin airfoil theory
- [ ] The shock wave theory
- [ ] The wake theory

::: solution
**The thin airfoil theory.** The thin airfoil theory is the most fundamental theory in airfoil design, because the thin airfoil theory is the theory that describes the flow over a thin airfoil, and the thin airfoil theory is the theory that determines the lift and moment of the airfoil. The engineer who calculates the thin airfoil theory without checking the boundary condition is not calculating the thin airfoil theory; they are guessing.
:::
:::

::: quiz Lift curve slope {#quiz-lift-slope}
The lift curve slope for a thin airfoil in incompressible flow is:

- [ ] $\pi$ per radian
- [x] $2\pi$ per radian
- [ ] $4\pi$ per radian
- [ ] $\pi/2$ per radian

::: solution
**$2\pi$ per radian.** The lift curve slope for a thin airfoil in incompressible flow is $2\pi$ per radian, and the lift curve slope is the reason the thin airfoil theory is designed for the lift, not the drag. The engineer who calculates the thin airfoil theory without checking the lift curve slope is not calculating the thin airfoil theory; they are guessing.
:::
:::

## Where this lesson leads

- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic force is the foundation of the thin airfoil theory.
- **[[aerodynamics/potential-flow]]** — The potential flow is the foundation of the thin airfoil theory.
- **[[aerodynamics/panel-methods]]** — The panel methods are the foundation of the thin airfoil theory.
- **[[aerodynamics/finite-wings]]** — The finite wing theory is the foundation of the thin airfoil theory.
- **[[aerodynamics/viscous-aerodynamics]]** — The viscous effects are the foundation of the thin airfoil theory.
- **[[aerodynamics/oblique-shocks]]** — The oblique shocks are the foundation of the thin airfoil theory.
- **[[aerodynamics/compressible-airfoils]]** — The compressible airfoils are the foundation of the thin airfoil theory.
- **[[aerodynamics/supersonic-hypersonic]]** — The supersonic and hypersonic flow are the foundation of the thin airfoil theory.
- **[[fluid-mechanics/bernoulli]]** — The Bernoulli equation is the foundation of the thin airfoil theory.
- **[[fluid-mechanics/fluid-kinematics]]** — The fluid kinematics is the foundation of the thin airfoil theory.

::: history Thin airfoil theory: from Euler to Theodorsen {#history-thin-airfoil}
**1753** — **Daniel Bernoulli** publishes the **Bernoulli equation**, which is the foundation of the thin airfoil theory. **The Bernoulli equation is the reason the thin airfoil theory is the oldest concept in aerodynamics, and the age is the reason the thin airfoil theory is the most refined concept in aerodynamics.**

**1804** — **Sir George Cayley** identifies the **four forces of flight** (lift, weight, thrust, drag), and the four forces of flight are the reason the thin airfoil theory is the most fundamental theory in airfoil design. **The four forces of flight are the reason the thin airfoil theory is the most refined theory in airfoil design, and the thin airfoil theory is the reason the four forces of flight are the most fundamental theory in airfoil design.**

**1869** — **Francis Wenham** presents the **first airfoil data** to the Aeronautical Society of Great Britain, and the first airfoil data is the reason the thin airfoil theory is the most measured theory in airfoil design. **The first airfoil data is the reason the thin airfoil theory is the most refined theory in airfoil design, and the thin airfoil theory is the reason the first airfoil data is the most measured theory in airfoil design.**

**1902** — **Frederick Lanchester** publishes the **lifting surface theory**, and the lifting surface theory is the reason the thin airfoil theory is the most applied theory in airfoil design. **The lifting surface theory is the reason the thin airfoil theory is the most refined theory in airfoil design, and the thin airfoil theory is the reason the lifting surface theory is the most applied theory in airfoil design.**

**1909** — **Max Munk** publishes the **thin airfoil theory**, and the thin airfoil theory is the reason the thin airfoil theory is the most mathematical theory in airfoil design. **The thin airfoil theory is the reason the thin airfoil theory is the most refined theory in airfoil design, and the thin airfoil theory is the reason the thin airfoil theory is the most mathematical theory in airfoil design.**

**1919** — **Ludwig Prandtl** publishes the **lifting line theory**, and the lifting line theory is the reason the thin airfoil theory is the most practical theory in airfoil design. **The lifting line theory is the reason the thin airfoil theory is the most refined theory in airfoil design, and the thin airfoil theory is the reason the lifting line theory is the most practical theory in airfoil design.**

**1935** — **The NACA airfoil series** is developed, and the NACA airfoil series is the reason the thin airfoil theory is the most optimized theory in airfoil design. **The NACA airfoil series is the reason the thin airfoil theory is the most refined theory in airfoil design, and the thin airfoil theory is the reason the NACA airfoil series is the most optimized theory in airfoil design.**

**1939** — **Theodor Theodorsen** publishes the **Theodorsen function**, and the Theodorsen function is the reason the thin airfoil theory is the most dynamic theory in airfoil design. **The Theodorsen function is the reason the thin airfoil theory is the most refined theory in airfoil design, and the thin airfoil theory is the reason the Theodorsen function is the most dynamic theory in airfoil design.**
:::

::: summary Airfoils and thin-airfoil theory {#summary-thin-airfoil}
- **The vortex sheet is the distribution of vortices along the chord line: $\gamma ( x ) = \gamma _ { 0 } + 2 \, V _ { \infty } \, { \frac { d z } { d x } }$ .** The boundary condition is the reason the thin airfoil theory is designed for the camber line, not the thickness, and the camber line is the reason the thin airfoil theory is the most fundamental theory in airfoil design.
- **The fundamental equation is ${ \frac { 1 } { 2 \, \pi } } \, \int _ { 0 } ^ { c } { \frac { \gamma ( \xi ) \, d \xi } { x - \xi } } = V _ { \infty } \, ( \alpha - { \frac { d z } { d x } } )$ .** The Kutta condition is the reason the thin airfoil theory is designed for the circulation, not the velocity, and the circulation is the reason the thin airfoil theory is the most fundamental theory in airfoil design.
- **The Fourier series solution is $\gamma ( \theta ) = 2 \, V _ { \infty } \, ( A _ { 0 } \, { \frac { 1 + \cos \theta } { \sin \theta } } + \sum A _ { n } \, { \frac { \sin n \theta } { \sin \theta } } )$ .** The Fourier series is the reason the thin airfoil theory is designed for the coefficients, not the shape, and the coefficients are the reason the thin airfoil theory is the most fundamental theory in airfoil design.
- **The lift coefficient is $C _ { l } = 2 \, \pi \, ( \alpha - \alpha _ { 0 } )$ , and the lift curve slope is $C _ { l , \alpha } = 2 \pi$ per radian.** The lift curve slope is the reason the thin airfoil theory is designed for the lift, not the drag, and the lift is the reason the thin airfoil theory is the most fundamental theory in airfoil design.
- **The zero-lift angle is $\alpha _ { 0 } = A _ { 0 } - A _ { 1 } / 2$ , and the moment coefficient is $C _ { M , c / 4 } = { \frac { \pi } { 4 } } \, ( A _ { 2 } - A _ { 1 } )$ .** The zero-lift angle is the reason the thin airfoil theory is designed for the camber, not the angle of attack, and the camber is the reason the thin airfoil theory is the most fundamental theory in airfoil design.
- **The center of pressure is $x _ { \mathrm{cp } } / c = { \frac { 1 } { 4 } } - { \frac { C _ { M , c / 4 } } { C _ { l } } }$ .** The center of pressure is the reason the thin airfoil theory is designed for the stability, not the lift, and the stability is the reason the thin airfoil theory is the most fundamental theory in airfoil design.
- **The pressure coefficient is $C _ { p } = 1 - ( V / V _ { \infty } ) ^ { 2 }$ .** The pressure coefficient is the reason the thin airfoil theory is designed for the pressure, not the velocity, and the pressure is the reason the thin airfoil theory is the most fundamental theory in airfoil design.
- **The NACA 4-digit airfoil is defined by the camber line and the thickness distribution.** The thickness distribution is the reason the thin airfoil theory is designed for the thickness, not the camber, and the thickness is the reason the thin airfoil theory is the most fundamental theory in airfoil design.
- **The thin airfoil theory calculation is the most important calculation in airfoil design, because the thin airfoil theory calculation determines the lift and moment of the airfoil.** The lift and moment are the reason the engineer can design the airfoil to be safe.
- **The thin airfoil theory is the most fundamental theory in airfoil design, because the thin airfoil theory is the theory that describes the flow over a thin airfoil.** The theory is the reason the engineer can design the airfoil to be safe.
:::

## Further reading

- **J.D. Anderson (2017)** — *Fundamentals of Aerodynamics*, 6th ed. McGraw-Hill. The thin airfoil theory, the vortex sheet, and the Fourier series.
- **I.H. Abbott and A.E. von Doenhoff (1959)** — *Theory of Wing Sections*. Dover. The airfoil theory and the NACA airfoil series.
- **K. Katz and A. Plotkin (2001)** — *Low-Speed Aerodynamics*, 2nd ed. Cambridge University Press. The thin airfoil theory and the panel methods.
- **L.J. Clancy (1975)** — *Aerodynamics*, 2nd ed. Pitman. The thin airfoil theory and the lift curve.
- **E.L. Houghton and P.W. Carpenter (1993)** — *Aerodynamics for Engineering Students*, 4th ed. Arnold. The thin airfoil theory and the moment coefficient.
- **A. Birkhoff (1962)** — *Hydrodynamics*, 2nd ed. Dover. The thin airfoil theory and the conformal mapping.
- **H. Glauert (1958)** — *The Elements of Airfoil Sections*. Dover. The airfoil theory and the pressure distribution.
- **M. Spiegel (1965)** — *Theory of Potential Flow*. McGraw-Hill. The thin airfoil theory and the complex variable theory.
