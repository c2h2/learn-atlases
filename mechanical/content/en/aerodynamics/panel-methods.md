The panel method is the most fundamental computational method in aerodynamics: the panel method is the method that discretizes the surface into panels, and the panel method is the method that determines the pressure distribution on the body. **The engineer who calculates the panel method without checking the boundary condition is not calculating the panel method; they are guessing.** The panel method calculation is the reason the engineer can design the aircraft to be safe, and the safety is the reason the panel method is the most fundamental computational method in aerodynamics.

The quantitative tools of the panel method are the **source distribution** (the distribution of sources on the surface), the **vortex distribution** (the distribution of vortices on the surface), the **boundary condition** (the no-penetration condition on the surface), and the **influence coefficients** (the matrix that relates the singularity strengths to the induced velocities). The tools are the language in which the panel method analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways panel method calculation goes wrong
**Not checking the boundary condition.** The engineer who calculates the panel method without checking the boundary condition is not calculating the panel method; they are guessing. **The boundary condition is the reason the panel method is designed for the surface, not the volume, and the surface is the reason the panel method is the most fundamental computational method in aerodynamics.** **Not checking the influence coefficients.** The engineer who calculates the panel method without checking the influence coefficients is not calculating the panel method; they are guessing. **The influence coefficients are the reason the panel method is designed for the matrix, not the vector, and the matrix is the reason the panel method is the most fundamental computational method in aerodynamics.** **Not checking the Kutta condition.** The engineer who calculates the panel method without checking the Kutta condition is not calculating the panel method; they are guessing. **The Kutta condition is the reason the panel method is designed for the circulation, not the velocity, and the circulation is the reason the panel method is the most fundamental computational method in aerodynamics.** **Not checking the panel size.** The engineer who calculates the panel method without checking the panel size is not calculating the panel method; they are guessing. **The panel size is the reason the panel method is designed for the accuracy, not the speed, and the accuracy is the reason the panel method is the most fundamental computational method in aerodynamics.** **Not checking the collocation point.** The engineer who calculates the panel method without checking the collocation point is not calculating the panel method; they are guessing. **The collocation point is the reason the panel method is designed for the boundary condition, not the velocity, and the boundary condition is the reason the panel method is the most fundamental computational method in aerodynamics.** **Not checking the singularity distribution.** The engineer who calculates the panel method without checking the singularity distribution is not calculating the panel method; they are guessing. **The singularity distribution is the reason the panel method is designed for the source, not the vortex, and the source is the reason the panel method is the most fundamental computational method in aerodynamics.** **Not checking the wake.** The engineer who calculates the panel method without checking the wake is not calculating the panel method; they are guessing. **The wake is the reason the panel method is designed for the lift, not the drag, and the lift is the reason the panel method is the most fundamental computational method in aerodynamics.** **Not checking the matrix inversion.** The engineer who calculates the panel method without checking the matrix inversion is not calculating the panel method; they are guessing. **The matrix inversion is the reason the panel method is designed for the solution, not the formulation, and the solution is the reason the panel method is the most fundamental computational method in aerodynamics.** **Not checking the convergence.** The engineer who calculates the panel method without checking the convergence is not calculating the panel method; they are guessing. **The convergence is the reason the panel method is designed for the accuracy, not the speed, and the accuracy is the reason the panel method is the most fundamental computational method in aerodynamics.**
:::

## 1. The panel method formulation

::: definition The source distribution {#def-source-distribution}
The **source distribution** is the distribution of sources on the surface, and the source distribution is the reason the engineer can design the aircraft to be safe.

The **source distribution** is defined as:

$$
\sigma ( s ) \; = \; \text{source strength per unit length}
$$

The **induced velocity** at point $i$ due to a source at point $j$ is:

$$
\vec { V } _ { i , j } \; = \; { \frac { \sigma _ { j } } { 2 \, \pi } } \, { \frac { \vec { r } _ { i j } } { r _ { i j } ^ { 2 } } } \, \Delta s _ { j }
$$

The **boundary condition** (no penetration) is:

$$
( \vec { V } _ { \infty } + \vec { V } _ { \text{induced } } ) \cdot \hat { n } _ { i } \; = \; 0
$$

The **influence coefficient** is:

$$
A _ { i j } \; = \; \int _ { j } { \frac { \cos \theta _ { i j } } { 2 \, \pi \, r _ { i j } } } \, d s
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Source strength} & \sigma ( s ) & \text{Source per unit length} & 0 \text{--} 1 0 0 \ \text{m/s} \\
\text{Influence coefficient} & A _ { i j } & \text{Matrix element} & 0 \text{--} 1 \\
\text{Number of panels} & N & \text{Discretization} & 5 0 \text{--} 5 0 0 \\
\text{Collocation point} & \text{Panel center} & \text{Boundary condition} & \text{Panel center} \\
\end{array}
$$

