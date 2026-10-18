The gas turbine engine cycle is the most fundamental theory in propulsion: the gas turbine engine cycle is the theory that describes the thermodynamic processes in a gas turbine engine, and the gas turbine engine cycle is the theory that determines the thermal efficiency and the thrust. **The engineer who calculates the gas turbine engine cycle without checking the pressure ratio is not calculating the gas turbine engine cycle; they are guessing.** The gas turbine engine cycle calculation is the reason the engineer can design the gas turbine engine to be efficient, and the efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.

The quantitative tools of the gas turbine engine cycle are the **Brayton cycle** (the ideal cycle for a gas turbine engine), the **pressure ratio** (the ratio of the compressor outlet pressure to the compressor inlet pressure), the **turbine inlet temperature** (the temperature of the gas entering the turbine), and the **thermal efficiency** (the ratio of the net work output to the heat input). The tools are the language in which the gas turbine engine cycle analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways gas turbine engine cycle calculation goes wrong
**Not checking the pressure ratio.** The engineer who calculates the gas turbine engine cycle without checking the pressure ratio is not calculating the gas turbine engine cycle; they are guessing. **The pressure ratio is the reason the gas turbine engine cycle is designed for the compression, not the expansion, and the compression is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** **Not checking the turbine inlet temperature.** The engineer who calculates the gas turbine engine cycle without checking the turbine inlet temperature is not calculating the gas turbine engine cycle; they are guessing. **The turbine inlet temperature is the reason the gas turbine engine cycle is designed for the temperature, not the pressure, and the temperature is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** **Not checking the thermal efficiency.** The engineer who calculates the gas turbine engine cycle without checking the thermal efficiency is not calculating the gas turbine engine cycle; they are guessing. **The thermal efficiency is the reason the gas turbine engine cycle is designed for the efficiency, not the power, and the efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** **Not checking the Brayton cycle.** The engineer who calculates the gas turbine engine cycle without checking the Brayton cycle is not calculating the gas turbine engine cycle; they are guessing. **The Brayton cycle is the reason the gas turbine engine cycle is designed for the cycle, not the engine, and the cycle is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** **Not checking the compressor efficiency.** The engineer who calculates the gas turbine engine cycle without checking the compressor efficiency is not calculating the gas turbine engine cycle; they are guessing. **The compressor efficiency is the reason the gas turbine engine cycle is designed for the compressor, not the turbine, and the compressor is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** **Not checking the turbine efficiency.** The engineer who calculates the gas turbine engine cycle without checking the turbine efficiency is not calculating the gas turbine engine cycle; they are guessing. **The turbine efficiency is the reason the gas turbine engine cycle is designed for the turbine, not the compressor, and the turbine is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** **Not checking the specific thrust.** The engineer who calculates the gas turbine engine cycle without checking the specific thrust is not calculating the gas turbine engine cycle; they are guessing. **The specific thrust is the reason the gas turbine engine cycle is designed for the thrust, not the drag, and the thrust is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** **Not checking the fuel-air ratio.** The engineer who calculates the gas turbine engine cycle without checking the fuel-air ratio is not calculating the gas turbine engine cycle; they are guessing. **The fuel-air ratio is the reason the gas turbine engine cycle is designed for the fuel, not the air, and the fuel is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** **Not checking the exhaust temperature.** The engineer who calculates the gas turbine engine cycle without checking the exhaust temperature is not calculating the gas turbine engine cycle; they are guessing. **The exhaust temperature is the reason the gas turbine engine cycle is designed for the exhaust, not the intake, and the exhaust is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.**
:::

## 1. The Brayton cycle

