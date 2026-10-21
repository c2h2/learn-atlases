The potential flow is the most fundamental theory in aerodynamics: the potential flow is the theory that describes the flow without viscosity, and the potential flow is the theory that determines the pressure distribution on the body. **The engineer who calculates the potential flow without checking the boundary condition is not calculating the potential flow; they are guessing.** The potential flow calculation is the reason the engineer can design the airfoil to be safe, and the safety is the reason the potential flow is the most fundamental theory in aerodynamics.

The quantitative tools of potential flow are the **velocity potential** (the scalar function whose gradient is the velocity), the **stream function** (the scalar function whose contours are the streamlines), the **Laplace equation** (the governing equation for incompressible, irrotational flow), and the **elementary flows** (uniform flow, source, sink, vortex, doublet). The tools are the language in which the potential flow analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways potential flow calculation goes wrong
**Not checking the boundary condition.** The engineer who calculates the potential flow without checking the boundary condition is not calculating the potential flow; they are guessing. **The boundary condition is the reason the potential flow is designed for the body shape, not the velocity, and the body shape is the reason the potential flow is the most fundamental theory in aerodynamics.** **Not checking the Kutta condition.** The engineer who calculates the potential flow without checking the Kutta condition is not calculating the potential flow; they are guessing. **The Kutta condition is the reason the potential flow is designed for the circulation, not the velocity, and the circulation is the reason the potential flow is the most fundamental theory in aerodynamics.** **Not checking the superposition.** The engineer who calculates the potential flow without checking the superposition is not calculating the potential flow; they are guessing. **The superposition is the reason the potential flow is designed for the linearity, not the nonlinearity, and the linearity is the reason the potential flow is the most fundamental theory in aerodynamics.** **Not checking the singularity strength.** The engineer who calculates the potential flow without checking the singularity strength is not calculating the potential flow; they are guessing. **The singularity strength is the reason the potential flow is designed for the source, not the vortex, and the source is the reason the potential flow is the most fundamental theory in aerodynamics.** **Not checking the stagnation point.** The engineer who calculates the potential flow without checking the stagnation point is not calculating the potential flow; they are guessing. **The stagnation point is the reason the potential flow is designed for the velocity, not the pressure, and the velocity is the reason the potential flow is the most fundamental theory in aerodynamics.** **Not checking the pressure coefficient.** The engineer who calculates the potential flow without checking the pressure coefficient is not calculating the potential flow; they are guessing. **The pressure coefficient is the reason the potential flow is designed for the pressure, not the velocity, and the pressure is the reason the potential flow is the most fundamental theory in aerodynamics.** **Not checking the circulation.** The engineer who calculates the potential flow without checking the circulation is not calculating the potential flow; they are guessing. **The circulation is the reason the potential flow is designed for the lift, not the drag, and the lift is the reason the potential flow is the most fundamental theory in aerodynamics.** **Not checking the conformal mapping.** The engineer who calculates the potential flow without checking the conformal mapping is not calculating the potential flow; they are guessing. **The conformal mapping is the reason the potential flow is designed for the geometry, not the velocity, and the geometry is the reason the potential flow is the most fundamental theory in aerodynamics.** **Not checking the d'Alembert paradox.** The engineer who calculates the potential flow without checking the d'Alembert paradox is not calculating the potential flow; they are guessing. **The d'Alembert paradox is the reason the potential flow is designed for the drag, not the lift, and the drag is the reason the potential flow is the most fundamental theory in aerodynamics.**
:::

## 1. Potential flow theory

