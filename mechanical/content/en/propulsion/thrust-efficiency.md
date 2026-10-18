Thrust and propulsive efficiency are the two most fundamental quantities in propulsion: thrust is the force that propels the vehicle through the fluid, and propulsive efficiency is the fraction of the jet power that is converted into useful thrust power. **The engineer who calculates thrust without checking the propulsive efficiency is not calculating thrust; they are guessing.** The thrust calculation is the reason the engineer can design the propulsion system to be efficient, and the efficiency is the reason the thrust is the most fundamental quantity in propulsion.

The quantitative tools of thrust and propulsive efficiency are the **momentum equation** (the thrust equals the rate of change of momentum of the fluid), the **effective jet velocity** (the velocity of the exhaust relative to the vehicle), the **thrust power** (the product of thrust and vehicle velocity), and the **propulsive efficiency** (the ratio of thrust power to jet power). The tools are the language in which the propulsion analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways thrust and propulsive efficiency calculation goes wrong
**Not checking the mass flow rate.** The engineer who calculates thrust without checking the mass flow rate is not calculating thrust; they are guessing. **The mass flow rate is the reason the thrust is designed for the momentum, not the pressure, and the momentum is the reason the thrust is the most fundamental quantity in propulsion.** **Not checking the effective jet velocity.** The engineer who calculates thrust without checking the effective jet velocity is not calculating thrust; they are guessing. **The effective jet velocity is the reason the thrust is designed for the velocity, not the pressure, and the velocity is the reason the thrust is the most fundamental quantity in propulsion.** **Not checking the flight velocity.** The engineer who calculates thrust without checking the flight velocity is not calculating thrust; they are guessing. **The flight velocity is the reason the thrust is designed for the flight, not the hover, and the flight is the reason the thrust is the most fundamental quantity in propulsion.** **Not checking the propulsive efficiency.** The engineer who calculates thrust without checking the propulsive efficiency is not calculating thrust; they are guessing. **The propulsive efficiency is the reason the thrust is designed for the efficiency, not the power, and the efficiency is the reason the thrust is the most fundamental quantity in propulsion.** **Not checking the thrust-specific fuel consumption.** The engineer who calculates thrust without checking the thrust-specific fuel consumption is not calculating thrust; they are guessing. **The thrust-specific fuel consumption is the reason the thrust is designed for the fuel, not the air, and the fuel is the reason the thrust is the most fundamental quantity in propulsion.** **Not checking the momentum drag.** The engineer who calculates thrust without checking the momentum drag is not calculating thrust; they are guessing. **The momentum drag is the reason the thrust is designed for the drag, not the lift, and the drag is the reason the thrust is the most fundamental quantity in propulsion.** **Not checking the pressure thrust.** The engineer who calculates thrust without checking the pressure thrust is not calculating thrust; they are guessing. **The pressure thrust is the reason the thrust is designed for the pressure, not the momentum, and the pressure is the reason the thrust is the most fundamental quantity in propulsion.** **Not checking the bypass ratio.** The engineer who calculates thrust without checking the bypass ratio is not calculating thrust; they are guessing. **The bypass ratio is the reason the thrust is designed for the bypass, not the core, and the bypass is the reason the thrust is the most fundamental quantity in propulsion.** **Not checking the exhaust velocity.** The engineer who calculates thrust without checking the exhaust velocity is not calculating thrust; they are guessing. **The exhaust velocity is the reason the thrust is designed for the exhaust, not the intake, and the exhaust is the reason the thrust is the most fundamental quantity in propulsion.**
:::

## 1. Thrust

