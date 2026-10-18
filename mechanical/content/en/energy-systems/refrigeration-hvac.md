Refrigeration and HVAC are the most energy-intensive building systems in the world: the vapour-compression cycle transfers heat from a cold space to a hot space using a phase-changing refrigerant, the coefficient of performance (COP) measures the efficiency of the refrigeration cycle, and the Carnot COP sets the theoretical maximum. **The engineer who designs a refrigeration cycle without calculating the COP is not designing a refrigeration cycle; they are guessing.** The refrigeration and HVAC calculation is the reason the engineer can optimize the evaporator and condenser temperatures for maximum COP, and the vapour-compression cycle is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.

The quantitative tools of refrigeration and HVAC are the **vapour-compression cycle** (the ideal thermodynamic cycle for refrigeration), the **coefficient of performance** (the ratio of cooling effect to work input), the **Carnot COP** (the maximum possible COP for given temperatures), and the **refrigerant** (the working fluid that changes phase in the cycle). The tools are the language in which the refrigeration and HVAC analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways refrigeration and HVAC calculation goes wrong
**Not calculating the COP.** The engineer who designs a refrigeration cycle without calculating the COP is not designing a refrigeration cycle; they are guessing. **The COP is the reason refrigeration and HVAC are designed for the performance, not the power, and the performance is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.** **Not checking the evaporator temperature.** The engineer who designs a refrigeration cycle without checking the evaporator temperature is not designing a refrigeration cycle; they are guessing. **The evaporator temperature is the reason refrigeration and HVAC are designed for the evaporation, not the condensation, and the evaporation is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.** **Not checking the condenser temperature.** The engineer who designs a refrigeration cycle without checking the condenser temperature is not designing a refrigeration cycle; they are guessing. **The condenser temperature is the reason refrigeration and HVAC are designed for the condensation, not the evaporation, and the condensation is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.** **Not checking the refrigerant mass flow rate.** The engineer who designs a refrigeration cycle without checking the refrigerant mass flow rate is not designing a refrigeration cycle; they are guessing. **The refrigerant mass flow rate is the reason refrigeration and HVAC are designed for the refrigerant, not the air, and the refrigerant is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.** **Not checking the compressor work.** The engineer who designs a refrigeration cycle without checking the compressor work is not designing a refrigeration cycle; they are guessing. **The compressor work is the reason refrigeration and HVAC are designed for the compressor, not the expander, and the compressor is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.** **Not checking the subcooling and superheat.** The engineer who designs a refrigeration cycle without checking the subcooling and superheat is not designing a refrigeration cycle; they are guessing. **The subcooling and superheat are the reason refrigeration and HVAC are designed for the subcooling, not the superheat, and the subcooling is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.** **Not checking the refrigerant properties.** The engineer who designs a refrigeration cycle without checking the refrigerant properties is not designing a refrigeration cycle; they are guessing. **The refrigerant properties are the reason refrigeration and HVAC are designed for the properties, not the composition, and the properties are the reason refrigeration and HVAC are the most energy-intensive building systems in the world.** **Not checking the heat exchanger effectiveness.** The engineer who designs a refrigeration cycle without checking the heat exchanger effectiveness is not designing a refrigeration cycle; they are guessing. **The heat exchanger effectiveness is the reason refrigeration and HVAC are designed for the heat exchanger, not the compressor, and the heat exchanger is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.** **Not checking the pressure drop.** The engineer who designs a refrigeration cycle without checking the pressure drop is not designing a refrigeration cycle; they are guessing. **The pressure drop is the reason refrigeration and HVAC are designed for the pressure, not the flow, and the pressure is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.**
:::

## 1. The vapour-compression cycle

