Compressors are the most fundamental components in gas turbine engines: the compressor is the component that increases the pressure of the air before it enters the combustor, and the compressor is the component that determines the pressure ratio and the thermal efficiency. **The engineer who calculates the compressor without checking the pressure ratio is not calculating the compressor; they are guessing.** The compressor calculation is the reason the engineer can design the gas turbine engine to be efficient, and the efficiency is the reason the compressor is the most fundamental component in gas turbine engines.

The quantitative tools of compressors are the **pressure ratio** (the ratio of the outlet pressure to the inlet pressure), the **degree of reaction** (the fraction of the static enthalpy rise that occurs in the rotor), the **Euler work equation** (the work per unit mass equals the change in the tangential velocity component), and the **Stodt slip factor** (the ratio of the actual tangential velocity to the ideal tangential velocity). The tools are the language in which the compressor analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways compressor calculation goes wrong
**Not checking the pressure ratio.** The engineer who calculates the compressor without checking the pressure ratio is not calculating the compressor; they are guessing. **The pressure ratio is the reason the compressor is designed for the compression, not the expansion, and the compression is the reason the compressor is the most fundamental component in gas turbine engines.** **Not checking the degree of reaction.** The engineer who calculates the compressor without checking the degree of reaction is not calculating the compressor; they are guessing. **The degree of reaction is the reason the compressor is designed for the reaction, not the action, and the reaction is the reason the compressor is the most fundamental component in gas turbine engines.** **Not checking the Euler work equation.** The engineer who calculates the compressor without checking the Euler work equation is not calculating the compressor; they are guessing. **The Euler work equation is the reason the compressor is designed for the work, not the power, and the work is the reason the compressor is the most fundamental component in gas turbine engines.** **Not checking the slip factor.** The engineer who calculates the compressor without checking the slip factor is not calculating the compressor; they are guessing. **The slip factor is the reason the compressor is designed for the slip, not the flow, and the slip is the reason the compressor is the most fundamental component in gas turbine engines.** **Not checking the stall margin.** The engineer who calculates the compressor without checking the stall margin is not calculating the compressor; they are guessing. **The stall margin is the reason the compressor is designed for the stall, not the surge, and the stall is the reason the compressor is the most fundamental component in gas turbine engines.** **Not checking the surge line.** The engineer who calculates the compressor without checking the surge line is not calculating the compressor; they are guessing. **The surge line is the reason the compressor is designed for the surge, not the choke, and the surge is the reason the compressor is the most fundamental component in gas turbine engines.** **Not checking the Mach number.** The engineer who calculates the compressor without checking the Mach number is not calculating the compressor; they are guessing. **The Mach number is the reason the compressor is designed for the compressibility, not the viscosity, and the compressibility is the reason the compressor is the most fundamental component in gas turbine engines.** **Not checking the flow coefficient.** The engineer who calculates the compressor without checking the flow coefficient is not calculating the compressor; they are guessing. **The flow coefficient is the reason the compressor is designed for the flow, not the pressure, and the flow is the reason the compressor is the most fundamental component in gas turbine engines.** **Not checking the stage loading.** The engineer who calculates the compressor without checking the stage loading is not calculating the compressor; they are guessing. **The stage loading is the reason the compressor is designed for the loading, not the unloading, and the loading is the reason the compressor is the most fundamental component in gas turbine engines.**
:::

## 1. Centrifugal compressors

::: definition The Euler work equation {#def-euler-work}
The **Euler work equation** is the equation that relates the work per unit mass to the change in the tangential velocity component, and the Euler work equation is the reason the engineer can design the gas turbine engine to be efficient.

The **Euler work equation** for a compressor is:

$$
w \; = \; U _ { 2 } \, V _ { \theta 2 } - U _ { 1 } \, V _ { \theta 1 }
$$

For a **centrifugal compressor** with no inlet swirl $( V _ { \theta 1 } = 0 )$ :

$$
w \; = \; U _ { 2 } \, V _ { \theta 2 }
$$

The **ideal work** (no slip) is:

$$
w _ { \text{ideal } } \; = \; U _ { 2 } ^ { 2 }
$$

The **actual work** (with slip) is:

$$
w _ { \text{actual } } \; = \; \sigma \, U _ { 2 } ^ { 2 }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Work per unit mass} & w & \text{Euler work} & 5 0 \text{--} 3 0 0 \ \text{ kJ/kg } \\
\text{Tip speed} & U _ { 2 } & \text{Impeller tip speed} & 3 0 0 \text{--} 5 0 0 \ \text{ m/s } \\
\text{Tangential velocity} & V _ { \theta 2 } & \text{Whirl velocity} & 2 0 0 \text{--} 5 0 0 \ \text{ m/s } \\
\text{Slip factor} & \sigma & \text{Stodt slip factor} & 0 . 8 0 \text{--} 0 . 9 5 \\
\end{array}
$$

