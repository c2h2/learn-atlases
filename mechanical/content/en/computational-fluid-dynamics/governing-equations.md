Governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics: the Navier-Stokes equations describe the conservation of mass, momentum and energy for a viscous fluid, the classification into elliptic, parabolic and hyperbolic types determines the appropriate numerical method, and the characteristic lines define the domain of dependence and the domain of influence. **The engineer who selects a numerical method without checking the classification of the governing equations is not selecting a numerical method; they are guessing.** The governing equations and classification calculation is the reason the engineer can predict the flow field, pressure distribution and heat transfer rate of a fluid flow, and the classification into elliptic, parabolic and hyperbolic types is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.

The quantitative tools of governing equations and their classification are the **continuity equation** (the conservation of mass), the **momentum equation** (the conservation of momentum, also known as the Navier-Stokes equation), the **energy equation** (the conservation of energy), and the **classification into elliptic, parabolic and hyperbolic types** (the mathematical taxonomy that determines the appropriate numerical method). The tools are the language in which the governing equations and classification analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways governing equations and classification calculation goes wrong
**Not checking the classification.** The engineer who selects a numerical method without checking the classification of the governing equations is not selecting a numerical method; they are guessing. **The classification is the reason governing equations and their classification are designed for the equations, not the solutions, and the equations are the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** **Not checking the continuity equation.** The engineer who selects a numerical method without checking the continuity equation is not selecting a numerical method; they are guessing. **The continuity equation is the reason governing equations and their classification are designed for the mass, not the momentum, and the mass is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** **Not checking the momentum equation.** The engineer who selects a numerical method without checking the momentum equation is not selecting a numerical method; they are guessing. **The momentum equation is the reason governing equations and their classification are designed for the momentum, not the energy, and the momentum is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** **Not checking the energy equation.** The engineer who selects a numerical method without checking the energy equation is not selecting a numerical method; they are guessing. **The energy equation is the reason governing equations and their classification are designed for the energy, not the mass, and the energy is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** **Not checking the characteristic lines.** The engineer who selects a numerical method without checking the characteristic lines is not selecting a numerical method; they are guessing. **The characteristic lines are the reason governing equations and their classification are designed for the characteristics, not the solutions, and the characteristics are the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** **Not checking the boundary conditions.** The engineer who selects a numerical method without checking the boundary conditions is not selecting a numerical method; they are guessing. **The boundary conditions are the reason governing equations and their classification are designed for the boundary, not the interior, and the boundary is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** **Not checking the initial conditions.** The engineer who selects a numerical method without checking the initial conditions is not selecting a numerical method; they are guessing. **The initial conditions are the reason governing equations and their classification are designed for the initial, not the final, and the initial is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** **Not checking the Reynolds number.** The engineer who selects a numerical method without checking the Reynolds number is not selecting a numerical method; they are guessing. **The Reynolds number is the reason governing equations and their classification are designed for the ratio, not the difference, and the ratio is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** **Not checking the Mach number.** The engineer who selects a numerical method without checking the Mach number is not selecting a numerical method; they are guessing. **The Mach number is the reason governing equations and their classification are designed for the compressibility, not the incompressibility, and the compressibility is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.**
:::

## 1. The Navier-Stokes equations

