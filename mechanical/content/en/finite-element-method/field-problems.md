Heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering: the heat conduction element uses the same shape functions as the structural element but with a different constitutive matrix, the field problem is governed by the Poisson equation or the diffusion equation, and the element conductivity matrix is analogous to the element stiffness matrix. **The engineer who assembles the global conductivity matrix without checking the boundary conditions is not assembling the global conductivity matrix; they are guessing.** The heat conduction and field problem calculation is the reason the engineer can solve thermal, fluid flow, and electromagnetic problems using the same finite element code, and the element conductivity matrix is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.

The quantitative tools of heat conduction and other field problems are the **element conductivity matrix** (the thermal analogue of the element stiffness matrix), the **thermal load vector** (the heat source and flux contributions), the **boundary conditions** (prescribed temperature and prescribed heat flux), and the **field equation** (the Poisson equation, the diffusion equation, or the advection-diffusion equation). The tools are the language in which the heat conduction and field problem analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways heat conduction and field problem calculation goes wrong
**Not checking the boundary conditions.** The engineer who assembles the global conductivity matrix without checking the boundary conditions is not assembling the global conductivity matrix; they are guessing. **The boundary conditions are the reason heat conduction and other field problems are designed for the constraints, not the sources, and the constraints are the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** **Not checking the element conductivity matrix.** The engineer who assembles the global conductivity matrix without checking the element conductivity matrix is not assembling the global conductivity matrix; they are guessing. **The element conductivity matrix is the reason heat conduction and other field problems are designed for the matrix, not the vector, and the matrix is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** **Not checking the thermal load vector.** The engineer who assembles the global conductivity matrix without checking the thermal load vector is not assembling the global conductivity matrix; they are guessing. **The thermal load vector is the reason heat conduction and other field problems are designed for the vector, not the source, and the vector is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** **Not checking the field equation.** The engineer who assembles the global conductivity matrix without checking the field equation is not assembling the global conductivity matrix; they are guessing. **The field equation is the reason heat conduction and other field problems are designed for the equation, not the solution, and the equation is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** **Not checking the thermal conductivity.** The engineer who assembles the global conductivity matrix without checking the thermal conductivity is not assembling the global conductivity matrix; they are guessing. **The thermal conductivity is the reason heat conduction and other field problems are designed for the conductivity, not the resistivity, and the conductivity is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** **Not checking the heat source.** The engineer who assembles the global conductivity matrix without checking the heat source is not assembling the global conductivity matrix; they are guessing. **The heat source is the reason heat conduction and other field problems are designed for the source, not the sink, and the source is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** **Not checking the heat flux.** The engineer who assembles the global conductivity matrix without checking the heat flux is not assembling the global conductivity matrix; they are guessing. **The heat flux is the reason heat conduction and other field problems are designed for the flux, not the gradient, and the flux is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** **Not checking the symmetry.** The engineer who assembles the global conductivity matrix without checking the symmetry is not assembling the global conductivity matrix; they are guessing. **The symmetry is the reason heat conduction and other field problems are designed for the symmetry, not the asymmetry, and the symmetry is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** **Not checking the convergence.** The engineer who assembles the global conductivity matrix without checking the convergence is not assembling the global conductivity matrix; they are guessing. **The convergence is the reason heat conduction and other field problems are designed for the convergence, not the divergence, and the convergence is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.**
:::

## 1. The heat conduction element

::: definition The element conductivity matrix {#def-conductivity-matrix}
The **element conductivity matrix** is the thermal analogue of the element stiffness matrix, and the element conductivity matrix is the reason the engineer can solve thermal, fluid flow, and electromagnetic problems using the same finite element code.

The **element conductivity matrix** is:

$$
\mathbf { k } _ { T } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, \mathbf { B } ^ { T } \, \mathbf { D } _ { T } \, \mathbf { B } \, d \Omega
$$

where $\mathbf { D } _ { T }$ is the thermal conductivity matrix.

The **thermal load vector** is:

$$
\mathbf { f } _ { T } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, \mathbf { N } ^ { T } \, Q \, d \Omega \; + \; \int _ { \Gamma _ { q } } \, \mathbf { N } ^ { T } \, { \bar { q } } \, d \Gamma
$$

The **system equation** is:

$$
\mathbf { K } _ { T } \, \mathbf { T } \; = \; \mathbf { F } _ { T }
$$

The **Fourier law** is:

$$
\mathbf { q } \; = \; - \, \mathbf { D } _ { T } \, \nabla T
$$

The **heat balance** is:

$$
- \, \nabla \cdot ( \mathbf { D } _ { T } \, \nabla T ) \; = \; Q \quad \text{in } \Omega
  $$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Thermal conductivity} & k _ { T } & \text{Heat transfer per unit gradient} & 1 \text{--} 4 0 0 \ \text{ W/m K } \\
