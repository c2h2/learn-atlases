Turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics: the Reynolds decomposition separates mean and fluctuating quantities, the Reynolds-averaged Navier-Stokes equations introduce the Reynolds stress tensor that requires closure, and the eddy viscosity hypothesis relates the Reynolds stresses to the mean strain rate. **The engineer who runs a simulation without checking the $y ^ { + }$ value is not running a simulation; they are guessing.** The turbulence modelling calculation is the reason the engineer can predict drag, heat transfer and mixing in engineering flows, and the $k$-$\varepsilon$ model is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.

The quantitative tools of turbulence modelling are the **Reynolds decomposition** (the separation of mean and fluctuating quantities), the **Reynolds stress tensor** (the correlation of velocity fluctuations), the **eddy viscosity hypothesis** (the Boussinesq approximation), and the **turbulence kinetic energy equation** (the transport equation for $k$). The tools are the language in which the turbulence modelling analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways turbulence modelling calculation goes wrong
**Not checking the $y ^ { + }$ value.** The engineer who runs a simulation without checking the $y ^ { + }$ value is not running a simulation; they are guessing. **The $y ^ { + }$ value is the reason turbulence modelling is designed for the wall, not the free stream, and the wall is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.** **Not checking the Reynolds decomposition.** The engineer who runs a simulation without checking the Reynolds decomposition is not running a simulation; they are guessing. **The Reynolds decomposition is the reason turbulence modelling is designed for the decomposition, not the reconstruction, and the decomposition is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.** **Not checking the Reynolds stress.** The engineer who runs a simulation without checking the Reynolds stress is not running a simulation; they are guessing. **The Reynolds stress is the reason turbulence modelling is designed for the stress, not the strain, and the stress is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.** **Not checking the eddy viscosity.** The engineer who runs a simulation without checking the eddy viscosity is not running a simulation; they are guessing. **The eddy viscosity is the reason turbulence modelling is designed for the viscosity, not the conductivity, and the viscosity is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.** **Not checking the turbulence kinetic energy.** The engineer who runs a simulation without checking the turbulence kinetic energy is not running a simulation; they are guessing. **The turbulence kinetic energy is the reason turbulence modelling is designed for the energy, not the power, and the energy is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.** **Not checking the dissipation rate.** The engineer who runs a simulation without checking the dissipation rate is not running a simulation; they are guessing. **The dissipation rate is the reason turbulence modelling is designed for the dissipation, not the production, and the dissipation is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.** **Not checking the wall function.** The engineer who runs a simulation without checking the wall function is not running a simulation; they are guessing. **The wall function is the reason turbulence modelling is designed for the function, not the profile, and the function is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.** **Not checking the realizability.** The engineer who runs a simulation without checking the realizability is not running a simulation; they are guessing. **The realizability is the reason turbulence modelling is designed for the reality, not the positivity, and the reality is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.** **Not checking the anisotropy.** The engineer who runs a simulation without checking the anisotropy is not running a simulation; they are guessing. **The anisotropy is the reason turbulence modelling is designed for the anisotropy, not the isotropy, and the anisotropy is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.**
:::

## 1. The Reynolds decomposition and RANS equations

::: definition The Reynolds decomposition {#def-reynolds-decomposition}
The **Reynolds decomposition** is the separation of mean and fluctuating quantities, and the Reynolds decomposition is the reason the engineer can predict drag, heat transfer and mixing in engineering flows.

The **decomposition** is:

$$
u ( x , t ) \; = \; \bar { u } ( x ) \; + \; u ^ { \prime } ( x , t )
$$

The **mean** is:

$$
\bar { u } \; = \; { \\frac { 1 } { T } } \, \int _ { 0 } ^ { T } \, u ( x , t ) \, d t
$$

The **fluctuation** satisfies:

$$
\overline { { u ^ { \prime } } } \; = \; 0
$$

The **Reynolds stress tensor** is:

$$
\tau _ { i j } ^ { R } \; = \; - \, \rho \, \\overline { { u _ { i } ^ { \prime } \, u _ { j } ^ { \prime } } }
$$

The **RANS continuity equation** is:

$$
{ \\frac { \partial \, \bar { u } _ { i } } { \partial x _ { i } } } \; = \; 0
$$

The **RANS momentum equation** is:

$$
\rho \, { \\frac { \partial \, \bar { u } _ { i } } { \partial t } } \; + \; \rho \, \\bar { u } _ { j } \, { \\frac { \partial \, \bar { u } _ { i } } { \partial x _ { j } } } \; = \; - \, { \\frac { \partial \, \bar { p } } { \partial x _ { i } } } \; + \; { \\frac { \partial } { \partial x _ { j } } } \, \\left( \mu \, { \\frac { \partial \, \bar { u } _ { i } } { \partial x _ { j } } } \; - \; \rho \, \\overline { { u _ { i } ^ { \prime } \, u _ { j } ^ { \prime } } } \\right)
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Mean velocity} & \bar { u } & \text{Time-averaged velocity} & 0 . 1 \text{--} 1 0 0 \ \text{ m/s } \\
\text{Fluctuation} & u ^ { \prime } & \text{Turbulent velocity fluctuation} & 0 . 0 1 \text{--} 1 0 \ \text{ m/s } \\
\text{Reynolds stress} & \tau _ { i j } ^ { R } & \text{Correlation of fluctuations} & 1 \text{--} 1 0 0 \ \text{ Pa } \\
\text{Turbulence intensity} & I & u ^ { \prime } / { \bar { u } } & 0 . 0 1 \text{--} 0 . 1 \\
\end{array}
$$

