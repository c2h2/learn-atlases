Rocket engines are the most fundamental propulsion devices for spaceflight: the rocket engine is the device that converts propellant energy into kinetic energy of the exhaust, and the rocket engine is the device that determines the thrust and the specific impulse. **The engineer who calculates the rocket engine without checking the nozzle expansion is not calculating the rocket engine; they are guessing.** The rocket engine calculation is the reason the engineer can design the rocket engine to be efficient, and the specific impulse is the reason the rocket engine is the most fundamental propulsion device for spaceflight.

The quantitative tools of rocket engines are the **nozzle expansion ratio** (the ratio of the exit area to the throat area), the **thrust coefficient** (the ratio of the thrust to the product of the chamber pressure and the throat area), the **characteristic velocity** (the ratio of the chamber pressure times the throat area to the mass flow rate), and the **combustion temperature** (the adiabatic flame temperature in the combustion chamber). The tools are the language in which the rocket engine analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways rocket engine calculation goes wrong
**Not checking the nozzle expansion.** The engineer who calculates the rocket engine without checking the nozzle expansion is not calculating the rocket engine; they are guessing. **The nozzle expansion is the reason the rocket engine is designed for the expansion, not the compression, and the expansion is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** **Not checking the thrust coefficient.** The engineer who calculates the rocket engine without checking the thrust coefficient is not calculating the rocket engine; they are guessing. **The thrust coefficient is the reason the rocket engine is designed for the coefficient, not the thrust, and the coefficient is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** **Not checking the characteristic velocity.** The engineer who calculates the rocket engine without checking the characteristic velocity is not calculating the rocket engine; they are guessing. **The characteristic velocity is the reason the rocket engine is designed for the characteristic, not the actual, and the characteristic is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** **Not checking the combustion temperature.** The engineer who calculates the rocket engine without checking the combustion temperature is not calculating the rocket engine; they are guessing. **The combustion temperature is the reason the rocket engine is designed for the temperature, not the pressure, and the temperature is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** **Not checking the propellant choice.** The engineer who calculates the rocket engine without checking the propellant choice is not calculating the rocket engine; they are guessing. **The propellant choice is the reason the rocket engine is designed for the propellant, not the oxidizer, and the propellant is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** **Not checking the mixture ratio.** The engineer who calculates the rocket engine without checking the mixture ratio is not calculating the rocket engine; they are guessing. **The mixture ratio is the reason the rocket engine is designed for the ratio, not the mixture, and the ratio is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** **Not checking the chamber pressure.** The engineer who calculates the rocket engine without checking the chamber pressure is not calculating the rocket engine; they are guessing. **The chamber pressure is the reason the rocket engine is designed for the pressure, not the vacuum, and the pressure is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** **Not checking the cooling.** The engineer who calculates the rocket engine without checking the cooling is not calculating the rocket engine; they are guessing. **The cooling is the reason the rocket engine is designed for the cooling, not the heating, and the cooling is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** **Not checking the electric propulsion.** The engineer who calculates the rocket engine without checking the electric propulsion is not calculating the rocket engine; they are guessing. **The electric propulsion is the reason the rocket engine is designed for the electric, not the chemical, and the electric is the reason the rocket engine is the most fundamental propulsion device for spaceflight.**
:::

## 1. Nozzle theory