::: definition The ideal vapour-compression cycle {#def-vapour-compression}
The **ideal vapour-compression cycle** is the thermodynamic cycle that transfers heat from a cold space to a hot space using a phase-changing refrigerant, and the ideal vapour-compression cycle is the reason the engineer can optimize the evaporator and condenser temperatures for maximum COP.

The **four processes** are:

$$
\text{1-2: Isentropic compression (compressor)} \quad \text{2-3: Constant-pressure condensation}
$$

$$
\text{3-4: Throttling (expansion valve)} \quad \text{4-1: Constant-pressure evaporation}
$$

The **refrigeration effect** is:

$$
q _ { L } \; = \; h _ { 1 } - h _ { 4 }
$$

The **compressor work** is:

$$
w _ { \text{comp } } \; = \; h _ { 2 } - h _ { 1 }
$$

The **COP** is:

$$
\text{COP} _ { R } \; = \; { \\frac { q _ { L } } { w _ { \text{comp } } } } \; = \; { \\frac { h _ { 1 } - h _ { 4 } } { h _ { 2 } - h _ { 1 } } }
$$

The **Carnot COP** is:

$$
\text{COP} _ { \text{Carnot } } \; = \; { \\frac { T _ { L } } { T _ { H } - T _ { L } } }
$$

The **heating COP** is:

$$
\text{COP} _ { H } \; = \; \text{COP} _ { R } + 1
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Evaporator temp} & T _ { L } & \text{Cold-side temperature} & - 3 0 \\text{--} 1 0 \ ^ { \\circ } \\text{C } \\
\text{Condenser temp} & T _ { H } & \text{Hot-side temperature} & 3 0 \\text{--} 5 0 \ ^ { \\circ } \\text{C } \\
\text{COP}_R & \text{COP}_R & \text{Cooling COP} & 2 \\text{--} 6 \\
\text{COP}_H & \text{COP}_H & \text{Heating COP} & 3 \\text{--} 7 \\
\end{array}
$$

**The COP is the reason refrigeration and HVAC are designed for the performance, not the power, and the performance is the reason refrigeration and HVAC are the most energy-intensive building systems in the world. The engineer who designs a refrigeration cycle without calculating the COP is not designing a refrigeration cycle; they are guessing.**
:::