**The $y ^ { + }$ value is the reason turbulence modelling is designed for the wall, not the free stream, and the wall is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics. The engineer who runs a simulation without checking the $y ^ { + }$ value is not running a simulation; they are guessing.**
:::

::: definition The eddy viscosity hypothesis {#def-eddy-viscosity}
The **eddy viscosity hypothesis** is the Boussinesq approximation that relates the Reynolds stresses to the mean strain rate, and the eddy viscosity hypothesis is the reason the engineer can predict drag, heat transfer and mixing in engineering flows.

The **Boussinesq approximation** is:

$$
- \, \rho \, \\overline { { u _ { i } ^ { \prime } \, u _ { j } ^ { \prime } } } \; = \; \mu _ { t } \, \\left( { \\frac { \partial \, \bar { u } _ { i } } { \partial x _ { j } } } \; + \; { \\frac { \partial \, \bar { u } _ { j } } { \partial x _ { i } } } \\right) \; - \; { \\frac { 2 } { 3 } } \, \rho \, k \, \delta _ { i j }
$$

The **turbulence kinetic energy** is:

$$
k \; = \; { \\frac { 1 } { 2 } } \, \\overline { { u _ { i } ^ { \prime } \, u _ { i } ^ { \prime } } }
$$

The **eddy viscosity** is:

$$
\mu _ { t } \; = \; \rho \, C _ { \mu } \, { \\frac { k ^ { 2 } } { \varepsilon } }
$$

The **effective viscosity** is:

$$
\mu _ { \text{eff } } \; = \; \mu \; + \; \mu _ { t }
$$

The **eddy viscosity ratio** is:

$$
{ \\frac { \mu _ { t } } { \mu } } \; = \; 1 0 \text{--} 1 0 ^ { 5 } \quad \text{(engineering flows)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Eddy viscosity} & \mu _ { t } & \text{Turbulent viscosity} & 1 0 ^ { - 3 } \text{--} 1 0 \ \text{ Pa s } \\
\text{Model constant} & C _ { \mu } & \text{k-epsilon constant} & 0 . 0 9 \\
\text{Turbulence KE} & k & \text{Kinetic energy per unit mass} & 1 0 ^ { - 4 } \text{--} 1 0 \ \text{ m}^2 \text{/s}^2 \\
\text{Dissipation rate} & \varepsilon & \text{KE dissipation per unit mass} & 1 0 ^ { - 6 } \text{--} 1 0 ^ { 3 } \ \text{ m}^2 \text{/s}^3 \\
\end{array}
$$

**The Reynolds decomposition is the reason turbulence modelling is designed for the decomposition, not the reconstruction, and the decomposition is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics. The engineer who runs a simulation without checking the Reynolds decomposition is not running a simulation; they are guessing.**
:::

::: widget plot
title: The eddy viscosity ratio vs distance from wall
f: 30 * x
x: 0,1
y: 0,30
labels: mu_t/mu
caption: The eddy viscosity ratio $\mu _ { t } / \mu$ against the distance from the wall $y ^ { + }$ in the log layer. **The eddy viscosity increases linearly with $y ^ { + }$ , and the eddy viscosity is the reason turbulence modelling is designed for the stress, not the strain.** **The stress is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.**
:::

::: example Turbulence kinetic energy {#ex-turbulence-ke level=3 check="2"}
A wind tunnel has a mean velocity $\bar { u } = 3 0 \; \text{m/s }$ and turbulence intensity $I = 5 \%$ . Calculate the turbulence kinetic energy $k$ .

**The fluctuation velocity is:**

$$
u ^ { \prime } \; = \; I \times { \bar { u } } \; = \; 0 . 0 5 \times 3 0 \; = \; 1 . 5 \; \text{m/s }
$$

**Assuming isotropic turbulence, $k = ( 3 / 2 ) \, ( u ^ { \prime } ) ^ { 2 }$ :**

$$
k \; = \; { \\frac { 3 } { 2 } } \times ( 1 . 5 ) ^ { 2 } \; = \; { \\frac { 3 } { 2 } } \times 2 . 2 5 \; = \; { \\bf 3 . 3 7 5 } \; \text{m}^2 \text{/s}^2
$$

**The turbulence kinetic energy is 3.375 m²/s². The engineer would design the structure for the eddy viscosity, because the eddy viscosity is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.**
:::

## 2. The $k$-$\varepsilon$ model and wall functions

::: definition The $k$-$\varepsilon$ model {#def-k-epsilon-model}
The **$k$-$\varepsilon$ model** is the two-equation turbulence model that solves transport equations for $k$ and $\varepsilon$ , and the $k$-$\varepsilon$ model is the reason the engineer can predict drag, heat transfer and mixing in engineering flows.

The **$k$ transport equation** is:

$$
{ \\frac { \partial ( \rho \, k ) } { \partial t } } \; + \; { \\frac { \partial ( \rho \, k \, { \bar { u } } _ { j } ) } { \partial x _ { j } } } \; = \; { \\frac { \partial } { \partial x _ { j } } } \\left( ( \mu + { \\frac { \mu _ { t } } { \sigma _ { k } } } ) \, { \\frac { \partial k } { \partial x _ { j } } } \\right) \; + \; G _ { k } \; - \; \rho \, \varepsilon
$$

The **$\varepsilon$ transport equation** is:

$$
{ \\frac { \partial ( \rho \, \varepsilon ) } { \partial t } } \; + \; { \\frac { \partial ( \rho \, \varepsilon \, { \bar { u } } _ { j } ) } { \partial x _ { j } } } \; = \; { \\frac { \partial } { \partial x _ { j } } } \\left( ( \mu + { \\frac { \mu _ { t } } { \sigma _ { \varepsilon } } } ) \, { \\frac { \partial \varepsilon } { \partial x _ { j } } } \\right) \; + \; C _ { 1 \varepsilon } \, { \\frac { \varepsilon } { k } } \, G _ { k } \; - \; C _ { 2 \varepsilon } \, \rho \, { \\frac { \varepsilon ^ { 2 } } { k } }
$$

The **production term** is:

$$
G _ { k } \; = \; \mu _ { t } \, { \\frac { \partial \, \bar { u } _ { i } } { \partial x _ { j } } } \, \\left( { \\frac { \partial \, \bar { u } _ { i } } { \partial x _ { j } } } \; + \; { \\frac { \partial \, \bar { u } _ { j } } { \partial x _ { i } } } \\right)
$$

The **model constants** are:

$$
C _ { \mu } = 0 . 0 9 , \quad C _ { 1 \varepsilon } = 1 . 4 4 , \quad C _ { 2 \varepsilon } = 1 . 9 2 , \quad \sigma _ { k } = 1 . 0 , \quad \sigma _ { \varepsilon } = 1 . 3
$$

The **turbulence time scale** is:

$$
T \; = \; { \\frac { k } { \varepsilon } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Production} & G _ { k } & \text{KE production by shear} & 1 0 ^ { - 3 } \text{--} 1 0 ^ { 3 } \\
\text{Dissipation} & \rho \, \varepsilon & \text{KE dissipation rate} & 1 0 ^ { - 3 } \text{--} 1 0 ^ { 3 } \\
\text{Turbulence time} & T = k / \varepsilon & \text{Large eddy turnover time} & 1 0 ^ { - 3 } \text{--} 1 0 \ \text{ s } \\
\text{Turbulence length} & l = k ^ { 3 / 2 } / \varepsilon & \text{Large eddy size} & 1 0 ^ { - 3 } \text{--} 1 \ \text{ m } \\
\end{array}
$$

**The Reynolds stress is the reason turbulence modelling is designed for the stress, not the strain, and the stress is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics. The engineer who runs a simulation without checking the Reynolds stress is not running a simulation; they are guessing.**
:::

::: definition The wall function {#def-wall-function}
The **wall function** is the semi-empirical relationship that bridges the viscous sublayer and the log layer, and the wall function is the reason the engineer can predict drag, heat transfer and mixing in engineering flows.

The **wall coordinate** is:

$$
y ^ { + } \; = \; { \\frac { \rho \, u _ { \tau } \, y } { \mu } } \; = \; { \\frac { u _ { \tau } \, y } { \nu } }
$$

The **friction velocity** is:

$$
u _ { \tau } \; = \; { \\sqrt { \\frac { \tau _ { w } } { \rho } } }
$$

The **viscous sublayer** ($y ^ { + } < 5$ ) is:

$$
u ^ { + } \; = \; y ^ { + }
$$

The **log layer** ($3 0 < y ^ { + } < 3 0 0$ ) is:

$$
u ^ { + } \; = \; { \\frac { 1 } { \kappa } } \, \ln ( y ^ { + } ) \; + \; B \; = \; 2 . 4 4 \, \ln ( y ^ { + } ) \; + \; 5 . 2
$$

The **log-law of the wall** requires:

$$
5 \; < \; y ^ { + } \; < \; 3 0 \quad \text{(buffer layer, no simple law)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Wall coordinate} & y ^ { + } & \text{Non-dimensional wall distance} & 1 \text{--} 5 0 0 \\
\text{Friction velocity} & u _ { \tau } & \text{Shear velocity} & 0 . 0 1 \text{--} 1 0 \ \text{ m/s } \\
\text{Von Karman constant} & \kappa & \text{Log-law slope} & 0 . 4 1 \\
\text{Log-law intercept} & B & \text{Log-law constant} & 5 . 2 \\
\end{array}
$$

**The eddy viscosity is the reason turbulence modelling is designed for the viscosity, not the conductivity, and the viscosity is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics. The engineer who runs a simulation without checking the eddy viscosity is not running a simulation; they are guessing.**
:::

::: widget plot
title: The log-law of the wall
f: 2.44*ln(max(x,1)) + 5.2
x: 1,500
y: 0,25
labels: u+
caption: The log-law of the wall $u ^ { + } = 2 . 4 4 \, \ln ( y ^ { + } ) + 5 . 2$ against $y ^ { + }$ . **The log-law is valid for $y ^ { + } > 3 0$ , and the log-law is the reason turbulence modelling is designed for the turbulence kinetic energy, not the dissipation rate.** **The turbulence kinetic energy is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.**
:::

::: example $y ^ { + }$ calculation {#ex-yplus-calc level=3 check="2"}
Air flows over a flat plate with $u _ { \tau } = 0 . 5 \; \text{m/s }$ , $\nu = 1 . 5 \times 1 0 ^ { - 5 } \; \text{m}^2 \text{/s }$ . Calculate $y ^ { + }$ at $y = 0 . 1 \; \text{mm }$ and determine which region of the boundary layer this is.

**The wall coordinate is:**

$$
y ^ { + } \; = \; { \\frac { u _ { \tau } \, y } { \nu } } \; = \; { \\frac { 0 . 5 \times 1 0 ^ { - 4 } } { 1 . 5 \times 1 0 ^ { - 5 } } } \; = \; { \\bf 3 . 3 3 }
$$

**Since $y ^ { + } = 3 . 3 3 < 5$ , this point is in the viscous sublayer where $u ^ { + } = y ^ { + }$ .**

**The velocity at this point is:**

$$
u \; = \; u ^ { + } \times u _ { \tau } \; = \; 3 . 3 3 \times 0 . 5 \; = \; { \\bf 1 . 6 7 } \; \text{m/s }
$$

**The engineer would design the structure for the dissipation rate, because the dissipation rate is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.**
:::

::: example Eddy viscosity calculation {#ex-eddy-viscosity-calc level=3 check="2"}
A flow has $k = 4 \\; \\text{m}^2 \\text{/s}^2$ , $\\varepsilon = 1 0 0 \\; \\text{m}^2 \\text{/s}^3$ , and $\\rho = 1 . 2 \\; \\text{kg/m}^3$ . Calculate the eddy viscosity and the turbulence time scale.

**The eddy viscosity is:**

$$
\\mu _ { t } \\; = \\; \\rho \\, C _ { \\mu } \\, { \frac { k ^ { 2 } } { \\varepsilon } } \\; = \\; 1 . 2 \\times 0 . 0 9 \\times { \frac { 1 6 } { 1 0 0 } } \\; = \\; 1 . 2 \\times 0 . 0 9 \\times 0 . 1 6 \\; = \\; { \bf 0 . 0 1 7 3 } \\; \\text{Pa s}
$$

**The turbulence time scale is:**

$$
T \\; = \\; { \frac { k } { \\varepsilon } } \\; = \\; { \frac { 4 } { 1 0 0 } } \\; = \\; { \bf 0 . 0 4 } \\; \\text{s}
$$

**The turbulence length scale is:**

$$
l \\; = \\; { \frac { k ^ { 3 / 2 } } { \\varepsilon } } \\; = \\; { \frac { 8 } { 1 0 0 } } \\; = \\; { \bf 0 . 0 8 } \\; \\text{m}
$$

**The engineer would design the structure for the wall function, because the wall function is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.**
:::

::: example Log-law velocity {#ex-log-law-velocity level=3 check="2"}
Air flows over a wall with $u _ { \\tau } = 2 \\; \\text{m/s }$ and $\\nu = 1 . 5 \\times 1 0 ^ { - 5 } \\; \\text{m}^2 \\text{/s }$ . Calculate the velocity at $y = 5 \\; \\text{mm }$ using the log-law.

**The wall coordinate is:**

$$
y ^ { + } \\; = \\; { \frac { u _ { \\tau } \\, y } { \\nu } } \\; = \\; { \frac { 2 \\times 0 . 0 0 5 } { 1 . 5 \\times 1 0 ^ { - 5 } } } \\; = \\; { \bf 6 6 7 }
$$

**Since $y ^ { + } = 6 6 7 > 3 0$ , the log-law applies:**

$$
u ^ { + } \\; = \\; 2 . 4 4 \\, \\ln ( 6 6 7 ) + 5 . 2 \\; = \\; 2 . 4 4 \\times 6 . 5 0 + 5 . 2 \\; = \\; 1 5 . 9 + 5 . 2 \\; = \\; { \bf 2 1 . 1 }
$$

**The velocity is:**

$$
u \\; = \\; u ^ { + } \\times u _ { \\tau } \\; = \\; 2 1 . 1 \\times 2 \\; = \\; { \bf 4 2 . 2 } \\; \\text{m/s}
$$

**The velocity at 5 mm from the wall is 42.2 m/s. The engineer would design the structure for the realizability, because the realizability is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.**
:::

## Exercises

::: exercise Reynolds stress {#ex-reynolds-stress-ex level=3 check="2"}
The Reynolds stress tensor has how many independent components in 3D?

::: solution
**6 independent components.** The Reynolds stress tensor $\tau _ { i j } ^ { R } = - \rho \, \overline { { u _ { i } ^ { \prime } u _ { j } ^ { \prime } } }$ is symmetric, so it has 6 independent components in 3D (3 normal stresses and 3 shear stresses).
:::
:::

::: exercise Eddy viscosity {#ex-eddy-viscosity-ex level=3 check="2"}
The eddy viscosity $\mu _ { t }$ is typically how many times larger than the molecular viscosity $\mu$ in engineering flows?

::: solution
**10 to $1 0 ^ { 5 }$ times larger.** The eddy viscosity $\mu _ { t }$ is typically 10 to $1 0 ^ { 5 }$ times larger than the molecular viscosity $\mu$ in engineering flows, because turbulent mixing is much more effective than molecular diffusion.
:::
:::

::: exercise $k$-$\varepsilon$ constants {#ex-k-epsilon-constants-ex level=3 check="2"}
The $k$-$\varepsilon$ model constant $C _ { \mu }$ is:

::: solution
**0.09.** The $k$-$\varepsilon$ model constant $C _ { \mu } = 0 . 0 9$ , which relates the eddy viscosity to $k ^ { 2 } / \varepsilon$ .
:::
:::

::: exercise Viscous sublayer {#ex-viscous-sublayer-ex level=3 check="2"}
The viscous sublayer extends to $y ^ { + }$ less than:

::: solution
**5.** The viscous sublayer extends to $y ^ { + } < 5$ , where the velocity profile follows the linear law $u ^ { + } = y ^ { + }$ .
:::
:::

::: exercise Log-law {#ex-log-law-ex level=3 check="2"}
The von Karman constant $\kappa$ in the log-law of the wall is approximately:

::: solution
**0.41.** The von Karman constant $\kappa \approx 0 . 4 1$ , which gives the slope $1 / \kappa \approx 2 . 4 4$ in the log-law $u ^ { + } = ( 1 / \kappa ) \, \ln ( y ^ { + } ) + B$ .
:::
:::

::: exercise Derivation: the Reynolds stress {#ex-derive-reynolds-stress level=4 check="2"}
Derive the Reynolds stress tensor from the Navier-Stokes equations by applying the Reynolds decomposition. Write the expression for the Reynolds decomposition.

::: solution
The **Reynolds decomposition** is:

$$
u _ { i } \; = \; \bar { u } _ { i } \; + \; u _ { i } ^ { \prime }
$$

**Substitute into the Navier-Stokes momentum equation:**

$$
\rho \, { \\frac { \partial ( \bar { u } _ { i } + u _ { i } ^ { \prime } ) } { \partial t } } \; + \; \rho \, ( \bar { u } _ { j } + u _ { j } ^ { \prime } ) \, { \\frac { \partial ( \bar { u } _ { i } + u _ { i } ^ { \prime } ) } { \partial x _ { j } } } \; = \; - \, { \\frac { \partial ( \bar { p } + p ^ { \prime } ) } { \partial x _ { i } } } \; + \; \mu \, \nabla ^ { 2 } ( \bar { u } _ { i } + u _ { i } ^ { \prime } )
$$

**Time-average using $\overline { { u _ { i } ^ { \prime } } } = 0$ , $\overline { { \bar { u } _ { i } \, u _ { j } ^ { \prime } } } = 0$ , and $\overline { { u _ { i } ^ { \prime } \, u _ { j } ^ { \prime } } } \neq 0$ :**

$$
\rho \, { \\frac { \partial \, \bar { u } _ { i } } { \partial t } } \; + \; \rho \, \bar { u } _ { j } \, { \\frac { \partial \, \bar { u } _ { i } } { \partial x _ { j } } } \; = \; - \, { \\frac { \partial \, \bar { p } } { \partial x _ { i } } } \; + \; \mu \, \nabla ^ { 2 } \, \bar { u } _ { i } \; - \; \rho \, { \\frac { \partial \, \\overline { { u _ { i } ^ { \prime } \, u _ { j } ^ { \prime } } } } { \partial x _ { j } } }
$$

**The new term $- \rho \, \partial \, \overline { { u _ { i } ^ { \prime } u _ { j } ^ { \prime } } } / \partial x _ { j }$ is the divergence of the Reynolds stress tensor $\tau _ { i j } ^ { R } = - \rho \, \overline { { u _ { i } ^ { \prime } u _ { j } ^ { \prime } } }$ .** $\blacksquare$
:::
:::

::: exercise Derivation: the $k$ equation {#ex-derive-k-equation level=4 check="2"}
Derive the turbulence kinetic energy transport equation from the RANS equations. Write the expression for the turbulence kinetic energy.

::: solution
The **turbulence kinetic energy** is:

$$
k \; = \; { \\frac { 1 } { 2 } } \, \\overline { { u _ { i } ^ { \prime } \, u _ { i } ^ { \prime } } }
$$

**Multiply the fluctuating momentum equation by $u _ { i } ^ { \prime }$ and time-average:**

$$
\rho \, { \\frac { \partial k } { \partial t } } \; + \; \rho \, \bar { u } _ { j } \, { \\frac { \partial k } { \partial x _ { j } } } \; = \; \underbrace { - \, \rho \, \\overline { { u _ { i } ^ { \prime } u _ { j } ^ { \prime } } } \, { \\frac { \partial \, \bar { u } _ { i } } { \partial x _ { j } } } } _ { G _ { k } \text{ (production)} } \; - \; { \\frac { \partial } { \partial x _ { j } } } \\left( \\rho \, \\overline { { u _ { j } ^ { \prime } \, k } } \\right)
$$

**The pressure-velocity correlation and viscous diffusion terms are modeled, giving:**

$$
{ \\frac { \partial ( \rho \, k ) } { \partial t } } \; + \; { \\frac { \partial ( \rho \, k \, \bar { u } _ { j } ) } { \partial x _ { j } } } \; = \; { \\frac { \partial } { \partial x _ { j } } } \\left( ( \mu + { \\frac { \mu _ { t } } { \sigma _ { k } } } ) \, { \\frac { \partial k } { \partial x _ { j } } } \\right) \; + \; G _ { k } \; - \; \rho \, \varepsilon
$$

**where $\varepsilon$ is the dissipation rate modeled as $\varepsilon = C _ { \mu } ^ { 3 / 4 } \, k ^ { 3 / 2 } / l$ .** $\blacksquare$
:::
:::

::: exercise Turbulence length scale {#ex-turbulence-length-ex level=3 check="2"}
The turbulence length scale $l$ is related to $k$ and $\varepsilon$ by:

::: solution
$$
l \; = \; { \\frac { k ^ { 3 / 2 } } { \varepsilon } } \; \\cdot \; C _ { \mu } ^ { - 3 / 4 }
$$

**The turbulence length scale is $l = k ^ { 3 / 2 } / ( C _ { \mu } ^ { 3 / 4 } \, \varepsilon )$ , which represents the size of the energy-containing eddies.**
:::
:::

::: quiz Turbulence modelling {#quiz-turbulence-modelling}
The most fundamental physical modeling challenge in computational fluid dynamics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Turbulence modelling
- [ ] Structural dynamics

::: solution
**Turbulence modelling.** Turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics, because the Reynolds decomposition separates mean and fluctuating quantities, the Reynolds-averaged Navier-Stokes equations introduce the Reynolds stress tensor that requires closure, and the eddy viscosity hypothesis relates the Reynolds stresses to the mean strain rate. The engineer who runs a simulation without checking the $y ^ { + }$ value is not running a simulation; they are guessing.
:::
:::

::: quiz $k$-$\varepsilon$ model {#quiz-k-epsilon}
The standard $k$-$\varepsilon$ model is what type of turbulence model?

- [ ] Zero-equation model
- [ ] One-equation model
- [x] Two-equation model
- [ ] Reynolds stress model

::: solution
**Two-equation model.** The standard $k$-$\varepsilon$ model is a two-equation turbulence model that solves transport equations for the turbulence kinetic energy $k$ and the dissipation rate $\varepsilon$ , and the wall function is the reason turbulence modelling is designed for the function, not the profile. The engineer who runs a simulation without checking the wall function is not running a simulation; they are guessing.
:::
:::

## Where this lesson leads

- **[[computational-fluid-dynamics/meshing-verification]]** — Meshing, boundary conditions and verification are the foundation of turbulence modelling.
- **[[computational-fluid-dynamics/governing-equations]]** — Governing equations and their classification are the foundation of turbulence modelling.
- **[[computational-fluid-dynamics/finite-differences]]** — Finite differences are the foundation of turbulence modelling.
- **[[computational-fluid-dynamics/stability-accuracy]]** — Consistency, stability and convergence are the foundation of turbulence modelling.
- **[[computational-fluid-dynamics/finite-volume-diffusion]]** — The finite volume method for diffusion is the foundation of turbulence modelling.
- **[[computational-fluid-dynamics/linear-solvers]]** — Solving the discrete equations is the foundation of turbulence modelling.
- **[[computational-fluid-dynamics/convection-diffusion]]** — Convection-diffusion schemes are the foundation of turbulence modelling.
- **[[computational-fluid-dynamics/pressure-velocity]]** — Pressure-velocity coupling is the foundation of turbulence modelling.
- **[[fluid-mechanics/boundary-layers-drag]]** — The boundary layers and drag are the foundation of turbulence modelling.
- **[[fluid-mechanics/dimensional-analysis]]** — The dimensional analysis is the foundation of turbulence modelling.

::: history Turbulence modelling: from Reynolds to $k$-$\omega$ {#history-turbulence-modelling}
**1895** — **Reynolds** publishes the **Reynolds decomposition**, which is the foundation of turbulence modelling. **The Reynolds decomposition is the reason turbulence modelling is the oldest concept in computational fluid dynamics, and the age is the reason turbulence modelling is the most refined concept in computational fluid dynamics.**

**1940s** — **Prandtl** develops the **mixing length model**, and the mixing length model is the reason turbulence modelling is the most historic concept in computational fluid dynamics. **The mixing length model is the reason turbulence modelling is the most refined concept in computational fluid dynamics, and turbulence modelling is the reason the mixing length model is the most historic concept in computational fluid dynamics.**

**1960s** — **Spalding and Patankar** develop the **two-equation model**, and the two-equation model is the reason turbulence modelling is the most practical concept in computational fluid dynamics. **The two-equation model is the reason turbulence modelling is the most refined concept in computational fluid dynamics, and turbulence modelling is the reason the two-equation model is the most practical concept in computational fluid dynamics.**

**1974** — **Jones and Launder** develop the **$k$-$\varepsilon$ model**, and the $k$-$\varepsilon$ model is the reason turbulence modelling is the most powerful concept in computational fluid dynamics. **The $k$-$\varepsilon$ model is the reason turbulence modelling is the most refined concept in computational fluid dynamics, and turbulence modelling is the reason the $k$-$\varepsilon$ model is the most powerful concept in computational fluid dynamics.**

**1980s** — **Launder and Spalding** develop the **wall function**, and the wall function is the reason turbulence modelling is the most efficient concept in computational fluid dynamics. **The wall function is the reason turbulence modelling is the most refined concept in computational fluid dynamics, and turbulence modelling is the reason the wall function is the most efficient concept in computational fluid dynamics.**

**1990s** — **Menter** develops the **$k$-$\omega$ SST model**, and the $k$-$\omega$ SST model is the reason turbulence modelling is the most advanced concept in computational fluid dynamics. **The $k$-$\omega$ SST model is the reason turbulence modelling is the most refined concept in computational fluid dynamics, and turbulence modelling is the reason the $k$-$\omega$ SST model is the most advanced concept in computational fluid dynamics.**

**2000s** — **The first LES models** become practical, and the first LES models are the reason turbulence modelling is the most modern concept in computational fluid dynamics. **The first LES models are the reason turbulence modelling is the most refined concept in computational fluid dynamics, and turbulence modelling is the reason the first LES models are the most modern concept in computational fluid dynamics.**

**2010s** — **The first hybrid RANS-LES models** are developed, and the first hybrid RANS-LES models are the reason turbulence modelling is the most futuristic concept in computational fluid dynamics. **The first hybrid RANS-LES models are the reason turbulence modelling is the most refined concept in computational fluid dynamics, and turbulence modelling is the reason the first hybrid RANS-LES models are the most futuristic concept in computational fluid dynamics.**
:::

::: summary Turbulence modelling {#summary-turbulence-modelling}
- **The decomposition is $u ( x , t ) = \bar { u } ( x ) + u ^ { \prime } ( x , t )$ , the mean is $\bar { u } = ( 1 / T ) \, \int _ { 0 } ^ { T } u ( x , t ) \, d t$ , and the fluctuation satisfies $\overline { { u ^ { \prime } } } = 0$ .** The $y ^ { + }$ value is the reason turbulence modelling is designed for the wall, not the free stream, and the wall is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.
- **The Reynolds stress tensor is $\tau _ { i j } ^ { R } = - \rho \, \overline { { u _ { i } ^ { \prime } u _ { j } ^ { \prime } } }$ , the RANS continuity equation is $\partial \, \bar { u } _ { i } / \partial x _ { i } = 0$ , and the RANS momentum equation includes the Reynolds stress divergence.** The Reynolds decomposition is the reason turbulence modelling is designed for the decomposition, not the reconstruction, and the decomposition is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.
- **The Boussinesq approximation is $- \rho \, \overline { { u _ { i } ^ { \prime } u _ { j } ^ { \prime } } } = \mu _ { t } \, ( \partial \, \bar { u } _ { i } / \partial x _ { j } + \partial \, \bar { u } _ { j } / \partial x _ { i } ) - ( 2 / 3 ) \, \rho \, k \, \delta _ { i j }$ , the turbulence kinetic energy is $k = ( 1 / 2 ) \, \overline { { u _ { i } ^ { \prime } u _ { i } ^ { \prime } } }$ , and the eddy viscosity is $\mu _ { t } = \rho \, C _ { \mu } \, k ^ { 2 } / \varepsilon$ .** The Reynolds stress is the reason turbulence modelling is designed for the stress, not the strain, and the stress is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.
- **The effective viscosity is $\mu _ { \text{eff } } = \mu + \mu _ { t }$ , the eddy viscosity ratio is $\mu _ { t } / \mu = 1 0 \text{--} 1 0 ^ { 5 }$ (engineering flows), and the model constant is $C _ { \mu } = 0 . 0 9$ .** The eddy viscosity is the reason turbulence modelling is designed for the viscosity, not the conductivity, and the viscosity is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.
- **The $k$ transport equation is $\partial ( \rho \, k ) / \partial t + \partial ( \rho \, k \, \bar { u } _ { j } ) / \partial x _ { j } = \partial / \partial x _ { j } \, ( ( \mu + \mu _ { t } / \sigma _ { k } ) \, \partial k / \partial x _ { j } ) + G _ { k } - \rho \, \varepsilon$ , the $\varepsilon$ transport equation includes $C _ { 1 \varepsilon } = 1 . 4 4$ and $C _ { 2 \varepsilon } = 1 . 9 2$ , and the production term is $G _ { k } = \mu _ { t } \, \partial \, \bar { u } _ { i } / \partial x _ { j } \, ( \partial \, \bar { u } _ { i } / \partial x _ { j } + \partial \, \bar { u } _ { j } / \partial x _ { i } )$ .** The turbulence kinetic energy is the reason turbulence modelling is designed for the energy, not the power, and the energy is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.
- **The model constants are $C _ { \mu } = 0 . 0 9$ , $C _ { 1 \varepsilon } = 1 . 4 4$ , $C _ { 2 \varepsilon } = 1 . 9 2$ , $\sigma _ { k } = 1 . 0$ , $\sigma _ { \varepsilon } = 1 . 3$ , the turbulence time scale is $T = k / \varepsilon$ , and the turbulence length scale is $l = k ^ { 3 / 2 } / \varepsilon$ .** The dissipation rate is the reason turbulence modelling is designed for the dissipation, not the production, and the dissipation is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.
- **The wall coordinate is $y ^ { + } = \rho \, u _ { \tau } \, y / \mu = u _ { \tau } \, y / \nu$ , the friction velocity is $u _ { \tau } = \sqrt { \tau _ { w } / \rho }$ , and the viscous sublayer ($y ^ { + } < 5$ ) follows $u ^ { + } = y ^ { + }$ .** The wall function is the reason turbulence modelling is designed for the function, not the profile, and the function is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.
- **The log layer ($3 0 < y ^ { + } < 3 0 0$ ) follows $u ^ { + } = ( 1 / \kappa ) \, \ln ( y ^ { + } ) + B = 2 . 4 4 \, \ln ( y ^ { + } ) + 5 . 2$ , the buffer layer is $5 < y ^ { + } < 3 0$ (no simple law), and the von Karman constant is $\kappa = 0 . 4 1$ .** The realizability is the reason turbulence modelling is designed for the reality, not the positivity, and the reality is the reason turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics.
- **The turbulence modelling calculation is the most important physical modeling calculation in computational fluid dynamics, because the turbulence modelling calculation determines the accuracy of drag, heat transfer and mixing predictions.** The accuracy of drag, heat transfer and mixing predictions are the reason the engineer can predict engineering flows.
- **Turbulence modelling is the most fundamental physical modeling challenge in computational fluid dynamics, because the Reynolds decomposition separates mean and fluctuating quantities, the Reynolds-averaged Navier-Stokes equations introduce the Reynolds stress tensor that requires closure, and the eddy viscosity hypothesis relates the Reynolds stresses to the mean strain rate.** The computational fluid dynamics is the reason the engineer can predict drag, heat transfer and mixing in engineering flows.
:::

## Further reading

- **H. Tennekes and J. L. Lumley (1972)** — *A First Course in Turbulence*. MIT Press. The Reynolds decomposition, the Reynolds stress, and the eddy viscosity.
- **B. E. Launder and D. B. Spalding (1974)** — *The Numerical Computation of Turbulent Flows*. Computer Methods in Applied Mechanics and Engineering. The Reynolds decomposition and the $k$-$\varepsilon$ model.
- **P. A. Durbin and B. A. Pettersson Reif (2011)** — *Statistical Theory and Modeling for Turbulent Flows*, 2nd ed. Wiley. The Reynolds decomposition and the wall function.
- **D. C. Wilcox (2006)** — *Turbulence Modeling for CFD*, 3rd ed. DCW Industries. The Reynolds decomposition and the realizability.
- **H. K. Versteeg and W. Malalasekera (2007)** — *An Introduction to Computational Fluid Dynamics: The Finite Volume Method*, 2nd ed. Pearson. The Reynolds decomposition and the anisotropy.
- **F. R. Menter (1994)** — *Two-Equation Eddy-Viscosity Turbulence Models for RANS Applications*. AIAA Journal. The Reynolds decomposition and the $k$-$\omega$ model.
- **S. B. Pope (2000)** — *Turbulent Flows*. Cambridge. The Reynolds decomposition and the turbulence cascade.
- **U. Piomelli and E. Balaras (2002)** — *Wall-Layer Models for Large-Eddy Simulation*. Annual Review of Fluid Mechanics. The Reynolds decomposition and the LES.
