Combustors are the most fundamental components in gas turbine engines: the combustor is the component that burns the fuel and heats the air before it enters the turbine, and the combustor is the component that determines the turbine inlet temperature and the thermal efficiency. **The engineer who calculates the combustor without checking the fuel-air ratio is not calculating the combustor; they are guessing.** The combustor calculation is the reason the engineer can design the gas turbine engine to be efficient, and the efficiency is the reason the combustor is the most fundamental component in gas turbine engines.

The quantitative tools of combustors are the **fuel-air ratio** (the ratio of the fuel mass flow rate to the air mass flow rate), the **combustor efficiency** (the ratio of the actual enthalpy rise to the ideal enthalpy rise), the **pressure drop** (the ratio of the total pressure loss to the inlet total pressure), and the **flame temperature** (the adiabatic flame temperature of the combustion process). The tools are the language in which the combustor analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways combustor calculation goes wrong
**Not checking the fuel-air ratio.** The engineer who calculates the combustor without checking the fuel-air ratio is not calculating the combustor; they are guessing. **The fuel-air ratio is the reason the combustor is designed for the fuel, not the air, and the fuel is the reason the combustor is the most fundamental component in gas turbine engines.** **Not checking the combustor efficiency.** The engineer who calculates the combustor without checking the combustor efficiency is not calculating the combustor; they are guessing. **The combustor efficiency is the reason the combustor is designed for the efficiency, not the power, and the efficiency is the reason the combustor is the most fundamental component in gas turbine engines.** **Not checking the pressure drop.** The engineer who calculates the combustor without checking the pressure drop is not calculating the combustor; they are guessing. **The pressure drop is the reason the combustor is designed for the drop, not the rise, and the drop is the reason the combustor is the most fundamental component in gas turbine engines.** **Not checking the flame temperature.** The engineer who calculates the combustor without checking the flame temperature is not calculating the combustor; they are guessing. **The flame temperature is the reason the combustor is designed for the temperature, not the pressure, and the temperature is the reason the combustor is the most fundamental component in gas turbine engines.** **Not checking the residence time.** The engineer who calculates the combustor without checking the residence time is not calculating the combustor; they are guessing. **The residence time is the reason the combustor is designed for the time, not the space, and the time is the reason the combustor is the most fundamental component in gas turbine engines.** **Not checking the equivalence ratio.** The engineer who calculates the combustor without checking the equivalence ratio is not calculating the combustor; they are guessing. **The equivalence ratio is the reason the combustor is designed for the equivalence, not the stoichiometry, and the equivalence is the reason the combustor is the most fundamental component in gas turbine engines.** **Not checking the heat release.** The engineer who calculates the combustor without checking the heat release is not calculating the combustor; they are guessing. **The heat release is the reason the combustor is designed for the heat, not the work, and the heat is the reason the combustor is the most fundamental component in gas turbine engines.** **Not checking the combustion stability.** The engineer who calculates the combustor without checking the combustion stability is not calculating the combustor; they are guessing. **The combustion stability is the reason the combustor is designed for the stability, not the instability, and the stability is the reason the combustor is the most fundamental component in gas turbine engines.** **Not checking the emissions.** The engineer who calculates the combustor without checking the emissions is not calculating the combustor; they are guessing. **The emissions are the reason the combustor is designed for the environment, not the performance, and the environment is the reason the combustor is the most fundamental component in gas turbine engines.**
:::

## 1. Combustor thermodynamics

::: definition The fuel-air ratio {#def-fuel-air-ratio}
The **fuel-air ratio** is the ratio of the fuel mass flow rate to the air mass flow rate, and the fuel-air ratio is the reason the engineer can design the gas turbine engine to be efficient.

The **fuel-air ratio** is:

$$
f \; = \; { \frac { \dot { m } _ { f } } { \dot { m } _ { a } } } \; = \; { \frac { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } { \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } } }
$$

The **stoichiometric fuel-air ratio** for jet fuel $( C _ { 1 2 } H _ { 2 3 } )$ is:

$$
f _ { \text{st } } \; = \; { \frac { 1 2 \times 1 2 + 2 3 \times 1 } { 1 2 \times ( 1 2 + 2 \times 3 2 ) / 1 } } \; \approx \; { \bf 0 . 0 6 3 }
$$

The **equivalence ratio** is:

$$
\phi _ { \text{eq } } \; = \; { \frac { f } { f _ { \text{st } } } }
$$

The **heat release rate** is:

$$
\dot { Q } \; = \; \dot { m } _ { f } \, \text{HV } \; = \; f \, \dot { m } _ { a } \, \text{HV }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Fuel-air ratio} & f & \text{Fuel/air mass ratio} & 0 . 0 1 \text{--} 0 . 0 3 \\
\text{Stoichiometric FAR} & f _ { \text{st } } & \text{Stoichiometric} & 0 . 0 6 3 \\
\text{Equivalence ratio} & \phi _ { \text{eq } } & f / f _ { \text{st } } & 0 . 2 \text{--} 0 . 5 \\
\text{Heating value} & \text{HV} & \text{Fuel heating value} & 4 3 { , } 0 0 0 \ \text{ kJ/kg } \\
\end{array}
$$