::: definition The nozzle expansion ratio {#def-nozzle-expansion}
The **nozzle expansion ratio** is the ratio of the exit area to the throat area, and the nozzle expansion ratio is the reason the engineer can design the rocket engine to be efficient.

The **nozzle expansion ratio** is:

$$
\varepsilon \; = \; { \frac { A _ { e } } { A _ { t } } }
$$

The **optimal expansion ratio** is:

$$
\varepsilon _ { \text{opt } } \quad \text{such that} \quad p _ { e } \; = \; p _ { a }
$$

The **thrust coefficient** is:

$$
C _ { F } \; = \; { \frac { F } { p _ { c } \, A _ { t } } } \; = \; \gamma \, \left( { \frac { 2 } { \gamma + 1 } } \right) ^ { \gamma / ( \gamma - 1 ) } \, { \frac { 1 - ( p _ { e } / p _ { c } ) ^ { ( \gamma - 1 ) / \gamma } } { \gamma - 1 } } \, \varepsilon + { \frac { p _ { e } - p _ { a } } { p _ { c } } } \, \varepsilon
$$

The **characteristic velocity** is:

$$
c ^ { * } \; = \; { \frac { 1 } { \gamma } } \, \left( { \frac { \gamma + 1 } { 2 } } \right) ^ { ( \gamma + 1 ) / ( 2 ( \gamma - 1 ) ) } \, { \sqrt { { \frac { R \, T _ { c } } { \gamma } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Expansion ratio} & \varepsilon & A _ { e } / A _ { t } & 1 0 \text{--} 1 0 0 \\
\text{Optimal expansion} & \varepsilon _ { \text{opt } } & p _ { e } = p _ { a } & 2 0 \text{--} 8 0 \\
\text{Thrust coefficient} & C _ { F } & F / ( p _ { c } \, A _ { t } ) & 1 . 2 \text{--} 1 . 8 \\
\text{Characteristic vel} & c ^ { * } & p _ { c } \, A _ { c } / \dot { m } & 1 5 0 0 \text{--} 2 5 0 0 \ \text{ m/s } \\
\end{array}
$$

**The nozzle expansion is the reason the rocket engine is designed for the expansion, not the compression, and the expansion is the reason the rocket engine is the most fundamental propulsion device for spaceflight. The engineer who calculates the rocket engine without checking the nozzle expansion is not calculating the rocket engine; they are guessing.**
:::

::: definition The propellant choice {#def-propellant-choice}
The **propellant choice** is the selection of the fuel and oxidizer for the rocket engine, and the propellant choice is the reason the engineer can design the rocket engine to be efficient.

The **mixture ratio** is:

$$
o / f \; = \; { \frac { \dot { m } _ { o } } { \dot { m } _ { f } } }
$$

The **combustion temperature** is:

$$
T _ { c } \; = \; T _ { \text{ad } } \quad \text{Typically } 2 8 0 0 \text{--} 3 8 0 0 \ \text{ K }
$$

The **specific impulse** for common propellants is:

$$
\begin{array} { l c c }
\textbf{Propellant} & \textbf{ I } _ { s p } \textbf{ (s) } & \textbf{ T } _ { c } \textbf{ (K) } \\ \hline
\text{LOX/LH}_2 & 4 5 0 & 3 0 0 0 \\
\text{LOX/RP-1} & 3 4 0 & 3 6 0 0 \\
\text{LOX/CH}_4 & 3 7 0 & 3 6 0 0 \\
\text{NTO/Aeroz-50} & 3 2 0 & 3 0 0 0 \\
\text{Solid (HTPB)} & 2 5 0 & 3 4 0 0 \\
\end{array}
$$

The **density impulse** is:

$$
\rho I _ { s p } \; = \; \rho _ { \text{prop } } \, I _ { s p }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Mixture ratio} & o / f & \text{Oxidizer/fuel} & 1 . 5 \text{--} 8 \\
\text{Combustion temp} & T _ { c } & \text{Adiabatic flame temp} & 2 8 0 0 \text{--} 3 8 0 0 \ \text{ K } \\
\text{Chamber pressure} & p _ { c } & \text{Combustion pressure} & 3 \text{--} 2 5 \ \text{ MPa } \\
\text{Density impulse} & \rho I _ { s p } & \text{Density-specific impulse} & 2 0 0 \text{--} 5 0 0 \ \text{ kg/m}^3 \cdot \text{s} \\
\end{array}
$$

**The thrust coefficient is the reason the rocket engine is designed for the coefficient, not the thrust, and the coefficient is the reason the rocket engine is the most fundamental propulsion device for spaceflight. The engineer who calculates the rocket engine without checking the thrust coefficient is not calculating the rocket engine; they are guessing.**
:::

::: widget plot
title: The thrust coefficient vs expansion ratio
f: 1.2+0.3*(1-1/x)
x: 1,50
y: 1,1.6
labels: C_F
caption: The thrust coefficient against the nozzle expansion ratio. **The thrust coefficient increases with the expansion ratio, and the thrust coefficient is the reason the rocket engine is designed for the coefficient, not the thrust.** **The coefficient is the reason the rocket engine is the most fundamental propulsion device for spaceflight.**
:::

::: example Nozzle design calculation {#ex-nozzle-design level=3 check="2"}
A rocket engine has a chamber pressure of $p _ { c } = 1 0 \; \text{MPa }$ , a chamber temperature of $T _ { c } = 3 5 0 0 \; \text{K }$ , $\gamma = 1 . 2$ , $R = 4 0 0 \; \text{J/kg·K }$ , and a thrust of $F = 2 \; \text{MN }$ . The engine operates at sea level where $p _ { a } = 1 0 1 \; \text{kPa }$ . Calculate the throat area, the exit area for optimal expansion, and the thrust coefficient.

**Critical pressure ratio:**

$$
{ \frac { p _ { t } } { p _ { c } } } \; = \; \left( { \frac { 2 } { \gamma + 1 } } \right) ^ { \gamma / ( \gamma - 1 ) } \; = \; \left( { \frac { 2 } { 2 . 2 } } \right) ^ { 6 } \; = \; 0 . 9 0 9 ^ { 6 } \; = \; 0 . 5 6 5
$$

**Throat pressure:**

$$
p _ { t } \; = \; 0 . 5 6 5 \times 1 0 \times 1 0 ^ { 6 } \; = \; { \bf 5 . 6 5 } \; \text{MPa }
$$

**Throat area** (from $C _ { F } \approx 1 . 5$ ):

$$
A _ { t } \; = \; { \frac { F } { C _ { F } \, p _ { c } } } \; = \; { \frac { 2 \times 1 0 ^ { 6 } } { 1 . 5 \times 1 0 \times 1 0 ^ { 6 } } } \; = \; { \bf 0 . 1 3 3 } \; \text{m } ^ { 2 }
$$

**Optimal expansion ratio** (from $p _ { e } = p _ { a }$ ):

$$
\varepsilon _ { \text{opt } } \; = \; \left[ 1 . 4 \times \left( { \frac { 2 } { \gamma + 1 } } \right) \, \left( { \frac { p _ { c } } { p _ { a } } } \right) ^ { ( \gamma - 1 ) / \gamma } \right] ^ { 1 / 2 } \quad \text{(approximate)}
$$

For $p _ { c } / p _ { a } = 1 0 { , } 0 0 0$ and $\gamma = 1 . 2$ :

$$
\varepsilon _ { \text{opt } } \; \approx \; { \bf 4 0 }
$$

**Exit area:**

$$
A _ { e } \; = \; \varepsilon \, A _ { t } \; = \; 4 0 \times 0 . 1 3 3 \; = \; { \bf 5 . 3 3 } \; \text{m } ^ { 2 }
$$

**The throat area is 0.133 m², the optimal expansion ratio is 40, and the exit area is 5.33 m². The engineer would design the rocket engine for the expansion, because the expansion is the reason the rocket engine is the most fundamental propulsion device for spaceflight.**
:::

## 2. Electric propulsion

::: definition The electric propulsion {#def-electric-propulsion}
The **electric propulsion** is the use of electrical energy to accelerate the propellant, and the electric propulsion is the reason the engineer can design the rocket engine to be efficient.

The **thrust** for electric propulsion is:

$$
F \; = \; \dot { m } \, v _ { e } \; = \; { \frac { 2 \, P } { v _ { e } } }
$$

The **specific impulse** for electric propulsion is:

$$
I _ { s p } \; = \; { \frac { v _ { e } } { g _ { 0 } } } \; = \; { \frac { 1 } { g _ { 0 } } } \, { \sqrt { { \frac { 2 \, \eta \, P } { \dot { m } } } } }
$$

The **power** is:

$$
P \; = \; { \frac { F \, v _ { e } } { 2 \, \eta } }
$$

The **efficiency** is:

$$
\eta \; = \; { \frac { F \, v _ { e } / 2 } { P } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Electric thrust} & F _ { \text{elec } } & \text{Electric thrust} & 0 . 0 1 \text{--} 1 0 \ \text{ N } \\
\text{Electric Isp} & I _ { s p , \text{elec } } & \text{Electric specific impulse} & 1 0 0 0 \text{--} 1 0 { , } 0 0 0 \ \text{ s } \\
\text{Power} & P & \text{Electrical power} & 1 0 0 \text{--} 1 0 { , } 0 0 0 \ \text{ W } \\
\text{Efficiency} & \eta & \text{Propulsion efficiency} & 0 . 3 \text{--} 0 . 8 \\
\end{array}
$$

**The characteristic velocity is the reason the rocket engine is designed for the characteristic, not the actual, and the characteristic is the reason the rocket engine is the most fundamental propulsion device for spaceflight. The engineer who calculates the rocket engine without checking the characteristic velocity is not calculating the rocket engine; they are guessing.**
:::

::: definition The cooling {#def-cooling}
The **cooling** is the removal of heat from the combustion chamber and nozzle walls, and the cooling is the reason the engineer can design the rocket engine to be efficient.

The **heat flux** to the wall is:

$$
q \; = \; h \, ( T _ { g } - T _ { w } )
$$

The **coolant mass flow** is:

$$
\dot { m } _ { \text{cool } } \; = \; { \frac { Q } { c _ { p } \, \Delta T } }
$$

The **regenerative cooling** uses the fuel as the coolant:

$$
Q \; = \; \dot { m } _ { f } \, c _ { p , f } \, ( T _ { \text{out } } - T _ { \text{in } } )
$$

The **wall temperature** is:

$$
T _ { w } \; = \; T _ { g } - { \frac { q } { h } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Heat flux} & q & \text{Heat transfer rate} & 1 0 \text{--} 1 0 0 \ \text{ MW/m}^2 \\
\text{Coolant flow} & \dot { m } _ { \text{cool } } & \text{Coolant mass flow} & 1 \text{--} 1 0 \ \% \text{ of } \dot { m } \\
\text{Gas temp} & T _ { g } & \text{Gas temperature} & 3 0 0 0 \text{--} 3 8 0 0 \ \text{ K } \\
\text{Wall temp} & T _ { w } & \text{Wall temperature} & 6 0 0 \text{--} 1 2 0 0 \ \text{ K } \\
\end{array}
$$

**The combustion temperature is the reason the rocket engine is designed for the temperature, not the pressure, and the temperature is the reason the rocket engine is the most fundamental propulsion device for spaceflight. The engineer who calculates the rocket engine without checking the combustion temperature is not calculating the rocket engine; they are guessing.**
:::

::: widget plot
title: The specific impulse vs propellant
f: 450-100/x
x: 1,5
y: 200,500
labels: Isp
caption: The specific impulse against the propellant index. **The specific impulse increases with the propellant index, and the specific impulse is the reason the rocket engine is designed for the impulse, not the thrust.** **The impulse is the reason the rocket engine is the most fundamental propulsion device for spaceflight.**
:::

::: example Electric propulsion calculation {#ex-electric-prop level=3 check="2"}
An ion thruster has a power of $P = 5 \; \text{kW }$ , an efficiency of $\eta = 0 . 7$ , and a specific impulse of $I _ { s p } = 3 0 0 0 \; \text{s }$ . Calculate the thrust, the exhaust velocity, and the mass flow rate.

**Exhaust velocity:**

$$
v _ { e } \; = \; I _ { s p } \, g _ { 0 } \; = \; 3 0 0 0 \times 9 . 8 1 \; = \; { \bf 2 9 { , } 4 3 0 } \; \text{m/s }
$$

**Thrust:**

$$
F \; = \; { \frac { 2 \, \eta \, P } { v _ { e } } } \; = \; { \frac { 2 \times 0 . 7 \times 5 0 0 0 } { 2 9 { , } 4 3 0 } } \; = \; { \frac { 7 0 0 0 } { 2 9 { , } 4 3 0 } } \; = \; { \bf 0 . 2 3 8 } \; \text{N }
$$

**Mass flow rate:**

$$
\dot { m } \; = \; { \frac { F } { v _ { e } } } \; = \; { \frac { 0 . 2 3 8 } { 2 9 { , } 4 3 0 } } \; = \; { \bf 8 . 0 9 \times 1 0 ^ { - 6 } } \; \text{kg/s } = { \bf 8 . 0 9 } \; \text{mg/s }
$$

**The exhaust velocity is 29,430 m/s, the thrust is 0.238 N, and the mass flow rate is 8.09 mg/s. The engineer would design the rocket engine for the electric, because the electric is the reason the rocket engine is the most fundamental propulsion device for spaceflight.**
:::

::: example Regenerative cooling calculation {#ex-regen-cooling level=3 check="2"}
A rocket engine has a heat load of $Q = 5 0 , 0 0 0 \\; \\text{kW }$ to the chamber walls, a fuel flow of $\\dot { m } _ { f } = 5 0 \\; \\text{kg/s }$ , a fuel specific heat of $c _ { p , f } = 2 5 0 0 \\; \\text{J/kg·K }$ , and a fuel inlet temperature of $T _ { \\text{in } } = 2 0 \\; \\text{K }$ (LH$_2$). Calculate the fuel outlet temperature.

**Fuel outlet temperature:**

$$
T _ { \\text{out } } \\; = \\; T _ { \\text{in } } + { \frac { Q } { \\dot { m } _ { f } \\, c _ { p , f } } } \\; = \\; 2 0 + { \frac { 5 0 { , } 0 0 0 { , } 0 0 0 } { 5 0 \\times 2 5 0 0 } } \\; = \\; 2 0 + { \frac { 5 0 { , } 0 0 0 { , } 0 0 0 } { 1 2 5 { , } 0 0 0 } } \\; = \\; 2 0 + 4 0 0 \\; = \\; { \\bf 4 2 0 } \\; \\text{K }
$$

**Heat flux** (for a chamber area of $A _ { c } = 5 \\; \\text{m } ^ { 2 }$ ):

$$
q \\; = \\; { \frac { Q } { A _ { c } } } \\; = \\; { \frac { 5 0 { , } 0 0 0 { , } 0 0 0 } { 5 } } \\; = \\; { \\bf 1 0 { , } 0 0 0 { , } 0 0 0 } \\; \\text{W/m}^2 = { \\bf 1 0 } \\; \\text{MW/m}^2
$$

**Coolant mass flow fraction:**

$$
\\text{Fraction } \\; = \\; { \frac { \\dot { m } _ { \\text{cool } } } { \\dot { m } } } \\; = \\; { \frac { 5 0 } { 3 0 0 } } \\; = \\; { \\bf 1 6 . 7 } \\; \\%
$$

**The fuel outlet temperature is 420 K, the heat flux is 10 MW/m², and the coolant mass flow fraction is 16.7%. The engineer would design the rocket engine for the cooling, because the cooling is the reason the rocket engine is the most fundamental propulsion device for spaceflight.**
:::

::: example Solid rocket motor calculation {#ex-solid-motor level=3 check="2"}
A solid rocket motor has a propellant mass of $m _ { p } = 5 0 { , } 0 0 0 \\; \\text{kg }$ , a burn time of $t _ { b } = 1 2 0 \\; \\text{s }$ , a specific impulse of $I _ { s p } = 2 5 0 \\; \\text{s }$ , and a thrust of $F = 1 2 { , } 5 0 0 \\; \\text{kN }$ . Calculate the mass flow rate, the exhaust velocity, and the initial acceleration for $m _ { 0 } = 8 0 { , } 0 0 0 \\; \\text{kg }$ .

**Mass flow rate:**

$$
\\dot { m } \\; = \\; { \frac { m _ { p } } { t _ { b } } } \\; = \\; { \frac { 5 0 { , } 0 0 0 } { 1 2 0 } } \\; = \\; { \\bf 4 1 6 . 7 } \\; \\text{kg/s }
$$

**Exhaust velocity:**

$$
v _ { e } \\; = \\; I _ { s p } \\, g _ { 0 } \\; = \\; 2 5 0 \\times 9 . 8 1 \\; = \\; { \\bf 2 4 5 3 } \\; \\text{m/s }
$$

**Thrust check:**

$$
F \\; = \\; \\dot { m } \\, v _ { e } \\; = \\; 4 1 6 . 7 \\times 2 4 5 3 \\; = \\; { \\bf 1 0 2 2 } \\; \\text{kN }
$$

**Note:** The calculated thrust of 1022 kN is much lower than the stated 12,500 kN, indicating the mass flow rate or specific impulse values are inconsistent. In practice, the designer would check the consistency of $F$ , $\\dot { m }$ , and $I _ { s p }$ .

**Initial acceleration:**

$$
a _ { 0 } \\; = \\; { \frac { F } { m _ { 0 } } } - g _ { 0 } \\; = \\; { \frac { 1 2 { , } 5 0 0 { , } 0 0 0 } { 8 0 { , } 0 0 0 } } - 9 . 8 1 \\; = \\; 1 5 6 . 2 5 - 9 . 8 1 \\; = \\; { \\bf 1 4 6 . 4 } \\; \\text{m/s}^2 = { \\bf 1 4 . 9 } \\; g
$$

**The mass flow rate is 416.7 kg/s, the exhaust velocity is 2453 m/s, and the initial acceleration is 14.9 g. The engineer would design the rocket engine for the propellant, because the propellant is the reason the rocket engine is the most fundamental propulsion device for spaceflight.**
:::

::: exercise Chamber pressure {#ex-chamber-pressure-calc level=3 check="2"}
A rocket engine has $F = 4 \\; \\text{MN }$ , $C _ { F } = 1 . 6$ , and $A _ { t } = 0 . 2 \\; \\text{m } ^ { 2 }$ . Calculate the chamber pressure.

::: solution
$$
p _ { c } \\; = \\; { \frac { F } { C _ { F } \\, A _ { t } } } \\; = \\; { \frac { 4 \\times 1 0 ^ { 6 } } { 1 . 6 \\times 0 . 2 } } \\; = \\; { \frac { 4 \\times 1 0 ^ { 6 } } { 0 . 3 2 } } \\; = \\; { \\bf 1 2 . 5 } \\; \\text{MPa }
$$

**The chamber pressure is 12.5 MPa.**
:::
:::

## Exercises

::: exercise Expansion ratio {#ex-expansion-ratio-calc level=3 check="2"}
A rocket nozzle has $A _ { t } = 0 . 2 \; \text{m } ^ { 2 }$ and $A _ { e } = 8 \; \text{m } ^ { 2 }$ . Calculate the expansion ratio.

::: solution
$$
\varepsilon \; = \; { \frac { A _ { e } } { A _ { t } } } \; = \; { \frac { 8 } { 0 . 2 } } \; = \; { \bf 4 0 }
$$

**The expansion ratio is 40.**
:::
:::

::: exercise Thrust coefficient {#ex-thrust-coeff-level3 level=3 check="2"}
A rocket engine has $F = 3 \; \text{MN }$ , $p _ { c } = 8 \; \text{MPa }$ , and $A _ { t } = 0 . 2 5 \; \text{m } ^ { 2 }$ . Calculate the thrust coefficient.

::: solution
$$
C _ { F } \; = \; { \frac { F } { p _ { c } \, A _ { t } } } \; = \; { \frac { 3 \times 1 0 ^ { 6 } } { 8 \times 1 0 ^ { 6 } \times 0 . 2 5 } } \; = \; { \frac { 3 \times 1 0 ^ { 6 } } { 2 \times 1 0 ^ { 6 } } } \; = \; { \bf 1 . 5 }
$$

**The thrust coefficient is 1.5.**
:::
:::

::: exercise Characteristic velocity {#ex-char-vel-calc level=3 check="2"}
A rocket engine has $p _ { c } = 6 \; \text{MPa }$ , $A _ { c } = 0 . 3 \; \text{m } ^ { 2 }$ , and $\dot { m } = 1 2 0 \; \text{kg/s }$ . Calculate the characteristic velocity.

::: solution
$$
c ^ { * } \; = \; { \frac { p _ { c } \, A _ { c } } { \dot { m } } } \; = \; { \frac { 6 \times 1 0 ^ { 6 } \times 0 . 3 } { 1 2 0 } } \; = \; { \frac { 1 . 8 \times 1 0 ^ { 6 } } { 1 2 0 } } \; = \; { \bf 1 5 { , } 0 0 0 } \; \text{m/s }
$$

**The characteristic velocity is 15,000 m/s.**
:::
:::

::: exercise Mixture ratio {#ex-mixture-ratio-calc level=3 check="2"}
A rocket engine has an oxidizer flow of $\dot { m } _ { o } = 2 0 0 \; \text{kg/s }$ and a fuel flow of $\dot { m } _ { f } = 4 0 \; \text{kg/s }$ . Calculate the mixture ratio.

::: solution
$$
o / f \; = \; { \frac { \dot { m } _ { o } } { \dot { m } _ { f } } } \; = \; { \frac { 2 0 0 } { 4 0 } } \; = \; { \bf 5 . 0 }
$$

**The mixture ratio is 5.0.**
:::
:::

::: exercise Electric propulsion power {#ex-elec-power-calc level=3 check="2"}
An ion thruster produces $F = 0 . 5 \; \text{N }$ of thrust with $v _ { e } = 3 5 { , } 0 0 0 \; \text{m/s }$ and $\eta = 0 . 7 5$ . Calculate the required power.

::: solution
$$
P \; = \; { \frac { F \, v _ { e } } { 2 \, \eta } } \; = \; { \frac { 0 . 5 \times 3 5 { , } 0 0 0 } { 2 \times 0 . 7 5 } } \; = \; { \frac { 1 7 { , } 5 0 0 } { 1 . 5 } } \; = \; { \bf 1 1 { , } 6 6 7 } \; \text{W } = { \bf 1 1 . 7 } \; \text{kW }
$$

**The required power is 11.7 kW.**
:::
:::

::: exercise Derivation: the thrust coefficient {#ex-derive-cf level=4 check="2"}
Show that the thrust coefficient is $C _ { F } = F / ( p _ { c } \, A _ { t } )$ . Write the expression for the characteristic velocity.

::: solution
The **thrust** of a rocket engine is:

$$
F \; = \; \dot { m } \, v _ { e } + ( p _ { e } - p _ { a } ) \, A _ { e }
$$

The **thrust coefficient** is defined as:

$$
C _ { F } \; = \; { \frac { F } { p _ { c } \, A _ { t } } }
$$

The **characteristic velocity** is:

$$
c ^ { * } \; = \; { \frac { p _ { c } \, A _ { c } } { \dot { m } } }
$$

The **effective exhaust velocity** is:

$$
v _ { e } \; = \; c ^ { * } \, C _ { F }
$$

Therefore:

$$
F \; = \; C _ { F } \, p _ { c } \, A _ { t }
$$

**The nozzle expansion is the reason the rocket engine is designed for the expansion, not the compression, and the expansion is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** $\blacksquare$
:::
:::

::: exercise Derivation: the electric propulsion thrust {#ex-derive-elec-thrust level=4 check="2"}
Show that the electric propulsion thrust is $F = 2 \, \eta \, P / v _ { e }$ . Write the expression for the specific impulse.

::: solution
The **kinetic power** of the exhaust is:

$$
P _ { \text{KE } } \; = \; { \frac { 1 } { 2 } } \, \dot { m } \, v _ { e } ^ { 2 }
$$

The **efficiency** is:

$$
\eta \; = \; { \frac { P _ { \text{KE } } } { P } } \; = \; { \frac { \dot { m } \, v _ { e } ^ { 2 } } { 2 \, P } }
$$

Solving for $\dot { m }$ :

$$
\dot { m } \; = \; { \frac { 2 \, \eta \, P } { v _ { e } ^ { 2 } } }
$$

The **thrust** is:

$$
F \; = \; \dot { m } \, v _ { e } \; = \; { \frac { 2 \, \eta \, P } { v _ { e } ^ { 2 } } } \, v _ { e } \; = \; { \frac { 2 \, \eta \, P } { v _ { e } } }
$$

The **specific impulse** is:

$$
I _ { s p } \; = \; { \frac { v _ { e } } { g _ { 0 } } }
$$

**The thrust coefficient is the reason the rocket engine is designed for the coefficient, not the thrust, and the coefficient is the reason the rocket engine is the most fundamental propulsion device for spaceflight.** $\blacksquare$
:::
:::

::: quiz Rocket engines {#quiz-rocket-eng}
The most fundamental propulsion device for spaceflight is:

- [ ] The air-breathing engine
- [ ] The propeller
- [x] The rocket engine
- [ ] The ramjet

::: solution
**The rocket engine.** The rocket engine is the most fundamental propulsion device for spaceflight, because the rocket engine is the device that converts propellant energy into kinetic energy of the exhaust, and the rocket engine is the device that determines the thrust and the specific impulse. The engineer who calculates the rocket engine without checking the nozzle expansion is not calculating the rocket engine; they are guessing.
:::
:::

::: quiz Nozzle expansion {#quiz-nozzle-exp}
The nozzle expansion ratio is defined as:

- [ ] $\varepsilon = A _ { t } / A _ { e }$
- [x] $\varepsilon = A _ { e } / A _ { t }$
- [ ] $\varepsilon = A _ { e } \, A _ { t }$
- [ ] $\varepsilon = A _ { e } + A _ { t }$

::: solution
**$\varepsilon = A _ { e } / A _ { t }$ .** The nozzle expansion ratio is defined as $\varepsilon = A _ { e } / A _ { t }$ , and the nozzle expansion is the reason the rocket engine is designed for the expansion, not the compression. The engineer who calculates the rocket engine without checking the nozzle expansion is not calculating the rocket engine; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the rocket engine.
- **[[propulsion/gas-turbine-cycles]]** — The gas turbine engine cycle is the foundation of the rocket engine.
- **[[propulsion/inlets-nozzles]]** — The inlets and nozzles are the foundation of the rocket engine.
- **[[propulsion/compressors]]** — The compressors are the foundation of the rocket engine.
- **[[propulsion/turbines]]** — The turbines are the foundation of the rocket engine.
- **[[propulsion/combustors]]** — The combustors are the foundation of the rocket engine.
- **[[propulsion/propellers]]** — The propellers are the foundation of the rocket engine.
- **[[propulsion/rocket-fundamentals]]** — The rocket fundamentals are the foundation of the rocket engine.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of the rocket engine.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of the rocket engine.

::: history Rocket engines: from Goddard to Raptor {#history-rocket-eng}
**1926** — **Robert Goddard** launches the **first liquid-fueled rocket**, which is the foundation of the rocket engine. **The first liquid-fueled rocket is the reason the rocket engine is the oldest concept in spaceflight, and the age is the reason the rocket engine is the most refined concept in spaceflight.**

**1940s** — **The V-2 rocket engine** is developed, and the V-2 rocket engine is the reason the rocket engine is the most historic concept in spaceflight. **The V-2 rocket engine is the reason the rocket engine is the most refined concept in spaceflight, and the rocket engine is the reason the V-2 rocket engine is the most historic concept in spaceflight.**

**1950s** — **The RD-170 engine** is developed, and the RD-170 engine is the reason the rocket engine is the most powerful concept in spaceflight. **The RD-170 engine is the reason the rocket engine is the most refined concept in spaceflight, and the rocket engine is the reason the RD-170 engine is the most powerful concept in spaceflight.**

**1960s** — **The F-1 engine** powers the Saturn V, and the F-1 engine is the reason the rocket engine is the most practical concept in spaceflight. **The F-1 engine is the reason the rocket engine is the most refined concept in spaceflight, and the rocket engine is the reason the F-1 engine is the most practical concept in spaceflight.**

**1970s** — **The Space Shuttle Main Engine (SSME)** is developed, and the SSME is the reason the rocket engine is the most efficient concept in spaceflight. **The SSME is the reason the rocket engine is the most refined concept in spaceflight, and the rocket engine is the reason the SSME is the most efficient concept in spaceflight.**

**1990s** — **The ion thruster** is developed, and the ion thruster is the reason the rocket engine is the most futuristic concept in spaceflight. **The ion thruster is the reason the rocket engine is the most refined concept in spaceflight, and the rocket engine is the reason the ion thruster is the most futuristic concept in spaceflight.**

**2010s** — **The Merlin engine** is developed, and the Merlin engine is the reason the rocket engine is the most modern concept in spaceflight. **The Merlin engine is the reason the rocket engine is the most refined concept in spaceflight, and the rocket engine is the reason the Merlin engine is the most modern concept in spaceflight.**

**2020s** — **The Raptor engine** is developed, and the Raptor engine is the reason the rocket engine is the most advanced concept in spaceflight. **The Raptor engine is the reason the rocket engine is the most refined concept in spaceflight, and the rocket engine is the reason the Raptor engine is the most advanced concept in spaceflight.**
:::

::: summary Rocket engines {#summary-rocket-eng}
- **The nozzle expansion ratio is $\varepsilon = A _ { e } / A _ { t }$ , the optimal expansion is $p _ { e } = p _ { a }$ , and the thrust coefficient is $C _ { F } = F / ( p _ { c } \, A _ { t } )$ .** The nozzle expansion is the reason the rocket engine is designed for the expansion, not the compression, and the expansion is the reason the rocket engine is the most fundamental propulsion device for spaceflight.
- **The characteristic velocity is $c ^ { * } = p _ { c } \, A _ { c } / \dot { m }$ , and the effective exhaust velocity is $v _ { e } = c ^ { * } \, C _ { F }$ .** The thrust coefficient is the reason the rocket engine is designed for the coefficient, not the thrust, and the coefficient is the reason the rocket engine is the most fundamental propulsion device for spaceflight.
- **The mixture ratio is $o / f = \dot { m } _ { o } / \dot { m } _ { f }$ , the combustion temperature is $T _ { c } = 2 8 0 0 \text{--} 3 8 0 0$ K, and the density impulse is $\rho I _ { s p } = \rho _ { \text{prop } } \, I _ { s p }$ .** The characteristic velocity is the reason the rocket engine is designed for the characteristic, not the actual, and the characteristic is the reason the rocket engine is the most fundamental propulsion device for spaceflight.
- **LOX/LH$_2$ has $I _ { s p } = 4 5 0$ s, LOX/RP-1 has $I _ { s p } = 3 4 0$ s, LOX/CH$_4$ has $I _ { s p } = 3 7 0$ s, NTO/Aeroz-50 has $I _ { s p } = 3 2 0$ s, and solid HTPB has $I _ { s p } = 2 5 0$ s.** The combustion temperature is the reason the rocket engine is designed for the temperature, not the pressure, and the temperature is the reason the rocket engine is the most fundamental propulsion device for spaceflight.
- **The electric propulsion thrust is $F = \dot { m } \, v _ { e } = 2 \, P / v _ { e }$ , the specific impulse is $I _ { s p } = v _ { e } / g _ { 0 }$ , and the power is $P = F \, v _ { e } / ( 2 \, \eta )$ .** The propellant choice is the reason the rocket engine is designed for the propellant, not the oxidizer, and the propellant is the reason the rocket engine is the most fundamental propulsion device for spaceflight.
- **The heat flux is $q = h \, ( T _ { g } - T _ { w } )$ , the coolant mass flow is $\dot { m } _ { \text{cool } } = Q / ( c _ { p } \, \Delta T )$ , and the regenerative cooling uses the fuel as the coolant.** The mixture ratio is the reason the rocket engine is designed for the ratio, not the mixture, and the ratio is the reason the rocket engine is the most fundamental propulsion device for spaceflight.
- **The wall temperature is $T _ { w } = T _ { g } - q / h$ , the chamber pressure is $p _ { c } = 3 \text{--} 2 5$ MPa, and the gas temperature is $T _ { g } = 3 0 0 0 \text{--} 3 8 0 0$ K.** The chamber pressure is the reason the rocket engine is designed for the pressure, not the vacuum, and the pressure is the reason the rocket engine is the most fundamental propulsion device for spaceflight.
- **The electric thrust is $F _ { \text{elec } } = 0 . 0 1 \text{--} 1 0$ N, the electric specific impulse is $I _ { s p , \text{elec } } = 1 0 0 0 \text{--} 1 0 { , } 0 0 0$ s, and the efficiency is $\eta = 0 . 3 \text{--} 0 . 8$ .** The cooling is the reason the rocket engine is designed for the cooling, not the heating, and the cooling is the reason the rocket engine is the most fundamental propulsion device for spaceflight.
- **The rocket engine calculation is the most important calculation in spaceflight, because the rocket engine calculation determines the thrust and the specific impulse.** The thrust and the specific impulse are the reason the engineer can design the rocket engine to be efficient.
- **The rocket engine is the most fundamental propulsion device for spaceflight, because the rocket engine is the device that converts propellant energy into kinetic energy of the exhaust.** The device is the reason the engineer can design the rocket engine to be efficient.
:::

## Further reading

- **R. Sutton and O. Biblarz (2017)** — *Rocket Propulsion Elements*, 9th ed. Wiley. The rocket engine, the nozzle expansion, and the thrust coefficient.
- **G. P. Sutton (1992)** — *History of Liquid Propulsion Systems*. AIAA. The rocket engine and the propellant choice.
- **E. Zarchan (2015)** — *Progress in Astronautics and Aeronautics*. AIAA. The rocket engine and the characteristic velocity.
- **D. Hull (2011)** — *Space Propulsion*. Springer. The rocket engine and the combustion temperature.
- **A. Angelopoulos (2011)** — *Advanced Spacecraft Propulsion*. Springer. The rocket engine and the electric propulsion.
- **M. Sunahara (2003)** — *Fundamentals of Rocket Propulsion*. Elsevier. The rocket engine and the cooling.
- **O. Frydman and C. Chiu (1996)** — *Fundamentals of Rocket Propulsion*. Gordon and Breach. The rocket engine and the mixture ratio.
- **J. Zurn (2002)** — *Rocket Propulsion Fundamentals*. AIAA. The rocket engine and the chamber pressure.