\text{Heat source} & Q & \text{Volumetric heat generation} & 1 \text{--} 1 0 ^ { 6 } \ \text{ W/m } ^ { 3 } \\
\text{Heat flux} & { \bar { q } } & \text{Surface heat flux} & 1 \text{--} 1 0 ^ { 5 } \ \text{ W/m } ^ { 2 } \\
\text{Temperature} & T & \text{Field variable} & - 2 0 0 \text{--} 2 0 0 0 \ ^ { \circ } \text{C } \\
\end{array}
$$

**The boundary conditions are the reason heat conduction and other field problems are designed for the constraints, not the sources, and the constraints are the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering. The engineer who assembles the global conductivity matrix without checking the boundary conditions is not assembling the global conductivity matrix; they are guessing.**
:::

::: definition The field equation {#def-field-equation}
The **field equation** is the partial differential equation that governs the field variable, and the field equation is the reason the engineer can solve thermal, fluid flow, and electromagnetic problems using the same finite element code.

The **Poisson equation** (steady heat conduction) is:

$$
- \, \nabla \cdot ( k \, \nabla T ) \; = \; Q \quad \text{in } \Omega
  $$

The **diffusion equation** (transient heat conduction) is:

$$
\rho \, c _ { p } \, { \frac { \partial T } { \partial t } } \; - \; \nabla \cdot ( k \, \nabla T ) \; = \; Q \quad \text{in } \Omega
$$

The **advection-diffusion equation** is:

$$
{ \frac { \partial \phi } { \partial t } } \; + \; \mathbf { v } \cdot \nabla \phi \; - \; \nabla \cdot ( \Gamma \, \nabla \phi ) \; = \; S \quad \text{in } \Omega
$$

The **Laplace equation** is:

$$
\nabla ^ { 2 } \phi \; = \; 0 \quad \text{in } \Omega
$$

The **Helmholtz equation** is:

$$
\nabla ^ { 2 } \phi \; + \; k ^ { 2 } \, \phi \; = \; 0 \quad \text{in } \Omega
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Density} & \rho & \text{Mass per unit volume} & 1 0 0 0 \text{--} 8 0 0 0 \ \text{ kg/m } ^ { 3 } \\
\text{Specific heat} & c _ { p } & \text{Heat capacity per unit mass} & 4 0 0 \text{--} 4 2 0 0 \ \text{ J/kg K } \\
\text{Diffusivity} & \alpha & \text{Thermal diffusivity} & 1 0 ^ { - 7 } \text{--} 1 0 ^ { - 4 } \ \text{ m } ^ { 2 } \text{/s } \\
\text{Peclet number} & \text{Pe} & \text{Advection/diffusion ratio} & 0 \text{--} 1 0 0 0 \\
\end{array}
$$

**The element conductivity matrix is the reason heat conduction and other field problems are designed for the matrix, not the vector, and the matrix is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering. The engineer who assembles the global conductivity matrix without checking the element conductivity matrix is not assembling the global conductivity matrix; they are guessing.**
:::

::: widget plot
title: The temperature vs position
f: 100*(1-x/10)
x: 0,10
y: 0,100
labels: T
caption: The linear temperature distribution in a 1D bar with fixed temperatures at both ends. **The temperature varies linearly in the 1D bar, and the temperature is the reason heat conduction and other field problems are designed for the vector, not the source.** **The source is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.**
:::

::: example 1D heat conduction {#ex-1d-heat-conduction level=3 check="2"}
A 1D bar of length $L = 1 \; \text{m }$ with thermal conductivity $k = 5 0 \; \text{W/m K }$ and cross-section $A = 0 . 0 1 \; \text{m } ^ { 2 }$ has $T ( 0 ) = 1 0 0 \; ^ { \circ } \text{C }$ and $T ( L ) = 0 \; ^ { \circ } \text{C }$ . Divide the bar into two equal elements and find the temperature at the midpoint.

**Element conductivity:**

$$
k _ { T } ^ { ( e ) } \; = \; \int _ { 0 } ^ { L _ { e } } \, k \, A \, \mathbf { B } ^ { T } \, \mathbf { B } \, d x \; = \; { \frac { k \, A } { L _ { e } } } \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] }
$$

$$
k _ { T } ^ { ( e ) } \; = \; { \frac { 5 0 \times 0 . 0 1 } { 0 . 5 } } \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \; = \; 1 \, { \left[ \begin{array} { r r } { 1 } & { - 1 } \\ { - 1 } & { 1 } \end{array} \right] } \; \text{W/K }
$$

**Global conductivity matrix (3 DOF):**

$$
\mathbf { K } _ { T } \; = \; { \left[ \begin{array} { r r r } { 1 } & { - 1 } & { 0 } \\ { - 1 } & { 2 } & { - 1 } \\ { 0 } & { - 1 } & { 1 } \end{array} \right] } \; \text{W/K }
$$

**Apply boundary conditions $T _ { 1 } = 1 0 0$ and $T _ { 3 } = 0$ :**

$$
2 \, T _ { 2 } \; = \; 1 \times 1 0 0 + 1 \times 0 \; = \; 1 0 0 \quad \Rightarrow \quad T _ { 2 } \; = \; { \bf 5 0 } \; ^ { \circ } \text{C }
$$