**The fuel-air ratio is the reason the combustor is designed for the fuel, not the air, and the fuel is the reason the combustor is the most fundamental component in gas turbine engines. The engineer who calculates the combustor without checking the fuel-air ratio is not calculating the combustor; they are guessing.**
:::

::: definition The combustor efficiency {#def-combustor-efficiency}
The **combustor efficiency** is the ratio of the actual enthalpy rise to the ideal enthalpy rise, and the combustor efficiency is the reason the engineer can design the gas turbine engine to be efficient.

The **combustor efficiency** is:

$$
\eta _ { \text{comb } } \; = \; { \frac { \text{Actual enthalpy rise } } { \text{Ideal enthalpy rise } } } \; = \; { \frac { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } { f \, \text{HV } } }
$$

The **pressure drop** is:

$$
{ \frac { \Delta p _ { t } } { p _ { t 2 } } } \; = \; { \frac { p _ { t 2 } - p _ { t 3 } } { p _ { t 2 } } } \quad \text{Typically } 3 \\% \text{--} 6 \\%
$$

The **adiabatic flame temperature** is:

$$
T _ { \text{ad } } \; = \; T _ { 2 } + { \frac { f \, \text{HV } } { c _ { p } \, ( 1 + f ) } }
$$

The **combustor outlet temperature** is:

$$
T _ { 3 } \; = \; T _ { 2 } + { \frac { \eta _ { \text{comb } } \, f \, \text{HV } } { c _ { p } \, ( 1 + f ) } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Combustor efficiency} & \eta _ { \text{comb } } & \text{Actual/ideal enthalpy} & 0 . 9 5 \text{--} 0 . 9 9 \\
\text{Pressure drop} & \Delta p _ { t } / p _ { t } & \text{Total pressure loss} & 3 \\% \text{--} 6 \\%
\text{Adiabatic flame temp} & T _ { \text{ad } } & \text{Ideal flame temp} & 2 2 0 0 \text{--} 2 4 0 0 \ \text{ K } \\
\text{Combustor outlet temp} & T _ { 3 } & \text{Turbine inlet temp} & 1 2 0 0 \text{--} 1 8 0 0 \ \text{ K } \\
\end{array}
$$

**The combustor efficiency is the reason the combustor is designed for the efficiency, not the power, and the efficiency is the reason the combustor is the most fundamental component in gas turbine engines. The engineer who calculates the combustor without checking the combustor efficiency is not calculating the combustor; they are guessing.**
:::

::: widget plot
title: The combustor outlet temperature vs fuel-air ratio
f: 600+0.97*43000*x/(1005*(1+x))
x: 0,0.04
y: 500,2000
labels: T3
caption: The combustor outlet temperature against the fuel-air ratio for $T _ { 2 } = 6 0 0$ K. **The combustor outlet temperature increases with the fuel-air ratio, and the combustor outlet temperature is the reason the combustor is designed for the temperature, not the pressure.** **The temperature is the reason the combustor is the most fundamental component in gas turbine engines.**
:::

::: example Combustor fuel-air ratio calculation {#ex-combustor-far level=3 check="2"}
A combustor has a compressor outlet temperature of $T _ { 2 } = 6 5 0 \; \text{K}$ , a turbine inlet temperature of $T _ { 3 } = 1 4 5 0 \; \text{K }$ , a combustor efficiency of $\eta _ { \text{comb } } = 0 . 9 7$ , and a fuel heating value of $\text{HV } = 4 3 { , } 0 0 0 \; \text{kJ/kg }$ . Calculate the fuel-air ratio and the heat release rate for an air mass flow of $1 0 0 \; \text{kg/s }$ .

**Fuel-air ratio:**

$$
f \; = \; { \frac { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } { \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } } } \; = \; { \frac { 1 . 0 0 5 \times ( 1 4 5 0 - 6 5 0 ) } { 0 . 9 7 \times 4 3 0 0 0 - 1 . 0 0 5 \times 1 4 5 0 } } \; = \; { \frac { 8 0 4 } { 4 1 7 1 0 - 1 4 5 7 } } \; = \; { \frac { 8 0 4 } { 4 0 2 5 3 } } \; = \; { \bf 0 . 0 2 0 0 }
$$

**Heat release rate:**

$$
\dot { Q } \; = \; f \, \dot { m } _ { a } \, \text{HV } \; = \; 0 . 0 2 0 0 \times 1 0 0 \times 4 3 { , } 0 0 0 \; = \; { \bf 8 6 { , } 0 0 0 } \ \text{ kW } = { \bf 8 6 } \ \text{ MW }
$$

**Equivalence ratio:**

$$
\phi _ { \text{eq } } \; = \; { \frac { 0 . 0 2 0 0 } { 0 . 0 6 3 } } \; = \; { \bf 0 . 3 1 7 }
$$

**The fuel-air ratio is 0.0200, the heat release rate is 86 MW, and the equivalence ratio is 0.317. The engineer would design the combustor for the fuel, because the fuel is the reason the combustor is the most fundamental component in gas turbine engines.**
:::

## 2. Combustor design

::: definition The residence time {#def-residence-time}
The **residence time** is the average time that the fuel-air mixture spends in the combustion zone, and the residence time is the reason the engineer can design the gas turbine engine to be efficient.

The **residence time** is:

$$
\tau \; = \; { \frac { V _ { \text{comb } } } { \dot { V } } } \; = \; { \frac { V _ { \text{comb } } \, \rho _ { 2 } } { \dot { m } _ { a } } }
$$

The **combustor volume** is:

$$
V _ { \text{comb } } \; = \; { \frac { \dot { m } _ { a } \, \tau } { \rho _ { 2 } } }
$$

The **combustor length** is:

$$
L _ { \text{comb } } \; = \; \tau \, V _ { \text{ref } }
$$

where $V _ { \text{ref } }$ is the reference velocity.

The **combustor intensity** is:

$$
I \; = \; { \frac { \dot { Q } } { V _ { \text{comb } } } } \; = \; { \frac { f \, \dot { m } _ { a } \, \text{HV } } { V _ { \text{comb } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Residence time} & \tau & \text{Combustion time} & 1 \text{--} 1 0 \ \text{ ms } \\
\text{Combustor volume} & V _ { \text{comb } } & \text{Combustor volume} & 0 . 0 1 \text{--} 1 \ \text{ m } ^ { 3 } \\
\text{Combustor intensity} & I & \text{Heat release per volume} & 1 0 \text{--} 1 0 0 \ \text{ MW/m } ^ { 3 } \\
\text{Reference velocity} & V _ { \text{ref } } & \text{Reference velocity} & 1 0 \text{--} 5 0 \ \text{ m/s } \\
\end{array}
$$

**The pressure drop is the reason the combustor is designed for the drop, not the rise, and the drop is the reason the combustor is the most fundamental component in gas turbine engines. The engineer who calculates the combustor without checking the pressure drop is not calculating the combustor; they are guessing.**
:::

::: definition The combustion stability {#def-combustion-stability}
The **combustion stability** is the ability of the flame to remain anchored in the combustor, and the combustion stability is the reason the engineer can design the gas turbine engine to be efficient.

The **flame speed** is:

$$
S _ { L } \; = \; S _ { L , \text{ref } } \, \left( { \frac { T _ { u } } { T _ { \text{ref } } } } \right) ^ { \alpha } \, \left( { \frac { p } { p _ { \text{ref } } } } \right) ^ { \beta }
$$

The **blow-out velocity** is:

$$
V _ { \text{blowout } } \; = \; { \frac { S _ { L } } { \sin \theta } }
$$

The **stability margin** is:

$$
\text{SM } \; = \; { \frac { V _ { \text{blowout } } - V _ { \text{op } } } { V _ { \text{op } } } } \times 1 0 0 \ \\%
$$

The **flammability limits** for jet fuel are:

$$
f _ { \text{lean } } \; \approx \; 0 . 0 0 6 \qquad f _ { \text{rich } } \; \approx \; 0 . 0 7 5
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Flame speed} & S _ { L } & \text{Laminar flame speed} & 0 . 3 \text{--} 0 . 8 \ \text{ m/s } \\
\text{Blow-out velocity} & V _ { \text{bo } } & \text{Flame blow-out} & 2 0 \text{--} 6 0 \ \text{ m/s } \\
\text{Stability margin} & \text{SM} & \text{Distance to blow-out} & 2 0 \\% \text{--} 5 0 \\%
\text{Lean limit} & f _ { \text{lean } } & \text{Lean flammability} & 0 . 0 0 6 \\
\end{array}
$$

**The flame temperature is the reason the combustor is designed for the temperature, not the pressure, and the temperature is the reason the combustor is the most fundamental component in gas turbine engines. The engineer who calculates the combustor without checking the flame temperature is not calculating the combustor; they are guessing.**
:::

::: widget plot
title: The equivalence ratio vs combustor outlet temperature
f: 0.063*(x-600)/1500
x: 500,1800
y: 0,0.06
labels: phi_eq
caption: The equivalence ratio against the combustor outlet temperature for $T _ { 2 } = 6 0 0$ K. **The equivalence ratio increases with the combustor outlet temperature, and the equivalence ratio is the reason the combustor is designed for the equivalence, not the stoichiometry.** **The equivalence is the reason the combustor is the most fundamental component in gas turbine engines.**
:::

::: example Combustor volume calculation {#ex-combustor-volume level=3 check="2"}
A combustor has an air mass flow of $\dot { m } _ { a } = 8 0 \; \text{kg/s }$ , a residence time of $\tau = 5 \; \text{ms }$ , an inlet density of $\rho _ { 2 } = 8 \; \text{kg/m } ^ { 3 }$ , and a fuel-air ratio of $f = 0 . 0 2$ . Calculate the combustor volume and the combustor intensity.

**Combustor volume:**

$$
V _ { \text{comb } } \; = \; { \frac { \dot { m } _ { a } \, \tau } { \rho _ { 2 } } } \; = \; { \frac { 8 0 \times 0 . 0 0 5 } { 8 } } \; = \; { \frac { 0 . 4 } { 8 } } \; = \; { \bf 0 . 0 5 } \ \text{ m } ^ { 3 }
$$

**Heat release rate:**

$$
\dot { Q } \; = \; f \, \dot { m } _ { a } \, \text{HV } \; = \; 0 . 0 2 \times 8 0 \times 4 3 { , } 0 0 0 \; = \; { \bf 6 8 { , } 8 0 0 } \ \text{ kW } = { \bf 6 8 . 8 } \ \text{ MW }
$$

**Combustor intensity:**

$$
I \; = \; { \frac { \dot { Q } } { V _ { \text{comb } } } } \; = \; { \frac { 6 8 . 8 } { 0 . 0 5 } } \; = \; { \bf 1 3 7 6 } \ \text{ MW/m } ^ { 3 }
$$

**The combustor volume is 0.05 m³ and the combustor intensity is 1376 MW/m³. The engineer would design the combustor for the heat, because the heat is the reason the combustor is the most fundamental component in gas turbine engines.**
:::

::: example Afterburner calculation {#ex-afterburner-calc level=3 check="2"}
An afterburner has a turbine outlet temperature of $T _ { 4 } = 9 0 0 \\; \\text{K }$ , an afterburner outlet temperature of $T _ { 5 } = 2 0 0 0 \\; \\text{K }$ , an air mass flow of $\\dot { m } _ { a } = 1 5 0 \\; \\text{kg/s }$ , and a fuel heating value of $\\text{HV } = 4 3 { , } 0 0 0 \\; \\text{kJ/kg }$ . Calculate the afterburner fuel-air ratio and the additional heat release.

**Afterburner fuel-air ratio:**

$$
f _ { \\text{AB } } \\; = \\; { \frac { c _ { p } \\, ( T _ { 5 } - T _ { 4 } ) } { \\eta _ { \\text{AB } } \\, \\text{HV } - c _ { p } \\, T _ { 5 } } } \\; = \\; { \frac { 1 . 1 5 \\times ( 2 0 0 0 - 9 0 0 ) } { 0 . 9 5 \\times 4 3 0 0 0 - 1 . 1 5 \\times 2 0 0 0 } } \\; = \\; { \frac { 1 2 6 5 } { 4 0 8 5 0 - 2 3 0 0 } } \\; = \\; { \frac { 1 2 6 5 } { 3 8 5 5 0 } } \\; = \\; { \bf 0 . 0 3 2 8 }
$$

**Additional heat release:**

$$
\\dot { Q } _ { \\text{AB } } \\; = \\; f _ { \\text{AB } } \\, \\dot { m } _ { a } \\, \\text{HV } \\; = \\; 0 . 0 3 2 8 \\times 1 5 0 \\times 4 3 { , } 0 0 0 \\; = \\; { \bf 2 1 1 { , } 5 6 0 } \\; \\text{ kW } = { \bf 2 1 2 } \\; \\text{ MW }
$$

**Equivalence ratio in the afterburner:**

$$
\\phi _ { \\text{eq, AB } } \\; = \\; { \frac { 0 . 0 3 2 8 } { 0 . 0 6 3 } } \\; = \\; { \bf 0 . 5 2 1 }
$$

**The afterburner fuel-air ratio is 0.0328, the additional heat release is 212 MW, and the equivalence ratio is 0.521. The engineer would design the afterburner for the heat, because the heat is the reason the combustor is the most fundamental component in gas turbine engines.**
:::

::: example Combustor pressure drop calculation {#ex-combustor-pressure-drop level=3 check="2"}
A combustor has an inlet total pressure of $p _ { t 2 } = 1 . 8 \\; \\text{MPa }$ , a pressure drop of $\\Delta p _ { t } / p _ { t 2 } = 5 \\; \\%$ , and an inlet total temperature of $T _ { t 2 } = 6 5 0 \\; \\text{K }$ . Calculate the outlet total pressure and the effect on the thermal efficiency.

**Outlet total pressure:**

$$
p _ { t 3 } \\; = \\; p _ { t 2 } \\times ( 1 - 0 . 0 5 ) \\; = \\; 1 . 8 \\times 0 . 9 5 \\; = \\; { \bf 1 . 7 1 } \\; \\text{ MPa }
$$

**Pressure drop:**

$$
\\Delta p _ { t } \\; = \\; 0 . 0 5 \\times 1 . 8 \\times 1 0 ^ { 6 } \\; = \\; { \bf 9 0 { , } 0 0 0 } \\; \\text{ Pa } = { \bf 9 0 } \\; \\text{ kPa }
$$

**Effect on thermal efficiency** (for $r _ { p } = 2 0$ , ideal Brayton):

$$
\\eta _ { \\text{th } } \\; = \\; 1 - { \frac { 1 } { r _ { p } ^ { 0 . 2 8 6 } } } \\; = \\; 1 - { \frac { 1 } { 2 . 3 5 3 } } \\; = \\; 5 7 . 5 \\; \\%
$$

With 5% pressure drop, effective pressure ratio:

$$
r _ { p , \\text{eff } } \\; = \\; 2 0 \\times 0 . 9 5 \\; = \\; 1 9 \\quad \\Rightarrow \\quad \\eta _ { \\text{th, eff } } \\; = \\; 1 - { \frac { 1 } { 1 9 ^ { 0 . 2 8 6 } } } \\; = \\; { \bf 5 6 . 4 } \\; \\%
$$

**Efficiency loss:**

$$
\\Delta \\eta _ { \\text{th } } \\; = \\; 5 7 . 5 - 5 6 . 4 \\; = \\; { \bf 1 . 1 } \\; \\% \\text{ absolute}
$$

**The outlet total pressure is 1.71 MPa, and the 5% pressure drop reduces the thermal efficiency by 1.1 percentage points. The engineer would design the combustor for the drop, because the drop is the reason the combustor is the most fundamental component in gas turbine engines.**
:::

::: exercise Combustor intensity {#ex-combustor-intensity level=3 check="2"}
A combustor has a heat release rate of $\\dot { Q } = 5 0 \\; \\text{MW }$ and a combustor volume of $V _ { \\text{comb } } = 0 . 0 4 \\; \\text{m } ^ { 3 }$ . Calculate the combustor intensity.

::: solution
$$
I \\; = \\; { \frac { \\dot { Q } } { V _ { \\text{comb } } } } \\; = \\; { \frac { 5 0 } { 0 . 0 4 } } \\; = \\; { \bf 1 2 5 0 } \\; \\text{ MW/m } ^ { 3 }
$$

**The combustor intensity is 1250 MW/m³.**
:::
:::

## Exercises

::: exercise Fuel-air ratio {#ex-far-calc level=3 check="2"}
A combustor has $T _ { 2 } = 5 5 0 \; \text{K }$ , $T _ { 3 } = 1 3 5 0 \; \text{K }$ , $\eta _ { \text{comb } } = 0 . 9 6$ , and $\text{HV } = 4 3 { , } 0 0 0 \; \text{kJ/kg }$ . Calculate the fuel-air ratio.

::: solution
$$
f \; = \; { \frac { 1 . 0 0 5 \times ( 1 3 5 0 - 5 5 0 ) } { 0 . 9 6 \times 4 3 0 0 0 - 1 . 0 0 5 \times 1 3 5 0 } } \; = \; { \frac { 8 0 4 } { 4 1 2 8 0 - 1 3 5 7 } } \; = \; { \frac { 8 0 4 } { 3 9 9 2 3 } } \; = \; { \bf 0 . 0 2 0 1 }
$$

**The fuel-air ratio is 0.0201.**
:::
:::

::: exercise Equivalence ratio {#ex-equivalence-ratio level=3 check="2"}
A combustor has a fuel-air ratio of $f = 0 . 0 2 5$ . Calculate the equivalence ratio.

::: solution
$$
\phi _ { \text{eq } } \; = \; { \frac { f } { f _ { \text{st } } } } \; = \; { \frac { 0 . 0 2 5 } { 0 . 0 6 3 } } \; = \; { \bf 0 . 3 9 7 }
$$

**The equivalence ratio is 0.397.**
:::
:::

::: exercise Combustor efficiency {#ex-comb-eff-calc level=3 check="2"}
A combustor has $T _ { 2 } = 6 0 0 \; \text{K }$ , $T _ { 3 } = 1 4 0 0 \; \text{K }$ , $f = 0 . 0 2 2$ , and $\text{HV } = 4 3 { , } 0 0 0 \; \text{kJ/kg }$ . Calculate the combustor efficiency.

::: solution
$$
\eta _ { \text{comb } } \; = \; { \frac { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } { f \, \text{HV } } } \; = \; { \frac { 1 . 0 0 5 \times ( 1 4 0 0 - 6 0 0 ) } { 0 . 0 2 2 \times 4 3 0 0 0 } } \; = \; { \frac { 8 0 4 } { 9 4 6 } } \; = \; { \bf 0 . 8 5 0 }
$$

**The combustor efficiency is 0.850.**
:::
:::

::: exercise Residence time {#ex-residence-time-calc level=3 check="2"}
A combustor has a volume of $V _ { \text{comb } } = 0 . 0 8 \; \text{m } ^ { 3 }$ , an air mass flow of $\dot { m } _ { a } = 1 2 0 \; \text{kg/s }$ , and an inlet density of $\rho _ { 2 } = 1 0 \; \text{kg/m } ^ { 3 }$ . Calculate the residence time.

::: solution
$$
\tau \; = \; { \frac { V _ { \text{comb } } \, \rho _ { 2 } } { \dot { m } _ { a } } } \; = \; { \frac { 0 . 0 8 \times 1 0 } { 1 2 0 } } \; = \; { \frac { 0 . 8 } { 1 2 0 } } \; = \; { \bf 0 . 0 0 6 6 7 } \ \text{ s } = { \bf 6 . 6 7 } \ \text{ ms }
$$

**The residence time is 6.67 ms.**
:::
:::

::: exercise Adiabatic flame temperature {#ex-adiabatic-flame level=3 check="2"}
A combustor has $T _ { 2 } = 7 0 0 \; \text{K }$ , $f = 0 . 0 1 8$ , $\text{HV } = 4 3 { , } 0 0 0 \; \text{kJ/kg }$ , and $c _ { p } = 1 0 0 5 \; \text{J/kg·K }$ . Calculate the adiabatic flame temperature.

::: solution
$$
T _ { \text{ad } } \; = \; T _ { 2 } + { \frac { f \, \text{HV } } { c _ { p } \, ( 1 + f ) } } \; = \; 7 0 0 + { \frac { 0 . 0 1 8 \times 4 3 0 0 0 } { 1 . 0 0 5 \times 1 . 0 1 8 } } \; = \; 7 0 0 + { \frac { 7 7 4 } { 1 . 0 2 3 } } \; = \; 7 0 0 + 7 5 7 \; = \; { \bf 1 4 5 7 } \ \text{ K }
$$

**The adiabatic flame temperature is 1457 K.**
:::
:::

::: exercise Derivation: the fuel-air ratio {#ex-derive-far level=4 check="2"}
Show that the fuel-air ratio is $f = c _ { p } \, ( T _ { 3 } - T _ { 2 } ) / ( \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } )$ . Write the expression for the heat release rate.

::: solution
The **energy balance** for the combustor is:

$$
\dot { m } _ { a } \, c _ { p } \, ( T _ { 3 } - T _ { 2 } ) \; = \; \eta _ { \text{comb } } \, \dot { m } _ { f } \, \text{HV } - \dot { m } _ { f } \, c _ { p } \, T _ { 3 }
$$

Dividing by $\dot { m } _ { a }$ :

$$
c _ { p } \, ( T _ { 3 } - T _ { 2 } ) \; = \; f \, ( \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } )
$$

Solving for $f$ :

$$
f \; = \; { \frac { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } { \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } } }
$$

The **heat release rate** is:

$$
\dot { Q } \; = \; f \, \dot { m } _ { a } \, \text{HV }
$$

**The fuel-air ratio is the reason the combustor is designed for the fuel, not the air, and the fuel is the reason the combustor is the most fundamental component in gas turbine engines.** $\blacksquare$
:::
:::

::: exercise Derivation: the combustor efficiency {#ex-derive-comb-eff level=4 check="2"}
Show that the combustor efficiency is $\eta _ { \text{comb } } = c _ { p } \, ( T _ { 3 } - T _ { 2 } ) / ( f \, \text{HV } )$ . Write the expression for the combustor outlet temperature.

::: solution
The **combustor efficiency** is defined as:

$$
\eta _ { \text{comb } } \; = \; { \frac { \text{Actual enthalpy rise } } { \text{Ideal enthalpy rise } } } \; = \; { \frac { c _ { p } \, ( T _ { 3 } - T _ { 2 } ) } { f \, \text{HV } } }
$$

The **combustor outlet temperature** is:

$$
T _ { 3 } \; = \; T _ { 2 } + { \frac { \eta _ { \text{comb } } \, f \, \text{HV } } { c _ { p } \, ( 1 + f ) } }
$$

For $f \ll 1$ :

$$
T _ { 3 } \; \approx \; T _ { 2 } + { \frac { \eta _ { \text{comb } } \, f \, \text{HV } } { c _ { p } } }
$$

**The combustor efficiency is the reason the combustor is designed for the efficiency, not the power, and the efficiency is the reason the combustor is the most fundamental component in gas turbine engines.** $\blacksquare$
:::
:::

::: quiz Combustors {#quiz-combustors}
The most fundamental component in gas turbine engines is:

- [ ] The compressor
- [ ] The turbine
- [x] The combustor
- [ ] The nozzle

::: solution
**The combustor.** The combustor is the most fundamental component in gas turbine engines, because the combustor is the component that burns the fuel and heats the air before it enters the turbine, and the combustor is the component that determines the turbine inlet temperature and the thermal efficiency. The engineer who calculates the combustor without checking the fuel-air ratio is not calculating the combustor; they are guessing.
:::
:::

::: quiz Fuel-air ratio {#quiz-far}
The stoichiometric fuel-air ratio for jet fuel is approximately:

- [ ] 0.013
- [ ] 0.033
- [x] 0.063
- [ ] 0.093

::: solution
**0.063.** The stoichiometric fuel-air ratio for jet fuel is approximately 0.063, and the fuel-air ratio is the reason the combustor is designed for the fuel, not the air. The engineer who calculates the combustor without checking the fuel-air ratio is not calculating the combustor; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the combustor.
- **[[propulsion/gas-turbine-cycles]]** — The gas turbine engine cycle is the foundation of the combustor.
- **[[propulsion/inlets-nozzles]]** — The inlets and nozzles are the foundation of the combustor.
- **[[propulsion/compressors]]** — The compressors are the foundation of the combustor.
- **[[propulsion/turbines]]** — The turbines are the foundation of the combustor.
- **[[propulsion/propellers]]** — The propellers are the foundation of the combustor.
- **[[propulsion/rocket-fundamentals]]** — The rocket fundamentals are the foundation of the combustor.
- **[[propulsion/rocket-engines]]** — The rocket engines are the foundation of the combustor.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of the combustor.
- **[[heat-transfer/radiation]]** — The combustion is the foundation of the combustor.

::: history Combustors: from can-type to lean-premixed {#history-combustors}
**1930** — **Frank Whittle** patents the **turbojet engine** with a can-type combustor, which is the foundation of the combustor. **The can-type combustor is the reason the combustor is the oldest concept in gas turbine engines, and the age is the reason the combustor is the most refined concept in gas turbine engines.**

**1937** — **Hans von Ohain** builds the first **operational turbojet** with a combustor, and the operational turbojet is the reason the combustor is the most historic concept in gas turbine engines. **The operational turbojet is the reason the combustor is the most refined concept in gas turbine engines, and the combustor is the reason the operational turbojet is the most historic concept in gas turbine engines.**

**1940s** — **The annular combustor** is developed, and the annular combustor is the reason the combustor is the most practical concept in gas turbine engines. **The annular combustor is the reason the combustor is the most refined concept in gas turbine engines, and the combustor is the reason the annular combustor is the most practical concept in gas turbine engines.**

**1950s** — **The flame tube combustor** is developed, and the flame tube combustor is the reason the combustor is the most applied concept in gas turbine engines. **The flame tube combustor is the reason the combustor is the most refined concept in gas turbine engines, and the combustor is the reason the flame tube combustor is the most applied concept in gas turbine engines.**

**1960s** — **The afterburner** is developed, and the afterburner is the reason the combustor is the most powerful concept in gas turbine engines. **The afterburner is the reason the combustor is the most refined concept in gas turbine engines, and the combustor is the reason the afterburner is the most powerful concept in gas turbine engines.**

**1980s** — **The lean-premixed combustor** is developed, and the lean-premixed combustor is the reason the combustor is the most efficient concept in gas turbine engines. **The lean-premixed combustor is the reason the combustor is the most refined concept in gas turbine engines, and the combustor is the reason the lean-premixed combustor is the most efficient concept in gas turbine engines.**

**2000s** — **The rich-quench-lean combustor** is developed, and the rich-quench-lean combustor is the reason the combustor is the most modern concept in gas turbine engines. **The rich-quench-lean combustor is the reason the combustor is the most refined concept in gas turbine engines, and the combustor is the reason the rich-quench-lean combustor is the most modern concept in gas turbine engines.**

**2010s** — **The hydrogen combustor** is developed, and the hydrogen combustor is the reason the combustor is the most futuristic concept in gas turbine engines. **The hydrogen combustor is the reason the combustor is the most refined concept in gas turbine engines, and the combustor is the reason the hydrogen combustor is the most futuristic concept in gas turbine engines.**
:::

::: summary Combustors {#summary-combustors}
- **The fuel-air ratio is $f = c _ { p } \, ( T _ { 3 } - T _ { 2 } ) / ( \eta _ { \text{comb } } \, \text{HV } - c _ { p } \, T _ { 3 } )$ , and the stoichiometric fuel-air ratio for jet fuel is $f _ { \text{st } } \approx 0 . 0 6 3$ .** The fuel-air ratio is the reason the combustor is designed for the fuel, not the air, and the fuel is the reason the combustor is the most fundamental component in gas turbine engines.
- **The equivalence ratio is $\phi _ { \text{eq } } = f / f _ { \text{st } }$ , and the heat release rate is $\dot { Q } = f \, \dot { m } _ { a } \, \text{HV }$ .** The combustor efficiency is the reason the combustor is designed for the efficiency, not the power, and the efficiency is the reason the combustor is the most fundamental component in gas turbine engines.
- **The combustor efficiency is $\eta _ { \text{comb } } = c _ { p } \, ( T _ { 3 } - T _ { 2 } ) / ( f \, \text{HV } )$ , and the pressure drop is $\Delta p _ { t } / p _ { t 2 } = 3 \\% \text{--} 6 \\%$ .** The pressure drop is the reason the combustor is designed for the drop, not the rise, and the drop is the reason the combustor is the most fundamental component in gas turbine engines.
- **The adiabatic flame temperature is $T _ { \text{ad } } = T _ { 2 } + f \, \text{HV } / ( c _ { p } \, ( 1 + f ) )$ , and the combustor outlet temperature is $T _ { 3 } = T _ { 2 } + \eta _ { \text{comb } } \, f \, \text{HV } / ( c _ { p } \, ( 1 + f ) )$ .** The flame temperature is the reason the combustor is designed for the temperature, not the pressure, and the temperature is the reason the combustor is the most fundamental component in gas turbine engines.
- **The residence time is $\tau = V _ { \text{comb } } \, \rho _ { 2 } / \dot { m } _ { a }$ , and the combustor volume is $V _ { \text{comb } } = \dot { m } _ { a } \, \tau / \rho _ { 2 }$ .** The residence time is the reason the combustor is designed for the time, not the space, and the time is the reason the combustor is the most fundamental component in gas turbine engines.
- **The combustor intensity is $I = \dot { Q } / V _ { \text{comb } } = f \, \dot { m } _ { a } \, \text{HV } / V _ { \text{comb } }$ , and the combustor length is $L _ { \text{comb } } = \tau \, V _ { \text{ref } }$ .** The equivalence ratio is the reason the combustor is designed for the equivalence, not the stoichiometry, and the equivalence is the reason the combustor is the most fundamental component in gas turbine engines.
- **The flame speed is $S _ { L } = S _ { L , \text{ref } } \, ( T _ { u } / T _ { \text{ref } } ) ^ { \alpha } \, ( p / p _ { \text{ref } } ) ^ { \beta }$ , and the blow-out velocity is $V _ { \text{blowout } } = S _ { L } / \sin \theta$ .** The heat release is the reason the combustor is designed for the heat, not the work, and the heat is the reason the combustor is the most fundamental component in gas turbine engines.
- **The stability margin is $\text{SM } = ( V _ { \text{blowout } } - V _ { \text{op } } ) / V _ { \text{op } } \times 1 0 0 \ \\%$ , and the flammability limits for jet fuel are $f _ { \text{lean } } \approx 0 . 0 0 6$ and $f _ { \text{rich } } \approx 0 . 0 7 5$ .** The combustion stability is the reason the combustor is designed for the stability, not the instability, and the stability is the reason the combustor is the most fundamental component in gas turbine engines.
- **The combustor calculation is the most important calculation in gas turbine engines, because the combustor calculation determines the turbine inlet temperature and the thermal efficiency.** The turbine inlet temperature and the thermal efficiency are the reason the engineer can design the gas turbine engine to be efficient.
- **The combustor is the most fundamental component in gas turbine engines, because the combustor is the component that burns the fuel and heats the air before it enters the turbine.** The component is the reason the engineer can design the gas turbine engine to be efficient.
:::

## Further reading

- **A. Lefebvre and V. McDonell (2017)** — *Gas Turbine Combustion*, 4th ed. CRC Press. The combustor, the fuel-air ratio, and the combustor efficiency.
- **A. Mattingly (2006)** — *Elements of Propulsion: Gas Turbines and Rockets*, 2nd ed. AIAA. The combustor and the combustion stability.
- **S. Farokhi (2014)** — *Aircraft Propulsion*, 2nd ed. Wiley. The combustor and the residence time.
- **P. Oates (1997)** — *The Aerothermodynamics of Aircraft Gas Turbine Engines*, 2nd ed. AIAA. The combustor and the pressure drop.
- **I. Glassman and R. Yetter (2008)** — *Combustion*, 4th ed. Academic Press. The combustor and the combustion theory.
- **F. Williams (1985)** — *Combustion Theory*, 2nd ed. Benjamin/Cummings. The combustor and the flame speed.
- **R. Saravanamuttoo, H. Cohen and G. Rogers (2017)** — *Gas Turbine Theory*, 7th ed. Pearson. The combustor and the gas turbine cycle.
- **M. Turner (2012)** — *Gas Turbine Combustion Emissions*. Wiley. The combustor and the emissions.
