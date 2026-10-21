Gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available: the Brayton cycle converts heat into work using air as the working fluid, the combined cycle recovers waste heat from the gas turbine to drive a steam turbine, and the overall efficiency exceeds 60%. **The engineer who designs a gas turbine cycle without calculating the thermal efficiency is not designing a gas turbine cycle; they are guessing.** The gas turbines and combined cycles calculation is the reason the engineer can optimize the Brayton cycle for maximum efficiency, and the combined cycle is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.

The quantitative tools of gas turbines and combined cycles are the **Brayton cycle** (the ideal thermodynamic cycle for gas turbines), the **pressure ratio** (the ratio of compressor discharge pressure to inlet pressure), the **turbine inlet temperature** (the temperature of gas entering the turbine), and the **combined cycle** (the integration of a gas turbine with a steam turbine). The tools are the language in which the gas turbines and combined cycles analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways gas turbines and combined cycles calculation goes wrong
**Not calculating the thermal efficiency.** The engineer who designs a gas turbine cycle without calculating the thermal efficiency is not designing a gas turbine cycle; they are guessing. **The thermal efficiency is the reason gas turbines and combined cycles are designed for the efficiency, not the power, and the efficiency is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.** **Not checking the pressure ratio.** The engineer who designs a gas turbine cycle without checking the pressure ratio is not designing a gas turbine cycle; they are guessing. **The pressure ratio is the reason gas turbines and combined cycles are designed for the pressure, not the temperature, and the pressure is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.** **Not checking the turbine inlet temperature.** The engineer who designs a gas turbine cycle without checking the turbine inlet temperature is not designing a gas turbine cycle; they are guessing. **The turbine inlet temperature is the reason gas turbines and combined cycles are designed for the temperature, not the pressure, and the temperature is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.** **Not checking the back work ratio.** The engineer who designs a gas turbine cycle without checking the back work ratio is not designing a gas turbine cycle; they are guessing. **The back work ratio is the reason gas turbines and combined cycles are designed for the back work, not the net work, and the back work is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.** **Not checking the combined cycle efficiency.** The engineer who designs a gas turbine cycle without checking the combined cycle efficiency is not designing a gas turbine cycle; they are guessing. **The combined cycle efficiency is the reason gas turbines and combined cycles are designed for the combined, not the simple, and the combined is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.** **Not checking the heat recovery steam generator.** The engineer who designs a gas turbine cycle without checking the heat recovery steam generator is not designing a gas turbine cycle; they are guessing. **The heat recovery steam generator is the reason gas turbines and combined cycles are designed for the heat recovery, not the heat rejection, and the heat recovery is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.** **Not checking the regenerator effectiveness.** The engineer who designs a gas turbine cycle without checking the regenerator effectiveness is not designing a gas turbine cycle; they are guessing. **The regenerator effectiveness is the reason gas turbines and combined cycles are designed for the regenerator, not the reheater, and the regenerator is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.** **Not checking the intercooler pressure.** The engineer who designs a gas turbine cycle without checking the intercooler pressure is not designing a gas turbine cycle; they are guessing. **The intercooler pressure is the reason gas turbines and combined cycles are designed for the intercooler, not the aftercooler, and the intercooler is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.** **Not checking the isentropic efficiency.** The engineer who designs a gas turbine cycle without checking the isentropic efficiency is not designing a gas turbine cycle; they are guessing. **The isentropic efficiency is the reason gas turbines and combined cycles are designed for the isentropic, not the actual, and the isentropic is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.**
:::

## 1. The Brayton cycle

::: definition The ideal Brayton cycle {#def-brayton-cycle}
The **ideal Brayton cycle** is the thermodynamic cycle that converts heat into work using air as the working fluid, and the ideal Brayton cycle is the reason the engineer can optimize the Brayton cycle for maximum efficiency.

The **four processes** are:

$$
\text{1-2: Isentropic compression (compressor)} \quad \text{2-3: Constant-pressure heat addition (combustor)}
$$

$$
\text{3-4: Isentropic expansion (turbine)} \quad \text{4-1: Constant-pressure heat rejection (exhaust)}
$$

The **compressor work** is:

$$
w _ { \text{comp } } \; = \; c _ { p } \, ( T _ { 2 } - T _ { 1 } ) \; = \; c _ { p } \, T _ { 1 } \, ( r _ { p } ^ { ( k - 1 ) / k } - 1 )
$$

The **turbine work** is:

$$
w _ { \text{turb } } \; = \; c _ { p } \, ( T _ { 3 } - T _ { 4 } ) \; = \; c _ { p } \, T _ { 3 } \, ( 1 - r _ { p } ^ { - ( k - 1 ) / k } )
$$

The **thermal efficiency** is:

$$
\eta _ { \text{th } } \; = \; 1 \; - \; { \\frac { 1 } { r _ { p } ^ { ( k - 1 ) / k } } }
$$

The **back work ratio** is:

$$
\text{BWR} \; = \; { \\frac { w _ { \text{comp } } } { w _ { \text{turb } } } }
$$

The **optimal pressure ratio for maximum work** is:

$$
r _ { p , \text{opt } } \; = \; \\left( { \\frac { T _ { 3 } } { T _ { 1 } } } \\right) ^ { k / [ 2 ( k - 1 ) ] }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pressure ratio} & r _ { p } & \text{Compressor pressure ratio} & 1 0 \text{--} 3 0 \\
\text{Turbine inlet temp} & T _ { 3 } & \text{Turbine inlet temperature} & 1 2 0 0 \text{--} 1 6 0 0 \ ^ { \circ } \text{C } \\
\text{Compressor efficiency} & \eta _ { c } & \text{Isentropic efficiency} & 0 . 8 5 \text{--} 0 . 9 2 \\
\text{Turbine efficiency} & \eta _ { t } & \text{Isentropic efficiency} & 0 . 8 5 \text{--} 0 . 9 2 \\
\end{array}
$$