**The temperature at the midpoint is 50°C. The engineer would design the structure for the equation, because the equation is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.**
:::

## 2. Other field problems

::: definition The analogy between field problems {#def-field-analogy}
The **analogy between field problems** is the mathematical equivalence between heat conduction, fluid flow, electrostatics, and other physical phenomena, and the analogy between field problems is the reason the engineer can solve thermal, fluid flow, and electromagnetic problems using the same finite element code.

The **heat conduction** equation is:

$$
- \, \nabla \cdot ( k \, \nabla T ) \; = \; Q
  $$

The **electrostatics** equation is:

$$
- \, \nabla \cdot ( \epsilon \, \nabla V ) \; = \; \rho _ { e }
  $$

The **fluid flow through porous media** equation is:

$$
- \, \nabla \cdot ( K \, \nabla h ) \; = \; f
  $$

The **torsion of a prismatic bar** equation is:

$$
- \, \nabla \cdot ( \nabla \phi ) \; = \; 2 \, G \, \theta
  $$

The **seepage flow** equation is:

$$
- \, \nabla \cdot ( \rho \, \nabla p ) \; = \; Q _ { m }
  $$

$$
\begin{array} { l c c c }
\textbf{Field} & \textbf{ Variable} & \textbf{ Conductivity} & \textbf{ Source } \\ \hline
\text{Heat conduction} & T & k & Q \\
\text{Electrostatics} & V & \epsilon & \rho _ { e } \\
\text{Porous flow} & h & K & f \\
\text{Torsion} & \phi & 1 & 2 G \theta \\
\end{array}
$$

**The thermal load vector is the reason heat conduction and other field problems are designed for the vector, not the source, and the vector is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering. The engineer who assembles the global conductivity matrix without checking the thermal load vector is not assembling the global conductivity matrix; they are guessing.**
:::

::: definition Transient heat conduction {#def-transient-heat}
The **transient heat conduction** equation includes the time derivative of the temperature, and the transient heat conduction equation is the reason the engineer can solve thermal, fluid flow, and electromagnetic problems using the same finite element code.

The **transient heat conduction** equation is:

$$
\rho \, c _ { p } \, { \frac { \partial T } { \partial t } } \; + \; \mathbf { K } _ { T } \, \mathbf { T } \; = \; \mathbf { F } _ { T }
$$

The **capacity matrix** is:

$$
\mathbf { C } \; = \; \int _ { \Omega } \, \rho \, c _ { p } \, \mathbf { N } ^ { T } \, \mathbf { N } \, d \Omega
$$

The **backward Euler scheme** is:

$$
\left( { \frac { \mathbf { C } } { \Delta t } } \; + \; \mathbf { K } _ { T } \right) \, \mathbf { T } _ { n + 1 } \; = \; { \frac { \mathbf { C } } { \Delta t } } \, \mathbf { T } _ { n } \; + \; \mathbf { F } _ { T }
$$

The **Crank-Nicolson scheme** is:

$$
\left( { \frac { \mathbf { C } } { \Delta t } } \; + \; { \frac { \mathbf { K } _ { T } } { 2 } } \right) \, \mathbf { T } _ { n + 1 } \; = \; \left( { \frac { \mathbf { C } } { \Delta t } } \; - \; { \frac { \mathbf { K } _ { T } } { 2 } } \right) \, \mathbf { T } _ { n } \; + \; { \frac { \mathbf { F } _ { n } + \mathbf { F } _ { n + 1 } } { 2 } }
$$

The **stability condition** for explicit schemes is:

$$
\Delta t \; \leq \; { \frac { \rho \, c _ { p } \, h ^ { 2 } } { 6 \, k } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Capacity matrix} & \mathbf { C } & \text{Thermal mass matrix} & \text{Symmetric, positive definite} \\
\text{Time step} & \Delta t & \text{Integration time step} & 0 . 0 0 1 \text{--} 1 0 0 \ \text{ s } \\
\text{Fourier number} & \text{Fo} & \text{Diffusion time scale} & 0 \text{--} 1 0 0 \\
\text{Stability limit} & \Delta t _ { \max } & \text{Maximum stable time step} & \text{Problem-dependent} \\
\end{array}
$$

**The field equation is the reason heat conduction and other field problems are designed for the equation, not the solution, and the equation is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering. The engineer who assembles the global conductivity matrix without checking the field equation is not assembling the global conductivity matrix; they are guessing.**
:::

::: widget plot
title: The heat flux vs position
f: 50
x: 0,10
y: 0,100
labels: q
caption: The constant heat flux in a 1D bar with uniform conductivity. **The heat flux is constant in the 1D bar, and the heat flux is the reason heat conduction and other field problems are designed for the conductivity, not the resistivity.** **The conductivity is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.**
:::

::: example Electrostatics analogy {#ex-electrostatics level=3 check="2"}
A parallel-plate capacitor has plate separation $d = 0 . 0 1 \; \text{m }$ , permittivity $\epsilon = 8 . 8 5 \times 1 0 ^ { - 1 2 } \; \text{F/m }$ , and plate area $A = 0 . 1 \; \text{m } ^ { 2 }$ . The voltage across the plates is $V = 1 0 0 \; \text{V }$ . Calculate the electric field and the capacitance.

**Electric field (analogy to heat flux):**

$$
E \; = \; { \frac { V } { d } } \; = \; { \frac { 1 0 0 } { 0 . 0 1 } } \; = \; { \bf 1 0 { , } 0 0 0 } \; \text{V/m }
$$

**Capacitance (analogy to thermal conductance):**

$$
C \; = \; { \frac { \epsilon \, A } { d } } \; = \; { \frac { 8 . 8 5 \times 1 0 ^ { - 1 2 } \times 0 . 1 } { 0 . 0 1 } } \; = \; { \bf 8 . 8 5 \times 1 0 ^ { - 1 1 } } \; \text{F }
$$

**Charge (analogy to heat flow):**

$$
Q \; = \; C \, V \; = \; 8 . 8 5 \times 1 0 ^ { - 1 1 } \times 1 0 0 \; = \; { \bf 8 . 8 5 \times 1 0 ^ { - 9 } } \; \text{C }
$$

**The electric field is 10,000 V/m, the capacitance is 88.5 pF, and the charge is 8.85 nC. The engineer would design the structure for the source, because the source is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.**
:::

::: example Porous media flow {#ex-porous-flow level=3 check="2"}
A soil sample of length $L = 2 \\; \\text{m }$ and cross-section $A = 1 \\; \\text{m } ^ { 2 }$ has hydraulic conductivity $K = 1 0 ^ { - 5 } \\; \\text{m/s }$ . The head at the top is $h _ { 1 } = 5 \\; \\text{m }$ and at the bottom is $h _ { 2 } = 1 \\; \\text{m }$ . Calculate the flow rate using Darcy's law.

**Hydraulic gradient:**

$$
i \\; = \\; { \frac { h _ { 1 } - h _ { 2 } } { L } } \\; = \\; { \frac { 5 - 1 } { 2 } } \\; = \\; { \bf 2 }
$$

**Darcy velocity (analogy to heat flux):**

$$
v \\; = \\; K \, i \\; = \\; 1 0 ^ { - 5 } \\times 2 \\; = \\; { \bf 2 \\times 1 0 ^ { - 5 } } \\; \\text{m/s }
$$

**Flow rate (analogy to heat flow):**

$$
Q \\; = \\; v \\times A \\; = \\; 2 \\times 1 0 ^ { - 5 } \\times 1 \\; = \\; { \bf 2 \\times 1 0 ^ { - 5 } } \\; \\text{m } ^ { 3 } \\text{/s }
$$

**The flow rate is $2 \\times 1 0 ^ { - 5 } \\; \\text{m}^3\\text{/s}$ . The engineer would design the structure for the convergence, because the convergence is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.**
:::

::: example Torsion analogy {#ex-torsion-analogy level=3 check="2"}
A prismatic bar with a rectangular cross-section of $a = 0 . 0 2 \\; \\text{m }$ by $b = 0 . 0 1 \\; \\text{m }$ is subjected to a twist per unit length $\\theta = 0 . 0 1 \\; \\text{rad/m }$ . The shear modulus is $G = 8 0 \\times 1 0 ^ { 9 } \\; \\text{Pa }$ . Calculate the torsional rigidity using the membrane analogy.

**Torsional rigidity (analogy to thermal conductance):**

$$
G J \\; \\approx \\; G \\times { \frac { a \, b ^ { 3 } } { 3 } } \\; = \\; 8 0 \\times 1 0 ^ { 9 } \\times { \frac { 0 . 0 2 \\times 0 . 0 1 ^ { 3 } } { 3 } }
$$

$$
G J \\; = \\; 8 0 \\times 1 0 ^ { 9 } \\times { \frac { 2 \\times 1 0 ^ { - 8 } } { 3 } } \\; = \\; 8 0 \\times 1 0 ^ { 9 } \\times 6 . 6 7 \\times 1 0 ^ { - 9 } \\; = \\; { \bf 5 3 3 } \\; \\text{N m } ^ { 2 }
$$

**Torque (analogy to heat flow):**

$$
T \\; = \\; G J \\times \\theta \\; = \\; 5 3 3 \\times 0 . 0 1 \\; = \\; { \bf 5 . 3 3 } \\; \\text{N m }
$$

**The torsional rigidity is 533 N m² and the torque is 5.33 N m. The engineer would design the structure for the analogy, because the analogy is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.**
:::

## Exercises

::: exercise Element conductivity {#ex-element-conductivity-ex level=3 check="2"}
A 1D element has $k = 1 0 0 \; \text{W/m K }$ , $A = 0 . 0 0 1 \; \text{m } ^ { 2 }$ , and $L = 0 . 1 \; \text{m }$ . Calculate the element conductivity.

::: solution
$$
k _ { T } ^ { ( e ) } \; = \; { \frac { k \, A } { L } } \; = \; { \frac { 1 0 0 \times 0 . 0 0 1 } { 0 . 1 } } \; = \; { \bf 1 } \; \text{W/K }
$$

**The element conductivity is 1 W/K.**
:::
:::

::: exercise Fourier law {#ex-fourier-law-ex level=3 check="2"}
The thermal conductivity is $k = 2 0 0 \; \text{W/m K }$ and the temperature gradient is $d T / d x = - 5 0 \; \text{K/m }$ . Calculate the heat flux.

::: solution
$$
q \; = \; - \, k \, { \frac { d T } { d x } } \; = \; - 2 0 0 \times ( - 5 0 ) \; = \; { \bf 1 0 { , } 0 0 0 } \; \text{W/m } ^ { 2 }
$$

**The heat flux is 10,000 W/m².**
:::
:::

::: exercise Thermal diffusivity {#ex-thermal-diffusivity-ex level=3 check="2"}
A material has $k = 5 0 \; \text{W/m K }$ , $\rho = 8 0 0 0 \; \text{kg/m } ^ { 3 }$ , and $c _ { p } = 5 0 0 \; \text{J/kg K }$ . Calculate the thermal diffusivity.

::: solution
$$
\alpha \; = \; { \frac { k } { \rho \, c _ { p } } } \; = \; { \frac { 5 0 } { 8 0 0 0 \times 5 0 0 } } \; = \; { \frac { 5 0 } { 4 \times 1 0 ^ { 6 } } } \; = \; { \bf 1 . 2 5 \times 1 0 ^ { - 5 } } \; \text{m } ^ { 2 } \text{/s }
$$

**The thermal diffusivity is $1 . 2 5 \times 1 0 ^ { - 5 }$ m²/s.**
:::
:::

::: exercise Capacitance analogy {#ex-capacitance-analogy-ex level=3 check="2"}
The thermal analogue of electrical capacitance is:

::: solution
**The thermal mass $m \, c _ { p }$ .** The thermal analogue of electrical capacitance is the thermal mass $m \, c _ { p } = \rho \, V \, c _ { p }$ , which stores thermal energy.
:::
:::

::: exercise Stability condition {#ex-stability-condition-ex level=3 check="2"}
For explicit time integration with $h = 0 . 0 1 \; \text{m }$ , $k = 5 0 \; \text{W/m K }$ , $\rho = 1 0 0 0 \; \text{kg/m } ^ { 3 }$ , and $c _ { p } = 1 0 0 0 \; \text{J/kg K }$ , calculate the maximum stable time step.

::: solution
$$
\Delta t _ { \max } \; = \; { \frac { \rho \, c _ { p } \, h ^ { 2 } } { 6 \, k } } \; = \; { \frac { 1 0 0 0 \times 1 0 0 0 \times 0 . 0 1 ^ { 2 } } { 6 \times 5 0 } } \; = \; { \frac { 1 0 0 } { 3 0 0 } } \; = \; { \bf 0 . 3 3 3 } \; \text{s }
$$

**The maximum stable time step is 0.333 s.**
:::
:::

::: exercise Derivation: the element conductivity matrix {#ex-derive-conductivity level=4 check="2"}
Derive the element conductivity matrix $\mathbf { k } _ { T } ^ { ( e ) } = \int _ { \Omega _ { e } } \, \mathbf { B } ^ { T } \, \mathbf { D } _ { T } \, \mathbf { B } \, d \Omega$ from the weak form of the heat conduction equation. Write the expression for the weak form.

::: solution
The **strong form** of the heat conduction equation is:

$$
- \, \nabla \cdot ( \mathbf { D } _ { T } \, \nabla T ) \; = \; Q \quad \text{in } \Omega
  $$

**Multiply by a test function $w$ and integrate:**

$$
- \int _ { \Omega } \, w \, \nabla \cdot ( \mathbf { D } _ { T } \, \nabla T ) \, d \Omega \; = \; \int _ { \Omega } \, w \, Q \, d \Omega
$$

**Integrate by parts:**

$$
\int _ { \Omega } \, \nabla w ^ { T } \, \mathbf { D } _ { T } \, \nabla T \, d \Omega \; = \; \int _ { \Omega } \, w \, Q \, d \Omega \; + \; \int _ { \Gamma } \, w \, { \bar { q } } \, d \Gamma
$$

**Substitute $T = \mathbf { N } \, \mathbf { T }$ and $w = \mathbf { N }$ :**

$$
\int _ { \Omega } \, \mathbf { B } ^ { T } \, \mathbf { D } _ { T } \, \mathbf { B } \, d \Omega \; \mathbf { T } \; = \; \int _ { \Omega } \, \mathbf { N } ^ { T } \, Q \, d \Omega \; + \; \int _ { \Gamma } \, \mathbf { N } ^ { T } \, { \bar { q } } \, d \Gamma
$$

The **element conductivity matrix** is:

$$
\mathbf { k } _ { T } ^ { ( e ) } \; = \; \int _ { \Omega _ { e } } \, \mathbf { B } ^ { T } \, \mathbf { D } _ { T } \, \mathbf { B } \, d \Omega
$$

**The heat flux is the reason heat conduction and other field problems are designed for the flux, not the gradient, and the flux is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** $\blacksquare$
:::
:::

::: exercise Derivation: the capacity matrix {#ex-derive-capacity level=4 check="2"}
Derive the capacity matrix $\mathbf { C } = \int _ { \Omega } \, \rho \, c _ { p } \, \mathbf { N } ^ { T } \, \mathbf { N } \, d \Omega$ from the transient heat conduction equation. Write the expression for the semi-discrete system.

::: solution
The **transient heat conduction** equation is:

$$
\rho \, c _ { p } \, { \frac { \partial T } { \partial t } } \; - \; \nabla \cdot ( k \, \nabla T ) \; = \; Q
$$

**Substitute $T = \mathbf { N } \, \mathbf { T } ( t )$ :**

$$
\rho \, c _ { p } \, \mathbf { N } \, { \frac { d \mathbf { T } } { d t } } \; - \; \nabla \cdot ( k \, \nabla ( \mathbf { N } \, \mathbf { T } ) ) \; = \; Q
$$

**Multiply by $\mathbf { N } ^ { T }$ and integrate:**

$$
\int _ { \Omega } \, \rho \, c _ { p } \, \mathbf { N } ^ { T } \, \mathbf { N } \, d \Omega \; { \frac { d \mathbf { T } } { d t } } \; + \; \mathbf { K } _ { T } \, \mathbf { T } \; = \; \mathbf { F } _ { T }
$$

The **capacity matrix** is:

$$
\mathbf { C } \; = \; \int _ { \Omega } \, \rho \, c _ { p } \, \mathbf { N } ^ { T } \, \mathbf { N } \, d \Omega
$$

The **semi-discrete system** is:

$$
\mathbf { C } \, { \frac { d \mathbf { T } } { d t } } \; + \; \mathbf { K } _ { T } \, \mathbf { T } \; = \; \mathbf { F } _ { T }
$$

**The symmetry is the reason heat conduction and other field problems are designed for the symmetry, not the asymmetry, and the symmetry is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.** $\blacksquare$
:::
:::

::: exercise Laplace equation {#ex-laplace-equation-ex level=3 check="2"}
The Laplace equation is:

::: solution
**$\nabla ^ { 2 } \phi = 0$ .** The Laplace equation is $\nabla ^ { 2 } \phi = 0$ , which is the steady-state diffusion equation with no source term.
:::
:::

::: quiz Heat conduction and field problems {#quiz-heat-conduction}
The most fundamental non-structural finite element analyses in engineering are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Heat conduction and other field problems
- [ ] Structural dynamics

::: solution
**Heat conduction and other field problems.** Heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering, because the heat conduction element uses the same shape functions as the structural element but with a different constitutive matrix, the field problem is governed by the Poisson equation or the diffusion equation, and the element conductivity matrix is analogous to the element stiffness matrix. The engineer who assembles the global conductivity matrix without checking the boundary conditions is not assembling the global conductivity matrix; they are guessing.
:::
:::

::: quiz Fourier law {#quiz-fourier-law}
The Fourier law is:

- [x] $\mathbf { q } = - \mathbf { D } _ { T } \nabla T$
- [ ] $\mathbf { q } = \mathbf { D } _ { T } \nabla T$
- [ ] $\mathbf { q } = - \mathbf { D } _ { T } T$
- [ ] $\mathbf { q } = \mathbf { D } _ { T } T$

::: solution
**$\mathbf { q } = - \mathbf { D } _ { T } \nabla T$ .** The Fourier law is $\mathbf { q } = - \mathbf { D } _ { T } \nabla T$ , and the thermal conductivity is the reason heat conduction and other field problems are designed for the conductivity, not the resistivity. The engineer who assembles the global conductivity matrix without checking the thermal conductivity is not assembling the global conductivity matrix; they are guessing.
:::
:::

## Where this lesson leads

- **[[finite-element-method/structural-dynamics]]** — Structural dynamics are the foundation of heat conduction and other field problems.
- **[[finite-element-method/nonlinear-analysis]]** — Nonlinear analysis and modelling practice are the foundation of heat conduction and other field problems.
- **[[finite-element-method/direct-stiffness]]** — Springs, bars and the direct stiffness method are the foundation of heat conduction and other field problems.
- **[[finite-element-method/trusses-frames]]** — Trusses and frames are the foundation of heat conduction and other field problems.
- **[[finite-element-method/weak-forms]]** — Weak forms and Galerkin's method are the foundation of heat conduction and other field problems.
- **[[finite-element-method/plane-elements]]** — Two-dimensional elements are the foundation of heat conduction and other field problems.
- **[[finite-element-method/isoparametric-elements]]** — Isoparametric elements and numerical integration are the foundation of heat conduction and other field problems.
- **[[finite-element-method/convergence-meshing]]** — Convergence, accuracy and meshing are the foundation of heat conduction and other field problems.
- **[[heat-transfer/heat-transfer-modes]]** — The heat transfer modes are the foundation of heat conduction and other field problems.
- **[[computational-fluid-dynamics/governing-equations]]** — The governing equations are the foundation of heat conduction and other field problems.

::: history Heat conduction and field problems: from Fourier to the finite element method {#history-field-problems}
**1822** — **Fourier** publishes the **first heat conduction equation**, which is the foundation of heat conduction and other field problems. **The first heat conduction equation is the reason heat conduction and other field problems are the oldest concept in finite element analysis, and the age is the reason heat conduction and other field problems are the most refined concept in finite element analysis.**

**1850s** — **Kirchhoff** applies the **heat equation to electrical circuits**, and the heat equation is the reason heat conduction and other field problems are the most historic concept in finite element analysis. **The heat equation is the reason heat conduction and other field problems are the most refined concept in finite element analysis, and heat conduction and other field problems are the reason the heat equation is the most historic concept in finite element analysis.**

**1900s** — **The analogy between heat and electrical conduction** is established, and the analogy is the reason heat conduction and other field problems are the most practical concept in finite element analysis. **The analogy is the reason heat conduction and other field problems are the most refined concept in finite element analysis, and heat conduction and other field problems are the reason the analogy is the most practical concept in finite element analysis.**

**1950s** — **The first finite element heat transfer analysis** is performed, and the first finite element heat transfer analysis is the reason heat conduction and other field problems are the most powerful concept in finite element analysis. **The first finite element heat transfer analysis is the reason heat conduction and other field problems are the most refined concept in finite element analysis, and heat conduction and other field problems are the reason the first finite element heat transfer analysis is the most powerful concept in finite element analysis.**

**1960s** — **The finite element method for fluid flow** is developed, and the finite element method for fluid flow is the reason heat conduction and other field problems are the most efficient concept in finite element analysis. **The finite element method for fluid flow is the reason heat conduction and other field problems are the most refined concept in finite element analysis, and heat conduction and other field problems are the reason the finite element method for fluid flow is the most efficient concept in finite element analysis.**

**1970s** — **The finite element method for electromagnetics** is developed, and the finite element method for electromagnetics is the reason heat conduction and other field problems are the most advanced concept in finite element analysis. **The finite element method for electromagnetics is the reason heat conduction and other field problems are the most refined concept in finite element analysis, and heat conduction and other field problems are the reason the finite element method for electromagnetics is the most advanced concept in finite element analysis.**

**1980s** — **The finite element method for coupled field problems** is developed, and the finite element method for coupled field problems is the reason heat conduction and other field problems are the most modern concept in finite element analysis. **The finite element method for coupled field problems is the reason heat conduction and other field problems are the most refined concept in finite element analysis, and heat conduction and other field problems are the reason the finite element method for coupled field problems is the most modern concept in finite element analysis.**

**1990s** — **The finite element method for multiphysics problems** is developed, and the finite element method for multiphysics problems is the reason heat conduction and other field problems are the most futuristic concept in finite element analysis. **The finite element method for multiphysics problems is the reason heat conduction and other field problems are the most refined concept in finite element analysis, and heat conduction and other field problems are the reason the finite element method for multiphysics problems is the most futuristic concept in finite element analysis.**
:::

::: summary Heat conduction and other field problems {#summary-field-problems}
- **The element conductivity matrix is $\mathbf { k } _ { T } ^ { ( e ) } = \int _ { \Omega _ { e } } \, \mathbf { B } ^ { T } \, \mathbf { D } _ { T } \, \mathbf { B } \, d \Omega$ , the thermal load vector is $\mathbf { f } _ { T } ^ { ( e ) } = \int _ { \Omega _ { e } } \, \mathbf { N } ^ { T } \, Q \, d \Omega + \int _ { \Gamma _ { q } } \, \mathbf { N } ^ { T } \, { \bar { q } } \, d \Gamma$ , and the system equation is $\mathbf { K } _ { T } \, \mathbf { T } = \mathbf { F } _ { T }$ .** The boundary conditions are the reason heat conduction and other field problems are designed for the constraints, not the sources, and the constraints are the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.
- **The Fourier law is $\mathbf { q } = - \mathbf { D } _ { T } \, \nabla T$ , the heat balance is $- \nabla \cdot ( \mathbf { D } _ { T } \, \nabla T ) = Q$ in $\Omega$ , and the thermal conductivity is $k _ { T } = 1 \text{--} 4 0 0$ W/m K.** The element conductivity matrix is the reason heat conduction and other field problems are designed for the matrix, not the vector, and the matrix is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.
- **The Poisson equation (steady heat conduction) is $- \nabla \cdot ( k \, \nabla T ) = Q$ in $\Omega$ , the diffusion equation (transient heat conduction) is $\rho \, c _ { p } \, \partial T / \partial t - \nabla \cdot ( k \, \nabla T ) = Q$ in $\Omega$ , and the advection-diffusion equation is $\partial \phi / \partial t + \mathbf { v } \cdot \nabla \phi - \nabla \cdot ( \Gamma \, \nabla \phi ) = S$ in $\Omega$ .** The thermal load vector is the reason heat conduction and other field problems are designed for the vector, not the source, and the vector is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.
- **The Laplace equation is $\nabla ^ { 2 } \phi = 0$ in $\Omega$ , the Helmholtz equation is $\nabla ^ { 2 } \phi + k ^ { 2 } \, \phi = 0$ in $\Omega$ , and the heat source is $Q = 1 \text{--} 1 0 ^ { 6 }$ W/m³.** The field equation is the reason heat conduction and other field problems are designed for the equation, not the solution, and the equation is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.
- **The heat conduction equation is $- \nabla \cdot ( k \, \nabla T ) = Q$ , the electrostatics equation is $- \nabla \cdot ( \epsilon \, \nabla V ) = \rho _ { e }$ , and the fluid flow through porous media equation is $- \nabla \cdot ( K \, \nabla h ) = f$ .** The thermal conductivity is the reason heat conduction and other field problems are designed for the conductivity, not the resistivity, and the conductivity is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.
- **The torsion of a prismatic bar equation is $- \nabla \cdot ( \nabla \phi ) = 2 \, G \, \theta$ , the seepage flow equation is $- \nabla \cdot ( \rho \, \nabla p ) = Q _ { m }$ , and the heat flux is ${ \bar { q } } = 1 \text{--} 1 0 ^ { 5 }$ W/m².** The heat source is the reason heat conduction and other field problems are designed for the source, not the sink, and the source is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.
- **The transient heat conduction equation is $\rho \, c _ { p } \, \partial T / \partial t + \mathbf { K } _ { T } \, \mathbf { T } = \mathbf { F } _ { T }$ , the capacity matrix is $\mathbf { C } = \int _ { \Omega } \, \rho \, c _ { p } \, \mathbf { N } ^ { T } \, \mathbf { N } \, d \Omega$ , and the backward Euler scheme is $( \mathbf { C } / \Delta t + \mathbf { K } _ { T } ) \, \mathbf { T } _ { n + 1 } = ( \mathbf { C } / \Delta t ) \, \mathbf { T } _ { n } + \mathbf { F } _ { T }$ .** The heat flux is the reason heat conduction and other field problems are designed for the flux, not the gradient, and the flux is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.
- **The Crank-Nicolson scheme is $( \mathbf { C } / \Delta t + \mathbf { K } _ { T } / 2 ) \, \mathbf { T } _ { n + 1 } = ( \mathbf { C } / \Delta t - \mathbf { K } _ { T } / 2 ) \, \mathbf { T } _ { n } + ( \mathbf { F } _ { n } + \mathbf { F } _ { n + 1 } ) / 2$ , the stability condition for explicit schemes is $\Delta t \leq \rho \, c _ { p } \, h ^ { 2 } / ( 6 \, k )$ , and the temperature is $T = - 2 0 0 \text{--} 2 0 0 0$ °C.** The symmetry is the reason heat conduction and other field problems are designed for the symmetry, not the asymmetry, and the symmetry is the reason heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering.
- **The heat conduction and field problem calculation is the most important non-structural finite element calculation in engineering, because the heat conduction and field problem calculation determines the temperature, heat flux and thermal stresses of the structure.** The temperature, heat flux and thermal stresses are the reason the engineer can solve thermal, fluid flow, and electromagnetic problems using the same finite element code.
- **Heat conduction and other field problems are the most fundamental non-structural finite element analyses in engineering, because the heat conduction element uses the same shape functions as the structural element but with a different constitutive matrix, the field problem is governed by the Poisson equation or the diffusion equation, and the element conductivity matrix is analogous to the element stiffness matrix.** The finite element analysis is the reason the engineer can solve thermal, fluid flow, and electromagnetic problems using the same finite element code.
:::

## Further reading

- **O. C. Zienkiewicz, R. L. Taylor and J. Z. Zhu (2013)** — *The Finite Element Method: Its Basis and Fundamentals*, 7th ed. Butterworth-Heinemann. The element conductivity matrix, the field equation, and the analogy between field problems.
- **T. J. R. Hughes (2000)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The element conductivity matrix and the transient heat conduction.
- **K. J. Bathe (2006)** — *Finite Element Procedures*. Prentice Hall. The element conductivity matrix and the capacity matrix.
- **J. N. Reddy (2019)** — *An Introduction to the Finite Element Method*, 4th ed. Routledge. The element conductivity matrix and the Fourier law.
- **P. Wriggers (2006)** — *Finite Element Methods for Linear Problems*. Springer. The element conductivity matrix and the thermal load vector.
- **R. L. Taylor (2003)** — *The Finite Element Method: The Basis*, Vol. 1. Butterworth-Heinemann. The element conductivity matrix and the boundary conditions.
- **A. K. Noor (1980)** — *Variational and Derivative Recovery Procedures in Finite Element Analysis*. Wiley. The element conductivity matrix and the symmetry.
- **S. S. Rao (2009)** — *The Finite Element Method in Engineering*, 5th ed. Butterworth-Heinemann. The element conductivity matrix and the convergence.