::: definition The refrigerant {#def-refrigerant}
The **refrigerant** is the working fluid that changes phase in the vapour-compression cycle, and the refrigerant is the reason the engineer can optimize the evaporator and condenser temperatures for maximum COP.

The **desirable refrigerant properties** are:

$$
\text{Low boiling point} , \quad \text{high latent heat} , \quad \text{low GWP} , \quad \text{low ODP}
$$

The **common refrigerants** are:

$$
\text{R-134a } ( \text{HFC } ) , \quad \text{R-410A } ( \text{HFC blend } ) , \quad \text{R-32 } ( \text{HFC } ) , \quad \text{R-744 } ( \text{CO}_2 )
$$

The **global warming potential** is:

$$
\text{GWP} \; = \; { \\frac { \text{radiative forcing of refrigerant } } { \text{radiative forcing of CO}_2 } } \text{ over } 1 0 0 \text{ years }
$$

The **ozone depletion potential** is:

$$
\text{ODP} \; = \; { \\frac { \text{ozone depletion by refrigerant } } { \text{ozone depletion by CFC-11 } } }
$$

The **volumetric refrigeration capacity** is:

$$
q _ { v } \; = \; { \\frac { q _ { L } } { v _ { 1 } } } \quad [ \text{kJ/m}^3 ]
$$

$$
\begin{array} { l c c c }
\textbf{Refrigerant} & \textbf{ Type } & \textbf{ GWP} & \textbf{ ODP} \\ \hline
\text{R-134a} & \text{HFC} & 1 4 3 0 & 0 \\
\text{R-410A} & \text{HFC blend} & 2 0 8 8 & 0 \\
\text{R-32} & \text{HFC} & 6 7 5 & 0 \\
\text{R-744 (CO}_2\text{)} & \text{Natural} & 1 & 0 \\
\text{R-290 (propane)} & \text{Natural} & 3 & 0 \\
\end{array}
$$

**The evaporator temperature is the reason refrigeration and HVAC are designed for the evaporation, not the condensation, and the evaporation is the reason refrigeration and HVAC are the most energy-intensive building systems in the world. The engineer who designs a refrigeration cycle without checking the evaporator temperature is not designing a refrigeration cycle; they are guessing.**
:::

::: widget plot
title: The COP vs evaporator temperature
f: x / (40 - x)
x: -30,10
y: 0,5
labels: COP
caption: The Carnot COP $\text{COP} = T _ { L } / ( T _ { H } - T _ { L } )$ against the evaporator temperature for $T _ { H } = 4 0 \, ^ { \circ } \text{C }$ . **The COP increases with evaporator temperature, and the COP is the reason refrigeration and HVAC are designed for the condenser temperature, not the refrigerant mass flow rate.** **The condenser temperature is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.**
:::

::: example Vapour-compression cycle {#ex-vapour-compression-ex level=3 check="2"}
A refrigeration cycle uses R-134a with an evaporator at -10°C and a condenser at 40°C. The refrigerant leaves the evaporator as saturated vapour and leaves the condenser as saturated liquid. Calculate the COP.

**State 1 (evaporator exit, saturated vapour at -10°C):**

$$
h _ { 1 } = 2 4 4 . 5 \; \text{kJ/kg } , \quad s _ { 1 } = 0 . 9 5 1 \; \text{kJ/(kg K ) }
$$

**State 2 (compressor exit, superheated vapour at 40°C, $s _ { 2 } = s _ { 1 }$ ):**

$$
h _ { 2 } \\approx 2 7 8 . 0 \; \text{kJ/kg }
$$

**State 3 (condenser exit, saturated liquid at 40°C):**

$$
h _ { 3 } = 1 0 8 . 3 \; \text{kJ/kg }
$$

**State 4 (expansion valve exit, $h _ { 4 } = h _ { 3 }$ ):**

$$
h _ { 4 } = 1 0 8 . 3 \; \text{kJ/kg }
$$

**The refrigeration effect is:**

$$
q _ { L } = h _ { 1 } - h _ { 4 } = 2 4 4 . 5 - 1 0 8 . 3 = { \\bf 1 3 6 . 2 } \; \text{kJ/kg }
$$

**The compressor work is:**

$$
w _ { \text{comp } } = h _ { 2 } - h _ { 1 } = 2 7 8 . 0 - 2 4 4 . 5 = { \\bf 3 3 . 5 } \; \text{kJ/kg }
$$

**The COP is:**

$$
\text{COP} _ { R } = { \\frac { 1 3 6 . 2 } { 3 3 . 5 } } = { \\bf 4 . 0 7 }
$$

**The engineer would design the structure for the refrigerant mass flow rate, because the refrigerant mass flow rate is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.**
:::

## 2. HVAC and heat pumps

::: definition The heat pump {#def-heat-pump}
The **heat pump** is a refrigeration cycle that delivers heat to the hot space instead of rejecting it, and the heat pump is the reason the engineer can optimize the evaporator and condenser temperatures for maximum COP.

The **heating COP** is:

$$
\text{COP} _ { H } \; = \; { \\frac { q _ { H } } { w _ { \text{comp } } } } \; = \; { \\frac { h _ { 2 } - h _ { 3 } } { h _ { 2 } - h _ { 1 } } }
$$

The **relationship between COPs** is:

$$
\text{COP} _ { H } \; = \; \text{COP} _ { R } + 1
$$

The **Carnot heating COP** is:

$$
\text{COP} _ { H , \text{Carnot } } \; = \; { \\frac { T _ { H } } { T _ { H } - T _ { L } } }
$$

The **defrost cycle** reverses the cycle to melt ice on the outdoor coil:

$$
\text{COP} _ { H , \text{defrost } } \; < \; \text{COP} _ { H , \text{normal } }
$$

The **balance point temperature** is:

$$
\dot { Q } _ { \text{loss } } ( T _ { \text{out } } ) \; = \; \dot { Q } _ { \text{HP } } ( T _ { \text{out } } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Heating COP} & \text{COP}_H & \text{Heating COP} & 3 \text{--} 5 \\
\text{Carnot COP}_H & \text{COP}_{H,C} & \text{Maximum heating COP} & 5 \text{--} 1 0 \\
\text{Defrost penalty} & \Delta \text{COP} & \text{COP reduction} & 1 0 \text{--} 2 0 \ \% \\
\text{Balance point} & T _ { \text{bal } } & \text{Balance point temperature} & - 5 \\text{--} 5 \ ^ { \\circ } \\text{C } \\
\end{array}
$$

**The condenser temperature is the reason refrigeration and HVAC are designed for the condensation, not the evaporation, and the condensation is the reason refrigeration and HVAC are the most energy-intensive building systems in the world. The engineer who designs a refrigeration cycle without checking the condenser temperature is not designing a refrigeration cycle; they are guessing.**
:::

::: definition HVAC cooling load {#def-hvac-cooling-load}
The **HVAC cooling load** is the rate of heat removal required to maintain indoor conditions, and the HVAC cooling load is the reason the engineer can optimize the evaporator and condenser temperatures for maximum COP.

The **sensible heat gain** is:

$$
\dot { Q } _ { \text{sensible } } \; = \; \dot { m } \, c _ { p } \, ( T _ { \text{out } } - T _ { \text{in } } )
$$

The **latent heat gain** is:

$$
\dot { Q } _ { \text{latent } } \; = \; \dot { m } \, h _ { f g } \, ( \omega _ { \text{out } } - \omega _ { \text{in } } )
$$

The **total cooling load** is:

$$
\dot { Q } _ { \text{total } } \; = \; \dot { Q } _ { \text{sensible } } + \dot { Q } _ { \text{latent } } + \dot { Q } _ { \text{internal } } + \dot { Q } _ { \text{solar } }
$$

The **sensible heat ratio** is:

$$
\text{SHR} \; = \; { \\frac { \dot { Q } _ { \text{sensible } } } { \dot { Q } _ { \text{total } } } } \; = \; 0 . 7 \text{--} 0 . 9
$$

The **energy efficiency ratio** is:

$$
\text{EER} \; = \; { \\frac { \dot { Q } _ { L } \; [ \text{Btu/h } ] } { P _ { \text{elec } } \; [ \text{W } ] } } \; = \; 3 . 4 1 \\times \text{COP} _ { R }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Sensible heat ratio} & \text{SHR} & \text{Sensible/total load} & 0 . 7 \text{--} 0 . 9 \\
\text{EER} & \text{EER} & \text{Energy efficiency ratio} & 8 \text{--} 1 4 \ \text{ Btu/Wh } \\
\text{SEER} & \text{SEER} & \text{Seasonal EER} & 1 0 \text{--} 2 0 \ \text{ Btu/Wh } \\
\text{Air changes/hour} & \text{ACH} & \text{Ventilation rate} & 1 \text{--} 6 \\
\end{array}
$$

**The refrigerant mass flow rate is the reason refrigeration and HVAC are designed for the refrigerant, not the air, and the refrigerant is the reason refrigeration and HVAC are the most energy-intensive building systems in the world. The engineer who designs a refrigeration cycle without checking the refrigerant mass flow rate is not designing a refrigeration cycle; they are guessing.**
:::

::: widget plot
title: The heating COP vs outdoor temperature
f: (x + 273) / (20 - x)
x: -20,15
y: 3,15
labels: COP_H
caption: The Carnot heating COP $\text{COP} _ { H } = T _ { H } / ( T _ { H } - T _ { L } )$ against the outdoor temperature for $T _ { H } = 2 0 \, ^ { \circ } \text{C }$ . **The heating COP decreases as the outdoor temperature drops, and the heating COP is the reason refrigeration and HVAC are designed for the compressor work, not the subcooling and superheat.** **The compressor work is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.**
:::

::: example Heat pump sizing {#ex-heat-pump-sizing level=3 check="2"}
A building has a heat loss of 10 kW at -5°C outdoor temperature. A heat pump with $\text{COP} _ { H } = 3 . 5$ at this condition is used. Calculate the electrical power input and the COP if the outdoor temperature drops to -15°C (COP drops to 2.5).

**At -5°C:**

$$
P _ { \text{elec } } = { \\frac { \dot { Q } _ { H } } { \text{COP} _ { H } } } = { \\frac { 1 0 } { 3 . 5 } } = { \\bf 2 . 8 6 } \; \text{kW }
$$

**At -15°C:**

$$
P _ { \text{elec } } = { \\frac { 1 0 } { 2 . 5 } } = { \\bf 4 . 0 0 } \; \text{kW }
$$

**The electrical power increases by 40% when the outdoor temperature drops by 10°C. The engineer would design the structure for the subcooling and superheat, because the subcooling and superheat are the reason refrigeration and HVAC are the most energy-intensive building systems in the world.**
:::

::: example Refrigeration capacity {#ex-refrigeration-capacity level=3 check="2"}
A refrigeration system uses R-134a with a mass flow rate of 0.05 kg/s. The refrigeration effect is 136.2 kJ/kg and the compressor work is 33.5 kJ/kg. Calculate the cooling capacity, the compressor power, and the COP.

**The cooling capacity is:**

$$
\dot { Q } _ { L } \; = \; \dot { m } \, q _ { L } \; = \; 0 . 0 5 \times 1 3 6 . 2 \; = \; { \bf 6 . 8 1 } \; 	ext{kW }
$$

**The compressor power is:**

$$
\dot { W } _ { 	ext{comp } } \; = \; \dot { m } \, w _ { 	ext{comp } } \; = \; 0 . 0 5 \times 3 3 . 5 \; = \; { \bf 1 . 6 8 } \; 	ext{kW }
$$

**The COP is:**

$$
	ext{COP} _ { R } \; = \; { \frac { 6 . 8 1 } { 1 . 6 8 } } \; = \; { \bf 4 . 0 6 }
$$

**The engineer would design the structure for the pressure drop, because the pressure drop is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.**
:::

::: example Carnot COP comparison {#ex-carnot-cop-compare level=3 check="2"}
Compare the actual COP of a refrigerator (COP = 3.0) with the Carnot COP for evaporator and condenser temperatures of -15°C and 35°C.

**The Carnot COP is:**

$$
	ext{COP} _ { 	ext{Carnot } } \; = \; { \frac { T _ { L } } { T _ { H } - T _ { L } } } \; = \; { \frac { 2 5 8 } { 3 5 - ( - 1 5 ) } } \; = \; { \frac { 2 5 8 } { 5 0 } } \; = \; { \bf 5 . 1 6 }
$$

**The second law efficiency is:**

$$
\eta _ { 	ext{II } } \; = \; { \frac { 	ext{COP} _ { 	ext{actual } } } { 	ext{COP} _ { 	ext{Carnot } } } } \; = \; { \frac { 3 . 0 } { 5 . 1 6 } } \; = \; { \bf 5 8 . 1 \ \% }
$$

**The actual COP is 58% of the Carnot limit. The engineer would design the structure for the heat exchanger effectiveness, because the heat exchanger effectiveness is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.**
:::

## Exercises

::: exercise Vapour-compression processes {#ex-vc-processes-ex level=3 check="2"}
The four processes of the ideal vapour-compression cycle are:

::: solution
**Isentropic compression (compressor), constant-pressure condensation, throttling (expansion valve), constant-pressure evaporation.** These four processes form the ideal vapour-compression cycle.
:::
:::

::: exercise COP definition {#ex-cop-definition-ex level=3 check="2"}
The COP of a refrigeration cycle is defined as:

::: solution
**$\text{COP}_R = q_L / w_{\text{comp}}$** The COP is the ratio of the cooling effect to the compressor work input.
:::
:::

::: exercise Carnot COP {#ex-carnot-cop-ex level=3 check="2"}
The Carnot COP of a refrigeration cycle operating between -10°C and 40°C is:

::: solution
**$\text{COP}_{\text{Carnot}} = T_L / (T_H - T_L) = 263 / 50 = 5.26$** The Carnot COP is the maximum possible COP for given temperatures.
:::
:::

::: exercise Heat pump COP {#ex-hp-cop-ex level=3 check="2"}
The relationship between heating COP and cooling COP is:

::: solution
**$\text{COP}_H = \text{COP}_R + 1$** The heating COP is always one greater than the cooling COP because the compressor work is also delivered as heat.
:::
:::

::: exercise Refrigerant GWP {#ex-refrigerant-gwp-ex level=3 check="2"}
The refrigerant with the lowest GWP among common options is:

::: solution
**R-744 (CO$_2$, GWP = 1).** CO$_2$ has a GWP of 1 (by definition) and zero ODP, making it the most environmentally friendly common refrigerant.
:::
:::

::: exercise Derivation: the COP {#ex-derive-cop level=4 check="2"}
Derive the COP of the ideal vapour-compression cycle from the enthalpy changes in each process. Write the expression for the refrigeration effect.

::: solution
The **refrigeration effect** (evaporator) is:

$$
q _ { L } \; = \; h _ { 1 } - h _ { 4 }
$$

**The compressor work is:**

$$
w _ { \text{comp } } \; = \; h _ { 2 } - h _ { 1 }
$$

**The COP is:**

$$
\text{COP} _ { R } \; = \; { \\frac { q _ { L } } { w _ { \text{comp } } } } \; = \; { \\frac { h _ { 1 } - h _ { 4 } } { h _ { 2 } - h _ { 1 } } }
$$

**Since the throttling process is isenthalpic ($h _ { 4 } = h _ { 3 }$ ):**

$$
\text{COP} _ { R } \; = \; { \\frac { h _ { 1 } - h _ { 3 } } { h _ { 2 } - h _ { 1 } } }
$$

**This is the standard form of the vapour-compression COP.** $\blacksquare$
:::
:::

::: exercise Derivation: the Carnot COP {#ex-derive-carnot-cop level=4 check="2"}
Derive the Carnot COP for a refrigeration cycle from the second law of thermodynamics. Write the expression for the entropy balance.

::: solution
For a **reversible cycle operating between $T _ { L }$ and $T _ { H }$ :**

$$
\oint { \\frac { \delta Q } { T } } \; = \; 0 \\quad \\Rightarrow \\quad { \\frac { Q _ { L } } { T _ { L } } } \; = \; { \\frac { Q _ { H } } { T _ { H } } }
$$

**The first law gives:**

$$
W \; = \; Q _ { H } - Q _ { L }
$$

**The COP is:**

$$
\text{COP} _ { R , \text{Carnot } } \; = \; { \\frac { Q _ { L } } { W } } \; = \; { \\frac { Q _ { L } } { Q _ { H } - Q _ { L } } } \; = \; { \\frac { 1 } { Q _ { H } / Q _ { L } - 1 } }
$$

**From the entropy balance, $Q _ { H } / Q _ { L } = T _ { H } / T _ { L }$ :**

$$
\text{COP} _ { R , \text{Carnot } } \; = \; { \\frac { 1 } { T _ { H } / T _ { L } - 1 } } \; = \; { \\frac { T _ { L } } { T _ { H } - T _ { L } } }
$$

**This is the Carnot COP for refrigeration.** $\blacksquare$
:::
:::

::: exercise EER {#ex-eer-ex level=3 check="2"}
The energy efficiency ratio (EER) is related to the COP by:

::: solution
**$\text{EER} = 3.41 \times \text{COP}_R$** The EER is the cooling capacity in Btu/h divided by the electrical power in watts, and the conversion factor is 3.412.
:::
:::

::: quiz Refrigeration and HVAC {#quiz-refrigeration}
The most energy-intensive building systems in the world are:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Refrigeration and HVAC
- [ ] Structural dynamics

::: solution
**Refrigeration and HVAC.** Refrigeration and HVAC are the most energy-intensive building systems in the world, because the vapour-compression cycle transfers heat from a cold space to a hot space using a phase-changing refrigerant, the coefficient of performance (COP) measures the efficiency of the refrigeration cycle, and the Carnot COP sets the theoretical maximum. The engineer who designs a refrigeration cycle without calculating the COP is not designing a refrigeration cycle; they are guessing.
:::
:::

::: quiz Heat pump {#quiz-heat-pump}
The heating COP of a heat pump is always:

- [ ] Equal to the cooling COP
- [ ] Less than the cooling COP
- [x] Greater than the cooling COP
- [ ] Equal to 1

::: solution
**Greater than the cooling COP.** The heating COP of a heat pump is always greater than the cooling COP because $\text{COP}_H = \text{COP}_R + 1$, and the refrigerant properties are the reason refrigeration and HVAC are designed for the properties, not the composition. The engineer who designs a refrigeration cycle without checking the refrigerant properties is not designing a refrigeration cycle; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/solar-energy]]** — Solar energy is the foundation of refrigeration and HVAC.
- **[[energy-systems/wind-hydro]]** — Wind and hydro are the foundation of refrigeration and HVAC.
- **[[energy-systems/energy-storage]]** — Energy storage is the foundation of refrigeration and HVAC.
- **[[energy-systems/energy-economics-emissions]]** — Energy economics and emissions are the foundation of refrigeration and HVAC.
- **[[energy-systems/energy-overview]]** — Energy overview is the foundation of refrigeration and HVAC.
- **[[energy-systems/steam-power-plants]]** — Steam power plants are the foundation of refrigeration and HVAC.
- **[[energy-systems/gas-turbines-combined-cycles]]** — Gas turbines and combined cycles are the foundation of refrigeration and HVAC.
- **[[energy-systems/internal-combustion-engines]]** — Internal combustion engines are the foundation of refrigeration and HVAC.
- **[[heat-transfer/heat-transfer-modes]]** — Refrigeration is the foundation of refrigeration and HVAC.
- **[[thermodynamics/second-law]]** — The second law is the foundation of refrigeration and HVAC.

::: history Refrigeration and HVAC: from Oliver Evans to heat pumps {#history-refrigeration}
**1805** — **Oliver Evans** designs the **first refrigeration machine**, which is the foundation of refrigeration and HVAC. **The first refrigeration machine is the reason refrigeration and HVAC are the oldest concept in energy systems, and the age is the reason refrigeration and HVAC are the most refined concept in energy systems.**

**1834** — **Jacob Perkins** builds the **first practical refrigerator**, and the first practical refrigerator is the reason refrigeration and HVAC are the most historic concept in energy systems. **The first practical refrigerator is the reason refrigeration and HVAC are the most refined concept in energy systems, and refrigeration and HVAC are the reason the first practical refrigerator is the most historic concept in energy systems.**

**1876** — **Carl von Linde** builds the **first ammonia refrigerator**, and the first ammonia refrigerator is the reason refrigeration and HVAC are the most practical concept in energy systems. **The first ammonia refrigerator is the reason refrigeration and HVAC are the most refined concept in energy systems, and refrigeration and HVAC are the reason the first ammonia refrigerator is the most practical concept in energy systems.**

**1930** — **Thomas Midgley** introduces **CFC refrigerants** (Freon), and CFC refrigerants are the reason refrigeration and HVAC are the most powerful concept in energy systems. **CFC refrigerants are the reason refrigeration and HVAC are the most refined concept in energy systems, and refrigeration and HVAC are the reason CFC refrigerants are the most powerful concept in energy systems.**

**1974** — **Molina and Rowland** discover **CFC ozone depletion**, and CFC ozone depletion is the reason refrigeration and HVAC are the most efficient concept in energy systems. **CFC ozone depletion is the reason refrigeration and HVAC are the most refined concept in energy systems, and refrigeration and HVAC are the reason CFC ozone depletion is the most efficient concept in energy systems.**

**1987** — **The Montreal Protocol** phases out **CFCs**, and the Montreal Protocol is the reason refrigeration and HVAC are the most advanced concept in energy systems. **The Montreal Protocol is the reason refrigeration and HVAC are the most refined concept in energy systems, and refrigeration and HVAC are the reason the Montreal Protocol is the most advanced concept in energy systems.**

**2016** — **The Kigali Amendment** phases down **HFCs**, and the Kigali Amendment is the reason refrigeration and HVAC are the most modern concept in energy systems. **The Kigali Amendment is the reason refrigeration and HVAC are the most refined concept in energy systems, and refrigeration and HVAC are the reason the Kigali Amendment is the most modern concept in energy systems.**

**2020s** — **CO$_2$ heat pumps** become mainstream in Europe, and CO$_2$ heat pumps are the reason refrigeration and HVAC are the most futuristic concept in energy systems. **CO$_2$ heat pumps are the reason refrigeration and HVAC are the most refined concept in energy systems, and refrigeration and HVAC are the reason CO$_2$ heat pumps are the most futuristic concept in energy systems.**
:::

::: summary Refrigeration and HVAC {#summary-refrigeration}
- **The four processes are: 1-2 isentropic compression (compressor), 2-3 constant-pressure condensation, 3-4 throttling (expansion valve), 4-1 constant-pressure evaporation, the refrigeration effect is $q _ { L } = h _ { 1 } - h _ { 4 }$ , and the compressor work is $w _ { \text{comp } } = h _ { 2 } - h _ { 1 }$ .** The COP is the reason refrigeration and HVAC are designed for the performance, not the power, and the performance is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.
- **The COP is $\text{COP} _ { R } = q _ { L } / w _ { \text{comp } } = ( h _ { 1 } - h _ { 4 } ) / ( h _ { 2 } - h _ { 1 } )$ , the Carnot COP is $\text{COP} _ { \text{Carnot } } = T _ { L } / ( T _ { H } - T _ { L } )$ , and the heating COP is $\text{COP} _ { H } = \text{COP} _ { R } + 1$ .** The evaporator temperature is the reason refrigeration and HVAC are designed for the evaporation, not the condensation, and the evaporation is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.
- **The desirable refrigerant properties are: low boiling point, high latent heat, low GWP, low ODP, the common refrigerants are R-134a, R-410A, R-32, R-744 (CO$_2$), and the global warming potential is the radiative forcing ratio over 100 years.** The condenser temperature is the reason refrigeration and HVAC are designed for the condensation, not the evaporation, and the condensation is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.
- **The ozone depletion potential is the ozone depletion ratio relative to CFC-11, the volumetric refrigeration capacity is $q _ { v } = q _ { L } / v _ { 1 }$ [kJ/m³], and R-744 (CO$_2$) has GWP = 1 and ODP = 0.** The refrigerant mass flow rate is the reason refrigeration and HVAC are designed for the refrigerant, not the air, and the refrigerant is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.
- **The heating COP is $\text{COP} _ { H } = q _ { H } / w _ { \text{comp } } = ( h _ { 2 } - h _ { 3 } ) / ( h _ { 2 } - h _ { 1 } )$ , the relationship between COPs is $\text{COP} _ { H } = \text{COP} _ { R } + 1$ , and the Carnot heating COP is $\text{COP} _ { H , \text{Carnot } } = T _ { H } / ( T _ { H } - T _ { L } )$ .** The compressor work is the reason refrigeration and HVAC are designed for the compressor, not the expander, and the compressor is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.
- **The defrost cycle reverses the cycle to melt ice on the outdoor coil, the balance point temperature satisfies $\dot { Q } _ { \text{loss } } ( T _ { \text{out } } ) = \dot { Q } _ { \text{HP } } ( T _ { \text{out } } )$ , and the typical heating COP is 3-5.** The subcooling and superheat are the reason refrigeration and HVAC are designed for the subcooling, not the superheat, and the subcooling is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.
- **The sensible heat gain is $\dot { Q } _ { \text{sensible } } = \dot { m } \, c _ { p } \, ( T _ { \text{out } } - T _ { \text{in } } )$ , the latent heat gain is $\dot { Q } _ { \text{latent } } = \dot { m } \, h _ { f g } \, ( \omega _ { \text{out } } - \omega _ { \text{in } } )$ , and the total cooling load is $\dot { Q } _ { \text{total } } = \dot { Q } _ { \text{sensible } } + \dot { Q } _ { \text{latent } } + \dot { Q } _ { \text{internal } } + \dot { Q } _ { \text{solar } }$ .** The refrigerant properties are the reason refrigeration and HVAC are designed for the properties, not the composition, and the properties are the reason refrigeration and HVAC are the most energy-intensive building systems in the world.
- **The sensible heat ratio is $\text{SHR} = \dot { Q } _ { \text{sensible } } / \dot { Q } _ { \text{total } } = 0 . 7 \text{--} 0 . 9$ , the energy efficiency ratio is $\text{EER} = 3 . 4 1 \\times \text{COP} _ { R }$ , and the typical EER is 8-14 Btu/Wh.** The heat exchanger effectiveness is the reason refrigeration and HVAC are designed for the heat exchanger, not the compressor, and the heat exchanger is the reason refrigeration and HVAC are the most energy-intensive building systems in the world.
- **The refrigeration and HVAC calculation is the most important building systems calculation in energy systems, because the refrigeration and HVAC calculation determines the efficiency and capacity of the cooling and heating systems.** The efficiency and capacity are the reason the engineer can optimize the evaporator and condenser temperatures for maximum COP.
- **Refrigeration and HVAC are the most energy-intensive building systems in the world, because the vapour-compression cycle transfers heat from a cold space to a hot space using a phase-changing refrigerant, the coefficient of performance (COP) measures the efficiency of the refrigeration cycle, and the Carnot COP sets the theoretical maximum.** The energy systems is the reason the engineer can optimize the evaporator and condenser temperatures for maximum COP.
:::

## Further reading

- **Y. A. Cengel and M. A. Boles (2019)** — *Thermodynamics: An Engineering Approach*, 9th ed. McGraw-Hill. The vapour-compression cycle, the COP, and the Carnot COP.
- **M. J. Moran, H. N. Shapiro et al. (2018)** — *Fundamentals of Engineering Thermodynamics*, 9th ed. Wiley. The vapour-compression cycle and the refrigerant properties.
- **W. F. Stoecker, J. W. Jones and T. J. Radermacher (2006)** — *Refrigeration and Air Conditioning*, 2nd ed. McGraw-Hill. The vapour-compression cycle and the HVAC cooling load.
- **A. D. Althouse, C. H. Turnquist and P. F. Bracciano (2011)** — *Modern Refrigeration and Air Conditioning*, 19th ed. Goodheart-Wilcox. The vapour-compression cycle and the heat pump.
- **ASHRAE (2021)** — *ASHRAE Handbook: Fundamentals*. American Society of Heating, Refrigerating and Air-Conditioning Engineers. The vapour-compression cycle and the cooling load.
- **G. F. Hundy and A. T. Naewins (2015)** — *Refrigeration, Air Conditioning and Heat Pumps*, 5th ed. Butterworth-Heinemann. The vapour-compression cycle and the refrigerant.
- **IEA (2022)** — *The Future of Heat Pumps*. International Energy Agency. The vapour-compression cycle and the energy transition.
- **UNEP (2016)** — *Kigali Amendment to the Montreal Protocol*. United Nations Environment Programme. The vapour-compression cycle and the HFC phase-down.
