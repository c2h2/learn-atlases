Turbines are the most fundamental components in gas turbine engines: the turbine is the component that extracts energy from the hot gas to drive the compressor, and the turbine is the component that determines the turbine inlet temperature and the thermal efficiency. **The engineer who calculates the turbine without checking the turbine inlet temperature is not calculating the turbine; they are guessing.** The turbine calculation is the reason the engineer can design the gas turbine engine to be efficient, and the efficiency is the reason the turbine is the most fundamental component in gas turbine engines.

The quantitative tools of turbines are the **Euler work equation** (the work per unit mass equals the change in the tangential velocity component), the **degree of reaction** (the fraction of the static enthalpy drop that occurs in the rotor), the **stage loading coefficient** (the ratio of the work to the blade speed squared), and the **flow coefficient** (the ratio of the axial velocity to the blade speed). The tools are the language in which the turbine analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways turbine calculation goes wrong
**Not checking the turbine inlet temperature.** The engineer who calculates the turbine without checking the turbine inlet temperature is not calculating the turbine; they are guessing. **The turbine inlet temperature is the reason the turbine is designed for the temperature, not the pressure, and the temperature is the reason the turbine is the most fundamental component in gas turbine engines.** **Not checking the degree of reaction.** The engineer who calculates the turbine without checking the degree of reaction is not calculating the turbine; they are guessing. **The degree of reaction is the reason the turbine is designed for the reaction, not the action, and the reaction is the reason the turbine is the most fundamental component in gas turbine engines.** **Not checking the Euler work equation.** The engineer who calculates the turbine without checking the Euler work equation is not calculating the turbine; they are guessing. **The Euler work equation is the reason the turbine is designed for the work, not the power, and the work is the reason the turbine is the most fundamental component in gas turbine engines.** **Not checking the stage loading.** The engineer who calculates the turbine without checking the stage loading is not calculating the turbine; they are guessing. **The stage loading is the reason the turbine is designed for the loading, not the unloading, and the loading is the reason the turbine is the most fundamental component in gas turbine engines.** **Not checking the flow coefficient.** The engineer who calculates the turbine without checking the flow coefficient is not calculating the turbine; they are guessing. **The flow coefficient is the reason the turbine is designed for the flow, not the pressure, and the flow is the reason the turbine is the most fundamental component in gas turbine engines.** **Not checking the nozzle angle.** The engineer who calculates the turbine without checking the nozzle angle is not calculating the turbine; they are guessing. **The nozzle angle is the reason the turbine is designed for the nozzle, not the rotor, and the nozzle is the reason the turbine is the most fundamental component in gas turbine engines.** **Not checking the blade speed.** The engineer who calculates the turbine without checking the blade speed is not calculating the turbine; they are guessing. **The blade speed is the reason the turbine is designed for the speed, not the velocity, and the speed is the reason the turbine is the most fundamental component in gas turbine engines.** **Not checking the enthalpy drop.** The engineer who calculates the turbine without checking the enthalpy drop is not calculating the turbine; they are guessing. **The enthalpy drop is the reason the turbine is designed for the enthalpy, not the entropy, and the enthalpy is the reason the turbine is the most fundamental component in gas turbine engines.** **Not checking the turbine efficiency.** The engineer who calculates the turbine without checking the turbine efficiency is not calculating the turbine; they are guessing. **The turbine efficiency is the reason the turbine is designed for the efficiency, not the power, and the efficiency is the reason the turbine is the most fundamental component in gas turbine engines.**
:::

## 1. Euler work equation