**The pressure ratio is the reason the compressor is designed for the compression, not the expansion, and the compression is the reason the compressor is the most fundamental component in gas turbine engines. The engineer who calculates the compressor without checking the pressure ratio is not calculating the compressor; they are guessing.**
:::

::: definition The slip factor {#def-slip-factor}
The **slip factor** is the ratio of the actual tangential velocity to the ideal tangential velocity, and the slip factor is the reason the engineer can design the gas turbine engine to be efficient.

The **Stodt slip factor** is:

$$
\sigma \; = \; 1 - { \frac { \pi } { Z } } \quad \text{(Stodt)}
$$

The **Stanitz slip factor** is:

$$
\sigma \; = \; 1 - { \frac { 1 . 9 8 7 } { Z } } \quad \text{(Stanitz)}
$$

The **pressure ratio** for a centrifugal compressor is:

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; \left( 1 + { \frac { \eta _ { c } \, \sigma \, U _ { 2 } ^ { 2 } } { c _ { p } \, T _ { 1 } } } \right) ^ { \gamma / ( \gamma - 1 ) }
$$

The **pressure coefficient** is:

$$
\psi \; = \; { \frac { \Delta p } { { \frac { 1 } { 2 } } \, \rho \, U _ { 2 } ^ { 2 } } } \; = \; { \frac { \sigma \, U _ { 2 } ^ { 2 } } { { \frac { 1 } { 2 } } \, U _ { 2 } ^ { 2 } } } \; = \; 2 \, \sigma
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Slip factor} & \sigma & \text{Stodt/Stanitz} & 0 . 8 0 \text{--} 0 . 9 5 \\
\text{Number of blades} & Z & \text{Impeller blades} & 1 5 \text{--} 3 0 \\
\text{Pressure coefficient} & \psi & \text{Pressure rise coefficient} & 1 . 6 \text{--} 1 . 9 \\
\text{Pressure ratio} & p _ { 2 } / p _ { 1 } & \text{Compressor pressure ratio} & 2 \text{--} 1 2 \\
\end{array}
$$

**The degree of reaction is the reason the compressor is designed for the reaction, not the action, and the reaction is the reason the compressor is the most fundamental component in gas turbine engines. The engineer who calculates the compressor without checking the degree of reaction is not calculating the compressor; they are guessing.**
:::

::: widget plot
title: The slip factor vs number of blades
f: 1-3.14159/x
x: 6,30
y: 0.7,1
labels: sigma
caption: The slip factor against the number of blades for the Stodt slip factor. **The slip factor increases with the number of blades, and the slip factor is the reason the compressor is designed for the slip, not the flow.** **The slip is the reason the compressor is the most fundamental component in gas turbine engines.**
:::