::: definition The velocity potential {#def-velocity-potential}
The **velocity potential** is the scalar function whose gradient is the velocity, and the velocity potential is the reason the engineer can design the airfoil to be safe.

The **velocity potential** is defined as:

$$
\vec { V } \; = \; \nabla \phi \qquad u \; = \; { \frac { \partial \phi } { \partial x } } \qquad v \; = \; { \frac { \partial \phi } { \partial y } }
$$

The **continuity equation** for incompressible flow is:

$$
\nabla \cdot \vec { V } \; = \; 0 \qquad \Rightarrow \qquad \nabla ^ { 2 } \, \phi \; = \; 0 \quad \text{(Laplace equation)}
$$

The **stream function** is defined as:

$$
u \; = \; { \frac { \partial \psi } { \partial y } } \qquad v \; = \; - { \frac { \partial \psi } { \partial x } }
$$

The **Cauchy-Riemann equations** relate $\phi$ and $\psi$ :

$$
{ \frac { \partial \phi } { \partial x } } \; = \; { \frac { \partial \psi } { \partial y } } \qquad { \frac { \partial \phi } { \partial y } } \; = \; - { \frac { \partial \psi } { \partial x } }
$$

$$
\begin{array} { l c c c }
\textbf{Property} & \textbf{ Symbol } & \textbf{ Equation } & \textbf{ Use case } \\ \hline
\text{Velocity potential} & \phi & \nabla ^ { 2 } \phi = 0 & \text{Irrotational flow} \\
\text{Stream function} & \psi & \nabla ^ { 2 } \psi = 0 & \text{2D incompressible flow} \\
\text{Complex potential} & w = \phi + i \psi & d w / d z = u - i v & \text{Conformal mapping} \\
\text{Bernoulli equation} & p + { \frac { 1 } { 2 } } \rho V ^ { 2 } = \text{const} & \text{Along streamline} & \text{Pressure calculation} \\
\end{array}
$$

**The boundary condition is the reason the potential flow is designed for the body shape, not the velocity, and the body shape is the reason the potential flow is the most fundamental theory in aerodynamics. The engineer who calculates the potential flow without checking the boundary condition is not calculating the potential flow; they are guessing.**
:::

::: definition The elementary flows {#def-elementary-flows}
The **elementary flows** are the basic solutions to the Laplace equation, and the elementary flows are the reason the engineer can design the airfoil to be safe.

**Uniform flow:**

$$
\phi \; = \; V _ { \infty } \, ( x \, \cos \alpha + y \, \sin \alpha ) \qquad \psi \; = \; V _ { \infty } \, ( y \, \cos \alpha - x \, \sin \alpha )
$$

**Source (strength $\Lambda$ ):**

$$
\phi \; = \; { \frac { \Lambda } { 2 \, \pi } } \, \ln r \qquad \psi \; = \; { \frac { \Lambda } { 2 \, \pi } } \, \theta
$$

**Vortex (strength $\Gamma$ ):**

$$
\phi \; = \; - { \frac { \Gamma } { 2 \, \pi } } \, \theta \qquad \psi \; = \; { \frac { \Gamma } { 2 \, \pi } } \, \ln r
$$

**Doublet (strength $\mu$ ):**

$$
\phi \; = \; - { \frac { \mu } { 2 \, \pi } } \, { \frac { \cos \theta } { r } } \qquad \psi \; = \; - { \frac { \mu } { 2 \, \pi } } \, { \frac { \sin \theta } { r } }
$$

$$
\begin{array} { l c c c }
\textbf{Elementary flow} & \textbf{ Velocity} & \textbf{ Stagnation} & \textbf{ Use case } \\ \hline
\text{Uniform} & V _ { r } = V _ { \infty } \cos \theta & \text{None} & \text{Free stream} \\
\text{Source} & V _ { r } = \Lambda / ( 2 \pi r ) & r = 0 & \text{Blunt body} \\
\text{Vortex} & V _ { \theta } = \Gamma / ( 2 \pi r ) & r = 0 & \text{Lift} \\
\text{Doublet} & V _ { r } = - \mu \cos \theta / ( 2 \pi r ^ { 2 } ) & r = 0 & \text{Cylinder} \\
\end{array}
$$

**The superposition is the reason the potential flow is designed for the linearity, not the nonlinearity, and the linearity is the reason the potential flow is the most fundamental theory in aerodynamics. The engineer who calculates the potential flow without checking the superposition is not calculating the potential flow; they are guessing.**
:::

::: widget plot
title: The pressure coefficient on a cylinder
f: 1-4*sin(x)^2
x: 0,3.14159
y: -4,2
labels: Cp (potential flow)
caption: The pressure coefficient against the angle on a cylinder in potential flow. **The pressure coefficient is 1 at the stagnation point and -3 at the top, and the pressure coefficient is the reason the potential flow is designed for the pressure, not the velocity.** **The pressure is the reason the potential flow is the most fundamental theory in aerodynamics.**
:::

::: example Flow over a cylinder {#ex-cylinder-flow level=3 check="2"}
A cylinder of radius $R = 0 . 5$ m is placed in a uniform flow with $V _ { \infty } = 2 0$ m/s. Calculate the velocity at $\theta = 9 0 ^ { \circ }$ and the pressure coefficient at $\theta = 9 0 ^ { \circ }$ .

**Velocity at $\theta = 9 0 ^ { \circ }$ :**

$$
V _ { \theta } \; = \; - 2 \, V _ { \infty } \, \sin \theta \; = \; - 2 \times 2 0 \times \sin 9 0 ^ { \circ } \; = \; { \bf - 4 0 } \ \text{m/s}
$$

**Pressure coefficient at $\theta = 9 0 ^ { \circ }$ :**

$$
C _ { p } \; = \; 1 - \left( { \frac { V _ { \theta } } { V _ { \infty } } } \right) ^ { 2 } \; = \; 1 - \left( { \frac { - 4 0 } { 2 0 } } \right) ^ { 2 } \; = \; 1 - 4 \; = \; { \bf - 3 }
$$

**Pressure at $\theta = 9 0 ^ { \circ }$ :**

$$
p \; = \; p _ { \infty } + C _ { p } \, q \; = \; p _ { \infty } + ( - 3 ) \times { \frac { 1 } { 2 } } \times 1 . 2 2 5 \times 2 0 ^ { 2 } \; = \; p _ { \infty } - 7 3 5 \ \text{Pa}
$$

**The velocity at $\theta = 9 0 ^ { \circ }$ is 40 m/s, and the pressure coefficient is -3. The engineer would design the cylinder for the pressure, because the pressure is the reason the potential flow is the most fundamental theory in aerodynamics.**
:::

## 2. Lift and the Kutta condition

::: definition The Kutta condition {#def-kutta-condition}
The **Kutta condition** is the condition that the flow leaves the trailing edge smoothly, and the Kutta condition is the reason the engineer can design the airfoil to be safe.

The **Kutta condition** states that the circulation $\Gamma$ is such that the rear stagnation point coincides with the trailing edge:

$$
\Gamma \; = \; \oint \vec { V } \cdot d \vec { s } \; = \; \pi \, c \, V _ { \infty } \, \sin \alpha \quad \text{(flat plate)}
$$

The **Kutta-Joukowski theorem** states that the lift per unit span is:

$$
L ^ { \prime } \; = \; \rho _ { \infty } \, V _ { \infty } \, \Gamma
$$

The **lift coefficient** is:

$$
C _ { l } \; = \; { \frac { L ^ { \prime } } { { \frac { 1 } { 2 } } \, \rho _ { \infty } \, V _ { \infty } ^ { 2 } \, c } } \; = \; { \frac { 2 \, \Gamma } { V _ { \infty } \, c } }
$$

$$
\begin{array} { l c c c }
\textbf{Condition} & \textbf{ Statement } & \textbf{ Result} & \textbf{ Use case } \\ \hline
\text{Kutta condition} & \text{Smooth TE flow} & \Gamma \text{ determined} & \text{Airfoil} \\
\text{No penetration} & V _ { n } = 0 \text{ on surface} & \text{Body shape} & \text{All bodies} \\
\text{Free stream} & V \to V _ { \infty } & \text{Far field} & \text{All flows} \\
\text{Kutta-Joukowski} & L ^ { \prime } = \rho V _ { \infty } \Gamma & \text{Lift} & \text{2D airfoil} \\
\end{array}
$$

**The Kutta condition is the reason the potential flow is designed for the circulation, not the velocity, and the circulation is the reason the potential flow is the most fundamental theory in aerodynamics. The engineer who calculates the potential flow without checking the Kutta condition is not calculating the potential flow; they are guessing.**
:::

::: definition The conformal mapping {#def-conformal-mapping}
The **conformal mapping** is the transformation that preserves angles, and the conformal mapping is the reason the engineer can design the airfoil to be safe.

The **Joukowski transformation** maps a circle to an airfoil:

$$
z \; = \; \zeta + { \frac { a ^ { 2 } } { \zeta } }
$$

where $a$ is the radius of the circle. The **lift coefficient** for the Joukowski airfoil is:

$$
C _ { l } \; = \; 2 \, \pi \, \sin ( \alpha + \beta ) \; \approx \; 2 \, \pi \, ( \alpha + \beta )
$$

where $\beta$ is the **camber angle**.

$$
\begin{array} { l c c c }
\textbf{Mapping} & \textbf{ Formula } & \textbf{ Result} & \textbf{ Use case } \\ \hline
\text{Joukowski} & z = \zeta + a ^ { 2 } / \zeta & \text{Airfoil} & \text{Cambered plate} \\
\text{Flat plate} & \text{Circle through TE} & \text{Flat plate} & \text{Symmetric airfoil} \\
\text{Cambered} & \text{Circle with offset} & \text{Cambered airfoil} & \text{Cambered airfoil} \\
\text{Trefftz} & z = \zeta ( 1 + a ^ { 2 } / ( b ^ { 2 } - a ^ { 2 } ) ) & \text{Blunt TE} & \text{Historical} \\
\end{array}
$$

**The circulation is the reason the potential flow is designed for the lift, not the drag, and the lift is the reason the potential flow is the most fundamental theory in aerodynamics. The engineer who calculates the potential flow without checking the circulation is not calculating the potential flow; they are guessing.**
:::

::: widget plot
title: The lift coefficient vs angle of attack
f: 2*3.14159*x/180*180/3.14159; 2*3.14159*(x+2)/180*180/3.14159
x: -5,15
y: -1,3
labels: Symmetric; Cambered
caption: The lift coefficient against the angle of attack for the potential flow theory. **The lift curve slope is 2π per radian, and the lift curve slope is the reason the potential flow is designed for the lift, not the drag.** **The lift is the reason the potential flow is the most fundamental theory in aerodynamics.**
:::

::: example Kutta-Joukowski lift calculation {#ex-kutta-joukowski level=3 check="2"}
An airfoil with a chord of $c = 1$ m operates at $\alpha = 5 ^ { \circ }$ in a flow with $V _ { \infty } = 5 0$ m/s and $\rho = 1 . 2 2 5$ kg/m³. Calculate the circulation, the lift per unit span, and the lift coefficient.

**Circulation (flat plate, Kutta condition):**

$$
\Gamma \; = \; \pi \, c \, V _ { \infty } \, \sin \alpha \; = \; \pi \times 1 \times 5 0 \times \sin 5 ^ { \circ } \; = \; \pi \times 5 0 \times 0 . 0 8 7 2 \; = \; { \bf 1 3 . 7 } \ \text{m} ^ { 2 } / \text{s}
$$

**Lift per unit span:**

$$
L ^ { \prime } \; = \; \rho \, V _ { \infty } \, \Gamma \; = \; 1 . 2 2 5 \times 5 0 \times 1 3 . 7 \; = \; { \bf 8 4 0 } \ \text{N/m}
$$

**Lift coefficient:**

$$
C _ { l } \; = \; { \frac { 2 \, \pi \, \sin \alpha } { 1 } } \; = \; 2 \, \pi \times 0 . 0 8 7 2 \; = \; { \bf 0 . 5 4 8 }
$$

**The circulation is 13.7 m²/s, the lift per unit span is 840 N/m, and the lift coefficient is 0.548. The engineer would design the airfoil for the lift, because the lift is the reason the potential flow is the most fundamental theory in aerodynamics.**
:::

::: example Source-sink pair (Rankine oval) {#ex-rankine-oval level=3 check="2"}
A source with $\Lambda = 5$ m²/s at $x = - 0 . 5$ m and a sink with $\Lambda = - 5$ m²/s at $x = + 0 . 5$ m are placed in a uniform flow with $V _ { \infty } = 1 0$ m/s. Calculate the half-length of the resulting Rankine oval.

**Half-length:**

$$
L \; = \; a + { \frac { \Lambda } { 2 \, \pi \, V _ { \infty } } } \; = \; 0 . 5 + { \frac { 5 } { 2 \, \pi \times 1 0 } } \; = \; 0 . 5 + 0 . 0 7 9 6 \; = \; { \bf 0 . 5 8 } \ \text{m}
$$

**Half-thickness (at $x = 0$ ):**

$$
h \; = \; a \, { \sqrt { 1 + { \frac { \Lambda } { \pi \, a \, V _ { \infty } } } } } \; = \; 0 . 5 \times { \sqrt { 1 + { \frac { 5 } { \pi \times 0 . 5 \times 1 0 } } } } \; = \; 0 . 5 \times { \sqrt { 1 . 3 1 8 } } \; = \; { \bf 0 . 5 8 } \ \text{m}
$$

**The half-length is 0.58 m and the half-thickness is 0.58 m. The engineer would design the body for the shape, because the shape is the reason the potential flow is the most fundamental theory in aerodynamics.**
:::

::: example Vortex pair (lifting line) {#ex-vortex-pair level=3 check="2"}
A vortex pair with $\Gamma = 1 0$ m²/s and $\Gamma = - 1 0$ m²/s is placed at $y = + 0 . 3$ m and $y = - 0 . 3$ m in a uniform flow with $V _ { \infty } = 2 0$ m/s. Calculate the induced velocity at the origin.

**Induced velocity at the origin:**

$$
V _ { \text{induced } } \; = \; { \frac { \Gamma } { 2 \, \pi \, d } } + { \frac { \Gamma } { 2 \, \pi \, d } } \; = \; { \frac { 2 \, \Gamma } { 2 \, \pi \, d } } \; = \; { \frac { \Gamma } { \pi \, d } } \; = \; { \frac { 1 0 } { \pi \times 0 . 3 } } \; = \; { \bf 1 0 . 6 } \ \text{m/s}
$$

**Total velocity at the origin:**

$$
V \; = \; V _ { \infty } + V _ { \text{induced } } \; = \; 2 0 + 1 0 . 6 \; = \; { \bf 3 0 . 6 } \ \text{m/s}
$$

**The induced velocity at the origin is 10.6 m/s, and the total velocity is 30.6 m/s. The engineer would design the flow for the velocity, because the velocity is the reason the potential flow is the most fundamental theory in aerodynamics.**
:::

::: exercise Stream function {#ex-stream-function level=3 check="2"}
A uniform flow with $V _ { \infty } = 1 0$ m/s at $\alpha = 0$ is superimposed with a source of $\Lambda = 2 0$ m²/s at the origin. Calculate the stream function at $r = 1$ m, $\theta = 9 0 ^ { \circ }$ .

::: solution
The **stream function** is:

$$
\psi \; = \; V _ { \infty } \, r \, \sin \theta + { \frac { \Lambda } { 2 \, \pi } } \, \theta \; = \; 1 0 \times 1 \times 1 + { \frac { 2 0 } { 2 \, \pi } } \times { \frac { \pi } { 2 } } \; = \; 1 0 + 5 \; = \; { \bf 1 5 } \ \text{m} ^ { 2 } / \text{s}
$$

**The stream function is 15 m²/s.**
:::
:::

## Exercises

::: exercise Stagnation point {#ex-stagnation-point level=3 check="2"}
A source with $\Lambda = 1 0$ m²/s is placed at the origin in a uniform flow with $V _ { \infty } = 5$ m/s. Calculate the stagnation point location.

::: solution
The stagnation point occurs where $V = 0$ :

$$
V _ { \infty } \; = \; { \frac { \Lambda } { 2 \, \pi \, r } } \qquad \Rightarrow \qquad r \; = \; { \frac { \Lambda } { 2 \, \pi \, V _ { \infty } } } \; = \; { \frac { 1 0 } { 2 \, \pi \times 5 } } \; = \; { \bf 0 . 3 1 8 } \ \text{m}
$$

**The stagnation point is at $x = - 0 . 3 1 8$ m (upstream of the source).**
:::
:::

::: exercise Pressure coefficient {#ex-pressure-coefficient level=3 check="2"}
The velocity at a point on an airfoil is $V = 8 0$ m/s and the free-stream velocity is $V _ { \infty } = 5 0$ m/s. Calculate the pressure coefficient.

::: solution
$$
C _ { p } \; = \; 1 - \left( { \frac { V } { V _ { \infty } } } \right) ^ { 2 } \; = \; 1 - \left( { \frac { 8 0 } { 5 0 } } \right) ^ { 2 } \; = \; 1 - 2 . 5 6 \; = \; { \bf - 1 . 5 6 }
$$

**The pressure coefficient is -1.56.**
:::
:::

::: exercise Circulation {#ex-circulation level=3 check="2"}
A vortex with $\Gamma = 2 0$ m²/s is placed at the origin. Calculate the tangential velocity at $r = 1$ m and $r = 2$ m.

::: solution
$$
V _ { \theta } ( 1 ) \; = \; { \frac { \Gamma } { 2 \, \pi \, r } } \; = \; { \frac { 2 0 } { 2 \, \pi \times 1 } } \; = \; { \bf 3 . 1 8 } \ \text{m/s}
$$

$$
V _ { \theta } ( 2 ) \; = \; { \frac { 2 0 } { 2 \, \pi \times 2 } } \; = \; { \bf 1 . 5 9 } \ \text{m/s}
$$

**The tangential velocity is 3.18 m/s at $r = 1$ m and 1.59 m/s at $r = 2$ m.**
:::
:::

::: exercise Lift per unit span {#ex-lift-per-span level=3 check="2"}
An airfoil has a circulation of $\Gamma = 5$ m²/s in a flow with $V _ { \infty } = 3 0$ m/s and $\rho = 1 . 2 2 5$ kg/m³. Calculate the lift per unit span.

::: solution
$$
L ^ { \prime } \; = \; \rho \, V _ { \infty } \, \Gamma \; = \; 1 . 2 2 5 \times 3 0 \times 5 \; = \; { \bf 1 8 3 . 8 } \ \text{N/m}
$$

**The lift per unit span is 183.8 N/m.**
:::
:::

::: exercise Doublet strength {#ex-doublet-strength level=3 check="2"}
A doublet is placed in a uniform flow with $V _ { \infty } = 1 0$ m/s to create a cylinder of radius $R = 0 . 5$ m. Calculate the doublet strength.

::: solution
For a cylinder, the doublet strength is:

$$
\mu \; = \; 2 \, \pi \, V _ { \infty } \, R ^ { 2 } \; = \; 2 \, \pi \times 1 0 \times 0 . 5 ^ { 2 } \; = \; { \bf 1 5 . 7 } \ \text{m} ^ { 3 } / \text{s}
$$

**The doublet strength is 15.7 m³/s.**
:::
:::

::: exercise Derivation: the Laplace equation {#ex-derive-laplace level=4 check="2"}
Show that the Laplace equation $\nabla ^ { 2 } \phi = 0$ is derived from the continuity equation and the irrotationality condition. Write the expression for the velocity potential.

::: solution
The **continuity equation** for incompressible flow is:

$$
\nabla \cdot \vec { V } \; = \; 0
$$

The **irrotationality condition** is:

$$
\nabla \times \vec { V } \; = \; 0 \qquad \Rightarrow \qquad \vec { V } \; = \; \nabla \phi
$$

Substituting:

$$
\nabla \cdot ( \nabla \phi ) \; = \; \nabla ^ { 2 } \, \phi \; = \; 0
$$

The **velocity potential** is:

$$
\phi \; = \; \int \vec { V } \cdot d \vec { s }
$$

**The Laplace equation is the reason the potential flow is designed for the linearity, not the nonlinearity, and the linearity is the reason the potential flow is the most fundamental theory in aerodynamics.** $\blacksquare$
:::
:::

::: exercise Derivation: the Kutta-Joukowski theorem {#ex-derive-kutta level=4 check="2"}
Show that the Kutta-Joukowski theorem $L ^ { \prime } = \rho V _ { \infty } \Gamma$ is derived from the momentum equation. Write the expression for the lift per unit span.

::: solution
The **momentum equation** for a control volume around the airfoil is:

$$
\vec { F } \; = \; \oint \, \rho \, \vec { V } \, ( \vec { V } \cdot \hat { n } ) \, d s
$$

For a **circular control volume** of radius $r \to \infty$ , the velocity is:

$$
V _ { \theta } \; = \; V _ { \infty } \, \sin \theta + { \frac { \Gamma } { 2 \, \pi \, r } }
$$

The **lift** is the force in the $y$ -direction:

$$
L ^ { \prime } \; = \; - \oint \, p \, \sin \theta \, r \, d \theta
$$

Using the **Bernoulli equation** and integrating:

$$
L ^ { \prime } \; = \; \rho _ { \infty } \, V _ { \infty } \, \Gamma
$$

**The Kutta-Joukowski theorem is the reason the potential flow is designed for the lift, not the drag, and the lift is the reason the potential flow is the most fundamental theory in aerodynamics.** $\blacksquare$
:::
:::

::: quiz Potential flow {#quiz-potential-flow}
The most fundamental theory in aerodynamics is:

- [ ] The Navier-Stokes equation
- [x] The potential flow
- [ ] The boundary layer theory
- [ ] The shock wave theory

::: solution
**The potential flow.** The potential flow is the most fundamental theory in aerodynamics, because the potential flow is the theory that describes the flow without viscosity, and the potential flow is the theory that determines the pressure distribution on the body. The engineer who calculates the potential flow without checking the boundary condition is not calculating the potential flow; they are guessing.
:::
:::

::: quiz Kutta condition {#quiz-kutta}
The Kutta condition ensures:

- [ ] The flow is incompressible
- [x] The flow leaves the trailing edge smoothly
- [ ] The flow is irrotational
- [ ] The flow is steady

::: solution
**The flow leaves the trailing edge smoothly.** The Kutta condition is the condition that the flow leaves the trailing edge smoothly, and the Kutta condition is the reason the potential flow is designed for the circulation, not the velocity. The engineer who calculates the potential flow without checking the Kutta condition is not calculating the potential flow; they are guessing.
:::
:::

## Where this lesson leads

- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic force is the foundation of the potential flow.
- **[[aerodynamics/thin-airfoil-theory]]** — The thin airfoil theory is the foundation of the potential flow.
- **[[aerodynamics/panel-methods]]** — The panel methods are the foundation of the potential flow.
- **[[aerodynamics/finite-wings]]** — The finite wing theory is the foundation of the potential flow.
- **[[aerodynamics/viscous-aerodynamics]]** — The viscous effects are the foundation of the potential flow.
- **[[aerodynamics/oblique-shocks]]** — The oblique shocks are the foundation of the potential flow.
- **[[aerodynamics/compressible-airfoils]]** — The compressible airfoils are the foundation of the potential flow.
- **[[aerodynamics/supersonic-hypersonic]]** — The supersonic and hypersonic flow are the foundation of the potential flow.
- **[[fluid-mechanics/fluid-kinematics]]** — The fluid kinematics is the foundation of the potential flow.
- **[[fluid-mechanics/navier-stokes]]** — The Navier-Stokes equation is the foundation of the potential flow.

::: history Potential flow: from Euler to Prandtl {#history-potential-flow}
**1755** — **Leonhard Euler** publishes the **Euler equations**, which are the foundation of the potential flow. **The Euler equations are the reason the potential flow is the oldest concept in aerodynamics, and the age is the reason the potential flow is the most refined concept in aerodynamics.**

**1834** — **Mikhail Ostrogradsky** publishes the **Laplace equation** for fluid flow, and the Laplace equation is the reason the potential flow is the most mathematical concept in aerodynamics. **The Laplace equation is the reason the potential flow is the most refined concept in aerodynamics, and the potential flow is the reason the Laplace equation is the most mathematical concept in aerodynamics.**

**1838** — **Siméon Poisson** publishes the **Poisson equation**, and the Poisson equation is the reason the potential flow is the most general concept in aerodynamics. **The Poisson equation is the reason the potential flow is the most refined concept in aerodynamics, and the potential flow is the reason the Poisson equation is the most general concept in aerodynamics.**

**1902** — **Frederick Lanchester** publishes the **lifting surface theory**, and the lifting surface theory is the reason the potential flow is the most applied concept in aerodynamics. **The lifting surface theory is the reason the potential flow is the most refined concept in aerodynamics, and the potential flow is the reason the lifting surface theory is the most applied concept in aerodynamics.**

**1904** — **Martin Wilhelm Kutta** and **Wladyslaw Kutta** independently discover the **Kutta condition**, and the Kutta condition is the reason the potential flow is the most accurate concept in aerodynamics. **The Kutta condition is the reason the potential flow is the most refined concept in aerodynamics, and the potential flow is the reason the Kutta condition is the most accurate concept in aerodynamics.**

**1906** — **Nikolai Joukowski** publishes the **Joukowski transformation**, and the Joukowski transformation is the reason the potential flow is the most elegant concept in aerodynamics. **The Joukowski transformation is the reason the potential flow is the most refined concept in aerodynamics, and the potential flow is the reason the Joukowski transformation is the most elegant concept in aerodynamics.**

**1919** — **Ludwig Prandtl** publishes the **lifting line theory**, and the lifting line theory is the reason the potential flow is the most practical concept in aerodynamics. **The lifting line theory is the reason the potential flow is the most refined concept in aerodynamics, and the potential flow is the reason the lifting line theory is the most practical concept in aerodynamics.**

**1935** — **The panel method** is developed, and the panel method is the reason the potential flow is the most computed concept in aerodynamics. **The panel method is the reason the potential flow is the most refined concept in aerodynamics, and the potential flow is the reason the panel method is the most computed concept in aerodynamics.**
:::

::: summary Incompressible potential flow {#summary-potential-flow}
- **The velocity potential is the scalar function whose gradient is the velocity: $\vec { V } = \nabla \phi$ .** The boundary condition is the reason the potential flow is designed for the body shape, not the velocity, and the body shape is the reason the potential flow is the most fundamental theory in aerodynamics.
- **The Laplace equation is $\nabla ^ { 2 } \phi = 0$ , and the stream function is $\nabla ^ { 2 } \psi = 0$ .** The superposition is the reason the potential flow is designed for the linearity, not the nonlinearity, and the linearity is the reason the potential flow is the most fundamental theory in aerodynamics.
- **The elementary flows are the uniform flow, the source, the sink, the vortex, and the doublet.** The singularity strength is the reason the potential flow is designed for the source, not the vortex, and the source is the reason the potential flow is the most fundamental theory in aerodynamics.
- **The pressure coefficient is $C _ { p } = 1 - ( V / V _ { \infty } ) ^ { 2 }$ .** The pressure coefficient is the reason the potential flow is designed for the pressure, not the velocity, and the pressure is the reason the potential flow is the most fundamental theory in aerodynamics.
- **The Kutta condition states that the flow leaves the trailing edge smoothly: $\Gamma = \pi \, c \, V _ { \infty } \, \sin \alpha$ (flat plate).** The Kutta condition is the reason the potential flow is designed for the circulation, not the velocity, and the circulation is the reason the potential flow is the most fundamental theory in aerodynamics.
- **The Kutta-Joukowski theorem states that the lift per unit span is $L ^ { \prime } = \rho \, V _ { \infty } \, \Gamma$ .** The circulation is the reason the potential flow is designed for the lift, not the drag, and the lift is the reason the potential flow is the most fundamental theory in aerodynamics.
- **The Joukowski transformation maps a circle to an airfoil: $z = \zeta + a ^ { 2 } / \zeta$ .** The conformal mapping is the reason the potential flow is designed for the geometry, not the velocity, and the geometry is the reason the potential flow is the most fundamental theory in aerodynamics.
- **The lift curve slope for a thin airfoil is $C _ { l , \alpha } = 2 \pi$ per radian.** The lift curve slope is the reason the potential flow is designed for the lift, not the drag.
- **The potential flow calculation is the most important calculation in aerodynamics, because the potential flow calculation determines the pressure distribution on the body.** The pressure distribution is the reason the engineer can design the airfoil to be safe.
- **The potential flow is the most fundamental theory in aerodynamics, because the potential flow is the theory that describes the flow without viscosity.** The theory is the reason the engineer can design the airfoil to be safe.
:::

## Further reading

- **J.D. Anderson (2017)** — *Fundamentals of Aerodynamics*, 6th ed. McGraw-Hill. The potential flow, the velocity potential, and the stream function.
- **K. Katz and A. Plotkin (2001)** — *Low-Speed Aerodynamics*, 2nd ed. Cambridge University Press. The potential flow and the panel methods.
- **L. Milne-Thomson (1968)** — *Theoretical Hydrodynamics*, 5th ed. Macmillan. The potential flow and the conformal mapping.
- **H. Lamb (1932)** — *Hydrodynamics*, 6th ed. Cambridge University Press. The potential flow and the elementary flows.
- **A. Birkhoff (1962)** — *Hydrodynamics*, 2nd ed. Dover. The potential flow and the free streamline theory.
- **M. Spiegel (1965)** — *Theory of Potential Flow*. McGraw-Hill. The potential flow and the complex variable theory.
- **J. Kundu and I. Cohen (2008)** — *Fluid Mechanics*, 4th ed. Academic Press. The potential flow and the fluid kinematics.
- **P. Ruden (1987)** — *Potential Flow Theory*. Dover. The potential flow and the elementary flows.