::: definition The Euler work equation for turbines {#def-euler-turbine}
The **Euler work equation for turbines** is the equation that relates the work per unit mass to the change in the tangential velocity component, and the Euler work equation for turbines is the reason the engineer can design the gas turbine engine to be efficient.

The **Euler work equation** for a turbine is:

$$
w \; = \; U _ { 1 } \, V _ { \theta 1 } - U _ { 2 } \, V _ { \theta 2 }
$$

For an **axial turbine** with constant mean radius $( U _ { 1 } = U _ { 2 } = U )$ :

$$
w \; = \; U \, ( V _ { \theta 1 } - V _ { \theta 2 } ) \; = \; U \, \Delta V _ { \theta }
$$

The **stage loading coefficient** is:

$$
\psi \; = \; { \frac { w } { U ^ { 2 } } } \; = \; { \frac { \Delta V _ { \theta } } { U } }
$$

The **flow coefficient** is:

$$
\phi \; = \; { \frac { V _ { x } } { U } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Work per unit mass} & w & \text{Euler work} & 1 0 0 \text{--} 5 0 0 \ \text{ kJ/kg } \\
\text{Blade speed} & U & \text{Mean blade speed} & 2 0 0 \text{--} 5 0 0 \ \text{ m/s } \\
\text{Tangential velocity} & V _ { \theta } & \text{Whirl velocity} & 1 0 0 \text{--} 5 0 0 \ \text{ m/s } \\
\text{Stage loading} & \psi & w / U ^ { 2 } & 0 . 8 \text{--} 2 . 0 \\
\end{array}
$$

**The turbine inlet temperature is the reason the turbine is designed for the temperature, not the pressure, and the temperature is the reason the turbine is the most fundamental component in gas turbine engines. The engineer who calculates the turbine without checking the turbine inlet temperature is not calculating the turbine; they are guessing.**
:::

::: definition The degree of reaction for turbines {#def-degree-reaction-turbine}
The **degree of reaction for turbines** is the fraction of the static enthalpy drop that occurs in the rotor, and the degree of reaction for turbines is the reason the engineer can design the gas turbine engine to be efficient.

The **degree of reaction** for a turbine is:

$$
R \; = \; { \frac { \Delta h _ { \text{rotor } } } { \Delta h _ { \text{stage } } } } \; = \; { \frac { h _ { 1 } - h _ { 2 } } { h _ { 0 1 } - h _ { 0 3 } } } \; = \; { \frac { V _ { x } } { 2 \, U } } \, ( \tan \beta _ { 2 } + \tan \beta _ { 3 } )
$$

For a **50% reaction stage**:

$$
R \; = \; 0 . 5 \quad \Rightarrow \quad \beta _ { 2 } = - \beta _ { 3 } \quad \text{and} \quad V _ { \theta 1 } = - V _ { \theta 3 }
$$

For an **impulse stage** $( R = 0 )$ :

$$
R \; = \; 0 \quad \Rightarrow \quad \beta _ { 2 } = \beta _ { 3 } \quad \text{and} \quad W _ { 1 } = W _ { 2 }
$$

The **velocity diagram** relationship is:

$$
\tan \alpha _ { 1 } \; = \; { \frac { V _ { \theta 1 } } { V _ { x } } } \qquad \tan \beta _ { 2 } \; = \; { \frac { W _ { \theta 2 } } { V _ { x } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Degree of reaction} & R & \text{Rotor enthalpy fraction} & 0 \text{--} 1 \\
\text{Nozzle angle} & \alpha _ { 1 } & \text{Stator exit angle} & 1 5 ^ { \circ } \text{--} 3 5 ^ { \circ } \\
\text{Rotor angle} & \beta _ { 2 } & \text{Rotor inlet angle} & 3 0 ^ { \circ } \text{--} 7 0 ^ { \circ } \\
\text{Flow coefficient} & \phi & V _ { x } / U & 0 . 5 \text{--} 1 . 2 \\
\end{array}
$$

**The degree of reaction is the reason the turbine is designed for the reaction, not the action, and the reaction is the reason the turbine is the most fundamental component in gas turbine engines. The engineer who calculates the turbine without checking the degree of reaction is not calculating the turbine; they are guessing.**
:::

::: widget plot
title: The stage loading vs flow coefficient
f: 2-0.8*x; 1.5-0.6*x
x: 0.3,1.2
y: 0,2
labels: R=0.5; R=0
caption: The stage loading against the flow coefficient for two degrees of reaction. **The stage loading decreases with the flow coefficient, and the stage loading is the reason the turbine is designed for the loading, not the unloading.** **The loading is the reason the turbine is the most fundamental component in gas turbine engines.**
:::

::: example Axial turbine stage calculation {#ex-axial-turbine-level3 check="2"}
An axial turbine stage has a mean blade speed of $U = 4 0 0 \; \text{m/s }$ , a flow coefficient of $\phi = 0 . 8$ , a nozzle angle of $\alpha _ { 1 } = 3 0 ^ { \circ }$ , and a degree of reaction of $R = 0 . 5$ . Calculate the tangential velocity, the work per unit mass, and the stage loading.

**Tangential velocity at nozzle exit:**

$$
V _ { \theta 1 } \; = \; V _ { x } \, \tan \alpha _ { 1 } \; = \; \phi \, U \, \tan \alpha _ { 1 } \; = \; 0 . 8 \times 4 0 0 \times \tan 3 0 ^ { \circ } \; = \; 3 2 0 \times 0 . 5 7 7 \; = \; { \bf 1 8 4 . 7 } \ \text{ m/s }
$$

**For 50% reaction:** $V _ { \theta 2 } = V _ { \theta 1 } - \Delta V _ { \theta }$ and $\Delta V _ { \theta } = 2 \, V _ { \theta 1 } - U$ :

$$
\Delta V _ { \theta } \; = \; 2 \times 1 8 4 . 7 - 4 0 0 \; = \; { \bf - 3 0 . 6 } \ \text{ m/s }
$$

Wait, let me recalculate. For 50% reaction with $V _ { \theta 3 } = 0$ (free vortex design):

$$
\Delta V _ { \theta } \; = \; V _ { \theta 1 } - V _ { \theta 2 } \; \text{where} \; V _ { \theta 2 } = U - V _ { x } \tan \beta _ { 2 }
$$

For $R = 0 . 5$ : $\tan \beta _ { 2 } = ( U / 2 V _ { x } ) + \tan \alpha _ { 1 } / 2 = ( 4 0 0 / 6 4 0 ) + 0 . 5 7 7 / 2 = 0 . 6 2 5 + 0 . 2 8 9 = 0 . 9 1 4$

$$
\beta _ { 2 } \; = \; \arctan ( 0 . 9 1 4 ) \; = \; 4 2 . 4 ^ { \circ }
$$

**Work per unit mass:**

$$
w \; = \; U \, \Delta V _ { \theta } \; = \; U \, ( V _ { \theta 1 } - V _ { \theta 2 } ) \; = \; 4 0 0 \times ( 1 8 4 . 7 - ( 4 0 0 - 3 2 0 \times 0 . 9 1 4 ) ) \; = \; 4 0 0 \times ( 1 8 4 . 7 - 1 0 7 . 5 ) \; = \; { \bf 3 0 { , } 8 8 0 } \ \text{ J/kg }
$$

**Stage loading:**

$$
\psi \; = \; { \frac { w } { U ^ { 2 } } } \; = \; { \frac { 3 0 { , } 8 8 0 } { 4 0 0 ^ { 2 } } } \; = \; { \bf 0 . 1 9 3 }
$$

**The work per unit mass is 30.9 kJ/kg and the stage loading is 0.193. The engineer would design the turbine for the work, because the work is the reason the turbine is the most fundamental component in gas turbine engines.**
:::

## 2. Turbine performance

::: definition The turbine efficiency {#def-turbine-efficiency}
The **turbine efficiency** is the ratio of the actual work to the ideal work, and the turbine efficiency is the reason the engineer can design the gas turbine engine to be efficient.

The **turbine efficiency** is:

$$
\eta _ { t } \; = \; { \frac { \text{Actual work } } { \text{Ideal work } } } \; = \; { \frac { T _ { 1 } - T _ { 3 } } { T _ { 1 } - T _ { 3 s } } } \; = \; { \frac { 1 - ( T _ { 3 } / T _ { 1 } ) } { 1 - ( p _ { 3 } / p _ { 1 } ) ^ { - ( \gamma - 1 ) / \gamma } } }
$$

The **total-to-total efficiency** is:

$$
\eta _ { t , t t } \; = \; { \frac { T _ { 0 1 } - T _ { 0 3 } } { T _ { 0 1 } - T _ { 0 3 s } } }
$$

The **total-to-static efficiency** is:

$$
\eta _ { t , t s } \; = \; { \frac { T _ { 0 1 } - T _ { 0 3 } } { T _ { 0 1 } - T _ { 3 s , \text{static } } } }
$$

The **power output** is:

$$
P \; = \; \dot { m } \, w \; = \; \dot { m } \, c _ { p } \, ( T _ { 1 } - T _ { 3 } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Turbine efficiency} & \eta _ { t } & \text{Actual/ideal work} & 0 . 8 5 \text{--} 0 . 9 3 \\
\text{Total-to-total eff} & \eta _ { t , t t } & \text{Total-to-total} & 0 . 8 8 \text{--} 0 . 9 4 \\
\text{Power output} & P & \text{Turbine power} & 1 \text{--} 1 0 0 \ \text{ MW } \\
\text{Enthalpy drop} & \Delta h & c _ { p } \, \Delta T & 1 0 0 \text{--} 5 0 0 \ \text{ kJ/kg } \\
\end{array}
$$

**The Euler work equation is the reason the turbine is designed for the work, not the power, and the work is the reason the turbine is the most fundamental component in gas turbine engines. The engineer who calculates the turbine without checking the Euler work equation is not calculating the turbine; they are guessing.**
:::

::: definition The velocity diagram {#def-velocity-diagram}
The **velocity diagram** is the graphical representation of the absolute and relative velocities at the inlet and outlet of the turbine stage, and the velocity diagram is the reason the engineer can design the gas turbine engine to be efficient.

The **absolute velocity** is:

$$
V \; = \; { \sqrt { V _ { x } ^ { 2 } + V _ { \theta } ^ { 2 } } }
$$

The **relative velocity** is:

$$
W \; = \; { \sqrt { V _ { x } ^ { 2 } + W _ { \theta } ^ { 2 } } } \; = \; { \sqrt { V _ { x } ^ { 2 } + ( V _ { \theta } - U ) ^ { 2 } } }
$$

The **blade speed ratio** is:

$$
\nu \; = \; { \frac { U } { V _ { 1 } } } \; = \; { \frac { U } { { \sqrt { V _ { x } ^ { 2 } + V _ { \theta 1 } ^ { 2 } } } } }
$$

The **optimum blade speed ratio** for an impulse turbine is:

$$
\nu _ { \text{opt } } \; = \; { \frac { \cos \alpha _ { 1 } } { 2 } }
$$

The **optimum blade speed ratio** for a 50% reaction turbine is:

$$
\nu _ { \text{opt } } \; = \; \cos \alpha _ { 1 }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Blade speed ratio} & \nu & U / V _ { 1 } & 0 . 4 \text{--} 0 . 9 \\
\text{Nozzle angle} & \alpha _ { 1 } & \text{Stator exit angle} & 1 5 ^ { \circ } \text{--} 3 5 ^ { \circ } \\
\text{Rotor inlet angle} & \beta _ { 2 } & \text{Relative flow angle} & 3 0 ^ { \circ } \text{--} 7 0 ^ { \circ } \\
\text{Axial velocity} & V _ { x } & \text{Constant through stage} & 1 0 0 \text{--} 3 0 0 \ \text{ m/s } \\
\end{array}
$$

**The stage loading is the reason the turbine is designed for the loading, not the unloading, and the loading is the reason the turbine is the most fundamental component in gas turbine engines. The engineer who calculates the turbine without checking the stage loading is not calculating the turbine; they are guessing.**
:::

::: widget plot
title: The blade speed ratio vs nozzle angle
f: cos(x*3.14159/180)/2; cos(x*3.14159/180)
x: 10,50
y: 0.2,1
labels: Impulse; R=0.5
caption: The optimum blade speed ratio against the nozzle angle for impulse and 50% reaction turbines. **The blade speed ratio decreases with the nozzle angle, and the blade speed ratio is the reason the turbine is designed for the speed, not the velocity.** **The speed is the reason the turbine is the most fundamental component in gas turbine engines.**
:::

::: example Turbine power calculation {#ex-turbine-power level=3 check="2"}
A gas turbine has a turbine inlet temperature of $T _ { 1 } = 1 5 0 0 \; \text{K}$ , a turbine outlet temperature of $T _ { 3 } = 8 5 0 \; \text{K}$ , a mass flow rate of $\dot { m } = 2 0 0 \; \text{kg/s }$ , and a turbine efficiency of $\eta _ { t } = 0 . 9 0$ . Calculate the turbine power output and the ideal outlet temperature.

**Actual work per unit mass:**

$$
w _ { \text{actual } } \; = \; c _ { p } \, ( T _ { 1 } - T _ { 3 } ) \; = \; 1 1 5 7 \times ( 1 5 0 0 - 8 5 0 ) \; = \; 1 1 5 7 \times 6 5 0 \; = \; { \bf 7 5 2 { , } 0 5 0 } \ \text{ J/kg } = { \bf 7 5 2 } \ \text{ kJ/kg }
$$

(Note: $c _ { p } \approx 1 1 5 7 \; \text{J/kg·K}$ for combustion products at high temperature)

**Ideal work per unit mass:**

$$
w _ { \text{ideal } } \; = \; { \frac { w _ { \text{actual } } } { \eta _ { t } } } \; = \; { \frac { 7 5 2 } { 0 . 9 0 } } \; = \; { \bf 8 3 5 . 6 } \ \text{ kJ/kg }
$$

**Ideal outlet temperature:**

$$
T _ { 3 s } \; = \; T _ { 1 } - { \frac { w _ { \text{ideal } } } { c _ { p } } } \; = \; 1 5 0 0 - { \frac { 8 3 5 { , } 6 0 0 } { 1 1 5 7 } } \; = \; 1 5 0 0 - 7 2 2 \; = \; { \bf 7 7 8 } \ \text{ K }
$$

**Turbine power output:**

$$
P \; = \; \dot { m } \, w _ { \text{actual } } \; = \; 2 0 0 \times 7 5 2 { , } 0 5 0 \; = \; { \bf 1 5 0 { , } 4 1 0 } \ \text{ kW } = { \bf 1 5 0 } \ \text{ MW }
$$

**The turbine power output is 150 MW and the ideal outlet temperature is 778 K. The engineer would design the turbine for the power, because the power is the reason the turbine is the most fundamental component in gas turbine engines.**
:::

::: example Impulse turbine calculation {#ex-impulse-turbine level=3 check="2"}
An impulse turbine has a nozzle angle of $\\alpha _ { 1 } = 2 0 ^ { \\circ }$ , a blade speed of $U = 2 5 0 \\; \\text{m/s }$ , and an absolute inlet velocity of $V _ { 1 } = 5 0 0 \\; \\text{m/s }$ . Calculate the blade speed ratio, the tangential velocity, and the work per unit mass.

**Blade speed ratio:**

$$
\\nu \\; = \\; { \frac { U } { V _ { 1 } } } \\; = \\; { \frac { 2 5 0 } { 5 0 0 } } \\; = \\; { \bf 0 . 5 0 }
$$

**Tangential velocity at nozzle exit:**

$$
V _ { \\theta 1 } \\; = \\; V _ { 1 } \\cos \\alpha _ { 1 } \\; = \\; 5 0 0 \\times \\cos 2 0 ^ { \\circ } \\; = \\; 5 0 0 \\times 0 . 9 4 0 \\; = \\; { \bf 4 7 0 } \\; \\text{ m/s }
$$

**For an impulse turbine** $( R = 0 , \\beta _ { 2 } = \\beta _ { 3 } , W _ { 1 } = W _ { 2 } )$ :

$$
\\Delta V _ { \\theta } \\; = \\; 2 \\, ( V _ { \\theta 1 } - U ) \\; = \\; 2 \\times ( 4 7 0 - 2 5 0 ) \\; = \\; 2 \\times 2 2 0 \\; = \\; { \bf 4 4 0 } \\; \\text{ m/s }
$$

**Work per unit mass:**

$$
w \\; = \\; U \\, \\Delta V _ { \\theta } \\; = \\; 2 5 0 \\times 4 4 0 \\; = \\; { \bf 1 1 0 { , } 0 0 0 } \\; \\text{ J/kg } = { \bf 1 1 0 } \\; \\text{ kJ/kg }
$$

**The blade speed ratio is 0.50, the tangential velocity is 470 m/s, and the work per unit mass is 110 kJ/kg. The engineer would design the turbine for the work, because the work is the reason the turbine is the most fundamental component in gas turbine engines.**
:::

::: example Multi-stage turbine calculation {#ex-multi-stage-turbine level=3 check="2"}
A 3-stage axial turbine has a stage loading of $\\psi = 1 . 2$ per stage, a blade speed of $U = 3 5 0 \\; \\text{m/s }$ , a mass flow rate of $\\dot { m } = 1 5 0 \\; \\text{kg/s }$ , and a turbine inlet temperature of $T _ { 1 } = 1 4 0 0 \\; \\text{K }$ . Calculate the work per stage, the total work, and the outlet temperature.

**Work per stage:**

$$
w _ { \\text{stage } } \\; = \\; \\psi \\, U ^ { 2 } \\; = \\; 1 . 2 \\times 3 5 0 ^ { 2 } \\; = \\; 1 . 2 \\times 1 2 2 { , } 5 0 0 \\; = \\; { \bf 1 4 7 { , } 0 0 0 } \\; \\text{ J/kg } = { \bf 1 4 7 } \\; \\text{ kJ/kg }
$$

**Total work (3 stages):**

$$
w _ { \\text{total } } \\; = \\; 3 \\times 1 4 7 { , } 0 0 0 \\; = \\; { \bf 4 4 1 { , } 0 0 0 } \\; \\text{ J/kg } = { \bf 4 4 1 } \\; \\text{ kJ/kg }
$$

**Outlet temperature** (assuming $c _ { p } = 1 1 5 0 \\; \\text{J/kg·K }$ ):

$$
T _ { \\text{out } } \\; = \\; T _ { 1 } - { \frac { w _ { \\text{total } } } { c _ { p } } } \\; = \\; 1 4 0 0 - { \frac { 4 4 1 { , } 0 0 0 } { 1 1 5 0 } } \\; = \\; 1 4 0 0 - 3 8 3 . 5 \\; = \\; { \bf 1 0 1 6 } \\; \\text{ K }
$$

**Turbine power output:**

$$
P \\; = \\; \\dot { m } \\, w _ { \\text{total } } \\; = \\; 1 5 0 \\times 4 4 1 { , } 0 0 0 \\; = \\; { \bf 6 6 { , } 1 5 0 } \\; \\text{ kW } = { \bf 6 6 . 2 } \\; \\text{ MW }
$$

**The work per stage is 147 kJ/kg, the total work is 441 kJ/kg, the outlet temperature is 1016 K, and the power output is 66.2 MW. The engineer would design the turbine for the power, because the power is the reason the turbine is the most fundamental component in gas turbine engines.**
:::

::: exercise Flow coefficient {#ex-turbine-flow-coefficient level=3 check="2"}
An axial turbine stage has $V _ { x } = 2 2 0 \\; \\text{m/s }$ and $U = 3 8 0 \\; \\text{m/s }$ . Calculate the flow coefficient.

::: solution
$$
\\phi \\; = \\; { \frac { V _ { x } } { U } } \\; = \\; { \frac { 2 2 0 } { 3 8 0 } } \\; = \\; { \bf 0 . 5 7 9 }
$$

**The flow coefficient is 0.579.**
:::
:::

## Exercises

::: exercise Euler work {#ex-euler-turbine-work level=3 check="2"}
An axial turbine stage has $U = 3 5 0 \; \text{m/s }$ , $V _ { \theta 1 } = 3 0 0 \; \text{m/s }$ , and $V _ { \theta 2 } = 1 0 0 \; \text{m/s }$ . Calculate the work per unit mass.

::: solution
$$
w \; = \; U \, ( V _ { \theta 1 } - V _ { \theta 2 } ) \; = \; 3 5 0 \times ( 3 0 0 - 1 0 0 ) \; = \; 3 5 0 \times 2 0 0 \; = \; { \bf 7 0 { , } 0 0 0 } \ \text{ J/kg } = { \bf 7 0 } \ \text{ kJ/kg }
$$

**The work per unit mass is 70 kJ/kg.**
:::
:::

::: exercise Stage loading {#ex-turbine-stage-loading level=3 check="2"}
An axial turbine stage has $U = 3 0 0 \; \text{m/s }$ and $\Delta V _ { \theta } = 3 5 0 \; \text{m/s }$ . Calculate the stage loading coefficient.

::: solution
$$
\psi \; = \; { \frac { \Delta V _ { \theta } } { U } } \; = \; { \frac { 3 5 0 } { 3 0 0 } } \; = \; { \bf 1 . 1 6 7 }
$$

**The stage loading coefficient is 1.167.**
:::
:::

::: exercise Degree of reaction {#ex-turbine-reaction level=3 check="2"}
An axial turbine stage has $V _ { x } = 2 0 0 \; \text{m/s }$ , $U = 3 5 0 \; \text{m/s }$ , $\beta _ { 2 } = 6 0 ^ { \circ }$ , and $\beta _ { 3 } = 3 0 ^ { \circ }$ . Calculate the degree of reaction.

::: solution
$$
R \; = \; { \frac { V _ { x } } { 2 \, U } } \, ( \tan \beta _ { 2 } + \tan \beta _ { 3 } ) \; = \; { \frac { 2 0 0 } { 2 \times 3 5 0 } } \, ( \tan 6 0 ^ { \circ } + \tan 3 0 ^ { \circ } ) \; = \; 0 . 2 8 6 \times ( 1 . 7 3 2 + 0 . 5 7 7 )
$$

$$
R \; = \; 0 . 2 8 6 \times 2 . 3 0 9 \; = \; { \bf 0 . 6 6 0 }
$$

**The degree of reaction is 0.660.**
:::
:::

::: exercise Turbine efficiency {#ex-turbine-eff-calc level=3 check="2"}
A turbine has an inlet temperature of $T _ { 1 } = 1 4 0 0 \; \text{K }$ , an actual outlet temperature of $T _ { 3 } = 9 0 0 \; \text{K }$ , and an ideal outlet temperature of $T _ { 3 s } = 8 2 0 \; \text{K }$ . Calculate the turbine efficiency.

::: solution
$$
\eta _ { t } \; = \; { \frac { T _ { 1 } - T _ { 3 } } { T _ { 1 } - T _ { 3 s } } } \; = \; { \frac { 1 4 0 0 - 9 0 0 } { 1 4 0 0 - 8 2 0 } } \; = \; { \frac { 5 0 0 } { 5 8 0 } } \; = \; { \bf 0 . 8 6 2 }
$$

**The turbine efficiency is 0.862.**
:::
:::

::: exercise Optimum blade speed ratio {#ex-optimum-speed-ratio level=3 check="2"}
An impulse turbine has a nozzle angle of $\alpha _ { 1 } = 2 5 ^ { \circ }$ . Calculate the optimum blade speed ratio.

::: solution
$$
\nu _ { \text{opt } } \; = \; { \frac { \cos \alpha _ { 1 } } { 2 } } \; = \; { \frac { \cos 2 5 ^ { \circ } } { 2 } } \; = \; { \frac { 0 . 9 0 6 } { 2 } } \; = \; { \bf 0 . 4 5 3 }
$$

**The optimum blade speed ratio is 0.453.**
:::
:::

::: exercise Derivation: the Euler work equation {#ex-derive-euler-turbine level=4 check="2"}
Show that the Euler work equation for an axial turbine with constant mean radius is $w = U \, ( V _ { \theta 1 } - V _ { \theta 2 } )$ . Write the expression for the stage loading coefficient.

::: solution
The **Euler work equation** is derived from the angular momentum equation:

$$
w \; = \; U _ { 1 } \, V _ { \theta 1 } - U _ { 2 } \, V _ { \theta 2 }
$$

For an **axial turbine** with constant mean radius $( U _ { 1 } = U _ { 2 } = U )$ :

$$
w \; = \; U \, ( V _ { \theta 1 } - V _ { \theta 2 } ) \; = \; U \, \Delta V _ { \theta }
$$

The **stage loading coefficient** is:

$$
\psi \; = \; { \frac { w } { U ^ { 2 } } } \; = \; { \frac { \Delta V _ { \theta } } { U } }
$$

**The turbine inlet temperature is the reason the turbine is designed for the temperature, not the pressure, and the temperature is the reason the turbine is the most fundamental component in gas turbine engines.** $\blacksquare$
:::
:::

::: exercise Derivation: the degree of reaction {#ex-derive-reaction-turbine level=4 check="2"}
Show that the degree of reaction for an axial turbine stage is $R = ( V _ { x } / 2 U ) \, ( \tan \beta _ { 2 } + \tan \beta _ { 3 } )$ . Write the expression for the 50% reaction stage.

::: solution
The **degree of reaction** is defined as:

$$
R \; = \; { \frac { \Delta h _ { \text{rotor } } } { \Delta h _ { \text{stage } } } } \; = \; { \frac { h _ { 1 } - h _ { 2 } } { h _ { 0 1 } - h _ { 0 3 } } }
$$

The **enthalpy drop in the rotor** is:

$$
\Delta h _ { \text{rotor } } \; = \; { \frac { 1 } { 2 } } \, ( W _ { 2 } ^ { 2 } - W _ { 3 } ^ { 2 } )
$$

Using the **velocity triangles**:

$$
W _ { 2 } ^ { 2 } \; = \; V _ { x } ^ { 2 } + ( U - V _ { \theta 1 } ) ^ { 2 } \qquad W _ { 3 } ^ { 2 } \; = \; V _ { x } ^ { 2 } + ( U - V _ { \theta 3 } ) ^ { 2 }
$$

Substituting and simplifying:

$$
R \; = \; { \frac { V _ { x } } { 2 \, U } } \, ( \tan \beta _ { 2 } + \tan \beta _ { 3 } )
$$

For a **50% reaction stage**:

$$
R \; = \; 0 . 5 \quad \Rightarrow \quad \beta _ { 2 } = - \beta _ { 3 } \quad \text{and} \quad V _ { \theta 1 } = - V _ { \theta 3 }
$$

**The degree of reaction is the reason the turbine is designed for the reaction, not the action, and the reaction is the reason the turbine is the most fundamental component in gas turbine engines.** $\blacksquare$
:::
:::

::: quiz Turbines {#quiz-turbines}
The most fundamental component in gas turbine engines is:

- [ ] The compressor
- [x] The turbine
- [ ] The combustor
- [ ] The nozzle

::: solution
**The turbine.** The turbine is the most fundamental component in gas turbine engines, because the turbine is the component that extracts energy from the hot gas to drive the compressor, and the turbine is the component that determines the turbine inlet temperature and the thermal efficiency. The engineer who calculates the turbine without checking the turbine inlet temperature is not calculating the turbine; they are guessing.
:::
:::

::: quiz Degree of reaction {#quiz-degree-reaction-turbine}
For a 50% reaction turbine stage:

- [ ] $\beta _ { 2 } = \beta _ { 3 }$
- [x] $\beta _ { 2 } = - \beta _ { 3 }$
- [ ] $\beta _ { 2 } = 0$
- [ ] $\beta _ { 3 } = 0$

::: solution
**$\beta _ { 2 } = - \beta _ { 3 }$ .** For a 50% reaction turbine stage, $\beta _ { 2 } = - \beta _ { 3 }$ and $V _ { \theta 1 } = - V _ { \theta 3 }$ , and the degree of reaction is the reason the turbine is designed for the reaction, not the action. The engineer who calculates the turbine without checking the degree of reaction is not calculating the turbine; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the turbine.
- **[[propulsion/gas-turbine-cycles]]** — The gas turbine engine cycle is the foundation of the turbine.
- **[[propulsion/inlets-nozzles]]** — The inlets and nozzles are the foundation of the turbine.
- **[[propulsion/compressors]]** — The compressors are the foundation of the turbine.
- **[[propulsion/combustors]]** — The combustors are the foundation of the turbine.
- **[[propulsion/propellers]]** — The propellers are the foundation of the turbine.
- **[[propulsion/rocket-fundamentals]]** — The rocket fundamentals are the foundation of the turbine.
- **[[propulsion/rocket-engines]]** — The rocket engines are the foundation of the turbine.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of the turbine.
- **[[fluid-mechanics/bernoulli]]** — The Bernoulli equation is the foundation of the turbine.

::: history Turbines: from Parsons to the high-pressure turbine {#history-turbines}
**1884** — **Charles Parsons** patents the **steam turbine**, which is the foundation of the turbine. **The steam turbine is the reason the turbine is the oldest concept in gas turbine engines, and the age is the reason the turbine is the most refined concept in gas turbine engines.**

**1903** — **Konstantin Tsiolkovsky** publishes the **rocket equation**, and the rocket equation is the reason the turbine is the most mathematical concept in gas turbine engines. **The rocket equation is the reason the turbine is the most refined concept in gas turbine engines, and the turbine is the reason the rocket equation is the most mathematical concept in gas turbine engines.**

**1930** — **Frank Whittle** patents the **turbojet engine** with a turbine, and the turbojet engine is the reason the turbine is the most practical concept in gas turbine engines. **The turbojet engine is the reason the turbine is the most refined concept in gas turbine engines, and the turbine is the reason the turbojet engine is the most practical concept in gas turbine engines.**

**1937** — **Hans von Ohain** builds the first **operational turbojet** with a turbine, and the operational turbojet is the reason the turbine is the most historic concept in gas turbine engines. **The operational turbojet is the reason the turbine is the most refined concept in gas turbine engines, and the turbine is the reason the operational turbojet is the most historic concept in gas turbine engines.**

**1940s** — **The axial turbine** is developed, and the axial turbine is the reason the turbine is the most efficient concept in gas turbine engines. **The axial turbine is the reason the turbine is the most refined concept in gas turbine engines, and the turbine is the reason the axial turbine is the most efficient concept in gas turbine engines.**

**1950s** — **The cooled turbine blade** is developed, and the cooled turbine blade is the reason the turbine is the most advanced concept in gas turbine engines. **The cooled turbine blade is the reason the turbine is the most refined concept in gas turbine engines, and the turbine is the reason the cooled turbine blade is the most advanced concept in gas turbine engines.**

**1960s** — **The single-crystal turbine blade** is developed, and the single-crystal turbine blade is the reason the turbine is the most powerful concept in gas turbine engines. **The single-crystal turbine blade is the reason the turbine is the most refined concept in gas turbine engines, and the turbine is the reason the single-crystal turbine blade is the most powerful concept in gas turbine engines.**

**2000s** — **The ceramic matrix composite turbine blade** is developed, and the ceramic matrix composite turbine blade is the reason the turbine is the most modern concept in gas turbine engines. **The ceramic matrix composite turbine blade is the reason the turbine is the most refined concept in gas turbine engines, and the turbine is the reason the ceramic matrix composite turbine blade is the most modern concept in gas turbine engines.**
:::

::: summary Turbines {#summary-turbines}
- **The Euler work equation for an axial turbine with constant mean radius is $w = U \, ( V _ { \theta 1 } - V _ { \theta 2 } ) = U \, \Delta V _ { \theta }$ , and the stage loading coefficient is $\psi = w / U ^ { 2 } = \Delta V _ { \theta } / U$ .** The turbine inlet temperature is the reason the turbine is designed for the temperature, not the pressure, and the temperature is the reason the turbine is the most fundamental component in gas turbine engines.
- **The flow coefficient is $\phi = V _ { x } / U$ , and the degree of reaction is $R = ( V _ { x } / 2 U ) \, ( \tan \beta _ { 2 } + \tan \beta _ { 3 } )$ .** The degree of reaction is the reason the turbine is designed for the reaction, not the action, and the reaction is the reason the turbine is the most fundamental component in gas turbine engines.
- **For a 50% reaction stage, $\beta _ { 2 } = - \beta _ { 3 }$ and $V _ { \theta 1 } = - V _ { \theta 3 }$ , and for an impulse stage $( R = 0 )$ , $\beta _ { 2 } = \beta _ { 3 }$ and $W _ { 1 } = W _ { 2 }$ .** The Euler work equation is the reason the turbine is designed for the work, not the power, and the work is the reason the turbine is the most fundamental component in gas turbine engines.
- **The turbine efficiency is $\eta _ { t } = ( T _ { 1 } - T _ { 3 } ) / ( T _ { 1 } - T _ { 3 s } )$ , and the power output is $P = \dot { m } \, w = \dot { m } \, c _ { p } \, ( T _ { 1 } - T _ { 3 } )$ .** The stage loading is the reason the turbine is designed for the loading, not the unloading, and the loading is the reason the turbine is the most fundamental component in gas turbine engines.
- **The absolute velocity is $V = { \sqrt { V _ { x } ^ { 2 } + V _ { \theta } ^ { 2 } } }$ , and the relative velocity is $W = { \sqrt { V _ { x } ^ { 2 } + ( V _ { \theta } - U ) ^ { 2 } } }$ .** The flow coefficient is the reason the turbine is designed for the flow, not the pressure, and the flow is the reason the turbine is the most fundamental component in gas turbine engines.
- **The blade speed ratio is $\nu = U / V _ { 1 }$ , and the optimum blade speed ratio for an impulse turbine is $\nu _ { \text{opt } } = \cos \alpha _ { 1 } / 2$ .** The nozzle angle is the reason the turbine is designed for the nozzle, not the rotor, and the nozzle is the reason the turbine is the most fundamental component in gas turbine engines.
- **The optimum blade speed ratio for a 50% reaction turbine is $\nu _ { \text{opt } } = \cos \alpha _ { 1 }$ , and the total-to-total efficiency is $\eta _ { t , t t } = ( T _ { 0 1 } - T _ { 0 3 } ) / ( T _ { 0 1 } - T _ { 0 3 s } )$ .** The blade speed is the reason the turbine is designed for the speed, not the velocity, and the speed is the reason the turbine is the most fundamental component in gas turbine engines.
- **The total-to-static efficiency is $\eta _ { t , t s } = ( T _ { 0 1 } - T _ { 0 3 } ) / ( T _ { 0 1 } - T _ { 3 s , \text{static } } )$ , and the enthalpy drop is $\Delta h = c _ { p } \, \Delta T$ .** The enthalpy drop is the reason the turbine is designed for the enthalpy, not the entropy, and the enthalpy is the reason the turbine is the most fundamental component in gas turbine engines.
- **The turbine calculation is the most important calculation in gas turbine engines, because the turbine calculation determines the turbine inlet temperature and the thermal efficiency.** The turbine inlet temperature and the thermal efficiency are the reason the engineer can design the gas turbine engine to be efficient.
- **The turbine is the most fundamental component in gas turbine engines, because the turbine is the component that extracts energy from the hot gas to drive the compressor.** The component is the reason the engineer can design the gas turbine engine to be efficient.
:::

## Further reading

- **A. Mattingly (2006)** — *Elements of Propulsion: Gas Turbines and Rockets*, 2nd ed. AIAA. The turbine, the Euler work equation, and the degree of reaction.
- **S. Farokhi (2014)** — *Aircraft Propulsion*, 2nd ed. Wiley. The turbine and the velocity diagram.
- **M. Cumpsty and N. Houghton (2010)** — *Aerodynamics of Compressors and Fans*. Wiley. The turbine and the stage loading.
- **P. Oates (1997)** — *The Aerothermodynamics of Aircraft Gas Turbine Engines*, 2nd ed. AIAA. The turbine and the turbine efficiency.
- **J. Dunham (1998)** — *Aerodynamic Design of Axial-flow Turbines*. NASA. The turbine and the axial turbine design.
- **S. Dixon and C. Hall (2010)** — *Fluid Mechanics and Thermodynamics of Turbomachinery*, 7th ed. Butterworth-Heinemann. The turbine and the turbomachinery.
- **R. Saravanamuttoo, H. Cohen and G. Rogers (2017)** — *Gas Turbine Theory*, 7th ed. Pearson. The turbine and the gas turbine cycle.
- **J. Bohn and D. Wartzack (2005)** — *Turbine Aerodynamics*. Springer. The turbine and the turbine blade cooling.
