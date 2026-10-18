Inlets and nozzles are the most fundamental components in propulsion: the inlet is the component that slows the air to a usable velocity, and the nozzle is the component that accelerates the gas to produce thrust. **The engineer who calculates the inlet and nozzle without checking the Mach number is not calculating the inlet and nozzle; they are guessing.** The inlet and nozzle calculation is the reason the engineer can design the propulsion system to be efficient, and the efficiency is the reason the inlet and nozzle are the most fundamental components in propulsion.

The quantitative tools of inlets and nozzles are the **diffuser efficiency** (the ratio of the actual pressure recovery to the ideal pressure recovery), the **nozzle efficiency** (the ratio of the actual kinetic energy to the ideal kinetic energy), the **critical pressure ratio** (the pressure ratio at which the nozzle flow becomes sonic), and the **area ratio** (the ratio of the exit area to the throat area). The tools are the language in which the inlet and nozzle analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways inlet and nozzle calculation goes wrong
**Not checking the Mach number.** The engineer who calculates the inlet and nozzle without checking the Mach number is not calculating the inlet and nozzle; they are guessing. **The Mach number is the reason the inlet and nozzle are designed for the compressibility, not the viscosity, and the compressibility is the reason the inlet and nozzle are the most fundamental components in propulsion.** **Not checking the diffuser efficiency.** The engineer who calculates the inlet and nozzle without checking the diffuser efficiency is not calculating the inlet and nozzle; they are guessing. **The diffuser efficiency is the reason the inlet and nozzle are designed for the pressure recovery, not the pressure loss, and the pressure recovery is the reason the inlet and nozzle are the most fundamental components in propulsion.** **Not checking the nozzle efficiency.** The engineer who calculates the inlet and nozzle without checking the nozzle efficiency is not calculating the inlet and nozzle; they are guessing. **The nozzle efficiency is the reason the inlet and nozzle are designed for the kinetic energy, not the enthalpy, and the kinetic energy is the reason the inlet and nozzle are the most fundamental components in propulsion.** **Not checking the critical pressure ratio.** The engineer who calculates the inlet and nozzle without checking the critical pressure ratio is not calculating the inlet and nozzle; they are guessing. **The critical pressure ratio is the reason the inlet and nozzle are designed for the critical, not the subcritical, and the critical is the reason the inlet and nozzle are the most fundamental components in propulsion.** **Not checking the area ratio.** The engineer who calculates the inlet and nozzle without checking the area ratio is not calculating the inlet and nozzle; they are guessing. **The area ratio is the reason the inlet and nozzle are designed for the area, not the pressure, and the area is the reason the inlet and nozzle are the most fundamental components in propulsion.** **Not checking the throat area.** The engineer who calculates the inlet and nozzle without checking the throat area is not calculating the inlet and nozzle; they are guessing. **The throat area is the reason the inlet and nozzle are designed for the throat, not the exit, and the throat is the reason the inlet and nozzle are the most fundamental components in propulsion.** **Not checking the exit Mach number.** The engineer who calculates the inlet and nozzle without checking the exit Mach number is not calculating the inlet and nozzle; they are guessing. **The exit Mach number is the reason the inlet and nozzle are designed for the exit, not the inlet, and the exit is the reason the inlet and nozzle are the most fundamental components in propulsion.** **Not checking the shock wave.** The engineer who calculates the inlet and nozzle without checking the shock wave is not calculating the inlet and nozzle; they are guessing. **The shock wave is the reason the inlet and nozzle are designed for the shock, not the expansion, and the shock is the reason the inlet and nozzle are the most fundamental components in propulsion.** **Not checking the total pressure recovery.** The engineer who calculates the inlet and nozzle without checking the total pressure recovery is not calculating the inlet and nozzle; they are guessing. **The total pressure recovery is the reason the inlet and nozzle are designed for the total, not the static, and the total is the reason the inlet and nozzle are the most fundamental components in propulsion.**
:::

## 1. Inlets

::: definition The diffuser efficiency {#def-diffuser-efficiency}
The **diffuser efficiency** is the ratio of the actual pressure recovery to the ideal pressure recovery, and the diffuser efficiency is the reason the engineer can design the propulsion system to be efficient.

The **diffuser efficiency** is:

$$
\eta _ { d } \; = \; { \frac { p _ { 2 } - p _ { 1 } } { p _ { 2 s } - p _ { 1 } } } \quad \text{(subsonic)} \qquad \eta _ { d } \; = \; { \frac { T _ { 2 s } - T _ { 1 } } { T _ { 2 } - T _ { 1 } } } \quad \text{(all speeds)}
$$

The **total pressure recovery** is:

$$
{ \frac { p _ { t 2 } } { p _ { t 1 } } } \; = \; \eta _ { d } ^ { \gamma / ( \gamma - 1 ) }
$$

The **subsonic diffuser** area ratio is:

$$
{ \frac { A _ { 2 } } { A _ { 1 } } } \; = \; { \frac { V _ { 1 } } { V _ { 2 } } } \, { \frac { \rho _ { 1 } } { \rho _ { 2 } } }
$$

The **pressure recovery** for a subsonic diffuser is:

$$
\text{PR } \; = \; { \frac { p _ { t 2 } } { p _ { t 1 } } } \; = \; \left( 1 + { \frac { \gamma - 1 } { 2 } } \, M ^ { 2 } \right) ^ { \gamma / ( \gamma - 1 ) } \times \eta _ { d }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Diffuser efficiency} & \eta _ { d } & \text{Pressure recovery} & 0 . 8 0 \text{--} 0 . 9 8 \\
\text{Total pressure recovery} & p _ { t 2 } / p _ { t 1 } & \text{Total pressure ratio} & 0 . 8 5 \text{--} 0 . 9 9 \\
\text{Mach number} & M & \text{Inlet Mach number} & 0 . 3 \text{--} 3 \\
\text{Pressure recovery} & \text{PR} & \text{Pressure ratio} & 0 . 8 \text{--} 1 . 0 \\
\end{array}
$$