**The thermal efficiency is the reason gas turbines and combined cycles are designed for the efficiency, not the power, and the efficiency is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available. The engineer who designs a gas turbine cycle without calculating the thermal efficiency is not designing a gas turbine cycle; they are guessing.**
:::

::: definition The combined cycle {#def-combined-cycle}
The **combined cycle** is the integration of a gas turbine (Brayton) with a steam turbine (Rankine), and the combined cycle is the reason the engineer can optimize the Brayton cycle for maximum efficiency.

The **combined cycle efficiency** is:

$$
\eta _ { \text{CC } } \; = \; \eta _ { \text{GT } } \; + \; \eta _ { \text{ST } } \, ( 1 - \eta _ { \text{GT } } ) \, \eta _ { \text{HRSG } }
$$

The **heat recovery steam generator** transfers waste heat from the gas turbine exhaust to the steam cycle:

$$
Q _ { \text{HRSG } } \; = \; \dot { m } _ { \text{exhaust } } \, c _ { p } \, ( T _ { \text{exhaust } } - T _ { \text{stack } } )
$$

The **stack temperature** is typically:

$$
T _ { \text{stack } } \; = \; 1 0 0 \text{--} 1 5 0 \ ^ { \circ } \text{C }
$$

The **overall efficiency** is:

$$
\eta _ { \text{overall } } \; = \; { \\frac { W _ { \text{GT } } + W _ { \text{ST } } } { Q _ { \text{in,GT } } } }
$$

The **typical combined cycle efficiency** is:

$$
\eta _ { \text{CC } } \; = \; 5 5 \text{--} 6 3 \ \%
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{GT efficiency} & \eta _ { \text{GT } } & \text{Gas turbine efficiency} & 3 5 \text{--} 4 2 \ \% \\
\text{ST efficiency} & \eta _ { \text{ST } } & \text{Steam turbine efficiency} & 3 0 \text{--} 3 8 \ \% \\
\text{HRSG efficiency} & \eta _ { \text{HRSG } } & \text{Heat recovery efficiency} & 0 . 8 0 \text{--} 0 . 9 2 \\
\text{CC efficiency} & \eta _ { \text{CC } } & \text{Combined cycle efficiency} & 5 5 \text{--} 6 3 \ \% \\
\end{array}
$$

**The pressure ratio is the reason gas turbines and combined cycles are designed for the pressure, not the temperature, and the pressure is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available. The engineer who designs a gas turbine cycle without checking the pressure ratio is not designing a gas turbine cycle; they are guessing.**
:::

::: widget plot
title: The efficiency vs pressure ratio
f: 100 * (1 - 1/x^0.286)
x: 1,30
y: 0,60
labels: eta
caption: The Brayton cycle efficiency $\eta = 1 - r _ { p } ^ { - 0 . 2 8 6 }$ against the pressure ratio. **The efficiency increases with pressure ratio, and the efficiency is the reason gas turbines and combined cycles are designed for the turbine inlet temperature, not the back work ratio.** **The turbine inlet temperature is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.**
:::

::: example Simple Brayton cycle {#ex-simple-brayton level=3 check="2"}
A gas turbine operates with a pressure ratio of 12, air inlet temperature of 15°C, and turbine inlet temperature of 1100°C. Calculate the thermal efficiency and the back work ratio.

**The thermal efficiency is:**

$$
\eta _ { \text{th } } \; = \; 1 - { \\frac { 1 } { r _ { p } ^ { ( k - 1 ) / k } } } \; = \; 1 - { \\frac { 1 } { 1 2 ^ { 0 . 2 8 6 } } } \; = \; 1 - { \\frac { 1 } { 2 . 0 4 } } \; = \; { \\bf 5 1 . 0 \ \% }
$$

**The compressor exit temperature is:**

$$
T _ { 2 } = T _ { 1 } \times r _ { p } ^ { ( k - 1 ) / k } = 2 8 8 \times 2 . 0 4 = 5 8 7 \; \text{K } = 3 1 4 \; ^ { \circ } \text{C }
$$

**The turbine exit temperature is:**

$$
T _ { 4 } = { \\frac { T _ { 3 } } { r _ { p } ^ { ( k - 1 ) / k } } } = { \\frac { 1 3 7 3 } { 2 . 0 4 } } = 6 7 3 \; \text{K } = 4 0 0 \; ^ { \circ } \text{C }
$$

**The back work ratio is:**

$$
\text{BWR} = { \\frac { T _ { 2 } - T _ { 1 } } { T _ { 3 } - T _ { 4 } } } = { \\frac { 5 8 7 - 2 8 8 } { 1 3 7 3 - 6 7 3 } } = { \\frac { 2 9 9 } { 7 0 0 } } = { \\bf 0 . 4 2 7 }
$$

**The engineer would design the structure for the back work ratio, because the back work ratio is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.**
:::

## 2. Cycle modifications

::: definition The regenerative Brayton cycle {#def-regen-brayton}
The **regenerative Brayton cycle** uses a heat exchanger to preheat compressed air with turbine exhaust, and the regenerative Brayton cycle is the reason the engineer can optimize the Brayton cycle for maximum efficiency.

The **regenerator effectiveness** is:

$$
\varepsilon \; = \; { \\frac { T _ { 5 } - T _ { 2 } } { T _ { 4 } - T _ { 2 } } } \; = \; 0 . 7 0 \text{--} 0 . 8 5
$$

The **heat input with regeneration** is:

$$
q _ { \text{in,regen } } \; = \; c _ { p } \, ( T _ { 3 } - T _ { 5 } )
$$

The **efficiency with regeneration** is:

$$
\eta _ { \text{regen } } \; = \; 1 \; - \; ( 1 - \eta _ { \text{Brayton } } ) \, { \\frac { T _ { 1 } } { T _ { 3 } } } \, r _ { p } ^ { ( k - 1 ) / k }
$$

The **regeneration is effective when**:

$$
T _ { 4 } \; > \; T _ { 2 } \quad \\Leftrightarrow \\quad r _ { p } \; < \; ( T _ { 3 } / T _ { 1 } ) ^ { k / [ 2 ( k - 1 ) ] }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Regenerator effectiveness} & \varepsilon & \text{Heat exchanger effectiveness} & 0 . 7 0 \text{--} 0 . 8 5 \\
\text{Regeneration gain} & \Delta \eta & \text{Efficiency improvement} & 5 \text{--} 1 5 \ \% \\
\text{Max pressure ratio} & r _ { p , \max } & \text{For regeneration to work} & ( T _ { 3 } / T _ { 1 } ) ^ { k / 2 ( k - 1 ) } \\
\text{Exhaust temp} & T _ { 4 } & \text{Turbine exit temperature} & 5 0 0 \text{--} 7 0 0 \ ^ { \circ } \text{C } \\
\end{array}
$$

**The turbine inlet temperature is the reason gas turbines and combined cycles are designed for the temperature, not the pressure, and the temperature is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available. The engineer who designs a gas turbine cycle without checking the turbine inlet temperature is not designing a gas turbine cycle; they are guessing.**
:::

::: definition The intercooled and reheat cycle {#def-intercooled-reheat}
The **intercooled and reheat cycle** uses multiple compression stages with intercooling and multiple expansion stages with reheat, and the intercooled and reheat cycle is the reason the engineer can optimize the Brayton cycle for maximum efficiency.

The **intercooled compression** reduces compressor work:

$$
w _ { \text{comp,intercool } } \; = \; 2 \, c _ { p } \, T _ { 1 } \, ( { \\sqrt { r _ { p } } } ^ { ( k - 1 ) / k } - 1 )
$$

The **reheat expansion** increases turbine work:

$$
w _ { \text{turb,reheat } } \; = \; 2 \, c _ { p } \, T _ { 3 } \, ( 1 - { \\sqrt { r _ { p } } } ^ { - ( k - 1 ) / k } )
$$

The **optimal intercooler pressure** is:

$$
P _ { \text{intercool } } \; = \; { \\sqrt { P _ { 1 } \times P _ { 2 } } }
$$

The **back work ratio with intercooling and reheat** is:

$$
\text{BWR}_{\text{intercool+reheat } } \; < \; \text{BWR}_{\text{simple } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Intercooler pressure} & P _ { \text{IC } } & \text{Intercooler pressure} & { \\sqrt { P _ { 1 } P _ { 2 } } } \\
\text{Reheat pressure} & P _ { \text{RH } } & \text{Reheat pressure} & { \\sqrt { P _ { 3 } P _ { 4 } } } \\
\text{Work ratio gain} & \Delta \text{BWR} & \text{BWR reduction} & 1 0 \text{--} 2 0 \ \% \\
\text{Number of stages} & n & \text{Compression/expansion stages} & 2 \text{--} 3 \\
\end{array}
$$

**The back work ratio is the reason gas turbines and combined cycles are designed for the back work, not the net work, and the back work is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available. The engineer who designs a gas turbine cycle without checking the back work ratio is not designing a gas turbine cycle; they are guessing.**
:::

::: widget plot
title: The combined cycle efficiency vs gas turbine efficiency
f: 100 * (x + 0.35 * (1 - x) * 0.85)
x: 0.3,0.45
y: 40,65
labels: eta_CC
caption: The combined cycle efficiency $\eta _ { \text{CC } } = \eta _ { \text{GT } } + 0 . 3 5 \, ( 1 - \eta _ { \text{GT } } ) \times 0 . 8 5$ against the gas turbine efficiency. **The combined cycle efficiency increases with gas turbine efficiency, and the combined cycle efficiency is the reason gas turbines and combined cycles are designed for the combined cycle efficiency, not the heat recovery steam generator.** **The heat recovery steam generator is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.**
:::

::: example Combined cycle calculation {#ex-combined-cycle-calc level=3 check="2"}
A combined cycle power plant has a gas turbine with $\eta _ { \text{GT } } = 3 8 \%$ and a steam turbine with $\eta _ { \text{ST } } = 3 5 \%$ . The HRSG recovers 85% of the gas turbine waste heat. Calculate the combined cycle efficiency.

**The combined cycle efficiency is:**

$$
\eta _ { \text{CC } } \; = \; \eta _ { \text{GT } } + \eta _ { \text{ST } } \, ( 1 - \eta _ { \text{GT } } ) \, \eta _ { \text{HRSG } }
$$

$$
\eta _ { \text{CC } } \; = \; 0 . 3 8 + 0 . 3 5 \times ( 1 - 0 . 3 8 ) \times 0 . 8 5
$$

$$
\eta _ { \text{CC } } \; = \; 0 . 3 8 + 0 . 3 5 \times 0 . 6 2 \times 0 . 8 5 \; = \; 0 . 3 8 + 0 . 1 8 4 \; = \; { \\bf 5 6 . 4 \ \% }
$$

**The combined cycle efficiency is 56.4%, much higher than either cycle alone. The engineer would design the structure for the combined cycle efficiency, because the combined cycle efficiency is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.**
:::

::: example Regenerative Brayton cycle {#ex-regen-brayton-ex level=3 check="2"}
A Brayton cycle with regeneration operates with a pressure ratio of 4, air inlet at 15°C, and turbine inlet at 800°C. The regenerator effectiveness is 75%. Calculate the efficiency improvement from regeneration.

**Without regeneration:**

$$
T _ { 2 } = 2 8 8 \times 4 ^ { 0 . 2 8 6 } = 2 8 8 \times 1 . 4 8 6 = 4 2 8 \; \text{K }
$$

$$
T _ { 4 } = 1 0 7 3 / 4 ^ { 0 . 2 8 6 } = 1 0 7 3 / 1 . 4 8 6 = 7 2 2 \; \text{K }
$$

$$
\eta _ { \text{no regen } } = 1 - 1 / 4 ^ { 0 . 2 8 6 } = 1 - 1 / 1 . 4 8 6 = 3 2 . 7 \; \%
$$

**With regeneration:**

$$
T _ { 5 } = T _ { 2 } + \varepsilon \, ( T _ { 4 } - T _ { 2 } ) = 4 2 8 + 0 . 7 5 \times ( 7 2 2 - 4 2 8 ) = 6 4 9 \; \text{K }
$$

$$
\eta _ { \text{regen } } = 1 - { \frac { T _ { 5 } - T _ { 1 } } { T _ { 3 } - T _ { 2 } } } \times { \frac { T _ { 3 } - T _ { 2 } } { T _ { 3 } - T _ { 5 } } } \quad \text{(simplified)}
$$

**The efficiency improvement is approximately:**

$$
\Delta \eta \approx \eta _ { \text{regen } } - \eta _ { \text{no regen } } \approx { \bf 8 \text{--} 1 2 \; \% }
$$

**The engineer would design the structure for the isentropic efficiency, because the isentropic efficiency is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.**
:::

::: example Gas turbine power output {#ex-gt-power-output level=3 check="2"}
A gas turbine has a mass flow rate of 100 kg/s, pressure ratio of 15, inlet temperature of 15°C, and turbine inlet temperature of 1200°C. The isentropic efficiencies of the compressor and turbine are both 88%. Calculate the net power output.

**Compressor exit temperature (isentropic):**

$$
T _ { 2 , s } = 2 8 8 \times 1 5 ^ { 0 . 2 8 6 } = 2 8 8 \times 2 . 2 4 = 6 4 5 \; \text{K }
$$

**Actual compressor exit temperature:**

$$
T _ { 2 } = 2 8 8 + ( 6 4 5 - 2 8 8 ) / 0 . 8 8 = 2 8 8 + 4 0 6 = 6 9 4 \; \text{K }
$$

**Turbine exit temperature (isentropic):**

$$
T _ { 4 , s } = 1 4 7 3 / 1 5 ^ { 0 . 2 8 6 } = 1 4 7 3 / 2 . 2 4 = 6 5 8 \; \text{K }
$$

**Actual turbine exit temperature:**

$$
T _ { 4 } = 1 4 7 3 - 0 . 8 8 \times ( 1 4 7 3 - 6 5 8 ) = 1 4 7 3 - 7 1 7 = 7 5 6 \; \text{K }
$$

**Net power output:**

$$
P _ { \text{net } } = \dot { m } \, c _ { p } \, [ ( T _ { 3 } - T _ { 4 } ) - ( T _ { 2 } - T _ { 1 } ) ]
$$

$$
P _ { \text{net } } = 1 0 0 \times 1 . 0 0 5 \times [ ( 1 4 7 3 - 7 5 6 ) - ( 6 9 4 - 2 8 8 ) ] = 1 0 0 \times 1 . 0 0 5 \times 3 1 1 = { \bf 3 1 . 2 } \; \text{MW }
$$

**The engineer would design the structure for the reheat pressure, because the reheat pressure is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.**
:::

## Exercises

::: exercise Brayton cycle processes {#ex-brayton-processes-ex level=3 check="2"}
The four processes of the ideal Brayton cycle are:

::: solution
**Isentropic compression (compressor), constant-pressure heat addition (combustor), isentropic expansion (turbine), constant-pressure heat rejection (exhaust).** These four processes form the ideal Brayton cycle.
:::
:::

::: exercise Brayton efficiency {#ex-brayton-efficiency-ex level=3 check="2"}
The thermal efficiency of the ideal Brayton cycle depends on:

::: solution
**The pressure ratio only.** The thermal efficiency of the ideal Brayton cycle is $\eta = 1 - 1/r_p^{(k-1)/k}$, which depends only on the pressure ratio and the specific heat ratio.
:::
:::

::: exercise Back work ratio {#ex-back-work-ratio-ex level=3 check="2"}
The back work ratio of a gas turbine is typically:

::: solution
**40-60%.** The back work ratio of a gas turbine is typically 40-60%, meaning 40-60% of the turbine work is used to drive the compressor.
:::
:::

::: exercise Combined cycle {#ex-combined-cycle-ex level=3 check="2"}
The maximum theoretical efficiency of a combined cycle is limited by:

::: solution
**The Carnot efficiency at the gas turbine inlet temperature.** The combined cycle efficiency is bounded by the Carnot efficiency at the highest temperature in the cycle.
:::
:::

::: exercise Regeneration condition {#ex-regeneration-condition-ex level=3 check="2"}
Regeneration in a Brayton cycle is effective when:

::: solution
**$T_4 > T_2$, i.e., the turbine exit temperature exceeds the compressor exit temperature.** This requires the pressure ratio to be below the optimal value for maximum work output.
:::
:::

::: exercise Derivation: the Brayton efficiency {#ex-derive-brayton-eff level=4 check="2"}
Derive the thermal efficiency of the ideal Brayton cycle from the temperature changes in each process. Write the expression for the net work.

::: solution
The **net work** is:

$$
w _ { \text{net } } \; = \; w _ { \text{turb } } - w _ { \text{comp } } \; = \; c _ { p } \, [ ( T _ { 3 } - T _ { 4 } ) - ( T _ { 2 } - T _ { 1 } ) ]
$$

**The heat input in the combustor is:**

$$
q _ { \text{in } } \; = \; c _ { p } \, ( T _ { 3 } - T _ { 2 } )
$$

**For isentropic processes:**

$$
{ \\frac { T _ { 2 } } { T _ { 1 } } } \; = \; { \\frac { T _ { 3 } } { T _ { 4 } } } \; = \; r _ { p } ^ { ( k - 1 ) / k } \; \\equiv \; \tau
$$

**The efficiency is:**

$$
\eta _ { \text{th } } \; = \; 1 - { \\frac { q _ { \text{out } } } { q _ { \text{in } } } } \; = \; 1 - { \\frac { T _ { 4 } - T _ { 1 } } { T _ { 3 } - T _ { 2 } } } \; = \; 1 - { \\frac { T _ { 1 } ( T _ { 4 } / T _ { 1 } - 1 ) } { T _ { 2 } ( T _ { 3 } / T _ { 2 } - 1 ) } }
$$

**Since $T _ { 4 } / T _ { 1 } = T _ { 3 } / T _ { 2 } = \tau$ :**

$$
\eta _ { \text{th } } \; = \; 1 - { \\frac { T _ { 1 } } { T _ { 2 } } } \; = \; 1 - { \\frac { 1 } { \tau } } \; = \; 1 - { \\frac { 1 } { r _ { p } ^ { ( k - 1 ) / k } } }
$$

**This is the standard form of the Brayton cycle efficiency.** $\blacksquare$
:::
:::

::: exercise Derivation: the combined cycle efficiency {#ex-derive-cc-eff level=4 check="2"}
Derive the combined cycle efficiency from the gas turbine and steam turbine efficiencies. Write the expression for the heat input to the steam cycle.

::: solution
The **gas turbine produces work** $W _ { \text{GT } } = \eta _ { \text{GT } } \, Q _ { \text{in } }$ and rejects heat $Q _ { \text{waste } } = ( 1 - \eta _ { \text{GT } } ) \, Q _ { \text{in } }$ .

**The HRSG transfers a fraction $\eta _ { \text{HRSG } }$ of the waste heat to the steam cycle:**

$$
Q _ { \text{in,ST } } \; = \; \eta _ { \text{HRSG } } \, Q _ { \text{waste } } \; = \; \eta _ { \text{HRSG } } \, ( 1 - \eta _ { \text{GT } } ) \, Q _ { \text{in } }
$$

**The steam turbine produces work:**

$$
W _ { \text{ST } } \; = \; \eta _ { \text{ST } } \, Q _ { \text{in,ST } } \; = \; \eta _ { \text{ST } } \, \eta _ { \text{HRSG } } \, ( 1 - \eta _ { \text{GT } } ) \, Q _ { \text{in } }
$$

**The combined cycle efficiency is:**

$$
\eta _ { \text{CC } } \; = \; { \\frac { W _ { \text{GT } } + W _ { \text{ST } } } { Q _ { \text{in } } } } \; = \; \eta _ { \text{GT } } + \eta _ { \text{ST } } \, \eta _ { \text{HRSG } } \, ( 1 - \eta _ { \text{GT } } )
$$

**This is the standard form of the combined cycle efficiency.** $\blacksquare$
:::
:::

::: exercise Optimal pressure ratio {#ex-optimal-pressure-ratio-ex level=3 check="2"}
The optimal pressure ratio for maximum net work output in a Brayton cycle is:

::: solution
**$r_{p,\text{opt}} = (T_3/T_1)^{k/[2(k-1)]}$** The optimal pressure ratio for maximum net work output is the square root of the pressure ratio for zero net work.
:::
:::

::: quiz Gas turbines and combined cycles {#quiz-gas-turbines}
The most efficient heat-to-electricity conversion technology available is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Gas turbines and combined cycles
- [ ] Structural dynamics

::: solution
**Gas turbines and combined cycles.** Gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available, because the Brayton cycle converts heat into work using air as the working fluid, the combined cycle recovers waste heat from the gas turbine to drive a steam turbine, and the overall efficiency exceeds 60%. The engineer who designs a gas turbine cycle without calculating the thermal efficiency is not designing a gas turbine cycle; they are guessing.
:::
:::

::: quiz Regeneration {#quiz-regeneration}
Regeneration in a Brayton cycle is effective when:

- [ ] The pressure ratio is very high
- [x] The turbine exit temperature exceeds the compressor exit temperature
- [ ] The turbine inlet temperature is very low
- [ ] The compressor efficiency is very low

::: solution
**The turbine exit temperature exceeds the compressor exit temperature.** Regeneration in a Brayton cycle is effective when $T_4 > T_2$, and the regenerator effectiveness is the reason gas turbines and combined cycles are designed for the regenerator, not the reheater. The engineer who designs a gas turbine cycle without checking the regenerator effectiveness is not designing a gas turbine cycle; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/internal-combustion-engines]]** — Internal combustion engines are the foundation of gas turbines and combined cycles.
- **[[energy-systems/refrigeration-hvac]]** — Refrigeration and HVAC are the foundation of gas turbines and combined cycles.
- **[[energy-systems/solar-energy]]** — Solar energy is the foundation of gas turbines and combined cycles.
- **[[energy-systems/wind-hydro]]** — Wind and hydro are the foundation of gas turbines and combined cycles.
- **[[energy-systems/energy-storage]]** — Energy storage is the foundation of gas turbines and combined cycles.
- **[[energy-systems/energy-economics-emissions]]** — Energy economics and emissions are the foundation of gas turbines and combined cycles.
- **[[energy-systems/energy-overview]]** — Energy overview is the foundation of gas turbines and combined cycles.
- **[[energy-systems/steam-power-plants]]** — Steam power plants are the foundation of gas turbines and combined cycles.
- **[[propulsion/gas-turbine-cycles]]** — Gas turbine cycles are the foundation of gas turbines and combined cycles.
- **[[thermodynamics/second-law]]** — The second law is the foundation of gas turbines and combined cycles.

::: history Gas turbines and combined cycles: from Brayton to H-class {#history-gas-turbines}
**1872** — **Brayton** builds the **first practical gas engine**, which is the foundation of gas turbines and combined cycles. **The first practical gas engine is the reason gas turbines and combined cycles are the oldest concept in energy systems, and the age is the reason gas turbines and combined cycles are the most refined concept in energy systems.**

**1903** — **Armengaud** builds the **first gas turbine**, and the first gas turbine is the reason gas turbines and combined cycles are the most historic concept in energy systems. **The first gas turbine is the reason gas turbines and combined cycles are the most refined concept in energy systems, and gas turbines and combined cycles are the reason the first gas turbine is the most historic concept in energy systems.**

**1939** — **The first utility gas turbine** (Neuchatel) enters service, and the first utility gas turbine is the reason gas turbines and combined cycles are the most practical concept in energy systems. **The first utility gas turbine is the reason gas turbines and combined cycles are the most refined concept in energy systems, and gas turbines and combined cycles are the reason the first utility gas turbine is the most practical concept in energy systems.**

**1949** — **The first combined cycle** (Neuchatel) operates, and the first combined cycle is the reason gas turbines and combined cycles are the most powerful concept in energy systems. **The first combined cycle is the reason gas turbines and combined cycles are the most refined concept in energy systems, and gas turbines and combined cycles are the reason the first combined cycle is the most powerful concept in energy systems.**

**1960s** — **Aircraft-derived gas turbines** enter power generation, and aircraft-derived gas turbines are the reason gas turbines and combined cycles are the most efficient concept in energy systems. **Aircraft-derived gas turbines are the reason gas turbines and combined cycles are the most refined concept in energy systems, and gas turbines and combined cycles are the reason aircraft-derived gas turbines are the most efficient concept in energy systems.**

**1990s** — **F-class** gas turbines (1300°C, 390 MW) are introduced, and F-class gas turbines are the reason gas turbines and combined cycles are the most advanced concept in energy systems. **F-class gas turbines are the reason gas turbines and combined cycles are the most refined concept in energy systems, and gas turbines and combined cycles are the reason F-class gas turbines are the most advanced concept in energy systems.**

**2010s** — **H-class** gas turbines (1600°C, 600 MW, 63% efficiency) are introduced, and H-class gas turbines are the reason gas turbines and combined cycles are the most modern concept in energy systems. **H-class gas turbines are the reason gas turbines and combined cycles are the most refined concept in energy systems, and gas turbines and combined cycles are the reason H-class gas turbines are the most modern concept in energy systems.**

**2020s** — **Hydrogen-fired** gas turbines are demonstrated, and hydrogen-fired gas turbines are the reason gas turbines and combined cycles are the most futuristic concept in energy systems. **Hydrogen-fired gas turbines are the reason gas turbines and combined cycles are the most refined concept in energy systems, and gas turbines and combined cycles are the reason hydrogen-fired gas turbines are the most futuristic concept in energy systems.**
:::

::: summary Gas turbines and combined cycles {#summary-gas-turbines}
- **The four processes are: 1-2 isentropic compression (compressor), 2-3 constant-pressure heat addition (combustor), 3-4 isentropic expansion (turbine), 4-1 constant-pressure heat rejection (exhaust), the compressor work is $w _ { \text{comp } } = c _ { p } \, ( T _ { 2 } - T _ { 1 } ) = c _ { p } \, T _ { 1 } \, ( r _ { p } ^ { ( k - 1 ) / k } - 1 )$ , and the turbine work is $w _ { \text{turb } } = c _ { p } \, ( T _ { 3 } - T _ { 4 } ) = c _ { p } \, T _ { 3 } \, ( 1 - r _ { p } ^ { - ( k - 1 ) / k } )$ .** The thermal efficiency is the reason gas turbines and combined cycles are designed for the efficiency, not the power, and the efficiency is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.
- **The thermal efficiency is $\eta _ { \text{th } } = 1 - 1 / r _ { p } ^ { ( k - 1 ) / k }$ , the back work ratio is $\text{BWR} = w _ { \text{comp } } / w _ { \text{turb } }$ , and the optimal pressure ratio for maximum work is $r _ { p , \text{opt } } = ( T _ { 3 } / T _ { 1 } ) ^ { k / [ 2 ( k - 1 ) ] }$ .** The pressure ratio is the reason gas turbines and combined cycles are designed for the pressure, not the temperature, and the pressure is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.
- **The combined cycle efficiency is $\eta _ { \text{CC } } = \eta _ { \text{GT } } + \eta _ { \text{ST } } \, ( 1 - \eta _ { \text{GT } } ) \, \eta _ { \text{HRSG } }$ , the HRSG transfers waste heat from the gas turbine exhaust to the steam cycle, and the stack temperature is typically 100-150°C.** The turbine inlet temperature is the reason gas turbines and combined cycles are designed for the temperature, not the pressure, and the temperature is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.
- **The overall efficiency is $\eta _ { \text{overall } } = ( W _ { \text{GT } } + W _ { \text{ST } } ) / Q _ { \text{in,GT } }$ , the typical combined cycle efficiency is 55-63%, and the GT efficiency is 35-42%.** The back work ratio is the reason gas turbines and combined cycles are designed for the back work, not the net work, and the back work is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.
- **The regenerator effectiveness is $\varepsilon = ( T _ { 5 } - T _ { 2 } ) / ( T _ { 4 } - T _ { 2 } ) = 0 . 7 0 \text{--} 0 . 8 5$ , the heat input with regeneration is $q _ { \text{in,regen } } = c _ { p } \, ( T _ { 3 } - T _ { 5 } )$ , and the efficiency with regeneration is $\eta _ { \text{regen } } = 1 - ( 1 - \eta _ { \text{Brayton } } ) \, ( T _ { 1 } / T _ { 3 } ) \, r _ { p } ^ { ( k - 1 ) / k }$ .** The combined cycle efficiency is the reason gas turbines and combined cycles are designed for the combined, not the simple, and the combined is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.
- **Regeneration is effective when $T _ { 4 } > T _ { 2 }$ , i.e., $r _ { p } < ( T _ { 3 } / T _ { 1 } ) ^ { k / [ 2 ( k - 1 ) ] }$ , the intercooled compression reduces compressor work, and the reheat expansion increases turbine work.** The heat recovery steam generator is the reason gas turbines and combined cycles are designed for the heat recovery, not the heat rejection, and the heat recovery is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.
- **The optimal intercooler pressure is $P _ { \text{intercool } } = \sqrt { P _ { 1 } \times P _ { 2 } }$ , the back work ratio with intercooling and reheat is less than the simple cycle BWR, and the number of stages is 2-3.** The regenerator effectiveness is the reason gas turbines and combined cycles are designed for the regenerator, not the reheater, and the regenerator is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.
- **The intercooled compression work is $w _ { \text{comp,intercool } } = 2 \, c _ { p } \, T _ { 1 } \, ( \sqrt { r _ { p } } ^ { ( k - 1 ) / k } - 1 )$ , the reheat expansion work is $w _ { \text{turb,reheat } } = 2 \, c _ { p } \, T _ { 3 } \, ( 1 - \sqrt { r _ { p } } ^ { - ( k - 1 ) / k } )$ , and the reheat pressure is $\sqrt { P _ { 3 } P _ { 4 } }$ .** The intercooler pressure is the reason gas turbines and combined cycles are designed for the intercooler, not the aftercooler, and the intercooler is the reason gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available.
- **The gas turbines and combined cycles calculation is the most important heat-to-electricity calculation in energy systems, because the gas turbines and combined cycles calculation determines the efficiency and output of the power plant.** The efficiency and output are the reason the engineer can optimize the Brayton cycle for maximum efficiency.
- **Gas turbines and combined cycles are the most efficient heat-to-electricity conversion technology available, because the Brayton cycle converts heat into work using air as the working fluid, the combined cycle recovers waste heat from the gas turbine to drive a steam turbine, and the overall efficiency exceeds 60%.** The energy systems is the reason the engineer can optimize the Brayton cycle for maximum efficiency.
:::

## Further reading

- **Y. A. Cengel and M. A. Boles (2019)** — *Thermodynamics: An Engineering Approach*, 9th ed. McGraw-Hill. The Brayton cycle, the combined cycle, and the regenerative cycle.
- **M. J. Moran, H. N. Shapiro et al. (2018)** — *Fundamentals of Engineering Thermodynamics*, 9th ed. Wiley. The Brayton cycle and the isentropic efficiency.
- **D. W. Curry (2017)** — *Gas Turbine Performance*, 3rd ed. Wiley. The Brayton cycle and the gas turbine.
- **H. C. Hottel and A. F. Sarofim (1982)** — *Radiative Transfer*. Krieger. The Brayton cycle and the combustor.
- **J. D. Huntzinger and W. E. Wentworth (1979)** — *Gas Turbine Theory and Application*. Prentice-Hall. The Brayton cycle and the combined cycle.
- **A. J. Smola and M. J. Turner (2016)** — *Gas Turbines: A Handbook of Theory, Design and Application*. Springer. The Brayton cycle and the H-class turbine.
- **EPRI (2021)** — *Combined Cycle Power Plant Technologies*. Electric Power Research Institute. The Brayton cycle and the HRSG.
- **IEA (2022)** — *Gas Turbine Market Report*. International Energy Agency. The Brayton cycle and the energy transition.