::: definition The continuity equation {#def-continuity-equation}
The **continuity equation** is the mathematical statement of the conservation of mass, and the continuity equation is the reason the engineer can predict the flow field, pressure distribution and heat transfer rate of a fluid flow.

The **continuity equation** is:

$$
{ \frac { \partial \rho } { \partial t } } \; + \; \nabla \cdot ( \rho \, \mathbf { u } ) \; = \; 0
$$

The **incompressible continuity equation** is:

$$
\nabla \cdot \mathbf { u } \; = \; 0
$$

The **material derivative** is:

$$
{ \frac { D } { D t } } \; = \; { \frac { \partial } { \partial t } } \; + \; \mathbf { u } \cdot \nabla
$$

The **conservative form** is:

$$
{ \frac { \partial \rho } { \partial t } } \; + \; { \frac { \partial ( \rho \, u _ { j } ) } { \partial x _ { j } } } \; = \; 0
$$

The **stream function** (2D incompressible) is:

$$
u \; = \; { \frac { \partial \psi } { \partial y } } , \quad v \; = \; - \, { \frac { \partial \psi } { \partial x } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Density} & \rho & \text{Mass per unit volume} & 1 . 2 \text{--} 1 0 0 0 \ \text{ kg/m } ^ { 3 } \\
\text{Velocity} & \mathbf { u } & \text{Flow velocity} & 0 . 0 0 1 \text{--} 1 0 0 0 \ \text{ m/s } \\
\text{Dilatation} & \nabla \cdot \mathbf { u } & \text{Rate of volume change} & 0 \text{ (incompressible)} \\
\text{Stream function} & \psi & \text{2D incompressible potential} & \text{m}^2 \text{/s } \\
\end{array}
$$

**The classification is the reason governing equations and their classification are designed for the equations, not the solutions, and the equations are the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics. The engineer who selects a numerical method without checking the classification of the governing equations is not selecting a numerical method; they are guessing.**
:::

::: definition The momentum equation {#def-momentum-equation}
The **momentum equation** is the mathematical statement of the conservation of momentum, and the momentum equation is the reason the engineer can predict the flow field, pressure distribution and heat transfer rate of a fluid flow.

The **Navier-Stokes equation** is:

$$
\rho \, { \frac { D \mathbf { u } } { D t } } \; = \; - \, \nabla p \; + \, \nabla \cdot { \boldsymbol { \tau } } \; + \, \rho \, \mathbf { g }
$$

The **Cauchy stress tensor** is:

$$
{ \boldsymbol { \tau } } \; = \; \mu \, \left( \nabla \mathbf { u } \; + \, ( \nabla \mathbf { u } ) ^ { T } \right) \; - \; { \frac { 2 } { 3 } } \, \mu \, ( \nabla \cdot \mathbf { u } ) \, { \boldsymbol { \delta } }
$$

The **incompressible Navier-Stokes equation** is:

$$
\rho \, \left( { \frac { \partial \mathbf { u } } { \partial t } } \; + \; \mathbf { u } \cdot \nabla \mathbf { u } \right) \; = \; - \, \nabla p \; + \; \mu \, \nabla ^ { 2 } \mathbf { u } \; + \; \rho \, \mathbf { g }
$$

The **Euler equation** (inviscid) is:

$$
\rho \, { \frac { D \mathbf { u } } { D t } } \; = \; - \, \nabla p \; + \; \rho \, \mathbf { g }
$$

The **Reynolds number** is:

$$
\mathrm { R e } \; = \; { \frac { \rho \, U \, L } { \mu } } \; = \; { \frac { U \, L } { \nu } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pressure} & p & \text{Thermodynamic pressure} & 1 0 ^ { 3 } \text{--} 1 0 ^ { 7 } \ \text{ Pa } \\
\text{Dynamic viscosity} & \mu & \text{Resistance to shear} & 1 0 ^ { - 5 } \text{--} 1 0 \ \text{ Pa s } \\
\text{Kinematic viscosity} & \nu & \text{Viscosity/density} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { - 2 } \ \text{ m } ^ { 2 } \text{/s } \\
\text{Reynolds number} & \mathrm { R e } & \text{Inertia/viscous ratio} & 1 \text{--} 1 0 ^ { 8 } \\
\end{array}
$$

**The continuity equation is the reason governing equations and their classification are designed for the mass, not the momentum, and the mass is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics. The engineer who selects a numerical method without checking the continuity equation is not selecting a numerical method; they are guessing.**
:::

::: widget plot
title: The velocity profile vs Reynolds number
f: 1 - (x/0.01)^2
x: -0.01,0.01
y: 0,1
labels: u/Umax
caption: The parabolic velocity profile in a pipe flow. **The velocity profile is parabolic for laminar flow, and the velocity profile is the reason governing equations and their classification are designed for the momentum, not the energy.** **The momentum is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.**
:::

::: example Couette flow {#ex-couette-flow level=3 check="2"}
Two parallel plates are separated by a distance $h = 0 . 0 1 \; \text{m }$ . The top plate moves with velocity $U = 1 \; \text{m/s }$ and the bottom plate is stationary. The fluid has $\mu = 0 . 1 \; \text{Pa s }$ . Calculate the shear stress and the velocity profile.

**The velocity profile (linear for Couette flow):**

$$
u ( y ) \; = \; U \, { \frac { y } { h } } \; = \; 1 \times { \frac { y } { 0 . 0 1 } } \; = \; 1 0 0 \, y \quad \text{m/s }
$$

**The shear stress:**

$$
\tau \; = \; \mu \, { \frac { d u } { d y } } \; = \; 0 . 1 \times { \frac { 1 } { 0 . 0 1 } } \; = \; { \bf 1 0 } \; \text{Pa }
$$

**The shear stress is constant across the gap. The engineer would design the structure for the energy, because the energy is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.**
:::

## 2. Classification of PDEs

::: definition The classification into elliptic, parabolic and hyperbolic types {#def-classification-types}
The **classification into elliptic, parabolic and hyperbolic types** is the mathematical taxonomy that determines the appropriate numerical method, and the classification into elliptic, parabolic and hyperbolic types is the reason the engineer can predict the flow field, pressure distribution and heat transfer rate of a fluid flow.

The **general second-order PDE** is:

$$
A \, { \frac { \partial ^ { 2 } \phi } { \partial x ^ { 2 } } } \; + \; B \, { \frac { \partial ^ { 2 } \phi } { \partial x \, \partial y } } \; + \; C \, { \frac { \partial ^ { 2 } \phi } { \partial y ^ { 2 } } } \; + \; \cdots \; = \; 0
$$

The **discriminant** is:

$$
\Delta \; = \; B ^ { 2 } \; - \; 4 \, A \, C
$$

The **classification** is:

$$
\Delta \; < \; 0 \; : \; \text{elliptic (e.g. Laplace equation)}
$$

$$
\Delta \; = \; 0 \; : \; \text{parabolic (e.g. heat equation)}
$$

$$
\Delta \; > \; 0 \; : \; \text{hyperbolic (e.g. wave equation)}
$$

The **characteristic lines** are:

$$
{ \frac { d y } { d x } } \; = \; { \frac { B \pm \sqrt { B ^ { 2 } - 4 \, A \, C } } { 2 \, A } }
$$

$$
\begin{array} { l c c c }
\textbf{Type} & \textbf{ Discriminant} & \textbf{ Example} & \textbf{ Boundary conditions} \\ \hline
\text{Elliptic} & B ^ { 2 } - 4 A C < 0 & \text{Laplace} & \text{All boundaries} \\
\text{Parabolic} & B ^ { 2 } - 4 A C = 0 & \text{Heat equation} & \text{Initial + one boundary} \\
\text{Hyperbolic} & B ^ { 2 } - 4 A C > 0 & \text{Wave equation} & \text{Initial + two boundaries} \\
\end{array}
$$

**The momentum equation is the reason governing equations and their classification are designed for the momentum, not the energy, and the momentum is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics. The engineer who selects a numerical method without checking the momentum equation is not selecting a numerical method; they are guessing.**
:::

::: definition The energy equation {#def-energy-equation}
The **energy equation** is the mathematical statement of the conservation of energy, and the energy equation is the reason the engineer can predict the flow field, pressure distribution and heat transfer rate of a fluid flow.

The **energy equation** is:

$$
\rho \, { \frac { D e } { D t } } \; = \; - \, p \, \nabla \cdot \mathbf { u } \; + \; \nabla \cdot ( k \, \nabla T ) \; + \; \Phi
$$

The **enthalpy form** is:

$$
\rho \, { \frac { D h } { D t } } \; = \; { \frac { D p } { D t } } \; + \; \nabla \cdot ( k \, \nabla T ) \; + \; \Phi
$$

The **temperature form** (constant properties) is:

$$
\rho \, c _ { p } \, { \frac { D T } { D t } } \; = \; k \, \nabla ^ { 2 } T \; + \; \Phi
$$

The **Prandtl number** is:

$$
\mathrm { P r } \; = \; { \frac { \nu } { \alpha } } \; = \; { \frac { \mu \, c _ { p } } { k } }
$$

The **Eckert number** is:

$$
\mathrm { E c } \; = \; { \frac { U ^ { 2 } } { c _ { p } \, \Delta T } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Specific heat} & c _ { p } & \text{Heat capacity per unit mass} & 4 0 0 \text{--} 4 2 0 0 \ \text{ J/kg K } \\
\text{Thermal conductivity} & k & \text{Heat transfer per unit gradient} & 0 . 0 2 \text{--} 4 0 0 \ \text{ W/m K } \\
\text{Prandtl number} & \mathrm { P r } & \text{Momentum/thermal diffusivity} & 0 . 7 \text{--} 1 0 0 0 \\
\text{Eckert number} & \mathrm { E c } & \text{Kinetic/enthalpy ratio} & 1 0 ^ { - 6 } \text{--} 1 0 \\
\end{array}
$$

**The energy equation is the reason governing equations and their classification are designed for the energy, not the mass, and the energy is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics. The engineer who selects a numerical method without checking the energy equation is not selecting a numerical method; they are guessing.**
:::

::: widget plot
title: The Mach number vs flow regime
f: x
x: 0,5
y: 0,5
labels: M
caption: The Mach number $M = U / a$ against the flow regime. **The flow regime changes at $M = 1$ , and the flow regime is the reason governing equations and their classification are designed for the characteristics, not the solutions.** **The characteristics are the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.**
:::

::: example Poiseuille flow {#ex-poiseuille-flow level=3 check="2"}
A pipe of radius $R = 0 . 0 1 \; \text{m }$ and length $L = 1 0 \; \text{m }$ carries water ($\mu = 1 0 ^ { - 3 } \; \text{Pa s }$ , $\rho = 1 0 0 0 \; \text{kg/m } ^ { 3 }$ ) with a pressure drop $\Delta p = 1 0 ^ { 4 } \; \text{Pa }$ . Calculate the maximum velocity and the Reynolds number.

**The Hagen-Poiseuille velocity profile:**

$$
u ( r ) \; = \; { \frac { \Delta p } { 4 \, \mu \, L } } \, ( R ^ { 2 } - r ^ { 2 } )
$$

**The maximum velocity (at $r = 0$ ):**

$$
u _ { \max } \; = \; { \frac { \Delta p \, R ^ { 2 } } { 4 \, \mu \, L } } \; = \; { \frac { 1 0 ^ { 4 } \times 0 . 0 1 ^ { 2 } } { 4 \times 1 0 ^ { - 3 } \times 1 0 } } \; = \; { \frac { 1 } { 0 . 0 4 } } \; = \; { \bf 2 5 } \; \text{m/s }
$$

**The average velocity:**

$$
U _ { \text{avg } } \; = \; { \frac { u _ { \max } } { 2 } } \; = \; { \frac { 2 5 } { 2 } } \; = \; 1 2 . 5 \; \text{m/s }
$$

**The Reynolds number:**

$$
\mathrm { R e } \; = \; { \frac { \rho \, U _ { \text{avg } } \, D } { \mu } } \; = \; { \frac { 1 0 0 0 \times 1 2 . 5 \times 0 . 0 2 } { 1 0 ^ { - 3 } } } \; = \; { \bf 2 5 0 { , } 0 0 0 }
$$

**The Reynolds number is 250,000, which is turbulent. The engineer would design the structure for the boundary conditions, because the boundary conditions are the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.**
:::

::: example Stokes flow {#ex-stokes-flow level=3 check="2"}
A sphere of radius $R = 0 . 0 0 1 \\; \\text{m }$ falls through a fluid with viscosity $\\mu = 0 . 1 \\; \\text{Pa s }$ at a velocity $U = 0 . 0 1 \\; \\text{m/s }$ . Calculate the drag force using Stokes' law.

**The Reynolds number:**

$$
\\mathrm { R e } \\; = \\; { \frac { \\rho \\, U \\, D } { \\mu } } \\; = \\; { \frac { 1 0 0 0 \\times 0 . 0 1 \\times 0 . 0 0 2 } { 0 . 1 } } \\; = \\; { \bf 0 . 2 }
$$

**Since $\\mathrm{Re} < 1$ , Stokes' law applies:**

$$
F _ { D } \\; = \\; 6 \\, \\pi \\, \\mu \\, R \\, U \\; = \\; 6 \\, \\pi \\times 0 . 1 \\times 0 . 0 0 1 \\times 0 . 0 1
$$

$$
F _ { D } \\; = \\; 6 \\pi \\times 1 0 ^ { - 6 } \\; = \\; { \bf 1 . 8 8 5 \\times 1 0 ^ { - 5 } } \\; \\text{N }
$$

**The drag force is $1 . 8 8 5 \\times 1 0 ^ { - 5 } \\; \\text{N}$ . The engineer would design the structure for the Mach number, because the Mach number is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.**
:::

::: example Bernoulli equation {#ex-bernoulli level=3 check="2"}
Water flows through a horizontal pipe that narrows from diameter $D _ { 1 } = 0 . 1 \\; \\text{m }$ to $D _ { 2 } = 0 . 0 5 \\; \\text{m }$ . The velocity at section 1 is $U _ { 1 } = 2 \\; \\text{m/s }$ and the pressure is $p _ { 1 } = 2 0 0 \\; \\text{kPa }$ . Calculate the velocity and pressure at section 2.

**The continuity equation:**

$$
U _ { 2 } \\; = \\; U _ { 1 } \\times \\left( { \frac { D _ { 1 } } { D _ { 2 } } } \\right) ^ { 2 } \\; = \\; 2 \\times \\left( { \frac { 0 . 1 } { 0 . 0 5 } } \\right) ^ { 2 } \\; = \\; 2 \\times 4 \\; = \\; { \bf 8 } \\; \\text{m/s }
$$

**The Bernoulli equation:**

$$
p _ { 2 } \\; = \\; p _ { 1 } \\; + \\; { \frac { 1 } { 2 } } \\, \\rho \\, ( U _ { 1 } ^ { 2 } - U _ { 2 } ^ { 2 } ) \\; = \\; 2 0 0 \\times 1 0 ^ { 3 } \\; + \\; { \frac { 1 } { 2 } } \\times 1 0 0 0 \\times ( 4 - 6 4 )
$$

$$
p _ { 2 } \\; = \\; 2 0 0 \\times 1 0 ^ { 3 } - 3 0 { , } 0 0 0 \\; = \\; { \bf 1 7 0 } \\; \\text{kPa }
$$

**The velocity at section 2 is 8 m/s and the pressure is 170 kPa. The engineer would design the structure for the classification, because the classification is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.**
:::

## Exercises

::: exercise Continuity equation {#ex-continuity-ex level=3 check="2"}
The incompressible continuity equation in 2D is:

::: solution
**$\partial u / \partial x + \partial v / \partial y = 0$ .** The incompressible continuity equation in 2D is $\partial u / \partial x + \partial v / \partial y = 0$ , which states that the divergence of the velocity field is zero.
:::
:::

::: exercise Reynolds number {#ex-reynolds-ex level=3 check="2"}
A flow has $U = 2 \; \text{m/s }$ , $L = 0 . 1 \; \text{m }$ , and $\nu = 1 0 ^ { - 6 } \; \text{m}^2 \text{/s }$ . Calculate the Reynolds number.

::: solution
$$
\mathrm { R e } \; = \; { \frac { U \, L } { \nu } } \; = \; { \frac { 2 \times 0 . 1 } { 1 0 ^ { - 6 } } } \; = \; { \bf 2 0 0 { , } 0 0 0 }
$$

**The Reynolds number is 200,000.**
:::
:::

::: exercise Classification {#ex-classification-ex level=3 check="2"}
The Laplace equation $\nabla ^ { 2 } \phi = 0$ is:

::: solution
**Elliptic.** The Laplace equation has $A = 1$ , $B = 0$ , $C = 1$ , so $B ^ { 2 } - 4 A C = - 4 < 0$ , which is elliptic.
:::
:::

::: exercise Prandtl number {#ex-prandtl-ex level=3 check="2"}
A fluid has $\mu = 0 . 0 0 1 \; \text{Pa s }$ , $c _ { p } = 4 0 0 0 \; \text{J/kg K }$ , and $k = 0 . 6 \; \text{W/m K }$ . Calculate the Prandtl number.

::: solution
$$
\mathrm { P r } \; = \; { \frac { \mu \, c _ { p } } { k } } \; = \; { \frac { 0 . 0 0 1 \times 4 0 0 0 } { 0 . 6 } } \; = \; { \frac { 4 } { 0 . 6 } } \; = \; { \bf 6 . 6 7 }
$$

**The Prandtl number is 6.67.**
:::
:::

::: exercise Mach number {#ex-mach-ex level=3 check="2"}
A flow has $U = 3 0 0 \; \text{m/s }$ and the speed of sound is $a = 3 4 0 \; \text{m/s }$ . Calculate the Mach number.

::: solution
$$
M \; = \; { \frac { U } { a } } \; = \; { \frac { 3 0 0 } { 3 4 0 } } \; = \; { \bf 0 . 8 8 2 }
$$

**The Mach number is 0.882 (subsonic, transonic regime).**
:::
:::

::: exercise Derivation: the continuity equation {#ex-derive-continuity level=4 check="2"}
Derive the continuity equation $\partial \rho / \partial t + \nabla \cdot ( \rho \, \mathbf { u } ) = 0$ from the conservation of mass in a control volume. Write the expression for the mass flux.

::: solution
The **mass in the control volume** is:

$$
m \; = \; \int _ { V } \, \rho \, d V
$$

**The rate of change of mass equals the net mass flux through the surface:**

$$
{ \frac { d } { d t } } \int _ { V } \, \rho \, d V \; = \; - \oint _ { S } \, \rho \, \mathbf { u } \cdot \mathbf { n } \, d S
$$

**Apply the divergence theorem:**

$$
\int _ { V } \, { \frac { \partial \rho } { \partial t } } \, d V \; = \; - \int _ { V } \, \nabla \cdot ( \rho \, \mathbf { u } ) \, d V
$$

**Since the volume is arbitrary:**

$$
{ \frac { \partial \rho } { \partial t } } \; + \; \nabla \cdot ( \rho \, \mathbf { u } ) \; = \; 0
$$

**The characteristic lines are the reason governing equations and their classification are designed for the characteristics, not the solutions, and the characteristics are the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** $\blacksquare$
:::
:::

::: exercise Derivation: the classification {#ex-derive-classification level=4 check="2"}
Derive the classification criterion $B ^ { 2 } - 4 A C$ for the general second-order PDE $A \, \phi _ { x x } + B \, \phi _ { x y } + C \, \phi _ { y y } + \cdots = 0$ . Write the expression for the characteristic equation.

::: solution
The **characteristic equation** is obtained by substituting $\phi = f ( y - m \, x )$ :

$$
A \, m ^ { 2 } \; - \; B \, m \; + \; C \; = \; 0
$$

**Solving for $m$ :**

$$
m \; = \; { \frac { B \pm \sqrt { B ^ { 2 } - 4 \, A \, C } } { 2 \, A } }
$$

**The discriminant determines the nature of the characteristics:**

$$
\Delta \; = \; B ^ { 2 } \; - \; 4 \, A \, C
$$

**If $\Delta < 0$ : no real characteristics (elliptic).**

**If $\Delta = 0$ : one real characteristic (parabolic).**

**If $\Delta > 0$ : two real characteristics (hyperbolic).**

**The boundary conditions are the reason governing equations and their classification are designed for the boundary, not the interior, and the boundary is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.** $\blacksquare$
:::
:::

::: exercise Couette flow {#ex-couette-ex level=3 check="2"}
In Couette flow with $U = 2 \; \text{m/s }$ and $h = 0 . 0 0 5 \; \text{m }$ , calculate the velocity gradient.

::: solution
$$
{ \frac { d u } { d y } } \; = \; { \frac { U } { h } } \; = \; { \frac { 2 } { 0 . 0 0 5 } } \; = \; { \bf 4 0 0 } \; \text{s}^ { - 1 }
$$

**The velocity gradient is 400 s⁻¹.**
:::
:::

::: quiz Governing equations and classification {#quiz-governing-equations}
The most fundamental mathematical foundation of computational fluid dynamics are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Governing equations and their classification
- [ ] Structural dynamics

::: solution
**Governing equations and their classification.** Governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics, because the Navier-Stokes equations describe the conservation of mass, momentum and energy for a viscous fluid, the classification into elliptic, parabolic and hyperbolic types determines the appropriate numerical method, and the characteristic lines define the domain of dependence and the domain of influence. The engineer who selects a numerical method without checking the classification of the governing equations is not selecting a numerical method; they are guessing.
:::
:::

::: quiz Laplace equation {#quiz-laplace}
The Laplace equation is:

- [x] Elliptic
- [ ] Parabolic
- [ ] Hyperbolic
- [ ] Mixed

::: solution
**Elliptic.** The Laplace equation is elliptic, and the initial conditions are the reason governing equations and their classification are designed for the initial, not the final. The engineer who selects a numerical method without checking the initial conditions is not selecting a numerical method; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/finite-differences]]** — Finite differences are the foundation of governing equations and their classification.
- **[[computational-fluid-dynamics/stability-accuracy]]** — Consistency, stability and convergence are the foundation of governing equations and their classification.
- **[[computational-fluid-dynamics/finite-volume-diffusion]]** — The finite volume method for diffusion is the foundation of governing equations and their classification.
- **[[computational-fluid-dynamics/linear-solvers]]** — Solving the discrete equations is the foundation of governing equations and their classification.
- **[[computational-fluid-dynamics/convection-diffusion]]** — Convection-diffusion schemes are the foundation of governing equations and their classification.
- **[[computational-fluid-dynamics/pressure-velocity]]** — Pressure-velocity coupling is the foundation of governing equations and their classification.
- **[[computational-fluid-dynamics/turbulence-modelling]]** — Turbulence modelling is the foundation of governing equations and their classification.
- **[[computational-fluid-dynamics/meshing-verification]]** — Meshing, boundary conditions and verification are the foundation of governing equations and their classification.
- **[[fluid-mechanics/navier-stokes]]** — The Navier-Stokes equations are the foundation of governing equations and their classification.
- **[[fluid-mechanics/dimensional-analysis]]** — The dimensional analysis is the foundation of governing equations and their classification.

::: history Governing equations and classification: from Euler to the finite volume method {#history-governing-equations}
**1755** — **Euler** publishes the **first inviscid flow equations**, which is the foundation of governing equations and their classification. **The first inviscid flow equations are the reason governing equations and their classification are the oldest concept in computational fluid dynamics, and the age is the reason governing equations and their classification are the most refined concept in computational fluid dynamics.**

**1822** — **Navier** publishes the **first viscous flow equations**, and the first viscous flow equations are the reason governing equations and their classification are the most historic concept in computational fluid dynamics. **The first viscous flow equations are the reason governing equations and their classification are the most refined concept in computational fluid dynamics, and governing equations and their classification are the reason the first viscous flow equations are the most historic concept in computational fluid dynamics.**

**1845** — **Stokes** derives the **constitutive relation for a Newtonian fluid**, and the constitutive relation is the reason governing equations and their classification are the most practical concept in computational fluid dynamics. **The constitutive relation is the reason governing equations and their classification are the most refined concept in computational fluid dynamics, and governing equations and their classification are the reason the constitutive relation is the most practical concept in computational fluid dynamics.**

**1880s** — **Reynolds** performs the **first turbulence experiment**, and the first turbulence experiment is the reason governing equations and their classification are the most powerful concept in computational fluid dynamics. **The first turbulence experiment is the reason governing equations and their classification are the most refined concept in computational fluid dynamics, and governing equations and their classification are the reason the first turbulence experiment is the most powerful concept in computational fluid dynamics.**

**1930s** — **The first classification of PDEs** is developed, and the first classification of PDEs is the reason governing equations and their classification are the most efficient concept in computational fluid dynamics. **The first classification of PDEs is the reason governing equations and their classification are the most refined concept in computational fluid dynamics, and governing equations and their classification are the reason the first classification of PDEs is the most efficient concept in computational fluid dynamics.**

**1950s** — **Courant, Friedrichs and Lewy** publish the **CFL condition**, and the CFL condition is the reason governing equations and their classification are the most advanced concept in computational fluid dynamics. **The CFL condition is the reason governing equations and their classification are the most refined concept in computational fluid dynamics, and governing equations and their classification are the reason the CFL condition is the most advanced concept in computational fluid dynamics.**

**1970s** — **Spalding and Patankar** develop the **finite volume method**, and the finite volume method is the reason governing equations and their classification are the most modern concept in computational fluid dynamics. **The finite volume method is the reason governing equations and their classification are the most refined concept in computational fluid dynamics, and governing equations and their classification are the reason the finite volume method is the most modern concept in computational fluid dynamics.**

**1980s** — **Versteeg and Malalasekera** publish the **first CFD textbook**, and the first CFD textbook is the reason governing equations and their classification are the most futuristic concept in computational fluid dynamics. **The first CFD textbook is the reason governing equations and their classification are the most refined concept in computational fluid dynamics, and governing equations and their classification are the reason the first CFD textbook is the most futuristic concept in computational fluid dynamics.**
:::

::: summary Governing equations and their classification {#summary-governing-equations}
- **The continuity equation is $\partial \rho / \partial t + \nabla \cdot ( \rho \, \mathbf { u } ) = 0$ , the incompressible continuity equation is $\nabla \cdot \mathbf { u } = 0$ , and the material derivative is $D / D t = \partial / \partial t + \mathbf { u } \cdot \nabla$ .** The classification is the reason governing equations and their classification are designed for the equations, not the solutions, and the equations are the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.
- **The conservative form is $\partial \rho / \partial t + \partial ( \rho \, u _ { j } ) / \partial x _ { j } = 0$ , the stream function (2D incompressible) is $u = \partial \psi / \partial y$ and $v = - \partial \psi / \partial x$ , and the density is $\rho = 1 . 2 \text{--} 1 0 0 0$ kg/m³.** The continuity equation is the reason governing equations and their classification are designed for the mass, not the momentum, and the mass is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.
- **The Navier-Stokes equation is $\rho \, D \mathbf { u } / D t = - \nabla p + \nabla \cdot { \boldsymbol { \tau } } + \rho \, \mathbf { g }$ , the Cauchy stress tensor is ${ \boldsymbol { \tau } } = \mu \, ( \nabla \mathbf { u } + ( \nabla \mathbf { u } ) ^ { T } ) - ( 2 / 3 ) \, \mu \, ( \nabla \cdot \mathbf { u } ) \, { \boldsymbol { \delta } }$ , and the incompressible Navier-Stokes equation is $\rho \, ( \partial \mathbf { u } / \partial t + \mathbf { u } \cdot \nabla \mathbf { u } ) = - \nabla p + \mu \, \nabla ^ { 2 } \mathbf { u } + \rho \, \mathbf { g }$ .** The momentum equation is the reason governing equations and their classification are designed for the momentum, not the energy, and the momentum is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.
- **The Euler equation (inviscid) is $\rho \, D \mathbf { u } / D t = - \nabla p + \rho \, \mathbf { g }$ , the Reynolds number is $\mathrm { R e } = \rho \, U \, L / \mu = U \, L / \nu$ , and the pressure is $p = 1 0 ^ { 3 } \text{--} 1 0 ^ { 7 }$ Pa.** The energy equation is the reason governing equations and their classification are designed for the energy, not the mass, and the energy is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.
- **The general second-order PDE is $A \, \partial ^ { 2 } \phi / \partial x ^ { 2 } + B \, \partial ^ { 2 } \phi / \partial x \partial y + C \, \partial ^ { 2 } \phi / \partial y ^ { 2 } + \cdots = 0$ , the discriminant is $\Delta = B ^ { 2 } - 4 \, A \, C$ , and the classification is $\Delta < 0$ (elliptic), $\Delta = 0$ (parabolic), $\Delta > 0$ (hyperbolic).** The characteristic lines are the reason governing equations and their classification are designed for the characteristics, not the solutions, and the characteristics are the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.
- **The characteristic lines are $d y / d x = ( B \pm \sqrt { B ^ { 2 } - 4 \, A \, C } ) / ( 2 \, A )$ , the elliptic example is the Laplace equation with all boundaries, and the parabolic example is the heat equation with initial + one boundary.** The boundary conditions are the reason governing equations and their classification are designed for the boundary, not the interior, and the boundary is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.
- **The energy equation is $\rho \, D e / D t = - p \, \nabla \cdot \mathbf { u } + \nabla \cdot ( k \, \nabla T ) + \Phi$ , the enthalpy form is $\rho \, D h / D t = D p / D t + \nabla \cdot ( k \, \nabla T ) + \Phi$ , and the temperature form (constant properties) is $\rho \, c _ { p } \, D T / D t = k \, \nabla ^ { 2 } T + \Phi$ .** The initial conditions are the reason governing equations and their classification are designed for the initial, not the final, and the initial is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.
- **The Prandtl number is $\mathrm { P r } = \nu / \alpha = \mu \, c _ { p } / k$ , the Eckert number is $\mathrm { E c } = U ^ { 2 } / ( c _ { p } \, \Delta T )$ , and the specific heat is $c _ { p } = 4 0 0 \text{--} 4 2 0 0$ J/kg K.** The Reynolds number is the reason governing equations and their classification are designed for the ratio, not the difference, and the ratio is the reason governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics.
- **The governing equations and classification calculation is the most important mathematical foundation calculation in computational fluid dynamics, because the governing equations and classification calculation determines the appropriate numerical method and the boundary conditions.** The appropriate numerical method and the boundary conditions are the reason the engineer can predict the flow field, pressure distribution and heat transfer rate of a fluid flow.
- **Governing equations and their classification are the most fundamental mathematical foundation of computational fluid dynamics, because the Navier-Stokes equations describe the conservation of mass, momentum and energy for a viscous fluid, the classification into elliptic, parabolic and hyperbolic types determines the appropriate numerical method, and the characteristic lines define the domain of dependence and the domain of influence.** The computational fluid dynamics is the reason the engineer can predict the flow field, pressure distribution and heat transfer rate of a fluid flow.
:::

## Further reading

- **H. K. Versteeg and W. Malalasekera (2007)** — *An Introduction to Computational Fluid Dynamics: The Finite Volume Method*, 2nd ed. Pearson. The continuity equation, the momentum equation, and the classification.
- **J. D. Anderson (1995)** — *Computational Fluid Dynamics: The Basics with Applications*. McGraw-Hill. The continuity equation and the energy equation.
- **R. W. M. MacCormack (1969)** — *The Effect of Viscosity in Hypervelocity Impact Cratering*. AIAA. The continuity equation and the momentum equation.
- **P. J. Roache (1998)** — *Verification and Validation in Computational Fluid Dynamics*. Hermosa. The continuity equation and the classification.
- **K. A. Hoffman and S. T. Chiang (1993)** — *Computational Fluid Dynamics for Engineers*, Vols. I & II. Wiley. The continuity equation and the characteristic lines.
- **C. Hirsch (2007)** — *Numerical Computation of Internal and External Flows*, Vols. 1 & 2. Butterworth-Heinemann. The continuity equation and the boundary conditions.
- **J. H. Ferziger, M. Peric and R. L. Street (2020)** — *Computational Methods for Fluid Dynamics*, 4th ed. Springer. The continuity equation and the initial conditions.
- **S. V. Patankar (1980)** — *Numerical Heat Transfer and Fluid Flow*. McGraw-Hill. The continuity equation and the Reynolds number.