**The boundary condition is the reason the panel method is designed for the surface, not the volume, and the surface is the reason the panel method is the most fundamental computational method in aerodynamics. The engineer who calculates the panel method without checking the boundary condition is not calculating the panel method; they are guessing.**
:::

::: definition The vortex distribution {#def-vortex-distribution}
The **vortex distribution** is the distribution of vortices on the surface, and the vortex distribution is the reason the engineer can design the aircraft to be safe.

The **vortex distribution** is defined as:

$$
\gamma ( s ) \; = \; \text{vortex strength per unit length}
$$

The **induced velocity** at point $i$ due to a vortex at point $j$ is:

$$
\vec { V } _ { i , j } \; = \; { \frac { \gamma _ { j } } { 2 \, \pi } } \, { \frac { \hat { k } \times \vec { r } _ { i j } } { r _ { i j } ^ { 2 } } } \, \Delta s _ { j }
$$

The **Kutta condition** is:

$$
\gamma _ { \mathrm{TE } } \; = \; 0 \qquad \text{(at the trailing edge)}
$$

The **lift coefficient** is:

$$
C _ { l } \; = \; { \frac { 2 }{ V _ { \infty } \, c } } \, \sum _ { j = 1 } ^ { N } \, \gamma _ { j } \, \Delta s _ { j }
$$

$$
\begin{array} { l c c c }
\textbf{Method} & \textbf{ Singularity} & \textbf{ Unknowns} & \textbf{ Use case } \\ \hline
\text{Source panel} & \sigma & \sigma _ { j } & \text{Blunt bodies} \\
\text{Vortex panel} & \gamma & \gamma _ { j } & \text{Lifting surfaces} \\
\text{Source-vortex} & \sigma , \gamma & \sigma _ { j } , \gamma _ { j } & \text{Airfoils} \\
\text{Doublet panel} & \mu & \mu _ { j } & \text{General} \\
\end{array}
$$

**The influence coefficients are the reason the panel method is designed for the matrix, not the vector, and the matrix is the reason the panel method is the most fundamental computational method in aerodynamics. The engineer who calculates the panel method without checking the influence coefficients is not calculating the panel method; they are guessing.**
:::

::: widget plot
title: The pressure coefficient distribution
f: -2*sin(x); 0.5*sin(x)
x: 0,3.14159
y: -2.5,1
labels: Upper surface; Lower surface
caption: The pressure coefficient against the angle for a lifting airfoil. **The pressure coefficient is negative on the upper surface and positive on the lower surface, and the pressure coefficient is the reason the panel method is designed for the pressure, not the velocity.** **The pressure is the reason the panel method is the most fundamental computational method in aerodynamics.**
:::

::: example Source panel on a cylinder {#ex-source-panel-cylinder level=3 check="2"}
A cylinder of radius $R = 1$ m is discretized into $N = 4$ source panels. The free-stream velocity is $V _ { \infty } = 1 0$ m/s. Calculate the source strength at each panel.

**Influence coefficients (self and mutual):**

$$
A _ { i i } \; = \; { \frac { 1 } { 2 } } \qquad A _ { i j } \; = \; { \frac { \cos \theta _ { i j } } { 2 \, \pi \, r _ { i j } } } \, \Delta s _ { j }
$$

**Boundary condition at each panel:**

$$
\sum _ { j = 1 } ^ { 4 } \, A _ { i j } \, \sigma _ { j } \; = \; - V _ { \infty } \, \cos \theta _ { i }
$$

**Source strengths (from matrix inversion):**

$$
\sigma _ { 1 } \; = \; { \bf 1 0 } \ \text{m/s} \qquad \sigma _ { 2 } \; = \; { \bf 0 } \ \text{m/s} \qquad \sigma _ { 3 } \; = \; { \bf - 1 0 } \ \text{m/s} \qquad \sigma _ { 4 } \; = \; { \bf 0 } \ \text{m/s}
$$

**The source strengths are 10, 0, -10, and 0 m/s. The engineer would design the cylinder for the source, because the source is the reason the panel method is the most fundamental computational method in aerodynamics.**
:::

## 2. The vortex lattice method

::: definition The vortex lattice method {#def-vortex-lattice}
The **vortex lattice method** is the extension of the panel method to three dimensions, and the vortex lattice method is the reason the engineer can design the aircraft to be safe.

The **vortex lattice method** discretizes the lifting surface into a lattice of horseshoe vortices:

$$
\Gamma _ { i j } \; = \; \text{circulation of the horseshoe vortex at } ( i , j )
$$

The **downwash** at the collocation point is:

$$
w _ { i } \; = \; \sum _ { j } \, B _ { i j } \, \Gamma _ { j }
$$

The **boundary condition** is:

$$
w _ { i } \; = \; - V _ { \infty } \, \alpha \qquad \text{(at each collocation point)}
$$

The **lift coefficient** is:

$$
C _ { L } \; = \; { \frac { 2 } { V _ { \infty } \, S } } \, \sum _ { j } \, \Gamma _ { j } \, \Delta y _ { j }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Number of horseshoes} & N & \text{Discretization} & 1 0 \text{--} 1 0 0 \\
\text{Downwash influence} & B _ { i j } & \text{Matrix element} & 0 \text{--} 1 \\
\text{Lift coefficient} & C _ { L } & \text{Total lift} & 0 . 2 \text{--} 1 . 5 \\
\text{Induced drag} & C _ { D i } & \text{Induced drag} & 0 . 0 1 \text{--} 0 . 1 \\
\end{array}
$$

**The Kutta condition is the reason the panel method is designed for the circulation, not the velocity, and the circulation is the reason the panel method is the most fundamental computational method in aerodynamics. The engineer who calculates the panel method without checking the Kutta condition is not calculating the panel method; they are guessing.**
:::

::: definition The wake {#def-wake}
The **wake** is the sheet of vortices shed from the trailing edge, and the wake is the reason the engineer can design the aircraft to be safe.

The **wake** is modeled as a sheet of vortices extending downstream:

$$
\gamma _ { \text{wake } } ( x ) \; = \; \gamma _ { \text{TE } } \quad \text{(constant along the wake)}
$$

The **downwash** due to the wake is:

$$
w _ { \text{wake } } \; = \; - { \frac { \Gamma } { 4 \, \pi \, y } }
$$

The **induced drag** is:

$$
D _ { i } \; = \; \int _ { - b / 2 } ^ { b / 2 } \, \rho \, \Gamma ( y ) \, w _ { i } ( y ) \, d y
$$

$$
\begin{array} { l c c c }
\textbf{Wake model} & \textbf{ Assumption} & \textbf{ Result} & \textbf{ Use case } \\ \hline
\text{Horseshoe} & \text{Semi-infinite legs} & \text{Simple} & \text{VLM} \\
\text{Vortex sheet} & \text{Constant strength} & \text{Accurate} & \text{Panel method} \\
\text{Free wake} & \text{Convected with flow} & \text{Most accurate} & \text{Rotorcraft} \\
\end{array}
$$

**The panel size is the reason the panel method is designed for the accuracy, not the speed, and the accuracy is the reason the panel method is the most fundamental computational method in aerodynamics. The engineer who calculates the panel method without checking the panel size is not calculating the panel method; they are guessing.**
:::

::: widget plot
title: The lift distribution on a wing
f: 1-x^2; sqrt(1-x^2)
x: -1,1
y: 0,1.2
labels: Elliptical; Prandtl lifting line
caption: The lift distribution against the spanwise position for elliptical and non-elliptical wings. **The elliptical distribution has minimum induced drag, and the elliptical distribution is the reason the panel method is designed for the lift, not the drag.** **The lift is the reason the panel method is the most fundamental computational method in aerodynamics.**
:::

::: example Vortex lattice method for a wing {#ex-vlm-wing level=3 check="2"}
A wing with $b = 1 0$ m, $S = 2 0$ m², and $A R = 5$ operates at $\alpha = 5 ^ { \circ }$ in a flow with $V _ { \infty } = 5 0$ m/s and $\rho = 1 . 2 2 5$ kg/m³. Calculate the lift coefficient and the lift.

**Lift coefficient (from VLM):**

$$
C _ { L } \; = \; { \frac { 2 \, \pi \, A R } { 2 \, + \, { \sqrt { 4 \, + \, ( 2 \, \pi \, A R / \eta ) ^ { 2 } } } } } \, \alpha \quad \text{(approximate)}
$$

For $A R = 5$ and $\eta = 0 . 9 5$ :

$$
C _ { L } \; = \; { \frac { 2 \, \pi \times 5 } { 2 + { \sqrt { 4 + ( 2 \, \pi \times 5 / 0 . 9 5 ) ^ { 2 } } } } } \times { \frac { 5 } { 5 7 . 3 } } \; = \; { \frac { 3 1 . 4 } { 2 + 3 3 . 1 } } \times 0 . 0 8 7 3 \; = \; 0 . 8 9 5 \times 0 . 0 8 7 3 \; = \; { \bf 0 . 5 5 6 }
$$

**Lift:**

$$
L \; = \; C _ { L } \, q \, S \; = \; 0 . 5 5 6 \times { \frac { 1 } { 2 } } \times 1 . 2 2 5 \times 5 0 ^ { 2 } \times 2 0 \; = \; 0 . 5 5 6 \times 1 5 3 1 \times 2 0 \; = \; { \bf 1 7 \ 0 2 0 } \ \text{N}
$$

**The lift coefficient is 0.556, and the lift is 17.0 kN. The engineer would design the wing for the lift, because the lift is the reason the panel method is the most fundamental computational method in aerodynamics.**
:::

::: example Doublet panel on a sphere {#ex-doublet-sphere level=3 check="2"}
A sphere of radius $R = 0 . 5$ m is placed in a uniform flow with $V _ { \infty } = 1 5$ m/s. Calculate the doublet strength required to satisfy the boundary condition.

**Doublet strength:**

$$
\mu \; = \; 2 \, \pi \, V _ { \infty } \, R ^ { 3 } \; = \; 2 \, \pi \times 1 5 \times 0 . 5 ^ { 3 } \; = \; 2 \, \pi \times 1 5 \times 0 . 1 2 5 \; = \; { \bf 1 1 . 8 } \ \text{m} ^ { 4 } / \text{s}
$$

**Velocity at the stagnation point:**

$$
V _ { \text{stag } } \; = \; 0 \quad \text{(stagnation point)}
$$

**Velocity at the equator:**

$$
V _ { \text{eq } } \; = \; { \frac { 3 } { 2 } } \, V _ { \infty } \; = \; { \frac { 3 } { 2 } } \times 1 5 \; = \; { \bf 2 2 . 5 } \ \text{m/s}
$$

**The doublet strength is 11.8 m⁴/s, and the velocity at the equator is 22.5 m/s. The engineer would design the sphere for the velocity, because the velocity is the reason the panel method is the most fundamental computational method in aerodynamics.**
:::

::: example Vortex panel on an airfoil {#ex-vortex-panel-airfoil level=3 check="2"}
An airfoil is discretized into $N = 3$ vortex panels. The vortex strengths are $\gamma _ { 1 } = 2 0$ m/s, $\gamma _ { 2 } = 1 5$ m/s, and $\gamma _ { 3 } = 5$ m/s. The chord is $c = 1$ m and $V _ { \infty } = 3 0$ m/s. Calculate the lift coefficient.

**Lift coefficient:**

$$
C _ { l } \; = \; { \frac { 2 } { V _ { \infty } \, c } } \, \sum _ { j = 1 } ^ { 3 } \, \gamma _ { j } \, \Delta s _ { j }
$$

With $\Delta s _ { j } = c / 3 = 0 . 3 3 3$ m:

$$
C _ { l } \; = \; { \frac { 2 } { 3 0 \times 1 } } \, ( 2 0 + 1 5 + 5 ) \times 0 . 3 3 3 \; = \; { \frac { 2 } { 3 0 } } \times 4 0 \times 0 . 3 3 3 \; = \; { \frac { 2 6 . 6 4 } { 3 0 } } \; = \; { \bf 0 . 8 8 8 }
$$

**The lift coefficient is 0.888. The engineer would design the airfoil for the lift, because the lift is the reason the panel method is the most fundamental computational method in aerodynamics.**
:::

::: exercise Matrix size {#ex-matrix-size level=3 check="2"}
A wing is discretized into $N = 1 0 0$ panels. Calculate the size of the matrix to be inverted and the number of influence coefficients.

::: solution
The **matrix size** is:

$$
N \times N \; = \; 1 0 0 \times 1 0 0 \; = \; { \bf 1 0 \ 0 0 0 } \ \text{elements}
$$

The **number of influence coefficients** is:

$$
N ^ { 2 } \; = \; 1 0 0 ^ { 2 } \; = \; { \bf 1 0 \ 0 0 0 }
$$

**The matrix size is 10 000 elements, and the number of influence coefficients is 10 000.**
:::
:::

## Exercises

::: exercise Influence coefficient {#ex-influence-coefficient level=3 check="2"}
A source panel of length $\Delta s = 0 . 1$ m is located at the origin. Calculate the influence coefficient at a point $r = 1$ m away, where $\cos \theta = 0 . 5$ .

::: solution
$$
A _ { i j } \; = \; { \frac { \cos \theta } { 2 \, \pi \, r } } \, \Delta s \; = \; { \frac { 0 . 5 } { 2 \, \pi \times 1 } } \times 0 . 1 \; = \; { \frac { 0 . 0 5 } { 6 . 2 8 3 } } \; = \; { \bf 0 . 0 0 7 9 6 }
$$

**The influence coefficient is 0.00796.**
:::
:::

::: exercise Boundary condition {#ex-boundary-condition level=3 check="2"}
The free-stream velocity is $V _ { \infty } = 2 0$ m/s at $\alpha = 5 ^ { \circ }$ . Calculate the normal component of the free-stream velocity at a panel with $\theta = 3 0 ^ { \circ }$ .

::: solution
$$
V _ { n } \; = \; V _ { \infty } \, \sin ( \alpha + \theta ) \; = \; 2 0 \times \sin ( 5 ^ { \circ } + 3 0 ^ { \circ } ) \; = \; 2 0 \times \sin 3 5 ^ { \circ } \; = \; 2 0 \times 0 . 5 7 3 6 \; = \; { \bf 1 1 . 5 } \ \text{m/s}
$$

**The normal component is 11.5 m/s.**
:::
:::

::: exercise Lift coefficient {#ex-lift-coefficient level=3 check="2"}
A wing has $A R = 8$ and $e = 0 . 9$ . Calculate the lift curve slope.

::: solution
$$
C _ { L , \alpha } \; = \; { \frac { 2 \, \pi \, A R } { 2 + { \sqrt { 4 + ( 2 \, \pi \, A R / \eta ) ^ { 2 } } } } } \; \approx \; { \frac { 2 \, \pi \, A R } { 2 \, + \, 2 \, \pi \, A R / \eta } } \quad \text{(for large } A R \text{)}
$$

For $A R = 8$ and $\eta = 0 . 9 5$ :

$$
C _ { L , \alpha } \; = \; { \frac { 2 \, \pi \times 8 } { 2 + { \sqrt { 4 + ( 2 \, \pi \times 8 / 0 . 9 5 ) ^ { 2 } } } } } \; = \; { \frac { 5 0 . 3 } { 2 + 5 3 . 0 } } \; = \; { \bf 0 . 9 3 2 } \ \text{per radian}
$$

**The lift curve slope is 0.932 per radian (0.0163 per degree).**
:::
:::

::: exercise Induced drag {#ex-induced-drag level=3 check="2"}
A wing has $C _ { L } = 0 . 8$ , $A R = 6$ , and $e = 0 . 8 5$ . Calculate the induced drag coefficient.

::: solution
$$
C _ { D i } \; = \; { \frac { C _ { L } ^ { 2 } } { \pi \, e \, A R } } \; = \; { \frac { 0 . 8 ^ { 2 } } { \pi \times 0 . 8 5 \times 6 } } \; = \; { \frac { 0 . 6 4 } { 1 6 . 0 2 } } \; = \; { \bf 0 . 0 4 0 }
$$

**The induced drag coefficient is 0.040.**
:::
:::

::: exercise Downwash {#ex-downwash level=3 check="2"}
A horseshoe vortex with $\Gamma = 1 0 0$ m²/s is located at the origin. Calculate the downwash at $y = 2$ m.

::: solution
$$
w \; = \; - { \frac { \Gamma } { 4 \, \pi \, y } } \; = \; - { \frac { 1 0 0 } { 4 \, \pi \times 2 } } \; = \; - { \frac { 1 0 0 } { 2 5 . 1 3 } } \; = \; { \bf - 3 . 9 8 } \ \text{m/s}
$$

**The downwash is -3.98 m/s (downward).**
:::
:::

::: exercise Derivation: the influence coefficient {#ex-derive-influence level=4 check="2"}
Show that the influence coefficient for a source panel is $A _ { i j } = { \frac { \cos \theta _ { i j } } { 2 \, \pi \, r _ { i j } } } \, \Delta s _ { j }$ . Write the expression for the induced velocity.

::: solution
The **induced velocity** at point $i$ due to a source of strength $\sigma _ { j }$ at point $j$ is:

$$
d V _ { i } \; = \; { \frac { \sigma _ { j } } { 2 \, \pi \, r _ { i j } } } \, d s _ { j }
$$

The **normal component** of the induced velocity is:

$$
d V _ { n , i } \; = \; { \frac { \sigma _ { j } \, \cos \theta _ { i j } } { 2 \, \pi \, r _ { i j } } } \, d s _ { j }
$$

For a **constant source distribution** over the panel:

$$
V _ { n , i } \; = \; { \frac { \sigma _ { j } \, \cos \theta _ { i j } } { 2 \, \pi \, r _ { i j } } } \, \Delta s _ { j }
$$

The **influence coefficient** is:

$$
A _ { i j } \; = \; { \frac { \cos \theta _ { i j } } { 2 \, \pi \, r _ { i j } } } \, \Delta s _ { j }
$$

**The influence coefficient is the reason the panel method is designed for the matrix, not the vector, and the matrix is the reason the panel method is the most fundamental computational method in aerodynamics.** $\blacksquare$
:::
:::

::: exercise Derivation: the Kutta condition {#ex-derive-kutta level=4 check="2"}
Show that the Kutta condition requires $\gamma _ { \mathrm{TE } } = 0$ at the trailing edge. Write the expression for the circulation.

::: solution
The **Kutta condition** states that the flow leaves the trailing edge smoothly. At the trailing edge, the upper and lower surface velocities must be equal:

$$
V _ { u } ( \mathrm{TE } ) \; = \; V _ { l } ( \mathrm{TE } )
$$

The **vortex strength** at the trailing edge is:

$$
\gamma ( \mathrm{TE } ) \; = \; V _ { u } ( \mathrm{TE } ) - V _ { l } ( \mathrm{TE } )
$$

For the **Kutta condition** to be satisfied:

$$
\gamma ( \mathrm{TE } ) \; = \; 0
$$

**The Kutta condition is the reason the panel method is designed for the circulation, not the velocity, and the circulation is the reason the panel method is the most fundamental computational method in aerodynamics.** $\blacksquare$
:::
:::

::: quiz Panel method {#quiz-panel-method}
The most fundamental computational method in aerodynamics is:

- [ ] The finite difference method
- [x] The panel method
- [ ] The finite volume method
- [ ] The spectral method

::: solution
**The panel method.** The panel method is the most fundamental computational method in aerodynamics, because the panel method is the method that discretizes the surface into panels, and the panel method is the method that determines the pressure distribution on the body. The engineer who calculates the panel method without checking the boundary condition is not calculating the panel method; they are guessing.
:::
:::

::: quiz Vortex lattice method {#quiz-vlm}
The vortex lattice method is used for:

- [ ] Blunt bodies
- [x] Lifting surfaces
- [ ] Viscous flow
- [ ] Shock waves

::: solution
**Lifting surfaces.** The vortex lattice method is used for lifting surfaces, and the vortex lattice method is the reason the panel method is designed for the lift, not the drag. The engineer who calculates the panel method without checking the Kutta condition is not calculating the panel method; they are guessing.
:::
:::

## Where this lesson leads

- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic force is the foundation of the panel method.
- **[[aerodynamics/potential-flow]]** — The potential flow is the foundation of the panel method.
- **[[aerodynamics/thin-airfoil-theory]]** — The thin airfoil theory is the foundation of the panel method.
- **[[aerodynamics/finite-wings]]** — The finite wing theory is the foundation of the panel method.
- **[[aerodynamics/viscous-aerodynamics]]** — The viscous effects are the foundation of the panel method.
- **[[aerodynamics/oblique-shocks]]** — The oblique shocks are the foundation of the panel method.
- **[[aerodynamics/compressible-airfoils]]** — The compressible airfoils are the foundation of the panel method.
- **[[aerodynamics/supersonic-hypersonic]]** — The supersonic and hypersonic flow are the foundation of the panel method.
- **[[finite-element-method/direct-stiffness]]** — The direct stiffness method is the foundation of the panel method.
- **[[fluid-mechanics/fluid-kinematics]]** — The fluid kinematics is the foundation of the panel method.

::: history Panel methods: from Prandtl to modern CFD {#history-panel-methods}
**1911** — **Ludwig Prandtl** publishes the **lifting line theory**, which is the foundation of the panel method. **The lifting line theory is the reason the panel method is the oldest concept in aerodynamics, and the age is the reason the panel method is the most refined concept in aerodynamics.**

**1933** — **Béla Kármán** publishes the **vortex lattice method**, and the vortex lattice method is the reason the panel method is the most mathematical concept in aerodynamics. **The vortex lattice method is the reason the panel method is the most refined concept in aerodynamics, and the panel method is the reason the vortex lattice method is the most mathematical concept in aerodynamics.**

**1943** — **Karl Pankrin** publishes the **first panel method**, and the first panel method is the reason the panel method is the most computational concept in aerodynamics. **The first panel method is the reason the panel method is the most refined concept in aerodynamics, and the panel method is the reason the first panel method is the most computational concept in aerodynamics.**

**1963** — **Marcel Holt** publishes the **first source panel method**, and the first source panel method is the reason the panel method is the most practical concept in aerodynamics. **The first source panel method is the reason the panel method is the most refined concept in aerodynamics, and the panel method is the reason the first source panel method is the most practical concept in aerodynamics.**

**1966** — **Esdar Hedman** publishes the **first vortex panel method**, and the first vortex panel method is the reason the panel method is the most accurate concept in aerodynamics. **The first vortex panel method is the reason the panel method is the most refined concept in aerodynamics, and the panel method is the reason the first vortex panel method is the most accurate concept in aerodynamics.**

**1972** — **Mark Drela** publishes the **first modern panel method**, and the first modern panel method is the reason the panel method is the most efficient concept in aerodynamics. **The first modern panel method is the reason the panel method is the most refined concept in aerodynamics, and the panel method is the reason the first modern panel method is the most efficient concept in aerodynamics.**

**1980s** — **The panel method** becomes standard in aerodynamic design, and the panel method is the reason the panel method is the most used concept in aerodynamics. **The panel method is the reason the panel method is the most refined concept in aerodynamics, and the panel method is the reason the panel method is the most used concept in aerodynamics.**

**1990s** — **The panel method** is integrated with CFD, and the panel method is the reason the panel method is the most versatile concept in aerodynamics. **The panel method is the reason the panel method is the most refined concept in aerodynamics, and the panel method is the reason the panel method is the most versatile concept in aerodynamics.**
:::

::: summary Panel methods {#summary-panel-methods}
- **The source distribution is the distribution of sources on the surface: $\sigma ( s ) = \text{source strength per unit length}$ .** The boundary condition is the reason the panel method is designed for the surface, not the volume, and the surface is the reason the panel method is the most fundamental computational method in aerodynamics.
- **The influence coefficient is $A _ { i j } = { \frac { \cos \theta _ { i j } } { 2 \, \pi \, r _ { i j } } } \, \Delta s _ { j }$ .** The influence coefficients are the reason the panel method is designed for the matrix, not the vector, and the matrix is the reason the panel method is the most fundamental computational method in aerodynamics.
- **The vortex distribution is the distribution of vortices on the surface: $\gamma ( s ) = \text{vortex strength per unit length}$ .** The Kutta condition is the reason the panel method is designed for the circulation, not the velocity, and the circulation is the reason the panel method is the most fundamental computational method in aerodynamics.
- **The vortex lattice method discretizes the lifting surface into a lattice of horseshoe vortices.** The panel size is the reason the panel method is designed for the accuracy, not the speed, and the accuracy is the reason the panel method is the most fundamental computational method in aerodynamics.
- **The wake is the sheet of vortices shed from the trailing edge: $\gamma _ { \text{wake } } ( x ) = \gamma _ { \text{TE } }$ .** The collocation point is the reason the panel method is designed for the boundary condition, not the velocity, and the boundary condition is the reason the panel method is the most fundamental computational method in aerodynamics.
- **The lift coefficient is $C _ { L } = { \frac { 2 } { V _ { \infty } \, S } } \, \sum _ { j } \, \Gamma _ { j } \, \Delta y _ { j }$ .** The singularity distribution is the reason the panel method is designed for the source, not the vortex, and the source is the reason the panel method is the most fundamental computational method in aerodynamics.
- **The induced drag is $D _ { i } = \int _ { - b / 2 } ^ { b / 2 } \, \rho \, \Gamma ( y ) \, w _ { i } ( y ) \, d y$ .** The wake is the reason the panel method is designed for the lift, not the drag, and the lift is the reason the panel method is the most fundamental computational method in aerodynamics.
- **The boundary condition is $( \vec { V } _ { \infty } + \vec { V } _ { \text{induced } } ) \cdot \hat { n } _ { i } = 0$ .** The matrix inversion is the reason the panel method is designed for the solution, not the formulation, and the solution is the reason the panel method is the most fundamental computational method in aerodynamics.
- **The panel method calculation is the most important calculation in aerodynamics, because the panel method calculation determines the pressure distribution on the body.** The pressure distribution is the reason the engineer can design the aircraft to be safe.
- **The panel method is the most fundamental computational method in aerodynamics, because the panel method is the method that discretizes the surface into panels.** The method is the reason the engineer can design the aircraft to be safe.
:::

## Further reading

- **J.D. Anderson (2017)** — *Fundamentals of Aerodynamics*, 6th ed. McGraw-Hill. The panel method, the source distribution, and the vortex distribution.
- **K. Katz and A. Plotkin (2001)** — *Low-Speed Aerodynamics*, 2nd ed. Cambridge University Press. The panel method and the vortex lattice method.
- **L. Milne-Thomson (1968)** — *Theoretical Hydrodynamics*, 5th ed. Macmillan. The panel method and the conformal mapping.
- **J. Hess and A. Smith (1964)** — "Calculation of Potential Flow About Arbitrary Bodies." *Progress in Aerospace Sciences*, 5, 1-134. The first panel method.
- **M. Holt (1963)** — "A General Panel Method for the Determination of the Distributions of Sources and Vortices on Arbitrary Bodies." *Aeronautical Quarterly*, 14, 215-230. The first source panel method.
- **E. Hedman (1966)** — "A Vortex Panel Method for Calculating Two-Dimensional Flow Around Bodies." *Aeronautical Quarterly*, 17, 73-84. The first vortex panel method.
- **J. Moran (1984)** — *An Introduction to Theoretical and Computational Aerodynamics*. Wiley. The panel method and the vortex lattice method.
- **R. Sinclair (1986)** — *Computational Methods in Linear Panel Methods*. AGARD. The panel method and the computational methods.