**The Mach number is the reason the inlet and nozzle are designed for the compressibility, not the viscosity, and the compressibility is the reason the inlet and nozzle are the most fundamental components in propulsion. The engineer who calculates the inlet and nozzle without checking the Mach number is not calculating the inlet and nozzle; they are guessing.**
:::

::: definition The supersonic inlet {#def-supersonic-inlet}
The **supersonic inlet** is the inlet that uses shock waves to slow the flow to subsonic speeds, and the supersonic inlet is the reason the engineer can design the propulsion system to be efficient.

The **normal shock** total pressure ratio is:

$$
{ \frac { p _ { t 2 } } { p _ { t 1 } } } \; = \; \left[ { \frac { ( \gamma + 1 ) \, M _ { 1 } ^ { 2 } } { ( \gamma - 1 ) \, M _ { 1 } ^ { 2 } + 2 } } \right] ^ { \gamma / ( \gamma - 1 ) } \! \cdot \left[ { \frac { \gamma + 1 } { 2 \, \gamma \, M _ { 1 } ^ { 2 } - ( \gamma - 1 ) } } \right] ^ { 1 / ( \gamma - 1 ) }
$$

The **oblique shock** total pressure ratio is higher than the normal shock:

$$
\left( { \frac { p _ { t 2 } } { p _ { t 1 } } } \right) _ { \text{oblique } } \; > \; \left( { \frac { p _ { t 2 } } { p _ { t 1 } } } \right) _ { \text{normal } }
$$

The **optimum inlet Mach number** for a normal shock is:

$$
M _ { \text{opt } } \; \approx \; 1 . 5 \text{--} 2 . 0
$$

The **shock position** for the optimum inlet is:

$$
{ \frac { A _ { \text{throat } } } { A _ { \text{inlet } } } } \; = \; { \frac { 1 } { M _ { 1 } } } \, \left[ { \frac { \gamma + 1 } { 2 + ( \gamma - 1 ) \, M _ { 1 } ^ { 2 } } } \right] ^ { ( \gamma + 1 ) / [ 2 ( \gamma - 1 ) ] }
$$

$$
\begin{array} { l c c c }
\textbf{Inlet type} & \textbf{M1} & \textbf{ } p _ { t 2 } / p _ { t 1 } & \textbf{ Application } \\ \hline
\text{Subsonic} & < 0 . 8 & 0 . 9 8 \text{--} 0 . 9 9 & \text{Turbofan} \\
\text{Normal shock} & 1 . 0 \text{--} 1 . 5 & 0 . 8 0 \text{--} 0 . 9 5 & \text{Ramjet} \\
\text{Oblique shock} & 1 . 5 \text{--} 3 . 0 & 0 . 8 5 \text{--} 0 . 9 5 & \text{Supersonic} \\
\text{Mixed compression} & 3 . 0 \text{--} 6 . 0 & 0 . 7 0 \text{--} 0 . 8 5 & \text{Scramjet} \\
\end{array}
$$

**The diffuser efficiency is the reason the inlet and nozzle are designed for the pressure recovery, not the pressure loss, and the pressure recovery is the reason the inlet and nozzle are the most fundamental components in propulsion. The engineer who calculates the inlet and nozzle without checking the diffuser efficiency is not calculating the inlet and nozzle; they are guessing.**
:::

::: widget plot
title: The total pressure recovery vs Mach number
f: 1-0.07*x^2
x: 0,3
y: 0.3,1
labels: pt2/pt1
caption: The total pressure recovery against the Mach number for a normal shock inlet. **The total pressure recovery decreases with the Mach number, and the total pressure recovery is the reason the inlet and nozzle are designed for the total, not the static.** **The total is the reason the inlet and nozzle are the most fundamental components in propulsion.**
:::

::: example Subsonic inlet calculation {#ex-subsonic-inlet level=3 check="2"}
A subsonic inlet operates at $M _ { 1 } = 0 . 8$ with a total pressure recovery of $p _ { t 2 } / p _ { t 1 } = 0 . 9 8$ . Calculate the static pressure ratio $p _ { 2 } / p _ { 1 }$ and the diffuser efficiency.

**Static pressure ratio:**

$$
{ \frac { p _ { 2 } } { p _ { 1 } } } \; = \; \left( 1 + { \frac { \gamma - 1 } { 2 } } \, M _ { 1 } ^ { 2 } \right) \; = \; 1 + 0 . 2 \times 0 . 6 4 \; = \; { \bf 1 . 1 2 8 }
$$

**Diffuser efficiency:**

$$
\eta _ { d } \; = \; \left( { \frac { p _ { t 2 } } { p _ { t 1 } } } \right) ^ { ( \gamma - 1 ) / \gamma } \; = \; 0 . 9 8 ^ { 0 . 2 8 6 } \; = \; { \bf 0 . 9 9 4 }
$$

**The static pressure ratio is 1.128 and the diffuser efficiency is 0.994. The engineer would design the inlet for the pressure recovery, because the pressure recovery is the reason the inlet and nozzle are the most fundamental components in propulsion.**
:::

## 2. Nozzles

::: definition The nozzle efficiency {#def-nozzle-efficiency}
The **nozzle efficiency** is the ratio of the actual kinetic energy to the ideal kinetic energy, and the nozzle efficiency is the reason the engineer can design the propulsion system to be efficient.

The **nozzle efficiency** is:

$$
\eta _ { n } \; = \; { \frac { V _ { j } ^ { 2 } / 2 } { V _ { j , s } ^ { 2 } / 2 } } \; = \; { \frac { T _ { 4 } - T _ { j } } { T _ { 4 } - T _ { j , s } } }
$$

The **critical pressure ratio** for a converging nozzle is:

$$
\left( { \frac { p ^ { * } } { p _ { t } } } \right) \; = \; \left( { \frac { 2 } { \gamma + 1 } } \right) ^ { \gamma / ( \gamma - 1 ) } \; = \; 0 . 5 2 8 \quad ( \gamma = 1 . 4 )
$$

The **area-Mach relation** for a converging-diverging nozzle is:

$$
{ \frac { A } { A ^ { * } } } \; = \; { \frac { 1 } { M } } \, \left[ { \frac { 2 } { \gamma + 1 } } \, \left( 1 + { \frac { \gamma - 1 } { 2 } } \, M ^ { 2 } \right) \right] ^ { ( \gamma + 1 ) / [ 2 ( \gamma - 1 ) ] }
$$

The **exit Mach number** for a given area ratio is:

$$
{ \frac { A _ { e } } { A _ { t } } } \; = \; f ( M _ { e } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Nozzle efficiency} & \eta _ { n } & \text{Kinetic energy ratio} & 0 . 9 5 \text{--} 0 . 9 9 \\
\text{Critical pressure ratio} & p ^ { * } / p _ { t } & \text{Sonic condition} & 0 . 5 2 8 \\
\text{Area ratio} & A _ { e } / A _ { t } & \text{Exit to throat} & 1 \text{--} 5 0 \\
\text{Exit Mach number} & M _ { e } & \text{Exit Mach} & 0 . 3 \text{--} 5 \\
\end{array}
$$

**The nozzle efficiency is the reason the inlet and nozzle are designed for the kinetic energy, not the enthalpy, and the kinetic energy is the reason the inlet and nozzle are the most fundamental components in propulsion. The engineer who calculates the inlet and nozzle without checking the nozzle efficiency is not calculating the inlet and nozzle; they are guessing.**
:::

::: definition The converging-diverging nozzle {#def-cd-nozzle}
The **converging-diverging nozzle** is the nozzle that accelerates the flow to supersonic speeds, and the converging-diverging nozzle is the reason the engineer can design the propulsion system to be efficient.

The **throat condition** (sonic, $M = 1$ ):

$$
T ^ { * } \; = \; { \frac { 2 } { \gamma + 1 } } \, T _ { t } \; = \; 0 . 8 3 3 \, T _ { t } \qquad p ^ { * } \; = \; 0 . 5 2 8 \, p _ { t } \qquad \rho ^ { * } \; = \; 0 . 5 2 8 \, \rho _ { t }
$$

The **exit Mach number** for a given area ratio:

$$
{ \frac { A _ { e } } { A _ { t } } } \; = \; { \frac { 1 } { M _ { e } } } \, \left[ { \frac { 2 } { \gamma + 1 } } \, \left( 1 + { \frac { \gamma - 1 } { 2 } } \, M _ { e } ^ { 2 } \right) \right] ^ { 3 }
$$

The **exit velocity** is:

$$
V _ { e } \; = \; M _ { e } \, { \sqrt { \gamma \, R \, T _ { e } } } \; = \; M _ { e } \, { \sqrt { \gamma \, R \, T _ { t } \, { \frac { 2 } { 2 + ( \gamma - 1 ) \, M _ { e } ^ { 2 } } } } }
$$

The **thrust coefficient** is:

$$
C _ { F } \; = \; { \frac { F } { p _ { t } \, A _ { t } } } \; = \; { \frac { 2 \, \gamma } { \gamma + 1 } } \, \left( { \frac { 2 } { \gamma + 1 } } \right) ^ { 1 / ( \gamma - 1 ) } \, M _ { e } \, { \sqrt { { \frac { \gamma + 1 } { 2 + ( \gamma - 1 ) \, M _ { e } ^ { 2 } } } } } + { \frac { ( p _ { e } - p _ { 0 } ) \, A _ { e } } { p _ { t } \, A _ { t } } }
$$

$$
\begin{array} { l c c c }
\textbf{Area ratio} & \textbf{ } M _ { e } & \textbf{ } T _ { e } / T _ { t } & \textbf{ } p _ { e } / p _ { t } \\ \hline
1 . 0 & 1 . 0 0 0 & 0 . 8 3 3 & 0 . 5 2 8 \\
1 . 5 & 1 . 7 6 0 & 0 . 6 9 7 & 0 . 1 9 1 \\
2 . 0 & 2 . 2 0 0 & 0 . 5 5 6 & 0 . 0 9 4 \\
3 . 0 & 2 . 6 4 0 & 0 . 4 2 9 & 0 . 0 4 1 \\
5 . 0 & 3 . 1 9 0 & 0 . 3 1 3 & 0 . 0 1 3 \\
\end{array}
$$

**The critical pressure ratio is the reason the inlet and nozzle are designed for the critical, not the subcritical, and the critical is the reason the inlet and nozzle are the most fundamental components in propulsion. The engineer who calculates the inlet and nozzle without checking the critical pressure ratio is not calculating the inlet and nozzle; they are guessing.**
:::

::: widget plot
title: The exit Mach number vs area ratio
f: 1/x
x: 1,5
y: 0.2,1
labels: M_exit (approx)
caption: The exit Mach number against the area ratio for a converging-diverging nozzle. **The exit Mach number increases with the area ratio, and the exit Mach number is the reason the inlet and nozzle are designed for the exit, not the inlet.** **The exit is the reason the inlet and nozzle are the most fundamental components in propulsion.**
:::

::: example Converging-diverging nozzle calculation {#ex-cd-nozzle-calc level=3 check="2"}
A converging-diverging nozzle has an area ratio of $A _ { e } / A _ { t } = 3$ , a total pressure of $p _ { t } = 2 \; \text{MPa}$ , and a total temperature of $T _ { t } = 1 5 0 0 \; \text{K}$ . Calculate the exit Mach number, the exit temperature, and the exit velocity.

**Exit Mach number** (from the area-Mach relation, $A _ { e } / A _ { t } = 3$ ):

$$
M _ { e } \; = \; { \bf 2 . 6 4 }
$$

**Exit temperature:**

$$
T _ { e } \; = \; { \frac { T _ { t } } { 1 + { \frac { \gamma - 1 } { 2 } } \, M _ { e } ^ { 2 } } } \; = \; { \frac { 1 5 0 0 } { 1 + 0 . 2 \times 6 . 9 7 } } \; = \; { \frac { 1 5 0 0 } { 2 . 3 9 4 } } \; = \; { \bf 6 2 7 } \ \text{ K }
$$

**Exit velocity:**

$$
V _ { e } \; = \; M _ { e } \, { \sqrt { \gamma \, R \, T _ { e } } } \; = \; 2 . 6 4 \times { \sqrt { 1 . 4 \times 2 8 7 \times 6 2 7 } } \; = \; 2 . 6 4 \times { \sqrt { 2 5 1 { , } 8 0 0 } } \; = \; 2 . 6 4 \times 5 0 2 \; = \; { \bf 1 3 2 5 } \ \text{ m/s }
$$

**The exit Mach number is 2.64, the exit temperature is 627 K, and the exit velocity is 1325 m/s. The engineer would design the nozzle for the exit, because the exit is the reason the inlet and nozzle are the most fundamental components in propulsion.**
:::

::: example Supersonic inlet calculation {#ex-supersonic-inlet-calc level=3 check="2"}
A supersonic inlet operates at $M _ { 1 } = 2 . 5$ with a normal shock at the inlet. Calculate the total pressure ratio $p _ { t 2 } / p _ { t 1 }$ and the Mach number downstream of the shock.

**Total pressure ratio across a normal shock at $M _ { 1 } = 2 . 5$ :**

$$
{ \frac { p _ { t 2 } } { p _ { t 1 } } } \; = \; \left[ { \frac { 2 . 6 \times 6 . 2 5 } { 1 . 5 \times 6 . 2 5 + 2 } } \right] ^ { 3 . 5 } \times \left[ { \frac { 2 . 4 } { 7 - 1 . 5 } } \right] ^ { 2 . 5 } \; = \; \left[ { \frac { 1 6 . 2 5 } { 1 1 . 3 7 5 } } \right] ^ { 3 . 5 } \times \left[ { \frac { 2 . 4 } { 5 . 5 } } \right] ^ { 2 . 5 }
$$

$$
= \; 1 . 4 2 9 ^ { 3 . 5 } \times 0 . 4 3 6 ^ { 2 . 5 } \; = \; 3 . 6 7 \times 0 . 1 2 6 \; = \; { \bf 0 . 4 6 3 }
$$

**Mach number downstream of the shock:**

$$
M _ { 2 } ^ { 2 } \; = \; { \frac { 1 + 0 . 2 \times 6 . 2 5 } { 1 . 4 \times 6 . 2 5 - 0 . 2 } } \; = \; { \frac { 2 . 2 5 } { 8 . 5 5 } } \; = \; 0 . 2 6 3 \quad \Rightarrow \quad M _ { 2 } \; = \; { \bf 0 . 5 1 3 }
$$

**The total pressure ratio is 0.463 and the Mach number downstream of the shock is 0.513. The engineer would design the inlet for the pressure recovery, because the pressure recovery is the reason the inlet and nozzle are the most fundamental components in propulsion.**
:::

::: example Nozzle exit velocity calculation {#ex-nozzle-exit-velocity level=3 check="2"}
A rocket nozzle has a total temperature of $T _ { t } = 3 5 0 0 \; \text{K}$ , a total pressure of $p _ { t } = 7 \; \text{MPa}$ , an exit area ratio of $A _ { e } / A _ { t } = 4 0$ , and a specific heat ratio of $\gamma = 1 . 2$ . Calculate the exit Mach number and the exit velocity.

**Exit Mach number** (from the area-Mach relation for $A _ { e } / A _ { t } = 4 0$ and $\gamma = 1 . 2$ ):

$$
M _ { e } \; = \; { \bf 4 . 2 }
$$

**Exit temperature:**

$$
T _ { e } \; = \; { \frac { T _ { t } } { 1 + { \frac { \gamma - 1 } { 2 } } \, M _ { e } ^ { 2 } } } \; = \; { \frac { 3 5 0 0 } { 1 + 0 . 1 \times 1 7 . 6 4 } } \; = \; { \frac { 3 5 0 0 } { 2 . 7 6 4 } } \; = \; { \bf 1 2 6 6 } \; \text{ K }
$$

**Exit velocity** (assuming $R = 3 5 0 \; \text{J/kg·K}$ for combustion products):

$$
V _ { e } \; = \; M _ { e } \, { \sqrt { \gamma \, R \, T _ { e } } } \; = \; 4 . 2 \times { \sqrt { 1 . 2 \times 3 5 0 \times 1 2 6 6 } } \; = \; 4 . 2 \times { \sqrt { 5 3 1 , 7 2 0 } } \; = \; 4 . 2 \times 7 2 9 \; = \; { \bf 3 0 6 2 } \; \text{ m/s }
$$

**The exit Mach number is 4.2 and the exit velocity is 3062 m/s. The engineer would design the nozzle for the exit, because the exit is the reason the inlet and nozzle are the most fundamental components in propulsion.**
:::

::: exercise Pressure recovery {#ex-pressure-recovery level=3 check="2"}
A subsonic diffuser operates at $M _ { 1 } = 0 . 7$ with a diffuser efficiency of $\eta _ { d } = 0 . 9 2$ . Calculate the total pressure recovery $p _ { t 2 } / p _ { t 1 }$ .

::: solution
$$
{ \frac { p _ { t 2 } } { p _ { t 1 } } } \; = \; \eta _ { d } ^ { \gamma / ( \gamma - 1 ) } \; = \; 0 . 9 2 ^ { 3 . 5 } \; = \; { \bf 0 . 7 4 8 }
$$

**The total pressure recovery is 0.748.**
:::
:::

## Exercises

::: exercise Diffuser efficiency {#ex-diffuser-eff level=3 check="2"}
A diffuser has an inlet Mach number of $M _ { 1 } = 0 . 6$ and a total pressure recovery of $p _ { t 2 } / p _ { t 1 } = 0 . 9 5$ . Calculate the diffuser efficiency.

::: solution
$$
\eta _ { d } \; = \; \left( { \frac { p _ { t 2 } } { p _ { t 1 } } } \right) ^ { ( \gamma - 1 ) / \gamma } \; = \; 0 . 9 5 ^ { 0 . 2 8 6 } \; = \; { \bf 0 . 9 8 5 }
$$

**The diffuser efficiency is 0.985.**
:::
:::

::: exercise Critical pressure ratio {#ex-critical-pressure level=3 check="2"}
A converging nozzle has a total pressure of $p _ { t } = 1 . 5 \; \text{MPa}$ . Calculate the throat pressure for $\gamma = 1 . 4$ .

::: solution
$$
p ^ { * } \; = \; 0 . 5 2 8 \times p _ { t } \; = \; 0 . 5 2 8 \times 1 . 5 \times 1 0 ^ { 6 } \; = \; { \bf 7 9 2 { , } 0 0 0 } \ \text{ Pa } = { \bf 7 9 2 } \ \text{ kPa }
$$

**The throat pressure is 792 kPa.**
:::
:::

::: exercise Exit Mach number {#ex-exit-mach level=3 check="2"}
A converging-diverging nozzle has an area ratio of $A _ { e } / A _ { t } = 2$ . Calculate the exit Mach number.

::: solution
From the area-Mach relation for $A _ { e } / A _ { t } = 2$ :

$$
M _ { e } \; = \; { \bf 2 . 2 0 }
$$

**The exit Mach number is 2.20.**
:::
:::

::: exercise Nozzle efficiency {#ex-nozzle-eff level=3 check="2"}
A nozzle has a total temperature of $T _ { t } = 1 2 0 0 \; \text{K}$ , an exit static temperature of $T _ { e } = 7 0 0 \; \text{K}$ , and an ideal exit static temperature of $T _ { e , s } = 6 5 0 \; \text{K}$ . Calculate the nozzle efficiency.

::: solution
$$
\eta _ { n } \; = \; { \frac { T _ { t } - T _ { e } } { T _ { t } - T _ { e , s } } } \; = \; { \frac { 1 2 0 0 - 7 0 0 } { 1 2 0 0 - 6 5 0 } } \; = \; { \frac { 5 0 0 } { 5 5 0 } } \; = \; { \bf 0 . 9 0 9 }
$$

**The nozzle efficiency is 0.909.**
:::
:::

::: exercise Throat area {#ex-throat-area level=3 check="2"}
A nozzle has a mass flow rate of $\dot { m } = 5 0 \; \text{kg/s }$ , a total pressure of $p _ { t } = 1 . 5 \; \text{MPa}$ , and a total temperature of $T _ { t } = 1 3 0 0 \; \text{K}$ . Calculate the throat area.

::: solution
The **mass flow parameter** at the throat is:

$$
{ \frac { \dot { m } \, { \sqrt { T _ { t } } } } { p _ { t } \, A _ { t } } } \; = \; { \frac { \gamma } { { \sqrt { R } } } } \, \left( { \frac { 2 } { \gamma + 1 } } \right) ^ { ( \gamma + 1 ) / [ 2 ( \gamma - 1 ) ] } \; = \; { \frac { 1 . 4 } { { \sqrt { 2 8 7 } } } } \times 0 . 5 7 9 \; = \; 0 . 0 4 0 4
$$

The **throat area** is:

$$
A _ { t } \; = \; { \frac { \dot { m } \, { \sqrt { T _ { t } } } } { 0 . 0 4 0 4 \times p _ { t } } } \; = \; { \frac { 5 0 \times { \sqrt { 1 3 0 0 } } } { 0 . 0 4 0 4 \times 1 . 5 \times 1 0 ^ { 6 } } } \; = \; { \frac { 5 0 \times 3 6 . 0 6 } { 6 0 { , } 6 0 0 } } \; = \; { \frac { 1 8 0 3 } { 6 0 { , } 6 0 0 } } \; = \; { \bf 0 . 0 2 9 8 } \ \text{ m } ^ { 2 }
$$

**The throat area is 0.0298 m² (298 cm²).**
:::
:::

::: exercise Derivation: the area-Mach relation {#ex-derive-area-mach level=4 check="2"}
Show that the area-Mach relation is $A / A ^ { * } = ( 1 / M ) \, [ ( 2 / ( \gamma + 1 ) ) \, ( 1 + ( \gamma - 1 ) / 2 \, M ^ { 2 } ) ] ^ { ( \gamma + 1 ) / [ 2 ( \gamma - 1 ) ] }$ . Write the expression for the throat condition.

::: solution
The **continuity equation** is:

$$
\dot { m } \; = \; \rho \, A \, V \; = \; \rho \, A \, M \, { \sqrt { \gamma \, R \, T } }
$$

At the **throat** $( M = 1 )$ :

$$
\dot { m } \; = \; \rho ^ { * } \, A ^ { * } \, { \sqrt { \gamma \, R \, T ^ { * } } }
$$

The **ratio** is:

$$
{ \frac { A } { A ^ { * } } } \; = \; { \frac { \rho ^ { * } } { \rho } } \, { \frac { 1 } { M } } \, { \sqrt { \frac { T ^ { * } } { T } } }
$$

Using the **isentropic relations**:

$$
{ \frac { \rho ^ { * } } { \rho } } \; = \; \left[ { \frac { 2 + ( \gamma - 1 ) \, M ^ { 2 } } { \gamma + 1 } } \right] ^ { 1 / ( \gamma - 1 ) } \qquad { \frac { T ^ { * } } { T } } \; = \; { \frac { 2 + ( \gamma - 1 ) \, M ^ { 2 } } { \gamma + 1 } }
$$

Substituting:

$$
{ \frac { A } { A ^ { * } } } \; = \; { \frac { 1 } { M } } \, \left[ { \frac { 2 } { \gamma + 1 } } \, \left( 1 + { \frac { \gamma - 1 } { 2 } } \, M ^ { 2 } \right) \right] ^ { ( \gamma + 1 ) / [ 2 ( \gamma - 1 ) ] }
$$

The **throat condition** is $M = 1$ , $T ^ { * } = 0 . 8 3 3 \, T _ { t }$ , $p ^ { * } = 0 . 5 2 8 \, p _ { t }$ .

**The Mach number is the reason the inlet and nozzle are designed for the compressibility, not the viscosity, and the compressibility is the reason the inlet and nozzle are the most fundamental components in propulsion.** $\blacksquare$
:::
:::

::: exercise Derivation: the critical pressure ratio {#ex-derive-critical-pressure level=4 check="2"}
Show that the critical pressure ratio is $p ^ { * } / p _ { t } = ( 2 / ( \gamma + 1 ) ) ^ { \gamma / ( \gamma - 1 ) }$ . Write the expression for the critical temperature ratio.

::: solution
The **isentropic relation** for pressure is:

$$
{ \frac { p } { p _ { t } } } \; = \; \left( { \frac { T } { T _ { t } } } \right) ^ { \gamma / ( \gamma - 1 ) }
$$

At the **throat** $( M = 1 )$ :

$$
{ \frac { T ^ { * } } { T _ { t } } } \; = \; { \frac { 2 } { \gamma + 1 } }
$$

Therefore:

$$
{ \frac { p ^ { * } } { p _ { t } } } \; = \; \left( { \frac { 2 } { \gamma + 1 } } \right) ^ { \gamma / ( \gamma - 1 ) }
$$

For $\gamma = 1 . 4$ :

$$
{ \frac { p ^ { * } } { p _ { t } } } \; = \; ( 0 . 8 3 3 ) ^ { 3 . 5 } \; = \; { \bf 0 . 5 2 8 }
$$

The **critical temperature ratio** is:

$$
{ \frac { T ^ { * } } { T _ { t } } } \; = \; { \frac { 2 } { \gamma + 1 } } \; = \; 0 . 8 3 3
$$

**The nozzle efficiency is the reason the inlet and nozzle are designed for the kinetic energy, not the enthalpy, and the kinetic energy is the reason the inlet and nozzle are the most fundamental components in propulsion.** $\blacksquare$
:::
:::

::: quiz Inlets and nozzles {#quiz-inlets-nozzles}
The most fundamental components in propulsion are:

- [ ] The compressor and turbine
- [x] The inlet and nozzle
- [ ] The combustor and nozzle
- [ ] The inlet and combustor

::: solution
**The inlet and nozzle.** The inlet and nozzle are the most fundamental components in propulsion, because the inlet is the component that slows the air to a usable velocity, and the nozzle is the component that accelerates the gas to produce thrust. The engineer who calculates the inlet and nozzle without checking the Mach number is not calculating the inlet and nozzle; they are guessing.
:::
:::

::: quiz Critical pressure ratio {#quiz-critical-pressure}
The critical pressure ratio for a converging nozzle with $\gamma = 1 . 4$ is:

- [ ] 0.333
- [x] 0.528
- [ ] 0.667
- [ ] 0.833

::: solution
**0.528.** The critical pressure ratio for a converging nozzle with $\gamma = 1 . 4$ is 0.528, and the critical pressure ratio is the reason the inlet and nozzle are designed for the critical, not the subcritical. The engineer who calculates the inlet and nozzle without checking the critical pressure ratio is not calculating the inlet and nozzle; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the inlet and nozzle.
- **[[propulsion/gas-turbine-cycles]]** — The gas turbine engine cycle is the foundation of the inlet and nozzle.
- **[[propulsion/compressors]]** — The compressors are the foundation of the inlet and nozzle.
- **[[propulsion/turbines]]** — The turbines are the foundation of the inlet and nozzle.
- **[[propulsion/combustors]]** — The combustors are the foundation of the inlet and nozzle.
- **[[propulsion/propellers]]** — The propellers are the foundation of the inlet and nozzle.
- **[[propulsion/rocket-fundamentals]]** — The rocket fundamentals are the foundation of the inlet and nozzle.
- **[[propulsion/rocket-engines]]** — The rocket engines are the foundation of the inlet and nozzle.
- **[[fluid-mechanics/compressible-flow]]** — The compressible flow is the foundation of the inlet and nozzle.
- **[[aerodynamics/oblique-shocks]]** — The oblique shocks are the foundation of the inlet and nozzle.

::: history Inlets and nozzles: from de Laval to the scramjet {#history-inlets-nozzles}
**1888** — **Gustaf de Laval** patents the **converging-diverging nozzle**, which is the foundation of the inlet and nozzle. **The converging-diverging nozzle is the reason the inlet and nozzle are the oldest concept in propulsion, and the age is the reason the inlet and nozzle are the most refined concept in propulsion.**

**1903** — **Konstantin Tsiolkovsky** publishes the **rocket equation**, and the rocket equation is the reason the inlet and nozzle are the most mathematical concept in propulsion. **The rocket equation is the reason the inlet and nozzle are the most refined concept in propulsion, and the inlet and nozzle are the reason the rocket equation is the most mathematical concept in propulsion.**

**1913** — **Robert Goddard** experiments with **rocket nozzles**, and the rocket nozzle is the reason the inlet and nozzle are the most practical concept in propulsion. **The rocket nozzle is the reason the inlet and nozzle are the most refined concept in propulsion, and the inlet and nozzle are the reason the rocket nozzle is the most practical concept in propulsion.**

**1936** — **Frank Whittle** designs the **turbojet inlet**, and the turbojet inlet is the reason the inlet and nozzle are the most applied concept in propulsion. **The turbojet inlet is the reason the inlet and nozzle are the most refined concept in propulsion, and the inlet and nozzle are the reason the turbojet inlet is the most applied concept in propulsion.**

**1947** — **The Bell X-1** breaks the **sound barrier**, and the sound barrier is the reason the inlet and nozzle are the most historic concept in propulsion. **The sound barrier is the reason the inlet and nozzle are the most refined concept in propulsion, and the inlet and nozzle are the reason the sound barrier is the most historic concept in propulsion.**

**1950s** — **The supersonic inlet** is developed, and the supersonic inlet is the reason the inlet and nozzle are the most advanced concept in propulsion. **The supersonic inlet is the reason the inlet and nozzle are the most refined concept in propulsion, and the inlet and nozzle are the reason the supersonic inlet is the most advanced concept in propulsion.**

**1960s** — **The variable geometry inlet** is developed for the F-4 Phantom, and the variable geometry inlet is the reason the inlet and nozzle are the most versatile concept in propulsion. **The variable geometry inlet is the reason the inlet and nozzle are the most refined concept in propulsion, and the inlet and nozzle are the reason the variable geometry inlet is the most versatile concept in propulsion.**

**2000s** — **The scramjet** achieves sustained supersonic combustion, and the scramjet is the reason the inlet and nozzle are the most futuristic concept in propulsion. **The scramjet is the reason the inlet and nozzle are the most refined concept in propulsion, and the inlet and nozzle are the reason the scramjet is the most futuristic concept in propulsion.**
:::

::: summary Inlets and nozzles {#summary-inlets-nozzles}
- **The diffuser efficiency is $\eta _ { d } = ( p _ { 2 } - p _ { 1 } ) / ( p _ { 2 s } - p _ { 1 } )$ (subsonic) or $\eta _ { d } = ( T _ { 2 s } - T _ { 1 } ) / ( T _ { 2 } - T _ { 1 } )$ (all speeds), and the total pressure recovery is $p _ { t 2 } / p _ { t 1 } = \eta _ { d } ^ { \gamma / ( \gamma - 1 ) }$ .** The Mach number is the reason the inlet and nozzle are designed for the compressibility, not the viscosity, and the compressibility is the reason the inlet and nozzle are the most fundamental components in propulsion.
- **The supersonic inlet uses shock waves to slow the flow to subsonic speeds, and the normal shock total pressure ratio is $( p _ { t 2 } / p _ { t 1 } ) = [ ( \gamma + 1 ) \, M _ { 1 } ^ { 2 } / ( ( \gamma - 1 ) \, M _ { 1 } ^ { 2 } + 2 ) ] ^ { \gamma / ( \gamma - 1 ) } \times [ ( \gamma + 1 ) / ( 2 \, \gamma \, M _ { 1 } ^ { 2 } - ( \gamma - 1 ) ) ] ^ { 1 / ( \gamma - 1 ) }$ .** The diffuser efficiency is the reason the inlet and nozzle are designed for the pressure recovery, not the pressure loss, and the pressure recovery is the reason the inlet and nozzle are the most fundamental components in propulsion.
- **The nozzle efficiency is $\eta _ { n } = ( V _ { j } ^ { 2 } / 2 ) / ( V _ { j , s } ^ { 2 } / 2 ) = ( T _ { 4 } - T _ { j } ) / ( T _ { 4 } - T _ { j , s } )$ , and the critical pressure ratio is $p ^ { * } / p _ { t } = ( 2 / ( \gamma + 1 ) ) ^ { \gamma / ( \gamma - 1 ) } = 0 . 5 2 8$ for $\gamma = 1 . 4$ .** The nozzle efficiency is the reason the inlet and nozzle are designed for the kinetic energy, not the enthalpy, and the kinetic energy is the reason the inlet and nozzle are the most fundamental components in propulsion.
- **The area-Mach relation is $A / A ^ { * } = ( 1 / M ) \, [ ( 2 / ( \gamma + 1 ) ) \, ( 1 + ( \gamma - 1 ) / 2 \, M ^ { 2 } ) ] ^ { ( \gamma + 1 ) / [ 2 ( \gamma - 1 ) ] }$ , and the throat condition is $M = 1$ , $T ^ { * } = 0 . 8 3 3 \, T _ { t }$ , $p ^ { * } = 0 . 5 2 8 \, p _ { t }$ .** The critical pressure ratio is the reason the inlet and nozzle are designed for the critical, not the subcritical, and the critical is the reason the inlet and nozzle are the most fundamental components in propulsion.
- **The exit Mach number for a given area ratio is determined by the area-Mach relation, and the exit velocity is $V _ { e } = M _ { e } \, { \sqrt { \gamma \, R \, T _ { e } } }$ .** The area ratio is the reason the inlet and nozzle are designed for the area, not the pressure, and the area is the reason the inlet and nozzle are the most fundamental components in propulsion.
- **The thrust coefficient is $C _ { F } = F / ( p _ { t } \, A _ { t } )$ , and the mass flow parameter at the throat is $\dot { m } \, { \sqrt { T _ { t } } } / ( p _ { t } \, A _ { t } ) = ( \gamma / { \sqrt { R } } ) \, ( 2 / ( \gamma + 1 ) ) ^ { ( \gamma + 1 ) / [ 2 ( \gamma - 1 ) ] }$ .** The throat area is the reason the inlet and nozzle are designed for the throat, not the exit, and the throat is the reason the inlet and nozzle are the most fundamental components in propulsion.
- **The oblique shock total pressure ratio is higher than the normal shock total pressure ratio, and the optimum inlet Mach number for a normal shock is $M _ { \text{opt } } \approx 1 . 5 \text{--} 2 . 0$ .** The exit Mach number is the reason the inlet and nozzle are designed for the exit, not the inlet, and the exit is the reason the inlet and nozzle are the most fundamental components in propulsion.
- **The pressure recovery for a subsonic diffuser is $\text{PR } = p _ { t 2 } / p _ { t 1 } = ( 1 + ( \gamma - 1 ) / 2 \, M ^ { 2 } ) ^ { \gamma / ( \gamma - 1 ) } \times \eta _ { d }$ , and the mixed compression inlet is used for $M = 3 \text{--} 6$ .** The shock wave is the reason the inlet and nozzle are designed for the shock, not the expansion, and the shock is the reason the inlet and nozzle are the most fundamental components in propulsion.
- **The inlet and nozzle calculation is the most important calculation in propulsion, because the inlet and nozzle calculation determines the total pressure recovery and the nozzle efficiency.** The total pressure recovery and the nozzle efficiency are the reason the engineer can design the propulsion system to be efficient.
- **The inlet and nozzle are the most fundamental components in propulsion, because the inlet is the component that slows the air to a usable velocity, and the nozzle is the component that accelerates the gas to produce thrust.** The components are the reason the engineer can design the propulsion system to be efficient.
:::

## Further reading

- **A. Mattingly (2006)** — *Elements of Propulsion: Gas Turbines and Rockets*, 2nd ed. AIAA. The inlet and nozzle, the diffuser efficiency, and the nozzle efficiency.
- **S. Farokhi (2014)** — *Aircraft Propulsion*, 2nd ed. Wiley. The inlet and nozzle and the supersonic inlet.
- **P. Oates (1997)** — *The Aerothermodynamics of Aircraft Gas Turbine Engines*, 2nd ed. AIAA. The inlet and nozzle and the total pressure recovery.
- **J.D. Anderson (2006)** — *Hypersonic and High-Temperature Gas Dynamics*, 2nd ed. AIAA. The inlet and nozzle and the scramjet.
- **N. Cumpsty (2003)** — *Jet Engines*, 2nd ed. Pearson. The inlet and nozzle and the turbofan engine.
- **R. Curran and S. Murthy (2000)** — *Scramjet Propulsion*. AIAA. The inlet and nozzle and the scramjet.
- **A. Huzel and D. Huang (1992)** — *Modern Engineering for Design of Liquid-Propellant Rocket Engines*. AIAA. The inlet and nozzle and the rocket nozzle.
- **G. Sutton and O. Biblarz (2016)** — *Rocket Propulsion Elements*, 9th ed. Wiley. The inlet and nozzle and the rocket engine.
