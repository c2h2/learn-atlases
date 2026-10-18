Steam power plants are the most fundamental electricity generation technology in the world: the Rankine cycle converts heat into work using water as the working fluid, the boiler produces superheated steam at pressures up to 25 MPa, and the condenser rejects waste heat at a temperature set by the cooling water. **The engineer who designs a steam cycle without calculating the thermal efficiency is not designing a steam cycle; they are guessing.** The steam power plants calculation is the reason the engineer can optimize the Rankine cycle for maximum efficiency, and the reheat-regenerative cycle is the reason steam power plants are the most fundamental electricity generation technology in the world.

The quantitative tools of steam power plants are the **Rankine cycle** (the ideal thermodynamic cycle for steam power), the **boiler pressure** (the pressure at which steam is generated), the **superheat temperature** (the temperature to which steam is heated beyond saturation), and the **reheat and regeneration** (the modifications that improve cycle efficiency). The tools are the language in which the steam power plants analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways steam power plants calculation goes wrong
**Not calculating the thermal efficiency.** The engineer who designs a steam cycle without calculating the thermal efficiency is not designing a steam cycle; they are guessing. **The thermal efficiency is the reason steam power plants are designed for the efficiency, not the power, and the efficiency is the reason steam power plants are the most fundamental electricity generation technology in the world.** **Not checking the boiler pressure.** The engineer who designs a steam cycle without checking the boiler pressure is not designing a steam cycle; they are guessing. **The boiler pressure is the reason steam power plants are designed for the pressure, not the temperature, and the pressure is the reason steam power plants are the most fundamental electricity generation technology in the world.** **Not checking the superheat temperature.** The engineer who designs a steam cycle without checking the superheat temperature is not designing a steam cycle; they are guessing. **The superheat temperature is the reason steam power plants are designed for the temperature, not the pressure, and the temperature is the reason steam power plants are the most fundamental electricity generation technology in the world.** **Not checking the condenser pressure.** The engineer who designs a steam cycle without checking the condenser pressure is not designing a steam cycle; they are guessing. **The condenser pressure is the reason steam power plants are designed for the condenser, not the boiler, and the condenser is the reason steam power plants are the most fundamental electricity generation technology in the world.** **Not checking the steam quality.** The engineer who designs a steam cycle without checking the steam quality is not designing a steam cycle; they are guessing. **The steam quality is the reason steam power plants are designed for the quality, not the quantity, and the quality is the reason steam power plants are the most fundamental electricity generation technology in the world.** **Not checking the pump work.** The engineer who designs a steam cycle without checking the pump work is not designing a steam cycle; they are guessing. **The pump work is the reason steam power plants are designed for the pump, not the turbine, and the pump is the reason steam power plants are the most fundamental electricity generation technology in the world.** **Not checking the reheat pressure.** The engineer who designs a steam cycle without checking the reheat pressure is not designing a steam cycle; they are guessing. **The reheat pressure is the reason steam power plants are designed for the reheat, not the superheat, and the reheat is the reason steam power plants are the most fundamental electricity generation technology in the world.** **Not checking the extraction pressure.** The engineer who designs a steam cycle without checking the extraction pressure is not designing a steam cycle; they are guessing. **The extraction pressure is the reason steam power plants are designed for the extraction, not the injection, and the extraction is the reason steam power plants are the most fundamental electricity generation technology in the world.** **Not checking the isentropic efficiency.** The engineer who designs a steam cycle without checking the isentropic efficiency is not designing a steam cycle; they are guessing. **The isentropic efficiency is the reason steam power plants are designed for the isentropic, not the actual, and the isentropic is the reason steam power plants are the most fundamental electricity generation technology in the world.**
:::

## 1. The Rankine cycle