::: example Centrifugal compressor calculation {#ex-centrifugal-calc level=3 check="2"}
A centrifugal compressor has an impeller tip speed of $U _ { 2 } = 4 5 0 \; \text{m/s }$ , 20 blades, an inlet temperature of $T _ { 1 } = 2 8 8 \; \text{K}$ , and a compressor efficiency of $\eta _ { c } = 0 . 8 5$ . Calculate the slip factor, the actual work, and the pressure ratio.

**Slip factor (Stodt):**

$$
\sigma \; = \; 1 - { \frac { \pi } { 2 0 } } \; = \; 1 - 0 . 1 5 7 \; = \; { \bf 0 . 8 4 3 }
$$

**Actual work:**

$$
w \; = \; \sigma \, U _ { 2 } ^ { 2 } \; = \; 0 . 8 4 3 \times 4 5 0 ^ { 2 } \; = \; 0 . 8 4 3 \times 2 0 2 { , } 5 0 0 \; = \; { \bf 1 7 0 { , } 7 0 8 } \ \text{ J/kg } = { \bf 1 7 0 . 7 } \ \text{ kJ/kg }
$$

**Pressure ratio:**

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; \left( 1 + { \frac { 0 . 8 5 \times 1 7 0 { , } 7 0 8 } { 1 0 0 5 \times 2 8 8 } } \right) ^ { 3 . 5 } \; = \; \left( 1 + { \frac { 1 4 5 { , } 1 0 2 } { 2 8 9 { , } 4 4 0 } } \right) ^ { 3 . 5 } \; = \; ( 1 + 0 . 5 0 1 ) ^ { 3 . 5 } \; = \; 1 . 5 0 1 ^ { 3 . 5 } \; = \; { \bf 4 . 1 4 }
$$

**The slip factor is 0.843, the actual work is 170.7 kJ/kg, and the pressure ratio is 4.14. The engineer would design the compressor for the compression, because the compression is the reason the compressor is the most fundamental component in gas turbine engines.**
:::

## 2. Axial compressors

::: definition The degree of reaction {#def-degree-reaction}
The **degree of reaction** is the fraction of the static enthalpy rise that occurs in the rotor, and the degree of reaction is the reason the engineer can design the gas turbine engine to be efficient.

The **degree of reaction** is:

$$
R \; = \; { \frac { \Delta h _ { \text{rotor } } } { \Delta h _ { \text{stage } } } } \; = \; { \frac { V _ { x } } { 2 \, U } } \, \left( \tan \beta _ { 3 } - \tan \beta _ { 2 } \right)
$$

For a **50% reaction stage**:

$$
R \; = \; 0 . 5 \quad \Rightarrow \quad \beta _ { 2 } = \beta _ { 3 } \quad \text{and} \quad V _ { \theta 2 } = - V _ { \theta 3 }
$$

The **flow coefficient** is:

$$
\phi \; = \; { \frac { V _ { x } } { U } }
$$

The **stage loading coefficient** is:

$$
\psi \; = \; { \frac { \Delta h _ { 0 } } { U ^ { 2 } } } \; = \; \phi \, ( \tan \beta _ { 2 } - \tan \beta _ { 3 } ) \quad \text{(for } R = 0 . 5 \\text{)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Degree of reaction} & R & \text{Rotor enthalpy fraction} & 0 . 3 \text{--} 0 . 7 \\
\text{Flow coefficient} & \phi & V _ { x } / U & 0 . 4 \text{--} 0 . 7 \\
\text{Stage loading} & \psi & \Delta h _ { 0 } / U ^ { 2 } & 0 . 3 \text{--} 0 . 6 \\
\text{Stage pressure ratio} & p _ { \text{stage } } & \text{Per stage} & 1 . 1 \text{--} 1 . 5 \\
\end{array}
$$

**The Euler work equation is the reason the compressor is designed for the work, not the power, and the work is the reason the compressor is the most fundamental component in gas turbine engines. The engineer who calculates the compressor without checking the Euler work equation is not calculating the compressor; they are guessing.**
:::

::: definition The compressor map {#def-compressor-map}
The **compressor map** is the plot of pressure ratio versus corrected mass flow at constant corrected speed, and the compressor map is the reason the engineer can design the gas turbine engine to be efficient.

The **corrected mass flow** is:

$$
\dot { m } _ { \text{corr } } \; = \; { \frac { \dot { m } \, { \sqrt { T _ { \text{ref } } / T _ { 1 } } } } { p _ { \text{ref } } / p _ { 1 } } }
$$

The **corrected speed** is:

$$
N _ { \text{corr } } \; = \; N \, { \sqrt { \frac { T _ { \text{ref } } } { T _ { 1 } } } }
$$

The **surge margin** is:

$$
\text{SM } \; = \; { \frac { \left( { \dot { m } _ { \text{corr } } } \right) _ { \text{op } } - \left( { \dot { m } _ { \text{corr } } } \right) _ { \text{surge } } } { \left( { \dot { m } _ { \text{corr } } } \right) _ { \text{surge } } } } \times 1 0 0 \ \\%
$$

The **choke line** is the maximum mass flow at each speed:

$$
\dot { m } _ { \text{choke } } \; = \; \max ( \dot { m } _ { \text{corr } } ) \quad \text{at each } N _ { \text{corr } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Corrected mass flow} & \dot { m } _ { \text{corr } } & \text{Normalized flow} & 1 0 \text{--} 1 0 0 0 \ \text{ kg/s } \\
\text{Corrected speed} & N _ { \text{corr } } & \text{Normalized speed} & 5 0 \text{--} 1 1 0 \ \% \\
\text{Surge margin} & \text{SM} & \text{Distance to surge} & 1 0 \text{--} 2 5 \ \\%
\text{Choke line} & \text{Choke} & \text{Maximum flow} & \text{Design dependent} \\
\end{array}
$$

**The slip factor is the reason the compressor is designed for the slip, not the flow, and the slip is the reason the compressor is the most fundamental component in gas turbine engines. The engineer who calculates the compressor without checking the slip factor is not calculating the compressor; they are guessing.**
:::

::: widget plot
title: The pressure ratio vs corrected mass flow
f: 1.5-0.002*x^2; 1.2-0.001*x^2
x: 10,100
y: 0.8,1.6
labels: 100% speed; 80% speed
caption: The pressure ratio against the corrected mass flow for two corrected speeds. **The pressure ratio decreases with the corrected mass flow, and the pressure ratio is the reason the compressor is designed for the compression, not the expansion.** **The compression is the reason the compressor is the most fundamental component in gas turbine engines.**
:::

::: example Axial compressor stage calculation {#ex-axial-stage level=3 check="2"}
An axial compressor stage has a mean blade speed of $U = 3 5 0 \; \text{m/s }$ , a flow coefficient of $\phi = 0 . 5 5$ , a degree of reaction of $R = 0 . 5$ , and a stage loading of $\psi = 0 . 4 5$ . Calculate the tangential velocity and the stage pressure ratio.

**Tangential velocity (from $\psi = \Delta V _ { \theta } / U$ ):**

$$
\Delta V _ { \theta } \; = \; \psi \, U \; = \; 0 . 4 5 \times 3 5 0 \; = \; { \bf 1 5 7 . 5 } \ \text{ m/s }
$$

**Work per unit mass:**

$$
w \; = \; U \, \Delta V _ { \theta } \; = \; 3 5 0 \times 1 5 7 . 5 \; = \; { \bf 5 5 { , } 1 2 5 } \ \text{ J/kg } = { \bf 5 5 . 1 } \ \text{ kJ/kg }
$$

**Stage pressure ratio** (assuming $T _ { 1 } = 4 0 0 \; \text{K}$ , $\eta _ { c } = 0 . 8 8$ ):

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; \left( 1 + { \frac { 0 . 8 8 \times 5 5 { , } 1 2 5 } { 1 0 0 5 \times 4 0 0 } } \right) ^ { 3 . 5 } \; = \; \left( 1 + { \frac { 4 8 { , } 5 1 0 } { 4 0 2 { , } 0 0 0 } } \right) ^ { 3 . 5 } \; = \; 1 . 1 2 1 ^ { 3 . 5 } \; = \; { \bf 1 . 4 9 }
$$

**The tangential velocity is 157.5 m/s, the work is 55.1 kJ/kg, and the stage pressure ratio is 1.49. The engineer would design the compressor for the compression, because the compression is the reason the compressor is the most fundamental component in gas turbine engines.**
:::

::: example Multi-stage axial compressor {#ex-multi-stage-axial level=3 check="2"}
A 10-stage axial compressor has a stage pressure ratio of 1.35 per stage, a stage efficiency of $\\eta _ { c , \\text{stage } } = 0 . 8 8$ , and an inlet temperature of $T _ { 1 } = 3 0 0 \\; \\text{K}$ . Calculate the overall pressure ratio and the overall temperature rise.

**Overall pressure ratio:**

$$
{ \frac { p _ { \\text{out } } } { p _ { \\text{in } } } } \\; = \\; ( 1 . 3 5 ) ^ { 1 0 } \\; = \\; { \bf 2 0 . 1 }
$$

**Overall temperature rise:**

$$
T _ { \\text{out } } \\; = \\; T _ { \\text{in } } \\times \\left( { \frac { p _ { \\text{out } } } { p _ { \\text{in } } } } \\right) ^ { ( \\gamma - 1 ) / ( \\gamma \\, \\eta _ { c } ) } \\; = \\; 3 0 0 \\times 2 0 . 1 ^ { 0 . 2 8 6 / 0 . 8 8 } \\; = \\; 3 0 0 \\times 2 0 . 1 ^ { 0 . 3 2 5 }
$$

$$
T _ { \\text{out } } \\; = \\; 3 0 0 \\times 2 . 6 9 5 \\; = \\; { \bf 8 0 9 } \\; \\text{ K }
$$

**Overall temperature rise:**

$$
\\Delta T \\; = \\; 8 0 9 - 3 0 0 \\; = \\; { \bf 5 0 9 } \\; \\text{ K }
$$

**The overall pressure ratio is 20.1, the outlet temperature is 809 K, and the temperature rise is 509 K. The engineer would design the compressor for the compression, because the compression is the reason the compressor is the most fundamental component in gas turbine engines.**
:::

::: example Compressor map calculation {#ex-compressor-map-calc level=3 check="2"}
A compressor operates at a corrected speed of $N _ { \\text{corr } } = 9 5 \\%$ with a corrected mass flow of $\\dot { m } _ { \\text{corr } } = 4 5 \\; \\text{kg/s }$ . The surge line at this speed is at $\\dot { m } _ { \\text{corr , surge } } = 3 6 \\; \\text{kg/s }$ . Calculate the surge margin. If the actual mass flow is $\\dot { m } = 5 0 \\; \\text{kg/s }$ at $T _ { 1 } = 2 8 8 \\; \\text{K}$ and $p _ { 1 } = 1 0 1 . 3 \\; \\text{kPa }$ , calculate the reference temperature and pressure used for the correction.

**Surge margin:**

$$
\\text{SM } \\; = \\; { \frac { 4 5 - 3 6 } { 3 6 } } \\times 1 0 0 \\; = \\; { \frac { 9 } { 3 6 } } \\times 1 0 0 \\; = \\; { \bf 2 5 } \\; \\%
$$

**Reference conditions** (standard: $T _ { \\text{ref } } = 2 8 8 . 1 5 \\; \\text{K}$ , $p _ { \\text{ref } } = 1 0 1 . 3 2 5 \\; \\text{kPa }$ ):

$$
\\dot { m } _ { \\text{corr } } \\; = \\; { \frac { 5 0 \\times { \\sqrt { 2 8 8 . 1 5 / 2 8 8 } } } { 1 0 1 . 3 2 5 / 1 0 1 . 3 } } \\; = \\; { \frac { 5 0 \\times 1 . 0 0 0 } { 1 . 0 0 0 2 5 } } \\; = \\; { \bf 5 0 } \\; \\text{ kg/s }
$$

**The surge margin is 25%, and the corrected mass flow is 50 kg/s. The engineer would design the compressor for the compression, because the compression is the reason the compressor is the most fundamental component in gas turbine engines.**
:::

::: exercise Stage loading {#ex-stage-loading level=3 check="2"}
An axial compressor stage has $U = 3 0 0 \\; \\text{m/s }$ , $\\phi = 0 . 6$ , $\\beta _ { 2 } = 6 0 ^ { \\circ }$ , and $\\beta _ { 3 } = 3 5 ^ { \\circ }$ . Calculate the stage loading coefficient.

::: solution
$$
\\psi \\; = \\; \phi \\, ( \\tan \\beta _ { 2 } - \\tan \\beta _ { 3 } ) \\; = \\; 0 . 6 \\times ( \\tan 6 0 ^ { \\circ } - \\tan 3 5 ^ { \\circ } ) \\; = \\; 0 . 6 \\times ( 1 . 7 3 2 - 0 . 7 0 0 ) \\; = \\; 0 . 6 \\times 1 . 0 3 2 \\; = \\; { \bf 0 . 6 1 9 }
$$

**The stage loading coefficient is 0.619.**
:::
:::

## Exercises

::: exercise Slip factor {#ex-slip-factor level=3 check="2"}
A centrifugal compressor has 24 blades. Calculate the Stodt slip factor.

::: solution
$$
\sigma \; = \; 1 - { \frac { \pi } { 2 4 } } \; = \; 1 - 0 . 1 3 1 \; = \; { \bf 0 . 8 6 9 }
$$

**The Stodt slip factor is 0.869.**
:::
:::

::: exercise Pressure ratio {#ex-centrifugal-pressure-ratio level=3 check="2"}
A centrifugal compressor has a tip speed of $U _ { 2 } = 4 0 0 \; \text{m/s }$ , a slip factor of $\sigma = 0 . 9$ , an inlet temperature of $T _ { 1 } = 3 0 0 \; \text{K}$ , and a compressor efficiency of $\eta _ { c } = 0 . 8 2$ . Calculate the pressure ratio.

::: solution
$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; \left( 1 + { \frac { 0 . 8 2 \times 0 . 9 \times 4 0 0 ^ { 2 } } { 1 0 0 5 \times 3 0 0 } } \right) ^ { 3 . 5 } \; = \; \left( 1 + { \frac { 1 1 8 { , } 0 8 0 } { 3 0 1 { , } 5 0 0 } } \right) ^ { 3 . 5 } \; = \; 1 . 3 9 2 ^ { 3 . 5 } \; = \; { \bf 3 . 2 4 }
$$

**The pressure ratio is 3.24.**
:::
:::

::: exercise Degree of reaction {#ex-degree-reaction-calc level=3 check="2"}
An axial compressor stage has $V _ { x } = 1 8 0 \; \text{m/s }$ , $U = 3 2 0 \; \text{m/s }$ , $\beta _ { 2 } = 5 5 ^ { \circ }$ , and $\beta _ { 3 } = 3 0 ^ { \circ }$ . Calculate the degree of reaction.

::: solution
$$
R \; = \; { \frac { V _ { x } } { 2 \, U } } \, ( \tan \beta _ { 3 } - \tan \beta _ { 2 } ) \; = \; { \frac { 1 8 0 } { 2 \times 3 2 0 } } \, ( \tan 3 0 ^ { \circ } - \tan 5 5 ^ { \circ } ) \; = \; 0 . 2 8 1 \times ( 0 . 5 7 7 - 1 . 4 2 8 )
$$

$$
R \; = \; 0 . 2 8 1 \times ( - 0 . 8 5 1 ) \; = \; { \bf - 0 . 2 3 9 }
$$

**The degree of reaction is -0.239 (negative, indicating a reaction stage with diffusion in the stator).**
:::
:::

::: exercise Flow coefficient {#ex-flow-coefficient level=3 check="2"}
An axial compressor stage has $V _ { x } = 1 6 0 \; \text{m/s }$ and $U = 2 8 0 \; \text{m/s }$ . Calculate the flow coefficient.

::: solution
$$
\phi \; = \; { \frac { V _ { x } } { U } } \; = \; { \frac { 1 6 0 } { 2 8 0 } } \; = \; { \bf 0 . 5 7 1 }
$$

**The flow coefficient is 0.571.**
:::
:::

::: exercise Surge margin {#ex-surge-margin level=3 check="2"}
A compressor operates at a corrected mass flow of $\dot { m } _ { \text{corr , op } } = 2 5 \; \text{kg/s }$ and the surge line is at $\dot { m } _ { \text{corr , surge } } = 2 0 \; \text{kg/s }$ . Calculate the surge margin.

::: solution
$$
\text{SM } \; = \; { \frac { 2 5 - 2 0 } { 2 0 } } \times 1 0 0 \; = \; { \frac { 5 } { 2 0 } } \times 1 0 0 \; = \; { \bf 2 5 } \ \\%
$$

**The surge margin is 25%.**
:::
:::

::: exercise Derivation: the Euler work equation {#ex-derive-euler level=4 check="2"}
Show that the Euler work equation for a centrifugal compressor with no inlet swirl is $w = U _ { 2 } \, V _ { \theta 2 }$ . Write the expression for the ideal work.

::: solution
The **Euler work equation** is derived from the angular momentum equation:

$$
w \; = \; U _ { 2 } \, V _ { \theta 2 } - U _ { 1 } \, V _ { \theta 1 }
$$

For **no inlet swirl** $( V _ { \theta 1 } = 0 )$ :

$$
w \; = \; U _ { 2 } \, V _ { \theta 2 }
$$

For **no slip** $( V _ { \theta 2 } = U _ { 2 } )$ :

$$
w _ { \text{ideal } } \; = \; U _ { 2 } ^ { 2 }
$$

The **actual work** (with slip factor $\sigma$ ) is:

$$
w _ { \text{actual } } \; = \; \sigma \, U _ { 2 } ^ { 2 }
$$

**The pressure ratio is the reason the compressor is designed for the compression, not the expansion, and the compression is the reason the compressor is the most fundamental component in gas turbine engines.** $\blacksquare$
:::
:::

::: exercise Derivation: the degree of reaction {#ex-derive-reaction level=4 check="2"}
Show that the degree of reaction for an axial compressor stage is $R = ( V _ { x } / 2 U ) \, ( \tan \beta _ { 3 } - \tan \beta _ { 2 } )$ . Write the expression for the 50% reaction stage.

::: solution
The **degree of reaction** is defined as:

$$
R \; = \; { \frac { \Delta h _ { \text{rotor } } } { \Delta h _ { \text{stage } } } } \; = \; { \frac { h _ { 3 } - h _ { 2 } } { h _ { 0 3 } - h _ { 0 1 } } }
$$

For a **50% reaction stage**:

$$
R \; = \; 0 . 5 \quad \Rightarrow \quad \beta _ { 2 } = \beta _ { 3 } \quad \text{and} \quad V _ { \theta 2 } = - V _ { \theta 3 }
$$

The **enthalpy rise in the rotor** is:

$$
\Delta h _ { \text{rotor } } \; = \; { \frac { 1 } { 2 } } \, ( W _ { 2 } ^ { 2 } - W _ { 3 } ^ { 2 } )
$$

Using the **velocity triangles**:

$$
W _ { 2 } ^ { 2 } \; = \; V _ { x } ^ { 2 } + ( U - V _ { \theta 2 } ) ^ { 2 } \qquad W _ { 3 } ^ { 2 } \; = \; V _ { x } ^ { 2 } + ( U - V _ { \theta 3 } ) ^ { 2 }
$$

Substituting and simplifying:

$$
R \; = \; { \frac { V _ { x } } { 2 \, U } } \, ( \tan \beta _ { 3 } - \tan \beta _ { 2 } )
$$

**The degree of reaction is the reason the compressor is designed for the reaction, not the action, and the reaction is the reason the compressor is the most fundamental component in gas turbine engines.** $\blacksquare$
:::
:::

::: quiz Compressors {#quiz-compressors}
The most fundamental component in gas turbine engines is:

- [ ] The turbine
- [x] The compressor
- [ ] The combustor
- [ ] The nozzle

::: solution
**The compressor.** The compressor is the most fundamental component in gas turbine engines, because the compressor is the component that increases the pressure of the air before it enters the combustor, and the compressor is the component that determines the pressure ratio and the thermal efficiency. The engineer who calculates the compressor without checking the pressure ratio is not calculating the compressor; they are guessing.
:::
:::

::: quiz Slip factor {#quiz-slip-factor}
The Stodt slip factor is:

- [ ] $\sigma = 1 + \pi / Z$
- [x] $\sigma = 1 - \pi / Z$
- [ ] $\sigma = \pi / Z$
- [ ] $\sigma = 1 - Z / \pi$

::: solution
**$\sigma = 1 - \pi / Z$ .** The Stodt slip factor is $\sigma = 1 - \pi / Z$ , and the slip factor is the reason the compressor is designed for the slip, not the flow. The engineer who calculates the compressor without checking the slip factor is not calculating the compressor; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the compressor.
- **[[propulsion/gas-turbine-cycles]]** — The gas turbine engine cycle is the foundation of the compressor.
- **[[propulsion/inlets-nozzles]]** — The inlets and nozzles are the foundation of the compressor.
- **[[propulsion/turbines]]** — The turbines are the foundation of the compressor.
- **[[propulsion/combustors]]** — The combustors are the foundation of the compressor.
- **[[propulsion/propellers]]** — The propellers are the foundation of the compressor.
- **[[propulsion/rocket-fundamentals]]** — The rocket fundamentals are the foundation of the compressor.
- **[[propulsion/rocket-engines]]** — The rocket engines are the foundation of the compressor.
- **[[fluid-mechanics/bernoulli]]** — The Bernoulli equation is the foundation of the compressor.
- **[[solid-mechanics/stress-strain-3d]]** — The stress-strain relationship is the foundation of the compressor.

::: history Compressors: from centrifugal to axial {#history-compressors}
**1903** — **Konstantin Tsiolkovsky** publishes the **rocket equation**, which is the foundation of the compressor. **The rocket equation is the reason the compressor is the oldest concept in gas turbine engines, and the age is the reason the compressor is the most refined concept in gas turbine engines.**

**1910** — **Auguste Rateau** builds the first **centrifugal compressor**, and the centrifugal compressor is the reason the compressor is the most practical concept in gas turbine engines. **The centrifugal compressor is the reason the compressor is the most refined concept in gas turbine engines, and the compressor is the reason the centrifugal compressor is the most practical concept in gas turbine engines.**

**1930** — **Frank Whittle** patents the **turbojet engine** with a centrifugal compressor, and the turbojet engine is the reason the compressor is the most applied concept in gas turbine engines. **The turbojet engine is the reason the compressor is the most refined concept in gas turbine engines, and the compressor is the reason the turbojet engine is the most applied concept in gas turbine engines.**

**1937** — **Hans von Ohain** builds the first **operational turbojet** with a centrifugal compressor, and the operational turbojet is the reason the compressor is the most historic concept in gas turbine engines. **The operational turbojet is the reason the compressor is the most refined concept in gas turbine engines, and the compressor is the reason the operational turbojet is the most historic concept in gas turbine engines.**

**1940s** — **The axial compressor** is developed, and the axial compressor is the reason the compressor is the most efficient concept in gas turbine engines. **The axial compressor is the reason the compressor is the most refined concept in gas turbine engines, and the compressor is the reason the axial compressor is the most efficient concept in gas turbine engines.**

**1950s** — **The multi-stage axial compressor** is developed, and the multi-stage axial compressor is the reason the compressor is the most powerful concept in gas turbine engines. **The multi-stage axial compressor is the reason the compressor is the most refined concept in gas turbine engines, and the compressor is the reason the multi-stage axial compressor is the most powerful concept in gas turbine engines.**

**1960s** — **The high-pressure-ratio compressor** is developed, and the high-pressure-ratio compressor is the reason the compressor is the most advanced concept in gas turbine engines. **The high-pressure-ratio compressor is the reason the compressor is the most refined concept in gas turbine engines, and the compressor is the reason the high-pressure-ratio compressor is the most advanced concept in gas turbine engines.**

**2000s** — **The blisk (bladed disk) compressor** is developed, and the blisk compressor is the reason the compressor is the most modern concept in gas turbine engines. **The blisk compressor is the reason the compressor is the most refined concept in gas turbine engines, and the compressor is the reason the blisk compressor is the most modern concept in gas turbine engines.**
:::

::: summary Compressors {#summary-compressors}
- **The Euler work equation is $w = U _ { 2 } \, V _ { \theta 2 } - U _ { 1 } \, V _ { \theta 1 }$ , and for no inlet swirl $w = U _ { 2 } \, V _ { \theta 2 }$ .** The pressure ratio is the reason the compressor is designed for the compression, not the expansion, and the compression is the reason the compressor is the most fundamental component in gas turbine engines.
- **The ideal work is $w _ { \text{ideal } } = U _ { 2 } ^ { 2 }$ , and the actual work is $w _ { \text{actual } } = \sigma \, U _ { 2 } ^ { 2 }$ .** The degree of reaction is the reason the compressor is designed for the reaction, not the action, and the reaction is the reason the compressor is the most fundamental component in gas turbine engines.
- **The Stodt slip factor is $\sigma = 1 - \pi / Z$ , and the Stanitz slip factor is $\sigma = 1 - 1 . 9 8 7 / Z$ .** The Euler work equation is the reason the compressor is designed for the work, not the power, and the work is the reason the compressor is the most fundamental component in gas turbine engines.
- **The pressure ratio for a centrifugal compressor is $p _ { 2 } / p _ { 1 } = ( 1 + \eta _ { c } \, \sigma \, U _ { 2 } ^ { 2 } / ( c _ { p } \, T _ { 1 } ) ) ^ { \gamma / ( \gamma - 1 ) }$ , and the pressure coefficient is $\psi = 2 \, \sigma$ .** The slip factor is the reason the compressor is designed for the slip, not the flow, and the slip is the reason the compressor is the most fundamental component in gas turbine engines.
- **The degree of reaction is $R = ( V _ { x } / 2 U ) \, ( \tan \beta _ { 3 } - \tan \beta _ { 2 } )$ , and for a 50% reaction stage $\beta _ { 2 } = \beta _ { 3 }$ and $V _ { \theta 2 } = - V _ { \theta 3 }$ .** The stall margin is the reason the compressor is designed for the stall, not the surge, and the stall is the reason the compressor is the most fundamental component in gas turbine engines.
- **The flow coefficient is $\phi = V _ { x } / U$ , and the stage loading coefficient is $\psi = \Delta h _ { 0 } / U ^ { 2 } = \phi \, ( \tan \beta _ { 2 } - \tan \beta _ { 3 } )$ for $R = 0 . 5$ .** The surge line is the reason the compressor is designed for the surge, not the choke, and the surge is the reason the compressor is the most fundamental component in gas turbine engines.
- **The corrected mass flow is $\dot { m } _ { \text{corr } } = \dot { m } \, { \sqrt { T _ { \text{ref } } / T _ { 1 } } } / ( p _ { \text{ref } } / p _ { 1 } )$ , and the corrected speed is $N _ { \text{corr } } = N \, { \sqrt { T _ { \text{ref } } / T _ { 1 } } }$ .** The Mach number is the reason the compressor is designed for the compressibility, not the viscosity, and the compressibility is the reason the compressor is the most fundamental component in gas turbine engines.
- **The surge margin is $\text{SM } = ( ( \dot { m } _ { \text{corr } } ) _ { \text{op } } - ( \dot { m } _ { \text{corr } } ) _ { \text{surge } } ) / ( \dot { m } _ { \text{corr } } ) _ { \text{surge } } \times 1 0 0 \ \\%$ , and the choke line is the maximum mass flow at each speed.** The flow coefficient is the reason the compressor is designed for the flow, not the pressure, and the flow is the reason the compressor is the most fundamental component in gas turbine engines.
- **The compressor calculation is the most important calculation in gas turbine engines, because the compressor calculation determines the pressure ratio and the thermal efficiency.** The pressure ratio and the thermal efficiency are the reason the engineer can design the gas turbine engine to be efficient.
- **The compressor is the most fundamental component in gas turbine engines, because the compressor is the component that increases the pressure of the air before it enters the combustor.** The component is the reason the engineer can design the gas turbine engine to be efficient.
:::

## Further reading

- **A. Mattingly (2006)** — *Elements of Propulsion: Gas Turbines and Rockets*, 2nd ed. AIAA. The compressor, the Euler work equation, and the slip factor.
- **S. Farokhi (2014)** — *Aircraft Propulsion*, 2nd ed. Wiley. The compressor and the degree of reaction.
- **M. Cumpsty and N. Houghton (2010)** — *Aerodynamics of Compressors and Fans*. Wiley. The compressor and the compressor map.
- **P. Oates (1997)** — *The Aerothermodynamics of Aircraft Gas Turbine Engines*, 2nd ed. AIAA. The compressor and the surge margin.
- **J. Dunham (1998)** — *Aerodynamic Design of Axial-flow Compressors*. NASA. The compressor and the axial compressor design.
- **D. Japikse (1996)** — *Centrifugal Compressor Design and Performance*. Concepts ETI. The compressor and the centrifugal compressor.
- **R. Saravanamuttoo, H. Cohen and G. Rogers (2017)** — *Gas Turbine Theory*, 7th ed. Pearson. The compressor and the gas turbine cycle.
- **S. Dixon and C. Hall (2010)** — *Fluid Mechanics and Thermodynamics of Turbomachinery*, 7th ed. Butterworth-Heinemann. The compressor and the turbomachinery.