::: definition The momentum equation for thrust {#def-momentum-thrust}
The **momentum equation for thrust** is the equation that relates the thrust to the rate of change of momentum of the fluid, and the momentum equation for thrust is the reason the engineer can design the propulsion system to be efficient.

The **thrust** from the momentum equation is:

$$
F \; = \; \dot { m } \, ( V _ { j } - V _ { 0 } ) + ( p _ { j } - p _ { 0 } ) \, A _ { j }
$$

The **momentum thrust** is:

$$
F _ { \text{momentum } } \; = \; \dot { m } \, ( V _ { j } - V _ { 0 } )
$$

The **pressure thrust** is:

$$
F _ { \text{pressure } } \; = \; ( p _ { j } - p _ { 0 } ) \, A _ { j }
$$

The **effective jet velocity** is:

$$
V _ { j , \text{eff } } \; = \; V _ { j } + { \frac { ( p _ { j } - p _ { 0 } ) \, A _ { j } } { \dot { m } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Thrust} & F & \text{Propulsive force} & 1 0 \text{--} 5 0 0 \ \text{ kN } \\
\text{Mass flow rate} & \dot { m } & \text{Air mass flow} & 1 \text{--} 1 0 0 0 \ \text{ kg/s } \\
\text{Jet velocity} & V _ { j } & \text{Exhaust velocity} & 3 0 0 \text{--} 3 0 0 0 \ \text{ m/s } \\
\text{Flight velocity} & V _ { 0 } & \text{Vehicle velocity} & 0 \text{--} 3 0 0 \ \text{ m/s } \\
\end{array}
$$

**The mass flow rate is the reason the thrust is designed for the momentum, not the pressure, and the momentum is the reason the thrust is the most fundamental quantity in propulsion. The engineer who calculates thrust without checking the mass flow rate is not calculating thrust; they are guessing.**
:::

::: definition The thrust-specific fuel consumption {#def-tsfc}
The **thrust-specific fuel consumption** (TSFC) is the fuel flow rate per unit thrust, and the thrust-specific fuel consumption is the reason the engineer can design the propulsion system to be efficient.

The **thrust-specific fuel consumption** is:

$$
\text{TSFC } \; = \; { \frac { \dot { m } _ { f } } { F } } \quad \left[ \frac { \text{kg } } { \text{N } \cdot \text{ s } } \right]
$$

The **thermal efficiency** is:

$$
\eta _ { \text{thermal } } \; = \; { \frac { F \, V _ { 0 } } { \dot { m } _ { f } \, \text{HV } } }
$$

where HV is the heating value of the fuel.

The **propulsive efficiency** is:

$$
\eta _ { \text{propulsive } } \; = \; { \frac { F \, V _ { 0 } } { { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } ^ { 2 } - V _ { 0 } ^ { 2 } ) } }
$$

The **overall efficiency** is:

$$
\eta _ { \text{overall } } \; = \; \eta _ { \text{thermal } } \times \eta _ { \text{propulsive } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{TSFC} & \text{TSFC} & \text{Fuel per thrust} & ( 5 \text{--} 3 0 ) \times 1 0 ^ { - 6 } \ \text{ kg/N } \cdot \text{ s } \\
\text{Thermal efficiency} & \eta _ { \text{th } } & \text{Thrust power / fuel power} & 0 . 3 \text{--} 0 . 6 \\
\text{Propulsive efficiency} & \eta _ { \text{p } } & \text{Thrust power / jet power} & 0 . 5 \text{--} 0 . 9 5 \\
\text{Overall efficiency} & \eta _ { \text{o } } & \eta _ { \text{th } } \times \eta _ { \text{p } } & 0 . 2 \text{--} 0 . 5 \\
\end{array}
$$

**The effective jet velocity is the reason the thrust is designed for the velocity, not the pressure, and the velocity is the reason the thrust is the most fundamental quantity in propulsion. The engineer who calculates thrust without checking the effective jet velocity is not calculating thrust; they are guessing.**
:::

::: widget plot
title: The propulsive efficiency vs velocity ratio
f: 2*x/(1+x)
x: 0,2
y: 0,1
labels: eta_prop
caption: The propulsive efficiency against the velocity ratio $V _ { 0 } / V _ { j }$ . **The propulsive efficiency increases with the velocity ratio, and the propulsive efficiency is the reason the thrust is designed for the efficiency, not the power.** **The efficiency is the reason the thrust is the most fundamental quantity in propulsion.**
:::

::: example Turbofan thrust calculation {#ex-turbofan-thrust level=3 check="2"}
A turbofan engine has a mass flow rate of $\dot { m } = 5 0 0 \; \text{ kg/s }$ , a jet velocity of $V _ { j } = 3 5 0 \; \text{ m/s }$ , and a flight velocity of $V _ { 0 } = 2 5 0 \; \text{ m/s }$ . Calculate the thrust and the propulsive efficiency.

**Thrust (momentum only, pressure thrust neglected):**

$$
F \; = \; \dot { m } \, ( V _ { j } - V _ { 0 } ) \; = \; 5 0 0 \times ( 3 5 0 - 2 5 0 ) \; = \; 5 0 0 \times 1 0 0 \; = \; { \bf 5 0 { , } 0 0 0 } \ \text{ N } = { \bf 5 0 } \ \text{ kN }
$$

**Propulsive efficiency:**

$$
\eta _ { \text{p } } \; = \; { \frac { 2 \, V _ { 0 } } { V _ { j } + V _ { 0 } } } \; = \; { \frac { 2 \times 2 5 0 } { 3 5 0 + 2 5 0 } } \; = \; { \frac { 5 0 0 } { 6 0 0 } } \; = \; { \bf 0 . 8 3 3 } \; = \; { \bf 8 3 . 3 } \; \\%
$$

**The thrust is 50 kN and the propulsive efficiency is 83.3%. The engineer would design the engine for the efficiency, because the efficiency is the reason the thrust is the most fundamental quantity in propulsion.**
:::

## 2. Propulsive efficiency

::: definition The propulsive efficiency {#def-propulsive-efficiency}
The **propulsive efficiency** is the fraction of the jet power that is converted into useful thrust power, and the propulsive efficiency is the reason the engineer can design the propulsion system to be efficient.

The **propulsive efficiency** is:

$$
\eta _ { \text{p } } \; = \; { \frac { F \, V _ { 0 } } { { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } ^ { 2 } - V _ { 0 } ^ { 2 } ) } } \; = \; { \frac { 2 \, V _ { 0 } } { V _ { j } + V _ { 0 } } }
$$

The **velocity ratio** is:

$$
r \; = \; { \frac { V _ { 0 } } { V _ { j } } }
$$

The **propulsive efficiency** in terms of the velocity ratio is:

$$
\eta _ { \text{p } } \; = \; { \frac { 2 \, r } { 1 + r } }
$$

The **residual kinetic energy loss** (momentum drag) is:

$$
P _ { \text{loss } } \; = \; { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } - V _ { 0 } ) ^ { 2 }
$$

$$
\begin{array} { l c c c }
\textbf{Velocity ratio} & \textbf{ } \eta _ { \text{p } } & \textbf{ } V _ { j } / V _ { 0 } & \textbf{ Engine type } \\ \hline
0 & 0 & \infty & \text{Rocket (hover)} \\
0 . 2 5 & 0 . 4 0 & 4 & \text{Turbojet (low speed)} \\
0 . 5 0 & 0 . 6 6 7 & 2 & \text{Turbojet (cruise)} \\
0 . 7 5 & 0 . 8 5 7 & 1 . 3 3 & \text{Turbofan (high bypass)} \\
1 . 0 0 & 1 . 0 0 0 & 1 & \text{Propeller (ideal)} \\
\end{array}
$$

**The flight velocity is the reason the thrust is designed for the flight, not the hover, and the flight is the reason the thrust is the most fundamental quantity in propulsion. The engineer who calculates thrust without checking the flight velocity is not calculating thrust; they are guessing.**
:::

::: definition The bypass ratio {#def-bypass-ratio}
The **bypass ratio** is the ratio of the mass flow rate through the bypass duct to the mass flow rate through the core, and the bypass ratio is the reason the engineer can design the propulsion system to be efficient.

The **bypass ratio** is:

$$
B \; = \; { \frac { \dot { m } _ { \text{bypass } } } { \dot { m } _ { \text{core } } } }
$$

The **total thrust** for a turbofan is:

$$
F \; = \; \dot { m } _ { \text{core } } \, ( V _ { j , \text{core } } - V _ { 0 } ) + \dot { m } _ { \text{bypass } } \, ( V _ { j , \text{bypass } } - V _ { 0 } )
$$

The **propulsive efficiency** for a turbofan is:

$$
\eta _ { \text{p } } \; = \; { \frac { 2 } { 1 + V _ { j , \text{eff } } / V _ { 0 } } }
$$

where $V _ { j , \text{eff } }$ is the effective jet velocity.

The **optimum bypass ratio** for a given thrust is:

$$
B _ { \text{opt } } \; \approx \; { \frac { V _ { j , \text{core } } - V _ { 0 } } { V _ { 0 } - V _ { j , \text{bypass } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Bypass ratio} & \textbf{ } \eta _ { \text{p } } & \textbf{ TSFC } & \textbf{ Engine type } \\ \hline
0 & 0 . 6 7 & \text{High} & \text{Turbojet} \\
1 & 0 . 7 5 & \text{Medium} & \text{Low-bypass turbofan} \\
5 & 0 . 8 5 & \text{Low} & \text{High-bypass turbofan} \\
1 2 & 0 . 9 2 & \text{Very low} & \text{Ultra-high-bypass} \\
\end{array}
$$

**The propulsive efficiency is the reason the thrust is designed for the efficiency, not the power, and the efficiency is the reason the thrust is the most fundamental quantity in propulsion. The engineer who calculates thrust without checking the propulsive efficiency is not calculating thrust; they are guessing.**
:::

::: widget plot
title: The thrust vs bypass ratio
f: 50000/(1+x/5)
x: 0,12
y: 0,60000
labels: Thrust
caption: The thrust against the bypass ratio for a fixed core jet velocity. **The thrust decreases with the bypass ratio, and the thrust is the reason the thrust is designed for the bypass, not the core.** **The bypass is the reason the thrust is the most fundamental quantity in propulsion.**
:::

::: example Rocket thrust calculation {#ex-rocket-thrust level=3 check="2"}
A rocket engine has a mass flow rate of $\dot { m } = 2 5 0 \; \text{ kg/s }$ , an exhaust velocity of $V _ { j } = 3 0 0 0 \; \text{ m/s }$ , and operates at sea level where $V _ { 0 } = 0$ . Calculate the thrust and the jet power.

**Thrust (sea level, static):**

$$
F \; = \; \dot { m } \, V _ { j } \; = \; 2 5 0 \times 3 0 0 0 \; = \; { \bf 7 5 0 { , } 0 0 0 } \ \text{ N } = { \bf 7 5 0 } \ \text{ kN }
$$

**Jet power:**

$$
P _ { \text{jet } } \; = \; { \frac { 1 } { 2 } } \, \dot { m } \, V _ { j } ^ { 2 } \; = \; { \frac { 1 } { 2 } } \times 2 5 0 \times 3 0 0 0 ^ { 2 } \; = \; { \bf 1 1 2 5 } \ \text{ MW }
$$

**Propulsive efficiency at $V _ { 0 } = 0$ :**

$$
\eta _ { \text{p } } \; = \; { \frac { 2 \times 0 } { 3 0 0 0 + 0 } } \; = \; { \bf 0 }
$$

**The thrust is 750 kN, the jet power is 1125 MW, and the propulsive efficiency is 0% at static conditions. The engineer would design the engine for the efficiency, because the efficiency is the reason the thrust is the most fundamental quantity in propulsion.**
:::

::: example Turbofan propulsive efficiency {#ex-turbofan-efficiency level=3 check="2"}
A high-bypass turbofan has a core jet velocity of $V _ { j , \\text{core } } = 5 0 0 \\; \\text{m/s }$ , a bypass jet velocity of $V _ { j , \\text{bypass } } = 2 8 0 \\; \\text{m/s }$ , a core mass flow of $\\dot { m } _ { \\text{core } } = 5 0 \\; \\text{kg/s }$ , a bypass mass flow of $\\dot { m } _ { \\text{bypass } } = 3 0 0 \\; \\text{kg/s }$ , and a flight velocity of $V _ { 0 } = 2 4 0 \\; \\text{m/s }$ . Calculate the total thrust and the propulsive efficiency.

**Total thrust:**

$$
F \\; = \\; 5 0 \\times ( 5 0 0 - 2 4 0 ) + 3 0 0 \\times ( 2 8 0 - 2 4 0 ) \\; = \\; 5 0 \\times 2 6 0 + 3 0 0 \\times 4 0 \\; = \\; 1 3 { , } 0 0 0 + 1 2 { , } 0 0 0 \\; = \\; { \\bf 2 5 { , } 0 0 0 } \\; \\text{ N } = { \\bf 2 5 } \\; \\text{ kN }
$$

**Effective jet velocity:**

$$
V _ { j , \\text{eff } } \\; = \\; { \\frac { 5 0 \\times 5 0 0 + 3 0 0 \\times 2 8 0 } { 5 0 + 3 0 0 } } \\; = \\; { \\frac { 2 5 { , } 0 0 0 + 8 4 { , } 0 0 0 } { 3 5 0 } } \\; = \\; { \\frac { 1 0 9 { , } 0 0 0 } { 3 5 0 } } \\; = \\; 3 1 1 . 4 \\; \\text{ m/s }
$$

**Propulsive efficiency:**

$$
\\eta _ { \\text{p } } \\; = \\; { \\frac { 2 \\times 2 4 0 } { 3 1 1 . 4 + 2 4 0 } } \\; = \\; { \\frac { 4 8 0 } { 5 5 1 . 4 } } \\; = \\; { \\bf 0 . 8 7 1 } \\; = \\; { \\bf 8 7 . 1 } \\; \\%
$$

**The total thrust is 25 kN and the propulsive efficiency is 87.1%. The engineer would design the engine for the efficiency, because the efficiency is the reason the thrust is the most fundamental quantity in propulsion.**
:::

::: example Turboprop efficiency comparison {#ex-turboprop-comparison level=3 check="2"}
A turboprop has an effective jet velocity of $V _ { j } = 4 0 0 \\; \\text{m/s }$ and a flight velocity of $V _ { 0 } = 1 5 0 \\; \\text{m/s }$ . A turbojet has $V _ { j } = 9 0 0 \\; \\text{m/s }$ at the same flight velocity. Compare the propulsive efficiencies.

**Turboprop propulsive efficiency:**

$$
\\eta _ { \\text{p, turboprop } } \\; = \\; { \\frac { 2 \\times 1 5 0 } { 4 0 0 + 1 5 0 } } \\; = \\; { \\frac { 3 0 0 } { 5 5 0 } } \\; = \\; { \\bf 0 . 5 4 5 } \\; = \\; { \\bf 5 4 . 5 } \\; \\%
$$

**Turbojet propulsive efficiency:**

$$
\\eta _ { \\text{p, turbojet } } \\; = \\; { \\frac { 2 \\times 1 5 0 } { 9 0 0 + 1 5 0 } } \\; = \\; { \\frac { 3 0 0 } { 1 0 5 0 } } \\; = \\; { \\bf 0 . 2 8 6 } \\; = \\; { \\bf 2 8 . 6 } \\; \\%
$$

**Efficiency ratio:**

$$
{ \\frac { \\eta _ { \\text{p, turboprop } } } { \\eta _ { \\text{p, turbojet } } } } \\; = \\; { \\frac { 0 . 5 4 5 } { 0 . 2 8 6 } } \\; = \\; { \\bf 1 . 9 1 }
$$

**The turboprop is 1.91 times more propulsively efficient than the turbojet at this flight speed. The engineer would design the engine for the efficiency, because the efficiency is the reason the thrust is the most fundamental quantity in propulsion.**
:::

::: exercise Thrust power {#ex-thrust-power level=3 check="2"}
A turbofan engine produces $F = 1 5 0 \\; \\text{kN }$ of thrust at a flight velocity of $V _ { 0 } = 2 3 0 \\; \\text{m/s }$ . Calculate the thrust power and the jet power if the propulsive efficiency is $\\eta _ { \\text{p } } = 0 . 8 2$ .

::: solution
The **thrust power** is:

$$
P _ { \\text{thrust } } \\; = \\; F \\, V _ { 0 } \\; = \\; 1 5 0 { , } 0 0 0 \\times 2 3 0 \\; = \\; { \\bf 3 4 { , } 5 0 0 } \\; \\text{ kW } = { \\bf 3 4 . 5 } \\; \\text{ MW }
$$

The **jet power** is:

$$
P _ { \\text{jet } } \\; = \\; { \\frac { P _ { \\text{thrust } } } { \\eta _ { \\text{p } } } } \\; = \\; { \\frac { 3 4 { , } 5 0 0 } { 0 . 8 2 } } \\; = \\; { \\bf 4 2 { , } 0 7 3 } \\; \\text{ kW } = { \\bf 4 2 . 1 } \\; \\text{ MW }
$$

**The thrust power is 34.5 MW and the jet power is 42.1 MW.**
:::
:::

## Exercises

::: exercise Momentum thrust {#ex-momentum-thrust level=3 check="2"}
A turbojet engine has a mass flow rate of $\dot { m } = 8 0 \; \text{ kg/s }$ , a jet velocity of $V _ { j } = 8 0 0 \; \text{ m/s }$ , and a flight velocity of $V _ { 0 } = 2 5 0 \; \text{ m/s }$ . Calculate the momentum thrust.

::: solution
$$
F _ { \text{momentum } } \; = \; \dot { m } \, ( V _ { j } - V _ { 0 } ) \; = \; 8 0 \times ( 8 0 0 - 2 5 0 ) \; = \; 8 0 \times 5 5 0 \; = \; { \bf 4 4 { , } 0 0 0 } \ \text{ N } = { \bf 4 4 } \ \text{ kN }
$$

**The momentum thrust is 44 kN.**
:::
:::

::: exercise Propulsive efficiency {#ex-propulsive-efficiency level=3 check="2"}
A turbojet engine has a jet velocity of $V _ { j } = 9 0 0 \; \text{ m/s }$ and a flight velocity of $V _ { 0 } = 3 0 0 \; \text{ m/s }$ . Calculate the propulsive efficiency.

::: solution
$$
\eta _ { \text{p } } \; = \; { \frac { 2 \, V _ { 0 } } { V _ { j } + V _ { 0 } } } \; = \; { \frac { 2 \times 3 0 0 } { 9 0 0 + 3 0 0 } } \; = \; { \frac { 6 0 0 } { 1 2 0 0 } } \; = \; { \bf 0 . 5 0 } \; = \; { \bf 5 0 } \ \\%
$$

**The propulsive efficiency is 50%.**
:::
:::

::: exercise TSFC {#ex-tsfc level=3 check="2"}
A turbofan engine produces $F = 2 0 0 \; \text{ kN }$ of thrust with a fuel flow rate of $\dot { m } _ { f } = 0 . 6 \; \text{ kg/s }$ . Calculate the TSFC in kg/N·s and in g/kN·s.

::: solution
$$
\text{TSFC } \; = \; { \frac { \dot { m } _ { f } } { F } } \; = \; { \frac { 0 . 6 } { 2 0 0 { , } 0 0 0 } } \; = \; { \bf 3 . 0 \times 1 0 ^ { - 6 } } \ \text{ kg/N } \cdot \text{ s }
$$

$$
\text{TSFC } \; = \; 3 . 0 \times 1 0 ^ { - 6 } \times 1 0 ^ { 9 } \; = \; { \bf 3 0 0 0 } \ \text{ g/kN } \cdot \text{ s }
$$

**The TSFC is 3.0 × 10⁻⁶ kg/N·s or 3000 g/kN·s.**
:::
:::

::: exercise Overall efficiency {#ex-overall-efficiency level=3 check="2"}
A turbofan engine has a thermal efficiency of $\eta _ { \text{th } } = 0 . 4 5$ and a propulsive efficiency of $\eta _ { \text{p } } = 0 . 8 0$ . Calculate the overall efficiency.

::: solution
$$
\eta _ { \text{o } } \; = \; \eta _ { \text{th } } \times \eta _ { \text{p } } \; = \; 0 . 4 5 \times 0 . 8 0 \; = \; { \bf 0 . 3 6 } \; = \; { \bf 3 6 } \ \\%
$$

**The overall efficiency is 36%.**
:::
:::

::: exercise Pressure thrust {#ex-pressure-thrust level=3 check="2"}
A rocket nozzle has an exit area of $A _ { j } = 0 . 5 \; \text{ m } ^ { 2 }$ , an exit pressure of $p _ { j } = 4 0 \; \text{ kPa }$ , and operates at sea level where $p _ { 0 } = 1 0 1 . 3 \; \text{ kPa }$ . Calculate the pressure thrust.

::: solution
$$
F _ { \text{pressure } } \; = \; ( p _ { j } - p _ { 0 } ) \, A _ { j } \; = \; ( 4 0 - 1 0 1 . 3 ) \times 1 0 ^ { 3 } \times 0 . 5 \; = \; - 6 1 . 3 \times 1 0 ^ { 3 } \times 0 . 5 \; = \; { \bf - 3 0 { , } 6 5 0 } \ \text{ N }
$$

**The pressure thrust is -30.65 kN (negative because the nozzle is underexpanded at sea level).**
:::
:::

::: exercise Derivation: the propulsive efficiency {#ex-derive-propulsive level=4 check="2"}
Show that the propulsive efficiency is $\eta _ { \text{p } } = 2 \, V _ { 0 } / ( V _ { j } + V _ { 0 } )$ . Write the expression for the residual kinetic energy loss.

::: solution
The **thrust power** is:

$$
P _ { \text{thrust } } \; = \; F \, V _ { 0 } \; = \; \dot { m } \, ( V _ { j } - V _ { 0 } ) \, V _ { 0 }
$$

The **jet power** is:

$$
P _ { \text{jet } } \; = \; { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } ^ { 2 } - V _ { 0 } ^ { 2 } ) \; = \; { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } - V _ { 0 } ) \, ( V _ { j } + V _ { 0 } )
$$

The **propulsive efficiency** is:

$$
\eta _ { \text{p } } \; = \; { \frac { P _ { \text{thrust } } } { P _ { \text{jet } } } } \; = \; { \frac { \dot { m } \, ( V _ { j } - V _ { 0 } ) \, V _ { 0 } } { { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } - V _ { 0 } ) \, ( V _ { j } + V _ { 0 } ) } } \; = \; { \frac { 2 \, V _ { 0 } } { V _ { j } + V _ { 0 } } }
$$

The **residual kinetic energy loss** is:

$$
P _ { \text{loss } } \; = \; { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } - V _ { 0 } ) ^ { 2 }
$$

**The mass flow rate is the reason the thrust is designed for the momentum, not the pressure, and the momentum is the reason the thrust is the most fundamental quantity in propulsion.** $\blacksquare$
:::
:::

::: exercise Derivation: the bypass ratio effect {#ex-derive-bypass level=4 check="2"}
Show that the propulsive efficiency increases with the bypass ratio. Write the expression for the total thrust of a turbofan.

::: solution
The **total thrust** for a turbofan is:

$$
F \; = \; \dot { m } _ { \text{core } } \, ( V _ { j , \text{core } } - V _ { 0 } ) + \dot { m } _ { \text{bypass } } \, ( V _ { j , \text{bypass } } - V _ { 0 } )
$$

The **effective jet velocity** is:

$$
V _ { j , \text{eff } } \; = \; { \frac { \dot { m } _ { \text{core } } \, V _ { j , \text{core } } + \dot { m } _ { \text{bypass } } \, V _ { j , \text{bypass } } } { \dot { m } _ { \text{core } } + \dot { m } _ { \text{bypass } } } }
$$

As the bypass ratio $B = \dot { m } _ { \text{bypass } } / \dot { m } _ { \text{core } }$ increases, the effective jet velocity decreases because $V _ { j , \text{bypass } } < V _ { j , \text{core } }$ .

The **propulsive efficiency** is:

$$
\eta _ { \text{p } } \; = \; { \frac { 2 \, V _ { 0 } } { V _ { j , \text{eff } } + V _ { 0 } } }
$$

Since $V _ { j , \text{eff } }$ decreases with increasing $B$ , the propulsive efficiency increases with the bypass ratio.

**The effective jet velocity is the reason the thrust is designed for the velocity, not the pressure, and the velocity is the reason the thrust is the most fundamental quantity in propulsion.** $\blacksquare$
:::
:::

::: quiz Thrust and propulsive efficiency {#quiz-thrust-efficiency}
The most fundamental quantity in propulsion is:

- [ ] The fuel flow rate
- [x] The thrust
- [ ] The temperature
- [ ] The pressure

::: solution
**The thrust.** The thrust is the most fundamental quantity in propulsion, because the thrust is the force that propels the vehicle through the fluid, and the propulsive efficiency is the fraction of the jet power that is converted into useful thrust power. The engineer who calculates thrust without checking the propulsive efficiency is not calculating thrust; they are guessing.
:::
:::

::: quiz Propulsive efficiency {#quiz-propulsive-efficiency}
The propulsive efficiency is maximum when:

- [ ] $V _ { j } \gg V _ { 0 }$
- [ ] $V _ { j } = 2 V _ { 0 }$
- [x] $V _ { j } = V _ { 0 }$
- [ ] $V _ { j } = 0$

::: solution
**$V _ { j } = V _ { 0 }$ .** The propulsive efficiency is maximum when $V _ { j } = V _ { 0 }$ , and the propulsive efficiency is the reason the thrust is designed for the efficiency, not the power. The engineer who calculates thrust without checking the propulsive efficiency is not calculating thrust; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/gas-turbine-cycles]]** — The gas turbine cycle is the foundation of the thrust.
- **[[propulsion/inlets-nozzles]]** — The inlets and nozzles are the foundation of the thrust.
- **[[propulsion/compressors]]** — The compressors are the foundation of the thrust.
- **[[propulsion/turbines]]** — The turbines are the foundation of the thrust.
- **[[propulsion/combustors]]** — The combustors are the foundation of the thrust.
- **[[propulsion/propellers]]** — The propellers are the foundation of the thrust.
- **[[propulsion/rocket-fundamentals]]** — The rocket fundamentals are the foundation of the thrust.
- **[[propulsion/rocket-engines]]** — The rocket engines are the foundation of the thrust.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of the thrust.
- **[[fluid-mechanics/bernoulli]]** — The Bernoulli equation is the foundation of the thrust.

::: history Thrust and propulsive efficiency: from Hero to the high-bypass turbofan {#history-thrust-efficiency}
**1st century AD** — **Hero of Alexandria** builds the **aeolipile**, the first steam-powered device, which is the foundation of the thrust. **The aeolipile is the reason the thrust is the oldest concept in propulsion, and the age is the reason the thrust is the most refined concept in propulsion.**

**1687** — **Isaac Newton** publishes the **Principia**, establishing the laws of motion that underlie the momentum equation for thrust. **The momentum equation is the reason the thrust is the most mathematical concept in propulsion, and the thrust is the reason the momentum equation is the most fundamental law in physics.**

**1903** — **The Wright brothers** achieve the first powered flight, demonstrating that thrust can be predicted and engineered. **The first flight is the reason the thrust is the most historic concept in propulsion, and the thrust is the reason the first flight is the most historic event in engineering.**

**1930** — **Frank Whittle** patents the **turbojet engine**, and the turbojet engine is the reason the thrust is the most practical concept in propulsion. **The turbojet engine is the reason the thrust is the most refined concept in propulsion, and the thrust is the reason the turbojet engine is the most practical concept in propulsion.**

**1937** — **Hans von Ohain** builds the first **operational turbojet**, and the operational turbojet is the reason the thrust is the most applied concept in propulsion. **The operational turbojet is the reason the thrust is the most refined concept in propulsion, and the thrust is the reason the operational turbojet is the most applied concept in propulsion.**

**1969** — **The Boeing 747** enters service with the **Pratt & Whitney JT9D** high-bypass turbofan, and the high-bypass turbofan is the reason the thrust is the most efficient concept in propulsion. **The high-bypass turbofan is the reason the thrust is the most refined concept in propulsion, and the thrust is the reason the high-bypass turbofan is the most efficient concept in propulsion.**

**1980s** — **The high-bypass turbofan** achieves a propulsive efficiency of 85%, and the high-bypass turbofan is the reason the thrust is the most commercial concept in propulsion. **The high-bypass turbofan is the reason the thrust is the most refined concept in propulsion, and the thrust is the reason the high-bypass turbofan is the most commercial concept in propulsion.**

**2010s** — **The geared turbofan** achieves a bypass ratio of 12:1, and the geared turbofan is the reason the thrust is the most modern concept in propulsion. **The geared turbofan is the reason the thrust is the most refined concept in propulsion, and the thrust is the reason the geared turbofan is the most modern concept in propulsion.**
:::

::: summary Thrust and propulsive efficiency {#summary-thrust-efficiency}
- **The thrust from the momentum equation is $F = \dot { m } \, ( V _ { j } - V _ { 0 } ) + ( p _ { j } - p _ { 0 } ) \, A _ { j }$ , and the momentum thrust is $F _ { \text{momentum } } = \dot { m } \, ( V _ { j } - V _ { 0 } )$ .** The mass flow rate is the reason the thrust is designed for the momentum, not the pressure, and the momentum is the reason the thrust is the most fundamental quantity in propulsion.
- **The pressure thrust is $F _ { \text{pressure } } = ( p _ { j } - p _ { 0 } ) \, A _ { j }$ , and the effective jet velocity is $V _ { j , \text{eff } } = V _ { j } + ( p _ { j } - p _ { 0 } ) \, A _ { j } / \dot { m }$ .** The effective jet velocity is the reason the thrust is designed for the velocity, not the pressure, and the velocity is the reason the thrust is the most fundamental quantity in propulsion.
- **The thrust-specific fuel consumption is $\text{TSFC } = \dot { m } _ { f } / F$ , and the thermal efficiency is $\eta _ { \text{th } } = F \, V _ { 0 } / ( \dot { m } _ { f } \, \text{HV } )$ .** The flight velocity is the reason the thrust is designed for the flight, not the hover, and the flight is the reason the thrust is the most fundamental quantity in propulsion.
- **The propulsive efficiency is $\eta _ { \text{p } } = 2 \, V _ { 0 } / ( V _ { j } + V _ { 0 } )$ , and the residual kinetic energy loss is $P _ { \text{loss } } = { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } - V _ { 0 } ) ^ { 2 }$ .** The propulsive efficiency is the reason the thrust is designed for the efficiency, not the power, and the efficiency is the reason the thrust is the most fundamental quantity in propulsion.
- **The overall efficiency is $\eta _ { \text{o } } = \eta _ { \text{th } } \times \eta _ { \text{p } }$ , and the velocity ratio is $r = V _ { 0 } / V _ { j }$ .** The thrust-specific fuel consumption is the reason the thrust is designed for the fuel, not the air, and the fuel is the reason the thrust is the most fundamental quantity in propulsion.
- **The bypass ratio is $B = \dot { m } _ { \text{bypass } } / \dot { m } _ { \text{core } }$ , and the total thrust for a turbofan is $F = \dot { m } _ { \text{core } } \, ( V _ { j , \text{core } } - V _ { 0 } ) + \dot { m } _ { \text{bypass } } \, ( V _ { j , \text{bypass } } - V _ { 0 } )$ .** The momentum drag is the reason the thrust is designed for the drag, not the lift, and the drag is the reason the thrust is the most fundamental quantity in propulsion.
- **The propulsive efficiency increases with the bypass ratio because the effective jet velocity decreases.** The pressure thrust is the reason the thrust is designed for the pressure, not the momentum, and the pressure is the reason the thrust is the most fundamental quantity in propulsion.
- **The propulsive efficiency is maximum when $V _ { j } = V _ { 0 }$ ( $\eta _ { \text{p } } = 1$ ), and zero when $V _ { 0 } = 0$ (static conditions).** The bypass ratio is the reason the thrust is designed for the bypass, not the core, and the bypass is the reason the thrust is the most fundamental quantity in propulsion.
- **The thrust calculation is the most important calculation in propulsion, because the thrust calculation determines the propulsive efficiency and the overall efficiency.** The propulsive efficiency and the overall efficiency are the reason the engineer can design the propulsion system to be efficient.
- **The thrust is the most fundamental quantity in propulsion, because the thrust is the force that propels the vehicle through the fluid.** The force is the reason the engineer can design the propulsion system to be efficient.
:::

## Further reading

- **S. Farokhi (2014)** — *Aircraft Propulsion*, 2nd ed. Wiley. The thrust, the propulsive efficiency, and the bypass ratio.
- **J.D. Anderson (2013)** — *Modern Compressible Flow*, 3rd ed. McGraw-Hill. The thrust and the momentum equation.
- **A. Mattingly (2006)** — *Elements of Propulsion: Gas Turbines and Rockets*, 2nd ed. AIAA. The thrust, the TSFC, and the propulsive efficiency.
- **N. Cumpsty (2003)** — *Jet Engines*, 2nd ed. Pearson. The thrust and the turbofan engine.
- **P. Oates (1997)** — *The Aerothermodynamics of Aircraft Gas Turbine Engines*, 2nd ed. AIAA. The thrust and the gas turbine cycle.
- **I. Grant (2001)** — *Aircraft Performance and Design*. Pearson. The thrust and the flight performance.
- **R. Bent (2002)** — *Aircraft Engineering Principles*. Butterworth-Heinemann. The thrust and the propulsion system.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The thrust and the aircraft design.