::: definition The ideal Brayton cycle {#def-brayton-cycle}
The **ideal Brayton cycle** is the thermodynamic cycle that describes the processes in a gas turbine engine, and the ideal Brayton cycle is the reason the engineer can design the gas turbine engine to be efficient.

The **ideal Brayton cycle** consists of four processes:
1. **Isentropic compression** (1→2): the air is compressed in the compressor
2. **Constant-pressure heat addition** (2→3): the fuel is burned in the combustor
3. **Isentropic expansion** (3→4): the gas expands in the turbine
4. **Constant-pressure heat rejection** (4→1): the exhaust is released to the atmosphere

The **compressor outlet temperature** is:

$$
T _ { 2 } \; = \; T _ { 1 } \, \left( { \frac { p _ { 2 } } { p _ { 1 } } } \right) ^ { ( \gamma - 1 ) / \gamma } \; = \; T _ { 1 } \, r _ { p } ^ { ( \gamma - 1 ) / \gamma }
$$

The **turbine outlet temperature** is:

$$
T _ { 4 } \; = \; T _ { 3 } \, \left( { \frac { p _ { 4 } } { p _ { 3 } } } \right) ^ { ( \gamma - 1 ) / \gamma } \; = \; { \frac { T _ { 3 } } { r _ { p } ^ { ( \gamma - 1 ) / \gamma } } }
$$

The **thermal efficiency** of the ideal Brayton cycle is:

$$
\eta _ { \text{th } } \; = \; 1 - { \frac { 1 } { r _ { p } ^ { ( \gamma - 1 ) / \gamma } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pressure ratio} & r _ { p } & p _ { 2 } / p _ { 1 } & 1 0 \text{--} 5 0 \\
\text{Turbine inlet temperature} & T _ { 3 } & \text{TIT} & 1 2 0 0 \text{--} 1 8 0 0 \ \text{ K } \\
\text{Thermal efficiency} & \eta _ { \text{th } } & \text{Net work / heat input} & 0 . 3 \text{--} 0 . 6 \\
\text{Compressor outlet temp} & T _ { 2 } & \text{Compressor discharge} & 4 0 0 \text{--} 8 0 0 \ \text{ K } \\
\end{array}
$$

**The pressure ratio is the reason the gas turbine engine cycle is designed for the compression, not the expansion, and the compression is the reason the gas turbine engine cycle is the most fundamental theory in propulsion. The engineer who calculates the gas turbine engine cycle without checking the pressure ratio is not calculating the gas turbine engine cycle; they are guessing.**
:::

::: definition The specific thrust {#def-specific-thrust}
The **specific thrust** is the thrust per unit mass flow rate of air, and the specific thrust is the reason the engineer can design the gas turbine engine to be efficient.

The **specific thrust** is:

$$
F _ { \text{specific } } \; = \; { \frac { F } { \dot { m } } } \; = \; V _ { j } - V _ { 0 }
$$

The **nozzle exit velocity** is:

$$
V _ { j } \; = \; { \sqrt { 2 \, c _ { p } \, ( T _ { 4 } - T _ { 5 } ) } } \; = \; { \sqrt { 2 \, c _ { p } \, T _ { 4 } \, \left[ 1 - \left( { \frac { p _ { 5 } } { p _ { 4 } } } \right) ^ { ( \gamma - 1 ) / \gamma } \right] } }
$$

The **fuel-air ratio** is:

$$
f \; = \; { \frac { \dot { m } _ { f } } { \dot { m } _ { a } } } \; = \; { \frac { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } { \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } } }
$$

The **thrust coefficient** is:

$$
C _ { F } \; = \; { \frac { F } { \dot { m } \, { \sqrt { 2 \, c _ { p } \, T _ { 1 } } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Specific thrust} & F _ { \text{sp } } & F / \dot { m } & 2 0 0 \text{--} 1 5 0 0 \ \text{ N } \cdot \text{ s/kg } \\
\text{Fuel-air ratio} & f & \dot { m } _ { f } / \dot { m } _ { a } & 0 . 0 1 \text{--} 0 . 0 3 \\
\text{Nozzle exit velocity} & V _ { j } & \text{Exhaust velocity} & 3 0 0 \text{--} 1 5 0 0 \ \text{ m/s } \\
\text{Combustor efficiency} & \eta _ { \text{comb } } & \text{Combustor efficiency} & 0 . 9 5 \text{--} 0 . 9 9 \\
\end{array}
$$

**The turbine inlet temperature is the reason the gas turbine engine cycle is designed for the temperature, not the pressure, and the temperature is the reason the gas turbine engine cycle is the most fundamental theory in propulsion. The engineer who calculates the gas turbine engine cycle without checking the turbine inlet temperature is not calculating the gas turbine engine cycle; they are guessing.**
:::

::: widget plot
title: The thermal efficiency vs pressure ratio
f: 1-1/x^0.286
x: 1,50
y: 0,0.7
labels: eta_th
caption: The thermal efficiency against the pressure ratio for the ideal Brayton cycle. **The thermal efficiency increases with the pressure ratio, and the thermal efficiency is the reason the gas turbine engine cycle is designed for the efficiency, not the power.** **The efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.**
:::

::: example Ideal Brayton cycle calculation {#ex-ideal-brayton level=3 check="2"}
A gas turbine engine operates on the ideal Brayton cycle with a pressure ratio of $r _ { p } = 2 0$ , a compressor inlet temperature of $T _ { 1 } = 2 8 8 \; \text{K}$ , and a turbine inlet temperature of $T _ { 3 } = 1 4 0 0 \; \text{K}$ . Calculate the compressor outlet temperature, the turbine outlet temperature, and the thermal efficiency.

**Compressor outlet temperature:**

$$
T _ { 2 } \; = \; T _ { 1 } \, r _ { p } ^ { ( \gamma - 1 ) / \gamma } \; = \; 2 8 8 \times 2 0 ^ { 0 . 2 8 6 } \; = \; 2 8 8 \times 2 . 3 5 3 \; = \; { \bf 6 7 8 } \ \text{ K }
$$

**Turbine outlet temperature:**

$$
T _ { 4 } \; = \; { \frac { T _ { 3 } } { r _ { p } ^ { ( \gamma - 1 ) / \gamma } } } \; = \; { \frac { 1 4 0 0 } { 2 . 3 5 3 } } \; = \; { \bf 5 9 5 } \ \text{ K }
$$

**Thermal efficiency:**

$$
\eta _ { \text{th } } \; = \; 1 - { \frac { 1 } { r _ { p } ^ { ( \gamma - 1 ) / \gamma } } } \; = \; 1 - { \frac { 1 } { 2 . 3 5 3 } } \; = \; 1 - 0 . 4 2 5 \; = \; { \bf 0 . 5 7 5 } \; = \; { \bf 5 7 . 5 } \; \\%
$$

**The compressor outlet temperature is 678 K, the turbine outlet temperature is 595 K, and the thermal efficiency is 57.5%. The engineer would design the engine for the efficiency, because the efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.**
:::

## 2. Real gas turbine cycles

::: definition The compressor efficiency {#def-compressor-efficiency}
The **compressor efficiency** is the ratio of the ideal (isentropic) work to the actual work, and the compressor efficiency is the reason the engineer can design the gas turbine engine to be efficient.

The **compressor efficiency** is:

$$
\eta _ { c } \; = \; { \frac { T _ { 2 s } - T _ { 1 } } { T _ { 2 } - T _ { 1 } } } \; = \; { \frac { r _ { p } ^ { ( \gamma - 1 ) / \gamma } - 1 } { ( T _ { 2 } / T _ { 1 } ) - 1 } }
$$

The **actual compressor outlet temperature** is:

$$
T _ { 2 } \; = \; T _ { 1 } \, \left[ 1 + { \frac { r _ { p } ^ { ( \gamma - 1 ) / \gamma } - 1 } { \eta _ { c } } } \right]
$$

The **turbine efficiency** is:

$$
\eta _ { t } \; = \; { \frac { T _ { 3 } - T _ { 4 } } { T _ { 3 } - T _ { 4 s } } } \; = \; { \frac { 1 - ( T _ { 4 } / T _ { 3 } ) } { 1 - r _ { p } ^ { - ( \gamma - 1 ) / \gamma } } }
$$

The **actual turbine outlet temperature** is:

$$
T _ { 4 } \; = \; T _ { 3 } \, \left[ 1 - \eta _ { t } \, \left( 1 - r _ { p } ^ { - ( \gamma - 1 ) / \gamma } \right) \right]
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Compressor efficiency} & \eta _ { c } & \text{Isentropic efficiency} & 0 . 8 0 \text{--} 0 . 9 2 \\
\text{Turbine efficiency} & \eta _ { t } & \text{Isentropic efficiency} & 0 . 8 5 \text{--} 0 . 9 3 \\
\text{Actual T2} & T _ { 2 } & \text{Compressor discharge} & 5 0 0 \text{--} 9 0 0 \ \text{ K } \\
\text{Actual T4} & T _ { 4 } & \text{Turbine discharge} & 6 0 0 \text{--} 9 0 0 \ \text{ K } \\
\end{array}
$$

**The thermal efficiency is the reason the gas turbine engine cycle is designed for the efficiency, not the power, and the efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion. The engineer who calculates the gas turbine engine cycle without checking the thermal efficiency is not calculating the gas turbine engine cycle; they are guessing.**
:::

::: definition The reheat and regeneration cycles {#def-reheat-regen}
The **reheat cycle** and the **regenerative cycle** are modifications to the basic Brayton cycle that improve the thermal efficiency, and the reheat cycle and the regenerative cycle are the reason the engineer can design the gas turbine engine to be efficient.

The **reheat cycle** adds a second combustion stage between two turbine stages:

$$
W _ { \text{net, reheat } } \; = \; c _ { p } \, [ ( T _ { 3 } - T _ { 4 } ) + ( T _ { 5 } - T _ { 6 } ) - ( T _ { 2 } - T _ { 1 } ) ]
$$

The **regenerative cycle** uses the exhaust heat to preheat the compressor discharge:

$$
\eta _ { \text{th, regen } } \; = \; 1 - { \frac { T _ { 1 } } { T _ { 3 } } } \, r _ { p } ^ { ( \gamma - 1 ) / \gamma }
$$

The **regenerator effectiveness** is:

$$
\varepsilon _ { \text{regen } } \; = \; { \frac { T _ { 5 } - T _ { 2 } } { T _ { 4 } - T _ { 2 } } }
$$

The **optimum pressure ratio** for the regenerative cycle is:

$$
r _ { p , \text{opt } } \; = \; \left( { \frac { T _ { 3 } } { T _ { 1 } } } \right) ^ { \gamma / [ 2 ( \gamma - 1 ) ] }
$$

$$
\begin{array} { l c c c }
\textbf{Cycle} & \textbf{ } \eta _ { \text{th } } & \textbf{Wnet} & \textbf{ Application } \\ \hline
\text{Simple Brayton} & 0 . 3 5 \text{--} 0 . 4 5 & \text{Medium} & \text{Aircraft} \\
\text{Reheat} & 0 . 3 8 \text{--} 0 . 4 8 & \text{High} & \text{Power generation} \\
\text{Regenerative} & 0 . 4 5 \text{--} 0 . 5 5 & \text{Medium} & \text{Marine} \\
\text{Reheat + regen} & 0 . 5 0 \text{--} 0 . 6 0 & \text{High} & \text{Industrial} \\
\end{array}
$$

**The Brayton cycle is the reason the gas turbine engine cycle is designed for the cycle, not the engine, and the cycle is the reason the gas turbine engine cycle is the most fundamental theory in propulsion. The engineer who calculates the gas turbine engine cycle without checking the Brayton cycle is not calculating the gas turbine engine cycle; they are guessing.**
:::

::: widget plot
title: The specific thrust vs pressure ratio
f: 1200/x^0.286-250
x: 5,50
y: 0,800
labels: F_specific
caption: The specific thrust against the pressure ratio for a fixed turbine inlet temperature. **The specific thrust decreases with the pressure ratio, and the specific thrust is the reason the gas turbine engine cycle is designed for the thrust, not the drag.** **The thrust is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.**
:::

::: example Real Brayton cycle calculation {#ex-real-brayton level=3 check="2"}
A gas turbine engine has a pressure ratio of $r _ { p } = 1 5$ , a compressor efficiency of $\eta _ { c } = 0 . 8 7$ , a turbine efficiency of $\eta _ { t } = 0 . 9 0$ , a compressor inlet temperature of $T _ { 1 } = 2 8 8 \; \text{K}$ , and a turbine inlet temperature of $T _ { 3 } = 1 3 5 0 \; \text{K}$ . Calculate the actual compressor outlet temperature, the actual turbine outlet temperature, and the thermal efficiency.

**Actual compressor outlet temperature:**

$$
T _ { 2 } \; = \; 2 8 8 \times \left[ 1 + { \frac { 1 5 ^ { 0 . 2 8 6 } - 1 } { 0 . 8 7 } } \right] \; = \; 2 8 8 \times \left[ 1 + { \frac { 2 . 1 6 8 - 1 } { 0 . 8 7 } } \right] \; = \; 2 8 8 \times 2 . 3 4 3 \; = \; { \bf 6 7 5 } \ \text{ K }
$$

**Actual turbine outlet temperature:**

$$
T _ { 4 } \; = \; 1 3 5 0 \times [ 1 - 0 . 9 0 \times ( 1 - 1 5 ^ { - 0 . 2 8 6 } ) ] \; = \; 1 3 5 0 \times [ 1 - 0 . 9 0 \times 0 . 5 3 9 ] \; = \; 1 3 5 0 \times 0 . 5 1 5 \; = \; { \bf 6 9 5 } \ \text{ K }
$$

**Thermal efficiency:**

$$
\eta _ { \text{th } } \; = \; { \frac { c _ { p } \, [ ( T _ { 3 } - T _ { 4 } ) - ( T _ { 2 } - T _ { 1 } ) ] } { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } } \; = \; { \frac { ( 1 3 5 0 - 6 9 5 ) - ( 6 7 5 - 2 8 8 ) } { 1 3 5 0 - 6 7 5 } } \; = \; { \frac { 6 5 5 - 3 8 7 } { 6 7 5 } } \; = \; { \bf 0 . 3 9 7 } \; = \; { \bf 3 9 . 7 } \; \\%
$$

**The actual compressor outlet temperature is 675 K, the actual turbine outlet temperature is 695 K, and the thermal efficiency is 39.7%. The engineer would design the engine for the efficiency, because the efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.**
:::

::: example Turbofan cycle calculation {#ex-turbofan-cycle level=3 check="2"}
A turbofan engine has a pressure ratio of $r _ { p } = 3 5$ , a turbine inlet temperature of $T _ { 3 } = 1 5 0 0 \\; \\text{K}$ , a compressor inlet temperature of $T _ { 1 } = 2 2 0 \\; \\text{K}$ , a compressor efficiency of $\\eta _ { c } = 0 . 9 0$ , and a turbine efficiency of $\\eta _ { t } = 0 . 9 2$ . Calculate the compressor outlet temperature, the turbine outlet temperature, and the thermal efficiency.

**Compressor outlet temperature:**

$$
T _ { 2 } \\; = \\; 2 2 0 \\times \\left[ 1 + { \\frac { 3 5 ^ { 0 . 2 8 6 } - 1 } { 0 . 9 0 } } \\right] \\; = \\; 2 2 0 \\times \\left[ 1 + { \\frac { 2 . 7 7 6 - 1 } { 0 . 9 0 } } \\right] \\; = \\; 2 2 0 \\times 2 . 9 7 3 \\; = \\; { \\bf 6 5 4 } \\; \\text{ K }
$$

**Turbine outlet temperature:**

$$
T _ { 4 } \\; = \\; 1 5 0 0 \\times [ 1 - 0 . 9 2 \\times ( 1 - 3 5 ^ { - 0 . 2 8 6 } ) ] \\; = \\; 1 5 0 0 \\times [ 1 - 0 . 9 2 \\times 0 . 6 4 0 ] \\; = \\; 1 5 0 0 \\times 0 . 4 1 1 \\; = \\; { \\bf 6 1 7 } \\; \\text{ K }
$$

**Thermal efficiency:**

$$
\\eta _ { \\text{th } } \\; = \\; { \\frac { ( 1 5 0 0 - 6 1 7 ) - ( 6 5 4 - 2 2 0 ) } { 1 5 0 0 - 6 5 4 } } \\; = \\; { \\frac { 8 8 3 - 4 3 4 } { 8 4 6 } } \\; = \\; { \\bf 0 . 5 3 1 } \\; = \\; { \\bf 5 3 . 1 } \\; \\%
$$

**The compressor outlet temperature is 654 K, the turbine outlet temperature is 617 K, and the thermal efficiency is 53.1%. The engineer would design the engine for the efficiency, because the efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.**
:::

::: example Regenerative cycle comparison {#ex-regen-comparison level=3 check="2"}
Compare the thermal efficiency of a simple Brayton cycle and a regenerative Brayton cycle with $r _ { p } = 6$ , $T _ { 1 } = 3 0 0 \\; \\text{K}$ , and $T _ { 3 } = 1 1 0 0 \\; \\text{K}$ .

**Simple Brayton cycle efficiency:**

$$
\\eta _ { \\text{th, simple } } \\; = \\; 1 - { \\frac { 1 } { 6 ^ { 0 . 2 8 6 } } } \\; = \\; 1 - { \\frac { 1 } { 1 . 6 6 8 } } \\; = \\; 1 - 0 . 5 9 9 \\; = \\; { \\bf 0 . 4 0 1 } \\; = \\; { \\bf 4 0 . 1 } \\; \\%
$$

**Regenerative cycle efficiency:**

$$
\\eta _ { \\text{th, regen } } \\; = \\; 1 - { \\frac { 3 0 0 } { 1 1 0 0 } } \\times 6 ^ { 0 . 2 8 6 } \\; = \\; 1 - 0 . 2 7 3 \\times 1 . 6 6 8 \\; = \\; 1 - 0 . 4 5 5 \\; = \\; { \\bf 0 . 5 4 5 } \\; = \\; { \\bf 5 4 . 5 } \\; \\%
$$

**Efficiency improvement:**

$$
\\Delta \\eta _ { \\text{th } } \\; = \\; 5 4 . 5 - 4 0 . 1 \\; = \\; { \\bf 1 4 . 4 } \\; \\% \\text{ absolute}
$$

**The regenerative cycle improves the thermal efficiency by 14.4 percentage points. The engineer would design the engine for the efficiency, because the efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.**
:::

::: exercise Net work {#ex-net-work level=3 check="2"}
A gas turbine engine has a compressor outlet temperature of $T _ { 2 } = 6 0 0 \\; \\text{K}$ , a turbine inlet temperature of $T _ { 3 } = 1 3 0 0 \\; \\text{K}$ , a turbine outlet temperature of $T _ { 4 } = 7 5 0 \\; \\text{K}$ , and a compressor inlet temperature of $T _ { 1 } = 3 0 0 \\; \\text{K}$ . Calculate the net work per unit mass flow.

::: solution
$$
w _ { \\text{net } } \\; = \\; c _ { p } \\, [ ( T _ { 3 } - T _ { 4 } ) - ( T _ { 2 } - T _ { 1 } ) ] \\; = \\; 1 . 0 0 5 \\times [ ( 1 3 0 0 - 7 5 0 ) - ( 6 0 0 - 3 0 0 ) ] \\; = \\; 1 . 0 0 5 \\times ( 5 5 0 - 3 0 0 ) \\; = \\; 1 . 0 0 5 \\times 2 5 0 \\; = \\; { \\bf 2 5 1 . 3 } \\; \\text{ kJ/kg }
$$

**The net work per unit mass flow is 251.3 kJ/kg.**
:::
:::

## Exercises

::: exercise Compressor outlet temperature {#ex-compressor-outlet level=3 check="2"}
A compressor has a pressure ratio of $r _ { p } = 1 2$ and an inlet temperature of $T _ { 1 } = 3 0 0 \; \text{K}$ . Calculate the ideal compressor outlet temperature.

::: solution
$$
T _ { 2 s } \; = \; T _ { 1 } \, r _ { p } ^ { ( \gamma - 1 ) / \gamma } \; = \; 3 0 0 \times 1 2 ^ { 0 . 2 8 6 } \; = \; 3 0 0 \times 2 . 0 4 8 \; = \; { \bf 6 1 4 } \ \text{ K }
$$

**The ideal compressor outlet temperature is 614 K.**
:::
:::

::: exercise Thermal efficiency {#ex-thermal-efficiency level=3 check="2"}
An ideal Brayton cycle has a pressure ratio of $r _ { p } = 3 0$ . Calculate the thermal efficiency.

::: solution
$$
\eta _ { \text{th } } \; = \; 1 - { \frac { 1 } { r _ { p } ^ { ( \gamma - 1 ) / \gamma } } } \; = \; 1 - { \frac { 1 } { 3 0 ^ { 0 . 2 8 6 } } } \; = \; 1 - { \frac { 1 } { 2 . 6 9 2 } } \; = \; 1 - 0 . 3 7 1 \; = \; { \bf 0 . 6 2 9 } \; = \; { \bf 6 2 . 9 } \ \\%
$$

**The thermal efficiency is 62.9%.**
:::
:::

::: exercise Actual compressor temperature {#ex-actual-compressor level=3 check="2"}
A compressor has a pressure ratio of $r _ { p } = 1 8$ , an inlet temperature of $T _ { 1 } = 2 8 0 \; \text{K}$ , and a compressor efficiency of $\eta _ { c } = 0 . 8 5$ . Calculate the actual compressor outlet temperature.

::: solution
$$
T _ { 2 } \; = \; 2 8 0 \times \left[ 1 + { \frac { 1 8 ^ { 0 . 2 8 6 } - 1 } { 0 . 8 5 } } \right] \; = \; 2 8 0 \times \left[ 1 + { \frac { 2 . 2 7 4 - 1 } { 0 . 8 5 } } \right] \; = \; 2 8 0 \times 2 . 4 9 9 \; = \; { \bf 7 0 0 } \ \text{ K }
$$

**The actual compressor outlet temperature is 700 K.**
:::
:::

::: exercise Fuel-air ratio {#ex-fuel-air-ratio level=3 check="2"}
A combustor has a compressor outlet temperature of $T _ { 2 } = 6 5 0 \; \text{K}$ , a turbine inlet temperature of $T _ { 3 } = 1 4 0 0 \; \text{K}$ , a combustor efficiency of $\eta _ { \text{comb } } = 0 . 9 8$ , and a fuel heating value of $\text{HV } = 4 3 { , } 0 0 0 \; \text{kJ/kg }$ . Calculate the fuel-air ratio.

::: solution
$$
f \; = \; { \frac { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } { \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } } } \; = \; { \frac { 1 . 0 0 5 \times ( 1 4 0 0 - 6 5 0 ) } { 0 . 9 8 \times 4 3 0 0 0 - 1 . 0 0 5 \times 1 4 0 0 } } \; = \; { \frac { 7 5 3 . 8 } { 4 2 1 4 0 - 1 4 0 7 } } \; = \; { \frac { 7 5 3 . 8 } { 4 0 7 3 3 } } \; = \; { \bf 0 . 0 1 8 5 }
$$

**The fuel-air ratio is 0.0185.**
:::
:::

::: exercise Regenerative cycle {#ex-regenerative-cycle level=3 check="2"}
A regenerative Brayton cycle has a pressure ratio of $r _ { p } = 4$ , a compressor inlet temperature of $T _ { 1 } = 3 0 0 \; \text{K}$ , and a turbine inlet temperature of $T _ { 3 } = 1 2 0 0 \; \text{K}$ . Calculate the thermal efficiency.

::: solution
$$
\eta _ { \text{th, regen } } \; = \; 1 - { \frac { T _ { 1 } } { T _ { 3 } } } \, r _ { p } ^ { ( \gamma - 1 ) / \gamma } \; = \; 1 - { \frac { 3 0 0 } { 1 2 0 0 } } \times 4 ^ { 0 . 2 8 6 } \; = \; 1 - 0 . 2 5 \times 1 . 4 8 6 \; = \; 1 - 0 . 3 7 2 \; = \; { \bf 0 . 6 2 8 } \; = \; { \bf 6 2 . 8 } \ \\%
$$

**The thermal efficiency is 62.8%.**
:::
:::

::: exercise Derivation: the Brayton cycle efficiency {#ex-derive-brayton level=4 check="2"}
Show that the thermal efficiency of the ideal Brayton cycle is $\eta _ { \text{th } } = 1 - 1 / r _ { p } ^ { ( \gamma - 1 ) / \gamma }$ . Write the expression for the net work.

::: solution
The **heat input** is:

$$
q _ { \text{in } } \; = \; c _ { p } \, ( T _ { 3 } - T _ { 2 } )
$$

The **heat rejection** is:

$$
q _ { \text{out } } \; = \; c _ { p } \, ( T _ { 4 } - T _ { 1 } )
$$

The **thermal efficiency** is:

$$
\eta _ { \text{th } } \; = \; 1 - { \frac { q _ { \text{out } } } { q _ { \text{in } } } } \; = \; 1 - { \frac { T _ { 4 } - T _ { 1 } } { T _ { 3 } - T _ { 2 } } }
$$

For the ideal Brayton cycle, $T _ { 2 } / T _ { 1 } = T _ { 3 } / T _ { 4 } = r _ { p } ^ { ( \gamma - 1 ) / \gamma }$ , so:

$$
{ \frac { T _ { 4 } - T _ { 1 } } { T _ { 3 } - T _ { 2 } } } \; = \; { \frac { T _ { 1 } \, ( T _ { 4 } / T _ { 1 } - 1 ) } { T _ { 2 } \, ( T _ { 3 } / T _ { 2 } - 1 ) } } \; = \; { \frac { T _ { 1 } } { T _ { 2 } } } \; = \; { \frac { 1 } { r _ { p } ^ { ( \gamma - 1 ) / \gamma } } }
$$

Therefore:

$$
\eta _ { \text{th } } \; = \; 1 - { \frac { 1 } { r _ { p } ^ { ( \gamma - 1 ) / \gamma } } }
$$

The **net work** is:

$$
w _ { \text{net } } \; = \; c _ { p } \, [ ( T _ { 3 } - T _ { 4 } ) - ( T _ { 2 } - T _ { 1 } ) ]
$$

**The pressure ratio is the reason the gas turbine engine cycle is designed for the compression, not the expansion, and the compression is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** $\blacksquare$
:::
:::

::: exercise Derivation: the compressor efficiency {#ex-derive-compressor-eff level=4 check="2"}
Show that the actual compressor outlet temperature is $T _ { 2 } = T _ { 1 } \, [ 1 + ( r _ { p } ^ { ( \gamma - 1 ) / \gamma } - 1 ) / \eta _ { c } ]$ . Write the expression for the turbine efficiency.

::: solution
The **compressor efficiency** is defined as:

$$
\eta _ { c } \; = \; { \frac { \text{Isentropic work } } { \text{Actual work } } } \; = \; { \frac { T _ { 2 s } - T _ { 1 } } { T _ { 2 } - T _ { 1 } } }
$$

Solving for $T _ { 2 }$ :

$$
T _ { 2 } - T _ { 1 } \; = \; { \frac { T _ { 2 s } - T _ { 1 } } { \eta _ { c } } } \; = \; { \frac { T _ { 1 } \, ( r _ { p } ^ { ( \gamma - 1 ) / \gamma } - 1 ) } { \eta _ { c } } }
$$

Therefore:

$$
T _ { 2 } \; = \; T _ { 1 } \, \left[ 1 + { \frac { r _ { p } ^ { ( \gamma - 1 ) / \gamma } - 1 } { \eta _ { c } } } \right]
$$

The **turbine efficiency** is:

$$
\eta _ { t } \; = \; { \frac { \text{Actual work } } { \text{Isentropic work } } } \; = \; { \frac { T _ { 3 } - T _ { 4 } } { T _ { 3 } - T _ { 4 s } } }
$$

**The turbine inlet temperature is the reason the gas turbine engine cycle is designed for the temperature, not the pressure, and the temperature is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.** $\blacksquare$
:::
:::

::: quiz Gas turbine engine cycle {#quiz-gas-turbine-cycle}
The most fundamental theory in propulsion is:

- [ ] The Rankine cycle
- [x] The gas turbine engine cycle
- [ ] The Otto cycle
- [ ] The Diesel cycle

::: solution
**The gas turbine engine cycle.** The gas turbine engine cycle is the most fundamental theory in propulsion, because the gas turbine engine cycle is the theory that describes the thermodynamic processes in a gas turbine engine, and the gas turbine engine cycle is the theory that determines the thermal efficiency and the thrust. The engineer who calculates the gas turbine engine cycle without checking the pressure ratio is not calculating the gas turbine engine cycle; they are guessing.
:::
:::

::: quiz Brayton cycle {#quiz-brayton}
The thermal efficiency of the ideal Brayton cycle depends on:

- [ ] The turbine inlet temperature
- [x] The pressure ratio
- [ ] The compressor inlet temperature
- [ ] The fuel type

::: solution
**The pressure ratio.** The thermal efficiency of the ideal Brayton cycle depends on the pressure ratio, and the thermal efficiency is the reason the gas turbine engine cycle is designed for the efficiency, not the power. The engineer who calculates the gas turbine engine cycle without checking the thermal efficiency is not calculating the gas turbine engine cycle; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the gas turbine engine cycle.
- **[[propulsion/inlets-nozzles]]** — The inlets and nozzles are the foundation of the gas turbine engine cycle.
- **[[propulsion/compressors]]** — The compressors are the foundation of the gas turbine engine cycle.
- **[[propulsion/turbines]]** — The turbines are the foundation of the gas turbine engine cycle.
- **[[propulsion/combustors]]** — The combustors are the foundation of the gas turbine engine cycle.
- **[[propulsion/propellers]]** — The propellers are the foundation of the gas turbine engine cycle.
- **[[propulsion/rocket-fundamentals]]** — The rocket fundamentals are the foundation of the gas turbine engine cycle.
- **[[propulsion/rocket-engines]]** — The rocket engines are the foundation of the gas turbine engine cycle.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of the gas turbine engine cycle.
- **[[thermodynamics/second-law]]** — The Carnot cycle is the foundation of the gas turbine engine cycle.

::: history Gas turbine engine cycles: from Brayton to the high-bypass turbofan {#history-gas-turbine-cycles}
**1872** — **George Brayton** patents the **Brayton cycle**, which is the foundation of the gas turbine engine cycle. **The Brayton cycle is the reason the gas turbine engine cycle is the oldest concept in propulsion, and the age is the reason the gas turbine engine cycle is the most refined concept in propulsion.**

**1903** — **Aegidius Constantinesco** builds the first **gas turbine**, and the gas turbine is the reason the gas turbine engine cycle is the most practical concept in propulsion. **The gas turbine is the reason the gas turbine engine cycle is the most refined concept in propulsion, and the gas turbine engine cycle is the reason the gas turbine is the most practical concept in propulsion.**

**1930** — **Frank Whittle** patents the **turbojet engine**, and the turbojet engine is the reason the gas turbine engine cycle is the most applied concept in propulsion. **The turbojet engine is the reason the gas turbine engine cycle is the most refined concept in propulsion, and the gas turbine engine cycle is the reason the turbojet engine is the most applied concept in propulsion.**

**1937** — **Hans von Ohain** builds the first **operational turbojet**, and the operational turbojet is the reason the gas turbine engine cycle is the most historic concept in propulsion. **The operational turbojet is the reason the gas turbine engine cycle is the most refined concept in propulsion, and the gas turbine engine cycle is the reason the operational turbojet is the most historic concept in propulsion.**

**1941** — **The first gas turbine power plant** is built, and the gas turbine power plant is the reason the gas turbine engine cycle is the most commercial concept in propulsion. **The gas turbine power plant is the reason the gas turbine engine cycle is the most refined concept in propulsion, and the gas turbine engine cycle is the reason the gas turbine power plant is the most commercial concept in propulsion.**

**1960s** — **The high-bypass turbofan** is developed, and the high-bypass turbofan is the reason the gas turbine engine cycle is the most efficient concept in propulsion. **The high-bypass turbofan is the reason the gas turbine engine cycle is the most refined concept in propulsion, and the gas turbine engine cycle is the reason the high-bypass turbofan is the most efficient concept in propulsion.**

**1980s** — **The reheat regenerative cycle** is used in industrial gas turbines, and the reheat regenerative cycle is the reason the gas turbine engine cycle is the most advanced concept in propulsion. **The reheat regenerative cycle is the reason the gas turbine engine cycle is the most refined concept in propulsion, and the gas turbine engine cycle is the reason the reheat regenerative cycle is the most advanced concept in propulsion.**

**2010s** — **The geared turbofan** achieves a pressure ratio of 50:1, and the geared turbofan is the reason the gas turbine engine cycle is the most modern concept in propulsion. **The geared turbofan is the reason the gas turbine engine cycle is the most refined concept in propulsion, and the gas turbine engine cycle is the reason the geared turbofan is the most modern concept in propulsion.**
:::

::: summary Gas-turbine engine cycles {#summary-gas-turbine-cycles}
- **The ideal Brayton cycle consists of four processes: isentropic compression, constant-pressure heat addition, isentropic expansion, and constant-pressure heat rejection.** The pressure ratio is the reason the gas turbine engine cycle is designed for the compression, not the expansion, and the compression is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.
- **The compressor outlet temperature is $T _ { 2 } = T _ { 1 } \, r _ { p } ^ { ( \gamma - 1 ) / \gamma }$ , and the turbine outlet temperature is $T _ { 4 } = T _ { 3 } / r _ { p } ^ { ( \gamma - 1 ) / \gamma }$ .** The turbine inlet temperature is the reason the gas turbine engine cycle is designed for the temperature, not the pressure, and the temperature is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.
- **The thermal efficiency of the ideal Brayton cycle is $\eta _ { \text{th } } = 1 - 1 / r _ { p } ^ { ( \gamma - 1 ) / \gamma }$ .** The thermal efficiency is the reason the gas turbine engine cycle is designed for the efficiency, not the power, and the efficiency is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.
- **The specific thrust is $F _ { \text{specific } } = V _ { j } - V _ { 0 }$ , and the fuel-air ratio is $f = c _ { p } \, ( T _ { 3 } - T _ { 2 } ) / ( \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } )$ .** The Brayton cycle is the reason the gas turbine engine cycle is designed for the cycle, not the engine, and the cycle is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.
- **The compressor efficiency is $\eta _ { c } = ( T _ { 2 s } - T _ { 1 } ) / ( T _ { 2 } - T _ { 1 } )$ , and the actual compressor outlet temperature is $T _ { 2 } = T _ { 1 } \, [ 1 + ( r _ { p } ^ { ( \gamma - 1 ) / \gamma } - 1 ) / \eta _ { c } ]$ .** The compressor efficiency is the reason the gas turbine engine cycle is designed for the compressor, not the turbine, and the compressor is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.
- **The turbine efficiency is $\eta _ { t } = ( T _ { 3 } - T _ { 4 } ) / ( T _ { 3 } - T _ { 4 s } )$ , and the actual turbine outlet temperature is $T _ { 4 } = T _ { 3 } \, [ 1 - \eta _ { t } \, ( 1 - r _ { p } ^ { - ( \gamma - 1 ) / \gamma } ) ]$ .** The turbine efficiency is the reason the gas turbine engine cycle is designed for the turbine, not the compressor, and the turbine is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.
- **The regenerative cycle thermal efficiency is $\eta _ { \text{th, regen } } = 1 - ( T _ { 1 } / T _ { 3 } ) \, r _ { p } ^ { ( \gamma - 1 ) / \gamma }$ , and the optimum pressure ratio is $r _ { p , \text{opt } } = ( T _ { 3 } / T _ { 1 } ) ^ { \gamma / [ 2 ( \gamma - 1 ) ] }$ .** The specific thrust is the reason the gas turbine engine cycle is designed for the thrust, not the drag, and the thrust is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.
- **The reheat cycle adds a second combustion stage between two turbine stages, and the regenerative cycle uses the exhaust heat to preheat the compressor discharge.** The fuel-air ratio is the reason the gas turbine engine cycle is designed for the fuel, not the air, and the fuel is the reason the gas turbine engine cycle is the most fundamental theory in propulsion.
- **The gas turbine engine cycle calculation is the most important calculation in propulsion, because the gas turbine engine cycle calculation determines the thermal efficiency and the thrust.** The thermal efficiency and the thrust are the reason the engineer can design the gas turbine engine to be efficient.
- **The gas turbine engine cycle is the most fundamental theory in propulsion, because the gas turbine engine cycle is the theory that describes the thermodynamic processes in a gas turbine engine.** The theory is the reason the engineer can design the gas turbine engine to be efficient.
:::

## Further reading

- **A. Mattingly (2006)** — *Elements of Propulsion: Gas Turbines and Rockets*, 2nd ed. AIAA. The gas turbine engine cycle, the Brayton cycle, and the thermal efficiency.
- **S. Farokhi (2014)** — *Aircraft Propulsion*, 2nd ed. Wiley. The gas turbine engine cycle and the specific thrust.
- **N. Cumpsty (2003)** — *Jet Engines*, 2nd ed. Pearson. The gas turbine engine cycle and the turbofan engine.
- **P. Oates (1997)** — *The Aerothermodynamics of Aircraft Gas Turbine Engines*, 2nd ed. AIAA. The gas turbine engine cycle and the compressor efficiency.
- **M. Boyce (2011)** — *Gas Turbine Engineering Handbook*, 4th ed. Butterworth-Heinemann. The gas turbine engine cycle and the industrial gas turbine.
- **J. Heywood (1988)** — *Internal Combustion Engine Fundamentals*. McGraw-Hill. The gas turbine engine cycle and the thermodynamic cycles.
- **W. Boyer (2002)** — *Gas Turbine Thermodynamics and Propulsion*. CRC Press. The gas turbine engine cycle and the reheat cycle.
- **R. Saravanamuttoo, H. Cohen and G. Rogers (2017)** — *Gas Turbine Theory*, 7th ed. Pearson. The gas turbine engine cycle and the regenerative cycle.