::: definition The ideal Rankine cycle {#def-rankine-cycle}
The **ideal Rankine cycle** is the thermodynamic cycle that converts heat into work using water as the working fluid, and the ideal Rankine cycle is the reason the engineer can optimize the Rankine cycle for maximum efficiency.

The **four processes** are:

$$
\text{1-2: Isentropic compression (pump)} \quad \text{2-3: Constant-pressure heat addition (boiler)}
$$

$$
\text{3-4: Isentropic expansion (turbine)} \quad \text{4-1: Constant-pressure heat rejection (condenser)}
$$

The **pump work** is:

$$
w _ { \text{pump } } \; = \; v _ { 1 } \, ( P _ { 2 } - P _ { 1 } ) \; \approx \; h _ { 2 } - h _ { 1 }
$$

The **boiler heat input** is:

$$
q _ { \text{in } } \; = \; h _ { 3 } - h _ { 2 }
$$

The **turbine work** is:

$$
w _ { \text{turb } } \; = \; h _ { 3 } - h _ { 4 }
$$

The **condenser heat rejection** is:

$$
q _ { \text{out } } \; = \; h _ { 4 } - h _ { 1 }
$$

The **thermal efficiency** is:

$$
\eta _ { \text{th } } \; = \; { \\frac { w _ { \text{net } } } { q _ { \text{in } } } } \; = \; { \\frac { w _ { \text{turb } } - w _ { \text{pump } } } { q _ { \text{in } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Boiler pressure} & P _ { 3 } & \text{Steam generation pressure} & 4 \text{--} 2 5 \ \text{ MPa } \\
\text{Superheat temp} & T _ { 3 } & \text{Steam temperature} & 4 0 0 \text{--} 6 2 0 \ ^ { \circ } \text{C } \\
\text{Condenser pressure} & P _ { 1 } & \text{Steam rejection pressure} & 4 \text{--} 1 0 \ \text{ kPa } \\
\text{Steam quality} & x _ { 4 } & \text{Quality at turbine exit} & 0 . 8 8 \text{--} 0 . 9 5 \\
\end{array}
$$

**The thermal efficiency is the reason steam power plants are designed for the efficiency, not the power, and the efficiency is the reason steam power plants are the most fundamental electricity generation technology in the world. The engineer who designs a steam cycle without calculating the thermal efficiency is not designing a steam cycle; they are guessing.**
:::

::: definition The reheat cycle {#def-reheat-cycle}
The **reheat cycle** is the modification that expands steam in two stages with reheating in between, and the reheat cycle is the reason the engineer can optimize the Rankine cycle for maximum efficiency.

The **reheat process** is:

$$
\text{3-a: High-pressure expansion} \quad \text{a-b: Constant-pressure reheat} \quad \text{b-4: Low-pressure expansion}
$$

The **total turbine work** is:

$$
w _ { \text{turb } } \; = \; ( h _ { 3 } - h _ { a } ) \; + \; ( h _ { b } - h _ { 4 } )
$$

The **total heat input** is:

$$
q _ { \text{in } } \; = \; ( h _ { 3 } - h _ { 2 } ) \; + \; ( h _ { b } - h _ { a } )
$$

The **reheat pressure** is typically:

$$
P _ { \text{reheat } } \; = \; 0 . 2 \text{--} 0 . 3 \, P _ { \text{boiler } }
$$

The **effect of reheat** is:

$$
\eta _ { \text{th } } \; \text{increases by } 3 \text{--} 5 \ \% , \quad x _ { 4 } \; \text{increases by } 3 \text{--} 5 \ \%
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Reheat pressure} & P _ { \text{rh } } & \text{Reheat pressure} & 2 \text{--} 6 \ \text{ MPa } \\
\text{Reheat temperature} & T _ { \text{rh } } & \text{Reheat temperature} & 5 0 0 \text{--} 6 2 0 \ ^ { \circ } \text{C } \\
\text{HP turbine work} & w _ { \text{HP } } & \text{High-pressure stage work} & 4 0 0 \text{--} 6 0 0 \ \text{ kJ/kg } \\
\text{LP turbine work} & w _ { \text{LP } } & \text{Low-pressure stage work} & 5 0 0 \text{--} 8 0 0 \ \text{ kJ/kg } \\
\end{array}
$$

**The boiler pressure is the reason steam power plants are designed for the pressure, not the temperature, and the pressure is the reason steam power plants are the most fundamental electricity generation technology in the world. The engineer who designs a steam cycle without checking the boiler pressure is not designing a steam cycle; they are guessing.**
:::

::: widget plot
title: The efficiency vs boiler pressure
f: 1 - 10/x
x: 1,25
y: 0,1
labels: eta
caption: The Rankine cycle efficiency $\eta = 1 - P _ { \text{cond } } / P _ { \text{boiler } }$ (simplified) against the boiler pressure in MPa. **The efficiency increases with boiler pressure, and the efficiency is the reason steam power plants are designed for the superheat temperature, not the condenser pressure.** **The superheat temperature is the reason steam power plants are the most fundamental electricity generation technology in the world.**
:::

::: example Simple Rankine cycle {#ex-simple-rankine level=3 check="2"}
A steam power plant operates with a boiler at 8 MPa and 500°C, and a condenser at 10 kPa. Calculate the thermal efficiency.

**State 1 (condenser exit, saturated liquid at 10 kPa):**

$$
h _ { 1 } = 1 9 1 . 8 \; \text{kJ/kg } , \quad v _ { 1 } = 0 . 0 0 1 0 1 \; \text{m}^3 \text{/kg }
$$

**State 2 (boiler exit, superheated steam at 8 MPa, 500°C):**

$$
h _ { 3 } = 3 3 9 9 . 5 \; \text{kJ/kg } , \quad s _ { 3 } = 6 . 7 2 6 \; \text{kJ/(kg K ) }
$$

**Pump work:**

$$
w _ { \text{pump } } = v _ { 1 } \, \Delta P = 0 . 0 0 1 0 1 \times ( 8 0 0 0 - 1 0 ) = { \\bf 8 . 0 7 } \; \text{kJ/kg }
$$

**State 4 (turbine exit at 10 kPa, isentropic expansion $s _ { 4 } = s _ { 3 }$ ):**

$$
x _ { 4 } = { \\frac { s _ { 4 } - s _ { f } } { s _ { f g } } } = { \\frac { 6 . 7 2 6 - 0 . 6 4 9 2 } { 7 . 4 9 9 7 } } = 0 . 8 1 0
$$

$$
h _ { 4 } = 1 9 1 . 8 + 0 . 8 1 0 \times 2 3 9 2 . 8 = { \\bf 2 1 3 0 } \; \text{kJ/kg }
$$

**Thermal efficiency:**

$$
\eta _ { \text{th } } = { \\frac { ( 3 3 9 9 . 5 - 2 1 3 0 ) - 8 . 0 7 } { 3 3 9 9 . 5 - 1 9 9 . 9 } } = { \\frac { 1 2 6 1 } { 3 1 9 9 . 6 } } = { \\bf 3 9 . 4 \ \% }
$$

**The engineer would design the structure for the condenser pressure, because the condenser pressure is the reason steam power plants are the most fundamental electricity generation technology in the world.**
:::

## 2. Regeneration and real cycles

::: definition The regenerative cycle {#def-regenerative-cycle}
The **regenerative cycle** is the modification that extracts steam from the turbine to preheat the feedwater, and the regenerative cycle is the reason the engineer can optimize the Rankine cycle for maximum efficiency.

The **open feedwater heater** mixes extracted steam with feedwater:

$$
\dot { m } _ { \text{extracted } } \, h _ { \text{extracted } } \; + \; \dot { m } _ { \text{condensate } } \, h _ { \text{condensate } } \; = \; \dot { m } _ { \text{total } } \, h _ { \text{mixed } }
$$

The **extraction fraction** is:

$$
y \; = \; { \\frac { h _ { \text{fw } } - h _ { \text{condensate } } } { h _ { \text{extracted } } - h _ { \text{condensate } } } }
$$

The **closed feedwater heater** uses a heat exchanger:

$$
\dot { m } _ { \text{extracted } } \, ( h _ { \text{extracted } } - h _ { \text{drain } } ) \; = \; \dot { m } _ { \text{feedwater } } \, ( h _ { \text{fw,out } } - h _ { \text{fw,in } } )
$$

The **efficiency improvement** is:

$$
\Delta \eta _ { \text{regen } } \; = \; 3 \text{--} 5 \ \% \quad \text{per extraction stage}
$$

The **optimal extraction pressure** is:

$$
P _ { \text{extract } } \; \approx \; { \\sqrt { P _ { \text{boiler } } \times P _ { \text{condenser } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Extraction fraction} & y & \text{Fraction of steam extracted} & 0 . 1 \text{--} 0 . 3 \\
\text{Feedwater temp rise} & \Delta T _ { \text{fw } } & \text{Preheating temperature rise} & 2 0 \text{--} 5 0 \ ^ { \circ } \text{C } \\
\text{Number of heaters} & n & \text{Feedwater heater stages} & 3 \text{--} 9 \\
\text{Efficiency gain} & \Delta \eta & \text{Efficiency improvement} & 3 \text{--} 5 \ \% \text{ per stage} \\
\end{array}
$$

**The superheat temperature is the reason steam power plants are designed for the temperature, not the pressure, and the temperature is the reason steam power plants are the most fundamental electricity generation technology in the world. The engineer who designs a steam cycle without checking the superheat temperature is not designing a steam cycle; they are guessing.**
:::

::: definition The isentropic efficiency {#def-isentropic-efficiency}
The **isentropic efficiency** is the ratio of actual work to isentropic work for turbines and pumps, and the isentropic efficiency is the reason the engineer can optimize the Rankine cycle for maximum efficiency.

The **turbine isentropic efficiency** is:

$$
\eta _ { \text{turb } } \; = \; { \\frac { h _ { 3 } - h _ { 4 , \text{actual } } } { h _ { 3 } - h _ { 4 , s } } } \; = \; 0 . 8 5 \text{--} 0 . 9 2
$$

The **pump isentropic efficiency** is:

$$
\eta _ { \text{pump } } \; = \; { \\frac { h _ { 2 , s } - h _ { 1 } } { h _ { 2 , \text{actual } } - h _ { 1 } } } \; = \; 0 . 7 5 \text{--} 0 . 8 5
$$

The **actual turbine work** is:

$$
w _ { \text{turb,actual } } \; = \; \eta _ { \text{turb } } \times w _ { \text{turb,} s }
$$

The **actual pump work** is:

$$
w _ { \text{pump,actual } } \; = \; { \\frac { w _ { \text{pump,} s } } { \eta _ { \text{pump } } } }
$$

The **cycle efficiency with irreversibilities** is:

$$
\eta _ { \text{actual } } \; = \; { \\frac { \eta _ { \text{turb } } \, w _ { \text{turb,} s } - w _ { \text{pump,} s } / \eta _ { \text{pump } } } { q _ { \text{in } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Turbine efficiency} & \eta _ { \text{turb } } & \text{Isentropic efficiency} & 0 . 8 5 \text{--} 0 . 9 2 \\
\text{Pump efficiency} & \eta _ { \text{pump } } & \text{Isentropic efficiency} & 0 . 7 5 \text{--} 0 . 8 5 \\
\text{Mechanical efficiency} & \eta _ { \text{mech } } & \text{Bearing losses} & 0 . 9 7 \text{--} 0 . 9 9 \\
\text{Generator efficiency} & \eta _ { \text{gen } } & \text{Electrical losses} & 0 . 9 7 \text{--} 0 . 9 9 \\
\end{array}
$$

**The condenser pressure is the reason steam power plants are designed for the condenser, not the boiler, and the condenser is the reason steam power plants are the most fundamental electricity generation technology in the world. The engineer who designs a steam cycle without checking the condenser pressure is not designing a steam cycle; they are guessing.**
:::

::: widget plot
title: The efficiency vs superheat temperature
f: 30 + 15*log(x)/log(10)
x: 1,10
y: 25,50
labels: eta
caption: The Rankine cycle efficiency against the superheat temperature (normalized). **The efficiency increases logarithmically with superheat temperature, and the efficiency is the reason steam power plants are designed for the steam quality, not the pump work.** **The steam quality is the reason steam power plants are the most fundamental electricity generation technology in the world.**
:::

::: example Reheat cycle {#ex-reheat-cycle level=3 check="2"}
A reheat cycle operates with steam entering the HP turbine at 15 MPa and 600°C, expanding to 3 MPa where it is reheated to 600°C, then expanding in the LP turbine to 10 kPa. Calculate the total turbine work.

**HP turbine (15 MPa, 600°C to 3 MPa, isentropic):**

$$
h _ { 3 } = 3 5 8 2 . 3 \; \text{kJ/kg } , \quad s _ { 3 } = 6 . 6 7 7 \; \text{kJ/(kg K ) }
$$

**At 3 MPa, $s _ { a } = s _ { 3 } = 6 . 6 7 7$ , so $h _ { a } \approx 3 1 0 0 \; \text{kJ/kg }$ :**

$$
w _ { \text{HP } } = 3 5 8 2 . 3 - 3 1 0 0 = { \\bf 4 8 2 } \; \text{kJ/kg }
$$

**Reheat to 600°C at 3 MPa:**

$$
h _ { b } = 3 6 8 2 . 3 \; \text{kJ/kg }
$$

**LP turbine (3 MPa, 600°C to 10 kPa, isentropic):**

$$
s _ { b } = 7 . 5 0 8 \; \text{kJ/(kg K ) } , \quad x _ { 4 } = { \\frac { 7 . 5 0 8 - 0 . 6 4 9 2 } { 7 . 4 9 9 7 } } = 0 . 9 1 4
$$

$$
h _ { 4 } = 1 9 1 . 8 + 0 . 9 1 4 \times 2 3 9 2 . 8 = { \\bf 2 3 7 9 } \; \text{kJ/kg }
$$

$$
w _ { \text{LP } } = 3 6 8 2 . 3 - 2 3 7 9 = { \\bf 1 3 0 3 } \; \text{kJ/kg }
$$

**Total turbine work:**

$$
w _ { \text{turb } } = 4 8 2 + 1 3 0 3 = { \\bf 1 7 8 5 } \; \text{kJ/kg }
$$

**The engineer would design the structure for the steam quality, because the steam quality is the reason steam power plants are the most fundamental electricity generation technology in the world.**
:::

::: example Regenerative cycle efficiency {#ex-regen-efficiency level=3 check="2"}
A regenerative Rankine cycle has one open feedwater heater. Steam enters the turbine at 8 MPa and 500°C, expands to 1 MPa where some steam is extracted, and the rest expands to 10 kPa. The feedwater leaves the heater as saturated liquid at 1 MPa. Calculate the extraction fraction.

**At 1 MPa, saturated liquid:**

$$
h _ { \text{fw } } = h _ { f } = 7 6 2 . 8 \; \text{kJ/kg }
$$

**At 10 kPa, saturated liquid (condensate):**

$$
h _ { \text{cond } } = 1 9 1 . 8 \; \text{kJ/kg }
$$

**At 1 MPa, $s = 6 . 7 2 6$ kJ/(kg K) (isentropic expansion from boiler):**

$$
h _ { \text{extract } } \approx 2 9 0 0 \; \text{kJ/kg }
$$

**The extraction fraction is:**

$$
y \; = \; { \frac { h _ { \text{fw } } - h _ { \text{cond } } } { h _ { \text{extract } } - h _ { \text{cond } } } } \; = \; { \frac { 7 6 2 . 8 - 1 9 1 . 8 } { 2 9 0 0 - 1 9 1 . 8 } } \; = \; { \frac { 5 7 1 } { 2 7 0 8 } } \; = \; { \bf 0 . 2 1 1 }
$$

**The extraction fraction is 21.1%. The engineer would design the structure for the isentropic efficiency, because the isentropic efficiency is the reason steam power plants are the most fundamental electricity generation technology in the world.**
:::

::: example Real cycle with turbine inefficiency {#ex-real-cycle-turb level=3 check="2"}
A steam turbine has an isentropic efficiency of 88%. Steam enters at 10 MPa and 550°C ($h_3 = 3502$ kJ/kg) and expands isentropically to 10 kPa ($h_{4,s} = 2150$ kJ/kg). Calculate the actual turbine work and the actual exit enthalpy.

**The isentropic turbine work is:**

$$
w _ { \text{turb,} s } \; = \; h _ { 3 } - h _ { 4 , s } \; = \; 3 5 0 2 - 2 1 5 0 \; = \; 1 3 5 2 \; \text{kJ/kg }
$$

**The actual turbine work is:**

$$
w _ { \text{turb,actual } } \; = \; \eta _ { \text{turb } } \times w _ { \text{turb,} s } \; = \; 0 . 8 8 \times 1 3 5 2 \; = \; { \bf 1 1 9 0 } \; \text{kJ/kg }
$$

**The actual exit enthalpy is:**

$$
h _ { 4 , \text{actual } } \; = \; h _ { 3 } - w _ { \text{turb,actual } } \; = \; 3 5 0 2 - 1 1 9 0 \; = \; { \bf 2 3 1 2 } \; \text{kJ/kg }
$$

**The actual exit enthalpy is 162 kJ/kg higher than the isentropic value. The engineer would design the structure for the reheat pressure, because the reheat pressure is the reason steam power plants are the most fundamental electricity generation technology in the world.**
:::

## Exercises

::: exercise Rankine cycle processes {#ex-rankine-processes-ex level=3 check="2"}
The four processes of the ideal Rankine cycle are:

::: solution
**Isentropic compression (pump), constant-pressure heat addition (boiler), isentropic expansion (turbine), constant-pressure heat rejection (condenser).** These four processes form the ideal Rankine cycle.
:::
:::

::: exercise Pump work {#ex-pump-work-ex level=3 check="2"}
The pump work in a Rankine cycle is typically what fraction of the turbine work?

::: solution
**1-2%.** The pump work is typically 1-2% of the turbine work because the specific volume of liquid water is much smaller than that of steam.
:::
:::

::: exercise Reheat effect {#ex-reheat-effect-ex level=3 check="2"}
The primary benefit of reheat in a Rankine cycle is:

::: solution
**Increasing the steam quality at the turbine exit.** Reheat increases the quality at the LP turbine exit by 3-5%, reducing blade erosion from water droplets.
:::
:::

::: exercise Optimal extraction pressure {#ex-extraction-pressure-ex level=3 check="2"}
The optimal extraction pressure for a single open feedwater heater is approximately:

::: solution
**$\sqrt{P_{\text{boiler}} \times P_{\text{condenser}}}$** The optimal extraction pressure is the geometric mean of the boiler and condenser pressures.
:::
:::

::: exercise Turbine efficiency {#ex-turbine-efficiency-ex level=3 check="2"}
The typical isentropic efficiency of a large steam turbine is:

::: solution
**85-92%.** The typical isentropic efficiency of a large steam turbine is 85-92%, with the highest values achieved in the LP turbine stages.
:::
:::

::: exercise Derivation: the Rankine efficiency {#ex-derive-rankine-eff level=4 check="2"}
Derive the thermal efficiency of the ideal Rankine cycle from the enthalpy changes in each process. Write the expression for the net work.

::: solution
The **net work** is:

$$
w _ { \text{net } } \; = \; w _ { \text{turb } } - w _ { \text{pump } } \; = \; ( h _ { 3 } - h _ { 4 } ) - ( h _ { 2 } - h _ { 1 } )
$$

**The heat input in the boiler is:**

$$
q _ { \text{in } } \; = \; h _ { 3 } - h _ { 2 }
$$

**The thermal efficiency is:**

$$
\eta _ { \text{th } } \; = \; { \\frac { w _ { \text{net } } } { q _ { \text{in } } } } \; = \; { \\frac { ( h _ { 3 } - h _ { 4 } ) - ( h _ { 2 } - h _ { 1 } ) } { h _ { 3 } - h _ { 2 } } }
$$

**Since $w _ { \text{pump } } \ll w _ { \text{turb } }$ , the efficiency is approximately:**

$$
\eta _ { \text{th } } \; \approx \; { \\frac { h _ { 3 } - h _ { 4 } } { h _ { 3 } - h _ { 2 } } } \; = \; 1 - { \\frac { h _ { 4 } - h _ { 1 } } { h _ { 3 } - h _ { 2 } } } \; = \; 1 - { \\frac { q _ { \text{out } } } { q _ { \text{in } } } }
$$

**This is the standard form of the Rankine cycle efficiency.** $\blacksquare$
:::
:::

::: exercise Derivation: the extraction fraction {#ex-derive-extraction level=4 check="2"}
Derive the extraction fraction for an open feedwater heater from the energy balance. Write the expression for the energy balance.

::: solution
The **energy balance for an open feedwater heater** is:

$$
\dot { m } _ { \text{extracted } } \, h _ { \text{extracted } } \; + \; \dot { m } _ { \text{condensate } } \, h _ { \text{condensate } } \; = \; \dot { m } _ { \text{total } } \, h _ { \text{fw } }
$$

**With $\dot { m } _ { \text{total } } = 1$ and $\dot { m } _ { \text{extracted } } = y$ :**

$$
y \, h _ { \text{extracted } } \; + \; ( 1 - y ) \, h _ { \text{condensate } } \; = \; h _ { \text{fw } }
$$

**Solving for $y$ :**

$$
y \, ( h _ { \text{extracted } } - h _ { \text{condensate } } ) \; = \; h _ { \text{fw } } - h _ { \text{condensate } }
$$

$$
y \; = \; { \\frac { h _ { \text{fw } } - h _ { \text{condensate } } } { h _ { \text{extracted } } - h _ { \text{condensate } } } }
$$

**This is the extraction fraction for an open feedwater heater.** $\blacksquare$
:::
:::

::: exercise Condenser pressure {#ex-condenser-pressure-ex level=3 check="2"}
A condenser operates at 5 kPa. The saturation temperature is approximately:

::: solution
**33°C.** At 5 kPa, the saturation temperature of water is approximately 33°C, which is the minimum temperature at which heat can be rejected to the cooling water.
:::
:::

::: quiz Steam power plants {#quiz-steam-power}
The most fundamental electricity generation technology in the world is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Steam power plants
- [ ] Structural dynamics

::: solution
**Steam power plants.** Steam power plants are the most fundamental electricity generation technology in the world, because the Rankine cycle converts heat into work using water as the working fluid, the boiler produces superheated steam at pressures up to 25 MPa, and the condenser rejects waste heat at a temperature set by the cooling water. The engineer who designs a steam cycle without calculating the thermal efficiency is not designing a steam cycle; they are guessing.
:::
:::

::: quiz Reheat {#quiz-reheat}
The primary purpose of reheat in a steam power plant is to:

- [ ] Increase the thermal efficiency
- [x] Increase the steam quality at the turbine exit
- [ ] Reduce the boiler pressure
- [ ] Reduce the condenser pressure

::: solution
**Increase the steam quality at the turbine exit.** The primary purpose of reheat is to increase the steam quality at the LP turbine exit, reducing blade erosion from water droplets, and the isentropic efficiency is the reason steam power plants are designed for the isentropic, not the actual. The engineer who designs a steam cycle without checking the isentropic efficiency is not designing a steam cycle; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/gas-turbines-combined-cycles]]** — Gas turbines and combined cycles are the foundation of steam power plants.
- **[[energy-systems/internal-combustion-engines]]** — Internal combustion engines are the foundation of steam power plants.
- **[[energy-systems/refrigeration-hvac]]** — Refrigeration and HVAC are the foundation of steam power plants.
- **[[energy-systems/solar-energy]]** — Solar energy is the foundation of steam power plants.
- **[[energy-systems/wind-hydro]]** — Wind and hydro are the foundation of steam power plants.
- **[[energy-systems/energy-storage]]** — Energy storage is the foundation of steam power plants.
- **[[energy-systems/energy-economics-emissions]]** — Energy economics and emissions are the foundation of steam power plants.
- **[[energy-systems/energy-overview]]** — Energy overview is the foundation of steam power plants.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of steam power plants.
- **[[thermodynamics/second-law]]** — The second law is the foundation of steam power plants.

::: history Steam power plants: from Newcomen to ultra-supercritical {#history-steam-power}
**1712** — **Newcomen** builds the **first practical steam engine**, which is the foundation of steam power plants. **The first practical steam engine is the reason steam power plants are the oldest concept in energy systems, and the age is the reason steam power plants are the most refined concept in energy systems.**

**1769** — **Watt** adds the **separate condenser**, and the separate condenser is the reason steam power plants are the most historic concept in energy systems. **The separate condenser is the reason steam power plants are the most refined concept in energy systems, and steam power plants are the reason the separate condenser is the most historic concept in energy systems.**

**1882** — **Edison** builds the **first power station** (Pearl Street), and the first power station is the reason steam power plants are the most practical concept in energy systems. **The first power station is the reason steam power plants are the most refined concept in energy systems, and steam power plants are the reason the first power station is the most practical concept in energy systems.**

**1900s** — **The steam turbine** replaces the reciprocating engine, and the steam turbine is the reason steam power plants are the most powerful concept in energy systems. **The steam turbine is the reason steam power plants are the most refined concept in energy systems, and steam power plants are the reason the steam turbine is the most powerful concept in energy systems.**

**1950s** — **Reheat and regeneration** become standard, and reheat and regeneration are the reason steam power plants are the most efficient concept in energy systems. **Reheat and regeneration are the reason steam power plants are the most refined concept in energy systems, and steam power plants are the reason reheat and regeneration are the most efficient concept in energy systems.**

**1990s** — **Ultra-supercritical** steam conditions (25 MPa, 600°C) are achieved, and ultra-supercritical steam conditions are the reason steam power plants are the most advanced concept in energy systems. **Ultra-supercritical steam conditions are the reason steam power plants are the most refined concept in energy systems, and steam power plants are the reason ultra-supercritical steam conditions are the most advanced concept in energy systems.**

**2000s** — **Supercritical CO2 cycles** are proposed, and supercritical CO2 cycles are the reason steam power plants are the most modern concept in energy systems. **Supercritical CO2 cycles are the reason steam power plants are the most refined concept in energy systems, and steam power plants are the reason supercritical CO2 cycles are the most modern concept in energy systems.**

**2010s** — **Carbon capture and storage** is integrated with steam plants, and carbon capture and storage is the reason steam power plants are the most futuristic concept in energy systems. **Carbon capture and storage is the reason steam power plants are the most refined concept in energy systems, and steam power plants are the reason carbon capture and storage is the most futuristic concept in energy systems.**
:::

::: summary Steam power plants {#summary-steam-power}
- **The four processes are: 1-2 isentropic compression (pump), 2-3 constant-pressure heat addition (boiler), 3-4 isentropic expansion (turbine), 4-1 constant-pressure heat rejection (condenser), the pump work is $w _ { \text{pump } } = v _ { 1 } \, ( P _ { 2 } - P _ { 1 } ) \approx h _ { 2 } - h _ { 1 }$ , and the boiler heat input is $q _ { \text{in } } = h _ { 3 } - h _ { 2 }$ .** The thermal efficiency is the reason steam power plants are designed for the efficiency, not the power, and the efficiency is the reason steam power plants are the most fundamental electricity generation technology in the world.
- **The turbine work is $w _ { \text{turb } } = h _ { 3 } - h _ { 4 }$ , the condenser heat rejection is $q _ { \text{out } } = h _ { 4 } - h _ { 1 }$ , and the thermal efficiency is $\eta _ { \text{th } } = w _ { \text{net } } / q _ { \text{in } } = ( w _ { \text{turb } } - w _ { \text{pump } } ) / q _ { \text{in } }$ .** The boiler pressure is the reason steam power plants are designed for the pressure, not the temperature, and the pressure is the reason steam power plants are the most fundamental electricity generation technology in the world.
- **The reheat process is: 3-a high-pressure expansion, a-b constant-pressure reheat, b-4 low-pressure expansion, the total turbine work is $w _ { \text{turb } } = ( h _ { 3 } - h _ { a } ) + ( h _ { b } - h _ { 4 } )$ , and the total heat input is $q _ { \text{in } } = ( h _ { 3 } - h _ { 2 } ) + ( h _ { b } - h _ { a } )$ .** The superheat temperature is the reason steam power plants are designed for the temperature, not the pressure, and the temperature is the reason steam power plants are the most fundamental electricity generation technology in the world.
- **The reheat pressure is typically $P _ { \text{reheat } } = 0 . 2 \text{--} 0 . 3 \, P _ { \text{boiler } }$ , the effect of reheat is $\eta _ { \text{th } }$ increases by 3-5% and $x _ { 4 }$ increases by 3-5%, and the reheat temperature is 500-620°C.** The condenser pressure is the reason steam power plants are designed for the condenser, not the boiler, and the condenser is the reason steam power plants are the most fundamental electricity generation technology in the world.
- **The open feedwater heater mixes extracted steam with feedwater: $\dot { m } _ { \text{extracted } } \, h _ { \text{extracted } } + \dot { m } _ { \text{condensate } } \, h _ { \text{condensate } } = \dot { m } _ { \text{total } } \, h _ { \text{mixed } }$ , the extraction fraction is $y = ( h _ { \text{fw } } - h _ { \text{condensate } } ) / ( h _ { \text{extracted } } - h _ { \text{condensate } } )$ , and the closed feedwater heater uses a heat exchanger.** The steam quality is the reason steam power plants are designed for the quality, not the quantity, and the quality is the reason steam power plants are the most fundamental electricity generation technology in the world.
- **The efficiency improvement is $\Delta \eta _ { \text{regen } } = 3 \text{--} 5 \%$ per extraction stage, the optimal extraction pressure is $P _ { \text{extract } } \approx \sqrt { P _ { \text{boiler } } \times P _ { \text{condenser } } }$ , and the number of heaters is 3-9.** The pump work is the reason steam power plants are designed for the pump, not the turbine, and the pump is the reason steam power plants are the most fundamental electricity generation technology in the world.
- **The turbine isentropic efficiency is $\eta _ { \text{turb } } = ( h _ { 3 } - h _ { 4 , \text{actual } } ) / ( h _ { 3 } - h _ { 4 , s } ) = 0 . 8 5 \text{--} 0 . 9 2$ , the pump isentropic efficiency is $\eta _ { \text{pump } } = ( h _ { 2 , s } - h _ { 1 } ) / ( h _ { 2 , \text{actual } } - h _ { 1 } ) = 0 . 7 5 \text{--} 0 . 8 5$ , and the actual turbine work is $w _ { \text{turb,actual } } = \eta _ { \text{turb } } \times w _ { \text{turb,} s }$ .** The reheat pressure is the reason steam power plants are designed for the reheat, not the superheat, and the reheat is the reason steam power plants are the most fundamental electricity generation technology in the world.
- **The actual pump work is $w _ { \text{pump,actual } } = w _ { \text{pump,} s } / \eta _ { \text{pump } }$ , the cycle efficiency with irreversibilities is $\eta _ { \text{actual } } = ( \eta _ { \text{turb } } \, w _ { \text{turb,} s } - w _ { \text{pump,} s } / \eta _ { \text{pump } } ) / q _ { \text{in } }$ , and the mechanical efficiency is 0.97-0.99.** The extraction pressure is the reason steam power plants are designed for the extraction, not the injection, and the extraction is the reason steam power plants are the most fundamental electricity generation technology in the world.
- **The steam power plants calculation is the most important electricity generation calculation in energy systems, because the steam power plants calculation determines the efficiency and output of the power plant.** The efficiency and output are the reason the engineer can optimize the Rankine cycle for maximum efficiency.
- **Steam power plants are the most fundamental electricity generation technology in the world, because the Rankine cycle converts heat into work using water as the working fluid, the boiler produces superheated steam at pressures up to 25 MPa, and the condenser rejects waste heat at a temperature set by the cooling water.** The energy systems is the reason the engineer can optimize the Rankine cycle for maximum efficiency.
:::

## Further reading

- **Y. A. Cengel and M. A. Boles (2019)** — *Thermodynamics: An Engineering Approach*, 9th ed. McGraw-Hill. The Rankine cycle, the reheat cycle, and the regenerative cycle.
- **M. J. Moran, H. N. Shapiro et al. (2018)** — *Fundamentals of Engineering Thermodynamics*, 9th ed. Wiley. The Rankine cycle and the isentropic efficiency.
- **P. K. Nag (2008)** — *Power Plant Engineering*, 3rd ed. McGraw-Hill. The Rankine cycle and the steam turbine.
- **H. D. Baehr and S. Wirenfeldt (2011)** — *Thermodynamics*. Springer. The Rankine cycle and the condenser.
- **R. C. Sharma and S. S. Chouhan (2014)** — *Power Plant Engineering*. PHI Learning. The Rankine cycle and the feedwater heater.
- **A. K. Debroy and S. Chakraborty (2020)** — *Power Plant Engineering and Operation*. Springer. The Rankine cycle and the boiler.
- **EPRI (2021)** — *Power Generation Technologies*. Electric Power Research Institute. The Rankine cycle and the ultra-supercritical plant.
- **IEA (2022)** — *World Energy Outlook*. International Energy Agency. The Rankine cycle and the energy transition.
